# Lesson 04 — HTTP nâng cao

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu các nguyên tắc thiết kế REST và ánh xạ method HTTP vào thao tác CRUD.
- Biết cách web "có trạng thái" trên nền giao thức stateless: Cookie, Session, JWT.
- Giải thích cơ chế caching HTTP (`Cache-Control`, `ETag`, `304 Not Modified`) và tính ra lợi ích băng thông.
- Hiểu nén nội dung (gzip) và thương lượng nội dung (content negotiation).
- So sánh HTTP/1.1, HTTP/2, HTTP/3 (QUIC) về multiplexing và vấn đề head-of-line blocking.
- Hiểu CORS và vì sao trình duyệt chặn cross-origin request.

## Kiến thức tiền đề

- [Lesson 03 — HTTP/HTTPS cơ bản](../lesson-03-http-basics/) — request/response, status code, TLS.
- [Lesson 07 — UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) — nền tảng cho HTTP/3 (QUIC trên UDP).

---

## 1. REST — Thiết kế API theo tài nguyên

### 1.1. REST là gì và vì sao cần?

💡 **Trực giác**: Trước REST, các API kiểu RPC (Remote Procedure Call) thường thiết kế như gọi hàm từ xa: `getUser()`, `createUser()`, `deletePost()`, `updateComment()` — mỗi hành động là một "endpoint" riêng. Với hàng trăm tính năng, URL trở thành mê cung. REST đơn giản hóa: thay vì nhớ tên hàm, chỉ cần biết **tài nguyên** là gì và **method** nào tác dụng lên nó.

**REST (Representational State Transfer)** là phong cách kiến trúc — không phải chuẩn kỹ thuật cứng — do Roy Fielding đề xuất (2000), gồm 6 nguyên tắc:

1. **Stateless (phi trạng thái)**: mỗi request phải tự chứa đủ thông tin để server xử lý. Server không lưu "phiên làm việc" giữa các request. Mọi ngữ cảnh (xác thực, cài đặt) phải gửi lại mỗi lần.
2. **Uniform interface (giao diện đồng nhất)**: tài nguyên (resource) nhận diện qua URI; tác động lên tài nguyên bằng đúng method HTTP.
3. **Client-Server**: tách biệt UI và lưu trữ dữ liệu — client không biết database, server không biết UI.
4. **Cacheable**: response phải khai báo có thể cache hay không.
5. **Layered System**: client không biết có proxy/load-balancer ở giữa.
6. **Code on demand** (tùy chọn): server có thể gửi code thực thi về client (JavaScript).

### 1.2. Ánh xạ CRUD vào method HTTP

| Method | Hành động | Idempotent? | Ví dụ |
|--------|-----------|:-----------:|-------|
| `GET` | Đọc (Read) | Có | `GET /users/1` — lấy user id=1 |
| `POST` | Tạo mới (Create) | Không | `POST /users` — tạo user mới |
| `PUT` | Cập nhật toàn bộ (Update/Replace) | Có | `PUT /users/1` — thay toàn bộ user 1 |
| `PATCH` | Cập nhật một phần (Partial Update) | Không nhất thiết | `PATCH /users/1` — chỉ đổi email |
| `DELETE` | Xóa (Delete) | Có | `DELETE /users/1` — xóa user 1 |

**Idempotent** = gọi nhiều lần cho kết quả giống gọi 1 lần. `GET /users/1` gọi 10 lần vẫn trả về cùng user (không tạo thêm bản ghi). `POST /users` gọi 3 lần → tạo 3 user — không idempotent.

### 1.3. Ví dụ API thật — hệ thống quản lý người dùng

```
Collection:  /users          (danh sách)
Item:        /users/{id}     (cá thể)
Nested:      /users/{id}/posts   (bài viết của user)
```

**GET /users/1**
```
GET /users/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGci...
```
Response 200:
```json
{
  "id": 1,
  "name": "Nguyen Van A",
  "email": "nva@example.com",
  "created_at": "2025-01-15T08:00:00Z"
}
```

**POST /users** (tạo user mới)
```
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name": "Tran Thi B", "email": "ttb@example.com", "password": "hash..."}
```
Response 201 Created:
```
Location: /users/42
```
```json
{"id": 42, "name": "Tran Thi B", ...}
```

**DELETE /users/42**
```
DELETE /users/42 HTTP/1.1
```
Response 204 No Content (không có body — đã xóa thành công).

### 1.4. REST vs RPC — so sánh định tính

| Tiêu chí | REST | RPC (vd gRPC, XML-RPC) |
|----------|------|------------------------|
| Cấu trúc URL | Theo tài nguyên `/users/1` | Theo hành động `/getUserById` |
| Method phân biệt hành động | Có (GET/POST/PUT/DELETE) | Ít (thường POST hết) |
| Dễ cache | Rất tốt (GET cacheable) | Khó (POST không cache) |
| Phù hợp | CRUD, public API | Hàm phức tạp, microservice nội bộ |
| Điển hình | Twitter API, GitHub API | Google APIs, Kubernetes API |

