# Lesson 72 — Structured Logging (`log/slog`)

> **Tier 7 — Production / DevOps / SWE.** Bài này mở đầu Tier 7, nằm sau [Lesson 71 — Mini-project Microservices](../lesson-71-mini-project-microservices/) và trước [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/).

Câu hỏi mở bài: *bạn có một dịch vụ chạy trên 30 container, mỗi giây sinh 5.000 dòng log. Lúc 2 giờ sáng có một request bị lỗi 500. Bạn có `request_id` của nó. Làm sao trong **5 giây** lọc ra đúng toàn bộ log của request đó — đi xuyên 3 service khác nhau — để biết nó chết ở đâu?* Nếu log của bạn là những dòng chữ tự do kiểu `log.Printf("user %s failed: %v", u, err)`, câu trả lời là "không thể, phải `grep` mò rồi đọc bằng mắt". Bài này trả lời câu hỏi đó tới tận cùng: chuyển log thành **dữ liệu có cấu trúc (structured)** mà máy query được, dùng `log/slog` (stdlib Go 1.21+), và tới cuối bài bạn sẽ viết được middleware gắn `request_id`, child logger kế thừa field, và redact dữ liệu nhạy cảm.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **vì sao log text tự do là nợ kỹ thuật** ở quy mô production, và structured log giải quyết gì.
2. Dùng thành thạo **`log/slog`**: `Info/Warn/Error/Debug`, `TextHandler` vs `JSONHandler`, set level.
3. Chọn đúng **log level** cho từng tình huống (Debug/Info/Warn/Error).
4. Dùng **structured fields** (`slog.String`, `slog.Int`, `slog.Group`) thay vì string concat.
5. Truyền logger và **request ID** qua `context`, dùng `InfoContext`.
6. Tạo **correlation/request ID** ở edge và propagate xuyên service.
7. Tạo **child logger** kế thừa attribute bằng `logger.With(...)`.
8. **Redact** dữ liệu nhạy cảm (password, token, PII) — không bao giờ log thẳng.
9. Hiểu **sampling** cho log volume cao, **log aggregation** (Loki/ELK), và chi phí **performance** của logging.
10. Nắm **best practice** và tránh các **pitfall** kinh điển (string concat, double log, field name không nhất quán).

## Kiến thức tiền đề

- [Lesson 19 — Errors](../lesson-19-errors/) — log thường đi cùng error; cần hiểu wrap/unwrap.
- [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/) — JSON log là nền tảng của structured logging.
- [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/) — context-aware logging dựa hoàn toàn vào `context.Context`.
- [Lesson 42 — HTTP net/http Deep](../lesson-42-http-net-deep/) và [Lesson 44 — Routing & Frameworks](../lesson-44-routing-frameworks/) — middleware gắn request ID.
- [Lesson 69 — Microservice Patterns](../lesson-69-microservice-patterns/) — vì correlation ID chỉ thực sự có ý nghĩa khi request đi xuyên nhiều service.

---

## 1. Vì sao cần structured logging

> 💡 **Trực giác.** Hình dung hai cách ghi sổ kho. Cách 1 — viết tay vào sổ: *"hôm nay anh Ba lấy 3 thùng sữa lúc chiều"*. Cách 2 — điền vào bảng Excel có cột: `ngày | người | mặt hàng | số lượng | giờ`. Khi sếp hỏi "tháng này anh Ba lấy bao nhiêu thùng sữa?", với cách 1 bạn phải đọc lại từng dòng chữ; với cách 2 bạn lọc `người=anh Ba, mặt hàng=sữa` rồi `SUM(số lượng)` — xong trong 2 giây. Log text tự do là "viết tay"; structured log là "Excel". Máy chỉ query nhanh được khi dữ liệu **có cột rõ ràng**.

### 1.1 Log text tự do — vấn đề ở đâu

Đây là kiểu log mà hầu hết người mới viết:

```go
log.Printf("user %s logged in from %s at %s", userID, ip, time.Now())
// Output: 2026/05/27 02:14:33 user u_1234 logged in from 10.0.0.5 at 2026-05-27 02:14:33
```

Trông ổn khi đọc bằng mắt 10 dòng. Nhưng ở production với hàng triệu dòng:

| Vấn đề | Vì sao đau |
|--------|-----------|
| **Khó parse** | Mỗi dev viết một format khác nhau (`user u_1234 logged in` vs `login: u_1234`). Không có schema → không tool nào parse tự động đúng được. |
| **Khó query** | Muốn "tất cả login của `u_1234`" → phải viết regex mong manh, sai một dấu cách là trượt. |
| **Khó aggregate** | "Đếm số login theo từng IP" → gần như không thể nếu IP nằm lẫn trong câu chữ. |
| **Mất context** | Dòng `"timeout"` đứng một mình — của request nào? service nào? user nào? Không biết. |
| **Không correlate được** | 1 request đi qua 3 service sinh 3 dòng log rời rạc, không có gì nối chúng lại. |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tôi `grep` được mà, sao phải đổi?"* — `grep` chỉ tìm theo substring. Nó không trả lời được "đếm theo IP", "lọc theo khoảng latency > 500ms", "join log 3 service theo cùng request_id". Đó là việc của **query có cấu trúc**.
> - *"Structured log có đọc bằng mắt được không?"* — Trong dev, dùng `TextHandler` cho dễ đọc; trong prod, dùng `JSONHandler` cho máy. Cùng một code, đổi handler thôi.

### 1.2 Structured log — cùng sự kiện, dạng dữ liệu

```go
slog.Info("user login",
    "user_id", "u_1234",
    "ip", "10.0.0.5",
    "method", "password",
)
// JSONHandler output:
// {"time":"2026-05-27T02:14:33Z","level":"INFO","msg":"user login","user_id":"u_1234","ip":"10.0.0.5","method":"password"}
```

