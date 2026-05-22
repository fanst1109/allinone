// Package main — lời giải Lesson 03: Set Theory.
//
// Cách chạy:
//
//	go run solutions.go
package main

import (
	"fmt"
	"sort"
)

// === IntSet — cài đặt set bằng map[int]struct{} (idiom Go) ===

type IntSet map[int]struct{}

func NewIntSet(elems ...int) IntSet {
	s := IntSet{}
	for _, x := range elems {
		s.Add(x)
	}
	return s
}

func (s IntSet) Add(x int)           { s[x] = struct{}{} }
func (s IntSet) Remove(x int)        { delete(s, x) }
func (s IntSet) Contains(x int) bool { _, ok := s[x]; return ok }
func (s IntSet) Size() int           { return len(s) }

func (s IntSet) Union(other IntSet) IntSet {
	r := NewIntSet()
	for x := range s {
		r.Add(x)
	}
	for x := range other {
		r.Add(x)
	}
	return r
}

func (s IntSet) Intersect(other IntSet) IntSet {
	r := NewIntSet()
	// Lặp qua tập nhỏ hơn để tối ưu.
	small, big := s, other
	if len(other) < len(s) {
		small, big = other, s
	}
	for x := range small {
		if big.Contains(x) {
			r.Add(x)
		}
	}
	return r
}

func (s IntSet) Difference(other IntSet) IntSet {
	r := NewIntSet()
	for x := range s {
		if !other.Contains(x) {
			r.Add(x)
		}
	}
	return r
}

func (s IntSet) SymmetricDifference(other IntSet) IntSet {
	return s.Difference(other).Union(other.Difference(s))
}

// IsSubset (Bài 8): kiểm tra s ⊆ other.
func (s IntSet) IsSubset(other IntSet) bool {
	if len(s) > len(other) {
		return false
	}
	for x := range s {
		if !other.Contains(x) {
			return false
		}
	}
	return true
}

// String (Stringer) — in tập theo thứ tự tăng dần để dễ đọc.
func (s IntSet) String() string {
	xs := make([]int, 0, len(s))
	for x := range s {
		xs = append(xs, x)
	}
	sort.Ints(xs)
	return fmt.Sprintf("%v", xs)
}

// === Bài 4: Power set ===

func powerSet(elems []string) [][]string {
	n := len(elems)
	total := 1 << n
	result := make([][]string, 0, total)
	for mask := 0; mask < total; mask++ {
		subset := []string{}
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				subset = append(subset, elems[i])
			}
		}
		result = append(result, subset)
	}
	return result
}

// === Bài 6: Lớp tương đương "chia n dư bằng nhau" ===

func equivalenceClassesMod(elems []int, n int) map[int][]int {
	classes := map[int][]int{}
	for _, x := range elems {
		r := ((x % n) + n) % n // luôn không âm
		classes[r] = append(classes[r], x)
	}
	for r := range classes {
		sort.Ints(classes[r])
	}
	return classes
}

// === Bài 10: Union-Find sơ đồ — tìm các thành phần liên thông ===

type unionFind struct {
	parent []int
}

func newUnionFind(n int) *unionFind {
	p := make([]int, n+1) // index 1..n
	for i := range p {
		p[i] = i
	}
	return &unionFind{parent: p}
}

func (u *unionFind) find(x int) int {
	if u.parent[x] != x {
		u.parent[x] = u.find(u.parent[x]) // path compression
	}
	return u.parent[x]
}

func (u *unionFind) union(a, b int) {
	ra, rb := u.find(a), u.find(b)
	if ra != rb {
		u.parent[ra] = rb
	}
}

func components(n int, pairs [][2]int) [][]int {
	uf := newUnionFind(n)
	for _, p := range pairs {
		uf.union(p[0], p[1])
	}
	groups := map[int][]int{}
	for i := 1; i <= n; i++ {
		r := uf.find(i)
		groups[r] = append(groups[r], i)
	}
	result := [][]int{}
	for _, g := range groups {
		sort.Ints(g)
		result = append(result, g)
	}
	sort.Slice(result, func(i, j int) bool { return result[i][0] < result[j][0] })
	return result
}

// === main ===

