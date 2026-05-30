// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/03-Advanced-Operations/lesson-08-project/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Dự án tổng hợp: Lần theo một request HTTP qua toàn bộ ngăn xếp

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Kể được toàn bộ chuỗi sự kiện từ khi người dùng gõ \`https://www.example.com\` đến khi trình duyệt hiển thị trang, theo đúng thứ tự thời gian.
- Ánh xạ mỗi bước sang đúng tầng OSI/TCP-IP, giao thức, và lesson đã học.
- Chẩn đoán được lỗi mạng từ triệu chứng: xác định bước hỏng, chọn công cụ phù hợp.
- Ước tính tổng thời gian (ms) qua từng giai đoạn và hiểu đâu là nút thắt cổ chai.

## Kiến thức tiền đề

Bài này là bài TỔNG KẾT — giả sử bạn đã học tất cả các bài trước:

| Tier | Lesson | Khái niệm cốt lõi |
|------|--------|--------------------|
| 01-Foundations | [L01 — Mô hình phân tầng](../../01-Foundations-LowerLayers/lesson-01-layered-models/) | OSI 7 tầng, TCP-IP 4 tầng, encapsulation |
| 01-Foundations | [L02 — Ethernet/Link](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/) | Frame, MAC address, switch |
| 01-Foundations | [L03 — IP/Subnetting](../../01-Foundations-LowerLayers/lesson-03-ip-subnetting/) | Địa chỉ IP, subnet mask, CIDR |
| 01-Foundations | [L04 — Định tuyến](../../01-Foundations-LowerLayers/lesson-04-routing/) | Bảng định tuyến, longest-prefix match |
| 01-Foundations | [L05 — ARP/ICMP/DHCP/NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) | ARP, NAT, DHCP |
| 01-Foundations | [L08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) | Bắt tay 3 bước, cửa sổ trượt, đóng kết nối |
| 02-Application | [L02 — DNS](../../02-Application-Services/lesson-02-dns/) | Phân giải đệ quy, cache, TTL |
| 02-Application | [L03 — HTTP cơ bản](../../02-Application-Services/lesson-03-http-basics/) | Method, status code, header |
| 02-Application | [L06 — TLS](../../02-Application-Services/lesson-06-tls/) | Bắt tay TLS, certificate, mã hóa |
| 02-Application | [L08 — Hạ tầng Web](../../02-Application-Services/lesson-08-web-infrastructure/) | CDN, load balancer, reverse proxy |
| 03-Advanced | [L07 — Công cụ chẩn đoán](../lesson-07-diagnostic-tools/) | ping, traceroute, dig, tcpdump, curl |

---

## 1. Bức tranh toàn cảnh

💡 **Trực giác trước khi đi vào từng bước**

Hãy tưởng tượng bạn gọi điện đặt pizza từ một nhà hàng ở thành phố khác:

1. Bạn tra **danh bạ** (= DNS) để lấy số điện thoại của nhà hàng.
2. Thư ký chuyển máy của bạn ra **tổng đài bưu cục** (= NAT gateway/router nhà).
3. Cuộc gọi đi qua nhiều **trạm chuyển tiếp** (= các router trên Internet).
4. Nhà hàng **nhấc máy và xác nhận danh tính** (= bắt tay TCP + TLS).
5. Bạn **đặt món** (= HTTP GET), nhân viên chuyển vào **bếp** (= server sau load balancer).
6. Bếp nấu xong, món được **đóng gói, giao về** (= HTTP response qua CDN).

Trong toàn bộ quá trình, mỗi "lớp" bưu điện thêm địa chỉ của mình vào phong bì rồi tháo ra khi đến nơi — đó chính là encapsulation/decapsulation.

### Bảng ánh xạ tổng quan

| Bước | Giai đoạn | Giao thức chính | Tầng OSI | Tầng TCP-IP | Lesson |
|------|-----------|-----------------|-----------|--------------|--------|
| 1 | Phân giải DNS | DNS (UDP 53) | 7 Application | Application | [L02 DNS](../../02-Application-Services/lesson-02-dns/) |
| 2a | Tìm MAC gateway (ARP) | ARP (Ethernet) | 2 Data Link | Network Access | [L05 ARP](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) |
| 2b | Định tuyến IP qua Internet | IP, OSPF/BGP | 3 Network | Internet | [L04 Routing](../../01-Foundations-LowerLayers/lesson-04-routing/) |
| 2c | NAT tại router nhà | NAT (IP rewrite) | 3 Network | Internet | [L05 NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) |
| 3 | Bắt tay TCP (3-way) | TCP (SYN/ACK) | 4 Transport | Transport | [L08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) |
| 4 | Bắt tay TLS | TLS 1.3 | 5-6 Session/Pres | Application | [L06 TLS](../../02-Application-Services/lesson-06-tls/) |
| 5a | Gửi HTTP GET | HTTP/1.1 hoặc HTTP/2 | 7 Application | Application | [L03 HTTP](../../02-Application-Services/lesson-03-http-basics/) |
| 5b | Đi qua CDN/LB | Anycast, HAProxy | 3-7 | Application | [L08 Infra](../../02-Application-Services/lesson-08-web-infrastructure/) |
| 6 | Đóng gói tại mỗi chặng | Toàn bộ | 1-7 | 1-4 | [L01 Layers](../../01-Foundations-LowerLayers/lesson-01-layered-models/) |

📝 **Tóm tắt mục 1**
- Một request HTTPS qua ít nhất 7 giai đoạn phân biệt, mỗi giai đoạn dùng giao thức khác nhau.
- Toàn bộ thường hoàn thành trong 50–500 ms (tùy địa lý và CDN).
- Mỗi giao thức giải quyết một vấn đề khác nhau — không có giao thức nào "làm mọi thứ".

---

## 2. Bước 1 — Phân giải DNS

> Tham chiếu: [Lesson 02-DNS](../../02-Application-Services/lesson-02-dns/)

### 2.1. Trình duyệt cần IP trước khi kết nối

Khi bạn gõ \`https://www.example.com\` và nhấn Enter, trình duyệt **không biết IP** của server. Nó phải hỏi DNS trước.

**Thứ tự tra cứu (từ nhanh đến chậm)**:

1. **Cache trình duyệt** — Chrome lưu DNS cache riêng (~60 s mặc định). Nếu đã từng vào \`www.example.com\` trong vòng vài phút, dùng kết quả cũ ngay.
2. **Cache hệ điều hành** — \`nscd\` hoặc \`systemd-resolved\` cache tại OS-level.
3. **File \`/etc/hosts\`** — tra cứu tĩnh, ưu tiên cao nhất (nhiều malware lợi dụng bước này).
4. **Resolver (recursive resolver)** của ISP hoặc 8.8.8.8 — đây là "nhân viên tra cứu" thay bạn.
5. **Root nameserver** (13 cụm, ký hiệu a.–m.root-servers.net) — biết địa chỉ TLD servers.
6. **TLD nameserver** (.com, .vn, .org...) — biết nameserver ủy quyền (authoritative NS).
7. **Authoritative nameserver** của example.com — trả lời chính thức: \`www.example.com → 93.184.216.34\`.

💡 **Analogy**: resolver giống nhân viên tổng đài tra danh bạ thay bạn. Bạn chỉ hỏi tên, họ hỏi qua 3 cấp rồi báo lại số điện thoại.

### 2.2. Số liệu thực tế

- **DNS cache hit** (bước 1-3): 0–1 ms.
- **Resolver có cache**: ~1–10 ms (chỉ hỏi resolver, không ra Internet).
- **Full resolution** (resolver → root → TLD → authoritative): 20–120 ms (phụ thuộc vị trí địa lý).
- **TTL** của \`www.example.com\` thường 3600 s (1 giờ) — sau đó phải hỏi lại.

### 2.3. Gói tin DNS thực tế

Truy vấn DNS qua UDP, port 53:
\`\`\`
Client → Resolver: DNS Query (UDP, 12 bytes header + 20 bytes question)
  - Transaction ID: 0xABCD
  - Question: www.example.com, Type A (IPv4), Class IN
Resolver → Client: DNS Response
  - Answer: www.example.com → 93.184.216.34, TTL 3600
\`\`\`

Nếu phản hồi > 512 bytes (vd DNSSEC), chuyển sang TCP 53.

❓ **Câu hỏi tự nhiên**
- *"DNS không mã hóa — ai đó có thể nghe lén biết mình vào trang gì không?"* → Đúng! DNS truyền thống là plaintext. DNS-over-HTTPS (DoH) và DNS-over-TLS (DoT) giải quyết vấn đề này (Chrome/Firefox hỗ trợ DoH với 8.8.8.8).
- *"Nếu resolver bị hack, trả về IP sai thì sao?"* → Đó là DNS poisoning. DNSSEC thêm chữ ký số để xác minh câu trả lời.
- *"IPv6 thì sao?"* → Truy vấn thêm record AAAA. Trình duyệt thường thử IPv6 trước (Happy Eyeballs algorithm).

⚠ **Lỗi thường gặp**
- Nhầm rằng DNS chỉ dùng UDP: DNS dùng **UDP 53 cho truy vấn thông thường**, nhưng chuyển TCP 53 khi phản hồi cắt ngắn (TC bit = 1) hoặc khi zone transfer.
- Quên rằng TTL 0 = không cache = mỗi request đều phải full resolution → tốn thời gian.

🔁 **Tự kiểm tra**

Lệnh \`dig +trace www.example.com\` cho thấy gì? Tại sao cần cờ \`+trace\`?
<details>
<summary>Đáp án</summary>
\`dig +trace\` yêu cầu dig tự thực hiện full resolution (giả lập resolver từ root), hiển thị từng bước: root → TLD → authoritative. Không có \`+trace\`, dig chỉ hỏi resolver cục bộ và cho kết quả cuối cùng ngay (có thể là từ cache).
</details>

📝 **Tóm tắt mục 2**
- DNS có 7 lớp cache/lookup, từ trình duyệt đến authoritative NS.
- Full resolution mất 20–120 ms; cache hit mất < 1 ms.
- DNS là plaintext — DoH/DoT là giải pháp bảo mật.

---

## 3. Bước 2 — Định tuyến đến server

> Tham chiếu: [L04 Routing](../../01-Foundations-LowerLayers/lesson-04-routing/), [L05 ARP/NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/)

Sau khi có IP đích (93.184.216.34), trình duyệt cần gửi gói IP đến đó. Đây là lúc tầng mạng (Network layer) làm việc.

### 3.1. ARP — Tìm MAC của default gateway

Máy bạn (192.168.1.100) muốn gửi gói đến 93.184.216.34. Nó kiểm tra bảng định tuyến cục bộ:

\`\`\`
Destination     Gateway        Interface
0.0.0.0/0       192.168.1.1    eth0      ← default route: mọi traffic ra ngoài đều qua đây
192.168.1.0/24  0.0.0.0        eth0      ← mạng nội bộ: gửi trực tiếp
\`\`\`

93.184.216.34 không thuộc 192.168.1.0/24, nên gói phải qua **default gateway = 192.168.1.1** (router nhà).

Để gửi frame Ethernet, máy cần **MAC address** của 192.168.1.1. Đây là lúc ARP làm việc:

\`\`\`
ARP Request (broadcast): "Ai có IP 192.168.1.1? Cho tôi MAC."
ARP Reply (unicast):     "Tôi có IP 192.168.1.1, MAC của tôi là AA:BB:CC:DD:EE:FF."
\`\`\`

Frame Ethernet đầu tiên:
\`\`\`
Dst MAC: AA:BB:CC:DD:EE:FF (gateway)
Src MAC: 11:22:33:44:55:66 (máy bạn)
EtherType: 0x0800 (IPv4)
  Dst IP: 93.184.216.34
  Src IP: 192.168.1.100
  Protocol: 6 (TCP)
\`\`\`

💡 **Lưu ý quan trọng**: địa chỉ MAC **thay đổi tại mỗi hop** (router), nhưng địa chỉ IP nguồn/đích **không đổi** suốt hành trình (trừ khi qua NAT).

### 3.2. NAT tại router nhà

Router nhà thực hiện **NAT (Network Address Translation)** — đổi IP nguồn từ địa chỉ private (192.168.1.100) sang IP public (ví dụ 203.162.10.50):

\`\`\`
Trước NAT (LAN side):   Src 192.168.1.100:54321 → Dst 93.184.216.34:443
Sau NAT (WAN side):     Src 203.162.10.50:41234  → Dst 93.184.216.34:443
NAT table ghi nhớ:      203.162.10.50:41234 ↔ 192.168.1.100:54321
\`\`\`

Khi phản hồi về, router tra NAT table và forward về đúng máy nội bộ.

### 3.3. Định tuyến qua Internet — Longest-prefix match

Mỗi router trên đường đi kiểm tra bảng định tuyến, chọn route phù hợp nhất (longest-prefix match):

\`\`\`
Ví dụ bảng định tuyến của một router ISP:
93.0.0.0/8         via 10.0.0.1   (ít khớp)
93.184.0.0/16      via 10.0.0.2   (khớp hơn)
93.184.216.0/24    via 10.0.0.3   (khớp nhất → chọn cái này)
\`\`\`

Số hop điển hình từ Việt Nam đến server Mỹ: 15–25 hop. Mỗi hop thêm ~1–5 ms trễ xử lý + trễ truyền dẫn (≈ khoảng cách / tốc độ ánh sáng trong cáp quang).

**Độ trễ xuyên lục địa**:
- Việt Nam → Singapore: ~20 ms (RTT)
- Việt Nam → Tokyo: ~60 ms (RTT)
- Việt Nam → London: ~200 ms (RTT)
- Việt Nam → New York: ~280 ms (RTT)

❓ **Câu hỏi tự nhiên**
- *"Mỗi router thêm bao nhiêu thời gian?"* → Router hiện đại xử lý gói trong khoảng 1 µs (microsecond) cho forwarding thuần — phần lớn độ trễ là từ **khoảng cách vật lý** (cáp quang truyền ~200,000 km/s).
- *"Tại sao traceroute thỉnh thoảng thấy * * *?"* → Một số router không phản hồi TTL-exceeded ICMP (cấu hình bảo mật) nhưng vẫn forward gói. Không có nghĩa là gói bị drop.

📝 **Tóm tắt mục 3**
- ARP lấy MAC gateway trước khi gửi frame ra ngoài LAN.
- NAT đổi IP private → public tại router nhà; duy trì mapping để nhận phản hồi.
- Định tuyến qua nhiều hop, mỗi router dùng longest-prefix match.
- Độ trễ chủ yếu từ khoảng cách địa lý, không phải xử lý router.

---

## 4. Bước 3 — Bắt tay TCP 3 bước

> Tham chiếu: [Lesson 08-TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/)

Sau khi biết đường đi, máy bạn thiết lập **kết nối TCP** đến server tại port 443 (HTTPS).

### 4.1. Diễn biến 3-way handshake

\`\`\`
Client                              Server (93.184.216.34:443)
  │                                      │
  │─── SYN (SEQ=x) ────────────────────→│  x = số random, ví dụ 3215782400
  │                                      │  Server nhớ x
  │←── SYN-ACK (SEQ=y, ACK=x+1) ────────│  y = số random phía server, ví dụ 872341500
  │                                      │
  │─── ACK (SEQ=x+1, ACK=y+1) ────────→│
  │                                      │  Kết nối được thiết lập!
\`\`\`

Với ví dụ số cụ thể:
- Client gửi SYN: SEQ = 3215782400 (ISN — Initial Sequence Number, chọn ngẫu nhiên để bảo mật).
- Server hồi SYN-ACK: SEQ = 872341500, ACK = 3215782401 (= client ISN + 1 xác nhận đã nhận SYN).
- Client hồi ACK: SEQ = 3215782401, ACK = 872341501.

**Thời gian cho bước này**: 1 RTT (Round-Trip Time). Với server ở Mỹ: ~280 ms. Với server Singapore qua CDN: ~20 ms.

### 4.2. Vì sao cần 3 bước, không phải 2 hay 4?

- 2 bước không đủ: client không xác nhận được server đã nhận ISN của client.
- 4 bước thừa: SYN-ACK có thể gộp thành một gói.
- 3 bước là minimum để **cả hai bên** xác nhận ISN của nhau = thiết lập đồng bộ hai chiều.

⚠ **Lỗi thường gặp**: TCP SYN flood — attacker gửi hàng nghìn SYN giả, server cấp phát tài nguyên chờ ACK mà không bao giờ đến → hết bộ nhớ. Phòng thủ: SYN cookies (server không cấp phát tài nguyên cho đến khi nhận ACK hợp lệ).

📝 **Tóm tắt mục 4**
- TCP 3-way handshake xác lập ISN hai chiều: SYN → SYN-ACK → ACK.
- Mất 1 RTT — đây là chi phí cố định trước khi gửi bất kỳ dữ liệu nào.
- TCP/IP fast open (TFO) có thể gửi dữ liệu trong SYN để tiết kiệm 1 RTT (trên kết nối đã quen).

---

## 5. Bước 4 — Bắt tay TLS

> Tham chiếu: [Lesson 06-TLS](../../02-Application-Services/lesson-06-tls/)

Sau TCP handshake, kết nối là **plaintext** — bất kỳ router nào trên đường đi đều có thể đọc nội dung. TLS giải quyết vấn đề này.

### 5.1. TLS 1.3 Handshake (rút gọn)

\`\`\`
Client                                Server
  │                                      │
  │─── ClientHello ─────────────────────→│
  │    (TLS version, cipher suites,      │
  │     client random, KeyShare)         │
  │                                      │
  │←── ServerHello + Certificate ────────│
  │    + CertificateVerify + Finished    │
  │    (server random, KeyShare,         │
  │     cert chain, chữ ký số)          │
  │                                      │
  │─── Finished ────────────────────────→│
  │                                      │
  │←→ [Dữ liệu mã hóa] ─────────────────│
\`\`\`

TLS 1.3 chỉ cần **1 RTT** (thay vì 2 RTT của TLS 1.2). Nếu phiên đã biết (session resumption), có thể dùng **0-RTT** (gửi dữ liệu ngay trong ClientHello).

### 5.2. Xác thực chứng chỉ

Server gửi certificate chứa:
- Tên miền: \`*.example.com\` (wildcard) hoặc \`www.example.com\`.
- Public key của server.
- Chữ ký số từ CA (Certificate Authority) như DigiCert, Let's Encrypt.
- Thời hạn hiệu lực (vd: 2024-01-01 → 2024-12-31).

Trình duyệt kiểm tra:
1. Tên miền khớp với URL không?
2. Chứng chỉ còn hạn không?
3. Chữ ký từ CA có trong danh sách CA tin cậy của OS/browser không?
4. Certificate không bị thu hồi (CRL/OCSP)?

❓ **Câu hỏi tự nhiên**
- *"TLS bảo vệ những gì?"* → Bảo vệ **nội dung** (HTTP request/response). Nhưng địa chỉ IP đích vẫn lộ (vì IP header không mã hóa). Hostname lộ trong **SNI** (Server Name Indication) — trừ khi dùng ECH (Encrypted Client Hello).
- *"Ai cũng có thể tạo cert cho google.com không?"* → Không. CA chỉ ký certificate sau khi xác minh bạn sở hữu domain (DV), tổ chức (OV), hoặc cả danh tính pháp lý (EV).

📝 **Tóm tắt mục 5**
- TLS 1.3 thêm 1 RTT sau TCP handshake = tổng cộng 2 RTT trước khi gửi HTTP.
- Certificate xác minh server là "đúng người" chứ không phải man-in-the-middle.
- Mã hóa bảo vệ nội dung, nhưng IP đích và SNI vẫn có thể bị quan sát.

---

## 6. Bước 5 — HTTP Request và Response qua CDN/Load Balancer

> Tham chiếu: [L03 HTTP](../../02-Application-Services/lesson-03-http-basics/), [L08 Web Infra](../../02-Application-Services/lesson-08-web-infrastructure/)

### 6.1. Gửi HTTP GET

Sau khi kênh TLS được mở, trình duyệt gửi HTTP request (đã mã hóa):

\`\`\`http
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (...)
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, deflate, br
Accept-Language: vi-VN,vi;q=0.9
Connection: keep-alive
\`\`\`

### 6.2. Đi qua CDN và Load Balancer

DNS của \`www.example.com\` thường trả về IP của **CDN edge node** gần nhất (Anycast routing), không phải IP server thật. Ví dụ Cloudflare, Akamai, AWS CloudFront.

Luồng qua hạ tầng:

\`\`\`
Trình duyệt → [CDN Edge ở Singapore] → [Load Balancer] → [App Server 1 hoặc 2 hoặc 3]
\`\`\`

CDN kiểm tra: content có trong cache không?
- Nếu có (cache hit): trả về ngay từ edge, không cần vào origin. Độ trễ ~5–20 ms.
- Nếu không (cache miss): forward về origin server, cache lại, rồi trả về. Độ trễ ~50–200 ms thêm.

Load balancer (nginx, HAProxy) phân phối request theo round-robin, least-connections, hoặc IP hash.

### 6.3. Server xử lý và phản hồi

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
Content-Length: 1270
Cache-Control: max-age=604800
ETag: "3147526947"
Date: Fri, 30 May 2026 10:00:00 GMT

<!DOCTYPE html>
<html>...
\`\`\`

Response quay về theo đường ngược lại qua CDN → NAT gateway → LAN → trình duyệt.

📝 **Tóm tắt mục 6**
- HTTP GET là một text request đơn giản, nhưng đi qua nhiều lớp infrastructure trước khi đến app server.
- CDN giảm độ trễ từ 280 ms → 20 ms bằng cách đặt cache gần người dùng.
- Load balancer đảm bảo không có app server đơn nào trở thành điểm hỏng duy nhất.

---

## 7. Bước 6 — Encapsulation tại mỗi chặng

> Tham chiếu: [Lesson 01 — Mô hình phân tầng](../../01-Foundations-LowerLayers/lesson-01-layered-models/)

Ở mỗi hop, gói tin được **bóc và đóng lại** (decapsulate rồi re-encapsulate) ở tầng Data Link:

\`\`\`
Máy bạn gửi đi:
┌─────────────────────────────────────────────────────────┐
│ Ethernet Header (dst=gateway MAC) │ IP │ TCP │ TLS │ HTTP│
└─────────────────────────────────────────────────────────┘
                     ↓ Router 1 nhận, bóc Ethernet, thấy IP
                     ↓ Tra bảng định tuyến, forward ra interface mới
                     ↓ Đóng Ethernet mới với MAC của router tiếp theo
┌─────────────────────────────────────────────────────────┐
│ Ethernet Header (dst=router2 MAC)  │ IP │ TCP │ TLS │ HTTP│
└─────────────────────────────────────────────────────────┘
                     ↓ (tiếp tục cho đến destination)
\`\`\`

Quy tắc quan trọng:
- **IP header (L3)**: nguồn/đích không đổi suốt hành trình (trừ NAT).
- **Ethernet/MAC header (L2)**: thay đổi ở mỗi hop.
- **TCP/TLS/HTTP (L4-L7)**: hoàn toàn opaque với các router trung gian (họ không cần đọc).

📝 **Tóm tắt mục 7**
- Mỗi router chỉ xử lý L2 (bóc Ethernet cũ, đóng Ethernet mới) và L3 (tra bảng định tuyến IP).
- L4 và trên không liên quan đến quá trình định tuyến.
- NAT là ngoại lệ: phải sửa L3 (IP) và L4 (port) để duy trì mapping.

---

## 8. Bước 7 — Tổng hợp thời gian và bức tranh đầy đủ

### 8.1. Bảng thời gian ước tính cho request từ Việt Nam → CDN Singapore

| Giai đoạn | Thao tác | Thời gian |
|-----------|----------|-----------|
| DNS lookup (cache miss) | Resolver → root → TLD → auth | 40–80 ms |
| DNS lookup (cache hit) | Browser cache | < 1 ms |
| TCP handshake | 1 RTT đến CDN edge Singapore | ~20 ms |
| TLS 1.3 handshake | 1 RTT | ~20 ms |
| HTTP GET + first byte | Gửi request, server xử lý, nhận byte đầu | 5–30 ms |
| Download HTML 10 KB | Truyền dữ liệu | ~2 ms |
| **Tổng (cold start, cache miss DNS)** | | **~90–150 ms** |
| **Tổng (warm, DNS cached)** | | **~50–75 ms** |

So sánh với server không có CDN (ở Mỹ, RTT ~280 ms):

| Giai đoạn | Thời gian |
|-----------|-----------|
| DNS | 80 ms |
| TCP | 280 ms |
| TLS | 280 ms |
| HTTP | 50 ms |
| **Tổng** | **~690 ms** |

→ CDN giảm từ 690 ms xuống 150 ms = **gấp ~4.6 lần nhanh hơn**.

### 8.2. Đường đi gói tin đầy đủ

\`\`\`
[Máy bạn] ──LAN Ethernet──→ [Router nhà / NAT]
         ──DSL/Fiber──→ [Router ISP]
         ──Cáp quang biển──→ [Router ISP Singapore]
         ──Backbone──→ [CDN Edge Singapore]
         ──CDN internal──→ [Load Balancer]
         ──→ [App Server]
         ←── (đường về ngược lại)
\`\`\`

---

## 9. Chẩn đoán khi hỏng

> Tham chiếu: [Lesson 07 — Công cụ chẩn đoán](../lesson-07-diagnostic-tools/)

### 9.1. Bảng triệu chứng → bước hỏng → công cụ

| Triệu chứng | Bước hỏng | Công cụ kiểm tra |
|-------------|-----------|-----------------|
| "Server not found" / "ERR_NAME_NOT_RESOLVED" | DNS (Bước 1) | \`dig www.example.com\`, \`nslookup\`, \`dig +trace\` |
| "Network unreachable" / Không ping được gateway | ARP / LAN (Bước 2a) | \`arp -n\`, \`ping 192.168.1.1\`, kiểm tra cable |
| Request đi không tới đích, traceroute "đứng" ở 1 hop | Routing / WAN (Bước 2b) | \`traceroute www.example.com\`, \`mtr\` |
| Connection refused (port 443 đóng) | TCP / Firewall (Bước 3) | \`telnet www.example.com 443\`, \`nc -zv host 443\`, \`nmap -p443\` |
| "SSL_ERROR_RX_RECORD_TOO_LONG" / cert error | TLS (Bước 4) | \`curl -v https://...\`, \`openssl s_client -connect host:443\` |
| HTTP 4xx (404 Not Found, 403 Forbidden) | App / URL sai (Bước 5) | \`curl -I https://...\`, kiểm tra URL, headers |
| HTTP 5xx (500, 502, 503) | Server / Load Balancer (Bước 5b) | \`curl -v\`, logs server, kiểm tra LB health |
| Kết nối chậm bất thường | Routing / CDN / Băng thông | \`mtr\`, \`curl -w "%{time_total}"\`, \`iperf3\` |
| DNS phân giải ra IP khác lạ | DNS poisoning / Hijack | \`dig @8.8.8.8 domain\`, so sánh nhiều resolver |

### 9.2. Quy trình chẩn đoán từng bước

Khi gặp lỗi, áp dụng quy trình từ dưới lên (bottom-up):

\`\`\`
Bước 1: Ping gateway nội bộ?         → nếu FAIL: lỗi LAN/ARP
Bước 2: Ping 8.8.8.8?               → nếu FAIL: lỗi router/NAT/WAN
Bước 3: dig @8.8.8.8 www.example.com → nếu FAIL: lỗi DNS
Bước 4: traceroute www.example.com   → tìm hop đứng/mất → lỗi routing
Bước 5: nc -zv www.example.com 443  → nếu FAIL: lỗi TCP/firewall
Bước 6: openssl s_client -connect    → nếu FAIL: lỗi TLS/cert
Bước 7: curl -v https://...          → xem HTTP status, headers
\`\`\`

💡 **Nguyên tắc chẩn đoán**: luôn bắt đầu từ tầng thấp nhất và đi lên. Đừng kiểm tra DNS khi gateway nội bộ còn không ping được.

---

## 10. Bài tập + Lời giải chi tiết

### Bài tập 1 — Sắp xếp thứ tự các bước

Sắp xếp các sự kiện sau theo đúng thứ tự xảy ra khi gõ \`https://www.example.com\`:

(a) TCP SYN gửi đến port 443  
(b) ARP request tìm MAC của default gateway  
(c) DNS query gửi đến resolver  
(d) TLS ClientHello  
(e) HTTP GET / gửi đi  
(f) DNS response nhận được (IP = 93.184.216.34)  
(g) TCP SYN-ACK nhận được  

### Bài tập 2 — Xác định bước hỏng

Người dùng báo: *"Tôi vào được 8.8.8.8 (ping OK), nhưng không vào được www.example.com, trình duyệt báo ERR_NAME_NOT_RESOLVED."*

a) Bước nào trong 7 bước bị hỏng?  
b) Ba lệnh bạn sẽ chạy để chẩn đoán theo thứ tự?

### Bài tập 3 — Tính tổng thời gian

Bạn ở Hà Nội, kết nối đến server ở Singapore (RTT = 25 ms). DNS cache miss (resolver cần 3 lần forward, mỗi lần 8 ms). TLS 1.3 (1 RTT). Server xử lý HTTP 15 ms. Download 5 KB HTML (băng thông 10 Mbps).

Tính tổng thời gian từ nhấn Enter đến nhận xong HTML.

### Bài tập 4 — Ghép giao thức với tầng

Ghép mỗi giao thức với tầng TCP-IP tương ứng:

| Giao thức | Tầng TCP-IP |
|-----------|-------------|
| (1) ARP | (A) Application |
| (2) TCP | (B) Transport |
| (3) DNS | (C) Internet (Network) |
| (4) IP | (D) Network Access (Link) |
| (5) HTTP | |
| (6) Ethernet | |

### Bài tập 5 — Tình huống NAT

Mạng nội bộ có 3 máy: 192.168.0.10, 192.168.0.11, 192.168.0.12. IP public: 1.2.3.4.

Ba máy đồng thời kết nối đến 93.184.216.34:443. Router cần phân biệt 3 kết nối này khi nhận phản hồi về. Giải thích cơ chế và cho ví dụ NAT table.

### Bài tập 6 — Phân tích trường hợp CDN

Một website có server gốc ở New York (RTT từ Việt Nam = 300 ms). Họ triển khai CDN với edge ở Singapore (RTT = 20 ms). Static assets (CSS, JS, images) được cache tại CDN với TTL 1 ngày.

Câu hỏi: Lần đầu tiên một user Việt Nam vào trang (cold start), tổng RTT cho mỗi thành phần là bao nhiêu? So với không có CDN?

---

### Lời giải chi tiết

**Bài 1 — Thứ tự đúng**: **(c) → (f) → (b) → (a) → (g) → (d) → (e)**

Giải thích:
1. **(c) DNS query**: trước tiên phải biết IP đích.
2. **(f) DNS response**: nhận IP = 93.184.216.34.
3. **(b) ARP request**: trước khi gửi frame, cần MAC của default gateway (IP không nằm trong /24 nội bộ → phải qua gateway).
4. **(a) TCP SYN**: bắt đầu thiết lập kết nối TCP đến port 443.
5. **(g) TCP SYN-ACK**: server phản hồi, hoàn thành bước 2/3.
6. **(d) TLS ClientHello**: sau TCP handshake, bắt đầu TLS.
7. **(e) HTTP GET**: chỉ sau khi kênh TLS được thiết lập mới gửi HTTP.

Bài học: DNS phải xong trước TCP; TCP phải xong trước TLS; TLS phải xong trước HTTP.

---

**Bài 2 — Xác định bước hỏng**

a) **Bước 1 — DNS** bị hỏng. Ping 8.8.8.8 thành công → L3 routing hoạt động bình thường. Nhưng không phân giải được tên miền → DNS bị lỗi.

b) Ba lệnh chẩn đoán theo thứ tự:

\`\`\`bash
# 1. Kiểm tra resolver mặc định có phản hồi không
dig www.example.com

# 2. Thử resolver khác (bypass resolver cục bộ/ISP)
dig @8.8.8.8 www.example.com

# 3. Trace toàn bộ quá trình phân giải
dig @8.8.8.8 +trace www.example.com
\`\`\`

Nếu lệnh 1 fail nhưng lệnh 2 thành công → resolver của ISP/nội bộ có vấn đề (có thể bị chặn hoặc cấu hình sai). Nếu cả hai fail → domain không tồn tại hoặc authoritative NS bị down.

---

**Bài 3 — Tính tổng thời gian**

Các thành phần:

| Giai đoạn | Tính toán | Thời gian |
|-----------|-----------|-----------|
| DNS resolution | 3 lần forward × 8 ms/lần × 2 chiều RTT ≈ 3 × 16 ms | 48 ms |
| TCP handshake | 1 RTT × 25 ms | 25 ms |
| TLS 1.3 handshake | 1 RTT × 25 ms | 25 ms |
| HTTP GET + server | 1 RTT × 25 ms + 15 ms xử lý | 40 ms |
| Download 5 KB | 5000 × 8 bits / 10,000,000 bps | 4 ms |
| **Tổng** | | **142 ms** |

Ghi chú: DNS thực tế phức tạp hơn — resolver thường cache TLD/root nên chỉ cần 1 lần đến authoritative NS (~16 ms). Kết quả thực tế: ~110 ms.

---

**Bài 4 — Ghép giao thức với tầng**

| Giao thức | Tầng TCP-IP |
|-----------|-------------|
| (1) ARP | **(D) Network Access** — ARP hoạt động ở L2, resolve IP → MAC trong cùng mạng |
| (2) TCP | **(B) Transport** — cung cấp kết nối tin cậy end-to-end |
| (3) DNS | **(A) Application** — DNS chạy trên UDP/TCP, là giao thức ứng dụng |
| (4) IP | **(C) Internet** — định địa chỉ và routing L3 |
| (5) HTTP | **(A) Application** — giao thức web layer ứng dụng |
| (6) Ethernet | **(D) Network Access** — frame L2 trong mạng LAN |

⚠ **Lưu ý**: ARP đôi khi được xếp vào L2.5 (giữa L2 và L3) vì nó phục vụ giao diện giữa IP và Ethernet. Trong mô hình TCP-IP 4 tầng, nó thuộc Network Access.

---

**Bài 5 — Tình huống NAT**

Cơ chế: NAT (Network Address Translation) dùng **Port Address Translation (PAT)** — giữ cùng IP public nhưng phân biệt bằng **port nguồn** khác nhau.

Ví dụ NAT table:

| Private IP:Port | Public IP:Port | Dest IP:Port |
|-----------------|----------------|--------------|
| 192.168.0.10:52100 | 1.2.3.4:40001 | 93.184.216.34:443 |
| 192.168.0.11:52200 | 1.2.3.4:40002 | 93.184.216.34:443 |
| 192.168.0.12:52300 | 1.2.3.4:40003 | 93.184.216.34:443 |

Khi server phản hồi về 1.2.3.4:40001, router tra bảng → forward về 192.168.0.10:52100. Tương tự cho :40002 và :40003.

Lưu ý: port nguồn private (52100, 52200, 52300) do OS chọn ngẫu nhiên trong dải ephemeral (49152–65535). Router NAT có thể giữ nguyên port nguồn nếu không xung đột, hoặc đổi thành port public khác nếu cần.

---

**Bài 6 — Phân tích CDN**

**Không CDN** (server New York, RTT = 300 ms):
- DNS: 60 ms
- TCP: 300 ms
- TLS: 300 ms
- HTTP HTML: 300 ms + 20 ms xử lý = 320 ms
- CSS/JS/Images (3 file, sequential): 3 × 300 ms = 900 ms
- **Tổng ước tính: ~1880 ms** (gần 2 giây)

**Có CDN, lần đầu (cache miss cho assets)**:
- DNS: 15 ms (CDN anycast resolver nhanh hơn)
- TCP đến CDN edge Singapore: 20 ms
- TLS đến CDN edge: 20 ms
- HTTP HTML (cache miss → CDN forward về NY: 300 ms + 20 ms): 320 ms ← nút thắt
- CSS/JS/Images (cache miss → CDN về NY): 3 × 300 ms = 900 ms
- **Tổng lần đầu: ~1275 ms** — không khác nhiều vì cache miss

**Có CDN, lần thứ 2+ (assets cached tại Singapore)**:
- DNS: 1 ms (browser cache)
- TCP: 20 ms
- TLS: 20 ms
- HTTP HTML (nếu no-cache): 20 ms
- CSS/JS/Images (CDN cache hit): 3 × 20 ms = 60 ms
- **Tổng warm: ~120 ms** — nhanh gấp ~15 lần lần đầu không CDN

→ **Kết luận**: CDN phát huy tác dụng chủ yếu cho **static assets đã cached** ở edge. HTML động (personalized) thường không được cache và vẫn cần vào origin.

---

## 11. Liên kết và bài tiếp theo

Bài này là bài cuối của lĩnh vực Networking. Các hướng học tiếp theo:

- **Bảo mật sâu hơn**: [Cryptography](../../../Cryptography/) — mã hóa, PKI, certificate authority.
- **Lập trình mạng**: [Programming/sockets](../../../Programming/) — code client/server TCP thực tế bằng Go/Python.
- **Cloud infrastructure**: hiểu cách VPC, load balancer, CDN được cấu hình trên AWS/GCP/Azure.
- **Protocol deep-dive**: RFC 9293 (TCP), RFC 9110 (HTTP semantics), RFC 8446 (TLS 1.3).

---

## 📝 Tổng kết toàn bộ hành trình

Một request HTTPS đơn giản trải qua ít nhất **7 giai đoạn** với **6 giao thức khác nhau**:

1. **DNS** (UDP 53) — đổi tên miền ra địa chỉ IP: 0–80 ms.
2. **ARP** (Ethernet broadcast) — tìm MAC gateway trong LAN: < 1 ms nếu có cache.
3. **IP + Routing** (BGP/OSPF trên WAN) — dẫn gói qua hàng chục router: 20–300 ms (phụ thuộc địa lý).
4. **NAT** — đổi private IP sang public IP, duy trì mapping: 0 ms thêm (xảy ra trong router).
5. **TCP** (SYN/SYN-ACK/ACK) — thiết lập kênh tin cậy 2 chiều: 1 RTT.
6. **TLS 1.3** — mã hóa và xác thực danh tính server: 1 RTT.
7. **HTTP** — gửi request ứng dụng, nhận response: 1 RTT + thời gian server xử lý.

**Điểm chốt cho kỹ sư**:
- CDN là kỹ thuật hiệu quả nhất giảm độ trễ — đặt cache gần người dùng.
- HTTP/3 (QUIC) kết hợp TCP + TLS + HTTP vào một handshake duy nhất, giảm từ 3 RTT xuống 1 RTT.
- Chẩn đoán lỗi mạng: luôn bắt đầu từ tầng thấp nhất (LAN/ARP → routing → DNS → TCP → TLS → HTTP).
- DNS cache là tuyến đầu tiết kiệm thời gian — TTL ngắn = mỗi user đều phải full resolution.
- Mỗi giao thức giải quyết đúng một vấn đề; không có "giao thức vạn năng".

**Bạn đã hoàn thành toàn bộ lĩnh vực Networking.** Chúc mừng!
`;
