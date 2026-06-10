# Lesson 02 — Tầng liên kết & Ethernet

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tầng liên kết dữ liệu (Data Link Layer)** làm gì trong mô hình TCP/IP và OSI.
- Đọc được cấu trúc **khung Ethernet (Ethernet frame)**: từng trường, độ dài byte, ý nghĩa.
- Phân tích **địa chỉ MAC (Media Access Control)**: định dạng, OUI, phân loại unicast/broadcast/multicast.
- Hiểu **switch** hoạt động như thế nào: học bảng MAC, chuyển frame đúng cổng, so sánh với hub.
- Phân biệt **CSMA/CD** (lịch sử) với **full-duplex** hiện đại.
- Nắm khái niệm **VLAN** ở mức giới thiệu (sẽ đi sâu ở Tầng 3).

## Kiến thức tiền đề

- [Lesson 01 — Mô hình phân tầng (OSI & TCP/IP)](../lesson-01-layered-models/) — hiểu tầng liên kết nằm đâu trong mô hình.
- Số hệ thập lục phân (hex): xem [DataFoundations — Số nhị phân & hex](../../../DataFoundations/) nếu cần ôn lại.

---

## 1. Tầng liên kết dữ liệu làm gì?

### 1.1. Vai trò

💡 **Trực giác — Hình dung**: Hãy nghĩ đến một con phố nhỏ nội bộ trong một khu dân cư (chứ không phải con đường xuyên quốc gia). Tầng liên kết lo việc "chuyển thư từ nhà A sang nhà B trên cùng con phố đó" — tức là giữa hai thiết bị kết nối trực tiếp vào cùng một đường dây, cùng một cổng switch, hay cùng một điểm truy cập WiFi. Công việc liên tỉnh (qua nhiều con phố) là việc của Tầng 3 (IP).

Tầng liên kết dữ liệu (Layer 2 trong OSI, hoặc "Network Interface Layer" trong TCP/IP) có ba nhiệm vụ chính:

1. **Đóng khung (Framing)**: gói dữ liệu từ tầng trên thành các đơn vị gọi là **khung (frame)** — thêm header và trailer bao bọc payload, phân định rõ điểm đầu và điểm cuối của mỗi đơn vị dữ liệu.
2. **Phát hiện và xử lý lỗi (Error Detection)**: tính toán mã kiểm tra (Frame Check Sequence — FCS) để phát hiện bit bị hỏng trong quá trình truyền.
3. **Kiểm soát truy cập đường truyền (Media Access Control — MAC)**: quyết định thiết bị nào được gửi dữ liệu tại một thời điểm, tránh xung đột (collision) khi nhiều thiết bị cùng chia sẻ một đường truyền.

### 1.2. Giao thức phổ biến nhất: Ethernet

Ở mạng có dây LAN (Local Area Network), giao thức tầng liên kết thống trị là **Ethernet** (IEEE 802.3), chiếm hơn 95% thị phần. Trên WiFi là IEEE 802.11. Bài này tập trung vào Ethernet — cơ sở của mọi mạng văn phòng, trung tâm dữ liệu (data center) ngày nay.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Tầng liên kết với tầng vật lý khác nhau thế nào?"* — Tầng vật lý (Layer 1) lo tín hiệu điện/quang/vô tuyến thô: điện áp, tần số, mã hóa bit trên dây. Tầng liên kết (Layer 2) đã làm việc với bit có ý nghĩa: biết đâu là đầu frame, đâu là địa chỉ, khi nào frame bị lỗi.
- *"Tại sao cần đóng khung (framing)? Gửi bit thẳng không được sao?"* — Không được, vì bên nhận cần biết "bao nhiêu bit là một đơn vị?", "địa chỉ gửi đến ai?", "có bị lỗi không?". Frame là đơn vị dữ liệu có đầy đủ ngữ cảnh đó.
- *"Tầng liên kết có mã hóa dữ liệu không?"* — Không. Ethernet frame truyền payload dưới dạng plaintext. Mã hóa (nếu cần) do các tầng cao hơn (TLS ở Tầng 4-5) đảm nhiệm.

📝 **Tóm tắt mục 1**:

- Tầng liên kết = tầng lo truyền frame giữa hai node kết nối trực tiếp (cùng liên kết).
- Ba nhiệm vụ: đóng khung, phát hiện lỗi, kiểm soát truy cập đường truyền.
- Ethernet (IEEE 802.3) là giao thức tầng liên kết chủ đạo trên mạng có dây.

---

## 2. Cấu trúc khung Ethernet

### 2.1. Tổng quan cấu trúc

💡 **Trực giác**: Một khung Ethernet giống như một phong bì thư có cấu trúc chuẩn: có phần tiêu đề (địa chỉ người nhận, người gửi), nội dung thư (payload), và tem kiểm tra toàn vẹn (FCS). Thiết bị mạng chỉ cần biết cấu trúc chuẩn đó là có thể xử lý frame từ bất kỳ nhà sản xuất nào.

