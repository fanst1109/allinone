# Lesson 28 — Sync Primitives (`sync` & `sync/atomic`)

> Tier 2 · Go Intermediate · Phụ thuộc: [L27 — Goroutine & Channel](../lesson-27-goroutines-channels/)

## Mục tiêu học

Sau lesson này bạn sẽ:

- Hiểu **khi nào dùng `sync`** thay vì channel — và ngược lại.
- Dùng `sync.Mutex`, `sync.RWMutex` để **protect shared state** an toàn.
- Dùng `sync.WaitGroup` để đợi N goroutine kết thúc — pattern chuẩn fan-out/fan-in.
- Dùng `sync.Once` cho lazy init singleton (kết nối DB, load config).
- Phân biệt `sync.Map` (concurrent map) và `sync.Pool` (object pool) — biết khi nào dùng và khi nào KHÔNG.
- Dùng `sync/atomic` cho counter performance-critical, lock-free pattern.
- Nhận diện và sửa **race condition** với `go run -race`.
- Tránh **deadlock** và các pitfall hay gặp (copy mutex, forget unlock, `wg.Add` sai chỗ).

## Kiến thức tiền đề

- [Lesson 27 — Goroutine & Channel](../lesson-27-goroutines-channels/) — đã biết `go`, channel, select.
- [Lesson 15 — Struct & Method](../lesson-15-struct-method/) — quen với `func (s *Struct) Method()`.
- [Lesson 16 — Pointer](../lesson-16-pointers/) — hiểu pass-by-value vs pass-by-pointer.

---

## 1. Khi nào dùng `sync`, khi nào dùng channel?

Slogan nổi tiếng của Go: **"Don't communicate by sharing memory; share memory by communicating."** Câu này khuyến khích dùng channel. Nhưng cũng có câu trả lời chính thức từ team Go (Rob Pike, sync package docs):

> *"The values inside `sync` and `sync/atomic` packages should be used in low-level libraries. Higher-level synchronization is better done via channels and communication."*

Và **Andrew Gerrand**: *"Don't be afraid to use sync."*

Thực tế trong codebase Go production lớn (Kubernetes, etcd, Prometheus), `sync.Mutex` xuất hiện **nhiều hơn** channel khi cần protect một biến nhỏ. Lý do: nhanh hơn, đơn giản hơn, ít overhead hơn.

### Quy tắc thực dụng

| Tình huống | Công cụ nên dùng | Vì sao |
|---|---|---|
| Protect 1 biến/struct nhỏ (counter, map, cache) | **`sync.Mutex` / `sync.RWMutex`** | Channel cho 1 biến = over-engineering |
| Đếm số request, tăng metric counter | **`sync/atomic`** | Lock-free, ~10× nhanh hơn mutex |
| Coordinate nhiều goroutine (pipeline, worker pool) | **Channel** | Channel mô tả flow tốt hơn |
| Đợi N goroutine xong | **`sync.WaitGroup`** | Idiom chuẩn — channel cũng được nhưng dài dòng |
| Chạy đúng 1 lần (init singleton) | **`sync.Once`** | Không có pattern channel nào gọn bằng |
| Tín hiệu broadcast 1 sự kiện cho nhiều goroutine | **Channel close** | `close(ch)` unblock tất cả `<-ch` |

> **💡 Trực giác.** Mutex giống *"khóa cửa phòng — chỉ 1 người vào lúc"*. Channel giống *"hệ thống băng chuyền — tôi đặt việc lên băng chuyền, anh kia nhặt lên làm"*. Hai mô hình giải quyết hai loại vấn đề khác nhau.

> **❓ Mutex chậm hơn channel không?**
> Ngược lại. `sync.Mutex` là wrapper mỏng quanh atomic CAS + futex syscall. Channel dùng cả mutex + queue + scheduling. Benchmark: increment counter 1M lần, `atomic.AddInt64` ~5ns/op, `sync.Mutex` ~15ns/op, channel send/recv ~150ns/op. Cho protect state nhỏ, channel chậm hơn 10-30×.

---

## 2. `sync.Mutex` — Mutual Exclusion

`sync.Mutex` đảm bảo **tại 1 thời điểm chỉ 1 goroutine vào được vùng được lock**. Có đúng 2 method:

```go
mu.Lock()    // chiếm khóa — block nếu đã có người giữ
mu.Unlock()  // trả khóa
```

### Ví dụ: counter chia sẻ

```go
type Counter struct {
    mu sync.Mutex
    n  int
}

func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.n++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.n
}
```

> **⚠ Pattern bắt buộc: `defer mu.Unlock()` NGAY SAU `mu.Lock()`.**
> Nếu function `panic` hoặc có nhiều `return` ở giữa, `defer` đảm bảo Unlock luôn chạy. Quên `Unlock` → goroutine sau gặp lock này **block mãi mãi**. Đây là lỗi #1 hay gặp với mutex.

