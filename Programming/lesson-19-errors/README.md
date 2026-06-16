# Lesson 19 — Error Handling kiểu Go

> **Tier 2 · Intermediate.** Lesson này tập trung vào một trong những điểm gây tranh cãi nhất khi từ Java/Python sang Go: **Go không có exception**. Mọi lỗi là một giá trị (value) được trả về tường minh, kiểm tra tường minh, và truyền tường minh. Sau khi học xong bạn sẽ hết "ngạc nhiên" khi đọc code Go đầy `if err != nil`.

## Mục tiêu học tập

Sau lesson này bạn có thể:

1. Giải thích vì sao Go chọn **error là value** thay vì exception, và lý giải được khi nào nên dùng `panic`/`recover`.
2. Tự viết được sentinel error, custom error type, và biết khi nào chọn cái nào.
3. Sử dụng thành thạo `fmt.Errorf("... %w", err)`, `errors.Is`, `errors.As`, `errors.Join` (Go ≥ 1.13 và ≥ 1.20).
4. Áp dụng đúng pattern `defer + named return` để không **nuốt** lỗi từ `Close()`.
5. Tránh được các anti-pattern phổ biến: ignore err, biến error thành panic, wrap trùng lặp.

## Kiến thức tiền đề

- [Lesson 11 — Functions](../lesson-11-functions/) (multiple return values).
- [Lesson 15 — Struct & Method](../lesson-15-struct-method/) (để viết custom error type).
- [Lesson 18 — Interfaces](../lesson-18-interfaces/) (`error` là interface).

---

## 1. Triết lý: Error là VALUE, không phải exception

> 💡 **Trực giác.** Hình dung bạn đang đi đường và gặp ổ gà. Có 2 cách báo:
>
> - **Exception (Java/Python)**: gặp ổ gà → **ngất xỉu**. Có ai đó dọc đường (try/catch) sẵn sàng đỡ bạn dậy thì tốt; không thì cả người và xe lăn xuống vực. Bạn KHÔNG nhìn thấy ổ gà trong code đang đọc — phải đọc tài liệu hoặc bị surprised lúc runtime.
> - **Error value (Go)**: gặp ổ gà → **dừng xe và đưa biên bản** cho người đi sau (return value). Người tiếp nhận đọc biên bản và quyết định: vá ổ gà rồi đi tiếp, đổi đường, hay dừng hẳn. Mọi quyết định **hiển thị trong code**.

Trong Java, đoạn này có thể ném `IOException` mà bạn không thấy:

```java
String content = Files.readString(Path.of("config.json"));
// IOException được ném đâu? Phải đọc javadoc hoặc IDE highlight mới biết.
```

Trong Go, **type của hàm cho bạn biết chính xác**:

```go
content, err := os.ReadFile("config.json")
//             ↑ bạn BẮT BUỘC nghĩ tới err — compiler nhắc nếu ignore
if err != nil {
    return fmt.Errorf("đọc config: %w", err)
}
```

### Ưu điểm

1. **Đọc code thấy được luồng lỗi.** Mọi `if err != nil` là một nhánh thoát rõ ràng. Không có "exception bay xuyên 5 hàm".
2. **Không có overhead unwinding stack.** Trả error chỉ là copy giá trị — rẻ như trả `int`.
3. **Compiler hỗ trợ.** Hàm trả `(T, error)` mà bạn quên check thường bị `errcheck` linter bắt.

### Nhược điểm

1. **Code dài hơn.** 3 dòng `if err != nil { return err }` lặp đi lặp lại.
2. **Dễ làm sai context.** Nếu chỉ `return err` mà không wrap, caller không biết err đến từ đâu trong call chain.

> ❓ **Câu hỏi tự nhiên: "Vậy Go có hệ exception không? Tôi thấy `panic`."**
>
> Có `panic`, nhưng **panic ≠ exception**. Panic chỉ dùng cho lỗi **không thể tiếp tục** (nil pointer deref, index out of range, invariant bị phá vỡ). Không dùng panic cho "file không tồn tại" hay "user input sai" — đó là lỗi **dự kiến**, phải trả về error. Sẽ rõ ở mục 8-9.

> 📝 **Tóm tắt mục 1.**
> - Error trong Go là **giá trị trả về**, không phải cơ chế tách biệt.
> - Mọi điểm có thể lỗi đều xuất hiện trong type signature `(T, error)`.
> - Đánh đổi: code dài hơn, đổi lại đọc-được-luồng-lỗi.

---

## 2. Interface `error` — chỉ có MỘT method

Trong stdlib, `error` được định nghĩa như sau:

```go
type error interface {
    Error() string
}
```

Vậy thôi. Một method `Error() string`. **Bất kỳ type nào có method `Error() string` đều là một `error`.**

Ví dụ minimal:

```go
type MyErr struct{ Code int }

func (e MyErr) Error() string {
    return fmt.Sprintf("mã lỗi %d", e.Code)
}

var _ error = MyErr{Code: 42} // compile OK — MyErr là error
```

