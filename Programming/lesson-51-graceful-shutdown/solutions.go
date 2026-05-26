// Lesson 51 — Graceful Shutdown: solutions.go
//
// Chạy:  go run solutions.go
// Test thật: bấm Ctrl+C (gửi SIGINT) để xem chuỗi shutdown chạy đúng thứ tự.
//
// File này gộp các bài tập trong README thành MỘT chương trình chạy được,
// KHÔNG dùng external dependency (không cần `go get golang.org/x/sync/errgroup`)
// để `go run solutions.go` chạy ngay. Phần `errgroup` được thay bằng một
// mini-errgroup inline (chính nó tự cancel context khi có goroutine lỗi),
// giữ đúng ngữ nghĩa mà README mô tả.
//
// Các thành phần demo:
//  1. HTTP server :8080 với /slow, /livez, /readyz  (BT1, BT3)
//  2. Worker pool 3 goroutine đọc job từ channel    (BT2)
//  3. signal.NotifyContext bắt SIGINT/SIGTERM        (mục 2, mục 9)
//  4. Mini errgroup điều phối nhiều component        (mục 10)
//  5. Shutdown sequence theo dependency:             (mục 5)
//     readiness=false -> srv.Shutdown(ctx) -> drain worker -> close DB(mock)
//  6. Readiness toggle false trước khi shutdown      (BT3)
//
// LƯU Ý quan trọng về demo: chương trình KHÔNG block vô hạn. Nếu không nhận
// signal nào trong `autoShutdownAfter` giây, nó tự kích hoạt shutdown để
// CI / `go run` không treo. Khi test thủ công thì cứ bấm Ctrl+C sớm hơn.
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

// autoShutdownAfter: thời gian tự shutdown nếu không có signal (để demo không treo).
// Đặt nhỏ cho `go run` nhanh; khi test Ctrl+C thật thì bấm trước mốc này.
const autoShutdownAfter = 4 * time.Second

// ---------------------------------------------------------------------------
// Mini errgroup (inline) — thay cho golang.org/x/sync/errgroup
//
// Ngữ nghĩa giống errgroup.WithContext:
//   - goroutine đầu tiên return error -> cancel ctx của group -> các goroutine
//     khác nhận <-ctx.Done() và tự dừng.
//   - Wait() trả error ĐẦU TIÊN gặp phải.
// ---------------------------------------------------------------------------

type errGroup struct {
	wg     sync.WaitGroup
	once   sync.Once
	err    error
	cancel context.CancelFunc
}

// newErrGroup tạo group kèm một context con sẽ bị cancel khi:
//   - cha (parent) bị cancel (vd nhận signal), HOẶC
//   - một goroutine trong group return error.
func newErrGroup(parent context.Context) (*errGroup, context.Context) {
	ctx, cancel := context.WithCancel(parent)
	return &errGroup{cancel: cancel}, ctx
}

func (g *errGroup) Go(fn func() error) {
	g.wg.Add(1)
	go func() {
		defer g.wg.Done()
		if err := fn(); err != nil {
			// Chỉ ghi nhận error đầu tiên và cancel ctx một lần.
			g.once.Do(func() {
				g.err = err
				if g.cancel != nil {
					g.cancel()
				}
			})
		}
	}()
}

func (g *errGroup) Wait() error {
	g.wg.Wait()
	if g.cancel != nil {
		g.cancel()
	}
	return g.err
}

// ---------------------------------------------------------------------------
// Mock DB pool — đại diện cho resource phải đóng SAU CÙNG (mục 5).
// ---------------------------------------------------------------------------

type mockDB struct {
	closed atomic.Bool
}

func (db *mockDB) query(id int) error {
	if db.closed.Load() {
		// Đây chính là bug khi sequence sai: đóng DB trước khi handler/worker
		// dùng xong -> query gặp "connection closed".
		return errors.New("mockDB: query trên connection đã đóng")
	}
	time.Sleep(50 * time.Millisecond) // giả lập I/O
	return nil
}

func (db *mockDB) Close() {
	db.closed.Store(true)
	log.Println("[db]    mockDB.Close() — đóng connection pool (bước cuối)")
}

// ---------------------------------------------------------------------------
// Worker pool — đọc job từ channel, biết check ctx.Done() để không leak (mục 11).
// ---------------------------------------------------------------------------

func runWorker(ctx context.Context, id int, jobs <-chan int, db *mockDB) error {
	log.Printf("[worker %d] start", id)
	for {
		select {
		case <-ctx.Done():
			// Nhận tín hiệu dừng -> thoát, không leak goroutine.
			log.Printf("[worker %d] ctx.Done -> exit", id)
			return nil
		case job, ok := <-jobs:
			if !ok {
				log.Printf("[worker %d] jobs channel closed -> exit", id)
				return nil
			}
			// Xử lý job; dùng DB (vì vậy DB phải đóng SAU worker).
			if err := db.query(job); err != nil {
				log.Printf("[worker %d] job %d lỗi: %v", id, job, err)
				continue
			}
			log.Printf("[worker %d] xử lý xong job %d", id, job)
		}
	}
}

// ---------------------------------------------------------------------------
// HTTP handlers
// ---------------------------------------------------------------------------

