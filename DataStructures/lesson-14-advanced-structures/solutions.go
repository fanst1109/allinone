// Lesson 14 — Advanced: minh họa Bloom filter và Count-Min Sketch bằng Go.
package main

import (
	"fmt"
	"hash/fnv"
	"math"
	"math/rand"
)

// demoSaturation đo FP rate thực tế khi add n key vào Bloom m=64, k=3.
// So sánh với công thức (1 - e^(-kn/m))^k.
func demoSaturation() {
	const m, k = 64, 3
	fmt.Printf("%-6s %-12s %-15s %-15s\n", "n", "bits bật", "FP thực đo", "FP công thức")
	for _, n := range []int{5, 10, 20, 30, 50, 100} {
		bf := NewBloom(uint32(m), k)
		// Add n key ngẫu nhiên
		rng := rand.New(rand.NewSource(1))
		added := make(map[string]bool)
		for i := 0; i < n; i++ {
			s := fmt.Sprintf("k%d_%d", rng.Intn(1<<30), i)
			bf.Add(s)
			added[s] = true
		}
		// Đếm bit bật
		set := 0
		for _, b := range bf.bits {
			if b {
				set++
			}
		}
		// Thử 10000 key chưa add, đếm tỷ lệ "trả về true" (false positive)
		fp := 0
		const trials = 10000
		for i := 0; i < trials; i++ {
			s := fmt.Sprintf("miss_%d_%d", i, rng.Intn(1<<30))
			if added[s] {
				continue
			}
			if bf.Contains(s) {
				fp++
			}
		}
		fpReal := float64(fp) / trials
		fpFormula := math.Pow(1-math.Exp(-float64(k*n)/float64(m)), float64(k))
		fmt.Printf("%-6d %-12s %-15s %-15s\n",
			n,
			fmt.Sprintf("%d/%d (%.0f%%)", set, m, float64(set)*100/float64(m)),
			fmt.Sprintf("%.1f%%", fpReal*100),
			fmt.Sprintf("%.1f%%", fpFormula*100))
	}
}

// --- Bloom Filter ---
type Bloom struct {
	bits []bool
	m    uint32 // số bit
	k    int    // số hàm hash
}

func NewBloom(m uint32, k int) *Bloom { return &Bloom{bits: make([]bool, m), m: m, k: k} }

func (b *Bloom) hashes(s string) []uint32 {
	out := make([]uint32, b.k)
	h1 := fnv.New32a()
	h1.Write([]byte(s))
	a := h1.Sum32()
	h2 := fnv.New32()
	h2.Write([]byte(s))
	bb := h2.Sum32()
	// double hashing: h_i = (a + i*b) mod m
	for i := 0; i < b.k; i++ {
		out[i] = (a + uint32(i)*bb) % b.m
	}
	return out
}

func (b *Bloom) Add(s string) {
	for _, h := range b.hashes(s) {
		b.bits[h] = true
	}
}

// Contains: false → chắc chắn không có; true → có thể có (có thể sai dương)
func (b *Bloom) Contains(s string) bool {
	for _, h := range b.hashes(s) {
		if !b.bits[h] {
			return false
		}
	}
	return true
}

// --- Count-Min Sketch ---
type CMS struct {
	d, w  int
	table [][]int
	seeds []uint32
}

func NewCMS(d, w int) *CMS {
	t := make([][]int, d)
	for i := range t {
		t[i] = make([]int, w)
	}
	seeds := make([]uint32, d)
	for i := range seeds {
		seeds[i] = uint32(i*7919 + 1)
	}
	return &CMS{d: d, w: w, table: t, seeds: seeds}
}

func (c *CMS) hash(s string, seed uint32) int {
	h := fnv.New32a()
	h.Write([]byte(s))
	return int((h.Sum32() ^ seed) % uint32(c.w))
}

func (c *CMS) Inc(s string) {
	for i := 0; i < c.d; i++ {
		c.table[i][c.hash(s, c.seeds[i])]++
	}
}

func (c *CMS) Estimate(s string) int {
	min := -1
	for i := 0; i < c.d; i++ {
		v := c.table[i][c.hash(s, c.seeds[i])]
		if min == -1 || v < min {
			min = v
		}
	}
	return min
}

func main() {
	fmt.Println("=== Bloom Filter ===")
	bf := NewBloom(1024, 4)
	for _, w := range []string{"alice", "bob", "carol", "david"} {
		bf.Add(w)
	}
	for _, w := range []string{"alice", "bob", "eve", "frank", "grace"} {
		fmt.Printf("Contains(%s) = %v\n", w, bf.Contains(w))
	}

	fmt.Println("\n=== Bloom Saturation: m=64, k=3 (giống viz) ===")
	demoSaturation()

	fmt.Println("\n=== Count-Min Sketch (đếm xấp xỉ) ===")
	cms := NewCMS(5, 1024)
	stream := []string{"a", "a", "a", "b", "b", "c", "a", "a", "d", "a", "c"}
	for _, x := range stream {
		cms.Inc(x)
	}
	for _, x := range []string{"a", "b", "c", "d", "z"} {
		fmt.Printf("Estimate(%s) = %d\n", x, cms.Estimate(x))
	}
	fmt.Println("(thật: a=5, b=2, c=2, d=1, z=0 — có thể cao hơn vì xung đột)")
}
