// Lesson 29 — context: cancellation, timeout, deadline, value
//
// Chạy:  go run solutions.go
//
// File này demo TỪNG khái niệm trong README theo thứ tự dễ đọc:
//   1) Background vs TODO
//   2) WithCancel + cascade (cancel parent -> 3 child cùng dừng)
//   3) WithTimeout cho slow operation (cap 2s)
//   4) WithDeadline (absolute time)
//   5) WithValue (request ID) + extract trong nested function
//   6) Long loop check ctx.Done() mỗi iteration
//   7) Mock HTTP flow: handler -> DB query -> external API (propagate cancel)
//   8) defer cancel() — minh hoạ vì sao bắt buộc
//   9) Anti-pattern fix demo
//
// Tổng thời gian chạy ~ 6-8s. Mọi goroutine đều thoát đúng cách.

package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// =========================
// Demo 1 — Background vs TODO
// =========================
//
// Cả 2 đều là root context: không cancel, không deadline, không value.
// Khác nhau ở Ý NGHĨA:
//   - Background: "tôi biết đây là entrypoint chính thức" (main, init, test top-level).
//   - TODO: "tôi chưa biết ctx nào phù hợp, sẽ sửa sau" — placeholder khi refactor.
func demo1Roots() {
	fmt.Println("=== Demo 1: Background() vs TODO() ===")

	bg := context.Background()
	td := context.TODO()

	// Cả 2 đều trả Err() = nil (chưa cancel) và Deadline() = (zero, false).
	dl1, ok1 := bg.Deadline()
	dl2, ok2 := td.Deadline()
	fmt.Printf("  Background: Err=%v  Deadline=(%v, %v)\n", bg.Err(), dl1, ok1)
	fmt.Printf("  TODO:       Err=%v  Deadline=(%v, %v)\n", td.Err(), dl2, ok2)
	fmt.Println()
}

// =========================
// Demo 2 — WithCancel + cascade
// =========================
//
// Tạo 1 parent ctx có thể cancel. Spawn 3 child goroutine, mỗi cái loop in tick.
// Sau 600ms gọi cancel() — cả 3 PHẢI dừng cùng lúc nhờ ctx.Done() bị close.
func demo2WithCancelCascade() {
	fmt.Println("=== Demo 2: WithCancel — cascade tới 3 worker ===")

	ctx, cancel := context.WithCancel(context.Background())

	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			ticks := 0
			for {
				select {
				case <-ctx.Done():
					fmt.Printf("  worker %d: dừng sau %d tick — lý do: %v\n", id, ticks, ctx.Err())
					return
				case <-time.After(150 * time.Millisecond):
					ticks++
				}
			}
		}(i)
	}

	time.Sleep(600 * time.Millisecond)
	fmt.Println("  >> main: gọi cancel() — 3 worker phải dừng cùng lúc")
	cancel()
	wg.Wait()
	fmt.Println()
}

