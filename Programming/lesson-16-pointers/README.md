# Lesson 16 — Pointer trong Go

Tier 1 — Go Basic. Sau bài này, bạn sẽ hiểu **pointer là gì, khi nào dùng, khi nào tránh, và vì sao Go không có pointer arithmetic như C**. Hết bài, các đoạn code dạng `r *http.Request`, `json.Unmarshal(data, &user)`, `sql.Scan(&user.Name)` sẽ thôi cảm giác "ma thuật" — bạn sẽ biết chính xác chúng đang làm gì với memory.

## Mục tiêu học tập

- Phát biểu được pointer là gì bằng ngôn ngữ "tên / địa chỉ", không chỉ định nghĩa hàn lâm.
- Đọc và viết được syntax `&x`, `*p`, `*int` chính xác — phân biệt được khi nào `*` là toán tử khi nào là phần của type.
- Biết khi nào pass-by-pointer là cần thiết (mutate, struct lớn, optional, method receiver, interface), khi nào pass-by-value rẻ hơn và rõ hơn.
- Bẫy phổ biến: nil pointer dereference, quên `&` khi unmarshal/scan, modify struct trong map.
- Hiểu sơ về **escape analysis** — vì sao `return &x` trong Go vẫn an toàn (khác C).
- Giải thích được vì sao Go bỏ pointer arithmetic, và khi nào (hiếm) cần `unsafe`.

## Kiến thức tiền đề

- [Lesson 11 — Hàm](../lesson-11-functions/README.md): hiểu pass-by-value mặc định.
- [Lesson 12 — Array & Slice](../lesson-12-arrays-slices/README.md): slice là header — đã có ý niệm "tham chiếu trong Go".
- [Lesson 15 — Struct & Method](../lesson-15-struct-method/README.md): biết khai báo struct, value receiver vs pointer receiver.

## 1. Pointer là gì? — "tên" thay vì "thân"

> 💡 **Trực giác.** Hình dung một văn phòng cao ốc. Mỗi nhân viên ngồi ở một bàn (memory cell) có số (địa chỉ). Khi sếp nói "đưa cho Alice", có 2 cách:
>
> 1. **Pass-by-value** — sếp photocopy hồ sơ rồi đưa qua người khác. Nếu người đó ghi chú lên bản copy, bản gốc trên bàn Alice không đổi.
> 2. **Pass-by-pointer** — sếp đưa cho người kia *số bàn* của Alice. Người đó đi tới bàn đúng số đó và ghi trực tiếp lên hồ sơ thật.
>
> Pointer = "số bàn". Biến thường = "bản copy". Đó là tất cả ý tưởng.

**Định nghĩa hình thức.** Một **pointer** là một biến mà giá trị của nó là **địa chỉ memory** của một biến khác.

```go
x := 42        // x là biến int, giả sử nằm ở địa chỉ 0xc000018090
p := &x        // p là pointer to int, p == 0xc000018090
fmt.Println(*p) // dereference: lấy giá trị tại địa chỉ p trỏ tới → 42
*p = 99        // ghi vào địa chỉ p trỏ tới → x đổi thành 99
fmt.Println(x) // 99
```

Hai điểm cốt lõi:

- **`&x`** — toán tử "address-of": trả về địa chỉ của biến `x`. Kiểu của `&x` là `*T` nếu `x` kiểu `T`.
- **`*p`** — toán tử "dereference": với `p` kiểu `*T`, `*p` trả về giá trị `T` tại địa chỉ đó. `*p` còn dùng được ở vế trái: `*p = 99` = "ghi vào ô memory đó".

> ⚠ **Lỗi thường gặp khi mới học.** `*` xuất hiện ở 2 chỗ rất khác nhau:
> - Trong **kiểu**: `var p *int` — đọc là "p là pointer to int". `*int` là một type.
> - Trong **biểu thức**: `*p` — đọc là "dereference p". Là toán tử unary.
> Cùng ký tự, hai nghĩa. Compiler phân biệt qua context (ở vị trí khai báo type hay vị trí biểu thức).

### Ví dụ số cụ thể — 4 biến

```go
a, b := 10, 20
pa := &a
pb := &b

fmt.Println(pa, pb)   // 0xc000018090 0xc000018098 (địa chỉ khác nhau)
fmt.Println(*pa, *pb) // 10 20

*pa = 100
*pb = *pa + *pb       // b = 100 + 20 = 120
fmt.Println(a, b)     // 100 120
```