Giờ mỗi field là một **cột**. Trong Loki/ELK bạn query thẳng:

```logql
{app="auth"} | json | user_id="u_1234"          # tất cả log của user này
{app="auth"} | json | level="ERROR" | ip="10.0.0.5"
sum by (ip) (count_over_time({app="auth"} | json | msg="user login" [1h]))  # đếm login theo IP
```

> 🔁 **Dừng lại tự kiểm tra.** Một đồng nghiệp viết `log.Printf("order %d total %.2f for %s", id, total, user)`. Vì sao dòng này khó dùng ở production?
> <details><summary>Đáp án</summary>
> Ba giá trị `id`, `total`, `user` bị "nung chảy" vào một chuỗi văn bản — không còn là field riêng. Không thể lọc `total > 1000`, không thể group theo `user`, không thể parse mà không viết regex riêng cho đúng câu này. Đúng phải là: <code>slog.Info("order created", "order_id", id, "total", total, "user_id", user)</code>.
> </details>

---

## 2. `log/slog` — structured logging trong stdlib (Go 1.21+)

Trước Go 1.21, muốn structured log phải dùng thư viện ngoài (`zap`, `zerolog`, `logrus`). Từ **Go 1.21**, stdlib có `log/slog` — đủ tốt cho phần lớn ứng dụng, không cần dependency.

> 💡 **Trực giác — vì sao tách logger và handler.** Hình dung một nhà máy: dây chuyền lắp ráp (logger — nơi bạn "đặt hàng" log) tách rời khỏi khâu đóng gói (handler — quyết định gói thành hộp JSON hay bọc giấy Text, rồi gửi đi đâu). Cùng một dây chuyền, bạn thay khâu đóng gói mà không sửa dây chuyền: dev gói kiểu Text dễ đọc, prod gói kiểu JSON cho máy. Chính vì tách rời nên đổi format/đích đến chỉ là một dòng `slog.New(...)`, không phải sửa từng lời gọi log.

**So sánh nhanh với thư viện ngoài (khi nào cần hơn `slog`):**

| Thư viện | Điểm mạnh | Khi nào chọn |
|----------|-----------|--------------|
| `log/slog` (stdlib) | Không dependency, chuẩn hoá API, đủ nhanh | Mặc định — chọn trước |
| `zap` (Uber) | Nhanh nhất, zero-allocation ở fast path | Hot path cực nóng, đo được `slog` là bottleneck |
| `zerolog` | API fluent, JSON-first | Thích style chaining `.Str().Int()` |

Lời khuyên thực tế: **bắt đầu bằng `slog`**. Chỉ đổi sang `zap`/`zerolog` khi profiling (Lesson 34) chứng minh logging là điểm nghẽn — phần lớn dịch vụ không bao giờ chạm tới ngưỡng đó.

### 2.1 API cơ bản

```go
import "log/slog"

slog.Info("server started", "port", 8080, "env", "prod")
slog.Warn("disk almost full", "used_pct", 92)
slog.Error("db query failed", "err", err, "query", "SELECT ...")
slog.Debug("cache hit", "key", "user:1234")  // mặc định KHÔNG in (level Info)
```

Cú pháp: `slog.Level(message, key1, val1, key2, val2, ...)` — các cặp key-value đứng sau message. (Có cả cách "typed attr" ở mục 4, an toàn hơn.)

### 2.2 Handler: Text vs JSON

`slog` tách **logger** (API gọi) khỏi **handler** (quyết định format + đích đến). Hai handler có sẵn:

```go
// TextHandler — dạng key=value, dễ đọc bằng mắt → dùng cho DEV
logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
logger.Info("user login", "user_id", "u_1234", "ip", "10.0.0.5")
// time=2026-05-27T02:14:33Z level=INFO msg="user login" user_id=u_1234 ip=10.0.0.5

// JSONHandler — dạng JSON, máy parse được → dùng cho PROD
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
logger.Info("user login", "user_id", "u_1234", "ip", "10.0.0.5")
// {"time":"2026-05-27T02:14:33Z","level":"INFO","msg":"user login","user_id":"u_1234","ip":"10.0.0.5"}
```

Đặt logger này thành mặc định toàn cục để `slog.Info(...)` dùng nó:

```go
slog.SetDefault(logger)
```

### 2.3 Set level qua HandlerOptions

```go
opts := &slog.HandlerOptions{Level: slog.LevelDebug}  // cho hiện cả Debug
logger := slog.New(slog.NewJSONHandler(os.Stdout, opts))
```

Hoặc dùng `slog.LevelVar` để **đổi level lúc runtime** (vd bật Debug tạm thời mà không restart):

```go
var lvl slog.LevelVar          // mặc định Info
lvl.Set(slog.LevelInfo)
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: &lvl}))
// ... khi cần debug: lvl.Set(slog.LevelDebug)
```

> 📝 **Tóm tắt mục 2.** `slog` = logger (API) + handler (format/đích). `TextHandler` cho dev, `JSONHandler` cho prod. Set level qua `HandlerOptions.Level`; dùng `LevelVar` để đổi runtime. `slog.SetDefault` để dùng `slog.Info(...)` toàn cục.

---

## 3. Log levels — khi nào dùng cái nào

`slog` có 4 level chuẩn (giá trị số tăng dần): `Debug(-4) < Info(0) < Warn(4) < Error(8)`. Handler chỉ in log có level **≥** level cấu hình.

