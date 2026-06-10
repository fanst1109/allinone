# Lesson 08 — Tầng giao vận: TCP

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu TCP là gì: hướng kết nối (connection-oriented), tin cậy (reliable), có thứ tự, với kiểm soát luồng và tắc nghẽn.
- Đọc được header TCP 20 byte: vai trò của từng trường, đặc biệt sequence number và acknowledgment number.
- Mô tả chính xác bắt tay 3 bước (3-way handshake) và đóng kết nối 4 bước với số SEQ/ACK cụ thể.
- Giải thích cơ chế truyền tin cậy: đánh số byte, phát lại (retransmission), phát hiện mất gói qua timeout và duplicate ACK.
- Tính throughput từ cửa sổ trượt (sliding window) và RTT.
- So sánh TCP với UDP để chọn đúng giao thức cho từng ứng dụng.

## Kiến thức tiền đề

- [Lesson 07 — UDP](../lesson-07-udp/) — giao thức tầng giao vận không kết nối, nền để so sánh với TCP.
- [Lesson 01 — Mô hình phân lớp](../lesson-01-layered-models/) — vị trí tầng giao vận trong mô hình OSI/TCP-IP.

---

## 1. TCP là gì và tại sao cần nó

### 1.1. Vấn đề IP không giải quyết được

IP (tầng mạng) chỉ "cố gắng tốt nhất" (best effort) để chuyển gói tin: không đảm bảo gói đến, không đảm bảo thứ tự, không đảm bảo không trùng lặp. Ví dụ thực tế:

- Tải file 100 MB: nếu mỗi gói có thể mất, đến trễ, đến lộn thứ tự → file nhận được sẽ bị hỏng hoàn toàn.
- Gửi lệnh ngân hàng "chuyển 10 triệu": nếu lệnh bị mất giữa đường → giao dịch không thực hiện; nếu đến 2 lần → trừ tiền 2 lần.

💡 **Trực giác — TCP giống cuộc gọi điện thoại có xác nhận**: Trước khi nói chuyện, hai bên phải "nhấc máy và chào nhau" (bắt tay). Trong lúc nói, mỗi câu người nghe phải phản hồi "nghe rõ rồi" (ACK). Nếu không nghe thấy xác nhận, người nói nhắc lại câu đó (retransmission). Cuối cùng phải "cúp máy đúng cách" (đóng kết nối 4 bước). UDP thì giống bưu thiếp: bỏ vào hòm thư rồi thôi, không biết có nhận được không.

### 1.2. Bốn đặc tính cốt lõi của TCP

| Đặc tính | Ý nghĩa | Cơ chế |
|----------|---------|--------|
| **Hướng kết nối** (connection-oriented) | Phải thiết lập kết nối trước khi truyền dữ liệu | Bắt tay 3 bước (3-way handshake) |
| **Tin cậy** (reliable) | Mọi byte được đảm bảo đến đích, không mất | SEQ/ACK + retransmission |
| **Có thứ tự** (ordered) | Dữ liệu đến đúng thứ tự gốc dù gói đến lộn | SEQ number đánh số byte |
| **Kiểm soát luồng & tắc nghẽn** | Không làm tràn bộ nhớ receiver; không làm nghẽn mạng | Window size; slow start / congestion avoidance |

### 1.3. So sánh nhanh TCP vs UDP

| Tiêu chí | TCP | UDP |
|----------|-----|-----|
| Kết nối | Có (3-way handshake) | Không |
| Độ tin cậy | Đảm bảo | Không đảm bảo |
| Thứ tự | Có | Không |
| Tốc độ | Chậm hơn (overhead) | Nhanh hơn |
| Header | 20+ byte | 8 byte |
| Ứng dụng | HTTP, email, file transfer, SSH | DNS, video stream, game real-time |

❓ **Câu hỏi tự nhiên của người đọc**:

*"Vì sao YouTube dùng UDP hay TCP?"* — YouTube dùng **QUIC** (tựa UDP) vì: mất 1 frame video ít quan trọng hơn độ trễ thấp; TCP khi có 1 gói mất sẽ dừng toàn bộ luồng chờ phát lại (head-of-line blocking). Tuy nhiên HTTP/1.1 video (progressive download) vẫn dùng TCP.

