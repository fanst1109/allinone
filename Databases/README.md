# Databases — Cơ sở dữ liệu

Thư mục này tập hợp các bài học về **cơ sở dữ liệu (database)** — cách lưu trữ, tổ chức, truy vấn và bảo vệ dữ liệu một cách bền vững, nhất quán và hiệu quả ở quy mô lớn.

## Mục tiêu

- Hiểu vì sao cần một hệ quản trị cơ sở dữ liệu (DBMS) thay vì lưu dữ liệu trong file phẳng.
- Thành thạo **mô hình quan hệ (relational model)** và ngôn ngữ truy vấn **SQL** — từ `SELECT` cơ bản đến `JOIN`, `GROUP BY`, subquery.
- Biết thiết kế lược đồ (schema) đúng: khóa, ràng buộc, chuẩn hóa (normalization), mô hình ER.
- Nắm các cơ chế bên trong: **index**, **transaction & ACID**, **concurrency control**, query optimizer, storage engine.
- Hiểu bức tranh phân tán hiện đại: **NoSQL**, replication, sharding, **CAP theorem**, OLTP vs OLAP.

## Các nhóm (tier)

17 bài chia thành 3 nhóm theo độ khó, học tuần tự (nhóm sau dùng kiến thức nhóm trước):

| Nhóm | Liên kết | Nội dung chính |
| --- | --- | --- |
| 1 — Nền tảng | [01-Foundations](./01-Foundations/) | DBMS, mô hình quan hệ, SQL cơ bản & trung cấp, khóa & ràng buộc, ER |
| 2 — Trung cấp | [02-Intermediate](./02-Intermediate/) | Chuẩn hóa, Index, Transaction & ACID, Concurrency, Query Execution, View/Procedure/Trigger |
| 3 — Nâng cao | [03-Advanced](./03-Advanced/) | Storage Engine, NoSQL, Replication & Sharding, CAP, Data Warehouse & OLAP |

## Danh sách bài học

### Nhóm 1 — Nền tảng ([01-Foundations](./01-Foundations/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Giới thiệu CSDL & DBMS | Database là gì, vì sao cần, file phẳng vs DBMS, OLTP/OLAP | [lesson-01-gioi-thieu-csdl](./01-Foundations/lesson-01-gioi-thieu-csdl/) |
| 02 | Mô hình quan hệ | Table, row, column, schema, domain, NULL, quan hệ toán học | [lesson-02-mo-hinh-quan-he](./01-Foundations/lesson-02-mo-hinh-quan-he/) |
| 03 | SQL cơ bản | SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE | [lesson-03-sql-co-ban](./01-Foundations/lesson-03-sql-co-ban/) |
| 04 | SQL trung cấp | JOIN, GROUP BY, aggregate, subquery, HAVING | [lesson-04-sql-trung-cap](./01-Foundations/lesson-04-sql-trung-cap/) |
| 05 | Khóa & ràng buộc | Primary/foreign key, unique, check, referential integrity | [lesson-05-khoa-rang-buoc](./01-Foundations/lesson-05-khoa-rang-buoc/) |
| 06 | Thiết kế ER & lược đồ | Entity-relationship, cardinality, ánh xạ ER → bảng | [lesson-06-thiet-ke-er](./01-Foundations/lesson-06-thiet-ke-er/) |

### Nhóm 2 — Trung cấp ([02-Intermediate](./02-Intermediate/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Chuẩn hóa | Anomalies, 1NF → 3NF, BCNF, khi nào denormalize | [lesson-01-chuan-hoa](./02-Intermediate/lesson-01-chuan-hoa/) |
| 02 | Index | B-tree index, hash index, composite, covering, đánh đổi | [lesson-02-index](./02-Intermediate/lesson-02-index/) |
| 03 | Transaction & ACID | Atomicity, Consistency, Isolation, Durability, commit/rollback | [lesson-03-transaction-acid](./02-Intermediate/lesson-03-transaction-acid/) |
| 04 | Concurrency & Isolation | Lock, MVCC, 4 isolation level và các anomaly | [lesson-04-concurrency-isolation](./02-Intermediate/lesson-04-concurrency-isolation/) |
| 05 | Query Execution & EXPLAIN | Optimizer, scan vs seek, join algorithm, đọc query plan | [lesson-05-query-execution](./02-Intermediate/lesson-05-query-execution/) |
| 06 | View, Procedure, Trigger | View, materialized view, stored procedure, trigger | [lesson-06-view-procedure-trigger](./02-Intermediate/lesson-06-view-procedure-trigger/) |

### Nhóm 3 — Nâng cao ([03-Advanced](./03-Advanced/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Storage Engine | Page, heap file, buffer pool, WAL, B-tree vs LSM-tree | [lesson-01-storage-engine](./03-Advanced/lesson-01-storage-engine/) |
| 02 | NoSQL | Key-value, document, column-family, graph — khi nào dùng | [lesson-02-nosql](./03-Advanced/lesson-02-nosql/) |
| 03 | Replication & Sharding | Leader-follower, đồng bộ/bất đồng bộ, partition/shard | [lesson-03-replication-sharding](./03-Advanced/lesson-03-replication-sharding/) |
| 04 | CAP & Nhất quán phân tán | CAP theorem, eventual consistency, quorum | [lesson-04-cap-consistency](./03-Advanced/lesson-04-cap-consistency/) |
| 05 | Data Warehouse & OLAP | OLTP vs OLAP, star/snowflake schema, lưu trữ theo cột | [lesson-05-data-warehouse-olap](./03-Advanced/lesson-05-data-warehouse-olap/) |

## Lộ trình gợi ý

- **Nhóm 1 — Nền tảng**: Học xong là viết được SQL cho phần lớn ứng dụng thực tế và thiết kế được lược đồ hợp lý.
- **Nhóm 2 — Trung cấp**: Hiểu cơ chế bên trong (index, transaction, concurrency) — phần quyết định hiệu năng và đúng đắn của hệ thống thật.
- **Nhóm 3 — Nâng cao**: Storage engine và thế giới phân tán (NoSQL, replication, CAP) — cần khi hệ thống vượt quá một máy đơn.

## Liên hệ với các lĩnh vực khác

- **Index** dựa trực tiếp trên [B-tree](../DataStructures/02-Intermediate/lesson-04-balanced-trees/) và [Hash Table](../DataStructures/01-Basic/lesson-06-hash-table/); storage engine dùng [LSM-tree & Bloom filter](../DataStructures/03-Advanced/lesson-04-advanced-structures/).
- **Mô hình quan hệ** là ứng dụng trực tiếp của [lý thuyết tập hợp & quan hệ](../DataFoundations/02-SetTheory/).
- **Query optimizer** dùng kiến thức [sắp xếp & hashing](../Algorithms/) để chọn join algorithm.
