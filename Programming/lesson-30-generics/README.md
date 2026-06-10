# Lesson 30 — Generics (Go 1.18+)

> Tier 3 — Lesson đầu. Sau lesson này bạn sẽ viết được container/algorithm
> tổng quát một lần, dùng cho mọi kiểu, mà vẫn giữ đầy đủ kiểm tra type tại
> compile-time. Không còn `interface{}` lằng nhằng + ép kiểu runtime.

## Mục tiêu học tập

Sau bài này bạn có thể:

1. Giải thích vì sao trước 1.18 Go thiếu sót khi phải viết container/algorithm
   tổng quát, và 2 hướng "vá tạm" cũ (`interface{}` + ép kiểu, code-gen) có
   những điểm yếu gì.
2. Đọc và viết được type parameter syntax: `func F[T C](...)`, `type T[A, B] struct`.
3. Phân biệt 4 dạng constraint: `any`, `comparable`, union literal (`int | float64`),
   union với `~` (underlying type), và interface có method set.
4. Dùng `golang.org/x/exp/constraints` (`Ordered`, `Signed`, ...) thay vì tự viết lại.
5. Biết khi nào generics đáng dùng (container, algorithm, pipeline transform) và
   khi nào KHÔNG nên dùng (đã có interface phù hợp, chỉ 1-2 type cụ thể,
   YAGNI).
6. Đo và giải thích chi phí runtime của generics so với code monomorphic và
   `interface{}` (spoiler: gần raw, nhanh hơn `interface{}` đáng kể).

## Tiền đề

- [Lesson 11 — Functions](../lesson-11-functions/) (hiểu signature, đối số).
- [Lesson 15 — Struct & Method](../lesson-15-struct-method/) (receiver, method set).
- [Lesson 18 — Interfaces](../lesson-18-interfaces/) (interface = method set).
- [Lesson 12 — Arrays & Slices](../lesson-12-arrays-slices/), [Lesson 13 — Maps](../lesson-13-maps/) (kiểu dữ liệu collection).

> Nếu bạn còn lưỡng lự về interface, dừng lại review L18 trước — generics
> KHÔNG thay thế interface, hai cơ chế song song. Hiểu rõ interface mới biết
> được khi nào nên dùng generics, khi nào không.

---

## 1. Vì sao có generics — pain point cụ thể trước 1.18

### 💡 Trực giác / Hình dung

Hãy tưởng tượng bạn cần viết hàm `Min` lấy giá trị nhỏ hơn trong 2 đối số.
Đơn giản đến mức không thể "đơn giản hơn nữa". Nhưng vì Go là static-typed,
hàm phải biết kiểu của đối số:

```go
func MinInt(a, b int) int {
    if a < b { return a }
    return b
}
```

Cần dùng cho `float64`? Phải viết thêm:

```go
func MinFloat64(a, b float64) float64 {
    if a < b { return a }
    return b
}
```

Cần cho `string`?

```go
func MinString(a, b string) string {
    if a < b { return a }
    return b
}
```

Logic giống hệt. Chỉ kiểu khác. Bạn đang COPY-PASTE — dấu hiệu rõ ràng của
ngôn ngữ thiếu công cụ trừu tượng hoá đúng đắn.

### Hai hướng "vá tạm" trước 1.18

**Hướng 1 — `interface{}` + type assertion (runtime cost + lose type)**:

```go
func MinAny(a, b interface{}) interface{} {
    switch a := a.(type) {
    case int:
        b := b.(int)        // ép kiểu — runtime panic nếu sai
        if a < b { return a }
    case float64:
        b := b.(float64)
        if a < b { return a }
    case string:
        b := b.(string)
        if a < b { return a }
    }
    return b
}
// Gọi: x := MinAny(3, 5).(int)   ← phải tự ép, dễ nhầm
```

Vấn đề:

1. Compile-time **không** check được nữa — `MinAny("x", 5)` qua compile,
   panic lúc chạy.
2. Mỗi lần dùng phải `result.(int)` — quên là `panic: interface conversion`.
3. Boxing/unboxing — mỗi `int` đi vào `interface{}` thường được wrap lại
   trong heap. Đo benchmark cuối lesson sẽ thấy chậm 5–15× so với generic.

**Hướng 2 — code-gen (go:generate)**:

```go
//go:generate genny -in=$GOFILE -out=gen-$GOFILE gen "T=int,float64,string"
func Min(a, b T) T {
    if a < b { return a }
    return b
}
```

Vấn đề:

1. Phải build pipeline phụ thuộc tool ngoài (`genny`, `gotemplate`).
2. Code sinh ra phình to — mỗi type một file riêng.
3. IDE/refactor không hiểu code chưa sinh.
4. Lỗi `T` không hiện ngay khi gõ — phải `go generate` mới biết.

### Generics (Go 1.18+) — giải đúng vấn đề

```go
func Min[T constraints.Ordered](a, b T) T {
    if a < b { return a }
    return b
}

// Gọi:
Min(3, 5)         // T = int  — inferred
Min(3.5, 1.2)     // T = float64
Min("a", "b")     // T = string
Min(3, "x")       // compile error — đúng cái ta muốn!
```

Một định nghĩa. Type-safe compile-time. Không boxing. IDE hiểu ngay.

### ❓ Câu hỏi tự nhiên

- *"Generics có biến Go thành C++ template không?"* — KHÔNG. Go có hạn chế
  cố tình: không cho specialization, không cho variadic type, không cho
  template metaprogramming. Vì các tính năng đó dễ làm code khó hiểu.
- *"Tại sao lại đợi đến 1.18 mới có?"* — Team Go (Ian Lance Taylor, Robert
  Griesemer) muốn thiết kế gọn, type-inference tốt, không phá vỡ tốc độ
  compile. Tốn 9-10 năm thảo luận.
- *"Có cần học generics ngay không?"* — Bắt buộc với người viết library
  (logger, cache, queue, ...). Người viết application phần lớn chỉ cần
  *biết đọc*.

