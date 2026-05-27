package analytics

import (
	"context"
	"testing"
	"time"

	"urlshortener/internal/domain"
)

func TestWorker_Aggregate(t *testing.T) {
	ch := make(chan domain.Click, 10)
	w := NewWorker(ch)
	go w.Run(context.Background())

	day := time.Date(2026, 5, 27, 10, 0, 0, 0, time.UTC)
	// 3 click cho "abc": 2 từ twitter, 1 từ google; 2 IP unique.
	ch <- domain.Click{Code: "abc", Referrer: "https://twitter.com", IP: "1.1.1.1", Timestamp: day}
	ch <- domain.Click{Code: "abc", Referrer: "https://twitter.com", IP: "1.1.1.1", Timestamp: day}
	ch <- domain.Click{Code: "abc", Referrer: "https://google.com", IP: "2.2.2.2", Timestamp: day}
	close(ch)
	w.Wait() // drain xong

	s, _ := w.Snapshot(context.Background(), "abc")
	if s == nil || s.TotalClicks != 3 {
		t.Fatalf("total clicks sai: %+v", s)
	}
	if s.ClicksByDay["2026-05-27"] != 3 {
		t.Errorf("clicks_by_day sai: %+v", s.ClicksByDay)
	}
	// Top referrer phải là twitter (2) trước google (1).
	if len(s.TopReferrers) != 2 || s.TopReferrers[0].Referrer != "https://twitter.com" || s.TopReferrers[0].Count != 2 {
		t.Errorf("top referrers sai: %+v", s.TopReferrers)
	}
	// Unique visitors (BT5) = 2.
	if uv := w.UniqueVisitors("abc"); uv != 2 {
		t.Errorf("unique visitors = %d, muốn 2", uv)
	}
}

func TestWorker_SnapshotUnknownCode(t *testing.T) {
	ch := make(chan domain.Click)
	w := NewWorker(ch)
	s, err := w.Snapshot(context.Background(), "khongco")
	if err != nil || s != nil {
		t.Errorf("code chưa có click phải trả nil, được %+v err=%v", s, err)
	}
}
