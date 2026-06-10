# Lesson 39 — Design Patterns trong Go: Idioms thực dụng

> **Tier 3 — Advanced.** Trước đây bạn đã biết cú pháp (Tier 1), tổ chức code (Tier 2), concurrency và testing (Tier 3 phần đầu). Bài này tổng hợp các *pattern thiết kế* mà cộng đồng Go dùng hằng ngày — không phải bê y nguyên 23 pattern GoF kiểu Java, mà là những *idiom* đã được "Go-hoá" cho phù hợp với composition, interface implicit, và error-as-value.

## Mục tiêu học tập

Sau bài này bạn:

1. Hiểu **tại sao Go khác Java/C#**: không class, không inheritance, không exception. Hệ quả: nhiều pattern truyền thống biến mất hoặc được viết lại khác.
2. Áp dụng được **Functional Options** cho mọi constructor có > 3 tham số tuỳ chọn.
3. Phân biệt **Builder vs Functional Options vs Constructor đơn thuần** — chọn cái nào, khi nào.
4. Viết được **middleware chain** (decorator) kiểu `http.Handler` và hiểu *trật tự bao gói*.
5. Thiết kế **Strategy / Observer / Repository / Adapter / Null Object** theo phong cách Go.
6. Phát hiện 4 anti-pattern phổ biến: over-abstraction, god object, premature generic, Java-style getter/setter.
7. Có một **checklist 10 dòng** kiểm tra idiomatic-Go trước khi merge code.

## Kiến thức tiền đề

- [Lesson 15 — Struct & Method](../lesson-15-struct-method/)
- [Lesson 16 — Pointers](../lesson-16-pointers/)
- [Lesson 18 — Interfaces](../lesson-18-interfaces/) — **bắt buộc** đọc kỹ trước khi vào bài này.
- [Lesson 19 — Errors](../lesson-19-errors/) — error-as-value là tinh thần chung của Go.
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — cho phần Pub-Sub.
- [Lesson 38 — Mocking](../lesson-38-mocking-test-doubles/) — Repository pattern liên kết chặt với việc test thay thế.

---

## 1. Vì sao Go cần "design patterns" khác Java/C#

> 💡 **Trực giác.** "Design pattern" gốc (GoF 1994) là *giải pháp lặp đi lặp lại cho vấn đề OOP có inheritance*. Go không có inheritance, error là value, interface implicit — nên một nửa số pattern GoF biến mất hoặc đổi hình dạng. Cái còn lại được đơn giản hoá đáng kể.

### 1.1 Ba khác biệt cốt lõi của Go

| Đặc điểm | Java/C# | Go | Hệ quả với pattern |
|----------|---------|-----|--------------------|
| Inheritance | Có (`extends`) | Không. Chỉ có embedding | Template Method gần như biến mất. Composition là mặc định |
| Error | Exception (`try/catch`) | Value (`if err != nil`) | Chain of Responsibility kiểu "throw lên trên" không có |
| Interface | Tường minh (`implements`) | Implicit (duck typing tĩnh) | Adapter rút gọn còn 1 hàm. Strategy không cần factory phụ |
| Constructor | Ngôn ngữ-level | Hàm `NewFoo(...)` thường | Builder và Factory đều chỉ là function pattern |
| Visibility | `public/private/protected` | Viết hoa = exported | Encapsulation đơn giản hơn |

### 1.2 Ví dụ: tạo HTTP server với nhiều cấu hình

**Cách Go non-idiomatic (positional args):**
```go
s := NewServer("0.0.0.0", 9090, true, "cert.pem", "key.pem", 30*time.Second, 1000, true, nil)
//              ^host  ^port ^tls   ^cert        ^key       ^readT      ^maxConn ^?  ^logger
// Nhìn vào không hiểu tham số thứ 7 là gì, thêm option mới = breaking change.
```

**Cách Go idiomatic (Functional Options):**
```go
s := NewServer(
    WithPort(9090),
    WithTLS("cert.pem", "key.pem"),
    WithReadTimeout(30 * time.Second),
    WithMaxConns(1000),
)
```
Đọc ra ý đồ, default tự lo, thêm option mới không phá API cũ.

> ❓ **Câu hỏi tự nhiên.** *"23 pattern GoF vô dụng với Go?"* — Không hẳn. Khoảng 8–10 pattern (Strategy, Observer, Decorator, Adapter, Factory, Singleton, Composite, State) vẫn dùng được, nhưng *cách viết* rất khác.

> 📝 **Tóm tắt mục 1.** Go thiếu inheritance + exception + tường minh interface ⇒ pattern phải viết lại. Tinh thần: ưu tiên *function* và *interface nhỏ* thay vì *class* và *kế thừa nhiều tầng*.

---

## 2. Functional Options Pattern

> 💡 **Trực giác.** Tưởng tượng đặt một chiếc pizza. Cách tệ: `Pizza(true, false, true, false, "thin", 12, true)` — không ai nhớ tham số nào là gì. Cách tốt: `Pizza(Topping("pepperoni"), Crust("thin"), Size(12), ExtraCheese())` — mỗi "option" là một câu lệnh có tên, có thể bỏ, có thể thêm.

### 2.1 Vấn đề: hàm khởi tạo "ngộp" tham số

```go
func NewServer(host string, port int, tls bool, certFile, keyFile string,
    readTimeout, writeTimeout time.Duration, maxConns int, logger *log.Logger) *Server { ... }

s := NewServer("0.0.0.0", 8080, false, "", "", 5*time.Second, 5*time.Second, 100, nil)
```

Vấn đề thực tế:
1. **Default không express được**: phải truyền zero-value cho cái không quan tâm.
2. **Thêm option = breaking change**: thêm tham số thứ 10 phá vỡ mọi call-site.
3. **Đọc khó**: `false, "", ""` không biết tham số nào là tham số nào.

### 2.2 Pattern: mỗi option là một function

