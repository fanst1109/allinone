# Lesson 03 — Địa chỉ IP & Subnetting

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đọc và viết địa chỉ IPv4 dạng thập phân chấm, đổi qua lại với nhị phân.
- Phân biệt lớp địa chỉ A/B/C, địa chỉ private, loopback.
- Hiểu subnet mask và ký hiệu CIDR (/n): phần network vs phần host.
- **Tính toán subnet**: cho IP/prefix → network address, broadcast, dải host khả dụng, số host.
- Chia một mạng lớn thành nhiều mạng con (subnetting) bằng cách mượn bit.
- Kiểm tra hai địa chỉ IP có thuộc cùng mạng con không.

## Kiến thức tiền đề

- [Lesson 01 — Mô hình phân tầng](../lesson-01-layered-models/) — hiểu Tầng 3 (Network layer).
- [Lesson 02 — Tầng liên kết & Ethernet](../lesson-02-link-ethernet/) — địa chỉ MAC vs địa chỉ IP.
- Đọc/ghi số nhị phân — nếu cần ôn lại xem [DataFoundations](../../../DataFoundations/).

---

## 1. Địa chỉ IPv4 — cấu trúc 32-bit

### 1.1. Định nghĩa và vai trò

💡 **Trực giác**: Địa chỉ IP giống như **địa chỉ nhà**. Địa chỉ MAC (Ethernet) như số xe — định danh phần cứng, chỉ dùng trong cùng đường phố (LAN). Địa chỉ IP như số nhà + tên phố + thành phố — dùng để giao thư xuyên thành phố, xuyên quốc gia qua hệ thống bưu chính (router).

**Địa chỉ IPv4** là một số 32-bit, chia thành 4 **octet** (mỗi octet = 8 bit), viết dưới dạng thập phân ngăn cách bằng dấu chấm. Ví dụ: `192.168.1.10`.

**Vì sao cần địa chỉ IP (mà không chỉ dùng MAC)?**

- MAC là nhà sản xuất gán cứng, không theo cấu trúc phân cấp → router không thể gom nhóm hàng triệu thiết bị thành vùng địa lý để tính đường đi.
- IP có cấu trúc phân cấp: phần đầu = mạng (như "tỉnh/thành"), phần sau = host (như "số nhà") → router chỉ cần biết đường tới "tỉnh", không cần nhớ từng thiết bị.

### 1.2. Đổi octet ↔ nhị phân

Mỗi octet = 8 bit, giá trị 0–255. Giá trị bit: 128, 64, 32, 16, 8, 4, 2, 1.

**Công thức nhớ nhanh**: nhìn vào giá trị, trừ dần từ bit lớn nhất:
- Bit 128: trừ được không?
- Bit 64: trừ được không?
- … (tiếp tục cho đến bit 1).

**Ví dụ 1 — đổi 192 sang nhị phân**:
```
192 = 128 + 64 = 11000000
      ↑    ↑
     bit7  bit6  (bit 5-0 = 0)
```
Kiểm tra: 128 + 64 = 192 ✓

**Ví dụ 2 — đổi 168 sang nhị phân**:
```
168 = 128 + 32 + 8 = 10101000
      ↑    ↑    ↑
     bit7  bit5  bit3
```
Kiểm tra: 128 + 32 + 8 = 168 ✓

**Ví dụ 3 — đổi 255 sang nhị phân**:
```
255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 11111111
```
255 = 2^8 − 1 = tất cả 8 bit bật.

**Ví dụ 4 — đổi 10 sang nhị phân**:
```
10 = 8 + 2 = 00001010
          ↑   ↑
         bit3  bit1
```
Kiểm tra: 8 + 2 = 10 ✓

**Toàn bộ địa chỉ `192.168.1.10` dạng nhị phân**:
```
192       . 168       . 1         . 10
11000000  . 10101000  . 00000001  . 00001010
```
Đây là 32 bit liên tiếp: `11000000 10101000 00000001 00001010`.

**Ví dụ 5 — đổi nhị phân → thập phân** (chiều ngược lại):
Cho nhị phân `11001100`:
```
bit7=1 bit6=1 bit5=0 bit4=0 bit3=1 bit2=1 bit1=0 bit0=0
= 128 + 64 + 0 + 0 + 8 + 4 + 0 + 0 = 204
```

