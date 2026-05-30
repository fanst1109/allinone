# Lesson 07 — Công cụ chẩn đoán mạng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Dùng thành thạo **ping**, **traceroute/tracert**, **nslookup/dig**, **netstat/ss**, **curl** để kiểm tra từng tầng mạng.
- Đọc và hiểu output thực tế của từng công cụ — bao gồm các trường `time=`, `ttl=`, `loss%`, `hop`, bản ghi DNS, trạng thái cổng TCP.
- Dùng **Wireshark/tcpdump** để bắt và phân tích gói tin, viết bộ lọc cơ bản.
- Áp dụng quy trình chẩn đoán có hệ thống từ tầng thấp lên cao (link → IP → DNS → TCP → ứng dụng) để xử lý sự cố "không vào được web".

## Kiến thức tiền đề

- [Lesson 05 — ARP, ICMP, DHCP, NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) — ping dùng giao thức ICMP.
- [Lesson 08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — trạng thái kết nối LISTEN/ESTABLISHED trong netstat/ss.
- [Lesson 02 — DNS](../../02-Application-Services/lesson-02-dns/) — nslookup/dig truy vấn DNS.

---

## 1. ping — Kiểm tra khả năng kết nối và độ trễ

💡 **Trực giác**: Hãy tưởng tượng bạn gọi "Ê, có nghe không?" và chờ đối phương đáp lại "Nghe rồi!". Ping làm đúng như vậy — gửi một gói tin ICMP Echo Request tới máy đích, chờ nhận ICMP Echo Reply. Nếu máy đích trả lời được → đường đi từ nguồn đến đích hoạt động ở tầng IP. Nếu không trả lời → có thể mất kết nối, hoặc bị tường lửa chặn ICMP.

### 1.1. Cơ chế hoạt động

Ping hoạt động dựa trên giao thức **ICMP (Internet Control Message Protocol)** — xem [Lesson 05](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/):

1. Máy nguồn gửi **ICMP Echo Request** (type 8, code 0) tới địa chỉ IP đích.
2. Máy đích nhận được, gửi lại **ICMP Echo Reply** (type 0, code 0).
3. Máy nguồn đo thời gian từ lúc gửi đến lúc nhận = **RTT (Round-Trip Time)**.

Mỗi gói tin ping có một số định danh **sequence number** tăng dần, dùng để phát hiện gói bị mất.

### 1.2. Cú pháp và output thực tế

```bash
# Linux/macOS — gửi 4 gói
ping -c 4 google.com

# Windows — gửi 4 gói
ping -n 4 google.com
```

**Output mẫu thực tế:**

```
PING google.com (142.250.185.14) 56(84) bytes of data.
64 bytes from 142.250.185.14: icmp_seq=1 ttl=117 time=12.4 ms
64 bytes from 142.250.185.14: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from 142.250.185.14: icmp_seq=3 ttl=117 time=12.1 ms
64 bytes from 142.250.185.14: icmp_seq=4 ttl=117 time=13.2 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 11.8/12.375/13.2/0.544 ms
```

### 1.3. Đọc output — các trường quan trọng

| Trường | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| `64 bytes` | Kích thước gói reply (header ICMP + payload) | Mặc định 56 byte payload + 8 byte header = 64 |
| `icmp_seq=1` | Số thứ tự gói — để phát hiện mất gói | Nếu nhảy từ seq=1 lên seq=3 → mất seq=2 |
| `ttl=117` | Time To Live còn lại khi tới máy nguồn | Bắt đầu thường là 64 (Linux) hoặc 128 (Windows) |
| `time=12.4 ms` | RTT của gói này | Độ trễ một chiều ≈ RTT/2 |
| `0% packet loss` | Tỷ lệ gói bị mất | > 5% thường là có vấn đề |
| `rtt min/avg/max/mdev` | Thống kê RTT | `mdev` = độ lệch chuẩn, lớn → mạng không ổn định |

**Suy luận từ TTL**: Mỗi router giảm TTL đi 1. Nếu biết máy đích dùng Windows (TTL gốc 128) và nhận được `ttl=117` → đã qua **128 − 117 = 11 hop (bước nhảy qua router)**.

### 1.4. Các trường hợp output đặc biệt

```
Request timeout for icmp_seq 1
```
→ Gói bị mất hoặc reply không về kịp trong timeout (mặc định 1-2 giây). Có thể do: mạng nghẽn, tường lửa chặn ICMP, máy đích tắt.

```
Destination Host Unreachable
```
→ Router trên đường đi gửi ICMP "Unreachable" về — không tìm được đường tới đích.

```
ping: cannot resolve google.com: Name or service not known
```
→ DNS không phân giải được tên miền. Vấn đề là DNS, không phải kết nối IP.

❓ **Câu hỏi tự nhiên:**

- *"ping thành công nghĩa là web cũng vào được?"* — Không. Ping chỉ kiểm tra IP reachability. Web dùng TCP cổng 80/443 — cổng đó có thể bị chặn dù ping được.
- *"TTL=1 nghĩa là gì?"* — Gói chỉ đi được qua 1 hop nữa trước khi bị hủy. Thường gặp trong mạng nội bộ.
- *"ping địa chỉ private 192.168.1.1 được nhưng ping 8.8.8.8 không được, lỗi ở đâu?"* — Kết nối trong LAN tốt, vấn đề ở gateway/router ra internet.

⚠ **Lỗi thường gặp**: Kết luận "mạng hỏng" chỉ vì ping không được. Nhiều firewall/router (kể cả của Google, Amazon) chặn ICMP hoàn toàn — ping thất bại nhưng web vẫn vào được bình thường.

🔁 **Tự kiểm tra**: Ping tới 8.8.8.8 trả về `ttl=55`, biết đây là máy Linux (TTL gốc 64). Đã đi qua bao nhiêu hop?
<details><summary>Đáp án</summary>64 − 55 = <strong>9 hop</strong>.</details>

📝 **Tóm tắt mục 1**:
- ping = ICMP Echo Request/Reply, đo RTT và phát hiện mất gói.
- `time=` là RTT; `ttl=` cho biết số hop; `loss%` là tỷ lệ mất gói.
- Ping được ≠ TCP/HTTP hoạt động. Ping không được ≠ mạng chết (ICMP có thể bị chặn).

---

## 2. traceroute / tracert — Theo dõi đường đi từng hop

💡 **Trực giác**: Khi bưu phẩm đi từ Hà Nội → TP.HCM qua 5 trạm trung chuyển, bạn muốn biết bưu phẩm đang kẹt ở trạm nào. traceroute làm đúng điều đó — vẽ bản đồ đường đi của gói tin từng hop một, kèm thời gian dừng ở mỗi trạm.

### 2.1. Cơ chế TTL tăng dần

traceroute lợi dụng cơ chế **TTL (Time To Live)** của IP:

1. Gửi gói đầu tiên với `TTL=1`. Router đầu tiên nhận gói, giảm TTL xuống 0, **hủy gói và gửi ICMP "Time Exceeded"** về cho nguồn. Nguồn biết địa chỉ IP của router đầu tiên.
2. Gửi gói thứ hai với `TTL=2`. Vượt qua router 1, đến router 2 → router 2 hủy và gửi ICMP về. Biết router 2.
3. Tăng TTL dần... đến khi gói tới đích.

Mỗi hop gửi 3 gói để đo RTT 3 lần.

### 2.2. Cú pháp và output thực tế

```bash
# Linux/macOS (dùng UDP mặc định)
traceroute google.com

# Linux với ICMP (tương tự Windows)
traceroute -I google.com

# Windows
tracert google.com
```

**Output mẫu thực tế:**

```
traceroute to google.com (142.250.185.14), 30 hops max, 60 byte packets
 1  192.168.1.1 (192.168.1.1)    1.2 ms   0.9 ms   1.1 ms
 2  10.10.20.1 (10.10.20.1)      3.4 ms   3.1 ms   3.5 ms
 3  203.162.4.1 (203.162.4.1)    8.7 ms   8.2 ms   8.9 ms
 4  * * *
 5  72.14.233.1 (72.14.233.1)   15.2 ms  14.8 ms  15.1 ms
 6  142.250.185.14 (google.com)  12.4 ms  11.8 ms  12.1 ms
```

### 2.3. Đọc output — các trường quan trọng

| Cột | Ý nghĩa | Ví dụ |
|-----|---------|-------|
| Số thứ tự | Số hop (bước nhảy) | 1 = gateway LAN, 2 = router ISP... |
| Địa chỉ IP | IP của router tại hop đó | `192.168.1.1` = gateway nhà |
| 3 giá trị ms | RTT của 3 gói thăm dò | `1.2 ms  0.9 ms  1.1 ms` |
| `* * *` | Không nhận được reply | Router chặn ICMP hoặc gói bị mất |

**Ý nghĩa của `* * *`**: Router tại hop đó không gửi ICMP Time Exceeded về. Có 3 khả năng:
1. Router cố ý chặn ICMP (rất phổ biến với router của ISP hoặc CDN).
2. Gói bị mất trên đường đến router đó.
3. Router quá tải, không có thời gian xử lý ICMP.

Quan trọng: `* * *` ở hop giữa không có nghĩa là kết nối đứt — nếu các hop sau vẫn hiện IP → chỉ router giữa chặn ICMP.

**Walk-through phân tích output mẫu trên:**
- Hop 1: `192.168.1.1` → gateway nhà (LAN), RTT ~1 ms → bình thường.
- Hop 2: `10.10.20.1` → router ISP đầu tiên (địa chỉ private → không public), RTT ~3 ms.
- Hop 3: `203.162.4.1` → router ISP backbone, RTT ~8 ms.
- Hop 4: `* * *` → router chặn ICMP, nhưng hop 5 vẫn trả lời → không bị đứt.
- Hop 5-6: đường vào hệ thống Google, RTT ~12-15 ms.

❓ **Câu hỏi tự nhiên:**
- *"traceroute dừng ở hop 10 không tiếp nữa — lỗi ở hop 10?"* — Chưa chắc. Nếu hop 10 là `* * *` và không có hop sau → có thể là đứt tại hop 10, hoặc mọi router từ đó trở đi đều chặn ICMP. Kết hợp ping trực tiếp vào đích để xác nhận.
- *"RTT tăng đột biến ở hop 7 từ 5 ms lên 80 ms — lỗi không?"* — Có thể là router tại hop 7 xử lý ICMP với ưu tiên thấp (rate limiting), còn gói data thật vẫn đi nhanh. Xem RTT của hop 8, 9... nếu quay về thấp → không phải bottleneck thật.

⚠ **Lỗi thường gặp**: Kết luận "nghẽn mạng tại hop X" chỉ vì RTT cao tại hop đó. Router có thể xử lý ICMP chậm nhưng forward data packets rất nhanh. Chỉ lo khi RTT cao **và** duy trì cao cho tất cả hop sau.

📝 **Tóm tắt mục 2**:
- traceroute dùng TTL tăng dần 1→2→3... để lộ từng router trên đường đi.
- Mỗi hop hiển thị IP + 3 RTT.
- `* * *` = router chặn ICMP, không nhất thiết là lỗi kết nối.
- Nếu traceroute dừng và ping đích cũng thất bại → đứt tại hop cuối biết được.

---

## 3. nslookup / dig — Truy vấn DNS

💡 **Trực giác**: DNS như danh bạ điện thoại — bạn biết tên người (google.com) nhưng cần số máy để gọi (IP). nslookup và dig là công cụ để "tra danh bạ" này — xem chi tiết tại [Lesson 02 DNS](../../02-Application-Services/lesson-02-dns/).

### 3.1. nslookup — công cụ đơn giản

```bash
nslookup google.com
```

**Output mẫu:**
```
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:    google.com
Address: 142.250.185.14
Address: 142.250.185.46
```

- `Server: 8.8.8.8` → DNS resolver đang dùng (8.8.8.8 = Google Public DNS).
- `Non-authoritative answer` → trả lời từ cache của resolver, không phải từ authoritative nameserver trực tiếp.
- Nhiều địa chỉ IP → Google dùng nhiều IP để load balancing.

**Truy vấn các loại bản ghi khác:**
```bash
nslookup -type=MX gmail.com      # bản ghi mail server
nslookup -type=NS google.com     # nameserver của domain
nslookup -type=TXT google.com    # bản ghi text (SPF, DKIM...)
```

### 3.2. dig — công cụ chuyên sâu

```bash
dig google.com
dig google.com MX
dig @8.8.8.8 google.com A    # hỏi thẳng server 8.8.8.8
dig +trace google.com         # theo dõi toàn bộ quá trình phân giải
```

**Output mẫu thực tế — `dig google.com`:**
```
; <<>> DiG 9.18.1 <<>> google.com
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;google.com.                    IN  A

;; ANSWER SECTION:
google.com.             300     IN  A     142.250.185.14

;; Query time: 8 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; MSG SIZE  rcvd: 55
```

### 3.3. Đọc output dig — các trường quan trọng

**Phần ANSWER SECTION** — đây là nơi cần đọc:

```
google.com.    300    IN    A    142.250.185.14
```

| Cột | Ý nghĩa | Ví dụ |
|-----|---------|-------|
| `google.com.` | Tên được truy vấn | Dấu chấm cuối = tên đầy đủ (FQDN) |
| `300` | TTL còn lại (giây) | 300 = 5 phút → cache 5 phút nữa hết hạn |
| `IN` | Lớp (Internet — luôn là IN) | Không quan trọng trong thực tế |
| `A` | Loại bản ghi | A = IPv4, AAAA = IPv6, MX = mail... |
| `142.250.185.14` | Giá trị bản ghi | IP đích cần kết nối |

**Ví dụ bản ghi MX (mail):**
```bash
dig gmail.com MX
```
```
gmail.com.    3600    IN    MX    5  gmail-smtp-in.l.google.com.
gmail.com.    3600    IN    MX    10 alt1.gmail-smtp-in.l.google.com.
gmail.com.    3600    IN    MX    20 alt2.gmail-smtp-in.l.google.com.
```
- Số trước tên (5, 10, 20) = **priority** — số nhỏ hơn được ưu tiên hơn.

**Ví dụ bản ghi NS:**
```bash
dig google.com NS
```
```
google.com.    21600    IN    NS    ns1.google.com.
google.com.    21600    IN    NS    ns2.google.com.
google.com.    21600    IN    NS    ns3.google.com.
google.com.    21600    IN    NS    ns4.google.com.
```

❓ **Câu hỏi tự nhiên:**
- *"TTL=0 nghĩa là gì?"* — Bản ghi hết hạn cache ngay lập tức — mỗi request đều phải hỏi lại DNS thật. Thường dùng khi cần failover nhanh.
- *"status: NXDOMAIN nghĩa là gì?"* — Domain không tồn tại (Non-Existent Domain). Khác với `SERVFAIL` là lỗi server DNS, và `REFUSED` là server từ chối trả lời.
- *"Hỏi thẳng `@8.8.8.8` vs hỏi mặc định có gì khác?"* — Khi debug DNS, hỏi thẳng nhiều server khác nhau để so sánh — phát hiện DNS poisoning hoặc cache stale.

📝 **Tóm tắt mục 3**:
- `nslookup` và `dig` truy vấn DNS, trả về bản ghi A/AAAA/MX/NS/TXT.
- TTL trong bản ghi = thời gian còn lại trong cache (giây).
- `dig +trace` theo dõi toàn bộ chuỗi phân giải root → TLD → authoritative.
- `status: NXDOMAIN` = domain không tồn tại.

---

## 4. netstat / ss — Xem cổng và kết nối TCP; curl xem HTTP header

💡 **Trực giác**: Hãy nghĩ netstat/ss như "bản đồ cửa phòng" trong tòa nhà — cho thấy phòng nào đang mở cửa chờ khách (LISTEN), phòng nào đang có người bên trong nói chuyện (ESTABLISHED), phòng nào đang đóng cửa lại (CLOSE_WAIT, TIME_WAIT). Xem thêm trạng thái TCP tại [Lesson 08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/).

### 4.1. netstat — công cụ truyền thống

```bash
# Xem tất cả kết nối TCP và cổng đang lắng nghe
netstat -tuln

# Xem kèm tên tiến trình (cần quyền root trên Linux)
netstat -tulnp

# Xem kết nối đang thiết lập (ESTABLISHED)
netstat -t
```

Tùy chọn thường dùng: `-t` = TCP, `-u` = UDP, `-l` = chỉ LISTEN, `-n` = số, không dịch tên, `-p` = tên tiến trình.

**Output mẫu `netstat -tuln`:**
```
Proto Recv-Q Send-Q  Local Address    Foreign Address   State
tcp        0      0  0.0.0.0:22       0.0.0.0:*         LISTEN
tcp        0      0  0.0.0.0:80       0.0.0.0:*         LISTEN
tcp        0      0  127.0.0.1:3306   0.0.0.0:*         LISTEN
tcp        0      0  192.168.1.5:57423  142.250.185.14:443  ESTABLISHED
tcp6       0      0  :::443           :::*              LISTEN
```

### 4.2. ss — công cụ hiện đại (thay thế netstat)

```bash
# Xem cổng TCP đang lắng nghe
ss -tlnp

# Xem tất cả kết nối TCP
ss -t

# Lọc theo cổng cụ thể
ss -t '( sport = :443 or dport = :443 )'
```

`ss` nhanh hơn `netstat` vì đọc trực tiếp từ kernel, không qua `/proc`.

### 4.3. Đọc output netstat/ss

| Cột | Ý nghĩa |
|-----|---------|
| `Proto` | tcp hoặc udp |
| `Local Address: 0.0.0.0:80` | `0.0.0.0` = lắng nghe trên mọi interface; `:80` = cổng 80 |
| `Local Address: 127.0.0.1:3306` | Chỉ lắng nghe từ localhost — MySQL không mở ra ngoài |
| `Foreign Address: 142.250.185.14:443` | IP:cổng của đầu kia kết nối |
| `LISTEN` | Đang chờ kết nối đến |
| `ESTABLISHED` | Đang có kết nối hoạt động |
| `TIME_WAIT` | Đang chờ timeout sau khi đóng TCP (2×MSL ≈ 60-120 giây) |

**Walk-through đọc output mẫu:**
- `:22 LISTEN` → SSH đang chạy, chấp nhận kết nối từ mọi nơi.
- `:80 LISTEN` → Web server HTTP đang chạy.
- `127.0.0.1:3306 LISTEN` → MySQL chỉ nhận kết nối từ localhost — đúng về bảo mật.
- `192.168.1.5:57423 → 142.250.185.14:443 ESTABLISHED` → Máy này đang kết nối HTTPS tới Google.

### 4.4. curl — Xem HTTP header và kiểm tra web

```bash
# Xem chỉ header HTTP response
curl -I https://google.com

# Xem header + body
curl -v https://google.com

# Theo dõi redirect
curl -L -I https://google.com

# Đặt timeout 5 giây
curl --max-time 5 https://google.com
```

**Output mẫu `curl -I https://google.com`:**
```
HTTP/2 301
location: https://www.google.com/
content-type: text/html; charset=UTF-8
date: Fri, 30 May 2026 03:00:00 GMT
server: gws
x-xss-protection: 0
x-frame-options: SAMEORIGIN
cache-control: public, max-age=2592000
```

Đọc output:
- `HTTP/2 301` → status code 301 = redirect vĩnh viễn. 200 = OK, 404 = Not Found, 500 = lỗi server.
- `location:` → URL redirect tới.
- `server: gws` → loại web server (Google Web Server).
- `cache-control: max-age=2592000` → cache 30 ngày.

❓ **Câu hỏi tự nhiên:**
- *"Cổng LISTEN trên `0.0.0.0` vs `127.0.0.1` khác gì?"* — `0.0.0.0` = nhận từ mọi địa chỉ (kể cả từ internet nếu firewall cho phép). `127.0.0.1` = chỉ nhận từ chính máy đó — an toàn hơn cho dịch vụ nội bộ.
- *"Có nhiều kết nối TIME_WAIT — đáng lo không?"* — Không đáng lo nếu số lượng không quá lớn (vài nghìn). TIME_WAIT là cơ chế bình thường của TCP để tránh nhầm gói cũ. Xem thêm tại [Lesson 08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/).

📝 **Tóm tắt mục 4**:
- `netstat -tuln` / `ss -tlnp`: xem cổng đang LISTEN.
- `127.0.0.1:PORT` = chỉ local; `0.0.0.0:PORT` = mở ra ngoài.
- `curl -I URL`: kiểm tra nhanh HTTP header và status code.
- `ESTABLISHED` = kết nối đang hoạt động; `TIME_WAIT` = đang chờ đóng TCP.

---

## 5. Wireshark / tcpdump — Bắt và phân tích gói tin

💡 **Trực giác**: Nếu ping, traceroute, dig là "hỏi thăm từ xa", thì Wireshark/tcpdump giống như đặt **máy nghe lén** trên đường dây — thu lại từng gói tin đi qua, xem nội dung bên trong. Đây là công cụ mạnh nhất để hiểu chính xác chuyện gì đang xảy ra ở mức byte.

### 5.1. tcpdump — bắt gói trên dòng lệnh

```bash
# Bắt tất cả gói trên interface eth0
tcpdump -i eth0

# Lọc chỉ gói TCP cổng 80
tcpdump -i eth0 tcp port 80

# Bắt 100 gói và lưu ra file
tcpdump -i eth0 -c 100 -w /tmp/capture.pcap

# Đọc file capture đã lưu
tcpdump -r /tmp/capture.pcap

# Bắt gói không dịch tên host, hiển thị nội dung ASCII
tcpdump -i eth0 -n -A tcp port 80
```

**Bộ lọc tcpdump phổ biến:**

| Bộ lọc | Bắt gì |
|--------|--------|
| `tcp port 80` | TCP cổng 80 (HTTP) |
| `host 8.8.8.8` | Gói từ hoặc đến 8.8.8.8 |
| `src host 192.168.1.5` | Gói từ 192.168.1.5 |
| `tcp and port 443` | HTTPS |
| `icmp` | Chỉ gói ICMP (ping/traceroute) |
| `not port 22` | Loại SSH (để không bắt traffic điều khiển) |

### 5.2. Wireshark — phân tích trực quan

Wireshark là GUI cho việc bắt và phân tích gói — dùng cùng engine bắt gói (`libpcap`) như tcpdump nhưng có giao diện đồ họa, color coding, và khả năng "follow stream".

**Bộ lọc Wireshark (display filter) — cú pháp khác tcpdump:**

| Bộ lọc Wireshark | Bắt gì |
|-----------------|--------|
| `tcp.port == 80` | TCP cổng 80 |
| `http` | Toàn bộ HTTP |
| `http.request.method == "GET"` | Chỉ GET request |
| `ip.addr == 8.8.8.8` | Gói liên quan 8.8.8.8 |
| `tcp.flags.syn == 1` | Gói SYN |
| `dns` | Toàn bộ DNS |
| `tcp.port == 80 or tcp.port == 443` | HTTP và HTTPS |

### 5.3. Đọc một phiên bắt tay TCP + HTTP request

Dưới đây là capture thực tế của phiên HTTP (GET google.com) — 10 gói quan trọng:

```
No.  Time    Source           Destination     Protocol  Info
1    0.000   192.168.1.5      142.250.185.14  TCP       [SYN] Seq=0 Win=65535
2    0.012   142.250.185.14   192.168.1.5     TCP       [SYN,ACK] Seq=0 Ack=1 Win=65535
3    0.012   192.168.1.5      142.250.185.14  TCP       [ACK] Seq=1 Ack=1 Win=65535
4    0.013   192.168.1.5      142.250.185.14  HTTP      GET / HTTP/1.1
5    0.025   142.250.185.14   192.168.1.5     TCP       [ACK] Seq=1 Ack=78 Win=65535
6    0.026   142.250.185.14   192.168.1.5     HTTP      HTTP/1.1 200 OK (text/html)
7    0.026   192.168.1.5      142.250.185.14  TCP       [ACK] Seq=78 Ack=5121 Win=65535
8    0.027   192.168.1.5      142.250.185.14  TCP       [FIN,ACK] Seq=78 Ack=5121
9    0.039   142.250.185.14   192.168.1.5     TCP       [FIN,ACK] Seq=5121 Ack=79
10   0.039   192.168.1.5      142.250.185.14  TCP       [ACK] Seq=79 Ack=5122
```

**Walk-through phân tích từng gói:**

- **Gói 1-3: TCP 3-way handshake** (xem [Lesson 08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/)):
  - Gói 1: Client gửi `[SYN]` — "Tôi muốn kết nối".
  - Gói 2: Server đáp `[SYN,ACK]` — "OK, và tôi cũng muốn kết nối".
  - Gói 3: Client gửi `[ACK]` — "Xác nhận, kết nối xác lập". Thời gian handshake = 0.012 s = **12 ms RTT**.

- **Gói 4: HTTP GET request**:
  ```
  GET / HTTP/1.1
  Host: google.com
  User-Agent: Mozilla/5.0...
  Accept: text/html,...
  ```

- **Gói 5: ACK từ server** — Server nhận được request (78 byte), xác nhận.

- **Gói 6: HTTP 200 OK response** — Server gửi HTML. `Ack=5121` → body HTML = 5121 − 1 = **5120 byte**.

- **Gói 7: ACK từ client** — Client nhận xong response.

- **Gói 8-10: TCP 4-way close** — `[FIN]` + `[ACK]` để đóng kết nối gracefully.

❓ **Câu hỏi tự nhiên:**
- *"Sao không thấy gói DNS trước gói 1?"* — Trong capture này đã lọc chỉ TCP, DNS dùng UDP cổng 53 nên không hiện. Để thấy cả DNS: bỏ filter hoặc dùng `tcp or udp port 53`.
- *"HTTPS thì khác gì?"* — Sau gói 3 (handshake TCP), sẽ có thêm **TLS handshake** (4-6 gói) trước khi trao đổi dữ liệu. Nội dung request/response sẽ là byte mã hóa, không đọc được như HTTP.

⚠ **Lỗi thường gặp**: Quên chạy Wireshark/tcpdump với quyền root/admin — kết quả là không bắt được gói nào hoặc bắt thiếu.

📝 **Tóm tắt mục 5**:
- tcpdump = bắt gói trên CLI; Wireshark = phân tích gói trực quan với GUI.
- Bộ lọc tcpdump: `tcp port 80`, `host IP`, `icmp`. Bộ lọc Wireshark: `tcp.port==80`, `http`, `dns`.
- Phiên TCP gồm: 3-way handshake → dữ liệu → 4-way close.
- HTTPS: sau handshake TCP còn có TLS handshake — nội dung mã hóa.

---

## 6. Quy trình chẩn đoán có hệ thống

💡 **Trực giác**: Bác sĩ không thể khám bệnh từ đầu ngón tay rồi mới tới tim — phải khám theo quy trình. Tương tự, khi mạng hỏng, phải kiểm tra từ tầng thấp lên cao. Kết nối vật lý → IP → DNS → TCP → ứng dụng. Phát hiện tầng nào hỏng → dừng ở đó, không cần kiểm tra tiếp.

### 6.1. Mô hình 5 tầng chẩn đoán

```
Tầng 5: Ứng dụng  → curl, browser, telnet
Tầng 4: TCP/UDP   → netstat/ss, telnet HOST PORT
Tầng 3: IP/DNS    → ping IP, nslookup, dig
Tầng 2: Link/ARP  → ping gateway, arp -a
Tầng 1: Vật lý    → đèn LED, cable, ifconfig/ip addr
```

### 6.2. Kịch bản: "Không vào được web" — 7 bước

**Triệu chứng**: Mở Chrome, gõ `https://example.com` → trình duyệt báo `ERR_CONNECTION_TIMED_OUT`.

**Bước 1 — Kiểm tra interface mạng (tầng vật lý/link)**:
```bash
ip addr show     # Linux
ipconfig         # Windows
```
Kiểm tra: có địa chỉ IP không? Đèn NIC có sáng không? Nếu không có IP → kiểm tra DHCP, cable.

**Bước 2 — Ping gateway (tầng link/IP nội bộ)**:
```bash
ping 192.168.1.1   # gateway thường là .1
```
Nếu thất bại → vấn đề trong mạng LAN. Kiểm tra cable, switch, WiFi.

**Bước 3 — Ping IP bên ngoài (tầng IP internet)**:
```bash
ping 8.8.8.8    # Google DNS
```
Nếu thất bại nhưng ping gateway thành công → vấn đề ở router, ISP, hoặc firewall chặn outbound.

**Bước 4 — Kiểm tra DNS**:
```bash
nslookup example.com
dig example.com
```
Nếu `ping 8.8.8.8` được nhưng `ping example.com` thất bại → DNS hỏng. Thử đổi DNS sang 8.8.8.8 hoặc 1.1.1.1.

**Bước 5 — Kiểm tra cổng TCP đích**:
```bash
telnet example.com 443     # kiểm tra HTTPS
telnet example.com 80      # kiểm tra HTTP
```
Nếu DNS OK nhưng telnet thất bại (Connection refused / timeout) → server không lắng nghe cổng đó, hoặc firewall chặn.

**Bước 6 — Kiểm tra HTTP/HTTPS**:
```bash
curl -v https://example.com
curl --max-time 10 -I https://example.com
```
Nếu telnet OK nhưng curl thất bại → vấn đề ở tầng TLS (certificate hết hạn, SNI) hoặc ứng dụng web.

**Bước 7 — Phân tích sâu với Wireshark/tcpdump**:
```bash
tcpdump -i eth0 host example.com -w /tmp/debug.pcap
```
Mở file trong Wireshark, xem gói bị reset (RST), gói không nhận ACK, hay không có gói nào đi ra.

### 6.3. Bảng tóm tắt: Triệu chứng → Công cụ → Kết luận

| Triệu chứng | Công cụ đầu tiên | Kết luận nếu thất bại |
|-------------|-----------------|----------------------|
| Không ping được gì | `ip addr`, `ping gateway` | Không có IP / vấn đề LAN |
| Ping gateway được, 8.8.8.8 không được | `traceroute 8.8.8.8` | Router/ISP/firewall |
| Ping IP được, DNS không | `dig`, `nslookup` | DNS server hỏng/cấu hình sai |
| DNS OK, web không vào | `curl -v`, `telnet PORT` | Firewall TCP, server down, TLS lỗi |
| Web chậm, timeout ngẫu nhiên | `ping -f`, `traceroute`, `tcpdump` | Nghẽn mạng, packet loss |

❓ **Câu hỏi tự nhiên:**
- *"Luôn phải làm đủ 7 bước?"* — Không. Nếu bước 2 đã thấy vấn đề → dừng lại fix bước 2, không cần kiểm tra tiếp.
- *"Có cách nào kiểm tra nhanh hơn không?"* — Có. Script kiểm tra tự động: chạy tuần tự và dừng khi thất bại.

📝 **Tóm tắt mục 6**:
- Chẩn đoán từ tầng thấp lên: vật lý → link → IP → DNS → TCP → ứng dụng.
- Mỗi bước dùng một công cụ cụ thể.
- Phát hiện tầng nào hỏng → tập trung fix tầng đó.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Đọc output ping**: Phân tích output sau và trả lời các câu hỏi:
```
PING 192.168.1.1 (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.8 ms
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.7 ms
Request timeout for icmp_seq 2
64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=1.1 ms
64 bytes from 192.168.1.1: icmp_seq=4 ttl=64 time=0.9 ms

5 packets transmitted, 4 packets received, 20% packet loss
```
a) Có bao nhiêu gói bị mất? Gói nào?  
b) Đây là máy Linux hay Windows? Vì sao?  
c) Đây là kết nối đi qua bao nhiêu router?  
d) Tình trạng mạng đánh giá thế nào?

