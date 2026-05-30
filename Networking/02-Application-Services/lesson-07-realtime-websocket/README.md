# Lesson 07 — Real-time & WebSocket

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao HTTP truyền thống không phù hợp cho real-time** (client phải luôn là bên khởi tạo, server không chủ động "đẩy" dữ liệu được).
- So sánh 4 kỹ thuật real-time: **short polling**, **long polling**, **Server-Sent Events (SSE)**, **WebSocket** — khi nào dùng cái nào.
- Hiểu **cơ chế nâng cấp** HTTP → WebSocket (HTTP/1.1 Upgrade, mã 101 Switching Protocols).
- Phân tích **cấu trúc khung (frame)** WebSocket, ping/pong, và vòng đời kết nối.
- Hiểu sơ lược về thách thức **mở rộng quy mô (scale)** kết nối real-time: nhiều server, pub/sub.

## Kiến thức tiền đề

- [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) — request/response, header, status code.
- [Lesson 01-08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — kết nối TCP, three-way handshake, song công.

---

## 1. Vấn đề: HTTP "kéo" — server không "đẩy" được

### 1.1. Mô hình HTTP truyền thống

💡 **Hình dung**: HTTP giống như bạn phải **tự đến bưu điện** để nhận thư. Bưu điện không tự mang thư đến cửa bạn — mỗi lần bạn muốn biết có thư không, bạn phải đi hỏi. Nếu thư vừa đến 1 giây sau khi bạn hỏi xong, bạn sẽ không biết cho đến lần hỏi tiếp theo.

Trong HTTP/1.1:
1. Client gửi request → Server xử lý → Server gửi response → kết nối đóng (hoặc keep-alive nhưng vẫn idle).
2. **Server không thể tự gửi dữ liệu** khi client chưa hỏi. Giao thức HTTP không có cơ chế "server khởi tạo".
3. Với ứng dụng cần dữ liệu tức thời (giá cổ phiếu thay đổi mỗi giây, tin nhắn chat mới, thông báo theo dõi bóng đá), đây là rào cản lớn.

**Ví dụ thực tế**: Giả sử bạn mở ứng dụng chat. Server có tin nhắn mới từ bạn bè lúc 10:00:01. Client không biết — nó đang idle, chờ user bấm nút hoặc timer kích hoạt request tiếp theo.

### 1.2. Vì sao polling (hỏi định kỳ) lãng phí

**Short polling**: client gửi request mỗi N giây để hỏi "có gì mới không?".

Tính overhead với 10.000 client hỏi mỗi 2 giây, 90% lần trả lời là "không có gì":
- Request/giây = 10.000 / 2 = **5.000 req/s** đến server.
- Mỗi request có header ~800 bytes (HTTP/1.1 không nén header mặc định) → 5.000 × 800 = **4,000,000 bytes/s = 4 MB/s** chỉ cho header.
- 90% trong số đó là response rỗng → **4.5 triệu request/giờ vô ích**.
- Độ trễ trung bình: nếu server cập nhật ngay sau khi client hỏi, phải chờ đến chu kỳ tiếp theo → độ trễ **0 → N giây** (trung bình N/2 = 1 giây với chu kỳ 2 giây).

❓ **Câu hỏi tự nhiên**:
- *"Giảm chu kỳ polling xuống còn 100ms thì sao?"* → Độ trễ giảm nhưng overhead tăng 20 lần. 10.000 client × 10 req/s = 100.000 req/s. Server bị quá tải.
- *"Sao không polling từ phía server?"* → HTTP không có cơ chế ngược. Server không biết địa chỉ IP+port của browser client để mở kết nối vào (firewall, NAT, địa chỉ thay đổi). Client phải khởi tạo.

📝 **Tóm tắt mục 1**

- HTTP: client khởi tạo, server trả lời — không có server-push trong HTTP/1.1 truyền thống.
- Short polling: tốn băng thông, CPU server, và độ trễ cao (trung bình N/2 giây).

---

## 2. Bốn kỹ thuật real-time

### 2.1. Short polling

**Cách hoạt động**: Client gửi HTTP request mỗi N giây, nhận response ngay lập tức (dù có dữ liệu mới hay không), rồi đợi N giây và hỏi lại.

```
Client ──GET /updates──► Server ──200 OK (rỗng)──► Client [chờ 2s]
Client ──GET /updates──► Server ──200 OK (rỗng)──► Client [chờ 2s]
Client ──GET /updates──► Server ──200 OK (tin nhắn mới!)──► Client [chờ 2s]
```

- Ưu điểm: đơn giản, dễ implement, server không giữ kết nối.
- Nhược điểm: overhead cao, độ trễ lớn (trung bình N/2 giây).

### 2.2. Long polling

**Cách hoạt động**: Client gửi request, server **giữ kết nối mở** cho đến khi có dữ liệu mới hoặc timeout (thường 30–60 giây). Khi có dữ liệu, server gửi response và client lập tức gửi request mới.

```
Client ──GET /updates──► Server [giữ kết nối...]
                                  [28 giây sau — có dữ liệu mới]
Client ◄──200 OK (tin nhắn mới)── Server
Client ──GET /updates──► Server [giữ kết nối...]  ← ngay lập tức
```

💡 **Hình dung**: như gọi điện đến tổng đài và nhân viên bảo "anh chờ máy, em kiểm tra". Bạn không phải gác máy gọi lại — nhân viên vẫn "ở trên đường dây" cho đến khi có thông tin.

- Ưu điểm: độ trễ thấp hơn short polling (gần như tức thời khi có sự kiện), ít request hơn.
- Nhược điểm: server phải duy trì hàng nghìn kết nối đang "treo" (mỗi kết nối chiếm thread/bộ nhớ), phức tạp hơn khi implement; vẫn là HTTP — mỗi "round" là một cặp request/response mới, phải gửi lại header.

### 2.3. Server-Sent Events (SSE)

**Cách hoạt động**: Client gửi **một** HTTP GET request. Server giữ kết nối mở và **stream** liên tục các sự kiện xuống client theo định dạng `text/event-stream`. Client không gửi thêm gì — chỉ lắng nghe.

```
Client ──GET /events──► Server
Client ◄──200 OK (Content-Type: text/event-stream)── Server
Client ◄──data: {"price": 123.45}\n\n── Server  [1 giây sau]
Client ◄──data: {"price": 124.10}\n\n── Server  [2 giây sau]
Client ◄──data: {"price": 122.80}\n\n── Server  [3 giây sau]
```

- Ưu điểm: đơn giản (native browser API `EventSource`), HTTP/2 có thể ghép kênh nhiều SSE stream, tự động kết nối lại (`retry:`), một chiều rõ ràng.
- Nhược điểm: **chỉ một chiều** — server gửi, client không gửi ngược qua cùng kênh. Client muốn gửi dữ liệu phải dùng HTTP request riêng. Không phù hợp cho ứng dụng tương tác hai chiều thực sự.
- Dùng cho: dashboard giá chứng khoán, thông báo, news feed, log stream.

### 2.4. WebSocket

**Cách hoạt động**: Client khởi tạo **nâng cấp** từ HTTP lên WebSocket. Sau khi nâng cấp thành công (101 Switching Protocols), cả hai bên có thể **gửi bất kỳ lúc nào** trên cùng một kết nối TCP — **song công hoàn toàn (full-duplex)**.

```
Client ──HTTP GET /ws (Upgrade: websocket)──► Server
Client ◄──101 Switching Protocols──────────── Server
Client ←────────── [kênh song công bền vững] ──────────► Server
Client ──"Xin chào"──────────────────────────────────── Server
Server ──"Chào bạn!"──────────────────────────────────► Client
Client ──"Giá BTC?"──────────────────────────────────── Server
Server ──"$67,230"────────────────────────────────────► Client
```

- Ưu điểm: song công thực sự (cả hai chiều), độ trễ cực thấp (không overhead header HTTP mỗi tin nhắn), một kết nối TCP bền vững.
- Nhược điểm: phức tạp hơn implement (cần xử lý kết nối bị đứt, heartbeat, scale); không phải mọi proxy/firewall đều hỗ trợ; HTTP/2 không "nâng cấp" được thành WebSocket (phải dùng HTTP/1.1 cho handshake).
- Dùng cho: chat, game online, collaborative editing, trading terminal.

### 2.5. Bảng so sánh

| Đặc điểm | Short polling | Long polling | SSE | WebSocket |
|-----------|:---:|:---:|:---:|:---:|
| Chiều truyền | C→S→C (mỗi lần) | C→S→C (mỗi lần) | S→C liên tục | Song công (C↔S) |
| Độ trễ (điển hình) | N/2 giây | ~0 ms | ~0 ms | ~0 ms |
| Overhead mỗi tin | Header HTTP đầy đủ | Header HTTP đầy đủ | Header HTTP một lần | 2–10 byte/frame |
| Kết nối | Mở/đóng liên tục | Mở/đóng theo round | Một kết nối liên tục | Một kết nối liên tục |
| Tự reconnect | Phải tự code | Phải tự code | Có sẵn (`retry:`) | Phải tự code |
| Hỗ trợ trình duyệt | Mọi trình duyệt | Mọi trình duyệt | Mọi trình duyệt hiện đại | Mọi trình duyệt hiện đại |
| Phù hợp với HTTP/2 | Có | Có | Tốt (ghép kênh) | Không (cần HTTP/1.1) |
| Dùng cho | Dữ liệu ít cập nhật | Thông báo đơn giản | Dữ liệu server-push | Chat, game, realtime |

⚠ **Lỗi thường gặp**: Nhiều developer dùng WebSocket cho mọi thứ dù SSE đủ dùng. Nếu ứng dụng chỉ cần server gửi dữ liệu về client (không cần client gửi ngược theo thời gian thực qua cùng kênh), SSE đơn giản hơn và dễ scale hơn.

🔁 **Tự kiểm tra**: Dashboard hiển thị giá cổ phiếu cập nhật mỗi giây, người dùng chỉ xem không tương tác — nên dùng kỹ thuật nào?

<details>
<summary>Đáp án</summary>

SSE là lựa chọn tốt nhất. Dữ liệu chỉ đi một chiều (server → client), SSE xử lý tốt kịch bản này và đơn giản hơn WebSocket. Long polling cũng được nhưng overhead hơn vì phải reconnect liên tục. WebSocket là overkill nếu client không cần gửi dữ liệu.

</details>

📝 **Tóm tắt mục 2**

- **Short polling**: đơn giản nhất nhưng lãng phí nhất — hỏi định kỳ dù không có gì mới.
- **Long polling**: giảm request nhưng vẫn dùng HTTP; server phải giữ kết nối "treo".
- **SSE**: một chiều từ server, đơn giản, tốt cho dashboard/thông báo.
- **WebSocket**: song công, overhead thấp nhất, phức tạp nhất — cần cho chat, game, real-time hai chiều.

---

## 3. WebSocket: cơ chế nâng cấp HTTP → WebSocket

### 3.1. Vì sao dùng HTTP để bắt đầu?

💡 **Hình dung**: WebSocket "đi nhờ" cổng 80/443 của HTTP như một người bảo vệ bất ngờ: "Tôi muốn vào nhưng theo cách khác nhé — hãy để tôi nâng cấp thẻ thành viên từ HTTP sang WebSocket." Sau khi được chấp thuận (101), người đó không theo quy tắc HTTP nữa — họ đi thẳng vào và ra bất kỳ lúc nào.

WebSocket không chạy trên giao thức riêng từ đầu vì:
1. Firewall và proxy thường chặn cổng lạ, nhưng cho phép cổng 80 (HTTP) và 443 (HTTPS).
2. Sử dụng HTTP handshake ban đầu tận dụng cơ sở hạ tầng HTTP hiện có (load balancer, proxy, auth middleware).

### 3.2. Walk-through bắt tay nâng cấp

**Bước 1 — Client gửi HTTP GET với header nâng cấp:**

```
GET /chat HTTP/1.1
Host: chat.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: https://example.com
```

Giải thích từng header:
- `Upgrade: websocket` — yêu cầu chuyển sang giao thức WebSocket.
- `Connection: Upgrade` — báo hiệu đây là yêu cầu nâng cấp kết nối (bắt buộc đi kèm `Upgrade`).
- `Sec-WebSocket-Key` — chuỗi Base64 của 16 bytes ngẫu nhiên do client sinh ra. Dùng để xác minh server thực sự hỗ trợ WebSocket (không phải proxy giả mạo).
- `Sec-WebSocket-Version: 13` — phiên bản WebSocket (RFC 6455, năm 2011, phiên bản cuối cùng và duy nhất hiện dùng).

**Bước 2 — Server phản hồi 101 Switching Protocols:**

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Giải thích:
- `101 Switching Protocols` — mã trạng thái duy nhất cho biết "chấp thuận nâng cấp, từ giờ dùng giao thức mới".
- `Sec-WebSocket-Accept` — server lấy `Sec-WebSocket-Key` của client, ghép với GUID chuẩn `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`, SHA-1 hash, rồi Base64 encode. Client kiểm tra để xác minh server hợp lệ.

**Ví dụ tính `Sec-WebSocket-Accept`:**
```
Key từ client: dGhlIHNhbXBsZSBub25jZQ==
GUID chuẩn:   258EAFA5-E914-47DA-95CA-C5AB0DC85B11
Chuỗi ghép:   dGhlIHNhbXBsZSBub25jZQ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11
SHA-1:         b37a4f2cc0624f1690f64606cf385945b2bec4ea
Base64:        s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

**Bước 3 — Kênh WebSocket mở, HTTP không còn dùng nữa:**

Sau 101, kết nối TCP này không còn chạy HTTP. Cả hai bên giao tiếp bằng định dạng khung (frame) WebSocket. Không có request/response — bất kỳ bên nào cũng gửi bất kỳ lúc nào.

❓ **Câu hỏi tự nhiên**:
- *"Vì sao mã 101 mà không phải 200 OK?"* — 200 OK có nghĩa "request hoàn thành thành công, đây là response body". 101 có nghĩa "kết nối đang chuyển sang giao thức khác ngay bây giờ" — không có response body, kết nối TCP tiếp tục sống với giao thức mới.
- *"WebSocket dùng cổng mấy?"* — Sau khi nâng cấp, WebSocket **vẫn dùng cùng cổng** (80 cho `ws://`, 443 cho `wss://`). Không mở cổng mới.
- *"Có thể dùng WebSocket qua HTTPS không?"* — Có, `wss://` (WebSocket Secure) chạy trên TLS, giống như HTTPS. Luôn dùng `wss://` trên production.

### 3.3. So sánh với TCP three-way handshake

WebSocket cần **hai tầng bắt tay** để thiết lập:

```
Tầng 1 — TCP three-way handshake (kết nối transport):
  Client ──SYN──────────────► Server
  Client ◄──SYN-ACK───────── Server
  Client ──ACK──────────────► Server

Tầng 2 — WebSocket upgrade handshake (kết nối application):
  Client ──HTTP GET + Upgrade──► Server     (~1 RTT)
  Client ◄──101 + Accept──────── Server
  [kênh WebSocket mở]
```

Chi phí thiết lập: khoảng **1.5 RTT** (TCP) + **1 RTT** (WebSocket upgrade) = **2.5 RTT** từ khi bắt đầu đến khi gửi được tin nhắn đầu tiên. Với `wss://` (TLS): thêm **1-2 RTT** nữa → **3.5–4.5 RTT** tổng cộng. Sau đó, mỗi tin nhắn chỉ tốn **0 RTT** overhead — gửi ngay, không cần handshake lại.

📝 **Tóm tắt mục 3**

- WebSocket "đi nhờ" HTTP/1.1 qua cổng 80/443, tránh bị firewall chặn.
- Upgrade: client gửi `Upgrade: websocket`, server xác nhận với `101 Switching Protocols`.
- Sau 101, kết nối TCP này không chạy HTTP nữa — giao tiếp bằng khung WebSocket.
- `Sec-WebSocket-Key`/`Accept` để ngăn proxy giả mạo (không phải bảo mật mật mã).

---

## 4. Khung WebSocket và vòng đời kết nối

### 4.1. Cấu trúc khung (frame)

Mỗi tin nhắn WebSocket được gửi dưới dạng một hoặc nhiều **khung (frame)**. Cấu trúc tối thiểu:

```
Byte 0: FIN(1) RSV1(1) RSV2(1) RSV3(1) | Opcode(4)
Byte 1: MASK(1) | Payload length(7)
[Thêm 2 hoặc 8 byte nếu payload > 125 hoặc > 65535 byte]
[4 byte Masking key — chỉ khi MASK=1, tức là client→server]
[Payload data (được XOR với masking key nếu MASK=1)]
```

Các trường quan trọng:
- **FIN (1 bit)**: 1 = đây là khung cuối của tin nhắn. 0 = còn khung tiếp theo (tin nhắn lớn bị chia mảnh).
- **Opcode (4 bit)**: loại khung.
  - `0x1` = Text (UTF-8).
  - `0x2` = Binary.
  - `0x8` = Close.
  - `0x9` = Ping.
  - `0xA` = Pong.
- **MASK**: client → server bắt buộc mask = 1; server → client không mask = 0. Lý do: ngăn một số tấn công cache poisoning qua proxy.
- **Payload length**: 7 bit (0–125), hoặc mã 126 + 2 byte, hoặc mã 127 + 8 byte.

**Overhead thực tế của WebSocket so với HTTP:**

Tin nhắn JSON `{"user":"Alice","text":"Xin chào"}` ≈ 40 bytes:
- Qua **HTTP** (polling): header ~800 bytes + body 40 bytes = **840 bytes**, tỷ lệ overhead = 95%.
- Qua **WebSocket**: 2 byte header khung + 40 bytes payload = **42 bytes**, tỷ lệ overhead = 4.8%.

WebSocket tiết kiệm **95% overhead** so với HTTP polling cho mỗi tin nhắn nhỏ.

### 4.2. Ping/Pong — giữ kết nối sống

Kết nối TCP "idle" (không có dữ liệu) có thể bị firewall hoặc NAT gateway cắt sau vài phút. WebSocket có cơ chế heartbeat tích hợp:

```
Server ──Ping (opcode 0x9, payload "server-check")──► Client
Client ◄──Pong (opcode 0xA, cùng payload)───────────── Client→Server
[Nếu không nhận Pong sau timeout → server đóng kết nối]
```

- Thông thường server gửi Ping mỗi **30–60 giây**.
- Nếu client không trả lời Pong trong thời gian chờ → server giả định kết nối đứt và đóng.
- Client cũng có thể gửi Ping chủ động để kiểm tra kết nối.

### 4.3. Đóng kết nối sạch (graceful close)

WebSocket có handshake đóng kết nối:
1. Bên muốn đóng gửi khung `Close` (opcode `0x8`), có thể kèm mã lý do (vd: 1000 = Normal Closure, 1001 = Going Away, 1011 = Server Error).
2. Bên kia nhận, gửi lại khung `Close` (echo).
3. Bên khởi tạo nhận Close echo → đóng TCP.

Khác với "cắt mạng đột ngột": graceful close đảm bảo dữ liệu cuối cùng đã được nhận trước khi đóng.

### 4.4. Khi nào dùng WebSocket, khi nào dùng SSE, polling?

| Tình huống | Kỹ thuật được chọn | Lý do |
|---|---|---|
| Chat realtime | WebSocket | Cần hai chiều: người dùng gửi và nhận |
| Game multiplayer | WebSocket | Độ trễ cực thấp, nhiều sự kiện/giây, hai chiều |
| Dashboard giá cổ phiếu | SSE | Chỉ server → client, đơn giản hơn |
| Thông báo push (notification) | SSE hoặc Long polling | Đơn giản, ít sự kiện |
| Tải file, API CRUD | HTTP thông thường | Không cần real-time |
| Kết quả bầu cử cập nhật | Long polling hoặc SSE | Cập nhật không thường xuyên |
| Collaborative document editing | WebSocket | Thay đổi đồng thời từ nhiều người |

❓ **Câu hỏi tự nhiên**:
- *"WebSocket có hỗ trợ subprotocol không?"* — Có. Header `Sec-WebSocket-Protocol` cho phép đàm phán subprotocol ứng dụng (vd: STOMP, MQTT). Client liệt kê các subprotocol hỗ trợ; server chọn một và xác nhận.
- *"WebSocket có nén được không?"* — Có, qua extension `permessage-deflate` (RFC 7692). Client/server đàm phán trong handshake qua `Sec-WebSocket-Extensions`.

📝 **Tóm tắt mục 4**

- Frame WebSocket: tối thiểu **2 byte overhead** — nhỏ hơn nhiều so với header HTTP.
- Client → Server bắt buộc mask payload (ngăn tấn công cache poisoning qua proxy).
- Ping/Pong: heartbeat mỗi 30–60 giây để duy trì kết nối qua firewall/NAT.
- Graceful close: handshake đóng 2 chiều, mã lý do 4 chữ số.

---

## 5. Mở rộng quy mô real-time (Scale)

### 5.1. Vấn đề cơ bản

💡 **Hình dung**: Hãy tưởng tượng một phòng chat 10.000 người. Nếu chỉ có một máy chủ, nó phải duy trì 10.000 kết nối WebSocket cùng lúc. Khi bạn A gửi tin nhắn, server phải phát (broadcast) đến 9.999 người còn lại trong cùng phòng — tất cả trong vài mili giây. Đây là bài toán khó.

**Khác biệt so với HTTP stateless**:
- HTTP server **không lưu trạng thái** giữa các request → dễ scale: thêm server, dùng load balancer round-robin.
- WebSocket **có trạng thái**: mỗi kết nối "gắn" với một server cụ thể. Kết nối của client A nằm ở Server 1; client B ở Server 2. Khi A gửi tin, Server 1 cần chuyển tin đến Server 2 để Server 2 gửi cho B.

### 5.2. Pub/Sub — giải pháp phổ biến

**Message broker** (như Redis Pub/Sub, Kafka, RabbitMQ) làm trung gian:

```
Client A ──tin nhắn──► Server 1 ──publish──► [Redis Pub/Sub: channel "room-42"]
                                                      │
                                              subscribe│
                                                      ▼
Client B ◄──tin nhắn── Server 2 ◄──message── [Redis Pub/Sub]
Client C ◄──tin nhắn── Server 3 ◄──message── [Redis Pub/Sub]
```

- Mỗi server WebSocket **subscribe** vào channel tương ứng với các phòng mà clients của nó đang ở.
- Khi nhận tin từ một client, server **publish** lên broker.
- Broker broadcast đến tất cả server đang subscribe → mỗi server gửi đến clients của mình.

**Sticky sessions**: load balancer phải đảm bảo client A luôn kết nối vào cùng một server WebSocket (vì kết nối TCP là stateful). Dùng IP hashing hoặc cookie session.

### 5.3. Mô hình C10K và hơn thế

"C10K problem" (10.000 concurrent connections) từng là thách thức lớn (năm 1999). Hiện nay:
- Một server Node.js event-loop xử lý được **100.000+ kết nối WebSocket** đồng thời (vì mỗi kết nối idle hầu như không dùng CPU — chỉ tốn vài KB bộ nhớ).
- Golang goroutine: tương tự, có thể handle hàng trăm nghìn kết nối.
- Thách thức thực tế: **bandwidth** (mỗi kết nối gửi 1 KB/s → 100.000 kết nối = 100 MB/s) và **broadcast** (gửi 1 tin đến 100.000 người cùng lúc).

Xem thêm: [Lesson 08 — Hạ tầng web quy mô](../lesson-08-web-infrastructure/) để hiểu load balancer, CDN, horizontal scaling.

📝 **Tóm tắt mục 5**

- WebSocket có trạng thái → không scale ngang đơn giản như HTTP.
- Pub/Sub broker (Redis, Kafka) cho phép nhiều server WebSocket phối hợp.
- Sticky sessions: client phải kết nối vào cùng server mỗi lần.
- Một server hiện đại handle được 100.000+ kết nối idle nhờ event-loop.

---

## Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Ứng dụng theo dõi vị trí xe taxi realtime: mỗi xe taxi (10.000 xe) gửi vị trí GPS mỗi 3 giây lên server; hành khách (50.000 người) xem bản đồ cập nhật mỗi 5 giây. Chọn kỹ thuật real-time phù hợp và giải thích.

**Bài 2**: Đọc và phân tích đoạn HTTP sau. Đây là bước mấy trong quá trình nâng cấp WebSocket? Header nào là bắt buộc?

```
GET /ws/room/42 HTTP/1.1
Host: chat.example.com
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Version: 13
```

**Bài 3**: Tính overhead của short polling so với WebSocket trong kịch bản sau:
- 5.000 client kết nối.
- Short polling: mỗi 1 giây, mỗi request gửi header 650 byte + payload 20 byte (response rỗng).
- WebSocket: mỗi 1 giây server push 1 tin nhắn 20 byte, overhead khung 2 byte.
- Tính tổng băng thông (upload + download) cho mỗi kỹ thuật trong 1 giây, và tỷ lệ overhead.

**Bài 4**: Server nhận được HTTP request với `Upgrade: websocket`. Server quyết định chấp thuận. Header `Sec-WebSocket-Key` là `aB3Cd/efGHiJ==`. Tính `Sec-WebSocket-Accept` (dùng GUID chuẩn `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`). Giải thích các bước.

**Bài 5**: Phân tích frame WebSocket sau (dưới dạng hex): `81 85 37 fa 21 3d 7f 9f 4d 51 58`. Giải mã từng phần.

**Bài 6**: Một startup thiết kế hệ thống game multiplayer đơn giản: 1.000 phòng, mỗi phòng 4 người chơi, mỗi người gửi action mỗi 50ms. Hỏi: (a) tổng số tin nhắn/giây đến server; (b) nếu mỗi action cần broadcast đến 3 người còn lại, tổng tin nhắn server gửi ra/giây; (c) vì sao WebSocket phù hợp hơn HTTP polling ở đây?

### Lời giải chi tiết

**Bài 1 — Phân tích và chọn kỹ thuật:**

*Hướng tiếp cận*: Phân tích từng luồng dữ liệu riêng.

**Luồng xe taxi → server** (10.000 xe gửi GPS mỗi 3 giây):
- Đây là luồng từ nhiều client đến server, không phải real-time server-push.
- Client khởi tạo → dùng **HTTP POST thông thường** mỗi 3 giây là đủ.
- Không cần WebSocket vì server không cần gửi gì về xe taxi ngay lập tức.
- 10.000 × (1/3) ≈ **3.333 request/giây** đến server — hoàn toàn xử lý được với HTTP/1.1 keep-alive.

**Luồng server → hành khách** (50.000 người xem bản đồ):
- Server cần push vị trí xe về cho hành khách.
- Hành khách không tương tác ngược lại theo thời gian thực.
- → **SSE** hoặc **WebSocket**.
- SSE là đủ (chỉ một chiều) và đơn giản hơn.
- Tuy nhiên, nếu ứng dụng sau này cần tính năng đặt xe (tương tác hai chiều), WebSocket sẽ linh hoạt hơn.

*Kết luận*: Xe → Server dùng **HTTP POST định kỳ**; Server → Hành khách dùng **SSE** (hoặc WebSocket nếu cần two-way sau này).

---

**Bài 2 — Phân tích HTTP request:**

Đây là **Bước 1** (client gửi yêu cầu nâng cấp). Server chưa phản hồi.

Header **bắt buộc** để nâng cấp WebSocket:
1. `Connection: Upgrade` — báo đây là yêu cầu thay đổi giao thức.
2. `Upgrade: websocket` — chỉ định giao thức đích.
3. `Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==` — khóa xác thực 16 bytes ngẫu nhiên (Base64).
4. `Sec-WebSocket-Version: 13` — phiên bản RFC 6455.

Header `Host` bắt buộc theo HTTP/1.1 (không phải đặc thù WebSocket). URL `/ws/room/42` cho biết client muốn vào phòng 42.

Server phải trả lời `101 Switching Protocols` với `Sec-WebSocket-Accept` để chấp thuận.

---

**Bài 3 — Tính overhead:**

**Short polling (5.000 client × 1 req/giây):**
- Upload (client → server): 5.000 × 650 byte = 3.250.000 byte = **3,25 MB/s**
  (request header, không có payload đáng kể)
- Download (server → client): 5.000 × (650 + 20) byte = **3,35 MB/s**
  (response header 650 byte + body 20 byte)
- Tổng: **6,6 MB/s**
- Overhead = (650 / (650+20)) × 100% = **97%** là header, chỉ 3% là dữ liệu thực.

**WebSocket (5.000 client, server push 1 tin/giây/client):**
- Server → client: 5.000 × (2 + 20) byte = 110.000 byte = **0,11 MB/s**
- Client → server (ping/pong mỗi 30s): 5.000 × (1/30) × 10 byte ≈ **1.667 byte/s** ≈ negligible
- Tổng: **~0,11 MB/s**
- Overhead = 2 / (2+20) × 100% = **9%** là header khung.

*So sánh*: Short polling tốn **60 lần** băng thông hơn WebSocket trong kịch bản này. Với dữ liệu thực chất mỗi bên bằng nhau (20 byte), WebSocket hiệu quả hơn rõ rệt.

---

**Bài 4 — Tính Sec-WebSocket-Accept:**

*Các bước*:

1. Lấy `Sec-WebSocket-Key`: `aB3Cd/efGHiJ==`
2. Ghép với GUID chuẩn: `aB3Cd/efGHiJ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11`
3. Tính SHA-1 của chuỗi trên (đây là bước cần thư viện hoặc tool; không tính tay được).
4. Base64 encode kết quả SHA-1 (20 bytes) → chuỗi ~28 ký tự.
5. Đặt vào header: `Sec-WebSocket-Accept: <kết quả>`.

*Mục đích*: Ngăn chặn proxy HTTP không hiểu WebSocket vô tình chấp thuận upgrade. Nếu proxy không biết GUID chuẩn này, nó không thể tính đúng Accept → client phát hiện ra và từ chối.

*Lưu ý*: Đây **không phải** cơ chế bảo mật mật mã (không ngăn được tấn công chủ đích). Bảo mật thực sự do TLS (`wss://`) cung cấp.

---

**Bài 5 — Giải mã WebSocket frame `81 85 37 fa 21 3d 7f 9f 4d 51 58`:**

Phân tích từng byte:

```
Byte 1: 0x81 = 1000 0001
  FIN = 1 (bit 7) → đây là khung cuối (và duy nhất) của tin nhắn
  RSV1,2,3 = 0,0,0 (không dùng extension)
  Opcode = 0001 = 0x1 → Text frame (nội dung UTF-8)

Byte 2: 0x85 = 1000 0101
  MASK = 1 (bit 7) → payload được mask (client → server)
  Payload length = 000 0101 = 5 → payload dài 5 bytes

Bytes 3-6: 37 fa 21 3d → Masking key = [0x37, 0xFA, 0x21, 0x3D]

Bytes 7-11: 7f 9f 4d 51 58 → Masked payload (5 bytes)

Giải mã (XOR từng byte với masking key theo vị trí i mod 4):
  i=0: 0x7F XOR 0x37 = 0x48 = 'H'
  i=1: 0x9F XOR 0xFA = 0x65 = 'e'
  i=2: 0x4D XOR 0x21 = 0x6C = 'l'
  i=3: 0x51 XOR 0x3D = 0x6C = 'l'
  i=4: 0x58 XOR 0x37 = 0x6F = 'o'

Kết quả: "Hello"
```

Tin nhắn này là văn bản "Hello", gửi từ client lên server (có mask).

---

**Bài 6 — Bài toán game multiplayer:**

**(a) Tin nhắn đến server/giây:**
- Mỗi người gửi mỗi 50ms = 20 action/giây/người.
- 1.000 phòng × 4 người × 20 action/giây = **80.000 tin nhắn/giây** đến server.

**(b) Tin nhắn server gửi ra/giây:**
- Mỗi action của 1 người cần broadcast đến 3 người còn lại trong phòng.
- 80.000 action/giây × 3 broadcast = **240.000 tin nhắn/giây** từ server.

**(c) Vì sao WebSocket tốt hơn HTTP polling:**
- Với polling mỗi 50ms: mỗi client gửi 20 request/giây → 4.000 client × 20 = 80.000 HTTP request/giây. Mỗi request có header ~700 byte → **56 MB/s** chỉ cho header upload.
- Với WebSocket: 80.000 tin nhắn × (2 byte overhead + payload ~50 byte) = **4,16 MB/s** tổng cộng.
- WebSocket tiết kiệm hơn **13 lần** bandwidth.
- Quan trọng hơn: độ trễ polling phụ thuộc chu kỳ (polling 50ms → độ trễ 0–50ms, trung bình 25ms). WebSocket: đến thẳng dưới 5ms. Với game realtime, 25ms trễ khiến trải nghiệm tệ rõ rệt.

---

## Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) · [TCP — bắt tay và song công](../../01-Foundations-LowerLayers/lesson-08-tcp/)
- **Tiếp theo**: [Lesson 08 — Hạ tầng web quy mô](../lesson-08-web-infrastructure/) — load balancer, CDN, horizontal scaling cho hàng triệu kết nối.

---

## 📝 Tổng kết Lesson 07

1. **HTTP request/response** không có cơ chế server-push — client phải luôn khởi tạo. Short polling giải quyết vấn đề nhưng lãng phí.
2. **4 kỹ thuật real-time**: Short polling (đơn giản, tốn tài nguyên) → Long polling (giảm request) → SSE (một chiều, đơn giản) → WebSocket (song công, overhead thấp nhất).
3. **WebSocket upgrade**: HTTP GET với `Upgrade: websocket` → server trả `101 Switching Protocols` → kênh song công bền vững.
4. **Frame WebSocket**: 2 byte header tối thiểu (FIN, opcode, MASK, length) + payload. Tiết kiệm 95%+ overhead so với HTTP polling.
5. **Scale**: WebSocket stateful → cần pub/sub broker (Redis, Kafka) khi nhiều server; sticky sessions ở load balancer.
