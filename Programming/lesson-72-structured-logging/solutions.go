// solutions.go — Lesson 72: Structured Logging với log/slog (Go 1.21+)
//
// Chạy:  go run solutions.go
//
// File minh họa toàn bộ khái niệm trong README:
//   - TextHandler vs JSONHandler
//   - Log levels (Debug/Info/Warn/Error) + đổi level runtime bằng LevelVar
//   - logger.With(...) tạo child logger kế thừa attribute
//   - Context-aware logging: nhét logger vào context, lấy ra ở tầng sâu
//   - Request/Correlation ID: middleware sinh/kế thừa + propagate
//   - Redact dữ liệu nhạy cảm bằng slog.LogValuer
//   - Sampling handler (giữ Warn/Error, lấy mẫu Debug/Info)
//
// Mọi comment bằng tiếng Việt để phục vụ học tập.
package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log/slog"
	"math/big"
	"net/http"
	"net/http/httptest"
	"os"
)

// ============================================================================
// Phần hạ tầng dùng chung: context key + helper lấy/đặt logger vào context
// ============================================================================

// ctxKey là kiểu riêng (unexported struct rỗng) để tránh đụng key trong context.
type ctxKey struct{}

// withLogger nhét logger (đã gắn field) vào context.
func withLogger(ctx context.Context, l *slog.Logger) context.Context {
	return context.WithValue(ctx, ctxKey{}, l)
}

// loggerFrom lấy logger từ context; nếu không có thì trả về default.
func loggerFrom(ctx context.Context) *slog.Logger {
	if l, ok := ctx.Value(ctxKey{}).(*slog.Logger); ok {
		return l
	}
	return slog.Default()
}

// newID sinh một request ID ngẫu nhiên dạng hex (vd "req-3f9a...").
func newID() string {
	b := make([]byte, 6)
	_, _ = rand.Read(b)
	return "req-" + hex.EncodeToString(b)
}

// ============================================================================
// Demo 1 — TextHandler vs JSONHandler (mục 2 README)
// ============================================================================

func demoHandlers() {
	fmt.Println("=== Demo 1: TextHandler vs JSONHandler ===")

	// TextHandler — dạng key=value, dễ đọc bằng mắt → dùng cho DEV.
	textLog := slog.New(slog.NewTextHandler(os.Stdout, nil))
	fmt.Print("[Text] ")
	textLog.Info("user login", "user_id", "u_1234", "ip", "10.0.0.5")

	// JSONHandler — dạng JSON, máy parse được → dùng cho PROD.
	jsonLog := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	fmt.Print("[JSON] ")
	jsonLog.Info("user login", "user_id", "u_1234", "ip", "10.0.0.5")

	fmt.Println()
}

// ============================================================================
// Demo 2 — Log levels + đổi level runtime bằng LevelVar (mục 3 README, BT5)
// ============================================================================

// process minh họa cùng một hàm phát cả Debug (chi tiết) lẫn Info (tổng kết).
func process(l *slog.Logger, orderID int) {
	l.Debug("validate order", "order_id", orderID)
	l.Debug("price computed", "order_id", orderID, slog.Float64("total", 99.5))
	l.Debug("saved to db", "order_id", orderID)
	l.Info("order processed", "order_id", orderID, slog.Float64("total", 99.5))
}

func demoLevels() {
	fmt.Println("=== Demo 2: Log levels (BT5) ===")

	var lvl slog.LevelVar // mặc định Info
	l := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: &lvl}))

	fmt.Println("-- level = Info (chỉ thấy dòng tổng kết) --")
	lvl.Set(slog.LevelInfo)
	process(l, 42)

	fmt.Println("-- level = Debug (thấy hết các bước) --")
	lvl.Set(slog.LevelDebug)
	process(l, 42)

	// Minh họa Warn/Error.
	fmt.Println("-- Warn & Error --")
	l.Warn("payment retry", "attempt", 2, "max", 3)
	l.Error("payment failed", "order_id", 42, "reason", "timeout")

	fmt.Println()
}

// ============================================================================
// Demo 3 — Child logger kế thừa attribute bằng With (mục 7 README, BT3)
// ============================================================================

func demoChildLogger() {
	fmt.Println("=== Demo 3: Child logger With (BT3) ===")

	base := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	// Logger cho toàn service — mọi log đều kèm service + version.
	svcLog := base.With("service", "api", "version", "v2.0")
	svcLog.Info("server started", "port", 8080)

	// Logger cho 1 request — kế thừa service + version, thêm request_id.
	reqLog := svcLog.With("request_id", newID())
	reqLog.Info("handling request", "path", "/orders", "method", "GET")

	fmt.Println()
}

// ============================================================================
// Demo 4 — Redact dữ liệu nhạy cảm bằng LogValuer (mục 8 README, BT4)
// ============================================================================

// Password luôn bị che hoàn toàn khi log.
type Password string

