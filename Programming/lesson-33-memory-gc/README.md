# Lesson 33 — Memory Model, Escape Analysis & Garbage Collection

## Mục tiêu học tập

Sau lesson này bạn sẽ:

- Hiểu rõ **stack vs heap** trong Go: cái nào rẻ, cái nào đắt, ai quyết định.
- Đọc được output `go build -gcflags="-m"` và **dự đoán** một biến sẽ escape lên heap hay không.
- Biết cách Go GC hoạt động: **tri-color mark-and-sweep**, concurrent với mutator.
- Tune `GOGC` và `GOMEMLIMIT` cho từng loại workload (low-latency vs high-throughput).
- Đọc `runtime.MemStats` và `GODEBUG=gctrace=1` để chẩn đoán memory pressure.
- Hiểu **happens-before** trong Go memory model — vì sao goroutine không sync thì không guarantee thứ tự.
- Nhận diện và fix các pattern gây allocation cao: string concat, slice retention, missing pre-allocation.

## Kiến thức tiền đề

- [Lesson 16 — Pointers](../lesson-16-pointers/) — `&x`, `*p`, alias.
- [Lesson 12 — Arrays & Slices](../lesson-12-arrays-slices/) — slice header, underlying array, `cap`.
- [Lesson 14 — Strings & Runes](../lesson-14-strings-runes-utf8/) — string immutable, `[]byte ↔ string` copy.
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — happens-before xuất hiện ở đây.
- [Lesson 28 — Sync Primitives](../lesson-28-sync-primitives/) — Mutex Lock/Unlock = sync point.

---

## 1. Stack vs Heap — hai loại memory, hai chi phí

> 💡 **Trực giác / Hình dung**
>
> Tưởng tượng bạn đi siêu thị. **Stack** là cái giỏ bạn cầm trên tay: nhỏ, nhanh, vào ra theo thứ tự, hết bài là vứt sạch. **Heap** là cái kho hàng phía sau: to vô tận, ai cũng dùng được, nhưng phải có nhân viên dọn dẹp (GC) đi quanh kiểm tra "cái này còn ai dùng không?" rồi mới được vứt.

### 1.1 Stack — rẻ, tự dọn

Mỗi goroutine có 1 stack riêng (khởi đầu 2KB ở Go 1.4+, tự grow). Khi gọi function:

1. Push frame (parameter + local var + return address).
2. Function chạy.
3. Function return → **pop nguyên frame** trong 1 lệnh `ADD SP, n`.

Chi phí allocate trên stack: **gần như 0** — chỉ là tăng/giảm stack pointer.

```go
func add(a, b int) int {
    x := a + b   // x sống trên stack
    return x     // copy giá trị về caller, x bị "pop" lúc return
}
```

### 1.2 Heap — to, persistent, có GC

Heap là vùng nhớ chung. Khi cần object **sống lâu hơn function** đã tạo nó (vd return pointer ra ngoài), compiler buộc phải đặt nó trên heap.

Chi phí:

- **Allocate**: gọi runtime allocator (`mallocgc`) — vài chục ns + có thể trigger GC.
- **Reclaim**: GC scan toàn heap để xác định cái nào còn reachable.

Số liệu thực (laptop x86_64, Go 1.22):

| Hoạt động | Thời gian |
|-----------|-----------|
| Push 1 int lên stack | ~0.3 ns |
| `new(int)` trên heap | ~12 ns |
| GC mark 1MB heap | ~1 ms |

→ Heap **đắt hơn stack ~40 lần** cho mỗi alloc, chưa kể GC overhead. Đây là lý do escape analysis quan trọng.

> ❓ **Câu hỏi tự nhiên**
>
> - *"Lập trình viên có chọn được stack hay heap không?"* → **Không trực tiếp**. Bạn viết `x := 10` hay `p := &x`, **compiler tự quyết** dựa trên escape analysis. Bạn chỉ ảnh hưởng gián tiếp bằng cách viết code "không cho pointer thoát ra".
> - *"Stack có chạy out-of-memory không?"* → Có. Default stack mỗi goroutine có thể grow tới ~1GB. Hết → panic `runtime: goroutine stack exceeds 1000000000-byte limit`. Thường xảy ra với đệ quy không có base case.

> 📝 **Tóm tắt mục 1**
>
> - Stack: rẻ, scope-bound, tự pop khi function return.
> - Heap: GC quản lý, persistent, allocate đắt hơn ~40×.
> - Compiler — không phải bạn — quyết định biến nào ở đâu.

