// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/01-Foundations-LowerLayers/lesson-01-layered-models/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Mô hình phân tầng (Layered Models)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao mạng máy tính cần chia thành nhiều tầng (tiers/layers) — nguyên lý "phân tách mối quan tâm" (separation of concerns).
- Nắm rõ 7 tầng OSI: tên gọi, chức năng, giao thức/thiết bị đặc trưng của mỗi tầng.
- Nắm rõ 4 tầng TCP/IP và cách chúng ánh xạ sang mô hình OSI.
- Hiểu quá trình đóng gói (encapsulation) và gỡ gói (decapsulation): dữ liệu đi xuống từng tầng, mỗi tầng bọc thêm một header (phần đầu), rồi đi qua dây; chiều ngược lại từng tầng bóc header đó.
- Biết tên đơn vị dữ liệu (PDU — Protocol Data Unit) và địa chỉ tương ứng ở mỗi tầng.

## Kiến thức tiền đề

Không yêu cầu kiến thức mạng trước. Nên đọc qua khái niệm nhị phân (bit, byte) — có thể tham khảo [DataFoundations](../../../DataFoundations/).

---

## 1. Mạng máy tính là gì — vì sao cần chia tầng?

### 1.1. Bài toán ban đầu

Hãy nghĩ đơn giản: bạn muốn gửi chữ "Hello" từ laptop của mình tới máy chủ ở bên kia Trái Đất.

Trên con đường đó, hàng chục vấn đề phải giải quyết *cùng một lúc*:

- Làm sao chuyển chữ thành tín hiệu điện/quang trên dây?
- Làm sao đảm bảo các bit 0/1 không bị lẫn lộn khi đi qua cáp?
- Làm sao biết gói tin đến đúng máy đích trong hàng triệu máy?
- Làm sao đảm bảo gói tin đến đúng thứ tự và không mất?
- Làm sao trình duyệt nhận chứ không phải ứng dụng khác đang mở?

Nếu viết một hệ thống giải tất cả vấn đề này cùng nhau, code sẽ vô cùng phức tạp — mỗi khi thay công nghệ vật lý (ví dụ từ cáp đồng sang cáp quang), toàn bộ hệ thống phải viết lại.

### 1.2. Giải pháp: phân tầng (layering)

💡 **Trực giác — analogy gửi thư bưu chính**

Hãy nghĩ đến việc gửi một bức thư từ Hà Nội tới Paris:

1. **Bạn** viết nội dung thư, cho vào phong bì, ghi địa chỉ người nhận.
2. **Bưu cục quận** thu gom thư, đóng túi bưu kiện, ghi "Từ Hà Nội — Tới Paris".
3. **Sân bay Nội Bài** xếp lên máy bay phù hợp theo tuyến đường bay.
4. **Sân bay Charles de Gaulle** tiếp nhận, phân loại.
5. **Bưu cục địa phương Paris** nhận túi, tách ra từng phong bì.
6. **Người phát thư** giao tận tay người nhận.

Mỗi "tầng" (bưu cục quận, sân bay, bưu cục Paris) chỉ quan tâm đến nhiệm vụ của mình — không cần biết bên trên/dưới làm gì. Thay máy bay bằng tàu hỏa? Chỉ tầng "vận chuyển" thay đổi, còn bạn (người viết thư) không cần làm gì khác.

**Đây chính xác là nguyên lý phân tầng trong mạng máy tính**.

Mỗi tầng:
- Cung cấp dịch vụ cho tầng ngay trên nó.
- Sử dụng dịch vụ của tầng ngay dưới nó.
- Không quan tâm chi tiết bên trong của tầng khác.

❓ **Câu hỏi tự nhiên của người đọc**

*"Phân tầng thì lợi gì cụ thể?"*

- **Thay thế độc lập**: thay cáp đồng bằng Wi-Fi — chỉ tầng vật lý thay đổi, tầng trên không đổi.
- **Chuẩn hóa**: nhà sản xuất khác nhau nhưng cùng theo chuẩn tầng → nói chuyện được với nhau.
- **Dễ gỡ lỗi**: lỗi mạng xảy ra? Kiểm tra từng tầng → khoanh vùng nhanh hơn.
- **Phát triển song song**: nhóm A phát triển tầng Transport, nhóm B phát triển tầng Application, không đụng chạm nhau.

*"Nhược điểm của phân tầng?"*

- Mỗi tầng thêm header → overhead (phần phụ thêm vào, tốn băng thông).
- Không thể "tối ưu chéo tầng" dễ dàng (ví dụ: tầng Transport không biết tình trạng vật lý).

📝 **Tóm tắt mục 1**

- Mạng máy tính giải quyết nhiều vấn đề phức tạp (vật lý, địa chỉ, độ tin cậy, ứng dụng).
- Phân tầng = mỗi lớp phụ trách đúng một vấn đề, cung cấp dịch vụ cho tầng trên.
- Lợi ích: thay thế độc lập, chuẩn hóa, dễ gỡ lỗi.

