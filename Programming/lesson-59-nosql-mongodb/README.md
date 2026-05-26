# Lesson 59 — NoSQL & MongoDB

> **Tier 5 · Database & Storage** — Khi dữ liệu không vừa với "bảng — hàng — cột" của SQL: tìm hiểu NoSQL, mô hình document của MongoDB, cách model dữ liệu (embed vs reference), và biết **chính xác khi nào** chọn NoSQL thay vì SQL.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **NoSQL là gì** và phân biệt 4 họ chính: document, key-value, column-family, graph — mỗi họ giải quyết vấn đề gì.
- So sánh **SQL vs NoSQL** trên các trục: schema, scaling, consistency, JOIN, transaction — và biết đây không phải "cái nào tốt hơn" mà là "cái nào hợp bài toán".
- Nắm **document model của MongoDB**: document (BSON), collection, schema-less.
- Quyết định đúng giữa **embed vs reference** khi model dữ liệu — biết trade-off và giới hạn 16MB.
- Viết được **CRUD MongoDB bằng Go** (`go.mongodb.org/mongo-driver`) với filter `bson.M`.
- Hiểu **index** (single / compound / text / geospatial) và vì sao COLLSCAN giết hiệu năng.
- Đọc và viết **aggregation pipeline** (`$match`, `$group`, `$sort`, `$lookup`, `$project`).
- Hiểu **CAP theorem**, **sharding**, **replica set** ở mức vận hành.
- Tránh 5 pitfall kinh điển: over-embed, over-reference (N+1), thiếu index, dùng MongoDB như SQL, schema-less mất kiểm soát.

## Kiến thức tiền đề

- [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/README.md): document MongoDB về bản chất là JSON/BSON; struct tag tương tự.
- [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/README.md): để so sánh được NoSQL với SQL, cần biết SQL làm gì.
- [Lesson 56 — Transaction & Isolation](../lesson-56-transactions-isolation/README.md): hiểu ACID trước khi nói "MongoDB cũng có transaction từ 4.0".
- [Lesson 58 — Redis & Caching](../lesson-58-redis-caching/README.md): Redis là một dạng NoSQL key-value — bài này mở rộng bức tranh.

---

## 1. NoSQL là gì?

> 💡 **Trực giác.** SQL giống tủ hồ sơ văn phòng: mọi tờ giấy phải đúng khuôn mẫu in sẵn (cùng số ô, cùng nhãn). Muốn thêm một ô mới? Phải in lại toàn bộ mẫu (ALTER TABLE). NoSQL giống một chiếc hộp: bạn nhét vào bất cứ tờ giấy nào, hình dạng nào cũng được. Linh hoạt hơn nhiều — nhưng đổi lại, chính bạn (chứ không phải cái tủ) phải nhớ tờ nào có nội dung gì.

**NoSQL = "Not Only SQL"** (không phải "No SQL"). Đây là nhóm các hệ cơ sở dữ liệu **không dùng mô hình quan hệ (relational)** bảng-hàng-cột cứng nhắc, không bắt buộc schema cố định, và thường được thiết kế để **mở rộng theo chiều ngang (horizontal scaling)** — thêm máy thay vì nâng cấp máy.

NoSQL ra đời (~2009) vì các công ty web khổng lồ (Google, Amazon, Facebook) gặp bài toán mà RDBMS truyền thống xử lý vất vả: **dữ liệu cực lớn, ghi liên tục, schema thay đổi nhanh, phân tán trên hàng nghìn máy**.

### 1.1 Bốn họ NoSQL chính

| Họ | Mô hình lưu trữ | Đại diện | Hợp với |
|----|-----------------|----------|---------|
| **Document** | Document JSON/BSON lồng nhau, nhóm thành collection | **MongoDB**, CouchDB | Dữ liệu phân cấp, schema linh hoạt (catalog, CMS, profile) |
| **Key-Value** | Cặp `key → value`, value là blob bất kỳ | **Redis**, DynamoDB, Memcached | Cache, session, đếm, leaderboard — tra cứu theo khóa cực nhanh |
| **Column-family** | Lưu theo cột, "wide row", phân tán mạnh | **Cassandra**, HBase, ScyllaDB | Ghi cực nhiều (time-series, log, IoT), write throughput khổng lồ |
| **Graph** | Node + edge (đỉnh + cạnh có thuộc tính) | **Neo4j**, JanusGraph | Quan hệ chằng chịt: mạng xã hội, fraud detection, recommendation |

> ❓ **Câu hỏi tự nhiên.**
> - *"Redis (Lesson 58) là NoSQL à?"* — Đúng, Redis là key-value store, một họ NoSQL. Bài này tập trung vào họ **document** với MongoDB, nhưng bức tranh NoSQL rộng hơn 1 sản phẩm.
> - *"Vậy NoSQL nhanh hơn SQL?"* — Không có chuyện "nhanh hơn" tổng quát. NoSQL nhanh hơn **cho một số pattern** (tra cứu theo key, đọc 1 document đã gom sẵn), nhưng chậm hơn hoặc không làm được với pattern khác (JOIN nhiều bảng, transaction phức tạp). Nhanh/chậm phụ thuộc bài toán.

### 1.2 Vì sao có nhiều họ đến vậy?

Mỗi họ **đánh đổi** một thứ để mạnh ở thứ khác:

- **Key-value** bỏ khả năng query phức tạp → đổi lấy tra cứu O(1) theo key và scale dễ.
- **Column-family** bỏ JOIN và transaction mạnh → đổi lấy write throughput khủng và phân tán.
- **Graph** bỏ scale ngang dễ dàng → đổi lấy traversal quan hệ nhiều cấp cực nhanh (bạn-của-bạn-của-bạn).
- **Document** giữ một phần khả năng query nhưng bỏ schema cứng và JOIN gốc → đổi lấy linh hoạt schema và đọc dữ liệu phân cấp trong 1 lần.

> 📝 **Tóm tắt mục 1.**
> - NoSQL = "Not Only SQL": không dùng mô hình quan hệ cứng, schema linh hoạt, ưu tiên scale ngang.
> - 4 họ: **document** (MongoDB), **key-value** (Redis), **column-family** (Cassandra), **graph** (Neo4j).
> - Không có họ nào "tốt nhất" — mỗi họ đánh đổi để mạnh ở một pattern cụ thể.