func main() {
	// === Bài 1 ===
	fmt.Println("=== Bài 1: phép toán cơ bản trên A, B ===")
	A := NewIntSet(1, 2, 3, 5, 8)
	B := NewIntSet(2, 3, 5, 7)
	fmt.Printf("  A = %s,  B = %s\n", A, B)
	fmt.Printf("  A ∪ B = %s\n", A.Union(B))
	fmt.Printf("  A ∩ B = %s\n", A.Intersect(B))
	fmt.Printf("  A \\ B = %s\n", A.Difference(B))
	fmt.Printf("  B \\ A = %s\n", B.Difference(A))
	fmt.Printf("  A △ B = %s\n", A.SymmetricDifference(B))

	// === Bài 2: phần bù ===
	fmt.Println("\n=== Bài 2: phần bù trong U = {1..10} ===")
	U := NewIntSet()
	for i := 1; i <= 10; i++ {
		U.Add(i)
	}
	even := NewIntSet(2, 4, 6, 8, 10)
	fmt.Printf("  A = %s\n", even)
	fmt.Printf("  Aᶜ = U \\ A = %s\n", U.Difference(even))

	// === Bài 3: kiểm tra mệnh đề ===
	fmt.Println("\n=== Bài 3: subset / proper subset ===")
	empty := NewIntSet()
	s := NewIntSet(1, 2, 3)
	fmt.Printf("  ∅ ⊆ {1,2,3}? %v\n", empty.IsSubset(s))
	s12 := NewIntSet(1, 2)
	fmt.Printf("  {1,2} ⊆ {1,2}? %v\n", s12.IsSubset(s12))
	// Proper subset = subset AND not equal
	proper := s12.IsSubset(s12) && s12.Size() != s12.Size()
	fmt.Printf("  {1,2} ⊂ {1,2} (proper)? %v\n", proper)

	// === Bài 4: power set ===
	fmt.Println("\n=== Bài 4: P({a, b, c}) ===")
	ps := powerSet([]string{"a", "b", "c"})
	for _, sub := range ps {
		fmt.Printf("  %v\n", sub)
	}
	fmt.Printf("  |P| = %d, đối chiếu 2^3 = %d\n", len(ps), 1<<3)

	// === Bài 5: ánh xạ — chỉ kiểm chứ không có code cụ thể, in giải thích ===
	fmt.Println("\n=== Bài 5: f(1)=a, f(2)=b, f(3)=a ===")
	fmt.Println("  injective?  NO  (f(1) = f(3) = a)")
	fmt.Println("  surjective? YES (a được chạm bởi 1,3; b được chạm bởi 2)")
	fmt.Println("  bijective?  NO  (không injective)")

	// === Bài 6: lớp tương đương ===
	fmt.Println("\n=== Bài 6: chia 3 dư bằng nhau trên {1..6} ===")
	classes := equivalenceClassesMod([]int{1, 2, 3, 4, 5, 6}, 3)
	for r := 0; r < 3; r++ {
		fmt.Printf("  dư %d: %v\n", r, classes[r])
	}

	// === Bài 7: test IntSet ===
	fmt.Println("\n=== Bài 7: IntSet ===")
	a := NewIntSet(1, 2, 3)
	b := NewIntSet(3, 4, 5)
	fmt.Printf("  a = %s, b = %s\n", a, b)
	fmt.Printf("  a ∪ b = %s (size = %d)\n", a.Union(b), a.Union(b).Size())
	fmt.Printf("  a ∩ b = %s\n", a.Intersect(b))

	// === Bài 8: isSubset ===
	fmt.Println("\n=== Bài 8: isSubset ===")
	x := NewIntSet(1, 2)
	y := NewIntSet(1, 2, 3, 4)
	fmt.Printf("  {1,2} ⊆ {1,2,3,4}? %v\n", x.IsSubset(y))
	fmt.Printf("  {1,2,3,4} ⊆ {1,2}? %v\n", y.IsSubset(x))

	// === Bài 9: bitmask vs map ===
	fmt.Println("\n=== Bài 9: bitmask trên vũ trụ {0..7} ===")
	var Abits uint8 = (1 << 1) | (1 << 3) | (1 << 5) // {1,3,5}
	var Bbits uint8 = (1 << 3) | (1 << 4) | (1 << 5) // {3,4,5}
	fmt.Printf("  A bits = %08b, B bits = %08b\n", Abits, Bbits)
	fmt.Printf("  A ∪ B  = %08b → %v\n",
		Abits|Bbits, bitsToSet(Abits|Bbits))
	fmt.Printf("  A ∩ B  = %08b → %v\n",
		Abits&Bbits, bitsToSet(Abits&Bbits))
	fmt.Printf("  A △ B  = %08b → %v\n",
		Abits^Bbits, bitsToSet(Abits^Bbits))

	// === Bài 10: thành phần liên thông ===
	fmt.Println("\n=== Bài 10: cặp bạn → lớp tương đương ===")
	pairs := [][2]int{{1, 2}, {3, 4}, {2, 3}, {5, 6}}
	for _, g := range components(6, pairs) {
		fmt.Printf("  %v\n", g)
	}
}

// bitsToSet chuyển bits thành slice các vị trí bit = 1 (cho dễ đọc).
func bitsToSet(bits uint8) []int {
	var s []int
	for i := 0; i < 8; i++ {
		if bits&(1<<i) != 0 {
			s = append(s, i)
		}
	}
	return s
}
