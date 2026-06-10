// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/03-Advanced-Operations/lesson-04-qos/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — QoS & Quản lý lưu lượng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu 4 chỉ số chất lượng mạng: độ trễ (latency), độ rung trễ (jitter), băng thông (bandwidth), tỷ lệ mất gói (packet loss) — định nghĩa đầy đủ, ý nghĩa thực tế, và cách đo.
- Giải thích vì sao cần QoS (Quality of Service) và sự khác biệt giữa best-effort và có ưu tiên.
- Phân biệt các cơ chế đánh dấu (DSCP/ToS) và hàng đợi (FIFO, Priority Queue, WFQ).
- Phân tích token bucket và leaky bucket qua walk-through bằng số.
- Nhận biết bufferbloat và AQM (Active Queue Management), liên hệ TCP congestion control.
- Giải 5+ bài tập tính toán về jitter, token bucket, chọn hàng đợi, đánh giá VoIP.

## Kiến thức tiền đề

- [Lesson 08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — TCP congestion control, cửa sổ trượt, SEQ/ACK.

---

## 1. Bốn chỉ số chất lượng mạng

### 1.1. Độ trễ (Latency)

**(a) Là gì**: Thời gian để một gói tin (packet) đi từ điểm A đến điểm B, tính bằng **mili-giây (ms)**. Thường đo bằng RTT (Round-Trip Time) — gửi đi và nhận phản hồi — rồi lấy RTT/2 cho một chiều.

**(b) Vì sao cần**: Latency quyết định "cảm giác nhanh/chậm" trong các tác vụ đòi hỏi phản hồi tức thời: game online, điện thoại VoIP, video call. Latency cao = giọng nói bị trễ, người kia nói xong mình mới nghe.

**(c) Ví dụ số cụ thể**:

| Kịch bản | Latency điển hình |
|----------|------------------|
| Trong LAN (cùng switch) | 0.1 – 1 ms |
| Việt Nam → Hà Nội (cáp quang) | 5 – 20 ms |
| Việt Nam → Mỹ (cáp quang ngầm biển) | 150 – 200 ms |
| Vệ tinh địa tĩnh (GEO) | 550 – 700 ms |
| Vệ tinh LEO (Starlink) | 20 – 50 ms |

Ngưỡng chấp nhận: VoIP < 150 ms một chiều (ITU G.114); game online < 80 ms; game FPS cạnh tranh < 30 ms.

💡 **Trực giác**: Latency giống như quãng đường từ nhà đến siêu thị. Dù con đường rộng (băng thông lớn) mà xa (latency cao) thì lần đầu tiên vẫn mất nhiều thời gian đến nơi.

❓ **Câu hỏi tự nhiên**:
- *"Tốc độ ánh sáng giới hạn latency như thế nào?"* → Cáp quang truyền ~2/3 tốc độ ánh sáng ≈ 200.000 km/s. Hà Nội–New York ≈ 14.000 km → latency vật lý tối thiểu ≈ 70 ms một chiều. Thực tế cao hơn do định tuyến (routing) vòng và xử lý ở thiết bị mạng.
- *"Ping thấp nhưng download chậm — tại sao?"* → Đó là 2 thứ khác nhau: ping đo latency, download phụ thuộc băng thông (xem mục 1.3).

### 1.2. Độ rung trễ (Jitter)

**(a) Là gì**: Sự biến động (variance) của latency giữa các gói tin liên tiếp trong cùng một luồng (flow). Đơn vị ms. Nếu gói 1 đến sau 20 ms, gói 2 sau 35 ms, gói 3 sau 18 ms → jitter cao dù latency trung bình là 24 ms.

**(b) Vì sao cần**: Jitter ảnh hưởng nghiêm trọng đến audio/video real-time. VoIP chia âm thanh thành các gói 20 ms mỗi gói; nếu jitter > 20 ms, gói đến không đều → tiếng nói bị rách, gián đoạn, khó nghe. Để đối phó, receiver dùng **jitter buffer** (đệm jitter) — giữ lại gói vài ms rồi phát đều, nhưng tăng latency tổng.

**(c) Ví dụ số**:

Dãy thời gian đến (inter-arrival time) của 5 gói: 20 ms, 22 ms, 18 ms, 35 ms, 19 ms.

Jitter trung bình (theo RFC 3550 — dùng trong RTP/VoIP):
\`\`\`
J[i] = J[i-1] + (|D[i] - D[i-1]| - J[i-1]) / 16
\`\`\`
Dạng đơn giản hơn: mean absolute deviation của inter-arrival time.
- Giá trị trung bình: (20+22+18+35+19)/5 = 22.8 ms
- Deviation: |20−22.8| + |22−22.8| + |18−22.8| + |35−22.8| + |19−22.8| = 2.8+0.8+4.8+12.2+3.8 = 24.4
- Jitter = 24.4/5 = **4.88 ms**

Ngưỡng chấp nhận VoIP: jitter < 30 ms (sau jitter buffer). Gói 4 (35 ms) là outlier, gây rách tiếng nhẹ.

💡 **Trực giác**: Jitter giống xe buýt đến không đều — đôi khi 5 phút, đôi khi 30 phút. Dù tuyến đường (latency trung bình) không xa, sự không đều tạo ra trải nghiệm tệ.

⚠ **Lỗi thường gặp**: Nhầm jitter với latency. Latency cao nhưng ổn định (ví dụ 200 ms đều) tốt hơn latency thấp nhưng không đều (50 ms lúc được lúc mất). VoIP cần jitter thấp hơn là latency thấp.

🔁 **Tự kiểm tra**: Dãy inter-arrival: 10, 10, 10, 40, 10 (ms). Tính jitter mean absolute deviation.
<details>
<summary>Đáp án</summary>
Trung bình = (10+10+10+40+10)/5 = 16 ms. Deviation = 6+6+6+24+6 = 48. Jitter = 48/5 = 9.6 ms. Gói thứ 4 bị trễ 40 ms sẽ gây tiếng nói bị gián đoạn nhỏ với jitter buffer cỡ 20 ms.
</details>

### 1.3. Băng thông (Bandwidth)

**(a) Là gì**: Lượng dữ liệu tối đa có thể truyền qua liên kết (link) trong một đơn vị thời gian. Đơn vị **Mbps** (Megabit per second) hoặc Gbps. Đây là **công suất** (capacity) của đường truyền, không phải tốc độ thực tế đạt được (throughput).

**(b) Vì sao cần**: Băng thông quyết định "đường có rộng không". Download file lớn, stream 4K video, sao lưu dữ liệu cần băng thông cao. Thiếu băng thông → nhiều người dùng cùng lúc gây nghẽn.

**(c) Ví dụ số**:

| Loại liên kết | Băng thông |
|---------------|-----------|
| ADSL cũ | 8 Mbps xuống / 1 Mbps lên |
| Cáp quang FTTH Việt Nam | 100–1000 Mbps |
| Đường trục ISP (backbone) | 10–400 Gbps |
| WiFi 802.11ac (lý thuyết) | 1.3 Gbps |
| Cáp nội bộ Gigabit Ethernet | 1000 Mbps |

Thực tế: stream Netflix 4K cần 25 Mbps; cuộc gọi VoIP G.711 cần 64–80 Kbps (với header là ~87 Kbps).

❓ **Câu hỏi tự nhiên**: *"Băng thông 100 Mbps mà download chỉ được 8 MB/s — tại sao?"* → 100 Mbps = 100 Megabit/s ÷ 8 = **12.5 MB/s** lý thuyết. Thực tế 8 MB/s = 64 Mbps (overhead giao thức, TCP window, server giới hạn...) là hoàn toàn bình thường. Đây không phải lỗi.

### 1.4. Tỷ lệ mất gói (Packet Loss)

**(a) Là gì**: Tỷ lệ phần trăm gói tin bị mất trên đường truyền. Nguyên nhân: buffer router đầy, lỗi vật lý, nhiễu WiFi, congestion.

**(b) Vì sao cần**: Mất gói ảnh hưởng khác nhau tùy ứng dụng:
- TCP: phát lại → giảm throughput, tăng latency (đợi timeout hoặc 3 dup ACK).
- VoIP/RTP (UDP): không phát lại, gói mất = mất tiếng trong khoảng thời gian đó → tiếng rè, gián đoạn.
- Video streaming: chấp nhận mất gói thấp nếu có FEC (Forward Error Correction).

**(c) Ví dụ số**:

Gửi 1000 gói, receiver nhận được 995 → packet loss = (1000−995)/1000 = **0.5%**.

Ngưỡng chấp nhận:
- VoIP: < 1% (tốt); 1–5% (chấp nhận được nhưng nghe rõ suy giảm); > 5% (tệ).
- TCP file transfer: < 0.1% (tốt); > 1% throughput giảm mạnh (TCP giảm cửa sổ liên tục).

📝 **Tóm tắt mục 1**:
- **Latency**: thời gian gói đi từ A→B (ms). VoIP < 150 ms.
- **Jitter**: biến động latency giữa các gói liên tiếp (ms). VoIP < 30 ms.
- **Bandwidth**: dung lượng tối đa của link (Mbps). Phụ thuộc loại kết nối vật lý.
- **Packet loss**: % gói mất. VoIP < 1%; TCP chịu đựng kém hơn.
- Ứng dụng nhạy: VoIP/video call → jitter + latency. Tải file → bandwidth. Gaming → latency.

---

## 2. Vì sao cần QoS?

### 2.1. Vấn đề link chia sẻ

Trong mạng thực tế, nhiều thiết bị và nhiều ứng dụng chia sẻ cùng một đường truyền (link). Khi tổng lưu lượng vượt quá dung lượng link → **congestion** (tắc nghẽn) → gói bị giữ trong hàng đợi (queue) → latency tăng → nếu queue đầy, gói bị drop.

💡 **Ví dụ cụ thể**: Văn phòng 50 người, router có uplink 100 Mbps. Vào buổi sáng:
- 10 người stream YouTube 4K: 10 × 25 Mbps = **250 Mbps** (đã vượt!).
- 20 người họp Zoom: 20 × 3 Mbps = 60 Mbps.
- 20 người download file: 20 × ? Mbps.

Không có QoS: tất cả tranh nhau bình đẳng → cuộc họp Zoom bị vỡ tiếng, YouTube giật, download chậm. **Với QoS**: Zoom được ưu tiên, YouTube bị giới hạn.

### 2.2. Best-effort vs có ưu tiên

**Best-effort (không QoS)**: mạng cố gắng truyền tất cả gói tin, nhưng không đảm bảo gì về thứ tự, thời gian, hay độ tin cậy. Mọi gói được đối xử như nhau (FIFO). Đây là mô hình mặc định của IP.

**QoS (có ưu tiên)**: phân loại traffic, gán mức ưu tiên, đảm bảo (hoặc ưu ái) cho traffic quan trọng. Có 3 loại đảm bảo:
- **Best-effort**: không cam kết gì.
- **Differentiated Services (DiffServ)**: phân loại, ưu tiên tương đối — phổ biến nhất.
- **Integrated Services (IntServ/RSVP)**: dành riêng tài nguyên cho mỗi luồng — phức tạp, ít dùng hiện nay.

### 2.3. Ứng dụng nào cần gì?

| Ứng dụng | Nhạy với | Ưu tiên QoS |
|----------|----------|-------------|
| VoIP (điện thoại IP) | Jitter < 30ms, Latency < 150ms, Loss < 1% | Cao nhất |
| Video call (Zoom, Meet) | Jitter + Latency + Loss | Cao |
| Game online | Latency < 50ms | Cao |
| Video streaming (Netflix) | Bandwidth (25 Mbps/4K), chịu được latency cao | Trung bình |
| Download file lớn | Bandwidth, chịu được latency | Thấp |
| Email, web browsing | Không nhạy lắm | Thấp nhất |

📝 **Tóm tắt mục 2**:
- Nhiều ứng dụng chia sẻ link → cần QoS để ưu tiên traffic quan trọng.
- Best-effort = không cam kết gì; DiffServ = ưu tiên tương đối; IntServ = dành riêng tài nguyên.
- VoIP/video call nhạy nhất với jitter và latency.

---

## 3. Phân loại và đánh dấu lưu lượng

### 3.1. DSCP / ToS — đánh dấu gói tin

**ToS (Type of Service)** là trường 1 byte trong header IPv4, sau đổi tên thành **DS (Differentiated Services)** field. 6 bit quan trọng nhất gọi là **DSCP (Differentiated Services Code Point)**.

**(a) Là gì**: Nhãn (label) được đặt trong header IP để đánh dấu mức ưu tiên của gói tin. Router đọc nhãn này để quyết định xử lý.

**(b) Vì sao cần**: Thay vì mỗi router phải phân tích deep-packet inspection tốn kém, gói đã được "dán nhãn" từ đầu. Router trung gian chỉ cần đọc 6 bit DSCP → quyết định hàng đợi → nhanh, đơn giản.

**(c) Ví dụ số**:

DSCP giá trị phổ biến:

| DSCP Decimal | DSCP Hex | PHB | Ý nghĩa | Ví dụ ứng dụng |
|:---:|:---:|:---:|---------|----------|
| 46 | 0x2E | EF (Expedited Forwarding) | Ưu tiên cao nhất, delay thấp | VoIP |
| 34 | 0x22 | AF41 | Video call | Zoom, Meet |
| 18 | 0x12 | AF21 | Dữ liệu quan trọng | Database |
| 10 | 0x0A | AF11 | Bulk data | Backup |
| 0  | 0x00 | BE (Best Effort) | Thông thường | HTTP, FTP |

Ví dụ: router biên (edge router) nhận gói VoIP từ IP phone → gán DSCP=46 (EF). Các router lõi chỉ đọc DSCP 46 → đặt vào hàng đợi EF có độ trễ thấp.

⚠ **Lỗi thường gặp**: Đánh dấu DSCP ở đầu nhưng router trung gian bỏ qua (reset về 0) → QoS vô hiệu. Phải cấu hình tất cả router trên đường đi tôn trọng DSCP, hoặc re-mark tại mỗi domain.

### 3.2. Hàng đợi ưu tiên (Queue)

Tại mỗi router/switch, khi nhiều gói cùng đợi ra một cổng (egress interface), chúng được đặt vào **hàng đợi (queue)**. Cơ chế hàng đợi quyết định thứ tự phục vụ.

#### FIFO (First In, First Out)

Không phân biệt: đến trước phục vụ trước. Gói VoIP quan trọng có thể bị kẹt sau 100 gói download. Đây là mặc định khi không cấu hình QoS.

#### Priority Queue (PQ)

Nhiều hàng đợi, mỗi hàng có độ ưu tiên. Hàng ưu tiên cao luôn được phục vụ trước; chỉ khi hàng cao trống mới phục vụ hàng thấp hơn.

**Walk-through Priority Queue**:

Cấu hình: 4 hàng đợi — P1 (VoIP, ưu tiên cao nhất), P2 (Video), P3 (Web), P4 (Bulk/Download).

Link output 10 Mbps. Tại thời điểm t:
- P1 có: 3 gói VoIP × 160 byte mỗi gói
- P2 có: 2 gói video × 1400 byte
- P3 có: 5 gói web × 1200 byte
- P4 có: 10 gói download × 1460 byte

Thứ tự phục vụ:
1. P1: Gói VoIP-1 (160B) → P1: VoIP-2 → P1: VoIP-3 (hết P1)
2. P2: Video-1 (1400B) → P2: Video-2 (hết P2)
3. P3: Web-1 ... Web-5 (hết P3)
4. P4: Download-1 ... Download-10

Kết quả: 3 gói VoIP được phục vụ ngay lập tức dù đường truyền đang bận. Gói Download đợi lâu nhất.

**Nhược điểm Priority Queue**: **Starvation** — nếu P1 và P2 liên tục có gói, P4 không bao giờ được phục vụ. Giải pháp: WFQ.

#### Weighted Fair Queue (WFQ)

Mỗi hàng đợi được phân bổ **tỷ lệ băng thông** (weight). Đảm bảo mọi luồng đều được phục vụ — không có starvation.

Ví dụ: Link 100 Mbps, 3 hàng:
- Hàng VoIP (weight 50%): đảm bảo 50 Mbps
- Hàng Video (weight 30%): đảm bảo 30 Mbps
- Hàng Bulk (weight 20%): đảm bảo 20 Mbps

Nếu VoIP chỉ dùng 10 Mbps, phần còn lại (40 Mbps) được chia cho hàng khác tỷ lệ 30:20. Bulk không bao giờ bị "chết đói".

📝 **Tóm tắt mục 3**:
- DSCP: 6 bit nhãn trong header IP, đánh dấu mức ưu tiên gói tin.
- FIFO: đơn giản, không ưu tiên. Priority Queue: ưu tiên cao nhất trước, có thể starvation. WFQ: đảm bảo tỷ lệ, không starvation.

---

## 4. Traffic Shaping vs Policing — Token Bucket

### 4.1. Vấn đề cần giải quyết

Một client được cấp gói internet 10 Mbps. Nếu client gửi burst 100 Mbps trong 2 giây → ISP cần kiểm soát: cho qua với tốc độ giới hạn (shaping) hay drop gói vượt (policing)?

### 4.2. Token Bucket — walk-through bằng số

💡 **Trực giác**: Hình dung một cái thùng (bucket) đựng "token" (phiếu gửi gói). Mỗi token cho phép gửi 1 byte (hoặc 1 gói, tùy cấu hình). Token được đổ vào thùng theo tốc độ cố định (token rate). Gói muốn đi qua phải lấy token; nếu không có token → phải đợi (shaping) hoặc bị drop (policing).

**Tham số**:
- **Token rate r**: tốc độ đổ token vào bucket (byte/s). Tương ứng với **tốc độ trung bình** cho phép.
- **Bucket size B**: sức chứa tối đa của bucket (byte). Cho phép burst tối đa B byte trong một lần.

**Walk-through chi tiết**:

Cấu hình: r = 1,000,000 byte/s (= 8 Mbps), B = 50,000 byte.

| Thời gian (s) | Token trước | Token được đổ | Gói đến | Kích thước gói | Token tiêu | Token sau | Quyết định |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 50,000 | 0 | Gói A | 40,000 byte | 40,000 | 10,000 | Cho qua |
| 0 | 10,000 | 0 | Gói B | 15,000 byte | — | 10,000 | Giữ lại (thiếu 5,000 token) |
| 0.005 | 10,000 | 5,000 | — | — | — | 15,000 | (đổ token, chưa có gói) |
| 0.005 | 15,000 | 0 | Gói B | 15,000 byte | 15,000 | 0 | Cho qua |
| 1 | 0 | 1,000,000 → giới hạn B=50,000 | Gói C | 30,000 byte | 30,000 | 20,000 | Cho qua |

**Giải thích**:
- t=0: bucket đầy (50,000 token). Gói A = 40,000 byte → rút 40,000 token → còn 10,000.
- Gói B = 15,000 byte → cần 15,000 token nhưng chỉ có 10,000 → **bị giữ lại** (shaping) hoặc drop (policing).
- Sau 5 ms: r × 0.005 = 5,000 token được đổ thêm → tổng 15,000 → Gói B đủ token → **cho qua**.
- Sau 1 giây: r × 1 = 1,000,000 token muốn đổ, nhưng bucket chỉ chứa tối đa B=50,000 → **bucket chỉ đầy 50,000**. Tốc độ tức thời có thể đạt 50,000 byte / RTT nếu burst.

**Kết luận token bucket**:
- Cho phép **burst ngắn** đến B byte.
- Tốc độ **trung bình dài hạn** bị giới hạn ở r byte/s.
- Shaping: giữ gói trong buffer đợi token. Policing: drop gói thiếu token.

### 4.3. Leaky Bucket

💡 **Trực giác**: Hình dung thùng có lỗ hổng ở đáy. Nước (gói tin) đổ vào từ bất kỳ tốc độ nào, nhưng chảy ra ở tốc độ cố định r. Nếu thùng đầy → nước tràn (gói bị drop).

**Khác với token bucket**:
- Leaky bucket: output luôn **đều đặn** tốc độ r, không cho phép burst.
- Token bucket: cho phép **burst** tối đa B byte, tốc độ trung bình bị giới hạn r.

**Khi nào dùng leaky bucket**: khi cần output hoàn toàn đều (ví dụ gửi gói VoIP 20 ms/gói đều đặn). Khi nào dùng token bucket: khi chấp nhận burst ngắn (ví dụ web request đột ngột).

❓ **Câu hỏi tự nhiên**: *"Shaping và policing khác nhau như thế nào?"*
- **Shaping**: gói vượt hạn mức → **đưa vào buffer** chờ token, sau đó gửi. Giữ gói, tăng latency, không mất gói.
- **Policing**: gói vượt hạn mức → **drop ngay hoặc re-mark DSCP thấp hơn** (out-of-profile). Không buffer, không tăng latency, nhưng mất gói.

Shaping dùng ở edge (phía client). Policing dùng ở ISP/network perimeter.

📝 **Tóm tắt mục 4**:
- Token bucket: r (token rate) + B (bucket size). Cho phép burst ≤ B, tốc độ trung bình ≤ r.
- Leaky bucket: output đều đặn r, không burst. Thùng đầy → drop.
- Shaping: buffer gói vượt, gửi sau. Policing: drop/re-mark gói vượt.

---

## 5. Tránh tắc nghẽn — Bufferbloat và AQM

### 5.1. Bufferbloat là gì?

**(a) Là gì**: Hiện tượng router/modem có buffer (hàng đợi) quá lớn. Khi link bị congestion, buffer lớn cho phép rất nhiều gói đợi → tất cả gói đều bị delay cao thay vì một số bị drop → **latency tăng vọt** (hàng trăm ms đến vài giây) dù kết nối "không mất gói".

**(b) Vì sao nguy hiểm**:
- TCP điều chỉnh tốc độ gửi dựa trên tín hiệu mất gói hoặc ECN (Explicit Congestion Notification). Nếu buffer lớn và không drop → TCP không nhận được tín hiệu → tiếp tục gửi → buffer ngày càng đầy → latency leo thang.
- Trong thực tế: tải file lớn làm lag game, Zoom bị vỡ tiếng trên cùng đường ADSL — đây là bufferbloat.

**(c) Ví dụ số**:

Router có buffer 1 MB (= 8 Mbit) trên link 8 Mbps:
- Thời gian để tống hết buffer: 8 Mbit / 8 Mbps = **1 giây**.
- Gói VoIP bị kẹt ở cuối buffer sẽ đến trễ 1 giây → cuộc gọi không thể dùng được.

Với buffer hợp lý 50 KB trên link 8 Mbps: thời gian hết buffer = 0.4 Mbit / 8 Mbps = **50 ms** — chấp nhận được.

### 5.2. AQM — Active Queue Management

Thay vì đợi buffer đầy mới drop (tail-drop — mặc định FIFO), AQM **chủ động drop gói trước khi buffer đầy** để gửi tín hiệu congestion sớm cho TCP.

**RED (Random Early Detection)**:
- Theo dõi mức hàng đợi trung bình (average queue length).
- Khi hàng đợi > ngưỡng min (ví dụ 30%): bắt đầu random drop với xác suất tăng dần.
- Khi hàng đợi > ngưỡng max (ví dụ 70%): drop tất cả gói (như tail-drop).

Ví dụ RED với min=30 gói, max=60 gói (buffer = 100 gói):
- Hàng đợi 25 gói: không drop.
- Hàng đợi 40 gói: drop random với $p = \\frac{40-30}{60-30} \\times p_{\\max} = 0.33 \\times 0.1 = 0.033$ → **3.3%** ($p_{\\max}$ điển hình = 10%).
- Hàng đợi 60 gói: drop p = **10%**.
- Hàng đợi > 60 gói: drop **100%** (tail drop).

**Liên hệ TCP congestion control**: Khi RED drop gói, TCP sender nhận tín hiệu (timeout hoặc 3 dup ACK) → giảm cwnd (cửa sổ congestion) → giảm tốc độ gửi → giảm tải cho router. Xem chi tiết tại [Lesson 08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/).

**CoDel (Controlled Delay)** — cải tiến hơn RED:
- Theo dõi **thời gian đợi của gói** thay vì độ dài hàng đợi.
- Drop khi thời gian đợi > 5 ms liên tục 100 ms. Hiệu quả với bufferbloat.

📝 **Tóm tắt mục 5**:
- Bufferbloat: buffer quá lớn → latency vọt dù không mất gói. Khắc phục: giảm buffer hoặc dùng AQM.
- RED: random drop khi hàng đợi > ngưỡng, gửi tín hiệu congestion sớm cho TCP.
- AQM kết hợp TCP congestion control: RED drop → TCP giảm cwnd → giảm tải → ổn định hệ thống.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Tính jitter**:
Một luồng VoIP có 6 gói đến với inter-arrival time (ms): 20, 18, 22, 45, 19, 21.
(a) Tính jitter (mean absolute deviation).
(b) Jitter buffer cần cỡ bao nhiêu ms để không bị gián đoạn?
(c) Nhận xét chất lượng cuộc gọi.

**Bài 2 — Token bucket: gói qua hay bị giữ**:
Token bucket: r = 500,000 byte/s, B = 25,000 byte. Bucket hiện có 20,000 token.
Tại t=0, 4 gói đến liên tiếp (không có thời gian cho token đổ thêm):
- Gói 1: 8,000 byte
- Gói 2: 10,000 byte
- Gói 3: 6,000 byte
- Gói 4: 5,000 byte

Mỗi gói được cho qua hay bị giữ lại? Nếu shaping (không drop), sau bao lâu gói bị giữ được cho qua?

**Bài 3 — Chọn hàng đợi cho mix traffic**:
Một link WAN 50 Mbps cần phục vụ 3 loại traffic đồng thời:
- VoIP: 20 cuộc gọi G.711 × 87 Kbps = 1.74 Mbps. Yêu cầu: latency < 30 ms, jitter < 5 ms.
- Video họp: 10 Zoom × 3 Mbps = 30 Mbps. Yêu cầu: latency < 100 ms.
- Backup dữ liệu: còn lại. Không nhạy latency.

Thiết kế hàng đợi WFQ với weight phù hợp. Có đủ băng thông cho cả 3 loại không?

**Bài 4 — Bufferbloat**:
Router ADSL có link 10 Mbps, buffer 500 KB.
(a) Tính thời gian buffer bị lấp đầy (tính bằng ms) — đây là latency thêm vào worst case.
(b) Để latency thêm vào không vượt 50 ms, buffer nên tối đa bao nhiêu KB?
(c) Nếu có VoIP trên router này, giải thích điều gì sẽ xảy ra khi ai đó download file lớn đồng thời.

**Bài 5 — Đánh giá link đủ cho VoIP không**:
Công ty có văn phòng kết nối WAN 4 Mbps. Kế hoạch triển khai 30 máy điện thoại VoIP (codec G.729: 24 Kbps mỗi cuộc gọi kể cả overhead, tối đa 20 cuộc gọi đồng thời). Đồng thời có 10 nhân viên browsing web (ước tính trung bình 200 Kbps/người).
(a) Tính tổng băng thông cần cho VoIP và web.
(b) Link 4 Mbps có đủ không?
(c) Nếu không đủ, đề xuất giải pháp (không thay link).

**Bài 6 — RED threshold**:
Router cài RED: min=20 gói, max=80 gói, buffer=100 gói, p_max=0.1.
(a) Hàng đợi = 50 gói, tính xác suất drop một gói mới đến.
(b) Hàng đợi = 90 gói, quyết định là gì?
(c) Giải thích tại sao RED tốt hơn tail-drop cho TCP.

### Lời giải chi tiết

**Lời giải Bài 1**:

(a) Inter-arrival: 20, 18, 22, 45, 19, 21 ms.
Trung bình = (20+18+22+45+19+21)/6 = 145/6 = **24.17 ms**.
Deviation từng gói: |20−24.17|=4.17, |18−24.17|=6.17, |22−24.17|=2.17, |45−24.17|=20.83, |19−24.17|=5.17, |21−24.17|=3.17.
Tổng deviation = 41.68. Jitter = 41.68/6 = **6.95 ms**.

(b) Jitter buffer cần ít nhất **3 × jitter = 3 × 6.95 ≈ 21 ms** để hấp thụ biến động. Thực tế nên dùng 50 ms để có dự phòng với gói đột biến (gói 4 = 45 ms, cao gấp đôi trung bình).

(c) Nhận xét: jitter 6.95 ms < 30 ms (ngưỡng VoIP) → **chấp nhận được**. Tuy nhiên gói 4 (45 ms) là outlier đáng lo — nếu xảy ra thường xuyên hơn, chất lượng sẽ giảm. Nên cấu hình Priority Queue để đảm bảo VoIP không bị kẹt sau traffic khác.

---

**Lời giải Bài 2**:

r = 500,000 byte/s, B = 25,000 byte, bucket ban đầu = 20,000 token.

- **Gói 1 (8,000 byte)**: cần 8,000 token, có 20,000 → đủ → **cho qua**. Còn lại: 20,000 − 8,000 = 12,000.
- **Gói 2 (10,000 byte)**: cần 10,000, có 12,000 → đủ → **cho qua**. Còn lại: 12,000 − 10,000 = 2,000.
- **Gói 3 (6,000 byte)**: cần 6,000, có 2,000 → thiếu 4,000 → **bị giữ lại** (shaping).
  - Đợi: 4,000 token / 500,000 token per s = **0.008 s = 8 ms** → sau 8 ms, gói 3 được cho qua.
- **Gói 4 (5,000 byte)**: giả sử t=0 (không thêm token), có 2,000 token → thiếu 3,000 → **bị giữ lại**.
  - Nhưng nếu tính sau khi gói 3 vừa qua (bucket=0): đợi thêm 5,000/500,000 = **10 ms** từ lúc gói 3 vừa xử lý.

Tóm tắt: Gói 1, 2 qua ngay. Gói 3 đợi 8 ms. Gói 4 đợi 18 ms từ t=0.

---

**Lời giải Bài 3**:

Tổng cần: VoIP 1.74 Mbps + Video 30 Mbps + Backup = ? + 1.74 + 30 = 31.74 Mbps cố định + backup.

Link 50 Mbps: còn lại cho backup = 50 − 31.74 = **18.26 Mbps** (thoải mái).

Thiết kế WFQ:
- Hàng VoIP (weight 10%): đảm bảo 5 Mbps >> cần 1.74 Mbps (dư). Ưu tiên latency thấp.
- Hàng Video (weight 65%): đảm bảo 32.5 Mbps >> cần 30 Mbps (dư nhỏ).
- Hàng Backup (weight 25%): đảm bảo 12.5 Mbps tối thiểu; khi VoIP và Video không dùng hết, backup hưởng thêm.

**Có đủ không**: Có, 31.74 Mbps < 50 Mbps. Nhưng video họp 30 Mbps = 60% link → cần đảm bảo weight ≥ 65% cho video.

Lưu ý thực tế: nên kết hợp Priority Queue cho VoIP (để đảm bảo latency < 30 ms) và WFQ cho video + backup.

---

**Lời giải Bài 4**:

(a) Buffer 500 KB = 500 × 8 Kbit = 4,000 Kbit = 4 Mbit. Link 10 Mbps.
Thời gian lấp đầy buffer = 4 Mbit / 10 Mbps = **0.4 s = 400 ms**. Đây là latency thêm vào worst case.

(b) Muốn latency thêm ≤ 50 ms: buffer ≤ 10 Mbps × 0.05 s = 0.5 Mbit = 62.5 KB → buffer tối đa **62 KB**.

(c) Khi ai đó download file lớn: buffer bị lấp dần. Gói VoIP đến sau phải chờ hết buffer (có thể tới 400 ms) → latency VoIP = 20 ms bình thường + 400 ms buffer = **420 ms** → vượt ngưỡng ITU 150 ms → **cuộc gọi không sử dụng được được**. Giải pháp: cài Priority Queue hoặc AQM (CoDel/RED) kết hợp giảm buffer size.

---

**Lời giải Bài 5**:

(a) Tổng băng thông:
- VoIP tối đa: 20 cuộc × 24 Kbps = **480 Kbps**.
- Web: 10 người × 200 Kbps = **2,000 Kbps = 2 Mbps**.
- Tổng = 480 + 2,000 = **2,480 Kbps ≈ 2.48 Mbps**.

(b) Link 4 Mbps > 2.48 Mbps → **đủ về băng thông**. Tuy nhiên VoIP nhạy với latency/jitter — nếu không có QoS, web browsing đột biến có thể làm lag VoIP.

(c) Không cần thay link. Giải pháp: cài **Priority Queue** hoặc **WFQ**:
- VoIP: hàng ưu tiên cao nhất (480 Kbps đảm bảo, latency < 30 ms).
- Web: hàng thấp hơn, nhận phần còn lại.
Kết hợp traffic shaping (token bucket 480 Kbps cho VoIP) đảm bảo VoIP không dùng quá phần mình và web không "lấn" vào phần VoIP.

---

**Lời giải Bài 6**:

(a) Hàng đợi = 50 gói. Nằm trong khoảng [min=20, max=80].
Xác suất drop $= \\frac{\\text{avg\\_queue} - \\min}{\\max - \\min} \\times p_{\\max} = \\frac{50-20}{80-20} \\times 0.1 = \\frac{30}{60} \\times 0.1 = 0.5 \\times 0.1 = 0.05$ → **5%**.

(b) Hàng đợi = 90 gói > max = 80 → **drop tất cả (tail-drop trong vùng > max)**. Mọi gói mới đến đều bị drop 100%.

(c) Với tail-drop thuần (không AQM):
- Router đợi đến khi buffer đầy hẳn (100 gói) mới drop.
- Nhiều TCP connection đồng loạt nhận tín hiệu mất gói → tất cả đồng loạt giảm cwnd → **global synchronization**: bandwidth bị lãng phí do tất cả đồng loạt dừng.
- Với RED: drop ngẫu nhiên từ sớm → các TCP connection nhận tín hiệu **khác thời điểm** → không đồng bộ → không bị global synchronization → bandwidth được dùng đều hơn.

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — congestion control, cửa sổ trượt.
- **Bài tiếp theo**: [Lesson 05 — SDN & Ảo hóa mạng](../lesson-05-sdn-virtualization/) — Software Defined Networking, tách control plane/data plane, NFV.
- **Liên quan**: RFC 3550 (RTP/jitter), RFC 2205 (RSVP/IntServ), RFC 2474 (DiffServ/DSCP).

---

## 📝 Tổng kết Lesson 04

1. **4 chỉ số QoS**: Latency (ms) — thời gian truyền; Jitter (ms) — biến động latency; Bandwidth (Mbps) — dung lượng link; Packet Loss (%) — tỷ lệ mất gói. VoIP nhạy jitter + latency; tải file nhạy bandwidth.
2. **Vì sao cần QoS**: Link chia sẻ → congestion. Không ưu tiên → traffic quan trọng (VoIP) bị delay bởi traffic không quan trọng (backup).
3. **DSCP** đánh dấu gói (6 bit trong IP header). **Priority Queue** phục vụ hàng ưu tiên cao trước. **WFQ** đảm bảo tỷ lệ, không starvation.
4. **Token bucket** (r + B): cho phép burst ≤ B, tốc độ trung bình ≤ r. **Shaping**: buffer gói vượt. **Policing**: drop/re-mark gói vượt. Leaky bucket: output đều, không burst.
5. **Bufferbloat**: buffer quá lớn → latency tăng vọt dù không mất gói. **RED/AQM**: drop random sớm → báo hiệu TCP giảm tốc trước khi buffer đầy.
`;
