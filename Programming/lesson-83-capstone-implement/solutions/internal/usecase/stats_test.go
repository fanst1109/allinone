package usecase

import (
	"context"
	"errors"
	"testing"
	"time"

	"urlshortener/internal/domain"
)

func TestStats_ReturnsSnapshotWithURL(t *testing.T) {
	repo := newMockRepo()
	u, _ := domain.NewURL("abc", "https://go.dev", time.Now())
	_ = repo.Save(context.Background(), u)

	store := &mockStore{snap: &domain.Stats{
		TotalClicks: 5,
		ClicksByDay: map[string]int{"2026-05-27": 5},
		TopReferrers: []domain.ReferrerStat{
			{Referrer: "https://twitter.com", Count: 3},
		},
	}}
	uc := NewStats(repo, store)
	s, err := uc.Get(context.Background(), "abc")
	if err != nil {
		t.Fatalf("Get lỗi: %v", err)
	}
	if s.TotalClicks != 5 {
		t.Errorf("total clicks = %d, muốn 5", s.TotalClicks)
	}
	if s.Original != "https://go.dev" {
		t.Errorf("URL gốc phải được gắn vào read model, được %q", s.Original)
	}
}

func TestStats_NoClicksYet(t *testing.T) {
	repo := newMockRepo()
	u, _ := domain.NewURL("fresh", "https://go.dev", time.Now())
	_ = repo.Save(context.Background(), u)

	uc := NewStats(repo, &mockStore{snap: nil}) // chưa có click
	s, err := uc.Get(context.Background(), "fresh")
	if err != nil {
		t.Fatalf("Get lỗi: %v", err)
	}
	if s.TotalClicks != 0 || len(s.ClicksByDay) != 0 {
		t.Errorf("stats rỗng phải total=0, được %+v", s)
	}
}

func TestStats_CodeNotFound(t *testing.T) {
	uc := NewStats(newMockRepo(), &mockStore{})
	_, err := uc.Get(context.Background(), "ghost")
	if !errors.Is(err, domain.ErrURLNotFound) {
		t.Errorf("muốn ErrURLNotFound, được %v", err)
	}
}