// =========================
// Demo 3 — WithTimeout (slow operation)
// =========================
//
// Mô phỏng 1 operation kéo dài 5s, nhưng ta cap timeout 2s.
// Kết quả: sau ~2s ctx.Done() fire, return DeadlineExceeded.
func slowOp(ctx context.Context) (string, error) {
	select {
	case <-time.After(5 * time.Second):
		return "result-data", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func demo3WithTimeout() {
	fmt.Println("=== Demo 3: WithTimeout(2s) cap slow operation 5s ===")

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel() // BẮT BUỘC — release timer goroutine

	start := time.Now()
	result, err := slowOp(ctx)
	elapsed := time.Since(start).Round(10 * time.Millisecond)

	switch {
	case errors.Is(err, context.DeadlineExceeded):
		fmt.Printf("  Timeout sau %v — err: %v (đúng kỳ vọng)\n", elapsed, err)
	case errors.Is(err, context.Canceled):
		fmt.Printf("  Bị cancel chủ động sau %v — err: %v\n", elapsed, err)
	case err != nil:
		fmt.Printf("  Lỗi khác sau %v — err: %v\n", elapsed, err)
	default:
		fmt.Printf("  Hoàn thành sau %v: %s\n", elapsed, result)
	}
	fmt.Println()
}

// =========================
// Demo 4 — WithDeadline
// =========================
//
// Khác WithTimeout: ta đặt 1 thời điểm tuyệt đối (absolute time).
// Ở đây dùng time.Now().Add(1s) cho demo — thực tế là "23:59:59 hôm nay" hoặc "end of batch window".
func demo4WithDeadline() {
	fmt.Println("=== Demo 4: WithDeadline (absolute time) ===")

	deadline := time.Now().Add(1 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	dl, _ := ctx.Deadline()
	fmt.Printf("  Deadline set: %s (còn %v)\n",
		dl.Format("15:04:05.000"),
		time.Until(dl).Round(10*time.Millisecond),
	)

	// Block tới khi ctx hết hạn
	<-ctx.Done()
	fmt.Printf("  Tới deadline — err: %v\n", ctx.Err())
	fmt.Println()
}

// =========================
// Demo 5 — WithValue (request ID) + extract trong nested function
// =========================
//
// QUY TẮC: key phải là custom type (không phải string raw) để tránh collision.

type ctxKey string

const (
	requestIDKey ctxKey = "reqID"
	userIDKey    ctxKey = "userID"
	traceIDKey   ctxKey = "traceID"
)

// Helper accessor — pattern idiomatic, type-safe.
func withRequestID(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, requestIDKey, id)
}

func requestID(ctx context.Context) string {
	if v, ok := ctx.Value(requestIDKey).(string); ok {
		return v
	}
	return "unknown"
}

// 3 level nested — ctx được pass nguyên xuống, mỗi level đọc ra cùng request ID.
func levelA(ctx context.Context) {
	fmt.Printf("  [reqID=%s] in levelA\n", requestID(ctx))
	levelB(ctx)
}

func levelB(ctx context.Context) {
	fmt.Printf("  [reqID=%s] in levelB (đọc thêm userID=%v, traceID=%v)\n",
		requestID(ctx), ctx.Value(userIDKey), ctx.Value(traceIDKey))
	levelC(ctx)
}

func levelC(ctx context.Context) {
	fmt.Printf("  [reqID=%s] in levelC — key không tồn tại trả nil: %v\n",
		requestID(ctx), ctx.Value(ctxKey("nonexistent")))
}

func demo5WithValue() {
	fmt.Println("=== Demo 5: WithValue — request ID + nested extract ===")

	ctx := context.Background()
	ctx = withRequestID(ctx, "req-12345")
	ctx = context.WithValue(ctx, userIDKey, 42)
	ctx = context.WithValue(ctx, traceIDKey, "trace-abc")

	levelA(ctx)
	fmt.Println()
}

// =========================
// Demo 6 — Long loop check ctx.Done() mỗi iteration
// =========================
//
// Mô phỏng task nặng: loop n lần, mỗi lần 100ms.
// Cancel ctx sau 500ms → loop dừng giữa chừng, KHÔNG chạy hết n.
func process(ctx context.Context, n int) (int, error) {
	done := 0
	for i := 0; i < n; i++ {
		select {
		case <-ctx.Done():
			return done, ctx.Err()
		case <-time.After(100 * time.Millisecond):
			done++
		}
	}
	return done, nil
}

func demo6LongLoop() {
	fmt.Println("=== Demo 6: Long loop check ctx.Done() mỗi iteration ===")

	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()

	done, err := process(ctx, 100)
	fmt.Printf("  Chạy %d/100 iteration trước khi cancel — err: %v\n", done, err)
	fmt.Println()
}

// =========================
// Demo 7 — Mock HTTP flow: handler → DB → external API
// =========================
//
// Cấu trúc giống production thực:
//   ordersHandler(r) -> WithTimeout -> dbQuery(ctx) + externalAPI(ctx)
//
// Nếu DB chậm hơn timeout: cả handler & external call cùng bị cancel.

type orderResponse struct {
	Orders []string
	API    string
}

// Mock DB — simulate slow query, tôn trọng ctx.
func dbQuery(ctx context.Context, latency time.Duration) ([]string, error) {
	select {
	case <-time.After(latency):
		return []string{"order-1", "order-2"}, nil
	case <-ctx.Done():
		return nil, fmt.Errorf("dbQuery: %w", ctx.Err())
	}
}

// Mock external API — cũng tôn trọng ctx.
func externalAPI(ctx context.Context, latency time.Duration) (string, error) {
	select {
	case <-time.After(latency):
		return "api-ok", nil
	case <-ctx.Done():
		return "", fmt.Errorf("externalAPI: %w", ctx.Err())
	}
}

// "Handler" — chỗ này thay http.HandlerFunc thật để demo dễ chạy.
// Trả status code dạng int + body để in ra.
func ordersHandler(parent context.Context, dbLatency, apiLatency, handlerTimeout time.Duration) (int, string) {
	// Wrap thêm timeout cho riêng handler (nhỏ hơn server.WriteTimeout)
	ctx, cancel := context.WithTimeout(parent, handlerTimeout)
	defer cancel()

	// Đính kèm request ID
	ctx = withRequestID(ctx, "req-orders-001")

	orders, err := dbQuery(ctx, dbLatency)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return 504, fmt.Sprintf("DB timeout (reqID=%s): %v", requestID(ctx), err)
		}
		if errors.Is(err, context.Canceled) {
			return 499, fmt.Sprintf("client gone (reqID=%s): %v", requestID(ctx), err)
		}
		return 500, err.Error()
	}

	api, err := externalAPI(ctx, apiLatency)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return 504, fmt.Sprintf("API timeout (reqID=%s): %v", requestID(ctx), err)
		}
		return 502, err.Error()
	}

	body := fmt.Sprintf("%+v", orderResponse{Orders: orders, API: api})
	return 200, fmt.Sprintf("(reqID=%s) %s", requestID(ctx), body)
}

