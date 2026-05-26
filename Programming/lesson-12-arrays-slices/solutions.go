// Lesson 12 — Array & Slice
// Code minh hoạ + lời giải bài tập. Chạy: `go run solutions.go`.
package main

import (
	"fmt"
	"strings"
)

// ============================================================================
// PHẦN 1 — Array vs Slice cơ bản
// ============================================================================

// demoArrayVsSlice — Array là pass-by-value, size là phần của type.
func demoArrayVsSlice() {
	section("1. Array vs Slice")

	// Array: size là phần của TYPE
	var a [3]int = [3]int{1, 2, 3}
	b := [...]int{10, 20, 30, 40} // compiler đếm: [4]int
	fmt.Printf("a = %v (type [3]int)\n", a)
	fmt.Printf("b = %v (type [4]int — KHÔNG assign được cho a)\n", b)

	// Pass-by-value — function chỉ thấy COPY
	modify := func(arr [3]int) { arr[0] = 999 }
	modify(a)
	fmt.Printf("Sau modify(a): a vẫn là %v (array copy hoàn toàn)\n", a)

	// Slice — pass header, share array
	s := []int{1, 2, 3}
	modifySlice := func(s []int) { s[0] = 999 }
	modifySlice(s)
	fmt.Printf("Sau modifySlice(s): s = %v (modify element xuyên qua header)\n", s)
}

// ============================================================================
// PHẦN 2 — make với len và cap
// ============================================================================

func demoMake() {
	section("2. make([]T, len, cap)")

	s1 := make([]int, 5)     // len=5, cap=5
	s2 := make([]int, 0, 10) // len=0, cap=10
	s3 := make([]int, 3, 8)  // len=3, cap=8

	fmt.Printf("make([]int, 5)     → len=%d cap=%d val=%v\n", len(s1), cap(s1), s1)
	fmt.Printf("make([]int, 0, 10) → len=%d cap=%d val=%v\n", len(s2), cap(s2), s2)
	fmt.Printf("make([]int, 3, 8)  → len=%d cap=%d val=%v\n", len(s3), cap(s3), s3)

	// Re-slice mở rộng tới cap (không qua append)
	s3 = s3[:6]
	fmt.Printf("s3[:6] → len=%d cap=%d val=%v (truy ra zero value)\n", len(s3), cap(s3), s3)
}

// ============================================================================
// PHẦN 3 — append growth tracing
// ============================================================================

func demoAppendGrowth() {
	section("3. append growth — trace len/cap qua 10 lần append")

	var s []int
	fmt.Printf("Bắt đầu: len=%d cap=%d\n", len(s), cap(s))
	for i := 1; i <= 10; i++ {
		prevCap := cap(s)
		s = append(s, i)
		mark := ""
		if cap(s) != prevCap {
			mark = " ← ALLOC (cap " + itoa(prevCap) + " → " + itoa(cap(s)) + ")"
		}
		fmt.Printf("  append(%2d): len=%2d cap=%2d%s\n", i, len(s), cap(s), mark)
	}
}

// ============================================================================
// PHẦN 4 — Slice sharing pitfall
// ============================================================================

func demoSlicePitfalls() {
	section("4. Slice sharing pitfall")

	// Pitfall #1 — modify sub-slice ảnh hưởng parent
	a := []int{1, 2, 3, 4, 5}
	b := a[1:3]
	b[0] = 99
	fmt.Printf("a := []int{1,2,3,4,5}; b := a[1:3]; b[0]=99\n")
	fmt.Printf("  → a = %v  (s[1] bị ghi đè!)\n", a)
	fmt.Printf("  → b = %v\n\n", b)

	// Pitfall #2 — append vào sub-slice còn cap → ghi đè parent
	s := make([]int, 0, 5)
	s = append(s, 1, 2, 3)
	t := s[:2] // cap = 5
	t = append(t, 88)
	fmt.Printf("s := [1,2,3] (cap=5); t := s[:2]; t = append(t, 88)\n")
	fmt.Printf("  → s = %v  (s[2]: 3 → 88, bị ghi đè in-place!)\n", s)
	fmt.Printf("  → t = %v\n\n", t)

	// Fix — copy hoàn toàn
	orig := []int{1, 2, 3, 4, 5}
	indep := append([]int(nil), orig[1:3]...) // copy, không share
	indep[0] = 999
	fmt.Printf("Fix bằng append([]int(nil), orig[1:3]...):\n")
	fmt.Printf("  orig vẫn = %v (độc lập)\n", orig)
	fmt.Printf("  indep    = %v\n", indep)
}

// ============================================================================
// PHẦN 5 — Slice tricks
// ============================================================================

// removeAt — xoá phần tử tại i, preserve order.
// Lưu ý: modify underlying array của caller.
func removeAt(s []int, i int) []int {
	if i < 0 || i >= len(s) {
		return s
	}
	return append(s[:i], s[i+1:]...)
}

// removeAtSafe — xoá nhưng không động vào input.
func removeAtSafe(s []int, i int) []int {
	if i < 0 || i >= len(s) {
		// trả copy để caller không share
		out := make([]int, len(s))
		copy(out, s)
		return out
	}
	out := make([]int, 0, len(s)-1)
	out = append(out, s[:i]...)
	out = append(out, s[i+1:]...)
	return out
}

// removeAtFast — không preserve order, O(1).
func removeAtFast(s []int, i int) []int {
	if i < 0 || i >= len(s) {
		return s
	}
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

// insertAt — chèn x vào index i.
func insertAt(s []int, i, x int) []int {
	if i < 0 {
		i = 0
	}
	if i > len(s) {
		i = len(s)
	}
	s = append(s[:i], append([]int{x}, s[i:]...)...)
	return s
}

// reverse — đảo ngược tại chỗ, O(n) thời gian, O(1) bộ nhớ phụ.
func reverse(s []int) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}

