// Lesson 06 — Ma trận xoay 2D/3D (Rotation Matrix)
// Code Go cho các bài tập + cài đặt rotateVec2, rotateMatrix2D/3D,
// verify các tính chất bảo toàn, và demo RoPE.
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"math"
)

// ============================================================
// Phần 1: Tiện ích in
// ============================================================

func roundEps(x float64) float64 {
	if math.Abs(x) < 1e-10 {
		return 0
	}
	return x
}

func fmtNum(x float64) string {
	x = roundEps(x)
	if math.Abs(x-math.Round(x)) < 1e-9 {
		return fmt.Sprintf("%4.0f", x)
	}
	return fmt.Sprintf("%7.4f", x)
}

func printMat2(M [2][2]float64, label string) {
	fmt.Printf("%s:\n", label)
	fmt.Printf("  [ %s  %s ]\n", fmtNum(M[0][0]), fmtNum(M[0][1]))
	fmt.Printf("  [ %s  %s ]\n", fmtNum(M[1][0]), fmtNum(M[1][1]))
}

func printMat3(M [3][3]float64, label string) {
	fmt.Printf("%s:\n", label)
	for i := 0; i < 3; i++ {
		fmt.Printf("  [ %s  %s  %s ]\n",
			fmtNum(M[i][0]), fmtNum(M[i][1]), fmtNum(M[i][2]))
	}
}

func printVec2(v [2]float64, label string) {
	fmt.Printf("%s = (%s, %s)\n", label, fmtNum(v[0]), fmtNum(v[1]))
}

func printVec3(v [3]float64, label string) {
	fmt.Printf("%s = (%s, %s, %s)\n", label,
		fmtNum(v[0]), fmtNum(v[1]), fmtNum(v[2]))
}

// ============================================================
// Phần 2: Hàm xoay 2D
// ============================================================

// rotateVec2 xoay điểm/vector 2D quanh gốc O góc theta (radian).
// Áp dụng trực tiếp công thức:
//
//	x' = x cos θ − y sin θ
//	y' = x sin θ + y cos θ
func rotateVec2(x, y, theta float64) (xPrime, yPrime float64) {
	c := math.Cos(theta)
	s := math.Sin(theta)
	xPrime = x*c - y*s
	yPrime = x*s + y*c
	return
}

// rotateMatrix2D trả về ma trận xoay 2x2 R(θ).
func rotateMatrix2D(theta float64) [2][2]float64 {
	c := math.Cos(theta)
	s := math.Sin(theta)
	return [2][2]float64{
		{c, -s},
		{s, c},
	}
}

// multiplyMatVec2 nhân ma trận 2x2 với vector 2x1.
func multiplyMatVec2(M [2][2]float64, v [2]float64) [2]float64 {
	return [2]float64{
		M[0][0]*v[0] + M[0][1]*v[1],
		M[1][0]*v[0] + M[1][1]*v[1],
	}
}

// multiplyMatMat2 nhân 2 ma trận 2x2.
func multiplyMatMat2(A, B [2][2]float64) [2][2]float64 {
	var C [2][2]float64
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			C[i][j] = A[i][0]*B[0][j] + A[i][1]*B[1][j]
		}
	}
	return C
}

// transpose2 chuyển vị ma trận 2x2.
func transpose2(M [2][2]float64) [2][2]float64 {
	return [2][2]float64{
		{M[0][0], M[1][0]},
		{M[0][1], M[1][1]},
	}
}

// det2 tính định thức 2x2.
func det2(M [2][2]float64) float64 {
	return M[0][0]*M[1][1] - M[0][1]*M[1][0]
}

// dot2 dot product 2D.
func dot2(u, v [2]float64) float64 {
	return u[0]*v[0] + u[1]*v[1]
}

// norm2 độ dài vector 2D.
func norm2(v [2]float64) float64 {
	return math.Sqrt(v[0]*v[0] + v[1]*v[1])
}

// ============================================================
// Phần 3: Ma trận xoay 3D
// ============================================================

// rotateMatrix3DX trả về ma trận xoay quanh trục Ox.
func rotateMatrix3DX(theta float64) [3][3]float64 {
	c := math.Cos(theta)
	s := math.Sin(theta)
	return [3][3]float64{
		{1, 0, 0},
		{0, c, -s},
		{0, s, c},
	}
}

// rotateMatrix3DY trả về ma trận xoay quanh trục Oy.
func rotateMatrix3DY(theta float64) [3][3]float64 {
	c := math.Cos(theta)
	s := math.Sin(theta)
	return [3][3]float64{
		{c, 0, s},
		{0, 1, 0},
		{-s, 0, c},
	}
}

