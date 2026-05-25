// Lesson 08 — Hệ phương trình tuyến tính
// Lời giải code cho các bài tập + cài đặt khử Gauss với partial pivoting.
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"math"
)

// ============================================================
// Phần 1: Tiện ích in ma trận
// ============================================================

// printMatrix in ma trận mở rộng dạng dễ đọc.
// n là số ẩn; cột thứ n là vế phải b.
func printMatrix(M [][]float64, n int, label string) {
	fmt.Printf("%s:\n", label)
	for _, row := range M {
		fmt.Print("  [ ")
		for j := 0; j < n; j++ {
			fmt.Printf("%8.4f ", row[j])
		}
		fmt.Print("| ")
		fmt.Printf("%8.4f", row[n])
		fmt.Println(" ]")
	}
	fmt.Println()
}

// copyMatrix tạo bản sâu của ma trận mở rộng để không hủy đầu vào.
func copyMatrix(A [][]float64, b []float64) [][]float64 {
	n := len(A)
	M := make([][]float64, n)
	for i := 0; i < n; i++ {
		M[i] = make([]float64, n+1)
		copy(M[i], A[i])
		M[i][n] = b[i]
	}
	return M
}

// ============================================================
// Phần 2: Khử Gauss với partial pivoting
// ============================================================

const eps = 1e-9

// solveLinearSystem giải hệ Ax = b bằng khử Gauss có partial pivoting.
// Trả về:
//   - (x, "unique")   nếu có nghiệm duy nhất
//   - (nil, "none")   nếu vô nghiệm (mâu thuẫn)
//   - (x_partial, "infinite") nếu vô số nghiệm (trả về 1 nghiệm với biến tự do = 0)
//
// verbose = true sẽ in từng bước biến đổi.
func solveLinearSystem(A [][]float64, b []float64, verbose bool) ([]float64, string) {
	n := len(A)
	if n == 0 {
		return []float64{}, "unique"
	}
	M := copyMatrix(A, b)

	if verbose {
		printMatrix(M, n, "Ma trận mở rộng ban đầu")
	}

	// Phase 1: Forward elimination — đưa về tam giác trên
	for i := 0; i < n; i++ {
		// (a) Partial pivot: chọn hàng có |M[j][i]| lớn nhất với j >= i
		maxRow := i
		maxVal := math.Abs(M[i][i])
		for j := i + 1; j < n; j++ {
			if math.Abs(M[j][i]) > maxVal {
				maxVal = math.Abs(M[j][i])
				maxRow = j
			}
		}
		if maxRow != i {
			M[i], M[maxRow] = M[maxRow], M[i]
			if verbose {
				fmt.Printf("Đổi chỗ R%d ↔ R%d (partial pivoting)\n", i+1, maxRow+1)
				printMatrix(M, n, "Sau swap")
			}
		}

		// (b) Pivot quá nhỏ → cột này không có pivot
		if math.Abs(M[i][i]) < eps {
			// Kiểm tra phần dưới: nếu có hàng [0...0 | k!=0] → vô nghiệm
			// Logic đơn giản hóa: dò các hàng còn lại
			continue
		}

		// (c) Khử các hàng dưới
		for k := i + 1; k < n; k++ {
			if math.Abs(M[k][i]) < eps {
				continue
			}
			factor := M[k][i] / M[i][i]
			for j := i; j <= n; j++ {
				M[k][j] -= factor * M[i][j]
			}
			if verbose {
				fmt.Printf("R%d ← R%d − (%.4f)·R%d\n", k+1, k+1, factor, i+1)
			}
		}
		if verbose {
			printMatrix(M, n, fmt.Sprintf("Sau khử cột %d", i+1))
		}
	}

	// Phase 2: Phân tích các hàng zero / mâu thuẫn
	hasFree := false
	for i := 0; i < n; i++ {
		allZeroLeft := true
		for j := 0; j < n; j++ {
			if math.Abs(M[i][j]) >= eps {
				allZeroLeft = false
				break
			}
		}
		if allZeroLeft {
			if math.Abs(M[i][n]) >= eps {
				// [0 ... 0 | k != 0] → mâu thuẫn
				return nil, "none"
			}
			// [0 ... 0 | 0] → vô số nghiệm
			hasFree = true
		}
	}

	// Phase 3: Back-substitution
	x := make([]float64, n)
	for i := n - 1; i >= 0; i-- {
		// Tìm cột pivot của hàng i
		pivotCol := -1
		for j := 0; j < n; j++ {
			if math.Abs(M[i][j]) >= eps {
				pivotCol = j
				break
			}
		}
		if pivotCol == -1 {
			// Hàng zero — bỏ qua, biến này coi như tự do = 0
			continue
		}
		sum := M[i][n]
		for j := pivotCol + 1; j < n; j++ {
			sum -= M[i][j] * x[j]
		}
		x[pivotCol] = sum / M[i][pivotCol]
	}

	if hasFree {
		return x, "infinite"
	}
	return x, "unique"
}