Quan sát: `pa` và `pb` có địa chỉ liền kề nhau (cách 8 byte trên 64-bit) vì `a` và `b` declare cùng lúc, compiler đặt cạnh trên stack frame. Đây không phải spec — chỉ là quan sát chạy thật.

> ❓ **Câu hỏi tự nhiên: "Vậy `p` chiếm bao nhiêu byte?"** Trên máy 64-bit: 8 byte (bằng `unsafe.Sizeof(p)`). Trên máy 32-bit: 4 byte. Bằng nhau bất kể `*int`, `*User`, `*[1024]byte` — vì pointer chỉ lưu địa chỉ, không lưu dữ liệu.

### Ví dụ thực tế #1 — `sql.Scan` cần `&`

```go
var name string
var age int
err := row.Scan(&name, &age) // PHẢI có & — Scan ghi vào địa chỉ name và age
```

Nếu viết `row.Scan(name, age)` (không `&`): Scan nhận **copy** của `name` (= rỗng) và `age` (= 0). Scan ghi vào copy đó. Sau khi `Scan` return, copy bị vứt. `name` và `age` của bạn không thay đổi. Đây là bug ngầm, compiler có thể không báo (nếu Scan nhận `interface{}`).

> 🔁 **Dừng lại tự kiểm tra.**
> ```go
> x := 5
> y := &x
> z := *y + 3
> *y = 10
> fmt.Println(x, z)
> ```
> Output là gì?
>
> <details><summary>Đáp án</summary>
>
> `10 8`. Giải thích:
> - `y := &x` → `y` là pointer trỏ tới `x`.
> - `z := *y + 3` → `*y` = giá trị tại địa chỉ y = 5. `z = 5 + 3 = 8`. Lưu ý `z` là int thường, không phải pointer.
> - `*y = 10` → ghi 10 vào ô memory mà `y` trỏ tới → `x` thành 10.
> - `z` không đổi vì `z` được copy giá trị 8 ngay tại lúc gán, không phụ thuộc x nữa.
> </details>

## 2. Zero value của pointer là `nil`

Mọi pointer chưa khởi tạo có giá trị `nil`:

```go
var p *int
fmt.Println(p == nil) // true
fmt.Println(p)        // <nil>
```

**Dereference nil pointer → runtime panic** (KHÔNG phải compile error, vì compiler không biết tới runtime p có nil hay không):

```go
var p *int
fmt.Println(*p) // runtime error: invalid memory address or nil pointer dereference
```

> 💡 **Trực giác về panic này.** "Số bàn không hợp lệ" — bạn cầm tờ giấy ghi "đi tới bàn số 0" rồi đi tới đó, nhưng không có bàn nào số 0. CPU đọc địa chỉ 0 → OS thấy đây là vùng cấm → kernel gửi tín hiệu SIGSEGV → Go runtime bắt → panic.

> ⚠ **Lỗi cực kỳ phổ biến.**
> ```go
> type User struct{ Name string }
> func findUser(id int) *User {
>     if id == 0 { return nil }
>     return &User{Name: "Alice"}
> }
> u := findUser(0)
> fmt.Println(u.Name) // panic!
> ```
> Cách sửa:
> ```go
> u := findUser(0)
> if u != nil {
>     fmt.Println(u.Name)
> }
> ```
> Hoặc thiết kế hàm để trả về `(User, error)` thay vì `*User` có thể nil.

### Vì sao Go cho phép nil dereference panic ở runtime, không bắt compile time?

Vì compiler không thể biết trước. Hàm `findUser` có thể trả về nil hoặc không tuỳ data runtime. Đây là điểm yếu so với Rust (có `Option<T>`) hay Kotlin (có `T?` non-null types). Go đánh đổi đơn giản lấy an toàn.

## 3. `new(T)` vs `&T{}`

Hai cách tạo pointer trỏ tới một giá trị mới:

```go
// Cách 1: dùng new
p1 := new(int) // p1 là *int trỏ tới int zero value (0)
*p1 = 42

// Cách 2: dùng & + composite literal
p2 := new(User)            // *User trỏ tới zero value của User
p3 := &User{Name: "Alice"} // *User trỏ tới User mới khởi tạo
```

**Quy tắc thực tế:**
- Với **struct**: hầu như luôn dùng `&User{...}` — gọn, cho phép init field cùng lúc.
- `new(T)` chỉ hữu dụng khi cần `*int`, `*string`, `*bool` trỏ tới zero value mà không init gì đặc biệt.
- Trong code Go thực tế bạn đọc, `new` xuất hiện **rất hiếm** — ưu tiên `&T{}`.

