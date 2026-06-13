# Nhóm 3 — Nâng cao — Cấu trúc dữ liệu nâng cao

Đồ thị, range query, và cấu trúc dùng trong hệ thống quy mô lớn. Tiền đề: hoàn thành Nhóm 1 và 2.

## Mục tiêu

- Biểu diễn đồ thị và chạy BFS / DFS / Dijkstra / topo sort.
- Dùng Union-Find (DSU) với path compression cho bài toán kết nối.
- Trả lời range query nhanh bằng Segment Tree / Fenwick (BIT).
- Hiểu các cấu trúc hệ thống: B-tree, Skip list, LSM-tree, Bloom filter.

## Lộ trình 4 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-graph/) | Graph | Biểu diễn, BFS, DFS, Dijkstra, topo, cycle |
| [Lesson 02](./lesson-02-union-find/) | Union-Find | Disjoint set, path compression, union by rank |
| [Lesson 03](./lesson-03-segment-tree/) | Segment Tree & Fenwick | Range query, lazy propagation, BIT |
| [Lesson 04](./lesson-04-advanced-structures/) | Advanced Structures | B-tree, Skip list, LSM-tree, Bloom filter |

Mỗi bài có:
- **README.md**: lý thuyết + ví dụ số cụ thể + bài tập + **lời giải chi tiết**.
- **solutions.go**: code Go biên dịch được (`go run solutions.go`).
- **visualization.html**: trang tương tác, mở trực tiếp trong trình duyệt là chạy. Có nút **📖 Đọc README** để xem lý thuyết song song.

## Mở trang chủ nhóm

[`index.html`](./index.html) — danh sách card cho tất cả bài, link nhanh tới visualization và README.

## Sau khi xong nhóm này

Đây là nhóm cuối của DataStructures. Bước tiếp theo: **[Algorithms](../../Algorithms/README.md)** — sắp xếp, tìm kiếm, quy hoạch động, đồ thị nâng cao (đã có, ~52 lesson).
