package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"sync/atomic"
	"time"
)

// Result lưu kết quả scrape 1 URL. Tag JSON dùng cho output.
type Result struct {
	URL        string `json:"url"`
	Status     int    `json:"status"`
	Title      string `json:"title,omitempty"`
	LinksCount int    `json:"links_count"`
	Error      string `json:"error,omitempty"`
	Attempts   int    `json:"attempts"`
	DurationMs int64  `json:"duration_ms"`
}

// Worker là 1 goroutine consumer. Nhận URL từ channel jobs, gọi rate limiter
// (block tới khi có token), fetch, parse, ghi result.
type Worker struct {
	ID       int
	Limiter  *TokenBucket
	Writer   *JSONWriter
	Timeout  time.Duration
	MaxRetry int

	// httpClient tách field để test có thể inject. Mỗi worker dùng client
	// riêng — Go net/http connection pool dùng chung dưới boong nên không
	// tốn resource.
	httpClient *http.Client
}

// Run lấy URL từ jobs channel, xử lý, lặp tới khi channel close hoặc ctx done.
func (w *Worker) Run(ctx context.Context, jobs <-chan string, done, success, failed *int64) {
	if w.httpClient == nil {
		w.httpClient = &http.Client{Timeout: w.Timeout}
	}

	for {
		select {
		case <-ctx.Done():
			return
		case url, ok := <-jobs:
			if !ok {
				return // channel đóng → hết job
			}
			res := w.processOne(ctx, url)
			if err := w.Writer.Write(res); err != nil {
				// Lỗi ghi output → log nhưng tiếp tục, đừng kill worker.
				fmt.Fprintf(jsonWriterErrLog, "[worker %d] write error: %v\n", w.ID, err)
			}
			atomic.AddInt64(done, 1)
			if res.Error == "" && res.Status >= 200 && res.Status < 400 {
				atomic.AddInt64(success, 1)
			} else {
				atomic.AddInt64(failed, 1)
			}
		}
	}
}

// processOne xử lý 1 URL với retry. Trả Result luôn (không err) — error đóng gói trong Result.Error.
func (w *Worker) processOne(ctx context.Context, url string) Result {
	start := time.Now()
	res := Result{URL: url}

	for attempt := 1; attempt <= w.MaxRetry; attempt++ {
		res.Attempts = attempt

		// Đợi rate limiter cấp token. Block tới khi có token hoặc ctx cancel.
		if err := w.Limiter.Wait(ctx); err != nil {
			res.Error = "context cancelled while waiting for rate limit"
			break
		}

		status, body, err := w.fetch(ctx, url)
		res.Status = status

		if err != nil {
			res.Error = err.Error()
			// Network error → retry (trừ khi ctx cancel).
			if ctx.Err() != nil {
				break
			}
			if attempt < w.MaxRetry {
				sleep := backoffDuration(attempt)
				if !sleepCtx(ctx, sleep) {
					break
				}
				continue
			}
			break
		}

		// 5xx → retry. 4xx → fail nhanh, không retry.
		if status >= 500 {
			res.Error = fmt.Sprintf("server error %d", status)
			if attempt < w.MaxRetry {
				sleep := backoffDuration(attempt)
				if !sleepCtx(ctx, sleep) {
					break
				}
				continue
			}
			break
		}
		if status == 429 {
			// Rate limit hit → đợi theo Retry-After nếu có, hoặc backoff thường.
			res.Error = "rate limited (429)"
			if attempt < w.MaxRetry {
				sleep := backoffDuration(attempt)
				if !sleepCtx(ctx, sleep) {
					break
				}
				continue
			}
			break
		}
		if status >= 400 {
			res.Error = fmt.Sprintf("client error %d", status)
			break // 4xx không retry
		}

		// Success — parse HTML.
		title, links := ParseHTML(body)
		res.Title = title
		res.LinksCount = links
		res.Error = ""
		break
	}

	res.DurationMs = time.Since(start).Milliseconds()
	return res
}

// fetch gọi HTTP GET, trả status + body (bytes) + error. Đọc body có giới hạn
// để tránh OOM khi server trả file khổng lồ.
func (w *Worker) fetch(ctx context.Context, url string) (int, []byte, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return 0, nil, fmt.Errorf("bad request: %w", err)
	}
	req.Header.Set("User-Agent", "concurrent-scraper-lesson41/1.0")

	resp, err := w.httpClient.Do(req)
	if err != nil {
		return 0, nil, err
	}
	defer resp.Body.Close()

	// Giới hạn body 5MB — đủ cho HTML, tránh server malicious trả 10GB.
	limited := io.LimitReader(resp.Body, 5*1024*1024)
	body, err := io.ReadAll(limited)
	if err != nil {
		return resp.StatusCode, nil, err
	}
	return resp.StatusCode, body, nil
}