*"TCP có mã hóa không?"* — Không. TCP chỉ đảm bảo độ tin cậy truyền tải; mã hóa là việc của **TLS** chạy trên TCP. HTTPS = HTTP + TLS + TCP.

📝 **Tóm tắt mục 1**:
- IP không đảm bảo giao hàng — TCP bổ sung độ tin cậy cho tầng transport.
- TCP: hướng kết nối, tin cậy, có thứ tự, kiểm soát luồng/tắc nghẽn.
- Đánh đổi: overhead lớn hơn UDP (latency cao hơn, header lớn hơn).

---

## 2. Header TCP

### 2.1. Cấu trúc header (20 byte cơ bản)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |   (4 byte)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |   (4 byte)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |   (4 byte)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Data  |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|         Window Size          |   (4 byte)
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |   (4 byte)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (nếu có)                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### 2.2. Vai trò từng trường

| Trường | Kích thước | Vai trò |
|--------|-----------|---------|
| **Source Port** | 2 byte | Cổng nguồn (vd: 54321 — cổng tạm của browser) |
| **Destination Port** | 2 byte | Cổng đích (vd: 80 cho HTTP, 443 cho HTTPS) |
| **Sequence Number (SEQ)** | 4 byte | Số thứ tự của byte **đầu tiên** trong segment này |
| **Acknowledgment Number (ACK)** | 4 byte | Số byte **tiếp theo** receiver mong nhận (xác nhận đã nhận đến byte ACK-1) |
| **Data Offset** | 4 bit | Độ dài header TCP tính bằng đơn vị 32-bit word (tối thiểu 5 = 20 byte) |
| **Flags** | 6 bit | Các cờ điều khiển (SYN, ACK, FIN, RST, PSH, URG) |
| **Window Size** | 2 byte | Số byte receiver còn có thể nhận (flow control) |
| **Checksum** | 2 byte | Kiểm tra lỗi header + data |
| **Urgent Pointer** | 2 byte | Chỉ vị trí dữ liệu khẩn (chỉ dùng khi URG flag = 1) |

### 2.3. Ý nghĩa SEQ/ACK — cơ chế cốt lõi

💡 **Trực giác**: TCP đánh số từng **byte** (không phải gói tin). Nếu bạn gửi 1000 byte bắt đầu từ SEQ=100, byte cuối có số 1099. Receiver xác nhận bằng ACK=1100 (= số byte kế tiếp mong nhận), nghĩa là "tôi đã nhận đủ đến byte 1099, gửi tiếp từ 1100 đi".

**Ví dụ cụ thể**:
- Sender gửi: SEQ=100, 500 byte dữ liệu → chứa byte 100 đến 599.
- Receiver xác nhận: ACK=600 → "tôi nhận đủ đến byte 599, tiếp từ 600".
- Sender gửi tiếp: SEQ=600, 500 byte → chứa byte 600 đến 1099.
- Receiver xác nhận: ACK=1100 → "nhận đủ đến 1099, tiếp từ 1100".

### 2.4. Sáu cờ (flags) và vai trò

| Flag | Ký hiệu | Vai trò |
|------|---------|---------|
| **SYN** (Synchronize) | Thiết lập kết nối | Chứa Initial Sequence Number (ISN) |
| **ACK** (Acknowledgment) | Xác nhận đã nhận | Trường ACK number có hiệu lực |
| **FIN** (Finish) | Đóng kết nối | Bên gửi không còn dữ liệu để gửi |
| **RST** (Reset) | Hủy kết nối ngay | Lỗi nghiêm trọng, từ chối kết nối |
| **PSH** (Push) | Đẩy dữ liệu ngay | Không đợi buffer đầy; gửi ngay lên app |
| **URG** (Urgent) | Dữ liệu khẩn | Urgent Pointer chỉ vùng ưu tiên |

