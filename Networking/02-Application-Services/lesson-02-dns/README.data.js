// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/02-Application-Services/lesson-02-dns/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — DNS (Domain Name System)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vấn đề DNS giải quyết**: tại sao con người cần tên miền thay vì địa chỉ IP.
- Nắm vững **cấu trúc phân cấp tên miền** (root → TLD → domain → subdomain).
- Phân biệt được 4 loại DNS server: root, TLD, authoritative, và resolver (đệ quy).
- Walk-through **quy trình phân giải đầy đủ** của \`www.example.com\` từng bước — recursive và iterative.
- Đọc và viết các **bản ghi DNS** phổ biến: A, AAAA, CNAME, MX, NS, TXT, PTR.
- Hiểu **caching và TTL** — tại sao đổi DNS cần vài giờ mới có hiệu lực.
- Biết DNS chạy trên UDP/53 và các vấn đề bảo mật sơ lược.

## Kiến thức tiền đề

- [Lesson 07 — UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) — DNS dùng UDP port 53.
- [Lesson 01 — Client-server & Socket](../lesson-01-client-server-sockets/) — mô hình request/response.

---

## 1. Vấn đề: người nhớ tên, máy cần IP

💡 **Trực giác — Danh bạ điện thoại**

Hãy tưởng tượng bạn muốn gọi cho "Bệnh viện Bạch Mai". Bạn không nhớ số điện thoại — bạn chỉ nhớ cái tên. Bạn tra danh bạ, danh bạ trả về \`024 3869 3731\`, bạn bấm số đó để gọi.

DNS hoạt động y hệt vậy: bạn gõ \`google.com\` → máy tính tra DNS → DNS trả về \`142.250.185.46\` → máy kết nối tới địa chỉ đó.

### 1.1. Tại sao không dùng IP trực tiếp?

Con người nhớ tên tốt hơn con số. Nhưng còn một lý do kỹ thuật quan trọng hơn:

**IP có thể thay đổi, nhưng tên không đổi.** Google có thể chuyển server từ \`142.250.185.46\` sang \`142.251.0.100\` vì lý do kỹ thuật — bạn không cần biết. Miễn là DNS được cập nhật, \`google.com\` vẫn dẫn đến đúng nơi.

Nếu dùng IP trực tiếp, mỗi lần server thay địa chỉ, tất cả người dùng phải nhớ địa chỉ mới — không khả thi.

### 1.2. Lịch sử: trước khi có DNS

Trước năm 1983, có một file \`/etc/hosts\` do Stanford Research Institute (SRI) quản lý trung tâm. Mọi máy tính trên Internet phải tải file này về để biết tên nào tương ứng IP nào.

Vấn đề: khi Internet lớn lên, file này:
- Phải cập nhật thủ công.
- Phải phân phối cho hàng triệu máy — không kịp.
- Không có cơ chế phân quyền: ai cũng có thể khai báo bất kỳ tên nào.

DNS ra đời năm 1983 (RFC 882/883) để thay thế — hệ thống **phân tán, phân cấp, có thể mở rộng vô hạn**.

❓ **Câu hỏi tự nhiên của người đọc**

> "File \`/etc/hosts\` vẫn còn tồn tại không?"

Có. Trên mọi hệ điều hành (Windows: \`C:\\Windows\\System32\\drivers\\etc\\hosts\`, Linux/macOS: \`/etc/hosts\`). Nó được đọc **trước** khi hỏi DNS. Người dùng thường dùng nó để block quảng cáo (\`0.0.0.0 ads.example.com\`) hoặc trỏ domain về localhost khi phát triển (\`127.0.0.1 myapp.local\`).

📝 **Tóm tắt mục 1**

- DNS = danh bạ phân tán của Internet: ánh xạ tên miền → địa chỉ IP.
- Trước DNS: file \`/etc/hosts\` tập trung — không mở rộng được.
- DNS ra đời 1983, giải quyết scale bằng cách phân cấp và phân tán.

---

## 2. Cấu trúc phân cấp tên miền

💡 **Trực giác — Cây thư mục ngược**

Hệ thống tên miền là một **cây ngược** — gốc ở trên, lá ở dưới. Bạn đọc từ phải sang trái khi phân tích:

\`\`\`
www.example.com.
 │      │      │  └── (root) — dấu chấm cuối, thường ẩn
 │      │      └── TLD: .com
 │      └── domain: example
 └── subdomain: www
\`\`\`

Mỗi nhãn (label) tối đa 63 ký tự. Tên đầy đủ (FQDN — Fully Qualified Domain Name) tối đa 253 ký tự.

### 2.1. Các tầng của cây

| Tầng | Ký hiệu | Ví dụ | Quản lý bởi |
|------|---------|-------|------------|
| Root | \`.\` (dấu chấm) | \`.\` | ICANN / root server operators |
| TLD (Top-Level Domain) | Sau dấu chấm cuối | \`.com\`, \`.vn\`, \`.org\`, \`.edu\`, \`.io\` | ICANN ủy quyền (VeriSign quản lý \`.com\`) |
| Second-level domain | Nhãn thứ hai từ phải | \`example\`, \`google\`, \`hasaki\` | Chủ domain mua/thuê từ registrar |
| Subdomain | Nhãn từ thứ ba trở lên từ phải | \`www\`, \`mail\`, \`api\`, \`staging\` | Chủ domain tự cấu hình |

### 2.2. Phân loại TLD

- **gTLD** (generic): \`.com\`, \`.org\`, \`.net\`, \`.edu\`, \`.gov\`, \`.io\`, \`.app\` — dùng chung toàn cầu.
- **ccTLD** (country code): \`.vn\` (Việt Nam), \`.us\` (Mỹ), \`.jp\` (Nhật), \`.uk\` (Anh) — phân theo quốc gia.
- **New gTLD** (từ 2012): \`.shop\`, \`.bank\`, \`.tech\`, \`.museum\` — hơn 1,200 TLD mới được phê duyệt.

### 2.3. Ví dụ phân tích FQDN

Phân tích \`mail.vnexpress.net.\`:

| Phần | Giá trị | Ý nghĩa |
|------|---------|---------|
| \`.\` | Root | Điểm bắt đầu tra cứu |
| \`net\` | TLD | domain cấp cao nhất |
| \`vnexpress\` | SLD | tên domain chính |
| \`mail\` | Subdomain | server email của vnexpress |

Phân tích \`api.staging.myapp.io.\`:

| Phần | Giá trị | Ý nghĩa |
|------|---------|---------|
| \`io\` | TLD | |
| \`myapp\` | SLD | |
| \`staging\` | Subdomain cấp 1 | môi trường staging |
| \`api\` | Subdomain cấp 2 | endpoint API trong staging |

⚠ **Lỗi thường gặp**

Nhiều người nhầm "domain" là toàn bộ chuỗi. Đúng ra:
- \`google.com\` = domain (SLD + TLD).
- \`www.google.com\` = subdomain \`www\` của domain \`google.com\`.
- \`mail.google.com\` = subdomain \`mail\` — hoàn toàn có thể trỏ về IP khác với \`www.google.com\`.

🔁 **Dừng lại tự kiểm tra**

Cho tên miền \`api.dev.company.co.vn.\`, hãy xác định từng phần.

<details>
<summary>Đáp án</summary>

- Root: \`.\` (dấu chấm cuối ngầm)
- TLD cấp 1: \`vn\`
- TLD cấp 2 (second-level ccTLD): \`co\` — đây là TLD phụ của Việt Nam cho công ty.
- Second-level domain: \`company\`
- Subdomain cấp 1: \`dev\`
- Subdomain cấp 2: \`api\`

</details>

📝 **Tóm tắt mục 2**

- Cây tên miền là cây ngược: root (\`.\`) → TLD → SLD → subdomain.
- Đọc từ phải sang trái theo hệ thống phân cấp.
- TLD được quản lý bởi ICANN và các tổ chức được ủy quyền.
- Chủ domain kiểm soát tất cả subdomain bên dưới domain của mình.

---

## 3. Các loại DNS server

💡 **Trực giác — Hệ thống thư ký tra cứu**

Hãy hình dung một khách sạn 5 sao. Bạn nhờ **lễ tân** (resolver) tìm nhà hàng ăn phở tốt gần đây. Lễ tân không biết ngay — anh ta hỏi **quản lý khu vực** (root), quản lý khu vực chỉ sang **chuyên gia ẩm thực Hà Nội** (TLD), chuyên gia đó tra sổ và đưa ra **địa chỉ cụ thể** của nhà hàng (authoritative).

Bạn (client) chỉ cần hỏi lễ tân — còn việc lễ tân đi hỏi khắp nơi là việc của lễ tân.

### 3.1. Root Name Server

**Là gì**: 13 nhóm server toàn cầu (ký hiệu A qua M), do các tổ chức như NASA, ICANN, Verisign điều hành. Thực tế có hơn 1,700 node anycast.

**Địa chỉ ví dụ**: \`a.root-servers.net\` → \`198.41.0.4\`, \`b.root-servers.net\` → \`199.9.14.201\`.

**Vai trò**: Không biết địa chỉ IP của website cụ thể. Chỉ biết: "TLD \`.com\` → hỏi server này"; "TLD \`.vn\` → hỏi server kia". Đây là bước đầu tiên của mọi truy vấn từ đầu.

**Vì sao chỉ 13 tên?** Đây là giới hạn kỹ thuật của DNS protocol: toàn bộ danh sách 13 root phải vừa trong 1 UDP packet 512 byte (đặc tả gốc). Mỗi "tên" thực ra là một cụm anycast gồm hàng trăm máy chủ phân bố khắp thế giới.

### 3.2. TLD Name Server

**Là gì**: Server quản lý một TLD cụ thể. Ví dụ: VeriSign quản lý \`.com\` và \`.net\`; VNNIC quản lý \`.vn\`.

**Địa chỉ ví dụ**: \`a.gtld-servers.net\` → \`192.5.6.30\` (quản lý \`.com\`).

**Vai trò**: Biết authoritative server nào đang giữ thông tin cho từng domain trong TLD đó. Ví dụ: "Ai quản lý \`example.com\`? → \`ns1.iana.org\`".

### 3.3. Authoritative Name Server

**Là gì**: Server "có thẩm quyền" — nơi chủ domain đặt các bản ghi DNS thực sự.

**Ví dụ**: Bạn mua domain \`mycompany.vn\`, dùng CloudFlare làm DNS → CloudFlare là authoritative server. Server đó biết: \`www.mycompany.vn\` → \`104.21.45.30\`.

**Vai trò**: Trả lời dứt khoát và chính xác nhất. Câu trả lời từ authoritative server có authority flag = 1.

### 3.4. Recursive Resolver (DNS Resolver đệ quy)

**Là gì**: Server mà client của bạn thực sự hỏi. Thường là:
- Server của ISP bạn đang dùng (Viettel, VNPT, FPT đều có resolver riêng).
- Server công cộng: Google \`8.8.8.8\`, Cloudflare \`1.1.1.1\`, OpenDNS \`208.67.222.222\`.

**Vai trò**: Là "người thay mặt" client đi hỏi toàn bộ hệ thống DNS. Client hỏi một lần — resolver tự đi hỏi root, TLD, authoritative và trả kết quả về.

**Cache**: Resolver lưu kết quả vào bộ nhớ đệm. Lần sau có ai hỏi cùng domain trong thời gian TTL → trả lời ngay, không cần hỏi lại.

❓ **Câu hỏi tự nhiên của người đọc**

> "Máy tính của tôi biết resolver nào để hỏi đầu tiên?"

Khi máy tính kết nối mạng (qua DHCP), router thường cấp địa chỉ resolver (thường là IP của router, rồi router forward lên resolver của ISP). Bạn cũng có thể cấu hình thủ công: Settings → Network → DNS → nhập \`8.8.8.8\`.

> "Resolver cũng là một loại DNS server — vậy ai cho nó biết địa chỉ root server?"

Mọi resolver đều có danh sách **root hints** — 13 địa chỉ root server được hard-code hoặc cập nhật định kỳ. Đây là "điểm neo" (anchor point) của toàn hệ thống DNS. File \`named.root\` (hoặc \`db.root\`) chứa danh sách này.

📝 **Tóm tắt mục 3**

- **Root server**: biết TLD nào do ai quản lý (13 nhóm, >1700 node anycast).
- **TLD server**: biết authoritative nào quản lý domain trong TLD đó.
- **Authoritative server**: giữ bản ghi DNS thực sự của domain.
- **Recursive resolver**: "thám tử" đi hỏi thay client, lưu cache kết quả.

---

## 4. Quy trình phân giải DNS — Walk-through đầy đủ

💡 **Trực giác — Hai lớp: đệ quy và lặp**

Có 2 kiểu truy vấn DNS:

- **Đệ quy (recursive)**: Client hỏi resolver — resolver tự làm hết. Giống đặt vé máy bay qua đại lý: bạn nói "tôi muốn bay Hà Nội → Paris ngày 1/6" và đại lý lo toàn bộ.
- **Lặp (iterative)**: Resolver hỏi root → root trả lời "hỏi TLD kia đi" → resolver hỏi TLD → TLD trả lời "hỏi authoritative kia đi" → resolver hỏi authoritative → có câu trả lời. Giống bạn tự đi hỏi từng người một.

Trong thực tế: client → resolver là **đệ quy**. Resolver → root/TLD/authoritative là **lặp**.

### 4.1. Walk-through phân giải \`www.example.com\`

**Giả định**: lần đầu tiên, resolver chưa có cache gì cả.

\`\`\`
Client IP: 192.168.1.5
Resolver:  8.8.8.8  (Google Public DNS)
\`\`\`

**Bước 1 — Client hỏi resolver (đệ quy)**

\`\`\`
Client → Resolver 8.8.8.8
  Truy vấn: "www.example.com có IP là gì?"
  Loại: Recursive query (RD=1 — Recursion Desired)
  Giao thức: UDP, port 53
\`\`\`

**Bước 2 — Resolver hỏi Root server (lặp)**

Resolver không biết → hỏi root server \`a.root-servers.net\` (198.41.0.4):

\`\`\`
Resolver 8.8.8.8 → Root 198.41.0.4
  Truy vấn: "www.example.com A record?"
  Loại: Iterative query (RD=0)

Root server trả lời:
  "Tôi không biết. Nhưng TLD .com do đây quản lý:
   a.gtld-servers.net  192.5.6.30
   b.gtld-servers.net  192.33.14.30
   [13 TLD server cho .com]"
  → Đây là NS referral, không phải câu trả lời cuối.
\`\`\`

**Bước 3 — Resolver hỏi TLD server cho \`.com\` (lặp)**

\`\`\`
Resolver 8.8.8.8 → TLD 192.5.6.30  (a.gtld-servers.net)
  Truy vấn: "www.example.com A record?"

TLD server trả lời:
  "Tôi không biết IP của www. Nhưng domain example.com do đây quản lý:
   a.iana-servers.net  199.43.135.53
   b.iana-servers.net  199.43.133.53"
  → Lại là NS referral.
\`\`\`

**Bước 4 — Resolver hỏi Authoritative server (lặp)**

\`\`\`
Resolver 8.8.8.8 → Authoritative 199.43.135.53  (a.iana-servers.net)
  Truy vấn: "www.example.com A record?"

Authoritative trả lời (authority flag = 1):
  "www.example.com.  3600  IN  A  93.184.216.34"
  → Câu trả lời CHÍNH XÁC. TTL = 3600 giây.
\`\`\`

**Bước 5 — Resolver cache và trả về client**

\`\`\`
Resolver 8.8.8.8:
  1. Lưu vào cache: www.example.com → 93.184.216.34 (hết hạn sau 3600s)
  2. Trả kết quả về client 192.168.1.5

Client → Kết nối TCP/80 tới 93.184.216.34
\`\`\`

**Tóm tắt dạng bảng:**

| Bước | Từ | Tới | Loại | Kết quả |
|------|----|-----|------|---------|
| 1 | Client | Resolver | Recursive | Hỏi |
| 2 | Resolver | Root | Iterative | NS cho \`.com\` |
| 3 | Resolver | TLD \`.com\` | Iterative | NS cho \`example.com\` |
| 4 | Resolver | Authoritative | Iterative | A record: \`93.184.216.34\` |
| 5 | Resolver | Client | Recursive | Trả IP |

### 4.2. Khi có cache (cache hit)

Nếu 5 phút sau bạn (hoặc người khác dùng cùng resolver) truy cập lại \`www.example.com\`:

\`\`\`
Client → Resolver 8.8.8.8
  Truy vấn: "www.example.com A record?"

Resolver kiểm tra cache:
  www.example.com → 93.184.216.34  (còn 3540 giây TTL)
  → Cache HIT! Trả lời ngay, không hỏi root/TLD/authoritative.

Tổng thời gian: ~1ms (thay vì ~50-150ms cho full resolution)
\`\`\`

### 4.3. Thời gian thực tế

Mỗi bước UDP round-trip:
- Client ↔ Resolver (cùng thành phố/ISP): ~5-20ms.
- Resolver ↔ Root server (anycast, phân tán toàn cầu): ~10-30ms.
- Resolver ↔ TLD server: ~20-50ms.
- Resolver ↔ Authoritative: ~20-100ms (tùy vị trí).

**Tổng full resolution (không cache)**: ~80-300ms — đáng kể nhưng chỉ xảy ra lần đầu hoặc sau khi TTL hết.

❓ **Câu hỏi tự nhiên của người đọc**

> "Resolver hỏi root server nào trong số 13 cái? Ngẫu nhiên không?"

Resolver thường dùng anycast: các root server phân bố khắp nơi, khi resolver "gọi" \`198.41.0.4\`, gói tin UDP sẽ được định tuyến đến node gần nhất. Resolver cũng có thể chọn root server ngẫu nhiên hoặc xoay vòng (round-robin) trong danh sách 13 server.

> "Gói DNS có bao giờ dùng TCP không?"

Có — khi câu trả lời quá lớn (>512 byte trong đặc tả cũ, >4096 byte với EDNS0). Ví dụ: zone transfer (AXFR) giữa các DNS server luôn dùng TCP/53. Truy vấn thông thường dùng UDP/53.

🔁 **Dừng lại tự kiểm tra**

Resolver nhận được câu trả lời từ TLD server: "domain \`hackerspace.vn\` do authoritative \`ns1.cloudflare.com\` quản lý". Resolver tiếp theo sẽ làm gì?

<details>
<summary>Đáp án</summary>

Resolver gửi truy vấn iterative đến \`ns1.cloudflare.com\` hỏi bản ghi A (hoặc AAAA) của \`hackerspace.vn\`. Nếu câu hỏi là cho \`www.hackerspace.vn\` và authoritative có CNAME, resolver tiếp tục phân giải CNAME đó.

</details>

📝 **Tóm tắt mục 4**

- Client → Resolver: **đệ quy** (một câu hỏi, một câu trả lời cuối).
- Resolver → Root/TLD/Auth: **lặp** (mỗi bước nhận referral hoặc câu trả lời).
- Thứ tự cố định: Root → TLD → Authoritative.
- Cache tránh lặp lại: resolver nhớ kết quả trong TTL giây.

---

## 5. Các loại bản ghi DNS

💡 **Trực giác**: Bản ghi DNS giống như các dòng trong danh bạ — không chỉ số điện thoại, còn có loại liên hệ (nhà riêng/công ty), địa chỉ fax, email...

### 5.1. Bản ghi A (Address)

**Là gì**: Ánh xạ tên miền → địa chỉ IPv4.

**Cú pháp**: \`<tên>  <TTL>  IN  A  <IPv4>\`

**Ví dụ thực tế**:
\`\`\`
www.example.com.    3600  IN  A  93.184.216.34
api.example.com.    300   IN  A  104.21.45.30
mail.example.com.   3600  IN  A  198.51.100.10
\`\`\`

TTL = 3600 giây (1 giờ): resolver cache trong 1 giờ. TTL = 300 giây (5 phút): thay đổi DNS lan truyền nhanh hơn nhưng load resolver nhiều hơn.

### 5.2. Bản ghi AAAA (IPv6 Address)

**Là gì**: Ánh xạ tên miền → địa chỉ IPv6. Tên "AAAA" vì địa chỉ IPv6 dài gấp 4 lần IPv4.

**Ví dụ**:
\`\`\`
www.example.com.  3600  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946
google.com.       300   IN  AAAA  2607:f8b0:4004:c09::64
\`\`\`

Khi client hỏi domain, thường hỏi cả A và AAAA. Nếu có AAAA, hệ điều hành ưu tiên IPv6 (Happy Eyeballs algorithm).

### 5.3. Bản ghi CNAME (Canonical Name)

**Là gì**: Alias — ánh xạ tên → tên khác (không trực tiếp ra IP).

**Khi nào dùng**: Khi muốn nhiều tên cùng trỏ về một chỗ, chỉ cần cập nhật một bản ghi A.

**Ví dụ**:
\`\`\`
www.example.com.   3600  IN  CNAME  example.com.
blog.example.com.  3600  IN  CNAME  myblog.wordpress.com.
shop.example.com.  300   IN  CNAME  myshop.shopify.com.
\`\`\`

Khi resolver gặp CNAME, nó tiếp tục phân giải CNAME target:
\`\`\`
Hỏi www.example.com → CNAME → example.com → A → 93.184.216.34
\`\`\`

⚠ **Lỗi thường gặp**

- **CNAME không thể kết hợp với bản ghi khác** tại cùng tên. Ví dụ: \`example.com\` vừa có CNAME vừa có MX là SAI. Lý do: CNAME nói "tên này là alias, mọi thứ hỏi tên kia" — mâu thuẫn với bản ghi MX riêng.
- **Không dùng CNAME ở apex domain** (\`example.com\` không nên dùng CNAME). Giải pháp: một số nhà cung cấp DNS hỗ trợ ALIAS hoặc ANAME (flat CNAME) cho apex.

### 5.4. Bản ghi MX (Mail Exchange)

**Là gì**: Chỉ định mail server nhận email cho domain. Có thêm **priority** (số nhỏ = ưu tiên cao).

**Ví dụ**:
\`\`\`
example.com.  3600  IN  MX  10  mail1.example.com.
example.com.  3600  IN  MX  20  mail2.example.com.
\`\`\`

Khi server gửi email đến \`user@example.com\`:
1. Tra DNS: \`example.com MX?\` → nhận được 2 server.
2. Thử \`mail1\` (priority 10 thấp hơn = ưu tiên hơn).
3. Nếu \`mail1\` không phản hồi → thử \`mail2\` (priority 20).

MX phải trỏ tới FQDN (tên miền), KHÔNG trỏ tới IP hoặc CNAME.

### 5.5. Bản ghi NS (Name Server)

**Là gì**: Chỉ định authoritative server nào quản lý domain.

**Ví dụ**:
\`\`\`
example.com.  86400  IN  NS  ns1.cloudflare.com.
example.com.  86400  IN  NS  ns2.cloudflare.com.
\`\`\`

Đây là bản ghi mà TLD server lưu để biết "ai quản lý \`example.com\`". Khi bạn mua domain và trỏ về Cloudflare, registrar cập nhật NS record này ở TLD server.

TTL thường rất cao (86400 = 24 giờ) vì NS hiếm khi thay đổi.

### 5.6. Bản ghi TXT (Text)

**Là gì**: Văn bản tự do — ban đầu để ghi chú, nay dùng cho xác thực và bảo mật.

**Ứng dụng phổ biến**:

\`\`\`
# Xác minh quyền sở hữu domain (Google, Facebook...)
example.com.  3600  IN  TXT  "google-site-verification=abc123..."

# SPF — chỉ định mail server hợp lệ để chống spam giả mạo
example.com.  3600  IN  TXT  "v=spf1 include:_spf.google.com ~all"

# DKIM — chữ ký email
mail._domainkey.example.com.  3600  IN  TXT  "v=DKIM1; k=rsa; p=MIIBIjAN..."

# DMARC — chính sách xử lý email giả mạo
_dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
\`\`\`

### 5.7. Bản ghi PTR (Pointer — Reverse DNS)

**Là gì**: Ngược với A record — ánh xạ IP → tên miền. Dùng cho reverse DNS lookup.

**Cú pháp**: IP viết ngược + \`.in-addr.arpa.\`

**Ví dụ**:
\`\`\`
# 93.184.216.34 ngược = 34.216.184.93
34.216.184.93.in-addr.arpa.  3600  IN  PTR  example.com.
\`\`\`

**Ứng dụng**: Mail server kiểm tra PTR của IP gửi thư — nếu không có PTR hoặc PTR không khớp, email dễ bị đánh dấu spam. Công cụ \`dig -x 8.8.8.8\` sẽ trả về \`dns.google.\`.

### 5.8. Caching và TTL

**TTL (Time To Live)**: Số giây resolver được phép cache bản ghi.

**Ví dụ ảnh hưởng TTL**:

Bạn đổi IP của \`www.mysite.com\` từ \`1.2.3.4\` sang \`5.6.7.8\`.

- Nếu TTL cũ là **86400** (1 ngày): resolver trên toàn thế giới tiếp tục cache kết quả cũ tới 24 giờ. Trong thời gian đó, khoảng 50% người dùng vẫn truy cập IP cũ (tùy resolver của họ).
- Nếu TTL cũ là **300** (5 phút): sau tối đa 5 phút, toàn bộ resolver phải hỏi lại → nhận IP mới.

**Thực hành tốt**:
- **Bình thường**: TTL = 3600-86400 (giảm load server DNS).
- **Trước khi đổi IP**: hạ TTL xuống 300-600 trước 24-48 giờ. Sau khi đổi xong và ổn định, tăng lại TTL.

**Vì sao "đổi DNS mất vài giờ"?** Vì resolver của bạn (ISP, 8.8.8.8...) đang cache giá trị cũ với TTL chưa hết. Bạn không thể "ép" resolver của người khác xóa cache.

📝 **Tóm tắt mục 5**

| Bản ghi | Ánh xạ | Ví dụ điển hình |
|---------|--------|----------------|
| A | Tên → IPv4 | \`www.example.com → 93.184.216.34\` |
| AAAA | Tên → IPv6 | \`www.example.com → 2606:...\` |
| CNAME | Tên → Tên khác | \`www → apex, blog → wordpress\` |
| MX | Domain → Mail server (có priority) | \`example.com → mail1 (pri 10)\` |
| NS | Domain → Authoritative server | \`example.com → ns1.cloudflare.com\` |
| TXT | Domain → Văn bản | SPF, DKIM, xác minh domain |
| PTR | IP → Tên (reverse) | \`34.216.184.93.in-addr.arpa → example.com\` |

---

## 6. DNS & Giao thức vận chuyển

### 6.1. DNS trên UDP/53

DNS dùng [UDP port 53](../../01-Foundations-LowerLayers/lesson-07-udp/) cho mọi truy vấn thông thường.

**Tại sao UDP, không phải TCP?**

- Truy vấn DNS rất nhỏ: thường <512 byte cả hỏi lẫn trả lời — vừa 1 UDP datagram.
- TCP cần bắt tay 3 bước (SYN/SYN-ACK/ACK) ≈ 1.5 RTT trước khi gửi được data. UDP gửi ngay — ưu tiên độ trễ thấp.
- DNS resolver đã có cơ chế retry tương tự: hỏi lại sau timeout nếu không nhận được trả lời.

**Định dạng DNS message** (tóm tắt header 12 byte):

\`\`\`
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Transaction ID       |QR|Opcode |AA|TC|RD|RA|Z |RCODE|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          QDCOUNT              |           ANCOUNT             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          NSCOUNT              |           ARCOUNT             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
\`\`\`

Các bit quan trọng: \`QR\` (0=query, 1=response), \`RD\` (Recursion Desired — client muốn đệ quy), \`RA\` (Recursion Available — server hỗ trợ đệ quy), \`AA\` (Authoritative Answer).

### 6.2. Công cụ CLI: \`dig\`

\`dig\` (Domain Information Groper) là công cụ tra DNS mạnh nhất:

\`\`\`bash
# Tra bản ghi A
dig www.example.com A

# Tra bản ghi MX
dig example.com MX

# Tra bản ghi NS
dig example.com NS

# Reverse lookup (PTR)
dig -x 8.8.8.8

# Hỏi resolver cụ thể (không dùng resolver mặc định của hệ thống)
dig @1.1.1.1 www.example.com A

# Xem full trace (giả lập resolver đi từ root)
dig +trace www.example.com

# Tắt hiển thị thừa, chỉ lấy answer
dig +short www.example.com A
\`\`\`

**Ví dụ output \`dig www.example.com A\`**:

\`\`\`
; <<>> DiG 9.18 <<>> www.example.com A
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;www.example.com.           IN  A

;; ANSWER SECTION:
www.example.com.    3600    IN  A   93.184.216.34

;; Query time: 42 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Fri May 30 10:00:00 UTC 2026
;; MSG SIZE  rcvd: 56
\`\`\`

Đọc output: \`flags: qr rd ra\` — đây là response (\`qr\`), client yêu cầu đệ quy (\`rd\`), server hỗ trợ đệ quy (\`ra\`). \`status: NOERROR\` — thành công. \`3600\` là TTL còn lại.

---

## 7. DNS & Bảo mật

### 7.1. DNS Spoofing / Cache Poisoning (sơ lược)

**Vấn đề**: DNS gốc (UDP) không có xác thực. Kẻ tấn công có thể:
- Gửi câu trả lời giả (fake response) cho resolver trước khi authoritative server trả lời.
- Nếu resolver chấp nhận → lưu vào cache với IP giả mạo.
- Mọi người dùng hỏi resolver đó trong thời gian TTL → bị chuyển đến IP của attacker.

Tấn công này gọi là **DNS cache poisoning** — sẽ học chi tiết ở [Lesson 02 — Tấn công và Phòng thủ](../../03-Advanced-Operations/lesson-02-attacks-defense/).

### 7.2. DNSSEC (DNS Security Extensions)

**Là gì**: Cơ chế ký số (digital signature) cho bản ghi DNS. Resolver có thể xác minh rằng câu trả lời đến từ authoritative server hợp lệ và không bị sửa đổi.

**Cách hoạt động (định tính)**:
- Authoritative server ký bản ghi DNS bằng private key.
- Resolver kiểm tra chữ ký bằng public key (được lưu trong \`DNSKEY\` record).
- Chuỗi tin cậy từ root (root key được ICANN/IANA ký và phân phối).

**Hạn chế**: DNSSEC phức tạp, không mã hóa nội dung (bên thứ 3 vẫn thấy bạn hỏi domain gì), và chỉ bảo vệ tính toàn vẹn — không bảo vệ riêng tư.

### 7.3. DNS over HTTPS (DoH) và DNS over TLS (DoT)

Để bảo vệ **riêng tư** (ISP không nghe được bạn đang tra domain gì):
- **DoH**: DNS query được bọc trong HTTPS request tới port 443. Firefox, Chrome, Windows 11 hỗ trợ.
- **DoT**: DNS query bọc trong TLS tới port 853.

Cả hai mã hóa truy vấn DNS — ISP chỉ thấy kết nối HTTPS/TLS tới resolver, không thấy tên domain bạn tra.

📝 **Tóm tắt mục 7**

- DNS gốc = UDP không xác thực → dễ bị cache poisoning.
- DNSSEC = chữ ký số, bảo vệ toàn vẹn dữ liệu.
- DoH/DoT = mã hóa truy vấn DNS, bảo vệ riêng tư.

---

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Thứ tự phân giải**

Trình bày đầy đủ các bước mà DNS resolver \`1.1.1.1\` thực hiện để phân giải \`api.github.com\`, giả sử cache trống. Xác định bước nào là recursive, bước nào là iterative.

**Bài 2 — Chọn loại bản ghi**

Với mỗi yêu cầu sau, hãy chỉ ra loại bản ghi DNS phù hợp và viết mẫu bản ghi:

a) Trỏ \`blog.mycompany.vn\` về địa chỉ IPv4 \`203.0.113.42\`.
b) Tạo alias \`www.mycompany.vn\` → \`mycompany.vn\`.
c) Chỉ định email server \`mail.mycompany.vn\` (IP \`203.0.113.50\`) nhận thư cho \`mycompany.vn\`.
d) Cho phép server gửi thư xác minh ownership cho Google Search Console biết bạn sở hữu domain.

**Bài 3 — Ảnh hưởng TTL**

Website \`shop.acme.com\` có bản ghi A với TTL = 86400 (1 ngày) trỏ về IP \`10.0.0.1\`. Bạn cần đổi IP sang \`10.0.0.2\` vào lúc 08:00 thứ Hai.

a) Nếu không chuẩn bị gì, tình huống xấu nhất có thể kéo dài bao lâu?
b) Hành động nào nên thực hiện để giảm thời gian gián đoạn?
c) Nếu giảm TTL xuống 300 và chờ 24 giờ trước khi đổi IP, thời gian gián đoạn tối đa còn bao nhiêu?

**Bài 4 — Đọc output dig**

\`\`\`
; <<>> DiG 9.18 <<>> hasaki.vn MX
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 58391
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;hasaki.vn.                 IN  MX

;; ANSWER SECTION:
hasaki.vn.          300     IN  MX  1 aspmx.l.google.com.
hasaki.vn.          300     IN  MX  5 alt1.aspmx.l.google.com.
hasaki.vn.          300     IN  MX  5 alt2.aspmx.l.google.com.
hasaki.vn.          300     IN  MX  10 alt3.aspmx.l.google.com.
hasaki.vn.          300     IN  MX  10 alt4.aspmx.l.google.com.
\`\`\`

a) Hasaki.vn dùng dịch vụ email của công ty nào?
b) Nếu \`aspmx.l.google.com\` không phản hồi, mail server sẽ thử server nào tiếp theo?
c) TTL = 300 có ý nghĩa gì trong bối cảnh vận hành?

**Bài 5 — DNS và bảo mật**

a) Tấn công DNS cache poisoning hoạt động như thế nào (mô tả ngắn gọn)?
b) DNSSEC bảo vệ khỏi tấn công này ra sao?
c) Nếu bạn dùng \`dig @8.8.8.8 example.com +dnssec\`, output có thêm bản ghi loại gì?

**Bài 6 — Thiết kế DNS cho hệ thống thực**

Một startup có domain \`myapp.io\`, chạy:
- Web server tại \`54.1.2.3\` (frontend)
- API server tại \`54.1.2.4\`
- Email server tại \`54.1.2.5\`
- Backup web server tại \`54.1.2.10\`

Hãy thiết kế đầy đủ bộ bản ghi DNS, bao gồm: A, CNAME (nếu hợp lý), MX, NS (giả sử dùng Cloudflare), TXT (SPF cơ bản).

---

### Lời giải chi tiết

**Lời giải Bài 1**

Bước thực hiện:

1. **Client → Resolver 1.1.1.1** (recursive): Client gửi truy vấn A record cho \`api.github.com\`, flag RD=1.

2. **Resolver → Root server** (iterative, ví dụ \`b.root-servers.net\` 199.9.14.201): Hỏi về \`api.github.com\`. Root không biết IP — trả về danh sách NS server cho TLD \`.com\` (ví dụ \`a.gtld-servers.net\` 192.5.6.30).

3. **Resolver → TLD \`.com\` server** (iterative, \`a.gtld-servers.net\`): Hỏi về \`api.github.com\`. TLD biết \`github.com\` do ai quản lý — trả về NS: \`ns1.p16.dynect.net\`, \`ns2.p16.dynect.net\`, \`ns3.p16.dynect.net\`, \`ns4.p16.dynect.net\`.

4. **Resolver → Authoritative của github.com** (iterative, ví dụ \`ns1.p16.dynect.net\`): Hỏi bản ghi A của \`api.github.com\`. Authoritative trả về: \`api.github.com. 60 IN A 140.82.112.6\` (AA=1).

5. **Resolver → Client** (kết thúc recursive): Trả về IP \`140.82.112.6\`. Resolver cache: TTL = 60s.

Phân loại: Bước 1 và 5 là recursive (từ góc nhìn client). Bước 2, 3, 4 là iterative (resolver tự đi hỏi từng bước).

---

**Lời giải Bài 2**

a) Bản ghi **A**:
\`\`\`
blog.mycompany.vn.  3600  IN  A  203.0.113.42
\`\`\`

b) Bản ghi **CNAME**:
\`\`\`
www.mycompany.vn.  3600  IN  CNAME  mycompany.vn.
\`\`\`
Lưu ý: \`mycompany.vn\` phải có bản ghi A. Resolver sẽ chain: \`www\` → CNAME → \`mycompany.vn\` → A → IP.

c) Bản ghi **MX** + bản ghi **A** cho mail server:
\`\`\`
mycompany.vn.       3600  IN  MX  10  mail.mycompany.vn.
mail.mycompany.vn.  3600  IN  A   203.0.113.50
\`\`\`
MX phải trỏ tới hostname (không phải IP trực tiếp).

d) Bản ghi **TXT**:
\`\`\`
mycompany.vn.  3600  IN  TXT  "google-site-verification=<token từ Google Search Console>"
\`\`\`

---

**Lời giải Bài 3**

a) Tình huống xấu nhất: Resolver nào đó vừa cache bản ghi lúc 07:59 với TTL = 86400s → bản ghi cũ (IP \`10.0.0.1\`) được cache tới 07:59 thứ Ba — **gần 24 giờ** sau khi đổi IP thực sự.

b) Hành động chuẩn bị:
- Ít nhất 24-48 giờ trước thời điểm đổi IP (thứ Bảy hoặc Chủ Nhật), hạ TTL xuống 300-600 giây.
- Chờ 24 giờ để resolver trên thế giới re-query và nhận TTL mới (300s).
- Thứ Hai 08:00: đổi IP sang \`10.0.0.2\`. Lúc này mọi resolver đang cache kết quả với TTL tối đa 300s.

c) Sau khi giảm TTL = 300 và chờ 24h: mọi resolver có bản ghi với TTL = 300. Khi đổi IP, tối đa **300 giây = 5 phút** sau là toàn bộ resolver phải hỏi lại và nhận IP mới.

---

**Lời giải Bài 4**

a) Hasaki.vn dùng **Google Workspace** (Gmail for Business) — tất cả MX đều trỏ về \`*.aspmx.l.google.com\` là server nhận thư của Google.

b) Nếu \`aspmx.l.google.com\` (priority 1 — ưu tiên nhất) không phản hồi, mail server thử **\`alt1.aspmx.l.google.com\`** hoặc **\`alt2.aspmx.l.google.com\`** (cả hai priority 5 — bằng nhau, thử ngẫu nhiên một trong hai).

c) TTL = 300 giây (5 phút): resolver cache MX record này tối đa 5 phút. Nếu Google thay đổi địa chỉ MX server, thay đổi lan truyền trong ~5 phút. TTL ngắn phù hợp cho email server (downtime ảnh hưởng nghiêm trọng → cần chuyển failover nhanh).

---

**Lời giải Bài 5**

a) DNS cache poisoning:
- Attacker biết resolver đang gửi query (có thể quan sát traffic, hoặc đoán).
- Attacker gửi hàng nghìn fake response với transaction ID khác nhau, trước khi authoritative server trả lời.
- Nếu một fake response trùng transaction ID của query đang chờ → resolver chấp nhận IP giả.
- Cache bị nhiễm: mọi người hỏi resolver → nhận IP của attacker → phishing/man-in-the-middle.

b) DNSSEC: Authoritative server ký bản ghi bằng private key, sinh ra \`RRSIG\` record. Resolver kiểm tra chữ ký bằng public key (\`DNSKEY\`) — nếu chữ ký không hợp lệ, resolver từ chối câu trả lời. Attacker không có private key → không thể tạo chữ ký hợp lệ → cache poisoning thất bại.

c) Output sẽ có thêm: bản ghi \`RRSIG\` (chữ ký số cho A record), bản ghi \`DNSKEY\` (public key), và có thể \`NSEC\`/\`NSEC3\` (chứng minh domain không tồn tại). Flag \`ad\` (Authenticated Data) trong header xác nhận DNSSEC validation thành công.

---

**Lời giải Bài 6**

Thiết kế đầy đủ:

\`\`\`
; ── NS Records (Cloudflare) ──
myapp.io.    86400  IN  NS  ns1.cloudflare.com.
myapp.io.    86400  IN  NS  ns2.cloudflare.com.

; ── A Records ──
myapp.io.      3600  IN  A  54.1.2.3    ; apex (frontend)
www.myapp.io.  3600  IN  A  54.1.2.3    ; hoặc dùng CNAME nếu provider hỗ trợ ALIAS
api.myapp.io.  3600  IN  A  54.1.2.4    ; API server
mail.myapp.io. 3600  IN  A  54.1.2.5    ; mail server

; ── CNAME — backup web (nếu backend switch IP theo hostname) ──
; Nếu backup server cùng IP với main: dùng load balancer, không cần record riêng
; Nếu muốn record riêng:
backup.myapp.io. 300  IN  A  54.1.2.10

; ── MX Records ──
myapp.io.  3600  IN  MX  10  mail.myapp.io.

; ── TXT — SPF ──
myapp.io.  3600  IN  TXT  "v=spf1 ip4:54.1.2.5 -all"
; Giải thích: cho phép gửi thư từ IP 54.1.2.5, từ chối mọi IP khác (-all)

; ── TXT — DMARC ──
_dmarc.myapp.io.  3600  IN  TXT  "v=DMARC1; p=quarantine; rua=mailto:admin@myapp.io"
\`\`\`

Ghi chú thiết kế: TTL = 300 cho các record quan trọng có thể thay đổi (api, mail), TTL = 3600 cho apex. NS có TTL cao nhất (86400) vì hiếm thay đổi.

---

## 9. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 07 — UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) — giao thức vận chuyển DNS dùng.
- **Bài tiếp theo**: [Lesson 03 — HTTP/HTTPS cơ bản](../lesson-03-http-basics/) — sau khi DNS trả về IP, browser dùng HTTP để lấy trang web.
- **Liên quan**: [Lesson 02 — Tấn công và Phòng thủ](../../03-Advanced-Operations/lesson-02-attacks-defense/) — DNS spoofing, cache poisoning chi tiết.

---

## 📝 Tổng kết Lesson 02

1. **DNS = danh bạ phân tán của Internet**: ánh xạ tên miền dễ nhớ → địa chỉ IP máy cần.
2. **Cây phân cấp**: Root (\`.\`) → TLD (\`.com\`, \`.vn\`) → SLD → Subdomain. Đọc từ phải sang trái.
3. **4 loại server**: Root (biết TLD), TLD (biết authoritative), Authoritative (giữ bản ghi thật), Resolver (đệ quy — đi hỏi thay client, có cache).
4. **Quy trình phân giải**: Client → Resolver (recursive) → Root → TLD → Authoritative (iterative) → Resolver cache → Client nhận IP.
5. **7 loại bản ghi chính**: A (IPv4), AAAA (IPv6), CNAME (alias), MX (email), NS (authoritative), TXT (xác thực/bảo mật), PTR (reverse).
6. **TTL quyết định tốc độ lan truyền** — giảm TTL trước khi đổi IP để giảm thời gian gián đoạn.
7. **DNS gốc = UDP/53, không xác thực** → dễ bị cache poisoning. DNSSEC thêm chữ ký số; DoH/DoT thêm mã hóa.

**Bài tiếp theo**: [Lesson 03 — HTTP/HTTPS cơ bản](../lesson-03-http-basics/) | [visualization.html](./visualization.html)
`;
