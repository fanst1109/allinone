// Lesson 04 — Logic & Boolean Algebra
// Bộ công cụ tổng quát để làm việc với mệnh đề & biểu thức Boolean:
//   - Sinh truth table cho biểu thức bất kỳ
//   - Kiểm tra tautology / contradiction / contingency
//   - Kiểm tra tương đương 2 biểu thức (A ≡ B?)
//   - Demo De Morgan, simplification minh họa
//
// Chạy:
//   go run solutions.go

package main

import (
	"fmt"
	"strings"
)

// ─────────────────────────────────────────────────────────────────────────────
// Toán tử logic — implement trực tiếp (Go đã có &&, ||, !; viết ra để minh họa
// đặc biệt các toán tử Go không có sẵn: implies, iff, xor).
// ─────────────────────────────────────────────────────────────────────────────

// Not — phủ định.
func Not(p bool) bool { return !p }

// And — hội. Đúng khi cả hai True.
func And(p, q bool) bool { return p && q }

// Or — tuyển (inclusive). Đúng khi ít nhất một True.
func Or(p, q bool) bool { return p || q }

// Xor — tuyển loại trừ. Đúng khi khác nhau.
func Xor(p, q bool) bool { return p != q }

// Implies — kéo theo (p → q). Sai duy nhất khi p=T, q=F.
// Đẳng thức kinh điển: p → q ≡ ¬p ∨ q.
func Implies(p, q bool) bool { return !p || q }

// Iff — biconditional (p ↔ q). Đúng khi cùng giá trị.
func Iff(p, q bool) bool { return p == q }

// ─────────────────────────────────────────────────────────────────────────────
// Truth table — sinh bảng chân lý tổng quát cho n biến.
// ─────────────────────────────────────────────────────────────────────────────

// TruthTable sinh bảng chân lý cho biểu thức có n biến.
// eval nhận slice các bool (theo thứ tự biến 0..n-1) và trả về kết quả biểu thức.
// Trả về: slice các hàng. Mỗi hàng dài n+1: n giá trị biến + 1 giá trị kết quả.
//
// Ví dụ: TruthTable(2, func(v []bool) bool { return v[0] && v[1] })
// trả về 4 hàng:
//   [F F F]
//   [F T F]
//   [T F F]
//   [T T T]
func TruthTable(n int, eval func([]bool) bool) [][]bool {
	rows := 1 << n // 2^n
	table := make([][]bool, rows)
	for i := 0; i < rows; i++ {
		vars := make([]bool, n)
		// Decode i thành n bit, bit cao nhất là biến đầu tiên (đọc tự nhiên L→R).
		for j := 0; j < n; j++ {
			vars[j] = (i>>(n-1-j))&1 == 1
		}
		table[i] = append(vars, eval(vars))
	}
	return table
}

// PrintTruthTable in bảng chân lý với header tên biến.
// Cột cuối là kết quả (label "out").
func PrintTruthTable(varNames []string, table [][]bool) {
	// Header
	parts := append([]string{}, varNames...)
	parts = append(parts, "out")
	fmt.Println(strings.Join(parts, " | "))
	fmt.Println(strings.Repeat("-", len(strings.Join(parts, " | "))))
	// Rows
	for _, row := range table {
		cells := make([]string, len(row))
		for i, v := range row {
			cells[i] = boolStr(v)
		}
		fmt.Println(strings.Join(cells, " | "))
	}
}

func boolStr(b bool) string {
	if b {
		return "T"
	}
	return "F"
}

// ─────────────────────────────────────────────────────────────────────────────
// Phân loại biểu thức: Tautology / Contradiction / Contingency
// ─────────────────────────────────────────────────────────────────────────────

// IsTautology trả về true nếu biểu thức luôn đúng ở mọi hàng truth table.
func IsTautology(n int, eval func([]bool) bool) bool {
	table := TruthTable(n, eval)
	for _, row := range table {
		if !row[len(row)-1] {
			return false
		}
	}
	return true
}

// IsContradiction trả về true nếu biểu thức luôn sai.
func IsContradiction(n int, eval func([]bool) bool) bool {
	table := TruthTable(n, eval)
	for _, row := range table {
		if row[len(row)-1] {
			return false
		}
	}
	return true
}

// IsContingent: vừa đúng vừa sai (= không phải taut. cũng không phải contra.)
func IsContingent(n int, eval func([]bool) bool) bool {
	return !IsTautology(n, eval) && !IsContradiction(n, eval)
}