---

## 2. Escape analysis — cơ chế compiler chọn stack vs heap

> 💡 **Trực giác / Hình dung**
>
> Compiler hỏi mỗi biến một câu duy nhất: *"Sau khi function này return, có ai còn cầm pointer tới mày không?"* Nếu có → **mày phải lên heap**, vì stack frame đã bị xóa. Nếu không → ở lại stack.

Đây gọi là **escape analysis**: compile-time check trace mọi pointer xem nó có "thoát" khỏi scope không.

### 2.1 Bật debug flag để xem decisions

```bash
go build -gcflags="-m" ./...
# Verbose hơn:
go build -gcflags="-m -m" ./...
```

Output mẫu:

```
./main.go:10:6: can inline foo
./main.go:15:9: &x escapes to heap
./main.go:15:9: moved to heap: x
./main.go:20:6: y does not escape
```

> ❓ **Câu hỏi tự nhiên**
>
> - *"Tại sao output nhiều dòng `does not escape` thế?"* → Compiler in cả những case nó **đã kiểm tra** và xác định **không escape**. Tin tốt: thấy "does not escape" = stack, free.
> - *"Có khi nào compiler đoán sai (false positive escape) không?"* → Có. Escape analysis là conservative — khi không chắc, nó đẩy lên heap cho **an toàn**. Nghĩa là code thực tế có thể có alloc thừa so với lý tưởng. Vd qua interface (xem mục 3.3).

### 2.2 6 quy luật chính

| Pattern | Escape? | Lý do |
|---------|:-------:|-------|
| `x := 10; return x` | Không | Copy by value |
| `x := T{}; return &x` | **Có** | Return pointer → x phải sống ngoài frame |
| `s := []int{1,2,3}` cấp phát literal nhỏ | Tuỳ | Compiler có thể giữ stack nếu không escape |
| `m := map[string]int{}` | **Thường có** | Map header sống trên heap |
| `var i any = 5` | **Có** | Boxing — interface giấu type, runtime cần addressable storage |
| Closure capture `&x` từ outer | **Có** | Closure có thể sống lâu hơn outer scope |

> 📝 **Tóm tắt mục 2**
>
> - Escape analysis = compile-time check "pointer có thoát ra không".
> - Bật bằng `-gcflags="-m"`.
> - Mặc định conservative: nghi ngờ → đẩy lên heap.

---

## 3. Khi nào biến escape — 6 case kèm `-gcflags="-m"`

### 3.1 Case A — Return pointer to local

```go
func newInt() *int {
    x := 42
    return &x   // x escape: caller cầm pointer tới x
}
```

**Predict**: x escape. **Verify**:

```
./main.go:3:2: moved to heap: x
```

→ Đúng. `x` được `mallocgc` trên heap, `return` trả pointer.

### 3.2 Case B — Store pointer vào struct field

```go
type Box struct{ p *int }

func fill(b *Box) {
    x := 10
    b.p = &x   // x escape qua b
}
```

**Predict**: x escape. Compiler không biết `*Box` đi đâu sau function return → an toàn nhất là đặt x lên heap.

```
./main.go:6:2: moved to heap: x
```

### 3.3 Case C — Pass vào interface

```go
func main() {
    x := 42
    fmt.Println(x)   // x escape!
}
```

**Tại sao**? `fmt.Println` nhận `...any`. Để convert `int` → `any`, runtime phải **box** giá trị: alloc 1 word trên heap chứa value, slot interface trỏ tới đó.

```
./main.go:3:13: ... argument does not escape
./main.go:3:13: x escapes to heap
```

→ Đây là **lý do `fmt.Println(x)` luôn allocate**, ngay cả với primitive. Trong hot path, đổi sang `os.Stdout.Write([]byte(strconv.Itoa(x)))` để tránh.

### 3.4 Case D — Closure capture by reference

```go
func counter() func() int {
    n := 0
    return func() int {
        n++       // n bị capture, escape
        return n
    }
}
```

**Predict**: n escape. Closure được return, còn cần n sống → n phải lên heap.

```
./main.go:2:2: moved to heap: n
./main.go:3:9: func literal escapes to heap
```

### 3.5 Case E — Slice grow uncertain size

```go
func dyn(n int) []int {
    s := make([]int, n)   // n không phải hằng → heap
    return s
}
```