```go
// Tạo *int có giá trị 5:
n := 5
p := &n
// Hoặc:
p := new(int); *p = 5

// Cách thứ 2 dài hơn → không ai dùng. Dùng cách 1.
```

## 4. Pass-by-value vs pass-by-pointer

**Quy tắc tuyệt đối của Go: mọi tham số hàm đều pass-by-value.** Không có pass-by-reference như C++. Khi pass `p *User`, cái được copy là **giá trị của pointer (= địa chỉ)**, không phải User. Nhưng vì cả caller và callee đều giữ địa chỉ giống nhau → cả hai dereference tới cùng struct → mutate qua một bên thì bên kia thấy.

```go
func incVal(x int)  { x += 1 }
func incPtr(p *int) { *p += 1 }

n := 10
incVal(n);   fmt.Println(n) // 10 — không đổi
incPtr(&n);  fmt.Println(n) // 11 — đổi
```

### Pass slice / map / chan / func / string / interface

Đây là 6 loại "reference-like" — header nhỏ chứa pointer ngầm tới underlying data:

| Type | Header chứa | Pass thì copy gì? | Mutate có "lan" ra caller? |
|------|-------------|-------------------|---------------------------|
| `[]int` (slice) | ptr + len + cap | 24 byte | **`s[i] = v` lan** (cùng underlying array). `append` có thể không lan. |
| `map[K]V` | ptr tới hash table | 8 byte (chỉ ptr) | **Có lan** — `m[k] = v` thấy ở caller |
| `chan T` | ptr | 8 byte | Có lan (channel là handle) |
| `func(...)` | ptr code + closure | 8 byte | N/A |
| `string` | ptr + len | 16 byte | Immutable nên không mutate được |
| `interface{}` | type ptr + data ptr | 16 byte | Tuỳ underlying |

→ **Hầu hết trường hợp KHÔNG cần pointer khi pass slice/map.** Trừ khi muốn reassign chính cái slice/map.

```go
func appendBad(s []int)  { s = append(s, 99) }   // có thể không lan ra caller!
func appendGood(s *[]int) { *s = append(*s, 99) } // chắc chắn lan

xs := []int{1,2,3}
appendBad(xs);   fmt.Println(xs) // có thể [1 2 3] hoặc [1 2 3 99] tuỳ cap
appendGood(&xs); fmt.Println(xs) // luôn [1 2 3 99]
```

> ❓ **Vì sao `appendBad` lúc lan lúc không?** `append` nếu còn `cap` thì ghi vào underlying array → caller thấy. Nếu hết cap → alloc array mới → callee giữ slice mới, caller vẫn giữ slice cũ. Đây là 1 trong các "gotcha" hàng đầu của Go, đã bàn kỹ ở [Lesson 12](../lesson-12-arrays-slices/README.md).

### Benchmark: pass struct lớn

```go
type Big struct {
    Data [128]int64 // 1024 byte
}

func byValue(b Big)   { _ = b.Data[0] }
func byPointer(b *Big) { _ = b.Data[0] }

func BenchmarkByValue(b *testing.B)   { x := Big{}; for i:=0; i<b.N; i++ { byValue(x) } }
func BenchmarkByPointer(b *testing.B) { x := Big{}; for i:=0; i<b.N; i++ { byPointer(&x) } }
```

Kết quả thực tế (Go 1.22, M1):
```
BenchmarkByValue-8     180000000   6.8 ns/op   // copy 1024 byte
BenchmarkByPointer-8  1000000000   0.5 ns/op   // copy 8 byte
```

Chênh ~13×. Với struct vài KB, dùng pointer là gần như bắt buộc. Với struct nhỏ (int, time.Time 24 byte), copy rẻ — pass by value rõ hơn.

> ⚠ **Lưu ý.** "Lớn" ở đây tương đối. Rule of thumb: **>~100 byte** thì cân nhắc pointer. Nhưng đo trước khi tin — copy 64 byte trong L1 cache vẫn rất nhanh.

> 🔁 **Tự kiểm tra.**
> ```go
> func f(s []int) { s[0] = 99 }
> xs := []int{1,2,3}
> f(xs); fmt.Println(xs)
> ```
> Output là gì? Đây có phải pass-by-reference không?
>
> <details><summary>Đáp án</summary>
>
> Output `[99 2 3]`. Đây **vẫn là pass-by-value** — Go copy slice header. Nhưng header chứa pointer tới underlying array → cả hai header trỏ tới cùng array → `s[0] = 99` ghi vào array đó → caller thấy. Không phải reference semantics, chỉ là hệ quả của việc share underlying array.
> </details>