Một khung Ethernet chuẩn (IEEE 802.3) có cấu trúc sau (tính từ đầu đến cuối):

```
+----------+------+------+-----------+---------+-------+-----+
| Preamble | SFD  | MAC  | MAC       | Ether-  |       | FCS |
| 7 byte   | 1 B  | Đích | Nguồn     | Type    | Payload     |
|          |      | 6 B  | 6 B       | 2 B     | 46–1500 B   | 4 B |
+----------+------+------+-----------+---------+-------+-----+
 <── Thường không tính vào "frame" trong thực tế ──>  <── Frame thực ──>
```

Lưu ý: Preamble và SFD thường được xử lý ở tầng vật lý, không tính vào kích thước frame khi người ta nói "Ethernet frame". Frame thực sự gồm: MAC đích + MAC nguồn + EtherType + Payload + FCS = tối thiểu **64 byte**, tối đa **1518 byte**.

### 2.2. Các trường chi tiết

| Trường | Độ dài | Mô tả |
|--------|--------|-------|
| Preamble | 7 byte | 7 byte `0xAA` (1010 1010 lặp đi lặp lại) — giúp bên nhận đồng bộ clock |
| SFD (Start Frame Delimiter) | 1 byte | `0xAB` — báo hiệu byte kế tiếp là MAC đích |
| MAC đích (Destination MAC) | 6 byte | Địa chỉ MAC thiết bị nhận. `FF:FF:FF:FF:FF:FF` = broadcast |
| MAC nguồn (Source MAC) | 6 byte | Địa chỉ MAC thiết bị gửi |
| EtherType / Length | 2 byte | Nếu ≥ 0x0800: xác định loại giao thức tầng trên (IPv4=0x0800, IPv6=0x86DD, ARP=0x0806). Nếu ≤ 1500: là chiều dài payload (802.3 cũ) |
| Payload (Data) | 46–1500 byte | Dữ liệu thực tế từ tầng trên (gói IP). Tối thiểu 46 byte — nếu ngắn hơn, cần padding |
| FCS (Frame Check Sequence) | 4 byte | Mã CRC-32: kiểm tra toàn vẹn. Bên nhận tính lại, nếu không khớp → bỏ frame |

**MTU (Maximum Transmission Unit)**: 1500 byte — đây là kích thước payload tối đa. Nếu gói IP lớn hơn, tầng IP sẽ phân mảnh (fragmentation) trước khi giao xuống Ethernet.

**Kích thước frame tối thiểu 64 byte**: Lý do lịch sử từ CSMA/CD — frame phải đủ dài để xung đột được phát hiện trước khi truyền xong (slot time = 512 bit = 64 byte ở 10 Mbps).

### 2.3. Ví dụ đọc frame thật

Giả sử bắt được frame Ethernet (hex dump, không tính Preamble/SFD):

```
00 1A 2B 3C 4D 5E  ← MAC đích: 00:1A:2B:3C:4D:5E
AA BB CC DD EE FF  ← MAC nguồn: AA:BB:CC:DD:EE:FF
08 00              ← EtherType: 0x0800 = IPv4
45 00 00 28 ...    ← Payload: gói IPv4 (phần tiếp theo)
... (tiếp) ...
A1 B2 C3 D4        ← FCS: CRC-32
```

Phân tích: frame này mang gói **IPv4** từ thiết bị `AA:BB:CC:DD:EE:FF` tới thiết bị `00:1A:2B:3C:4D:5E`.

### 2.4. Tính overhead

Một frame Ethernet gửi 1000 byte payload sẽ có tổng kích thước:

```
6 (MAC đích) + 6 (MAC nguồn) + 2 (EtherType) + 1000 (payload) + 4 (FCS) = 1018 byte
Overhead = 18 byte / 1018 byte ≈ 1.77%
```

Nếu Preamble + SFD tính vào: thêm 8 byte nữa → tổng 1026 byte, overhead 2.53%.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"FCS phát hiện lỗi nhưng không sửa được — vậy khi có lỗi thì sao?"* — Ethernet chỉ phát hiện và bỏ frame lỗi (discard). Việc yêu cầu gửi lại là trách nhiệm của tầng trên (TCP ở tầng vận chuyển).
- *"EtherType 0x0800 là IPv4, vậy IPv6 và ARP có EtherType bao nhiêu?"* — IPv6: `0x86DD`, ARP: `0x0806`. Thiết bị đọc 2 byte EtherType để biết giao gói tin lên cho module nào xử lý.
- *"Padding ở đâu nếu payload ngắn hơn 46 byte?"* — Padding (byte 0x00) được thêm vào sau payload, trước FCS, để đạt đúng 46 byte tối thiểu. Tầng trên nhận payload nguyên gốc (không kèm padding) nhờ trường Length.

