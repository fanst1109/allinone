// Lesson 05 — Hash Table: lời giải bằng Go.
// Cài HashMap chaining tự viết để minh họa (không dùng map built-in).
package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// --- Bài 1: HashMap với chaining ---

type entry struct {
	k string
	v int
}

type HashMap struct {
	buckets [][]entry
	cap     int
	size    int
}

func NewHashMap() *HashMap {
	c := 8
	return &HashMap{buckets: make([][]entry, c), cap: c}
}

func (m *HashMap) hash(k string) int {
	// FNV-1a 32-bit, đơn giản
	h := uint32(2166136261)
	for _, c := range k {
		h ^= uint32(c)
		h *= 16777619
	}
	return int(h % uint32(m.cap))
}

func (m *HashMap) Put(k string, v int) {
	if float64(m.size+1)/float64(m.cap) > 0.75 {
		m.resize()
	}
	i := m.hash(k)
	for j := range m.buckets[i] {
		if m.buckets[i][j].k == k {
			m.buckets[i][j].v = v
			return
		}
	}
	m.buckets[i] = append(m.buckets[i], entry{k, v})
	m.size++
}

func (m *HashMap) Get(k string) (int, bool) {
	for _, e := range m.buckets[m.hash(k)] {
		if e.k == k {
			return e.v, true
		}
	}
	return 0, false
}

func (m *HashMap) Remove(k string) bool {
	i := m.hash(k)
	for j, e := range m.buckets[i] {
		if e.k == k {
			m.buckets[i] = append(m.buckets[i][:j], m.buckets[i][j+1:]...)
			m.size--
			return true
		}
	}
	return false
}

func (m *HashMap) resize() {
	old := m.buckets
	m.cap *= 2
	m.buckets = make([][]entry, m.cap)
	m.size = 0
	for _, bk := range old {
		for _, e := range bk {
			m.Put(e.k, e.v)
		}
	}
}

// --- Bài 2: Đếm tần suất từ ---
func wordCount(text string) map[string]int {
	out := map[string]int{}
	for _, w := range strings.Fields(text) {
		out[strings.ToLower(w)]++
	}
	return out
}

// --- Bài 3: Two-sum O(n) ---
func twoSum(nums []int, k int) (int, int, bool) {
	seen := map[int]int{}
	for i, x := range nums {
		if j, ok := seen[k-x]; ok {
			return j, i, true
		}
		seen[x] = i
	}
	return 0, 0, false
}

// --- Bài toán mở đầu: 1 triệu username, kiểm tra tồn tại ---

// existsLinear: tìm tuần tự qua slice — O(n) mỗi truy vấn.
func existsLinear(users []string, u string) bool {
	for _, x := range users {
		if x == u {
			return true
		}
	}
	return false
}

// benchmark1MUsernames: so sánh linear scan vs map (hash set).
func benchmark1MUsernames() {
	const N = 1_000_000
	const Q = 10_000

	rng := rand.New(rand.NewSource(42))
	users := make([]string, N)
	for i := range users {
		users[i] = fmt.Sprintf("user_%d_%d", rng.Intn(1<<30), i)
	}

	// Build hash set
	t0 := time.Now()
	set := make(map[string]struct{}, N)
	for _, u := range users {
		set[u] = struct{}{}
	}
	buildTime := time.Since(t0)
	fmt.Printf("Build hash set với %d username: %v\n", N, buildTime)

	// Tạo Q truy vấn: nửa "có", nửa "không có"
	queries := make([]string, Q)
	for i := 0; i < Q/2; i++ {
		queries[i] = users[rng.Intn(N)]
	}
	for i := Q / 2; i < Q; i++ {
		queries[i] = fmt.Sprintf("missing_%d", i)
	}

	// Đo linear scan trên CHỈ 100 truy vấn (vì quá chậm cho 10000)
	const linearQ = 100
	t0 = time.Now()
	hits := 0
	for _, q := range queries[:linearQ] {
		if existsLinear(users, q) {
			hits++
		}
	}
	linearTime := time.Since(t0)
	fmt.Printf("Linear scan %d truy vấn: %v (%.2f ms/truy vấn, %d hit)\n",
		linearQ, linearTime, float64(linearTime.Microseconds())/float64(linearQ)/1000, hits)

	// Đo hash set với toàn bộ Q truy vấn
	t0 = time.Now()
	hits = 0
	for _, q := range queries {
		if _, ok := set[q]; ok {
			hits++
		}
	}
	setTime := time.Since(t0)
	fmt.Printf("Hash set    %d truy vấn: %v (%.0f ns/truy vấn, %d hit)\n",
		Q, setTime, float64(setTime.Nanoseconds())/float64(Q), hits)

	// Tỷ lệ nhanh hơn
	perQueryLinear := linearTime.Nanoseconds() / int64(linearQ)
	perQuerySet := setTime.Nanoseconds() / int64(Q)
	if perQuerySet > 0 {
		fmt.Printf("Hash set nhanh hơn ~%dx mỗi truy vấn.\n", perQueryLinear/perQuerySet)
	}
}

