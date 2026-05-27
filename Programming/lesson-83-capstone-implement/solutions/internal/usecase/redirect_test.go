package usecase

import (
	"context"
	"errors"
	"testing"
	"time"

	"urlshortener/internal/domain"
)

func TestRedirect_CacheMiss_PopulatesAndEmits(t *testing.T) {
	repo := newMockRepo()
	cache := newMockCache()
	queue := &mockQueue{}
	// Tạo sẵn một URL trong repo (KHÔNG có trong cache).
	u, _ := domain.NewURL("abc1234", "https://go.dev", time.Now())
	_ = repo.Save(context.Background(), u)

	uc := NewRedirect(repo, cache, queue, fixedClock{time.Now()})
	got, err := uc.Resolve(context.Background(), "abc1234", "https://twitter.com", "1.2.3.4")
	if err != nil {
		t.Fatalf("Resolve lỗi: %v", err)
	}
	if got != "https://go.dev" {
		t.Errorf("URL gốc sai: %s", got)
	}
	// Cache miss -> phải populate (Set).
	if cache.setCalls != 1 {
		t.Errorf("muốn populate cache 1 lần, được %d", cache.setCalls)
	}
	// Click phải được emit async (vào queue).
	if queue.count() != 1 {
		t.Errorf("muốn 1 click event, được %d", queue.count())
	}
}

func TestRedirect_CacheHit_NoRepoNeeded(t *testing.T) {
	// repo rỗng -> nếu hit cache thì vẫn resolve được mà không cần repo.
	repo := newMockRepo()
	cache := newMockCache()
	cache.data["xyz"] = "https://example.com"
	queue := &mockQueue{}

	uc := NewRedirect(repo, cache, queue, fixedClock{time.Now()})
	got, err := uc.Resolve(context.Background(), "xyz", "", "")
	if err != nil {
		t.Fatalf("Resolve lỗi: %v", err)
	}
	if got != "https://example.com" {
		t.Errorf("URL sai: %s", got)
	}
	// Hit cache -> không populate lại.
	if cache.setCalls != 0 {
		t.Errorf("hit cache không nên Set lại, được %d", cache.setCalls)
	}
	if queue.count() != 1 {
		t.Errorf("vẫn phải emit click khi hit cache")
	}
}

func TestRedirect_NotFound(t *testing.T) {
	uc := NewRedirect(newMockRepo(), newMockCache(), &mockQueue{}, fixedClock{time.Now()})
	_, err := uc.Resolve(context.Background(), "nope", "", "")
	if !errors.Is(err, domain.ErrURLNotFound) {
		t.Errorf("muốn ErrURLNotFound, được %v", err)
	}
}

func TestRedirect_Expired(t *testing.T) {
	repo := newMockRepo()
	now := time.Now()
	past := now.Add(-time.Hour)
	u, _ := domain.NewURL("exp", "https://go.dev", now.Add(-2*time.Hour))
	u.ExpiresAt = &past
	_ = repo.Save(context.Background(), u)

	uc := NewRedirect(repo, newMockCache(), &mockQueue{}, fixedClock{now})
	_, err := uc.Resolve(context.Background(), "exp", "", "")
	if !errors.Is(err, domain.ErrURLExpired) {
		t.Errorf("muốn ErrURLExpired, được %v", err)
	}
}
