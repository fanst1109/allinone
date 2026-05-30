# Lesson 07 — Tầng giao vận: UDP

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vai trò của **tầng giao vận (Transport Layer)** — giao tiếp tiến-trình-tới-tiến-trình, phân biệt với IP (host-to-host).
- Nắm vững khái niệm **cổng (port)** — số 16-bit nhận dạng tiến trình trên host, khái niệm **socket** là cặp (địa chỉ IP, port).
- Đọc và phân tích **UDP datagram header** 8 byte (src port, dst port, length, checksum).
- Giải thích các đặc tính của UDP: connectionless, unreliable, no congestion control — và vì sao điều đó lại hữu ích.
- Phân biệt khi nào nên dùng UDP, khi nào nên dùng TCP (preview Lesson 08).

## Kiến thức tiền đề

- [Lesson 01 — Mô hình phân lớp](../lesson-01-layered-models/) — tầng giao vận nằm ở đâu trong stack OSI/TCP-IP.
- [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — địa chỉ IP host-to-host, nền tảng mà tầng giao vận xây lên.

---

## 1. Tầng giao vận làm gì

### 1.1. Vấn đề IP không giải quyết được

IP chuyển gói tin từ **máy này sang máy kia** (host-to-host). Nhưng trên một máy tính thực tế có hàng chục tiến trình (process) đang chạy đồng thời: trình duyệt web, ứng dụng chat, trình phát nhạc, game online... Khi gói tin từ Internet đến máy bạn, IP chỉ biết đích đến là máy bạn — nó **không biết** gói đó thuộc về tiến trình nào.

💡 **Hình dung**: Địa chỉ IP giống số địa chỉ tòa nhà — "27 Nguyễn Huệ, Q1, TP.HCM". Gói tin đến đúng tòa nhà rồi, nhưng tòa nhà có 200 phòng, không có thêm thông tin thì người đưa thư (IP) không biết gõ cửa phòng nào.

**Tầng giao vận** giải quyết đúng vấn đề này: thêm thông tin **số phòng** (port number) để gói tin đến đúng tiến trình.

### 1.2. Giao tiếp tiến-trình-tới-tiến-trình

```
Máy A                                    Máy B
┌─────────────────────┐                  ┌─────────────────────┐
│  Firefox (port 54321) │ ───────────────▶ │  Nginx  (port  80)  │
│  game.exe (port 55000)│                  │  DNS    (port  53)  │
│  discord  (port 56789)│                  │  SSH    (port  22)  │
└─────────────────────┘                  └─────────────────────┘
      IP: 10.0.0.5                              IP: 203.0.113.10
```

Khi Firefox trên máy A gửi request HTTP đến Nginx trên máy B:
- IP đảm bảo gói đi từ `10.0.0.5` → `203.0.113.10` (host-to-host).
- Tầng giao vận đảm bảo gói đến đúng port 80 trên máy B, không phải port 53 hay 22 (process-to-process).

❓ **Câu hỏi tự nhiên:**

*"Sao không cho IP thêm trường 'tiến trình' vào?"*
— Nguyên tắc phân lớp: mỗi lớp giải quyết một vấn đề. IP lo định tuyến (routing) giữa các mạng — đó đã là bài toán đủ phức tạp. Việc nhận dạng tiến trình thuộc bài toán khác, để tầng trên xử lý. Tách biệt này cho phép thay TCP bằng UDP mà không đụng đến IP.

*"Hai tiến trình trên cùng máy thì sao, có cần port không?"*
— Vẫn cần port nếu giao tiếp qua socket (loopback `127.0.0.1`). Cần port để phân biệt đích trong cùng host.

📝 **Tóm tắt mục 1**

- IP = host-to-host (máy đến máy), không phân biệt tiến trình.
- Tầng giao vận = process-to-process, thêm khái niệm port.
- Transport Layer là L4 trong mô hình TCP/IP (L4 OSI cũng vậy).

---

## 2. Cổng (Port) và Socket

### 2.1. Port là gì

**Port (cổng)** là số nguyên **16-bit** (0–65535), dùng để nhận dạng một dịch vụ hoặc tiến trình trên một host. Khi một tiến trình muốn nhận dữ liệu từ mạng, nó **bind** (đăng ký) một port với hệ điều hành — từ đó, mọi gói tin đến port đó sẽ được chuyển cho tiến trình đó.

💡 **Hình dung**: Port là số phòng trong tòa nhà (địa chỉ IP = tòa nhà). "Gói tin đến 203.0.113.10 cổng 80" = "thư gửi đến tòa nhà 203.0.113.10 phòng 80". Tòa nhà (hệ điều hành) nhận thư, nhìn số phòng, chuyển đúng cho tenant (tiến trình Nginx ở phòng 80).

### 2.2. Phân loại port

| Nhóm | Phạm vi | Quản lý | Mục đích |
|------|---------|---------|----------|
| **Well-known** | 0–1023 | IANA | Dịch vụ chuẩn (cần root để bind) |
| **Registered** | 1024–49151 | IANA | Ứng dụng đăng ký (không cần root) |
| **Ephemeral** | 49152–65535 | OS tự cấp | Port nguồn tạm thời cho client |

**Các well-known port quan trọng:**

| Port | Giao thức | Dịch vụ |
|------|-----------|---------|
| 20, 21 | TCP | FTP (truyền file) |
| 22 | TCP | SSH (shell từ xa) |
| 25 | TCP | SMTP (gửi email) |
| 53 | **UDP/TCP** | DNS (phân giải tên miền) |
| 67, 68 | **UDP** | DHCP (cấp IP tự động) |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS (HTTP + TLS) |
| 3478 | **UDP** | STUN/TURN (WebRTC, game) |
| 5353 | **UDP** | mDNS (Bonjour/Avahi) |

⚠ **Lỗi thường gặp**: nhiều người nghĩ port 53 DNS chỉ dùng UDP — thực ra DNS dùng UDP cho query thông thường (nhỏ, nhanh), nhưng chuyển sang TCP khi response lớn hơn 512 byte (zone transfer, DNSSEC) hoặc khi client yêu cầu. Một server DNS phải lắng nghe cả hai.

### 2.3. Ephemeral port — port nguồn của client

Khi bạn mở trình duyệt và kết nối đến `203.0.113.10:80`, hệ điều hành **tự động cấp** cho Firefox một port nguồn tạm thời, ví dụ `54321`. Kết nối thực sự là:

```
Firefox (10.0.0.5:54321) ──────▶ Nginx (203.0.113.10:80)
```

Khi Firefox mở tab thứ hai cùng server, OS cấp port khác:

```
Firefox tab 1: 10.0.0.5:54321 ──▶ 203.0.113.10:80
Firefox tab 2: 10.0.0.5:54322 ──▶ 203.0.113.10:80
```

Hai kết nối, phân biệt nhau bởi port nguồn khác nhau. Sau khi đóng kết nối, OS giải phóng port đó.

### 2.4. Socket — định danh đầy đủ của một endpoint

**Socket** = cặp `(địa chỉ IP, port)`. Một kết nối mạng được xác định bởi **2 socket** (nguồn và đích):

```
Nguồn socket           Đích socket
(10.0.0.5, 54321)  ↔  (203.0.113.10, 80)
```

Bốn giá trị `(src_IP, src_port, dst_IP, dst_port)` gọi là **4-tuple**, dùng để nhận dạng duy nhất một kết nối trên mạng.

**Bốn ví dụ cặp socket thực tế:**

| Tình huống | Socket nguồn | Socket đích |
|------------|-------------|-------------|
| Duyệt web | (10.0.0.5, 54321) | (1.2.3.4, 80) |
| DNS query | (10.0.0.5, 52000) | (8.8.8.8, 53) |
| SSH vào server | (10.0.0.5, 49200) | (192.168.1.100, 22) |
| Game online (UDP) | (10.0.0.5, 55555) | (game-server, 27015) |

🔁 **Tự kiểm tra**: Máy của bạn IP `172.16.0.10` gửi DNS query đến server `1.1.1.1`, OS cấp ephemeral port `50123`. Viết 4-tuple hoàn chỉnh.

<details>
<summary>Đáp án</summary>
src_IP=172.16.0.10, src_port=50123, dst_IP=1.1.1.1, dst_port=53.
Khi response về, hướng ngược lại: src=1.1.1.1:53, dst=172.16.0.10:50123.
</details>

📝 **Tóm tắt mục 2**

- Port = số 16-bit (0–65535), nhận dạng dịch vụ/tiến trình trên host.
- Well-known (0–1023) cần quyền root, ephemeral (49152–65535) do OS cấp tự động cho client.
- Socket = (IP, port). Một kết nối = 2 socket = 4-tuple (src_IP, src_port, dst_IP, dst_port).
- DNS (53), DHCP (67/68) là well-known port **UDP** quan trọng nhất.

---

## 3. UDP Datagram — Cấu trúc Header

### 3.1. Tổng quan

**UDP (User Datagram Protocol)** — giao thức tầng giao vận đơn giản nhất, định nghĩa trong RFC 768 (1980). Header chỉ gồm **8 byte cố định**, payload đi thẳng sau đó.

```
 0               1               2               3
 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
├───────────────────────┬───────────────────────┤
│   Source Port (16 b)  │  Destination Port (16b)│   Bytes 0–3
├───────────────────────┼───────────────────────┤
│     Length (16 b)     │    Checksum (16 b)     │   Bytes 4–7
├───────────────────────────────────────────────┤
│                  Data (payload)               │   Bytes 8–N
└───────────────────────────────────────────────┘
```

### 3.2. Giải thích từng trường

| Trường | Kích thước | Vai trò |
|--------|-----------|---------|
| **Source Port** | 16 bit (2 byte) | Port của bên gửi. Cho bên nhận biết nơi gửi response về. Có thể là 0 nếu không cần reply (DHCP discover). |
| **Destination Port** | 16 bit (2 byte) | Port dịch vụ đích — đây là trường **quan trọng nhất**, OS dùng để route gói đến đúng tiến trình. |
| **Length** | 16 bit (2 byte) | Tổng kích thước UDP datagram = header + payload, tính bằng byte. Giá trị tối thiểu = 8 (header không có payload). Tối đa = 65535 byte (giới hạn lý thuyết; thực tế bị giới hạn bởi MTU IP ~1472 byte payload trên Ethernet). |
| **Checksum** | 16 bit (2 byte) | Kiểm tra lỗi cho header + payload + **pseudo-header IP** (src IP, dst IP, protocol=17, UDP length). Trong IPv4 là tùy chọn (0 = disable); trong IPv6 là bắt buộc. |

💡 **Vì sao header UDP nhỏ đến vậy?**
UDP không cần theo dõi trạng thái kết nối, không cần số thứ tự, không cần ACK, không cần cửa sổ trượt. Tất cả những gì UDP cần là biết: "gói đến từ đâu, đi đến đâu, dài bao nhiêu, có lỗi không". Đó đúng là 4 trường × 2 byte = 8 byte.

### 3.3. So sánh UDP và TCP

| Thành phần | UDP | TCP |
|-----------|-----|-----|
| **Kích thước header** | **8 byte** | 20–60 byte (tối thiểu 20) |
| Thiết lập kết nối | Không (gửi ngay) | Bắt tay 3 bước (SYN/SYN-ACK/ACK) |
| Số thứ tự (sequence number) | Không | Có (32 bit) |
| Xác nhận (ACK) | Không | Có |
| Kiểm soát tắc nghẽn | Không | Có (AIMD, CUBIC, BBR...) |
| Kiểm soát luồng (flow control) | Không | Có (cửa sổ trượt) |
| Đảm bảo thứ tự | Không | Có |
| Hướng kết nối | Connectionless | Connection-oriented |
| **Overhead mỗi datagram** | **8 byte** | ≥20 byte |

### 3.4. Walk-through đọc header UDP — ví dụ cụ thể

**Giả sử capture được các byte sau** (hex) ở đầu phần UDP (sau IP header):

```
D4 31  00 35  00 29  A3 7E  ...payload...
```

Phân tích từng 2 byte:

| Byte | Hex | Decimal | Ý nghĩa |
|------|-----|---------|---------|
| 0–1 | `D4 31` | 54321 | **Source Port** = 54321 (ephemeral port của client) |
| 2–3 | `00 35` | 53 | **Destination Port** = 53 → đây là DNS query! |
| 4–5 | `00 29` | 41 | **Length** = 41 byte → payload = 41 − 8 = **33 byte** |
| 6–7 | `A3 7E` | 41854 | **Checksum** = 0xA37E (kiểm tra tính toàn vẹn) |

→ Kết luận: gói UDP nguồn ephemeral port 54321 gửi đến DNS server port 53, tổng 41 byte (33 byte DNS query).

🔁 **Tự kiểm tra**: Header UDP hex: `CF A4  00 43  00 12  00 00`. Đây là gói gì? Payload bao nhiêu byte? Checksum có vấn đề gì không?

<details>
<summary>Đáp án</summary>
- Source Port: 0xCFA4 = 53156 (ephemeral)
- Destination Port: 0x0043 = 67 → DHCP server!
- Length: 0x0012 = 18 byte → payload = 18 − 8 = 10 byte
- Checksum: 0x0000 = checksum bị disable (hợp lệ trong IPv4 UDP — server vẫn xử lý, chỉ không verify)
- Kết luận: đây là DHCP Discover hoặc DHCP Request nhỏ từ client lên server cổng 67.
</details>

📝 **Tóm tắt mục 3**

- UDP header = 8 byte cố định: src port, dst port, length, checksum.
- Length = header + payload; tối thiểu 8 (header-only).
- Checksum trong IPv4 là tùy chọn (0 = disable); IPv6 bắt buộc.
- So với TCP (≥20 byte), UDP tiết kiệm 12+ byte mỗi datagram — quan trọng khi gửi hàng nghìn gói/giây.

---

## 4. Đặc tính UDP

### 4.1. Connectionless — không kết nối

UDP **không thiết lập kết nối** trước khi gửi. Không có bắt tay 3 bước như TCP. Khi ứng dụng muốn gửi dữ liệu, nó chỉ cần:

```
socket.sendto(data, (dst_ip, dst_port))  # gửi ngay, không cần setup
```

Hệ điều hành đóng gói thành datagram và đẩy xuống IP ngay lập tức.

💡 **Analogy**: TCP giống cuộc gọi điện thoại — phải gọi, chờ nhấc máy, giới thiệu, rồi mới nói chuyện được. UDP giống gửi bưu thiếp — cứ viết địa chỉ, dán tem, bỏ vào thùng thư — không cần xác nhận bên kia có ở nhà không.

**Hệ quả**:
- Gửi nhanh hơn (không chờ 1 RTT để thiết lập kết nối).
- Overhead thấp hơn (không có trạng thái kết nối trong OS — không tốn RAM/CPU cho connection table).
- Nhưng **không biết** bên kia có nhận được không.

### 4.2. Unreliable — không tin cậy

UDP **không đảm bảo** gói tin đến được đích. Nếu router trung gian bị tắc nghẽn và phải drop gói, hay link bị lỗi bit, UDP datagram đó **biến mất vĩnh viễn** mà không có thông báo nào cho bên gửi.

Ba dạng "không tin cậy":

| Vấn đề | Giải thích | UDP xử lý không? |
|--------|-----------|-----------------|
| **Mất gói (packet loss)** | Datagram bị drop giữa đường | Không — ứng dụng phải tự xử lý |
| **Đảo thứ tự (reordering)** | Gói 2 đến trước gói 1 | Không — ứng dụng nhận theo thứ tự đến |
| **Trùng lặp (duplication)** | Gói đến 2 lần (lỗi mạng) | Không — ứng dụng phải lọc |

⚠ **Lỗi thường gặp**: nhiều người nghĩ "UDP không có checksum nên không kiểm tra lỗi". Sai — UDP **có checksum** (trường byte 6–7). Checksum phát hiện bit lỗi trong header/payload. Nhưng khi phát hiện lỗi, UDP chỉ **drop gói đó đi** — không có cơ chế yêu cầu gửi lại như TCP. Unreliable ở đây nghĩa là "không đảm bảo giao hàng", không phải "không kiểm tra lỗi".

### 4.3. Không kiểm soát tắc nghẽn (No Congestion Control)

TCP có cơ chế slow start, AIMD (Additive Increase Multiplicative Decrease) — khi mạng tắc nghẽn, TCP tự giảm tốc độ gửi. UDP thì không — ứng dụng có thể gửi tốc độ không đổi dù mạng đang tắc.

**Hệ quả**:
- UDP có thể "lấn át" TCP trên cùng đường truyền nếu gửi không giới hạn.
- Ứng dụng cần kiểm soát tắc nghẽn phải tự cài (ví dụ QUIC/HTTP3 tự cài CC trên nền UDP).
- Nhiều ứng dụng UDP (game, VoIP) chấp nhận mất vài gói còn hơn là delay — không cần CC.

### 4.4. Tốc độ cao, overhead thấp

Kết hợp 3 đặc tính trên, UDP cho phép:

- **Latency thấp**: không có RTT setup, không có RTT wait-for-ACK.
- **Throughput cao**: không bị throttle bởi congestion window.
- **CPU/memory thấp**: không cần maintain connection state.

Ví dụ số thực tế:
- TCP DNS query: bắt tay 3 bước (~1.5 RTT) + query + response = ~2.5 RTT delay.
- UDP DNS query: gửi ngay + response về = **~0.5 RTT** (chỉ 1 chiều đi + 1 chiều về).
- Ở latency 20 ms (VN–Singapore), UDP DNS nhanh hơn TCP DNS khoảng 40 ms mỗi lần. Với hàng triệu query/ngày, đó là lý do DNS dùng UDP.

🔁 **Tự kiểm tra**: Một VoIP app gửi 50 gói/giây, mỗi gói 160 byte audio. Nếu mạng mất 2% gói, ứng dụng bị ảnh hưởng gì? So sánh nếu dùng TCP.

<details>
<summary>Đáp án</summary>
Với UDP: mất 2% gói → người nghe cảm thấy tiếng "crackle" nhẹ ~1 gói/giây (50×2% = 1 gói/s). Hầu hết người nghe không nhận ra hoặc thấy nhỏ. Ứng dụng có thể dùng error concealment.
Với TCP: khi mất gói, TCP retransmit — có thể mất 100–200ms để timeout và gửi lại. Trong 100ms đó, không có audio nào → nghe thấy im lặng đột ngột, tệ hơn crackle nhiều. Ngoài ra TCP congestion control sẽ giảm tốc độ → jitter tăng.
Kết luận: UDP mất gói ít ảnh hưởng hơn TCP delay/jitter trong real-time audio.
</details>

📝 **Tóm tắt mục 4**

- **Connectionless**: không setup, gửi ngay, không biết bên kia có nhận không.
- **Unreliable**: gói có thể mất, đảo thứ tự, trùng lặp — không retransmit.
- **No congestion control**: gửi tốc độ cố định bất kể mạng.
- **Lợi ích**: latency thấp, overhead thấp, throughput cao — phù hợp real-time.

---

## 5. Khi Nào Dùng UDP

### 5.1. Nguyên tắc chọn UDP vs TCP

Dùng **UDP** khi:

1. **Mất gói chấp nhận được hơn là delay cao** — điển hình cho real-time media.
2. **Ứng dụng tự quản lý độ tin cậy** nếu cần (ví dụ QUIC có retransmit riêng).
3. **Query-response 1 chiều ngắn** — DNS, NTP, SNMP: gửi query, nhận response, xong. Không cần kết nối duy trì.
4. **Multicast/Broadcast** — UDP hỗ trợ gửi 1 gói → nhiều đích; TCP là point-to-point.

Dùng **TCP** khi:
- Dữ liệu phải đến đầy đủ và đúng thứ tự (file download, email, web page).
- Mất dữ liệu là không chấp nhận được.

### 5.2. Ứng dụng thực tế dùng UDP

**1. DNS (port 53)**

DNS query thường nhỏ (< 512 byte), cần trả lời nhanh. Browser gửi UDP DNS query, nhận response trong < 10ms trên mạng nội địa. Nếu dùng TCP, mỗi DNS lookup mất thêm 1 RTT handshake — trang web load chậm hơn rõ rệt.

```
; Thực tế: dig sử dụng UDP theo mặc định
$ dig @8.8.8.8 google.com
; Kết quả về sau ~20ms qua UDP port 53
```

**2. DHCP (port 67/68)**

Khi máy tính mới kết nối mạng, nó **chưa có IP** — không thể thiết lập TCP. DHCP Discover được broadcast qua UDP (`255.255.255.255:67`), bất kỳ DHCP server nào trong subnet đều nhận và reply. TCP không thể làm điều này vì:
- Không có IP nguồn.
- Không thể unicast khi chưa biết IP server.
- Broadcast không có trong TCP.

**3. Streaming video/audio (RTP, WebRTC, QUIC)**

Netflix và YouTube ngày nay dùng **QUIC (HTTP/3)** — một giao thức xây trên UDP. Lý do:
- QUIC tự cài độ tin cậy và kiểm soát tắc nghẽn trên UDP.
- Tránh **head-of-line blocking** của TCP (1 gói mất làm dừng cả luồng).
- Nhiều luồng (streams) trong 1 connection UDP — mất gói ở stream 1 không ảnh hưởng stream 2.
- 0-RTT connection setup (lần sau kết nối lại không cần handshake).

**4. Game online (port 27015 Steam, 7777 Unreal...)**

Game FPS hoặc battle royale cần cập nhật vị trí nhân vật 60–120 lần/giây. Nếu 1 update bị mất, update tiếp theo (đến sau 8–16ms) sẽ có vị trí mới nhất — không cần gói cũ nữa. Retransmit gói cũ của TCP lãng phí băng thông và tạo độ trễ bất thường (jitter).

**5. VoIP (SIP/RTP, port 5060/5004)**

Cuộc gọi thoại: 50 gói/giây, mỗi gói 20ms audio. Mất 1 gói → im lặng 20ms — hầu như không nghe thấy, hoặc codec tự interpolate. Delay do TCP retransmit (thường 50–200ms) tệ hơn rất nhiều — người nghe nghe giọng "giật cục".

⚠ **Lỗi thường gặp**: Không phải mọi thứ "thời gian thực" đều dùng UDP thuần. SSH dùng TCP (vì lỡ mất 1 byte lệnh thì lệnh chạy sai). RDP (Remote Desktop) dùng UDP cho video/audio nhưng TCP cho control channel. Luôn xem xét trade-off cụ thể.

📝 **Tóm tắt mục 5**

| Ứng dụng | Port | Vì sao UDP |
|---------|------|-----------|
| DNS | 53 | Query nhỏ, cần nhanh, 1 RTT là đủ |
| DHCP | 67/68 | Cần broadcast trước khi có IP |
| VoIP (RTP) | 5004 | Mất gói < delay; real-time |
| Game online | 27015+ | Update nhanh, gói cũ không cần thiết |
| QUIC/HTTP3 | 443 | Tự cài CC, tránh HoL blocking |

---

## 6. Nhiều Tiến Trình Trên Cùng Host

### 6.1. Multiplexing và Demultiplexing

**Multiplexing (ghép kênh)**: bên gửi — nhiều tiến trình tạo dữ liệu, tầng giao vận gắn port tương ứng, gói tin xuống cùng một IP interface.

**Demultiplexing (tách kênh)**: bên nhận — khi gói đến host, tầng giao vận đọc dst port, chuyển đến đúng tiến trình đang chờ port đó.

### 6.2. Ví dụ cụ thể — 3 tiến trình cùng host

```
Host 192.168.1.5 đang chạy:
  ┌─────────────────────────────────────────────────────┐
  │ Tiến trình A: game.exe     → lắng nghe port 55001  │
  │ Tiến trình B: discord.exe  → lắng nghe port 3478   │
  │ Tiến trình C: browser      → ephemeral src 54320   │
  └─────────────────────────────────────────────────────┘
  
Gói đến từ game-server:  dst_port=55001 → tầng GV chuyển cho A
Gói đến từ Discord:      dst_port=3478  → tầng GV chuyển cho B
Response DNS về:         dst_port=54320 → tầng GV chuyển cho C
```

Cùng một địa chỉ IP `192.168.1.5`, ba luồng dữ liệu hoàn toàn độc lập — phân biệt nhau chỉ bởi port.

---

## 7. Bài Tập + Lời Giải Chi Tiết

### Bài tập

**Bài 1 — Đọc header UDP**

Byte hex của một UDP datagram (8 byte đầu):
```
13 88  00 35  00 1C  B2 4A
```
Xác định: source port, destination port, length, payload size, checksum, và đây có thể là gói gì?

**Bài 2 — Tính overhead**

Ứng dụng game gửi UDP datagram payload 40 byte. Tính:
(a) Kích thước UDP datagram.
(b) Nếu IP header 20 byte, Ethernet frame có header 14 byte + trailer 4 byte — tổng kích thước frame trên dây.
(c) Overhead % so với payload.
(d) Nếu dùng TCP thay (header tối thiểu 20 byte), overhead tăng thêm bao nhiêu %?

**Bài 3 — Phân loại port**

Phân loại các port sau và nêu dịch vụ liên quan (nếu có):
- 22, 53, 80, 443, 3306, 8080, 27017, 49200, 65000

**Bài 4 — Chọn UDP hay TCP**

Giải thích lý do chọn UDP hay TCP cho mỗi tình huống:
(a) Ứng dụng chat văn bản (message phải đến đủ, đúng thứ tự).
(b) Game FPS cập nhật vị trí nhân vật 64 lần/giây.
(c) Tải file ISO 4 GB từ server.
(d) Video call 1:1 độ phân giải 720p.
(e) Đồng bộ thời gian NTP.
(f) Truy vấn tên miền `facebook.com`.

**Bài 5 — Tính RTT và lợi thế UDP**

Mạng có RTT = 30ms (giữa client và server). So sánh:
(a) Số ms để hoàn thành 1 DNS query dùng UDP.
(b) Số ms nếu DNS dùng TCP (phải bắt tay 3 bước trước rồi mới gửi query).
(c) Nếu browser load 1 trang web cần 20 DNS query, tiết kiệm được bao nhiêu ms khi dùng UDP?

**Bài 6 — Socket và 4-tuple**

Xác định 4-tuple đầy đủ cho mỗi kết nối:
(a) Máy A (172.16.10.5) gửi UDP DNS query đến `1.1.1.1`, OS cấp ephemeral port 51234.
(b) Máy B (10.0.0.20) vừa boot, gửi DHCP Discover broadcast. Port nguồn DHCP client là 68.
(c) Server game (45.77.10.100, port 7777) nhận kết nối UDP từ player (192.168.0.50, port 52000).

### Lời giải chi tiết

**Bài 1:**

Phân tích từng trường:
- Byte 0–1: `13 88` = 0x1388 = **5000** → Source Port = **5000**
- Byte 2–3: `00 35` = 0x0035 = **53** → Destination Port = **53** (DNS)
- Byte 4–5: `00 1C` = 0x001C = **28** → Length = **28 byte** → Payload = 28 − 8 = **20 byte**
- Byte 6–7: `B2 4A` = 0xB24A = **45642** → Checksum = 0xB24A (enabled, giá trị ≠ 0)

Kết luận: **đây là DNS query** — từ cổng 5000 (ephemeral) gửi đến DNS server cổng 53. Payload 20 byte là 1 DNS question record nhỏ.

---

**Bài 2:**

(a) UDP datagram = header + payload = 8 + 40 = **48 byte**

(b) Tổng frame:
```
Ethernet header  14 byte
IP header        20 byte
UDP header        8 byte
Payload          40 byte
Ethernet trailer  4 byte
─────────────────────────
Tổng            86 byte
```

(c) Overhead = (86 − 40) / 40 × 100 = 46/40 × 100 = **115%** — nghĩa là overhead còn nhiều hơn payload! Đây là lý do gói nhỏ (game position update) cần payload đủ lớn để overhead hợp lý.

(d) Nếu dùng TCP (header tối thiểu 20 byte):
```
Ethernet 14 + IP 20 + TCP 20 + payload 40 + trailer 4 = 98 byte
Overhead = (98 − 40)/40 × 100 = 145%
```
TCP overhead so với UDP: 145% − 115% = **thêm 30%** (12 byte header × 100/40). Hoặc đơn giản: TCP header 20B vs UDP 8B → 12 byte thêm / 40 byte payload = +30%.

---

**Bài 3:**

| Port | Nhóm | Dịch vụ |
|------|------|---------|
| 22 | Well-known | SSH |
| 53 | Well-known | DNS |
| 80 | Well-known | HTTP |
| 443 | Well-known | HTTPS |
| 3306 | Registered | MySQL |
| 8080 | Registered | HTTP alternative / dev server |
| 27017 | Registered | MongoDB |
| 49200 | Ephemeral | Port tạm thời do OS cấp |
| 65000 | Ephemeral | Port tạm thời do OS cấp |

---

**Bài 4:**

(a) **Chat văn bản → TCP**. Message "xin chào" phải đến đầy đủ — mất 1 byte thành "xin hà". Thứ tự quan trọng — tin nhắn sau không được xuất hiện trước tin nhắn trước.

(b) **Game FPS → UDP**. Cập nhật vị trí 64 lần/giây = mỗi 15ms có frame mới. Mất 1 frame: frame kế tiếp đến sau 15ms chứa vị trí mới nhất — gói cũ không còn giá trị. TCP retransmit sẽ delay thêm 15–100ms và cản các gói sau (head-of-line blocking).

(c) **Tải file ISO 4 GB → TCP**. Mất 1 gói → file bị lỗi, không dùng được. Phải đảm bảo mọi byte đều đến — TCP là lựa chọn duy nhất phù hợp.

(d) **Video call 720p → UDP (qua WebRTC/RTP)**. Mất vài frame video → pixelate 1/30s, mắt khó nhận ra. Delay do TCP retransmit: hình bị lag, không real-time. Codec (H.264, VP8) tự xử lý intra-frame recovery.

(e) **NTP → UDP (port 123)**. Đơn giản là query/response, payload 48 byte. Không cần setup kết nối. Timestamp trong packet — nếu bị delay quá nhiều (do TCP overhead) thì kết quả đồng hồ càng sai.

(f) **DNS → UDP (port 53)**. Response nhỏ (~100 byte), cần nhanh. UDP tiết kiệm 1 RTT setup. Có thể fallback TCP nếu response > 512 byte.

---

**Bài 5:**

(a) **DNS qua UDP**: Client gửi query → server nhận → gửi response → client nhận = **1 RTT = 30ms**.

(b) **DNS qua TCP**:
```
  Bước 1: SYN       → server           15ms
  Bước 2: SYN-ACK   ← server           15ms  (RTT 1 hoàn thành)
  Bước 3: ACK+Query → server           15ms
  Bước 4: Response  ← server           15ms  (RTT 2 hoàn thành)
```
Tổng: **2 RTT = 60ms** (chưa kể TCP teardown). Trong thực tế còn cần FIN/FIN-ACK thêm 1 RTT nữa.

(c) 20 DNS query:
- UDP: 20 × 30ms = **600ms**
- TCP: 20 × 60ms = **1200ms**
- Tiết kiệm: **600ms** (bằng nửa thời gian). Với RTT cao hơn (quốc tế ~150ms), tiết kiệm càng lớn.

---

**Bài 6:**

(a) DNS query: `(172.16.10.5, 51234, 1.1.1.1, 53)`
- src_IP=172.16.10.5, src_port=51234, dst_IP=1.1.1.1, dst_port=53

(b) DHCP Discover: `(0.0.0.0, 68, 255.255.255.255, 67)`
- Máy chưa có IP nên src_IP=0.0.0.0. Broadcast dst_IP=255.255.255.255. Port nguồn DHCP client = 68, dst = 67 (DHCP server).

(c) Từ góc nhìn server: `(192.168.0.50, 52000, 45.77.10.100, 7777)`
- Server nhận gói với src=(player IP, player port), dst=(server IP, server port).

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 01 — Mô hình phân lớp](../lesson-01-layered-models/) — tầng giao vận trong stack OSI/TCP-IP.
- **Tiền đề**: [Lesson 03 — IP & Subnetting](../lesson-03-ip-subnetting/) — định tuyến host-to-host, nền tảng cho transport.
- **Bài tiếp theo**: [Lesson 08 — Tầng giao vận: TCP](../lesson-08-tcp/) — cơ chế kết nối tin cậy, bắt tay 3 bước, số thứ tự, ACK, cửa sổ trượt.
- **Tham khảo thêm**: RFC 768 (UDP gốc, chỉ 3 trang!), RFC 9000 (QUIC — UDP hiện đại).
- **Xem minh họa tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 07

1. **Tầng giao vận** = process-to-process (khác với IP = host-to-host). Dùng **port** (16-bit) làm địa chỉ tiến trình.
2. **Port**: well-known (0–1023), registered (1024–49151), ephemeral (49152–65535). **Socket** = (IP, port). **4-tuple** = (src_IP, src_port, dst_IP, dst_port) nhận dạng duy nhất kết nối.
3. **UDP header** = 8 byte (src port, dst port, length, checksum). Nhỏ nhất có thể — chỉ đủ để demultiplex và phát hiện lỗi cơ bản.
4. **Đặc tính UDP**: connectionless, unreliable (không ACK, không retransmit), không kiểm soát tắc nghẽn → **latency thấp, overhead thấp, throughput cao**.
5. **Dùng UDP khi**: DNS, DHCP, VoIP, game online, QUIC/HTTP3 — mất vài gói chấp nhận được hơn là delay cao.
6. **Tiếp theo**: TCP (Lesson 08) thêm độ tin cậy, thứ tự, flow control — với chi phí là độ phức tạp và latency cao hơn.