| Level | Khi nào dùng | Ví dụ | Ai đọc |
|-------|--------------|-------|--------|
| **Debug** | Chi tiết để gỡ lỗi, **chỉ bật ở dev** hoặc khi đang điều tra | "cache hit key=...", "SQL: SELECT ... với args=[...]", giá trị biến trung gian | Dev đang debug |
| **Info** | Sự kiện bình thường, đáng ghi lại để biết hệ thống đang làm gì | "server started", "user login", "order created", "job done" | Vận hành, audit |
| **Warn** | Bất thường nhưng **tự phục hồi được**, chưa hỏng | "retry lần 2", "cache miss rate cao", "config dùng giá trị mặc định", "disk 92%" | On-call (cảnh giác) |
| **Error** | Một thao tác **thất bại**, cần con người hoặc alert | "db connection failed", "không gửi được email", "panic recovered" | On-call (hành động) |

> 💡 **Trực giác.** Coi level như mức độ "to tiếng" của tiếng chuông. Debug = lẩm bẩm tự nói cho mình nghe (dev nghe). Info = thông báo loa thông thường ("chuyến bay đã cất cánh"). Warn = chuông cảnh báo nhẹ ("sắp hết nhiên liệu dự phòng, nhưng vẫn còn"). Error = còi báo động ("động cơ hỏng"). Bạn không muốn còi báo động kêu cho mỗi cache miss, cũng không muốn động cơ hỏng mà chỉ "lẩm bẩm".

**Bốn ví dụ phân loại cụ thể (luyện mắt):**

1. `Tìm thấy user trong cache` → **Debug** (chi tiết kỹ thuật, dev mới cần).
2. `Người dùng đặt hàng thành công, order_id=...` → **Info** (sự kiện nghiệp vụ bình thường).
3. `Gọi payment service timeout, đang retry (2/3)` → **Warn** (bất thường nhưng còn cơ hội phục hồi).
4. `Retry hết 3 lần vẫn không gọi được payment, hủy đơn` → **Error** (thất bại thật, cần can thiệp).

> ⚠ **Lỗi thường gặp.**
> - **Log mọi thứ ở `Info`** → noise ngập trời, alert vô dụng. Sự kiện debug phải ở `Debug`.
> - **Dùng `Error` cho điều không phải lỗi** (vd "user nhập sai mật khẩu" — đó là hành vi bình thường của hệ thống, là `Info` hoặc `Warn`, không phải `Error`). Lạm dụng `Error` làm "loãng" alert thật.
> - **`Fatal`/`panic` cho lỗi xử lý được** — `slog` cố tình không có `Fatal` (như `logrus`) vì `os.Exit` bỏ qua `defer`. Hãy return error.

> 🔁 **Dừng lại tự kiểm tra.** Service nhận request với JWT hết hạn nên từ chối (401). Log ở level nào?
> <details><summary>Đáp án</summary>
> <strong>Info</strong> (hoặc Warn nếu muốn theo dõi tần suất). Đây là luồng bình thường — token hết hạn là chuyện xảy ra hằng ngày, hệ thống xử lý đúng (trả 401). Để ở <code>Error</code> sẽ làm dashboard error đỏ lòm vì lý do vô nghĩa.
> </details>

### 3.1 Walk-through bằng số: handler lọc level thế nào

Mỗi level có một **giá trị số** cố định trong `slog`:

| Level | Giá trị số |
|-------|:----------:|
| `Debug` | `-4` |
| `Info`  | `0` |
| `Warn`  | `4` |
| `Error` | `8` |

Quy tắc của handler chỉ là **một phép so sánh**: in dòng log khi `record.Level >= handler.threshold`. Giả sử handler đặt ngưỡng `Info` (`= 0`):

1. `logger.Debug("cache hit")` → `-4 >= 0`? **Sai** → **bỏ qua** (không format, không I/O — gần như free).
2. `logger.Info("user login")` → `0 >= 0`? **Đúng** → in.
3. `logger.Warn("retry")` → `4 >= 0`? **Đúng** → in.
4. `logger.Error("db down")` → `8 >= 0`? **Đúng** → in.

Đổi ngưỡng lên `Warn` (`= 4`) thì cả `Debug(-4)` lẫn `Info(0)` đều `< 4` → bị lọc, chỉ còn `Warn`/`Error`. Đây chính xác là cơ chế Module 3 trong [visualization](./visualization.html) mô phỏng: kéo slider = đổi `threshold`, mỗi dòng so sánh số rồi ẩn/hiện.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao `Debug = -4` chứ không phải `0,1,2,3`?"* — `slog` để khoảng cách 4 đơn vị giữa các level chuẩn để bạn chèn level **trung gian** (vd `Notice = 2` giữa Info và Warn, hay `Trace = -8` dưới Debug) bằng `slog.Level(2)`, mà vẫn so sánh `>=` đúng thứ tự. Khoảng trống là cố ý.

---

## 4. Structured fields — key-value thay vì string concat

### 4.1 Hai cách truyền field

```go
// Cách 1: cặp key-value lỏng (tiện, nhưng dễ lệch cặp nếu đếm sai)
slog.Info("payment", "amount", 100, "currency", "USD")

// Cách 2: typed attr (an toàn về kiểu, IDE gợi ý, không lệch cặp)
slog.Info("payment",
    slog.Int("amount", 100),
    slog.String("currency", "USD"),
    slog.Float64("rate", 1.08),
    slog.Bool("settled", true),
    slog.Time("at", time.Now()),
)
```

> ⚠ **Lỗi thường gặp.** Với cách 1, nếu bạn quên một value, các cặp bị **lệch**: `slog.Info("x", "a", "b", "c")` → `slog` coi `"c"` là một key thiếu value và in cảnh báo `!BADKEY`. Khi không chắc, dùng typed attr (cách 2).

### 4.2 `slog.Group` — gom field liên quan thành object lồng

```go
slog.Info("request done",
    slog.String("method", "GET"),
    slog.Group("http",
        slog.Int("status", 200),
        slog.Int("bytes", 1532),
        slog.Duration("latency", 42*time.Millisecond),
    ),
)
// JSON: {"msg":"request done","method":"GET","http":{"status":200,"bytes":1532,"latency":42000000}}
```