// Classify trả về chuỗi mô tả loại biểu thức.
func Classify(n int, eval func([]bool) bool) string {
	switch {
	case IsTautology(n, eval):
		return "Tautology (luôn đúng)"
	case IsContradiction(n, eval):
		return "Contradiction (luôn sai)"
	default:
		return "Contingency (đôi khi đúng đôi khi sai)"
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Equivalence — kiểm tra A ≡ B bằng cách build bảng cho (A ↔ B), nếu tautology
// thì tương đương. Cách thẳng thắn nhất, đúng 100%.
// ─────────────────────────────────────────────────────────────────────────────

// AreEquivalent kiểm tra 2 biểu thức A, B có tương đương không.
// n: số biến chung. evalA, evalB nhận cùng slice biến.
func AreEquivalent(n int, evalA, evalB func([]bool) bool) bool {
	return IsTautology(n, func(v []bool) bool {
		return Iff(evalA(v), evalB(v))
	})
}

// ─────────────────────────────────────────────────────────────────────────────
// SAT brute force — tìm assignment làm biểu thức đúng (nếu có).
// ─────────────────────────────────────────────────────────────────────────────

// FindSatisfying tìm 1 assignment thỏa biểu thức. Trả về (assignment, true)
// nếu tìm thấy, ngược lại (nil, false). Brute force O(2^n · |φ|).
func FindSatisfying(n int, eval func([]bool) bool) ([]bool, bool) {
	for i := 0; i < (1 << n); i++ {
		vars := make([]bool, n)
		for j := 0; j < n; j++ {
			vars[j] = (i>>(n-1-j))&1 == 1
		}
		if eval(vars) {
			return vars, true
		}
	}
	return nil, false
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo trong main: chạy lại các bài tập trong README.
// ─────────────────────────────────────────────────────────────────────────────

func main() {
	demo1_basicTable()
	demo2_deMorgan()
	demo3_classify()
	demo4_equivalence()
	demo5_simplification()
}

// Bài 1 (gần đúng): bảng chân lý cho (p → q) ∧ (q → p) — kỳ vọng ≡ (p ↔ q).
func demo1_basicTable() {
	fmt.Println("=== Demo 1: (p → q) ∧ (q → p) ≡ p ↔ q ===")
	eval := func(v []bool) bool {
		p, q := v[0], v[1]
		return And(Implies(p, q), Implies(q, p))
	}
	PrintTruthTable([]string{"p", "q"}, TruthTable(2, eval))
	// Verify equivalence với (p ↔ q)
	iff := func(v []bool) bool { return Iff(v[0], v[1]) }
	fmt.Printf("Tương đương (p ↔ q)? %t\n\n", AreEquivalent(2, eval, iff))
}

// Bài 2 demo: ¬((a ∨ b) ∧ ¬c) ≡ (¬a ∧ ¬b) ∨ c
func demo2_deMorgan() {
	fmt.Println("=== Demo 2: De Morgan — ¬((a ∨ b) ∧ ¬c) ≡ (¬a ∧ ¬b) ∨ c ===")
	left := func(v []bool) bool {
		a, b, c := v[0], v[1], v[2]
		return Not(And(Or(a, b), Not(c)))
	}
	right := func(v []bool) bool {
		a, b, c := v[0], v[1], v[2]
		return Or(And(Not(a), Not(b)), c)
	}
	fmt.Printf("Tương đương? %t\n\n", AreEquivalent(3, left, right))
}

// Bài 4: phân loại tautology / contradiction / contingency
func demo3_classify() {
	fmt.Println("=== Demo 3: Classify ===")

	// 1) (p → q) ∨ (q → p) — tautology
	e1 := func(v []bool) bool {
		p, q := v[0], v[1]
		return Or(Implies(p, q), Implies(q, p))
	}
	fmt.Printf("(p → q) ∨ (q → p): %s\n", Classify(2, e1))

	// 2) (p ∧ q) ∧ ¬(p ∨ q) — contradiction
	e2 := func(v []bool) bool {
		p, q := v[0], v[1]
		return And(And(p, q), Not(Or(p, q)))
	}
	fmt.Printf("(p ∧ q) ∧ ¬(p ∨ q): %s\n", Classify(2, e2))

	// 3) (p ⊕ q) ∧ p — contingency
	e3 := func(v []bool) bool {
		p, q := v[0], v[1]
		return And(Xor(p, q), p)
	}
	fmt.Printf("(p ⊕ q) ∧ p: %s\n\n", Classify(2, e3))
}

// Bài 3: A = p → (q → r), B = (p ∧ q) → r
func demo4_equivalence() {
	fmt.Println("=== Demo 4: Currying — p → (q → r) ≡ (p ∧ q) → r ===")
	a := func(v []bool) bool {
		p, q, r := v[0], v[1], v[2]
		return Implies(p, Implies(q, r))
	}
	b := func(v []bool) bool {
		p, q, r := v[0], v[1], v[2]
		return Implies(And(p, q), r)
	}
	fmt.Printf("Tương đương? %t\n\n", AreEquivalent(3, a, b))
}

// Bài 6: đơn giản hóa điều kiện thực tế
//
//	(isActive ∧ ¬isDeleted) ∨ (isActive ∧ isDeleted ∧ hasOverride)
//	≡ isActive ∧ (¬isDeleted ∨ hasOverride)
func demo5_simplification() {
	fmt.Println("=== Demo 5: Simplification — điều kiện code thực tế ===")
	// 3 biến: isActive, isDeleted, hasOverride
	complex := func(v []bool) bool {
		isActive, isDeleted, hasOverride := v[0], v[1], v[2]
		return Or(
			And(isActive, Not(isDeleted)),
			And(And(isActive, isDeleted), hasOverride),
		)
	}
	simple := func(v []bool) bool {
		isActive, isDeleted, hasOverride := v[0], v[1], v[2]
		return And(isActive, Or(Not(isDeleted), hasOverride))
	}
	fmt.Printf("Tương đương? %t\n", AreEquivalent(3, complex, simple))
	fmt.Println("Bảng chân lý dạng rút gọn:")
	PrintTruthTable([]string{"act", "del", "ovr"}, TruthTable(3, simple))
}
