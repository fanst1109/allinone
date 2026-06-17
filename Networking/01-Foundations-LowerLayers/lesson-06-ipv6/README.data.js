// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/01-Foundations-LowerLayers/lesson-06-ipv6/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — IPv6

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được vì sao IPv4 cạn kiệt địa chỉ và tại sao NAT chỉ là giải pháp tạm thời.
- Đọc, viết và rút gọn địa chỉ IPv6 đúng chuẩn (RFC 5952).
- Phân biệt các loại địa chỉ IPv6: global unicast, link-local, loopback, multicast.
- So sánh header IPv4 vs IPv6 và hiểu ưu điểm của IPv6.
- Mô tả được ba cơ chế chuyển tiếp IPv4 → IPv6: dual-stack, tunneling, translation.

## Kiến thức tiền đề

- [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — cấu trúc địa chỉ IPv4, CIDR, prefix.
- [Lesson 05 — ARP, ICMP, DHCP, NAT](../lesson-05-arp-icmp-dhcp-nat/) — cơ chế NAT, ARP; hiểu lý do NAT ra đời.

---

## 1. Vì sao cần IPv6?

### 1.1. Giới hạn của IPv4

💡 **Trực giác**: Hãy tưởng tượng mỗi thiết bị kết nối Internet cần một số điện thoại duy nhất. IPv4 chỉ có khoảng **4,3 tỉ** số điện thoại cho toàn thế giới — nhưng dân số thế giới đã vượt 8 tỉ, chưa kể mỗi người có nhiều thiết bị (điện thoại, laptop, smartwatch, TV, máy lạnh thông minh...).

Địa chỉ IPv4 là số 32-bit:
- $2^{32} = 4.294.967.296 \\approx$ **4,3 tỉ** địa chỉ.
- Trừ đi các dải dành riêng (private, multicast, loopback, broadcast...): thực tế còn khoảng **3,7 tỉ** địa chỉ có thể dùng công khai.
- IANA (tổ chức phân bổ địa chỉ toàn cầu) đã **cạn pool IPv4 vào tháng 2/2011**. Các tổ chức khu vực (RIPE NCC — châu Âu, APNIC — châu Á) lần lượt cạn kiệt trong giai đoạn 2012–2019.

### 1.2. NAT — giải pháp tạm có nhiều nhược điểm

NAT (Network Address Translation — chuyển đổi địa chỉ mạng) cho phép nhiều thiết bị trong mạng nội bộ dùng chung **một** địa chỉ IPv4 công khai. Đây là lý do hầu hết gia đình chỉ có 1 IP công khai nhưng có 10–20 thiết bị kết nối Internet.

❓ **Câu hỏi tự nhiên**:
- *NAT hoạt động tốt mà, sao phải thay bằng IPv6?*
  NAT vi phạm nguyên tắc "end-to-end" của Internet: mỗi thiết bị phải có thể giao tiếp trực tiếp với bất kỳ thiết bị nào khác. NAT phá vỡ điều này — thiết bị bên trong mạng nội bộ không thể nhận kết nối từ bên ngoài mà không có cấu hình port forwarding đặc biệt.
- *NAT gây ra vấn đề gì thực tế?*
  VoIP (gọi điện thoại Internet), game online (cần peer-to-peer), VPN site-to-site, IoT (thiết bị phải nhận lệnh từ xa) — tất cả gặp khó khăn khi đi qua nhiều lớp NAT. Thuật ngữ kỹ thuật gọi là "NAT traversal hell".
- *IPv4 vẫn dùng được hôm nay, sao lại cấp bách?*
  Vẫn dùng được vì NAT và mua bán lại địa chỉ IPv4 cũ. Nhưng các dịch vụ mới (IoT, 5G) cần hàng tỉ địa chỉ — IPv4 không thể đáp ứng.

**Hạn chế cụ thể của NAT**:
1. Phá vỡ tính minh bạch end-to-end.
2. Làm chậm router (phải duy trì bảng dịch địa chỉ và theo dõi từng kết nối).
3. Gây lỗi với các giao thức nhúng địa chỉ IP vào payload (FTP active mode, SIP...).
4. Nhiều lớp NAT lồng nhau (carrier-grade NAT) làm tăng độ trễ (latency).

### 1.3. IPv6 — giải pháp dài hạn

IPv6 dùng địa chỉ **128-bit**:
- $2^{128} = 340.282.366.920.938.463.463.374.607.431.768.211.456$ địa chỉ.
- Tức là khoảng **$3,4 \\times 10^{38}$** địa chỉ.

💡 **Trực giác về quy mô**: $2^{128} \\approx$ 340 tỉ tỉ tỉ tỉ. Nếu Trái Đất có 7,5 tỉ người và mỗi người được cấp một "dải /64" (tức $2^{64} \\approx$ 18 tỉ tỉ địa chỉ), vẫn còn đủ cho **hàng trăm tỉ hành tinh** như Trái Đất. Nói cách khác, mỗi hạt cát trên Trái Đất có thể được cấp hàng triệu địa chỉ IPv6.

**So sánh nhanh**:

| Thuộc tính | IPv4 | IPv6 |
|-----------|------|------|
| Độ dài địa chỉ | 32-bit | 128-bit |
| Tổng số địa chỉ | ~4,3 tỉ ($2^{32}$) | ~$3,4 \\times 10^{38}$ ($2^{128}$) |
| Ký hiệu | Thập phân, dấu chấm (\`192.168.1.1\`) | Thập lục phân, dấu hai chấm (\`2001:db8::1\`) |
| Cạn kiệt? | Đã cạn (2011) | Không thực tế bao giờ cạn |

📝 **Tóm tắt mục 1**:
- IPv4 có $2^{32} \\approx$ 4,3 tỉ địa chỉ — đã cạn kiệt từ 2011.
- NAT là giải pháp tạm, có nhiều nhược điểm nghiêm trọng cho ứng dụng hiện đại.
- IPv6 có $2^{128} \\approx 3,4 \\times 10^{38}$ địa chỉ — đủ dùng vĩnh viễn.

---

## 2. Định dạng địa chỉ IPv6

### 2.1. Cấu trúc cơ bản

Địa chỉ IPv6 gồm **128 bit**, chia thành **8 nhóm 16-bit**, mỗi nhóm viết bằng **4 chữ số hex**, phân cách bằng dấu \`:\` (hai chấm):

\`\`\`
2001:0db8:0000:0000:0000:ff00:0042:8329
|____|____|____|____|____|____|____|____|
  G1   G2   G3   G4   G5   G6   G7   G8
  16b  16b  16b  16b  16b  16b  16b  16b = 128 bit
\`\`\`

Ví dụ đọc nhóm G2 (\`0db8\`):
- \`0\` $= 0 \\times 16^3 = 0$
- \`d\` $= 13 \\times 16^2 = 3328$
- \`b\` $= 11 \\times 16^1 = 176$
- \`8\` $= 8 \\times 16^0 = 8$
- Tổng $=$ **3512 (decimal)** — mỗi nhóm biểu diễn một số từ 0 đến 65535.

### 2.2. Quy tắc rút gọn (RFC 5952)

Quy tắc 1 — **Bỏ số 0 đứng đầu** trong mỗi nhóm:
- \`0db8\` → \`db8\`
- \`0000\` → \`0\` (giữ ít nhất 1 chữ số)
- \`00ff\` → \`ff\`

Quy tắc 2 — **Thay một chuỗi nhóm \`0000\` liên tiếp bằng \`::\`** (chỉ được dùng **một lần** trong toàn địa chỉ):
- \`0000:0000:0000\` → \`::\`
- Nếu có nhiều chuỗi 0 liên tiếp, áp dụng \`::\` cho chuỗi **dài nhất**; nếu bằng nhau, áp dụng cho chuỗi **đầu tiên**.

⚠ **Lỗi thường gặp**:
- Dùng \`::\` hai lần: \`2001::1::2\` — **SAI**, không thể xác định mỗi \`::\` ứng với bao nhiêu nhóm 0.
- Bỏ \`::\` khi chỉ có một nhóm 0: \`2001:db8:0:1::5\` — ở đây \`0\` là hợp lệ (một nhóm); dùng \`::\` chỉ khi có ít nhất **hai** nhóm \`0000\` liên tiếp (RFC 5952 khuyến nghị).

### 2.3. Ví dụ rút gọn và khôi phục

**Ví dụ 1 — Rút gọn**:
\`\`\`
Đầy đủ:  2001:0db8:0000:0000:0000:ff00:0042:8329
Bước 1 (bỏ 0 đầu nhóm):
         2001:db8:0:0:0:ff00:42:8329
Bước 2 (nén 3 nhóm 0 liên tiếp bằng ::):
         2001:db8::ff00:42:8329
\`\`\`

**Ví dụ 2 — Rút gọn**:
\`\`\`
Đầy đủ:  fe80:0000:0000:0000:0202:b3ff:fe1e:8329
Bước 1:  fe80:0:0:0:202:b3ff:fe1e:8329
Bước 2:  fe80::202:b3ff:fe1e:8329
\`\`\`

**Ví dụ 3 — Rút gọn loopback**:
\`\`\`
Đầy đủ:  0000:0000:0000:0000:0000:0000:0000:0001
Bước 1:  0:0:0:0:0:0:0:1
Bước 2:  ::1
\`\`\`

**Ví dụ 4 — Khôi phục từ rút gọn** (expansion):
\`\`\`
Rút gọn: 2001:db8::1
Bước 1 (đếm nhóm hiện có): 2001, db8, 1 → có 3 nhóm, cần 8 → :: = 5 nhóm 0000
Bước 2: 2001:0db8:0000:0000:0000:0000:0000:0001
\`\`\`

**Ví dụ 5 — Rút gọn khi có nhiều chuỗi 0**:
\`\`\`
Đầy đủ:  2001:0000:0000:0001:0000:0000:0000:0001
Chuỗi 0: nhóm 2-3 (2 nhóm) và nhóm 5-7 (3 nhóm)
→ áp dụng :: cho chuỗi dài nhất (nhóm 5-7):
         2001:0:0:1::1
Bước 1 (bỏ 0 đầu nhóm còn lại):
         2001:0:0:1::1
\`\`\`

🔁 **Dừng lại tự kiểm tra**:

Rút gọn địa chỉ: \`0000:0000:1234:0000:0000:5678:0000:0001\`

<details>
<summary>Xem đáp án</summary>

Bước 1 — bỏ 0 đầu từng nhóm: \`0:0:1234:0:0:5678:0:1\`

Bước 2 — tìm chuỗi 0 dài nhất: nhóm 1-2 (2 nhóm 0), nhóm 4-5 (2 nhóm 0), nhóm 7 (1 nhóm 0). Hai chuỗi đầu tiên bằng nhau (2 nhóm), áp dụng \`::\` cho chuỗi đầu tiên:

Kết quả: \`::1234:0:0:5678:0:1\`

Nhóm 4-5 còn lại (2 nhóm \`0\`) không dùng \`::\` nữa, viết nguyên là \`0:0\`.

</details>

📝 **Tóm tắt mục 2**:
- Địa chỉ IPv6 = 8 nhóm 16-bit hex, phân cách bằng \`:\`.
- Quy tắc 1: bỏ số 0 đứng đầu trong mỗi nhóm.
- Quy tắc 2: thay chuỗi nhóm 0000 liên tiếp dài nhất bằng \`::\` (chỉ một lần).
- Khi khôi phục: đếm nhóm hiện có → \`::\` ứng với (8 − số nhóm hiện có) nhóm 0000.

---

## 3. Các loại địa chỉ IPv6

### 3.1. Phân loại tổng quan

IPv6 không có broadcast (địa chỉ tới tất cả mọi người trong mạng — khái niệm này bị loại bỏ hoàn toàn). Thay vào đó có 3 loại chính:

| Loại | Phạm vi | Prefix điển hình | Ý nghĩa |
|------|---------|-----------------|---------|
| **Unicast** | Một thiết bị | Nhiều dạng (xem bên dưới) | Gửi tới một thiết bị duy nhất |
| **Multicast** | Một nhóm thiết bị | \`ff00::/8\` | Gửi tới tất cả thiết bị trong nhóm |
| **Anycast** | Thiết bị gần nhất trong nhóm | Giống unicast về hình thức | Gửi tới thiết bị "gần nhất" theo routing |

### 3.2. Địa chỉ Unicast — các dạng

**3.2.1. Global Unicast (GUA)** — tương đương IP public trong IPv4.

- Prefix: bắt đầu bằng \`2000::/3\` (tức là 3 bit đầu là \`001\`).
- Thực tế IANA cấp phát chủ yếu dải \`2001::/16\` trở đi.
- Ví dụ: \`2001:db8:1234:5678::1/128\` — địa chỉ cụ thể của một interface.
- Dải \`2001:db8::/32\` — **dải tài liệu/ví dụ** (documentation prefix), không bao giờ route trên Internet thật.

**3.2.2. Link-Local Unicast** — địa chỉ nội bộ trong một segment mạng (một "link").

- Prefix: \`fe80::/10\` (10 bit đầu = \`1111 1110 10\`).
- Được **tự động tạo** trên mọi interface IPv6 kể cả khi không có cấu hình gì — không cần DHCP hay thủ công.
- **Không thể route** ra ngoài link (router từ chối forward gói tin có địa chỉ nguồn/đích link-local).
- Dùng để: phát hiện hàng xóm (NDP — Neighbor Discovery Protocol), cấu hình router, SLAAC (tự cấu hình địa chỉ toàn cục).
- Ví dụ: \`fe80::1\` (router trên link), \`fe80::202:b3ff:fe1e:8329\` (máy tính trên link).

**3.2.3. Unique Local Address (ULA)** — tương đương địa chỉ private (RFC 1918) trong IPv4.

- Prefix: \`fc00::/7\` — trong thực tế phổ biến là \`fd00::/8\`.
- Dùng trong mạng nội bộ, không route trên Internet công cộng.
- Ví dụ: \`fd12:3456:789a::1\`.

### 3.3. Địa chỉ đặc biệt

**Loopback**: \`::1\` — tương đương \`127.0.0.1\` trong IPv4. Gói tin gửi tới \`::1\` không rời khỏi máy, dùng để kiểm tra stack mạng nội bộ.

**Unspecified**: \`::\` (tất cả bit là 0) — tương đương \`0.0.0.0\`. Dùng khi thiết bị chưa có địa chỉ (ví dụ trong quá trình SLAAC).

### 3.4. Địa chỉ Multicast

Prefix: \`ff00::/8\`. Byte thứ 2 mã hóa **cờ** (flags) và **phạm vi** (scope):

\`\`\`
ff  X  S  :  ...
|   |  |
|   |  +--- Scope: 1=node, 2=link, 5=site, 8=org, e=global
|   +------ Flags: 0=permanent, 1=temporary
+---------- Multicast prefix
\`\`\`

Các địa chỉ multicast quan trọng:

| Địa chỉ | Ý nghĩa |
|---------|---------|
| \`ff02::1\` | Tất cả thiết bị IPv6 trên link (All Nodes) |
| \`ff02::2\` | Tất cả router trên link (All Routers) |
| \`ff02::fb\` | mDNS multicast (như Bonjour/Avahi) |
| \`ff02::1:2\` | DHCPv6 agents (Relay/Server) |
| \`ff02::1:ff00:0/104\` | Solicited-Node multicast — dùng cho NDP (thay ARP) |

❓ **Câu hỏi tự nhiên**:
- *Solicited-Node multicast là gì?*
  Khi thiết bị A muốn biết địa chỉ MAC của thiết bị B có IPv6 là \`2001:db8::1234\`, A gửi Neighbor Solicitation tới địa chỉ multicast \`ff02::1:ff00:1234\` (lấy 24 bit cuối của IPv6 đích). Chỉ thiết bị B lắng nghe địa chỉ multicast đó, trả lời bằng Neighbor Advertisement. Đây là cách NDP thay thế ARP mà không cần broadcast.
- *Nếu không có broadcast, làm sao router quảng bá thông tin mạng?*
  Router dùng địa chỉ multicast \`ff02::2\` (All Routers) để gửi Neighbor Solicitation, và \`ff02::1\` (All Nodes) để gửi Router Advertisement. Chỉ thiết bị quan tâm mới "lắng nghe" địa chỉ multicast đó — tiết kiệm băng thông hơn broadcast.

### 3.5. Prefix và Interface ID

Địa chỉ IPv6 unicast gồm 2 phần:

\`\`\`
|<--- Prefix (network) --->|<--- Interface ID (host) --->|
|      64 bit               |          64 bit             |
2001:0db8:abcd:0012 : 0000:0000:0000:0001
|_______________________|   |___________________________|
    Network prefix /64             Interface Identifier
\`\`\`

- **Prefix /64**: phần mạng, do ISP hoặc admin cấp phát. Các thiết bị trong cùng subnet chia sẻ prefix này.
- **Interface ID (64 bit)**: phần host, có thể tạo tự động từ địa chỉ MAC (EUI-64) hoặc ngẫu nhiên (Privacy Extensions — RFC 4941).

**EUI-64 từ MAC** (ví dụ minh họa):
\`\`\`
MAC:            02:42:b3:1e:83:29
Bước 1 — chèn ff:fe ở giữa:
                02:42:b3:ff:fe:1e:83:29
Bước 2 — đảo bit Universal/Local (bit thứ 7 của octet đầu):
                02 = 0000 0010 → 0000 0000 = 00
Interface ID:   0042:b3ff:fe1e:8329
\`\`\`

📝 **Tóm tắt mục 3**:
- Ba loại chính: unicast, multicast, anycast. Không có broadcast.
- Link-local (\`fe80::/10\`) — tự tạo, không route được, cần thiết cho NDP.
- Loopback \`::1\` — tương đương \`127.0.0.1\`.
- Multicast \`ff00::/8\` — thay thế broadcast; NDP dùng Solicited-Node multicast.
- Địa chỉ 128-bit thường chia /64: 64-bit prefix + 64-bit interface ID.

---

## 4. So sánh IPv4 và IPv6

### 4.1. Header

💡 **Trực giác**: Header IPv4 có 20 byte bắt buộc + tùy chọn phức tạp (options field). Header IPv6 được thiết kế lại từ đầu — **cố định 40 byte**, loại bỏ các trường không cần thiết và đẩy các tùy chọn vào "Extension Headers" riêng.

**Header IPv4 (20 byte tối thiểu, tới 60 byte với options)**:

\`\`\`
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address (32-bit)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address (32-bit)               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (variable, 0–40 byte)              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
\`\`\`

**Header IPv6 (cố định 40 byte)**:

\`\`\`
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                         Source Address (128-bit)             +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                      Destination Address (128-bit)           +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
\`\`\`

### 4.2. Bảng so sánh chi tiết

| Tính năng | IPv4 | IPv6 |
|-----------|------|------|
| **Độ dài địa chỉ** | 32-bit | 128-bit |
| **Ký hiệu** | Thập phân, dấu \`.\` (\`192.168.1.1\`) | Thập lục phân, dấu \`:\` (\`2001:db8::1\`) |
| **Header** | 20–60 byte (variable) | 40 byte (cố định) |
| **Checksum header** | Có (router phải tính lại mỗi hop) | Không (giảm tải router) |
| **Fragmentation** | Router và host đều làm được | Chỉ host nguồn (router không fragment) |
| **Phát hiện hàng xóm** | ARP (broadcast) | NDP — Neighbor Discovery Protocol (multicast) |
| **Cấu hình địa chỉ** | DHCP hoặc thủ công | SLAAC (tự động, không cần server) hoặc DHCPv6 |
| **NAT** | Cần thiết (vì thiếu địa chỉ) | Không cần (đủ địa chỉ cho mọi thiết bị) |
| **Broadcast** | Có | Không (thay bằng multicast) |
| **IPsec** | Tùy chọn | Được thiết kế sẵn (khuyến nghị) |
| **Flow Label** | Không | Có (20-bit, hỗ trợ QoS) |
| **Options** | Trong header (phức tạp) | Extension Headers (linh hoạt, không làm chậm forwarding) |

### 4.3. SLAAC — tự cấu hình địa chỉ

**SLAAC** (Stateless Address Autoconfiguration — tự cấu hình địa chỉ không trạng thái) là một trong những tính năng quan trọng nhất của IPv6:

1. Interface tự tạo địa chỉ link-local từ MAC (EUI-64 hoặc ngẫu nhiên).
2. Gửi **Router Solicitation** tới \`ff02::2\` (All Routers multicast): "Có router nào ở đây không?"
3. Router trả lời **Router Advertisement** chứa: prefix mạng (vd \`/64\`), thông số gateway.
4. Interface kết hợp prefix từ router + interface ID tự tạo → địa chỉ global unicast.
5. Thực hiện **DAD** (Duplicate Address Detection — phát hiện địa chỉ trùng) để đảm bảo không trùng với thiết bị khác trên link.

Kết quả: thiết bị có địa chỉ IPv6 đầy đủ **mà không cần DHCP server**. Đây là ưu điểm lớn cho IoT và mạng lớn.

📝 **Tóm tắt mục 4**:
- Header IPv6 cố định 40 byte, loại bỏ checksum và fragmentation ở router → xử lý nhanh hơn.
- NDP thay thế ARP, dùng multicast thay broadcast → hiệu quả hơn.
- SLAAC cho phép thiết bị tự cấu hình địa chỉ hoàn toàn, không cần DHCP server.
- Không cần NAT → tính minh bạch end-to-end được khôi phục.

---

## 5. Chuyển tiếp IPv4 → IPv6

### 5.1. Vấn đề chuyển đổi

IPv4 và IPv6 không tương thích trực tiếp — router IPv4 không hiểu gói tin IPv6 và ngược lại. Tuy nhiên, mạng Internet hiện tại vẫn có rất nhiều thiết bị chỉ hỗ trợ IPv4, nên cần các cơ chế chuyển tiếp.

### 5.2. Ba cơ chế chính

**5.2.1. Dual-Stack (Hai ngăn xếp)**

Mỗi thiết bị và router chạy **đồng thời cả IPv4 lẫn IPv6**. Đây là cơ chế phổ biến nhất hiện nay:
- Thiết bị có cả địa chỉ IPv4 và IPv6.
- Khi kết nối tới server hỗ trợ cả hai, thiết bị ưu tiên IPv6 (theo RFC 6724 — "Happy Eyeballs").
- Không cần dịch địa chỉ, không mất hiệu năng.
- Nhược điểm: vẫn cần địa chỉ IPv4 → không giải quyết vấn đề cạn kiệt IPv4 triệt để.

Ví dụ thực tế: Google, Facebook, hầu hết CDN lớn đều dual-stack. Khi bạn gõ \`google.com\`, trình duyệt thử kết nối IPv6 trước, nếu thất bại thì dùng IPv4 — người dùng không nhận ra sự khác biệt.

**5.2.2. Tunneling (Đóng gói)**

Gói tin IPv6 được **bọc bên trong** gói tin IPv4 để truyền qua phần mạng chỉ hiểu IPv4 (và ngược lại):

\`\`\`
[IPv4 Header][IPv6 Header][Payload]
|___________|____________|_________|
  Outer hdr   Inner hdr   Dữ liệu
\`\`\`

Các biến thể phổ biến:
- **6in4** (Protocol 41): đóng gói IPv6 vào IPv4, tunnel tĩnh giữa 2 endpoint cụ thể.
- **Teredo**: đóng gói IPv6 vào UDP/IPv4 — dùng khi endpoint đứng sau NAT.
- **ISATAP, 6to4, 6rd**: các cơ chế tunnel tự động khác.

❓ **Câu hỏi tự nhiên**:
- *Tunneling có làm chậm mạng không?*
  Có, vì thêm overhead header và phải encapsulate/decapsulate tại 2 đầu. Với 6in4 overhead là 20 byte (kích thước IPv4 header) cho mỗi gói tin. Với MTU 1500 byte, overhead này là ~1.3% — nhỏ nhưng không bằng không.

**5.2.3. Translation (Dịch địa chỉ)**

Thiết bị **dịch** gói tin giữa IPv4 và IPv6 tại biên mạng (tương tự NAT nhưng giữa hai giao thức):
- **NAT64**: cho phép thiết bị chỉ có IPv6 kết nối tới server chỉ có IPv4. Router NAT64 dịch địa chỉ và header theo thời gian thực.
- **DNS64**: kết hợp với NAT64, tổng hợp địa chỉ IPv4 của server vào địa chỉ IPv6 "giả" để thiết bị IPv6 có thể resolve.

📝 **Tóm tắt mục 5**:
- **Dual-stack**: cả hai giao thức chạy song song — phổ biến nhất, ít overhead.
- **Tunneling**: gói IPv6 đóng trong IPv4 (hoặc ngược lại) — dùng khi hạ tầng giữa chỉ hiểu một giao thức.
- **Translation (NAT64/DNS64)**: dịch giữa hai giao thức tại biên — giải pháp cuối cùng cho thiết bị chỉ hỗ trợ một giao thức.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **IPv6 không còn "tương lai" — mobile/cloud đã dùng rộng. Dev cần code IP-version-agnostic và biết bẫy dual-stack.**

| Khái niệm | Gặp thật ở đâu |
|-----------|----------------|
| **Dual-stack** (IPv4+IPv6) | Server/client phải xử lý cả hai; \`::1\` = localhost IPv6 |
| **Địa chỉ IPv6 trong code** | Parse/format khác (dấu \`:\`, \`[::1]:8080\` có ngoặc vuông) |
| **No NAT** (IPv6 đủ địa chỉ) | Mỗi thiết bị một IP công → mô hình bảo mật khác (firewall thay NAT) |
| **AAAA record** | DNS trả IPv6; client chọn IPv4/IPv6 (Happy Eyeballs) |

### 6.1. Ví dụ cụ thể — bẫy parse địa chỉ trong code

URL với IPv6 phải bọc ngoặc vuông: \`http://[2001:db8::1]:8080\` (vì \`:\` đã dùng cho port). Code tự parse \`host:port\` bằng \`strings.Split(addr, ":")\` → **vỡ** với IPv6 (nhiều dấu \`:\`). Dùng \`net.SplitHostPort\` (xử lý đúng cả hai). Tương tự, validate IP đừng giả định IPv4 4-octet. Go \`net.IP\` xử lý cả hai; bind \`:8080\` (không IP) lắng nghe cả v4 lẫn v6. Đây là bug thật khi app chỉ test IPv4 rồi chạy môi trường IPv6-only (một số mạng mobile/cloud).

> ❓ **"App của tôi có cần lo IPv6 không?"** Ngày càng có. (1) Mạng mobile nhiều nơi **IPv6-only** (dùng NAT64 cho IPv4 cũ) → app chỉ hỗ trợ IPv4 có thể lỗi; (2) cloud (AWS/GCP) hỗ trợ/khuyến khích IPv6; (3) Apple yêu cầu app iOS chạy được mạng IPv6-only. Quy tắc thực dụng: **code IP-agnostic** (dùng \`net.SplitHostPort\`, \`net.IP\`, không hard-code v4), test trên cả hai. Không cần migrate sang IPv6, chỉ cần **không giả định IPv4**.

### 6.2. 📝 Tóm tắt mục 6

- IPv6 đã dùng rộng (mobile IPv6-only, cloud, yêu cầu Apple) → code phải **IP-version-agnostic**.
- Bẫy parse: IPv6 nhiều dấu \`:\`, URL cần \`[::1]:port\` → dùng \`net.SplitHostPort\`/\`net.IP\`, không \`Split(":")\`.
- IPv6 không NAT (đủ địa chỉ) → bảo mật dựa firewall thay NAT; DNS AAAA + Happy Eyeballs chọn v4/v6.

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Rút gọn địa chỉ IPv6:
Rút gọn địa chỉ \`2001:0db8:0000:0001:0000:0000:0000:0001\` theo đúng quy tắc RFC 5952.

**Bài 2** — Khôi phục địa chỉ IPv6:
Khôi phục địa chỉ rút gọn \`ff02::1:ff42:8329\` về dạng đầy đủ 8 nhóm.

**Bài 3** — Nhận diện loại địa chỉ:
Xác định loại của từng địa chỉ sau: (a) \`::1\`, (b) \`fe80::1\`, (c) \`2001:db8::1\`, (d) \`ff02::1\`, (e) \`fd12:3456::1\`.

**Bài 4** — Đếm địa chỉ trong subnet /64:
Một ISP cấp cho khách hàng prefix \`/64\`. Hỏi subnet đó có bao nhiêu địa chỉ khả dụng? So sánh với một subnet \`/24\` của IPv4.

**Bài 5** — Tính Interface ID bằng EUI-64:
Một card mạng có địa chỉ MAC \`aa:bb:cc:11:22:33\`. Tính Interface ID theo EUI-64 và ghép với prefix \`2001:db8:1:1::/64\` để có địa chỉ IPv6 đầy đủ.

**Bài 6** — Đối chiếu với IPv4:
Giải thích tại sao IPv6 không có header checksum, trong khi IPv4 có. Điều này ảnh hưởng gì đến hiệu năng?

---

### Lời giải chi tiết

**Bài 1 — Rút gọn**:

Địa chỉ gốc: \`2001:0db8:0000:0001:0000:0000:0000:0001\`

Bước 1 — Bỏ số 0 đứng đầu từng nhóm:
- \`2001\` → \`2001\` (không có 0 đứng đầu thừa)
- \`0db8\` → \`db8\`
- \`0000\` → \`0\`
- \`0001\` → \`1\`
- \`0000\` → \`0\`
- \`0000\` → \`0\`
- \`0000\` → \`0\`
- \`0001\` → \`1\`

Kết quả bước 1: \`2001:db8:0:1:0:0:0:1\`

Bước 2 — Tìm chuỗi nhóm \`0\` liên tiếp dài nhất:
- Nhóm 3: \`0\` — 1 nhóm
- Nhóm 5-7: \`0:0:0\` — **3 nhóm** (dài nhất) → áp dụng \`::\`

Kết quả cuối: **\`2001:db8:0:1::1\`**

Kiểm tra: \`2001:db8:0:1::1\` → khai triển: 2001, db8, 0, 1, 0, 0, 0, 1 = 8 nhóm ✓

---

**Bài 2 — Khôi phục**:

Địa chỉ rút gọn: \`ff02::1:ff42:8329\`

Bước 1 — Đếm nhóm hiện có: \`ff02\`, \`1\`, \`ff42\`, \`8329\` → 4 nhóm.

Bước 2 — \`::\` ứng với: 8 − 4 = **4 nhóm \`0000\`**.

Bước 3 — Khai triển:
\`\`\`
ff02 :: 0001 : ff42 : 8329
     ^-- 4 nhóm 0000 ở đây
\`\`\`

Kết quả: \`ff02:0000:0000:0000:0000:0001:ff42:8329\`

Dạng chuẩn đầy đủ: **\`ff02:0000:0000:0000:0000:0001:ff42:8329\`**

Lưu ý: đây là địa chỉ **Solicited-Node multicast** (\`ff02::1:ff\` + 24 bit cuối của địa chỉ đích \`42:8329\`) — dùng bởi NDP để thay thế ARP.

---

**Bài 3 — Nhận diện loại địa chỉ**:

**(a) \`::1\`**:
- Khai triển: \`0000:0000:0000:0000:0000:0000:0000:0001\`
- Nhận diện: đây là **địa chỉ Loopback** — tương đương \`127.0.0.1\` trong IPv4.
- Xác nhận: RFC 4291 định nghĩa \`::1/128\` là loopback.

**(b) \`fe80::1\`**:
- Prefix: \`fe80\` = \`1111 1110 1000 0000\` → 10 bit đầu là \`1111 1110 10\` → thuộc \`fe80::/10\`.
- Nhận diện: **Link-Local Unicast**.
- Đặc điểm: tự động tạo, không route ra ngoài link.

**(c) \`2001:db8::1\`**:
- Prefix: \`2001:db8::/32\` — đây là **dải dành cho tài liệu/ví dụ** (documentation prefix, RFC 3849).
- Loại địa chỉ: **Global Unicast** (về mặt định dạng), nhưng không bao giờ route trên Internet thật.
- Trong bài học/tài liệu: dùng làm ví dụ thay cho IP thật.

**(d) \`ff02::1\`**:
- Prefix: \`ff02\` → \`ff\` = \`1111 1111\` → thuộc \`ff00::/8\` → **Multicast**.
- Scope byte: \`02\` → \`2\` = link-local scope.
- Nhận diện: **Link-Local Multicast — All Nodes** (tất cả thiết bị IPv6 trên link).

**(e) \`fd12:3456::1\`**:
- Prefix: \`fd12\` → \`fd\` = \`1111 1101\` → 7 bit đầu = \`1111 110\` → thuộc \`fc00::/7\`, cụ thể là \`fd00::/8\`.
- Nhận diện: **Unique Local Address (ULA)** — tương đương địa chỉ private trong IPv4.

---

**Bài 4 — Đếm địa chỉ trong /64**:

Subnet IPv6 /64 có phần host $= 128 - 64 =$ **64 bit**.

Số địa chỉ $= 2^{64} =$ **18.446.744.073.709.551.616** địa chỉ ($\\approx$ 18,4 tỉ tỉ địa chỉ).

Tất cả đều có thể dùng (không cần trừ network address hay broadcast như IPv4 — IPv6 không có broadcast).

So sánh với IPv4 /24:
- Số bit host $= 32 - 24 = 8$ bit $\\to 2^8 =$ **256 địa chỉ** tổng.
- Trừ network (\`x.x.x.0\`) và broadcast (\`x.x.x.255\`) → **254 host khả dụng**.

Tỉ lệ: $2^{64} / 254 \\approx$ **$7,3 \\times 10^{16}$** (tức là một subnet /64 của IPv6 lớn hơn toàn bộ subnet /24 của IPv4 khoảng 73.000 tỉ lần).

---

**Bài 5 — Tính Interface ID bằng EUI-64**:

MAC: \`aa:bb:cc:11:22:33\`

Bước 1 — Chèn \`ff:fe\` vào giữa (giữa byte 3 và byte 4):
\`\`\`
aa:bb:cc : ff:fe : 11:22:33
\`\`\`
→ \`aa:bb:cc:ff:fe:11:22:33\`

Bước 2 — Đảo bit Universal/Local (bit thứ 7 — đếm từ 0 — của byte đầu tiên):
\`\`\`
aa = 1010 1010
bit 7 (MSB = bit 7) = 1 → đảo → 0
→ 0010 1010 = 28
\`\`\`
→ Byte đầu \`aa\` → \`a8\` (vì \`1010 1010\` XOR \`0000 0010\` = \`1010 1000\` = \`a8\`)

Bước 3 — Ghép thành Interface ID (8 byte = 64 bit):
\`\`\`
a8:bb:cc:ff:fe:11:22:33
→ a8bb:ccff:fe11:2233
\`\`\`

Bước 4 — Ghép với prefix \`2001:db8:1:1::/64\`:
\`\`\`
2001:db8:1:1:a8bb:ccff:fe11:2233
\`\`\`

Địa chỉ IPv6 đầy đủ: **\`2001:db8:1:1:a8bb:ccff:fe11:2233\`**

---

**Bài 6 — Header checksum**:

**IPv4 có header checksum vì**: Thời IPv4 ra đời (1981), các đường truyền vật lý không đáng tin cậy — bit flip trong quá trình truyền là phổ biến. Router phải kiểm tra checksum để phát hiện lỗi header. Tuy nhiên, **mỗi router phải tính lại checksum** vì trường TTL (Time-To-Live) giảm 1 sau mỗi hop → checksum thay đổi. Điều này tốn CPU tại mỗi router trên đường đi.

**IPv6 không có header checksum vì**:
1. Tầng 2 (Ethernet, Wi-Fi) đã có CRC kiểm tra lỗi — bit flip hiếm khi xảy ra trên đường truyền hiện đại.
2. Tầng 4 (TCP, UDP) đã có checksum bao phủ cả header IP (dưới dạng pseudo-header) và payload.
3. Loại bỏ checksum → router **không phải tính lại** tại mỗi hop → tăng tốc forwarding đáng kể, đặc biệt với router có throughput cao (triệu packet/giây).

**Ảnh hưởng hiệu năng**:
- Router IPv6 xử lý gói tin nhanh hơn vì không có bước verify + tính lại checksum.
- Ước tính: với router 10 Gbps forward 14,8 triệu packet/giây (packet 64 byte), tiết kiệm vài chu kỳ CPU mỗi packet × 14,8 triệu = tiết kiệm hàng chục triệu CPU cycles/giây — quan trọng ở router backbone.

---

## 8. Liên kết và bài tiếp theo

- Tiền đề: [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — nền tảng về địa chỉ IP và CIDR.
- Tiền đề: [Lesson 05 — ARP, ICMP, DHCP, NAT](../lesson-05-arp-icmp-dhcp-nat/) — hiểu NDP qua so sánh với ARP.
- Bài tiếp theo: [Lesson 07 — Tầng giao vận: UDP](../lesson-07-udp/) — giao thức tầng trên, dùng địa chỉ IPv4/IPv6 để định địa chỉ.
- Tham khảo thêm: RFC 4291 (IPv6 Addressing Architecture), RFC 5952 (Text Representation of IPv6), RFC 4862 (SLAAC).

---

## 📝 Tổng kết Lesson 06

1. **IPv4 cạn kiệt**: $2^{32} \\approx$ 4,3 tỉ địa chỉ — đã cạn từ 2011. NAT là giải pháp tạm, phá vỡ end-to-end.
2. **IPv6 = 128-bit = $2^{128} \\approx 3,4 \\times 10^{38}$ địa chỉ** — đủ dùng vĩnh viễn.
3. **Rút gọn**: bỏ 0 đứng đầu nhóm + \`::\` cho chuỗi 0 dài nhất (chỉ một lần).
4. **Các loại địa chỉ**: global unicast, link-local (\`fe80::/10\`), loopback (\`::1\`), multicast (\`ff00::/8\`), ULA (\`fd00::/8\`). Không có broadcast.
5. **Ưu điểm IPv6**: header cố định 40B, không checksum, không fragment tại router, NDP thay ARP, SLAAC tự cấu hình, không cần NAT.
6. **Chuyển tiếp**: dual-stack (phổ biến nhất), tunneling, NAT64/DNS64.

**Tiếp theo**: [Lesson 07 — Tầng giao vận: UDP](../lesson-07-udp/)
`;