### 📝 Tóm tắt mục 1

- Trước 1.18: phải copy-paste code cho từng type, hoặc dùng `interface{}` mất
  type-safety + chậm, hoặc code-gen phức tạp.
- Generics cho phép viết 1 lần, dùng cho mọi type, vẫn compile-time check.
- Go generics có chủ ý hạn chế — không phải template metaprogramming.

---

## 2. Type parameter syntax — đọc và viết được signature

### 💡 Trực giác

`[T any]` đặt giữa tên hàm/type và đối số/field. Đó là *danh sách "biến kiểu"*.
Khi gọi/instantiate, mỗi biến kiểu được thay bằng một type cụ thể.

```
        ┌─ type parameter ─┐
func Min[T constraints.Ordered](a, b T) T {
   //       ↑ tên T   ↑ constraint
   //                  (T phải thoả constraint Ordered)
}
```

So sánh với hàm thường:

```
                              ┌─ value parameter ─┐
func MinInt(a, b int) int { ...                   }
   //       ↑ tên a, b   ↑ kiểu
```

Type parameter "đứng cao hơn" value parameter một bậc — nó là biến của kiểu,
còn value parameter là biến của giá trị.

### Cú pháp đầy đủ

```go
// 1 type parameter
func Print[T any](x T) { fmt.Println(x) }

// 2 type parameter, khác constraint
func MapKV[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    return keys
}

// Type parameter trên type
type Stack[T any] struct {
    items []T
}

// Method trên generic type — nhắc lại T trong receiver, KHÔNG nhắc constraint
func (s *Stack[T]) Push(v T) {
    s.items = append(s.items, v)
}
```

### ⚠ Lỗi thường gặp

```go
// SAI — quên T trong receiver
func (s *Stack) Push(v T) { ... }
// Error: undefined: T

// SAI — viết lại constraint trên method (không cần)
func (s *Stack[T any]) Push(v T) { ... }
// Error: cannot use generic type Stack[T any] without instantiation

// ĐÚNG
func (s *Stack[T]) Push(v T) { ... }
```

### Type instantiation

Khi gọi `Min[int](3, 5)`, ta gọi là *instantiate* — thay `T` = `int`. Phần lớn
trường hợp Go suy ra T từ đối số, không cần ghi explicit:

```go
Min(3, 5)        // OK — T = int (suy từ a=3, b=5)
Min[int](3, 5)   // OK — explicit, hiếm khi cần
Min[float64](3, 5)  // OK — ép T = float64, 3 và 5 sẽ được convert
```

Khi nào cần explicit? Khi compiler không có gì để suy ra:

```go
type Container[T any] struct { items []T }
// Không có đối số → phải explicit
c := Container[int]{}     // OK
c := Container{}          // ERROR: cannot use generic type without type arguments
```

### ❓ Câu hỏi tự nhiên

- *"Có thể đặt tên gì cho type parameter?"* — Bất kỳ identifier hợp lệ. Quy ước:
  1 ký tự hoa cho type thông thường (`T`, `K`, `V`, `E`); tên dài (`Number`) khi
  cần rõ nghĩa.
- *"Có thể có bao nhiêu type parameter?"* — Không giới hạn cú pháp. Quy ước:
  ≤ 3 là dễ đọc, > 3 nên xem lại thiết kế.
- *"Type parameter có thể là kiểu phụ thuộc nhau không?"* (vd `[T any, U func(T) any]`) —
  CÓ, thường gặp trong `Map[T, U]`.

### 📝 Tóm tắt mục 2

- `[T constraint]` đứng giữa tên và `(`.
- Method generic: viết lại `T` trong receiver, KHÔNG nhắc constraint.
- Type inference giúp tránh phải `[T]` mỗi lần gọi.

---

## 3. Constraint — ai được phép thế chỗ T

### 💡 Trực giác

Constraint trả lời câu hỏi: *"Type nào được phép thay thế cho T?"* Nếu
không khai báo, Go phải giả định T là loại "không biết gì" — và như vậy
trong thân hàm bạn cũng *không làm được gì* (không so sánh, không cộng,
không gọi method).

Constraint = interface — nhưng được mở rộng để cho phép cả **union của type
literal** chứ không chỉ method set.

### Bốn dạng constraint

#### 3.1 `any` — không ràng buộc

```go
func Print[T any](x T) {
    fmt.Println(x)   // chỉ làm được những gì với mọi type
                     // (cụ thể: nhận, truyền, in qua fmt — vì fmt dùng reflect)
}
```

`any` chính là alias của `interface{}`. Trong thân hàm, T bị treat như giá
trị mờ — không so sánh, không cộng.

**Ví dụ số**:

```go
Print(42)         // OK
Print("hello")    // OK
Print([]int{1,2}) // OK
Print(nil)        // ERROR — nil không có type, compiler không suy được T
```

#### 3.2 `comparable` — cho phép `==` và `!=`

```go
func Contains[T comparable](s []T, v T) bool {
    for _, x := range s {
        if x == v { return true }   // OK — comparable cho phép
    }
    return false
}
```

`comparable` cho phép so sánh **bằng/khác bằng**, KHÔNG cho phép `<`/`>`/`<=`/`>=`.

**Type nào là `comparable`?** — `bool`, mọi numeric (`int`, `float64`, ...),
`string`, pointer, channel, interface, **struct mà mọi field đều comparable**,
**array mà element type comparable**. Map/slice/function KHÔNG comparable.

**Ví dụ số**:

```go
Contains([]int{1,2,3}, 2)            // OK, T=int
Contains([]string{"a","b"}, "a")     // OK, T=string
Contains([]float64{1.5, 2.5}, 2.5)   // OK (nhưng cẩn thận NaN!)
Contains([][]int{{1}, {2}}, []int{1})// ERROR — []int không comparable
```

#### 3.3 Union literal — `int | float64 | string`

