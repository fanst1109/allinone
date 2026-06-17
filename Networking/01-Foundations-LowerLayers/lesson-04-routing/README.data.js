// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/01-Foundations-LowerLayers/lesson-04-routing/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Định tuyến (Routing)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **vấn đề định tuyến**: gói tin phải vượt qua nhiều mạng để đến đích — ai quyết định đường đi?
- Phân biệt **router** (tầng Network/IP, nối các mạng khác nhau) với **switch** (tầng Link, chuyển tiếp trong cùng mạng LAN).
- Đọc và hiểu **bảng định tuyến (routing table)**: cấu trúc, các trường, cách tra.
- Thực hiện **longest-prefix match** bằng tay cho ít nhất 3 trường hợp.
- Phân biệt **định tuyến tĩnh** và **động** (RIP, OSPF, BGP).
- Theo dõi một gói tin qua 2–3 router: biết MAC thay đổi mỗi hop, IP đích giữ nguyên từ đầu đến cuối.

## Kiến thức tiền đề

- [Lesson 02 — Link Layer & Ethernet](../lesson-02-link-ethernet/): frame Ethernet, địa chỉ MAC, switch.
- [Lesson 03 — Địa chỉ IP & Subnetting](../lesson-03-ip-subnetting/): CIDR, subnet mask, prefix, dải địa chỉ mạng.

---

## 1. Vấn đề định tuyến

### 1.1. Bài toán đặt ra

💡 **Trực giác — Analogy bưu cục:**
Bạn ở Hà Nội gửi thư cho người ở TP.HCM. Bưu cục Hà Nội không trực tiếp chuyển thư đến tay người nhận — họ **chuyển tiếp** thư đến bưu cục Đà Nẵng, bưu cục Đà Nẵng lại chuyển vào Nam, cuối cùng bưu cục địa phương mang đến nhà. Mỗi bưu cục chỉ biết "gói này nên đi về hướng nào tiếp theo", không cần biết toàn bộ hành trình.

**Định tuyến (routing)** trong mạng máy tính hoạt động y hệt: mỗi **router** là một "bưu cục" — nhận gói tin (packet), tra cứu địa chỉ IP đích, rồi chuyển tiếp ra cổng (interface) thích hợp để gói tin đến gần đích hơn.

**Vì sao cần định tuyến?** Vì Internet là một mạng của các mạng (network of networks). Không có thiết bị nào biết địa chỉ của tất cả các máy trên thế giới — nhưng mỗi router biết đủ để đưa gói tin đến "gần" đích hơn, từng bước một.

### 1.2. Hai câu hỏi cốt lõi

| Câu hỏi | Giải quyết bởi |
|---------|---------------|
| **Bảng định tuyến chứa gì?** — tra cứu IP đích → đi cổng nào | Mục 3 (routing table + longest-prefix match) |
| **Bảng định tuyến được xây từ đâu?** — ai thêm các dòng vào bảng | Mục 4 (static vs dynamic routing) |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Switch cũng chuyển tiếp dữ liệu — khác gì router?"* — Xem mục 2 ngay bên dưới.
- *"Mỗi router phải biết mọi địa chỉ IP trên Internet?"* — Không. Router chỉ biết các prefix (dải mạng), không cần biết từng host riêng lẻ. Tổng số prefix trên toàn Internet ~900,000 dòng (tính đến 2024), không phải hàng tỷ địa chỉ IP.
- *"Nếu router không biết đường đến đích?"* — Gửi ra **default route** (0.0.0.0/0) — tuyến "nếu không biết thì đi cổng này". Mục 3.4 giải thích.

📝 **Tóm tắt mục 1:**
- Định tuyến = quyết định "gói tin đi cổng nào tiếp theo" tại mỗi router.
- Mỗi router chỉ biết "bước tiếp theo" (next hop), không cần biết toàn bộ đường.
- Internet là tập hợp hàng trăm nghìn mạng con — định tuyến kết nối chúng lại.

---

## 2. Router vs Switch — Default Gateway

### 2.1. Switch (tầng 2 — Link Layer)

Switch hoạt động ở **tầng 2 (Data Link)**. Nó nhìn vào **địa chỉ MAC** trong frame Ethernet để quyết định chuyển ra cổng nào.

- Phạm vi: **trong cùng một mạng LAN** (cùng subnet).
- Không đọc địa chỉ IP.
- Ví dụ: máy 192.168.1.10 gửi frame đến máy 192.168.1.20 — switch chuyển trực tiếp dựa vào MAC, không cần router.

### 2.2. Router (tầng 3 — Network Layer)

Router hoạt động ở **tầng 3 (Network)**. Nó đọc **địa chỉ IP đích** trong IP header để quyết định chuyển tiếp.

