# Nhóm 3 — Nâng cao (Advanced)

Nhóm cuối của lĩnh vực [Databases](../README.md). Khi dữ liệu và lưu lượng vượt quá khả năng của một máy đơn, ta cần hiểu storage engine hoạt động ra sao và thế giới phân tán vận hành thế nào.

## Nhóm này dạy gì?

- **Storage engine**: dữ liệu nằm trên đĩa thế nào — page, heap file, buffer pool, write-ahead log (WAL), B-tree vs LSM-tree.
- **NoSQL**: bốn họ chính (key-value, document, column-family, graph) và khi nào dùng thay vì SQL.
- **Replication & Sharding**: nhân bản dữ liệu nhiều máy, chia dữ liệu theo phân vùng.
- **CAP theorem**: vì sao hệ phân tán phải đánh đổi giữa nhất quán và sẵn sàng khi mạng phân mảnh.
- **Data Warehouse & OLAP**: hệ phân tích khác hệ giao dịch ra sao, star schema, lưu trữ theo cột.

## Danh sách bài học

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Storage Engine | Page, heap file, buffer pool, WAL, B-tree vs LSM-tree | [lesson-01-storage-engine](./lesson-01-storage-engine/) |
| 02 | NoSQL | Key-value, document, column-family, graph — khi nào dùng | [lesson-02-nosql](./lesson-02-nosql/) |
| 03 | Replication & Sharding | Leader-follower, đồng bộ/bất đồng bộ, partition/shard | [lesson-03-replication-sharding](./lesson-03-replication-sharding/) |
| 04 | CAP & Nhất quán phân tán | CAP theorem, eventual consistency, quorum | [lesson-04-cap-consistency](./lesson-04-cap-consistency/) |
| 05 | Data Warehouse & OLAP | OLTP vs OLAP, star/snowflake schema, lưu trữ theo cột | [lesson-05-data-warehouse-olap](./lesson-05-data-warehouse-olap/) |

## Sau nhóm này bạn sẽ

- Giải thích vì sao PostgreSQL (B-tree) và Cassandra (LSM-tree) tối ưu cho tải khác nhau.
- Chọn được loại NoSQL phù hợp cho một bài toán cụ thể.
- Hiểu CAP đủ để không kỳ vọng "vừa nhất quán tuyệt đối vừa luôn sẵn sàng" trong hệ phân tán.

Tiền đề: [Nhóm 2 — Trung cấp](../02-Intermediate/). Liên quan: [LSM-tree & Bloom filter](../../DataStructures/03-Advanced/lesson-04-advanced-structures/).