Vì compiler không biết `n` lúc compile-time → phải alloc dynamic.

```
./main.go:2:11: make([]int, n) escapes to heap
```

Nhưng nếu `make([]int, 10)` (n hằng nhỏ) **và** slice không escape:

```go
func sum() int {
    s := make([]int, 10)   // có thể giữ trên stack
    for i := range s { s[i] = i }
    total := 0
    for _, v := range s { total += v }
    return total
}
```

```
./main.go:2:11: make([]int, 10) does not escape
```

### 3.6 Case F — Pass pointer xuống, KHÔNG store

```go
func process(p *int) int {
    return *p * 2
}

func main() {
    x := 5
    _ = process(&x)   // x KHÔNG escape!
}
```

**Predict**: x không escape. `process` chỉ đọc `*p`, không store pointer đi đâu. Compiler trace được nên giữ x trên stack.

```
./main.go:7:14: ... argument does not escape
```

> ⚠ **Lỗi thường gặp**
>
> Tưởng "dùng `*int` là phải heap". **Sai**. Pointer **per se** không trigger heap; chỉ khi pointer **thoát khỏi scope** thì biến nó trỏ tới mới escape. Pass pointer xuống deeper function thường safe.

> 🔁 **Dừng lại tự kiểm tra**
>
> Đoán xem các case sau escape không, rồi verify bằng `-gcflags="-m"`:
>
> ```go
> // (1)
> func a() *int { x := 1; return &x }
> // (2)
> func b() int { x := 1; p := &x; return *p }
> // (3)
> func c(s []byte) { fmt.Println(string(s)) }
> ```
>
> <details>
> <summary>Đáp án</summary>
>
> 1. x **escape** (return &x).
> 2. x **không escape** (p không thoát ra).
> 3. s **escape** vì `string(s)` tạo copy + `fmt.Println` box thành `any`.
> </details>

> 📝 **Tóm tắt mục 3**
>
> - Pointer được store ngoài scope → escape.
> - Interface boxing → escape (case của fmt.Println).
> - Closure capture → escape.
> - Pass pointer xuống nhưng không store → KHÔNG escape.

---

## 4. Go GC — Tri-color Mark-and-Sweep

> 💡 **Trực giác / Hình dung**
>
> Bạn có 1 phòng chứa đồ. Bạn muốn vứt đồ "không ai dùng". Cách làm: dán nhãn **trắng** lên tất cả đồ. Đứng ở cửa (root) — đồ nào tay bạn chạm tới = dán **xám** (đang xét). Tiếp tục mở mỗi đồ xám, mọi thứ trong đó cũng dán xám, xong dán **đen** cho đồ đã mở xong. Cuối cùng: **mọi thứ còn trắng = vứt**.

### 4.1 3 màu

| Màu | Ý nghĩa |
|-----|---------|
| **White** | Chưa được thăm. Cuối phase = garbage. |
| **Grey** | Đã thăm nhưng chưa duyệt các child. Trong worklist. |
| **Black** | Đã thăm + tất cả child đã được mark. An toàn. |

### 4.2 Mark phase (concurrent)

1. **Start**: tất cả object = white. Roots (stack frame, global) push vào worklist = grey.
2. **Loop**: lấy 1 grey object, scan các pointer trong nó, mỗi pointer đích → mark grey (nếu đang white). Object hiện tại → mark black.
3. **End**: worklist rỗng → mọi reachable đã black. Còn lại white = garbage.

Mark chạy **đồng thời với mutator** (code chính). Có **write barrier** intercept mỗi lần write pointer để đảm bảo không lose object: nếu mutator gán `black.p = white_obj`, write barrier mark `white_obj` grey để GC không bỏ sót.

### 4.3 Sweep phase

Đi qua heap, free mọi object còn white. Cũng concurrent — alloc next sẽ tự skip những region đang sweep.

> ❓ **Câu hỏi tự nhiên**
>
> - *"GC có stop-the-world không?"* → Có, nhưng **rất ngắn**. Go 1.5+ STW chỉ < 1ms cho 2 pha: start mark + end mark. Phase mark + sweep main đều concurrent.
> - *"GC chạy parallel hay serial?"* → Parallel. Mặc định dùng `GOMAXPROCS / 4` worker (nhưng ≥ 1). Tune qua `GOGC` không trực tiếp đổi số worker.

