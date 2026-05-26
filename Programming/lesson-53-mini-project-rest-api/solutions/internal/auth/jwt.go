package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"strings"
	"time"
)

// JWT (JSON Web Token) gồm 3 phần ngăn bởi dấu chấm: header.payload.signature
// Tất cả base64url-encode. Signature = HMAC-SHA256(header.payload, secret).
// Ta tự hiện thực bằng crypto/hmac (stdlib) — không phụ thuộc thư viện ngoài.

// Các lỗi xác thực token.
var (
	ErrTokenMalformed = errors.New("token sai định dạng")
	ErrTokenSignature = errors.New("chữ ký token không hợp lệ")
	ErrTokenExpired   = errors.New("token đã hết hạn")
	ErrTokenInvalid   = errors.New("token không hợp lệ")
)

// jwtHeader là phần header cố định (thuật toán HS256, loại JWT).
type jwtHeader struct {
	Alg string `json:"alg"`
	Typ string `json:"typ"`
}

// Claims là payload — thông tin về người dùng + thời hạn token.
type Claims struct {
	Subject  string `json:"sub"`             // user ID
	Username string `json:"username"`        // tên đăng nhập (tiện hiển thị)
	IssuedAt int64  `json:"iat"`             // thời điểm phát hành (unix seconds)
	Expires  int64  `json:"exp"`             // thời điểm hết hạn (unix seconds)
	Issuer   string `json:"iss,omitempty"`   // bên phát hành
}

// Signer ký và xác thực token bằng một secret + thời hạn (TTL) cấu hình sẵn.
type Signer struct {
	secret []byte
	ttl    time.Duration
	issuer string
	now    func() time.Time // tiêm được để test
}

// NewSigner tạo Signer mới.
func NewSigner(secret string, ttl time.Duration, issuer string) *Signer {
	return &Signer{
		secret: []byte(secret),
		ttl:    ttl,
		issuer: issuer,
		now:    time.Now,
	}
}

func b64(b []byte) string { return base64.RawURLEncoding.EncodeToString(b) }

// Sign tạo JWT cho một user.
func (s *Signer) Sign(userID, username string) (string, error) {
	now := s.now()
	header := jwtHeader{Alg: "HS256", Typ: "JWT"}
	claims := Claims{
		Subject:  userID,
		Username: username,
		IssuedAt: now.Unix(),
		Expires:  now.Add(s.ttl).Unix(),
		Issuer:   s.issuer,
	}

	hb, err := json.Marshal(header)
	if err != nil {
		return "", err
	}
	cb, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}

	signingInput := b64(hb) + "." + b64(cb)
	sig := s.sign(signingInput)
	return signingInput + "." + b64(sig), nil
}

// sign tính HMAC-SHA256 của chuỗi signingInput.
func (s *Signer) sign(signingInput string) []byte {
	mac := hmac.New(sha256.New, s.secret)
	mac.Write([]byte(signingInput))
	return mac.Sum(nil)
}

// Parse xác thực token: kiểm tra định dạng → chữ ký → hạn dùng.
// Trả về Claims nếu hợp lệ.
func (s *Signer) Parse(token string) (*Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, ErrTokenMalformed
	}
	signingInput := parts[0] + "." + parts[1]

	// 1. Verify chữ ký TRƯỚC khi tin payload — dùng hmac.Equal (constant time).
	sig, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, ErrTokenMalformed
	}
	expected := s.sign(signingInput)
	if !hmac.Equal(sig, expected) {
		return nil, ErrTokenSignature
	}

	// 2. Giải mã payload.
	cb, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, ErrTokenMalformed
	}
	var claims Claims
	if err := json.Unmarshal(cb, &claims); err != nil {
		return nil, ErrTokenMalformed
	}

	// 3. Kiểm tra hạn dùng.
	if claims.Expires == 0 || claims.Subject == "" {
		return nil, ErrTokenInvalid
	}
	if s.now().Unix() >= claims.Expires {
		return nil, ErrTokenExpired
	}
	return &claims, nil
}
