// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-45-request-validation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 45 — Request Validation (Kiểm tra dữ liệu vào)

> **Tier 4 — Web & Backend (Go).** Sau khi đã có routing (L44), bài này tập trung vào **rào chắn đầu tiên** của mọi HTTP handler: validation. Nếu validation thủng, mọi tầng phía sau (business logic, DB, cache) đều có nguy cơ bị đầu độc — từ bug logic vô hại tới SQL injection, XSS, mass assignment.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được **3 tầng validate**: syntactic, semantic, cross-field.
- Viết được struct validation với \`go-playground/validator\` (tag-based, idiomatic Go).
- Tự định nghĩa **custom validator** (vd phone number Việt Nam).
- Format error theo **RFC 7807 Problem Details** — chuẩn industry-level cho HTTP error.
- Tích hợp validation thành **middleware reusable** dùng được cho mọi handler.
- Tránh các pitfall phổ biến: trust client input, validate chỉ ở UI, expose internal field name qua error message, dùng reflection trong hot path mà không cache.

## Kiến thức tiền đề

- [Lesson 23 — JSON encoding/decoding](../lesson-23-json-encoding/) (tag, struct, \`encoding/json\`).
- [Lesson 24 — Regex & text processing](../lesson-24-regex-text-processing/) (regex cho custom validator).
- [Lesson 31 — Reflect](../lesson-31-reflect/) (hiểu vì sao tag validation hoạt động được).
- [Lesson 42 — \`net/http\` deep](../lesson-42-http-net-deep/) (request body, decode).
- [Lesson 43 — REST API design](../lesson-43-rest-api-design/) (HTTP status code 400 vs 422).
- [Lesson 44 — Routing frameworks](../lesson-44-routing-frameworks/) (middleware, handler signature).

---

## 1. Vì sao validate input?

> **💡 Trực giác**: hãy hình dung handler HTTP của bạn là một **bếp ăn**. Input là nguyên liệu khách đem tới. Không kiểm tra nguyên liệu → khách đưa thịt ôi, bột hết hạn, hoặc thậm chí **chất nổ giả dạng cà chua** → bếp tan tành. Validation là khâu **kiểm tra hàng** ở cổng kho, trước khi nguyên liệu chạm tay đầu bếp.

### 1.1 Input không validate = bug + lỗ hổng bảo mật

| Tình huống | Hậu quả thực tế |
|------------|-----------------|
| \`age int\` không check → user gửi \`-7\` | DB lưu age âm → query thống kê sai → BI dashboard hiển thị "trung bình tuổi = 3.4". |
| \`email string\` không check format | User đăng ký với \`email = "<script>alert(1)</script>"\` → admin panel render → **XSS** (Stored XSS, chiếm cookie admin). |
| \`username string\` không check length / charset | User gửi \`username = "'; DROP TABLE users; --"\` → nếu một query chỗ nào xài string concat thay vì parameterized → **SQL injection**. |
| \`quantity int\` không check max | User gửi \`quantity = 999_999_999\` → server alloc array khổng lồ → **DoS** (out of memory). |
| \`role string\` không check enum | User gửi \`role = "admin"\` trong request \`/signup\` → **mass assignment**, escalate privilege. |
| \`start_date, end_date\` không check cross-field | User gửi \`end < start\` → query DB \`BETWEEN end AND start\` trả 0 dòng → flow gãy âm thầm. |

> **❓ Câu hỏi tự nhiên**: *"Frontend đã validate rồi mà, cần làm lại ở backend không?"*
>
> **Có. Bắt buộc.** Frontend chỉ là UX (gợi ý đẹp cho user "thật thà"). Attacker dùng \`curl\`, Postman, Burp Suite → bypass frontend trong 3 giây. **Quy tắc vàng: không tin client.** Frontend validate cho UX, backend validate cho an toàn. Hai tầng riêng biệt, đừng gộp.

### 1.2 Ví dụ minh hoạ: thiệt hại thật từ bỏ qua validate

Vào năm 2017, một sàn thương mại điện tử ở Đông Nam Á đã mất ~ **2 triệu USD** chỉ trong 1 đêm vì endpoint \`POST /coupons/apply\` không validate \`discount_percent\` nằm trong \`[0, 100]\`. User gửi \`discount_percent = 200\` → giá thanh toán âm → hệ thống thanh toán cấp tiền cho user thay vì thu tiền. Lỗi chỉ cần **1 dòng \`if pct < 0 || pct > 100\` là chặn được**.

> **⚠ Lỗi thường gặp**: *"Tôi tin team mình code cẩn thận, không cần lib validate."* — Một tháng sau, một dev mới được tuyển vào, thêm handler \`/admin/transfer-money\` quên validate \`amount > 0\`. Validate phải là **policy của hệ thống**, không phải kỷ luật cá nhân.

### 📝 Tóm tắt mục 1

- Input không validate → bug logic + lỗ hổng bảo mật (XSS, SQLi, DoS, mass assignment, privilege escalation).
- Frontend validate ≠ backend validate. **Luôn validate ở backend**, dù frontend đã làm.
- 1 dòng validate có thể chặn thiệt hại hàng triệu USD — investment cực rẻ, ROI cực cao.

---

## 2. Ba tầng validate

Không phải mọi quy tắc validate đều giống nhau. Phân loại giúp ta **biết viết quy tắc nào ở đâu**.

### 2.1 Syntactic validation — kiểu & format

Kiểm tra **dữ liệu có đúng "hình dạng"** không. Không cần biết business của ứng dụng, chỉ cần biết kiểu dữ liệu.

- \`age\` phải là số nguyên → JSON \`"age": "abc"\` ❌.
- \`email\` phải khớp regex email → \`"foo@"\` ❌.
- \`url\` phải parse được bằng \`net/url\` → \`"htp:/x"\` ❌.
- \`uuid\` phải đúng định dạng \`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`.
- \`phone\` phải gồm chỉ chữ số và dấu \`+\`.

> **💡 Trực giác**: syntactic = "đây có giống một email không?", không quan tâm email này có tồn tại không.

### 2.2 Semantic validation — business rule

Kiểm tra **giá trị có hợp lệ với ngữ cảnh nghiệp vụ** không.

- \`age >= 18\` cho đăng ký rượu/cờ bạc.
- \`role ∈ {admin, user, guest}\` (enum).
- \`quantity <= stock\` (so với DB).
- \`coupon_code\` phải còn hạn (so với current time).
- \`payment_amount <= account_balance\`.

> **💡 Trực giác**: semantic = "email này có hợp lý cho domain công ty không?", "user này có quyền làm hành động này không?".

### 2.3 Cross-field validation — quan hệ giữa các trường

Kiểm tra **mối quan hệ** giữa nhiều field trong cùng một request.

- \`end_date > start_date\`.
- \`password == confirm_password\`.
- Nếu \`payment_method = "credit_card"\` thì \`card_number\` bắt buộc.
- \`min_price <= max_price\` trong filter range.

> **❓ Câu hỏi tự nhiên**: *"Tầng nào quan trọng nhất?"*
>
> **Cả ba đều bắt buộc**, nhưng thứ tự thực hiện nên là: syntactic → semantic → cross-field. Lý do: nếu một field syntactic sai (vd \`age = "abc"\`), kiểm tra semantic (\`age >= 18\`) sẽ panic/bug. Lib \`go-playground/validator\` đã làm đúng thứ tự này automatically.

### 📝 Tóm tắt mục 2

- **Syntactic**: hình dạng (type, format) — \`email\`, \`uuid\`, \`url\`, \`numeric\`.
- **Semantic**: nghiệp vụ — \`oneof\`, \`min\`, \`max\`, custom rule.
- **Cross-field**: quan hệ — \`gtfield\`, \`eqfield\`, \`nefield\`.
- Thứ tự kiểm tra: Syntactic → Semantic → Cross-field.

---

## 3. Manual validation — viết tay if/else

Trước khi nói tới lib, hãy xem manual validation. Phù hợp cho project nhỏ, hoặc khi muốn kiểm soát hoàn toàn.

\`\`\`go
type CreateUserRequest struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
    Role  string \`json:"role"\`
}

func (r *CreateUserRequest) Validate() error {
    if r.Name == "" {
        return errors.New("name is required")
    }
    if len(r.Name) < 2 || len(r.Name) > 50 {
        return errors.New("name length must be 2..50")
    }
    if r.Email == "" {
        return errors.New("email is required")
    }
    if !emailRegex.MatchString(r.Email) {
        return errors.New("email format invalid")
    }
    if r.Age < 18 || r.Age > 120 {
        return errors.New("age must be 18..120")
    }
    switch r.Role {
    case "admin", "user", "guest":
        // OK
    default:
        return errors.New("role must be one of admin/user/guest")
    }
    return nil
}
\`\`\`

> **💡 Ưu**: rõ ràng, không có "magic" reflection, debug bằng print debug được, không phụ thuộc lib.
>
> **⚠ Nhược**: 
> - Lặp code. 10 endpoint × 8 trường = 80 lần viết if/else.
> - Mỗi \`errors.New\` chỉ trả 1 lỗi đầu tiên — user phải sửa từng cái một, gửi lại request từng lượt → UX tệ.
> - Khó test exhaustively. Quên test một nhánh là quên một bug.
> - Không có format chuẩn cho response (mỗi handler trả string khác nhau).

### 3.1 Manual nhưng "thu hết lỗi"

Cải tiến: thu vào slice thay vì return ngay.

\`\`\`go
type ValidationError struct {
    Field   string \`json:"field"\`
    Message string \`json:"message"\`
}

func (r *CreateUserRequest) Validate() []ValidationError {
    var errs []ValidationError
    if r.Name == "" {
        errs = append(errs, ValidationError{"name", "is required"})
    } else if len(r.Name) < 2 || len(r.Name) > 50 {
        errs = append(errs, ValidationError{"name", "length must be 2..50"})
    }
    // ... tương tự cho các field khác
    return errs
}
\`\`\`

Phiên bản này tốt hơn — báo cho user tất cả lỗi cùng lúc — nhưng vẫn cần lib khi project lớn dần.

> **❓ Câu hỏi tự nhiên**: *"Khi nào nên manual, khi nào nên lib?"*
>
> - ≤ 3 request types, < 5 fields/type → manual OK, đỡ phụ thuộc.
> - ≥ 5 request types, hoặc cần i18n error message → dùng lib. Chi phí setup lib (~ 20 dòng) trả lại rất nhanh.

### 📝 Tóm tắt mục 3

- Manual = \`if/else\` trực tiếp trong method \`Validate()\`.
- Phù hợp: project nhỏ.
- Cải tiến: gom hết lỗi vào slice thay vì return early.
- Project lớn → chuyển sang lib (\`go-playground/validator\`).

---

## 4. Thư viện \`go-playground/validator\`

\`github.com/go-playground/validator/v10\` là **lib validation phổ biến nhất** trong Go ecosystem. Gin, Echo, Fiber đều tích hợp sẵn lib này.

### 4.1 Tag-based — magic ở \`struct tag\`

\`\`\`go
import "github.com/go-playground/validator/v10"

type CreateUserRequest struct {
    Name  string \`json:"name"  validate:"required,min=2,max=50"\`
    Email string \`json:"email" validate:"required,email"\`
    Age   int    \`json:"age"   validate:"required,min=18,max=120"\`
    Role  string \`json:"role"  validate:"required,oneof=admin user guest"\`
}

var v = validator.New() // ⚠ tạo 1 lần, dùng global — KHÔNG tạo trong handler!

func handleCreate(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    json.NewDecoder(r.Body).Decode(&req)
    if err := v.Struct(req); err != nil {
        // err là validator.ValidationErrors
        http.Error(w, formatErr(err), http.StatusUnprocessableEntity)
        return
    }
    // ... business logic
}
\`\`\`

> **💡 Cơ chế bên trong**: lib dùng **reflection** (\`reflect.TypeOf\`, \`reflect.Value.Field\`) để duyệt từng field, đọc tag \`validate:"..."\`, parse các rule (split bởi \`,\`), apply từng rule lên giá trị. Đây là lý do struct phải có **field exported** (chữ cái đầu hoa) — \`reflect\` không truy cập được field unexported.

### 4.2 Vì sao cache validator instance?

\`\`\`go
var v = validator.New()                    // ✓ tốt: tạo 1 lần
// vs.
func handler(...) {
    v := validator.New()                   // ✗ tệ: tạo mỗi request → ~50µs overhead × N RPS
    v.Struct(req)
}
\`\`\`

\`validator.New()\` build internal **cache reflection** (map từ struct type → list of fields + rules). Cache này build lần đầu tốn ~ 50–200µs. Cache **per-instance** → tạo instance mới mỗi request = build lại cache mỗi lần. Trên 10k RPS đây là 0.5–2s CPU bị bốc hơi.

> **⚠ Quy tắc**: validator instance phải là **global singleton** (hoặc inject qua DI), tuyệt đối không tạo trong hot path.

### 📝 Tóm tắt mục 4

- \`validator.New()\` tạo 1 lần, dùng global.
- Tag \`validate:"rule1,rule2,..."\` apply per-field.
- Lib dùng reflection — field phải export.
- Trả về \`validator.ValidationErrors\` (slice các \`FieldError\`) → format ra response.

---

## 5. Built-in validators thường dùng

Lib đi kèm 100+ validator. Đây là tập tối thiểu cần nhớ:

### 5.1 Bảng built-in

| Tag | Ý nghĩa | Ví dụ |
|-----|---------|-------|
| \`required\` | Field bắt buộc (≠ zero value) | \`Name string \`validate:"required"\`\` |
| \`omitempty\` | Bỏ qua nếu rỗng (kết hợp với rule khác) | \`Email string \`validate:"omitempty,email"\`\` |
| \`min=N\` | Số ≥ N, hoặc len(string/slice) ≥ N | \`Age int \`validate:"min=18"\`\` |
| \`max=N\` | Số ≤ N, hoặc len ≤ N | \`Name string \`validate:"max=50"\`\` |
| \`len=N\` | Độ dài chính xác = N | \`Code string \`validate:"len=6"\`\` |
| \`eq=V\` / \`ne=V\` | Bằng / khác giá trị | \`Type string \`validate:"eq=premium"\`\` |
| \`email\` | Format email (RFC 5322) | \`Email string \`validate:"email"\`\` |
| \`url\` | URL parse được | \`Website string \`validate:"url"\`\` |
| \`uri\` | URI parse được (rộng hơn \`url\`) | \`ID string \`validate:"uri"\`\` |
| \`uuid\` | UUID v1/v3/v4/v5 | \`ID string \`validate:"uuid"\`\` |
| \`uuid4\` | UUID v4 strict | \`ID string \`validate:"uuid4"\`\` |
| \`alpha\` | Chỉ chữ cái (Unicode) | \`Country string \`validate:"alpha"\`\` |
| \`alphanum\` | Chữ cái + số | \`Code string \`validate:"alphanum"\`\` |
| \`numeric\` | Số (cho phép âm, thập phân) | \`Score string \`validate:"numeric"\`\` |
| \`oneof=A B C\` | Enum (space-separated) | \`Role string \`validate:"oneof=admin user"\`\` |
| \`gtfield=Other\` | Lớn hơn field \`Other\` | \`End time \`validate:"gtfield=Start"\`\` |
| \`eqfield=Other\` | Bằng field \`Other\` | \`Confirm string \`validate:"eqfield=Password"\`\` |
| \`dive\` | Validate từng phần tử slice/map | \`Items []Item \`validate:"dive"\`\` |
| \`gte=N\` / \`lte=N\` | ≥ / ≤ | \`Pct float \`validate:"gte=0,lte=100"\`\` |
| \`contains=S\` | Chuỗi chứa substring \`S\` | \`Body string \`validate:"contains=foo"\`\` |

### 5.2 Ví dụ phức hợp

\`\`\`go
type Order struct {
    ID       string  \`validate:"required,uuid4"\`
    Email    string  \`validate:"required,email"\`
    Quantity int     \`validate:"required,min=1,max=100"\`
    Discount float64 \`validate:"gte=0,lte=1"\`              // 0..1 = 0%..100%
    Status   string  \`validate:"required,oneof=pending paid shipped"\`
    Items    []Item  \`validate:"required,min=1,max=50,dive"\`
}

type Item struct {
    SKU   string \`validate:"required,alphanum,len=8"\`
    Price int    \`validate:"required,gt=0"\`
}
\`\`\`

Giải thích \`dive\`: nếu không có \`dive\`, lib chỉ check slice (\`min=1,max=50\` áp lên \`len(Items)\`). Có \`dive\`, lib **đi vào từng \`Item\`** và validate theo tag của struct \`Item\`.

> **❓ Câu hỏi tự nhiên**: *"Order chứa \`Items []Item\` thì Items có cần \`validate:"dive"\`? Còn map thì sao?"*
>
> - **Slice**: \`dive\` để validate từng phần tử.
> - **Map**: \`dive\` validate **value**, \`keys ... endkeys\` validate **key**.
>   - \`validate:"dive,keys,alphanum,endkeys,required"\` → key alphanum, value required.
> - Slice of struct → struct tự có tag riêng, \`dive\` "kích hoạt" việc đi vào.

### ⚠ Lỗi thường gặp với built-in

- **\`required\` vs \`omitempty\`**: \`required\` fail nếu là zero value. Field \`int\` mà bạn muốn cho phép 0 → KHÔNG dùng \`required\` (vì \`0\` = zero value của int → fail). Dùng \`*int\` (pointer) + \`required\` thì \`nil\` = thiếu, \`*x = 0\` = "có gửi và bằng 0".
- **\`min=N\` với string**: tính theo \`len(string)\` = byte count, **không phải rune count**. \`"é"\` (UTF-8 = 2 bytes) → \`min=2\` pass dù chỉ 1 ký tự. Cẩn thận với input Unicode.
- **\`oneof\`** dùng dấu **space** ngăn cách, không phải dấu phẩy. \`oneof=admin,user\` SAI → phải là \`oneof=admin user\`.

### 📝 Tóm tắt mục 5

- Built-in 100+, nhớ tối thiểu ~ 20 cái phổ biến.
- \`required\` + \`omitempty\` là cặp bổ trợ — biết khi nào dùng.
- \`dive\` để vào slice/map element. Slice of struct → tag của struct tự apply, \`dive\` chỉ "kích hoạt".
- \`oneof\` separator là space, không phải phẩy.

---

## 6. Custom validator — tự định nghĩa rule

Khi rule không có sẵn (vd "số điện thoại Việt Nam"), bạn tự viết:

\`\`\`go
import (
    "regexp"
    "github.com/go-playground/validator/v10"
)

var vnPhoneRegex = regexp.MustCompile(\`^(\\+84|0)[0-9]{9}$\`)

func validateVNPhone(fl validator.FieldLevel) bool {
    return vnPhoneRegex.MatchString(fl.Field().String())
}

// Đăng ký 1 lần lúc startup
v := validator.New()
v.RegisterValidation("vnphone", validateVNPhone)

// Dùng trong struct
type Contact struct {
    Phone string \`validate:"required,vnphone"\`
}
\`\`\`

### 6.1 Custom validator có tham số

\`\`\`go
// Tag dạng "lenmod=3" → check len mod 3 == 0
func validateLenMod(fl validator.FieldLevel) bool {
    mod, err := strconv.Atoi(fl.Param())   // "3"
    if err != nil || mod == 0 {
        return false
    }
    return len(fl.Field().String())%mod == 0
}

v.RegisterValidation("lenmod", validateLenMod)

type X struct {
    Code string \`validate:"lenmod=4"\` // len phải chia hết 4
}
\`\`\`

### 6.2 Custom validator dùng context — gọi DB

Đôi khi cần check DB (vd "email chưa tồn tại"). Dùng \`RegisterValidationCtx\`:

\`\`\`go
func uniqueEmail(ctx context.Context, fl validator.FieldLevel) bool {
    db := ctx.Value("db").(*sql.DB)
    var n int
    db.QueryRowContext(ctx, "SELECT COUNT(*) FROM users WHERE email=$1",
        fl.Field().String()).Scan(&n)
    return n == 0
}

v.RegisterValidationCtx("unique_email", uniqueEmail)
v.StructCtx(ctx, req) // gọi với context
\`\`\`

> **⚠ Cẩn thận**: validator gọi DB ⇒ validation step bị chậm + có side effect. Trong nhiều dự án, người ta tách ra: validator chỉ check format, business logic check DB riêng (vd \`service.CheckEmailAvailable\`). Vẽ ranh giới rõ ràng, đừng nhồi tất cả vào tag.

### 📝 Tóm tắt mục 6

- \`RegisterValidation("name", fn)\` cho rule sync, không cần context.
- \`RegisterValidationCtx\` cho rule cần DB/external.
- \`fl.Field()\` = \`reflect.Value\` của field. \`fl.Param()\` = phần sau \`=\` của tag.
- Custom validator gọi DB → cân nhắc design (nên tách validation và business check).

---

## 7. Cross-field validation

Lib có sẵn các operator so sánh field:

| Tag | Ý nghĩa |
|-----|---------|
| \`eqfield=Other\` | Bằng field \`Other\` |
| \`nefield=Other\` | Khác field \`Other\` |
| \`gtfield=Other\` | \`>\` field \`Other\` |
| \`gtefield=Other\` | \`≥\` field \`Other\` |
| \`ltfield=Other\` | \`<\` field \`Other\` |
| \`ltefield=Other\` | \`≤\` field \`Other\` |

### 7.1 Ví dụ: date range

\`\`\`go
type DateRange struct {
    Start time.Time \`validate:"required"\`
    End   time.Time \`validate:"required,gtfield=Start"\`
}

dr := DateRange{
    Start: time.Date(2026, 1, 10, 0, 0, 0, 0, time.UTC),
    End:   time.Date(2026, 1, 5, 0, 0, 0, 0, time.UTC), // < Start ⇒ fail
}
err := v.Struct(dr)
// err: Key: 'DateRange.End' Error:Field validation for 'End' failed on the 'gtfield' tag
\`\`\`

### 7.2 Ví dụ: confirm password

\`\`\`go
type Signup struct {
    Password        string \`validate:"required,min=8"\`
    ConfirmPassword string \`validate:"required,eqfield=Password"\`
}
\`\`\`

> **❓ Câu hỏi tự nhiên**: *"Cross-field có hỗ trợ nested struct không, vd \`User.Address.Zip\` so với \`User.Zip\`?"*
>
> **Có**, dùng \`eqcsfield\` (cross-struct). Vd: \`validate:"eqcsfield=Address.Zip"\`. Phức tạp hơn, ít gặp, nhưng có.

### 📝 Tóm tắt mục 7

- \`gtfield\`, \`ltfield\`, \`eqfield\`, \`nefield\` cho so sánh **trong cùng struct**.
- \`eqcsfield\` cho nested struct.
- Cross-field validation chạy **sau** khi từng field pass syntactic — nên thứ tự tag không ảnh hưởng.

---

## 8. Slice & Map validation — \`dive\`

\`\`\`go
type Bulk struct {
    Emails []string \`validate:"required,min=1,max=100,dive,required,email"\`
}
\`\`\`

Phân tích từng phần:

- \`required\` → slice không nil.
- \`min=1,max=100\` → 1 ≤ \`len(Emails)\` ≤ 100.
- \`dive\` → "đi vào từng phần tử".
- \`required,email\` → mỗi phần tử phải tồn tại + format email.

### 8.1 Map có key validation

\`\`\`go
type Cfg struct {
    Limits map[string]int \`validate:"required,dive,keys,alphanum,endkeys,gte=0,lte=1000"\`
}
\`\`\`

- Trước \`dive\`: rule cho map (required).
- Sau \`dive\`: rule cho **value** (gte=0,lte=1000).
- Trong \`keys ... endkeys\`: rule cho **key** (alphanum).

> **💡 Hình dung**: \`dive\` giống dấu \`{\` mở scope mới. \`keys...endkeys\` là sub-scope cho map key.

### 8.2 Nested slice

\`\`\`go
type Grid struct {
    Cells [][]int \`validate:"required,dive,dive,min=0,max=9"\`
}
\`\`\`

\`dive,dive\` = đi vào 2 lớp. Mỗi \`int\` phải 0..9 (giống sudoku).

### 📝 Tóm tắt mục 8

- \`dive\` mở scope vào element.
- Slice/map của primitive → rule sau \`dive\` áp lên primitive.
- Slice/map của struct → rule trong struct tự apply (tag riêng), \`dive\` chỉ "trigger".
- Map có \`keys...endkeys\` cho key.

---

## 9. Error formatting — chuyển \`ValidationErrors\` thành response

\`validator.Struct(s)\` trả \`error\` interface, nhưng underlying là \`validator.ValidationErrors\` (slice các \`FieldError\`).

\`\`\`go
err := v.Struct(req)
if err == nil {
    return // OK
}
verrs, ok := err.(validator.ValidationErrors)
if !ok {
    // err loại khác (vd InvalidValidationError nếu input không phải struct)
    return
}
for _, fe := range verrs {
    fmt.Println(fe.Field(), fe.Tag(), fe.Param(), fe.Value())
    // Email   email   ""   "not-an-email"
}
\`\`\`

### 9.1 Format thành map field → message

\`\`\`go
func formatErrors(err error) map[string]string {
    out := map[string]string{}
    verrs, ok := err.(validator.ValidationErrors)
    if !ok {
        return out
    }
    for _, e := range verrs {
        out[e.Field()] = translate(e)
    }
    return out
}

func translate(e validator.FieldError) string {
    switch e.Tag() {
    case "required":
        return "trường bắt buộc"
    case "email":
        return "phải là email hợp lệ"
    case "min":
        return fmt.Sprintf("tối thiểu %s ký tự/giá trị", e.Param())
    case "max":
        return fmt.Sprintf("tối đa %s ký tự/giá trị", e.Param())
    case "oneof":
        return fmt.Sprintf("phải là một trong: %s", e.Param())
    case "gtfield":
        return fmt.Sprintf("phải lớn hơn %s", e.Param())
    case "vnphone":
        return "phải là số điện thoại VN hợp lệ"
    default:
        return e.Tag() + " (" + e.Param() + ")"
    }
}
\`\`\`

### 9.2 \`Field()\` vs \`StructField()\` vs \`Namespace()\`

\`\`\`go
type Req struct {
    User struct {
        Email string \`json:"email" validate:"email"\`
    } \`json:"user"\`
}
\`\`\`

Khi \`user.email\` fail:

| Method | Trả về |
|--------|--------|
| \`e.Field()\` | \`"Email"\` — tên field cuối cùng |
| \`e.StructField()\` | \`"Email"\` — tên struct field cuối |
| \`e.Namespace()\` | \`"Req.User.Email"\` — full path bao gồm root struct |
| \`e.StructNamespace()\` | \`"Req.User.Email"\` — như namespace nhưng dùng struct field name |

> **⚠ Pitfall**: Default \`e.Field()\` trả tên **Go field**, không phải tên **JSON field**. User gửi \`{"email": "x"}\` mà nhận error "Email is required" → confusing. Fix:

\`\`\`go
v.RegisterTagNameFunc(func(fld reflect.StructField) string {
    name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
    if name == "-" {
        return ""
    }
    return name
})
\`\`\`

Sau khi gọi \`RegisterTagNameFunc\`, \`e.Field()\` sẽ trả \`"email"\` thay vì \`"Email"\`. Đây là **must-have**.

### 📝 Tóm tắt mục 9

- Type-assert \`err.(validator.ValidationErrors)\` để lấy chi tiết.
- \`FieldError\` có \`Field()\`, \`Tag()\`, \`Param()\`, \`Value()\`, \`Namespace()\`.
- **Luôn gọi \`RegisterTagNameFunc\`** để \`Field()\` trả JSON name, không phải Go name.
- Translate tag → message tiếng người (có thể i18n).

---

## 10. RFC 7807 — Problem Details for HTTP APIs

RFC 7807 là chuẩn IETF cho **error response format** trong HTTP API. Trước RFC 7807, mỗi team tự nghĩ format → client hỗn loạn. Sau RFC 7807, có format thống nhất.

### 10.1 Cấu trúc chuẩn

\`\`\`json
{
  "type":     "https://example.com/probs/validation",
  "title":    "Validation Failed",
  "status":   422,
  "detail":   "Một hoặc nhiều trường không hợp lệ",
  "instance": "/users/42/orders",
  "errors": [
    { "field": "email", "message": "phải là email hợp lệ" },
    { "field": "age",   "message": "tối thiểu 18" }
  ]
}
\`\`\`

| Field | Bắt buộc? | Ý nghĩa |
|-------|-----------|---------|
| \`type\` | ⚠ khuyến nghị | URI định danh **loại** lỗi (không phải URL phải mở được, chỉ là ID) |
| \`title\` | ⚠ khuyến nghị | Tiêu đề ngắn, human-readable, không thay đổi giữa các instance |
| \`status\` | ✓ phải có | HTTP status code, lặp lại trong body để debug không cần header |
| \`detail\` | tùy chọn | Mô tả cụ thể tại instance này |
| \`instance\` | tùy chọn | URI của resource gây lỗi |
| \`errors\` | tùy chọn (extension) | Mảng chi tiết per-field — RFC 7807 cho phép extend |

### 10.2 Content-Type bắt buộc

\`\`\`
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json
\`\`\`

\`application/problem+json\` (không phải \`application/json\`) — báo cho client biết "đây là error theo RFC 7807" → SDK/client lib có thể auto-parse.

### 10.3 Status code: 400 vs 422

- **400 Bad Request**: request **không parse được** (JSON malformed, không đúng schema cơ bản). Vd: body không phải JSON, hoặc field type sai (\`"age": "abc"\`).
- **422 Unprocessable Entity**: request parse được nhưng **violate business rule** (age = -5, role = "superadmin"). Đây là trường hợp validation fail chính.

> **❓ Câu hỏi tự nhiên**: *"Sao không dùng 400 cho mọi thứ?"* — Dùng 400 cho tất cả vẫn chạy được, nhưng 422 chính xác hơn. Frontend có thể xử lý khác nhau: 400 = "request format sai, có bug client", 422 = "user nhập sai, hiển thị lỗi inline cho user".

### 10.4 Code Go sinh response RFC 7807

\`\`\`go
type Problem struct {
    Type     string         \`json:"type"\`
    Title    string         \`json:"title"\`
    Status   int            \`json:"status"\`
    Detail   string         \`json:"detail,omitempty"\`
    Instance string         \`json:"instance,omitempty"\`
    Errors   []FieldProblem \`json:"errors,omitempty"\`
}
type FieldProblem struct {
    Field   string \`json:"field"\`
    Message string \`json:"message"\`
}

func writeValidationProblem(w http.ResponseWriter, r *http.Request, verrs validator.ValidationErrors) {
    p := Problem{
        Type:     "https://example.com/probs/validation",
        Title:    "Validation Failed",
        Status:   http.StatusUnprocessableEntity,
        Detail:   "Một hoặc nhiều trường không hợp lệ",
        Instance: r.URL.Path,
    }
    for _, e := range verrs {
        p.Errors = append(p.Errors, FieldProblem{
            Field:   e.Field(),
            Message: translate(e),
        })
    }
    w.Header().Set("Content-Type", "application/problem+json")
    w.WriteHeader(http.StatusUnprocessableEntity)
    json.NewEncoder(w).Encode(p)
}
\`\`\`

### 📝 Tóm tắt mục 10

- RFC 7807 = chuẩn IETF cho HTTP error format.
- Content-Type: \`application/problem+json\`.
- Field bắt buộc: \`status\`. Khuyến nghị: \`type\`, \`title\`. Tùy chọn: \`detail\`, \`instance\`, \`errors\`.
- Validation fail = HTTP 422 (không phải 400).

---

## 11. i18n — error message theo locale

Khi app có nhiều ngôn ngữ, error message cũng phải đa ngôn ngữ.

\`\`\`go
import (
    en "github.com/go-playground/locales/en"
    vi "github.com/go-playground/locales/vi"
    ut "github.com/go-playground/universal-translator"
    "github.com/go-playground/validator/v10"
    en_translations "github.com/go-playground/validator/v10/translations/en"
    vi_translations "github.com/go-playground/validator/v10/translations/vi"
)

v := validator.New()
uni := ut.New(en.New(), en.New(), vi.New())
transEN, _ := uni.GetTranslator("en")
transVI, _ := uni.GetTranslator("vi")

en_translations.RegisterDefaultTranslations(v, transEN)
vi_translations.RegisterDefaultTranslations(v, transVI)

// Khi validate:
err := v.Struct(req)
if verrs, ok := err.(validator.ValidationErrors); ok {
    locale := r.Header.Get("Accept-Language") // "vi" hoặc "en"
    trans := transEN
    if strings.HasPrefix(locale, "vi") {
        trans = transVI
    }
    msgs := verrs.Translate(trans)
    // msgs là map[string]string: "Req.Email" -> "Trường Email là bắt buộc"
}
\`\`\`

### 11.1 Override message riêng

\`\`\`go
v.RegisterTranslation("vnphone", transVI,
    func(ut ut.Translator) error {
        return ut.Add("vnphone", "{0} phải là số điện thoại VN hợp lệ", true)
    },
    func(ut ut.Translator, fe validator.FieldError) string {
        t, _ := ut.T("vnphone", fe.Field())
        return t
    })
\`\`\`

> **⚠ Pitfall**: locale \`vi\` của lib có sẵn ~ 80% tag, nhưng custom validator (vd \`vnphone\`) bạn phải tự đăng ký translation. Quên → message rơi về tag name \`"vnphone"\` — user nhìn không hiểu.

### 📝 Tóm tắt mục 11

- \`validator/v10/translations/<locale>\` cung cấp built-in.
- \`verrs.Translate(trans)\` trả map message đã dịch.
- Custom validator → phải \`RegisterTranslation\` riêng cho mỗi locale.
- Chọn locale từ header \`Accept-Language\`.

---

## 12. Validation middleware — reusable cho mọi handler

DRY: đừng lặp lại \`parse → validate → write error\` ở mọi handler. Đóng gói thành middleware.

### 12.1 Generic middleware (Go 1.18+)

\`\`\`go
func ValidateBody[T any](next func(w http.ResponseWriter, r *http.Request, body T)) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var body T
        if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
            writeProblem(w, r, http.StatusBadRequest, "Invalid JSON", err.Error(), nil)
            return
        }
        if err := validate.Struct(body); err != nil {
            verrs, _ := err.(validator.ValidationErrors)
            writeValidationProblem(w, r, verrs)
            return
        }
        next(w, r, body)
    }
}

// Dùng:
mux.HandleFunc("/users", ValidateBody(func(w http.ResponseWriter, r *http.Request, body CreateUserRequest) {
    // body đã validate xong, dùng thoải mái
    user := createUser(body)
    json.NewEncoder(w).Encode(user)
}))
\`\`\`

### 12.2 Cho Gin / Echo / Fiber

Hầu hết framework lớn đã tích hợp \`validator\`:

\`\`\`go
// Gin: c.ShouldBindJSON tự validate
type CreateUserRequest struct { ... }

r.POST("/users", func(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        // err đã là validator.ValidationErrors
        c.JSON(422, formatErrors(err))
        return
    }
    // ...
})
\`\`\`

> **❓ Câu hỏi tự nhiên**: *"Middleware vs framework binding — chọn cái nào?"*
>
> - Có framework (Gin, Echo) → dùng binding của framework. Đỡ bảo trì.
> - Stdlib \`net/http\` → tự viết middleware (như §12.1).
> - **Đừng dùng cả hai cùng lúc** — confuse người đọc code, có thể double-validate.

### 📝 Tóm tắt mục 12

- Middleware đóng gói parse + validate + error response.
- Go generics (1.18+) cho phép viết middleware type-safe.
- Framework lớn (Gin, Echo, Fiber) tích hợp sẵn — dùng tích hợp, đừng reinvent.

---

## 13. Validate ngoài body — query, path, form

Validation không chỉ cho JSON body. Mọi struct đều validate được.

\`\`\`go
type ListUsersQuery struct {
    Page    int    \`form:"page"    validate:"min=1"\`
    Limit   int    \`form:"limit"   validate:"min=1,max=100"\`
    Sort    string \`form:"sort"    validate:"oneof=asc desc"\`
    OrderBy string \`form:"orderBy" validate:"oneof=id name created_at"\`
}

func handleList(w http.ResponseWriter, r *http.Request) {
    q := ListUsersQuery{}
    // parse query string vào struct (gorilla/schema, gin c.ShouldBindQuery, ...)
    schema.NewDecoder().Decode(&q, r.URL.Query())
    if err := validate.Struct(q); err != nil {
        writeValidationProblem(w, r, err.(validator.ValidationErrors))
        return
    }
    // ... use q
}
\`\`\`

### 13.1 Path param

Path param (\`/users/{id}\`) thường nhỏ — validate trực tiếp:

\`\`\`go
id := mux.Vars(r)["id"]
if _, err := uuid.Parse(id); err != nil {
    writeProblem(w, r, 400, "Invalid UUID", err.Error(), nil)
    return
}
\`\`\`

Hoặc gom vào struct cùng các param khác:

\`\`\`go
type GetUserParams struct {
    ID string \`validate:"required,uuid4"\`
}
\`\`\`

> **⚠ Pitfall**: nhiều dev quên validate query/path, chỉ validate body. Attacker đẩy \`?limit=99999999\` → DB query khổng lồ → DoS. **Mọi nguồn input đều validate.**

### 📝 Tóm tắt mục 13

- Query, path, form đều validate được — chỉ cần bind vào struct.
- Đừng chỉ validate body — query/path cũng là input từ user.
- Path param thường ít → có thể inline validate.

---

## 14. Sanitization vs Validation

Hai khái niệm khác nhau, hay bị nhầm.

| | Sanitization | Validation |
|---|---|---|
| Mục đích | **Clean** dữ liệu | **Kiểm tra** dữ liệu |
| Output | Dữ liệu đã được "rửa sạch" | Boolean (valid/invalid) hoặc error |
| Side effect | **Sửa** input | Không sửa input |
| Ví dụ | \`strings.TrimSpace\`, \`strings.ToLower(email)\`, strip HTML | \`email matches regex\` |
| Thứ tự | **Trước** validation | Sau sanitization |

### 14.1 Vì sao sanitize TRƯỚC validate?

\`\`\`go
input := "  ALICE@example.com  "

// Tệ: validate trước
validate(input)              // email validator có thể fail vì có space
// User confused: "tôi đã gõ email đúng mà?"

// Tốt: sanitize trước
clean := strings.TrimSpace(input)
clean = strings.ToLower(clean)
validate(clean)              // OK
\`\`\`

### 14.2 Cẩn thận khi sanitize

- **Đừng silent-fix dữ liệu quan trọng**. Vd \`quantity = 999\` user gõ sai, đừng tự ý "sanitize" thành \`99\`. Reject thay vì sửa.
- Sanitize an toàn: \`TrimSpace\`, \`ToLower(email)\`, normalize Unicode (\`norm.NFC\`).
- Sanitize không an toàn (cần cân nhắc): strip HTML, decode URL — có thể thay đổi semantic.

### 14.3 Implement order

\`\`\`go
func handle(req CreateUserRequest) error {
    // 1. Sanitize
    req.Email = strings.ToLower(strings.TrimSpace(req.Email))
    req.Name = strings.TrimSpace(req.Name)
    // 2. Validate
    if err := validate.Struct(req); err != nil {
        return err
    }
    // 3. Business
    return service.CreateUser(req)
}
\`\`\`

### 📝 Tóm tắt mục 14

- Sanitize = clean (sửa). Validate = check (không sửa).
- Sanitize **trước** validate.
- Cẩn thận: đừng silent-fix dữ liệu quan trọng — reject thay vì sửa.

---

## 15. Common pitfall — đầy đủ checklist

### ⚠ 15.1 Trust client input

Dù request đến từ frontend của bạn, người ta vẫn dùng curl/Postman được. **Mọi input đều phải coi là untrusted.**

### ⚠ 15.2 Validate chỉ ở UI

Frontend đã check email format ⇒ backend không cần? **Sai.** Frontend phục vụ UX, backend phục vụ security.

### ⚠ 15.3 Reflective validation slow trong hot path

Lib dùng reflection → mỗi \`Struct(x)\` ~ 1–5µs. Trên ~ 10k RPS = 10–50ms CPU/s.

- Cache validator instance (đã nói §4.2).
- Pre-warm: gọi \`v.Struct(SomeRequest{})\` lúc startup để build cache trước.
- Nếu vẫn slow → pre-compile validation thành Go code (code generator) — extreme case.

### ⚠ 15.4 Quên validate path/query

Đã nói §13. Nhắc lại vì cực phổ biến.

### ⚠ 15.5 Error message expose internal field

\`\`\`json
{ "errors": { "DBPasswordHash": "required" } }
\`\`\`

⇒ attacker biết internal có field \`DBPasswordHash\`. Dùng \`RegisterTagNameFunc\` để chỉ expose JSON name. Hoặc filter blacklist các field nội bộ.

### ⚠ 15.6 Race condition trong custom validator

\`\`\`go
var counter int
v.RegisterValidation("once_per_sec", func(fl validator.FieldLevel) bool {
    counter++ // ⚠ race! validator gọi concurrently
    return counter < 1000
})
\`\`\`

Custom validator có thể bị gọi từ nhiều goroutine. State trong validator phải thread-safe (atomic / mutex) — hoặc không có state.

### ⚠ 15.7 Trả response RFC 7807 nhưng status header 200

\`\`\`go
w.WriteHeader(200)              // ⚠
w.Header().Set("Content-Type", "application/problem+json")
json.NewEncoder(w).Encode(Problem{Status: 422, ...})
\`\`\`

Body bảo 422 nhưng HTTP status 200 → client middleware đọc status sẽ coi là OK. Status header và \`problem.status\` phải khớp.

### ⚠ 15.8 Không validate file upload

\`multipart/form-data\` cũng là input. Check \`Content-Type\`, file size, magic bytes (không tin extension).

### 📝 Tóm tắt mục 15

- 8 pitfall ở trên là set tối thiểu cần đi qua trước khi deploy.
- Nguyên tắc bao trùm: **đừng tin client, validate mọi nguồn, format chuẩn, đừng leak nội bộ**.

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Validation là tuyến phòng thủ đầu tiên — "không tin input từ client" là quy tắc bảo mật số 1. Thiếu nó = lỗ hổng + dữ liệu rác.**

| Tầng validate | Vai trò |
|---------------|---------|
| **Cú pháp (struct tag \`validate:"..."\`)** | Email đúng format, số trong khoảng, field bắt buộc |
| **Nghiệp vụ** | "Ngày kết thúc > ngày bắt đầu", "đủ số dư" — logic riêng |
| **DB constraint** | Tuyến cuối ([nối ràng buộc](../../Databases/01-Foundations/lesson-05-khoa-rang-buoc/)) |
| **Sanitize/escape** | Chống SQL injection (prepared statement), XSS (escape output) |

### 16.1. Ví dụ cụ thể — validate nhiều tầng

\`\`\`go
type CreateOrder struct {
	Email string \`json:"email" validate:"required,email"\`
	Qty   int    \`json:"qty" validate:"required,min=1,max=100"\`
}
// 1. Cú pháp: validator.Struct(req) → trả lỗi từng field cho client (400)
// 2. Nghiệp vụ: kiểm tồn kho, hạn mức — không tag nào làm được
// 3. DB: UNIQUE/CHECK constraint chặn nếu lọt qua
\`\`\`

Trả lỗi validation **rõ từng field** (\`{"qty": "must be ≥ 1"}\`) → client sửa được, UX tốt. Đừng trả "invalid input" chung chung. Thư viện \`go-playground/validator\` chuẩn de-facto cho tag validation.

> ⚠ **"Không bao giờ tin client" — gốc của lỗ hổng bảo mật.** Mọi input (body, query, header, cookie) đều có thể độc hại: (1) **SQL injection** → luôn dùng prepared statement/parameterized query, KHÔNG nối chuỗi SQL; (2) **XSS** → escape khi render HTML; (3) **mass assignment** → đừng bind thẳng request vào model DB (kẻ tấn công set \`is_admin=true\`), dùng DTO riêng; (4) validate **kích thước** (chống DoS body khổng lồ, [nối io](../lesson-21-io-streaming/)). Validation client-side chỉ cho UX — server PHẢI validate lại.

### 16.2. 📝 Tóm tắt mục 16

- Validate nhiều tầng: **cú pháp** (tag validator) → **nghiệp vụ** (logic) → **DB constraint** (tuyến cuối).
- Trả lỗi **từng field** rõ ràng cho client (UX), không "invalid input" chung.
- "Không tin client": prepared statement (SQLi), escape (XSS), DTO riêng (mass assignment), giới hạn size (DoS). Server luôn validate lại.

## 17. Bài tập

### BT1 — Struct \`RegisterRequest\`

Định nghĩa struct \`RegisterRequest\` với các field:

- \`Username\`: bắt buộc, alphanum, 3–20 ký tự.
- \`Email\`: bắt buộc, format email.
- \`Password\`: bắt buộc, tối thiểu 8 ký tự.
- \`Age\`: bắt buộc, 18–120.
- \`Role\`: bắt buộc, một trong \`admin/user/guest\`.

Viết struct với đủ tag \`validate:"..."\`.

### BT2 — Custom validator \`vnphone\`

Đăng ký validator \`vnphone\` cho số điện thoại Việt Nam (\`+84xxxxxxxxx\` hoặc \`0xxxxxxxxx\`, 10 số sau prefix). Test với 5 input: 2 hợp lệ, 3 không hợp lệ.

### BT3 — Cross-field date range

Định nghĩa struct \`DateRange{Start, End time.Time}\` với constraint \`End > Start\`. Viết hàm \`validate\` và test với 3 ca: hợp lệ, End < Start, End == Start.

### BT4 — Validate slice

Định nghĩa:

\`\`\`go
type Order struct {
    OrderID string  \`validate:"required,uuid4"\`
    Items   []Item  \`validate:"required,min=1,max=20,dive"\`
}
type Item struct {
    SKU      string \`validate:"required,alphanum,len=8"\`
    Quantity int    \`validate:"required,min=1,max=100"\`
    Price    int    \`validate:"required,gt=0"\`
}
\`\`\`

Validate một order với 1 item hợp lệ + 1 item sai (Quantity = 0) → in ra danh sách lỗi.

### BT5 — RFC 7807 formatter

Viết hàm \`FormatProblem(err validator.ValidationErrors, instance string) Problem\` trả về \`Problem\` đúng cấu trúc RFC 7807. Encode ra JSON và in ra console.

### BT6 — Validation middleware reusable

Viết \`func ValidateBody[T any](next func(w, r, T)) http.HandlerFunc\` mà:

1. Parse JSON body vào struct \`T\`.
2. Validate.
3. Nếu fail → respond 422 với RFC 7807.
4. Nếu OK → gọi \`next(w, r, body)\`.

Demo bằng cách wrap 2 handler khác nhau dùng struct khác nhau.

---

## 18. Lời giải chi tiết

### Lời giải BT1

\`\`\`go
type RegisterRequest struct {
    Username string \`json:"username" validate:"required,alphanum,min=3,max=20"\`
    Email    string \`json:"email"    validate:"required,email"\`
    Password string \`json:"password" validate:"required,min=8"\`
    Age      int    \`json:"age"      validate:"required,min=18,max=120"\`
    Role     string \`json:"role"     validate:"required,oneof=admin user guest"\`
}
\`\`\`

**Lưu ý**: với \`Age\` ở đây dùng \`required\` + \`min=18\` — nếu yêu cầu cho phép \`Age=0\` mặc định (chưa khai báo), thay \`Age int\` thành \`Age *int\` và bỏ \`required\` (vì pointer \`nil\` = chưa khai báo).

### Lời giải BT2

\`\`\`go
var vnPhoneRegex = regexp.MustCompile(\`^(\\+84|0)[0-9]{9}$\`)

func validateVNPhone(fl validator.FieldLevel) bool {
    return vnPhoneRegex.MatchString(fl.Field().String())
}

func main() {
    v := validator.New()
    v.RegisterValidation("vnphone", validateVNPhone)

    type C struct {
        Phone string \`validate:"required,vnphone"\`
    }
    cases := []string{
        "0912345678",       // OK (0 + 9 số)
        "+84912345678",     // OK (+84 + 9 số)
        "123",              // FAIL: không có prefix
        "+8491234",         // FAIL: thiếu số
        "0912345678abc",    // FAIL: có chữ
    }
    for _, p := range cases {
        err := v.Struct(C{Phone: p})
        if err == nil {
            fmt.Printf("OK   %s\\n", p)
        } else {
            fmt.Printf("FAIL %s — %v\\n", p, err)
        }
    }
}
\`\`\`

**Độ phức tạp**: regex compile 1 lần ($O(\\text{regex\\_len})$), match $O(\\text{input\\_len})$. Trên input ngắn (~ 15 ký tự) là ~ µs-level.

### Lời giải BT3

\`\`\`go
type DateRange struct {
    Start time.Time \`validate:"required"\`
    End   time.Time \`validate:"required,gtfield=Start"\`
}

func main() {
    v := validator.New()
    t1 := time.Now()
    t2 := t1.Add(time.Hour)

    cases := []DateRange{
        {Start: t1, End: t2},   // OK
        {Start: t2, End: t1},   // FAIL: End < Start
        {Start: t1, End: t1},   // FAIL: End == Start (gtfield là strict >)
    }
    for i, dr := range cases {
        if err := v.Struct(dr); err == nil {
            fmt.Printf("case %d: OK\\n", i)
        } else {
            fmt.Printf("case %d: FAIL — %v\\n", i, err)
        }
    }
}
\`\`\`

**Lưu ý**: \`gtfield\` strict (>). Nếu cho phép End == Start, dùng \`gtefield\`.

### Lời giải BT4

\`\`\`go
type Order struct {
    OrderID string \`json:"order_id" validate:"required,uuid4"\`
    Items   []Item \`json:"items"    validate:"required,min=1,max=20,dive"\`
}
type Item struct {
    SKU      string \`json:"sku"      validate:"required,alphanum,len=8"\`
    Quantity int    \`json:"quantity" validate:"required,min=1,max=100"\`
    Price    int    \`json:"price"    validate:"required,gt=0"\`
}

func main() {
    v := validator.New()
    o := Order{
        OrderID: "550e8400-e29b-41d4-a716-446655440000",
        Items: []Item{
            {SKU: "ABCD1234", Quantity: 2, Price: 100},  // OK
            {SKU: "XYZW5678", Quantity: 0, Price: 50},    // FAIL: Quantity = 0
        },
    }
    err := v.Struct(o)
    for _, e := range err.(validator.ValidationErrors) {
        fmt.Printf("field=%s tag=%s param=%s value=%v\\n",
            e.Namespace(), e.Tag(), e.Param(), e.Value())
    }
    // Output:
    // field=Order.Items[1].Quantity tag=required ...
    //  (hoặc tag=min nếu không "required" do = 0; tùy version lib)
}
\`\`\`

**Lưu ý**: trên \`int\`, giá trị 0 là **zero value** → \`required\` fail. Đó là lý do \`Quantity = 0\` trigger \`required\`, không phải \`min=1\`.

### Lời giải BT5

\`\`\`go
type Problem struct {
    Type     string         \`json:"type"\`
    Title    string         \`json:"title"\`
    Status   int            \`json:"status"\`
    Detail   string         \`json:"detail,omitempty"\`
    Instance string         \`json:"instance,omitempty"\`
    Errors   []FieldProblem \`json:"errors,omitempty"\`
}
type FieldProblem struct {
    Field   string \`json:"field"\`
    Message string \`json:"message"\`
}

func FormatProblem(verrs validator.ValidationErrors, instance string) Problem {
    p := Problem{
        Type:     "https://example.com/probs/validation",
        Title:    "Validation Failed",
        Status:   422,
        Detail:   "Một hoặc nhiều trường không hợp lệ",
        Instance: instance,
    }
    for _, e := range verrs {
        p.Errors = append(p.Errors, FieldProblem{
            Field:   e.Field(),
            Message: translate(e),
        })
    }
    return p
}

func translate(e validator.FieldError) string {
    switch e.Tag() {
    case "required":
        return "trường bắt buộc"
    case "email":
        return "phải là email hợp lệ"
    case "min":
        return "tối thiểu " + e.Param()
    case "max":
        return "tối đa " + e.Param()
    case "oneof":
        return "phải là một trong: " + e.Param()
    case "gtfield":
        return "phải lớn hơn " + e.Param()
    case "uuid4":
        return "phải là UUID v4"
    case "alphanum":
        return "chỉ cho phép chữ và số"
    case "vnphone":
        return "phải là số điện thoại VN hợp lệ"
    default:
        return e.Tag() + " " + e.Param()
    }
}
\`\`\`

### Lời giải BT6

\`\`\`go
var V = validator.New()

func init() {
    V.RegisterTagNameFunc(func(fld reflect.StructField) string {
        name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
        if name == "-" {
            return ""
        }
        return name
    })
}

func ValidateBody[T any](next func(http.ResponseWriter, *http.Request, T)) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var body T
        if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
            writeProblemSimple(w, r, 400, "Invalid JSON", err.Error())
            return
        }
        if err := V.Struct(body); err != nil {
            if verrs, ok := err.(validator.ValidationErrors); ok {
                p := FormatProblem(verrs, r.URL.Path)
                w.Header().Set("Content-Type", "application/problem+json")
                w.WriteHeader(p.Status)
                _ = json.NewEncoder(w).Encode(p)
                return
            }
            writeProblemSimple(w, r, 500, "Validation error", err.Error())
            return
        }
        next(w, r, body)
    }
}

func writeProblemSimple(w http.ResponseWriter, r *http.Request, status int, title, detail string) {
    p := Problem{
        Type: "about:blank", Title: title, Status: status,
        Detail: detail, Instance: r.URL.Path,
    }
    w.Header().Set("Content-Type", "application/problem+json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(p)
}

// Demo:
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/register", ValidateBody(func(w http.ResponseWriter, r *http.Request, req RegisterRequest) {
        fmt.Fprintf(w, "registered %s", req.Username)
    }))
    mux.HandleFunc("/orders", ValidateBody(func(w http.ResponseWriter, r *http.Request, o Order) {
        fmt.Fprintf(w, "order %s with %d items", o.OrderID, len(o.Items))
    }))
    log.Fatal(http.ListenAndServe(":8080", mux))
}
\`\`\`

**Độ phức tạp**: middleware overhead ~ 5–10µs (decode + validate). Negligible so với business logic + DB.

---

## 19. Code & Minh hoạ

- [solutions.go](./solutions.go) — implementation đầy đủ: manual validation, custom validator (regex VN phone), RFC 7807 formatter, validation middleware. Code biên dịch được bằng \`go run solutions.go\` (không cần external dependency — dùng tay thay vì \`go-playground/validator\` để tránh \`go mod\`, nhưng comment chỉ rõ "trong code thật chỉ cần X dòng nếu dùng lib").
- [visualization.html](./visualization.html) — 3 module tương tác: (1) Validation tag playground — gõ struct + JSON, xem error theo từng field; (2) RFC 7807 builder — chọn scenario, xem response chuẩn; (3) Manual vs library — so sánh lines-of-code.

---

## 20. Bài tiếp theo

- [Lesson 46 — Authentication & JWT](../lesson-46-authentication-jwt/) — sau khi đã validate input sạch sẽ, bước tiếp là xác thực người gửi request. Vẫn cần validate (JWT token format, claims) — kiến thức bài này dùng trực tiếp.

## Tham khảo

- [go-playground/validator (v10)](https://github.com/go-playground/validator)
- [RFC 7807 — Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
- [OWASP — Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
`;
