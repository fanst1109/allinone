// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-43-rest-api-design/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 43 — REST API Design (Thiết kế API REST đúng chuẩn)

> Tier 4 — Web & Backend · Lesson 43/?? · **Prerequisite**: [Lesson 42 — net/http Deep](../lesson-42-http-net-deep/), [Lesson 23 — JSON encoding](../lesson-23-json-encoding/), [Lesson 19 — Errors](../lesson-19-errors/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **REST là gì** (Roy Fielding 2000) và 6 ràng buộc kiến trúc.
- Biết **model resource bằng danh từ**, không động từ — vì sao \`/users/42\` đúng còn \`/getUser?id=42\` sai.
- Map đúng **HTTP method → CRUD** (GET / POST / PUT / PATCH / DELETE) và hiểu khái niệm **idempotent / safe**.
- Chọn đúng **status code** cho 15+ tình huống thực tế (2xx, 3xx, 4xx, 5xx).
- Thiết kế **versioning**, **pagination** (offset/cursor/page), **filtering & sorting**.
- Trả về **error format chuẩn RFC 7807 (Problem Details)**.
- Hiểu **HATEOAS**, **Content negotiation**, **CORS**, **Rate limiting**, **Caching** (ETag/Last-Modified).
- Authentication (Bearer / API key / Basic), **Idempotency-Key**, **Bulk operations**, **Sunset/Deprecation**.
- Biết **OpenAPI/Swagger** để document + sinh client.
- Nhận diện và sửa **20 anti-pattern** thường gặp.

> 💡 **Trực giác mở bài**. REST không phải "một framework" hay "một thư viện" — nó là **bộ quy ước** giúp API có thể đoán được. Người dùng API gặp \`GET /users/42\` là biết ngay: lấy user id=42, không có side effect, gọi lại bao nhiêu lần cũng vậy. Đó là sức mạnh của REST: **giao diện thống nhất** (uniform interface) trên hàng triệu API khác nhau.

---

## 1. REST là gì?

REST = **Re**presentational **S**tate **T**ransfer, đề xuất bởi **Roy Fielding** trong luận án tiến sĩ năm 2000 (UC Irvine). Đây không phải protocol — REST là **kiến trúc** (architectural style), được hiện thực hóa chủ yếu trên HTTP.

### 1.1 Sáu ràng buộc REST (Fielding's constraints)

| # | Ràng buộc | Ý nghĩa |
|---|-----------|--------|
| 1 | **Client–Server** | Tách UI khỏi storage. Client không biết DB, server không biết UI. |
| 2 | **Stateless** | Mọi request chứa đủ thông tin để server xử lý. Server **không lưu session** giữa request. |
| 3 | **Cacheable** | Response phải tự đánh dấu được "cache được hay không" (Cache-Control, ETag). |
| 4 | **Uniform Interface** | Giao diện thống nhất: identify resource (URI), manipulate qua representation (JSON/XML), self-descriptive message, HATEOAS. |
| 5 | **Layered System** | Client không cần biết mình đang nói với server gốc hay proxy/load balancer. |
| 6 | **Code on Demand** *(optional)* | Server có thể gửi code thực thi (JavaScript) tới client. |

> ❓ **Câu hỏi của người đọc**: *"Stateless tức là không được login? Không có cookie?"*
>
> Không phải. Stateless nghĩa là **mỗi request mang đủ context** (vd token trong \`Authorization\` header), **server không lưu state phiên** trong RAM. Cookie chứa token vẫn dùng được vì cookie là phương tiện gửi state TỪ client. Cấm là server tự lưu "user X đang login, request tiếp theo của X đừng yêu cầu token nữa" — vì như vậy 2 request liên tiếp có thể rơi vào 2 server khác nhau (load balancer), server B không biết X là ai.

### 1.2 Khái niệm "Resource" và "Representation"

- **Resource** = bất cứ thứ gì có thể đặt tên: 1 user, 1 đơn hàng, 1 ảnh, tập hợp users, kết quả search...
- **Representation** = cách biểu diễn resource ấy: JSON, XML, HTML, ảnh JPEG... Cùng 1 resource có thể có nhiều representation (negotiated qua \`Accept\` header).

> 📝 Resource là **danh từ** trừu tượng. Representation là **bytes** thực sự client nhận được.

### 1.3 REST ≠ RESTful ≠ "API HTTP có JSON"

Nhiều API tự nhận "RESTful" thật ra chỉ là "HTTP + JSON". Để gọi đúng tên, ít nhất cần:

- Resource-oriented URL (danh từ, không động từ).
- Đúng HTTP method (không GET-cho-mọi-thứ).
- Đúng status code (không 200-cho-mọi-thứ).
- Self-descriptive (Content-Type, headers chuẩn).

> ⚠ **Lỗi thường gặp**: gọi \`POST /api/getUserById\` với body \`{"id": 42}\` rồi tự nhận "REST API". Đây là **RPC over HTTP**, không phải REST.

---

## 2. Resource modeling — danh từ, không động từ

Quy tắc vàng: **URL mô tả resource**, **HTTP method mô tả action**.

### 2.1 Đúng vs sai — bảng so sánh

| Mục đích | ❌ Sai (RPC-style) | ✅ Đúng (REST) |
|----------|--------------------|----------------|
| Lấy user 42 | \`GET /getUser?id=42\` | \`GET /users/42\` |
| Lấy tất cả user | \`GET /listUsers\` | \`GET /users\` |
| Tạo user | \`POST /createUser\` | \`POST /users\` |
| Update user 42 | \`POST /updateUser\` | \`PUT /users/42\` hoặc \`PATCH /users/42\` |
| Xóa user 42 | \`POST /deleteUser?id=42\` | \`DELETE /users/42\` |
| Lấy đơn hàng của user 42 | \`GET /getOrdersForUser?uid=42\` | \`GET /users/42/orders\` |
| Lấy đơn hàng 99 của user 42 | \`GET /getOrder?uid=42&oid=99\` | \`GET /users/42/orders/99\` |

### 2.2 Số nhiều cho collection

Quy ước phổ biến: **collection dùng danh từ số nhiều**, instance dùng \`/<collection>/<id>\`:

\`\`\`
/users                 # collection of users
/users/42              # instance: user có id = 42
/users/42/orders       # collection: tất cả đơn hàng của user 42
/users/42/orders/99    # instance: đơn 99 của user 42
\`\`\`

Không trộn lẫn: tránh \`/user/42\` (số ít) và \`/users\` (số nhiều) trong cùng API.

### 2.3 Nesting — đừng quá sâu

Lồng resource hợp lý nhưng **không quá 2 cấp**:

- ✅ \`/users/42/orders\` (1 cấp) — OK.
- ✅ \`/users/42/orders/99\` (2 cấp) — OK.
- ❌ \`/users/42/orders/99/items/3/reviews/7\` (4+ cấp) — khó đọc, khó refactor.

Khi cần truy cập sâu, dùng URL phẳng + query: \`/reviews/7?order_id=99&user_id=42\`.

### 2.4 Khi action không map vào CRUD

Một số action thực sự không phải Create/Read/Update/Delete — ví dụ "publish post", "send password reset email", "cancel order". Có 3 cách xử lý:

| Cách | Ví dụ | Khi nào dùng |
|------|-------|--------------|
| **Sub-resource as state** | \`PUT /posts/42/published\` body \`{"published": true}\` | Action mô tả state có thể on/off |
| **Action as sub-resource** | \`POST /posts/42/publish\` | Action có ý nghĩa độc lập, không idempotent |
| **Update field trên parent** | \`PATCH /posts/42\` body \`{"status": "published"}\` | Action là 1 phần update tổng quát |

Pragmatic: chọn cách nào team đồng thuận, **giữ nhất quán** xuyên suốt API.

> 🔁 **Tự kiểm tra mục 2**
>
> 1. URL nào sai trong list sau: \`/users/42\`, \`/users/42/getOrders\`, \`/orders/99\`, \`/posts/42/comments\`?
> <details><summary>Đáp án</summary>\`/users/42/getOrders\` — có động từ \`getOrders\` trong URL. Đúng là \`/users/42/orders\`. Method GET đã đảm nhiệm phần "get".</details>
>
> 2. Bạn muốn API "kích hoạt user 42". URL nào hợp lý?
> <details><summary>Đáp án</summary>Nhiều lựa chọn: (a) \`POST /users/42/activations\`, (b) \`PUT /users/42/active\` body \`true\`, (c) \`PATCH /users/42\` body \`{"active": true}\`. Cách (c) là REST-est. Cách (a) phù hợp khi việc kích hoạt sinh ra sự kiện audit riêng.</details>

---

## 3. HTTP methods (CRUD mapping)

### 3.1 Bảng đầy đủ

| Method | Mục đích | Idempotent? | Safe? | Có body? | Status thành công |
|--------|----------|:-----------:|:-----:|:--------:|--------------------|
| **GET**    | Đọc resource | ✓ | ✓ | ✗ (theo chuẩn) | 200, 304 |
| **HEAD**   | Như GET nhưng không body | ✓ | ✓ | ✗ | 200, 304 |
| **POST**   | Tạo mới / non-idempotent action | ✗ | ✗ | ✓ | 201 (created), 200, 202 (accepted) |
| **PUT**    | Replace toàn bộ resource | ✓ | ✗ | ✓ | 200, 201 (nếu tạo mới), 204 |
| **PATCH**  | Update một phần | △ (tuỳ impl) | ✗ | ✓ | 200, 204 |
| **DELETE** | Xóa resource | ✓ | ✗ | △ | 200 (có body), 202 (async), 204 (no body) |
| **OPTIONS**| Hỏi server hỗ trợ method/header gì (CORS preflight) | ✓ | ✓ | ✗ | 200, 204 |

> 💡 **"Safe"** = không thay đổi state server. **"Idempotent"** = gọi N lần ≡ gọi 1 lần (về kết quả state cuối, không nói về response).

### 3.2 PUT vs PATCH — sự khác biệt rạch ròi

**PUT** thay thế toàn bộ resource. Body PUT phải chứa **TẤT CẢ** các field.

\`\`\`http
PUT /users/42
Content-Type: application/json

{ "name": "Alice", "email": "alice@x.io", "age": 30 }
\`\`\`

Nếu sau đó gửi:

\`\`\`http
PUT /users/42
Content-Type: application/json

{ "name": "Alice Updated" }
\`\`\`

→ Theo chuẩn, các field \`email\` và \`age\` bị **xoá** (vì PUT là replace). Đó là vì sao PUT idempotent: gọi đi gọi lại cùng body cho cùng kết quả.

**PATCH** update một phần. Body chỉ chứa field cần thay đổi:

\`\`\`http
PATCH /users/42
Content-Type: application/json

{ "email": "new@x.io" }
\`\`\`

→ Chỉ \`email\` đổi, \`name\` và \`age\` giữ nguyên.

> ❓ *"Tôi thấy nhiều API dùng PUT như PATCH (chỉ gửi field cần đổi). Có sao không?"*
>
> Về mặt giao thức HTTP — không vi phạm bắt buộc nào. Nhưng nó **phá vỡ semantics**: client không biết PUT có replace hay không, dẫn tới bug "vô tình xoá field". Đúng practice: nếu cho phép partial → dùng PATCH; nếu là replace → dùng PUT.

### 3.3 Ví dụ end-to-end: tạo user

\`\`\`http
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{ "name": "Bob", "email": "bob@x.io" }

────── server response ──────

HTTP/1.1 201 Created
Location: /users/43
Content-Type: application/json

{ "id": 43, "name": "Bob", "email": "bob@x.io", "created_at": "2026-05-26T07:00:00Z" }
\`\`\`

Lưu ý header **\`Location: /users/43\`** — chỉ tới resource vừa tạo. Đây là practice chuẩn của POST khi tạo mới.

> 📝 **Tóm tắt mục 3**
> - GET / HEAD: safe + idempotent. Không body.
> - POST: không idempotent. Tạo mới (201 + Location header).
> - PUT: idempotent. **Replace toàn bộ**.
> - PATCH: idempotent **theo thiết kế** (cùng patch cho cùng state ra cùng kết quả), nhưng implementation có thể vi phạm (vd \`{"counter": "+1"}\`).
> - DELETE: idempotent. 204 No Content (thường) hoặc 200 (kèm body).

---

## 4. Idempotency — vì sao quan trọng

**Idempotent** = gọi N lần (N ≥ 1) có cùng hiệu ứng lên state server với gọi 1 lần.

### 4.1 Ví dụ cụ thể

| Operation | Lần 1 | Lần 2 (lặp) | Idempotent? |
|-----------|-------|-------------|:------------:|
| \`GET /users/42\` | đọc user | đọc lại user (state ko đổi) | ✓ |
| \`PUT /users/42 {name: "Alice"}\` | set name=Alice | set name=Alice (ko đổi gì thêm) | ✓ |
| \`DELETE /users/42\` | xoá user 42 | đã xoá → 404 hoặc 204 (state vẫn là "đã xoá") | ✓ |
| \`POST /orders {item: X}\` | tạo đơn 99 | tạo thêm đơn 100 (2 đơn!) | ✗ |
| \`PATCH /counter {value: "+1"}\` | counter +1 | counter +1 nữa | ✗ (xấu) |

### 4.2 Vì sao idempotency cứu mạng?

**Kịch bản**: client gọi \`POST /payments\` (charge thẻ). Mạng chập chờn, response không về. Client retry → có nguy cơ **charge thẻ 2 lần**.

Giải pháp: **\`Idempotency-Key\` header** (xem mục 16). Client sinh UUID, gửi kèm. Server lưu (key → response). Retry cùng key → trả lại response cũ, **không tạo charge mới**.

> 💡 **Trực giác**: idempotent = "an toàn để retry". Bất kỳ method nào có khả năng retry tự động (timeout, network glitch) **phải** idempotent hoặc có cơ chế dedupe.

> ⚠ **Lỗi thường gặp**: dùng POST để update vì "POST có body" và "PUT thấy lạ". Hậu quả: retry tạo nhiều bản. Nếu là update, **luôn dùng PUT/PATCH**.

---

## 5. Status code — bảng tham chiếu và ≥10 ví dụ

### 5.1 Tổng quan 5 nhóm

| Nhóm | Ý nghĩa | Ví dụ tiêu biểu |
|------|---------|-----------------|
| **1xx** | Informational | 100 Continue, 101 Switching Protocols |
| **2xx** | Success | 200, 201, 202, 204 |
| **3xx** | Redirection | 301, 302, 304 |
| **4xx** | Client error | 400, 401, 403, 404, 405, 409, 422, 429 |
| **5xx** | Server error | 500, 502, 503, 504 |

### 5.2 Chi tiết các status hay dùng

| Code | Tên | Khi nào dùng |
|------|------|--------------|
| **200** | OK | Request thành công, có body trả về (GET / PUT / PATCH / DELETE có body) |
| **201** | Created | Tạo mới thành công. Kèm \`Location\` header trỏ tới resource mới |
| **202** | Accepted | Đã nhận request, xử lý **bất đồng bộ**. Trả về kèm link để check progress |
| **204** | No Content | Thành công, KHÔNG có body (DELETE thường dùng) |
| **301** | Moved Permanently | URL đổi vĩnh viễn, cache redirect |
| **302** | Found | URL đổi tạm thời, không cache |
| **304** | Not Modified | Cache còn tươi (kèm \`ETag\`/\`If-None-Match\`). Không body. |
| **400** | Bad Request | Request malformed (JSON sai cú pháp, thiếu field bắt buộc về cấu trúc) |
| **401** | Unauthorized | Thiếu hoặc sai authentication (token expired) |
| **403** | Forbidden | Đã auth, nhưng không có **permission** (role không cho phép) |
| **404** | Not Found | Resource không tồn tại |
| **405** | Method Not Allowed | Resource tồn tại, nhưng method không hỗ trợ (vd PATCH cho endpoint chỉ chấp nhận GET) |
| **409** | Conflict | Xung đột state (vd tạo user trùng email đã có, optimistic lock fail) |
| **410** | Gone | Resource từng tồn tại nhưng bị xoá vĩnh viễn |
| **415** | Unsupported Media Type | Body không phải Content-Type server hỗ trợ |
| **422** | Unprocessable Entity | JSON đúng cú pháp, nhưng **validation business fail** (email format sai, age âm) |
| **429** | Too Many Requests | Rate limit hit. Kèm \`Retry-After\` header |
| **500** | Internal Server Error | Server lỗi (panic, unhandled exception) |
| **502** | Bad Gateway | Proxy/gateway không nhận được response hợp lệ từ upstream |
| **503** | Service Unavailable | Server đang quá tải hoặc maintenance |
| **504** | Gateway Timeout | Proxy chờ upstream quá lâu |

### 5.3 ≥10 ví dụ tình huống (trả status nào?)

| # | Tình huống | Status đúng | Tại sao |
|---|-----------|:-----------:|---------|
| 1 | Tạo user mới thành công | **201** | POST + tạo mới ⇒ 201 + \`Location\` header |
| 2 | Lấy danh sách user (kể cả khi empty) | **200** | Có response body \`[]\`, không phải 404 |
| 3 | Lấy user id=999 không tồn tại | **404** | Resource không tồn tại |
| 4 | Client gửi JSON sai cú pháp \`{name:\` | **400** | Body malformed về syntax |
| 5 | Client gửi \`{"email": "not-an-email"}\` | **422** | JSON OK, nhưng validation business fail |
| 6 | Endpoint cần token, client không gửi | **401** | Unauthorized (auth missing/invalid) |
| 7 | User đã login nhưng không phải admin, gọi \`DELETE /users/42\` | **403** | Forbidden (role không đủ) |
| 8 | Tạo user trùng email | **409** | Conflict với state hiện tại |
| 9 | Gọi quá 1000 req/giờ | **429** | Rate limit + \`Retry-After: 3600\` |
| 10 | Server panic do bug | **500** | Lỗi server không liên quan client |
| 11 | DELETE thành công, không cần trả body | **204** | No Content |
| 12 | Upload bất đồng bộ, xử lý sẽ kéo dài | **202** | Accepted + \`Location\` để poll progress |
| 13 | Resource đã cache, client gửi \`If-None-Match: "abc"\`, hash trùng | **304** | Not Modified |
| 14 | Database connection pool exhausted | **503** | Service Unavailable + \`Retry-After\` |
| 15 | Endpoint chỉ chấp nhận POST, client gửi GET | **405** | Method Not Allowed + header \`Allow: POST\` |

> ⚠ **Lỗi thường gặp**:
> - Trả **404 cho "user không có permission"** → leak thông tin "resource tồn tại" hoặc gây nhầm lẫn. Đúng: **403**.
> - Trả **500 cho validation fail** → sai hoàn toàn. Đúng: **400** (syntax) hoặc **422** (semantic).
> - Trả **200 với \`{ "status": "error" }\`** thay vì status 4xx/5xx → phá vỡ uniform interface, client phải parse body mới biết success/fail.

> 🔁 **Tự kiểm tra mục 5**
>
> User gọi \`GET /users/42\`. Server thấy user 42 đã bị xoá tháng trước. Trả status nào?
> <details><summary>Đáp án</summary>**410 Gone** nếu muốn nói rõ "từng có, không còn nữa". **404 Not Found** cũng chấp nhận được. KHÔNG phải 204 (vì 204 nghĩa là thành công không body, dễ nhầm).</details>

---

## 6. Versioning — đặt version ở đâu?

API thay đổi theo thời gian. Cần cơ chế để client cũ vẫn chạy được khi schema thay đổi.

### 6.1 Ba chiến lược

| Cách | Ví dụ | Ưu | Nhược |
|------|-------|-----|-------|
| **URL path** | \`/v1/users\`, \`/v2/users\` | Dễ thấy, dễ test bằng curl, dễ proxy/route | URL không thực sự đại diện cho cùng resource giữa version (về lý thuyết) |
| **Custom header** | \`Accept: application/vnd.example.v1+json\` | Resource URL "thuần"; theo đúng REST principle | Khó test, dễ quên, client cần code thêm |
| **Query param** | \`/users?version=1\` | Đơn giản | Cache khó (URL hơi giống nhau), không clean |

### 6.2 Trade-off thực tế

- **GitHub, Stripe**: dùng **header**: \`Accept: application/vnd.github.v3+json\` (GitHub), \`Stripe-Version: 2024-04-10\` (Stripe).
- **Twitter, Twilio, đa số public API**: dùng **URL path** (\`/v1/...\`).
- Lý do URL path phổ biến hơn: dễ document, dễ test, dễ debug khi log.

> 💡 **Khuyến nghị thực dụng**: với API public mới → dùng \`/v1/...\` trong URL. Đơn giản, ai cũng hiểu.

### 6.3 Khi nào bump version?

Chỉ bump khi **breaking change**:

- Xoá field response.
- Đổi type field (\`string\` → \`int\`).
- Bắt buộc field mới trên request.
- Đổi semantics (cùng URL nhưng trả thứ khác).

**Không** bump cho:

- Thêm field response (additive). Client cũ ignore field mới.
- Thêm endpoint mới.
- Thêm query param optional.

---

## 7. Pagination — 3 cách + khi nào dùng

Trả về toàn bộ 1M user trong 1 response = thảm hoạ. Pagination là **bắt buộc** cho collection lớn.

### 7.1 Offset / Limit

\`\`\`
GET /users?offset=20&limit=10
\`\`\`

Server: \`SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20\`.

| Ưu | Nhược |
|-----|-------|
| Đơn giản, dễ jump page bất kỳ (\`?offset=10000&limit=10\`) | OFFSET lớn → DB phải scan qua N row rồi bỏ → chậm khủng khiếp ở \`offset=1000000\` |
| Tính total dễ (\`COUNT(*)\`) | Insert/delete giữa các page → record bị nhảy / lặp |

### 7.2 Cursor-based (token / opaque id)

\`\`\`
GET /users?cursor=eyJpZCI6MTAwfQ&limit=10
\`\`\`

\`cursor\` là token opaque (base64 encoded của \`{"last_id": 100}\`). Server: \`SELECT * FROM users WHERE id > 100 ORDER BY id LIMIT 10\`.

| Ưu | Nhược |
|-----|-------|
| Performance ổn định (index seek thay vì scan-skip) | Không jump page bất kỳ — chỉ next/prev |
| Stable: insert/delete không gây record nhảy | Không có "total count" rẻ |

→ Lựa chọn cho **infinite scroll**, **dataset lớn (>100k rows)**, **real-time feed**.

### 7.3 Page-based

\`\`\`
GET /users?page=2&size=10
\`\`\`

Tương đương \`offset = (page-1) * size\`. Cùng pros/cons như offset/limit, chỉ là ergonomic hơn cho user-facing UI.

### 7.4 Bảng chọn

| Use case | Recommend |
|----------|-----------|
| Admin dashboard, < 10k rows | Offset/limit hoặc page-based |
| Public feed, infinite scroll | **Cursor** |
| Mobile app, list bài viết kéo dài | **Cursor** |
| Báo cáo có pagination "đi đến trang 137" | Offset/limit (bắt buộc jump) |

### 7.5 Response format chuẩn

\`\`\`json
{
  "data": [ {"id": 1, ...}, {"id": 2, ...} ],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ",
    "prev_cursor": null,
    "has_more": true,
    "total": 12345          // optional, đắt khi tính
  }
}
\`\`\`

> ⚠ **Lỗi thường gặp**: tính \`total\` cho mỗi request bằng \`COUNT(*)\` trên bảng lớn → query nặng gấp 3 lần. Nếu UI không cần exact total, dùng \`has_more: true\` hoặc \`total_estimate\`.

### 7.6 Walk-through bằng số cụ thể

Giả sử bảng \`users\` có 1,000,000 record. So sánh thời gian truy vấn page thứ 50,000 (\`offset=499,990, limit=10\`):

| Cách | Query | Thời gian ước tính (Postgres, index trên id) |
|------|-------|----------------------------------------------|
| Offset | \`LIMIT 10 OFFSET 499990\` | ~500 ms (phải skim qua ~500k row) |
| Cursor (\`id > 499990\`) | \`WHERE id > 499990 LIMIT 10\` | ~1 ms (index seek) |

Sự khác biệt **500 lần**. Đó là vì sao cursor thắng cho dataset lớn.

---

## 8. Filtering & sorting

### 8.1 Query param convention

\`\`\`
GET /users?status=active&role=admin
GET /users?sort=-created_at,+name           # - = desc, + = asc
GET /products?price_min=10&price_max=100
GET /orders?created_at[gte]=2026-01-01&created_at[lt]=2026-06-01
\`\`\`

### 8.2 Sort syntax — 2 style phổ biến

| Style | Ví dụ | Note |
|-------|-------|------|
| Sign prefix | \`?sort=-created_at,name\` | Concise, dễ đọc. \`-\` = desc, không có prefix = asc |
| Order param riêng | \`?sort=created_at&order=desc\` | Cồng kềnh khi multi-sort |

### 8.3 Filter phức tạp

Khi cần OR / AND / range:

- **JSON in query**: \`?filter={"status":"active","price":{"$gte":10}}\` — encode trong URL (cẩn thận URL length limit ~2k-8k tuỳ server).
- **POST search endpoint**: \`POST /users/search\` với body JSON — phá REST một chút nhưng pragmatic cho query phức tạp.
- **GraphQL** — khi filter quá phức tạp, có lẽ REST không còn phù hợp.

> ❓ *"Vì sao không dùng GET với body? curl cũng support mà?"*
>
> RFC 9110 nói GET với body **không có semantic xác định** — proxy / cache có thể strip body. Một số HTTP client (Java's HttpURLConnection cũ) không gửi body trên GET. Tóm lại: **đừng dùng**. Nếu thực sự cần body, chuyển sang POST \`/<resource>/search\`.

---

## 9. Error response format — RFC 7807 Problem Details

API trả error inconsistent là cơn ác mộng cho client. RFC 7807 chuẩn hoá format:

\`\`\`http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Validation Failed",
  "status": 422,
  "detail": "One or more fields failed validation.",
  "instance": "/users",
  "errors": [
    { "field": "email", "code": "invalid_format", "message": "Not a valid email" },
    { "field": "age", "code": "out_of_range", "message": "Must be >= 0" }
  ],
  "trace_id": "req_abc123"
}
\`\`\`

### 9.1 Các field bắt buộc / khuyến nghị

| Field | Bắt buộc? | Ý nghĩa |
|-------|:---------:|---------|
| \`type\` | ✓ | URI định danh loại lỗi (link tới doc). Nếu không có doc, dùng \`"about:blank"\` |
| \`title\` | ✓ | Short human-readable summary |
| \`status\` | recommend | Trùng HTTP status code |
| \`detail\` | optional | Mô tả chi tiết, có thể tham chiếu request hiện tại |
| \`instance\` | optional | URI tham chiếu request cụ thể |
| Custom field | ✓ | \`errors\`, \`trace_id\`... — RFC cho phép thêm |

> 💡 **Trực giác**: RFC 7807 nói: "đừng tự sáng tác format error mỗi project". Client viết retry / log / display logic 1 lần dùng được cho mọi API tuân thủ.

### 9.2 Code mẫu Go (xem thêm \`solutions.go\`)

\`\`\`go
type Problem struct {
    Type     string  \`json:"type"\`
    Title    string  \`json:"title"\`
    Status   int     \`json:"status"\`
    Detail   string  \`json:"detail,omitempty"\`
    Instance string  \`json:"instance,omitempty"\`
    Errors   []FErr  \`json:"errors,omitempty"\`
    TraceID  string  \`json:"trace_id,omitempty"\`
}

func writeProblem(w http.ResponseWriter, p Problem) {
    w.Header().Set("Content-Type", "application/problem+json")
    w.WriteHeader(p.Status)
    _ = json.NewEncoder(w).Encode(p)
}
\`\`\`

---

## 10. HATEOAS — Hypermedia as the Engine of Application State

Ràng buộc cuối của REST (level 3 trong Richardson Maturity Model): response **chứa link** tới các action tiếp theo, client không cần hardcode URL.

\`\`\`json
{
  "id": 42,
  "name": "Alice",
  "_links": {
    "self":   { "href": "/users/42" },
    "orders": { "href": "/users/42/orders" },
    "delete": { "href": "/users/42", "method": "DELETE" }
  }
}
\`\`\`

### 10.1 Lý thuyết vs thực tế

- **Lý thuyết**: client chỉ cần biết URL entry-point, mọi link khác discover qua hypermedia. Đổi URL backend → client không vỡ.
- **Thực tế**: rất hiếm API tuân thủ đầy đủ HATEOAS. Lý do: client phổ biến là SPA / mobile, đã biết structure API rồi; link extra chỉ làm response cồng kềnh.

Pragmatic: thêm vài link "next page", "self" trong pagination — đủ HATEOAS-light, không sa đà.

> ⚠ **Anti-pattern**: nhồi 50 link \`_links\` cho mọi action vào mọi response → response nặng gấp 3, client lờ đi.

---

## 11. Content negotiation

Client báo cho server biết format mong muốn qua header \`Accept\`:

\`\`\`http
GET /users/42
Accept: application/json
→ JSON

GET /users/42
Accept: application/xml
→ XML

GET /users/42
Accept: text/csv
→ CSV (nếu server hỗ trợ)
\`\`\`

Server phải đọc \`Accept\`, pick format phù hợp, set \`Content-Type\` trong response.

### 11.1 Multi-accept

\`\`\`http
Accept: application/json, application/xml;q=0.5
\`\`\`

\`q=0.5\` = quality factor, JSON ưu tiên hơn XML. Server chọn JSON nếu hỗ trợ cả hai.

### 11.2 Khi không hỗ trợ format yêu cầu

→ Trả **406 Not Acceptable** (hiếm dùng), hoặc default về JSON.

---

## 12. CORS — Cross-Origin Resource Sharing

Browser **mặc định chặn** request JS từ origin A đến origin B. Server muốn cho phép → set CORS header.

### 12.1 Simple request

\`\`\`http
GET /api/users HTTP/1.1
Origin: https://app.example.com

──── response ────
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
\`\`\`

### 12.2 Preflight (cho non-simple request)

Trước khi gửi \`PUT /users/42\` với header \`Authorization\`, browser tự gửi **OPTIONS preflight**:

\`\`\`http
OPTIONS /users/42 HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization, Content-Type

──── response ────
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400
\`\`\`

Sau đó browser mới gửi PUT thật.

> ⚠ **Lỗi thường gặp**: set \`Access-Control-Allow-Origin: *\` đồng thời với \`Access-Control-Allow-Credentials: true\` → browser từ chối (theo spec). Khi cần credentials, phải chỉ định origin cụ thể.

---

## 13. Rate limiting

Bảo vệ server khỏi abuse, đảm bảo fair use.

### 13.1 Response headers chuẩn (de facto)

\`\`\`http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 873
X-RateLimit-Reset: 1716700000      # Unix timestamp khi quota refresh
\`\`\`

Khi vượt quota:

\`\`\`http
HTTP/1.1 429 Too Many Requests
Retry-After: 60                      # giây tới lần thử tiếp theo
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1716700060
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/rate-limited",
  "title": "Rate limit exceeded",
  "status": 429,
  "detail": "1000 requests per hour. Try again in 60 seconds."
}
\`\`\`

### 13.2 Thuật toán rate limit phổ biến

| Algo | Mô tả | Ưu / Nhược |
|------|-------|-----------|
| **Fixed window** | 1000 req/giờ, reset mỗi giờ | Đơn giản; burst đầu giờ |
| **Sliding window** | 1000 req trong 60 phút rolling | Mượt, đắt hơn để track |
| **Token bucket** | Bucket có N token, refill rate R/s | Cho phép burst lành mạnh |
| **Leaky bucket** | Request rớt vào bucket, leak ra với rate cố định | Giảm spike |

---

## 14. Caching

REST cacheable là 1 trong 6 ràng buộc Fielding. HTTP có sẵn cơ chế cache mạnh.

### 14.1 \`Cache-Control\`

\`\`\`http
HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
\`\`\`

- \`public\`: bất kỳ cache nào (browser, CDN) đều cache được.
- \`private\`: chỉ browser cache, CDN không.
- \`no-cache\`: phải revalidate trước khi dùng.
- \`no-store\`: không lưu bản nào.
- \`max-age=N\`: tươi trong N giây.

### 14.2 \`ETag\` + \`If-None-Match\` (conditional GET)

\`\`\`http
GET /users/42 HTTP/1.1
──── response 1 ────
HTTP/1.1 200 OK
ETag: "abc123"

──── client gửi lại sau 1h ────
GET /users/42 HTTP/1.1
If-None-Match: "abc123"

──── response 2 (nếu data không đổi) ────
HTTP/1.1 304 Not Modified
ETag: "abc123"
(không body — tiết kiệm bandwidth)
\`\`\`

### 14.3 \`Last-Modified\` + \`If-Modified-Since\`

\`\`\`http
──── response ────
HTTP/1.1 200 OK
Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT

──── request sau đó ────
GET /users/42 HTTP/1.1
If-Modified-Since: Wed, 21 Oct 2026 07:28:00 GMT

──── nếu chưa đổi ────
HTTP/1.1 304 Not Modified
\`\`\`

### 14.4 ETag vs Last-Modified

| Tiêu chí | ETag | Last-Modified |
|----------|------|---------------|
| Granularity | Bytes-level (hash content) | Second-level (timestamp) |
| Đắt? | Phải compute hash | Cheap (chỉ lookup mtime) |
| Chính xác | Cao | Có thể nhầm trong cùng giây |

→ ETag cho strong validation, Last-Modified cho weak validation.

---

## 15. Authentication

API public cần xác thực. 3 cơ chế phổ biến:

### 15.1 Bearer token

\`\`\`http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy
\`\`\`

Token = JWT, OAuth2 access token, hoặc opaque string. Đây là **chuẩn de facto** cho API hiện đại.

### 15.2 API key

\`\`\`http
Authorization: ApiKey k_live_abc123
# hoặc
X-API-Key: k_live_abc123
\`\`\`

Đơn giản hơn JWT, không có expiry built-in. Phổ biến cho B2B / server-to-server.

### 15.3 Basic Auth

\`\`\`http
Authorization: Basic dXNlcjpwYXNz   # base64("user:pass")
\`\`\`

**Chỉ dùng qua HTTPS!** Vì base64 không phải mã hoá — ai sniff được header là đọc được password.

> ⚠ **Anti-pattern**: bỏ token vào URL \`?token=xxx\`. URL bị log bởi proxy, server access log, browser history. Token leak.

---

## 16. \`Idempotency-Key\` header

Pattern Stripe phổ biến hoá: client gửi UUID, server cache (key → response) trong 24h. Retry cùng key → trả lại response cũ.

### 16.1 Workflow

\`\`\`
1. Client: POST /payments
   Idempotency-Key: 8400ec70-1c5e-4b8a
   Body: { "amount": 100, "card": "tok_xxx" }

2. Server:
   - Tra cache với key 8400ec70-...
   - Nếu thấy → trả response cũ ngay (không charge lại)
   - Nếu không → process, lưu (key, response, status) → trả response

3. Client retry vì timeout:
   POST /payments
   Idempotency-Key: 8400ec70-1c5e-4b8a    ← cùng key
   → Server trả response cũ, KHÔNG charge lần 2
\`\`\`

### 16.2 Edge case

- **Cùng key, body khác**: server nên reject với 422 (key đã dùng cho request khác).
- **Race condition**: 2 request cùng key gửi gần như đồng thời → cần lock (Redis SETNX, DB unique constraint).

Xem \`solutions.go\` để có middleware đầy đủ.

---

## 17. Bulk operations

Khi client cần tạo / update 1000 user, gọi 1000 POST = chậm + tốn. Có 2 cách:

### 17.1 Bulk endpoint

\`\`\`http
POST /users/bulk
Content-Type: application/json

[
  { "name": "Alice", "email": "alice@x.io" },
  { "name": "Bob",   "email": "bob@x.io"   },
  ...
]
\`\`\`

### 17.2 Trade-off: atomic vs partial

| Mode | Behavior | Khi nào dùng |
|------|----------|--------------|
| **All-or-nothing (atomic)** | 1 fail → cả batch fail, rollback | Khi business cần consistency (transfer money) |
| **Partial success** | Trả 200/207 với array kết quả từng item | Khi import data lớn, item lỗi chỉ skip |

Status code phù hợp cho partial: **207 Multi-Status** (WebDAV nhưng được tái dùng).

\`\`\`json
{
  "results": [
    { "index": 0, "status": 201, "id": 42 },
    { "index": 1, "status": 422, "error": "Email exists" },
    { "index": 2, "status": 201, "id": 43 }
  ]
}
\`\`\`

---

## 18. Versioning deprecation — \`Sunset\` header

Khi deprecate API cũ, RFC 8594 đề xuất:

\`\`\`http
HTTP/1.1 200 OK
Sunset: Wed, 31 Dec 2026 23:59:59 GMT
Deprecation: Mon, 01 Jul 2026 00:00:00 GMT
Link: <https://api.example.com/v2/users>; rel="successor-version"
\`\`\`

Client tự động cảnh báo dev khi gặp header này.

---

## 19. OpenAPI / Swagger

OpenAPI Spec (OAS, trước đây là Swagger) là format YAML/JSON mô tả API:

\`\`\`yaml
openapi: 3.0.0
info:
  title: Example API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: integer }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
\`\`\`

### 19.1 Lợi ích

- **Single source of truth** cho dev + tester + client team.
- Sinh **client SDK** tự động (Go, Java, Python, TS) qua \`openapi-generator\`.
- Sinh **interactive doc** (Swagger UI, Redoc).
- Sinh **mock server** để frontend dev song song.
- Validate request/response trong test.

### 19.2 Tooling Go phổ biến

- \`swaggo/swag\` — sinh OpenAPI từ comment Go.
- \`oapi-codegen\` — sinh server stub + client từ OpenAPI spec.
- \`kin-openapi\` — runtime validate request theo spec.

---

## 20. Common anti-patterns

| # | Anti-pattern | Tại sao xấu | Fix |
|---|--------------|-------------|-----|
| 1 | \`GET /api/deleteUser?id=42\` | GET có side effect, có thể được prefetch / crawler trigger | \`DELETE /users/42\` |
| 2 | \`POST\` cho mọi action | Bỏ phí sức mạnh của HTTP method | Map đúng CRUD: GET/PUT/PATCH/DELETE |
| 3 | DELETE trả 200 + body \`{}\` rỗng | Lãng phí + sai semantic | \`204 No Content\` |
| 4 | Trả \`200 { "error": "..." }\` cho lỗi | Phá uniform interface, client phải parse body | Dùng đúng 4xx/5xx |
| 5 | URL chứa động từ: \`/users/42/getOrders\` | Trùng lặp với HTTP method | \`GET /users/42/orders\` |
| 6 | Mỗi response 1 format error khác nhau | Client viết handler N lần | RFC 7807 |
| 7 | Pagination chỉ có \`total\` không có \`next\` | Client phải tự tính | Trả \`has_more\` / \`next_cursor\` |
| 8 | Auth qua \`?token=xxx\` URL | Token leak vào log | \`Authorization: Bearer xxx\` |
| 9 | Field naming mix \`camelCase\` và \`snake_case\` | Phá nhất quán | Chọn 1 style, giữ xuyên suốt |
| 10 | Sort theo client-side (trả hết về rồi sort JS) | Tốn bandwidth + CPU client | Sort ở server qua query param |
| 11 | API trả ngày khác timezone mỗi endpoint | Bug giờ | Luôn ISO-8601 UTC: \`2026-05-26T07:00:00Z\` |
| 12 | \`PATCH\` mà ghi đè toàn bộ resource | Vi phạm semantic PATCH | Dùng PUT, hoặc fix PATCH chỉ update field gửi lên |
| 13 | Trả 404 khi thiếu permission | Leak / gây nhầm | 403 Forbidden |
| 14 | Trả 500 cho validation fail | Sai nhóm hoàn toàn | 400 (syntax) / 422 (semantic) |
| 15 | Bỏ trống \`Content-Type\` response | Client phải đoán | Set \`application/json\` (hoặc \`application/problem+json\`) |
| 16 | Phơi DB id incremental (\`/users/1\`, \`/users/2\`) | Enumerate / scrape dễ | Dùng UUID hoặc ID có signature |
| 17 | Trả \`null\` lung tung thay vì omit field | Client phải check null khắp nơi | \`omitempty\` cho field optional |
| 18 | Bỏ qua \`OPTIONS\` preflight CORS | Browser từ chối silently | Handle OPTIONS tử tế |
| 19 | Không bao giờ deprecate API cũ | Maintenance burden vô tận | Sunset header + comm plan |
| 20 | Không document → trở thành thư viện huyền thoại "hỏi senior" | Onboarding khó, bugs do hiểu nhầm | OpenAPI + Swagger UI |

---

## Bài tập

### BT1 — Design API endpoint cho social media

Cho domain: \`Post\`, \`Comment\`, \`Like\`, \`User\`. Thiết kế URL + method + status code cho:

a) Lấy danh sách 20 post mới nhất.  
b) Tạo post mới.  
c) Lấy chi tiết post id=42 kèm danh sách comment.  
d) Comment vào post 42.  
e) Like post 42.  
f) Unlike post 42.  
g) Lấy danh sách like của post 42 (ai đã like).  
h) Lấy danh sách post của user \`alice\`.  
i) Xoá comment id=99.  
j) Edit nội dung post 42.

### BT2 — Choose status code

Cho 5 scenario, chọn HTTP status:

1. Body JSON sai cú pháp.
2. Header \`Authorization\` không có / token hết hạn.
3. Đã login, nhưng role \`viewer\` cố \`DELETE /admin/users/42\`.
4. POST \`/users\` với email đã tồn tại trong DB.
5. Client đã đạt giới hạn 1000 req/giờ.

### BT3 — Design pagination cho 1M item

Bạn build API "feed" cho mạng xã hội. Bảng \`posts\` có 1,000,000 record, mỗi user kéo dọc thấy ~20 post mỗi lần. Chọn offset hay cursor? Giải thích kèm tính toán.

### BT4 — Implement Idempotency-Key middleware Go

Viết middleware \`net/http\` xử lý:
- Đọc header \`Idempotency-Key\`.
- Nếu thấy key trong cache → trả response cũ.
- Nếu không → cho handler chạy, lưu response, return.
- Cache TTL 24h, dùng \`sync.Map\` (simplicity).

### BT5 — RFC 7807 error format + Go handler

Viết struct \`Problem\` + helper \`writeProblem(w, p)\` + 1 handler \`POST /users\` validate \`email\` và \`age\`, trả về Problem nếu fail.

### BT6 — Fix 5 anti-pattern URL

Sửa các URL/method sau cho đúng REST:

a) \`GET /api/createUser?name=Bob\`  
b) \`POST /api/deletePost?id=42\`  
c) \`POST /api/getUserOrders\` body \`{"user_id": 42}\`  
d) \`GET /api/users/42/setActive\`  
e) \`POST /api/searchProducts?token=abc\` (token trong URL)

---

## Lời giải chi tiết

### Giải BT1

| Mục đích | Method + URL | Status thành công |
|----------|--------------|--------------------|
| a) Lấy 20 post mới nhất | \`GET /posts?sort=-created_at&limit=20\` | 200 |
| b) Tạo post mới | \`POST /posts\` body \`{title, body}\` | 201 + \`Location: /posts/<id>\` |
| c) Chi tiết post 42 + comments | \`GET /posts/42?include=comments\` HOẶC tách: \`GET /posts/42\` rồi \`GET /posts/42/comments\` | 200 |
| d) Comment vào post 42 | \`POST /posts/42/comments\` body \`{body}\` | 201 + \`Location: /posts/42/comments/<id>\` |
| e) Like post 42 | \`PUT /posts/42/likes/me\` (idempotent) HOẶC \`POST /posts/42/likes\` | 204 (PUT) / 201 (POST) |
| f) Unlike post 42 | \`DELETE /posts/42/likes/me\` | 204 |
| g) Danh sách like | \`GET /posts/42/likes?limit=20\` | 200 |
| h) Post của user \`alice\` | \`GET /users/alice/posts?limit=20\` HOẶC \`GET /posts?author=alice\` | 200 |
| i) Xoá comment 99 | \`DELETE /comments/99\` (flat) HOẶC \`DELETE /posts/42/comments/99\` | 204 |
| j) Edit nội dung post 42 | \`PATCH /posts/42\` body \`{body: "..."}\` | 200 |

**Lưu ý cách (e)**: dùng PUT cho like vì like-state có 2 giá trị (liked / not). Gửi PUT 5 lần = vẫn là "liked" (idempotent). Nếu dùng POST, mỗi lần gọi sẽ tạo 1 row mới → bug duplicate.

### Giải BT2

| Scenario | Status | Lý do |
|----------|:------:|------|
| 1. JSON sai cú pháp | **400** | Body malformed về syntax — \`400 Bad Request\` |
| 2. Thiếu / hết hạn token | **401** | Unauthorized — auth chưa được thiết lập đúng |
| 3. Role không cho phép | **403** | Forbidden — đã auth nhưng thiếu permission |
| 4. Email trùng | **409** | Conflict — xung đột với state hiện tại của resource collection |
| 5. Rate limit hit | **429** | Too Many Requests + \`Retry-After\` |

### Giải BT3

**Chọn cursor-based.**

Tính toán: với offset/limit, trang thứ 50,000 (\`offset=999,980\`) → DB phải scan qua ~1M row rồi bỏ đi đầu tiên. Postgres trên SSD ~0.5–2 giây cho 1M row scan. Tệ.

Cursor: \`WHERE id > 999980 ORDER BY id LIMIT 20\` → index seek B-tree, **$O(\\log n)$** ~ vài ms.

Bonus: trong social feed, **không ai jump tới "trang 50,000"** — luôn là infinite scroll dọc. Cursor phù hợp hoàn toàn.

Trade-off chấp nhận: không có "total count" rẻ. Nhưng UI social feed không hiển thị "tổng 1,234,567 post" — chỉ cần biết "còn nữa không".

### Giải BT4

Xem \`solutions.go\` cho code đầy đủ. Idea:

\`\`\`go
type idempCache struct {
    m sync.Map // key -> *cachedResponse
}

type cachedResponse struct {
    status  int
    body    []byte
    headers http.Header
}

func IdempotencyMiddleware(next http.Handler) http.Handler {
    cache := &idempCache{}
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        key := r.Header.Get("Idempotency-Key")
        if key == "" || (r.Method != "POST" && r.Method != "PUT" && r.Method != "PATCH") {
            next.ServeHTTP(w, r)
            return
        }
        if cached, ok := cache.m.Load(key); ok {
            cr := cached.(*cachedResponse)
            for k, vs := range cr.headers {
                for _, v := range vs {
                    w.Header().Add(k, v)
                }
            }
            w.WriteHeader(cr.status)
            w.Write(cr.body)
            return
        }
        // capture response
        rec := &responseRecorder{ResponseWriter: w, headers: http.Header{}}
        next.ServeHTTP(rec, r)
        cache.m.Store(key, &cachedResponse{
            status: rec.status, body: rec.body.Bytes(), headers: rec.headers,
        })
    })
}
\`\`\`

Cần \`responseRecorder\` để capture status/body. Production sẽ dùng Redis cho cache với TTL 24h thay sync.Map.

### Giải BT5

\`\`\`go
type Problem struct {
    Type     string       \`json:"type"\`
    Title    string       \`json:"title"\`
    Status   int          \`json:"status"\`
    Detail   string       \`json:"detail,omitempty"\`
    Instance string       \`json:"instance,omitempty"\`
    Errors   []FieldError \`json:"errors,omitempty"\`
}

type FieldError struct {
    Field   string \`json:"field"\`
    Code    string \`json:"code"\`
    Message string \`json:"message"\`
}

func writeProblem(w http.ResponseWriter, p Problem) {
    w.Header().Set("Content-Type", "application/problem+json")
    w.WriteHeader(p.Status)
    _ = json.NewEncoder(w).Encode(p)
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
    var in struct {
        Email string \`json:"email"\`
        Age   int    \`json:"age"\`
    }
    if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
        writeProblem(w, Problem{
            Type: "https://api.example.com/problems/bad-json",
            Title: "Bad Request", Status: 400, Detail: err.Error(),
        })
        return
    }
    var errs []FieldError
    if !strings.Contains(in.Email, "@") {
        errs = append(errs, FieldError{Field: "email", Code: "invalid_format", Message: "Not a valid email"})
    }
    if in.Age < 0 {
        errs = append(errs, FieldError{Field: "age", Code: "out_of_range", Message: "Must be >= 0"})
    }
    if len(errs) > 0 {
        writeProblem(w, Problem{
            Type: "https://api.example.com/problems/validation",
            Title: "Validation Failed", Status: 422, Errors: errs,
            Instance: r.URL.Path,
        })
        return
    }
    // ... create user
    w.Header().Set("Location", "/users/123")
    w.WriteHeader(201)
}
\`\`\`

### Giải BT6

| Sai | Đúng |
|-----|------|
| a) \`GET /api/createUser?name=Bob\` | \`POST /users\` body \`{"name":"Bob"}\` |
| b) \`POST /api/deletePost?id=42\` | \`DELETE /posts/42\` |
| c) \`POST /api/getUserOrders\` body \`{"user_id": 42}\` | \`GET /users/42/orders\` |
| d) \`GET /api/users/42/setActive\` | \`PATCH /users/42\` body \`{"active": true}\` (hoặc \`PUT /users/42/active\`) |
| e) \`POST /api/searchProducts?token=abc\` | \`POST /products/search\` + \`Authorization: Bearer abc\` header |

---

## Code & Minh hoạ

- 📄 Code Go đầy đủ: [\`solutions.go\`](./solutions.go) — REST handler CRUD users, pagination, filter, RFC 7807 errors, Idempotency middleware.
- 🎨 Visualization: [\`visualization.html\`](./visualization.html) — 3 module tương tác (Method picker, Pagination compare, Status code quiz).

---

## Bài tiếp theo

➡ [Lesson 44 — Routing Frameworks (chi/gin/echo)](../lesson-44-routing-frameworks/) — đi sâu vào framework giúp viết REST API gọn hơn, kèm middleware chuẩn.

## Tham khảo

- Roy Fielding, *Architectural Styles and the Design of Network-based Software Architectures*, 2000.
- RFC 9110 — HTTP Semantics.
- RFC 7807 — Problem Details for HTTP APIs.
- RFC 5789 — PATCH Method for HTTP.
- RFC 8594 — Sunset HTTP Header Field.
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines).
- [Google API Design Guide](https://cloud.google.com/apis/design).
- [Stripe API docs](https://stripe.com/docs/api) — tham chiếu thực dụng.
`;
