package middleware

import (
	"log/slog"
	"net/http"
	"runtime/debug"

	apperr "blog-api/internal/errors"
)

// Recover bắt panic trong handler, log stack trace và trả 500 RFC 7807
// thay vì làm sập cả server. Đây là "lưới an toàn" — đặt ngoài cùng chuỗi middleware.
func Recover(log *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					log.Error("panic recovered",
						"panic", rec,
						"path", r.URL.Path,
						"stack", string(debug.Stack()),
					)
					// KHÔNG lộ chi tiết panic cho client — chỉ thông báo chung.
					apperr.Write(w, r, apperr.Internal("đã xảy ra lỗi không mong muốn"))
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}
