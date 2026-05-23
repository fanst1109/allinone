// Package main — Lời giải cho Lesson 02: Tam giác vuông, sin/cos/tan.
//
// File này biên dịch và chạy bằng:
//   go run solutions.go
//
// Cấu trúc:
//   - Phần 1: hàm trig cơ bản từ 3 cạnh tam giác.
//   - Phần 2: pythagoreanCheck — kiểm tra a²+b²=c².
//   - Phần 3: triangleSides — từ hyp + góc → 2 cạnh góc vuông.
//   - Phần 4: in bảng giá trị đặc biệt 0°, 30°, 45°, 60°, 90°.
//   - Phần 5: verify sin²θ + cos²θ = 1 cho 5 góc.
//   - Phần 6: demo Atan2 trong 4 quadrant + edge case.
//   - Phần 7: đáp án 6 bài tập từ README.
package main

import (
	"fmt"
	"math"
)

// ============================================================================
// Phần 1: tính sin/cos/tan từ 3 cạnh tam giác vuông.
// ============================================================================
//
// Quy ước: (a, b, c) là 3 cạnh với c là cạnh huyền (dài nhất).
// Hàm trả về sin/cos/tan của góc đối diện cạnh a (gọi là góc α).
func trigFromSides(a, b, c float64) (sinA, cosA, tanA float64) {
	// Đối α = a, kề α = b, huyền = c.
	sinA = a / c
	cosA = b / c
	tanA = a / b // có thể chia 0 nếu b = 0; trong tam giác vuông b > 0 luôn.
	return
}

// ============================================================================
// Phần 2: kiểm tra Pythagoras a² + b² = c².
// ============================================================================
//
// Trả về true nếu thỏa (với sai số ε để chấp nhận lỗi float).
func pythagoreanCheck(a, b, c float64) bool {
	lhs := a*a + b*b
	rhs := c * c
	eps := 1e-9
	return math.Abs(lhs-rhs) < eps
}

// ============================================================================
// Phần 3: từ cạnh huyền + góc nhọn (độ) → 2 cạnh góc vuông.
// ============================================================================
//
// Đây là hàm cho Bài tập 5 trong README.
func triangleSides(hypotenuse, angleDeg float64) (opp, adj float64) {
	theta := angleDeg * math.Pi / 180 // độ → radian
	opp = hypotenuse * math.Sin(theta)
	adj = hypotenuse * math.Cos(theta)
	return
}

// ============================================================================
// Phần 4: in bảng giá trị đặc biệt 0°, 30°, 45°, 60°, 90°.
// ============================================================================
func printSpecialValuesTable() {
	angles := []struct {
		deg  float64
		name string
	}{
		{0, "0°"},
		{30, "30°"},
		{45, "45°"},
		{60, "60°"},
		{90, "90°"},
	}

	fmt.Println("┌───────┬──────────┬──────────┬──────────┐")
	fmt.Println("│ Góc   │   sin θ  │   cos θ  │   tan θ  │")
	fmt.Println("├───────┼──────────┼──────────┼──────────┤")
	for _, a := range angles {
		rad := a.deg * math.Pi / 180
		s := math.Sin(rad)
		c := math.Cos(rad)
		var tStr string
		if a.deg == 90 {
			tStr = "  undef "
		} else {
			tStr = fmt.Sprintf("%8.4f", math.Tan(rad))
		}
		fmt.Printf("│ %-5s │ %8.4f │ %8.4f │%s │\n",
			a.name, s, c, tStr)
	}
	fmt.Println("└───────┴──────────┴──────────┴──────────┘")
}

// ============================================================================
// Phần 5: verify sin²θ + cos²θ = 1 cho 5 góc.
// ============================================================================
func verifyPythagoreanIdentity() {
	tests := []float64{0, 30, 45, 60, 90, 123.5, -77, 360, 1234.5}
	fmt.Println("Kiểm chứng sin²θ + cos²θ = 1:")
	for _, deg := range tests {
		rad := deg * math.Pi / 180
		s := math.Sin(rad)
		c := math.Cos(rad)
		sum := s*s + c*c
		fmt.Printf("  θ = %7.2f°  →  sin² + cos² = %.15f\n", deg, sum)
	}
}

