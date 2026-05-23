// Lesson 02 — Biến và biểu thức
//
// File này biên dịch được bằng `go run solutions.go`.
// Nội dung:
//   1. Hàm evaluate (Horner) — đánh giá đa thức bất kỳ.
//   2. Hàm evaluateNaive — cách "ngây thơ" để so sánh số phép nhân.
//   3. Demo đánh giá biểu thức cho Bài 1.
//   4. Demo đơn giản hóa biểu thức tuyến tính cho Bài 2.
//   5. Demo khai triển hằng đẳng thức cho Bài 3.
//   6. Demo phân tích nhân tử (hardcode minh họa cho Bài 4).
//
// Mọi comment bằng tiếng Việt để học sinh đọc dễ.

package main

import (
	"fmt"
	"math"
	"strings"
)

// -----------------------------------------------------------------------------
// 1. Đánh giá đa thức bằng phương pháp Horner.
//
// coeffs[i] = hệ số của x^i. Tức là:
//   P(x) = coeffs[0] + coeffs[1]*x + coeffs[2]*x^2 + ... + coeffs[n-1]*x^(n-1)
//
// Horner viết lại: ((...((a_n)x + a_{n-1})x + ...)x + a_0
// → cần n phép nhân và n phép cộng, không cần tính lũy thừa.
// -----------------------------------------------------------------------------

func evaluate(coeffs []float64, x float64) float64 {
	n := len(coeffs)
	if n == 0 {
		return 0
	}
	// Bắt đầu từ hệ số bậc cao nhất.
	result := coeffs[n-1]
	// Lặp ngược về bậc 0, mỗi bước nhân x rồi cộng hệ số kế tiếp.
	for i := n - 2; i >= 0; i-- {
		result = result*x + coeffs[i]
	}
	return result
}

// -----------------------------------------------------------------------------
// 2. Cách ngây thơ: tính từng x^i rồi cộng. Dùng để so sánh.
//    Số phép nhân = 0 + 1 + 2 + ... + (n-1) = n(n-1)/2.
// -----------------------------------------------------------------------------

func evaluateNaive(coeffs []float64, x float64) float64 {
	result := 0.0
	for i, c := range coeffs {
		result += c * math.Pow(x, float64(i))
	}
	return result
}

// -----------------------------------------------------------------------------
// Helper: in đa thức cho dễ đọc, ví dụ [1, -2, 3] → "3x^2 - 2x + 1".
// -----------------------------------------------------------------------------

func formatPoly(coeffs []float64) string {
	var parts []string
	// In từ bậc cao xuống bậc thấp.
	for i := len(coeffs) - 1; i >= 0; i-- {
		c := coeffs[i]
		if c == 0 {
			continue
		}
		var term string
		// Quy ước hiển thị hệ số: ẩn 1 và -1 trừ khi là hằng tử bậc 0.
		abs := math.Abs(c)
		var coefStr string
		if (abs == 1) && (i != 0) {
			coefStr = ""
		} else {
			coefStr = fmt.Sprintf("%g", abs)
		}
		switch i {
		case 0:
			term = fmt.Sprintf("%g", abs)
		case 1:
			term = coefStr + "x"
		default:
			term = fmt.Sprintf("%sx^%d", coefStr, i)
		}
		// Thêm dấu.
		if len(parts) == 0 {
			if c < 0 {
				term = "-" + term
			}
		} else {
			if c < 0 {
				term = " - " + term
			} else {
				term = " + " + term
			}
		}
		parts = append(parts, term)
	}
	if len(parts) == 0 {
		return "0"
	}
	return strings.Join(parts, "")
}

// -----------------------------------------------------------------------------
// Bài 1: tính f(x) = 3x^2 - 2x + 1 với x = -1, 0, 1, 2.
// Hệ số: [a0, a1, a2] = [1, -2, 3].
// -----------------------------------------------------------------------------