Lợi ích: query `http.status >= 500` gọn, và tránh đụng tên (vd `db.latency` vs `http.latency`).

**Bốn ví dụ field nên có kiểu đúng:**

1. `slog.Int("status_code", 503)` — số, không phải string `"503"` (để so sánh `>= 500`).
2. `slog.Duration("latency", d)` — duration, query được `latency > 500ms`.
3. `slog.Time("expires_at", t)` — time chuẩn ISO, không phải `t.String()` tùy tiện.
4. `slog.Any("tags", []string{"vip","retry"})` — slice/struct bất kỳ, để `slog` tự encode.

> 📝 **Tóm tắt mục 4.** Đừng nhét giá trị vào message; đặt chúng thành field. Ưu tiên typed attr (`slog.Int/String/Duration/...`) để khỏi lệch cặp và giữ đúng kiểu cho query. `slog.Group` để gom field liên quan.

---

## 5. Context-aware logging

> 💡 **Trực giác.** Tưởng tượng một bệnh nhân đi khám qua 4 phòng (tiếp đón → xét nghiệm → chụp X-quang → bác sĩ). Mỗi phòng ghi một tờ giấy riêng. Nếu cả 4 tờ đều có **mã bệnh nhân** ở góc, cuối ngày gom lại theo mã là ra toàn bộ hành trình. Context-aware logging là gắn "mã bệnh nhân" (= request_id) vào `context.Context` của request, để mọi hàm sâu trong call stack log ra đều tự kèm mã đó.

### 5.1 `InfoContext` và handler đọc từ context

`slog` có biến thể `...Context`: `slog.InfoContext(ctx, msg, ...)`. Handler có thể đọc giá trị từ `ctx` và tự thêm vào mọi log. Cách phổ biến: lưu **logger đã gắn field** vào context.

```go
type ctxKey struct{}

// Lưu logger vào context
func WithLogger(ctx context.Context, l *slog.Logger) context.Context {
    return context.WithValue(ctx, ctxKey{}, l)
}

// Lấy logger từ context (fallback về default nếu không có)
func FromContext(ctx context.Context) *slog.Logger {
    if l, ok := ctx.Value(ctxKey{}).(*slog.Logger); ok {
        return l
    }
    return slog.Default()
}
```

Giờ ở handler tầng sâu nhất, chỉ cần `FromContext(ctx).Info(...)` là log tự kèm mọi field đã gắn (request_id, user_id...).

> ❓ **Câu hỏi tự nhiên.** *"Sao không truyền `*slog.Logger` làm tham số cho mọi hàm?"* — Truyền tay qua 8 tầng hàm rất rườm rà và "ô nhiễm" chữ ký hàm. Mà bạn vốn đã truyền `ctx` xuyên suốt rồi (theo Lesson 29). Nhét logger vào `ctx` là tận dụng đường ống có sẵn. Lưu ý: chỉ nhét **request-scoped logger**, không nhét config tùy tiện vào context.

---

## 6. Correlation / Request ID — track 1 request xuyên service

Đây là phần "đắt giá" nhất của bài. Trong hệ phân tán, một request từ user đi qua nhiều service (`gateway → orders → payment`). Để **nối** log của cả chuỗi lại, ta gán cho request **một ID duy nhất** ngay tại **edge** (service đầu tiên nhận), rồi **propagate** nó xuống mọi service kế tiếp qua HTTP header.

```
[Client] --POST /checkout-->  [Gateway]            sinh request_id = "req-abc123"
                                  | log {request_id:"req-abc123", svc:"gateway", ...}
                                  | gọi orders, kèm header X-Request-ID: req-abc123
                                  v
                              [Orders]              đọc header → dùng lại request_id
                                  | log {request_id:"req-abc123", svc:"orders", ...}
                                  | gọi payment, kèm header X-Request-ID: req-abc123
                                  v
                              [Payment]             đọc header → dùng lại request_id
                                    log {request_id:"req-abc123", svc:"payment", ...}
```

Khi điều tra: `{env="prod"} | json | request_id="req-abc123"` → ra **đúng** mọi dòng log của request đó, xuyên cả 3 service, theo thứ tự thời gian.

**Walk-through cụ thể — điều tra một lỗi 500.** Giả sử trong 1 phút có 90.000 dòng log từ 3 service. Một user báo lỗi và bạn có `request_id = "req-abc123"` (lấy từ response header):

```text
# Bước 1: lọc — từ 90.000 dòng còn đúng 6 dòng của request này
{env="prod"} | json | request_id="req-abc123"

# Kết quả (đã sắp theo time, xuyên 3 service):
02:14:33.001  gateway  INFO   received POST /checkout       request_id=req-abc123
02:14:33.005  orders   INFO   creating order order_id=1042   request_id=req-abc123
02:14:33.010  orders   INFO   reserving stock               request_id=req-abc123
02:14:33.210  payment  WARN   charge retry attempt=2        request_id=req-abc123
02:14:33.700  payment  ERROR  charge failed reason=timeout  request_id=req-abc123   <-- chết ở đây
02:14:33.702  gateway  ERROR  checkout done status=500      request_id=req-abc123
```

Trong **một query**, bạn thấy ngay: request chết ở `payment` do `timeout` sau khi retry. Không có correlation ID thì 6 dòng này lẫn trong 90.000 dòng, không cách nào nối lại. Đó là toàn bộ giá trị của bài này, đóng lại câu hỏi mở đầu.

### 6.1 Middleware sinh + đọc request ID

