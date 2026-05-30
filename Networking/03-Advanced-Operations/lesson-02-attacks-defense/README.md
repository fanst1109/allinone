# Lesson 02 — Tấn công & Phòng thủ Mạng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân loại các kiểu tấn công mạng theo mục tiêu CIA (Confidentiality / Integrity / Availability).
- Hiểu cơ chế DoS/DDoS: SYN flood (lạm dụng bắt tay TCP), amplification attack, và các biện pháp phòng thủ (rate limiting, SYN cookies, scrubbing center, CDN/anycast).
- Hiểu MITM (man-in-the-middle): tại sao nguy hiểm và vì sao TLS chặn được.
- Hiểu Spoofing: IP spoofing, ARP spoofing, DNS cache poisoning — và phòng thủ tương ứng.
- Nhận biết dấu hiệu Port scan / Reconnaissance và cách phòng chống.
- Áp dụng kiến thức để đọc mô tả sự cố, phân loại đúng loại tấn công, chọn biện pháp phòng thủ.

## Kiến thức tiền đề

- [Lesson 01 — An ninh mạng (CIA, mô hình bảo mật)](../lesson-01-network-security/) — tam giác CIA, nguyên tắc defense-in-depth.
- [Lesson 08 (Tier 1) — TCP bắt tay 3 bước](../../01-Foundations-LowerLayers/lesson-08-tcp/) — SYN/SYN-ACK/ACK, trạng thái SYN_RCVD.
- [Lesson 05 (Tier 1) — ARP, ICMP, DHCP, NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) — giao thức ARP và bảng ARP cache.
- [Lesson 02 (Tier 2) — DNS](../../02-Application-Services/lesson-02-dns/) — phân giải tên miền, recursive query.
- [Lesson 06 (Tier 2) — TLS](../../02-Application-Services/lesson-06-tls/) — xác thực chứng chỉ, khóa phiên.

---

## 1. Phân loại tấn công theo mục tiêu CIA

💡 **Trực giác**: CIA trong bảo mật không liên quan đến tình báo Mỹ mà là ba mục tiêu bảo vệ của mọi hệ thống. Kẻ tấn công nhắm vào một trong ba:

| Mục tiêu | Ý nghĩa | Kẻ tấn công muốn gì |
|----------|---------|---------------------|
| **C — Confidentiality (Bí mật)** | Chỉ người được phép mới đọc được dữ liệu | Nghe lén, đánh cắp dữ liệu |
| **I — Integrity (Toàn vẹn)** | Dữ liệu không bị sửa đổi trái phép | Giả mạo, chèn dữ liệu độc hại |
| **A — Availability (Khả dụng)** | Hệ thống phải hoạt động khi cần | Làm sập dịch vụ, ngăn người dùng truy cập |

**Bảng phân loại nhanh các kiểu tấn công trong bài này**:

| Tấn công | CIA bị tổn hại | Ghi chú |
|----------|---------------|---------|
| DoS / DDoS | A | Làm cạn tài nguyên server |
| SYN flood | A | DoS đặc thù cho TCP |
| Amplification | A | Lợi dụng server thứ ba |
| MITM (passive) | C | Nghe lén không sửa |
| MITM (active) | C + I | Sửa nội dung giữa đường |
| IP spoofing | I (nguồn giả mạo) | Thường là bước đầu của tấn công khác |
| ARP spoofing | C + I | Chuyển hướng lưu lượng LAN |
| DNS cache poisoning | I + C | Điều hướng người dùng đến máy chủ giả |
| Port scan | (tiền trinh sát) | Không trực tiếp tổn hại CIA, nhưng mở đường |

❓ **Câu hỏi tự nhiên**:

- _"Một cuộc tấn công có thể tổn hại đồng thời cả C và I không?"_ — Có. MITM active vừa nghe lén (mất C) vừa sửa nội dung (mất I). Người thiết kế hệ thống phải phòng thủ cả hai hướng.
- _"Tại sao phân loại CIA quan trọng?"_ — Vì từng mục tiêu cần biện pháp phòng thủ khác nhau: mất C → cần mã hóa; mất I → cần chữ ký số/MAC; mất A → cần rate limiting, redundancy.
- _"Spoofing là tấn công gì?"_ — Giả mạo danh tính (địa chỉ IP, MAC, tên miền). Tự nó chủ yếu tổn hại I, nhưng thường là bước mở đầu để leo thang sang MITM hoặc tổn hại C.

📝 **Tóm tắt mục 1**:
- Ba mục tiêu CIA: Confidentiality, Integrity, Availability.
- Mỗi tấn công nhắm vào ≥1 mục tiêu.
- Biết mục tiêu → chọn đúng biện pháp phòng thủ.

---

## 2. DoS / DDoS — Làm cạn tài nguyên

### 2.1. Nguyên lý chung

**DoS (Denial of Service — Từ chối dịch vụ)**: kẻ tấn công gửi lưu lượng (traffic) hoặc yêu cầu với số lượng/tốc độ vượt quá năng lực xử lý của server, khiến người dùng hợp lệ không thể truy cập.

**DDoS (Distributed DoS)**: cùng mục tiêu nhưng dùng hàng nghìn máy bị chiếm quyền điều khiển (botnet) gửi đồng thời — băng thông tổng hợp có thể đạt hàng trăm Gbps hoặc Tbps.

💡 **Analogy**: DoS giống một kẻ đứng ở cửa ngân hàng liên tục điền vào hàng trăm tờ đơn rỗng không có ý định giao dịch thật, làm nhân viên quầy không tiếp khách thật được. DDoS giống nghìn kẻ như vậy đến đồng thời từ khắp nơi.

