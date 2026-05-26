// Package main — Lesson 13: Map (hash table) trong Go.
//
// File này demo toàn bộ khái niệm trong README:
//   - Khởi tạo: literal, make, hint capacity, nil map panic.
//   - Operations: set, get, comma-ok, delete, len.
//   - Iteration random (chạy 3 lần để minh hoạ).
//   - Key/value: counter pattern, group by, Set (struct{}).
//   - Map of struct gotcha + fix.
//   - Bài tập 1–6 đều có hàm + demo trong main.
//
// Chạy: `go run solutions.go`. Không có dependency ngoài stdlib.
package main

import (
	"fmt"
	"sort"
	"strings"
)

// ============================================================
// 1. KHỞI TẠO — 3 cách + nil map
// ============================================================

func demoInit() {
	fmt.Println("=== 1. Khởi tạo map ===")

	// Literal
	ages := map[string]int{"alice": 30, "bob": 25}
	fmt.Printf("  literal: %v\n", ages)

	// make
	prices := make(map[string]int)
	prices["apple"] = 20000
	prices["banana"] = 8000
	fmt.Printf("  make:    %v\n", prices)

	// make với hint capacity (tip: pre-allocate khi biết số phần tử)
	scores := make(map[string]int, 100) // dự kiến ~100 entry
	scores["math"] = 9
	fmt.Printf("  make+hint: %v (cap hint=100)\n", scores)

	// Nil map — đọc OK, ghi PANIC
	var nilMap map[string]int
	v := nilMap["nothing"] // OK — zero value
	fmt.Printf("  nil map read: %d (zero value)\n", v)
	fmt.Printf("  nil map len:  %d (vẫn an toàn)\n", len(nilMap))

	// Nếu uncomment dòng dưới sẽ panic:
	// nilMap["x"] = 1 // panic: assignment to entry in nil map
	fmt.Println("  (ghi vào nil map sẽ panic — đã comment để demo chạy tiếp)")
}

// ============================================================
// 2. OPERATIONS: set / get / comma-ok / delete / len
// ============================================================

func demoOps() {
	fmt.Println("\n=== 2. Operations ===")

	m := make(map[string]int)
	m["alice"] = 30 // set
	m["bob"] = 25

	// Get
	fmt.Printf("  m[\"alice\"] = %d\n", m["alice"])
	fmt.Printf("  m[\"nobody\"] = %d (zero value)\n", m["nobody"])

	// Comma-ok — idiom check tồn tại
	if v, ok := m["alice"]; ok {
		fmt.Printf("  comma-ok: alice tồn tại với value=%d\n", v)
	}
	if _, ok := m["nobody"]; !ok {
		fmt.Println("  comma-ok: nobody KHÔNG tồn tại")
	}

	// Phân biệt "value 0" vs "không có key" — chỉ comma-ok làm được
	m["zero"] = 0
	fmt.Printf("  m[\"zero\"] = %d, nhưng comma-ok cho ok=%v\n",
		m["zero"], func() bool { _, ok := m["zero"]; return ok }())

	// Delete
	delete(m, "alice")
	delete(m, "ghost") // OK — không panic dù key không tồn tại
	fmt.Printf("  sau delete: %v\n", m)

	// Len
	fmt.Printf("  len(m) = %d\n", len(m))
}

// ============================================================
// 3. ITERATION — random thứ tự (Go cố ý)
// ============================================================

func demoIterationRandom() {
	fmt.Println("\n=== 3. Iteration random (chạy 5 lần để thấy thứ tự khác nhau) ===")

	m := map[string]int{
		"a": 1, "b": 2, "c": 3, "d": 4, "e": 5,
	}

	for run := 1; run <= 5; run++ {
		var keys []string
		for k := range m {
			keys = append(keys, k)
		}
		fmt.Printf("  Lần %d: %s\n", run, strings.Join(keys, " → "))
	}

	// Khi cần thứ tự ổn định → extract keys + sort
	fmt.Println("  Khi cần thứ tự ổn định:")
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		fmt.Printf("    %s → %d\n", k, m[k])
	}
}

// ============================================================
// 4. SET bằng map[T]struct{} — BT4
// ============================================================

// StringSet là wrapper trên map[string]struct{}.
// Empty struct chiếm 0 byte → tiết kiệm bộ nhớ khi set lớn.
type StringSet map[string]struct{}

func NewStringSet() StringSet                    { return make(StringSet) }
func (s StringSet) Add(x string)                 { s[x] = struct{}{} }
func (s StringSet) Has(x string) bool            { _, ok := s[x]; return ok }
func (s StringSet) Remove(x string)              { delete(s, x) }
func (s StringSet) Len() int                     { return len(s) }

func demoSet() {
	fmt.Println("\n=== 4. Set bằng map[T]struct{} ===")

	// Use case thật: dedupe email list trước khi gửi marketing
	unsub := NewStringSet()
	unsub.Add("user1@x.com")
	unsub.Add("user2@x.com")

	all := []string{"user1@x.com", "user3@x.com", "user2@x.com", "user4@x.com"}
	for _, e := range all {
		if unsub.Has(e) {
			fmt.Printf("  bỏ qua %s (đã unsubscribe)\n", e)
		} else {
			fmt.Printf("  gửi cho %s\n", e)
		}
	}
	fmt.Printf("  Set size = %d\n", unsub.Len())
}

