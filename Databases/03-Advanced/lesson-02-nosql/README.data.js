// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/03-Advanced/lesson-02-nosql/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — NoSQL: bốn họ và khi nào dùng

> Nhóm 3 — Nâng cao · Lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **NoSQL** ("Not Only SQL") ra đời để giải bài toán gì: mở rộng ngang (horizontal scaling), schema linh hoạt, khối lượng ghi/đọc vượt khả năng một máy.
- Phân biệt **bốn họ NoSQL** chính — key-value, document, column-family, graph — mỗi họ kèm mô hình dữ liệu, ví dụ truy vấn, sản phẩm tiêu biểu, khi nào dùng và khi nào *không* nên dùng.
- So sánh **schema-on-write** (quan hệ) với **schema-on-read** (NoSQL).
- Cân được bảng đánh đổi **SQL vs NoSQL**: transaction/JOIN/nhất quán mạnh đổi lấy khả năng mở rộng + linh hoạt.
- Hiểu **denormalization (phi chuẩn hóa)** và nhúng dữ liệu trong document: đọc nhanh đổi lấy trùng lặp.

## Kiến thức tiền đề

- [Lesson 01 — Giới thiệu CSDL & DBMS](../../01-Foundations/lesson-01-gioi-thieu-csdl/) — đã giới thiệu các loại DBMS (quan hệ, key-value, document, column-family, graph). Bài này đào sâu nhóm phi quan hệ.
- [Nhóm 2 — Chuẩn hóa](../../02-Intermediate/lesson-01-chuan-hoa/) — để so sánh với denormalization.
- Hữu ích: [Lesson 01 — Storage Engine](../lesson-01-storage-engine/) (LSM-tree) và [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/).

---

## 1. Vì sao NoSQL ra đời?

💡 **Trực giác.** Cơ sở dữ liệu quan hệ giống một **tủ hồ sơ chuẩn hóa hoàn hảo trong một văn phòng**: mọi giấy tờ có mẫu cố định, có người kiểm tra chặt, tra cứu chéo (JOIN) tuyệt vời — *miễn là cả văn phòng vừa trong một tòa nhà*. Khi lượng giấy tờ vượt sức chứa một tòa nhà, bạn không thể "xây tòa nhà to vô hạn" (mở rộng dọc — scale up); bạn phải **mở thêm nhiều tòa nhà** (mở rộng ngang — scale out). Lúc đó việc giữ một tủ hồ sơ duy nhất, chuẩn hóa chặt, tra chéo qua nhiều tòa nhà trở nên cực đắt. NoSQL chấp nhận nới lỏng vài quy tắc để dữ liệu trải ra nhiều máy dễ dàng hơn.

### 1.1 Ba áp lực thực tế đẻ ra NoSQL

**(a) Mở rộng ngang (horizontal scaling / scale out).** DB quan hệ truyền thống mở rộng chủ yếu theo chiều **dọc** (scale up): mua máy mạnh hơn — nhưng có trần cứng và rất đắt. NoSQL thiết kế để chạy trên **nhiều máy thường (commodity), thêm máy là tăng năng lực**. Chi tiết cơ chế chia dữ liệu ra nhiều máy: [Lesson 03 — Replication & Sharding](../lesson-03-replication-sharding/).

