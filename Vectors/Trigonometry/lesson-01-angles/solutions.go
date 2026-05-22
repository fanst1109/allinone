// Lesson 01 — Góc: độ và radian
//
// File này chứa:
//   - 3 hàm cốt lõi: deg2rad, rad2deg, normalizeAngle.
//   - Demo bảng chuyển đổi các góc đặc biệt.
//   - Demo float precision với math.Sin(math.Pi).
//   - Demo vận tốc góc của các kim đồng hồ.
//   - Lời giải code cho 6 bài tập.
//
// Chạy: `go run solutions.go`

package main

import (
	"fmt"
	"math"
)

// TwoPi = 2π, hằng số tiện dùng cho normalize.
const TwoPi = 2 * math.Pi

// -----------------------------------------------------------------------------
// 1. Ba hàm cốt lõi
// -----------------------------------------------------------------------------

// deg2rad đổi độ → radian.
// Công thức: rad = deg · π / 180.
func deg2rad(deg float64) float64 {
	return deg * math.Pi / 180.0
}

// rad2deg đổi radian → độ.
// Công thức: deg = rad · 180 / π.
func rad2deg(rad float64) float64 {
	return rad * 180.0 / math.Pi
}

// normalizeAngle đưa góc (radian) về dải chuẩn [0, 2π).
// Bước 1: dùng math.Mod để giảm về (-2π, 2π) (Go's Mod giữ dấu số bị chia).
// Bước 2: nếu kết quả âm, cộng 2π để đẩy vào dải dương.
func normalizeAngle(rad float64) float64 {
	r := math.Mod(rad, TwoPi)
	if r < 0 {
		r += TwoPi
	}
	return r
}

// normalizeDegree: tương tự normalizeAngle nhưng làm trên đơn vị độ, dải [0, 360).
func normalizeDegree(deg float64) float64 {
	d := math.Mod(deg, 360.0)
	if d < 0 {
		d += 360.0
	}
	return d
}

// -----------------------------------------------------------------------------
// 2. Demo: bảng chuyển đổi các góc đặc biệt
// -----------------------------------------------------------------------------

// printConversionTable in bảng so sánh độ ↔ radian cho 9 giá trị thường gặp.
func printConversionTable() {
	fmt.Println("=== Bảng chuyển đổi độ ↔ radian (góc đặc biệt) ===")
	fmt.Printf("%-8s | %-12s | %-12s\n", "Độ", "Radian (số)", "Radian (đẹp)")
	fmt.Println("---------+--------------+--------------")

	cases := []struct {
		deg  float64
		nice string
	}{
		{0, "0"},
		{30, "π/6"},
		{45, "π/4"},
		{60, "π/3"},
		{90, "π/2"},
		{120, "2π/3"},
		{180, "π"},
		{270, "3π/2"},
		{360, "2π"},
	}

	for _, c := range cases {
		rad := deg2rad(c.deg)
		fmt.Printf("%-8.0f | %-12.4f | %-12s\n", c.deg, rad, c.nice)
	}
	fmt.Println()
}

// -----------------------------------------------------------------------------
// 3. Demo: vì sao math.Sin(math.Pi) không phải 0 chính xác
// -----------------------------------------------------------------------------

func demoFloatPrecision() {
	fmt.Println("=== Demo float precision: math.Sin(math.Pi) ===")
	fmt.Printf("math.Pi = %.20f\n", math.Pi)
	fmt.Printf("π thực ≈ 3.14159265358979323846...\n")
	fmt.Printf("Sai khác (math.Pi - π) cỡ 10^-16, do float64 chỉ giữ được ~16 chữ số.\n\n")

	s := math.Sin(math.Pi)
	fmt.Printf("math.Sin(math.Pi) = %.20e\n", s)
	fmt.Printf("Lý do: sin tại x rất gần π → sin(x) ≈ (π - x) · cos(π) = -(π - math.Pi)\n")
	fmt.Printf("→ ra cỡ 1.22 · 10^-16, KHÔNG phải 0 chính xác.\n\n")

	// Khi nào "0 đủ tốt": dùng ngưỡng so sánh
	eps := 1e-10
	if math.Abs(s) < eps {
		fmt.Printf("Nếu cần coi là 0: kiểm tra |sin(x)| < %.0e → đúng, coi như 0.\n\n", eps)
	}
}

