// Lesson 40 — Error Handling Deep (Production Patterns)
//
// Chạy:  go run solutions.go
//
// File này demo 6 bài tập + các pattern chính trong README:
//   1) AppError struct + constructor (NotFound, Validation, Internal)
//   2) HTTP error mapping middleware + JSON response
//   3) Retry với exponential backoff + jitter
//   4) isRetryable: phân loại error nào nên thử lại
//   5) Structured log error (JSON entry với fields)
//   6) Fix anti-pattern: transfer() với audit best-effort
//
// Toàn bộ chạy được trong ~5s, không gọi mạng thật — mock random failure.

package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"net/http/httptest"
	"os"
	"runtime/debug"
	"strings"
	"time"
)

// =========================================================================
// 1) AppError — structured error
// =========================================================================

// AppError là kiểu error chuẩn cho toàn service. Có 4 thành phần:
//   - Code:    enum stable (máy đọc), dùng cho HTTP map + monitoring group.
//   - Message: chuỗi cho dev (đọc log).
//   - Cause:   error gốc, lưu lại bằng %w để errors.Is/As đi qua.
//   - Fields:  context phụ (id, field name, retry hint).
type AppError struct {
	Code    string
	Message string
	Cause   error
	Fields  map[string]any
}

func (e *AppError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Cause)
	}
	return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

// Unwrap để errors.Is / errors.As đi qua được chain.
func (e *AppError) Unwrap() error { return e.Cause }

// --- Constructor helper — code gọi sẽ ngắn và đồng nhất ------------------

func NotFound(resource string, id any) *AppError {
	return &AppError{
		Code:    "NOT_FOUND",
		Message: fmt.Sprintf("%s with id=%v not found", resource, id),
		Fields:  map[string]any{"resource": resource, "id": id},
	}
}

func Validation(field, reason string) *AppError {
	return &AppError{
		Code:    "VALIDATION",
		Message: fmt.Sprintf("invalid %s: %s", field, reason),
		Fields:  map[string]any{"field": field, "reason": reason},
	}
}

func Internal(cause error, msg string) *AppError {
	return &AppError{
		Code:    "INTERNAL",
		Message: msg,
		Cause:   cause,
	}
}

func Unauthorized(reason string) *AppError {
	return &AppError{Code: "UNAUTHORIZED", Message: reason}
}

func RateLimited(retryAfter time.Duration) *AppError {
	return &AppError{
		Code:    "RATE_LIMITED",
		Message: fmt.Sprintf("rate limit exceeded, retry after %v", retryAfter),
		Fields:  map[string]any{"retry_after_sec": int(retryAfter.Seconds())},
	}
}

func DBTimeout(cause error) *AppError {
	return &AppError{Code: "DB_TIMEOUT", Message: "database timeout", Cause: cause}
}

// =========================================================================
// 2) HTTP error mapping
// =========================================================================

// HTTPError dùng cho transport/HTTP downstream — phân biệt với AppError nghiệp vụ.
type HTTPError struct {
	Status int
	Body   string
}

func (e *HTTPError) Error() string {
	return fmt.Sprintf("http %d: %s", e.Status, e.Body)
}

// httpError map error -> (status, code, user-facing message).
// Chỉ ở ĐÂY mới quyết định status code; handler tuyệt đối không tự w.WriteHeader.
func httpError(err error) (int, string, string) {
	var appErr *AppError
	if errors.As(err, &appErr) {
		switch appErr.Code {
		case "NOT_FOUND":
			return 404, appErr.Code, appErr.Message
		case "VALIDATION":
			return 422, appErr.Code, appErr.Message
		case "UNAUTHORIZED":
			return 401, appErr.Code, "Bạn cần đăng nhập"
		case "FORBIDDEN":
			return 403, appErr.Code, "Không có quyền truy cập"
		case "RATE_LIMITED":
			return 429, appErr.Code, "Bạn thao tác quá nhanh, hãy đợi vài giây"
		case "PAYMENT_DECLINED":
			return 422, appErr.Code, appErr.Message
		case "DB_TIMEOUT", "DOWNSTREAM_UNAVAILABLE":
			return 503, appErr.Code, "Hệ thống đang bận, thử lại sau"
		}
	}
	// Catch-all: không nhận diện được -> 500 + message giản lược.
	// KHÔNG trả err.Error() trực tiếp để tránh lộ internal.
	return 500, "INTERNAL", "Đã có lỗi, vui lòng thử lại"
}

type errHandler func(http.ResponseWriter, *http.Request) error

