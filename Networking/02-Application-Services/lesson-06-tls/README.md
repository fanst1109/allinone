# Lesson 06 — TLS/SSL: Bảo mật lớp truyền tải

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích vì sao HTTP truyền văn bản thô (plaintext) là nguy hiểm và TLS giải quyết điều đó thế nào.
- Phân biệt mã hóa đối xứng (symmetric) và bất đối xứng (asymmetric), hiểu vì sao TLS kết hợp cả hai.
- Mô tả từng bước của quá trình bắt tay TLS (TLS handshake) — ClientHello, ServerHello, Certificate, key exchange, Finished.
- Giải thích vai trò của chứng chỉ số (digital certificate) và chuỗi tin cậy (chain of trust): root CA → intermediate CA → leaf.
- Phân biệt TLS 1.2 và TLS 1.3 về số vòng khứ hồi (round-trip) và forward secrecy.
- Đọc được thông báo lỗi chứng chỉ của trình duyệt và hiểu nguyên nhân.

## Kiến thức tiền đề

- [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) — HTTPS là HTTP chạy trên TLS/TCP/443.
- [Lesson 08 (Tier 1) — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — TLS chạy trên TCP đã thiết lập kết nối.
- Mật mã học cơ bản: xem [Cryptography/](../../../Cryptography/) để đọc thêm về AES, RSA, ECDH, SHA.

---

## 1. Vì sao cần TLS?

### 1.1. HTTP truyền dữ liệu dạng văn bản thô

💡 **Hình dung**: gửi thư bằng bưu thiếp (postcard) — bất kỳ ai cầm bưu thiếp đó đều đọc được. HTTP là bưu thiếp; TLS là phong bì dán kín và niêm phong.

Khi bạn mở `http://shop.example.com` và điền mật khẩu, gói tin TCP trông như thế này (có thể bắt bằng Wireshark):

```
POST /login HTTP/1.1
Host: shop.example.com
Content-Type: application/x-www-form-urlencoded

username=alice&password=SecretPass123
```

Bất kỳ thiết bị nào trên đường truyền — router, điểm Wi-Fi công cộng, ISP, máy chủ trung gian — đều **đọc được hoàn toàn**.

### 1.2. Ba loại tấn công HTTP không bảo vệ được

**Nghe lén (eavesdropping)**: kẻ tấn công ngồi cùng mạng Wi-Fi quán cà phê, bắt gói tin → đọc cookie phiên đăng nhập, mật khẩu, số thẻ ngân hàng.

**Giả mạo — tấn công trung gian (Man-In-The-Middle / MITM)**: kẻ tấn công chen vào giữa bạn và server, nhận gói của bạn, đọc rồi chuyển tiếp (có thể sửa nội dung). Bạn nghĩ đang nói với ngân hàng thật, thực ra đang nói với kẻ tấn công. Xem chi tiết: [../../03-Advanced-Operations/lesson-02-attacks-defense/](../../03-Advanced-Operations/lesson-02-attacks-defense/).

**Giả mạo nội dung (content injection)**: ISP hoặc thiết bị trung gian chèn quảng cáo vào HTML, hoặc thay đổi tập tin tải về (download) — bạn không biết file đã bị sửa.

### 1.3. TLS cung cấp 3 đảm bảo

| Đảm bảo | Tiếng Anh | Nghĩa thực tế |
|---------|-----------|---------------|
| **Bí mật** | Confidentiality | Chỉ 2 bên giao tiếp đọc được nội dung — ngay cả ISP cũng không. |
| **Toàn vẹn** | Integrity | Bất kỳ sửa đổi nào trên đường truyền đều bị phát hiện và từ chối. |
| **Xác thực** | Authentication | Bạn biết chắc đang nói chuyện với server thật (ví dụ `bank.com`), không phải kẻ mạo danh. |

❓ **Câu hỏi tự nhiên của người đọc**:

- *"TLS có làm chậm kết nối không?"* — Ngày nay rất ít: handshake TLS 1.3 thêm khoảng 1 round-trip (~30–100ms tùy RTT); sau đó mã hóa AES-GCM được tăng tốc bởi phần cứng (AES-NI), overhead < 1% so với HTTP thường.
- *"TLS bảo vệ khỏi mọi tấn công không?"* — Không. TLS không bảo vệ khỏi lỗ hổng ứng dụng (SQL injection, XSS), không ẩn địa chỉ IP đích (cần VPN/Tor cho điều đó), không ngăn server thu thập dữ liệu của bạn.

📝 **Tóm tắt mục 1**:
- HTTP = bưu thiếp; bất kỳ ai cũng đọc được.
- TLS cung cấp: bí mật (mã hóa) + toàn vẹn (MAC/AEAD) + xác thực (chứng chỉ).
- MITM và nghe lén bị ngăn chặn; nhưng TLS không phải tấm khiên vạn năng.

---

## 2. Nền tảng mật mã — ôn nhanh

### 2.1. Mã hóa đối xứng (symmetric encryption)

**Là gì**: 2 bên dùng **cùng một khóa** để mã hóa và giải mã. Ví dụ: AES-128, AES-256, ChaCha20.

**Ưu điểm**: rất nhanh. AES-GCM trên phần cứng hiện đại: **1–10 GB/s**. Hoàn toàn phù hợp mã hóa dữ liệu thực tế.

**Vấn đề**: làm thế nào 2 bên trao khóa an toàn khi chưa có kênh bảo mật? Nếu gửi khóa qua mạng, kẻ nghe lén có khóa → giải mã được tất cả.

💡 **Hình dung**: 2 người cần nói chuyện bí mật nhưng chỉ có thể liên lạc qua bưu điện công khai. Không thể gửi chìa khóa qua bưu điện vì ai cũng có thể sao chép.

### 2.2. Mã hóa bất đối xứng (asymmetric encryption)

**Là gì**: mỗi bên có **cặp khóa**: khóa công khai (public key) và khóa bí mật (private key). Dữ liệu mã hóa bằng public key chỉ giải mã được bằng private key tương ứng — và ngược lại.

Ví dụ phổ biến: RSA-2048, RSA-4096, ECDSA (đường cong elliptic). Cho phép:
- **Mã hóa**: mã hóa bằng public key → chỉ người giữ private key giải được.
- **Chữ ký số (digital signature)**: ký bằng private key → bất kỳ ai có public key đều xác minh được tính xác thực và toàn vẹn.

**Nhược điểm**: **chậm hơn nhiều so với đối xứng**. RSA-2048 chỉ đạt vài KB/s cho mã hóa khối lớn — không thể dùng mã hóa cả luồng dữ liệu HTTP.

### 2.3. Hàm băm (hash function) và MAC/AEAD

**Hàm băm**: biến dữ liệu bất kỳ thành chuỗi cố định. Ví dụ SHA-256: `"hello" → e3b0...` (64 ký tự hex). Tính chất: không thể đảo ngược, thay đổi 1 bit đầu vào → hash hoàn toàn khác.

**MAC (Message Authentication Code)**: hash có khóa — chứng minh dữ liệu không bị sửa VÀ đến từ người giữ khóa đúng.

**AEAD (Authenticated Encryption with Associated Data)**: kết hợp mã hóa + xác thực toàn vẹn trong một thao tác. TLS 1.3 chỉ dùng các cipher suite AEAD (AES-GCM, ChaCha20-Poly1305).

### 2.4. Vì sao TLS kết hợp cả hai — mô hình hybrid

💡 **Phép ẩn dụ**: gặp người lạ cần trao bí mật.
1. Bạn dùng mã bất đối xứng (chậm, nhưng không cần gặp trước) để **trao an toàn một khóa tạm thời** (session key).
2. Sau khi cả 2 cùng có session key, dùng mã đối xứng (nhanh) để **mã hóa toàn bộ dữ liệu thực tế**.

TLS làm chính xác điều này:
- **Handshake** (bắt tay): dùng mật mã bất đối xứng/ECDHE để thỏa thuận session key — chỉ diễn ra 1 lần khi kết nối.
- **Record layer** (truyền dữ liệu): dùng AES-GCM hoặc ChaCha20-Poly1305 (đối xứng, nhanh) với session key vừa trao.

📝 **Tóm tắt mục 2**:
- Đối xứng: nhanh (GB/s), nhưng vấn đề trao khóa.
- Bất đối xứng: giải quyết trao khóa an toàn, nhưng chậm.
- TLS hybrid: bất đối xứng để trao session key → đối xứng mã hóa dữ liệu.

---

## 3. Bắt tay TLS — cốt lõi

### 3.1. Tổng quan luồng

TLS chạy trên TCP đã thiết lập (sau SYN/SYN-ACK/ACK). Client kết nối tới port **443** (HTTPS) hoặc cổng TLS tương ứng của dịch vụ khác.

```
Client                                       Server
  |                                             |
  |------------ TCP SYN/SYN-ACK/ACK ---------->|   (Tầng TCP — Lesson 08 Tier 1)
  |                                             |
  |===== BẮT ĐẦU HANDSHAKE TLS ================|
  |                                             |
  |---------- (1) ClientHello ---------------->|
  |<--------- (2) ServerHello + Certificate ---|
  |           (3) Key Exchange (ECDHE)          |   ← trong TLS 1.3 gộp vào bước 1-2
  |---------- (4) Finished (client) --------->|
  |<--------- (5) Finished (server) ----------|
  |                                             |
  |===== KẾT NỐI MÃ HÓA ĐÃ THIẾT LẬP =======|
  |                                             |
  |<======= HTTP/2 hay HTTP/1.1 (mã hóa) =====>|
```

### 3.2. Bước 1 — ClientHello

Client gửi bản tin đầu tiên, gồm:
- **TLS version**: phiên bản TLS cao nhất client hỗ trợ (ví dụ TLS 1.3).
- **Client random**: 32 byte ngẫu nhiên — dùng để sinh session key sau này.
- **Cipher suites**: danh sách các bộ thuật toán client hỗ trợ, theo thứ tự ưu tiên. Ví dụ:
  ```
  TLS_AES_256_GCM_SHA384
  TLS_AES_128_GCM_SHA256
  TLS_CHACHA20_POLY1305_SHA256
  TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256   (TLS 1.2)
  ```
- **Extensions**: SNI (Server Name Indication — tên domain client muốn kết nối), các nhóm đường cong elliptic hỗ trợ, v.v.

**SNI quan trọng**: nhiều server dùng cùng IP nhưng nhiều domain (virtual hosting). SNI cho server biết cần dùng chứng chỉ nào.

### 3.3. Bước 2 — ServerHello + Certificate

Server phản hồi:
- **ServerHello**: chọn TLS version và 1 cipher suite từ danh sách client đề xuất. Ví dụ chọn `TLS_AES_256_GCM_SHA384`. Gửi kèm **server random** (32 byte).
- **Certificate**: gửi chứng chỉ số (X.509) chứa public key của server và thông tin định danh. Được ký bởi Certificate Authority (CA) — giải thích ở mục 4.
- **CertificateVerify**: server dùng private key ký vào transcript (toàn bộ bản tin handshake đến lúc này) → chứng minh server thật sự giữ private key tương ứng với chứng chỉ.

### 3.4. Bước 3 — Key Exchange: ECDHE

ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) cho phép 2 bên cùng tính ra session key mà kẻ nghe lén không thể tái tạo, dù có ghi lại toàn bộ lưu lượng.

