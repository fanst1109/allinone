package middleware

import (
	"net"
	"net/http"
	"sync"
	"time"

	apperr "blog-api/internal/errors"
)

// Token bucket rate limiter theo IP.
//
// 💡 Trực giác: mỗi client có một "xô" chứa token. Mỗi request tiêu 1 token.
// Token được nạp lại đều đặn (rate token/giây), tối đa burst token. Hết token → 429.
// Cho phép bùng nổ ngắn (burst) nhưng giới hạn tốc độ trung bình.

type bucket struct {
	tokens float64   // số token còn lại
	last   time.Time // lần cập nhật gần nhất
}

// RateLimiter giới hạn tốc độ request theo IP.
type RateLimiter struct {
	mu      sync.Mutex
	buckets map[string]*bucket
	rate    float64 // token nạp mỗi giây
	burst   float64 // sức chứa tối đa của xô
	now     func() time.Time
}

// NewRateLimiter tạo limiter: rate token/giây, cho phép burst tức thời.
func NewRateLimiter(rate, burst float64) *RateLimiter {
	return &RateLimiter{
		buckets: make(map[string]*bucket),
		rate:    rate,
		burst:   burst,
		now:     time.Now,
	}
}

// allow kiểm tra và tiêu 1 token cho key (IP). Trả false nếu hết token.
func (l *RateLimiter) allow(key string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := l.now()
	b, ok := l.buckets[key]
	if !ok {
		// Lần đầu thấy IP này → xô đầy.
		l.buckets[key] = &bucket{tokens: l.burst - 1, last: now}
		return true
	}

	// Nạp token theo thời gian trôi qua kể từ lần trước.
	elapsed := now.Sub(b.last).Seconds()
	b.tokens += elapsed * l.rate
	if b.tokens > l.burst {
		b.tokens = l.burst
	}
	b.last = now

	if b.tokens < 1 {
		return false
	}
	b.tokens--
	return true
}

// Middleware trả về middleware áp rate limit.
func (l *RateLimiter) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !l.allow(clientIP(r)) {
				w.Header().Set("Retry-After", "1")
				apperr.Write(w, r, apperr.New(
					apperr.CodeRateLimited, http.StatusTooManyRequests,
					"Too Many Requests", "vượt quá giới hạn tốc độ, thử lại sau"))
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// clientIP lấy IP client từ request (ưu tiên X-Forwarded-For khi đứng sau proxy).
func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// X-Forwarded-For: client, proxy1, proxy2 → lấy phần tử đầu.
		if i := indexByte(xff, ','); i >= 0 {
			return trim(xff[:i])
		}
		return trim(xff)
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

func indexByte(s string, c byte) int {
	for i := 0; i < len(s); i++ {
		if s[i] == c {
			return i
		}
	}
	return -1
}

func trim(s string) string {
	for len(s) > 0 && (s[0] == ' ' || s[0] == '\t') {
		s = s[1:]
	}
	for len(s) > 0 && (s[len(s)-1] == ' ' || s[len(s)-1] == '\t') {
		s = s[:len(s)-1]
	}
	return s
}
