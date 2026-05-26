// Lesson 30 — Generics: lời giải đầy đủ.
//
// File này biên dịch độc lập với `go run solutions.go`.
// Yêu cầu Go 1.21+ (dùng package `cmp` cho `cmp.Ordered`).
//
// Mục tiêu:
//   - Demo Min/Max/Sum/Map/Filter/Reduce dạng generic.
//   - Cài đặt Set[T comparable] và LinkedList[T any].
//   - Benchmark "miniature" so sánh Sum generic vs interface{} vs raw int —
//     in ra console (đây là micro-bench, không thay thế `go test -bench`).

package main

import (
	"cmp"
	"errors"
	"fmt"
	"strings"
	"time"
)

// ---------------------------------------------------------------------------
// 1. Min / Max / Sum
// ---------------------------------------------------------------------------

// Min trả về giá trị nhỏ hơn giữa a và b.
// T phải implement Ordered (có toán tử <, >).
func Min[T cmp.Ordered](a, b T) T {
	if a < b {
		return a
	}
	return b
}

// Max trả về giá trị lớn hơn giữa a và b.
func Max[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Number = constraint cho mọi numeric type có toán tử +.
// Dùng ~ để bao gồm cả type alias do user định nghĩa (vd type Cents int).
type Number interface {
	~int | ~int8 | ~int16 | ~int32 | ~int64 |
		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
		~float32 | ~float64
}

// Sum cộng tất cả phần tử trong slice. T phải hỗ trợ toán tử +.
func Sum[T Number](xs []T) T {
	var s T
	for _, x := range xs {
		s += x
	}
	return s
}

// ---------------------------------------------------------------------------
// 2. Map / Filter / Reduce
// ---------------------------------------------------------------------------

// Map biến []T thành []U qua hàm f.
// Vd: Map([]int{1,2,3}, fmt.Sprintf("#%d", _)) → ["#1","#2","#3"].
func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, len(xs))
	for i, x := range xs {
		out[i] = f(x)
	}
	return out
}

// Filter giữ phần tử thoả pred.
func Filter[T any](xs []T, pred func(T) bool) []T {
	out := make([]T, 0, len(xs))
	for _, x := range xs {
		if pred(x) {
			out = append(out, x)
		}
	}
	return out
}

// Reduce gộp slice []T về 1 giá trị type A (accumulator).
// init = giá trị khởi tạo của accumulator.
func Reduce[T, A any](xs []T, init A, f func(A, T) A) A {
	acc := init
	for _, x := range xs {
		acc = f(acc, x)
	}
	return acc
}

// ---------------------------------------------------------------------------
// 3. Validator chain — ví dụ sử dụng generic function trong thực tế
// ---------------------------------------------------------------------------

// Validator nhận giá trị type T và trả về error nếu sai.
type Validator[T any] func(T) error

// Chain nối nhiều validator — dừng ở error đầu tiên.
func Chain[T any](vs ...Validator[T]) Validator[T] {
	return func(v T) error {
		for _, vd := range vs {
			if err := vd(v); err != nil {
				return err
			}
		}
		return nil
	}
}

// ---------------------------------------------------------------------------
// 4. Generic container — Set[T comparable]
// ---------------------------------------------------------------------------

// Set là set generic. T phải comparable để làm map key.
type Set[T comparable] struct {
	m map[T]struct{}
}

// NewSet tạo set từ các phần tử ban đầu.
func NewSet[T comparable](items ...T) *Set[T] {
	s := &Set[T]{m: make(map[T]struct{}, len(items))}
	for _, x := range items {
		s.m[x] = struct{}{}
	}
	return s
}

func (s *Set[T]) Add(v T)      { s.m[v] = struct{}{} }
func (s *Set[T]) Has(v T) bool { _, ok := s.m[v]; return ok }
func (s *Set[T]) Remove(v T)   { delete(s.m, v) }
func (s *Set[T]) Len() int     { return len(s.m) }

// Union trả về tập hợp = s ∪ o.
func (s *Set[T]) Union(o *Set[T]) *Set[T] {
	out := NewSet[T]()
	for k := range s.m {
		out.Add(k)
	}
	for k := range o.m {
		out.Add(k)
	}
	return out
}