> 💡 **Trực giác.** Interface `error` giống như "biên bản". Ai cũng làm được biên bản, miễn là biên bản đó **đọc ra được dòng chữ mô tả lỗi**. Không quy định ngôn ngữ, không quy định format. Đơn giản nhất có thể.

### Bốn ví dụ số/giá trị để cảm nhận

| Cách tạo error | Code | `err.Error()` trả về |
|---|---|---|
| `errors.New` | `errors.New("disk full")` | `"disk full"` |
| `fmt.Errorf` | `fmt.Errorf("user %d not found", 42)` | `"user 42 not found"` |
| Custom struct | `MyErr{Code: 404}` | `"mã lỗi 404"` |
| Wrap (`%w`) | `fmt.Errorf("read: %w", io.EOF)` | `"read: EOF"` |

> ⚠ **Lỗi thường gặp.** Nhiều người mới viết `func (e *MyErr) Error() string` (pointer receiver) rồi đem so sánh `err == myErr`. Đây là so sánh con trỏ, không phải so sánh nội dung. Sentinel error gần như luôn dùng value comparison qua biến package-level — xem mục 5.

---

## 3. Pattern cơ bản: `if err != nil { return err }`

Đây là 4 dòng bạn sẽ gõ đi gõ lại trong Go:

```go
result, err := doSomething()
if err != nil {
    return result, err // hoặc return zero-value, err
}
```

### 5 ví dụ thực tế

**(1) Parse số nguyên từ user input.**

```go
func ageFromInput(s string) (int, error) {
    age, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("tuổi không hợp lệ: %w", err)
    }
    if age < 0 || age > 150 {
        return 0, fmt.Errorf("tuổi ngoài khoảng [0,150]: %d", age)
    }
    return age, nil
}
```

**(2) Mở file để đọc.**

```go
data, err := os.ReadFile("/etc/hosts")
if err != nil {
    return nil, fmt.Errorf("đọc hosts: %w", err)
}
```

**(3) Query DB lấy 1 user.**

```go
row := db.QueryRow("SELECT name FROM users WHERE id = ?", id)
var name string
if err := row.Scan(&name); err != nil {
    if errors.Is(err, sql.ErrNoRows) {
        return "", fmt.Errorf("user %d không tồn tại", id)
    }
    return "", fmt.Errorf("scan user %d: %w", id, err)
}
```

**(4) Gọi HTTP request có timeout.**

```go
resp, err := http.Get("https://api.example.com/users/1")
if err != nil {
    return nil, fmt.Errorf("gọi API users: %w", err)
}
defer resp.Body.Close()
```

**(5) Decode JSON.**

```go
var cfg Config
if err := json.Unmarshal(data, &cfg); err != nil {
    return Config{}, fmt.Errorf("parse config json: %w", err)
}
```

> 🔁 **Dừng lại tự kiểm tra.**
> Nếu hàm `doX()` trả `(int, error)` và bạn viết `n := doX()` (chỉ lấy 1 giá trị), điều gì xảy ra?
>
> <details><summary>Đáp án</summary>
>
> **Compile error**. Go bắt bạn nhận đủ số giá trị trả về. Nếu thực sự muốn bỏ err (KHÔNG khuyến khích), phải dùng `n, _ := doX()`. Việc gõ `_` là dấu hiệu rõ ràng cho code reviewer: "tôi cố tình bỏ qua".
> </details>

> 📝 **Tóm tắt mục 3.**
> - Pattern chuẩn: nhận `(result, err)`, check `err != nil`, return ngay.
> - Khi return từ trong middle, return **zero-value** của result + err.
> - Wrap với context (`fmt.Errorf("... %w", err)`) thay vì raw `return err` để debug được call chain.

---

## 4. Ba cách tạo error

### 4.1 `errors.New("msg")` — chuỗi tĩnh

```go
var ErrNotFound = errors.New("not found")
```

Dùng khi message **không cần biến**. Nếu phải nhúng dữ liệu vào message thì dùng `fmt.Errorf`.

### 4.2 `fmt.Errorf("format", args...)` — có format

```go
err := fmt.Errorf("user %d không tồn tại trong DB %s", 42, "users_db")
// "user 42 không tồn tại trong DB users_db"
```

Khi dùng verb `%w`, error trở thành **wrapped error** (mục 6).

### 4.3 Custom struct implement `Error()`

Khi cần **lỗi mang thêm dữ liệu** mà caller có thể đọc tự động (không phải parse string):

```go
type ValidationError struct {
    Field string
    Msg   string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("trường %q: %s", e.Field, e.Msg)
}
```

Caller sau đó dùng `errors.As`:

```go
var vErr *ValidationError
if errors.As(err, &vErr) {
    fmt.Println("Field bị lỗi:", vErr.Field) // truy cập field tường minh
}
```

