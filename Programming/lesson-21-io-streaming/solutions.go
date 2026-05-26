// Lesson 21 — IO Streaming: lời giải mẫu cho các bài tập.
//
// Chạy:
//   go run solutions.go
//
// File này demo:
//   1. CountingReader  (BT1)
//   2. Line scanner    (BT2)
//   3. io.Copy demo    (BT3 — phiên bản không cần network, copy file→file)
//   4. TeeReader+hash  (BT4 — copy từ string source)
//   5. io.Pipe cross goroutine (BT5)
//   6. RateLimitedReader (BT6)
//   7. bufio.Writer + Flush demo (mục 6 README)
package main

import (
	"bufio"
	"crypto/sha256"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

// ============================================================
// BT1 — CountingReader: wrapper đếm tổng số byte đã đọc qua.
// ============================================================

type CountingReader struct {
	R io.Reader // reader gốc
	N int64     // tổng byte đã đọc
}

// Read delegate cho R rồi cộng dồn n vào N.
// Quan trọng: cộng n NGAY CẢ KHI err != nil — vì Read có thể trả
// (n>0, io.EOF) cùng lúc.
func (cr *CountingReader) Read(p []byte) (int, error) {
	n, err := cr.R.Read(p)
	cr.N += int64(n)
	return n, err
}

func demoCountingReader() {
	fmt.Println("--- BT1: CountingReader ---")
	cr := &CountingReader{R: strings.NewReader("abcdefghij")}
	// io.ReadAll lặp Read đến EOF
	_, _ = io.ReadAll(cr)
	fmt.Printf("Đã đọc tổng cộng: %d byte (mong đợi 10)\n\n", cr.N)
}

// ============================================================
// BT2 — Line scanner: đếm dòng + tìm dòng dài nhất theo rune.
// ============================================================

func longestLine(r io.Reader) (count int, maxLen int, longest string) {
	sc := bufio.NewScanner(r)
	// Nếu cần dòng > 64KB:
	//   sc.Buffer(make([]byte, 1<<20), 10<<20)
	for sc.Scan() {
		line := sc.Text()
		count++
		l := utf8.RuneCountInString(line) // đếm rune, không phải byte
		if l > maxLen {
			maxLen = l
			longest = line
		}
	}
	return
}

func demoLineScanner() {
	fmt.Println("--- BT2: Line scanner ---")
	input := "hi\nxin chào\nfoo\nGo là ngôn ngữ tuyệt vời\nbar"
	count, maxLen, longest := longestLine(strings.NewReader(input))
	fmt.Printf("Số dòng: %d\n", count)
	fmt.Printf("Dòng dài nhất (%d rune): %q\n\n", maxLen, longest)
}

// ============================================================
// BT3 — io.Copy demo (offline version: copy giữa các Reader/Writer
// thay vì gọi mạng để giữ solutions.go offline-friendly).
// ============================================================

func demoIoCopy() {
	fmt.Println("--- BT3: io.Copy ---")
	src := strings.NewReader(strings.Repeat("0123456789", 1000)) // 10 000 byte
	var dst strings.Builder
	n, err := io.Copy(&dst, src)
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	fmt.Printf("Đã copy %d byte (chỉ dùng buffer 32KB nội bộ)\n", n)
	fmt.Printf("Đầu output: %q...\n\n", dst.String()[:20])
}

// ============================================================
// BT4 — TeeReader: copy + tính SHA256 trong cùng 1 lượt đọc.
// ============================================================

func demoTeeReader() {
	fmt.Println("--- BT4: TeeReader + SHA256 ---")
	src := strings.NewReader("The quick brown fox jumps over the lazy dog")
	var dst strings.Builder
	h := sha256.New()
	tee := io.TeeReader(src, h) // đọc src → tự ghi vào h

	n, _ := io.Copy(&dst, tee)
	fmt.Printf("Đã copy %d byte sang dst\n", n)
	fmt.Printf("Dst content: %q\n", dst.String())
	fmt.Printf("SHA256: %x\n\n", h.Sum(nil))
}

// ============================================================
// BT5 — io.Pipe: producer/consumer cross goroutine.
// Producer ghi 1..100 (mỗi số 1 dòng), consumer đọc cộng các số chia hết 3.
// ============================================================

func sumDivisibleByThree() int {
	pr, pw := io.Pipe()

	// Producer goroutine
	go func() {
		defer pw.Close() // BẮT BUỘC — không thì consumer block mãi
		for i := 1; i <= 100; i++ {
			fmt.Fprintf(pw, "%d\n", i)
		}
	}()

	// Consumer (chạy trên main goroutine)
	total := 0
	sc := bufio.NewScanner(pr)
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n%3 == 0 {
			total += n
		}
	}
	return total
}

func demoPipe() {
	fmt.Println("--- BT5: io.Pipe ---")
	total := sumDivisibleByThree()
	// 3+6+9+...+99 = 3*(1+2+...+33) = 3*561 = 1683
	fmt.Printf("Tổng các số trong 1..100 chia hết 3: %d (mong đợi 1683)\n\n", total)
}