> 📝 **Tóm tắt mục 4**
>
> - Tri-color: white/grey/black.
> - Mark từ root, propagate qua pointer.
> - Sweep free white.
> - Write barrier giúp GC concurrent an toàn.

---

## 5. GC pacing — GOGC & GOMEMLIMIT

### 5.1 GOGC — % heap growth trigger

`GOGC=100` (default): GC trigger khi heap đạt **2× live heap** sau lần GC trước.

Công thức: `next_GC_target = heap_live × (1 + GOGC/100)`

- `GOGC=100` → next at 2× live.
- `GOGC=50` → next at 1.5× live (GC nhiều hơn, heap nhỏ).
- `GOGC=200` → next at 3× live (GC ít hơn, heap to).
- `GOGC=off` → tắt GC. **Cẩn thận!** Chỉ dùng cho benchmark ngắn.

Ví dụ số: live heap = 100MB.

| GOGC | next_GC | Số GC/giây | Pause/lần | Peak heap |
|------|---------|------------|-----------|-----------|
| 50 | 150MB | nhiều | ngắn | 150MB |
| 100 | 200MB | trung bình | trung bình | 200MB |
| 200 | 300MB | ít | dài | 300MB |
| 400 | 500MB | rất ít | rất dài | 500MB |

### 5.2 GOMEMLIMIT (Go 1.19+)

`GOGC` chỉ điều khiển theo **tỷ lệ**. Nếu live heap đột ngột grow, GOGC vẫn cho phép heap × 2 → có thể OOM container.

`GOMEMLIMIT=8GiB` đặt **soft cap**: khi tổng memory gần limit, runtime **tăng tần suất GC** dù chưa đạt GOGC threshold.

```bash
GOMEMLIMIT=2GiB GOGC=100 ./myapp
```

> ❓ **Câu hỏi tự nhiên**
>
> - *"Soft cap" nghĩa là gì?* → GC sẽ chạy aggressive khi gần limit, nhưng nếu live heap thật sự > limit thì vẫn alloc tiếp (chỉ tốn nhiều CPU cho GC). Hard cap chỉ có OS/container ép.
> - *"GOGC và GOMEMLIMIT dùng cùng được không?"* → Được. Best practice cho production: đặt cả 2. GOGC=100, GOMEMLIMIT = ~70% container memory.

> 📝 **Tóm tắt mục 5**
>
> - GOGC = % growth → trigger.
> - GOGC thấp = ít heap, CPU GC nhiều.
> - GOMEMLIMIT = soft cap, ép GC khi gần limit.

---

## 6. GC metrics — đo gì, đo bằng gì

### 6.1 `runtime.ReadMemStats`

```go
var m runtime.MemStats
runtime.ReadMemStats(&m)
fmt.Printf("Alloc=%d KB, TotalAlloc=%d KB, Sys=%d KB, NumGC=%d, PauseTotalNs=%d\n",
    m.Alloc/1024, m.TotalAlloc/1024, m.Sys/1024, m.NumGC, m.PauseTotalNs)
```

| Field | Ý nghĩa |
|-------|---------|
| `Alloc` | Live heap hiện tại (byte) |
| `TotalAlloc` | Tổng đã alloc từ start (chỉ tăng) |
| `Sys` | Memory OS đã cấp cho process |
| `NumGC` | Số lần GC đã chạy |
| `PauseTotalNs` | Tổng thời gian STW (ns) |
| `HeapInuse` | Heap span đang dùng |
| `HeapIdle` | Heap span chưa dùng (chưa trả OS) |

⚠ `ReadMemStats` gọi **STW**. Đừng gọi trong hot path — chỉ dùng cho monitoring với chu kỳ vừa phải (vd 1 lần / phút).

### 6.2 `GODEBUG=gctrace=1`

```bash
GODEBUG=gctrace=1 ./myapp
```

Mỗi GC in ra:

```
gc 7 @0.234s 0%: 0.018+1.2+0.024 ms clock, 0.072+0.45/0.83/2.1+0.097 ms cpu, 16->16->8 MB, 17 MB goal, 4 P
```

Giải mã:
- `gc 7` — lần GC thứ 7.
- `@0.234s` — kể từ start.
- `0%` — % time spent in GC.
- `0.018+1.2+0.024 ms` — STW sweep termination + concurrent mark + STW mark termination.
- `16->16->8 MB` — heap trước GC → sau GC → live heap.
- `17 MB goal` — target.