📝 **Tóm tắt mục 2**:

- Frame Ethernet: Preamble (7B) + SFD (1B) + MAC đích (6B) + MAC nguồn (6B) + EtherType (2B) + Payload (46–1500B) + FCS (4B).
- MTU = 1500 byte (payload tối đa). Frame tối thiểu 64 byte.
- EtherType phân biệt giao thức tầng trên: 0x0800=IPv4, 0x86DD=IPv6, 0x0806=ARP.
- FCS (CRC-32) phát hiện lỗi nhưng không sửa — frame lỗi bị bỏ.

---

## 3. Địa chỉ MAC

### 3.1. Định nghĩa và cấu trúc

💡 **Trực giác**: Địa chỉ MAC giống như **số CMND/CCCD của thiết bị mạng** — định danh duy nhất được gắn cứng (burned-in) vào card mạng tại nhà máy. Trong khi địa chỉ IP có thể thay đổi (do DHCP cấp hoặc sysadmin cấu hình), địa chỉ MAC cố định theo phần cứng.

**Địa chỉ MAC** có độ dài **48 bit = 6 byte**, thường viết dưới dạng thập lục phân (hex) phân cách bởi dấu `:` hoặc `-`:

```
00:1A:2B:3C:4D:5E
AA-BB-CC-DD-EE-FF
```

Cấu trúc 48 bit chia thành 2 phần:

```
+──────────────────────+──────────────────────+
|   OUI (24 bit cao)   |  NIC ID (24 bit thấp)|
|  Mã nhà sản xuất     |  Số serial thiết bị  |
|   3 byte đầu         |   3 byte sau         |
+──────────────────────+──────────────────────+
  byte 1   byte 2   byte 3   byte 4   byte 5   byte 6
```

**OUI (Organizationally Unique Identifier)**: IEEE cấp cho mỗi nhà sản xuất. Ví dụ:
- `00:1A:2B` → có thể tra ra nhà sản xuất cụ thể (dùng `https://maclookup.app`)
- `DC:A6:32` → Raspberry Pi Foundation
- `3C:22:FB` → Apple, Inc.
- `00:50:56` → VMware (máy ảo VMware)

**Hai bit đặc biệt trong byte đầu tiên (OUI byte 1)**:

| Bit | Tên | Ý nghĩa |
|-----|-----|---------|
| Bit 0 (LSB) | I/G bit | 0 = Unicast, 1 = Multicast/Broadcast |
| Bit 1 | U/L bit | 0 = Globally Unique (OUI cấp bởi IEEE), 1 = Locally Administered |

### 3.2. Phân loại địa chỉ MAC

**Unicast**: bit I/G = 0. Frame chỉ gửi đến một thiết bị cụ thể.

Ví dụ unicast:
```
00:1A:2B:3C:4D:5E  → byte đầu 0x00 = 0000 0000, bit 0 = 0 → Unicast
AA:BB:CC:DD:EE:FF  → byte đầu 0xAA = 1010 1010, bit 0 = 0 → Unicast
3C:22:FB:01:23:45  → byte đầu 0x3C = 0011 1100, bit 0 = 0 → Unicast
```

**Broadcast**: địa chỉ đặc biệt `FF:FF:FF:FF:FF:FF` — tất cả 48 bit đều là 1. Mọi thiết bị trong cùng miền quảng bá (broadcast domain) đều nhận và xử lý frame này.

Ví dụ: ARP Request gửi broadcast để hỏi "ai có IP 192.168.1.1?".

**Multicast**: bit I/G = 1 (nhưng khác broadcast). Frame gửi đến một nhóm thiết bị đăng ký nhận.

Ví dụ multicast:
```
01:00:5E:xx:xx:xx  → Multicast IPv4 (IANA quy định)
33:33:xx:xx:xx:xx  → Multicast IPv6
01:80:C2:00:00:00  → Spanning Tree Protocol (STP)
```

### 3.3. Bốn ví dụ phân tích địa chỉ MAC

**Ví dụ 1**: `00:1A:2B:3C:4D:5E`
- Byte đầu: `0x00` = `0000 0000` → bit 0 = 0 (Unicast), bit 1 = 0 (Globally Unique).
- OUI: `00:1A:2B` — có thể tra ra nhà sản xuất.
- NIC ID: `3C:4D:5E`.
- Phân loại: **Unicast, địa chỉ toàn cầu từ IEEE**.

**Ví dụ 2**: `FF:FF:FF:FF:FF:FF`
- Tất cả bit = 1.
- Phân loại: **Broadcast** — mọi thiết bị trong cùng broadcast domain nhận.
- Dùng trong: ARP Request, DHCP Discover.