func (Password) LogValue() slog.Value { return slog.StringValue("[REDACTED]") }

// Card chỉ giữ lại 4 số cuối khi log.
type Card string

func (c Card) LogValue() slog.Value {
	s := string(c)
	if len(s) >= 4 {
		return slog.StringValue("****-****-****-" + s[len(s)-4:])
	}
	return slog.StringValue("[REDACTED]")
}

func demoRedaction() {
	fmt.Println("=== Demo 4: Redact sensitive data (BT4) ===")

	l := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	l.Info("checkout",
		"user", "u_1",
		"password", Password("hunter2"), // -> [REDACTED]
		"card", Card("4111111111111234"), // -> ****-****-****-1234
	)

	fmt.Println()
}

// ============================================================================
// Demo 5 — Request ID middleware + context logger (mục 5,6 README, BT2)
// ============================================================================

const headerRequestID = "X-Request-ID"

// requestIDMiddleware: kế thừa request_id nếu header có sẵn, sinh mới nếu chưa,
// rồi nhét child logger vào context cho handler tầng dưới dùng.
func requestIDMiddleware(base *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rid := r.Header.Get(headerRequestID)
		if rid == "" {
			rid = newID() // edge: chưa có ID -> sinh
		}
		w.Header().Set(headerRequestID, rid)
		l := base.With("request_id", rid)
		ctx := withLogger(r.Context(), l)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// ordersHandler: handler tầng nghiệp vụ, lấy logger từ context (đã có request_id).
func ordersHandler(w http.ResponseWriter, r *http.Request) {
	l := loggerFrom(r.Context())
	l.Info("processing order", "order_id", 42)
	// Giả lập gọi service "payment" và NHỚ propagate request_id qua header.
	rid := w.Header().Get(headerRequestID)
	l.Debug("calling payment service", "downstream_header", headerRequestID+"="+rid)
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("ok"))
}

func demoRequestID() {
	fmt.Println("=== Demo 5: Request ID middleware + context (BT2) ===")

	base := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})).
		With("service", "gateway")

	handler := requestIDMiddleware(base, http.HandlerFunc(ordersHandler))

	// Trường hợp A: request từ edge, KHÔNG có header -> middleware tự sinh ID.
	fmt.Println("-- request đến edge (không header) --")
	reqA := httptest.NewRequest(http.MethodGet, "/orders", nil)
	recA := httptest.NewRecorder()
	handler.ServeHTTP(recA, reqA)
	fmt.Println("response header X-Request-ID =", recA.Header().Get(headerRequestID))

	// Trường hợp B: request từ service upstream, CÓ header -> kế thừa ID.
	fmt.Println("-- request giữa chuỗi (đã có header, phải kế thừa) --")
	reqB := httptest.NewRequest(http.MethodGet, "/orders", nil)
	reqB.Header.Set(headerRequestID, "req-from-upstream")
	recB := httptest.NewRecorder()
	handler.ServeHTTP(recB, reqB)
	fmt.Println("response header X-Request-ID =", recB.Header().Get(headerRequestID),
		"(kế thừa, không sinh mới)")

	fmt.Println()
}

// ============================================================================
// Demo 6 — Sampling handler (mục 9 README)
// ============================================================================

// samplingHandler bọc một handler khác: luôn cho qua Warn/Error,
// nhưng chỉ cho qua ~rate phần của Debug/Info.
type samplingHandler struct {
	slog.Handler
	rate float64 // vd 0.5 = 50%
}

func (h samplingHandler) Handle(ctx context.Context, r slog.Record) error {
	if r.Level >= slog.LevelWarn {
		return h.Handler.Handle(ctx, r) // luôn giữ Warn/Error
	}
	// Sinh số ngẫu nhiên [0,1) bằng crypto/rand (tránh phụ thuộc math/rand seed).
	n, _ := rand.Int(rand.Reader, big.NewInt(1_000_000))
	if float64(n.Int64())/1_000_000.0 < h.rate {
		return h.Handler.Handle(ctx, r)
	}
	return nil // bỏ qua mẫu không trúng
}

func demoSampling() {
	fmt.Println("=== Demo 6: Sampling handler (giữ Warn/Error, sample Info) ===")

	inner := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})
	l := slog.New(samplingHandler{Handler: inner, rate: 0.5}) // sample 50% cho dễ thấy

	// Phát 10 dòng Info: trung bình ~5 dòng hiện (sample 50%).
	for i := 0; i < 10; i++ {
		l.Info("cache hit", "i", i, "key", fmt.Sprintf("user:%d", i))
	}
	// Error luôn hiện đủ.
	l.Error("db down", "host", "db-1")

	fmt.Println("(Info bị lấy mẫu ~50%; Error luôn được giữ)")
	fmt.Println()
}

func main() {
	demoHandlers()
	demoLevels()
	demoChildLogger()
	demoRedaction()
	demoRequestID()
	demoSampling()
}
