// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/03-Advanced-Operations/lesson-05-sdn-virtualization/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — SDN & Ảo hóa mạng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích vì sao mạng truyền thống khó quản lý ở quy mô lớn (control plane phân tán).
- Nắm được kiến trúc SDN (Software-Defined Networking): tách biệt control plane khỏi data plane.
- Hiểu VLAN (Virtual LAN): chia switch vật lý thành nhiều mạng logic, tag 802.1Q, trunk vs access port.
- Mô tả mạng overlay và VXLAN: tại sao cần, underlay vs overlay là gì.
- Biết NFV (Network Function Virtualization): chuyển firewall/router thành phần mềm.
- Giải được 5 bài tập về phân biệt control/data plane, đọc flow table, gán VLAN, so sánh SDN vs truyền thống.

## Kiến thức tiền đề

- [Lesson 04 — Định tuyến (Routing)](../../01-Foundations-LowerLayers/lesson-04-routing/) — gói tin đi qua các router như thế nào.
- [Lesson 02 — Ethernet & Link Layer](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/) — frame Ethernet, MAC address, switch hoạt động ra sao.

---

## 1. Mạng truyền thống và bài toán quản lý

### 1.1. Kiến trúc phân tán — mỗi thiết bị tự quyết

💡 **Hình dung**: Hãy tưởng tượng 100 giao lộ trong thành phố, mỗi giao lộ có đèn giao thông tự điều chỉnh độc lập — không có trung tâm điều hành. Khi tắc đường xảy ra ở quận 1, đèn ở quận 7 không biết và không phản ứng. Đây chính là cách mạng truyền thống hoạt động.

Trong kiến trúc mạng truyền thống, mỗi thiết bị (router, switch L3) chứa **cả hai chức năng**:

| Chức năng | Tên kỹ thuật | Vai trò |
|-----------|-------------|---------|
| Quyết định đi đường nào | **Control plane** | Chạy giao thức định tuyến (OSPF, BGP), xây bảng định tuyến |
| Thực sự chuyển gói tin | **Data plane** (forwarding plane) | Tra bảng, chuyển tiếp gói tin với tốc độ cao |

Hai thành phần này **nằm trong cùng một thiết bị**, giao tiếp qua giao diện nội bộ.

### 1.2. Vấn đề cụ thể ở quy mô lớn

❓ **Câu hỏi tự nhiên**: "Mạng truyền thống vẫn chạy ổn đó thôi, vấn đề gì?"

Khi mạng chỉ có 10–20 router: quản lý thủ công còn được. Nhưng khi data center của Google, Amazon có **hàng chục nghìn switch và server**, các vấn đề xuất hiện:

**Vấn đề 1 — Cấu hình phân tán, dễ sai lệch**:
- Admin cần SSH vào từng thiết bị để thay đổi chính sách.
- 1000 switch → 1000 lần cấu hình. Một lỗi nhỏ = lỗi cục bộ khó debug.
- Không có "cái nhìn toàn cảnh" (global view): router A không biết router B đang bận cỡ nào.

**Vấn đề 2 — Giao thức phân tán hội tụ chậm**:
- Khi topology thay đổi (link đứt), OSPF cần vài giây đến vài phút để hội tụ lại.
- Trong thời gian đó, gói tin có thể đi vòng (loop) hoặc bị drop.

**Vấn đề 3 — Cứng nhắc, khó tùy chỉnh**:
- Muốn ưu tiên traffic video hơn email theo chính sách động? Phải cấu hình QoS trên từng thiết bị.
- Firmware thiết bị là "hộp đen" — hãng sản xuất quyết định hành vi, không lập trình được tự do.

**Vấn đề 4 — Chi phí cao**:
- Mỗi switch thông minh (có control plane mạnh) giá cao vì phải xử lý cả routing lẫn forwarding.
- Thiết bị từ các hãng khác nhau khó tích hợp.

📝 **Tóm tắt mục 1**:
- Control plane = "bộ não" quyết định đường đi; data plane = "cơ bắp" chuyển gói.
- Mạng truyền thống: 2 thành phần trong cùng thiết bị → khó quản lý tập trung khi quy mô lớn.
- 4 vấn đề chính: cấu hình phân tán, hội tụ chậm, cứng nhắc, chi phí cao.

---

## 2. SDN — Software-Defined Networking

### 2.1. Ý tưởng cốt lõi: tách control plane ra ngoài

💡 **Hình dung**: Thay vì 100 giao lộ tự điều chỉnh độc lập, hãy tưởng tượng **một trung tâm điều hành giao thông** biết toàn bộ bản đồ thành phố, nhận dữ liệu real-time từ 100 giao lộ, và gửi lệnh "đèn xanh 45s / đèn đỏ 15s" xuống từng giao lộ theo tình huống thực tế. Đây chính là SDN.

**Kiến trúc SDN có 3 tầng**:

\`\`\`
┌─────────────────────────────────────────────┐
│  TẦNG ỨNG DỤNG (Application Plane)          │
│  Ứng dụng mạng: load balancer, firewall,    │
│  traffic engineering, monitoring...          │
└─────────────────────┬───────────────────────┘
                      │ Northbound API (REST/gRPC)
┌─────────────────────▼───────────────────────┐
│  TẦNG ĐIỀU KHIỂN (Control Plane)            │
│  SDN Controller (OpenDaylight, ONOS, NOX)   │
│  - Biết toàn bộ topology mạng               │
│  - Quyết định flow rule cho từng switch     │
│  - Duy nhất một (hoặc cluster) controller   │
└─────────────────────┬───────────────────────┘
                      │ Southbound API (OpenFlow, NETCONF)
┌─────────────────────▼───────────────────────┐
│  TẦNG CHUYỂN TIẾP (Data Plane)              │
│  Switch "ngu" (dumb switch): chỉ tra bảng   │
│  flow table và chuyển gói theo lệnh         │
│  Không cần CPU mạnh, không chạy OSPF/BGP   │
└─────────────────────────────────────────────┘
\`\`\`

### 2.2. OpenFlow — giao thức nói chuyện controller–switch

**OpenFlow** là giao thức chuẩn (IEEE/ONF) để SDN controller cài đặt **flow rule** vào switch. Đây là "ngôn ngữ" giữa controller và data plane.

**Flow rule** (quy tắc luồng) gồm 3 phần:

| Phần | Nội dung | Ví dụ |
|------|----------|-------|
| **Match** | Điều kiện khớp | \`src_ip=10.0.0.1, dst_port=80\` |
| **Action** | Hành động thực hiện | \`forward → port 3\` hoặc \`drop\` hoặc \`send_to_controller\` |
| **Priority** | Độ ưu tiên (rule khớp nhiều → dùng rule ưu tiên cao hơn) | \`100\` |

**Walk-through cụ thể — gói tin đến switch SDN**:

\`\`\`
Gói tin: src=10.0.0.1, dst=10.0.0.5, dst_port=80

Switch tra flow table (theo thứ tự ưu tiên):

Rule 1: match(dst_ip=10.0.0.5, dst_port=80) → action: forward port 2  [priority=200]
Rule 2: match(src_ip=10.0.0.1)              → action: forward port 3  [priority=100]
Rule 3: match(*)                             → action: send_to_controller [priority=0]

→ Khớp Rule 1 (priority cao nhất) → gói được chuyển ra port 2.
\`\`\`

❓ **Câu hỏi tự nhiên**:

**"Nếu gói không khớp rule nào thì sao?"**
→ Rule mặc định (priority=0, match=*) thường là \`send_to_controller\`: gửi gói lên controller để controller quyết định và cài rule mới xuống. Sau đó gói tương tự tiếp theo sẽ được switch xử lý ngay mà không cần hỏi lại.

**"Controller bị down thì mạng chết hết không?"**
→ Đây là điểm yếu thật sự của SDN. Giải pháp: triển khai controller theo cụm (cluster) với high availability. Ngoài ra, switch SDN vẫn có thể cache flow rule và tiếp tục chuyển tiếp trong thời gian ngắn khi controller mất kết nối.

**"SDN có nhanh hơn mạng truyền thống không?"**
→ Data plane (chuyển gói) không chậm hơn — switch vẫn tra bảng và forward ở tốc độ phần cứng (line-rate). Điểm cải thiện là tốc độ phản ứng của toàn mạng khi cần thay đổi chính sách: thay vì SSH vào 1000 thiết bị, controller cập nhật flow rule trong vài millisecond.

### 2.3. So sánh SDN vs mạng truyền thống

| Tiêu chí | Mạng truyền thống | SDN |
|----------|-------------------|-----|
| Quản lý | Phân tán, từng thiết bị | Tập trung, qua controller |
| Lập trình hành vi | Hạn chế (firmware) | Linh hoạt (API) |
| Phản ứng thay đổi | Giao thức phân tán, vài giây | Controller cập nhật ms |
| Chi phí switch | Cao (switch "thông minh") | Thấp hơn (switch đơn giản) |
| Điểm thất bại duy nhất (SPOF) | Không (phân tán) | Có (controller) — cần HA |
| Độ phức tạp | Phức tạp ở edge (từng thiết bị) | Phức tạp ở controller |
| Ví dụ | Mạng campus, ISP truyền thống | Data center Google, Facebook, SDN campus |

⚠ **Lỗi thường gặp**: Nhiều người nghĩ SDN = "mạng không cần phần cứng". Sai. SDN vẫn cần switch phần cứng ở data plane — chỉ là switch đó không cần chạy OSPF/BGP nữa, và có thể đơn giản/rẻ hơn.

📝 **Tóm tắt mục 2**:
- SDN tách control plane (controller tập trung) khỏi data plane (switch đơn giản).
- 3 tầng: Application → Controller → Data plane; giao tiếp qua Northbound API và OpenFlow.
- Flow rule: Match + Action + Priority — switch tra bảng, khớp rule → hành động tương ứng.
- Lợi ích: quản lý tập trung, lập trình được, phản ứng nhanh. Nhược: controller là SPOF.

---

## 3. VLAN — Mạng LAN ảo

### 3.1. Vấn đề VLAN giải quyết

💡 **Hình dung**: Bạn có một tòa văn phòng 5 tầng, mỗi tầng có 20 nhân viên. Bạn muốn phòng Kế Toán (tầng 2 + một số người tầng 4) chỉ nói chuyện với nhau, không thấy traffic của phòng Kỹ Thuật (tầng 1 + tầng 3). Mua riêng 2 switch vật lý? Tốn kém. Giải pháp: **1 switch dùng chung, chia logic thành 2 mạng riêng** — đó là VLAN.

**Không có VLAN** — 1 switch = 1 broadcast domain:
- Máy A gửi ARP "ai là 10.0.0.5?" → broadcast tới **tất cả** 40 máy trong mạng.
- Traffic của phòng Kế Toán và Kỹ Thuật trộn lẫn → kém bảo mật.
- Khi có 1000 máy: mỗi ARP broadcast = 1000 gói tin vô ích.

**Với VLAN**:
- VLAN 10 = Kế Toán: máy A (port 1, 3, 5, 7...) — broadcast chỉ trong VLAN 10.
- VLAN 20 = Kỹ Thuật: máy B (port 2, 4, 6, 8...) — broadcast chỉ trong VLAN 20.
- Cùng switch vật lý, **hai mạng logic hoàn toàn độc lập**.

### 3.2. Tag 802.1Q — "nhãn dán" trên frame

Để switch biết frame này thuộc VLAN nào, chuẩn **IEEE 802.1Q** thêm một trường 4 byte vào frame Ethernet:

**Frame Ethernet gốc (không có VLAN)**:
\`\`\`
[ Dst MAC 6B ][ Src MAC 6B ][ EtherType 2B ][ Payload ][ FCS 4B ]
\`\`\`

**Frame Ethernet với tag 802.1Q**:
\`\`\`
[ Dst MAC 6B ][ Src MAC 6B ][ 0x8100 2B ][ TCI 2B ][ EtherType 2B ][ Payload ][ FCS 4B ]
                             └──────────────────────┘
                                  VLAN Tag (4 byte)
\`\`\`

Trường **TCI (Tag Control Information)** 2 byte bao gồm:
- **PCP (3 bit)**: Priority Code Point — ưu tiên 0–7 (dùng cho QoS, liên kết với [Lesson 04 — QoS](../lesson-04-qos/)).
- **DEI (1 bit)**: Drop Eligible Indicator — gói có thể bỏ khi tắc.
- **VID (12 bit)**: VLAN ID — số VLAN từ 0 đến 4095. Vậy 1 switch có thể có tối đa 4094 VLAN (0 và 4095 dành riêng).

**Walk-through frame với VLAN tag**:

\`\`\`
Máy A (VLAN 10) gửi: ping tới máy B (VLAN 10)
Frame gốc từ máy A:
  [ FF:FF:FF:FF:FF:FF ][ AA:BB:CC:11:22:33 ][ 0x0800 ][ IP packet ][ FCS ]

Switch nhận vào cổng access VLAN 10, thêm tag:
  [ FF:FF:FF:FF:FF:FF ][ AA:BB:CC:11:22:33 ][ 0x8100 ][ PCP=0,DEI=0,VID=10 ][ 0x0800 ][ IP packet ][ FCS ]
  ↑ "nhãn dán" VLAN 10 được gắn vào

Switch tra MAC table, chỉ chuyển trong VLAN 10.
Trước khi gửi ra cổng access của máy B (cùng VLAN 10):
  Switch bóc tag → máy B nhận frame gốc (không thấy VLAN tag).

Nếu frame thuộc VLAN 20 → Switch KHÔNG chuyển vào VLAN 10. Hoàn toàn cô lập.
\`\`\`

⚠ **Lỗi thường gặp**: Nhầm \`0x8100\` là EtherType của IP. Không phải. \`0x8100\` = VLAN-tagged frame (802.1Q). \`0x0800\` = IPv4. \`0x0806\` = ARP. Switch nhìn thấy \`0x8100\` → biết có VLAN tag → đọc TCI tiếp theo.

### 3.3. Access port vs Trunk port

**Access port** (cổng truy cập):
- Gán cho **một VLAN cụ thể**.
- Thiết bị đầu cuối (PC, server) cắm vào cổng này.
- **Không bao giờ thấy VLAN tag**: switch tự thêm/bóc tag, máy đầu cuối không biết có VLAN.
- Ví dụ: port 5 là access VLAN 10 → mọi traffic vào/ra port 5 đều thuộc VLAN 10.

**Trunk port** (cổng trunk):
- Mang **nhiều VLAN** cùng một lúc.
- Dùng để kết nối **switch với switch**, hoặc switch với router/server có hỗ trợ 802.1Q.
- Frame qua trunk port **giữ nguyên VLAN tag**.
- Có thể cấu hình "native VLAN" — VLAN không cần tag khi qua trunk (mặc định VLAN 1, nên đổi vì lý do bảo mật).

\`\`\`
Ví dụ topology:

  SW1                         SW2
  port 1 — access VLAN 10     port 1 — access VLAN 10
  port 2 — access VLAN 20     port 2 — access VLAN 20
  port 8 — trunk (VLAN 10,20) port 8 — trunk (VLAN 10,20)
       |_________________________|
              (uplink trunk)

Máy A (SW1, port 1, VLAN 10) → Máy C (SW2, port 1, VLAN 10):
1. SW1 nhận frame từ Máy A → gắn tag VLAN 10 → gửi qua trunk port 8.
2. Frame có tag VLAN 10 đi qua dây uplink.
3. SW2 nhận trên trunk port 8 → thấy tag VLAN 10 → chuyển tới port 1 (VLAN 10) → bóc tag → gửi Máy C.

Máy B (SW1, port 2, VLAN 20) không nhận được frame này.
\`\`\`

❓ **Câu hỏi tự nhiên**:

**"VLAN có ngăn được hoàn toàn không? Máy ở VLAN 10 có tấn công được VLAN 20 không?"**
→ VLAN cô lập ở tầng 2 (L2 — Ethernet). Giao tiếp giữa 2 VLAN cần đi qua router (inter-VLAN routing) — thiết bị tầng 3. Router có thể đặt firewall rule để kiểm soát traffic giữa VLAN. Nhưng nếu switch bị cấu hình sai (VLAN hopping attack) hoặc native VLAN không được bảo vệ, có thể bị bypass.

**"Vì sao VID chỉ có 12 bit (4094 VLAN) mà không nhiều hơn?"**
→ Khi 802.1Q được thiết kế năm 1998, 4094 VLAN tưởng là đủ cho mạng doanh nghiệp. Nhưng cloud/data center cần hàng triệu tenant cô lập → sinh ra VXLAN (xem mục 4).

🔁 **Dừng lại tự kiểm tra**:

Switch có port 3 cấu hình "access VLAN 20". Máy A (VLAN 10) gửi frame broadcast ARP. Frame có đến port 3 không?

<details>
<summary>Đáp án</summary>
Không. Broadcast ARP từ VLAN 10 chỉ phát trong VLAN 10. Port 3 (VLAN 20) thuộc broadcast domain khác — switch hoàn toàn không chuyển frame đó tới port 3.
</details>

📝 **Tóm tắt mục 3**:
- VLAN chia 1 switch vật lý thành nhiều broadcast domain logic — tiết kiệm hardware, tăng bảo mật.
- Tag 802.1Q: 4 byte thêm vào frame, trong đó VID 12 bit xác định VLAN (0–4095, max 4094 VLAN).
- Access port: 1 VLAN, thiết bị đầu cuối — không thấy tag. Trunk port: nhiều VLAN, switch-to-switch — giữ tag.
- Frame chỉ đi trong VLAN của nó; sang VLAN khác phải qua router (inter-VLAN routing).

---

## 4. Mạng Overlay & VXLAN

### 4.1. Vấn đề: 4094 VLAN không đủ cho cloud

💡 **Hình dung**: Bạn là nhà cung cấp cloud (AWS, Azure). Bạn có 100,000 khách hàng (tenant), mỗi người cần mạng riêng hoàn toàn cô lập. VLAN chỉ có 4094 ID → không đủ. Hơn nữa, máy chủ của khách hàng A có thể nằm ở data center San Jose và Singapore — hai mạng vật lý khác nhau — nhưng cần giao tiếp như thể cùng mạng L2.

Giải pháp: **mạng overlay** — xây một mạng ảo "bên trên" mạng vật lý.

### 4.2. Underlay vs Overlay

| Thuật ngữ | Nghĩa | Ví dụ |
|-----------|-------|-------|
| **Underlay** (mạng vật lý nền) | Hạ tầng mạng thật bên dưới: router, switch vật lý, cáp, giao thức định tuyến IP thật | Data center có switch 10GbE, router BGP thật; IP thật là 10.0.0.0/8 |
| **Overlay** (mạng ảo trên nền) | Mạng ảo được xây trên underlay, dùng tunneling để đóng gói frame/gói tin ảo bên trong gói tin thật | Khách hàng thấy mạng 192.168.1.0/24 của riêng họ, kể cả khi máy chủ nằm rải rác ở nhiều vùng vật lý |

**Tunnel** (đường hầm): đóng gói gói tin bên trong gói tin khác để vượt qua mạng trung gian.

### 4.3. VXLAN — Virtual eXtensible LAN

**VXLAN** (RFC 7348) là giao thức overlay phổ biến nhất trong data center hiện đại. Nó đóng gói frame Ethernet L2 bên trong UDP/IP.

**Tại sao lại là UDP?** Vì UDP đi qua mọi router IP bình thường (underlay không cần cấu hình đặc biệt). Payload của UDP chứa frame Ethernet gốc → từ góc nhìn bên trong, đây là mạng L2 thuần túy.

**Cấu trúc gói VXLAN**:

\`\`\`
[ Outer Ethernet Header ]  ← header của mạng vật lý (underlay)
[ Outer IP Header       ]  ← src/dst IP của 2 VTEP (máy vật lý)
[ UDP Header            ]  ← dst port 4789 (cổng VXLAN chuẩn)
[ VXLAN Header (8 byte) ]  ← chứa VNI (VXLAN Network Identifier)
[ Inner Ethernet Frame  ]  ← frame gốc của khách hàng (overlay)
[ Inner IP/Payload      ]
\`\`\`

**VNI (VXLAN Network Identifier)**: 24 bit → 2^24 = **16.777.216 mạng ảo** (so với 4094 của VLAN). Đủ cho cloud nhiều triệu tenant.

**VTEP (VXLAN Tunnel EndPoint)**: thiết bị thực hiện đóng gói/mở gói VXLAN. Có thể là phần mềm trên hypervisor (như Open vSwitch trong Linux), hoặc phần cứng switch có hỗ trợ VXLAN.

**Walk-through gói VXLAN**:

\`\`\`
Topology:
  Khách hàng A có 2 VM:
    VM1: IP ảo 192.168.1.10, MAC=AA:BB:CC:01:00:01, trên máy chủ Host1 (IP thật 10.0.0.1)
    VM2: IP ảo 192.168.1.20, MAC=AA:BB:CC:01:00:02, trên máy chủ Host2 (IP thật 10.0.0.2)
  VNI của khách hàng A = 5001.

VM1 ping VM2:
1. VM1 tạo frame Ethernet: src=AA:BB:CC:01:00:01, dst=AA:BB:CC:01:00:02, payload=IP 192.168.1.10→192.168.1.20

2. VTEP trên Host1 bắt frame, biết VM2 nằm ở Host2 (qua control plane VXLAN), đóng gói:
   [ Outer Eth: src=Host1_MAC, dst=Host2_MAC ]
   [ Outer IP:  src=10.0.0.1,  dst=10.0.0.2  ]
   [ UDP:       src_port=12345, dst_port=4789  ]
   [ VXLAN:     VNI=5001                       ]
   [ Inner Eth: src=AA:BB:CC:01:00:01, dst=AA:BB:CC:01:00:02 ]
   [ Inner IP:  192.168.1.10 → 192.168.1.20   ]

3. Gói này đi qua mạng IP thật (underlay) từ 10.0.0.1 đến 10.0.0.2.
   Router underlay chỉ thấy gói UDP thông thường — không biết gì về VXLAN.

4. VTEP trên Host2 nhận, mở gói, lấy inner frame, giao cho VM2.
   VM2 nhận frame như thể VM1 cùng switch L2 local.
\`\`\`

❓ **Câu hỏi tự nhiên**:

**"Overhead thêm bao nhiêu byte?"**
→ Header VXLAN = Outer Ethernet (14B) + Outer IP (20B) + UDP (8B) + VXLAN header (8B) = **50 byte** overhead so với frame gốc. MTU vật lý phải ≥ 1550B để tránh phân mảnh (thường cấu hình Jumbo Frame 9000B trong data center).

**"VXLAN khác GRE tunnel như thế nào?"**
→ GRE cũng là tunneling nhưng đóng gói trong IP (không UDP) → không phân chia load qua nhiều đường (ECMP) dựa trên port như UDP được. VXLAN dùng UDP src port băm từ flow → ECMP phân tải tốt hơn trong data center.

**"Làm sao VTEP biết VM2 nằm ở Host2?"**
→ Control plane VXLAN (EVPN-BGP hoặc multicast hoặc flood-and-learn). Đây là chủ đề chuyên sâu hơn, sẽ gặp lại ở [Lesson 06 — Mạng đám mây](../lesson-06-cloud-networking/).

📝 **Tóm tắt mục 4**:
- Overlay = mạng ảo xây trên underlay (mạng vật lý) qua tunneling.
- VXLAN đóng gói frame L2 trong UDP/IP, dùng VNI 24 bit → 16 triệu mạng ảo (vượt xa giới hạn 4094 của VLAN).
- VTEP = điểm đầu/cuối đường hầm, thường là phần mềm trên hypervisor.
- Overhead: 50 byte header bổ sung; cần Jumbo Frame hoặc MTU ≥ 1550B.

---

## 5. NFV — Network Function Virtualization

### 5.1. Từ phần cứng chuyên dụng sang phần mềm

💡 **Hình dung**: Trước kia, bạn cần một chiếc máy fax, một máy in, một máy photocopy riêng cho từng chức năng. Nay một chiếc máy đa năng (MFP) chạy phần mềm làm cả ba việc đó. NFV làm điều tương tự với thiết bị mạng.

**Truyền thống**: mỗi chức năng mạng = một thiết bị phần cứng chuyên dụng:
- Firewall → Cisco ASA, Palo Alto Networks (hộp vật lý)
- Load balancer → F5 BIG-IP (hộp vật lý, giá hàng chục nghìn USD)
- Router → Cisco 7609 (hộp vật lý)
- IDS/IPS → Snort box

**NFV**: chạy các chức năng này như **phần mềm trên máy chủ thông thường (commodity server)**:
- Virtual Firewall (vFirewall): pfSense, Fortinet FortiGate VM
- Virtual Router (vRouter): Cisco CSR 1000v, VyOS
- Virtual Load Balancer: HAProxy, NGINX chạy trong VM/container
- Virtual IDS/IPS: Suricata trong VM

### 5.2. Lợi ích và hạn chế NFV

| Lợi ích | Hạn chế |
|---------|---------|
| Triển khai nhanh: spin up VM trong phút | Hiệu năng thường thấp hơn phần cứng chuyên dụng (do overhead ảo hóa) |
| Linh hoạt: scale up/down theo nhu cầu | Yêu cầu kỹ năng quản lý VM/container |
| Giảm chi phí phần cứng | Phụ thuộc vào hạ tầng server và hypervisor |
| Cùng phần cứng chạy nhiều chức năng | Bảo mật cần chú ý thêm (nhiều lớp) |
| Dễ test, backup, di chuyển | — |

### 5.3. NFV + SDN = cơ sở hạ tầng mạng hiện đại

Trong data center và 5G core network, NFV và SDN thường kết hợp:
- **SDN**: điều khiển cách gói tin đi qua mạng (routing, switching).
- **NFV**: các chức năng xử lý gói tin (firewall, LB, NAT) chạy như phần mềm.
- Cả hai đều được quản lý qua phần mềm trung tâm → **infrastructure as code** (hạ tầng như mã).

Ví dụ: mạng 5G sử dụng NFV để chạy core network functions (AMF, SMF, UPF) như container Kubernetes — co giãn theo tải thực tế.

📝 **Tóm tắt mục 5**:
- NFV = chức năng mạng chạy như phần mềm trên server thông thường.
- Thay thế phần cứng chuyên dụng đắt tiền, tăng linh hoạt và tốc độ triển khai.
- Kết hợp SDN + NFV → nền tảng mạng hoàn toàn lập trình được, thường thấy trong data center và 5G.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **SDN (mạng định nghĩa bằng phần mềm) là vì sao cloud cho bạn tạo network bằng API/code trong vài giây. Đây là nền của "network as code".**

| Khái niệm SDN | Hiện ra ở đâu |
|---------------|---------------|
| **Tách control plane / data plane** | Cấu hình mạng tập trung bằng phần mềm, không sửa từng switch |
| **Network virtualization** | VPC, overlay network (VXLAN) trong cloud/K8s |
| **Programmable network** | Tạo subnet/route/firewall bằng API (Terraform) |
| **Network as code** | Hạ tầng mạng versioned trong git ([nối IaC](../../../Programming/lesson-78-config-management/)) |

### 6.1. Ví dụ cụ thể — VPC là SDN bạn dùng mỗi ngày

Tạo một VPC trên AWS: vài giây có cả một mạng ảo (subnet, route table, gateway, firewall) — không cắm dây, không mua switch. Đó là **SDN**: mạng định nghĩa bằng phần mềm, điều khiển qua API. Bạn \`terraform apply\` → hạ tầng mạng dựng lên từ code, versioned, tái lập được. K8s đi xa hơn: mỗi pod có IP trong **overlay network** (CNI plugin tạo mạng ảo trên mạng vật lý) — service-to-service routing hoàn toàn bằng phần mềm. Hiểu SDN giải thích vì sao "mạng cloud" linh hoạt vậy, và là nền của infrastructure-as-code.

> ❓ **"Dev app có cần biết SDN không?"** Biết khái niệm đủ để: (1) hiểu **VPC/subnet/security group** là tài nguyên tạo bằng code (Terraform/CloudFormation) chứ không phải phần cứng → review/version được; (2) debug overlay network K8s (vì sao pod IP đổi, [MTU overlay](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/)); (3) hiểu "network policy" K8s = firewall định nghĩa bằng YAML. Không cần cài SDN controller, nhưng hiểu "mạng giờ là phần mềm" giúp làm việc với cloud/K8s đúng cách.

### 6.2. 📝 Tóm tắt mục 6

- SDN = mạng định nghĩa bằng phần mềm (tách control/data plane) → cloud cho tạo network qua **API/code** trong giây.
- **VPC** + overlay K8s = SDN bạn dùng hằng ngày; \`terraform apply\` dựng mạng từ code (network as code, versioned).
- Dev biết khái niệm để: review network bằng code, debug overlay K8s, hiểu network policy YAML.

## 7. Bài tập

**Bài 1 — Phân biệt control plane và data plane**:

Liệt kê các hoạt động sau và phân loại vào control plane hay data plane:
(a) Router chạy OSPF, tính toán shortest path đến 10.0.5.0/24.
(b) Switch tra MAC table, chuyển frame ra port 7.
(c) OSPF hello packet được gửi giữa 2 router để duy trì adjacency.
(d) Gói tin IP được chuyển tiếp từ port ingress sang port egress dựa trên FIB (Forwarding Information Base).
(e) SDN controller nhận thông báo "link port 3 ↔ port 5 bị đứt", cập nhật flow rule cho toàn bộ switch.

**Bài 2 — Đọc flow table SDN**:

Một switch SDN có flow table sau:

| Priority | Match | Action |
|----------|-------|--------|
| 300 | \`src_ip=10.0.1.0/24, dst_ip=10.0.2.5\` | \`drop\` |
| 200 | \`dst_ip=10.0.2.5, dst_port=443\` | \`forward port 4\` |
| 100 | \`dst_ip=10.0.2.0/24\` | \`forward port 2\` |
| 0   | \`*\` | \`send_to_controller\` |

Gói tin nào sau đây bị drop? Chuyển ra port nào?
(a) \`src=10.0.1.5, dst=10.0.2.5, dst_port=443\`
(b) \`src=10.0.3.1, dst=10.0.2.5, dst_port=443\`
(c) \`src=10.0.3.1, dst=10.0.2.10, dst_port=80\`
(d) \`src=10.0.1.8, dst=10.0.2.8, dst_port=80\`

**Bài 3 — Gán VLAN cho cổng**:

Switch có 8 cổng. Yêu cầu:
- Phòng HR: máy A (port 1), máy B (port 3), máy C (port 5) — VLAN 10.
- Phòng IT: máy D (port 2), máy E (port 4) — VLAN 20.
- Kết nối lên router qua port 8 (cần trunk cả 2 VLAN).

(a) Liệt kê cấu hình port: loại (access/trunk) và VLAN cho từng port.
(b) Máy A gửi broadcast ARP. Các máy B, C, D, E nhận được không?
(c) Máy A cần nói chuyện với máy D (khác VLAN). Điều kiện cần để làm được điều này là gì?

**Bài 4 — Vì sao cần overlay**:

Công ty bạn có:
- Data center Hà Nội: 500 máy chủ, địa chỉ IP vật lý 172.16.0.0/16.
- Data center TP.HCM: 300 máy chủ, địa chỉ IP vật lý 172.17.0.0/16.
- Khách hàng cần 1 mạng ảo thống nhất 192.168.100.0/24 trải dài cả 2 DC.
- Yêu cầu cô lập hoàn toàn với khách hàng khác.

(a) Tại sao không thể dùng VLAN truyền thống cho yêu cầu này?
(b) VXLAN giải quyết vấn đề đó như thế nào? Mô tả ở mức khái niệm.
(c) VNI của khách hàng này được chọn là 7001. Frame từ máy ảo 192.168.100.5 (ở Hà Nội) đến 192.168.100.20 (ở TP.HCM) đi qua mấy lớp header? Liệt kê.

**Bài 5 — So sánh SDN vs truyền thống trong tình huống thực tế**:

Bạn đang thiết kế mạng cho một data center mới với 5000 server và yêu cầu thay đổi chính sách routing thường xuyên (trung bình 50 lần/ngày, mỗi lần ảnh hưởng 100+ thiết bị). So sánh chi phí vận hành (không phải chi phí đầu tư) giữa kiến trúc truyền thống và SDN trong bối cảnh này.

---

## Lời giải chi tiết

### Bài 1

**(a) Control plane** — chạy giao thức OSPF, tính toán SPF (Dijkstra), cập nhật routing table. Đây là "trí tuệ" của router.

**(b) Data plane** — tra MAC table (đã được tính sẵn bởi control plane), chuyển tiếp ngay ở tốc độ phần cứng. Không cần quyết định gì mới.

**(c) Control plane** — OSPF hello packet là thông tin điều khiển để duy trì topology database. Không mang data người dùng.

**(d) Data plane** — FIB (Forwarding Information Base) là bảng đã được control plane tính sẵn và nạp vào phần cứng. Việc tra FIB và forward là hành động data plane.

**(e) Control plane** — SDN controller xử lý sự kiện topology, tính lại đường đi, và cài flow rule mới. Đây là quyết định điều khiển tập trung — quintessential control plane trong SDN.

### Bài 2

Tra flow table theo thứ tự priority cao → thấp, dừng ở rule đầu tiên khớp.

**(a) \`src=10.0.1.5, dst=10.0.2.5, dst_port=443\`**:
- Kiểm tra Priority 300: src_ip=10.0.1.5 ∈ 10.0.1.0/24 ✓ VÀ dst_ip=10.0.2.5 ✓ → **KHỚP** → \`drop\`.
- Kết quả: **bị DROP**.

**(b) \`src=10.0.3.1, dst=10.0.2.5, dst_port=443\`**:
- Priority 300: src_ip=10.0.3.1 ∉ 10.0.1.0/24 → không khớp.
- Priority 200: dst_ip=10.0.2.5 ✓ VÀ dst_port=443 ✓ → **KHỚP** → \`forward port 4\`.
- Kết quả: **chuyển ra port 4**.

**(c) \`src=10.0.3.1, dst=10.0.2.10, dst_port=80\`**:
- Priority 300: src_ip=10.0.3.1 ∉ 10.0.1.0/24 → không khớp.
- Priority 200: dst_ip=10.0.2.10 ≠ 10.0.2.5 → không khớp.
- Priority 100: dst_ip=10.0.2.10 ∈ 10.0.2.0/24 ✓ → **KHỚP** → \`forward port 2\`.
- Kết quả: **chuyển ra port 2**.

**(d) \`src=10.0.1.8, dst=10.0.2.8, dst_port=80\`**:
- Priority 300: src_ip=10.0.1.8 ∈ 10.0.1.0/24 ✓ VÀ dst_ip=10.0.2.8 ≠ 10.0.2.5 → không khớp (điều kiện AND, cần cả 2).
- Priority 200: dst_ip=10.0.2.8 ≠ 10.0.2.5 → không khớp.
- Priority 100: dst_ip=10.0.2.8 ∈ 10.0.2.0/24 ✓ → **KHỚP** → \`forward port 2\`.
- Kết quả: **chuyển ra port 2**.

### Bài 3

**(a) Cấu hình port**:

| Port | Loại | VLAN | Thiết bị |
|------|------|------|----------|
| 1 | Access | VLAN 10 | Máy A (HR) |
| 2 | Access | VLAN 20 | Máy D (IT) |
| 3 | Access | VLAN 10 | Máy B (HR) |
| 4 | Access | VLAN 20 | Máy E (IT) |
| 5 | Access | VLAN 10 | Máy C (HR) |
| 6 | Không dùng | — | — |
| 7 | Không dùng | — | — |
| 8 | Trunk | VLAN 10, 20 | Router |

**(b)** Máy A gửi ARP broadcast:
- Máy B (port 3, VLAN 10): **Nhận được** — cùng VLAN 10.
- Máy C (port 5, VLAN 10): **Nhận được** — cùng VLAN 10.
- Máy D (port 2, VLAN 20): **Không nhận được** — khác VLAN.
- Máy E (port 4, VLAN 20): **Không nhận được** — khác VLAN.

**(c)** Máy A (VLAN 10) nói chuyện với máy D (VLAN 20): cần **inter-VLAN routing**. Router (kết nối qua trunk port 8) phải có 2 subinterface (hoặc 2 interface logic) — một cho VLAN 10 (10.0.10.1/24) và một cho VLAN 20 (10.0.20.1/24). Gói từ A đi lên router, router định tuyến sang VLAN 20, đưa xuống D. Đây là kiến trúc "router-on-a-stick".

### Bài 4

**(a)** VLAN truyền thống không dùng được vì:
1. VLAN ID chỉ có 12 bit → tối đa 4094 VLAN → không đủ nếu nhiều tenant.
2. VLAN hoạt động ở L2 — không thể stretch qua mạng IP L3 giữa Hà Nội và TP.HCM. Hai DC kết nối qua WAN/IP, không phải Ethernet trực tiếp.
3. VLAN không tự đóng gói để đi qua mạng IP — cần thêm cơ chế tunneling.

**(b)** VXLAN giải quyết:
1. VNI 24 bit → 16 triệu mạng ảo — đủ cho nhiều tenant.
2. VTEP tại mỗi DC đóng gói frame L2 ảo (192.168.100.x) vào UDP/IP — frame này đi qua mạng IP WAN bình thường.
3. Với tunnel VXLAN, VM ở Hà Nội và TP.HCM thấy nhau như cùng mạng L2 dù thực tế cách nhau hàng trăm km.

**(c)** Frame từ 192.168.100.5 (Hà Nội) đến 192.168.100.20 (TP.HCM) qua VXLAN có **4 lớp header**:

1. **Outer Ethernet Header**: MAC của VTEP Hà Nội → MAC của next-hop router/switch underlay.
2. **Outer IP Header**: src=172.16.x.x (IP vật lý VTEP Hà Nội), dst=172.17.x.x (IP vật lý VTEP TP.HCM).
3. **UDP Header**: dst_port=4789 (VXLAN). Tổng 3 header trên = 14+20+8 = 42 byte.
4. **VXLAN Header (8 byte)**: VNI=7001.
5. **Inner Ethernet Frame**: src MAC của VM 192.168.100.5, dst MAC của VM 192.168.100.20.
6. **Inner IP**: 192.168.100.5 → 192.168.100.20.

(Cộng thêm inner payload — 6 lớp nếu đếm cả Inner Ethernet và Inner IP riêng.)

### Bài 5

**Mạng truyền thống**:
- 50 thay đổi/ngày × 100 thiết bị/thay đổi = 5000 lần can thiệp thủ công/ngày.
- Mỗi lần: SSH, gõ lệnh, verify = giả sử 5 phút → 25,000 phút/ngày ≈ 417 giờ/ngày → cần 52+ kỹ sư mạng làm việc 8h/ngày chỉ cho task này (không tính các công việc khác).
- Lỗi người dùng rất cao khi làm thủ công ở quy mô này.

**SDN**:
- 50 thay đổi/ngày được thực hiện qua API đến SDN controller: controller tự đẩy flow rule xuống 100+ switch trong vài giây.
- Thời gian per-thay đổi: < 10 giây (gọi API + controller xử lý + flow rule được cài).
- 50 thay đổi × 10 giây = 500 giây ≈ 8 phút/ngày thay vì 417 giờ/ngày.
- Chi phí vận hành: cần 1–2 kỹ sư lập trình automation thay vì 50+ kỹ sư mạng.
- Ưu điểm thêm: có thể tự động hóa qua CI/CD pipeline, giảm lỗi người dùng.

**Kết luận**: ở quy mô 5000 server với 50 thay đổi/ngày, SDN giảm chi phí vận hành đáng kể. Đây chính là lý do Google, Facebook, Amazon chuyển sang SDN cho data center của họ.

---

## Liên kết và bài tiếp theo

- **Tiền đề**:
  - [Lesson 04 — Định tuyến](../../01-Foundations-LowerLayers/lesson-04-routing/) — hiểu routing table và forwarding trước khi học SDN.
  - [Lesson 02 — Ethernet & Link Layer](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/) — frame Ethernet và MAC address là nền tảng của VLAN.
- **Liên quan**:
  - [Lesson 04 — QoS & Quản lý lưu lượng](../lesson-04-qos/) — PCP field trong VLAN tag 802.1Q dùng cho QoS.
- **Tiếp theo**: [Lesson 06 — Mạng đám mây](../lesson-06-cloud-networking/) — VXLAN và overlay network được ứng dụng sâu trong hạ tầng cloud; EVPN-BGP làm control plane cho VXLAN.
- **Visualization**: [visualization.html](./visualization.html) — mô phỏng SDN flow table, VLAN broadcast domain, và VXLAN encapsulation tương tác.

---

## 📝 Tổng kết Lesson 05

1. **Mạng truyền thống**: control plane và data plane cùng trong thiết bị → khó quản lý tập trung khi quy mô lớn (>100 thiết bị).
2. **SDN**: tách control plane ra controller tập trung; switch chỉ tra flow table (Match → Action). Lợi ích: lập trình được, quản lý qua API, phản ứng nhanh. Nhược: controller là SPOF, cần HA.
3. **VLAN (802.1Q)**: chia 1 switch thành nhiều broadcast domain logic; VID 12 bit (4094 VLAN max); access port cho đầu cuối, trunk port cho liên switch. Frame chỉ đi trong cùng VLAN; liên VLAN cần router.
4. **VXLAN**: overlay đóng gói frame L2 trong UDP/IP; VNI 24 bit (16 triệu mạng ảo); giải quyết giới hạn 4094 VLAN và cho phép L2 overlay qua mạng L3. Overhead 50 byte.
5. **NFV**: chức năng mạng chạy như phần mềm; kết hợp với SDN tạo nên hạ tầng mạng hoàn toàn lập trình được trong data center hiện đại.
`;