func demo7HTTPFlow() {
	fmt.Println("=== Demo 7: Mock HTTP flow — handler → DB + external API ===")

	// Case A — DB 200ms, API 200ms, timeout 2s → SUCCESS
	fmt.Println("  Case A: DB=200ms, API=200ms, handler timeout=2s")
	start := time.Now()
	code, body := ordersHandler(context.Background(), 200*time.Millisecond, 200*time.Millisecond, 2*time.Second)
	fmt.Printf("    -> %d sau %v: %s\n", code, time.Since(start).Round(10*time.Millisecond), body)

	// Case B — DB 1.5s, timeout 800ms → TIMEOUT ở DB
	fmt.Println("  Case B: DB=1500ms, API=200ms, handler timeout=800ms")
	start = time.Now()
	code, body = ordersHandler(context.Background(), 1500*time.Millisecond, 200*time.Millisecond, 800*time.Millisecond)
	fmt.Printf("    -> %d sau %v: %s\n", code, time.Since(start).Round(10*time.Millisecond), body)

	// Case C — Client disconnect giữa chừng (cancel parent ctx sau 300ms)
	fmt.Println("  Case C: client cancel parent sau 300ms, DB cần 2s")
	parent, cancelParent := context.WithCancel(context.Background())
	go func() {
		time.Sleep(300 * time.Millisecond)
		cancelParent()
	}()
	start = time.Now()
	code, body = ordersHandler(parent, 2*time.Second, 200*time.Millisecond, 5*time.Second)
	fmt.Printf("    -> %d sau %v: %s\n", code, time.Since(start).Round(10*time.Millisecond), body)
	cancelParent() // idempotent — gọi nhiều lần OK
	fmt.Println()
}

// =========================
// Demo 8 — defer cancel() pattern (vì sao bắt buộc)
// =========================
//
// Function trả về sớm (early return) mà KHÔNG defer cancel → timer goroutine
// kẹt cho tới hết deadline mới release. Với defer cancel, release ngay.
func wellBehavedFunc(parent context.Context) error {
	ctx, cancel := context.WithTimeout(parent, 10*time.Second)
	defer cancel() // <-- release ngay khi function return

	// Giả lập làm việc 100ms rồi return — KHÔNG cần chờ đủ 10s
	select {
	case <-time.After(100 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func demo8DeferCancel() {
	fmt.Println("=== Demo 8: defer cancel() — release timer ngay khi return ===")
	start := time.Now()
	err := wellBehavedFunc(context.Background())
	fmt.Printf("  Function return sau %v (err=%v) — timer 10s đã được release ngay\n",
		time.Since(start).Round(time.Millisecond), err)
	fmt.Println("  Nếu QUÊN defer cancel: goroutine timer kẹt 10s → leak.")
	fmt.Println()
}

// =========================
// Demo 9 — Anti-pattern fix
// =========================
//
// Anti-pattern: lưu ctx vào struct field.
//   - Vấn đề: ctx được "đông lạnh" tại constructor; mọi method dùng ctx đó,
//     không respect ctx của caller hiện tại.
// Fix: nhận ctx qua parameter cho mỗi method.

type BadService struct {
	ctx context.Context // BAD — ctx as struct field
	id  int
}

func newBadService(ctx context.Context, id int) *BadService {
	return &BadService{ctx: ctx, id: id}
}

func (s *BadService) Find() error {
	// Dùng s.ctx — đông lạnh, không phải ctx của request hiện tại
	select {
	case <-time.After(50 * time.Millisecond):
		return nil
	case <-s.ctx.Done():
		return s.ctx.Err()
	}
}

type GoodService struct {
	id int // CHỈ giữ data, không giữ ctx
}

func newGoodService(id int) *GoodService { return &GoodService{id: id} }

func (s *GoodService) Find(ctx context.Context) error {
	// Nhận ctx fresh từ caller — respect cancel/timeout của request hiện tại
	select {
	case <-time.After(50 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func demo9AntiPatternFix() {
	fmt.Println("=== Demo 9: Anti-pattern fix — ctx-as-field → ctx-as-parameter ===")

	// BAD: tạo service với ctx đã cancel sẵn
	cancelledCtx, cancel := context.WithCancel(context.Background())
	cancel()
	bad := newBadService(cancelledCtx, 1)
	err := bad.Find()
	fmt.Printf("  BadService.Find() — luôn fail vì ctx đông lạnh: %v\n", err)

	// GOOD: service không giữ ctx, mỗi call nhận ctx fresh
	good := newGoodService(2)
	freshCtx, freshCancel := context.WithTimeout(context.Background(), time.Second)
	defer freshCancel()
	err = good.Find(freshCtx)
	fmt.Printf("  GoodService.Find(freshCtx) — chạy bình thường: %v\n", err)
	fmt.Println()
}

// =========================
// main
// =========================
func main() {
	fmt.Println("Lesson 29 — context: cancellation, timeout, deadline, value")
	fmt.Println("============================================================")
	fmt.Println()

	demo1Roots()
	demo2WithCancelCascade()
	demo3WithTimeout()
	demo4WithDeadline()
	demo5WithValue()
	demo6LongLoop()
	demo7HTTPFlow()
	demo8DeferCancel()
	demo9AntiPatternFix()

	fmt.Println("============================================================")
	fmt.Println("Hoàn tất — mọi goroutine đã thoát đúng cách, không leak.")
}