❓ **Câu hỏi tự nhiên**:

- *"Stateless có nghĩa là server không nhớ gì về tôi?"* — Đúng về mặt kết nối HTTP. Nhưng server vẫn có database lưu dữ liệu user. "Stateless" chỉ có nghĩa là mỗi HTTP request độc lập — server không duy trì "phiên TCP" cho riêng bạn. Giải pháp giữ phiên người dùng: Cookie/Session (xem mục 2).
- *"PUT và PATCH khác nhau như thế nào?"* — `PUT /users/1` với body `{"name":"A"}` sẽ thay **toàn bộ** user 1 bằng `{name: "A"}` (email và các trường khác bị xóa). `PATCH /users/1` với body `{"email":"new@example.com"}` chỉ cập nhật trường email, các trường khác giữ nguyên.

⚠ **Lỗi thường gặp**:

- Dùng `GET /deleteUser?id=1` — sai. GET không được thay đổi trạng thái server (proxy, CDN có thể cache và gọi lại).
- Dùng `POST` cho mọi thứ như RPC — bỏ lỡ khả năng cache của GET.
- URI chứa động từ: `/getUsers`, `/createPost` — sai. URI phải là danh từ (tài nguyên).

🔁 **Tự kiểm tra**: Thiết kế API cho hệ thống blog. Cần: lấy danh sách bài, đọc 1 bài, đăng bài mới, sửa tiêu đề, xóa bài.
<details>
<summary>Xem đáp án</summary>

```
GET    /posts          — danh sách bài (có thể ?page=1&limit=20)
GET    /posts/5        — bài id=5
POST   /posts          — tạo bài mới (body: title, content)
PATCH  /posts/5        — sửa tiêu đề (body: {"title": "..."})
DELETE /posts/5        — xóa bài 5 → 204 No Content
```
</details>

📝 **Tóm tắt mục 1**:

- REST = thiết kế API theo **tài nguyên (resource)**, method HTTP phân biệt hành động.
- URI là danh từ (không phải động từ). Ví dụ: `/users/1` chứ không phải `/getUser?id=1`.
- Stateless: mỗi request tự đủ; server không lưu phiên HTTP.
- Idempotent: GET/PUT/DELETE an toàn khi gọi nhiều lần.

---

## 2. Quản lý trạng thái trong web stateless: Cookie & Session

### 2.1. Vấn đề: HTTP stateless thì đăng nhập thế nào?

HTTP là giao thức stateless — server không nhớ bạn giữa các request. Mỗi lần tải trang là một request độc lập. Vậy làm sao web biết "bạn đang đăng nhập" khi bạn chuyển từ trang chủ sang trang giỏ hàng?

💡 **Trực giác**: Giống như vào bể bơi — nhân viên đưa bạn vòng tay đánh số (token). Mỗi lần vào khu nào, bạn giơ vòng tay cho nhân viên kiểm tra. Nhân viên không nhớ mặt bạn, nhưng nhớ số trên vòng tay. HTTP Cookie hoạt động đúng như vậy: server phát "vòng tay" (cookie), trình duyệt tự động giơ ra mỗi lần request.

### 2.2. Cookie hoạt động thế nào

**Bước 1 — Server phát cookie** (sau đăng nhập thành công):
```
HTTP/1.1 200 OK
Set-Cookie: session_id=abc123xyz; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
Set-Cookie: user_pref=dark_mode; Max-Age=86400
```

**Bước 2 — Trình duyệt tự gửi cookie** trong mọi request tiếp theo đến cùng domain:
```
GET /dashboard HTTP/1.1
Host: example.com
Cookie: session_id=abc123xyz; user_pref=dark_mode
```

**Bước 3 — Server tra cứu phiên**:
- Server nhận `session_id=abc123xyz`.
- Tra trong bảng session (Redis/DB): `abc123xyz → {user_id: 42, name: "Nguyen Van A", expires: ...}`.
- Nếu tìm thấy và chưa hết hạn → xác nhận đã đăng nhập.

**Thuộc tính quan trọng của Set-Cookie**:

| Thuộc tính | Ý nghĩa |
|------------|---------|
| `HttpOnly` | JavaScript không đọc được (chống XSS đánh cắp cookie) |
| `Secure` | Chỉ gửi qua HTTPS |
| `SameSite=Strict` | Không gửi khi truy cập từ trang web khác (chống CSRF) |
| `Max-Age=3600` | Hết hạn sau 3600 giây (1 giờ) |
| `Domain=.example.com` | Chia sẻ cookie giữa sub-domain |
| `Path=/api` | Chỉ gửi cho request bắt đầu bằng `/api` |

### 2.3. Session-based vs Token-based (JWT)

