// Lesson 03 — Phương trình bậc 1 (Linear Equations)
//
// File này cung cấp:
//   - solveLinear         : giải dạng chuẩn a*x + b = 0
//   - solveWithSteps      : giải kèm log từng bước biến đổi (giống cách giải tay)
//   - solveFromCoeffs     : giải khi 2 vế có nhiều hạng tử bậc 1, dạng
//                           (l0 + l1*x) = (r0 + r1*x), tự gom về a*x + b = 0
//   - solveFractionEquation: minh hoạ khử mẫu rồi giải (cho Bài 2)
//   - main                : chạy lời giải các bài 1-5 trong README.
//
// Comment tiếng Việt để hỗ trợ học.

package main

import (
	"errors"
	"fmt"
	"math"
	"strings"
)

// ---------------------------------------------------------------------------
// Phần 1. Bộ giải cơ bản
// ---------------------------------------------------------------------------

// solveLinear giải a*x + b = 0.
//   - a != 0           → nghiệm duy nhất x = -b/a
//   - a == 0, b == 0   → vô số nghiệm
//   - a == 0, b != 0   → vô nghiệm
//
// Trả về (nghiệm, thông báo). Khi không có nghiệm duy nhất, nghiệm = 0 và
// thông báo mô tả trạng thái; gọi nơi dùng kiểm tra thông báo trước.
func solveLinear(a, b float64) (float64, string) {
	if approxZero(a) {
		if approxZero(b) {
			return 0, "vô số nghiệm"
		}
		return 0, "vô nghiệm"
	}
	return -b / a, "nghiệm duy nhất"
}

// solveLinearErr là bản dùng error (cho Bài 5 trong README).
func solveLinearErr(a, b float64) (float64, error) {
	x, msg := solveLinear(a, b)
	switch msg {
	case "vô số nghiệm":
		return 0, errors.New("vô số nghiệm (0·x = 0 đúng với mọi x)")
	case "vô nghiệm":
		return 0, fmt.Errorf("vô nghiệm (0·x = %g vô lý)", -b)
	}
	return x, nil
}

// approxZero kiểm tra "gần như 0" cho float (tránh lỗi làm tròn).
func approxZero(v float64) bool {
	return math.Abs(v) < 1e-12
}

// ---------------------------------------------------------------------------
// Phần 2. Giải kèm các bước biến đổi (giống cách trình bày tay)
// ---------------------------------------------------------------------------

// solveWithSteps giải a*x + b = 0 và trả về log các bước (string slice).
// Cách trình bày mô phỏng cân thăng bằng: mỗi thao tác làm cho cả 2 vế.
func solveWithSteps(a, b float64) (float64, []string) {
	steps := []string{fmt.Sprintf("Phương trình: %s·x + %s = 0", fmtNum(a), fmtNum(b))}

	if approxZero(a) {
		if approxZero(b) {
			steps = append(steps, "a = 0 và b = 0 → 0·x = 0 đúng với mọi x")
			steps = append(steps, "Kết luận: vô số nghiệm (S = ℝ)")
			return 0, steps
		}
		steps = append(steps, fmt.Sprintf("a = 0, b = %s ≠ 0 → 0·x = %s vô lý", fmtNum(b), fmtNum(-b)))
		steps = append(steps, "Kết luận: vô nghiệm (S = ∅)")
		return 0, steps
	}

	// Bước 1: trừ b cả 2 vế (chuyển vế +b → −b).
	steps = append(steps, fmt.Sprintf("Trừ %s cả 2 vế:  %s·x = %s", fmtNum(b), fmtNum(a), fmtNum(-b)))
	// Bước 2: chia a cả 2 vế.
	steps = append(steps, fmt.Sprintf("Chia %s cả 2 vế: x = %s / %s", fmtNum(a), fmtNum(-b), fmtNum(a)))
	x := -b / a
	steps = append(steps, fmt.Sprintf("Kết luận: x = %s", fmtNum(x)))
	return x, steps
}

