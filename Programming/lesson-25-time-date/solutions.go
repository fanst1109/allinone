// Lesson 25 — Time & Date solutions
// Chạy: go run solutions.go
//
// File này gom lời giải 6 bài tập + một số demo bổ sung
// (đo thời gian, retry backoff, rate limiter) để minh họa pattern thực tế.

package main

import (
	"fmt"
	"log"
	"time"
)

// =====================================================================
// Phần A — Demo cơ bản: tạo time, format, parse, timezone, duration
// =====================================================================

func demoCreateTime() {
	fmt.Println("=== Demo: tạo time.Time ===")

	// 1) time.Now() — current, Location = Local, có monotonic
	now := time.Now()
	fmt.Printf("now: %v\n", now)

	// 2) time.Date — build từ thành phần (year, month, day, h, m, s, ns, loc)
	vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
	t := time.Date(2024, time.January, 15, 10, 30, 45, 0, vn)
	fmt.Printf("Date: %v\n", t)

	// 3) Normalize: 13 tháng = năm sau, 1 tháng
	overflow := time.Date(2024, 13, 1, 0, 0, 0, 0, time.UTC)
	fmt.Printf("Date(2024,13,1) → %v (normalize)\n", overflow)

	// 4) time.Unix — từ epoch seconds
	u := time.Unix(1716700000, 0).UTC()
	fmt.Printf("Unix(1716700000) UTC: %v\n", u)

	fmt.Println()
}

func demoFormatParse() {
	fmt.Println("=== Demo: format / parse ===")

	t := time.Date(2024, 5, 26, 14, 30, 45, 0, time.UTC)

	// Format — magic number 2006-01-02 15:04:05
	fmt.Println("default:    ", t)
	fmt.Println("date only:  ", t.Format("2006-01-02"))
	fmt.Println("dd/mm/yyyy: ", t.Format("02/01/2006"))
	fmt.Println("12h kitchen:", t.Format("3:04 PM"))
	fmt.Println("RFC3339:    ", t.Format(time.RFC3339))

	// Parse
	parsed, err := time.Parse(time.RFC3339, "2024-01-15T10:30:45+07:00")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("parsed:     ", parsed)

	// ParseInLocation — value không có zone
	vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
	pl, _ := time.ParseInLocation("2006-01-02 15:04:05", "2024-01-15 10:30:45", vn)
	fmt.Println("in VN zone: ", pl)

	fmt.Println()
}

func demoTimezone() {
	fmt.Println("=== Demo: timezone ===")

	utc := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
	ny, _ := time.LoadLocation("America/New_York")
	tk, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Println("UTC:", utc)
	fmt.Println("VN :", utc.In(vn))
	fmt.Println("NY :", utc.In(ny))
	fmt.Println("TK :", utc.In(tk))

	// Cùng instant → Equal trả true
	fmt.Println("Equal(VN, NY)?", utc.In(vn).Equal(utc.In(ny)))

	// == thì khác
	fmt.Println("== (VN, NY)?  ", utc.In(vn) == utc.In(ny))

	fmt.Println()
}

func demoDuration() {
	fmt.Println("=== Demo: duration ===")

	d := 3*time.Hour + 5*time.Minute + 30*time.Second
	fmt.Println("d:", d)
	fmt.Println("Hours:", d.Hours())
	fmt.Println("Seconds:", d.Seconds())

	t := time.Date(2024, 1, 15, 10, 0, 0, 0, time.UTC)
	fmt.Println("+2h:", t.Add(2*time.Hour))
	fmt.Println("-30m:", t.Add(-30*time.Minute))
	fmt.Println("+1 month:", t.AddDate(0, 1, 0))

	// ParseDuration
	d2, _ := time.ParseDuration("1h30m15s")
	fmt.Println("parsed:", d2)

	fmt.Println()
}

// =====================================================================
// Phần B — Lời giải 6 bài tập
// =====================================================================

// --- BT1: Parse + Convert timezone ---
func solveBT1() {
	fmt.Println("=== BT1: parse + convert TZ ===")
	s := "2024-01-15T10:30:45Z"
	t, err := time.Parse(time.RFC3339, s)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("UTC:", t.UTC().Format("2006-01-02 15:04:05 MST"))

	vn, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("VN :", t.In(vn).Format("2006-01-02 15:04:05 MST"))
	fmt.Println()
}

// --- BT2: Đo thời gian 3 function ---
func funcA() { time.Sleep(100 * time.Millisecond) }
func funcB() { time.Sleep(250 * time.Millisecond) }
func funcC() { time.Sleep(500 * time.Millisecond) }

// timeIt — đo thời gian chạy hàm fn, dùng time.Since (monotonic)
func timeIt(name string, fn func()) {
	start := time.Now()
	fn()
	log.Printf("%s took %v", name, time.Since(start))
}

func solveBT2() {
	fmt.Println("=== BT2: đo thời gian 3 function ===")
	timeIt("A", funcA)
	timeIt("B", funcB)
	timeIt("C", funcC)
	fmt.Println()
}

// --- BT3: Timeout select ---
// slowFetch trả về channel sẽ emit sau delay
func slowFetch(delay time.Duration) <-chan string {
	ch := make(chan string, 1)
	go func() {
		time.Sleep(delay)
		ch <- "done"
	}()
	return ch
}

func fetchWithTimeout(delay, timeout time.Duration) string {
	select {
	case v := <-slowFetch(delay):
		return v
	case <-time.After(timeout):
		return "timeout"
	}
}