> 💡 **Trực giác chọn loại.**
>
> - **Sentinel (mục 5)**: lỗi "không có data", chỉ cần check identity. Ví dụ: `sql.ErrNoRows`.
> - **`fmt.Errorf`**: lỗi message có biến, không cần caller decode.
> - **Custom struct**: caller cần **đọc** trường (HTTP status code, field name, retry hint).

> ❓ **Câu hỏi tự nhiên: "Tại sao không luôn dùng custom struct? Linh hoạt nhất mà."**
>
> Vì khi không cần data, struct **overkill**. Mỗi sentinel là 1 dòng `var ErrX = errors.New(...)`, gọn và đủ. Hơn nữa, sentinel có thể so sánh bằng `==` rất rẻ; struct phải dùng `errors.As` với reflection.

---

## 5. Sentinel error — error toàn cục dùng để so sánh

> 💡 **Trực giác.** Sentinel giống như **biển báo giao thông tiêu chuẩn**. "Stop sign" trên toàn quốc dùng đúng 1 mẫu để ai cũng nhận diện. Trong Go, một số lỗi xuất hiện ở nhiều nơi nhưng có ý nghĩa "tiêu chuẩn" → ta khai báo 1 biến global, mọi nơi compare với biến đó.

```go
package mypkg

import "errors"

var (
    ErrNotFound      = errors.New("not found")
    ErrAlreadyExists = errors.New("already exists")
    ErrUnauthorized  = errors.New("unauthorized")
)

func GetUser(id int) (User, error) {
    if id == 0 {
        return User{}, ErrNotFound
    }
    // ...
}
```

Caller:

```go
u, err := GetUser(0)
if errors.Is(err, mypkg.ErrNotFound) { // hoặc err == mypkg.ErrNotFound nếu KHÔNG wrap
    // hiển thị 404
}
```

### Ví dụ sentinel trong stdlib

| Sentinel | Khi nào trả | Nơi check |
|---|---|---|
| `io.EOF` | đọc xong stream | vòng lặp read |
| `sql.ErrNoRows` | `QueryRow.Scan` không có hàng | sau Scan |
| `os.ErrNotExist` | file/path không tồn tại | sau `os.Open`, `os.Stat` |
| `context.Canceled` | context bị Cancel | trong goroutine |
| `context.DeadlineExceeded` | context hết hạn | trong goroutine |

### Ưu / nhược

**Ưu:**
- Đơn giản, gọn, rẻ.
- Caller check 1 dòng `errors.Is(err, ErrX)`.

**Nhược:**
- Là **global mutable variable** — về lý thuyết có thể bị ai đó gán lại (Go không có `const` cho non-basic types).
- Không mang data động — nếu cần biết "không tìm thấy user nào", phải kèm thông tin qua wrap.
- Gây **API coupling**: caller phải import package chứa sentinel để compare.

> ⚠ **Lỗi thường gặp.** So sánh `err == ErrNotFound` chỉ đúng khi err **không bị wrap**. Nếu chain dài, dùng `errors.Is(err, ErrNotFound)`. Khi nào nghi ngờ — luôn dùng `errors.Is`.

---

## 6. Error wrap (Go ≥ 1.13)

> 💡 **Trực giác.** Wrap = **dán nhãn bưu kiện**. Lỗi gốc là gói hàng; mỗi tầng (storage → repository → service) dán thêm một nhãn "tôi nhận gói này từ đây". Khi mở ra (`errors.Unwrap`), thấy đầy đủ đường đi.

### `%w` verb

```go
if err != nil {
    return fmt.Errorf("loading config: %w", err)
}
```

`%w` tạo một error **wrap** err — vẫn truy cập được err gốc qua `errors.Unwrap`.

### Hai hàm cốt lõi

**`errors.Is(err, target)`** — kiểm tra err **có chứa** target qua chain wrap không.

```go
err := fmt.Errorf("read config: %w",
    fmt.Errorf("open file: %w", os.ErrNotExist))

errors.Is(err, os.ErrNotExist) // true
err == os.ErrNotExist          // false (sai!)
```

**`errors.As(err, &target)`** — tìm trong chain một error **assignable** sang type của target.

```go
var pErr *fs.PathError
if errors.As(err, &pErr) {
    fmt.Println("path lỗi:", pErr.Path)
}
```

### Vẽ wrap chain

Giả sử ta wrap 3 tầng:

```text
Tầng Storage (sâu nhất):
    e0 = os.ErrNotExist              // "file does not exist"

Tầng Repository:
    e1 = fmt.Errorf("open users.json: %w", e0)
       = "open users.json: file does not exist"

Tầng Service:
    e2 = fmt.Errorf("get user %d: %w", 42, e1)
       = "get user 42: open users.json: file does not exist"
```

Cây wrap chain:

```text
e2 ──Unwrap──▶ e1 ──Unwrap──▶ e0
                                 ↑
                                 (root, không Unwrap được nữa)
```