// -----------------------------------------------------------------------------
// 4. Demo: vận tốc góc của các kim đồng hồ
// -----------------------------------------------------------------------------

func demoAngularVelocity() {
	fmt.Println("=== Vận tốc góc của các kim đồng hồ ===")
	fmt.Printf("%-12s | %-15s | %-15s | %-12s\n", "Kim", "Chu kỳ (giây)", "ω (rad/s)", "ω (°/s)")
	fmt.Println("-------------+-----------------+-----------------+-------------")

	type clockHand struct {
		name   string
		period float64 // giây để đi 1 vòng
	}

	hands := []clockHand{
		{"Kim giây", 60},
		{"Kim phút", 3600},
		{"Kim giờ", 12 * 3600},
		{"Trái đất", 24 * 3600},
	}

	for _, h := range hands {
		omegaRad := TwoPi / h.period
		omegaDeg := 360.0 / h.period
		fmt.Printf("%-12s | %-15.0f | %-15.6e | %-12.6f\n",
			h.name, h.period, omegaRad, omegaDeg)
	}

	fmt.Println()
	// Tỉ số kim giây / kim phút phải = 60
	omegaSecond := TwoPi / 60.0
	omegaMinute := TwoPi / 3600.0
	ratio := omegaSecond / omegaMinute
	fmt.Printf("Tỉ số ω_giây / ω_phút = %.4f (kỳ vọng: 60)\n\n", ratio)
}

// -----------------------------------------------------------------------------
// 5. Demo: bug điển hình math.Sin với độ vs radian
// -----------------------------------------------------------------------------

func demoSinBug() {
	fmt.Println("=== Demo: lỗi quên đổi độ → radian ===")
	deg := 30.0

	// SAI: truyền thẳng 30 (Go hiểu là 30 rad)
	wrong := math.Sin(deg)
	fmt.Printf("math.Sin(30) — SAI, Go hiểu 30 rad:\n")
	fmt.Printf("  = sin(30 rad) ≈ %.6f\n", wrong)
	fmt.Printf("  (30 rad mod 2π ≈ %.4f rad ≈ %.2f°)\n", math.Mod(deg, TwoPi), rad2deg(math.Mod(deg, TwoPi)))

	// ĐÚNG: đổi sang radian trước
	correct := math.Sin(deg2rad(deg))
	fmt.Printf("\nmath.Sin(deg2rad(30)) — ĐÚNG:\n")
	fmt.Printf("  = sin(30°) = sin(π/6) ≈ %.6f (kỳ vọng: 0.5)\n\n", correct)
}

// -----------------------------------------------------------------------------
// 6. Lời giải các bài tập
// -----------------------------------------------------------------------------

// solveExercise1: chuyển đổi 7 góc.
func solveExercise1() {
	fmt.Println("=== Bài 1: Chuyển đổi 7 góc ===")
	type item struct {
		input string
		val   float64
		toRad bool // true: input là độ, đổi sang rad; false: ngược lại
	}
	items := []item{
		{"15°", 15, true},
		{"75°", 75, true},
		{"-120°", -120, true},
		{"420°", 420, true},
		{"π/12 rad", math.Pi / 12, false},
		{"7π/6 rad", 7 * math.Pi / 6, false},
		{"-3π/2 rad", -3 * math.Pi / 2, false},
	}

	for _, it := range items {
		if it.toRad {
			fmt.Printf("  %s = %.6f rad\n", it.input, deg2rad(it.val))
		} else {
			fmt.Printf("  %s = %.4f°\n", it.input, rad2deg(it.val))
		}
	}
	fmt.Println()
}

