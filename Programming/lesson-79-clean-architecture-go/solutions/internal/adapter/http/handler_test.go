package http_test

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	httpadapter "cleanarch/internal/adapter/http"
	"cleanarch/internal/domain"
)

// fakeSvc thỏa driving port http.UserService — cho phép test handler mà
// không cần usecase/repo thật.
type fakeSvc struct {
	registerErr error
	user        *domain.User
}

func (f fakeSvc) Register(_ context.Context, name, email string) (*domain.User, error) {
	if f.registerErr != nil {
		return nil, f.registerErr
	}
	return &domain.User{ID: "u1", Name: name, Email: email}, nil
}
func (f fakeSvc) Get(_ context.Context, id string) (*domain.User, error) {
	if f.user == nil {
		return nil, domain.ErrUserNotFound
	}
	return f.user, nil
}
func (f fakeSvc) Rename(_ context.Context, id, n string) (*domain.User, error) {
	return &domain.User{ID: id, Name: n}, nil
}

func TestRegister_Created(t *testing.T) {
	h := httpadapter.NewHandler(fakeSvc{})
	req := httptest.NewRequest(http.MethodPost, "/users",
		strings.NewReader(`{"name":"Alice","email":"a@x.com"}`))
	rec := httptest.NewRecorder()
	h.Routes().ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d, muốn 201", rec.Code)
	}
	var out map[string]string
	_ = json.Unmarshal(rec.Body.Bytes(), &out)
	if out["name"] != "Alice" {
		t.Fatalf("body sai: %s", rec.Body.String())
	}
}

func TestRegister_DomainErrorMapped(t *testing.T) {
	h := httpadapter.NewHandler(fakeSvc{registerErr: domain.ErrEmailTaken})
	req := httptest.NewRequest(http.MethodPost, "/users",
		strings.NewReader(`{"name":"Alice","email":"a@x.com"}`))
	rec := httptest.NewRecorder()
	h.Routes().ServeHTTP(rec, req)

	if rec.Code != http.StatusConflict {
		t.Fatalf("status = %d, muốn 409 cho ErrEmailTaken", rec.Code)
	}
}

func TestGet_NotFound(t *testing.T) {
	h := httpadapter.NewHandler(fakeSvc{user: nil})
	req := httptest.NewRequest(http.MethodGet, "/users/u9", nil)
	rec := httptest.NewRecorder()
	h.Routes().ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("status = %d, muốn 404", rec.Code)
	}
}