### Vì sao cả `Value()` cũng phải lock?

Nếu không lock đọc, hai vấn đề:

1. **Data race** — Go memory model không đảm bảo read sees a "consistent" int khi có write concurrent. Trên 32-bit platform, đọc int64 có thể thấy nửa cũ + nửa mới.
2. **Visibility** — không có sync point, goroutine A có thể không bao giờ thấy update của B (cache CPU không flush).

> **💡 Quy tắc vàng**: nếu state được **một goroutine** write và **goroutine khác** read, **CẢ HAI** đều cần sync (lock hoặc atomic).

### Pattern: wrap struct với Mutex

```go
type SafeMap struct {
    mu sync.Mutex
    m  map[string]int
}

func NewSafeMap() *SafeMap {
    return &SafeMap{m: make(map[string]int)}
}

func (s *SafeMap) Set(k string, v int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.m[k] = v
}

func (s *SafeMap) Get(k string) (int, bool) {
    s.mu.Lock()
    defer s.mu.Unlock()
    v, ok := s.m[k]
    return v, ok
}
```

> **❓ Vì sao `mu` đặt CẠNH field nó protect?**
> Quy ước Go: mutex luôn đứng ngay phía trên các field mà nó bảo vệ. Đọc code thấy `mu` là biết các field bên dưới cần lock. Cũng giúp tránh viết function chạm tới field nhưng quên lock.

---

## 3. `sync.RWMutex` — Read/Write Lock

`RWMutex` cho phép **nhiều reader đọc cùng lúc**, nhưng writer **độc quyền** (kick tất cả reader ra):

```go
mu.RLock()    // reader: nhiều goroutine có thể RLock đồng thời
mu.RUnlock()
mu.Lock()     // writer: độc quyền, kick mọi reader ra
mu.Unlock()
```

### Khi nào dùng RWMutex thay Mutex?

**Chỉ khi tỉ lệ read >> write** (vd 99:1). Ví dụ:

- Cache đọc rất nhiều, ghi hiếm khi (config, route table).
- Lookup table tra cứu user permission.

```go
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(k string) (string, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    v, ok := c.data[k]
    return v, ok
}

func (c *Cache) Set(k, v string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[k] = v
}
```

> **❓ RWMutex luôn nhanh hơn Mutex?**
> **KHÔNG.** RWMutex có overhead lớn hơn Mutex (~2-3× cho non-contended). Chỉ thắng khi nhiều reader thật sự song song và critical section dài. Với critical section ngắn (vài chục ns), Mutex thường thắng. **Benchmark trước khi đổi.**

> **⚠ Lỗi thường gặp**: dùng `RWMutex` cho mọi map → chậm hơn. Mặc định cứ dùng `Mutex`, đổi RWMutex khi có **bằng chứng** read-heavy.

> **❓ Đang RLock có gọi RLock lần nữa được không (re-entrant)?**
> **Không.** Go mutex/RWMutex **không re-entrant**. Cùng goroutine `mu.RLock()` 2 lần có thể deadlock nếu có writer đang đợi giữa hai lần. Khác với Java `ReentrantLock` — Go cố ý không hỗ trợ vì re-entrant lock dễ che giấu lỗi thiết kế.

---

## 4. `sync.WaitGroup` — Đợi N goroutine

Pattern cơ bản: chạy N goroutine song song, đợi tất cả xong rồi tiếp tục.

```go
var wg sync.WaitGroup
for i := 0; i < 10; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        doWork(id)
    }(i)
}
wg.Wait() // block đến khi cả 10 gọi Done()
fmt.Println("done")
```

3 method:

- `wg.Add(n)` — tăng counter +n.
- `wg.Done()` — giảm counter −1 (tương đương `wg.Add(-1)`).
- `wg.Wait()` — block đến khi counter = 0.

### Walk-through bằng số

Khởi đầu counter = 0. Khi `wg.Add(1)` × 10 lần → counter = 10. Mỗi goroutine xong gọi `wg.Done()` → counter giảm. Khi tất cả 10 đều Done → counter = 0 → `wg.Wait()` unblock.

> **⚠ Lỗi #1 với WaitGroup: `wg.Add()` SAU `go`.**
> ```go
> // SAI — race condition
> go func() {
>     wg.Add(1)        // ← có thể chạy sau Wait() đã thấy counter = 0
>     defer wg.Done()
>     work()
> }()
> wg.Wait()
> ```
> `wg.Add(1)` phải ở **goroutine cha**, **trước** `go func()`. Lý do: nếu Add ở goroutine con, có nguy cơ Add chạy sau Wait → Wait thấy counter = 0 → return → goroutine chưa kịp Add.