```go
type Number interface {
    int | int8 | int16 | int32 | int64 |
    uint | uint8 | uint16 | uint32 | uint64 |
    float32 | float64
}

func Sum[T Number](xs []T) T {
    var s T
    for _, x := range xs {
        s += x   // OK — vì mọi type trong union đều hỗ trợ `+`
    }
    return s
}
```

Union literal cho phép Go suy ra: trong thân hàm, các operator hoạt động trên
**giao** (intersection) các phép toán mà *mọi* type trong union đều hỗ trợ.

**Ví dụ số**:

```go
Sum([]int{1, 2, 3})          // = 6,    T=int
Sum([]float64{1.5, 2.5})     // = 4.0,  T=float64
Sum([]int32{100, 200, 300})  // = 600,  T=int32
Sum([]bool{true, false})     // ERROR — bool không trong Number
```

#### 3.4 Union với `~` — underlying type

```go
type Number interface {
    ~int | ~int64 | ~float64
}
```

`~int` nghĩa là: T có **underlying type là `int`** — kể cả type alias do user
định nghĩa.

```go
type Celsius float64       // underlying = float64

Sum([]Celsius{36.5, 37.2}) // OK với ~float64; ERROR với float64 (không có ~)
```

**Ví dụ số**:

```go
type Cents int
xs := []Cents{100, 250, 75}
Sum(xs)   // = Cents(425) — OK vì ~int trong Number

type UserID int64
ids := []UserID{1, 2, 3}
Sum(ids)  // = UserID(6) — OK vì ~int64
```

Nếu constraint dùng `int | float64` (không có `~`), `Cents` và `UserID` đều
fail. Hầu hết library standard prefer `~` để rộng rãi hơn.

#### 3.5 Method set — interface giống cách dùng cũ

```go
type Stringer interface {
    String() string
}

func JoinStrings[T Stringer](xs []T, sep string) string {
    parts := make([]string, len(xs))
    for i, x := range xs {
        parts[i] = x.String()   // OK — Stringer cho phép gọi String()
    }
    return strings.Join(parts, sep)
}
```

Đây là interface "kiểu cũ" — chỉ method, không type union. Vẫn dùng được làm
constraint y như trước.

> **Kết hợp method set + type union** (advanced): có thể viết
> `interface { ~int | ~float64; String() string }` — T phải đồng thời thoả
> union *và* có method. Hiếm dùng, nhưng nên biết là khả thi.

### ❓ Câu hỏi tự nhiên

- *"`comparable` có bao gồm `<`/`>` không?"* — KHÔNG. Đó là điểm hay nhầm.
  Muốn `<` cần `constraints.Ordered`.
- *"Tôi viết `interface { int | string }` xong dùng nó làm value type được không?"*
  — KHÔNG. Interface có type union chỉ dùng được làm **constraint**, không thể
  làm interface giá trị thông thường.
  ```go
  type Number interface { int | float64 }
  var x Number = 5   // ERROR: cannot use Number as value type
  ```
- *"Vì sao có cả `int` và `~int`?"* — Compatibility. Library cũ muốn ràng buộc
  *đúng* `int` thì dùng `int`; muốn mở rộng (kể cả alias user) thì dùng `~int`.
  Tham khảo standard: `slices.Sort` dùng `Ordered` (có `~`).

### ⚠ Lỗi thường gặp

```go
// SAI — không phải mọi type trong union đều hỗ trợ `<`
func Max[T int | string | []int](a, b T) T {
    if a < b { return a }   // ERROR: []int không có `<`
    return b
}

// SAI — quên `~` khi muốn hỗ trợ type alias
type Money float64
type AmountConstraint interface{ float64 }   // chỉ float64 thuần
Sum([]Money{1, 2})   // compile error
// Phải đổi thành interface{ ~float64 }
```

### 🔁 Dừng lại tự kiểm tra

1. Hàm `func Eq[T any](a, b T) bool { return a == b }` — có hợp lệ không?
   <details><summary>Đáp án</summary>KHÔNG. `any` không có `==`. Phải đổi
   constraint thành <code>comparable</code>.</details>
2. `Sum[T int | float64]` có cho phép gọi `Sum([]Celsius{...})` không
   (`type Celsius float64`)?
   <details><summary>Đáp án</summary>KHÔNG. Phải dùng <code>~float64</code> mới
   bao gồm type Celsius.</details>

### 📝 Tóm tắt mục 3

- 4 dạng constraint chính: `any`, `comparable`, union literal, union với `~`.
- `comparable` chỉ cho `==`/`!=`, KHÔNG cho `<`.
- `~T` mở rộng cho user-defined type cùng underlying.
- Constraint có type union không dùng được làm value type.

---

## 4. Package `golang.org/x/exp/constraints`

### 💡 Vì sao cần

Việc liệt kê tay `int | int8 | ... | float64` là dài và dễ sai. Library
chuẩn (extended) đã làm sẵn:

```go
import "golang.org/x/exp/constraints"

func Min[T constraints.Ordered](a, b T) T {
    if a < b { return a }
    return b
}
```

### Các constraint thường gặp

| Constraint | Bao gồm |
|---|---|
| `Signed` | `~int`, `~int8`, ..., `~int64` |
| `Unsigned` | `~uint`, `~uint8`, ..., `~uint64`, `~uintptr` |
| `Integer` | `Signed | Unsigned` |
| `Float` | `~float32`, `~float64` |
| `Complex` | `~complex64`, `~complex128` |
| `Ordered` | `Integer | Float | ~string` (có thứ tự — hỗ trợ `<`) |

`Ordered` là cái dùng nhiều nhất khi viết `Min`, `Max`, `Sort`, `BinarySearch`.

### Ví dụ số

```go
import "golang.org/x/exp/constraints"

func Abs[T constraints.Signed | constraints.Float](x T) T {
    if x < 0 { return -x }
    return x
}

Abs(-7)       // = 7,    T=int
Abs(-3.5)     // = 3.5,  T=float64
Abs(int32(-100)) // = 100, T=int32
Abs(uint(5))  // ERROR — Unsigned không trong constraint
```

### Tích hợp vào package chuẩn (Go 1.21+)

