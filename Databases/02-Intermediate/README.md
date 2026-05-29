# Nhóm 2 — Trung cấp (Intermediate)

Nhóm thứ hai của lĩnh vực [Databases](../README.md). Sau khi đã viết được SQL và thiết kế lược đồ ([Nhóm 1](../01-Foundations/)), nhóm này mở "nắp capo" để xem cơ chế bên trong — phần quyết định hiệu năng và sự đúng đắn của hệ thống thật.

## Nhóm này dạy gì?

- **Chuẩn hóa (normalization)**: loại bỏ trùng lặp và anomaly khi sửa/xóa dữ liệu.
- **Index**: cấu trúc giúp truy vấn nhanh, dựa trên B-tree và hash — và cái giá phải trả.
- **Transaction & ACID**: vì sao chuyển khoản không bao giờ làm "bốc hơi" tiền.
- **Concurrency control**: nhiều giao dịch chạy song song mà vẫn đúng — lock, MVCC, isolation level.
- **Query execution**: optimizer chọn cách thực thi nào, đọc `EXPLAIN` ra sao.
- **View, stored procedure, trigger**: logic chạy ngay trong database.

## Danh sách bài học

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Chuẩn hóa | Anomalies, 1NF → 3NF, BCNF, khi nào denormalize | [lesson-01-chuan-hoa](./lesson-01-chuan-hoa/) |
| 02 | Index | B-tree index, hash index, composite, covering, đánh đổi | [lesson-02-index](./lesson-02-index/) |
| 03 | Transaction & ACID | Atomicity, Consistency, Isolation, Durability | [lesson-03-transaction-acid](./lesson-03-transaction-acid/) |
| 04 | Concurrency & Isolation | Lock, MVCC, 4 isolation level và các anomaly | [lesson-04-concurrency-isolation](./lesson-04-concurrency-isolation/) |
| 05 | Query Execution & EXPLAIN | Optimizer, scan vs seek, join algorithm, query plan | [lesson-05-query-execution](./lesson-05-query-execution/) |
| 06 | View, Procedure, Trigger | View, materialized view, stored procedure, trigger | [lesson-06-view-procedure-trigger](./lesson-06-view-procedure-trigger/) |

## Sau nhóm này bạn sẽ

- Thiết kế lược đồ không bị anomaly, biết khi nào nên denormalize vì hiệu năng.
- Đặt index đúng chỗ và giải thích vì sao một truy vấn chậm.
- Hiểu transaction và isolation level đủ để tránh bug dữ liệu trong hệ thống nhiều người dùng.

Tiền đề: [Nhóm 1 — Nền tảng](../01-Foundations/). Tiếp theo: [Nhóm 3 — Nâng cao](../03-Advanced/).