> 📝 **Tóm tắt mục 6**
>
> - `ReadMemStats` cho snapshot programmatic.
> - `gctrace=1` cho realtime log.
> - Theo dõi `NumGC`, `PauseTotalNs`, `HeapInuse` để chẩn đoán.

---

## 7. Memory Model — Happens-before

> 💡 **Trực giác / Hình dung**
>
> Hai goroutine = hai người làm việc song song trong 2 phòng kín. **Họ không biết người kia làm gì** trừ khi có "ai đó" mang giấy tờ qua lại — đó là channel / mutex / atomic. Không có sync = không có guarantee về thứ tự.

### 7.1 Định nghĩa happens-before

`A happens-before B` nếu: kết quả của A **chắc chắn được B nhìn thấy**. Đây là điều kiện duy nhất để code multi-goroutine đúng.

### 7.2 Trong cùng 1 goroutine

Mọi statement happens-before statement tiếp theo theo thứ tự code. Đơn giản.

### 7.3 Giữa các goroutine — cần sync point

**Channel send/receive**:

```go
var x int
ch := make(chan int)

go func() {
    x = 42        // (A)
    ch <- 1       // (B) send
}()

<-ch              // (C) receive
fmt.Println(x)    // (D) — GUARANTEED thấy 42
```

(A) happens-before (B) (cùng goroutine). (B) happens-before (C) (channel sync). (C) happens-before (D). Transitive: (A) happens-before (D) → đọc x **chắc chắn = 42**.

**Mutex Lock/Unlock**:

```go
var mu sync.Mutex
var x int

go func() {
    mu.Lock()
    x = 42
    mu.Unlock()    // sync point
}()

mu.Lock()
fmt.Println(x)    // có thể là 0 hoặc 42, nhưng nếu printed sau goroutine kia thì là 42
mu.Unlock()
```

`Unlock` happens-before next `Lock` cùng mutex.

**Atomic**:

```go
var ready atomic.Bool
var data int

go func() {
    data = 42
    ready.Store(true)
}()

for !ready.Load() {}
fmt.Println(data)  // GUARANTEED 42
```

### 7.4 KHÔNG có happens-before → data race

```go
var x int
go func() { x = 1 }()
fmt.Println(x)    // có thể là 0, 1, hoặc undefined. Data race!
```

Build với `-race`:

```bash
go run -race main.go
```

Sẽ detect race ngay.

> ⚠ **Lỗi thường gặp**
>
> Dùng `time.Sleep` để "đảm bảo goroutine xong". **Sai**. Sleep không phải sync point — chỉ tăng xác suất, không đảm bảo.

> 📝 **Tóm tắt mục 7**
>
> - Sync point: channel send/receive, mutex Lock/Unlock, atomic, `WaitGroup.Wait`.
> - Không có sync = data race = undefined.
> - `go run -race` là bạn.

---

## 8. Pattern ảnh hưởng memory & cách giảm allocation

### 8.1 String concat O(n²)

```go
// BAD: mỗi += tạo string mới (string immutable)
s := ""
for i := 0; i < 10000; i++ {
    s += "x"   // alloc string mới length i+1, copy i char cũ
}
// Total alloc: 1+2+...+10000 = ~50 triệu byte!
```

**Fix**: `strings.Builder`.

```go
var b strings.Builder
b.Grow(10000)              // pre-allocate
for i := 0; i < 10000; i++ {
    b.WriteByte('x')
}
s := b.String()            // 1 alloc cuối
```

Số liệu thực: 10000 iter, concat = ~50ms / 50MB alloc; Builder = ~50μs / 16KB alloc. **1000× nhanh hơn**.

### 8.2 `[]byte → string` copy

```go
b := []byte{'h', 'i'}
s := string(b)   // COPY! string immutable, không share với b
```

Mỗi lần convert = alloc + copy. Tránh trong hot path:

```go
// Nếu chỉ cần dùng string làm map key:
m[string(b)] = true   // compiler có optimization, không copy
```

### 8.3 Map auto-grow

Map mặc định cap 0. Mỗi lần grow = re-hash toàn bộ entries → expensive.

```go
// BAD:
m := map[string]int{}
for _, x := range items {     // 1M items
    m[x] = 0                  // grow 20+ lần
}

// GOOD:
m := make(map[string]int, len(items))   // pre-size, không grow
```

### 8.4 Slice append re-allocate