```go
type Server struct {
    host, certFile, keyFile string
    port, maxConns          int
    tls                     bool
    readTimeout, writeTimeout time.Duration
    logger                  *log.Logger
}
type Option func(*Server)  // closure sửa đổi Server

func WithHost(h string) Option                { return func(s *Server) { s.host = h } }
func WithPort(p int) Option                   { return func(s *Server) { s.port = p } }
func WithTLS(cert, key string) Option         { return func(s *Server) { s.tls = true; s.certFile = cert; s.keyFile = key } }
func WithReadTimeout(d time.Duration) Option  { return func(s *Server) { s.readTimeout = d } }
func WithMaxConns(n int) Option               { return func(s *Server) { s.maxConns = n } }

func NewServer(opts ...Option) *Server {
    s := &Server{                       // (1) default tốt
        host: "0.0.0.0", port: 8080,
        readTimeout: 5 * time.Second, writeTimeout: 5 * time.Second,
        maxConns: 100, logger: log.Default(),
    }
    for _, o := range opts { o(s) }     // (2) áp option
    return s                            // (3) ready
}

// Sử dụng:
s1 := NewServer()                                          // default
s2 := NewServer(WithPort(9090))                            // override port
s3 := NewServer(WithPort(9090), WithTLS("c.pem", "k.pem")) // thêm TLS
```

### 2.3 Walk-through

Gọi `NewServer(WithPort(9090), WithTLS("c.pem", "k.pem"))`:
```
Bước 0: s = &Server{host:"0.0.0.0", port:8080, ...}              ← default
Bước 1: opts[0] → s.port = 9090
Bước 2: opts[1] → s.tls = true; s.certFile = "c.pem"; ...
Bước 3: return s = &Server{port:9090, tls:true, certFile:"c.pem", ...}
```

> ❓ **Câu hỏi tự nhiên.** *"Order option có quan trọng không?"* — Có, sau-ghi-đè-trước. `NewServer(WithPort(9090), WithPort(7070))` → port = 7070. Cần lỗi khi conflict thì dùng variant trả error (xem 2.6).

### 2.4 Khi nào dùng Functional Options

| Tình huống | Dùng FO? |
|------------|---------|
| Constructor có > 3 tham số tuỳ chọn | ✅ Mạnh mẽ |
| Cần extensible API (sẽ thêm option về sau) | ✅ Bắt buộc |
| Constructor có 1-2 tham số *bắt buộc* | Truyền positional: `NewServer(addr, opts...)` |
| Mọi tham số đều bắt buộc | ❌ Dùng struct literal thường |
| Cần validate ngay (vd port phải 1–65535) | ✅ Variant trả error |

### 2.5 So với "config struct"

```go
type ServerConfig struct { Host string; Port int; ReadTimeout time.Duration }
func NewServer(cfg ServerConfig) *Server { ... }
s := NewServer(ServerConfig{Port: 9090})  // các field khác = zero
```

| | Config struct | Functional Options |
|---|---|---|
| Phân biệt "chưa set" vs "set zero" | ❌ Khó (cần `*int`) | ✅ Option không gọi = chưa set |
| Doc cho từng option | Field comment | Function GoDoc — chi tiết hơn |
| Validate khi build | Gọi `cfg.Validate()` riêng | Option có thể trả error |
| Tương thích ngược | Thêm field mới = OK | Thêm option = OK |
| Code khởi tạo gọn | ✅ Hơn khi nhiều field | Verbose hơn 1 chút |

⚠ **Lỗi thường gặp.** Trộn cả 2 cách: `NewServer(cfg, WithPort(9090))` — gây confusion về thứ tự override. Chọn một, gắn bó với nó.

### 2.6 Variant: option có thể trả error

```go
type Option func(*Server) error
func WithPort(p int) Option {
    return func(s *Server) error {
        if p < 1 || p > 65535 { return fmt.Errorf("port out of range: %d", p) }
        s.port = p; return nil
    }
}
func NewServer(opts ...Option) (*Server, error) {
    s := &Server{port: 8080}
    for _, o := range opts {
        if err := o(s); err != nil { return nil, err }
    }
    return s, nil
}
```
Dùng khi option có invariant cần check sớm.

> 🔁 **Tự kiểm tra.** *Đoán output:* `NewServer(WithPort(9090), WithPort(3000), WithReadTimeout(10*time.Second))`?
> <details><summary>Đáp án</summary>port=3000, readTimeout=10s — option sau ghi đè option trước.</details>

> 📝 **Tóm tắt mục 2.** FO = mỗi tham số tuỳ chọn là một function `func(*T)`. Constructor nhận `...Option`. Lợi: tự documenting, extensible, default tốt. Dùng khi > 3 tuỳ chọn hoặc cần ổn định API.

---

## 3. "Accept interfaces, return structs"

> 💡 **Trực giác.** Khi *nhận* (input), chấp nhận càng nhiều loại càng tốt — interface. Khi *trả* (output), cho caller biết chính xác họ nhận được gì — struct concrete. Rob Pike: *"be liberal in what you accept, conservative in what you produce."*

### 3.1 Pattern

```go
// ✅ Tốt:
func ReadAll(r io.Reader) ([]byte, error) { ... }
// nhận io.Reader — bất cứ thứ gì có Read (file, network, bytes.Buffer, ...)

func NewBuffer() *bytes.Buffer { ... }
// trả *bytes.Buffer concrete — caller biết có method gì, IDE auto-complete đầy đủ

// ❌ Tệ:
func ReadAll(r *os.File) { ... }   // ép phải truyền *os.File — không test với bytes.Buffer
func NewBuffer() io.Writer { ... } // ẩn `Bytes()`, `Len()`, `Reset()` — caller phải type-assert
```

### 3.2 Vì sao trả struct, không trả interface

1. **Type info đầy đủ**: caller thấy mọi method, không bị giấu.
2. **Không bị premature abstraction**: nếu sau cần interface, *caller* định nghĩa được.
3. **godoc / IDE friendly**: click vào xem field/method ngay.

### 3.3 Ngoại lệ: khi nào *được* trả interface