// fmtNum in số gọn: nguyên thì bỏ phần thập phân.
func fmtNum(v float64) string {
	if v == math.Trunc(v) && !math.IsInf(v, 0) {
		return fmt.Sprintf("%d", int64(v))
	}
	return fmt.Sprintf("%g", v)
}

// ---------------------------------------------------------------------------
// Phần 3. Giải khi 2 vế có nhiều hạng tử
// ---------------------------------------------------------------------------

// Coeffs đại diện cho biểu thức bậc 1 ax + b (đã rút gọn).
type Coeffs struct {
	A float64 // hệ số của x
	B float64 // hằng số
}

// solveFromCoeffs giải L = R với L, R là biểu thức bậc 1 đã rút gọn.
// Gom về (L.A - R.A)·x + (L.B - R.B) = 0 rồi gọi solveLinear.
func solveFromCoeffs(left, right Coeffs) (float64, string, []string) {
	steps := []string{fmt.Sprintf("Phương trình: %s = %s", fmtTerm(left), fmtTerm(right))}

	a := left.A - right.A
	b := left.B - right.B
	steps = append(steps, fmt.Sprintf("Chuyển tất cả về vế trái: (%s)·x + (%s) = 0",
		fmtNum(a), fmtNum(b)))

	x, status := solveLinear(a, b)
	switch status {
	case "vô nghiệm":
		steps = append(steps, "→ vô nghiệm")
	case "vô số nghiệm":
		steps = append(steps, "→ vô số nghiệm")
	default:
		steps = append(steps, fmt.Sprintf("→ x = %s / %s = %s", fmtNum(-b), fmtNum(a), fmtNum(x)))
	}
	return x, status, steps
}

func fmtTerm(c Coeffs) string {
	var sb strings.Builder
	switch {
	case c.A == 0:
		sb.WriteString(fmtNum(c.B))
		return sb.String()
	case c.A == 1:
		sb.WriteString("x")
	case c.A == -1:
		sb.WriteString("-x")
	default:
		sb.WriteString(fmtNum(c.A))
		sb.WriteString("x")
	}
	switch {
	case c.B > 0:
		sb.WriteString(" + ")
		sb.WriteString(fmtNum(c.B))
	case c.B < 0:
		sb.WriteString(" - ")
		sb.WriteString(fmtNum(-c.B))
	}
	return sb.String()
}

// ---------------------------------------------------------------------------
// Phần 4. Helper cho phương trình phân số (minh hoạ Bài 2)
// ---------------------------------------------------------------------------

// solveFractionEquation giải pt dạng:
//	(p1*x + q1)/d1 - (p2*x + q2)/d2 = rhs
// bằng cách nhân BCNN(d1, d2) vào 2 vế rồi gọi solveFromCoeffs.
func solveFractionEquation(p1, q1, d1, p2, q2, d2, rhs float64) (float64, string, []string) {
	steps := []string{fmt.Sprintf("Phương trình: (%s·x + %s)/%s - (%s·x + %s)/%s = %s",
		fmtNum(p1), fmtNum(q1), fmtNum(d1),
		fmtNum(p2), fmtNum(q2), fmtNum(d2), fmtNum(rhs))}

	L := lcm(int64(d1), int64(d2))
	m := float64(L)
	steps = append(steps, fmt.Sprintf("BCNN(%s, %s) = %d; nhân %d vào cả 2 vế để khử mẫu",
		fmtNum(d1), fmtNum(d2), L, L))

	// Vế trái sau khi khử: (m/d1)*(p1*x+q1) - (m/d2)*(p2*x+q2)
	k1 := m / d1
	k2 := m / d2
	left := Coeffs{A: k1*p1 - k2*p2, B: k1*q1 - k2*q2}
	right := Coeffs{A: 0, B: m * rhs}
	steps = append(steps, fmt.Sprintf("Sau khử mẫu: %s = %s", fmtTerm(left), fmtTerm(right)))

	x, status, sub := solveFromCoeffs(left, right)
	steps = append(steps, sub[1:]...) // bỏ dòng "Phương trình:" của subcall
	return x, status, steps
}

