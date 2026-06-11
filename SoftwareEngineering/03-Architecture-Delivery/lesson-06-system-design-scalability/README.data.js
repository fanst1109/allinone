// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/03-Architecture-Delivery/lesson-06-system-design-scalability/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — System design & khả năng mở rộng (scalability)

## Mục tiêu

- Hiểu **scalability** (khả năng mở rộng) là gì, phân biệt **scale up** (mở rộng dọc — vertical) với **scale out** (mở rộng ngang — horizontal), biết khi nào chọn cái nào.
- Nắm vai trò của **load balancer** (cân bằng tải): nó phân phối request thế nào, các thuật toán cơ bản (round-robin, least-connections), và vì sao service phải **stateless** mới scale ngang được.
- Hiểu **caching** (bộ nhớ đệm): vì sao nhanh (qua số liệu latency cụ thể), khái niệm cache hit/miss, vì sao **cache invalidation** (vô hiệu hóa cache) là vấn đề khó, và CDN.
- Biết cách database mở rộng ở quy mô lớn: **read replica**, **sharding**, và đánh đổi về tính nhất quán.
- Hiểu **message queue** & **xử lý bất đồng bộ** (asynchronous): cách tách tải đỉnh ra khỏi đường phản hồi người dùng.
- Biết quy trình giải một bài **system design**: ước lượng tải (back-of-envelope: QPS, dung lượng) → vẽ các thành phần → tìm nút thắt (bottleneck). Vận dụng vào ví dụ rút gọn URL.

## Kiến thức tiền đề

- [Lesson 01 — Kiến trúc phần mềm](../lesson-01-software-architecture/) — phân lớp, monolith vs microservices: nền để hiểu "các thành phần" trong một thiết kế hệ thống.
- [Databases — Replication & Sharding](../../../Databases/03-Advanced/lesson-03-replication-sharding/) — cơ chế nhân bản và phân mảnh dữ liệu mà mục 4 dưới đây sẽ dựa vào.
- Biết khái niệm latency (độ trễ) và throughput (thông lượng) ở mức cơ bản là đủ.

> 💡 **Vì sao có bài này?** Các bài trước dạy *làm phần mềm đúng và triển khai được*. Bài này hỏi câu khác: *khi 100 người dùng thành 100 triệu người dùng thì sao?* Một hệ thống chạy mượt với 10 request/giây có thể sập hoàn toàn ở 10.000 request/giây nếu kiến trúc không chuẩn bị cho việc mở rộng. "System design" là kỹ năng thiết kế hệ thống chịu được tải lớn — và là dạng phỏng vấn phổ biến cho kỹ sư trung/cao cấp.

---

## 1. Scalability là gì — scale up vs scale out

💡 **Trực giác.** Tưởng tượng một quán phở đông khách. Có hai cách phục vụ nhiều người hơn:
- **Scale up (mở rộng dọc):** thuê một đầu bếp siêu nhanh, mua bếp to gấp đôi — *một chỗ làm khỏe hơn*.
- **Scale out (mở rộng ngang):** mở thêm 5 quầy phở giống hệt nhau, đặt một người điều phối khách vào quầy trống — *nhiều chỗ làm cùng lúc*.

**Scalability** = khả năng hệ thống phục vụ thêm tải (nhiều người dùng / nhiều request hơn) mà vẫn giữ hiệu năng chấp nhận được, bằng cách thêm tài nguyên.

| | Scale up (vertical) | Scale out (horizontal) |
|---|---|---|
| Cách làm | Nâng cấp 1 máy mạnh hơn (thêm CPU/RAM) | Thêm nhiều máy giống nhau |
| Giới hạn | Trần phần cứng (không có CPU vô hạn) | Gần như không giới hạn (thêm máy nữa) |
| Chi phí | Tăng phi tuyến — máy "khủng" đắt cắt cổ | Tuyến tính hơn — máy thường rẻ |
| Điểm yếu | 1 máy chết = sập (single point of failure) | Cần load balancer + service stateless |
| Độ phức tạp | Thấp (không đổi code) | Cao (phải thiết kế cho phân tán) |

**Ví dụ số cụ thể.** Một server xử lý được **1.000 QPS** (queries per second — request/giây):
- Scale up: nâng từ 4 lên 16 vCPU → đạt ~**3.500 QPS** (không phải ×4 vì có overhead), nhưng nâng tiếp lên 64 vCPU thì giá gấp ~8 lần mà chỉ đạt ~**9.000 QPS** — lợi suất giảm dần.
- Scale out: thêm 9 server giống hệt (tổng 10 máy 1.000 QPS) → ~**10.000 QPS**, chi phí ~10× máy thường, và mất 1 máy chỉ giảm 10% công suất thay vì sập.

