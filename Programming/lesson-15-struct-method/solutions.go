// Lesson 15 — Struct & Method
// File này demo:
//   - Point/Rectangle với value & pointer receiver
//   - Embedding Manager/Employee + override
//   - Constructor pattern NewUser
//   - Struct comparison (compare-được vs không)
//   - Stack[int] đầy đủ Push/Pop/Peek/Len/IsEmpty
//   - Linked list Append (BT4)
//
// Chạy: go run solutions.go

package main

import (
	"fmt"
	"math"
	"strconv"
	"time"
	"unsafe"
)

// ============================================================
// 1. Point & Rectangle — value vs pointer receiver
// ============================================================

// Point — struct nhỏ, demo cả value & pointer receiver.
type Point struct {
	X, Y int
}

// Distance — KHÔNG mutate → value receiver OK.
func (p Point) Distance() float64 {
	return math.Sqrt(float64(p.X*p.X + p.Y*p.Y))
}

// Move — mutate p → BUỘC dùng pointer receiver.
func (p *Point) Move(dx, dy int) {
	p.X += dx
	p.Y += dy
}

// Rectangle — BT1: dùng pointer cho mọi method để nhất quán
// (vì có Scale mutate).
type Rectangle struct {
	Width, Height float64
}

func (r *Rectangle) Area() float64      { return r.Width * r.Height }
func (r *Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }
func (r *Rectangle) Scale(f float64) {
	r.Width *= f
	r.Height *= f
}

// ============================================================
// 2. Embedding — Employee / Manager
// ============================================================

type Employee struct {
	Name   string
	Salary float64
}

func (e Employee) Greet() string {
	return "Hi, I'm " + e.Name
}

type Manager struct {
	Employee     // embed — không có tên field
	Reports  int
}

// Override Greet() — Manager.Greet shadow Employee.Greet.
func (m Manager) Greet() string {
	return "Hi, I'm Manager " + m.Name + " with " +
		strconv.Itoa(m.Reports) + " reports"
}

// ============================================================
// 3. BT3 — Animal / Dog (embedding + override)
// ============================================================

type Animal struct {
	Name string
}

func (a Animal) Speak() string {
	return a.Name + " makes a sound"
}

type Dog struct {
	Animal
	Breed string
}

func (d Dog) Speak() string {
	return d.Name + " barks: WOOF!"
}

// ============================================================
// 4. Constructor pattern — NewUser
// ============================================================

var nextUserID = 0

type User struct {
	ID        int
	Name      string
	Email     string
	CreatedAt time.Time
}

func NewUser(name, email string) *User {
	nextUserID++
	return &User{
		ID:        nextUserID,
		Name:      name,
		Email:     email,
		CreatedAt: time.Now(),
	}
}

// ============================================================
// 5. Struct comparison demo
// ============================================================

type Pt struct {
	X int
	Y string
}

type WithPtr struct {
	P *int
}

// (Không thể demo struct chứa slice/map vì compile error —
// chỉ comment để tham khảo)
// type WithSlice struct { Tags []string }
// → invalid operation: cannot compare

// ============================================================
// 6. Stack[int] — BT6
// ============================================================

type Stack struct {
	data []int
}

func (s *Stack) Push(v int) {
	s.data = append(s.data, v)
}

func (s *Stack) Pop() (int, bool) {
	if len(s.data) == 0 {
		return 0, false
	}
	last := len(s.data) - 1
	v := s.data[last]
	s.data = s.data[:last]
	return v, true
}

func (s *Stack) Peek() (int, bool) {
	if len(s.data) == 0 {
		return 0, false
	}
	return s.data[len(s.data)-1], true
}

func (s *Stack) Len() int      { return len(s.data) }
func (s *Stack) IsEmpty() bool { return len(s.data) == 0 }

// ============================================================
// 7. Linked List — BT4
// ============================================================

type Node struct {
	Val  int
	Next *Node
}

// Append: hỗ trợ gọi trên nil receiver (case empty list).
func (n *Node) Append(v int) *Node {
	newNode := &Node{Val: v}
	if n == nil {
		return newNode
	}
	cur := n
	for cur.Next != nil {
		cur = cur.Next
	}
	cur.Next = newNode
	return n
}

func (n *Node) String() string {
	s := ""
	for cur := n; cur != nil; cur = cur.Next {
		s += strconv.Itoa(cur.Val)
		if cur.Next != nil {
			s += " -> "
		}
	}
	return s
}

// ============================================================
// 8. Memory layout — A vs B
// ============================================================

type LayoutA struct {
	a bool
	b int64
	c bool
}

type LayoutB struct {
	a bool
	c bool
	b int64
}

// ============================================================
// 9. Anonymous struct demo
// ============================================================

func anonDemo() {
	// Anonymous struct cho test data
	cases := []struct {
		input    string
		expected int
	}{
		{"hello", 5},
		{"world!", 6},
		{"", 0},
	}
	for _, c := range cases {
		got := len(c.input)
		ok := "✓"
		if got != c.expected {
			ok = "✗"
		}
		fmt.Printf("  len(%q)=%d expected=%d %s\n", c.input, got, c.expected, ok)
	}
}