❓ **Câu hỏi tự nhiên**:

- *"Tại sao mỗi octet tối đa là 255?"* — Vì 8 bit, tối đa = 2^8 − 1 = 255.
- *"Có bao nhiêu địa chỉ IPv4 tổng cộng?"* — 2^32 = 4.294.967.296 ≈ 4,3 tỷ địa chỉ.
- *"Tại sao IPv4 cạn kiệt?"* — 4,3 tỷ địa chỉ không đủ cho hàng chục tỷ thiết bị toàn cầu. Giải pháp tạm thời là NAT (sẽ học Lesson 05), giải pháp dài hạn là IPv6 (Lesson 06).

🔁 **Dừng lại tự kiểm tra**: Đổi `172.31.200.5` sang nhị phân.

<details>
<summary>Đáp án</summary>

```
172 = 128+32+8+4     = 10101100
 31 = 16+8+4+2+1     = 00011111
200 = 128+64+8       = 11001000
  5 = 4+1            = 00000101
```
`172.31.200.5` = `10101100.00011111.11001000.00000101`
</details>

📝 **Tóm tắt mục 1**:
- IPv4 = số 32-bit, 4 octet, mỗi octet 0–255.
- Đổi octet ↔ nhị phân bằng cách tổng các bit vị trí (128, 64, 32, 16, 8, 4, 2, 1).
- Tổng cộng 4,3 tỷ địa chỉ — đã cạn kiệt ở global level.

---

## 2. Phân lớp địa chỉ và địa chỉ đặc biệt

### 2.1. Lớp địa chỉ A/B/C (classful — lịch sử)

💡 **Trực giác**: Trước năm 1993, không gian địa chỉ IP chia thành "lớp" cố định — như phân chia đất nước thành tỉnh lớn/vừa/nhỏ với diện tích cố định. Ngày nay đã dùng CIDR (classless) linh hoạt hơn, nhưng hiểu lớp giúp đọc tài liệu cũ và nhận diện nhanh loại địa chỉ.

| Lớp | Bit đầu tiên | Dải octet 1 | Mặt nạ mặc định | Số mạng | Số host/mạng | Dùng cho |
|-----|-------------|-------------|-----------------|---------|--------------|----------|
| A | 0xxxxxxx | 1–126 | /8 (255.0.0.0) | 128 | ~16,7 triệu | Tổ chức rất lớn |
| B | 10xxxxxx | 128–191 | /16 (255.255.0.0) | 16.384 | ~65.534 | Doanh nghiệp lớn |
| C | 110xxxxx | 192–223 | /24 (255.255.255.0) | ~2,1 triệu | 254 | Mạng nhỏ |
| D | 1110xxxx | 224–239 | — | multicast | — | Phát đa điểm |
| E | 11110xxx | 240–255 | — | reserved | — | Thử nghiệm |

**Cách nhận diện nhanh**:
- Octet 1 = 1–126 → Lớp A.
- Octet 1 = 128–191 → Lớp B.
- Octet 1 = 192–223 → Lớp C.
- Octet 1 = 127 → loopback (đặc biệt, không thuộc lớp A thông thường).

### 2.2. Địa chỉ private (RFC 1918)

Địa chỉ private là những dải **không được định tuyến trên Internet** — chỉ dùng trong mạng nội bộ. Router Internet sẽ loại bỏ (drop) gói tin có địa chỉ private.

| Dải | Ký hiệu CIDR | Số địa chỉ | Thuộc lớp |
|-----|-------------|-----------|----------|
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | ~16,7 triệu | A |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | ~1,05 triệu | B |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | 65.536 | C |

💡 **Ví dụ thực tế**: Router WiFi nhà bạn thường cấp địa chỉ `192.168.1.x` cho điện thoại, máy tính. Đây là địa chỉ private — chỉ có nghĩa trong nhà bạn. Ra ngoài Internet, NAT (sẽ học Lesson 05) đổi chúng thành địa chỉ public của nhà mạng.