**Bài 2 — Đọc output traceroute**: Phân tích output sau:
```
traceroute to 8.8.8.8 (8.8.8.8)
 1  192.168.1.1       1.2 ms   1.1 ms   1.0 ms
 2  10.0.0.1          4.5 ms   4.3 ms   4.4 ms
 3  * * *
 4  * * *
 5  72.14.211.1      18.3 ms  17.9 ms  18.1 ms
 6  8.8.8.8          19.2 ms  18.8 ms  19.0 ms
```
a) Kết nối có thành công không? Vì sao?  
b) Hop 3 và 4 là `* * *` — có đứt mạng tại đó không?  
c) Tính RTT từ máy nguồn tới 8.8.8.8.  
d) Hop 1 và 2 có địa chỉ private — điều này nói lên gì?

**Bài 3 — Đọc output dig**: Cho output `dig hasaki.vn MX`:
```
;; ANSWER SECTION:
hasaki.vn.    3600    IN    MX    10  aspmx.l.google.com.
hasaki.vn.    3600    IN    MX    20  alt1.aspmx.l.google.com.
hasaki.vn.    3600    IN    MX    30  alt2.aspmx.l.google.com.
```
a) Email gửi tới @hasaki.vn sẽ đến mail server nào trước?  
b) TTL=3600 nghĩa là gì?  
c) Nếu `aspmx.l.google.com` không đáp ứng, server nào xử lý tiếp?  
d) Đây là dịch vụ mail của nhà cung cấp nào?

