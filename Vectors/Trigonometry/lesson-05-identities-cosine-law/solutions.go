// Lesson 05 — Identity và định lý cosin
//
// File này chứa:
//   1. Các hàm tiện ích: norm, dotProduct, lawOfCosines, cosineSimilarity.
//   2. Verify công thức cộng góc cho 5 cặp (α, β) cụ thể.
//   3. Verify định lý cosin cho vài tam giác.
//   4. Đáp án các bài tập trong README (Bài 1–6).
//
// Chạy: `go run solutions.go`
package main

import (
	"fmt"
	"math"
)

// ============================================================
// Helpers chung
// ============================================================

// deg2rad chuyển độ sang radian (math.Sin/Cos trong Go nhận radian).
func deg2rad(deg float64) float64 { return deg * math.Pi / 180.0 }

// rad2deg chuyển radian sang độ.
func rad2deg(rad float64) float64 { return rad * 180.0 / math.Pi }

// approxEqual so sánh hai số float với sai số epsilon.
func approxEqual(a, b, eps float64) bool {
	return math.Abs(a-b) <= eps*math.Max(1.0, math.Max(math.Abs(a), math.Abs(b)))
}

// ============================================================
// 1. Định lý cosin và vector ops
// ============================================================

// lawOfCosines trả về độ dài cạnh c của tam giác có 2 cạnh a, b và góc xen
// giữa C (đơn vị: độ).
//
//	c² = a² + b² − 2ab·cos(C)
func lawOfCosines(a, b, angleCDeg float64) float64 {
	c2 := a*a + b*b - 2*a*b*math.Cos(deg2rad(angleCDeg))
	return math.Sqrt(c2)
}

// lawOfCosinesAngle trả về góc đối diện cạnh c (đơn vị: độ) khi biết cả 3 cạnh.
//
//	cos(C) = (a² + b² − c²) / (2ab)
func lawOfCosinesAngle(a, b, c float64) float64 {
	cosC := (a*a + b*b - c*c) / (2 * a * b)
	// Kẹp về [-1, 1] phòng sai số float.
	if cosC > 1 {
		cosC = 1
	} else if cosC < -1 {
		cosC = -1
	}
	return rad2deg(math.Acos(cosC))
}

// norm trả về độ dài Euclidean |u| = sqrt(Σ u_i²).
func norm(u []float64) float64 {
	s := 0.0
	for _, x := range u {
		s += x * x
	}
	return math.Sqrt(s)
}

// dotProduct trả về tích vô hướng u·v = Σ u_i · v_i.
// Panic nếu 2 vector khác độ dài (chiều).
func dotProduct(u, v []float64) float64 {
	if len(u) != len(v) {
		panic("dotProduct: hai vector phải cùng độ dài")
	}
	s := 0.0
	for i := range u {
		s += u[i] * v[i]
	}
	return s
}

// cosineSimilarity trả về cos θ giữa 2 vector u, v.
// Trả về 0 nếu một trong hai vector là vector 0 (tránh chia 0).
func cosineSimilarity(u, v []float64) float64 {
	if len(u) != len(v) {
		panic("cosineSimilarity: hai vector phải cùng độ dài")
	}
	nu := norm(u)
	nv := norm(v)
	if nu == 0 || nv == 0 {
		return 0
	}
	return dotProduct(u, v) / (nu * nv)
}

// angleBetweenVectors trả về góc giữa 2 vector (đơn vị: độ).
func angleBetweenVectors(u, v []float64) float64 {
	return rad2deg(math.Acos(cosineSimilarity(u, v)))
}

// l2Distance trả về khoảng cách Euclidean |u − v| giữa 2 vector cùng chiều.
//
//	|u − v|² = Σ (u_i − v_i)²
func l2Distance(u, v []float64) float64 {
	if len(u) != len(v) {
		panic("l2Distance: hai vector phải cùng độ dài")
	}
	s := 0.0
	for i := range u {
		d := u[i] - v[i]
		s += d * d
	}
	return math.Sqrt(s)
}

