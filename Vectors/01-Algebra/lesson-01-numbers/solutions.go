// Package main — lời giải Lesson 01: Số và trục số.
//
// Cách chạy:
//
//	go run solutions.go
package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// classifyNumber phân loại một biểu diễn chuỗi của số thuộc tập nào.
// Trả về một trong: "natural", "integer", "rational", "irrational", "unknown".
//
// Quy ước input chấp nhận:
//   - "3", "-7", "0"               → integer/natural
//   - "0.5", "-1.25"               → rational (số thập phân hữu hạn)
//   - "1/3", "-22/7"               → rational (phân số)
//   - "0.333..." (kết thúc bởi ...) → rational (tuần hoàn)
//   - "sqrt(2)", "sqrt(3)", "pi", "e" → irrational
//   - "sqrt(4)", "sqrt(9)"         → integer (căn của số chính phương)
//
// Đây là heuristic giáo dục, không phải parser tổng quát.
func classifyNumber(s string) string {
	s = strings.TrimSpace(s)

	// Các hằng vô tỉ thông dụng
	if s == "pi" || s == "π" || s == "e" {
		return "irrational"
	}

	// sqrt(n) — căn bậc 2 của số nguyên không âm
	if strings.HasPrefix(s, "sqrt(") && strings.HasSuffix(s, ")") {
		inner := s[5 : len(s)-1]
		if n, err := strconv.Atoi(inner); err == nil && n >= 0 {
			// Kiểm tra n có phải số chính phương: nếu là, sqrt(n) là số nguyên
			r := int(math.Round(math.Sqrt(float64(n))))
			if r*r == n {
				if r >= 0 {
					return "natural"
				}
				return "integer"
			}
			return "irrational"
		}
		return "unknown"
	}

	// Phân số p/q
	if strings.Contains(s, "/") {
		parts := strings.SplitN(s, "/", 2)
		if len(parts) == 2 {
			p, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
			q, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))
			if err1 == nil && err2 == nil && q != 0 {
				// Nếu p chia hết cho q thì là số nguyên/tự nhiên
				if p%q == 0 {
					r := p / q
					if r >= 0 {
						return "natural"
					}
					return "integer"
				}
				return "rational"
			}
		}
		return "unknown"
	}

	// Số tuần hoàn dạng "0.333..." — vẫn là hữu tỉ
	if strings.HasSuffix(s, "...") {
		core := strings.TrimSuffix(s, "...")
		if _, err := strconv.ParseFloat(core, 64); err == nil {
			return "rational"
		}
		return "unknown"
	}

	// Số nguyên thuần
	if n, err := strconv.Atoi(s); err == nil {
		if n >= 0 {
			return "natural"
		}
		return "integer"
	}

	// Số thập phân hữu hạn → hữu tỉ (vì kết thúc dạng p/10^k)
	if _, err := strconv.ParseFloat(s, 64); err == nil {
		return "rational"
	}

	return "unknown"
}

// absInt minh họa |x| cho số nguyên — định nghĩa thủ công thay vì dùng math.Abs.
func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// absFloat minh họa |x| cho số thực — tương tự, không dùng math.Abs.
func absFloat(x float64) float64 {
	if x < 0 {
		return -x
	}
	return x
}

// almostEqual trả về true nếu |a − b| < eps (so sánh tuyệt đối).
// Đây là cách so sánh hai float64 đúng đắn — không dùng `==`.
func almostEqual(a, b, eps float64) bool {
	return absFloat(a-b) < eps
}

// almostEqualBetter — phiên bản kết hợp tuyệt đối + tương đối, hoạt động đúng
// với cả số rất lớn lẫn rất nhỏ.
func almostEqualBetter(a, b, eps float64) bool {
	diff := absFloat(a - b)
	if diff < eps {
		return true // ngưỡng tuyệt đối cho số gần 0
	}
	largest := math.Max(absFloat(a), absFloat(b))
	return diff < eps*largest // ngưỡng tương đối
}

// distance trả về khoảng cách giữa hai điểm trên trục số: |a − b|.
func distance(a, b float64) float64 {
	return absFloat(a - b)
}

// isSquare kiểm tra n có phải số chính phương không (dùng cho phân loại sqrt).
func isSquare(n int) bool {
	if n < 0 {
		return false
	}
	r := int(math.Round(math.Sqrt(float64(n))))
	return r*r == n
}