---

## 2. SQL vs NoSQL

> 💡 **Trực giác.** SQL như xây nhà bằng bê-tông cốt thép theo bản vẽ duyệt sẵn: chắc chắn, mọi phòng vuông vắn, nhưng muốn đập tường thêm phòng thì phải xin phép, đổ bê-tông lại. NoSQL như lắp nhà bằng container: dựng nhanh, đổi bố cục dễ, nhân bản ra cả khu công nghiệp dễ — nhưng kèo cột giữa các container do bạn tự nối, không có kỹ sư kết cấu lo hộ.

### 2.1 Bảng so sánh trục chính

| Trục | SQL (RDBMS: Postgres, MySQL) | NoSQL (MongoDB và họ document) |
|------|------------------------------|--------------------------------|
| **Schema** | Cứng — định nghĩa trước, `ALTER TABLE` để đổi | Linh hoạt — mỗi document có thể khác field |
| **Quan hệ** | JOIN gốc, foreign key, normalize | Không có JOIN gốc; embed hoặc `$lookup` |
| **Consistency** | ACID, strong consistency mặc định | Tunable; thường eventual khi phân tán |
| **Scaling** | Chủ yếu **vertical** (máy to hơn); shard khó | **Horizontal** native (sharding sẵn) |
| **Transaction** | Mạnh, multi-table, lâu đời | Có từ 4.0 (multi-document) nhưng tốn chi phí |
| **Query** | SQL chuẩn, mạnh, declarative | API/aggregation pipeline, không chuẩn hóa |
| **Phù hợp** | Dữ liệu quan hệ, báo cáo, tài chính | Dữ liệu phân cấp, schema động, scale lớn |

### 2.2 Hai khái niệm hay bị lẫn

**ACID (SQL truyền thống)** — 4 tính chất của transaction:
- **A**tomicity: hoặc tất cả thành công, hoặc rollback hết.
- **C**onsistency: dữ liệu luôn thỏa ràng buộc (constraint).
- **I**solation: giao dịch song song không giẫm lên nhau (xem [Lesson 56](../lesson-56-transactions-isolation/README.md)).
- **D**urability: commit rồi thì không mất, kể cả mất điện.

**Eventual consistency (nhiều NoSQL phân tán)** — sau khi ghi, các bản sao (replica) **cuối cùng** sẽ đồng bộ, nhưng trong một khoảng thời gian ngắn các node có thể trả về giá trị cũ.

> ⚠ **Lỗi thường gặp.** "NoSQL không có ACID" — **sai**. MongoDB có ACID ở mức 1 document từ lâu, và transaction multi-document từ 4.0. Cái đúng là: NoSQL **mặc định ưu tiên availability/scale hơn strong consistency** trong môi trường phân tán, nhưng vẫn có thể cấu hình chặt hơn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. SQL scale chủ yếu theo chiều nào? NoSQL theo chiều nào?
> 2. "Eventual consistency" nghĩa là gì?
>
> <details><summary>Đáp án</summary>
>
> 1. SQL: vertical (nâng cấp một máy). NoSQL: horizontal (thêm nhiều máy).
> 2. Sau khi ghi, các bản sao **cuối cùng** sẽ đồng bộ; trong khoảng ngắn có thể đọc được giá trị cũ.
> </details>

> 📝 **Tóm tắt mục 2.**
> - SQL: schema cứng, ACID, JOIN, vertical scale, mạnh về quan hệ + báo cáo.
> - NoSQL: schema linh hoạt, horizontal scale, thường eventual consistency, mạnh về scale + dữ liệu phân cấp.
> - "NoSQL không có ACID" là quan niệm sai — MongoDB có, chỉ là đánh đổi khác.

---

## 3. MongoDB — document model

> 💡 **Trực giác.** Trong SQL, một "đơn hàng" bị xé ra nhiều bảng: `orders`, `order_items`, `customers`, `addresses`. Muốn xem 1 đơn phải JOIN 4 bảng. Trong MongoDB, cả đơn hàng — kèm danh sách item, địa chỉ giao, thông tin khách rút gọn — nằm gọn trong **một document duy nhất**, đọc 1 phát ra hết.

### 3.1 Document, Collection, Database

- **Document**: đơn vị lưu trữ, là một bản ghi dạng JSON. Lưu nội bộ dưới định dạng nhị phân **BSON** (Binary JSON) — hỗ trợ thêm kiểu như `ObjectId`, `Date`, `Decimal128`, binary.
- **Collection**: nhóm các document (tương đương "table" trong SQL, nhưng không bắt buộc cùng schema).
- **Database**: nhóm các collection.

Ánh xạ thuật ngữ:

| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary key | `_id` (mặc định `ObjectId`) |
| JOIN | `$lookup` (aggregation) hoặc embed |

### 3.2 Một document trông như thế nào

```json
{
  "_id": ObjectId("652f1a..."),
  "title": "Học MongoDB",
  "author": "alice",
  "tags": ["nosql", "mongodb", "go"],
  "views": 1280,
  "comments": [
    { "user": "bob", "text": "Hay quá!", "at": ISODate("2026-05-20") },
    { "user": "carol", "text": "Cảm ơn", "at": ISODate("2026-05-21") }
  ],
  "meta": { "lang": "vi", "published": true }
}
```

Chú ý: document này có **mảng** (`tags`), **mảng object lồng nhau** (`comments`), và **object lồng** (`meta`). Trong SQL thuần, cấu trúc này phải tách ra ≥ 3 bảng. Ở MongoDB nó là **một** document.

### 3.3 Schema-less (flexible schema)

Hai document trong **cùng** collection có thể khác cấu trúc:

```json
{ "_id": 1, "name": "Áo thun", "size": "M", "color": "đỏ" }
{ "_id": 2, "name": "Sách Go", "pages": 320, "author": "alice", "isbn": "978-..." }
```