| Tình huống | Ví dụ |
|------------|------|
| Nhiều implementation, factory chọn dựa theo tham số | `image.Decode(r) (image.Image, ...)` |
| Trả `error` (interface phổ biến nhất Go) | `func Do() error` |
| Trả `io.Reader`/`io.Closer` để giấu nguồn gốc | `func Open() (io.ReadCloser, error)` |
| Sealed interface (chỉ package này impl được) | `driver.Conn` |

⚠ **Lỗi thường gặp.** "Tôi trả interface để caller dễ test" — sai. Caller có thể tự định nghĩa interface trên struct của bạn (structural typing). Bạn không cần *làm hộ*.

> ❓ **Câu hỏi tự nhiên.** *"`error` là interface, tôi nên trả `*MyError` cho concrete?"* — Không. Trả `error` là chuẩn; caller dùng `errors.As(err, &target)` để lấy lại concrete. Trả concrete error gây nightmare với nil check (interface nil ≠ typed nil).

> 📝 **Tóm tắt mục 3.** Input → interface (linh hoạt). Output → struct concrete (rõ ràng). Ngoại lệ chính: `error`, factory đa-impl, sealed interface.

---

## 4. Composition over Inheritance

> 💡 **Trực giác.** Inheritance nói "A *là* B". Composition nói "A *có* một B". Go cưỡng bức bạn dùng composition vì không có inheritance. Code dễ refactor hơn — quan hệ "có" tháo lắp được, quan hệ "là" khoá cứng.

### 4.1 Inheritance kiểu Java
```java
class Animal { String name; void speak() {...} }
class Dog extends Animal { @Override void speak() {...} }
class Husky extends Dog { ... }
```
Vấn đề kinh điển: *fragile base class* — sửa `Animal.speak()` có thể vô tình phá `Husky`.

### 4.2 Composition + Interface trong Go

```go
// Trait chia sẻ — embed vào struct cần.
type Named struct{ Name string }
func (n Named) WhoAmI() string { return n.Name }

// Behaviour — interface nhỏ.
type Speaker interface { Speak() string }

type Dog struct {
    Named               // embedded — "Dog có một Named"
    Breed string
}
func (d Dog) Speak() string { return d.Name + " sủa: Woof!" }

type Cat struct { Named; Indoor bool }
func (c Cat) Speak() string { return c.Name + " meo: Meow~" }

func Announce(s Speaker) { fmt.Println(s.Speak()) }
Announce(Dog{Named: Named{"Rex"}, Breed: "Husky"})
Announce(Cat{Named: Named{"Mun"}, Indoor: true})
```

### 4.3 Embedding khác inheritance ở điểm nào?

| | Inheritance (Java) | Embedding (Go) |
|---|---|---|
| Method gọi qua subtype | Kế thừa, `@Override` được | *Promoted*, không override (nhưng shadow được) |
| Polymorphism | Subtype substitution | Chỉ qua interface satisfaction |
| Diamond problem | Có | Không (collision báo lỗi compile) |
| `super.foo()` | Có | Gọi tường minh `d.Named.WhoAmI()` |
| Mental model | "Dog is-a Animal" | "Dog has-a Named" |

### 4.4 Shadow method khi cần "override"

```go
type Base struct{}
func (Base) Greet() string { return "hello from base" }
type Sub struct{ Base }
func (Sub) Greet() string { return "hello from sub" } // shadow

s := Sub{}
fmt.Println(s.Greet())       // "hello from sub"
fmt.Println(s.Base.Greet())  // "hello from base"  ← gọi tường minh
```

> ⚠ **Lỗi thường gặp.** Tưởng `Sub.Greet()` *override* `Base.Greet()` ở mọi nơi. Sai — nếu hàm nhận concrete `Base`, nó gọi `Base.Greet()` ngay cả khi value đến từ `Sub`. Chỉ qua interface mới có dispatch động.

> 📝 **Tóm tắt mục 4.** Embedding = composition + method promotion. Polymorphism = interface. Không có inheritance, không có super, nhưng có method shadowing.

---

## 5. Builder Pattern

> 💡 **Trực giác.** Builder = "đi từng bước, mỗi bước trả lại chính object cho bước tiếp theo". Khác Functional Options ở chỗ: builder *có state trung gian*, mỗi method có thể validate dựa trên state hiện tại.

### 5.1 Pattern: chain method với pointer receiver

```go
type Query struct {
    table, orderBy string
    where          []string
    limit          int
}
func NewQuery(t string) *Query           { return &Query{table: t, limit: -1} }
func (q *Query) Where(c string) *Query   { q.where = append(q.where, c); return q }
func (q *Query) OrderBy(c string) *Query { q.orderBy = c; return q }
func (q *Query) Limit(n int) *Query      { q.limit = n; return q }
func (q *Query) Build() string {
    sql := "SELECT * FROM " + q.table
    if len(q.where) > 0 { sql += " WHERE " + strings.Join(q.where, " AND ") }
    if q.orderBy != ""  { sql += " ORDER BY " + q.orderBy }
    if q.limit >= 0     { sql += fmt.Sprintf(" LIMIT %d", q.limit) }
    return sql
}

// Sử dụng:
sql := NewQuery("users").Where("age > 18").Where("active = true").
    OrderBy("created_at DESC").Limit(10).Build()
// → SELECT * FROM users WHERE age > 18 AND active = true ORDER BY created_at DESC LIMIT 10
```

### 5.2 Builder vs Functional Options

| Yếu tố | Builder | Functional Options |
|--------|---------|--------------------|
| Có thứ tự bắt buộc (set A trước B) | ✅ | ❌ Khó express |
| Cùng option set nhiều lần (append) | ✅ State tích luỹ | ⚠ Phải nhớ semantics |
| Hỗ trợ error giữa chừng | Awkward | ✅ Variant `Option func(*T) error` |
| Quen thuộc với người từ Java | ✅ Rất | Lạ ban đầu |
| Idiomatic Go | OK trong DSL | ✅ Hơn cho constructor |

**Quy tắc rút gọn**: DSL (query, mock setup) → Builder. Constructor config → Functional Options.