**Ví dụ 3**: `01:00:5E:7F:00:01`
- Byte đầu: `0x01` = `0000 0001` → bit 0 = 1 → **Multicast**.
- Prefix `01:00:5E` là prefix multicast IPv4 do IANA quy định.
- Tương ứng với địa chỉ IP multicast `224.127.0.1` (25 bit thấp của IP map vào MAC).
- Phân loại: **IPv4 Multicast**.

**Ví dụ 4**: `02:42:AC:11:00:02`
- Byte đầu: `0x02` = `0000 0010` → bit 0 = 0 (Unicast), bit 1 = 1 (Locally Administered).
- Đây là địa chỉ **tự cấu hình** (không phải OUI từ IEEE) — thường thấy trong Docker container (Docker tự sinh MAC ngẫu nhiên, đặt bit U/L = 1 để không trùng OUI thật).

⚠ **Lỗi thường gặp**:

- *"MAC address là cố định, không thay đổi được."* — Sai một phần. "Burned-in" MAC là địa chỉ gốc, nhưng hệ điều hành cho phép đổi MAC bằng lệnh (ví dụ `ip link set eth0 address 02:XX:XX:XX:XX:XX` trên Linux). Đây là "MAC spoofing" — hợp lệ cho testing, nhưng có thể vi phạm chính sách mạng.
- *"Địa chỉ MAC xác định vị trí địa lý."* — Sai. MAC không có thông tin địa lý. OUI chỉ cho biết nhà sản xuất, không cho biết thiết bị ở đâu.

🔁 **Dừng lại tự kiểm tra**:

1. Địa chỉ `01:80:C2:00:00:00` là unicast, multicast hay broadcast?

<details>
<summary>Đáp án</summary>

`0x01` = `0000 0001` → bit 0 = 1 → **Multicast**. Đây là địa chỉ multicast dùng cho Spanning Tree Protocol (STP).

</details>

2. Byte đầu của MAC nguồn trong một frame thông thường có thể là `0x01` không?

<details>
<summary>Đáp án</summary>

**Không**. MAC nguồn trong frame Ethernet phải là địa chỉ **unicast** (bit I/G = 0). Gửi frame với MAC nguồn multicast là vi phạm chuẩn IEEE 802.3 và sẽ bị switch bỏ qua khi học bảng MAC.

</details>

📝 **Tóm tắt mục 3**:

- MAC = 48 bit (6 byte), viết hex phân cách `:`. Chia OUI (3 byte, nhà sản xuất) + NIC ID (3 byte, số serial).
- Bit 0 của byte đầu: 0 = Unicast, 1 = Multicast/Broadcast.
- Broadcast: `FF:FF:FF:FF:FF:FF`. Multicast IPv4: prefix `01:00:5E:xx:xx:xx`.
- MAC có thể được thay đổi bởi OS (MAC spoofing) dù có "burned-in" address.

---

## 4. Switch vs Hub: cách chuyển frame

### 4.1. Hub — thiết bị cũ

💡 **Trực giác**: Hub giống như **loa phóng thanh ở chợ**: khi một người nói (gửi frame), mọi người trong chợ (mọi cổng) đều nghe thấy — dù thông điệp chỉ dành cho một người. Kết quả: lãng phí băng thông, nhiều người nói cùng lúc → xung đột.

**Hub** (bộ tập trung) hoạt động ở Tầng 1 (tầng vật lý). Khi nhận tín hiệu trên một cổng, hub **phát lại tín hiệu đó ra tất cả các cổng còn lại** (trừ cổng nhận). Hub không hiểu frame, không hiểu MAC — chỉ khuếch đại tín hiệu.

Hậu quả:
- **Một collision domain duy nhất**: mọi thiết bị nối vào hub chia nhau băng thông và phải nhường nhau. Khi 2 thiết bị gửi đồng thời → xung đột → cả hai phải dừng và thử lại (CSMA/CD).
- **Bảo mật kém**: bất kỳ máy nào cũng nhận được frame dành cho máy khác → dễ nghe lén (sniffing).
- Hub đã lỗi thời từ đầu những năm 2000.

### 4.2. Switch — thiết bị hiện đại

💡 **Trực giác**: Switch giống như **nhân viên bưu điện thông minh** biết địa chỉ từng nhà trong khu phố. Khi nhận thư (frame), nhân viên tra sổ địa chỉ (MAC address table), rồi chỉ giao thư đến đúng nhà — không phân phát cho cả khu.

**Switch** (bộ chuyển mạch) hoạt động ở Tầng 2. Switch đọc địa chỉ MAC trong frame và chuyển frame đúng đến cổng tương ứng. Switch duy trì một **bảng MAC (MAC address table)** — còn gọi là **Content Addressable Memory (CAM) table** — ánh xạ: `MAC address → cổng (port)`.

