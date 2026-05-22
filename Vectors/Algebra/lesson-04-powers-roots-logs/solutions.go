// Lesson 04 — Lũy thừa, căn, logarit
//
// Chạy: go run solutions.go
//
// File này gồm:
//   - Các hàm tiện ích (power, nthRoot, logBase)
//   - logSumExp ổn định số (numerically stable) + naive version để so sánh
//   - Bảng giá trị log_2, log_10, ln
//   - Đáp án các bài tập trong README

package main

import (
	"fmt"
	"math"
)

// ============================================================
// 1. Hàm tiện ích cơ bản
// ============================================================

// power tính base^exp. Trong thực tế chỉ cần gọi thẳng math.Pow,
// nhưng để rõ ràng ta wrap lại.
func power(base, exp float64) float64 {
	return math.Pow(base, exp)
}

// nthRoot tính căn bậc n của x. Tương đương x^(1/n).
//
// Lưu ý: với n lẻ, x có thể âm (vd. cube root của -8 là -2).
// math.Pow không xử lý đúng cơ số âm với mũ phân số (trả NaN),
// nên ta xử lý dấu thủ công cho n lẻ.
func nthRoot(x float64, n int) float64 {
	if n == 0 {
		return math.NaN() // không định nghĩa
	}
	if x < 0 {
		if n%2 == 0 {
			return math.NaN() // căn bậc chẵn của số âm: không xác định trong R
		}
		// n lẻ: lật dấu, lấy căn của |x|, rồi trả về số âm
		return -math.Pow(-x, 1.0/float64(n))
	}
	return math.Pow(x, 1.0/float64(n))
}

// logBase tính log cơ số b của x, dùng công thức đổi cơ số:
//
//	log_b(x) = ln(x) / ln(b)
//
// Lưu ý: trong Go, math.Log là log TỰ NHIÊN (ln), không phải log_10.
// math.Log10 mới là log_10. math.Log2 là log_2.
func logBase(b, x float64) float64 {
	return math.Log(x) / math.Log(b)
}

// ============================================================
// 2. logSumExp — kỹ thuật ổn định số quan trọng
// ============================================================

// logSumExpNaive tính log(Σ exp(x_i)) theo cách "ngây thơ" —
// dễ overflow khi x_i lớn.
func logSumExpNaive(xs []float64) float64 {
	sum := 0.0
	for _, x := range xs {
		sum += math.Exp(x) // math.Exp(1000) đã là +Inf
	}
	return math.Log(sum)
}

// logSumExp tính log(Σ exp(x_i)) theo cách ổn định số:
//
//	log(Σ exp(x_i)) = M + log(Σ exp(x_i − M))    với M = max(xs)
//
// Sau khi trừ M, mọi (x_i − M) ≤ 0, nên exp(...) ∈ (0, 1] —
// không bao giờ overflow.
func logSumExp(xs []float64) float64 {
	if len(xs) == 0 {
		return math.Inf(-1) // log(0) = -Inf
	}
	// Bước 1: tìm max
	maxVal := xs[0]
	for _, x := range xs[1:] {
		if x > maxVal {
			maxVal = x
		}
	}
	// Trường hợp đặc biệt: max = +Inf hoặc -Inf
	if math.IsInf(maxVal, +1) {
		return math.Inf(+1)
	}
	if math.IsInf(maxVal, -1) {
		return math.Inf(-1)
	}
	// Bước 2: tổng exp(x_i − max)
	sum := 0.0
	for _, x := range xs {
		sum += math.Exp(x - maxVal)
	}
	// Bước 3: cộng lại max
	return maxVal + math.Log(sum)
}

// ============================================================
// 3. In bảng giá trị log
// ============================================================

func printLogTables() {
	fmt.Println("=== Bảng log_2(x) cho x là lũy thừa của 2 ===")
	powers := []int{1, 2, 4, 8, 16, 32, 64, 128, 256, 1024}
	for _, x := range powers {
		fmt.Printf("  log_2(%5d) = %2.0f\n", x, math.Log2(float64(x)))
	}

	fmt.Println("\n=== Bảng log_10(x) cho x là lũy thừa của 10 ===")
	tens := []float64{1, 10, 100, 1000, 1e6, 1e9}
	for _, x := range tens {
		fmt.Printf("  log_10(%-15.0f) = %2.0f\n", x, math.Log10(x))
	}

	fmt.Println("\n=== Bảng ln(x) cho x là lũy thừa của e ===")
	for k := 0; k <= 4; k++ {
		x := math.Pow(math.E, float64(k))
		fmt.Printf("  ln(e^%d = %10.5f) = %.5f\n", k, x, math.Log(x))
	}
}

// ============================================================
// 4. Đáp án các bài tập
// ============================================================

func solveBai1() {
	fmt.Println("\n=== Bài 1: Tính lũy thừa, căn ===")
	fmt.Printf("  a) 2^10        = %g\n", power(2, 10))   // 1024
	fmt.Printf("  b) 3^4         = %g\n", power(3, 4))    // 81
	fmt.Printf("  c) 5^(-2)      = %g\n", power(5, -2))   // 0.04
	fmt.Printf("  d) 8^(1/3)     = %g\n", nthRoot(8, 3))  // 2
	fmt.Printf("  e) 16^0.75     = %g\n", power(16, 0.75)) // 8
}

