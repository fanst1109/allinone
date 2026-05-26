// Lesson 16 — Pointer trong Go
// Chạy: go run solutions.go
//
// File này gom các ví dụ và lời giải bài tập của Lesson 16 thành một
// chương trình demo. Mỗi bài tập là một hàm `exNN()` riêng, hàm main()
// gọi tuần tự, in tiêu đề trước mỗi phần.
package main

import (
	"encoding/json"
	"fmt"
)

// ============================================================================
// PHẦN 1 — & và * cơ bản
// ============================================================================

func demoBasics() {
	fmt.Println("--- Demo: & và * cơ bản ---")

	x := 42
	p := &x // p là *int trỏ tới x

	fmt.Printf("x      = %d\n", x)
	fmt.Printf("&x     = %p (địa chỉ của x)\n", &x)
	fmt.Printf("p      = %p (p chứa địa chỉ đó)\n", p)
	fmt.Printf("*p     = %d (dereference p)\n", *p)

	*p = 99 // ghi vào ô memory p trỏ tới → x đổi
	fmt.Printf("Sau *p = 99: x = %d\n", x)
}

// ============================================================================
// PHẦN 2 — Pass-by-value vs Pass-by-pointer (Bài tập 1)
// ============================================================================

func incVal(x int)  { x += 1 }
func incPtr(p *int) { *p += 1 }

func mutateSlice(s []int) { s[0] = 100 } // share underlying → caller thấy

func demoPassByValueVsPointer() {
	fmt.Println("\n--- Demo: pass-by-value vs pointer ---")

	n := 10
	incVal(n)
	fmt.Printf("incVal(n): n = %d (không đổi)\n", n)

	incPtr(&n)
	fmt.Printf("incPtr(&n): n = %d (đổi)\n", n)

	xs := []int{1, 2, 3}
	mutateSlice(xs)
	fmt.Printf("mutateSlice(xs): xs = %v (share underlying array)\n", xs)
}

// ============================================================================
// PHẦN 3 — Swap (Bài tập 2)
// ============================================================================

// Swap đổi giá trị 2 biến int qua pointer.
func Swap(a, b *int) {
	*a, *b = *b, *a
}

func demoSwap() {
	fmt.Println("\n--- Bài tập 2: Swap ---")
	x, y := 1, 2
	fmt.Printf("Trước: x=%d, y=%d\n", x, y)
	Swap(&x, &y)
	fmt.Printf("Sau:   x=%d, y=%d\n", x, y)
}

// ============================================================================
// PHẦN 4 — json.Unmarshal cần & (Bài tập 3)
// ============================================================================

type Config struct {
	Port int
	Host string
}

func demoUnmarshalBug() {
	fmt.Println("\n--- Bài tập 3: json.Unmarshal cần & ---")

	data := []byte(`{"Port": 8080, "Host": "localhost"}`)

	// Cách SAI — thiếu &
	var cfg1 Config
	err := json.Unmarshal(data, cfg1) // Unmarshal sẽ báo lỗi vì non-pointer
	fmt.Printf("Không &: err=%v, cfg1=%+v\n", err, cfg1)

	// Cách ĐÚNG — có &
	var cfg2 Config
	if err := json.Unmarshal(data, &cfg2); err != nil {
		fmt.Println("Lỗi:", err)
		return
	}
	fmt.Printf("Có  &: cfg2=%+v\n", cfg2)
}

// ============================================================================
// PHẦN 5 — Linked list reverse (Bài tập 4)
// ============================================================================

// Node đơn giản cho linked list.
type Node struct {
	Val  int
	Next *Node
}

// Reverse đảo ngược linked list, return head mới.
func Reverse(head *Node) *Node {
	var prev *Node // ban đầu prev = nil
	curr := head
	for curr != nil {
		next := curr.Next // lưu tiếp theo trước khi ghi đè
		curr.Next = prev  // lật pointer
		prev = curr       // tiến prev
		curr = next       // tiến curr
	}
	return prev
}

// printList in linked list dạng "1 -> 2 -> 3 -> nil".
func printList(head *Node) {
	for n := head; n != nil; n = n.Next {
		fmt.Printf("%d -> ", n.Val)
	}
	fmt.Println("nil")
}

