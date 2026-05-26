// Package lesson37 minh hoạ các kỹ thuật test nâng cao trong Go:
// fuzz testing, property-based test, race detector, integration test,
// golden file, httptest, parallel subtest, t.Cleanup/TestMain, fixture.
//
// Mỗi hàm dưới đây đi kèm test trong solutions_test.go. Chạy:
//
//	go test -v ./...
//	go test -race ./...
//	go test -fuzz=FuzzReverse -fuzztime=10s ./...
//	go test -run=Golden -update ./...   (regenerate golden files)
package lesson37

import (
	"errors"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"sort"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"unicode/utf8"
)

// ============================================================
// 1. Reverse — dùng cho fuzz test & property-based test
// ============================================================

// Reverse trả về chuỗi đảo ngược theo rune (Unicode-safe).
// Đây là phiên bản ĐÚNG. Có một bug version bên dưới (ReverseBuggy)
// dành cho fuzz test phát hiện.
func Reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

// ReverseBuggy đảo theo BYTE thay vì rune — sẽ corrupt với
// chuỗi UTF-8 nhiều byte. Fuzz test sẽ tìm ra crash này.
//
// VD: ReverseBuggy("café") → byte order vỡ → string không còn valid UTF-8.
func ReverseBuggy(s string) string {
	b := []byte(s)
	for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
		b[i], b[j] = b[j], b[i]
	}
	return string(b)
}

// ============================================================
// 2. Sort idempotent — property-based test
// ============================================================

// SortInts sort tăng dần, return slice MỚI (không mutate input).
func SortInts(in []int) []int {
	out := make([]int, len(in))
	copy(out, in)
	sort.Ints(out)
	return out
}

// ============================================================
// 3. Parse — fuzz test BT1
// ============================================================

// Parse nhận chuỗi "key=value;key=value;..." → map.
// Đây là phiên bản đã FIX bug fuzz tìm ra (bug gốc: panic khi
// gặp segment rỗng do `;;` hoặc trailing `;`).
func Parse(s string) (map[string]string, error) {
	out := make(map[string]string)
	if s == "" {
		return out, nil
	}
	for _, seg := range strings.Split(s, ";") {
		if seg == "" {
			// FIX: bỏ qua segment rỗng thay vì panic.
			continue
		}
		idx := strings.Index(seg, "=")
		if idx < 0 {
			return nil, fmt.Errorf("segment thiếu '=': %q", seg)
		}
		k, v := seg[:idx], seg[idx+1:]
		if k == "" {
			return nil, fmt.Errorf("key rỗng trong segment %q", seg)
		}
		out[k] = v
	}
	return out, nil
}

// ============================================================
// 4. Race condition demo + fix
// ============================================================

// UnsafeCounter — TUỒNG race condition (cố tình, để minh hoạ).
// `go test -race` sẽ flag.
type UnsafeCounter struct{ n int }

func (c *UnsafeCounter) Inc() { c.n++ }     // RACE: read + write không atomic
func (c *UnsafeCounter) Val() int { return c.n }

// SafeCounter — dùng atomic, race-free.
type SafeCounter struct{ n atomic.Int64 }

func (c *SafeCounter) Inc()      { c.n.Add(1) }
func (c *SafeCounter) Val() int64 { return c.n.Load() }

// MutexCounter — cách 2: mutex.
type MutexCounter struct {
	mu sync.Mutex
	n  int
}

func (c *MutexCounter) Inc() {
	c.mu.Lock()
	c.n++
	c.mu.Unlock()
}

func (c *MutexCounter) Val() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

// ============================================================
// 5. HTML template render — dùng cho golden file test
// ============================================================

// Report là model truyền cho template.
type Report struct {
	Title string
	Users []string
	Total int
}

const reportTmpl = `<!DOCTYPE html>
<html><head><title>{{.Title}}</title></head>
<body>
  <h1>{{.Title}}</h1>
  <p>Tổng số user: {{.Total}}</p>
  <ul>
  {{- range .Users}}
    <li>{{.}}</li>
  {{- end}}
  </ul>
</body></html>`

// RenderReport render template với data → HTML string.
// Output ổn định (deterministic) → có thể so với golden file.
func RenderReport(r Report) (string, error) {
	t, err := template.New("report").Parse(reportTmpl)
	if err != nil {
		return "", err
	}
	var sb strings.Builder
	if err := t.Execute(&sb, r); err != nil {
		return "", err
	}
	return sb.String(), nil
}

// ============================================================
// 6. HTTP handler & client — dùng cho httptest demo
// ============================================================

// EchoHandler echo lại query param `msg` dưới dạng JSON.
// Đơn giản đủ để test với httptest.NewRecorder().
func EchoHandler(w http.ResponseWriter, r *http.Request) {
	msg := r.URL.Query().Get("msg")
	if msg == "" {
		http.Error(w, `{"error":"thiếu msg"}`, http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"echo":%q}`, msg)
}

// Client là một wrapper http call. Trong test ta inject baseURL
// trỏ tới httptest.Server thay vì server thật.
type Client struct {
	BaseURL string
	HTTP    *http.Client
}

// GetEcho gọi /echo?msg=... và parse plain field "echo".
// Để test đơn giản, ta cắt thẳng JSON thay vì decode (tránh tạo struct).
func (c *Client) GetEcho(msg string) (string, error) {
	if c.HTTP == nil {
		c.HTTP = http.DefaultClient
	}
	resp, err := c.HTTP.Get(c.BaseURL + "/echo?msg=" + msg)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return "", fmt.Errorf("status %d", resp.StatusCode)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	// Extract value giữa `"echo":"` và `"}`.
	s := string(body)
	const prefix = `{"echo":"`
	if !strings.HasPrefix(s, prefix) || !strings.HasSuffix(s, `"}`) {
		return "", errors.New("response không đúng format")
	}
	return s[len(prefix) : len(s)-2], nil
}

// ============================================================
// 7. Fixture loader — minh hoạ pattern testdata/
// ============================================================

// ParseCSVLine — helper nhỏ để demo fixture load.
// (Trong test, ta sẽ đọc testdata/users.csv và parse từng dòng.)
func ParseCSVLine(line string) ([]string, error) {
	if line == "" {
		return nil, errors.New("dòng rỗng")
	}
	parts := strings.Split(line, ",")
	for i, p := range parts {
		parts[i] = strings.TrimSpace(p)
	}
	return parts, nil
}

// IsValidUTF8 — helper cho fuzz test verify invariant.
func IsValidUTF8(s string) bool { return utf8.ValidString(s) }

// ============================================================
// 8. ParseAndSum — kết hợp parse + tính tổng, demo integration test
// ============================================================

// ParseAndSum nhận chuỗi "1,2,3,4" → tổng các số.
// Dùng trong integration test (BT scope rộng).
func ParseAndSum(s string) (int, error) {
	if s == "" {
		return 0, nil
	}
	sum := 0
	for _, tok := range strings.Split(s, ",") {
		tok = strings.TrimSpace(tok)
		n, err := strconv.Atoi(tok)
		if err != nil {
			return 0, fmt.Errorf("token %q không phải số: %w", tok, err)
		}
		sum += n
	}
	return sum, nil
}