Cùng collection `products` nhưng field khác hẳn nhau. Hữu ích cho catalog đa dạng (quần áo, sách, đồ điện tử... mỗi loại có thuộc tính riêng).

> ⚠ **Lỗi thường gặp.** "Schema-less = không cần thiết kế schema" — **sai và nguy hiểm**. Schema-less nghĩa là DB **không ép** schema, nhưng ứng dụng vẫn cần một schema **ngầm định** nhất quán, nếu không bạn sẽ có document `age: 25`, `age: "25"`, `Age: 25`, `userAge: 25` lẫn lộn → code lọc chết. Production nên dùng **schema validation** của MongoDB (JSON Schema) để ràng buộc lại.

> 📝 **Tóm tắt mục 3.**
> - Document = JSON/BSON; Collection = nhóm document; Database = nhóm collection.
> - `_id` là primary key (mặc định `ObjectId`).
> - Document có thể lồng mảng + object → gom dữ liệu phân cấp vào 1 bản ghi.
> - Schema-less = DB không ép schema, **không** có nghĩa là không cần thiết kế schema.

---

## 4. Khi nào NoSQL phù hợp?

NoSQL (document) tỏa sáng khi gặp các đặc điểm sau:

1. **Schema thay đổi nhanh / chưa ổn định.** Startup giai đoạn đầu, sản phẩm pivot liên tục, thêm/bớt field hàng tuần. ALTER TABLE liên tục trên bảng lớn = đau đớn; document chỉ cần ghi thêm field.
2. **Cần scale ngang lớn.** Hàng chục triệu user, traffic phân tán toàn cầu. Sharding của MongoDB cho phép chia dữ liệu ra nhiều máy một cách native.
3. **Dữ liệu phân cấp / lồng nhau.** Profile người dùng (có address, preferences, settings lồng), product catalog, CMS content — đọc/ghi cả cụm cùng lúc.
4. **Write throughput cao.** Log, event tracking, IoT sensor, analytics — ghi liên tục với tốc độ lớn, ít cần JOIN.

> 💡 **Một câu để nhớ.** NoSQL document hợp khi bạn **đọc và ghi dữ liệu theo cụm gom sẵn**, ít khi cần ráp dữ liệu từ nhiều "bảng" lại với nhau.

---

## 5. Khi nào SQL tốt hơn?

Đừng "theo trend" — rất nhiều bài toán SQL vẫn là lựa chọn đúng:

1. **Dữ liệu quan hệ, JOIN nhiều.** Hệ thống có nhiều thực thể liên kết chằng chịt (đơn hàng ↔ sản phẩm ↔ kho ↔ nhà cung cấp ↔ khách). SQL với JOIN + foreign key xử lý gọn; ép vào document sẽ duplicate khủng khiếp.
2. **Transaction phức tạp.** Chuyển tiền ngân hàng: trừ tài khoản A, cộng tài khoản B, ghi log — phải atomic tuyệt đối, nhiều bảng. ACID của RDBMS là "đặc sản".
3. **Strong consistency bắt buộc.** Số dư tài khoản, tồn kho — không được phép đọc giá trị cũ dù chỉ 1 giây.
4. **Reporting / analytics ad-hoc.** SQL declarative + GROUP BY + window function + các BI tool quen thuộc xử lý báo cáo phức tạp tốt hơn aggregation pipeline.

> ⚠ **Lỗi thường gặp.** Chọn MongoDB cho hệ thống ngân hàng vì "nghe nói nhanh và hiện đại". Banking cần ACID multi-table mạnh, strong consistency, audit — đây là sân nhà của SQL. Dùng sai công cụ = nợ kỹ thuật khổng lồ.

> ❓ **Câu hỏi tự nhiên.** *"Vậy có thể dùng cả hai không?"* — Có, và rất phổ biến (gọi là **polyglot persistence**). Ví dụ: Postgres lưu order + payment (cần ACID), MongoDB lưu product catalog (schema động), Redis cache session, Elasticsearch lo full-text search. Mỗi DB làm việc nó giỏi nhất.

> 📝 **Tóm tắt mục 4–5.**
> - NoSQL hợp: schema động, scale ngang lớn, dữ liệu phân cấp, write throughput cao.
> - SQL hợp: quan hệ + JOIN nhiều, transaction phức tạp, strong consistency, reporting.
> - Thực tế thường **dùng cả hai** (polyglot persistence), mỗi DB cho phần nó giỏi.

---

## 6. Data modeling MongoDB — Embed vs Reference

Đây là **quyết định thiết kế quan trọng nhất** khi dùng MongoDB. Trong SQL bạn normalize (tách bảng); trong MongoDB bạn chọn giữa **gom vào (embed)** và **tham chiếu (reference)**.

### 6.1 Embed — nhúng document con vào document cha

```json
// post embed comments
{
  "_id": 1,
  "title": "Học MongoDB",
  "comments": [
    { "user": "bob", "text": "Hay quá!" },
    { "user": "carol", "text": "Cảm ơn" }
  ]
}
```

- **Khi nào:** quan hệ **1-to-few**, và dữ liệu con **luôn được đọc cùng** dữ liệu cha. Ví dụ kinh điển: bài viết + bình luận của nó, đơn hàng + các dòng hàng, profile + danh sách địa chỉ.
- **Ưu:** đọc **một** lần ra hết (không JOIN, không round-trip thêm) → cực nhanh cho read.
- **Nhược:** dữ liệu con **duplicate** nếu cần dùng ở nơi khác; document phồng to dần; vướng giới hạn **16MB/document**.

### 6.2 Reference — tham chiếu bằng ID (giống foreign key)

```json
// user (collection users)
{ "_id": "u1", "name": "alice" }

// order tham chiếu user (collection orders)
{ "_id": "o1", "user_id": "u1", "total": 250000 }
{ "_id": "o2", "user_id": "u1", "total":  90000 }
```

- **Khi nào:** quan hệ **1-to-many lớn** (một user có hàng nghìn đơn) hoặc **many-to-many** (sản phẩm ↔ tag dùng chung). Cũng dùng khi dữ liệu con sống độc lập, được cập nhật riêng.
- **Ưu:** không duplicate; document cha nhỏ gọn; con cập nhật một chỗ.
- **Nhược:** muốn ráp lại phải query thêm lần (hoặc `$lookup`); dễ dính **N+1 query** nếu code ngây thơ.

