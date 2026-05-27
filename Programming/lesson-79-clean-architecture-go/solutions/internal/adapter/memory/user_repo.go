// Package memory là một ADAPTER (driven adapter): nó implement port
// usecase.UserRepository bằng một map trong RAM.
//
// Quan trọng: mũi tên dependency vẫn trỏ VÀO TRONG. Package này import
// usecase + domain (tầng trong), còn usecase KHÔNG hề biết package này
// tồn tại. Muốn đổi sang Postgres? Viết adapter khác cùng interface,
// core không phải sửa một dòng.
package memory

import (
	"context"
	"sync"

	"cleanarch/internal/domain"
	"cleanarch/internal/usecase"
)

// UserRepo lưu user trong map, an toàn goroutine nhờ mutex.
type UserRepo struct {
	mu      sync.RWMutex
	byID    map[string]*domain.User
	byEmail map[string]string // email -> id (index phụ để FindByEmail O(1))
}

// NewUserRepo khởi tạo repo rỗng.
func NewUserRepo() *UserRepo {
	return &UserRepo{
		byID:    make(map[string]*domain.User),
		byEmail: make(map[string]string),
	}
}

// Bảo đảm tại compile-time rằng UserRepo thỏa port. Nếu thiếu method,
// dòng này không biên dịch — đây là cách Go enforce "adapter khớp port".
var _ usecase.UserRepository = (*UserRepo)(nil)

func (r *UserRepo) Save(_ context.Context, u *domain.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	// Lưu một bản sao để bên ngoài không sửa được state nội bộ qua con trỏ.
	cp := *u
	r.byID[u.ID] = &cp
	r.byEmail[u.Email] = u.ID
	return nil
}

func (r *UserRepo) FindByID(_ context.Context, id string) (*domain.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	u, ok := r.byID[id]
	if !ok {
		return nil, domain.ErrUserNotFound
	}
	cp := *u
	return &cp, nil
}

func (r *UserRepo) FindByEmail(_ context.Context, email string) (*domain.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	id, ok := r.byEmail[email]
	if !ok {
		return nil, domain.ErrUserNotFound
	}
	u := r.byID[id]
	cp := *u
	return &cp, nil
}
