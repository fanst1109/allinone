# Lesson 31 — `reflect`: Runtime Introspection

> **Tier 3 — Advanced.** Khi chương trình tự nhìn vào chính nó: đọc type, đọc field, đổi giá trị, gọi hàm — tất cả tại runtime, không cần biết trước type ở compile time.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Hiểu **reflection** là gì và vì sao đôi khi không thể né được.
2. Nắm chắc **3 quy luật reflection** của Rob Pike — kim chỉ nam mỗi khi dùng `reflect`.
3. Dùng thuần thục `reflect.TypeOf`, `reflect.ValueOf`, `Kind` vs `Type`, `Elem()`, `CanSet()`.
4. Viết được: struct walker, struct → map, dynamic setter, validator dựa trên tag, `DeepEqual` đơn giản.
5. Biết **chi phí** của reflection và **khi nào không nên** dùng (hot path, code đơn giản).

## Kiến thức tiền đề

- [Lesson 15 — struct & method](../lesson-15-struct-method/) — phải nắm struct, field, tag.
- [Lesson 16 — pointers](../lesson-16-pointers/) — vì modify qua reflect yêu cầu pointer.
- [Lesson 18 — interfaces](../lesson-18-interfaces/) — `reflect.TypeOf` nhận `interface{}`, không phải tự nhiên.
- [Lesson 23 — JSON encoding](../lesson-23-json-encoding/) — đã từng dùng `json:"..."` tag, bài này giải thích bên trong.
- [Lesson 30 — generics](../lesson-30-generics/) — sẽ so sánh: nhiều thứ giờ generics làm được, không cần reflect.

---

## 1. Reflection là gì?

> 💡 **Trực giác**: Một chương trình bình thường biết "tôi đang xử lý `User`", code được compile sẵn cho `User`. Một chương trình **reflective** đứng cao hơn một bậc: nó chỉ biết "tôi đang xử lý **một cái gì đó**" và **tự hỏi** "cái đó có những field nào? tên là gì? type là gì? tag là gì?" rồi quyết định cách làm — ngay tại runtime.

**Reflection** = khả năng của một chương trình tự **xem xét** (inspect) và **thao tác** (manipulate) cấu trúc của chính nó tại **runtime**.

