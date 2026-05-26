// Lesson 07 — Biến & Kiểu dữ liệu trong Go
//
// Chạy: go run solutions.go
//
// File này demo các nội dung lý thuyết của lesson:
//   - 3 cách khai báo biến
//   - Zero value
//   - Overflow (uint8, int8, int32)
//   - Conversion (int <-> float, string trap)
//   - const (typed/untyped)
//   - iota: enum WeekDay, permission flag, KB/MB/GB
//   - Type definition vs alias
//   - fmt.Printf verbs

package main

import (
	"fmt"
	"strconv"
	"unsafe"
)

// ============================================================
// 1. Demo 3 cách khai báo biến
// ============================================================

// Package-level: BẮT BUỘC dùng var (không dùng được :=)
var defaultPort = 8080
var defaultHost string = "localhost"

func demoDeclarations() {
	fmt.Println("\n=== 1. Ba cách khai báo biến ===")

	// (a) var TÊN KIỂU — chỉ khai báo, dùng zero value
	var name string
	fmt.Printf("(a) var name string         -> %q (rỗng)\n", name)
	name = "Alice"
	fmt.Printf("    sau khi gán              -> %q\n", name)

	// (b) var TÊN KIỂU = GIÁ TRỊ — đầy đủ, hiếm dùng
	var age int = 30
	fmt.Printf("(b) var age int = 30        -> %d\n", age)

	// (c) var TÊN = GIÁ TRỊ — suy luận kiểu
	var pi = 3.14
	fmt.Printf("(c) var pi = 3.14           -> %v (kiểu %T)\n", pi, pi)

	// (d) TÊN := GIÁ TRỊ — short declaration, chỉ trong hàm
	city := "Hanoi"
	fmt.Printf("(d) city := \"Hanoi\"         -> %q\n", city)

	// Khai báo nhóm
	var (
		host = "127.0.0.1"
		port = 9090
	)
	fmt.Printf("    var (host, port) nhóm    -> %s:%d\n", host, port)

	// Multi-assign
	a, b, c := 1, 2, 3
	fmt.Printf("    a, b, c := 1, 2, 3       -> %d %d %d\n", a, b, c)

	// Swap
	a, b = b, a
	fmt.Printf("    swap a, b                -> a=%d b=%d\n", a, b)

	_ = c // tránh compile error "declared and not used"
}

// ============================================================
// 2. Zero value
// ============================================================

type Point struct{ X, Y int }

func demoZeroValue() {
	fmt.Println("\n=== 2. Zero value ===")

	var i int
	var f float64
	var s string
	var b bool
	var p *int
	var sl []int
	var m map[string]int
	var pt Point

	fmt.Printf("int:           %d\n", i)
	fmt.Printf("float64:       %f\n", f)
	fmt.Printf("string:        %q (len=%d)\n", s, len(s))
	fmt.Printf("bool:          %t\n", b)
	fmt.Printf("*int:          %v\n", p)
	fmt.Printf("[]int:         %v  (nil=%t)\n", sl, sl == nil)
	fmt.Printf("map:           %v  (nil=%t)\n", m, m == nil)
	fmt.Printf("Point struct:  %+v\n", pt)

	// Đọc từ nil map an toàn, ghi thì panic
	v := m["unknown_key"]
	fmt.Printf("Đọc nil map:   %d (zero value, không panic)\n", v)
	// m["key"] = 1  // SẼ PANIC
}

// ============================================================
// 3. Kiểu integer + sizeof
// ============================================================

func demoIntegerSizes() {
	fmt.Println("\n=== 3. Kích thước kiểu integer ===")
	fmt.Printf("int8:    %d byte\n", unsafe.Sizeof(int8(0)))
	fmt.Printf("int16:   %d byte\n", unsafe.Sizeof(int16(0)))
	fmt.Printf("int32:   %d byte\n", unsafe.Sizeof(int32(0)))
	fmt.Printf("int64:   %d byte\n", unsafe.Sizeof(int64(0)))
	fmt.Printf("int:     %d byte (platform-dependent)\n", unsafe.Sizeof(int(0)))
	fmt.Printf("uintptr: %d byte\n", unsafe.Sizeof(uintptr(0)))
}

// ============================================================
// 4. Overflow demo
// ============================================================

func demoOverflow() {
	fmt.Println("\n=== 4. Overflow (wrap around) ===")

	// uint8: 0..255
	var u8 uint8 = 255
	fmt.Printf("uint8 255 + 1 = ")
	u8++
	fmt.Println(u8) // 0

	var u8b uint8 = 0
	fmt.Printf("uint8 0 - 1   = ")
	u8b--
	fmt.Println(u8b) // 255

	// int8: -128..127
	var i8 int8 = 127
	fmt.Printf("int8  127 + 1 = ")
	i8++
	fmt.Println(i8) // -128

	// int32 Y2038
	var t int32 = 2147483647
	fmt.Printf("int32 2147483647 + 1 (Y2038) = ")
	t++
	fmt.Println(t) // -2147483648

	// uint8 trộn lớn
	var a uint8 = 200
	var b uint8 = 100
	fmt.Printf("uint8 200 + 100 = %d (mod 256)\n", a+b) // 44
}

// ============================================================
// 5. Conversion
// ============================================================