⚠ **Lỗi thường gặp.** Trộn `*T` (pointer) và `T` (value) receiver trong cùng builder. Value receiver chain trả về *copy* — sửa không ảnh hưởng original.

> ❓ **Câu hỏi tự nhiên.** *"Method chain trả `*Query` — nếu lỗi giữa chừng?"* — 2 trường phái: (1) panic ngay (DSL như `gorm` cũ); (2) tích luỹ error vào field `err`, mỗi method check `if q.err != nil { return q }`. Trường phái (2) tốt hơn cho production.

> 📝 **Tóm tắt mục 5.** Builder = method chain với pointer receiver, kết thúc bằng `.Build()`. Tốt cho DSL có state tích luỹ và validate theo bước.

---

## 6. Strategy Pattern

> 💡 **Trực giác.** Cùng một bài toán, nhiều thuật toán giải. Strategy = "tách thuật toán khỏi caller, để swap được". Trong Go, đơn giản là một interface với 1-2 method.

### 6.1 Vấn đề: hard-coded algorithm

```go
func SaveBlob(data []byte, path string) error {
    // luôn nén bằng gzip — muốn dùng zstd phải sửa hàm này
    var buf bytes.Buffer
    gw := gzip.NewWriter(&buf); gw.Write(data); gw.Close()
    return os.WriteFile(path, buf.Bytes(), 0644)
}
```

### 6.2 Pattern: interface + concrete impl

```go
type Compressor interface {
    Compress(src []byte) ([]byte, error)
    Name() string
}

type GzipCompressor struct{ Level int }
func (g GzipCompressor) Compress(src []byte) ([]byte, error) {
    var buf bytes.Buffer
    gw, _ := gzip.NewWriterLevel(&buf, g.Level)
    if _, err := gw.Write(src); err != nil { return nil, err }
    if err := gw.Close(); err != nil { return nil, err }
    return buf.Bytes(), nil
}
func (GzipCompressor) Name() string { return "gzip" }

type NoOpCompressor struct{}
func (NoOpCompressor) Compress(src []byte) ([]byte, error) { return src, nil }
func (NoOpCompressor) Name() string                         { return "none" }

// Caller phụ thuộc interface — swap runtime:
func SaveBlob(c Compressor, data []byte, path string) error {
    out, err := c.Compress(data); if err != nil { return err }
    return os.WriteFile(path+"."+c.Name(), out, 0644)
}
SaveBlob(GzipCompressor{Level: 6}, payload, "/tmp/blob")
SaveBlob(NoOpCompressor{},         payload, "/tmp/blob")
```

### 6.3 Khi nào dùng Strategy

| Dấu hiệu | Có nên dùng? |
|----------|--------------|
| Có ≥ 2 thuật toán cùng input/output | ✅ |
| Lựa chọn algorithm tại runtime (config, flag) | ✅ |
| Chỉ có 1 algorithm, *có thể* thêm sau | ⚠ YAGNI — chờ đến khi cần thật |
| Algorithm cực đơn giản (1 dòng) | ❌ Hàm thường ổn hơn |

> ⚠ **Lỗi thường gặp.** Tạo interface `Doer { Do() }` với 1 implementation duy nhất "phòng khi sau này có cái thứ 2". Đó là *premature abstraction* — xem mục 14.1.

> 📝 **Tóm tắt mục 6.** Strategy = interface nhỏ + nhiều struct impl. Caller phụ thuộc interface, swap được runtime.

---

## 7. Observer / Pub-Sub với Channel

> 💡 **Trực giác.** Observer = "khi tôi đổi, hãy báo cho mọi subscriber". Trong Go, không cần Observable class với `registerListener` — dùng channel: publisher đẩy event vào channel, mỗi subscriber có channel riêng.

### 7.1 Pattern Pub-Sub đơn giản

```go
type Broker[T any] struct {
    mu   sync.Mutex
    subs map[int]chan T
    next int
}
func NewBroker[T any]() *Broker[T] { return &Broker[T]{subs: make(map[int]chan T)} }

// Subscribe trả channel + hàm unsub (idempotent).
func (b *Broker[T]) Subscribe(buf int) (<-chan T, func()) {
    b.mu.Lock(); defer b.mu.Unlock()
    id := b.next; b.next++
    ch := make(chan T, buf)
    b.subs[id] = ch
    return ch, func() {
        b.mu.Lock(); defer b.mu.Unlock()
        if c, ok := b.subs[id]; ok { delete(b.subs, id); close(c) }
    }
}

// Publish gửi event tới mọi sub. Sub đầy buffer → drop (không block hệ thống).
func (b *Broker[T]) Publish(ev T) {
    b.mu.Lock(); defer b.mu.Unlock()
    for _, ch := range b.subs {
        select { case ch <- ev: default: /* sub chậm → drop */ }
    }
}
```

### 7.2 Walk-through cụ thể

```go
broker := NewBroker[string]()
ch1, unsub1 := broker.Subscribe(4)
ch2, _      := broker.Subscribe(4)
go func() { for ev := range ch1 { fmt.Println("S1:", ev) } }()
go func() { for ev := range ch2 { fmt.Println("S2:", ev) } }()

broker.Publish("login")    // S1: login    S2: login
broker.Publish("checkout") // S1: checkout S2: checkout
unsub1()                   // ch1 đóng, S1 thoát vòng for
broker.Publish("logout")   // chỉ S2 nhận
```

### 7.3 Cân nhắc trong production

| Vấn đề | Cách xử lý |
|--------|-----------|
| Sub chậm chặn publish | Buffered channel + `select-default` drop, hoặc gửi qua goroutine có timeout |
| Đảm bảo at-least-once | Channel không đủ — cần queue persistent (NATS, Kafka, Redis Streams) |
| Backpressure | Bounded buffer + monitor depth |
| Race khi unsub đúng lúc publish | Khoá `mu` quanh cả 2 thao tác như code trên |
| Memory leak khi sub không unsub | Document rõ + dùng `context.Context` để auto-clean |