### 4.3. Quá trình switch học địa chỉ MAC — Walk-through

Giả sử switch 4 cổng: Port 1 nối Host A (`00:AA:AA:AA:AA:AA`), Port 2 nối Host B (`00:BB:BB:BB:BB:BB`), Port 3 nối Host C (`00:CC:CC:CC:CC:CC`), Port 4 nối Host D (`00:DD:DD:DD:DD:DD`).

**Trạng thái ban đầu — Bảng MAC rỗng**:
```
+──────────────────────────+──────+
| MAC Address              | Port |
+--------------------------+------+
| (trống)                  |      |
+──────────────────────────+──────+
```

**Bước 1**: Host A gửi frame tới Host B.
- Frame: MAC nguồn = `00:AA:AA:AA:AA:AA`, MAC đích = `00:BB:BB:BB:BB:BB`.
- Switch nhận trên Port 1.
- **Học**: "Port 1 có Host A (`00:AA:AA:AA:AA:AA`)" → ghi vào bảng.
- **Tra cứu MAC đích** `00:BB:BB:BB:BB:BB` → không tìm thấy trong bảng.
- **Flood**: gửi frame ra tất cả cổng trừ Port 1 (Port 2, 3, 4).
- Host B nhận frame (vì là đúng địa chỉ đích). Host C, D nhận nhưng bỏ qua (MAC đích không khớp).

```
Bảng MAC sau Bước 1:
+──────────────────────────+──────+
| 00:AA:AA:AA:AA:AA        |  1   |
+──────────────────────────+──────+
```

**Bước 2**: Host B trả lời Host A.
- Frame: MAC nguồn = `00:BB:BB:BB:BB:BB`, MAC đích = `00:AA:AA:AA:AA:AA`.
- Switch nhận trên Port 2.
- **Học**: "Port 2 có Host B" → ghi vào bảng.
- **Tra cứu MAC đích** `00:AA:AA:AA:AA:AA` → tìm thấy: Port 1.
- **Unicast forward**: gửi frame **chỉ ra Port 1** — không flood!

```
Bảng MAC sau Bước 2:
+──────────────────────────+──────+
| 00:AA:AA:AA:AA:AA        |  1   |
| 00:BB:BB:BB:BB:BB        |  2   |
+──────────────────────────+──────+
```

**Bước 3**: Host C gửi frame tới Host D.
- Frame: MAC nguồn = `00:CC:CC:CC:CC:CC`, MAC đích = `00:DD:DD:DD:DD:DD`.
- Switch nhận trên Port 3.
- **Học**: ghi Port 3 → `00:CC:CC:CC:CC:CC`.
- **Tra cứu** `00:DD:DD:DD:DD:DD` → chưa biết → **Flood ra Port 1, 2, 4**.

**Bước 4**: Host D trả lời Host C.
- Switch học Port 4 → `00:DD:DD:DD:DD:DD`.
- Tra cứu `00:CC:CC:CC:CC:CC` → Port 3 → **chỉ gửi ra Port 3**.

```
Bảng MAC sau Bước 4 (đã học đủ):
+──────────────────────────+──────+
| 00:AA:AA:AA:AA:AA        |  1   |
| 00:BB:BB:BB:BB:BB        |  2   |
| 00:CC:CC:CC:CC:CC        |  3   |
| 00:DD:DD:DD:DD:DD        |  4   |
+──────────────────────────+──────+
```

Từ đây, mọi giao tiếp giữa các host đã biết đều được **unicast forwarding** — không flood nữa.

### 4.4. Collision Domain vs Broadcast Domain

| Khái niệm | Định nghĩa | Hub | Switch |
|-----------|------------|-----|--------|
| **Collision Domain** (miền va chạm) | Tập hợp thiết bị có thể gây xung đột với nhau khi gửi đồng thời | **1 collision domain duy nhất** cho cả hub | **Mỗi cổng = 1 collision domain riêng** |
| **Broadcast Domain** (miền quảng bá) | Tập hợp thiết bị nhận được cùng một frame broadcast | 1 domain (mọi cổng) | **1 domain** (mặc định — switch không chặn broadcast, cần VLAN để tách) |

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Nếu switch học MAC, thì bảng MAC sẽ bị đầy không? Xảy ra gì khi đầy?"* — Bảng MAC có giới hạn dung lượng (thường vài nghìn đến vài chục nghìn entry). Khi đầy, switch buộc phải flood mọi frame có MAC đích chưa biết — giống hành vi hub. Đây là nguyên lý đằng sau tấn công **MAC flooding** (kẻ tấn công gửi frames với MAC nguồn ngẫu nhiên để làm đầy bảng MAC, ép switch chuyển sang flood-mode, rồi bắt gói tin).
- *"Entry trong bảng MAC có bị xóa không?"* — Có. Mỗi entry có **aging timer** (thường 300 giây = 5 phút). Nếu trong 5 phút không thấy frame nào từ MAC đó, entry bị xóa để giải phóng chỗ.
- *"Switch có thể gửi frame ra cùng cổng nhận không?"* — Không. Đây gọi là "split horizon" — switch không gửi frame ra cổng mà nó nhận frame đó vào.