**(b) Schema linh hoạt.** Web/di động thay đổi liên tục: hôm nay user có 5 trường, mai thêm \`avatar_url\`, mốt thêm \`oauth_provider\`. Với quan hệ, mỗi lần đổi schema là một \`ALTER TABLE\` trên bảng có thể hàng tỉ dòng. NoSQL (đặc biệt document) cho mỗi bản ghi *tự mang cấu trúc riêng* — thêm trường không cần migrate cả bảng.

**(c) Khối lượng ghi/đọc vượt một máy.** Mạng xã hội, IoT, log: hàng trăm nghìn lượt ghi mỗi giây. Một máy đơn không kham nổi; cần ghi phân tán. Vài họ NoSQL (column-family như Cassandra) tối ưu riêng cho ghi-nặng nhờ [LSM-tree](../lesson-01-storage-engine/).

⚠ **Hiểu lầm phổ biến.** "NoSQL" **không** có nghĩa "không dùng SQL" hay "chống SQL". Nó là **"Not Only SQL"** — *không chỉ SQL*: ngoài mô hình bảng quan hệ còn có những mô hình khác phù hợp hơn cho một số bài toán. Nhiều hệ NoSQL ngày nay còn hỗ trợ ngôn ngữ giống SQL (CQL của Cassandra, query của Couchbase).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy quan hệ không mở rộng ngang được à?"* — Được, nhưng khó hơn: JOIN và transaction ACID xuyên nhiều máy rất tốn kém. NoSQL đánh đổi bớt JOIN/transaction để mở rộng ngang dễ hơn.
- *"NoSQL = không có schema?"* — Không hẳn. Là **schema linh hoạt** / *schema-on-read* (xem mục 6), không phải "vô tổ chức". Ứng dụng vẫn ngầm giả định một cấu trúc.

---

## 2. Họ 1 — Key-Value (khóa–giá trị)

💡 **Trực giác.** Giống một **tủ khóa gửi đồ ở bến xe**: bạn đưa số ô (key), nhận lại đúng túi đồ (value). Cực nhanh vì không cần "hiểu" bên trong túi có gì.

**(a) Mô hình dữ liệu.** Một bảng băm (hash map) khổng lồ, bền vững: \`key → value\`. Value thường là blob mờ (chuỗi, JSON, nhị phân) — DB *không* nhìn vào bên trong.

**(b) Ví dụ truy vấn cụ thể.** Trong Redis:

\`\`\`
SET session:abc123  '{"userId":42,"role":"admin"}'   EX 3600
GET session:abc123
DEL session:abc123
INCR page:home:views
\`\`\`

Chỉ \`get\`/\`set\`/\`del\` theo khóa — không lọc theo trường bên trong value.

**(c) Sản phẩm tiêu biểu.** Redis, Amazon DynamoDB, Memcached, etcd.

**(d) Khi nào dùng.** Cache, lưu session đăng nhập, đếm lượt xem (counter), rate-limit, hàng đợi nhẹ — bất cứ khi nào bạn luôn tra cứu *theo một khóa đã biết* và cần độ trễ cực thấp.

**(e) Khi nào KHÔNG dùng.** Khi cần truy vấn theo *nội dung bên trong* value ("tìm mọi session có role=admin"), hoặc cần quan hệ/JOIN. Key-value không quét theo trường được — bạn sẽ phải tự đọc hết mọi value, mất hết lợi thế.

### 2.1 Bốn ví dụ cặp khóa–giá trị

| Key | Value | Dùng cho |
| --- | --- | --- |
| \`session:abc123\` | \`{"userId":42,"role":"admin"}\` | Phiên đăng nhập (hết hạn sau 1h) |
| \`cart:user42\` | \`["sku-1","sku-9","sku-3"]\` | Giỏ hàng tạm |
| \`page:home:views\` | \`184523\` | Bộ đếm lượt xem |
| \`feature:darkmode:user42\` | \`true\` | Cờ bật/tắt tính năng |

🔁 **Dừng lại tự kiểm tra.** Bạn muốn "liệt kê tất cả khách có \`city = 'Hanoi'\`". Key-value làm được hiệu quả không?

<details><summary>Đáp án</summary>

Không hiệu quả. Key-value chỉ tra theo khóa; \`city\` nằm *bên trong* value mà DB không index. Bạn sẽ phải đọc toàn bộ value rồi lọc thủ công — đúng kiểu quét tuyến tính O(n). Bài toán này hợp với DB quan hệ (index trên \`city\`) hoặc document (index theo field).
</details>

---

## 3. Họ 2 — Document (tài liệu)

💡 **Trực giác.** Giống một **tập hồ sơ giấy**: mỗi hồ sơ (document) là một tờ khai tự chứa đủ thông tin của một đối tượng — kể cả các phần lồng nhau (địa chỉ, danh sách điện thoại) nằm ngay trong tờ đó, không phải tra sang tủ khác.

**(a) Mô hình dữ liệu.** Collection chứa các **document** dạng JSON/BSON, cho phép lồng (nested) và mảng. Hai document trong cùng collection *không bắt buộc cùng cấu trúc*.

**(b) Ví dụ truy vấn cụ thể.** Một document user có địa chỉ **lồng** và mảng đơn hàng nhúng:

\`\`\`json
{
  "_id": 42,
  "name": "An",
  "email": "an@example.com",
  "address": { "street": "12 Lê Lợi", "city": "Hanoi", "zip": "100000" },
  "orders": [
    { "orderId": 1001, "total": 1500000, "items": 3 },
    { "orderId": 1002, "total":  800000, "items": 1 }
  ]
}
\`\`\`

Truy vấn theo field (MongoDB):

\`\`\`js
db.users.find({ "address.city": "Hanoi" })           // lọc theo trường lồng
db.users.find({ "orders.total": { $gt: 1000000 } })  // lọc trong mảng nhúng
db.users.updateOne({ _id: 42 }, { $push: { orders: { orderId: 1003, total: 200000 } } })
\`\`\`

Khác key-value: DB *hiểu* cấu trúc bên trong và **index được trường lồng**.

**(c) Sản phẩm tiêu biểu.** MongoDB, Couchbase, Amazon DocumentDB.

**(d) Khi nào dùng.** Dữ liệu bán cấu trúc, schema thay đổi nhanh, mỗi đối tượng tự chứa (catalog sản phẩm có thuộc tính khác nhau theo loại; hồ sơ người dùng; CMS). Khi truy cập thường lấy *cả cụm* dữ liệu của một đối tượng cùng lúc.

**(e) Khi nào KHÔNG dùng.** Khi cần JOIN nhiều thực thể độc lập thường xuyên, hoặc transaction phức tạp đa-document với nhất quán mạnh, hoặc khi dữ liệu nhúng bị trùng lặp nhiều và phải cập nhật khắp nơi (xem mục 7).

### 3.1 Bốn document khác cấu trúc trong cùng collection

| Document | Trường đặc thù |
| --- | --- |
| Sản phẩm sách | \`author\`, \`pages\`, \`isbn\` |
| Sản phẩm áo | \`size\`, \`color\`, \`material\` |
| Sản phẩm điện thoại | \`ram\`, \`storage\`, \`battery_mah\` |
| Sản phẩm khóa học | \`duration_h\`, \`level\`, \`lessons\` |

Trong quan hệ, gom 4 loại này vào một bảng sẽ đẻ ra rất nhiều cột \`NULL\`. Document để mỗi bản ghi mang đúng trường của nó.

❓ *"Document có index không?"* — Có. MongoDB index được cả trường lồng (\`address.city\`) và phần tử mảng. Khác key-value ở chỗ đó.

---

## 4. Họ 3 — Column-family (họ cột)

💡 **Trực giác.** Đừng tưởng tượng "bảng có cột cố định". Hãy tưởng tượng mỗi **hàng là một thư mục con**, bên trong chứa tùy ý nhiều cặp cột→giá trị — hàng này có 3 cột, hàng kia có 300 cột, hoàn toàn khác nhau. Dữ liệu được nhóm theo **column family** (họ cột) và lưu/đọc theo cụm cột.

**(a) Mô hình dữ liệu.** Mỗi hàng có một **row key**; trong hàng là tập cột **động** (mỗi hàng có thể khác cột nhau), gom vào các column family. Tối ưu cho ghi tuần tự khối lớn và truy vấn theo dải row key.

**(b) Ví dụ truy vấn cụ thể.** Cassandra dùng CQL (giống SQL nhưng hạn chế):

\`\`\`sql
CREATE TABLE events (
  device_id text, ts timestamp, temp float, humidity float,
  PRIMARY KEY (device_id, ts)
) WITH CLUSTERING ORDER BY (ts DESC);

INSERT INTO events (device_id, ts, temp) VALUES ('sensor-7', '2026-05-29T10:00', 28.4);
SELECT * FROM events WHERE device_id='sensor-7' AND ts > '2026-05-01';
\`\`\`

Lưu ý: truy vấn xoay quanh **partition key** (\`device_id\`); không có JOIN, hạn chế lọc tùy ý.

**(c) Sản phẩm tiêu biểu.** Apache Cassandra, HBase, ScyllaDB, Google Bigtable.

**(d) Khi nào dùng.** Ghi-nặng, phân tán nhiều máy, dữ liệu chuỗi thời gian (time-series), log, IoT, feed. Cassandra dùng **[LSM-tree](../lesson-01-storage-engine/)** ở storage engine: ghi vào memtable trong RAM rồi flush tuần tự ra đĩa (append-only) → ghi cực nhanh, hợp khối lượng ghi lớn.

**(e) Khi nào KHÔNG dùng.** Khi cần JOIN, truy vấn ad-hoc linh hoạt theo nhiều trường bất kỳ, hay transaction ACID mạnh. Mô hình bắt bạn thiết kế bảng *theo truy vấn đã biết trước* (query-first); truy vấn lạ ngoài thiết kế thường rất tốn kém.

### 4.1 Bốn hàng có cột khác nhau (minh họa cột động)

| Row key | Các cột có trong hàng |
| --- | --- |
| \`sensor-7\` | \`temp\`, \`humidity\`, \`ts\` |
| \`sensor-9\` | \`temp\`, \`pressure\`, \`ts\` (không có humidity) |
| \`gate-3\` | \`open_count\`, \`ts\` |
| \`meter-1\` | \`kwh\`, \`voltage\`, \`ts\` |

🔁 **Dừng lại tự kiểm tra.** Vì sao Cassandra ghi rất nhanh nhưng truy vấn "tìm mọi sự kiện có \`temp > 30\` trên tất cả thiết bị" lại đắt?

<details><summary>Đáp án</summary>

Ghi nhanh vì LSM-tree biến mọi ghi thành append tuần tự vào memtable/SSTable, không phải sửa tại chỗ. Nhưng truy vấn trên đòi lọc theo \`temp\` *xuyên mọi partition* — không có index toàn cục theo \`temp\`, dữ liệu lại nằm rải trên nhiều máy theo \`device_id\`. Phải quét hầu hết các partition → đắt. Cassandra muốn bạn thiết kế bảng *theo truy vấn* trước (query-first), không truy vấn tùy hứng.
</details>

---

## 5. Họ 4 — Graph (đồ thị)

💡 **Trực giác.** Giống một **sơ đồ quan hệ vẽ tay**: các điểm (người, sản phẩm) nối với nhau bằng đường có nhãn ("là bạn của", "đã mua"). Muốn tìm "bạn-của-bạn", bạn lần theo các đường nối — đúng như cách bộ não hình dung mạng xã hội.

**(a) Mô hình dữ liệu.** **Đỉnh (vertex/node)** = thực thể; **cạnh (edge)** = quan hệ giữa hai đỉnh, có hướng và nhãn, có thể mang thuộc tính. Đây chính là cấu trúc [đồ thị](../../../DataStructures/03-Advanced/lesson-01-graph/) bạn đã học, được lưu bền vững.

**(b) Ví dụ truy vấn cụ thể.** Neo4j dùng Cypher. Tìm **bạn-của-bạn** (quan hệ 2 bậc) của An mà chưa là bạn trực tiếp:

\`\`\`cypher
MATCH (an:Person {name:'An'})-[:FRIEND]->(:Person)-[:FRIEND]->(fof:Person)
WHERE NOT (an)-[:FRIEND]->(fof) AND fof <> an
RETURN DISTINCT fof.name
\`\`\`

Trong quan hệ, "bạn-của-bạn 3-4 bậc" cần JOIN bảng \`friends\` với chính nó nhiều lần — viết khó, chạy chậm cấp số nhân. Graph DB duyệt cạnh trực tiếp nên rẻ hơn nhiều cho truy vấn nhiều bậc.

**(c) Sản phẩm tiêu biểu.** Neo4j, Amazon Neptune, JanusGraph, ArangoDB.

**(d) Khi nào dùng.** Quan hệ là trung tâm và truy vấn duyệt nhiều bậc: mạng xã hội, hệ gợi ý ("người mua X cũng mua Y"), phát hiện gian lận, đồ thị tri thức, định tuyến.

**(e) Khi nào KHÔNG dùng.** Khi dữ liệu chủ yếu là bản ghi độc lập ít quan hệ, hoặc tải là tổng hợp khối lớn kiểu OLAP. Graph DB không phải lựa chọn cho "tính tổng doanh thu 3 năm".

### 5.1 Bốn ví dụ quan hệ (cạnh) trong graph

| Đỉnh nguồn | Cạnh | Đỉnh đích |
| --- | --- | --- |
| \`Person:An\` | \`-[:FRIEND]->\` | \`Person:Binh\` |
| \`Person:An\` | \`-[:BOUGHT]->\` | \`Product:Sách Go\` |
| \`Product:Sách Go\` | \`-[:IN_CATEGORY]->\` | \`Category:Lập trình\` |
| \`Person:Chi\` | \`-[:FOLLOWS]->\` | \`Person:An\` |

❓ *"Sao không lưu quan hệ trong bảng quan hệ?"* — Được, và với 1-2 bậc thì quan hệ vẫn ổn. Nhưng mỗi "bậc" thêm là một JOIN; tới 4-5 bậc, số dòng trung gian bùng nổ. Graph DB lưu con trỏ trực tiếp giữa các đỉnh kề nhau nên duyệt sâu vẫn nhanh.

📝 **Tóm tắt bốn họ.** Key-value = tra theo khóa, value mờ (cache/session). Document = JSON tự chứa, index được field lồng (dữ liệu bán cấu trúc). Column-family = cột động, ghi-nặng phân tán, query-first (time-series/log). Graph = đỉnh & cạnh, vô địch truy vấn quan hệ nhiều bậc.

---

## 6. Schema-on-write vs Schema-on-read

💡 **Trực giác.** **Schema-on-write** = *kiểm tra giấy tờ ngay tại cổng* trước khi cho vào — sai mẫu là bị chặn. **Schema-on-read** = *cho vào trước, ai cần đọc thì tự diễn giải* — linh hoạt nhưng người đọc phải tự lo dữ liệu có thể không đồng nhất.

**(a) Là gì.**
- **Schema-on-write (quan hệ).** Cấu trúc (bảng, kiểu cột, ràng buộc) định nghĩa *trước*; DB ép dữ liệu khớp *khi ghi*. Ghi sai kiểu/thiếu cột bắt buộc → bị từ chối.
- **Schema-on-read (nhiều NoSQL).** Dữ liệu ghi vào gần như nguyên trạng; cấu trúc được *diễn giải khi đọc* bởi ứng dụng. DB không ép một schema cứng lúc ghi.

**(b) Vì sao tồn tại schema-on-read.** Để hấp thụ dữ liệu thay đổi nhanh hoặc không đồng nhất mà không phải migrate cả bảng tỉ dòng mỗi lần đổi cấu trúc. Đánh đổi: gánh nặng "đảm bảo đúng cấu trúc" chuyển từ DB sang **code ứng dụng**.

**(c) Ví dụ cụ thể.** Thêm trường \`phone\` cho user:
- Schema-on-write: \`ALTER TABLE users ADD COLUMN phone TEXT;\` — thao tác trên cả bảng, có thể khóa/chậm với bảng lớn; mọi dòng cũ có \`phone = NULL\`.
- Schema-on-read: chỉ cần ghi document mới *có* trường \`phone\`; document cũ vẫn *không* có. Code đọc xử lý kiểu \`user.phone ?? "(chưa có)"\`.

⚠ **Lỗi thường gặp.** Tưởng schema-on-read = "khỏi lo cấu trúc". Sai — bạn vẫn có schema, chỉ là **ngầm (implicit) trong code** thay vì khai báo trong DB. Không kỷ luật → mỗi document một kiểu, code đọc đầy \`if/else\` xử lý biến thể, lỗi runtime tăng.

| | Schema-on-write (SQL) | Schema-on-read (NoSQL) |
| --- | --- | --- |
| Kiểm tra cấu trúc | Khi GHI, do DB | Khi ĐỌC, do ứng dụng |
| Đổi cấu trúc | \`ALTER TABLE\` (có thể nặng) | Ghi bản ghi mới khác cấu trúc |
| Đảm bảo nhất quán | Mạnh, tập trung ở DB | Phân tán vào code, dễ trôi |
| Hợp với | Dữ liệu ổn định, cần toàn vẹn | Dữ liệu đổi nhanh, đa dạng |

---

## 7. SQL vs NoSQL — bảng đánh đổi & denormalization

### 7.1 Bảng đánh đổi

| Tiêu chí | SQL (quan hệ) | NoSQL |
| --- | --- | --- |
| Schema | Cứng, schema-on-write | Linh hoạt, thường schema-on-read |
| JOIN | Mạnh, là điểm cốt lõi | Hạn chế / không có (phải nhúng hoặc gộp ở app) |
| Transaction | ACID đa-bảng mạnh | Thường giới hạn (nhiều hệ chỉ ACID trong 1 document/partition) |
| Nhất quán | Thường nhất quán mạnh | Thường nhất quán cuối cùng (eventual) — xem [Lesson 04 — CAP & Consistency](../lesson-04-cap-consistency/) |
| Mở rộng | Chủ yếu dọc (scale up) | Ngang (scale out) là thế mạnh |
| Truy vấn ad-hoc | Rất linh hoạt (SQL) | Tùy họ; thường phải thiết kế theo truy vấn |

⚠ **Hiểu lầm lớn: "NoSQL luôn nhanh hơn / luôn tốt hơn SQL".** Sai. NoSQL nhanh hơn *cho đúng kiểu truy cập nó được thiết kế* (tra theo khóa, lấy cả document, ghi tuần tự). Cho truy vấn ad-hoc, JOIN nhiều bảng, hay cần nhất quán mạnh, một DB quan hệ có index tốt thường *thắng* cả về tốc độ lẫn độ đúng. NoSQL không phải "phiên bản nâng cấp" của SQL — nó là **một bộ đánh đổi khác**. Chọn theo *hình dạng dữ liệu và mẫu truy cập*, không theo trào lưu.

❓ **Câu hỏi tự nhiên.**
- *"Vậy dự án mới nên chọn gì?"* — Mặc định bắt đầu bằng quan hệ (PostgreSQL) vì nó linh hoạt truy vấn và đảm bảo toàn vẹn tốt; chuyển/bổ sung NoSQL khi có nhu cầu cụ thể (cache → Redis, time-series khổng lồ → Cassandra, quan hệ nhiều bậc → Neo4j).
- *"Dùng cả hai cùng lúc được không?"* — Được, rất phổ biến (gọi là **polyglot persistence**): PostgreSQL cho dữ liệu lõi + Redis cache + Neo4j cho phần gợi ý.

### 7.2 Denormalization & nhúng dữ liệu trong document

💡 **Trực giác.** [Chuẩn hóa (normalization)](../../02-Intermediate/lesson-01-chuan-hoa/) tách dữ liệu ra để *không trùng lặp* — đẹp cho ghi, nhưng đọc phải JOIN ghép lại. **Denormalization (phi chuẩn hóa)** làm ngược: *cố ý lặp lại* dữ liệu để đọc một phát ra hết, khỏi JOIN.

**(a) Là gì.** Gộp/nhúng dữ liệu liên quan vào cùng một chỗ (thường là cùng một document) dù điều đó tạo trùng lặp.

**(b) Vì sao.** Trong document DB không có JOIN rẻ; nếu một màn hình luôn cần "user + đơn hàng của user", nhúng \`orders\` ngay trong document user giúp **một lần đọc** lấy đủ — nhanh hơn nhiều so với ghép từ nhiều bảng.

**(c) Ví dụ cụ thể.**
- *Chuẩn hóa (quan hệ):* bảng \`users\` và bảng \`orders\` riêng, nối qua \`user_id\`. Lấy user kèm đơn → JOIN.
- *Denormalize (document):* nhúng mảng \`orders\` thẳng vào document user (như mục 3). Đọc 1 document ra cả user lẫn đơn.

⚠ **Đánh đổi (lỗi thường gặp).** Trùng lặp đẻ ra **rủi ro bất nhất khi cập nhật**. Nếu tên sản phẩm được nhúng vào *mọi* đơn hàng của *mọi* user, đổi tên sản phẩm phải sửa ở rất nhiều chỗ — quên một chỗ là dữ liệu mâu thuẫn. Quy tắc ngón tay cái: **nhúng cái đọc-cùng-nhau và ít đổi; tham chiếu (để riêng) cái đổi nhiều hoặc dùng chung rộng.**

🔁 **Dừng lại tự kiểm tra.** Một sản phẩm xuất hiện trong hàng triệu đơn hàng và giá đổi thường xuyên. Nên *nhúng* thông tin sản phẩm vào từng đơn, hay *tham chiếu* qua \`productId\`?

<details><summary>Đáp án</summary>

Nên **tham chiếu** qua \`productId\` (để dữ liệu sản phẩm ở chỗ riêng), vì giá đổi thường xuyên và dùng chung rộng — nhúng sẽ phải cập nhật hàng triệu chỗ mỗi lần đổi giá, rủi ro bất nhất rất cao. Tuy nhiên, *giá tại thời điểm mua* nên được **chụp lại (snapshot) nhúng vào đơn** vì đó là dữ liệu lịch sử, không được đổi theo giá hiện tại.
</details>

📝 **Tóm tắt mục 7.** SQL vs NoSQL là đánh đổi, không phải hơn-kém: SQL mạnh JOIN/transaction/nhất quán/truy vấn linh hoạt; NoSQL mạnh scale-out/linh hoạt schema. NoSQL không "luôn nhanh hơn". Denormalization đổi *đọc nhanh* lấy *trùng lặp + rủi ro bất nhất* — nhúng cái đọc-cùng & ít đổi, tham chiếu cái đổi nhiều.

---

## 8. Ứng dụng thực tế trong phần mềm

> 💡 **NoSQL không phải "tốt hơn SQL" — nó đánh đổi để thắng ở một số workload cụ thể.** Chọn sai (NoSQL khi cần join/transaction) là lỗi kiến trúc đắt giá.

| Loại NoSQL | Mạnh ở | Sản phẩm | Ví dụ dùng |
|------------|--------|----------|------------|
| **Document** (MongoDB) | Dữ liệu lồng nhau, schema linh hoạt | MongoDB, Couchbase | catalog sản phẩm, CMS, profile |
| **Key-value** (Redis) | Tra khóa cực nhanh, cache | Redis, DynamoDB | session, cache, rate-limit, leaderboard |
| **Column-family** (Cassandra) | Ghi nhiều, scale ngang | Cassandra, HBase | log, metrics, feed, IoT |
| **Graph** (Neo4j) | Quan hệ nhiều bậc | Neo4j | mạng xã hội, gợi ý, fraud detection |

### 8.1. Ví dụ cụ thể — khi nào MongoDB thắng, khi nào thua

**Thắng**: catalog sản phẩm, mỗi sản phẩm có cấu trúc khác nhau (áo có size, điện thoại có RAM/pin). SQL phải nhiều bảng + join hoặc cột NULL la liệt; MongoDB lưu mỗi sản phẩm một **document** JSON linh hoạt → đọc cả sản phẩm một phát.

**Thua**: hệ thống ngân hàng cần **transaction nhiều bảng** + join phức tạp + ràng buộc chặt. NoSQL truyền thống yếu join và (trước đây) yếu transaction đa-document → ép logic lên app, dễ sai. Đây là lý do "dùng MongoDB cho mọi thứ" là anti-pattern phổ biến.

> ⚠ **Đừng chọn NoSQL vì "nghe hiện đại".** Mặc định nên là **SQL (Postgres)** — nó mạnh, có transaction/join/constraint, và Postgres còn hỗ trợ JSON khi cần linh hoạt. Chỉ chọn NoSQL khi có lý do rõ: scale ghi khổng lồ (Cassandra), cache (Redis), quan hệ đồ thị (Neo4j). "Schema linh hoạt" thường là cái bẫy — thiếu kỷ luật schema gây dữ liệu lộn xộn về sau.

### 8.2. 📝 Tóm tắt mục 8

- NoSQL = đánh đổi để thắng workload cụ thể: **document** (linh hoạt), **key-value** (cache/nhanh), **column** (ghi nhiều), **graph** (quan hệ).
- MongoDB thắng ở dữ liệu lồng/schema thay đổi; thua ở transaction-join phức tạp.
- Mặc định SQL (Postgres, có cả JSON); chọn NoSQL khi có lý do scale/cache/graph rõ ràng.

## 9. Bài tập

1. **Chọn họ NoSQL cho use case.** Với mỗi tình huống, chọn họ phù hợp nhất (key-value / document / column-family / graph) và giải thích một câu:
   (a) Lưu giỏ hàng tạm, tra theo \`userId\`, cần độ trễ cực thấp.
   (b) Catalog sản phẩm: sách, áo, điện thoại mỗi loại có thuộc tính khác nhau.
   (c) Hệ gợi ý "người mua X cũng mua Y", cần duyệt quan hệ nhiều bậc.
   (d) Thu thập 200.000 bản ghi cảm biến IoT mỗi giây, truy vấn theo thiết bị + thời gian.

2. **Mô hình hóa: document vs quan hệ.** Cho thực thể \`User\` có: tên, email, một địa chỉ (đường/thành phố/zip), và danh sách số điện thoại. Hãy phác (a) cách biểu diễn **quan hệ** (mấy bảng, khóa gì) và (b) cách biểu diễn **document** JSON. Nêu một ưu điểm của mỗi cách cho thao tác "lấy toàn bộ thông tin một user".

3. **Khi nào dùng graph?** Giải thích vì sao truy vấn "bạn-của-bạn-của-bạn" (3 bậc) lại đắt trên DB quan hệ nhưng rẻ trên graph DB. Minh họa bằng số JOIN.

4. **SQL hay NoSQL?** Với mỗi bài toán, chọn SQL hay NoSQL (và họ nào nếu NoSQL), kèm lý do:
   (a) Hệ ngân hàng chuyển tiền giữa các tài khoản, cần ACID mạnh.
   (b) Cache kết quả truy vấn nặng để giảm tải DB chính.
   (c) Báo cáo BI ad-hoc: nhóm doanh thu theo nhiều chiều bất kỳ.
   (d) Lưu log sự kiện ứng dụng, khối lượng ghi rất lớn, ít truy vấn lại.

---

## 10. Lời giải chi tiết

### Bài 1 — Chọn họ NoSQL

| Tình huống | Họ | Vì sao |
| --- | --- | --- |
| (a) Giỏ hàng tra theo \`userId\`, độ trễ thấp | **Key-value** (Redis) | Luôn tra theo một khóa đã biết, value lấy nguyên cụm — đúng sở trường key-value |
| (b) Catalog mỗi loại thuộc tính khác nhau | **Document** (MongoDB) | Schema linh hoạt: mỗi document mang đúng trường của loại, tránh rừng cột NULL |
| (c) Gợi ý duyệt quan hệ nhiều bậc | **Graph** (Neo4j) | Duyệt cạnh nhiều bậc là sở trường graph; quan hệ tương tự đắt trên SQL |
| (d) 200k ghi/giây IoT theo thiết bị+thời gian | **Column-family** (Cassandra) | Ghi-nặng phân tán nhờ LSM-tree; query theo partition key (device) + dải thời gian |

### Bài 2 — Mô hình hóa document vs quan hệ

**(a) Quan hệ — 3 bảng (chuẩn hóa):**
- \`users(id PK, name, email)\`
- \`addresses(id PK, user_id FK, street, city, zip)\`
- \`phones(id PK, user_id FK, number)\`

Lấy toàn bộ thông tin user → JOIN \`users\` với \`addresses\` và \`phones\`. **Ưu điểm:** không trùng lặp, sửa địa chỉ một chỗ; toàn vẹn nhờ FK; mỗi user nhiều địa chỉ/điện thoại dễ mở rộng.

**(b) Document — một tài liệu tự chứa:**

\`\`\`json
{
  "_id": 42,
  "name": "An",
  "email": "an@example.com",
  "address": { "street": "12 Lê Lợi", "city": "Hanoi", "zip": "100000" },
  "phones": ["0901111111", "0902222222"]
}
\`\`\`

Lấy toàn bộ thông tin user → **một lần đọc** ra hết. **Ưu điểm:** đọc nhanh, không JOIN; cấu trúc gần với object trong code; thêm trường mới không cần migrate bảng.

> Đánh đổi: document trùng dữ liệu nếu cùng địa chỉ chia sẻ nhiều user (hiếm với địa chỉ cá nhân nên nhúng hợp lý); quan hệ phải JOIN nhưng tránh trùng lặp triệt để.

### Bài 3 — Khi nào dùng graph

Trong DB quan hệ, quan hệ bạn bè nằm ở bảng \`friends(user_id, friend_id)\`. "Bạn-của-bạn-của-bạn" (3 bậc) phải **self-join 3 lần**:

\`\`\`sql
SELECT DISTINCT f3.friend_id
FROM friends f1
JOIN friends f2 ON f2.user_id = f1.friend_id
JOIN friends f3 ON f3.user_id = f2.friend_id
WHERE f1.user_id = :an;
\`\`\`

Mỗi JOIN nhân số dòng trung gian: nếu mỗi người trung bình có \`d\` bạn, số dòng phải xử lý ~ \`d × d × d = d³\`. Với \`d = 200\` → ~8.000.000 dòng trung gian cho 1 người, mỗi bậc thêm lại nhân lên — chi phí tăng theo cấp số nhân.

Trên graph DB, mỗi đỉnh giữ **con trỏ trực tiếp** tới các đỉnh kề (adjacency). Duyệt 3 bậc chỉ đi theo cạnh từ điểm xuất phát, chi phí tỉ lệ với *số đỉnh thực sự chạm tới* quanh An, không phải tích Descartes của các bảng. Đó là lý do graph DB rẻ hơn nhiều cho truy vấn duyệt sâu.

### Bài 4 — SQL hay NoSQL

| Bài toán | Chọn | Lý do |
| --- | --- | --- |
| (a) Ngân hàng chuyển tiền, ACID mạnh | **SQL** (PostgreSQL) | Cần transaction ACID đa-bảng, nhất quán mạnh — sở trường quan hệ |
| (b) Cache kết quả truy vấn nặng | **NoSQL key-value** (Redis) | Tra theo khóa, độ trễ thấp, dữ liệu tạm, có thể tái tính nếu mất |
| (c) BI ad-hoc nhóm theo nhiều chiều | **SQL** (kho dữ liệu/OLAP) | Truy vấn tùy ý nhiều chiều cần SQL linh hoạt; NoSQL query-first không hợp |
| (d) Log sự kiện khối lượng ghi lớn | **NoSQL column-family** (Cassandra) | Ghi-nặng phân tán (LSM-tree), ít đọc lại — đúng kiểu time-series/log |

---

## 11. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — (1) bộ chọn họ NoSQL theo use case có phản hồi đúng/sai + lý do, (2) cùng một dữ liệu (user + orders) hiển thị ở 4 mô hình (bảng quan hệ / key-value / document JSON / graph SVG), (3) bảng tương tác SQL vs NoSQL highlight đánh đổi.

---

## Bài tiếp theo

→ [Lesson 03 — Replication & Sharding](../lesson-03-replication-sharding/): cơ chế nhân bản và chia dữ liệu ra nhiều máy — nền tảng kỹ thuật cho phép NoSQL mở rộng ngang. Sau đó [Lesson 04 — CAP & Consistency](../lesson-04-cap-consistency/) lý giải vì sao hệ phân tán phải đánh đổi giữa nhất quán và sẵn sàng.
`;