⚠ **Lỗi thường gặp.** Quên `close(ch)` khi unsub → consumer `for ev := range ch` treo mãi mãi. Hoặc `close` 2 lần (panic). Pattern an toàn: chỉ broker close channel — subscriber không bao giờ close channel nó nhận.

> 📝 **Tóm tắt mục 7.** Observer kiểu Go = broker với map `subs[id]chan T`, Subscribe trả channel + closure unsub. Channel + mutex thay cho `notifyAll` của Java.

---

## 8. Decorator: Middleware Chain

> 💡 **Trực giác.** Decorator = "bao gói một thứ bằng lớp khác mà giữ nguyên interface". Trong Go HTTP server, decorator chính là middleware: `func(http.Handler) http.Handler`. Mỗi middleware nhận handler "ruột", trả về handler "ngoài" wrap thêm logic.

### 8.1 Pattern

```go
type Middleware func(http.Handler) http.Handler

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        log.Printf("→ %s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
        log.Printf("← %s %s (%s)", r.Method, r.URL.Path, time.Since(start))
    })
}

func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
            return  // KHÔNG gọi next → chain dừng tại đây
        }
        next.ServeHTTP(w, r)
    })
}

func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("panic: %v", rec)
                http.Error(w, "internal", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

// Composition: ngoài-cùng-bao-trong-cùng
handler := Recover(Logger(Auth(myAPI)))
// Request flow: Recover → Logger → Auth → myAPI → Auth → Logger → Recover
```

### 8.2 Walk-through trật tự gọi

Khi `handler.ServeHTTP(w, r)`:
```
1. Recover — defer recover() set
2.   → Logger — log "→ GET /users"
3.     → Auth — check token OK
4.       → myAPI — xử lý; w.Write("ok")
5.       ← Auth return
6.     ← Logger log "← GET /users (1.2ms)"
7. ← Recover defer — không panic, no-op
```
Nếu Auth fail tại bước 3: gọi `http.Error` rồi `return` → bước 4 *không* chạy. Bước 5-7 vẫn chạy bình thường.

### 8.3 Helper compose

```go
func Chain(h http.Handler, mws ...Middleware) http.Handler {
    // Áp dụng theo thứ tự ngược để Chain(h, A, B, C) = A(B(C(h)))
    for i := len(mws) - 1; i >= 0; i-- {
        h = mws[i](h)
    }
    return h
}
handler := Chain(myAPI, Recover, Logger, Auth)
// Tương đương: Recover(Logger(Auth(myAPI)))
```

> ❓ **Câu hỏi tự nhiên.** *"Logger trước hay Recover trước?"* — Recover ở **ngoài cùng** để bắt panic từ bất kỳ middleware bên trong. Auth ở **trong cùng** trước business để chặn sớm.

> ⚠ **Lỗi thường gặp.** Quên trả `http.HandlerFunc(...)`. `func(w,r) {...}` không thoả `http.Handler` — phải bọc `http.HandlerFunc(...)` (đây chính là Adapter, xem mục 9).

> 📝 **Tóm tắt mục 8.** Middleware = `func(http.Handler) http.Handler`. Compose từ trong ra ngoài, request đi outer→inner→outer. Phổ biến ở chi, gin, echo.

---

## 9. Adapter Pattern

> 💡 **Trực giác.** Adapter = "tôi có function/struct với signature A, cần dùng như interface B" → tạo wrapper biến A thành B. Trong Go, do interface implicit, adapter thường chỉ là *một type alias + một method*.

### 9.1 Ví dụ kinh điển trong stdlib: `http.HandlerFunc`

```go
type Handler interface { ServeHTTP(ResponseWriter, *Request) }

// Adapter biến function thường thành Handler:
type HandlerFunc func(ResponseWriter, *Request)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) { f(w, r) }

http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("hi"))
}))
```
`HandlerFunc(f)` là *type conversion*, không phải gọi function. Nó tạo value `HandlerFunc` (alias của function) có method `ServeHTTP`.

### 9.2 Adapter cho thư viện khác signature

Có thư viện legacy `func OldLog(level int, msg string)`, muốn dùng như `slog.Handler`:
```go
type oldLogAdapter struct{}
func (oldLogAdapter) Enabled(_ context.Context, _ slog.Level) bool { return true }
func (oldLogAdapter) Handle(_ context.Context, r slog.Record) error {
    OldLog(int(r.Level), r.Message); return nil
}
func (a oldLogAdapter) WithAttrs(_ []slog.Attr) slog.Handler { return a }
func (a oldLogAdapter) WithGroup(_ string) slog.Handler      { return a }
```

### 9.3 Method value làm adapter ngược

Method value tự là function — không cần wrapper:
```go
sort.Slice(items, mySorter.Less)
// mySorter.Less là func(i,j int) bool ngay tại biểu thức này.
```

> ❓ **Câu hỏi tự nhiên.** *"Adapter khác Decorator chỗ nào?"* — Decorator giữ *nguyên signature*, thêm hành vi. Adapter *đổi signature* (A → B). Cả hai trong Go đều 1-2 method.

> 📝 **Tóm tắt mục 9.** Adapter = biến signature A thành B. Pattern Go tiêu biểu: `type Fn func(...); func (f Fn) Method(...) { f(...) }`.

---

## 10. Singleton với `sync.Once`

> 💡 **Trực giác.** Singleton = "chỉ tồn tại 1 instance toàn process". 2 cách trong Go: package-level var với `init()`, hoặc `sync.Once` cho lazy init. `sync.Once` đảm bảo function bên trong chạy đúng 1 lần kể cả 1000 goroutine gọi đồng thời.

### 10.1 Pattern lazy với `sync.Once`

```go
var (
    once sync.Once
    db   *sql.DB
)
func GetDB() *sql.DB {
    once.Do(func() {
        var err error
        db, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
        if err != nil { log.Fatal(err) }
    })
    return db
}
```

### 10.2 Pattern eager với package var

```go
var DB = mustConnect()
func mustConnect() *sql.DB {
    db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
    if err != nil { log.Fatal(err) }
    return db
}
```

