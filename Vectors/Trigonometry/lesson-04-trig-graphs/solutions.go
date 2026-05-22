// Lesson 04 — Đồ thị hàm lượng giác (trig graphs)
// Lời giải code cho bài tập và demo các khái niệm chính:
//   - analyzeWave: phân tích A, B, C, D của phương trình y = A·sin(Bx+C) + D
//   - samplePoints: sinh điểm cho đồ thị
//   - fourierSquare: xấp xỉ sóng vuông bằng chuỗi Fourier
//   - In bảng giá trị sin, cos, tan tại các góc đặc biệt
//   - Demo điện AC 50 Hz
//
// Chạy: go run solutions.go

package main

import (
	"fmt"
	"math"
)

// =============================================================================
// 1. Phân tích phương trình y = A·sin(B·x + C) + D
// =============================================================================

// analyzeWave trả về 4 đặc trưng của sóng sin tổng quát:
//   - period: chu kỳ T = 2π / |B|
//   - freq:   tần số f = 1/T
//   - rangeMin / rangeMax: D - |A| và D + |A|
func analyzeWave(A, B, C, D float64) (period, freq, rangeMin, rangeMax float64) {
	absB := math.Abs(B)
	if absB == 0 {
		// Trường hợp suy biến: B = 0 → y = A·sin(C) + D là hằng số
		return math.Inf(1), 0, A*math.Sin(C) + D, A*math.Sin(C) + D
	}
	period = 2 * math.Pi / absB
	freq = 1.0 / period
	absA := math.Abs(A)
	rangeMin = D - absA
	rangeMax = D + absA
	return
}

// =============================================================================
// 2. Sinh điểm để vẽ đồ thị
// =============================================================================

// samplePoints chia [xMin, xMax] thành n-1 khoảng đều, trả về (xs, ys)
// với y = A·sin(B·x + C) + D.
func samplePoints(A, B, C, D, xMin, xMax float64, n int) (xs, ys []float64) {
	if n < 2 {
		return nil, nil
	}
	xs = make([]float64, n)
	ys = make([]float64, n)
	step := (xMax - xMin) / float64(n-1)
	for i := 0; i < n; i++ {
		x := xMin + float64(i)*step
		xs[i] = x
		ys[i] = A*math.Sin(B*x+C) + D
	}
	return
}

// =============================================================================
// 3. Xấp xỉ sóng vuông bằng chuỗi Fourier
// =============================================================================

// fourierSquare tính xấp xỉ sóng vuông tại x bằng nHarmonics hài đầu tiên:
//
//	square(x) ≈ (4/π) · Σ_{k=0}^{nHarmonics-1} sin((2k+1)·x) / (2k+1)
//
// Khi nHarmonics → ∞, kết quả tiến tới sóng vuông biên độ ±1, chu kỳ 2π.
func fourierSquare(x float64, nHarmonics int) float64 {
	sum := 0.0
	for k := 0; k < nHarmonics; k++ {
		odd := float64(2*k + 1)
		sum += math.Sin(odd*x) / odd
	}
	return (4.0 / math.Pi) * sum
}

// =============================================================================
// 4. Bảng giá trị sin / cos / tan tại các góc đặc biệt
// =============================================================================

// printSpecialAngleTable in bảng sin/cos/tan tại 13 góc chuẩn trên [0, 2π].
func printSpecialAngleTable() {
	type entry struct {
		rad  float64
		name string
	}
	entries := []entry{
		{0, "0"},
		{math.Pi / 6, "π/6"},
		{math.Pi / 4, "π/4"},
		{math.Pi / 3, "π/3"},
		{math.Pi / 2, "π/2"},
		{2 * math.Pi / 3, "2π/3"},
		{3 * math.Pi / 4, "3π/4"},
		{5 * math.Pi / 6, "5π/6"},
		{math.Pi, "π"},
		{7 * math.Pi / 6, "7π/6"},
		{5 * math.Pi / 4, "5π/4"},
		{4 * math.Pi / 3, "4π/3"},
		{3 * math.Pi / 2, "3π/2"},
		{5 * math.Pi / 3, "5π/3"},
		{7 * math.Pi / 4, "7π/4"},
		{11 * math.Pi / 6, "11π/6"},
		{2 * math.Pi, "2π"},
	}
	fmt.Printf("%-8s | %10s | %10s | %12s\n", "x", "sin x", "cos x", "tan x")
	fmt.Println("---------+------------+------------+--------------")
	for _, e := range entries {
		s := math.Sin(e.rad)
		c := math.Cos(e.rad)
		var tanStr string
		// tan undefined khi cos ≈ 0 (tại π/2 và 3π/2)
		if math.Abs(c) < 1e-9 {
			tanStr = "undefined"
		} else {
			tanStr = fmt.Sprintf("%12.4f", s/c)
		}
		fmt.Printf("%-8s | %10.4f | %10.4f | %s\n", e.name, s, c, tanStr)
	}
}