**Bài 4 — Chẩn đoán sự cố**: Server web của bạn tại IP `10.0.0.5`. Từ máy client:
- `ping 10.0.0.5` → OK, RTT=1ms
- `curl http://10.0.0.5` → `Connection refused`
- `curl https://10.0.0.5` → `Connection refused`

Hãy liệt kê 3 nguyên nhân có thể và lệnh để xác nhận từng nguyên nhân.

**Bài 5 — Viết bộ lọc Wireshark**: Viết bộ lọc Wireshark để:
a) Chỉ xem gói HTTP GET request.  
b) Chỉ xem gói SYN (bắt đầu kết nối TCP mới).  
c) Xem traffic giữa IP `192.168.1.5` và `8.8.8.8`.  
d) Chỉ xem gói DNS và HTTP.  
e) Loại bỏ traffic SSH (cổng 22) khỏi capture.

**Bài 6 — Quy trình chẩn đoán**: Bạn không SSH được vào server `203.162.100.50`. Hãy mô tả quy trình chẩn đoán từng bước, bắt đầu từ tầng thấp nhất, kèm lệnh cụ thể và cách đọc kết quả.

---

### Lời giải chi tiết

**Lời giải Bài 1**:

a) **1 gói bị mất — gói icmp_seq=2**. Dễ thấy seq nhảy từ 1 sang 3, thiếu seq=2. Thống kê xác nhận: `20% packet loss` = 1/5 gói.