> **⚠ Lỗi #2: không pass biến vào closure.**
> ```go
> for i := 0; i < 5; i++ {
>     wg.Add(1)
>     go func() {
>         defer wg.Done()
>         fmt.Println(i) // ← BUG: in 5,5,5,5,5 (Go < 1.22)
>     }()
> }
> ```
> Trước Go 1.22, biến `i` của for-loop chung 1 instance, goroutine in giá trị cuối. Fix: `go func(id int) { ... }(i)`. Go 1.22+ đã sửa semantics — mỗi iteration là biến mới. Nhưng vẫn nên pass argument explicit để rõ ý.

### Pattern: fan-out

```go
func fanOut(urls []string) []string {
    results := make([]string, len(urls))
    var wg sync.WaitGroup
    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()
            results[idx] = fetch(u) // safe: mỗi goroutine ghi vào index khác nhau
        }(i, url)
    }
    wg.Wait()
    return results
}
```

> **💡 Tại sao `results[idx]` không cần lock?**
> Mỗi goroutine ghi vào một **index riêng biệt**. Không có 2 goroutine cùng ghi 1 chỗ → không race. Go race detector cũng OK với pattern này. Nhưng nếu các goroutine `append(results, ...)` cùng slice → CẦN lock vì `append` có thể realloc backing array.

---

## 5. `sync.Once` — Chạy đúng 1 lần

Use case kinh điển: lazy init một resource đắt (DB connection, regex compile, load config).

```go
var (
    once sync.Once
    db   *sql.DB
)

func DB() *sql.DB {
    once.Do(func() {
        var err error
        db, err = sql.Open("postgres", os.Getenv("DSN"))
        if err != nil {
            log.Fatal(err)
        }
    })
    return db
}
```

Dù `DB()` gọi từ 1000 goroutine cùng lúc, `sql.Open` chạy **đúng 1 lần**. Goroutine khác block đến khi lần chạy đầu xong.

### So sánh với check-lock-check thủ công

```go
// CÁCH XẤU (đúng nhưng dài và dễ sai)
var dbMu sync.Mutex
var db *sql.DB
func GetDB() *sql.DB {
    if db != nil {           // ← double-check pattern
        return db            //   không an toàn nếu thiếu atomic load
    }
    dbMu.Lock()
    defer dbMu.Unlock()
    if db == nil {
        db, _ = sql.Open(...)
    }
    return db
}
```

`sync.Once` làm gọn 6 dòng phức tạp thành 3 dòng đơn giản, **và đúng** trên mọi memory model.

> **❓ Once có thể `Do` 2 hàm khác nhau không?**
> Mỗi `sync.Once` instance chỉ chạy 1 hàm 1 lần. Gọi `once.Do(f1)` rồi `once.Do(f2)` → f2 KHÔNG chạy (vì once đã "used"). Nếu cần 2 lazy init khác nhau → 2 `sync.Once` riêng.

> **⚠ Lỗi**: dùng `sync.Once` cho retry. `Once` không reset; nếu init fail bạn không init lại được. Cho retry → dùng pattern khác (singleflight chẳng hạn).

---

## 6. `sync.Map` — Concurrent Map

Map thông thường trong Go **không thread-safe**. Đọc/ghi map concurrent → panic `concurrent map writes`. Hai cách giải:

1. `map + sync.Mutex` (hoặc RWMutex) — pattern phổ thông.
2. `sync.Map` — concurrent map có sẵn trong stdlib.

```go
var m sync.Map
m.Store("alice", 1)
v, ok := m.Load("alice")       // 1, true
m.LoadOrStore("bob", 2)        // load nếu có, store nếu chưa
m.Delete("alice")
m.Range(func(k, v any) bool {  // duyệt
    fmt.Println(k, v)
    return true // false để dừng
})
```

### Khi nào dùng `sync.Map`?

Theo docs Go, `sync.Map` được **tối ưu cho 2 use case rất hẹp**:

1. **Write-once, read-many** — key ghi 1 lần, đọc nhiều lần (config, cached metadata).
2. **Goroutine disjoint** — nhiều goroutine, mỗi goroutine đọc/ghi tập key khác nhau (sharded cache theo connection ID).

**Cho general purpose `map + Mutex` thường nhanh hơn `sync.Map`**. Benchmark cụ thể:

| Workload | `sync.Map` | `map + Mutex` |
|---|---|---|
| 50% read / 50% write, same keys | **chậm hơn 2-3×** | nhanh hơn |
| 99% read / 1% write, disjoint keys | **nhanh hơn 2×** | chậm hơn |

> **⚠ Lỗi**: dùng `sync.Map` mặc định cho mọi concurrent map. Nhiều dự án "phát hiện" `sync.Map` rồi thay tất cả → chậm đi. **Mặc định cứ `map + Mutex`, đổi `sync.Map` khi có benchmark chứng minh.**