// ============================================================================
// Phần 6: demo Atan2 với 4 quadrant + edge cases.
// ============================================================================
func demoAtan2() {
	points := []struct {
		x, y float64
		desc string
	}{
		{1, 1, "Quadrant I  (1,1)    kỳ vọng  45°"},
		{-1, 1, "Quadrant II (-1,1)   kỳ vọng 135°"},
		{-1, -1, "Quadrant III(-1,-1)  kỳ vọng -135°"},
		{1, -1, "Quadrant IV (1,-1)   kỳ vọng -45°"},
		{0, 1, "Trục Oy+    (0,1)    kỳ vọng  90°"},
		{0, -1, "Trục Oy-    (0,-1)   kỳ vọng -90°"},
		{-1, 0, "Trục Ox-    (-1,0)   kỳ vọng 180°"},
		{0, 0, "Gốc        (0,0)     quy ước:  0°"},
	}
	fmt.Println("Demo Atan2(y, x) — so sánh với Atan(y/x):")
	for _, p := range points {
		a2 := math.Atan2(p.y, p.x) * 180 / math.Pi
		var aDesc string
		if p.x == 0 {
			aDesc = "  (skip: x=0 → chia 0)"
		} else {
			a := math.Atan(p.y/p.x) * 180 / math.Pi
			aDesc = fmt.Sprintf("  Atan(y/x) = %7.2f°", a)
		}
		fmt.Printf("  %-38s  Atan2 = %7.2f° %s\n", p.desc, a2, aDesc)
	}
}

// ============================================================================
// Phần 7: đáp án 6 bài tập README.
// ============================================================================

// Bài 1: tam giác 3-4-5, tính sin/cos/tan của 2 góc nhọn.
func exercise1() {
	fmt.Println("--- Bài 1: tam giác 3-4-5 ---")
	// Góc α: đối diện cạnh 3.
	sA, cA, tA := trigFromSides(3, 4, 5)
	fmt.Printf("Góc α (đối cạnh 3): sin=%.4f cos=%.4f tan=%.4f  (α ≈ %.2f°)\n",
		sA, cA, tA, math.Asin(sA)*180/math.Pi)
	fmt.Printf("  Verify sin²+cos² = %.4f\n", sA*sA+cA*cA)

	// Góc β: đối diện cạnh 4 — hoán đổi đối/kề.
	sB, cB, tB := trigFromSides(4, 3, 5)
	fmt.Printf("Góc β (đối cạnh 4): sin=%.4f cos=%.4f tan=%.4f  (β ≈ %.2f°)\n",
		sB, cB, tB, math.Asin(sB)*180/math.Pi)
	fmt.Printf("  Verify sin²+cos² = %.4f\n", sB*sB+cB*cB)
	fmt.Printf("  α + β = %.2f° (kỳ vọng 90°)\n",
		(math.Asin(sA)+math.Asin(sB))*180/math.Pi)
}

// Bài 2: thang 5m, góc 60°.
func exercise2() {
	fmt.Println("--- Bài 2: thang dài 5m, góc 60° với mặt đất ---")
	opp, adj := triangleSides(5, 60)
	fmt.Printf("Chiều cao chân thang lên tường: %.4f m  (= 5·sin60° = 5√3/2)\n", opp)
	fmt.Printf("Khoảng cách chân thang tới tường: %.4f m  (= 5·cos60° = 2.5)\n", adj)
	fmt.Printf("Pythagoras: %.4f² + %.4f² = %.4f (kỳ vọng 25)\n", opp, adj, opp*opp+adj*adj)
	if opp >= 6 {
		fmt.Println("→ Thang chạm/vượt đỉnh tường 6m.")
	} else {
		fmt.Printf("→ Thang KHÔNG chạm đỉnh tường 6m (thiếu %.4f m).\n", 6-opp)
	}
}

// Bài 3: chứng minh tay tan²30° + 1 = sec²30°.
func exercise3() {
	fmt.Println("--- Bài 3: tan²30° + 1 = sec²30° ---")
	// tan 30° = 1/√3
	tan30 := 1.0 / math.Sqrt(3)
	sec30 := 1.0 / math.Cos(math.Pi/6)
	lhs := tan30*tan30 + 1
	rhs := sec30 * sec30
	fmt.Printf("tan 30° = %.6f, tan²30° = %.6f\n", tan30, tan30*tan30)
	fmt.Printf("sec 30° = %.6f, sec²30° = %.6f\n", sec30, sec30*sec30)
	fmt.Printf("LHS = tan²+1 = %.6f\n", lhs)
	fmt.Printf("RHS = sec²   = %.6f\n", rhs)
	fmt.Printf("LHS - RHS = %.2e (kỳ vọng ~0)\n", lhs-rhs)
}