`errors.Is(e2, os.ErrNotExist)` đi từ e2 → e1 → e0, ở e0 match → trả `true`.

### Bốn ví dụ wrap thực tế

| Tầng | Code | Message kết quả |
|---|---|---|
| 1 | `os.Open("a.txt")` trả err | `"open a.txt: no such file or directory"` |
| 2 | `fmt.Errorf("load cfg: %w", err)` | `"load cfg: open a.txt: ..."` |
| 3 | `fmt.Errorf("init service: %w", err)` | `"init service: load cfg: open a.txt: ..."` |
| 4 | `fmt.Errorf("startup: %w", err)` | `"startup: init service: load cfg: open a.txt: ..."` |

> ⚠ **Lỗi thường gặp.** Dùng `%v` thay `%w` → mất chain. Chuỗi vẫn có, nhưng `errors.Is`/`As` không xuyên qua được. Quy tắc: wrap thì PHẢI dùng `%w`.

> 🔁 **Dừng lại tự kiểm tra.**
> Tôi viết: `err := fmt.Errorf("step: %v", io.EOF)`. Sau đó `errors.Is(err, io.EOF)` trả về gì?
>
> <details><summary>Đáp án</summary>
>
> `false`. `%v` chỉ in chuỗi, không wrap. Phải dùng `%w` để giữ chain.
> </details>

---

## 7. Error tree — `errors.Join` (Go ≥ 1.20)

Khi một thao tác có thể **fail ở nhiều chỗ song song** (validate nhiều field, close nhiều resource), bạn muốn trả tất cả lỗi cùng lúc:

```go
func ValidateUser(u User) error {
    var errs []error
    if u.Name == "" {
        errs = append(errs, errors.New("tên rỗng"))
    }
    if u.Age < 0 {
        errs = append(errs, errors.New("tuổi âm"))
    }
    if !strings.Contains(u.Email, "@") {
        errs = append(errs, errors.New("email thiếu @"))
    }
    return errors.Join(errs...)
}
```

Gọi:

```go
err := ValidateUser(User{Name: "", Age: -1, Email: "abc"})
fmt.Println(err)
// tên rỗng
// tuổi âm
// email thiếu @
```

`errors.Join(a, b, c)`:
- Trả `nil` nếu tất cả nil.
- Bằng `a` nếu chỉ a non-nil.
- Tạo joinError chứa tất cả nếu nhiều non-nil.

`errors.Is(joinedErr, X)` kiểm tra trong **mọi nhánh** của tree.

> 💡 **Trực giác.** `Join` = **đóng dấu cộp tất cả biên bản vào 1 folder** thay vì chỉ giữ tờ đầu tiên.

---

## 8. `panic` vs `error` — nguyên tắc vàng

| Tình huống | Dùng |
|---|---|
| File `config.json` không tồn tại lúc khởi động backend | `error` (rồi log và exit ở `main`) |
| Index `s[100]` khi `len(s) == 3` | `panic` (đây là **bug**) |
| Network timeout khi gọi API | `error` |
| Nil pointer deref vì quên init | `panic` (bug) |
| User nhập email sai format | `error` |
| Assert invariant trong code nội bộ (vd "queue rỗng phải có size 0") | `panic` (nếu vi phạm = bug) |
| Division by zero do input từ user | `error` (validate trước) |
| Division by zero do toán nội bộ (đã đảm bảo divisor != 0) | `panic` (vì invariant fail) |

> 💡 **Trực giác phân biệt.**
> - **`error`** = "tôi (function) gặp tình huống bên ngoài KHÔNG đúng, anh (caller) xử lý đi". Ví dụ: file thiếu, network down, input sai.
> - **`panic`** = "có gì đó trong CODE của tôi sai hoàn toàn, không thể tiếp tục". Ví dụ: nil pointer, off-by-one, broken invariant.

### Cú pháp panic

```go
panic("không thể tiếp tục: state không hợp lệ")
panic(fmt.Errorf("invariant phá vỡ: %v", state))
panic(someErr)
```

Panic in stack trace ra stderr rồi terminate process (trừ khi có `recover`).

> ⚠ **KHÔNG dùng panic cho control flow.** Một số người Java/Python sang Go có thói quen "lười check err": `if err != nil { panic(err) }`. **Sai hoàn toàn.** Một file thiếu **không** là bug của bạn — đó là tình huống bình thường mà chương trình phải xử lý.

---

## 9. `recover` — bắt panic trong defer

`recover()` chỉ hoạt động bên trong **deferred function**. Khi panic, runtime unwind stack ngược; nếu gặp `defer` có `recover()` thì panic dừng lại tại đó.

```go
func safeCall() (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic được recover: %v", r)
        }
    }()
    var p *int
    fmt.Println(*p) // nil deref → panic
    return nil
}

// caller:
err := safeCall()
fmt.Println(err) // panic được recover: runtime error: invalid memory address or nil pointer dereference
```