b) **Linux**. TTL=64 — máy Linux/macOS mặc định TTL gốc là 64. Windows mặc định 128. Khi TTL nhận về bằng đúng 64 (không giảm) → đây là máy nội bộ (0 hop giữa).

c) **0 router** — TTL nhận về = 64 = TTL gốc của Linux → gói không qua router nào. `192.168.1.1` là máy trong cùng mạng LAN (gateway thường dùng địa chỉ này), kết nối trực tiếp.

d) **Có vấn đề nhỏ** — 20% loss trong mạng LAN là bất thường (bình thường nên 0%). Có thể do: cable lỏng, switch lỗi, driver NIC có vấn đề. Cần kiểm tra thêm.

---

**Lời giải Bài 2**:

a) **Kết nối thành công** — hop cuối (hop 6) là `8.8.8.8` với RTT ~19ms, có nghĩa gói đã đến đích.

b) **Không đứt tại hop 3, 4** — vì hop 5 và 6 vẫn trả lời bình thường. `* * *` ở hop 3-4 = router tại đó chặn ICMP Time Exceeded (rất phổ biến với router ISP backbone). Đây là hành vi bình thường.

c) **RTT ≈ 19.0 ms** (lấy giá trị hop cuối cùng, avg ≈ (19.2+18.8+19.0)/3 = 19.0 ms).