// --- Walk-through: hash bằng tay với bảng 10 ô ---

// simpleHash: hàm hash đơn giản, dễ tính bằng tay.
func simpleHash(s string, m int) int {
	sum := 0
	for _, c := range s {
		sum += int(c)
	}
	return sum % m
}

func traceHashTable() {
	const M = 10
	slots := make([][]string, M)

	fmt.Println("Bảng có 10 ô. Hash = (tổng mã ASCII) mod 10.")
	fmt.Println()
	fmt.Println("--- Thêm username ---")
	for _, u := range []string{"alice", "bob", "eve", "carol", "dave"} {
		sum := 0
		for _, c := range u {
			sum += int(c)
		}
		i := sum % M
		slots[i] = append(slots[i], u)
		fmt.Printf("  hash(%q) = %d mod %d = %d  -> đặt vào slots[%d] (chain dài: %d)\n",
			u, sum, M, i, i, len(slots[i]))
	}

	fmt.Println("\n--- Trạng thái bảng ---")
	for i, ch := range slots {
		fmt.Printf("  slots[%d] = %v\n", i, ch)
	}

	fmt.Println("\n--- Truy vấn ---")
	for _, q := range []string{"alice", "eve", "frank", "carol"} {
		i := simpleHash(q, M)
		found := false
		cmps := 0
		for _, x := range slots[i] {
			cmps++
			if x == q {
				found = true
				break
			}
		}
		fmt.Printf("  Tìm %q: tính hash = %d (1 phép). Nhìn slots[%d] (%d phần tử). %d so sánh -> %v\n",
			q, i, i, len(slots[i]), cmps, found)
	}
	fmt.Println("\nChú ý: không truy vấn nào nhìn vào các ô khác. Đó là 'O(1)'.")
}

// --- Bẫy anagram của hash đơn giản + polynomial hash ---

// polyHash: h(s) = s[0]·31^(n-1) + ... + s[n-1] (mod m).
func polyHash(s string, m int) int {
	h := 0
	for _, c := range s {
		h = (h*31 + int(c)) % m
	}
	return h
}

func demoAnagram() {
	anagrams := []string{"alice", "elica", "celia", "lecia", "iacel"}

	fmt.Println("Hash đơn giản (tổng ASCII) mod 10:")
	for _, s := range anagrams {
		sum := 0
		for _, c := range s {
			sum += int(c)
		}
		fmt.Printf("  %-7s sum=%d -> mod 10 = %d\n", s, sum, sum%10)
	}
	fmt.Println("→ Tất cả vào cùng 1 ô, chain dài, mất ưu thế O(1).\n")

	fmt.Println("Polynomial hash mod 1_000_003:")
	for _, s := range anagrams {
		fmt.Printf("  %-7s -> %d\n", s, polyHash(s, 1_000_003))
	}
	fmt.Println("→ Mọi chuỗi vào ô khác nhau, không xung đột.")
}

func main() {
	fmt.Println("=== Walk-through: hash hoạt động thế nào ===")
	traceHashTable()

	fmt.Println("\n=== Bẫy anagram + polynomial hash ===")
	demoAnagram()

	fmt.Println("\n=== Bài toán mở đầu: 1 triệu username ===")
	benchmark1MUsernames()

	fmt.Println("\n=== Bài 1: HashMap chaining ===")
	m := NewHashMap()
	m.Put("alice", 100)
	m.Put("bob", 200)
	m.Put("carol", 300)
	for _, k := range []string{"alice", "bob", "carol", "dave"} {
		v, ok := m.Get(k)
		fmt.Printf("Get(%s) = %d, ok=%v\n", k, v, ok)
	}
	m.Remove("bob")
	v, ok := m.Get("bob")
	fmt.Printf("Sau remove bob: ok=%v, v=%d\n", ok, v)

	fmt.Println("\n=== Bài 2: word count ===")
	fmt.Println(wordCount("the quick brown fox jumps over the lazy dog the"))

	fmt.Println("\n=== Bài 3: two-sum ===")
	a, b, ok := twoSum([]int{2, 7, 11, 15}, 9)
	fmt.Printf("Cặp tổng 9: chỉ số %d và %d, ok=%v\n", a, b, ok)
}
