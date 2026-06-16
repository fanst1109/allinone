# Lesson 37 — Advanced Testing trong Go

> **Tier 3 · Programming · Advanced** — kế thừa từ [Lesson 26 — Testing Basics](../lesson-26-testing-basics/).

Sau khi đã biết viết `func TestX(t *testing.T)` và đo coverage cơ bản (L26),
lesson này đào sâu các kỹ thuật test "production-grade" mà mọi engineer Go
cần biết: **fuzz test**, **property-based**, **race detector**, **integration
test với build tag**, **golden file**, **httptest**, **parallel sub-test**,
**setup/teardown**, **fixture**, và những pitfall thật-sự đắt giá khi
codebase lớn lên.

Đây không phải bài "lý thuyết suông" — toàn bộ ví dụ có code thật chạy được
trong [`solutions.go`](./solutions.go) + [`solutions_test.go`](./solutions_test.go),
chạy `go test -v` xanh trên máy bạn. Visualization minh hoạ 3 cơ chế khó hình
dung nhất: fuzz finder, race detector, golden workflow.

---

## Mục tiêu học tập

Học xong lesson này bạn sẽ:

1. Biết khi nào nên dùng **fuzz test** thay vì example-based test.
2. Phân biệt **property-based test** vs **case-based test**, viết được invariant.
3. Hiểu **data race** là gì và đọc được output của `go test -race`.
4. Tách **unit test** vs **integration test** bằng build tag.
5. Áp dụng **golden file** cho output lớn / khó viết tay (HTML, JSON, snapshot).
6. Test HTTP handler/client bằng `httptest` mà không cần mở port.
7. Viết **parallel sub-test** đúng cách, tránh pitfall loop variable.
8. Dùng `t.Cleanup` và `TestMain` cho setup/teardown đúng scope.
9. Đánh giá đúng vai trò của **coverage** — biết khi nào nó là chỉ báo tốt và
   khi nào nó là "vanity metric".

## Tiền đề

- [Lesson 26 — Testing Basics](../lesson-26-testing-basics/) (`*_test.go`, `t.Run`, coverage cơ bản).
- [Lesson 27/28 — Goroutine, Channel, Sync](../lesson-27-goroutines-channels/) (cần cho race detector).
- [Lesson 36 — Concurrency Patterns](../lesson-36-concurrency-patterns/) (worker pool, pipeline — để hiểu sao race nguy hiểm).

---

## 1. Fuzz testing (Go 1.18+) — máy tự sinh input tìm bug giúp bạn

### 1.1 Trực giác

> 💡 **Trực giác**: Bạn viết test với 5-10 case "thông minh" nghĩ ra được. Nhưng bug
> thường nằm ở case mà bạn KHÔNG nghĩ tới — chuỗi rỗng, chuỗi siêu dài, ký tự
> đặc biệt, input ngẫu nhiên. Fuzzer là một "agent tự nghĩ test" chạy hàng triệu
> input/giây, mutation từ seed corpus, ưu tiên input gây hành vi mới
> (coverage-guided).

Trước Go 1.18, muốn fuzz phải dùng `gofuzz` của Dvyukov (third-party). Từ 1.18,
fuzz được tích hợp vào toolchain — viết một hàm `FuzzXxx(f *testing.F)` là đủ.

### 1.2 Anatomy của một fuzz target

```go
func FuzzReverse(f *testing.F) {
    // Seed corpus — ví dụ ban đầu cho fuzzer mutate.
    for _, s := range []string{"hello", "café", "日本語", ""} {
        f.Add(s)
    }
    // Fuzz target — chạy với input do fuzzer sinh.
    f.Fuzz(func(t *testing.T, s string) {
        if !utf8.ValidString(s) {
            t.Skip()
        }
        if Reverse(Reverse(s)) != s {
            t.Errorf("invariant fail: %q", s)
        }
    })
}
```

Chạy:

```bash
# Chạy như test thường — chỉ chạy seed corpus, ~0s.
go test -run=FuzzReverse

# Fuzz thực sự — sinh input ngẫu nhiên trong 30s.
go test -fuzz=FuzzReverse -fuzztime=30s
```

Khi fuzzer tìm thấy input gây fail/panic:

```
fuzz: elapsed: 3s, gathering baseline coverage: 0/192 completed
fuzz: minimizing 38-byte failing input file
--- FAIL: FuzzReverse (3.21s)
    --- FAIL: FuzzReverse (0.00s)
        reverse_test.go:32: Reverse produced invalid UTF-8 for "\xa6"
    Failing input written to testdata/fuzz/FuzzReverse/771e938e4458e983
```

Input gây fail được lưu vào `testdata/fuzz/FuzzReverse/<hash>` — lần `go test`
sau, file này được chạy như case unit test bình thường, đảm bảo regression.

### 1.3 Walk-through cụ thể: fuzzer "phát hiện" bug như thế nào?

Giả sử ta có hàm sai `ReverseBuggy` đảo theo byte (xem `solutions.go`):

| Iter | Input (sinh từ mutation) | `Reverse(Reverse(s))` | Match? |
|------|---------------------------|------------------------|--------|
| 1    | `"hello"` (seed)          | `"hello"`              | ✓      |
| 2    | `"hellox"` (insert)       | `"hellox"`             | ✓      |
| 3    | `"café"` (seed)           | byte chaos → invalid UTF-8 | **FAIL** |
| 4    | (minimize) `"\xc3\xa9"`   | invalid                | **FAIL** |
| 5    | (minimize) `"é"`          | invalid                | **FAIL** |

Fuzzer **minimize**: tìm input fail càng ngắn càng tốt → dễ debug. Cuối cùng
lưu input ngắn nhất vào `testdata/fuzz/FuzzReverse/<hash>`.