func solveBT3() {
	fmt.Println("=== BT3: timeout select ===")
	fmt.Println("delay=3s, timeout=1s →", fetchWithTimeout(3*time.Second, 1*time.Second))
	fmt.Println("delay=200ms, timeout=2s →", fetchWithTimeout(200*time.Millisecond, 2*time.Second))
	fmt.Println()
}

// --- BT4: Ticker 5 tick rồi stop ---
func solveBT4() {
	fmt.Println("=== BT4: ticker 5 lần ===")
	ticker := time.NewTicker(300 * time.Millisecond) // dùng 300ms cho demo nhanh
	defer ticker.Stop()                              // BẮT BUỘC để không leak

	for i := 0; i < 5; i++ {
		t := <-ticker.C
		fmt.Printf("tick %d: %s\n", i+1, t.Format("15:04:05.000"))
	}
	fmt.Println()
}

// --- BT5: Format ngày tiếng Việt ---
var thuVN = map[time.Weekday]string{
	time.Monday:    "Thứ Hai",
	time.Tuesday:   "Thứ Ba",
	time.Wednesday: "Thứ Tư",
	time.Thursday:  "Thứ Năm",
	time.Friday:    "Thứ Sáu",
	time.Saturday:  "Thứ Bảy",
	time.Sunday:    "Chủ Nhật",
}

// formatVN trả về "Thứ Tư, ngày 15 tháng 01 năm 2024"
func formatVN(t time.Time) string {
	return fmt.Sprintf("%s, ngày %02d tháng %02d năm %d",
		thuVN[t.Weekday()], t.Day(), int(t.Month()), t.Year())
}

func solveBT5() {
	fmt.Println("=== BT5: format ngày VN ===")
	// 15/01/2024 là thứ Hai → in từ 15 đến 21 sẽ đủ 7 thứ
	for d := 15; d <= 21; d++ {
		t := time.Date(2024, 1, d, 0, 0, 0, 0, time.UTC)
		fmt.Println(formatVN(t))
	}
	fmt.Println()
}

// --- BT6: Detect 4 bug ---
type Event struct {
	Name string
	At   time.Time
}

func process()     { /* giả lập work */ }
func emitMetric()  { /* giả lập emit */ }

// reportBuggy — code có 4 bug (đã sửa thành reportFixed)
func reportFixed(events []Event) {
	// Bug 1: layout "YYYY-MM-DD" → đúng phải là "2006-01-02"
	layout := "2006-01-02"
	for _, e := range events {
		fmt.Println(e.At.Format(layout))
	}

	// Bug 2: e.At == e.At so sánh struct (sai khi monotonic khác)
	if len(events) >= 2 && events[0].At.Equal(events[1].At) {
		fmt.Println("trùng giờ")
	}

	// Bug 3: ticker không Stop
	ticker := time.NewTicker(50 * time.Millisecond) // 50ms cho demo
	defer ticker.Stop()
	for i := 0; i < 3; i++ {
		<-ticker.C
		process()
	}

	// Bug 4: Sleep trong loop → drift. Dùng Ticker để giữ nhịp.
	emitT := time.NewTicker(20 * time.Millisecond) // 20ms cho demo
	defer emitT.Stop()
	for i := 0; i < 3; i++ {
		<-emitT.C
		emitMetric()
	}
}

func solveBT6() {
	fmt.Println("=== BT6: bug detect + reportFixed ===")
	events := []Event{
		{"login", time.Date(2024, 1, 15, 10, 0, 0, 0, time.UTC)},
		{"login", time.Date(2024, 1, 15, 10, 0, 0, 0, time.UTC)},
	}
	reportFixed(events)
	fmt.Println()
}

// =====================================================================
// Phần C — Pattern thực tế bổ sung
// =====================================================================

// retry — chạy op tối đa maxAttempts lần với backoff nhân đôi
func retry(maxAttempts int, op func() error) error {
	delay := 100 * time.Millisecond
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		if err := op(); err == nil {
			return nil
		}
		if attempt == maxAttempts {
			return fmt.Errorf("failed after %d attempts", maxAttempts)
		}
		time.Sleep(delay)
		delay *= 2
	}
	return nil
}

func demoRetry() {
	fmt.Println("=== Demo: retry backoff ===")
	attempt := 0
	err := retry(4, func() error {
		attempt++
		log.Printf("attempt %d", attempt)
		if attempt < 3 {
			return fmt.Errorf("fail")
		}
		return nil
	})
	fmt.Println("retry result:", err)
	fmt.Println()
}

// rateLimitedHandle — pattern rate limiter: tối đa N op/giây
func rateLimitedHandle(items []int, perSecond int) {
	interval := time.Second / time.Duration(perSecond)
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for _, x := range items {
		<-ticker.C
		log.Printf("handle %d", x)
	}
}

func demoRateLimit() {
	fmt.Println("=== Demo: rate limit 5/giây ===")
	rateLimitedHandle([]int{1, 2, 3, 4, 5}, 5) // ~1s tổng
	fmt.Println()
}

// =====================================================================
// main
// =====================================================================
func main() {
	demoCreateTime()
	demoFormatParse()
	demoTimezone()
	demoDuration()

	solveBT1()
	solveBT2()
	solveBT3()
	solveBT4()
	solveBT5()
	solveBT6()

	demoRetry()
	demoRateLimit()
}