**Tài nguyên bị cạn kiệt**:
- Băng thông mạng (volumetric attack).
- Bộ nhớ (state table, SYN backlog).
- CPU (tính toán cryptography, regex, query DB).
- Kết nối TCP (connection table đầy).

### 2.2. SYN flood — Lạm dụng bắt tay TCP

**Cơ chế** (kết nối với bài [TCP Lesson 08 Tier 1](../../01-Foundations-LowerLayers/lesson-08-tcp/)):

Bắt tay TCP 3 bước bình thường:
```
Client   ──SYN──>    Server   (Server: cấp phát entry half-open, lưu SEQ_client)
Client   <─SYN-ACK─  Server   (Server: chờ ACK cuối)
Client   ──ACK──>    Server   (Server: chuyển sang ESTABLISHED, xóa entry half-open)
```

Server duy trì **SYN backlog**: hàng đợi các kết nối ở trạng thái **SYN_RCVD** (half-open — nhận SYN nhưng chưa nhận ACK). Kích thước mặc định: 128–1024 entry tùy kernel.

**SYN flood**: kẻ tấn công gửi hàng loạt SYN với địa chỉ nguồn giả (IP spoofed) — SYN-ACK gửi đến IP giả nên không bao giờ nhận được ACK cuối. Kết quả:

- SYN backlog nhanh chóng đầy (ví dụ: 1000 SYN/giây × timeout 75 giây = 75.000 entry, vượt xa mọi backlog thực tế).
- Server từ chối mọi kết nối SYN mới — kể cả từ người dùng hợp lệ.

**Dấu hiệu nhận biết SYN flood**:
- Log TCP: số lượng kết nối ở trạng thái `SYN_RCVD` tăng đột biến.
- Lệnh kiểm tra: `netstat -an | grep SYN_RCVD | wc -l` trả về hàng nghìn.
- CPU spike khi server xử lý SYN-ACK phản hồi hàng loạt.
- User hợp lệ báo "connection timed out" trong khi server vẫn online.

**Phòng thủ SYN flood**:

1. **SYN cookies**: Server không lưu trạng thái SYN_RCVD. Thay vào đó:
   - Mã hóa (hash) thông tin kết nối vào ISN của SYN-ACK: `ISN = H(src_ip, src_port, dst_ip, dst_port, timestamp, secret)`.
   - Chỉ khi nhận được ACK hợp lệ (ACK = ISN+1), server mới tái tạo trạng thái kết nối từ cookie.
   - Kết quả: SYN backlog không còn bị lấp đầy vì không cấp phát trạng thái half-open.
   - Kích hoạt Linux: `sysctl net.ipv4.tcp_syncookies=1` (thường bật sẵn).

2. **Rate limiting**: Tường lửa (firewall) hoặc router giới hạn số SYN packet nhận trong một khoảng thời gian từ cùng một IP nguồn. Ví dụ: tối đa 10 SYN/giây/IP.

3. **Scrubbing center / DDoS protection service**: Lưu lượng được định tuyến qua trung tâm lọc (Cloudflare, AWS Shield, Akamai) — chỉ lưu lượng sạch được forward đến server gốc.

4. **Anycast + CDN**: Phân tán lưu lượng đến nhiều điểm PoP (Point of Presence) trên toàn cầu — tấn công phải đủ lớn để áp đảo toàn bộ mạng lưới.

### 2.3. Amplification attack — Khuếch đại lưu lượng

**Nguyên lý**: Kẻ tấn công gửi request nhỏ (với IP nguồn giả là IP nạn nhân) đến server thứ ba (reflector), server phản hồi gói tin LỚN hơn nhiều về địa chỉ nạn nhân.

**Ví dụ DNS amplification** (hệ số khuếch đại ~28-54×):
- Kẻ tấn công: gửi DNS query `ANY example.com` (60 byte), IP nguồn = IP nạn nhân.
- DNS resolver mở: phản hồi ~1800-3000 byte về IP nạn nhân.
- Với 10.000 resolver và 1 Mbps bandwidth của kẻ tấn công → nạn nhân nhận ~28-54 Mbps.
- Với botnet 1 Gbps → nạn nhân bị tấn công tới ~28-54 Gbps.

**Ví dụ NTP amplification** (hệ số ~556×):
- Lệnh `monlist` của NTP trả về danh sách 600 địa chỉ IP gần nhất — payload ~480× request.

**Phòng thủ amplification**:
- **BCP38 / Ingress filtering**: ISP lọc packet có IP nguồn không hợp lệ (IP nguồn không thuộc mạng của ISP đó) — nếu áp dụng rộng rãi, IP spoofing không còn hiệu quả.
- Vô hiệu hóa tính năng khuếch đại: tắt `ANY` DNS query, tắt `monlist` NTP.
- Rate limiting phản hồi DNS: `--limit-rate 1/10s` per IP.

❓ **Câu hỏi tự nhiên**:

- _"SYN cookies có nhược điểm gì không?"_ — Có: mất một số tính năng TCP như TCP timestamp option và window scale, vì những thông tin đó không được lưu trong cookie. Ảnh hưởng nhỏ nhưng tồn tại.
- _"Tại sao BCP38 không được áp dụng toàn diện?"_ — Vì đòi hỏi sự phối hợp của tất cả ISP trên thế giới. ISP không triển khai BCP38 không bị thiệt hại trực tiếp (thiệt hại đổ lên nạn nhân của tấn công), nên thiếu động lực kinh tế.
- _"Có cách nào phân biệt DoS từ traffic spike hợp lệ không?"_ — Cần phân tích phân phối: DoS thường có IP nguồn giả hoặc phân phối bất thường (quá nhiều SYN không có ACK, TTL đồng đều,...). Traffic hợp lệ thường có phân phối địa lý tự nhiên.