### 2.3. Địa chỉ đặc biệt khác

| Địa chỉ | Ý nghĩa |
|---------|---------|
| `127.0.0.1` (loopback) | Gửi tới chính thiết bị đó. `ping 127.0.0.1` kiểm tra TCP/IP stack hoạt động không cần card mạng. |
| `0.0.0.0` | "Địa chỉ không xác định" — dùng trong routing table nghĩa là "mọi đích" (default route). |
| `255.255.255.255` | Broadcast giới hạn — gửi tới mọi host trong mạng cục bộ. |
| `169.254.x.x` | APIPA (Automatic Private IP Addressing) — tự cấp khi DHCP không phản hồi. |

⚠ **Lỗi thường gặp**: Nhầm `127.0.0.1` là địa chỉ của router. Thực ra `127.0.0.1` là loopback — gói tin không rời thiết bị. Địa chỉ router (gateway) thường là `192.168.1.1` hoặc `10.0.0.1`.

📝 **Tóm tắt mục 2**:
- Lớp A/B/C: nhận diện qua octet đầu (1–126 / 128–191 / 192–223).
- Private: 10.x.x.x, 172.16-31.x.x, 192.168.x.x — không định tuyến trên Internet.
- Loopback 127.0.0.1: gửi tới chính mình, test stack TCP/IP.

---

## 3. Subnet Mask và ký hiệu CIDR

### 3.1. Phần network và phần host

💡 **Trực giác**: Địa chỉ IP chia thành 2 phần như địa chỉ nhà: **tên đường** (network) và **số nhà** (host). Hai nhà trên cùng đường = cùng network. Router dùng phần network để quyết định "chuyển sang nhánh mạng nào", switch/ARP dùng phần host để tìm đúng thiết bị.

Địa chỉ 32 bit: `[N bit network][H bit host]`. Với `/24`: N=24, H=8.

### 3.2. Subnet mask

**Subnet mask** là số 32-bit với N bit đầu = 1 (phần network), H bit sau = 0 (phần host).

Ví dụ `/24`:
```
11111111.11111111.11111111.00000000
= 255    . 255    . 255    . 0
```

**Phép tính AND bit**: `IP AND mask = Network address`
```
IP   : 192.168.1.10   = 11000000.10101000.00000001.00001010
Mask : 255.255.255.0  = 11111111.11111111.11111111.00000000
AND  :                = 11000000.10101000.00000001.00000000
                      = 192     .168     .1       .0
→ Network address = 192.168.1.0
```

### 3.3. Ký hiệu CIDR

**CIDR (Classless Inter-Domain Routing)** viết `/n` thay cho subnet mask đầy đủ — n = số bit 1 trong mask.

Bảng các prefix phổ biến:

| Prefix CIDR | Subnet mask | Bit host | Số địa chỉ | Số host khả dụng |
|-------------|-------------|----------|-----------|-----------------|
| /24 | 255.255.255.0 | 8 | 256 | 254 |
| /25 | 255.255.255.128 | 7 | 128 | 126 |
| /26 | 255.255.255.192 | 6 | 64 | 62 |
| /27 | 255.255.255.224 | 5 | 32 | 30 |
| /28 | 255.255.255.240 | 4 | 16 | 14 |
| /29 | 255.255.255.248 | 3 | 8 | 6 |
| /30 | 255.255.255.252 | 2 | 4 | 2 |
| /16 | 255.255.0.0 | 16 | 65536 | 65534 |
| /8 | 255.0.0.0 | 24 | 16777216 | 16777214 |

**Công thức**:
- Số địa chỉ tổng = 2^H (H = 32 − n).
- Số host khả dụng = 2^H − 2 (trừ network address và broadcast).

❓ **Câu hỏi tự nhiên**:

- *"Tại sao trừ 2?"* — Địa chỉ đầu tiên (tất cả bit host = 0) là **network address** — định danh mạng, không gán cho host. Địa chỉ cuối cùng (tất cả bit host = 1) là **broadcast** — gửi tới mọi host trong subnet.
- *"255.255.255.192 từ đâu ra với /26?"* — /26 có 26 bit 1, tức 2 octet đầu toàn 1 (= 255, 255), octet 3 toàn 1 (= 255), octet 4 có 2 bit 1 đầu: `11000000` = 192.
- *"/30 dùng khi nào?"* — Liên kết điểm-điểm (point-to-point) giữa 2 router: chỉ cần 2 host, /30 = 4 địa chỉ, 2 host khả dụng, không lãng phí.

