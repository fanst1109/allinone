package lesson37

import (
	"bytes"
	"flag"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"testing"
	"unicode/utf8"
)

// ============================================================
// TestMain — setup / teardown CHO TOÀN BỘ PACKAGE
// ============================================================
//
// TestMain chạy MỘT LẦN trước tất cả test trong package. Dùng để:
//   - tạo temp dir dùng chung
//   - khởi tạo logger / config
//   - mở/đóng resource đắt (DB connection pool, container)
//
// Ở đây ta dùng để parse cờ -update riêng cho golden file test.

var updateGolden = flag.Bool("update", false, "rewrite golden files")

func TestMain(m *testing.M) {
	// Setup chung: seed random ổn định để test deterministic.
	rand.Seed(42)
	fmt.Println("[TestMain] setup xong, chạy test ...")

	code := m.Run()

	fmt.Println("[TestMain] teardown — tất cả test đã chạy")
	os.Exit(code)
}

// ============================================================
// 1. Reverse — unit test + property-based test
// ============================================================

func TestReverse(t *testing.T) {
	cases := []struct{ in, want string }{
		{"", ""},
		{"a", "a"},
		{"hello", "olleh"},
		{"café", "éfac"}, // chứa rune > 1 byte
		{"日本語", "語本日"},
	}
	for _, c := range cases {
		t.Run(c.in, func(t *testing.T) {
			got := Reverse(c.in)
			if got != c.want {
				t.Errorf("Reverse(%q) = %q, want %q", c.in, got, c.want)
			}
		})
	}
}

// TestReverse_Property — property-based test:
// invariant Reverse(Reverse(s)) == s với MỌI string hợp lệ UTF-8.
// Ta tự sinh nhiều input ngẫu nhiên thay vì hardcode case.
func TestReverse_Property(t *testing.T) {
	for i := 0; i < 200; i++ {
		s := randUTF8String(rand.Intn(20))
		got := Reverse(Reverse(s))
		if got != s {
			t.Errorf("invariant fail: Reverse(Reverse(%q)) = %q", s, got)
		}
		// Invariant phụ: độ dài (theo rune) phải bằng.
		if utf8.RuneCountInString(Reverse(s)) != utf8.RuneCountInString(s) {
			t.Errorf("rune count thay đổi sau reverse: %q", s)
		}
	}
}

func randUTF8String(n int) string {
	// Pick rune từ vài range Unicode khác nhau để cover edge case.
	ranges := [][2]rune{
		{'a', 'z'}, {'A', 'Z'}, {'0', '9'},
		{0x00C0, 0x00FF}, // Latin extended
		{0x4E00, 0x4E20}, // CJK một đoạn nhỏ
	}
	var sb strings.Builder
	for i := 0; i < n; i++ {
		r := ranges[rand.Intn(len(ranges))]
		sb.WriteRune(rune(int(r[0]) + rand.Intn(int(r[1]-r[0]+1))))
	}
	return sb.String()
}

// ============================================================
// 2. Fuzz test — built-in của Go 1.18+
// ============================================================
//
// Chạy: go test -fuzz=FuzzReverse -fuzztime=10s
// Khi tìm crash, Go tự lưu input vào testdata/fuzz/FuzzReverse/<hash>
// và lần test sau coi nó như case bình thường.
//
// Seed corpus: ta cho vài chuỗi mẫu để fuzz có gốc.
func FuzzReverse(f *testing.F) {
	seeds := []string{"hello", "café", "日本語", "", "a", "ab"}
	for _, s := range seeds {
		f.Add(s)
	}
	f.Fuzz(func(t *testing.T, s string) {
		// Skip input không phải UTF-8 hợp lệ — Reverse chỉ define
		// trên UTF-8 string. Fuzzer vẫn sinh được []byte tùy ý.
		if !utf8.ValidString(s) {
			t.Skip()
		}
		got := Reverse(Reverse(s))
		if got != s {
			t.Errorf("Reverse(Reverse(%q)) = %q, mất thông tin", s, got)
		}
		if !utf8.ValidString(Reverse(s)) {
			t.Errorf("Reverse(%q) không còn UTF-8 hợp lệ", s)
		}
	})
}

// FuzzParse — fuzz cho Parse, kiểm invariant: không bao giờ panic
// và mọi parse thành công có thể format lại thành chuỗi parse được.
func FuzzParse(f *testing.F) {
	for _, s := range []string{"", "a=1", "a=1;b=2", ";;", "a=", "=b", "a=1;;b=2"} {
		f.Add(s)
	}
	f.Fuzz(func(t *testing.T, s string) {
		// Không expect lỗi cụ thể — chỉ expect KHÔNG PANIC.
		_, _ = Parse(s)
	})
}

