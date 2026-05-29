# Nhóm 1 — Nền tảng (Foundations)

Nhóm mở đầu của lĩnh vực [Databases](../README.md). Mục tiêu: từ chỗ chưa biết gì về cơ sở dữ liệu, bạn viết được câu lệnh SQL thực dụng và thiết kế được một lược đồ (schema) hợp lý.

## Nhóm này dạy gì?

- Vì sao cần DBMS thay vì lưu dữ liệu trong file phẳng (CSV, JSON).
- Mô hình quan hệ (relational model): table, row, column, key, schema.
- SQL từ cơ bản (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) đến trung cấp (`JOIN`, `GROUP BY`, subquery).
- Ràng buộc toàn vẹn dữ liệu: primary key, foreign key, unique, check.
- Thiết kế ER (entity-relationship) và ánh xạ sang bảng.

## Danh sách bài học

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Giới thiệu CSDL & DBMS | Database là gì, vì sao cần, file phẳng vs DBMS, OLTP/OLAP | [lesson-01-gioi-thieu-csdl](./lesson-01-gioi-thieu-csdl/) |
| 02 | Mô hình quan hệ | Table, row, column, schema, domain, NULL | [lesson-02-mo-hinh-quan-he](./lesson-02-mo-hinh-quan-he/) |
| 03 | SQL cơ bản | SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE | [lesson-03-sql-co-ban](./lesson-03-sql-co-ban/) |
| 04 | SQL trung cấp | JOIN, GROUP BY, aggregate, subquery, HAVING | [lesson-04-sql-trung-cap](./lesson-04-sql-trung-cap/) |
| 05 | Khóa & ràng buộc | Primary/foreign key, unique, check, referential integrity | [lesson-05-khoa-rang-buoc](./lesson-05-khoa-rang-buoc/) |
| 06 | Thiết kế ER & lược đồ | Entity-relationship, cardinality, ánh xạ ER → bảng | [lesson-06-thiet-ke-er](./lesson-06-thiet-ke-er/) |

## Sau nhóm này bạn sẽ

- Đọc và viết câu SQL nối nhiều bảng, gom nhóm và lọc kết quả tự tin.
- Thiết kế bảng với khóa và ràng buộc đúng, tránh dữ liệu rác.
- Vẽ được sơ đồ ER cho một nghiệp vụ và chuyển nó thành các bảng.

Tiếp theo: [Nhóm 2 — Trung cấp](../02-Intermediate/) (chuẩn hóa, index, transaction).
