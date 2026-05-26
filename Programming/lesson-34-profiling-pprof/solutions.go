// Lesson 34 — Profiling pprof: solutions
//
// File này demo một service nhỏ với các bottleneck cố ý để bạn thực hành pprof.
//
// CÁCH CHẠY:
//   go run solutions.go
//
// Sau khi chạy, mở các URL sau trong browser:
//   http://localhost:8080/                 — trang gốc, hướng dẫn
//   http://localhost:8080/slow-concat      — endpoint chậm vì string concat O(n²)
//   http://localhost:8080/slow-regex       — endpoint chậm vì regex compile mỗi request
//   http://localhost:8080/slow-json        — endpoint chậm vì JSON marshal trong loop
//   http://localhost:8080/leak             — endpoint TẠO goroutine leak intentional
//   http://localhost:8080/leak-status      — kiểm tra số goroutine hiện tại
//
// Pprof endpoint (KHÔNG public ngoài đời thực):
//   http://localhost:6060/debug/pprof/
//   http://localhost:6060/debug/pprof/profile?seconds=10  — CPU profile
//   http://localhost:6060/debug/pprof/heap                — heap
//   http://localhost:6060/debug/pprof/goroutine?debug=1   — goroutine dump
//   http://localhost:6060/debug/pprof/block               — block profile (đã enable)
//   http://localhost:6060/debug/pprof/mutex               — mutex profile (đã enable)
//
// WORKFLOW THỬ:
//   1. Chạy: go run solutions.go
//   2. Trong terminal khác, load test:
//        for i in $(seq 1 200); do curl -s http://localhost:8080/slow-regex?q=foo > /dev/null; done &
//   3. Trong terminal thứ ba, collect CPU profile:
//        go tool pprof http://localhost:6060/debug/pprof/profile?seconds=10
//   4. Trong pprof shell: top10, list HandleSlowRegex, web
//   5. Goroutine leak demo:
//        for i in $(seq 1 100); do curl -s http://localhost:8080/leak > /dev/null; done
//        curl http://localhost:8080/leak-status
//        # số goroutine sẽ tăng monotonic — đây là leak.
//
// File này standalone — không cần go.mod. Chỉ dùng stdlib.

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	_ "net/http/pprof" // (1) đăng ký handler pprof vào DefaultServeMux
	"os"
	"regexp"
	"runtime"
	"runtime/pprof"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

// ============================================================================
// Hot function #1 — string concat O(n²)
// ----------------------------------------------------------------------------
// Đây là bottleneck cổ điển: dùng s += x trong loop. Mỗi lần concat, Go phải
// alloc string mới + copy toàn bộ nội dung cũ → O(n²) alloc và O(n²) memmove.
// ============================================================================

// slowStringConcat tạo report bằng cách concat lặp — CỐ Ý CHẬM.
func slowStringConcat(items []string) string {
	s := ""
	for _, item := range items {
		s += "[" + item + "]\n" // BAD: mỗi vòng alloc + copy
	}
	return s
}

// fastStringConcat là phiên bản đã optimize — dùng strings.Builder + Grow.
// Để so sánh khi profile, gọi cái này thay cho slowStringConcat.
func fastStringConcat(items []string) string {
	var b strings.Builder
	b.Grow(len(items) * 16) // ước lượng size để Builder không grow nhiều lần
	for _, item := range items {
		b.WriteByte('[')
		b.WriteString(item)
		b.WriteString("]\n")
	}
	return b.String()
}

// ============================================================================
// Hot function #2 — regex compile mỗi request
// ----------------------------------------------------------------------------
// regexp.MustCompile tốn ms-level. Gọi trong handler = compile mỗi request.
// Pattern chuẩn: compile 1 lần ở package-level var, hoặc cache theo query.
// ============================================================================

// slowRegexSearch compile regex MỖI LẦN gọi — CỐ Ý CHẬM.
func slowRegexSearch(corpus, query string) []string {
	re := regexp.MustCompile(`(?i)\b` + regexp.QuoteMeta(query) + `\b`) // BAD
	return re.FindAllString(corpus, -1)
}

// fastRegexSearch dùng sync.Map cache regex theo query.
var regexCache sync.Map

func fastRegexSearch(corpus, query string) []string {
	v, ok := regexCache.Load(query)
	if !ok {
		re := regexp.MustCompile(`(?i)\b` + regexp.QuoteMeta(query) + `\b`)
		v, _ = regexCache.LoadOrStore(query, re)
	}
	return v.(*regexp.Regexp).FindAllString(corpus, -1)
}

// ============================================================================
// Hot function #3 — JSON marshal trong loop, không pool buffer
// ----------------------------------------------------------------------------
// json.Marshal alloc buffer mới mỗi call. Trong loop = allocation pressure cao
// → GC chạy nhiều → CPU phí.
// ============================================================================