```go
var s []int
for i := 0; i < 1000; i++ {
    s = append(s, i)   // grow nhiều lần
}

// GOOD:
s := make([]int, 0, 1000)
for i := 0; i < 1000; i++ {
    s = append(s, i)   // không grow
}
```

### 8.5 sync.Pool — reuse buffer

```go
var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

func handle() {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf)
    }()
    // ... dùng buf
}
```

Phù hợp cho object lớn dùng tạm thời trong handler (HTTP, RPC).

> ⚠ **Lỗi thường gặp**
>
> Pool **không guarantee** giữ object. GC có thể clear pool bất cứ lúc nào. Đừng dùng pool làm cache — chỉ dùng để giảm alloc tạm.

> 📝 **Tóm tắt mục 8**
>
> - Pre-allocate slice/map → tiết kiệm grow.
> - `strings.Builder` cho concat.
> - `sync.Pool` cho buffer reusable.
> - Tránh `[]byte ↔ string` chuyển đổi nhiều.

---

## 9. `runtime.GC()` — manual trigger

```go
runtime.GC()   // block until GC complete
```

Cases dùng đúng:

- **Benchmark**: ổn định state trước khi đo.
- **Test memory leak**: chạy GC nhiều lần, đo Alloc — nếu vẫn tăng → leak.

Cases sai (đừng làm trong production):

- "Free memory về OS" — Go runtime tự điều phối, gọi GC tay không help.
- "Giảm latency" — gọi GC ép STW, **tăng** latency.

```go
// Pattern test leak:
runtime.GC()
var m1 runtime.MemStats
runtime.ReadMemStats(&m1)
suspect()                     // gọi 1000 lần
runtime.GC()
var m2 runtime.MemStats
runtime.ReadMemStats(&m2)
if m2.Alloc > m1.Alloc * 2 {
    t.Errorf("leak detected: %d → %d", m1.Alloc, m2.Alloc)
}
```

---

## 10. Latency vs Throughput trade-off

| Tuning | Latency (per request) | Throughput (req/sec) | CPU |
|--------|:---:|:---:|:---:|
| `GOGC=50` | **Tốt** (short pause) | Kém | Cao (GC nhiều) |
| `GOGC=100` | OK | OK | OK |
| `GOGC=200` | Kém | **Tốt** | Thấp |
| `GOGC=off` | Worst (eventual OOM) | Best (ngắn hạn) | Thấp nhất |

Quy tắc thực dụng:

- **Web server (low p99 latency)**: GOGC=50–100 + GOMEMLIMIT.
- **Batch job (throughput)**: GOGC=200–400.
- **CLI ngắn (vài giây)**: GOGC=off — process exit trước khi cần dọn dẹp.

---

## 11. Common pitfalls

### 11.1 Goroutine leak → memory leak

```go
// BAD:
func tail(in <-chan int) {
    go func() {
        for v := range in {   // nếu in không close, goroutine sống forever
            log(v)
        }
    }()
}
```

Mỗi goroutine giữ stack (≥2KB) + closed-over var. Leak 100k goroutine = 200MB+ leak.

**Fix**: dùng `context` để cancel (xem [L29](../lesson-29-context-cancellation/)).

### 11.2 Slice retention bug

```go
func first10(s []int) []int {
    return s[:10]   // s[:10] giữ reference đến underlying array của s!
}

big := loadHugeData()      // 1GB
small := first10(big)
big = nil                   // KHÔNG GIẢI PHÓNG! small vẫn giữ underlying.
```

**Fix**: copy explicit.

```go
func first10(s []int) []int {
    out := make([]int, 10)
    copy(out, s[:10])
    return out
}
```

### 11.3 Map không bao giờ shrink

```go
m := make(map[int]int)
for i := 0; i < 1_000_000; i++ {
    m[i] = i
}
for i := 0; i < 1_000_000; i++ {
    delete(m, i)   // m vẫn giữ ~16MB buckets!
}
```

**Fix**: thay vì delete all, tạo map mới: `m = make(map[int]int)`.

### 11.4 Time.Ticker không Stop → leak

```go
ticker := time.NewTicker(1 * time.Second)
for range ticker.C {
    // ...
    if condition { return }   // BAD: ticker không stop, goroutine internal vẫn chạy
}

// FIX:
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()
```