Go 1.21 đã đưa `cmp.Ordered` vào standard library — không cần
`golang.org/x/exp/constraints` nữa cho `Ordered`:

```go
import "cmp"

func Min[T cmp.Ordered](a, b T) T {
    if a < b { return a }
    return b
}
```

Đồng thời `slices.Min`, `slices.Max`, `slices.Sort`, ... đã có sẵn — bạn
thường không cần tự viết lại.

### 📝 Tóm tắt mục 4

- `golang.org/x/exp/constraints` chứa các constraint dùng chung.
- Go 1.21+: `cmp.Ordered` đã vào standard library.
- Khi `cmp.Ordered` đủ dùng — đừng tự viết.

---

## 5. Generic function — ≥ 4 ví dụ thực tế

### 5.1 `Min`, `Max`, `Sum`

```go
func Min[T cmp.Ordered](a, b T) T {
    if a < b { return a }
    return b
}

func Max[T cmp.Ordered](a, b T) T {
    if a > b { return a }
    return b
}

func Sum[T Number](xs []T) T {
    var s T
    for _, x := range xs { s += x }
    return s
}
```

**Verify cả 2 vế bằng số thật**:

- `Min(3, 5)` → if `3 < 5` true → return 3. ✓
- `Max(-1, -7)` → if `-1 > -7` true → return -1. ✓
- `Sum([]int{1,2,3,4})` → s=0+1=1, +2=3, +3=6, +4=10. ✓

### 5.2 `Map` — biến mọi `[]T` thành `[]U`

```go
func Map[T, U any](xs []T, f func(T) U) []U {
    out := make([]U, len(xs))
    for i, x := range xs {
        out[i] = f(x)
    }
    return out
}

// Dùng:
Map([]int{1, 2, 3}, func(x int) string {
    return fmt.Sprintf("#%d", x)
})
// = []string{"#1", "#2", "#3"}
```

### 5.3 `Filter` — giữ phần tử thoả predicate

```go
func Filter[T any](xs []T, pred func(T) bool) []T {
    out := xs[:0:0]   // alloc mới, không share underlying
    for _, x := range xs {
        if pred(x) {
            out = append(out, x)
        }
    }
    return out
}

// Dùng:
Filter([]int{1,2,3,4,5}, func(x int) bool { return x%2 == 0 })
// = []int{2, 4}
```

### 5.4 `Reduce` (a.k.a `Fold`) — gộp slice về 1 giá trị

```go
func Reduce[T, A any](xs []T, init A, f func(A, T) A) A {
    acc := init
    for _, x := range xs {
        acc = f(acc, x)
    }
    return acc
}

// Tính tổng kiểu Reduce
Reduce([]int{1,2,3,4}, 0, func(a, x int) int { return a + x })   // = 10

// Đếm số phần tử > 2
Reduce([]int{1,2,3,4,5}, 0, func(a, x int) int {
    if x > 2 { return a + 1 }
    return a
})   // = 3
```

### 5.5 Ứng dụng thực tế — validator chain & cache loader

```go
type Validator[T any] func(T) error

func Chain[T any](vs ...Validator[T]) Validator[T] {
    return func(v T) error {
        for _, val := range vs {
            if err := val(v); err != nil { return err }
        }
        return nil
    }
}

// Validate user input
notEmpty := Validator[string](func(s string) error {
    if s == "" { return errors.New("empty") }
    return nil
})
maxLen := Validator[string](func(s string) error {
    if len(s) > 100 { return errors.New("too long") }
    return nil
})

v := Chain(notEmpty, maxLen)
v("hello")  // nil
v("")       // error: empty

// Cache loader: viết 1 lần, dùng cho mọi (K, V)
type CacheLoader[K comparable, V any] struct {
    fn func(K) (V, error)
}
// → CacheLoader[int, *User], CacheLoader[string, Order], ...
```

### ❓ Câu hỏi tự nhiên

- *"`Map` này có nhanh hơn for-loop tay không?"* — Như nhau, hoặc chậm hơn
  rất nhẹ do gọi function `f`. Compiler có thể inline nếu `f` là literal.
- *"Có thư viện chính thức cho Map/Filter/Reduce không?"* — Có:
  `golang.org/x/exp/slices`, `slices` (1.21+), `iter` (1.23+). Bạn thường không
  cần tự viết — viết để hiểu, dùng standard để chạy.

### 📝 Tóm tắt mục 5

- Generic function tỏa sáng nhất ở: container helper, transform, validate
  chain, cache loader.
- Đã có sẵn nhiều trong `slices` package, không cần tự viết lại trong production.

---

## 6. Generic type — viết container 1 lần dùng mãi

### 6.1 `Stack[T any]`

```go
type Stack[T any] struct {
    items []T
}

func NewStack[T any]() *Stack[T] {
    return &Stack[T]{items: nil}
}

func (s *Stack[T]) Push(v T) {
    s.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 {
        return zero, false
    }
    n := len(s.items) - 1
    v := s.items[n]
    s.items = s.items[:n]
    return v, true
}

func (s *Stack[T]) Len() int { return len(s.items) }
```

**Dùng**:

```go
s := NewStack[int]()
s.Push(1); s.Push(2); s.Push(3)
v, _ := s.Pop()    // v = 3
fmt.Println(s.Len()) // 2
```

**Ví dụ số chi tiết Push/Pop**:

| Bước | Thao tác | `s.items` |
|---|---|---|
| 0 | khởi tạo | `[]` |
| 1 | Push(1) | `[1]` |
| 2 | Push(2) | `[1, 2]` |
| 3 | Push(3) | `[1, 2, 3]` |
| 4 | Pop()→3 | `[1, 2]` |
| 5 | Pop()→2 | `[1]` |
| 6 | Pop()→1 | `[]` |
| 7 | Pop()→zero,false | `[]` |

### 6.2 `Map[K comparable, V any]` — wrapper an toàn cho map