⚠ **Lỗi thường gặp**:
- Nhầm DoS với DDoS: DoS từ một nguồn, DDoS từ nhiều nguồn. Phòng thủ khác nhau: DoS có thể chặn bằng firewall rule đơn giản; DDoS cần scrubbing/anycast.
- Nghĩ SYN cookies là "giải pháp hoàn hảo": SYN cookies chỉ giải quyết SYN backlog, không chặn được volumetric DDoS làm đầy băng thông đường truyền.

🔁 **Tự kiểm tra**:

> Một admin nhận được cảnh báo: `SYN_RCVD connections: 12,847` trên server. Server có `net.ipv4.tcp_syncookies=0`. Điều gì xảy ra và phải làm gì?

<details>
<summary>Xem đáp án</summary>

Server đang bị SYN flood: 12.847 kết nối half-open lấp đầy SYN backlog, người dùng hợp lệ không kết nối được. Việc cần làm ngay: `sysctl -w net.ipv4.tcp_syncookies=1` để bật SYN cookies (không cần restart). Đồng thời liên hệ ISP hoặc dịch vụ DDoS protection để lọc upstream.
</details>

📝 **Tóm tắt mục 2**:
- DoS làm cạn tài nguyên server; DDoS dùng botnet quy mô lớn.
- SYN flood: lấp đầy SYN backlog bằng kết nối half-open giả. Chặn bằng SYN cookies.
- Amplification: khuếch đại lưu lượng qua reflector. Chặn bằng ingress filtering (BCP38) + tắt tính năng khuếch đại.
- Phòng thủ nhiều lớp: rate limit tại firewall, SYN cookies tại kernel, scrubbing tại ISP/CDN.

---

## 3. MITM — Man-in-the-Middle (Kẻ đứng giữa)

### 3.1. Nguyên lý

💡 **Analogy**: MITM giống một nhân viên bưu điện giả mạo ngồi giữa đường thư — chặn thư của bạn, đọc nội dung (mất C), sửa rồi tiếp tục gửi đi (mất I), và cả hai phía cứ tưởng đang nói chuyện trực tiếp với nhau.

Trong mạng máy tính, MITM xảy ra khi kẻ tấn công (attacker) tự đặt mình vào giữa hai bên giao tiếp:

```
Bình thường:  Client  <──────────────>  Server
MITM:         Client  <──>  Attacker  <──>  Server
```

**MITM passive** (nghe lén): Attacker chỉ đọc lưu lượng, không sửa. Ảnh hưởng: mất **Confidentiality**.

**MITM active** (giả mạo hai chiều): Attacker đóng giả là Server với Client và đóng giả là Client với Server. Có thể đọc VÀ sửa nội dung. Ảnh hưởng: mất **Confidentiality + Integrity**.

### 3.2. Cách xảy ra MITM trên mạng

MITM thường được kích hoạt qua các kỹ thuật spoofing (sẽ học ở mục 4):

- **ARP spoofing** (trên LAN): kẻ tấn công gửi ARP reply giả, nói "MAC của gateway là MAC của tôi" → toàn bộ traffic LAN đi qua máy attacker.
- **DNS spoofing**: trỏ tên miền hợp lệ vào IP của attacker → người dùng kết nối đến máy attacker thay vì server thật.
- **Evil twin Wi-Fi**: dựng access point giả cùng tên SSID ở nơi công cộng → người dùng kết nối nhầm.
- **BGP hijacking**: quy mô ISP, thay đổi bảng định tuyến để traffic đi qua AS của attacker.

### 3.3. Tại sao TLS chặn được MITM

**Vấn đề cốt lõi của MITM**: làm sao biết bạn đang nói chuyện với đúng người?

TLS giải quyết điều này bằng **xác thực (authentication)** qua chứng chỉ số (digital certificate), sử dụng hạ tầng Public Key Infrastructure (PKI):

1. Server gửi **chứng chỉ TLS** (certificate) chứa:
   - Tên miền server (CN/SAN): `example.com`.
   - Khóa công khai (public key) của server.
   - Chữ ký số của CA (Certificate Authority) tin cậy.

2. Client kiểm tra:
   - Chứng chỉ có được ký bởi CA trong danh sách CA tin cậy (trust store) không?
   - Tên miền trong chứng chỉ có khớp với server đang kết nối không?
   - Chứng chỉ có còn hạn không?

3. **MITM thất bại** vì: kẻ tấn công không có khóa riêng (private key) của server thật. Kẻ tấn công có thể tự tạo chứng chỉ cho mình, nhưng chứng chỉ đó không được CA tin cậy ký → trình duyệt hiển thị cảnh báo bảo mật `NET::ERR_CERT_AUTHORITY_INVALID`.

> Liên kết chi tiết với cơ chế bắt tay TLS: [Lesson 06 — TLS](../../02-Application-Services/lesson-06-tls/).

**Điều kiện TLS hoạt động đúng** (và MITM vẫn thành công nếu vi phạm):

- Người dùng KHÔNG bỏ qua cảnh báo chứng chỉ → nếu bỏ qua, TLS vô hiệu.
- Không có CA giả mạo trong trust store → malware cài CA giả vào hệ thống có thể MITM cả HTTPS.
- Tên miền phải được kiểm tra kỹ → homograph attack (dùng Unicode giống ASCII: `аpple.com` vs `apple.com`).

❓ **Câu hỏi tự nhiên**:

- _"Nếu tôi dùng HTTPS, tôi có an toàn khỏi MITM 100%?"_ — Gần như, nhưng không 100%: (1) nếu bỏ qua cảnh báo cert, (2) nếu có CA giả trong trust store (malware), (3) nếu dùng HTTP/1.0 không upgrade lên HTTPS (không dùng HSTS).
- _"HSTS là gì và liên quan thế nào?"_ — HTTP Strict Transport Security: server nói với browser "chỉ kết nối tôi qua HTTPS, không bao giờ HTTP". Chặn downgrade attack (attacker ép client dùng HTTP thay HTTPS).

