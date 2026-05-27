// Command server là COMPOSITION ROOT — nơi DUY NHẤT biết về implementation
// cụ thể. Ở đây ta wire (lắp ráp) các adapter in-memory vào usecase, bọc
// middleware, khởi động analytics worker, và chạy HTTP server với graceful
// shutdown (Lesson 51).
//
// Muốn chuyển sang Postgres + Redis + Kafka thật? CHỈ sửa file này: thay
// memory.NewURLRepository() bằng postgres.NewURLRepository(db), v.v. Usecase,
// domain, handler KHÔNG đổi — đó là phần thưởng của clean architecture.
package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"urlshortener/internal/adapter/analytics"
	adapterhttp "urlshortener/internal/adapter/http"
	"urlshortener/internal/adapter/memory"
	"urlshortener/internal/usecase"
	"urlshortener/pkg/observability"
)

func main() {
	log := observability.NewLogger()

	addr := getenv("ADDR", ":8080")
	baseURL := getenv("BASE_URL", "http://localhost"+addr)

	// --- (1) Wire driven adapter (in-memory; production: Postgres/Redis/Kafka) ---
	repo := memory.NewURLRepository()
	cache := memory.NewCache()
	queue := memory.NewClickQueue(1024)

	// --- (2) Khởi động analytics worker (consumer của queue) ---
	worker := analytics.NewWorker(queue.Events())
	workerCtx, stopWorker := context.WithCancel(context.Background())
	go worker.Run(workerCtx)

	// --- (3) Wire usecase (tiêm port vào) ---
	// useCounter=false -> sinh code random 7 ký tự. Đổi true để dùng counter.
	shortenUC := usecase.NewShorten(repo, cache, usecase.SystemClock, false)
	redirectUC := usecase.NewRedirect(repo, cache, queue, usecase.SystemClock)
	statsUC := usecase.NewStats(repo, worker) // worker đóng vai StatsStore

	// --- (4) Wire driving adapter (HTTP handler) + middleware ---
	handler := adapterhttp.NewHandler(shortenUC, redirectUC, statsUC, baseURL)
	root := adapterhttp.Chain(
		handler.Routes(),
		adapterhttp.RequestID(),
		adapterhttp.Logger(log),
		adapterhttp.Recover(log),
		adapterhttp.RateLimit(100, 200), // 100 rps, burst 200, theo IP
	)

	srv := &http.Server{
		Addr:         addr,
		Handler:      root,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// --- (5) Chạy server trong goroutine ---
	go func() {
		log.Info("server_starting", "addr", addr, "base_url", baseURL)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Error("server_error", "error", err)
			os.Exit(1)
		}
	}()

	// --- (6) Graceful shutdown (Lesson 51) ---
	// Chờ SIGINT/SIGTERM, rồi tắt theo thứ tự: HTTP server (ngừng nhận request
	// mới, chờ request đang xử lý xong) -> đóng queue -> chờ worker drain hết.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Info("shutdown_initiated")

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Error("shutdown_error", "error", err)
	}

	// Đóng queue -> worker drain các event còn lại rồi dừng.
	queue.Close()
	worker.Wait()
	stopWorker()
	log.Info("shutdown_complete", "clicks_processed", worker.Processed())
}

func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
