package auth

import (
	"testing"
	"time"
)

func TestHashAndVerifyPassword(t *testing.T) {
	pw := "super-secret-123"
	hash, err := HashPassword(pw)
	if err != nil {
		t.Fatalf("HashPassword: %v", err)
	}
	if hash == pw {
		t.Fatal("hash trùng plaintext")
	}
	if !VerifyPassword(pw, hash) {
		t.Fatal("verify mật khẩu đúng phải trả true")
	}
	if VerifyPassword("sai-mat-khau", hash) {
		t.Fatal("verify mật khẩu sai phải trả false")
	}

	// Hai lần hash cùng mật khẩu phải khác nhau (salt ngẫu nhiên).
	hash2, _ := HashPassword(pw)
	if hash == hash2 {
		t.Fatal("hai hash của cùng mật khẩu không được trùng (thiếu salt)")
	}
}

func TestJWTSignParseRoundTrip(t *testing.T) {
	s := NewSigner("test-secret", time.Hour, "blog-api")
	tok, err := s.Sign("user-1", "alice")
	if err != nil {
		t.Fatalf("Sign: %v", err)
	}
	claims, err := s.Parse(tok)
	if err != nil {
		t.Fatalf("Parse: %v", err)
	}
	if claims.Subject != "user-1" || claims.Username != "alice" {
		t.Fatalf("claims sai: %+v", claims)
	}
}

func TestJWTRejectsTamperedToken(t *testing.T) {
	s := NewSigner("test-secret", time.Hour, "blog-api")
	tok, _ := s.Sign("user-1", "alice")
	// Đổi 1 ký tự cuối (phần chữ ký) → phải bị từ chối.
	tampered := tok[:len(tok)-1] + flipChar(tok[len(tok)-1])
	if _, err := s.Parse(tampered); err == nil {
		t.Fatal("token bị sửa phải bị từ chối")
	}

	// Secret khác → chữ ký không khớp.
	other := NewSigner("KHAC-secret", time.Hour, "blog-api")
	if _, err := other.Parse(tok); err != ErrTokenSignature {
		t.Fatalf("secret khác phải lỗi chữ ký, got %v", err)
	}
}

func TestJWTExpired(t *testing.T) {
	s := NewSigner("test-secret", time.Hour, "blog-api")
	// Cố định "now" ở quá khứ khi ký, rồi parse với now hiện tại.
	past := time.Now().Add(-2 * time.Hour)
	s.now = func() time.Time { return past }
	tok, _ := s.Sign("u", "alice")
	s.now = time.Now
	if _, err := s.Parse(tok); err != ErrTokenExpired {
		t.Fatalf("token hết hạn phải lỗi expired, got %v", err)
	}
}

func flipChar(b byte) string {
	if b == 'A' {
		return "B"
	}
	return "A"
}
