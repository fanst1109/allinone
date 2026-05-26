// Package users quản lý người dùng: model, service nghiệp vụ, HTTP handler.
package users

import "time"

// User là model người dùng lưu trong storage.
// PasswordHash KHÔNG BAO GIỜ lộ ra JSON (tag `json:"-"`).
type User struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"created_at"`
}

// RegisterRequest là payload đăng ký.
type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginRequest là payload đăng nhập.
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// AuthResponse trả token + thông tin user sau khi đăng ký/đăng nhập.
type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
