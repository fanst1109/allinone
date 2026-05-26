package posts

import (
	"net/http"

	"blog-api/internal/auth"
	apperr "blog-api/internal/errors"
	"blog-api/internal/httpx"
)

// Handler ánh xạ HTTP request về CRUD post.
type Handler struct {
	svc *Service
}

// NewHandler tạo Handler.
func NewHandler(svc *Service) *Handler { return &Handler{svc: svc} }

// Register đăng ký các route CRUD vào mux.
// - GET (list/get): public.
// - POST/PUT/DELETE: bảo vệ bằng authMW (cần token).
func (h *Handler) Register(mux *http.ServeMux, authMW func(http.Handler) http.Handler) {
	mux.HandleFunc("GET /v1/posts", h.list)
	mux.HandleFunc("GET /v1/posts/{id}", h.get)

	mux.Handle("POST /v1/posts", authMW(http.HandlerFunc(h.create)))
	mux.Handle("PUT /v1/posts/{id}", authMW(http.HandlerFunc(h.update)))
	mux.Handle("DELETE /v1/posts/{id}", authMW(http.HandlerFunc(h.delete)))
}

func (h *Handler) list(w http.ResponseWriter, r *http.Request) {
	resp, err := h.svc.List(r.Context())
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, resp)
}

func (h *Handler) get(w http.ResponseWriter, r *http.Request) {
	p, err := h.svc.Get(r.Context(), r.PathValue("id"))
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, p)
}

func (h *Handler) create(w http.ResponseWriter, r *http.Request) {
	claims, _ := auth.ClaimsFrom(r.Context())
	var req CreateRequest
	if err := httpx.DecodeJSON(w, r, &req); err != nil {
		apperr.Write(w, r, err)
		return
	}
	p, err := h.svc.Create(r.Context(), claims.Subject, req)
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusCreated, p)
}

func (h *Handler) update(w http.ResponseWriter, r *http.Request) {
	claims, _ := auth.ClaimsFrom(r.Context())
	var req UpdateRequest
	if err := httpx.DecodeJSON(w, r, &req); err != nil {
		apperr.Write(w, r, err)
		return
	}
	p, err := h.svc.Update(r.Context(), claims.Subject, r.PathValue("id"), req)
	if err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.WriteJSON(w, http.StatusOK, p)
}

func (h *Handler) delete(w http.ResponseWriter, r *http.Request) {
	claims, _ := auth.ClaimsFrom(r.Context())
	if err := h.svc.Delete(r.Context(), claims.Subject, r.PathValue("id")); err != nil {
		apperr.Write(w, r, err)
		return
	}
	httpx.NoContent(w)
}
