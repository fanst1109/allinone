// Package storage cung cấp implementation lưu trữ. Ở đây là in-memory (map + mutex)
// — đủ cho demo/test. Đổi sang Postgres chỉ cần viết struct mới thoả cùng interface.
package storage

import (
	"context"
	"errors"
	"sort"
	"sync"

	"blog-api/internal/posts"
	"blog-api/internal/users"
)

// ErrNotFound là lỗi nội bộ của storage khi không tìm thấy record.
// Service sẽ map lỗi này thành AppError NotFound thân thiện hơn.
var ErrNotFound = errors.New("record không tồn tại")

// UserRepo lưu user trong memory, an toàn cho truy cập đồng thời nhờ sync.RWMutex.
type UserRepo struct {
	mu     sync.RWMutex
	byID   map[string]*users.User
	byName map[string]string // username -> id
}

// NewUserRepo tạo repo rỗng.
func NewUserRepo() *UserRepo {
	return &UserRepo{
		byID:   make(map[string]*users.User),
		byName: make(map[string]string),
	}
}

// Create thêm user mới (lỗi nếu username đã tồn tại).
func (r *UserRepo) Create(_ context.Context, u *users.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, ok := r.byName[u.Username]; ok {
		return errors.New("username đã tồn tại")
	}
	cp := *u // copy giá trị để caller không sửa được record bên trong
	r.byID[u.ID] = &cp
	r.byName[u.Username] = u.ID
	return nil
}

// GetByID trả bản copy user theo ID.
func (r *UserRepo) GetByID(_ context.Context, id string) (*users.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	u, ok := r.byID[id]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *u
	return &cp, nil
}

// GetByUsername trả bản copy user theo username.
func (r *UserRepo) GetByUsername(_ context.Context, username string) (*users.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	id, ok := r.byName[username]
	if !ok {
		return nil, ErrNotFound
	}
	u := r.byID[id]
	cp := *u
	return &cp, nil
}

// PostRepo lưu post trong memory.
type PostRepo struct {
	mu   sync.RWMutex
	byID map[string]*posts.Post
}

// NewPostRepo tạo repo rỗng.
func NewPostRepo() *PostRepo {
	return &PostRepo{byID: make(map[string]*posts.Post)}
}

// Create thêm post.
func (r *PostRepo) Create(_ context.Context, p *posts.Post) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	cp := *p
	r.byID[p.ID] = &cp
	return nil
}

// GetByID trả bản copy post.
func (r *PostRepo) GetByID(_ context.Context, id string) (*posts.Post, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	p, ok := r.byID[id]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *p
	return &cp, nil
}

// List trả toàn bộ post, sắp xếp mới nhất trước.
func (r *PostRepo) List(_ context.Context) ([]posts.Post, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	out := make([]posts.Post, 0, len(r.byID))
	for _, p := range r.byID {
		out = append(out, *p)
	}
	sort.Slice(out, func(i, j int) bool {
		return out[i].CreatedAt.After(out[j].CreatedAt)
	})
	return out, nil
}

// Update ghi đè post (caller đã kiểm tra tồn tại + quyền).
func (r *PostRepo) Update(_ context.Context, p *posts.Post) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, ok := r.byID[p.ID]; !ok {
		return ErrNotFound
	}
	cp := *p
	r.byID[p.ID] = &cp
	return nil
}

// Delete xoá post theo ID.
func (r *PostRepo) Delete(_ context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, ok := r.byID[id]; !ok {
		return ErrNotFound
	}
	delete(r.byID, id)
	return nil
}