### 6.3 Cây quyết định nhanh

| Câu hỏi | → Embed | → Reference |
|---------|:------:|:----------:|
| Con có luôn đọc cùng cha không? | Có | Không |
| Số lượng con: few hay many lớn? | few (≤ vài chục) | many (hàng nghìn+) |
| Con có sống độc lập / dùng nhiều nơi? | Không | Có |
| Tổng size có nguy cơ chạm 16MB? | Không | Có (phải reference) |

> ⚠ **Lỗi thường gặp.**
> - **Over-embed:** nhúng comments vào post của một bài viral 2 triệu comment → document vượt 16MB, **không ghi được nữa**. Quan hệ "1-to-squillions" (vô số) **bắt buộc** reference.
> - **Over-reference:** tách mọi thứ ra y như SQL, đọc 1 post phải query thêm 5 collection → mất hết lợi thế "đọc 1 phát" của document.

> ❓ **Câu hỏi tự nhiên.** *"Có thể vừa embed vừa reference không?"* — Có, đây là pattern **extended reference / subset**: embed một **phần** dữ liệu hay dùng (vd `author_name` trong post để khỏi lookup), đồng thời giữ `author_id` để reference khi cần đầy đủ. Đánh đổi: một ít duplicate để đổi lấy đọc nhanh.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Quan hệ post ↔ comments của một bài viral nên embed hay reference? Vì sao?
> 2. Giới hạn kích thước 1 document MongoDB là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Reference — vì 1-to-squillions, embed sẽ vượt 16MB. (Bài thường, ít comment thì embed được.)
> 2. 16MB.
> </details>

> 📝 **Tóm tắt mục 6.**
> - **Embed**: 1-to-few, đọc cùng nhau → nhanh, nhưng duplicate + giới hạn 16MB.
> - **Reference**: 1-to-many lớn / many-to-many → không duplicate, nhưng cần query thêm (rủi ro N+1).
> - Cây quyết định: con đọc cùng cha? few hay many? sống độc lập? size?

---

## 7. CRUD MongoDB bằng Go

Driver chính thức: **`go.mongodb.org/mongo-driver`**. Filter và document biểu diễn bằng `bson.M` (map) hoặc `bson.D` (slice có thứ tự) hoặc struct với tag `bson:"..."`.

### 7.1 Kết nối

```go
import (
    "context"
    "time"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson"
)

ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
if err != nil { /* xử lý lỗi */ }
defer client.Disconnect(ctx)

coll := client.Database("blog").Collection("posts")
```

### 7.2 InsertOne — thêm document

```go
type Post struct {
    ID     primitive.ObjectID `bson:"_id,omitempty"`
    Title  string             `bson:"title"`
    Author string             `bson:"author"`
    Views  int                `bson:"views"`
}

res, err := coll.InsertOne(ctx, Post{Title: "Học MongoDB", Author: "alice", Views: 0})
// res.InsertedID là ObjectId được sinh tự động
```

### 7.3 Find — đọc nhiều document với filter

```go
// SQL tương đương: SELECT * FROM posts WHERE views > 18
filter := bson.M{"views": bson.M{"$gt": 18}}

cur, err := coll.Find(ctx, filter)
if err != nil { /* ... */ }
defer cur.Close(ctx)

var posts []Post
if err := cur.All(ctx, &posts); err != nil { /* ... */ }
```

Toán tử filter hay dùng: `$gt` `$gte` `$lt` `$lte` (so sánh), `$in` (thuộc tập), `$ne` (khác), `$and` `$or`, `$regex` (so khớp chuỗi).

### 7.4 UpdateOne — cập nhật

```go
// SQL tương đương: UPDATE posts SET views = views + 1 WHERE author = 'alice'
filter := bson.M{"author": "alice"}
update := bson.M{"$inc": bson.M{"views": 1}}  // $set để gán, $inc để cộng
res, err := coll.UpdateOne(ctx, filter, update)
// res.ModifiedCount số document bị sửa
```

### 7.5 DeleteOne — xóa

```go
filter := bson.M{"_id": someObjectID}
res, err := coll.DeleteOne(ctx, filter)
// res.DeletedCount
```

> ⚠ **Lỗi thường gặp.** Quên `$` trong update: viết `bson.M{"views": 1}` thay vì `bson.M{"$set": bson.M{"views": 1}}` → MongoDB tưởng bạn muốn **thay toàn bộ document** bằng `{views: 1}`, mất sạch field khác. Update operator **luôn** bắt đầu bằng `$`.

> 📝 **Tóm tắt mục 7.**
> - Driver: `go.mongodb.org/mongo-driver`; filter = `bson.M{...}`.
> - `InsertOne`, `Find`(+ `cur.All`), `UpdateOne`, `DeleteOne`.
> - Toán tử query: `$gt`, `$in`, `$or`...; update operator: `$set`, `$inc`... (luôn có `$`).

---

## 8. Index — tránh COLLSCAN

> 💡 **Trực giác.** Tìm một từ trong sách: không có mục lục thì lật từng trang (collection scan, COLLSCAN). Có mục lục (index) thì nhảy thẳng tới trang chứa từ. Index trong DB chính là "mục lục" cho field.

Không có index, MongoDB phải **quét toàn bộ collection** (COLLSCAN) cho mỗi query — O(n). Với 10 triệu document, một query lọc trở thành ác mộng.

### 8.1 Các loại index

| Loại | Tạo | Dùng cho |
|------|-----|----------|
| **Single field** | `{ author: 1 }` | Lọc/sort theo 1 field |
| **Compound** | `{ author: 1, createdAt: -1 }` | Query lọc nhiều field; thứ tự field quan trọng |
| **Text** | `{ title: "text" }` | Tìm kiếm full-text cơ bản |
| **Geospatial** | `{ location: "2dsphere" }` | Truy vấn theo tọa độ (gần đây, trong vùng) |

(`1` = tăng dần, `-1` = giảm dần.)

