// Package usecase chứa application logic (orchestration của business rule).
//
// Điểm mấu chốt của Dependency Inversion: usecase ĐỊNH NGHĨA interface
// (port) mà nó cần — UserRepository. Nó KHÔNG biết Postgres hay in-memory.
// Tầng infra (adapter) sẽ implement interface này và được "tiêm" vào qua
// constructor. Nhờ vậy dependency vẫn trỏ vào trong: adapter -> usecase.
package usecase

import (
	"context"

	"cleanarch/internal/domain"
)

// UserRepository là PORT (driven port — usecase gọi ra hạ tầng).
// Đây là một interface do usecase sở hữu, không phải do DB sở hữu.
// In-memory repo, Postgres repo... đều phải khớp interface này.
type UserRepository interface {
	Save(ctx context.Context, u *domain.User) error
	FindByID(ctx context.Context, id string) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

// IDGenerator là một port phụ — usecase không quan tâm ID sinh kiểu gì
// (UUID, snowflake, counter...), chỉ cần một chuỗi duy nhất.
type IDGenerator interface {
	NewID() string
}

// UserUsecase orchestrate các business rule của domain.User.
// Nó phụ thuộc vào ABSTRACTION (interface), không phải implementation.
type UserUsecase struct {
	repo UserRepository
	ids  IDGenerator
}

// New là composition: nhận dependency từ ngoài (constructor injection).
// Đây là cách hiện thực Dependency Inversion trong Go — không có magic
// container, chỉ là truyền interface vào struct.
func New(repo UserRepository, ids IDGenerator) *UserUsecase {
	return &UserUsecase{repo: repo, ids: ids}
}

// Register tạo người dùng mới. Application logic ở đây gồm:
//  1. Kiểm tra email chưa bị dùng (rule cấp ứng dụng, cần truy vấn repo).
//  2. Tạo entity (domain tự validate name/email).
//  3. Lưu qua repository.
func (uc *UserUsecase) Register(ctx context.Context, name, email string) (*domain.User, error) {
	// Rule "email duy nhất" cần hỏi repository nên thuộc về usecase,
	// không thuộc domain.User (entity không biết về toàn bộ tập user).
	if existing, err := uc.repo.FindByEmail(ctx, email); err == nil && existing != nil {
		return nil, domain.ErrEmailTaken
	} else if err != nil && err != domain.ErrUserNotFound {
		return nil, err
	}

	u, err := domain.NewUser(uc.ids.NewID(), name, email)
	if err != nil {
		return nil, err // lỗi validate domain trả thẳng lên
	}
	if err := uc.repo.Save(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}

// Get lấy user theo ID.
func (uc *UserUsecase) Get(ctx context.Context, id string) (*domain.User, error) {
	return uc.repo.FindByID(ctx, id)
}

// Rename đổi tên user — orchestrate: load, gọi business rule, lưu lại.
func (uc *UserUsecase) Rename(ctx context.Context, id, newName string) (*domain.User, error) {
	u, err := uc.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if err := u.Rename(newName); err != nil { // business rule nằm trong domain
		return nil, err
	}
	if err := uc.repo.Save(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}
