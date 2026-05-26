// Package lesson35 minh hoạ benchmark và optimization trong Go.
//
// Mọi hàm ở đây đều có cặp "naive" và "optimized" để so sánh trong
// solutions_test.go. Cách chạy:
//
//	go test -bench=. -benchmem ./...
//
// File này tự đứng được (không cần import gì ngoài std), mục đích chính là
// để các benchmark có thật ngữ liệu chứ không phải dạy thư viện.
package lesson35

import (
	"bytes"
	"regexp"
	"strconv"
	"strings"
	"sync"
)

// ============================================================
// 1. Sum slice — pre-allocate vs append-grow
// ============================================================

// SumNaive tính tổng nhưng build mảng tạm bằng append từ slice rỗng.
// Mỗi lần append vượt cap → runtime phải allocate slice mới + copy.
// Đây là antipattern phổ biến khi mình biết trước kích thước.
func SumNaive(xs []int) int {
	tmp := make([]int, 0) // KHÔNG đặt cap → 0,1,2,4,8,16,... lần grow
	for _, x := range xs {
		tmp = append(tmp, x*2) // giả lập có transform trước khi cộng
	}
	s := 0
	for _, v := range tmp {
		s += v
	}
	return s
}

// SumPreAlloc giống hệt logic nhưng pre-allocate cap đúng len(xs).
// → chỉ 1 lần allocate, không grow.
func SumPreAlloc(xs []int) int {
	tmp := make([]int, 0, len(xs)) // cap đúng → 0 lần grow
	for _, x := range xs {
		tmp = append(tmp, x*2)
	}
	s := 0
	for _, v := range tmp {
		s += v
	}
	return s
}

// SumDirect: best version — không cần slice tạm, gộp transform + sum.
// Dùng để minh hoạ: nhiều khi "optimization" thật là loại bỏ data structure
// thừa, chứ không phải tinh chỉnh allocation.
func SumDirect(xs []int) int {
	s := 0
	for _, x := range xs {
		s += x * 2
	}
	return s
}

// ============================================================
// 2. String concat — `+=` vs strings.Builder
// ============================================================

// ConcatPlus dùng `+=`. Mỗi lần `+=` allocate string mới + copy toàn bộ
// nội dung cũ. Độ phức tạp O(n²) theo tổng độ dài.
func ConcatPlus(parts []string) string {
	s := ""
	for _, p := range parts {
		s += p
	}
	return s
}

// ConcatBuilder dùng strings.Builder. Builder giữ buffer trong và grow
// theo geometric (×2). Cuối cùng String() cast trực tiếp không copy nếu
// builder không escape (đây là tối ưu của Go runtime).
func ConcatBuilder(parts []string) string {
	var b strings.Builder
	for _, p := range parts {
		b.WriteString(p)
	}
	return b.String()
}

// ConcatBuilderGrow: thêm Grow() để pre-allocate buffer.
// Nếu biết trước tổng length thì đây là dạng tối ưu nhất.
func ConcatBuilderGrow(parts []string) string {
	total := 0
	for _, p := range parts {
		total += len(p)
	}
	var b strings.Builder
	b.Grow(total)
	for _, p := range parts {
		b.WriteString(p)
	}
	return b.String()
}

// ============================================================
// 3. Regex — compile-in-loop vs precompiled package var
// ============================================================

// emailRE precompile 1 lần ở init → mọi lần dùng đều rẻ.
var emailRE = regexp.MustCompile(`^[\w.\-]+@[\w\-]+\.[\w.\-]+$`)

// MatchEmailPrecompiled dùng regex đã compile sẵn.
func MatchEmailPrecompiled(s string) bool {
	return emailRE.MatchString(s)
}

// MatchEmailRecompile compile lại mỗi lần gọi. ANTI-PATTERN —
// compile regex là việc đắt (parse + NFA build), nên không lặp lại.
func MatchEmailRecompile(s string) bool {
	re := regexp.MustCompile(`^[\w.\-]+@[\w\-]+\.[\w.\-]+$`)
	return re.MatchString(s)
}

// ============================================================
// 4. Object pool — bytes.Buffer reuse via sync.Pool
// ============================================================

// bufPool tái sử dụng bytes.Buffer giữa các request.
// Thường thấy trong HTTP middleware, log formatter, JSON encoder.
var bufPool = sync.Pool{
	New: func() interface{} { return new(bytes.Buffer) },
}

// FormatNoPool: allocate buffer mới mỗi lần → tăng GC pressure.
func FormatNoPool(items []int) string {
	var buf bytes.Buffer
	buf.WriteString("items=[")
	for i, x := range items {
		if i > 0 {
			buf.WriteByte(',')
		}
		buf.WriteString(strconv.Itoa(x))
	}
	buf.WriteByte(']')
	return buf.String()
}

// FormatWithPool: lấy buffer từ pool, dùng xong reset + put lại.
// Lưu ý: phải Reset() trước khi Put, nếu không lần lấy sau sẽ thấy data cũ.
func FormatWithPool(items []int) string {
	buf := bufPool.Get().(*bytes.Buffer)
	buf.Reset()
	defer bufPool.Put(buf)

	buf.WriteString("items=[")
	for i, x := range items {
		if i > 0 {
			buf.WriteByte(',')
		}
		buf.WriteString(strconv.Itoa(x))
	}
	buf.WriteByte(']')
	// Lưu ý: buf.String() copy ra string mới → an toàn dù sau đó Put lại pool.
	return buf.String()
}

// ============================================================
// 5. Sink — chống dead-code elimination trong benchmark
// ============================================================

// Sink là package var (exported nhưng dùng nội bộ test).
// Khi gán kết quả vào Sink, compiler không dám eliminate vì có side-effect
// (ghi vào memory ngoài hàm).
var (
	SinkInt    int
	SinkStr    string
	SinkBool   bool
	SinkBytes  []byte
)

// Add chỉ là hàm tầm thường, ở đây để minh hoạ pitfall "compiler optimize away".
// Nếu benchmark viết `Add(1,2)` mà không giữ kết quả, inline có thể biến vòng lặp
// thành no-op → ns/op = 0.3ns/op (chỉ là CPU đếm vòng lặp), không phản ánh thực.
func Add(a, b int) int { return a + b }

// HeavyCompute giả lập một workload không-trivial để benchmark thật sự đo gì đó.
func HeavyCompute(n int) int {
	s := 0
	for i := 1; i <= n; i++ {
		s += i * i
	}
	return s
}