📝 **Tóm tắt mục 4**:

- Hub: flood mọi cổng, 1 collision domain chung → lãng phí băng thông, dễ nghe lén.
- Switch: học bảng MAC (MAC address → port), unicast forward khi biết đích, flood khi chưa biết.
- Mỗi cổng switch là 1 collision domain riêng → không xung đột giữa các cổng.
- Cả hub lẫn switch (mặc định) tạo ra 1 broadcast domain duy nhất.

---

## 5. CSMA/CD, Full-Duplex và VLAN

### 5.1. CSMA/CD — Giao thức tránh xung đột (lịch sử)

**CSMA/CD** (Carrier Sense Multiple Access / Collision Detection) là cơ chế kiểm soát truy cập đường truyền của Ethernet thế hệ đầu (10BASE-T, 100BASE-TX half-duplex):

- **Carrier Sense (CS)**: trước khi gửi, lắng nghe xem đường truyền có đang bận không.
- **Multiple Access (MA)**: nhiều thiết bị chia sẻ cùng đường truyền.
- **Collision Detection (CD)**: nếu hai thiết bị gửi đồng thời → xung đột → cả hai phát tín hiệu **jam** → ngừng lại → chờ thời gian ngẫu nhiên (exponential backoff) rồi thử lại.

```
A: [Lắng nghe] → [Gửi frame] ──────────────→ [Xung đột!] → [Jam] → [Backoff] → [Thử lại]
B:              [Lắng nghe] → [Gửi frame] ──/
```

CSMA/CD chỉ cần thiết trong môi trường **half-duplex** (chỉ có thể gửi hoặc nhận tại một thời điểm, không thể đồng thời). Thực tế ngày nay: CSMA/CD gần như đã lỗi thời.

### 5.2. Full-Duplex — Tiêu chuẩn hiện đại

**Full-duplex** cho phép thiết bị **gửi và nhận đồng thời**. Điều này chỉ khả thi khi:

1. Mỗi thiết bị kết nối **point-to-point** đến switch (không chia sẻ cáp với nhiều thiết bị).
2. Switch port và NIC thương lượng (negotiate) chế độ full-duplex qua **auto-negotiation** (IEEE 802.3u).

Trong mạng Ethernet hiện đại (Gigabit Ethernet, 10GbE):
- **100% kết nối là full-duplex** — point-to-point giữa NIC và switch port.
- **Không có collision** → CSMA/CD không cần thiết.
- Băng thông: $1 + 1 = 2$ Gbps tổng cộng (1 Gbps upload + 1 Gbps download).

⚠ **Lỗi thường gặp — Duplex mismatch**:

Một bên cấu hình full-duplex, bên kia half-duplex → **duplex mismatch** — một trong những lỗi hiệu năng mạng khó debug nhất:
- Bên full-duplex: gửi liên tục, không để ý va chạm.
- Bên half-duplex: phát hiện va chạm liên tục, phải backoff → hiệu năng xuống rất thấp.
- Triệu chứng: ping được nhưng throughput rất thấp (dưới 10% băng thông danh nghĩa).
- Giải pháp: luôn để auto-negotiation (không hardcode 100/full hay 1000/full trừ khi biết chắc cả hai phía đều cố định).

### 5.3. VLAN — Giới thiệu

**VLAN (Virtual LAN)** cho phép chia một switch vật lý thành nhiều broadcast domain logic độc lập — như thể có nhiều switch riêng biệt trên cùng thiết bị.

Ví dụ: Switch 24 cổng → Port 1-8 thuộc VLAN 10 (phòng kế toán), Port 9-16 thuộc VLAN 20 (phòng kỹ thuật), Port 17-24 thuộc VLAN 30 (khách). Máy trong VLAN 10 không thể giao tiếp trực tiếp với VLAN 20 dù cùng switch vật lý.

VLAN dùng **IEEE 802.1Q tag**: thêm 4 byte vào frame Ethernet (sau MAC nguồn, trước EtherType), trong đó 12 bit là VLAN ID (0–4095).

Phạm vi bài này chỉ giới thiệu. Chi tiết cơ chế định tuyến giữa các VLAN sẽ học ở [Lesson 03 — Địa chỉ IP & Subnetting](../lesson-03-ip-subnetting/).

📝 **Tóm tắt mục 5**:

- CSMA/CD: cơ chế tránh xung đột cho Ethernet half-duplex thế hệ đầu — ngày nay gần như lỗi thời.
- Full-duplex: gửi và nhận đồng thời, không xung đột, chuẩn trên mọi mạng Gigabit hiện đại.
- Duplex mismatch = nguồn gốc của nhiều vấn đề hiệu năng mạng khó debug.
- VLAN = chia broadcast domain logic, dùng 802.1Q tag 4 byte — chi tiết ở Lesson 03.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Đọc trường frame**: Cho hex dump của một frame Ethernet (không tính Preamble/SFD):

```
3C 22 FB 01 23 45 | 00 1A 2B 3C 4D 5E | 08 06 | [ARP payload...] | AA BB CC DD
```

Xác định: (a) MAC đích, (b) MAC nguồn, (c) EtherType và giao thức tầng trên, (d) 4 byte cuối là gì?

---

**Bài 2 — Phân loại MAC**: Phân loại các địa chỉ MAC sau: Unicast / Multicast / Broadcast, và Globally Unique / Locally Administered:

- (a) `00:50:56:AA:BB:CC`
- (b) `FF:FF:FF:FF:FF:FF`
- (c) `01:00:5E:00:00:01`
- (d) `02:42:AC:11:00:05`

---

**Bài 3 — Switch chuyển frame**: Switch có 3 cổng (P1, P2, P3). Bảng MAC hiện tại:
```
AA:AA:AA:AA:AA:AA → P1
BB:BB:BB:BB:BB:BB → P2
```
Host C (`CC:CC:CC:CC:CC:CC`, P3) gửi frame broadcast `FF:FF:FF:FF:FF:FF`. Switch làm gì? Frame được gửi ra cổng nào?

---

**Bài 4 — Switch học MAC**: Tiếp bài 3. Sau khi Host C gửi broadcast, Host A (`AA:AA:AA:AA:AA:AA`) trả lời Host C bằng unicast. Switch làm gì với frame này?

---

**Bài 5 — Tính overhead frame**: Tính phần trăm overhead của khung Ethernet khi:
- (a) Payload = 1500 byte (MTU tối đa).
- (b) Payload = 46 byte (kích thước tối thiểu, không padding).
- (c) Payload = 64 byte.

*(Tính overhead = phần header + trailer, không tính Preamble/SFD)*

---

**Bài 6 — EtherType và giao thức**: Cho biết giao thức tầng trên ứng với các EtherType:
- `0x0800`, `0x0806`, `0x86DD`, `0x8100`, `0x88CC`

---

### Lời giải chi tiết

**Bài 1 — Lời giải**:

Phân tích từng phần:
- Bytes 1-6: `3C 22 FB 01 23 45` → **(a) MAC đích: `3C:22:FB:01:23:45`**
- Bytes 7-12: `00 1A 2B 3C 4D 5E` → **(b) MAC nguồn: `00:1A:2B:3C:4D:5E`**
- Bytes 13-14: `08 06` → **(c) EtherType: `0x0806` = ARP** (Address Resolution Protocol — giao thức phân giải địa chỉ, sẽ học ở Lesson 05)
- 4 byte cuối `AA BB CC DD` → **(d) FCS** (Frame Check Sequence, CRC-32)

---

**Bài 2 — Lời giải**:

**(a) `00:50:56:AA:BB:CC`**:
- Byte đầu `0x00` = `0000 0000` → bit 0 = 0 (Unicast), bit 1 = 0 (Globally Unique).
- OUI `00:50:56` → VMware.
- Kết luận: **Unicast, Globally Unique (thiết bị ảo VMware)**.

**(b) `FF:FF:FF:FF:FF:FF`**:
- Tất cả bit = 1 → **Broadcast**.

**(c) `01:00:5E:00:00:01`**:
- Byte đầu `0x01` = `0000 0001` → bit 0 = 1 → **Multicast**.
- Prefix `01:00:5E` → IPv4 multicast. Địa chỉ `01:00:5E:00:00:01` tương ứng `224.0.0.1` (All Hosts multicast group).
- Kết luận: **Multicast IPv4**.

**(d) `02:42:AC:11:00:05`**:
- Byte đầu `0x02` = `0000 0010` → bit 0 = 0 (Unicast), bit 1 = 1 (Locally Administered).
- Kết luận: **Unicast, Locally Administered** — điển hình là MAC của container Docker (Docker tự sinh ngẫu nhiên, đặt bit U/L = 1).

---

**Bài 3 — Lời giải**:

Frame broadcast: MAC nguồn = `CC:CC:CC:CC:CC:CC`, MAC đích = `FF:FF:FF:FF:FF:FF`.

