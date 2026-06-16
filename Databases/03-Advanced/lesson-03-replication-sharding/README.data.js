// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/03-Advanced/lesson-03-replication-sharding/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Replication & Sharding

> Nhóm 3 — Nâng cao · Bài thứ ba của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **replication (nhân bản)**: vì sao giữ nhiều bản sao giống hệt nhau của cùng một dữ liệu để tăng độ sẵn sàng (availability) và năng lực đọc.
- Phân biệt mô hình **leader–follower (master–replica)** và nắm luồng ghi → replicate → đọc.
- Hiểu đánh đổi giữa replication **đồng bộ (synchronous)** và **bất đồng bộ (asynchronous)**: độ trễ đổi lấy nguy cơ mất dữ liệu; khái niệm **replication lag (độ trễ nhân bản)** với ví dụ số cụ thể.
- Hiểu **sharding / partitioning (phân mảnh)**: chia dữ liệu thành nhiều phần *khác nhau* đặt trên nhiều máy để **mở rộng ngang (horizontal scaling)**.
- Phân biệt **hash-based** và **range-based partitioning**, nhận diện **hotspot / skew** và biết vì sao **consistent hashing** tránh xáo trộn toàn bộ khi thêm node.
- Phân biệt rạch ròi: **replication = bản sao giống nhau** vs **sharding = chia khác nhau** — và vì sao hệ thật thường **kết hợp cả hai**.

## Kiến thức tiền đề

- [Lesson 01 — Storage Engine](../lesson-01-storage-engine/): hiểu cách một node lưu & ghi dữ liệu (WAL, log), nền tảng để hiểu replicate chính là "phát lại log ghi" sang node khác.
- Hữu ích: [DataStructures — Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) để hiểu hàm băm — gốc rễ của hash partitioning và consistent hashing.

---

## 1. Đặt vấn đề: một máy chủ là không đủ

Bạn có một database chạy trên **một máy duy nhất**. Hai vấn đề ập tới khi hệ thống lớn lên:

> **(A)** Máy đó chết (đứt điện, ổ cứng hỏng) → toàn bộ dịch vụ sập, dữ liệu có nguy cơ mất.
> **(B)** Một máy chỉ có chừng đó RAM, CPU, đĩa. Khi có **500 triệu user** và **100.000 truy vấn/giây**, một máy không gánh nổi — cả về *dung lượng lưu trữ* lẫn *lưu lượng đọc/ghi*.

Hai vấn đề này có hai lời giải khác nhau, và bài này trả lời cụ thể cả hai:

- **(A) → Replication**: giữ nhiều **bản sao giống hệt** trên nhiều máy. Một máy chết, máy khác phục vụ tiếp.
- **(B) → Sharding**: **chia** dữ liệu thành nhiều phần khác nhau, mỗi máy giữ một phần → tổng dung lượng và thông lượng tăng theo số máy.

💡 **Trực giác.** **Replication** giống *photocopy cùng một cuốn sách ra nhiều bản* đặt ở nhiều thư viện: ai cũng đọc được, một bản cháy vẫn còn bản khác. **Sharding** giống *chia một bộ bách khoa 26 tập theo chữ cái* — tập A–C ở kho 1, D–F ở kho 2... Không kho nào chứa cả bộ, nhưng gộp lại là đủ và mỗi kho nhẹ hơn.

---

## 2. Replication (nhân bản)

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** Replication là việc duy trì **nhiều bản sao (replica)** của cùng một tập dữ liệu trên nhiều node khác nhau, sao cho các bản sao *hội tụ về cùng nội dung*.

**(b) Vì sao cần.** Giải hai bài toán: (1) **độ sẵn sàng** — một node chết, node khác phục vụ tiếp, không mất dịch vụ; (2) **mở rộng năng lực đọc (read scaling)** — đọc được phân tán ra nhiều bản sao, mỗi bản gánh một phần lưu lượng đọc. Lưu ý: replication **không** tăng năng lực *ghi* (mọi bản phải nhận cùng lượng ghi) — đó là việc của sharding.

