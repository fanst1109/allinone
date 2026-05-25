// Lesson 03 — Đường tròn đơn vị (Unit Circle)
//
// Chạy: go run solutions.go
//
// File này gồm:
//   - Các hàm tiện ích: pointOnCircle, whichQuadrant, referenceAngle
//   - Bảng tọa độ cho 12 góc đặc biệt
//   - coterminal: sinh các góc đồng kết
//   - Verify công thức quy gọn cho 5 góc
//   - Đáp án các bài tập trong README

package main

import (
	"fmt"
	"math"
)

const eps = 1e-9

// ============================================================
// 1. Hàm tiện ích
// ============================================================

// pointOnCircle trả về tọa độ (cos θ, sin θ) — điểm P trên đường tròn đơn vị
// ứng với góc theta (radian).
func pointOnCircle(theta float64) (x, y float64) {
	return math.Cos(theta), math.Sin(theta)
}

// normalizeAngle đưa góc về khoảng [0, 2π).
func normalizeAngle(theta float64) float64 {
	t := math.Mod(theta, 2*math.Pi)
	if t < 0 {
		t += 2 * math.Pi
	}
	return t
}

// whichQuadrant trả về quadrant chứa điểm P ứng với góc theta:
//
//	1, 2, 3, 4 = QI, QII, QIII, QIV
//	0          = nằm trên trục tọa độ (Ox±, Oy±)
//
// Hàm tự quy theta về [0, 2π).
func whichQuadrant(theta float64) int {
	t := normalizeAngle(theta)
	switch {
	case math.Abs(t) < eps || math.Abs(t-2*math.Pi) < eps:
		return 0 // trục Ox+
	case math.Abs(t-math.Pi/2) < eps:
		return 0 // trục Oy+
	case math.Abs(t-math.Pi) < eps:
		return 0 // trục Ox-
	case math.Abs(t-3*math.Pi/2) < eps:
		return 0 // trục Oy-
	case t < math.Pi/2:
		return 1
	case t < math.Pi:
		return 2
	case t < 3*math.Pi/2:
		return 3
	default:
		return 4
	}
}

// referenceAngle trả về góc tham chiếu α ∈ [0, π/2] — khoảng cách góc
// từ bán kính OP tới trục Ox gần nhất.
func referenceAngle(theta float64) float64 {
	t := normalizeAngle(theta)
	switch {
	case t <= math.Pi/2:
		return t
	case t <= math.Pi:
		return math.Pi - t
	case t <= 3*math.Pi/2:
		return t - math.Pi
	default:
		return 2*math.Pi - t
	}
}

// coterminal sinh `count` góc đồng kết với theta (mỗi cái chênh 2π).
// Bao gồm cả phía âm.
func coterminal(theta float64, count int) []float64 {
	out := make([]float64, 0, count)
	for k := -count / 2; k < (count+1)/2; k++ {
		out = append(out, theta+float64(k)*2*math.Pi)
	}
	return out
}

// ============================================================
// 2. Bảng 12 góc đặc biệt
// ============================================================

type specialAngle struct {
	degLabel string
	radLabel string
	radValue float64
}

var specials = []specialAngle{
	{"0°", "0", 0},
	{"30°", "π/6", math.Pi / 6},
	{"45°", "π/4", math.Pi / 4},
	{"60°", "π/3", math.Pi / 3},
	{"90°", "π/2", math.Pi / 2},
	{"120°", "2π/3", 2 * math.Pi / 3},
	{"135°", "3π/4", 3 * math.Pi / 4},
	{"150°", "5π/6", 5 * math.Pi / 6},
	{"180°", "π", math.Pi},
	{"210°", "7π/6", 7 * math.Pi / 6},
	{"225°", "5π/4", 5 * math.Pi / 4},
	{"240°", "4π/3", 4 * math.Pi / 3},
	{"270°", "3π/2", 3 * math.Pi / 2},
	{"300°", "5π/3", 5 * math.Pi / 3},
	{"315°", "7π/4", 7 * math.Pi / 4},
	{"330°", "11π/6", 11 * math.Pi / 6},
}