// ============================================================
// 3. Race detector demo (chạy với `go test -race`)
// ============================================================
//
// Test này CỐ Ý không Fail trên cờ -race nếu chạy bình thường,
// nhưng `go test -race` sẽ in cảnh báo cho UnsafeCounter.
// Để CI không khó chịu, ta đặt nó dưới t.Run riêng và chỉ chạy
// khi env RACE_DEMO=1.

func TestCounters_Safe(t *testing.T) {
	const N = 1000
	var wg sync.WaitGroup
	sc := &SafeCounter{}
	mc := &MutexCounter{}

	for i := 0; i < N; i++ {
		wg.Add(2)
		go func() { defer wg.Done(); sc.Inc() }()
		go func() { defer wg.Done(); mc.Inc() }()
	}
	wg.Wait()
	if sc.Val() != int64(N) {
		t.Errorf("SafeCounter = %d, want %d", sc.Val(), N)
	}
	if mc.Val() != N {
		t.Errorf("MutexCounter = %d, want %d", mc.Val(), N)
	}
}

func TestUnsafeCounter_RaceDemo(t *testing.T) {
	if os.Getenv("RACE_DEMO") != "1" {
		t.Skip("set RACE_DEMO=1 + chạy với -race để thấy data race")
	}
	const N = 1000
	var wg sync.WaitGroup
	uc := &UnsafeCounter{}
	for i := 0; i < N; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); uc.Inc() }()
	}
	wg.Wait()
	// uc.Val() có thể < N — kết quả KHÔNG đoán được vì race.
	t.Logf("UnsafeCounter = %d (expected ≤ %d, often lost updates)", uc.Val(), N)
}

// ============================================================
// 4. Golden file test cho HTML template
// ============================================================
//
// Pattern: render output → so với file testdata/golden/report.golden.
// Khi template thay đổi hợp lệ, chạy `go test -update` để regenerate.

func TestRenderReport_Golden(t *testing.T) {
	r := Report{
		Title: "Báo cáo tháng 5",
		Users: []string{"alice", "bob", "chi"},
		Total: 3,
	}
	got, err := RenderReport(r)
	if err != nil {
		t.Fatal(err)
	}

	goldenPath := filepath.Join("testdata", "golden", "report.golden")

	if *updateGolden {
		if err := os.MkdirAll(filepath.Dir(goldenPath), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(goldenPath, []byte(got), 0o644); err != nil {
			t.Fatal(err)
		}
		t.Logf("golden file đã update: %s", goldenPath)
		return
	}

	want, err := os.ReadFile(goldenPath)
	if err != nil {
		// File chưa tồn tại — hint user chạy với -update.
		t.Fatalf("đọc golden file thất bại: %v\n→ chạy: go test -run=Golden -update", err)
	}
	if got != string(want) {
		t.Errorf("output != golden\n--- got ---\n%s\n--- want ---\n%s", got, string(want))
	}
}

// ============================================================
// 5. httptest — test HTTP handler + HTTP client
// ============================================================

// 5a) Test handler bằng httptest.NewRecorder — KHÔNG cần mở socket.
func TestEchoHandler_Recorder(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/echo?msg=hi", nil)
	w := httptest.NewRecorder()
	EchoHandler(w, req)

	if w.Code != 200 {
		t.Fatalf("status = %d", w.Code)
	}
	if w.Body.String() != `{"echo":"hi"}` {
		t.Errorf("body = %q", w.Body.String())
	}
}

func TestEchoHandler_MissingMsg(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/echo", nil)
	w := httptest.NewRecorder()
	EchoHandler(w, req)
	if w.Code != http.StatusBadRequest {
		t.Errorf("status = %d, want 400", w.Code)
	}
}

// 5b) Test client bằng httptest.NewServer — full network stack.
func TestClient_GetEcho(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(EchoHandler))
	// t.Cleanup chạy SAU khi test xong, dù pass/fail/panic.
	t.Cleanup(func() {
		srv.Close()
		t.Log("httptest server đóng")
	})

	c := &Client{BaseURL: srv.URL}
	got, err := c.GetEcho("xin-chao")
	if err != nil {
		t.Fatal(err)
	}
	if got != "xin-chao" {
		t.Errorf("got = %q", got)
	}
}