Các bước switch xử lý:
1. **Học**: nhận trên P3, MAC nguồn = `CC:CC:CC:CC:CC:CC` → ghi vào bảng: `CC:CC:CC:CC:CC:CC → P3`.
2. **Tra cứu đích**: `FF:FF:FF:FF:FF:FF` — là địa chỉ broadcast → **luôn flood ra tất cả cổng trừ cổng nhận**.
3. Kết quả: **Gửi ra P1 và P2** (không gửi lại P3).

Bảng MAC sau bước này:
```
AA:AA:AA:AA:AA:AA → P1
BB:BB:BB:BB:BB:BB → P2
CC:CC:CC:CC:CC:CC → P3  ← mới học
```

---

**Bài 4 — Lời giải**:

Host A trả lời: MAC nguồn = `AA:AA:AA:AA:AA:AA`, MAC đích = `CC:CC:CC:CC:CC:CC`.

Các bước:
1. **Học**: switch nhận trên P1. MAC nguồn `AA:AA:AA:AA:AA:AA` đã có trong bảng (P1) → cập nhật aging timer, không thêm mới.
2. **Tra cứu đích** `CC:CC:CC:CC:CC:CC` → **tìm thấy: P3** (vừa học ở bài 3).
3. Kết quả: **Unicast forward — chỉ gửi ra P3**. P2 không nhận frame này.

Quan sát: sau 2 lượt giao tiếp, switch đã học đủ địa chỉ — không cần flood nữa.

---

**Bài 5 — Lời giải**:

Header + trailer không tính Preamble/SFD = MAC đích (6B) + MAC nguồn (6B) + EtherType (2B) + FCS (4B) = **18 byte**.

**(a) Payload = 1500 byte**:
```
Tổng frame = 18 + 1500 = 1518 byte
Overhead = 18 / 1518 × 100% ≈ 1.19%
```
Rất hiệu quả — overhead thấp khi payload lớn.

**(b) Payload = 46 byte**:
```
Tổng frame = 18 + 46 = 64 byte (đây chính là kích thước frame tối thiểu)
Overhead = 18 / 64 × 100% ≈ 28.1%
```
Overhead cao hơn nhiều — Ethernet không hiệu quả với gói tin nhỏ.

**(c) Payload = 64 byte**:
```
Tổng frame = 18 + 64 = 82 byte
Overhead = 18 / 82 × 100% ≈ 21.95%
```

Bài học: các giao thức như TCP/IP cố gắng tối đa hóa kích thước gói (gần MTU 1500) để giảm overhead.

---

**Bài 6 — Lời giải**:

| EtherType | Giao thức |
|-----------|-----------|
| `0x0800` | IPv4 — Internet Protocol version 4 |
| `0x0806` | ARP — Address Resolution Protocol (phân giải IP → MAC) |
| `0x86DD` | IPv6 — Internet Protocol version 6 |
| `0x8100` | IEEE 802.1Q VLAN tag — frame có mang VLAN ID |
| `0x88CC` | LLDP — Link Layer Discovery Protocol (thiết bị tự quảng bá thông tin cho nhau) |

---

## 7. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 01 — Mô hình phân tầng OSI & TCP/IP](../lesson-01-layered-models/)
- **Bài tiếp theo**: [Lesson 03 — Địa chỉ IP & Subnetting](../lesson-03-ip-subnetting/) — tầng mạng (Network Layer), địa chỉ IPv4, chia subnet, CIDR.

Liên kết chéo:
- Hệ hex và nhị phân: [DataFoundations](../../../DataFoundations/) — nền tảng đọc frame và địa chỉ MAC.
- ARP (giao thức gắn kết tầng 2 và tầng 3): [Lesson 05 — ARP, ICMP, DHCP, NAT](../lesson-05-arp-icmp-dhcp-nat/).

---

## 📝 Tổng kết Lesson 02

1. **Tầng liên kết** lo truyền frame giữa hai node trên cùng liên kết: đóng khung, phát hiện lỗi (FCS/CRC-32), kiểm soát truy cập đường truyền.
2. **Ethernet frame**: MAC đích (6B) + MAC nguồn (6B) + EtherType (2B) + Payload (46–1500B) + FCS (4B). MTU = 1500 byte, frame min = 64 byte.
3. **Địa chỉ MAC**: 48 bit, OUI (3 byte nhà sản xuất) + NIC ID (3 byte). Bit 0 byte đầu phân biệt unicast/multicast. Broadcast = `FF:FF:FF:FF:FF:FF`.
4. **Switch** học bảng MAC (MAC → port), unicast forward khi biết đích, flood khi chưa biết. Mỗi cổng = 1 collision domain riêng.
5. **CSMA/CD** là lịch sử — mạng Gigabit hiện đại dùng full-duplex, không xung đột. Duplex mismatch gây sụt hiệu năng nghiêm trọng.
6. **VLAN** chia broadcast domain logic bằng IEEE 802.1Q tag — sẽ học chi tiết ở Lesson 03.
