// Package main — Lesson 33 — Memory Model, Escape Analysis & Garbage Collection.
//
// Cách chạy escape analysis tham chiếu:
//
//	go build -gcflags="-m" solutions.go
//
// Sẽ in các quyết định stack/heap. Output mẫu (đã verify):
//
//	./solutions.go:NN:N: moved to heap: x
//	./solutions.go:NN:N: p does not escape
//	./solutions.go:NN:N: ... argument escapes to heap
//
// Cách chạy demo:
//
//	go run solutions.go
package main

import (
	"bytes"
	"fmt"
	"runtime"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// PHẦN 1 — 6 ví dụ escape analysis
// ============================================================================

// Point — struct nhỏ dùng cho mọi case escape.
type Point struct {
	X, Y int
}

// f1: return BY VALUE → không escape.
// Verify: "p does not escape" (hoặc không có dòng "moved to heap: p").
func f1() Point {
	p := Point{1, 2}
	return p
}

// f2: return POINTER → p escape lên heap.
// Verify: "moved to heap: p".
func f2() *Point {
	p := Point{1, 2}
	return &p
}

// f3: nhận pointer, chỉ dereference → KHÔNG escape biến caller.
// Verify: "p does not escape" cho parameter p.
func f3(p *Point) {
	p.X = 10
}

// f4: pass vào fmt.Println (interface) → boxing → escape.
// Verify: "p escapes to heap" hoặc "... argument escapes to heap".
func f4() {
	p := Point{1, 2}
	fmt.Println(p)
}

// f5: return slice → underlying array escape.
// Verify: "make([]int, 100) escapes to heap".
func f5() []int {
	return make([]int, 100)
}

// f6: slice size động → escape (compiler không biết size lúc compile).
// Verify: "make([]int, n) escapes to heap".
func f6(n int) []int {
	s := make([]int, n)
	for i := range s {
		s[i] = i
	}
	return s
}

// f7: closure capture by reference → n escape.
// Verify: "moved to heap: n".
func f7() func() int {
	n := 0
	return func() int {
		n++
		return n
	}
}

// f8: nhận pointer, không store → KHÔNG escape.
// Verify: "*p does not escape".
func f8(p *int) int {
	return *p * 2
}

// runEscapeDemo — chạy 6 case + in output cho người đọc.
func runEscapeDemo() {
	fmt.Println("--- Escape demo ---")

	p1 := f1()
	fmt.Println("f1 return value:", p1)

	p2 := f2()
	fmt.Println("f2 return pointer:", *p2)

	p3 := Point{3, 4}
	f3(&p3) // p3 trên stack của caller, không escape
	fmt.Println("f3 after mutate:", p3)

	f4() // sẽ box p khi gọi Println

	s5 := f5()
	fmt.Println("f5 len:", len(s5))

	s6 := f6(50)
	fmt.Println("f6 len:", len(s6))

	counter := f7()
	fmt.Println("f7 counter:", counter(), counter(), counter())

	x := 5
	fmt.Println("f8 result:", f8(&x), "(x không escape)")
}

// ============================================================================
// PHẦN 2 — runtime.ReadMemStats demo
// ============================================================================

func formatBytes(b uint64) string {
	const unit = 1024
	if b < unit {
		return fmt.Sprintf("%d B", b)
	}
	div, exp := uint64(unit), 0
	for n := b / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.2f %ciB", float64(b)/float64(div), "KMGTPE"[exp])
}

// printMemStats — đọc và in các trường quan trọng.
// ⚠ STW ngắn — đừng gọi trong hot path.
func printMemStats(label string) {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	fmt.Printf("[%s]\n", label)
	fmt.Printf("  Alloc        = %s (live heap)\n", formatBytes(m.Alloc))
	fmt.Printf("  TotalAlloc   = %s (cumulative)\n", formatBytes(m.TotalAlloc))
	fmt.Printf("  Sys          = %s (OS cấp)\n", formatBytes(m.Sys))
	fmt.Printf("  HeapInuse    = %s\n", formatBytes(m.HeapInuse))
	fmt.Printf("  NumGC        = %d\n", m.NumGC)
	fmt.Printf("  PauseTotalNs = %d ns (= %.2f ms)\n",
		m.PauseTotalNs, float64(m.PauseTotalNs)/1e6)
}

func runMemStatsDemo() {
	fmt.Println("--- ReadMemStats demo ---")
	printMemStats("trước khi alloc")

	// Alloc ~80 MB tạm
	leak := make([][]byte, 1000)
	for i := range leak {
		leak[i] = make([]byte, 80*1024) // 80 KB mỗi block
	}
	printMemStats("sau khi alloc 80MB")

	leak = nil
	runtime.GC()
	printMemStats("sau GC (đã drop reference)")
}

// ============================================================================
// PHẦN 3 — String concat vs strings.Builder benchmark
// ============================================================================

// badConcat — O(n²) vì string immutable, mỗi += alloc + copy.
func badConcat(words []string) string {
	s := ""
	for _, w := range words {
		s += w + " "
	}
	return s
}

// goodConcat — O(n) với strings.Builder + Grow.
func goodConcat(words []string) string {
	var b strings.Builder
	total := 0
	for _, w := range words {
		total += len(w) + 1
	}
	b.Grow(total)
	for _, w := range words {
		b.WriteString(w)
		b.WriteByte(' ')
	}
	return b.String()
}

func runConcatBenchmark() {
	fmt.Println("--- Concat benchmark ---")
	words := make([]string, 5000)
	for i := range words {
		words[i] = "hello"
	}

	// Bad
	runtime.GC()
	var m1 runtime.MemStats
	runtime.ReadMemStats(&m1)
	t0 := time.Now()
	_ = badConcat(words)
	elapsedBad := time.Since(t0)
	var m2 runtime.MemStats
	runtime.ReadMemStats(&m2)
	fmt.Printf("badConcat:  %v, alloc=%s\n", elapsedBad,
		formatBytes(m2.TotalAlloc-m1.TotalAlloc))

	// Good
	runtime.GC()
	runtime.ReadMemStats(&m1)
	t0 = time.Now()
	_ = goodConcat(words)
	elapsedGood := time.Since(t0)
	runtime.ReadMemStats(&m2)
	fmt.Printf("goodConcat: %v, alloc=%s\n", elapsedGood,
		formatBytes(m2.TotalAlloc-m1.TotalAlloc))
	fmt.Printf("speedup:    %.1fx\n", float64(elapsedBad)/float64(elapsedGood))
}

// ============================================================================
// PHẦN 4 — Slice retention bug + fix
// ============================================================================

// first10Bad — giữ reference đến underlying array.
func first10Bad(s []int) []int {
	return s[:10]
}

// first10Good — copy ra slice mới, không giữ underlying lớn.
func first10Good(s []int) []int {
	out := make([]int, 10)
	copy(out, s[:10])
	return out
}

func runSliceRetentionDemo() {
	fmt.Println("--- Slice retention demo ---")

	// Bad path
	runtime.GC()
	var m1 runtime.MemStats
	runtime.ReadMemStats(&m1)

	big := make([]int, 1_000_000)
	for i := range big {
		big[i] = i
	}
	small := first10Bad(big)
	big = nil
	runtime.GC()

	var m2 runtime.MemStats
	runtime.ReadMemStats(&m2)
	fmt.Printf("  first10Bad:  small=%v ... live heap delta=%s\n",
		small[:3], formatBytes(m2.Alloc-m1.Alloc))

	// Cho small thoát scope rồi GC
	small = nil
	runtime.GC()

	// Good path
	runtime.ReadMemStats(&m1)

	big2 := make([]int, 1_000_000)
	for i := range big2 {
		big2[i] = i
	}
	small2 := first10Good(big2)
	big2 = nil
	runtime.GC()

	runtime.ReadMemStats(&m2)
	fmt.Printf("  first10Good: small=%v ... live heap delta=%s\n",
		small2[:3], formatBytes(m2.Alloc-m1.Alloc))
	fmt.Println("  → Good giải phóng được underlying array; Bad giữ ~8MB.")
}

// ============================================================================
// PHẦN 5 — sync.Pool buffer
// ============================================================================

// bufPool — reuse bytes.Buffer giữa các request.
var bufPool = sync.Pool{
	New: func() any {
		return new(bytes.Buffer)
	},
}

// renderWithPool — dùng buffer từ pool, reset + put lại sau dùng.
func renderWithPool(items []int) string {
	buf := bufPool.Get().(*bytes.Buffer)
	defer func() {
		buf.Reset()
		bufPool.Put(buf)
	}()
	for _, v := range items {
		fmt.Fprintf(buf, "item-%d;", v)
	}
	return buf.String()
}

// renderWithoutPool — tạo buffer mới mỗi lần.
func renderWithoutPool(items []int) string {
	var buf bytes.Buffer
	for _, v := range items {
		fmt.Fprintf(&buf, "item-%d;", v)
	}
	return buf.String()
}

func runPoolDemo() {
	fmt.Println("--- sync.Pool demo ---")
	items := make([]int, 1000)
	for i := range items {
		items[i] = i
	}

	// Without pool: 10000 lần render = 10000 buffer mới
	runtime.GC()
	var m1, m2 runtime.MemStats
	runtime.ReadMemStats(&m1)
	for i := 0; i < 10000; i++ {
		_ = renderWithoutPool(items)
	}
	runtime.ReadMemStats(&m2)
	fmt.Printf("  no pool:   total alloc=%s\n",
		formatBytes(m2.TotalAlloc-m1.TotalAlloc))

	// With pool
	runtime.GC()
	runtime.ReadMemStats(&m1)
	for i := 0; i < 10000; i++ {
		_ = renderWithPool(items)
	}
	runtime.ReadMemStats(&m2)
	fmt.Printf("  with pool: total alloc=%s\n",
		formatBytes(m2.TotalAlloc-m1.TotalAlloc))
}

// ============================================================================
// PHẦN 6 — Pre-allocate slice demo (BT6)
// ============================================================================

func runPreAllocDemo() {
	fmt.Println("--- Pre-allocate demo ---")

	const N = 1_000_000

	// A: append không pre-alloc
	runtime.GC()
	var m1, m2 runtime.MemStats
	runtime.ReadMemStats(&m1)
	t0 := time.Now()
	var sA []int
	for i := 0; i < N; i++ {
		sA = append(sA, i)
	}
	elapsedA := time.Since(t0)
	runtime.ReadMemStats(&m2)
	fmt.Printf("  no pre-alloc:  %v, total alloc=%s\n",
		elapsedA, formatBytes(m2.TotalAlloc-m1.TotalAlloc))
	_ = sA

	// B: pre-alloc
	runtime.GC()
	runtime.ReadMemStats(&m1)
	t0 = time.Now()
	sB := make([]int, 0, N)
	for i := 0; i < N; i++ {
		sB = append(sB, i)
	}
	elapsedB := time.Since(t0)
	runtime.ReadMemStats(&m2)
	fmt.Printf("  pre-alloc:     %v, total alloc=%s\n",
		elapsedB, formatBytes(m2.TotalAlloc-m1.TotalAlloc))
	fmt.Printf("  speedup:       %.1fx\n", float64(elapsedA)/float64(elapsedB))
	_ = sB
}

// ============================================================================
// PHẦN 7 — Happens-before via channel (memory model)
// ============================================================================

func runHappensBeforeDemo() {
	fmt.Println("--- Happens-before demo ---")
	var x int
	ch := make(chan struct{})

	go func() {
		x = 42      // (A)
		ch <- struct{}{} // (B) sync point: A happens-before B
	}()

	<-ch // (C) sync point: B happens-before C
	// (D) đọc x — GUARANTEED thấy 42 vì A → B → C → D
	fmt.Println("  x =", x, "(guaranteed 42 nhờ channel sync)")
}

// ============================================================================
// main
// ============================================================================

func main() {
	runEscapeDemo()
	fmt.Println()
	runMemStatsDemo()
	fmt.Println()
	runConcatBenchmark()
	fmt.Println()
	runSliceRetentionDemo()
	fmt.Println()
	runPoolDemo()
	fmt.Println()
	runPreAllocDemo()
	fmt.Println()
	runHappensBeforeDemo()
}