⚠ **Lỗi thường gặp**: nhầm ACK number là "số byte đã nhận". ACK=600 **không** nghĩa là đã nhận 600 byte — nghĩa là đã nhận đến byte số 599, mong nhận từ byte 600. ACK là "next expected byte", không phải "total received".

🔁 **Dừng lại tự kiểm tra**:

> Sender gửi SEQ=200, chứa 300 byte. Receiver xác nhận bằng ACK bao nhiêu?

<details>
<summary>Xem đáp án</summary>

$\text{ACK} = 200 + 300 = 500$. Nghĩa là receiver đã nhận đến byte 499, mong nhận byte 500 tiếp theo.
</details>

📝 **Tóm tắt mục 2**:
- Header TCP tối thiểu 20 byte (lớn hơn UDP 8 byte đáng kể).
- SEQ = số thứ tự byte đầu tiên trong segment; ACK = byte tiếp theo receiver mong nhận.
- 6 flags điều khiển vòng đời kết nối: SYN (mở), ACK (xác nhận), FIN (đóng), RST (hủy).

---

## 3. Bắt tay 3 bước và đóng kết nối

### 3.1. Vì sao cần 3 bước (không phải 2 hay 4)?

💡 **Trực giác**: Hai bên phải đồng bộ **hai** Initial Sequence Number (ISN) — một cho mỗi chiều. Mỗi ISN cần 1 bước gửi + 1 bước xác nhận.

- Nếu chỉ 2 bước: client gửi SYN, server gửi SYN-ACK → server chưa biết client có nhận được SYN-ACK không → kết nối không đảm bảo đối xứng.
- 3 bước đảm bảo: (1) client → server hoạt động, (2) server → client hoạt động, (3) cả 2 ISN được xác nhận.

### 3.2. Walk-through 3-way handshake với số cụ thể

**Kịch bản**: Client (trình duyệt) mở kết nối đến Server (web server).

**Bước 1 — SYN** (Client → Server):
```
Client gửi:
  Flags = SYN
  SEQ   = 100   (ISN của client — chọn ngẫu nhiên, dùng 100 cho ví dụ)
  ACK   = 0     (chưa có gì để xác nhận)
```

**Bước 2 — SYN-ACK** (Server → Client):
```
Server gửi:
  Flags = SYN + ACK
  SEQ   = 300   (ISN của server — chọn ngẫu nhiên, dùng 300 cho ví dụ)
  ACK   = 101   (= client ISN + 1, xác nhận đã nhận SYN của client)
```

**Bước 3 — ACK** (Client → Server):
```
Client gửi:
  Flags = ACK
  SEQ   = 101   (client ISN + 1, SYN "tiêu thụ" 1 số thứ tự)
  ACK   = 301   (= server ISN + 1, xác nhận đã nhận SYN của server)
```

**Sau bước 3**: Kết nối được thiết lập. Client có thể gửi dữ liệu ngay trong bước 3 (kèm PSH flag).

**Lý do SYN "tiêu thụ" 1 số thứ tự**: SYN không chứa dữ liệu ứng dụng, nhưng TCP coi nó chiếm 1 byte trong không gian số thứ tự — tương tự FIN. Quy ước này đảm bảo có thể xác nhận (ACK) SYN một cách rõ ràng.

❓ **Câu hỏi tự nhiên**:

*"ISN có phải luôn là 100 và 300 không?"* — Không. ISN được chọn ngẫu nhiên bởi hệ điều hành (thường dựa vào đồng hồ + yếu tố ngẫu nhiên). Việc dùng ISN ngẫu nhiên ngăn tấn công TCP sequence number prediction: kẻ tấn công khó đoán ISN để giả mạo gói tin hợp lệ.

*"Tại sao server gửi ACK=101 chứ không phải ACK=100?"* — Vì ACK = "byte tiếp theo mong nhận". Server đã nhận SEQ=100 (chiếm 1 số thứ tự do là SYN) → mong nhận byte 101.

### 3.3. Đóng kết nối 4 bước (4-way FIN)

TCP đóng kết nối theo chiều **nửa song công (half-duplex)**: mỗi bên phải gửi FIN riêng. Vì vậy cần 4 bước:

```
Client → Server:  FIN, SEQ=X          (client xong, không gửi thêm)
Server → Client:  ACK=X+1             (server nhận FIN của client)
  [server có thể gửi thêm dữ liệu tại đây nếu cần]
Server → Client:  FIN, SEQ=Y          (server cũng xong)
Client → Server:  ACK=Y+1             (client nhận FIN của server)
```

**Vì sao 4 bước không phải 3?** Bước 2 (ACK) và bước 3 (FIN) của server thường không gộp được vì server có thể vẫn còn dữ liệu cần gửi sau khi nhận FIN của client (half-close).

⚠ **Lỗi thường gặp**: FIN không xóa dữ liệu đang truyền. Sau khi nhận FIN từ client, server vẫn có thể gửi nốt phần response còn lại trước khi gửi FIN của mình. TCP hỗ trợ half-close chính vì vậy.

📝 **Tóm tắt mục 3**:
- Bắt tay 3 bước: SYN → SYN-ACK → ACK. Mỗi ISN được xác nhận.
- SYN và FIN mỗi cái "tiêu thụ" 1 số thứ tự (dù không mang dữ liệu ứng dụng).
- Đóng kết nối 4 bước vì TCP half-close: mỗi bên FIN riêng.

---

## 4. Truyền tin cậy — SEQ/ACK, mất gói, phát lại

### 4.1. Cơ chế đánh số byte và xác nhận

TCP coi luồng dữ liệu là **chuỗi byte liên tục**, đánh số từng byte bằng sequence number. Mỗi segment chứa:
- **SEQ**: số thứ tự của byte đầu tiên trong segment.
- Dữ liệu: N byte (từ SEQ đến SEQ+N-1).

Receiver gửi ACK = SEQ + N (byte tiếp theo mong nhận).

**Ví dụ gửi 1500 byte** (sau handshake, client ISN=100, nên data bắt đầu từ SEQ=101):

| Segment | SEQ | Dữ liệu | Byte chứa | ACK phản hồi |
|---------|-----|---------|-----------|--------------|
| 1 | 101 | 500 byte | 101–600 | 601 |
| 2 | 601 | 500 byte | 601–1100 | 1101 |
| 3 | 1101 | 500 byte | 1101–1600 | 1601 |

### 4.2. Phát hiện mất gói

TCP có 2 cơ chế phát hiện mất gói:

**Cơ chế 1 — Timeout (Retransmission Timeout, RTO)**:
- Sender đặt timer sau mỗi segment.
- Nếu không nhận ACK trong thời gian RTO → coi như gói mất → phát lại.
- RTO thường $= 2 \times RTT$ ban đầu, tự điều chỉnh theo mạng (thuật toán Karn/Jacobson).

**Cơ chế 2 — Duplicate ACK (Fast Retransmit)**:
- Khi receiver nhận segment 3 nhưng thiếu segment 2 → receiver gửi ACK=601 lặp lại (duplicate ACK cho segment cuối đã nhận tốt).
- Nếu sender nhận **3 duplicate ACK** liên tiếp → suy ra gói bị mất → **phát lại ngay** (không đợi timeout).
- Fast Retransmit nhanh hơn timeout vì không cần đợi RTO hết (thường hàng trăm ms).

### 4.3. Walk-through: gói mất và phát lại

**Kịch bản**: gửi 3 segment, segment 2 bị mất trên đường.

```
Thời gian →

Sender          Mạng         Receiver
─────────       ─────        ─────────
Gửi SEQ=101 ─────────────→  Nhận 101, gửi ACK=601
Gửi SEQ=601 ────✗ MẤT       (không nhận được)
Gửi SEQ=1101 ────────────→  Nhận 1101, nhưng thiếu 601-1100!
                              Gửi ACK=601 (dup ACK #1)
(Sender nhận dup ACK #1)
Gửi SEQ=1601 ────────────→  Nhận 1601, vẫn thiếu 601-1100
                              Gửi ACK=601 (dup ACK #2)
(Sender nhận dup ACK #2)
(Tiếp tục gửi window...)
                              Gửi ACK=601 (dup ACK #3)
(Sender nhận dup ACK #3) → FAST RETRANSMIT!
Phát lại SEQ=601 ──────→   Nhận 601-1100
                              Bây giờ có đủ 101–...
                              Gửi ACK=... (cumulative ACK)
```

