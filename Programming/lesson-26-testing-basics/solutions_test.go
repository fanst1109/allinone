// Package solutions — file test cho Lesson 26.
//
// File này minh hoạ:
//   - Table-driven test với sub-test (t.Run).
//   - Test error case bằng errors.Is.
//   - Test có temp dir (t.TempDir).
//   - Mock clock thông qua interface.
//   - Benchmark function (so sánh ConcatPlus vs ConcatBuilder).
//   - Example function (vừa doc vừa test).
//
// Chạy:
//
//	go test -v
//	go test -bench=. -benchmem
//	go test -cover
package solutions

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// ============================================================
// Test BT1 — Reverse (table-driven + sub-test)
// ============================================================

// TestReverse — table-driven cho hàm Reverse.
//
// Bao gồm các nhóm case: empty, ASCII, palindrome, multi-byte UTF-8,
// emoji (rune ngoài BMP). Mục tiêu: chứng minh chuyển []rune trước khi đảo
// là cần thiết với multi-byte.
func TestReverse(t *testing.T) {
	cases := []struct {
		name string
		in   string
		want string
	}{
		{"empty", "", ""},
		{"single ASCII", "a", "a"},
		{"ASCII basic", "hello", "olleh"},
		{"palindrome", "level", "level"},
		{"unicode tiếng Việt", "Xin chào", "oàhc niX"},
		{"multi-byte cjk", "日本語", "語本日"},
		{"emoji", "Go🚀!", "!🚀oG"},
	}

	for _, tc := range cases {
		tc := tc // capture loop variable — tránh race khi t.Parallel
		t.Run(tc.name, func(t *testing.T) {
			got := Reverse(tc.in)
			if got != tc.want {
				t.Errorf("Reverse(%q) = %q; muốn %q", tc.in, got, tc.want)
			}
		})
	}
}

// ============================================================
// Test BT2 — Divide (happy path + error path)
// ============================================================

// TestDivide_Happy — table-driven cho các trường hợp chia hợp lệ.
func TestDivide_Happy(t *testing.T) {
	cases := []struct {
		name    string
		a, b    int
		want    int
	}{
		{"chia hết", 10, 2, 5},
		{"chia có dư (truncate về 0)", 7, 2, 3},
		{"số âm chia dương", -10, 3, -3}, // Go truncate towards zero: -10/3 = -3
		{"hai số âm", -10, -2, 5},
		{"tử = 0", 0, 5, 0},
		{"chia cho 1", 42, 1, 42},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			got, err := Divide(tc.a, tc.b)
			if err != nil {
				t.Fatalf("Divide(%d, %d) lỗi không mong đợi: %v", tc.a, tc.b, err)
			}
			if got != tc.want {
				t.Errorf("Divide(%d, %d) = %d; muốn %d", tc.a, tc.b, got, tc.want)
			}
		})
	}
}

// TestDivide_Error — kiểm tra trường hợp lỗi chia cho 0.
//
// Dùng errors.Is để so sánh sentinel error — đây là cách chuẩn idiomatic
// thay vì so sánh chuỗi message (dễ vỡ khi đổi message).
func TestDivide_Error(t *testing.T) {
	got, err := Divide(10, 0)
	if err == nil {
		t.Fatal("Divide(10, 0) phải trả về error, nhưng nhận nil")
	}
	if !errors.Is(err, ErrDivByZero) {
		t.Errorf("err = %v; muốn errors.Is(err, ErrDivByZero) = true", err)
	}
	if got != 0 {
		t.Errorf("khi error, giá trị trả về phải là 0; got %d", got)
	}
}

// ============================================================
// Test BT3 — ConcatPlus vs ConcatBuilder (correctness)
// ============================================================

// TestConcat — cả 2 implementation phải cho cùng kết quả.
func TestConcat(t *testing.T) {
	cases := []struct {
		name string
		n    int
		want string
	}{
		{"n=0 trả về empty", 0, ""},
		{"n=1", 1, "a"},
		{"n=5", 5, "aaaaa"},
		{"n=10", 10, "aaaaaaaaaa"},
	}

	for _, tc := range cases {
		tc := tc
		t.Run("Plus_"+tc.name, func(t *testing.T) {
			if got := ConcatPlus(tc.n); got != tc.want {
				t.Errorf("ConcatPlus(%d) = %q; muốn %q", tc.n, got, tc.want)
			}
		})
		t.Run("Builder_"+tc.name, func(t *testing.T) {
			if got := ConcatBuilder(tc.n); got != tc.want {
				t.Errorf("ConcatBuilder(%d) = %q; muốn %q", tc.n, got, tc.want)
			}
		})
	}
}

// ============================================================
// Test BT4 — Add (table-driven + Example function ở dưới)
// ============================================================

// TestAdd — table-driven cơ bản.
func TestAdd(t *testing.T) {
	cases := []struct {
		name    string
		a, b    int
		want    int
	}{
		{"hai số dương", 2, 3, 5},
		{"có số âm", -1, 1, 0},
		{"cả hai âm", -2, -3, -5},
		{"có zero", 0, 7, 7},
		{"số lớn", 1_000_000, 2_000_000, 3_000_000},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			if got := Add(tc.a, tc.b); got != tc.want {
				t.Errorf("Add(%d, %d) = %d; muốn %d", tc.a, tc.b, got, tc.want)
			}
		})
	}
}

// ============================================================
// Test BT5 — SaveJSON (dùng t.TempDir)
// ============================================================