| | Lazy (`sync.Once`) | Eager (package var) |
|---|---|---|
| Khởi tạo khi | Lần gọi đầu | Khi import package |
| Test có thể bypass? | Có (override `db` trước) | Khó hơn — mọi test connect |
| Process start nhanh | ✅ | ❌ (chậm nếu DB chưa sẵn) |
| Phù hợp khi | Optional dependency | Bắt buộc, panic-on-fail OK |

### 10.3 Vấn đề: Singleton phá unit test

Singleton state-ful chia sẻ giữa các test → test phụ thuộc thứ tự, flaky. **Cách giảm đau:**

1. Singleton chỉ nên là *điểm vào*, business logic nhận `*DB` qua tham số (DI):
   ```go
   func ListUsers(db *sql.DB) ([]User, error) { ... }
   ```
2. Nếu phải reset trong test, lộ hàm `ResetForTest()` chỉ build với tag `//go:build test_only`.
3. Tốt hơn: **đừng dùng singleton**. Truyền dependency tường minh qua `main.go` → handler → service → repo.

> ⚠ **Lỗi thường gặp.** Gọi `once.Do` với function khác nhau ở mỗi call-site — chỉ function của lần đầu chạy, các lần sau bị skip. `sync.Once` là "đã chạy chưa", không phải "chạy mỗi func mới 1 lần".

> 📝 **Tóm tắt mục 10.** `sync.Once` cho lazy singleton thread-safe. Package var cho eager. Cả hai khó test — ưu tiên DI khi có thể.

---

## 11. Factory Function

> 💡 **Trực giác.** Trong Go không có `new Foo()` của Java. Factory chỉ là hàm `NewFoo(...)` trả `*Foo`. Nó là chỗ duy nhất chứa logic *init* + *validate* + *default*.

### 11.1 Pattern

```go
type User struct {
    ID        uint64
    Email     string
    CreatedAt time.Time
}

func NewUser(email string) (*User, error) {
    if !strings.Contains(email, "@") {
        return nil, fmt.Errorf("invalid email: %q", email)
    }
    return &User{
        ID:        randomID(),
        Email:     strings.ToLower(email),
        CreatedAt: time.Now().UTC(),
    }, nil
}
```

### 11.2 Khi nào dùng factory thay vì struct literal

| Tình huống | Dùng factory |
|------------|--------------|
| Cần validate input | ✅ |
| Default phức tạp (gọi `time.Now()`, generate ID, ...) | ✅ |
| Field private, caller không set trực tiếp | ✅ |
| Pool/cache instance | ✅ |
| Plain data, không invariant | ❌ — `User{Email: "..."}` đủ |

### 11.3 Convention đặt tên

| Trả về | Tên |
|--------|-----|
| `*T` | `NewT` |
| `(T, error)` | `NewT` |
| Nhiều variant | `NewTFromFile`, `NewTFromBytes`, ... |
| Type là default chính của package | `pkg.New()` (vd `bytes.NewBuffer`) |

> 📝 **Tóm tắt mục 11.** Factory function = constructor có logic + validate + default. Convention: `NewT(...) *T` hoặc `NewT(...) (*T, error)`.

---

## 12. Null Object

> 💡 **Trực giác.** "Nil check ở mọi nơi" là code smell. Null Object = "thay vì để dependency = nil, đưa một implementation no-op mặc định". Caller không bao giờ phải `if x != nil`.

### 12.1 Pattern

```go
type Logger interface {
    Info(msg string)
    Error(msg string, err error)
}

type StdLogger struct{}
func (StdLogger) Info(m string)              { log.Println("INFO:", m) }
func (StdLogger) Error(m string, err error)  { log.Println("ERROR:", m, err) }

type NoOpLogger struct{}
func (NoOpLogger) Info(string)               {}
func (NoOpLogger) Error(string, error)       {}

type Service struct{ log Logger }
func NewService(log Logger) *Service {
    if log == nil { log = NoOpLogger{} } // không để nil bên trong
    return &Service{log: log}
}
func (s *Service) Handle() {
    s.log.Info("handling") // luôn an toàn — không cần nil-check
}
```

### 12.2 So với check nil

```go
// ❌ Nil check rải rác:
func (s *Service) Handle() {
    if s.log != nil { s.log.Info("handling") }
    if s.log != nil { s.log.Info("step 2") }
}
// ✅ Null Object: straight-line, không cần nil-check.
```

⚠ **Lỗi thường gặp.** Quên tạo NoOp impl → caller nhận `*Service` với `log = nil`, panic ở method call. Quy tắc: factory **luôn** đảm bảo dependency interface ≠ nil trước khi return.

> 📝 **Tóm tắt mục 12.** Null Object = empty implementation thay vì nil. Loại bỏ rải rác nil-check, làm code straight-line.

---

## 13. Repository Pattern

> 💡 **Trực giác.** Repository = "abstract chỗ data sống". Business logic chỉ biết `Find`, `Save`, `Delete` — không biết là Postgres, MongoDB, hay in-memory map. Test: swap sang in-memory; production: swap sang Postgres.

### 13.1 Pattern

```go
type UserRepo interface {
    GetByID(ctx context.Context, id uint64) (*User, error)
    Save(ctx context.Context, u *User) error
    Delete(ctx context.Context, id uint64) error
}

// Impl production: Postgres (show 1 method, rest tương tự)
type PostgresUserRepo struct{ db *sql.DB }
func (r *PostgresUserRepo) GetByID(ctx context.Context, id uint64) (*User, error) {
    row := r.db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id=$1", id)
    u := &User{}
    if err := row.Scan(&u.ID, &u.Email); err != nil {
        if errors.Is(err, sql.ErrNoRows) { return nil, ErrUserNotFound }
        return nil, err
    }
    return u, nil
}

// Impl test: in-memory (xem solutions.go cho đầy đủ)
type InMemoryUserRepo struct {
    mu    sync.Mutex
    store map[uint64]*User
}
func (r *InMemoryUserRepo) Save(_ context.Context, u *User) error {
    r.mu.Lock(); defer r.mu.Unlock()
    r.store[u.ID] = u
    return nil
}

// Business logic phụ thuộc interface, không phụ thuộc DB cụ thể:
type UserService struct{ repo UserRepo }
func (s *UserService) Register(ctx context.Context, email string) (*User, error) {
    u, err := NewUser(email); if err != nil { return nil, err }
    return u, s.repo.Save(ctx, u)
}
```