> **❓ Vì sao `sync.Map` không generic (`Load(k) any`)?**
> Có từ Go 1.0 trước generic. Phải dùng type assertion `v.(int)`. Go 1.21 thêm `sync.OnceFunc/OnceValue` nhưng `sync.Map` chưa được generic hóa vì compatibility.

---

## 7. `sync.Pool` — Object Pool

`sync.Pool` cho phép **tái sử dụng allocation đắt** thay vì new mỗi lần.

```go
var bufPool = sync.Pool{
    New: func() any {
        return new(bytes.Buffer)
    },
}

func handleRequest(r *http.Request) {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()       // CRITICAL: reset trước khi Put lại
        bufPool.Put(buf)
    }()

    buf.WriteString("processing ")
    buf.WriteString(r.URL.Path)
    // ...
}
```

### Khi nào dùng `sync.Pool`?

- Object **lớn, hay được tạo lại** (buffer, parser, encoder).
- Allocation đắt: tạo `bytes.Buffer 4KB`, `json.Encoder`, `bufio.Writer`.
- HTTP server pattern: mỗi request cần buffer tạm → pool.

### Khi KHÔNG dùng

- Object nhỏ (struct vài byte) — overhead pool > tiết kiệm GC.
- Object cần lifetime dài — pool không phải LRU cache; GC clear bất cứ lúc nào.

> **⚠ Lỗi #1: quên Reset.**
> `Put` lại buffer chứa data cũ → request sau `Get` thấy data cũ → bug bảo mật (leak dữ liệu request khác).

> **⚠ Lỗi #2: Put nil hoặc Put object đã hỏng.**
> `Pool.Get` có thể trả lại nil-like state. Luôn dùng type-assert kèm kiểm tra hoặc rely `New` field.

> **❓ GC clear pool khi nào?**
> Sau mỗi GC cycle, Go **xóa toàn bộ pool**. Mục đích: tránh pool giữ object dài hạn → tăng heap. Vì vậy, pool chỉ giúp cho object **tạo nhiều lần trong khoảng thời gian ngắn**. Đây là trade-off cố ý.

### Use case thực: `fmt.Sprintf` internal

`fmt` package dùng `sync.Pool` cho `pp` (printer state) — mỗi lần `fmt.Sprintf` không alloc mới mà lấy từ pool. Tương tự `bytes.Buffer`, `bufio.Writer` trong stdlib.

---

## 8. `sync.Cond` — Condition Variable

Condition variable cho phép goroutine **đợi điều kiện** rồi được goroutine khác đánh thức:

```go
type Queue struct {
    mu   sync.Mutex
    cond *sync.Cond
    data []int
}

func (q *Queue) Push(v int) {
    q.mu.Lock()
    q.data = append(q.data, v)
    q.cond.Signal() // đánh thức 1 waiter
    q.mu.Unlock()
}

func (q *Queue) Pop() int {
    q.mu.Lock()
    defer q.mu.Unlock()
    for len(q.data) == 0 {
        q.cond.Wait() // unlock + sleep + re-lock khi tỉnh
    }
    v := q.data[0]
    q.data = q.data[1:]
    return v
}
```

> **❓ Khi nào dùng `sync.Cond`?**
> Hiếm. Trong Go idiom phần lớn use case của Cond làm tốt hơn bằng **channel**. Vd queue trên có thể thay bằng buffered channel 1 dòng: `ch := make(chan int, N)`. Cond chỉ thắng khi:
> - Có nhiều predicate phức tạp cần wait.
> - Broadcast tới tất cả waiter (`cond.Broadcast()`) — channel close cũng làm được.
> - Phải kết hợp với mutex sẵn có (vd Java-style monitor).

**Khuyến nghị**: gặp Cond trong Go code → nghi ngờ, thử thiết kế lại bằng channel.

---

## 9. `sync/atomic` — Atomic Operations

Atomic = thao tác **không bị gián đoạn** ở level CPU. Nhanh hơn mutex 3-10× cho operation đơn giản (int counter, pointer swap).

### API cũ (function-based)

```go
var n int64
atomic.AddInt64(&n, 1)              // n++
v := atomic.LoadInt64(&n)           // đọc atomic
atomic.StoreInt64(&n, 42)           // ghi atomic
ok := atomic.CompareAndSwapInt64(&n, oldV, newV) // CAS
```

### API mới Go 1.19+ (type-based)

```go
var n atomic.Int64
n.Add(1)
v := n.Load()
n.Store(42)
ok := n.CompareAndSwap(10, 20)
```

API mới **type-safe** và không cần `&` — nên dùng cho code mới.

### Walk-through: vì sao `atomic.AddInt64(&n, 1)` thread-safe nhưng `n++` không?

`n++` compile thành 3 lệnh CPU: `LOAD n → INC → STORE n`. Hai goroutine có thể đan xen:

```
goroutine A: LOAD n=5
goroutine B: LOAD n=5
goroutine A: INC → 6
goroutine B: INC → 6
goroutine A: STORE 6
goroutine B: STORE 6
```

Kết quả: n = 6 thay vì 7. **Mất 1 increment.**

`atomic.AddInt64` dùng instruction CPU đặc biệt (`LOCK XADD` trên x86) đảm bảo 3 bước trên là 1 đơn vị không gián đoạn.

### Compare-And-Swap (CAS)

```go
for {
    old := counter.Load()
    new := compute(old)
    if counter.CompareAndSwap(old, new) {
        break
    }
    // CAS fail → có goroutine khác update; retry
}
```

CAS là nền tảng của tất cả **lock-free data structure** (lock-free queue, hashmap). Pattern: loop, đọc old, tính new, CAS — nếu thất bại retry.

### Khi nào dùng atomic vs mutex?

| Tình huống | Atomic | Mutex |
|---|---|---|
| Counter đơn giản (n++) | ✓ | dùng được nhưng chậm hơn |
| Update 2 field cùng lúc | ✗ (atomic chỉ 1 word) | ✓ |
| Critical section dài (vài chục dòng) | ✗ | ✓ |
| Performance-critical hot path | ✓ | nếu code ngắn |

> **⚠ Lỗi #1**: dùng atomic nửa chừng. Một goroutine `atomic.AddInt64`, goroutine khác đọc `n` bằng `n` thuần (không Load) → vẫn có race. **Mọi truy cập biến atomic phải qua atomic API.**

> **⚠ Lỗi #2**: copy atomic value (Go 1.19+). `atomic.Int64` không được copy (sẽ panic vet warning). Pass by pointer hoặc dùng `atomic.Int64` trong struct.

---

## 10. Race Condition — Phát hiện & Fix

**Race condition** = 2+ goroutine truy cập cùng memory, ít nhất 1 là write, không có sync → kết quả không xác định.

### Ví dụ race

```go
var n int
var wg sync.WaitGroup
for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        n++ // ← race!
    }()
}
wg.Wait()
fmt.Println(n) // mong 1000, thường < 1000
```

### Detect bằng race detector

```bash
go run -race main.go
go test -race ./...
go build -race ./...
```

Output khi có race:

```
WARNING: DATA RACE
Read at 0x00c0000180a0 by goroutine 7:
  main.main.func1()
      main.go:11 +0x3c

Previous write at 0x00c0000180a0 by goroutine 6:
  main.main.func1()
      main.go:11 +0x44
```

### Fix race trên

Cách 1 — atomic:
```go
var n int64
// ...
atomic.AddInt64(&n, 1)
```

Cách 2 — mutex:
```go
var (
    n  int
    mu sync.Mutex
)
// ...
mu.Lock(); n++; mu.Unlock()
```

> **❓ Race detector có bắt 100% race?**
> Không. Race detector chỉ báo race **thực sự xảy ra trong lần chạy đó**. Race ẩn (chạy 1000 lần mới hiện 1 lần) có thể không bị bắt. Nguyên tắc: **chạy test với `-race` trong CI**, càng nhiều scenario càng tốt.

> **⚠ Overhead**: `-race` làm chương trình chậm 5-10× và tốn 5-10× memory. Không bật trong production binary, chỉ dev/test.

---

## 11. Deadlock

**Deadlock cổ điển — circular wait:**

```go
var muA, muB sync.Mutex

// Goroutine 1
go func() {
    muA.Lock()
    time.Sleep(10 * time.Millisecond)
    muB.Lock() // ← block đợi G2 thả muB
    muB.Unlock()
    muA.Unlock()
}()

// Goroutine 2
go func() {
    muB.Lock()
    time.Sleep(10 * time.Millisecond)
    muA.Lock() // ← block đợi G1 thả muA
    muA.Unlock()
    muB.Unlock()
}()
```

Cả 2 ôm 1 lock và đợi cái còn lại → đứng yên mãi.

### Fix: lock theo thứ tự cố định

**Quy tắc**: nếu cần nhiều lock, **mọi goroutine khóa theo cùng thứ tự** (vd thứ tự alphabet, hoặc thứ tự pointer address).

```go
// Cả G1 và G2 đều: lock A trước, B sau
muA.Lock(); muB.Lock()
// ...
muB.Unlock(); muA.Unlock()
```

### Deadlock khác: goroutine chính đợi WaitGroup không bao giờ Done

```go
var wg sync.WaitGroup
wg.Add(2)
go func() { defer wg.Done(); work() }()
// QUÊN goroutine thứ 2
wg.Wait() // block mãi mãi
```

Go runtime phát hiện **toàn bộ goroutine đều block** → panic: `fatal error: all goroutines are asleep - deadlock!`. Nhưng nếu chỉ 1 phần goroutine block (có goroutine khác đang chạy) → runtime KHÔNG phát hiện được.

