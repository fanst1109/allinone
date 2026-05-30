# Lesson 08 — Hạ tầng web quy mô lớn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao 1 server đơn không phục vụ nổi hàng triệu người dùng và vì sao cần phân tán.
- Nắm vững cơ chế **cân bằng tải (load balancer)**: các thuật toán phân phối, L4 vs L7, health check.
- Phân biệt **reverse proxy** và **forward proxy**, vai trò của từng loại trong hệ thống thực.
- Hiểu **CDN (Content Delivery Network)**: edge server, cache hit/miss, tính giảm độ trễ bằng số cụ thể.
- Nắm được khái niệm **mở rộng ngang (horizontal scaling)** vs **mở rộng dọc (vertical scaling)**, trạng thái không phiên (stateless) và sticky session.
- Tổng kết toàn bộ kiến trúc Tầng 2: từ socket → DNS → HTTP → TLS → real-time → hạ tầng.

## Kiến thức tiền đề

- [Lesson 02 — DNS](../lesson-02-dns/) — phân giải tên miền, DNS load balancing.
- [Lesson 04 — HTTP nâng cao](../lesson-04-http-advanced/) — caching, header Cache-Control.
- [Lesson 06 — TLS](../lesson-06-tls/) — TLS termination tại reverse proxy.
- [Lesson 01 — Client-server & Socket](../lesson-01-client-server-sockets/) — mô hình kết nối cơ bản.

---

## 1. Vấn đề quy mô: 1 server không đủ

### 1.1. Giới hạn của server đơn

💡 **Hình dung**: Một quầy thu ngân duy nhất trong siêu thị. Ngày thường 50 người mua — ổn. Ngày sale 10.000 người — hàng dài vô tận, thu ngân mệt lả, cuối cùng sập. Giải pháp: mở thêm quầy.

Một server web điển hình (8-core CPU, 32 GB RAM, 1 Gbps NIC) có thể phục vụ khoảng **10.000–50.000 request/giây** cho trang tĩnh đơn giản. Khi tải vượt ngưỡng:

| Tài nguyên | Triệu chứng khi cạn kiệt | Hậu quả |
|------------|--------------------------|---------|
| CPU | Thời gian xử lý mỗi request tăng | Response time tăng, timeout |
| RAM | Swap vào đĩa (I/O chậm hơn RAM 1000×) | Latency tăng vọt |
| Băng thông NIC | Queue overflow | Gói tin bị drop |
| Kết nối TCP đồng thời | Ephemeral port cạn (mặc định ~28.000 trên Linux) | Kết nối mới bị từ chối |

**Single point of failure (SPOF)**: Server duy nhất bị sập (lỗi phần cứng, mất điện, bug) → toàn bộ dịch vụ ngừng. Với hệ thống quan trọng (e-commerce, ngân hàng), mỗi phút downtime = hàng chục triệu đồng tổn thất.

### 1.2. Ví dụ thực tế: Facebook tháng 10/2021

Ngày 4/10/2021, Facebook (bao gồm Instagram, WhatsApp) sập toàn cầu trong **~6 giờ** do lỗi cấu hình BGP khiến toàn bộ traffic bị định tuyến sai. Ước tính thiệt hại: **~90 triệu USD doanh thu quảng cáo**. Đây không phải 1 server duy nhất — Facebook có hàng trăm nghìn server — nhưng minh họa rằng kiến trúc phải được thiết kế để không có SPOF ở bất kỳ tầng nào.

❓ **Câu hỏi tự nhiên**:

- *"Thêm RAM/CPU mạnh hơn có giải quyết được không?"* — Có nhưng giới hạn: phần cứng đắt phi tuyến, có trần vật lý (máy to nhất thế giới vẫn có giới hạn). Mở rộng ngang (thêm máy) linh hoạt và rẻ hơn.
- *"Bao nhiêu server thì đủ?"* — Phụ thuộc tải peak và yêu cầu uptime. Netflix có >1.000 microservice, mỗi service chạy nhiều instance. Không có con số cố định.

📝 **Tóm tắt mục 1**

- Server đơn bị giới hạn bởi CPU, RAM, băng thông, số kết nối TCP.
- SPOF: mọi điểm hỏng duy nhất đều gây sập toàn bộ hệ thống.
- Giải pháp: phân tán tải qua nhiều server, loại bỏ SPOF bằng dự phòng.

---

## 2. Cân bằng tải (Load Balancer)

### 2.1. Là gì và vì sao cần

💡 **Hình dung**: Load balancer là **bưu tá phân thư** đứng trước một tòa nhà nhiều tầng. Thư (request) đến → bưu tá nhìn vào phong bì → quyết định giao cho tầng (server) nào → giao đi. Người gửi chỉ biết địa chỉ tòa nhà, không biết tầng mấy.

**Load balancer (LB)** là thành phần nhận toàn bộ request từ client, rồi phân phối đến một trong nhiều server backend theo thuật toán nhất định.

```
Client A ─┐
Client B ─┤─→ [Load Balancer] ─→ Backend Server 1
Client C ─┤                   ─→ Backend Server 2
Client D ─┘                   ─→ Backend Server 3
```