// ============================================================
// MAIN — demo tất cả
// ============================================================

func main() {
	fmt.Println("=== 1. Point & Rectangle ===")
	p := Point{X: 3, Y: 4}
	fmt.Printf("Point %+v, distance=%.1f\n", p, p.Distance())
	p.Move(10, 20)
	fmt.Printf("Sau Move(10,20): %+v\n", p) // {13 24}

	r := &Rectangle{Width: 3, Height: 4}
	fmt.Printf("Rect %+v area=%.0f perim=%.0f\n", *r, r.Area(), r.Perimeter())
	r.Scale(2)
	fmt.Printf("Sau Scale(2): %+v area=%.0f\n", *r, r.Area()) // 6,8, 48

	fmt.Println("\n=== 2. Embedding & override (Employee/Manager) ===")
	e := Employee{Name: "Bob", Salary: 30000}
	fmt.Println(e.Greet())
	m := Manager{
		Employee: Employee{Name: "Alice", Salary: 50000},
		Reports:  5,
	}
	fmt.Println(m.Greet())          // Manager override
	fmt.Println(m.Employee.Greet()) // Method gốc qua tên embedded
	fmt.Println("m.Name (promoted) =", m.Name)
	fmt.Println("m.Salary (promoted) =", m.Salary)

	fmt.Println("\n=== 3. Animal/Dog (BT3) ===")
	d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Lab"}
	fmt.Println(d.Speak())        // Rex barks: WOOF!
	fmt.Println(d.Animal.Speak()) // Rex makes a sound
	fmt.Println("d.Name =", d.Name, "| d.Breed =", d.Breed)

	fmt.Println("\n=== 4. Constructor NewUser ===")
	u1 := NewUser("Alice", "a@x.com")
	u2 := NewUser("Bob", "b@x.com")
	fmt.Printf("%+v\n", *u1)
	fmt.Printf("%+v\n", *u2)

	fmt.Println("\n=== 5. Struct comparison ===")
	a1 := Pt{1, "x"}
	a2 := Pt{1, "x"}
	a3 := Pt{2, "y"}
	fmt.Println("a1 == a2:", a1 == a2) // true
	fmt.Println("a1 == a3:", a1 == a3) // false

	x := 5
	wp1 := WithPtr{P: &x}
	wp2 := WithPtr{P: &x}
	fmt.Println("wp1 == wp2 (cùng địa chỉ):", wp1 == wp2) // true
	y := 5
	wp3 := WithPtr{P: &y}
	fmt.Println("wp1 == wp3 (khác địa chỉ, cùng value):", wp1 == wp3) // false

	fmt.Println("\n=== 6. Stack[int] (BT6) ===")
	s := &Stack{}
	s.Push(1)
	s.Push(2)
	s.Push(3)
	fmt.Println("Sau push 1,2,3 | len =", s.Len())
	v, _ := s.Pop()
	fmt.Println("Pop:", v) // 3
	pv, _ := s.Peek()
	fmt.Println("Peek:", pv) // 2
	fmt.Println("Len:", s.Len(), "IsEmpty:", s.IsEmpty())
	// Pop từ stack rỗng — không panic
	emptyStack := &Stack{}
	v, ok := emptyStack.Pop()
	fmt.Printf("Pop trên stack rỗng: v=%d ok=%v\n", v, ok) // 0 false

	fmt.Println("\n=== 7. Linked List (BT4) ===")
	var head *Node // nil
	head = head.Append(1)
	head = head.Append(2)
	head = head.Append(3)
	fmt.Println("Linked list:", head.String()) // 1 -> 2 -> 3

	fmt.Println("\n=== 8. Memory layout ===")
	fmt.Printf("sizeof(LayoutA{bool,int64,bool}) = %d byte\n",
		unsafe.Sizeof(LayoutA{}))
	fmt.Printf("sizeof(LayoutB{bool,bool,int64}) = %d byte\n",
		unsafe.Sizeof(LayoutB{}))
	fmt.Println("→ Sắp xếp lớn→nhỏ (hoặc gom field nhỏ liền nhau) tiết kiệm padding.")

	fmt.Println("\n=== 9. Anonymous struct test cases ===")
	anonDemo()

	fmt.Println("\n=== 10. Method gọi trên addressable value ===")
	// OK — biến p addressable
	pp := Point{X: 1, Y: 2}
	pp.Move(5, 5)
	fmt.Println("pp sau Move:", pp) // {6 7}

	// Pointer literal cũng OK
	(&Point{X: 0, Y: 0}).Move(3, 3) // không có biến giữ, demo cú pháp
	// Point{0,0}.Move(3,3)  // ← Compile error: cannot call pointer method on Point literal
	// m := map[string]Point{"a": {0,0}}; m["a"].Move(1,1)  // ← Compile error
}
