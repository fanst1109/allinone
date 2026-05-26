// Lesson 36 — Concurrency Patterns nâng cao
//
// Chạy:  go run solutions.go
//
// File này demo các pattern trong README, KHÔNG dùng external dependency
// (không cần `go get golang.org/x/sync/...`), để chạy ngay:
//   1) Worker pool generic với context cancel
//   2) Pipeline 3 stage (gen -> square -> sum)
//   3) Fan-in merge N channel
//   4) Semaphore bằng channel buffered
//   5) Mini errgroup (inline) — bắt error đầu tiên, tự cancel ctx
//   6) Token-bucket rate limiter đơn giản
//   7) Mini singleflight (inline)
//   8) Mini circuit breaker (3 state)
//   9) Graceful shutdown HTTP server

package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

func main() {
	fmt.Println("=== L36 Concurrency Patterns Demo ===")
	fmt.Printf("NumCPU = %d\n\n", runtime.NumCPU())

	demoWorkerPool()
	demoPipeline()
	demoFanIn()
	demoSemaphore()
	demoMiniErrgroup()
	demoRateLimiter()
	demoSingleflight()
	demoCircuitBreaker()
	demoGracefulShutdown()
}

// ============================================================
// 1) Worker pool generic
// ============================================================

// RunPool spawn n worker, mỗi worker chạy work(job) trên jobs nhận từ channel.
// ctx cancel → worker thoát ngay (có thể trả partial result).
func RunPool[J any, R any](
	ctx context.Context,
	n int,
	jobs []J,
	work func(context.Context, J) R,
) []R {
	jobCh := make(chan J)
	resultCh := make(chan R, len(jobs))

	var wg sync.WaitGroup
	for i := 0; i < n; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case j, ok := <-jobCh:
					if !ok {
						return
					}
					r := work(ctx, j)
					select {
					case <-ctx.Done():
						return
					case resultCh <- r:
					}
				}
			}
		}()
	}

	go func() {
		defer close(jobCh)
		for _, j := range jobs {
			select {
			case <-ctx.Done():
				return
			case jobCh <- j:
			}
		}
	}()

	go func() { wg.Wait(); close(resultCh) }()

	var out []R
	for r := range resultCh {
		out = append(out, r)
	}
	return out
}

func demoWorkerPool() {
	fmt.Println("--- 1) Worker Pool ---")
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	jobs := make([]int, 20)
	for i := range jobs {
		jobs[i] = i + 1
	}

	start := time.Now()
	results := RunPool(ctx, 4, jobs, func(_ context.Context, n int) int {
		time.Sleep(50 * time.Millisecond) // simulate I/O
		return n * n
	})
	fmt.Printf("20 job, 4 worker, mỗi job 50ms → tổng %v, %d result\n",
		time.Since(start).Round(10*time.Millisecond), len(results))
	fmt.Println()
}

// ============================================================
// 2) Pipeline gen -> square -> sum
// ============================================================

func gen(ctx context.Context, nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			select {
			case <-ctx.Done():
				return
			case out <- n:
			}
		}
	}()
	return out
}

func square(ctx context.Context, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			select {
			case <-ctx.Done():
				return
			case out <- n * n:
			}
		}
	}()
	return out
}

func sumAll(in <-chan int) int {
	s := 0
	for v := range in {
		s += v
	}
	return s
}

func demoPipeline() {
	fmt.Println("--- 2) Pipeline gen -> square -> sum ---")

	// Run hoàn chỉnh 1..10 → 1+4+9+...+100 = 385
	ctx, cancel := context.WithCancel(context.Background())
	total := sumAll(square(ctx, gen(ctx, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)))
	cancel()
	fmt.Printf("sum(square(1..10)) = %d (expect 385)\n", total)

	// Cancel rất sớm để demo partial
	before := runtime.NumGoroutine()
	ctx2, cancel2 := context.WithTimeout(context.Background(), 1*time.Microsecond)
	partial := sumAll(square(ctx2, gen(ctx2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)))
	cancel2()
	time.Sleep(20 * time.Millisecond) // chờ goroutine thoát
	after := runtime.NumGoroutine()
	fmt.Printf("Partial sau cancel sớm = %d (≤ 385). Goroutine: %d → %d (không leak)\n",
		partial, before, after)
	fmt.Println()
}