type record struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// slowJSONMarshal marshal từng record, không reuse buffer — CỐ Ý CHẬM.
func slowJSONMarshal(records []record) [][]byte {
	out := make([][]byte, 0, len(records))
	for _, r := range records {
		data, _ := json.Marshal(r) // BAD: alloc buffer mới mỗi vòng
		out = append(out, data)
	}
	return out
}

// fastJSONMarshal dùng sync.Pool reuse []byte buffer + json.NewEncoder.
// Đây là pattern fix cho slowJSONMarshal — giảm allocation pressure ~10×.
var bufPool = sync.Pool{New: func() any { return make([]byte, 0, 256) }}

func fastJSONMarshal(records []record) [][]byte {
	out := make([][]byte, 0, len(records))
	for _, r := range records {
		// json.Marshal vẫn alloc; cách thực sự pool được là dùng Encoder + bytes.Buffer.
		// Ở đây giữ ví dụ ngắn — xem README §12.2 cho phiên bản đầy đủ.
		buf := bufPool.Get().([]byte)[:0]
		data, _ := json.Marshal(r)
		buf = append(buf, data...)
		dst := make([]byte, len(buf))
		copy(dst, buf)
		bufPool.Put(buf) //nolint:staticcheck // demo only
		out = append(out, dst)
	}
	return out
}

// ============================================================================
// HTTP handlers — expose 3 bottleneck qua HTTP để dễ load test
// ============================================================================

// corpus cố định để regex search ăn thật.
var corpus = strings.Repeat("the quick brown fox jumps over the lazy dog. ", 5000)

// items cố định cho slow-concat.
var items = make([]string, 5000)

func init() {
	for i := range items {
		items[i] = fmt.Sprintf("item-%d", i)
	}
}

// HandleSlowConcat — endpoint demo O(n²) string concat.
func HandleSlowConcat(w http.ResponseWriter, r *http.Request) {
	result := slowStringConcat(items)
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprintf(w, "built %d bytes\n", len(result))
}

// HandleSlowRegex — endpoint demo regex compile lặp.
// Query param ?q=foo để biến query mỗi lần (test cache).
func HandleSlowRegex(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")
	if q == "" {
		q = "fox"
	}
	matches := slowRegexSearch(corpus, q)
	fmt.Fprintf(w, "found %d matches for %q\n", len(matches), q)
}

// HandleSlowJSON — endpoint demo JSON marshal trong loop.
func HandleSlowJSON(w http.ResponseWriter, r *http.Request) {
	records := make([]record, 1000)
	for i := range records {
		records[i] = record{ID: i, Name: fmt.Sprintf("user-%d", i), Email: fmt.Sprintf("u%d@example.com", i)}
	}
	out := slowJSONMarshal(records)
	fmt.Fprintf(w, "marshaled %d records, total %d bytes\n", len(out), totalLen(out))
}

func totalLen(bs [][]byte) int {
	n := 0
	for _, b := range bs {
		n += len(b)
	}
	return n
}

// ============================================================================
// Goroutine leak intentional + detection
// ----------------------------------------------------------------------------
// HandleLeak spawn 1 goroutine chờ trên channel KHÔNG bao giờ có ai gửi.
// Mỗi request → 1 goroutine leak vĩnh viễn. Sau 100 request → 100 goroutine kẹt.
// HandleLeakStatus show số goroutine hiện tại để bạn quan sát monotonic growth.
// ============================================================================

var leakCounter atomic.Int64

// HandleLeak demo goroutine leak.
func HandleLeak(w http.ResponseWriter, r *http.Request) {
	ch := make(chan int) // unbuffered, không ai gửi
	go func() {
		<-ch // ← leak: kẹt forever
		// Dòng dưới không bao giờ chạy.
		log.Println("worker finished")
	}()
	leakCounter.Add(1)
	fmt.Fprintf(w, "leaked another goroutine. total leaked so far: %d\n", leakCounter.Load())
}

// HandleLeakStatus snapshot goroutine count.
// So sánh với output `curl /debug/pprof/goroutine?debug=1` để thấy chỗ kẹt.
func HandleLeakStatus(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "runtime.NumGoroutine() = %d\n", runtime.NumGoroutine())
	fmt.Fprintf(w, "leak counter (manual)  = %d\n", leakCounter.Load())
	fmt.Fprintln(w, "→ nếu hai số tăng song song theo request → leak.")
	fmt.Fprintln(w, "→ kiểm tra chi tiết: curl http://localhost:6060/debug/pprof/goroutine?debug=1")
}

