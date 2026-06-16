// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-15-struct-method/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 15 — Struct & Method

> Tier 1 · Programming · Bài học cách Go làm "OO" mà **không có class**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **struct là gì** và vì sao Go chọn struct thay vì class.
- Khai báo, khởi tạo struct theo 4 cách (literal named/positional, zero value, \`new()\`, \`&Type{}\`).
- Phân biệt **value receiver** và **pointer receiver** — và biết khi nào dùng cái nào (đây là quyết định mỗi ngày).
- Đọc được code dùng **embedding** (composition) — cách Go thay thế inheritance.
- Hiểu vì sao thứ tự khai báo field ảnh hưởng **kích thước struct trong RAM** (padding).
- Viết constructor pattern \`NewXxx()\` đúng convention.

## Kiến thức tiền đề

- [Lesson 11 — Function](../lesson-11-functions/) (hiểu \`func\` và parameter).
- [Lesson 12 — Array & Slice](../lesson-12-arrays-slices/) (kiểu composite đầu tiên).
- [Lesson 13 — Map](../lesson-13-maps/) (kiểu composite thứ hai; ở đây ta gặp cái thứ ba).
- Khái niệm **pointer** sẽ học kỹ ở [Lesson 16](../lesson-16-pointers/). Ở bài này ta dùng pointer ở mức "đủ để dùng method" — không cần hiểu sâu cơ chế cấp phát.

---

## 1. Struct là gì?

💡 **Trực giác / Hình dung**

Hãy tưởng tượng bạn cần lưu thông tin một **người dùng** trong hệ thống. Bạn có:

- \`name string\`
- \`age int\`
- \`email string\`
- \`active bool\`

Bạn có thể giữ 4 biến rời nhau, nhưng khi bạn có 1000 user thì sẽ thành 4 slice song song (\`names\`, \`ages\`, \`emails\`, \`actives\`). Phải nhớ "index thứ 5 của \`names\` đi cùng index thứ 5 của \`ages\`" — rất dễ sai. **Struct** là cái thùng gom các field liên quan lại thành **một đơn vị**:

\`\`\`go
type User struct {
    Name   string
    Age    int
    Email  string
    Active bool
}
\`\`\`

Bây giờ \`u.Name\`, \`u.Age\`, ... đi cùng nhau. Truyền 1 biến \`u\` là truyền cả cụm.

### Định nghĩa hình thức

**Struct** (struct = "structure") là **kiểu composite** trong Go: tập hợp **không thứ tự về ngữ nghĩa** (theo nghĩa "không có khái niệm thứ nhất/thứ hai" — nhưng có thứ tự **vật lý** trong RAM, sẽ thấy ở mục 13) các **field có tên và có kiểu**. Mỗi field có thể là kiểu primitive (\`int\`, \`string\`, \`bool\`) hay kiểu composite khác (slice, map, struct lồng).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Struct giống class không?"* — Giống ở chỗ gom data lại. **Khác** ở chỗ Go không có inheritance, không có constructor builtin, không có \`private\`/\`public\` từ khóa (Go dùng quy tắc viết hoa chữ đầu để export), không có method ngầm như \`toString()\`. Method được khai báo **bên ngoài** struct, không gắn dính bên trong.
- *"Tại sao Go bỏ class?"* — Triết lý Go: composition over inheritance. Class kéo theo cây inheritance phức tạp (diamond problem, fragile base class). Go chọn struct + embedding + interface để đạt cùng mục tiêu với cú pháp đơn giản hơn.
- *"Struct có chiếm bộ nhớ không?"* — Có. Tổng byte của struct = tổng byte các field + **padding** (xem mục 13). Một \`Point{int, int}\` trên 64-bit chiếm 16 byte.

### Ví dụ thực tế

Struct xuất hiện ở mọi nơi trong code Go:

\`\`\`go
// 1. Database record
type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

// 2. HTTP request body (decode JSON)
type LoginReq struct {
    Username string
    Password string
}

// 3. Configuration
type Config struct {
    Host    string
    Port    int
    Timeout time.Duration
    Debug   bool
}

// 4. Point trong hình học
type Point struct {
    X, Y float64
}
\`\`\`

📝 **Tóm tắt mục 1**

- Struct = kiểu composite gom các field có tên, có kiểu.
- Go không có class — struct + method + embedding là cách "OO" của Go.
- Field có thể primitive hay composite. Tổng kích thước = sum field + padding.

---

## 2. Khai báo & khởi tạo

### 2.1 Khai báo type

\`\`\`go
type Point struct {
    X int
    Y int
}

// Hoặc gom nhiều field cùng kiểu trên 1 dòng:
type Point struct {
    X, Y int
}
\`\`\`

Cả hai cách tương đương về mặt ngữ nghĩa và memory layout.

### 2.2 Bốn cách khởi tạo

\`\`\`go
// (1) Literal NAMED — khuyến nghị
p1 := Point{X: 1, Y: 2}

// (2) Literal POSITIONAL — chỉ dùng cho struct có ≤ 3 field cố định
p2 := Point{1, 2}

// (3) Zero value
var p3 Point   // → Point{X: 0, Y: 0}

// (4) Pointer literal
p4 := &Point{X: 1, Y: 2}  // p4 có kiểu *Point
\`\`\`

⚠ **Lỗi thường gặp: Literal POSITIONAL dễ vỡ khi thêm field**

\`\`\`go
type Point struct { X, Y int }
p := Point{1, 2}   // OK

// Sau này ta thêm field Z:
type Point struct { X, Y, Z int }
// Code Point{1, 2} BÁO LỖI: "too few values in Point{...}"
\`\`\`

Nếu code dùng named (\`Point{X: 1, Y: 2}\`) thì khi thêm \`Z\`, code cũ vẫn chạy (Z = zero value). **Quy tắc**: với mọi struct export public (struct trong package, public API), **luôn dùng named literal**. Positional chỉ dùng cho struct nhỏ, nội bộ, sẽ không bao giờ thêm field (ví dụ \`Point{x, y}\` trong hình học cơ bản).

### 2.3 Zero value của struct

Mỗi field có zero value của kiểu nó: \`int\` → 0, \`string\` → \`""\`, \`bool\` → \`false\`, \`slice/map/pointer/func\` → \`nil\`.

\`\`\`go
type User struct {
    Name   string  // ""
    Age    int     // 0
    Active bool    // false
    Tags   []string // nil
}

var u User
fmt.Printf("%#v\\n", u)
// main.User{Name:"", Age:0, Active:false, Tags:[]string(nil)}
\`\`\`

❓ **Câu hỏi tự nhiên: zero value có "dùng được" không?**

Tùy struct. Go khuyến khích thiết kế struct sao cho **zero value là useful** (gọi là "zero value is ready to use"). Vd \`bytes.Buffer{}\` rỗng, sẵn sàng \`Write\` vào — không cần \`NewBuffer()\`. Nhưng \`sql.DB{}\` zero value thì không kết nối DB được — phải gọi \`sql.Open()\`.

### 2.4 So sánh 4 cách bằng số cụ thể

\`\`\`go
type Pt struct { X, Y int }

p1 := Pt{X: 3, Y: 4}    // {3 4}
p2 := Pt{3, 4}          // {3 4}
var p3 Pt               // {0 0}
p4 := &Pt{X: 3, Y: 4}   // &{3 4}  -- kiểu *Pt

fmt.Println(p1, p2, p3, *p4)
// {3 4} {3 4} {0 0} {3 4}
\`\`\`

📝 **Tóm tắt mục 2**

- 4 cách: named literal, positional literal, zero value, pointer literal.
- **Luôn ưu tiên named literal** cho code production.
- Zero value của struct = struct với mọi field ở zero value của kiểu nó.

---

## 3. Access field & auto-deref pointer

\`\`\`go
p := Point{X: 1, Y: 2}
fmt.Println(p.X)     // 1
p.X = 100
fmt.Println(p.X)     // 100
\`\`\`

### Pointer auto-deref

Nếu \`p\` là \`*Point\` (pointer trỏ tới Point), bạn vẫn viết \`p.X\` — Go **tự** dereference giúp:

\`\`\`go
p := &Point{X: 1, Y: 2}
fmt.Println(p.X)     // 1  (Go ngầm hiểu là (*p).X)
p.X = 100            // tương đương (*p).X = 100
fmt.Println(p.X)     // 100
\`\`\`

💡 **Trực giác**

Trong nhiều ngôn ngữ khác (C, C++), bạn phải viết \`p->X\` khi \`p\` là pointer và \`p.X\` khi là value — hai cú pháp khác nhau. Go thống nhất: **luôn dùng \`.\`**, compiler tự lo dereference. Tiện hơn, ít noise hơn.

### Ví dụ số cụ thể (4 trường hợp)

\`\`\`go
type Point struct { X, Y int }

p := Point{1, 2}
pp := &p
fmt.Println(p.X)     // 1
fmt.Println(pp.X)    // 1  -- auto deref
fmt.Println((*pp).X) // 1  -- viết đầy đủ (hiếm khi cần)

pp.X = 99
fmt.Println(p.X)     // 99  -- vì pp trỏ tới p
\`\`\`

⚠ **Lỗi thường gặp: nil pointer dereference**

\`\`\`go
var p *Point   // p == nil
fmt.Println(p.X) // PANIC: runtime error: invalid memory address or nil pointer dereference
\`\`\`

Khi pointer là \`nil\`, không có struct nào để deref → panic. Luôn check \`if p == nil\` trước khi access field nếu pointer có thể nil.

🔁 **Dừng lại tự kiểm tra**

Cho \`p := &Point{X: 5, Y: 6}\` (\`p\` là \`*Point\`). Đoạn nào hợp lệ?

1. \`p.X = 10\`
2. \`(*p).Y = 20\`
3. \`p = nil; fmt.Println(p.X)\`

<details><summary>Đáp án</summary>

1. **OK** — auto deref.
2. **OK** — deref tường minh.
3. **PANIC** lúc runtime — \`p\` thành nil, deref nil panic.

</details>

---

## 4. Anonymous struct

Đôi khi bạn cần một struct **chỉ dùng 1 lần**, không cần đặt tên type:

\`\`\`go
// Test data
testCases := []struct {
    input    string
    expected int
}{
    {"hello", 5},
    {"world!", 6},
    {"", 0},
}

// JSON shape ad-hoc cho API response nội bộ
resp := struct {
    Status string \`json:"status"\`
    Count  int    \`json:"count"\`
}{
    Status: "ok",
    Count:  42,
}
\`\`\`

💡 **Trực giác**

Giống như anonymous function (\`func(x int) int { return x*2 }\`), anonymous struct là **kiểu không tên** dùng tại chỗ rồi vứt. Tiện cho test table, JSON ad-hoc, nội bộ một function.

⚠ **Lỗi thường gặp: lạm dụng anonymous struct**

Đừng tái sử dụng anonymous struct ở nhiều chỗ — sẽ phải copy-paste định nghĩa, dễ sai. Khi cần dùng > 1 chỗ, **đặt tên type** ngay.

### ❓ Câu hỏi tự nhiên

*"Tại sao test table thường dùng anonymous struct?"* — Vì test data chỉ tồn tại trong 1 function test, không export ra ngoài. Đặt tên type sẽ noise.

📝 **Tóm tắt mục 4**

- Anonymous struct = struct không có name, dùng tại chỗ.
- Lý tưởng cho test table và JSON shape một lần.
- Lạm dụng ở nhiều chỗ → phải đặt tên.

---

## 5. Struct comparison

Bạn có thể so sánh hai struct bằng \`==\` và \`!=\` **NẾU mọi field đều comparable**.

\`\`\`go
type Point struct { X, Y int }
a := Point{1, 2}
b := Point{1, 2}
c := Point{3, 4}

fmt.Println(a == b)  // true
fmt.Println(a == c)  // false
\`\`\`

### Field nào comparable?

| Kiểu | Comparable? |
|------|:---:|
| \`int\`, \`float64\`, \`bool\`, \`string\`, \`rune\` | ✓ |
| Pointer \`*T\` | ✓ (so sánh địa chỉ) |
| Array \`[N]T\` (T comparable) | ✓ |
| Struct (mọi field comparable) | ✓ |
| Interface (giá trị động phải comparable) | △ (có thể panic) |
| **Slice \`[]T\`** | ✗ — compile error |
| **Map \`map[K]V\`** | ✗ — compile error |
| **Function \`func(...)\`** | ✗ — compile error |

### Ví dụ số cụ thể (4 trường hợp)

\`\`\`go
// (1) Mọi field comparable → OK
type A struct { X int; Name string }
fmt.Println(A{1, "a"} == A{1, "a"})  // true
fmt.Println(A{1, "a"} == A{1, "b"})  // false

// (2) Có slice → COMPILE ERROR
type B struct { Tags []string }
// fmt.Println(B{nil} == B{nil})
// → invalid operation: B{nil} == B{nil} (struct containing []string cannot be compared)

// (3) Có map → COMPILE ERROR
type C struct { Meta map[string]int }
// fmt.Println(C{nil} == C{nil})  // compile error

// (4) Có pointer → so sánh ĐỊA CHỈ, không phải nội dung
type D struct { P *int }
x, y := 5, 5
d1, d2 := D{&x}, D{&y}
fmt.Println(d1 == d2)         // false  (địa chỉ x != địa chỉ y)
d3 := D{&x}
fmt.Println(d1 == d3)         // true   (cùng trỏ tới x)
\`\`\`

⚠ **Lỗi thường gặp**

\`\`\`go
type User struct {
    Name string
    Tags []string  // ← slice
}
// u1 == u2  // COMPILE ERROR
\`\`\`

Khi struct có slice/map/func, muốn so sánh phải **viết hàm riêng** (so từng field) hoặc dùng \`reflect.DeepEqual\` (chậm, chỉ dùng trong test).

\`\`\`go
func userEqual(a, b User) bool {
    if a.Name != b.Name { return false }
    if len(a.Tags) != len(b.Tags) { return false }
    for i := range a.Tags {
        if a.Tags[i] != b.Tags[i] { return false }
    }
    return true
}
\`\`\`

🔁 **Dừng lại tự kiểm tra**

Struct sau có compare được không? Vì sao?

\`\`\`go
type Cfg struct {
    Host string
    Port int
    DB   struct{ URL string }
}
\`\`\`

<details><summary>Đáp án</summary>

**Có**. \`string\`, \`int\` comparable, và inner struct \`struct{URL string}\` cũng chỉ có \`string\` → comparable. Tất cả comparable → \`Cfg\` comparable.

</details>

📝 **Tóm tắt mục 5**

- \`==\`/\`!=\` được nếu mọi field comparable.
- Slice/map/func → compile error.
- Pointer field so sánh **địa chỉ**, không phải nội dung trỏ tới.

---

## 6. Struct tag — metadata cho field

Tag là một **literal string** đặt sau kiểu của field, dùng làm **metadata** cho các thư viện đọc bằng \`reflect\`.

\`\`\`go
type User struct {
    Name  string \`json:"name" db:"user_name" validate:"required"\`
    Email string \`json:"email" db:"email"    validate:"required,email"\`
    Age   int    \`json:"age,omitempty"\`
}
\`\`\`

### Vì sao có tag?

Khi \`encoding/json\` serialize struct, mặc định dùng tên field (\`Name\` → \`"Name"\` trong JSON). Nhưng convention REST API thường là lowercase / snake_case. Tag \`json:"name"\` bảo: "khi marshal/unmarshal JSON, dùng key \`name\`".

Tương tự:
- \`db:"user_name"\` — package ORM (vd \`sqlx\`) map field tới column DB.
- \`validate:"required,email"\` — \`go-playground/validator\` kiểm tra field.
- \`xml:"..."\`, \`yaml:"..."\`, \`toml:"..."\` — các format khác.

### Ví dụ cụ thể có số

\`\`\`go
type Product struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Price float64 \`json:"price"\`
    Stock int    \`json:"stock,omitempty"\`
}

p := Product{ID: 1, Name: "Pen", Price: 2.5, Stock: 0}
b, _ := json.Marshal(p)
fmt.Println(string(b))
// {"id":1,"name":"Pen","price":2.5}
// → Stock không xuất hiện vì = 0 + tag omitempty
\`\`\`

❓ **Câu hỏi tự nhiên**

- *"Tag có ảnh hưởng runtime không?"* — Không, tag là **string literal** lưu trong type info. Chỉ ảnh hưởng khi có thư viện đọc nó qua reflect.
- *"Sai cú pháp tag thì sao?"* — Compiler không kiểm tra nội dung tag. Bạn viết \`json:"name\` thiếu dấu ngoặc cuối, compiler vẫn pass; chỉ runtime \`json.Marshal\` trả về kết quả lạ. Dùng linter (\`staticcheck\`, \`govet\`) để bắt lỗi tag.

⚠ **Lỗi thường gặp**

\`\`\`go
// SAI: dấu nháy đôi bên trong, không thoát
type X struct {
    Name string \`json: "name"\`   // ← space sau dấu hai chấm
}
// json package không nhận, dùng "Name" mặc định.
\`\`\`

Cú pháp tag chuẩn: \`key:"value"\` (không có space). Nhiều tag cách nhau bởi **space**.

📝 **Tóm tắt mục 6**

- Tag = string literal sau field, metadata cho \`reflect\`.
- Phổ biến: \`json\`, \`db\`, \`validate\`, \`xml\`, \`yaml\`.
- Compiler không validate nội dung tag → dùng linter.
- Reflect/tag sẽ học kỹ ở Lesson 28 (Tier 2).

---

## 7. Method — function gắn với struct

Method là **function có receiver** (cái "ai" gọi). Cú pháp:

\`\`\`go
func (p Point) Distance() float64 {
    return math.Sqrt(float64(p.X*p.X + p.Y*p.Y))
}

// Gọi:
p := Point{3, 4}
d := p.Distance()  // 5.0
\`\`\`

### Cấu trúc

\`\`\`
func (receiver Type) Name(params) returns { body }
       ───────────  ←── đây là điểm khác với function thường
\`\`\`

\`(p Point)\` đứng giữa \`func\` và tên method. Bên trong body, dùng \`p\` như tham số đầu tiên.

💡 **Trực giác**

Method **không phải gì thần kỳ** — nó tương đương \`func Distance(p Point) float64\`, chỉ là Go cho phép viết \`p.Distance()\` thay vì \`Distance(p)\`. Cú pháp này gần với OO hơn, đọc dễ hơn.

### Ví dụ số cụ thể (4 method khác nhau)

\`\`\`go
type Rect struct { W, H float64 }

func (r Rect) Area() float64        { return r.W * r.H }
func (r Rect) Perimeter() float64    { return 2 * (r.W + r.H) }
func (r Rect) IsSquare() bool        { return r.W == r.H }
func (r Rect) Diagonal() float64     { return math.Sqrt(r.W*r.W + r.H*r.H) }

r := Rect{W: 3, H: 4}
fmt.Println(r.Area())       // 12
fmt.Println(r.Perimeter())  // 14
fmt.Println(r.IsSquare())   // false
fmt.Println(r.Diagonal())   // 5
\`\`\`

### Method = function có receiver bonus

Bằng chứng "method là syntactic sugar":

\`\`\`go
// Hai cách viết, kết quả y hệt:
r := Rect{3, 4}
fmt.Println(r.Area())         // syntactic sugar
fmt.Println(Rect.Area(r))     // tường minh — "method value" gọi như function
\`\`\`

📝 **Tóm tắt mục 7**

- Method = function với receiver \`(name Type)\` đứng giữa \`func\` và tên.
- Gọi bằng \`receiver.Method(args)\`.
- Tương đương \`Type.Method(receiver, args)\`.

---

## 8. Value vs pointer receiver — quyết định quan trọng

Đây là một trong những **quyết định gặp mỗi ngày** khi viết Go. Sai chọn → bug "mutate không có tác dụng" hoặc tốn RAM vì copy.

### 8.1 Value receiver

\`\`\`go
func (p Point) Move(dx, dy int) {
    p.X += dx
    p.Y += dy
}

p := Point{1, 2}
p.Move(10, 20)
fmt.Println(p)  // {1 2}  ← KHÔNG đổi
\`\`\`

Vì sao? Khi \`p.Move(10, 20)\` chạy, Go **copy** \`p\` thành biến \`p\` mới bên trong method. Sửa \`p.X\` bên trong là sửa **bản copy**. Bản gốc bên ngoài không đổi.

### 8.2 Pointer receiver

\`\`\`go
func (p *Point) Move(dx, dy int) {
    p.X += dx   // auto-deref
    p.Y += dy
}

p := Point{1, 2}
p.Move(10, 20)
fmt.Println(p)  // {11 22}  ← ĐÃ đổi
\`\`\`

Bây giờ receiver là \`*Point\` — pointer trỏ tới \`p\`. Sửa qua pointer = sửa bản gốc.

### 8.3 Khi nào dùng cái nào?

**Dùng pointer receiver khi:**

1. Cần **mutate** struct → bắt buộc pointer.
2. Struct **lớn** (vd 100+ byte) → tránh copy mỗi lần gọi method.
3. Struct chứa **field không nên copy** (vd \`sync.Mutex\`, \`sync.WaitGroup\`, hoặc file handle).

**Dùng value receiver khi:**

1. Struct **nhỏ** (≤ vài chục byte): \`Point{int, int}\`, \`time.Time\`, \`complex128\`.
2. Method **không mutate** (read-only).
3. Bạn muốn rõ ràng "method này không thay đổi gì".

### 8.4 Convention quan trọng: nhất quán trong cùng 1 type

\`\`\`go
// XẤU — mixed
func (p Point) Get() int    { return p.X }
func (p *Point) Set(x int)  { p.X = x }
\`\`\`

Mặc dù compile được, nhưng **bối rối** khi đọc. **Quy tắc**: nếu type có **ít nhất 1 method** dùng pointer receiver, thì **mọi method** của type đó nên dùng pointer (kể cả read-only).

\`\`\`go
// TỐT — nhất quán
func (p *Point) Get() int    { return p.X }
func (p *Point) Set(x int)   { p.X = x }
\`\`\`

❓ **Câu hỏi tự nhiên**

- *"Struct lớn bao nhiêu thì coi là lớn?"* — Rule of thumb: nếu copy > 64 byte mỗi lần gọi method và method được gọi trong hot loop, dùng pointer. 64 byte = cache line trên hầu hết CPU. Không có rule cứng.
- *"Mất gì khi luôn dùng pointer?"* — Mỗi pointer cần dereference (1 lệnh CPU) khi access field. Với struct rất nhỏ (vd \`Point{int, int}\` = 16 byte), copy có khi rẻ hơn deref. Nhưng khác biệt < 1ns — không đáng tối ưu trừ khi đo benchmark thấy hot path.
- *"Pointer receiver có thể nil không?"* — Có. \`var p *Point = nil; p.SomeMethod()\` không panic nếu method **không access field** (vd chỉ trả về hằng). Nhưng dùng pattern này hiếm — thường để check \`p == nil\` trong method.

⚠ **Lỗi thường gặp**

\`\`\`go
type Counter struct { N int }

func (c Counter) Inc() { c.N++ }   // ← QUÊN POINTER

c := Counter{}
c.Inc()
c.Inc()
c.Inc()
fmt.Println(c.N)  // 0 !!! không phải 3
\`\`\`

Đây là bug #1 với người mới học Go. Method tăng đếm nhưng counter không tăng. Phải đổi thành \`func (c *Counter) Inc() { c.N++ }\`.

🔁 **Dừng lại tự kiểm tra**

Dự đoán output:

\`\`\`go
type Box struct { Volume int }
func (b Box) Double() { b.Volume *= 2 }
func (b *Box) Triple() { b.Volume *= 3 }

x := Box{Volume: 10}
x.Double()
x.Triple()
fmt.Println(x.Volume)
\`\`\`

<details><summary>Đáp án</summary>

**30**.

- \`x.Double()\` — value receiver, copy \`x\` → bản copy nhân 2 (= 20), bản gốc vẫn 10.
- \`x.Triple()\` — pointer receiver, sửa qua \`&x\` → 10 × 3 = 30.

</details>

📝 **Tóm tắt mục 8**

- Value receiver = copy struct. Sửa bên trong không ảnh hưởng bên ngoài.
- Pointer receiver = trỏ tới bản gốc. Mutate được. Tránh copy struct lớn.
- Pointer khi: mutate / struct lớn / chứa Mutex.
- Convention: nhất quán trong cùng 1 type — 1 method pointer thì cả type pointer.

---

## 9. Method gọi trên addressable value

Bạn đã thấy:

\`\`\`go
p := Point{1, 2}
p.Scale(2)   // OK
\`\`\`

Method \`Scale\` có pointer receiver \`*Point\` nhưng ta gọi qua value \`p\`. **Go tự động** chuyển thành \`(&p).Scale(2)\`. Điều này được vì \`p\` là biến — có địa chỉ.

Nhưng có những **value KHÔNG có địa chỉ** — gọi là "not addressable":

### Trường hợp lỗi #1: literal struct trực tiếp

\`\`\`go
Point{1, 2}.Scale(2)
// ERROR: cannot call pointer method Scale on Point literal
\`\`\`

\`Point{1, 2}\` là literal — chưa gán vào biến, không có địa chỉ. Compiler không lấy \`&\` được.

**Cách sửa**:

\`\`\`go
p := Point{1, 2}
p.Scale(2)

// HOẶC:
(&Point{1, 2}).Scale(2)  // explicit pointer literal
\`\`\`

### Trường hợp lỗi #2: map value

\`\`\`go
type Counter struct { N int }
func (c *Counter) Inc() { c.N++ }

m := map[string]Counter{"a": {N: 0}}
m["a"].Inc()
// ERROR: cannot call pointer method Inc on map index expression
\`\`\`

Vì sao? Map value **không có địa chỉ ổn định** — Go có thể rehash, di chuyển vị trí map. Cho phép \`&m["a"]\` rồi sau đó vị trí thay đổi → dangling pointer. Go cấm trực tiếp.

**Cách sửa 1**: dùng \`map[string]*Counter\` (lưu pointer):

\`\`\`go
m := map[string]*Counter{"a": {N: 0}}
m["a"].Inc()    // OK — m["a"] là *Counter, gọi method trên *Counter
fmt.Println(m["a"].N)  // 1
\`\`\`

**Cách sửa 2**: pull ra biến tạm rồi gán lại:

\`\`\`go
m := map[string]Counter{"a": {N: 0}}
c := m["a"]
c.Inc()
m["a"] = c
\`\`\`

### Trường hợp lỗi #3: kết quả function

\`\`\`go
func MakePoint() Point { return Point{1, 2} }

MakePoint().Scale(2)
// ERROR: cannot call pointer method Scale on Point return value
\`\`\`

Return value cũng không addressable. Lưu vào biến trước:

\`\`\`go
p := MakePoint()
p.Scale(2)
\`\`\`

### Bảng tổng hợp 4 trường hợp

| Expression | Addressable? | Gọi method \`*T\` được? |
|------------|:---:|:---:|
| Biến \`p := Point{...}\` | ✓ | ✓ |
| Pointer literal \`&Point{...}\` | — (đã là pointer) | ✓ |
| Literal \`Point{...}\` | ✗ | ✗ |
| \`m["k"]\` (map value) | ✗ | ✗ |
| Return value \`f()\` (Point) | ✗ | ✗ |
| Slice element \`s[i]\` | ✓ | ✓ |
| Field của addressable struct \`x.field\` | ✓ (nếu \`x\` addressable) | ✓ |

❓ **Câu hỏi tự nhiên**

*"Vì sao slice element addressable mà map value thì không?"* — Slice element có địa chỉ ổn định trong runtime của slice. Map có thể rehash → bucket di chuyển → địa chỉ thay đổi. Đây là quyết định của Go runtime, không phải triết lý ngôn ngữ.

📝 **Tóm tắt mục 9**

- Method pointer receiver gọi trên value cần value đó **addressable**.
- Biến \`p\` và slice element \`s[i]\` addressable.
- Map value, literal struct, return value — **không** addressable.
- Workaround: gán vào biến, hoặc dùng pointer literal \`&T{...}\`.

---

## 10. Embedding — composition over inheritance

Go **không có** inheritance theo nghĩa OO truyền thống. Thay vào đó: **embedding** (nhúng) — bạn nhúng 1 struct vào struct khác, và các field/method của struct được nhúng **được promote** lên struct chứa.

### 10.1 Cú pháp

\`\`\`go
type Employee struct {
    Name string
    Salary float64
}

func (e Employee) Greet() string {
    return "Hi, I'm " + e.Name
}

type Manager struct {
    Employee   // ← embed, không có tên field
    Reports int
}
\`\`\`

Chú ý: chỉ có \`Employee\` (kiểu) — **không có tên field**. Đây là embedding.

### 10.2 Promote field & method

\`\`\`go
m := Manager{
    Employee: Employee{Name: "Alice", Salary: 50000},
    Reports:  5,
}

// Access field gốc qua tên embedded type:
fmt.Println(m.Employee.Name)  // "Alice"

// HOẶC promote — gọi trực tiếp như field của Manager:
fmt.Println(m.Name)            // "Alice"
fmt.Println(m.Salary)          // 50000
fmt.Println(m.Greet())         // "Hi, I'm Alice"
\`\`\`

Method \`Greet()\` của \`Employee\` được "promote" lên \`Manager\` — ta gọi \`m.Greet()\` như thể nó là method của \`Manager\`.

### 10.3 Override

Nếu \`Manager\` định nghĩa method **cùng tên** \`Greet()\`, method của Manager **shadow** method của Employee:

\`\`\`go
func (m Manager) Greet() string {
    return "Hi, I'm Manager " + m.Name + " with " +
           strconv.Itoa(m.Reports) + " reports"
}

m := Manager{Employee{Name: "Alice"}, 5}
fmt.Println(m.Greet())            // "Hi, I'm Manager Alice with 5 reports"
fmt.Println(m.Employee.Greet())   // "Hi, I'm Alice"  ← gọi method gốc qua tên embedded
\`\`\`

### 10.4 Ba ví dụ thực tế

**Ví dụ 1: User – Admin**

\`\`\`go
type User struct {
    ID    int
    Name  string
    Email string
}
func (u User) DisplayName() string { return u.Name + " <" + u.Email + ">" }

type Admin struct {
    User
    Permissions []string
}

a := Admin{
    User:        User{ID: 1, Name: "Alice", Email: "a@x.com"},
    Permissions: []string{"read", "write", "delete"},
}
fmt.Println(a.DisplayName())  // "Alice <a@x.com>" — promoted
fmt.Println(a.Permissions)    // [read write delete]
\`\`\`

**Ví dụ 2: HTTP middleware (rất giống mẫu thật trong \`net/http\`)**

\`\`\`go
type Response struct {
    StatusCode int
    Body       []byte
}

type JSONResponse struct {
    Response                    // embed
    ContentType string
}

// JSONResponse có sẵn StatusCode, Body từ Response.
r := JSONResponse{
    Response:    Response{StatusCode: 200, Body: []byte(\`{"ok":true}\`)},
    ContentType: "application/json",
}
fmt.Println(r.StatusCode)   // 200 — promoted
fmt.Println(r.ContentType)  // application/json
\`\`\`

**Ví dụ 3: ORM model với timestamps (mẫu phổ biến trong gorm)**

\`\`\`go
type Timestamps struct {
    CreatedAt time.Time
    UpdatedAt time.Time
}

type User struct {
    Timestamps
    ID   int
    Name string
}

type Product struct {
    Timestamps
    ID    int
    Price float64
}

// User và Product cùng có CreatedAt, UpdatedAt — không phải viết lại 2 lần.
u := User{Timestamps: Timestamps{CreatedAt: time.Now()}, ID: 1, Name: "Alice"}
fmt.Println(u.CreatedAt)  // promoted
\`\`\`

### 10.5 Embedding KHÔNG phải inheritance

Khác biệt mấu chốt:

| | Inheritance (Java/C++) | Embedding (Go) |
|---|---|---|
| Quan hệ | "is-a" (Manager **là** Employee) | "has-a" (Manager **có** Employee) |
| Polymorphism | Manager nhận làm Employee được | KHÔNG — Manager và Employee là 2 type khác nhau |
| Virtual dispatch | Có (override gọi qua base pointer) | Không — gọi method nào tùy vào type **tĩnh** |

\`\`\`go
var e Employee = m.Employee  // copy ra mới được
// var e Employee = m         // ← KHÔNG ĐƯỢC — Manager không phải Employee
\`\`\`

Polymorphism trong Go đạt được bằng **interface** (sẽ học Lesson 18), không phải qua embedding.

❓ **Câu hỏi tự nhiên**

- *"Có thể embed nhiều type cùng lúc không?"* — Có:
  \`\`\`go
  type Manager struct {
      Employee
      Auditable
      Reports int
  }
  \`\`\`
- *"Nếu Employee và Auditable đều có method \`Log()\` thì gọi \`m.Log()\` chọn cái nào?"* — **Compile error** "ambiguous selector". Bạn phải gọi tường minh: \`m.Employee.Log()\` hoặc \`m.Auditable.Log()\`.
- *"Embed pointer được không?"* — Được: \`type Manager struct { *Employee; Reports int }\`. Khi \`*Employee\` là nil → access field/method panic.

⚠ **Lỗi thường gặp**

\`\`\`go
// Khởi tạo embed kiểu nhầm
m := Manager{
    Name: "Alice",      // ← compile error: unknown field
    Reports: 5,
}
\`\`\`

Phải:

\`\`\`go
m := Manager{
    Employee: Employee{Name: "Alice"},
    Reports:  5,
}
\`\`\`

Hoặc gán sau:

\`\`\`go
var m Manager
m.Name = "Alice"   // OK — Name được promoted
m.Reports = 5
\`\`\`

📝 **Tóm tắt mục 10**

- Embedding = nhúng type vào struct **không có tên field**.
- Field và method của type nhúng được **promote** lên struct chứa.
- Override = struct chứa định nghĩa method cùng tên → shadow.
- Embedding là **composition** ("has-a"), không phải inheritance ("is-a").
- Polymorphism trong Go đạt bằng interface, không phải embedding.

---

## 11. Nested struct — khi nào tách type rời?

Bạn có 2 cách "chứa" struct trong struct:

### Cách A — inline (nested anonymous)

\`\`\`go
type User struct {
    Name    string
    Address struct {
        City    string
        Country string
    }
}
\`\`\`

### Cách B — tách type rồi compose

\`\`\`go
type Address struct {
    City    string
    Country string
}

type User struct {
    Name    string
    Address Address
}
\`\`\`

### Khi nào dùng cái nào?

**Cách B (tách)** trong 95% trường hợp — vì:

1. **Có thể tái sử dụng**: \`Address\` dùng cho \`User\`, \`Company\`, \`Shipment\`.
2. **Có thể có method**: viết \`(a Address) String() string\` — chỉ làm được khi \`Address\` là named type.
3. **JSON / DB tag** dễ quản lý — tag đặt trên field của \`Address\`.
4. **Test** dễ — mock \`Address\` riêng.

**Cách A (inline)** chỉ khi:

- Cấu trúc cực đơn giản, dùng 1 lần.
- Không cần method.
- Không cần tái sử dụng.

### Ví dụ phản chứng

Bạn thấy code dạng:

\`\`\`go
type Order struct {
    ID    int
    Items []struct {
        ProductID int
        Quantity  int
    }
}
\`\`\`

Khi cần method \`(i Item) Total() float64\`, bạn **không thể** — \`Item\` không có name. Phải refactor:

\`\`\`go
type Item struct {
    ProductID int
    Quantity  int
}

type Order struct {
    ID    int
    Items []Item
}

func (i Item) Total(unitPrice float64) float64 { return float64(i.Quantity) * unitPrice }
\`\`\`

📝 **Tóm tắt mục 11**

- Mặc định **tách type rời** rồi compose.
- Inline anonymous chỉ cho cấu trúc dùng 1 lần, không cần method.

---

## 12. Constructor pattern

Go **không có constructor builtin** — không có \`__init__\`, không có \`Type() { ... }\` chạy tự động. Bạn dùng function thường, convention đặt tên \`NewXxx()\`:

\`\`\`go
type User struct {
    ID        int
    Name      string
    CreatedAt time.Time
}

func NewUser(name string) *User {
    return &User{
        ID:        nextID(),
        Name:      name,
        CreatedAt: time.Now(),
    }
}

u := NewUser("Alice")
fmt.Println(u.Name, u.CreatedAt)
\`\`\`

### Khi nào cần constructor?

- Cần **khởi tạo logic** (gán \`CreatedAt\`, generate ID, validate input).
- Struct có **field private** (chữ thường) — bên ngoài package không gán được trực tiếp.
- Đảm bảo struct ở trạng thái **hợp lệ** (vd \`NewBufferSize(size)\` panic nếu size âm).

### Khi nào KHÔNG cần?

- Struct đơn giản, zero value đã dùng được: \`var b bytes.Buffer\`.
- User code chỉ cần literal: \`Point{1, 2}\`.

### Variants

\`\`\`go
// Trả về value (struct nhỏ, không cần mutate qua nhiều owner)
func NewPoint(x, y int) Point { return Point{x, y} }

// Trả về pointer (struct lớn, mutate, hoặc cần unique identity)
func NewUser(name string) *User { return &User{Name: name} }

// Constructor có error
func NewClient(url string) (*Client, error) {
    if url == "" { return nil, errors.New("url empty") }
    return &Client{URL: url}, nil
}
\`\`\`

⚠ **Lỗi thường gặp**

\`\`\`go
// SAI — quên trả pointer trong khi method dùng pointer receiver
func NewCounter() Counter { return Counter{} }

c := NewCounter()
c.Inc()  // không có tác dụng nếu Inc dùng pointer receiver và c không addressable trong context khác
\`\`\`

Convention: khi type có **method pointer receiver**, constructor nên trả \`*T\` chứ không phải \`T\`.

📝 **Tóm tắt mục 12**

- Go không có constructor builtin — dùng function \`NewXxx()\`.
- Trả \`*T\` khi struct lớn hoặc dùng pointer receiver.
- Constructor có thể trả error nếu khởi tạo có thể fail.

---

## 13. Memory layout — thứ tự field quan trọng

### 13.1 Padding là gì?

CPU 64-bit truy cập RAM theo **block 8 byte** (gọi là "word"). Để truy cập 1 \`int64\` nhanh nhất, nó phải nằm ở địa chỉ **chia hết cho 8**. Go compiler thêm **padding byte (đệm)** để đảm bảo điều này.

💡 **Trực giác**

Hãy hình dung RAM như một thư viện chia kệ, mỗi kệ rộng 8 byte. Một quyển sách "int64" (dày 8 byte) phải bắt đầu ở **đầu kệ**, không thể nằm vắt qua 2 kệ — đọc 2 kệ chậm gấp đôi. Nếu trước nó có một quyển "bool" (dày 1 byte), 7 byte còn lại của kệ đó **bị đệm trống** để int64 bắt đầu kệ mới.

### 13.2 Ví dụ cụ thể — cùng 3 field, 2 size khác nhau

\`\`\`go
type A struct {
    a bool   // 1 byte  | offset 0
    // padding 7 byte    | offset 1-7
    b int64  // 8 byte  | offset 8-15
    c bool   // 1 byte  | offset 16
    // padding 7 byte    | offset 17-23 (để total chia hết cho 8)
}
// sizeof(A) = 24 byte
\`\`\`

Cùng 3 field, nhưng sắp xếp khác:

\`\`\`go
type B struct {
    a bool   // 1 byte  | offset 0
    c bool   // 1 byte  | offset 1
    // padding 6 byte    | offset 2-7
    b int64  // 8 byte  | offset 8-15
}
// sizeof(B) = 16 byte
\`\`\`

**Tiết kiệm 8 byte = 33%** chỉ bằng đổi thứ tự!

Verify bằng code:

\`\`\`go
fmt.Println(unsafe.Sizeof(A{}))  // 24
fmt.Println(unsafe.Sizeof(B{}))  // 16
\`\`\`

### 13.3 Quy tắc thực hành

**Sắp xếp field theo kích thước GIẢM DẦN**: 8-byte → 4-byte → 2-byte → 1-byte.

\`\`\`go
// XẤU — 24 byte
type X struct {
    flag bool   // 1
    id   int64  // 8 (sau padding 7)
    age  int32  // 4
    code int16  // 2 (sau padding 2)
}

// TỐT — 16 byte
type X struct {
    id   int64  // 8
    age  int32  // 4
    code int16  // 2
    flag bool   // 1
    // padding 1 byte cuối
}
\`\`\`

### 13.4 Khi nào quan tâm?

- Bạn có **1 triệu instance** struct trong RAM (cache, big dataset, simulation). Tiết kiệm 8 byte/struct = 8 MB tổng — đáng kể.
- Struct sẽ **serialize qua mạng** (encoding binary) — kích thước nhỏ hơn = bandwidth ít hơn.
- Code **performance-critical** (game engine, HFT).

**Phần lớn code thường**: đừng tối ưu sớm. Đọc dễ quan trọng hơn 8 byte/struct.

🔁 **Dừng lại tự kiểm tra**

Struct sau bao nhiêu byte trên 64-bit?

\`\`\`go
type S struct {
    a int32   // 4
    b bool    // 1
    c int64   // 8
}
\`\`\`

<details><summary>Đáp án</summary>

**24 byte**.

- \`a\` ở offset 0-3 (4 byte).
- \`b\` ở offset 4 (1 byte).
- Padding offset 5-7 (3 byte) để \`c\` align 8.
- \`c\` ở offset 8-15.
- Total = 16, đã align 8 → không cần padding cuối.

Wait — vậy là **16 byte**, không phải 24. Để tôi check lại:

- \`a\` (int32, 4 byte) offset 0-3.
- \`b\` (bool, 1 byte) offset 4.
- Padding 3 byte offset 5-7 (để c bắt đầu offset 8).
- \`c\` (int64, 8 byte) offset 8-15.
- Total size = 16 byte (đã chia hết cho 8 — alignment lớn nhất là 8 từ \`c\`).

Đáp án: **16 byte**.

Sắp xếp tối ưu (giảm dần):

\`\`\`go
type S2 struct { c int64; a int32; b bool }
// c: 0-7, a: 8-11, b: 12, padding 13-15 → 16 byte (giống vậy)
\`\`\`

Trong trường hợp này 2 cách bằng nhau. Tease: với struct nhiều field mixed, khác biệt rõ hơn.

</details>

📝 **Tóm tắt mục 13**

- Padding = byte đệm để align field theo alignment requirement của CPU.
- Thứ tự field ảnh hưởng size struct.
- Quy tắc: sắp xếp field theo kích thước **giảm dần**.
- Tối ưu sớm là gốc rễ mọi tội ác — chỉ quan tâm khi có triệu instance hoặc hot path.

---

## 14. Ứng dụng thực tế trong phần mềm

> 💡 **Struct + method là cách Go mô hình hóa domain — và lựa chọn value vs pointer receiver có hậu quả thật về đúng đắn lẫn hiệu năng.**

| Tình huống thật | Struct/method làm gì |
|-----------------|----------------------|
| **Domain model** | \`User\`, \`Order\`, \`Product\` — struct ánh xạ thực thể (và bảng DB qua ORM) |
| **Config / request DTO** | Struct + tag (\`json:"..."\`, \`validate:"..."\`) cho parse/validate |
| **Embedding (composition)** | Nhúng struct để tái dùng — \`BaseModel{ID, CreatedAt}\` trong mọi entity |
| **Method với pointer receiver** | Sửa state của struct (counter, builder, stateful service) |

### 14.1. Value vs pointer receiver — quyết định thật

\`\`\`go
func (u User) Name() string   { return u.name }      // value: đọc, không sửa được bản gốc
func (u *User) SetName(n string) { u.name = n }       // pointer: SỬA được bản gốc
\`\`\`

Quy tắc thực tế: (1) cần **sửa** struct → pointer receiver; (2) struct **lớn** (nhiều field) → pointer (tránh copy mỗi lần gọi); (3) **nhất quán** — nếu một method dùng pointer, mọi method nên pointer (tránh lẫn lộn). Bẫy: value receiver trên struct lớn copy toàn bộ mỗi lần gọi → chậm âm thầm trên hot path.

> ❓ **"Embedding có phải kế thừa không?"** Không — Go không có kế thừa, dùng **composition**. Nhúng \`BaseModel\` vào \`User\` → \`User\` "có" các field/method của BaseModel (promoted), nhưng đó là *has-a* không phải *is-a*. Linh hoạt hơn kế thừa: nhúng nhiều struct, nhúng interface. Đây là "composition over inheritance" ([nối design patterns](../lesson-39-design-patterns-go/)).

### 14.2. 📝 Tóm tắt mục 14

- Struct + method = domain model (User/Order), DTO + tag (json/validate), composition qua **embedding**.
- **Pointer receiver** khi cần sửa state hoặc struct lớn (tránh copy); nhất quán toàn type.
- Embedding = composition (has-a), không phải kế thừa; "composition over inheritance".

## Bài tập

### BT1: Rectangle

Viết struct \`Rectangle{Width, Height float64}\` với:

- Method \`Area() float64\`
- Method \`Perimeter() float64\`
- Method \`Scale(f float64)\` — mutate, nhân W và H với \`f\`.

Hãy quyết định mỗi method dùng value hay pointer receiver.

---

### BT2: Predict mutate

Cho 4 đoạn code, dự đoán giá trị \`c.N\` sau khi chạy:

\`\`\`go
type Counter struct { N int }

// (a)
func (c Counter) Inc1()  { c.N++ }
// (b)
func (c *Counter) Inc2() { c.N++ }
// (c)
func (c Counter) Inc3()  { (&c).N++ }
// (d)
func (c *Counter) Inc4() { c.N += 10 }

c := Counter{}
c.Inc1(); c.Inc1(); c.Inc1()
c.Inc2(); c.Inc2()
c.Inc3()
c.Inc4()
fmt.Println(c.N)
\`\`\`

---

### BT3: Embedding & override

Viết:

\`\`\`go
type Animal struct { Name string }
func (a Animal) Speak() string { return a.Name + " makes a sound" }

type Dog struct {
    Animal
    Breed string
}
// → Dog cần override Speak() trả về "<Name> barks: WOOF!"
\`\`\`

Demo:
1. Tạo \`d := Dog{Animal{"Rex"}, "Lab"}\`.
2. Gọi \`d.Speak()\` — phải in "Rex barks: WOOF!".
3. Gọi \`d.Animal.Speak()\` — phải in "Rex makes a sound".
4. Print \`d.Name\` (qua promote).

---

### BT4: Linked List Append

Viết \`Node{Val int; Next *Node}\` + method \`Append(v int) *Node\` — append vào **cuối** linked list. Method trả về **head** (để xử lý case head == nil).

\`\`\`go
type Node struct {
    Val  int
    Next *Node
}

// func (n *Node) Append(v int) *Node { ... }

// Demo:
var head *Node
head = head.Append(1)
head = head.Append(2)
head = head.Append(3)
// Print: 1 -> 2 -> 3
\`\`\`

⚠ Edge case: gọi \`Append\` trên \`nil\` receiver — cho phép, trả về node mới.

---

### BT5: Struct comparison

Với mỗi case, xác định: (i) compile được không? (ii) nếu được, \`==\` trả về gì?

\`\`\`go
// Case A
type A struct { X int; Name string }
a1 := A{1, "x"}; a2 := A{1, "x"}
// a1 == a2 ?

// Case B
type B struct { Tags []string }
b1 := B{[]string{"a"}}; b2 := B{[]string{"a"}}
// b1 == b2 ?

// Case C
type C struct { ID int; M map[string]int }
c1 := C{1, nil}; c2 := C{1, nil}
// c1 == c2 ?

// Case D
type D struct { P *int }
x := 5
d1 := D{&x}; d2 := D{&x}
// d1 == d2 ?
\`\`\`

---

### BT6: Stack[int]

Implement stack chứa int (chưa học generics, hardcode \`int\`):

\`\`\`go
type Stack struct {
    data []int
}

// (s *Stack) Push(v int)
// (s *Stack) Pop() (int, bool)   // false nếu rỗng
// (s *Stack) Peek() (int, bool)
// (s *Stack) Len() int
// (s *Stack) IsEmpty() bool
\`\`\`

Yêu cầu:
1. Quyết định value vs pointer receiver — nhất quán.
2. \`Pop\` từ stack rỗng không panic, trả \`(0, false)\`.
3. Demo: push 1,2,3, pop 3, peek 2, len 2.

---

## Lời giải chi tiết

### Lời giải BT1: Rectangle

\`\`\`go
type Rectangle struct {
    Width, Height float64
}

// Area/Perimeter không mutate, struct nhỏ → có thể value.
// Nhưng do Scale dùng pointer (mutate), theo convention "nhất quán",
// MỌI method nên pointer.
func (r *Rectangle) Area() float64      { return r.Width * r.Height }
func (r *Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }
func (r *Rectangle) Scale(f float64) {
    r.Width *= f
    r.Height *= f
}

// Demo
r := &Rectangle{Width: 3, Height: 4}
fmt.Println(r.Area())       // 12
fmt.Println(r.Perimeter())  // 14
r.Scale(2)
fmt.Println(r.Area())       // 48  (6*8)
\`\`\`

Cách tiếp cận:
1. Khai báo struct với 2 field \`float64\`.
2. Quyết định pointer vì có method mutate (\`Scale\`) → mọi method dùng pointer.
3. Test: r{3,4} có area=12, perimeter=14. Scale(2) → r{6,8}, area=48.

**Độ phức tạp**: tất cả method $O(1)$.

---

### Lời giải BT2: Predict mutate

\`\`\`go
c := Counter{N: 0}

c.Inc1(); c.Inc1(); c.Inc1()
// 3 lần value receiver → mỗi lần copy c, sửa copy, không động c.
// c.N vẫn 0

c.Inc2(); c.Inc2()
// 2 lần pointer receiver → mutate c.
// c.N từ 0 → 1 → 2

c.Inc3()
// Value receiver. Bên trong: (&c).N++ sửa LOCAL c (copy), không phải c gốc.
// Lưu ý: &c TRONG method trả về địa chỉ của param c (bản copy).
// c.N vẫn 2

c.Inc4()
// Pointer receiver, +10.
// c.N: 2 → 12

fmt.Println(c.N)  // 12
\`\`\`

Cách tiếp cận: phân tích từng method theo receiver. Value receiver luôn copy → không mutate được. Pointer receiver tham chiếu trực tiếp.

---

### Lời giải BT3: Embedding & override

\`\`\`go
type Animal struct{ Name string }
func (a Animal) Speak() string { return a.Name + " makes a sound" }

type Dog struct {
    Animal
    Breed string
}
func (d Dog) Speak() string { return d.Name + " barks: WOOF!" }

// Demo
d := Dog{Animal{Name: "Rex"}, "Lab"}
fmt.Println(d.Speak())          // "Rex barks: WOOF!" — Dog.Speak shadow Animal.Speak
fmt.Println(d.Animal.Speak())   // "Rex makes a sound" — gọi tường minh method gốc
fmt.Println(d.Name)              // "Rex" — promoted từ Animal
fmt.Println(d.Breed)             // "Lab"
\`\`\`

Cách tiếp cận:
1. Embed \`Animal\` (không có tên field).
2. Định nghĩa \`Speak()\` trên \`Dog\` → shadow \`Speak()\` của Animal.
3. Truy cập method gốc qua tên embedded type: \`d.Animal.Speak()\`.

**Độ phức tạp**: $O(1)$ cho mọi access.

---

### Lời giải BT4: Linked List

\`\`\`go
type Node struct {
    Val  int
    Next *Node
}

func (n *Node) Append(v int) *Node {
    newNode := &Node{Val: v}
    // Case 1: head == nil → trả node mới
    if n == nil {
        return newNode
    }
    // Case 2: đi tới cuối list
    cur := n
    for cur.Next != nil {
        cur = cur.Next
    }
    cur.Next = newNode
    return n
}

// Demo
var head *Node
head = head.Append(1)
head = head.Append(2)
head = head.Append(3)

for cur := head; cur != nil; cur = cur.Next {
    fmt.Printf("%d ", cur.Val)
}
// Output: 1 2 3
\`\`\`

Cách tiếp cận:
1. Method có pointer receiver. Go cho phép gọi method pointer trên nil pointer **NẾU method không deref field trong nhánh đó**.
2. Trong \`Append\`, ta check \`n == nil\` đầu tiên → return new node làm head mới.
3. Nếu n không nil, traverse tới cuối, gắn node mới vào \`cur.Next\`.

**Độ phức tạp**:
- \`Append\`: $O(n)$ — phải duyệt tới cuối list. Có thể tối ưu $O(1)$ nếu giữ \`tail\` pointer (làm trong \`LinkedList\` wrapper struct).

⚠ Bug suýt mắc: trả \`newNode\` trong case head != nil thì sai — phải trả \`n\` (head cũ).

---

### Lời giải BT5: Struct comparison

\`\`\`go
// Case A — OK, compile và true
A{1, "x"} == A{1, "x"}  // → true
// Vì A chỉ có int + string, đều comparable.

// Case B — COMPILE ERROR
// invalid operation: b1 == b2 (struct containing []string cannot be compared)

// Case C — COMPILE ERROR
// invalid operation: c1 == c2 (struct containing map[string]int cannot be compared)

// Case D — OK, compile và TRUE
// d1.P và d2.P cả hai trỏ tới &x → cùng địa chỉ → ==
// Lưu ý: nếu là d2 := D{&y} với y khác x (cùng giá trị 5) thì FALSE.
\`\`\`

Cách tiếp cận: kiểm tra từng field. Slice/map → compile error. Pointer so địa chỉ.

---

### Lời giải BT6: Stack[int]

\`\`\`go
type Stack struct {
    data []int
}

func (s *Stack) Push(v int) {
    s.data = append(s.data, v)
}

func (s *Stack) Pop() (int, bool) {
    if len(s.data) == 0 {
        return 0, false
    }
    last := len(s.data) - 1
    v := s.data[last]
    s.data = s.data[:last]
    return v, true
}

func (s *Stack) Peek() (int, bool) {
    if len(s.data) == 0 {
        return 0, false
    }
    return s.data[len(s.data)-1], true
}

func (s *Stack) Len() int       { return len(s.data) }
func (s *Stack) IsEmpty() bool  { return len(s.data) == 0 }

// Demo
s := &Stack{}
s.Push(1); s.Push(2); s.Push(3)
v, _ := s.Pop()
fmt.Println(v)             // 3
v, _ = s.Peek()
fmt.Println(v)             // 2
fmt.Println(s.Len())       // 2
fmt.Println(s.IsEmpty())   // false
\`\`\`

Cách tiếp cận:
1. Dùng \`[]int\` làm storage — append cuối = push, slice cuối = pop, $O(1)$ amortized.
2. Mọi method pointer receiver (vì Push/Pop mutate). Theo convention "nhất quán", Len/IsEmpty/Peek cũng pointer.
3. Pop trên rỗng trả \`(0, false)\` — caller dùng comma-ok pattern.

**Độ phức tạp**: Push/Pop/Peek $O(1)$ amortized, Len/IsEmpty $O(1)$.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — implementation đầy đủ Point/Rectangle/Manager/Stack với value & pointer receiver, embedding, constructor, comparison demo.
- [visualization.html](./visualization.html) — 3 module tương tác:
  - Module 1: Memory layout — chọn struct preset, drag reorder field, thấy padding & size update real-time.
  - Module 2: Receiver picker — slider struct size + checkbox mutate → suggest value/pointer.
  - Module 3: Embedding visualizer — animate \`m.Greet()\` trace promotion, toggle override.

---

## Bài tiếp theo

- [Lesson 16 — Pointer](../lesson-16-pointers/): hiểu sâu cơ chế pointer, \`*\`, \`&\`, escape analysis. Bài này chỉ dùng pointer ở mức "đủ dùng method"; L16 sẽ trả lời các câu hỏi "vì sao", "khi nào pointer escape lên heap", "nil pointer panic ở đâu".
- [Lesson 17 — Mini-project CLI Todo](../lesson-17-mini-project-cli-todo/): áp dụng struct + method trong project thực tế.
- Tier 2 sẽ học **interface** (L18) — cách Go đạt polymorphism mà không cần inheritance. Bạn sẽ thấy embedding + interface là combo cực mạnh.
- Tier 3 (L26-L28) sẽ học **memory layout sâu** (alignment, false sharing), **generic** (L23) — thay vì hardcode \`Stack[int]\`, ta có \`Stack[T]\`.
`;