## 5. Khi nào dùng pointer — 5 trường hợp

### 5.1. Cần mutate biến của caller

Đây là lý do "kinh điển":

```go
func swap(a, b *int) { *a, *b = *b, *a }
```

Ví dụ thực tế:
- `fmt.Scan(&x)` — đọc input vào x.
- `json.Unmarshal(data, &user)` — parse JSON vào user.
- `sql.Row.Scan(&name, &age)` — đọc row vào biến.
- `flag.IntVar(&port, "port", 8080, ...)` — đăng ký flag, sau khi Parse() port có giá trị.

### 5.2. Struct lớn — tránh copy đắt

```go
type Request struct {
    Headers map[string]string
    Body    []byte
    Conn    net.Conn
    // ... 20+ field khác
}

// Mọi handler nhận *Request, không phải Request:
func handle(r *Request) error { ... }
```

`http.Request` trong stdlib khá lớn (~300 byte). `net/http` luôn pass `*http.Request` — vừa rẻ vừa cho phép handler mutate request (vd `r.WithContext(ctx)`).

### 5.3. Method receiver mutate

```go
type Counter struct { n int }

func (c *Counter) Inc() { c.n++ }   // pointer receiver — mutate
func (c Counter)  Get() int { return c.n } // value receiver — read-only

c := Counter{}
c.Inc()       // OK — Go tự lấy &c (c phải là addressable)
fmt.Println(c.Get()) // 1
```

Quy tắc: **nếu một method mutate state, dùng pointer receiver.** Nếu read-only và struct nhỏ, value receiver OK (và thread-safe hơn).

Consistency rule: nếu **một** method của type dùng pointer receiver, các method khác cũng nên pointer (để interface satisfaction nhất quán — sẽ học L18).

### 5.4. Optional value — distinguish "không set" vs "set = 0"

Go không có `null` cho primitive type. Số 0 là giá trị hợp lệ của int. Vậy làm sao phân biệt "chưa set" với "set = 0"?

```go
type Config struct {
    Timeout *int // nil = chưa set; *Timeout = 0 → set rõ ràng là 0
    Retries *int
}

func defaultInt(p *int, def int) int {
    if p == nil { return def }
    return *p
}

cfg := Config{}
// cfg.Timeout == nil → dùng default
timeout := defaultInt(cfg.Timeout, 30)
```

Đây là pattern nhỏ-nhưng-quen-thuộc khi parse JSON/YAML. Trong DB context, Go có lựa chọn chuyên dụng: `sql.NullInt64`, `sql.NullString` — struct 2 field `{Valid bool; Value T}`. Sạch hơn `*T` vì không panic khi dereference nhầm.

### 5.5. Interface satisfaction yêu cầu pointer

```go
type Stringer interface { String() string }

type T struct{}
func (t *T) String() string { return "ptr" }

var s Stringer = T{}  // KHÔNG compile — value T không thoả Stringer, chỉ *T thoả
var s Stringer = &T{} // OK
```

Lý do: method set của `T` không bao gồm method có pointer receiver. Sẽ học kỹ ở [Lesson 18 — Interface](../lesson-18-interface/README.md) (chưa tồn tại tại thời điểm bạn đọc).

## 6. Khi nào KHÔNG dùng pointer

- **Struct nhỏ** (≤ 64 byte tầm `int`, `time.Time` 24 byte, `image.Point` 16 byte): pass by value rẻ, không cần dereference, không có nil-check.
- **Immutable value** (string, time đã set): pointer chỉ thêm rối, không cải thiện gì.
- **Khi không cần optional**: nếu int 0 là hợp lệ và không cần phân biệt "chưa set" — dùng `int`, không phải `*int`.
- **Phơi pointer ra public API mà không cần**: caller phải nil-check khắp nơi. Trả về `(T, error)` rõ ràng hơn `*T` có thể nil.

> ⚠ **Anti-pattern: pointer khắp nơi vì "tưởng rẻ".**
> ```go
> type Point struct{ X, Y float64 }  // 16 byte
> func dist(a, b *Point) float64 { ... } // KHÔNG cần
> ```
> Pass-by-value `(a, b Point)` ở đây copy 32 byte — vẫn nhanh hơn dereference + chiếm 1 register cho pointer. Đo trước khi premature-optimize.