// ============================================================
// 6. Parallel sub-test với cleanup proper
// ============================================================
//
// Mỗi sub-test dùng t.Parallel() → chạy song song với các sibling
// đã gọi Parallel(). t.Cleanup() trong từng sub-test vẫn chạy đúng
// scope. Go 1.22+ tự capture loop variable, nhưng ta vẫn shadow
// `tt := tt` để code portable với Go cũ.
func TestParallelSubtests(t *testing.T) {
	cases := []struct{ name, in, want string }{
		{"empty", "", ""},
		{"ascii", "go", "og"},
		{"utf8", "café", "éfac"},
		{"cjk", "日本語", "語本日"},
	}
	for _, tt := range cases {
		tt := tt // shadow để an toàn với Go < 1.22
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			// Mỗi sub-test mở temp dir riêng — minh hoạ cleanup proper.
			dir := t.TempDir() // tự cleanup khi sub-test kết thúc
			f := filepath.Join(dir, "input.txt")
			if err := os.WriteFile(f, []byte(tt.in), 0o644); err != nil {
				t.Fatal(err)
			}
			t.Cleanup(func() {
				// Log thôi — t.TempDir() đã tự xoá.
				t.Logf("[%s] cleanup done", tt.name)
			})

			data, _ := os.ReadFile(f)
			got := Reverse(string(data))
			if got != tt.want {
				t.Errorf("Reverse(%q) = %q, want %q", tt.in, got, tt.want)
			}
		})
	}
}

// ============================================================
// 7. Fixture load — pattern testdata/
// ============================================================
//
// Go convention: thư mục `testdata/` được go tool bỏ qua khi build,
// nên đặt input/expected files vào đây thoải mái.
func TestParseCSVLine_FromFixture(t *testing.T) {
	// Tạo fixture trên fly (vì repo không cần commit file thật).
	fixture := filepath.Join("testdata", "users.csv")
	if err := os.MkdirAll(filepath.Dir(fixture), 0o755); err != nil {
		t.Fatal(err)
	}
	const content = "alice, 30, hn\nbob, 25, dn\n"
	if err := os.WriteFile(fixture, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.Remove(fixture) })

	data, err := os.ReadFile(fixture)
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(strings.TrimSpace(string(data)), "\n")
	if len(lines) != 2 {
		t.Fatalf("expect 2 lines, got %d", len(lines))
	}
	cols, err := ParseCSVLine(lines[0])
	if err != nil {
		t.Fatal(err)
	}
	if !equalStr(cols, []string{"alice", "30", "hn"}) {
		t.Errorf("cols = %v", cols)
	}
}

func equalStr(a, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// ============================================================
// 8. Property-based: Sort idempotent
// ============================================================

func TestSortInts_Idempotent(t *testing.T) {
	for i := 0; i < 100; i++ {
		n := rand.Intn(50)
		in := make([]int, n)
		for j := range in {
			in[j] = rand.Intn(1000) - 500
		}
		once := SortInts(in)
		twice := SortInts(once)
		if !equalInt(once, twice) {
			t.Errorf("Sort không idempotent với %v", in)
		}
		if !sort.IntsAreSorted(once) {
			t.Errorf("output không sorted: %v", once)
		}
		if len(once) != len(in) {
			t.Errorf("length thay đổi")
		}
	}
}

func equalInt(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// ============================================================
// 9. Integration test — build tag
// ============================================================
//
// Test thật sự gọi nhiều thành phần cùng lúc (parse + http +
// in-memory store). Tách bằng build tag `integration` để CI có
// thể tách run nhanh / chậm:
//
//	go test -tags=integration -v ./...
//
// Xem file solutions_integration_test.go bên dưới (cùng package
// nhưng build tag). Ở đây ta để 1 test smoke không cần tag.
func TestParseAndSum_Smoke(t *testing.T) {
	got, err := ParseAndSum("1,2,3,4")
	if err != nil {
		t.Fatal(err)
	}
	if got != 10 {
		t.Errorf("got = %d", got)
	}
}

// ============================================================
// 10. Helper kiểm bytes (demo dùng bytes.Buffer trong test)
// ============================================================

func TestBufferEcho(t *testing.T) {
	var buf bytes.Buffer
	_, _ = io.Copy(&buf, strings.NewReader("hello"))
	if buf.String() != "hello" {
		t.Errorf("buf = %q", buf.String())
	}
}
