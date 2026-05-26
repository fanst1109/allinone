// solutions.go — Lesson 11: Hàm (function) trong Go
//
// File này gom tất cả lời giải của các bài tập + một vài demo:
//   - BT1: divmod với error
//   - BT2: variadic max
//   - BT3: closure makeMultiplier
//   - BT4: defer LIFO trace
//   - BT5: Map generic (HOF preview)
//   - BT6: pattern processFiles không leak FD
//
// Cách chạy:
//   go run solutions.go
//
// Yêu cầu: Go 1.18+ (vì có generics ở BT5).

package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sync"
)

// ============================================================
// BT1 — divmod with error
// ============================================================
//
// Trả về (quotient, remainder, error). Nếu b == 0 → error.
// Pattern (result, error) là chuẩn Go cho mọi hàm có thể fail.
func divmod(a, b int) (int, int, error) {
	if b == 0 {
		// errors.New tạo error đơn giản từ message string.
		// Không dùng exception/panic — đó là pattern Go.
		return 0, 0, errors.New("divmod: division by zero")
	}
	return a / b, a % b, nil
}

// ============================================================
// BT2 — variadic max
// ============================================================
//
// `nums ...int` cho phép gọi maxOf(1, 2, 3) hoặc maxOf(slice...).
// Bên trong hàm, nums là []int.
func maxOf(nums ...int) (int, error) {
	if len(nums) == 0 {
		return 0, errors.New("maxOf: empty input")
	}
	m := nums[0]
	for _, n := range nums[1:] {
		if n > m {
			m = n
		}
	}
	return m, nil
}

// Bonus: sumOf — tổng các số. Variadic, đơn giản.
func sumOf(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// ============================================================
// BT3 — closure: currying
// ============================================================
//
// makeMultiplier trả về một hàm "đã đông cứng" tham số n.
// Closure capture n by reference, mỗi lần gọi makeMultiplier tạo 1 n riêng.
func makeMultiplier(n int) func(int) int {
	return func(x int) int {
		return n * x // closure đọc n từ scope ngoài
	}
}

// makeCounter — closure counter kinh điển.
// Mỗi lần gọi makeCounter() → một biến count mới, sống bên trong closure.
func makeCounter() func() int {
	count := 0
	return func() int {
		count++ // closure modify trực tiếp count, không copy
		return count
	}
}

// ============================================================
// BT4 — defer LIFO demo
// ============================================================
//
// Hàm này khi gọi sẽ in:
//
//	start
//	end
//	loop 2
//	loop 1
//	loop 0
//	B
//	A
//
// Vì defer stack LIFO, và argument được evaluate ngay tại lúc defer.
func deferDemo() {
	fmt.Println("start")
	defer fmt.Println("A")
	defer fmt.Println("B")
	for i := 0; i < 3; i++ {
		defer fmt.Println("loop", i) // i đóng băng tại đây
	}
	fmt.Println("end")
	// Khi return: pop stack [A, B, loop 0, loop 1, loop 2] từ ngọn.
}

// ============================================================
// BT5 — Map generic (preview generics, sẽ học sâu ở Tier 3)
// ============================================================
//
// Map áp dụng hàm f lên từng phần tử của s, trả về slice mới.
// T = kiểu input, U = kiểu output. `any` = `interface{}` (mọi kiểu).
func Map[T, U any](s []T, f func(T) U) []U {
	// Pre-allocate đúng capacity: nhanh hơn dùng append đầu rỗng.
	result := make([]U, len(s))
	for i, v := range s {
		result[i] = f(v)
	}
	return result
}

// Filter — bonus HOF: giữ lại các phần tử thoả predicate.
func Filter[T any](s []T, pred func(T) bool) []T {
	result := []T{}
	for _, v := range s {
		if pred(v) {
			result = append(result, v)
		}
	}
	return result
}

// ============================================================
// BT6 — Defer trong loop: pattern KHÔNG leak FD
// ============================================================
//
// processFiles mở mỗi file qua processOne — defer trong processOne
// chạy khi processOne return (mỗi iteration), không tích lũy.
func processFiles(paths []string) error {
	for _, path := range paths {
		if err := processOne(path); err != nil {
			return fmt.Errorf("process %s: %w", path, err)
		}
	}
	return nil
}

// processOne — đọc một file, defer Close ngay sau khi open.
// Pattern này an toàn cả khi có panic giữa chừng.
func processOne(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return err
	}
	defer f.Close() // tự đóng khi processOne return, dù return từ đâu

	// Demo: đọc stat của file.
	info, err := f.Stat()
	if err != nil {
		return err
	}
	fmt.Printf("  %s: %d bytes\n", filepath.Base(path), info.Size())
	return nil
}