### 8.2 Quy tắc ESR cho compound index

Thứ tự field trong compound index nên theo **ESR**: **E**quality → **S**ort → **R**ange.

Ví dụ query: `find({author: "alice", views: {$gt: 100}}).sort({createdAt: -1})`
→ index nên là `{ author: 1, createdAt: -1, views: 1 }` (equality `author`, sort `createdAt`, range `views`).

```go
import "go.mongodb.org/mongo-driver/mongo"
coll.Indexes().CreateOne(ctx, mongo.IndexModel{
    Keys: bson.D{{Key: "author", Value: 1}, {Key: "createdAt", Value: -1}},
})
```

> ⚠ **Lỗi thường gặp.** Tạo index cho **mọi** field "cho chắc". Index tốn bộ nhớ và làm **chậm ghi** (mỗi insert/update phải cập nhật mọi index liên quan). Chỉ index những field thực sự được lọc/sort trong query pattern thật.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết query có dùng index hay COLLSCAN?"* — Chạy `db.coll.find(...).explain("executionStats")`. Nếu thấy `stage: "COLLSCAN"` là chưa có index phù hợp; `IXSCAN` là đang dùng index.

> 📝 **Tóm tắt mục 8.**
> - Không index → COLLSCAN (quét toàn bộ, O(n)).
> - Loại: single, compound, text, geospatial.
> - Compound theo ESR: Equality → Sort → Range.
> - Đừng index mọi field — tốn RAM, chậm ghi. Dùng `explain()` để kiểm tra.

---

## 9. Aggregation pipeline

> 💡 **Trực giác.** Aggregation pipeline giống dây chuyền nhà máy: document chảy qua từng trạm (stage), mỗi trạm biến đổi/lọc/gom rồi đẩy sang trạm sau. Output của stage trước là input của stage sau — y hệt pipe `|` trong shell.

Cú pháp: một mảng các **stage**, mỗi stage là một object `{ $operator: {...} }`.

| Stage | Vai trò | SQL tương đương |
|-------|---------|------------------|
| `$match` | Lọc document | `WHERE` |
| `$group` | Gom + tính tổng/đếm/trung bình | `GROUP BY` + aggregate |
| `$sort` | Sắp xếp | `ORDER BY` |
| `$project` | Chọn/đổi tên/tính field | `SELECT col AS ...` |
| `$lookup` | Nối collection khác (join-like) | `LEFT JOIN` |
| `$limit` / `$skip` | Phân trang | `LIMIT` / `OFFSET` |

### 9.1 Ví dụ: đếm số post mỗi tác giả, sort giảm dần

```go
pipeline := mongo.Pipeline{
    {{"$match", bson.D{{"published", true}}}},                       // chỉ bài đã publish
    {{"$group", bson.D{
        {"_id", "$author"},                                          // gom theo author
        {"count", bson.D{{"$sum", 1}}},                              // đếm
    }}},
    {{"$sort", bson.D{{"count", -1}}}},                              // nhiều nhất lên đầu
}
cur, err := coll.Aggregate(ctx, pipeline)
```

Tương đương SQL:
```sql
SELECT author, COUNT(*) AS count
FROM posts WHERE published = true
GROUP BY author ORDER BY count DESC;
```

### 9.2 $lookup — "JOIN" của MongoDB

```go
{{"$lookup", bson.D{
    {"from", "users"},            // collection cần nối
    {"localField", "author_id"},  // field bên này
    {"foreignField", "_id"},      // field bên kia
    {"as", "author_info"},        // kết quả gắn vào field này (mảng)
}}}
```

> ⚠ **Lỗi thường gặp.** Lạm dụng `$lookup` để mô phỏng cả schema SQL nhiều JOIN. `$lookup` **không có index trên foreignField được dùng tối ưu như JOIN của RDBMS** trong nhiều phiên bản, và nặng khi dữ liệu lớn. Nếu thấy mình `$lookup` 4-5 collection liên tục → dấu hiệu dữ liệu này vốn hợp SQL hơn (xem mục 5).

> 🔁 **Dừng lại tự kiểm tra.** Stage nào tương đương `WHERE`? Stage nào tương đương `GROUP BY`?
> <details><summary>Đáp án</summary>`$match` ↔ `WHERE`; `$group` ↔ `GROUP BY`.</details>

> 📝 **Tóm tắt mục 9.**
> - Pipeline = chuỗi stage, output stage trước → input stage sau.
> - `$match`(WHERE), `$group`(GROUP BY), `$sort`(ORDER BY), `$project`(SELECT), `$lookup`(JOIN).
> - Đặt `$match` sớm để lọc bớt trước khi `$group`/`$sort` (giảm dữ liệu xử lý).

---

## 10. Transaction trong MongoDB

Từ **MongoDB 4.0** (replica set) và **4.2** (sharded cluster), MongoDB hỗ trợ **multi-document ACID transaction** — nhiều thao tác trên nhiều document/collection thành một đơn vị atomic.

```go
session, err := client.StartSession()
defer session.EndSession(ctx)

_, err = session.WithTransaction(ctx, func(sc mongo.SessionContext) (interface{}, error) {
    if _, err := accounts.UpdateOne(sc, bson.M{"_id": "A"}, bson.M{"$inc": bson.M{"bal": -100}}); err != nil {
        return nil, err  // tự rollback
    }
    if _, err := accounts.UpdateOne(sc, bson.M{"_id": "B"}, bson.M{"$inc": bson.M{"bal": 100}}); err != nil {
        return nil, err
    }
    return nil, nil  // commit
})
```

> ⚠ **Lỗi thường gặp.** Coi transaction MongoDB như "miễn phí" giống RDBMS. Transaction multi-document trong MongoDB **tốn chi phí** (locking, oplog, có giới hạn thời gian ~60s mặc định). Nếu thiết kế document tốt (embed dữ liệu cần atomic vào **1 document**), bạn thường **không cần** transaction — vì ghi 1 document đã atomic sẵn. Transaction là "lưới an toàn", không phải pattern mặc định.