// ErrorMiddleware bọc 1 handler trả error -> tự lo log + JSON response.
func ErrorMiddleware(next errHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Recover panic (programming error) -> 500.
		defer func() {
			if rec := recover(); rec != nil {
				stack := debug.Stack()
				fmt.Fprintf(os.Stderr, "PANIC %s %s: %v\n%s\n",
					r.Method, r.URL.Path, rec, stack)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(500)
				_, _ = w.Write([]byte(`{"code":"INTERNAL","message":"Đã có lỗi, vui lòng thử lại"}`))
			}
		}()

		if err := next(w, r); err != nil {
			status, code, msg := httpError(err)
			// Log internal đầy đủ: dev đọc được hết.
			fmt.Fprintf(os.Stderr, "ERROR %s %s status=%d code=%s err=%v\n",
				r.Method, r.URL.Path, status, code, err)
			// Response external: chỉ code + msg friendly.
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(status)
			_ = json.NewEncoder(w).Encode(map[string]string{
				"code":    code,
				"message": msg,
			})
		}
	}
}

// =========================================================================
// 3) Retry + 4) isRetryable
// =========================================================================

// Retry gọi fn tối đa maxAttempts lần. Giữa các lần ngủ theo exponential backoff
// có jitter ±50%. Tôn trọng ctx.Done() để không kẹt khi caller huỷ.
func Retry(ctx context.Context, fn func() error, maxAttempts int, baseDelay, maxDelay time.Duration) error {
	var lastErr error
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		err := fn()
		if err == nil {
			return nil
		}
		// Quy tắc: error không retryable -> trả ngay, không tốn delay.
		if !isRetryable(err) {
			return err
		}
		lastErr = err
		if attempt == maxAttempts {
			break
		}
		// delay = baseDelay * 2^(attempt-1), cap ở maxDelay.
		d := baseDelay * time.Duration(1<<(attempt-1))
		if d > maxDelay {
			d = maxDelay
		}
		// Jitter ±50%: nhân với hệ số random trong [0.5, 1.5].
		// Mục đích: tránh 1000 client cùng retry tại cùng thời điểm.
		j := 0.5 + rand.Float64()
		d = time.Duration(float64(d) * j)

		select {
		case <-time.After(d):
		case <-ctx.Done():
			return fmt.Errorf("retry aborted: %w", ctx.Err())
		}
	}
	return fmt.Errorf("after %d attempts: %w", maxAttempts, lastErr)
}

// isRetryable trả true cho lỗi tạm thời (network, 5xx, 429, DB timeout, ctx deadline).
// Trả false cho domain error (validation, not-found) và ctx.Canceled (caller chủ động huỷ).
func isRetryable(err error) bool {
	if err == nil {
		return false
	}
	// 1) Caller chủ động huỷ -> tôn trọng, KHÔNG retry.
	if errors.Is(err, context.Canceled) {
		return false
	}
	// 2) Deadline có thể là transient (timeout 1 request), retry trên ctx mới.
	if errors.Is(err, context.DeadlineExceeded) {
		return true
	}
	// 3) HTTP transport: 5xx + 429 retryable, 4xx khác KHÔNG.
	var httpErr *HTTPError
	if errors.As(err, &httpErr) {
		if httpErr.Status == 429 {
			return true
		}
		if httpErr.Status >= 500 && httpErr.Status < 600 {
			return true
		}
		return false
	}
	// 4) AppError: chỉ code hạ tầng mới retry.
	var appErr *AppError
	if errors.As(err, &appErr) {
		switch appErr.Code {
		case "DB_TIMEOUT", "DOWNSTREAM_UNAVAILABLE", "RATE_LIMITED":
			return true
		}
		return false
	}
	// 5) Mặc định: không biết -> không retry (an toàn).
	return false
}

// =========================================================================
// 5) Structured logging
// =========================================================================

// StackError gắn thêm stack vào error. Dùng có chừng mực — capture stack ~1µs.
type StackError struct {
	err   error
	stack string
}

func WithStack(err error) error {
	if err == nil {
		return nil
	}
	return &StackError{err: err, stack: string(debug.Stack())}
}

func (e *StackError) Error() string { return e.err.Error() }
func (e *StackError) Unwrap() error { return e.err }
func (e *StackError) Stack() string { return e.stack }

// Context key cho request_id / user_id (typed để tránh va chạm).
type ctxKey string

const (
	reqIDKey  ctxKey = "request_id"
	userIDKey ctxKey = "user_id"
)