// ============================================================
// 3) Fan-in merge N channel
// ============================================================

func fanIn(ctx context.Context, srcs ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	wg.Add(len(srcs))
	for _, src := range srcs {
		go func(c <-chan int) {
			defer wg.Done()
			for v := range c {
				select {
				case <-ctx.Done():
					return
				case out <- v:
				}
			}
		}(src)
	}
	go func() { wg.Wait(); close(out) }()
	return out
}

func demoFanIn() {
	fmt.Println("--- 3) Fan-in 3 channel ---")
	ctx := context.Background()
	c1 := gen(ctx, 1, 2, 3, 4, 5)
	c2 := gen(ctx, 10, 11, 12, 13, 14)
	c3 := gen(ctx, 100, 101, 102, 103, 104)
	merged := fanIn(ctx, c1, c2, c3)

	var collected []int
	for v := range merged {
		collected = append(collected, v)
	}
	fmt.Printf("Merged 15 phần tử (thứ tự interleave): %v\n", collected)
	fmt.Println()
}

// ============================================================
// 4) Semaphore (limit concurrency via buffered channel)
// ============================================================

func demoSemaphore() {
	fmt.Println("--- 4) Semaphore: 20 task, max 5 concurrent ---")

	sem := make(chan struct{}, 5)
	var wg sync.WaitGroup
	var running, peak int64

	start := time.Now()
	for i := 0; i < 20; i++ {
		sem <- struct{}{}
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			cur := atomic.AddInt64(&running, 1)
			for {
				p := atomic.LoadInt64(&peak)
				if cur <= p || atomic.CompareAndSwapInt64(&peak, p, cur) {
					break
				}
			}
			time.Sleep(30 * time.Millisecond)
			atomic.AddInt64(&running, -1)
			<-sem
		}(i)
	}
	wg.Wait()
	fmt.Printf("20 task xong trong %v, peak concurrent = %d (expect 5)\n",
		time.Since(start).Round(10*time.Millisecond), peak)
	fmt.Println()
}

// ============================================================
// 5) Mini errgroup
// ============================================================

type errgroup struct {
	wg     sync.WaitGroup
	cancel context.CancelFunc
	once   sync.Once
	err    error
}

func newErrgroup(parent context.Context) (*errgroup, context.Context) {
	ctx, cancel := context.WithCancel(parent)
	return &errgroup{cancel: cancel}, ctx
}

func (g *errgroup) Go(f func() error) {
	g.wg.Add(1)
	go func() {
		defer g.wg.Done()
		if err := f(); err != nil {
			g.once.Do(func() {
				g.err = err
				g.cancel()
			})
		}
	}()
}

func (g *errgroup) Wait() error {
	g.wg.Wait()
	g.cancel()
	return g.err
}

func demoMiniErrgroup() {
	fmt.Println("--- 5) Mini errgroup: fail-fast ---")
	g, ctx := newErrgroup(context.Background())

	urls := []string{"a", "b", "broken", "d", "e"}
	for _, u := range urls {
		u := u
		g.Go(func() error {
			if strings.Contains(u, "broken") {
				return errors.New("404: " + u)
			}
			select {
			case <-time.After(200 * time.Millisecond):
				return nil
			case <-ctx.Done():
				return ctx.Err()
			}
		})
	}
	start := time.Now()
	err := g.Wait()
	fmt.Printf("Wait return err=%v sau %v (fail fast — không chờ hết 200ms)\n",
		err, time.Since(start).Round(10*time.Millisecond))
	fmt.Println()
}