---

## 12. Common Patterns

### 12.1 Concurrent counter — atomic vs mutex

Benchmark 1M increment, 10 goroutine song song:

| Cách | Thời gian | ns/op |
|---|---|---|
| `n++` (race-y, không lock) | ~3ms | nhanh nhất nhưng SAI kết quả |
| `atomic.AddInt64` | ~25ms | ~25ns/op |
| `Mutex` (Lock/Inc/Unlock) | ~150ms | ~150ns/op |
| `channel <- 1` | ~1500ms | ~1500ns/op |

**Counter performance-critical → atomic. Counter trong code thường → mutex cũng OK.**

### 12.2 Lazy init expensive resource

```go
var (
    regexOnce sync.Once
    emailRE   *regexp.Regexp
)

func ValidEmail(s string) bool {
    regexOnce.Do(func() {
        emailRE = regexp.MustCompile(`^[\w.+-]+@[\w.-]+\.\w+$`)
    })
    return emailRE.MatchString(s)
}
```

### 12.3 Read-heavy cache: `RWMutex + map`

Đã thấy ở mục 3. Pattern chuẩn cho cache 99% read.

### 12.4 Background worker chỉ chạy 1 instance

```go
type Scheduler struct {
    mu      sync.Mutex
    running bool
}

func (s *Scheduler) Start() {
    s.mu.Lock()
    if s.running {
        s.mu.Unlock()
        return // đã có 1 instance chạy rồi
    }
    s.running = true
    s.mu.Unlock()

    go func() {
        defer func() {
            s.mu.Lock()
            s.running = false
            s.mu.Unlock()
        }()
        s.loop()
    }()
}
```

### 12.5 Fan-out fetch URL

```go
func fetchAll(urls []string) []Result {
    results := make([]Result, len(urls))
    var wg sync.WaitGroup
    for i, u := range urls {
        wg.Add(1)
        go func(idx int, url string) {
            defer wg.Done()
            results[idx] = fetch(url)
        }(i, u)
    }
    wg.Wait()
    return results
}
```

---

## 13. Common Pitfall — đọc kỹ trước khi viết code production

### 13.1 Copy Mutex

```go
type Counter struct {
    mu sync.Mutex
    n  int
}

func main() {
    c := Counter{}
    go increment(c)      // ← BUG: pass by value → copy cả mutex
    go increment(c)      // 2 mutex riêng → không protect gì cả!
}

func increment(c Counter) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.n++
}
```

**Fix**: luôn pass `*Counter` (pointer):

```go
go increment(&c)

func increment(c *Counter) { ... }
```

`go vet` sẽ cảnh báo "passes lock by value". **Luôn chạy `go vet`.**

### 13.2 Quên Unlock

```go
func (c *Counter) Get() int {
    c.mu.Lock()
    if c.n < 0 {
        return -1 // ← BUG: chưa Unlock!
    }
    c.mu.Unlock()
    return c.n
}
```

**Fix**: `defer c.mu.Unlock()` ngay sau Lock.

### 13.3 `wg.Add` sau `go`

Đã nói ở mục 4. Add **trước** khi `go`.

### 13.4 Read không lock

```go
type Config struct {
    mu  sync.Mutex
    val string
}

func (c *Config) Set(v string) {
    c.mu.Lock(); c.val = v; c.mu.Unlock()
}

func (c *Config) Get() string {
    return c.val // ← BUG: không lock → race với Set
}
```

**Nguyên tắc**: nếu có 1 goroutine write biến X, **mọi** read X (kể cả goroutine khác) đều phải sync.

### 13.5 Defer trong loop

```go
for _, url := range urls {
    mu.Lock()
    defer mu.Unlock() // ← BUG: defer chỉ chạy khi function return
    process(url)      //         → lock không thả → goroutine khác đợi
}
```

**Fix**: dùng function nhỏ hoặc anonymous func:

```go
for _, url := range urls {
    func() {
        mu.Lock()
        defer mu.Unlock()
        process(url)
    }()
}
```

---

## 14. Bài tập

### BT1 — Concurrent counter: Mutex vs Atomic

Implement 3 phiên bản counter (UnsafeCounter, MutexCounter, AtomicCounter), cùng tăng 100k lần từ 10 goroutine. So sánh kết quả + thời gian.

### BT2 — Concurrent cache

Implement `Cache.Get(key, fetchFn)` với `RWMutex`:
- Nếu có trong map → return value.
- Nếu chưa → gọi `fetchFn(key)` để fetch, lưu vào map, return.
- Concurrent-safe: nhiều goroutine Get cùng lúc OK.

### BT3 — Singleton DB

