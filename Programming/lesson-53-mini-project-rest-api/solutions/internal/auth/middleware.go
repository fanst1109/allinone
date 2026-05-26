package auth

import (
	"context"
	"net/http"
	"strings"

	apperr "blog-api/internal/errors"
)

// ctxKey là kiểu riêng cho key trong context (tránh va chạm key giữa các package).
type ctxKey string

const claimsKey ctxKey = "auth.claims"

// Middleware trả về một http middleware bắt buộc Bearer token hợp lệ.
// Nếu hợp lệ → gắn Claims vào context cho handler phía sau dùng.
func Middleware(signer *Signer) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Header dạng: "Authorization: Bearer <token>"
			h := r.Header.Get("Authorization")
			const prefix = "Bearer "
			if !strings.HasPrefix(h, prefix) {
				apperr.Write(w, r, apperr.Unauthorized("thiếu header Authorization: Bearer <token>"))
				return
			}
			token := strings.TrimSpace(strings.TrimPrefix(h, prefix))

			claims, err := signer.Parse(token)
			if err != nil {
				apperr.Write(w, r, apperr.Unauthorized("token không hợp lệ: "+err.Error()))
				return
			}

			ctx := context.WithValue(r.Context(), claimsKey, claims)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// ClaimsFrom lấy Claims đã được middleware gắn vào context.
// Handler dùng để biết "ai đang gọi". Trả (nil, false) nếu route không qua middleware.
func ClaimsFrom(ctx context.Context) (*Claims, bool) {
	c, ok := ctx.Value(claimsKey).(*Claims)
	return c, ok
}
