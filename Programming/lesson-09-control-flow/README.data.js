// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-09-control-flow/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Điều kiện: \`if\` và \`switch\`

## Mục tiêu học tập

- Viết \`if\` đúng cú pháp Go (không ngoặc đơn, bắt buộc block \`{}\`).
- Dùng thành thạo \`if\` với **init statement** — pattern idiomatic nhất Go.
- Hiểu \`switch\` Go khác C/Java thế nào (tự \`break\`, multi-value, no-expression, type switch).
- Áp dụng pattern **early return** để giảm nesting (avoid pyramid of doom).
- Tránh được các pitfall phổ biến: short-circuit sai thứ tự, dùng \`=\` trong condition.

## Kiến thức tiền đề

- [Lesson 07 — Biến & kiểu dữ liệu](../lesson-07-variables-types/README.md) (\`:=\`, scope của biến).
- [Lesson 08 — Toán tử & Biểu thức](../lesson-08-operators-expressions/README.md) (\`&&\`, \`||\`, comparison).

## 1. \`if\` cơ bản — đơn giản hơn C/Java

Cú pháp Go:

\`\`\`go
if x > 0 {
    fmt.Println("dương")
}
\`\`\`

Khác C/Java:
- **Không có ngoặc đơn \`()\` quanh condition.** \`if (x > 0)\` cũng compile được nhưng \`gofmt\` sẽ phàn nàn — đừng viết.
- **Block \`{}\` BẮT BUỘC**, kể cả 1 dòng. Không có \`if x > 0 doSomething()\` như C.
- \`{\` phải nằm cùng dòng với \`if\` (K&R style cứng). \`gofmt\` không cho khác.

> 💡 **Trực giác**: Go cố ý ép bạn dùng \`{}\` để tránh bug "dangling else" và misindent. Đây là kỷ luật của Go — ban đầu khó chịu, sau quen sẽ đỡ phải debug lỗi indent.

### Ví dụ số cụ thể

\`\`\`go
age := 18
if age >= 18 {
    fmt.Println("Đủ tuổi vote")     // chạy nhánh này
}
// Output: Đủ tuổi vote
\`\`\`

\`\`\`go
balance := -50
if balance < 0 {
    fmt.Println("Cảnh báo: tài khoản âm")  // chạy
}
\`\`\`

\`\`\`go
isAdmin := false
if isAdmin {
    fmt.Println("Admin panel")  // KHÔNG chạy
}
\`\`\`

\`\`\`go
score := 85
if score >= 90 && score <= 100 {
    fmt.Println("A")
} else {
    fmt.Println("Không phải A")  // chạy: 85 không thuộc [90,100]
}
// Output: Không phải A
\`\`\`

## 2. \`if\` với init statement — pattern quan trọng nhất

Đây là pattern **đặc trưng nhất của Go**, gặp ở mọi codebase production:

\`\`\`go
if err := doSomething(); err != nil {
    return err
}
\`\`\`

Đọc là: *"thực thi \`doSomething()\`, gán kết quả vào \`err\`, RỒI mới kiểm tra \`err != nil\`"*.

**Scope của \`err\` chỉ trong if/else block** — sau \`}\` không tồn tại nữa. Đây chính là lý do dùng pattern này: tránh ô nhiễm scope ngoài.

### 5 ví dụ thực tế đập vào mặt ai đọc Go

**(a) Mở file**

\`\`\`go
if f, err := os.Open("config.json"); err != nil {
    return fmt.Errorf("không mở được config: %w", err)
} else {
    defer f.Close()
    // dùng f...
}
\`\`\`

> ⚠ Trên thực tế, Go community **khuyến khích không nest \`else\`** — thay vào đó dùng early return. Xem mục 8.

**(b) Parse số**

\`\`\`go
input := "42abc"
if n, err := strconv.Atoi(input); err == nil {
    fmt.Println("parsed:", n)
} else {
    fmt.Println("lỗi parse:", err)
}
// Output: lỗi parse: strconv.Atoi: parsing "42abc": invalid syntax
\`\`\`

**(c) Type assertion**

\`\`\`go
var x interface{} = "hello"
if s, ok := x.(string); ok {
    fmt.Println("là string, độ dài:", len(s))
} else {
    fmt.Println("không phải string")
}
// Output: là string, độ dài: 5
\`\`\`

**(d) Query database**

\`\`\`go
if row := db.QueryRow("SELECT name FROM users WHERE id=?", 1); row != nil {
    var name string
    if err := row.Scan(&name); err != nil {
        return err
    }
    fmt.Println("user:", name)
}
\`\`\`

**(e) HTTP call**

\`\`\`go
if resp, err := http.Get("https://api.example.com/health"); err != nil {
    log.Printf("không gọi được: %v", err)
} else {
    defer resp.Body.Close()
    fmt.Println("status:", resp.StatusCode)
}
\`\`\`

> ❓ **Câu hỏi tự nhiên**: vì sao không viết \`err := doX(); if err != nil { ... }\` thành 2 dòng?
>
> Cả 2 đều chạy được. Nhưng \`if err := ...; err != nil\` **giới hạn scope \`err\`** chỉ trong if block. Nếu viết 2 dòng, \`err\` còn sống ở scope ngoài → dễ vô tình dùng lại biến \`err\` cũ ở dòng dưới (shadow bug). Pattern 1 dòng là defensive coding.

### Cú pháp đầy đủ

\`\`\`go
if <init>; <condition> {
    // body
}
\`\`\`

- \`<init>\` là 1 statement (thường là gán: \`x := ...\` hoặc \`x, err := ...\`).
- \`<condition>\` là biểu thức bool.
- Biến khai báo trong \`<init>\` chỉ scope trong if + else block.

> 📝 **Ghi nhớ**: \`err != nil\` là dòng code phổ biến nhất Go — bạn sẽ gõ nó hàng nghìn lần. Quen dạng \`if x, err := foo(); err != nil\` từ sớm.

## 3. \`if\` / \`else if\` / \`else\`

\`\`\`go
if score >= 90 {
    grade = "A"
} else if score >= 80 {
    grade = "B"
} else if score >= 70 {
    grade = "C"
} else {
    grade = "F"
}
\`\`\`

Hoạt động giống mọi ngôn ngữ. Nhưng Go khuyến khích:

1. **Chain \`if-else if\` dài → cân nhắc đổi sang \`switch\`** (xem mục 4).
2. **Nesting sâu → đổi sang early return** (xem mục 8).

> ⚠ **Lỗi thường gặp**: nested if 4-5 tầng. Dấu hiệu code cần refactor.

## 4. \`switch\` — Go khác C/Java

\`\`\`go
switch day {
case "Mon", "Tue", "Wed", "Thu", "Fri":
    fmt.Println("ngày làm")
case "Sat", "Sun":
    fmt.Println("cuối tuần")
default:
    fmt.Println("ngày không hợp lệ")
}
\`\`\`

### Khác biệt với C/Java

| Đặc điểm | C/Java | Go |
|---|---|---|
| Tự \`break\` sau case? | KHÔNG (phải \`break;\` thủ công) | **CÓ** |
| Multiple value/case | Không (phải fallthrough) | **\`case 1, 2, 3:\`** |
| \`case\` value | Phải là constant integer/enum | **Bất kỳ comparable** (string, struct, interface...) |
| Init statement | Không | **Có** (giống \`if\`) |
| Switch không expression | Không | **Có** (\`switch { case x>0: }\`) |

### Ví dụ tổng hợp

**Multiple value:**

\`\`\`go
month := 4
switch month {
case 12, 1, 2:
    fmt.Println("Đông")
case 3, 4, 5:
    fmt.Println("Xuân")    // chạy
case 6, 7, 8:
    fmt.Println("Hè")
case 9, 10, 11:
    fmt.Println("Thu")
}
// Output: Xuân
\`\`\`

**Init statement:**

\`\`\`go
switch hour := time.Now().Hour(); {
case hour < 12:
    fmt.Println("Sáng")
case hour < 18:
    fmt.Println("Chiều")
default:
    fmt.Println("Tối")
}
\`\`\`

**Switch trên string:**

\`\`\`go
switch ext := filepath.Ext("photo.jpg"); ext {
case ".jpg", ".jpeg", ".png", ".gif":
    return "image"
case ".mp4", ".avi", ".mov":
    return "video"
case ".pdf":
    return "document"
default:
    return "unknown"
}
\`\`\`

> 💡 **Trực giác**: Go đảo mặc định của C — case tự đóng lại sau khi match. Nếu thật sự cần fall through, phải gõ thêm từ khoá \`fallthrough\` (xem mục 5). Mặc định an toàn = ít bug.

## 5. \`fallthrough\` — hiếm khi cần

\`fallthrough\` ép Go đi xuống case bên dưới (giống behavior mặc định của C):

\`\`\`go
n := 1
switch n {
case 1:
    fmt.Println("một")
    fallthrough
case 2:
    fmt.Println("hai")  // VẪN chạy vì có fallthrough phía trên
case 3:
    fmt.Println("ba")   // KHÔNG chạy (case 2 không có fallthrough)
}
// Output:
// một
// hai
\`\`\`

Đặc điểm:
- \`fallthrough\` **không kiểm tra condition của case kế tiếp** — nó nhảy thẳng vào body case dưới.
- Phải là **dòng cuối cùng** của case.
- Hiếm dùng. Nếu dùng, comment giải thích vì sao.

> ⚠ **Lỗi thường gặp với người đến từ C**: tưởng Go tự fall through nên không viết \`break;\` — kết quả là case dài, không ai chạy quá case đầu. Đảo lại: Go **mặc định không fall**, phải gõ \`fallthrough\` mới fall.

## 6. Type switch — kiểm tra kiểu của \`interface{}\`

\`\`\`go
func describe(x interface{}) {
    switch v := x.(type) {
    case int:
        fmt.Printf("int: %d (gấp đôi = %d)\\n", v, v*2)
    case string:
        fmt.Printf("string: %q (độ dài = %d)\\n", v, len(v))
    case bool:
        fmt.Printf("bool: %t\\n", v)
    case nil:
        fmt.Println("nil")
    default:
        fmt.Printf("kiểu khác: %T\\n", v)
    }
}

describe(42)         // int: 42 (gấp đôi = 84)
describe("hello")    // string: "hello" (độ dài = 5)
describe(true)       // bool: true
describe(nil)        // nil
describe(3.14)       // kiểu khác: float64
\`\`\`

Cú pháp đặc biệt: \`x.(type)\` — chỉ hợp lệ TRONG \`switch\`.

Trong mỗi case, **\`v\` có đúng kiểu của case đó**:
- Case \`int\`: \`v\` là \`int\`, có thể \`v * 2\`.
- Case \`string\`: \`v\` là \`string\`, có thể \`len(v)\`.
- Case \`default\`: \`v\` giữ kiểu gốc \`interface{}\`.

> ⚠ **Pitfall**: viết \`switch x.(type)\` (không có \`v :=\`) → vẫn match được case, nhưng KHÔNG dùng được giá trị bên trong case. Ví dụ:
>
> \`\`\`go
> switch x.(type) {
> case int:
>     // KHÔNG có v ở đây — chỉ biết x là int, nhưng phải assert lại
>     v := x.(int)
>     // ...
> }
> \`\`\`
> Luôn dùng \`switch v := x.(type)\` để tránh bước thừa.

> 📝 **Preview Tier 2**: \`interface{}\` (hay \`any\` từ Go 1.18) là "kiểu bất kỳ". Type switch là cách kiểm tra runtime xem một \`interface{}\` thực ra chứa kiểu gì. Sẽ học sâu ở Tier 2 Lesson 01 — Interface.

## 7. \`switch\` không expression — thay if-else if chain

Khi \`switch\` không có biểu thức, mỗi \`case\` là 1 condition bool (tương đương \`case true\`):

\`\`\`go
switch {
case x < 0:
    fmt.Println("âm")
case x == 0:
    fmt.Println("không")
case x > 0:
    fmt.Println("dương")
}
\`\`\`

Tương đương:

\`\`\`go
if x < 0 {
    fmt.Println("âm")
} else if x == 0 {
    fmt.Println("không")
} else if x > 0 {
    fmt.Println("dương")
}
\`\`\`

### Khi nào nên dùng style này?

- **Chain ≥ 3 condition không cùng biến** — \`switch\` ngắn gọn hơn \`if-else if\` lặp lại.
- **Phân loại bằng range** (\`x < 10\`, \`x < 100\`, \`x < 1000\`) — đẹp hơn \`if-else if\`.
- **FizzBuzz-style**:

\`\`\`go
switch {
case n%15 == 0:
    fmt.Println("FizzBuzz")
case n%3 == 0:
    fmt.Println("Fizz")
case n%5 == 0:
    fmt.Println("Buzz")
default:
    fmt.Println(n)
}
\`\`\`

> 💡 **Trực giác**: \`switch { ... }\` đọc dễ hơn \`if-else if\` dài vì các \`case\` thẳng hàng — mắt scan nhanh, không bị lệch theo \`else if\`.

## 8. Pattern: early return — chữa pyramid of doom

**Pyramid of doom** = nesting if quá sâu, code chính ở mức indent 4-5+.

### Trước khi refactor

\`\`\`go
func processUser(id int) error {
    user, err := db.GetUser(id)
    if err == nil {
        if user.Active {
            if user.HasPermission("write") {
                if user.Quota > 0 {
                    // CODE CHÍNH ở đây — indent 4 tầng
                    return doWork(user)
                } else {
                    return errors.New("quota hết")
                }
            } else {
                return errors.New("không có quyền")
            }
        } else {
            return errors.New("user bị khoá")
        }
    } else {
        return err
    }
}
\`\`\`

Vấn đề:
- Code chính bị đẩy sâu, mắt khó tìm.
- Mỗi \`else\` đối ngẫu cách xa \`if\` tương ứng vài chục dòng → khó match.
- Thêm điều kiện = thêm tầng = code càng nghiêng.

### Sau khi refactor (early return)

\`\`\`go
func processUser(id int) error {
    user, err := db.GetUser(id)
    if err != nil {
        return err
    }
    if !user.Active {
        return errors.New("user bị khoá")
    }
    if !user.HasPermission("write") {
        return errors.New("không có quyền")
    }
    if user.Quota <= 0 {
        return errors.New("quota hết")
    }

    // CODE CHÍNH ở indent 0 — happy path rõ ràng
    return doWork(user)
}
\`\`\`

Lợi ích:
- **Happy path ở indent 0** — mắt thấy ngay cuối hàm là logic chính.
- Mỗi guard độc lập, dễ đọc, dễ sửa.
- Thêm guard = thêm 1 block 3 dòng ở đầu, không nghiêng code.

> 💡 **Quy tắc ngón cái**: nếu thấy \`if-else\` mà cả 2 nhánh đều \`return\`, hầu như chắc chắn refactor được thành early return.

> 📝 **Đây là idiom số 1 của Go.** Mọi codebase Go production đều theo style này. Đọc bất kỳ thư viện chuẩn (vd \`net/http\`, \`encoding/json\`) sẽ thấy.

## 9. \`goto\` — có nhưng đừng dùng

Go có \`goto\`:

\`\`\`go
goto Label
// ...
Label:
    fmt.Println("nhảy tới đây")
\`\`\`

Quy tắc thực tế:
- **Code người viết: KHÔNG DÙNG.** Luôn có cách viết clean hơn (early return, function extraction, loop với break label).
- **Code generated:** vài compiler/codegen sinh \`goto\` vì dễ generate (vd \`gofrontend\` cho LLVM). OK trong context đó.

Hạn chế của \`goto\` trong Go (so với C):
- Không nhảy được vào trong scope khác (vd nhảy vào giữa block đã có biến khai báo).
- Không nhảy lùi qua khai báo biến.
- Chỉ nhảy trong cùng function.

> 📝 Bạn sẽ không gõ \`goto\` trong toàn bộ sự nghiệp Go. Mention ở đây để khỏi giật mình khi gặp trong code generated.

## 10. Common pitfalls

### (a) Short-circuit sai thứ tự nil check

\`\`\`go
// SAI — đụng obj.Name TRƯỚC khi biết obj có nil không
if obj.Name == "alice" && obj != nil {
    // ...
}
// Panic nếu obj == nil: nil pointer dereference khi đọc obj.Name
\`\`\`

\`\`\`go
// ĐÚNG — kiểm tra nil TRƯỚC, short-circuit cứu bạn
if obj != nil && obj.Name == "alice" {
    // ...
}
\`\`\`

Go evaluate \`&&\` từ trái sang. Nếu vế trái \`false\`, vế phải KHÔNG được evaluate → đây gọi là **short-circuit**. Phải đặt nil check làm vế trái.

### (b) \`=\` vs \`==\` trong condition

C cho phép \`if (x = 1) { ... }\` — gán đồng thời test (rất dễ bug). Go **cấm**:

\`\`\`go
// LỖI compile: "cannot use assignment ... as value"
if x = 1 {
    // ...
}
\`\`\`

Trong condition phải là biểu thức bool. \`=\` (gán) không phải biểu thức trong Go → compile fail. Đây là feature, không phải bug.

Trường hợp duy nhất gán được trong condition: **init statement** của \`if\`/\`switch\`:

\`\`\`go
if x := compute(); x > 0 {  // OK: x := là init, x > 0 là condition
    // ...
}
\`\`\`

### (c) Type switch không lưu vào \`v\`

\`\`\`go
// Lãng phí — không dùng được giá trị bên trong case
switch x.(type) {
case int:
    // muốn dùng x as int? phải làm x.(int) lại
}
\`\`\`

\`\`\`go
// Đúng
switch v := x.(type) {
case int:
    fmt.Println(v * 2)  // v là int rồi, dùng trực tiếp
}
\`\`\`

### (d) Quên \`default\` trong switch quan trọng

\`\`\`go
switch status {
case "active":
    // ...
case "inactive":
    // ...
// thiếu default — nếu có status mới ("banned", "pending") sẽ rơi không xử lý
}
\`\`\`

Khuyến nghị: với switch trên enum/status, **luôn có \`default\`** (kể cả chỉ để log warning).

### (e) Misindent \`fallthrough\`

\`\`\`go
case 1:
    if x > 0 {
        fallthrough  // ERROR: fallthrough phải là statement cuối của case, không nằm trong if
    }
\`\`\`

\`fallthrough\` phải là **dòng cuối CỦA case** (không phải dòng cuối của nested block).

> 📝 **Tóm tắt mục 10**: nil check trái trước; \`=\` không dùng trong condition (trừ init); type switch luôn \`v :=\`; switch quan trọng thêm \`default\`; \`fallthrough\` ở đáy case.

## Bài tập

### Bài tập 1 — Refactor pyramid

Cho hàm sau, refactor thành early return:

\`\`\`go
func chargeOrder(o *Order) error {
    if o != nil {
        if o.Valid() {
            if o.Customer != nil {
                if o.Customer.HasCard() {
                    return o.Customer.Charge(o.Amount)
                } else {
                    return errors.New("no card")
                }
            } else {
                return errors.New("no customer")
            }
        } else {
            return errors.New("invalid order")
        }
    } else {
        return errors.New("nil order")
    }
}
\`\`\`

### Bài tập 2 — Phân loại điểm bằng switch no-expression

Viết hàm \`grade(score int) string\` trả về \`"A"\` cho \`score >= 90\`, \`"B"\` cho \`>= 80\`, \`"C"\` cho \`>= 70\`, \`"D"\` cho \`>= 60\`, \`"F"\` cho dưới 60. Dùng \`switch\` không expression. Nếu \`score < 0\` hoặc \`score > 100\` → trả \`"invalid"\`.

### Bài tập 3 — Type switch xử lý \`interface{}\`

Viết hàm \`stringify(x interface{}) string\`:
- \`int\`: trả về \`"int: <giá trị>"\`.
- \`string\`: trả về \`"str: \\"<giá trị>\\""\`.
- \`bool\`: trả về \`"bool: <true|false>"\`.
- \`nil\`: trả về \`"nil"\`.
- Kiểu khác: trả về \`"unknown: <%T>"\` (dùng \`fmt.Sprintf\` với \`%T\`).

### Bài tập 4 — Trace fallthrough

Cho code:

\`\`\`go
n := 1
switch n {
case 1:
    fmt.Println("A")
    fallthrough
case 2:
    fmt.Println("B")
    fallthrough
case 3:
    fmt.Println("C")
case 4:
    fmt.Println("D")
}
\`\`\`

Hỏi output khi:
- (a) \`n = 1\`
- (b) \`n = 2\`
- (c) \`n = 3\`
- (d) \`n = 5\`

### Bài tập 5 — Sửa code có lỗi short-circuit

Code dưới đôi khi panic. Tìm lỗi và sửa:

\`\`\`go
func greet(u *User) string {
    if u.Name != "" && u != nil {
        return "Xin chào, " + u.Name
    }
    return "Xin chào, khách"
}
\`\`\`

## Lời giải chi tiết

### Lời giải BT1

Cách tiếp cận: đảo logic mỗi \`if\` thành **negative guard**, return lỗi ngay. Đi từ guard cụ thể nhất ra ngoài.

\`\`\`go
func chargeOrder(o *Order) error {
    if o == nil {
        return errors.New("nil order")
    }
    if !o.Valid() {
        return errors.New("invalid order")
    }
    if o.Customer == nil {
        return errors.New("no customer")
    }
    if !o.Customer.HasCard() {
        return errors.New("no card")
    }
    return o.Customer.Charge(o.Amount)  // happy path, indent 0
}
\`\`\`

Số dòng tương đương, nhưng:
- Mỗi guard độc lập, đọc tuần tự.
- Happy path ở cuối, indent 0.
- Thêm guard mới = thêm 3 dòng đầu, không nghiêng code.

### Lời giải BT2

\`\`\`go
func grade(score int) string {
    if score < 0 || score > 100 {
        return "invalid"
    }
    switch {
    case score >= 90:
        return "A"
    case score >= 80:
        return "B"
    case score >= 70:
        return "C"
    case score >= 60:
        return "D"
    default:
        return "F"
    }
}
\`\`\`

Verify:
- \`grade(95)\` → \`score >= 90\` true → \`"A"\` ✓
- \`grade(85)\` → \`score >= 90\` false, \`score >= 80\` true → \`"B"\` ✓
- \`grade(60)\` → match \`score >= 60\` → \`"D"\` ✓
- \`grade(59)\` → không match case nào → \`default\` → \`"F"\` ✓
- \`grade(-5)\` → guard đầu → \`"invalid"\` ✓
- \`grade(101)\` → guard đầu → \`"invalid"\` ✓

> 💡 Vì sao dùng \`switch {}\` thay vì if-else if? Cả 4 case cùng cấu trúc "compare với hằng số", đặt thẳng hàng dễ đọc hơn nested else.

### Lời giải BT3

\`\`\`go
func stringify(x interface{}) string {
    switch v := x.(type) {
    case int:
        return fmt.Sprintf("int: %d", v)
    case string:
        return fmt.Sprintf("str: %q", v)   // %q tự thêm dấu ""
    case bool:
        return fmt.Sprintf("bool: %t", v)
    case nil:
        return "nil"
    default:
        return fmt.Sprintf("unknown: %T", x)
    }
}
\`\`\`

Verify:
- \`stringify(42)\` → \`"int: 42"\`
- \`stringify("hello")\` → \`"str: \\"hello\\""\`
- \`stringify(true)\` → \`"bool: true"\`
- \`stringify(nil)\` → \`"nil"\`
- \`stringify(3.14)\` → \`"unknown: float64"\`
- \`stringify([]int{1, 2})\` → \`"unknown: []int"\`

> ⚠ Trong \`default\`, dùng \`x\` (kiểu \`interface{}\`) cho \`%T\`, không phải \`v\` — vì trong default \`v\` cũng có kiểu \`interface{}\`, kết quả như nhau, nhưng dùng \`x\` rõ ý hơn.

### Lời giải BT4

**(a) \`n = 1\`**: match case 1 → in \`A\`, \`fallthrough\` → vào body case 2 (KHÔNG kiểm tra \`n == 2\`!) → in \`B\`, \`fallthrough\` → in \`C\`, hết. Case 3 không có fallthrough → dừng.

\`\`\`
A
B
C
\`\`\`

**(b) \`n = 2\`**: match case 2 → in \`B\`, \`fallthrough\` → in \`C\`, hết.

\`\`\`
B
C
\`\`\`

**(c) \`n = 3\`**: match case 3 → in \`C\`, không fallthrough → dừng. **KHÔNG in \`D\`** vì fallthrough chỉ áp dụng cho case có lệnh đó.

\`\`\`
C
\`\`\`

**(d) \`n = 5\`**: không match case nào, không có \`default\` → switch không in gì.

\`\`\`
(không có output)
\`\`\`

> 💡 **Điểm cốt lõi**: \`fallthrough\` nhảy thẳng vào body case dưới mà KHÔNG kiểm tra condition của case đó. Đây là nguồn bug kinh điển — dùng \`fallthrough\` rất phải cẩn thận.

### Lời giải BT5

**Vấn đề**: \`u.Name != ""\` được evaluate TRƯỚC \`u != nil\`. Khi \`u == nil\`, đọc \`u.Name\` gây panic \`nil pointer dereference\`.

**Sửa**: đảo thứ tự để nil check là vế trái của \`&&\`. Short-circuit của Go đảm bảo vế phải không evaluate nếu vế trái false.

\`\`\`go
func greet(u *User) string {
    if u != nil && u.Name != "" {  // nil check TRƯỚC
        return "Xin chào, " + u.Name
    }
    return "Xin chào, khách"
}
\`\`\`

Verify:
- \`greet(nil)\`: \`u != nil\` là \`false\` → short-circuit, vế phải không evaluate → vào else → \`"Xin chào, khách"\`. **Không panic.**
- \`greet(&User{Name: ""})\`: \`u != nil\` true, \`u.Name != ""\` false → false → \`"Xin chào, khách"\`.
- \`greet(&User{Name: "Alice"})\`: cả 2 vế true → \`"Xin chào, Alice"\`.

> ⚠ **Quy tắc vàng**: trong \`&&\`, **luôn đặt cheap check / nil check ở vế trái**, expensive check hoặc dereference ở vế phải.

## Code & Minh họa

- [solutions.go](./solutions.go) — full code các pattern ở trên (chạy \`go run solutions.go\`).
- [visualization.html](./visualization.html) — 3 module tương tác: refactor pyramid, switch flow visualizer, type switch playground.

## Bài tiếp theo

Tiếp tục với [Lesson 10 — Vòng lặp \`for\`](../lesson-10-loops-for/README.md): 3 dạng \`for\`, \`range\`, \`break\`/\`continue\`/label.

Sau khi xong cả \`if/switch\` (L9) và \`for\` (L10), bạn đã có đủ "control flow" để viết được mọi thuật toán cơ bản — chuẩn bị cho Lesson 11 (Hàm) và Lesson 12 (Slice).
`;
