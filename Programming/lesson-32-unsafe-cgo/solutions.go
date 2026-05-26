// Lesson 32 — unsafe & CGo: solutions
//
// File này demo:
//   1. unsafe.Sizeof / Alignof / Offsetof — đo memory layout.
//   2. Struct padding minh hoạ (Bad vs Good ordering).
//   3. Zero-copy string ↔ []byte với cảnh báo immutability.
//   4. Pointer conversion *T1 → unsafe.Pointer → *T2.
//   5. Reorder struct cho compact.
//
// CGo example ĐƯỢC ĐỂ TRONG COMMENT vì:
//   - Build CGo cần C compiler trên máy build.
//   - File solutions.go nên chạy được với `go run` mặc định.
//   - Phần CGo có hướng dẫn build riêng bên dưới.
//
// Chạy: go run solutions.go
//
// Build với CGo (file cgo riêng): tách phần CGo ra cgo_demo.go với
//   //go:build cgo
// rồi `CGO_ENABLED=1 go run cgo_demo.go solutions.go`.

package main

import (
	"fmt"
	"hash/fnv"
	"strings"
	"unsafe"
)

// ============================================================================
// 1. Struct layout demo — Sizeof, Alignof, Offsetof
// ============================================================================

// StructA — đặt field "bad order" (xen kẽ bool và int64) → nhiều padding.
type StructA struct {
	x bool  // offset 0
	y int64 // offset 8 (sau 7B pad)
	z bool  // offset 16
	// tail pad 7B → Sizeof = 24
}

// StructB — sắp xếp lại field A → bớt padding.
type StructB struct {
	y int64 // offset 0
	x bool  // offset 8
	z bool  // offset 9
	// tail pad 6B → Sizeof = 16
}

// StructC — string header + int + bool.
type StructC struct {
	name string // offset 0, size 16 (data ptr + len)
	age  int32  // offset 16
	sex  bool   // offset 20
	// tail pad 3 → Sizeof = 24
}

// Bad / Good — bài 7.
type Bad struct {
	flag1  bool
	id     int64
	flag2  bool
	count  int32
	flag3  bool
	weight float64
	code   int16
}

type Good struct {
	id     int64
	weight float64
	count  int32
	code   int16
	flag1  bool
	flag2  bool
	flag3  bool
}

func demoLayout() {
	fmt.Println("=== 1. Struct layout (Sizeof / Alignof / Offsetof) ===")

	var a StructA
	fmt.Printf("StructA: Sizeof=%d  Alignof=%d  offset{x=%d, y=%d, z=%d}\n",
		unsafe.Sizeof(a), unsafe.Alignof(a),
		unsafe.Offsetof(a.x), unsafe.Offsetof(a.y), unsafe.Offsetof(a.z))

	var b StructB
	fmt.Printf("StructB: Sizeof=%d  Alignof=%d  offset{y=%d, x=%d, z=%d}\n",
		unsafe.Sizeof(b), unsafe.Alignof(b),
		unsafe.Offsetof(b.y), unsafe.Offsetof(b.x), unsafe.Offsetof(b.z))

	var c StructC
	fmt.Printf("StructC: Sizeof=%d  offset{name=%d, age=%d, sex=%d}\n",
		unsafe.Sizeof(c), unsafe.Offsetof(c.name), unsafe.Offsetof(c.age), unsafe.Offsetof(c.sex))

	fmt.Printf("Sizeof(int8)=%d   Sizeof(int32)=%d   Sizeof(int64)=%d\n",
		unsafe.Sizeof(int8(0)), unsafe.Sizeof(int32(0)), unsafe.Sizeof(int64(0)))
	fmt.Printf("Sizeof(string)=%d (16: ptr+len)\n", unsafe.Sizeof(""))
	fmt.Printf("Sizeof([]int)=%d (24: ptr+len+cap)\n", unsafe.Sizeof([]int{}))

	var bad Bad
	var good Good
	fmt.Printf("Bad:  Sizeof=%d\n", unsafe.Sizeof(bad))
	fmt.Printf("Good: Sizeof=%d  (tiết kiệm %d byte = %.0f%%)\n",
		unsafe.Sizeof(good),
		unsafe.Sizeof(bad)-unsafe.Sizeof(good),
		100*float64(unsafe.Sizeof(bad)-unsafe.Sizeof(good))/float64(unsafe.Sizeof(bad)))
	fmt.Println()
}

// ============================================================================
// 2. Visualize struct memory: in offset từng field thành "memory map".
// ============================================================================