**Session-based** (truyền thống):
```
Trình duyệt                  Server                   Database
    |                           |                          |
    |-- POST /login ----------->|                          |
    |   (username, password)    |-- Kiểm tra user -------->|
    |                           |<-- OK, user_id=42 -------|
    |                           |-- Tạo session: ----------|
    |                           |   "abc123" → {uid:42}    |
    |<-- 200 + Set-Cookie ------|                          |
    |   session_id=abc123       |                          |
    |                           |                          |
    |-- GET /dashboard -------->|                          |
    |   Cookie: session_id=abc  |-- Tra session abc123 --->|
    |                           |<-- {uid:42, name:...} ---|
    |<-- 200 Dashboard ---------|                          |
```

Nhược điểm: server phải **lưu session** trong DB/Redis → tăng I/O; khó scale ngang (nhiều server phải chia sẻ store).

**Token-based — JWT (JSON Web Token)**:
- Server không lưu gì. Token chứa **toàn bộ thông tin** user và được ký (signed) bằng khóa bí mật.
- Cấu trúc JWT: `header.payload.signature` (base64-encoded).
- Payload ví dụ: `{"user_id": 42, "name": "Nguyen Van A", "exp": 1748000000}`.
- Server xác minh chữ ký HMAC-SHA256 → nếu hợp lệ và chưa hết hạn → tin tưởng.
- JWT không thể "logout" phía server (chỉ hết hạn theo `exp`) → cần blacklist nếu muốn revoke.

❓ **Câu hỏi tự nhiên**:

- *"Session ID và JWT cái nào an toàn hơn?"* — Khác nhau về threat model. Session ID nhỏ (64 ký tự), bị đánh cắp thì revoke được ngay (xóa khỏi DB). JWT to hơn (~300 byte), không revoke được cho đến khi hết hạn — nhưng không cần DB lookup mỗi request.
- *"Cookie có bị đánh cắp không?"* — Nếu không có `Secure` thì bị sniff qua HTTP. Nếu không có `HttpOnly` thì JS độc hại đọc được. Nếu không có `SameSite` thì bị CSRF attack.

📝 **Tóm tắt mục 2**:

- HTTP stateless — mỗi request độc lập. Cookie là cơ chế server phát "thẻ nhận dạng" cho trình duyệt.
- `Set-Cookie` (server → client); `Cookie` header (client → server trong mọi request).
- Session-based: server lưu mapping `session_id → user data`. Token-based (JWT): server ký token, không lưu gì.
- `HttpOnly + Secure + SameSite` là bộ ba thuộc tính bảo vệ cookie tối thiểu.

---

## 3. Caching HTTP

### 3.1. Vì sao cần cache?

💡 **Trực giác**: Khi bạn tra từ điển, lần đầu mất 30 giây lật trang. Lần sau, bạn nhớ trong đầu — trả lời ngay trong 0.1 giây. HTTP caching hoạt động y hệt: lưu bản sao response cũ, lần sau không cần hỏi server.

Lợi ích đo được:
- Giảm băng thông: file CSS 200 KB không cần tải lại mỗi lần refresh.
- Giảm độ trễ: từ cache (< 1 ms) vs từ server (20–200 ms RTT).
- Giảm tải server: triệu request lấy logo giảm về 0 I/O server.

### 3.2. Cache-Control header

Server khai báo chính sách cache trong response:

```
Cache-Control: max-age=3600, public
```

| Directive | Ý nghĩa |
|-----------|---------|
| `max-age=N` | Cache hợp lệ trong N giây kể từ lúc nhận |
| `public` | Mọi cache trung gian (CDN, proxy) được lưu |
| `private` | Chỉ trình duyệt người dùng được lưu (không CDN) |
| `no-cache` | Phải xác nhận với server trước khi dùng cache (dù còn hạn) |
| `no-store` | Không được lưu bản sao (dữ liệu nhạy cảm) |
| `must-revalidate` | Khi hết hạn, phải hỏi server — không được dùng bản cũ |
| `s-maxage=N` | max-age riêng cho shared cache (CDN), ghi đè max-age |

**Ví dụ thực tế**:
```
# Trang HTML: đổi thường xuyên, cache ngắn
Cache-Control: no-cache, must-revalidate

# File CSS/JS với hash trong tên (style.abc123.css): vĩnh viễn
Cache-Control: max-age=31536000, immutable

# API data nhạy cảm: không cache
Cache-Control: no-store

# Ảnh công khai: CDN cache 1 ngày
Cache-Control: max-age=86400, public
```

### 3.3. ETag và xác nhận lại (Revalidation) — walk-through

**ETag (Entity Tag)** = "fingerprint" của nội dung response. Khi nội dung thay đổi, ETag thay đổi.