### 13.2 Test dễ hơn nhiều

```go
func TestUserService_Register(t *testing.T) {
    repo := NewInMemoryUserRepo()
    svc  := &UserService{repo: repo}

    u, err := svc.Register(context.Background(), "alice@example.com")
    if err != nil { t.Fatal(err) }

    got, _ := repo.GetByID(context.Background(), u.ID)
    if got.Email != "alice@example.com" { t.Fatalf("got %s", got.Email) }
}
```
Không cần Docker, không cần Postgres, test chạy < 1ms.

### 13.3 Cân nhắc

- **Đừng over-abstract**: chỉ tạo Repository cho entity *có ý nghĩa domain* (User, Order). Không cần Repository cho `Setting` 2 field.
- **Interface methods nên thuộc domain**, không phải SQL: `FindByEmail` (domain), không phải `ExecQuery` (db).
- **Trả `(*User, error)`** thay vì `(User, error)` — chuẩn nhất khi entity có thể nil (not found dùng sentinel error).

> 📝 **Tóm tắt mục 13.** Repository interface = abstract persistence. Impl: production (DB), test (in-memory). Service phụ thuộc interface, test không cần DB.

---

## 14. Anti-patterns

### 14.1 Over-abstraction

```go
// ❌ Chỉ có 1 impl, interface là rác:
type UserGetter interface { GetUser(id uint64) *User }
type RealUserGetter struct{ db *sql.DB }
// "Phòng khi sau này có cái thứ 2" — KHÔNG cần thiết.

// ✅ Concrete struct ngay từ đầu:
type UserStore struct{ db *sql.DB }
func (s *UserStore) GetUser(id uint64) *User { ... }
```
Nguyên tắc Go: **"interface satisfaction belongs to the consumer"**. Producer không cần biết caller sẽ trừu tượng hoá ra sao.

### 14.2 God object

```go
// ❌ Một struct làm tất cả:
type Manager struct { db *sql.DB; cache *redis.Client; queue *kafka.Producer; http *http.Client }
func (m *Manager) CreateUser(...)     {}
func (m *Manager) SendEmail(...)      {}
func (m *Manager) ProcessPayment(...) {}
// ... 50 method khác
```
Vấn đề: ai cũng inject `*Manager` → test phải mock cả 4 dependency dù chỉ dùng `CreateUser`. **Sửa**: chia theo bounded context — `UserService`, `EmailService`, `PaymentService`.

### 14.3 Premature generic

```go
// ❌ Generic với 1 type duy nhất:
type Cache[T any] struct { ... }
var userCache = &Cache[User]{}  // không bao giờ dùng Cache[Order]

// ✅ Concrete:
type UserCache struct { ... }
```
Generic cần khi có **≥ 2 type khác nhau cùng dùng cấu trúc**. 1 type = generic vô nghĩa, chậm đọc.

### 14.4 Java-style getter/setter

```go
// ❌ "Encapsulation" giả: GetName() / SetName() trên field private trivial.
// ✅ Go style:
type User struct{ Name string }              // trivial → field exported
// Hoặc nếu cần validate:
func (u *User) Rename(newName string) error  { /* validate, log, ... */ }
```
Go tin tưởng package boundary: field exported đã đủ encapsulation. Getter/setter trivial chỉ tăng nhiễu.

> 📝 **Tóm tắt mục 14.** 4 anti-pattern: (a) interface 1-impl, (b) god object, (c) generic 1-type, (d) trivial getter/setter. Nhận biết và refactor sớm.

---

## 15. Go idioms checklist

Dùng trước khi merge code.

- [ ] **Constructor** đặt tên `New<Type>` hoặc `NewT<Variant>` (vd `NewUserFromJSON`).
- [ ] **Interface 1-method** đặt tên `<Verb>er` (Reader, Writer, Closer, Stringer, Sorter).
- [ ] **`struct{}`** dùng cho set (`map[string]struct{}`) hoặc signal channel (`chan struct{}`) — zero byte.
- [ ] **Pointer vs value receiver consistent** trong 1 type. Nếu có method `*T`, dùng `*T` cho mọi method.
- [ ] **Doc comment** đầu mỗi exported identifier, bắt đầu bằng tên: `// User represents ...`.
- [ ] **Error wrap** dùng `fmt.Errorf("get user %d: %w", id, err)` — `%w` để `errors.Is/As` chạy.
- [ ] **Context** là tham số *đầu tiên*, đặt tên `ctx`: `func DoIt(ctx context.Context, ...) error`.
- [ ] **Functional Options** cho constructor > 3 tham số tuỳ chọn.
- [ ] **`io.Reader`/`io.Writer`** trong API chứ không phải `[]byte`/`*os.File`.
- [ ] **Đừng export type ngẫu nhiên** — `internal/` package giấu type khỏi user.

---

## Bài tập

### BT1. Refactor sang Functional Options
Cho:
```go
func NewServer(host string, port int, tls bool, certFile, keyFile string,
    readTimeout, writeTimeout time.Duration, maxConns int, logger *log.Logger) *Server
```
Refactor sang functional options. Yêu cầu: ít nhất 5 option `WithX`, default sensible, `NewServer()` không tham số phải chạy được.

### BT2. Middleware chain HTTP
Viết 3 middleware: `Logger` (in method + path + duration), `Auth` (yêu cầu header `Authorization: Bearer X`), `Recover` (bắt panic). Compose: `Recover(Logger(Auth(handler)))`. Viết test với `httptest.NewRecorder` cho 3 case: success (200), no token (401), panic trong handler (500).

### BT3. Pub-Sub
Cài `Broker[T any]` với `Subscribe(buf int) (<-chan T, func())` và `Publish(ev T)`. Đảm bảo (a) Publish không block khi sub đầy buffer (drop), (b) Unsub đóng channel, (c) thread-safe. Test với 2 subscriber, 5 publish.

