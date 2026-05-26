package posts

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"strings"
	"time"

	apperr "blog-api/internal/errors"
)

// Repo là cổng truy cập dữ liệu post.
type Repo interface {
	Create(ctx context.Context, p *Post) error
	GetByID(ctx context.Context, id string) (*Post, error)
	List(ctx context.Context) ([]Post, error)
	Update(ctx context.Context, p *Post) error
	Delete(ctx context.Context, id string) error
}

// Service chứa logic nghiệp vụ về post + kiểm tra quyền sở hữu.
type Service struct {
	repo Repo
	now  func() time.Time
}

// NewService tạo Service.
func NewService(repo Repo) *Service {
	return &Service{repo: repo, now: time.Now}
}

// Create tạo bài mới do authorID viết.
func (s *Service) Create(ctx context.Context, authorID string, req CreateRequest) (*Post, error) {
	req.Title = strings.TrimSpace(req.Title)
	req.Body = strings.TrimSpace(req.Body)
	if fields := validate(req.Title, req.Body); len(fields) > 0 {
		return nil, apperr.Validation("dữ liệu bài viết không hợp lệ", fields)
	}
	now := s.now().UTC()
	p := &Post{
		ID:        newID(),
		AuthorID:  authorID,
		Title:     req.Title,
		Body:      req.Body,
		CreatedAt: now,
		UpdatedAt: now,
	}
	if err := s.repo.Create(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

// Get lấy 1 bài (public — ai cũng đọc được).
func (s *Service) Get(ctx context.Context, id string) (*Post, error) {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, apperr.NotFound("không tìm thấy bài viết")
	}
	return p, nil
}

// List trả toàn bộ bài (public).
func (s *Service) List(ctx context.Context) (*ListResponse, error) {
	items, err := s.repo.List(ctx)
	if err != nil {
		return nil, apperr.Internal("không đọc được danh sách bài viết")
	}
	return &ListResponse{Items: items, Total: len(items)}, nil
}

// Update sửa bài — CHỈ tác giả mới sửa được (kiểm tra ownership → 403 nếu không phải).
func (s *Service) Update(ctx context.Context, actorID, id string, req UpdateRequest) (*Post, error) {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, apperr.NotFound("không tìm thấy bài viết")
	}
	if p.AuthorID != actorID {
		return nil, apperr.Forbidden("bạn không phải tác giả của bài này")
	}
	req.Title = strings.TrimSpace(req.Title)
	req.Body = strings.TrimSpace(req.Body)
	if fields := validate(req.Title, req.Body); len(fields) > 0 {
		return nil, apperr.Validation("dữ liệu bài viết không hợp lệ", fields)
	}
	p.Title = req.Title
	p.Body = req.Body
	p.UpdatedAt = s.now().UTC()
	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

// Delete xoá bài — CHỈ tác giả mới xoá được.
func (s *Service) Delete(ctx context.Context, actorID, id string) error {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return apperr.NotFound("không tìm thấy bài viết")
	}
	if p.AuthorID != actorID {
		return apperr.Forbidden("bạn không phải tác giả của bài này")
	}
	return s.repo.Delete(ctx, id)
}

func validate(title, body string) map[string]string {
	fields := map[string]string{}
	if len(title) < 3 || len(title) > 200 {
		fields["title"] = "độ dài 3-200 ký tự"
	}
	if len(body) < 1 {
		fields["body"] = "không được rỗng"
	}
	return fields
}

func newID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