🔁 **Dừng lại tự kiểm tra**: /27 có bao nhiêu host khả dụng? Octet 4 của mask là bao nhiêu?

<details>
<summary>Đáp án</summary>

- H = 32 − 27 = 5 bit host → 2^5 = 32 địa chỉ → 32 − 2 = **30 host khả dụng**.
- Octet 4 mask: 5 bit 0, 3 bit 1 (từ trái): `11100000` = 128+64+32 = **224**.
- Mask đầy đủ: `255.255.255.224`.
</details>

📝 **Tóm tắt mục 3**:
- Mask = chuỗi bit 1 (network) tiếp chuỗi bit 0 (host); biểu diễn dạng 4 octet thập phân.
- CIDR /n = số bit network; số host = 2^(32−n) − 2.
- `IP AND mask = network address`.

---

## 4. Tính toán subnet — walk-through từng bước

### 4.1. Quy trình tính subnet

Cho địa chỉ IP/prefix, tính:
1. **Network address**: IP AND mask (đặt tất cả bit host = 0).
2. **Broadcast address**: network address OR NOT(mask) (đặt tất cả bit host = 1).
3. **First host**: network address + 1.
4. **Last host**: broadcast − 1.
5. **Số host khả dụng**: 2^H − 2 (H = số bit host).

### 4.2. Ví dụ 1 — `192.168.1.130/26`

**Bước 1**: H = 32 − 26 = 6 bit host → 2^6 = 64 địa chỉ.

**Bước 2**: Viết octet 4 của IP và mask dạng nhị phân:
```
IP octet 4:   130 = 10000010
Mask octet 4: /26 → 2 bit host → 11000000 = 192
```

**Bước 3**: AND bit để tìm network address:
```
IP   : 192  . 168  . 1    . 130
       11000000.10101000.00000001.10000010
Mask : 255  . 255  . 255  . 192
       11111111.11111111.11111111.11000000
AND  : 11000000.10101000.00000001.10000000
     = 192  . 168  . 1    . 128
→ Network address = 192.168.1.128
```

**Bước 4**: Broadcast = đặt tất cả bit host = 1:
```
Network octet 4: 10000000
Bit host = 6 bit sau → 10111111 = 128+32+16+8+4+2+1 = 191
→ Broadcast = 192.168.1.191
```

**Bước 5**: Kết quả:
```
Network address : 192.168.1.128
First host      : 192.168.1.129
Last host       : 192.168.1.190
Broadcast       : 192.168.1.191
Số host         : 2^6 − 2 = 62
```

### 4.3. Ví dụ 2 — `10.20.50.100/25`

H = 32 − 25 = 7 bit host → 2^7 = 128 địa chỉ, 126 host.

```
IP octet 4:   100 = 01100100
Mask octet 4: /25 → 1 bit network, 7 bit host → 10000000 = 128

AND bit:
01100100
10000000
--------
00000000  = 0

Network address = 10.20.50.0
Broadcast       = 10.20.50.127   (bit host tất cả = 1 → 01111111 = 127)
First host      = 10.20.50.1
Last host       = 10.20.50.126
Số host         = 126
```

### 4.4. Ví dụ 3 — `172.16.5.200/28`

H = 32 − 28 = 4 bit host → 2^4 = 16 địa chỉ, 14 host.

```
IP octet 4:   200 = 11001000
Mask octet 4: /28 → 4 bit network, 4 bit host → 11110000 = 240

AND bit:
11001000
11110000
--------
11000000  = 192

Network address = 172.16.5.192
Broadcast: đặt 4 bit host = 1: 11001111 = 207
Broadcast       = 172.16.5.207
First host      = 172.16.5.193
Last host       = 172.16.5.206
Số host         = 14
```

