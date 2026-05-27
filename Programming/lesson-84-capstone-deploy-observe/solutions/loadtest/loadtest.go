// loadtest.go — load tester đơn giản kiểu `hey`/`vegeta`, stdlib only.
//
// MỤC ĐÍCH: bắn N request/giây vào 1 URL trong T giây, đo p50/p90/p99 latency,
// throughput thực tế, và error rate. Dùng để đo redirect endpoint
// (GET /{code}) — đường nóng read-heavy của URL Shortener.
//
// CÁCH CHẠY:
//   go run loadtest.go -url http://localhost:8080/r/abcd -rps 1000 -dur 10s
//
// Khi KHÔNG có target sống, dùng -dry để self-test (mô phỏng latency) — để
// `go run`/CI verify được mà không cần server. Đây là mặc định nếu thiếu -url.
//
// Production: dùng k6 (script.js cùng thư mục) cho scenario phức tạp (ramp,
// nhiều stage, threshold). Tool này để minh hoạ cơ chế đo + cách đọc kết quả.
package main

import (
	"context"
	"flag"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"sort"
	"sync"
	"time"
)

func main() {
	url := flag.String("url", "", "target URL (rỗng -> chạy chế độ -dry)")
	rps := flag.Int("rps", 1000, "số request/giây mục tiêu")
	durFlag := flag.Duration("dur", 5*time.Second, "thời lượng test")
	conc := flag.Int("c", 50, "số worker (concurrency)")
	dry := flag.Bool("dry", false, "chế độ mô phỏng, không gọi mạng thật")
	flag.Parse()

	if *url == "" {
		*dry = true
	}

	fmt.Printf("Load test: url=%q rps=%d dur=%s conc=%d dry=%v\n", *url, *rps, *durFlag, *conc, *dry)

	// Kênh phát "tick" với tốc độ rps (mỗi tick = 1 request cần bắn).
	interval := time.Second / time.Duration(*rps)
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	ctx, cancel := context.WithTimeout(context.Background(), *durFlag)
	defer cancel()

	var (
		mu       sync.Mutex
		latency  []time.Duration
		errCount int
		okCount  int
	)

	client := &http.Client{Timeout: 5 * time.Second}
	jobs := make(chan struct{}, *rps)

	// Worker pool: đọc job, gọi request, ghi nhận latency/error.
	var wg sync.WaitGroup
	for i := 0; i < *conc; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for range jobs {
				start := time.Now()
				ok := doRequest(ctx, client, *url, *dry)
				lat := time.Since(start)
				mu.Lock()
				latency = append(latency, lat)
				if ok {
					okCount++
				} else {
					errCount++
				}
				mu.Unlock()
			}
		}()
	}

	// Sinh job theo nhịp ticker cho tới hết thời lượng.
	start := time.Now()
loop:
	for {
		select {
		case <-ctx.Done():
			break loop
		case <-ticker.C:
			select {
			case jobs <- struct{}{}:
			default:
				// Không kịp tiêu thụ -> coi như "dropped" (under-provisioned).
				mu.Lock()
				errCount++
				mu.Unlock()
			}
		}
	}
	close(jobs)
	wg.Wait()
	elapsed := time.Since(start)

	// ----- Tính thống kê -----
	mu.Lock()
	defer mu.Unlock()
	total := okCount + errCount
	if len(latency) == 0 {
		fmt.Println("Không có request nào hoàn thành.")
		os.Exit(1)
	}
	sort.Slice(latency, func(i, j int) bool { return latency[i] < latency[j] })

	p := func(q float64) time.Duration { return latency[int(q*float64(len(latency)-1))] }
	errRate := float64(errCount) / float64(total) * 100

	fmt.Println("================ KẾT QUẢ ================")
	fmt.Printf("Tổng request    : %d\n", total)
	fmt.Printf("Thời lượng       : %s\n", elapsed.Round(time.Millisecond))
	fmt.Printf("Throughput thực  : %.0f req/s\n", float64(total)/elapsed.Seconds())
	fmt.Printf("Thành công       : %d\n", okCount)
	fmt.Printf("Lỗi              : %d (%.2f%%)\n", errCount, errRate)
	fmt.Printf("Latency p50      : %s\n", p(0.50).Round(time.Microsecond))
	fmt.Printf("Latency p90      : %s\n", p(0.90).Round(time.Microsecond))
	fmt.Printf("Latency p99      : %s\n", p(0.99).Round(time.Microsecond))
	fmt.Printf("Latency max      : %s\n", latency[len(latency)-1].Round(time.Microsecond))

	// Gợi ý đọc kết quả (theo SLO p99 < 50ms, error < 1%).
	fmt.Println("---------------- ĐÁNH GIÁ SLO ----------------")
	if p(0.99) > 50*time.Millisecond {
		fmt.Println("⚠ p99 > 50ms -> VI PHẠM SLO latency. Nghi: cache miss cao / DB chậm / queue backlog.")
	} else {
		fmt.Println("✓ p99 trong ngưỡng SLO (< 50ms).")
	}
	if errRate > 1.0 {
		fmt.Println("⚠ error rate > 1% -> VI PHẠM SLO. Nghi: service quá tải / thiếu replica -> tăng HPA.")
	} else {
		fmt.Println("✓ error rate trong ngưỡng SLO (< 1%).")
	}
}

// doRequest gọi 1 request. Ở -dry, mô phỏng latency phân phối lệch phải
// (đa số nhanh, đuôi dài) — giống hành vi thật khi có cache miss thỉnh thoảng.
func doRequest(ctx context.Context, c *http.Client, url string, dry bool) bool {
	if dry {
		// 90% nhanh (~5ms cache hit), 10% chậm (~40ms cache miss + DB).
		if rand.Float64() < 0.9 {
			time.Sleep(time.Duration(3+rand.Intn(5)) * time.Millisecond)
		} else {
			time.Sleep(time.Duration(30+rand.Intn(20)) * time.Millisecond)
		}
		return rand.Float64() > 0.002 // ~0.2% lỗi giả lập
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return false
	}
	// Không follow redirect để đo đúng latency của chính endpoint redirect.
	c.CheckRedirect = func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }
	resp, err := c.Do(req)
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return resp.StatusCode < 500
}