// rotateMatrix3DZ trả về ma trận xoay quanh trục Oz.
func rotateMatrix3DZ(theta float64) [3][3]float64 {
	c := math.Cos(theta)
	s := math.Sin(theta)
	return [3][3]float64{
		{c, -s, 0},
		{s, c, 0},
		{0, 0, 1},
	}
}

// multiplyMatrixVec nhân ma trận 3x3 với vector 3D.
func multiplyMatrixVec(M [3][3]float64, v [3]float64) [3]float64 {
	var r [3]float64
	for i := 0; i < 3; i++ {
		sum := 0.0
		for j := 0; j < 3; j++ {
			sum += M[i][j] * v[j]
		}
		r[i] = sum
	}
	return r
}

// multiplyMat3 nhân 2 ma trận 3x3.
func multiplyMat3(A, B [3][3]float64) [3][3]float64 {
	var C [3][3]float64
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			s := 0.0
			for k := 0; k < 3; k++ {
				s += A[i][k] * B[k][j]
			}
			C[i][j] = s
		}
	}
	return C
}

// ============================================================
// Phần 4: Verify các tính chất
// ============================================================

func verifyLengthPreservation() {
	fmt.Println("=== Tính chất 1: |R(θ) v| = |v| ===")
	tests := []struct {
		v     [2]float64
		theta float64
		label string
	}{
		{[2]float64{3, 4}, math.Pi / 6, "v=(3,4), θ=30°"},
		{[2]float64{1, 0}, math.Pi / 3, "v=(1,0), θ=60°"},
		{[2]float64{-2, 1}, math.Pi / 2, "v=(-2,1), θ=90°"},
		{[2]float64{5, -12}, math.Pi, "v=(5,-12), θ=180°"},
	}
	for _, t := range tests {
		R := rotateMatrix2D(t.theta)
		vp := multiplyMatVec2(R, t.v)
		fmt.Printf("  %s: |v|=%.4f, |Rv|=%.4f → bằng nhau? %v\n",
			t.label, norm2(t.v), norm2(vp),
			math.Abs(norm2(t.v)-norm2(vp)) < 1e-9)
	}
	fmt.Println()
}

func verifyDotProductPreservation() {
	fmt.Println("=== Tính chất 2: (R u) · (R v) = u · v ===")
	u := [2]float64{2, 0}
	v := [2]float64{0, 3}
	theta := math.Pi / 3 // 60°
	R := rotateMatrix2D(theta)
	up := multiplyMatVec2(R, u)
	vp := multiplyMatVec2(R, v)
	fmt.Printf("  u = (%.2f, %.2f), v = (%.2f, %.2f)\n", u[0], u[1], v[0], v[1])
	fmt.Printf("  θ = 60°\n")
	fmt.Printf("  u·v       = %.6f\n", dot2(u, v))
	fmt.Printf("  Ru        = (%.4f, %.4f)\n", up[0], up[1])
	fmt.Printf("  Rv        = (%.4f, %.4f)\n", vp[0], vp[1])
	fmt.Printf("  (Ru)·(Rv) = %.6f → bằng nhau? %v\n",
		dot2(up, vp), math.Abs(dot2(u, v)-dot2(up, vp)) < 1e-9)
	fmt.Println()
}

func verifyComposition() {
	fmt.Println("=== Tính chất 3: R(α) R(β) = R(α + β) ===")
	alpha := math.Pi / 3 // 60°
	beta := math.Pi / 6  // 30°
	A := rotateMatrix2D(alpha)
	B := rotateMatrix2D(beta)
	AB := multiplyMatMat2(A, B)
	target := rotateMatrix2D(alpha + beta) // R(90°)
	printMat2(AB, "R(60°)·R(30°)")
	printMat2(target, "R(90°)")
	// So sánh từng phần tử
	eq := true
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			if math.Abs(AB[i][j]-target[i][j]) > 1e-9 {
				eq = false
			}
		}
	}
	fmt.Printf("  Bằng nhau? %v\n\n", eq)
}

func verifyTransposeIsInverse() {
	fmt.Println("=== Tính chất 4: R(θ)ᵀ · R(θ) = I ===")
	theta := math.Pi / 6 // 30°
	R := rotateMatrix2D(theta)
	Rt := transpose2(R)
	RtR := multiplyMatMat2(Rt, R)
	printMat2(R, "R(30°)")
	printMat2(Rt, "R(30°)ᵀ")
	printMat2(RtR, "R(30°)ᵀ · R(30°)")
	// Phải = I
	fmt.Printf("  Có phải ma trận đơn vị? %v\n\n",
		math.Abs(RtR[0][0]-1) < 1e-9 &&
			math.Abs(RtR[1][1]-1) < 1e-9 &&
			math.Abs(RtR[0][1]) < 1e-9 &&
			math.Abs(RtR[1][0]) < 1e-9)
}