**(c) Bốn ví dụ cụ thể.**
1. PostgreSQL: 1 primary + 2 standby; ứng dụng đọc báo cáo trỏ vào standby để không làm nặng primary.
2. MySQL: 1 master + 3 replica; mỗi replica phục vụ một vùng địa lý để giảm độ trễ đọc.
3. MongoDB **replica set**: 3 node (1 primary, 2 secondary); primary chết thì bầu chọn (election) ra primary mới.
4. Redis: 1 master + 1 replica chỉ-đọc; replica nhận lệnh đọc \`GET\`, master nhận \`SET\`.

### 2.2 Leader–follower (master–replica)

Mô hình phổ biến nhất: **một node là leader** (master/primary), **các node còn lại là follower** (replica/secondary).

- **Mọi lệnh ghi (INSERT/UPDATE/DELETE) chỉ đi vào leader.**
- Leader ghi xong thì **gửi bản ghi thay đổi** (thường là chính WAL — write-ahead log từ [Lesson 01](../lesson-01-storage-engine/)) sang các follower.
- **Lệnh đọc** có thể đi vào leader *hoặc* bất kỳ follower nào.

**Walk-through luồng ghi → replicate → đọc.** Giả sử leader L, hai follower F1, F2. Client ghi \`balance = 500\` cho user #7:

\`\`\`
t=0ms   Client → L:  UPDATE users SET balance=500 WHERE id=7
t=1ms   L ghi vào WAL local: "user#7.balance: 300 → 500", commit. balance(L)=500
t=2ms   L gửi đoạn log đó tới F1 và F2 (qua mạng)
t=8ms   F1 nhận, replay log: balance(F1)=500
t=12ms  F2 nhận, replay log: balance(F2)=500
        → Sau t=12ms, cả 3 node đều thấy balance=500 (đã hội tụ)
\`\`\`

Ai đọc từ L sau t=1ms thấy ngay 500. Ai đọc từ F2 *trong khoảng t=2..12ms* vẫn thấy **300** (giá trị cũ) — đây chính là **replication lag**.

⚠ **Lỗi thường gặp: "đọc-sau-ghi của chính mình" (read-your-own-writes).** User vừa bấm Lưu (ghi vào leader), trang reload đọc từ follower đang lag → thấy dữ liệu cũ, tưởng lưu hỏng. Cách xử lý: với user *vừa ghi*, route lệnh đọc tiếp theo của họ về leader trong vài giây.

### 2.3 Đồng bộ vs bất đồng bộ — đánh đổi cốt lõi

Câu hỏi: leader trả lời "ghi xong" cho client **trước hay sau** khi follower xác nhận đã nhận bản sao?

| | **Synchronous (đồng bộ)** | **Asynchronous (bất đồng bộ)** |
| --- | --- | --- |
| Leader báo "xong" khi | Ít nhất 1 follower đã xác nhận ghi | Ngay khi leader ghi xong, **không chờ** follower |
| Độ trễ ghi (write latency) | Cao hơn (cộng vòng round-trip mạng tới follower) | Thấp (chỉ tốc độ leader) |
| Nguy cơ mất dữ liệu khi leader chết | **Không mất** dữ liệu đã ack (follower đã có) | **Có thể mất** phần chưa kịp gửi |
| Rủi ro khác | Follower chậm/chết → ghi bị treo (thường cấu hình "semi-sync": chỉ chờ 1 follower) | — |

💡 **Trực giác.** Đồng bộ = *gửi thư bảo đảm, chờ người nhận ký xác nhận rồi mới yên tâm*. Bất đồng bộ = *thả thư vào hòm rồi đi luôn* — nhanh, nhưng nếu xe thư cháy giữa đường thì thư mất mà bạn không biết.

**Walk-through mất dữ liệu khi async + leader chết.** Leader nhận 100 giao dịch trong 2 giây cuối, đã ack hết cho client (async nên không chờ follower). Follower mới replicate được tới giao dịch thứ 40 thì **leader chết đột ngột**. Failover bầu follower lên làm leader mới:

\`\`\`
Leader (chết):     đã có giao dịch  1..100  (ack hết cho client)
Follower → leader: chỉ có giao dịch  1..40
                   → 60 giao dịch (41..100) BIẾN MẤT
\`\`\`

60 giao dịch client tưởng đã thành công nay mất sạch. Đó là cái giá của async. Với dữ liệu tiền bạc, người ta dùng sync (hoặc semi-sync) để không bao giờ ack một thứ chưa an toàn.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Replication lag thường bao lâu?"* — Khi mạng & tải bình thường: vài mili-giây tới dưới 1 giây. Nhưng khi follower quá tải hoặc mạng nghẽn, lag có thể vọt lên *nhiều giây tới vài phút* — đủ để người dùng thấy dữ liệu cũ rõ rệt.
- *"Tại sao không luôn dùng sync cho an toàn?"* — Vì mỗi lệnh ghi phải chờ round-trip mạng, làm chậm *mọi* ghi; và nếu follower duy nhất chết, ghi bị treo. Async đổi an toàn lấy tốc độ & độ bền vận hành.

### 2.4 Multi-leader & leaderless (sơ lược)

- **Multi-leader (nhiều leader)**: nhiều node đều nhận ghi (vd mỗi data center một leader), rồi đồng bộ chéo. Ưu: ghi gần người dùng, chịu được mất 1 DC. Nhược: hai nơi sửa cùng một dòng → **xung đột ghi (write conflict)** phải hòa giải.
- **Leaderless (không leader)**: client ghi/đọc thẳng vào *nhiều* node, dùng **quorum** (đa số) để quyết giá trị đúng. Đây là mô hình của Dynamo/Cassandra. Cơ chế quorum và đánh đổi nhất quán sẽ học kỹ ở [Lesson 04 — CAP & Consistency](../lesson-04-cap-consistency/).

### 2.5 Failover khi leader chết

**Failover** = quy trình tự động đưa một follower lên thay khi leader chết:

\`\`\`
1. Phát hiện: leader không trả lời heartbeat trong N giây → coi là chết.
2. Bầu chọn (election): chọn follower có log MỚI nhất làm leader mới.
3. Định tuyến lại: client & follower còn lại trỏ ghi về leader mới.
\`\`\`

⚠ **Lỗi thường gặp: split-brain (não chẻ đôi).** Mạng bị chia, leader cũ *vẫn sống* nhưng bị cô lập; hệ thống bầu leader mới → **hai leader cùng nhận ghi** → dữ liệu phân kỳ. Phòng tránh bằng quorum/fencing (chỉ phía giữ được đa số mới được làm leader).

🔁 **Dừng lại tự kiểm tra.**
1. Replication có làm tăng năng lực **ghi** không? Vì sao?
2. Async + leader chết → vì sao có thể mất dữ liệu, còn sync thì không?

<details><summary>Đáp án</summary>

1. **Không.** Mọi bản sao phải nhận cùng lượng ghi như nhau, nên thêm replica không chia tải ghi — nó chỉ chia tải **đọc** và tăng độ sẵn sàng. Muốn chia tải ghi phải **sharding**.
2. Async: leader ack cho client *trước khi* follower nhận bản sao. Nếu leader chết trước khi gửi xong, phần chưa gửi chưa có ở đâu khác → mất. Sync: leader chỉ ack *sau khi* follower đã có → dữ liệu đã ack luôn tồn tại ở ≥1 nơi.
</details>

📝 **Tóm tắt mục 2.** Replication = nhiều bản sao giống nhau. Leader–follower: ghi vào leader, replicate sang follower, đọc từ cả hai. Sync (an toàn, chậm) vs async (nhanh, có thể mất dữ liệu khi leader chết). Replication lag → đọc follower có thể thấy dữ liệu cũ. Failover đưa follower lên thay leader; coi chừng split-brain.

---

## 3. Sharding / Partitioning (phân mảnh)

### 3.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** Sharding (còn gọi partitioning) là việc **chia một tập dữ liệu lớn thành nhiều mảnh rời nhau (shard / partition)**, mỗi mảnh đặt trên một node khác nhau. Mỗi mảnh giữ một *tập con khác nhau* của dữ liệu — không trùng nhau.

**(b) Vì sao cần.** Để **mở rộng ngang (horizontal scaling)**: một máy giới hạn ở RAM/đĩa/CPU của nó. Chia dữ liệu ra N máy → tổng dung lượng và thông lượng (cả đọc lẫn **ghi**) tăng gần N lần. Đây là cách duy nhất gánh dữ liệu vượt sức một máy.

**(c) Bốn ví dụ cụ thể.**
1. Mạng xã hội: 1 tỷ user chia 100 shard, mỗi shard ~10 triệu user theo \`hash(user_id)\`.
2. Hệ chat: tin nhắn chia theo \`room_id\` — mọi tin của một phòng nằm cùng shard để truy vấn nhanh.
3. Thương mại điện tử: đơn hàng chia theo \`range\` của \`order_date\` (mỗi tháng một shard).
4. IoT: dữ liệu cảm biến chia theo \`hash(device_id)\` để rải đều ghi.

⚠ **Đừng nhầm với replication.** Sharding **chia khác nhau** (shard 1 ≠ shard 2). Replication **sao giống nhau** (replica 1 = replica 2). Xem mục 4.

### 3.2 Hash-based vs range-based partitioning

Để biết một dòng (key) thuộc shard nào, ta cần một **shard key (khóa phân mảnh)** và một quy tắc ánh xạ key → shard. Hai quy tắc phổ biến:

**Hash-based: \`shard = hash(key) % N\`.** Băm khóa rồi lấy dư cho số shard.

Walk-through với \`N = 4\` shard, băm đơn giản \`hash(id) = id\` (toy — thực tế dùng băm thật):

| user_id | hash % 4 | → shard |
| :---: | :---: | :---: |
| 100 | 100 % 4 = 0 | S0 |
| 101 | 101 % 4 = 1 | S1 |
| 102 | 102 % 4 = 2 | S2 |
| 103 | 103 % 4 = 3 | S3 |
| 104 | 104 % 4 = 0 | S0 |

→ Rải **đều** ra 4 shard. Tốt cho tránh hotspot, nhưng các id liền nhau (100, 101...) văng đi mỗi nơi một cái.

**Range-based: chia theo khoảng giá trị.**

| Khoảng user_id | → shard |
| --- | :---: |
| 1 – 25.000.000 | S0 |
| 25.000.001 – 50.000.000 | S1 |
| 50.000.001 – 75.000.000 | S2 |
| 75.000.001 – 100.000.000 | S3 |

→ Truy vấn khoảng (\`WHERE id BETWEEN 100 AND 200\`) chỉ chạm **một** shard. Nhưng nếu id mới luôn tăng dần (auto-increment), mọi ghi mới dồn vào shard cuối → **hotspot**.

| | Hash-based | Range-based |
| --- | --- | --- |
| Phân bố | Đều (nếu hàm băm tốt) | Phụ thuộc dữ liệu, dễ lệch |
| Truy vấn khoảng (range query) | **Kém** — kết quả rải khắp shard | **Tốt** — nằm gọn 1 vài shard |
| Nguy cơ hotspot | Thấp | **Cao** (id tăng dần, ngày gần đây) |
| Ví dụ hợp | Tra theo user_id riêng lẻ | Dữ liệu theo thời gian, cần quét theo dải |

💡 **Trực giác.** Hash = *bốc thăm chỗ ngồi ngẫu nhiên* → rải đều nhưng bạn bè ngồi tản mác. Range = *xếp ghế theo bảng chữ cái* → dễ tìm cả nhóm liền nhau, nhưng hôm nay ai cũng họ "Nguyễn" thì khu N chật cứng.

### 3.3 Hotspot / skew và rebalancing

- **Skew (lệch)**: dữ liệu phân bố không đều giữa các shard.
- **Hotspot (điểm nóng)**: một shard gánh phần lớn lưu lượng.

Walk-through hotspot do range lệch — chia theo chữ cái đầu họ tên ở Việt Nam:

\`\`\`
S0: A–M  → ~25% dân số
S1: N     → "Nguyễn" chiếm ~38% dân số Việt Nam → MỘT MÌNH cõng 38%!
S2: O–T  → ~20%
S3: U–Z  → ~17%
\`\`\`

S1 quá tải trong khi S3 nhàn rỗi → chọn range theo trường lệch là sai lầm.

**Rebalancing (tái cân bằng)** = di chuyển dữ liệu giữa các node khi thêm/bớt node hoặc khi phát hiện lệch, sao cho tải đều trở lại.

### 3.4 Consistent hashing (sơ lược) — vì sao tránh reshuffle toàn bộ

Vấn đề của \`hash(key) % N\`: khi **thêm 1 node** (N: 4 → 5), **gần như mọi key** đổi shard vì số chia đổi.

Walk-through \`% 4\` → \`% 5\` (cùng các id ở mục 3.2):

| id | \`% 4\` | \`% 5\` | Phải di chuyển? |
| :---: | :---: | :---: | :---: |
| 100 | 0 | 0 | không |
| 101 | 1 | 1 | không |
| 102 | 2 | 2 | không |
| 103 | 3 | 3 | không |
| 104 | 0 | **4** | **CÓ** |
| 105 | 1 | 0 | **CÓ** |
| 106 | 2 | 1 | **CÓ** |
| 107 | 3 | 2 | **CÓ** |

Chỉ thêm 1 node mà ~80% key phải xáo trộn (copy qua mạng) → tê liệt hệ thống.

**Consistent hashing** giải quyết: đặt cả node lẫn key lên một **vòng băm (hash ring)** [0, 2³²). Mỗi key thuộc về node *kế tiếp theo chiều kim đồng hồ*. Khi thêm node mới, **chỉ các key nằm giữa node mới và node liền trước** phải di chuyển — trung bình **~1/N** lượng dữ liệu, không phải gần như toàn bộ. (Liên hệ nền tảng hàm băm: [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/).)

💡 **Trực giác.** Modulo = *đánh lại số nhà cả phố mỗi khi xây thêm 1 nhà* → ai cũng phải đổi địa chỉ. Consistent hashing = *chèn nhà mới vào đúng vị trí trên con đường vòng* → chỉ vài nhà hàng xóm liền kề bị ảnh hưởng.

### 3.5 Truy vấn cross-shard khó

Khi dữ liệu nằm rải trên N shard, các thao tác gom dữ liệu nhiều shard trở nên đắt:

- **JOIN cross-shard**: muốn nối \`orders\` (shard theo \`order_id\`) với \`users\` (shard theo \`user_id\`) → dữ liệu cần nối nằm ở các máy khác nhau → phải kéo qua mạng rồi nối ở tầng ứng dụng. Chậm và phức tạp; database đơn-node làm việc này trong bộ nhớ là xong.
- **Aggregate cross-shard** (\`COUNT\`, \`SUM\`, \`ORDER BY ... LIMIT\`): phải hỏi *mọi* shard, gom kết quả con, rồi tổng hợp lại (scatter-gather).

⚠ **Lỗi thường gặp: chọn shard key kém.** Nếu hầu hết truy vấn lọc theo \`user_id\` nhưng bạn shard theo \`order_id\`, thì truy vấn "tất cả đơn của user X" phải hỏi **mọi** shard (fan-out toàn bộ) thay vì một shard. Quy tắc: **chọn shard key trùng với chiều truy vấn phổ biến nhất**, để mỗi truy vấn chạm càng ít shard càng tốt.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy sharding luôn tốt hơn một máy to?"* — Không. Sharding thêm độ phức tạp lớn (cross-shard query, rebalancing, transaction phân tán). Khi dữ liệu còn vừa một máy mạnh (scale up), cứ dùng một máy. Chỉ shard khi thật sự vượt sức một máy.
- *"Làm sao tránh cross-shard JOIN?"* — Đặt dữ liệu hay-nối-cùng-nhau vào **cùng shard** (vd shard cả \`users\` và \`orders\` theo \`user_id\`), hoặc **nhân bản (replicate)** bảng nhỏ ít đổi (vd bảng \`countries\`) sang mọi shard để nối cục bộ.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao \`hash(key) % N\` khiến việc thêm node rất đắt, còn consistent hashing thì không?
2. Range partition theo "ngày tạo" của log, ghi mới luôn dồn vào đâu? Đó là vấn đề gì?

<details><summary>Đáp án</summary>

1. \`% N\` phụ thuộc N: đổi N thì gần như mọi key đổi shard → ~(N−1)/N lượng key phải di chuyển. Consistent hashing chỉ di chuyển các key nằm giữa node mới và node liền trước trên vòng → trung bình ~1/N.
2. Dồn hết vào **shard chứa khoảng ngày mới nhất** → shard đó thành **hotspot** (mọi ghi mới đổ về một máy), các shard cũ chỉ-đọc nằm chơi.
</details>

📝 **Tóm tắt mục 3.** Sharding chia dữ liệu khác nhau ra N máy để scale ngang (gồm cả ghi). Hash rải đều nhưng kém range query; range tốt cho query khoảng nhưng dễ hotspot. Skew/hotspot làm một shard quá tải → cần rebalancing. Consistent hashing giảm xáo trộn khi thêm node từ ~toàn bộ xuống ~1/N. Cross-shard JOIN/aggregate đắt → chọn shard key trùng chiều truy vấn.

---

## 4. Replication vs Sharding — phân biệt & kết hợp

| | **Replication (nhân bản)** | **Sharding (phân mảnh)** |
| --- | --- | --- |
| Bản chất | Bản sao **giống hệt** nhau | Mảnh **khác nhau**, gộp lại mới đủ |
| Giải bài toán | Sẵn sàng + scale **đọc** | Scale **dung lượng + ghi** |
| Một node mất | Node khác có **toàn bộ** dữ liệu | Mất **phần dữ liệu** của node đó (trừ khi shard cũng được replicate) |
| Tăng năng lực ghi? | Không | Có |

💡 **Trực giác phân biệt.** Replication = *nhiều bản photocopy của cùng cuốn sách*. Sharding = *chia một bộ sách dày thành nhiều tập, mỗi nơi giữ vài tập*.

**Hệ thật thường kết hợp cả hai.** Chia dữ liệu thành N shard (để scale), rồi **mỗi shard lại được replicate** thành leader + vài follower (để mỗi mảnh vẫn sống sót khi một node của nó chết):

\`\`\`
Shard A:  leader Aℓ  + follower Af1, Af2
Shard B:  leader Bℓ  + follower Bf1, Bf2
Shard C:  leader Cℓ  + follower Cf1, Cf2
\`\`\`

→ Vừa scale (3 shard chia tải ghi), vừa sẵn sàng (mỗi shard có bản sao dự phòng). Đây là kiến trúc của hầu hết hệ phân tán lớn (Cassandra, MongoDB sharded cluster, Vitess...).

⚠ Khi đã phân tán nhiều node, bạn buộc phải đối mặt đánh đổi **nhất quán (consistency) vs sẵn sàng (availability)** khi mạng chia cắt — đó chính là định lý **CAP**, học ở [Lesson 04 — CAP & Consistency](../lesson-04-cap-consistency/).

---

## 5. Ứng dụng thực tế trong phần mềm

> 💡 **Replication và sharding là cách DB "scale" khi một máy không đủ — nhưng mỗi cái giải bài toán khác nhau.** Nhầm lẫn = chọn sai giải pháp.

| Kỹ thuật | Giải bài toán | Đánh đổi |
|----------|---------------|----------|
| **Replication (bản sao)** | Đọc nhiều quá tải; chịu lỗi (failover) | Replica lag (đọc dữ liệu hơi cũ) |
| **Read replica** | Đẩy query đọc sang bản sao, giảm tải master | Eventual consistency trên replica |
| **Sharding (chia ngang)** | Dữ liệu/ghi quá lớn cho một máy | Mất join xuyên shard, query phức tạp hơn |
| **Consistent hashing** | Chia key cho shard, ít remap khi thêm node | ([nối Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/)) |

### 5.1. Ví dụ cụ thể — read replica giảm tải đọc

App đọc nhiều gấp 10 lần ghi (điển hình). Master một mình gánh hết → quá tải. Giải: **read replica** — master nhận ghi, đồng bộ sang vài bản sao; query đọc (báo cáo, hiển thị) đẩy sang replica. Master nhẹ đi. Bẫy: **replica lag** — vừa ghi vào master, đọc ngay từ replica có thể chưa thấy (eventual consistency). Vì vậy "đọc-sau-khi-ghi của chính user" thường ép đọc từ master.

### 5.2. Ví dụ cụ thể — sharding khi một máy không chứa nổi

Bảng \`events\` 100 tỉ dòng, một máy không đủ đĩa/RAM. **Sharding**: chia theo \`user_id % N\` (hoặc consistent hashing) sang N máy, mỗi máy giữ một phần. Ghi/đọc theo \`user_id\` → tới đúng shard. Bẫy lớn: query **xuyên shard** (vd "tổng toàn hệ thống") phải hỏi mọi shard rồi gộp — chậm và phức tạp. Chọn **shard key** đúng (theo chiều truy vấn phổ biến nhất) là quyết định sống còn.

> ⚠ **Đừng shard sớm.** Sharding làm app phức tạp hẳn (mất join, mất transaction xuyên shard, rebalance khó). Thứ tự mở rộng đúng: (1) tối ưu query + index → (2) read replica → (3) cache (Redis) → (4) chỉ shard khi **một máy thật sự không chứa nổi**. Nhiều hệ thống không bao giờ cần tới sharding.

### 5.3. 📝 Tóm tắt mục 5

- **Replication** = bản sao → chịu lỗi + scale đọc (bẫy: replica lag).
- **Sharding** = chia ngang → scale ghi/dung lượng (bẫy: mất join xuyên shard, chọn shard key quan trọng).
- Thứ tự scale: index/query → read replica → cache → shard (cuối cùng). Đừng shard sớm.

## 6. Bài tập

1. **Chọn sync hay async.** Với mỗi tình huống, chọn replication đồng bộ hay bất đồng bộ và giải thích một câu: (a) hệ thống chuyển khoản ngân hàng; (b) đếm lượt xem video (view count) trên mạng xã hội; (c) bảng số dư ví điện tử; (d) cache hồ sơ công khai của người dùng để hiển thị nhanh.

2. **Tính dữ liệu mất khi async + leader chết.** Leader nhận **250** giao dịch trong giây cuối và đã ack hết cho client (async). Tại thời điểm leader chết, follower mới chỉ replicate được tới giao dịch thứ **180**. Sau failover, follower này lên làm leader. (a) Bao nhiêu giao dịch mất? (b) Nếu dùng synchronous (chờ follower ack mới báo client xong) thì con số đó là bao nhiêu?

3. **Chọn shard key tránh hotspot.** Một hệ thống log sự kiện ghi ~50.000 dòng/giây, mỗi dòng có \`event_time\` (luôn tăng dần), \`user_id\` (rải đều ~10 triệu user), \`region\` (chỉ 5 vùng). Truy vấn phổ biến nhất: "tất cả sự kiện của 1 user trong 30 ngày qua". Nên shard theo trường nào? Vì sao **không** nên shard theo \`event_time\` hay \`region\`?

4. **Vì sao cross-shard JOIN khó.** Bảng \`orders\` được shard theo \`hash(order_id) % 8\`, bảng \`users\` được shard theo \`hash(user_id) % 8\`. Một truy vấn cần nối mỗi đơn hàng với thông tin người đặt: \`SELECT ... FROM orders JOIN users ON orders.user_id = users.id\`. (a) Vì sao truy vấn này đắt? (b) Đề xuất một cách thiết kế để nó rẻ hơn.

---

## 7. Lời giải chi tiết

### Bài 1 — Chọn sync hay async

- **(a) Chuyển khoản ngân hàng**: **Synchronous**. Tiền không được phép "bốc hơi" khi leader chết ngay sau khi báo thành công → phải đảm bảo follower đã có bản sao trước khi ack.
- **(b) Đếm lượt xem video**: **Asynchronous**. Sai lệch vài lượt view trong vài giây không quan trọng; ưu tiên ghi nhanh, lưu lượng cực lớn.
- **(c) Số dư ví điện tử**: **Synchronous** (hoặc semi-sync). Cùng lý do với ngân hàng — dữ liệu tiền bạc, không được mất.
- **(d) Cache hồ sơ công khai**: **Asynchronous**. Dữ liệu hiển thị, không phải nguồn-sự-thật; thấy phiên bản cũ vài giây chấp nhận được, đổi lấy độ trễ thấp.

### Bài 2 — Dữ liệu mất khi async + leader chết

- **(a)** Leader đã ack tới giao dịch **250**, follower mới có tới **180**. Phần \`181..250\` chưa kịp replicate và leader đã chết → mất **250 − 180 = 70 giao dịch**.
- **(b)** Với **synchronous**, leader chỉ ack cho client *sau khi* follower đã ghi nhận. Nên mọi giao dịch đã ack đều chắc chắn có ở follower → sau failover **mất 0 giao dịch**. (Đánh đổi: mỗi ghi chậm hơn vì chờ round-trip tới follower.)

### Bài 3 — Chọn shard key tránh hotspot

- **Nên shard theo \`user_id\`.** Lý do:
  - Truy vấn phổ biến nhất lọc theo \`user_id\` → shard theo \`user_id\` khiến mỗi truy vấn chỉ chạm **một** shard (không fan-out toàn bộ).
  - \`user_id\` rải đều ~10 triệu giá trị → dùng \`hash(user_id)\` phân bố đều, **không hotspot**.
- **Không shard theo \`event_time\`**: thời gian luôn tăng dần → mọi ghi mới (50.000 dòng/giây) dồn hết vào shard chứa khoảng thời gian hiện tại → **hotspot ghi** nghiêm trọng, các shard cũ nằm chơi.
- **Không shard theo \`region\`**: chỉ 5 giá trị → tối đa 5 shard (không scale được xa hơn), và nếu một vùng đông hơn hẳn (vd 60% lưu lượng) thì shard đó **skew** nặng.

### Bài 4 — Vì sao cross-shard JOIN khó

- **(a) Vì sao đắt.** \`orders\` chia theo \`hash(order_id)\`, \`users\` chia theo \`hash(user_id)\`. Một đơn hàng nằm trên shard X (theo order_id) nhưng người đặt nó lại nằm trên shard Y (theo user_id) — **hai shard khác nhau, hai máy khác nhau**. Để nối, hệ phải kéo dữ liệu qua mạng từ nhiều shard rồi nối ở tầng điều phối (scatter-gather), thay vì nối trong bộ nhớ một máy. Với truy vấn nối *nhiều* đơn hàng, gần như **mọi shard** đều bị hỏi → rất chậm.
- **(b) Cách làm rẻ hơn (chọn 1):**
  - **Cùng shard key**: shard \`orders\` theo \`user_id\` (thay vì \`order_id\`). Khi đó mọi đơn của một user và bản ghi user đó **cùng shard** → nối cục bộ trên một máy, không qua mạng.
  - **Replicate bảng nhỏ**: nếu \`users\` đủ nhỏ và ít đổi, sao chép toàn bộ \`users\` sang *mọi* shard → mỗi shard nối \`orders\` cục bộ với bản \`users\` của nó.
  - **Phi chuẩn hóa (denormalize)**: nhúng sẵn các trường user cần thiết (tên, email) vào bản ghi \`orders\` lúc ghi → đọc không cần JOIN nữa.

---

## 8. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm: (1) mô phỏng leader–follower với chọn sync/async, chỉnh lag, đọc follower thấy giá trị cũ/mới, và failover khi leader chết; (2) mô phỏng sharding hash vs range với thanh trượt số shard, thêm shard để so sánh reshuffle giữa modulo và consistent hashing; (3) minh họa hotspot khi range partition lệch.

---

## Bài tiếp theo

→ [Lesson 04 — CAP & Consistency](../lesson-04-cap-consistency/): khi đã phân tán nhiều node, vì sao không thể vừa nhất quán mạnh, vừa luôn sẵn sàng, vừa chịu được mạng chia cắt — định lý CAP và các mức nhất quán (quorum, eventual consistency).
`;