func demoMemoryMap() {
	fmt.Println("=== 2. Memory map của StructA (24 byte) ===")
	fmt.Println("offset | content")
	fmt.Println("-------+-----------------")
	var a StructA
	offX := unsafe.Offsetof(a.x)
	offY := unsafe.Offsetof(a.y)
	offZ := unsafe.Offsetof(a.z)
	total := unsafe.Sizeof(a)
	for i := uintptr(0); i < total; i++ {
		label := "  pad"
		switch {
		case i == offX:
			label = "  x (bool)"
		case i == offY:
			label = "  y (int64) ─┐"
		case i > offY && i < offY+unsafe.Sizeof(int64(0)):
			label = "    │ (y cont)"
		case i == offZ:
			label = "  z (bool)"
		}
		fmt.Printf("  %2d   |%s\n", i, label)
	}
	fmt.Println()
}

// ============================================================================
// 3. Zero-copy string ↔ []byte (Go 1.20+).
// ============================================================================

// StringToBytes — zero-copy.
// CẢNH BÁO: slice trả về PHẢI được dùng read-only.
// Modify byte sẽ vi phạm string immutability → undefined behavior.
func StringToBytes(s string) []byte {
	if len(s) == 0 {
		return nil
	}
	return unsafe.Slice(unsafe.StringData(s), len(s))
}

// BytesToString — zero-copy.
// CẢNH BÁO: nếu slice gốc bị modify sau khi gọi, string trả về cũng thay đổi
// → vi phạm contract immutability.
func BytesToString(b []byte) string {
	if len(b) == 0 {
		return ""
	}
	return unsafe.String(unsafe.SliceData(b), len(b))
}

func demoZeroCopy() {
	fmt.Println("=== 3. Zero-copy string ↔ []byte ===")

	// (a) Dùng ĐÚNG: read-only — hash username
	username := "alice@example.com"
	h := fnv.New64a()
	h.Write(StringToBytes(username)) // không alloc, đọc bytes
	fmt.Printf("FNV-1a hash của %q = %x  (zero-copy, no alloc)\n", username, h.Sum64())

	// (b) Dùng ĐÚNG: cast buffer net về string để xài làm map key tạm
	buf := []byte("hello-from-network")
	s := BytesToString(buf)
	fmt.Printf("BytesToString: %q (len=%d)\n", s, len(s))

	// (c) Cảnh báo: nếu modify buf, s thay đổi luôn (chứng minh zero-copy)
	buf[0] = 'H'
	fmt.Printf("Sau khi buf[0]='H', s = %q  ← string đã thay đổi! Vi phạm immutability\n", s)
	fmt.Println()
}

// ============================================================================
// 4. Pointer conversion *T1 → unsafe.Pointer → *T2
//    Demo: cùng 8 byte memory đọc dưới 3 góc nhìn (int64, float64, [8]byte).
// ============================================================================

func demoPointerCast() {
	fmt.Println("=== 4. Pointer conversion ===")

	var x int64 = 42
	p := unsafe.Pointer(&x)

	asInt := (*int64)(p)
	asFloat := (*float64)(p)
	asBytes := (*[8]byte)(p)

	fmt.Printf("x int64 = %d\n", *asInt)
	fmt.Printf("đọc same memory như float64 = %g\n", *asFloat)
	fmt.Printf("đọc same memory như [8]byte = % x\n", *asBytes)
	fmt.Println("→ cùng 8 byte trong RAM, 3 cách diễn giải khác nhau.")
	fmt.Println()
}

// ============================================================================
// 5. Slice header manipulation — đọc len/cap của slice qua unsafe.
// ============================================================================

type sliceHeaderManual struct {
	Data unsafe.Pointer
	Len  int
	Cap  int
}

func demoSliceHeader() {
	fmt.Println("=== 5. Slice header (Go internals) ===")
	s := make([]int32, 3, 10)
	s[0], s[1], s[2] = 100, 200, 300

	// Cast slice → header struct (manual; chỉ giáo dục, KHÔNG dùng production)
	hdr := (*sliceHeaderManual)(unsafe.Pointer(&s))
	fmt.Printf("slice header: data=%p  len=%d  cap=%d\n", hdr.Data, hdr.Len, hdr.Cap)
	fmt.Printf("Sizeof([]int32) = %d (kỳ vọng 24 = 8+8+8)\n", unsafe.Sizeof(s))

	// Đọc phần tử qua pointer arithmetic (hợp lệ vì gộp 1 expression)
	elem2 := *(*int32)(unsafe.Pointer(uintptr(hdr.Data) + 2*unsafe.Sizeof(int32(0))))
	fmt.Printf("Element[2] qua pointer arithmetic: %d (kỳ vọng 300)\n", elem2)
	fmt.Println()
}

