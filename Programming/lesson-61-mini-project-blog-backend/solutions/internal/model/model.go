// Package model chứa các ENTITY dùng chung cho mọi tầng (post, storage, cache,
// search). Tách riêng để tránh import cycle: nếu để entity trong package `post`,
// thì `storage` (cần biết Post) phải import `post`, mà `post` lại import
// `storage` -> vòng lặp import (Go cấm). Đặt entity ở package "lá" không phụ
// thuộc ai là pattern chuẩn để gỡ cycle.
package model

import "time"

// Post là model của một bài viết blog — tương ứng 1 dòng bảng `posts`.
type Post struct {
	ID        int64     `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Tags      []string  `json:"tags"`
	Views     int64     `json:"views"` // BT5: cột thêm qua migration v3.
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Comment — bảng con của posts (BT1). FOREIGN KEY (post_id) REFERENCES posts(id).
type Comment struct {
	ID        int64     `json:"id"`
	PostID    int64     `json:"post_id"`
	Author    string    `json:"author"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

// CreatePostInput — payload tạo post (server tự sinh id/timestamps).
type CreatePostInput struct {
	Title string   `json:"title"`
	Body  string   `json:"body"`
	Tags  []string `json:"tags"`
}

// UpdatePostInput — payload cập nhật post.
type UpdatePostInput struct {
	Title string   `json:"title"`
	Body  string   `json:"body"`
	Tags  []string `json:"tags"`
}

// ListParams — tham số phân trang + lọc cho endpoint list.
type ListParams struct {
	Page    int    // bắt đầu từ 1.
	PerPage int    // số item mỗi trang.
	Tag     string // BT4: lọc theo tag (rỗng = không lọc).
}

// PageResult — kết quả phân trang trả về cho client.
type PageResult struct {
	Items   []*Post `json:"items"`
	Page    int     `json:"page"`
	PerPage int     `json:"per_page"`
	Total   int     `json:"total"`
}

// SearchHit — 1 kết quả search kèm điểm relevance (TF-IDF).
type SearchHit struct {
	Post  *Post   `json:"post"`
	Score float64 `json:"score"`
}