func bai1() {
	fmt.Println("=== Bài 1: f(x) = 3x^2 - 2x + 1 ===")
	coeffs := []float64{1, -2, 3}
	fmt.Printf("Đa thức: %s\n", formatPoly(coeffs))
	fmt.Println("| x  | 3x^2 | -2x | f(x) |")
	fmt.Println("|----|------|-----|------|")
	for _, x := range []float64{-1, 0, 1, 2} {
		fx := evaluate(coeffs, x)
		quad := 3 * x * x
		lin := -2 * x
		fmt.Printf("| %2.0f | %4.0f | %3.0f | %4.0f |\n", x, quad, lin, fx)
	}
	fmt.Println()
}

// -----------------------------------------------------------------------------
// Bài 2: đơn giản hóa 2(x+3) - 3(2x-1) + x.
// Cách làm: phân phối thủ công ra thành ax + b rồi gom.
// -----------------------------------------------------------------------------

func bai2() {
	fmt.Println("=== Bài 2: Đơn giản hóa 2(x+3) - 3(2x-1) + x ===")
	// Biểu diễn biểu thức tuyến tính là cặp (a, b) với ý nghĩa a*x + b.
	// 2*(x+3) = (2, 6)
	t1 := [2]float64{2, 6}
	// -3*(2x-1) = (-6, 3)
	t2 := [2]float64{-6, 3}
	// x = (1, 0)
	t3 := [2]float64{1, 0}

	a := t1[0] + t2[0] + t3[0]
	b := t1[1] + t2[1] + t3[1]

	fmt.Printf("  2(x+3)    → %2.0fx + %2.0f\n", t1[0], t1[1])
	fmt.Printf("  -3(2x-1)  → %2.0fx + %2.0f\n", t2[0], t2[1])
	fmt.Printf("  x         → %2.0fx + %2.0f\n", t3[0], t3[1])
	fmt.Printf("  Tổng:     → %.0fx + %.0f\n", a, b)

	// Kiểm tra bằng cách thay x cụ thể.
	for _, x := range []float64{0, 1, 5} {
		orig := 2*(x+3) - 3*(2*x-1) + x
		simp := a*x + b
		fmt.Printf("    Kiểm tra x=%2.0f: gốc = %3.0f, rút gọn = %3.0f  %s\n",
			x, orig, simp, okMark(orig == simp))
	}
	fmt.Println()
}

func okMark(ok bool) string {
	if ok {
		return "✓"
	}
	return "✗"
}

// -----------------------------------------------------------------------------
// Bài 3: khai triển.
// (a) (2x - 3)^2: dùng (a-b)^2 = a^2 - 2ab + b^2 với a=2x, b=3.
// (b) (x+1)(x-2)(x+3): nhân lần lượt, dùng convolution của hệ số.
// -----------------------------------------------------------------------------

// multiplyPolys nhân hai đa thức biểu diễn bằng slice hệ số.
// p[i] là hệ số x^i. Kết quả có bậc deg(p) + deg(q).
func multiplyPolys(p, q []float64) []float64 {
	result := make([]float64, len(p)+len(q)-1)
	for i, a := range p {
		for j, b := range q {
			result[i+j] += a * b
		}
	}
	return result
}

func bai3() {
	fmt.Println("=== Bài 3: Khai triển ===")

	// (a) (2x - 3)^2 = 4x^2 - 12x + 9
	// Hệ số (2x - 3): [-3, 2]
	binom := []float64{-3, 2}
	square := multiplyPolys(binom, binom)
	fmt.Printf("(a) (2x - 3)^2 = %s\n", formatPoly(square))

	// (b) (x+1)(x-2)(x+3)
	p1 := []float64{1, 1}  // (x+1) = 1 + 1*x
	p2 := []float64{-2, 1} // (x-2)
	p3 := []float64{3, 1}  // (x+3)
	step := multiplyPolys(p1, p2)
	fmt.Printf("(b) (x+1)(x-2) = %s\n", formatPoly(step))
	full := multiplyPolys(step, p3)
	fmt.Printf("    ... * (x+3) = %s\n", formatPoly(full))
	fmt.Println()
}