d) **Máy nguồn nằm sau ít nhất 2 lớp NAT/router riêng tư**:
   - `192.168.1.1` = gateway LAN nhà (RFC 1918 private).
   - `10.0.0.1` = router tiếp theo, địa chỉ private (RFC 1918) — thường là router của ISP phân bổ cho thuê bao.
   - Hop 5 (`72.14.211.1`) mới là địa chỉ public (Google infrastructure).

---

**Lời giải Bài 3**:

a) **`aspmx.l.google.com.` (priority=10)** — MX priority nhỏ hơn = ưu tiên cao hơn. Priority 10 < 20 < 30 → server đầu tiên thử là `aspmx.l.google.com`.

b) **TTL=3600 = 1 giờ** — Bản ghi MX này được cache trong 1 giờ. Sau 1 giờ, resolver phải hỏi lại authoritative nameserver. Nếu admin thay đổi MX record, sau tối đa 3600 giây toàn bộ resolver sẽ biết.

c) **`alt1.aspmx.l.google.com.` (priority=20)** — Nếu server priority 10 không đáp ứng, thử tiếp server priority 20.

d) **Google Workspace (Gmail cho doanh nghiệp)** — Tên `aspmx.l.google.com` là mail exchanger của Google. `hasaki.vn` dùng Google Workspace để xử lý email doanh nghiệp.

