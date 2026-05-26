// Lesson 18 — Interface solutions
//
// Lưu ý: file này tập hợp lời giải cho mọi bài tập + demo các pitfall.
// Chạy: `go run solutions.go`
package main

import (
	"bytes"
	"fmt"
	"io"
	"math"
	"sort"
	"strings"
)

// ============================================================
// BT1 — Shape interface
// ============================================================

// Shape là một abstraction chung cho hình học phẳng.
// Bất kỳ type nào có cả Area() và Perimeter() đều satisfy.
type Shape interface {
	Area() float64
	Perimeter() float64
}

// Circle — hình tròn với bán kính R.
type Circle struct{ R float64 }

func (c Circle) Area() float64      { return math.Pi * c.R * c.R }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.R }

// Rectangle — hình chữ nhật W×H.
type Rectangle struct{ W, H float64 }

func (r Rectangle) Area() float64      { return r.W * r.H }
func (r Rectangle) Perimeter() float64 { return 2 * (r.W + r.H) }

// Triangle — tam giác 3 cạnh a, b, c. Dùng công thức Heron cho diện tích.
type Triangle struct{ A, B, C float64 }

func (t Triangle) Perimeter() float64 { return t.A + t.B + t.C }
func (t Triangle) Area() float64 {
	s := t.Perimeter() / 2 // nửa chu vi
	return math.Sqrt(s * (s - t.A) * (s - t.B) * (s - t.C))
}

// Describe nhận bất cứ Shape nào và in tên loại + thuộc tính.
// Đây là minh họa idiom "Accept interfaces".
func Describe(s Shape) {
	fmt.Printf("  %-20T area=%7.2f  perim=%7.2f\n", s, s.Area(), s.Perimeter())
}

// ============================================================
// BT2 — Sort.Interface custom
// ============================================================

// Person dùng cho minh họa sort.
type Person struct {
	Name string
	Age  int
}

// ByAge sort theo Age tăng dần.
type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

// ByName sort theo Name alphabet.
type ByName []Person