⚠ **Lỗi thường gặp**:
- Nghĩ "mạng công ty an toàn nên không cần TLS": nội bộ vẫn có thể có MITM qua ARP spoofing.
- Nghĩ "chỉ cần HTTPS là đủ": vẫn cần kiểm tra chứng chỉ, dùng HSTS, không cài CA lạ.

📝 **Tóm tắt mục 3**:
- MITM: attacker chèn vào giữa hai bên, đọc/sửa traffic.
- Thực hiện qua ARP/DNS spoofing, evil twin Wi-Fi, BGP hijacking.
- TLS chặn MITM bằng xác thực chứng chỉ CA — attacker không thể giả mạo private key.
- TLS chỉ hiệu quả khi không bỏ qua cảnh báo và trust store sạch.

---

## 4. Spoofing — Giả mạo danh tính

### 4.1. IP Spoofing

**IP spoofing**: kẻ tấn công tạo gói tin IP với trường **Source IP** giả (không phải IP thật của họ).

**Vì sao có thể làm điều này?** IPv4 không có xác thực nguồn gốc — header IP có thể ghi bất kỳ địa chỉ nguồn nào.

**Mục đích thường dùng**:
- Ẩn danh tính trong tấn công DoS/DDoS.
- Khuếch đại lưu lượng trong amplification attack.
- Bước khởi đầu cho MITM.

**Hạn chế của IP spoofing**: Nếu kẻ tấn công dùng IP giả, phản hồi từ server sẽ đến IP đó (không phải IP thật của attacker) → **không thể nhận phản hồi**. Nên IP spoofing chủ yếu dùng cho tấn công **một chiều** (flood, amplification).

**Phòng thủ**:
- **BCP38 / Ingress filtering tại ISP**: router biên của ISP lọc và từ chối packet có IP nguồn không thuộc địa chỉ IP của khách hàng đó.
  ```
  Ví dụ: ISP A cấp cho công ty dải 203.0.113.0/24.
  Nếu packet từ công ty có src IP = 1.2.3.4 (không thuộc dải trên) → router ISP A DROP.
  ```
- **uRPF (Unicast Reverse Path Forwarding)**: router kiểm tra "gói tin đến từ interface X, IP nguồn Y — route về Y có qua interface X không?". Nếu không → DROP.

### 4.2. ARP Spoofing

**ARP spoofing** (hay ARP poisoning): kẻ tấn công gửi **ARP reply giả** để ghi đè bảng ARP cache của nạn nhân, ánh xạ IP của gateway (hoặc host khác) sang MAC address của attacker.

**Cơ chế** (kết nối với [Lesson 05 Tier 1 — ARP](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/)):

```
Bình thường:
  Host A: "10.0.0.1 (gateway) có MAC là aa:bb:cc:dd:ee:ff"  ← đúng
  Host A gửi traffic đến gateway thật

ARP spoofing (attacker = 10.0.0.99):
  Attacker gửi ARP reply: "10.0.0.1 có MAC là 11:22:33:44:55:66" (MAC của attacker)
  Host A cập nhật ARP cache: 10.0.0.1 → 11:22:33:44:55:66
  Host A gửi traffic qua attacker → attacker forward tiếp (MITM) hoặc drop (DoS)
```

**Dấu hiệu nhận biết**:
- `arp -n` hoặc `arp -a` trên host bị tấn công: một IP có nhiều MAC, hoặc MAC của gateway thay đổi bất thường.
- Nhiều ARP reply không được yêu cầu (gratuitous ARP) trong log switch.
- Công cụ phát hiện: `arpwatch`, XDP-based detection.

**Phòng thủ**:

1. **DHCP Snooping**: Switch lưu bảng "cổng switch nào được phép có IP nào" (DHCP snooping binding table). Chỉ tin DHCP offer từ cổng trusted (uplink đến DHCP server); DROP DHCP offer giả từ cổng untrusted.

2. **DAI (Dynamic ARP Inspection)**: Dựa trên bảng DHCP snooping, switch kiểm tra mọi ARP packet: "IP này có được cấp cho MAC này qua DHCP không?". Nếu không khớp → DROP ARP packet giả. Cấu hình Cisco:
   ```
   ip dhcp snooping
   ip dhcp snooping vlan 10
   ip arp inspection vlan 10
   interface GigabitEthernet0/1  ! cổng uplink
     ip dhcp snooping trust
     ip arp inspection trust
   ```

3. **Static ARP entries**: Với các thiết bị quan trọng (gateway), cài ARP tĩnh:
   ```
   arp -s 10.0.0.1 aa:bb:cc:dd:ee:ff
   ```
   Nhược điểm: khó quản lý ở quy mô lớn.

### 4.3. DNS Cache Poisoning (DNS Spoofing)

**DNS cache poisoning**: kẻ tấn công đưa bản ghi DNS giả vào cache của recursive resolver, khiến các truy vấn tiếp theo về domain đó bị trỏ đến IP độc hại.

**Cơ chế** (kết nối với [Lesson 02 Tier 2 — DNS](../../02-Application-Services/lesson-02-dns/)):

Resolver gửi query (UDP, port 53) và đặt một **Transaction ID** 16-bit để ghép câu trả lời. Tấn công Kaminsky (2008):