```go
type Map[K comparable, V any] struct {
    m map[K]V
}

func NewMap[K comparable, V any]() *Map[K, V] {
    return &Map[K, V]{m: make(map[K]V)}
}

func (m *Map[K, V]) Set(k K, v V)        { m.m[k] = v }
func (m *Map[K, V]) Get(k K) (V, bool)   { v, ok := m.m[k]; return v, ok }
func (m *Map[K, V]) Delete(k K)          { delete(m.m, k) }
func (m *Map[K, V]) Len() int            { return len(m.m) }

func (m *Map[K, V]) Keys() []K {
    keys := make([]K, 0, len(m.m))
    for k := range m.m { keys = append(keys, k) }
    return keys
}
```

**Dùng**:

```go
m := NewMap[string, int]()
m.Set("alice", 30)
m.Set("bob", 25)
v, ok := m.Get("alice")   // 30, true
m.Len()                    // 2
```

### 6.3 `Set[T comparable]`

```go
type Set[T comparable] struct {
    m map[T]struct{}
}

func NewSet[T comparable](items ...T) *Set[T] {
    s := &Set[T]{m: make(map[T]struct{}, len(items))}
    for _, x := range items { s.m[x] = struct{}{} }
    return s
}

func (s *Set[T]) Add(v T)          { s.m[v] = struct{}{} }
func (s *Set[T]) Has(v T) bool     { _, ok := s.m[v]; return ok }
func (s *Set[T]) Remove(v T)       { delete(s.m, v) }
func (s *Set[T]) Len() int         { return len(s.m) }

func (s *Set[T]) Union(o *Set[T]) *Set[T] {
    out := NewSet[T]()
    for k := range s.m { out.Add(k) }
    for k := range o.m { out.Add(k) }
    return out
}
```

**Ví dụ số**:

```go
a := NewSet(1, 2, 3)
b := NewSet(3, 4, 5)
a.Union(b)  // {1, 2, 3, 4, 5}
a.Has(2)    // true
a.Has(4)    // false
```

### ❓ Câu hỏi tự nhiên

- *"Sao constructor phải có `[T any]` ở cả 2 chỗ (func và return type)?"* —
  Vì `Stack` là generic type, mọi reference đến nó cần có type argument.
  Constructor là hàm generic riêng, có T-parameter của nó.
- *"Có thể nest generic type không?"* (vd `Stack[Stack[int]]`) — CÓ, hoàn
  toàn được.
- *"`var zero T` để làm gì?"* — Lấy zero-value của type T (0 với int, "" với
  string, nil với pointer). Pattern này hay dùng để return giá trị "rỗng".

### 📝 Tóm tắt mục 6

- Generic type: `[T any]` đặt giữa tên type và `struct`.
- Constructor cần `[T any]` riêng + return `*Stack[T]`.
- Method nhắc lại `T` trong receiver, không nhắc constraint.

---

## 7. Method trên generic type — chi tiết

Hai quy tắc:

1. **Receiver phải nhắc lại type parameter** (nhưng KHÔNG nhắc constraint):

   ```go
   func (s *Stack[T]) Push(v T)          // OK
   func (s *Stack) Push(v T)              // ERROR
   func (s *Stack[T any]) Push(v T)       // ERROR
   ```

2. **Method KHÔNG được thêm type parameter mới** (method không thể generic
   "thêm"):

   ```go
   // SAI - thêm U
   func (s *Stack[T]) Convert[U any]() Stack[U] { ... }
   // → compile error
   ```

   Workaround: tách thành hàm thường (free function):

   ```go
   func ConvertStack[T, U any](s *Stack[T], f func(T) U) *Stack[U] { ... }
   ```

### Vì sao Go cấm method có thêm type parameter?

Lý do là **runtime cost**: method generic mới sẽ phải dispatch dynamic
(không biết trước U). Go team chọn cấm để giữ tốc độ runtime ổn định.
Đây là quyết định design rõ ràng — đừng cố lách.

---

## 8. Type inference — Go tự đoán T

### Cách Go suy T

Compiler nhìn vào **đối số gọi hàm** và **constraint**, cố gắng deduce T:

```go
Min(3, 5)
//  ↑  ↑
//  T=int (vì 3, 5 là int literal trong context không khác)
```

Khi đối số có ép kiểu rõ ràng:

```go
Min(int32(3), int32(5))   // T = int32
Min(float64(3), 5)        // T = float64 (5 được convert lên float64)
Min(int32(3), 5)          // T = int32 (5 được convert xuống int32)
Min("a", 1)               // ERROR — không có T thoả cả 2
```

### Khi nào KHÔNG suy được — phải explicit

```go
type Container[T any] struct{ items []T }

c := Container[int]{}     // explicit — không có gì để suy
c := NewSet[string]()     // explicit — không có items
```

Hoặc khi return type là T (function trả về T mà không nhận T):

```go
func Zero[T any]() T { var z T; return z }
x := Zero[int]()    // phải explicit
```

### ⚠ Lỗi thường gặp

```go
// nil literal không có type — không suy được
Min(nil, nil)   // ERROR

// hằng số literal mặc định là int — đôi khi gây hiểu nhầm
Min(1, 2.5)     // ERROR: 1 và 2.5 mặc định khác type
// Sửa:
Min(1.0, 2.5)   // OK — cả hai là float64
```

---

## 9. Constraint type element & `~` — đào sâu

`~T` đọc là *"underlying type là T"*. Đây là cách Go cho phép constraint mở
rộng đến user-defined type:

```go
type Celsius float64

type Number interface { ~float64 }
type StrictNumber interface { float64 }

Sum[Number]([]Celsius{36.5, 37.2})        // OK — Celsius có underlying = float64
Sum[StrictNumber]([]Celsius{36.5, 37.2})  // ERROR — Celsius != float64
```

**Ví dụ số chi tiết**:

```go
type UserID int

func double[T constraints.Integer](x T) T {
    return x + x
}

double(UserID(7))   // = UserID(14)
double(int32(5))    // = int32(10)
double(uint(3))     // = uint(6)
```