// ============================================================
// 6) Token-bucket rate limiter (đơn giản, không dùng x/time/rate)
// ============================================================

type rateLimiter struct {
	tokens chan struct{}
	stop   chan struct{}
}

func newRateLimiter(ratePerSec float64, burst int) *rateLimiter {
	rl := &rateLimiter{
		tokens: make(chan struct{}, burst),
		stop:   make(chan struct{}),
	}
	// Fill burst initial
	for i := 0; i < burst; i++ {
		rl.tokens <- struct{}{}
	}
	interval := time.Duration(float64(time.Second) / ratePerSec)
	go func() {
		ticker := time.NewTicker(interval)
		defer ticker.Stop()
		for {
			select {
			case <-rl.stop:
				return
			case <-ticker.C:
				select {
				case rl.tokens <- struct{}{}:
				default: // bucket đầy, drop
				}
			}
		}
	}()
	return rl
}

func (rl *rateLimiter) Wait(ctx context.Context) error {
	select {
	case <-rl.tokens:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func (rl *rateLimiter) Stop() { close(rl.stop) }

func demoRateLimiter() {
	fmt.Println("--- 6) Rate limiter: 20 req, 10 ops/s, burst 3 ---")
	rl := newRateLimiter(10, 3)
	defer rl.Stop()

	start := time.Now()
	for i := 0; i < 20; i++ {
		_ = rl.Wait(context.Background())
	}
	elapsed := time.Since(start)
	// Burst 3 instant, 17 còn lại cần 17/10 = 1.7s
	fmt.Printf("20 ops xong trong %v (expect ~1.7s — burst 3 instant, 17 cái sau 100ms/cái)\n",
		elapsed.Round(50*time.Millisecond))
	fmt.Println()
}

// ============================================================
// 7) Mini singleflight (dedupe same key)
// ============================================================

type sfCall struct {
	wg  sync.WaitGroup
	val interface{}
	err error
}

type sfGroup struct {
	mu sync.Mutex
	m  map[string]*sfCall
}

func newSFGroup() *sfGroup { return &sfGroup{m: make(map[string]*sfCall)} }

func (g *sfGroup) Do(key string, fn func() (interface{}, error)) (interface{}, error) {
	g.mu.Lock()
	if c, ok := g.m[key]; ok {
		g.mu.Unlock()
		c.wg.Wait() // share kết quả
		return c.val, c.err
	}
	c := &sfCall{}
	c.wg.Add(1)
	g.m[key] = c
	g.mu.Unlock()

	c.val, c.err = fn()
	c.wg.Done()

	g.mu.Lock()
	delete(g.m, key)
	g.mu.Unlock()

	return c.val, c.err
}

func demoSingleflight() {
	fmt.Println("--- 7) Singleflight: 100 caller cùng key, đếm fn call ---")
	sf := newSFGroup()
	var dbCalls int64

	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, _ = sf.Do("user:42", func() (interface{}, error) {
				atomic.AddInt64(&dbCalls, 1)
				time.Sleep(100 * time.Millisecond)
				return "user_42_data", nil
			})
		}()
	}
	wg.Wait()
	fmt.Printf("100 caller, dbCalls = %d (expect 1)\n", atomic.LoadInt64(&dbCalls))
	fmt.Println()
}

// ============================================================
// 8) Mini circuit breaker (Closed -> Open -> Half-open)
// ============================================================

type cbState int

const (
	cbClosed cbState = iota
	cbOpen
	cbHalfOpen
)

func (s cbState) String() string {
	switch s {
	case cbClosed:
		return "Closed"
	case cbOpen:
		return "Open"
	case cbHalfOpen:
		return "Half-open"
	}
	return "?"
}

type circuitBreaker struct {
	mu               sync.Mutex
	state            cbState
	consecFails      int
	failThreshold    int
	openTimeout      time.Duration
	openedAt         time.Time
}