func printSpecialTable() {
	fmt.Println("=== Bảng 12 (+4) góc đặc biệt trên đường tròn đơn vị ===")
	fmt.Printf("%-6s %-6s %-9s %-9s %-15s %s\n",
		"deg", "rad", "cos θ", "sin θ", "tan θ", "quadrant/trục")
	fmt.Println("--------------------------------------------------------------------")
	for _, s := range specials {
		x, y := pointOnCircle(s.radValue)
		tan := "—"
		if math.Abs(x) > eps {
			tan = fmt.Sprintf("%.4f", y/x)
		}
		q := whichQuadrant(s.radValue)
		qStr := fmt.Sprintf("Q%d", q)
		if q == 0 {
			qStr = "trục"
		}
		fmt.Printf("%-6s %-6s %+8.4f %+8.4f %-15s %s\n",
			s.degLabel, s.radLabel, x, y, tan, qStr)
	}
}

// ============================================================
// 3. Verify công thức quy gọn
// ============================================================

func verifyReductionFormulas() {
	fmt.Println("\n=== Verify công thức quy gọn cho 5 góc ===")
	testThetas := []float64{
		math.Pi / 6,  // 30°
		math.Pi / 4,  // 45°
		math.Pi / 3,  // 60°
		2 * math.Pi / 3, // 120°
		5 * math.Pi / 4, // 225°
	}
	fmt.Printf("%-8s %-22s %-22s %-22s\n",
		"θ (deg)",
		"sin(-θ) vs -sin θ",
		"cos(π-θ) vs -cos θ",
		"sin(2π+θ) vs sin θ")
	fmt.Println("------------------------------------------------------------------------------")
	for _, th := range testThetas {
		deg := th * 180 / math.Pi
		// sin(-θ) = -sin θ
		a1 := math.Sin(-th)
		a2 := -math.Sin(th)
		// cos(π - θ) = -cos θ
		b1 := math.Cos(math.Pi - th)
		b2 := -math.Cos(th)
		// sin(2π + θ) = sin θ
		c1 := math.Sin(2*math.Pi + th)
		c2 := math.Sin(th)
		fmt.Printf("%6.1f°   %+.4f = %+.4f   %+.4f = %+.4f   %+.4f = %+.4f\n",
			deg, a1, a2, b1, b2, c1, c2)
	}
	fmt.Println("(mọi cặp khớp đến vài chữ số thập phân ⇒ công thức quy gọn được kiểm chứng số)")
}

// ============================================================
// 4. Bài 1: Bảng giá trị cho 12 góc + 100°
// ============================================================

func solveBai1() {
	fmt.Println("\n=== Bài 1: Bảng giá trị cho 12 góc + 1 góc bất kỳ ===")
	cases := []struct {
		label string
		theta float64
	}{
		{"a) 0°", 0},
		{"b) π/6 (30°)", math.Pi / 6},
		{"c) π/3 (60°)", math.Pi / 3},
		{"d) 90°", math.Pi / 2},
		{"e) 2π/3 (120°)", 2 * math.Pi / 3},
		{"f) 135°", 3 * math.Pi / 4},
		{"g) π (180°)", math.Pi},
		{"h) 7π/6 (210°)", 7 * math.Pi / 6},
		{"i) 240°", 4 * math.Pi / 3},
		{"j) 3π/2 (270°)", 3 * math.Pi / 2},
		{"k) 11π/6 (330°)", 11 * math.Pi / 6},
		{"l) 100° (góc bất kỳ)", 100 * math.Pi / 180},
	}
	for _, c := range cases {
		x, y := pointOnCircle(c.theta)
		tan := "không xác định"
		if math.Abs(x) > eps {
			tan = fmt.Sprintf("%+.4f", y/x)
		}
		fmt.Printf("  %-22s cos = %+.4f, sin = %+.4f, tan = %s\n",
			c.label, x, y, tan)
	}
}

// ============================================================
// 5. Bài 2: nghiệm sin θ = 1/2 trên [0, 2π)
// ============================================================

func solveBai2() {
	fmt.Println("\n=== Bài 2: Tìm θ ∈ [0, 2π) với sin θ = 1/2 ===")
	target := 0.5
	// Đáp số lý thuyết: π/6 và 5π/6
	candidates := []float64{math.Pi / 6, 5 * math.Pi / 6}
	for _, c := range candidates {
		fmt.Printf("  θ = %.4f rad = %.1f°    sin θ = %+.6f   (target = %.1f)   khớp? %v\n",
			c, c*180/math.Pi, math.Sin(c), target,
			math.Abs(math.Sin(c)-target) < eps)
	}
	fmt.Println("  ⇒ Hai nghiệm: π/6 (30°) và 5π/6 (150°)")
}