```go
const headerRequestID = "X-Request-ID"

func RequestIDMiddleware(base *slog.Logger, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Nếu upstream đã có ID thì DÙNG LẠI (đang ở giữa chuỗi); nếu không thì SINH (đang ở edge)
        rid := r.Header.Get(headerRequestID)
        if rid == "" {
            rid = newID() // vd random hex / UUID
        }
        // gắn vào response header để client/upstream thấy
        w.Header().Set(headerRequestID, rid)
        // tạo child logger kèm request_id, nhét vào context
        l := base.With("request_id", rid)
        ctx := WithLogger(r.Context(), l)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

> ⚠ **Lỗi thường gặp.** **Luôn sinh ID mới** ở mọi service → mỗi service một ID khác nhau → không nối được. Quy tắc: *nếu header đã có ID thì kế thừa, chỉ sinh khi chưa có*. ID phải được **đính vào outgoing request** khi gọi service tiếp theo (`req.Header.Set(headerRequestID, rid)`), nếu không chuỗi đứt ở đó.

> 🔁 **Dừng lại tự kiểm tra.** `payment` log lỗi nhưng không có `request_id`. Nguyên nhân khả dĩ nhất?
> <details><summary>Đáp án</summary>
> `orders` gọi `payment` mà <strong>quên set header</strong> <code>X-Request-ID</code> trên outgoing request. `payment` không nhận được ID nên (theo middleware) tự sinh ID mới — và ID đó không khớp với chuỗi. Sửa: ở client gọi sang `payment`, set header từ <code>request_id</code> trong context.
> </details>

> 📝 **Tóm tắt mục 6.** Sinh `request_id` **một lần** ở edge (service đầu tiên), kế thừa ở mọi service sau (đọc header trước khi sinh), và **propagate** qua header `X-Request-ID` ở mọi outgoing call. Có ID xuyên suốt → một query lọc ra toàn bộ hành trình của request, xuyên mọi service. Đây là nền tảng để Lesson 74 nâng lên thành distributed tracing (trace_id + span_id).

---

## 7. Child logger với attribute kế thừa — `logger.With(...)`

`logger.With(args...)` trả về một **logger con** đã "đính sẵn" các field; mọi log từ logger con tự kèm field đó mà không phải lặp lại.

```go
base := slog.New(slog.NewJSONHandler(os.Stdout, nil))

// Logger cho toàn service: mọi log đều có service + version
svcLog := base.With("service", "orders", "version", "v1.4.2")

svcLog.Info("server started", "port", 8080)
// {"service":"orders","version":"v1.4.2","msg":"server started","port":8080}

// Logger cho 1 request: thêm request_id (kế thừa cả service, version)
reqLog := svcLog.With("request_id", "req-abc123")
reqLog.Info("processing order", "order_id", 42)
// {"service":"orders","version":"v1.4.2","request_id":"req-abc123","msg":"processing order","order_id":42}
```

> 💡 **Trực giác.** `With` giống như in sẵn logo công ty + phòng ban lên đầu mỗi tờ giấy nội bộ. Bạn không phải viết lại "Công ty X — Phòng Kế toán" trên từng dòng — nó đã có sẵn, bạn chỉ điền phần thay đổi.

Phân tầng điển hình: `base` (handler + level) → `svcLog = base.With(service, version)` → `reqLog = svcLog.With(request_id, user_id)`. Mỗi tầng kế thừa tầng trên.

> ❓ **Câu hỏi tự nhiên.** *"`With` có tốn không?"* — `With` tính trước (pre-format) các attr một lần, nên log lặp lại rẻ hơn là truyền field mỗi lần gọi. Đây cũng là tối ưu hiệu năng, không chỉ tiện.

---

## 8. Dữ liệu nhạy cảm — KHÔNG log password, token, PII

> ⚠ **Đây là lỗi gây sự cố bảo mật thật.** Log thường được ship tới hệ thống tập trung, lưu nhiều tháng, nhiều người xem được. Nếu password/token/số thẻ lọt vào log → coi như rò rỉ. Đã có vô số vụ leak credential chỉ vì log thẳng request body.

**Tuyệt đối không log:** mật khẩu, token/JWT/API key, số thẻ tín dụng, CVV, số CMND/CCCD, dữ liệu y tế, và (tùy quy định GDPR/PII) cả email/số điện thoại nếu không cần.

### 8.1 Redact thủ công

```go
slog.Info("login attempt",
    "user", user.Email,
    "password", "[REDACTED]",   // KHÔNG bao giờ log password thật
)
```

### 8.2 Redact tự động bằng `LogValuer`

Cho kiểu nhạy cảm tự cài `slog.LogValuer` để **luôn** che khi log:

```go
type Password string

func (Password) LogValue() slog.Value { return slog.StringValue("[REDACTED]") }

type Card string
func (c Card) LogValue() slog.Value {
    s := string(c)
    if len(s) >= 4 {
        return slog.StringValue("****-****-****-" + s[len(s)-4:]) // chỉ giữ 4 số cuối
    }
    return slog.StringValue("[REDACTED]")
}

