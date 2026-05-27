// Package memory chứa các DRIVEN ADAPTER hiện thực bằng bộ nhớ (map +
// mutex + channel). Vì sao in-memory? Môi trường học không có Postgres/Redis
// server, nhưng KIẾN TRÚC vẫn production-ready: mỗi struct ở đây thỏa đúng
// interface (port) do usecase định nghĩa, nên khi cần chỉ việc viết
// PostgresURLRepository / RedisCache thay vào composition root, KHÔNG đụng
// usecase hay domain.
package memory

import (
	"context"
	"sync"
	"sync/atomic"

	"urlshortener/internal/domain"
)

// URLRepository là bản in-memory của usecase.URLRepository.
// Production: thay bằng Postgres (bảng urls (code PK, original, created_at,
// expires_at), sequence cho NextID).
type URLRepository struct {
	mu      sync.RWMutex
	byCode  map[string]*domain.URL
	counter atomic.Uint64 // nguồn cho NextID (production: SQL sequence / Redis INCR)
}

// NewURLRepository khởi tạo repo rỗng.
func NewURLRepository() *URLRepository {
	return &URLRepository{byCode: make(map[string]*domain.URL)}
}

// Save lưu/ghi đè URL theo code.
func (r *URLRepository) Save(_ context.Context, u *domain.URL) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	// Copy để tránh caller giữ con trỏ rồi sửa ngầm state trong store.
	cp := *u
	r.byCode[u.Code] = &cp
	return nil
}

// FindByCode tra URL theo code; không thấy -> domain.ErrURLNotFound.
func (r *URLRepository) FindByCode(_ context.Context, code string) (*domain.URL, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	u, ok := r.byCode[code]
	if !ok {
		return nil, domain.ErrURLNotFound
	}
	cp := *u
	return &cp, nil
}

// Exists kiểm tra nhanh code có tồn tại không (cho collision check).
func (r *URLRepository) Exists(_ context.Context, code string) (bool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	_, ok := r.byCode[code]
	return ok, nil
}

// NextID trả về số nguyên tăng dần (atomic). Production: SQL sequence.
func (r *URLRepository) NextID(_ context.Context) (uint64, error) {
	return r.counter.Add(1), nil
}