// dedupe — loại trùng trên slice đã sắp xếp, in-place.
func dedupe(s []int) []int {
	if len(s) < 2 {
		return s
	}
	j := 1
	for i := 1; i < len(s); i++ {
		if s[i] != s[i-1] {
			s[j] = s[i]
			j++
		}
	}
	return s[:j]
}

// filterEven — giữ lại phần tử chẵn, in-place 2-pointer.
func filterEven(s []int) []int {
	n := 0
	for _, v := range s {
		if v%2 == 0 {
			s[n] = v
			n++
		}
	}
	return s[:n]
}

// chunk — chia slice thành các block kích thước n.
// Block cuối có thể ngắn hơn. n <= 0 → nil.
func chunk(s []int, n int) [][]int {
	if n <= 0 {
		return nil
	}
	numChunks := (len(s) + n - 1) / n
	out := make([][]int, 0, numChunks)
	for i := 0; i < len(s); i += n {
		end := i + n
		if end > len(s) {
			end = len(s)
		}
		out = append(out, s[i:end])
	}
	return out
}

func demoTricks() {
	section("5. Slice tricks")

	// remove preserve order
	s := []int{10, 20, 30, 40, 50}
	s = removeAt(s, 2)
	fmt.Printf("removeAt([10,20,30,40,50], 2) = %v\n", s)

	// remove fast
	s2 := []int{10, 20, 30, 40, 50}
	s2 = removeAtFast(s2, 1)
	fmt.Printf("removeAtFast([10,20,30,40,50], 1) = %v (không preserve)\n", s2)

	// insert
	s3 := []int{1, 2, 4, 5}
	s3 = insertAt(s3, 2, 3)
	fmt.Printf("insertAt([1,2,4,5], 2, 3) = %v\n", s3)

	// reverse
	s4 := []int{1, 2, 3, 4, 5}
	reverse(s4)
	fmt.Printf("reverse([1,2,3,4,5]) = %v\n", s4)

	// dedupe
	s5 := []int{1, 1, 2, 2, 2, 3, 4, 4, 5}
	out := dedupe(s5)
	fmt.Printf("dedupe([1,1,2,2,2,3,4,4,5]) = %v\n", out)

	// filter
	s6 := []int{1, 2, 3, 4, 5, 6, 7, 8}
	out2 := filterEven(s6)
	fmt.Printf("filterEven([1..8]) = %v\n", out2)

	// chunk — batch processing
	s7 := []int{1, 2, 3, 4, 5, 6, 7}
	fmt.Printf("chunk([1..7], 3) = %v\n", chunk(s7, 3))
}

// ============================================================================
// PHẦN 6 — Function parameter: modify element vs append
// ============================================================================

// doubleAll — modify element. Caller THẤY thay đổi.
func doubleAll(s []int) {
	for i := range s {
		s[i] *= 2
	}
}

// tryAppend — append local. Caller KHÔNG thấy.
func tryAppend(s []int) {
	s = append(s, 999)
	_ = s
}

// appendAndReturn — cách đúng để function "mở rộng" slice.
func appendAndReturn(s []int, x int) []int {
	return append(s, x)
}

func demoFuncParams() {
	section("6. Function parameter — slice là reference-like")

	s := []int{1, 2, 3}
	doubleAll(s)
	fmt.Printf("doubleAll: caller thấy → s = %v\n", s)

	s2 := []int{1, 2, 3}
	tryAppend(s2)
	fmt.Printf("tryAppend: caller KHÔNG thấy → s2 = %v\n", s2)

	s3 := []int{1, 2, 3}
	s3 = appendAndReturn(s3, 99) // gán lại — pattern chuẩn
	fmt.Printf("appendAndReturn + gán lại → s3 = %v\n", s3)
}

// ============================================================================
// PHẦN 7 — Pre-allocate vs grow
// ============================================================================

func demoPreallocate() {
	section("7. Pre-allocate — đếm số lần grow")

	// Không pre-allocate
	var noCap []int
	growthsNoCap := 0
	prevCap := 0
	for i := 0; i < 1000; i++ {
		noCap = append(noCap, i)
		if cap(noCap) != prevCap {
			growthsNoCap++
			prevCap = cap(noCap)
		}
	}

	// Pre-allocate cap=1000
	withCap := make([]int, 0, 1000)
	growthsWithCap := 0
	prevCap = cap(withCap)
	for i := 0; i < 1000; i++ {
		withCap = append(withCap, i)
		if cap(withCap) != prevCap {
			growthsWithCap++
			prevCap = cap(withCap)
		}
	}

	fmt.Printf("append 1000 phần tử, không pre-allocate: %d lần grow\n", growthsNoCap)
	fmt.Printf("append 1000 phần tử, pre-allocate cap=1000: %d lần grow\n", growthsWithCap)
}

// ============================================================================
// Utility
// ============================================================================

func section(title string) {
	fmt.Println()
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("  " + title)
	fmt.Println(strings.Repeat("=", 70))
}

// itoa thủ công để tránh import strconv (giữ file gọn).
func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	neg := n < 0
	if neg {
		n = -n
	}
	var buf [20]byte
	i := len(buf)
	for n > 0 {
		i--
		buf[i] = byte('0' + n%10)
		n /= 10
	}
	if neg {
		i--
		buf[i] = '-'
	}
	return string(buf[i:])
}

func main() {
	demoArrayVsSlice()
	demoMake()
	demoAppendGrowth()
	demoSlicePitfalls()
	demoTricks()
	demoFuncParams()
	demoPreallocate()
}
