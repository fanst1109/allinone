// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-40-error-handling-deep/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 40 — Error Handling Deep (Production Patterns)

> Tier 3 · Bài 11/12 — đi sâu hơn [Lesson 19 — Errors](../lesson-19-errors/) bằng cách
> nhìn \`error\` ở góc **một dịch vụ production**: nó được log, được map sang HTTP, được retry,
> được alert, được hiển thị cho user, và thỉnh thoảng làm sập cả container.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Thiết kế được kiểu **structured error** (\`AppError\` có Code/Message/Cause/Fields) phục vụ log,
   HTTP map, monitoring — thay cho \`errors.New("...")\` cụt lủn.
2. Phân loại error thành **3 nhóm** (Domain / Infrastructure / Programming) và biết **nhóm nào panic, nhóm nào return**.
3. Phân biệt **Recoverable vs Fatal** và biết khi nào nên retry, khi nào nên shutdown.
4. Map error → **HTTP status code** đúng (404 / 422 / 401 / 500…) trong middleware tập trung.
5. Cài đặt **retry với exponential backoff + jitter**, biết error nào retryable, error nào KHÔNG.
6. Hiểu **circuit breaker** đứng ở đâu trong chuỗi retry → fallback → fail fast.
7. Wrap error đúng quy tắc: thêm context có giá trị, KHÔNG double-wrap, top-of-stack mới extract bằng \`errors.As\`.
8. Tách **internal error message** (cho dev) với **user-facing message** (cho client) — vừa debug được, vừa không lộ stack/SQL.
9. Tránh ≥ 6 anti-pattern phổ biến đã thấy trong code production.

## Kiến thức tiền đề

- [Lesson 19 — Errors](../lesson-19-errors/) (sentinel, \`errors.Is\`, \`errors.As\`, \`%w\` wrap, panic/recover).
- [Lesson 18 — Interfaces](../lesson-18-interfaces/) (vì \`error\` là interface).
- [Lesson 29 — Context](../lesson-29-context-cancellation/) (sẽ gặp \`context.Canceled\`, \`context.DeadlineExceeded\`).
- [Lesson 36 — Concurrency Patterns](../lesson-36-concurrency-patterns/) (sẽ nhắc lại circuit breaker).

---

## 1. Recap nhanh Lesson 19 — cái gì còn đúng, cái gì cần đào sâu

L19 đã dạy:

- \`error\` là **interface** một method: \`Error() string\`.
- **Sentinel error**: hằng global, so sánh bằng \`errors.Is(err, io.EOF)\`.
- **Wrap**: \`fmt.Errorf("read config: %w", err)\` — verb \`%w\` lưu lại nguyên gốc.
- **Custom error type**: \`struct\` implement \`Error() string\`, extract bằng \`errors.As\`.
- **Panic vs error**: panic cho **bug lập trình** (nil deref, index out of range); error cho **mọi tình huống chạy được nhưng không thành công** (file không tồn tại, DB timeout, validation fail).

L40 đào sâu **3 câu hỏi L19 chưa trả lời**:

| Câu hỏi | L19 trả lời chung chung | L40 sẽ giải đáp cụ thể |
|---------|------------------------|-----------------------|
| "Custom error nên có field gì?" | "Tuỳ bạn, miễn implement \`Error()\`" | Mô hình \`AppError{Code, Message, Cause, Fields}\` chuẩn cho service production |
| "Khi nào nên retry?" | Không đề cập | Phân loại retryable vs non-retryable; backoff + jitter; circuit breaker |
| "User thấy error thế nào?" | Không đề cập | Tách internal/external, map sang HTTP status, không lộ stack |

> 💡 **Trực giác.** Trong L19, \`error\` chỉ là "tôi không làm được". Trong L40, \`error\` là **một sự kiện được log, được phân loại, được hiển thị, đôi khi được thử lại** — nó có ID, có category, có severity, giống như log entry chứ không phải chỉ là string.

---

## 2. Structured Error — \`error\` không chỉ là một câu chữ

### 2.1 Vấn đề của \`errors.New("...")\`

\`\`\`go
// Cách viết cụ ngày xưa:
if user == nil {
    return errors.New("user not found")
}
\`\`\`

Đến tay HTTP handler:

\`\`\`go
if err != nil {
    http.Error(w, err.Error(), 500) // luôn 500, luôn show internal message
    return
}
\`\`\`

**Hệ quả thực tế**:

- Mọi error đều ra HTTP 500, dù bản chất là 404. Frontend không biết hiển thị thế nào.
- Message "user not found" lộ ra cho user cuối cùng — có khi lộ luôn cấu trúc DB ("ERROR: relation \\"users\\" does not exist").
- Log không có field — grep được nhưng không group/aggregate được. Sentry thấy 1000 lỗi khác nhau mà thực ra cùng 1 nguyên nhân.

### 2.2 Mẫu \`AppError\`

\`\`\`go
type AppError struct {
    Code    string         // máy đọc: "USER_NOT_FOUND", "VALIDATION_FAILED"
    Message string         // người đọc (dev): "user with id=42 not found"
    Cause   error          // error gốc (wrap chain)
    Fields  map[string]any // context phụ: user_id, request_id, retry_count
}

func (e *AppError) Error() string {
    if e.Cause != nil {
        return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Cause)
    }
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error { return e.Cause }
\`\`\`

> ❓ **"Sao không gộp Code vào Message luôn?"**
> Vì Code là **enum cho máy** (HTTP map, monitoring count, i18n key), Message là **chuỗi cho người**. Trộn vào nhau thì khi đổi Message (vd chuyển sang tiếng Việt), Code cũng đổi theo → vỡ monitoring dashboard. Tách ra để **Code ổn định**.

### 2.3 Constructor helper

\`\`\`go
func NotFound(resource string, id any) *AppError {
    return &AppError{
        Code:    "NOT_FOUND",
        Message: fmt.Sprintf("%s with id=%v not found", resource, id),
        Fields:  map[string]any{"resource": resource, "id": id},
    }
}

func Validation(field, reason string) *AppError {
    return &AppError{
        Code:    "VALIDATION",
        Message: fmt.Sprintf("invalid %s: %s", field, reason),
        Fields:  map[string]any{"field": field, "reason": reason},
    }
}

func Internal(cause error, msg string) *AppError {
    return &AppError{
        Code:    "INTERNAL",
        Message: msg,
        Cause:   cause,
    }
}
\`\`\`

Code gọi:

\`\`\`go
user, err := repo.FindByID(ctx, 42)
if err != nil {
    if errors.Is(err, sql.ErrNoRows) {
        return NotFound("user", 42)
    }
    return Internal(err, "looking up user")
}
\`\`\`

### 2.4 Ví dụ số — log 1000 request, phân loại

Service nhận 1000 request, 50 fail. Với \`errors.New\`, log như:

\`\`\`
ERROR user not found
ERROR user 42 not found
ERROR User Not Found
ERROR no user with id 42
\`\`\`

Sentry/Datadog không biết đây là **cùng 1 lỗi** (vì message khác nhau từng dòng). Với AppError, mọi entry đều có \`code=USER_NOT_FOUND\` → group 50 entry thành **1 issue**, có count, có trend, có alert "lỗi NOT_FOUND tăng 300% so với hôm qua".

> 📝 **Tóm tắt mục 2.**
> - \`AppError\` có 4 thành phần: **Code** (enum), **Message** (dev-readable), **Cause** (chain), **Fields** (context).
> - Constructor helper cho từng loại lỗi (\`NotFound\`, \`Validation\`, \`Internal\`) — code gọi sạch, không bị \`&AppError{Code: "..."}\` rải khắp file.
> - Lợi ích đo được: monitoring group được, HTTP map được, log search được, alert được.

---

## 3. Phân loại error — 3 nhóm, 3 cách xử lý

Không phải error nào cũng giống nhau. Trộn lẫn là sai. Có **3 nhóm rõ ràng**:

### 3.1 Domain error (lỗi nghiệp vụ)

- **Bản chất**: caller hoặc dữ liệu đầu vào không thoả mãn luật nghiệp vụ.
- **Ví dụ**: email format sai, tài khoản hết tiền, mã giảm giá hết hạn, user chưa verify.
- **Cách xử lý**: return error có **Code rõ** (\`VALIDATION\`, \`INSUFFICIENT_FUNDS\`, \`COUPON_EXPIRED\`). HTTP 4xx. KHÔNG retry (retry không thay đổi được data đầu vào).
- **Severity**: thấp. Không alert. Đếm trend là đủ.

### 3.2 Infrastructure error (lỗi hạ tầng)

- **Bản chất**: hạ tầng phía dưới có vấn đề tạm thời hoặc kéo dài.
- **Ví dụ**: DB connection refused, Redis timeout, HTTP downstream 503, network reset.
- **Cách xử lý**: thử **retry với backoff**. Quá ngưỡng → fail fast (circuit breaker). HTTP 5xx hoặc 503 với \`Retry-After\`.
- **Severity**: trung bình → cao. Alert khi rate > threshold.

### 3.3 Programming error (bug)

- **Bản chất**: code SAI. Không có input nào hợp lệ làm ra được lỗi này nếu code đúng.
- **Ví dụ**: nil pointer deref, index out of range, type assertion sai, lỗi logic không bao giờ xảy ra theo thiết kế.
- **Cách xử lý**: **panic**. Recover ở top (HTTP middleware) để khỏi sập cả process, log full stack, **alert ngay (severity = high)**. KHÔNG retry — retry với cùng input sẽ panic tiếp.
- **Severity**: cao nhất. Bug trong code = ưu tiên fix.

### 3.4 Bảng so sánh

| Đặc tính | Domain | Infrastructure | Programming |
|----------|--------|----------------|-------------|
| Nguyên nhân | Input/data sai luật | Hạ tầng tạm hỏng | Code sai |
| Cách trả về | \`return *AppError\` | \`return *AppError\` (wrap) | \`panic\` |
| HTTP status | 4xx (422, 404, 409) | 5xx (502, 503, 504) | 500 (sau khi recover) |
| Retry? | KHÔNG | CÓ (backoff) | KHÔNG |
| Alert? | Chỉ khi spike bất thường | Khi vượt threshold | LUÔN |
| Fix bằng | User sửa input | Đợi hạ tầng / tăng capacity | Dev sửa code |

> ⚠ **Lỗi thường gặp.** Nhiều team gom hết về \`INTERNAL\` rồi quăng HTTP 500 cho mọi thứ. Hệ quả: frontend không biết hiển thị "email sai định dạng" (422) khác "DB down" (503), user thấy "Có lỗi xảy ra" mãi không sửa được. Phân nhóm là bước **tiên quyết** để UX đúng.

> 🔁 **Dừng lại tự kiểm tra.**
> "Hết tiền trong tài khoản khi rút" thuộc nhóm nào?
>
> <details><summary>Đáp án</summary>
> Domain error. Nguyên nhân là **dữ liệu hợp lệ về cú pháp nhưng vi phạm luật nghiệp vụ** (số dư < số tiền rút). Trả về \`*AppError{Code: "INSUFFICIENT_FUNDS"}\` với HTTP 422. KHÔNG retry. KHÔNG alert.
> </details>

---

## 4. Recoverable vs Fatal — quyết định "sống tiếp hay chết hẳn"

Trong runtime, mỗi error sẽ đi qua câu hỏi: **"Có cứu được không?"**

### 4.1 Recoverable

- Định nghĩa: sau khi xử lý error này, **service vẫn phục vụ được request khác**.
- Hành động: log → trả lỗi cho caller (HTTP response, gRPC status) → tiếp tục.
- Ví dụ: validation fail, DB query lỗi, downstream timeout cho 1 request cụ thể.

### 4.2 Fatal

- Định nghĩa: state đã hỏng đến mức **không thể phục vụ tiếp một cách đáng tin**.
- Hành động: log + flush + **kết thúc process** (\`os.Exit(1)\` hoặc panic không recover) → để orchestrator (Kubernetes, systemd) restart container sạch sẽ.
- Ví dụ:
  - Init lỗi: config sai, không connect được DB lúc khởi động.
  - State corruption: in-memory cache có dữ liệu inconsistent không thể tự sửa.
  - Tự phát hiện invariant vi phạm (vd \`if balance < 0 { log.Fatal(...) }\`).

### 4.3 Ví dụ ranh giới

\`\`\`go
// Recoverable: 1 query lỗi -> trả 500 cho request đó
row, err := db.QueryRow(ctx, "SELECT ...")
if err != nil {
    return Internal(err, "fetching order")
}

// Fatal: KHÔNG connect được DB lúc startup -> không có lý do chạy tiếp
if err := db.Ping(); err != nil {
    log.Fatalf("cannot connect to DB at startup: %v", err)
}
\`\`\`

> ❓ **"Sao không log.Fatal luôn khi query lỗi cũng được? Đỡ phải nghĩ nhiều."**
>
> Vì 1 query lỗi của 1 request thường chỉ ảnh hưởng **request đó**. Crash cả container = cắt mạng 999 user khác đang OK. Kubernetes restart mất 5-15s, trong khoảng đó toàn bộ traffic về pod bị refuse. Đây là **cascading failure tự gây ra**.

### 4.4 Ai ra quyết định?

- Trong **lib/package** (DB driver, repo, service layer): **luôn return error**. Không quyết định thay caller. Lib mà tự \`os.Exit\` là lib tồi.
- Trong **main / startup**: được phép \`log.Fatal\` nếu init fail.
- Trong **middleware**: recover panic, log full stack, trả 500.

> 📝 **Tóm tắt mục 4.**
> - Recoverable = ảnh hưởng 1 request → return error, service sống tiếp.
> - Fatal = ảnh hưởng toàn process → exit + để orchestrator restart.
> - **Quyết định Fatal chỉ ở 2 chỗ**: \`main()\` lúc init, và panic không recover từ bug.

---

## 5. Error code system — bảng mã chuẩn cho service

Code là **string ổn định** (không đổi theo i18n, không đổi theo refactor). Quy ước nội bộ:

\`\`\`
ERR-<DOMAIN>-<SPECIFIC>
\`\`\`

Ví dụ thực tế (payment service):

| Code | HTTP | Severity | Ý nghĩa |
|------|------|----------|---------|
| \`ERR-USER-NOT-FOUND\` | 404 | low | User không tồn tại |
| \`ERR-USER-UNAUTHORIZED\` | 401 | low | Token sai/thiếu |
| \`ERR-USER-FORBIDDEN\` | 403 | low | Có token nhưng không đủ quyền |
| \`ERR-VALIDATION\` | 422 | low | Input không hợp lệ |
| \`ERR-PAYMENT-DECLINED\` | 422 | medium | Ngân hàng từ chối (insufficient funds, card expired) |
| \`ERR-PAYMENT-DUPLICATE\` | 409 | medium | Idempotency key trùng |
| \`ERR-RATE-LIMITED\` | 429 | medium | Client gọi quá nhanh |
| \`ERR-DB-TIMEOUT\` | 503 | high | DB không response trong deadline |
| \`ERR-DOWNSTREAM-UNAVAILABLE\` | 503 | high | Service phụ thuộc đang down |
| \`ERR-INTERNAL\` | 500 | high | Catch-all, đáng lẽ không gặp |

### 5.1 Vì sao Code phải document cho client?

Client (mobile app, web SPA, third-party integration) cần map code → UI:

- \`ERR-PAYMENT-DECLINED\` → "Thẻ của bạn bị từ chối, vui lòng dùng thẻ khác."
- \`ERR-RATE-LIMITED\` → "Bạn thao tác quá nhanh, đợi 5s." + disable button.
- \`ERR-DB-TIMEOUT\` → "Hệ thống đang bận, thử lại sau." + nút Retry.

Nếu chỉ trả message string → client không thể switch logic → UX phải parse string (tệ).

### 5.2 Quy tắc đặt code

- **Stable**: một khi đã phát hành, KHÔNG đổi code. Đổi message thoải mái, đổi HTTP có thể, nhưng code = contract.
- **Có namespace**: prefix theo domain (\`USER\`, \`PAYMENT\`, \`INVENTORY\`) để tránh va chạm khi merge service.
- **Specific đủ để debug, generic đủ để gom**. \`ERR-PAYMENT-DECLINED-CARD-EXPIRED-MASTERCARD\` là quá specific → mỗi loại thẻ 1 code → không group được. \`ERR-PAYMENT-DECLINED\` đủ rộng, chi tiết để vào \`Fields\`.

> 📝 **Tóm tắt mục 5.** Code = enum stable, máy đọc, làm contract với client + monitoring. Message = chuỗi cho người, có thể đổi. Đặt code theo \`ERR-<DOMAIN>-<SPECIFIC>\`, document đầy đủ.

---

## 6. HTTP error mapping — middleware tập trung

Quy tắc: **handler KHÔNG tự gọi \`http.Error\`**, chỉ return error. **Một middleware duy nhất** map error → response.

### 6.1 Vì sao tập trung?

- Tránh mỗi handler tự đoán status code → không nhất quán.
- Một chỗ thay đổi response format (vd thêm field \`trace_id\`) → áp dụng toàn service.
- Tách concern: handler lo logic, middleware lo HTTP convention.

### 6.2 Code minh hoạ

\`\`\`go
func httpError(err error) (status int, code, msg string) {
    var appErr *AppError
    if errors.As(err, &appErr) {
        switch appErr.Code {
        case "NOT_FOUND":     return 404, appErr.Code, appErr.Message
        case "VALIDATION":    return 422, appErr.Code, appErr.Message
        case "UNAUTHORIZED":  return 401, appErr.Code, "Bạn cần đăng nhập"
        case "RATE_LIMITED":  return 429, appErr.Code, "Bạn thao tác quá nhanh"
        case "DB_TIMEOUT", "DOWNSTREAM_UNAVAILABLE":
            return 503, appErr.Code, "Hệ thống đang bận, thử lại sau"
        }
    }
    return 500, "INTERNAL", "Đã có lỗi, vui lòng thử lại"
}

func ErrorMiddleware(next func(http.ResponseWriter, *http.Request) error) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := next(w, r); err != nil {
            status, code, msg := httpError(err)
            log.Error("request failed", "status", status, "code", code, "error", err.Error())
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(status)
            json.NewEncoder(w).Encode(map[string]string{"code": code, "message": msg})
        }
    }
}
\`\`\`

Code đầy đủ với 6 case + recover panic xem ở [solutions.go](./solutions.go).

### 6.3 Ví dụ số — đường đi của 1 error

Request \`GET /users/42\`:

1. Handler gọi \`userService.Get(42)\`.
2. Service gọi \`repo.FindByID(ctx, 42)\`.
3. Repo gặp \`sql.ErrNoRows\` → wrap \`NotFound("user", 42)\` → trả lên.
4. Service wrap thêm context: \`fmt.Errorf("getting user profile: %w", err)\`.
5. Handler return error đó.
6. Middleware \`errors.As(err, &appErr)\` → tìm thấy \`*AppError{Code: "NOT_FOUND"}\` ở giữa chain.
7. Map → status 404, response \`{"code": "NOT_FOUND", "message": "user with id=42 not found"}\`.
8. Log internal: \`[NOT_FOUND] user with id=42 not found: sql: no rows in result set\`.

User thấy 404 + message rõ. Dev thấy full chain trong log.

> ⚠ **Lỗi thường gặp.** Trả \`appErr.Error()\` cho user. Hàm \`Error()\` của AppError có thể chứa cả \`Cause\` (vd \`sql: no rows\`) → lộ DB error ra ngoài. **Chỉ trả \`appErr.Message\`** trong response, hoặc thay bằng message friendly hoàn toàn.

---

## 7. Retry pattern — backoff + jitter

### 7.1 Khi nào retry?

**Retry có ý nghĩa** khi lỗi là **tạm thời (transient)**:

- Network: connection reset, timeout, DNS lookup fail.
- HTTP downstream: 502, 503, 504, 429 (rate limit).
- DB: connection pool exhausted, deadlock, lock timeout.

**KHÔNG retry** khi:

- Validation, NOT_FOUND, UNAUTHORIZED, FORBIDDEN (4xx trừ 408, 429).
- \`context.Canceled\` (caller đã chủ động huỷ — retry là sai ý caller).
- Programming error (panic recover xong retry → panic tiếp).
- Operation non-idempotent (charge thẻ) trừ khi có idempotency key.

### 7.2 Exponential backoff + jitter

\`\`\`
Attempt 1: delay = 0
Attempt 2: delay = 1s + jitter
Attempt 3: delay = 2s + jitter
Attempt 4: delay = 4s + jitter
Attempt 5: delay = 8s + jitter   <- max attempts = 5
\`\`\`

Công thức:

\`\`\`
delay = min(baseDelay * 2^(attempt-1), maxDelay)
delay_with_jitter = delay * (0.5 + rand(0, 1))   // ±50% jitter
\`\`\`

> 💡 **Vì sao cần jitter?** Nếu 1000 client cùng fail lúc t=0, không có jitter thì cả 1000 retry cùng lúc t=1s — đập DB sập lần nữa. Jitter rải đều ra khoảng [0.5s, 1.5s] → DB hồi sức kịp.

### 7.3 Ví dụ số

\`baseDelay = 1s, maxDelay = 30s, maxAttempts = 5\`:

| Attempt | base delay | với jitter ±50% |
|---------|-----------|------------------|
| 1 | 0 | 0 (gọi ngay) |
| 2 | 1s | 0.5–1.5s |
| 3 | 2s | 1.0–3.0s |
| 4 | 4s | 2.0–6.0s |
| 5 | 8s | 4.0–12.0s |

Tổng thời gian xấu nhất ≈ 0 + 1.5 + 3 + 6 + 12 = **22.5s**. Phải nằm trong deadline của caller (context).

### 7.4 Code mẫu

\`\`\`go
func Retry(ctx context.Context, fn func() error, opts ...RetryOption) error {
    cfg := defaultConfig()
    for _, o := range opts { o(&cfg) }

    var lastErr error
    for attempt := 1; attempt <= cfg.maxAttempts; attempt++ {
        if err := fn(); err == nil {
            return nil
        } else if !isRetryable(err) {
            return err // dừng ngay
        } else {
            lastErr = err
        }

        if attempt == cfg.maxAttempts { break }

        delay := backoff(cfg.baseDelay, cfg.maxDelay, attempt)
        delay = applyJitter(delay)

        select {
        case <-time.After(delay):
        case <-ctx.Done():
            return fmt.Errorf("retry aborted: %w", ctx.Err())
        }
    }
    return fmt.Errorf("after %d attempts: %w", cfg.maxAttempts, lastErr)
}
\`\`\`

### 7.5 Library

- **\`github.com/cenkalti/backoff/v4\`**: đầy đủ tính năng (exp backoff, jitter, max elapsed time, custom retryable check). Production-grade.
- **\`github.com/avast/retry-go\`**: API nhẹ, dễ học.
- **Tự viết**: ~50 LOC, tốt cho learning và microservice không muốn deps.

> ⚠ **Lỗi thường gặp.** Retry trong DB transaction. Nếu retry bên trong \`BEGIN ... COMMIT\`, mỗi attempt sẽ giữ lock lâu hơn → deadlock cascade. **Retry ở ngoài transaction**, hoặc dùng savepoint nội bộ DB.

---

## 8. Circuit breaker — biết khi nào ngừng retry

Đã touch ở [Lesson 36](../lesson-36-concurrency-patterns/), nhắc lại trong bối cảnh error:

### 8.1 Vấn đề

Service B down. Service A retry mỗi request → spawn 1000 retry/s → đập B (đang yếu) → B không hồi phục → A tốn tài nguyên (goroutine, connection) chờ retry → A cũng down → cascading failure.

### 8.2 Cơ chế

Circuit breaker quan sát rate fail của downstream theo cửa sổ thời gian:

- **CLOSED** (mặc định): mọi request đi qua, đếm failure.
- Fail rate vượt threshold (vd 50% trong 60s) → **OPEN**: từ chối ngay mọi request (fail fast, không gọi B nữa).
- Sau \`timeout\` (vd 30s) → **HALF-OPEN**: cho 1-2 request thử. Nếu OK → CLOSED. Nếu fail → OPEN tiếp.

### 8.3 Vị trí trong chuỗi

\`\`\`
caller → retry(backoff) → circuit breaker → downstream service
                         ↑
              breaker open => trả lỗi ngay, không tốn 22.5s retry
\`\`\`

Lib: \`github.com/sony/gobreaker\`, \`github.com/afex/hystrix-go\`.

> 📝 **Tóm tắt 7+8.** Retry giúp xử lý lỗi **tạm thời ngắn**. Circuit breaker tránh **lỗi kéo dài** biến thành cascading failure. Hai cái bổ sung nhau, không thay nhau.

---

## 9. Error wrapping best practice

### 9.1 Wrap để thêm CONTEXT có giá trị

\`\`\`go
// Tệ: wrap không thêm gì
if err != nil {
    return fmt.Errorf("error: %w", err) // "error: ..." -- thừa
}

// Tốt: thêm thông tin định danh
if err != nil {
    return fmt.Errorf("getting user %d from cache: %w", userID, err)
}
\`\`\`

Sau khi đi qua 3 layer:

\`\`\`
getting user 42 from cache: db query users by id: connection refused: dial tcp 127.0.0.1:5432
\`\`\`

Đọc log một dòng là **biết toàn bộ đường đi**.

### 9.2 KHÔNG double-wrap

\`\`\`go
// Layer 1 (repo):
return fmt.Errorf("query users by id=%d: %w", id, err)

// Layer 2 (service) -- TỆ:
return fmt.Errorf("error querying user by id=%d: %w", id, err)
// -> log thành "error querying user by id=42: query users by id=42: ..."
// id=42 lặp lại, "query"/"querying" lặp lại
\`\`\`

Quy tắc: mỗi layer chỉ thêm **thông tin của layer đó**:

- Repo: tên bảng / SQL / id.
- Service: tên use case ("processing payment", "creating user").
- Handler: tên endpoint ("POST /users").

### 9.3 Top-of-stack mới extract

\`\`\`go
// Repo / service: chỉ wrap và return
return fmt.Errorf("processing payment: %w", err)

// HTTP middleware (top of stack): extract
var appErr *AppError
if errors.As(err, &appErr) {
    // map sang HTTP status
}
\`\`\`

KHÔNG \`errors.As\` ở mỗi layer giữa chừng — vì:

- Lặp code (n layer × switch n nhánh).
- Vô tình "nuốt" error: layer giữa thấy \`NOT_FOUND\` → tự xử lý → nuốt mất → layer trên không biết.

### 9.4 Sentinel vs typed error — khi nào dùng cái nào?

- **Sentinel** (\`var ErrNotFound = errors.New("not found")\`): dùng khi error **không có data đi kèm**, chỉ là tín hiệu. Caller dùng \`errors.Is\`.
- **Typed** (\`*AppError\`): dùng khi error **có context** (id, field, retry hint). Caller dùng \`errors.As\`.

Trong service production thường dùng **typed (AppError) làm chính**, sentinel chỉ cho package-internal (vd \`io.EOF\`).

> ⚠ **Lỗi thường gặp.** Tạo sentinel error global cho TẤT CẢ trường hợp: \`ErrInvalidEmail\`, \`ErrInvalidPhone\`, \`ErrInvalidAge\`... → 50 var global. Thay vào đó dùng 1 \`Validation(field, reason)\` typed error.

---

## 10. Stack trace — khi nào cần, giá phải trả

### 10.1 Vì sao cần

Khi error đi qua nhiều layer + goroutine, đọc message chain xong nhiều khi vẫn không biết **dòng code nào** gây ra. Stack trace chỉ thẳng đến file:line.

### 10.2 Cách thêm stack

- **\`pkg/errors\`** (deprecated nhưng vẫn dùng): \`errors.Wrap(err, "fetching user")\` rồi \`fmt.Printf("%+v", err)\` in cả stack.
- **\`runtime/debug\` (Go 1.21+ chuẩn)**: tự định nghĩa \`StackError{err, stack}\` capture \`debug.Stack()\` ở chỗ cần. Code đầy đủ xem [solutions.go](./solutions.go) (struct \`StackError\`).
- **Chỉ capture ở top** (rẻ nhất): khi \`panic\`/\`recover\` ở middleware, gọi \`debug.Stack()\` ngay tại đó là đủ — không cần mọi layer mang stack.

### 10.3 Trade-off

| Cách | Chi phí | Khi nào hợp lý |
|------|--------|---------------|
| Wrap thường (\`%w\` + context) | ~ns | Mọi error |
| \`pkg/errors\` ở mỗi layer | ~µs (capture stack 1 lần đầu wrap) | Service vừa, không quá nhạy perf |
| Stack chỉ ở top (panic recover) | ~µs nhưng chỉ khi panic | Service hot path |

> ❓ **"Capture stack ở mọi layer có sao đâu, tiện debug mà?"**
>
> Capture stack = \`runtime.Callers\` → ~1µs + ~500 byte allocation. Service 10k req/s × 5 layer wrap = 50k stack/s × 500 byte = **25 MB/s allocation** thêm cho GC. Trên hot path là đáng kể. Dùng sparingly: chỉ ở **biên** (DB call, HTTP call, panic recover).

---

## 11. Error logging strategy

### 11.1 Structured log — không dùng \`fmt.Println\`

\`\`\`go
// Tệ:
log.Println("user lookup failed", err)

// Tốt (slog hoặc zap/zerolog):
log.Error("user lookup failed",
    slog.String("error_code", appErr.Code),
    slog.Int("user_id", userID),
    slog.String("request_id", reqID),
    slog.String("error", err.Error()),
)
\`\`\`

Output JSON:

\`\`\`json
{"level":"error","msg":"user lookup failed","error_code":"NOT_FOUND","user_id":42,"request_id":"req-xyz","error":"[NOT_FOUND] user with id=42 not found"}
\`\`\`

→ ELK / Loki / Datadog parse được, query được theo từng field.

### 11.2 Aggregate

- **Sentry / Honeycomb / Bugsnag**: tự group theo \`error_code\` + stack signature. 1000 lỗi cùng dạng = 1 issue.
- **Datadog APM / NewRelic**: count + percentile, alert khi rate tăng.
- **Loki + Grafana**: structured log + dashboard tự build.

### 11.3 Sampling high-volume

Nếu 1 error happen 10k lần/s (vd timeout downstream lúc nó down):

- Log full 100% → đầy disk, đắt tiền Sentry, lag I/O.
- **Sample**: log 1/100 lần đầu, sau đó 1/1000 + đếm tổng số.

\`\`\`go
if rand.Intn(100) == 0 || isFirstOccurrence(appErr.Code) {
    log.Error(...)
}
metrics.Inc("error_count", appErr.Code)
\`\`\`

> 📝 **Tóm tắt 11.** Log structured (JSON, có field) → aggregate được. Sample khi high-volume. Metric (count) tách rời log (chi tiết).

---

## 12. User-facing message — tách internal vs external

### 12.1 Lý do an ninh

Internal message có thể chứa:

- Stack trace (lộ filename, package, version).
- SQL fragment (lộ schema, có khi cả dữ liệu của user khác trong WHERE clause của lỗi).
- IP/hostname downstream (lộ kiến trúc, mở đường cho attack).
- File path (lộ OS).

User-facing tuyệt đối KHÔNG lộ những thứ trên.

### 12.2 Mẫu tách

\`\`\`go
type AppError struct {
    Code            string
    Message         string  // internal — log
    UserMessage     string  // external — response body
    // ...
}

func PaymentDeclined(reason string) *AppError {
    return &AppError{
        Code:        "PAYMENT_DECLINED",
        Message:     "payment gateway declined: " + reason, // dev đọc
        UserMessage: "Thẻ của bạn bị từ chối. Vui lòng thử thẻ khác hoặc liên hệ ngân hàng.",
    }
}
\`\`\`

Middleware:

\`\`\`go
response.Message = appErr.UserMessage  // KHÔNG lấy Message
log.Error("...", "internal_msg", appErr.Message)
\`\`\`

### 12.3 Ví dụ đối chiếu

| Sự kiện | Internal (log) | External (UI) |
|---------|---------------|---------------|
| DB timeout | \`DB query timeout after 5s: ctx deadline exceeded\` | "Hệ thống đang bận, thử lại sau." |
| Validation | \`email regex mismatch: 'abc@@'\` | "Email không hợp lệ." |
| Auth | \`JWT signature invalid: alg=HS256 expected RS256\` | "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại." |
| Payment | \`gateway 4234: insufficient_funds card_last4=4242\` | "Thẻ của bạn không đủ số dư." |

> ⚠ **Lỗi thường gặp.** Lười, dùng chung 1 field cho cả 2 → hoặc log thiếu thông tin (chọn câu friendly), hoặc UX lộ stack (chọn câu kỹ thuật). Tách rõ 2 field là rẻ nhất.

---

## 13. Idempotency + error — retry an toàn

### 13.1 Idempotent là gì?

Operation idempotent: **gọi 1 lần hay nhiều lần cho cùng input → cùng kết quả**.

- \`GET /users/42\` — idempotent (đọc).
- \`PUT /users/42 {name: "Alice"}\` — idempotent (gán = giá trị mới, gán bao nhiêu lần cũng vậy).
- \`DELETE /users/42\` — idempotent (xoá rồi xoá nữa = không có gì khác).
- \`POST /charge {amount: 100}\` — **KHÔNG** idempotent (mỗi lần gọi = trừ tiền 1 lần).

### 13.2 Retry trên non-idempotent = nguy hiểm

\`\`\`
Client gọi POST /charge {amount: 100}
  → Server trừ tiền OK
  → Server gửi response, mạng đứt
  → Client timeout, retry
  → Server trừ tiền LẦN 2
  → User mất 200 thay vì 100
\`\`\`

### 13.3 Idempotency key

Client tự sinh UUID kèm theo request:

\`\`\`http
POST /charge
Idempotency-Key: 7e3d-...
{ "amount": 100 }
\`\`\`

Server:

1. Check key trong cache (Redis, DB) trước khi thực hiện.
2. Nếu thấy → trả response cũ luôn, KHÔNG charge lại.
3. Nếu chưa thấy → charge + lưu (key → response) TTL 24h.

Retry với cùng key = an toàn. Stripe, Square dùng pattern này.

### 13.4 Quy tắc retry

- Idempotent (GET, PUT, DELETE) → retry **tự do**.
- Non-idempotent (POST charge, send email) → **chỉ retry khi có idempotency key**, hoặc retry duy nhất với guarantee "request đầu chắc chắn chưa đến server".

> 📝 **Tóm tắt 13.** Trước khi retry, hỏi: "operation này gọi 2 lần có sao không?". Có → idempotency key (Redis cache + TTL).

---

## 14. Anti-pattern — tránh xa 6 cái sau

### 14.1 Generic error message

\`\`\`go
// Tệ:
return errors.New("error occurred")
return errors.New("failed")
return errors.New("oops")
\`\`\`

Log thấy 1000 dòng "error occurred" → không debug được. Phải kèm **what** + **identifier**:

\`\`\`go
return fmt.Errorf("creating order for user=%d sku=%s: %w", userID, sku, err)
\`\`\`

### 14.2 Log error + return error (double log)

\`\`\`go
// Tệ:
if err != nil {
    log.Error("db query failed", "error", err)
    return err
}
\`\`\`

Caller cũng log → cuối cùng log 2-3 lần cho cùng 1 error → grep nhầm là 3 lỗi khác nhau, dashboard count gấp 3.

**Quy tắc**: chỉ log ở **một** chỗ — thường là top (HTTP middleware). Layer giữa chỉ wrap + return.

\`\`\`go
// Tốt:
if err != nil {
    return fmt.Errorf("db query users id=%d: %w", id, err)
}
\`\`\`

### 14.3 Wrap với câu chung chung

\`\`\`go
return fmt.Errorf("failed: %w", err)
return fmt.Errorf("error: %w", err)
return fmt.Errorf("internal error: %w", err)
\`\`\`

Wrap mà KHÔNG thêm thông tin = wrap thừa. Đáng lẽ là \`return err\` thẳng, hoặc wrap có nội dung.

### 14.4 Sentinel error global cho mọi case

\`\`\`go
// Tệ — 50+ var global, mỗi case lại thêm 1 var:
var (
    ErrUserNotFound          = errors.New("user not found")
    ErrUserEmailInvalid      = errors.New("user email invalid")
    ErrUserPhoneInvalid      = errors.New("user phone invalid")
    // ... 50 dòng nữa
)
\`\`\`

Không có context (id, field name). Không group được. Dùng \`*AppError{Code, Fields}\` thay thế.

### 14.5 Silent swallow

\`\`\`go
// Cực tệ:
if err != nil {
    return nil // im lặng nuốt
}

if err != nil {
    // TODO: handle later
}

defer func() {
    file.Close() // ignore close error
}()
\`\`\`

Lỗi mất tích → bug debug 3 ngày. Quy tắc: hoặc handle, hoặc return. Nếu thực sự muốn bỏ qua → comment lý do:

\`\`\`go
defer func() {
    _ = file.Close() // best-effort, đã write xong, đóng lỗi không ảnh hưởng
}()
\`\`\`

### 14.6 Trả \`err.Error()\` thẳng cho user

\`\`\`go
// Tệ:
http.Error(w, err.Error(), 500)
// User thấy: "pq: connection refused: dial tcp 10.0.0.5:5432: connection refused"
\`\`\`

Lộ IP DB, lộ port, lộ driver. Dùng \`httpError(err)\` middleware tách internal/external.

> 🔁 **Dừng lại tự kiểm tra.** Đoạn code nào sai?
>
> \`\`\`go
> func charge(amount int) error {
>     if amount <= 0 {
>         return errors.New("invalid")
>     }
>     if err := bank.Charge(amount); err != nil {
>         log.Error("charge failed", "err", err)
>         return err
>     }
>     return nil
> }
> \`\`\`
>
> <details><summary>Đáp án</summary>
>
> 3 vi phạm:
> 1. \`errors.New("invalid")\` — generic, không nói gì sai (mục 14.1).
> 2. \`log.Error\` ở đây + \`return err\` → caller cũng log → double (mục 14.2).
> 3. Không wrap context → trên kia chỉ thấy \`bank.Charge\` error mà không biết flow nào gây ra.
>
> Bản sửa:
> \`\`\`go
> func charge(userID int, amount int) error {
>     if amount <= 0 {
>         return Validation("amount", "phải > 0")
>     }
>     if err := bank.Charge(amount); err != nil {
>         return fmt.Errorf("charging user=%d amount=%d: %w", userID, amount, err)
>     }
>     return nil
> }
> \`\`\`
> </details>

---

## 15. Bài tập

### Bài 1 — \`AppError\` struct + constructor

Viết struct \`AppError\` với 4 field (\`Code\`, \`Message\`, \`Cause\`, \`Fields\`), implement \`Error()\` và \`Unwrap()\`. Thêm 3 constructor: \`NotFound(resource, id)\`, \`Validation(field, reason)\`, \`Internal(cause, msg)\`.

Test: tạo 1 \`NotFound("user", 42)\`, wrap thêm \`fmt.Errorf("processing request: %w", err)\`, sau đó \`errors.As\` để extract lại — phải in đúng \`Code = "NOT_FOUND"\`.

### Bài 2 — HTTP middleware

Viết hàm \`httpError(err error) (status int, code, msg string)\` map \`*AppError.Code\` sang status:

- \`NOT_FOUND\` → 404
- \`VALIDATION\` → 422
- \`UNAUTHORIZED\` → 401
- \`RATE_LIMITED\` → 429
- \`DB_TIMEOUT\` → 503
- default → 500 + generic message

Sau đó viết \`ErrorMiddleware\` bọc 1 handler trả \`error\`, in JSON \`{code, message}\` ra \`http.ResponseWriter\`.

### Bài 3 — Retry với exponential backoff + jitter

Viết \`Retry(ctx, fn func() error, maxAttempts, baseDelay, maxDelay) error\`:

- Thử tối đa \`maxAttempts\`.
- Giữa mỗi lần: ngủ \`min(baseDelay * 2^(attempt-1), maxDelay) * (0.5 + rand)\`.
- Tôn trọng \`ctx.Done()\` (huỷ giữa chừng).
- Nếu \`fn\` trả error non-retryable → return ngay.

### Bài 4 — Identify retryable

Viết \`isRetryable(err error) bool\` trả:

- \`true\` cho: lỗi \`net.Error\` với \`Temporary()\` hoặc \`Timeout()\`, \`context.DeadlineExceeded\`, lỗi HTTP status 5xx hoặc 429 (giả sử có \`*HTTPError{Status int}\`).
- \`false\` cho: \`context.Canceled\`, lỗi 4xx khác, \`*AppError\` với Code domain (NOT_FOUND, VALIDATION...).

### Bài 5 — Structured log

Viết hàm \`LogError(ctx context.Context, err error)\` log dưới dạng key=value:

- Trích \`*AppError\` (nếu có) → log \`error_code\`, \`error_msg\`.
- Đọc \`request_id\`, \`user_id\` từ context (giả sử có).
- Nếu có \`*StackError\` → log thêm \`stack\`.

In ra stdout dạng JSON 1 dòng / entry.

### Bài 6 — Fix anti-pattern

Cho đoạn code:

\`\`\`go
func transfer(from, to int, amount int) error {
    if amount < 0 {
        return errors.New("invalid")
    }
    err := db.Exec(...)
    if err != nil {
        log.Println("db error", err)
        return err
    }
    err2 := audit.Log(from, to, amount)
    if err2 != nil {
        // ignore
    }
    return nil
}
\`\`\`

Xác định mọi anti-pattern và viết lại đúng.

---

## 16. Lời giải chi tiết

### Lời giải 1

\`\`\`go
type AppError struct {
    Code    string
    Message string
    Cause   error
    Fields  map[string]any
}

func (e *AppError) Error() string {
    if e.Cause != nil {
        return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Cause)
    }
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error { return e.Cause }

func NotFound(resource string, id any) *AppError {
    return &AppError{
        Code:    "NOT_FOUND",
        Message: fmt.Sprintf("%s with id=%v not found", resource, id),
        Fields:  map[string]any{"resource": resource, "id": id},
    }
}

func Validation(field, reason string) *AppError {
    return &AppError{
        Code:    "VALIDATION",
        Message: fmt.Sprintf("invalid %s: %s", field, reason),
        Fields:  map[string]any{"field": field, "reason": reason},
    }
}

func Internal(cause error, msg string) *AppError {
    return &AppError{
        Code:    "INTERNAL",
        Message: msg,
        Cause:   cause,
    }
}
\`\`\`

Test trích xuất:

\`\`\`go
err := NotFound("user", 42)
wrapped := fmt.Errorf("processing GET /users/42: %w", err)

var appErr *AppError
if errors.As(wrapped, &appErr) {
    fmt.Println("Code:", appErr.Code) // NOT_FOUND
}
\`\`\`

\`errors.As\` đi theo chain (qua \`Unwrap\`) đến khi tìm được type khớp. Đây là điểm mạnh của typed error.

### Lời giải 2

\`\`\`go
func httpError(err error) (int, string, string) {
    var appErr *AppError
    if errors.As(err, &appErr) {
        switch appErr.Code {
        case "NOT_FOUND":      return 404, appErr.Code, appErr.Message
        case "VALIDATION":     return 422, appErr.Code, appErr.Message
        case "UNAUTHORIZED":   return 401, appErr.Code, "Bạn cần đăng nhập"
        case "FORBIDDEN":      return 403, appErr.Code, "Không có quyền truy cập"
        case "RATE_LIMITED":   return 429, appErr.Code, "Bạn thao tác quá nhanh"
        case "DB_TIMEOUT":     return 503, appErr.Code, "Hệ thống đang bận, thử lại sau"
        }
    }
    return 500, "INTERNAL", "Đã có lỗi, vui lòng thử lại"
}

type errHandler func(http.ResponseWriter, *http.Request) error

func ErrorMiddleware(next errHandler) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := next(w, r); err != nil {
            status, code, msg := httpError(err)
            // log internal
            log.Printf("ERROR %s %s status=%d code=%s err=%v",
                r.Method, r.URL.Path, status, code, err)
            // response external
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(status)
            json.NewEncoder(w).Encode(map[string]string{
                "code": code, "message": msg,
            })
        }
    }
}
\`\`\`

Test:

\`\`\`go
h := func(w http.ResponseWriter, r *http.Request) error {
    return NotFound("user", 42)
}
http.Handle("/u", ErrorMiddleware(h))
\`\`\`

\`curl /u\` → HTTP 404 \`{"code":"NOT_FOUND","message":"user with id=42 not found"}\`.

### Lời giải 3

\`\`\`go
func Retry(ctx context.Context, fn func() error, maxAttempts int, baseDelay, maxDelay time.Duration) error {
    var lastErr error
    for attempt := 1; attempt <= maxAttempts; attempt++ {
        err := fn()
        if err == nil {
            return nil
        }
        if !isRetryable(err) {
            return err
        }
        lastErr = err
        if attempt == maxAttempts {
            break
        }
        // delay = baseDelay * 2^(attempt-1), capped
        d := baseDelay * (1 << (attempt - 1))
        if d > maxDelay {
            d = maxDelay
        }
        // jitter ±50%
        j := 0.5 + rand.Float64()
        d = time.Duration(float64(d) * j)
        select {
        case <-time.After(d):
        case <-ctx.Done():
            return fmt.Errorf("retry aborted: %w", ctx.Err())
        }
    }
    return fmt.Errorf("after %d attempts: %w", maxAttempts, lastErr)
}
\`\`\`

Walk-through với \`baseDelay=1s, maxDelay=30s, maxAttempts=4\`:

| attempt | base 2^(a-1) | sau cap | jitter min | jitter max |
|---------|-------------|---------|------------|------------|
| 1 | 1s | 1s | 0.5s | 1.5s |
| 2 | 2s | 2s | 1.0s | 3.0s |
| 3 | 4s | 4s | 2.0s | 6.0s |
| 4 | — | — | (không sleep, attempt cuối) | — |

### Lời giải 4

\`\`\`go
func isRetryable(err error) bool {
    if errors.Is(err, context.Canceled)         { return false }  // caller chủ động huỷ
    if errors.Is(err, context.DeadlineExceeded) { return true  }  // có thể retry trên ctx mới

    var httpErr *HTTPError
    if errors.As(err, &httpErr) {
        return httpErr.Status == 429 || (httpErr.Status >= 500 && httpErr.Status < 600)
    }
    var appErr *AppError
    if errors.As(err, &appErr) {
        switch appErr.Code {
        case "DB_TIMEOUT", "DOWNSTREAM_UNAVAILABLE", "RATE_LIMITED":
            return true
        }
        return false
    }
    return false
}
\`\`\`

Code đầy đủ (kèm \`net.Error\` Timeout check) xem [solutions.go](./solutions.go). Bảng kiểm output thực tế (chạy \`go run solutions.go\` Demo 4):

| Error | retryable? |
|-------|-----------|
| \`context.Canceled\` | false |
| \`context.DeadlineExceeded\` | true |
| \`*HTTPError{Status:500/503/429}\` | true |
| \`*HTTPError{Status:404/401}\` | false |
| \`*AppError{NOT_FOUND/VALIDATION}\` | false |
| \`*AppError{DB_TIMEOUT/RATE_LIMITED}\` | true |

### Lời giải 5

\`\`\`go
type ctxKey string
const reqIDKey ctxKey = "request_id"
const userIDKey ctxKey = "user_id"

func LogError(ctx context.Context, err error) {
    entry := map[string]any{
        "level":      "error",
        "ts":         time.Now().Format(time.RFC3339Nano),
        "error_msg":  err.Error(),
    }
    if v := ctx.Value(reqIDKey); v != nil { entry["request_id"] = v }
    if v := ctx.Value(userIDKey); v != nil { entry["user_id"] = v }

    var appErr *AppError
    if errors.As(err, &appErr) {
        entry["error_code"] = appErr.Code
        for k, v := range appErr.Fields {
            entry["field_"+k] = v
        }
    }
    var stackErr *StackError
    if errors.As(err, &stackErr) {
        entry["stack"] = stackErr.Stack()
    }
    json.NewEncoder(os.Stdout).Encode(entry)
}
\`\`\`

Output mẫu:

\`\`\`json
{"error_code":"NOT_FOUND","error_msg":"[NOT_FOUND] user with id=42 not found","field_id":42,"field_resource":"user","level":"error","request_id":"req-abc","ts":"..."}
\`\`\`

### Lời giải 6 — fix code

Phân tích anti-pattern trong code gốc:

1. \`errors.New("invalid")\` → không nói field nào sai (mục 14.1).
2. \`log.Println\` + \`return err\` → double log (mục 14.2).
3. \`err\` không wrap context → caller không biết đây là transfer flow (mục 14.3).
4. \`if err2 != nil { // ignore }\` → silent swallow (mục 14.5).

Bản sửa:

\`\`\`go
func transfer(ctx context.Context, from, to int, amount int) error {
    if amount <= 0 {
        return Validation("amount", "phải > 0")
    }
    if from == to {
        return Validation("from/to", "không thể chuyển cho chính mình")
    }
    if _, err := db.ExecContext(ctx, "UPDATE accounts ..."); err != nil {
        return fmt.Errorf("transferring from=%d to=%d amount=%d: %w", from, to, amount, err)
    }
    // Audit log: best-effort, KHÔNG fail transfer nếu audit lỗi.
    // Nhưng phải log warning để có thể truy ngược.
    if err := audit.Log(ctx, from, to, amount); err != nil {
        log.Printf("WARN audit log failed (transfer vẫn thành công) from=%d to=%d: %v",
            from, to, err)
        // KHÔNG return err — đây là quyết định nghiệp vụ: audit lỗi không huỷ transaction.
    }
    return nil
}
\`\`\`

Khác biệt: validation có code + field, error wrap context có id+amount, audit có comment giải thích vì sao nuốt + log warning để track.

---

## 17. Code & Minh hoạ

- Code đầy đủ: [solutions.go](./solutions.go) — chạy \`go run solutions.go\`.
- Tương tác: [visualization.html](./visualization.html) — 3 module:
  - **Module 1**: Error category → HTTP status (click error type → xem status code + lý do).
  - **Module 2**: Retry timeline với backoff + jitter (chỉnh maxAttempts, base, max → xem timeline animation).
  - **Module 3**: Error wrap chain + \`errors.As\` extract (chọn cách wrap → xem chain + kết quả extract).

---

## 18. Bài tiếp theo

- → [Lesson 41 — Mini-project: Concurrent Scraper](../lesson-41-mini-project-concurrent-scraper/) — áp dụng error handling + context + concurrency vào project thật.
- Đi ngang: [Lesson 19 — Errors (cơ bản)](../lesson-19-errors/), [Lesson 36 — Concurrency Patterns](../lesson-36-concurrency-patterns/).
- Tier sau: [Tier 4 — Web & Backend](../tier-4-web-backend/index.html) sẽ dùng \`httpError\` middleware trong mọi service.
`;
