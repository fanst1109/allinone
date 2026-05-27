// Package http là DRIVING ADAPTER: nó nhận request từ thế giới ngoài
// (HTTP) và gọi vào usecase. Mọi thứ "framework-specific" (đọc body,
// set status code, encode JSON) nằm ở đây — KHÔNG rò vào usecase/domain.
//
// Handler chỉ phụ thuộc vào một interface nhỏ (UserService) do CHÍNH NÓ
// định nghĩa — đó là driving port. Nhờ vậy có thể test handler với mock
// service, và có thể thay *usecase.UserUsecase bằng bất cứ gì khớp port.
package http

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"cleanarch/internal/domain"
)

// UserService là driving port — tập hợp thao tác mà tầng HTTP cần.
// usecase.UserUsecase thỏa interface này (structural typing của Go).
type UserService interface {
	Register(ctx context.Context, name, email string) (*domain.User, error)
	Get(ctx context.Context, id string) (*domain.User, error)
	Rename(ctx context.Context, id, newName string) (*domain.User, error)
}

// Handler dịch HTTP <-> usecase. Không chứa business rule.
type Handler struct {
	svc UserService
}

// NewHandler nhận service qua constructor injection.
func NewHandler(svc UserService) *Handler { return &Handler{svc: svc} }

// userDTO là Data Transfer Object — hình dạng JSON ở biên hệ thống.
// Tách DTO khỏi domain.User để thay đổi API không kéo theo đổi domain.
type userDTO struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func toDTO(u *domain.User) userDTO {
	return userDTO{ID: u.ID, Name: u.Name, Email: u.Email}
}

// Routes trả về một http.Handler đã gắn route — composition root sẽ mount.
func (h *Handler) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /users", h.register)
	mux.HandleFunc("GET /users/{id}", h.get)
	mux.HandleFunc("PATCH /users/{id}", h.rename)
	return mux
}

func (h *Handler) register(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeErr(w, http.StatusBadRequest, "JSON không hợp lệ")
		return
	}
	u, err := h.svc.Register(r.Context(), in.Name, in.Email)
	if err != nil {
		writeDomainErr(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, toDTO(u))
}

func (h *Handler) get(w http.ResponseWriter, r *http.Request) {
	u, err := h.svc.Get(r.Context(), r.PathValue("id"))
	if err != nil {
		writeDomainErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, toDTO(u))
}

func (h *Handler) rename(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeErr(w, http.StatusBadRequest, "JSON không hợp lệ")
		return
	}
	u, err := h.svc.Rename(r.Context(), r.PathValue("id"), in.Name)
	if err != nil {
		writeDomainErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, toDTO(u))
}

// writeDomainErr map LỖI MIỀN -> HTTP status. Việc dịch lỗi nghiệp vụ
// sang mã giao thức là trách nhiệm của adapter, không phải của domain.
func writeDomainErr(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, domain.ErrUserNotFound):
		writeErr(w, http.StatusNotFound, err.Error())
	case errors.Is(err, domain.ErrEmailTaken):
		writeErr(w, http.StatusConflict, err.Error())
	case errors.Is(err, domain.ErrEmptyName),
		errors.Is(err, domain.ErrInvalidEmail),
		errors.Is(err, domain.ErrNameTooLong):
		writeErr(w, http.StatusBadRequest, err.Error())
	default:
		writeErr(w, http.StatusInternalServerError, "lỗi nội bộ")
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeErr(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}