---

**Lời giải Bài 4**:

**Nguyên nhân 1: Web server chưa chạy hoặc bị crash**

Xác nhận: SSH vào server (nếu được) và kiểm tra:
```bash
# Kiểm tra service
systemctl status nginx
systemctl status apache2

# Kiểm tra cổng đang LISTEN
ss -tlnp | grep -E ':80|:443'
```
Nếu không có dòng LISTEN → service chưa chạy. Fix: `systemctl start nginx`.

**Nguyên nhân 2: Web server đang chạy nhưng bind sai địa chỉ**

Xác nhận:
```bash
ss -tlnp | grep ':80'
```
Nếu thấy `127.0.0.1:80 LISTEN` (chỉ localhost) thay vì `0.0.0.0:80` → web server chỉ nhận kết nối từ localhost. Fix: sửa config bind address thành `0.0.0.0`.

**Nguyên nhân 3: Firewall chặn cổng 80 và 443**

Xác nhận:
```bash
# Kiểm tra iptables
iptables -L INPUT -n | grep -E '80|443'

# Kiểm tra ufw
ufw status
```
Nếu thấy rule DROP/REJECT cho cổng 80/443 → firewall đang chặn. Fix: `ufw allow 80/tcp && ufw allow 443/tcp`.

---

**Lời giải Bài 5**:

a) `http.request.method == "GET"` — lọc chỉ HTTP GET request.

b) `tcp.flags.syn == 1 and tcp.flags.ack == 0` — chỉ gói SYN đầu tiên (SYN-only, không phải SYN-ACK).

c) `ip.addr == 192.168.1.5 and ip.addr == 8.8.8.8` — gói có cả 2 địa chỉ (bất kể chiều).

d) `dns or http` — gộp DNS và HTTP.

e) `not tcp.port == 22` hoặc `tcp.port != 22` — loại bỏ SSH.

---

**Lời giải Bài 6**:

**Bước 1 — Kiểm tra kết nối internet cơ bản:**
```bash
ping -c 4 8.8.8.8
```
Nếu thất bại → vấn đề ở mạng của client, không phải server. Kiểm tra gateway và kết nối internet trước.

**Bước 2 — Kiểm tra IP route tới server:**
```bash
ping -c 4 203.162.100.50
traceroute 203.162.100.50
```
- Ping OK → IP route tới server hoạt động.
- Ping thất bại, traceroute dừng ở đâu → tắc ở router nào, liên hệ ISP.

**Bước 3 — Kiểm tra DNS (nếu dùng hostname):**
```bash
dig server.example.com
```
Ở đây đã biết IP nên DNS không phải vấn đề — bỏ qua bước này.