func gcd(a, b int64) int64 {
	if a < 0 {
		a = -a
	}
	if b < 0 {
		b = -b
	}
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func lcm(a, b int64) int64 {
	if a == 0 || b == 0 {
		return 0
	}
	return a / gcd(a, b) * b
}

// ---------------------------------------------------------------------------
// Phần 5. main — chạy lời giải các bài tập trong README
// ---------------------------------------------------------------------------

func main() {
	fmt.Println("============================================================")
	fmt.Println("Lesson 03 — Phương trình bậc 1: lời giải các bài tập")
	fmt.Println("============================================================")

	// Bài 1: 5x - 7 = 2x + 8
	fmt.Println("\n--- Bài 1: 5x − 7 = 2x + 8 ---")
	x1, st1, log1 := solveFromCoeffs(Coeffs{A: 5, B: -7}, Coeffs{A: 2, B: 8})
	printSteps(log1)
	fmt.Printf("Kết quả: %s, x = %s\n", st1, fmtNum(x1))

	// Bài 2: (x+2)/3 − (x−1)/4 = 2
	fmt.Println("\n--- Bài 2: (x+2)/3 − (x−1)/4 = 2 ---")
	x2, st2, log2 := solveFractionEquation(1, 2, 3, 1, -1, 4, 2)
	printSteps(log2)
	fmt.Printf("Kết quả: %s, x = %s\n", st2, fmtNum(x2))

	// Bài 3: 2(3x − 1) − 3(x + 2) = 4(x − 1)
	// Khai triển: 6x − 2 − 3x − 6 = 4x − 4  →  3x − 8 = 4x − 4
	fmt.Println("\n--- Bài 3: 2(3x − 1) − 3(x + 2) = 4(x − 1) ---")
	x3, st3, log3 := solveFromCoeffs(Coeffs{A: 3, B: -8}, Coeffs{A: 4, B: -4})
	printSteps(log3)
	fmt.Printf("Kết quả: %s, x = %s\n", st3, fmtNum(x3))

	// Bài 4: word problem.
	// Đặt số nhỏ = x; số lớn = 4x. Tổng = 50 → x + 4x = 50 → 5x = 50 → x = 10.
	fmt.Println("\n--- Bài 4: Tổng = 50, số lớn = 4 × số nhỏ ---")
	x4, st4, log4 := solveFromCoeffs(Coeffs{A: 5, B: 0}, Coeffs{A: 0, B: 50})
	printSteps(log4)
	fmt.Printf("Kết quả: %s\n", st4)
	if st4 == "nghiệm duy nhất" {
		fmt.Printf("→ số nhỏ = %s, số lớn = %s\n", fmtNum(x4), fmtNum(4*x4))
	}

	// Bài 5: kiểm tra solveLinearErr với nhiều case.
	fmt.Println("\n--- Bài 5: solveLinearErr ---")
	cases := [][2]float64{{2, -6}, {0, 0}, {0, 5}, {1, 1}, {3, 5}}
	for _, c := range cases {
		x, err := solveLinearErr(c[0], c[1])
		if err != nil {
			fmt.Printf("  a=%s, b=%s → %v\n", fmtNum(c[0]), fmtNum(c[1]), err)
		} else {
			fmt.Printf("  a=%s, b=%s → x = %s\n", fmtNum(c[0]), fmtNum(c[1]), fmtNum(x))
		}
	}

	// Demo trường hợp đặc biệt.
	fmt.Println("\n--- Demo: vô nghiệm và vô số nghiệm ---")
	demos := []struct {
		desc        string
		left, right Coeffs
	}{
		{"2x + 3 = 2x + 5 (vô nghiệm)", Coeffs{A: 2, B: 3}, Coeffs{A: 2, B: 5}},
		{"2x + 3 = 2x + 3 (vô số nghiệm)", Coeffs{A: 2, B: 3}, Coeffs{A: 2, B: 3}},
	}
	for _, d := range demos {
		_, st, _ := solveFromCoeffs(d.left, d.right)
		fmt.Printf("  %s → %s\n", d.desc, st)
	}
}

func printSteps(steps []string) {
	for _, s := range steps {
		fmt.Println("  " + s)
	}
}