func solveBai2() {
	fmt.Println("\n=== Bài 2: Đơn giản hóa (lấy x = 2 kiểm chứng) ===")
	x := 2.0
	// a) (x^3 · x^5) / x^2 = x^6
	a := (math.Pow(x, 3) * math.Pow(x, 5)) / math.Pow(x, 2)
	fmt.Printf("  a) (x^3·x^5)/x^2 với x=2: tính trực tiếp = %g, x^6 = %g\n", a, math.Pow(x, 6))

	// b) (2x^2)^3 = 8x^6
	b := math.Pow(2*math.Pow(x, 2), 3)
	fmt.Printf("  b) (2x^2)^3 với x=2: trực tiếp = %g, 8x^6 = %g\n", b, 8*math.Pow(x, 6))

	// c) √(4x^6) = 2x^3
	c := math.Sqrt(4 * math.Pow(x, 6))
	fmt.Printf("  c) √(4x^6) với x=2: trực tiếp = %g, 2x^3 = %g\n", c, 2*math.Pow(x, 3))
}

func solveBai3() {
	fmt.Println("\n=== Bài 3: Tính log ===")
	fmt.Printf("  a) log_2(32)    = %g\n", math.Log2(32))      // 5
	fmt.Printf("  b) log_10(0.001) = %g\n", math.Log10(0.001))  // -3
	fmt.Printf("  c) log_5(125)   = %g\n", logBase(5, 125))    // 3
	fmt.Printf("  d) ln(e^7)      = %g\n", math.Log(math.Exp(7))) // 7
	fmt.Printf("  e) log_2(1024)  = %g\n", math.Log2(1024))    // 10
}

func solveBai4() {
	fmt.Println("\n=== Bài 4: Dùng quy luật log ===")
	// a) log_10(200) - log_10(2) = log_10(100) = 2
	a := math.Log10(200) - math.Log10(2)
	fmt.Printf("  a) log_10(200) − log_10(2) = %g  (≈ log_10(100) = %g)\n", a, math.Log10(100))

	// b) log_2(48) - log_2(3) = log_2(16) = 4
	b := math.Log2(48) - math.Log2(3)
	fmt.Printf("  b) log_2(48) − log_2(3)    = %g  (≈ log_2(16) = %g)\n", b, math.Log2(16))

	// c) log(x^2 · y^3) = 2·log(x) + 3·log(y) — kiểm chứng với x=3, y=5
	x, y := 3.0, 5.0
	lhs := math.Log10(x*x * y*y*y)
	rhs := 2*math.Log10(x) + 3*math.Log10(y)
	fmt.Printf("  c) log(x²y³) với x=3, y=5: VT = %g, 2log(x)+3log(y) = %g\n", lhs, rhs)
}

func solveBai5() {
	fmt.Println("\n=== Bài 5: logSumExp ổn định số ===")
	xs := []float64{1000, 1001, 999}
	naive := logSumExpNaive(xs)
	stable := logSumExp(xs)
	fmt.Printf("  Input: %v\n", xs)
	fmt.Printf("  logSumExpNaive  = %v  (overflow → +Inf)\n", naive)
	fmt.Printf("  logSumExp       = %v  (ổn định)\n", stable)
	fmt.Printf("\n  Giải thích: max = 1001, sau khi trừ:\n")
	fmt.Printf("    exp(-1) + exp(0) + exp(-2) = %.6f + %.6f + %.6f = %.6f\n",
		math.Exp(-1), math.Exp(0), math.Exp(-2),
		math.Exp(-1)+math.Exp(0)+math.Exp(-2))
	fmt.Printf("    log của tổng       ≈ %.6f\n", math.Log(math.Exp(-1)+math.Exp(0)+math.Exp(-2)))
	fmt.Printf("    Cộng lại max=1001  ≈ %.6f\n", 1001+math.Log(math.Exp(-1)+math.Exp(0)+math.Exp(-2)))

	// Thêm test case nhỏ để kiểm chứng tính đúng (naive và stable phải khớp khi không overflow)
	fmt.Println("\n  --- Test case nhỏ (không overflow), 2 cách phải khớp ---")
	xsSmall := []float64{1, 2, 3}
	fmt.Printf("  Input: %v\n", xsSmall)
	fmt.Printf("  logSumExpNaive  = %.10f\n", logSumExpNaive(xsSmall))
	fmt.Printf("  logSumExp       = %.10f\n", logSumExp(xsSmall))
}

// ============================================================
// main
// ============================================================

func main() {
	fmt.Println("# Lesson 04 — Lũy thừa, căn, logarit (lời giải code)")
	fmt.Println()

	printLogTables()
	solveBai1()
	solveBai2()
	solveBai3()
	solveBai4()
	solveBai5()

	fmt.Println("\n=== Hết. ===")
}