`constraints.Integer` dùng `~`, nên Mọi alias-of-int đều OK.

### Khi nên dùng `~` vs không

| Tình huống | Dùng |
|---|---|
| Library cho người khác xài | `~T` (rộng rãi) |
| Internal, chỉ muốn đúng `T` thuần | `T` (chặt) |
| Constraint giống standard | dùng từ `cmp`/`constraints` (đã có `~`) |

---

## 10. Pitfall — generics KHÔNG có operator polymorphism + field access

### 10.1 `+` được phép vì constraint cho phép

```go
func Sum[T Number](xs []T) T {
    var s T
    for _, x := range xs {
        s += x   // OK — vì T trong Number, mọi type trong union đều có `+`
    }
    return s
}
```

### 10.2 Field access KHÔNG generic được

```go
type Point struct{ X, Y float64 }
type Vec struct{ X, Y float64 }

// SAI — generics không có "structural constraint"
func SumX[T any](xs []T) float64 {
    var s float64
    for _, x := range xs {
        s += x.X   // ERROR: T không có field X
    }
    return s
}
```

**Giải pháp**: dùng interface với method:

```go
type XGetter interface {
    GetX() float64
}

func (p Point) GetX() float64 { return p.X }
func (v Vec)   GetX() float64 { return v.X }

func SumX[T XGetter](xs []T) float64 {
    var s float64
    for _, x := range xs {
        s += x.GetX()   // OK qua method
    }
    return s
}
```

### ❓ Câu hỏi tự nhiên

- *"Đây là hạn chế hay là design có chủ ý?"* — Có chủ ý. Cho phép field
  access generic sẽ phải có "structural type" — Go không muốn vì sẽ phức tạp
  hoá inference và compile time.
- *"C# / Rust có tính năng này không?"* — Rust có via trait, C# có via
  reflection. Go chọn interface — đã đủ thể hiện.

---

## 11. Performance — generics có "free" không?

### Cách Go cài đặt generics

Go dùng **GC shape stenciling** (hybrid của monomorphization + dictionary):

- Mỗi *shape* (size + kind: pointer-shape, int-shape, ...) sinh ra 1 instance.
- Type giống shape dùng chung implementation, qua "type dictionary" runtime.

→ Kích thước binary không phình to như C++ template, nhưng cũng không hoàn
toàn miễn phí (có chút overhead dispatch).

### Benchmark thực tế

Đây là 3 cách viết `Sum`:

```go
// 1. Generic
func SumG[T Number](xs []T) T {
    var s T
    for _, x := range xs { s += x }
    return s
}

// 2. interface{} (cách cũ)
func SumI(xs []interface{}) interface{} {
    var s int
    for _, x := range xs { s += x.(int) }
    return s
}

// 3. Raw int (monomorphic)
func SumR(xs []int) int {
    var s int
    for _, x := range xs { s += x }
    return s
}
```

Benchmark trên `xs = 1_000_000` int trên Go 1.22, M1 Mac (giá trị tham khảo —
thực tế tự benchmark):

| Cách | Thời gian | Allocs | Ghi chú |
|---|---|---|---|
| `SumR` (raw int) | **0.45 ms** | 0 | baseline, có thể vectorize |
| `SumG[int]` (generic) | **0.50 ms** | 0 | ~10% chậm hơn raw |
| `SumI` (interface{}) | **6.8 ms** | 1 (per box) | 15× chậm hơn raw |

**Kết luận**:

- Generic gần như miễn phí so với raw — vì compiler có thể inline hot path.
- `interface{}` chậm hơn 10–15× vì boxing + type assertion.
- **Đừng dùng `interface{}` cho hot loop**, dùng generic.

### Khi generic chậm hơn raw

- Khi T là **pointer-like type** (interface, map, channel) — phải qua dictionary
  để biết hash/size → chậm vài ns/op.
- Khi compiler không inline được — vd function literal lớn truyền vào.

### ⚠ Pitfall

```go
// Không cần generic — chỉ làm với int
func DoubleInt(xs []int) []int {
    out := make([]int, len(xs))
    for i, x := range xs { out[i] = x * 2 }
    return out
}

// Generic không thêm gì — vẫn chỉ 1 type call site
func Double[T Number](xs []T) []T { ... }
```

Nếu chỉ dùng cho 1-2 type → KHÔNG cần generic. Generic là khoản đầu tư cho
reuse, không phải mặc định.

---

## 12. Khi nào nên dùng generics

| Use case | Có nên dùng generic? |
|---|---|
| Stack, Queue, LinkedList, Tree, Set | ✅ Rất nên — container generic 1 lần dùng mãi. |
| Algorithm — Sort, Search, Max, Sum, Map, Filter | ✅ Nên — đã có sẵn trong `slices`. |
| Transform pipeline (Map/Reduce stage) | ✅ Nên — type-safe end-to-end. |
| Generic cache (key + value) | ✅ Nên — `Cache[string, User]`. |
| Middleware xử lý nhiều type request | ✅ Nên — gắn type param vào handler. |
| Generic numeric helper (Abs, Clamp, ...) | ✅ Nên — `cmp.Ordered`. |
| Mock factory cho testing | ✅ Nên — `MockOf[T]`. |

## 13. Khi nào KHÔNG nên dùng generics

| Tình huống | Tại sao không |
|---|---|
| Đã có interface tốt (vd `io.Reader`) | Interface đã trừu tượng — generic không thêm gì. |
| Chỉ dùng cho 1-2 type cụ thể | YAGNI — viết 2 hàm còn nhanh hơn. |
| Code phức tạp hơn rõ rệt | Generic làm khó đọc. Code đẹp > 5% perf gain. |
| Hot path cần inline ổn định | Generic đôi khi không inline cùng cách. |
| API public — quá nhiều type param | Người dùng phải nhớ `[K comparable, V any, E error]` mệt. |

### Quy tắc rule-of-thumb

> "Khi bạn cần viết hàm tương tự lần thứ 3 cho type khác → bắt đầu nghĩ tới
> generic. Lần thứ 1-2 thì cứ duplicate."