> ❓ **Câu hỏi tự nhiên**
>
> - **"Fuzzer biết invariant của tôi à?"** — Không. Fuzzer chỉ biết test PASS hay FAIL.
>   Bạn viết invariant trong `f.Fuzz(...)` body. Fuzzer chỉ tìm input làm body panic
>   hoặc gọi `t.Error/Fatal`.
> - **"Sao chạy hoài không tìm thấy bug?"** — Có thể seed corpus quá hẹp, hoặc
>   bug nằm ở vùng input rất hiếm. Thêm nhiều seed đa dạng, tăng `-fuzztime`.
> - **"Fuzz có thay được unit test không?"** — Không. Fuzz tìm crash/invariant
>   violation; nó không kiểm tra ngữ nghĩa cụ thể. Vẫn cần case-based test
>   cho behavior "input X → output Y cụ thể".
> - **"Tốn CPU không?"** — Có. Fuzz là long-running. Thường dev local 30s-1m,
>   CI nightly chạy 5-10 phút mỗi target.

> ⚠ **Lỗi thường gặp**
>
> - Quên `t.Skip()` cho input vô nghĩa → fuzzer mất thời gian fuzz vùng không
>   liên quan.
> - Để fuzz mutate input quá thoáng → bug hiện ra nhưng không reproducible.
>   Phải commit `testdata/fuzz/<target>/<hash>` vào git.
> - Dùng `f.Fuzz(...)` với hàm bắt `[]byte` rồi tự decode — preferable, nhưng
>   nhớ ép invariant trên CẢ vùng decode-được lẫn không-decode-được.

---

## 2. Property-based testing — test invariant, không test case

### 2.1 Trực giác

> 💡 **Trực giác**: Thay vì viết "Sort([3,1,2]) → [1,2,3]" rồi liệt kê 10 case,
> ta phát biểu **tính chất** đầu ra phải có với MỌI input hợp lệ — rồi sinh
> ngẫu nhiên hàng trăm input để verify. Property = invariant.

Một số property hay gặp:

| Hàm | Property |
|-----|----------|
| `Reverse` | `Reverse(Reverse(s)) == s` (involution) |
| `Sort` | `Sort(Sort(s)) == Sort(s)` (idempotent) + sorted |
| `Append` | `len(Append(s, x)) == len(s) + 1` |
| `Encode/Decode` | `Decode(Encode(x)) == x` (roundtrip) |
| `Min` | `Min(a, b) <= a && Min(a, b) <= b` |
| `Compress` | `len(Compress(x)) <= len(x)` (với data có redundancy) |

### 2.2 Walk-through: Sort idempotent

```go
func TestSortInts_Idempotent(t *testing.T) {
    for i := 0; i < 100; i++ {
        in := randInts(rand.Intn(50))
        once := SortInts(in)
        twice := SortInts(once)
        if !equalInt(once, twice) {
            t.Errorf("Sort không idempotent với %v", in)
        }
        if !sort.IntsAreSorted(once) {
            t.Errorf("output không sorted: %v", once)
        }
    }
}
```

Với input `[3, 1, 2]`:
- `once = [1, 2, 3]` (sorted)
- `twice = Sort([1, 2, 3]) = [1, 2, 3]` — không đổi
- `once == twice` ✓ → idempotent

Với input edge case `[]` (rỗng), `[5]` (1 phần tử), `[2,2,2]` (toàn giống nhau):
property vẫn phải đúng. Random generator tự cover các edge này.

### 2.3 Property vs Fuzz — khác gì nhau?

| | Property-based | Fuzz |
|---|---------------|------|
| Sinh input | Random từ generator viết tay | Mutation từ seed + coverage-guided |
| Mục tiêu | Verify invariant | Tìm crash / invariant fail |
| Library | Tự viết generator (hoặc `gopter`, `rapid`) | Built-in `testing.F` từ Go 1.18 |
| Khi dùng | Property rõ, input space đoán được | Input là binary, edge case khó nghĩ |

Trong thực tế, property-based viết bằng `f.Fuzz` của Go cũng được — chỉ là
ta dùng fuzzer như "random generator".

> 🔁 **Dừng lại tự kiểm**: Property nào sau đây ĐÚNG cho hàm `strings.ToUpper`?
> <details><summary>Đáp án</summary>
>
> - `ToUpper(ToUpper(s)) == ToUpper(s)` (idempotent) ✓
> - `len(ToUpper(s)) == len(s)` ✗ Sai! `'ß'` → `'SS'` (1 byte → 2 byte). Đây là
>   loại trap mà property-based hay tóm được. Lesson: property phải chọn cẩn thận.
> - `utf8.ValidString(ToUpper(s)) == utf8.ValidString(s)` ✓
> </details>

---

## 3. Race detector — `go test -race`

### 3.1 Data race là gì?

> 💡 **Trực giác**: 2 goroutine cùng đọc/ghi 1 ô nhớ mà không có sync → kết
> quả phụ thuộc thứ tự lệnh CPU thực thi (vốn không xác định). Đây là loại
> bug ác mộng: chạy 1000 lần local đều OK, prod chạy phát tèo.

Định nghĩa hình thức (Go memory model):

> Hai action A, B là một **data race** nếu:
> 1. Cùng truy cập 1 ô nhớ
> 2. Ít nhất một trong hai là **write**
> 3. Không có quan hệ **happens-before** giữa chúng (qua channel, mutex, sync.Once...)

### 3.2 Walk-through: `i++` không atomic

```go
type UnsafeCounter struct{ n int }
func (c *UnsafeCounter) Inc() { c.n++ }
```

