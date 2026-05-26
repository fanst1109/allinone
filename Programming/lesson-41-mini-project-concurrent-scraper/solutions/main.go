// Package main — concurrent web scraper.
//
// Tool CLI scrape N URL đồng thời, extract title + đếm số link, ghi kết quả JSON.
// Hỗ trợ: rate limit (token bucket), retry exponential backoff, context cancel
// (Ctrl+C), progress bar atomic counter.
//
// Cách chạy:
//
//	go run . -urls=https://example.com,https://go.dev -workers=5 -rate=2 -out=result.json
//	go run . -file=urls.txt -workers=10 -rate=5 -out=result.json
//
// Tier 3 concepts dùng: goroutines, channels, context, sync.WaitGroup,
// generics (Result[T] tùy chọn), atomic counter, signal handler.
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

// Config gom toàn bộ tham số CLI. Tách struct giúp test dễ — chỉ cần
// dựng Config rồi gọi run(ctx, cfg), không phụ thuộc flag.Parse global state.
type Config struct {
	URLs     []string // danh sách URL cần scrape
	Workers  int      // số worker goroutine (default 10)
	RateRPS  float64  // requests per second cho rate limiter (default 5)
	OutPath  string   // file JSON output (default result.json)
	Timeout  time.Duration
	MaxRetry int
}

func main() {
	cfg, err := parseFlags()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}
	if len(cfg.URLs) == 0 {
		log.Fatal("không có URL nào để scrape (dùng -urls hoặc -file)")
	}

	// Context lắng nghe SIGINT/SIGTERM. Khi user Ctrl+C, cancel context →
	// worker pool thấy ctx.Done() → dừng việc đang làm, flush output, exit
	// graceful. KHÔNG kill -9 trừ khi user nhấn Ctrl+C lần 2.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	if err := run(ctx, cfg); err != nil {
		log.Fatalf("run error: %v", err)
	}
}

// run là entry point thật, tách ra để test được.
func run(ctx context.Context, cfg Config) error {
	log.Printf("scraping %d URL với %d workers, rate=%.1f req/s, timeout=%v",
		len(cfg.URLs), cfg.Workers, cfg.RateRPS, cfg.Timeout)

	// 1. Mở file output, đảm bảo đóng + flush khi xong.
	writer, err := NewJSONWriter(cfg.OutPath)
	if err != nil {
		return fmt.Errorf("open output: %w", err)
	}
	defer writer.Close()

	// 2. Rate limiter — token bucket. Capacity = burst = 1 token cho đơn giản.
	limiter := NewTokenBucket(cfg.RateRPS, int(cfg.RateRPS)+1)

	// 3. Channel queue URL. Buffer = len(URLs) để main không block khi enqueue.
	jobs := make(chan string, len(cfg.URLs))
	for _, u := range cfg.URLs {
		jobs <- u
	}
	close(jobs)

	// 4. Counter để tính progress. atomic vì nhiều worker tăng đồng thời.
	var done, success, failed int64
	total := int64(len(cfg.URLs))

	// 5. Progress ticker — mỗi 500ms log tiến độ. Stop khi ctx cancel.
	progCtx, stopProg := context.WithCancel(ctx)
	go progressLoop(progCtx, total, &done, &success, &failed)

	// 6. Worker pool. errgroup-style nhưng tự viết để minh họa rõ.
	var wg sync.WaitGroup
	for i := 0; i < cfg.Workers; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			worker := &Worker{
				ID:       id,
				Limiter:  limiter,
				Writer:   writer,
				Timeout:  cfg.Timeout,
				MaxRetry: cfg.MaxRetry,
			}
			worker.Run(ctx, jobs, &done, &success, &failed)
		}(i)
	}

	wg.Wait()
	stopProg()

	log.Printf("xong: %d/%d (success=%d, failed=%d)",
		atomic.LoadInt64(&done), total,
		atomic.LoadInt64(&success), atomic.LoadInt64(&failed))

	if ctx.Err() != nil {
		log.Printf("dừng do signal: %v", ctx.Err())
	}
	return nil
}

// parseFlags đọc CLI args và build Config.
func parseFlags() (Config, error) {
	var (
		urlsFlag    = flag.String("urls", "", "comma-separated URLs")
		fileFlag    = flag.String("file", "", "đường dẫn file chứa danh sách URL, mỗi URL 1 dòng")
		workersFlag = flag.Int("workers", 10, "số worker goroutine")
		rateFlag    = flag.Float64("rate", 5.0, "rate limit (requests/second)")
		outFlag     = flag.String("out", "result.json", "file JSON output")
		timeoutFlag = flag.Duration("timeout", 10*time.Second, "timeout mỗi request")
		retryFlag   = flag.Int("retry", 3, "số lần retry max cho 5xx/network error")
	)
	flag.Parse()

	cfg := Config{
		Workers:  *workersFlag,
		RateRPS:  *rateFlag,
		OutPath:  *outFlag,
		Timeout:  *timeoutFlag,
		MaxRetry: *retryFlag,
	}

	// Ưu tiên -urls nếu có, fallback sang -file.
	if *urlsFlag != "" {
		for _, u := range strings.Split(*urlsFlag, ",") {
			u = strings.TrimSpace(u)
			if u != "" {
				cfg.URLs = append(cfg.URLs, u)
			}
		}
	} else if *fileFlag != "" {
		urls, err := readURLFile(*fileFlag)
		if err != nil {
			return cfg, err
		}
		cfg.URLs = urls
	}
	return cfg, nil
}

// readURLFile đọc file text, mỗi dòng 1 URL, bỏ qua dòng trống & comment (#).
func readURLFile(path string) ([]string, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var urls []string
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		urls = append(urls, line)
	}
	return urls, nil
}

// progressLoop in tiến độ định kỳ. Dừng khi ctx cancel.
func progressLoop(ctx context.Context, total int64, done, success, failed *int64) {
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			d := atomic.LoadInt64(done)
			s := atomic.LoadInt64(success)
			f := atomic.LoadInt64(failed)
			pct := float64(d) / float64(total) * 100
			fmt.Fprintf(os.Stderr, "\r[progress] %d/%d (%.0f%%) ok=%d fail=%d", d, total, pct, s, f)
		}
	}
}