### 4.5. Ví dụ 4 — `203.0.113.77/30`

H = 32 − 30 = 2 bit host → 2^2 = 4 địa chỉ, 2 host (dùng cho liên kết P2P).

```
IP octet 4:   77  = 01001101
Mask octet 4: /30 → 6 bit network, 2 bit host → 11111100 = 252

AND bit:
01001101
11111100
--------
01001100  = 64+8+4 = 76

Network address = 203.0.113.76
Broadcast: đặt 2 bit host = 1: 01001111 = 79
Broadcast       = 203.0.113.79
First host      = 203.0.113.77
Last host       = 203.0.113.78
Số host         = 2
```

Lưu ý: host `203.0.113.77` (IP đề bài) thuộc subnet này, là first host.

❓ **Câu hỏi tự nhiên**:

- *"Nếu tôi chỉ biết prefix /24 và /16 thì có cần tính bit không?"* — Với /24: octet 4 tự do (0–255), network = 3 octet đầu, broadcast = 3 octet đầu + .255. Với /16: 2 octet đầu cố định. Nhẩm rất nhanh. Với prefix khác cần tính bit.
- *"Làm sao biết IP thuộc subnet nào trong nhiều subnet?"* — Tính network address của IP (IP AND mask); so sánh với network address các subnet. Trùng → thuộc subnet đó.

⚠ **Lỗi thường gặp**:
- Quên trừ 2 khi đếm host (network + broadcast không dùng được).
- Tính broadcast bằng "network + 255" chỉ đúng với /24. Với /26: network + 63, /28: network + 15.
- Nhầm mask /26 = 11000000 = 192 ở octet 4 (đây là 2 bit mạng trong octet, không phải 6 bit).

🔁 **Dừng lại tự kiểm tra**: Cho `192.168.10.67/27`, tính network address, broadcast, số host.

<details>
<summary>Đáp án</summary>

H = 5, 2^5 = 32 địa chỉ, 30 host.
```
Octet 4 mask /27: 3 bit network, 5 bit host → 11100000 = 224
IP octet 4: 67  = 01000011
AND:
01000011
11100000
--------
01000000 = 64
Network = 192.168.10.64
Broadcast: 01000000 + 00011111 = 01011111 = 64+16+8+4+2+1 = 95
Broadcast = 192.168.10.95
First host = 192.168.10.65, Last host = 192.168.10.94, Số host = 30
```
</details>

📝 **Tóm tắt mục 4**:
- Network address = IP AND mask (bit host → 0).
- Broadcast = network address với bit host tất cả → 1.
- First host = network + 1, Last host = broadcast − 1.
- Luôn trừ 2 khi đếm host khả dụng.

---

## 5. Subnetting — chia mạng lớn thành mạng con

### 5.1. Khái niệm mượn bit

💡 **Trực giác**: Bạn có mảnh đất /24 (256 ô) và cần chia cho 4 khu. Thay vì chia ngẫu nhiên, bạn mượn 2 bit từ phần host (2^2 = 4 khu), mỗi khu còn 6 bit host (2^6 = 64 ô). Kết quả: 4 khu /26, mỗi khu 62 host khả dụng.

**Quy tắc mượn bit**:
- Muốn chia thành **S subnet**: cần mượn ít nhất ceil(log2(S)) bit. Ví dụ S=4 → mượn 2 bit (2^2=4).
- Sau khi mượn b bit: prefix mới = prefix cũ + b; số host mỗi subnet = 2^(H−b) − 2.
- Các subnet cách đều nhau, khoảng cách = 2^(H−b) địa chỉ.

### 5.2. Ví dụ — chia `192.168.1.0/24` thành 4 subnet /26

**Bước 1**: /24 → H = 8. Cần 4 subnet → mượn 2 bit → prefix mới /26, H mới = 6.

**Bước 2**: Khoảng cách giữa subnet = 2^6 = 64.

**Bước 3**: Liệt kê 4 subnet:

| Subnet | Network | First host | Last host | Broadcast |
|--------|---------|-----------|----------|-----------|
| 0 | 192.168.1.0/26 | 192.168.1.1 | 192.168.1.62 | 192.168.1.63 |
| 1 | 192.168.1.64/26 | 192.168.1.65 | 192.168.1.126 | 192.168.1.127 |
| 2 | 192.168.1.128/26 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 3 | 192.168.1.192/26 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