## 7. Nil pointer panic — top bug của Go

Theo nhiều khảo sát, **nil pointer dereference** là 1 trong 3 bug runtime hay gặp nhất khi viết Go (cùng với data race và slice index out of range). Vì sao?

Vì Go không có `Option` type, mọi `*T` đều ngầm "có thể nil". Compiler không bắt được. Bạn phải tự kỷ luật.

**Pattern phòng ngừa:**

```go
// Pattern 1: trả về (T, error) thay vì *T có thể nil
func findUser(id int) (User, error) { ... }

// Pattern 2: nếu phải trả *T, document rõ
// findUser returns nil if user not found.
func findUser(id int) *User { ... }

// Pattern 3: nil-check ngay sau call
u := findUser(id)
if u == nil { return errors.New("not found") }
// từ đây dùng u an toàn

// Pattern 4: dùng linter
// nilaway, nilness từ staticcheck — bắt nhiều case nil deref ở compile time
```

> ❓ **`var s []int; s = append(s, 1)` có panic không?** Không. Slice nil không phải pointer thường — append xử lý nil như slice rỗng. Tương tự `len(nil_slice) == 0`, `range nil_slice` chạy 0 lần. Đây là điểm "thiết kế tốt" của Go — nil-safe cho slice. Nhưng `var m map[string]int; m["k"] = 1` thì panic vì map nil không tự alloc khi ghi.

## 8. Pointer to pointer `**T`

Hiếm khi cần. Use case duy nhất phổ biến: function cần **reassign chính pointer của caller**.

```go
type Node struct { Next *Node; Val int }

// Bad — không thay được caller's head
func prepend(head *Node, v int) { head = &Node{Val: v, Next: head} }

// Good — caller's head được cập nhật
func prependCorrect(head **Node, v int) { *head = &Node{Val: v, Next: *head} }
```

Hoặc design lại để return: `func prepend(head *Node, v int) *Node` — gọi `head = prepend(head, v)`. Cách này phổ biến hơn, tránh `**T`.

## 9. Stack vs Heap & Escape Analysis (preview, học sâu ở L30)

> 💡 **Trực giác.** Khi bạn declare `x := 5` trong một hàm, x có thể "sống" ở 1 trong 2 chỗ:
> - **Stack** — vùng nhớ gắn với call frame của hàm. Khi hàm return, frame bị thu, x tự biến mất. Rất rẻ (chỉ trừ stack pointer).
> - **Heap** — vùng nhớ chung của process. Cần GC dọn rác khi hết tham chiếu. Đắt hơn (cấp phát + dọn).

Compiler Go quyết định x nằm đâu bằng **escape analysis**: x có "thoát" ra ngoài lifetime của hàm không?

```go
func foo() int {
    x := 5
    return x   // x copy giá trị về caller, x bản gốc chết → stack OK
}

func bar() *int {
    x := 5
    return &x  // địa chỉ x thoát ra → x phải sống lâu hơn hàm → heap
}
```

Trong C, `return &x` từ hàm là **bug nghiêm trọng** — dangling pointer, undefined behavior. Trong Go, compiler tự phát hiện `x` escape → chuyển x sang heap → an toàn. Bạn không cần lo về lifetime như C/C++.

**Kiểm tra escape analysis:**

```bash
go build -gcflags="-m" ./...
```

Output ví dụ:
```
./main.go:5:2: moved to heap: x
./main.go:10:9: &User{...} escapes to heap
```

**Hệ quả thực tế:**
- Quá nhiều `&` không cần thiết → quá nhiều heap allocation → tăng tải GC → giảm performance.
- Khi tối ưu hot path: nhìn `-gcflags="-m"`, tìm escape không cần thiết.
- Đây là chủ đề riêng — sẽ học kỹ ở Lesson 30.

> ❓ **"Vậy `return &x` trong Go có chậm hơn C không?"** Hơi chậm hơn (vì alloc trên heap thay vì stack), nhưng **đúng và an toàn**. Trong C bạn không bao giờ làm thế. Trade-off Go chọn: hơi chậm hơn 1 chút để khử cả lớp bug.

## 10. Address arithmetic — KHÔNG CÓ trong Go

Trong C:
```c
int arr[10];
int *p = arr;
p++;       // OK — p giờ trỏ tới arr[1]
*(p + 3);  // OK — = arr[4]
```

Trong Go:
```go
arr := [10]int{}
p := &arr[0]
p++           // COMPILE ERROR: invalid operation: p++ (non-numeric type *int)
p + 3         // COMPILE ERROR
```

