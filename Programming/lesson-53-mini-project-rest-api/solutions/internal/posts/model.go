// Package posts quản lý bài viết blog: model, service, HTTP handler (CRUD).
package posts

import "time"

// Post là model bài viết.
type Post struct {
	ID        string    `json:"id"`
	AuthorID  string    `json:"author_id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreateRequest là payload tạo bài.
type CreateRequest struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

// UpdateRequest là payload sửa bài.
type UpdateRequest struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

// ListResponse bọc danh sách bài + tổng số (chừa chỗ cho phân trang sau này).
type ListResponse struct {
	Items []Post `json:"items"`
	Total int    `json:"total"`
}