func newCircuitBreaker(failThreshold int, openTimeout time.Duration) *circuitBreaker {
	return &circuitBreaker{
		state:         cbClosed,
		failThreshold: failThreshold,
		openTimeout:   openTimeout,
	}
}

var errCBOpen = errors.New("circuit open")

func (cb *circuitBreaker) Execute(fn func() error) error {
	cb.mu.Lock()
	switch cb.state {
	case cbOpen:
		if time.Since(cb.openedAt) > cb.openTimeout {
			cb.state = cbHalfOpen
		} else {
			cb.mu.Unlock()
			return errCBOpen
		}
	}
	cb.mu.Unlock()

	err := fn()

	cb.mu.Lock()
	defer cb.mu.Unlock()
	if err != nil {
		cb.consecFails++
		if cb.state == cbHalfOpen || cb.consecFails >= cb.failThreshold {
			cb.state = cbOpen
			cb.openedAt = time.Now()
		}
		return err
	}
	// success
	cb.consecFails = 0
	cb.state = cbClosed
	return nil
}

func (cb *circuitBreaker) State() cbState {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	return cb.state
}

func demoCircuitBreaker() {
	fmt.Println("--- 8) Circuit Breaker ---")
	cb := newCircuitBreaker(3, 300*time.Millisecond)

	failing := func() error { return errors.New("service down") }
	healthy := func() error { return nil }

	// 5 fail liên tiếp → trip Open sau cái thứ 3
	for i := 0; i < 5; i++ {
		err := cb.Execute(failing)
		fmt.Printf("call %d: err=%v, state=%s\n", i+1, err, cb.State())
	}

	// Chờ openTimeout → vào half-open
	time.Sleep(350 * time.Millisecond)
	fmt.Printf("Sau %v, call healthy: ", 350*time.Millisecond)
	err := cb.Execute(healthy)
	fmt.Printf("err=%v, state=%s\n", err, cb.State())
	fmt.Println()
}

// ============================================================
// 9) Graceful shutdown HTTP server
// ============================================================

func demoGracefulShutdown() {
	fmt.Println("--- 9) Graceful shutdown HTTP server ---")
	mux := http.NewServeMux()
	mux.HandleFunc("/slow", func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(500 * time.Millisecond):
			fmt.Fprintln(w, "slow done")
		case <-r.Context().Done():
		}
	})
	srv := &http.Server{Addr: "127.0.0.1:18036", Handler: mux}

	go func() {
		if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			fmt.Printf("server error: %v\n", err)
		}
	}()

	// Đảm bảo server lên
	time.Sleep(100 * time.Millisecond)

	clientDone := make(chan int, 1)
	go func() {
		resp, err := http.Get("http://127.0.0.1:18036/slow")
		if err != nil {
			clientDone <- -1
			return
		}
		defer resp.Body.Close()
		clientDone <- resp.StatusCode
	}()

	// Sau 150ms (client đã in-flight), shutdown với timeout 5s
	time.Sleep(150 * time.Millisecond)
	fmt.Println("Triggering graceful shutdown...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	start := time.Now()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		fmt.Printf("shutdown error: %v\n", err)
	}
	fmt.Printf("Shutdown clean trong %v\n", time.Since(start).Round(10*time.Millisecond))

	select {
	case code := <-clientDone:
		fmt.Printf("Client in-flight nhận status %d (expect 200 — handler được đợi)\n", code)
	case <-time.After(2 * time.Second):
		fmt.Println("Client timeout (handler bị drop)")
	}
	fmt.Println()

	// Cũng demo signal.NotifyContext nhưng KHÔNG block main — chỉ in mô tả.
	_ = signal.NotifyContext
	_ = os.Interrupt
	_ = syscall.SIGTERM
	fmt.Println("(Trong production: dùng signal.NotifyContext(ctx, os.Interrupt, syscall.SIGTERM))")
	fmt.Println()
}
