// Lesson 07 — Hàm mũ và hàm log
// Lời giải code cho các bài tập + demo các khái niệm chính:
//   - tính e qua hai cách (giới hạn và chuỗi Taylor)
//   - sigmoid và softmax ổn định số
//   - cross-entropy loss
//   - lãi kép discrete vs continuous
//   - bảng so sánh tốc độ tăng polynomial vs exponential
//
// Chạy: go run solutions.go

package main

import (
	"fmt"
	"math"
	"math/rand"
)

// =============================================================================
// 1. Hàm cơ bản: sigmoid, softmax, cross-entropy
// =============================================================================

// sigmoid: sigma(x) = 1 / (1 + e^(-x))
// Trả về số trong (0, 1). Đối xứng qua (0, 0.5).
func sigmoid(x float64) float64 {
	// math.Exp(-x) có thể overflow khi x rất âm; Go trả về +Inf rồi 1/(1+Inf) = 0.
	// Cẩn thận hơn: nếu x > 0, dùng dạng 1/(1+e^(-x)); nếu x ≤ 0, dùng e^x/(1+e^x)
	// để tránh overflow ở mẫu (vì e^(-x) lớn). Cả hai dạng đại số tương đương.
	if x >= 0 {
		return 1.0 / (1.0 + math.Exp(-x))
	}
	ex := math.Exp(x)
	return ex / (1.0 + ex)
}

// softmax: ổn định số bằng cách trừ max trước khi exp.
// Trả về phân phối xác suất: mỗi phần tử ∈ (0, 1), tổng = 1.
func softmax(logits []float64) []float64 {
	if len(logits) == 0 {
		return nil
	}
	// Bước 1: tìm max để trừ ra (tránh overflow exp).
	m := logits[0]
	for _, z := range logits[1:] {
		if z > m {
			m = z
		}
	}
	// Bước 2: tính exp(z - m) cho mỗi phần tử.
	exps := make([]float64, len(logits))
	sum := 0.0
	for i, z := range logits {
		exps[i] = math.Exp(z - m)
		sum += exps[i]
	}
	// Bước 3: chia cho tổng.
	for i := range exps {
		exps[i] /= sum
	}
	return exps
}

// crossEntropy: L = -sum(y_i * log(p_i)).
// y là one-hot hoặc soft label, p là phân phối dự đoán (đã qua softmax).
// Clamp p để tránh log(0).
func crossEntropy(y, p []float64) float64 {
	const eps = 1e-12
	if len(y) != len(p) {
		panic("crossEntropy: y và p phải cùng độ dài")
	}
	loss := 0.0
	for i := range y {
		pi := p[i]
		if pi < eps {
			pi = eps
		}
		loss -= y[i] * math.Log(pi)
	}
	return loss
}

// =============================================================================
// 2. Tính e bằng hai cách
// =============================================================================

// eByLimit: tính e qua (1 + 1/n)^n.
// Hội tụ chậm — cần n lớn để có nhiều chữ số đúng.
func eByLimit(n int) float64 {
	return math.Pow(1.0+1.0/float64(n), float64(n))
}

// eBySeries: tính e qua chuỗi Taylor sum 1/k! với k = 0..terms-1.
// Hội tụ cực nhanh: 15 số hạng đủ cho ~15 chữ số.
func eBySeries(terms int) float64 {
	sum := 0.0
	fact := 1.0
	for k := 0; k < terms; k++ {
		if k > 0 {
			fact *= float64(k)
		}
		sum += 1.0 / fact
	}
	return sum
}

// =============================================================================
// 3. Lãi kép: discrete vs continuous
// =============================================================================

// compoundDiscrete: A = P * (1 + r)^t
func compoundDiscrete(P, r float64, t int) float64 {
	return P * math.Pow(1+r, float64(t))
}

// compoundContinuous: A = P * e^(rt)
func compoundContinuous(P, r float64, t int) float64 {
	return P * math.Exp(r*float64(t))
}

// =============================================================================
// 4. Bài 1 — Giá trị cơ bản
// =============================================================================