// ============================================================================
// 6. Demo "tránh modify string literal" — KHÔNG GỌI mặc định vì có thể segfault.
//    Bật bằng biến môi trường / uncomment để học.
// ============================================================================

//go:noinline
func dangerousModifyStringLiteral() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("  RECOVERED:", r)
		}
	}()
	s := "hello-readonly"
	b := StringToBytes(s)
	fmt.Println("  Trước:", s)
	// Trên Linux/macOS string literal nằm ở read-only segment → ghi vào segfault.
	// Không panic-able qua recover (đó là SIGSEGV) → chỉ in cảnh báo.
	_ = b
	// b[0] = 'H' // <- bỏ comment để demo crash
	fmt.Println("  (đã skip b[0]='H' để không crash demo)")
}

// ============================================================================
// 7. Helper: in một strip "memory" theo offset cho 1 struct dạng generic.
// ============================================================================

func describeBytes(label string, n uintptr) string {
	return fmt.Sprintf("%s (%d B)", label, n)
}

func renderStripe(total uintptr, regions []region) string {
	var b strings.Builder
	for i := uintptr(0); i < total; i++ {
		matched := false
		for _, r := range regions {
			if i >= r.start && i < r.start+r.size {
				b.WriteByte(r.ch)
				matched = true
				break
			}
		}
		if !matched {
			b.WriteByte('.')
		}
	}
	return b.String()
}

type region struct {
	start, size uintptr
	ch          byte
}

func demoVisualStripe() {
	fmt.Println("=== 6. Memory stripe của Bad vs Good ===")
	var bad Bad
	var good Good

	badRegions := []region{
		{unsafe.Offsetof(bad.flag1), 1, 'F'},
		{unsafe.Offsetof(bad.id), 8, 'I'},
		{unsafe.Offsetof(bad.flag2), 1, 'F'},
		{unsafe.Offsetof(bad.count), 4, 'C'},
		{unsafe.Offsetof(bad.flag3), 1, 'F'},
		{unsafe.Offsetof(bad.weight), 8, 'W'},
		{unsafe.Offsetof(bad.code), 2, 'D'},
	}
	goodRegions := []region{
		{unsafe.Offsetof(good.id), 8, 'I'},
		{unsafe.Offsetof(good.weight), 8, 'W'},
		{unsafe.Offsetof(good.count), 4, 'C'},
		{unsafe.Offsetof(good.code), 2, 'D'},
		{unsafe.Offsetof(good.flag1), 1, 'F'},
		{unsafe.Offsetof(good.flag2), 1, 'F'},
		{unsafe.Offsetof(good.flag3), 1, 'F'},
	}
	fmt.Println("Bad  :", renderStripe(unsafe.Sizeof(bad), badRegions),
		"  ← '.' = padding,",
		describeBytes("size", unsafe.Sizeof(bad)))
	fmt.Println("Good :", renderStripe(unsafe.Sizeof(good), goodRegions),
		"  ← compact,",
		describeBytes("size", unsafe.Sizeof(good)))
	fmt.Println("Legend: I=id(int64) W=weight(float64) C=count(int32) D=code(int16) F=flag(bool) .=padding")
	fmt.Println()
}

// ============================================================================
// CGo demo trong COMMENT — copy/paste vào file riêng để build với CGo.
// ============================================================================

/*
File cgo_demo.go (build với CGO_ENABLED=1):

	//go:build cgo

	package main

	// #include <string.h>
	// #include <math.h>
	import "C"
	import (
		"fmt"
		"unsafe"
	)

	// CStrlen — wrap C strlen.
	func CStrlen(s string) int {
		cs := C.CString(s)
		defer C.free(unsafe.Pointer(cs))
		return int(C.strlen(cs))
	}

	// CSqrt — wrap C sqrt.
	func CSqrt(x float64) float64 {
		return float64(C.sqrt(C.double(x)))
	}

	func cgoDemo() {
		fmt.Println("CSqrt(2) =", CSqrt(2))
		fmt.Println("CStrlen('hello') =", CStrlen("hello"))
		fmt.Println("CStrlen('café') =", CStrlen("café"))         // 5 byte (UTF-8)
		fmt.Println("CStrlen('a\\x00b') =", CStrlen("a\x00b"))    // 1 — dừng ở \0
	}

Build: CGO_ENABLED=1 go run cgo_demo.go solutions.go
*/

// ============================================================================
// main
// ============================================================================

func main() {
	demoLayout()
	demoMemoryMap()
	demoZeroCopy()
	demoPointerCast()
	demoSliceHeader()
	demoVisualStripe()

	fmt.Println("=== 7. Safe-modify string literal check ===")
	dangerousModifyStringLiteral()
}
