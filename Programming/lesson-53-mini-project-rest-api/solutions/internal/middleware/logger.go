// Package middleware chứa các HTTP middleware dùng chung: log, recover, rate limit, CORS.
//
// Middleware là hàm bọc một http.Handler để thêm hành vi (logging, auth, ...).
// Chúng ghép nối thành "chuỗi": request đi xuyên qua từng lớp trước khi tới handler,
// rồi response đi ngược ra. Thứ tự ghép quyết định thứ tự thực thi.
package middleware

import (
	"log/slog"
	"net/http"
	"time"
)

// statusRecorder bọc ResponseWriter để bắt được status code đã ghi (phục vụ log).
type statusRecorder struct {
	http.ResponseWriter
	status int
	bytes  int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *statusRecorder) Write(b []byte) (int, error) {
	if r.status == 0 {
		r.status = http.StatusOK // ghi body mà chưa set status → mặc định 200
	}
	n, err := r.ResponseWriter.Write(b)
	r.bytes += n
	return n, err
}

// Logger log mỗi request: method, path, status, thời lượng.
func Logger(log *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w}
			next.ServeHTTP(rec, r)
			if rec.status == 0 {
				rec.status = http.StatusOK
			}
			log.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", rec.status,
				"bytes", rec.bytes,
				"duration_ms", time.Since(start).Milliseconds(),
				"remote", clientIP(r),
			)
		})
	}
}
