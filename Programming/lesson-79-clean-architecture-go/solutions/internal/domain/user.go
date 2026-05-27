// Package domain chứa entity và business rule thuần.
//
// QUY TẮC VÀNG (dependency rule): package này KHÔNG import bất cứ gì
// thuộc tầng ngoài — không http, không database/sql, không gorm, không
// framework. Nó chỉ phụ thuộc stdlib trung lập (errors, strings, time...).
// Mọi mũi tên dependency phải trỏ VÀO đây, không bao giờ trỏ ra.
package domain

import (
	"errors"
	"strings"
)

// Các lỗi domain — là một phần của "ngôn ngữ" miền nghiệp vụ, không phải
// lỗi kỹ thuật. Tầng ngoài (HTTP) sẽ map các lỗi này sang status code.
var (
	ErrEmptyName     = errors.New("tên người dùng không được rỗng")
	ErrInvalidEmail  = errors.New("email không hợp lệ")
	ErrUserNotFound  = errors.New("không tìm thấy người dùng")
	ErrEmailTaken    = errors.New("email đã được dùng")
	ErrNameTooLong   = errors.New("tên người dùng quá dài (tối đa 100 ký tự)")
)

// User là entity trung tâm của miền nghiệp vụ.
//
// Đây KHÔNG phải "anemic model" (model chỉ chứa dữ liệu). Business rule
// gắn liền với User được đặt ngay tại đây dưới dạng method — ví dụ
// NewUser tự validate, Rename tự kiểm tra. Logic không bị "rò" ra service.
type User struct {
	ID    string
	Name  string
	Email string
}

// NewUser là "constructor có bảo vệ": không thể tạo một User không hợp lệ.
// Business rule (tên không rỗng, email phải có '@') được enforce ngay khi
// tạo, nên mọi User tồn tại trong hệ thống đều ở trạng thái hợp lệ.
func NewUser(id, name, email string) (*User, error) {
	u := &User{ID: id}
	if err := u.setName(name); err != nil {
		return nil, err
	}
	if err := u.setEmail(email); err != nil {
		return nil, err
	}
	return u, nil
}

// Rename áp dụng business rule khi đổi tên — không cho phép bypass validate.
func (u *User) Rename(name string) error {
	return u.setName(name)
}

func (u *User) setName(name string) error {
	name = strings.TrimSpace(name)
	if name == "" {
		return ErrEmptyName
	}
	if len(name) > 100 {
		return ErrNameTooLong
	}
	u.Name = name
	return nil
}

func (u *User) setEmail(email string) error {
	email = strings.TrimSpace(strings.ToLower(email))
	// Quy tắc cực kỳ đơn giản để minh họa: phải có đúng dạng "x@y".
	// (Production sẽ dùng net/mail.ParseAddress; ở đây giữ thuần domain.)
	at := strings.IndexByte(email, '@')
	if at <= 0 || at == len(email)-1 || strings.Count(email, "@") != 1 {
		return ErrInvalidEmail
	}
	u.Email = email
	return nil
}