```
Lần 1 — Cache miss (trình duyệt chưa có bản sao):

Trình duyệt                       Server
    |                                |
    |-- GET /api/products ---------->|
    |                                |-- Query DB, tìm 500 sản phẩm
    |<-- 200 OK --------------------|
    |   ETag: "v2025-05-30-abc"      |
    |   Cache-Control: max-age=300   |
    |   Content-Length: 48320        |
    |   [body: 48320 byte JSON]      |
    |                                |
    [Trình duyệt lưu: response + ETag + thời điểm nhận]

Lần 2 — Cache còn hạn (trong vòng 300 giây):
    |-- (không gửi request gì cả)    |
    [Dùng thẳng từ bộ nhớ — 0 byte mạng, < 1ms]

Lần 3 — Cache hết hạn (sau 300 giây), revalidation:
    |                                |
    |-- GET /api/products ---------->|
    |   If-None-Match: "v2025-05-30-abc"  (gửi ETag cũ)
    |                                |
    |                          [Server kiểm tra ETag hiện tại]
    |                          [Nếu nội dung không đổi → 304]
    |<-- 304 Not Modified -----------|
    |   (không có body!)             |   ← tiết kiệm 48320 byte
    |                                |
    [Trình duyệt dùng lại bản sao cũ, cập nhật thời hạn cache]

Lần 4 — Cache hết hạn, nội dung ĐÃ thay đổi:
    |-- GET /api/products ---------->|
    |   If-None-Match: "v2025-05-30-abc"
    |                                |-- ETag mới = "v2025-05-31-xyz"
    |<-- 200 OK --------------------|
    |   ETag: "v2025-05-31-xyz"      |
    |   [body: 51200 byte JSON mới]  |
```

**Tính lợi ích**: Giả sử 10.000 user, mỗi user load `/api/products` 5 lần/ngày. Response 48 KB. Nếu 80% hit cache hoặc 304:
- Không cache: 10.000 × 5 × 48 KB = 2.4 GB/ngày băng thông.
- Với cache (80% không gửi body): 20% × 10.000 × 5 × 48 KB + 80% × gần 0 = **0.48 GB/ngày** — giảm 80%.

### 3.4. Expires (header cũ)

```
Expires: Thu, 01 Jun 2025 00:00:00 GMT
```

Cách cũ (HTTP/1.0), chỉ dùng thời điểm tuyệt đối. Vấn đề: nếu đồng hồ client lệch với server → cache sai. `Cache-Control: max-age` (thời gian tương đối) được ưu tiên hơn.

❓ **Câu hỏi tự nhiên**:

- *"If-Modified-Since vs If-None-Match khác nhau thế nào?"* — `If-Modified-Since` dùng timestamp (giây, có thể trùng nếu file thay đổi trong cùng giây). `If-None-Match` dùng ETag (hash/version — chính xác hơn). Dùng cả hai: ETag ưu tiên hơn.
- *"CDN cache có khác trình duyệt cache không?"* — CDN (Cloudflare, CloudFront) là "shared cache" dùng `Cache-Control: public, s-maxage=86400`. Trình duyệt (private cache) dùng `max-age`. CDN cache dùng chung cho mọi user — rất hiệu quả với tài nguyên tĩnh.

📝 **Tóm tắt mục 3**:

- `Cache-Control: max-age=N` xác định thời gian cache hợp lệ.
- `ETag` = fingerprint nội dung. `If-None-Match` khi revalidate → server trả 304 nếu nội dung không đổi (không gửi body).
- 304 Not Modified tiết kiệm toàn bộ băng thông response (chỉ header nhỏ).
- `no-store` cho dữ liệu nhạy cảm; `immutable` + hash trong tên file cho asset tĩnh.

---

## 4. Nén nội dung & Content Negotiation

### 4.1. Nén (Content Encoding)

Trình duyệt báo server nó hiểu encoding nào:
```
GET /api/products HTTP/1.1
Accept-Encoding: gzip, deflate, br
```

Server nén response và báo lại:
```
HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Length: 3847
```

**Lợi ích thực tế**:

| Loại nội dung | Kích thước gốc | Sau gzip | Tỷ lệ nén |
|---------------|----------------|----------|-----------|
| JSON API response | 50 KB | ~8 KB | ~84% |
| HTML trang web | 120 KB | ~18 KB | ~85% |
| File CSS | 80 KB | ~15 KB | ~81% |
| Ảnh JPEG/PNG | 500 KB | ~495 KB | ~1% (đã nén sẵn) |

Gzip không hiệu quả với nội dung đã nén (ảnh, video, zip) — nhiều server tự động skip.

**Brotli (br)** — thuật toán mới hơn của Google: nén tốt hơn gzip ~15–25%, nhưng cần HTTPS. Hầu hết trình duyệt hiện đại hỗ trợ.

### 4.2. Content Negotiation

Trình duyệt khai báo định dạng nó muốn:

```
GET /api/users/1 HTTP/1.1
Accept: application/json, application/xml;q=0.8, */*;q=0.5
Accept-Language: vi-VN, vi;q=0.9, en;q=0.5
Accept-Encoding: gzip, br
```