### BT4. Repository
Cài `UserRepo` interface với `GetByID`, `Save`, `Delete`. Implement (a) `InMemoryUserRepo` với `map[uint64]*User` + mutex; (b) `PostgresUserRepo` stub — chỉ cần struct + comment chỗ chạy SQL. Service `UserService.Register(email)` validate + save.

### BT5. Strategy: `Compressor`
Define interface `Compressor { Compress([]byte) ([]byte, error); Name() string }`. Impl: `GzipCompressor`, `NoOpCompressor`. Hàm `SaveBlob(c Compressor, data []byte, dir string)` ghi `dir/<name>.bin`.

### BT6. Refactor anti-pattern
Cho code over-abstracted:
```go
type UserGetter interface { GetUser(id uint64) *User }
type RealUserGetter struct { db *sql.DB }
func (r *RealUserGetter) GetUser(id uint64) *User { return nil }

type Service struct { ug UserGetter }
func NewService(ug UserGetter) *Service { return &Service{ug: ug} }
```
Chỉ có 1 impl `RealUserGetter`. Refactor sang idiomatic Go: dùng concrete `*UserStore`. Caller (test) nếu cần mock thì *tự* khai báo interface.

---

## Lời giải chi tiết

### BT1 — Functional Options cho Server

Code đầy đủ trong [solutions.go](./solutions.go) (section 1). Tóm tắt 4 bước:
1. Định nghĩa `type Option func(*Server)`.
2. Mỗi tham số cũ → 1 hàm `WithX(v) Option` trả closure sửa field.
3. `NewServer(opts ...Option) *Server` khởi tạo default, loop áp option.
4. Call-site đẹp: `NewServer(WithPort(9090), WithTLS("c","k"))`.

Kiểm tra: `NewServer()` → port 8080; `NewServer(WithPort(9090))` → 9090; gọi 2 lần `WithPort` thì lần sau ghi đè.

### BT2 — Middleware chain

Code đầy đủ trong [solutions.go](./solutions.go) (section 2). Pattern test:
```go
func TestChain(t *testing.T) {
    base := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(200) })
    h := Chain(base, Recover, Logger, Auth)
    cases := []struct{ name, auth string; want int }{
        {"success", "Bearer t", 200},
        {"no auth", "",          401},
    }
    for _, c := range cases {
        r := httptest.NewRequest("GET", "/", nil)
        if c.auth != "" { r.Header.Set("Authorization", c.auth) }
        w := httptest.NewRecorder()
        h.ServeHTTP(w, r)
        if w.Code != c.want { t.Fatalf("%s: got %d want %d", c.name, w.Code, c.want) }
    }
    // case panic: base2 := http.HandlerFunc(func(...){ panic("boom") }) → 500
}
```
Độ phức tạp: $O(\text{số middleware})$ per request.

### BT3 — Pub-Sub

Code đầy đủ trong [solutions.go](./solutions.go) (section 3). Khoá then chốt: `select { case ch <- ev: default }` trong Publish để không block.
```go
b := NewBroker[int]()
c1, _ := b.Subscribe(10)
c2, _ := b.Subscribe(10)
for i := 0; i < 5; i++ { b.Publish(i) }
time.Sleep(50 * time.Millisecond)
if len(c1) != 5 || len(c2) != 5 { t.Fatalf("got %d, %d", len(c1), len(c2)) }
```

### BT4 — Repository

Code đầy đủ trong [solutions.go](./solutions.go) (section 4). `PostgresUserRepo` chỉ là stub:
```go
type PostgresUserRepo struct{ db *sql.DB }
func (r *PostgresUserRepo) GetByID(ctx context.Context, id uint64) (*User, error) {
    // row := r.db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id=$1", id)
    // return scan(row)
    panic("not wired")
}
```
Test thật: dùng `InMemoryUserRepo`.

### BT5 — Strategy Compressor

Code đầy đủ trong [solutions.go](./solutions.go) (section 5). Demo output khi `go run solutions.go`:
```
[gzip] in=2400 bytes  out=67 bytes   (2.8%)   ← BestSpeed
[gzip] in=2400 bytes  out=55 bytes   (2.3%)   ← BestCompression
[none] in=2400 bytes  out=2400 bytes (100%)
```
Độ phức tạp gzip: $O(n)$ trên input bytes.

### BT6 — Refactor over-abstraction

```go
// Trước (over-abstracted, 1-impl):
type UserGetter interface { GetUser(id uint64) *User }
type RealUserGetter struct{ db *sql.DB }

// Sau (idiomatic):
type UserStore struct{ db *sql.DB }
func NewUserStore(db *sql.DB) *UserStore { return &UserStore{db: db} }
func (s *UserStore) GetUser(id uint64) *User { return nil }

type Service struct{ store *UserStore }
func NewService(s *UserStore) *Service { return &Service{store: s} }
```
Nếu test cần mock, **test file tự định nghĩa interface** (Go's structural typing cho phép):
```go
// service_test.go
type userGetter interface{ GetUser(id uint64) *User }
// Khi đó tạo NewServiceWithGetter(g userGetter) variant, hoặc dùng DB in-memory (sqlite).
```
Nguyên tắc: **interface khai báo ở consumer, không phải producer**.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — Functional Options, Middleware chain, Pub-Sub, Repository, Strategy, Singleton — compile + chạy được với `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. Functional Options — toggle option, xem struct build dần.
  2. Middleware chain — animate request đi qua Logger → Auth → Recover → handler → quay ra.
  3. Strategy — swap concrete strategy, xem output thay đổi.

## Bài tiếp theo

- [Lesson 40 — Error Handling Deep Dive](../lesson-40-error-handling-deep/) — sentinel, wrap, errors.Is/As, panic vs error, error tree.
- Tham khảo: [Effective Go — interfaces](https://go.dev/doc/effective_go#interfaces), [Dave Cheney — Functional options](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis), [Rob Pike — "Go proverbs"](https://go-proverbs.github.io/).