```
1. Attacker yêu cầu resolver phân giải 1234.example.com (subdomain ngẫu nhiên, chắc chắn cache miss).
2. Resolver gửi query đến authoritative NS của example.com, Transaction ID = X.
3. Attacker ngay lập tức gửi hàng loạt UDP response giả:
   Transaction ID = 0, 1, 2, ..., 65535 (bruteforce 16-bit).
   Nội dung: "example.com. A 1.2.3.4 (IP attacker), NS ns1.attacker.com, TTL 86400".
4. Nếu một response giả đến trước response thật và Transaction ID khớp → resolver lưu vào cache.
5. Mọi query example.com từ toàn bộ user của resolver này bị điều hướng đến IP attacker trong 86400 giây.
```

**Dấu hiệu**:
- Người dùng bị redirect đến trang lạ dù URL đúng.
- `dig @<resolver> example.com` trả về IP khác với giá trị đúng từ authoritative NS.
- SOA serial không khớp.

**Phòng thủ**:

1. **DNSSEC (DNS Security Extensions)**: Authoritative NS ký chữ ký số (RSA/ECDSA) lên mọi record DNS. Resolver xác thực chữ ký bằng khóa công khai (DNSKEY). Attacker không có khóa riêng của authoritative NS → không thể tạo response giả hợp lệ.
   ```
   ; Kiểm tra DNSSEC:
   dig +dnssec example.com A
   ; Nếu có RRSIG trong response → DNSSEC được ký
   ; Nếu resolver có DNSSEC validation → AD flag set trong response
   ```

2. **Source port randomization + Query ID randomization**: Resolver dùng cổng nguồn UDP ngẫu nhiên (16-bit cộng thêm với Transaction ID 16-bit = 32-bit không gian tấn công → ~4 tỉ combination). Làm tăng khó khăn bruteforce từ ~65.535 lên ~4.294.967.295 lần thử.

3. **DNS over HTTPS (DoH) / DNS over TLS (DoT)**: Mã hóa transport → attacker không thể chèn response giả vào kênh mã hóa.

4. **Response Rate Limiting (RRL) tại resolver**: Giới hạn số response tương tự trong một giây từ một nguồn → chặn flooding resolver.

❓ **Câu hỏi tự nhiên**:

- _"DNSSEC có bảo vệ người dùng cuối không?"_ — DNSSEC bảo vệ dữ liệu từ authoritative NS đến recursive resolver. Giữa resolver và người dùng vẫn cần DoH/DoT để an toàn hoàn toàn.
- _"ARP spoofing có hoạt động qua router không?"_ — Không. ARP là giao thức layer 2, chỉ trong cùng broadcast domain (VLAN/LAN segment). Router cô lập các segment → ARP spoofing chỉ ảnh hưởng nội bộ cùng mạng con.
- _"DNSSEC có phải mọi domain đều dùng không?"_ — Không. Tính đến 2024, chỉ khoảng 30-40% domain .com có DNSSEC, và phần lớn các TLD lớn (như .vn) đã ký. Nhưng mỗi zone cần được cấu hình riêng.

⚠ **Lỗi thường gặp**:
- Nhầm DNS spoofing với DNS hijacking: DNS hijacking là tấn công chiếm quyền điều khiển DNS server thật (thay đổi cấu hình), khác với cache poisoning (chỉ đầu độc cache resolver).
- Nghĩ IP spoofing cho phép nhận phản hồi từ server: không đúng — TCP handshake sẽ thất bại vì phản hồi đến IP giả, không phải IP thật của attacker.

🔁 **Tự kiểm tra**:

> Admin nhận báo cáo: "Người dùng dùng Wi-Fi công ty bị redirect từ bank.example.com đến trang giống hệt nhưng có kết nối HTTP (không phải HTTPS)". Đây là loại tấn công gì? Giải pháp ngay lập tức?

<details>
<summary>Xem đáp án</summary>

Đây có thể là ARP spoofing trên LAN → MITM → kẻ tấn công intercept và strip HTTPS (SSL stripping). Giải pháp ngay: (1) Bật HSTS với `max-age` dài cho bank.example.com (browser không bao giờ cho phép HTTP với HSTS). (2) Bật DHCP snooping và DAI trên switch. (3) Yêu cầu người dùng kiểm tra HTTPS padlock trước khi nhập thông tin.
</details>

📝 **Tóm tắt mục 4**:
- IP spoofing: ghi src IP giả. Chặn bằng BCP38/ingress filtering tại ISP.
- ARP spoofing: ghi đè ARP cache, MITM trên LAN. Chặn bằng DHCP snooping + DAI.
- DNS cache poisoning: đưa bản ghi giả vào resolver cache. Chặn bằng DNSSEC, DoH/DoT, source port randomization.

---

## 5. Port Scan & Reconnaissance (Trinh sát mạng)

### 5.1. Mục đích của kẻ tấn công

💡 **Analogy**: Trước khi đột nhập tòa nhà, kẻ trộm lành nghề đi một vòng kiểm tra: cửa nào khóa, cửa nào hở, bảo vệ đứng ở đâu, hệ thống camera thế nào. Port scan là bước "trinh sát" tương đương trong không gian mạng.

Kẻ tấn công scan port để tìm:
- Dịch vụ nào đang chạy và trên port nào (SSH/22, HTTP/80, HTTPS/443, MySQL/3306...).
- Phiên bản phần mềm (để biết có lỗ hổng CVE đã biết hay không).
- Topology mạng (những IP nào còn sống, OS fingerprint).
- Firewall rule: port nào bị chặn, port nào mở.

### 5.2. Kỹ thuật scan phổ biến (hiểu để phòng thủ)

