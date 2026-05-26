package middleware

import "net/http"

// CORS (Cross-Origin Resource Sharing) cho phép trình duyệt ở origin khác gọi API.
// Trình duyệt gửi preflight OPTIONS trước các request "không đơn giản" → ta trả header
// cho phép rồi 204, không chạy tiếp handler.
func CORS(allowedOrigin string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Max-Age", "86400")

			// Preflight: trả luôn 204, không vào handler.
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
