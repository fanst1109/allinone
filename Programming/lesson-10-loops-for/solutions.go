// Lesson 10 — Vòng lặp `for` trong Go: lời giải bài tập + demo các pattern chính.
//
// Cách chạy:
//   go run solutions.go
//
// File này biên dịch độc lập (package main, có hàm main).
// Comment tiếng Việt giải thích từng phần.

package main

import (
	"fmt"
	"sort"
	"strings"
	"sync"
)

// ---------------------------------------------------------------------------
// Phần A — 3 dạng for trong Go
// ---------------------------------------------------------------------------

func demoThreeForms() {
	fmt.Println("=== A. Ba dạng for ===")

	// 1) C-style: init; cond; post
	fmt.Print("C-style 1..5: ")
	for i := 1; i <= 5; i++ {
		fmt.Print(i, " ")
	}
	fmt.Println()

	// 2) While-style: chỉ có condition
	fmt.Print("While-style nhân đôi cho tới >= 50, bắt đầu từ 1: ")
	x := 1
	for x < 50 {
		x *= 2
		fmt.Print(x, " ")
	}
	fmt.Println() // 2 4 8 16 32 64

	// 3) Infinite + break — đếm tới khi gặp số chẵn trên i*3
	fmt.Print("Infinite + break: ")
	i := 1
	for {
		v := i * 3
		fmt.Print(v, " ")
		if v >= 12 {
			break
		}
		i++
	}
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Phần B — Range trên slice / map / string / channel
// ---------------------------------------------------------------------------

func demoRange() {
	fmt.Println("\n=== B. range trên các loại collection ===")

	// B1) Range slice — v là COPY
	nums := []int{10, 20, 30}
	for i, v := range nums {
		fmt.Printf("nums[%d] = %d\n", i, v)
	}

	// B2) Range map — thứ tự KHÔNG xác định
	prices := map[string]int{"apple": 30, "banana": 10, "cherry": 25}
	fmt.Println("Map (thứ tự random):")
	for k, v := range prices {
		fmt.Printf("  %s = %d\n", k, v)
	}
	// Muốn thứ tự ổn định -> sort key trước
	keys := make([]string, 0, len(prices))
	for k := range prices {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	fmt.Println("Map sorted theo key:")
	for _, k := range keys {
		fmt.Printf("  %s = %d\n", k, prices[k])
	}

	// B3) Range string — byte index + rune value
	s := "héllo"
	fmt.Printf("len(%q) = %d (byte)\n", s, len(s))
	for i, r := range s {
		fmt.Printf("  byte_index=%d  rune=%c  U+%04X\n", i, r, r)
	}

	// B4) Range channel — đọc tới khi close
	ch := make(chan int, 3)
	go func() {
		for j := 1; j <= 3; j++ {
			ch <- j * 100
		}
		close(ch)
	}()
	fmt.Print("Channel: ")
	for v := range ch {
		fmt.Print(v, " ")
	}
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Phần C — Labeled break demo: tìm target trong matrix 2D
// ---------------------------------------------------------------------------

func demoLabeledBreak() {
	fmt.Println("\n=== C. Labeled break ===")
	matrix := [][]int{
		{1, 2, 3, 4},
		{5, 6, 7, 8},
		{9, 10, 11, 12},
		{13, 14, 15, 16},
	}
	target := 11
	foundRow, foundCol := -1, -1

outer:
	for i := range matrix {
		for j := range matrix[i] {
			if matrix[i][j] == target {
				foundRow, foundCol = i, j
				break outer // thoát CẢ HAI loop
			}
		}
	}
	if foundRow == -1 {
		fmt.Printf("Không tìm thấy %d\n", target)
	} else {
		fmt.Printf("Tìm %d → matrix[%d][%d]\n", target, foundRow, foundCol)
	}
}

// ---------------------------------------------------------------------------
// Phần D — Loop patterns thường gặp
// ---------------------------------------------------------------------------

// sumAll cộng dồn tất cả phần tử của slice.
func sumAll(nums []int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	return sum
}

// filterPositive trả về slice chỉ chứa số dương.
func filterPositive(nums []int) []int {
	out := make([]int, 0, len(nums)) // pre-allocate tránh realloc
	for _, x := range nums {
		if x > 0 {
			out = append(out, x)
		}
	}
	return out
}

// doubleAll trả về slice mới với mỗi phần tử nhân 2 (pattern transform/map).
func doubleAll(nums []int) []int {
	out := make([]int, len(nums))
	for i, x := range nums {
		out[i] = x * 2
	}
	return out
}

// reverseInPlace dùng pattern two-pointer.
func reverseInPlace(s []int) {
	for l, r := 0, len(s)-1; l < r; l, r = l+1, r-1 {
		s[l], s[r] = s[r], s[l]
	}
}

func demoPatterns() {
	fmt.Println("\n=== D. Loop patterns ===")
	nums := []int{-3, 1, -4, 1, -5, 9, 2, -6, 5, 3, 5}
	fmt.Printf("sum(%v) = %d\n", nums, sumAll(nums))
	fmt.Printf("filterPositive = %v\n", filterPositive(nums))
	fmt.Printf("doubleAll(%v) = %v\n", []int{1, 2, 3, 4}, doubleAll([]int{1, 2, 3, 4}))

	rev := []int{1, 2, 3, 4, 5}
	reverseInPlace(rev)
	fmt.Printf("reverseInPlace → %v\n", rev)
}

// ---------------------------------------------------------------------------
// Phần E — Closure trong loop pitfall + fix
// ---------------------------------------------------------------------------

// closureBuggy demo bug ở Go < 1.22 (semantics cũ).
// Với Go 1.22+, code này vẫn in đúng [20 40 60] vì semantics mới.
// Nhưng ta vẫn nên hiểu để đọc được code legacy.
func closureBuggy() []int {
	results := make([]int, 0, 3)
	var wg sync.WaitGroup
	var mu sync.Mutex
	for _, v := range []int{10, 20, 30} {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			results = append(results, v*2) // capture biến v
			mu.Unlock()
		}()
	}
	wg.Wait()
	return results
}

// closureFixed dùng shadow `v := v` — đúng ở mọi version Go.
func closureFixed() []int {
	results := make([]int, 0, 3)
	var wg sync.WaitGroup
	var mu sync.Mutex
	for _, v := range []int{10, 20, 30} {
		v := v // shadow — tạo biến MỚI mỗi vòng
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			results = append(results, v*2)
			mu.Unlock()
		}()
	}
	wg.Wait()
	return results
}

// closureFixedByParam — truyền qua tham số, cũng đúng mọi version.
func closureFixedByParam() []int {
	results := make([]int, 0, 3)
	var wg sync.WaitGroup
	var mu sync.Mutex
	for _, v := range []int{10, 20, 30} {
		wg.Add(1)
		go func(v int) {
			defer wg.Done()
			mu.Lock()
			results = append(results, v*2)
			mu.Unlock()
		}(v)
	}
	wg.Wait()
	return results
}

func demoClosure() {
	fmt.Println("\n=== E. Closure trong loop ===")
	// Với Go 1.22+ output luôn là permutation [20 40 60].
	// Với Go 1.21 trở xuống, closureBuggy in [60 60 60].
	fmt.Printf("closureBuggy   = %v (Go 1.22+ thì đúng; Go <1.22 in [60 60 60])\n", closureBuggy())
	fmt.Printf("closureFixed   = %v (luôn đúng)\n", closureFixed())
	fmt.Printf("closureFixedP  = %v (luôn đúng)\n", closureFixedByParam())
}

// ---------------------------------------------------------------------------
// Phần F — Lời giải bài tập
// ---------------------------------------------------------------------------

// BT1: tổng các số chia hết cho 3 trong 1..100.
func sumDivBy3() int {
	sum := 0
	for i := 3; i <= 100; i += 3 {
		sum += i
	}
	return sum
}

// BT2: số lớn nhất trong slice không rỗng.
func maxInt(nums []int) int {
	maxVal := nums[0] // không khởi tạo 0 — sai với mọi số âm
	for _, x := range nums[1:] {
		if x > maxVal {
			maxVal = x
		}
	}
	return maxVal
}

// BT3: đếm tần suất rune trong string.
func charFreq(s string) map[rune]int {
	freq := make(map[rune]int)
	for _, r := range s {
		freq[r]++
	}
	return freq
}

// BT4: two-sum O(n²) — trả (i, j, found).
func twoSum(nums []int, target int) (int, int, bool) {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				return i, j, true
			}
		}
	}
	return -1, -1, false
}

