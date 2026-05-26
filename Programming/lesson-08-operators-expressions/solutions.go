// Lesson 08 — Toán tử & Biểu thức trong Go
//
// File này demo các kiến thức chính của lesson:
//   1. Arithmetic — int vs float division
//   2. Bitwise   — set / clear / check flag (Linux permission)
//   3. Overflow  — integer wrap silent
//   4. Float     — precision pitfall + safe compare bằng epsilon
//   5. Safe div  — chia có xử lý chia 0 và overflow MinInt/-1
//
// Build: go run solutions.go
package main

import (
	"errors"
	"fmt"
	"math"
)

// ============================================================
// 1. Arithmetic — int vs float division
// ============================================================

func demoArithmetic() {
	fmt.Println("=== 1. Arithmetic ===")

	// Integer division: phần thập phân bị cắt
	fmt.Println("7 / 2     =", 7/2)       // 3
	fmt.Println("15 / 4    =", 15/4)      // 3
	fmt.Println("-7 / 2    =", -7/2)      // -3 (truncate về 0)

	// Float division: kết quả thật
	fmt.Println("7.0 / 2.0 =", 7.0/2.0)   // 3.5
	fmt.Println("15.0/4.0  =", 15.0/4.0)  // 3.75

	// Modulo
	fmt.Println("7 % 2     =", 7%2)       // 1
	fmt.Println("-7 % 2    =", -7%2)      // -1 (dấu theo dividend)

	// Bẫy: trung bình int
	a, b := 3, 4
	avgInt := (a + b) / 2                  // 3 (mất 0.5)
	avgF := float64(a+b) / 2.0             // 3.5 (chuẩn)
	fmt.Printf("avg(3,4) int=%d float=%.1f\n", avgInt, avgF)
}

// ============================================================
// 2. Bitwise — Linux permission bitmap
// ============================================================

const (
	PermRead    = 1 << 2 // 4 (0b100)
	PermWrite   = 1 << 1 // 2 (0b010)
	PermExecute = 1 << 0 // 1 (0b001)
)

// Combine — OR tất cả flag thành bitmap.
func Combine(flags ...int) int {
	result := 0
	for _, f := range flags {
		result |= f
	}
	return result
}

// Has — kiểm tra perm có flag không (dùng & và so với 0).
func Has(perm, flag int) bool {
	return perm&flag != 0
}

// Clear — xoá flag khỏi perm (dùng &^ đặc trưng Go).
func Clear(perm, flag int) int {
	return perm &^ flag
}

// Toggle — đảo trạng thái flag (XOR).
func Toggle(perm, flag int) int {
	return perm ^ flag
}

func demoBitwise() {
	fmt.Println("\n=== 2. Bitwise — Linux permission ===")

	perm := Combine(PermRead, PermWrite, PermExecute) // 7 (rwx)
	fmt.Printf("perm = rwx       → %d (0b%03b)\n", perm, perm)

	fmt.Printf("Has Read?        → %v\n", Has(perm, PermRead))
	fmt.Printf("Has Execute?     → %v\n", Has(perm, PermExecute))

	perm = Clear(perm, PermWrite) // bỏ quyền ghi: rwx → r-x = 5
	fmt.Printf("after Clear(W)   → %d (0b%03b) — r-x\n", perm, perm)

	perm = Toggle(perm, PermExecute) // tắt execute: r-x → r-- = 4
	fmt.Printf("after Toggle(X)  → %d (0b%03b) — r--\n", perm, perm)

	// Demo &, |, ^, &^ trên hai số tự chọn
	x, y := 0b11001010, 0b00001111
	fmt.Printf("\nx=0b%08b (%d), y=0b%08b (%d)\n", x, x, y, y)
	fmt.Printf("x & y  = 0b%08b (%d)\n", x&y, x&y)   // mask 4 bit thấp
	fmt.Printf("x | y  = 0b%08b (%d)\n", x|y, x|y)   // set bit
	fmt.Printf("x ^ y  = 0b%08b (%d)\n", x^y, x^y)   // toggle bit
	fmt.Printf("x &^ y = 0b%08b (%d)\n", x&^y, x&^y) // clear bit
}

// ============================================================
// 3. Integer Overflow
// ============================================================

func demoOverflow() {
	fmt.Println("\n=== 3. Integer Overflow ===")

	var maxI32 int32 = math.MaxInt32 // 2_147_483_647
	wrapped := maxI32 + 1
	fmt.Printf("MaxInt32       = %d\n", maxI32)
	fmt.Printf("MaxInt32 + 1   = %d  ← WRAP về số âm!\n", wrapped)

	// Mô phỏng bug fintech
	var balance1 int32 = 2_000_000_000
	var balance2 int32 = 500_000_000
	totalBad := balance1 + balance2 // overflow
	fmt.Printf("\n[Fintech bug] 2,000,000,000 + 500,000,000 (int32) = %d (âm!)\n", totalBad)

	// Dùng int64 thì OK
	totalGood := int64(balance1) + int64(balance2)
	fmt.Printf("Convert int64 → đúng: %d\n", totalGood)
}

// ============================================================
// 4. Float precision + safe compare
// ============================================================

const eps = 1e-9

// floatEqual — so sánh float dùng epsilon absolute.
func floatEqual(a, b float64) bool {
	return math.Abs(a-b) < eps
}

func demoFloat() {
	fmt.Println("\n=== 4. Float precision ===")

	// LƯU Ý: Go có constant-folding ở compile time cho literal untyped,
	// nên `0.1 + 0.2 == 0.3` viết trực tiếp ra true (compiler tính chính xác).
	// Để thấy bug thật, phải ép qua BIẾN runtime — lúc đó dùng float64 IEEE-754.
	a, b, c := 0.1, 0.2, 0.3
	sum := a + b
	fmt.Printf("0.1 + 0.2          = %.20f\n", sum)
	fmt.Printf("0.3                = %.20f\n", c)
	fmt.Printf("sum == 0.3 (biến)  → %v (false! đây là bug nổi tiếng)\n", sum == c)
	fmt.Printf("floatEqual(sum,c)  → %v (chuẩn dùng epsilon)\n", floatEqual(sum, c))

	// Tổng đơn hàng 0.1 × 3 (qua biến để tránh constant-fold)
	unit := 0.1
	n := 3
	total := unit * float64(n)
	fmt.Printf("\n[Tính tiền] 0.1 × 3 = %.20f, == 0.3? %v\n", total, total == c)
	fmt.Printf("Cách đúng: dùng int (cents): 10 cents × 3 = %d cents\n", 10*3)
}

// ============================================================
// 5. Safe divide — xử lý chia 0 và overflow MinInt/-1
// ============================================================

func safeDivide(a, b int64) (int64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	if a == math.MinInt64 && b == -1 {
		return 0, errors.New("overflow: -MinInt64 vượt MaxInt64")
	}
	return a / b, nil
}

func demoSafeDivide() {
	fmt.Println("\n=== 5. Safe divide ===")
	cases := []struct{ a, b int64 }{
		{10, 3},
		{10, 0},
		{math.MinInt64, -1},
		{-100, 7},
	}
	for _, c := range cases {
		r, err := safeDivide(c.a, c.b)
		if err != nil {
			fmt.Printf("safeDivide(%d, %d) → ERROR: %v\n", c.a, c.b, err)
		} else {
			fmt.Printf("safeDivide(%d, %d) → %d\n", c.a, c.b, r)
		}
	}
}

// ============================================================
// main — chạy tất cả demo
// ============================================================

func main() {
	demoArithmetic()
	demoBitwise()
	demoOverflow()
	demoFloat()
	demoSafeDivide()
}
