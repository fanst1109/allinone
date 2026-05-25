// Lesson 01 — Array: lời giải các bài tập bằng Go.
// Chạy: go run solutions.go
package main

import (
	"fmt"
	"sort"
)

// Bài 1 — tổng các phần tử, O(n).
func sum(arr []int) int {
	s := 0
	for _, v := range arr {
		s += v
	}
	return s
}

// Bài 2 — binary search trên mảng đã sắp xếp tăng, O(log n).
// Trả về chỉ số hoặc -1 nếu không có.
func binarySearch(arr []int, target int) int {
	lo, hi := 0, len(arr)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2 // tránh tràn số nguyên
		switch {
		case arr[mid] == target:
			return mid
		case arr[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}

// Bài 3 — đếm chi phí copy thực tế khi dynamic array nhân đôi.
// Trả về tổng số phần tử đã ghi/copy sau n lần Append.
func amortizedCost(n int) int {
	capacity, size, copies := 1, 0, 0
	_ = make([]int, 0, capacity) // mô phỏng
	for i := 0; i < n; i++ {
		if size == capacity {
			capacity *= 2
			copies += size // copy hết phần tử cũ sang chỗ mới
		}
		copies++ // ghi giá trị mới
		size++
	}
	return copies
}

// Bài 4 — mô phỏng binary search có in từng bước.
func binarySearchVerbose(arr []int, target int) int {
	lo, hi := 0, len(arr)-1
	step := 0
	for lo <= hi {
		step++
		mid := lo + (hi-lo)/2
		fmt.Printf("  bước %d: lo=%d, hi=%d, mid=%d, arr[mid]=%d\n",
			step, lo, hi, mid, arr[mid])
		switch {
		case arr[mid] == target:
			fmt.Printf("  -> tìm thấy %d tại chỉ số %d\n", target, mid)
			return mid
		case arr[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}

func main() {
	fmt.Println("=== Bài 1: sum ===")
	fmt.Println(sum([]int{1, 2, 3, 4, 5})) // 15

	fmt.Println("\n=== Bài 2: binary search ===")
	arr := []int{1, 3, 5, 7, 9, 11, 13}
	for _, t := range []int{5, 1, 13, 4} {
		fmt.Printf("Tìm %d -> chỉ số %d\n", t, binarySearch(arr, t))
	}

	fmt.Println("\n=== Bài 3: amortized O(1) cho Append ===")
	for _, n := range []int{1, 10, 100, 1000, 10000} {
		c := amortizedCost(n)
		fmt.Printf("n=%d -> tổng %d thao tác, trung bình %.2f/phần tử\n",
			n, c, float64(c)/float64(n))
	}

	fmt.Println("\n=== Bài 4: mô phỏng binary search trên [3,1,4,1,5,9,2,6] tìm 5 ===")
	a := []int{3, 1, 4, 1, 5, 9, 2, 6}
	sort.Ints(a) // bắt buộc sort trước
	fmt.Printf("Sau sort: %v\n", a)
	binarySearchVerbose(a, 5)
}