slog.Info("checkout", "password", Password("hunter2"), "card", Card("4111111111111234"))
// {"msg":"checkout","password":"[REDACTED]","card":"****-****-****-1234"}
```

> ❓ **Câu hỏi tự nhiên.** *"Tôi log nguyên struct `user` cho tiện được không?"* — **Không**, nếu struct có field nhạy cảm. `slog.Any("user", user)` sẽ encode cả `PasswordHash`, `SessionToken`... Hoặc cho `User` cài `LogValue()` trả về bản đã lọc, hoặc log từng field an toàn một.

> 🔁 **Dừng lại tự kiểm tra.** Đoạn `slog.Info("req", "body", string(rawBody))` với `rawBody` là JSON body của `POST /login`. Sai ở đâu?
> <details><summary>Đáp án</summary>
> `rawBody` chứa <code>{"email":"...","password":"..."}</code> — password lọt thẳng vào log. Không bao giờ log raw request/response body cho endpoint có credential. Hãy log field đã chọn lọc và redact, hoặc parse rồi che trường nhạy cảm.
> </details>

---

## 9. Sampling — log volume cao thì lấy mẫu

> 💡 **Trực giác.** Một cuộc thăm dò dư luận không hỏi cả 100 triệu dân — hỏi 2.000 người chọn ngẫu nhiên là đủ suy ra xu hướng. Với log "ồn ào" (vd "cache hit" 50.000 lần/giây), bạn không cần lưu hết — lấy **1%** đã đủ thấy pattern, mà giảm chi phí lưu trữ và băng thông 100 lần.

Sampling thường áp cho log **tần suất cực cao và lặp lại** (debug/info nóng), **không** sample log **Error** (mỗi lỗi đều quý).

```go
// Handler bọc ngoài: chỉ cho qua ~1% log level thấp, nhưng LUÔN giữ Warn/Error
type SamplingHandler struct {
    slog.Handler
    rate float64 // vd 0.01 = 1%
}

func (h SamplingHandler) Handle(ctx context.Context, r slog.Record) error {
    if r.Level >= slog.LevelWarn || rand.Float64() < h.rate {
        return h.Handler.Handle(ctx, r)
    }
    return nil // bỏ qua
}
```

> ⚠ **Lỗi thường gặp.** Sample cả Error → mất đúng những dòng cần nhất khi điều tra. Quy tắc: sample Debug/Info ồn ào; giữ nguyên Warn/Error.

---

## 10. Log aggregation — gom log về một chỗ

**Nguyên tắc 12-factor:** ứng dụng **chỉ ghi log ra `stdout`/`stderr`**, coi log như một *event stream*. App **không** tự quản lý file log, không tự rotate, không tự đẩy lên S3. Việc thu gom là của hạ tầng.

```
[App in container] --stdout--> [Collector] --ship--> [Storage + Query UI]
   slog JSON           (Promtail/         (Loki / Elasticsearch /
                        Fluent Bit/         CloudWatch Logs)
                        Vector)
```

| Stack | Thành phần | Query |
|-------|-----------|-------|
| **Loki** (Grafana) | Promtail thu → Loki lưu → Grafana xem | LogQL: `{app="orders"} | json | level="ERROR"` |
| **ELK** | Filebeat/Logstash thu → Elasticsearch lưu → Kibana xem | Lucene/KQL: `level:ERROR AND service:orders` |
| **CloudWatch** | agent thu → CloudWatch Logs | Logs Insights query |

> ❓ **Câu hỏi tự nhiên.** *"Sao không ghi thẳng vào file rồi đẩy lên?"* — Trong container, filesystem là ephemeral (mất khi pod restart). Ghi stdout thì runtime (Docker/k8s) tự bắt và collector tự đẩy đi — app đơn giản, không phụ thuộc đường ship. Đây chính là tinh thần 12-factor.

---

## 11. Performance — log không miễn phí

Mỗi dòng log tốn: format chuỗi, cấp phát bộ nhớ (allocation), ghi I/O. Ở hot path (vòng lặp chạy triệu lần/giây), log bừa có thể **chậm hơn cả logic chính**.

**Vì sao `slog` nhanh:**
- Tách handler → JSONHandler encode trực tiếp, ít allocation.
- `logger.With(...)` pre-format attr một lần, tái dùng.
- Nếu level bị tắt (vd Debug khi đang ở Info), `slog` **bỏ qua sớm** trước khi format — gần như free.

**Quy tắc:**
1. **Đừng log trong hot loop.** Cần thì log tổng kết sau vòng lặp (`"processed 1M rows in 2s"`), hoặc sample.
2. **Dùng typed attr**, tránh `fmt.Sprintf` trong tham số (string concat tạo allocation thừa).
3. **Phòng hờ tính toán đắt:** nếu một field cần tính tốn kém chỉ để log Debug, kiểm tra `logger.Enabled(ctx, slog.LevelDebug)` trước khi tính.

```go
if logger.Enabled(ctx, slog.LevelDebug) {
    logger.Debug("dump", "snapshot", expensiveSnapshot()) // chỉ tính khi Debug bật
}
```

> 📝 **Tóm tắt mục 9–11.** Sample log ồn ào (giữ Error). Ghi stdout JSON, để collector ship về Loki/ELK (12-factor). `slog` rẻ nhờ pre-format và bỏ qua sớm level tắt — nhưng vẫn tránh log trong hot loop.

---

## 12. Structured vs unstructured — bảng so sánh

| Tiêu chí | Unstructured (text tự do) | Structured (JSON) |
|----------|---------------------------|-------------------|
| Đọc bằng mắt (vài dòng) | ✅ dễ | ⚠ rậm rạp (dùng TextHandler ở dev) |
| Parse tự động | ❌ regex mong manh | ✅ field rõ ràng |
| Query / filter | ❌ `grep` substring | ✅ `level=ERROR AND status>=500` |
| Aggregate (count/avg theo field) | ❌ gần như không | ✅ `sum by (ip)` |
| Correlate xuyên service | ❌ không có ID nối | ✅ filter theo `request_id` |
| Hợp với Loki/ELK/CloudWatch | ❌ | ✅ |
| Chi phí viết code | thấp | trung bình (đáng giá) |

**Cùng một sự kiện, hai cách query:**

```text
# Unstructured:  log.Printf("ERROR order %d failed for user %s: timeout", 42, "u_1")
grep "ERROR order" app.log | grep "u_1"        # mong manh, không group được