// ============================================================
// Phần 3: Định thức 2×2 và công thức Cramer
// ============================================================

// determinant2x2 tính định thức ma trận 2×2 = ad − bc.
func determinant2x2(a, b, c, d float64) float64 {
	return a*d - b*c
}

// solveCramer2 giải hệ:
//   a·x + b·y = e
//   c·x + d·y = f
// Trả về (x, y, true) nếu D != 0, ngược lại (0, 0, false).
func solveCramer2(a, b, c, d, e, f float64) (x, y float64, ok bool) {
	D := determinant2x2(a, b, c, d)
	if math.Abs(D) < eps {
		return 0, 0, false
	}
	Dx := determinant2x2(e, b, f, d)
	Dy := determinant2x2(a, e, c, f)
	return Dx / D, Dy / D, true
}

// ============================================================
// Phần 4: Lời giải các bài tập
// ============================================================

func bai1() {
	fmt.Println("=== Bài 1 — Phương pháp thế ===")
	fmt.Println("Hệ: 3x + 2y = 13;  x − y = 1")
	// Có thể giải bằng Cramer cho gọn để verify:
	x, y, ok := solveCramer2(3, 2, 1, -1, 13, 1)
	if !ok {
		fmt.Println("  Định thức = 0, không dùng Cramer được.")
		return
	}
	fmt.Printf("  Cramer cho: x = %.4f, y = %.4f\n", x, y)
	fmt.Println("  Lời giải thế: tách x = y+1 từ pt(2), thay vào pt(1):")
	fmt.Println("    3(y+1) + 2y = 13 → 5y = 10 → y = 2 → x = 3.")
	fmt.Println()
}

func bai2() {
	fmt.Println("=== Bài 2 — Phương pháp cộng ===")
	fmt.Println("Hệ: 5x + 3y = 7;  2x − 4y = 12")
	x, y, ok := solveCramer2(5, 3, 2, -4, 7, 12)
	if !ok {
		fmt.Println("  Định thức = 0.")
		return
	}
	fmt.Printf("  Nghiệm (Cramer/float):  x = %.6f, y = %.6f\n", x, y)
	fmt.Printf("  Dạng phân số:           x = 32/13 ≈ %.6f, y = -23/13 ≈ %.6f\n",
		32.0/13.0, -23.0/13.0)
	fmt.Println()
}

func bai3() {
	fmt.Println("=== Bài 3 — Khử Gauss step-by-step (3 ẩn) ===")
	A := [][]float64{
		{1, 1, 1},
		{2, -1, 3},
		{3, 2, -1},
	}
	b := []float64{6, 14, 4}
	x, status := solveLinearSystem(A, b, true)
	fmt.Printf("Trạng thái: %s\n", status)
	if status == "unique" {
		fmt.Printf("Nghiệm: x = %.6f, y = %.6f, z = %.6f\n", x[0], x[1], x[2])
		fmt.Printf("Phân số: 28/13 ≈ %.6f, 6/13 ≈ %.6f, 44/13 ≈ %.6f\n",
			28.0/13.0, 6.0/13.0, 44.0/13.0)
	}
	fmt.Println()
}

