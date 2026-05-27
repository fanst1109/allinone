# DataStructures — Cấu trúc dữ liệu

Thư mục này tập hợp các bài học về **cấu trúc dữ liệu (data structures)** — cách tổ chức và lưu trữ dữ liệu trong bộ nhớ để các thao tác truy cập, tìm kiếm, thêm, xóa diễn ra hiệu quả.

## Mục tiêu

- Hiểu khái niệm cấu trúc dữ liệu và vai trò của nó trong lập trình.
- Nắm được đặc điểm, ưu nhược điểm, và độ phức tạp (complexity) của từng cấu trúc.
- Biết cách lựa chọn cấu trúc phù hợp cho từng bài toán.

## Các nhóm (tier)

15 bài chia thành 3 nhóm theo độ khó, học tuần tự (nhóm sau dùng kiến thức nhóm trước):

| Nhóm | Liên kết | Nội dung chính |
| --- | --- | --- |
| 1 — Cơ bản | [01-Basic](./01-Basic/) | Big-O, Array, Linked List, Stack, Queue, Hash Table |
| 2 — Trung cấp | [02-Intermediate](./02-Intermediate/) | Tree, BST, Heap & Priority Queue, Balanced Trees, Trie |
| 3 — Nâng cao | [03-Advanced](./03-Advanced/) | Graph, Union-Find, Segment Tree & Fenwick, Advanced Structures |

## Danh sách bài học

### Nhóm 1 — Cơ bản ([01-Basic](./01-Basic/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Giới thiệu | Khái niệm, phân loại, Big-O chi tiết | [lesson-01-introduction](./01-Basic/lesson-01-introduction/) |
| 02 | Array | Mảng tĩnh / động, truy cập theo chỉ số | [lesson-02-array](./01-Basic/lesson-02-array/) |
| 03 | Linked List | Singly, doubly, circular | [lesson-03-linked-list](./01-Basic/lesson-03-linked-list/) |
| 04 | Stack | LIFO, ứng dụng, cài đặt | [lesson-04-stack](./01-Basic/lesson-04-stack/) |
| 05 | Queue | FIFO, circular queue, deque, priority queue | [lesson-05-queue](./01-Basic/lesson-05-queue/) |
| 06 | Hash Table | Hash function, collision, load factor | [lesson-06-hash-table](./01-Basic/lesson-06-hash-table/) |

### Nhóm 2 — Trung cấp ([02-Intermediate](./02-Intermediate/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Tree | Thuật ngữ, binary tree, các cách duyệt | [lesson-01-tree](./02-Intermediate/lesson-01-tree/) |
| 02 | Binary Search Tree | BST, search/insert/delete | [lesson-02-binary-search-tree](./02-Intermediate/lesson-02-binary-search-tree/) |
| 03 | Heap & Priority Queue | Min/max heap, heapify, ứng dụng | [lesson-03-heap-priority-queue](./02-Intermediate/lesson-03-heap-priority-queue/) |
| 04 | Balanced Trees | AVL, Red-Black tree | [lesson-04-balanced-trees](./02-Intermediate/lesson-04-balanced-trees/) |
| 05 | Trie | Cây tiền tố, autocomplete | [lesson-05-trie](./02-Intermediate/lesson-05-trie/) |

### Nhóm 3 — Nâng cao ([03-Advanced](./03-Advanced/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Graph | Biểu diễn, BFS, DFS, Dijkstra | [lesson-01-graph](./03-Advanced/lesson-01-graph/) |
| 02 | Union-Find | Disjoint set, path compression | [lesson-02-union-find](./03-Advanced/lesson-02-union-find/) |
| 03 | Segment Tree & Fenwick | Range query, lazy propagation, BIT | [lesson-03-segment-tree](./03-Advanced/lesson-03-segment-tree/) |
| 04 | Advanced Structures | B-tree, Skip list, LSM-tree, Bloom filter | [lesson-04-advanced-structures](./03-Advanced/lesson-04-advanced-structures/) |

## Lộ trình gợi ý

- **Nhóm 1 — Cơ bản**: Hoàn thành xong là đã có nền tảng cho phần lớn bài toán phỏng vấn và project thực tế.
- **Nhóm 2 — Trung cấp**: Cây và các biến thể, hash + trie — đủ cho thuật toán nâng cao.
- **Nhóm 3 — Nâng cao**: Đồ thị, range query, và cấu trúc trong hệ thống quy mô lớn.

Có thể nhảy cóc nếu đã biết phần nào, nhưng nên đọc bài đầu tiên của Nhóm 1 (Giới thiệu) trước vì các phần Big-O sẽ được tham chiếu liên tục.
