// Package main minh họa các khái niệm trong Lesson 00:
// đếm thao tác cơ bản, so sánh các lớp Big-O.
//
// Chạy: go run solutions.go
package main

import (
	"fmt"
	"math"
)

// countLinear duyệt mảng và đếm số thao tác — minh họa O(n).
func countLinear(n int) int {
	ops := 0
	for i := 0; i < n; i++ {
		ops++ // mỗi vòng = 1 thao tác cơ bản
	}
	return ops
}

// countQuadratic hai vòng lồng nhau — minh họa O(n²).
func countQuadratic(n int) int {
	ops := 0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			ops++
		}
	}
	return ops
}

// countLogarithmic giảm một nửa mỗi bước — minh họa O(log n).
func countLogarithmic(n int) int {
	ops := 0
	for i := n; i > 1; i /= 2 {
		ops++
	}
	return ops
}

// countNLogN vòng ngoài O(n), vòng trong O(log n) — minh họa O(n log n).
func countNLogN(n int) int {
	ops := 0
	for i := 0; i < n; i++ {
		for j := n; j > 1; j /= 2 {
			ops++
		}
	}
	return ops
}

// linearSearch best/avg/worst case — minh họa ba trường hợp.
// Trả về (vị trí, số phép so sánh).
func linearSearch(arr []int, target int) (int, int) {
	cmp := 0
	for i, v := range arr {
		cmp++
		if v == target {
			return i, cmp
		}
	}
	return -1, cmp
}

// --- ADT Stack: cài đặt bằng slice (Bài 4 — minh họa ADT vs cấu trúc cụ thể) ---

type Stack struct {
	data []int
}

func (s *Stack) Push(x int)   { s.data = append(s.data, x) }
func (s *Stack) Pop() int     { n := len(s.data) - 1; x := s.data[n]; s.data = s.data[:n]; return x }
func (s *Stack) Peek() int    { return s.data[len(s.data)-1] }
func (s *Stack) IsEmpty() bool { return len(s.data) == 0 }

func main() {
	fmt.Println("=== So sánh số thao tác cho các lớp Big-O ===")
	fmt.Printf("%-10s %-15s %-15s %-15s %-15s\n",
		"n", "O(n)", "O(log n)", "O(n log n)", "O(n²)")
	for _, n := range []int{10, 100, 1_000, 10_000} {
		fmt.Printf("%-10d %-15d %-15d %-15d %-15d\n",
			n,
			countLinear(n),
			countLogarithmic(n),
			countNLogN(n),
			countQuadratic(n),
		)
	}

	fmt.Println("\n=== Tỷ lệ log(n)/n giảm về 0 khi n lớn (Bài 6) ===")
	for _, n := range []int{10, 1_000, 1_000_000} {
		fmt.Printf("n=%-10d log2(n)=%-6.2f  log2(n)/n=%g\n",
			n, math.Log2(float64(n)), math.Log2(float64(n))/float64(n))
	}

	fmt.Println("\n=== Linear search: best vs worst (Bài lý thuyết — best/avg/worst) ===")
	arr := []int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
	idx, cmp := linearSearch(arr, 10)
	fmt.Printf("Tìm 10 (đầu mảng):   vị trí=%d, số so sánh=%d (best case)\n", idx, cmp)
	idx, cmp = linearSearch(arr, 100)
	fmt.Printf("Tìm 100 (cuối mảng): vị trí=%d, số so sánh=%d (worst case)\n", idx, cmp)
	idx, cmp = linearSearch(arr, 999)
	fmt.Printf("Tìm 999 (không có):  vị trí=%d, số so sánh=%d (worst case)\n", idx, cmp)

	fmt.Println("\n=== ADT Stack: cài đặt bằng slice (Bài 4) ===")
	s := &Stack{}
	s.Push(1)
	s.Push(2)
	s.Push(3)
	fmt.Printf("Đỉnh stack: %d\n", s.Peek())
	for !s.IsEmpty() {
		fmt.Printf("Pop -> %d\n", s.Pop())
	}
}