Trong Go, mọi thứ liên quan đến reflection sống trong package chuẩn [`reflect`](https://pkg.go.dev/reflect).

### Ví dụ động lực — vì sao cần reflect?

Hãy thử viết một hàm `PrintFields(x)` in tất cả field của bất kỳ struct nào:

```go
type User struct { Name string; Age int }
type Order struct { ID int; Total float64 }

PrintFields(User{"Alice", 30})           // Name=Alice Age=30
PrintFields(Order{ID: 7, Total: 99.9})   // ID=7 Total=99.9
```

Không có reflection, bạn sẽ phải **viết riêng** cho từng type — không thể viết một hàm chung vì compile time không biết `x` có những field nào. Reflection giải bài này.

> ❓ **Câu hỏi tự nhiên**: "Generics (Go 1.18+) thay được reflect chứ?"
>
> Một phần thôi. Generics giải bài "viết một hàm chung cho **nhiều type đã biết trước cấu trúc**" (vd `Min[T constraints.Ordered]`). Nhưng generics **không** giúp bạn nhìn vào field của một struct tuỳ ý hoặc đọc tag. Khi `T` còn unknown completely (vd JSON decode vào `interface{}`), reflect vẫn là cách duy nhất.

---

## 2. Khi nào cần reflect (use case thật)

Bạn đã dùng reflect mà không biết. Tất cả các thư viện sau **đều** dùng `reflect` bên trong:

| Use case | Thư viện | Reflect làm gì |
|---|---|---|
| **JSON encode/decode** | `encoding/json` | Walk struct, đọc tag `json:"..."`, gán giá trị vào field |
| **ORM** (DB ↔ struct) | `gorm`, `sqlx`, `ent` | Map column `name` → field `Name`, đọc tag `db:"..."` |
| **Validator** | `go-playground/validator` | Đọc tag `validate:"required,email,min=8"`, check từng rule |
| **Printf %v / %+v** | `fmt` | Walk struct in ra mọi field |
| **Deep compare** | `reflect.DeepEqual` | So 2 giá trị bất kỳ, recurse vào field/element |
| **Dependency injection** | `wire`, `fx`, `dig` | Tạo instance từ type, resolve dependency theo type |
| **Mock / test helper** | `testify`, `gomock` | Compare giá trị mock với expected |

> 📝 **Điểm chính của mục 2**: reflect là "magic" đằng sau hầu hết framework Go. Hiểu reflect = hiểu cách framework bạn dùng vận hành.

---

## 3. Ba quy luật reflection (Rob Pike)

Rob Pike — một trong những cha đẻ của Go — gọi đây là **3 quy luật của reflection**. Học thuộc, mỗi khi bí cứ chạy về 3 quy luật này.

### Quy luật 1: Từ **interface value → reflection object**

```go
import "reflect"

var x float64 = 3.14
t := reflect.TypeOf(x)   // reflection object Type
v := reflect.ValueOf(x)  // reflection object Value

fmt.Println(t)           // float64
fmt.Println(v)           // 3.14
fmt.Println(v.Kind())    // float64
```

**Điểm khó hiểu nhất**: tham số của `TypeOf` / `ValueOf` là `interface{}`. Khi bạn truyền `x` (kiểu `float64`), Go **tự bọc** vào `interface{}` — pair `(type=float64, value=3.14)`. Reflect đọc cái pair này → tạo ra `Type` và `Value`.

> 💡 **Hình dung**: `interface{}` là **viên kẹo có vỏ nhãn**. Vỏ ghi "kiểu = float64", trong là 3.14. `TypeOf` đọc vỏ. `ValueOf` đọc cả vỏ lẫn ruột.

### Quy luật 2: Từ **reflection object → interface value**

```go
v := reflect.ValueOf(3.14)
y := v.Interface().(float64)  // unwrap về interface{}, rồi type-assert
fmt.Println(y)  // 3.14
```

`v.Interface()` đảo ngược: lấy `Value` ra `interface{}`. Sau đó bạn type-assert nếu muốn dùng như type concrete.

### Quy luật 3: Để **modify**, value phải **settable**

```go
var x float64 = 3.14
v := reflect.ValueOf(x)
v.SetFloat(7.1)  // PANIC: reflect: reflect.Value.SetFloat using unaddressable value
```

Vì `reflect.ValueOf(x)` chỉ nhận một **bản copy** của `x` — sửa được copy cũng vô nghĩa. Muốn sửa được, phải truyền **pointer**:

```go
var x float64 = 3.14
p := reflect.ValueOf(&x)   // *float64
v := p.Elem()              // dereference: float64 (settable!)
v.SetFloat(7.1)
fmt.Println(x)             // 7.1
```

> ⚠ **Lỗi thường gặp #1**: Quên `&` khi muốn sửa → panic. Quy luật: **muốn `Set`, phải bắt đầu từ pointer + `.Elem()`**.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Vì sao `reflect.ValueOf(x).SetFloat(...)` panic mà `reflect.ValueOf(&x).Elem().SetFloat(...)` thì OK?
> 2. `v.Interface()` trả về kiểu gì?
> <details><summary>Đáp án</summary>
> 1. Vì truyền `x` là pass-by-copy; reflect không nắm được địa chỉ gốc. Truyền `&x` thì có địa chỉ → `Elem()` tới ô nhớ thật → set được.<br>
> 2. `interface{}` (alias `any`). Phải type-assert mới về kiểu concrete.
> </details>

---

## 4. `reflect.TypeOf(x)` — lấy thông tin Type

`reflect.TypeOf` trả về một `reflect.Type` — describer của type tại runtime.

```go
fmt.Println(reflect.TypeOf(42))           // int
fmt.Println(reflect.TypeOf("hi"))         // string
fmt.Println(reflect.TypeOf(3.14))         // float64
fmt.Println(reflect.TypeOf([]int{1,2}))   // []int
fmt.Println(reflect.TypeOf(User{}))       // main.User
fmt.Println(reflect.TypeOf(&User{}))      // *main.User
fmt.Println(reflect.TypeOf(map[string]int{})) // map[string]int
```

### Method quan trọng của `reflect.Type`

| Method | Trả về | Ghi chú |
|---|---|---|
| `Kind() Kind` | category cơ bản | `Int`, `String`, `Struct`, `Slice`, `Map`, `Ptr`... |
| `Name() string` | tên type khai báo | `User`, `int64`, `""` (anonymous) |
| `String() string` | full name | `main.User`, `int`, `*main.User` |
| `NumField() int` | số field (chỉ struct) | panic nếu không phải struct |
| `Field(i) StructField` | field thứ i | có `Name`, `Type`, `Tag`, `Index` |
| `NumMethod() / Method(i)` | duyệt method | method set của type |
| `Elem() Type` | type được trỏ tới | dùng cho `Ptr`, `Slice`, `Array`, `Chan`, `Map (value)` |

> ❓ **Câu hỏi tự nhiên**: "`Kind` và `Type` khác gì?"
>
> `Type` là **chi tiết**: `time.Time`, `MyInt`, `*User`. `Kind` là **category** (10-20 loại): `Int`, `String`, `Struct`, `Slice`, ... Ví dụ `type MyInt int` thì `Kind() == Int` nhưng `Name() == "MyInt"`. Khi bạn cần biết "đây có phải số nguyên không?" — dùng `Kind`. Khi cần biết "đây có phải `time.Time` không?" — dùng `Type` so sánh.

---

## 5. `reflect.ValueOf(x)` — lấy Value

```go
v := reflect.ValueOf(42)
fmt.Println(v.Int())       // 42 (int64)
fmt.Println(v.Kind())      // int

s := reflect.ValueOf("hi")
fmt.Println(s.String())    // hi
fmt.Println(s.Len())       // 2
```

### Đọc giá trị (read)

| Method | Yêu cầu Kind | Trả về |
|---|---|---|
| `Int()` | `Int*` | `int64` |
| `Uint()` | `Uint*` | `uint64` |
| `Float()` | `Float32/64` | `float64` |
| `Bool()` | `Bool` | `bool` |
| `String()` | `String` | `string` (đặc biệt: vẫn return được dù sai kind — sẽ là `"<TYPE Value>"`) |
| `Len() / Cap()` | `Slice/Array/Map/String/Chan` | `int` |
| `Index(i)` | `Slice/Array/String` | `Value` |
| `MapKeys()` | `Map` | `[]Value` |
| `MapIndex(k)` | `Map` | `Value` |
| `Interface()` | bất kỳ | `interface{}` |

### Ghi giá trị (write, chỉ khi settable)

```go
v.SetInt(100)
v.SetString("hello")
v.SetFloat(3.14)
v.SetBool(true)
v.Set(reflect.ValueOf(newValue))   // generic set, type phải match
```

> ⚠ **Lỗi thường gặp #2**: gọi `v.Int()` khi `v.Kind() != Int*` → panic. **Luôn check `Kind()` trước**:
>
> ```go
> if v.Kind() == reflect.Int || v.Kind() == reflect.Int64 {
>     n := v.Int()
> }
> ```

### Pointer follow: `Elem()`

```go
x := 42
p := reflect.ValueOf(&x)       // *int
fmt.Println(p.Kind())          // ptr
fmt.Println(p.Elem().Kind())   // int
fmt.Println(p.Elem().Int())    // 42
p.Elem().SetInt(100)
fmt.Println(x)                 // 100
```

> 📝 **Điểm chính của mục 5**: `Elem()` là "dereference của reflect". Mỗi khi gặp pointer/interface/slice element, nhớ `Elem()`.

---

## 6. `Kind` vs `Type` — phân biệt rõ

```go
type Celsius float64
type Fahrenheit float64

var c Celsius = 36.5
var f Fahrenheit = 97.7

tc := reflect.TypeOf(c)
tf := reflect.TypeOf(f)

fmt.Println(tc, tf)              // main.Celsius main.Fahrenheit
fmt.Println(tc == tf)            // false  (Type khác nhau)
fmt.Println(tc.Kind() == tf.Kind()) // true  (đều là Float64)
```

### Bảng `Kind` đầy đủ

```
Invalid       Bool          Int           Int8          Int16
Int32         Int64         Uint          Uint8         Uint16
Uint32        Uint64        Uintptr       Float32       Float64
Complex64     Complex128    Array         Chan          Func
Interface     Map           Ptr           Slice         String
Struct        UnsafePointer
```

**Quy tắc**:
- Cần biết **category** (numeric? container? pointer?) → `Kind()`.
- Cần check **đúng type cụ thể** (`time.Time`, `uuid.UUID`?) → so sánh `Type`.

---

## 7. Walk struct — đọc tất cả field

Đây là **bài tập cơ bản nhất** với reflect. JSON encoder và ORM đều bắt đầu từ đây.

```go
type User struct {
    Name  string `json:"name"  validate:"required"`
    Email string `json:"email" validate:"required,email"`
    Age   int    `json:"age"   validate:"min=0"`
}

func walkStruct(x any) {
    v := reflect.ValueOf(x)
    t := reflect.TypeOf(x)
    if t.Kind() != reflect.Struct {
        return
    }
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)          // StructField (metadata)
        val := v.Field(i)        // Value (giá trị)
        fmt.Printf("%-6s %-8v %-20v json=%q validate=%q\n",
            f.Name, f.Type, val.Interface(),
            f.Tag.Get("json"), f.Tag.Get("validate"))
    }
}

walkStruct(User{Name: "Alice", Email: "a@x.io", Age: 30})
```

Output:

```
Name   string   Alice                json="name"  validate="required"
Email  string   a@x.io               json="email" validate="required,email"
Age    int      30                   json="age"   validate="min=0"
```

### Tag là **string**, parse bằng `Tag.Get(key)`

Tag struct là string ở dạng `key:"value" key2:"value2"`. Method `Tag.Get(key)` chỉ trả value cho key đó. Bên trong, validator parse value (`required,email,min=8`) bằng `strings.Split(",")` nữa.

> ❓ **Câu hỏi tự nhiên**: "Vì sao tag là string mà không phải có syntax cố định?"
>
> Vì tag được thiết kế để **mở rộng cho mọi thư viện**, không bó buộc syntax. Mỗi lib (`json`, `gorm`, `validate`...) tự định nghĩa cách parse value của mình. Compiler chỉ check tag là string hợp lệ, không can thiệp nội dung.

---

## 8. Modify field — qua pointer + `Elem()` + `CanSet()`

```go
type User struct {
    Name string
    Age  int
}

u := User{Name: "Alice", Age: 30}

// SAI: u là value, không sửa được
v := reflect.ValueOf(u)
v.FieldByName("Name").SetString("Bob")  // PANIC

// ĐÚNG: truyền pointer, dereference
p := reflect.ValueOf(&u).Elem()  // Value của struct, addressable
if p.FieldByName("Name").CanSet() {
    p.FieldByName("Name").SetString("Bob")
}
fmt.Println(u)  // {Bob 30}
```

### Vì sao có `CanSet()`?

3 lý do làm value **không settable**:

1. **Truyền by-value** (không phải pointer) → reflect không có địa chỉ.
2. **Field unexported** (chữ thường) — Go bảo vệ encapsulation, reflect cũng không phá được.
   ```go
   type Secret struct { token string }  // token không settable qua reflect
   ```
3. **Map element** — map element không addressable theo design Go (vì rehash có thể di chuyển bucket).
   ```go
   m := map[string]int{"a": 1}
   reflect.ValueOf(m).MapIndex(reflect.ValueOf("a")).SetInt(2)  // PANIC
   // Cách đúng: m["a"] = 2 hoặc dùng MapIndex để đọc, dùng SetMapIndex để ghi
   reflect.ValueOf(m).SetMapIndex(reflect.ValueOf("a"), reflect.ValueOf(2))
   ```

> ⚠ **Lỗi thường gặp #3**: Tưởng struct field mặc định settable. Quy trình bắt buộc:
> 1. Truyền pointer (`&obj`).
> 2. `.Elem()` để vào struct.
> 3. `.Field(i)` hoặc `.FieldByName("X")`.
> 4. `CanSet()` check (đặc biệt nếu field có thể unexported).
> 5. Gọi `SetX`.

---

## 9. Call function dynamically

Reflect cho phép gọi hàm **mà compile time chưa biết hàm đó là gì**:

```go
add := func(a, b int) int { return a + b }

fnVal := reflect.ValueOf(add)
args := []reflect.Value{
    reflect.ValueOf(3),
    reflect.ValueOf(4),
}
results := fnVal.Call(args)  // []reflect.Value
fmt.Println(results[0].Int())  // 7
```

### Ví dụ thực: dispatcher cho HTTP handler

```go
handlers := map[string]any{
    "ping":  func() string { return "pong" },
    "echo":  func(s string) string { return s },
    "add":   func(a, b int) int { return a + b },
}

func dispatch(name string, args ...any) []reflect.Value {
    fn := reflect.ValueOf(handlers[name])
    in := make([]reflect.Value, len(args))
    for i, a := range args { in[i] = reflect.ValueOf(a) }
    return fn.Call(in)
}

dispatch("add", 10, 20)[0].Int()  // 30
```

> ⚠ **Lỗi thường gặp #4**: Số/kiểu argument không khớp signature → panic. Dùng `fnVal.Type().NumIn()` và `In(i)` để validate trước.

---

## 10. Create new value runtime — `reflect.New(t)`

```go
t := reflect.TypeOf(User{})           // type User
ptr := reflect.New(t)                 // *User (zero value)
ptr.Elem().FieldByName("Name").SetString("Alice")
user := ptr.Elem().Interface().(User)
fmt.Println(user)  // {Alice 0}
```

`reflect.New(t)` y hệt `new(T)` trong code thường — cấp phát một zero value, trả về pointer.

**Use case**: ORM cần tạo `*User` mới rồi `Scan` row vào field:

```go
func scanRow(rows *sql.Rows, target any) error {
    v := reflect.ValueOf(target).Elem()  // target là *User → v là User
    fields := make([]any, v.NumField())
    for i := range fields {
        fields[i] = v.Field(i).Addr().Interface()  // địa chỉ field i
    }
    return rows.Scan(fields...)
}
```

---

## 11. Generic-ish bằng reflect (pre Go 1.18)

Trước Go 1.18, **không có generics** → reflect là cách duy nhất viết "hàm cho mọi type":

```go
// Pre-1.18: Filter generic dùng reflect
func Filter(slice any, pred func(any) bool) any {
    s := reflect.ValueOf(slice)
    out := reflect.MakeSlice(s.Type(), 0, s.Len())
    for i := 0; i < s.Len(); i++ {
        if pred(s.Index(i).Interface()) {
            out = reflect.Append(out, s.Index(i))
        }
    }
    return out.Interface()
}

// Go 1.18+: dùng generics, gọn hơn 10 lần
func Filter[T any](s []T, pred func(T) bool) []T { /* ... */ }
```

> 💡 **Trực giác**: Reflect là "generic ở runtime", generics là "generic ở compile time". Generics nhanh hơn (no type check at runtime) và type-safe hơn (compile error). Reflect linh hoạt hơn (xử lý type unknown completely, đọc tag).

---

## 12. Chi phí performance

Reflect **chậm hơn 10-100×** so với direct code, vì:

1. **Type lookup tại runtime** mỗi lần gọi.
2. **Interface boxing/unboxing** (chuyển concrete ↔ `interface{}`).
3. **Allocation** — `reflect.Value` thường escape lên heap.
4. **Không inline được** — compiler không nhìn xuyên được reflect call.

### Số đo thật (benchmark trên Apple M1, Go 1.22)

| Operation | Direct | Reflect | Slowdown |
|---|---|---|---|
| Đọc int field | 0.3 ns | 12 ns | ~40× |
| Set int field | 0.3 ns | 18 ns | ~60× |
| Call function | 2 ns | 180 ns | ~90× |
| JSON encode 1 struct | 250 ns | (encoding/json đã cache) ~600 ns | ~2.4× |

> ⚠ **Cảnh báo hot path**: nếu hàm chạy **1 triệu lần/giây** (vd request handler), tránh dùng `reflect.Value.FieldByName` trong vòng lặp. Cache `Type` info ngoài loop.

### Pattern cache type info

```go
// Tệ: gọi reflect mỗi lần
func encode(u User) []byte {
    t := reflect.TypeOf(u)  // chạy mỗi call!
    ...
}

// Tốt: cache ngoài
var userType = reflect.TypeOf(User{})
var userFields = func() []reflect.StructField {
    fs := make([]reflect.StructField, userType.NumField())
    for i := range fs { fs[i] = userType.Field(i) }
    return fs
}()
func encode(u User) []byte { /* dùng userType, userFields */ }
```

Đây chính xác là pattern `encoding/json` dùng — có một `sync.Map` cache field info theo `reflect.Type`.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Vì sao reflect chậm hơn direct call ~40-90 lần?
> 2. Khi nào KHÔNG nên dùng reflect?
> <details><summary>Đáp án</summary>
> 1. Type lookup runtime + interface boxing + heap allocation + không inline được.<br>
> 2. (a) Hot path — request handler chạy triệu lần/giây. (b) Code đã biết rõ type — viết thẳng nhanh và rõ hơn. (c) Có generics thay thế được — Go 1.18+ ưu tiên generics.
> </details>

---

## 13. Common pitfall — checklist

| Pitfall | Triệu chứng | Cách tránh |
|---|---|---|
| Gọi `Int()` trên non-int | `panic: reflect: call of reflect.Value.Int on string Value` | Check `Kind()` trước |
| Quên `Elem()` cho pointer | `Kind() == ptr`, không vào được field | `.Elem()` ngay sau `ValueOf(&x)` |
| Modify value không settable | `panic: reflect: reflect.Value.SetX using unaddressable value` | Truyền `&x`, dùng `CanSet()` |
| Tag parse sai | `Tag.Get("Json")` trả `""` | Key case-sensitive: `"json"` (chữ thường) |
| Unexported field | `CanSet()` = false, không Set được | Đổi field thành Exported, hoặc dùng `unsafe` (không khuyến nghị) |
| Map element addressable | `panic` khi `MapIndex().SetX` | Dùng `SetMapIndex(key, val)` |
| `Call` sai số/kiểu arg | `panic: reflect: Call using ...` | Validate qua `Type().NumIn()`/`In(i)` |
| Dùng reflect trong hot path | latency tăng 10-100× | Cache type info, hoặc dùng codegen |

---

## 14. Alternative — khi nào KHÔNG nên reflect

Với Go 1.18+, **generics** giải quyết phần lớn use case mà trước phải reflect:

| Bài | Reflect (cũ) | Generics (mới) |
|---|---|---|
| `Min`, `Max`, `Sort` | reflect Slice | `func Min[T cmp.Ordered](a, b T) T` |
| `Map / Filter / Reduce` | reflect Slice | `func Filter[T any](s []T, ...) []T` |
| Container (set, list) | `interface{}` everywhere | `Set[T comparable]` |

**Reflect vẫn cần khi**:
- Type unknown **completely** tại compile time (JSON decode vào `interface{}`).
- Đọc **tag** struct.
- Walk struct **bất kỳ** (validator, ORM mapping).
- Gọi method **theo tên runtime** (RPC dispatcher).

> 📝 **Điểm chính của mục 14**: 2026 viết Go mà thấy mình đang reflect, hãy tự hỏi *"có dùng generics được không?"*. Nếu được — generics gần như luôn tốt hơn (rõ ràng, nhanh, type-safe).

---

## 15. Ứng dụng thực tế trong phần mềm

> 💡 **Reflection mạnh nhưng chậm + mất type-safety — bạn hiếm khi viết, nhưng dùng nó gián tiếp qua MỌI thư viện encode/ORM/validate.**

| Thư viện bạn dùng | Reflection làm gì bên trong |
|-------------------|------------------------------|
| **`encoding/json`** | Đọc struct tag `json:"..."`, map field ↔ JSON key lúc runtime |
| **ORM (GORM, sqlx)** | Map cột DB ↔ field struct qua tag + reflect |
| **Validator (`validate:"required"`)** | Đọc tag, kiểm field theo luật |
| **`fmt.Printf("%+v")`** | Duyệt field in giá trị |
| **DI framework, config loader** | Điền struct từ env/yaml theo tên/tag |

### 15.1. Ví dụ cụ thể — vì sao `json.Marshal` cần reflection

`json.Marshal(anyStruct)` không biết trước struct nào → dùng reflect lúc runtime: duyệt từng field, đọc tag `json:"name,omitempty"`, lấy giá trị, sinh JSON. Đó là lý do nó nhận `interface{}` và chạy với **bất kỳ** struct. Cái giá: chậm hơn code sinh tay ~vài lần. Thư viện hiệu năng cao (easyjson, ffjson) **sinh code** lúc build thay reflect để nhanh hơn — đánh đổi linh hoạt lấy tốc độ.

> ⚠ **Đừng tự viết reflection trừ khi buộc phải.** Reflect: (1) **chậm** (không inline, kiểm type runtime); (2) **mất type-safety** (lỗi thành panic runtime thay vì compile error); (3) **khó đọc/bảo trì**. Từ Go 1.18 có **generics** — nhiều việc trước cần reflect (container generic, hàm tổng quát) giờ dùng generics: nhanh, type-safe, rõ ràng. Quy tắc: thấy mình viết reflect → hỏi "generics được không?".

### 15.2. 📝 Tóm tắt mục 15

- Reflection chạy bên trong mọi thư viện **encode/JSON, ORM, validator, fmt, config loader** (đọc struct tag lúc runtime).
- Cái giá: chậm + mất type-safety → thư viện tốc độ cao sinh code thay reflect.
- Hiếm khi tự viết; Go 1.18+ có **generics** thay nhiều ca dùng reflect cũ.

## 16. Bài tập

### BT1 — Print all fields (recursive)

Viết `func PrintFields(x any, indent int)` in tất cả field của struct, **recurse vào nested struct**:

```go
type Address struct { City, Country string }
type User struct {
    Name string
    Age  int
    Addr Address
}

PrintFields(User{"Alice", 30, Address{"HCM", "VN"}}, 0)
// Name: Alice (string)
// Age: 30 (int)
// Addr:
//   City: HCM (string)
//   Country: VN (string)
```

### BT2 — Struct → `map[string]any`

```go
func StructToMap(x any) map[string]any
```

Convert struct thành map với key = field name, value = field value. Bỏ qua unexported field.

### BT3 — Set field by name

```go
func SetField(obj any, name string, value any) error
```

`obj` là pointer tới struct. Tìm field theo `name`, set thành `value`. Trả error nếu: không phải pointer, field không tồn tại, không settable, type mismatch.

### BT4 — Simple DeepEqual

Viết lại `reflect.DeepEqual` cho 3 kind: `Struct`, `Slice`, `Map`. (Không cần handle pointer/chan/func.)

```go
func DeepEq(a, b any) bool
```

### BT5 — Required validator

Viết validator đọc tag `validate:"required"`. Trả error nếu field đó zero value:

```go
type User struct {
    Name  string `validate:"required"`
    Email string `validate:"required"`
    Age   int
}
Validate(User{Name: "Alice"})        // error: Email is required
Validate(User{Name: "Alice", Email: "a@x.io"}) // nil
```

### BT6 — Sửa bug

Tìm và sửa bug ở 4 đoạn code:

```go
// (a)
var x = 42
reflect.ValueOf(x).SetInt(100)

// (b)
type User struct { Name string }
u := &User{}
reflect.ValueOf(u).FieldByName("Name").SetString("Alice")

// (c)
v := reflect.ValueOf("hello")
n := v.Int()
fmt.Println(n)

// (d)
type User struct {
    Name string `JSON:"name"`
}
t := reflect.TypeOf(User{})
fmt.Println(t.Field(0).Tag.Get("json"))  // muốn in "name"
```

---

## 17. Lời giải chi tiết

### BT1 — PrintFields recursive

**Cách tiếp cận**: dùng `reflect.ValueOf(x)`, lặp `NumField`. Với mỗi field, nếu `Kind() == Struct` → recurse với indent + 1.

```go
func PrintFields(x any, indent int) {
    v := reflect.ValueOf(x)
    t := reflect.TypeOf(x)
    if v.Kind() == reflect.Ptr { v = v.Elem(); t = t.Elem() }
    if v.Kind() != reflect.Struct { return }
    pad := strings.Repeat("  ", indent)
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        val := v.Field(i)
        if val.Kind() == reflect.Struct {
            fmt.Printf("%s%s:\n", pad, f.Name)
            PrintFields(val.Interface(), indent+1)
        } else {
            fmt.Printf("%s%s: %v (%s)\n", pad, f.Name, val.Interface(), val.Type())
        }
    }
}
```

**Độ phức tạp**: $O(n)$ với n là tổng field (kể cả nested).

### BT2 — StructToMap

```go
func StructToMap(x any) map[string]any {
    out := make(map[string]any)
    v := reflect.ValueOf(x)
    t := reflect.TypeOf(x)
    if v.Kind() == reflect.Ptr { v = v.Elem(); t = t.Elem() }
    if v.Kind() != reflect.Struct { return out }
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        if !f.IsExported() { continue }  // bỏ qua unexported
        out[f.Name] = v.Field(i).Interface()
    }
    return out
}
```

Test:

```go
type U struct { Name string; Age int; secret string }
m := StructToMap(U{"Alice", 30, "xyz"})
// map[Age:30 Name:Alice]   <-- secret bị loại
```

### BT3 — SetField by name

```go
func SetField(obj any, name string, value any) error {
    v := reflect.ValueOf(obj)
    if v.Kind() != reflect.Ptr || v.IsNil() {
        return errors.New("obj must be non-nil pointer")
    }
    v = v.Elem()
    if v.Kind() != reflect.Struct {
        return errors.New("obj must point to struct")
    }
    field := v.FieldByName(name)
    if !field.IsValid() {
        return fmt.Errorf("no field %q", name)
    }
    if !field.CanSet() {
        return fmt.Errorf("field %q cannot be set", name)
    }
    val := reflect.ValueOf(value)
    if field.Type() != val.Type() {
        return fmt.Errorf("type mismatch: field %s vs value %s", field.Type(), val.Type())
    }
    field.Set(val)
    return nil
}
```

Test: `SetField(&u, "Name", "Bob")` → OK. `SetField(u, ...)` → error (không pointer). `SetField(&u, "Foo", 1)` → error (field không tồn tại).

### BT4 — DeepEq

```go
func DeepEq(a, b any) bool {
    va, vb := reflect.ValueOf(a), reflect.ValueOf(b)
    return deepEqValue(va, vb)
}

func deepEqValue(a, b reflect.Value) bool {
    if a.Type() != b.Type() { return false }
    switch a.Kind() {
    case reflect.Struct:
        for i := 0; i < a.NumField(); i++ {
            if !deepEqValue(a.Field(i), b.Field(i)) { return false }
        }
        return true
    case reflect.Slice, reflect.Array:
        if a.Len() != b.Len() { return false }
        for i := 0; i < a.Len(); i++ {
            if !deepEqValue(a.Index(i), b.Index(i)) { return false }
        }
        return true
    case reflect.Map:
        if a.Len() != b.Len() { return false }
        for _, k := range a.MapKeys() {
            v2 := b.MapIndex(k)
            if !v2.IsValid() { return false }
            if !deepEqValue(a.MapIndex(k), v2) { return false }
        }
        return true
    default:
        return a.Interface() == b.Interface()
    }
}
```

### BT5 — Required validator

```go
func Validate(x any) error {
    v := reflect.ValueOf(x)
    t := reflect.TypeOf(x)
    if v.Kind() == reflect.Ptr { v = v.Elem(); t = t.Elem() }
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        rule := f.Tag.Get("validate")
        if !strings.Contains(rule, "required") { continue }
        if v.Field(i).IsZero() {
            return fmt.Errorf("%s is required", f.Name)
        }
    }
    return nil
}
```

`Value.IsZero()` (Go 1.13+) check zero value của bất kỳ kind. Trước đó phải so với `reflect.Zero(t)`.

### BT6 — Sửa bug

**(a)** `reflect.ValueOf(x).SetInt(100)` — sai vì truyền by-value.

```go
// Sửa:
var x = 42
reflect.ValueOf(&x).Elem().SetInt(100)
```

**(b)** Quên `Elem()` cho pointer:

```go
// Sửa:
u := &User{}
reflect.ValueOf(u).Elem().FieldByName("Name").SetString("Alice")
```

**(c)** Gọi `Int()` trên string:

```go
// Sửa: check Kind, hoặc dùng đúng method
v := reflect.ValueOf("hello")
if v.Kind() == reflect.String {
    fmt.Println(v.String())
}
```

**(d)** Tag key sai case (`JSON` thay vì `json`):

```go
type User struct {
    Name string `json:"name"`   // key phải chữ thường
}
```

---

## 18. Code & Minh họa

- [solutions.go](./solutions.go) — code thực thi đầy đủ: TypeOf/ValueOf demo, walk struct, modify với Elem, dynamic call, simple validator.
- [visualization.html](./visualization.html) — 3 module tương tác: struct inspector, settable check, performance compare.

---

## 18. Tóm tắt (TL;DR)

- **Reflection** = chương trình tự xem & sửa cấu trúc của mình tại runtime.
- **3 quy luật Rob Pike**: interface → reflect object → interface; modify cần settable (pointer + `Elem()`).
- **`TypeOf` vs `ValueOf`**: cái lấy describer, cái lấy value+describer.
- **`Kind` vs `Type`**: category vs cụ thể. Check Kind trước khi gọi `Int()`/`Float()`/`String()`.
- **Walk struct**: `NumField` + `Field(i)` + `Tag.Get("json")`. Đây là nền của JSON, ORM, validator.
- **Modify** chỉ qua pointer + `Elem()` + `CanSet()`. Map element không settable trực tiếp — dùng `SetMapIndex`.
- **Performance**: chậm 10-100×, escape heap, không inline. Cache type info nếu lặp.
- **2026+**: ưu tiên **generics** khi có thể; reflect chỉ khi type unknown completely hoặc cần đọc tag.

---

## Bài tiếp theo

→ [Lesson 32 — `unsafe` & cgo](../lesson-32-unsafe-cgo/) — đi sâu hơn nữa: bỏ qua type safety, gọi C code, manage memory thủ công.
