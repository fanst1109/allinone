// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-35-benchmark-optimization/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 35 — Benchmark & Optimization

> Tier 3 · Go nâng cao · Bài 35
>
> Tiếp nối [Lesson 26 — Testing basics](../lesson-26-testing-basics/) (benchmark sơ khởi) và [Lesson 34 — Profiling pprof](../lesson-34-profiling-pprof/) (tìm bottleneck). Bài này dạy cách **đo chính xác** và **chứng minh** một thay đổi code thật sự nhanh hơn, không phải "cảm thấy nhanh hơn".

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Viết \`func BenchmarkXxx(b *testing.B)\` đúng chuẩn \`go test -bench\`.
2. Đọc đúng output \`BenchmarkFoo-8   1000000   1234 ns/op   500 B/op   3 allocs/op\` — biết từng cột nghĩa là gì.
3. Dùng \`b.ReportAllocs()\`, \`b.ResetTimer()\`, \`b.StopTimer()/StartTimer()\`, \`b.Run()\` đúng chỗ.
4. Tránh được 4 cạm bẫy micro-benchmark phổ biến: dead-code elimination, setup-in-loop, cache warm-up, kết quả không phản ánh workload thật.
5. Dùng \`benchstat\` để so sánh 2 phiên bản code và biết khác biệt có **statistically significant** không.
6. Áp dụng được ≥ 6 optimization phổ thông (pre-alloc, \`strings.Builder\`, regex precompile, \`sync.Pool\`, ...) — kèm số đo cụ thể.

## Kiến thức tiền đề

- [L26 — Testing basics](../lesson-26-testing-basics/) — biết viết \`_test.go\`, hiểu \`*testing.T\`.
- [L33 — Memory & GC](../lesson-33-memory-gc/) — hiểu stack vs heap, vì sao allocation count quan trọng.
- [L34 — Profiling pprof](../lesson-34-profiling-pprof/) — biết tìm bottleneck. **Phải profile TRƯỚC khi optimize**, benchmark chỉ là để verify thay đổi đã đúng hướng.

---

## 1. Benchmark cơ bản — ôn lại từ L26

### 1.1 Cấu trúc tối thiểu

\`\`\`go
// trong file foo_test.go
package foo

import "testing"

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}
\`\`\`

Chạy:

\`\`\`
go test -bench=. -benchmem
\`\`\`

Output (mẫu):

\`\`\`
BenchmarkAdd-8   1000000000   0.41 ns/op   0 B/op   0 allocs/op
\`\`\`

### 1.2 \`b.N\` được tự calibrate

Đây là phần dễ nhầm. **Bạn không tự chọn số vòng lặp**. Cách Go runner làm:

1. Chạy thử với \`b.N = 1\`. Đo thời gian.
2. Nếu chưa đủ "ổn định" (mặc định \`-benchtime=1s\`), nhân \`b.N\` lên (×100, ×10, ×5...) và chạy lại.
3. Lặp cho đến khi tổng thời gian ≥ \`-benchtime\`.

→ \`1000000\` ops trong output không phải số magic — đó là số Go quyết định cần để đo trong 1s.

**Hệ quả:** Hàm rất nhanh (vài ns) → \`b.N\` lên hàng tỷ. Hàm chậm → vài chục. Đừng hard-code.

💡 **Trực giác**: nghĩ về benchmark như chạy 100m vs marathon. Để đo chính xác tốc độ, bạn phải chạy đủ lâu — nếu chạy 2 giây thì 1 cơn gió cũng làm sai. Go tự lo cho bạn việc "chạy đủ lâu".

---

## 2. \`b.ReportAllocs()\` — báo allocation

Mặc định output chỉ có \`ns/op\`. Để có \`B/op\` và \`allocs/op\`, gọi \`b.ReportAllocs()\` ở đầu, **hoặc** chạy với cờ \`-benchmem\`:

\`\`\`go
func BenchmarkAdd(b *testing.B) {
    b.ReportAllocs() // bật báo cáo cho benchmark này
    for i := 0; i < b.N; i++ {
        SinkInt = Add(1, 2)
    }
}
\`\`\`

Vì sao allocation quan trọng? Vì mỗi allocation:

- Tốn CPU (cấp phát + zero).
- Tăng GC pressure → STW pause dài hơn.
- Tăng working set → cache miss nhiều hơn.

Trong nhiều hot path, **giảm \`allocs/op\`** đem lại tốc độ hơn cả giảm \`ns/op\` trực tiếp.

⚠ **Lỗi thường gặp:** quên \`b.ReportAllocs()\` → không thấy allocation → tưởng đã tối ưu xong trong khi mỗi op vẫn allocate 10 lần. Khi tôi nghi ngờ, tôi **luôn** chạy \`-benchmem\`.

---

## 3. \`b.ResetTimer()\` — reset sau setup

Khi setup tốn thời gian, không muốn nó được tính:

\`\`\`go
func BenchmarkParseHugeFile(b *testing.B) {
    data := loadBigFile() // 200ms — không phải thứ ta đang đo
    b.ResetTimer()        // reset clock + allocation counters
    for i := 0; i < b.N; i++ {
        Parse(data)
    }
}
\`\`\`

\`ResetTimer\` reset cả: thời gian, byte allocated, alloc count, custom metrics. Nếu không gọi → 200ms setup bị chia đều cho \`b.N\` → sai số khổng lồ.

🔁 **Dừng lại tự kiểm tra:** vì sao \`b.N=1\` đầu tiên cũng phải gọi \`ResetTimer\`?

<details>
<summary>Đáp án</summary>

Vì runner gọi function của bạn từ đầu mỗi lần thử \`b.N\` khác nhau — không phải gọi 1 lần duy nhất rồi tăng \`b.N\`. Lần thử với \`b.N=1\` cũng phải reset, vì nếu không, setup 200ms sẽ làm runner tưởng hàm chạy chậm khủng khiếp → giảm \`b.N\`. Kết quả cuối cùng sẽ thiếu chính xác.
</details>

---

## 4. \`b.StopTimer()\` / \`b.StartTimer()\` — pause giữa iteration

Khi setup phải nằm **trong** vòng lặp (vd workload phá huỷ trạng thái mỗi iteration):

\`\`\`go
func BenchmarkHeavySetup(b *testing.B) {
    for i := 0; i < b.N; i++ {
        b.StopTimer()
        xs := makeInts(1000)  // setup mới mỗi vòng
        b.StartTimer()

        SinkInt = SumDirect(xs) // chỉ phần này được đo
    }
}
\`\`\`

⚠ Stop/Start có overhead nhỏ (~vài chục ns). Nếu phần "đo" cũng chỉ vài chục ns → chính nó là noise. Khi đó nên: chuẩn bị sẵn N input ngoài vòng lặp, hoặc đo workload to hơn.

---

## 5. Sub-benchmark — \`b.Run\`

Pattern quan trọng nhất khi muốn quét theo input size:

\`\`\`go
func BenchmarkSum(b *testing.B) {
    for _, n := range []int{100, 1000, 10000} {
        xs := makeInts(n)
        b.Run(fmt.Sprintf("n=%d", n), func(b *testing.B) {
            b.ReportAllocs()
            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                SinkInt = SumDirect(xs)
            }
        })
    }
}
\`\`\`

Output:

\`\`\`
BenchmarkSum/n=100-8     5000000   43 ns/op   0 B/op   0 allocs/op
BenchmarkSum/n=1000-8     500000  675 ns/op   0 B/op   0 allocs/op
BenchmarkSum/n=10000-8     30000 7100 ns/op   0 B/op   0 allocs/op
\`\`\`

Đẹp ở chỗ:

- Tỷ lệ \`n × 10 → ns × 10\` → xác nhận $O(n)$ đúng như mong đợi.
- Có thể combine 2 dimension: \`n × algo\`:

\`\`\`go
for _, algo := range []struct{
    name string
    fn   func([]int) int
}{
    {"Naive", SumNaive}, {"PreAlloc", SumPreAlloc}, {"Direct", SumDirect},
} {
    for _, n := range []int{100, 1000, 10000} {
        b.Run(fmt.Sprintf("%s/n=%d", algo.name, n), func(b *testing.B) { ... })
    }
}
\`\`\`

→ Output dạng \`BenchmarkSum/Naive/n=100-8\` — \`benchstat\` đọc được dễ.

---

## 6. \`benchstat\` — so sánh phiên bản

\`go test -bench=\` chỉ nói "hàm này chạy 1234 ns/op". Câu hỏi quan trọng hơn: **"sau khi tôi refactor, có nhanh hơn không, và khác biệt có ý nghĩa thống kê không?"**

### 6.1 Cài đặt

\`\`\`bash
go install golang.org/x/perf/cmd/benchstat@latest
\`\`\`

### 6.2 Workflow

\`\`\`bash
# 1) Trên code cũ (vd commit trước refactor)
git checkout main
go test -bench=BenchmarkConcat -benchmem -count=10 > old.txt

# 2) Trên code mới
git checkout my-optimize-branch
go test -bench=BenchmarkConcat -benchmem -count=10 > new.txt

# 3) So sánh
benchstat old.txt new.txt
\`\`\`

\`-count=10\` cực kỳ quan trọng — chạy 10 lần để có sample đủ cho t-test.

### 6.3 Đọc output benchstat

\`\`\`
                     │   old.txt   │           new.txt           │
                     │   sec/op    │   sec/op     vs base        │
Concat/n=1000-8        638µ ± 12%   6.95µ ± 8%   -98.91% (p=0.000 n=10)
\`\`\`

- \`638µ ± 12%\`: trung bình + nhiễu của old.
- \`6.95µ ± 8%\`: trung bình + nhiễu của new.
- \`-98.91%\`: new nhanh hơn 91 lần (1 - 6.95/638).
- \`p=0.000\`: p-value < 0.001 → khác biệt **chắc chắn không phải may rủi**.

Quy ước: **p ≥ 0.05 → có thể chỉ là noise**, không kết luận. Khi p ≥ 0.05 nhưng improvement 50%, nguyên nhân thường là \`-count\` quá ít → chạy lại với \`-count=20\`.

❓ **Câu hỏi tự nhiên**: "tôi thấy \`+5%\` ở \`new.txt\`. Có nên rollback không?"

> Phụ thuộc p-value. Nếu p=0.4 → regression ảo, có thể bỏ qua. Nếu p=0.001 → regression thật, phải hiểu vì sao trước khi merge. Đừng quyết bằng mắt thường.

---

## 7. Micro-benchmark pitfall — 4 cái bẫy hay gặp

### 7.1 Dead-code elimination

Code này LOOKS OK nhưng SAI:

\`\`\`go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(i, i+1) // ← kết quả không dùng → compiler có thể eliminate
    }
}
\`\`\`

Output thường rơi vào \`0.3 ns/op\` cho mọi hàm "đơn giản" — không phải vì hàm nhanh thật, mà vì compiler inline + loại bỏ.

**Fix**: gán vào package var (gọi là **Sink**):

\`\`\`go
var SinkInt int // package-level

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        SinkInt = Add(i, i+1) // ghi vào memory ngoài → không eliminate được
    }
}
\`\`\`

Trong repo này, file \`solutions.go\` có \`var SinkInt int\`, \`var SinkStr string\`, ... dùng đúng pattern.

### 7.2 Loop unroll, inline

Compiler có thể unroll loop \`b.N\` (vì biết \`b.N\` cố định khi gọi). Kết quả không phản ánh workload thật.

Phòng tránh: workload đo phải đủ phức tạp để inline không xoá gì (ví dụ có branch, có memory access).

### 7.3 Cache warm-up

Iteration đầu tiên (lúc data chưa vào L1/L2 cache) **luôn** chậm hơn các iteration sau. Khi \`b.N\` nhỏ (vd hàm chạy hàng ms), warm-up dominat.

Mitigation:

- \`b.N\` lớn (Go tự lo qua \`-benchtime\`).
- Pre-warm bằng dummy run trước khi reset timer.

### 7.4 Benchmark không reflect real workload

Ví dụ kinh điển: bench \`strings.Builder\` với 10 string. Trong production code thật, chuỗi có thể là 10k. → kết luận sai chiều: bạn nghĩ Builder không lợi gì, hoá ra ở scale thật nó nhanh 100×.

**Quy tắc:** benchmark trên size + pattern data **giống production**, không phải data tự bịa nhỏ xíu.

---

## 8. Reading benchmark output — phân tích từng cột

\`\`\`
BenchmarkConcat/Plus/n=1000-8     391    638114 ns/op   2137575 B/op   999 allocs/op
\`\`\`

| Cột | Ý nghĩa |
|---|---|
| \`BenchmarkConcat/Plus/n=1000\` | tên benchmark đầy đủ (gồm sub-bench) |
| \`-8\` | \`GOMAXPROCS=8\` lúc chạy. Khác máy có giá trị khác. |
| \`391\` | \`b.N\` thực tế (số lần lặp Go runner chọn) |
| \`638114 ns/op\` | trung bình 638µs / op |
| \`2137575 B/op\` | mỗi op allocate 2.1 MB |
| \`999 allocs/op\` | mỗi op allocate 999 lần (≈ số phần tử concat) |

→ Đọc ngay: với 1000 chuỗi 4 byte, dùng \`+=\` allocate 2 MB và 999 lần. Vì sao? Mỗi \`+=\` tạo string mới = copy tích luỹ → tổng cộng $O(n^2)$ bytes.

---

## 9. Common optimizations — kèm số đo thật

Tất cả số dưới đây lấy từ \`go test -bench=. -benchmem\` trên \`solutions_test.go\` của lesson này (Intel Xeon @ 2.10GHz, Go 1.24.7). Tự chạy lại để xác nhận.

### 9.1 Pre-allocate slice

\`\`\`
BenchmarkSum/Naive/n=10000      93901 ns/op   357625 B/op   19 allocs/op
BenchmarkSum/PreAlloc/n=10000   25844 ns/op    81920 B/op    1 allocs/op
BenchmarkSum/Direct/n=10000      7119 ns/op        0 B/op    0 allocs/op
\`\`\`

- **Naive** dùng \`make([]int, 0)\` → grow 19 lần (1→2→4→...→16384).
- **PreAlloc** dùng \`make([]int, 0, n)\` → 1 lần allocate đúng cap.
- **Direct** xoá luôn slice tạm → 0 allocate.

**Bài học**: optimization tốt nhất thường là **xoá thứ thừa**, không phải tinh chỉnh.

### 9.2 \`strings.Builder\` thay vì \`+=\`

\`\`\`
BenchmarkConcat/Plus/n=1000        638114 ns/op   2137575 B/op   999 allocs/op
BenchmarkConcat/Builder/n=1000       6952 ns/op     12536 B/op    12 allocs/op
BenchmarkConcat/BuilderGrow/n=1000   4849 ns/op      4096 B/op     1 allocs/op
\`\`\`

- \`+=\` → $O(n^2)$ bytes. 1000 chuỗi 4-byte → 2 MB allocate.
- Builder → $O(n)$ bytes nhờ grow geometric.
- Builder + \`Grow(total)\` → 1 lần allocate.

**Speedup ~92× từ Plus → BuilderGrow.**

### 9.3 Pre-compile regex

\`\`\`
BenchmarkRegex/Precompiled    324.8 ns/op      0 B/op    0 allocs/op
BenchmarkRegex/Recompile     6193   ns/op   5761 B/op   78 allocs/op
\`\`\`

\`regexp.Compile\` parse pattern + build NFA — tốn ~6µs. Nếu compile trong loop, tốc độ tụt 19×.

**Đặt vào package var**, dùng \`regexp.MustCompile\`:

\`\`\`go
var emailRE = regexp.MustCompile(\`...\`)
\`\`\`

### 9.4 \`sync.Pool\` cho buffer reuse

\`\`\`
BenchmarkFormatBuffer/NoPool     150.8 ns/op   96 B/op   2 allocs/op
BenchmarkFormatBuffer/WithPool   126.4 ns/op   32 B/op   1 allocs/op
\`\`\`

Gain ở example này nhỏ vì buffer chỉ 32 byte. Trong HTTP handler thực tế (request body 8 KB) gain lớn hơn nhiều. **Quy tắc**: Pool có ích khi object to + tạo nhiều lần + life-time ngắn.

⚠ Pool **không phải free lunch**: bản thân \`Pool.Get/Put\` có overhead (lock-free atomic). Object nhỏ + ít → không bằng allocate trực tiếp.

### 9.5 Avoid interface conversion in hot path

\`\`\`go
// CHẬM: mỗi gọi runtime kiểm tra type
func handle(x any) { ... }
handle(42)

// NHANH: gọi function generic / concrete
func handleInt(x int) { ... }
\`\`\`

Trong hot loop, tránh \`any\`/\`interface{}\` nếu type đã biết. Generic (L30) cho phép type-safe + zero overhead.

### 9.6 Pre-compile / cache hot data

JSON marshal cùng object trong mỗi request → tốn vô ích. Marshal 1 lần khi data đổi, cache \`[]byte\` ra, reuse.

\`\`\`go
var hotPageJSON []byte
func init() { hotPageJSON, _ = json.Marshal(hotPage) }

func handler(w http.ResponseWriter, r *http.Request) {
    w.Write(hotPageJSON) // không marshal lại
}
\`\`\`

### 9.7 \`json-iterator\` hoặc code-gen

Std \`encoding/json\` dùng reflect → mỗi field tốn. Với JSON to / hot path:

- \`github.com/json-iterator/go\` (drop-in, nhanh ~2-3×).
- \`github.com/mailru/easyjson\` (code-gen, nhanh ~5-10×).

### 9.8 \`io.Copy\` thay vì \`io.ReadAll\` cho stream

\`\`\`go
// XẤU: load toàn bộ vào RAM
data, _ := io.ReadAll(resp.Body)
file.Write(data)

// TỐT: stream
io.Copy(file, resp.Body)
\`\`\`

File 1 GB → ReadAll consume 1 GB RAM; Copy chỉ buffer 32 KB.

---

## 10. CPU optimization

### 10.1 Cache locality

Bộ nhớ truy cập tuần tự nhanh hơn random ~10-100× (do prefetch + L1 cache line 64 byte).

**Hệ quả thực tế:**

| Pattern | Locality | Speed |
|---|---|---|
| \`[]Struct\` (slice of struct) | tốt | nhanh |
| \`[]*Struct\` (slice of pointer) | tệ (mỗi struct ở chỗ random) | chậm hơn 2-5× |
| Linked list | rất tệ | chậm 10× |

**Struct field order** cũng ảnh hưởng — đặt field hot path gần nhau giúp 1 cache line đủ. (Xem [L33 — Memory & GC](../lesson-33-memory-gc/) để hiểu sâu.)

### 10.2 Branch prediction miss

CPU pipeline đoán nhánh \`if\` rẽ về đâu. Đoán sai → flush pipeline (~15 cycle phạt).

Mitigation:

- Branch predictable (\`if x > 0\` mà \`x\` luôn dương) → fast.
- Sort dữ liệu trước nếu branch dựa trên giá trị (kinh điển — sorted vs unsorted array có thể chênh 5×).

### 10.3 SIMD

Go không tự auto-vectorize tốt. Nếu thực sự cần SIMD: viết assembly trong file \`*.s\`, hoặc dùng package \`simd\` external. Hiếm khi cần — chỉ khi đụng matrix math / image processing hot.

---

## 11. Memory optimization

### 11.1 Stack > heap

\`-gcflags="-m"\` để xem escape analysis. Object trên stack: free khi return, GC không thấy → 0 cost.

(Chi tiết: [L33 — Memory & GC](../lesson-33-memory-gc/).)

### 11.2 Reduce \`allocs/op\`

GC scan TỪNG allocation. 1 allocate 1 MB rẻ hơn 1000 allocate 1 KB:

\`\`\`
1 × 1MB:    1 GC root, 1 allocate
1000 × 1KB: 1000 GC roots, 1000 allocate, header overhead × 1000
\`\`\`

→ Batch allocate khi có thể.

### 11.3 Object pooling

\`sync.Pool\` (xem 9.4). Hữu ích cho buffer, encoder, scratch space.

### 11.4 Avoid unnecessary copy

\`\`\`go
// COPY toàn bộ slice mỗi lần
for _, x := range bigSliceOfStructs { ... }

// CHỈ COPY pointer 8 byte
for i := range bigSliceOfStructs { x := &bigSliceOfStructs[i]; ... }
\`\`\`

Với struct to (vd 200 byte), chênh lệch đáng kể. Với struct nhỏ (≤ 64 byte), copy thường rẻ hơn pointer dereference vì cache locality.

---

## 12. Benchmark methodology — chạy đúng cách

Benchmark không tin được nếu môi trường nhiễu. Checklist:

1. **Quiet machine** — đóng browser, IDE, Slack. Background process ăn CPU làm sai số ±20%.
2. **Disable Turbo Boost** (Intel) / \`cpupower frequency-set -g performance\` — CPU clock cố định.
3. **Multiple runs** — \`-count=10\` tối thiểu, 20 nếu khác biệt nhỏ (<10%).
4. **Same hardware** — không so old chạy MacBook vs new chạy Linux server.
5. **\`benchstat\`** thay vì so bằng mắt. Để statistically confirm.
6. **\`-cpu=1,2,4,8\`** — chạy với nhiều \`GOMAXPROCS\` để thấy scaling.
7. **Pin to CPU** (Linux): \`taskset -c 0 go test -bench=...\` — tránh OS migrate goroutine giữa core.

⚠ **Đặc biệt với CI**: chạy benchmark trên cloud VM cực không ổn định (noisy neighbor). Nếu muốn benchmark trong CI, dùng dedicated runner.

---

## 13. Real-world example — optimize endpoint \`/api/users\`

Tình huống: API trả list user, latency p99 200ms, budget 50ms.

### Step 1 — Profile (L34)

\`\`\`
go test -cpuprofile=cpu.out -bench=BenchmarkHandler
go tool pprof -http=:8080 cpu.out
\`\`\`

Flamegraph cho thấy **65% thời gian** ở \`json.Marshal\` của field \`Avatar\` (struct 30 field, có 4 field hiếm dùng).

### Step 2 — Hypothesize

- Có thể bỏ qua field không cần (lean DTO).
- Có thể cache JSON cho user "hot" (top 10% truy cập 90%).
- Có thể switch sang \`json-iterator\`.

### Step 3 — Bench tối ưu nhỏ trước

\`\`\`go
// BEFORE
type UserDTO struct { /* 30 fields */ }

// AFTER (lean)
type UserListItem struct { ID, Name, Avatar string } // 3 fields
\`\`\`

Bench:

\`\`\`
BenchmarkMarshalFull    8000   145000 ns/op   45000 B/op   123 allocs/op
BenchmarkMarshalLean   80000    14500 ns/op    1200 B/op    15 allocs/op
\`\`\`

→ **10× nhanh hơn**.

### Step 4 — Cache hot user

Top-100 user account 60% traffic. Cache JSON trong-memory với TTL 30s:

\`\`\`go
var hotCache sync.Map // userID → []byte

func MarshalUser(u User) []byte {
    if v, ok := hotCache.Load(u.ID); ok {
        return v.([]byte)
    }
    data, _ := json.Marshal(u)
    if u.IsHot { hotCache.Store(u.ID, data) }
    return data
}
\`\`\`

### Step 5 — Verify

Production latency p99: 200ms → **42ms**. Trong budget.

### Step 6 — Stop

Đây là điểm quan trọng: **dừng**. Có thể optimize tiếp xuống 30ms? Có, nhưng:

- Tốn 1 tuần dev.
- Code phức tạp hơn.
- User không thấy khác biệt (đã trong budget).

→ Diminishing returns. Đầu tư công sức vào việc khác.

📝 **Bài học chính**: profile → hypothesis → bench → verify → DỪNG. Không optimize vì "có thể nhanh hơn được nữa".

---

## 14. When to stop optimizing

Dấu hiệu nên dừng:

1. **Latency target đạt** — không cần nhanh hơn user yêu cầu.
2. **Cost trong budget** — CPU/RAM không quá ngưỡng.
3. **Diminishing returns** — mỗi 5% speedup tốn gấp đôi effort.
4. **Code đã phức tạp** — thêm optimization làm khó maintain.

**Anti-pattern**: optimize 1% case. Bạn dành 1 tuần làm code path hiếm gặp nhanh hơn — code chính không lợi gì.

> "Premature optimization is the root of all evil." — Donald Knuth.
> Đầy đủ hơn: "We *should* forget about small efficiencies, say about 97% of the time; *yet we should not pass up our opportunities in that critical 3%*."

Tức là: 97% code không cần optimize. **Profile để xác định 3% kia.**

---

## 15. Common pitfall — checklist trước khi commit benchmark

- [ ] Benchmark code có reflect **real workload** không? (size data, distribution, concurrency)
- [ ] Có gọi \`b.ReportAllocs()\` hoặc \`-benchmem\` không?
- [ ] Có Sink var để chặn dead-code elimination không?
- [ ] \`b.ResetTimer()\` sau setup đắt?
- [ ] \`b.StopTimer()/StartTimer()\` cho setup-in-loop?
- [ ] Có chạy nhiều lần (\`-count=10\`) + dùng \`benchstat\`?
- [ ] Machine yên tĩnh, không IDE/browser chạy nặng?
- [ ] Có lưu \`old.txt\` trước khi sửa code để compare?

---

## Bài tập

### BT1 — Pre-alloc slice có thật sự khác biệt?

Cho hàm:

\`\`\`go
func Squares(n int) []int {
    out := []int{}
    for i := 0; i < n; i++ {
        out = append(out, i*i)
    }
    return out
}
\`\`\`

1. Viết 2 phiên bản: naive (như trên) + pre-alloc (\`make([]int, 0, n)\`).
2. Bench với \`n = 100, 1000, 100000\`.
3. Trả lời: ở \`n\` nào chênh lệch rõ rệt? Vì sao nhỏ \`n\` chênh không nhiều?

### BT2 — Identify dead-code elimination

Cho code dưới đây. Tìm bug khiến output \`0.3 ns/op\`, sửa lại:

\`\`\`go
func multiply(a, b int) int { return a * b }

func BenchmarkMul(b *testing.B) {
    for i := 0; i < b.N; i++ {
        multiply(i, i+1)
    }
}
\`\`\`

### BT3 — Regex precompile

Viết benchmark cho 2 phiên bản:

- \`MatchHTTPPrecompile(s string) bool\` — dùng package var \`httpRE = regexp.MustCompile(...)\`.
- \`MatchHTTPRecompile(s string) bool\` — compile bên trong hàm.

Pattern: \`^https?://[a-z0-9.-]+(:[0-9]+)?(/.*)?$\`. Bench với 100 URL khác nhau. Báo \`ns/op\` + \`allocs/op\`.

### BT4 — Buffer pool

Viết handler giả lập format JSON cho 50 item:

\`\`\`go
func format(items []int) string {
    // build "[1,2,3,...]" dùng bytes.Buffer
}
\`\`\`

Bench 2 phiên bản: tạo buffer mới mỗi lần vs lấy từ \`sync.Pool\`. Báo \`B/op\`, \`allocs/op\`.

### BT5 — Đọc benchstat

Cho output:

\`\`\`
                │   old.txt   │           new.txt           │
                │   sec/op    │   sec/op     vs base        │
Foo-8             1.20µ ± 5%   1.05µ ± 4%   -12.5% (p=0.000 n=10)
Bar-8             3.10µ ± 18%  3.00µ ± 22%   ~       (p=0.604 n=10)
Baz-8             50.0n ± 2%   30.0n ± 3%   -40.0% (p=0.000 n=10)
\`\`\`

Trả lời:

1. Benchmark nào có cải tiến statistically significant?
2. Bar tại sao không có % và \`vs base\`?
3. Nếu cần ưu tiên 1 cải tiến để giải thích cho team, chọn Foo hay Baz? Vì sao?

### BT6 — Fix 4 anti-pattern

Code dưới đây mắc 4 lỗi benchmark. Sửa từng cái và giải thích:

\`\`\`go
func BenchmarkProcess(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := generateData(10000)         // (1)
        result := processData(data)         // (2)
        json.Marshal(result)                // (3)
    }
}

func processData(d []int) []int { /* ... */ }
func generateData(n int) []int  { /* ... */ }
\`\`\`

Note: thiếu \`b.ReportAllocs()\` là antipattern thứ 4.

---

## Lời giải chi tiết

### Lời giải BT1

\`\`\`go
func SquaresNaive(n int) []int {
    out := []int{}
    for i := 0; i < n; i++ { out = append(out, i*i) }
    return out
}

func SquaresPreAlloc(n int) []int {
    out := make([]int, 0, n)
    for i := 0; i < n; i++ { out = append(out, i*i) }
    return out
}
\`\`\`

Số đo (ví dụ):

| n | Naive | PreAlloc | Speedup |
|---|---|---|---|
| 100 | 350 ns/op, 2 KB/op, 5 allocs | 280 ns/op, 0.8 KB/op, 1 alloc | 1.25× |
| 1000 | 2500 ns/op, 16 KB/op, 9 allocs | 1800 ns/op, 8 KB/op, 1 alloc | 1.4× |
| 100000 | 270 µs/op, 4 MB/op, 17 allocs | 180 µs/op, 800 KB/op, 1 alloc | 1.5× |

**Vì sao chênh nhỏ ở \`n=100\`?** Vì grow geometric: 0→1→2→4→8→16→32→64→128. Chỉ 7 lần grow cho \`n=100\`. Khi \`n=100000\`, grow ~17 lần và mỗi lần copy lượng data lớn hơn → tích luỹ.

**Quan sát thú vị**: \`allocs/op\` của Naive = log₂(n) + 1, không tỷ lệ với n. Đây là tính chất geometric growth.

### Lời giải BT2

Bug: kết quả \`multiply(i, i+1)\` bị bỏ → compiler có thể inline + eliminate.

Fix:

\`\`\`go
var SinkInt int

func BenchmarkMul(b *testing.B) {
    for i := 0; i < b.N; i++ {
        SinkInt = multiply(i, i+1) // gán vào package var
    }
}
\`\`\`

Sau khi fix, ns/op vẫn rất thấp (~0.5 ns/op) vì \`multiply\` thực sự rất nhanh — nhưng ít nhất bạn biết đó là tốc độ thật, không phải compiler trick.

### Lời giải BT3

\`\`\`go
var httpRE = regexp.MustCompile(\`^https?://[a-z0-9.-]+(:[0-9]+)?(/.*)?$\`)

func MatchHTTPPrecompile(s string) bool { return httpRE.MatchString(s) }
func MatchHTTPRecompile(s string) bool {
    re := regexp.MustCompile(\`^https?://[a-z0-9.-]+(:[0-9]+)?(/.*)?$\`)
    return re.MatchString(s)
}

func BenchmarkRegex(b *testing.B) {
    urls := generateURLs(100)
    b.Run("Pre", func(b *testing.B) {
        b.ReportAllocs(); b.ResetTimer()
        for i := 0; i < b.N; i++ { SinkBool = MatchHTTPPrecompile(urls[i%100]) }
    })
    b.Run("Re", func(b *testing.B) {
        b.ReportAllocs(); b.ResetTimer()
        for i := 0; i < b.N; i++ { SinkBool = MatchHTTPRecompile(urls[i%100]) }
    })
}
\`\`\`

Số đo điển hình: Pre ~300 ns/op (0 allocs), Re ~6000 ns/op (~80 allocs). Speedup 20×.

### Lời giải BT4

\`\`\`go
var bufPool = sync.Pool{New: func() interface{} { return new(bytes.Buffer) }}

func formatPool(items []int) string {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)
    buf.WriteByte('[')
    for i, v := range items {
        if i > 0 { buf.WriteByte(',') }
        buf.WriteString(strconv.Itoa(v))
    }
    buf.WriteByte(']')
    return buf.String()
}
\`\`\`

Số đo: NoPool 250 ns/op / 192 B/op / 2 allocs vs WithPool 200 ns/op / 32 B/op / 1 alloc. Gain nhỏ vì buffer nhỏ — với buffer 8KB+ gain lớn hơn 5-10×.

⚠ Quan trọng: nhớ \`Reset()\` trước \`Put\`, và nhớ \`buf.String()\` đã copy bytes ra string mới (an toàn).

### Lời giải BT5

1. **Foo và Baz** statistically significant (p < 0.001). **Bar không** (p=0.604 > 0.05).
2. **Bar** không có % vì benchstat ẩn khi p ≥ 0.05 — chênh lệch không phân biệt được với noise. \`~\` hàm ý "không đáng kể".
3. **Phụ thuộc context**:
   - Nếu Foo và Baz đều là hot path: chọn cái có **tổng tiết kiệm** lớn hơn = \`Δns × calls_per_second\`. Baz tiết kiệm 20ns/call, Foo tiết kiệm 150ns/call → Foo có lẽ thắng nếu cả 2 cùng tần suất.
   - Nếu Baz được gọi 1000× nhiều hơn Foo: Baz × 20ns × 1000 = 20µs cứu được, Foo × 150ns = 0.15µs → Baz thắng.
   - **Quy tắc**: % chỉ là chỉ báo, ưu tiên dựa trên impact tuyệt đối ở scale production.

### Lời giải BT6

\`\`\`go
func BenchmarkProcess(b *testing.B) {
    b.ReportAllocs()                     // (4) fix
    data := generateData(10000)          // (1) move setup ra ngoài loop
    b.ResetTimer()                       // reset clock sau setup
    for i := 0; i < b.N; i++ {
        result := processData(data)
        SinkBytes, _ = json.Marshal(result) // (2)+(3) gán vào Sink
    }
}
\`\`\`

4 lỗi:

1. \`generateData\` trong loop → setup tính vào benchmark.
2. \`result := ...\` rồi \`processData\` không gán đi đâu → dead-code elimination khả thi (compiler thấy \`result\` chỉ đưa vào \`json.Marshal\` không dùng kết quả).
3. \`json.Marshal\` không lưu kết quả \`[]byte\` → dead-code elimination.
4. Thiếu \`b.ReportAllocs()\` → không thấy alloc.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — các phiên bản naive/optimized.
- [solutions_test.go](./solutions_test.go) — benchmark thật, chạy được:

  \`\`\`
  go test -bench=. -benchmem
  \`\`\`

- [visualization.html](./visualization.html) — 3 module:
  1. **Benchmark output parser** — paste output, parse, hiển thị table; so sánh 2 set.
  2. **Optimization picker** — click vào 1 pattern, xem số before/after.
  3. **Allocation tracker** — visualize geometric growth của \`[]int\` (naive vs pre-alloc).

---

## Bài tiếp theo

- [Lesson 36 — Concurrency Patterns →](../lesson-36-concurrency-patterns/) — worker pool, fan-in/out, pipeline, semaphore, errgroup, singleflight.

## Tham khảo

- [pkg.go.dev/testing — package docs](https://pkg.go.dev/testing#hdr-Benchmarks)
- [Dave Cheney — High Performance Go Workshop](https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html)
- [Russ Cox — Benchmark methodology](https://research.swtch.com/sweet)
- [benchstat tool](https://pkg.go.dev/golang.org/x/perf/cmd/benchstat)
`;