// =============================================================================
// 5. Lời giải các bài tập
// =============================================================================

// solveExercise2: phân tích y = 3·sin(2x - π/3) + 1
func solveExercise2() {
	A, B, C, D := 3.0, 2.0, -math.Pi/3, 1.0
	period, freq, rmin, rmax := analyzeWave(A, B, C, D)
	phaseShift := -C / B // dấu - vì sin(B(x - h)) = sin(Bx - Bh), so sánh C = -Bh → h = -C/B
	fmt.Println("Bài 2: y = 3·sin(2x - π/3) + 1")
	fmt.Printf("  A = %.4f   (biên độ = |A| = %.4f)\n", A, math.Abs(A))
	fmt.Printf("  B = %.4f   chu kỳ T = 2π/|B| = %.4f\n", B, period)
	fmt.Printf("  C = %.4f   pha dịch ngang = -C/B = %.4f  (dấu + nghĩa là dịch phải)\n", C, phaseShift)
	fmt.Printf("  D = %.4f   dịch dọc\n", D)
	fmt.Printf("  Tần số f = %.4f, range = [%.4f, %.4f]\n", freq, rmin, rmax)
	fmt.Printf("  y(0)   = %.4f\n", A*math.Sin(B*0+C)+D)
	fmt.Printf("  y(π/3) = %.4f\n", A*math.Sin(B*math.Pi/3+C)+D)
	fmt.Println()
}

// solveExercise3: điện AC 50 Hz, biên độ đỉnh 220V
func solveExercise3() {
	A := 220.0
	f := 50.0
	B := 2 * math.Pi * f // tần số góc ω = 2πf = 100π
	C, D := 0.0, 0.0
	fmt.Println("Bài 3: V(t) = 220·sin(100π·t),  f = 50 Hz")
	fmt.Printf("  Tần số góc ω = B = %.4f rad/s (≈ 100π)\n", B)
	fmt.Printf("  Chu kỳ T = 1/f = %.6f s = %.1f ms\n", 1/f, 1000/f)
	times := []float64{0, 0.005, 0.010, 0.015, 0.020}
	fmt.Printf("%-10s | %-12s | %-10s\n", "t (s)", "Bt (rad)", "V (V)")
	fmt.Println("-----------+--------------+-----------")
	for _, t := range times {
		v := A*math.Sin(B*t+C) + D
		fmt.Printf("%-10.4f | %-12.4f | %-10.4f\n", t, B*t, v)
	}
	fmt.Println()
}

// solveExercise4: bảng giá trị y = sin x + sin(3x)/3
func solveExercise4() {
	fmt.Println("Bài 4: y = sin(x) + sin(3x)/3 (xấp xỉ Fourier 2 hài cho sóng vuông, không chuẩn hóa 4/π)")
	fmt.Printf("%-10s | %-10s | %-12s | %-10s\n", "x", "sin x", "sin(3x)/3", "y")
	fmt.Println("-----------+------------+--------------+-----------")
	n := 13
	for i := 0; i < n; i++ {
		x := 2 * math.Pi * float64(i) / float64(n-1)
		s1 := math.Sin(x)
		s3 := math.Sin(3*x) / 3.0
		fmt.Printf("%-10.4f | %-10.4f | %-12.4f | %-10.4f\n", x, s1, s3, s1+s3)
	}
	fmt.Println()
}

