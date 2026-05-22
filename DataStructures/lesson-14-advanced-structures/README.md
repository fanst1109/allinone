# Lesson 14 — Advanced Structures (B-Tree, Skip List, LSM-Tree, Bloom Filter)

## Mục tiêu học tập

- Biết tổng quan các cấu trúc dùng trong **hệ thống thực tế** (database, file system, distributed).
- Hiểu **đánh đổi (trade-off)** giữa thời gian, bộ nhớ, ổ đĩa, xác suất.

## Kiến thức tiền đề

- Toàn bộ các lesson từ 00 đến 13.

Đây là bài tổng kết nâng cao — mỗi cấu trúc chỉ giới thiệu ý tưởng cốt lõi và ứng dụng, không đi sâu cài đặt.

## 1. B-Tree và B+ Tree

### 1.1. Vấn đề

Cây nhị phân cân bằng có chiều cao `log₂ n`. Với `n = 10⁹` thì chiều cao ≈ 30. Nếu mỗi node nằm trên một block đĩa khác nhau → 30 lần đọc đĩa, chậm.

**Ý tưởng**: cho mỗi node chứa **nhiều khóa** (vài trăm) → chiều cao giảm mạnh.

### 1.2. B-Tree

- Mỗi node chứa tối đa `m-1` khóa và `m` con.
- Cây cân bằng tự động khi insert/delete (split/merge node).
- Chiều cao: `O(log_m n)`.

Với `m ≈ 256`, cây có 10⁹ phần tử chỉ cao 4-5 → chỉ 4-5 lần đọc đĩa.

### 1.3. B+ Tree

Biến thể: chỉ **lá** chứa dữ liệu, các node trong chỉ chứa key dẫn đường. Các lá nối thành **linked list** → duyệt theo khoảng cực nhanh.

### 1.4. Ứng dụng

- **Database index**: MySQL InnoDB, PostgreSQL.
- **File system**: NTFS, ext4, HFS+, Btrfs.

## 2. Skip List

### 2.1. Ý tưởng

Một linked list "có nhiều tầng": tầng 0 là toàn bộ phần tử; tầng trên chỉ chứa một số phần tử, mỗi tầng bỏ qua một nửa (xác suất).

```
tầng 2:  A -----------------> E
tầng 1:  A -----> C --------> E
tầng 0:  A -> B -> C -> D -> E
```

Tìm kiếm đi từ tầng cao xuống, mỗi tầng bỏ qua nhiều node → `O(log n)` xác suất.

### 2.2. Ưu

- Cài đặt **đơn giản hơn balanced tree** rất nhiều.
- Lock-free / concurrent friendly.

### 2.3. Ứng dụng

- **Redis sorted set** (`ZSET`).
- LevelDB internal.

## 3. LSM-Tree (Log-Structured Merge Tree)

### 3.1. Ý tưởng

Thiết kế tối ưu cho **ghi**: thay vì update tại chỗ, ghi mọi thứ vào **memtable** (bộ nhớ), khi đầy thì flush thành file bất biến (SSTable) trên đĩa. Định kỳ **merge** các SSTable.

### 3.2. Trade-off

- **Ghi rất nhanh** (sequential, không random).
- **Đọc chậm hơn** (phải tra trong nhiều SSTable; thường kết hợp với Bloom filter).
- **Compaction** nền tốn IO.

### 3.3. Ứng dụng

- **LevelDB**, **RocksDB**.
- **Cassandra**, **HBase**, **ScyllaDB**.

## 4. Bloom Filter

### 4.1. Ý tưởng

Cấu trúc xác suất kiểm tra "phần tử có trong tập hay không":

- **Không có sai âm** (false negative = 0).
- **Có thể sai dương** (false positive > 0).

Dùng `k` hàm hash, đẩy mỗi key vào `k` vị trí trong một mảng bit. Kiểm tra: cả `k` bit đều bật → "có thể" có; có bit nào tắt → chắc chắn không.

### 4.2. Trade-off

- Cực kỳ tiết kiệm bộ nhớ (~10 bit/phần tử).
- Không hỗ trợ xóa (biến thể: Counting Bloom Filter).
- Sai dương có thể giảm bằng tăng kích thước/bit.

### 4.3. Ứng dụng

- Trước khi tra đĩa: kiểm tra nhanh "key có khả năng tồn tại không" → tránh IO vô ích.
- Web crawler: tránh thăm URL trùng.
- Cassandra, HBase, Bigtable.

## 5. Các cấu trúc khác (chỉ điểm danh)

| Cấu trúc | Mục đích |
| --- | --- |
| **Treap** | BST + heap với priority ngẫu nhiên |
| **Splay Tree** | Truy cập gần đây đưa lên gần root |
| **Suffix Array / Suffix Tree** | Xử lý chuỗi, tìm xâu con |
| **Persistent DS** | Giữ mọi phiên bản trước đó |
| **Rope** | Lưu chuỗi dài, hỗ trợ insert/delete giữa |
| **Quadtree / Octree** | Không gian 2D / 3D, đồ họa |
| **R-Tree** | Index không gian (geo) |
| **HyperLogLog** | Đếm số phần tử khác nhau (cardinality) xấp xỉ |
| **Count-Min Sketch** | Đếm tần suất xấp xỉ trên stream |
| **Cuckoo Hashing / Cuckoo Filter** | Hash table tránh đụng độ; thay thế Bloom có xóa |

## 6. Tổng kết khóa học