**Vì sao Go bỏ?** An toàn memory. 90% buffer overflow trong C đến từ pointer arithmetic. Go thay bằng slice (`arr[1:4]`) — vẫn lấy "cửa sổ" trên array, nhưng có bound check.

**Khi nào thực sự cần?** Hiếm: viết runtime, interop với syscall, low-level optimization. Khi đó dùng package `unsafe`:

```go
import "unsafe"

p := &arr[0]
q := unsafe.Pointer(p)
q = unsafe.Pointer(uintptr(q) + unsafe.Sizeof(arr[0]))
nextElem := *(*int)(q) // = arr[1]
```

Cảnh báo: dùng `unsafe` đồng nghĩa **mất các đảm bảo của Go** (memory safety, portability). Chỉ dùng khi không còn lựa chọn. Sẽ bàn ở Lesson 29.

## 11. Common pitfalls — tránh ngay từ đầu

### Pitfall 1 — quên `&` khi unmarshal/scan

```go
type User struct{ Name string }
var u User
json.Unmarshal(data, u)  // BUG: unmarshal vào COPY của u, u gốc không đổi
json.Unmarshal(data, &u) // OK
```

Tệ hơn: nếu `Unmarshal` lấy `interface{}` (đúng như trong stdlib), compiler không báo. Bạn chỉ phát hiện khi log ra thấy u rỗng. **Quy tắc**: bất kỳ hàm nào "ghi vào biến của bạn" — pass địa chỉ.

### Pitfall 2 — return pointer to local trong Go: OK

```go
func newUser(name string) *User {
    u := User{Name: name}
    return &u // OK — Go tự phát hiện escape → alloc trên heap
}
```

Trong C: undefined behavior. Trong Go: an toàn. Nhưng hiểu là đang trả về heap-allocated user, không phải stack — có overhead nhỏ.

### Pitfall 3 — modify struct value của map (đã bàn ở L13)

```go
type User struct { Age int }
m := map[string]User{"alice": {Age: 30}}
m["alice"].Age = 31 // COMPILE ERROR: cannot assign to struct field m["alice"].Age in map

// Cách 1: copy ra, sửa, đặt lại
u := m["alice"]; u.Age = 31; m["alice"] = u

// Cách 2: dùng map of pointer
m2 := map[string]*User{"alice": {Age: 30}}
m2["alice"].Age = 31 // OK
```

Lý do: map có thể rehash → địa chỉ entry không ổn định → Go cấm địa chỉ hoá entry.

### Pitfall 4 — loop variable & pointer (Go < 1.22)

```go
type T struct{ X int }
var ptrs []*T
for _, v := range []T{{1},{2},{3}} {
    ptrs = append(ptrs, &v) // Go < 1.22: tất cả ptrs trỏ về CÙNG biến v
}
// ptrs[0].X == ptrs[1].X == ptrs[2].X == 3 (giá trị cuối)
```

Go 1.22 đã sửa: mỗi iteration có biến `v` riêng. Nhưng code cũ vẫn còn — biết để debug.

## 📝 Tóm tắt

- Pointer = biến chứa địa chỉ của biến khác. `&x` lấy địa chỉ, `*p` dereference, `*T` là kiểu pointer.
- Zero value = `nil`. Dereference nil → runtime panic. Luôn nil-check khi pointer có thể nil.
- Go luôn pass-by-value. Pass `*T` = copy địa chỉ → cả hai bên cùng dereference vào 1 chỗ.
- Dùng pointer khi: cần mutate caller, struct lớn, method receiver mutate, optional value, interface satisfaction.
- Không dùng pointer khi: struct nhỏ, immutable, hoặc tạo nullable không cần thiết.
- Go **không có pointer arithmetic** — muốn? Dùng `unsafe` (rất hiếm) hoặc slice.
- `return &x` trong Go an toàn nhờ escape analysis (khác C). Compiler tự chuyển x sang heap.
- Top bugs: quên `&` khi Scan/Unmarshal, nil dereference, modify struct trong map.

## Bài tập

### Bài tập 1 — Đoán output 4 đoạn code

Cho 4 đoạn code, dự đoán output rồi mới chạy:

**(a)**
```go
x := 10
y := &x
*y = 20
fmt.Println(x)
```

**(b)**
```go
func f(x int) { x = 100 }
n := 5; f(n); fmt.Println(n)
```

**(c)**
```go
func f(p *int) { *p = 100 }
n := 5; f(&n); fmt.Println(n)
```

