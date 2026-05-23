// Package main — Lời giải cho Lesson 06: Hàm bậc 1 và hàm bậc 2.
//
// File này cung cấp:
//   - lineFrom2Points : tìm phương trình đường thẳng từ 2 điểm.
//   - solveQuadratic  : giải ax² + bx + c = 0, xử lý mọi trường hợp suy biến.
//   - vertex          : tính tọa độ đỉnh parabol.
//   - completeTheSquare : đưa ax² + bx + c về dạng a(x − h)² + k.
//   - vieteCheck      : kiểm tra tổng/tích nghiệm theo định lý Viète.
//   - các hàm minh họa lời giải bài tập 1..6 trong README.
//
// Chạy: go run solutions.go
package main

import (
	"fmt"
	"math"
)

// ============================================================================
// 1. lineFrom2Points — phương trình đường thẳng y = ax + b qua 2 điểm.
// ============================================================================
//
// Trả về (a, b, ok). Nếu x1 == x2 thì 2 điểm thẳng đứng — không biểu diễn
// được dưới dạng y = ax + b, ok = false.
func lineFrom2Points(x1, y1, x2, y2 float64) (a, b float64, ok bool) {
	if x1 == x2 {
		return 0, 0, false // đường thẳng đứng x = x1
	}
	a = (y2 - y1) / (x2 - x1)
	b = y1 - a*x1
	return a, b, true
}

// ============================================================================
// 2. solveQuadratic — giải ax² + bx + c = 0.
// ============================================================================
//
// Trả về danh sách nghiệm thực và mô tả trạng thái.
// Xử lý:
//   - a = 0, b ≠ 0  → linear case, 1 nghiệm.
//   - a = 0, b = 0, c ≠ 0  → vô nghiệm.
//   - a = 0, b = 0, c = 0  → vô số nghiệm (0 = 0 luôn đúng).
//   - a ≠ 0  → tính Δ và phân loại.
func solveQuadratic(a, b, c float64) (roots []float64, status string) {
	if a == 0 {
		if b == 0 {
			if c == 0 {
				return nil, "degenerate (0=0): vô số nghiệm"
			}
			return nil, "degenerate (c≠0): vô nghiệm"
		}
		// bx + c = 0
		return []float64{-c / b}, "linear (a=0): 1 nghiệm"
	}
	delta := b*b - 4*a*c
	switch {
	case delta > 0:
		s := math.Sqrt(delta)
		x1 := (-b + s) / (2 * a)
		x2 := (-b - s) / (2 * a)
		return []float64{x1, x2}, fmt.Sprintf("Δ=%.4g > 0: 2 nghiệm phân biệt", delta)
	case delta == 0:
		return []float64{-b / (2 * a)}, "Δ=0: nghiệm kép"
	default:
		return nil, fmt.Sprintf("Δ=%.4g < 0: vô nghiệm thực", delta)
	}
}

// ============================================================================
// 3. vertex — tọa độ đỉnh parabol y = ax² + bx + c.
// ============================================================================
//
// h = -b/(2a), k = f(h) = c - b²/(4a) = -Δ/(4a).
// Yêu cầu a ≠ 0.
func vertex(a, b, c float64) (h, k float64) {
	if a == 0 {
		return math.NaN(), math.NaN()
	}
	h = -b / (2 * a)
	k = c - b*b/(4*a)
	return h, k
}

// ============================================================================
// 4. completeTheSquare — đưa ax² + bx + c về dạng A(x − h)² + k.
// ============================================================================
//
// Trả về (A, h, k) sao cho ax² + bx + c == A·(x − h)² + k. Hệ số A bằng a.
// Hữu ích để đọc nhanh đỉnh và min/max.
func completeTheSquare(a, b, c float64) (A, h, k float64) {
	if a == 0 {
		// Hàm bậc 1: không có dạng đỉnh chuẩn.
		return 0, math.NaN(), math.NaN()
	}
	h = -b / (2 * a)
	k = c - b*b/(4*a)
	return a, h, k
}

// ============================================================================
// 5. vieteCheck — kiểm tra Viète cho nghiệm vừa tìm.
// ============================================================================
func vieteCheck(a, b, c float64, roots []float64) string {
	if len(roots) != 2 {
		return "Viète chỉ áp dụng khi có 2 nghiệm (phân biệt hoặc kép)."
	}
	s := roots[0] + roots[1]
	p := roots[0] * roots[1]
	expectedS := -b / a
	expectedP := c / a
	return fmt.Sprintf(
		"S = x₁+x₂ = %.6g (kỳ vọng -b/a = %.6g, %s); "+
			"P = x₁·x₂ = %.6g (kỳ vọng c/a = %.6g, %s)",
		s, expectedS, okMark(near(s, expectedS)),
		p, expectedP, okMark(near(p, expectedP)),
	)
}

func near(x, y float64) bool { return math.Abs(x-y) < 1e-9 }
func okMark(ok bool) string {
	if ok {
		return "ok"
	}
	return "MISMATCH"
}