**Cơ chế ngắn gọn** (dùng ký hiệu đơn giản hóa):

```
Client chọn ngẫu nhiên: a (private)
Server chọn ngẫu nhiên: b (private)

Điểm cơ sở trên đường cong elliptic: G (công khai)

Client gửi: A = a·G  (public key client, dùng phép nhân trên đường cong)
Server gửi: B = b·G  (public key server)

Client tính: S = a·B = a·(b·G) = a·b·G
Server tính: S = b·A = b·(a·G) = a·b·G

Cả hai đều ra S = a·b·G — đây là shared secret.
Kẻ nghe lén chỉ thấy A, B, G → không thể tính S (bài toán discrete log trên đường cong).
```

Từ shared secret S + client random + server random → sinh ra **session key** (khóa phiên) bằng hàm sinh khóa (HKDF).

**Ephemeral** (tạm thời): mỗi phiên kết nối dùng một cặp `(a, b)` mới. Nếu kẻ tấn công sau này lấy được private key của server, vẫn không giải mã được các phiên cũ → đây là **forward secrecy (bí mật tiến về phía trước)**.

### 3.5. Bước 4 & 5 — Finished

- Client gửi bản tin `Finished`: là MAC của toàn bộ handshake, được mã hóa bằng session key. Mục đích: xác minh rằng cả 2 bên tính được cùng một session key và handshake không bị giả mạo.
- Server gửi `Finished` tương tự.