Dùng `sync.Once` viết function `GetDB()` trả về `*sql.DB`, đảm bảo `sql.Open` chỉ chạy 1 lần dù gọi từ nhiều goroutine.

### BT4 — Fix race condition

Code dưới có race. Tìm và fix bằng 2 cách (mutex và atomic):

```go
package main

import (
    "fmt"
    "sync"
)

type Stats struct {
    requests int
    errors   int
}

func main() {
    var s Stats
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func(i int) {
            defer wg.Done()
            s.requests++
            if i%10 == 0 {
                s.errors++
            }
        }(i)
    }
    wg.Wait()
    fmt.Printf("req=%d err=%d\n", s.requests, s.errors)
}
```

### BT5 — Worker pool dùng WaitGroup

Cho list 100 URL, chạy 10 worker song song fetch. Mỗi worker lấy URL từ channel jobs, kết quả gửi vào channel results. Main goroutine collect results đến khi tất cả worker done.

### BT6 — Buffer pool

Allocate 10 000 lần `*bytes.Buffer` size 4KB cho tác vụ tạm. So sánh:
- Cách 1: `new(bytes.Buffer)` mỗi lần.
- Cách 2: dùng `sync.Pool`.

Đo số allocation bằng `testing.B.ReportAllocs()` hoặc đếm thủ công bằng `runtime.MemStats`.

---

## 15. Lời giải chi tiết

### Lời giải BT1 — Counter

```go
type UnsafeCounter struct{ n int }
func (c *UnsafeCounter) Inc() { c.n++ }

type MutexCounter struct {
    mu sync.Mutex
    n  int
}
func (c *MutexCounter) Inc() { c.mu.Lock(); c.n++; c.mu.Unlock() }

type AtomicCounter struct{ n atomic.Int64 }
func (c *AtomicCounter) Inc() { c.n.Add(1) }
```

Test:
- UnsafeCounter: kết quả < 100k, race detector báo lỗi.
- MutexCounter: đúng 100k, chậm hơn atomic ~3-5×.
- AtomicCounter: đúng 100k, nhanh nhất.

Code đầy đủ và benchmark trong [`solutions.go`](./solutions.go).

### Lời giải BT2 — Cache

```go
type Cache[V any] struct {
    mu   sync.RWMutex
    data map[string]V
}

func NewCache[V any]() *Cache[V] {
    return &Cache[V]{data: make(map[string]V)}
}

func (c *Cache[V]) Get(key string, fetch func(string) V) V {
    // Fast path: RLock cho check
    c.mu.RLock()
    if v, ok := c.data[key]; ok {
        c.mu.RUnlock()
        return v
    }
    c.mu.RUnlock()

    // Slow path: Lock để write
    c.mu.Lock()
    defer c.mu.Unlock()
    // Re-check vì giữa RUnlock và Lock có thể goroutine khác đã fetch
    if v, ok := c.data[key]; ok {
        return v
    }
    v := fetch(key)
    c.data[key] = v
    return v
}
```

**Giải thích pattern double-check**: giữa thời điểm `RUnlock` và `Lock`, goroutine khác có thể đã fetch và set rồi. Vì vậy sau khi Lock cần check lại. Pattern này là cốt lõi của `sync.Once` (xem source `src/sync/once.go`).

