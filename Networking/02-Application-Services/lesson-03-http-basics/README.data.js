// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/02-Application-Services/lesson-03-http-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — HTTP/HTTPS cơ bản

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu HTTP là giao thức request/response (yêu cầu/phản hồi), stateless (phi trạng thái), text-based, chạy trên TCP port 80 (HTTPS port 443).
- Phân tích cấu trúc đầy đủ của một HTTP request: dòng đầu (request line), headers, dòng trống, body.
- Phân biệt các method (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS) về ý nghĩa, tính an toàn (safe), tính idempotent.
- Đọc và phân tích HTTP response: status line, headers, body.
- Tra cứu và hiểu các nhóm status code 1xx–5xx và các mã hay gặp.
- Hiểu vai trò của các header quan trọng: Host, Content-Type, Content-Length, User-Agent, Accept, Location, Cache-Control.
- Nắm được HTTPS = HTTP + TLS, và biết khi nào luồng chuyển sang lớp bảo mật.

## Kiến thức tiền đề

- [Lesson 01 — Client-server & Socket](../lesson-01-client-server-sockets/) — mô hình client-server, khái niệm socket.
- [Lesson 08 — TCP (Foundations)](../../01-Foundations-LowerLayers/lesson-08-tcp/) — HTTP chạy trên TCP; cần hiểu kết nối TCP ổn định trước.

---

## 1. HTTP là gì?

### 1.1. Định nghĩa và vai trò

**HTTP (HyperText Transfer Protocol)** là giao thức tầng ứng dụng (application layer) dùng để truyền dữ liệu giữa client (trình duyệt, ứng dụng) và server (web server). HTTP định nghĩa cách hai bên "nói chuyện": ai gửi gì trước, định dạng ra sao, và kết thúc khi nào.

**Vì sao cần HTTP mà không dùng TCP thô?** TCP chỉ đảm bảo byte đến đúng thứ tự — không biết gì về "tài nguyên", "method", "header", hay "status code". HTTP là lớp quy ước bên trên TCP để hai bên hiểu nhau về ngữ nghĩa: "tôi muốn lấy file \`index.html\`", "server trả 404 vì file không tồn tại".

**Ba đặc điểm cốt lõi:**