`c.n++` compile ra ~3 lệnh:
1. `r1 = LOAD c.n`
2. `r1 = r1 + 1`
3. `STORE c.n = r1`

Với 2 goroutine cùng `Inc()` lúc `c.n == 5`:

| t | Goroutine A | Goroutine B | c.n |
|---|-------------|-------------|-----|
| 0 | LOAD r1=5   |             | 5   |
| 1 |             | LOAD r1=5   | 5   |
| 2 | r1=6        |             | 5   |
| 3 |             | r1=6        | 5   |
| 4 | STORE 6     |             | 6   |
| 5 |             | STORE 6     | 6   |

Kết quả: gọi Inc 2 lần → c.n đáng lẽ = 7, nhưng = 6. **Mất 1 update**.

Chạy `go test -race` trên `TestUnsafeCounter_RaceDemo` (set `RACE_DEMO=1`):

```
==================
WARNING: DATA RACE
Write at 0x00c000018098 by goroutine 8:
  lesson37.(*UnsafeCounter).Inc()
      solutions.go:104 +0x44

Previous read at 0x00c000018098 by goroutine 7:
  lesson37.(*UnsafeCounter).Inc()
      solutions.go:104 +0x2c
==================
```

### 3.3 Fix — 3 cách

```go
// Cách 1: atomic (nhanh nhất với ô đơn lẻ)
type SafeCounter struct{ n atomic.Int64 }
func (c *SafeCounter) Inc() { c.n.Add(1) }

// Cách 2: mutex (cho critical section nhiều bước)
type MutexCounter struct {
    mu sync.Mutex
    n  int
}
func (c *MutexCounter) Inc() { c.mu.Lock(); c.n++; c.mu.Unlock() }

// Cách 3: channel (CSP style)
type ChanCounter struct{ ch chan int }
// loop nội bộ xử lý ch — 1 owner duy nhất → không race.
```

> ⚠ **Lỗi thường gặp**
>
> - **"Tao đọc thôi, đâu có write"**: SAI. `var m map[K]V; v := m[k]` đọc map
>   trong khi goroutine khác `m[k]=...` cũng race. Map của Go không thread-safe.
> - **"Tao dùng `time.Sleep` để chờ goroutine xong"**: SAI. Sleep không tạo
>   happens-before. Dùng `sync.WaitGroup` hoặc channel.
> - **"Race chỉ xảy ra trên Linux multicore"**: SAI. Race là semantic bug —
>   compiler có quyền reorder lệnh, có thể "tỏa" cả trên single-core.

### 3.4 Performance cost

`-race` instrument từng memory access → chậm 5-10x, RAM tăng 5-10x. **KHÔNG**
build prod binary với `-race`. Dùng:

```bash
go test -race ./...          # local dev — bật mặc định
go build -race main.go       # debug-only binary cho staging
```

CI nên có 2 job: `go test ./...` (fast, mọi PR) + `go test -race ./...`
(slower, mọi PR hoặc nightly).

> 🔁 **Dừng lại tự kiểm**: Có code `var x int; go func(){ x = 1 }(); fmt.Println(x)`.
> Race không?
> <details><summary>Đáp án</summary> Có. Goroutine ghi `x`, main goroutine đọc `x`,
> không có sync → race. Fix bằng channel: `done := make(chan int); go func(){ done <- 1 }(); fmt.Println(<-done)`. </details>

---

## 4. Integration test với build tag

### 4.1 Vì sao tách?

> 💡 **Trực giác**: Unit test ~ms, không cần network/DB. Integration test
> phải start container, gọi HTTP thật, có thể vài giây/test. Nếu mix chung,
> mỗi lần `go test` chờ 30s → không ai chạy.

### 4.2 Cách tách bằng build tag

Đặt `//go:build integration` ở dòng ĐẦU file. Sau đó `go test ./...` bỏ
qua, `go test -tags=integration ./...` mới build. Convention naming:
`solutions_integration_test.go`. Xem file
[`solutions_integration_test.go`](./solutions_integration_test.go) trong lesson.

### 4.3 Convention dự án thật

Trong codebase lớn, thường tách `xxx_test.go` (unit, dùng mock) và
`xxx_integration_test.go` (`//go:build integration`, dùng container thật).
File store/repository hay tách toàn bộ thành file integration vì cần DB.

---

## 5. Test với external service — 3 chiến lược

| Cách | Tốc độ | Realism | Khi dùng |
|------|--------|---------|----------|
| **Mock / Stub** | ⚡ ns | ✗ thấp | Test logic gọi service đúng signature |
| **In-memory fake** | ⚡ μs | △ trung | Test với behavior gần thật (vd `sqlite::memory:` thay Postgres) |
| **Testcontainer** | 🐌 s | ✓ cao | Test thật sự với Postgres/Redis/Kafka container |

### 5.1 Mock

Inject interface, trong test cung cấp một struct cài interface đó nhưng
trả về dữ liệu cứng. Vd handler nhận `Store interface { Get(id) (User, error) }`
— test inject `fakeStore` trả về `User{Name:"test"}`. Ưu: nhanh,
deterministic. Nhược: không catch bug ở layer SQL/network thật.

### 5.2 Testcontainer

Dùng `github.com/testcontainers/testcontainers-go`: trong test, gọi
`postgres.RunContainer(ctx, ...)` start container thật, lấy connection
string, chạy schema migration, test SQL thật. Cleanup `pg.Terminate(ctx)`
qua `t.Cleanup`. Ưu: hành vi giống prod (transaction, isolation,
encoding...). Nhược: chạy chậm, cần Docker, CI phức tạp hơn.

### 5.3 In-memory fake

Postgres không có in-memory mode chính thức, nhưng:
- SQLite `:memory:` đủ cho schema đơn giản (không có Postgres-specific feature).
- Redis: dùng `miniredis`.
- Kafka: dùng channel mô phỏng.