`q=0.8` là quality factor (độ ưu tiên, từ 0 đến 1). Server chọn định dạng phù hợp nhất và báo lại:
```
Content-Type: application/json; charset=utf-8
Content-Language: vi-VN
Content-Encoding: br
```

📝 **Tóm tắt mục 4**:

- `Accept-Encoding: gzip, br` → server nén body → giảm 80–85% băng thông cho text.
- `Accept-Language` → server phục vụ nội dung đúng ngôn ngữ.
- Ảnh/video đã nén sẵn → không compress thêm.

---

## 5. HTTP/1.1 vs HTTP/2 vs HTTP/3

### 5.1. Vấn đề của HTTP/1.1

💡 **Trực giác**: HTTP/1.1 như đường một làn: một xe đi, xe sau phải đợi. Dù mở nhiều đường (kết nối song song), vẫn tốn tài nguyên. HTTP/2 như đường cao tốc nhiều làn: nhiều xe chạy song song trên cùng một đường.

**Head-of-line (HOL) blocking** — vấn đề cốt lõi HTTP/1.1:

Mỗi kết nối TCP chỉ xử lý 1 request-response tại một thời điểm. Để tải trang web (20–100 tài nguyên), trình duyệt phải mở 6–8 kết nối TCP song song (mỗi kết nối 3 lần TCP handshake, riêng HTTPS thêm TLS handshake). Nếu 1 response lớn bị chặn → cả connection đó nghẽn.

```
HTTP/1.1 — tải 4 tài nguyên qua 2 connection:
Connection 1: [Request A → Response A (200ms)] → [Request C → Response C (50ms)]
Connection 2: [Request B → Response B (300ms)] → [Request D → Response D (100ms)]
Tổng thời gian: max(200+50, 300+100) = 400ms
```

**Pipelining** (HTTP/1.1 extension): gửi nhiều request liên tiếp không đợi response — nhưng response phải trả lại đúng thứ tự gửi. Nếu request đầu chậm → tất cả sau đó phải đợi.

### 5.2. HTTP/2 — Multiplexing thực sự

**Multiplexing (đa hợp kênh)**: nhiều request-response chạy song song trên **1 kết nối TCP duy nhất**, thông qua cơ chế **stream**.

```
HTTP/2 — tải 4 tài nguyên trên 1 connection:
Stream 1: [→ Request A] ··· [← Response A 200ms]
Stream 2:   [→ Request B] ········· [← Response B 300ms]
Stream 3:     [→ Request C] · [← Response C 50ms]
Stream 4:       [→ Request D] ·· [← Response D 100ms]
Tất cả chạy song song — tổng ≈ 300ms (bottleneck là Response B)
```

**Binary protocol**: HTTP/1.1 dùng text (người đọc được), HTTP/2 dùng **binary frame** — hiệu quả hơn để parse, ít lỗi hơn khi xử lý ký tự đặc biệt.

**HPACK Header Compression**: HTTP header thường lặp lại (`User-Agent`, `Accept`, `Cookie`). HPACK xây bảng symbol, gửi header chỉ cần index thay vì toàn bộ chuỗi. Header giảm 85–90%.

**Server Push**: server chủ động gửi tài nguyên mà client chưa request nhưng server biết client sẽ cần (vd: gửi `style.css` và `app.js` ngay khi client request `index.html`). Thực tế ít dùng vì có thể gửi thứ client đã cache.

**Vấn đề còn lại**: HTTP/2 vẫn dùng TCP — nếu 1 gói tin bị mất → TCP phải chờ phát lại → **HOL blocking ở tầng TCP** (dù không còn ở tầng HTTP). Mạng kém (packet loss cao) → HTTP/2 thậm chí tệ hơn HTTP/1.1 với nhiều connection.

### 5.3. HTTP/3 — QUIC trên UDP

**QUIC** = Quick UDP Internet Connections (Google phát triển, chuẩn hóa RFC 9000). HTTP/3 chạy trên QUIC thay vì TCP.

Xem [Lesson 07 — UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) để hiểu nền tảng UDP.

**Vì sao dùng UDP?** UDP không có HOL blocking ở tầng transport — mỗi stream độc lập. Mất gói của stream 1 không ảnh hưởng stream 2.

**QUIC giải quyết gì?**:

1. **0-RTT / 1-RTT handshake**: TCP cần 1 RTT (SYN/SYN-ACK/ACK) + 1–2 RTT TLS → tổng 2–3 RTT. QUIC kết hợp transport + crypto handshake: kết nối mới = 1 RTT; kết nối lại với server đã biết = **0-RTT** (gửi data ngay trong gói đầu tiên).
2. **Connection migration**: QUIC dùng Connection ID thay vì (IP:port) để nhận diện kết nối. Chuyển từ WiFi sang 4G (IP thay đổi) → kết nối QUIC vẫn duy trì. TCP phải reconnect.
3. **Stream-level HOL blocking eliminated**: Mỗi HTTP stream là một QUIC stream độc lập. Mất gói ở stream 1 → chỉ stream 1 bị chậm, stream 2–N vẫn tiếp tục.