# Structured:    slog.Error("order failed", "order_id", 42, "user_id", "u_1", "reason", "timeout")
{app="orders"} | json | level="ERROR" | user_id="u_1"            # chính xác
sum by (reason) (count_over_time({app="orders"} | json | level="ERROR" [1h]))  # đếm theo lý do
```

---

## 13. Best practices

1. **Log ra `stdout`** (container-friendly, 12-factor) — không tự ghi file.
2. **JSON ở prod, Text ở dev** — chọn handler theo `ENV`/flag.
3. **Mỗi log nên có**: `time`, `level`, `msg`, `request_id`, `service` (và `version` nếu có). `slog` tự thêm 3 cái đầu; `request_id`/`service` gắn qua `With`.
4. **Field name nhất quán toàn hệ thống**: thống nhất `user_id` (không phải lúc `userId`, lúc `uid`, lúc `user`). Đặt thành hằng số dùng chung.
5. **Message ngắn, ổn định, không nhúng giá trị**: `"order created"` (tốt) chứ không `"order 42 created"` (xấu — giá trị thuộc về field).
6. **Log một lần, ở đúng tầng**: lỗi nên được log ở nơi **xử lý** nó (tầng cao), không log lại ở mỗi tầng đi qua.
7. **Set level qua config/env**, đổi được runtime (`LevelVar`).
8. **Redact** mọi field nhạy cảm (mục 8).

```go
// Chọn handler theo môi trường
func newLogger(env string) *slog.Logger {
    var h slog.Handler
    opts := &slog.HandlerOptions{Level: slog.LevelInfo}
    if env == "dev" {
        opts.Level = slog.LevelDebug
        h = slog.NewTextHandler(os.Stdout, opts) // dev: dễ đọc
    } else {
        h = slog.NewJSONHandler(os.Stdout, opts)  // prod: máy đọc
    }
    return slog.New(h).With("service", "orders", "version", "v1.4.2")
}
```

---

## 14. Common pitfalls

| Pitfall | Hậu quả | Sửa |
|---------|---------|-----|
| **String concat trong message** `slog.Info("user "+id+" failed")` | Mất structure — không query được theo `id` | `slog.Info("user failed", "user_id", id)` |
| **Log dữ liệu nhạy cảm** | Rò rỉ credential/PII | Redact / `LogValuer` (mục 8) |
| **Quá nhiều log** (mọi thứ ở Info, log trong hot loop) | Noise + chi phí lưu trữ + alert vô dụng | Đúng level + sampling + log tổng kết |
| **Field name không nhất quán** (`userId` / `uid` / `user`) | Query lọt, dashboard sai | Hằng số field name dùng chung |
| **Double log**: vừa `log.Error(err)` vừa `return err` ở mỗi tầng | 1 lỗi xuất hiện 5 dòng → khó đếm, nhiễu | Hoặc log, hoặc return — log MỘT lần ở tầng xử lý cuối |
| **Sinh request_id mới ở mọi service** | Chuỗi correlation đứt | Kế thừa nếu header đã có; chỉ sinh ở edge |
| **Quên propagate header khi gọi service tiếp** | `request_id` mất ở service sau | Set `X-Request-ID` trên outgoing request |

> ⚠ **Double log — sai lầm tinh vi nhất.** Pattern xấu:
> ```go
> func repo() error { ...; slog.Error("db failed", "err", err); return err }   // log lần 1
> func service() error { if err := repo(); err != nil { slog.Error("svc failed", "err", err); return err } } // log lần 2
> func handler() { if err := service(); err != nil { slog.Error("handler failed", "err", err) } }  // log lần 3
> ```
> Một lỗi → ba dòng Error. Đếm error metric sai gấp 3, đọc log rối. **Quy tắc:** tầng dưới *wrap* error rồi return (không log); chỉ tầng **trên cùng** (HTTP handler / boundary) log một lần với đầy đủ context.

---

## Bài tập

> Khuyến nghị làm trên Go 1.21+ (`go version`). Lời giải đầy đủ ở mục kế tiếp và trong [`solutions.go`](./solutions.go).

1. **BT1 — Setup JSON handler.** Tạo `*slog.Logger` dùng `JSONHandler` ghi ra stdout, level Info, rồi log một sự kiện "server started" kèm field `port=8080` và `env="prod"`. In ra và xác nhận đó là JSON hợp lệ.
2. **BT2 — Request ID middleware.** Viết middleware HTTP sinh/đọc `X-Request-ID`, gắn vào child logger qua context, để handler log ra có `request_id`. Giả lập gọi sang service thứ 2 và chứng minh cùng `request_id`.
3. **BT3 — Child logger kế thừa.** Từ một base logger, tạo `svcLog = base.With("service","api","version","v2.0")`, rồi `reqLog = svcLog.With("request_id", rid)`. Log từ `reqLog` phải có đủ cả 3 field.
4. **BT4 — Redact.** Cho kiểu `Password` và `Card` cài `LogValuer` để password thành `[REDACTED]` và card chỉ giữ 4 số cuối. Log một sự kiện checkout và xác nhận không lộ dữ liệu thật.
5. **BT5 — Level-based.** Viết hàm xử lý đơn hàng log `Debug` chi tiết từng bước (validate, tính tiền, lưu) và `Info` một dòng tổng kết. Chạy 2 lần: level Info (chỉ thấy tổng kết) và level Debug (thấy hết).
6. **BT6 — Sửa antipattern.** Cho đoạn code dùng `log.Printf("user %s order %d total %.2f failed: %v", u, id, total, err)`. Viết lại bằng `slog` structured (mỗi giá trị một field, level Error) và chỉ ra 2 query mới làm được sau khi sửa.

---

## Lời giải chi tiết

### BT1 — Setup JSON handler

**Cách tiếp cận:** tạo `JSONHandler` với `HandlerOptions{Level: slog.LevelInfo}`, bọc trong `slog.New`, log với typed attr.

```go
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
logger.Info("server started", slog.Int("port", 8080), slog.String("env", "prod"))
// {"time":"...","level":"INFO","msg":"server started","port":8080,"env":"prod"}
```

`level` Info nghĩa là `logger.Debug(...)` sẽ không in. Output là JSON một dòng — máy parse được ngay. Độ phức tạp: O(số field) cho mỗi dòng log.

### BT2 — Request ID middleware

**Cách tiếp cận:** middleware đọc header `X-Request-ID`; nếu rỗng thì sinh ID mới (edge); tạo `base.With("request_id", rid)`; nhét logger vào `context`; set lại header response. Service thứ 2 nhận request kèm header → dùng lại đúng ID.

```go
const hdr = "X-Request-ID"
type ctxKey struct{}