**Kiểm tra nhị phân cho subnet 2** (network address = 192.168.1.128):
```
128 = 10000000
Phần network: 10 (2 bit mượn = "10" → subnet index 2)
Phần host:    000000 (tất cả 0 → network address)
→ 10000000 ✓
```

**Kiểm tra**: 4 × 64 = 256 địa chỉ = toàn bộ /24. Không có địa chỉ bị bỏ sót hay chồng lấp.

### 5.3. Ví dụ — chia `10.0.0.0/16` thành 8 subnet /19

**Bước 1**: /16 → H = 16. Cần 8 subnet → mượn 3 bit → prefix mới /19, H mới = 13.

**Bước 2**: Khoảng cách = 2^13 = 8192.

**Bước 3**: Các subnet (liệt kê 4 đầu):

| Subnet | Network | Broadcast | Số host |
|--------|---------|-----------|---------|
| 0 | 10.0.0.0/19 | 10.0.31.255 | 8190 |
| 1 | 10.0.32.0/19 | 10.0.63.255 | 8190 |
| 2 | 10.0.64.0/19 | 10.0.95.255 | 8190 |
| 3 | 10.0.96.0/19 | 10.0.127.255 | 8190 |
| … | … | … | … |
| 7 | 10.0.224.0/19 | 10.0.255.255 | 8190 |

**Giải thích subnet 1 (10.0.32.0/19)**:
```
Octet 3 = 32 = 00100000 (3 bit network: "001", 5 bit host: "00000")
Broadcast: 5 bit host + octet 4 tất cả 1: 00111111 = 63, .255
→ Broadcast = 10.0.63.255 ✓
```

❓ **Câu hỏi tự nhiên**:

- *"Nếu số subnet cần không phải lũy thừa 2 thì sao?"* — Phải làm tròn lên. Cần 5 subnet → mượn 3 bit (2^3=8 ≥ 5), có 8 subnet nhưng dùng 5, 3 subnet còn lại để dự phòng hoặc mở rộng sau.
- *"Có thể chia subnet không đều nhau không?"* — Có, gọi là VLSM (Variable-Length Subnet Mask). Ví dụ dùng /30 cho liên kết P2P, /24 cho văn phòng lớn trong cùng một không gian địa chỉ. Đây là kỹ thuật nâng cao.

⚠ **Lỗi thường gặp**:
- Mượn bit vào phần host của octet 3 nhưng quên cộng dồn khi liệt kê subnet — phải cộng đúng khoảng cách = 2^(H−b).
- Tính số host mỗi subnet trên tổng /24 thay vì trên từng /26 con.

📝 **Tóm tắt mục 5**:
- Mượn b bit → 2^b subnet, prefix tăng thêm b, H giảm b.
- Các subnet cách đều nhau: khoảng cách = 2^(H−b).
- Kiểm tra: tổng địa chỉ mọi subnet = tổng địa chỉ mạng gốc.

---

## 6. Kiểm tra hai IP có cùng subnet không

### 6.1. Phương pháp

Hai địa chỉ IP **cùng subnet** khi và chỉ khi `IP1 AND mask = IP2 AND mask`.

**Ví dụ 1 — Cùng subnet**: `192.168.1.10` và `192.168.1.200`, mask `/24`

```
10.0.0.0
AND 255.255.255.0 = 192.168.1.0
200 (octet 4)
AND 0 = 0 → network = 192.168.1.0
```
Cả hai → `192.168.1.0/24`. **Cùng subnet.**

**Ví dụ 2 — Khác subnet**: `192.168.1.10` và `192.168.1.200`, mask `/26`

```
IP1 octet 4: 10 AND 192:
00001010
11000000
--------
00000000 = 0 → network = 192.168.1.0/26

IP2 octet 4: 200 AND 192:
11001000
11000000
--------
11000000 = 192 → network = 192.168.1.192/26
```
Khác network address → **Khác subnet.** Cần router để giao tiếp.