### Use case duy nhất nên dùng `recover`

**HTTP middleware** trong server: 1 request bug ra panic — không nên crash cả process. Recover, log, trả 500.

```go
func RecoverMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("panic recovered: %v\nstack:\n%s", rec, debug.Stack())
                http.Error(w, "internal server error", 500)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
```

> ❓ **Câu hỏi tự nhiên: "Tại sao không recover khắp nơi cho an toàn?"**
>
> Vì recover **giấu bug**. Nếu nil pointer xảy ra ở 1 service, bạn muốn biết để fix; nếu cứ recover âm thầm, bug đó sống mãi. Recover chỉ ở **biên** (HTTP handler, worker goroutine ngoài cùng) để 1 request hỏng không ảnh hưởng 999 request khác — nhưng PHẢI log.

> ⚠ **Lỗi thường gặp.**
> - `recover()` **ngoài** defer → luôn trả nil, panic vẫn lan.
> - `recover()` trong **defer của defer** (gọi gián tiếp) → không bắt được. Phải gọi trực tiếp trong deferred func.
> - Recover xong rồi `panic(r)` lại → cũng được nhưng phải có lý do (chuyển thành error có context khác).

---

## 10. `defer` + error — pattern `Close()` an toàn

Đoạn code tưởng-vô-hại sau **âm thầm nuốt lỗi**:

```go
func WriteFile(path string, data []byte) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close() // ← nếu Close trả lỗi (disk full lúc flush), bị NUỐT
    _, err = f.Write(data)
    return err
}
```

Vấn đề: `f.Close()` có thể trả lỗi (vd disk full khi flush buffer cuối), nhưng `defer f.Close()` bỏ qua return value.

**Pattern đúng** dùng named return:

```go
func WriteFile(path string, data []byte) (err error) {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer func() {
        if cerr := f.Close(); err == nil {
            err = cerr // chỉ ghi đè khi err đang nil (không nuốt lỗi Write)
        }
    }()
    _, err = f.Write(data)
    return
}
```

Giải thích:
- `(err error)` ở signature = **named return**. Trong body, biến `err` là biến cục bộ mà `return` dùng để trả về.
- `defer func()` được gọi sau khi `return` set `err`. Nếu Write thành công (`err == nil`) và Close fail → ghi err = cerr. Nếu Write đã fail → giữ err cũ, không overwrite (vì lỗi gốc quan trọng hơn).

### Walk-through 3 case

| Write | Close | err sau defer | Tại sao |
|---|---|---|---|
| OK | OK | `nil` | cả 2 ok |
| OK | fail (cerr="flush err") | `"flush err"` | err đang nil, lấy cerr |
| fail ("disk write fail") | fail (cerr="flush err") | `"disk write fail"` | err đã có, giữ nguyên (lỗi gốc quan trọng) |

> ❓ **Câu hỏi tự nhiên: "Có thể wrap cả 2 lỗi không?"**
>
> Có, với `errors.Join`:
>
> ```go
> defer func() {
>     if cerr := f.Close(); cerr != nil {
>         err = errors.Join(err, cerr)
>     }
> }()
> ```
>
> Lúc đó cả write-err và close-err đều được giữ.

---

## 11. Patterns đáng nhớ

### 11.1 Wrap với context có ý nghĩa

Wrap phải **thêm thông tin caller chưa biết**. Bad:

```go
return fmt.Errorf("error: %w", err) // vô dụng — "error" không thêm gì
```

Good:

```go
return fmt.Errorf("xoá user %d trong tx %s: %w", userID, txID, err)
```

Khi log toàn chain, devops thấy ngay: "lỗi xoá user 42 trong tx abc-123: db: connection refused".

### 11.2 Check sentinel bằng `errors.Is`

```go
_, err := repo.GetUser(id)
switch {
case errors.Is(err, ErrNotFound):
    return c.JSON(404, "not found")
case errors.Is(err, ErrUnauthorized):
    return c.JSON(401, "unauthorized")
case err != nil:
    return c.JSON(500, "internal error")
}
```

### 11.3 Type-based extract bằng `errors.As`

```go
var vErr *ValidationError
if errors.As(err, &vErr) {
    return c.JSON(400, map[string]string{
        "field":   vErr.Field,
        "message": vErr.Msg,
    })
}
```

---

## 12. Anti-patterns — đừng làm

### 12.1 Biến error thành panic

```go
data, err := os.ReadFile(path)
if err != nil {
    panic(err) // ← SAI: file không tồn tại không phải bug
}
```

Đúng:

```go
if err != nil {
    return nil, fmt.Errorf("đọc %s: %w", path, err)
}
```

### 12.2 Ignore error

```go
data, _ := os.ReadFile("config.json") // ← bug ẩn: nếu file thiếu, data = nil
json.Unmarshal(data, &cfg)            // panic ngay sau đó
```

Đúng: luôn check err. Nếu thật sự muốn ignore (test code), comment lý do.