// solveExercise5: kiểm tra cos x = sin(x + π/2)
func solveExercise5() {
	fmt.Println("Bài 5: kiểm tra đồng nhất thức cos(x) = sin(x + π/2)")
	fmt.Printf("%-10s | %-10s | %-14s | %-10s\n", "x", "cos x", "sin(x + π/2)", "Δ")
	fmt.Println("-----------+------------+----------------+-----------")
	xs := []float64{0, math.Pi / 4, math.Pi / 2, 3 * math.Pi / 4, math.Pi,
		5 * math.Pi / 4, 3 * math.Pi / 2, 7 * math.Pi / 4, 2 * math.Pi}
	maxDiff := 0.0
	for _, x := range xs {
		c := math.Cos(x)
		s := math.Sin(x + math.Pi/2)
		d := math.Abs(c - s)
		if d > maxDiff {
			maxDiff = d
		}
		fmt.Printf("%-10.4f | %-10.4f | %-14.4f | %-10.2e\n", x, c, s, d)
	}
	fmt.Printf("Δ tối đa: %.2e — về cơ bản bằng 0 (sai số floating-point)\n\n", maxDiff)
}

// =============================================================================
// 6. Demo Fourier xấp xỉ sóng vuông
// =============================================================================

func demoFourierSquare() {
	fmt.Println("Demo Fourier: xấp xỉ sóng vuông tại x = π/4 (giá trị thật = +1)")
	fmt.Printf("%-15s | %-15s | %-15s\n", "nHarmonics", "approx", "sai số")
	fmt.Println("----------------+-----------------+-----------------")
	for _, n := range []int{1, 3, 5, 10, 20, 50, 100} {
		val := fourierSquare(math.Pi/4, n)
		err := math.Abs(val - 1.0)
		fmt.Printf("%-15d | %-15.6f | %-15.6f\n", n, val, err)
	}
	fmt.Println()
	fmt.Println("Demo Fourier tại x = π/2 (giá trị thật = +1, đỉnh sóng vuông):")
	fmt.Printf("%-15s | %-15s\n", "nHarmonics", "approx")
	fmt.Println("----------------+-----------------")
	for _, n := range []int{1, 3, 5, 10, 50} {
		val := fourierSquare(math.Pi/2, n)
		fmt.Printf("%-15d | %-15.6f\n", n, val)
	}
	fmt.Println()
}

// =============================================================================
// 7. Demo cuối: bảng cho y = 3·sin(2x - π/3) + 1
// =============================================================================

func demoAnalyzeWave() {
	A, B, C, D := 3.0, 2.0, -math.Pi/3, 1.0
	period, freq, rmin, rmax := analyzeWave(A, B, C, D)
	fmt.Println("Demo analyzeWave + samplePoints: y = 3·sin(2x - π/3) + 1")
	fmt.Printf("  Period  = %.4f (≈ π)\n", period)
	fmt.Printf("  Freq    = %.4f\n", freq)
	fmt.Printf("  Range   = [%.4f, %.4f]\n", rmin, rmax)
	xs, ys := samplePoints(A, B, C, D, 0, 2*math.Pi, 12)
	fmt.Printf("%-10s | %-10s\n", "x", "y")
	fmt.Println("-----------+-----------")
	for i := range xs {
		fmt.Printf("%-10.4f | %-10.4f\n", xs[i], ys[i])
	}
	fmt.Println()
}

// =============================================================================
// MAIN
// =============================================================================

func main() {
	fmt.Println("========================================================")
	fmt.Println("Lesson 04 — Đồ thị hàm lượng giác — lời giải code")
	fmt.Println("========================================================\n")

	fmt.Println("--- Bảng giá trị sin/cos/tan tại các góc đặc biệt ---")
	printSpecialAngleTable()
	fmt.Println()

	fmt.Println("--- Bài 2 ---")
	solveExercise2()

	fmt.Println("--- Bài 3 ---")
	solveExercise3()

	fmt.Println("--- Bài 4 ---")
	solveExercise4()

	fmt.Println("--- Bài 5 ---")
	solveExercise5()

	fmt.Println("--- Demo Fourier sóng vuông ---")
	demoFourierSquare()

	fmt.Println("--- Demo analyzeWave + samplePoints ---")
	demoAnalyzeWave()
}