**Kết quả**: Receiver buffer các segment đến sau (1101, 1601...) trong khi chờ segment 601. Khi 601 đến, receiver xác nhận tất cả bằng một ACK dồn (cumulative ACK).

❓ **Câu hỏi tự nhiên**:

*"Receiver có ném bỏ segment 3 khi chờ segment 2 không?"* — Không (với TCP hiện đại). Receiver **buffer** segment 3 và các segment sau, chờ segment 2. Khi 2 đến, sắp xếp lại theo thứ tự rồi chuyển lên ứng dụng. Gọi là **out-of-order buffering**.

*"RTO bao lâu?"* — Phụ thuộc RTT thực tế. Trên LAN có thể vài ms; qua internet thường 100–300 ms; timeout TCP tối đa thường 60–120 giây.

📝 **Tóm tắt mục 4**:
- SEQ đánh số byte; ACK = byte tiếp theo receiver mong nhận (cumulative).
- Phát lại: timeout (RTO hết) hoặc fast retransmit (3 duplicate ACK).
- Fast retransmit nhanh hơn, tránh đợi RTO; receiver buffer out-of-order segments.

---

## 5. Cửa sổ trượt, kiểm soát luồng và tắc nghẽn

### 5.1. Cửa sổ trượt (Sliding Window)

💡 **Trực giác**: Nếu phải đợi ACK sau mỗi segment → mạng trống 50% thời gian (đợi ACK đi về). Giải pháp: sender gửi nhiều segment liên tiếp mà không cần đợi, như một "cửa sổ" trượt qua luồng byte.

**Window size W** = số byte tối đa sender có thể gửi mà chưa được ACK.

**Throughput tối đa** (không tắc nghẽn):

$$\text{Throughput} = \frac{W}{RTT}$$

**Ví dụ số 1**: Window $= 64$ KB $= 65536$ byte, RTT $= 50$ ms.

$$\text{Throughput} = \frac{65536 \text{ byte}}{0.05 \text{ s}} = 1{,}310{,}720 \text{ byte/s} \approx 10.5 \text{ Mbps}$$

**Ví dụ số 2**: Window $= 1$ MB $= 1{,}048{,}576$ byte, RTT $= 100$ ms.

$$\text{Throughput} = \frac{1{,}048{,}576}{0.1} = 10{,}485{,}760 \text{ byte/s} \approx 83.9 \text{ Mbps}$$

**Ví dụ số 3**: Kết nối satellite, RTT $= 600$ ms, muốn đạt 100 Mbps.

$$W_{\text{cần}} = \frac{100 \times 10^6}{8} \times 0.6 = 7{,}500{,}000 \text{ byte} \approx 7.15 \text{ MB}$$

→ Cần TCP window scaling (option header mở rộng window > 64 KB).

### 5.2. Kiểm soát luồng (Flow Control)

**Vấn đề**: Sender nhanh hơn receiver → tràn buffer receiver.

**Giải pháp**: Receiver quảng bá **rwnd** (receive window) = bộ nhớ buffer còn trống. Sender không được gửi quá rwnd byte chưa ACK.

**Ví dụ**: Receiver buffer = 64 KB, ứng dụng đọc dữ liệu chậm.
- Buffer đầy 32 KB → receiver gửi ACK với Window Size = 32768 (32 KB còn trống).
- Sender dừng gửi khi đã gửi 32 KB chưa ACK.
- Khi ứng dụng đọc thêm 16 KB → receiver gửi ACK với Window Size = 48 KB → sender có thể gửi thêm.

⚠ **Lỗi thường gặp**: nhầm flow control và congestion control. Flow control bảo vệ **receiver** (không tràn buffer receiver). Congestion control bảo vệ **mạng** (không tắc nghẽn router giữa đường). Hai cơ chế độc lập.