// ============================================================================
// 6. linearRegression — lời giải đóng cho linear regression đơn biến.
// ============================================================================
//
// Cho dữ liệu (xs, ys), tìm a, b cực tiểu hóa Σ(yᵢ − (a·xᵢ + b))².
// Dùng công thức closed-form đã trình bày ở README mục B.9.
func linearRegression(xs, ys []float64) (a, b float64, ok bool) {
	n := float64(len(xs))
	if n == 0 || len(xs) != len(ys) {
		return 0, 0, false
	}
	var sumX, sumY, sumXY, sumX2 float64
	for i := range xs {
		sumX += xs[i]
		sumY += ys[i]
		sumXY += xs[i] * ys[i]
		sumX2 += xs[i] * xs[i]
	}
	denom := n*sumX2 - sumX*sumX
	if denom == 0 {
		// Mọi x giống nhau — không tìm được đường có slope hữu hạn.
		return 0, 0, false
	}
	a = (n*sumXY - sumX*sumY) / denom
	b = (sumY - a*sumX) / n
	return a, b, true
}

// ============================================================================
// Demo lời giải các bài tập trong README.
// ============================================================================

func bai1() {
	fmt.Println("── Bài 1 ── y = 2x − 3")
	a, b := 2.0, -3.0
	fmt.Printf("Slope = %g, y-intercept = %g\n", a, b)
	fmt.Printf("Giao Ox: x = -b/a = %g\n", -b/a)
	for _, x := range []float64{0, 1, -2} {
		fmt.Printf("f(%g) = %g\n", x, a*x+b)
	}
	fmt.Println("Bảng giá trị:")
	for _, x := range []float64{-2, -1, 0, 1, 2} {
		fmt.Printf("  x=%g -> y=%g\n", x, a*x+b)
	}
}

func bai2() {
	fmt.Println("\n── Bài 2 ── Đường thẳng qua (1,4) và (3,10)")
	a, b, _ := lineFrom2Points(1, 4, 3, 10)
	fmt.Printf("y = %g·x + %g\n", a, b)
	fmt.Printf("So với y = 3x − 5: cùng slope (%g) khác b → song song.\n", a)
}

func bai3() {
	fmt.Println("\n── Bài 3 ── y = x² − 4x + 3")
	a, b, c := 1.0, -4.0, 3.0
	h, k := vertex(a, b, c)
	fmt.Printf("Đỉnh: (%g, %g)  ·  Trục đối xứng: x = %g\n", h, k, h)
	roots, st := solveQuadratic(a, b, c)
	fmt.Printf("%s  ·  Nghiệm: %v\n", st, roots)
	fmt.Printf("Giao Oy: y = f(0) = %g\n", c)
	fmt.Println("Bảng giá trị (đối xứng quanh x=2):")
	for x := -1.0; x <= 5.0; x++ {
		fmt.Printf("  x=%g -> y=%g\n", x, a*x*x+b*x+c)
	}
}

func bai4() {
	fmt.Println("\n── Bài 4 ── 2x² − 5x − 3 = 0")
	a, b, c := 2.0, -5.0, -3.0
	roots, st := solveQuadratic(a, b, c)
	fmt.Printf("(a) Công thức nghiệm: %s  ·  %v\n", st, roots)
	fmt.Println("(b) Phân tích: 2x² − 5x − 3 = (2x + 1)(x − 3) → x = -0.5 hoặc x = 3")
	fmt.Println("Kiểm tra Viète:")
	fmt.Println("  " + vieteCheck(a, b, c, roots))
}

func bai5() {
	fmt.Println("\n── Bài 5 ── Hoàn thành bình phương f(x) = 3x² + 12x + 7")
	A, h, k := completeTheSquare(3, 12, 7)
	fmt.Printf("f(x) = %g·(x − (%g))² + (%g)\n", A, h, k)
	fmt.Printf("Đỉnh = (%g, %g). Vì A=%g > 0 nên parabol mở lên, min = %g tại x = %g.\n",
		h, k, A, k, h)
}

func bai6() {
	fmt.Println("\n── Bài 6 ── Demo solveQuadratic trên nhiều input")
	cases := []struct{ a, b, c float64 }{
		{1, -5, 6},   // Δ > 0: nghiệm 2, 3
		{1, -4, 4},   // Δ = 0: nghiệm kép 2
		{1, 1, 1},    // Δ < 0: vô nghiệm thực
		{2, -5, -3},  // a ≠ 1, Δ > 0
		{0, 3, -6},   // linear: 3x − 6 = 0 → x = 2
		{0, 0, 5},    // suy biến: vô nghiệm
		{0, 0, 0},    // suy biến: vô số nghiệm
		{1, -2, 1},   // (x−1)² → nghiệm kép 1
	}
	for _, t := range cases {
		roots, st := solveQuadratic(t.a, t.b, t.c)
		fmt.Printf("a=%g b=%g c=%g  ·  %s  ·  roots=%v\n",
			t.a, t.b, t.c, st, roots)
	}
}

// Demo bonus: linear regression closed-form, khớp với ví dụ trong README B.9.
func demoLinearRegression() {
	fmt.Println("\n── Bonus ── Linear regression closed-form (3 điểm)")
	xs := []float64{1, 2, 3}
	ys := []float64{2, 3, 5}
	a, b, ok := linearRegression(xs, ys)
	if !ok {
		fmt.Println("Không khả thi.")
		return
	}
	fmt.Printf("Đường khớp: y = %.4f·x + %.4f\n", a, b)
	fmt.Println("Sai lệch tại từng điểm:")
	for i, x := range xs {
		pred := a*x + b
		fmt.Printf("  x=%g  thực=%g  dự đoán=%.4f  err=%.4f\n",
			x, ys[i], pred, ys[i]-pred)
	}
}

func main() {
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
	bai6()
	demoLinearRegression()
}