// TestSaveJSON_OK — ghi xong đọc lại, JSON phải parse được và khớp dữ liệu.
//
// t.TempDir() tự tạo thư mục tạm và xoá khi test kết thúc — không cần
// defer os.RemoveAll.
func TestSaveJSON_OK(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")

	cfg := Config{Name: "Alice", Age: 30}
	if err := SaveJSON(path, cfg); err != nil {
		t.Fatalf("SaveJSON lỗi: %v", err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("đọc lại file lỗi: %v", err)
	}

	var got Config
	if err := json.Unmarshal(data, &got); err != nil {
		t.Fatalf("unmarshal lỗi: %v", err)
	}
	if got != cfg {
		t.Errorf("đọc về = %+v; muốn %+v", got, cfg)
	}
}

// TestSaveJSON_BadPath — ghi vào path không thể tạo → phải trả error.
func TestSaveJSON_BadPath(t *testing.T) {
	// Đường dẫn có thư mục cha không tồn tại → os.WriteFile fail.
	badPath := filepath.Join(t.TempDir(), "khong-ton-tai", "file.json")
	err := SaveJSON(badPath, Config{Name: "x", Age: 1})
	if err == nil {
		t.Fatal("muốn error khi path không hợp lệ, nhận nil")
	}
}

// TestSaveJSON_MarshalError — marshal type không support → error (channel).
func TestSaveJSON_MarshalError(t *testing.T) {
	path := filepath.Join(t.TempDir(), "x.json")
	// chan không marshal được → wrap error "marshal: ..."
	err := SaveJSON(path, make(chan int))
	if err == nil {
		t.Fatal("muốn error khi value không marshal được, nhận nil")
	}
}

// ============================================================
// Test BT6 — Cache với fakeClock (mock injection)
// ============================================================

// fakeClock — mock cho test, time có thể advance manual.
//
// Không gọi time.Now() thật → test không flaky, không phải sleep.
type fakeClock struct{ t time.Time }

func (f *fakeClock) Now() time.Time             { return f.t }
func (f *fakeClock) Advance(d time.Duration)    { f.t = f.t.Add(d) }

// TestCache — table-driven cho Cache với clock giả.
func TestCache(t *testing.T) {
	t.Run("Set rồi Get trong TTL → hit", func(t *testing.T) {
		fc := &fakeClock{t: time.Unix(0, 0)}
		c := NewCacheWithClock(fc)
		c.Set("k", "v", 10*time.Second)

		got, ok := c.Get("k")
		if !ok {
			t.Fatal("muốn hit, nhận miss")
		}
		if got != "v" {
			t.Errorf("got = %q; muốn %q", got, "v")
		}
	})

	t.Run("Get key chưa set → miss", func(t *testing.T) {
		c := NewCacheWithClock(&fakeClock{t: time.Unix(0, 0)})
		if _, ok := c.Get("unknown"); ok {
			t.Error("muốn miss với key chưa set")
		}
	})

	t.Run("Get sau khi TTL hết → miss", func(t *testing.T) {
		fc := &fakeClock{t: time.Unix(0, 0)}
		c := NewCacheWithClock(fc)
		c.Set("k", "v", 5*time.Second)

		fc.Advance(6 * time.Second) // vượt TTL

		if _, ok := c.Get("k"); ok {
			t.Error("muốn miss sau khi TTL hết")
		}
	})

	t.Run("Get tại đúng thời điểm expire → vẫn hit (After là strict)", func(t *testing.T) {
		fc := &fakeClock{t: time.Unix(0, 0)}
		c := NewCacheWithClock(fc)
		c.Set("k", "v", 5*time.Second)

		fc.Advance(5 * time.Second) // bằng expires, After trả false

		if _, ok := c.Get("k"); !ok {
			t.Error("tại đúng thời điểm expires, After là strict → vẫn hit")
		}
	})
}

// TestNewCache — smoke test cho constructor production (realClock).
func TestNewCache(t *testing.T) {
	c := NewCache()
	c.Set("hello", "world", 1*time.Minute)
	got, ok := c.Get("hello")
	if !ok || got != "world" {
		t.Errorf("NewCache cơ bản fail: got=%q ok=%v", got, ok)
	}
}

// ============================================================
// Benchmark — so sánh ConcatPlus vs ConcatBuilder
// ============================================================

// BenchmarkConcatPlus — đo ConcatPlus(100). Tốc độ O(n^2) byte copy.
// Chạy: go test -bench=BenchmarkConcatPlus -benchmem
func BenchmarkConcatPlus(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		_ = ConcatPlus(100)
	}
}

// BenchmarkConcatBuilder — đo ConcatBuilder(100). Tốc độ O(n) với 1 alloc nhờ Grow.
func BenchmarkConcatBuilder(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		_ = ConcatBuilder(100)
	}
}

// BenchmarkAdd — benchmark function cực ngắn (compiler có thể inline → 0 ns).
func BenchmarkAdd(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = Add(i, i+1)
	}
}

// ============================================================
// Example function — vừa doc vừa test
// ============================================================

// ExampleAdd — go test verify output dòng `// Output:` khớp với stdout.
// Hiển thị trong godoc như phần "Example".
func ExampleAdd() {
	fmt.Println(Add(2, 3))
	fmt.Println(Add(-1, 1))
	// Output:
	// 5
	// 0
}

// ExampleReverse — minh hoạ multi-byte safe.
func ExampleReverse() {
	fmt.Println(Reverse("hello"))
	fmt.Println(Reverse("日本語"))
	// Output:
	// olleh
	// 語本日
}

// ExampleDivide — minh hoạ cả happy path lẫn error.
func ExampleDivide() {
	q, err := Divide(10, 3)
	fmt.Println(q, err)

	_, err = Divide(1, 0)
	fmt.Println(err)
	// Output:
	// 3 <nil>
	// division by zero
}
