// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-53-mini-project-rest-api/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 53 — Mini-project: REST API Blog (Dự án cuối Tier 4)

Đây là **dự án tổng kết Tier 4 (Web & Backend)**. Bạn sẽ gom tất cả kiến thức từ
Lesson 42 đến Lesson 52 để xây dựng một REST API blog **hoàn chỉnh, biên dịch được,
có test** — bằng **thuần thư viện chuẩn (stdlib) của Go**, không phụ thuộc framework ngoài.

> Mở [visualization.html](./visualization.html) để xem mô phỏng tương tác: sơ đồ kiến
> trúc bấm được, luồng xử lý request từng bước, và vòng đời JWT (register → login →
> token → endpoint bảo vệ).

---

## Mục tiêu học tập (Learning objectives)

Sau bài này bạn sẽ:

1. Tổ chức một dự án Go thực tế theo **kiến trúc phân lớp** (layered architecture):
   handler → service → storage, ghép nối qua interface.
2. Hiện thực **xác thực JWT** thủ công bằng \`crypto/hmac\` (HS256) — ký, verify, kiểm tra hạn dùng.
3. **Hash mật khẩu an toàn** (có salt, chậm có chủ đích) bằng PBKDF2-HMAC-SHA256 thuần stdlib.
4. Viết **chuỗi middleware**: logger, recover (bắt panic), rate limit (token bucket), CORS.
5. **Validate dữ liệu vào** và trả lỗi theo chuẩn **RFC 7807 (Problem Details)**.
6. Xây **CRUD** với kiểm tra **quyền sở hữu** (ownership → 403).
7. Viết **integration test** end-to-end và đóng gói bằng **Dockerfile multi-stage scratch**.
8. Cài **graceful shutdown** (đã học ở Lesson 51).

---

## Kiến thức tiền đề (Prerequisites)

Dự án này dùng lại gần như toàn bộ Tier 4. Nếu một mục thấy lạ, quay lại bài tương ứng:

| Khái niệm dùng trong project | Học ở |
|------------------------------|-------|
| \`net/http\` server, \`ServeMux\`, handler | [Lesson 42 — net/http Deep](../lesson-42-http-net-deep/) |
| Thiết kế URL, status code, versioning \`/v1/\` | [Lesson 43 — REST API Design](../lesson-43-rest-api-design/) |
| Routing pattern \`GET /v1/posts/{id}\`, \`PathValue\` | [Lesson 44 — Routing Frameworks](../lesson-44-routing-frameworks/) |
| Validate request, gom lỗi theo field | [Lesson 45 — Request Validation](../lesson-45-request-validation/) |
| JWT, Bearer token, middleware auth | [Lesson 46 — Authentication & JWT](../lesson-46-authentication-jwt/) |
| HMAC, hash, hằng-thời-gian so sánh | [Lesson 47 — TLS & Crypto Basics](../lesson-47-tls-crypto-basics/) |
| Graceful shutdown (SIGINT/SIGTERM) | [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) |
| Rate limit token bucket | [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/) |
| Interface, struct, method, lỗi (\`errors.As\`) | Tier 1-2 (L15, L18, L19) |
| Goroutine, mutex, context | [L27](../lesson-27-goroutines-channels/), [L28](../lesson-28-sync-primitives/), [L29](../lesson-29-context-cancellation/) |
| Testing, \`httptest\` | [Lesson 26 — Testing Basics](../lesson-26-testing-basics/) |

---

## 1. Mục tiêu dự án và phạm vi

> 💡 **Trực giác.** Hãy hình dung một blog tối giản như Medium thu nhỏ: người dùng đăng ký
> tài khoản, đăng nhập lấy "vé vào cửa" (token), rồi viết/sửa/xoá bài của chính mình. Người
> lạ đọc bài thoải mái nhưng không sửa được bài người khác. Toàn bộ "logic gác cổng" đó là
> những gì ta xây dựng.

API blog hỗ trợ:

- **Đăng ký / đăng nhập** → nhận JWT.
- **Xem profile** của chính mình (route bảo vệ).
- **CRUD bài viết**: ai cũng đọc được, nhưng chỉ tác giả mới sửa/xoá.
- Mọi lỗi trả về theo **một định dạng thống nhất** (RFC 7807).
- Có **log, chống panic sập server, giới hạn tốc độ, CORS**.

**Phạm vi (scope) có chủ đích bỏ qua** để giữ project gọn cho mục đích học:

- Storage là **in-memory** (map) — mất dữ liệu khi restart. Lesson Tier 5 sẽ thay bằng DB thật.
- Chưa có refresh token, phân trang, full-text search, rate limit phân tán (Redis).
- JWT secret để mặc định cho dev — production phải đặt qua biến môi trường.

> ⚠ **Cảnh báo toy vs production.** Đây là **toy storage** (map). Nó minh hoạ interface
> \`Repo\` rất tốt nhưng KHÔNG bền vững. Điểm hay: vì service chỉ phụ thuộc interface, đổi
> sang Postgres ở Tier 5 **không phải sửa một dòng service/handler nào**.

---

## 2. Danh sách endpoint (API surface)

| Method | Path | Auth? | Mô tả | Status thành công |
|--------|------|:-----:|-------|:------:|
| POST | \`/v1/auth/register\` | ✗ | Đăng ký, trả token + user | 201 |
| POST | \`/v1/auth/login\` | ✗ | Đăng nhập, trả token + user | 200 |
| GET | \`/v1/users/me\` | ✓ | Profile của chính mình | 200 |
| GET | \`/v1/posts\` | ✗ | Liệt kê tất cả bài | 200 |
| GET | \`/v1/posts/{id}\` | ✗ | Xem 1 bài | 200 |
| POST | \`/v1/posts\` | ✓ | Tạo bài (tác giả = người gọi) | 201 |
| PUT | \`/v1/posts/{id}\` | ✓ | Sửa bài (chỉ tác giả) | 200 |
| DELETE | \`/v1/posts/{id}\` | ✓ | Xoá bài (chỉ tác giả) | 204 |
| GET | \`/healthz\` | ✗ | Health check cho probe | 200 |

**Quy ước lỗi** — mọi lỗi dùng \`Content-Type: application/problem+json\`:

| Status | Code | Khi nào |
|:------:|------|---------|
| 400 | \`validation_failed\` | Dữ liệu vào sai (kèm map \`errors\` theo từng field) |
| 401 | \`unauthorized\` | Thiếu/sai token, sai mật khẩu |
| 403 | \`forbidden\` | Có token nhưng không đủ quyền (sửa bài người khác) |
| 404 | \`not_found\` | Không tìm thấy bài / route không tồn tại |
| 409 | \`conflict\` | Username đã tồn tại |
| 429 | \`rate_limited\` | Vượt giới hạn tốc độ |
| 500 | \`internal_error\` | Lỗi server (panic được recover) |

> 📝 **Tóm tắt mục 2.** 8 endpoint nghiệp vụ + 1 health check. Đọc bài = public, ghi = cần
> token, sửa/xoá = cần token *và* đúng tác giả. Lỗi luôn cùng một khuôn RFC 7807.

---

## 3. Kiến trúc phân lớp (Architecture)

\`\`\`
                         ┌──────────────────────────────────────────────┐
   HTTP request          │                  cmd/server/main.go            │
   ─────────────►        │   (entry: build chain + graceful shutdown)     │
                         └───────────────────────┬──────────────────────┘
                                                 │ http.Handler
            ┌────────────────────────────────────▼─────────────────────────────────┐
            │                       MIDDLEWARE CHAIN                                 │
            │   Recover  →  Logger  →  CORS  →  RateLimit  →  router (ServeMux)       │
            │  (ngoài cùng)                                          (trong cùng)     │
            └────────────────────────────────────┬─────────────────────────────────┘
                                                 │ khớp route
                       ┌─────────────────────────┼──────────────────────────┐
                       ▼                          ▼                          ▼
              ┌─────────────────┐       ┌──────────────────┐       (route bảo vệ qua
              │  users.Handler  │       │  posts.Handler   │        auth.Middleware,
              │  (decode/encode)│       │  (decode/encode) │        gắn Claims vào ctx)
              └────────┬────────┘       └────────┬─────────┘
                       │ gọi                     │ gọi
                       ▼                          ▼
              ┌─────────────────┐       ┌──────────────────┐
              │  users.Service  │       │   posts.Service  │   ← LOGIC NGHIỆP VỤ
              │ (validate,      │       │ (validate,       │     (validate, ownership,
              │  hash, token)   │       │  ownership 403)  │      mã hoá mật khẩu...)
              └────────┬────────┘       └────────┬─────────┘
                       │  Repo interface         │  Repo interface
                       ▼                          ▼
              ┌──────────────────────────────────────────────┐
              │              internal/storage                 │   ← DỮ LIỆU
              │   UserRepo + PostRepo  (map + sync.RWMutex)    │     (in-memory; đổi DB
              └──────────────────────────────────────────────┘      không đụng lớp trên)

   Cắt ngang mọi lớp:  internal/auth (HMAC JWT, PBKDF2 password)
                       internal/errors (AppError → RFC 7807)
                       internal/httpx (decode/encode JSON an toàn)
\`\`\`

### 3.1 Vì sao chia lớp như vậy?

> 💡 **Trực giác.** Ba lớp giống ba nhân viên: **handler** là lễ tân (nhận giấy tờ, trả
> kết quả, không quyết định gì), **service** là người ra quyết định (đúng/sai, được/không
> được), **storage** là kho lưu trữ (chỉ cất và lấy đồ). Mỗi người làm đúng một việc.

- **Handler** chỉ lo I/O: đọc JSON, gọi service, ghi JSON + status. KHÔNG có \`if username
  đã tồn tại\` ở đây.
- **Service** chứa mọi luật nghiệp vụ: validate, hash mật khẩu, kiểm tra trùng, kiểm tra
  "ai sửa bài ai". Service nhận \`Repo\` qua interface nên test được mà không cần DB.
- **Storage** chỉ CRUD thô. Đổi từ map → Postgres → Redis: viết struct mới thoả \`Repo\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không gộp hết vào handler cho nhanh?"* → Gộp thì handler vừa parse JSON vừa chứa
>   luật nghiệp vụ vừa biết SQL. Khi cần test luật "không sửa bài người khác" bạn buộc phải
>   dựng cả HTTP server + DB. Tách lớp → test service bằng một map giả là xong.
> - *"Interface \`Repo\` đặt ở đâu — package storage hay service?"* → Đặt ở **package
>   service** (bên dùng), theo nguyên tắc "interface thuộc về consumer". Storage chỉ cần
>   thoả nó, không cần import service.

> 🔁 **Dừng lại tự kiểm tra.** Nếu yêu cầu thêm rule "bài viết phải có ít nhất 10 từ",
> bạn sửa file nào?
> <details><summary>Đáp án</summary>
> Sửa <code>posts/service.go</code> (hàm <code>validate</code>). Handler và storage không
> đổi — đó chính là lợi ích của tách lớp.</details>

> 📝 **Tóm tắt mục 3.** Handler (I/O) → Service (luật) → Storage (dữ liệu), nối bằng
> interface. Auth/errors/httpx là tiện ích cắt ngang. Đổi tầng dưới không vỡ tầng trên.

---

## 4. Chuỗi middleware (Middleware chain)

Middleware là hàm bọc một \`http.Handler\` để thêm hành vi. Chữ ký chuẩn trong Go:

\`\`\`go
func Mw(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // ... làm gì đó TRƯỚC
        next.ServeHTTP(w, r)
        // ... làm gì đó SAU
    })
}
\`\`\`

Trong \`main.go\` ta ghép từ **ngoài vào trong**:

\`\`\`go
chain := middleware.Recover(log)(
    middleware.Logger(log)(
        middleware.CORS(allowedOrigin)(
            limiter.Middleware()(mux),
        ),
    ),
)
\`\`\`

> 💡 **Trực giác về thứ tự.** Hình dung các lớp vỏ củ hành. Request đi từ vỏ ngoài (Recover)
> vào lõi (router), response đi ngược ra. **Recover phải ngoài cùng** để bắt được cả panic
> của Logger/CORS/handler. RateLimit đặt **sát router** để các request bị chặn vẫn được log.

| Middleware | File | Việc làm |
|------------|------|----------|
| \`Recover\` | \`recover.go\` | \`defer recover()\` → panic không làm sập server, trả 500 RFC 7807 |
| \`Logger\` | \`logger.go\` | Ghi \`method, path, status, bytes, duration_ms, IP\` (dùng \`slog\`) |
| \`CORS\` | \`cors.go\` | Gắn header \`Access-Control-*\`, trả 204 cho preflight \`OPTIONS\` |
| \`RateLimit\` | \`ratelimit.go\` | Token bucket theo IP: hết token → 429 + \`Retry-After\` |

> ❓ **Câu hỏi tự nhiên.** *"Làm sao Logger biết status code nếu handler tự ghi?"* →
> Logger bọc \`ResponseWriter\` bằng \`statusRecorder\` ghi đè \`WriteHeader\`/\`Write\` để "nghe
> lén" status đã gửi. Đây là kỹ thuật phổ biến — xem \`statusRecorder\` trong \`logger.go\`.

> ⚠ **Lỗi thường gặp.** Đặt \`Recover\` *trong cùng* (sát router). Khi đó nếu Logger panic
> thì không ai bắt → server sập. Luôn đặt Recover **ngoài cùng**.

> 📝 **Tóm tắt mục 4.** Middleware = vỏ bọc handler. Thứ tự: Recover → Logger → CORS →
> RateLimit → router. Recover ngoài cùng (lưới an toàn), RateLimit trong cùng (vẫn được log).

---

## 5. Xác thực: hash mật khẩu + JWT

### 5.1 Hash mật khẩu — vì sao không lưu plaintext

> 💡 **Trực giác.** Nếu DB bị lộ mà mật khẩu lưu dạng chữ thường, hacker có ngay tài khoản
> mọi người. Hash là "băm một chiều": từ mật khẩu tính ra chuỗi, nhưng từ chuỗi **không**
> tính ngược lại được. Khi đăng nhập, ta hash lại mật khẩu nhập vào rồi so với hash đã lưu.

Hai yêu cầu bắt buộc của hash mật khẩu (khác hẳn hash thường như SHA-256 trần):

1. **Có salt ngẫu nhiên** mỗi user → 2 người cùng mật khẩu \`123456\` vẫn cho hash khác nhau
   (chống tấn công bảng tra sẵn — rainbow table).
2. **Chậm có chủ đích** → brute-force tốn thời gian. Ta lặp PBKDF2 **100.000 vòng**.

> ⚠ **Cảnh báo về lựa chọn thuật toán.** Repo này chạy **offline** nên KHÔNG dùng được
> \`golang.org/x/crypto/bcrypt\`. Vì vậy code dùng **PBKDF2-HMAC-SHA256 tự hiện thực bằng
> stdlib** (\`crypto/hmac\` + \`crypto/sha256\`). PBKDF2 là KDF chuẩn (RFC 8018), đúng tinh
> thần "chậm có salt". **Trong production thật, ưu tiên \`bcrypt\` hoặc \`argon2\`** từ
> \`golang.org/x/crypto\` — chúng được thiết kế riêng cho mật khẩu và chống tấn công GPU tốt hơn.

Định dạng hash lưu trong storage (kiểu PHC):

\`\`\`
pbkdf2$100000$<salt_base64>$<derived_key_base64>
\`\`\`

So sánh khi login dùng \`subtle.ConstantTimeCompare\` để **chống timing attack** (kẻ tấn
công đo thời gian phản hồi để đoán từng byte).

### 5.2 JWT — "vé vào cửa" không cần lưu session

> 💡 **Trực giác.** JWT giống vé xem phim đã đóng dấu của rạp. Bạn cầm vé tự do đi lại;
> nhân viên chỉ cần soi con dấu (chữ ký) là biết vé thật hay giả — **không cần gọi về tổng
> đài kiểm tra**. Server không lưu danh sách phiên đăng nhập; mọi thông tin nằm trong token,
> được bảo vệ bằng chữ ký.

JWT gồm 3 phần \`header.payload.signature\`, mỗi phần base64url:

\`\`\`
eyJhbG...     .     eyJzdWI...     .     iFLy5-Y9...
  header              payload             signature
{alg:HS256}      {sub, username,        HMAC-SHA256(
                  iat, exp, iss}         header.payload, secret)
\`\`\`

Quy trình **verify** (trong \`auth.Parse\`):

1. Tách 3 phần. Sai số phần → \`ErrTokenMalformed\`.
2. Tự tính lại \`HMAC-SHA256(header.payload, secret)\`, so với phần signature bằng
   \`hmac.Equal\` (constant-time). Không khớp → \`ErrTokenSignature\`.
3. Giải mã payload, kiểm tra \`exp\` (hết hạn) → \`ErrTokenExpired\`.

> ⚠ **Lỗi nghiêm trọng thường gặp.** Verify chữ ký **TRƯỚC** khi tin payload. Nếu giải mã
> payload rồi mới verify, code dễ "lỡ tin" dữ liệu chưa kiểm chứng. Trong \`Parse\` ta verify
> signature trước tiên.

> ❓ **Câu hỏi tự nhiên.**
> - *"Token bị lộ thì sao?"* → Ai cầm token đều dùng được tới khi hết hạn (24h). Vì vậy TTL
>   ngắn + dùng HTTPS bắt buộc. Refresh token (chưa làm ở đây) giúp thu hồi sớm.
> - *"Sửa \`exp\` trong payload để gia hạn được không?"* → Không. Sửa payload → chữ ký không
>   khớp (vì không có secret) → bị từ chối ngay bước 2.
> - *"Phải tự viết JWT không?"* → Học thì nên (như đây, để hiểu cơ chế). Production thường
>   dùng thư viện đã kiểm thử kỹ như \`github.com/golang-jwt/jwt\`.

> 🔁 **Dừng lại tự kiểm tra.** Hacker đổi \`username\` trong payload từ \`alice\` thành \`admin\`
> rồi gửi lên. Chuyện gì xảy ra?
> <details><summary>Đáp án</summary>
> Payload đổi → chuỗi <code>header.payload</code> đổi → HMAC tính lại khác signature cũ.
> Hacker không có secret nên không ký lại được. <code>hmac.Equal</code> trả false →
> <code>401 unauthorized</code>.</details>

> 📝 **Tóm tắt mục 5.** Mật khẩu: PBKDF2 + salt + 100k vòng + so sánh hằng-thời-gian. JWT:
> 3 phần, chữ ký HMAC-SHA256, **verify chữ ký trước**, kiểm tra hạn dùng. Sửa payload mà
> không có secret = vô hiệu.

---

## 6. Validation + lỗi RFC 7807

Validation gom lỗi theo **từng field** để client sửa từng ô:

\`\`\`go
func validateRegister(req RegisterRequest) map[string]string {
    fields := map[string]string{}
    if len(req.Username) < 3 || len(req.Username) > 32 {
        fields["username"] = "độ dài 3-32 ký tự"
    }
    if _, err := mail.ParseAddress(req.Email); err != nil {
        fields["email"] = "email không hợp lệ"
    }
    if len(req.Password) < 8 {
        fields["password"] = "tối thiểu 8 ký tự"
    }
    return fields
}
\`\`\`

Lỗi trả về theo **RFC 7807 (Problem Details for HTTP APIs)** — chuẩn IETF cho body lỗi:

\`\`\`json
{
  "type": "https://blog-api/errors/validation_failed",
  "title": "Validation failed",
  "status": 400,
  "detail": "dữ liệu đăng ký không hợp lệ",
  "instance": "/v1/auth/register",
  "code": "validation_failed",
  "errors": { "email": "email không hợp lệ", "password": "tối thiểu 8 ký tự" }
}
\`\`\`

> 💡 **Vì sao cần RFC 7807?** Không có chuẩn → mỗi endpoint trả lỗi một kiểu (\`{"err":...}\`,
> \`{"message":...}\`, \`{"error":{...}}\`), client phải đoán. RFC 7807 cho **một khuôn cố
> định** (\`type, title, status, detail, instance\`) + cho phép thêm field tuỳ ý (\`code\`,
> \`errors\`). Client xử lý mọi lỗi bằng một code path.

\`internal/errors/apperror.go\` (đã có sẵn) định nghĩa \`AppError\` mang \`Code/Status/Title/
Detail/Fields\` và hàm \`Write\` chuyển nó thành \`application/problem+json\`. Mọi handler chỉ
cần gọi \`apperr.Write(w, r, err)\`.

> 📝 **Tóm tắt mục 6.** Validate trả map field→message. Mọi lỗi đi qua \`AppError\` → \`Write\`
> → body RFC 7807 đồng nhất, \`Content-Type: application/problem+json\`.

---

## 7. Cấu trúc thư mục dự án

\`\`\`
solutions/
├── go.mod                       # module blog-api, go 1.22, KHÔNG dependency ngoài
├── Dockerfile                   # multi-stage build → scratch image
├── cmd/
│   └── server/
│       ├── main.go              # entry: build chain + graceful shutdown
│       └── main_test.go         # integration test end-to-end (httptest)
└── internal/
    ├── auth/
    │   ├── password.go          # PBKDF2-HMAC-SHA256 hash + verify
    │   ├── jwt.go               # ký/verify JWT HS256 thủ công
    │   ├── middleware.go        # bắt Bearer token → gắn Claims vào context
    │   └── auth_test.go         # unit test hash + JWT
    ├── errors/
    │   └── apperror.go          # AppError → RFC 7807 (ĐÃ CÓ SẴN)
    ├── httpx/
    │   └── json.go              # DecodeJSON an toàn + WriteJSON
    ├── middleware/
    │   ├── logger.go            # log request (slog)
    │   ├── recover.go           # bắt panic → 500
    │   ├── ratelimit.go         # token bucket theo IP
    │   └── cors.go              # CORS + preflight
    ├── users/
    │   ├── model.go             # User, Register/Login request, AuthResponse
    │   ├── service.go           # logic: register/login/me + Repo interface
    │   └── handler.go           # route /v1/auth/* , /v1/users/me
    ├── posts/
    │   ├── model.go             # Post, Create/Update request
    │   ├── service.go           # logic CRUD + ownership + Repo interface
    │   └── handler.go           # route CRUD /v1/posts
    └── storage/
        └── memory.go            # UserRepo + PostRepo (map + RWMutex)
\`\`\`

> 💡 **Vì sao \`internal/\`?** Go coi mọi package trong \`internal/\` là **riêng tư** với
> module — package ngoài module không import được. Đây là cách stdlib-friendly để khoá
> chi tiết hiện thực, chỉ \`cmd/server\` (cùng module) lắp ráp chúng lại.

---

## 8. Lộ trình 12 bước dựng project

Nếu xây lại từ đầu, đây là thứ tự hợp lý (mỗi bước đều biên dịch được):

1. **\`go mod init blog-api\`** → tạo \`go.mod\`.
2. **\`internal/errors/apperror.go\`** — định nghĩa \`AppError\` + \`Write\` (RFC 7807). Mọi
   lớp khác sẽ trả lỗi qua đây.
3. **\`internal/httpx/json.go\`** — \`DecodeJSON\` (giới hạn body, từ chối field lạ) + \`WriteJSON\`.
4. **\`internal/auth/password.go\`** — \`HashPassword\` / \`VerifyPassword\` (PBKDF2 + salt).
5. **\`internal/auth/jwt.go\`** — \`Signer.Sign\` / \`Signer.Parse\` (HMAC HS256).
6. **\`internal/auth/middleware.go\`** — bắt \`Bearer\` token → gắn \`Claims\` vào context.
7. **\`internal/storage/memory.go\`** — \`UserRepo\` + \`PostRepo\` (map + \`sync.RWMutex\`). Định
   nghĩa luôn \`Repo\` interface ở phía service.
8. **\`internal/users/\`** — \`model.go\` → \`service.go\` (register/login/me) → \`handler.go\`.
9. **\`internal/posts/\`** — \`model.go\` → \`service.go\` (CRUD + ownership) → \`handler.go\`.
10. **\`internal/middleware/\`** — \`logger.go\`, \`recover.go\`, \`ratelimit.go\`, \`cors.go\`.
11. **\`cmd/server/main.go\`** — lắp ráp: storage → service → handler → router → middleware
    chain → \`http.Server\` + graceful shutdown.
12. **Test + Dockerfile** — \`auth_test.go\`, \`main_test.go\`, rồi \`Dockerfile\` multi-stage.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao bước 2 (errors) đứng gần đầu?
> <details><summary>Đáp án</summary>
> Vì gần như mọi package đều cần trả <code>AppError</code>. Làm trước → các package sau
> import được ngay, không phải quay lại sửa.</details>

---

## 9. Chạy thử với cURL

Khởi động server:

\`\`\`bash
cd solutions
go run ./cmd/server      # mặc định lắng nghe :8080
# hoặc cấu hình: ADDR=:9000 JWT_SECRET=doi-secret-nay go run ./cmd/server
\`\`\`

\`\`\`bash
# 1. Đăng ký → nhận token
curl -s -X POST localhost:8080/v1/auth/register \\
  -H 'Content-Type: application/json' \\
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
# → 201 {"token":"eyJ...","user":{"id":"...","username":"alice",...}}

# Lưu token vào biến shell:
TOKEN=$(curl -s -X POST localhost:8080/v1/auth/login \\
  -H 'Content-Type: application/json' \\
  -d '{"username":"alice","password":"password123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# 2. Profile (route bảo vệ)
curl -s localhost:8080/v1/users/me -H "Authorization: Bearer $TOKEN"
# → 200 {"id":...,"username":"alice",...}   (KHÔNG có password_hash)

# 3. Không token → 401
curl -s localhost:8080/v1/users/me
# → 401 application/problem+json {"code":"unauthorized",...}

# 4. Tạo bài
PID=$(curl -s -X POST localhost:8080/v1/posts -H "Authorization: Bearer $TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"Bài đầu tiên","body":"Xin chào blog!"}' | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

# 5. Liệt kê / xem 1 bài (public)
curl -s localhost:8080/v1/posts
curl -s localhost:8080/v1/posts/$PID

# 6. Sửa bài (chính chủ → 200)
curl -s -X PUT localhost:8080/v1/posts/$PID -H "Authorization: Bearer $TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"Bài đã sửa","body":"Nội dung mới"}'

# 7. Xoá bài → 204 (không body)
curl -s -o /dev/null -w '%{http_code}\\n' -X DELETE localhost:8080/v1/posts/$PID \\
  -H "Authorization: Bearer $TOKEN"
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Test ownership 403 thế nào?"* → Đăng ký user thứ hai (\`bob\`),
> lấy token của bob, rồi \`PUT\` lên bài của alice → server trả \`403 forbidden\`. Đúng kịch
> bản này có trong \`main_test.go\` (\`TestFullFlow\`).

---

## 10. Dockerfile multi-stage scratch — giải thích

\`\`\`dockerfile
# Stage 1: build bằng image Go đầy đủ
FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags "-s -w" -o /out/server ./cmd/server

# Stage 2: image cuối RỖNG, chỉ chứa binary
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
\`\`\`

> 💡 **Vì sao multi-stage?** Image Go (\`golang:1.22\`) nặng ~300MB (chứa compiler, toolchain).
> Ta chỉ cần **binary** để chạy, không cần compiler. Multi-stage: build ở stage 1, rồi chỉ
> **copy mỗi binary** sang stage 2 (\`scratch\`, rỗng 0 byte). Image cuối chỉ vài MB.

| Dòng | Ý nghĩa |
|------|---------|
| \`CGO_ENABLED=0\` | Build binary **tĩnh** (không cần libc) → chạy được trên \`scratch\` |
| \`-ldflags "-s -w"\` | Bỏ debug symbol → binary nhỏ hơn |
| \`FROM scratch\` | Image rỗng tuyệt đối — bề mặt tấn công nhỏ nhất, không shell, không gì để hack |
| \`COPY ... ca-certificates.crt\` | Cần cert để gọi HTTPS ra ngoài (nếu sau này gọi API khác) |
| \`ENTRYPOINT ["/server"]\` | Chạy thẳng binary (scratch không có \`/bin/sh\`) |

> ⚠ **Lỗi thường gặp.** Quên \`CGO_ENABLED=0\` → binary động, chạy trên \`scratch\` báo
> \`no such file or directory\` (thiếu libc). Hoặc quên copy CA cert → gọi HTTPS lỗi
> \`x509: certificate signed by unknown authority\`.

---

## 11. Mở rộng (hướng phát triển tiếp)

- **Đổi storage sang Postgres** (Tier 5): viết \`PostgresUserRepo\`/\`PostgresPostRepo\` thoả
  cùng \`Repo\` interface — service/handler không đổi.
- **Phân trang** \`GET /v1/posts?limit=20&offset=40\`.
- **Refresh token** + thu hồi token (blacklist / phiên bản token).
- **Rate limit phân tán** bằng Redis (token bucket dùng chung giữa nhiều instance).
- **OpenAPI/Swagger** sinh tài liệu API tự động.
- **Observability**: metrics (Prometheus), tracing (OpenTelemetry).

---

## Bài tập

> Mọi bài tập có lời giải đầy đủ ở mục **"Lời giải chi tiết"** ngay sau đây.

1. **Thêm endpoint \`GET /v1/users/{id}\`** trả profile công khai của một user bất kỳ (không
   cần token, không lộ email/password).
2. **Phân trang cho \`GET /v1/posts\`** với query \`?limit=&offset=\`, mặc định \`limit=20\`, tối
   đa 100. Trả thêm field \`total\` (đã có sẵn trong \`ListResponse\`).
3. **Đếm số bài của mỗi tác giả**: thêm \`GET /v1/users/me/posts\` liệt kê chỉ bài của người
   gọi.
4. **Soft delete**: thay vì xoá hẳn, đánh dấu \`DeletedAt\` và ẩn khỏi \`List\`/\`Get\`.
5. **Middleware request-id**: sinh một ID ngẫu nhiên mỗi request, gắn vào response header
   \`X-Request-ID\` và vào log.
6. **(Nâng cao) Refresh token**: thêm \`POST /v1/auth/refresh\` nhận refresh token (TTL dài,
   lưu storage) → cấp access token mới.

---

## Lời giải chi tiết

### Bài 1 — \`GET /v1/users/{id}\` công khai

**Cách tiếp cận:** thêm một DTO \`PublicUser\` chỉ chứa field công khai (id, username,
created_at), thêm method service \`Public\`, route public.

\`\`\`go
// users/model.go
type PublicUser struct {
    ID        string    \`json:"id"\`
    Username  string    \`json:"username"\`
    CreatedAt time.Time \`json:"created_at"\`
}

// users/service.go
func (s *Service) Public(ctx context.Context, id string) (*PublicUser, error) {
    u, err := s.repo.GetByID(ctx, id)
    if err != nil {
        return nil, apperr.NotFound("không tìm thấy user")
    }
    return &PublicUser{ID: u.ID, Username: u.Username, CreatedAt: u.CreatedAt}, nil
}

// users/handler.go — trong Register():
mux.HandleFunc("GET /v1/users/{id}", h.publicProfile)

func (h *Handler) publicProfile(w http.ResponseWriter, r *http.Request) {
    u, err := h.svc.Public(r.Context(), r.PathValue("id"))
    if err != nil { apperr.Write(w, r, err); return }
    httpx.WriteJSON(w, http.StatusOK, u)
}
\`\`\`

**Vì sao dùng DTO riêng?** \`User\` đã ẩn \`PasswordHash\` bằng tag \`json:"-"\`, nhưng email là
thông tin nhạy cảm không nên công khai. DTO \`PublicUser\` đảm bảo **chỉ** field an toàn lộ
ra — an toàn hơn dựa vào tag. Độ phức tạp $O(1)$ (lookup map).

### Bài 2 — Phân trang

**Cách tiếp cận:** parse query, kẹp giá trị (clamp) vào khoảng hợp lệ, cắt slice.

\`\`\`go
// posts/service.go
func (s *Service) ListPaged(ctx context.Context, limit, offset int) (*ListResponse, error) {
    if limit <= 0 { limit = 20 }
    if limit > 100 { limit = 100 }   // chặn client xin cả triệu bản ghi
    if offset < 0 { offset = 0 }

    all, err := s.repo.List(ctx)
    if err != nil { return nil, apperr.Internal("không đọc được danh sách") }
    total := len(all)

    start := offset
    if start > total { start = total }
    end := start + limit
    if end > total { end = total }

    return &ListResponse{Items: all[start:end], Total: total}, nil
}

// posts/handler.go — list():
limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
resp, err := h.svc.ListPaged(r.Context(), limit, offset)
\`\`\`

**Lưu ý:** \`Atoi\` lỗi (query rỗng) trả \`0\` → rơi về mặc định. \`total\` luôn là **tổng thật**
(không phải số item trang này) để client tính được số trang. Độ phức tạp $O(n)$ do \`List\`
copy toàn bộ (in-memory). Với DB thật dùng \`LIMIT/OFFSET\` của SQL → DB lo.

### Bài 3 — \`GET /v1/users/me/posts\`

**Cách tiếp cận:** thêm method \`repo.ListByAuthor\`, lọc theo \`claims.Subject\`.

\`\`\`go
// posts service: lọc trong bộ nhớ (hoặc thêm method repo riêng)
func (s *Service) ListByAuthor(ctx context.Context, authorID string) (*ListResponse, error) {
    all, err := s.repo.List(ctx)
    if err != nil { return nil, apperr.Internal("lỗi đọc") }
    out := make([]Post, 0)
    for _, p := range all {
        if p.AuthorID == authorID { out = append(out, p) }
    }
    return &ListResponse{Items: out, Total: len(out)}, nil
}

// handler (route bảo vệ qua authMW):
mux.Handle("GET /v1/users/me/posts", authMW(http.HandlerFunc(h.myPosts)))
func (h *Handler) myPosts(w http.ResponseWriter, r *http.Request) {
    claims, _ := auth.ClaimsFrom(r.Context())
    resp, err := h.svc.ListByAuthor(r.Context(), claims.Subject)
    if err != nil { apperr.Write(w, r, err); return }
    httpx.WriteJSON(w, http.StatusOK, resp)
}
\`\`\`

Route này **phải qua \`authMW\`** vì cần biết "me" là ai. Độ phức tạp $O(n)$ (quét tất cả bài);
DB thật dùng index trên \`author_id\` → nhanh hơn nhiều.

### Bài 4 — Soft delete

**Cách tiếp cận:** thêm \`DeletedAt *time.Time\` vào \`Post\`. \`Delete\` set thời điểm thay vì
xoá map. \`Get\`/\`List\` bỏ qua bản ghi đã xoá mềm.

\`\`\`go
// posts/model.go
type Post struct {
    // ... các field cũ ...
    DeletedAt *time.Time \`json:"-"\`   // nil = chưa xoá
}

// posts/service.go
func (s *Service) Delete(ctx context.Context, actorID, id string) error {
    p, err := s.repo.GetByID(ctx, id)
    if err != nil || p.DeletedAt != nil {
        return apperr.NotFound("không tìm thấy bài viết")
    }
    if p.AuthorID != actorID {
        return apperr.Forbidden("bạn không phải tác giả")
    }
    now := s.now().UTC()
    p.DeletedAt = &now
    return s.repo.Update(ctx, p)   // ghi lại thay vì repo.Delete
}

func (s *Service) Get(ctx context.Context, id string) (*Post, error) {
    p, err := s.repo.GetByID(ctx, id)
    if err != nil || p.DeletedAt != nil {   // ẩn bài đã xoá mềm
        return nil, apperr.NotFound("không tìm thấy bài viết")
    }
    return p, nil
}
\`\`\`

\`List\` cũng lọc \`p.DeletedAt == nil\`. **Lợi ích:** khôi phục được (undo), giữ lịch sử cho
audit. **Đánh đổi:** dữ liệu phình ra theo thời gian → định kỳ "purge" bản ghi cũ.

### Bài 5 — Middleware request-id

**Cách tiếp cận:** sinh ID ngẫu nhiên, gắn vào context + response header, để Logger đọc lại.

\`\`\`go
// middleware/requestid.go
package middleware

import (
    "context"
    "crypto/rand"
    "encoding/hex"
    "net/http"
)

type ridKey struct{}

func RequestID() func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            b := make([]byte, 8)
            _, _ = rand.Read(b)
            id := hex.EncodeToString(b)
            w.Header().Set("X-Request-ID", id)
            ctx := context.WithValue(r.Context(), ridKey{}, id)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

func RequestIDFrom(ctx context.Context) string {
    id, _ := ctx.Value(ridKey{}).(string)
    return id
}
\`\`\`

Trong \`Logger\`, thêm \`"request_id", RequestIDFrom(r.Context())\` vào dòng log. Đặt
\`RequestID\` **trước Logger** trong chain để Logger thấy được ID. **Lợi ích:** truy vết một
request xuyên suốt nhiều dòng log / nhiều service (correlation ID).

### Bài 6 — Refresh token (nâng cao)

**Cách tiếp cận:** hai loại token. **Access token** sống ngắn (15 phút), dùng cho mọi
request. **Refresh token** sống dài (7 ngày), lưu storage, **chỉ** dùng để xin access
token mới.

\`\`\`go
// Khi login: cấp cả hai.
//   accessToken  = signer.Sign(...)         // TTL 15 phút (signer ngắn hạn)
//   refreshToken = random 32 byte hex        // lưu vào refreshRepo: token -> userID + exp

// POST /v1/auth/refresh  {"refresh_token": "..."}
func (s *Service) Refresh(ctx context.Context, refreshToken string) (*AuthResponse, error) {
    userID, ok := s.refreshRepo.Lookup(refreshToken)   // tra storage
    if !ok {
        return nil, apperr.Unauthorized("refresh token không hợp lệ hoặc hết hạn")
    }
    u, err := s.repo.GetByID(ctx, userID)
    if err != nil { return nil, apperr.Unauthorized("user không tồn tại") }
    // (tuỳ chọn) xoay vòng: huỷ refresh cũ, cấp refresh mới chống tái dùng
    return s.issueToken(u)   // cấp access token mới
}
\`\`\`

**Vì sao tách hai token?** Access token là JWT **không thể thu hồi** trước hạn (server
không lưu). Để hạn ngắn → nếu lộ, kẻ tấn công chỉ dùng được vài phút. Refresh token **có
lưu** server nên **thu hồi được** (xoá khỏi storage = đăng xuất ngay). Cân bằng giữa "không
cần tra DB mỗi request" (access JWT) và "thu hồi được" (refresh có state).

**Bảo mật:** refresh token nên **xoay vòng** (rotation) — mỗi lần refresh cấp token mới và
huỷ token cũ. Nếu một refresh token bị dùng lại sau khi đã xoay → dấu hiệu bị đánh cắp,
huỷ toàn bộ phiên của user đó.

---

## Code & Minh họa

- **[solutions/](./solutions/)** — toàn bộ Go project. Chạy:
  \`\`\`bash
  cd solutions
  go build ./...     # biên dịch tất cả package
  go test ./...      # chạy unit + integration test
  go run ./cmd/server
  \`\`\`
- **[visualization.html](./visualization.html)** — mô phỏng tương tác: sơ đồ kiến trúc bấm
  được, luồng xử lý request từng bước, vòng đời JWT.

---

## Kết thúc Tier 4 — Bài tiếp theo

Đây là lesson cuối **Tier 4 (Web & Backend)**. Bạn đã đi từ \`net/http\` thô (L42) tới một
API production-shaped đầy đủ. Tiếp theo là **[Tier 5 — Data](../tier-5-data/)**: cơ sở dữ
liệu (SQL/\`database/sql\`, Postgres), migration, ORM, cache — nơi bạn sẽ thay lớp \`storage\`
in-memory của project này bằng một DB thật mà **không phải sửa service hay handler**.
`;