func newMux(ready *atomic.Bool, db *mockDB) *http.ServeMux {
	mux := http.NewServeMux()

	// /slow: handler chạy 3s -> minh hoạ "in-flight request" cần drain.
	mux.HandleFunc("/slow", func(w http.ResponseWriter, r *http.Request) {
		// Dùng r.Context(): tự cancel khi client ngắt HOẶC khi srv.Shutdown đóng conn.
		select {
		case <-time.After(3 * time.Second):
			_, _ = w.Write([]byte("OK (slept 3s)\n"))
		case <-r.Context().Done():
			// Client bỏ đi hoặc server force-close sau timeout.
			return
		}
	})

	// /livez: liveness — chỉ trả 200 nếu process còn chạy. KHÔNG check dependency.
	mux.HandleFunc("/livez", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("alive\n"))
	})

	// /readyz: readiness — 200 nếu ready=true, 503 nếu false (đang shutdown / warm up).
	mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
		if !ready.Load() {
			http.Error(w, "not ready\n", http.StatusServiceUnavailable)
			return
		}
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ready\n"))
	})

	return mux
}

// ---------------------------------------------------------------------------
// main — lắp ráp toàn bộ + chuỗi graceful shutdown đúng thứ tự dependency.
// ---------------------------------------------------------------------------

func main() {
	log.SetFlags(log.Ltime | log.Lmicroseconds)

	// rootCtx tự cancel khi nhận SIGINT (Ctrl+C) hoặc SIGTERM (kill / k8s).
	// Đây là pattern signal.NotifyContext (Go 1.16+), gọn hơn signal.Notify thủ công.
	rootCtx, stop := signal.NotifyContext(context.Background(),
		os.Interrupt, syscall.SIGTERM)
	defer stop()

	var ready atomic.Bool
	ready.Store(true) // ban đầu sẵn sàng nhận traffic

	db := &mockDB{}
	jobs := make(chan int, 100)

	mux := newMux(&ready, db)
	srv := &http.Server{Addr: ":8080", Handler: mux}

	// Group điều phối: 1 goroutine chạy HTTP listener, 3 worker.
	// ctx của group bị cancel khi: nhận signal (rootCtx) HOẶC một goroutine lỗi.
	g, ctx := newErrGroup(rootCtx)

	// Goroutine HTTP listener.
	g.Go(func() error {
		log.Println("[http]  listening on :8080  (thử: curl localhost:8080/slow)")
		// ListenAndServe trả http.ErrServerClosed khi Shutdown được gọi — KHÔNG phải lỗi.
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			return fmt.Errorf("http listen: %w", err)
		}
		return nil
	})

	// 3 worker.
	var workerWg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		id := i
		workerWg.Add(1)
		g.Go(func() error {
			defer workerWg.Done()
			return runWorker(ctx, id, jobs, db)
		})
	}

	// Producer giả lập: bơm vài job để worker có việc làm.
	go func() {
		for n := 1; ; n++ {
			select {
			case <-ctx.Done():
				return
			case jobs <- n:
				time.Sleep(300 * time.Millisecond)
			}
		}
	}()

	// Auto-shutdown để demo không treo khi chạy không có signal.
	go func() {
		select {
		case <-ctx.Done():
			// Đã có signal thật, không cần auto.
		case <-time.After(autoShutdownAfter):
			log.Printf("[demo]  không có signal sau %v -> tự kích hoạt shutdown "+
				"(khi test thật, bấm Ctrl+C trước mốc này)", autoShutdownAfter)
			stop() // cancel rootCtx như thể nhận SIGTERM
		}
	}()

	// ----- Chờ tín hiệu shutdown (signal hoặc auto hoặc lỗi component) -----
	<-ctx.Done()
	log.Println("=== SHUTDOWN START ===")

	// BƯỚC 1: readiness=false NGAY LẬP TỨC.
	// K8s readiness probe sẽ thấy 503 -> remove pod khỏi Service endpoints -> LB
	// ngừng forward request mới. Đây phải là việc đầu tiên.
	ready.Store(false)
	log.Println("[step1] readiness=false (chờ LB drain — demo rút ngắn còn 500ms)")
	time.Sleep(500 * time.Millisecond) // production: ~5s = ≥2 chu kỳ probe

	// BƯỚC 2: srv.Shutdown — đóng listener, chờ in-flight handler done.
	// Dùng context RIÊNG có timeout, KHÔNG dùng ctx của group (ctx đã cancel rồi,
	// truyền vào sẽ khiến Shutdown return ngay, không drain gì).
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	log.Println("[step2] srv.Shutdown — chờ in-flight handler (timeout 10s)")
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("[step2] shutdown timeout/lỗi: %v -> force close", err)
		_ = srv.Close() // force đóng connection còn lại
	} else {
		log.Println("[step2] HTTP đã drain xong")
	}

	// BƯỚC 3: dừng worker và chờ job đang chạy hoàn tất.
	// ctx (group) đã cancel ở trên -> worker tự return; ta chờ chúng done.
	close(jobs) // không còn job mới; worker drain nốt rồi exit
	log.Println("[step3] chờ worker pool drain...")
	workerDone := make(chan struct{})
	go func() { workerWg.Wait(); close(workerDone) }()
	select {
	case <-workerDone:
		log.Println("[step3] worker pool đã dừng sạch")
	case <-time.After(10 * time.Second):
		log.Println("[step3] worker pool shutdown timeout")
	}

	// BƯỚC 4: flush log (ở đây log std không cần Sync; với zap thì logger.Sync()).
	log.Println("[step4] flush log/metric/trace (mock)")

	// BƯỚC 5: đóng DB SAU CÙNG — vì handler & worker đã dùng xong.
	db.Close()

	// Thu error đầu tiên của group (nếu có).
	if err := g.Wait(); err != nil {
		log.Printf("=== SHUTDOWN DONE (group error: %v) ===", err)
		os.Exit(1)
	}
	log.Println("=== SHUTDOWN COMPLETE — exit clean ===")
}