// Intersect trả về tập hợp = s ∩ o.
// Tối ưu: iterate set nhỏ hơn.
func (s *Set[T]) Intersect(o *Set[T]) *Set[T] {
	out := NewSet[T]()
	small, big := s, o
	if big.Len() < small.Len() {
		small, big = big, small
	}
	for k := range small.m {
		if big.Has(k) {
			out.Add(k)
		}
	}
	return out
}

// ToSlice trả về tất cả phần tử (không đảm bảo thứ tự).
func (s *Set[T]) ToSlice() []T {
	out := make([]T, 0, len(s.m))
	for k := range s.m {
		out = append(out, k)
	}
	return out
}

// ---------------------------------------------------------------------------
// 5. Generic container — LinkedList[T any]
// ---------------------------------------------------------------------------

// node là node nội bộ của LinkedList. node generic cũng cần [T].
type node[T any] struct {
	val  T
	next *node[T]
}

// LinkedList — singly linked list, push/pop ở đầu (O(1)).
type LinkedList[T any] struct {
	head *node[T]
	n    int
}

// Push thêm v vào đầu danh sách.
func (l *LinkedList[T]) Push(v T) {
	l.head = &node[T]{val: v, next: l.head}
	l.n++
}

// Pop lấy ra phần tử đầu. Trả về zero value + false nếu rỗng.
func (l *LinkedList[T]) Pop() (T, bool) {
	var zero T
	if l.head == nil {
		return zero, false
	}
	v := l.head.val
	l.head = l.head.next
	l.n--
	return v, true
}

// Len trả về số phần tử.
func (l *LinkedList[T]) Len() int { return l.n }

// ToSlice chuyển toàn bộ list thành slice (theo thứ tự từ đầu).
func (l *LinkedList[T]) ToSlice() []T {
	out := make([]T, 0, l.n)
	for cur := l.head; cur != nil; cur = cur.next {
		out = append(out, cur.val)
	}
	return out
}

// ---------------------------------------------------------------------------
// 6. Generic Stack[T any]
// ---------------------------------------------------------------------------

type Stack[T any] struct {
	items []T
}

func NewStack[T any]() *Stack[T] {
	return &Stack[T]{}
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	n := len(s.items) - 1
	v := s.items[n]
	s.items = s.items[:n]
	return v, true
}

func (s *Stack[T]) Len() int { return len(s.items) }

// ---------------------------------------------------------------------------
// 7. Benchmark mini — Sum generic vs interface{} vs raw int
// ---------------------------------------------------------------------------

// SumRaw — phiên bản monomorphic, chỉ làm với int.
func SumRaw(xs []int) int {
	var s int
	for _, x := range xs {
		s += x
	}
	return s
}

// SumInterface — phiên bản cũ dùng interface{} + type assertion.
func SumInterface(xs []interface{}) interface{} {
	var s int
	for _, x := range xs {
		s += x.(int)
	}
	return s
}

// benchmark đo thời gian chạy fn 1 lần và in ra console.
func benchmark(name string, fn func()) {
	t0 := time.Now()
	fn()
	d := time.Since(t0)
	fmt.Printf("  %-25s %v\n", name, d)
}

// ---------------------------------------------------------------------------
// MAIN — demo + benchmark
// ---------------------------------------------------------------------------