> ❓ **Câu hỏi tự nhiên.** *"Vậy khi nào thực sự cần transaction MongoDB?"* — Khi buộc phải cập nhật atomic trên **nhiều** document không thể gom làm một (vd chuyển tiền giữa 2 tài khoản nằm ở 2 document khác nhau). Nhưng nếu thường xuyên cần thế → cân nhắc liệu SQL có hợp hơn không.

---

## 11. CAP theorem

> 💡 **Trực giác.** Hình dung 2 nhân viên ngân hàng ở 2 chi nhánh, đường dây liên lạc giữa họ **đứt** (network partition). Một khách rút tiền ở chi nhánh A. Chi nhánh B giờ phải chọn: (a) **từ chối phục vụ** mọi giao dịch cho tới khi nối lại dây (giữ consistency, mất availability), hoặc (b) **vẫn phục vụ** dựa trên dữ liệu cũ, chấp nhận có thể sai số dư tạm thời (giữ availability, mất consistency). Không có cách thứ ba.

**CAP theorem** (Eric Brewer): một hệ phân tán chỉ có thể đảm bảo **2 trong 3** tính chất:

- **C — Consistency**: mọi node đọc cùng giá trị mới nhất.
- **A — Availability**: mọi request luôn nhận được phản hồi (không lỗi/treo).
- **P — Partition tolerance**: hệ vẫn hoạt động khi mạng giữa các node bị chia cắt.

Trong hệ phân tán thực, **P là bắt buộc** (mạng *sẽ* lỗi). Nên lựa chọn thực tế là **C hay A** khi partition xảy ra:

| Loại | Khi partition | Ví dụ |
|------|---------------|-------|
| **CP** | Hy sinh A: từ chối/chặn để giữ dữ liệu đúng | **MongoDB** (mặc định), HBase, Redis (single) |
| **AP** | Hy sinh C: vẫn trả lời, chấp nhận stale | Cassandra, DynamoDB, CouchDB |

> ⚠ **Lỗi thường gặp.** Hiểu CAP là "chọn 2 trong 3 lúc nào cũng vậy" — **không chính xác**. CAP chỉ nói về lúc **có partition**. Khi mạng bình thường (không partition), hệ có thể vừa C vừa A. CAP là đánh đổi **khi sự cố mạng xảy ra**.

> ❓ **Câu hỏi tự nhiên.** *"MongoDB là CP, vậy có nghĩa nó không available?"* — Không. CP nghĩa là **khi có partition**, MongoDB ưu tiên giữ consistency (vd secondary không nhận write, chỉ primary write). Lúc mạng ổn định, MongoDB available bình thường. Đọc/write concern còn cho phép tinh chỉnh cán cân này.

> 📝 **Tóm tắt mục 11.**
> - CAP: chỉ chọn 2 trong C/A/P **khi có network partition**.
> - P gần như bắt buộc → thực chất chọn **CP** hay **AP**.
> - MongoDB mặc định **CP** (ưu tiên consistency); Cassandra/DynamoDB thiên **AP**.

---

## 12. Sharding — chia ngang theo shard key

> 💡 **Trực giác.** Một thư viện 10 triệu cuốn không nhét vừa 1 tòa nhà. Chia ra: tòa A giữ sách tác giả vần A–H, tòa B vần I–P, tòa C vần Q–Z. Mỗi tòa nhỏ, tìm nhanh. "Vần chữ cái tác giả" chính là **shard key** — quy tắc quyết định dữ liệu nằm tòa nào.

**Sharding** chia một collection lớn thành nhiều phần (shard), mỗi shard nằm trên một máy/replica set khác nhau → scale ngang về dung lượng và throughput.

**Shard key** = field (hoặc tổ hợp field) dùng để quyết định document thuộc shard nào. Đây là quyết định **rất quan trọng và khó đổi sau này**.

Tiêu chí chọn shard key tốt:
- **High cardinality** (nhiều giá trị khác nhau) — để chia đều.
- **Phân tán ghi đều** — tránh "hot shard" nhận hết tải.
- **Khớp query pattern** — query thường lọc theo shard key để router gửi thẳng tới đúng shard (targeted query), thay vì hỏi mọi shard (scatter-gather).

> ⚠ **Lỗi thường gặp.** Chọn shard key tăng đơn điệu như `createdAt` hoặc `_id` mặc định (ObjectId tăng dần theo thời gian) → mọi ghi mới dồn vào **một** shard cuối cùng (monotonic hotspot). Giải pháp: hashed shard key, hoặc shard key tổng hợp có thành phần phân tán.

---

## 13. Replica set — primary + secondaries

> 💡 **Trực giác.** Một cửa hàng có 1 quầy chính (primary) ghi sổ, và vài quầy phụ (secondaries) chép lại y nguyên sổ đó. Nếu quầy chính cháy, một quầy phụ được bầu lên làm chính ngay (failover) — cửa hàng không đóng cửa.

**Replica set** = nhóm node giữ **cùng** dữ liệu:
- **Primary**: nhận mọi write; ghi vào oplog.
- **Secondaries**: replicate oplog từ primary, giữ bản sao.
- **Failover**: primary chết → các node bầu chọn (election) một secondary lên làm primary mới, tự động.

Lợi ích:
- **High availability**: mất 1 node không sập hệ thống.
- **Durability**: dữ liệu có nhiều bản sao.
- **Read scaling** (tùy chọn): cho phép đọc từ secondary (`readPreference: secondary`) để giảm tải primary — đổi lại có thể đọc dữ liệu hơi cũ (eventual consistency).

> ❓ **Câu hỏi tự nhiên.** *"Sharding và replica set khác gì nhau?"* — **Replica set** = nhiều bản **sao** của cùng dữ liệu (chống lỗi, đọc scale). **Sharding** = chia dữ liệu **khác nhau** ra nhiều nơi (scale dung lượng/ghi). Production lớn dùng **cả hai**: mỗi shard tự nó là một replica set.

> 📝 **Tóm tắt mục 12–13.**
> - **Sharding**: chia dữ liệu theo shard key → scale ngang. Chọn shard key kỹ (cardinality cao, phân tán đều, khớp query).
> - **Replica set**: primary + secondaries, failover tự động → HA + durability + read scaling.
> - Replica = nhân bản; shard = chia nhỏ. Hệ lớn dùng cả hai.