func verifyDeterminant() {
	fmt.Println("=== Tính chất 5: det R(θ) = 1 ===")
	for _, deg := range []float64{0, 30, 45, 60, 90, 135, 180, 270} {
		theta := deg * math.Pi / 180
		R := rotateMatrix2D(theta)
		d := det2(R)
		fmt.Printf("  θ=%6.0f°  det = %.10f\n", deg, d)
	}
	fmt.Println()
}

// ============================================================
// Phần 5: 3D — non-commutative demo
// ============================================================

func demo3DNonCommutative() {
	fmt.Println("=== 3D KHÔNG GIAO HOÁN: R_x(90°)·R_y(90°) ≠ R_y(90°)·R_x(90°) ===")
	rx := rotateMatrix3DX(math.Pi / 2)
	ry := rotateMatrix3DY(math.Pi / 2)
	rxry := multiplyMat3(rx, ry)
	ryrx := multiplyMat3(ry, rx)
	printMat3(rxry, "R_x(90°) · R_y(90°)")
	printMat3(ryrx, "R_y(90°) · R_x(90°)")

	v := [3]float64{1, 0, 0}
	r1 := multiplyMatrixVec(rxry, v)
	r2 := multiplyMatrixVec(ryrx, v)
	fmt.Printf("  Áp dụng cho v=(1,0,0):\n")
	printVec3(r1, "    (R_x·R_y) v")
	printVec3(r2, "    (R_y·R_x) v")
	fmt.Println()
}

// ============================================================
// Phần 6: RoPE demo
// ============================================================

func demoRoPE() {
	fmt.Println("=== RoPE Demo — attention chỉ phụ thuộc hiệu vị trí (n − m) ===")
	q := [2]float64{1, 0}
	k := [2]float64{0, 1}
	thetaBase := math.Pi / 6 // 30°

	// Cách 1: tính trực tiếp q' · k' với q' = R(mθ) q, k' = R(nθ) k
	fmt.Println("Test các cặp (m, n) khác nhau với CÙNG hiệu n − m:")
	for _, pair := range [][2]int{{2, 5}, {3, 6}, {10, 13}, {100, 103}} {
		m, n := pair[0], pair[1]
		Rm := rotateMatrix2D(float64(m) * thetaBase)
		Rn := rotateMatrix2D(float64(n) * thetaBase)
		qp := multiplyMatVec2(Rm, q)
		kp := multiplyMatVec2(Rn, k)
		score := dot2(qp, kp)
		fmt.Printf("  m=%-3d n=%-3d (hiệu=%d): q'·k' = %.6f\n",
			m, n, n-m, score)
	}
	// Cách 2: dùng tính chất hiệu vị trí
	fmt.Println("Cùng kết quả qua công thức q · R((n-m)θ) · k với hiệu = 3:")
	Rdiff := rotateMatrix2D(3 * thetaBase)
	Rk := multiplyMatVec2(Rdiff, k)
	score := dot2(q, Rk)
	fmt.Printf("  q · R(3·30°)·k = %.6f\n", score)
	fmt.Println()
}

// ============================================================
// Phần 7: Lời giải các bài tập
// ============================================================

func bai1() {
	fmt.Println("=== Bài 1 — Xoay (3, 4) bởi 90° ===")
	xp, yp := rotateVec2(3, 4, math.Pi/2)
	fmt.Printf("  (x', y') = (%s, %s)\n", fmtNum(xp), fmtNum(yp))
	fmt.Println("  Kỳ vọng: (-4, 3).")
	fmt.Println()
}

func bai2() {
	fmt.Println("=== Bài 2 — Xoay (1, 1) bởi 45° ===")
	xp, yp := rotateVec2(1, 1, math.Pi/4)
	fmt.Printf("  (x', y') ≈ (%.6f, %.6f)\n", xp, yp)
	fmt.Printf("  Dạng chính xác: (0, √2) = (0, %.6f)\n", math.Sqrt(2))
	fmt.Println("  Nhận xét: (1,1) lệch trục Ox 45°, xoay thêm 45° → nằm trên trục Oy dương.")
	fmt.Println()
}