// ============================================================
// 5. COUNTER pattern — BT1
// ============================================================

func wordCount(words []string) map[string]int {
	count := make(map[string]int, len(words))
	for _, w := range words {
		count[w]++ // m[k]++ an toàn vì zero value của int = 0
	}
	return count
}

func demoCounter() {
	fmt.Println("\n=== 5. Counter pattern (BT1) ===")

	words := []string{"go", "is", "fun", "go", "is", "go"}
	c := wordCount(words)

	// In ra theo thứ tự sort cho output ổn định
	keys := make([]string, 0, len(c))
	for k := range c {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		fmt.Printf("  %s → %d\n", k, c[k])
	}
}

// ============================================================
// 6. GROUP BY pattern — BT2
// ============================================================

type User struct {
	Name       string
	Department string
}

func groupByDept(users []User) map[string][]User {
	groups := make(map[string][]User)
	for _, u := range users {
		// append(nil_slice, x) hợp lệ — không cần check key trước
		groups[u.Department] = append(groups[u.Department], u)
	}
	return groups
}

func demoGroupBy() {
	fmt.Println("\n=== 6. Group by Department (BT2) ===")

	users := []User{
		{"Alice", "Engineering"},
		{"Bob", "Marketing"},
		{"Carol", "Engineering"},
		{"Dave", "Sales"},
		{"Eve", "Marketing"},
	}
	groups := groupByDept(users)

	// In sorted
	depts := make([]string, 0, len(groups))
	for d := range groups {
		depts = append(depts, d)
	}
	sort.Strings(depts)
	for _, d := range depts {
		names := make([]string, 0, len(groups[d]))
		for _, u := range groups[d] {
			names = append(names, u.Name)
		}
		fmt.Printf("  %s: %s\n", d, strings.Join(names, ", "))
	}
}

// ============================================================
// 7. ONLY ONCE — BT3
// ============================================================

func onlyOnce(nums []int) []int {
	count := make(map[int]int, len(nums))
	for _, n := range nums {
		count[n]++
	}
	var result []int
	for n, c := range count {
		if c == 1 {
			result = append(result, n)
		}
	}
	sort.Ints(result) // sort cho output ổn định
	return result
}

func demoOnlyOnce() {
	fmt.Println("\n=== 7. Phần tử xuất hiện đúng 1 lần (BT3) ===")
	nums := []int{1, 2, 3, 2, 1, 4, 3}
	result := onlyOnce(nums)
	fmt.Printf("  input:  %v\n", nums)
	fmt.Printf("  output: %v\n", result)
}

// ============================================================
// 8. MAP OF STRUCT — gotcha & fix
// ============================================================

type Point struct{ X, Y int }

func demoStructGotcha() {
	fmt.Println("\n=== 8. Map of struct — gotcha & fix ===")

	m := map[string]Point{"origin": {0, 0}}

	// SAI: m["origin"].X = 5 — compile error
	// (đã comment lại để file compile)
	fmt.Printf("  trước: m[\"origin\"] = %+v\n", m["origin"])

	// FIX 1: lấy ra, modify, gán lại
	p := m["origin"]
	p.X = 5
	m["origin"] = p
	fmt.Printf("  sau fix1: m[\"origin\"] = %+v\n", m["origin"])

	// FIX 2: map of pointer
	m2 := map[string]*Point{"origin": {0, 0}}
	m2["origin"].X = 7
	m2["origin"].Y = 9
	fmt.Printf("  fix2 (map of pointer): m2[\"origin\"] = %+v\n", *m2["origin"])
}

// ============================================================
// 9. SIMPLE CACHE — BT6
// ============================================================

type SimpleCache struct {
	cap  int
	data map[string]string
}

func NewSimpleCache(capacity int) *SimpleCache {
	return &SimpleCache{
		cap:  capacity,
		data: make(map[string]string, capacity),
	}
}

func (c *SimpleCache) Get(key string) (string, bool) {
	v, ok := c.data[key]
	return v, ok
}

func (c *SimpleCache) Set(key, value string) {
	if _, exists := c.data[key]; !exists && len(c.data) >= c.cap {
		// Vượt capacity → xoá 1 key bất kỳ (random eviction)
		// Không phải LRU thật vì map không lưu thứ tự truy cập.
		// LRU đúng cần map + doubly linked list.
		for k := range c.data {
			delete(c.data, k)
			break
		}
	}
	c.data[key] = value
}

func (c *SimpleCache) Len() int { return len(c.data) }

func demoCache() {
	fmt.Println("\n=== 9. SimpleCache (BT6) — random eviction ===")

	c := NewSimpleCache(3)
	c.Set("a", "1")
	c.Set("b", "2")
	c.Set("c", "3")
	fmt.Printf("  sau 3 set: len=%d\n", c.Len())

	c.Set("d", "4") // vượt cap → xoá 1 key
	fmt.Printf("  sau set thứ 4: len=%d (giữ ≤ cap=3)\n", c.Len())

	if v, ok := c.Get("d"); ok {
		fmt.Printf("  Get(\"d\") = %s\n", v)
	}
}

// ============================================================
// MAIN
// ============================================================

func main() {
	demoInit()
	demoOps()
	demoIterationRandom()
	demoSet()
	demoCounter()
	demoGroupBy()
	demoOnlyOnce()
	demoStructGotcha()
	demoCache()

	fmt.Println("\n=== Hết. ===")
}