Best practice: **2 tầng**. Unit test với mock/fake, suite integration riêng
với testcontainer chạy nightly.

---

## 6. Golden file test — snapshot cho output dài

### 6.1 Khi nào dùng?

> 💡 **Trực giác**: Khi output là 100 dòng HTML/JSON/SQL — viết literal vào
> test code thì xấu và khó maintain. Lưu vào file `.golden`, so khớp byte
> với output thực.

Use case điển hình:
- Render HTML email template
- Serialize JSON API response
- Format SQL query builder output
- ASCII art / report file
- Code generator output

### 6.2 Code helper chuẩn

```go
var updateGolden = flag.Bool("update", false, "rewrite golden files")

func TestRender_Golden(t *testing.T) {
    got, _ := RenderReport(data)
    goldenPath := filepath.Join("testdata", "golden", "report.golden")

    if *updateGolden {
        os.WriteFile(goldenPath, []byte(got), 0o644)
        return
    }
    want, err := os.ReadFile(goldenPath)
    if err != nil { t.Fatal("chạy: go test -update") }
    if got != string(want) {
        t.Errorf("output != golden\nGot:\n%s\nWant:\n%s", got, want)
    }
}
```

Workflow:
1. Lần đầu: `go test -update` → tạo file `.golden`.
2. Review file `.golden` bằng mắt → commit vào git.
3. Lần sau: `go test` so khớp byte. Pass/fail rõ.
4. Khi đổi template hợp lệ: `go test -update` lại + review diff trong PR.

### 6.3 Pitfall

> ⚠ **Lỗi thường gặp**
>
> - **Quên review diff golden khi update** — bug có thể "thông qua" như expected.
>   Luôn xem `git diff testdata/golden/` trước khi commit.
> - **Output không deterministic** (chứa timestamp, UUID, map iteration order)
>   → test flaky. Fix: inject clock, sort key trước khi marshal.
> - **File quá lớn** (vài MB) → git khó review. Cân nhắc chia nhỏ.

---

## 7. HTTP test với `httptest`

Package `net/http/httptest` có 2 helper chính:

### 7.1 `httptest.NewRecorder` — test HANDLER

Không mở socket, chỉ giả lập `ResponseWriter`:

```go
func TestEchoHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/echo?msg=hi", nil)
    w := httptest.NewRecorder()
    EchoHandler(w, req)
    if w.Code != 200 { t.Fatal() }
    if w.Body.String() != `{"echo":"hi"}` { t.Fatal() }
}
```

Nhanh, đơn giản. Dùng khi test logic handler thuần.

### 7.2 `httptest.NewServer` — test CLIENT

Mở port thật (loopback, port ngẫu nhiên), inject URL vào client:

```go
func TestClient(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(EchoHandler))
    t.Cleanup(srv.Close)

    c := &Client{BaseURL: srv.URL}
    got, _ := c.GetEcho("hi")
    if got != "hi" { t.Fatal() }
}
```

Khi nào dùng `NewServer` thay vì `NewRecorder`?
- Client code có timeout/redirect/TLS logic cần đường mạng thật.
- Test middleware (chain `http.Handler`).
- Cần test `httptest.NewTLSServer` cho HTTPS.

---

## 8. Parallel sub-test

### 8.1 Cú pháp

```go
func TestCases(t *testing.T) {
    cases := []struct{ name, in, want string }{
        {"a", "go", "og"},
        {"b", "hi", "ih"},
    }
    for _, tt := range cases {
        tt := tt // shadow — quan trọng với Go < 1.22
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()
            // ... test body ...
        })
    }
}
```

### 8.2 Pitfall loop variable (Go < 1.22)

```go
for _, tt := range cases {
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // BUG: tất cả sub-test cùng đọc `tt` cuối cùng của loop
        // vì t.Parallel() pause đến khi vòng for chạy xong.
    })
}
```

Vì sao? `t.Parallel()` block sub-test cho đến khi outer test `TestCases`
xong vòng for. Lúc đó `tt` đã trỏ tới phần tử CUỐI. Tất cả sub-test thấy
cùng giá trị.

Fix: `tt := tt` shadow biến vào scope mỗi iteration.

**Go 1.22+**: spec đổi — mỗi iteration tạo biến mới. Không cần shadow nữa.
Nhưng để code portable, vẫn nên giữ thói quen shadow.

### 8.3 Tăng tốc thật sự?

`t.Parallel()` chỉ có ý nghĩa nếu test có I/O/sleep/blocking thực. Test CPU
pure thường không nhanh hơn (Go runtime đã xếp goroutine vào core sẵn).

> ⚠ **Lỗi thường gặp**
>
> - **Shared state giữa parallel sub-test** — vd cùng ghi cùng file → race / flaky.
>   Mỗi sub-test phải có data riêng (`t.TempDir()`).
> - **Quên `t.Parallel()`** ở sub-test sau khi outer đã gọi `t.Parallel()` —
>   sub-test vẫn chạy tuần tự bên trong outer.

---

## 9. Setup / Teardown — `t.Cleanup` & `TestMain`

### 9.1 Scope khác nhau

| Mức | Cơ chế | Khi chạy |
|-----|--------|----------|
| **Per test/subtest** | `t.Cleanup(fn)` | Khi `t` kết thúc (pass/fail/skip/panic) |
| **Per package** | `TestMain(m *testing.M)` | 1 lần trước/sau toàn bộ test |

### 9.2 `t.Cleanup` — thay `defer` trong test

```go
func TestWithDB(t *testing.T) {
    db := openDB(t)
    t.Cleanup(func() { db.Close() })

    // dùng db, có panic cũng được — Cleanup vẫn chạy.
}
```