func reqIDMW(base *slog.Logger, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        rid := r.Header.Get(hdr)
        if rid == "" { rid = newID() }           // edge: sinh; giữa chuỗi: kế thừa
        w.Header().Set(hdr, rid)
        l := base.With("request_id", rid)
        ctx := context.WithValue(r.Context(), ctxKey{}, l)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

Chứng minh correlation: gateway sinh `req-abc`, gọi orders **kèm** `X-Request-ID: req-abc`; orders đọc header → cùng `req-abc`. Cả hai dòng log có `request_id="req-abc"` → filter ra cả chuỗi. Mấu chốt: **kế thừa khi header có sẵn** và **propagate header khi gọi tiếp**.

### BT3 — Child logger kế thừa

**Cách tiếp cận:** `With` trả về logger con đã đính field; chain nhiều tầng.

```go
base := slog.New(slog.NewJSONHandler(os.Stdout, nil))
svcLog := base.With("service", "api", "version", "v2.0")
reqLog := svcLog.With("request_id", "req-xyz")
reqLog.Info("handling", "path", "/orders")
// {"service":"api","version":"v2.0","request_id":"req-xyz","msg":"handling","path":"/orders"}
```

`reqLog` kế thừa cả `service` và `version` từ `svcLog`, không phải khai lại. Đây là cách phân tầng chuẩn: app-level → request-level.

### BT4 — Redact

**Cách tiếp cận:** cài `LogValue()` cho kiểu nhạy cảm — `slog` gọi nó thay vì in giá trị thật.

```go
type Password string
func (Password) LogValue() slog.Value { return slog.StringValue("[REDACTED]") }

type Card string
func (c Card) LogValue() slog.Value {
    s := string(c)
    if len(s) >= 4 { return slog.StringValue("****-****-****-" + s[len(s)-4:]) }
    return slog.StringValue("[REDACTED]")
}

slog.Info("checkout", "user", "u_1", "password", Password("hunter2"), "card", Card("4111111111111234"))
// {"msg":"checkout","user":"u_1","password":"[REDACTED]","card":"****-****-****-1234"}
```

Ưu điểm so với redact tay: **không thể quên** — mọi nơi log kiểu `Password` đều tự che. Card giữ 4 số cuối đủ để đối soát mà không lộ số đầy đủ.

### BT5 — Level-based

**Cách tiếp cận:** dùng `LevelVar` để đổi level; cùng hàm xử lý phát cả Debug (chi tiết) lẫn Info (tổng kết).

```go
func process(l *slog.Logger, orderID int) {
    l.Debug("validate", "order_id", orderID)          // chỉ hiện khi level=Debug
    l.Debug("price computed", "order_id", orderID, "total", 99.5)
    l.Debug("saved to db", "order_id", orderID)
    l.Info("order processed", "order_id", orderID, "total", 99.5)  // luôn hiện (>=Info)
}
```

Chạy với level Info → chỉ thấy dòng `order processed`. Đổi `lvl.Set(slog.LevelDebug)` → thấy cả 3 dòng Debug. Cùng một code, không sửa logic — chỉ đổi cấu hình level. Đây là lý do tách level: bật chi tiết khi điều tra, tắt khi bình thường để giảm noise.

### BT6 — Sửa antipattern

**Trước (xấu):**
```go
log.Printf("user %s order %d total %.2f failed: %v", u, id, total, err)
// user u_1 order 42 total 99.50 failed: timeout   (một chuỗi, không query được)
```

**Sau (structured):**
```go
slog.Error("order failed",
    slog.String("user_id", u),
    slog.Int("order_id", id),
    slog.Float64("total", total),
    slog.String("err", err.Error()),
)
// {"level":"ERROR","msg":"order failed","user_id":"u_1","order_id":42,"total":99.5,"err":"timeout"}
```

**Hai query giờ làm được (trước thì không):**
1. `{app="orders"} | json | level="ERROR" | total > 100` — lọc đơn lỗi có giá trị lớn (vì `total` là số, không phải chữ trong câu).
2. `sum by (user_id) (count_over_time({app="orders"} | json | msg="order failed" [1h]))` — đếm số đơn lỗi theo từng user (vì `user_id` là field group được).

---

## Code & Minh họa

- [`solutions.go`](./solutions.go) — chạy `go run solutions.go`: minh họa Text vs JSON handler, levels, `With` child logger, context logger + request ID, redaction bằng `LogValuer`, sampling handler.
- [`visualization.html`](./visualization.html) — 3 module tương tác:
  1. **Text vs JSON**: cùng một sự kiện hiện ở hai format, thấy ngay vì sao JSON query được.
  2. **Correlation ID trace**: 1 request đi xuyên 3 service, lọc theo `request_id`.
  3. **Log level filter**: stream log, kéo slider level để thấy cái gì bị lọc.

---

## Bài tiếp theo

→ [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/): log trả lời "chuyện gì đã xảy ra với request này"; metrics trả lời "hệ thống đang khỏe ra sao theo thời gian" (counter, gauge, histogram, RED/USE method). Hai cái bổ sung nhau trong observability, cùng với tracing ở [Lesson 74](../lesson-74-tracing-opentelemetry/).