func solveExercise1() {
	fmt.Println("=== Bài 1 — Giá trị cơ bản ===")
	fmt.Printf("  e^0       = %v\n", math.Exp(0))
	fmt.Printf("  e^1       = %.5f\n", math.Exp(1))
	fmt.Printf("  e^2       = %.5f\n", math.Exp(2))
	fmt.Printf("  ln(1)     = %v\n", math.Log(1))
	fmt.Printf("  ln(e)     = %.5f\n", math.Log(math.E))
	fmt.Printf("  ln(e^5)   = %.5f  (kỳ vọng 5)\n", math.Log(math.Exp(5)))
	fmt.Printf("  ln(0)     = %v  (undefined — Go trả về -Inf)\n", math.Log(0))
	fmt.Println()
}

// =============================================================================
// 5. Bài 2 — Sắp xếp tốc độ tăng tại x = 20
// =============================================================================

func solveExercise2() {
	fmt.Println("=== Bài 2 — Tốc độ tăng tại x = 20 ===")
	x := 20.0
	vals := []struct {
		name string
		v    float64
	}{
		{"log₂(20)", math.Log2(x)},
		{"20", x},
		{"20 · ln(20)", x * math.Log(x)},
		{"20²", x * x},
		{"2^20", math.Pow(2, x)},
		{"e^20", math.Exp(x)},
	}
	for _, p := range vals {
		fmt.Printf("  %-14s = %.4e\n", p.name, p.v)
	}
	fmt.Println("  → Thứ tự tăng dần: log₂(20) < 20 < 20·ln(20) < 20² < 2^20 < e^20")
	fmt.Println()
}

// =============================================================================
// 6. Bài 3 — Sigmoid
// =============================================================================

func solveExercise3() {
	fmt.Println("=== Bài 3 — Sigmoid ===")
	for _, x := range []float64{0, 1, -1, 10, -10} {
		fmt.Printf("  σ(%-4g) = %.6f\n", x, sigmoid(x))
	}
	fmt.Println("  Range: (0, 1). Đối xứng qua (0, 0.5): σ(-x) = 1 - σ(x).")
	// Kiểm chứng đối xứng:
	fmt.Printf("  Kiểm: σ(1) + σ(-1) = %.6f\n", sigmoid(1)+sigmoid(-1))
	fmt.Println()
}

// =============================================================================
// 7. Bài 4 — Softmax 3 lớp
// =============================================================================

func solveExercise4() {
	fmt.Println("=== Bài 4 — Softmax [2, 1, 0] ===")
	logits := []float64{2, 1, 0}
	probs := softmax(logits)
	sum := 0.0
	for i, p := range probs {
		fmt.Printf("  softmax[%d] (logit=%g) = %.6f\n", i, logits[i], p)
		sum += p
	}
	fmt.Printf("  Tổng = %.10f (kỳ vọng 1.0)\n", sum)
	fmt.Println("  Lớp 0 (logit lớn nhất) có xác suất cao nhất.")
	fmt.Println()
}

// =============================================================================
// 8. Bài 5 — Lãi kép
// =============================================================================

func solveExercise5() {
	fmt.Println("=== Bài 5 — Lãi kép P=100, r=5%/năm ===")
	fmt.Printf("  %-10s %-15s %-15s %-10s\n", "t (năm)", "Discrete", "Continuous", "Chênh")
	for _, t := range []int{1, 5, 10, 30} {
		d := compoundDiscrete(100, 0.05, t)
		c := compoundContinuous(100, 0.05, t)
		fmt.Printf("  %-10d %-15.4f %-15.4f %-10.4f\n", t, d, c, c-d)
	}
	fmt.Println()
}

// =============================================================================
// 9. Bài 6 — Demo sigmoid/softmax trên 1000 datapoint
// =============================================================================