Ưu điểm vs `defer`: chạy đúng thứ tự LIFO, hoạt động cả khi gọi từ helper:

```go
func openDB(t *testing.T) *DB {
    db, _ := sql.Open(...)
    t.Cleanup(func() { db.Close() })  // helper tự đăng ký cleanup
    return db
}
```

### 9.3 `TestMain` — control toàn bộ package

```go
func TestMain(m *testing.M) {
    // SETUP toàn package
    fmt.Println("setup...")
    setupDBPool()

    code := m.Run() // chạy toàn bộ TestXxx

    // TEARDOWN toàn package
    closeDBPool()
    fmt.Println("teardown")
    os.Exit(code)
}
```

Lưu ý:
- **Phải gọi `os.Exit(code)`** thay vì `return` — nếu không exit code sai.
- Có thể parse flag custom (`flag.Parse()` được gọi tự động trước `TestMain`
  nếu cờ định nghĩa ở top-level).
- Chỉ 1 `TestMain` mỗi package.

---

## 10. Test fixture — convention `testdata/`

Go tool **bỏ qua** thư mục tên `testdata/` khi build, nên đặt file gì vào
cũng không phá. Convention:

```
mypkg/
├── solutions.go
├── solutions_test.go
└── testdata/
    ├── users.csv
    ├── golden/
    │   └── report.golden
    └── fuzz/
        └── FuzzReverse/
            └── 771e938e4458e983
```

Helper load:

```go
func loadFixture(t *testing.T, name string) []byte {
    t.Helper()
    data, err := os.ReadFile(filepath.Join("testdata", name))
    if err != nil { t.Fatal(err) }
    return data
}
```

`t.Helper()` đánh dấu hàm là helper — error report sẽ point tới caller thay
vì trong helper.

---

## 11. Coverage > 80% — mục tiêu hay công cụ?

### 11.1 Coverage là gì?

> 💡 **Trực giác**: `go test -cover` đếm % statement được chạy bởi test. Nó là
> indicator "đã test", KHÔNG phải indicator "test đúng".

Ví dụ test 100% coverage NHƯNG SAI: hàm `Divide(a, b) { return a/b }`, test
chỉ gọi `_ = Divide(10, 2)` không assert gì → coverage 100% nhưng đổi
`a/b` thành `a*b` test vẫn pass.

### 11.2 Tools vs goal

- **Tool**: dùng coverage để **phát hiện vùng chưa test** — `go test -coverprofile=c.out && go tool cover -html=c.out`.
  Mở browser, thấy code đỏ → biết phần đó chưa cover.
- **Goal**: ép `coverage >= 80%` trong CI có thể dẫn tới test "filler" — test
  trivial getter/setter chỉ để tăng %.

Best practice: cover **branch quan trọng** (error path, edge case) ưu tiên
trước; skip code trivial / generated; đo coverage trên chức năng mới (delta
coverage) thay vì gắt số tổng; đừng tin coverage > 90% là "tốt" — mutation
testing (mục 13) là indicator sâu hơn.

---

## 12. Test naming & organization

### 12.1 Convention naming

Pattern phổ biến: `TestFunc_Scenario_ExpectedBehavior`.

| Tên | Phân tích |
|-----|-----------|
| `TestParse_EmptyInput_ReturnsEmptyMap` | Func=Parse, Scenario=empty, Expected=empty map |
| `TestClient_GetEcho_Returns500_WhenServerDown` | Func=Get, Scenario=server down, Expected=500 |
| `TestSortInts_Idempotent` | Property style (ngắn hơn) |

### 12.2 File organization

- Mỗi `xxx.go` → `xxx_test.go` (1-1).
- Test quá nhiều → tách theo aspect: `xxx_basic_test.go`, `xxx_edge_test.go`,
  `xxx_integration_test.go`.
- **Tránh** 1 file test 5000 dòng. Nếu thấy file lớn dần → tách.

> ⚠ **Lỗi thường gặp**: đặt tên test theo implementation detail (`TestParseUsesStrings`)
> → đổi impl phải đổi tên test. Đặt tên theo behavior.

---

## 13. Mutation testing — kiểm tra chất lượng test

### 13.1 Ý tưởng

> 💡 **Trực giác**: Mutation testing tự động "đột biến" code (đổi `+` thành
> `-`, `<` thành `<=`, `true` thành `false`...) rồi chạy test. Nếu test
> vẫn pass → test có lỗ hổng. Tỷ lệ mutation bị "kill" (làm test fail) gọi
> là **mutation score**.

Coverage cao + mutation score thấp = test trivial (chạy code nhưng không
assert đủ).

### 13.2 Tools cho Go