| Lĩnh vực | Cấu trúc đã học |
| --- | --- |
| Tuyến tính cơ bản | Array, Linked List, Stack, Queue |
| Liên kết khóa-giá trị | Hash Table |
| Phi tuyến — cây | Tree, BST, AVL, Red-Black, Heap, Trie |
| Phi tuyến — đồ thị | Graph, Union-Find |
| Truy vấn khoảng | Segment Tree, Fenwick Tree |
| Hệ thống / xác suất | B-Tree, Skip List, LSM-Tree, Bloom Filter |

**Lời khuyên**:
- Khi gặp bài toán mới, hỏi: thao tác nào diễn ra thường xuyên nhất? Có cần thứ tự? Có cần khoảng?
- Đừng tối ưu sớm: array + hash table đã giải quyết phần lớn bài toán thực tế.
- Cấu trúc nâng cao thường xuất hiện trong **hệ thống quy mô lớn** — học chúng để hiểu cách database / search engine hoạt động bên trong.

## Bài tập

1. Vì sao database thường dùng B+ tree thay vì BST cân bằng thông thường?
2. Bloom filter có thể nhầm hai chiều không? Nếu kết quả là "không có" thì có chắc chắn không?
3. So sánh LSM-tree và B-tree về workload **ghi nhiều** và **đọc nhiều**.
4. Khi nào nên dùng skip list thay vì balanced tree?
5. Thiết kế (ý tưởng) một cấu trúc đếm số lượt xem **xấp xỉ** cho một website 1 tỷ URL trong RAM 1GB.

## Lời giải chi tiết

### Bài 1 — Vì sao DB dùng B+ tree thay vì BST cân bằng?
- **Đặc thù ổ đĩa**: đọc từ disk theo block (4-16 KB). Mỗi lần đọc 1 node, ta muốn lấy được càng nhiều khóa càng tốt.
- BST cân bằng (Red-Black/AVL): mỗi node chỉ chứa 1 khóa, cây cao ~`log₂ n`. Với `n = 10⁹` → chiều cao ~30 → 30 lần đọc đĩa.
- B+ tree với `m ≈ 256`: chiều cao `log_m n` ~ 4-5 → 4-5 lần đọc đĩa, nhanh hơn ~6 lần.
- B+ tree còn có **lá nối thành linked list** → range query (`WHERE age BETWEEN 20 AND 30`) cực nhanh: tìm `20`, duyệt lá tới `30`.

### Bài 2 — Bloom filter
- **Không có sai âm** (false negative): nếu Bloom nói "không có", thì chắc chắn không có (vì tất cả bit từng được đặt khi thêm, nay vẫn còn).
- **Có thể sai dương** (false positive): có bit nào đó được set bởi phần tử khác → Bloom nói "có thể có" trong khi thực ra không.

Kết luận "không có" là **chắc chắn**, kết luận "có" cần phải kiểm tra thật (truy đĩa).

### Bài 3 — LSM-tree vs B-tree
| Workload | LSM-tree | B-tree |
| --- | --- | --- |
| Ghi nhiều | **Thắng** — ghi tuần tự, không update tại chỗ | Có thể bị bottleneck do random write |
| Đọc nhiều | Thường chậm hơn (phải tra trong nhiều SSTable + Bloom) | **Thắng** — tra theo cây, ít disk seek |
| Range query | Tốt nếu compaction tốt | **Thắng** (B+ tree với lá nối) |
| Update tại chỗ | Append-only → tốn dung lượng do "tombstone" | In-place |
| Compaction nền | **Tốn IO**, có thể ảnh hưởng tail latency | Không cần |

→ LSM cho **time-series, log, write-heavy**. B-tree cho **OLTP**.

### Bài 4 — Khi nào dùng skip list thay balanced tree?
- Cài đặt **đơn giản hơn nhiều** (vài chục dòng vs hàng trăm dòng cho RB tree).
- **Concurrent-friendly**: dễ làm lock-free (Redis dùng cho ZSET vì Lua single-thread không vấn đề, nhưng kiến trúc dễ mở rộng).
- Trade-off: dùng nhiều bộ nhớ hơn (mỗi phần tử có nhiều tầng).
- Performance xấp xỉ balanced tree trong thực tế.

### Bài 5 — Thiết kế đếm view xấp xỉ cho 1 tỷ URL trong 1 GB RAM
Không thể giữ chính xác từng URL (1 tỷ × vài chục byte = vài chục GB). Dùng cấu trúc xấp xỉ:

1. **HyperLogLog** cho cardinality (số URL khác nhau): chỉ ~1.5 KB cho sai số ~2%.
2. **Count-Min Sketch** cho tần suất từng URL:
   - Ma trận `d × w` (vd `5 × 2²⁰`) hash counter.
   - Khi tăng view: hash URL bằng `d` hàm → tăng `d` ô.
   - Khi query: lấy min của `d` ô đó.
   - Chi phí: ~20 MB cho sai số nhỏ.
3. Kết hợp với **top-K (Heavy Hitter)** nếu cần top URL.

Đổi lại: kết quả là xấp xỉ, có thể cao hơn thật một chút (không bao giờ thấp hơn).

## Code & Minh họa

- [solutions.go](./solutions.go) — Bloom filter mini + Count-Min Sketch demo trong Go.
- [visualization.html](./visualization.html) — Bloom filter 64 bit / 3 hash function, thử Add + Check để thấy false positive xảy ra như thế nào.

## Kết thúc

Bạn đã đi qua toàn bộ các cấu trúc dữ liệu từ cơ bản tới nâng cao. Bước tiếp theo nên là **thuật toán (algorithms)**: sắp xếp, tìm kiếm, quy hoạch động, đồ thị nâng cao — sẽ được tạo thành một lĩnh vực riêng (`Algorithms`) khi bạn yêu cầu.