---

## 14. Common pitfall — checklist sai sót hay gặp

### 14.1 Quên type parameter ở method

```go
// SAI
func (s *Stack) Push(v T) { ... }
// ĐÚNG
func (s *Stack[T]) Push(v T) { ... }
```

### 14.2 Constraint quá rộng/quá hẹp

```go
// QUÁ HẸP
func Sum[T int](xs []T) T { ... }   // chỉ int — vô nghĩa
// QUÁ RỘNG
func Sum[T any](xs []T) T { ... }   // T any không có `+`, compile error
// VỪA
func Sum[T Number](xs []T) T { ... }
```

### 14.3 Type union với `<` mà có type không support

```go
type Comp interface { int | []byte }
func Less[T Comp](a, b T) bool { return a < b }   // ERROR: []byte không có `<`
```

### 14.4 Generic không thay được interface trong API public

```go
// CŨ - interface, đa số người Go quen
type Writer interface { Write([]byte) (int, error) }

// MỚI - đừng đổi thành generic
type Writer[T ~[]byte] interface { Write(T) (int, error) }
// — Quá phức tạp. Đừng làm.
```

### 14.5 Quá nhiều type parameter

```go
// Khó đọc
func Process[A, B, C, D any, E comparable](
    a A, b B, c C, d D, e E,
) (D, error) { ... }

// Đa số case này nên tách nhỏ thành chuỗi function < 2 type param mỗi cái.
```

---

## 15. Bài tập

### BT1 — `Map[T, U]`

Viết hàm:
```go
func Map[T, U any](s []T, f func(T) U) []U
```
Test: `Map([]int{1,2,3}, func(x int) string { return fmt.Sprintf("#%d", x) })`
phải trả về `["#1", "#2", "#3"]`.

### BT2 — `Filter[T]`

Viết hàm `func Filter[T any](s []T, pred func(T) bool) []T` — giữ lại phần tử
thoả pred. Test với `[]int{1,2,3,4,5}` và pred = "x % 2 == 0".

### BT3 — Generic `Set[T comparable]`

Cài đặt:
- `NewSet[T comparable](items ...T) *Set[T]`
- `Add(v T)`, `Has(v T) bool`, `Remove(v T)`, `Len() int`
- `Union(o *Set[T]) *Set[T]`, `Intersect(o *Set[T]) *Set[T]`

### BT4 — Generic `LinkedList[T]`

Cài đặt:
- `type LinkedList[T any] struct { ... }`
- `Push(v T)` — thêm đầu.
- `Pop() (T, bool)` — lấy đầu.
- `Len() int`
- `ToSlice() []T`

### BT5 — Refactor `MinInt`, `MinFloat`, `MinString`

Cho code:
```go
func MinInt(a, b int) int { if a < b { return a }; return b }
func MinFloat(a, b float64) float64 { if a < b { return a }; return b }
func MinString(a, b string) string { if a < b { return a }; return b }
```
Refactor thành 1 generic function. Đảm bảo tất cả test cũ vẫn pass.

### BT6 — Sửa 4 lỗi generics

Code dưới có 4 lỗi. Tìm và sửa:

```go
package main

import "fmt"

// Lỗi 1
type Container struct {
    items []T
}

// Lỗi 2
func (c *Container) Push(v T) {
    c.items = append(c.items, v)
}

// Lỗi 3
func Eq[T any](a, b T) bool {
    return a == b
}

// Lỗi 4
type Number interface { int | float64 }
var n Number = 5

func main() {
    fmt.Println(Eq(1, 2))
}
```

---

## 16. Lời giải chi tiết

### Lời giải BT1 — `Map[T, U]`

```go
func Map[T, U any](s []T, f func(T) U) []U {
    out := make([]U, len(s))
    for i, x := range s {
        out[i] = f(x)
    }
    return out
}
```

**Cách tiếp cận**:
- 2 type param: T cho input, U cho output. Cả 2 đều `any` vì không cần
  operator nào.
- Alloc trước `[]U` với len = len(s) — tránh `append` realloc.

**Verify**:
- `Map([]int{1,2,3}, fmt.Sprintf("#%d", _))` → `["#1", "#2", "#3"]` ✓
- Độ phức tạp: $O(n)$.

### Lời giải BT2 — `Filter[T]`

```go
func Filter[T any](s []T, pred func(T) bool) []T {
    out := make([]T, 0, len(s))
    for _, x := range s {
        if pred(x) {
            out = append(out, x)
        }
    }
    return out
}
```

**Cách tiếp cận**:
- Alloc capacity = len(s) — worst case mọi phần tử đều pass.
- Dùng `make([]T, 0, len(s))` để cap đầy đủ, không alloc giữa loop.

**Verify**:
- `Filter([]int{1,2,3,4,5}, x → x%2 == 0)` → `[2, 4]` ✓
- Độ phức tạp: $O(n)$.

### Lời giải BT3 — Generic `Set[T comparable]`

```go
type Set[T comparable] struct {
    m map[T]struct{}
}

func NewSet[T comparable](items ...T) *Set[T] {
    s := &Set[T]{m: make(map[T]struct{}, len(items))}
    for _, x := range items {
        s.m[x] = struct{}{}
    }
    return s
}

func (s *Set[T]) Add(v T)      { s.m[v] = struct{}{} }
func (s *Set[T]) Has(v T) bool { _, ok := s.m[v]; return ok }
func (s *Set[T]) Remove(v T)   { delete(s.m, v) }
func (s *Set[T]) Len() int     { return len(s.m) }

func (s *Set[T]) Union(o *Set[T]) *Set[T] {
    out := NewSet[T]()
    for k := range s.m { out.Add(k) }
    for k := range o.m { out.Add(k) }
    return out
}

func (s *Set[T]) Intersect(o *Set[T]) *Set[T] {
    out := NewSet[T]()
    // Iterate set nhỏ hơn để tối ưu
    small, big := s, o
    if big.Len() < small.Len() {
        small, big = big, small
    }
    for k := range small.m {
        if big.Has(k) {
            out.Add(k)
        }
    }
    return out
}
```