// solveExercise2: cung dài 5cm, bán kính 4cm.
func solveExercise2() {
	fmt.Println("=== Bài 2: Góc từ cung và bán kính ===")
	r := 4.0
	s := 5.0
	theta := s / r // radian
	fmt.Printf("  r = %.1f cm, s = %.1f cm\n", r, s)
	fmt.Printf("  θ = s/r = %.4f rad ≈ %.4f°\n\n", theta, rad2deg(theta))
}

// solveExercise3: quy gọn 4 góc.
func solveExercise3() {
	fmt.Println("=== Bài 3: Quy gọn góc ===")

	// (a) 750°
	a := 750.0
	fmt.Printf("  (a) %.0f° → %.0f°\n", a, normalizeDegree(a))

	// (b) -210°
	b := -210.0
	fmt.Printf("  (b) %.0f° → %.0f°\n", b, normalizeDegree(b))

	// (c) 13π/4
	c := 13 * math.Pi / 4
	cn := normalizeAngle(c)
	fmt.Printf("  (c) 13π/4 ≈ %.4f rad → %.4f rad (≈ %.0f°)\n", c, cn, rad2deg(cn))

	// (d) -7π/3
	d := -7 * math.Pi / 3
	dn := normalizeAngle(d)
	fmt.Printf("  (d) -7π/3 ≈ %.4f rad → %.4f rad (≈ %.0f°)\n\n", d, dn, rad2deg(dn))
}

// solveExercise4: test 3 hàm với 5 giá trị.
func solveExercise4() {
	fmt.Println("=== Bài 4: Test deg2rad, normalizeAngle, rad2deg ===")
	fmt.Printf("  %-8s | %-12s | %-15s | %-8s\n", "Input°", "→ rad", "→ normalize rad", "→ deg")
	fmt.Println("  ---------+--------------+-----------------+---------")
	for _, deg := range []float64{0, 90, 180, -90, 720} {
		r := deg2rad(deg)
		nr := normalizeAngle(r)
		back := rad2deg(nr)
		fmt.Printf("  %-8.0f | %-12.4f | %-15.4f | %-8.2f\n", deg, r, nr, back)
	}
	fmt.Println()
}

// solveExercise5: float precision — đã có trong demoFloatPrecision.
func solveExercise5() {
	fmt.Println("=== Bài 5: Vì sao math.Sin(math.Pi) ≠ 0 ===")
	fmt.Printf("  math.Sin(math.Pi) = %.4e\n", math.Sin(math.Pi))
	fmt.Println("  Lý do: math.Pi là xấp xỉ float64 của π, sai khác ~10^-16.")
	fmt.Println("  sin gần π ≈ -(math.Pi - π) ≈ 1.22e-16.")
	fmt.Println("  Liên hệ: Lesson 01 Tầng 1 — float không biểu diễn chính xác số vô tỉ.")
	fmt.Println()
}

// solveExercise6: vận tốc góc kim phút.
func solveExercise6() {
	fmt.Println("=== Bài 6: Vận tốc góc các kim đồng hồ ===")
	omegaMinute := TwoPi / 3600.0
	omegaSecond := TwoPi / 60.0
	fmt.Printf("  (a) Kim phút: ω = 2π/3600 = %.6e rad/s\n", omegaMinute)
	fmt.Printf("  (b) Kim giây: ω = 2π/60 = %.6e rad/s\n", omegaSecond)
	fmt.Printf("  (c) Tỉ số ω_giây/ω_phút = %.2f (đúng = 60)\n\n", omegaSecond/omegaMinute)
}

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

func main() {
	fmt.Println("################################################################")
	fmt.Println("# Lesson 01 — Góc: độ và radian")
	fmt.Println("################################################################")
	fmt.Println()

	printConversionTable()
	demoFloatPrecision()
	demoAngularVelocity()
	demoSinBug()

	fmt.Println("================================================================")
	fmt.Println("LỜI GIẢI 6 BÀI TẬP")
	fmt.Println("================================================================")
	fmt.Println()

	solveExercise1()
	solveExercise2()
	solveExercise3()
	solveExercise4()
	solveExercise5()
	solveExercise6()
}
