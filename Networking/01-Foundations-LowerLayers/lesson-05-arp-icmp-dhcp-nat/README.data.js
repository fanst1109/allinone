// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — ARP, ICMP, DHCP, NAT

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được cơ chế **ARP** (Address Resolution Protocol) — cách máy tính tìm địa chỉ MAC từ địa chỉ IP trong cùng LAN.
- Mô tả được **ICMP** và hai ứng dụng thực tế: \`ping\` (echo request/reply) và \`traceroute\` (Time Exceeded).
- Trình bày được quy trình **DHCP DORA** (Discover, Offer, Request, Ack) cấp IP tự động cho thiết bị mới.
- Giải thích được **NAT/PAT** — vì sao cần, cách bảng dịch địa chỉ hoạt động với IP:port.
- Kết nối được bức tranh tổng thể: máy mới vào mạng → DHCP lấy IP → ARP tìm gateway → gói ra ngoài qua NAT.

## Kiến thức tiền đề

- [Lesson 02 — Ethernet & Link Layer](../lesson-02-link-ethernet/) — địa chỉ MAC, Ethernet frame.
- [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — địa chỉ IP, prefix, private IP ranges.
- [Lesson 04 — Định tuyến](../lesson-04-routing/) — router, bảng định tuyến, default gateway.

---

## 1. ARP — Cầu nối giữa tầng IP và tầng Ethernet

### 1.1. Vấn đề cần giải quyết

💡 **Trực giác**: Hãy tưởng tượng bạn biết **tên** (địa chỉ IP) của người cần gặp trong tòa nhà, nhưng chưa biết **số phòng** (địa chỉ MAC) của họ. Bạn hét to (broadcast) lên: "Ai là người tên 192.168.1.5? Báo số phòng cho tôi với!" Người đó trả lời riêng: "Tôi đây, phòng AA:BB:CC:DD:EE:FF." Đó chính xác là cách ARP hoạt động.

**Vấn đề cụ thể**: IP hoạt động ở tầng 3, nhưng Ethernet (tầng 2) chuyển frame bằng địa chỉ **MAC** 48-bit. Để gửi gói IP tới 192.168.1.5, card mạng phải biết MAC tương ứng — và đó là việc ARP làm.

**ARP** (Address Resolution Protocol) là giao thức **ánh xạ IP → MAC** trong phạm vi một LAN.

### 1.2. Cấu trúc bản tin ARP

ARP Request (broadcast) chứa:

| Trường | Giá trị ví dụ | Ý nghĩa |
|--------|---------------|---------|
| Hardware type | 1 (Ethernet) | Loại liên kết vật lý |
| Protocol type | 0x0800 (IPv4) | Loại địa chỉ logic |
| Sender MAC | \`AA:BB:CC:11:22:33\` | MAC của máy hỏi |
| Sender IP | \`192.168.1.10\` | IP của máy hỏi |
| Target MAC | \`00:00:00:00:00:00\` | Chưa biết — đây là điều cần tìm |
| Target IP | \`192.168.1.5\` | IP cần tìm MAC |

ARP Reply (unicast) giống vậy nhưng Target MAC đã được điền.

### 1.3. Walk-through một lần phân giải ARP

**Kịch bản**: Máy A (\`192.168.1.10\`, MAC \`AA:11:22:33:44:55\`) muốn ping máy B (\`192.168.1.5\`, MAC \`BB:66:77:88:99:AA\`). Cả hai cùng LAN \`/24\`.

**Bước 1 — Kiểm tra ARP cache**:
Trước khi hỏi, A tra bảng ARP cache (lưu trong bộ nhớ RAM). Nếu đã có \`192.168.1.5 → BB:66:77:88:99:AA\`, dùng ngay — không cần gửi ARP.

Giả sử cache chưa có → tiếp tục.

**Bước 2 — Gửi ARP Request (broadcast)**:
\`\`\`
Ethernet frame:
  Src MAC : AA:11:22:33:44:55
  Dst MAC : FF:FF:FF:FF:FF:FF  ← broadcast, mọi máy trong LAN đều nhận
  Ethertype: 0x0806 (ARP)

ARP payload:
  Sender MAC = AA:11:22:33:44:55
  Sender IP  = 192.168.1.10
  Target MAC = 00:00:00:00:00:00
  Target IP  = 192.168.1.5
\`\`\`

**Bước 3 — Mọi máy nhận, chỉ B phản hồi**:
Máy C, D, E nhận frame, thấy Target IP ≠ IP của mình → im lặng, bỏ qua.
Máy B thấy Target IP = IP của mình → gửi ARP Reply.

**Bước 4 — ARP Reply (unicast)**:
\`\`\`
Ethernet frame:
  Src MAC : BB:66:77:88:99:AA
  Dst MAC : AA:11:22:33:44:55  ← unicast trực tiếp về A
  Ethertype: 0x0806

ARP payload:
  Sender MAC = BB:66:77:88:99:AA
  Sender IP  = 192.168.1.5
  Target MAC = AA:11:22:33:44:55
  Target IP  = 192.168.1.10
\`\`\`

**Bước 5 — A cập nhật ARP cache**:
\`\`\`
192.168.1.5 → BB:66:77:88:99:AA  (TTL thường 20 phút trên Linux, 10 phút trên Windows)
\`\`\`

Từ giờ A có thể gửi gói IP cho B trực tiếp qua MAC.

### 1.4. Gửi tới IP ngoài LAN — ARP gặp gateway

❓ **Câu hỏi tự nhiên**: Nếu máy A muốn gửi gói tới \`8.8.8.8\` (ngoài LAN) thì sao? ARP có broadcast tìm \`8.8.8.8\` không?

**Không.** A nhận ra \`8.8.8.8\` nằm ngoài subnet \`/24\` của mình (8.8.0.0 ≠ 192.168.1.0/24). Theo bảng định tuyến, A phải gửi qua **default gateway** (ví dụ \`192.168.1.1\`). A sẽ ARP tìm MAC của \`192.168.1.1\`, không phải của \`8.8.8.8\`.

Sau đó:
- Ethernet frame: Src MAC = A, **Dst MAC = MAC của router** (gateway).
- IP packet bên trong: Src IP = 192.168.1.10, Dst IP = 8.8.8.8 (không đổi).

Router nhận frame, lột Ethernet, đọc IP đích, định tuyến tiếp.

❓ **ARP cache hết hạn thì sao?** Máy phải gửi ARP Request lại. Trong thời gian chờ Reply, gói có thể bị drop hoặc xếp hàng chờ (tùy hệ điều hành).

⚠ **Lỗi thường gặp**: Nhầm ARP hoạt động xuyên router. **Sai** — ARP bị giới hạn trong cùng một broadcast domain (LAN). Router không forward ARP broadcast sang LAN khác. Mỗi LAN có ARP riêng của nó.

🔁 **Tự kiểm tra**:
Máy A (\`192.168.1.10/24\`) muốn gửi tới \`10.0.0.5\`. A broadcast ARP tìm MAC của \`10.0.0.5\` không?
<details>
<summary>Đáp án</summary>
Không. \`10.0.0.5\` nằm ngoài subnet \`192.168.1.0/24\`. A gửi ARP tìm MAC của **default gateway** (ví dụ \`192.168.1.1\`), rồi gửi gói IP cho router. Router lo việc định tuyến tới \`10.0.0.5\`.
</details>

### 📝 Tóm tắt mục 1

- ARP ánh xạ IP → MAC trong phạm vi một LAN (cùng broadcast domain).
- ARP Request: **broadcast** (\`FF:FF:FF:FF:FF:FF\`) hỏi "ai là IP X?".
- ARP Reply: **unicast** gửi ngược về máy hỏi với MAC tương ứng.
- ARP cache lưu kết quả (10–20 phút) tránh broadcast lặp.
- Tới IP ngoài LAN: ARP tìm MAC của **gateway**, không tìm IP đích.

---

## 2. ICMP — Giao thức báo lỗi và chẩn đoán mạng

### 2.1. ICMP là gì và vì sao cần

💡 **Trực giác**: IP là dịch vụ "best-effort" — gửi gói đi, không đảm bảo đến nơi, cũng không báo lại khi thất bại. ICMP chính là cơ chế gửi **thư thông báo** về: "Gói của bạn không đến được", "Máy kia không tồn tại", hay "Tôi nhận được gói của bạn đây".

**ICMP** (Internet Control Message Protocol) hoạt động **trên nền IP** (IP protocol number = 1), chuyên gửi thông điệp điều khiển và lỗi. Bản thân ICMP không vận chuyển dữ liệu ứng dụng — nó phục vụ cho cơ sở hạ tầng mạng.

ICMP header gồm 4 byte cơ bản: Type (1 byte) + Code (1 byte) + Checksum (2 byte), sau đó là phần dữ liệu tùy type.

### 2.2. Các type ICMP quan trọng

| Type | Code phổ biến | Tên | Ý nghĩa |
|------|---------------|-----|---------|
| 0 | 0 | Echo Reply | Phản hồi ping |
| 3 | 0 | Dest Unreachable: Net Unreachable | Mạng đích không tới được |
| 3 | 1 | Dest Unreachable: Host Unreachable | Máy đích không tới được |
| 3 | 3 | Dest Unreachable: Port Unreachable | Cổng đích không có dịch vụ |
| 8 | 0 | Echo Request | Ping đi |
| 11 | 0 | Time Exceeded: TTL expired in transit | TTL về 0 trên đường đi (traceroute dùng) |
| 11 | 1 | Time Exceeded: Fragment reassembly exceeded | Timeout lắp ghép mảnh |

### 2.3. Ping — Echo Request / Echo Reply

\`ping\` gửi ICMP Type 8 (Echo Request) và đo thời gian nhận ICMP Type 0 (Echo Reply).

**Walk-through ping tới \`1.1.1.1\`**:

\`\`\`
Máy A gửi:
  IP: Src=192.168.1.10, Dst=1.1.1.1, Protocol=1 (ICMP), TTL=64
  ICMP: Type=8, Code=0, ID=1234, Seq=1, Data="abcdefgh..." (56 byte)

Cloudflare 1.1.1.1 phản hồi:
  IP: Src=1.1.1.1, Dst=192.168.1.10, Protocol=1, TTL=57
  ICMP: Type=0, Code=0, ID=1234, Seq=1, Data="abcdefgh..."

Kết quả ping hiển thị:
  64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=12.4 ms
\`\`\`

RTT (round-trip time) = 12.4 ms là tổng thời gian đi và về. TTL = 57 vì \`64 - 7 hop = 57\` (mỗi router giảm 1).

**Ý nghĩa của các số**:
- **RTT < 1 ms**: cùng LAN hoặc loopback.
- **RTT 1–10 ms**: trong cùng thành phố / datacenter gần.
- **RTT 10–80 ms**: cross-country trong cùng lục địa.
- **RTT > 150 ms**: cross-continent (Việt Nam → Mỹ thường 200–250 ms).

### 2.4. TTL và cơ chế Time Exceeded — nền tảng traceroute

**TTL** (Time To Live) là trường 1 byte trong IP header. Mỗi router giảm TTL đi 1 trước khi forward. Khi TTL = 0, router **hủy gói** và gửi lại ICMP Type 11 (Time Exceeded) về nguồn.

**Vì sao cần TTL?** Ngăn gói đi lòng vòng mãi mãi trong trường hợp định tuyến lặp (routing loop). Không có TTL, gói sẽ đi vòng vô tận chiếm băng thông.

**Cách traceroute lợi dụng Time Exceeded**:

\`\`\`
Lần 1: Gửi gói TTL=1 → Router 1 nhận, giảm xuống 0 → gửi ICMP Time Exceeded về
        → Lộ IP và RTT của Router 1

Lần 2: Gửi gói TTL=2 → Router 1 forward (TTL→1), Router 2 giảm xuống 0 → gửi ICMP Time Exceeded
        → Lộ IP và RTT của Router 2

Lần 3: Gửi gói TTL=3 → Router 1, 2 forward, Router 3 giảm → ICMP Time Exceeded
        → Lộ IP và RTT của Router 3
...
Lần N: Gói tới đích, đích gửi ICMP Echo Reply (hoặc Port Unreachable nếu dùng UDP)
        → Đường đi hoàn chỉnh
\`\`\`

Ví dụ đầu ra \`traceroute 8.8.8.8\`:
\`\`\`
 1  192.168.1.1      1.2 ms   ← gateway nhà
 2  203.162.4.1      8.4 ms   ← router ISP
 3  203.162.96.5    10.1 ms   ← backbone ISP
 4  72.14.194.130   20.5 ms   ← Google peering
 5  8.8.8.8         22.3 ms   ← đích
\`\`\`

❓ **Câu hỏi tự nhiên**: Vì sao đôi khi traceroute hiển thị \`* * *\` cho một hop?

Một số router cấu hình không gửi ICMP Time Exceeded ra ngoài (vì lý do bảo mật hoặc độ ưu tiên xử lý ICMP thấp). Router đó vẫn forward gói bình thường, nhưng không phản hồi traceroute → hiển thị \`* * *\`. Hop tiếp theo vẫn có thể hiện bình thường.

❓ **ICMP có bị chặn không?** Có. Nhiều firewall block ICMP vì lo ngại bảo mật (dùng ICMP để dò mạng). Hậu quả: \`ping\` không trả lời dù host đang chạy. Đây là một lý do phổ biến gây nhầm lẫn "host down" khi thực ra host up nhưng block ping.

⚠ **Lỗi thường gặp**: ICMP không phải TCP/UDP — không có port, không có kết nối, không có trạng thái. Nói "ICMP port 7" là sai hoàn toàn.

🔁 **Tự kiểm tra**:
Traceroute gửi gói TTL=3. Cái gì xảy ra ở router hop thứ 3?
<details>
<summary>Đáp án</summary>
Router hop 1 nhận TTL=3 → forward với TTL=2. Router hop 2 nhận TTL=2 → forward với TTL=1. Router hop 3 nhận TTL=1 → giảm xuống 0 → **hủy gói** và gửi ICMP Type 11 (Time Exceeded) về nguồn, lộ IP của router hop 3 và RTT tới đó.
</details>

### 📝 Tóm tắt mục 2

- ICMP mang thông điệp điều khiển/lỗi, chạy trên IP (protocol number 1).
- Type 8/0: Echo Request/Reply → cơ chế \`ping\`.
- Type 11: Time Exceeded (TTL = 0) → cơ chế \`traceroute\`.
- Type 3: Destination Unreachable → thông báo không tới được host/port.
- TTL ngăn gói lặp vô hạn; traceroute lợi dụng TTL tăng dần để lộ từng hop.

---

## 3. DHCP — Cấp IP tự động cho thiết bị mới

### 3.1. Vấn đề và giải pháp

💡 **Trực giác**: Khi bạn vào một khách sạn, lễ tân cấp cho bạn số phòng và thẻ từ — bạn không cần tự đặt phòng thủ công. DHCP làm đúng điều đó cho thiết bị mạng: cấp địa chỉ IP, subnet mask, gateway, và DNS server tự động khi thiết bị kết nối vào mạng.

**Không có DHCP**: Mỗi thiết bị phải được cấu hình IP tĩnh thủ công. Trong gia đình 20 thiết bị (laptop, điện thoại, TV, máy in...) — thủ công là ác mộng. Còn trong doanh nghiệp hàng nghìn thiết bị thì bất khả thi.

**DHCP** (Dynamic Host Configuration Protocol) hoạt động theo mô hình client-server trên UDP:
- Client gửi từ port 68, gửi tới port 67.
- Server lắng nghe port 67.

### 3.2. Quy trình DORA — 4 bước cấp IP

**D** — Discover · **O** — Offer · **R** — Request · **A** — Acknowledge

**Bước D — DHCP Discover** (Client broadcast):
\`\`\`
Client (chưa có IP):
  UDP Src=0.0.0.0:68, Dst=255.255.255.255:67
  Ethernet Src=AA:BB:CC:DD:EE:FF, Dst=FF:FF:FF:FF:FF:FF (broadcast)
  Nội dung: "Tôi mới vào mạng, ai là DHCP server? Cho tôi xin IP!"
  Kèm theo: Client ID (MAC), danh sách tham số cần (IP, mask, gateway, DNS)
\`\`\`

**Bước O — DHCP Offer** (Server unicast hoặc broadcast):
\`\`\`
DHCP Server (192.168.1.1):
  UDP Src=192.168.1.1:67, Dst=255.255.255.255:68 (hoặc unicast tới MAC client)
  Nội dung: "Tôi là server, tôi đề nghị cho bạn:
    IP đề nghị : 192.168.1.100
    Subnet mask: 255.255.255.0
    Gateway    : 192.168.1.1
    DNS server : 8.8.8.8, 8.8.4.4
    Lease time : 86400 giây (24 giờ)"
  Kèm Transaction ID khớp với Discover để client biết đây là offer cho mình.
\`\`\`

**Bước R — DHCP Request** (Client broadcast):
\`\`\`
Client:
  UDP Src=0.0.0.0:68, Dst=255.255.255.255:67 (vẫn broadcast)
  Nội dung: "Tôi chấp nhận offer từ server 192.168.1.1, IP 192.168.1.100"
  Vì sao vẫn broadcast? Có thể có nhiều DHCP server đã gửi Offer.
  Broadcast Request thông báo cho tất cả: "Tôi chọn server này, server khác thu hồi offer đi."
\`\`\`

**Bước A — DHCP Acknowledge** (Server):
\`\`\`
Server 192.168.1.1:
  Nội dung: "Xác nhận! IP 192.168.1.100 là của bạn trong 86400 giây.
  Thông tin đầy đủ:
    IP        : 192.168.1.100
    Mask      : 255.255.255.0  (/24)
    Gateway   : 192.168.1.1
    DNS       : 8.8.8.8
    Lease end : [thời điểm hiện tại + 24h]"
\`\`\`

Sau bước A, client cài IP vào card mạng và bắt đầu giao tiếp bình thường.

### 3.3. Lease time — thời hạn thuê IP

**Lease time** (thời hạn thuê) là khoảng thời gian IP được cấp còn hiệu lực. Khi hết hạn, client phải gia hạn (renew) hoặc IP bị thu hồi.

- **Thông thường tại 50% thời hạn**: Client gửi DHCP Request gia hạn trực tiếp (unicast) đến server. Nếu server đồng ý → gửi Ack mới với thời hạn mới.
- **Tại 87.5% thời hạn**: Nếu server ban đầu không phản hồi, client broadcast Request tới bất kỳ DHCP server nào.
- **Hết 100% mà không gia hạn được**: Client phải bỏ IP đó, chạy lại quy trình DORA.

**Ví dụ lease time thực tế**:
- Nhà (router gia đình): 24 giờ — thiết bị ít thay đổi.
- Đại học / sân bay: 1–4 giờ — nhiều người đến và đi.
- Khách sạn / quán cafe: 30 phút – 2 giờ — thiết bị thay đổi nhanh.

❓ **Câu hỏi tự nhiên**: Nếu tắt máy rồi bật lại, có bị đổi IP không?

Thường là không. Khi client khởi động lại, nó gửi DHCP Request trực tiếp xin lại IP cũ (nếu còn trong thời hạn lease). Server xác nhận → cùng IP. Chỉ bị đổi khi IP cũ đã hết hạn hoặc bị cấp cho thiết bị khác.

⚠ **Lỗi thường gặp**: Nhầm DHCP Discover dùng unicast. **Sai** — Discover luôn broadcast vì client chưa có IP và chưa biết DHCP server nào đang hoạt động. Unicast chỉ xảy ra ở bước Renew (gia hạn giữa chừng).

🔁 **Tự kiểm tra**:
Điều gì xảy ra nếu có 2 DHCP server trong cùng LAN?
<details>
<summary>Đáp án</summary>
Cả hai đều nhận Discover và gửi Offer. Client nhận được cả hai Offer, chọn Offer đến trước (thường vậy) hoặc theo logic ưu tiên nào đó, rồi broadcast DHCP Request nêu rõ đã chọn server nào. Server không được chọn rút lại Offer. Đây gọi là "rogue DHCP server" nếu server thứ hai không phải của quản trị mạng — nguy hiểm vì có thể cấp gateway giả (tấn công man-in-the-middle).
</details>

### 📝 Tóm tắt mục 3

- DHCP cấp IP tự động qua 4 bước **DORA** (Discover → Offer → Request → Ack).
- Client dùng broadcast (chưa có IP), server phản hồi qua UDP port 67/68.
- Lease time quy định thời hạn; client gia hạn tại 50% thời hạn.
- DHCP còn cấp subnet mask, gateway, DNS — đủ thông tin để kết nối mạng.

---

## 4. NAT — Nhiều thiết bị, một IP công khai

### 4.1. Vấn đề thiếu IPv4

💡 **Trực giác**: NAT giống như một **lễ tân tổng đài** của công ty. Khách hàng ngoài chỉ biết số tổng đài (\`203.113.5.100\`), không biết số điện thoại bàn nội bộ của từng nhân viên. Khi nhân viên gọi ra ngoài, lễ tân ghi lại "nội bộ 101 đang gọi ra ngoài" và thay số hiển thị thành số tổng đài. Khi khách gọi vào, lễ tân biết đó là cuộc trả lời cho nội bộ 101 → chuyển vào đúng máy.

**Vấn đề**: IPv4 chỉ có ~4.3 tỷ địa chỉ. Đầu những năm 2000, các tổ chức phân bổ địa chỉ khu vực đã dự báo cạn kiệt (và đã cạn ở APNIC, ARIN, RIPE vào 2011–2019). Trong khi đó, số thiết bị kết nối Internet bùng nổ.

**Giải pháp tạm thời**: RFC 1918 định nghĩa ba dải **private IP** không được định tuyến trên Internet:
- \`10.0.0.0/8\` — 16.7 triệu địa chỉ
- \`172.16.0.0/12\` — 1.05 triệu địa chỉ
- \`192.168.0.0/16\` — 65.5 nghìn địa chỉ

Hàng triệu mạng nội bộ dùng chung các dải này mà không xung đột — vì chúng không xuất hiện trên Internet. NAT làm cầu nối chuyển đổi khi gói cần ra ngoài.

### 4.2. PAT/NAPT — NAT với port (dạng phổ biến nhất)

**PAT** (Port Address Translation), còn gọi là **NAPT** (Network Address and Port Translation) hay "NAT overload", cho phép **nhiều thiết bị nội bộ chia sẻ một IP công khai** bằng cách phân biệt các kết nối qua port.

**Cấu trúc bảng NAT** (gọi là NAT translation table):

| Nội bộ (Inside Local) | Nội bộ với IP công khai (Inside Global) | Trạng thái |
|-----------------------|-----------------------------------------|-----------|
| 192.168.1.10:54321 | 203.113.5.100:1025 | ESTABLISHED |
| 192.168.1.11:60000 | 203.113.5.100:1026 | ESTABLISHED |
| 192.168.1.10:54322 | 203.113.5.100:1027 | TIME_WAIT |

### 4.3. Walk-through bảng NAT — gói đi và về

**Kịch bản**: Router nhà có IP công khai \`203.113.5.100\`. Máy tính \`192.168.1.10\` mở kết nối HTTP tới \`93.184.216.34:80\` (example.com).

**Gói đi ra (outbound)**:
\`\`\`
Trước NAT (trong LAN):
  Src IP   : 192.168.1.10
  Src Port : 54321          ← port ngẫu nhiên do OS chọn
  Dst IP   : 93.184.216.34
  Dst Port : 80

Router NAT xử lý:
  Tra bảng: 192.168.1.10:54321 chưa có entry → tạo mới
  Ghi vào bảng: 192.168.1.10:54321 ↔ 203.113.5.100:1025
  Sửa header gói:
    Src IP   : 203.113.5.100  (thay IP nội bộ bằng IP công khai)
    Src Port : 1025           (thay port nguồn bằng port NAT)
    Dst IP   : 93.184.216.34  (không đổi)
    Dst Port : 80             (không đổi)
  Cập nhật IP checksum và TCP checksum
  Gửi gói ra Internet
\`\`\`

**Gói về (inbound)**:
\`\`\`
Từ Internet về:
  Src IP   : 93.184.216.34
  Src Port : 80
  Dst IP   : 203.113.5.100
  Dst Port : 1025

Router NAT xử lý:
  Tra bảng: Dst=203.113.5.100:1025 → 192.168.1.10:54321
  Sửa header:
    Dst IP   : 192.168.1.10   (khôi phục IP nội bộ)
    Dst Port : 54321          (khôi phục port gốc)
    Src IP/Port giữ nguyên
  Forward vào LAN
  → Gói tới đúng máy 192.168.1.10, đúng socket 54321
\`\`\`

**Thêm máy thứ hai** (\`192.168.1.11\`) cùng lúc kết nối HTTP:
\`\`\`
Bảng NAT sau khi cả hai kết nối:
  192.168.1.10:54321 ↔ 203.113.5.100:1025  (ESTAB)
  192.168.1.11:60000 ↔ 203.113.5.100:1026  (ESTAB)
\`\`\`

Cả hai dùng cùng IP công khai \`203.113.5.100\` nhưng khác port — router phân biệt được và giao đúng gói về đúng máy.

❓ **Câu hỏi tự nhiên**: Máy bên ngoài Internet có thể chủ động kết nối vào máy \`192.168.1.10\` không?

**Không thể trực tiếp.** Bảng NAT chỉ tạo entry khi có kết nối **đi ra từ trong LAN**. Kết nối từ ngoài vào không có entry sẵn → router không biết forward tới đâu → bỏ gói. Muốn cho phép, phải cấu hình **port forwarding** thủ công: "Gói vào cổng 8080 → forward tới 192.168.1.10:8080".

❓ **Câu hỏi tự nhiên**: Bảng NAT có giới hạn không?

Có. Mỗi entry chiếm bộ nhớ. Entry hết hạn (TCP FIN/RST, hoặc idle timeout ~30 giây UDP / vài phút TCP) sẽ bị xóa. Router gia đình thường xử lý tốt vài nghìn entry đồng thời. Vấn đề xảy ra khi có rất nhiều kết nối UDP ngắn hoặc ứng dụng mở hàng chục nghìn kết nối (BitTorrent chẳng hạn).

⚠ **Lỗi thường gặp**: Nghĩ NAT là tường lửa (firewall). NAT **không phải** firewall về mặt kỹ thuật, nhưng *tình cờ* cung cấp một mức bảo vệ vì máy bên trong không thể tiếp cận từ ngoài mà không có port forwarding. Tường lửa thật kiểm tra trạng thái và quy tắc rõ ràng.

🔁 **Tự kiểm tra**:
Bảng NAT có entry: \`192.168.1.50:43210 ↔ 203.113.5.100:2000\`. Gói về từ Internet có \`Dst=203.113.5.100:2001\` thì xảy ra gì?
<details>
<summary>Đáp án</summary>
Port 2001 không có entry trong bảng NAT → router không biết forward tới đâu → **bỏ (drop) gói**. Máy 192.168.1.50 không nhận được gói đó.
</details>

### 📝 Tóm tắt mục 4

- IPv4 thiếu địa chỉ → private IP (RFC 1918) + NAT làm cầu nối.
- PAT/NAPT: nhiều thiết bị dùng chung 1 IP công khai nhờ phân biệt bằng port.
- Gói đi ra: router thay Src IP:Port nội bộ → IP:Port công khai, ghi vào bảng.
- Gói về: router tra bảng, khôi phục Dst IP:Port nội bộ, forward vào LAN.
- Kết nối từ ngoài vào cần port forwarding thủ công.

---

## 5. Bức tranh tổng thể — Máy mới vào mạng

Gộp tất cả 4 giao thức lại: điều gì xảy ra khi bạn cắm laptop vào mạng LAN lần đầu?

**Tình huống**: Laptop mới (\`MAC: CC:DD:EE:FF:00:11\`), chưa có IP, kết nối vào LAN \`192.168.1.0/24\`. Router/gateway là \`192.168.1.1\`, có DHCP server và NAT ra Internet.

---

**Giai đoạn 1 — Lấy IP qua DHCP (DORA)**:

1. **Discover**: Laptop broadcast (\`FF:FF:FF:FF:FF:FF\`) → "Ai là DHCP server?"
2. **Offer**: Router phản hồi → "IP đề nghị: \`192.168.1.105\`, Gateway: \`192.168.1.1\`, DNS: \`8.8.8.8\`, Lease: 24h"
3. **Request**: Laptop broadcast → "Tôi chấp nhận offer này"
4. **Ack**: Router xác nhận → Laptop cài IP \`192.168.1.105/24\`

---

**Giai đoạn 2 — Tìm MAC của gateway qua ARP**:

Laptop muốn gửi gói ra Internet, biết gateway là \`192.168.1.1\` nhưng chưa có MAC.

5. **ARP Request**: Laptop broadcast → "Ai là \`192.168.1.1\`? Cho tôi MAC!"
6. **ARP Reply**: Router unicast → "Tôi đây, MAC \`00:11:22:33:44:55\`"
7. Laptop lưu vào ARP cache: \`192.168.1.1 → 00:11:22:33:44:55\`

---

**Giai đoạn 3 — Gửi gói ra Internet qua NAT**:

Laptop mở trình duyệt, truy cập \`example.com\` (\`93.184.216.34\`).

8. Laptop gửi gói:
   - Ethernet: Src=\`CC:DD:EE:FF:00:11\`, Dst=\`00:11:22:33:44:55\` (MAC của router)
   - IP: Src=\`192.168.1.105\`, Dst=\`93.184.216.34\`, TTL=64
9. Router nhận, NAT thay Src: \`192.168.1.105:55000\` → \`203.113.5.100:1050\`
10. Gói đi ra Internet với IP công khai của router.
11. Phản hồi về: Dst=\`203.113.5.100:1050\` → Router tra bảng NAT → forward tới \`192.168.1.105:55000\`

---

**ICMP có thể xuất hiện bất cứ lúc nào**:

- Nếu Giai đoạn 1 thất bại (không có DHCP server) → Laptop không có IP → không làm được gì.
- Nếu bước 8 gặp lỗi định tuyến → router gửi ICMP Destination Unreachable về laptop.
- Nếu TTL hết trước khi tới đích → một router nào đó gửi ICMP Time Exceeded.
- Laptop có thể \`ping 192.168.1.1\` sau bước 6 để xác nhận gateway hoạt động.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Máy A (\`192.168.0.20\`) muốn gửi gói tới máy B (\`192.168.0.50\`). ARP cache của A hiện trống. Mô tả đầy đủ các bước từ khi A gửi ARP đến khi frame Ethernet đầu tiên chứa gói IP được gửi.

**Bài 2**: Một router trên đường đi nhận gói với TTL = 1. Router đó xử lý như thế nào? Gói đó có tới đích không? Bản tin nào được gửi lại?

**Bài 3**: Một thiết bị mới vào mạng chạy DHCP. Sắp xếp đúng thứ tự và giải thích mục đích của mỗi bước:  
(a) Server ghi lại binding IP — MAC và gửi xác nhận.  
(b) Client broadcast thông báo đã chọn server nào.  
(c) Client broadcast tìm DHCP server.  
(d) Server đề nghị địa chỉ IP và thông số mạng.

**Bài 4**: Bảng NAT hiện có các entry:

| Nội bộ | Công khai | Giao thức |
|--------|-----------|-----------|
| 10.0.0.5:45000 | 1.2.3.4:10000 | TCP |
| 10.0.0.6:45001 | 1.2.3.4:10001 | TCP |
| 10.0.0.5:45002 | 1.2.3.4:10002 | UDP |

Một gói TCP từ Internet đến với \`Dst = 1.2.3.4:10001\`. Router forward tới đâu? Nếu gói đến với \`Dst = 1.2.3.4:9999\` thì sao?

**Bài 5**: Giải thích vì sao \`ping 8.8.8.8\` từ trong mạng nội bộ (\`192.168.1.x\`) hoạt động được dù \`192.168.x.x\` là private IP không được định tuyến trên Internet.

**Bài 6**: Dùng \`traceroute\`, hop thứ 5 hiển thị \`* * *\`. Hop thứ 6 lại hiển thị IP bình thường. Giải thích hiện tượng này.

### Lời giải chi tiết

**Bài 1 — Các bước ARP đến gửi frame**:

Bước 1: A kiểm tra ARP cache → không có entry cho \`192.168.0.50\` → cần ARP.

Bước 2: A kiểm tra bảng định tuyến:  
\`192.168.0.50\` cùng subnet \`192.168.0.0/24\` với A (\`192.168.0.20\`) → giao tiếp trực tiếp, không qua gateway.

Bước 3: A gửi ARP Request (broadcast):
\`\`\`
Ethernet: Src=MAC_A, Dst=FF:FF:FF:FF:FF:FF
ARP: Sender=MAC_A/192.168.0.20, Target=00:00:00:00:00:00/192.168.0.50
\`\`\`

Bước 4: Tất cả máy trong LAN nhận. B thấy Target IP = \`192.168.0.50\` = IP của mình → gửi ARP Reply unicast về A:
\`\`\`
Ethernet: Src=MAC_B, Dst=MAC_A
ARP: Sender=MAC_B/192.168.0.50, Target=MAC_A/192.168.0.20
\`\`\`

Bước 5: A nhận Reply, cập nhật ARP cache: \`192.168.0.50 → MAC_B\`.

Bước 6: A đóng gói và gửi frame đầu tiên:
\`\`\`
Ethernet: Src=MAC_A, Dst=MAC_B
IP: Src=192.168.0.20, Dst=192.168.0.50
\`\`\`

---

**Bài 2 — TTL = 1 tại router**:

Router nhận gói, giảm TTL: \`1 - 1 = 0\`.

TTL = 0 → router **không được forward gói** (quy tắc IPv4 bắt buộc).

Router **hủy (drop) gói** và gửi ICMP Type 11 (Time Exceeded, Code 0: TTL expired in transit) về địa chỉ nguồn của gói bị hủy.

Gói **không tới đích**. Đây là cơ chế traceroute khai thác: gửi gói TTL=1 → biết được IP và RTT của hop thứ nhất.

---

**Bài 3 — Thứ tự DORA**:

Thứ tự đúng: **(c) → (d) → (b) → (a)**

- **(c) Discover**: Client broadcast tìm server — vì client chưa có IP, chưa biết server ở đâu.
- **(d) Offer**: Server đề nghị IP và thông số — server phản hồi sau khi nhận Discover.
- **(b) Request**: Client broadcast chọn server — broadcast để thông báo cho tất cả server (có thể có nhiều server đã gửi Offer).
- **(a) Acknowledge**: Server ghi binding và xác nhận — hoàn thành giao thức, client có thể dùng IP.

---

**Bài 4 — Tra bảng NAT**:

Gói \`Dst = 1.2.3.4:10001, TCP\` → tra bảng:  
Entry \`10.0.0.6:45001 ↔ 1.2.3.4:10001 TCP\` → Router sửa Dst thành \`10.0.0.6:45001\`, forward tới máy \`10.0.0.6\` trong LAN.

Gói \`Dst = 1.2.3.4:9999, TCP\` → tra bảng:  
Không có entry cho port 9999 → Router **không biết forward tới đâu** → **drop gói**. Máy bên trong không nhận được gói này.

---

**Bài 5 — Ping 8.8.8.8 từ mạng nội bộ**:

1. Laptop gửi ICMP Echo Request: Src=\`192.168.1.x\`, Dst=\`8.8.8.8\`.
2. Gói tới router (default gateway). Router thấy đích \`8.8.8.8\` không thuộc LAN → cần ra Internet.
3. **NAT**: Router thay Src thành IP công khai, ví dụ \`203.113.5.100:xxxx\`, ghi vào bảng.

   *Lưu ý*: ICMP không có port, nhưng router dùng ICMP ID (trường trong Echo Request) thay thế cho port trong bảng NAT. Hoặc router gán một port ảo nội bộ.

4. Gói ra Internet với Src=\`203.113.5.100\` — đây là IP hợp lệ, công khai.
5. Google \`8.8.8.8\` nhận, gửi ICMP Echo Reply về \`203.113.5.100\`.
6. Router tra bảng NAT, tìm được entry → forward Reply về laptop \`192.168.1.x\`.

Kết luận: \`192.168.x.x\` không bao giờ xuất hiện trên Internet. NAT che giấu hoàn toàn.

---

**Bài 6 — Hop \`* * *\` giữa traceroute**:

Router hop 5 nhận gói, giảm TTL về 0, hủy gói — nhưng **không gửi ICMP Time Exceeded**. Có thể vì:
- Cấu hình firewall/ACL chặn gửi ICMP ra ngoài.
- ICMP có độ ưu tiên xử lý thấp, router rate-limit, gói ICMP bị drop.
- Interface dùng để gửi ICMP Time Exceeded bị chặn.

Router hop 5 **vẫn forward gói** (nếu TTL > 0 thì forward, TTL = 0 thì mới hủy và gửi ICMP). Gói với TTL=6 vượt qua hop 5 bình thường (TTL → 5) rồi đến hop 6. Hop 6 giảm TTL về 0 → gửi ICMP → hiển thị bình thường.

→ \`* * *\` không có nghĩa là đường mạng đứt tại hop 5, chỉ là router đó không phản hồi ICMP.

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề đã học**:
  - [Lesson 02 — Ethernet & Link Layer](../lesson-02-link-ethernet/) — địa chỉ MAC, Ethernet frame mà ARP dùng.
  - [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — private IP, subnet mask mà DHCP và NAT dùng.
  - [Lesson 04 — Định tuyến](../lesson-04-routing/) — default gateway, routing table mà NAT và ARP cần.
- **Công cụ chẩn đoán** dùng các giao thức này: [\`ping\`, \`traceroute\`, \`arp\`, \`ip neighbor\`] — sẽ xem kỹ tại [Lesson 07 — Công cụ chẩn đoán](../../03-Advanced-Operations/lesson-07-diagnostic-tools/).
- **Bài tiếp theo**: [Lesson 06 — IPv6](../lesson-06-ipv6/) — giải pháp dài hạn cho vấn đề thiếu địa chỉ mà NAT đang giải quyết tạm thời, cũng như các thay đổi với ARP (thay bằng NDP) và DHCP (DHCPv6 / SLAAC).

---

## 📝 Tổng kết Lesson 05

1. **ARP** ánh xạ IP → MAC trong LAN bằng broadcast Request / unicast Reply; kết quả lưu vào ARP cache. Tới IP ngoài LAN → ARP tìm MAC của gateway.
2. **ICMP** mang thông điệp điều khiển/lỗi: Echo (ping), Time Exceeded (traceroute khai thác TTL giảm dần), Destination Unreachable. Không có port, không phải TCP/UDP.
3. **DHCP DORA**: Discover (broadcast) → Offer → Request (broadcast) → Ack. Cấp đủ IP, mask, gateway, DNS. Lease time quy định thời hạn.
4. **NAT/PAT**: private IP ra Internet nhờ bảng dịch \`IP:port nội bộ ↔ IP:port công khai\`. Gói đi thay Src, gói về tra bảng khôi phục Dst. Từ ngoài vào cần port forwarding.
5. **Bức tranh tổng**: Thiết bị mới → DHCP lấy IP → ARP tìm gateway → NAT dịch gói ra Internet → ICMP báo lỗi khi cần.

**Bài tiếp theo**: [Lesson 06 — IPv6](../lesson-06-ipv6/)
`;