**(d)**
```go
func f(s []int) { s[0] = 100 }
xs := []int{1,2,3}; f(xs); fmt.Println(xs)
```

### Bài tập 2 — Viết hàm `Swap`

Viết hàm `Swap(a, b *int)` đổi giá trị 2 biến qua pointer. Test với `x, y := 1, 2; Swap(&x, &y); fmt.Println(x, y)`.

### Bài tập 3 — Tìm bug

```go
type Config struct { Port int; Host string }
var cfg Config
data := []byte(`{"Port": 8080, "Host": "localhost"}`)
err := json.Unmarshal(data, cfg)
if err != nil { log.Fatal(err) }
fmt.Println(cfg) // in ra gì?
```

Lỗi nằm ở đâu? Sửa thế nào? Output trước và sau khi sửa?

### Bài tập 4 — Linked list reverse

Cho:
```go
type Node struct { Val int; Next *Node }
```

Viết hàm `Reverse(head *Node) *Node` đảo ngược linked list. Test với list `1 → 2 → 3 → 4` phải ra `4 → 3 → 2 → 1`.

### Bài tập 5 — Optional int

Viết:
- Type `Option` (hoặc dùng `*int`) phân biệt "chưa set" với "set = 0".
- Hàm `Default(p *int, def int) int`: trả về `*p` nếu p không nil, trả về `def` nếu p nil.

Demo:
```go
var unset *int
zero := 0; ptrZero := &zero
five := 5; ptrFive := &five

fmt.Println(Default(unset, 99))    // 99 (vì nil → default)
fmt.Println(Default(ptrZero, 99))  // 0  (set rõ ràng = 0)
fmt.Println(Default(ptrFive, 99))  // 5
```

### Bài tập 6 — Escape analysis quiz

Cho 4 hàm sau, dự đoán biến `x` (hoặc giá trị tương đương) có escape ra heap không, rồi verify bằng `go build -gcflags="-m"`:

**(a)**
```go
func a() int {
    x := 5
    return x
}
```

**(b)**
```go
func b() *int {
    x := 5
    return &x
}
```

**(c)**
```go
func c() {
    x := 5
    fmt.Println(&x)
}
```

**(d)**
```go
type User struct { Name string }
func d() User {
    return User{Name: "Alice"}
}
```

## Lời giải chi tiết

### Lời giải Bài tập 1

**(a)** Output: `20`. `y` trỏ tới `x`. `*y = 20` ghi 20 vào ô memory của x.

**(b)** Output: `5`. `f` nhận copy của `n`. Sửa `x` trong f không ảnh hưởng `n` ở caller.

**(c)** Output: `100`. `f` nhận địa chỉ của `n`. `*p = 100` ghi vào địa chỉ đó → `n` đổi.

**(d)** Output: `[100 2 3]`. Slice header được copy, nhưng header chứa pointer tới underlying array → cả 2 header trỏ tới cùng array → `s[0] = 100` ghi vào array thật. Đây vẫn là pass-by-value (copy header), không phải pass-by-reference theo nghĩa C++.

### Lời giải Bài tập 2

```go
func Swap(a, b *int) {
    *a, *b = *b, *a
}

func main() {
    x, y := 1, 2
    Swap(&x, &y)
    fmt.Println(x, y) // 2 1
}
```

Cách tiếp cận: dùng multiple assignment + dereference cả 2 vế. Note: Go cho phép gán nhiều cùng lúc, RHS được evaluate trước → không cần biến tạm.

Phiên bản không multiple assignment (dài hơn):
```go
func SwapVerbose(a, b *int) {
    tmp := *a
    *a = *b
    *b = tmp
}
```

### Lời giải Bài tập 3

Bug: `json.Unmarshal(data, cfg)` thiếu `&`. Unmarshal nhận `interface{}` nên compiler không báo. Output trước khi sửa:
```
Unmarshal error: json: Unmarshal(non-pointer main.Config)
```
(Thực ra `json.Unmarshal` có check non-pointer và trả về error. Nếu bỏ qua check `err`, `cfg` vẫn là `Config{Port: 0, Host: ""}`.)

Sửa:
```go
err := json.Unmarshal(data, &cfg) // thêm &
```
Output sau khi sửa: `{8080 localhost}`.

Bài học: bất kỳ hàm nào "ghi vào biến" cần `&` ở callsite. Đọc doc nếu không chắc.

### Lời giải Bài tập 4