**Cải tiến**: hai goroutine gọi Get("alice") cùng lúc → cả 2 đều rơi vào slow path → fetch 2 lần (chỉ 1 cái cuối thắng). Để chỉ fetch 1 lần dùng [`golang.org/x/sync/singleflight`](https://pkg.go.dev/golang.org/x/sync/singleflight).

### Lời giải BT3 — Singleton DB

```go
var (
    dbOnce sync.Once
    dbInst *sql.DB
    dbErr  error
)

func GetDB() (*sql.DB, error) {
    dbOnce.Do(func() {
        dbInst, dbErr = sql.Open("postgres", os.Getenv("DSN"))
        if dbErr == nil {
            dbErr = dbInst.Ping()
        }
    })
    return dbInst, dbErr
}
```

**Lưu ý**: bắt lỗi từ trong `Do` rồi expose ra ngoài (vì callback của `Do` là `func()` không có return). Pattern này thấy ở nhiều thư viện stdlib (`http.DefaultTransport`).

### Lời giải BT4 — Fix race

Phiên bản mutex:

```go
type Stats struct {
    mu       sync.Mutex
    requests int
    errors   int
}

func (s *Stats) IncReq()  { s.mu.Lock(); s.requests++; s.mu.Unlock() }
func (s *Stats) IncErr()  { s.mu.Lock(); s.errors++; s.mu.Unlock() }
```

Phiên bản atomic:

```go
type Stats struct {
    requests atomic.Int64
    errors   atomic.Int64
}

// usage:
s.requests.Add(1)
if i%10 == 0 { s.errors.Add(1) }
```

Kết quả: req=1000, err=100 (đúng).

### Lời giải BT5 — Worker pool

```go
func workerPool(urls []string, nWorkers int) []string {
    jobs := make(chan string, len(urls))
    results := make(chan string, len(urls))

    var wg sync.WaitGroup
    for w := 0; w < nWorkers; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for u := range jobs {
                results <- fmt.Sprintf("[w%d] %s", id, fetch(u))
            }
        }(w)
    }

    for _, u := range urls {
        jobs <- u
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results) // close khi mọi worker done
    }()

    out := make([]string, 0, len(urls))
    for r := range results {
        out = append(out, r)
    }
    return out
}
```

**Pattern đáng nhớ**: goroutine riêng `wg.Wait() + close(results)` — đây là idiom chuẩn để biết khi nào hết kết quả. Nếu close `results` trong main goroutine sẽ block (vì còn worker đang gửi). Nếu không close, range không kết thúc.

### Lời giải BT6 — Buffer pool

```go
// Cách 1: alloc mỗi lần
func newEach(n int) {
    for i := 0; i < n; i++ {
        buf := new(bytes.Buffer)
        buf.WriteString("hello world")
        _ = buf.String()
    }
}

// Cách 2: sync.Pool
var bufPool = sync.Pool{New: func() any { return new(bytes.Buffer) }}

func withPool(n int) {
    for i := 0; i < n; i++ {
        buf := bufPool.Get().(*bytes.Buffer)
        buf.WriteString("hello world")
        _ = buf.String()
        buf.Reset()
        bufPool.Put(buf)
    }
}
```

Benchmark với 10k iteration:

| Cách | Allocations | Bytes alloc |
|---|---|---|
| newEach | ~10 000 | ~640 KB |
| withPool | ~30-100 | ~6 KB |

Pool giảm allocation 100-300× → giảm GC pressure đáng kể.

---

## 16. Code & Minh họa

- [`solutions.go`](./solutions.go) — code đầy đủ cho 6 bài tập, chạy được với `go run solutions.go` và `go run -race solutions.go`.
- [`visualization.html`](./visualization.html) — 3 module:
  1. **Mutex Simulator** — N goroutine cố vào critical section, chỉ 1 vào được tại 1 thời điểm.
  2. **RWMutex** — nhiều reader song song, writer độc quyền (đẩy reader ra).
  3. **Race Condition** — 2 goroutine increment không lock, animate race so với version có sync.

---

## 17. Bài tiếp theo

- [Lesson 29 — Context](../lesson-29-context/) (chưa có): `context.Context`, cancel, deadline, value propagation — pattern chuẩn để cancel/timeout trong toàn bộ tier 2+ web/database.
- Sau khi xong tier 2, tier 3 sẽ dùng kiến thức này nhiều: lock-free data structures, sync.Map advanced, memory model, pprof contention profiling.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Khi nào dùng `RWMutex` thay `Mutex`?
>    <details><summary>Đáp án</summary>Chỉ khi tỉ lệ read >> write (vd ≥10:1) và critical section đủ dài. Mặc định cứ Mutex.</details>
> 2. `wg.Add(1)` phải đặt ở đâu — trong goroutine con hay goroutine cha?
>    <details><summary>Đáp án</summary>Cha, TRƯỚC `go func()`. Đặt trong con có thể race với Wait().</details>
> 3. `n++` thread-safe nếu chỉ có 1 goroutine ghi và nhiều goroutine đọc?
>    <details><summary>Đáp án</summary>Không. Reader có thể đọc giá trị nửa-cũ nửa-mới (trên 32-bit) hoặc không bao giờ thấy update. Phải atomic hoặc lock cả ở read.</details>
> 4. `sync.Pool` có phải LRU cache không?
>    <details><summary>Đáp án</summary>Không. GC có thể xóa toàn bộ pool bất cứ lúc nào. Chỉ dùng cho temporary object trong khoảng thời gian ngắn.</details>

> **📝 Tóm tắt Lesson 28**
>
> - `sync.Mutex`/`RWMutex` protect shared state — **luôn** `defer Unlock()`.
> - `sync.WaitGroup` đợi N goroutine — `Add` trước `go`.
> - `sync.Once` cho lazy init đúng 1 lần.
> - `sync.Map` chỉ dùng cho write-once-read-many hoặc disjoint keys; còn lại `map + Mutex`.
> - `sync.Pool` tái sử dụng object đắt; nhớ Reset trước Put; GC có thể clear.
> - `sync/atomic` nhanh hơn mutex cho counter; dùng `atomic.Int64` (Go 1.19+).
> - Race: detect bằng `go run -race`. Fix bằng atomic hoặc mutex.
> - Deadlock: lock theo thứ tự cố định.
> - Pitfall: copy mutex, quên Unlock, `wg.Add` sai chỗ, đọc không lock.