1. **Request/Response** (yêu cầu/phản hồi): client luôn gửi trước, server trả lời sau. Không có chiều ngược lại (server không tự push — trừ HTTP/2 Server Push hay WebSocket ở bài sau).
2. **Stateless** (phi trạng thái): mỗi request độc lập, server không nhớ request trước. Request 1 hỏi "tôi là ai?", request 2 server không biết bạn là ai nếu không có cookie/token đính kèm. Đây là thiết kế có chủ ý để đơn giản hóa server.
3. **Text-based** (HTTP/1.1): header và dòng đầu là văn bản ASCII đọc được, dễ debug bằng \`curl -v\` hay \`netcat\`.

💡 **Trực giác — Analogy quầy tiếp tân**:

Hình dung HTTP như quầy hỏi đáp tại thư viện:
- Bạn (client) bước đến quầy và nói: "Tôi muốn cuốn sách \`index.html\`" (request).
- Thủ thư (server) tìm và đưa lại: "Đây, cuốn sách 200 trang" (response 200 OK), hoặc "Không có sách này" (response 404 Not Found).
- Sau đó bạn rời quầy. Lần sau bạn đến, thủ thư không nhớ bạn là ai (stateless) — trừ khi bạn xuất trình thẻ thư viện (cookie/token).
- Mỗi lần hỏi đáp diễn ra trên một cuộc gọi điện thoại (kết nối TCP) riêng (HTTP/1.0) hoặc dùng chung một đường dây (HTTP/1.1 persistent connection).

### 1.2. HTTP chạy trên TCP như thế nào?

\`\`\`
Client                              Server
  |                                   |
  |--- TCP SYN ---------------------->|
  |<-- TCP SYN-ACK ------------------|
  |--- TCP ACK ---------------------->|   [Kết nối TCP xong]
  |                                   |
  |--- HTTP GET /index.html -------->|   [HTTP request]
  |<-- HTTP 200 OK + body ------------|   [HTTP response]
  |                                   |
  |--- TCP FIN ---------------------->|   [Đóng kết nối]
\`\`\`

HTTP/1.1 mặc định dùng **persistent connection** (header \`Connection: keep-alive\`): một kết nối TCP phục vụ nhiều request/response liên tiếp, không cần bắt tay lại cho mỗi request.

**Port mặc định:**
- HTTP: TCP port **80**
- HTTPS: TCP port **443**

❓ **Câu hỏi tự nhiên:**

- *"HTTP/1.1 và HTTP/2 khác nhau gì?"* — HTTP/2 dùng binary frame thay vì text, multiplexing nhiều stream trên 1 connection. HTTP/3 dùng QUIC (UDP). Bài này tập trung HTTP/1.1 vì cú pháp request/response vẫn là nền tảng.
- *"Stateless nghĩa là không đăng nhập được sao?"* — Không phải. Stateless chỉ nghĩa là server không tự nhớ. Trạng thái được lưu trong cookie/session token đính kèm mỗi request — server đọc token đó để "nhớ".
- *"HTTP/1.1 có cần mở kết nối TCP mới cho mỗi trang không?"* — Không. Persistent connection giữ TCP sống cho nhiều request. Nhưng mỗi domain cần ≥1 kết nối.

📝 **Tóm tắt mục 1**

- HTTP = giao thức application-layer, request/response, stateless, text-based.
- Chạy trên TCP; HTTP port 80, HTTPS port 443.
- HTTP/1.1: persistent connection mặc định.
- Stateless ≠ không có trạng thái — trạng thái được lưu ở cookie/token phía client.

---

## 2. Cấu trúc HTTP Request

### 2.1. Các thành phần

Một HTTP request gồm 4 phần, phân tách bởi ký tự xuống dòng \`\\r\\n\` (CRLF theo RFC):

\`\`\`
<Request Line>        ← Method + Path + Version
<Header 1>: <value>
<Header 2>: <value>
...
                      ← Dòng trống (CRLF CRLF) — phân cách header và body
<Body>                ← Dữ liệu (nếu có; GET thường không có body)
\`\`\`

### 2.2. Request thật đầy đủ — ví dụ POST đăng nhập

\`\`\`http
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 42
Accept: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0
Connection: keep-alive

{"username": "alice", "password": "secret"}
\`\`\`

Phân tích từng dòng:

| Phần | Giá trị | Ý nghĩa |
|------|---------|---------|
| **Request line** | \`POST /api/login HTTP/1.1\` | Method=POST, đường dẫn=/api/login, phiên bản=HTTP/1.1 |
| \`Host\` | \`example.com\` | Tên domain (bắt buộc trong HTTP/1.1 — server ảo cần biết domain nào) |
| \`Content-Type\` | \`application/json\` | Body là JSON |
| \`Content-Length\` | \`42\` | Body dài 42 byte (server đọc đúng bấy nhiêu byte) |
| \`Accept\` | \`application/json\` | Client muốn nhận JSON |
| \`User-Agent\` | \`Mozilla/5.0 ...\` | Thông tin trình duyệt/client |
| Dòng trống | \`\\r\\n\` | Kết thúc phần header |
| **Body** | \`{"username": ...}\` | Dữ liệu gửi lên |

### 2.3. Request GET đơn giản

\`\`\`http
GET /products?page=2&limit=20 HTTP/1.1
Host: shop.example.com
Accept: text/html,application/xhtml+xml
User-Agent: curl/8.1.0
Connection: keep-alive

\`\`\`

GET không có body — dòng trống kết thúc request. Tham số truy vấn (query string) được đính vào URL sau dấu \`?\`.

💡 **Trực giác:** Request line giống tiêu đề bưu thiếp: "Gửi GET → /products?page=2 → dùng ngôn ngữ HTTP/1.1". Headers là thông tin hành lý. Body là nội dung thư (không phải lúc nào cũng có).

⚠ **Lỗi thường gặp:**

- Quên \`Host\` header trong HTTP/1.1 → server trả 400 Bad Request (Host là header bắt buộc duy nhất theo RFC 7230).
- Không có dòng trống giữa header và body → server không biết header kết thúc ở đâu, parse sai.
- Đặt body trong GET request — về mặt kỹ thuật RFC không cấm, nhưng nhiều server/proxy bỏ qua body của GET → dùng POST nếu cần gửi data.

📝 **Tóm tắt mục 2**

- Request = Request line + Headers + Dòng trống + Body.
- Request line: \`<Method> <Path> <HTTP/Version>\`.
- \`Host\` header bắt buộc trong HTTP/1.1.
- Dòng trống \`\\r\\n\\r\\n\` là ranh giới header/body — không được thiếu.

---

## 3. HTTP Method

### 3.1. Bảng tổng quan

| Method | Mục đích | Safe? | Idempotent? | Body? |
|--------|----------|:-----:|:-----------:|:-----:|
| GET | Lấy tài nguyên | Có | Có | Không |
| HEAD | Như GET nhưng không có body trong response | Có | Có | Không |
| POST | Tạo tài nguyên mới / thực hiện hành động | Không | Không | Có |
| PUT | Thay thế toàn bộ tài nguyên | Không | Có | Có |
| PATCH | Cập nhật một phần tài nguyên | Không | Không | Có |
| DELETE | Xóa tài nguyên | Không | Có | Tuỳ |
| OPTIONS | Hỏi server hỗ trợ method nào | Có | Có | Không |

**Safe (an toàn):** không thay đổi trạng thái server. GET, HEAD, OPTIONS chỉ đọc — có thể gọi bao nhiêu lần cũng không ảnh hưởng.

**Idempotent (lũy đẳng):** gọi nhiều lần kết quả giống gọi 1 lần. PUT \`/users/5\` với cùng body → lần 1 cập nhật, lần 2–10 kết quả y hệt lần 1. POST không idempotent: POST \`/orders\` 3 lần → 3 đơn hàng mới.

💡 **Trực giác:** "Safe" như đọc sách — không làm hỏng sách. "Idempotent" như đặt thức ăn vào lò vi sóng ở 100°C — đun thêm không làm nóng hơn (đã đạt nhiệt độ tối đa rồi). POST thì khác: mỗi lần bấm "Gửi đơn hàng" tạo một đơn mới.

### 3.2. Bốn ví dụ method trong REST API

**Ví dụ 1 — GET lấy danh sách sản phẩm:**
\`\`\`http
GET /api/products HTTP/1.1
Host: shop.example.com
\`\`\`
Server trả danh sách JSON. Không có side-effect; có thể cache.

**Ví dụ 2 — POST tạo sản phẩm mới:**
\`\`\`http
POST /api/products HTTP/1.1
Host: shop.example.com
Content-Type: application/json
Content-Length: 55

{"name": "Chuột không dây", "price": 350000, "stock": 100}
\`\`\`
Server tạo sản phẩm, trả \`201 Created\` với \`Location: /api/products/42\`. Gọi lại → tạo thêm sản phẩm khác (id khác).

**Ví dụ 3 — PUT cập nhật toàn bộ sản phẩm:**
\`\`\`http
PUT /api/products/42 HTTP/1.1
Host: shop.example.com
Content-Type: application/json
Content-Length: 62

{"name": "Chuột không dây Pro", "price": 420000, "stock": 80}
\`\`\`
Thay thế toàn bộ sản phẩm #42. Gọi 5 lần với cùng body → cùng kết quả (idempotent).

**Ví dụ 4 — DELETE xóa sản phẩm:**
\`\`\`http
DELETE /api/products/42 HTTP/1.1
Host: shop.example.com
\`\`\`
Server xóa sản phẩm #42 và trả \`204 No Content\`. Gọi lần 2: sản phẩm đã xóa → \`404 Not Found\`. Idempotent vì "kết quả cuối cùng" (tài nguyên không còn) giống nhau.

**Ví dụ 5 — PATCH cập nhật một trường:**
\`\`\`http
PATCH /api/products/42 HTTP/1.1
Host: shop.example.com
Content-Type: application/json
Content-Length: 17

{"stock": 95}
\`\`\`
Chỉ cập nhật field \`stock\`, không đụng đến \`name\`, \`price\`. Khác PUT ở chỗ không phải gửi toàn bộ object.

❓ **Câu hỏi tự nhiên:**

- *"PUT và PATCH khác gì, dùng khi nào?"* — PUT thay thế toàn bộ (gửi thiếu field → field đó bị xóa/null). PATCH chỉ cập nhật những field được gửi. Dùng PATCH khi client chỉ biết một phần dữ liệu cần đổi.
- *"HEAD dùng để làm gì?"* — Kiểm tra file tồn tại không, lấy Content-Length trước khi download, kiểm tra Last-Modified để quyết định có cần tải lại không — mà không tốn bandwidth tải body.
- *"OPTIONS dùng ở đâu?"* — CORS preflight: trình duyệt gửi OPTIONS trước POST cross-origin để hỏi server có cho phép method đó từ origin này không.

⚠ **Lỗi thường gặp:**

- Dùng GET với body để lọc dữ liệu → nhiều proxy/server bỏ qua body của GET. Dùng query string hoặc POST.
- Nhầm PATCH và PUT → PUT với body thiếu field có thể xóa dữ liệu ngoài ý muốn.
- Dùng POST cho mọi thứ kể cả lấy dữ liệu → vi phạm semantics, mất cơ hội cache.

🔁 **Dừng lại tự kiểm tra:**

Câu hỏi: API endpoint \`/api/orders\` nhận POST. Client gọi 3 lần liên tiếp (do lỗi mạng retry). Kết quả? Cách phòng tránh?

<details>
<summary>Xem đáp án</summary>

3 đơn hàng được tạo vì POST không idempotent. Phòng tránh: dùng **idempotency key** — client gửi header \`Idempotency-Key: <uuid>\` trong mỗi request; server kiểm tra nếu đã xử lý key này thì trả kết quả cũ thay vì tạo mới. Hoặc dùng PUT với ID do client tạo ra (\`PUT /api/orders/<uuid>\`).

</details>

📝 **Tóm tắt mục 3**

- GET/HEAD/OPTIONS: safe và idempotent — chỉ đọc.
- PUT/DELETE: idempotent nhưng không safe — thay đổi server, kết quả lặp lại ổn định.
- POST: không safe, không idempotent — mỗi lần gọi có thể tạo tài nguyên mới.
- PATCH: cập nhật một phần; không idempotent theo RFC (dù thực tế nhiều API xử lý idempotent).

---

## 4. Cấu trúc HTTP Response

### 4.1. Các thành phần

\`\`\`
<Status Line>         ← Version + Status Code + Reason Phrase
<Header 1>: <value>
<Header 2>: <value>
...
                      ← Dòng trống
<Body>                ← Nội dung (HTML, JSON, ảnh, v.v.)
\`\`\`

### 4.2. Response 200 OK — ví dụ thật

\`\`\`http
HTTP/1.1 200 OK
Date: Fri, 30 May 2026 08:23:45 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1348
Connection: keep-alive
Cache-Control: max-age=3600
Last-Modified: Thu, 29 May 2026 12:00:00 GMT
ETag: "abc123def456"

<!DOCTYPE html>
<html lang="vi">
<head><title>Trang chủ</title></head>
<body>
  <h1>Chào mừng!</h1>
  <!-- ... 1348 byte HTML ... -->
</body>
</html>
\`\`\`

| Phần | Giá trị | Ý nghĩa |
|------|---------|---------|
| **Status line** | \`HTTP/1.1 200 OK\` | Phiên bản, mã 200, reason "OK" |
| \`Date\` | timestamp | Thời điểm server phản hồi |
| \`Content-Type\` | \`text/html; charset=UTF-8\` | Định dạng và bảng mã body |
| \`Content-Length\` | \`1348\` | Số byte body (client đọc đúng bấy nhiêu) |
| \`Cache-Control\` | \`max-age=3600\` | Cache được 3600 giây (1 giờ) |
| \`ETag\` | \`"abc123def456"\` | Fingerprint nội dung để validate cache |
| **Body** | HTML | Nội dung trang |

### 4.3. Response 404 Not Found

\`\`\`http
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 38
Connection: keep-alive

{"error": "Product not found", "id": 99}
\`\`\`

Lưu ý: body của response lỗi cũng có thể chứa thông tin chi tiết (JSON, HTML error page).

💡 **Trực giác:** Status line như thư trả lời: "HTTP/1.1 (ngôn ngữ) 200 (mã kết quả) OK (ý nghĩa ngắn)". Phần còn lại là phong bì (headers) và nội dung (body).

📝 **Tóm tắt mục 4**

- Response = Status line + Headers + Dòng trống + Body.
- Status line: \`HTTP/<version> <code> <reason>\`.
- Body có thể là HTML, JSON, ảnh, PDF, file tải xuống.

---

## 5. Status Code

### 5.1. Năm nhóm

| Nhóm | Phạm vi | Ý nghĩa chung |
|------|---------|--------------|
| **1xx** | 100–199 | Thông tin — request đang được xử lý |
| **2xx** | 200–299 | Thành công |
| **3xx** | 300–399 | Chuyển hướng (redirect) |
| **4xx** | 400–499 | Lỗi phía client |
| **5xx** | 500–599 | Lỗi phía server |

💡 **Trực giác:** Hình dung đặt pizza:
- **1xx**: "Chúng tôi đã nhận đơn hàng, đang làm."
- **2xx**: "Pizza đã giao thành công."
- **3xx**: "Địa chỉ này đổi rồi, vui lòng đến địa chỉ mới."
- **4xx**: "Bạn gọi sai món / không có tiền / hết hạn giờ."
- **5xx**: "Nhà hàng có sự cố, lỗi phía chúng tôi."

### 5.2. Các mã hay gặp — bảng chi tiết

| Mã | Tên | Khi nào | Ví dụ tình huống |
|----|-----|---------|-----------------|
| **100** | Continue | Server báo "tiếp tục gửi body" | Client gửi header \`Expect: 100-continue\` trước khi gửi body 100MB — chờ server xác nhận có đủ tài nguyên không |
| **200** | OK | Request thành công | GET trang web, GET API data, response bình thường |
| **201** | Created | Tạo tài nguyên thành công | POST \`/api/users\` → server tạo user mới, trả \`Location: /api/users/123\` |
| **204** | No Content | Thành công, không có body | DELETE \`/api/items/5\` → xóa xong, không cần trả gì |
| **301** | Moved Permanently | Chuyển hướng vĩnh viễn | \`http://example.com\` → \`https://example.com\`; trình duyệt nhớ và tự chuyển lần sau |
| **302** | Found (Moved Temporarily) | Chuyển hướng tạm thời | Sau đăng nhập → chuyển về trang chủ; trình duyệt không lưu redirect |
| **304** | Not Modified | Cache còn hợp lệ | Client gửi \`If-None-Match: "abc123"\`, server so sánh ETag — nếu khớp → 304, client dùng cache cũ |
| **400** | Bad Request | Request sai cú pháp/dữ liệu | JSON không hợp lệ, thiếu field bắt buộc, param sai kiểu |
| **401** | Unauthorized | Chưa xác thực | Truy cập \`/api/profile\` mà không gửi token → server yêu cầu đăng nhập |
| **403** | Forbidden | Đã xác thực nhưng không có quyền | User thường truy cập \`/admin\` → có tài khoản nhưng không phải admin |
| **404** | Not Found | Tài nguyên không tồn tại | GET \`/api/products/99999\` — sản phẩm không có trong DB |
| **409** | Conflict | Xung đột trạng thái | POST tạo user với email đã tồn tại |
| **422** | Unprocessable Entity | Dữ liệu hợp lệ về cú pháp nhưng sai logic | Ngày sinh = tương lai, số âm cho trường dương |
| **500** | Internal Server Error | Lỗi chung phía server | Exception chưa xử lý trong code server |
| **502** | Bad Gateway | Gateway/proxy nhận response không hợp lệ từ upstream | Nginx forward đến Node.js app đang crash |
| **503** | Service Unavailable | Server quá tải hoặc bảo trì | Triển khai phiên bản mới, auto-scaling chưa kịp khởi động |

### 5.3. Sáu tình huống cụ thể

**Tình huống 1 — Truy cập trang web bình thường:**
\`\`\`
GET /index.html → 200 OK + body HTML (khoảng 5–50 KB)
\`\`\`

**Tình huống 2 — Trang chưa đổi, client có cache:**
\`\`\`
GET /logo.png, If-None-Match: "etag-abc" → 304 Not Modified (body rỗng)
→ Client dùng lại file đã cache, tiết kiệm băng thông
\`\`\`

**Tình huống 3 — Đăng nhập thành công:**
\`\`\`
POST /login → 302 Found, Location: /dashboard
→ Trình duyệt tự redirect GET /dashboard
\`\`\`

**Tình huống 4 — Gửi form thiếu email:**
\`\`\`
POST /register, body thiếu field "email" → 400 Bad Request
{"error": "email is required"}
\`\`\`

**Tình huống 5 — Xem trang admin không có quyền:**
\`\`\`
GET /admin → 403 Forbidden (đã đăng nhập nhưng không phải admin)
\`\`\`

**Tình huống 6 — Server bị lỗi database:**
\`\`\`
GET /api/products → 500 Internal Server Error
{"error": "database connection timeout"}
\`\`\`

❓ **Câu hỏi tự nhiên:**

- *"401 và 403 khác gì?"* — 401 = chưa biết bạn là ai (cần đăng nhập). 403 = biết bạn là ai nhưng không cho vào (thiếu quyền). Ví dụ: 401 = chưa có vé xem phim; 403 = có vé nhưng vé hạng phổ thông, khu VIP = 403.
- *"301 và 302 khác gì?"* — 301 = vĩnh viễn, trình duyệt nhớ và tự chuyển lần sau không cần hỏi server; SEO: link juice chuyển sang URL mới. 302 = tạm thời, mỗi lần vẫn hỏi server; SEO: không chuyển link juice.
- *"502 và 503 khác gì?"* — 502 = server trung gian (Nginx, load balancer) nhận phản hồi không hợp lệ từ backend. 503 = backend không trả lời hoặc server đang bảo trì.

⚠ **Lỗi thường gặp:**

- Trả 200 OK nhưng body chứa thông báo lỗi → client không biết thực ra có lỗi (anti-pattern phổ biến).
- Dùng 401 khi ý muốn là 403 → client sẽ thử đăng nhập lại dù đã đăng nhập.
- Trả 500 cho lỗi do input của client → đúng ra phải là 400/422.

📝 **Tóm tắt mục 5**

- 2xx = thành công; 3xx = redirect; 4xx = lỗi client; 5xx = lỗi server.
- 200/201/204: các mức thành công khác nhau (có body / tạo mới / không body).
- 301 (vĩnh viễn) vs 302 (tạm thời) — quan trọng cho SEO và UX.
- 401 (chưa xác thực) vs 403 (không có quyền) — hay bị nhầm.

---

## 6. Header quan trọng và HTTPS

### 6.1. Headers phía request

**\`Host\`** (bắt buộc):
\`\`\`
Host: www.example.com
\`\`\`
Xác định domain đích. Một IP có thể host nhiều website (virtual hosting) — \`Host\` giúp server biết phục vụ site nào. Thiếu \`Host\` → 400 Bad Request.

**\`Content-Type\`**:
\`\`\`
Content-Type: application/json
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
Content-Type: text/plain; charset=UTF-8
\`\`\`
Nói với server "body tôi gửi ở định dạng gì". Server parse body dựa trên giá trị này. Gửi JSON nhưng khai \`text/plain\` → server xử lý sai.

**\`Content-Length\`**:
\`\`\`
Content-Length: 1024
\`\`\`
Số byte của body. Server đọc đúng bấy nhiêu byte rồi dừng. Thiếu hoặc sai → server không biết body kết thúc ở đâu (hoặc đọc thiếu/thừa).

**\`User-Agent\`**:
\`\`\`
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605.1.15
User-Agent: curl/8.1.0
User-Agent: MyApp/2.3.1 (Go; linux/amd64)
\`\`\`
Thông tin client. Server có thể dùng để phục vụ nội dung phù hợp (mobile vs desktop) hoặc kiểm soát truy cập bot.

**\`Accept\`**:
\`\`\`
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept: application/json
\`\`\`
Client nói "tôi muốn nhận định dạng nào". Server dùng để content negotiation (thương lượng định dạng) — nếu có thể trả JSON hay XML, trả cái client muốn.

**\`Authorization\`**:
\`\`\`
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Authorization: Basic dXNlcjpwYXNzd29yZA==
\`\`\`
Gửi token xác thực. Bearer token thường là JWT. Basic Auth = base64(username:password) — **không an toàn nếu không có HTTPS**.

### 6.2. Headers phía response

**\`Location\`**:
\`\`\`
Location: https://www.example.com/new-page
Location: /api/products/123
\`\`\`
Dùng với 3xx (redirect) và 201 (Created). Trình duyệt tự follow Location khi nhận 301/302.

**\`Cache-Control\`**:
\`\`\`
Cache-Control: max-age=3600, must-revalidate
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: public, max-age=86400
\`\`\`

| Giá trị | Ý nghĩa |
|---------|---------|
| \`max-age=3600\` | Cache 3600 giây, sau đó hết hạn |
| \`no-cache\` | Lưu cache nhưng phải hỏi server xem còn mới không (ETag/If-None-Match) |
| \`no-store\` | Tuyệt đối không lưu cache (dữ liệu nhạy cảm) |
| \`public\` | Proxy/CDN được phép cache |
| \`private\` | Chỉ trình duyệt cache, không qua proxy |
| \`must-revalidate\` | Sau khi max-age hết, bắt buộc xác nhận lại với server |

**\`Content-Type\`** (trong response):
\`\`\`
Content-Type: text/html; charset=UTF-8
Content-Type: image/png
Content-Type: application/pdf
\`\`\`
Trình duyệt dựa vào \`Content-Type\` để quyết định render hay download. Sai Content-Type → trình duyệt hiển thị sai.

**\`ETag\`** và **\`Last-Modified\`**:
\`\`\`
ETag: "abc123def456"
Last-Modified: Thu, 29 May 2026 12:00:00 GMT
\`\`\`
Dùng để conditional request — client gửi lại trong \`If-None-Match\`/\`If-Modified-Since\`, server so sánh và trả 304 nếu không đổi.

### 6.3. HTTPS = HTTP + TLS

**Vấn đề với HTTP thuần:** Mọi dữ liệu — bao gồm password, token, dữ liệu cá nhân — đi qua mạng dưới dạng **text thuần**. Bất kỳ ai nghe lén (MITM) trên đường mạng đều đọc được.

**Giải pháp:** Thêm lớp **TLS (Transport Layer Security)** giữa HTTP và TCP.

\`\`\`
Không có HTTPS:    HTTP  →  TCP  →  Internet (text rõ, ai cũng đọc được)
Có HTTPS:          HTTP  →  TLS  →  TCP  →  Internet (mã hóa, chỉ 2 đầu đọc được)
\`\`\`

**Luồng kết nối HTTPS:**

\`\`\`
1. TCP Handshake (SYN/SYN-ACK/ACK) trên port 443
2. TLS Handshake:
   a. Client Hello — đề xuất cipher suites, gửi random
   b. Server Hello — chọn cipher, gửi certificate (chứng chỉ TLS)
   c. Client xác minh certificate qua CA (Certificate Authority)
   d. Trao đổi khóa phiên (session key)
3. HTTP Request/Response — mã hóa bằng session key
\`\`\`

Sau bước 2, mọi HTTP byte đều được mã hóa trước khi vào TCP segment. Server nhận → giải mã → xử lý HTTP bình thường. Từ góc nhìn HTTP, không có gì thay đổi — TLS hoàn toàn transparent.

Xem chi tiết TLS tại [Lesson 06 — TLS](../lesson-06-tls/).

❓ **Câu hỏi tự nhiên:**

- *"HTTPS chậm hơn HTTP bao nhiêu?"* — Ngày trước TLS handshake thêm 1–2 RTT. Với TLS 1.3 (2018) và session resumption, overhead giảm còn ~1 RTT hoặc 0-RTT. Overhead CPU mã hóa hiện nay < 1% trên phần cứng hiện đại. Trên thực tế HTTPS với HTTP/2 thường nhanh hơn HTTP/1.1 thuần.
- *"HTTP/2 có cần HTTPS không?"* — Về kỹ thuật không bắt buộc. Nhưng tất cả trình duyệt thực tế chỉ hỗ trợ HTTP/2 qua TLS — nên trên thực tế HTTP/2 = HTTPS.
- *"Chứng chỉ TLS lấy ở đâu?"* — CA (Certificate Authority) như Let's Encrypt (miễn phí), DigiCert, Sectigo. CA xác minh bạn sở hữu domain rồi cấp chứng chỉ.

⚠ **Lỗi thường gặp:**

- Gửi password qua HTTP (không HTTPS) → password đi dạng text thuần → không bao giờ làm vậy.
- Để \`Cache-Control: no-store\` cho trang tĩnh công khai → không cache được → tốn bandwidth không cần thiết.
- Khai \`Content-Type: application/json\` nhưng trả HTML lỗi khi exception → client parse JSON bị lỗi vì nhận được HTML.

📝 **Tóm tắt mục 6**

- \`Host\` bắt buộc; \`Content-Type\` định dạng body; \`Content-Length\` độ dài body; \`Accept\` định dạng mong muốn.
- \`Location\` dùng với redirect và 201 Created.
- \`Cache-Control\`: \`max-age\` (expire sau N giây), \`no-cache\` (hỏi lại), \`no-store\` (không lưu).
- HTTPS = HTTP + TLS — mã hóa toàn bộ request/response. Bắt buộc cho mọi dữ liệu nhạy cảm.

---

## 7. Ứng dụng thực tế trong phần mềm

> 💡 **HTTP là giao thức bạn làm việc với nhiều nhất. Method/status/header đúng nghĩa = API sạch; sai = bug + khó tích hợp.**

| Khái niệm | Dùng đúng trong code |
|-----------|----------------------|
| **Method semantics** | GET (đọc, cacheable), POST (tạo), PUT (thay thế), PATCH (sửa), DELETE — idempotency |
| **Status code** | 2xx/3xx/4xx/5xx đúng nghĩa ([nối REST design](../../../Programming/lesson-43-rest-api-design/)) |
| **Header** | \`Content-Type\`, \`Cache-Control\`, \`Authorization\`, CORS |
| **Stateless** | Mỗi request tự đủ → scale ngang dễ (state ở DB/cache, không ở server) |

### 7.1. Ví dụ cụ thể — idempotency của method ảnh hưởng retry

GET/PUT/DELETE **idempotent** (gọi nhiều lần = một lần): client/proxy retry an toàn. POST **không** idempotent → retry tạo bản trùng ([nói idempotency key](../../../Programming/lesson-43-rest-api-design/)). Đây không phải lý thuyết: load balancer/client tự retry GET khi timeout (an toàn), nhưng KHÔNG tự retry POST (sợ trùng). Dùng đúng method = hệ thống retry/cache đúng. Vd dùng GET cho action "xóa" (sai semantics) → crawler/prefetch của trình duyệt vô tình xóa dữ liệu (sự cố thật đã xảy ra).

> ⚠ **Bẫy HTTP thật.** (1) **Dùng sai status**: trả 200 kèm \`{"error":...}\` → client/monitoring tưởng thành công; lỗi phải là 4xx/5xx. (2) **Quên Cache-Control** → response động bị cache (CDN/browser trả dữ liệu cũ) hoặc response tĩnh không được cache (chậm + tốn băng thông). (3) **CORS** — browser chặn cross-origin nếu thiếu header → lỗi "CORS policy" kinh điển của frontend gọi API. (4) Stateless: lưu session **trong RAM server** → scale ra nhiều instance thì user "đăng nhập rồi lại bị out" (request tới instance khác) → lưu session ở Redis/DB.

### 7.2. 📝 Tóm tắt mục 7

- HTTP đúng nghĩa: **method** (GET/PUT/DELETE idempotent → retry an toàn; POST không), **status code** đúng, **header** (cache/CORS/auth).
- Sai method/status → retry trùng, monitoring nhầm, crawler xóa dữ liệu; CORS thiếu → frontend lỗi.
- **Stateless**: session ở Redis/DB không ở RAM server → scale ngang không "đăng nhập rồi out".

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Đọc request:** Phân tích request sau, xác định: method, path, query string, headers có mặt, body:

\`\`\`http
GET /search?q=laptop&price_max=15000000&sort=asc HTTP/1.1
Host: shop.vn
Accept: application/json
User-Agent: MyApp/1.0
\`\`\`

**Bài 2 — Viết request:** Viết HTTP request hoàn chỉnh để tạo một bình luận mới cho bài viết có ID 7. Dữ liệu bình luận: tác giả "Bob", nội dung "Hay quá!". Server API dùng JSON.

**Bài 3 — Chọn method:** Với mỗi hành động sau, chọn method HTTP phù hợp và giải thích ngắn:
- (a) Lấy thông tin sản phẩm #42.
- (b) Thêm sản phẩm vào giỏ hàng.
- (c) Cập nhật số lượng sản phẩm trong giỏ từ 2 → 5.
- (d) Xóa sản phẩm khỏi giỏ.
- (e) Kiểm tra file \`/assets/video.mp4\` còn mới hay cần tải lại.

**Bài 4 — Chọn status code:** Chọn status code phù hợp nhất và giải thích:
- (a) API tạo user thành công.
- (b) User truy cập trang quản trị nhưng chỉ có quyền user thường.
- (c) Server nhận được JSON hợp lệ nhưng trường \`birth_year = 2035\` (tương lai) không hợp lệ.
- (d) Domain \`http://mysite.com\` đã chuyển sang \`https://mysite.com\` mãi mãi.
- (e) Backend API đang bị restart, load balancer không kết nối được.
- (f) Client gửi header \`Authorization: Bearer <token-hết-hạn>\`.

**Bài 5 — Phân tích header:** Response sau có vấn đề gì?

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 150

{"error": "user not found", "code": 404}
\`\`\`

**Bài 6 — Cache logic:** Client gửi request:
\`\`\`http
GET /api/news/latest HTTP/1.1
Host: news.example.com
If-None-Match: "news-etag-v42"
\`\`\`
Server biết nội dung hiện tại có ETag \`"news-etag-v42"\`. Server nên trả response nào? Nếu nội dung đã thay đổi (ETag hiện tại là \`"news-etag-v43"\`) thì sao?

---

### Lời giải chi tiết

**Bài 1 — Đọc request:**

- **Method:** \`GET\`
- **Path:** \`/search\`
- **Query string:** \`q=laptop&price_max=15000000&sort=asc\` (3 tham số: từ khóa tìm kiếm, giá tối đa 15 triệu, sắp xếp tăng dần)
- **Headers:** \`Host: shop.vn\`, \`Accept: application/json\` (client muốn nhận JSON), \`User-Agent: MyApp/1.0\`
- **Body:** Không có (GET không có body)
- **Nhận xét:** Request hợp lệ. Thiếu \`Content-Type\` và \`Content-Length\` — đúng vì GET không có body nên 2 header đó không cần thiết.

**Bài 2 — Viết request:**

\`\`\`http
POST /api/posts/7/comments HTTP/1.1
Host: blog.example.com
Content-Type: application/json
Content-Length: 44
Accept: application/json

{"author": "Bob", "content": "Hay quá!"}
\`\`\`

Phân tích:
- Method \`POST\` vì đang tạo tài nguyên mới (bình luận).
- Path \`/api/posts/7/comments\` — cấu trúc RESTful: resource con (comments) lồng trong resource cha (posts/7).
- \`Content-Type: application/json\` bắt buộc để server biết parse JSON.
- \`Content-Length: 44\` = số byte của body JSON. Tính: \`{"author": "Bob", "content": "Hay quá!"}\` = 44 ký tự UTF-8.
- Dòng trống phân cách header và body.

**Bài 3 — Chọn method:**

- **(a) Lấy thông tin sản phẩm #42:** \`GET /api/products/42\` — đọc, không thay đổi, idempotent.
- **(b) Thêm sản phẩm vào giỏ:** \`POST /api/cart/items\` — tạo item mới; mỗi lần thêm 1 item.
- **(c) Cập nhật số lượng từ 2 → 5:** \`PATCH /api/cart/items/42\` với body \`{"quantity": 5}\` — chỉ cập nhật một trường, không thay toàn bộ item. Dùng PUT nếu cần thay toàn bộ object.
- **(d) Xóa sản phẩm khỏi giỏ:** \`DELETE /api/cart/items/42\` — xóa, idempotent.
- **(e) Kiểm tra file video còn mới:** \`HEAD /assets/video.mp4\` — nhận headers (ETag, Last-Modified) mà không tải body (có thể vài trăm MB). Sau đó quyết định có cần GET không.

**Bài 4 — Chọn status code:**

- **(a) Tạo user thành công:** \`201 Created\` — không phải 200 OK, vì đã tạo resource mới. Thêm \`Location: /api/users/123\` trong response.
- **(b) Quyền user thường truy cập trang admin:** \`403 Forbidden\` — đã đăng nhập (401 không phù hợp), nhưng không có quyền.
- **(c) birth_year = 2035 không hợp lệ về logic:** \`422 Unprocessable Entity\` — JSON hợp lệ về cú pháp (400 không phù hợp) nhưng dữ liệu sai logic nghiệp vụ.
- **(d) Chuyển HTTP → HTTPS mãi mãi:** \`301 Moved Permanently\` — trình duyệt nhớ, lần sau tự chuyển; SEO link juice chuyển sang HTTPS.
- **(e) Backend không kết nối được:** \`502 Bad Gateway\` — load balancer/nginx nhận response không hợp lệ (hoặc không nhận được) từ backend đang restart.
- **(f) Token hết hạn:** \`401 Unauthorized\` — server biết bạn muốn xác thực (có token) nhưng token không hợp lệ → cần đăng nhập lại.

**Bài 5 — Phân tích header:**

Có 2 vấn đề nghiêm trọng:

1. **Status code 200 nhưng body là lỗi:** Client nhận 200 → nghĩ thành công → xử lý body như data bình thường → parse JSON \`{"error": "user not found", "code": 404}\` → bị lỗi hoặc hiển thị sai. Đúng ra phải trả \`404 Not Found\`.

2. **Content-Type sai:** Body là JSON (\`{...}\`) nhưng khai \`Content-Type: text/html\`. Trình duyệt sẽ cố render JSON như HTML — không có tag \`<html>\` → hiển thị raw text hoặc lỗi. Client dùng API sẽ fail khi parse JSON với Content-Type text/html.

Response đúng:
\`\`\`http
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 43

{"error": "user not found", "code": 404}
\`\`\`

**Bài 6 — Cache logic:**

**Trường hợp 1 — ETag khớp (\`"news-etag-v42"\` == \`"news-etag-v42"\`):**

\`\`\`http
HTTP/1.1 304 Not Modified
ETag: "news-etag-v42"
Cache-Control: max-age=60
\`\`\`

- Body rỗng (không gửi lại content) → tiết kiệm băng thông hoàn toàn.
- Client dùng lại nội dung từ cache local.

**Trường hợp 2 — ETag không khớp (\`"news-etag-v43"\` != \`"news-etag-v42"\`):**

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <size>
ETag: "news-etag-v43"
Cache-Control: max-age=60

{"articles": [...nội dung mới...]}
\`\`\`

- Server trả đầy đủ nội dung mới + ETag mới.
- Client lưu cache với ETag \`"news-etag-v43"\` để dùng cho request tiếp theo.

---

## Liên kết và bài tiếp theo

- **Tiền đề đã học:**
  - [Lesson 01 — Client-server & Socket](../lesson-01-client-server-sockets/)
  - [Lesson 08 — TCP (Foundations)](../../01-Foundations-LowerLayers/lesson-08-tcp/)
- **Bài tiếp theo:** [Lesson 04 — HTTP nâng cao](../lesson-04-http-advanced/) — cookies, session, HTTP/2, caching nâng cao, REST vs GraphQL.
- **Liên quan bảo mật:** [Lesson 06 — TLS](../lesson-06-tls/) — chi tiết TLS handshake, certificate, cipher suite.
- **Minh họa tương tác:** [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 03

1. **HTTP = request/response, stateless, text-based**, chạy trên TCP port 80 (HTTPS port 443). Stateless nghĩa là mỗi request độc lập — trạng thái lưu ở cookie/token phía client.
2. **Request = Request line + Headers + Dòng trống + Body.** \`Host\` header bắt buộc. Dòng trống \`\\r\\n\\r\\n\` là ranh giới header/body.
3. **7 method chính:** GET (đọc, safe, idempotent), POST (tạo, không safe, không idempotent), PUT (thay toàn bộ, idempotent), PATCH (thay một phần), DELETE (xóa, idempotent), HEAD (như GET không body), OPTIONS (hỏi capability).
4. **Status code theo nhóm:** 2xx (thành công), 3xx (redirect), 4xx (lỗi client), 5xx (lỗi server). Nhớ: 201/204 (tạo/xóa), 301/302 (redirect vĩnh viễn/tạm thời), 401/403 (chưa xác thực/không quyền).
5. **Header quan trọng:** \`Host\` (bắt buộc), \`Content-Type\` (định dạng), \`Content-Length\` (độ dài), \`Cache-Control\` (chiến lược cache), \`Location\` (redirect/created).
6. **HTTPS = HTTP + TLS:** Toàn bộ HTTP byte được mã hóa bởi TLS trước khi vào TCP. Bắt buộc cho mọi dữ liệu nhạy cảm. Overhead hiện đại không đáng kể.
`;