> ⚠ **Lỗi thường gặp**
>
> Tưởng `time.After` an toàn trong loop. **Sai** — mỗi iteration tạo Timer mới, không GC được cho tới timeout. Dùng `time.NewTimer` + Reset.

> 📝 **Tóm tắt mục 11**
>
> - Goroutine không exit → stack + closure leak.
> - Slice giữ underlying array → "small" slice giữ "big" memory.
> - Map không shrink — phải re-create.
> - Mọi resource có Stop/Close phải defer.

---

## Bài tập

### BT1 — Predict escape của 6 function

Cho 6 function dưới đây. Đoán xem mỗi biến nào escape, rồi verify bằng `go build -gcflags="-m"`.

```go
package main

import "fmt"

type Point struct{ X, Y int }

// (1)
func f1() Point {
    p := Point{1, 2}
    return p
}

// (2)
func f2() *Point {
    p := Point{1, 2}
    return &p
}

// (3)
func f3(p *Point) {
    p.X = 10
}

// (4)
func f4() {
    p := Point{1, 2}
    fmt.Println(p)
}

// (5)
func f5() []int {
    return make([]int, 100)
}

// (6)
func f6(n int) {
    s := make([]int, n)
    _ = s
}
```

### BT2 — Refactor string concat O(n²) → O(n)

Hàm dưới chạy O(n²) do string immutable. Refactor về `strings.Builder` và benchmark cả 2.

```go
func badConcat(words []string) string {
    s := ""
    for _, w := range words {
        s += w + " "
    }
    return s
}
```

### BT3 — Slice retention bug

```go
func first10(s []int) []int {
    return s[:10]
}
```

Vì sao function trên giữ memory? Sửa lại để chỉ giữ đúng 10 phần tử.

### BT4 — Tune GOGC

Cho program alloc nhiều object tạm. Chạy với `GOGC=50, 100, 200, 400` và đo:
- Tổng thời gian
- `NumGC`
- `PauseTotalNs`

Báo cáo trade-off.

### BT5 — Goroutine leak từ pprof

Mock data pprof goroutine profile cho thấy 10000 goroutine cùng stuck ở `chan receive`. Code mẫu là gì? Sửa.

### BT6 — Pre-allocate slice

Đo allocation khác biệt giữa:

```go
// A
var s []int
for i := 0; i < 1_000_000; i++ { s = append(s, i) }

// B
s := make([]int, 0, 1_000_000)
for i := 0; i < 1_000_000; i++ { s = append(s, i) }
```

---

## Lời giải chi tiết

### BT1 — Predict escape

| Func | Biến | Escape? | Lý do |
|------|------|:---:|------|
| f1 | p | Không | Return by value, copy ra caller |
| f2 | p | **Có** | Return `&p` → caller giữ pointer |
| f3 | p (param) | Không | Chỉ dereference, không store |
| f4 | p | **Có** | `fmt.Println` nhận `any` → boxing |
| f5 | slice | **Có** | Return slice → caller giữ |
| f6 (n const) | slice | Không | n hằng nhỏ + không escape |
| f6 (n biến) | slice | **Có** | n không biết compile-time |

Verify:
```bash
go build -gcflags="-m" ./bt1.go
```

Output (rút gọn):
```
./bt1.go:9:2: moved to heap: p           # f2
./bt1.go:14:2: p does not escape          # f3
./bt1.go:19:13: ... argument escapes      # f4 fmt.Println
./bt1.go:19:2: moved to heap: p           # f4
./bt1.go:23:13: make([]int, 100) escapes  # f5
./bt1.go:28:12: make([]int, n) escapes    # f6
```

### BT2 — Refactor + benchmark

```go
func goodConcat(words []string) string {
    var b strings.Builder
    // Tính trước total length để Grow đúng
    total := 0
    for _, w := range words { total += len(w) + 1 }
    b.Grow(total)
    for _, w := range words {
        b.WriteString(w)
        b.WriteByte(' ')
    }
    return b.String()
}
```

Benchmark (10000 word, mỗi 5 char):

| Implementation | Time | Allocs | Bytes |
|----------------|------|--------|-------|
| `badConcat` (+=) | ~80 ms | 10000 | ~250 MB |
| `goodConcat` (Builder) | ~50 μs | 1 | 60 KB |

**~1600× nhanh hơn, 4000× ít memory hơn**.

### BT3 — Slice retention fix