**Cách tiếp cận**:
- `T comparable` — cần `==` cho map key.
- Dùng `map[T]struct{}` — `struct{}` 0 byte, hiệu quả nhất cho set.
- `Intersect` tối ưu: iterate set nhỏ.

**Verify**:
- `NewSet(1,2,3).Union(NewSet(3,4,5))` → `{1,2,3,4,5}` ✓
- `NewSet(1,2,3).Intersect(NewSet(2,3,4))` → `{2,3}` ✓
- Độ phức tạp: Add/Has/Remove $O(1)$ amortized; Union/Intersect $O(n+m)$.

### Lời giải BT4 — Generic `LinkedList[T]`

```go
type node[T any] struct {
    val  T
    next *node[T]
}

type LinkedList[T any] struct {
    head *node[T]
    n    int
}

func (l *LinkedList[T]) Push(v T) {
    l.head = &node[T]{val: v, next: l.head}
    l.n++
}

func (l *LinkedList[T]) Pop() (T, bool) {
    var zero T
    if l.head == nil { return zero, false }
    v := l.head.val
    l.head = l.head.next
    l.n--
    return v, true
}

func (l *LinkedList[T]) Len() int { return l.n }

func (l *LinkedList[T]) ToSlice() []T {
    out := make([]T, 0, l.n)
    for cur := l.head; cur != nil; cur = cur.next {
        out = append(out, cur.val)
    }
    return out
}
```

**Cách tiếp cận**:
- `node[T]` cũng là generic type — phải nhắc T mỗi lần.
- Push/Pop đều thao tác đầu → $O(1)$.
- `ToSlice` chạy qua toàn list → $O(n)$.

**Verify Push/Pop bằng số**:

| Bước | Op | List | Len |
|---|---|---|---|
| 0 | init | - | 0 |
| 1 | Push(1) | 1→ | 1 |
| 2 | Push(2) | 2→1→ | 2 |
| 3 | Push(3) | 3→2→1→ | 3 |
| 4 | Pop()→3 | 2→1→ | 2 |
| 5 | ToSlice() | `[2,1]` | 2 |

### Lời giải BT5 — Refactor `Min*` thành 1 generic

```go
import "cmp"   // Go 1.21+

func Min[T cmp.Ordered](a, b T) T {
    if a < b { return a }
    return b
}

// Hoặc nếu không dùng cmp.Ordered có sẵn:
// import "golang.org/x/exp/constraints"
// func Min[T constraints.Ordered](a, b T) T { ... }
```

**Verify**:
- `Min(3, 5)` → 3 ✓
- `Min(3.5, 1.2)` → 1.2 ✓
- `Min("a", "b")` → "a" ✓
- `Min(3, "x")` → compile error (đúng kỳ vọng) ✓

**Lưu ý**:
- Tất cả 3 hàm cũ giờ là alias mỏng: `MinInt(a, b)` ↔ `Min(a, b)` — không cần
  giữ nữa.
- Nếu cần ép kiểu rõ ràng: `Min[int32](3, 5)`.

### Lời giải BT6 — 4 lỗi generics

```go
package main

import "fmt"

// Lỗi 1: Container chưa khai báo type parameter
// → Thêm [T any]
type Container[T any] struct {
    items []T
}

// Lỗi 2: receiver thiếu type parameter
// → (c *Container[T])
func (c *Container[T]) Push(v T) {
    c.items = append(c.items, v)
}

// Lỗi 3: any không có ==
// → Đổi any → comparable
func Eq[T comparable](a, b T) bool {
    return a == b
}

// Lỗi 4: Type union chỉ dùng làm constraint, không làm value type
// → Bỏ var n Number = 5 hoặc đổi thành type cụ thể
type Number interface { int | float64 }
// var n Number = 5   ← bỏ dòng này
var n int = 5

func main() {
    fmt.Println(Eq(1, 2))
}
```

**Giải thích chi tiết từng lỗi**:

1. `type Container struct { items []T }` — T không tồn tại trong scope. Phải
   thêm type parameter: `type Container[T any] struct { ... }`.
2. `func (c *Container) Push(v T)` — receiver không có `[T]`, compiler không
   biết `Container` ở đây nghĩa là gì. Phải `func (c *Container[T]) Push(v T)`.
3. `Eq[T any]` — `any` không cho phép `==`. Đổi sang `comparable`.
4. `var n Number = 5` — interface có type union không thể là value type. Phải
   dùng type cụ thể: `var n int = 5`. Number chỉ dùng làm constraint:
   `func F[T Number](x T)`.

---

## 17. Code & Minh hoạ

- [`solutions.go`](./solutions.go) — Min/Max/Sum, Map/Filter/Reduce, Set,
  LinkedList, benchmark generic vs `interface{}` vs raw.
- [`visualization.html`](./visualization.html) — 3 module tương tác: type
  parameter inference, constraint satisfaction, benchmark bar chart.

---

## Bài tiếp theo

- [Lesson 31 — Reflect](../lesson-31-reflect/) — khi generic không đủ (kiểm
  tra type ở runtime, walk struct field), `reflect` lên tiếng.
- Tier 3 đường thẳng: 30 Generics → 31 Reflect → 32 Unsafe & CGo → 33 Memory & GC.

## Tham khảo

- Go blog: ["An Introduction to Generics"](https://go.dev/blog/intro-generics) (2022).
- Go blog: ["When to Use Generics"](https://go.dev/blog/when-generics) (2022).
- Proposal: [Type Parameters Proposal](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md).
- Robert Griesemer & Ian Lance Taylor — GopherCon talks (2021, 2022).
- Package: [`golang.org/x/exp/constraints`](https://pkg.go.dev/golang.org/x/exp/constraints).
- Package: [`cmp`](https://pkg.go.dev/cmp) (Go 1.21+).
- Package: [`slices`](https://pkg.go.dev/slices) (Go 1.21+).