func main() {
	// === Bài 1: Phân loại số ===
	fmt.Println("=== Bài 1: Phân loại số ===")
	inputs := []string{
		"0", "-3", "0.5", "sqrt(2)", "pi", "-1.5",
		"22/7", "0.333...", "sqrt(4)", "-0",
	}
	for _, s := range inputs {
		fmt.Printf("  %-12s → %s\n", s, classifyNumber(s))
	}

	// === Bài 2: Tính giá trị tuyệt đối ===
	fmt.Println("\n=== Bài 2: Giá trị tuyệt đối ===")
	fmt.Printf("  |−7|        = %d\n", absInt(-7))
	fmt.Printf("  |3|         = %d\n", absInt(3))
	fmt.Printf("  |0|         = %d\n", absInt(0))
	fmt.Printf("  |3 − 8|     = %d\n", absInt(3-8))
	fmt.Printf("  |−2 + 5|    = %d\n", absInt(-2+5))
	fmt.Printf("  |−4| · |−2| = %d\n", absInt(-4)*absInt(-2))
	fmt.Printf("  ||−5| − |3|| = %d\n", absInt(absInt(-5)-absInt(3)))

	// === Bài 3: So sánh ===
	fmt.Println("\n=== Bài 3: So sánh ===")
	piApprox := 22.0 / 7.0
	fmt.Printf("  22/7 = %.10f\n", piApprox)
	fmt.Printf("  π    = %.10f\n", math.Pi)
	fmt.Printf("  → 22/7 > π : %v\n", piApprox > math.Pi)
	fmt.Println("  0.999... = 1 (chứng minh đại số: gọi x=0.999..., 10x = 9 + x, 9x = 9, x = 1)")
	fmt.Printf("  √2    = %.10f\n", math.Sqrt(2))
	fmt.Printf("  1.414 < √2 : %v\n", 1.414 < math.Sqrt(2))
	fmt.Printf("  −|−3| = %d, so với −3 → bằng nhau\n", -absInt(-3))
	fmt.Printf("  |−5| = %d, |3 − 8| = %d → bằng nhau\n", absInt(-5), absInt(3-8))

	// === Bài 4: Chứng minh √3 vô tỉ (mô phỏng tính chất p² ≡ 0 mod 3 → p ≡ 0 mod 3) ===
	fmt.Println("\n=== Bài 4: Bổ đề p² mod 3 ===")
	fmt.Println("  p     p mod 3   p² mod 3")
	for p := 0; p <= 8; p++ {
		fmt.Printf("  %2d      %d         %d\n", p, p%3, (p*p)%3)
	}
	fmt.Println("  → p² mod 3 = 0 ⇔ p mod 3 = 0. Đây là chìa khóa chứng minh √3 vô tỉ.")

	// === Bài 5: almostEqual và demo float precision ===
	fmt.Println("\n=== Bài 5: Float precision ===")
	a := 0.1
	b := 0.2
	c := a + b
	fmt.Printf("  0.1 + 0.2          = %.20f\n", c)
	fmt.Printf("  0.3                = %.20f\n", 0.3)
	fmt.Printf("  c == 0.3           : %v   ← KHÔNG dùng == với float!\n", c == 0.3)
	fmt.Printf("  almostEqual(c, 0.3, 1e-9) : %v\n", almostEqual(c, 0.3, 1e-9))

	// Cộng 0.1 mười lần
	s := 0.0
	for i := 0; i < 10; i++ {
		s += 0.1
	}
	fmt.Printf("  sum(0.1)*10        = %.20f (đáng lẽ 1.0)\n", s)
	fmt.Printf("  almostEqual(s, 1.0, 1e-9) : %v\n", almostEqual(s, 1.0, 1e-9))

	// Cảnh báo: almostEqual tuyệt đối có hạn chế
	fmt.Println("\n  --- Hạn chế almostEqual tuyệt đối ---")
	// Trường hợp 1: số rất lớn. Hai số chỉ lệch 0.01, nhưng so với 1e10
	// thì gần như giống hệt nhau (sai số tương đối ~1e-12). almostEqual tuyệt đối
	// với eps = 1e-9 trả về false → sai về mặt ý nghĩa.
	bigA := 1e10
	bigB := 1e10 + 0.01
	fmt.Printf("  almostEqual(1e10, 1e10+0.01, 1e-9)      : %v  ← false, dù gần như bằng nhau\n",
		almostEqual(bigA, bigB, 1e-9))
	fmt.Printf("  almostEqualBetter(1e10, 1e10+0.01, 1e-9): %v  ← true, hợp lý hơn\n",
		almostEqualBetter(bigA, bigB, 1e-9))

	// Trường hợp 2: số rất nhỏ. 1e-20 và 2e-20 gấp đôi nhau, khác xa về tỉ lệ —
	// nhưng hiệu tuyệt đối chỉ 1e-20, nhỏ hơn eps = 1e-9 → cả hai phiên bản
	// đều coi là "bằng". Đây là hạn chế cố hữu khi ngưỡng tuyệt đối lớn hơn
	// chính số đó. Muốn phân biệt 1e-20 vs 2e-20, phải dùng eps nhỏ hơn nhiều
	// (vd 1e-25) hoặc dùng so sánh thuần tương đối.
	smallA := 1e-20
	smallB := 2e-20
	fmt.Printf("  almostEqual(1e-20, 2e-20, 1e-9)         : %v  ← true (vì eps lớn hơn cả số)\n",
		almostEqual(smallA, smallB, 1e-9))
	fmt.Printf("  almostEqual(1e-20, 2e-20, 1e-25)        : %v  ← false với eps nhỏ phù hợp\n",
		almostEqual(smallA, smallB, 1e-25))

	// === Bonus: khoảng cách trên trục số ===
	fmt.Println("\n=== Bonus: khoảng cách trên trục số ===")
	fmt.Printf("  distance(3, 7)   = %.1f\n", distance(3, 7))
	fmt.Printf("  distance(-2, 5)  = %.1f  (= |−2 − 5| = 7)\n", distance(-2, 5))
	fmt.Printf("  distance(3.14, math.Pi) = %.10f\n", distance(3.14, math.Pi))

	// === Bonus: số chính phương ===
	fmt.Println("\n=== Bonus: kiểm tra số chính phương ===")
	for _, n := range []int{0, 1, 2, 4, 9, 10, 16, 25, 26} {
		fmt.Printf("  %2d chính phương? %v\n", n, isSquare(n))
	}
}