### 5.3. Kiểm soát tắc nghẽn (Congestion Control)

**Vấn đề**: Nhiều sender cùng gửi → router trung gian tràn buffer → mất gói hàng loạt.

TCP dùng **cwnd** (congestion window) để ước lượng "khả năng chịu tải của mạng". Lượng dữ liệu sender thực sự gửi = min(rwnd, cwnd).

**Slow Start** (bắt đầu chậm — tên gây hiểu nhầm, thực ra tăng rất nhanh):
- Bắt đầu: cwnd = 1 MSS (Maximum Segment Size, thường 1460 byte).
- Mỗi RTT mà không mất gói: $\text{cwnd} \times 2$ (tăng theo hàm mũ).
- Ví dụ: cwnd = 1, 2, 4, 8, 16 MSS qua 5 RTT đầu.
- Dừng khi cwnd đạt ngưỡng ssthresh (slow start threshold), chuyển sang Congestion Avoidance.

**Congestion Avoidance** (tránh tắc nghẽn):
- cwnd tăng tuyến tính: +1 MSS mỗi RTT (không theo hàm mũ nữa).
- Ví dụ với ssthresh = 16 MSS: cwnd = 16, 17, 18, 19, 20 MSS...

**Khi phát hiện mất gói** (3 dup ACK → fast retransmit):
- $\text{ssthresh} = \text{cwnd} / 2$.
- cwnd = ssthresh (TCP Reno) hoặc cwnd = 1 (TCP Tahoe — cũ hơn).
- Bắt đầu lại congestion avoidance từ ssthresh.

**Ví dụ số cwnd theo thời gian** (TCP Reno, ssthresh ban đầu = 32 MSS):
```
RTT  cwnd (MSS)  Trạng thái
  1   1          Slow Start
  2   2          Slow Start
  3   4          Slow Start
  4   8          Slow Start
  5  16          Slow Start
  6  32          Slow Start → đến ssthresh, chuyển CA
  7  33          Congestion Avoidance
  8  34          Congestion Avoidance
  ...
 12  38          3 dup ACK tại đây → mất gói!
     ssthresh = 38/2 = 19; cwnd = 19 (TCP Reno)
 13  19          Congestion Avoidance (tiếp tục từ ssthresh)
 14  20          Congestion Avoidance
 ...
```

❓ **Câu hỏi tự nhiên**:

*"Vì sao gọi là 'slow start' nếu cwnd tăng theo hàm mũ?"* — Vì trước khi có slow start, TCP gửi toàn bộ window ngay từ đầu → làm tắc nghẽn mạng. "Slow" so với cách cũ đó, không phải slow về tuyệt đối.

*"MSS là gì?"* — Maximum Segment Size = kích thước dữ liệu tối đa trong một TCP segment, được thỏa thuận trong handshake. Thường bằng MTU mạng (1500 byte Ethernet) trừ header IP (20 byte) và TCP (20 byte) $= 1500 - 20 - 20 =$ **1460 byte**.

📝 **Tóm tắt mục 5**:
- Sliding window: gửi nhiều segment liên tiếp; $\text{Throughput} = \frac{W}{RTT}$.
- Flow control: rwnd (receive window) bảo vệ receiver không tràn buffer.
- Congestion control: cwnd tăng mũ (slow start) rồi tuyến tính (CA); cắt giảm khi mất gói.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Điền SEQ/ACK qua 3-way handshake.

Client chọn ISN = 500. Server chọn ISN = 800. Hoàn thành bảng sau:

| Bước | Flags | SEQ | ACK |
|------|-------|-----|-----|
| Client → Server | SYN | 500 | ??? |
| Server → Client | SYN, ACK | ??? | ??? |
| Client → Server | ACK | ??? | ??? |

---

**Bài 2**: Tính byte đã nhận từ ACK number.

Sau handshake, server gửi HTTP response. Client nhận được ACK=4501 từ server (server xác nhận data client gửi). ISN của client là 200. Hỏi: client đã gửi bao nhiêu byte dữ liệu ứng dụng?

---