Sau bước này, **kết nối TLS được thiết lập**. Mọi dữ liệu HTTP sau đó đều được mã hóa bằng AES-GCM (hoặc ChaCha20) với session key.

### 3.6. TLS 1.2 vs TLS 1.3

| Đặc điểm | TLS 1.2 | TLS 1.3 |
|-----------|---------|---------|
| Round-trips để xong handshake | 2-RTT (full) | 1-RTT |
| Forward secrecy | Tùy cipher suite (ECDHE thì có, RSA thì không) | Bắt buộc (ECDHE/DHE luôn dùng) |
| Cipher suites | Hàng chục, nhiều cái cũ/yếu | Chỉ 5 (đều AEAD, đều mạnh) |
| 0-RTT (session resumption) | Không có | Có (gửi data ngay lập tức, nhưng có giới hạn về replay) |
| Phát hành | 2008 | 2018 (RFC 8446) |

**TLS 1.3 — 1-RTT handshake**: client đoán cipher suite và gửi key share ngay trong ClientHello → server trả lời xong trong 1 vòng → tiết kiệm 1 RTT so với 1.2.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Session key có bị lộ không nếu server bị hack sau này?"* — Với ECDHE (TLS 1.3 và TLS 1.2 + ECDHE): **không**, vì a, b là ephemeral — bị xóa ngay sau handshake. Kẻ tấn công không thể tái tạo session key từ private key server.
- *"TLS 1.0 và 1.1 thì sao?"* — Đã chính thức bị loại bỏ (RFC 8996, 2021). Các trình duyệt hiện đại từ chối kết nối TLS < 1.2.
- *"Làm thế nào biết kết nối đang dùng TLS phiên bản nào?"* — Trong Chrome: click vào biểu tượng khóa (🔒) → "Connection is secure" → xem chi tiết; hoặc dùng `openssl s_client -connect example.com:443`.