💡 **Ứng dụng thực tế**: Khi máy tính gửi gói tin tới một IP, nó thực hiện phép AND này ngay lập tức. Nếu cùng subnet → gửi thẳng (ARP tìm MAC). Nếu khác subnet → gửi qua gateway (router).

📝 **Tóm tắt mục 6**:
- `IP1 AND mask = IP2 AND mask` → cùng subnet → giao tiếp trực tiếp.
- Khác → phải qua router.
- Điều này xảy ra ở lớp Network (Layer 3) mỗi khi máy gửi gói tin.

---

## Bài tập

### Bài 1

Đổi địa chỉ `172.16.200.33` sang dạng nhị phân 32-bit.

### Bài 2

Subnet mask `255.255.254.0` tương đương CIDR prefix nào? Có bao nhiêu host khả dụng?

### Bài 3

Cho `192.168.50.87/27`, tính:
- Network address
- Broadcast address
- First host / Last host
- Số host khả dụng

### Bài 4

Cho `10.100.0.50/22`, tính network address, broadcast, số host.

### Bài 5

Chia mạng `192.168.10.0/24` thành 8 subnet bằng nhau. Liệt kê tất cả 8 subnet với network address và broadcast.

### Bài 6

`172.16.5.100/25` và `172.16.5.200/25` có thuộc cùng subnet không? Chứng minh bằng nhị phân.

### Bài 7 (nâng cao)

Một công ty được cấp mạng `10.0.0.0/22`. Cần chia cho:
- 1 subnet văn phòng A: tối thiểu 300 host.
- 1 subnet văn phòng B: tối thiểu 100 host.
- 2 subnet liên kết P2P router: chỉ cần 2 host mỗi subnet.

Đề xuất phân bổ VLSM hợp lý. Kiểm tra tổng địa chỉ không vượt quá /22.

---

## Lời giải chi tiết

### Bài 1

```
172 = 128+32+8+4    = 10101100
 16 = 16            = 00010000
200 = 128+64+8      = 11001000
 33 = 32+1          = 00100001
```
Kết quả: `10101100.00010000.11001000.00100001`

### Bài 2

`255.255.254.0`:
```
255 = 11111111 (8 bit 1)
255 = 11111111 (8 bit 1)
254 = 11111110 (7 bit 1)
  0 = 00000000 (0 bit 1)
```
Tổng: 8+8+7+0 = **23 bit 1** → prefix **/23**.

Số host = 2^(32−23) − 2 = 2^9 − 2 = 512 − 2 = **510 host**.

### Bài 3

`192.168.50.87/27`. H = 5, 2^5 = 32, 30 host.

```
Mask octet 4: /27 → 3 bit network → 11100000 = 224
Octet 4 IP:   87  = 01010111

AND:
01010111
11100000
--------
01000000 = 64

Network address = 192.168.50.64
Broadcast: đặt 5 bit host = 1: 01000000 + 00011111 = 01011111 = 64+16+8+4+2+1 = 95
Broadcast       = 192.168.50.95
First host      = 192.168.50.65
Last host       = 192.168.50.94
Số host         = 30
```

### Bài 4

`10.100.0.50/22`. H = 32−22 = 10, 2^10 = 1024, 1022 host.

Prefix /22: 2 octet đầu cố định (10, 100), octet 3 có 6 bit network và octet 4 toàn host.

```
Mask octet 3: /22 → 22 bit tổng, 8+8=16 dùng cho octet 1,2 → còn 6 bit cho octet 3
Mask octet 3: 11111100 = 252
Octet 3 IP:   0 = 00000000

AND octet 3: 00000000 AND 11111100 = 00000000 = 0

Network address = 10.100.0.0
Broadcast: đặt 10 bit host = 1:
  Octet 3: 00000011 = 3
  Octet 4: 11111111 = 255
Broadcast = 10.100.3.255
First host = 10.100.0.1
Last host  = 10.100.3.254
Số host    = 1022
```

### Bài 5

`192.168.10.0/24` chia 8 subnet → mượn 3 bit → /27. Khoảng cách = 2^5 = 32.