// ============================================================
// 6. Bài 3: nghiệm cos θ = -√3/2 trên [-2π, 2π)
// ============================================================

func solveBai3() {
	fmt.Println("\n=== Bài 3: Tìm θ ∈ [-2π, 2π) với cos θ = -√3/2 ===")
	target := -math.Sqrt(3) / 2
	candidates := []float64{
		-7 * math.Pi / 6,
		-5 * math.Pi / 6,
		5 * math.Pi / 6,
		7 * math.Pi / 6,
	}
	for _, c := range candidates {
		fmt.Printf("  θ = %+8.4f rad = %+7.1f°    cos θ = %+.6f   (target = %+.6f)   khớp? %v\n",
			c, c*180/math.Pi, math.Cos(c), target,
			math.Abs(math.Cos(c)-target) < 1e-6)
	}
	fmt.Println("  ⇒ Bốn nghiệm: -7π/6, -5π/6, 5π/6, 7π/6")
}

// ============================================================
// 7. Bài 4: sin θ = 3/5, θ ∈ QII → cos, tan
// ============================================================

func solveBai4() {
	fmt.Println("\n=== Bài 4: sin θ = 3/5, θ ∈ QII. Tìm cos θ, tan θ. ===")
	sinTheta := 3.0 / 5.0
	// Pythagorean identity: cos²θ = 1 - sin²θ
	cosAbs := math.Sqrt(1 - sinTheta*sinTheta)
	// QII → cos < 0
	cosTheta := -cosAbs
	tanTheta := sinTheta / cosTheta
	fmt.Printf("  sin²θ + cos²θ = 1 ⇒ cos²θ = 1 − (3/5)² = 1 − 9/25 = 16/25\n")
	fmt.Printf("  ⇒ |cos θ| = 4/5. Vì θ ∈ QII, cos < 0 ⇒ cos θ = -4/5 = %+.4f\n", cosTheta)
	fmt.Printf("  tan θ = sin θ / cos θ = (3/5) / (-4/5) = -3/4 = %+.4f\n", tanTheta)
	// Kiểm chứng: P = (-4/5, 3/5) nằm trên đường tròn đơn vị?
	r2 := cosTheta*cosTheta + sinTheta*sinTheta
	fmt.Printf("  Kiểm chứng: x² + y² = %.6f (phải = 1)\n", r2)
}

// ============================================================
// 8. Bài 6: test pointOnCircle và whichQuadrant cho 8 góc
// ============================================================

func solveBai6() {
	fmt.Println("\n=== Bài 6: pointOnCircle + whichQuadrant cho 8 góc ===")
	angles := []struct {
		degLabel string
		deg      float64
	}{
		{"0°", 0},
		{"30°", 30},
		{"45°", 45},
		{"90°", 90},
		{"150°", 150},
		{"210°", 210},
		{"300°", 300},
		{"359°", 359},
	}
	fmt.Printf("%-8s %-12s %-12s %-12s\n", "góc", "cos θ", "sin θ", "quadrant")
	fmt.Println("------------------------------------------------------")
	for _, a := range angles {
		th := a.deg * math.Pi / 180
		x, y := pointOnCircle(th)
		q := whichQuadrant(th)
		qStr := fmt.Sprintf("Q%d", q)
		if q == 0 {
			qStr = "trục"
		}
		fmt.Printf("%-8s %+10.4f   %+10.4f   %s\n", a.degLabel, x, y, qStr)
	}
}

// ============================================================
// 9. Demo coterminal
// ============================================================

func demoCoterminal() {
	fmt.Println("\n=== Demo: 4 góc đồng kết với 30° (π/6) ===")
	base := math.Pi / 6
	cot := coterminal(base, 4)
	for _, c := range cot {
		fmt.Printf("  θ = %+8.4f rad = %+7.1f°   sin = %+.4f   cos = %+.4f\n",
			c, c*180/math.Pi, math.Sin(c), math.Cos(c))
	}
	fmt.Println("(mọi đồng kết cho cùng sin và cos — tính chu kỳ 2π)")
}

// ============================================================
// main
// ============================================================

func main() {
	fmt.Println("# Lesson 03 — Đường tròn đơn vị (lời giải code)")
	fmt.Println()

	printSpecialTable()
	verifyReductionFormulas()
	demoCoterminal()
	solveBai1()
	solveBai2()
	solveBai3()
	solveBai4()
	solveBai6()

	fmt.Println("\n=== Hết. ===")
}