**Bài 3**: Vì sao 3-way handshake không thể rút xuống 2 bước?

Phân tích: nếu chỉ dùng 2 bước (SYN → SYN-ACK), thông tin nào chưa được xác nhận? Điều gì có thể xảy ra?

---

**Bài 4**: Tính throughput theo window và RTT.

a) Window size = 32 KB, RTT = 80 ms. Tính throughput tối đa.
b) Đường truyền có băng thông 1 Gbps, RTT = 20 ms. Window size tối thiểu để đạt 500 Mbps là bao nhiêu?
c) Kết nối qua vệ tinh địa tĩnh: RTT = 600 ms, window = 64 KB. Tính throughput. Nhận xét.

---

**Bài 5**: Phân tích mất gói và fast retransmit.

Sender gửi 5 segment liên tiếp: SEQ = 1001, 2001, 3001, 4001, 5001 (mỗi segment 1000 byte). Segment 3 (SEQ=3001) bị mất.

a) Liệt kê các ACK mà receiver gửi sau mỗi segment nhận được.
b) Sau bao nhiêu duplicate ACK thì sender thực hiện fast retransmit?
c) Sau khi phát lại SEQ=3001, receiver gửi ACK bao nhiêu (giả sử buffer đủ và đã giữ segment 4, 5)?

---

### Lời giải chi tiết

**Lời giải Bài 1**:

Bước 1 — Client gửi SYN:
- SEQ = 500 (ISN client).
- ACK = 0 (chưa nhận gì từ server, trường ACK không có ý nghĩa khi ACK flag = 0).

Bước 2 — Server gửi SYN-ACK:
- SEQ = 800 (ISN server).
- ACK = 501 (= client ISN + 1, xác nhận SYN của client chiếm 1 số thứ tự).

Bước 3 — Client gửi ACK:
- SEQ = 501 (= client ISN + 1, client đã "tiêu thụ" SEQ=500 cho SYN).
- ACK = 801 (= server ISN + 1, xác nhận SYN của server).

| Bước | Flags | SEQ | ACK |
|------|-------|-----|-----|
| Client → Server | SYN | 500 | 0 |
| Server → Client | SYN, ACK | 800 | 501 |
| Client → Server | ACK | 501 | 801 |

---

**Lời giải Bài 2**:

ISN của client = 200. Sau handshake, SEQ đầu tiên của data = 201 (SYN tiêu thụ 200).

Server nhận đủ đến byte 4500, nên ACK = 4501.

Số byte data application $= 4501 - 201 =$ **4300 byte**.

Kiểm tra: byte đầu tiên $= 201$, byte cuối $= 4500$, tổng $= 4500 - 201 + 1 = 4300$ byte. ✓

---

**Lời giải Bài 3**:

Với 2 bước (SYN → SYN-ACK):
- Client biết: SYN mình gửi → server nhận OK (vì server trả lời).
- Client biết: SYN-ACK server gửi → client nhận OK.
- **Server KHÔNG biết**: SYN-ACK mình gửi có đến client không. Server không nhận được xác nhận.

Hậu quả:
1. Server mở kết nối, phân bổ tài nguyên (buffer, socket), nhưng client có thể đã không nhận được SYN-ACK (lost) → server chờ mãi, lãng phí tài nguyên.
2. **SYN flood attack**: kẻ tấn công gửi SYN liên tục với IP giả → server mở hàng nghìn half-open connection → cạn tài nguyên. Bước 3 (ACK) khiến tấn công này tốn kém hơn (kẻ tấn công phải nhận SYN-ACK và gửi ACK thật).

→ Bước 3 (ACK từ client) là **xác nhận server biết client đã nhận được SYN-ACK**, hoàn thành đồng bộ 2 chiều.

---

**Lời giải Bài 4**:

**Câu a**: Window $= 32$ KB $= 32{,}768$ byte, RTT $= 80$ ms $= 0.08$ s.

$$\text{Throughput} = \frac{32{,}768}{0.08} = 409{,}600 \text{ byte/s} = 409.6 \text{ KB/s} \approx 3.28 \text{ Mbps}$$