- [`go-mutesting`](https://github.com/avito-tech/go-mutesting) — fork phổ biến.
- [`gremlins`](https://gremlins-dx.io/) — modern, có HTML report.

Cách dùng (gremlins): `gremlins unleash ./...` → output `Mutation score:
73% (146/200 killed)` kèm danh sách "lurking mutants" — mutation mà test
không phát hiện. Nhược: chậm (mỗi mutation phải compile + chạy test toàn bộ).

---

## 14. Chaos testing — inject failure

> 💡 **Trực giác**: Test thường "happy path". Chaos test cố tình làm gãy
> dependency để xem code resilient không.

### 14.1 Inject failure thủ công

```go
type FlakyHTTPClient struct {
    inner   *http.Client
    failPct int // 0-100
}

func (c *FlakyHTTPClient) Do(req *http.Request) (*http.Response, error) {
    if rand.Intn(100) < c.failPct {
        return nil, errors.New("simulated network error")
    }
    return c.inner.Do(req)
}
```

Test client retry logic với `failPct=50` → kiểm tra exponential backoff hoạt động.

### 14.2 Tools nâng cao

- [`toxiproxy`](https://github.com/Shopify/toxiproxy) — proxy giả lập latency, packet drop, slow connection.
- [`pumba`](https://github.com/alexei-led/pumba) — chaos cho Docker container.
- Linux `tc qdisc` — inject latency/loss ở network layer.

---

## 15. Common pitfall — tổng kết

| Pitfall | Hậu quả | Fix |
|---------|---------|-----|
| Test phụ thuộc thứ tự (order-dependent) | Flaky, fail khi shuffle | Reset state mỗi test |
| Shared state giữa test | Race, flaky | `t.TempDir()`, `t.Cleanup` |
| `time.Sleep` thay sync | Flaky trên CI chậm | `sync.WaitGroup`, channel |
| Gọi network thật trong test | Chậm + flaky | `httptest`, mock |
| Test không deterministic (time, UUID, map order) | Golden file lúc khác lúc giống | Inject clock, sort, freeze |
| Coverage là KPI cứng | Test filler | Coverage là tool, không phải goal |
| Quên commit `testdata/fuzz/<>` | Bug regression | Add to git |
| `t.Errorf` lúc cần `t.Fatalf` | Test tiếp tục với state hỏng | `Fatalf` cho precondition |

---

## 📝 Tóm tắt lesson

- **Fuzz** (Go 1.18+) tự sinh input tìm crash/invariant violation, lưu vào
  `testdata/fuzz/<>` để regression.
- **Property-based** test invariant với input ngẫu nhiên thay vì case cụ thể.
- **`go test -race`** detect data race tại runtime, chậm 5-10x, dùng test/CI
  không dùng prod.
- **Integration test** tách qua build tag `//go:build integration`.
- **3 chiến lược test external**: mock (nhanh), fake (vừa), testcontainer (thật).
- **Golden file** cho output dài, có flag `-update` để regenerate.
- **`httptest.NewRecorder`** test handler, **`httptest.NewServer`** test client.
- **Parallel sub-test**: nhớ `tt := tt` shadow (Go < 1.22) và data riêng mỗi test.
- **`t.Cleanup`** per-test, **`TestMain`** per-package.
- **`testdata/`** convention được Go tool bỏ qua khi build.
- **Coverage là tool, không phải KPI** — high coverage có thể đi cùng test
  trivial. Mutation score sâu hơn.
- **Test name = behavior**, không phải implementation.

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Kỹ thuật test nâng cao (integration, fuzzing, golden file, testcontainers) là khác biệt giữa "test cho có" và "test bắt được bug thật trước production".**

| Kỹ thuật | Dùng thật ở đâu |
|----------|-----------------|
| **Integration test (DB/API thật)** | Test repo với Postgres thật trong container (testcontainers) |
| **Fuzzing (`go test -fuzz`)** | Tự sinh input ngẫu nhiên tìm crash/panic — parser, decoder |
| **Golden file** | So output phức tạp (render, JSON) với file mẫu đã duyệt |
| **`httptest`** | Test HTTP handler end-to-end không cần server thật |
| **Benchmark + `-benchmem`** | Theo dõi hiệu năng/cấp phát qua thời gian, chống hồi quy |

### 16.1. Ví dụ cụ thể — fuzzing tìm bug parser

Hàm parse (URL, JSON, protocol) dễ panic với input lạ. Fuzzing tự sinh hàng triệu input:

```go
func FuzzParse(f *testing.F) {
	f.Add("valid input")          // seed
	f.Fuzz(func(t *testing.T, s string) {
		_ = Parse(s)               // không được panic với BẤT KỲ input nào
	})
}
// go test -fuzz=FuzzParse  → chạy tới khi tìm input gây crash
```

Go tự đột biến input, lưu lại case gây fail vào `testdata/`. Fuzzing tìm ra edge case con người không nghĩ tới (chuỗi rỗng, unicode lạ, số khổng lồ). Đây là cách stdlib Go + nhiều thư viện bảo mật tìm bug parser/decoder trước khi kẻ tấn công tìm ra.

> 💡 **Test pyramid trong thực tế.** Nhiều **unit test** (nhanh, chạy mỗi save), ít hơn **integration** (DB/API thật, chạy CI), rất ít **e2e** (chậm, dễ flaky). Đảo ngược (nhiều e2e) = CI chậm + flaky. Integration test với **testcontainers** (DB thật trong Docker) cân bằng tốt: gần production hơn mock, vẫn tự động được.

### 16.2. 📝 Tóm tắt mục 16

- Test nâng cao: **integration** (DB thật/testcontainers), **fuzzing** (`-fuzz` tìm crash parser), **golden file**, **httptest**, benchmark chống hồi quy.
- Fuzzing tự sinh input tìm edge case con người bỏ sót → bắt panic parser/decoder.
- Test pyramid: nhiều unit (nhanh) → ít integration → rất ít e2e (chậm/flaky).

## Bài tập

### BT1 — Fuzz test cho `Parse`

Viết fuzz test cho hàm `Parse(s string) (map[string]string, error)` (chuỗi
"k=v;k=v"). Chạy 30 giây. Phát hiện input gây panic và fix code.

### BT2 — Property test cho `Sort` idempotent

Implement `SortInts(s []int) []int` và viết property-based test:
- `Sort(Sort(s)) == Sort(s)` (idempotent)
- `len(Sort(s)) == len(s)`
- `sort.IntsAreSorted(Sort(s))` = true
- `multiset(Sort(s)) == multiset(s)` (giữ nguyên phần tử)

Chạy với 200 input random, mỗi input độ dài 0-50.

### BT3 — Race detector

Cho code sau (cố ý có race):

```go
type Counter struct{ n int }
func (c *Counter) Inc() { c.n++ }
```

Viết test khởi 1000 goroutine cùng `Inc()`, expected `n == 1000`. Chạy
`go test -race` để confirm có race. Fix bằng 2 cách: atomic và mutex.

### BT4 — Golden file cho HTML template

Tạo hàm `RenderReport(r Report) (string, error)` render template HTML.
Viết test golden so output với `testdata/golden/report.golden`. Flag
`-update` để regenerate. Test edge case: Users rỗng.

### BT5 — `httptest` server cho HTTP client

Viết `EchoHandler` echo lại query `msg`. Viết `Client.GetEcho(msg)` gọi
endpoint. Test client bằng `httptest.NewServer`:
- Happy path: msg="hi" → return "hi"
- Server trả 500 → client return error
- Server timeout (sleep > client timeout) → return error

### BT6 — Parallel sub-test với cleanup

Viết test table-driven 8 case, mỗi case `t.Parallel()`. Mỗi sub-test:
- Tạo `t.TempDir()`
- Ghi file input
- Đọc lại + reverse + assert
- `t.Cleanup` log "[name] cleanup done"

Confirm: chạy `go test -v` thấy sub-test interleave (parallel).

---

## Lời giải chi tiết

### Lời giải BT1 — Fuzz test cho `Parse`

**Cách tiếp cận**: chỉ assert invariant "không panic", để fuzzer tự tìm input
ác hiểm.

```go
func FuzzParse(f *testing.F) {
    for _, s := range []string{"", "a=1", "a=1;b=2", ";;", "a=", "=b"} {
        f.Add(s)
    }
    f.Fuzz(func(t *testing.T, s string) {
        _, _ = Parse(s) // không expect lỗi cụ thể, chỉ KHÔNG PANIC
    })
}
```

Chạy `go test -fuzz=FuzzParse -fuzztime=30s`. Fuzzer mutate seed corpus.
Sau ~3s, tìm thấy `";;"` (segment rỗng) → panic vì code cũ làm
`seg[0:idx]` với idx=-1.

**Bug ban đầu**:
```go
idx := strings.Index(seg, "=")
k, v := seg[:idx], seg[idx+1:] // idx=-1 → panic slice bounds
```

**Fix** (xem `solutions.go`):
```go
for _, seg := range strings.Split(s, ";") {
    if seg == "" { continue } // bỏ qua segment rỗng
    idx := strings.Index(seg, "=")
    if idx < 0 { return nil, fmt.Errorf("...") }
    // ...
}
```

Lưu input crash vào `testdata/fuzz/FuzzParse/<hash>`. Lần test sau chạy
case này tự động.

**Độ phức tạp**: $O(n)$ trên độ dài string. Fuzz time scale với compute budget.

### Lời giải BT2 — Sort idempotent

Xem `TestSortInts_Idempotent` trong `solutions_test.go`:

```go
for i := 0; i < 100; i++ {
    n := rand.Intn(50)
    in := make([]int, n)
    for j := range in { in[j] = rand.Intn(1000) - 500 }
    once := SortInts(in)
    twice := SortInts(once)
    if !equalInt(once, twice) { t.Errorf(...) }
    if !sort.IntsAreSorted(once) { t.Errorf(...) }
    if len(once) != len(in) { t.Errorf(...) }
}
```

Idempotent: vì `once` đã sorted, sort lần 2 là no-op → bằng. Length giữ
nguyên vì `SortInts` chỉ sort, không thêm/bớt.

**Walk-through input `[3, 1, 2, 1]`**:
- `once = [1, 1, 2, 3]`
- `twice = SortInts([1, 1, 2, 3]) = [1, 1, 2, 3]` (đã sorted, sort = no-op)
- `once == twice` ✓
- `sort.IntsAreSorted(once) = true` ✓
- `len = 4` ✓

**Multiset invariant** (đề bài có nhắc): có thể thêm:
```go
sumIn, sumOut := 0, 0
for _, x := range in { sumIn += x }
for _, x := range once { sumOut += x }
if sumIn != sumOut { t.Errorf("mất phần tử") }
```
(Tổng là invariant yếu — tốt hơn dùng map count.)

**Độ phức tạp**: 100 iter × $O(n \log n)$, n ≤ 50 → ~rất nhanh.

### Lời giải BT3 — Race detector

Code có race (xem `UnsafeCounter`):

```go
type UnsafeCounter struct{ n int }
func (c *UnsafeCounter) Inc() { c.n++ }
```

Test phát hiện race:
```go
func TestUnsafe_RaceDemo(t *testing.T) {
    if os.Getenv("RACE_DEMO") != "1" { t.Skip() }
    var wg sync.WaitGroup
    uc := &UnsafeCounter{}
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() { defer wg.Done(); uc.Inc() }()
    }
    wg.Wait()
    t.Logf("Got %d (expected ≤ 1000, often less)", uc.Val())
}
```

Chạy `RACE_DEMO=1 go test -race -run=TestUnsafe -v` — Go in:

```
WARNING: DATA RACE
Write at 0x... by goroutine 8: Inc()
Previous read at 0x... by goroutine 7: Inc()
```

**Fix 1 — atomic** (best cho counter đơn lẻ):
```go
type SafeCounter struct{ n atomic.Int64 }
func (c *SafeCounter) Inc()      { c.n.Add(1) }
func (c *SafeCounter) Val() int64 { return c.n.Load() }
```

**Fix 2 — mutex** (best cho critical section nhiều bước):
```go
type MutexCounter struct {
    mu sync.Mutex
    n  int
}
func (c *MutexCounter) Inc() { c.mu.Lock(); c.n++; c.mu.Unlock() }
```

So sánh: atomic nhanh hơn (~5ns) vs mutex (~25ns), nhưng atomic chỉ với 1
biến đơn. Critical section dài thì mutex.

### Lời giải BT4 — Golden file HTML template

Xem `TestRenderReport_Golden`:

```go
var updateGolden = flag.Bool("update", false, "rewrite golden")

func TestRenderReport_Golden(t *testing.T) {
    r := Report{Title: "Báo cáo tháng 5", Users: []string{"alice","bob","chi"}, Total: 3}
    got, _ := RenderReport(r)
    goldenPath := filepath.Join("testdata", "golden", "report.golden")

    if *updateGolden {
        os.MkdirAll(filepath.Dir(goldenPath), 0o755)
        os.WriteFile(goldenPath, []byte(got), 0o644)
        return
    }
    want, err := os.ReadFile(goldenPath)
    if err != nil { t.Fatalf("chạy: go test -run=Golden -update") }
    if got != string(want) {
        t.Errorf("output != golden\nGot:\n%s\nWant:\n%s", got, want)
    }
}
```

Workflow:
1. `go test -run=Golden -update` → tạo file.
2. `cat testdata/golden/report.golden` review nội dung.
3. `git add testdata/golden/ && git commit`.
4. Lần sau `go test` so byte với file.

**Edge case Users rỗng**: thêm sub-test:
```go
t.Run("empty_users", func(t *testing.T) {
    got, _ := RenderReport(Report{Title: "Empty", Total: 0})
    // assert chứa `<ul></ul>` chứ không panic
})
```

### Lời giải BT5 — `httptest` server

```go
func TestClient_Happy(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(EchoHandler))
    t.Cleanup(srv.Close)
    c := &Client{BaseURL: srv.URL}
    got, err := c.GetEcho("hi")
    if err != nil { t.Fatal(err) }
    if got != "hi" { t.Errorf("got=%q", got) }
}

func TestClient_500(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        http.Error(w, "boom", 500)
    }))
    t.Cleanup(srv.Close)
    c := &Client{BaseURL: srv.URL}
    if _, err := c.GetEcho("hi"); err == nil {
        t.Error("expect error khi server 500")
    }
}

func TestClient_Timeout(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        time.Sleep(200 * time.Millisecond)
        fmt.Fprintf(w, `{"echo":"slow"}`)
    }))
    t.Cleanup(srv.Close)
    c := &Client{
        BaseURL: srv.URL,
        HTTP:    &http.Client{Timeout: 50 * time.Millisecond},
    }
    if _, err := c.GetEcho("hi"); err == nil {
        t.Error("expect timeout error")
    }
}
```

Key: `t.Cleanup(srv.Close)` đảm bảo port giải phóng dù test fail/panic.

### Lời giải BT6 — Parallel sub-test với cleanup

Xem `TestParallelSubtests`:

```go
func TestParallelSubtests(t *testing.T) {
    cases := []struct{ name, in, want string }{
        {"empty", "", ""},
        {"ascii", "go", "og"},
        {"utf8", "café", "éfac"},
        {"cjk", "日本語", "語本日"},
    }
    for _, tt := range cases {
        tt := tt // SHADOW — quan trọng
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()
            dir := t.TempDir() // tự cleanup
            f := filepath.Join(dir, "input.txt")
            os.WriteFile(f, []byte(tt.in), 0o644)
            t.Cleanup(func() { t.Logf("[%s] cleanup", tt.name) })

            data, _ := os.ReadFile(f)
            if got := Reverse(string(data)); got != tt.want {
                t.Errorf("Reverse(%q) = %q, want %q", tt.in, got, tt.want)
            }
        })
    }
}
```

Output cho thấy interleave (parallel):
```
=== PAUSE TestParallelSubtests/empty
=== PAUSE TestParallelSubtests/ascii
=== PAUSE TestParallelSubtests/utf8
=== PAUSE TestParallelSubtests/cjk
=== CONT  TestParallelSubtests/empty
=== CONT  TestParallelSubtests/ascii
...
```

**Quan trọng**: bỏ `tt := tt` (với Go < 1.22) → tất cả sub-test thấy `tt =
{"cjk", ...}` → test pass nhưng KHÔNG verify case khác.

---

## Code & Minh hoạ

- **Code Go**: [`solutions.go`](./solutions.go) + [`solutions_test.go`](./solutions_test.go) + [`solutions_integration_test.go`](./solutions_integration_test.go)
- **Chạy test**:
  ```bash
  go test -v                            # unit test
  go test -race -v                      # race detector
  go test -tags=integration -v          # integration
  go test -fuzz=FuzzReverse -fuzztime=10s
  go test -run=Golden -update           # regenerate golden
  go test -cover                        # coverage
  ```
- **Minh hoạ trực quan**: [`visualization.html`](./visualization.html) —
  3 module: Fuzz Finder (sinh input, mutation, tìm crash), Race Detector
  (2 goroutine truy cập same memory, race detected), Golden File Workflow
  (actual vs golden compare, flag `-update`).

---

## Bài tiếp theo

- [Lesson 38 — Mocking & Test Doubles](../lesson-38-mocking-test-doubles/) (dependency injection, interface mocking, gomock vs handwritten).

## Tham khảo

- [Go Testing — Official tutorial fuzz](https://go.dev/doc/tutorial/fuzz)
- [Go memory model](https://go.dev/ref/mem)
- [Mitchell Hashimoto — Advanced Testing in Go (GopherCon)](https://www.youtube.com/watch?v=8hQG7QlcLBk)
- [testcontainers-go](https://golang.testcontainers.org/)
- [Gremlins — Mutation testing for Go](https://gremlins-dx.io/)
