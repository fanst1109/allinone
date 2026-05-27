// Package domain chứa các ENTITY và BUSINESS RULE thuần — không import
// bất cứ thứ gì thuộc hạ tầng (DB, HTTP, Redis). Đây là tầng trong cùng
// của clean architecture: mọi mũi tên phụ thuộc đều trỏ VÀO đây.
package domain

import (
	"errors"
	"net/url"
	"strings"
	"time"
)

// Các lỗi miền (sentinel errors). Adapter sẽ map chúng sang HTTP status.
var (
	ErrInvalidURL  = errors.New("URL không hợp lệ")
	ErrURLNotFound = errors.New("không tìm thấy short code")
	ErrCodeTaken   = errors.New("short code đã tồn tại")
	ErrInvalidCode = errors.New("short code không hợp lệ")
	ErrURLExpired  = errors.New("URL đã hết hạn")
)

// URL là entity trung tâm: ánh xạ short code -> URL gốc.
type URL struct {
	Code      string    // short code, vd "aZ3kP9x"
	Original  string    // URL gốc đầy đủ
	CreatedAt time.Time // thời điểm tạo
	// ExpiresAt = nil nghĩa là không hết hạn. Dùng cho BT2 (TTL).
	ExpiresAt *time.Time
}

// NewURL tạo entity URL mới, đồng thời validate URL gốc (business rule:
// chỉ chấp nhận http/https có host). Validate nằm trong domain để mọi
// đường vào (HTTP, CLI, batch...) đều bị ràng buộc cùng một quy tắc.
func NewURL(code, original string, createdAt time.Time) (*URL, error) {
	if !validURL(original) {
		return nil, ErrInvalidURL
	}
	if strings.TrimSpace(code) == "" {
		return nil, ErrInvalidCode
	}
	return &URL{
		Code:      code,
		Original:  original,
		CreatedAt: createdAt,
	}, nil
}

// IsExpired trả về true nếu URL đã quá hạn (rule miền, không phụ thuộc DB).
func (u *URL) IsExpired(now time.Time) bool {
	return u.ExpiresAt != nil && now.After(*u.ExpiresAt)
}

// validURL là business rule: URL phải có scheme http/https và có host.
// Ví dụ minh họa:
//
//	"https://go.dev"            -> hợp lệ
//	"http://example.com/a?b=1"  -> hợp lệ
//	"ftp://host"                -> KHÔNG (scheme sai)
//	"not a url"                 -> KHÔNG (thiếu host/scheme)
func validURL(raw string) bool {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return false
	}
	u, err := url.Parse(raw)
	if err != nil {
		return false
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return false
	}
	return u.Host != ""
}