### 12.3 Wrap nhiều lần cùng nội dung

```go
err := getX()                            // "x not found"
err = fmt.Errorf("x not found: %w", err) // "x not found: x not found"
err = fmt.Errorf("x not found: %w", err) // "x not found: x not found: x not found"
```

Wrap chỉ thêm context **chưa có**, không lặp lại.

### 12.4 So sánh `err.Error() == "some string"`

```go
if err.Error() == "not found" { ... } // ← SAI: fragile, message có thể đổi
```

Đúng: dùng sentinel + `errors.Is`.

---

## 13. Stack trace — không có sẵn

Go error mặc định **không** chứa stack trace. `err.Error()` chỉ là chuỗi mô tả. Lý do thiết kế: stack trace tốn allocation và 99% case không cần.

Khi cần stack trace:

**Cách 1 — package `github.com/pkg/errors` (third-party, deprecated nhưng phổ biến)**:

```go
err := errors.WithStack(err) // attach stack
fmt.Printf("%+v", err)       // print kèm stack
```

**Cách 2 — `runtime/debug.Stack()` (stdlib, Go ≥ 1.21)**:

```go
import "runtime/debug"

defer func() {
    if r := recover(); r != nil {
        log.Printf("panic: %v\nstack:\n%s", r, debug.Stack())
    }
}()
```

**Cách 3 — tự nhúng stack trong custom error type** (advanced).

> 💡 **Trực giác.** Wrap chain (`%w`) là "stack trace nhân tạo" theo cách Go: thay vì runtime tự capture, **bạn tự viết** context ở mỗi tầng. Đánh đổi: tốn type-thời-gian, nhưng output gọn và meaningful hơn stack trace runtime.

---

## 14. Sentinel error trong stdlib bạn sẽ gặp hàng ngày

| Sentinel | Package | Khi gặp |
|---|---|---|
| `io.EOF` | `io` | đọc hết stream — không phải "lỗi" thực sự, là "kết thúc dữ liệu" |
| `sql.ErrNoRows` | `database/sql` | `QueryRow.Scan` không có hàng |
| `os.ErrNotExist` | `os`/`io/fs` | path không tồn tại |
| `os.ErrExist` | `os` | tạo file mà đã có |
| `os.ErrPermission` | `os` | thiếu quyền |
| `context.Canceled` | `context` | context được Cancel |
| `context.DeadlineExceeded` | `context` | context hết hạn (timeout) |
| `net.ErrClosed` | `net` | socket đã đóng |
| `http.ErrServerClosed` | `net/http` | server.Shutdown chạy xong |

Cách dùng: luôn `errors.Is(err, sql.ErrNoRows)` (không `err == sql.ErrNoRows` — driver có thể wrap).

---

## 15. Ứng dụng thực tế trong phần mềm

> 💡 **Error handling của Go (`if err != nil`) bị chê dài dòng, nhưng nó ép xử lý lỗi tường minh — và `wrap + errors.Is/As` là cách production phân loại lỗi.**

| Pattern | Dùng thật ở đâu |
|---------|-----------------|
| **Wrap với `%w`** | `fmt.Errorf("query user %d: %w", id, err)` — thêm ngữ cảnh, giữ lỗi gốc |
| **`errors.Is(err, ErrNotFound)`** | Phân biệt "không tìm thấy" (404) vs lỗi DB thật (500) |
| **`errors.As(err, &target)`** | Lấy lỗi cụ thể (vd `*pq.Error`) để xử lý theo loại |
| **Sentinel error** | `var ErrNotFound = errors.New(...)` — so khớp ở tầng trên |
| **Error → HTTP status** | Map loại lỗi sang 400/404/409/500 ở handler |

### 15.1. Ví dụ cụ thể — wrap để truy vết, Is/As để phân loại

```go
// tầng repo
if err := db.QueryRow(...).Scan(&u); err != nil {
    return fmt.Errorf("get user %d: %w", id, err) // wrap thêm ngữ cảnh
}
// tầng handler
err := svc.GetUser(id)
if errors.Is(err, sql.ErrNoRows) {
    http.Error(w, "not found", 404)  // phân biệt rõ
} else if err != nil {
    http.Error(w, "internal", 500)
}
```

`%w` giữ chuỗi lỗi gốc để `errors.Is` xuyên qua nhiều tầng wrap. Đây là cách backend Go map lỗi → HTTP status đúng, kèm thông điệp truy vết ("get user 42: sql: no rows") cho log.

> ⚠ **Bẫy — `err == sql.ErrNoRows` hỏng khi lỗi bị wrap.** Driver/tầng giữa có thể wrap lỗi → so sánh `==` trực tiếp fail. Luôn `errors.Is(err, sql.ErrNoRows)` (đi xuyên wrap). Và **đừng panic cho lỗi thường** — panic chỉ cho lỗi lập trình không thể tiếp tục; lỗi nghiệp vụ (input sai, không tìm thấy) trả error.