func demoExercises() {
	fmt.Println("\n=== F. Lời giải bài tập ===")
	fmt.Printf("BT1 sumDivBy3() = %d (kỳ vọng 1683)\n", sumDivBy3())

	fmt.Printf("BT2 maxInt([3,1,4,1,5,9,2,6]) = %d\n", maxInt([]int{3, 1, 4, 1, 5, 9, 2, 6}))
	fmt.Printf("BT2 maxInt([-3,-1,-4])        = %d\n", maxInt([]int{-3, -1, -4}))
	fmt.Printf("BT2 maxInt([42])              = %d\n", maxInt([]int{42}))

	freq := charFreq("hello")
	// In sorted để output ổn định
	keys := make([]string, 0, len(freq))
	for r := range freq {
		keys = append(keys, string(r))
	}
	sort.Strings(keys)
	parts := make([]string, 0, len(keys))
	for _, k := range keys {
		parts = append(parts, fmt.Sprintf("%s:%d", k, freq[[]rune(k)[0]]))
	}
	fmt.Printf("BT3 charFreq(\"hello\") = {%s}\n", strings.Join(parts, ", "))

	i, j, ok := twoSum([]int{2, 7, 11, 15}, 9)
	fmt.Printf("BT4 twoSum([2,7,11,15], 9) = (%d, %d, %v)\n", i, j, ok)
	i, j, ok = twoSum([]int{3, 2, 4}, 6)
	fmt.Printf("BT4 twoSum([3,2,4], 6)     = (%d, %d, %v)\n", i, j, ok)
	i, j, ok = twoSum([]int{1, 2, 3}, 100)
	fmt.Printf("BT4 twoSum([1,2,3], 100)   = (%d, %d, %v)\n", i, j, ok)
}

// ---------------------------------------------------------------------------
// Phần G — for range N (Go 1.22+)
// ---------------------------------------------------------------------------

// rangeOverInt minh hoạ cú pháp Go 1.22+: for i := range N.
// Comment-out nếu bạn đang dùng Go < 1.22.
func rangeOverInt() {
	fmt.Println("\n=== G. for range N (Go 1.22+) ===")
	fmt.Print("for i := range 5: ")
	for i := range 5 {
		fmt.Print(i, " ")
	}
	fmt.Println()
}

// ---------------------------------------------------------------------------
// main — chạy toàn bộ demo
// ---------------------------------------------------------------------------

func main() {
	demoThreeForms()
	demoRange()
	demoLabeledBreak()
	demoPatterns()
	demoClosure()
	demoExercises()
	rangeOverInt() // bỏ dòng này nếu Go < 1.22
}