// ============================================================
// Demo: defer + mutex (use case kinh điển #2)
// ============================================================
type Account struct {
	mu      sync.Mutex
	balance int
}

func (a *Account) Deposit(amt int) error {
	a.mu.Lock()
	defer a.mu.Unlock() // tự unlock dù return ở đâu

	if amt < 0 {
		return errors.New("amount must be non-negative")
	}
	a.balance += amt
	return nil
}

// ============================================================
// Demo: defer + log entry/exit (use case kinh điển #3)
// ============================================================
func tracedDivide(a, b int) (result int, err error) {
	log.Printf("ENTER tracedDivide(%d, %d)", a, b)
	defer func() {
		// Đọc named return values ngay trước khi hàm thoát.
		log.Printf("EXIT tracedDivide -> result=%d err=%v", result, err)
	}()

	if b == 0 {
		err = errors.New("divide by zero")
		return
	}
	result = a / b
	return
}

// ============================================================
// main — chạy hết các demo
// ============================================================
func main() {
	fmt.Println("=== BT1: divmod ===")
	q, r, err := divmod(17, 5)
	fmt.Printf("divmod(17, 5) = %d, %d, err=%v\n", q, r, err)
	_, _, err = divmod(10, 0)
	fmt.Printf("divmod(10, 0) -> err=%v\n", err)

	fmt.Println("\n=== BT2: variadic max ===")
	m, _ := maxOf(3, 1, 4, 1, 5, 9, 2, 6)
	fmt.Printf("maxOf(3, 1, 4, 1, 5, 9, 2, 6) = %d\n", m)
	_, err = maxOf()
	fmt.Printf("maxOf() -> err=%v\n", err)

	nums := []int{10, 20, 30}
	fmt.Printf("sumOf(nums...) = %d\n", sumOf(nums...))

	fmt.Println("\n=== BT3: closure multiplier ===")
	double := makeMultiplier(2)
	triple := makeMultiplier(3)
	fmt.Printf("double(5)=%d triple(5)=%d double(7)=%d\n",
		double(5), triple(5), double(7))

	fmt.Println("\n=== closure counter ===")
	c1 := makeCounter()
	c2 := makeCounter()
	fmt.Printf("c1: %d %d %d | c2: %d %d (c2 riêng, không bị c1 chia sẻ)\n",
		c1(), c1(), c1(), c2(), c2())

	fmt.Println("\n=== BT4: defer LIFO demo ===")
	deferDemo()

	fmt.Println("\n=== BT5: Map / Filter generic ===")
	doubled := Map([]int{1, 2, 3, 4}, func(x int) int { return x * 2 })
	fmt.Println("doubled =", doubled)
	evens := Filter([]int{1, 2, 3, 4, 5, 6}, func(x int) bool { return x%2 == 0 })
	fmt.Println("evens   =", evens)
	lens := Map([]string{"hi", "hello", "world"}, func(s string) int { return len(s) })
	fmt.Println("lens    =", lens)

	fmt.Println("\n=== BT6: processFiles không leak FD ===")
	// Tạo vài file tạm để demo.
	tmpDir, _ := os.MkdirTemp("", "lesson11-")
	defer os.RemoveAll(tmpDir)
	var paths []string
	for i := 0; i < 3; i++ {
		p := filepath.Join(tmpDir, fmt.Sprintf("f%d.txt", i))
		_ = os.WriteFile(p, []byte(fmt.Sprintf("content %d", i)), 0644)
		paths = append(paths, p)
	}
	if err := processFiles(paths); err != nil {
		fmt.Println("error:", err)
	}

	fmt.Println("\n=== defer + mutex demo ===")
	acc := &Account{}
	_ = acc.Deposit(100)
	_ = acc.Deposit(50)
	fmt.Printf("balance after 2 deposits: %d\n", acc.balance)

	fmt.Println("\n=== defer + log entry/exit ===")
	_, _ = tracedDivide(10, 3)
	_, _ = tracedDivide(10, 0)
}