Lợi ích:
- **Phân tán tải**: không server nào bị quá tải trong khi server khác rảnh.
- **Loại bỏ SPOF**: một server backend chết → LB chuyển request sang server khác tự động.
- **Khả năng scale**: thêm server backend mà không cần thay đổi phía client.
- **Một điểm vào (single entry point)**: client chỉ cần biết IP của LB.

### 2.2. Thuật toán phân phối

#### Round-Robin (xoay vòng)

Mỗi request lần lượt đến server tiếp theo theo vòng tròn.

```
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
Request 4 → Server 1 (quay lại đầu)
Request 5 → Server 2
...
```

**Walk-through cụ thể** — 3 server, 7 request:

| Request | Đến server | Lý do |
|---------|-----------|-------|
| #1 | S1 | Vị trí vòng = 0, S1 |
| #2 | S2 | Vị trí vòng = 1, S2 |
| #3 | S3 | Vị trí vòng = 2, S3 |
| #4 | S1 | Quay về 0, S1 |
| #5 | S2 | Vị trí 1, S2 |
| #6 | S3 | Vị trí 2, S3 |
| #7 | S1 | Quay về 0, S1 |

Sau 7 request: S1=3, S2=2, S3=2 (±1 request do 7 không chia hết 3).

**Ưu điểm**: đơn giản, công bằng khi server có cùng năng lực.
**Nhược điểm**: không biết server đang bận hay rảnh — request phức tạp và request đơn giản được coi như nhau.

#### Weighted Round-Robin (xoay vòng có trọng số)

Server mạnh hơn nhận nhiều request hơn theo tỷ lệ trọng số.

**Ví dụ**: S1 (16 core, weight=4), S2 (8 core, weight=2), S3 (8 core, weight=2).
- Trong mỗi chu kỳ 8 request: S1 nhận 4, S2 nhận 2, S3 nhận 2.
- Tỷ lệ: S1:S2:S3 = 4:2:2 = 2:1:1.

#### Least Connections (ít kết nối nhất)

Mỗi request mới được gửi đến server đang có **ít kết nối đang xử lý nhất**.

**Walk-through** — 3 server, trạng thái tức thời:

```
Thời điểm T=10s:
  S1: 150 kết nối đang xử lý
  S2: 89 kết nối đang xử lý   ← ít nhất
  S3: 120 kết nối đang xử lý

→ Request mới #1001 → S2 (89 là nhỏ nhất)

Thời điểm T=10.001s (sau khi S2 nhận thêm):
  S1: 150
  S2: 90
  S3: 120

→ Request mới #1002 → S2 (90 vẫn nhỏ nhất)
```

**Ưu điểm**: thích hợp khi các request có thời gian xử lý rất khác nhau (upload file lớn vs. truy vấn đơn giản).

#### IP Hash (hash địa chỉ IP)

`server_index = hash(client_IP) % số_server`

**Ví dụ**: Client IP `203.0.113.45`.
- `hash("203.0.113.45") = 1,857,402,819` (giả sử).
- `1,857,402,819 % 3 = 0` → luôn đến S1.

**Ưu điểm**: cùng một client luôn đến cùng một server → giải quyết vấn đề session (xem mục 5).
**Nhược điểm**: nếu S1 chết, tất cả client "thuộc về S1" phải rehash → phân phối lại.

⚠ **Lỗi thường gặp**: chọn Round-Robin cho ứng dụng có session (giỏ hàng, đăng nhập) mà không có sticky session hay shared session store → user đăng nhập xong bị văng ra vì request tiếp theo sang server khác không có session. Xem mục 5.

### 2.3. L4 vs L7 Load Balancing

**L4 Load Balancer** (tầng transport):
- Quyết định dựa trên **IP nguồn/đích và port TCP/UDP**.
- Không nhìn vào nội dung HTTP.
- Nhanh hơn, ít overhead hơn.
- Ví dụ: AWS Network Load Balancer (NLB), HAProxy ở mode TCP.

**L7 Load Balancer** (tầng ứng dụng):
- Đọc được nội dung HTTP: URL path, header, cookie.
- Quyết định dựa trên **nội dung request**.
- Ví dụ: `/api/` → API servers; `/static/` → static servers; `/images/` → image servers.
- Ví dụ thực tế: Nginx, AWS Application Load Balancer (ALB).

**So sánh**:

| Tiêu chí | L4 | L7 |
|---------|----|----|
| Tốc độ | Nhanh hơn (ít xử lý) | Chậm hơn một chút |
| Thông minh | Không thể route theo URL/cookie | Route theo URL, header, cookie |
| TLS termination | Không (pass-through) | Có (nhìn được HTTP cleartext) |
| Dùng khi | TCP/UDP chung, cần tốc độ cao | HTTP/S, cần routing thông minh |

### 2.4. Health Check — loại bỏ server "chết"

LB định kỳ gửi **health check** đến từng backend:

```
LB → GET /health HTTP/1.1 → S1
S1 → 200 OK {"status":"healthy"}  ✓ Server bình thường

LB → GET /health HTTP/1.1 → S2
S2 → [timeout 5 giây — không phản hồi]  ✗ Đánh dấu S2 là DOWN

LB → [Không gửi request mới đến S2]
LB → Kiểm tra lại S2 sau 10 giây...
```

**Thông số điển hình**: check interval 10s, timeout 5s, unhealthy threshold 3 lần fail liên tiếp → đánh dấu DOWN. Healthy threshold 2 lần pass → đưa lại vào pool.

🔁 **Dừng lại tự kiểm tra**:
- Câu hỏi 1: Với 4 server và Weighted Round-Robin trọng số 3:2:2:1, trong 8 request đầu tiên, S1 nhận bao nhiêu?
- Câu hỏi 2: LB đang dùng Round-Robin với S1, S2, S3. S2 bị đánh dấu DOWN sau 3 lần health check fail. Request tiếp theo (#43) đi về đâu?

<details>
<summary>Đáp án</summary>

**Câu 1**: Tổng trọng số = 3+2+2+1 = 8. Trong 8 request: S1 nhận 3, S2 nhận 2, S3 nhận 2, S4 nhận 1.

**Câu 2**: S2 bị loại khỏi pool. LB xoay vòng giữa S1 và S3. Nếu #42 đi S3 → #43 đi S1. Nếu #42 đi S1 → #43 đi S3.
</details>

📝 **Tóm tắt mục 2**

- Load balancer phân phối request đến nhiều backend, loại bỏ SPOF.
- Thuật toán: Round-Robin (đơn giản), Weighted Round-Robin (theo năng lực), Least Connections (theo tải thực), IP Hash (sticky client).
- L4 LB: nhanh, dựa vào IP/port. L7 LB: thông minh, dựa vào nội dung HTTP.
- Health check: tự động loại server lỗi, đưa lại khi phục hồi.

---

## 3. Reverse Proxy và Forward Proxy

### 3.1. Forward Proxy — proxy phía client

💡 **Hình dung**: Bạn nhờ người bạn ở nước ngoài mua hộ sản phẩm vì trang đó chặn IP Việt Nam. Bạn là client, người bạn là forward proxy, trang bán hàng là server.

**Forward proxy** đứng **phía trước client**, thay mặt client gửi request đến internet.

```
Client → [Forward Proxy] → Internet (các server khác nhau)
```

**Vai trò**:
- Ẩn danh tính client (server thấy IP của proxy, không thấy IP client).
- Lọc nội dung (doanh nghiệp chặn mạng xã hội trong giờ làm việc).
- Cache (nhiều client cùng mạng truy cập cùng tài nguyên → proxy cache giúp tiết kiệm băng thông).
- Kiểm soát truy cập (cha mẹ chặn nội dung không phù hợp cho trẻ em).

**Ví dụ thực tế**: Squid Proxy, Proxyman (debug), VPN (hoạt động tương tự về mặt routing).

### 3.2. Reverse Proxy — proxy phía server

💡 **Hình dung**: Tổng đài điện thoại của một công ty. Bạn gọi đến số điện thoại tổng (reverse proxy), tổng đài quyết định chuyển máy cho ai trong nội bộ (backend server). Bạn không biết và không cần biết nội bộ có bao nhiêu người.

**Reverse proxy** đứng **phía trước server**, thay mặt server nhận request từ internet.

```
Internet (clients) → [Reverse Proxy] → Backend servers nội bộ
```

**Vai trò**:
- **Che backend**: client không biết địa chỉ IP thật của backend server → khó tấn công trực tiếp.
- **TLS termination**: reverse proxy xử lý handshake TLS, gửi cleartext HTTP đến backend (backend không cần cài SSL certificate, đơn giản hơn).
- **Caching**: cache phản hồi tĩnh (ảnh, CSS, HTML) → giảm tải backend.
- **Compression**: nén gzip/brotli tại proxy → giảm băng thông.
- **Load balancing**: chức năng LB thường tích hợp vào reverse proxy.
- **Rate limiting**: giới hạn số request từ một IP → chống DDoS cơ bản.

**Ví dụ thực tế**: Nginx, Apache httpd, Caddy, AWS CloudFront (cũng là CDN).

### 3.3. Phân biệt rõ 2 loại

| Đặc điểm | Forward Proxy | Reverse Proxy |
|----------|--------------|--------------|
| Đứng phía nào | Phía client | Phía server |
| Client biết không | Biết (cần cấu hình) | Không biết (trong suốt) |
| Server biết không | Không biết IP client thật | Biết mình đằng sau proxy |
| Ẩn danh | Ẩn client khỏi server | Ẩn server khỏi client |
| Ví dụ use case | VPN công ty, web filter | Nginx trước Django/Node.js |

⚠ **Lỗi thường gặp**: nhầm vai trò của Nginx. Nginx **mặc định là reverse proxy** khi được cấu hình trước backend application. Nhiều người gọi nhầm là "proxy" mà không rõ chiều. Khi user cài VPN → đó là forward proxy.

### 3.4. TLS Termination — cụ thể hóa

Khi reverse proxy làm TLS termination:

```
Client ──[HTTPS/TLS]──→ Nginx (reverse proxy) ──[HTTP cleartext]──→ Backend :8080
                         ↑ xử lý TLS handshake
                         ↑ giải mã, kiểm tra chứng chỉ
                         ↑ chuyển tiếp cleartext nội bộ
```

**Lợi ích**: backend server không cần cài OpenSSL, không cần rotate certificate, code đơn giản hơn. TLS processing tập trung tại 1 chỗ.

**Lưu ý bảo mật**: traffic từ proxy đến backend đi qua mạng nội bộ dưới dạng cleartext. Trong môi trường cloud, mạng nội bộ (VPC) thường được coi là tin cậy. Nếu cần bảo mật end-to-end thì dùng mTLS (mutual TLS) giữa proxy và backend.

📝 **Tóm tắt mục 3**

- Forward proxy: phía client, ẩn client, dùng VPN/web filter.
- Reverse proxy: phía server, ẩn backend, TLS termination, caching, LB.
- Nginx là reverse proxy phổ biến nhất, thường kết hợp LB + TLS + caching.

---

## 4. CDN — Content Delivery Network

### 4.1. Là gì và vì sao cần

💡 **Hình dung**: Chuỗi cửa hàng tiện lợi toàn quốc. Thay vì mọi khách hàng Hà Nội đều phải vào TP.HCM mua đồ, có cửa hàng ngay góc phố. Nhanh hơn, ít tắc đường hơn. CDN = chuỗi cửa hàng tiện lợi cho nội dung web.

**CDN** là mạng lưới các **edge server** (máy chủ biên) phân tán toàn cầu, cache bản sao nội dung tĩnh gần người dùng.

**Nội dung phù hợp với CDN** (ít thay đổi, nhiều người dùng cùng cần):
- Ảnh, video, audio.
- CSS, JavaScript bundle.
- HTML tĩnh.
- File tải xuống (PDF, installer).

**Nội dung KHÔNG phù hợp**:
- Dữ liệu cá nhân hóa (giỏ hàng, feed mạng xã hội).
- API response động (giá cổ phiếu real-time).
- Thanh toán, xác thực.

### 4.2. Vì sao gần = nhanh — tính RTT và độ trễ

Độ trễ mạng tỷ lệ thuận với **khoảng cách vật lý** (ánh sáng trong cáp quang đi ~200.000 km/giây).

**Ví dụ tính toán**:

| Tuyến đường | Khoảng cách ước tính | RTT lý thuyết | RTT thực tế (có routing overhead) |
|------------|---------------------|--------------|----------------------------------|
| Hà Nội → TP.HCM (server gốc) | ~1.700 km | ~17 ms | ~20–30 ms |
| Hà Nội → Tokyo (CDN edge) | ~3.800 km | ~38 ms | ~50–70 ms |
| Hà Nội → Singapore (CDN edge) | ~2.200 km | ~22 ms | ~25–40 ms |
| Hà Nội → Los Angeles | ~13.000 km | ~130 ms | ~180–220 ms |

Giả sử người dùng ở Hà Nội, server gốc ở Los Angeles:
- Không dùng CDN: RTT = **200 ms**. Tải ảnh 500 KB = 200 ms (cho phép tải) + thời gian truyền data.
- Dùng CDN (edge tại Singapore): RTT = **35 ms**. Giảm **165 ms** (khoảng 82%).

Với trang web cần tải 50 ảnh riêng lẻ:
- Không CDN: 50 × 200 ms overhead = 10 giây độ trễ tích lũy (serial).
- Có CDN: 50 × 35 ms = 1.75 giây (giảm 82%).

(Trên thực tế HTTP/2 multiplexing gộp nhiều request, nhưng CDN vẫn giảm đáng kể RTT ban đầu.)

### 4.3. Walk-through request qua CDN

**Cache Hit (nội dung đã có tại edge)**:

```
1. User Hà Nội: GET https://cdn.example.com/logo.png
2. DNS phân giải cdn.example.com → trả về IP edge gần nhất (Singapore 203.1.20.5)
3. User → [TLS handshake] → Edge SG (35 ms RTT)
4. Edge SG: kiểm tra cache → TÌM THẤY logo.png (hết hạn chưa? Cache-Control: max-age=86400, còn 20 giờ)
5. Edge SG → User: 200 OK + logo.png (35 ms RTT)

Tổng: ~70 ms (35ms TLS + 35ms data). Server gốc không bị đụng đến.
```

**Cache Miss (lần đầu tiên, hoặc cache đã hết hạn)**:

```
1. User Hà Nội: GET https://cdn.example.com/new-banner.png
2. DNS → Edge SG (35 ms RTT)
3. Edge SG: kiểm tra cache → KHÔNG TÌM THẤY
4. Edge SG → Server gốc LA: GET /new-banner.png  (thêm ~180 ms RTT)
5. Server LA → Edge SG: 200 OK + new-banner.png + header Cache-Control: max-age=604800
6. Edge SG: lưu vào cache (TTL 7 ngày)
7. Edge SG → User: 200 OK + new-banner.png (35 ms RTT)

Tổng: ~250 ms (lần đầu). Các user tiếp theo ở Hà Nội: cache hit → ~70 ms.
```

**Cache Hit Rate** thực tế của CDN lớn: 90–98%. Chỉ 2–10% request phải về server gốc.

❓ **Câu hỏi tự nhiên**:

- *"CDN cache bị stale (hết hạn rồi nhưng chưa xóa) thì sao?"* — Khi `max-age` hết, edge gửi **conditional GET** (`If-Modified-Since` / `If-None-Match`) về origin. Nếu không thay đổi → origin trả `304 Not Modified` (không gửi lại data) → edge dùng tiếp file cũ, cập nhật TTL.
- *"Muốn xóa cache ngay (cache purge) khi cần?"* — CDN cung cấp API xóa cache theo URL hoặc tag. Ví dụ: Cloudflare API `DELETE /zones/{id}/purge_cache`.
- *"CDN có giúp cho API động không?"* — Phần nào. CDN có thể cache API response ngắn hạn (max-age=60s) cho data ít thay đổi. Nhưng không phải mọi API đều cache được.

### 4.4. CDN lớn thực tế

| CDN | Số PoP (Point of Presence) | Đặc điểm |
|----|---------------------------|----------|
| Cloudflare | 300+ thành phố | Miễn phí tier, DDoS protection tích hợp |
| AWS CloudFront | 450+ PoP | Tích hợp tốt với AWS ecosystem |
| Fastly | 60+ PoP | Real-time purge <150ms, phổ biến ở media |
| Akamai | 4.000+ PoP | Lâu đời nhất, enterprise |

📝 **Tóm tắt mục 4**

- CDN cache nội dung tĩnh tại edge gần người dùng → giảm RTT đáng kể (ví dụ: 200ms → 35ms).
- Cache Hit: phục vụ từ edge; Cache Miss: edge lấy từ origin, lưu cache cho lần sau.
- Cache được kiểm soát bởi HTTP header `Cache-Control: max-age=N`.
- CDN còn giảm tải server gốc: 95% request không cần đến origin.

---

## 5. Mở rộng theo chiều ngang và chiều dọc

### 5.1. Vertical Scaling (mở rộng dọc)

**Vertical scaling**: thêm tài nguyên **vào cùng một máy** — CPU mạnh hơn, RAM nhiều hơn, SSD nhanh hơn.

```
Trước:  [Server: 4 core, 16 GB RAM]
Sau:    [Server: 32 core, 128 GB RAM]
```

**Ưu điểm**: đơn giản, không cần thay đổi kiến trúc, không phải giải quyết vấn đề phân tán.
**Nhược điểm**:
- Giới hạn vật lý: không có máy nào vô hạn CPU/RAM.
- Giá tăng phi tuyến: máy 128-core không rẻ 32× máy 4-core.
- Vẫn là SPOF: dù mạnh đến đâu, một máy vẫn có thể hỏng.
- Downtime khi nâng cấp phần cứng.

### 5.2. Horizontal Scaling (mở rộng ngang)

**Horizontal scaling**: thêm **nhiều máy hơn**, mỗi máy có cấu hình vừa đủ.

```
Trước:  [Server A: 4 core, 16 GB]

Sau:    [Server A: 4 core, 16 GB]
        [Server B: 4 core, 16 GB]
        [Server C: 4 core, 16 GB]
        [Load Balancer phía trước]
```

**Ưu điểm**:
- Không giới hạn lý thuyết (thêm máy là thêm capacity).
- Giá tuyến tính.
- Không SPOF: 1 máy hỏng, 2 máy còn lại tiếp tục.
- Zero downtime khi scale: thêm máy mà không dừng dịch vụ.

**Nhược điểm**: phức tạp hơn (cần LB, phải giải quyết state, đồng bộ session).

### 5.3. Stateless Architecture — chìa khóa để scale ngang

**Vấn đề**: nếu server lưu trạng thái người dùng trong bộ nhớ (RAM) → request thứ 2 phải đến **cùng server** mới có state đó.

**Ví dụ vấn đề** — Shopping cart lưu trong RAM server:
```
Request #1 (thêm vào giỏ): → Server A lưu cart = ["iPhone", "AirPods"]
Request #2 (xem giỏ):      → LB gửi đến Server B → cart trống!
```

**Giải pháp — Stateless**: server không lưu state, lưu ở **nơi chia sẻ bên ngoài**.

```
Server A ─┐                    ┌─ Redis (session store)
Server B ─┼─ đọc/ghi state ──→│
Server C ─┘                    └─ PostgreSQL (database)
```

Khi stateless, mọi server trong pool đều có thể xử lý mọi request từ bất kỳ user nào → LB hoàn toàn tự do phân phối.

### 5.4. Sticky Session — khi không thể stateless

Đôi khi code legacy không thể refactor nhanh để stateless. Giải pháp tạm: **sticky session** (session dính).

LB đảm bảo mọi request từ một client luôn đến cùng một backend.

Cách triển khai:
- **Cookie-based**: LB set cookie `SERVERID=server-a` → request sau đọc cookie, route đến server-a.
- **IP hash**: như đã mô tả ở mục 2.2.

**Nhược điểm sticky session**:
- Nếu server bị hỏng → mọi session "thuộc về" server đó bị mất, user phải đăng nhập lại.
- Phân phối không đều: 1 IP "nặng" (công ty nhiều nhân viên dùng NAT → cùng 1 IP public) → 1 server chịu tải bất cân đối.

⚠ **Lỗi thường gặp**: dùng sticky session như giải pháp vĩnh viễn thay vì giải quyết gốc rễ (chuyển state ra ngoài). Sticky session là **giải pháp tạm**, không phải kiến trúc dài hạn.

### 5.5. DNS Load Balancing

Liên hệ với [Lesson 02 — DNS](../lesson-02-dns/): DNS có thể trả về nhiều bản ghi A cho cùng một tên miền.

```
$ dig example.com A
;; ANSWER SECTION:
example.com.    60    IN    A    203.0.113.1   ← Server 1
example.com.    60    IN    A    203.0.113.2   ← Server 2
example.com.    60    IN    A    203.0.113.3   ← Server 3
```

Client chọn một địa chỉ trong danh sách (thường là ngẫu nhiên hoặc đầu tiên). TTL = 60s nghĩa là cache ngắn, thay đổi server nhanh.

**Hạn chế**: DNS load balancing thô hơn — không biết server nào đang quá tải, không health check động. Thường dùng kết hợp với LB chuyên dụng phía sau.

🔁 **Dừng lại tự kiểm tra**:
- Câu hỏi: Ứng dụng lưu user session trong RAM của web server. Khi scale từ 1 server lên 3 server với Round-Robin LB, vấn đề gì xảy ra? Nêu 2 giải pháp.

<details>
<summary>Đáp án</summary>

**Vấn đề**: Request #1 (login) → Server 1 lưu session. Request #2 (xem profile) → LB gửi đến Server 2 → không có session → user bị coi là chưa đăng nhập.

**Giải pháp 1**: Sticky session — LB đảm bảo user X luôn đến Server 1. Nhược điểm: Server 1 chết → user mất session.

**Giải pháp 2**: Shared session store — dùng Redis hoặc Memcached bên ngoài. Mọi server đọc/ghi session vào Redis. Stateless hoàn toàn.
</details>

📝 **Tóm tắt mục 5**

- Vertical scaling: nâng cấp 1 máy. Giới hạn vật lý + SPOF vẫn còn.
- Horizontal scaling: thêm nhiều máy + LB. Linh hoạt, không giới hạn lý thuyết.
- Stateless là điều kiện để scale ngang tự do: lưu state ở Redis/DB chung.
- Sticky session là giải pháp tạm khi chưa stateless được — có nhược điểm.

---

## 6. Tổng kết Tầng 2 — Application Services

Toàn bộ hành trình từ Lesson 01 đến Lesson 08 của Tầng 2:

| Lesson | Chủ đề | Vai trò trong hệ thống |
|--------|--------|------------------------|
| L01 | Client-Server & Socket | Nền tảng kết nối: client mở TCP socket → server |
| L02 | DNS | Phân giải tên miền → IP; DNS load balancing |
| L03 | HTTP cơ bản | Giao thức trao đổi request/response trên TCP |
| L04 | HTTP nâng cao | Header, caching, CORS, compression |
| L05 | Email & FTP | Giao thức phi HTTP trên tầng application |
| L06 | TLS | Bảo mật: mã hóa, xác thực chứng chỉ |
| L07 | Real-time & WebSocket | Full-duplex, event-driven communication |
| L08 | Hạ tầng web quy mô | LB, CDN, proxy, scaling — bức tranh toàn cảnh |

**Kiến trúc đầy đủ của một request từ user đến database**:

```
User browser
    │  HTTPS request
    ▼
CDN Edge (cache hit → trả về ngay)
    │  (cache miss)
    ▼
Load Balancer (L7, Nginx/ALB)
  ├── TLS termination
  ├── Route theo URL path
    │
    ├──→ Web Server Pool (nhiều instance, stateless)
    │        │
    │        ├──→ Redis (session, cache layer)
    │        │
    │        └──→ Database (PostgreSQL/MySQL)
    │                 └── Read Replica (scale reads)
    │
    └──→ Static Asset Server / CDN Origin
```

Tiếp theo: [Tầng 3 — An ninh mạng](../../03-Advanced-Operations/lesson-01-network-security/) sẽ đi sâu vào bảo vệ kiến trúc này trước các mối đe dọa thực tế.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Chọn thuật toán LB:
Bạn có 3 server xử lý API: S1 (mới, 16-core), S2 (cũ, 4-core), S3 (cũ, 4-core). Các request API có thời gian xử lý từ 5 ms (query đơn) đến 2.000 ms (export CSV lớn). Hãy chọn thuật toán LB phù hợp nhất và giải thích lý do.

**Bài 2** — Forward proxy hay Reverse proxy:
Phân loại mỗi tình huống dưới đây là Forward Proxy hay Reverse Proxy:
- (a) Công ty cài Squid để nhân viên không truy cập mạng xã hội.
- (b) Nginx chạy trước ứng dụng Django tại cổng 80, chuyển request đến Django ở cổng 8000.
- (c) VPN che IP thật của người dùng khi lướt web.
- (d) Cloudflare nhận request thay cho server của bạn, lọc DDoS rồi mới chuyển tiếp.

**Bài 3** — Tính giảm độ trễ nhờ CDN:
Người dùng ở Hà Nội tải trang web có 30 ảnh (mỗi ảnh cần 1 request riêng), server gốc ở Frankfurt (RTT = 230 ms). CDN có edge tại Singapore (RTT từ Hà Nội = 35 ms).
- (a) Tính tổng overhead RTT khi không dùng CDN (giả sử 30 request tuần tự).
- (b) Tính tổng overhead RTT khi dùng CDN với cache hit rate 95%.
- (c) Tính phần trăm giảm.

**Bài 4** — Thiết kế scale cho tình huống tải cao:
Startup của bạn vừa được báo lớn đưa tin. Traffic tăng đột ngột từ 100 req/s lên 10.000 req/s trong 30 phút. Hiện tại bạn có 1 server (vertical scaling đã gần giới hạn). Hãy mô tả kiến trúc mục tiêu và thứ tự triển khai ưu tiên.

**Bài 5** — Phân tích Round-Robin:
LB đang dùng Round-Robin với 4 server: S1, S2, S3, S4. Trong quá trình phục vụ, S3 bị đánh dấu DOWN sau request #15. S3 phục hồi sau request #22.
- (a) Requests #13, #14, #15 đi về đâu?
- (b) Requests #16, #17, #18 đi về đâu (S3 đã DOWN)?
- (c) Sau khi S3 phục hồi, request #23 đi về đâu?

**Bài 6 (nâng cao)** — Cache miss penalty và cache warming:
CDN edge tại Singapore có cache miss rate 20% (ngày đầu tiên triển khai). Origin ở New York (RTT từ Singapore = 170 ms). RTT từ Hà Nội đến Singapore = 35 ms. Trong 1 giờ có 10.000 request đến edge Singapore.
- (a) Tính số request phải về origin.
- (b) Tính tổng thời gian bổ sung (penalty) do cache miss.
- (c) Sau khi "warm up" (cache miss rate giảm còn 3%), penalty còn bao nhiêu?

### Lời giải chi tiết

**Bài 1**:

Phân tích: S1 mạnh hơn S2, S3 gấp 4 lần (16 core vs 4 core). Request có thời gian xử lý rất khác nhau (5 ms đến 2.000 ms).

**Thuật toán phù hợp nhất: Weighted Least Connections**.

Lý do:
- Round-Robin đơn giản sẽ gửi đều cho S1, S2, S3 → S2, S3 bị quá tải vì yếu hơn.
- Weighted Round-Robin với trọng số 4:1:1 tốt hơn nhưng không xét đến tải thực.
- Least Connections tốt cho request đa dạng thời gian — không gửi thêm vào server đang busy. Nhưng S1 mạnh hơn cần nhận nhiều hơn.
- **Weighted Least Connections**: kết hợp cả 2 — S1 có weight 4, S2 và S3 có weight 1. Thuật toán chọn `(kết_nối_hiện_tại / weight)` nhỏ nhất → S1 được ưu tiên AND không gửi vào server đang xử lý request nặng.

**Bài 2**:

- (a) **Forward Proxy** — Squid đứng phía nhân viên (client), ẩn/lọc traffic ra ngoài.
- (b) **Reverse Proxy** — Nginx đứng phía server, nhận request thay Django, chuyển tiếp nội bộ.
- (c) **Forward Proxy** — VPN che IP client, server thấy IP VPN server.
- (d) **Reverse Proxy** — Cloudflare nhận thay server bạn, client thấy IP Cloudflare.

**Bài 3**:

**(a) Không CDN**:
- 30 request × 230 ms RTT = **6.900 ms = 6,9 giây** overhead RTT.

**(b) Có CDN, cache hit rate 95%**:
- 30 request × 95% = 28,5 ≈ 28 request cache hit → đến Singapore (35 ms).
- 30 request × 5% = 1,5 ≈ 2 request cache miss → đến Frankfurt qua Singapore.
  - Cache miss RTT = 35 ms (HN→SG) + 170 ms (SG→Frankfurt, ước tính) + 170 ms (về) + 35 ms = **410 ms** (làm tròn RTT khứ hồi).
  - Thực tế RTT SG→Frankfurt: (Frankfurt cách Singapore ~10.500 km) ≈ 105 ms RTT.
  - Cache miss RTT tổng: 35 ms (HN→SG) + 105 ms (SG→FRA) = 140 ms (1 chiều), RTT = ~240 ms.
- Tổng: 28 × 35 ms + 2 × 240 ms = 980 ms + 480 ms = **1.460 ms**.

**(c) Phần trăm giảm**:
- Giảm: (6.900 − 1.460) / 6.900 × 100% ≈ **78,8%**.

**Bài 4**:

**Kiến trúc mục tiêu**:
```
[CDN] → [Load Balancer] → [Web Server × N] → [Redis Cache] → [Database]
```

**Thứ tự ưu tiên** (từ nhanh nhất tới chậm nhất để triển khai):

1. **CDN ngay lập tức** (15 phút): bật Cloudflare free tier → 80–90% request tĩnh không cần về server. Hiệu quả nhất với thời gian nhỏ nhất.

2. **Redis cache layer** (1 giờ): cache kết quả database query thường dùng → giảm tải DB, server gốc xử lý nhanh hơn.

3. **Thêm server + LB** (2–4 giờ): spin up 2–4 server thêm (cloud: AWS EC2, GCP Compute Engine → click-to-launch), đặt Load Balancer (AWS ALB) phía trước. Đảm bảo code đã stateless hoặc session ra Redis.

4. **Database read replica** (nếu DB là bottleneck): scale reads bằng cách thêm replica. Writes vẫn đến primary.

**Bài 5**:

Round-Robin với S1, S2, S3, S4 theo thứ tự:

**(a)** Request #13: (13−1) % 4 = 0 → S1. Request #14: 13 % 4 = 1 → S2. Request #15: 14 % 4 = 2 → S3 (nhưng S3 bị đánh dấu DOWN ngay sau khi nhận #15).

**(b)** S3 DOWN → pool còn S1, S2, S4. Round-robin trên 3 server:
- #16: S1. #17: S2. #18: S4. (Pool 3 server theo thứ tự S1→S2→S4→S1→...)

**(c)** S3 phục hồi sau #22 → pool lại có 4 server S1, S2, S3, S4.
- #22 đi về: trong pool 3-server {S1,S2,S4}: (22 là request thứ 7 sau #15, thứ 7 % 3 = 1) → S2 (tùy implementation). Request #23 tiếp theo trong pool 4-server mới → thứ tự reset hoặc tiếp tục → thường là S3 hoặc S4 tùy LB implementation.

**Câu trả lời chính**: #23 có thể đến bất kỳ server nào trong {S1,S2,S3,S4} tùy thuộc vào LB implementation khi add server trở lại (một số reset pointer, một số tiếp tục từ vị trí hiện tại). Quan trọng là S3 có thể nhận request ngay sau khi phục hồi.

**Bài 6**:

**(a)** Request về origin: 10.000 × 20% = **2.000 request**.

**(b)** Penalty per cache miss: RTT SG→NY ≈ 170 ms (khứ hồi). Mỗi cache miss thêm ~170 ms so với cache hit (35 ms HN→SG đã có trong cả 2 trường hợp).
- Tổng penalty: 2.000 × 170 ms = 340.000 ms = **340 giây**.

**(c)** Cache miss rate 3%: 10.000 × 3% = 300 request về origin.
- Penalty: 300 × 170 ms = 51.000 ms = **51 giây** (giảm từ 340s xuống 51s = giảm ~85%).

---

## Liên kết và bài tiếp theo

- **Tiền đề**:
  - [Lesson 02 — DNS](../lesson-02-dns/) — DNS resolution, DNS load balancing.
  - [Lesson 04 — HTTP nâng cao](../lesson-04-http-advanced/) — Cache-Control, header HTTP.
  - [Lesson 06 — TLS](../lesson-06-tls/) — TLS termination tại proxy.
- **Bài tiếp theo**: [Tầng 3 — Lesson 01: An ninh mạng](../../03-Advanced-Operations/lesson-01-network-security/) — bảo vệ hạ tầng này trước các mối đe dọa thực tế: DDoS, firewall, IDS/IPS, zero trust.
- **Tham khảo thêm**:
  - [DataFoundations — Nhị phân & Hex](../../../DataFoundations/) — nền tảng biểu diễn số trong mạng.
  - NGINX Documentation: [nginx.org/en/docs/](https://nginx.org/en/docs/)
  - Cloudflare Learning: [cloudflare.com/learning/](https://www.cloudflare.com/learning/)

---

## 📝 Tổng kết Lesson 08

1. **1 server không đủ** — giới hạn CPU/RAM/băng thông/kết nối và SPOF → cần phân tán.
2. **Load Balancer** phân phối request, loại bỏ SPOF backend. Thuật toán: Round-Robin, Weighted, Least Connections, IP Hash. L4 (nhanh) vs L7 (thông minh). Health check tự động loại server lỗi.
3. **Reverse Proxy** (Nginx) che backend, TLS termination, caching, compression. Khác với Forward Proxy (phía client, ẩn client).
4. **CDN** cache nội dung tĩnh tại edge gần người dùng. Cache hit → phục vụ từ edge (35 ms). Cache miss → lấy từ origin, lưu lại. Giảm RTT 70–85%.
5. **Horizontal scaling** (thêm máy + LB) linh hoạt hơn vertical scaling (nâng cấp 1 máy). Cần **stateless** để scale tự do — lưu state vào Redis/DB chung.
6. **Bức tranh đầy đủ**: Client → CDN → LB → Web Servers → Cache → DB. Mỗi tầng có vai trò riêng và liên kết chặt chẽ với nhau.