// LogError in 1 JSON entry / 1 dòng với mọi field hữu ích cho debug.
func LogError(ctx context.Context, err error, out io.Writer) {
	if err == nil {
		return
	}
	entry := map[string]any{
		"level":     "error",
		"ts":        time.Now().Format(time.RFC3339Nano),
		"error_msg": err.Error(),
	}
	if v := ctx.Value(reqIDKey); v != nil {
		entry["request_id"] = v
	}
	if v := ctx.Value(userIDKey); v != nil {
		entry["user_id"] = v
	}

	var appErr *AppError
	if errors.As(err, &appErr) {
		entry["error_code"] = appErr.Code
		for k, v := range appErr.Fields {
			entry["field_"+k] = v
		}
	}

	var stackErr *StackError
	if errors.As(err, &stackErr) {
		// Chỉ lấy 5 dòng đầu của stack cho gọn output demo.
		lines := strings.SplitN(stackErr.Stack(), "\n", 7)
		if len(lines) > 6 {
			lines = lines[:6]
		}
		entry["stack"] = strings.Join(lines, " | ")
	}

	enc := json.NewEncoder(out)
	_ = enc.Encode(entry)
}

// =========================================================================
// 6) Fix anti-pattern: transfer()
// =========================================================================

// Mock dependencies cho demo.
type mockDB struct{ failNext bool }

func (db *mockDB) Exec(ctx context.Context, q string, args ...any) error {
	if db.failNext {
		db.failNext = false
		return errors.New("connection refused: dial tcp 10.0.0.5:5432")
	}
	return nil
}

type mockAudit struct{ alwaysFail bool }

func (a *mockAudit) Log(ctx context.Context, from, to, amount int) error {
	if a.alwaysFail {
		return errors.New("audit service unavailable")
	}
	return nil
}

var (
	db    = &mockDB{}
	audit = &mockAudit{}
)

// BẢN ANTI-PATTERN (vi phạm 4 điều): chỉ để so sánh, KHÔNG dùng.
func transferBad(from, to, amount int) error {
	if amount < 0 {
		return errors.New("invalid")
	}
	err := db.Exec(context.Background(), "UPDATE ...")
	if err != nil {
		fmt.Fprintln(os.Stderr, "db error", err) // double log (1)
		return err                                // không wrap context (2)
	}
	err2 := audit.Log(context.Background(), from, to, amount)
	if err2 != nil {
		// silent swallow (3)
	}
	return nil
}

// BẢN SỬA — sạch + nói rõ lý do mọi quyết định.
func transferGood(ctx context.Context, from, to, amount int) error {
	if amount <= 0 {
		return Validation("amount", "phải > 0")
	}
	if from == to {
		return Validation("from/to", "không thể chuyển cho chính mình")
	}
	if err := db.Exec(ctx, "UPDATE accounts ..."); err != nil {
		// Wrap thêm context của LAYER NÀY (from/to/amount), không double log.
		return fmt.Errorf("transferring from=%d to=%d amount=%d: %w",
			from, to, amount, err)
	}
	// Audit best-effort: lỗi không huỷ transaction.
	// Quyết định nghiệp vụ — KHÔNG silent swallow vô tri. Có log warning để truy ngược.
	if err := audit.Log(ctx, from, to, amount); err != nil {
		fmt.Fprintf(os.Stderr, "WARN audit log failed (transfer thành công) from=%d to=%d: %v\n",
			from, to, err)
	}
	return nil
}

// =========================================================================
// Demo runner
// =========================================================================

func sep(title string) {
	fmt.Printf("\n=== %s ===\n", title)
}

func demoAppError() {
	sep("Demo 1: AppError + errors.As qua chain")
	err := NotFound("user", 42)
	wrapped := fmt.Errorf("processing GET /users/42: %w", err)
	fmt.Println("full err:", wrapped)

	var appErr *AppError
	if errors.As(wrapped, &appErr) {
		fmt.Printf("extracted: Code=%s Message=%q Fields=%v\n",
			appErr.Code, appErr.Message, appErr.Fields)
	}
}