---

## 14. Common pitfalls — tổng hợp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Over-embed** | Document vượt 16MB, không ghi được | Quan hệ 1-to-squillions → reference |
| **Over-reference** | N+1 query, mất lợi thế "đọc 1 phát" | Embed dữ liệu thực sự đọc cùng nhau |
| **Thiếu index** | COLLSCAN, query chậm khủng khiếp | Index theo query pattern; dùng `explain()` |
| **Dùng MongoDB như SQL** | `$lookup` chồng chất, normalize quá đà | Model theo cách dữ liệu được dùng; quan hệ nặng → cân nhắc SQL |
| **Schema-less mất kiểm soát** | Field lẫn lộn (`age`/`Age`/`"25"`) | Schema validation (JSON Schema), kỷ luật ở tầng app |

> ❓ **Câu hỏi tự nhiên (gộp).** *"N+1 query là gì?"* — Lấy 1 danh sách N post (1 query), rồi với **mỗi** post lại query thêm để lấy author của nó (N query) → tổng 1+N query. Khắc phục: `$lookup` gom một lần, hoặc batch query `$in` theo danh sách author_id, hoặc embed sẵn thông tin author hay dùng.

---

## Bài tập

> Làm xong hãy đối chiếu với mục [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới.

**BT1.** Thiết kế document schema cho một **blog**: gồm `post`, `comment`, `author`. Quyết định embed hay reference cho từng quan hệ, giải thích lý do.

**BT2.** Viết hàm Go CRUD một `post` với MongoDB Go driver: `CreatePost`, `GetPostByID`, `IncrementViews`, `DeletePost`. (Dùng pseudo/skeleton; tham chiếu `solutions.go` đã mô phỏng API.)

**BT3.** Viết aggregation pipeline: **đếm số post mỗi author**, **sắp xếp giảm dần** theo số lượng. Cho cả phiên bản MongoDB pipeline và SQL tương đương.

**BT4.** Với 4 quan hệ sau, chọn **embed** hay **reference** và giải thích: (a) user ↔ profile, (b) post ↔ comments, (c) user ↔ orders, (d) product ↔ tags.

**BT5.** Cho query pattern: ứng dụng thường chạy `find({status: "active", category: X}).sort({createdAt: -1}).limit(20)`. Thiết kế index phù hợp và giải thích theo quy tắc ESR.

**BT6.** Với 4 use case, chọn **SQL** hay **NoSQL** và giải thích: (a) hệ thống ngân hàng, (b) social media feed, (c) IoT sensor data, (d) e-commerce product catalog.

---

## Lời giải chi tiết

### Lời giải BT1 — Schema blog

**Quan hệ và quyết định:**

- **post ↔ comments**: **Embed** (với điều kiện comment vừa phải). Comment hầu như luôn được đọc **cùng** post; quan hệ 1-to-few với phần lớn bài viết. Nhúng comments làm mảng trong post → đọc post là có luôn comment.
  - *Lưu ý:* nếu là bài viral hàng triệu comment → chuyển sang **reference** (comment riêng collection, có `post_id`) để tránh vượt 16MB.
- **post ↔ author**: **Reference** (+ extended reference). Một author viết nhiều post (1-to-many lớn) và author sống độc lập, dùng ở nhiều nơi. Lưu `author_id`. Có thể embed thêm `author_name` (extended reference) để hiển thị nhanh khỏi lookup.

```json
// collection: posts
{
  "_id": ObjectId("..."),
  "title": "Học MongoDB",
  "body": "...",
  "author_id": "u_alice",
  "author_name": "Alice",          // extended reference (subset)
  "tags": ["nosql", "go"],
  "comments": [                     // embed (1-to-few)
    { "user": "bob", "text": "Hay!", "at": ISODate("...") }
  ],
  "createdAt": ISODate("...")
}

// collection: authors
{ "_id": "u_alice", "name": "Alice", "bio": "...", "email": "..." }
```

**Cách tiếp cận:** với từng quan hệ, hỏi 3 câu (mục 6.3) — đọc cùng nhau? few hay many? sống độc lập? — rồi map sang embed/reference.

### Lời giải BT2 — CRUD post bằng Go

Skeleton dùng `go.mongodb.org/mongo-driver` (xem bản mô phỏng chạy được ở [solutions.go](./solutions.go)):

```go
type Post struct {
    ID     primitive.ObjectID `bson:"_id,omitempty"`
    Title  string             `bson:"title"`
    Author string             `bson:"author"`
    Views  int                `bson:"views"`
}

func CreatePost(ctx context.Context, coll *mongo.Collection, p Post) (primitive.ObjectID, error) {
    res, err := coll.InsertOne(ctx, p)
    if err != nil { return primitive.NilObjectID, err }
    return res.InsertedID.(primitive.ObjectID), nil
}

func GetPostByID(ctx context.Context, coll *mongo.Collection, id primitive.ObjectID) (Post, error) {
    var p Post
    err := coll.FindOne(ctx, bson.M{"_id": id}).Decode(&p)
    return p, err
}

func IncrementViews(ctx context.Context, coll *mongo.Collection, id primitive.ObjectID) error {
    _, err := coll.UpdateOne(ctx,
        bson.M{"_id": id},
        bson.M{"$inc": bson.M{"views": 1}}) // $inc tăng atomic, không cần đọc-rồi-ghi
    return err
}

func DeletePost(ctx context.Context, coll *mongo.Collection, id primitive.ObjectID) error {
    _, err := coll.DeleteOne(ctx, bson.M{"_id": id})
    return err
}
```

**Độ phức tạp:** mỗi thao tác theo `_id` (có index mặc định) là O(log n) trên B-tree index. Điểm cần nhớ: `IncrementViews` dùng `$inc` để cộng **atomic** ngay trong DB, tránh race condition của pattern đọc-cộng-ghi.

### Lời giải BT3 — Aggregation đếm post per author

```go
pipeline := mongo.Pipeline{
    {{"$group", bson.D{
        {"_id", "$author"},
        {"count", bson.D{{"$sum", 1}}},
    }}},
    {{"$sort", bson.D{{"count", -1}}}},
}
cur, _ := coll.Aggregate(ctx, pipeline)
// kết quả: [{ _id: "alice", count: 12 }, { _id: "bob", count: 7 }, ...]
```

SQL tương đương:
```sql
SELECT author AS _id, COUNT(*) AS count
FROM posts
GROUP BY author
ORDER BY count DESC;
```

**Cách tiếp cận:** `$group` với `_id = "$author"` gom các post cùng author; `$sum: 1` đếm mỗi document một lần; `$sort {count: -1}` đưa author nhiều post nhất lên đầu. Nếu chỉ quan tâm top N, thêm `$limit`.

### Lời giải BT4 — Embed vs reference cho 4 quan hệ

| Quan hệ | Quyết định | Lý do |
|---------|-----------|-------|
| **(a) user ↔ profile** | **Embed** | 1-to-1, profile luôn đọc cùng user, không sống độc lập → nhúng `profile` thành object con trong user. |
| **(b) post ↔ comments** | **Embed** (mặc định) | 1-to-few, đọc cùng nhau. *Trừ* bài viral → reference để tránh 16MB. |
| **(c) user ↔ orders** | **Reference** | 1-to-many **lớn** (user có thể có hàng nghìn đơn), order sống độc lập, được query/cập nhật riêng → order riêng collection với `user_id`. |
| **(d) product ↔ tags** | **Embed** (mảng) | Tag thường ít và đọc cùng product → embed mảng `tags: ["a","b"]`. *Nếu* cần quản lý tag như thực thể (đếm, mô tả, many-to-many phức tạp) → tách collection `tags` + reference. |

**Cách tiếp cận:** chiếu mỗi quan hệ qua cây quyết định mục 6.3. Điểm mấu chốt: (c) là 1-to-many **lớn** + độc lập → reference; ba cái còn lại đọc-cùng-nhau + số lượng nhỏ → embed.

### Lời giải BT5 — Index design

Query: `find({status: "active", category: X}).sort({createdAt: -1}).limit(20)`

Phân loại field theo **ESR**:
- **Equality**: `status` (= "active"), `category` (= X) — lọc bằng giá trị cụ thể.
- **Sort**: `createdAt` (giảm dần).
- **Range**: (không có).

→ Compound index: **`{ status: 1, category: 1, createdAt: -1 }`**

```go
coll.Indexes().CreateOne(ctx, mongo.IndexModel{
    Keys: bson.D{
        {Key: "status", Value: 1},
        {Key: "category", Value: 1},
        {Key: "createdAt", Value: -1},
    },
})
```

**Cách tiếp cận:** đặt các field equality lên đầu (thu hẹp tập kết quả nhanh), tiếp đến field sort theo đúng hướng (`-1` để khớp `sort desc`, tránh phải sort trong RAM), range cuối (ở đây không có). Index này cho phép MongoDB vừa lọc vừa lấy đúng thứ tự sort từ index, rồi `limit(20)` chỉ đọc 20 entry đầu — không COLLSCAN, không in-memory sort. Kiểm chứng bằng `explain()`: kỳ vọng `IXSCAN` + không có `SORT` stage.

### Lời giải BT6 — SQL vs NoSQL cho 4 use case

| Use case | Chọn | Lý do |
|----------|------|-------|
| **(a) Ngân hàng** | **SQL** | Strong consistency + ACID multi-table + audit bắt buộc. Số dư không được sai 1 giây. Sân nhà RDBMS. |
| **(b) Social media feed** | **NoSQL** (document/wide-column) | Schema linh hoạt (post nhiều loại), đọc/ghi phân cấp, scale ngang khổng lồ, chấp nhận eventual consistency (feed trễ vài giây ok). |
| **(c) IoT sensor data** | **NoSQL** (time-series / column-family như Cassandra, hoặc MongoDB time-series) | Write throughput cực cao, append-only, ít JOIN, schema theo thời gian. |
| **(d) E-commerce product catalog** | **NoSQL document** (MongoDB) | Catalog schema rất đa dạng (mỗi loại sản phẩm field khác nhau), đọc nguyên product 1 phát, schema động khi thêm danh mục mới. *(Phần order/payment của cùng hệ thống lại nên SQL — polyglot persistence.)* |

**Cách tiếp cận:** với mỗi use case, hỏi: cần ACID/strong consistency không? quan hệ + JOIN nặng không? schema động không? write throughput / scale ra sao? Banking nghiêng mọi tiêu chí về SQL; ba cái còn lại nghiêng về NoSQL ở các trục khác nhau.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — mô phỏng in-memory một MongoDB API tối giản (InsertOne / Find / UpdateOne với filter kiểu `bson.M`), kèm chạy demo CRUD + aggregation. Biên dịch được với `go run solutions.go`. Comment chỉ rõ đoạn nào tương ứng driver thật.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Embed vs Reference** — so sánh trực quan 2 cách model dữ liệu và chi phí query.
  2. **SQL vs NoSQL picker** — chọn use case → gợi ý SQL hay NoSQL kèm lý do.
  3. **Aggregation pipeline** — animate dữ liệu chảy qua `$match → $group → $sort`.

---

## Bài tiếp theo

- [Lesson 60 — Search & Elasticsearch](../lesson-60-search-elasticsearch/README.md): inverted index, query DSL, analyzer, relevance scoring — bổ sung khả năng full-text search mà cả SQL lẫn MongoDB đều làm hạn chế.
- Ôn lại [Lesson 58 — Redis & Caching](../lesson-58-redis-caching/README.md) (key-value NoSQL) để thấy bức tranh đầy đủ về các họ NoSQL.

> 💡 **Chốt bài.** NoSQL không "thay thế" SQL — nó **bổ sung**. Câu hỏi đúng không phải "SQL hay NoSQL?" mà là "**dữ liệu này được đọc/ghi theo pattern nào, và DB nào phục vụ pattern đó tốt nhất?**". Biết cả hai, chọn đúng công cụ — đó là kỹ năng của một backend engineer trưởng thành.