| Subnet | Network | Broadcast | Host range |
|--------|---------|-----------|-----------|
| 0 | 192.168.10.0/27 | 192.168.10.31 | .1–.30 |
| 1 | 192.168.10.32/27 | 192.168.10.63 | .33–.62 |
| 2 | 192.168.10.64/27 | 192.168.10.95 | .65–.94 |
| 3 | 192.168.10.96/27 | 192.168.10.127 | .97–.126 |
| 4 | 192.168.10.128/27 | 192.168.10.159 | .129–.158 |
| 5 | 192.168.10.160/27 | 192.168.10.191 | .161–.190 |
| 6 | 192.168.10.192/27 | 192.168.10.223 | .193–.222 |
| 7 | 192.168.10.224/27 | 192.168.10.255 | .225–.254 |

Kiểm tra: 8 × 32 = 256 = toàn bộ /24. ✓

### Bài 6

`172.16.5.100/25` và `172.16.5.200/25`. Mask /25: octet 4 = `10000000` = 128.

```
IP1 octet 4: 100 = 01100100
AND mask:         10000000
                  --------
                  00000000 = 0 → network = 172.16.5.0/25

IP2 octet 4: 200 = 11001000
AND mask:         10000000
                  --------
                  10000000 = 128 → network = 172.16.5.128/25
```

Network address khác nhau → **Khác subnet.** Cần router để giao tiếp.

### Bài 7 (nâng cao)

Mạng gốc: `10.0.0.0/22` → 2^10 = 1024 địa chỉ.

Phân bổ VLSM theo thứ tự từ lớn đến nhỏ:

| Dùng cho | Cần tối thiểu | Prefix chọn | Số host | Địa chỉ mạng | Broadcast |
|---------|-------------|-------------|---------|-------------|-----------|
| Văn phòng A | 300 host | /23 | 510 | 10.0.0.0/23 | 10.0.1.255 |
| Văn phòng B | 100 host | /25 | 126 | 10.0.2.0/25 | 10.0.2.127 |
| P2P link 1 | 2 host | /30 | 2 | 10.0.2.128/30 | 10.0.2.131 |
| P2P link 2 | 2 host | /30 | 2 | 10.0.2.132/30 | 10.0.2.135 |

Tổng địa chỉ dùng: 512 + 128 + 4 + 4 = 648. Còn lại: 1024 − 648 = 376 (dự phòng).

Kiểm tra: tất cả đều nằm trong `10.0.0.0 – 10.0.3.255` (giới hạn /22). ✓

**Tại sao /23 cho văn phòng A?** — 2^(32−23) − 2 = 510 ≥ 300. /24 chỉ cho 254 < 300 → không đủ.

---

## Liên kết và bài tiếp theo

- Tiền đề: [Lesson 01 — Mô hình phân tầng](../lesson-01-layered-models/) | [Lesson 02 — Tầng liên kết & Ethernet](../lesson-02-link-ethernet/)
- Tiếp theo: [Lesson 04 — Định tuyến (Routing)](../lesson-04-routing/) — cách router dùng bảng định tuyến để chuyển gói tin giữa các subnet.
- Liên quan: [DataFoundations](../../../DataFoundations/) — số nhị phân, hex.
- Trực quan: [visualization.html](./visualization.html) — máy tính subnet tương tác.

---

## 📝 Tổng kết

- **IPv4** = 32 bit, 4 octet, thập phân chấm. Tổng 4,3 tỷ địa chỉ — đã cạn kiệt.
- **Phân lớp A/B/C** theo octet đầu; **private** (10.x, 172.16-31.x, 192.168.x) không định tuyến Internet; **loopback** 127.0.0.1.
- **Subnet mask / CIDR /n**: n bit network, (32−n) bit host; số host = 2^(32−n) − 2.
- **Tính subnet**: IP AND mask = network; bit host tất cả 1 = broadcast; first = network+1; last = broadcast−1.
- **Subnetting**: mượn b bit → 2^b subnet mới, khoảng cách 2^(H−b), prefix mới = cũ+b.
- **Cùng subnet**: IP1 AND mask = IP2 AND mask → giao tiếp trực tiếp; khác → cần router.
