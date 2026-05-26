// Package solutions — Lesson 26 (Testing).
//
// File này chứa code SUT (system under test) — các hàm sẽ được test ở
// solutions_test.go. Chạy: `go test -v` trong thư mục này.
package solutions

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"
	"time"
)

// ============================================================
// BT1 — Reverse string (multi-byte safe)
// ============================================================

// Reverse đảo ngược chuỗi s, an toàn với UTF-8 multi-byte.
//
// Cách làm: convert sang []rune trước khi đảo. Mỗi rune là 1 code point Unicode
// (1-4 byte UTF-8). Nếu đảo []byte trực tiếp, các byte của ký tự multi-byte
// sẽ bị tách → chuỗi vô nghĩa.
func Reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

// ============================================================
// BT2 — Divide với error sentinel
// ============================================================

// ErrDivByZero — sentinel error trả về khi chia cho 0.
// Test dùng errors.Is(err, ErrDivByZero) để so sánh.
var ErrDivByZero = errors.New("division by zero")

// Divide chia a cho b, trả về phần nguyên (Go integer division truncate về 0).
// Nếu b == 0 trả về ErrDivByZero.
func Divide(a, b int) (int, error) {
	if b == 0 {
		return 0, ErrDivByZero
	}
	return a / b, nil
}

// ============================================================
// BT3 — Concat: plus vs strings.Builder
// ============================================================

// ConcatPlus concat n lần "a" bằng toán tử +.
// Mỗi lần += tạo string mới (string immutable) → O(n^2) byte copy, O(n) alloc.
// Đây là implementation "tệ" để so sánh.
func ConcatPlus(n int) string {
	s := ""
	for i := 0; i < n; i++ {
		s += "a"
	}
	return s
}

// ConcatBuilder concat n lần "a" bằng strings.Builder.
// Builder dùng []byte mutable bên trong, grow theo nhu cầu. b.Grow(n) pre-alloc
// → đa số trường hợp 1 alloc duy nhất, O(n) byte copy tổng cộng.
func ConcatBuilder(n int) string {
	var b strings.Builder
	b.Grow(n)
	for i := 0; i < n; i++ {
		b.WriteByte('a')
	}
	return b.String()
}

// ============================================================
// BT4 — Add (cho Example function)
// ============================================================

// Add trả về tổng 2 số nguyên.
//
// Ví dụ:
//
//	Add(2, 3) // 5
//	Add(-1, 1) // 0
func Add(a, b int) int { return a + b }

// ============================================================
// BT5 — SaveJSON: ghi file JSON
// ============================================================

// SaveJSON marshal v thành JSON indent và ghi vào path. Dùng trong BT5
// để minh hoạ test với t.TempDir().
func SaveJSON(path string, v any) error {
	data, err := json.MarshalIndent(v, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal: %w", err)
	}
	return os.WriteFile(path, data, 0644)
}

// Config — struct mẫu để test SaveJSON.
type Config struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

// ============================================================
// BT6 — Cache với clock injection (mock-friendly)
// ============================================================

// Clock — interface cho phép inject thời gian giả trong test.
// Production code dùng realClock; test dùng fakeClock có thể advance manual.
type Clock interface {
	Now() time.Time
}

// realClock — implementation thật, gọi time.Now().
type realClock struct{}

func (realClock) Now() time.Time { return time.Now() }

type cacheItem struct {
	val     string
	expires time.Time
}

// Cache — key-value store với TTL.
type Cache struct {
	data  map[string]cacheItem
	clock Clock
}

// NewCache tạo Cache mới với realClock (production).
func NewCache() *Cache {
	return &Cache{
		data:  map[string]cacheItem{},
		clock: realClock{},
	}
}

// NewCacheWithClock cho test inject clock giả.
func NewCacheWithClock(c Clock) *Cache {
	return &Cache{
		data:  map[string]cacheItem{},
		clock: c,
	}
}

// Set lưu key=val với time-to-live ttl tính từ thời điểm gọi.
func (c *Cache) Set(k, v string, ttl time.Duration) {
	c.data[k] = cacheItem{val: v, expires: c.clock.Now().Add(ttl)}
}

// Get trả về (val, true) nếu key tồn tại và chưa expire.
// Ngược lại trả về ("", false).
func (c *Cache) Get(k string) (string, bool) {
	it, ok := c.data[k]
	if !ok {
		return "", false
	}
	if c.clock.Now().After(it.expires) {
		return "", false
	}
	return it.val, true
}
