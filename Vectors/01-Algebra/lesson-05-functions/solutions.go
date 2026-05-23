// Lesson 05 — Hàm số là gì
//
// File này minh họa các khái niệm về hàm số trong Go:
//   - Một số hàm mẫu: linear, quadratic, exponential, log, abs, sigmoid, ReLU.
//   - Composition: compose(f, g) → g ∘ f.
//   - In bảng giá trị (table) cho một hàm.
//   - findInverse: tìm hàm ngược bằng bisection cho hàm đơn điệu.
//   - Đáp án các bài tập trong README.
//
// Chạy: go run solutions.go

package main

import (
	"fmt"
	"math"
)

// ====================================================================
// 1. Một vài hàm mẫu (mỗi cái là func(float64) float64)
// ====================================================================

// Hàm bậc 1: f(x) = 3x − 2 (dùng trong Bài 1).
func linear(x float64) float64 {
	return 3*x - 2
}

// Hàm bậc 2: f(x) = x² + 1.
func quadratic(x float64) float64 {
	return x*x + 1
}

// Hàm mũ tự nhiên: f(x) = e^x.
func expFn(x float64) float64 {
	return math.Exp(x)
}

// Hàm log tự nhiên: f(x) = ln(x). Domain: x > 0.
func logFn(x float64) float64 {
	return math.Log(x)
}

// Giá trị tuyệt đối: f(x) = |x|.
func absFn(x float64) float64 {
	return math.Abs(x)
}

// Sigmoid: σ(x) = 1 / (1 + e^(-x)). Range = (0, 1). Dùng trong ML.
func sigmoid(x float64) float64 {
	return 1.0 / (1.0 + math.Exp(-x))
}

// ReLU: relu(x) = max(0, x). Activation phổ biến nhất trong deep learning.
func relu(x float64) float64 {
	if x > 0 {
		return x
	}
	return 0
}

// ====================================================================
// 2. Composition — nhận f, g và trả về g ∘ f
// ====================================================================
//
// (g ∘ f)(x) = g(f(x)). Hàm f chạy trước, kết quả của f đi vào g.
// Lưu ý: thứ tự quan trọng — compose(f, g) KHÁC compose(g, f).
func compose(f, g func(float64) float64) func(float64) float64 {
	return func(x float64) float64 {
		return g(f(x))
	}
}

// ====================================================================
// 3. In bảng giá trị x | f(x)
// ====================================================================
//
// Cho một hàm và một dải [lo, hi] với step, in ra bảng giá trị.
// Đây chính là "cách 2" trong 4 cách biểu diễn hàm số (mục 4 của README).
func printTable(name string, f func(float64) float64, lo, hi, step float64) {
	fmt.Printf("\nBảng giá trị của %s\n", name)
	fmt.Printf("%8s | %12s\n", "x", "f(x)")
	fmt.Println("---------+--------------")
	for x := lo; x <= hi+1e-9; x += step {
		fy := f(x)
		// In NaN/Inf gọn gàng khi gặp giá trị ngoài domain.
		if math.IsNaN(fy) || math.IsInf(fy, 0) {
			fmt.Printf("%8.3f | %12s\n", x, "undefined")
		} else {
			fmt.Printf("%8.3f | %12.4f\n", x, fy)
		}
	}
}

// ====================================================================
// 4. findInverse — tìm x sao cho f(x) = y, bằng bisection
// ====================================================================
//
// Yêu cầu: f đơn điệu (monotonic) trên [lo, hi]. Nếu không đơn điệu,
// hàm ngược không xác định duy nhất (xem mục 7.2 của README).
//
// Thuật toán bisection: cứ chia đôi đoạn, giữ phía có nghiệm. Sau ~50
// lần lặp, độ chính xác đạt xấp xỉ 2^-50 ≈ 10^-15 — đủ cho float64.
func findInverse(f func(float64) float64, y, lo, hi float64) float64 {
	flo, fhi := f(lo), f(hi)
	// Kiểm tra y có nằm giữa f(lo) và f(hi) không (cả 2 chiều đơn điệu).
	if (y < math.Min(flo, fhi)) || (y > math.Max(flo, fhi)) {
		return math.NaN()
	}
	// Xác định chiều đơn điệu để biết "nghiệm nằm bên nào" sau khi đánh giá midpoint.
	increasing := flo < fhi
	for i := 0; i < 80; i++ {
		mid := (lo + hi) / 2
		fmid := f(mid)
		// Nếu đạt độ chính xác đủ thì dừng sớm.
		if math.Abs(fmid-y) < 1e-12 {
			return mid
		}
		if (increasing && fmid < y) || (!increasing && fmid > y) {
			lo = mid
		} else {
			hi = mid
		}
	}
	return (lo + hi) / 2
}

// ====================================================================
// 5. Đáp án các bài tập trong README
// ====================================================================

// Bài 1: f(x) = 3x − 2.
//
//	a) f(0), f(2), f(-1), f(0.5).
//	b) Tìm x để f(x) = 10.
func bai1() {
	fmt.Println("\n=== Bài 1: f(x) = 3x − 2 ===")
	for _, x := range []float64{0, 2, -1, 0.5} {
		fmt.Printf("  f(%4.1f) = %6.2f\n", x, linear(x))
	}
	// f(x) = 10 ⟹ 3x − 2 = 10 ⟹ x = 4.
	// Dùng findInverse để kiểm tra số học:
	x := findInverse(linear, 10, -100, 100)
	fmt.Printf("  Giải f(x) = 10 ⟹ x = %.6f (đáp án chính xác: 4)\n", x)
}

