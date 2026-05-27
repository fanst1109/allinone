package http

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"log/slog"
	"net/http"
	"sync"
	"time"
)

// Middleware là kiểu chuẩn: nhận một handler, trả handler đã bọc.
type Middleware func(http.Handler) http.Handler

// Chain bọc h bằng các middleware theo thứ tự: mws[0] ngoài cùng.
// Ví dụ Chain(h, A, B) => A(B(h)) => request đi qua A trước, rồi B, rồi h.
func Chain(h http.Handler, mws ...Middleware) http.Handler {
	for i := len(mws) - 1; i >= 0; i-- {
		h = mws[i](h)
	}
	return h
}

// ctxKey là kiểu riêng cho key trong context (tránh va chạm).
type ctxKey string

const requestIDKey ctxKey = "request_id"

// RequestIDFrom lấy request ID từ context (rỗng nếu không có).
func RequestIDFrom(ctx context.Context) string {
	if v, ok := ctx.Value(requestIDKey).(string); ok {
		return v
	}
	return ""
}

// RequestID gắn một ID duy nhất cho mỗi request (header X-Request-ID).
// Dùng để truy vết log xuyên suốt một request (chuẩn bị cho tracing L74).
func RequestID() Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			id := r.Header.Get("X-Request-ID")
			if id == "" {
				id = newID()
			}
			w.Header().Set("X-Request-ID", id)
			ctx := context.WithValue(r.Context(), requestIDKey, id)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// statusRecorder bọc ResponseWriter để bắt status code cho logging.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (sr *statusRecorder) WriteHeader(code int) {
	sr.status = code
	sr.ResponseWriter.WriteHeader(code)
}

// Logger ghi log structured (JSON) cho mỗi request: method, path, status,
// thời lượng, request ID (Lesson 72).
func Logger(log *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			sr := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
			next.ServeHTTP(sr, r)
			log.Info("http_request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", sr.status,
				"duration_ms", time.Since(start).Milliseconds(),
				"request_id", RequestIDFrom(r.Context()),
			)
		})
	}
}

// Recover bắt panic trong handler, trả 500 thay vì crash cả server.
func Recover(log *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					log.Error("panic_recovered",
						"error", rec,
						"path", r.URL.Path,
						"request_id", RequestIDFrom(r.Context()),
					)
					writeProblem(w, http.StatusInternalServerError, "internal", "lỗi nội bộ")
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

// --- Rate limit (Lesson 52) — token bucket đơn giản theo IP ---

// rateLimiter là token bucket: mỗi IP có một bucket, hồi token theo thời gian.
type rateLimiter struct {
	mu       sync.Mutex
	buckets  map[string]*bucket
	rate     float64 // token hồi mỗi giây
	capacity float64 // số token tối đa (cho phép burst)
}

type bucket struct {
	tokens float64
	last   time.Time
}

// RateLimit tạo middleware giới hạn rps token/giây, burst = capacity.
func RateLimit(rps float64, capacity float64) Middleware {
	rl := &rateLimiter{
		buckets:  make(map[string]*bucket),
		rate:     rps,
		capacity: capacity,
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !rl.allow(clientIP(r)) {
				w.Header().Set("Retry-After", "1")
				writeProblem(w, http.StatusTooManyRequests, "rate-limited", "Quá nhiều yêu cầu, thử lại sau")
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// allow trả true nếu IP còn token. Thuật toán token bucket:
// hồi token = (thời gian trôi qua) * rate, cộng dồn (không vượt capacity),
// rồi trừ 1 nếu đủ.
func (rl *rateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	b, ok := rl.buckets[ip]
	if !ok {
		// IP mới: bucket đầy.
		rl.buckets[ip] = &bucket{tokens: rl.capacity - 1, last: now}
		return true
	}
	// Hồi token theo thời gian trôi qua.
	elapsed := now.Sub(b.last).Seconds()
	b.tokens += elapsed * rl.rate
	if b.tokens > rl.capacity {
		b.tokens = rl.capacity
	}
	b.last = now

	if b.tokens >= 1 {
		b.tokens--
		return true
	}
	return false
}

// newID sinh request ID ngẫu nhiên 16 hex (8 byte).
func newID() string {
	var b [8]byte
	_, _ = rand.Read(b[:])
	return hex.EncodeToString(b[:])
}
