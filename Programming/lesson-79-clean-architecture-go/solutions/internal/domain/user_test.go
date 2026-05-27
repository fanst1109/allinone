package domain_test

import (
	"errors"
	"testing"

	"cleanarch/internal/domain"
)

func TestNewUser(t *testing.T) {
	cases := []struct {
		name      string
		inName    string
		inEmail   string
		wantErr   error
		wantEmail string // email sau khi normalize
	}{
		{"hợp lệ", "Alice", "Alice@Example.COM", nil, "alice@example.com"},
		{"tên rỗng", "  ", "a@x.com", domain.ErrEmptyName, ""},
		{"email thiếu @", "Bob", "bob.example.com", domain.ErrInvalidEmail, ""},
		{"email @ cuối", "Bob", "bob@", domain.ErrInvalidEmail, ""},
		{"email 2 @", "Bob", "a@b@c", domain.ErrInvalidEmail, ""},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			u, err := domain.NewUser("u1", c.inName, c.inEmail)
			if !errors.Is(err, c.wantErr) {
				t.Fatalf("err = %v, muốn %v", err, c.wantErr)
			}
			if c.wantErr == nil && u.Email != c.wantEmail {
				t.Fatalf("email = %q, muốn %q", u.Email, c.wantEmail)
			}
		})
	}
}

func TestRename_TooLong(t *testing.T) {
	u, _ := domain.NewUser("u1", "Alice", "a@x.com")
	long := make([]byte, 101)
	for i := range long {
		long[i] = 'a'
	}
	if err := u.Rename(string(long)); !errors.Is(err, domain.ErrNameTooLong) {
		t.Fatalf("mong đợi ErrNameTooLong, nhận: %v", err)
	}
}
