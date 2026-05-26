package users

import (
	"net/http"

	"blog-api/internal/auth"
	apperr "blog-api/internal/errors"
	"blog-api/internal/httpx"
)

// Handler ánh xạ HTTP request → service. Handler chỉ lo I/O (decode/encode + status),
// còn logic nghiệp vụ nằm trong Service.
type Handler struct {
	svc *Service
}

// NewHandler tạo Handler.
func NewHandler(svc *Service) *Handler { return &Handler{svc: svc} }

// Register đăng ký router cho nhóm /v1/auth và /v1/users vào mux.
// authMW là middleware bắt buộc token (dùng cho route được bảo vệ).
func (h *Handler) Register(mux *http.ServeMux, authMW func(http.Handler) http.Handler) {
	// Route public.
	mux.HandleFunc("POST /v1/auth/register", h.register)
	mux.HandleFunc("POST /v1/auth/login", h.login)

	// Route được bảo vệ — bọc qua authMW.
	mux.Handle("GET /v1/users/me", authMW(http.HandlerFunc(h.me)))
}

func (h *Handler) register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := httpx.DecodeJSON(w, r, &req); err != nil {
		apperr.Write(w, r, err)
		return
	}
	resp, err := h.svc.Register(r.Context(), req)
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusCreated, resp)
}

func (h *Handler) login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := httpx.DecodeJSON(w, r, &req); err != nil {
		apperr.Write(w, r, err)
		return
	}
	resp, err := h.svc.Login(r.Context(), req)
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, resp)
}

func (h *Handler) me(w http.ResponseWriter, r *http.Request) {
	claims, ok := auth.ClaimsFrom(r.Context())
	if !ok {
		apperr.Write(w, r, apperr.Unauthorized("thiếu thông tin xác thực"))
		return
	}
	u, err := h.svc.Me(r.Context(), claims.Subject)
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, u)
}