Thuật toán: duyệt list, mỗi node "lật" pointer Next về node trước đó. Cần 3 con trỏ: `prev`, `curr`, `next`.

```go
type Node struct { Val int; Next *Node }

func Reverse(head *Node) *Node {
    var prev *Node // bắt đầu prev = nil
    curr := head
    for curr != nil {
        next := curr.Next // lưu tiếp theo trước khi ghi đè
        curr.Next = prev  // lật pointer
        prev = curr       // tiến prev
        curr = next       // tiến curr
    }
    return prev // prev là head mới
}
```

Walk-through với `1 → 2 → 3 → 4 → nil`:

| Bước | prev | curr | next | Hành động |
|------|------|------|------|----------|
| init | nil  | 1    | -    | - |
| 1    | nil  | 1    | 2    | 1.Next = nil → prev=1, curr=2 |
| 2    | 1    | 2    | 3    | 2.Next = 1 → prev=2, curr=3 |
| 3    | 2    | 3    | 4    | 3.Next = 2 → prev=3, curr=4 |
| 4    | 3    | 4    | nil  | 4.Next = 3 → prev=4, curr=nil |
| stop | 4    | nil  | -    | return 4 |

Kết quả: `4 → 3 → 2 → 1 → nil`. Độ phức tạp: O(n) thời gian, O(1) không gian.

### Lời giải Bài tập 5

```go
func Default(p *int, def int) int {
    if p == nil {
        return def
    }
    return *p
}

func main() {
    var unset *int
    zero := 0
    five := 5

    fmt.Println(Default(unset, 99))  // 99 — unset là nil
    fmt.Println(Default(&zero, 99))  // 0  — set rõ ràng là 0
    fmt.Println(Default(&five, 99))  // 5
}
```

Insight: với `*int`, ta phân biệt được 3 trạng thái: nil (chưa set), trỏ tới 0 (set = 0), trỏ tới giá trị khác. Với `int` thường chỉ có 2 trạng thái: 0 (không phân biệt được "chưa set" với "set = 0") và khác 0.

Trong DB code Go thường dùng `sql.NullInt64`:
```go
type NullInt64 struct {
    Int64 int64
    Valid bool // Valid=false nghĩa là NULL
}
```
Sạch hơn `*int64` vì không bao giờ panic do nil deref.

### Lời giải Bài tập 6

**(a) `x` KHÔNG escape.** `x` là int local, return *value* (copy). Compiler:
```
./main.go:N:2: x does not escape
```
x sống ở stack.

**(b) `x` ESCAPE.** `return &x` → địa chỉ x được giữ sau khi hàm return → phải sống lâu hơn frame → heap.
```
./main.go:N:2: moved to heap: x
```

**(c) `x` ESCAPE.** `fmt.Println` nhận `...interface{}` → đóng gói `&x` vào interface → interface đi qua biên hàm fmt → compiler không thể chứng minh không escape → conservatively cho heap.
```
./main.go:N:2: moved to heap: x
```
(Đây là 1 case ngỡ ngàng — `fmt.Println(&x)` cũng làm x escape. Đó là vì sao log debug nhiều có thể tăng GC.)

**(d) Không escape (Go 1.17+).** Return User by value → caller nhận copy. `User{...}` trong escape analysis sẽ được alloc trên stack frame của caller hoặc thậm chí trong register nếu nhỏ.
```
./main.go:N:9: User{...} does not escape
```

Verify lệnh:
```bash
go build -gcflags="-m" ./...
```

Bài học chính: **mọi pointer thoát ra ngoài frame → escape**. Bao gồm: return địa chỉ, pass vào hàm khác (đặc biệt qua interface), gán vào struct field thuộc về caller, lưu vào global. Khi tối ưu hot path, giảm escape là cách giảm áp lực GC.

## Code & Minh họa

- [solutions.go](./solutions.go) — tất cả ví dụ và bài tập dưới dạng Go code chạy được. Lệnh: `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) Pointer playground vẽ memory cell, (2) Pass-by-value vs pointer animate stack frame, (3) Escape analysis quiz.

## Bài tiếp theo

- [Lesson 17 — Mini-project: CLI Todo](../lesson-17-mini-project-cli-todo/README.md) — tổng hợp Tier 1: slice, map, struct, pointer, file I/O.
- Đọc thêm: [Lesson 18 — Interface](../lesson-18-interface/README.md) sẽ làm rõ "interface satisfaction yêu cầu pointer". Lesson 30 sẽ đi sâu escape analysis & memory model.