---

## 2. Mô hình OSI — 7 tầng

### 2.1. Tổng quan

Mô hình OSI (Open Systems Interconnection) do ISO ban hành năm 1984. Đây là mô hình tham chiếu lý tưởng, dùng để giảng dạy và phân tích — không phải là giao thức thực tế trên Internet.

\`\`\`
Tầng 7 — Application     (Ứng dụng)
Tầng 6 — Presentation    (Trình bày)
Tầng 5 — Session         (Phiên)
Tầng 4 — Transport       (Vận chuyển)
Tầng 3 — Network         (Mạng)
Tầng 2 — Data Link       (Liên kết dữ liệu)
Tầng 1 — Physical        (Vật lý)
\`\`\`

Mẹo nhớ (từ tầng 7 xuống 1): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.

### 2.2. Chi tiết từng tầng

#### Tầng 1 — Physical (Vật lý)

**(a) Là gì:** Chuyển đổi bit 0/1 thành tín hiệu vật lý (điện áp, ánh sáng, sóng vô tuyến) và ngược lại. Quan tâm đến: điện áp mức cao/thấp, tần số tín hiệu, loại cáp, đầu nối.

**(b) Vì sao cần:** Máy tính làm việc với bit (0/1), nhưng dây dẫn truyền điện áp. Phải có ai đó "dịch" giữa hai thế giới này.

**(c) Ví dụ cụ thể:** Cáp Ethernet Cat6 truyền tín hiệu điện áp +2.5V = bit 1, −2.5V = bit 0 ở tốc độ 1 Gbps = 1 tỷ bit/giây. Cáp quang truyền xung ánh sáng: có ánh sáng = 1, không có = 0.

**Thiết bị:** Hub, Repeater, Connector, Card mạng (NIC — phần vật lý).
**Giao thức/chuẩn:** IEEE 802.3 (Ethernet vật lý), IEEE 802.11 (Wi-Fi vật lý), USB, RS-232.
**PDU:** Bit.

---

#### Tầng 2 — Data Link (Liên kết dữ liệu)

**(a) Là gì:** Đóng gói bit thành frame (khung), thêm địa chỉ MAC (Media Access Control — kiểm soát truy cập phương tiện) để xác định thiết bị trong cùng một mạng cục bộ (LAN). Phát hiện (và một số giao thức còn sửa) lỗi bit.

**(b) Vì sao cần:** Tầng Physical chỉ truyền dòng bit thô — không biết "gói tin nào của ai". Data Link thêm địa chỉ MAC (6 byte, ví dụ \`AA:BB:CC:DD:EE:FF\`) để phân biệt từng máy trong mạng cục bộ. Ngoài ra phải giải quyết việc nhiều thiết bị chia sẻ cùng một đường truyền (CSMA/CD với Ethernet có dây).

**(c) Ví dụ cụ thể:** Frame Ethernet có cấu trúc: \`[Preamble 8B][MAC dst 6B][MAC src 6B][Type 2B][Data 46-1500B][FCS 4B]\`. Tổng từ 64 đến 1518 byte. FCS (Frame Check Sequence) là CRC-32 — nếu bit bị lỗi, CRC sai → frame bị loại bỏ.

**Thiết bị:** Switch (chuyển mạch), Bridge (cầu nối). (Hub là tầng 1, không đọc địa chỉ MAC.)
**Giao thức:** Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), PPP, HDLC.
**PDU:** Frame (khung).
**Địa chỉ:** MAC Address (48 bit = 6 byte, ví dụ \`AA:BB:CC:DD:EE:FF\`).

---

#### Tầng 3 — Network (Mạng)

**(a) Là gì:** Định tuyến (routing — tìm đường) gói tin qua nhiều mạng trung gian, từ nguồn tới đích. Thêm địa chỉ IP để xác định thiết bị trên toàn cầu.

**(b) Vì sao cần:** Địa chỉ MAC chỉ có ý nghĩa trong LAN — không thể dùng MAC để gửi gói tin từ Việt Nam sang Mỹ (vì dọc đường có hàng trăm mạng khác nhau). Địa chỉ IP là địa chỉ logic, có cấu trúc phân cấp (network/host), cho phép router tìm đường theo từng bước.

**(c) Ví dụ cụ thể:** Gói tin IP có header 20 byte (IPv4). Trong đó: Source IP (4B), Destination IP (4B), TTL (1B — Time To Live, giảm 1 mỗi router, đến 0 thì hủy), Protocol (1B — ví dụ 6 = TCP, 17 = UDP). TTL mặc định thường là 64 hoặc 128 — gói tin đi qua tối đa 64/128 router.

**Thiết bị:** Router (bộ định tuyến).
**Giao thức:** IP (IPv4, IPv6), ICMP, OSPF, BGP.
**PDU:** Packet (gói tin).
**Địa chỉ:** IP Address (IPv4: 32 bit, ví dụ \`192.168.1.1\`; IPv6: 128 bit).

---

#### Tầng 4 — Transport (Vận chuyển)

**(a) Là gì:** Cung cấp giao tiếp end-to-end giữa hai tiến trình ứng dụng. Có hai chế độ chính: TCP (tin cậy, có xác nhận) và UDP (không tin cậy, nhanh hơn). Thêm số cổng (port) để phân biệt ứng dụng.

**(b) Vì sao cần:** Tầng Network đưa gói tin đến đúng máy, nhưng máy đó có thể đang chạy đồng thời trình duyệt, email, game... Port number (0–65535) xác định ứng dụng nào nhận gói tin. Ngoài ra TCP giải quyết mất gói (retransmit), lộn thứ tự (reorder), kiểm soát luồng (flow control).

**(c) Ví dụ cụ thể:** Máy bạn mở trình duyệt → trình duyệt kết nối đến cổng 443 (HTTPS) của máy chủ. Máy chủ trả về data qua cổng nguồn 443 → cổng đích ngẫu nhiên của bạn (ví dụ 52834). TCP header 20 byte: Source Port (2B), Dest Port (2B), Sequence Number (4B), ACK Number (4B), Flags (SYN/ACK/FIN...), Window Size (2B).

**Thiết bị:** (Xử lý trong phần mềm hệ điều hành, không phải thiết bị phần cứng riêng.)
**Giao thức:** TCP (Transmission Control Protocol), UDP (User Datagram Protocol).
**PDU:** Segment (TCP) / Datagram (UDP).
**Địa chỉ:** Port Number (16 bit, 0–65535).

⚠ **Lỗi thường gặp:** Nhiều người nhầm "cổng" (port) là cổng vật lý trên bộ định tuyến. Thực ra port trong TCP/UDP là *số logic* trong phần mềm — máy tính bình thường có thể mở hàng nghìn port cùng lúc. Port 80 = HTTP, 443 = HTTPS, 22 = SSH, 25 = SMTP, 53 = DNS.

---

#### Tầng 5 — Session (Phiên)

**(a) Là gì:** Thiết lập, duy trì và kết thúc phiên giao tiếp giữa hai ứng dụng. Xử lý checkpoint (điểm kiểm tra) để phục hồi khi gián đoạn.

**(b) Vì sao cần:** Phân biệt nhiều phiên song song từ cùng một ứng dụng (ví dụ: tải nhiều file cùng lúc — mỗi file là một phiên riêng). Đồng bộ hóa (synchronization) khi file dài — nếu mất kết nối giữa chừng, tiếp tục từ checkpoint thay vì bắt đầu lại.

**(c) Ví dụ cụ thể:** Trong thực tế, tầng 5, 6, 7 thường được gộp lại trong TCP/IP. Giao thức RPC (Remote Procedure Call) và NetBIOS hoạt động ở tầng này trong OSI.

**Giao thức:** NetBIOS, RPC, PPTP (phần session), SQL session.

---

#### Tầng 6 — Presentation (Trình bày)

**(a) Là gì:** Chuyển đổi định dạng dữ liệu — mã hóa/giải mã, nén/giải nén, chuyển đổi bộ ký tự. Đảm bảo hai máy "nói cùng ngôn ngữ dữ liệu".

**(b) Vì sao cần:** Máy Windows và macOS có thể dùng định dạng số thực (float) khác nhau. JPEG, MP3 là định dạng trình bày. TLS/SSL mã hóa data ở đây (theo phân loại OSI thuần túy).

**(c) Ví dụ cụ thể:** ASCII vs UTF-8 vs Unicode — Presentation layer phải chuyển đổi nếu cần. Nén gzip file HTML trước khi gửi → giảm 70% kích thước.

**Giao thức:** SSL/TLS (mã hóa), JPEG, PNG, MP3 (định dạng), ASCII, UTF-8.

---

#### Tầng 7 — Application (Ứng dụng)

**(a) Là gì:** Tầng trực tiếp phục vụ ứng dụng người dùng. Định nghĩa ngôn ngữ (giao thức) mà ứng dụng dùng để giao tiếp với nhau.

**(b) Vì sao cần:** Tầng Transport chỉ biết "chuyển luồng byte từ A đến B". Tầng Application quy định cấu trúc request/response — ví dụ HTTP nói "GET /index.html HTTP/1.1" là yêu cầu tải trang, server trả "HTTP/1.1 200 OK".

**(c) Ví dụ cụ thể:** HTTP request để tải trang web: \`GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n\` — đây là plaintext ASCII 40 byte. Server trả về \`HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n<html>...\`.

**Giao thức:** HTTP/HTTPS, DNS, SMTP/POP3/IMAP (email), FTP, SSH, DHCP, SNMP.
**PDU:** Data (Message).

### 2.3. Bảng tổng hợp OSI

| Tầng | Tên | PDU | Địa chỉ | Giao thức / Thiết bị điển hình |
|------|-----|-----|---------|-------------------------------|
| 7 | Application (Ứng dụng) | Data | URL, tên miền | HTTP, DNS, SMTP, FTP, SSH |
| 6 | Presentation (Trình bày) | Data | — | TLS/SSL, JPEG, UTF-8, gzip |
| 5 | Session (Phiên) | Data | Session ID | NetBIOS, RPC |
| 4 | Transport (Vận chuyển) | Segment / Datagram | Port (16 bit) | TCP, UDP |
| 3 | Network (Mạng) | Packet (gói tin) | IP Address (32/128 bit) | IP, ICMP, OSPF, BGP · Router |
| 2 | Data Link (Liên kết) | Frame (khung) | MAC Address (48 bit) | Ethernet, Wi-Fi · Switch |
| 1 | Physical (Vật lý) | Bit | — | Cáp, Hub, NIC, Repeater |

🔁 **Dừng lại tự kiểm tra**

*DNS hoạt động ở tầng mấy?*

<details>
<summary>Xem đáp án</summary>

DNS hoạt động ở **tầng 7 (Application)** — DNS định nghĩa giao thức truy vấn tên miền (query/response). Về transport, DNS thường dùng UDP cổng 53 (tầng 4), đi qua IP (tầng 3), Ethernet (tầng 2), dây vật lý (tầng 1). Nhưng bản thân giao thức DNS là tầng Application.

</details>

📝 **Tóm tắt mục 2**

- OSI có 7 tầng, từ vật lý (bit/tín hiệu) đến ứng dụng (HTTP, DNS...).
- Mỗi tầng có PDU riêng: Bit → Frame → Packet → Segment → Data.
- Mỗi tầng có địa chỉ riêng: MAC (tầng 2), IP (tầng 3), Port (tầng 4).
- OSI là mô hình tham chiếu — thực tế dùng TCP/IP.

---

## 3. Mô hình TCP/IP — 4 tầng thực tế

### 3.1. Vì sao TCP/IP thay thế OSI?

OSI ra đời năm 1984 như một chuẩn lý tưởng. Nhưng TCP/IP đã được phát triển và triển khai từ những năm 1970 trong mạng ARPANET (tiền thân Internet). Đến khi OSI hoàn thiện, TCP/IP đã thống trị — không ai muốn thay thế hệ thống đang chạy.

Ngoài ra, TCP/IP thực tế hơn: gộp tầng 5+6+7 của OSI thành một tầng Application, vì ranh giới giữa ba tầng này rất mờ trong thực tế.

### 3.2. Cấu trúc TCP/IP 4 tầng

\`\`\`
Tầng 4 — Application    (Ứng dụng)         ← Gộp OSI 5+6+7
Tầng 3 — Transport      (Vận chuyển)        ← = OSI tầng 4
Tầng 2 — Internet       (Mạng Internet)     ← = OSI tầng 3
Tầng 1 — Link / Network Access              ← Gộp OSI 1+2
\`\`\`

### 3.3. Ánh xạ OSI ↔ TCP/IP

\`\`\`
OSI (7 lớp)              TCP/IP (4 lớp)
─────────────────────    ─────────────────────
7. Application       ─┐
6. Presentation      ─┼── 4. Application
5. Session           ─┘
4. Transport         ──── 3. Transport
3. Network           ──── 2. Internet
2. Data Link         ─┐
1. Physical          ─┴── 1. Link (Network Access)
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

*"Khi nào cần dùng OSI, khi nào dùng TCP/IP?"*

- **Dùng OSI** khi phân tích, gỡ lỗi, học lý thuyết — OSI rất chi tiết và rõ ràng từng lớp.
- **Dùng TCP/IP** khi lập trình, cấu hình mạng thực tế, đọc tài liệu về Internet.
- Nhiều tài liệu kỹ thuật dùng "tầng 4" để chỉ Transport (cả trong OSI lẫn TCP/IP) — ngữ cảnh quyết định ý nghĩa.

*"TCP/IP có 5 tầng không? Mình thấy có người nói vậy."*

Một số tài liệu chia thành 5 tầng: Physical / Data Link / Network / Transport / Application (tách riêng Physical và Data Link). Đây là mô hình "lai" thực dụng. Cả 4-tầng và 5-tầng đều đúng trong ngữ cảnh của chúng — quan trọng là hiểu vai trò mỗi tầng.

📝 **Tóm tắt mục 3**

- TCP/IP gộp OSI 5+6+7 → Application; OSI 1+2 → Link.
- TCP/IP là mô hình thực tế của Internet.
- OSI là mô hình tham chiếu — dùng để phân tích và giảng dạy.

---

## 4. Đóng gói (Encapsulation) và gỡ gói (Decapsulation)

### 4.1. Khái niệm

💡 **Trực giác — analogy phong bì lồng nhau**

Hãy tưởng tượng bạn gửi một tờ giấy nhỏ. Mỗi tầng trong quá trình xử lý "bọc" nó thêm một lớp bì thư:

- Bạn viết thư (Application): chỉ có nội dung.
- Tầng Transport bỏ thư vào phong bì nhỏ, ghi "Từ cổng 54321 → Cổng 80".
- Tầng Network bỏ phong bì nhỏ vào phong bì lớn hơn, ghi "Từ IP 10.0.0.5 → 93.184.216.34".
- Tầng Data Link bọc vào túi bưu kiện, ghi "Từ MAC AA:BB → MAC CC:DD".
- Tầng Physical chuyển thành tín hiệu điện trên dây.

**Gỡ gói** là quá trình ngược: nhận được tín hiệu → phục hồi bit → bóc từng lớp bì thư, tầng nào đọc phần của tầng đó, rồi chuyển phần còn lại lên tầng trên.

### 4.2. Walk-through chi tiết — Gửi "Hello" từ laptop

**Bối cảnh**: Laptop A (IP: \`10.0.0.5\`, MAC: \`AA:BB:CC:DD:EE:01\`) gửi HTTP GET đến máy chủ B (IP: \`93.184.216.34\`, MAC của router: \`FF:EE:DD:CC:BB:01\`).

**Bước 1 — Tầng 7 Application tạo data:**
\`\`\`
[HTTP Request]
"GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n"
Kích thước: 38 byte
\`\`\`

**Bước 2 — Tầng 4 Transport thêm TCP header:**
\`\`\`
[TCP Header 20B][HTTP Data 38B]
TCP Header: Src Port=54321(2B) Dst Port=80(2B) Seq=1000(4B) Ack=0(4B) Flags=SYN(2B) Window=65535(2B) ...
Tổng: 20 + 38 = 58 byte
Tên PDU: Segment
\`\`\`

**Bước 3 — Tầng 3 Network thêm IP header:**
\`\`\`
[IP Header 20B][TCP Header 20B][HTTP Data 38B]
IP Header: Ver=4(1B) Src IP=10.0.0.5(4B) Dst IP=93.184.216.34(4B) TTL=64(1B) Proto=6/TCP(1B) ...
Tổng: 20 + 58 = 78 byte
Tên PDU: Packet
\`\`\`

**Bước 4 — Tầng 2 Data Link thêm Ethernet header + trailer:**
\`\`\`
[Eth Header 14B][IP Header 20B][TCP Header 20B][HTTP Data 38B][FCS 4B]
Eth Header: Dst MAC=FF:EE:DD:CC:BB:01(6B) Src MAC=AA:BB:CC:DD:EE:01(6B) Type=0x0800/IPv4(2B)
FCS: CRC-32 checksum 4 byte ở cuối
Tổng: 14 + 78 + 4 = 96 byte
Tên PDU: Frame
\`\`\`

**Bước 5 — Tầng 1 Physical chuyển thành bit:**
\`\`\`
96 byte × 8 = 768 bit
Truyền trên cáp Ethernet Cat6 ở 1 Gbps = 768 bit / 10^9 bit/s ≈ 768 nano giây
Tên PDU: Bit (stream)
\`\`\`

**Tổng kết kích thước:**

| Tầng | Thêm gì | Kích thước thêm | Tổng tích lũy |
|------|---------|----------------|---------------|
| Application | HTTP request | 38 B | 38 B |
| Transport | TCP header | +20 B | 58 B |
| Network | IP header | +20 B | 78 B |
| Data Link | Ethernet header + FCS | +14 + 4 = 18 B | 96 B |
| Physical | — (chỉ đổi dạng) | — | 768 bit |

**Phía nhận — Decapsulation (gỡ gói):**

Router đầu tiên nhận Frame → đọc MAC đích (tầng 2) → đúng MAC mình → bóc Ethernet header → đọc IP header (tầng 3) → xem IP đích → tra bảng định tuyến → bọc Frame mới với MAC mới → gửi tiếp. Máy chủ B nhận cuối cùng: bóc Ethernet → bóc IP → bóc TCP → nhận HTTP request → xử lý và trả về.

❓ **Câu hỏi tự nhiên của người đọc**

*"Router có đọc đến tầng Transport không?"*

Router thông thường (L3 router) chỉ đọc đến **tầng 3 (IP)** — tra bảng định tuyến theo IP đích, đổi Ethernet header rồi gửi đi. Router không đọc TCP header hay HTTP. Ngoại lệ: thiết bị **Firewall** hoặc **Load Balancer** tầng 7 có thể đọc đến HTTP để quyết định hành động.

*"Overhead của header có đáng kể không?"*

Với packet 38 byte HTTP, overhead là 58 byte (header chiếm 60%). Nghe nhiều, nhưng thực tế payload thường lớn hơn nhiều — ví dụ tải ảnh 1 MB, overhead 58 byte chỉ là 0.006%. Tuy nhiên với ứng dụng gửi nhiều gói nhỏ (gaming, VoIP), overhead có thể chiếm 20–50%.

🔁 **Dừng lại tự kiểm tra**

*Khi laptop gửi một gói tin, tầng nào thêm địa chỉ MAC đích? Địa chỉ MAC đích thay đổi ở đâu trong hành trình gói tin?*

<details>
<summary>Xem đáp án</summary>

**Tầng 2 (Data Link)** thêm địa chỉ MAC vào Ethernet header.

Quan trọng: **MAC đích thay đổi tại mỗi router** dọc đường đi, còn **IP đích giữ nguyên** từ đầu đến cuối.

- Laptop → Router đầu: Frame có MAC đích = MAC của Router đầu.
- Router đầu → Router giữa: Frame mới, MAC đích = MAC của Router giữa.
- Router cuối → Máy chủ: Frame có MAC đích = MAC của Máy chủ.

Lý do: MAC chỉ có ý nghĩa trong cùng một LAN (segment mạng). Mỗi lần qua router = qua một LAN mới → MAC mới.

</details>

📝 **Tóm tắt mục 4**

- Đóng gói: mỗi tầng thêm header (và trailer ở tầng 2) bao quanh data từ tầng trên.
- Thứ tự: Data → Segment (+ TCP header) → Packet (+ IP header) → Frame (+ Eth header/FCS) → Bit.
- Ví dụ: 38 byte HTTP → 96 byte frame → 768 bit trên dây.
- Gỡ gói: chiều ngược lại, mỗi tầng đọc và bóc phần header của mình.
- MAC thay đổi tại mỗi router; IP giữ nguyên từ nguồn đến đích.

---

## 5. PDU và địa chỉ mỗi tầng

### 5.1. PDU (Protocol Data Unit — Đơn vị dữ liệu giao thức)

PDU là tên gọi cho "đơn vị dữ liệu" tại mỗi tầng — bao gồm header của tầng đó cộng toàn bộ phần bên trong.

| Mô hình TCP/IP | Mô hình OSI | PDU | Ví dụ header kích thước |
|---------------|-------------|-----|------------------------|
| Application | Application/Presentation/Session | Message / Data | HTTP header: ~200–800 byte |
| Transport | Transport | Segment (TCP) / Datagram (UDP) | TCP: 20 byte; UDP: 8 byte |
| Internet | Network | Packet (gói tin) | IPv4: 20 byte; IPv6: 40 byte |
| Link | Data Link + Physical | Frame (khung) → Bit | Ethernet header: 14 byte + FCS: 4 byte |

### 5.2. Địa chỉ mỗi tầng

| Tầng | Loại địa chỉ | Độ dài | Phạm vi | Ví dụ |
|------|-------------|--------|---------|-------|
| Application | URL, tên miền | Biến | Toàn cầu | \`https://example.com/page\` |
| Transport | Port Number | 16 bit (0–65535) | Trên mỗi máy | Cổng 443 (HTTPS), 80 (HTTP), 22 (SSH) |
| Network | IP Address | IPv4: 32 bit; IPv6: 128 bit | Toàn cầu | \`93.184.216.34\`, \`2606:2800:220:1:248:1893:25c8:1946\` |
| Data Link | MAC Address | 48 bit (6 byte) | Trong LAN | \`AA:BB:CC:DD:EE:FF\` (3 byte OUI của nhà sản xuất + 3 byte serial) |

⚠ **Lỗi thường gặp — nhầm IP và MAC**

- **IP** là địa chỉ logic, có thể thay đổi (DHCP cấp IP khác mỗi lần kết nối).
- **MAC** là địa chỉ vật lý, gắn vào card mạng (NIC) từ nhà sản xuất — thường cố định, nhưng có thể giả mạo (MAC spoofing).
- Phạm vi: MAC chỉ có ý nghĩa trong LAN; IP có ý nghĩa toàn cầu.
- Kiểm tra trên máy: lệnh \`ip addr\` (Linux/Mac) hoặc \`ipconfig /all\` (Windows) hiển thị cả IP lẫn MAC.

### 5.3. Cổng (Port) phổ biến cần nhớ

| Cổng | Giao thức | Mô tả |
|------|-----------|-------|
| 20, 21 | FTP | Truyền file (data và điều khiển) |
| 22 | SSH | Đăng nhập từ xa bảo mật |
| 25 | SMTP | Gửi email |
| 53 | DNS | Phân giải tên miền (UDP và TCP) |
| 67, 68 | DHCP | Cấp phát IP tự động (server/client) |
| 80 | HTTP | Web không mã hóa |
| 110 | POP3 | Nhận email |
| 143 | IMAP | Nhận email (đồng bộ hóa) |
| 443 | HTTPS | Web có mã hóa TLS |
| 3306 | MySQL | Cơ sở dữ liệu |
| 5432 | PostgreSQL | Cơ sở dữ liệu |

🔁 **Dừng lại tự kiểm tra**

*Bạn chạy lệnh \`ssh user@192.168.1.100\`. Xác định: tầng Application, Transport, Network, và Link đang làm gì?*

<details>
<summary>Xem đáp án</summary>

- **Application (Tầng 7/4)**: Giao thức SSH — mã hóa phiên đăng nhập, xác thực user.
- **Transport (Tầng 4/3)**: TCP — kết nối đến cổng 22 của máy đích. Đảm bảo các lệnh gõ đến đúng thứ tự và không mất.
- **Network (Tầng 3/2)**: IP — định tuyến gói tin đến địa chỉ \`192.168.1.100\`.
- **Link (Tầng 2/1)**: Ethernet hoặc Wi-Fi — đóng gói thành frame, gửi đến router hoặc trực tiếp đến máy đích trong LAN (dùng ARP để tìm MAC của \`192.168.1.100\`).

</details>

📝 **Tóm tắt mục 5**

- PDU: Message → Segment/Datagram → Packet → Frame → Bit.
- Địa chỉ: URL (ứng dụng) → Port (transport) → IP (network) → MAC (link).
- IP là địa chỉ logic (thay đổi được); MAC là địa chỉ vật lý (gắn vào NIC).
- Cổng quan trọng: 22 (SSH), 53 (DNS), 80 (HTTP), 443 (HTTPS).

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1:** Liệt kê tầng OSI (số và tên) mà mỗi giao thức/thiết bị sau thuộc về:
(a) HTTPS  (b) Switch  (c) UDP  (d) Router  (e) ARP  (f) Hub  (g) TLS

**Bài 2:** Một gói tin HTTP (payload 500 byte) được gửi qua mạng. Tính kích thước frame Ethernet cuối cùng (giả sử dùng IPv4, TCP, Ethernet chuẩn — không có option nào).

**Bài 3:** Giải thích: tại sao địa chỉ MAC đích *thay đổi* ở mỗi router trong khi địa chỉ IP đích *không thay đổi* trên toàn bộ hành trình gói tin?

**Bài 4:** Ánh xạ các tầng TCP/IP sang OSI:
(a) Tầng Application của TCP/IP tương ứng với tầng nào của OSI?
(b) Tầng Link của TCP/IP tương ứng với tầng nào của OSI?
(c) Tầng Internet của TCP/IP tương ứng với tầng nào của OSI?

**Bài 5:** Bạn đang gỡ lỗi kết nối. Ping thành công (có trả lời) nhưng không vào được web (HTTP timeout). Vấn đề nằm ở tầng nào? Giải thích.

**Bài 6:** Một frame Ethernet tối thiểu phải có 64 byte (payload tối thiểu 46 byte). Nếu HTTP request chỉ có 10 byte, frame sẽ có kích thước bao nhiêu? Điều gì xảy ra với phần còn thiếu?

### Lời giải chi tiết

**Bài 1:**

| Giao thức/Thiết bị | Tầng OSI | Lý do |
|--------------------|----------|-------|
| (a) HTTPS | Tầng 7 (Application) | Giao thức ứng dụng web có mã hóa (HTTP + TLS) |
| (b) Switch | Tầng 2 (Data Link) | Đọc địa chỉ MAC để chuyển frame |
| (c) UDP | Tầng 4 (Transport) | Giao thức vận chuyển không kết nối |
| (d) Router | Tầng 3 (Network) | Đọc địa chỉ IP để định tuyến gói tin |
| (e) ARP | Tầng 2-3 (ranh giới) | Ánh xạ IP → MAC; thường phân vào tầng 2 |
| (f) Hub | Tầng 1 (Physical) | Khuếch đại và phân phối bit, không đọc địa chỉ |
| (g) TLS | Tầng 6 (Presentation) | Mã hóa data (theo phân loại OSI thuần túy) |

**Bài 2:** Tính kích thước frame Ethernet:

\`\`\`
Bước 1 — Xác định các header:
- HTTP payload: 500 byte
- TCP header (không option): 20 byte
- IP header IPv4 (không option): 20 byte
- Ethernet header: 14 byte (MAC dst 6B + MAC src 6B + EtherType 2B)
- FCS (Frame Check Sequence): 4 byte

Bước 2 — Tính tổng:
Tổng = 14 + 20 + 20 + 500 + 4 = 558 byte

Bước 3 — Kiểm tra giới hạn:
Ethernet tối đa payload = 1500 byte (MTU). TCP + IP + HTTP = 20 + 20 + 500 = 540 byte < 1500 → không cần phân mảnh.
Tối thiểu 64 byte → 558 > 64 → không cần padding.

Kết quả: Frame Ethernet = 558 byte
\`\`\`

**Bài 3:** Giải thích MAC thay đổi, IP không thay đổi:

Địa chỉ MAC chỉ có ý nghĩa trong *cùng một mạng cục bộ (LAN)*. Khi gói tin đến router, router làm 3 việc:

1. Bóc Ethernet header (tầng 2) — đọc IP đích trong header IP (tầng 3).
2. Tra bảng định tuyến theo IP đích → biết cổng ra và IP của router tiếp theo (next-hop).
3. Dùng ARP để tìm MAC của next-hop → tạo Ethernet header *mới* với MAC đích = MAC của next-hop.

IP đích không bao giờ bị thay đổi bởi router thông thường (chỉ NAT mới đổi IP). Router chỉ đọc IP để quyết định đường đi, nhưng không sửa nó.

Tóm lại: MAC = "địa chỉ trong xóm" (thay đổi mỗi đoạn đường). IP = "địa chỉ thành phố" (không đổi từ nguồn đến đích).

**Bài 4:** Ánh xạ TCP/IP ↔ OSI:

\`\`\`
(a) Tầng Application (TCP/IP)  →  Tầng 5 + 6 + 7 (OSI)
    Bao gồm Session, Presentation, Application của OSI.
    Ví dụ: HTTP thuộc cả ba tầng 5/6/7 của OSI đều gộp vào Application của TCP/IP.

(b) Tầng Link / Network Access (TCP/IP)  →  Tầng 1 + 2 (OSI)
    Bao gồm Physical và Data Link của OSI.
    Ví dụ: Ethernet frame (tầng 2 OSI) và tín hiệu điện trên cáp (tầng 1 OSI).

(c) Tầng Internet (TCP/IP)  →  Tầng 3 Network (OSI)
    Tương ứng trực tiếp 1-1.
    Ví dụ: IP, ICMP, OSPF đều ở tầng 3 OSI = tầng Internet TCP/IP.
\`\`\`

**Bài 5:** Phân tích tầng lỗi:

\`\`\`
Ping thành công → ICMP hoạt động → tầng 3 (Network/IP) hoạt động bình thường.
HTTP timeout → tầng 7 (Application/HTTP) không hoạt động.

Vậy vấn đề nằm ở tầng 4, 5, 6, hoặc 7 — cụ thể hơn:

Bước debug:
1. Thử telnet/nc đến cổng 80: \`nc -zv <IP> 80\`
   - Nếu kết nối TCP thành công → tầng 4 (TCP) OK → vấn đề ở tầng 7 (HTTP/ứng dụng web).
   - Nếu kết nối TCP thất bại → vấn đề ở tầng 4 (firewall chặn TCP cổng 80, hoặc server không lắng nghe).
2. Nếu tầng 7 lỗi: kiểm tra web server có đang chạy không, cấu hình virtual host, giấy phép file...

Kết luận: Ping OK → tầng 1, 2, 3 bình thường. HTTP lỗi → tầng 4–7 có vấn đề, cần thu hẹp thêm.
\`\`\`

**Bài 6:** Frame Ethernet với payload nhỏ:

\`\`\`
HTTP 10 byte → TCP header 20B → IP header 20B → Total IP payload: 50 byte
Ethernet payload (IP datagram): 50 byte
Ethernet tối thiểu payload: 46 byte
50 byte > 46 byte → KHÔNG cần padding.

Kết quả frame: 14 (Ethernet header) + 50 (IP+TCP+HTTP) + 4 (FCS) = 68 byte.

Nếu payload chỉ có 1 byte HTTP:
TCP+IP+HTTP = 20+20+1 = 41 byte < 46 byte → Ethernet thêm PADDING (byte 0x00) cho đủ 46 byte.
Frame: 14 + 46 (41 byte thực + 5 byte padding) + 4 = 64 byte (đúng giới hạn tối thiểu).
\`\`\`

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — Tầng liên kết & Ethernet](../lesson-02-link-ethernet/) — đi sâu vào hoạt động của Switch, Ethernet, MAC address, CSMA/CD.
- **Tham khảo chéo**: Để hiểu sâu hơn về địa chỉ IP và phân mảnh mạng, xem [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/).

---

## 📝 Tổng kết Lesson 01

1. **Phân tầng giải quyết độ phức tạp** của mạng máy tính — mỗi tầng phụ trách đúng một vấn đề, thay thế độc lập.
2. **OSI 7 tầng**: Physical → Data Link → Network → Transport → Session → Presentation → Application. Đây là mô hình tham chiếu.
3. **TCP/IP 4 tầng**: Link → Internet → Transport → Application. Đây là mô hình thực tế của Internet.
4. **Đóng gói**: Data → +TCP header → +IP header → +Ethernet header/FCS → Bit. Mỗi bước thêm overhead.
5. **PDU**: Bit / Frame / Packet / Segment / Message. **Địa chỉ**: MAC (tầng 2) / IP (tầng 3) / Port (tầng 4).
6. **Quy tắc vàng**: MAC thay đổi tại mỗi router; IP giữ nguyên từ nguồn đến đích.

**Tiếp theo**: [Lesson 02 — Tầng liên kết & Ethernet](../lesson-02-link-ethernet/)
`;