### 15.2. 📝 Tóm tắt mục 15

- Wrap lỗi với `%w` (thêm ngữ cảnh, giữ gốc) + **`errors.Is/As`** (phân loại xuyên wrap) → map lỗi sang HTTP status.
- Sentinel error (`ErrNotFound`) để tầng trên so khớp; dùng `errors.Is`, không `==` (wrap làm fail).
- Panic chỉ cho lỗi lập trình; lỗi nghiệp vụ luôn trả `error`.

## Bài tập

### BT1. Sentinel + Validate

Định nghĩa `ErrInvalidEmail` sentinel. Viết hàm `ValidateEmail(s string) error` trả `ErrInvalidEmail` khi email không có `@` hoặc trống. Trong `main`, gọi với 3 input: `""`, `"abc"`, `"a@b.c"` và check bằng `errors.Is`.

### BT2. Custom error type

Tạo type `ValidationError{Field, Msg string}` implement `Error()`. Viết hàm `ValidateUser(u User) error` trả `*ValidationError` đầu tiên khi gặp. Caller dùng `errors.As` để in tên field bị lỗi.

### BT3. Wrap chain xuyên 3 tầng

Tầng `Storage.Find(id)` trả `sql.ErrNoRows`. Tầng `Repository.GetUser(id)` wrap thêm `"repo getuser %d: %w"`. Tầng `Service.LoadProfile(id)` wrap tiếp `"service load profile %d: %w"`. Trong `main`, gọi `Service.LoadProfile(0)` và check `errors.Is(err, sql.ErrNoRows)` phải trả `true`. In luôn message đầy đủ.

### BT4. HTTP middleware recover

Viết hàm `RecoverMiddleware(next http.HandlerFunc) http.HandlerFunc` bắt panic, log error, trả 500. Demo: handler `func(w, r) { panic("boom") }` gói qua middleware. Gọi `http.HandlerFunc.ServeHTTP` thấy response 500 (mock `httptest.NewRecorder`).

### BT5. Predict output

Cho 4 đoạn code dưới, đoán giá trị `errors.Is(err, target)`:

```go
// A
err := io.EOF
errors.Is(err, io.EOF)

// B
err := fmt.Errorf("read: %v", io.EOF)
errors.Is(err, io.EOF)

// C
err := fmt.Errorf("read: %w", io.EOF)
errors.Is(err, io.EOF)

// D
err := errors.Join(io.EOF, sql.ErrNoRows)
errors.Is(err, sql.ErrNoRows)
```

### BT6. defer Close không nuốt lỗi

Viết hàm `WriteJSON(path string, v any) (err error)` mở file, ghi `json.Marshal(v)`, dùng named return + defer Close đúng pattern. Test 2 case: write OK + close OK; write OK + close fail (mô phỏng bằng wrapper closer trả lỗi).

---

## Lời giải chi tiết

### Giải BT1

**Cách tiếp cận**: 1 biến package-level `ErrInvalidEmail`. Hàm check 2 điều kiện rồi return sentinel.

```go
var ErrInvalidEmail = errors.New("email không hợp lệ")

func ValidateEmail(s string) error {
    if s == "" || !strings.Contains(s, "@") {
        return ErrInvalidEmail
    }
    return nil
}
```

Caller:

```go
for _, in := range []string{"", "abc", "a@b.c"} {
    err := ValidateEmail(in)
    fmt.Printf("ValidateEmail(%q) → ", in)
    switch {
    case errors.Is(err, ErrInvalidEmail):
        fmt.Println("invalid")
    case err == nil:
        fmt.Println("OK")
    }
}
```

Output:

```text
ValidateEmail("") → invalid
ValidateEmail("abc") → invalid
ValidateEmail("a@b.c") → OK
```

Độ phức tạp: $O(n)$ với n là độ dài chuỗi (cho `Contains`).

### Giải BT2

```go
type ValidationError struct {
    Field string
    Msg   string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("trường %q: %s", e.Field, e.Msg)
}

type User struct {
    Name  string
    Email string
    Age   int
}

func ValidateUser(u User) error {
    if u.Name == "" {
        return &ValidationError{Field: "Name", Msg: "rỗng"}
    }
    if !strings.Contains(u.Email, "@") {
        return &ValidationError{Field: "Email", Msg: "thiếu @"}
    }
    if u.Age < 0 {
        return &ValidationError{Field: "Age", Msg: "âm"}
    }
    return nil
}
```

Caller:

```go
err := ValidateUser(User{Name: "An", Email: "abc", Age: 20})
var vErr *ValidationError
if errors.As(err, &vErr) {
    fmt.Printf("Lỗi field %s: %s\n", vErr.Field, vErr.Msg)
}
```

Output: `Lỗi field Email: thiếu @`.

### Giải BT3