func demoHTTPMiddleware() {
	sep("Demo 2: HTTP middleware (map AppError -> status + JSON)")

	mux := http.NewServeMux()
	mux.HandleFunc("/users", ErrorMiddleware(func(w http.ResponseWriter, r *http.Request) error {
		return NotFound("user", 42)
	}))
	mux.HandleFunc("/email", ErrorMiddleware(func(w http.ResponseWriter, r *http.Request) error {
		return Validation("email", "thiếu @")
	}))
	mux.HandleFunc("/db", ErrorMiddleware(func(w http.ResponseWriter, r *http.Request) error {
		return DBTimeout(errors.New("ctx deadline"))
	}))

	srv := httptest.NewServer(mux)
	defer srv.Close()

	for _, p := range []string{"/users", "/email", "/db"} {
		resp, err := http.Get(srv.URL + p)
		if err != nil {
			fmt.Println("call err:", err)
			continue
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		fmt.Printf("GET %s -> %d  body=%s", p, resp.StatusCode, body)
	}
}

func demoRetry() {
	sep("Demo 3+4: Retry với backoff + isRetryable")

	// Mock fn: fail 2 lần đầu (retryable), thành công lần 3.
	tries := 0
	fn := func() error {
		tries++
		fmt.Printf("  attempt %d ...", tries)
		if tries < 3 {
			fmt.Println(" -> DB_TIMEOUT (retryable)")
			return DBTimeout(errors.New("simulated"))
		}
		fmt.Println(" -> OK")
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	start := time.Now()
	err := Retry(ctx, fn, 5, 200*time.Millisecond, 5*time.Second)
	fmt.Printf("Retry kết quả: err=%v elapsed=%v\n", err, time.Since(start).Round(time.Millisecond))

	// Test 2: error non-retryable -> dừng ngay sau 1 attempt, không sleep.
	fmt.Println()
	tries = 0
	fn2 := func() error {
		tries++
		fmt.Printf("  attempt %d ... -> VALIDATION (NON-retryable)\n", tries)
		return Validation("email", "sai định dạng")
	}
	start = time.Now()
	err = Retry(context.Background(), fn2, 5, 1*time.Second, 5*time.Second)
	fmt.Printf("Retry stop sớm: err=%v elapsed=%v (chỉ 1 attempt)\n",
		err, time.Since(start).Round(time.Millisecond))
}

func demoIsRetryable() {
	sep("Demo 4: Bảng kiểm isRetryable cho mọi loại error")
	cases := []struct {
		name string
		err  error
	}{
		{"context.Canceled", context.Canceled},
		{"context.DeadlineExceeded", context.DeadlineExceeded},
		{"HTTP 500", &HTTPError{Status: 500, Body: "internal"}},
		{"HTTP 503", &HTTPError{Status: 503, Body: "unavailable"}},
		{"HTTP 429", &HTTPError{Status: 429, Body: "rate limit"}},
		{"HTTP 404", &HTTPError{Status: 404, Body: "not found"}},
		{"HTTP 401", &HTTPError{Status: 401, Body: "auth"}},
		{"AppError NOT_FOUND", NotFound("user", 1)},
		{"AppError VALIDATION", Validation("x", "y")},
		{"AppError DB_TIMEOUT", DBTimeout(errors.New("t"))},
		{"AppError RATE_LIMITED", RateLimited(time.Second)},
		{"plain errors.New", errors.New("unknown")},
	}
	for _, c := range cases {
		fmt.Printf("  %-30s retryable = %v\n", c.name, isRetryable(c.err))
	}
}

func demoStructuredLog() {
	sep("Demo 5: Structured log error (JSON entries)")
	ctx := context.WithValue(context.Background(), reqIDKey, "req-abc-123")
	ctx = context.WithValue(ctx, userIDKey, 42)

	err := NotFound("order", 999)
	wrapped := fmt.Errorf("processing order detail: %w", err)
	LogError(ctx, wrapped, os.Stdout)

	err2 := WithStack(Internal(errors.New("network reset"), "calling payment gateway"))
	LogError(ctx, err2, os.Stdout)
}

func demoAntiPatternFix() {
	sep("Demo 6: Fix anti-pattern transfer()")

	fmt.Println("--- BẢN TỆ (transferBad) ---")
	db.failNext = true
	err := transferBad(1, 2, -5)
	fmt.Println("err1:", err) // chỉ "invalid" — không biết field nào

	err = transferBad(1, 2, 100)
	fmt.Println("err2:", err) // raw DB error, không wrap, double log ở stderr

	fmt.Println("\n--- BẢN SỬA (transferGood) ---")
	db.failNext = false
	audit.alwaysFail = true
	ctx := context.Background()
	if err := transferGood(ctx, 1, 2, -5); err != nil {
		fmt.Println("validation:", err)
	}
	if err := transferGood(ctx, 1, 1, 100); err != nil {
		fmt.Println("validation:", err)
	}

	db.failNext = true
	if err := transferGood(ctx, 1, 2, 100); err != nil {
		fmt.Println("db wrapped:", err)
	}

	db.failNext = false
	if err := transferGood(ctx, 1, 2, 100); err != nil {
		fmt.Println("transfer:", err)
	} else {
		fmt.Println("transfer OK (audit lỗi log warning, transaction vẫn thành công)")
	}
	audit.alwaysFail = false
}

func main() {
	rand.Seed(time.Now().UnixNano())

	demoAppError()
	demoHTTPMiddleware()
	demoIsRetryable()
	demoRetry()
	demoStructuredLog()
	demoAntiPatternFix()

	fmt.Println("\n=== DONE ===")
}