| Kỹ thuật | Nguyên lý | Đặc điểm phát hiện |
|----------|-----------|-------------------|
| **TCP Connect scan** | Hoàn thành đầy đủ TCP 3-way handshake | Để lại log đầy đủ trong server |
| **TCP SYN scan (half-open)** | Gửi SYN, nhận SYN-ACK, gửi RST (không hoàn thành) | Ít log hơn nhưng IDS vẫn phát hiện |
| **UDP scan** | Gửi UDP packet, port đóng → ICMP "port unreachable" | Chậm, nhiễu nhiều |
| **NULL/FIN/Xmas scan** | Gửi packet với cờ TCP bất thường | Có thể qua lọc stateless; IDS có chữ ký |
| **IDLE scan** | Dùng host trung gian (zombie) để ẩn IP nguồn | Khó truy tìm attacker thật |

**Công cụ phổ biến nhất**: Nmap (`nmap -sS -O -sV target`).

### 5.3. Dấu hiệu nhận biết port scan

- **Nhiều kết nối từ một IP đến nhiều port khác nhau trong thời gian ngắn**: bình thường một client chỉ kết nối đến vài port cụ thể; scan thường thấy 100-65535 port trong vài giây.
- **Tỷ lệ RST/SYN-ACK cao**: SYN scan gửi RST sau khi nhận SYN-ACK → tỷ lệ RST bất thường.
- **ICMP "port unreachable" liên tục**: dấu hiệu UDP scan.
- **Kết nối đến port không tồn tại dịch vụ**: honeypot port.
- **Log firewall**: nhiều DENY từ cùng IP đến nhiều port.

Lệnh kiểm tra ngay trên Linux:
```bash
# Xem kết nối đang mở và trạng thái
ss -tnp | grep SYN_RECV
# Xem log auth và connection attempt
journalctl -u ssh | grep "Connection from" | sort | uniq -c | sort -rn | head -20
# Đếm số port bị scan từ mỗi IP (cần tcpdump hoặc netflow)
```

### 5.4. Phòng thủ port scan

1. **Đóng port không cần thiết**: Mọi port mở là bề mặt tấn công (attack surface). Kiểm tra: `ss -tlnp` (Linux) hoặc `netstat -ano` (Windows) — đóng dịch vụ không cần thiết.

2. **Firewall default-deny**: Mặc định DROP tất cả, chỉ ACCEPT những gì cần:
   ```bash
   iptables -P INPUT DROP
   iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
   iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # chỉ mở HTTPS
   ```

3. **IDS/IPS (Intrusion Detection/Prevention System)**: Snort, Suricata có chữ ký phát hiện Nmap SYN scan, NULL/FIN/Xmas scan. IPS có thể tự động block IP scan sau N lần.

4. **Port knocking**: Sequence port "gõ" bí mật để mở port SSH — port 22 đóng với mọi người, chỉ mở sau khi client gõ đúng thứ tự (ví dụ: kết nối port 1111, 2222, 3333 trong vòng 10 giây).

5. **Honeypot ports**: Mở một số port giả (ví dụ: port 23 Telnet) không có dịch vụ thật — bất kỳ kết nối đến đây là dấu hiệu scan/tấn công. Ghi log và alert ngay.

6. **Rate limiting kết nối mới (connection rate limiting)**:
   ```bash
   # Chặn IP nào cố kết nối đến >20 port/giây
   iptables -A INPUT -p tcp --syn -m recent --name portscan --set
   iptables -A INPUT -p tcp --syn -m recent --name portscan --rcheck --seconds 1 --hitcount 20 -j DROP
   ```

❓ **Câu hỏi tự nhiên**:

- _"Port scan có vi phạm pháp luật không?"_ — Scan mạng mà không được phép là xâm phạm trái phép (unauthorized access) ở hầu hết các quốc gia, kể cả khi chưa có hành vi tấn công cụ thể. Pen test hợp lệ cần có hợp đồng/sự cho phép bằng văn bản.
- _"Tắt firewall có làm scan nhanh hơn không?"_ — Có. Firewall block ICMP/RST → scan phải chờ timeout (thường 3-10 giây/port). Với 65535 port × 3 giây = hơn 54 giờ. Firewall chậm scanner đáng kể.

⚠ **Lỗi thường gặp**:
- Nghĩ "dịch vụ nội bộ không cần bảo mật vì đã có firewall ngoài": lateral movement — sau khi attacker vào được mạng nội bộ qua một máy bị hại, họ scan mạng nội bộ.
- Đặt tất cả trứng vào giỏ IDS: IDS có thể bị bypass bằng fragmentation, timing attack, IP rotation.

📝 **Tóm tắt mục 5**:
- Port scan = bước trinh sát để tìm bề mặt tấn công.
- Dấu hiệu: nhiều kết nối từ 1 IP đến nhiều port trong thời gian ngắn.
- Phòng thủ: đóng port thừa, firewall default-deny, IDS/IPS, rate limiting, honeypot port.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Nhận diện loại tấn công từ log**:

Quan sát đoạn log sau từ firewall:
```
10:01:00  SRC=192.168.5.77  DPORT=80   SYN
10:01:00  SRC=192.168.5.77  DPORT=443  SYN
10:01:00  SRC=192.168.5.77  DPORT=22   SYN
10:01:00  SRC=192.168.5.77  DPORT=21   SYN
10:01:00  SRC=192.168.5.77  DPORT=3306 SYN
10:01:00  SRC=192.168.5.77  DPORT=8080 SYN
10:01:00  SRC=192.168.5.77  DPORT=25   SYN
10:01:01  SRC=192.168.5.77  DPORT=110  SYN
[... tiếp tục đến port 1024 trong vòng 5 giây ...]
```
a) Đây là loại tấn công gì?
b) Mục tiêu CIA bị tổn hại?
c) Biện pháp phòng thủ?

**Bài 2 — SYN flood & SYN cookies**:

Server nhận 50.000 SYN/giây, timeout half-open = 60 giây, SYN backlog = 1024.
a) Sau bao nhiêu giây SYN backlog đầy (không có SYN cookies)?
b) Nếu bật SYN cookies, điều gì thay đổi về việc cấp phát trạng thái?
c) Kẻ tấn công có 10.000 máy botnet, mỗi máy gửi 5 SYN/giây, tổng = 50.000 SYN/giây. Tại sao đây là DDoS chứ không phải DoS?

**Bài 3 — Vì sao TLS chặn MITM**:

Alice kết nối đến `bank.example.com`. Attacker Eve đang ở giữa (qua ARP spoofing).
a) Eve cố gắng phản hồi TLS ClientHello với chứng chỉ tự ký cho `bank.example.com`. Browser của Alice hiển thị gì?
b) Eve chiếm được chứng chỉ hợp lệ của `bank.example.com` (giả sử). Eve vẫn thất bại — tại sao?
c) Trường hợp nào Eve thành công (điều kiện để MITM qua TLS)?

**Bài 4 — Phân tích SYN flood từ tcpdump**:

```
10:00:00.001  1.2.3.4:54231 > 10.0.0.1:80 SYN seq=1000
10:00:00.002  5.6.7.8:12345 > 10.0.0.1:80 SYN seq=2000
10:00:00.003  9.10.11.12:33421 > 10.0.0.1:80 SYN seq=3000
[2000 dòng tương tự trong 0.1 giây, IP nguồn mỗi lần khác nhau]
10:00:00.010  10.0.0.1:80 > 1.2.3.4:54231 SYN-ACK seq=5000 ack=1001
10:00:00.010  10.0.0.1:80 > 5.6.7.8:12345 SYN-ACK seq=6000 ack=2001
[Không có ACK nào đến sau đó]
```
a) Tại sao IP nguồn thay đổi liên tục?
b) Tại sao không có ACK?
c) Sau 60 giây (timeout), server xử lý 50.000 half-open × 128 byte/entry = bao nhiêu MB bộ nhớ bị chiếm?

**Bài 5 — Chọn biện pháp phòng thủ**:

Cho các kịch bản sau, chọn biện pháp phòng thủ phù hợp nhất:

a) Người dùng trong cùng LAN có thể redirect traffic của nhau qua máy mình.
b) DNS resolver của công ty bị đầu độc cache, người dùng bị redirect đến trang lừa đảo.
c) Server bị ngập bởi 100.000 SYN/giây từ 50.000 IP khác nhau.
d) Attacker biết chính xác cổng SSH (22) đang mở và brute-force mật khẩu.

**Bài 6 — Phân tích DNS cache poisoning**:

Transaction ID của DNS là 16 bit. Resolver dùng cổng nguồn cố định 53/UDP và Transaction ID tuần tự.
a) Attacker cần gửi bao nhiêu response giả để có 50% xác suất trúng Transaction ID?
b) Nếu source port được random hóa (16 bit bổ sung), không gian tìm kiếm trở thành bao nhiêu bit?
c) DNSSEC giải quyết vấn đề này như thế nào (không phải làm nhỏ không gian tìm kiếm)?

### Lời giải chi tiết

**Bài 1**:

a) **Port scan (reconnaissance)** — cụ thể là TCP SYN scan: một IP (192.168.5.77) kết nối đến hàng loạt port khác nhau trên cùng đích trong thời gian ngắn (1024 port/5 giây ≈ 200 port/giây).

b) Bản thân port scan **không trực tiếp tổn hại CIA** — đây là bước tiền trinh sát. Tuy nhiên thông tin thu được (dịch vụ, phiên bản) có thể được dùng để tổn hại cả ba sau đó. Nhiều tổ chức phân loại unauthorized scan là vi phạm **Availability** (tạo tải không cần thiết) và **Confidentiality** (lộ cấu trúc mạng nội bộ).

c) Biện pháp phòng thủ:
- Tức thời: `iptables -A INPUT -s 192.168.5.77 -j DROP` (chặn IP scan).
- Dài hạn: rate limiting (chặn >20 SYN/giây/IP), IDS/Snort alert, đóng port không cần thiết, honeypot port để phát hiện sớm.

---

**Bài 2**:

a) Thời gian đầy backlog = 1024 entries / 50.000 SYN/giây = **0.02 giây** (~20 ms). SYN backlog đầy gần như tức thì.

b) Với SYN cookies: **server không cấp phát entry half-open** trong SYN backlog. Thông tin kết nối được mã hóa vào ISN của SYN-ACK. Kết quả: SYN backlog không bao giờ đầy — tấn công SYN flood không còn hiệu quả với cơ chế này. Server vẫn xử lý từng SYN-ACK (tốn CPU) nhưng không bị tràn memory.

c) 10.000 máy botnet mỗi máy ở địa điểm khác nhau, với IP khác nhau = **DDoS** (Distributed DoS): không thể chặn bằng một firewall rule dựa trên IP nguồn. Cần giải pháp phân tán (anycast, scrubbing center). Nếu chỉ một máy (DoS), có thể chặn bằng `iptables -s <IP> -j DROP`.

---

**Bài 3**:

a) Browser của Alice hiển thị **cảnh báo chứng chỉ** (`NET::ERR_CERT_AUTHORITY_INVALID` trên Chrome): "Kết nối của bạn không riêng tư". Lý do: chứng chỉ tự ký không được ký bởi CA trong trust store của browser.

b) Dù Eve có chứng chỉ hợp lệ của `bank.example.com`, Eve **không có private key** tương ứng. Trong TLS handshake, server phải chứng minh sở hữu private key bằng cách ký vào challenge của client. Eve không thể làm được điều này → handshake thất bại.