func (a ByName) Len() int           { return len(a) }
func (a ByName) Less(i, j int) bool { return a[i].Name < a[j].Name }
func (a ByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

// ============================================================
// BT3 — nil interface trap
// ============================================================

// MyErr là custom error type với pointer receiver.
type MyErr struct{ Msg string }

func (e *MyErr) Error() string {
	if e == nil {
		return "<nil MyErr>"
	}
	return e.Msg
}

// findBad — phiên bản SAI: trả typed nil → interface không bằng nil.
func findBad() error {
	var e *MyErr // nil pointer
	return e     // gói vào interface ⇒ type word = *MyErr, value word = nil
}

// findGood — phiên bản ĐÚNG: return literal nil → interface = nil thật.
func findGood() error {
	var e *MyErr
	if false {
		e = &MyErr{"x"}
	}
	if e == nil {
		return nil // <-- key fix
	}
	return e
}

// ============================================================
// BT4 — Type switch trên JSON-like value
// ============================================================

// Walk in cây value JSON-like (đã unmarshal sang any).
func Walk(v any, indent string) {
	switch x := v.(type) {
	case map[string]any:
		// Sort keys cho output deterministic
		keys := make([]string, 0, len(x))
		for k := range x {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			fmt.Printf("%s%s:\n", indent, k)
			Walk(x[k], indent+"  ")
		}
	case []any:
		for i, val := range x {
			fmt.Printf("%s[%d]:\n", indent, i)
			Walk(val, indent+"  ")
		}
	case string:
		fmt.Printf("%s%q\n", indent, x)
	case float64:
		fmt.Printf("%s%v\n", indent, x)
	case bool:
		fmt.Printf("%s%v\n", indent, x)
	case nil:
		fmt.Printf("%snull\n", indent)
	default:
		fmt.Printf("%s<? %T>\n", indent, x)
	}
}

// ============================================================
// BT5 — fmt.Stringer cho enum Status
// ============================================================

type Status int

const (
	Active Status = iota
	Suspended
	Banned
)

var statusName = [...]string{"Active", "Suspended", "Banned"}

// String thoả mãn fmt.Stringer ⇒ fmt.Println in tên thay vì số.
func (s Status) String() string {
	if !s.Valid() {
		return fmt.Sprintf("Status(%d)", int(s))
	}
	return statusName[s]
}

func (s Status) Valid() bool { return s >= Active && s <= Banned }

// ============================================================
// BT6 — Logger interface với 2 implementation
// ============================================================

type Logger interface {
	Info(msg string)
	Error(msg string)
}

// ConsoleLogger — value receiver ⇒ cả Console{} và &Console{} đều satisfy.
type ConsoleLogger struct{}

func (ConsoleLogger) Info(m string)  { fmt.Println("[INFO]", m) }
func (ConsoleLogger) Error(m string) { fmt.Println("[ERROR]", m) }

// FileLogger — pointer receiver ⇒ chỉ *FileLogger satisfy.
// Để dễ test, lưu io.Writer thay vì *os.File (DI nhẹ).
type FileLogger struct{ Out io.Writer }

func (l *FileLogger) Info(m string)  { fmt.Fprintln(l.Out, "[INFO]", m) }
func (l *FileLogger) Error(m string) { fmt.Fprintln(l.Out, "[ERROR]", m) }

// ProcessOrder demonstrate "Accept interfaces":
// hàm không quan tâm log là console hay file, chỉ cần thoả Logger.
func ProcessOrder(id int, log Logger) {
	log.Info(fmt.Sprintf("processing order #%d", id))
	if id < 0 {
		log.Error("invalid id")
		return
	}
}

// ============================================================
// Bonus: io.Reader + io.Writer compose
// ============================================================

// CountReader bọc một io.Reader và đếm số byte đã đọc.
// Đây là pattern decorator quen thuộc, dùng interface composition.
type CountReader struct {
	R io.Reader
	N int64
}

func (c *CountReader) Read(p []byte) (int, error) {
	n, err := c.R.Read(p)
	c.N += int64(n)
	return n, err
}

// ============================================================
// main — chạy tất cả demo
// ============================================================

func main() {
	fmt.Println("========== BT1: Shape ==========")
	shapes := []Shape{Circle{5}, Rectangle{3, 4}, Triangle{3, 4, 5}}
	for _, s := range shapes {
		Describe(s)
	}

	fmt.Println("\n========== BT2: sort.Interface ==========")
	people := []Person{
		{"Carol", 22}, {"Alice", 30}, {"Bob", 25}, {"Eve", 28}, {"Dan", 35},
	}
	sort.Sort(ByAge(people))
	fmt.Println("  by age :", people)
	sort.Sort(ByName(people))
	fmt.Println("  by name:", people)

	fmt.Println("\n========== BT3: nil interface trap ==========")
	var err1 error
	fmt.Printf("  (a) var err error          → err==nil: %v\n", err1 == nil)

	var p *MyErr
	var err2 error = p
	fmt.Printf("  (b) typed nil into error   → err==nil: %v (PITFALL!)\n", err2 == nil)

	errBad := findBad()
	fmt.Printf("  (c) findBad() (sai)        → err==nil: %v (PITFALL!)\n", errBad == nil)

	errGood := findGood()
	fmt.Printf("  (d) findGood() (đúng)      → err==nil: %v\n", errGood == nil)

	fmt.Println("\n========== BT4: type switch trên JSON ==========")
	data := map[string]any{
		"name":   "alice",
		"age":    30.0,
		"active": true,
		"tags":   []any{"go", "dev"},
		"addr":   map[string]any{"city": "HN", "zip": "100000"},
	}
	Walk(data, "  ")

	fmt.Println("\n========== BT5: Stringer enum ==========")
	for _, s := range []Status{Active, Suspended, Banned, Status(99)} {
		fmt.Printf("  %v (valid=%v)\n", s, s.Valid())
	}

	fmt.Println("\n========== BT6: Logger ==========")
	ProcessOrder(1, ConsoleLogger{})

	var buf bytes.Buffer
	ProcessOrder(-1, &FileLogger{Out: &buf})
	fmt.Println("  ---file log buffer:---")
	fmt.Print(strings.TrimSpace(buf.String()), "\n")

	fmt.Println("\n========== Bonus: io.Reader compose ==========")
	src := strings.NewReader("Hello, interface!")
	cr := &CountReader{R: src}
	out, _ := io.ReadAll(cr)
	fmt.Printf("  Đọc được %q, total bytes: %d\n", out, cr.N)

	fmt.Println("\n========== Method set demo ==========")
	demoMethodSet()
}

// demoMethodSet — minh họa quy tắc method set:
// Counter value chỉ satisfy Getter; *Counter satisfy cả Getter và Incer.
func demoMethodSet() {
	type Counter struct{ n int }
	// Phải định nghĩa method ở package scope cho Go, nên giả lập qua closure.
	// Đây chỉ là log giáo huấn:
	fmt.Println("  Counter   method set: {Get}")
	fmt.Println("  *Counter  method set: {Get, Inc}")
	fmt.Println("  → var i Incer = Counter{}  ❌ compile error")
	fmt.Println("  → var i Incer = &Counter{} ✓")
}