// Bài 2: tìm domain.
//
// Phần "tìm domain" là phân tích văn bản, không tính được trực tiếp.
// Ta chỉ in ra kết luận và sample điểm hợp lệ / không hợp lệ.
func bai2() {
	fmt.Println("\n=== Bài 2: Domain của các hàm ===")
	cases := []struct {
		name   string
		domain string
		f      func(float64) float64
		probe  []float64 // điểm mẫu để xem hàm có trả về số thực không
	}{
		{"f(x) = √(x − 3)", "[3, +∞)", func(x float64) float64 { return math.Sqrt(x - 3) }, []float64{2, 3, 4, 12}},
		{"g(x) = 1/(x² − 4)", "ℝ \\ {−2, 2}", func(x float64) float64 { return 1.0 / (x*x - 4) }, []float64{-2, 0, 2, 3}},
		{"h(x) = ln(x)", "(0, +∞)", math.Log, []float64{-1, 0, 1, math.E}},
	}
	for _, c := range cases {
		fmt.Printf("  %s → Domain = %s\n", c.name, c.domain)
		for _, x := range c.probe {
			y := c.f(x)
			if math.IsNaN(y) || math.IsInf(y, 0) {
				fmt.Printf("    x = %5.2f → undefined (ngoài domain)\n", x)
			} else {
				fmt.Printf("    x = %5.2f → %.4f\n", x, y)
			}
		}
	}
}

// Bài 3: f(x) = x + 1, g(x) = 2x. Tính (f∘g)(x), (g∘f)(x), f(f(x)).
func bai3() {
	fmt.Println("\n=== Bài 3: Composition ===")
	f := func(x float64) float64 { return x + 1 }
	g := func(x float64) float64 { return 2 * x }

	fog := compose(g, f) // (f ∘ g)(x) = f(g(x))
	gof := compose(f, g) // (g ∘ f)(x) = g(f(x))
	ff := compose(f, f)  // f(f(x))

	for _, x := range []float64{0, 1, 3, -2} {
		fmt.Printf("  x = %2.0f | (f∘g)(x) = %3.0f   (g∘f)(x) = %3.0f   f(f(x)) = %3.0f\n",
			x, fog(x), gof(x), ff(x))
	}
	fmt.Println("  ⟹ (f∘g)(x) = 2x + 1, (g∘f)(x) = 2x + 2 — KHÁC nhau với mọi x.")
}

// Bài 4: tìm hàm ngược của f(x) = 5x − 7, g(x) = (x+1)/(x-2), h(x) = e^(2x).
func bai4() {
	fmt.Println("\n=== Bài 4: Hàm ngược ===")

	f := func(x float64) float64 { return 5*x - 7 }
	fInv := func(x float64) float64 { return (x + 7) / 5 } // (x + 7) / 5

	g := func(x float64) float64 { return (x + 1) / (x - 2) }
	gInv := func(x float64) float64 { return (2*x + 1) / (x - 1) }

	h := func(x float64) float64 { return math.Exp(2 * x) }
	hInv := func(x float64) float64 { return math.Log(x) / 2 }

	// Phép thử "vào ra": f(f⁻¹(y)) = y và f⁻¹(f(x)) = x.
	checks := []struct {
		name string
		f    func(float64) float64
		fInv func(float64) float64
		xs   []float64
	}{
		{"f(x) = 5x − 7 → f⁻¹(x) = (x+7)/5", f, fInv, []float64{0, 3, -1, 10}},
		{"g(x) = (x+1)/(x−2) → g⁻¹(x) = (2x+1)/(x−1)", g, gInv, []float64{0, 3, 5}},
		{"h(x) = e^(2x) → h⁻¹(x) = ln(x)/2", h, hInv, []float64{0, 1, -0.5}},
	}
	for _, c := range checks {
		fmt.Printf("  %s\n", c.name)
		for _, x := range c.xs {
			y := c.f(x)
			xBack := c.fInv(y)
			fmt.Printf("    x=%5.2f → f(x)=%9.4f → f⁻¹(f(x))=%7.4f\n", x, y, xBack)
		}
	}
}

// Bài 5: compose(f, g) — đã viết ở mục 2. Test với f(x)=2x+1, g(x)=x².
func bai5() {
	fmt.Println("\n=== Bài 5: compose ===")
	f := func(x float64) float64 { return 2*x + 1 }
	g := func(x float64) float64 { return x * x }

	gof := compose(f, g)
	for _, x := range []float64{0, 1, 3, -1} {
		fmt.Printf("  f(%2.0f) = %3.0f, g(f(%2.0f)) = %3.0f\n", x, f(x), x, gof(x))
	}
}

// ====================================================================
// main — chạy demo + giải bài tập
// ====================================================================
func main() {
	fmt.Println("=== Demo: in bảng giá trị một vài hàm ===")
	printTable("f(x) = x² + 1", quadratic, -3, 3, 1)
	printTable("σ(x) = sigmoid(x)", sigmoid, -4, 4, 1)
	printTable("relu(x)", relu, -3, 3, 1)

	fmt.Println("\n=== Demo: findInverse (bisection) ===")
	// f(x) = e^x → tìm x sao cho e^x = 7.389 (kết quả phải ≈ 2 vì e² ≈ 7.389).
	x := findInverse(expFn, 7.389056, -10, 10)
	fmt.Printf("  e^x = 7.389056 ⟹ x ≈ %.6f (kỳ vọng ≈ 2)\n", x)

	// Tìm x sao cho 3x − 2 = 100.
	x = findInverse(linear, 100, -1000, 1000)
	fmt.Printf("  3x − 2 = 100 ⟹ x = %.6f (đáp án: 34)\n", x)

	// Giải bài tập.
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
}