// -----------------------------------------------------------------------------
// Bài 4: Phân tích nhân tử.
// Không cài thuật toán symbolic tổng quát; hardcode 3 ví dụ và verify bằng
// nhân ngược lại để chứng tỏ đáp án đúng.
// -----------------------------------------------------------------------------

func bai4() {
	fmt.Println("=== Bài 4: Phân tích nhân tử ===")

	// (a) x^2 - 9 = (x-3)(x+3). Verify: (x-3)(x+3) = x^2 - 9.
	original := []float64{-9, 0, 1}
	factor1 := []float64{-3, 1} // (x - 3)
	factor2 := []float64{3, 1}  // (x + 3)
	verify := multiplyPolys(factor1, factor2)
	fmt.Printf("(a) %s = (x-3)(x+3)\n", formatPoly(original))
	fmt.Printf("    Nhân ngược: (x-3)(x+3) = %s  %s\n",
		formatPoly(verify), okMark(equalSlices(original, verify)))

	// (b) x^2 + 5x + 6 = (x+2)(x+3).
	original = []float64{6, 5, 1}
	factor1 = []float64{2, 1} // (x + 2)
	factor2 = []float64{3, 1} // (x + 3)
	verify = multiplyPolys(factor1, factor2)
	fmt.Printf("(b) %s = (x+2)(x+3)\n", formatPoly(original))
	fmt.Printf("    Nhân ngược: (x+2)(x+3) = %s  %s\n",
		formatPoly(verify), okMark(equalSlices(original, verify)))

	// (c) 2x^2 - 8 = 2(x-2)(x+2). Verify bằng nhân (x-2)(x+2) rồi nhân scalar 2.
	original = []float64{-8, 0, 2}
	factor1 = []float64{-2, 1} // (x - 2)
	factor2 = []float64{2, 1}  // (x + 2)
	inner := multiplyPolys(factor1, factor2)
	verify = scalarMul(2, inner)
	fmt.Printf("(c) %s = 2(x-2)(x+2)\n", formatPoly(original))
	fmt.Printf("    Nhân ngược: 2*(x-2)(x+2) = %s  %s\n",
		formatPoly(verify), okMark(equalSlices(original, verify)))
	fmt.Println()
}

func scalarMul(k float64, p []float64) []float64 {
	out := make([]float64, len(p))
	for i, c := range p {
		out[i] = k * c
	}
	return out
}

func equalSlices(a, b []float64) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if math.Abs(a[i]-b[i]) > 1e-9 {
			return false
		}
	}
	return true
}

// -----------------------------------------------------------------------------
// Bài 5: chứng minh Horner cho cùng kết quả với evaluateNaive,
//        và đếm phép nhân để minh họa ưu thế.
// -----------------------------------------------------------------------------

func bai5() {
	fmt.Println("=== Bài 5: Horner vs Naive ===")
	// Ví dụ minh họa: P(x) = 3x^3 + 2x^2 - x + 5
	coeffs := []float64{5, -1, 2, 3}
	fmt.Printf("P(x) = %s\n", formatPoly(coeffs))

	for _, x := range []float64{-1, 0, 1, 2, 3} {
		horner := evaluate(coeffs, x)
		naive := evaluateNaive(coeffs, x)
		fmt.Printf("  x=%2.0f: Horner = %6.0f, Naive = %6.0f  %s\n",
			x, horner, naive, okMark(math.Abs(horner-naive) < 1e-9))
	}

	// Số phép nhân theo bậc n.
	fmt.Println("Số phép nhân:")
	fmt.Println("| Bậc n | Horner | Naive (n(n+1)/2) |")
	fmt.Println("|-------|--------|------------------|")
	for _, n := range []int{1, 2, 3, 5, 10, 100} {
		fmt.Printf("|  %3d  |  %3d   |       %5d      |\n",
			n, n, n*(n+1)/2)
	}
	fmt.Println()
}

// -----------------------------------------------------------------------------
// main: chạy tuần tự các bài.
// -----------------------------------------------------------------------------

func main() {
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
}
