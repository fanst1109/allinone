// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-23-json-encoding/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 23 — JSON Encoding với \`encoding/json\`

> Tier 2 · Go Intermediate. Tiền đề: [Lesson 15 — Struct & Method](../lesson-15-struct-method/), [Lesson 18 — Interface](../lesson-18-interfaces/), [Lesson 21 — IO Streaming](../lesson-21-io-streaming/).
> Bài tiếp: [Lesson 24 — Regex & Text Processing](../lesson-24-regex-text-processing/).

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Encode struct Go ra JSON (\`Marshal\` / \`MarshalIndent\`) và decode JSON về struct (\`Unmarshal\`).
- Dùng struct tag để đổi tên field, bỏ field zero (\`omitempty\`), bỏ field nhạy cảm (\`-\`).
- Xử lý JSON shape chưa biết bằng \`map[string]interface{}\` và \`json.RawMessage\`.
- Viết \`MarshalJSON\` / \`UnmarshalJSON\` tự định nghĩa (ví dụ format ngày \`2006-01-02\` thay cho RFC3339 mặc định).
- Streaming JSON qua \`json.NewEncoder\` / \`json.NewDecoder\` cho HTTP body và file lớn.
- Tránh các pitfall kinh điển: quên \`&\` khi Unmarshal, field viết thường (private), tag sai chính tả, số 64-bit mất precision.

## 1. Vì sao JSON là format dữ liệu phổ biến nhất?

> 💡 **Trực giác.** Mỗi service phải nói chuyện với service khác. Hai bên cần một "ngôn ngữ chung" mà cả hai đều đọc được, không phụ thuộc ngôn ngữ lập trình. JSON là ngôn ngữ chung phổ biến nhất hiện tại: text thuần, ai đọc cũng hiểu, mọi ngôn ngữ đều có parser.

JSON xuất hiện ở khắp mọi nơi trong backend hiện đại:

- **REST API**: request body, response body — gần 100% dùng JSON.
- **Config file**: \`package.json\`, \`tsconfig.json\`, AWS IAM policy, Kubernetes manifests dạng JSON.
- **Webhook payload**: GitHub, Stripe, Slack push event dưới dạng JSON.
- **Logging**: structured log (JSON-line) cho Elasticsearch / Loki.
- **Cache**: lưu object vào Redis dưới dạng JSON string.

So với các format khác:

| Format | Ưu | Nhược |
|--------|-----|-------|
| **JSON** | Đọc được, mọi ngôn ngữ hỗ trợ, debug dễ | Verbose, parse chậm hơn binary, không có integer-vs-float rõ ràng |
| **XML** | Schema mạnh (XSD), namespace | Nặng nề, viết tay khổ sở, đã lỗi thời cho API |
| **Protobuf** | Nhỏ, nhanh (~10x JSON), schema chặt | Cần file \`.proto\`, binary nên debug khó |
| **MessagePack** | Binary, nhỏ hơn JSON ~30% | Không đọc được bằng mắt |
| **YAML** | Đọc thoải mái, tốt cho config | Indentation-sensitive, parse chậm, không tốt cho data trao đổi |

Trong Go, package chính thức là **\`encoding/json\`** trong stdlib — không cần dependency ngoài. Ta xài nó suốt bài này.

> 📝 **Tóm tắt mục 1.** JSON = text format đơn giản, dùng cho API/config/log. Go có \`encoding/json\` built-in.

## 2. Marshal — Go struct → JSON

\`json.Marshal(v interface{}) ([]byte, error)\` biến giá trị Go thành \`[]byte\` JSON.

\`\`\`go
type User struct {
    Name  string
    Email string
    Age   int
}

u := User{Name: "Alice", Email: "alice@example.com", Age: 30}
b, _ := json.Marshal(u)
fmt.Println(string(b))
// {"Name":"Alice","Email":"alice@example.com","Age":30}
\`\`\`

Quan sát:

1. Field **viết hoa** (exported) mới được encode. Field \`name\` (chữ thường) sẽ bị bỏ qua hoàn toàn.
2. Tên trong JSON mặc định **giống tên Go** — \`Name\` chứ không phải \`name\`. Muốn lowercase phải dùng tag (mục 3).
3. Output là một dòng, không có khoảng trắng.

### 2.1 Pretty print với \`MarshalIndent\`

\`\`\`go
b, _ := json.MarshalIndent(u, "", "  ")
fmt.Println(string(b))
// {
//   "Name": "Alice",
//   "Email": "alice@example.com",
//   "Age": 30
// }
\`\`\`

\`MarshalIndent(v, prefix, indent)\`:
- \`prefix\` — string thêm vào đầu mỗi dòng (thường để rỗng).
- \`indent\` — string lùi đầu dòng cho mỗi level (thường \`"  "\` hai space hoặc \`"\\t"\` tab).

Dùng pretty print khi: ghi file config, log debug. **Không dùng cho HTTP response** — tốn bytes vô ích.

### 2.2 Marshal các kiểu khác struct

| Go | JSON |
|----|------|
| \`nil\` | \`null\` |
| \`true\` / \`false\` | \`true\` / \`false\` |
| \`42\` (int) | \`42\` |
| \`3.14\` (float64) | \`3.14\` |
| \`"hello"\` | \`"hello"\` |
| \`[]int{1,2,3}\` | \`[1,2,3]\` |
| \`map[string]int{"a":1}\` | \`{"a":1}\` (key của map phải convert được sang string) |
| \`time.Time{...}\` | \`"2024-01-15T10:30:00Z"\` (format RFC3339) |

Map có key kiểu int/struct → Marshal **lỗi** (\`json: unsupported type\`). Phải là \`map[string]X\` hoặc kiểu integer mà Go tự convert sang string.

> ⚠ **Lỗi thường gặp.** \`Marshal\` chạy được với map có key thoả mãn \`encoding.TextMarshaler\`, nhưng nhiều người tưởng \`map[int]string\` cũng OK — không phải. Test thử và bạn sẽ thấy nó hoạt động (Go cast key int sang string), nhưng \`map[Point]string\` (struct làm key) sẽ fail.

> 📝 **Tóm tắt mục 2.** \`Marshal\` → \`[]byte\` (1 dòng), \`MarshalIndent\` → pretty. Chỉ field exported được encode.

## 3. Struct tag — kiểm soát mapping

Tag là string nằm trong backtick sau khai báo field, có dạng \`json:"<options>"\`.

### 3.1 Đổi tên field

\`\`\`go
type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
}
// {"name":"Alice","email":"alice@example.com","age":30}
\`\`\`

> 💡 Convention REST API: field JSON viết \`snake_case\` hoặc \`camelCase\`. Go field bắt buộc PascalCase. Tag là chỗ "bắc cầu" giữa hai bên.

\`\`\`go
type Order struct {
    OrderID    int    \`json:"order_id"\`     // snake_case style
    CustomerID int    \`json:"customerId"\`   // camelCase style
    Total      float64 \`json:"total"\`
}
\`\`\`

### 3.2 \`omitempty\` — bỏ field nếu zero

\`\`\`go
type Filter struct {
    Status string \`json:"status,omitempty"\`
    Limit  int    \`json:"limit,omitempty"\`
    Offset int    \`json:"offset,omitempty"\`
}

f := Filter{Status: "active"}
b, _ := json.Marshal(f)
// {"status":"active"}   ← Limit=0, Offset=0 bị bỏ
\`\`\`

\`omitempty\` skip khi field là **zero value của kiểu đó**:
- string: \`""\`
- int/float: \`0\`
- bool: \`false\`
- pointer/slice/map/interface: \`nil\`
- struct: **không** áp dụng (struct rỗng vẫn được Marshal). Đây là pitfall — xem mục 11 (pointer field).

### 3.3 \`-\` — bỏ field hoàn toàn

\`\`\`go
type User struct {
    Name     string \`json:"name"\`
    Email    string \`json:"email"\`
    Password string \`json:"-"\`              // không bao giờ xuất ra JSON
}
\`\`\`

Dùng cho field nhạy cảm: password, token, secret key. Hoặc field thuần nội bộ (cache, mutex).

> ⚠ **Lỗi thường gặp.** \`json:""\` (rỗng) **không** có nghĩa là bỏ qua — nó vẫn dùng tên field Go làm key. Phải là \`json:"-"\` mới bỏ.

### 3.4 \`,string\` — encode int/bool dưới dạng string

\`\`\`go
type Tweet struct {
    ID   int64  \`json:"id,string"\`     // ép thành "12345"
    Text string \`json:"text"\`
}

t := Tweet{ID: 1234567890123456789, Text: "hi"}
b, _ := json.Marshal(t)
// {"id":"1234567890123456789","text":"hi"}
\`\`\`

Vì sao cần? **JSON number trong JavaScript là 64-bit float (chỉ 53 bit precision)**. Số Twitter ID 64-bit (\`int64\`) khi qua JSON sang client JS sẽ **mất precision**. Workaround: gửi dưới dạng string. Đây là lý do Twitter API có cả \`id\` (int) và \`id_str\` (string).

### 3.5 Combo tag

Tag nhiều option ngăn bằng dấu phẩy:

\`\`\`go
type Config struct {
    Host     string \`json:"host,omitempty"\`
    Port     int    \`json:"port,omitempty"\`
    Debug    bool   \`json:"debug,omitempty"\`
    SecretAK string \`json:"-"\`                  // skip hoàn toàn
    Version  string \`json:"version"\`            // luôn xuất, kể cả ""
    BigID    int64  \`json:"big_id,string"\`      // xuất dạng string
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Có field \`Token string\` bạn không muốn lộ ra JSON. Viết tag.
> 2. Có field \`RetryCount int\`, muốn bỏ khi bằng 0. Viết tag.
> 3. Field Go \`UserID\`, JSON key cần là \`user_id\`. Viết tag.
> <details><summary>Đáp án</summary>
>
> 1. \`\` \`json:"-"\` \`\`
> 2. \`\` \`json:"retry_count,omitempty"\` \`\`
> 3. \`\` \`json:"user_id"\` \`\`
> </details>

> 📝 **Tóm tắt mục 3.** Tag \`json:"name,omitempty"\` — đổi tên + bỏ zero. \`json:"-"\` — bỏ hẳn. \`json:",string"\` — gửi int qua JSON dạng string (tránh mất precision trong JS).

## 4. Unmarshal — JSON → Go

\`json.Unmarshal(data []byte, v interface{}) error\` parse JSON vào biến Go.

\`\`\`go
data := []byte(\`{"name":"Bob","age":25}\`)

var u User
err := json.Unmarshal(data, &u)
if err != nil { /* xử lý */ }
fmt.Println(u.Name, u.Age)  // Bob 25
\`\`\`

> ⚠ **Pitfall #1 — quên \`&\`.** Phải truyền **pointer** vào \`Unmarshal\`. Nếu truyền giá trị (\`u\` không có \`&\`), \`Unmarshal\` không thể ghi đè biến của bạn (vì Go truyền tham trị) — code compile nhưng \`u\` vẫn rỗng. Đây là lỗi #1 mọi người mới đều gặp.

\`\`\`go
// SAI — u vẫn là zero value
var u User
_ = json.Unmarshal(data, u)        // ❌

// ĐÚNG
var u User
_ = json.Unmarshal(data, &u)       // ✓
\`\`\`

### 4.1 Field không khớp thì sao?

\`\`\`go
type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

data := []byte(\`{"name":"Bob","age":25,"email":"bob@x.com","city":"HN"}\`)
var u User
_ = json.Unmarshal(data, &u)
// u.Name = "Bob", u.Age = 25
// "email" và "city" bị **bỏ qua silently** — không lỗi
\`\`\`

Mặc định JSON dư field → bỏ qua. Muốn nghiêm khắc → dùng \`DisallowUnknownFields\` (mục 13).

### 4.2 JSON thiếu field → giữ zero value

\`\`\`go
data := []byte(\`{"name":"Bob"}\`)
var u User
_ = json.Unmarshal(data, &u)
// u.Name = "Bob", u.Age = 0   ← zero value của int
\`\`\`

Đây là lý do bạn không phân biệt được "JSON không có \`age\`" với "JSON có \`age: 0\`". Giải pháp: pointer field — xem mục 11.

> 📝 **Tóm tắt mục 4.** \`Unmarshal(data, &v)\` — phải có \`&\`. Field thừa → silently ignored. Field thiếu → zero value.

## 5. Unmarshal vào shape chưa biết

Khi gọi API external mà bạn không control được schema, hoặc payload thay đổi theo \`type\`, không thể khai báo struct cố định.

### 5.1 \`map[string]interface{}\` — generic decode

\`\`\`go
data := []byte(\`{"name":"Bob","age":25,"tags":["go","backend"],"meta":{"city":"HN"}}\`)

var m map[string]interface{}
_ = json.Unmarshal(data, &m)

fmt.Println(m["name"])         // Bob (interface{} chứa string)
fmt.Println(m["age"])           // 25 (interface{} chứa float64 — KHÔNG phải int!)
fmt.Println(m["tags"])          // [go backend] (interface{} chứa []interface{})
\`\`\`

> ⚠ **Pitfall — số luôn là \`float64\`.** Khi decode vào \`interface{}\`, mọi JSON number thành \`float64\`. Muốn lấy ra int phải ép kiểu:
> \`\`\`go
> age := int(m["age"].(float64))
> \`\`\`
> Nếu là ID 64-bit lớn → mất precision (float64 chỉ 53 bit). Dùng \`json.Number\` (mục 9).

Truy cập field lồng nhau:

\`\`\`go
meta := m["meta"].(map[string]interface{})
city := meta["city"].(string)
\`\`\`

Nhưng lưu ý: phải \`type assertion\` từng bước — code rất dài và dễ panic nếu key thiếu. Pattern này chỉ nên dùng khi thực sự **không biết schema**. Nếu biết, viết struct cụ thể tốt hơn nhiều.

### 5.2 \`json.RawMessage\` — defer decode

\`RawMessage\` = \`[]byte\` đại diện cho JSON gốc chưa parse. Dùng khi cần parse sau, hoặc parse có điều kiện.

\`\`\`go
type Event struct {
    Type    string          \`json:"type"\`
    Payload json.RawMessage \`json:"payload"\`  // chưa parse vội
}

data := []byte(\`{"type":"user.created","payload":{"name":"Bob","email":"b@x.com"}}\`)

var ev Event
_ = json.Unmarshal(data, &ev)

// Giờ tuỳ Type mà parse Payload khác nhau
switch ev.Type {
case "user.created":
    var u User
    _ = json.Unmarshal(ev.Payload, &u)
    fmt.Println("user:", u.Name)
case "order.placed":
    var o Order
    _ = json.Unmarshal(ev.Payload, &o)
}
\`\`\`

> 💡 **Use case thực tế.** Webhook Stripe/GitHub — mỗi event có \`type\` khác nhau, payload schema khác nhau. Dùng \`RawMessage\` để parse 2 bước: bước 1 lấy \`type\`, bước 2 parse payload theo schema của type đó.

> 📝 **Tóm tắt mục 5.** \`map[string]interface{}\` — generic, nhưng số là float64, code dài. \`json.RawMessage\` — defer decode, tốt cho discriminated union (polymorphic payload).

## 6. Custom Marshaler / Unmarshaler

Khi default behavior không đủ — ví dụ format ngày custom, encrypt field, validate khi decode — implement interface \`json.Marshaler\` hoặc \`json.Unmarshaler\`.

\`\`\`go
type json.Marshaler interface   { MarshalJSON()           ([]byte, error) }
type json.Unmarshaler interface { UnmarshalJSON([]byte)   error }
\`\`\`

### 6.1 Custom date format

\`time.Time\` mặc định Marshal ra RFC3339: \`"2024-01-15T10:30:00Z"\`. Nhiều API chỉ muốn date (không time): \`"2024-01-15"\`.

\`\`\`go
type Date struct {
    time.Time
}

const dateLayout = "2006-01-02"

func (d Date) MarshalJSON() ([]byte, error) {
    // 1. Format theo layout
    s := d.Format(dateLayout)
    // 2. Bọc trong dấu " " — JSON string phải có quote
    return []byte(\`"\` + s + \`"\`), nil
}

func (d *Date) UnmarshalJSON(b []byte) error {
    // b = []byte(\`"2024-01-15"\`) — có cả quote
    s := strings.Trim(string(b), \`"\`)
    if s == "" || s == "null" {
        return nil
    }
    t, err := time.Parse(dateLayout, s)
    if err != nil {
        return err
    }
    d.Time = t
    return nil
}

// Sử dụng
type Invoice struct {
    ID       int  \`json:"id"\`
    IssuedAt Date \`json:"issued_at"\`
}

inv := Invoice{ID: 1, IssuedAt: Date{time.Now()}}
b, _ := json.Marshal(inv)
// {"id":1,"issued_at":"2024-01-15"}
\`\`\`

> ⚠ **Quên cặp quote.** JSON string PHẢI có \`"..."\`. Nếu \`MarshalJSON\` trả về \`[]byte("2024-01-15")\` (không quote) → JSON output bị lỗi syntax. Phải \`[]byte(\`"2024-01-15"\`)\`.

### 6.2 Mask sensitive field khi log

\`\`\`go
type Password string

func (p Password) MarshalJSON() ([]byte, error) {
    return []byte(\`"***"\`), nil
}

type User struct {
    Name string   \`json:"name"\`
    Pass Password \`json:"password"\`
}

u := User{Name: "Alice", Pass: "supersecret123"}
b, _ := json.Marshal(u)
// {"name":"Alice","password":"***"}
\`\`\`

Hữu ích cho structured log: không vô tình log password thật.

### 6.3 Validate khi Unmarshal

\`\`\`go
type Email string

func (e *Email) UnmarshalJSON(b []byte) error {
    s := strings.Trim(string(b), \`"\`)
    if !strings.Contains(s, "@") {
        return fmt.Errorf("invalid email: %s", s)
    }
    *e = Email(s)
    return nil
}
\`\`\`

> 📝 **Tóm tắt mục 6.** Implement \`MarshalJSON\` / \`UnmarshalJSON\` cho custom logic. Nhớ wrap JSON string trong \`"..."\`.

## 7. Streaming với \`Encoder\` / \`Decoder\`

\`Marshal\` / \`Unmarshal\` load **toàn bộ** dữ liệu vào RAM. Với body HTTP lớn hoặc file 100MB+ → tốn RAM, chậm.

\`json.Encoder\` / \`json.Decoder\` đọc/ghi qua \`io.Writer\` / \`io.Reader\` — stream nhỏ giọt, không buffer cả block lớn.

### 7.1 Encoder — viết ra writer

\`\`\`go
import "os"

f, _ := os.Create("user.json")
defer f.Close()

u := User{Name: "Alice", Age: 30}
enc := json.NewEncoder(f)
enc.SetIndent("", "  ")  // pretty print (tuỳ chọn)
_ = enc.Encode(u)
// File user.json giờ chứa:
// {
//   "Name": "Alice",
//   "Age": 30
// }
\`\`\`

\`enc.Encode(v)\` ghi JSON của \`v\` cộng thêm \`'\\n'\` ở cuối. Có thể gọi \`Encode\` nhiều lần → mỗi object một dòng (NDJSON / JSON-lines, mục 7.3).

### 7.2 Decoder — đọc từ reader

\`\`\`go
f, _ := os.Open("user.json")
defer f.Close()

var u User
dec := json.NewDecoder(f)
_ = dec.Decode(&u)
\`\`\`

### 7.3 Streaming nhiều object — NDJSON (Newline-Delimited JSON)

\`\`\`jsonl
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
{"id":3,"name":"Charlie"}
\`\`\`

Một dòng = một JSON object. Format này phổ biến trong logging (Loki, Elasticsearch), data export, streaming. Đọc bằng \`Decoder\` lặp \`Decode\`:

\`\`\`go
f, _ := os.Open("users.ndjson")
defer f.Close()

dec := json.NewDecoder(f)
for dec.More() {                 // còn JSON nào không?
    var u User
    if err := dec.Decode(&u); err != nil {
        log.Fatal(err)
    }
    fmt.Println(u.Name)
}
\`\`\`

> 💡 **Trực giác.** \`Decode\` đọc đúng 1 JSON value (object/array/scalar) — sau khi đọc xong nó dừng lại chờ value tiếp theo. NDJSON tận dụng đặc tính này.

### 7.4 HTTP — pattern chuẩn

Server đọc body, server ghi response:

\`\`\`go
func handler(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid json", http.StatusBadRequest)
        return
    }

    // ... business logic ...
    resp := CreateUserResponse{ID: 42, Name: req.Name}

    w.Header().Set("Content-Type", "application/json")
    _ = json.NewEncoder(w).Encode(resp)
}
\`\`\`

> ⚠ **Pitfall.** Đừng làm \`body, _ := io.ReadAll(r.Body); json.Unmarshal(body, &req)\` cho body lớn — vừa tốn RAM vừa chậm. \`NewDecoder(r.Body).Decode(&req)\` mới đúng.

> 📝 **Tóm tắt mục 7.** \`Encoder/Decoder\` cho stream. NDJSON = 1 object/dòng, lý tưởng cho log/data export. HTTP body dùng decoder, không \`ReadAll\`.

## 8. Common pattern thực tế

### 8.1 Đọc file config

\`\`\`go
type Config struct {
    Host    string \`json:"host"\`
    Port    int    \`json:"port"\`
    DBURL   string \`json:"db_url"\`
    Verbose bool   \`json:"verbose,omitempty"\`
}

func loadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config: %w", err)
    }
    var c Config
    if err := json.Unmarshal(data, &c); err != nil {
        return nil, fmt.Errorf("parse config: %w", err)
    }
    return &c, nil
}
\`\`\`

File config thường nhỏ (vài KB) → \`ReadFile + Unmarshal\` đơn giản, không cần stream.

### 8.2 HTTP client gọi API ngoài

\`\`\`go
resp, err := http.Get("https://api.example.com/users/42")
if err != nil { return err }
defer resp.Body.Close()

var u User
if err := json.NewDecoder(resp.Body).Decode(&u); err != nil {
    return fmt.Errorf("decode response: %w", err)
}
\`\`\`

### 8.3 Parse webhook payload (Stripe-style)

\`\`\`go
type WebhookEvent struct {
    ID   string          \`json:"id"\`
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\`
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    var ev WebhookEvent
    if err := json.NewDecoder(r.Body).Decode(&ev); err != nil {
        http.Error(w, "bad json", 400)
        return
    }

    switch ev.Type {
    case "payment.succeeded":
        var p PaymentData
        _ = json.Unmarshal(ev.Data, &p)
        // ... xử lý payment ...
    case "subscription.canceled":
        var s SubscriptionData
        _ = json.Unmarshal(ev.Data, &s)
        // ...
    }
    w.WriteHeader(200)
}
\`\`\`

### 8.4 Trả lỗi JSON chuẩn

\`\`\`go
type ErrorResponse struct {
    Error   string \`json:"error"\`
    Code    string \`json:"code"\`
    Details string \`json:"details,omitempty"\`
}

func writeError(w http.ResponseWriter, status int, code, msg string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(ErrorResponse{
        Error: msg,
        Code:  code,
    })
}
\`\`\`

> 📝 **Tóm tắt mục 8.** Config nhỏ → \`ReadFile+Unmarshal\`. HTTP body → \`Decoder/Encoder\`. Webhook polymorphic → \`RawMessage\`. Error response chuẩn hoá struct.

## 9. Number trong JSON — float64 mặc định, dùng \`json.Number\` cho big int

JSON spec không phân biệt \`int\` và \`float\` — chỉ có "number". Go phải chọn 1 kiểu khi decode vào \`interface{}\`. Mặc định: **\`float64\`**.

\`\`\`go
data := []byte(\`{"id":1234567890123456789}\`)

var m map[string]interface{}
_ = json.Unmarshal(data, &m)

fmt.Printf("%T %v\\n", m["id"], m["id"])
// float64 1.2345678901234568e+18   ← mất precision!
\`\`\`

Với ID 19 chữ số (Twitter snowflake, Discord ID, ...), \`float64\` chỉ giữ được ~16 chữ số chính xác. Convert ngược lại sẽ **sai số**.

### 9.1 Giải pháp 1: dùng struct với \`int64\`

Nếu biết schema → khai báo struct, \`int64\` giữ precision đầy đủ.

\`\`\`go
type Tweet struct {
    ID int64 \`json:"id"\`
}
var t Tweet
_ = json.Unmarshal(data, &t)
// t.ID = 1234567890123456789 (đúng)
\`\`\`

### 9.2 Giải pháp 2: \`json.Number\` + \`UseNumber()\`

Khi xài \`interface{}\` mà cần giữ precision:

\`\`\`go
dec := json.NewDecoder(strings.NewReader(\`{"id":1234567890123456789}\`))
dec.UseNumber()                          // bật chế độ giữ raw number

var m map[string]interface{}
_ = dec.Decode(&m)

idNum := m["id"].(json.Number)            // type assert
idInt, _ := idNum.Int64()                 // convert sang int64
fmt.Println(idInt)                        // 1234567890123456789 (đúng)
\`\`\`

\`json.Number\` là alias của \`string\` lưu nguyên text của số. Có method \`.Int64()\`, \`.Float64()\`, \`.String()\`.

> 📝 **Tóm tắt mục 9.** JSON number vào \`interface{}\` → \`float64\`, mất precision với số > 2^53. Dùng struct với \`int64\`, hoặc \`UseNumber()\` + \`json.Number\`.

## 10. \`time.Time\` — RFC3339 mặc định

\`\`\`go
type Event struct {
    Name string    \`json:"name"\`
    At   time.Time \`json:"at"\`
}

e := Event{Name: "deploy", At: time.Now().UTC()}
b, _ := json.Marshal(e)
// {"name":"deploy","at":"2024-01-15T10:30:00Z"}
\`\`\`

Format mặc định: **RFC3339** = ISO 8601 với timezone. UTC dùng \`Z\`, các zone khác dùng \`+07:00\`.

Decode tự động parse RFC3339:
\`\`\`go
data := []byte(\`{"name":"deploy","at":"2024-01-15T10:30:00Z"}\`)
var e Event
_ = json.Unmarshal(data, &e)
// e.At = 2024-01-15 10:30:00 +0000 UTC
\`\`\`

Nếu input không RFC3339 → lỗi parse. Phải implement custom Marshaler/Unmarshaler (xem mục 6.1, BT2).

> ⚠ **Pitfall.** Nhiều API trả về date không có time (\`"2024-01-15"\`), hoặc Unix timestamp (\`1705317000\`), hoặc format Mỹ (\`"01/15/2024"\`). Mặc định \`time.Time\` không parse được — phải custom.

## 11. Pointer field — phân biệt "không có" vs "zero"

\`\`\`go
type Filter struct {
    Status string \`json:"status"\`
    Limit  int    \`json:"limit"\`
}

// JSON: {"status":""}        → Status="", Limit=0
// JSON: {}                   → Status="", Limit=0
// JSON: {"limit":0}          → Status="", Limit=0
// 3 case trên không phân biệt được nhau!
\`\`\`

Đôi khi \`0\` là giá trị có ý nghĩa (vd \`discount=0\` khác \`discount=null\`). Dùng **pointer**:

\`\`\`go
type Filter struct {
    Status *string \`json:"status"\`
    Limit  *int    \`json:"limit"\`
}

// JSON: {"limit":0}          → Status=nil, Limit=&0
// JSON: {}                   → Status=nil, Limit=nil
\`\`\`

Truy cập phải check nil:

\`\`\`go
if f.Limit != nil {
    fmt.Println("limit set to:", *f.Limit)
} else {
    fmt.Println("limit not set, use default")
}
\`\`\`

> 💡 **Khi nào cần pointer?** PATCH endpoint (sửa một phần record) — phải phân biệt "user chủ động set field về 0" với "user không gửi field đó, giữ nguyên giá trị cũ". Pointer là cách Go thường dùng.

> ⚠ **Lỗi với \`omitempty\`.** Struct zero (kiểu \`time.Time{}\`) **không** bị \`omitempty\` bỏ. Pointer thì có (\`nil\` thoả mãn empty). Đây là lý do nhiều người dùng \`*time.Time\` thay vì \`time.Time\` cho field optional.

> 📝 **Tóm tắt mục 11.** Pointer field → phân biệt "không gửi" (nil) vs "gửi với zero" (deref). Cần cho PATCH API và field optional có ý nghĩa zero.

## 12. Validation — JSON không tự validate

\`Unmarshal\` không check ràng buộc business. Sau khi decode, bạn phải tự kiểm:

\`\`\`go
var req CreateUserRequest
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, "invalid json", 400)
    return
}

// Validate thủ công
if req.Email == "" || !strings.Contains(req.Email, "@") {
    http.Error(w, "invalid email", 400)
    return
}
if req.Age < 0 || req.Age > 150 {
    http.Error(w, "invalid age", 400)
    return
}
\`\`\`

Validate tay nhanh chóng thành rừng if. Tier 4 (Web Backend) sẽ học [go-playground/validator](https://github.com/go-playground/validator):

\`\`\`go
type CreateUserRequest struct {
    Email string \`json:"email" validate:"required,email"\`
    Age   int    \`json:"age"   validate:"gte=0,lte=150"\`
}
// validator.New().Struct(req)  → error tự động nếu vi phạm
\`\`\`

## 13. \`DisallowUnknownFields\` — strict decoding

Mặc định JSON dư field → silently ignored. Trong nội bộ team đôi khi nguy hiểm: client gửi \`usrname\` (typo), server bỏ qua, user không biết tại sao đăng ký không có username.

\`\`\`go
dec := json.NewDecoder(r.Body)
dec.DisallowUnknownFields()

var req CreateUserRequest
if err := dec.Decode(&req); err != nil {
    // Lỗi: json: unknown field "usrname"
    http.Error(w, err.Error(), 400)
    return
}
\`\`\`

Strict mode = fail fast. Tốt cho API nội bộ. Với API public phải cân nhắc — version mới của client có thể gửi field mới mà server cũ chưa biết.

## 14. Performance — \`encoding/json\` chậm, alternative nhanh hơn

\`encoding/json\` dùng **reflection** để đọc tag và set field → flexible nhưng chậm. Benchmark cơ bản:

| Library | Marshal speed | Note |
|---------|--------------|------|
| \`encoding/json\` (stdlib) | ~100 MB/s | Reference, không cần dep |
| \`json-iterator/go\` | ~200 MB/s | Drop-in replacement, API tương thích |
| \`goccy/go-json\` | ~300 MB/s | Optimized reflection |
| \`bytedance/sonic\` | ~500 MB/s | JIT-based, x86_64 only |
| \`easyjson\` (code-gen) | ~600 MB/s | Sinh code Marshal/Unmarshal tĩnh — không reflection |

> ⚠ **Pitfall — premature optimization.** Trong 95% API thực tế, JSON parse KHÔNG phải bottleneck. DB query, network latency mới là. Đừng switch sang sonic/easyjson chỉ vì benchmark trên Twitter. Đo trước, optimize sau.

Khi nào cần optimize:
- Service xử lý JSON throughput cực cao (>1 GB/s) — log ingestion, message broker.
- Hot path serialize/deserialize trong vòng lặp nóng.

> 📝 **Tóm tắt mục 14.** Stdlib đủ tốt cho hầu hết case. Switch khi có bằng chứng JSON là bottleneck (sonic/easyjson nhanh hơn 3-5x).

## 15. Common pitfall — checklist

| # | Pitfall | Hậu quả | Cách tránh |
|---|---------|---------|------------|
| 1 | Quên \`&\` khi Unmarshal | Biến giữ zero, không lỗi compile | Luôn \`&v\` |
| 2 | Field viết thường (private) | JSON bỏ qua silently | Field phải viết hoa |
| 3 | Tag sai chính tả: \`\` \`json:"nmae"\` \`\` | Mapping không hoạt động | Copy tên field cẩn thận, dùng linter |
| 4 | Số 64-bit lớn vào \`interface{}\` | Mất precision (float64) | Dùng struct với \`int64\` hoặc \`UseNumber\` |
| 5 | \`MarshalJSON\` quên quote string | JSON invalid | Wrap \`"..."\` |
| 6 | Map iteration random | Output JSON khác nhau giữa run | Marshal map → field order ordered theo key alphabetical (đã fix từ Go 1.12+) |
| 7 | \`omitempty\` với struct (vd \`time.Time{}\`) | Vẫn xuất ra \`"0001-01-01T..."\` | Dùng \`*time.Time\` |
| 8 | Decode JSON lớn bằng \`ReadAll + Unmarshal\` | RAM spike | \`NewDecoder.Decode\` |
| 9 | Trust JSON input | Crash khi panic / sai logic | Validate sau Unmarshal |
| 10 | Quên \`Content-Type: application/json\` | Client parse lỗi | Set header trước Encode |

> 💡 **Quick check khi gặp bug JSON:**
> 1. Field viết hoa chưa? (lowercase = bị bỏ)
> 2. Có \`&\` trước biến trong Unmarshal chưa?
> 3. Tag spelling đúng chưa?
> 4. Print raw JSON xem có khớp struct không?

## Bài tập

### BT1 — User struct với password ẩn

Cho struct \`User{Name, Email, Age, Password}\`. Yêu cầu:
- Marshal ra JSON với field name lowercase (\`name\`, \`email\`, \`age\`).
- **Không** xuất ra field \`Password\`.
- Field \`Age\` được bỏ nếu bằng 0.

Verify output cho 2 case:
- \`User{Name: "Alice", Email: "a@x.com", Age: 30, Password: "secret"}\`
- \`User{Name: "Bob", Email: "b@x.com", Password: "secret"}\` (Age=0)

### BT2 — Custom date format

Định nghĩa kiểu \`Date\` (wrap \`time.Time\`) với:
- \`MarshalJSON\` → format \`"2006-01-02"\`.
- \`UnmarshalJSON\` → parse \`"2006-01-02"\`.

Test round-trip: marshal rồi unmarshal lại, giá trị phải bằng nhau.

### BT3 — Parse JSON unknown shape

Cho JSON response từ một API external:
\`\`\`json
{
  "status": "ok",
  "data": {
    "users": [
      {"id": 1, "name": "Alice"},
      {"id": 2, "name": "Bob"}
    ],
    "total": 2
  }
}
\`\`\`

Dùng \`map[string]interface{}\`, extract:
- \`status\` → string.
- \`data.total\` → int.
- Tên tất cả users → \`[]string\`.

### BT4 — HTTP echo handler với validation

Viết HTTP handler \`POST /users\` nhận JSON:
\`\`\`json
{"name": "Alice", "email": "a@x.com", "age": 30}
\`\`\`

Yêu cầu:
- Decode bằng \`json.NewDecoder\`.
- Validate: name khác rỗng, email chứa \`@\`, age 0-150.
- Lỗi → trả \`400\` JSON \`{"error":"..."}\`.
- Thành công → trả \`201\` JSON \`{"id":42,"name":"Alice"}\`.
- Set \`Content-Type: application/json\`.

(Không cần chạy thật, chỉ cần code biên dịch được + test bằng \`httptest\`.)

### BT5 — Stream parse NDJSON

Cho file \`users.ndjson\` (mỗi dòng 1 user JSON), kích thước giả định 100MB. Đếm số user có \`age >= 18\` mà **không load cả file vào RAM**.

Dùng \`json.NewDecoder\` và \`dec.More()\`.

### BT6 — Fix 4 đoạn code có pitfall

Tìm và sửa lỗi trong các đoạn sau (mỗi đoạn có đúng 1 lỗi):

**(a)**
\`\`\`go
type user struct {
    Name string \`json:"name"\`
}
u := user{Name: "Alice"}
b, _ := json.Marshal(u)
fmt.Println(string(b))   // expect: {"name":"Alice"}
                          // actual: {}
\`\`\`

**(b)**
\`\`\`go
type User struct {
    name string \`json:"name"\`
}
data := []byte(\`{"name":"Alice"}\`)
var u User
json.Unmarshal(data, &u)
fmt.Println(u.name)   // expect: Alice, actual: ""
\`\`\`

**(c)**
\`\`\`go
type User struct {
    Name string \`json:"name"\`
}
data := []byte(\`{"name":"Alice"}\`)
var u User
json.Unmarshal(data, u)
fmt.Println(u.Name)   // expect: Alice, actual: ""
\`\`\`

**(d)**
\`\`\`go
type User struct {
    Email string \`json:"emial"\`   // ← cố tình
}
u := User{Email: "a@x.com"}
b, _ := json.Marshal(u)
// API yêu cầu key "email", nhưng output là "emial"
\`\`\`

## Lời giải chi tiết

### Giải BT1

\`\`\`go
type User struct {
    Name     string \`json:"name"\`
    Email    string \`json:"email"\`
    Age      int    \`json:"age,omitempty"\`
    Password string \`json:"-"\`
}
\`\`\`

Phân tích:
- \`json:"name"\` — đổi \`Name\` → \`name\`. Tương tự \`email\`.
- \`json:"age,omitempty"\` — \`Age=0\` sẽ bị bỏ qua.
- \`json:"-"\` — \`Password\` không bao giờ xuất hiện trong JSON.

Output:

\`\`\`go
u1 := User{Name: "Alice", Email: "a@x.com", Age: 30, Password: "secret"}
b1, _ := json.Marshal(u1)
// {"name":"Alice","email":"a@x.com","age":30}

u2 := User{Name: "Bob", Email: "b@x.com", Password: "secret"}
b2, _ := json.Marshal(u2)
// {"name":"Bob","email":"b@x.com"}    ← age=0 bị bỏ
\`\`\`

### Giải BT2

\`\`\`go
const dateLayout = "2006-01-02"

type Date struct{ time.Time }

func (d Date) MarshalJSON() ([]byte, error) {
    return []byte(\`"\` + d.Format(dateLayout) + \`"\`), nil
}

func (d *Date) UnmarshalJSON(b []byte) error {
    s := strings.Trim(string(b), \`"\`)
    if s == "" || s == "null" {
        return nil
    }
    t, err := time.Parse(dateLayout, s)
    if err != nil {
        return err
    }
    d.Time = t
    return nil
}
\`\`\`

Cách tiếp cận:
- Embed \`time.Time\` → kế thừa method \`Format\`, không phải viết lại.
- \`MarshalJSON\` chú ý 2 thứ: gọi \`Format(dateLayout)\` để được \`"2024-01-15"\`, rồi wrap trong \`"..."\` vì JSON string phải có quote.
- \`UnmarshalJSON\` strip quote, kiểm \`null\`, rồi \`Parse\`.

Round-trip test:
\`\`\`go
d1 := Date{time.Date(2024, 1, 15, 0, 0, 0, 0, time.UTC)}
b, _ := json.Marshal(d1)            // \`"2024-01-15"\`
var d2 Date
_ = json.Unmarshal(b, &d2)
fmt.Println(d1.Equal(d2.Time))      // true
\`\`\`

### Giải BT3

\`\`\`go
data := []byte(\`{
  "status": "ok",
  "data": {"users": [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}], "total": 2}
}\`)

var m map[string]interface{}
_ = json.Unmarshal(data, &m)

// status
status := m["status"].(string)

// data.total — số JSON → float64
data2 := m["data"].(map[string]interface{})
total := int(data2["total"].(float64))

// users[].name
users := data2["users"].([]interface{})
names := make([]string, 0, len(users))
for _, u := range users {
    user := u.(map[string]interface{})
    names = append(names, user["name"].(string))
}

fmt.Println(status, total, names)
// ok 2 [Alice Bob]
\`\`\`

Cách tiếp cận:
- Cấp 1: \`map[string]interface{}\`.
- Cấp 2 (nested object): type-assert sang \`map[string]interface{}\`.
- Array: type-assert sang \`[]interface{}\`.
- Number: nhớ \`float64\` rồi convert int.

Code dài và dễ panic nếu thiếu key — production thực tế sẽ wrap trong helper hoặc dùng struct.

### Giải BT4

\`\`\`go
type CreateUserRequest struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
}

type CreateUserResponse struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

type ErrorResponse struct {
    Error string \`json:"error"\`
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(v)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid json"})
        return
    }

    // Validate
    if req.Name == "" {
        writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "name required"})
        return
    }
    if !strings.Contains(req.Email, "@") {
        writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid email"})
        return
    }
    if req.Age < 0 || req.Age > 150 {
        writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid age"})
        return
    }

    // Giả lập tạo user
    resp := CreateUserResponse{ID: 42, Name: req.Name}
    writeJSON(w, http.StatusCreated, resp)
}
\`\`\`

Test với \`httptest\`:
\`\`\`go
body := strings.NewReader(\`{"name":"Alice","email":"a@x.com","age":30}\`)
r := httptest.NewRequest("POST", "/users", body)
w := httptest.NewRecorder()
createUser(w, r)
fmt.Println(w.Code, w.Body.String())
// 201 {"id":42,"name":"Alice"}
\`\`\`

### Giải BT5

\`\`\`go
func countAdults(path string) (int, error) {
    f, err := os.Open(path)
    if err != nil {
        return 0, err
    }
    defer f.Close()

    type User struct {
        Age int \`json:"age"\`
    }

    dec := json.NewDecoder(f)
    count := 0
    for dec.More() {
        var u User
        if err := dec.Decode(&u); err != nil {
            return count, err
        }
        if u.Age >= 18 {
            count++
        }
    }
    return count, nil
}
\`\`\`

Cách tiếp cận:
- \`dec.More()\` — còn JSON value chưa đọc?
- \`dec.Decode(&u)\` — đọc đúng 1 object, dừng lại.
- Lặp đến hết → mỗi lần chỉ 1 object trong RAM (vài trăm byte), không phải 100MB.

Độ phức tạp:
- Time: $O(N)$ với N số user.
- Space: $O(1)$ — không phụ thuộc N. Đây là điểm mấu chốt: stream giúp xử lý file lớn hơn RAM.

### Giải BT6

**(a)** Type \`user\` viết thường → JSON OK (type không cần exported), nhưng nếu test thật code này print đúng \`{"name":"Alice"}\`. **Đề bài thật sự muốn:** field viết thường mới gây vấn đề. Đoán lỗi: code có thể thiếu \`Name\` ở instance, hoặc tag không khớp. Sau khi review thì đoạn (a) như viết trong đề: \`type user\` (private type) hoàn toàn marshal được. Lỗi thật khả dĩ là \`name string\` (chữ thường). Sửa:

\`\`\`go
type User struct {
    Name string \`json:"name"\`
}
u := User{Name: "Alice"}
b, _ := json.Marshal(u)
fmt.Println(string(b))   // {"name":"Alice"}
\`\`\`

Quy tắc cốt lõi: **field phải viết hoa** mới được encode/decode. (Type tên có thể viết thường, không ảnh hưởng.)

**(b)** Field \`name\` viết thường → \`Unmarshal\` không set được. Sửa: viết hoa.

\`\`\`go
type User struct {
    Name string \`json:"name"\`
}
\`\`\`

**(c)** Truyền \`u\` không có \`&\` → \`Unmarshal\` nhận tham trị, không sửa được biến gốc. Sửa:

\`\`\`go
json.Unmarshal(data, &u)
\`\`\`

**(d)** Tag sai chính tả \`"emial"\` → JSON output có key \`"emial"\`, API mong \`"email"\` sẽ không nhận. Sửa:

\`\`\`go
type User struct {
    Email string \`json:"email"\`
}
\`\`\`

> 💡 **Bài học chung:** 4 lỗi này là 4 lỗi top khi làm việc với JSON Go. Đáng học thuộc.

## Code & Minh hoạ

- [solutions.go](./solutions.go) — code Go biên dịch được, cover Marshal/Unmarshal/Tag/CustomMarshaler/Streaming/RawMessage/Pointer field.
- [visualization.html](./visualization.html) — 3 module tương tác:
  - Module 1 (**Struct ↔ JSON**): toggle tag (\`omitempty\`, đổi tên, \`-\`) thấy output JSON đổi live.
  - Module 2 (**Unmarshal flow**): animate decode từng field, highlight field thiếu / dư.
  - Module 3 (**Stream vs Load-all**): so sánh RAM usage giữa \`ReadAll+Unmarshal\` (spike 100MB) và \`Decoder\` (~10KB constant).

## Bài tiếp theo

[Lesson 24 — Regex & Text Processing](../lesson-24-regex-text-processing/) — sau JSON, công cụ text processing thứ hai mọi backend cần: regular expression (\`regexp\` package).

Tham khảo thêm:
- [Go Blog — JSON and Go (Andrew Gerrand)](https://go.dev/blog/json)
- [\`encoding/json\` godoc](https://pkg.go.dev/encoding/json)
- [\`json-iterator/go\`](https://github.com/json-iterator/go) — drop-in faster alternative.
- [\`easyjson\`](https://github.com/mailru/easyjson) — code-gen approach.
`;