> ❓ **"Vậy luôn chọn scale out cho khỏe?"** Không hẳn. Scale up đơn giản hơn nhiều: không cần đổi code, không cần load balancer, không phải lo dữ liệu phân tán. Với hệ thống nhỏ-vừa hoặc phần *có trạng thái khó tách* (như một database chính), scale up thường là bước đầu hợp lý. Chỉ khi chạm trần phần cứng hoặc cần khả năng chịu lỗi mới buộc phải scale out. Quy tắc thực dụng: **scale up trước cho đơn giản, scale out khi bắt buộc.**

> ⚠ **Lỗi thường gặp.** Tưởng scale out cho ×N máy = ×N hiệu năng. Thực tế luôn có overhead phối hợp (load balancer, đồng bộ dữ liệu, mạng), nên 10 máy hiếm khi cho đúng 10× — thường ~7–9×. Bỏ qua điều này dẫn tới ước lượng dung lượng sai.

> 🔁 **Dừng lại tự kiểm tra.** Một database PostgreSQL đang đầy CPU ở giờ cao điểm. Đội định "thêm 4 server PostgreSQL giống hệt để chia tải ghi". Vấn đề ở đâu?
> <details><summary>Đáp án</summary>Database <b>ghi</b> có trạng thái (dữ liệu) — không thể chỉ "nhân bản máy" rồi chia tải ghi như service stateless, vì các bản sao sẽ ghi mâu thuẫn nhau. Mở rộng ghi của DB cần kỹ thuật riêng: <b>sharding</b> (chia dữ liệu) — xem mục 4. Bước đầu hợp lý thường là <b>scale up</b> máy DB hoặc thêm <b>read replica</b> để giảm tải đọc.</details>

📝 **Tóm tắt mục 1.** Scale up = một máy khỏe hơn (đơn giản, có trần, là điểm chết đơn lẻ). Scale out = nhiều máy (gần như vô hạn, chịu lỗi tốt, nhưng cần stateless + load balancer). Thực dụng: scale up trước, scale out khi chạm giới hạn.

---

## 2. Load balancing — phân phối tải để scale ngang

💡 **Trực giác.** Load balancer (LB — bộ cân bằng tải) là "người điều phối khách" ở cửa quán: client gửi request tới LB, LB chọn một trong N server phía sau để chuyển request tới. Người dùng chỉ thấy một địa chỉ duy nhất; phía sau có thể là 3 hay 300 máy.