// vectorSub trả về u − v.
func vectorSub(u, v []float64) []float64 {
	res := make([]float64, len(u))
	for i := range u {
		res[i] = u[i] - v[i]
	}
	return res
}

// normalize trả về u / |u| (đơn vị hóa). Trả về copy của u nếu |u| = 0.
func normalize(u []float64) []float64 {
	n := norm(u)
	if n == 0 {
		out := make([]float64, len(u))
		copy(out, u)
		return out
	}
	out := make([]float64, len(u))
	for i := range u {
		out[i] = u[i] / n
	}
	return out
}

// ============================================================
// 2. Verify công thức cộng góc
// ============================================================

// verifySumFormula kiểm chứng sin(α+β) = sin α cos β + cos α sin β
// và cos(α+β) = cos α cos β − sin α sin β cho cặp (α, β) cụ thể.
func verifySumFormula(alphaDeg, betaDeg float64) {
	a := deg2rad(alphaDeg)
	b := deg2rad(betaDeg)

	lhsSin := math.Sin(a + b)
	rhsSin := math.Sin(a)*math.Cos(b) + math.Cos(a)*math.Sin(b)

	lhsCos := math.Cos(a + b)
	rhsCos := math.Cos(a)*math.Cos(b) - math.Sin(a)*math.Sin(b)

	okSin := approxEqual(lhsSin, rhsSin, 1e-12)
	okCos := approxEqual(lhsCos, rhsCos, 1e-12)
	tag := "OK"
	if !okSin || !okCos {
		tag = "FAIL"
	}
	fmt.Printf("  α=%5.1f° β=%5.1f° | sin(α+β)=% .6f  RHS=% .6f | cos(α+β)=% .6f  RHS=% .6f  [%s]\n",
		alphaDeg, betaDeg, lhsSin, rhsSin, lhsCos, rhsCos, tag)
}

// verifyDoubleAngle kiểm sin 2θ = 2 sin cos và cos 2θ = cos² − sin².
func verifyDoubleAngle(thetaDeg float64) {
	t := deg2rad(thetaDeg)
	s := math.Sin(t)
	c := math.Cos(t)

	lhsSin := math.Sin(2 * t)
	rhsSin := 2 * s * c

	lhsCos := math.Cos(2 * t)
	rhsCos := c*c - s*s

	fmt.Printf("  θ=%5.1f° | sin 2θ=% .6f vs 2sc=% .6f | cos 2θ=% .6f vs c²−s²=% .6f\n",
		thetaDeg, lhsSin, rhsSin, lhsCos, rhsCos)
}

// ============================================================
// 3. Đáp án bài tập
// ============================================================

func bai1() {
	fmt.Println("Bài 1 — sin 15° và cos 105°")
	// sin 15° = sin(45° − 30°) = sin45·cos30 − cos45·sin30 = (√6 − √2)/4
	exact15 := (math.Sqrt(6) - math.Sqrt(2)) / 4
	// cos 105° = cos(60° + 45°) = cos60·cos45 − sin60·sin45 = (√2 − √6)/4
	exact105 := (math.Sqrt(2) - math.Sqrt(6)) / 4

	fmt.Printf("  sin 15°  (công thức) = %.6f\n", exact15)
	fmt.Printf("  sin 15°  (math.Sin)  = %.6f\n", math.Sin(deg2rad(15)))
	fmt.Printf("  cos 105° (công thức) = %.6f\n", exact105)
	fmt.Printf("  cos 105° (math.Cos)  = %.6f\n", math.Cos(deg2rad(105)))
	fmt.Println()
}

func bai2() {
	fmt.Println("Bài 2 — sin 2θ + cos 2θ = 1 − 2sin²θ + 2sinθ cosθ")
	for _, theta := range []float64{15, 30, 45, 60, 90} {
		t := deg2rad(theta)
		lhs := math.Sin(2*t) + math.Cos(2*t)
		rhs := 1 - 2*math.Pow(math.Sin(t), 2) + 2*math.Sin(t)*math.Cos(t)
		fmt.Printf("  θ=%4.0f° | LHS=% .6f  RHS=% .6f  diff=%.2e\n",
			theta, lhs, rhs, math.Abs(lhs-rhs))
	}
	fmt.Println()
}

