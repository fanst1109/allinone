// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-47-tls-crypto-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 47 — TLS & Crypto Basics

> Tier 4 · Bài 6/12 — sau khi đã có [Lesson 46 — Authentication & JWT](../lesson-46-authentication-jwt/),
> bài này đi sâu vào **lớp bảo mật bên dưới** của một dịch vụ: TLS đảm bảo "đường ống" không bị nghe lén,
> certificate xác thực "tao đúng là server của ngân hàng X", và \`crypto/*\` của Go cho bạn các primitive
> (hash, HMAC, AES, RSA, random) để tự bảo vệ dữ liệu trong DB hoặc giữa các service.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Phân biệt **3 đảm bảo TLS** mang lại: confidentiality (mã hoá), authentication (xác thực server),
   integrity (chống chỉnh sửa) — và biết TLS **không** bảo vệ cái gì.
2. Hiểu **TLS handshake** (TLS 1.3) đủ chi tiết để debug: Client Hello → Server Hello → key share →
   Finished, mất 1-RTT, share key bằng ECDHE.
3. Biết **certificate là gì** (X.509 wrap public key + identity, signed bởi CA) và **trust chain**
   leaf → intermediate → root.
4. Cài được HTTPS server Go bằng \`http.ListenAndServeTLS\` và tuỳ chỉnh \`tls.Config\`.
5. Dùng **Let's Encrypt** qua \`golang.org/x/crypto/acme/autocert\` cho production miễn phí.
6. Hiểu **mTLS** — vì sao service-to-service trong cluster nên dùng mTLS thay vì JWT.
7. Dùng đúng \`crypto/*\` stdlib: SHA-256, HMAC-SHA-256, AES-GCM, RSA, \`crypto/rand\`.
8. Biết tránh ≥ 5 antipattern crypto thường gặp (skipVerify, nonce reuse, \`math/rand\` cho token, MD5/SHA1
   cho password, hardcode key).

## Kiến thức tiền đề

- [Lesson 42 — net/http Deep](../lesson-42-http-net-deep/) — vì TLS gắn vào \`http.Server\`.
- [Lesson 46 — Authentication & JWT](../lesson-46-authentication-jwt/) — JWT signing dùng HMAC/RSA,
   đụng tới \`crypto/hmac\` ở mức cao.
- (Có ích) [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/) cho base64/PEM.

---

## 1. TLS là gì — 3 đảm bảo trên một câu

**TLS (Transport Layer Security)** là một protocol nằm **giữa TCP và HTTP**, làm 3 việc:

| Đảm bảo | Câu chuyện | Công cụ |
|---------|-----------|---------|
| **Confidentiality** (bí mật) | Wifi quán cafe không đọc được mật khẩu bạn gõ | Symmetric encryption (AES-GCM, ChaCha20) |
| **Authentication** (xác thực) | Bạn biết chắc đang nói chuyện với \`bank.com\` thật, không phải kẻ giả mạo | Certificate signed by CA |
| **Integrity** (toàn vẹn) | Không kẻ nào sửa được "chuyển 100$" thành "chuyển 10000$" giữa đường | MAC / AEAD tag |

> 💡 **Trực giác.** TCP đưa byte từ máy A đến máy B; **TLS đưa byte một cách an toàn**. Hình dung TCP là
> ống nước, TLS là lớp **ống bọc thép có khoá** — kẻ đứng ngoài thấy có nước chảy, nhưng không biết nội dung,
> không biết đầu kia là ai, và không chọc thủng để pha bẩn được.

### 1.1 TLS KHÔNG bảo vệ cái gì

Đây là phần hay bị hiểu nhầm:

- TLS **không** bảo vệ dữ liệu **sau khi đến server**. Server log mật khẩu plaintext thì TLS vô dụng.
- TLS **không** bảo vệ **endpoint** bị compromise (server bị hack, client bị malware).
- TLS **không** che giấu **siêu dữ liệu**: kẻ nghe vẫn thấy bạn kết nối tới \`bank.com:443\`, kích thước
   request/response, timing. (Tổ chức cao cấp có thể đoán nội dung từ pattern timing.)
- TLS **không** thay thế **authorization** — sau khi TLS bắt tay xong, server vẫn phải kiểm tra
   "user này có quyền xem record này không?" (chính là việc của L46 — JWT/session).

> ❓ **"Vậy HTTPS rồi có cần JWT/session nữa không?"**
> Có. HTTPS xác thực **server** (client biết đang nói chuyện với đúng \`bank.com\`); JWT/session
> xác thực **user** (server biết request này là của Alice). Hai tầng khác nhau. Trừ khi dùng **mTLS**
> (mục 6), khi đó client cũng có cert → có thể bỏ JWT.

### 1.2 Câu chuyện vì sao TLS tồn tại

Trước HTTPS phổ biến (~2010), kẻ ngồi cùng mạng Wifi với bạn có thể dùng tool như **Firesheep** chiếm
session Facebook của bạn chỉ bằng cách đọc cookie bay qua HTTP. Sau scandal Snowden 2013 và tiền hóa
Let's Encrypt 2015, HTTPS trở thành mặc định — bây giờ Chrome **chủ động cảnh báo** trang HTTP là "Not secure".

> 📝 **Tóm tắt mục 1.** TLS = mã hoá + xác thực server + chống sửa, nằm giữa TCP và HTTP. Không thay
> được phân quyền, không cứu được endpoint bị hack, không giấu được metadata (host, size, timing).

---

## 2. TLS 1.2 vs TLS 1.3 — vì sao 1.3 nhanh hơn và an toàn hơn

TLS 1.2 ra 2008, TLS 1.3 ra 2018 (RFC 8446). 1.3 là **bản viết lại có chủ đích**, không phải tweak.

| Khía cạnh | TLS 1.2 | TLS 1.3 |
|-----------|---------|---------|
| **Handshake RTT** | 2 round-trip trước khi gửi data | **1 round-trip** (hoặc 0-RTT nếu resume) |
| **Cipher list** | ~37 cipher suite, nhiều cái yếu (RC4, 3DES, CBC mode) | **5 cipher suite** AEAD only |
| **Key exchange** | RSA hoặc DHE hoặc ECDHE — tuỳ cipher | **Bắt buộc (EC)DHE** — forward secrecy luôn |
| **Hash trong handshake** | MD5/SHA1 vẫn còn (đã bị broken) | SHA-256/384 |
| **Renegotiation** | Có (từng gây CVE) | Bỏ |
| **Compression** | Có (CRIME attack 2012) | Bỏ |

> 💡 **Trực giác về RTT.** Bạn ở Hà Nội kết nối tới server Mỹ, ping ~200ms một chiều. TLS 1.2 cần
> 2 round-trip = **800ms thuần handshake** trước khi gửi byte HTTP đầu tiên. TLS 1.3 cần 1 round-trip
> = **400ms**. Khi load 1 trang có 20 resource từ 5 domain khác nhau, chênh lệch này tính bằng giây.

### 2.1 Forward secrecy — vì sao quan trọng

**Forward secrecy** = nếu sau này private key của server bị lộ, **không** giải mã được traffic cũ đã ghi.

Cách hoạt động: trong handshake, client+server **không** dùng private key của server để mã hoá data.
Họ tạo một **session key tạm thời** bằng ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) — sau khi
session kết thúc, key bị vứt. Private key của server **chỉ dùng để ký** tham số ECDHE để chứng minh
"server là chính chủ".

> ⚠ **Lỗi thường gặp.** TLS 1.2 với cipher \`TLS_RSA_*\` (không có ECDHE) **không có forward secrecy** —
> server private key vẫn mã hoá session key. NSA bị nghi từng làm điều này: ghi lại traffic, đợi 10 năm
> sau lấy được key thì giải mã tất. TLS 1.3 buộc ECDHE → vấn đề biến mất.

### 2.2 Cipher suite TLS 1.3 chỉ còn 5 cái

\`\`\`
TLS_AES_128_GCM_SHA256
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_CCM_SHA256
TLS_AES_128_CCM_8_SHA256
\`\`\`

Tất cả là **AEAD** (Authenticated Encryption with Associated Data) — mã hoá và xác thực toàn vẹn trong
1 bước. Không còn các MAC-then-Encrypt / Encrypt-then-MAC riêng dễ sai khi implement.

> ❓ **"Tôi cần biết tên cipher suite không?"**
> Nói chung **không** — Go stdlib chọn giúp. Chỉ khi compliance bắt phải tắt cipher cũ (PCI-DSS,
> FIPS), bạn mới đụng \`tls.Config.CipherSuites\`. Còn thường: để mặc định.

### 2.3 Hỗ trợ thực tế

- **TLS 1.3**: Chrome/Firefox/Safari từ ~2018, Go từ 1.12. **Phần lớn web hiện nay là 1.3**.
- **TLS 1.2**: vẫn được phép cho compat client cũ.
- **TLS 1.0, 1.1**: đã bị **deprecate** chính thức 2020. Browser từ chối. Production phải tắt.
- **SSL 3.0**: bị POODLE 2014, **không bao giờ** bật lại.

> 🔁 **Dừng lại tự kiểm.**
> *Server bạn đang chạy hiện nay tối thiểu phải support TLS version nào?*
> <details><summary>Đáp án</summary>
> TLS 1.2 (bắt buộc) + TLS 1.3 (khuyến nghị). Phải **tắt 1.0/1.1**. Trong Go:
> \`tls.Config{MinVersion: tls.VersionTLS12}\`.
> </details>

---

## 3. TLS handshake — bước-từng-bước với số cụ thể

Đây là sơ đồ TLS 1.3 đã đơn giản hoá (bỏ chi tiết extension, chỉ giữ flow chính):

\`\`\`
                       Client                          Server
                       ------                          ------
  RTT 1 (gửi đi)   →   ClientHello                  →
                       - random_c (32 byte)
                       - cipher_suites_list
                       - key_share (EC point client)
                       - server_name = "bank.com" (SNI)

  RTT 1 (về)       ←   ServerHello + ...            ←
                       - random_s (32 byte)
                       - cipher_chosen
                       - key_share (EC point server)
                       - {Certificate}    (đã mã hoá)
                       - {CertVerify}     (ký random_c||random_s bằng priv key)
                       - {Finished}       (MAC handshake transcript)

         (tại điểm này cả 2 bên đã tính được session_key)

  Client verify:
   - chain certificate hợp lệ?
   - tên trong cert = "bank.com"?
   - chữ ký CertVerify đúng với public key trong cert?
   - Finished MAC khớp?

  RTT 2 (gửi đi)   →   {Finished}                   →
                       (rồi luôn application data)

         Application data mã hoá session_key (AES-GCM…) từ đây trở đi
\`\`\`

### 3.1 Walk-through bằng số

Giả sử kết nối tới \`bank.com\`:

1. **Client Hello** (gửi plaintext):
   - \`random_c = 0x7f3a... (32 byte ngẫu nhiên từ crypto/rand)\`
   - \`cipher_list = [TLS_AES_128_GCM_SHA256, TLS_CHACHA20_POLY1305_SHA256]\`
   - \`key_share\`: client tạo cặp khoá ECDHE tạm \`(priv_c, pub_c)\` với curve x25519, gửi \`pub_c\`.
   - \`SNI = "bank.com"\` — báo cho server "tao muốn nói chuyện với bank.com" (1 IP có thể serve nhiều domain).

2. **Server Hello** (plaintext) + phần còn lại (đã encrypt bằng key tạm tính được):
   - \`random_s = 0xa192... \`
   - \`cipher_chosen = TLS_AES_128_GCM_SHA256\`
   - \`key_share\`: server cũng tạo \`(priv_s, pub_s)\`, gửi \`pub_s\`.
   - **Cả hai bên** tính \`shared = ECDH(priv, peer_pub)\` → ra cùng một secret 32 byte (toán Diffie-Hellman).
   - Từ \`shared + random_c + random_s\` derive \`session_key\` qua HKDF.
   - Server gửi tiếp \`Certificate\` (chain X.509), \`CertVerify\` (ký toàn bộ transcript handshake bằng
     private key tương ứng public key trong cert) và \`Finished\` (MAC).

3. **Client verify** (việc nặng nhất phía client):
   - Cert chain \`leaf → intermediate → root\`. Root phải nằm trong **trust store của OS/browser**.
   - \`subject\` hoặc \`subjectAltName\` của leaf cert có chứa \`"bank.com"\`? (Nếu không khớp → cảnh báo
     đỏ lè trên Chrome.)
   - Cert chưa hết hạn? Chưa bị revoke (qua OCSP/CRL)?
   - Chữ ký \`CertVerify\` verify được bằng public key trong cert → chứng minh server đang giữ
     **private key tương ứng** chứ không phải kẻ giả copy cert.

4. **Client Finished**: gửi MAC riêng. Từ đây trở đi là application data mã hoá AES-GCM.

> ❓ **"Vì sao client phải ký gì đâu mà có khoá riêng?"**
> Cặp khoá ECDHE client tạo ở bước 1 là **ephemeral** (một lần dùng), KHÔNG phải khoá identity.
> Mục đích chỉ để **trao đổi shared secret** không bị nghe lén. Sau khi bắt tay xong, vứt. Trong
> mTLS (mục 6) client mới có cert + private key cố định để xác thực.

### 3.2 Vì sao 1.3 chỉ 1-RTT mà 1.2 cần 2-RTT?

TLS 1.2 chia làm 2 round trip vì server **chờ cipher suite được chọn rồi mới gửi key_share**. TLS 1.3
**đoán trước** — client gửi luôn \`key_share\` ngay trong ClientHello cho curve x25519/p256 (gần như chắc
chắn server support), nếu server không thích thì có thể HelloRetryRequest (rất hiếm).

> ⚠ **Lỗi thường gặp.** Bạn benchmark thấy "HTTPS chậm hơn HTTP X ms" rồi đổ tại TLS. Phải biết X ms này
> chia làm: handshake (chỉ trên connection đầu tiên) vs application encrypt overhead (vài %). Với
> **connection reuse** (HTTP keep-alive, HTTP/2 single connection), handshake amortize gần bằng 0.

> 🔁 **Dừng lại tự kiểm.**
> *Trong TLS 1.3, traffic bị ghi lại 5 năm. Sau 5 năm private key của server bị lộ. Kẻ tấn công có
> đọc được nội dung cũ không?*
> <details><summary>Đáp án</summary>
> **Không**. TLS 1.3 buộc dùng ECDHE → session_key derive từ <code>shared</code> chỉ tồn tại trong RAM
> hai bên một lần, vứt sau session. Private key chỉ dùng ký <code>CertVerify</code>, không dùng để mã
> hoá traffic. Đây là forward secrecy.
> </details>

> 📝 **Tóm tắt mục 3.** Handshake = client+server trao đổi ngẫu nhiên + key share ECDHE, server gửi cert,
> client verify, hai bên derive session key. TLS 1.3 chỉ 1-RTT, dùng ECDHE bắt buộc → forward secrecy.

---

## 4. Certificate — X.509 là cái gì

**Certificate** là một file format chuẩn (**X.509**) đóng gói:

\`\`\`
{
  Subject:        CN=bank.com, O=Big Bank Inc, C=US
  SubjectAltName: [DNS:bank.com, DNS:www.bank.com, DNS:*.bank.com]
  Issuer:         CN=GlobalSign RSA OV SSL CA 2018
  NotBefore:      2024-09-01T00:00:00Z
  NotAfter:       2025-09-30T23:59:59Z
  PublicKey:      RSA 2048 / ECDSA P-256
  Signature:      <chữ ký của Issuer trên hash của tất cả field trên>
  Extensions:     KeyUsage, ExtendedKeyUsage, CRL, OCSP, ...
}
\`\`\`

Format truyền tải:

- **DER**: binary, compact.
- **PEM**: base64 của DER, bọc \`-----BEGIN CERTIFICATE-----\` / \`-----END CERTIFICATE-----\`. Đây là
   dạng bạn thấy trong file \`cert.pem\`. Nhiều cert nối tiếp trong cùng file = chain.

### 4.1 Walk-through đọc một cert thật

\`\`\`bash
openssl s_client -connect bank.com:443 -showcerts < /dev/null | openssl x509 -text -noout
\`\`\`

Bạn sẽ thấy:

\`\`\`
Issuer: C=BE, O=GlobalSign nv-sa, CN=GlobalSign RSA OV SSL CA 2018
Validity
    Not Before: Sep  1 00:00:00 2024 GMT
    Not After : Sep 30 23:59:59 2025 GMT
Subject: C=US, O=Big Bank Inc, CN=bank.com
Subject Public Key Info:
    Public Key Algorithm: rsaEncryption
        Public-Key: (2048 bit)
        Modulus: 00:c1:7d:8b:...
Signature Algorithm: sha256WithRSAEncryption
    47:9a:3b:...
\`\`\`

> ❓ **"Cert có giấu private key trong đó không?"**
> **KHÔNG.** Cert chỉ có **public key**. Private key tương ứng phải được giữ trên server, **không bao
> giờ rời server**. Bạn thấy file \`key.pem\` ở server cạnh \`cert.pem\` chính là cái này. Lộ \`key.pem\` =
> kẻ khác giả được server bạn. (Cho đến khi cert hết hạn / bị revoke.)

### 4.2 Subject Alternative Name (SAN) — quan trọng

Trình duyệt hiện nay **bỏ qua field \`Subject\` cũ** và CHỈ đọc \`SubjectAltName\`. Một cert có thể chứa nhiều DNS:

\`\`\`
SubjectAltName: DNS:bank.com, DNS:www.bank.com, DNS:api.bank.com, DNS:*.bank.com
\`\`\`

Wildcard \`*.bank.com\` match \`api.bank.com\` nhưng **không** match \`api.dev.bank.com\` (chỉ 1 cấp).

> ⚠ **Lỗi thường gặp.** Self-signed cert tự generate \`CN=localhost\` nhưng quên SAN → Chrome báo
> \`NET::ERR_CERT_COMMON_NAME_INVALID\` dù bạn truy cập đúng \`https://localhost\`. Phải set SAN khi tạo.

---

## 5. Trust chain — vì sao một cert tự ký không đủ

Trust hoạt động theo chuỗi:

\`\`\`
[Leaf cert: bank.com]
      │ signed by
      ▼
[Intermediate: GlobalSign RSA OV SSL CA 2018]
      │ signed by
      ▼
[Root: GlobalSign Root CA - R3]
      │
      └─── ĐÃ ĐƯỢC OS/BROWSER tin sẵn (built-in trust store)
\`\`\`

Khi handshake, server gửi \`leaf + intermediate(s)\` (KHÔNG gửi root — client đã có sẵn). Client xác minh:

1. Chữ ký trên leaf verify bằng public key của intermediate? ✓
2. Chữ ký trên intermediate verify bằng public key của root? ✓
3. Root có trong trust store của tôi? ✓ → tin tưởng.

### 5.1 Self-signed cert

Khi bạn tự ký bằng \`openssl req -x509 ...\`, cert là root **của chính nó** — không có cha. OS/browser
không có root này → cảnh báo "Your connection is not private" + \`NET::ERR_CERT_AUTHORITY_INVALID\`.

**Use case hợp lệ của self-signed**:
- Development local (\`localhost\`).
- Internal infrastructure trong cluster (kèm cài root của tổ chức vào trust store mọi máy).
- Test môi trường.

**KHÔNG dùng cho user-facing production** — người dùng sẽ học thói quen bấm "Advanced > Proceed
anyway" → ngày nào đó họ bấm đúng vào trang giả mạo thật.

### 5.2 Let's Encrypt — cert miễn phí tự động

[Let's Encrypt](https://letsencrypt.org) là CA phi lợi nhuận, cấp cert miễn phí qua protocol **ACME**:

1. Client (certbot, acme.sh, hoặc Go lib \`golang.org/x/crypto/acme/autocert\`) gửi yêu cầu cho domain
   \`bank.com\`.
2. ACME server trả về **challenge** — ví dụ HTTP-01: "đặt file \`/.well-known/acme-challenge/<token>\`
   có nội dung X tại \`http://bank.com/\`".
3. Client đặt file. ACME server đi crawl thử — nếu thấy đúng → bạn chứng minh được bạn kiểm soát domain.
4. ACME server cấp cert, hạn 90 ngày.
5. Renew tự động trước khi hết hạn.

\`\`\`go
// Go autocert — production server tự lo cert
import "golang.org/x/crypto/acme/autocert"

m := &autocert.Manager{
    Prompt:     autocert.AcceptTOS,
    HostPolicy: autocert.HostWhitelist("bank.com", "www.bank.com"),
    Cache:      autocert.DirCache("/var/cache/letsencrypt"),
}
server := &http.Server{
    Addr:      ":443",
    TLSConfig: m.TLSConfig(),
    Handler:   myHandler,
}
go http.ListenAndServe(":80", m.HTTPHandler(nil)) // serve HTTP-01 challenge + redirect
log.Fatal(server.ListenAndServeTLS("", ""))       // empty = lấy từ autocert
\`\`\`

> 💡 **Trực giác.** Trước Let's Encrypt (2015), cert giá ~50-500$/năm, mua qua reseller, mất 1-2 ngày
> issue. Sau LE: free, 1 phút có cert. Đó là lý do từ 2015-2020 lượng site HTTPS từ ~30% lên ~95%.

> ⚠ **Lỗi thường gặp.**
> - Forget renew → cert hết hạn → site sập (đã từng xảy ra với GitHub, Microsoft Teams). Autocert
>    tự renew nên dùng được.
> - HostPolicy không khai báo domain → autocert refuse cấp → log bí ẩn. Phải \`HostWhitelist(...)\`.

> 🔁 **Dừng lại tự kiểm.**
> *Self-signed cert + dùng cho production user-facing — vì sao là antipattern?*
> <details><summary>Đáp án</summary>
> 1) User thấy cảnh báo đỏ → mất niềm tin. 2) User học thói quen click "Proceed anyway" → ngày nào đó
> bấm đúng vào trang phishing thật. 3) HSTS sẽ không hoạt động (browser từ chối store HSTS từ trang
> warning). Giải pháp: Let's Encrypt, free.
> </details>

> 📝 **Tóm tắt mục 4-5.** Cert = X.509 wrap public key + identity, signed bởi CA. Chain leaf → intermediate
> → root, root nằm trong trust store. Self-signed dùng cho dev/internal. Production dùng Let's Encrypt
> qua \`acme/autocert\`.

---

## 6. HTTPS server Go — cách dùng

### 6.1 Cách đơn giản nhất: \`ListenAndServeTLS\`

\`\`\`go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello over TLS! Proto=%s\\n", r.TLS.Version)
    })
    // Cert + key sinh tay bằng openssl hoặc tự generate runtime
    log.Fatal(http.ListenAndServeTLS(":8443", "cert.pem", "key.pem", nil))
}
\`\`\`

Sinh cert dev nhanh bằng openssl:

\`\`\`bash
openssl req -x509 -newkey rsa:4096 -nodes \\
    -keyout key.pem -out cert.pem -days 365 \\
    -subj "/CN=localhost" \\
    -addext "subjectAltName = DNS:localhost,IP:127.0.0.1"
\`\`\`

Hoặc trong Go (xem \`solutions.go\`) — sinh cert ECDSA tự ký runtime, không cần openssl.

### 6.2 \`tls.Config\` — fine-tune

\`\`\`go
tlsCfg := &tls.Config{
    MinVersion: tls.VersionTLS12,                 // TẮT 1.0/1.1
    CurvePreferences: []tls.CurveID{
        tls.X25519, tls.CurveP256,
    },
    CipherSuites: []uint16{
        tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
        tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
        tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,
        tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,
    },
    PreferServerCipherSuites: true, // pre Go 1.17; sau đó stdlib auto chọn
}

server := &http.Server{
    Addr:      ":8443",
    Handler:   handler,
    TLSConfig: tlsCfg,
}
log.Fatal(server.ListenAndServeTLS("cert.pem", "key.pem"))
\`\`\`

> ❓ **"Có cần khai báo CipherSuites không?"**
> Cho **TLS 1.2 và thấp hơn**: nên, để loại cipher cũ. Cho **TLS 1.3**: vô nghĩa — Go ignore và dùng 5
> cipher chuẩn. Khuyến nghị mặc định: chỉ set \`MinVersion: tls.VersionTLS12\` và để stdlib tự lo phần
> còn lại.

### 6.3 \`GetCertificate\` — pick cert theo domain

Khi serve nhiều domain trên cùng port 443 (SNI):

\`\`\`go
tlsCfg := &tls.Config{
    GetCertificate: func(hello *tls.ClientHelloInfo) (*tls.Certificate, error) {
        switch hello.ServerName {
        case "bank.com":
            return &bankCert, nil
        case "shop.com":
            return &shopCert, nil
        default:
            return nil, fmt.Errorf("unknown SNI: %s", hello.ServerName)
        }
    },
}
\`\`\`

Đây cũng là cách \`autocert.Manager\` cắm vào — nó implement \`GetCertificate\` để load đúng cert cho
domain client request và renew transparently.

### 6.4 Redirect HTTP → HTTPS

\`\`\`go
go func() {
    http.ListenAndServe(":80", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        target := "https://" + r.Host + r.URL.RequestURI()
        http.Redirect(w, r, target, http.StatusMovedPermanently)
    }))
}()
log.Fatal(server.ListenAndServeTLS("", "")) // HTTPS
\`\`\`

Hoặc dùng HSTS để bắt browser nhớ "không bao giờ HTTP nữa":

\`\`\`go
w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
\`\`\`

> ⚠ **Lỗi thường gặp.** Set HSTS với \`max-age\` lớn rồi cert hết hạn → user **không thể truy cập**,
> không có cách dismiss warning. Phải bật renew tự động và monitor cert expiry **trước** khi bật HSTS
> max-age dài.

---

## 7. mTLS (mutual TLS) — service-to-service

TLS thường: **client xác thực server**. mTLS: **cả hai bên xác thực nhau** bằng cert.

\`\`\`
Client cert (private key A) ←→ Server cert (private key B)
   identity: order-service        identity: payment-service
\`\`\`

### 7.1 Vì sao dùng mTLS thay JWT trong internal cluster

- Không cần token, không cần secret rotation phức tạp. Cert lifecycle = đủ.
- Verify **ngay tại TLS layer** — tới handler đã biết chắc client là \`order-service\`. Không phải decode
   header, không phải verify signature lần nữa.
- Forward secrecy + mã hoá miễn phí kèm theo.
- Compliance: nhiều quy định (PCI-DSS, HIPAA) yêu cầu mã hoá in-transit ngay cả trong VPC.

### 7.2 Cài đặt trong Go

\`\`\`go
// Server: yêu cầu client cert, verify bằng CA của tổ chức
caPool := x509.NewCertPool()
caPool.AppendCertsFromPEM(orgCAPem)

tlsCfg := &tls.Config{
    ClientCAs:  caPool,
    ClientAuth: tls.RequireAndVerifyClientCert,
}
server := &http.Server{Addr: ":8443", Handler: h, TLSConfig: tlsCfg}
server.ListenAndServeTLS("server-cert.pem", "server-key.pem")
\`\`\`

\`\`\`go
// Client: load cert của chính nó để present
clientCert, _ := tls.LoadX509KeyPair("client-cert.pem", "client-key.pem")
caPool := x509.NewCertPool()
caPool.AppendCertsFromPEM(orgCAPem)

client := &http.Client{
    Transport: &http.Transport{
        TLSClientConfig: &tls.Config{
            Certificates: []tls.Certificate{clientCert},
            RootCAs:      caPool,
        },
    },
}
\`\`\`

Trong handler, identity nằm ở \`r.TLS.PeerCertificates[0].Subject.CommonName\`.

> ❓ **"Service mesh (Istio, Linkerd) làm cái này không?"**
> Đúng — đó là một trong những giá trị lớn nhất của service mesh. Sidecar Envoy/Linkerd-proxy handle
> mTLS tự động giữa các pod, app không phải biết. Bạn vẫn cần hiểu nguyên lý để debug.

> 📝 **Tóm tắt mục 6-7.** Go HTTPS = \`http.ListenAndServeTLS(addr, cert, key, h)\` hoặc dùng
> \`tls.Config\` cho fine-tune. mTLS = \`ClientAuth: RequireAndVerifyClientCert\` + \`ClientCAs\`, dùng cho
> service-to-service.

---

## 8. Crypto primitives stdlib Go — bản đồ

Go stdlib \`crypto/*\` đủ cho ~95% nhu cầu. Bảng:

| Mục đích | Package | Recommended | Tránh |
|----------|---------|-------------|-------|
| Hash data (checksum, integrity) | \`crypto/sha256\`, \`sha512\`, \`blake2b\` | SHA-256 | MD5, SHA1 (collision) |
| Hash password | (\`golang.org/x/crypto/bcrypt\`, \`argon2\`) | bcrypt / argon2id | SHA-256 (nhanh quá → brute force) |
| Message authentication | \`crypto/hmac\` | HMAC-SHA-256 | Tự nối key+msg rồi hash |
| Symmetric encrypt | \`crypto/aes\` + \`cipher.NewGCM\` | AES-GCM 128/256 | AES-ECB, AES-CBC tự pad |
| Asymmetric encrypt | \`crypto/rsa\` | RSA-OAEP, hạn chế dùng | RSA-PKCS1v15 cho payload mới |
| Digital signature | \`crypto/rsa\`, \`crypto/ecdsa\`, \`crypto/ed25519\` | Ed25519 hoặc ECDSA P-256 | RSA 1024-bit |
| Key exchange | \`crypto/ecdh\` | x25519 / P-256 ECDH | RSA key transport |
| Random bytes | \`crypto/rand\` | \`rand.Read()\` | \`math/rand\` (KHÔNG BAO GIỜ cho secrets) |

### 8.1 Hash: SHA-256

\`\`\`go
import "crypto/sha256"

sum := sha256.Sum256([]byte("hello"))
fmt.Printf("%x\\n", sum) // 32 byte = 64 hex chars
\`\`\`

- **One-way**: từ \`sum\` không phục hồi được \`"hello"\`.
- **Collision resistance**: rất khó tìm 2 input khác nhau cùng ra sum.
- **Tính nhanh**: 1GB/s trên CPU thường. **Quá nhanh** cho password hashing — đó là vì sao không dùng
   SHA-256 cho password (xem mục 12).

### 8.2 HMAC — message authentication

\`\`\`go
import (
    "crypto/hmac"
    "crypto/sha256"
)

func sign(msg, key []byte) []byte {
    h := hmac.New(sha256.New, key)
    h.Write(msg)
    return h.Sum(nil)
}

func verify(msg, key, tag []byte) bool {
    expected := sign(msg, key)
    return hmac.Equal(tag, expected) // CONSTANT TIME compare!
}
\`\`\`

Dùng khi: ký webhook payload (Stripe/GitHub gửi \`X-Signature\`), ký JWT HS256, ký cookie session.

> ⚠ **Lỗi thường gặp.**
> - **Tự nối \`key+msg\` rồi \`sha256.Sum256\`** → bị attack length extension. **Luôn dùng \`hmac.New\`**.
> - **So sánh tag bằng \`bytes.Equal\`** → timing attack lộ key. **Phải \`hmac.Equal\`** (constant time).

### 8.3 AES-GCM — symmetric encrypt

\`\`\`go
import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
)

func encrypt(plaintext, key []byte) ([]byte, error) {
    block, err := aes.NewCipher(key) // key 16/24/32 byte → AES-128/192/256
    if err != nil { return nil, err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return nil, err }
    nonce := make([]byte, gcm.NonceSize()) // 12 byte
    if _, err := rand.Read(nonce); err != nil { return nil, err }
    // Seal: nonce || ciphertext || tag
    ct := gcm.Seal(nonce, nonce, plaintext, nil)
    return ct, nil
}

func decrypt(ciphertext, key []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil { return nil, err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return nil, err }
    if len(ciphertext) < gcm.NonceSize() {
        return nil, errors.New("ciphertext too short")
    }
    nonce := ciphertext[:gcm.NonceSize()]
    ct := ciphertext[gcm.NonceSize():]
    return gcm.Open(nil, nonce, ct, nil)
}
\`\`\`

> ⚠ **NONCE REUSE = CATASTROPHIC.**
> Với AES-GCM, **dùng cùng một (key, nonce) cho 2 plaintext khác nhau → kẻ tấn công lấy được XOR của
> 2 plaintext, và còn worse, lấy được authentication key → có thể giả tag mọi message sau đó**. Đây
> là sai lầm tệ nhất với AES-GCM. **Luôn random nonce 12 byte** mỗi lần encrypt (như code trên). Đừng
> dùng counter, đừng dùng cố định.

### 8.4 RSA & ECDSA — asymmetric

Dùng để ký (sign) — verify được bằng public key, không cần share secret. JWT RS256/ES256 dùng cái này.

\`\`\`go
import "crypto/ecdsa"

priv, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
hash := sha256.Sum256([]byte("transfer $100 to Alice"))
sig, _ := ecdsa.SignASN1(rand.Reader, priv, hash[:])

// Verify
ok := ecdsa.VerifyASN1(&priv.PublicKey, hash[:], sig)
\`\`\`

Khuyến nghị: **Ed25519** nếu hỗ trợ (nhanh, deterministic, không bị nonce-reuse như ECDSA bad-rand).

### 8.5 Random bytes — \`crypto/rand\` vs \`math/rand\`

\`\`\`go
// ĐÚNG
import "crypto/rand"
b := make([]byte, 32)
_, err := rand.Read(b) // OS entropy: /dev/urandom hoặc getrandom()

// SAI - KHÔNG BAO GIỜ cho token/key/nonce
import "math/rand"
// math/rand.Read là predictable, seed yếu, tạo ra "ngẫu nhiên giả".
\`\`\`

> ❓ **"Sao có 2 thư viện random?"**
> \`math/rand\` cho simulation, game, test data — nơi cần reproduce được. \`crypto/rand\` cho mọi thứ
> security: token, nonce, key. Go 1.20+ thì \`math/rand/v2\` auto-seed nhưng vẫn KHÔNG cho secrets.

> 📝 **Tóm tắt mục 8.** SHA-256 cho hash; HMAC-SHA-256 cho ký message (nhớ \`hmac.Equal\`); AES-GCM cho
> encrypt (RANDOM NONCE mỗi lần!); ECDSA/Ed25519 cho asymmetric; \`crypto/rand\` cho mọi byte ngẫu nhiên
> security-relevant.

---

## 9. Password hashing — đã chạm L46, recap

Password là trường hợp riêng — **không** dùng SHA-256 / HMAC. Lý do: nhanh quá. Attacker lấy được DB
hash sẽ brute-force vài tỉ candidate/giây trên GPU.

Hash chậm có ý đồ: **bcrypt**, **scrypt**, **argon2id**:

\`\`\`go
import "golang.org/x/crypto/bcrypt"

hash, _ := bcrypt.GenerateFromPassword([]byte("p@ssw0rd"), bcrypt.DefaultCost) // cost 10
err := bcrypt.CompareHashAndPassword(hash, []byte("p@ssw0rd"))
\`\`\`

- \`cost = 10\` → ~80ms per hash trên CPU 2020 — chậm đủ để brute force khó, nhanh đủ để login UX OK.
- **Argon2id** mới hơn, chống GPU/ASIC tốt hơn:

\`\`\`go
import "golang.org/x/crypto/argon2"
salt := make([]byte, 16); rand.Read(salt)
key := argon2.IDKey([]byte("p@ssw0rd"), salt, 1, 64*1024, 4, 32) // 64MB ram, 1 iter, 4 thread
\`\`\`

Chi tiết xem L46. Ở đây chỉ nhắc lại: **không** dùng SHA-256 cho password, **không** dùng MD5/SHA1
cho **bất cứ thứ gì security**.

---

## 10. Encrypt data at rest — AES-GCM + key management

Dữ liệu nhạy cảm (SSN, card number, PHI) phải encrypt trong DB. Pattern:

\`\`\`go
// Encrypt khi insert
ciphertext, _ := encrypt(plaintextSSN, encryptionKey)
db.Exec("INSERT INTO users (id, ssn_enc) VALUES (?, ?)", uid, ciphertext)

// Decrypt khi đọc
var enc []byte
db.QueryRow("SELECT ssn_enc FROM users WHERE id=?", uid).Scan(&enc)
plaintext, _ := decrypt(enc, encryptionKey)
\`\`\`

**Key management** là phần khó nhất:

1. **Hardcode trong source code** → lộ qua git history. **TUYỆT ĐỐI KHÔNG**.
2. **Environment variable** → tốt hơn, nhưng vẫn lộ qua \`/proc/PID/environ\`, dump core, log accident.
3. **KMS** (AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault) → key không bao giờ rời HSM, app gọi
   API "encrypt/decrypt this blob" với IAM permission. **Khuyến nghị** cho production.
4. **Envelope encryption**: KMS giữ **master key**, app generate **DEK** (data encryption key) ngẫu
   nhiên cho mỗi record/file, encrypt DEK bằng master key qua KMS, lưu cả \`{DEK_encrypted, ciphertext}\`.

> 💡 **Trực giác về envelope encryption.** Master key trong KMS = chìa két nhà bank. DEK = chìa khoá
> riêng cho từng hộc trong két. Đập két chỉ lấy được DEK encrypted; muốn dùng phải mang lên bank
> (KMS API call). Mỗi record có DEK riêng → nếu 1 record lộ, chỉ lộ 1 record.

---

## 11. Common pitfall — checklist 5 cái phải tránh

### 11.1 \`InsecureSkipVerify: true\` trong production

\`\`\`go
// BUG
http.Client{Transport: &http.Transport{
    TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
}}
\`\`\`

→ Client kết nối **bất kỳ** server nào, không kiểm cert. MITM tự ký cert giả mạo \`bank.com\` → bạn vẫn
kết nối, vẫn gửi token. **Cấm dùng trong production**. Dùng trong dev test nội bộ thì OK nếu cert
self-signed cluster — nhưng nên thêm \`RootCAs\` từ CA nội bộ thay vì skip verify.

### 11.2 Hardcode cert/key trong code hoặc git

\`\`\`go
// BUG
const tlsKey = \`-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQ...\`
\`\`\`

Một khi vào git, **không xoá được** (luôn nằm trong history). Phải rotate ngay nếu lỡ commit.

### 11.3 Cipher suite outdated

Bật cho compat client cũ (IE6, Android 4):

\`\`\`go
// BUG
CipherSuites: []uint16{tls.TLS_RSA_WITH_RC4_128_SHA} // RC4 broken 2013
\`\`\`

→ Traffic hiện tại có thể bị giải mã. Cứ để default Go stdlib, không thêm cipher cũ.

### 11.4 \`math/rand\` cho token

\`\`\`go
// BUG
import "math/rand"
func resetToken() string {
    b := make([]byte, 32)
    rand.Read(b) // math/rand — predictable!
    return hex.EncodeToString(b)
}
\`\`\`

\`math/rand\` chỉ có ~2^63 state, biết được vài output trước có thể predict các output sau. Attacker
brute force qua khoảng nhỏ này → đoán được reset token của user khác.

**Fix**: dùng \`crypto/rand\` — đã ở mục 8.5.

### 11.5 Nonce reuse với AES-GCM

\`\`\`go
// BUG
nonce := []byte("000000000000") // 12 byte cố định
ct := gcm.Seal(nil, nonce, plaintext, nil)
\`\`\`

Đã giải thích kỹ ở 8.3 — **mỗi lần encrypt phải random nonce mới**.

> ⚠ **Lỗi thường gặp BONUS.**
> - \`errors.Is(err, sql.ErrNoRows)\` rồi return \`errors.New(err.Error())\` → cert verify error bị
>   downgrade thành plain string, mất context.
> - Compare HMAC tag bằng \`bytes.Equal\` thay vì \`hmac.Equal\` → timing attack.
> - Bỏ qua revoked cert (OCSP) — Go stdlib không check OCSP mặc định.

> 📝 **Tóm tắt mục 11.** 5 antipattern lớn: \`InsecureSkipVerify\`, hardcode key, cipher cũ, \`math/rand\`
> cho secrets, nonce reuse. Học thuộc.

---

## 12. Bài tập

### Bài tập 1 — HTTPS server với self-signed cert tự generate

Viết một HTTPS server Go ở port 8443 mà **sinh cert ECDSA P-256 tự ký runtime** (không cần file \`cert.pem\`
trên đĩa). Endpoint \`GET /\` trả \`"Hello, %s over %s (cipher %s)"\` với host từ \`r.TLS.ServerName\`, version
TLS, và cipher.

### Bài tập 2 — HMAC-SHA256 sign & verify

Viết 2 hàm:

\`\`\`go
func Sign(msg, key []byte) string             // trả hex tag
func Verify(msg, key []byte, tag string) bool // constant-time
\`\`\`

Dùng để mô phỏng verify webhook signature (như Stripe).

### Bài tập 3 — AES-GCM encrypt/decrypt với random nonce

Viết 2 hàm:

\`\`\`go
func Encrypt(plaintext, key []byte) (string, error) // base64, gồm nonce ở đầu
func Decrypt(token string, key []byte) ([]byte, error)
\`\`\`

Tự test: encrypt 100 lần cùng plaintext → 100 ciphertext khác nhau (vì random nonce).

### Bài tập 4 — Random token

Viết \`RandomToken(nBytes int) string\` trả về \`2*nBytes\` ký tự hex bằng \`crypto/rand\`. Đếm thử 1M token có
duplicate nào không (gợi ý: với 32 byte = 256 bit, **gần như chắc chắn** không duplicate trong vòng đời
vũ trụ — xem birthday bound).

### Bài tập 5 — mTLS demo (1 server, 1 client, share CA)

Sinh 3 cert:
- \`ca\` (self-signed, dùng làm CA)
- \`server-cert\` (sign bởi \`ca\`, SAN \`localhost\`)
- \`client-cert\` (sign bởi \`ca\`)

Viết server HTTPS yêu cầu client cert, in \`Subject.CN\` của client lên response. Viết client trình
cert, kết nối, in response.

### Bài tập 6 — Fix 4 crypto antipattern

Code dưới có 4 bug crypto. Tìm và sửa từng cái:

\`\`\`go
import (
    "bytes"
    "crypto/aes"
    "crypto/cipher"
    "crypto/hmac"
    "crypto/sha1"
    "encoding/hex"
    "math/rand"
    "net/http"
    "crypto/tls"
)

var aesKey = []byte("mysupersecret123") // 16 byte
var hmacKey = []byte("hmac-key")
var fixedNonce = []byte("000000000000")

func signWebhook(body, tag []byte) bool {
    h := hmac.New(sha1.New, hmacKey)
    h.Write(body)
    expected := h.Sum(nil)
    return bytes.Equal(tag, expected) // (1)
}

func resetToken() string {
    b := make([]byte, 32)
    rand.Read(b) // (2)
    return hex.EncodeToString(b)
}

func encrypt(plain []byte) []byte {
    block, _ := aes.NewCipher(aesKey)
    gcm, _ := cipher.NewGCM(block)
    return gcm.Seal(nil, fixedNonce, plain, nil) // (3)
}

func newClient() *http.Client {
    return &http.Client{Transport: &http.Transport{
        TLSClientConfig: &tls.Config{InsecureSkipVerify: true}, // (4)
    }}
}
\`\`\`

---

## 13. Lời giải chi tiết

### Lời giải 1 — HTTPS với self-signed cert runtime

Cách tiếp cận: sinh cặp khoá ECDSA P-256, tạo \`x509.Certificate\` template với SAN \`localhost\`, ký bằng
chính nó (self-signed) qua \`x509.CreateCertificate(rand.Reader, tpl, tpl, pub, priv)\`, wrap vào
\`tls.Certificate\`, đưa vào \`http.Server.TLSConfig\`.

\`\`\`go
func makeSelfSignedCert() (tls.Certificate, error) {
    priv, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
    if err != nil { return tls.Certificate{}, err }
    serial, _ := cryptorand.Int(rand.Reader, big.NewInt(1<<62))
    tpl := x509.Certificate{
        SerialNumber: serial,
        Subject:      pkix.Name{CommonName: "localhost"},
        NotBefore:    time.Now(),
        NotAfter:     time.Now().Add(24 * time.Hour),
        KeyUsage:     x509.KeyUsageDigitalSignature,
        ExtKeyUsage:  []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
        IPAddresses:  []net.IP{net.ParseIP("127.0.0.1")},
        DNSNames:     []string{"localhost"},
    }
    der, err := x509.CreateCertificate(rand.Reader, &tpl, &tpl, &priv.PublicKey, priv)
    if err != nil { return tls.Certificate{}, err }
    return tls.Certificate{Certificate: [][]byte{der}, PrivateKey: priv}, nil
}
\`\`\`

Chạy: \`curl -k https://localhost:8443/\` (\`-k\` để bỏ qua cert verify vì self-signed).

**Độ phức tạp**: $O(1)$, một lần sinh khi start. ECDSA P-256 gen ~1ms.

### Lời giải 2 — HMAC sign/verify

\`\`\`go
func Sign(msg, key []byte) string {
    h := hmac.New(sha256.New, key)
    h.Write(msg)
    return hex.EncodeToString(h.Sum(nil))
}

func Verify(msg, key []byte, tag string) bool {
    raw, err := hex.DecodeString(tag)
    if err != nil { return false }
    expected := hmac.New(sha256.New, key)
    expected.Write(msg)
    return hmac.Equal(raw, expected.Sum(nil))
}
\`\`\`

**Tại sao \`hmac.Equal\`?** \`bytes.Equal\` short-circuit khi tìm thấy byte khác đầu tiên — attacker đo
thời gian compare phán đoán dần từng byte tag đúng. \`hmac.Equal\` luôn so toàn bộ, thời gian không
phụ thuộc nội dung.

**Độ phức tạp**: $O(n)$ với n = \`len(msg)\` cho hash; compare $O(32)$.

### Lời giải 3 — AES-GCM encrypt/decrypt

\`\`\`go
func Encrypt(plaintext, key []byte) (string, error) {
    block, err := aes.NewCipher(key) // key 16/24/32 byte
    if err != nil { return "", err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return "", err }
    nonce := make([]byte, gcm.NonceSize()) // 12 byte
    if _, err := rand.Read(nonce); err != nil { return "", err }
    ct := gcm.Seal(nonce, nonce, plaintext, nil)
    return base64.RawURLEncoding.EncodeToString(ct), nil
}

func Decrypt(token string, key []byte) ([]byte, error) {
    raw, err := base64.RawURLEncoding.DecodeString(token)
    if err != nil { return nil, err }
    block, err := aes.NewCipher(key)
    if err != nil { return nil, err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return nil, err }
    n := gcm.NonceSize()
    if len(raw) < n { return nil, errors.New("token too short") }
    nonce, ct := raw[:n], raw[n:]
    return gcm.Open(nil, nonce, ct, nil)
}
\`\`\`

**Test**: encrypt 100 lần plaintext \`"hello"\` → 100 token khác nhau (do random nonce 12 byte). Decrypt
tất cả → đều ra \`"hello"\`. Sửa 1 byte token → \`gcm.Open\` trả error (auth tag fail).

**Độ phức tạp**: $O(n)$ cả encrypt và decrypt với n = \`len(plaintext)\`.

### Lời giải 4 — Random token

\`\`\`go
func RandomToken(nBytes int) (string, error) {
    b := make([]byte, nBytes)
    if _, err := rand.Read(b); err != nil { return "", err }
    return hex.EncodeToString(b), nil
}
\`\`\`

Với 32 byte = 256 bit entropy: birthday paradox nói collision xảy ra sau ~2^128 token sinh (10^38).
1M token = 10^6 — collision probability ≈ 10^6^2 / 2^256 ≈ 10^-65. **Không cần worry**.

> ❓ **"32 byte có nhiều quá không?"**
> 16 byte (128 bit) là đủ cho hầu hết — UUIDv4 cũng chỉ 122 bit. 32 byte cho session token, reset token,
> API key thì comfortable margin.

### Lời giải 5 — mTLS

Sinh cert (script bash):

\`\`\`bash
# CA
openssl req -x509 -newkey ec:<(openssl ecparam -name secp256r1) -nodes \\
    -keyout ca-key.pem -out ca-cert.pem -days 365 \\
    -subj "/CN=demo-ca"

# Server
openssl req -newkey ec:<(openssl ecparam -name secp256r1) -nodes \\
    -keyout server-key.pem -out server-csr.pem \\
    -subj "/CN=localhost" \\
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
openssl x509 -req -in server-csr.pem -CA ca-cert.pem -CAkey ca-key.pem \\
    -CAcreateserial -out server-cert.pem -days 365 \\
    -extfile <(printf "subjectAltName=DNS:localhost,IP:127.0.0.1\\nextendedKeyUsage=serverAuth")

# Client
openssl req -newkey ec:<(openssl ecparam -name secp256r1) -nodes \\
    -keyout client-key.pem -out client-csr.pem \\
    -subj "/CN=alice"
openssl x509 -req -in client-csr.pem -CA ca-cert.pem -CAkey ca-key.pem \\
    -CAcreateserial -out client-cert.pem -days 365 \\
    -extfile <(printf "extendedKeyUsage=clientAuth")
\`\`\`

Server Go:

\`\`\`go
caPEM, _ := os.ReadFile("ca-cert.pem")
pool := x509.NewCertPool()
pool.AppendCertsFromPEM(caPEM)

srv := &http.Server{
    Addr: ":8443",
    TLSConfig: &tls.Config{
        ClientCAs:  pool,
        ClientAuth: tls.RequireAndVerifyClientCert,
        MinVersion: tls.VersionTLS12,
    },
    Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        cn := "unknown"
        if len(r.TLS.PeerCertificates) > 0 {
            cn = r.TLS.PeerCertificates[0].Subject.CommonName
        }
        fmt.Fprintf(w, "hello, %s\\n", cn)
    }),
}
srv.ListenAndServeTLS("server-cert.pem", "server-key.pem")
\`\`\`

Client:

\`\`\`go
cert, _ := tls.LoadX509KeyPair("client-cert.pem", "client-key.pem")
caPEM, _ := os.ReadFile("ca-cert.pem")
pool := x509.NewCertPool()
pool.AppendCertsFromPEM(caPEM)
client := &http.Client{Transport: &http.Transport{
    TLSClientConfig: &tls.Config{
        Certificates: []tls.Certificate{cert},
        RootCAs:      pool,
    },
}}
resp, _ := client.Get("https://localhost:8443/")
io.Copy(os.Stdout, resp.Body) // "hello, alice"
\`\`\`

Nếu client KHÔNG present cert → server \`tls.RequireAndVerifyClientCert\` reject ngay tại handshake.

### Lời giải 6 — Fix 4 antipattern

\`\`\`go
import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/hmac"
    "crypto/rand" // (2) crypto/rand thay math/rand
    "crypto/sha256" // (1b) SHA-256 thay SHA-1
    "crypto/tls"
    "crypto/x509"
    "encoding/hex"
    "errors"
    "net/http"
    "os"
)

// (1) bytes.Equal → hmac.Equal (constant time)
// (1b) sha1 → sha256
func signWebhook(body, tag []byte) bool {
    h := hmac.New(sha256.New, hmacKey)
    h.Write(body)
    return hmac.Equal(tag, h.Sum(nil))
}

// (2) math/rand → crypto/rand
func resetToken() (string, error) {
    b := make([]byte, 32)
    if _, err := rand.Read(b); err != nil { return "", err }
    return hex.EncodeToString(b), nil
}

// (3) fixedNonce → random nonce mỗi lần
func encrypt(plain []byte) ([]byte, error) {
    block, err := aes.NewCipher(aesKey)
    if err != nil { return nil, err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return nil, err }
    nonce := make([]byte, gcm.NonceSize())
    if _, err := rand.Read(nonce); err != nil { return nil, err }
    return gcm.Seal(nonce, nonce, plain, nil), nil
}

// (4) InsecureSkipVerify → dùng RootCAs với CA của tổ chức
func newClient() (*http.Client, error) {
    caPEM, err := os.ReadFile("ca-cert.pem")
    if err != nil { return nil, err }
    pool := x509.NewCertPool()
    if !pool.AppendCertsFromPEM(caPEM) {
        return nil, errors.New("invalid CA pem")
    }
    return &http.Client{Transport: &http.Transport{
        TLSClientConfig: &tls.Config{
            RootCAs:    pool,
            MinVersion: tls.VersionTLS12,
        },
    }}, nil
}
\`\`\`

Tóm tắt 4 fix: **(1)** SHA-1 broken cho collision → SHA-256; \`bytes.Equal\` timing leak → \`hmac.Equal\`.
**(2)** \`math/rand\` predictable → \`crypto/rand\`. **(3)** Nonce cố định AES-GCM = catastrophic → random
12 byte mỗi lần. **(4)** \`InsecureSkipVerify\` mở MITM → dùng \`RootCAs\` với CA tin cậy.

---

## 14. Code & Minh hoạ

- [solutions.go](./solutions.go) — chạy \`go run solutions.go\` để xem HMAC, AES-GCM, random token, mini
  HTTPS server self-signed in console output.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **TLS handshake animation**: nhấn step để xem từng message giữa client/server (ClientHello,
     ServerHello, cert verify, Finished).
  2. **Cert chain visualizer**: leaf → intermediate → root, click mỗi cert xem chi tiết
     (subject, issuer, signed by, NotAfter).
  3. **Hash function compare**: nhập text, animate bar tốc độ MD5 / SHA-256 / bcrypt và đánh dấu nguy
     cơ collision / brute-force.

---

## 15. Bài tiếp theo

- [Lesson 48 — WebSocket & Streaming](../lesson-48-websocket-streaming/) — sau khi đường đi đã an toàn
   (TLS) và biết ai là ai (auth + mTLS), bài tới mở **kênh hai chiều realtime** trên cùng connection
   TLS đó.

Tham khảo thêm:

- RFC 8446 — TLS 1.3 (đọc mục 4.1 "Key Exchange Messages" nếu muốn hiểu sâu).
- "Bulletproof TLS and PKI" — Ivan Ristic. Sách hay nhất về TLS thực tế.
- Cloudflare blog "A Detailed Look at RFC 8446 (a.k.a. TLS 1.3)" — visualize handshake.
- Go docs: \`crypto/tls\`, \`crypto/x509\`, \`golang.org/x/crypto/acme/autocert\`.
`;
