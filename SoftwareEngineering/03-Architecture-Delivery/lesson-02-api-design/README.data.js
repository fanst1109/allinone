// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/03-Architecture-Delivery/lesson-02-api-design/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Thiết kế API (REST, gRPC, GraphQL)

## Mục tiêu

- Hiểu **API là gì** và vì sao nó là một **hợp đồng (contract)** giữa các phần của hệ thống — và vì sao thiết kế API tốt lại quan trọng (rất khó đổi sau khi đã có client phụ thuộc).
- Nắm **REST**: tài nguyên (resource), các HTTP verb (\`GET\`/\`POST\`/\`PUT\`/\`PATCH\`/\`DELETE\`), status code, và nguyên tắc đặt URL — phân biệt endpoint tốt/xấu.
- Hiểu **gRPC**: mô hình RPC + protobuf, và khi nào nên dùng (giao tiếp nội bộ, hiệu năng cao, streaming).
- Hiểu **GraphQL**: client tự chọn field, cách nó giải quyết over-fetching / under-fetching, và các đánh đổi.
- So sánh ba phong cách và biết **khi nào dùng cái nào**.
- Nắm **versioning & tương thích ngược (backward compatibility)**: vì sao cần, các cách làm, và phân biệt thay đổi *phá vỡ* (breaking) với *không phá vỡ* (non-breaking).

## Kiến thức tiền đề

- [Lesson 01 — Kiến trúc phần mềm](../lesson-01-software-architecture/): hiểu hệ thống được chia thành các thành phần/dịch vụ giao tiếp với nhau — API chính là *bề mặt giao tiếp* đó.
- [Networking — HTTP](../../../Networking/index.html): nắm cơ bản về HTTP (request/response, method, header, status code, body). API REST và GraphQL chạy trên HTTP; gRPC chạy trên HTTP/2.

> 💡 **Vì sao học thiết kế API trong tier "Kiến trúc & vận hành"?** Ở [Lesson 01](../lesson-01-software-architecture/) ta chia hệ thống thành các thành phần. Nhưng các thành phần đó *nói chuyện với nhau bằng gì*? Đó là API. API là "đường biên" giữa các đội, giữa client và server, giữa các microservice. Một biên giới thiết kế cẩu thả sẽ khiến mọi thứ phía sau khó thay đổi — nên thiết kế API tốt là một quyết định kiến trúc, không chỉ là chi tiết kỹ thuật.

---

## 1. API là gì — và vì sao nó là một "hợp đồng"

💡 **Trực giác.** Hãy hình dung ổ cắm điện trên tường. Bạn không cần biết nhà máy điện hoạt động ra sao; chỉ cần biết "chấu cắm hình này, 220V, 50Hz" là cắm được mọi thiết bị. **API (Application Programming Interface)** chính là cái "ổ cắm" đó cho phần mềm: nó định nghĩa *cách gọi* một dịch vụ (gửi gì, nhận gì) mà người gọi **không cần biết** bên trong dịch vụ làm thế nào.

API là một **hợp đồng (contract)** vì cả hai phía cam kết tuân theo nó:

- **Bên cung cấp (server/provider)** hứa: "nếu bạn gửi đúng định dạng này, tôi trả về đúng định dạng kia."
- **Bên sử dụng (client/consumer)** dựa vào lời hứa đó để viết code.

**Ví dụ một hợp đồng cụ thể** — API lấy thông tin một người dùng:

\`\`\`
Yêu cầu (request):
GET /users/42

Phản hồi (response):
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "name": "Linh Nguyen",
  "email": "linh@example.com",
  "createdAt": "2024-03-01T09:00:00Z"
}
\`\`\`

Client viết code dựa trên hợp đồng này: nó *biết* sẽ có field \`id\`, \`name\`, \`email\`. Nếu mai server bỏ field \`email\` đi, mọi client đang đọc \`email\` sẽ vỡ.

> ❓ **"Tại sao nói API rất khó đổi sau khi đã có client?"** Vì bạn **không kiểm soát được client**. Một khi app di động đã phát hành, hàng nghìn máy người dùng đang chạy bản cũ; một đội khác đã tích hợp API của bạn vào hệ thống của họ. Bạn đổi hợp đồng → code của *họ* vỡ, mà bạn không thể bắt mọi người cập nhật ngay. Đây là khác biệt cốt lõi so với sửa code nội bộ: sửa hàm private trong module của mình thì chỉ mình chịu; đổi API public thì cả thế giới phụ thuộc vào nó chịu.

> ⚠ **Lỗi thường gặp.** Coi API là "cứ trả ra cái gì code đang có". Đúng ra phải thiết kế API theo *nhu cầu của client* và *ổn định lâu dài*, tách rời khỏi cấu trúc database hay biến nội bộ. Lộ thẳng cột database ra ngoài → sau này muốn đổi schema database là kẹt vì client đã phụ thuộc vào tên cột.

> 🔁 **Dừng lại tự kiểm tra.** Một API trả về \`{ "user_full_name": "Linh" }\`. Sáu tháng sau, lập trình viên muốn đổi tên field thành \`name\` cho gọn. Có nên làm trực tiếp không?
> <details><summary>Đáp án</summary>Không nên đổi trực tiếp — đó là <b>breaking change</b>. Mọi client đang đọc <code>user_full_name</code> sẽ nhận <code>undefined</code> và vỡ. Cách an toàn: <i>thêm</i> field <code>name</code> mới, giữ <code>user_full_name</code> song song (đánh dấu deprecated), thông báo cho client chuyển dần, rồi mới bỏ field cũ ở một version sau. Xem mục 6.</details>

📝 **Tóm tắt mục 1.** API là hợp đồng giữa bên cung cấp và bên sử dụng: định nghĩa gửi gì / nhận gì, che giấu chi tiết bên trong. Vì client phụ thuộc vào hợp đồng và bạn không kiểm soát được client, **đổi API là tốn kém và rủi ro** — nên thiết kế đúng từ đầu và lên kế hoạch tiến hóa cẩn thận.

---

## 2. REST — tài nguyên trên HTTP

💡 **Trực giác.** REST nhìn mọi thứ trong hệ thống như những **tài nguyên (resource)** — danh từ — có địa chỉ riêng (URL). Còn *động từ* (HTTP verb) cho biết bạn muốn *làm gì* với tài nguyên đó. Giống như trong thư viện: mỗi cuốn sách là một tài nguyên có mã riêng, còn các hành động "mượn / trả / xem / sửa thông tin" là các động từ tác động lên nó.

### 2.1 Tài nguyên và HTTP verb

URL trỏ tới **danh từ** (tài nguyên), không phải động từ:

| Verb | Ý nghĩa | Ví dụ | Idempotent? |
|------|---------|-------|:-----------:|
| \`GET\` | Đọc tài nguyên | \`GET /products/7\` | ✓ |
| \`POST\` | Tạo mới (server sinh id) | \`POST /products\` | ✗ |
| \`PUT\` | Thay thế toàn bộ tài nguyên | \`PUT /products/7\` | ✓ |
| \`PATCH\` | Sửa một phần tài nguyên | \`PATCH /products/7\` | ✗* |
| \`DELETE\` | Xóa tài nguyên | \`DELETE /products/7\` | ✓ |

*Idempotent = gọi nhiều lần cho kết quả giống gọi một lần (xem mục 7). \`PATCH\` *có thể* idempotent tùy cách hiện thực.

**Ví dụ tạo mới — \`POST\`:**

\`\`\`
POST /products
Content-Type: application/json

{ "name": "Bàn phím cơ", "price": 1200000 }

→ HTTP/1.1 201 Created
  Location: /products/7

{ "id": 7, "name": "Bàn phím cơ", "price": 1200000 }
\`\`\`

**Ví dụ sửa một phần — \`PATCH\`** (chỉ đổi giá, không gửi lại cả object):

\`\`\`
PATCH /products/7
Content-Type: application/json

{ "price": 990000 }

→ HTTP/1.1 200 OK
{ "id": 7, "name": "Bàn phím cơ", "price": 990000 }
\`\`\`

So với \`PUT /products/7\` thì phải gửi **toàn bộ** object (kể cả \`name\`), nếu thiếu \`name\` thì có thể bị xóa mất.

### 2.2 Status code — server nói gì với client

| Nhóm | Nghĩa | Ví dụ thường gặp |
|------|-------|------------------|
| **2xx** | Thành công | \`200 OK\`, \`201 Created\`, \`204 No Content\` |
| **3xx** | Chuyển hướng | \`301 Moved Permanently\`, \`304 Not Modified\` |
| **4xx** | Lỗi do client | \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`, \`409 Conflict\`, \`422 Unprocessable Entity\` |
| **5xx** | Lỗi do server | \`500 Internal Server Error\`, \`503 Service Unavailable\` |

**Ví dụ lỗi 404 (không tìm thấy):**

\`\`\`
GET /products/9999

→ HTTP/1.1 404 Not Found
{ "error": "product_not_found", "message": "Không tìm thấy sản phẩm id=9999" }
\`\`\`

**Ví dụ lỗi 400 (dữ liệu sai):**

\`\`\`
POST /products
{ "name": "", "price": -5 }

→ HTTP/1.1 400 Bad Request
{
  "error": "validation_failed",
  "details": [
    { "field": "name",  "msg": "không được rỗng" },
    { "field": "price", "msg": "phải > 0" }
  ]
}
\`\`\`

### 2.3 Nguyên tắc đặt URL — tốt vs xấu

| Tình huống | ❌ Xấu | ✓ Tốt | Vì sao |
|------------|--------|-------|--------|
| Lấy 1 user | \`GET /getUser?id=42\` | \`GET /users/42\` | Động từ nằm ở HTTP method, không nhét vào URL |
| Tạo user | \`POST /createUser\` | \`POST /users\` | Đã có verb \`POST\`; URL chỉ là danh từ |
| Xóa user | \`GET /deleteUser?id=42\` | \`DELETE /users/42\` | Không dùng \`GET\` để thay đổi dữ liệu |
| Đơn của 1 user | \`GET /getOrdersByUser?u=42\` | \`GET /users/42/orders\` | Quan hệ thể hiện qua phân cấp URL |
| Danh sách (số nhiều) | \`GET /productList\` | \`GET /products\` | Dùng danh từ số nhiều nhất quán |

**Quy tắc rút gọn:** danh từ số nhiều cho tập hợp (\`/products\`), thêm id cho phần tử (\`/products/7\`), lồng cho quan hệ (\`/users/42/orders\`), và **để động từ cho HTTP method** — đừng nhét \`get\`/\`create\`/\`delete\` vào URL.

> ❓ **"Lọc, sắp xếp, phân trang thì để đâu nếu URL chỉ là danh từ?"** Dùng **query string** cho các tham số đọc dữ liệu:
> \`\`\`
> GET /products?category=keyboard&minPrice=500000&sort=price&page=2&limit=20
> \`\`\`
> URL vẫn là tài nguyên \`/products\`; các tiêu chí lọc/sắp xếp/trang nằm sau dấu \`?\`. Đừng tạo endpoint riêng kiểu \`/productsSortedByPrice\`.

> ⚠ **Lỗi thường gặp.** Dùng \`GET\` để gây thay đổi (vd \`GET /deleteUser?id=42\`). \`GET\` phải **an toàn (safe)** — chỉ đọc, không đổi gì. Trình duyệt, proxy, crawler có thể tự gọi lại \`GET\` bất cứ lúc nào; nếu \`GET\` xóa dữ liệu thì một con bot crawl link là đủ xóa sạch.

> 🔁 **Dừng lại tự kiểm tra.** Thiết kế endpoint để "thêm một bình luận vào bài viết số 15". Verb gì, URL gì, trả status nào khi thành công?
> <details><summary>Đáp án</summary><code>POST /posts/15/comments</code> với body chứa nội dung bình luận. Thành công trả <code>201 Created</code> kèm header <code>Location</code> trỏ tới comment vừa tạo (vd <code>/posts/15/comments/88</code>). Dùng <code>POST</code> vì đang tạo tài nguyên mới; URL lồng <code>comments</code> dưới <code>posts/15</code> thể hiện quan hệ "bình luận thuộc bài viết".</details>

📝 **Tóm tắt mục 2.** REST = tài nguyên (danh từ, có URL) + HTTP verb (động từ). Đặt URL bằng danh từ số nhiều, lồng để thể hiện quan hệ, để verb cho HTTP method. Dùng status code đúng nhóm (2xx/4xx/5xx) và đưa lọc/trang vào query string. \`GET\` luôn chỉ đọc.

---

## 3. gRPC — RPC + protobuf

💡 **Trực giác.** Thay vì nghĩ "tài nguyên + URL" như REST, **gRPC** cho bạn gọi một hàm trên máy khác *như thể gọi hàm tại chỗ*: \`userService.GetUser(id: 42)\`. Đây là mô hình **RPC (Remote Procedure Call)** — gọi thủ tục từ xa. Bạn không nghĩ về URL và verb, bạn nghĩ về *phương thức và tham số*.

### 3.1 Hợp đồng viết bằng protobuf

gRPC định nghĩa hợp đồng trong file \`.proto\` (Protocol Buffers) — vừa là tài liệu, vừa dùng để **sinh code** cho cả client lẫn server:

\`\`\`protobuf
syntax = "proto3";

message GetUserRequest {
  int32 id = 1;
}

message User {
  int32  id    = 1;
  string name  = 2;
  string email = 3;
}

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
}
\`\`\`

Từ file này, công cụ \`protoc\` sinh ra sẵn struct và hàm cho Go, Java, Python... Client gọi \`client.GetUser(ctx, &GetUserRequest{Id: 42})\` và nhận về \`*User\` đã được kiểu hóa — không phải tự parse JSON.

**Khác biệt cốt lõi với REST:** dữ liệu truyền đi dưới dạng **nhị phân (binary)** đã nén theo schema, không phải JSON dạng text. Một \`User\` nhỏ hơn nhiều so với JSON tương đương, và parse nhanh hơn vì không cần đọc tên field (các số \`= 1\`, \`= 2\` là "field tag" thay cho tên).

### 3.2 Streaming

gRPC chạy trên **HTTP/2**, hỗ trợ **streaming** — gửi một luồng nhiều message qua một kết nối, theo 4 kiểu:

- **Unary** (1 request → 1 response): giống REST.
- **Server streaming** (1 → nhiều): vd theo dõi giá cổ phiếu, server đẩy liên tục.
- **Client streaming** (nhiều → 1): vd upload nhiều mẩu dữ liệu rồi nhận 1 kết quả.
- **Bidirectional** (nhiều ↔ nhiều): vd chat thời gian thực.

\`\`\`protobuf
service PriceService {
  // server đẩy liên tục giá mới mỗi khi có thay đổi
  rpc WatchPrice(WatchRequest) returns (stream PriceUpdate);
}
\`\`\`

### 3.3 Khi nào dùng gRPC

- **Giao tiếp nội bộ giữa các microservice** — nơi cả hai phía do bạn kiểm soát, ưu tiên hiệu năng và kiểu chặt chẽ.
- **Hiệu năng cao, độ trễ thấp** — payload binary nhỏ, parse nhanh, dùng HTTP/2 (ghép nhiều luồng trên một kết nối).
- **Cần streaming** — luồng dữ liệu hai chiều liên tục.

> ❓ **"gRPC nhanh và chặt thế, sao không dùng cho mọi thứ kể cả web frontend?"** Vì trình duyệt **không gọi gRPC trực tiếp** được dễ dàng (cần gRPC-Web + proxy), payload binary **khó debug bằng mắt** (không mở được bằng trình duyệt như JSON), và public API cho bên thứ ba thì REST/JSON dễ tiếp cận hơn nhiều. gRPC tỏa sáng *bên trong* hệ thống, REST tỏa sáng ở *biên giới công khai*.

> ⚠ **Lỗi thường gặp.** Đổi field tag trong \`.proto\` (vd đổi \`email = 3\` thành \`email = 4\`). Field tag là *định danh nhị phân* — đổi nó là breaking change ngầm: client cũ giải mã số 3 ra một field khác. Quy tắc: **không bao giờ tái sử dụng hoặc đổi số tag** đã phát hành; chỉ thêm tag mới.

> 🔁 **Dừng lại tự kiểm tra.** Bạn xây hệ thống: một app di động gọi vào "API Gateway", gateway này lại gọi 5 service backend để tổng hợp dữ liệu. Nên dùng REST hay gRPC ở (a) giữa app và gateway, (b) giữa gateway và 5 service?
> <details><summary>Đáp án</summary>(a) <b>App ↔ gateway: REST/JSON</b> — biên công khai, client là thiết bị ngoài, cần dễ debug và tương thích rộng. (b) <b>Gateway ↔ service: gRPC</b> — giao tiếp nội bộ giữa các service bạn kiểm soát, ưu tiên hiệu năng, kiểu chặt, có thể streaming. Đây là pattern phổ biến: REST ở rìa, gRPC ở trong.</details>

📝 **Tóm tắt mục 3.** gRPC = RPC (gọi hàm từ xa) + protobuf (hợp đồng + binary + sinh code) trên HTTP/2 với streaming. Mạnh cho giao tiếp **nội bộ, hiệu năng cao, streaming**; ít hợp cho public API hướng trình duyệt vì khó tiếp cận và khó debug.

---

## 4. GraphQL — client tự chọn field

💡 **Trực giác.** Với REST, server quyết định mỗi endpoint trả về gì. Với **GraphQL**, *client* viết một "câu hỏi" mô tả chính xác nó cần field nào, và server trả về **đúng** chừng đó — không thừa, không thiếu. Giống đi buffet tự chọn món thay vì set menu cố định.

### 4.1 Over-fetching và under-fetching

GraphQL ra đời để chữa hai bệnh của REST:

- **Over-fetching (lấy thừa):** màn hình chỉ cần \`name\` của user, nhưng \`GET /users/42\` trả về cả 20 field (địa chỉ, ngày sinh, lịch sử...). Lãng phí băng thông, nhất là trên di động.
- **Under-fetching (lấy thiếu):** để hiển thị một bài viết kèm tên tác giả và 3 bình luận, REST phải gọi *nhiều lượt*: \`GET /posts/15\`, rồi \`GET /users/<authorId>\`, rồi \`GET /posts/15/comments\`. Nhiều round-trip → chậm.

**Ví dụ — GraphQL gộp tất cả vào MỘT request, lấy đúng field:**

\`\`\`graphql
# Client gửi query này:
query {
  post(id: 15) {
    title
    author { name }
    comments(limit: 3) { text }
  }
}
\`\`\`

\`\`\`json
// Server trả về ĐÚNG hình dạng đó:
{
  "data": {
    "post": {
      "title": "Thiết kế API",
      "author": { "name": "Linh" },
      "comments": [
        { "text": "Hay quá!" },
        { "text": "Cảm ơn bài viết" },
        { "text": "Đợi phần 2" }
      ]
    }
  }
}
\`\`\`

Một request, đúng field cần, dữ liệu lồng nhau giải quyết cả over- lẫn under-fetching.

### 4.2 Đánh đổi của GraphQL

| Ưu | Nhược |
|----|-------|
| Client lấy đúng field cần → hết over/under-fetch | **Caching khó hơn**: REST cache theo URL; GraphQL thường là 1 endpoint \`POST /graphql\` nên cache HTTP không ăn |
| Một endpoint, một round-trip cho dữ liệu lồng | **Query phức tạp có thể nặng**: client lồng sâu → server tốn nhiều truy vấn DB (vấn đề N+1) |
| Schema mạnh, tự sinh tài liệu | Cần kiểm soát độ phức tạp/độ sâu query để tránh bị lạm dụng |
| Thêm field không phá client cũ (chúng chỉ hỏi field chúng cần) | Hạ tầng/đường cong học phức tạp hơn REST đơn giản |

> ❓ **"GraphQL linh hoạt vậy thì nó thay luôn REST chứ?"** Không hẳn. GraphQL thắng khi client đa dạng và cần nhiều hình dạng dữ liệu khác nhau (nhiều màn hình app/web). Nhưng với API đơn giản, hoặc cần caching HTTP mạnh (CDN cache theo URL), hoặc upload file, hoặc public API muốn dễ dùng — REST vẫn gọn hơn. Nhiều hệ thống dùng *cả hai*.

> ⚠ **Lỗi thường gặp.** Tưởng "client tự chọn field" nghĩa là "server cứ trả mọi thứ rồi client lọc". Thực tế server chỉ *thực thi* đúng phần được hỏi — nhưng nếu không cẩn thận, một query lồng sâu (\`post → comments → author → posts → ...\`) khiến server nổ ra hàng nghìn truy vấn DB (**vấn đề N+1**). Phải dùng kỹ thuật như *dataloader* (gộp truy vấn) và giới hạn độ sâu/độ phức tạp query.

> 🔁 **Dừng lại tự kiểm tra.** Một app di động ở màn hình "danh sách" chỉ cần \`name + avatar\` của user, nhưng màn hình "chi tiết" cần đủ 20 field. Với REST một endpoint \`GET /users/42\` thì gặp vấn đề gì, và GraphQL giải ra sao?
> <details><summary>Đáp án</summary>REST gây <b>over-fetching</b> ở màn hình danh sách: tải đủ 20 field dù chỉ cần 2 → tốn băng thông × số user. GraphQL cho mỗi màn hình hỏi đúng field nó cần: màn danh sách hỏi <code>{ name avatar }</code>, màn chi tiết hỏi đủ 20 field — cùng một schema, không cần tạo hai endpoint REST riêng (vd <code>/users/42</code> và <code>/users/42/summary</code>).</details>

📝 **Tóm tắt mục 4.** GraphQL = client mô tả đúng field cần qua một query, server trả đúng hình dạng đó. Giải quyết over/under-fetching và gộp round-trip. Đánh đổi: caching khó hơn, rủi ro query nặng (N+1), hạ tầng phức tạp hơn. Mạnh khi nhiều client cần nhiều hình dạng dữ liệu.

---

## 5. So sánh REST / gRPC / GraphQL — khi nào dùng cái nào

| Tiêu chí | REST | gRPC | GraphQL |
|----------|------|------|---------|
| Mô hình | Tài nguyên + verb | Gọi hàm từ xa (RPC) | Truy vấn theo field |
| Định dạng dữ liệu | JSON (text) | Protobuf (binary) | JSON (text) |
| Giao thức | HTTP/1.1+ | HTTP/2 | HTTP (thường \`POST /graphql\`) |
| Hợp đồng | OpenAPI (tùy chọn) | \`.proto\` (bắt buộc) | Schema (bắt buộc) |
| Streaming | Hạn chế | ✓ (4 kiểu) | Có (subscription) |
| Hiệu năng payload | Trung bình | Cao nhất | Trung bình |
| Trình duyệt gọi trực tiếp | ✓ Dễ | ✗ Cần proxy | ✓ |
| Caching HTTP | ✓ Theo URL | Khó | Khó |
| Over/under-fetch | Dễ gặp | Cố định theo method | Tránh được |
| Dễ debug bằng mắt | ✓ Cao | ✗ Binary | Trung bình |

**Hướng dẫn chọn (rút gọn):**

- **REST** → public API, API đơn giản, cần caching HTTP/CDN mạnh, client đa dạng cần tiếp cận dễ, dễ debug. *Mặc định an toàn nếu chưa chắc.*
- **gRPC** → giao tiếp nội bộ giữa microservice, cần hiệu năng/độ trễ tốt, cần streaming, cả hai phía do bạn kiểm soát.
- **GraphQL** → nhiều client (web + nhiều màn hình mobile) cần nhiều hình dạng dữ liệu khác nhau, muốn tránh over/under-fetching, chấp nhận chi phí hạ tầng cao hơn.

> ❓ **"Phải chọn đúng một cái cho cả hệ thống?"** Không. Hệ thống thật thường **trộn**: REST ở biên công khai cho client ngoài, gRPC giữa các service nội bộ, GraphQL ở tầng gateway/BFF (Backend-For-Frontend) để gom dữ liệu cho UI. Chọn theo *từng đường biên*, không theo cả hệ thống.

> 🔁 **Dừng lại tự kiểm tra.** Cho 3 tình huống, chọn phong cách: (a) API thời tiết công khai cho lập trình viên khắp nơi tích hợp; (b) service "thanh toán" gọi service "tồn kho" trong cùng cụm backend, cần nhanh; (c) một app mạng xã hội với feed phức tạp, nhiều màn hình mobile lấy dữ liệu khác nhau.
> <details><summary>Đáp án</summary>(a) <b>REST</b> — public, cần dễ tiếp cận, cache CDN tốt. (b) <b>gRPC</b> — nội bộ, ưu tiên hiệu năng/độ trễ, kiểu chặt. (c) <b>GraphQL</b> — nhiều màn hình cần nhiều hình dạng dữ liệu, tránh over/under-fetch, gộp round-trip cho feed lồng nhau.</details>

📝 **Tóm tắt mục 5.** Không có "cái tốt nhất" tuyệt đối. REST cho biên công khai/đơn giản/cache; gRPC cho nội bộ/hiệu năng/streaming; GraphQL cho nhiều client cần nhiều hình dạng dữ liệu. Hệ thống thật trộn cả ba theo từng đường biên.

---

## 6. Versioning & tương thích ngược

💡 **Trực giác.** API đã phát hành giống một cây cầu đang có xe chạy: bạn không thể "đập đi xây lại" trong khi xe vẫn qua. Bạn phải **giữ cầu cũ chạy** trong khi xây cầu mới bên cạnh, rồi từ từ chuyển xe sang. Đó chính là tinh thần của versioning và tương thích ngược.

### 6.1 Breaking change vs non-breaking change

| Loại thay đổi | Phá vỡ client cũ? | Ví dụ |
|---------------|:-----------------:|-------|
| **Thêm** field mới vào response | ✗ Không | Thêm \`phone\` vào \`User\` — client cũ chỉ bỏ qua field lạ |
| **Thêm** endpoint/optional param mới | ✗ Không | Thêm \`GET /products/7/reviews\` |
| **Đổi tên / bỏ** field trong response | ✓ Có | \`name\` → \`fullName\`; client đọc \`name\` nhận \`undefined\` |
| **Đổi kiểu** dữ liệu | ✓ Có | \`price\` từ số \`990000\` thành chuỗi \`"990.000đ"\` |
| **Thêm** param *bắt buộc* | ✓ Có | Request cũ thiếu param mới → bị từ chối |
| **Đổi** ý nghĩa / status code | ✓ Có | Trước trả \`200\`, giờ trả \`204\` cho cùng tình huống |

**Quy tắc vàng:** *thêm thì an toàn, đổi/bỏ thì phá vỡ*. Khi buộc phải breaking → tạo **version mới**, giữ version cũ song song.

### 6.2 Các cách versioning

**Cách 1 — version trong URL** (phổ biến, dễ thấy nhất):

\`\`\`
GET /v1/users/42      ← bản cũ vẫn chạy
GET /v2/users/42      ← bản mới, hình dạng response khác
\`\`\`

**Cách 2 — version trong header** (URL "sạch" hơn, nhưng khó thấy/khó test bằng tay):

\`\`\`
GET /users/42
Accept: application/vnd.myapp.v2+json
\`\`\`

**Quy trình ngừng (deprecate) an toàn một field, không phá ai:**

1. **Thêm** field mới \`fullName\`, giữ \`name\` cũ song song (cả hai cùng có giá trị).
2. Đánh dấu \`name\` là *deprecated* trong tài liệu + trả header cảnh báo (vd \`Deprecation: true\`).
3. Cho client thời gian chuyển sang \`fullName\`.
4. Sau hạn (vd 6 tháng) hoặc lên \`/v2\`, mới bỏ hẳn \`name\`.

\`\`\`
# Giai đoạn quá độ — cả hai field cùng tồn tại:
GET /v1/users/42
{ "id": 42, "name": "Linh", "fullName": "Linh Nguyen" }
\`\`\`

> ❓ **"Vì sao thêm field lại không phá client cũ, mà bỏ/đổi thì phá?"** Vì client cũ chỉ đọc các field *nó biết* và **bỏ qua field lạ** — thêm field mới chúng không hề hấn gì. Nhưng nếu bạn *bỏ* một field chúng đang đọc, hoặc *đổi kiểu*, code của chúng (đang kỳ vọng field cũ/kiểu cũ) sẽ nhận \`undefined\` hoặc parse sai → vỡ. Tương tự với protobuf của gRPC: *thêm* field tag mới an toàn, *đổi/tái dùng* tag cũ là phá vỡ (mục 3).

> ⚠ **Lỗi thường gặp.** "Chỉ là đổi tên cho đẹp, có gì đâu" — đổi tên field/endpoint là **breaking change** dù logic không đổi. Một cái tên cũng là một phần của hợp đồng. Trước khi đổi bất cứ gì client *đọc được*, hãy hỏi: "có client nào đang dựa vào đúng tên/kiểu này không?"

> 🔁 **Dừng lại tự kiểm tra.** Phân loại breaking / non-breaking: (a) thêm field \`currency\` vào response; (b) đổi \`created_at\` từ Unix timestamp số sang chuỗi ISO; (c) thêm endpoint \`/products/7/reviews\`; (d) bắt buộc param \`apiKey\` cho mọi request.
> <details><summary>Đáp án</summary>(a) <b>Non-breaking</b> — thêm field, client cũ bỏ qua. (b) <b>Breaking</b> — đổi kiểu dữ liệu, client cũ parse số sẽ vỡ với chuỗi. (c) <b>Non-breaking</b> — thêm endpoint mới, không động tới cái cũ. (d) <b>Breaking</b> — thêm param *bắt buộc*, mọi request cũ thiếu nó sẽ bị từ chối. (b) và (d) cần lên version mới hoặc giai đoạn quá độ.</details>

📝 **Tóm tắt mục 6.** Thêm thì an toàn (non-breaking), đổi/bỏ thì phá vỡ (breaking). Khi buộc phải breaking, tạo version mới (URL \`/v1\`,\`/v2\` hoặc header) và giữ bản cũ song song, deprecate có lộ trình. Mục tiêu: tiến hóa API mà **không bắt client vỡ đột ngột**.

---

## 7. Phụ lục — idempotency, phân trang, lỗi (mở rộng)

### 7.1 Idempotency

💡 **Trực giác.** Một thao tác **idempotent** là thao tác mà gọi *một lần* hay *nhiều lần* cũng cho **cùng trạng thái cuối**. Bấm nút thang máy 5 lần cũng chỉ gọi 1 chuyến — đó là idempotent.

- \`GET\`, \`PUT\`, \`DELETE\` là idempotent: \`DELETE /products/7\` gọi lại lần nữa vẫn cho kết quả "đã xóa" (lần 2 trả \`404\`/\`204\` nhưng trạng thái cuối không đổi).
- \`POST\` *không* idempotent: gọi \`POST /orders\` hai lần tạo **hai đơn hàng**.

**Vấn đề thực tế:** mạng chập chờn, client gửi \`POST /orders\` nhưng không nhận được response → nó *gửi lại* → tạo trùng đơn. Giải pháp: **idempotency key** — client gửi một khóa duy nhất, server nhớ khóa đó và bỏ qua lần gọi trùng:

\`\`\`
POST /orders
Idempotency-Key: 7f3a9c2e-...   ← lần gửi lại dùng CÙNG key
{ "items": [...] }
\`\`\`

Server thấy key đã xử lý → trả lại kết quả cũ thay vì tạo đơn mới.

### 7.2 Phân trang (pagination)

Không bao giờ trả về *toàn bộ* một danh sách lớn (có thể hàng triệu dòng). Hai kiểu phổ biến:

\`\`\`
# Offset-based — đơn giản, nhưng chậm khi trang sâu & dễ lệch nếu dữ liệu đổi:
GET /products?page=2&limit=20

# Cursor-based — ổn định hơn, dùng con trỏ tới phần tử cuối trang trước:
GET /products?limit=20&after=eyJpZCI6NDB9
\`\`\`

Response nên kèm thông tin trang:

\`\`\`json
{
  "data": [ /* 20 sản phẩm */ ],
  "page": { "limit": 20, "nextCursor": "eyJpZCI6NjB9", "hasMore": true }
}
\`\`\`

### 7.3 Định dạng lỗi nhất quán

Mọi lỗi nên có **cùng một hình dạng** để client xử lý thống nhất — đừng chỗ trả chuỗi, chỗ trả object:

\`\`\`json
{
  "error": "insufficient_stock",
  "message": "Sản phẩm id=7 chỉ còn 2 cái, yêu cầu 5",
  "details": { "productId": 7, "available": 2, "requested": 5 }
}
\`\`\`

Có \`error\` (mã máy đọc, ổn định) + \`message\` (cho người) + \`details\` (ngữ cảnh). Mã \`error\` ổn định quan trọng hơn \`message\` — client *if* theo mã, không nên parse câu chữ tiếng người.

📝 **Tóm tắt mục 7.** Idempotency giúp gọi lại an toàn (dùng idempotency-key cho \`POST\`); phân trang tránh trả danh sách khổng lồ (offset hoặc cursor); lỗi nên có hình dạng nhất quán với mã máy-đọc-được. Đây là những chi tiết phân biệt API "chạy được" với API "dùng tốt trong thực tế".

---

## 8. Bài tập

1. Cho yêu cầu: "lấy thông tin sách số 12", "tạo một cuốn sách mới", "xóa sách số 12", "lấy danh sách bình luận của sách số 12". Viết verb + URL theo chuẩn REST cho từng cái và nêu status code khi thành công.
2. Chỉ ra điểm sai trong từng endpoint sau và viết lại cho đúng: (a) \`GET /createOrder?userId=5\`; (b) \`POST /getOrder/5\`; (c) \`GET /orders/deleteAll\`.
3. Một client gọi \`GET /users/42\` nhưng id 42 không tồn tại; một client khác gửi \`POST /users\` với email sai định dạng; server gặp lỗi DB khi đang \`GET /products\`. Chọn status code đúng cho từng tình huống và giải thích.
4. Cho cùng nhu cầu "hiển thị bài viết kèm tên tác giả và 3 bình luận mới nhất". Mô tả số lần gọi mạng nếu dùng REST thuần, rồi viết một query GraphQL gộp tất cả vào một request.
5. Một hệ thống: app mobile ↔ API gateway ↔ 4 service nội bộ (user, order, payment, inventory). Chọn phong cách API (REST/gRPC/GraphQL) cho mỗi đường biên và giải thích.
6. Phân loại breaking / non-breaking và nêu cách xử lý an toàn cho: (a) đổi field \`qty\` thành \`quantity\`; (b) thêm field \`discount\` vào response; (c) đổi \`price\` từ số sang chuỗi có ký hiệu tiền tệ.

## Lời giải chi tiết

**Bài 1.**
- Lấy sách 12: \`GET /books/12\` → \`200 OK\`.
- Tạo sách: \`POST /books\` (body chứa thông tin sách) → \`201 Created\` + header \`Location: /books/<id mới>\`.
- Xóa sách 12: \`DELETE /books/12\` → \`204 No Content\` (hoặc \`200 OK\` nếu trả nội dung).
- Bình luận của sách 12: \`GET /books/12/comments\` → \`200 OK\`.

Nguyên tắc áp dụng: URL là danh từ số nhiều, lồng để thể hiện quan hệ (\`/books/12/comments\`), động từ nằm ở HTTP method.

**Bài 2.**
- (a) Sai: dùng \`GET\` để *tạo* (gây thay đổi) và nhét động từ \`create\` vào URL. Đúng: \`POST /orders\` với body \`{ "userId": 5, ... }\`.
- (b) Sai: dùng \`POST\` để *đọc* và nhét động từ \`get\` vào URL. Đúng: \`GET /orders/5\`.
- (c) Sai: dùng \`GET\` để *xóa* và đặt động từ trong URL; xóa hàng loạt qua \`GET\` cực nguy hiểm (bot crawl là xóa sạch). Đúng: nếu thật sự cần xóa nhiều, dùng \`DELETE /orders\` kèm điều kiện trong body/query (vd \`DELETE /orders?status=cancelled\`) — và phải có xác thực/giới hạn chặt.

**Bài 3.**
- \`GET /users/42\` không tồn tại → **\`404 Not Found\`**: tài nguyên không có. (Không phải 400 — request *hợp lệ*, chỉ là không tìm thấy.)
- \`POST /users\` email sai định dạng → **\`400 Bad Request\`** (hoặc \`422 Unprocessable Entity\`): lỗi do client gửi dữ liệu không hợp lệ. Kèm body chỉ rõ field nào sai.
- Lỗi DB khi \`GET /products\` → **\`500 Internal Server Error\`**: lỗi phía server, không phải lỗi client. (Nếu DB tạm sập và sẽ phục hồi, có thể \`503 Service Unavailable\`.)

Nguyên tắc: 4xx = lỗi do client (request sai/không tìm thấy/không có quyền); 5xx = lỗi do server.

**Bài 4.**
- **REST thuần:** thường 3 round-trip: (1) \`GET /posts/15\` lấy bài viết + \`authorId\`; (2) \`GET /users/<authorId>\` lấy tên tác giả; (3) \`GET /posts/15/comments?limit=3&sort=-createdAt\` lấy 3 bình luận. Đây là **under-fetching** — phải gọi nhiều lượt mới đủ dữ liệu.
- **GraphQL — một request:**
  \`\`\`graphql
  query {
    post(id: 15) {
      title
      author { name }
      comments(limit: 3, sort: NEWEST) { text createdAt }
    }
  }
  \`\`\`
  Server trả đúng hình dạng đó trong một lần → tránh under-fetching và over-fetching (chỉ lấy \`name\` của tác giả, không lấy cả profile).

**Bài 5.**
- **App mobile ↔ gateway:** **REST** (hoặc GraphQL nếu nhiều màn hình cần nhiều hình dạng dữ liệu). Đây là biên công khai với thiết bị ngoài: cần dễ tiếp cận, dễ debug, cache được. Nếu feed phức tạp và đa dạng màn hình → cân nhắc **GraphQL** ở gateway (BFF).
- **Gateway ↔ 4 service nội bộ (user/order/payment/inventory):** **gRPC**. Giao tiếp nội bộ giữa các service bạn kiểm soát, ưu tiên hiệu năng/độ trễ thấp, kiểu chặt qua \`.proto\`, có thể streaming. Đây là pattern "REST/GraphQL ở rìa, gRPC ở trong".

**Bài 6.**
- (a) Đổi \`qty\` → \`quantity\`: **breaking** (đổi tên field client đang đọc). Xử lý an toàn: *thêm* \`quantity\` mới, giữ \`qty\` song song, đánh dấu \`qty\` deprecated, cho thời gian chuyển, rồi bỏ ở version sau (vd \`/v2\`).
- (b) Thêm \`discount\` vào response: **non-breaking** — client cũ bỏ qua field lạ. Làm trực tiếp được.
- (c) Đổi \`price\` từ số sang chuỗi \`"990.000đ"\`: **breaking** (đổi kiểu dữ liệu). Xử lý: đừng đổi tại chỗ; thêm field mới (vd \`priceFormatted\` dạng chuỗi) và giữ \`price\` số nguyên, hoặc lên \`/v2\` nếu thật sự muốn thay. Nói chung **không trộn tiền tệ vào số** — để client tự định dạng.

---

## 9. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **REST endpoint builder/đánh giá**: nhập verb + URL → chấm điểm theo best practice (danh từ số nhiều, không động từ trong URL, không dùng \`GET\` để đổi dữ liệu...).
  2. **Over-fetching REST vs GraphQL**: tích chọn field cần → so sánh kích thước payload REST (trả hết) với GraphQL (đúng field).
  3. **Quiz chọn HTTP status code**: cho tình huống → chọn status code đúng, có giải thích.

## 10. Bài tiếp theo

- [Lesson 03 — CI/CD](../lesson-03-ci-cd/) — sau khi đã thiết kế API, làm sao tự động build/test/triển khai an toàn mỗi khi đổi code.
- Liên quan: [Lesson 01 — Kiến trúc phần mềm](../lesson-01-software-architecture/) (API là đường biên giữa các thành phần) và [Networking — HTTP](../../../Networking/index.html) (nền tảng giao thức bên dưới REST/GraphQL/gRPC).
`;