🔁 **Dừng lại tự kiểm tra**:

Trong TLS handshake, thứ tự nào đúng?
1. Certificate → ClientHello → ServerHello → Finished
2. ClientHello → ServerHello → Certificate → Finished
3. ServerHello → ClientHello → Certificate → Finished

<details>
<summary>Đáp án</summary>

Đáp án 2: ClientHello (client gửi trước) → ServerHello + Certificate (server phản hồi) → Key Exchange → Finished (cả hai bên). Đây là thứ tự chuẩn của TLS.

</details>

📝 **Tóm tắt mục 3**:
- ClientHello: đề xuất cipher suite + client random + SNI.
- ServerHello: chọn cipher suite + server random + certificate.
- ECDHE: trao key an toàn → sinh session key. Ephemeral = forward secrecy.
- Finished: xác nhận handshake nguyên vẹn, kết nối mã hóa bắt đầu.
- TLS 1.3: 1-RTT, forward secrecy bắt buộc, loại bỏ cipher suite yếu.

---

## 4. Chứng chỉ số và chuỗi tin cậy

### 4.1. Chứng chỉ số là gì?

**Chứng chỉ số (digital certificate)** là tài liệu điện tử chuẩn X.509, chứa:
- Tên miền (Common Name / Subject Alternative Name): ví dụ `*.google.com`.
- Public key của server.
- Tổ chức cấp chứng chỉ (CA — Certificate Authority): ví dụ `DigiCert SHA2 Secure Server CA`.
- Thời hạn hiệu lực: `Not Before / Not After` — thường 90 ngày (Let's Encrypt) đến 1 năm.
- Chữ ký số của CA trên toàn bộ nội dung trên.

💡 **Hình dung**: chứng chỉ giống như hộ chiếu — do một cơ quan có thẩm quyền (CA, như Bộ Ngoại giao) cấp, xác nhận danh tính người cầm. Trình duyệt tin chứng chỉ vì tin CA cấp ra nó.

### 4.2. Chuỗi tin cậy (chain of trust)

Trình duyệt không tin tất cả CA trực tiếp — chỉ tin một danh sách **root CA** được tích hợp sẵn (khoảng 100-150 root CA trong hệ điều hành / trình duyệt). Hệ thống cấp bậc:

```
Root CA (tự ký, private key cất offline)
    └── Intermediate CA (ký bởi Root CA)
            └── Leaf Certificate (ký bởi Intermediate CA)
                    = chứng chỉ của server thực sự
```

**Ví dụ thực tế** khi truy cập `https://github.com`:
```
DigiCert Global Root CA        ← root CA (trình duyệt tin)
  └── DigiCert SHA2 High Assurance Server CA   ← intermediate
        └── github.com         ← leaf (server gửi cho client)
```

**Quá trình xác minh**:
1. Client nhận leaf certificate của `github.com`.
2. Leaf được ký bởi intermediate `DigiCert SHA2 HA Server CA` → client xác minh chữ ký.
3. Intermediate được ký bởi root `DigiCert Global Root CA` → client xác minh chữ ký.
4. Root CA có trong danh sách tin cậy của trình duyệt → chuỗi tin cậy hoàn chỉnh.
5. Kiểm tra tên miền: CN/SAN của leaf phải khớp `github.com`.
6. Kiểm tra thời hạn: `Not After` chưa qua.
7. Kiểm tra thu hồi (revocation): CRL hoặc OCSP — chứng chỉ có bị thu hồi không?

**Tại sao cần intermediate CA?** Bảo vệ root CA: private key của root phải cực kỳ an toàn (thường cất offline trong thiết bị vật lý đặc biệt). Intermediate CA ký chứng chỉ hàng ngày → nếu bị xâm phạm, chỉ cần thu hồi intermediate, không ảnh hưởng root.

### 4.3. Cảnh báo "Không an toàn" — các trường hợp

| Cảnh báo | Nguyên nhân | Ý nghĩa thực tế |
|---------|------------|----------------|
| `NET::ERR_CERT_AUTHORITY_INVALID` | CA không được tin (self-signed, CA nội bộ) | Server dùng chứng chỉ tự ký — không ai xác minh danh tính. |
| `NET::ERR_CERT_DATE_INVALID` | Chứng chỉ hết hạn hoặc chưa có hiệu lực | Admin quên gia hạn; đồng hồ máy tính sai. |
| `NET::ERR_CERT_COMMON_NAME_INVALID` | Tên miền không khớp | Chứng chỉ `bank.com` nhưng đang truy cập `banc.com`. Có thể là MITM. |
| `NET::ERR_CERT_REVOKED` | Chứng chỉ bị thu hồi | CA thu hồi vì nghi ngờ private key bị lộ. |

**Self-signed certificate**: tự mình ký cho mình, không qua CA. Hợp lệ cho môi trường nội bộ, lab, testing; không phù hợp public internet vì không ai xác minh danh tính.

⚠ **Lỗi thường gặp**: bỏ qua cảnh báo chứng chỉ bằng cách nhấn "Tiếp tục (không an toàn)". Trên mạng công cộng, đây là rủi ro MITM thật sự — kẻ tấn công có thể đang trình bày chứng chỉ giả.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Ai cấp root CA? Ai kiểm soát danh sách đó?"* — Microsoft, Apple, Google, Mozilla tự duy trì danh sách root CA cho hệ điều hành / trình duyệt. Muốn được thêm vào, CA phải qua kiểm toán nghiêm ngặt (WebTrust, ETSI).
- *"Let's Encrypt là gì?"* — CA miễn phí, tự động (dùng giao thức ACME), cấp chứng chỉ 90 ngày. Tính đến 2024, chiếm > 50% chứng chỉ web trên toàn cầu.
- *"Chứng chỉ wildcard là gì?"* — Chứng chỉ dạng `*.example.com` bao phủ mọi subdomain một cấp: `api.example.com`, `www.example.com`, nhưng không bao phủ `sub.api.example.com`.

🔁 **Dừng lại tự kiểm tra**:

Trình duyệt thấy cảnh báo "Chứng chỉ hết hạn" nhưng bạn chắc chắn đây là trang ngân hàng thật. Bạn có nên tiếp tục?

<details>
<summary>Đáp án</summary>

Không nên. Dù trang có vẻ quen thuộc, chứng chỉ hết hạn nghĩa là xác thực TLS thất bại. Có thể (1) admin ngân hàng quên gia hạn — vẫn an toàn nhưng cần báo cho ngân hàng; hoặc (2) bạn đang bị MITM với chứng chỉ cũ bị lộ. Cách an toàn: không tiếp tục, liên hệ ngân hàng qua kênh khác.

</details>

📝 **Tóm tắt mục 4**:
- Chứng chỉ X.509: chứa tên miền + public key + chữ ký CA.
- Chuỗi tin cậy: root CA → intermediate → leaf. Trình duyệt xác minh từng bước.
- Cảnh báo "không an toàn" = một trong các kiểm tra thất bại: CA không tin, hết hạn, tên không khớp, bị thu hồi.

---

## 5. HTTPS và các tính năng bổ sung

### 5.1. HTTPS = HTTP over TLS

HTTPS không phải giao thức mới — đơn giản là:
```
HTTP (tầng ứng dụng)
  └── TLS (mã hóa + xác thực)
       └── TCP port 443
            └── IP
```

Mọi thứ của HTTP ([Lesson 03](../lesson-03-http-basics/)) vẫn giữ nguyên: phương thức GET/POST, status code 200/404/301, header `Content-Type`, v.v. TLS hoàn toàn trong suốt với HTTP — HTTP không "biết" đang chạy trên TLS.

Điểm khác duy nhất: cổng mặc định là **443** thay vì **80**.

### 5.2. HSTS — HTTP Strict Transport Security

**Vấn đề**: lần đầu truy cập `http://bank.com`, trình duyệt gửi HTTP rõ → MITM có thể chen vào trước khi redirect sang HTTPS.

**Giải pháp HSTS**: server gửi header:
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

Sau khi nhận header này, trình duyệt tự động dùng HTTPS cho domain đó trong 31536000 giây (1 năm) — ngay cả khi bạn gõ `http://`.

**HSTS Preload**: danh sách các domain được mã cứng vào trình duyệt từ trước (chromium.org/hsts). Domain trên danh sách này sẽ LUÔN dùng HTTPS, ngay cả lần truy cập đầu tiên.

### 5.3. Forward Secrecy — bí mật tiến về phía trước

**Định nghĩa**: nếu private key của server bị lộ trong tương lai, kẻ tấn công vẫn **không thể giải mã các phiên kết nối đã qua**.

**Vì sao TLS 1.2 không phải lúc nào cũng có**:
- Nếu TLS 1.2 dùng RSA key exchange (cũ): client mã hóa pre-master secret bằng public key server → kẻ tấn công ghi lại lưu lượng + sau này lấy được private key → giải mã được.
- Nếu TLS 1.2 dùng ECDHE: ephemeral key `a, b` bị xóa sau phiên → private key server lộ cũng không giải được.

**TLS 1.3 bắt buộc ECDHE** → forward secrecy luôn đảm bảo.

📝 **Tóm tắt mục 5**:
- HTTPS = HTTP + TLS, cổng 443. Không thay đổi ngữ nghĩa HTTP.
- HSTS: trình duyệt tự enforce HTTPS, ngăn downgrade attack.
- Forward secrecy: ephemeral key đảm bảo phiên cũ không thể giải mã dù key server bị lộ sau này.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Thứ tự handshake:
Sắp xếp các bước sau đây theo đúng thứ tự trong TLS handshake:
(A) Client gửi Finished  
(B) Server gửi Certificate  
(C) Client gửi ClientHello  
(D) Server gửi Finished  
(E) Server gửi ServerHello  

**Bài 2** — Vai trò khóa:
Trong TLS handshake ECDHE, hãy cho biết:
(a) Khóa nào được dùng để mã hóa dữ liệu HTTP thực tế (request, response)?
(b) Khóa nào được dùng để xác minh danh tính server?
(c) Tại sao session key không được gửi trực tiếp qua mạng?

**Bài 3** — Phân tích cipher suite:
Cho cipher suite: `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
Giải thích từng thành phần: ECDHE, RSA, AES-128-GCM, SHA256 đảm nhiệm vai trò gì trong TLS?

**Bài 4** — Chuỗi tin cậy:
Bạn truy cập `https://api.startup.io` và thấy lỗi `NET::ERR_CERT_AUTHORITY_INVALID`.
(a) Nêu 3 nguyên nhân có thể gây ra lỗi này.
(b) Giải thích vì sao trình duyệt không tin chứng chỉ self-signed.
(c) Cách khắc phục đúng đắn nhất là gì?

**Bài 5** — Tình huống tấn công:
Alice đang dùng Wi-Fi sân bay để truy cập trang ngân hàng. Kẻ tấn công đã thiết lập access point giả cùng tên. Kẻ tấn công dùng chứng chỉ tự ký cho `bank.com`.
(a) TLS bảo vệ Alice như thế nào trong tình huống này?
(b) Trình duyệt của Alice sẽ hiển thị gì?
(c) Nếu Alice bỏ qua cảnh báo, điều gì xảy ra?

**Bài 6** — So sánh TLS 1.2 và 1.3:
Giải thích vì sao TLS 1.3 nhanh hơn TLS 1.2 về mặt số round-trips. Vẽ sơ đồ đơn giản minh họa sự khác biệt. Trong hoàn cảnh nào nên upgrade lên TLS 1.3?

### Lời giải chi tiết

**Bài 1 — Thứ tự handshake**:

Đúng: **C → E → B → A → D**

- (C) ClientHello: client khởi động, gửi danh sách cipher suite, client random.
- (E) ServerHello: server chọn cipher suite, gửi server random.
- (B) Certificate: server gửi chứng chỉ (thường đi cùng ServerHello).
- (A) Client Finished: sau khi xác minh certificate và tính session key, client xác nhận handshake.
- (D) Server Finished: server xác nhận kết nối an toàn đã thiết lập.

**Bài 2 — Vai trò khóa**:

(a) **Session key (khóa phiên)** — khóa đối xứng (AES-128 hoặc AES-256) được sinh ra từ shared secret ECDHE + random nonces. Đây là khóa mã hóa dữ liệu HTTP thực tế.

(b) **Private key của server** (RSA hoặc ECDSA) được dùng để ký chứng chỉ trong bước CertificateVerify, chứng minh server sở hữu khóa bí mật tương ứng với public key trong chứng chỉ.

(c) Session key không gửi trực tiếp vì nghe lén sẽ thu được nó. Thay vào đó, ECDHE cho phép cả 2 bên **độc lập tính ra cùng một giá trị** từ thông tin trao đổi công khai ($A = a \cdot G$, $B = b \cdot G$) — kẻ thứ 3 thấy $A$, $B$ nhưng không tính được $S = a \cdot b \cdot G$.

**Bài 3 — Phân tích cipher suite**:

`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`:

- **ECDHE**: Elliptic Curve Diffie-Hellman Ephemeral — thuật toán trao đổi khóa (key exchange). Ephemeral đảm bảo forward secrecy.
- **RSA**: thuật toán xác thực server — server dùng RSA private key để ký chứng chỉ/handshake transcript.
- **AES-128-GCM**: mã hóa đối xứng cho dữ liệu thực tế. AES-128 = độ dài khóa; GCM = Galois/Counter Mode (AEAD — vừa mã hóa vừa xác thực toàn vẹn).
- **SHA256**: hàm băm dùng trong HKDF để sinh session key từ shared secret và random nonces.

**Bài 4 — Chuỗi tin cậy**:

(a) Ba nguyên nhân có thể:
1. Chứng chỉ self-signed — không có CA ký, trình duyệt không xác minh được.
2. CA cấp chứng chỉ không có trong danh sách tin cậy của trình duyệt (CA nội bộ, CA ít phổ biến).
3. Chuỗi intermediate CA không đầy đủ — server quên gửi kèm intermediate certificate.

(b) Trình duyệt không tin self-signed vì: không có bên thứ ba đáng tin cậy nào xác minh rằng domain này thật sự thuộc về chủ thể trong chứng chỉ. Bất kỳ ai cũng có thể tạo chứng chỉ self-signed cho `bank.com` — không chứng minh được họ thật sự kiểm soát `bank.com`.

(c) Cách đúng: sử dụng chứng chỉ từ CA được tin cậy. Cho dịch vụ công khai: Let's Encrypt (miễn phí, tự động). Cho nội bộ: triển khai CA nội bộ và cài root certificate vào các máy cần thiết.

**Bài 5 — Tình huống MITM**:

(a) TLS bảo vệ qua bước xác thực certificate: khi kẻ tấn công trình bày chứng chỉ cho `bank.com`, trình duyệt kiểm tra:
- Chứng chỉ có được ký bởi CA tin cậy không? → Chứng chỉ self-signed → KHÔNG.
- Chuỗi tin cậy không hoàn chỉnh → kết nối bị từ chối.

(b) Trình duyệt Alice hiển thị cảnh báo `NET::ERR_CERT_AUTHORITY_INVALID` (Chrome) hoặc tương đương, ngăn không cho tiến vào trang.

(c) Nếu Alice bỏ qua cảnh báo (nhấn "Tiếp tục"): TLS vẫn mã hóa nhưng **với khóa của kẻ tấn công, không phải ngân hàng thật**. Kẻ tấn công đọc được mọi thông tin — username, mật khẩu, OTP — rồi chuyển tiếp đến ngân hàng thật. Alice không biết mình đang bị tấn công.

**Bài 6 — TLS 1.2 vs 1.3**:

TLS 1.2 full handshake (2-RTT):
```
Client → Server: ClientHello                        ── RTT 1 bắt đầu
Client ← Server: ServerHello + Certificate + ServerHelloDone
Client → Server: ClientKeyExchange + ChangeCipherSpec + Finished  ── RTT 1 kết thúc
Client ← Server: ChangeCipherSpec + Finished        ── RTT 2 kết thúc
[Dữ liệu HTTP bắt đầu ở đây]
```

TLS 1.3 (1-RTT):
```
Client → Server: ClientHello + KeyShare              ── RTT 1 bắt đầu
Client ← Server: ServerHello + KeyShare + Certificate + Finished  ── RTT 1 kết thúc
Client → Server: Finished
[Dữ liệu HTTP bắt đầu ngay sau]
```

TLS 1.3 nhanh hơn vì: client gửi key share (ECDHE public key) ngay trong ClientHello, server có thể tính shared secret ngay và gửi Finished trong cùng response — tiết kiệm 1 round-trip.

Nên upgrade khi: server hỗ trợ (OpenSSL 1.1.1+, nginx 1.13+, Apache 2.4.37+), client dùng trình duyệt hiện đại. Hầu hết hệ thống hiện tại (2024) nên chạy TLS 1.3 là mặc định.

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề HTTP**: [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) — HTTPS dùng toàn bộ cơ chế này.
- **TCP là nền**: [Lesson 08 (Tier 1) — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — TLS chạy sau TCP handshake.
- **Tấn công MITM chi tiết**: [../../03-Advanced-Operations/lesson-02-attacks-defense/](../../03-Advanced-Operations/lesson-02-attacks-defense/).
- **Mật mã học sâu hơn**: [../../../Cryptography/](../../../Cryptography/) — AES, RSA, ECDH, SHA chi tiết.
- **Bài tiếp theo**: [Lesson 07 — Real-time & WebSocket](../lesson-07-realtime-websocket/) — kết nối hai chiều liên tục, cũng chạy trên TLS (wss://).

---

## 📝 Tổng kết Lesson 06

1. **HTTP truyền plaintext** — bất kỳ ai trên đường mạng đều đọc được. TLS giải quyết bằng 3 đảm bảo: bí mật, toàn vẹn, xác thực.
2. **TLS = hybrid**: bất đối xứng (ECDHE) để trao session key an toàn; đối xứng (AES-GCM) để mã hóa dữ liệu tốc độ cao.
3. **Handshake TLS**: ClientHello → ServerHello + Certificate → ECDHE key exchange → Finished. TLS 1.3 tiết kiệm 1 RTT so với 1.2.
4. **Chứng chỉ số**: xác minh danh tính server. Chuỗi tin cậy root CA → intermediate → leaf; trình duyệt xác minh từng nút.
5. **Forward secrecy (ECDHE ephemeral)**: private key server lộ sau này không giải mã được phiên cũ — TLS 1.3 bắt buộc.
6. **HTTPS**: HTTP chạy trên TLS, port 443. HSTS ngăn downgrade. Cảnh báo trình duyệt = kiểm tra certificate thất bại — không bao giờ bỏ qua tùy tiện.