// ============================================================================
// Trang index + manual runtime/pprof CPU profile demo
// ============================================================================

const indexHTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>L34 — pprof demo</title></head>
<body style="font-family: -apple-system, sans-serif; max-width: 720px; margin: 32px auto; padding: 0 16px; line-height: 1.5;">
<h1>Lesson 34 — pprof demo server</h1>
<p>3 endpoint cố ý chậm + 1 endpoint leak goroutine. Dùng <code>pprof</code> để tìm bottleneck.</p>
<ul>
<li><a href="/slow-concat">/slow-concat</a> — string concat O(n²)</li>
<li><a href="/slow-regex?q=fox">/slow-regex?q=fox</a> — regex compile lặp</li>
<li><a href="/slow-json">/slow-json</a> — JSON marshal trong loop</li>
<li><a href="/leak">/leak</a> — tạo 1 goroutine leak</li>
<li><a href="/leak-status">/leak-status</a> — đếm goroutine hiện tại</li>
</ul>
<h2>Pprof</h2>
<ul>
<li><a href="http://localhost:6060/debug/pprof/">localhost:6060/debug/pprof/</a></li>
<li><code>go tool pprof http://localhost:6060/debug/pprof/profile?seconds=10</code></li>
<li><code>go tool pprof http://localhost:6060/debug/pprof/heap</code></li>
<li><code>go tool pprof http://localhost:6060/debug/pprof/goroutine</code></li>
</ul>
<p>Workflow gợi ý:
<pre>for i in $(seq 1 200); do curl -s "http://localhost:8080/slow-regex?q=run$i" >/dev/null; done &amp;
go tool pprof -http=:8081 http://localhost:6060/debug/pprof/profile?seconds=10</pre>
</p>
</body></html>`

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, indexHTML)
}

// captureCPUProfile demo dùng runtime/pprof MANUAL — không qua HTTP.
// Profile được ghi ra file cpu-manual.prof trong CWD, ghi đè mỗi lần gọi.
// Bạn có thể `go tool pprof cpu-manual.prof` sau khi process chạy 5s.
func captureCPUProfile(d time.Duration) {
	f, err := os.Create("cpu-manual.prof")
	if err != nil {
		log.Printf("cannot create profile file: %v", err)
		return
	}
	defer f.Close()

	if err := pprof.StartCPUProfile(f); err != nil {
		log.Printf("StartCPUProfile: %v", err)
		return
	}
	log.Printf("manual CPU profile started, recording for %v → cpu-manual.prof", d)
	time.Sleep(d)
	pprof.StopCPUProfile()
	log.Printf("manual CPU profile written: cpu-manual.prof (use: go tool pprof cpu-manual.prof)")
}

// generateLoad chạy nền tạo work để CPU profile có gì để show.
func generateLoad() {
	for {
		_ = slowStringConcat(items[:200])
		_ = slowRegexSearch(corpus, fmt.Sprintf("word%d", rand.Intn(100)))
		time.Sleep(20 * time.Millisecond)
	}
}

// ============================================================================
// main — wire mọi thứ lại
// ============================================================================

func main() {
	// (1) Enable block + mutex profile (mặc định OFF). Phải bật trước khi expose.
	runtime.SetBlockProfileRate(1)        // sample mọi block event
	runtime.SetMutexProfileFraction(1)    // sample mọi mutex contention event

	// (2) Mở pprof endpoint trên port riêng. KHÔNG dùng chung với traffic chính,
	// và bind localhost để không lộ ra public.
	go func() {
		log.Println("pprof listening on http://localhost:6060/debug/pprof/")
		log.Println(http.ListenAndServe("localhost:6060", nil))
	}()

	// (3) Mux riêng cho traffic chính (vì DefaultServeMux đã bị pprof "chiếm").
	mux := http.NewServeMux()
	mux.HandleFunc("/", HandleIndex)
	mux.HandleFunc("/slow-concat", HandleSlowConcat)
	mux.HandleFunc("/slow-regex", HandleSlowRegex)
	mux.HandleFunc("/slow-json", HandleSlowJSON)
	mux.HandleFunc("/leak", HandleLeak)
	mux.HandleFunc("/leak-status", HandleLeakStatus)

	// (4) Background load để có gì cho profile show.
	go generateLoad()

	// (5) Demo runtime/pprof manual CPU profile — chạy 5s rồi ghi file.
	go func() {
		time.Sleep(2 * time.Second)
		captureCPUProfile(5 * time.Second)
	}()

	log.Println("HTTP server listening on http://localhost:8080")
	log.Println("→ mở trình duyệt http://localhost:8080 để xem hướng dẫn")
	log.Println("→ pprof URL: http://localhost:6060/debug/pprof/")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