func bai3() {
	fmt.Println("Bài 3 — Tam giác a=8, b=10, C=45°")
	a, b, C := 8.0, 10.0, 45.0
	c := lawOfCosines(a, b, C)
	A := lawOfCosinesAngle(b, c, a) // góc đối diện a
	B := lawOfCosinesAngle(a, c, b) // góc đối diện b
	fmt.Printf("  c = %.6f\n", c)
	fmt.Printf("  A = %.4f° (đối diện a)\n", A)
	fmt.Printf("  B = %.4f° (đối diện b)\n", B)
	fmt.Printf("  Kiểm tổng góc: %.4f° (kỳ vọng 180°)\n", A+B+C)
	fmt.Println()
}

func bai4() {
	fmt.Println("Bài 4 — u=(3,4), v=(1,2)")
	u := []float64{3, 4}
	v := []float64{1, 2}
	fmt.Printf("  |u|     = %.6f\n", norm(u))
	fmt.Printf("  |v|     = %.6f\n", norm(v))
	fmt.Printf("  u·v     = %.6f\n", dotProduct(u, v))
	fmt.Printf("  cos θ   = %.6f\n", cosineSimilarity(u, v))
	fmt.Printf("  θ       = %.4f°\n", angleBetweenVectors(u, v))
	fmt.Println()
}

func bai5() {
	fmt.Println("Bài 5 — Hai vector đơn vị tạo góc 60°")
	// Chọn cụ thể: u = (1, 0), v = (cos60°, sin60°) = (0.5, √3/2)
	u := []float64{1, 0}
	v := []float64{math.Cos(deg2rad(60)), math.Sin(deg2rad(60))}
	dot := dotProduct(u, v)
	cos := cosineSimilarity(u, v)
	fmt.Printf("  u = %v, v = (%.4f, %.4f)\n", u, v[0], v[1])
	fmt.Printf("  u·v             = %.6f (kỳ vọng 0.5)\n", dot)
	fmt.Printf("  cos θ           = %.6f (kỳ vọng 0.5)\n", cos)
	fmt.Println("  Vì cả hai vector đã có |·|=1, dot product chính là cosine similarity.")
	fmt.Println()
}

func bai6() {
	fmt.Println("Bài 6 — cosineSimilarity cho 3 cặp test")
	tests := []struct {
		u, v []float64
		want float64
		name string
	}{
		{[]float64{1, 0, 0}, []float64{1, 0, 0}, 1.0, "cùng vector"},
		{[]float64{1, 0, 0}, []float64{0, 1, 0}, 0.0, "vuông góc"},
		{[]float64{1, 2, 3}, []float64{2, 4, 6}, 1.0, "cùng hướng (v=2u)"},
		// Bonus: ngược hướng, edge case vector 0
		{[]float64{1, 1, 1}, []float64{-1, -1, -1}, -1.0, "ngược hướng"},
		{[]float64{0, 0, 0}, []float64{1, 2, 3}, 0.0, "vector 0 → trả 0"},
	}
	for _, t := range tests {
		got := cosineSimilarity(t.u, t.v)
		mark := "OK"
		if !approxEqual(got, t.want, 1e-9) {
			mark = "FAIL"
		}
		fmt.Printf("  [%s] %-25s u=%v v=%v → got=% .6f want=% .1f\n",
			mark, t.name, t.u, t.v, got, t.want)
	}
	fmt.Println()
}

// ============================================================
// main
// ============================================================