c) MITM thành công qua TLS khi:
1. Alice bỏ qua cảnh báo chứng chỉ (click "Advanced > Proceed anyway").
2. Eve cài được CA giả vào trust store của Alice (thường qua malware, hoặc MDM của công ty — dùng cho SSL inspection).
3. Alice dùng HTTP (không phải HTTPS) và không có HSTS → SSL stripping.
4. Lỗ hổng TLS implementation (rất hiếm, ví dụ: Heartbleed không phải MITM nhưng lộ private key → có thể dùng cho MITM).

---

**Bài 4**:

a) IP nguồn thay đổi liên tục → **IP spoofing**: kẻ tấn công tạo packet SYN với IP nguồn ngẫu nhiên. Mục đích kép: (1) ẩn IP thật, (2) đảm bảo SYN-ACK không về máy attacker (attacker không cần nhận phản hồi).

b) SYN-ACK từ server đến các IP giả — các IP đó hoặc không tồn tại, hoặc tồn tại nhưng không gửi SYN → không trả ACK. Server chờ timeout (60-75 giây) → entry half-open chiếm bộ nhớ suốt thời gian đó.

c) 50.000 entry × 128 byte = 6.400.000 byte = **6.1 MB** bộ nhớ kernel bị chiếm cho half-open connections. Con số nhỏ về dung lượng, nhưng **số lượng entry** quan trọng hơn: kernel thường giới hạn SYN backlog ở 1.024–4.096 entry, sau đó DROP mọi SYN mới. Đây là cơ chế gây từ chối dịch vụ.

---

**Bài 5**:

a) **DHCP snooping + DAI (Dynamic ARP Inspection)**: ngăn ARP spoofing trên LAN. Switch từ chối ARP reply không khớp với bảng binding DHCP.

b) **DNSSEC**: Resolver xác thực chữ ký số trên DNS record. Attacker không có private key của zone `company.com` → không thể tạo record giả hợp lệ. Kết hợp với DoH/DoT để bảo vệ toàn bộ đường đi.

c) **DDoS protection service (Cloudflare/AWS Shield) + anycast**: lưu lượng 100.000 SYN/giây vượt xa khả năng xử lý local. Cần lọc upstream tại scrubbing center. SYN cookies bổ sung để tránh SYN backlog overflow.

d) **Đóng port 22 với public internet + port knocking hoặc VPN**: chỉ cho phép SSH từ IP tin cậy qua VPN, hoặc dùng port knocking. Kết hợp với fail2ban để tự block IP brute-force sau N lần sai.

---

**Bài 6**:

a) Transaction ID 16-bit → 65.536 giá trị. Để có 50% xác suất trúng theo Birthday paradox đơn giản (thực tế là brute force tuần tự): cần thử khoảng **32.768 response** (~65.536/2). Trong thực tế attack Kaminsky, kẻ tấn công gửi cả 65.536 response để đảm bảo trúng.

b) Source port random 16-bit + Transaction ID 16-bit = **32-bit không gian** = 4.294.967.296 combination. Cần gửi ~2 tỷ response để đạt 50% — trong khi resolver chỉ chờ response trong vài giây (timeout) → gần như không thể brute-force trong thực tế.

c) DNSSEC **không thu nhỏ không gian tìm kiếm** mà **thay đổi cơ bản cách xác thực**: authoritative NS ký RRSIG (Resource Record Signature) lên mỗi DNS record bằng private key. Resolver xác thực bằng DNSKEY public key (được lấy an toàn qua chain of trust từ root). Attacker gửi response giả không có RRSIG hợp lệ → resolver reject. Kể cả có không gian tìm kiếm vô hạn, attacker vẫn không thể tạo được chữ ký hợp lệ mà không có private key.

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Mạng không dây (Wireless Networking)](../lesson-03-wireless/) — bảo mật Wi-Fi (WPA2/WPA3), tấn công evil twin.
- **Liên kết bài liên quan**:
  - [An ninh mạng — CIA, defense-in-depth](../lesson-01-network-security/).
  - [TCP — bắt tay 3 bước, trạng thái SYN_RCVD](../../01-Foundations-LowerLayers/lesson-08-tcp/).
  - [ARP — address resolution, ARP cache](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/).
  - [DNS — phân giải tên miền, recursive query](../../02-Application-Services/lesson-02-dns/).
  - [TLS — PKI, chứng chỉ số, bắt tay TLS](../../02-Application-Services/lesson-06-tls/).

---

## 📝 Tổng kết Lesson 02

1. **CIA framework**: phân loại tấn công theo Confidentiality / Integrity / Availability — chọn biện pháp phòng thủ dựa vào CIA bị tổn hại.
2. **DoS/DDoS**: làm cạn tài nguyên (bandwidth, backlog, CPU). SYN flood đặc thù với TCP → phòng bằng SYN cookies. DDoS cần anycast/scrubbing.
3. **MITM**: kẻ thứ ba chèn vào giữa kết nối. TLS chặn bằng xác thực chứng chỉ CA — chỉ hiệu quả khi không bỏ qua cảnh báo.
4. **Spoofing**: IP spoofing (ẩn danh, flood) → BCP38; ARP spoofing (MITM trên LAN) → DHCP snooping + DAI; DNS cache poisoning → DNSSEC + DoH/DoT.
5. **Port scan**: tiền trinh sát, không trực tiếp tổn hại CIA nhưng mở đường tấn công. Phòng bằng đóng port thừa, default-deny firewall, IDS, rate limiting.

**Nguyên tắc phòng thủ xuyên suốt**: không có một biện pháp duy nhất đủ mạnh — **defense in depth** (nhiều lớp phòng thủ bổ sung nhau): mã hóa + xác thực + kiểm soát truy cập + giám sát.
