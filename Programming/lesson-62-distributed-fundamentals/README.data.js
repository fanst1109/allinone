// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-62-distributed-fundamentals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 62 — Distributed Fundamentals (Nền tảng hệ phân tán)

> Tier 6 · Lesson 62 — Mở đầu hành trình về **hệ phân tán (distributed systems)**. Bài này không viết microservice nào cả; nó dạy *cách suy nghĩa* khi dữ liệu và tính toán nằm trên nhiều máy nối với nhau bằng một mạng **không đáng tin**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **vì sao** phải phân tán (scale, availability, geo) và cái giá phải trả.
- Thuộc lòng **8 fallacies of distributed computing** và biết mỗi cái gây ra bug gì.
- Phát biểu chính xác **CAP theorem** và mở rộng **PACELC**, phân loại được một hệ thống là CP hay AP.
- Phân biệt 4 mức **consistency model**: strong (linearizable), sequential, causal, eventual — và chọn đúng cho từng use case.
- Hiểu **FLP impossibility** nói gì và vì sao consensus thực tế vẫn chạy được.
- Cài đặt và đọc được **vector clock**, phân biệt sự kiện *causal* với *concurrent*.
- Thiết kế operation **idempotent** với idempotency key, hiểu vì sao "exactly-once" là ảo tưởng.
- Tính **quorum** R + W > N, chẩn đoán **split-brain** và sửa bằng fencing token / quorum.

## Kiến thức tiền đề

- [Tier 5 — Data](../tier-5-data/index.html): transaction, ACID, replication, cache (rất quan trọng — distributed system kế thừa toàn bộ vấn đề của DB rồi nhân lên N lần).
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/README.md): tư duy concurrency. Distributed là concurrency nhưng *không có shared memory* và *có thể mất tin nhắn*.
- [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/README.md): timeout, deadline — công cụ sống còn khi gọi mạng.

> Lưu ý đọc: bài này nặng *khái niệm* hơn *code*. Mỗi mục nên đọc kèm mở [visualization.html](./visualization.html) để thao tác trực tiếp (kéo slider partition, gửi event vector clock, chỉnh W/R quorum) — trực giác hình thành nhanh hơn nhiều so với chỉ đọc chữ.

---

## 1. Vì sao phải distributed?

> 💡 **Trực giác.** Một quán phở có 1 đầu bếp giỏi phục vụ được 50 khách/giờ. Muốn phục vụ 500 khách/giờ bạn có 2 cách: (a) tìm 1 siêu đầu bếp nấu nhanh gấp 10 — *bất khả thi sau một ngưỡng*; hoặc (b) thuê 10 đầu bếp bình thường — *phân tán*. Hệ phân tán là chọn (b): nhiều máy thường thay vì một máy thần thánh.

Có đúng **ba** động lực, và chỉ ba:

### 1.1 Scale — một máy không đủ

Phần cứng có trần. CPU mạnh nhất, RAM lớn nhất, ổ nhanh nhất đều có giới hạn vật lý và giá tăng theo cấp số mũ (gọi là **scale up / vertical scaling**). Khi 1 máy không kham nổi tải, bạn **scale out / horizontal scaling**: thêm máy.

Ví dụ số cụ thể:
- 1 máy xử lý 10.000 request/giây (RPS). Cần 100.000 RPS → cần ~10–15 máy (cộng overhead).
- 1 máy chứa 2 TB dữ liệu. Cần lưu 50 TB → phải **shard** ra ~25+ máy.
- 1 Postgres ghi được 5.000 write/giây. Cần 50.000 → phải partition theo key.

### 1.2 Availability — một máy chết là sập

Một máy đơn lẻ có **MTBF** (mean time between failures) hữu hạn. Đĩa hỏng, RAM lỗi, mất điện, kernel panic. Nếu toàn bộ hệ thống nằm trên 1 máy, máy đó chết = 100% downtime.

Với N bản sao (replica) độc lập, xác suất *tất cả* cùng chết giảm theo cấp số nhân:
- 1 máy uptime 99% → downtime ~3.65 ngày/năm.
- 3 replica độc lập, mỗi cái 99% → xác suất cả 3 cùng chết = 0.01³ = 0.000001 → uptime 99.9999% (~32 giây/năm).

> ⚠ **Lỗi thường gặp.** "Độc lập" là giả định mạnh. Nếu 3 replica cùng cắm 1 ổ điện, cùng 1 switch, cùng 1 datacenter — chúng *không* độc lập, mất điện chung là cùng chết. Availability thật chỉ đạt được khi failure domain tách rời (khác rack, khác AZ, khác region).

### 1.3 Geo-distribution — gần người dùng

Tốc độ ánh sáng là trần cứng. Hà Nội ↔ Mỹ một vòng (round-trip) qua cáp quang tốn ~200 ms *chỉ riêng vật lý*, chưa tính xử lý. Đặt server gần user (CDN, edge, multi-region) giảm latency và chịu được mất nguyên một vùng địa lý.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy cứ thêm máy là xong?"* — Không. Thêm máy tạo ra **vấn đề mới**: máy nói chuyện với nhau qua mạng, mà mạng không đáng tin (mục 2). Toàn bộ phần còn lại của bài là về cái giá đó.
> - *"Khi nào KHÔNG nên distributed?"* — Khi 1 máy còn dư sức. Distributed thêm độ phức tạp khổng lồ; đừng trả giá đó nếu chưa cần. "You don't have a big-data problem" là câu nói kinh điển.

> 🔁 **Dừng lại tự kiểm tra.** Một startup có 200 user, 1 server chạy ổn. Có nên tách thành 5 microservice phân tán không?
> <details><summary>Đáp án</summary>Không. 200 user thì 1 máy thừa sức. Phân tán lúc này chỉ thêm độ phức tạp (network failure, consistency, deploy phối hợp) mà không được lợi gì về scale/availability tương xứng. Distributed là công cụ giải quyết vấn đề scale/availability *đã thực sự xuất hiện*, không phải mặc định.</details>

> 📝 **Tóm tắt mục 1.** (1) Chỉ có 3 lý do để distributed: scale, availability, geo. (2) Scale out = thêm máy thường thay vì máy thần thánh. (3) Availability cao cần failure domain *độc lập*. (4) Đừng phân tán khi 1 máy còn dư.

---

## 2. Tám ngộ nhận về distributed computing (8 Fallacies)

Năm 1994, L. Peter Deutsch (và sau bổ sung) liệt kê những **giả định sai** mà lập trình viên ngầm mang theo khi viết code gọi mạng. Mỗi giả định sai là một loại bug chờ phát nổ trong production.

| # | Ngộ nhận | Sự thật | Bug nếu tin vào ngộ nhận |
|---|----------|---------|--------------------------|
| 1 | **Network reliable** (mạng đáng tin) | Gói tin mất, kết nối rớt ngẫu nhiên | Gọi API không retry → mất dữ liệu khi rớt mạng |
| 2 | **Latency is zero** (độ trễ bằng 0) | Mỗi round-trip tốn 0.5–200 ms | Vòng lặp gọi DB 1000 lần (N+1) → chậm thảm họa |
| 3 | **Bandwidth is infinite** (băng thông vô hạn) | Băng thông hữu hạn, có nghẽn | Trả về payload 50 MB cho mobile → timeout |
| 4 | **Network is secure** (mạng an toàn) | Có kẻ nghe lén, giả mạo | Gửi password plaintext nội bộ → bị sniff |
| 5 | **Topology doesn't change** (cấu trúc mạng cố định) | IP/route thay đổi liên tục (autoscale, k8s) | Hardcode IP service → gọi vào máy đã chết |
| 6 | **There is one administrator** (chỉ một admin) | Nhiều team, nhiều tổ chức quản lý | Đổi config một bên làm sập bên kia |
| 7 | **Transport cost is zero** (chi phí truyền bằng 0) | Serialize/deserialize, TLS handshake tốn CPU & tiền | Bỏ qua chi phí marshalling JSON → CPU cháy |
| 8 | **Network is homogeneous** (mạng đồng nhất) | Nhiều giao thức, version, MTU khác nhau | Giả định mọi node nói cùng protocol/version |

> 💡 **Trực giác gom nhóm.** Bốn cái đầu (reliable, latency, bandwidth, secure) nói về **tính chất vật lý** của mạng. Bốn cái sau (topology, admin, cost, homogeneous) nói về **tính chất tổ chức/vận hành**. Mọi bug distributed kinh điển đều quy về vi phạm một trong tám điều này.

> ⚠ **Lỗi thường gặp #1 (và là gốc của hầu hết bug).** Tin vào fallacy #1 "network reliable". Code kiểu \`resp := callPaymentService(req)\` mà không xử lý trường hợp request đã *gửi đi nhưng không nhận được response* — chính là nguồn gốc của double-charge, mất đơn hàng. Xem mục 9 (idempotency) để xử lý đúng.

