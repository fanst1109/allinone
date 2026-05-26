package lesson35

import (
	"fmt"
	"math/rand"
	"strings"
	"testing"
)

// ============================================================
// Helper — sinh data đầu vào, gọi trước khi reset timer.
// ============================================================

func makeInts(n int) []int {
	r := rand.New(rand.NewSource(42))
	out := make([]int, n)
	for i := range out {
		out[i] = r.Intn(1_000_000)
	}
	return out
}

func makeStrings(n int) []string {
	out := make([]string, n)
	for i := range out {
		out[i] = "abc-"
	}
	return out
}

// ============================================================
// Bench 1 — Sum slice: naive vs pre-alloc vs direct
// ============================================================

func BenchmarkSum(b *testing.B) {
	for _, n := range []int{100, 1000, 10000} {
		xs := makeInts(n)
		b.Run(fmt.Sprintf("Naive/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkInt = SumNaive(xs)
			}
		})
		b.Run(fmt.Sprintf("PreAlloc/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkInt = SumPreAlloc(xs)
			}
		})
		b.Run(fmt.Sprintf("Direct/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkInt = SumDirect(xs)
			}
		})
	}
}

// ============================================================
// Bench 2 — String concat: + vs Builder vs Builder+Grow
// ============================================================

func BenchmarkConcat(b *testing.B) {
	for _, n := range []int{10, 100, 1000} {
		parts := makeStrings(n)
		b.Run(fmt.Sprintf("Plus/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkStr = ConcatPlus(parts)
			}
		})
		b.Run(fmt.Sprintf("Builder/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkStr = ConcatBuilder(parts)
			}
		})
		b.Run(fmt.Sprintf("BuilderGrow/n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				SinkStr = ConcatBuilderGrow(parts)
			}
		})
	}
}

// ============================================================
// Bench 3 — Regex precompile vs compile-in-loop
// ============================================================

func BenchmarkRegex(b *testing.B) {
	input := "alice@example.com"
	b.Run("Precompiled", func(b *testing.B) {
		b.ReportAllocs()
		b.ResetTimer()
		for i := 0; i < b.N; i++ {
			SinkBool = MatchEmailPrecompiled(input)
		}
	})
	b.Run("Recompile", func(b *testing.B) {
		b.ReportAllocs()
		b.ResetTimer()
		for i := 0; i < b.N; i++ {
			SinkBool = MatchEmailRecompile(input)
		}
	})
}

// ============================================================
// Bench 4 — Object pool buffer
// ============================================================

func BenchmarkFormatBuffer(b *testing.B) {
	items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	b.Run("NoPool", func(b *testing.B) {
		b.ReportAllocs()
		b.ResetTimer()
		for i := 0; i < b.N; i++ {
			SinkStr = FormatNoPool(items)
		}
	})
	b.Run("WithPool", func(b *testing.B) {
		b.ReportAllocs()
		b.ResetTimer()
		for i := 0; i < b.N; i++ {
			SinkStr = FormatWithPool(items)
		}
	})
}

// ============================================================
// Bench 5 — Demo StopTimer/StartTimer cho setup giữa iteration
// ============================================================

// BenchmarkHeavySetup minh hoạ: nếu setup đắt nằm TRONG vòng lặp,
// dùng StopTimer trước setup, StartTimer sau đó, để chỉ đo phần đang quan tâm.
func BenchmarkHeavySetup(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		b.StopTimer()
		xs := makeInts(1000) // setup không nên tính vào benchmark
		b.StartTimer()

		SinkInt = SumDirect(xs)
	}
}

// ============================================================
// Bench 6 — Sink pattern: dead-code elimination demo
// ============================================================

// BenchmarkAddNoSink (POSSIBLE PITFALL): compiler có thể inline Add và
// thấy kết quả không dùng → eliminate. Khi đó ns/op cực thấp (vài chục ps).
// (Trong build hiện tại Go thường KHÔNG eliminate hoàn toàn vì có loop counter,
// nhưng đây vẫn là pattern KHÔNG NÊN viết. Giữ ở đây để so sánh trực quan.)
func BenchmarkAddNoSink(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Add(i, i+1) // kết quả bị bỏ → có thể bị eliminate
	}
}

// BenchmarkAddWithSink: gán vào package var → compiler bắt buộc thực thi.
func BenchmarkAddWithSink(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SinkInt = Add(i, i+1)
	}
}

// ============================================================
// Test cơ bản — đảm bảo các phiên bản naive/optimized cùng kết quả
// ============================================================

func TestSumEquivalent(t *testing.T) {
	xs := makeInts(100)
	a, b, c := SumNaive(xs), SumPreAlloc(xs), SumDirect(xs)
	if a != b || b != c {
		t.Fatalf("Sum versions disagree: naive=%d preAlloc=%d direct=%d", a, b, c)
	}
}

func TestConcatEquivalent(t *testing.T) {
	parts := []string{"a", "b", "c", "de"}
	want := "abcde"
	for name, got := range map[string]string{
		"plus":     ConcatPlus(parts),
		"builder":  ConcatBuilder(parts),
		"builderG": ConcatBuilderGrow(parts),
	} {
		if got != want {
			t.Errorf("%s: got %q want %q", name, got, want)
		}
	}
	// Để tránh "unused import" nếu lập trình viên xoá ConcatBuilder
	_ = strings.Builder{}
}

func TestRegexEquivalent(t *testing.T) {
	good := "alice@example.com"
	bad := "not-an-email"
	if !MatchEmailPrecompiled(good) || !MatchEmailRecompile(good) {
		t.Error("good email should match")
	}
	if MatchEmailPrecompiled(bad) || MatchEmailRecompile(bad) {
		t.Error("bad email should not match")
	}
}

func TestFormatEquivalent(t *testing.T) {
	items := []int{1, 2, 3}
	a, b := FormatNoPool(items), FormatWithPool(items)
	if a != b || a != "items=[1,2,3]" {
		t.Errorf("format mismatch: noPool=%q withPool=%q", a, b)
	}
}