// Bài 4: tính sin 15° = sin(45° − 30°).
func exercise4() {
	fmt.Println("--- Bài 4: sin 15° dùng công thức cộng góc ---")
	// sin(A-B) = sinA·cosB − cosA·sinB
	sin45, cos45 := math.Sqrt(2)/2, math.Sqrt(2)/2
	sin30, cos30 := 0.5, math.Sqrt(3)/2
	result := sin45*cos30 - cos45*sin30
	// Dạng đại số: (√6 − √2)/4
	algebraic := (math.Sqrt(6) - math.Sqrt(2)) / 4
	machineSin15 := math.Sin(15 * math.Pi / 180)
	fmt.Printf("sin45·cos30 − cos45·sin30 = %.10f\n", result)
	fmt.Printf("(√6 − √2)/4              = %.10f\n", algebraic)
	fmt.Printf("math.Sin(15°)             = %.10f\n", machineSin15)
	fmt.Printf("Khớp 3 cách: chênh ≤ %.2e\n",
		math.Max(math.Abs(result-machineSin15), math.Abs(algebraic-machineSin15)))
}

// Bài 5: triangleSides(5, 60).
func exercise5() {
	fmt.Println("--- Bài 5: triangleSides(5, 60°) ---")
	opp, adj := triangleSides(5, 60)
	fmt.Printf("hyp=5, θ=60° → opp=%.4f  adj=%.4f\n", opp, adj)
	fmt.Printf("  opp² + adj² = %.4f (kỳ vọng 25)\n", opp*opp+adj*adj)
	if pythagoreanCheck(opp, adj, 5) {
		fmt.Println("  pythagoreanCheck → OK ✓")
	} else {
		fmt.Println("  pythagoreanCheck → FAIL")
	}
}

// Bài 6: vì sao Atan2 hơn Atan.
func exercise6() {
	fmt.Println("--- Bài 6: Atan2 vs Atan — ví dụ thực tế ---")
	pairs := []struct {
		x, y float64
		note string
	}{
		{1, 1, "(1, 1): quadrant I, đáp án thật 45°"},
		{-1, -1, "(-1, -1): quadrant III, đáp án thật -135° (NOT 45°!)"},
		{0, 1, "(0, 1): trục Oy+, đáp án thật 90°; Atan gặp chia 0"},
		{0, 0, "(0, 0): gốc — Atan2 quy ước 0, Atan = NaN"},
	}
	for _, p := range pairs {
		a2 := math.Atan2(p.y, p.x) * 180 / math.Pi
		var aStr string
		if p.x == 0 {
			val := math.Atan(p.y/p.x) * 180 / math.Pi // có thể là NaN hoặc ±90
			aStr = fmt.Sprintf("Atan(y/x)=%.2f° (lỗi tiềm ẩn)", val)
		} else {
			a := math.Atan(p.y/p.x) * 180 / math.Pi
			aStr = fmt.Sprintf("Atan(y/x)=%.2f°", a)
		}
		fmt.Printf("  %s\n    → Atan2(y,x)=%.2f°, %s\n", p.note, a2, aStr)
	}
	fmt.Println("→ Kết luận: Atan2 phân biệt được quadrant và xử lý x=0; Atan(y/x) thì không.")
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("  Lesson 02 — Tam giác vuông: sin/cos/tan")
	fmt.Println("============================================================")
	fmt.Println()

	fmt.Println("[Phần 4] Bảng giá trị đặc biệt:")
	printSpecialValuesTable()
	fmt.Println()

	fmt.Println("[Phần 5] Verify Pythagorean identity:")
	verifyPythagoreanIdentity()
	fmt.Println()

	fmt.Println("[Phần 6] Demo Atan2:")
	demoAtan2()
	fmt.Println()

	fmt.Println("[Phần 7] Lời giải 6 bài tập:")
	exercise1()
	fmt.Println()
	exercise2()
	fmt.Println()
	exercise3()
	fmt.Println()
	exercise4()
	fmt.Println()
	exercise5()
	fmt.Println()
	exercise6()
}