> 🔁 **Dừng lại tự kiểm tra.** Code: \`for _, id := range userIDs { user := db.Get(id) }\` với 500 id, DB ở máy khác (round-trip 1 ms). Vi phạm fallacy nào, tốn bao lâu?
> <details><summary>Đáp án</summary>Vi phạm #2 (latency zero). 500 × 1 ms = 500 ms chỉ riêng độ trễ mạng, tuần tự. Sửa: batch query \`db.GetMany(userIDs)\` 1 round-trip = 1 ms. Đây chính là vấn đề N+1 query.</details>

### 2.1 Bốn ví dụ bug thật quy về fallacy

Để thấy fallacies không phải lý thuyết suông, đây là bốn sự cố production điển hình và fallacy gốc:

1. **Double-charge thanh toán** (fallacy #1). Client gọi \`/charge\`, server *đã* trừ tiền nhưng response bị rớt giữa đường. Client tưởng thất bại → retry → trừ lần hai. Gốc: tin "network reliable". Sửa: idempotency key (mục 9).
2. **Trang load 8 giây vì N+1 query** (fallacy #2). Render danh sách 200 đơn hàng, mỗi đơn gọi DB lấy tên khách → 200 round-trip × 4 ms = 800 ms *chỉ riêng* mạng, cộng dồn nhiều layer thành 8 s. Gốc: tin "latency zero". Sửa: batch / join.
3. **Mobile timeout vì payload 40 MB** (fallacy #3). API trả nguyên ảnh base64 trong JSON. Trên 3G (~1 Mbps) tải 40 MB mất ~5 phút → timeout. Gốc: tin "bandwidth infinite". Sửa: phân trang, link ảnh thay vì nhúng.
4. **Gọi vào IP máy đã chết** (fallacy #5). Service hardcode \`10.0.1.5:8080\`; autoscaler thay máy, IP mới là \`10.0.1.9\`. App vẫn gọi IP cũ → connection refused. Gốc: tin "topology doesn't change". Sửa: service discovery (Lesson 63).

> 📝 **Tóm tắt mục 2.** Tám fallacies = checklist tâm lý. Trước khi gọi mạng, tự hỏi: nếu request này mất thì sao? nếu chậm 5s thì sao? nếu IP đổi thì sao? Mỗi câu "thì sao" mở ra một nhánh code phải xử lý. Bốn bug ở 2.1 đều là một fallacy bị bỏ qua.

---

## 3. CAP Theorem

> 💡 **Trực giác.** Ba người bạn (3 replica) giữ chung một cuốn sổ ghi số dư. Bình thường họ gọi điện cập nhật cho nhau. Đột nhiên *đường dây điện thoại đứt* (partition) — A không gọi được B, C. Lúc này A nhận yêu cầu "rút 100k". A có 2 lựa chọn: (a) **từ chối** ("xin lỗi tôi không liên lạc được với người khác, không dám cho rút" → mất *availability* nhưng dữ liệu nhất quán); hoặc (b) **vẫn cho rút** ("cứ rút, lát nối lại tôi báo sau" → còn *availability* nhưng B, C đang thấy số dư cũ → mất *consistency*). Bạn **không thể** vừa cho rút vừa đảm bảo B, C thấy ngay. Đó là CAP.

CAP theorem (Brewer, 2000; chứng minh Gilbert–Lynch 2002) phát biểu: một hệ phân tán **không thể** đồng thời đảm bảo cả ba:

- **C — Consistency**: mọi read thấy write mới nhất (ở đây nghĩa là *linearizable*, mạnh hơn nghĩa C trong ACID).
- **A — Availability**: mọi request tới node *còn sống* đều nhận được response (không lỗi, không treo).
- **P — Partition tolerance**: hệ vẫn hoạt động khi mạng bị chia cắt (mất gói giữa các node).

### 3.1 Hiểu đúng "chọn 2 trong 3"

Cách nói "chọn 2 trong 3" gây hiểu lầm. Sự thật:

**Partition (P) là điều bạn KHÔNG được chọn — nó tự xảy ra.** Mạng *sẽ* đứt (fallacy #1). Một hệ phân tán thật buộc phải tolerate partition. Vậy CAP thực chất là: **khi partition xảy ra, chọn C hay A?**

- **CP** (giữ Consistency, hy sinh Availability): khi partition, từ chối request (trả lỗi/treo) để không bao giờ trả dữ liệu cũ. Ví dụ trên: A *từ chối cho rút*.
- **AP** (giữ Availability, hy sinh Consistency): khi partition, vẫn trả lời nhưng có thể trả dữ liệu cũ; hội tụ lại sau (eventual). Ví dụ trên: A *vẫn cho rút*.

> ⚠ **Lỗi thường gặp.** Nói "MongoDB là CP nên luôn nhất quán" hay "Cassandra là AP nên luôn sẵn sàng" — sai ngữ cảnh. CAP chỉ nói về hành vi **lúc có partition**. Lúc mạng bình thường, cả CP lẫn AP đều vừa nhất quán vừa sẵn sàng. Trade-off chỉ kích hoạt khi mạng đứt.

### 3.2 Ví dụ hệ thống thật

| Hệ thống | CP hay AP | Hành vi khi partition |
|----------|-----------|------------------------|
| **PostgreSQL** (single-primary, sync replica) | CP | Nếu mất kết nối tới quorum replica, primary từ chối commit → không nhận write |
| **Cassandra** (quorum tunable, mặc định AP) | AP | Mỗi node vẫn nhận write/read, conflict resolve bằng last-write-wins sau |
| **etcd / ZooKeeper / Consul** (Raft) | CP | Phe không có quorum (minority) ngừng phục vụ write → giữ nhất quán |
| **DynamoDB** (tunable) | AP (mặc định) / CP (strong read tùy chọn) | Trả dữ liệu eventual nếu chọn eventual read |
| **DNS** | AP | Mỗi resolver trả bản cache của mình, TTL hết mới đồng bộ |

> ❓ **Câu hỏi tự nhiên.** *"Sao Postgres lại là CP? Tôi thấy nó luôn online mà."* — Vì cấu hình *synchronous replication*. Khi primary mất liên lạc với replica cần thiết, nó *chặn* write (hy sinh A) thay vì commit một mình (rủi ro mất dữ liệu nếu primary chết). Với async replication, hành vi lại khác — chứng tỏ CAP là *thuộc tính cấu hình*, không phải nhãn dán cố định lên sản phẩm.

> 🔁 **Dừng lại tự kiểm tra.** Hệ "đếm lượt like" của một bài post mạng xã hội nên CP hay AP?
> <details><summary>Đáp án</summary>AP. Hiển thị 1.001 like thay vì 1.002 trong vài giây không ai chết. Ưu tiên *luôn hiển thị được* (availability) hơn là số đếm chính xác tuyệt đối tức thời. Ngược lại, số dư tài khoản ngân hàng phải CP.</details>

> 📝 **Tóm tắt mục 3.** (1) P không phải lựa chọn — mạng sẽ đứt. (2) CAP thực chất = "khi partition, chọn C hay A". (3) CP: từ chối để giữ đúng. AP: trả lời để giữ sống. (4) Lúc mạng bình thường, không có trade-off. (5) CP/AP là thuộc tính cấu hình, không phải nhãn sản phẩm.

---

## 4. PACELC — mở rộng CAP

CAP chỉ nói về *lúc partition*. Nhưng **99.99% thời gian mạng KHÔNG partition** — CAP im lặng về quãng thời gian đó. PACELC (Abadi, 2012) vá lỗ hổng này:

> **PAC** — **i**f **P**artition: chọn **A**vailability hay **C**onsistency.
> **ELC** — **E**lse (mạng bình thường): chọn **L**atency hay **C**onsistency.

Phát biểu đầy đủ: **if P then (A or C) else (L or C)**.

> 💡 **Trực giác.** Ngay cả khi mạng ngon, muốn nhất quán mạnh bạn vẫn phải *chờ* các replica xác nhận (tốn latency). Muốn nhanh thì trả lời ngay từ replica gần nhất (có thể hơi cũ). Đây là trade-off **latency ↔ consistency** tồn tại *mọi lúc*, không chỉ khi partition.

### 4.1 Phân loại PACELC của hệ thực

| Hệ thống | Khi Partition | Khi bình thường (Else) | Ký hiệu |
|----------|---------------|------------------------|---------|
| Cassandra (mặc định) | A | L | **PA/EL** |
| DynamoDB | A | L | **PA/EL** |
| MongoDB | C | C | **PC/EC** |
| PostgreSQL (sync) | C | C | **PC/EC** |
| Cosmos DB (tunable) | tùy | tùy | cấu hình được |

Ví dụ đọc PACELC: **Cassandra = PA/EL** nghĩa là "khi partition ưu tiên Availability, lúc bình thường ưu tiên Latency". Tức Cassandra *luôn* ưu tiên tốc độ & sống còn hơn nhất quán.

> ❓ **Câu hỏi tự nhiên.** *"PACELC khác CAP chỗ nào thực sự?"* — CAP chỉ phủ cột "Khi Partition". PACELC thêm cột "Else" — cột này áp dụng *gần như toàn bộ thời gian*, nên thực tế nó quan trọng hơn. Một hệ PC/EC (như MongoDB) trả giá latency *mọi lúc* để nhất quán, không chỉ lúc hiếm hoi mạng đứt.

### 4.2 Đọc trade-off "else" bằng số

Giả sử 3 replica, round-trip nội bộ giữa replica là 5 ms. Một read request tới:

- **Ưu tiên Consistency (EC):** phải hỏi quorum (2/3 replica) và chờ đồng bộ → cộng thêm ~5–10 ms cho mỗi read. Đảm bảo luôn thấy giá trị mới nhất.
- **Ưu tiên Latency (EL):** trả lời ngay từ replica gần nhất (0 round-trip thêm) → nhanh hơn 5–10 ms, nhưng có thể trả giá trị cũ vài chục ms.

Với hệ phục vụ 100.000 read/giây, 5 ms thêm mỗi read không "miễn phí": nó ăn vào throughput và làm tail latency (p99) phình. Đó là vì sao Cassandra/DynamoDB chọn EL mặc định — đa số dữ liệu của chúng (feed, catalog) chịu được giá trị hơi cũ.

> 📝 **Tóm tắt mục 4.** PACELC = CAP + "else": nếu không partition thì vẫn phải chọn Latency vs Consistency. Đây là trade-off thường trực, quan trọng hơn cả nhánh partition vì mạng đa phần thời gian là ổn.

---

## 5. Consistency models (phổ nhất quán)

"Consistency" không phải bật/tắt mà là một **phổ (spectrum)** từ mạnh tới yếu. Mạnh hơn = dễ lập trình hơn nhưng chậm/đắt hơn.

> 💡 **Trực giác bằng đời thường.** Tưởng tượng nhiều người cùng chỉnh một Google Doc. Consistency model trả lời: "Khi tôi gõ một chữ, lúc nào người khác *phải* thấy nó?"

### 5.1 Strong / Linearizable (mạnh nhất)

**Là gì:** mọi operation *như thể* xảy ra tức thời tại một điểm thời gian duy nhất, theo đúng thứ tự thời gian thực. Sau khi write hoàn tất, *mọi* read tiếp theo (ở bất kỳ node nào) **bắt buộc** thấy giá trị mới.

**Ví dụ số:** A ghi \`x=5\` lúc 10:00:00.100 và nhận ack. B đọc lúc 10:00:00.101 → **chắc chắn** thấy \`x=5\`, không bao giờ thấy giá trị cũ.

**Use case:** số dư ngân hàng, khóa phân tán (distributed lock), leader election. **Giá:** chậm nhất (phải đồng bộ qua quorum/consensus).

### 5.2 Sequential

**Là gì:** mọi node thấy các operation theo *cùng một thứ tự*, và thứ tự đó tôn trọng thứ tự của từng tiến trình riêng lẻ — **nhưng** thứ tự chung không nhất thiết khớp thời gian thực.

**Ví dụ:** A ghi \`x=1\` rồi \`x=2\`. B ghi \`y=9\`. Mọi node có thể thấy thứ tự \`[x=1, y=9, x=2]\` hoặc \`[y=9, x=1, x=2]\` — miễn \`x=1\` luôn trước \`x=2\`. Khác strong ở chỗ: không cần khớp đồng hồ thật.

**Use case:** ít dùng trực tiếp; là nền lý thuyết.

### 5.3 Causal

**Là gì:** chỉ đảm bảo thứ tự cho các sự kiện *có quan hệ nhân quả* (cái này gây ra cái kia). Sự kiện không liên quan (concurrent) có thể thấy theo thứ tự khác nhau ở các node.

**Ví dụ số:** Bình comment "Trời đẹp" (event e1). An *trả lời* "Đúng vậy!" (event e2, nhân quả phụ thuộc e1). Causal consistency đảm bảo *không ai* thấy "Đúng vậy!" trước khi thấy "Trời đẹp". Nhưng nếu Châu cũng comment độc lập "Xin chào" (e3, concurrent với e1) thì thứ tự e3 vs e1 có thể khác nhau giữa các người xem — không sao.

**Use case:** mạng xã hội (comment/reply), chat — đủ mạnh để không thấy "reply trước câu gốc", đủ rẻ để scale.

### 5.4 Eventual (yếu nhất)

**Là gì:** nếu ngừng ghi, *sau cùng* mọi replica sẽ hội tụ về cùng giá trị. Không hứa hẹn *khi nào*, cũng không cấm read thấy giá trị cũ trong lúc chờ.

**Ví dụ số:** A ghi \`x=5\`. B đọc ngay có thể thấy \`x=3\` (cũ), 200 ms sau đọc lại thấy \`x=5\`. Có thể tạm thấy giá trị nhảy lung tung trước khi ổn định.

**Use case:** DNS, đếm view/like, giỏ hàng (cart), CDN cache. **Lợi:** nhanh nhất, sẵn sàng nhất.

| Model | Read thấy write mới nhất? | Thứ tự | Tốc độ | Use case tiêu biểu |
|-------|---------------------------|--------|--------|--------------------|
| Strong/Linearizable | Luôn luôn | Khớp thời gian thực | Chậm nhất | Số dư, lock |
| Sequential | Cùng thứ tự ở mọi node | Tôn trọng thứ tự mỗi process | Trung bình | Lý thuyết |
| Causal | Chỉ với sự kiện nhân quả | Causal được giữ | Nhanh | Chat, comment |
| Eventual | Không đảm bảo | Không đảm bảo | Nhanh nhất | DNS, đếm like |

### 5.5 Cùng một dòng sự kiện, bốn model thấy khác nhau

Để cảm nhận sự khác biệt, xét chuỗi: A ghi \`x=1\`, A ghi \`x=2\`, B (độc lập) ghi \`y=9\`, rồi một client đọc \`x\` ngay sau khi B ghi xong.

| Model | Client đọc \`x\` có thể thấy | Vì sao |
|-------|----------------------------|--------|
| **Strong** | chỉ \`2\` | Mọi read sau write \`x=2\` *bắt buộc* thấy \`2\`, không bao giờ thấy \`1\` hay rỗng. |
| **Sequential** | \`2\` (và mọi node đồng ý thứ tự \`x=1,x=2,y=9\` nào đó) | Thứ tự \`x=1\` trước \`x=2\` được giữ ở mọi node, nhưng vị trí \`y=9\` có thể chèn bất kỳ đâu. |
| **Causal** | \`1\` hoặc \`2\` tùy node, nhưng không bao giờ thấy \`x=2\` mà *chưa* thấy \`x=1\` | \`x=2\` nhân quả sau \`x=1\`; \`y=9\` concurrent nên thứ tự tự do. |
| **Eventual** | \`rỗng\`, \`1\`, hoặc \`2\` (bất kỳ) trong lúc chưa hội tụ | Không hứa gì về thời điểm; chỉ hứa *sau cùng* hội tụ về \`2\`. |

Đọc bảng từ trên xuống: ràng buộc *nới dần*, tập giá trị client có thể thấy *rộng dần* — đó chính là cái giá đổi lấy tốc độ.

> ⚠ **Lỗi thường gặp.** Mặc định dùng strong consistency "cho chắc". Hậu quả: mọi đọc đều qua quorum → latency tăng, throughput giảm, hệ dễ sập khi 1 node chậm. Hãy chọn mức *yếu nhất đủ dùng* cho từng loại dữ liệu.

> 🔁 **Dừng lại tự kiểm tra.** Một hệ chat: tin nhắn của tôi hiện ra với người khác *sau* tin tôi đang trả lời. Đang dùng model nào, sai chỗ nào?
> <details><summary>Đáp án</summary>Đang dưới mức causal (eventual thuần). "Reply" có quan hệ nhân quả với "câu gốc" mà lại hiện trước → vi phạm causality. Cần ít nhất causal consistency để đảm bảo thứ tự nhân quả của tin nhắn trong cùng cuộc hội thoại.</details>

> 📝 **Tóm tắt mục 5.** Consistency là phổ: strong → sequential → causal → eventual, mạnh dần xuống yếu. Mạnh dễ code nhưng chậm/đắt. Quy tắc: chọn mức *yếu nhất đủ đúng* cho từng dữ liệu, không mặc định strong toàn bộ.

---

## 6. FLP Impossibility

> 💡 **Trực giác.** Ba người mù ở ba phòng kín, chỉ nhắn giấy qua khe cửa (không biết nhắn có tới không, tới khi nào). Họ phải *thống nhất* một con số. Nếu một người im lặng mãi, hai người kia *không thể phân biệt* "anh ta đang nghĩ chậm" với "anh ta đã chết". Vì không phân biệt được, họ không bao giờ dám chốt — vì chốt mà người kia còn sống và chốt khác thì sai.

FLP (Fischer, Lynch, Paterson — 1985) là một định lý *bất khả thi* nổi tiếng:

> Trong một hệ phân tán **bất đồng bộ (asynchronous)** — nơi không có cận trên cho độ trễ tin nhắn và tốc độ xử lý — **không có** thuật toán nào đảm bảo đạt được **consensus** (mọi node đồng ý một giá trị) nếu **dù chỉ một** node có thể fail.

Lý do cốt lõi: trong mạng async, **không thể phân biệt** một node *chậm* với một node *đã chết*. Chờ mãi (an toàn) thì có thể treo vĩnh viễn; chốt sớm (sống) thì có thể sai.

### 6.1 Ý nghĩa thực tế — vì sao Raft/Paxos vẫn chạy?

FLP nói *không thể đảm bảo cả ba*: an toàn (safety), sống (liveness), chịu lỗi — trong mạng async hoàn hảo. Thực tế lách bằng cách **nới một giả định**:

- **Thêm timeout** (partial synchrony): giả định "nếu một node không trả lời trong T giây, *coi như* chết". Đây là cách Raft, Paxos hoạt động. Đánh đổi: thỉnh thoảng *đoán nhầm* node chậm là chết → bầu lại leader (tốn thời gian) nhưng *không sai dữ liệu*.
- **Dùng randomization**: thuật toán xác suất đạt consensus với xác suất → 1.

> ❓ **Câu hỏi tự nhiên.** *"Vậy FLP có nghĩa consensus là vô vọng?"* — Không. FLP nói không thể *đảm bảo tuyệt đối* trong mô hình async thuần. Thực tế dùng timeout để biến nó thành *partial synchrony*, nơi consensus đạt được với xác suất cực cao. FLP dạy ta *vì sao* mọi hệ consensus đều có timeout và đôi khi phải bầu lại leader.

> 📝 **Tóm tắt mục 6.** FLP: trong mạng async + 1 node có thể fail, không thuật toán nào *đảm bảo* consensus, vì không phân biệt được "chậm" và "chết". Thực tế lách bằng timeout (partial synchrony) — chấp nhận đôi khi đoán nhầm và bầu lại, đổi lấy việc không bao giờ sai dữ liệu.

---

## 7. Eventual Consistency & Conflict Resolution

Khi chọn AP (mục 3), nhiều replica có thể nhận write *đồng thời* khi partition. Lúc nối lại, chúng *xung đột*. Phải có chiến lược **hội tụ (convergence)**.

### 7.1 LWW — Last-Write-Wins

**Là gì:** mỗi write gắn timestamp; khi conflict, giữ giá trị có timestamp lớn nhất, vứt cái cũ.

**Ví dụ số:** Replica1 ghi \`name="Alice"\` @ ts=100. Replica2 ghi \`name="Alicia"\` @ ts=105. Nối lại → giữ \`name="Alicia"\` (105 > 100). Đơn giản, nhưng **mất** update của Replica1.

> ⚠ **Lỗi thường gặp.** LWW dựa vào đồng hồ tường (wall clock) — mà đồng hồ các máy *lệch nhau* (mục 11). Nếu đồng hồ Replica1 chạy nhanh 200 ms, update *cũ hơn về logic* lại có ts lớn hơn → ghi đè sai. LWW chỉ an toàn khi mất mát update là chấp nhận được.

### 7.2 Vector clock

Theo dõi *quan hệ nhân quả* thay vì wall clock. Phát hiện được hai update là **concurrent** (xung đột thật, cần con người/logic resolve) hay một cái *xảy ra trước* cái kia (chỉ việc giữ cái sau). Chi tiết ở mục 8.

### 7.3 CRDT — Conflict-free Replicated Data Type

**Là gì:** cấu trúc dữ liệu *thiết kế sao cho merge luôn tự động đúng*, không cần phối hợp. Ví dụ kinh điển: **G-Counter** (grow-only counter) — mỗi node giữ một mảng đếm riêng, giá trị = tổng; merge = lấy max từng phần tử.

**Ví dụ số (G-Counter, 3 node):**
- Node A đếm \`[2,0,0]\`, Node B \`[0,3,0]\`, Node C \`[0,0,1]\`.
- Merge (max từng vị trí) → \`[2,3,1]\` → tổng = **6**. Không bao giờ mất count, không cần khóa.

**Use case:** đếm like, shopping cart (OR-Set), collaborative editor (Yjs/Automerge). **Lợi:** merge *giao hoán, kết hợp, lũy đẳng* → luôn hội tụ bất kể thứ tự.

**Vì sao merge luôn đúng?** Ba tính chất của phép \`max\` từng phần tử (lấy ví dụ G-Counter trên):
- *Giao hoán (commutative):* \`merge(a,b) = merge(b,a)\` — A merge B trước hay B merge A trước đều cho \`[2,3,1]\`. → thứ tự tin nhắn không quan trọng.
- *Kết hợp (associative):* \`merge(merge(a,b),c) = merge(a,merge(b,c))\` — gom theo cụm nào cũng ra \`[2,3,1]\`. → gộp từng phần hay gộp một lần đều đúng.
- *Lũy đẳng (idempotent):* \`merge(a,a) = a\` — nhận lại cùng một state hai lần không làm sai. → at-least-once delivery vẫn an toàn (liên hệ mục 10).

Ba tính chất này khiến CRDT *không cần* phối hợp/khóa: mọi replica áp dụng cùng các update theo *bất kỳ* thứ tự, *bất kỳ* số lần → vẫn hội tụ về cùng kết quả.

> 📝 **Tóm tắt mục 7.** Khi AP có xung đột, ba cách resolve: (1) **LWW** — đơn giản, dựa timestamp, có thể mất update & nhạy clock skew. (2) **Vector clock** — phát hiện concurrent vs causal, cần logic resolve concurrent. (3) **CRDT** — merge tự động luôn đúng, không cần phối hợp, nhưng giới hạn ở các kiểu dữ liệu thiết kế sẵn.

---

## 8. Vector Clock — theo dõi nhân quả

> 💡 **Trực giác.** Mỗi node giữ một "đồng hồ" là *vector* đếm số sự kiện nó *đã biết* từ mỗi node. Khi nhận tin từ người khác, nó "học" được những gì người kia biết bằng cách lấy max. So sánh hai vector cho biết sự kiện nào xảy ra *trước*, hay chúng *đồng thời*.

### 8.1 Ba luật

Với N node, mỗi node giữ vector \`V\` độ dài N (khởi tạo toàn 0):

1. **Local event / send:** node \`i\` tăng \`V[i]\` lên 1.
2. **Send:** đính kèm bản sao \`V\` vào tin nhắn.
3. **Receive:** node \`j\` nhận vector \`Vm\` → \`V[k] = max(V[k], Vm[k])\` cho mọi k, rồi tăng \`V[j]\` lên 1.

**So sánh hai vector** Va, Vb:
- \`Va < Vb\` (Va happens-before Vb) nếu mọi \`Va[k] ≤ Vb[k]\` **và** có ít nhất một \`Va[k] < Vb[k]\`.
- **Concurrent** (\`Va || Vb\`) nếu không cái nào ≤ cái kia (mỗi cái lớn hơn ở ít nhất một vị trí).

### 8.2 Walk-through với 3 node (A, B, C → vị trí 0,1,2)

| Bước | Hành động | Vector A | Vector B | Vector C |
|------|-----------|----------|----------|----------|
| 0 | Khởi tạo | \`[0,0,0]\` | \`[0,0,0]\` | \`[0,0,0]\` |
| 1 | A: local event e1 | \`[1,0,0]\` | \`[0,0,0]\` | \`[0,0,0]\` |
| 2 | A gửi msg→B (kèm \`[1,0,0]\`) | \`[1,0,0]\` | — | — |
| 3 | B nhận: max rồi B[1]++ | \`[1,0,0]\` | \`[1,1,0]\` | \`[0,0,0]\` |
| 4 | C: local event e3 | \`[1,0,0]\` | \`[1,1,0]\` | \`[0,0,1]\` |
| 5 | B gửi msg→C (kèm \`[1,1,0]\`) | \`[1,0,0]\` | \`[1,1,0]\` | — |
| 6 | C nhận: max(\`[0,0,1]\`,\`[1,1,0]\`)=\`[1,1,1]\` rồi C[2]++ | \`[1,0,0]\` | \`[1,1,0]\` | \`[1,1,2]\` |

**Phân tích quan hệ:**
- e1 của A \`[1,0,0]\` vs event ở B sau bước 3 \`[1,1,0]\`: \`[1,0,0] < [1,1,0]\` (mọi phần tử ≤, có 1 phần tử <) → **e1 happens-before** sự kiện B. Đúng — vì B nhận tin từ A.
- e3 của C \`[0,0,1]\` (bước 4) vs e1 của A \`[1,0,0]\`: A có A[0]=1>0, C có C[2]=1>0 → không cái nào ≤ cái kia → **concurrent**. Đúng — e1 và e3 xảy ra độc lập, chưa node nào biết về node kia.

> ❓ **Câu hỏi tự nhiên.** *"Vector clock có nhược điểm gì?"* — Kích thước vector tăng theo số node. Với hàng nghìn node (hoặc client) thì vector phình to. Giải pháp thực tế: dotted version vector, hoặc giới hạn ở số node ổn định (replica), không phải mọi client.

> 🔁 **Dừng lại tự kiểm tra.** Va=\`[2,1,0]\`, Vb=\`[1,2,0]\`. Quan hệ?
> <details><summary>Đáp án</summary>Va[0]=2>1=Vb[0] nhưng Va[1]=1<2=Vb[1]. Mỗi cái lớn hơn ở một vị trí → **concurrent** (\`Va || Vb\`). Đây là xung đột thật, cần resolve (LWW/CRDT/logic).</details>

### 8.3 Bốn ví dụ so sánh nhanh (luyện tay)

Tự xác định quan hệ trước khi đọc cột cuối:

| Va | Vb | Quan hệ | Giải thích |
|----|----|---------|------------|
| \`[1,0,0]\` | \`[1,1,0]\` | \`Va → Vb\` (before) | mọi phần tử ≤, có \`Va[1]=0<1\` |
| \`[2,1,0]\` | \`[1,2,0]\` | concurrent | \`Va[0]>Vb[0]\` nhưng \`Va[1]<Vb[1]\` |
| \`[3,2,1]\` | \`[3,2,1]\` | equal | giống hệt |
| \`[0,0,2]\` | \`[1,0,2]\` | \`Va → Vb\` (before) | chỉ khác ở vị trí 0, \`Va[0]<Vb[0]\` |

> 📝 **Tóm tắt mục 8.** Vector clock = vector đếm sự kiện đã biết từ mỗi node. Send: tăng phần tử của mình. Receive: max rồi tăng. So sánh: \`≤ toàn bộ và < ít nhất 1\` → happens-before; không so sánh được → concurrent. Phát hiện được *xung đột thật* mà wall-clock LWW không thấy.

---

## 9. Idempotency

> 💡 **Trực giác.** Bấm nút thang máy 5 lần vẫn chỉ gọi *một* thang — đó là idempotent. Bấm nút "thanh toán" 5 lần mà bị trừ tiền 5 lần — *không* idempotent, thảm họa.

**Định nghĩa:** một operation là **idempotent** nếu thực hiện nó *nhiều lần* cho **cùng kết quả** như thực hiện *một lần*. Về hệ thống: \`f(f(x)) == f(x)\`.

### 9.1 Vì sao sống còn trong distributed?

Vì fallacy #1: request có thể *gửi đi nhưng response mất*. Client không biết server đã xử lý chưa → **retry**. Nếu operation không idempotent, retry = làm hai lần.

**Ví dụ số:**
- \`SET balance = 100\` — **idempotent**. Chạy 1 lần hay 3 lần, balance vẫn = 100. ✓
- \`balance = balance + 50\` — **KHÔNG** idempotent. Retry 3 lần → +150 thay vì +50. ✗
- \`DELETE user 42\` — **idempotent** (xóa rồi xóa lại vẫn là "không tồn tại"). ✓
- \`INSERT order\` (auto-increment id) — **KHÔNG** idempotent → tạo 3 đơn trùng. ✗

### 9.2 Idempotency key

Cách phổ biến nhất để biến một operation *vốn không idempotent* thành idempotent: client sinh một **key duy nhất** (UUID) cho *ý định* (intent) và gửi kèm. Server lưu key đã xử lý:

\`\`\`
1. Client sinh key = "a1b2-c3d4" cho lần thanh toán này.
2. Gửi POST /payments với header Idempotency-Key: a1b2-c3d4.
3. Server: đã thấy key này chưa?
   - Chưa: xử lý (trừ tiền), lưu (key → kết quả), trả kết quả.
   - Rồi: KHÔNG xử lý lại, trả lại kết quả đã lưu.
4. Client timeout → retry CÙNG key → server nhận ra → không trừ tiền lần 2.
\`\`\`

Stripe, PayPal đều dùng cơ chế này. Xem cài đặt trong [solutions.go](./solutions.go) (\`IdempotencyStore\`).

> ⚠ **Lỗi thường gặp.** Sinh key *mới* cho mỗi lần retry → server thấy key lạ → xử lý lại → double-charge. Key phải gắn với *ý định*, sinh **một lần** ở client trước vòng retry, dùng *cùng key* cho mọi lần thử.

### 9.3 Bốn ví dụ phân loại idempotent / không

| Operation | Idempotent? | Lý do |
|-----------|:-----------:|-------|
| \`PUT /user/42 {name:"An"}\` | ✓ | Đặt trạng thái tuyệt đối; lặp lại cho cùng kết quả. |
| \`POST /user {name:"An"}\` (auto-id) | ✗ | Mỗi lần tạo một id mới → trùng user. |
| \`DELETE /user/42\` | ✓ | Sau lần đầu, "không tồn tại"; lặp lại vẫn "không tồn tại". |
| \`PATCH /counter {op:"+1"}\` | ✗ | Cộng dồn; 3 lần → +3 thay vì +1. |

Quy tắc nhớ: thao tác *gán trạng thái tuyệt đối* (PUT, SET, DELETE) thường idempotent; thao tác *tương đối / sinh mới* (\`+=\`, POST tạo, INSERT) thì không — cần idempotency key.

> 📝 **Tóm tắt mục 9.** Idempotent = làm nhiều lần như làm một lần. Cần thiết vì retry là không thể tránh (response có thể mất). \`SET\`/\`DELETE\` thường idempotent; \`+=\`/\`INSERT\` thì không. Biến non-idempotent thành idempotent bằng idempotency key sinh *một lần*, dùng lại qua mọi retry.

---

## 10. Ảo tưởng "Exactly-once"

Nhiều người mơ "exactly-once delivery" (mỗi tin nhắn xử lý đúng một lần). Sự thật phũ phàng: **exactly-once *delivery* là bất khả thi** trong mạng không đáng tin, vì cùng lý do FLP — bạn không biết tin đã tới chưa.

Chỉ có hai đảm bảo *delivery* thật:

- **At-most-once**: gửi và quên. Có thể *mất* tin (không bao giờ trùng). Dùng cho metric không quan trọng.
- **At-least-once**: retry tới khi có ack. Không bao giờ mất, nhưng có thể *trùng*. Phổ biến nhất.

**"Exactly-once" thực ra = at-least-once *processing* + idempotency.** Bạn *chấp nhận* tin tới nhiều lần (at-least-once), nhưng nhờ idempotent (mục 9) nên *xử lý* chỉ tạo hiệu ứng một lần.

**Ví dụ số:** Kafka gửi message \`order-123\` hai lần do retry. Consumer dùng order id làm idempotency key → lần 2 thấy đã xử lý → bỏ qua. *Hiệu ứng* = exactly-once dù *delivery* = at-least-once.

> ❓ **Câu hỏi tự nhiên.** *"Kafka quảng cáo exactly-once mà?"* — Kafka exactly-once là *exactly-once semantics* trong phạm vi nội bộ Kafka (transaction giữa topic), dựa trên idempotent producer + transaction — chính là at-least-once + dedup. Khi ra khỏi Kafka (ghi DB ngoài, gọi API ngoài), bạn vẫn phải tự idempotent.

> 📝 **Tóm tắt mục 10.** Exactly-once *delivery* là ảo tưởng. Thực tế: at-most-once (có thể mất) hoặc at-least-once (có thể trùng). "Exactly-once" đúng nghĩa = at-least-once + xử lý idempotent → hiệu ứng đúng một lần.

---

## 11. Thời gian trong hệ phân tán

> 💡 **Trực giác.** Trong một máy, \`time.Now()\` là một sự thật duy nhất. Trên nhiều máy, *mỗi máy có đồng hồ riêng và chúng lệch nhau*. Không có "bây giờ" chung. Dựa vào đồng hồ tường để sắp thứ tự sự kiện giữa các máy là cái bẫy chết người.

### 11.1 Không có global clock — NTP drift

Đồng hồ vật lý (quartz) trôi (drift) ~vài chục ppm — vài ms tới vài chục ms mỗi ngày. **NTP** (Network Time Protocol) đồng bộ về một nguồn chuẩn nhưng:
- Độ chính xác NTP qua internet: ~10–100 ms (sai số do latency mạng).
- Đồng hồ có thể *nhảy lùi* khi NTP chỉnh → \`t2 < t1\` dù t2 đo *sau* t1.

**Ví dụ số:** Server A (clock nhanh 50 ms) ghi event lúc nó nghĩ là 10:00:00.050. Server B (clock chuẩn) ghi event *thực sự sau đó* lúc 10:00:00.030. So timestamp → A > B → kết luận sai rằng event A *sau* event B. Đây là gốc của bug LWW (mục 7.1).

### 11.2 Logical clock — Lamport timestamp

Bỏ wall clock, dùng *bộ đếm logic* để sắp thứ tự:
1. Mỗi node giữ một số đếm \`L\` (khởi tạo 0).
2. Trước mỗi event: \`L++\`.
3. Gửi msg: đính kèm \`L\`.
4. Nhận msg với \`Lm\`: \`L = max(L, Lm) + 1\`.

Đảm bảo: nếu a happens-before b thì \`L(a) < L(b)\`. (Chiều ngược lại *không* đảm bảo — \`L(a) < L(b)\` không suy ra happens-before; đó là lý do vector clock ra đời, mục 8.)

**Ví dụ số:** A có L=3 gửi msg tới B (B đang L=1). B nhận: \`L = max(1,3)+1 = 4\`. Giờ event tiếp ở B có L=4 > 3 → phản ánh đúng nó *sau* event gửi của A.

**Walk-through đầy đủ (2 node):**

| Bước | Hành động | L(A) | L(B) |
|------|-----------|:----:|:----:|
| 0 | khởi tạo | 0 | 0 |
| 1 | A: event a1 (L++) | 1 | 0 |
| 2 | A: event a2 (L++) | 2 | 0 |
| 3 | B: event b1 (L++) | 2 | 1 |
| 4 | A gửi msg→B kèm L=3 (A: L++ trước gửi) | 3 | 1 |
| 5 | B nhận: L=max(1,3)+1=4 | 3 | 4 |

Kiểm tra: a2 (L=2) happens-before sự kiện nhận của B (L=4) → \`2 < 4\` ✓. Nhưng b1 (L=1) và a1 (L=1) *cùng* L=1 dù concurrent — đây là điểm Lamport *không* phân biệt được concurrent (cần vector clock).

### 11.3 Hybrid Logical Clock (HLC)

Kết hợp: dùng phần wall-clock (để timestamp *gần* thời gian thật, con người đọc được) + phần logical (để *luôn tăng đơn điệu*, không nhảy lùi khi NTP chỉnh). Dùng trong CockroachDB, MongoDB. Cho timestamp vừa *có nghĩa thời gian*, vừa *bảo toàn nhân quả*.

> ⚠ **Lỗi thường gặp.** \`if event.Timestamp > lastSeen { ... }\` với timestamp là wall-clock từ máy khác → sai khi clock skew. Dùng logical/vector/HLC cho thứ tự *giữa các máy*; wall-clock chỉ dùng cho hiển thị, không cho logic thứ tự.

> 📝 **Tóm tắt mục 11.** Không có "bây giờ" chung; clock các máy lệch (NTP ~10–100 ms, có thể nhảy lùi). Đừng dùng wall-clock để sắp thứ tự sự kiện giữa máy. Dùng Lamport (1 chiều: hb ⟹ L tăng), vector clock (2 chiều, phát hiện concurrent), hoặc HLC (vừa có nghĩa thời gian vừa đơn điệu).

---

## 12. Quorum — đọc/ghi đa số

> 💡 **Trực giác.** N người giữ N bản sao một con số. Để chắc chắn read thấy write mới nhất *mà không cần hỏi tất cả*, ta yêu cầu: ghi phải báo cho *đủ nhiều* người (W), đọc phải hỏi *đủ nhiều* người (R), sao cho **hai tập này chắc chắn giao nhau** ít nhất một người. Người ở giao điểm đó vừa biết write mới nhất vừa nằm trong tập đọc → đảm bảo đọc thấy.

**Quy tắc strong consistency:** với N replica, write tới W node, read từ R node:

> **R + W > N** (đảm bảo tập read & write giao nhau)
> Thường kèm **W > N/2** để tránh hai write song song cùng "thắng" (split-brain ghi).

### 12.1 Ví dụ số

| N | W | R | R+W>N? | W>N/2? | Kết luận |
|---|---|---|--------|--------|----------|
| 3 | 2 | 2 | 4>3 ✓ | 2>1.5 ✓ | **Strong**, chịu được 1 node chết |
| 5 | 3 | 3 | 6>5 ✓ | 3>2.5 ✓ | **Strong**, chịu được 2 node chết |
| 3 | 1 | 1 | 2>3 ✗ | — | Eventual (nhanh, không đảm bảo đọc mới) |
| 5 | 5 | 1 | 6>5 ✓ | — | Strong read nhanh, write chậm & kém chịu lỗi |
| 5 | 1 | 5 | 6>5 ✓ | — | Strong, write nhanh, read chậm |

**Walk-through N=3, W=2, R=2:** Ghi \`x=9\` tới node {1,2} (W=2). Sau đó đọc từ node {2,3} (R=2). Tập write {1,2} ∩ tập read {2,3} = {2} ≠ ∅ → node 2 có \`x=9\` → read *chắc chắn* thấy giá trị mới (lấy bản có version cao nhất trong R node). ✓

> ❓ **Câu hỏi tự nhiên.** *"Sao không luôn W=R=N cho chắc?"* — Vì W=N nghĩa là *một* node chết là không ghi được nữa (mất availability). Quorum cho phép cân bằng: W=R=⌈(N+1)/2⌉ là điểm cân bằng phổ biến (N=3→2, N=5→3), chịu được ⌊(N-1)/2⌋ node chết mà vẫn strong.

> 🔁 **Dừng lại tự kiểm tra.** N=4, muốn strong consistency và chịu lỗi tốt nhất, chọn W, R?
> <details><summary>Đáp án</summary>Cần R+W>4. Cân bằng: W=3, R=2 (hoặc W=2,R=3). Với W=3 chịu được 1 node chết khi ghi; R=2 chịu được 2 node chết khi đọc. Lưu ý N chẵn kém hơn N lẻ về tỷ lệ chịu lỗi — đó là vì sao quorum thường dùng số lẻ (3,5,7).</details>

> 📝 **Tóm tắt mục 12.** Quorum: R+W>N đảm bảo tập đọc & ghi giao nhau → strong consistency mà không cần hỏi tất cả. Kèm W>N/2 chống write conflict. Dùng số node lẻ. Chỉnh W,R để đánh đổi tốc độ đọc vs ghi vs khả năng chịu lỗi.

---

## 13. Split-brain

> 💡 **Trực giác.** Một cặp song sinh điều hành chung công ty. Mất liên lạc (đi hai nước), *mỗi người* tưởng người kia đã nghỉ nên *tự xưng giám đốc*, ra hai quyết định mâu thuẫn. Khi gặp lại — hỗn loạn. Đó là split-brain.

**Định nghĩa:** khi partition chia cụm thành hai (hoặc nhiều) nửa, **mỗi nửa tự cho mình là primary/leader** và tiếp tục nhận write độc lập. Khi nối lại, hai dòng dữ liệu mâu thuẫn — có thể mất dữ liệu hoặc corrupt.

### 13.1 Ví dụ số

Cụm 4 node {A,B | C,D}. Partition cắt làm hai nửa 2-2. A tự xưng leader (nửa trái), C tự xưng leader (nửa phải). Client X ghi qua A \`balance=100\`, client Y ghi qua C \`balance=200\`. Nối lại → hai giá trị, không biết cái nào đúng.

### 13.2 Hai cách chặn

**(a) Quorum — chỉ phe đa số được làm leader.** Yêu cầu leader phải có *quá bán* node (> N/2). Cụm 4 chia 2-2 → *không* nửa nào có quá bán (2 không > 2) → cả hai *dừng nhận write* → không split-brain (nhưng mất availability). Đây là vì sao dùng *số lẻ*: cụm 5 chia 3-2 → nửa 3 là majority, tiếp tục; nửa 2 dừng. Có đúng một leader.

**(b) Fencing token — số tăng đơn điệu chặn kẻ "zombie".** Mỗi lần bầu leader, cấp một token tăng dần (1, 2, 3...). Resource (vd storage) chỉ chấp nhận lệnh kèm token *≥ token lớn nhất từng thấy*. Leader cũ (token cũ) bị "fence" ra khỏi cuộc chơi dù nó tưởng mình còn quyền.

**Ví dụ số fencing:** Leader cũ có token=5, bị treo (GC pause dài). Cụm tưởng nó chết → bầu leader mới token=6. Leader cũ tỉnh dậy, gửi write kèm token=5 tới storage. Storage đã thấy token=6 → *từ chối* token=5 → leader zombie không gây hại. ✓

### 13.3 Timeline fencing token (vì sao zombie không gây hại)

| Thời điểm | Sự kiện | Token storage chấp nhận |
|-----------|---------|:-----------------------:|
| t0 | Leader L1 được bầu, cấp token=5 | ≥ 5 |
| t1 | L1 ghi \`set x=1\` kèm token=5 → OK | ghi nhận token=5 |
| t2 | L1 bị GC pause 10s (cụm tưởng chết) | — |
| t3 | Bầu L2, cấp token=6; L2 ghi \`set x=2\` token=6 → OK | storage nâng lên ≥ 6 |
| t4 | L1 tỉnh dậy, *vẫn tưởng mình là leader*, ghi \`set x=99\` token=5 | **TỪ CHỐI** (5 < 6) |

L1 là "zombie leader" nhưng write của nó bị fence vì token cũ. Không có fencing, write \`x=99\` của L1 sẽ ghi đè \`x=2\` → mất dữ liệu của L2.

> ⚠ **Lỗi thường gặp.** Dùng số node *chẵn* cho cụm consensus → khi chia đôi không phe nào có majority → toàn cụm kẹt. Luôn dùng 3, 5, 7 node.

> 🔁 **Dừng lại tự kiểm tra.** Cụm 3 node, 1 node bị cô lập khỏi 2 node kia. Node cô lập có được tiếp tục làm leader không?
> <details><summary>Đáp án</summary>Không. Nó chỉ có 1/3 < majority (cần ≥2). Nó phải lùi xuống follower / ngừng nhận write. Hai node còn lại (2/3, là majority) bầu hoặc giữ leader và tiếp tục. Đúng một leader → không split-brain.</details>

> 📝 **Tóm tắt mục 13.** Split-brain = partition khiến nhiều nửa cùng tưởng mình là leader, ghi mâu thuẫn. Chặn bằng: (1) **quorum** — chỉ phe majority (>N/2) được làm leader, dùng số node lẻ; (2) **fencing token** — số tăng đơn điệu để storage từ chối leader cũ zombie.

---

## 14. Failure detection (phát hiện lỗi)

> 💡 **Trực giác.** Làm sao biết một node đã chết? Bạn *không thể* biết chắc (FLP — không phân biệt chậm với chết). Chỉ có thể *đoán* dựa trên "nó im lặng quá lâu".

### 14.1 Heartbeat

Mỗi node gửi "tôi còn sống" (heartbeat) định kỳ (vd mỗi 1s). Nếu T giây (vd 3s) không nghe → coi như chết.

**Ví dụ số:** heartbeat mỗi 1s, timeout 3s. Node mạng chậm đột biến, heartbeat trễ 3.5s (network jitter, GC pause) → bị *coi như chết* dù vẫn sống. Đây là **false positive** (báo chết nhầm).

> ⚠ **Lỗi thường gặp & đánh đổi.** Timeout *ngắn* → phát hiện nhanh nhưng nhiều false positive (báo chết node chỉ đang chậm → bầu lại leader liên tục, "flapping"). Timeout *dài* → ít false positive nhưng chậm phát hiện node chết thật (downtime lâu). Không có giá trị hoàn hảo.

### 14.2 Phi-accrual failure detector

Thay vì quyết định nhị phân chết/sống, **phi (φ-accrual)** xuất ra một *con số nghi ngờ* φ tăng dần theo thời gian từ heartbeat cuối, *thích nghi* theo phân phối thống kê của các heartbeat trước. Ứng dụng tự đặt ngưỡng φ (vd φ>8 mới coi là chết). Dùng trong Cassandra, Akka.

**Lợi:** mạng thường jitter → φ-accrual *học* được "node này heartbeat hay trễ" và không vội báo chết, giảm false positive so với timeout cứng.

> ❓ **Câu hỏi tự nhiên.** *"Sao false positive lại nguy hiểm?"* — Báo chết nhầm một node đang sống → cụm bầu lại leader / chuyển tải / đánh dấu data unavailable một cách không cần thiết → gây gián đoạn thật từ một sự cố không có thật. Đặc biệt nguy với leader: false positive → bầu leader mới → có lúc hai leader (split-brain) nếu không có fencing.

> 📝 **Tóm tắt mục 14.** Không thể biết chắc node chết (FLP) — chỉ đoán qua "im lặng quá lâu". Heartbeat + timeout: ngắn → nhanh nhưng false positive; dài → ít nhầm nhưng chậm. φ-accrual cho mức nghi ngờ liên tục, thích nghi theo jitter, giảm false positive. False positive nguy vì gây gián đoạn từ sự cố không tồn tại.

---

## 15. Những cạm bẫy phổ biến (tổng hợp)

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Giả định network reliable** (fallacy #1) | Mất dữ liệu khi rớt mạng, treo vô hạn | Luôn có timeout, retry, circuit breaker |
| **Không handle partial failure** | Trạng thái nửa vời (trừ tiền nhưng không tạo đơn) | Idempotency + saga/compensation + outbox |
| **Retry không idempotent** | Double-charge, đơn trùng | Idempotency key (mục 9) |
| **Phụ thuộc clock đồng bộ** | Sắp thứ tự sai, LWW ghi đè nhầm | Logical/vector/HLC clock cho thứ tự (mục 11) |
| **Lạm dụng distributed transaction (2PC)** | Khóa lâu, kém chịu lỗi, dễ kẹt khi coordinator chết | Saga + eventual consistency thay vì 2PC (Lesson 66) |
| **Dùng số node chẵn cho quorum** | Chia đôi → kẹt cả cụm | Số lẻ 3/5/7 (mục 13) |
| **Timeout phát hiện lỗi quá ngắn** | Flapping leader, false positive | Tune timeout, dùng φ-accrual (mục 14) |

> 💡 **Nguyên tắc vàng.** *"Design for failure."* Trong distributed, failure không phải ngoại lệ hiếm — nó là **trạng thái thường trực**. Mỗi lời gọi mạng phải trả lời được: nếu nó mất / chậm / trùng / sai thứ tự thì sao?

---

## Bài tập

> Làm thử trước khi xem lời giải. Tất cả lời giải ở mục kế tiếp; code minh họa ở [solutions.go](./solutions.go); tương tác ở [visualization.html](./visualization.html). Gợi ý: BT1 dùng tư duy mục 3, BT2–BT3 dùng mục 8 & 12, BT4–BT5 dùng mục 9 & 7, BT6 dùng mục 13.

**BT1 — CAP classification.** Phân loại 5 hệ thống sau là **CP** hay **AP** (kèm lý do): (a) hệ thống ngân hàng (số dư), (b) news feed mạng xã hội, (c) DNS, (d) shopping cart (giỏ hàng), (e) config store của cụm (như etcd).

**BT2 — Vector clock causality.** Ba node A,B,C (vị trí 0,1,2). Diễn ra: e1 ở A; A gửi msg tới B; e2 ở C (độc lập). Tính vector của từng event và xác định cặp (e1, e2) là *causal* hay *concurrent*.

**BT3 — Quorum design.** N=5 replica. Tìm cặp (W, R) đảm bảo strong consistency *và* tối đa khả năng chịu lỗi cân bằng đọc/ghi. Cụm chịu được tối đa bao nhiêu node chết mà vẫn ghi được?

**BT4 — Idempotent payment API.** Thiết kế (mô tả + pseudo/Go) một API \`POST /charge\` idempotent dùng idempotency key, sao cho client retry không bao giờ bị trừ tiền hai lần.

**BT5 — LWW conflict.** Hai replica nhận hai update concurrent cho cùng key \`profile.name\`: R1 ghi \`"An"\` @ ts=1690000100, R2 ghi \`"Ann"\` @ ts=1690000098. Resolve bằng LWW. Chỉ ra rủi ro nếu đồng hồ R1 chạy nhanh.

**BT6 — Diagnose split-brain.** Cụm 4 node {A,B,C,D} dùng "node nào có nhiều kết nối nhất thì làm leader". Partition cắt thành {A,B} và {C,D}. Mô tả sự cố xảy ra và sửa bằng quorum.

---

## Lời giải chi tiết

### BT1 — CAP classification

| Hệ thống | Phân loại | Lý do |
|----------|-----------|-------|
| (a) Số dư ngân hàng | **CP** | Không bao giờ được trả số dư sai/cũ. Thà từ chối giao dịch (mất A) còn hơn cho rút quá số dư thật (mất C). Hậu quả tài chính. |
| (b) News feed | **AP** | Thấy feed trễ vài giây hoàn toàn ổn. Ưu tiên luôn load được (A) hơn là đúng tuyệt đối tức thời. |
| (c) DNS | **AP** | Resolver trả bản cache (có thể cũ tới hết TTL). Cực kỳ ưu tiên availability — DNS phải luôn trả lời. |
| (d) Shopping cart | **AP** | Mất availability của cart = mất doanh thu. Conflict (thêm món từ 2 thiết bị khi offline) resolve bằng merge (union các item) — chính là CRDT OR-Set. |
| (e) Config store (etcd) | **CP** | Cấu hình cụm phải nhất quán tuyệt đối — hai node đọc config khác nhau = thảm họa. Phe minority dừng phục vụ (mất A) để giữ C. |

**Cách tiếp cận:** hỏi "trả dữ liệu *cũ/sai* có gây hại nghiêm trọng không?". Có → CP. Không, miễn là luôn trả lời → AP.

### BT2 — Vector clock causality

Áp dụng 3 luật (mục 8):

| Event | Mô tả | Vector (A,B,C) |
|-------|-------|----------------|
| e1 | A local event: A[0]++ | \`[1,0,0]\` |
| (gửi) | A gửi msg→B kèm \`[1,0,0]\` | A vẫn \`[1,0,0]\` |
| (nhận) | B nhận: max(\`[0,0,0]\`,\`[1,0,0]\`)=\`[1,0,0]\`, rồi B[1]++ → \`[1,1,0]\` | B = \`[1,1,0]\` |
| e2 | C local event (độc lập): C[2]++ | \`[0,0,1]\` |

So sánh **e1 \`[1,0,0]\`** vs **e2 \`[0,0,1]\`**:
- e1[0]=1 > 0=e2[0] (e1 lớn hơn ở vị trí 0).
- e2[2]=1 > 0=e1[2] (e2 lớn hơn ở vị trí 2).
- Không cái nào ≤ cái kia toàn bộ → **CONCURRENT** (\`e1 || e2\`).

**Kết luận:** e1 và e2 *đồng thời* (concurrent) — chúng xảy ra độc lập, không node nào biết về sự kiện của node kia tại thời điểm đó. (Ngược lại, event của B sau khi nhận \`[1,1,0]\` *causally after* e1 vì \`[1,0,0] < [1,1,0]\`.)

### BT3 — Quorum design (N=5)

Điều kiện strong: **R + W > 5** và (nên) **W > 2.5 → W ≥ 3**.

Cân bằng đọc/ghi: chọn **W = 3, R = 3** (R+W=6 > 5 ✓, W=3 > 2.5 ✓).

- **Chịu lỗi khi ghi:** cần W=3 node phản hồi → chịu được **5 − 3 = 2 node chết** mà vẫn ghi được.
- **Chịu lỗi khi đọc:** cần R=3 → chịu được 2 node chết khi đọc.
- Đây là cấu hình cân bằng nhất: W=R=⌈(5+1)/2⌉=3.

**Đáp số:** (W=3, R=3), chịu được tối đa **2 node chết** mà vẫn ghi được và vẫn strong. (Nếu muốn ghi nhanh hơn có thể W=2,R=4 nhưng W=2 không > N/2 nên rủi ro hai write song song — kém an toàn; W=3 là lựa chọn đúng.)

### BT4 — Idempotent payment API

\`\`\`go
// POST /charge   Header: Idempotency-Key: <uuid-client-sinh-mot-lan>
func Charge(key string, amount int) (Receipt, error) {
    store.Lock(key)              // khóa theo key để tránh race hai retry song song
    defer store.Unlock(key)

    if r, ok := store.Get(key); ok {
        return r, nil            // đã xử lý → trả lại kết quả cũ, KHÔNG trừ tiền lần 2
    }
    // chưa từng thấy key này → xử lý thật
    if err := bank.Debit(amount); err != nil {
        return Receipt{}, err
    }
    r := Receipt{ID: newID(), Amount: amount, Status: "ok"}
    store.Put(key, r)            // lưu key→kết quả trước khi trả về
    return r, nil
}
\`\`\`

**Các điểm then chốt:**
1. Client sinh key **một lần** cho ý định thanh toán, dùng *cùng* key cho mọi retry (không sinh mới mỗi lần — lỗi mục 9).
2. Server kiểm tra key *trước* khi trừ tiền; đã thấy → trả kết quả cũ.
3. Khóa theo key để hai retry tới đồng thời không cùng vượt qua check (race). Cài đặt đầy đủ: [solutions.go](./solutions.go) \`IdempotencyStore\`.
4. Lưu (key → kết quả) **bền vững** (DB) trước khi trả response, để crash giữa chừng vẫn an toàn.

### BT5 — LWW conflict

R1: \`name="An"\` @ ts=1690000100. R2: \`name="Ann"\` @ ts=1690000098.
LWW giữ ts lớn nhất → 1690000100 > 1690000098 → **giữ \`"An"\`** (của R1), bỏ \`"Ann"\`.

**Rủi ro clock skew:** giả sử *thực tế* R2 ghi *sau* R1, nhưng đồng hồ R1 chạy nhanh 5 giây nên ts của R1 vẫn lớn hơn. LWW sẽ giữ giá trị *cũ về mặt logic* (R1) và **âm thầm vứt** update mới hơn của R2 → mất dữ liệu, không cảnh báo. Đây là lý do LWW chỉ dùng khi (1) mất update chấp nhận được, hoặc (2) có đồng bộ clock chặt (HLC/TrueTime). Nếu cần đúng nhân quả → dùng vector clock để phát hiện concurrent rồi resolve bằng logic (vd merge, hoặc giữ cả hai cho user chọn).

### BT6 — Diagnose split-brain

**Sự cố:** quy tắc "nhiều kết nối nhất làm leader" không có khái niệm *majority*. Khi partition cắt {A,B} | {C,D}: trong nửa {A,B}, một node (vd A) thấy nhiều kết nối nhất *trong nửa của nó* → tự xưng leader. Tương tự C tự xưng leader nửa kia. → **hai leader**, mỗi bên nhận write độc lập → split-brain. Nối lại: hai dòng dữ liệu mâu thuẫn.

**Sửa bằng quorum:**
1. Dùng **số node lẻ** (thêm node E → 5 node) để partition luôn có một phe majority. Với 4 node chia 2-2 thì *không* phe nào majority → cả hai phải dừng (an toàn nhưng mất availability hoàn toàn).
2. Leader **chỉ hợp lệ khi có quá bán** (> N/2) node bầu cho nó. Với 5 node chia 3-2: phe 3 có majority → đúng *một* leader; phe 2 nhận ra mình minority → ngừng nhận write.
3. Thêm **fencing token**: mỗi leader mới có token tăng dần; storage từ chối write từ token cũ → leader zombie (nếu nửa cũ tỉnh lại) không gây hại.

**Kết quả:** luôn có nhiều nhất *một* leader hợp lệ → không còn split-brain. Cái giá: phe minority mất availability (đúng tinh thần CP).

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — cài đặt chạy được: vector clock (increment / merge / so sánh happens-before & concurrent), LWW register, idempotency store (an toàn với retry song song), và quorum check (R+W>N). Chạy: \`go run solutions.go\`.
- **[visualization.html](./visualization.html)** — 3 module tương tác: (1) **CAP explorer** với slider mức độ partition cho thấy trade-off C↔A; (2) **Vector clock** 3 node gửi/nhận event, theo dõi causal vs concurrent; (3) **Quorum visualizer** với slider W/R cho thấy vùng giao đảm bảo strong consistency.

## Bài tiếp theo

→ [Lesson 63 — Service Discovery & Load Balancing](../lesson-63-service-discovery-lb/README.md): khi đã chấp nhận "có nhiều node và chúng đến/đi liên tục" (fallacy #5 topology changes), làm sao client *tìm* được node đang sống và *phân tải* đều — DNS, Consul/etcd, client-side vs server-side LB, health check.

Tham khảo nền tảng: [Tier 5 — Data](../tier-5-data/index.html) · [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/README.md).
`;
