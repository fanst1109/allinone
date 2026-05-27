package usecase

import (
	"context"
	"errors"
	"testing"
	"time"

	"urlshortener/internal/domain"
)

func TestShorten_Random_OK(t *testing.T) {
	repo := newMockRepo()
	cache := newMockCache()
	uc := NewShorten(repo, cache, fixedClock{time.Now()}, false)

	u, err := uc.Shorten(context.Background(), "https://go.dev")
	if err != nil {
		t.Fatalf("Shorten lỗi: %v", err)
	}
	if len(u.Code) != codeLen {
		t.Errorf("code dài %d, muốn %d", len(u.Code), codeLen)
	}
	// Đã lưu vào repo.
	if got, _ := repo.FindByCode(context.Background(), u.Code); got == nil {
		t.Error("URL chưa được lưu vào repo")
	}
	// Đã warm cache.
	if cache.setCalls != 1 {
		t.Errorf("muốn warm cache 1 lần, được %d", cache.setCalls)
	}
}

func TestShorten_Counter_Deterministic(t *testing.T) {
	repo := newMockRepo()
	uc := NewShorten(repo, newMockCache(), nil, true) // useCounter=true

	u1, _ := uc.Shorten(context.Background(), "https://a.com")
	u2, _ := uc.Shorten(context.Background(), "https://b.com")
	if u1.Code == u2.Code {
		t.Error("counter strategy phải sinh code khác nhau")
	}
}

func TestShorten_InvalidURL(t *testing.T) {
	uc := NewShorten(newMockRepo(), newMockCache(), nil, false)
	_, err := uc.Shorten(context.Background(), "not-a-url")
	if !errors.Is(err, domain.ErrInvalidURL) {
		t.Errorf("muốn ErrInvalidURL, được %v", err)
	}
}

func TestShorten_SaveError(t *testing.T) {
	repo := newMockRepo()
	repo.saveErr = errors.New("db down")
	uc := NewShorten(repo, newMockCache(), nil, false)
	_, err := uc.Shorten(context.Background(), "https://go.dev")
	if err == nil {
		t.Error("muốn lỗi khi Save thất bại")
	}
}

func TestShortenWithAlias_OK(t *testing.T) {
	repo := newMockRepo()
	uc := NewShorten(repo, newMockCache(), nil, false)
	u, err := uc.ShortenWithAlias(context.Background(), "https://go.dev", "golang")
	if err != nil {
		t.Fatalf("alias lỗi: %v", err)
	}
	if u.Code != "golang" {
		t.Errorf("muốn code = golang, được %s", u.Code)
	}
}

func TestShortenWithAlias_Taken(t *testing.T) {
	repo := newMockRepo()
	uc := NewShorten(repo, newMockCache(), nil, false)
	_, _ = uc.ShortenWithAlias(context.Background(), "https://go.dev", "dup")
	_, err := uc.ShortenWithAlias(context.Background(), "https://b.com", "dup")
	if !errors.Is(err, domain.ErrCodeTaken) {
		t.Errorf("muốn ErrCodeTaken, được %v", err)
	}
}