func main() {
	fmt.Println("===== Lesson 05 — Identity và định lý cosin =====")
	fmt.Println()

	// --- Verify công thức cộng cho 5 cặp ---
	fmt.Println("Verify công thức cộng góc (5 cặp):")
	verifySumFormula(30, 45)
	verifySumFormula(45, 60)
	verifySumFormula(20, 70) // tổng 90° → sin = 1
	verifySumFormula(120, 30)
	verifySumFormula(-30, 75)
	fmt.Println()

	// --- Verify công thức nhân đôi ---
	fmt.Println("Verify công thức nhân đôi (3 góc):")
	verifyDoubleAngle(30)
	verifyDoubleAngle(45)
	verifyDoubleAngle(60)
	fmt.Println()

	// --- Demo định lý cosin trở thành Pythagoras khi C=90° ---
	fmt.Println("Demo: định lý cosin với C=90° → Pythagoras")
	a, b := 3.0, 4.0
	c90 := lawOfCosines(a, b, 90)
	fmt.Printf("  a=3, b=4, C=90° → c = %.6f (Pythagoras: √(9+16) = 5)\n", c90)
	c60 := lawOfCosines(a, b, 60)
	fmt.Printf("  a=3, b=4, C=60° → c = %.6f (nhỏ hơn 5 vì góc nhọn)\n", c60)
	c120 := lawOfCosines(a, b, 120)
	fmt.Printf("  a=3, b=4, C=120° → c = %.6f (lớn hơn 5 vì góc tù)\n", c120)
	fmt.Println()

	// --- Demo dot product = |u||v|cos θ ---
	fmt.Println("Demo: u·v = |u||v|cos θ cho 2 vector cụ thể")
	u := []float64{3, 4}
	v := []float64{1, 2}
	dotDirect := dotProduct(u, v)
	dotGeom := norm(u) * norm(v) * math.Cos(deg2rad(angleBetweenVectors(u, v)))
	fmt.Printf("  u=%v, v=%v\n", u, v)
	fmt.Printf("  u·v (đại số: u1v1 + u2v2)  = %.6f\n", dotDirect)
	fmt.Printf("  |u||v|cos θ (hình học)      = %.6f\n", dotGeom)
	fmt.Printf("  Hai giá trị khớp ⇒ định lý đúng cho ví dụ này.\n")
	fmt.Println()

	// --- Verify identity |u − v|² = |u|² + |v|² − 2(u·v) ---
	fmt.Println("Verify |u − v|² = |u|² + |v|² − 2(u·v) trên 3 cặp vector:")
	cases := []struct{ u, v []float64 }{
		{[]float64{3, 4}, []float64{1, 2}},
		{[]float64{1, 0, 0}, []float64{0, 1, 0}},
		{[]float64{1, 2, 3, 4}, []float64{4, 3, 2, 1}},
	}
	for _, k := range cases {
		dLhs := math.Pow(l2Distance(k.u, k.v), 2)
		dRhs := math.Pow(norm(k.u), 2) + math.Pow(norm(k.v), 2) - 2*dotProduct(k.u, k.v)
		mark := "OK"
		if !approxEqual(dLhs, dRhs, 1e-9) {
			mark = "FAIL"
		}
		fmt.Printf("  [%s] u=%v, v=%v | |u−v|²=%.4f vs |u|²+|v|²−2(u·v)=%.4f\n",
			mark, k.u, k.v, dLhs, dRhs)
	}
	fmt.Println()

	// --- Demo: normalize trước khi tính cos sim ---
	fmt.Println("Demo: chuẩn hóa vector (normalize) → cos sim = dot product trực tiếp")
	u2 := []float64{3, 4}
	v2 := []float64{6, 8} // = 2 * u2, cùng hướng
	un := normalize(u2)
	vn := normalize(v2)
	fmt.Printf("  u  = %v, |u|  = %.4f\n", u2, norm(u2))
	fmt.Printf("  v  = %v, |v|  = %.4f\n", v2, norm(v2))
	fmt.Printf("  û  = %v (|û| = %.4f)\n", un, norm(un))
	fmt.Printf("  v̂  = %v (|v̂| = %.4f)\n", vn, norm(vn))
	fmt.Printf("  cos sim(u,v)   = %.6f (cùng hướng → 1.0)\n", cosineSimilarity(u2, v2))
	fmt.Printf("  û · v̂ (chuẩn hóa) = %.6f  (= cos sim vì |û|=|v̂|=1)\n", dotProduct(un, vn))
	fmt.Println()

	// --- Đáp án bài tập ---
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
	bai6()
}