- Phạm vi: **nối các mạng khác nhau** (khác subnet).
- Khi chuyển tiếp, router nhận frame từ cổng này, bóc bỏ frame cũ, đóng gói lại frame mới (MAC nguồn = MAC cổng router, MAC đích = MAC hop tiếp theo), rồi gửi ra cổng kia.
- IP đích trong IP header **không thay đổi** qua các hop; chỉ MAC thay đổi.

| Tiêu chí | Switch | Router |
|----------|--------|--------|
| Tầng OSI | 2 (Data Link) | 3 (Network) |
| Địa chỉ dùng | MAC | IP |
| Phạm vi | Trong một subnet | Giữa các subnet/mạng |
| Xây bảng | MAC address table (học tự động) | Routing table (static/dynamic) |

### 2.3. Default Gateway

💡 **Trực giác:** Khi bạn muốn gửi thư ra nước ngoài, bạn không tự mang ra biên giới — bạn bỏ vào hòm thư, bưu điện địa phương lo phần còn lại. **Default gateway** chính là "bưu điện địa phương" của một máy tính: là địa chỉ IP của router nằm trong cùng subnet, mà máy tính sẽ gửi mọi gói tin đến đích nằm ngoài subnet của mình.

**Ví dụ cụ thể:**
- Máy host A có IP: \`192.168.1.10/24\`.
- Default gateway: \`192.168.1.1\` (địa chỉ cổng LAN của router).
- Khi A muốn gửi đến \`8.8.8.8\` (ngoài subnet \`192.168.1.0/24\`), A gửi frame đến MAC của \`192.168.1.1\`.
- Router nhận, tra bảng định tuyến, chuyển tiếp tiếp theo.

⚠ **Lỗi thường gặp:** Nhiều người nhầm "default gateway là địa chỉ của DNS server". Không. Default gateway là địa chỉ IP của **router** trong mạng LAN của bạn. DNS server (thường là \`8.8.8.8\` hoặc \`1.1.1.1\`) là một dịch vụ trên Internet, hoàn toàn khác.

🔁 **Dừng lại tự kiểm tra:**

Máy \`10.0.0.5/24\` muốn gửi đến \`10.0.0.7\`. Nó có cần qua router không?

<details>
<summary>Đáp án</summary>
Không. Cả hai đều nằm trong subnet \`10.0.0.0/24\` — switch trong mạng LAN chuyển trực tiếp dựa vào MAC. Router không tham gia.
</details>

📝 **Tóm tắt mục 2:**
- Switch: tầng 2, dùng MAC, trong một subnet.
- Router: tầng 3, dùng IP, giữa các subnet.
- Default gateway: router trong mạng LAN của host — ngưỡng cửa ra Internet.
- Khi chuyển tiếp: IP đích giữ nguyên, MAC đổi tại mỗi hop.

---

## 3. Bảng định tuyến (Routing Table) & Longest-Prefix Match

### 3.1. Cấu trúc bảng định tuyến

Mỗi router lưu một **bảng định tuyến (routing table)** — danh sách các dòng, mỗi dòng ánh xạ một dải địa chỉ (prefix) đến "bước tiếp theo" (next hop) hoặc cổng ra (interface).

Các trường chính của một dòng trong bảng:

| Trường | Ý nghĩa |
|--------|---------|
| **Destination** | Prefix dải mạng đích, vd \`10.1.2.0/24\` |
| **Next Hop** | Địa chỉ IP của router tiếp theo cần gửi đến; hoặc \`direct\` nếu mạng kết nối trực tiếp |
| **Interface** | Cổng mạng vật lý/logic để gửi ra, vd \`eth0\`, \`eth1\` |
| **Metric** | Số đo chi phí/ưu tiên (hop count, bandwidth…). Metric nhỏ hơn → ưu tiên hơn |

**Ví dụ bảng định tuyến của router R1:**

\`\`\`
Destination      Next Hop       Interface   Metric
10.1.0.0/16      direct         eth0        0
10.2.0.0/24      10.1.0.2       eth0        1
10.3.0.0/24      10.1.0.3       eth0        1
192.168.5.0/24   10.1.0.2       eth0        2
172.16.0.0/12    10.1.0.3       eth0        3
0.0.0.0/0        203.0.113.1    eth1        10
\`\`\`

### 3.2. Longest-Prefix Match — Quy tắc vàng

Khi router nhận gói tin với IP đích, nó tra bảng định tuyến và chọn **dòng có prefix dài nhất (cụ thể nhất) khớp với IP đích**. Đây gọi là **longest-prefix match**.

💡 **Trực giác:** Giống như tìm địa chỉ bưu chính — nếu có cả "Việt Nam" lẫn "Hà Nội, Việt Nam" trong danh sách, thư đến Hà Nội được xếp vào mục "Hà Nội, Việt Nam" vì cụ thể hơn.

**Quy tắc:** prefix dài hơn (số bit /N lớn hơn) = cụ thể hơn = được ưu tiên chọn.

### 3.3. Walk-through — 3 ví dụ chọn route

Dùng bảng định tuyến R1 ở trên.

---

**Ví dụ A — IP đích: \`10.2.0.50\`**

So khớp từng dòng:

| Dòng | Prefix | Khớp? | Độ dài prefix |
|------|--------|-------|--------------|
| \`10.1.0.0/16\` | Mạng 10.1.0.0–10.1.255.255 | \`10.2.0.50\` nằm ngoài → **Không** | — |
| \`10.2.0.0/24\` | Mạng 10.2.0.0–10.2.0.255 | \`10.2.0.50\` nằm trong → **Khớp** | /24 |
| \`172.16.0.0/12\` | Không khớp | — | — |
| \`0.0.0.0/0\` | Khớp tất cả → **Khớp** | /0 |

Hai dòng khớp: \`/24\` và \`/0\`. Chọn \`/24\` (dài hơn).

**Kết quả:** chuyển tiếp đến next hop \`10.1.0.2\` qua cổng \`eth0\`.

---

**Ví dụ B — IP đích: \`172.20.5.100\`**

| Dòng | Prefix | Khớp? | Độ dài |
|------|--------|-------|--------|
| \`10.1.0.0/16\` | Không | — | — |
| \`10.2.0.0/24\` | Không | — | — |
| \`10.3.0.0/24\` | Không | — | — |
| \`192.168.5.0/24\` | Không | — | — |
| \`172.16.0.0/12\` | Mạng 172.16.0.0–172.31.255.255. \`172.20.5.100\` nằm trong → **Khớp** | /12 |
| \`0.0.0.0/0\` | Khớp tất cả → **Khớp** | /0 |

Hai dòng khớp: \`/12\` và \`/0\`. Chọn \`/12\`.

**Kết quả:** next hop \`10.1.0.3\`, cổng \`eth0\`.

---

**Ví dụ C — IP đích: \`8.8.8.8\`**

| Dòng | Khớp? |
|------|-------|
| \`10.1.0.0/16\` | Không |
| \`10.2.0.0/24\` | Không |
| \`10.3.0.0/24\` | Không |
| \`192.168.5.0/24\` | Không |
| \`172.16.0.0/12\` | Không |
| \`0.0.0.0/0\` | **Khớp** (default route) |

Chỉ một dòng khớp: \`0.0.0.0/0\`.

**Kết quả:** next hop \`203.0.113.1\` qua cổng \`eth1\` — gói được đẩy lên Internet.

---

⚠ **Lỗi thường gặp — Nhầm "khớp đầu tiên" với "khớp dài nhất":** Một số người nghĩ router chọn dòng *đầu tiên* trong bảng khớp (như firewall rule). Sai. Router IP luôn chọn dòng *cụ thể nhất* (prefix dài nhất). Thứ tự dòng trong bảng không quan trọng — độ dài prefix mới quan trọng.

### 3.4. Default Route (0.0.0.0/0)

Default route với prefix \`/0\` khớp với **mọi địa chỉ IP**. Nhưng vì \`/0\` ngắn nhất có thể, nó chỉ được chọn khi **không có prefix nào cụ thể hơn** khớp. Đây là "lối thoát cuối cùng" — gọi là **default gateway** ở cấp router.

Trên router biên (edge router) của một tổ chức, thường có dòng:
\`\`\`
0.0.0.0/0   <IP_của_ISP>   eth_WAN   1
\`\`\`
Mọi gói tin đến đích Internet không nằm trong mạng nội bộ sẽ được đẩy sang ISP.

🔁 **Dừng lại tự kiểm tra:**

Bảng định tuyến có các dòng sau. IP đích \`10.10.10.5\` sẽ dùng dòng nào?

\`\`\`
10.0.0.0/8       next-hop A
10.10.0.0/16     next-hop B
10.10.10.0/24    next-hop C
0.0.0.0/0        next-hop D
\`\`\`

<details>
<summary>Đáp án</summary>
Cả 4 dòng đều khớp với \`10.10.10.5\`. Chọn dòng có prefix dài nhất: \`10.10.10.0/24\` (next-hop C) — cụ thể nhất.
</details>

📝 **Tóm tắt mục 3:**
- Mỗi dòng bảng định tuyến: Destination prefix → Next Hop / Interface / Metric.
- **Longest-prefix match**: luôn chọn dòng khớp có /N lớn nhất.
- \`0.0.0.0/0\` = default route — phương án dự phòng cuối cùng.
- Metric phân định thắng-thua khi hai dòng có cùng prefix và cùng nguồn gốc.

---

## 4. Định tuyến tĩnh vs Động — Các giao thức

### 4.1. Định tuyến tĩnh (Static Routing)

Người quản trị **tự tay** thêm từng dòng vào bảng định tuyến. Router không tự học đường.

**Ưu điểm:**
- Đơn giản, dự đoán được, không tốn CPU để trao đổi giao thức.
- Phù hợp với mạng nhỏ, ổn định.

**Nhược điểm:**
- Không tự động phục hồi khi đứt đường — phải tự sửa tay.
- Không phù hợp với mạng lớn (hàng trăm router).

Ví dụ lệnh trên Linux/router:
\`\`\`bash
ip route add 10.2.0.0/24 via 10.1.0.2 dev eth0
\`\`\`

### 4.2. Định tuyến động (Dynamic Routing)

Router **tự động trao đổi thông tin đường đi** với các router hàng xóm (neighbor) và xây dựng/cập nhật bảng định tuyến mà không cần can thiệp thủ công.

Hai trường phái lớn:

#### Distance-Vector (vd RIP)

💡 **Trực giác:** Mỗi router nói với hàng xóm: *"Tao đến được mạng X với chi phí N."* Hàng xóm cộng thêm 1 (một hop nữa) rồi quảng bá tiếp. Không router nào nhìn thấy toàn bộ topo — chỉ biết "khoảng cách theo hướng nào".

- **RIP (Routing Information Protocol)**: metric là **hop count** (số router phải qua). Tối đa 15 hop — mạng lớn hơn coi là "vô tận". Cập nhật định kỳ mỗi 30 giây. Hội tụ chậm (vài phút khi cắt đường).
- Ví dụ: Router A biết đến mạng X qua 2 hop → quảng bá cho B "X = 2". B nhận được, thêm 1 → B biết X qua 3 hop qua A.

#### Link-State (vd OSPF)

💡 **Trực giác:** Mỗi router **quảng bá toàn bộ danh sách hàng xóm và chi phí kết nối** (gọi là LSA — Link State Advertisement) đến tất cả router trong cùng vùng. Mỗi router có **bản đồ đầy đủ** của mạng và tự tính đường ngắn nhất (thuật toán Dijkstra).

- **OSPF (Open Shortest Path First)**: metric là **cost** (thường tỷ lệ nghịch bandwidth: $\\text{cost} = \\frac{10^8}{BW}$, với $BW$ tính bằng bps). Hội tụ nhanh (vài giây). Được dùng rộng rãi trong mạng doanh nghiệp và ISP.
- Ví dụ: Đường 1 Gbps có cost $= \\frac{10^8}{10^9} = 0.1$ (làm tròn = 1). Đường 10 Mbps có cost $= \\frac{10^8}{10^7} = 10$. OSPF ưu tiên đường nhanh hơn.

| Tiêu chí | Distance-Vector (RIP) | Link-State (OSPF) |
|----------|----------------------|-------------------|
| Thông tin trao đổi | Bảng định tuyến (vector khoảng cách) | Trạng thái kết nối (LSA) |
| Topo nhìn thấy | Chỉ từ hàng xóm | Toàn bộ vùng |
| Thuật toán | Bellman-Ford | Dijkstra |
| Hội tụ | Chậm (phút) | Nhanh (giây) |
| Metric | Hop count | Cost (bandwidth) |
| Quy mô | Mạng nhỏ (≤15 hop) | Mạng doanh nghiệp, ISP |

#### BGP — Giữa các Autonomous System

**BGP (Border Gateway Protocol)** là giao thức giúp các **Autonomous System (AS)** trao đổi thông tin định tuyến với nhau. Một AS là một tổ chức lớn (ISP, công ty, trường đại học) quản lý một dải IP và tự quyết định chính sách định tuyến bên trong.

💡 **Trực giác:** OSPF là "nội bộ công ty", BGP là "ngoại giao giữa các quốc gia". BGP không chỉ quan tâm đến đường ngắn nhất — nó còn quan tâm đến **chính sách kinh doanh**: "Tôi muốn gửi qua ISP A, không qua ISP B (vì đắt hơn)."

- BGP kết nối hàng trăm nghìn AS tạo thành Internet.
- Metric phức tạp (AS-path length, local preference, MED…), không chỉ là hop count.
- BGP là giao thức "giữ Internet chạy" — lỗi BGP gây ra các sự cố Internet diện rộng.

### 4.3. Khái niệm Hop, Metric, TTL

**Hop**: mỗi lần gói tin đi qua một router = 1 hop.

**Metric**: số đo chi phí của một tuyến đường. Metric nhỏ hơn = tuyến tốt hơn. Mỗi giao thức dùng metric khác nhau (hop count cho RIP, cost cho OSPF).

**TTL (Time To Live)**: trường trong IP header, bắt đầu từ một giá trị (thường 64 hoặc 128). Mỗi router giảm TTL đi 1 khi chuyển tiếp. Khi TTL về 0, router bỏ gói và gửi thông báo ICMP "Time Exceeded" về nguồn — ngăn gói tin vòng mãi vô tận trong mạng khi có vòng định tuyến.

**Ví dụ TTL:** Host gửi gói TTL=64. Sau router R1: TTL=63. Sau R2: TTL=62. Sau R3: TTL=61. Đến đích với TTL=61. Nếu có 64 router trở lên mà gói chưa tới đích → TTL=0 → bị hủy.

Lệnh \`traceroute\` tận dụng TTL: gửi gói với TTL=1 (R1 trả ICMP), rồi TTL=2 (R2 trả ICMP), ... để "vẽ" đường đi từng hop.

📝 **Tóm tắt mục 4:**
- Static routing: cấu hình tay, đơn giản, không tự phục hồi.
- Distance-vector (RIP): trao đổi bảng định tuyến với hàng xóm, metric = hop count, hội tụ chậm.
- Link-state (OSPF): mỗi router có bản đồ đầy đủ, thuật toán Dijkstra, hội tụ nhanh.
- BGP: giữa các AS, điều hành chính sách Internet.
- TTL giảm 1 mỗi hop — bảo vệ chống vòng lặp vô tận.

---

## 5. Walk-through — Gói tin đi từ Host A đến Host B qua 2 router

### 5.1. Sơ đồ mạng

\`\`\`
[Host A]──────[Router R1]──────[Router R2]──────[Host B]
  .10              .1  .1          .1  .1            .20
  LAN-A              Link-AB         LAN-B
192.168.1.0/24    10.0.12.0/30    192.168.2.0/24
\`\`\`

Thông tin cụ thể:

| Thiết bị | Interface | Địa chỉ IP | Địa chỉ MAC (viết tắt) |
|----------|-----------|------------|------------------------|
| Host A | eth0 | 192.168.1.10/24 | MAC-A |
| R1 — cổng LAN | eth0 | 192.168.1.1/24 | MAC-R1-LAN |
| R1 — cổng WAN | eth1 | 10.0.12.1/30 | MAC-R1-WAN |
| R2 — cổng WAN | eth0 | 10.0.12.2/30 | MAC-R2-WAN |
| R2 — cổng LAN | eth1 | 192.168.2.1/24 | MAC-R2-LAN |
| Host B | eth0 | 192.168.2.20/24 | MAC-B |

Bảng định tuyến R1:
\`\`\`
192.168.1.0/24   direct         eth0
10.0.12.0/30     direct         eth1
192.168.2.0/24   10.0.12.2      eth1
0.0.0.0/0        <ISP>          eth1
\`\`\`

Bảng định tuyến R2:
\`\`\`
192.168.2.0/24   direct         eth1
10.0.12.0/30     direct         eth0
192.168.1.0/24   10.0.12.1      eth0
0.0.0.0/0        <ISP>          eth0
\`\`\`

### 5.2. Từng bước chuyển tiếp

**Mục tiêu:** Host A (\`192.168.1.10\`) gửi gói đến Host B (\`192.168.2.20\`).

---

**Bước 1 — Host A chuẩn bị gói tin:**

Host A nhận thấy IP đích \`192.168.2.20\` nằm ngoài subnet \`192.168.1.0/24\` của mình. A sẽ gửi đến default gateway = \`192.168.1.1\`.

A gửi ARP để tìm MAC của \`192.168.1.1\` → nhận được \`MAC-R1-LAN\`.

A gửi frame:
\`\`\`
Ethernet frame:
  MAC nguồn: MAC-A
  MAC đích:  MAC-R1-LAN

IP packet bên trong:
  IP nguồn:  192.168.1.10
  IP đích:   192.168.2.20
  TTL:       64
\`\`\`

---

**Bước 2 — R1 nhận và chuyển tiếp:**

R1 nhận frame, kiểm tra MAC đích = MAC-R1-LAN → đúng của mình → xử lý.

R1 bóc frame Ethernet, đọc IP header: IP đích = \`192.168.2.20\`, TTL = 64.

R1 tra bảng định tuyến:
- \`192.168.2.0/24\` khớp (và dài hơn \`0.0.0.0/0\`) → next hop \`10.0.12.2\`, cổng \`eth1\`.

R1 giảm TTL: 64 → **63**.

R1 gửi ARP để tìm MAC của \`10.0.12.2\` → nhận \`MAC-R2-WAN\`.

R1 gửi frame mới:
\`\`\`
Ethernet frame (MỚI):
  MAC nguồn: MAC-R1-WAN   ← đổi thành MAC cổng eth1 của R1
  MAC đích:  MAC-R2-WAN   ← MAC của R2

IP packet (KHÔNG ĐỔI):
  IP nguồn:  192.168.1.10
  IP đích:   192.168.2.20
  TTL:       63            ← giảm 1
\`\`\`

---

**Bước 3 — R2 nhận và chuyển tiếp:**

R2 nhận frame, kiểm tra MAC đích = MAC-R2-WAN → đúng của mình.

R2 đọc IP header: IP đích = \`192.168.2.20\`, TTL = 63.

R2 tra bảng định tuyến:
- \`192.168.2.0/24\` khớp → direct, cổng \`eth1\`.

R2 giảm TTL: 63 → **62**.

R2 gửi ARP để tìm MAC của \`192.168.2.20\` → nhận \`MAC-B\`.

R2 gửi frame mới:
\`\`\`
Ethernet frame (MỚI):
  MAC nguồn: MAC-R2-LAN   ← MAC cổng eth1 của R2
  MAC đích:  MAC-B         ← MAC của Host B

IP packet (KHÔNG ĐỔI):
  IP nguồn:  192.168.1.10
  IP đích:   192.168.2.20
  TTL:       62
\`\`\`

---

**Bước 4 — Host B nhận:**

B nhận frame, MAC đích = MAC-B → đúng của mình. Đọc IP: IP đích = \`192.168.2.20\` = mình. Xử lý payload.

### 5.3. Bảng tổng hợp — Thay đổi qua từng hop

| Hop | MAC nguồn | MAC đích | IP nguồn | IP đích | TTL |
|-----|-----------|----------|----------|---------|-----|
| A → R1 | MAC-A | MAC-R1-LAN | 192.168.1.10 | 192.168.2.20 | 64 |
| R1 → R2 | MAC-R1-WAN | MAC-R2-WAN | 192.168.1.10 | 192.168.2.20 | 63 |
| R2 → B | MAC-R2-LAN | MAC-B | 192.168.1.10 | 192.168.2.20 | 62 |

**Nhận xét quan trọng:**
- **IP nguồn và IP đích KHÔNG BAO GIỜ THAY ĐỔI** suốt hành trình (trừ khi có NAT — xem [Lesson 05](../lesson-05-arp-icmp-dhcp-nat/)).
- **MAC thay đổi tại mỗi hop** — MAC chỉ có ý nghĩa trong một đoạn link.
- TTL giảm 1 tại mỗi router.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Làm sao R1 biết MAC của 10.0.12.2 (R2)?"* — Dùng giao thức ARP (Address Resolution Protocol). R1 broadcast "Ai có IP 10.0.12.2?", R2 trả lời MAC của mình. Xem chi tiết [Lesson 05 — ARP](../lesson-05-arp-icmp-dhcp-nat/).
- *"Nếu có NAT, IP nguồn có thay đổi không?"* — Có. NAT (Network Address Translation) là cơ chế đặc biệt thay thế IP nguồn private bằng IP public. Xem [Lesson 05](../lesson-05-arp-icmp-dhcp-nat/).
- *"TTL 62 là có vấn đề gì không?"* — Không. TTL đủ cao để đến đích. Chỉ khi TTL về 0 mới có vấn đề.

📝 **Tóm tắt mục 5:**
- Tại mỗi hop: router bóc frame cũ, tra bảng, tạo frame mới với MAC mới, giảm TTL.
- IP nguồn/đích bất biến; MAC đổi từng đoạn link.
- ARP là cơ chế tìm MAC từ IP trong cùng một link.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **Routing là vì sao internet hoạt động (BGP) và là thứ bạn debug khi "máy A ping được B nhưng app không gọi được". \`ip route\`/\`traceroute\` là công cụ devops thật.**

| Khái niệm | Dùng thật ở đâu |
|-----------|-----------------|
| **Routing table / default gateway** | Debug "không ra internet", "không tới subnet khác" |
| **BGP** | Internet chạy nhờ nó; sự cố BGP = mất cả vùng (Facebook 2021 down) |
| **Static vs dynamic route** | VPC route table (AWS), VPN route, K8s pod routing |
| **traceroute** | Tìm hop nào chậm/drop trong đường đi |

### 6.1. Ví dụ cụ thể — debug "service không tới được"

App container không gọi được API ngoài. Kiểm tra theo tầng routing: (1) \`ip route\` — có default gateway không? (2) cùng subnet thì qua link, khác subnet phải qua gateway — gateway có route tới đích? (3) \`traceroute api.example.com\` — dừng ở hop nào? Thấy dừng ngay hop đầu = thiếu default route; dừng giữa chừng = route/firewall chặn. Đây là quy trình debug mạng chuẩn. Trên cloud: VPC **route table** quyết định subnet nào ra internet (qua Internet Gateway) hay không (private subnet qua NAT Gateway) — cấu hình sai route table = lỗi "private subnet không update được package".

> ❓ **"Sự cố BGP có thật sự lớn vậy?"** Có. 2021 Facebook/Instagram/WhatsApp **down toàn cầu ~6 giờ** vì rút nhầm route BGP → các DNS server của họ không quảng bá được → cả thế giới không tìm thấy Facebook. Cloudflare, các nhà mạng cũng từng gây mất internet vùng do cấu hình BGP sai. BGP là "bảng chỉ đường internet" — sai một dòng, mất cả mạng. Dev thường không động BGP, nhưng hiểu nó giải thích vì sao "internet sập" đôi khi không phải lỗi app.

### 6.2. 📝 Tóm tắt mục 6

- Routing dùng thật: debug "không tới được" (\`ip route\`/\`traceroute\`), VPC route table (public/private subnet), BGP (internet).
- Quy trình debug: kiểm default gateway → route tới đích → traceroute tìm hop chặn.
- **BGP** = bảng chỉ đường internet; cấu hình sai = mất mạng vùng/toàn cầu (Facebook 2021).

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Đọc bảng định tuyến.

Router có bảng:
\`\`\`
Destination       Next Hop        Interface
10.0.0.0/8        192.168.0.2     eth0
10.10.0.0/16      192.168.0.3     eth0
10.10.10.0/24     192.168.0.4     eth1
172.16.0.0/12     192.168.0.5     eth0
0.0.0.0/0         203.0.113.1     eth2
\`\`\`

IP đích: \`10.10.10.55\`. Router chọn dòng nào? Giải thích.

---

**Bài 2** — Chọn route khi nhiều dòng khớp.

Cùng bảng định tuyến trên. IP đích: \`10.10.50.1\`. Router chọn dòng nào?

---

**Bài 3** — Default route.

Cùng bảng định tuyến. IP đích: \`8.8.4.4\`. Router chọn dòng nào?

---

**Bài 4** — Thay đổi MAC qua hop.

Cho sơ đồ:
\`\`\`
[Host X: 172.16.1.5/24, MAC=AA:AA]
        |
[Router R: 172.16.1.1/24 (eth0, MAC=BB:BB) | 172.16.2.1/24 (eth1, MAC=CC:CC)]
        |
[Host Y: 172.16.2.8/24, MAC=DD:DD]
\`\`\`

Host X gửi gói IP đến Host Y (172.16.2.8). Điền vào bảng:

| Chặng | MAC nguồn | MAC đích | IP nguồn | IP đích | TTL |
|-------|-----------|----------|----------|---------|-----|
| X → R | ? | ? | ? | ? | 64 |
| R → Y | ? | ? | ? | ? | ? |

---

**Bài 5** — Số hop và TTL.

Host A gửi gói với TTL=64 đến Host B. Gói đi qua 5 router. Hỏi:
(a) TTL khi đến Host B là bao nhiêu?
(b) Nếu trên đường có 65 router, điều gì xảy ra?

---

**Bài 6** — So sánh RIP và OSPF.

Mạng có 3 đường từ R1 đến R5:
- Đường 1: R1→R2→R3→R5 (3 hop, mỗi link 100 Mbps)
- Đường 2: R1→R4→R5 (2 hop, mỗi link 1 Mbps)

RIP và OSPF sẽ chọn đường nào? Vì sao?

---

### Lời giải chi tiết

**Bài 1 — IP đích: \`10.10.10.55\`**

Kiểm tra từng dòng:
- \`10.0.0.0/8\`: Mạng 10.0.0.0–10.255.255.255. \`10.10.10.55\` nằm trong → **khớp**, /8.
- \`10.10.0.0/16\`: Mạng 10.10.0.0–10.10.255.255. \`10.10.10.55\` nằm trong → **khớp**, /16.
- \`10.10.10.0/24\`: Mạng 10.10.10.0–10.10.10.255. \`10.10.10.55\` nằm trong → **khớp**, /24.
- \`172.16.0.0/12\`: Không khớp (172.x.x.x ≠ 10.x.x.x).
- \`0.0.0.0/0\`: Khớp tất cả → khớp, /0.

Các dòng khớp: /8, /16, /24, /0. Chọn **/24** (dài nhất).

**Kết quả:** chuyển tiếp đến next hop \`192.168.0.4\` qua cổng \`eth1\`.

---

**Bài 2 — IP đích: \`10.10.50.1\`**

Kiểm tra:
- \`10.0.0.0/8\`: \`10.10.50.1\` → 10.x.x.x → **khớp**, /8.
- \`10.10.0.0/16\`: \`10.10.50.1\` → 10.10.x.x → **khớp**, /16.
- \`10.10.10.0/24\`: Mạng 10.10.10.0–10.10.10.255. \`10.10.50.1\` nằm ngoài → Không khớp.
- \`172.16.0.0/12\`: Không khớp.
- \`0.0.0.0/0\`: **khớp**, /0.

Các dòng khớp: /8, /16, /0. Chọn **/16** (dài nhất).

**Kết quả:** next hop \`192.168.0.3\`, cổng \`eth0\`.

---

**Bài 3 — IP đích: \`8.8.4.4\`**

Kiểm tra:
- \`10.0.0.0/8\`: 10.x.x.x ≠ 8.x.x.x → Không.
- \`10.10.0.0/16\`: Không.
- \`10.10.10.0/24\`: Không.
- \`172.16.0.0/12\`: 172.16–31.x.x ≠ 8.x.x.x → Không.
- \`0.0.0.0/0\`: **khớp** (default route), /0.

Chỉ một dòng khớp.

**Kết quả:** chuyển tiếp đến \`203.0.113.1\` qua cổng \`eth2\` — đẩy ra ISP.

---

**Bài 4 — Thay đổi MAC qua hop**

Host X muốn gửi đến \`172.16.2.8\` (ngoài subnet \`172.16.1.0/24\`). X gửi đến default gateway = \`172.16.1.1\`.

Bước 1 — X → R:
- X tìm MAC của \`172.16.1.1\` qua ARP → nhận \`BB:BB\`.
- IP đích \`172.16.2.8\`, IP nguồn \`172.16.1.5\`, TTL=64.
- Frame: MAC nguồn = \`AA:AA\`, MAC đích = \`BB:BB\`.

Bước 2 — R xử lý:
- R nhận, tra bảng: \`172.16.2.0/24\` → direct, cổng \`eth1\`.
- TTL: 64 → **63**.
- R tìm MAC của \`172.16.2.8\` qua ARP → nhận \`DD:DD\`.
- Frame mới: MAC nguồn = \`CC:CC\` (MAC eth1 của R), MAC đích = \`DD:DD\`.

| Chặng | MAC nguồn | MAC đích | IP nguồn | IP đích | TTL |
|-------|-----------|----------|----------|---------|-----|
| X → R | AA:AA | BB:BB | 172.16.1.5 | 172.16.2.8 | 64 |
| R → Y | CC:CC | DD:DD | 172.16.1.5 | 172.16.2.8 | 63 |

---

**Bài 5 — Số hop và TTL**

**(a)** TTL ban đầu = 64. Qua 5 router, mỗi router giảm 1 lần: $64 - 5 =$ **59**.

**(b)** Qua 64 router: TTL $= 64 - 64 = 0$. Router thứ 64 giảm TTL về 0 và **hủy gói** (drop), gửi thông báo ICMP "Time Exceeded" về Host A. Gói không bao giờ đến Host B.

Thực tế: TTL mặc định Linux = 64, Windows = 128, nhiều ISP router có 255. Nếu cần đi qua nhiều hop hơn, cần cấu hình TTL lớn hơn ở nguồn.

---

**Bài 6 — RIP vs OSPF chọn đường khác nhau**

**RIP** dùng metric = hop count:
- Đường 1: 3 hop.
- Đường 2: 2 hop.

RIP chọn **Đường 2** (R1→R4→R5, 2 hop) — ít hop hơn.

Nhưng mỗi link Đường 2 chỉ có 1 Mbps — thực tế rất chậm so với 100 Mbps của Đường 1.

**OSPF** dùng metric $= \\text{cost} = \\frac{10^8}{BW}$:
- Đường 1: cost mỗi link 100 Mbps $= \\frac{10^8}{10^8} = 1$. Tổng $= 1+1+1 =$ **3**.
- Đường 2: cost mỗi link 1 Mbps $= \\frac{10^8}{10^6} = 100$. Tổng $= 100+100 =$ **200**.

OSPF chọn **Đường 1** (tổng cost $3 < 200$) — đúng về mặt hiệu năng.

**Bài học:** RIP mù về băng thông; OSPF biết tính đường thật sự tốt hơn theo năng lực kết nối.

---

## 8. Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 02 — Link Layer & Ethernet](../lesson-02-link-ethernet/): frame Ethernet, địa chỉ MAC — nền tảng hiểu tại sao MAC đổi mỗi hop.
  - [Lesson 03 — Địa chỉ IP & Subnetting](../lesson-03-ip-subnetting/): prefix, subnet mask — nền tảng hiểu longest-prefix match.
- Bài tiếp theo:
  - [Lesson 05 — ARP, ICMP, DHCP, NAT](../lesson-05-arp-icmp-dhcp-nat/): ARP giải thích cơ chế tìm MAC từ IP; ICMP là nền tảng của ping và traceroute; NAT giải thích khi nào IP nguồn thay đổi.

---

## 📝 Tổng kết Lesson 04

1. **Định tuyến** = quyết định "gói tin đi cổng nào tiếp theo" — mỗi router chỉ biết next hop, không cần biết toàn bộ đường.
2. **Router** (tầng 3, dùng IP) khác **switch** (tầng 2, dùng MAC). Default gateway = router biên của mạng LAN.
3. **Longest-prefix match**: chọn dòng bảng định tuyến có /N lớn nhất khớp với IP đích. Default route \`0.0.0.0/0\` là lựa chọn cuối cùng.
4. **Static routing**: cấu hình tay. **Dynamic**: RIP (hop count, chậm hội tụ) vs OSPF (cost theo bandwidth, nhanh) vs BGP (giữa AS, chính sách Internet).
5. **Qua mỗi hop**: IP đích không đổi, MAC đổi, TTL giảm 1. TTL về 0 → gói bị hủy.
`;