func main() {
	fmt.Println("=== Lesson 30 — Generics ===")

	// 1. Min / Max / Sum
	fmt.Println("\n[1] Min/Max/Sum")
	fmt.Println("Min(3, 5)         =", Min(3, 5))
	fmt.Println("Min(3.5, 1.2)     =", Min(3.5, 1.2))
	fmt.Println("Min(\"a\", \"b\")     =", Min("a", "b"))
	fmt.Println("Max(-1, -7)       =", Max(-1, -7))
	fmt.Println("Sum([1,2,3,4])    =", Sum([]int{1, 2, 3, 4}))
	fmt.Println("Sum([1.5,2.5])    =", Sum([]float64{1.5, 2.5}))

	// ~ với user-defined type
	type Cents int
	fmt.Println("Sum([]Cents{...}) =", Sum([]Cents{100, 250, 75}))

	// 2. Map / Filter / Reduce
	fmt.Println("\n[2] Map/Filter/Reduce")
	doubled := Map([]int{1, 2, 3}, func(x int) int { return x * 2 })
	fmt.Println("Map(*2)           =", doubled)
	tagged := Map([]int{1, 2, 3}, func(x int) string {
		return fmt.Sprintf("#%d", x)
	})
	fmt.Println("Map(tag)          =", tagged)

	evens := Filter([]int{1, 2, 3, 4, 5}, func(x int) bool { return x%2 == 0 })
	fmt.Println("Filter(even)      =", evens)

	total := Reduce([]int{1, 2, 3, 4}, 0, func(a, x int) int { return a + x })
	fmt.Println("Reduce(sum)       =", total)

	// 3. Validator chain
	fmt.Println("\n[3] Validator chain")
	notEmpty := Validator[string](func(s string) error {
		if s == "" {
			return errors.New("empty")
		}
		return nil
	})
	maxLen := Validator[string](func(s string) error {
		if len(s) > 5 {
			return errors.New("too long")
		}
		return nil
	})
	v := Chain(notEmpty, maxLen)
	fmt.Println("validate(\"hi\")    =", v("hi"))
	fmt.Println("validate(\"\")      =", v(""))
	fmt.Println("validate(\"abcdef\")=", v("abcdef"))

	// 4. Set
	fmt.Println("\n[4] Set[T comparable]")
	a := NewSet(1, 2, 3)
	b := NewSet(3, 4, 5)
	fmt.Println("a ∪ b             =", sortedInts(a.Union(b).ToSlice()))
	fmt.Println("a ∩ b             =", sortedInts(a.Intersect(b).ToSlice()))
	fmt.Println("a.Has(2)          =", a.Has(2))
	fmt.Println("a.Has(99)         =", a.Has(99))

	// 5. LinkedList
	fmt.Println("\n[5] LinkedList[T any]")
	l := &LinkedList[string]{}
	l.Push("alpha")
	l.Push("beta")
	l.Push("gamma")
	fmt.Println("after 3 Push      =", l.ToSlice())
	v1, _ := l.Pop()
	fmt.Println("Pop()             =", v1)
	fmt.Println("after Pop         =", l.ToSlice(), "len =", l.Len())

	// 6. Stack
	fmt.Println("\n[6] Stack[T any]")
	st := NewStack[int]()
	st.Push(10)
	st.Push(20)
	st.Push(30)
	x, _ := st.Pop()
	fmt.Println("Stack pop         =", x, "len =", st.Len())

	// 7. Benchmark mini
	fmt.Println("\n[7] Benchmark Sum 1M ints (3 cách):")
	N := 1_000_000
	xsInt := make([]int, N)
	xsIface := make([]interface{}, N)
	for i := 0; i < N; i++ {
		xsInt[i] = i
		xsIface[i] = i
	}

	// 3 lần đo cho mỗi để giảm jitter
	for run := 1; run <= 3; run++ {
		fmt.Printf(" Run %d:\n", run)
		benchmark("SumRaw(int)", func() {
			_ = SumRaw(xsInt)
		})
		benchmark("Sum[int](generic)", func() {
			_ = Sum(xsInt)
		})
		benchmark("SumInterface", func() {
			_ = SumInterface(xsIface)
		})
	}

	fmt.Println(strings.Repeat("-", 50))
	fmt.Println("Generic gần raw; interface{} chậm hơn vài lần do boxing + assertion.")
}

// sortedInts dùng nội bộ để in Set có thứ tự ổn định (Set không sắp xếp).
func sortedInts(xs []int) []int {
	// Insertion sort — n nhỏ, chấp nhận được.
	for i := 1; i < len(xs); i++ {
		j := i
		for j > 0 && xs[j-1] > xs[j] {
			xs[j-1], xs[j] = xs[j], xs[j-1]
			j--
		}
	}
	return xs
}