func demoConversion() {
	fmt.Println("\n=== 5. Type conversion ===")

	// int -> float
	n := 10
	f := float64(n) / 3
	fmt.Printf("int(10) / 3 cần ép sang float64 -> %.4f\n", f)

	// float -> int (truncate)
	g := 3.9
	fmt.Printf("int(3.9) = %d (truncate, không round)\n", int(g))

	// int -> int khác size (CẢNH BÁO overflow im lặng)
	var big int64 = 300
	var small int8 = int8(big)
	fmt.Printf("int8(int64(300)) = %d (overflow!)\n", small) // 44

	// TRAP: string(int) coi int là code point
	fmt.Printf("string(65)        = %q  (KHÔNG phải \"65\"!)\n", string(rune(65)))
	fmt.Printf("strconv.Itoa(65)  = %q  (đúng cách)\n", strconv.Itoa(65))

	// string -> int
	s := "123"
	num, err := strconv.Atoi(s)
	fmt.Printf("strconv.Atoi(%q)  = %d, err=%v\n", s, num, err)

	// byte -> string
	var by byte = 'A'
	fmt.Printf("string(byte('A')) = %q\n", string(by))
}

// ============================================================
// 6. Const + iota patterns
// ============================================================

// Pattern 1: enum đơn giản
type WeekDay int

const (
	Monday WeekDay = iota
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
	Sunday
)

func (d WeekDay) String() string {
	names := [...]string{
		"Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday", "Sunday",
	}
	if int(d) < 0 || int(d) >= len(names) {
		return "Unknown"
	}
	return names[d]
}

// Pattern 2: bit flag với 1 << iota
type Permission uint8

const (
	PermRead    Permission = 1 << iota // 1
	PermWrite                          // 2
	PermExecute                        // 4
)

func HasPermission(have, want Permission) bool {
	return have&want == want
}

// Pattern 3: skip với _, đơn vị tăng đều
const (
	_  = iota             // bỏ 0
	KB = 1 << (10 * iota) // 1 << 10 = 1024
	MB                    // 1 << 20
	GB                    // 1 << 30
	TB                    // 1 << 40
)

// Pattern 4: HTTP status — không phải iota, giá trị literal
const (
	StatusOK            = 200
	StatusBadRequest    = 400
	StatusNotFound      = 404
	StatusInternalError = 500
)

func demoConstIota() {
	fmt.Println("\n=== 6. Const & iota ===")

	d := Wednesday
	fmt.Printf("WeekDay Wednesday = %d, String() = %s\n", d, d)

	user := PermRead | PermWrite
	fmt.Printf("user = Read|Write = %d (binary %03b)\n", user, user)
	fmt.Printf("  HasPermission(user, Read)        = %t\n", HasPermission(user, PermRead))
	fmt.Printf("  HasPermission(user, Write)       = %t\n", HasPermission(user, PermWrite))
	fmt.Printf("  HasPermission(user, Execute)     = %t\n", HasPermission(user, PermExecute))
	fmt.Printf("  HasPermission(user, Read|Write)  = %t\n", HasPermission(user, PermRead|PermWrite))

	fmt.Printf("KB=%d, MB=%d, GB=%d, TB=%d\n", KB, MB, GB, TB)
	fmt.Printf("HTTP StatusOK=%d, StatusNotFound=%d\n", StatusOK, StatusNotFound)
}

// ============================================================
// 7. Type definition vs alias
// ============================================================

type Celsius float64
type Fahrenheit float64
type MyInt = int // ALIAS

func (c Celsius) ToFahrenheit() Fahrenheit {
	return Fahrenheit(c*9/5 + 32)
}

func demoTypeDefVsAlias() {
	fmt.Println("\n=== 7. Type definition vs alias ===")

	var c Celsius = 100
	f := c.ToFahrenheit()
	fmt.Printf("Celsius(%v).ToFahrenheit() = %v\n", c, f)

	// var c2 Celsius = f  // ERROR: cannot use f (Fahrenheit) as Celsius
	c2 := Celsius(f) // OK với conversion
	_ = c2

	// Alias: MyInt và int CÙNG kiểu
	var a MyInt = 5
	var b int = a // OK
	fmt.Printf("MyInt và int là cùng kiểu (alias): a=%d, b=%d\n", a, b)
}

// ============================================================
// 8. fmt.Printf verbs
// ============================================================

type User struct {
	Name string
	Age  int
}

func demoPrintfVerbs() {
	fmt.Println("\n=== 8. fmt.Printf verbs ===")

	n := 42
	fmt.Printf("%%d   -> %d\n", n)
	fmt.Printf("%%b   -> %b\n", n) // binary
	fmt.Printf("%%o   -> %o\n", n) // octal
	fmt.Printf("%%x   -> %x\n", n) // hex
	fmt.Printf("%%X   -> %X\n", n)
	fmt.Printf("%%c   -> %c (n = code point của 'A' nếu n=65)\n", 65)

	pi := 3.14159
	fmt.Printf("%%f    -> %f\n", pi)
	fmt.Printf("%%.2f  -> %.2f\n", pi)
	fmt.Printf("%%e    -> %e\n", pi*1000)

	s := "hello\tworld\n"
	fmt.Printf("%%s    -> %s", s) // in xuống dòng thật
	fmt.Printf("%%q    -> %q\n", s)

	u := User{"Alice", 30}
	fmt.Printf("%%v    -> %v\n", u)
	fmt.Printf("%%+v   -> %+v\n", u)
	fmt.Printf("%%#v   -> %#v\n", u)
	fmt.Printf("%%T    -> %T\n", u)

	fmt.Printf("%%t    -> %t\n", true)
	fmt.Printf("%%p    -> %p\n", &u)
}

// ============================================================
// MAIN
// ============================================================

func main() {
	fmt.Println("Lesson 07 — Biến & Kiểu dữ liệu trong Go")
	fmt.Printf("(defaultPort=%d, defaultHost=%s)\n", defaultPort, defaultHost)

	demoDeclarations()
	demoZeroValue()
	demoIntegerSizes()
	demoOverflow()
	demoConversion()
	demoConstIota()
	demoTypeDefVsAlias()
	demoPrintfVerbs()

	fmt.Println("\n=== Hết ===")
}
