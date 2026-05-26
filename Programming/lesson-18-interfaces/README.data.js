// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-18-interfaces/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 18 — Interface trong Go

> **Tier 2 — Intermediate · Lesson 18**
> Tiền đề: [L15 Struct & Method](../lesson-15-struct-method/), [L16 Pointer](../lesson-16-pointers/), [L11 Functions](../lesson-11-functions/).
> Bài tiếp theo: [L19 Error Handling](../lesson-19-errors/) (sắp tạo).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **interface là gì** trong Go: một tập hợp các method signature.
- Nắm vững **implicit satisfaction** — điểm khác biệt cốt lõi của Go so với Java/C#.
- Biết **method set** quyết định type nào "đủ điều kiện" satisfy interface nào.
- Vẽ được **interface value internals** dưới dạng hai word \`(type, value pointer)\`.
- Bẫy được pitfall kinh điển **nil interface vs interface chứa nil**.
- Dùng thành thạo **type assertion** và **type switch**.
- Đọc và áp dụng được các interface chuẩn quan trọng: \`error\`, \`io.Reader/Writer\`, \`fmt.Stringer\`, \`sort.Interface\`, \`http.Handler\`.
- Áp dụng idiom **"Accept interfaces, return structs"**.
- Thiết kế interface theo nguyên tắc **interface segregation** (giữ interface nhỏ).

---

## 1. Interface là gì?

> **💡 Trực giác** — Hãy nghĩ interface như một **danh sách yêu cầu công việc** trong bản tin tuyển dụng: *"Cần: biết đọc, biết viết."* Bất kỳ ai (con người, robot, AI) **làm được hai việc đó** đều ứng cử được. Interface không quan tâm bạn là ai — chỉ quan tâm bạn *làm được gì*.

Trong Go, **interface là một type chỉ liệt kê các method signature**, không có data field, không có implementation. Cú pháp:

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Stringer interface {
    String() string
}
\`\`\`

Một **giá trị interface** có thể giữ bất kỳ value của type cụ thể (concrete type) nào **có đủ tất cả các method** mà interface yêu cầu.

**4 ví dụ cụ thể** (lượng hóa: ≥ 4 ví dụ số/định nghĩa):

\`\`\`go
// VD1: interface 0 method — ai cũng satisfy
type Any interface{}                       // = \`any\` (Go 1.18+)

// VD2: interface 1 method
type Stringer interface { String() string }

// VD3: interface 2 method
type ReadWriter interface {
    Read(p []byte) (int, error)
    Write(p []byte) (int, error)
}

// VD4: interface 4 method
type sort.Interface interface {            // (giả ghi)
    Len() int
    Less(i, j int) bool
    Swap(i, j int)
    // (chuẩn thật ra có 3 method, đây là minh họa)
}
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *Interface có phải là class abstract không?* — Không hẳn. Class abstract trong Java cho phép có field và implementation một phần. Interface Go chỉ có signature, không có gì khác.
> - *Có thể tạo instance của interface không?* — Không trực tiếp. Bạn tạo một concrete value (vd \`bytes.Buffer{}\`) rồi **gán** vào biến kiểu interface (\`var w io.Writer = &bytes.Buffer{}\`).
> - *Interface có chiếm bộ nhớ không?* — Có, mỗi biến interface chiếm **2 words** (sẽ phân tích ở §5).

---

## 2. Implicit satisfaction — KHÔNG cần \`implements\`

> **💡 Trực giác** — Trong Java/C#, bạn phải **đăng ký công khai**: \`class Dog implements Animal\`. Trong Go, bạn chỉ cần **làm được việc** — không cần đăng ký, không cần ký giấy. Compiler tự kiểm tra: *"type này có đủ method không? Có → ok, dùng được."*

### So sánh trực tiếp

**Java (explicit / nominal typing):**

\`\`\`java
interface Animal {
    String speak();
}

class Dog implements Animal {            // PHẢI viết "implements Animal"
    public String speak() { return "Woof"; }
}
\`\`\`

Nếu bạn quên \`implements Animal\`, biên dịch ra class Dog có method \`speak()\` đúng signature — Java **vẫn không** coi Dog là Animal. Phải khai báo rõ.

**Go (implicit / structural typing):**

\`\`\`go
type Animal interface {
    Speak() string
}

type Dog struct{}
func (d Dog) Speak() string { return "Woof" }    // KHÔNG có "implements" gì cả

// Trong file khác, ai đó muốn dùng Dog như Animal:
var a Animal = Dog{}                              // OK, compiler tự kiểm
\`\`\`

Dog không "biết" về Animal — nó chỉ có method \`Speak() string\`. Khi ai đó gán Dog vào biến kiểu Animal, compiler check method set ⇒ thấy có đủ ⇒ ok.

### Vì sao điều này quan trọng?

1. **Decoupling tuyệt vời** — Type ở package \`A\` có thể "satisfy" interface ở package \`B\` mà *A không cần import B*. Vd: \`bytes.Buffer\` (package \`bytes\`) tự động satisfy \`io.Writer\` (package \`io\`) dù \`bytes\` không import \`io\` cho mục đích đó.

2. **Retrofit dễ** — Có thể tạo interface mới để bao bọc type cũ. Ví dụ: bạn viết hàm cần \`type HasID interface { ID() string }\`. Bất kỳ struct đã có sẵn method \`ID() string\` đều tự "vào" — không phải sửa code cũ.

3. **Test mocking nhẹ nhàng** — Mock struct chỉ cần implement vài method bạn dùng, không cần kế thừa hay đăng ký gì.

> **⚠ Lỗi thường gặp**
> Người mới đến từ Java hay viết: *"làm sao Go biết Dog là Animal nếu không khai báo?"* — Câu trả lời: compiler chỉ check method set **tại điểm gán**. Nếu bạn không bao giờ gán Dog vào biến Animal, không có gì xảy ra. Chỉ khi gán/truyền tham số mới có kiểm tra.

\`\`\`go
// Compile error: Dog không có method Fly()
type Bird interface { Fly() }
var b Bird = Dog{}     // Lỗi: Dog does not implement Bird (missing Fly method)
\`\`\`

> **🔁 Dừng lại tự kiểm tra**
> Đoạn code này có biên dịch được không?
> \`\`\`go
> type Greeter interface { Greet() string }
> type Cat struct{}
> func (c *Cat) Greet() string { return "Meow" }
> var g Greeter = Cat{}    // <- chỗ này
> \`\`\`
> <details><summary>Đáp án</summary>
> Không. \`Greet\` có pointer receiver \`*Cat\`. Method set của \`Cat\` (value) KHÔNG bao gồm method có pointer receiver. Phải viết \`var g Greeter = &Cat{}\`. Sẽ học rõ ở §4.
> </details>

---

## 3. Mọi type satisfy \`interface{}\` (alias \`any\` từ Go 1.18+)

\`interface{}\` là interface **rỗng** — không yêu cầu method nào. Mọi type đều thoả mãn (vì 0 yêu cầu thì luôn đủ).

\`\`\`go
var x interface{} = 42         // OK
var y any        = "hello"     // any là alias của interface{}
var z any        = []int{1,2}  // OK
var w any        = nil         // OK
\`\`\`

So sánh với Java/Python:

| Ngôn ngữ | "Universal container" | Kiểm tra type |
|----------|----------------------|---------------|
| Java | \`Object\` | runtime (instanceof) hoặc generics |
| Python | bất cứ biến nào (duck typing) | runtime |
| Go | \`any\` / \`interface{}\` | runtime (type assertion / switch) — **nhưng** generics Go 1.18+ tốt hơn |

**Khi nào dùng \`any\`?**

- JSON unmarshal không biết schema: \`var data map[string]any\`.
- Container pre-Go 1.18: viết generic stack/queue.
- Func nhận tham số biến đổi: \`func Println(args ...any)\`.

**Khi nào KHÔNG dùng \`any\`?**

- Khi đã biết shape của data → định nghĩa interface hoặc struct cụ thể.
- Khi muốn type safety compile-time → dùng **generics** (Go 1.18+), không dùng \`any\`.

> **⚠ Lỗi thường gặp** — Lạm dụng \`any\` biến code Go thành "Python với cú pháp lạ". \`any\` ép bạn dùng type assertion ở mọi nơi → mất type safety. Chỉ dùng khi thật sự cần.

---

## 4. Method set — luật chính xác

> **💡 Trực giác** — Method set là **danh sách tất cả method có thể gọi trên một type**. Interface check method set của type → nếu khớp → ok.

### Luật chính xác (specs Go)

| Type biểu thức | Method set bao gồm |
|----------------|--------------------|
| \`T\` (value) | Tất cả method với receiver \`(t T)\` |
| \`*T\` (pointer) | Tất cả method với receiver \`(t T)\` **VÀ** \`(t *T)\` |

Ghi nhớ: **pointer "trên cơ" value** — pointer có cả 2 loại; value chỉ có value-receiver method.

### Tại sao có quy tắc này?

Nếu method có pointer receiver \`func (t *T) M()\`, gọi M có thể **mutate** t. Nếu cho \`T\` (value) cũng coi như satisfy interface, thì khi gán \`var i Interface = tValue\`, Go phải addressable hóa tValue — nhưng value trong interface **không addressable** ⇒ mâu thuẫn ⇒ Go cấm.

### 4 ví dụ cụ thể

\`\`\`go
type Counter struct { n int }

func (c Counter)  Get() int   { return c.n }   // value receiver
func (c *Counter) Inc()       { c.n++ }        // pointer receiver

// Method set:
// - Counter:   {Get}
// - *Counter:  {Get, Inc}

type Getter interface { Get() int }
type Incer  interface { Inc() }
type Both   interface { Get() int; Inc() }
\`\`\`

| Biến | Gán | Kết quả |
|------|-----|---------|
| \`var g Getter = Counter{}\`   | value | ✓ Counter có Get |
| \`var g Getter = &Counter{}\`  | pointer | ✓ *Counter cũng có Get |
| \`var i Incer = Counter{}\`    | value | ✗ Counter không có Inc |
| \`var i Incer = &Counter{}\`   | pointer | ✓ *Counter có Inc |
| \`var b Both = Counter{}\`     | value | ✗ thiếu Inc |
| \`var b Both = &Counter{}\`    | pointer | ✓ |

### Walk-through cụ thể

\`\`\`go
c := Counter{n: 5}
fmt.Println(c.Get())    // 5  — gọi trực tiếp ok
c.Inc()                 // OK: Go tự lấy &c (addressable variable)
fmt.Println(c.n)        // 6

// NHƯNG khi gán vào interface:
var i Incer = c         // LỖI biên dịch: Counter does not implement Incer
                        // (Inc method has pointer receiver)
var i2 Incer = &c       // OK
i2.Inc()
fmt.Println(c.n)        // 7 — vẫn mutate c qua pointer trong interface
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *Sao gọi \`c.Inc()\` trực tiếp lại OK?* — Vì \`c\` là biến **addressable**, Go tự rewrite thành \`(&c).Inc()\`. Nhưng giá trị **trong interface** không addressable → không tự rewrite được → cấm gán.
> - *Có cách nào ép value satisfy interface có pointer-receiver method không?* — Không. Phải dùng pointer. Hoặc đổi method thành value receiver.

> **⚠ Lỗi thường gặp**
> \`\`\`go
> // Sai: gán literal (rvalue, không addressable)
> var w io.Writer = bytes.Buffer{}   // LỖI: Write có pointer receiver
> var w io.Writer = &bytes.Buffer{}  // ĐÚNG
> \`\`\`

> **🔁 Tự kiểm tra**
> Tại sao \`fmt.Println\` chấp nhận cả \`time.Time{}\` (value) lẫn \`&time.Time{}\` (pointer)?
> <details><summary>Đáp án</summary>
> Method \`String() string\` của \`time.Time\` có **value receiver**: \`func (t Time) String() string\`. Nên cả \`Time\` lẫn \`*Time\` đều satisfy \`fmt.Stringer\`.
> </details>

---

## 5. Interface value internals — 2-word representation

> **💡 Trực giác** — Một biến interface giống như **bao bì 2 ngăn**: ngăn trên ghi *"đây là loại gì?"*, ngăn dưới chứa *"con trỏ tới dữ liệu thật"*.

### ASCII art

\`\`\`
                  ┌──────────────┐
   interface  ──> │ type pointer │ ──> *Counter (type descriptor)
   value          ├──────────────┤
                  │ value pointer│ ──> ─┐
                  └──────────────┘      │
                                        ▼
                                  ┌────────────┐
                                  │ n: 5       │  ← dữ liệu thật (Counter struct)
                                  └────────────┘
\`\`\`

Mỗi biến interface có 2 words (16 bytes trên 64-bit):

1. **type word** — con trỏ tới *type descriptor* (metadata: tên type, danh sách method, kích thước, ...).
2. **data word** — con trỏ tới value thật (hoặc lưu trực tiếp nếu value đủ nhỏ — chi tiết runtime).

### Khi gán

\`\`\`go
var s fmt.Stringer
fmt.Printf("%T %v\\n", s, s)              // <nil> <nil>  — cả 2 word = nil

s = Counter{n: 5}
fmt.Printf("%T %v\\n", s, s)              // main.Counter {5}
// Lúc này: type word = *Counter, data word = pointer tới Counter{5}

s = &Counter{n: 9}
fmt.Printf("%T %v\\n", s, s)              // *main.Counter &{9}
// type word = **Counter, data word = pointer tới Counter{9}

s = (*Counter)(nil)
fmt.Printf("%T %v\\n", s, s)              // *main.Counter <nil>
// type word = **Counter (NOT NIL), data word = nil
//  ⇒ s != nil    (đây là pitfall ở §6)
\`\`\`

### Khi gọi method

\`\`\`go
s.String()
// 1. Đọc type word → tìm method \`String\` trong method table của *Counter
// 2. Đọc data word → truyền làm receiver
// 3. Gọi (*Counter).String(dataWord)
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *Vì sao interface ko inline value mà phải pointer?* — Để mọi interface variable có kích thước cố định (2 words), bất kể value bên trong to nhỏ. Nếu inline, mỗi biến interface lại có size khác → không tổ chức được trong slice/map.
> - *Có overhead không?* — Có. So với gọi method trực tiếp trên concrete type, gọi qua interface có 1 indirection (đọc method table). Trong hot loop, đáng cân nhắc.

> **📝 Tóm tắt §5**
> - Interface = (type pointer, value pointer) — 2 words.
> - Cả hai = nil ⇔ interface == nil.
> - Type pointer khác nil **trong khi** value pointer = nil ⇒ interface **không** == nil (pitfall §6).

---

## 6. Nil interface vs interface chứa nil — pitfall kinh điển

> **💡 Trực giác** — Một phong bì rỗng (\`nil interface\`) khác với một phong bì có ghi địa chỉ nhưng bên trong rỗng (\`interface chứa nil\`). Trông bên ngoài đều "có vẻ rỗng" — nhưng test \`if envelope != nil\` sẽ phân biệt được.

### Code minh họa

\`\`\`go
type MyError struct{ msg string }
func (e *MyError) Error() string { return e.msg }

func doWork() error {
    var e *MyError = nil       // pointer = nil
    return e                   // gán vào error (interface)
}

func main() {
    err := doWork()
    if err != nil {
        fmt.Println("LỖI:", err)    // CHẠY VÀO ĐÂY! In ra "LỖI: <nil>"
    }
}
\`\`\`

**Vì sao?** Khi \`return e\`, Go tạo interface value với:
- type word = \`*MyError\` (không phải nil — type đã biết tại compile time)
- value word = nil

So sánh \`err != nil\` chỉ true khi **CẢ HAI** word = nil. Ở đây type word khác nil ⇒ \`err != nil\` là true ⇒ vào nhánh.

### 3 ví dụ minh họa rõ

**VD1: nil interface thật**

\`\`\`go
var err error           // chưa gán gì
fmt.Println(err == nil) // true — cả 2 word = nil
\`\`\`

**VD2: interface chứa typed nil**

\`\`\`go
var p *MyError = nil
var err error = p
fmt.Println(err == nil) // false (!!) — type word = *MyError
fmt.Println(p == nil)   // true
\`\`\`

**VD3: function trả về interface với typed nil**

\`\`\`go
func find(id int) error {
    var e *MyError
    if id < 0 {
        e = &MyError{"id âm"}
    }
    return e               // BUG: luôn trả ra non-nil interface
}

err := find(5)
fmt.Println(err == nil)    // false — e == nil nhưng interface bọc nó != nil
\`\`\`

**VD4: cách sửa đúng**

\`\`\`go
func find(id int) error {
    if id < 0 {
        return &MyError{"id âm"}
    }
    return nil             // ĐÚNG: trả về nil literal — cả 2 word của interface = nil
}
\`\`\`

**Quy tắc vàng**: hàm trả về \`error\` nên \`return nil\` (không dùng biến typed) khi không có lỗi.

> **⚠ Lỗi thường gặp**
> Code review hay thấy:
> \`\`\`go
> var err *MyError
> defer func() { handle(err) }()        // sẽ "luôn có lỗi" dù err = nil
> \`\`\`
> Sửa: dùng \`var err error\` (interface type), không phải \`*MyError\` (concrete type).

> **🔁 Tự kiểm tra**
> Đoạn nào in \`nil\`, đoạn nào in \`not nil\`?
> \`\`\`go
> // a)
> var e error
> // b)
> var p *MyError; var e error = p
> // c)
> var e error = nil
> // d)
> var e error = (*MyError)(nil)
> \`\`\`
> <details><summary>Đáp án</summary>
>
> - (a) nil — chưa gán.
> - (b) not nil — type word = \`*MyError\`.
> - (c) nil — gán \`nil\` literal trực tiếp vào interface ⇒ cả 2 word = nil.
> - (d) not nil — gán typed nil ⇒ type word khác nil.
> </details>

---

## 7. Empty interface \`interface{}\` / \`any\` — khi nào dùng, khi nào tránh

### Use cases hợp lệ

**JSON unmarshal generic**:

\`\`\`go
var data map[string]any
json.Unmarshal([]byte(\`{"name":"alice","age":30,"active":true}\`), &data)
// data["name"] có type string
// data["age"]  có type float64 (JSON number → float64)
// data["active"] có type bool
\`\`\`

**Container generic pre-Go 1.18** (lịch sử):

\`\`\`go
type Stack struct { items []any }
func (s *Stack) Push(x any) { s.items = append(s.items, x) }
func (s *Stack) Pop() any   { /* ... */ }
\`\`\`

**Variadic universal**:

\`\`\`go
func Printf(format string, args ...any) (int, error)
\`\`\`

### Sau Go 1.18 — ưu tiên generics

\`\`\`go
// Cũ (any):
func First(slice []any) any { return slice[0] }

// Mới (generics):
func First[T any](slice []T) T { return slice[0] }
\`\`\`

Generic giữ được type info compile-time → an toàn hơn, không cần type assertion.

### 4 lý do hạn chế \`any\`

1. Mất type safety → bug runtime thay vì compile time.
2. Phải \`.()\` assertion mỗi lần dùng → code lủng củng.
3. Interface 2-word overhead.
4. Khó đọc — đọc code thấy \`any\` không biết thứ này thực sự là gì.

---

## 8. Type assertion

Lấy concrete value từ interface. Cú pháp:

\`\`\`go
v := x.(T)        // panic nếu x không có dynamic type T
v, ok := x.(T)    // form comma-ok: ok=false nếu sai, không panic
\`\`\`

### 4 ví dụ

\`\`\`go
var x any = "hello"

// VD1: comma-ok thành công
s, ok := x.(string); fmt.Println(s, ok)        // hello true

// VD2: comma-ok thất bại
n, ok := x.(int);    fmt.Println(n, ok)        // 0 false (zero value)

// VD3: form 1 trả về — panic
n := x.(int)                                    // PANIC: interface conversion

// VD4: assertion sang interface khác
var w io.Writer = os.Stdout
if c, ok := w.(io.Closer); ok {                 // os.Stdout có Close()
    c.Close()
}
\`\`\`

> **⚠ Lỗi thường gặp** — Trừ khi bạn **chắc chắn** type, luôn dùng comma-ok. Form 1 trả về chỉ phù hợp trong test/script nhỏ.

---

## 9. Type switch — xử lý nhiều type

Cú pháp đặc biệt:

\`\`\`go
switch v := x.(type) {
case int:
    fmt.Println("int:", v*2)
case string:
    fmt.Println("string len:", len(v))
case nil:
    fmt.Println("nil")
default:
    fmt.Printf("other: %T\\n", v)
}
\`\`\`

\`v\` được rebind theo từng case.

### 3 ví dụ thực tế

**VD1: in giá trị bất kỳ kiểu human-friendly**

\`\`\`go
func describe(x any) string {
    switch v := x.(type) {
    case int:    return fmt.Sprintf("số nguyên %d", v)
    case float64: return fmt.Sprintf("số thực %.2f", v)
    case string:  return fmt.Sprintf("chuỗi %q dài %d", v, len(v))
    case []byte:  return fmt.Sprintf("blob %d bytes", len(v))
    case nil:     return "không có gì"
    default:      return fmt.Sprintf("type lạ: %T", v)
    }
}

describe(42)          // số nguyên 42
describe(3.14)        // số thực 3.14
describe("hello")     // chuỗi "hello" dài 5
describe(nil)         // không có gì
\`\`\`

**VD2: duyệt JSON đã unmarshal**

\`\`\`go
func walk(v any, indent string) {
    switch x := v.(type) {
    case map[string]any:
        for k, val := range x {
            fmt.Printf("%s%s:\\n", indent, k)
            walk(val, indent+"  ")
        }
    case []any:
        for i, val := range x {
            fmt.Printf("%s[%d]:\\n", indent, i)
            walk(val, indent+"  ")
        }
    case string, float64, bool, nil:
        fmt.Printf("%s%v\\n", indent, x)
    }
}
\`\`\`

**VD3: error type discrimination**

\`\`\`go
err := doSomething()
switch e := err.(type) {
case nil:
    // không lỗi
case *NotFoundError:
    log.Printf("không thấy: %s", e.Key)
case *ValidationError:
    log.Printf("invalid field: %s — %s", e.Field, e.Reason)
case net.Error:
    if e.Timeout() {
        log.Println("timeout, retry...")
    }
default:
    log.Printf("lỗi không rõ: %v", e)
}
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *Có thể gom nhiều type vào một case không?* — Có: \`case int, int64, int32: ...\`. Trong case này, \`v\` có type là **interface** (không phải concrete).
> - *Switch không có \`v :=\` được không?* — Được: \`switch x.(type) { ... }\`. Dùng khi không cần value, chỉ cần biết type.

---

## 10. Interface composition — gộp interface

Go cho phép gộp interface bằng cách *embed*:

\`\`\`go
type Reader interface { Read(p []byte) (int, error) }
type Writer interface { Write(p []byte) (int, error) }
type Closer interface { Close() error }

type ReadWriter   interface { Reader; Writer }            // 2 method: Read, Write
type ReadCloser   interface { Reader; Closer }            // Read, Close
type ReadWriteCloser interface { Reader; Writer; Closer } // Read, Write, Close
\`\`\`

Tất cả các interface này có thật trong package \`io\`. Đây là ví dụ điển hình của **interface segregation** — interface nhỏ ghép lại thành interface to khi cần.

> **💡 Trực giác** — Như lego: viên Read, viên Write, viên Close ghép thành nhiều combination. Không phải đẻ ra một interface monolithic \`File\` có 20 method.

---

## 11. Standard library interfaces quan trọng

### 11.1 \`error\` — quan trọng nhất

\`\`\`go
type error interface {
    Error() string
}
\`\`\`

Một method. Mọi type có method \`Error() string\` đều là error.

\`\`\`go
type MyError struct{ Code int }
func (e *MyError) Error() string { return fmt.Sprintf("E%d", e.Code) }

func work() error { return &MyError{Code: 42} }
\`\`\`

### 11.2 \`io.Reader\` / \`io.Writer\` / \`io.Closer\`

\`\`\`go
type Reader interface { Read(p []byte) (n int, err error) }
type Writer interface { Write(p []byte) (n int, err error) }
type Closer interface { Close() error }
\`\`\`

Đây là cốt lõi của Go I/O. Mọi thứ "đọc được" (file, network, stdin, string, buffer) đều satisfy \`io.Reader\`. Mọi thứ "ghi được" (file, network, stdout, buffer) đều satisfy \`io.Writer\`.

**Ví dụ thực:**

\`\`\`go
// Copy file
src, _ := os.Open("a.txt")           // *os.File satisfy io.Reader
dst, _ := os.Create("b.txt")         // *os.File satisfy io.Writer
io.Copy(dst, src)                    // chỉ cần Reader + Writer

// Đọc từ string
r := strings.NewReader("hello")      // *strings.Reader satisfy io.Reader
io.Copy(os.Stdout, r)                // in "hello"

// Ghi vào buffer
var buf bytes.Buffer                 // *bytes.Buffer satisfy io.Writer
fmt.Fprintln(&buf, "world")
\`\`\`

### 11.3 \`fmt.Stringer\`

\`\`\`go
type Stringer interface { String() string }
\`\`\`

\`fmt.Println\`, \`fmt.Printf %v %s\` tự gọi \`String()\` nếu có.

\`\`\`go
type Color int
const (
    Red Color = iota
    Green
    Blue
)
func (c Color) String() string {
    return []string{"Red","Green","Blue"}[c]
}

fmt.Println(Red)      // in "Red" thay vì "0"
\`\`\`

### 11.4 \`sort.Interface\`

\`\`\`go
type Interface interface {
    Len() int
    Less(i, j int) bool
    Swap(i, j int)
}
\`\`\`

Implement 3 method này → dùng được \`sort.Sort\`.

\`\`\`go
type Person struct{ Name string; Age int }
type ByAge []Person
func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

people := []Person{{"Alice",30},{"Bob",25}}
sort.Sort(ByAge(people))
\`\`\`

> **📝 Lưu ý hiện đại** — Go 1.21+ có \`slices.SortFunc(s, func(a,b T) int)\` đơn giản hơn. Nhưng \`sort.Interface\` vẫn là pattern cốt lõi.

### 11.5 \`http.Handler\`

\`\`\`go
type Handler interface {
    ServeHTTP(w ResponseWriter, r *Request)
}
\`\`\`

Mọi thứ trong Go web đều là Handler. Cho phép **middleware chain**:

\`\`\`go
type LoggingMiddleware struct { Next http.Handler }
func (m LoggingMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    log.Printf("%s %s", r.Method, r.URL.Path)
    m.Next.ServeHTTP(w, r)
}

// Compose:
mux := http.NewServeMux()
mux.HandleFunc("/api", apiHandler)
http.ListenAndServe(":8080", LoggingMiddleware{Next: mux})
\`\`\`

---

## 12. Idiom: Accept interfaces, return structs

Quy tắc nổi tiếng của Go (Postel's law áp dụng vào API):

> **Hãy nhận liberal (interface), trả conservative (struct).**

### 3 ví dụ

**VD1: hàm đọc dữ liệu**

\`\`\`go
// XẤU: bó người gọi vào *os.File
func parse(f *os.File) (Data, error) { ... }

// TỐT: ai có io.Reader đều dùng được
func parse(r io.Reader) (Data, error) { ... }
parse(os.Stdin)                       // ok
parse(strings.NewReader("..."))       // ok
parse(httpResp.Body)                  // ok
\`\`\`

**VD2: constructor trả struct**

\`\`\`go
// XẤU: trả interface chung chung
func NewClient(...) Client { ... }     // "Client" là interface gì?

// TỐT: trả struct cụ thể, người gọi tự cast nếu cần
func NewClient(...) *HTTPClient { ... }
\`\`\`

Vì người gọi có thể quyết định dùng method nào, có thể assert sang interface khác nếu muốn.

**VD3: factory pattern**

\`\`\`go
// Logger interface định nghĩa ở package consumer
type Logger interface { Log(string) }

// Implementation
func NewFileLogger(path string) *fileLogger { ... }      // trả struct
func NewKafkaLogger(brokers []string) *kafkaLogger { ... }

// Function consume:
func ProcessOrder(o Order, log Logger) { ... }           // nhận interface
ProcessOrder(o, NewFileLogger("a.log"))                  // pass struct
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *Nhưng tôi muốn caller dùng generic API?* — Đó là việc của caller. Họ tự khai báo interface mong muốn. Bạn (producer) trả struct cụ thể là đủ.
> - *Lúc nào trả interface là OK?* — Khi struct concrete chứa thông tin nhạy cảm/không nên expose, hoặc factory thật sự trả nhiều type khác nhau. Trường hợp hiếm.

---

## 13. Interface segregation — interface nhỏ

> *"The bigger the interface, the weaker the abstraction."* — **Rob Pike**

Interface 1 method dễ thoả mãn nhất, dễ tái dùng nhất, dễ test nhất.

### Phản ví dụ — interface to

\`\`\`go
// XẤU
type Database interface {
    Connect() error
    Close() error
    Query(sql string) (Rows, error)
    Exec(sql string) (Result, error)
    Begin() (Tx, error)
    Migrate() error
    Backup(path string) error
    // ... 20 method khác
}
\`\`\`

Hàm chỉ cần \`Query\` cũng phải mock cả 20 method ⇒ test khổ.

### Đúng — nhiều interface nhỏ

\`\`\`go
type Querier interface {
    Query(sql string) (Rows, error)
}
type Execer interface {
    Exec(sql string) (Result, error)
}
type Transactor interface {
    Begin() (Tx, error)
}

// Hàm chỉ cần đọc:
func ListUsers(q Querier) []User { ... }

// Hàm cần đọc + ghi:
func UpdateBalance(qe interface{ Querier; Execer }, ...) { ... }
\`\`\`

### Mẫu thực: \`io.Reader\` (1 method) ghép với \`io.Writer\` (1 method) ⇒ \`io.ReadWriter\`

Standard library Go là minh chứng — phần lớn interface có **1-3 method**.

> **📝 Tóm tắt §13**
> - Interface ít method ⇔ ít ràng buộc ⇔ nhiều type satisfy ⇔ tái dùng tốt.
> - Khi thấy interface có > 5 method, hỏi: có thể tách không?

---

## 14. Type assertion pitfall — panic

\`\`\`go
var x any = "hello"
n := x.(int)        // PANIC tại runtime: interface conversion: interface {} is string, not int
\`\`\`

Với form 1-trả-về, sai type sẽ panic. **Luôn dùng comma-ok** trừ khi context bảo đảm type:

\`\`\`go
n, ok := x.(int)
if !ok {
    return fmt.Errorf("expected int, got %T", x)
}
\`\`\`

---

## 15. Common patterns thực tế

### 15.1 Strategy pattern — parameterize behavior

\`\`\`go
type CompressStrategy interface {
    Compress(data []byte) []byte
}
type GzipStrategy struct{}; func (GzipStrategy) Compress(d []byte) []byte { ... }
type ZstdStrategy struct{}; func (ZstdStrategy) Compress(d []byte) []byte { ... }

func Archive(files [][]byte, s CompressStrategy) [][]byte {
    out := make([][]byte, len(files))
    for i, f := range files { out[i] = s.Compress(f) }
    return out
}
\`\`\`

### 15.2 Mocking for test

\`\`\`go
// Production code
type UserRepo interface {
    Get(id int) (User, error)
}

func GreetUser(repo UserRepo, id int) string {
    u, _ := repo.Get(id)
    return "Hi " + u.Name
}

// Test:
type fakeRepo struct{}
func (fakeRepo) Get(id int) (User, error) { return User{Name: "Alice"}, nil }

func TestGreetUser(t *testing.T) {
    got := GreetUser(fakeRepo{}, 1)
    if got != "Hi Alice" { t.Error(got) }
}
\`\`\`

Không cần thư viện mock, không cần DI framework — chỉ cần interface nhỏ.

### 15.3 Plugin — interface là API contract

\`\`\`go
type Validator interface {
    Validate(v any) error
}

var registry = map[string]Validator{}

func Register(name string, v Validator) { registry[name] = v }

// User code chỉ implement Validator → tự "cắm" vào hệ thống.
\`\`\`

---

## Bài tập

### BT1 — Shape interface

Định nghĩa interface \`Shape\` với 2 method \`Area() float64\`, \`Perimeter() float64\`. Implement với:
- \`Circle\` (radius)
- \`Rectangle\` (width, height)
- \`Triangle\` (a, b, c) — dùng công thức Heron cho area.

Viết hàm \`Describe(s Shape)\` in tên loại + area + perimeter. Test với slice \`[]Shape{Circle{5}, Rectangle{3,4}, Triangle{3,4,5}}\`.

### BT2 — Sort custom với sort.Interface

Có struct:

\`\`\`go
type Person struct { Name string; Age int }
\`\`\`

Định nghĩa \`ByAge []Person\` implement \`sort.Interface\` để sort theo Age tăng dần. Sau đó định nghĩa thêm \`ByName\` để sort theo tên alphabet. Test trên slice 5 phần tử.

### BT3 — nil interface pitfall

Dự đoán output của các đoạn code:

\`\`\`go
// (a)
var err error
fmt.Println(err == nil)

// (b)
type MyErr struct{}
func (*MyErr) Error() string { return "x" }
var p *MyErr
var err error = p
fmt.Println(err == nil)

// (c)
func find() error {
    var e *MyErr   // nil
    return e
}
fmt.Println(find() == nil)

// (d)
func find2() error {
    var e *MyErr
    if false { e = &MyErr{} }
    if e == nil { return nil }
    return e
}
fmt.Println(find2() == nil)
\`\`\`

### BT4 — Type switch trên JSON-like value

Viết hàm \`Walk(v any)\` in nội dung của value bất kỳ kiểu JSON, hỗ trợ: \`string\`, \`float64\`, \`bool\`, \`nil\`, \`[]any\`, \`map[string]any\`. Test với:

\`\`\`go
data := map[string]any{
    "name": "alice",
    "age": 30.0,
    "active": true,
    "tags": []any{"go", "dev"},
    "addr": map[string]any{"city": "HN", "zip": "100000"},
}
Walk(data)
\`\`\`

### BT5 — fmt.Stringer cho enum

Định nghĩa enum:

\`\`\`go
type Status int
const (
    Active Status = iota
    Suspended
    Banned
)
\`\`\`

Implement \`String()\` để \`fmt.Println(Active)\` in \`"Active"\` chứ không phải \`0\`. Bonus: thêm method \`Valid() bool\` reject giá trị ngoài 0..2.

### BT6 — Logger interface với 2 implementation

Định nghĩa:

\`\`\`go
type Logger interface {
    Info(msg string)
    Error(msg string)
}
\`\`\`

Implement:
- \`ConsoleLogger\` — in ra stdout với prefix \`[INFO]\` / \`[ERROR]\`.
- \`FileLogger\` — ghi vào file (mock bằng \`*bytes.Buffer\` cho dễ test).

Viết hàm \`ProcessOrder(id int, log Logger)\` gọi \`log.Info("processing")\`, \`log.Error("failed")\`. Test với cả 2 logger.

---

## Lời giải chi tiết

### Giải BT1 — Shape

**Cách tiếp cận**: interface định nghĩa method chung; mỗi struct implement riêng.

\`\`\`go
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ R float64 }
func (c Circle) Area() float64      { return math.Pi * c.R * c.R }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.R }

type Rectangle struct{ W, H float64 }
func (r Rectangle) Area() float64      { return r.W * r.H }
func (r Rectangle) Perimeter() float64 { return 2*(r.W + r.H) }

type Triangle struct{ A, B, C float64 }
func (t Triangle) Perimeter() float64 { return t.A + t.B + t.C }
func (t Triangle) Area() float64 {
    s := t.Perimeter() / 2
    return math.Sqrt(s*(s-t.A)*(s-t.B)*(s-t.C))   // Heron
}

func Describe(s Shape) {
    fmt.Printf("%T  area=%.2f  perim=%.2f\\n", s, s.Area(), s.Perimeter())
}

func main() {
    shapes := []Shape{Circle{5}, Rectangle{3,4}, Triangle{3,4,5}}
    for _, s := range shapes { Describe(s) }
}
// Output:
// main.Circle    area=78.54  perim=31.42
// main.Rectangle area=12.00  perim=14.00
// main.Triangle  area=6.00   perim=12.00
\`\`\`

**Verify Heron** với 3-4-5: s = 6, area = √(6·3·2·1) = √36 = 6 ✓.

**Độ phức tạp**: O(1) cho mọi shape.

### Giải BT2 — Sort.Interface

\`\`\`go
type Person struct{ Name string; Age int }

type ByAge []Person
func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

type ByName []Person
func (a ByName) Len() int           { return len(a) }
func (a ByName) Less(i, j int) bool { return a[i].Name < a[j].Name }
func (a ByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

func main() {
    p := []Person{{"Carol",22},{"Alice",30},{"Bob",25},{"Eve",28},{"Dan",35}}
    sort.Sort(ByAge(p))
    fmt.Println("by age:", p)   // Carol(22) Bob(25) Eve(28) Alice(30) Dan(35)
    sort.Sort(ByName(p))
    fmt.Println("by name:", p)  // Alice Bob Carol Dan Eve
}
\`\`\`

**Phân tích**: \`sort.Sort\` dùng introsort (quicksort + heapsort fallback). O(n log n).

**Tại sao convert \`p\` sang \`ByAge(p)\`?** Vì \`[]Person\` không tự có method — phải qua type alias để gắn method.

### Giải BT3 — nil interface

- (a) \`true\` — chưa gán bất cứ thứ gì.
- (b) \`false\` — \`p\` là typed nil \`*MyErr\`. Khi gán vào \`error\` interface, type word = \`*MyErr\` ≠ nil ⇒ \`err != nil\`.
- (c) \`false\` — \`find\` declares \`e *MyErr\` (nil), return ⇒ Go ép vào error interface với type word = \`*MyErr\`. KHÔNG bằng nil.
- (d) \`true\` — sửa đúng: kiểm tra \`e == nil\` trước, return literal \`nil\` ⇒ interface có cả 2 word = nil.

### Giải BT4 — Walk JSON

\`\`\`go
func Walk(v any, indent string) {
    switch x := v.(type) {
    case map[string]any:
        for k, val := range x {
            fmt.Printf("%s%s:\\n", indent, k)
            Walk(val, indent+"  ")
        }
    case []any:
        for i, val := range x {
            fmt.Printf("%s[%d]:\\n", indent, i)
            Walk(val, indent+"  ")
        }
    case string:
        fmt.Printf("%s%q\\n", indent, x)
    case float64:
        fmt.Printf("%s%v\\n", indent, x)
    case bool:
        fmt.Printf("%s%v\\n", indent, x)
    case nil:
        fmt.Printf("%snull\\n", indent)
    default:
        fmt.Printf("%s<? %T>\\n", indent, x)
    }
}
\`\`\`

**Độ phức tạp**: O(N) với N = tổng số node trong cây (mỗi node thăm 1 lần).

### Giải BT5 — Stringer cho Status

\`\`\`go
type Status int
const (
    Active Status = iota
    Suspended
    Banned
)

var statusName = [...]string{"Active", "Suspended", "Banned"}

func (s Status) String() string {
    if !s.Valid() { return fmt.Sprintf("Status(%d)", int(s)) }
    return statusName[s]
}
func (s Status) Valid() bool { return s >= Active && s <= Banned }

func main() {
    fmt.Println(Active)              // Active
    fmt.Println(Suspended)           // Suspended
    fmt.Println(Status(99))          // Status(99)
}
\`\`\`

**Verify**: \`fmt.Println\` check interface \`Stringer\` của arg → có → gọi \`String()\`.

### Giải BT6 — Logger

\`\`\`go
type Logger interface {
    Info(msg string)
    Error(msg string)
}

type ConsoleLogger struct{}
func (ConsoleLogger) Info(m string)  { fmt.Println("[INFO]", m) }
func (ConsoleLogger) Error(m string) { fmt.Println("[ERROR]", m) }

type FileLogger struct{ Out io.Writer }   // dùng io.Writer thay file thật
func (l *FileLogger) Info(m string)  { fmt.Fprintln(l.Out, "[INFO]", m) }
func (l *FileLogger) Error(m string) { fmt.Fprintln(l.Out, "[ERROR]", m) }

func ProcessOrder(id int, log Logger) {
    log.Info(fmt.Sprintf("processing order #%d", id))
    if id < 0 {
        log.Error("invalid id")
        return
    }
}

func main() {
    ProcessOrder(1, ConsoleLogger{})

    var buf bytes.Buffer
    ProcessOrder(-1, &FileLogger{Out: &buf})
    fmt.Print("---file log:---\\n", buf.String())
}
\`\`\`

**Lưu ý method set**: \`FileLogger\` có pointer receiver ⇒ phải truyền \`&FileLogger{}\`. \`ConsoleLogger\` value receiver ⇒ cả value và pointer đều ok.

---

## 📝 Tóm tắt toàn bài

- **Interface** = tập method signature. Concrete type **implicit satisfy** nếu có đủ method (không cần \`implements\`).
- **Method set**: \`T\` chỉ có value-receiver method; \`*T\` có cả 2. Pointer "trên cơ" value.
- **Interface value** = 2 words (type pointer, value pointer). \`nil\` interface ⇔ cả 2 nil.
- **Pitfall**: typed nil gán vào interface ⇒ interface != nil. \`return nil\` literal trong hàm error.
- **\`any\` / \`interface{}\`**: dùng khi thật cần (JSON, variadic). Có generics (Go 1.18+) thì ưu tiên generics.
- **Type assertion**: luôn dùng comma-ok \`v, ok := x.(T)\`.
- **Type switch**: pattern xử lý nhiều type, đặc biệt cho error / JSON walking.
- **Interface composition**: ghép interface nhỏ ⇒ interface to (\`io.ReadWriter = Reader + Writer\`).
- **Stdlib interfaces** quan trọng: \`error\`, \`io.Reader/Writer/Closer\`, \`fmt.Stringer\`, \`sort.Interface\`, \`http.Handler\`.
- **Idiom**: *Accept interfaces, return structs*.
- **Interface segregation**: interface nhỏ tốt hơn interface lớn (Rob Pike).
- **Common patterns**: strategy, mocking for test, plugin.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — code Go biên dịch được, demo Shape / Stringer / sort / nil pitfall / io compose.
- [visualization.html](./visualization.html) — 3 module tương tác: Implicit satisfaction matcher, Interface value internals, Type switch dispatcher.

## Bài tiếp theo

- [Lesson 19 — Error Handling](../lesson-19-errors/) — kế thừa interface \`error\`, đi sâu vào \`errors.Is/As\`, error wrapping, sentinel errors, custom error types.

## Tham khảo

- [Effective Go — Interfaces](https://go.dev/doc/effective_go#interfaces)
- [Go FAQ — Why is my nil error value not equal to nil?](https://go.dev/doc/faq#nil_error)
- [Rob Pike — Go Proverbs](https://go-proverbs.github.io/)
- [Standard library: \`io\`, \`fmt\`, \`sort\`, \`net/http\`](https://pkg.go.dev/std)
`;
