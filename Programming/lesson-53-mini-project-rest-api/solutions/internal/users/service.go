package users

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"net/mail"
	"strings"
	"time"

	"blog-api/internal/auth"
	apperr "blog-api/internal/errors"
)

// Repo là cổng truy cập dữ liệu user mà service phụ thuộc (dependency inversion).
// Service KHÔNG biết dữ liệu nằm trong memory hay DB — chỉ biết interface này.
type Repo interface {
	Create(ctx context.Context, u *User) error
	GetByID(ctx context.Context, id string) (*User, error)
	GetByUsername(ctx context.Context, username string) (*User, error)
}

// Signer là phần auth mà service cần (chỉ ký token).
type Signer interface {
	Sign(userID, username string) (string, error)
}

// Service chứa logic nghiệp vụ về user (đăng ký, đăng nhập, lấy profile).
type Service struct {
	repo   Repo
	signer Signer
	now    func() time.Time
}

// NewService tạo Service.
func NewService(repo Repo, signer Signer) *Service {
	return &Service{repo: repo, signer: signer, now: time.Now}
}

// Register tạo user mới: validate → kiểm tra trùng → hash mật khẩu → lưu → ký token.
func (s *Service) Register(ctx context.Context, req RegisterRequest) (*AuthResponse, error) {
	req.Username = strings.TrimSpace(req.Username)
	req.Email = strings.TrimSpace(req.Email)

	if fields := validateRegister(req); len(fields) > 0 {
		return nil, apperr.Validation("dữ liệu đăng ký không hợp lệ", fields)
	}

	// Tên đăng nhập phải duy nhất.
	if _, err := s.repo.GetByUsername(ctx, req.Username); err == nil {
		return nil, apperr.Conflict("username đã tồn tại")
	}

	hash, err := auth.HashPassword(req.Password)
	if err != nil {
		return nil, apperr.Internal("không hash được mật khẩu")
	}

	u := &User{
		ID:           newID(),
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hash,
		CreatedAt:    s.now().UTC(),
	}
	if err := s.repo.Create(ctx, u); err != nil {
		return nil, err
	}

	return s.issueToken(u)
}

// Login xác thực username + password và trả token.
func (s *Service) Login(ctx context.Context, req LoginRequest) (*AuthResponse, error) {
	req.Username = strings.TrimSpace(req.Username)
	if req.Username == "" || req.Password == "" {
		return nil, apperr.Validation("thiếu username hoặc password", nil)
	}

	u, err := s.repo.GetByUsername(ctx, req.Username)
	if err != nil {
		// KHÔNG tiết lộ "user không tồn tại" vs "sai mật khẩu" → tránh dò username.
		return nil, apperr.Unauthorized("username hoặc mật khẩu sai")
	}
	if !auth.VerifyPassword(req.Password, u.PasswordHash) {
		return nil, apperr.Unauthorized("username hoặc mật khẩu sai")
	}
	return s.issueToken(u)
}

// Me lấy thông tin user theo ID (dùng cho GET /v1/users/me).
func (s *Service) Me(ctx context.Context, id string) (*User, error) {
	u, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, apperr.NotFound("không tìm thấy user")
	}
	return u, nil
}

func (s *Service) issueToken(u *User) (*AuthResponse, error) {
	token, err := s.signer.Sign(u.ID, u.Username)
	if err != nil {
		return nil, apperr.Internal("không tạo được token")
	}
	return &AuthResponse{Token: token, User: *u}, nil
}

// validateRegister kiểm tra từng field, trả map field->message để client sửa từng ô.
func validateRegister(req RegisterRequest) map[string]string {
	fields := map[string]string{}
	if len(req.Username) < 3 || len(req.Username) > 32 {
		fields["username"] = "độ dài 3-32 ký tự"
	}
	if _, err := mail.ParseAddress(req.Email); err != nil {
		fields["email"] = "email không hợp lệ"
	}
	if len(req.Password) < 8 {
		fields["password"] = "tối thiểu 8 ký tự"
	}
	return fields
}

// newID sinh ID ngẫu nhiên 16 byte dạng hex (đủ duy nhất cho demo in-memory).
func newID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