**Bước 4 — Kiểm tra cổng SSH (22) có mở không:**
```bash
telnet 203.162.100.50 22
```
- Kết nối được, thấy `SSH-2.0-OpenSSH_8.x` → SSH service đang chạy → vấn đề ở xác thực (sai password/key).
- `Connection refused` → SSH không lắng nghe cổng 22 (service chưa chạy hoặc đổi cổng).
- `Connection timed out` → firewall đang chặn cổng 22.

**Bước 5 — Xác định firewall vs service:**
```bash
# Scan cổng (nếu có nmap)
nmap -p 22 203.162.100.50
```
- `22/tcp open` → service chạy, vấn đề ở xác thực.
- `22/tcp filtered` → firewall chặn.
- `22/tcp closed` → service không chạy.

**Bước 6 — Nếu có quyền console server (datacenter/KVM):**
```bash
systemctl status sshd
ss -tlnp | grep ':22'
```
Fix tùy nguyên nhân: `systemctl start sshd`, sửa firewall, kiểm tra `/etc/ssh/sshd_config`.

---

## Liên kết và bài tiếp theo

### Kiến thức liên quan trong repo

- [Lesson 05 — ARP, ICMP, DHCP, NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) — cơ chế ICMP mà ping và traceroute dùng.
- [Lesson 08 — TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — trạng thái TCP mà netstat/ss hiển thị.
- [Lesson 02 — DNS](../../02-Application-Services/lesson-02-dns/) — DNS mà nslookup/dig truy vấn.
- [Lesson 06 — Mạng đám mây](../lesson-06-cloud-networking/) — bài trước trong chuỗi.

### Bài tiếp theo

- [Lesson 08 — Dự án tổng hợp](../lesson-08-project/) — áp dụng toàn bộ kiến thức Networking vào dự án thực tế.

---

## 📝 Tổng kết Lesson 07

1. **ping** = ICMP Echo, đo RTT và packet loss. `time=` là RTT, `ttl=` suy ra số hop, `loss%` là tỷ lệ mất gói.
2. **traceroute** = TTL tăng dần để lộ từng router. `* * *` = router chặn ICMP, không phải lỗi kết nối.
3. **nslookup/dig** = truy vấn DNS. TTL trong bản ghi = thời gian cache còn lại. `NXDOMAIN` = domain không tồn tại.
4. **netstat/ss** = xem cổng LISTEN và kết nối ESTABLISHED. `0.0.0.0:PORT` = mở ra ngoài; `127.0.0.1:PORT` = chỉ local.
5. **curl** = kiểm tra HTTP header và status code. **Wireshark/tcpdump** = phân tích gói tin mức byte.
6. **Quy trình chẩn đoán**: từ tầng thấp lên — vật lý → IP → DNS → TCP → ứng dụng. Phát hiện tầng hỏng → dừng và fix.