\`\`\`
                 ┌──────────┐
   client ──►    │   Load   │ ──► server 1
   client ──►    │ Balancer │ ──► server 2
   client ──►    │          │ ──► server 3
                 └──────────┘
\`\`\`

### 2.1 Các thuật toán phân phối

| Thuật toán | Cách chọn server | Khi nào tốt |
|---|---|---|
| **Round-robin** | Lần lượt 1→2→3→1→2... | Các request đồng đều, server giống nhau |
| **Least-connections** | Chọn server đang ít kết nối nhất | Request có độ dài khác nhau (vài request lâu, vài request nhanh) |
| **Weighted** | Round-robin nhưng máy khỏe nhận nhiều hơn | Server không đồng đều về cấu hình |
| **IP hash** | Hash IP client → cố định 1 server | Khi cần "dính" client vào một server |

**Ví dụ số cụ thể (round-robin).** 6 request tới, 3 server: req1→S1, req2→S2, req3→S3, req4→S1, req5→S2, req6→S3. Mỗi server nhận đúng 2 request — chia đều.

**Ví dụ least-connections.** S1 đang xử lý 1 request "nặng" (chạy 5 giây), S2 và S3 rảnh. Request mới tới → round-robin có thể vẫn dồn vào S1 (kẹt), còn least-connections gửi sang S2/S3 (đang 0 kết nối) → tránh kẹt.

### 2.2 Vì sao phải stateless

💡 **Trực giác.** "Stateless" (không trạng thái) nghĩa là server **không nhớ gì** giữa các request của một người dùng — mọi thứ cần biết đều nằm trong request hoặc trong kho dùng chung (DB, cache). Như quầy phở ai cũng làm được mọi đơn, không cần "nhớ ông khách lần trước gọi gì".

Vì sao quan trọng: với LB round-robin, request kế tiếp của cùng một user có thể rơi vào **server khác**. Nếu server lưu phiên đăng nhập (session) trong RAM của riêng nó, user sẽ "bị đăng xuất" khi LB chuyển sang máy khác.

> ⚠ **Lỗi thường gặp.** Lưu session/giỏ hàng trong bộ nhớ tiến trình của server. Khi scale ra 5 máy, user "lúc đăng nhập lúc không" tùy LB gửi tới máy nào. **Cách đúng:** đẩy trạng thái ra ngoài — lưu session vào kho dùng chung như **Redis** (xem mục 3) hoặc DB; server giữ stateless. Khi đó thêm/bớt server tùy ý mà không ảnh hưởng user.

> ❓ **"Nếu thêm server thứ 4 lúc đang chạy thì sao?"** Với service stateless + LB, chỉ cần đăng ký máy mới vào LB; LB bắt đầu gửi request tới nó ngay. Không cần migrate gì vì máy mới không phải "nhớ" trạng thái cũ — nó đọc mọi thứ từ DB/cache dùng chung. Đây chính là lý do stateless là điều kiện tiên quyết của scale out.

> 🔁 **Dừng lại tự kiểm tra.** Một API trả về danh sách đơn hàng của user. Để stateless hóa, thông tin "user là ai" nên đến từ đâu trong mỗi request?
> <details><summary>Đáp án</summary>Từ chính request — thường là một <b>token</b> (vd JWT) trong header <code>Authorization</code>, server giải mã ra user-id. Server không cần "nhớ" ai đăng nhập trước đó; mỗi request tự mang đủ thông tin định danh. Nhờ vậy bất kỳ server nào cũng phục vụ được request đó.</details>

📝 **Tóm tắt mục 2.** Load balancer phân phối request tới N server (round-robin, least-connections, weighted, IP hash). Để scale out, service phải **stateless** — đẩy session/trạng thái ra kho dùng chung; khi đó thêm/bớt server không ảnh hưởng người dùng.

---

## 3. Caching — đệm để khỏi tính lại

💡 **Trực giác.** Cache (bộ nhớ đệm) giống như để cuốn sách hay đọc trên bàn thay vì cất lại kệ thư viện mỗi lần. Lần sau cần, với tay lấy ngay — không phải đi bộ vào kho. Trong hệ thống: thay vì hỏi database (chậm, ở đĩa) mỗi lần, ta giữ kết quả trong bộ nhớ nhanh (RAM, như Redis) để lần sau trả ngay.

### 3.1 Vì sao nhanh — số liệu cụ thể

Các bậc latency điển hình (đọc một giá trị):

| Nguồn | Latency điển hình |
|---|---|
| Cache trong RAM (Redis) | ~**1 ms** |
| Truy vấn database (đĩa, có index) | ~**50 ms** |
| Gọi API bên thứ ba qua mạng | ~**200 ms** |

**Ví dụ số cụ thể.** Một trang hồ sơ người dùng cần truy vấn DB mất **50 ms**. Nếu 95% lượt được phục vụ từ cache (1 ms) và 5% phải vào DB (50 ms):

$$
\\text{latency trung bình} = 0{,}95 \\times 1\\text{ ms} + 0{,}05 \\times 50\\text{ ms} = 0{,}95 + 2{,}5 = 3{,}45 \\text{ ms}
$$

So với 50 ms khi không cache → **nhanh hơn ~14 lần**, và DB chỉ còn nhận **5%** số request (giảm tải 20 lần).

### 3.2 Cache hit / miss

- **Cache hit:** dữ liệu cần có sẵn trong cache → trả ngay (1 ms).
- **Cache miss:** không có → phải vào DB (50 ms) rồi *lưu lại* vào cache cho lần sau.
- **Hit rate** (tỷ lệ trúng) = số hit / tổng request. Hit rate càng cao, latency trung bình và tải DB càng thấp — đây chính là thứ mô-đun viz cho bạn kéo thử.

**Ví dụ số cụ thể về hit rate.** 1.000 request, hit rate 80% → 800 hit (1 ms) + 200 miss (50 ms). DB chỉ nhận 200 truy vấn thay vì 1.000.

### 3.3 Cache invalidation — vấn đề khó

> ⚠ **Lỗi thường gặp.** Dữ liệu trong DB đã đổi (vd user đổi tên) nhưng cache vẫn giữ giá trị cũ → user thấy dữ liệu lỗi thời (stale). Đây là **cache invalidation** — vô hiệu hóa/cập nhật cache khi nguồn đổi. Có câu nói nổi tiếng: *"Hai việc khó nhất trong khoa học máy tính là đặt tên biến, vô hiệu hóa cache, và lỗi off-by-one."* (đùa, nhưng phản ánh đúng mức độ khó).

Vài chiến lược cơ bản:
- **TTL (time to live):** mỗi mục cache hết hạn sau N giây (vd 60s). Đơn giản, nhưng trong khoảng đó vẫn có thể stale.
- **Write-through / invalidate-on-write:** mỗi khi ghi DB thì cập nhật (hoặc xóa) luôn mục cache tương ứng. Chính xác hơn nhưng tốn công và dễ sót.

**Ví dụ số cụ thể (đánh đổi TTL).** Đặt TTL = 60s cho giá sản phẩm: nếu giá đổi ngay sau khi cache, user có thể thấy giá cũ tối đa 60 giây. Giảm TTL xuống 5s → stale ít hơn nhưng hit rate giảm (cache hết hạn nhanh → nhiều miss → tải DB tăng). Chọn TTL = đánh đổi giữa *độ tươi của dữ liệu* và *tải DB*.

### 3.4 CDN — cache đặt gần người dùng

💡 **Trực giác.** CDN (Content Delivery Network — mạng phân phối nội dung) là các server cache đặt rải khắp thế giới. Khi user ở Hà Nội tải ảnh, CDN phục vụ từ server tại Việt Nam/Singapore thay vì kéo từ server gốc ở Mỹ.

**Ví dụ số cụ thể.** Tải một ảnh 500 KB từ server gốc ở Mỹ tới Hà Nội mất ~**250 ms** (đường vòng địa lý + băng thông). Qua CDN có node ở Singapore: ~**30 ms**. CDN đặc biệt hợp cho **nội dung tĩnh** (ảnh, CSS, JS, video) — thứ ít đổi nên cache lâu được.

> ❓ **"Tính hash cache key có đắt không, có làm chậm không?"** Không đáng kể: lấy/đặt một key trong Redis tốn dưới 1 ms kể cả tính hash key. Cái đắt là *cache miss* (phải vào DB) và *quản lý invalidation*, không phải bản thân thao tác cache. Vì thế cache gần như luôn đáng dùng cho dữ liệu đọc-nhiều-ghi-ít.

> 🔁 **Dừng lại tự kiểm tra.** Dữ liệu nào *không nên* cache lâu: (a) ảnh logo công ty, (b) số dư tài khoản ngân hàng đang giao dịch?
> <details><summary>Đáp án</summary>(b) — số dư thay đổi liên tục và phải <b>chính xác tuyệt đối</b>; cache stale ở đây gây hậu quả nghiêm trọng (hiển thị sai tiền). (a) logo gần như không đổi → cache rất lâu (CDN) là lý tưởng. Quy tắc: cache hợp với dữ liệu <b>đọc nhiều, đổi ít, sai một chút không chết người</b>.</details>

📝 **Tóm tắt mục 3.** Cache (RAM ~1 ms) nhanh hơn DB (~50 ms) hàng chục lần và giảm tải DB. Hit rate cao = nhanh + nhẹ DB. Khó nhất là **cache invalidation** (tránh dữ liệu stale) — đánh đổi qua TTL hoặc invalidate-on-write. CDN = cache đặt gần user, lý tưởng cho nội dung tĩnh.

---

## 4. Cơ sở dữ liệu ở quy mô lớn

💡 **Trực giác.** Service stateless thì scale ngang dễ (thêm máy là xong). Nhưng database *có dữ liệu* — không thể chỉ "nhân bản máy" rồi ghi loạn. Mở rộng DB cần kỹ thuật riêng cho **đọc** và **ghi**.

### 4.1 Read replica — nhân bản để chia tải đọc

Hầu hết hệ thống **đọc nhiều hơn ghi rất nhiều** (vd mạng xã hội: 1 bài đăng được đọc hàng nghìn lần). Giải pháp: một **primary** (master) nhận mọi lệnh ghi, rồi sao chép dữ liệu sang nhiều **read replica**; các lệnh đọc chia đều cho replica.

\`\`\`
   ghi ──► [Primary] ──(replicate)──► [Replica 1] ◄── đọc
                       ──(replicate)──► [Replica 2] ◄── đọc
                       ──(replicate)──► [Replica 3] ◄── đọc
\`\`\`

**Ví dụ số cụ thể.** Tỷ lệ đọc:ghi = 90:10. Một primary chịu được 1.000 thao tác/giây. Thêm 3 read replica → tải đọc chia 3, hệ thống phục vụ được tổng ~**3.700 thao tác/giây** (3 replica × ~900 đọc + primary lo ghi) — mà chỉ cần thêm máy đọc, không đổi logic ghi.

> ⚠ **Lỗi thường gặp.** Quên rằng replication có **độ trễ** (replication lag, vài ms tới vài giây). Vừa ghi vào primary rồi đọc ngay từ replica có thể chưa thấy dữ liệu mới. Vd: user đổi avatar (ghi → primary) rồi trang reload đọc từ replica → vẫn avatar cũ trong 1 giây. Cách xử lý: với thao tác "ghi xong đọc lại ngay" thì đọc từ primary (read-your-writes).

### 4.2 Sharding — chia dữ liệu để mở rộng ghi

Read replica giúp **đọc** nhưng mọi lệnh **ghi** vẫn dồn vào một primary → tới giới hạn thì phải **sharding**: chia dữ liệu thành nhiều mảnh (shard), mỗi shard nằm trên một máy DB riêng và nhận ghi độc lập.

**Ví dụ số cụ thể.** 100 triệu user, chia theo \`user_id mod 4\` → 4 shard, mỗi shard ~25 triệu user. Ghi của user 1001 → shard \`1001 mod 4 = 1\`. Tải ghi chia 4. (Chi tiết thuật toán sharding, hash ring, rebalancing — xem [Databases — Replication & Sharding](../../../Databases/03-Advanced/lesson-03-replication-sharding/).)

### 4.3 Đánh đổi nhất quán

> ❓ **"Phân tán dữ liệu ra nhiều máy thì có gì phải trả giá?"** Có. Khi dữ liệu nằm trên nhiều máy, **tính nhất quán** (consistency — mọi nơi thấy cùng giá trị tại cùng thời điểm) trở nên khó/đắt. Định lý **CAP** nói: khi mạng giữa các node có sự cố (Partition), hệ thống phân tán phải chọn giữa **Consistency** (nhất quán — luôn đọc ra giá trị mới nhất) và **Availability** (sẵn sàng — luôn trả lời, kể cả có thể là dữ liệu cũ). Không thể có cả hai khi mạng đứt.

**Ví dụ số cụ thể về đánh đổi.** Ngân hàng chọn **C** (số dư phải đúng, thà từ chối giao dịch còn hơn hiển thị sai). Đếm lượt like của một bài viết chọn **A** (thà hiển thị 1.002 thay vì 1.003 trong giây lát còn hơn báo lỗi) — chênh lệch nhỏ ở đây vô hại.

📝 **Tóm tắt mục 4.** Đọc nhiều → thêm **read replica** (coi chừng replication lag). Ghi tới giới hạn → **sharding** (chia dữ liệu theo key). Cái giá của phân tán là **tính nhất quán** khó hơn — CAP buộc chọn giữa nhất quán và sẵn sàng khi mạng đứt; chọn theo tính chất nghiệp vụ.

---

## 5. Message queue & xử lý bất đồng bộ

💡 **Trực giác.** Tưởng tượng quán cà phê: bạn gọi món, nhân viên ghi vào một **hàng đợi phiếu** rồi nói "xong, gọi tên khi có". Bạn không đứng đợi tại quầy chặn người sau — pha chế xử lý phiếu *bất đồng bộ*. Message queue (hàng đợi tin nhắn) làm đúng điều đó cho hệ thống: tách việc *nhận yêu cầu* khỏi việc *xử lý yêu cầu*.

\`\`\`
   request ──► [API: ghi job vào queue] ──► trả "đã nhận" (nhanh)
                          │
                       [Queue] ──► [Worker 1] xử lý nền
                                ──► [Worker 2] xử lý nền
\`\`\`

**Ví dụ số cụ thể (tách tải đỉnh).** Một trang bán vé concert: lúc mở bán có **đỉnh 50.000 request trong 10 giây** (5.000 QPS). Nếu mỗi request phải xử lý đồng bộ (ghi DB, gửi email, dựng QR) mất 200 ms thì DB sập. Thay vào đó:
- API chỉ ghi mỗi yêu cầu vào queue (~2 ms/request) → chịu được đỉnh, trả "đang xử lý" ngay.
- 20 worker phía sau rút từ queue và xử lý đều đặn ~100 job/giây mỗi worker = 2.000 job/giây. 50.000 job được tiêu hóa trong ~25 giây thay vì sập.

Queue đóng vai **bộ giảm xóc**: hấp thụ đỉnh, để backend xử lý ở nhịp ổn định.

> ❓ **"Xử lý bất đồng bộ thì user phải chờ kết quả thế nào?"** Tùy việc: với việc không cần kết quả tức thì (gửi email, resize ảnh, xuất báo cáo) → trả "đã nhận" ngay, thông báo sau (email/push). Với việc cần phản hồi (vé đã đặt được chưa) → client *poll* trạng thái hoặc nhận push khi worker xong. Đánh đổi: phản hồi tức thì kém hơn, đổi lại hệ thống không sập khi tải đỉnh.

> ⚠ **Lỗi thường gặp.** Dùng queue rồi tưởng "chắc chắn xử lý đúng một lần". Thực tế hầu hết queue đảm bảo *at-least-once* (ít nhất một lần) — một job có thể bị xử lý lặp nếu worker chết giữa chừng. Worker phải **idempotent** (chạy lại nhiều lần cho cùng kết quả), vd kiểm tra "vé này cấp chưa" trước khi cấp.

> 🔁 **Dừng lại tự kiểm tra.** Việc nào *nên* đẩy vào queue xử lý bất đồng bộ: (a) trả về kết quả tìm kiếm cho user đang chờ, (b) gửi email xác nhận đơn hàng?
> <details><summary>Đáp án</summary>(b) — user không cần email tới <i>ngay lập tức</i> trong khi đợi response; đẩy vào queue, worker gửi sau vài giây là ổn, lại không chặn đường phản hồi. (a) là việc <b>đồng bộ</b> — user đang đợi kết quả ngay trên màn hình, không thể "xử lý sau".</details>

📝 **Tóm tắt mục 5.** Message queue tách *nhận* khỏi *xử lý* → API trả nhanh, worker tiêu hóa job ở nhịp ổn định, hấp thụ tải đỉnh như bộ giảm xóc. Hợp với việc không cần kết quả tức thì. Lưu ý: thường at-least-once → worker phải idempotent.

---

## 6. Quy trình một bài "system design"

💡 **Trực giác.** Giải một bài system design giống lập dự toán xây nhà: trước khi vẽ chi tiết, ước lượng "nhà mấy người ở, bao nhiêu phòng, tải trọng móng". Trong hệ thống: ước lượng tải trước → từ đó mới biết cần bao nhiêu server, DB, cache. Đừng nhảy vào vẽ chi tiết khi chưa biết quy mô.

Bốn bước thường dùng:

1. **Làm rõ yêu cầu & ước lượng tải** (back-of-envelope — tính nhẩm trên mặt sau phong bì).
2. **Vẽ các thành phần chính** (client → LB → service → cache → DB → queue).
3. **Tìm nút thắt (bottleneck)** — thành phần nào quá tải trước? Thường là DB hoặc một service nóng.
4. **Đề xuất mở rộng** — áp dụng mục 1–5: scale out service, thêm cache/replica/shard, dùng queue.

### 6.1 Back-of-envelope — ước lượng tải

Công thức nền: từ **DAU** (Daily Active Users — số user hoạt động/ngày) ước ra **QPS** và **dung lượng lưu trữ**.

$$
\\text{QPS trung bình} = \\frac{\\text{DAU} \\times \\text{số request mỗi user/ngày}}{86400 \\text{ giây/ngày}}
$$

Và **QPS đỉnh** thường lấy ~**2–3 lần** QPS trung bình (giờ cao điểm).

**Ví dụ số cụ thể.** Một app có **1 triệu DAU**, mỗi user trung bình **20 request/ngày**:
- Tổng request/ngày = 1.000.000 × 20 = **20 triệu**.
- QPS trung bình = 20.000.000 / 86.400 ≈ **231 QPS**.
- QPS đỉnh ≈ 231 × 3 ≈ **~700 QPS** → cần thiết kế chịu ~700 QPS.
- Nếu một server làm ~200 QPS → cần ~**4 server** (làm tròn lên + dự phòng).

**Ước dung lượng.** Nếu mỗi user tạo trung bình **2 KB dữ liệu/ngày**: 1 triệu × 2 KB = **2 GB/ngày** ≈ **730 GB/năm** → một DB đơn còn chứa được vài năm, chưa cần sharding gấp.

### 6.2 Ví dụ thiết kế rút gọn: dịch vụ rút gọn URL

Bài kinh điển: thiết kế dịch vụ như bit.ly — nhận URL dài, trả về URL ngắn; ai mở URL ngắn thì chuyển hướng (redirect) tới URL gốc.

**Bước 1 — Ước lượng tải.** Giả sử **100 triệu** URL được tạo mỗi tháng, tỷ lệ đọc:ghi = 100:1 (đọc nhiều hơn nhiều):
- Ghi: 100.000.000 / (30 × 86.400) ≈ **~40 QPS ghi**.
- Đọc (redirect): 40 × 100 = **~4.000 QPS đọc**.
- Dung lượng: mỗi bản ghi ~500 byte × 100 triệu/tháng × 12 ≈ **~600 GB/năm**.

**Bước 2 — Các thành phần.**
\`\`\`
client ──► LB ──► service (stateless, nhiều bản) ──► cache (Redis) ──► DB
                                                       │
                                              (miss thì vào DB)
\`\`\`

**Bước 3 — Nút thắt & cách giải.**
- Đọc 4.000 QPS dồn vào DB → **nút thắt**. Giải: **cache** các URL hot (URL viral được mở hàng triệu lần). Với hit rate 90%, DB chỉ còn ~400 QPS → dễ thở. Thêm CDN/cache cho redirect càng tốt.
- Ghi ít (40 QPS) → một primary DB thừa sức; chưa cần sharding sớm. Khi tiến tới hàng tỷ URL mới sharding theo mã ngắn.
- Service stateless → scale out sau LB tùy QPS.

**Sinh mã ngắn:** mã 7 ký tự base62 (a–z, A–Z, 0–9) cho 62⁷ ≈ **3.500 tỷ** tổ hợp — thừa cho hàng chục năm.

> ❓ **"Ước lượng sai vài lần thì sao, có chết không?"** Mục tiêu của back-of-envelope không phải số *chính xác* mà là *đúng bậc độ lớn* (order of magnitude) — biết hệ thống cần ~hàng trăm hay ~hàng chục nghìn QPS để chọn kiến trúc phù hợp. Sai gấp 2 lần không sao; sai gấp 100 lần (tưởng vài trăm QPS hóa ra vài chục nghìn) thì kiến trúc lệch hẳn. Vì thế luôn ước lượng *trước* khi vẽ.

> 🔁 **Dừng lại tự kiểm tra.** Trong dịch vụ rút gọn URL, vì sao đọc lại nhiều hơn ghi tới 100 lần, và điều đó gợi ý ưu tiên kỹ thuật mở rộng nào?
> <details><summary>Đáp án</summary>Vì <b>tạo</b> URL ngắn 1 lần nhưng <b>mở</b> (redirect) nó có thể hàng trăm/nghìn lần (link được chia sẻ rộng). Đọc-trội gợi ý ưu tiên tối ưu <b>đường đọc</b>: cache mạnh + read replica, còn đường ghi (primary đơn) chưa cần sharding sớm. Đây là nguyên tắc "tối ưu thứ nóng nhất trước".</details>

📝 **Tóm tắt mục 6.** Quy trình: (1) ước lượng tải back-of-envelope (DAU → QPS, dung lượng; đỉnh ≈ 2–3× trung bình), (2) vẽ thành phần, (3) tìm nút thắt, (4) áp scale out + cache + replica/shard + queue. Mục tiêu ước lượng là *đúng bậc độ lớn*, không cần chính xác tuyệt đối.

---

## 7. Bài tập

1. Một service web (stateless) hiện chạy 1 máy 800 QPS, đang bị quá tải vào giờ cao điểm ước ~3.000 QPS. Đề xuất cách mở rộng và tính số máy cần (giả sử overhead ~10%). Vì sao chọn scale out chứ không scale up ở đây?
2. Giải thích vì sao lưu giỏ hàng trong RAM của từng server sẽ hỏng khi đặt 3 server sau một load balancer round-robin. Nêu cách sửa.
3. Một endpoint trả hồ sơ user, truy vấn DB mất 40 ms, cache hit mất 1 ms. Tính latency trung bình và phần trăm tải DB còn lại với hit rate (a) 50%, (b) 90%, (c) 99%. Nhận xét.
4. App có **2 triệu DAU**, mỗi user **15 request/ngày**. Ước QPS trung bình, QPS đỉnh (×3), và số server cần nếu mỗi máy làm 250 QPS.
5. Trong hệ thống bán vé tải đỉnh, giải thích message queue giúp gì và vì sao worker phải idempotent. Cho một ví dụ hậu quả nếu worker *không* idempotent.
6. (Mở rộng) Cho dịch vụ rút gọn URL với đọc:ghi = 100:1, vì sao ta cache đường đọc trước khi nghĩ tới sharding ghi? Khi nào mới cần sharding?

## Lời giải chi tiết

**Bài 1.** Cần ~3.000 QPS, mỗi máy ~800 QPS nhưng có overhead phối hợp ~10% nên thực tế ~720 QPS/máy hữu dụng. Số máy = ⌈3.000 / 720⌉ = ⌈4,17⌉ = **5 máy** (nên thêm 1 dự phòng → 6 để chịu lỗi). Chọn **scale out** vì: (a) service đã stateless nên thêm máy là chia tải được ngay; (b) scale up một máy lên ~3.000 QPS đòi phần cứng rất mạnh, đắt phi tuyến và vẫn là **điểm chết đơn lẻ** — một máy sập là toàn bộ sập. Nhiều máy + LB vừa rẻ hơn vừa chịu lỗi.

**Bài 2.** Round-robin gửi request kế tiếp của cùng user sang server *khác*. Giỏ hàng lưu trong RAM server A → khi LB gửi request tiếp sang server B (RAM rỗng), user thấy giỏ trống; quay lại A thì giỏ "hiện ra lại" → trải nghiệm loạn. **Sửa:** stateless hóa — lưu giỏ hàng vào kho dùng chung (Redis hoặc DB), server chỉ đọc/ghi kho đó. Khi ấy mọi server đều thấy cùng một giỏ, thêm/bớt máy vô hại.

**Bài 3.** Latency trung bình = hit_rate × 1 + (1 − hit_rate) × 40; tải DB còn lại = (1 − hit_rate).
- (a) 50%: 0,5×1 + 0,5×40 = **20,5 ms**; DB nhận **50%** request.
- (b) 90%: 0,9×1 + 0,1×40 = **4,9 ms**; DB nhận **10%**.
- (c) 99%: 0,99×1 + 0,01×40 = **1,39 ms**; DB nhận **1%**.
Nhận xét: latency giảm phi tuyến — từ 50%→90% giảm mạnh (20,5→4,9 ms), từ 90%→99% giảm thêm nhưng ít hơn (4,9→1,39 ms). Tải DB giảm tuyến tính theo miss rate. Đẩy hit rate cao luôn đáng giá, nhưng lợi suất giảm dần khi đã rất cao.

**Bài 4.** Tổng request/ngày = 2.000.000 × 15 = 30 triệu. QPS trung bình = 30.000.000 / 86.400 ≈ **347 QPS**. QPS đỉnh ≈ 347 × 3 ≈ **~1.041 QPS**. Số server = ⌈1.041 / 250⌉ = ⌈4,16⌉ = **5 máy** (nên +1 dự phòng → 6 để chịu lỗi & rolling deploy).

**Bài 5.** Message queue giúp **tách nhận khỏi xử lý**: API chỉ ghi job vào queue (~vài ms) rồi trả "đã nhận", nên chịu được đỉnh 50.000 request; worker rút job và xử lý ở nhịp ổn định, queue làm bộ giảm xóc → backend không sập. Worker phải **idempotent** vì queue thường đảm bảo *at-least-once* — worker có thể chết giữa chừng rồi job được giao lại, gây xử lý lặp. Ví dụ hậu quả nếu *không* idempotent: cùng một job "trừ tiền & cấp vé" chạy 2 lần → user bị **trừ tiền 2 lần** hoặc **cấp 2 vé**. Idempotent: trước khi cấp, kiểm tra "order này đã cấp vé chưa?", đã rồi thì bỏ qua.

**Bài 6.** Vì đọc gấp 100 lần ghi → **nút thắt nằm ở đường đọc**, không phải ghi. Cache đường đọc (hit rate cao cho URL hot) cắt phần lớn 4.000 QPS đọc xuống còn vài trăm QPS chạm DB → giải quyết nút thắt với chi phí thấp, không đổi kiến trúc DB. Ghi chỉ ~40 QPS, một primary thừa sức nên **chưa cần sharding** — sharding thêm độ phức tạp lớn (chia key, rebalancing, mất join xuyên shard). Chỉ cần sharding khi **lượng ghi hoặc dung lượng dữ liệu vượt sức một máy** (vd tiến tới hàng tỷ bản ghi, ghi vượt khả năng một primary). Nguyên tắc: tối ưu thứ nóng nhất trước, đừng thêm phức tạp khi chưa cần.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Mô phỏng caching:** kéo cache hit-rate → xem latency trung bình & tải DB giảm thế nào (số liệu thật 1 ms vs 50 ms).
  2. **Load balancer:** SVG phân phối request tới N server (round-robin), thêm/bớt server và xem tải mỗi máy đổi.
  3. **Back-of-envelope calculator:** nhập DAU + request/user/ngày → ước QPS trung bình, QPS đỉnh, số server cần.

## 9. Bài tiếp theo

Đây là **bài cuối của Tầng 3** và của cả lĩnh vực **SoftwareEngineering** (hiện tại). Tổng kết toàn bộ lộ trình:

| Tầng | Tên | Học gì | Câu hỏi cốt lõi |
|---|---|---|---|
| **1 — Foundations** | Nền tảng | SDLC, Agile, yêu cầu & đặc tả, ước lượng, version control | *Làm phần mềm cùng người khác một cách có kỷ luật như thế nào?* |
| **2 — Design & Quality** | Thiết kế & chất lượng | Clean code, design patterns, testing, refactoring, nợ kỹ thuật | *Làm sao để code đúng, bền, sửa được lâu dài?* |
| **3 — Architecture & Delivery** | Kiến trúc & vận hành | Kiến trúc, API, CI/CD, container, observability, **system design** | *Làm sao để hệ thống mở rộng, triển khai an toàn và chạy tin cậy ở quy mô lớn?* |

**Gợi ý vận dụng:**
- Cầm một sản phẩm bạn dùng hằng ngày (Facebook, Shopee, Grab...) và thử *tự thiết kế lại* theo quy trình mục 6: ước lượng tải → vẽ thành phần → tìm nút thắt. Đây là cách luyện system design tốt nhất.
- Khi làm dự án thật, áp ngược lại 3 tầng: bắt đầu từ yêu cầu rõ ràng (Tầng 1) → viết code sạch có test (Tầng 2) → triển khai qua CI/CD và thiết kế để mở rộng (Tầng 3).
- Ba tầng liên kết: một quyết định scalability (Tầng 3) thường buộc đổi kiến trúc & code (Tầng 2), mà gốc lại từ yêu cầu phi chức năng "phải chịu N user" (Tầng 1). Phần mềm tốt là khi cả ba tầng ăn khớp.

Quay lại [trang chính lĩnh vực SoftwareEngineering](../../index.html) để xem toàn bộ bản đồ bài học và ôn lại các tầng.
`;