### 5.4. Bảng so sánh

| Đặc điểm | HTTP/1.1 | HTTP/2 | HTTP/3 (QUIC) |
|-----------|----------|--------|---------------|
| Năm chuẩn hóa | 1997 | 2015 (RFC 7540) | 2022 (RFC 9114) |
| Transport | TCP | TCP | UDP (QUIC) |
| Multiplexing | Không (1 req/conn) | Có (nhiều stream) | Có (nhiều stream độc lập) |
| HOL blocking | TCP + HTTP cấp | Chỉ TCP cấp | Không có |
| Header encoding | Text | Binary (HPACK) | Binary (QPACK) |
| TLS | Tùy chọn | Tùy chọn (thực tế bắt buộc) | Tích hợp bắt buộc |
| Handshake latency | 2–3 RTT | 2–3 RTT | 0–1 RTT |
| Connection migration | Không | Không | Có |
| Server Push | Không | Có | Có (ít dùng) |
| Phù hợp | Đơn giản, compatible | Tốt cho mạng ổn định | Mạng kém, mobile |

❓ **Câu hỏi tự nhiên**:

- *"HTTP/2 có thật sự nhanh hơn HTTP/1.1 không?"* — Trên mạng tốt (< 1% packet loss): HTTP/2 thường nhanh hơn 30–60% do multiplexing và HPACK. Trên mạng kém (mobile, > 2% loss): có thể tương đương hoặc tệ hơn do TCP HOL blocking.
- *"HTTP/3 đã phổ biến chưa?"* — Tính đến 2025: Google, Facebook, Cloudflare, YouTube đã dùng HTTP/3. ~30% traffic internet dùng QUIC. Chrome, Firefox, Safari hỗ trợ đầy đủ.

📝 **Tóm tắt mục 5**:

- HTTP/1.1: 1 request/connection → HOL blocking → mở nhiều connection (tốn tài nguyên).
- HTTP/2: multiplexing (nhiều stream/1 TCP) + binary + HPACK. Vẫn bị HOL blocking ở TCP.
- HTTP/3: QUIC/UDP — loại bỏ HOL blocking hoàn toàn, 0-RTT, connection migration.

---

## 6. CORS — Chính sách cùng nguồn gốc

### 6.1. Vì sao trình duyệt chặn cross-origin?

💡 **Trực giác**: Bạn đang đọc báo tại `evil-news.com`. Trang báo chèn JavaScript để gọi `bank.example.com/api/transfer?to=hacker&amount=9999`. Trình duyệt biết bạn đang đăng nhập bank — cookie của bank sẽ tự động gửi kèm. Nếu không có chính sách gì, JS của evil-news có thể chuyển tiền thay mặt bạn.

**Same-Origin Policy (SOP)**: trình duyệt chỉ cho phép JavaScript đọc response nếu origin của script trùng origin của server. Origin = `protocol + domain + port`.

- `https://bank.example.com:443` và `https://bank.example.com:443` → cùng origin.
- `http://bank.example.com` và `https://bank.example.com` → khác (protocol).
- `https://api.example.com` và `https://app.example.com` → khác (subdomain).

### 6.2. CORS cho phép cross-origin có kiểm soát

**CORS (Cross-Origin Resource Sharing)**: cơ chế để server chủ động "cho phép" một số origin nhất định.

**Simple request** (GET/POST với Content-Type text hoặc form):
1. Trình duyệt gửi request với header `Origin: https://app.example.com`.
2. Server kiểm tra — nếu cho phép origin đó — trả về `Access-Control-Allow-Origin: https://app.example.com`.
3. Trình duyệt kiểm tra header → nếu có → cho JS đọc response.

**Preflight request** (PUT, DELETE, hoặc JSON body):
1. Trình duyệt tự động gửi `OPTIONS` trước:
   ```
   OPTIONS /api/users HTTP/1.1
   Origin: https://app.example.com
   Access-Control-Request-Method: DELETE
   Access-Control-Request-Headers: Authorization
   ```
2. Server phản hồi cho phép:
   ```
   HTTP/1.1 204 No Content
   Access-Control-Allow-Origin: https://app.example.com
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Authorization, Content-Type
   Access-Control-Max-Age: 86400
   ```
3. Trình duyệt mới gửi request thật.

⚠ **Lỗi thường gặp**: `Access-Control-Allow-Origin: *` cho API có cookie/token — không hoạt động (wildcard không được dùng với `credentials: true`). Phải chỉ định origin cụ thể.

📝 **Tóm tắt mục 6**:

- Same-Origin Policy: trình duyệt ngăn JS của trang A đọc response từ trang B (khác origin).
- CORS: server chủ động cấp phép qua `Access-Control-Allow-Origin`.
- Preflight (OPTIONS): trình duyệt hỏi trước với request phức tạp (DELETE, JSON, custom headers).

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Thiết kế REST endpoint**