```go
// BAD: giữ ref đến underlying array của s
func first10(s []int) []int {
    return s[:10]
}

// GOOD: copy ra slice mới có underlying riêng
func first10Fix(s []int) []int {
    out := make([]int, 10)
    copy(out, s[:10])
    return out
}
```

Demo:

```go
big := make([]int, 1_000_000)
small := first10(big)
big = nil
runtime.GC()
// runtime.ReadMemStats → vẫn ~8MB cho big array, vì small giữ.

big2 := make([]int, 1_000_000)
small2 := first10Fix(big2)
big2 = nil
runtime.GC()
// runtime.ReadMemStats → big2 free, chỉ giữ ~80B cho small2.
```

### BT4 — GOGC tuning

Program: alloc 1M slice 1KB mỗi cái, dropping.

```bash
for v in 50 100 200 400; do
    GOGC=$v GODEBUG=gctrace=1 ./gctest 2>&1 | tail -5
done
```

Kết quả tham khảo (mock):

| GOGC | NumGC | PauseTotalNs | Total time |
|------|-------|--------------|------------|
| 50   | 80    | 12 ms        | 1.2 s      |
| 100  | 40    | 8 ms         | 1.1 s      |
| 200  | 20    | 9 ms         | 1.0 s      |
| 400  | 10    | 15 ms        | 1.05 s     |

**Trade-off**:
- GOGC=50: nhiều GC, pause/lần ngắn, **latency tốt** nhưng CPU tốn.
- GOGC=400: ít GC, pause/lần dài, heap to, **throughput tốt** nhưng peak memory cao.

### BT5 — Goroutine leak

Pattern điển hình từ pprof:

```
goroutine profile: total 10003
10000 @ 0x...
#       runtime.gopark
#       runtime.chanrecv
#       main.worker (worker.go:24)
```

Code gây leak:

```go
func dispatch(in <-chan Job, results chan<- Result) {
    for job := range in {
        go func(j Job) {
            r := process(j)
            results <- r       // BLOCK nếu results không có reader
        }(job)
    }
}
```

Nếu reader đọc `results` chậm hơn producer → mỗi goroutine block ở `results <- r` forever.

**Fix**:

```go
func dispatch(ctx context.Context, in <-chan Job, results chan<- Result) {
    for job := range in {
        go func(j Job) {
            r := process(j)
            select {
            case results <- r:
            case <-ctx.Done():
                return       // exit khi shutdown
            }
        }(job)
    }
}
```

Hoặc dùng worker pool size cố định thay vì spawn unbounded.

### BT6 — Pre-allocate measurement

```go
func benchA() {
    var s []int
    for i := 0; i < 1_000_000; i++ { s = append(s, i) }
}

func benchB() {
    s := make([]int, 0, 1_000_000)
    for i := 0; i < 1_000_000; i++ { s = append(s, i) }
}
```

Kết quả `go test -bench -benchmem`:

| Func | Time | Allocs | Bytes |
|------|------|--------|-------|
| benchA | ~3 ms | ~30 | ~16 MB (cộng dồn từ các lần grow) |
| benchB | ~1.5 ms | 1 | 8 MB |

**Vì sao 30 alloc?** `append` grow theo công thức ~2× → cần ~ceil(log₂(1M)) ≈ 20 lần grow, mỗi lần alloc array mới + copy. Pre-allocate triệt tiêu hết.

---

## Code & Minh họa

- [`solutions.go`](./solutions.go) — 6 escape examples + `ReadMemStats` demo + concat benchmark + slice retention fix + `sync.Pool` buffer.
- [`visualization.html`](./visualization.html) — 3 module: Escape playground, Tri-color GC visualizer, GOGC tuner.

Để xem escape decisions trên solutions.go:

```bash
cd Programming/lesson-33-memory-gc/
go build -gcflags="-m" ./solutions.go 2>&1 | head -40
```

---

## Bài tiếp theo

→ [Lesson 34 — Profiling & Performance](../lesson-34-profiling/) — pprof CPU/heap/goroutine, flame graph, benchmark optimization, áp dụng kiến thức từ L33 để debug bottleneck.

---

## Tham khảo

- Go memory model: <https://go.dev/ref/mem>
- GC guide: <https://go.dev/doc/gc-guide>
- Effective Go — Allocation: <https://go.dev/doc/effective_go#allocation>
- `runtime` package: <https://pkg.go.dev/runtime>
- Dmitry Vyukov's notes on Go GC: <https://github.com/golang/go/wiki/Performance>