func bai3() {
	fmt.Println("=== Bài 3 — Bảo toàn dot product ===")
	u := [2]float64{2, 0}
	v := [2]float64{0, 3}
	fmt.Printf("  u·v = %.4f (trước xoay)\n", dot2(u, v))
	R := rotateMatrix2D(math.Pi / 3) // 60°
	up := multiplyMatVec2(R, u)
	vp := multiplyMatVec2(R, v)
	fmt.Printf("  Sau xoay 60°: u' = (%.4f, %.4f), v' = (%.4f, %.4f)\n",
		up[0], up[1], vp[0], vp[1])
	fmt.Printf("  u'·v' = %.4f\n", dot2(up, vp))
	fmt.Println("  Bằng nhau vì ma trận xoay bảo toàn dot product.")
	fmt.Println()
}

func bai4() {
	fmt.Println("=== Bài 4 — R(60°) · R(30°) = R(90°) ===")
	A := rotateMatrix2D(math.Pi / 3)
	B := rotateMatrix2D(math.Pi / 6)
	AB := multiplyMatMat2(A, B)
	target := rotateMatrix2D(math.Pi / 2)
	printMat2(AB, "  R(60°)·R(30°)")
	printMat2(target, "  R(90°)")
	fmt.Println()
}

func bai5() {
	fmt.Println("=== Bài 5 — RoPE walk-through (m=2, n=5, θ=π/6) ===")
	q := [2]float64{1, 0}
	k := [2]float64{0, 1}
	theta := math.Pi / 6

	Rm := rotateMatrix2D(2 * theta) // R(60°)
	Rn := rotateMatrix2D(5 * theta) // R(150°)
	qp := multiplyMatVec2(Rm, q)
	kp := multiplyMatVec2(Rn, k)
	score1 := dot2(qp, kp)
	fmt.Printf("  q' = R(60°)·(1,0)  = (%.4f, %.4f)\n", qp[0], qp[1])
	fmt.Printf("  k' = R(150°)·(0,1) = (%.4f, %.4f)\n", kp[0], kp[1])
	fmt.Printf("  q' · k' = %.6f\n", score1)

	// Verify bằng công thức "hiệu"
	Rdiff := rotateMatrix2D(3 * theta) // R(90°)
	Rk := multiplyMatVec2(Rdiff, k)
	score2 := dot2(q, Rk)
	fmt.Printf("  q · R(90°)·k = %.6f\n", score2)
	fmt.Printf("  Bằng nhau? %v\n\n", math.Abs(score1-score2) < 1e-9)
}

func bai6() {
	fmt.Println("=== Bài 6 — Code Go: rotateVec2, rotateMatrix3DZ, multiplyMatrixVec ===")

	// Test rotateVec2
	xp, yp := rotateVec2(1, 0, math.Pi/2)
	fmt.Printf("  rotateVec2(1, 0, π/2) = (%s, %s)  [kỳ vọng (0, 1)]\n",
		fmtNum(xp), fmtNum(yp))

	// Test rotateMatrix3DZ + multiplyMatrixVec
	Rz := rotateMatrix3DZ(math.Pi / 2)
	v := [3]float64{1, 0, 0}
	r := multiplyMatrixVec(Rz, v)
	printMat3(Rz, "  R_z(90°)")
	fmt.Printf("  R_z(90°) · (1, 0, 0) = (%s, %s, %s)  [kỳ vọng (0, 1, 0)]\n",
		fmtNum(r[0]), fmtNum(r[1]), fmtNum(r[2]))

	// Thêm test với (0, 1, 0)
	r2 := multiplyMatrixVec(Rz, [3]float64{0, 1, 0})
	fmt.Printf("  R_z(90°) · (0, 1, 0) = (%s, %s, %s)  [kỳ vọng (-1, 0, 0)]\n",
		fmtNum(r2[0]), fmtNum(r2[1]), fmtNum(r2[2]))

	// Test R_x
	Rx := rotateMatrix3DX(math.Pi / 2)
	r3 := multiplyMatrixVec(Rx, [3]float64{0, 1, 0})
	fmt.Printf("  R_x(90°) · (0, 1, 0) = (%s, %s, %s)  [kỳ vọng (0, 0, 1)]\n",
		fmtNum(r3[0]), fmtNum(r3[1]), fmtNum(r3[2]))
	fmt.Println()
}

// ============================================================
// main
// ============================================================

func main() {
	fmt.Println("################################################")
	fmt.Println("# Lesson 06 — Ma trận xoay 2D/3D + RoPE        #")
	fmt.Println("################################################")
	fmt.Println()

	verifyLengthPreservation()
	verifyDotProductPreservation()
	verifyComposition()
	verifyTransposeIsInverse()
	verifyDeterminant()
	demo3DNonCommutative()
	demoRoPE()

	fmt.Println("------ Lời giải bài tập ------")
	fmt.Println()
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
	bai6()
}