Thiết kế đầy đủ REST API cho hệ thống thư viện sách. Cần hỗ trợ:
- Xem danh sách sách (có tìm kiếm theo tên).
- Xem chi tiết 1 cuốn sách.
- Thêm sách mới.
- Cập nhật số lượng tồn kho của 1 cuốn.
- Xóa sách.
- Xem danh sách đơn mượn của 1 user cụ thể.

**Bài 2 — Luồng Cookie/Session**

Người dùng vào trang web lần đầu (chưa đăng nhập), đăng nhập, sau đó xem trang "tài khoản của tôi". Vẽ/mô tả chi tiết các request-response, header nào xuất hiện, server làm gì ở từng bước.

**Bài 3 — Đọc tình huống cache 304**

Server trả response với:
```
ETag: "abc-456"
Cache-Control: max-age=120
Content-Length: 25600
```
Sau 90 giây, trình duyệt request lại. Sau 150 giây (từ lần đầu), trình duyệt request lại và server xác nhận nội dung chưa thay đổi.

Hỏi: (a) Sau 90 giây — trình duyệt làm gì? (b) Sau 150 giây — request và response trông như thế nào? (c) Bao nhiêu byte được truyền qua mạng ở lần 150 giây?

**Bài 4 — Chọn phiên bản HTTP**

Cho các kịch bản sau, chọn HTTP/1.1, HTTP/2 hay HTTP/3 và giải thích:
- (a) API nội bộ giữa 2 microservice trong cùng datacenter (RTT < 0.5ms, mạng cực ổn định).
- (b) Web app phục vụ người dùng di động ở vùng nông thôn (RTT 150ms, packet loss 3%).
- (c) Trang landing page marketing với 50 ảnh, CSS, JS (CDN Cloudflare).

**Bài 5 — Tính lợi ích cache**

Một API endpoint `/api/feed` trả response 80 KB, được 50.000 user gọi 8 lần/ngày. Mỗi nội dung thay đổi mỗi 10 phút (600 giây). Tính:
- (a) Băng thông nếu không có cache.
- (b) Băng thông nếu dùng `Cache-Control: max-age=600`.
- (c) Băng thông nếu dùng `max-age=600` + ETag (sau 600s, 70% nội dung chưa thay đổi → 304; response header 304 khoảng 400 byte).

---

### Lời giải chi tiết

**Bài 1 — Thiết kế REST**

```
Tài nguyên chính: /books, /books/{id}, /users/{id}/loans

GET    /books                        — danh sách (query: ?q=tên)
GET    /books/42                     — chi tiết sách id=42
POST   /books                        — thêm sách mới; body JSON; → 201 Created + Location: /books/43
PATCH  /books/42                     — cập nhật tồn kho; body {"stock": 5}; → 200 OK
DELETE /books/42                     — xóa sách; → 204 No Content
GET    /users/7/loans                — đơn mượn của user 7
```

Lưu ý thiết kế:
- Tìm kiếm: `GET /books?q=Python&page=1&limit=20` — query string, không phải `POST /books/search`.
- URI dùng danh từ số nhiều (`/books`, không phải `/book`).
- Phân trang bằng query param, không trong path.
- Nested resource (`/users/7/loans`) hợp lệ khi mối quan hệ "thuộc về" rõ ràng.

**Bài 2 — Luồng Cookie/Session**

```
Bước 1 — Truy cập lần đầu (không có cookie):
  GET /dashboard HTTP/1.1
  Host: example.com
  (không có Cookie header)

  → Server kiểm tra cookie — không có → 302 Redirect to /login

Bước 2 — Đăng nhập:
  POST /login HTTP/1.1
  Content-Type: application/x-www-form-urlencoded
  username=nva&password=...

  → Server kiểm tra DB, xác minh mật khẩu
  → Tạo session: "xyz789" → {user_id: 42, expires: now+3600}
  → Lưu vào Redis

  HTTP/1.1 302 Found
  Location: /dashboard
  Set-Cookie: session_id=xyz789; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

Bước 3 — Truy cập dashboard (đã có cookie):
  GET /dashboard HTTP/1.1
  Cookie: session_id=xyz789

  → Server lấy "xyz789" → tra Redis → {user_id: 42, ...}
  → Render dashboard cho user 42

  HTTP/1.1 200 OK
  [HTML dashboard]
```

**Bài 3 — Cache 304**

(a) Sau 90 giây — còn trong hạn `max-age=120`: trình duyệt dùng **thẳng từ bộ nhớ cache** mà không gửi bất kỳ request nào ra mạng. 0 byte truyền.

(b) Sau 150 giây — cache đã hết hạn (120s đã qua), trình duyệt gửi request xác nhận lại:
```
GET /resource HTTP/1.1
If-None-Match: "abc-456"
```
Server so sánh ETag hiện tại với `"abc-456"` — nội dung chưa thay đổi → trả về:
```
HTTP/1.1 304 Not Modified
ETag: "abc-456"
Cache-Control: max-age=120
(không có body)
```