```go
// Tầng Storage
func Find(id int) (User, error) {
    if id == 0 {
        return User{}, sql.ErrNoRows
    }
    return User{Name: "An"}, nil
}

// Tầng Repository
func GetUser(id int) (User, error) {
    u, err := Find(id)
    if err != nil {
        return User{}, fmt.Errorf("repo getuser %d: %w", id, err)
    }
    return u, nil
}

// Tầng Service
func LoadProfile(id int) (User, error) {
    u, err := GetUser(id)
    if err != nil {
        return User{}, fmt.Errorf("service load profile %d: %w", id, err)
    }
    return u, nil
}

// main
_, err := LoadProfile(0)
fmt.Println("err:", err)
fmt.Println("Is sql.ErrNoRows:", errors.Is(err, sql.ErrNoRows))
```

Output:

```text
err: service load profile 0: repo getuser 0: sql: no rows in result set
Is sql.ErrNoRows: true
```

Walk-through `errors.Is`: bắt từ service-err → unwrap thành repo-err → unwrap thành sql.ErrNoRows → match.

### Giải BT4

```go
func RecoverMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("panic recovered: %v", rec)
                http.Error(w, "internal server error", http.StatusInternalServerError)
            }
        }()
        next(w, r)
    }
}

// Test
boom := func(w http.ResponseWriter, r *http.Request) { panic("boom") }
wrapped := RecoverMiddleware(boom)

rec := httptest.NewRecorder()
req := httptest.NewRequest("GET", "/", nil)
wrapped(rec, req)

fmt.Println("status:", rec.Code) // 500
```

Bước-by-bước khi panic xảy ra:
1. `boom` panic("boom").
2. Runtime bắt đầu unwind, gặp `defer` trong middleware.
3. `recover()` bắt giá trị `"boom"`, trả non-nil.
4. Log + `http.Error` ghi 500 vào response writer.
5. Middleware return bình thường, request không crash server.

### Giải BT5

| Case | Code | Output | Giải thích |
|---|---|---|---|
| A | `err == io.EOF`, `errors.Is(err, io.EOF)` | `true` | err chính là sentinel |
| B | `%v io.EOF`, `errors.Is(err, io.EOF)` | `false` | `%v` không wrap |
| C | `%w io.EOF`, `errors.Is(err, io.EOF)` | `true` | `%w` wrap, Unwrap đi tới EOF |
| D | `errors.Join(io.EOF, sql.ErrNoRows)`, `errors.Is(err, sql.ErrNoRows)` | `true` | Join tạo tree, `Is` check tất cả nhánh |

### Giải BT6

```go
type failClose struct {
    *os.File
    failOnClose bool
}

func (f *failClose) Close() error {
    if f.failOnClose {
        return errors.New("flush err mô phỏng")
    }
    return f.File.Close()
}

func WriteJSON(path string, v any, failClosing bool) (err error) {
    raw, err := os.Create(path)
    if err != nil {
        return fmt.Errorf("create %s: %w", path, err)
    }
    f := &failClose{File: raw, failOnClose: failClosing}
    defer func() {
        if cerr := f.Close(); err == nil {
            err = cerr
        }
    }()
    data, err := json.Marshal(v)
    if err != nil {
        return fmt.Errorf("marshal: %w", err)
    }
    if _, err = f.Write(data); err != nil {
        return fmt.Errorf("write: %w", err)
    }
    return
}

// Test
_ = WriteJSON("/tmp/ok.json", map[string]int{"a": 1}, false)   // nil
err := WriteJSON("/tmp/fail.json", map[string]int{"a": 1}, true) // close err được trả
fmt.Println(err) // flush err mô phỏng
```

Bước-by-bước case 2:
1. `os.Create` OK → raw file mở.
2. Wrap `failClose` để mô phỏng close fail.
3. `json.Marshal` OK, `f.Write` OK → `err = nil`.
4. Return chạm trigger defer.
5. Defer gọi `f.Close()` → trả `"flush err mô phỏng"`.
6. err đang nil → ghi err = cerr.
7. Hàm trả err = `"flush err mô phỏng"`.

Nếu Write fail trước thì err đã non-nil → defer giữ nguyên err Write, không nuốt bằng cerr.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — Toàn bộ code các pattern + bài tập.
- [visualization.html](./visualization.html) — 3 module: Error vs Exception, Wrap Chain Inspector, Panic/Recover Demo.

Chạy code:

```bash
cd Programming/lesson-19-errors
go run solutions.go
```

---

## Bài tiếp theo

- [Lesson 20 — Package & Module](../lesson-20-package-module/): tổ chức code Go, `go.mod`, import path, public/private.

## Tham khảo

- [Go blog — Error handling and Go (2011)](https://go.dev/blog/error-handling-and-go)
- [Go blog — Working with errors in Go 1.13](https://go.dev/blog/go1.13-errors)
- [Effective Go — Errors](https://go.dev/doc/effective_go#errors)
- [Russ Cox — Errors are values (2015)](https://go.dev/blog/errors-are-values)
