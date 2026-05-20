// Lesson 13 — Segment Tree & Fenwick Tree: lời giải bằng Go.
package main

import (
	"fmt"
	"sort"
)

// --- Bài 1 + Bài 3: Segment tree với lazy add, range sum ---
type Seg struct {
	n         int
	tree, lazy []int64
}

func NewSeg(a []int) *Seg {
	n := len(a)
	s := &Seg{n: n, tree: make([]int64, 4*n), lazy: make([]int64, 4*n)}
	if n > 0 {
		s.build(1, 0, n-1, a)
	}
	return s
}

func (s *Seg) build(node, l, r int, a []int) {
	if l == r {
		s.tree[node] = int64(a[l])
		return
	}
	mid := (l + r) / 2
	s.build(2*node, l, mid, a)
	s.build(2*node+1, mid+1, r, a)
	s.tree[node] = s.tree[2*node] + s.tree[2*node+1]
}

func (s *Seg) push(node, l, r int) {
	if s.lazy[node] == 0 {
		return
	}
	mid := (l + r) / 2
	s.apply(2*node, l, mid, s.lazy[node])
	s.apply(2*node+1, mid+1, r, s.lazy[node])
	s.lazy[node] = 0
}

func (s *Seg) apply(node, l, r int, v int64) {
	s.tree[node] += int64(r-l+1) * v
	s.lazy[node] += v
}

// Range add [ql, qr] += v
func (s *Seg) RangeAdd(ql, qr, v int) { s.rangeAdd(1, 0, s.n-1, ql, qr, int64(v)) }
func (s *Seg) rangeAdd(node, l, r, ql, qr int, v int64) {
	if qr < l || r < ql {
		return
	}
	if ql <= l && r <= qr {
		s.apply(node, l, r, v)
		return
	}
	s.push(node, l, r)
	mid := (l + r) / 2
	s.rangeAdd(2*node, l, mid, ql, qr, v)
	s.rangeAdd(2*node+1, mid+1, r, ql, qr, v)
	s.tree[node] = s.tree[2*node] + s.tree[2*node+1]
}

// Range sum [ql, qr]
func (s *Seg) RangeSum(ql, qr int) int64 { return s.rangeSum(1, 0, s.n-1, ql, qr) }
func (s *Seg) rangeSum(node, l, r, ql, qr int) int64 {
	if qr < l || r < ql {
		return 0
	}
	if ql <= l && r <= qr {
		return s.tree[node]
	}
	s.push(node, l, r)
	mid := (l + r) / 2
	return s.rangeSum(2*node, l, mid, ql, qr) + s.rangeSum(2*node+1, mid+1, r, ql, qr)
}

// --- Bài 4: Fenwick + đếm nghịch thế ---
type BIT struct{ tree []int }

func NewBIT(n int) *BIT { return &BIT{tree: make([]int, n+1)} }

func (b *BIT) Update(i, v int) {
	for i++; i < len(b.tree); i += i & (-i) {
		b.tree[i] += v
	}
}

func (b *BIT) Sum(i int) int {
	s := 0
	for i++; i > 0; i -= i & (-i) {
		s += b.tree[i]
	}
	return s
}

func countInversions(a []int) int {
	// nén giá trị xuống [0, k)
	sorted := append([]int(nil), a...)
	sort.Ints(sorted)
	rank := map[int]int{}
	for i, v := range sorted {
		if _, ok := rank[v]; !ok {
			rank[v] = i
		}
	}
	bit := NewBIT(len(rank))
	inv := 0
	for i := len(a) - 1; i >= 0; i-- {
		r := rank[a[i]]
		if r > 0 {
			inv += bit.Sum(r - 1)
		}
		bit.Update(r, 1)
	}
	return inv
}

func main() {
	fmt.Println("=== Bài 1 + 3: Segment tree range-add + range-sum ===")
	s := NewSeg([]int{1, 2, 3, 4, 5, 6, 7, 8})
	fmt.Println("Sum [2..5]:", s.RangeSum(2, 5)) // 3+4+5+6 = 18
	s.RangeAdd(1, 4, 10)
	fmt.Println("Sau add 10 vào [1..4], sum [0..7]:", s.RangeSum(0, 7)) // 36 + 40 = 76
	fmt.Println("Sum [2..3]:", s.RangeSum(2, 3))                        // (3+10)+(4+10) = 27

	fmt.Println("\n=== Bài 4: số nghịch thế ===")
	fmt.Println(countInversions([]int{2, 4, 1, 3, 5})) // 3: (2,1),(4,1),(4,3)
	fmt.Println(countInversions([]int{5, 4, 3, 2, 1})) // 10 (mảng đảo ngược)
}