**Câu b**: Muốn đạt 500 Mbps, RTT $= 20$ ms $= 0.02$ s.

$$\begin{aligned}
500 \text{ Mbps} &= \frac{500 \times 10^6}{8} = 62{,}500{,}000 \text{ byte/s} \\
W_{\text{tối thiểu}} &= 62{,}500{,}000 \times 0.02 = 1{,}250{,}000 \text{ byte} \approx 1.19 \text{ MB}
\end{aligned}$$

→ Cần TCP window scaling vì window field TCP chỉ 16-bit $=$ tối đa 65,535 byte (64 KB). Với window scaling option (RFC 1323): window có thể lên đến 1 GB.

**Câu c**: Window $= 64$ KB $= 65{,}536$ byte, RTT $= 600$ ms $= 0.6$ s.

$$\text{Throughput} = \frac{65{,}536}{0.6} = 109{,}227 \text{ byte/s} \approx 874 \text{ Kbps} \approx 0.85 \text{ Mbps}$$

Nhận xét: dù đường truyền vệ tinh có thể có băng thông hàng trăm Mbps, TCP window 64 KB và RTT cao 600 ms bóp nghẹt throughput xuống chưa đến 1 Mbps. Giải pháp: TCP window scaling, hoặc dùng giao thức khác (QUIC, PEP — Performance Enhancing Proxy) tối ưu cho satellite.

---

**Lời giải Bài 5**:

SEQ: 1001, 2001, 3001(MẤT), 4001, 5001. Mỗi segment 1000 byte.

**Câu a** — các ACK receiver gửi:
- Nhận SEQ=1001 (byte 1001–2000) → ACK = 2001.
- Không nhận SEQ=2001 → Nhận SEQ=2001: ACK = 3001.
- SEQ=3001 bị mất → Nhận SEQ=4001 (out-of-order) → ACK = 3001 (dup ACK #1, mong nhận từ 3001).
- Nhận SEQ=5001 (out-of-order) → ACK = 3001 (dup ACK #2).
- (Sender gửi thêm nếu window cho phép) → ACK = 3001 (dup ACK #3).

**Câu b** — Fast retransmit kích hoạt sau **3 duplicate ACK** (3 lần nhận ACK=3001).

**Câu c** — Sau khi phát lại SEQ=3001 và receiver nhận:
- Receiver đã buffer segment 4001 và 5001 (byte 4001–6000).
- Bây giờ có đủ 1001 đến 6000.
- Receiver gửi ACK = **6001** (cumulative ACK xác nhận tất cả byte đến 6000).

---

## 7. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 07 — UDP](../lesson-07-udp/) — giao thức không kết nối, nền để hiểu điểm khác biệt của TCP.
- **Bài tiếp theo (Tầng 2)**: [Lesson 01 (Tầng 2) — Client-server & Socket](../../02-Application-Services/lesson-01-client-server-sockets/) — ứng dụng thực sự dùng TCP như thế nào qua socket API.
- **Liên kết chéo**:
  - Mã hóa trên TCP: xem `Cryptography/` — TLS handshake chạy sau TCP handshake.
  - Lập trình socket: xem `Programming/` — Go `net.Dial`, `net.Listen` dùng TCP.

---

## 📝 Tổng kết Lesson 08

1. **TCP là giao thức hướng kết nối, tin cậy, có thứ tự** — bổ sung những gì IP không đảm bảo.
2. **Header 20 byte** chứa SEQ/ACK (đánh số byte, không phải gói tin), flags (SYN/ACK/FIN/RST...), window size.
3. **Bắt tay 3 bước**: SYN (ISN client) → SYN-ACK (ISN server + xác nhận) → ACK (xác nhận server). Sau đó kết nối hai chiều sẵn sàng.
4. **Truyền tin cậy**: timeout + fast retransmit (3 dup ACK); receiver buffer out-of-order; cumulative ACK.
5. **Sliding window**: Throughput = Window / RTT. Flow control (rwnd) bảo vệ receiver; congestion control (cwnd, slow start, CA) bảo vệ mạng.