(c) Byte truyền qua mạng ở lần 150s: chỉ các header — cỡ ~200–400 byte. Không có body (25600 byte). Tiết kiệm 25.600 byte - ~300 byte = ~25.300 byte so với không có cache.

**Bài 4 — Chọn phiên bản HTTP**

(a) **HTTP/2** hoặc HTTP/1.1 đều ổn. RTT cực thấp trong datacenter — lợi ích multiplexing của HTTP/2 không đáng kể khi mỗi request cũng rất nhanh. gRPC (dùng HTTP/2) phổ biến cho microservice vì có Protobuf binary và streaming.

(b) **HTTP/3** — mạng kém, packet loss 3% là cao. HTTP/2 + TCP sẽ bị HOL blocking nặng khi mất gói. HTTP/3 (QUIC/UDP): mỗi stream độc lập, mất gói stream 1 không ảnh hưởng stream khác. 0-RTT với server đã kết nối trước → giảm độ trễ đáng kể trên di động.

(c) **HTTP/2** (CDN Cloudflare đã hỗ trợ HTTP/2 mặc định, và HTTP/3). Với 50 tài nguyên, multiplexing HTTP/2 tải song song qua 1 connection thay vì 6–8 connection HTTP/1.1 — giảm overhead đáng kể. CDN caching cũng sẽ phục vụ phần lớn nội dung tĩnh.

**Bài 5 — Tính lợi ích cache**

Dữ liệu: 50.000 user × 8 lần/ngày = 400.000 request/ngày. Response = 80 KB.

**(a) Không cache**:
```
400.000 × 80 KB = 32.000.000 KB = 32 GB/ngày
```

**(b) Với max-age=600 (10 phút)**:
- Mỗi user gọi 8 lần/ngày. Khoảng cách giữa các lần: 24h/8 = 3 giờ = 180 phút >> 10 phút.
- Thực tế phụ thuộc vào pattern dùng. Nếu user mở lại trang trong 10 phút → cache hit.
- Giả sử 40% request trong vòng 10 phút của nhau (cache hit):
```
60% × 400.000 × 80 KB = 19.2 GB/ngày (giảm ~40%)
```
- Nếu user dùng đều suốt ngày, mỗi 10 phút có 1 "cache miss" mới: 400.000/8 hit × 80 KB = 25.600.000 KB ≈ 25.6 GB. (Lý tưởng với lưu lượng đều: chỉ 1 lần miss/10 phút/user session.)

**(c) Với max-age=600 + ETag**:
- Sau 600s cache hết hạn: 70% nội dung chưa thay đổi → 304 (400 byte), 30% thay đổi → 200 (80 KB).
- Giả sử 40% request là cache hit hoàn toàn (không tốn gì), 60% phải revalidate:
  - 60% × 400.000 = 240.000 request revalidate.
  - Trong đó 70% → 304: 168.000 × 400 byte = 67.2 MB.
  - 30% → 200: 72.000 × 80 KB = 5.76 GB.
  - Tổng: ~5.83 GB — **giảm ~82% so với không cache**.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Email & Truyền file](../lesson-05-email-filetransfer/) — giao thức tầng ứng dụng khác: SMTP, IMAP, FTP/SFTP.
- **Bài trước**: [Lesson 03 — HTTP/HTTPS cơ bản](../lesson-03-http-basics/).
- **Liên quan**: [Lesson 07 — UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) — nền tảng QUIC của HTTP/3.
- **Nâng cao**: Kiến trúc API: REST vs GraphQL vs gRPC (ngoài scope bài này).

---

## 📝 Tổng kết Lesson 04

1. **REST** = thiết kế API theo tài nguyên, method HTTP (GET/POST/PUT/PATCH/DELETE) phân biệt hành động. URI là danh từ, stateless.
2. **Cookie + Session** = cơ chế giữ trạng thái trên nền HTTP stateless. `Set-Cookie` phát token, `Cookie` header tự gửi lại. `HttpOnly + Secure + SameSite` bảo vệ cơ bản.
3. **Caching HTTP**: `Cache-Control: max-age=N` xác định TTL. `ETag + If-None-Match` cho phép revalidation nhẹ (304 Not Modified — không gửi body). Tiết kiệm 80–85% băng thông.
4. **Nén**: gzip/brotli giảm 80–85% text; `Accept-Encoding` thương lượng giữa client-server.
5. **HTTP/2**: multiplexing nhiều stream trên 1 TCP, binary, HPACK. HTTP/3: QUIC/UDP loại bỏ HOL blocking hoàn toàn, 0-RTT, connection migration.
6. **CORS**: Same-Origin Policy ngăn cross-origin JS đọc response. CORS cho phép server chủ động cấp phép qua `Access-Control-Allow-Origin`.

**Tiếp theo**: [Lesson 05 — Email & Truyền file](../lesson-05-email-filetransfer/)
