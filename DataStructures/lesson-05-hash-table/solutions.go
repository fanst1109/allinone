// Lesson 05 — Hash Table: lời giải bằng Go.
// Cài HashMap chaining tự viết để minh họa (không dùng map built-in).
package main

import (
	"fmt"
	"strings"
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

func main() {
	fmt.Println("=== Bài 1: HashMap chaining ===")
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
