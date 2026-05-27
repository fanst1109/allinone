package main

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"urlshortener/internal/adapter/analytics"
	adapterhttp "urlshortener/internal/adapter/http"
	"urlshortener/internal/adapter/memory"
	"urlshortener/internal/usecase"
)

// testSystem gom toàn bộ thành phần đã wire để integration test điều khiển.
type testSystem struct {
	server *httptest.Server
	queue  *memory.ClickQueue
	worker *analytics.Worker
	cancel context.CancelFunc
}

// newTestSystem wire một hệ thống đầy đủ (in-memory) sau một httptest server.
func newTestSystem(t *testing.T) *testSystem {
	t.Helper()

	repo := memory.NewURLRepository()
	cache := memory.NewCache()
	queue := memory.NewClickQueue(1024)
	worker := analytics.NewWorker(queue.Events())

	ctx, cancel := context.WithCancel(context.Background())
	go worker.Run(ctx)

	shortenUC := usecase.NewShorten(repo, cache, usecase.SystemClock, false)
	redirectUC := usecase.NewRedirect(repo, cache, queue, usecase.SystemClock)
	statsUC := usecase.NewStats(repo, worker)

	h := adapterhttp.NewHandler(shortenUC, redirectUC, statsUC, "http://example.test")
	srv := httptest.NewServer(h.Routes())

	return &testSystem{server: srv, queue: queue, worker: worker, cancel: cancel}
}

// flush đóng queue và chờ worker drain hết -> click chắc chắn đã được đếm.
// Đây là cách test xác minh "click eventually counted" cho luồng ASYNC.
func (ts *testSystem) flush() {
	ts.queue.Close()
	ts.worker.Wait()
}

func (ts *testSystem) close() {
	ts.server.Close()
	ts.cancel()
}

// TestEndToEnd_ShortenRedirectStats kiểm tra luồng đầy đủ:
// shorten -> redirect (x3, emit click async) -> stats (click đã được đếm).
func TestEndToEnd_ShortenRedirectStats(t *testing.T) {
	ts := newTestSystem(t)
	defer ts.close()

	// (1) SHORTEN.
	body := strings.NewReader(`{"url":"https://go.dev/doc"}`)
	resp, err := http.Post(ts.server.URL+"/api/shorten", "application/json", body)
	if err != nil {
		t.Fatalf("POST shorten lỗi: %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("shorten status = %d, muốn 201", resp.StatusCode)
	}
	var sr struct {
		Code     string `json:"code"`
		ShortURL string `json:"short_url"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&sr)
	resp.Body.Close()
	if sr.Code == "" {
		t.Fatal("không nhận được code")
	}
	if !strings.HasSuffix(sr.ShortURL, "/"+sr.Code) {
		t.Errorf("short_url sai: %s", sr.ShortURL)
	}

	// (2) REDIRECT x3 — client không tự follow để kiểm tra 302 + Location.
	noRedirect := &http.Client{
		CheckRedirect: func(*http.Request, []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}
	for i := 0; i < 3; i++ {
		req, _ := http.NewRequest(http.MethodGet, ts.server.URL+"/"+sr.Code, nil)
		req.Header.Set("Referer", "https://twitter.com")
		rr, err := noRedirect.Do(req)
		if err != nil {
			t.Fatalf("redirect lỗi: %v", err)
		}
		if rr.StatusCode != http.StatusFound {
			t.Errorf("redirect status = %d, muốn 302", rr.StatusCode)
		}
		if loc := rr.Header.Get("Location"); loc != "https://go.dev/doc" {
			t.Errorf("Location sai: %s", loc)
		}
		rr.Body.Close()
	}

	// (3) FLUSH queue: chắc chắn 3 click async đã được worker đếm.
	ts.flush()

	// (4) STATS.
	statsResp, err := http.Get(ts.server.URL + "/api/stats/" + sr.Code)
	if err != nil {
		t.Fatalf("GET stats lỗi: %v", err)
	}
	if statsResp.StatusCode != http.StatusOK {
		t.Fatalf("stats status = %d", statsResp.StatusCode)
	}
	var st struct {
		Code         string         `json:"code"`
		URL          string         `json:"url"`
		TotalClicks  int            `json:"total_clicks"`
		ClicksByDay  map[string]int `json:"clicks_by_day"`
		TopReferrers []struct {
			Referrer string `json:"referrer"`
			Count    int    `json:"count"`
		} `json:"top_referrers"`
	}
	_ = json.NewDecoder(statsResp.Body).Decode(&st)
	statsResp.Body.Close()

	if st.TotalClicks != 3 {
		t.Errorf("total_clicks = %d, muốn 3 (click async phải được đếm)", st.TotalClicks)
	}
	if st.URL != "https://go.dev/doc" {
		t.Errorf("stats url sai: %s", st.URL)
	}
	if len(st.TopReferrers) != 1 || st.TopReferrers[0].Referrer != "https://twitter.com" || st.TopReferrers[0].Count != 3 {
		t.Errorf("top_referrers sai: %+v", st.TopReferrers)
	}
	if total := sumDays(st.ClicksByDay); total != 3 {
		t.Errorf("clicks_by_day tổng = %d, muốn 3", total)
	}
}

// TestRedirect_NotFound xác minh 404 RFC 7807 cho code không tồn tại.
func TestRedirect_NotFound(t *testing.T) {
	ts := newTestSystem(t)
	defer ts.close()

	resp, err := http.Get(ts.server.URL + "/khongtontai")
	if err != nil {
		t.Fatalf("GET lỗi: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, muốn 404", resp.StatusCode)
	}
	if ct := resp.Header.Get("Content-Type"); !strings.HasPrefix(ct, "application/problem+json") {
		t.Errorf("lỗi phải là RFC 7807, Content-Type = %s", ct)
	}
}

// TestShorten_InvalidURL xác minh 400 cho URL sai.
func TestShorten_InvalidURL(t *testing.T) {
	ts := newTestSystem(t)
	defer ts.close()

	resp, err := http.Post(ts.server.URL+"/api/shorten", "application/json",
		strings.NewReader(`{"url":"khong-phai-url"}`))
	if err != nil {
		t.Fatalf("POST lỗi: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("status = %d, muốn 400", resp.StatusCode)
	}
}

func sumDays(m map[string]int) int {
	total := 0
	for _, v := range m {
		total += v
	}
	return total
}