// buildList tạo list từ slice giá trị.
func buildList(vals []int) *Node {
	var head *Node
	// Build từ cuối về đầu để giữ thứ tự
	for i := len(vals) - 1; i >= 0; i-- {
		head = &Node{Val: vals[i], Next: head}
	}
	return head
}

func demoLinkedListReverse() {
	fmt.Println("\n--- Bài tập 4: Linked list reverse ---")
	head := buildList([]int{1, 2, 3, 4})
	fmt.Print("Trước:  ")
	printList(head)

	reversed := Reverse(head)
	fmt.Print("Sau:    ")
	printList(reversed)
}

// ============================================================================
// PHẦN 6 — Optional int qua *int (Bài tập 5)
// ============================================================================

// Default trả về *p nếu p không nil, ngược lại trả về def.
func Default(p *int, def int) int {
	if p == nil {
		return def
	}
	return *p
}

func demoOptionalInt() {
	fmt.Println("\n--- Bài tập 5: Optional int qua *int ---")

	var unset *int
	zero := 0
	five := 5

	fmt.Printf("Default(unset, 99)  = %d  (nil → default)\n", Default(unset, 99))
	fmt.Printf("Default(&zero, 99)  = %d  (set rõ ràng = 0)\n", Default(&zero, 99))
	fmt.Printf("Default(&five, 99)  = %d  (set = 5)\n", Default(&five, 99))
}

// ============================================================================
// PHẦN 7 — Method receiver: value vs pointer
// ============================================================================

type Counter struct {
	n int
}

// Inc dùng pointer receiver → mutate state.
func (c *Counter) Inc() {
	c.n++
}

// Get dùng value receiver → read-only.
func (c Counter) Get() int {
	return c.n
}

func demoReceivers() {
	fmt.Println("\n--- Demo: pointer receiver vs value receiver ---")
	c := Counter{}
	c.Inc() // Go tự lấy &c
	c.Inc()
	c.Inc()
	fmt.Printf("Sau 3 Inc(): c.Get() = %d\n", c.Get())
}

// ============================================================================
// PHẦN 8 — Nil pointer check (an toàn)
// ============================================================================

type User struct {
	Name string
}

func findUser(id int) *User {
	if id == 0 {
		return nil
	}
	return &User{Name: "Alice"}
}

func demoNilCheck() {
	fmt.Println("\n--- Demo: nil pointer check ---")

	u1 := findUser(0)
	if u1 != nil {
		fmt.Println("u1:", u1.Name)
	} else {
		fmt.Println("u1: nil → không dereference (tránh panic)")
	}

	u2 := findUser(1)
	if u2 != nil {
		fmt.Println("u2:", u2.Name)
	}
}

// ============================================================================
// PHẦN 9 — Escape analysis demo (Bài tập 6)
// ============================================================================
// Chạy: go build -gcflags="-m" solutions.go
// Sẽ thấy compiler log biến nào escape ra heap.

// escapeA: x không escape, ở stack.
func escapeA() int {
	x := 5
	return x
}

// escapeB: x ESCAPE — trả về &x, x phải sống sau hàm → heap.
func escapeB() *int {
	x := 5
	return &x
}

// escapeC: x escape qua fmt.Println (interface{}).
func escapeC() {
	x := 5
	fmt.Println(&x)
}

// escapeD: User return by value — không escape (ở stack hoặc inline).
func escapeD() User {
	return User{Name: "Alice"}
}

func demoEscapeAnalysis() {
	fmt.Println("\n--- Bài tập 6: Escape analysis (chạy với -gcflags=\"-m\" để thấy log) ---")
	_ = escapeA()
	_ = escapeB()
	escapeC() // chỉ in một địa chỉ
	_ = escapeD()
	fmt.Println("(Xem output build để biết biến nào escape ra heap.)")
}

// ============================================================================
// MAIN
// ============================================================================

func main() {
	demoBasics()
	demoPassByValueVsPointer()
	demoSwap()
	demoUnmarshalBug()
	demoLinkedListReverse()
	demoOptionalInt()
	demoReceivers()
	demoNilCheck()
	demoEscapeAnalysis()
}
