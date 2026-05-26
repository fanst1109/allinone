// Package post chứa service (logic nghiệp vụ) và handler (lớp HTTP) cho domain
// "bài viết blog". Các ENTITY (Post, Comment, ...) nằm ở package `model` để
// tránh import cycle với `storage` (xem giải thích trong internal/model).
//
// Package này kết nối 4 storage layer:
//   - storage  (mô phỏng Postgres): lưu trữ bền vững, có transaction.
//   - cache    (mô phỏng Redis):    cache-aside cho Get post.
//   - search   (inverted index):    full-text search + TF-IDF ranking.
//   - migration:                    theo dõi schema version (chạy lúc khởi động).
//
// Để code đọc tự nhiên (post.Post, post.CreatePostInput, ...) ta khai báo type
// alias trỏ về model. Alias = đúng cùng một kiểu, không phải kiểu mới.
package post

import "blog-backend/internal/model"

type (
	Post            = model.Post
	Comment         = model.Comment
	CreatePostInput = model.CreatePostInput
	UpdatePostInput = model.UpdatePostInput
	ListParams      = model.ListParams
	PageResult      = model.PageResult
	SearchHit       = model.SearchHit
)