// ============================================================
// BT6 — RateLimitedReader: giới hạn tốc độ đọc.
// ============================================================

type RateLimitedReader struct {
	R         io.Reader
	BytesPerS int

	start time.Time
	read  int64
}

func (r *RateLimitedReader) Read(p []byte) (int, error) {
	if r.start.IsZero() {
		r.start = time.Now()
	}
	n, err := r.R.Read(p)
	r.read += int64(n)

	// Thời gian "lý thuyết" cần để đã đọc r.read byte ở rate BytesPerS.
	target := time.Duration(float64(r.read) / float64(r.BytesPerS) * float64(time.Second))
	actual := time.Since(r.start)
	if target > actual {
		time.Sleep(target - actual)
	}
	return n, err
}

func demoRateLimiter() {
	fmt.Println("--- BT6: RateLimitedReader ---")
	// Source 10 000 byte; giới hạn 5 000 byte/s → ~2s
	src := strings.NewReader(strings.Repeat("x", 10000))
	rlr := &RateLimitedReader{R: src, BytesPerS: 5000}

	t0 := time.Now()
	buf := make([]byte, 1000)
	total := 0
	for {
		n, err := rlr.Read(buf)
		total += n
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("err:", err)
			return
		}
	}
	elapsed := time.Since(t0)
	fmt.Printf("Đọc %d byte trong %v (mong đợi ~2s ở 5000 byte/s)\n\n", total, elapsed.Round(50*time.Millisecond))
}

// ============================================================
// Bonus — bufio.Writer + Flush demo (mục 6 README).
// Minh hoạ vì sao thiếu Flush() → mất data.
// ============================================================

// fakeFile giả lập một file, đếm số lần Write thật được gọi.
type fakeFile struct {
	mu     sync.Mutex
	data   []byte
	writes int
}

func (f *fakeFile) Write(p []byte) (int, error) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.data = append(f.data, p...)
	f.writes++
	return len(p), nil
}

func demoBufioFlush() {
	fmt.Println("--- Bonus: bufio.Writer + Flush ---")

	// Không Flush
	ff1 := &fakeFile{}
	bw1 := bufio.NewWriterSize(ff1, 4096)
	for i := 0; i < 10; i++ {
		fmt.Fprintf(bw1, "line %d\n", i)
	}
	// "Quên" Flush
	fmt.Printf("Không Flush: số byte trong file=%d, số lần Write=%d (dữ liệu kẹt trong buffer!)\n", len(ff1.data), ff1.writes)

	// Có Flush
	ff2 := &fakeFile{}
	bw2 := bufio.NewWriterSize(ff2, 4096)
	for i := 0; i < 10; i++ {
		fmt.Fprintf(bw2, "line %d\n", i)
	}
	bw2.Flush()
	fmt.Printf("Có Flush:    số byte trong file=%d, số lần Write=%d (1 syscall thay vì 10)\n\n", len(ff2.data), ff2.writes)
}

// ============================================================
// Bonus 2 — Demo MultiReader (mục 9 README).
// ============================================================

func demoMultiReader() {
	fmt.Println("--- Bonus: MultiReader ---")
	header := strings.NewReader("HEAD\n")
	body := strings.NewReader("body line 1\nbody line 2\n")
	footer := strings.NewReader("FOOT\n")
	combined := io.MultiReader(header, body, footer)

	data, _ := io.ReadAll(combined)
	fmt.Printf("Combined:\n%s\n", data)
}

// ============================================================
// Bonus 3 — Demo LimitReader (mục 11 README).
// ============================================================

func demoLimitReader() {
	fmt.Println("--- Bonus: LimitReader ---")
	huge := strings.NewReader(strings.Repeat("x", 1_000_000))
	limited := io.LimitReader(huge, 100)
	data, _ := io.ReadAll(limited)
	fmt.Printf("Source có 1 000 000 byte, đọc qua LimitReader(100) → %d byte\n\n", len(data))
}

// ============================================================
// Bonus 4 — Stream tee tới os.Stdout (demo MultiWriter).
// ============================================================

func demoMultiWriter() {
	fmt.Println("--- Bonus: MultiWriter (broadcast) ---")
	var buf1, buf2 strings.Builder
	mw := io.MultiWriter(&buf1, &buf2, io.Discard) // ghi cùng lúc 3 sink
	fmt.Fprintln(mw, "hello multi writer")
	fmt.Printf("buf1=%q\nbuf2=%q\n\n", buf1.String(), buf2.String())
}

// ============================================================

func main() {
	demoCountingReader()
	demoLineScanner()
	demoIoCopy()
	demoTeeReader()
	demoPipe()
	demoRateLimiter()
	demoBufioFlush()
	demoMultiReader()
	demoLimitReader()
	demoMultiWriter()

	// Đảm bảo stdout flush (đối với chương trình ngắn không bắt buộc,
	// nhưng minh hoạ best practice).
	_ = os.Stdout.Sync()
}