func bai4() {
	fmt.Println("=== Bài 4 — Trường hợp đặc biệt ===")

	fmt.Println("Hệ A: 2x + 3y = 6;  4x + 6y = 12")
	A1 := [][]float64{{2, 3}, {4, 6}}
	b1 := []float64{6, 12}
	_, s1 := solveLinearSystem(A1, b1, false)
	fmt.Printf("  → status = %q (kỳ vọng: infinite — 2 đường trùng)\n", s1)

	fmt.Println("Hệ B: 2x + 3y = 6;  4x + 6y = 10")
	A2 := [][]float64{{2, 3}, {4, 6}}
	b2 := []float64{6, 10}
	_, s2 := solveLinearSystem(A2, b2, false)
	fmt.Printf("  → status = %q (kỳ vọng: none — 2 đường song song)\n", s2)
	fmt.Println()
}

func bai5() {
	fmt.Println("=== Bài 5 — Word problem (giá cà phê) ===")
	// 2s + 3l = 130;  4s + l = 110
	s, l, ok := solveCramer2(2, 3, 4, 1, 130, 110)
	if !ok {
		fmt.Println("  Định thức = 0.")
		return
	}
	fmt.Printf("  Size nhỏ s = %.0fk\n", s)
	fmt.Printf("  Size lớn l = %.0fk\n", l)
	fmt.Println()
}

func bai6Demo() {
	fmt.Println("=== Bài 6 — Demo solveLinearSystem ===")
	// Test 1: hệ Bài 3
	fmt.Println("Test 1: hệ Bài 3")
	A := [][]float64{
		{1, 1, 1},
		{2, -1, 3},
		{3, 2, -1},
	}
	b := []float64{6, 14, 4}
	x, st := solveLinearSystem(A, b, false)
	fmt.Printf("  status = %s, x = %v\n", st, x)

	// Test 2: hệ nghiệm đẹp (1, 2, 3)
	fmt.Println("Test 2: hệ thiết kế cho nghiệm (1, 2, 3)")
	A2 := [][]float64{
		{1, 1, 1},
		{2, -1, 3},
		{3, 2, -1},
	}
	b2 := []float64{6, 9, 4}
	x2, st2 := solveLinearSystem(A2, b2, false)
	fmt.Printf("  status = %s, x = %v\n", st2, x2)

	// Test 3: vô nghiệm
	fmt.Println("Test 3: hệ vô nghiệm")
	A3 := [][]float64{{2, 3}, {4, 6}}
	b3 := []float64{6, 10}
	x3, st3 := solveLinearSystem(A3, b3, false)
	fmt.Printf("  status = %s, x = %v\n", st3, x3)

	// Test 4: vô số nghiệm
	fmt.Println("Test 4: hệ vô số nghiệm")
	A4 := [][]float64{{2, 3}, {4, 6}}
	b4 := []float64{6, 12}
	x4, st4 := solveLinearSystem(A4, b4, false)
	fmt.Printf("  status = %s, x = %v\n", st4, x4)

	// Test 5: pivoting cần thiết — hàng đầu có pivot = 0
	fmt.Println("Test 5: cần partial pivoting (pivot đầu = 0)")
	A5 := [][]float64{
		{0, 2, 1},
		{1, -1, 1},
		{2, 0, 1},
	}
	b5 := []float64{5, 0, 4}
	x5, st5 := solveLinearSystem(A5, b5, false)
	fmt.Printf("  status = %s, x = %v\n", st5, x5)
	fmt.Println()
}

// ============================================================
// Phần 5: Demo định thức và Cramer
// ============================================================

func cramerDemo() {
	fmt.Println("=== Demo định thức và Cramer ===")
	// Hệ: 2x + 3y = 12;  x − y = 1
	fmt.Println("Hệ: 2x + 3y = 12;  x − y = 1")
	D := determinant2x2(2, 3, 1, -1)
	fmt.Printf("  D = det(A) = %.0f\n", D)
	x, y, ok := solveCramer2(2, 3, 1, -1, 12, 1)
	if ok {
		fmt.Printf("  Cramer: x = %.4f, y = %.4f\n", x, y)
	}
	fmt.Println()
}

// ============================================================
// main
// ============================================================

func main() {
	fmt.Println("################################################")
	fmt.Println("# Lesson 08 — Hệ phương trình tuyến tính       #")
	fmt.Println("################################################")
	fmt.Println()

	cramerDemo()
	bai1()
	bai2()
	bai3()
	bai4()
	bai5()
	bai6Demo()
}
