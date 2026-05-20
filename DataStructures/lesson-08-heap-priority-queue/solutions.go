// Lesson 08 — Heap & Priority Queue: lời giải bằng Go.
package main

import "fmt"

// --- Bài 2: Min-heap ---
type MinHeap struct{ data []int }

func (h *MinHeap) Peek() int { return h.data[0] }
func (h *MinHeap) Len() int  { return len(h.data) }

func (h *MinHeap) Insert(x int) {
	h.data = append(h.data, x)
	i := len(h.data) - 1
	for i > 0 {
		p := (i - 1) / 2
		if h.data[p] <= h.data[i] {
			return
		}
		h.data[p], h.data[i] = h.data[i], h.data[p]
		i = p
	}
}

func (h *MinHeap) ExtractMin() int {
	min := h.data[0]
	h.data[0] = h.data[len(h.data)-1]
	h.data = h.data[:len(h.data)-1]
	siftDown(h.data, 0)
	return min
}

func siftDown(a []int, i int) {
	n := len(a)
	for {
		l, r, s := 2*i+1, 2*i+2, i
		if l < n && a[l] < a[s] {
			s = l
		}
		if r < n && a[r] < a[s] {
			s = r
		}
		if s == i {
			return
		}
		a[i], a[s] = a[s], a[i]
		i = s
	}
}

// --- Bài 3: heap sort (in-place) dùng max-heap ---
func heapSort(a []int) {
	n := len(a)
	for i := n/2 - 1; i >= 0; i-- {
		siftDownMax(a, i, n)
	}
	for end := n - 1; end > 0; end-- {
		a[0], a[end] = a[end], a[0]
		siftDownMax(a, 0, end)
	}
}

func siftDownMax(a []int, i, n int) {
	for {
		l, r, lg := 2*i+1, 2*i+2, i
		if l < n && a[l] > a[lg] {
			lg = l
		}
		if r < n && a[r] > a[lg] {
			lg = r
		}
		if lg == i {
			return
		}
		a[i], a[lg] = a[lg], a[i]
		i = lg
	}
}

// --- Bài 4: Median streaming với hai heap ---
type MaxHeap struct{ data []int } // dùng cho nửa nhỏ

func (h *MaxHeap) Peek() int { return h.data[0] }
func (h *MaxHeap) Len() int  { return len(h.data) }
func (h *MaxHeap) Insert(x int) {
	h.data = append(h.data, x)
	i := len(h.data) - 1
	for i > 0 {
		p := (i - 1) / 2
		if h.data[p] >= h.data[i] {
			return
		}
		h.data[p], h.data[i] = h.data[i], h.data[p]
		i = p
	}
}
func (h *MaxHeap) ExtractMax() int {
	mx := h.data[0]
	h.data[0] = h.data[len(h.data)-1]
	h.data = h.data[:len(h.data)-1]
	siftDownMax(h.data, 0, len(h.data))
	return mx
}

type MedianFinder struct {
	lo MaxHeap // nửa nhỏ (max-heap, đỉnh = lớn nhất của nửa nhỏ)
	hi MinHeap // nửa lớn (min-heap, đỉnh = nhỏ nhất của nửa lớn)
}

func (m *MedianFinder) Add(x int) {
	if m.lo.Len() == 0 || x <= m.lo.Peek() {
		m.lo.Insert(x)
	} else {
		m.hi.Insert(x)
	}
	// rebalance: |lo| - |hi| ∈ {0, 1}
	if m.lo.Len() > m.hi.Len()+1 {
		m.hi.Insert(m.lo.ExtractMax())
	} else if m.hi.Len() > m.lo.Len() {
		m.lo.Insert(m.hi.ExtractMin())
	}
}

func (m *MedianFinder) Median() float64 {
	if m.lo.Len() > m.hi.Len() {
		return float64(m.lo.Peek())
	}
	return (float64(m.lo.Peek()) + float64(m.hi.Peek())) / 2
}

// --- Bài 1: minh họa quá trình chèn 4,1,7,3,2,6,5 ---
func demoInsert() {
	h := &MinHeap{}
	for _, x := range []int{4, 1, 7, 3, 2, 6, 5} {
		h.Insert(x)
		fmt.Printf("Sau insert %d: %v\n", x, h.data)
	}
}

func main() {
	fmt.Println("=== Bài 1: Trạng thái heap sau từng lần chèn ===")
	demoInsert()

	fmt.Println("\n=== Bài 3: heap sort ===")
	a := []int{4, 1, 7, 3, 2, 6, 5}
	heapSort(a)
	fmt.Println(a)

	fmt.Println("\n=== Bài 4: median streaming ===")
	mf := &MedianFinder{}
	for _, x := range []int{1, 10, 3, 7, 5, 8, 4} {
		mf.Add(x)
		fmt.Printf("add %d -> median = %.1f\n", x, mf.Median())
	}
}
