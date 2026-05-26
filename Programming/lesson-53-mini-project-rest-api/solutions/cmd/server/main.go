// Command server là entry point của Blog REST API.
//
// Khởi tạo theo thứ tự: storage → service → handler → router → middleware chain → http.Server.
// Hỗ trợ graceful shutdown: nhận SIGINT/SIGTERM, ngừng nhận request mới và chờ request
// đang xử lý xong (tối đa shutdownTimeout) trước khi thoát.
package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"blog-api/internal/auth"
	apperr "blog-api/internal/errors"
	"blog-api/internal/httpx"
	"blog-api/internal/middleware"
	"blog-api/internal/posts"
	"blog-api/internal/storage"
	"blog-api/internal/users"
)

const (
	defaultAddr     = ":8080"
	shutdownTimeout = 10 * time.Second
	tokenTTL        = 24 * time.Hour
)

func main() {
	log := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))

	// Đọc cấu hình từ biến môi trường (12-factor) với giá trị mặc định an toàn cho dev.
	addr := envOr("ADDR", defaultAddr)
	jwtSecret := envOr("JWT_SECRET", "dev-secret-doi-trong-production")
	allowedOrigin := envOr("CORS_ORIGIN", "*")

	handler := buildHandler(log, jwtSecret, allowedOrigin)

	srv := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	// Chạy server trong goroutine để main còn chờ tín hiệu shutdown.
	go func() {
		log.Info("server starting", "addr", addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Error("server error", "err", err)
			os.Exit(1)
		}
	}()

	// Chờ tín hiệu dừng.
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop
	log.Info("shutdown signal received")

	// Graceful shutdown: ngừng nhận request mới, chờ request đang chạy xong.
	ctx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Error("graceful shutdown failed", "err", err)
		os.Exit(1)
	}
	log.Info("server stopped cleanly")
}

// buildHandler lắp ráp toàn bộ ứng dụng và trả http.Handler đã gắn middleware.
// Tách riêng để test dễ (tạo handler không cần mở port thật).
func buildHandler(log *slog.Logger, jwtSecret, allowedOrigin string) http.Handler {
	// 1. Storage (in-memory).
	userRepo := storage.NewUserRepo()
	postRepo := storage.NewPostRepo()

	// 2. Auth signer.
	signer := auth.NewSigner(jwtSecret, tokenTTL, "blog-api")
	authMW := auth.Middleware(signer)

	// 3. Service (logic nghiệp vụ).
	userSvc := users.NewService(userRepo, signer)
	postSvc := posts.NewService(postRepo)

	// 4. Handler + router.
	mux := http.NewServeMux()
	users.NewHandler(userSvc).Register(mux, authMW)
	posts.NewHandler(postSvc).Register(mux, authMW)

	// Health check (không qua auth/rate limit nghiệp vụ — tiện cho probe).
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		httpx.WriteJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	// Bắt mọi route không khớp → 404 RFC 7807 (đồng nhất định dạng lỗi).
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		apperr.Write(w, r, apperr.NotFound("route không tồn tại: "+r.Method+" "+r.URL.Path))
	})

	// 5. Middleware chain — thứ tự từ NGOÀI vào TRONG:
	//    Recover → Logger → CORS → RateLimit → router.
	//    Recover ngoài cùng để bắt panic của cả các middleware khác.
	limiter := middleware.NewRateLimiter(100, 200) // 100 req/s, burst 200 mỗi IP
	chain := middleware.Recover(log)(
		middleware.Logger(log)(
			middleware.CORS(allowedOrigin)(
				limiter.Middleware()(mux),
			),
		),
	)
	return chain
}

func envOr(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