func solveExercise6() {
	fmt.Println("=== Bài 6 — Demo sigmoid/softmax trên 1000 datapoint ===")

	rng := rand.New(rand.NewSource(42))

	// (a) Sigmoid áp lên 1000 input ngẫu nhiên trong [-10, 10].
	const N = 1000
	minSig, maxSig := math.Inf(1), math.Inf(-1)
	for i := 0; i < N; i++ {
		x := rng.Float64()*20 - 10 // [-10, 10]
		s := sigmoid(x)
		if s < minSig {
			minSig = s
		}
		if s > maxSig {
			maxSig = s
		}
	}
	fmt.Printf("  Sigmoid trên %d input ∈ [-10, 10]:\n", N)
	fmt.Printf("    min = %.8f, max = %.8f  (đều ∈ (0, 1) ✓)\n", minSig, maxSig)

	// (b) Softmax 3 lớp với logit ngẫu nhiên.
	minSm, maxSm := math.Inf(1), math.Inf(-1)
	maxSumErr := 0.0
	for i := 0; i < N; i++ {
		logits := []float64{
			rng.Float64()*20 - 10,
			rng.Float64()*20 - 10,
			rng.Float64()*20 - 10,
		}
		probs := softmax(logits)
		sum := 0.0
		for _, p := range probs {
			if p < minSm {
				minSm = p
			}
			if p > maxSm {
				maxSm = p
			}
			sum += p
		}
		err := math.Abs(sum - 1.0)
		if err > maxSumErr {
			maxSumErr = err
		}
	}
	fmt.Printf("  Softmax 3 lớp trên %d datapoint:\n", N)
	fmt.Printf("    min prob = %.8f, max prob = %.8f  (đều ∈ (0, 1) ✓)\n", minSm, maxSm)
	fmt.Printf("    sai số tổng max = %.2e  (kỳ vọng < 1e-9)\n", maxSumErr)
	fmt.Println()
}

// =============================================================================
// 10. Demo bổ sung: hội tụ của e
// =============================================================================

func demoEConvergence() {
	fmt.Println("=== Demo — Hội tụ của e ===")
	fmt.Println("  Qua giới hạn (1 + 1/n)^n:")
	for _, n := range []int{1, 2, 5, 10, 100, 1000, 100000, 10000000} {
		fmt.Printf("    n=%-9d → %.10f\n", n, eByLimit(n))
	}
	fmt.Println("  Qua chuỗi Σ 1/k!:")
	for _, k := range []int{3, 5, 10, 15, 20} {
		fmt.Printf("    %d số hạng → %.15f\n", k, eBySeries(k))
	}
	fmt.Printf("  math.E (thực tế)   → %.15f\n", math.E)
	fmt.Println()
}

// =============================================================================
// 11. Demo bổ sung: bảng tốc độ tăng polynomial vs exponential
// =============================================================================

func demoGrowthTable() {
	fmt.Println("=== Demo — Polynomial vs Exponential ===")
	fmt.Printf("  %-6s %-12s %-12s %-15s %-15s\n", "x", "x²", "x³", "2^x", "e^x")
	for _, x := range []float64{1, 5, 10, 20, 50} {
		fmt.Printf("  %-6g %-12.4g %-12.4g %-15.4g %-15.4g\n",
			x, x*x, x*x*x, math.Pow(2, x), math.Exp(x))
	}
	fmt.Println()
}

// =============================================================================
// 12. Demo bổ sung: cross-entropy với prediction tốt vs xấu
// =============================================================================

func demoCrossEntropy() {
	fmt.Println("=== Demo — Cross-entropy loss ===")
	// Ground truth one-hot: lớp 0 đúng
	y := []float64{1, 0, 0}

	cases := []struct {
		name string
		p    []float64
	}{
		{"rất tự tin đúng [0.99, 0.005, 0.005]", []float64{0.99, 0.005, 0.005}},
		{"hơi tự tin đúng [0.7, 0.2, 0.1]", []float64{0.7, 0.2, 0.1}},
		{"phân vân [0.34, 0.33, 0.33]", []float64{0.34, 0.33, 0.33}},
		{"tự tin sai [0.01, 0.495, 0.495]", []float64{0.01, 0.495, 0.495}},
	}
	for _, c := range cases {
		loss := crossEntropy(y, c.p)
		fmt.Printf("  %-44s → loss = %.4f\n", c.name, loss)
	}
	fmt.Println()
}

// =============================================================================
// main
// =============================================================================

func main() {
	fmt.Println("Lesson 07 — Hàm mũ và hàm log: solutions")
	fmt.Println("==========================================")
	fmt.Println()

	solveExercise1()
	solveExercise2()
	solveExercise3()
	solveExercise4()
	solveExercise5()
	solveExercise6()

	demoEConvergence()
	demoGrowthTable()
	demoCrossEntropy()
}
