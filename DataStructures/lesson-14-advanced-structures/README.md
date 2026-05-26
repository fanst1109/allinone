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
- **Kiểm tra username**: sign-up form local trong browser (~1 MB cho 1 triệu username), trước tra DB phân shard, chống credential stuffing (Have I Been Pwned).

### 4.4. Saturation — vì sao "đầy bít = luôn false positive"

Câu hỏi tự nhiên: nếu add quá nhiều phần tử, mọi bit đều bật → check gì cũng nói "có thể có" → còn ý nghĩa gì?

**Đúng, đó là saturation** — và là lý do thiết kế kích thước rất quan trọng.

#### Toán cụ thể

Bảng `m` bit, `k` hash function, đã add `n` key:
- Xác suất một bit **vẫn tắt**: `(1 - 1/m)^(kn) ≈ e^(-kn/m)`
- Tỷ lệ **false positive**: `(1 - e^(-kn/m))^k`

Khi `n/m` lớn → `e^(-kn/m) → 0` → FP rate **→ 100%**.

#### Số cụ thể với bảng nhỏ trong viz (m=64, k=3)

| Đã add `n` | Bit bật xấp xỉ | FP rate xấp xỉ |
| --- | --- | --- |
| 5 | 21% | 0.9% |
| 10 | 38% | 5.5% |
| 20 | 61% | 23% |
| 30 | 76% | 44% |
| 50 | 90% | **73%** |
| 100 | 99% | **97%** |

→ Bảng 64 bit chỉ đáng tin với ~10 phần tử. Add 100 phần tử là **trả về "có" gần như luôn luôn**.

#### Cách thiết kế kích thước đúng

Công thức ngược: cho trước `n` (số phần tử dự kiến) và `p` (FP rate chấp nhận được):
```
m = - n · ln(p) / (ln 2)²
k = (m/n) · ln 2 ≈ 0.693 · (m/n)
```

**Ví dụ — 1 tỷ username, FP rate 1%**:
- `m ≈ 10⁹ · 4.6 / 0.48 ≈ 9.6 × 10⁹ bit ≈ 1.2 GB`
- `k ≈ 0.693 · 9.6 ≈ 7` hàm hash

**Quy tắc gọn**: ~**10 bit/phần tử** cho FP ~1%; ~14 bit cho 0.1%.

#### Khi `n` vượt dự kiến (Bloom đã saturate)

| Cách | Mô tả |
| --- | --- |
| Resize/rebuild | Tạo Bloom mới lớn hơn, rehash toàn bộ key. `O(n)` một lần. |
| **Scalable Bloom Filter (SBF)** | Chuỗi nhiều Bloom lớn dần. Khi cái hiện tại đầy → tạo cái mới gấp đôi. Query duyệt cả chuỗi. Không cần biết `n` từ đầu. |
| **Cuckoo Filter** | Thay thế hiện đại: tương đương memory, **hỗ trợ xóa**, khi đầy thì *thực sự* đầy (reject `add` ngay, không saturate ngầm). RocksDB, ScyllaDB đang chuyển sang. |

#### Phòng saturate trong production

Hệ thống thực luôn monitor `bits_set / m`. Vượt ngưỡng (vd 50%) → cảnh báo, lên kế hoạch rebuild. **Bloom không tự bảo vệ — người vận hành phải biết `n` xấp xỉ trước, hoặc dùng SBF/Cuckoo.**

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

## 7. Walk-through chi tiết — B-Tree

### 7.1. 💡 Trực giác — "Thư mục nhiều ngăn"

Hình dung **tủ hồ sơ văn phòng**: thay vì mỗi ngăn chỉ 1 tài liệu (BST), mỗi ngăn lớn chứa nhiều tài liệu được sắp xếp, và có **vách ngăn** chỉ hướng "tài liệu nhỏ hơn X đi sang ngăn trái, lớn hơn X đi sang phải". Khi mở 1 ngăn, ta đọc được nhiều khóa cùng lúc — đắt như nhau (1 lần mở ngăn = 1 lần đọc đĩa) dù trong ngăn có 1 hay 200 khóa.

Đây là lý do B-Tree thiết kế cho **ổ đĩa**: 1 lần seek đĩa rất đắt (~10 ms) nhưng đọc 1 block 16KB ~ đọc 100 byte (vì latency >> bandwidth). Nhồi nhiều khóa vào 1 node = giảm số lần seek.

### 7.2. Định nghĩa chính xác — B-Tree bậc `m`

Một B-Tree bậc `m` (ví dụ `m = 4`):

- Mỗi node (trừ root) chứa **từ `⌈m/2⌉ - 1` đến `m - 1` khóa** (vd `m=4` → 1-3 khóa/node).
- Mỗi node nội (không phải lá) có **số con = số khóa + 1**.
- Tất cả lá ở **cùng độ sâu** (cây cân bằng tuyệt đối).
- Khóa trong mỗi node sắp xếp tăng dần; các con xen kẽ giữa các khóa.

### 7.3. Walk-through insert + split với `m = 4`

Insert lần lượt `10, 20, 5, 6, 12, 30, 7, 17`. Node tối đa 3 khóa.

**Insert 10**:
```
[10]
```

**Insert 20**:
```
[10, 20]
```

**Insert 5** (chèn vào vị trí đúng để giữ sắp xếp):
```
[5, 10, 20]
```

**Insert 6** — node đã có 3 khóa (đầy với `m=4`) → **SPLIT**:

- Tập hợp nếu chèn: `[5, 6, 10, 20]`.
- Lấy phần tử giữa (median) → `10` đẩy lên thành node cha mới.
- Còn lại chia đôi: `[5, 6]` thành con trái, `[20]` thành con phải.

```
        [10]
       /    \
   [5, 6]   [20]
```

**Insert 12** — đi vào con phải (vì 12 > 10):
```
        [10]
       /    \
   [5, 6]   [12, 20]
```

**Insert 30** — đi vào con phải:
```
        [10]
       /    \
   [5, 6]   [12, 20, 30]
```

**Insert 7** — đi vào con trái (7 < 10):
```
        [10]
       /     \
  [5, 6, 7]  [12, 20, 30]
```

**Insert 17** — đi vào con phải `[12, 20, 30]` (giữa 10 và ∞). Node đầy → tập hợp `[12, 17, 20, 30]` → split:

- Median = `20` (hoặc `17` tùy quy ước; ta chọn vị trí thứ 2 = `17`).
- Đẩy `17` lên cha.

Đẩy 17 lên node cha `[10]` → cha thành `[10, 17]`, có 3 con:

```
              [10, 17]
            /    |     \
       [5,6,7] [12]  [20, 30]
```

### 7.4. Walk-through search

Tìm `20` trong cây cuối:

| Bước | Node | Khóa | Quyết định |
|------|------|------|------------|
| 1 | `[10, 17]` | 10, 17 | 20 > 17 → đi con thứ 3 |
| 2 | `[20, 30]` | 20, 30 | 20 == 20 → **TÌM THẤY** |

Số lần đọc node: 2 (= chiều cao). Với `m = 256` và `10⁹` khóa, chiều cao chỉ ~4 → **4 lần đọc đĩa thay vì 30 lần** với BST.

### 7.5. ❓ Câu hỏi tự nhiên

- **"Vì sao chọn `m` lớn?"** — Mỗi lần đọc đĩa = đọc 1 block (4-16 KB). `m` chọn sao cho 1 node vừa = 1 block. Vd block 16KB, mỗi entry (key+pointer) 64 byte → `m ≈ 256`.
- **"B-Tree khác B+ Tree ra sao?"** — B-Tree lưu dữ liệu ở **mọi node**; B+ Tree lưu dữ liệu **chỉ ở lá**, các node trong chỉ là routing key. B+ Tree thắng cho range query vì lá nối linked list.
- **"Delete có phức tạp không?"** — Có. Khi node có ít hơn `⌈m/2⌉-1` khóa → phải "mượn" từ anh em hoặc merge với anh em. Logic gấp 2-3 lần insert.
- **"Vì sao tất cả lá cùng độ sâu?"** — Vì split luôn đẩy lên trên (root mới ra ở trên đỉnh), không xuống dưới. Khác BST cân bằng truyền thống.

### 7.6. ⚠ Lỗi thường gặp khi cài B-Tree

| Lỗi | Hậu quả |
|------|---------|
| Chọn `m` quá nhỏ (vd `m=4`) cho DB thực | Không tận dụng được block size → IO lãng phí |
| Quên split khi node đầy ngay lúc insert | Node vượt `m-1` khóa → cấu trúc sai |
| Khi split, đẩy median lên nhưng quên update con của node cha | Node cha có khóa nhưng thiếu pointer con |
| Delete mà không xử lý underflow | Cây mất cân bằng, một số lá nông hơn lá khác |

### 7.7. 📝 Tóm tắt B-Tree

- Mỗi node nhiều khóa (vài trăm) → chiều cao `log_m n` rất thấp.
- Tất cả lá cùng độ sâu, cân bằng tự động qua **split** (khi đầy) và **merge** (khi cạn).
- Dùng cho **disk-backed structure**: DB index, file system.
- B+ Tree tối ưu hơn cho range query (lá nối linked list).

## 8. Walk-through chi tiết — Skip List

### 8.1. 💡 Trực giác — "Tàu nhanh, tàu chậm, tàu thường"

Hình dung tuyến tàu điện ngầm:
- **Tầng 0**: tàu thường, dừng ở mọi ga (`A → B → C → D → E`).
- **Tầng 1**: tàu nhanh, dừng ga thưa hơn (`A → C → E`).
- **Tầng 2**: tàu siêu nhanh, chỉ dừng 2-3 ga (`A → E`).

Muốn đi từ `A` tới ga gần `D`: lên tàu siêu nhanh đến `E` quá xa → xuống tàu nhanh ở `C`, tới `D` chỉ còn 1 ga ở tầng thường. **Đi nhanh hơn nhiều so với chỉ dùng tầng 0**.

Skip list áp dụng đúng nguyên tắc này cho **linked list có sắp xếp**: thêm các "express link" bỏ qua nhiều phần tử.

### 8.2. Cấu trúc và xác suất cấp

Khi insert một phần tử, ta tung đồng xu nhiều lần để quyết định nó xuất hiện ở bao nhiêu tầng:

- Tầng 0: chắc chắn xuất hiện (xác suất 1).
- Tầng 1: xác suất `p = 1/2`.
- Tầng 2: xác suất `p² = 1/4`.
- Tầng `k`: xác suất `p^k = 1/2^k`.

**Số phần tử trung bình ở tầng `k`** với `n` phần tử: `n × p^k = n / 2^k`.

| Tầng | Số phần tử (n=1000) | Khoảng cách trung bình |
|------|---------------------|------------------------|
| 0 | 1000 | 1 |
| 1 | 500 | 2 |
| 2 | 250 | 4 |
| 3 | 125 | 8 |
| ... | ... | ... |
| `log₂ n ≈ 10` | 1 | n |

Tầng cao nhất expected ~`log₂ n`. Mỗi tầng "bỏ qua" trung bình một nửa node → tổng quãng đường ~`log₂ n` bước → search `O(log n)` xác suất.

### 8.3. Walk-through search

Skip list chứa `{3, 7, 10, 15, 18, 22, 30, 40}`. Cấp:
- 30, 7: tầng 2.
- 15, 22: tầng 1.
- Tất cả: tầng 0.

```
T2:  H ---------> 7 -------------------> 30 -----> NIL
T1:  H -------- > 7 ----- > 15 -------- > 22 -- > 30 -----> NIL
T0:  H -> 3 -> 7 -> 10 -> 15 -> 18 -> 22 -> 30 -> 40 -> NIL
```

Search `18`:

1. Bắt đầu tầng 2 ở `H` (header). So với `7` — đi tới `7`. So với `30` — quá lớn (18<30) → **xuống tầng 1** tại `7`.
2. Tầng 1 từ `7`: so với `15` — đi tới `15`. So với `22` — quá lớn → **xuống tầng 0** tại `15`.
3. Tầng 0 từ `15`: so với `18` — đúng! **TÌM THẤY**.

Số so sánh: ~5 thay vì 6 nếu duyệt linked list thẳng (`3,7,10,15,18`). Với `n` lớn, lợi ích lớn hơn nhiều.

### 8.4. Walk-through insert

Insert `12` vào skip list trên:

1. Search vị trí: đi tới ngay sau `10`, trước `15` ở tầng 0.
2. Tung xu: ngửa, ngửa, sấp → cấp 2 (xuất hiện ở tầng 0 và 1, không tầng 2).
3. Chèn vào tầng 0: `... 10 -> 12 -> 15 ...`.
4. Chèn vào tầng 1: `... 7 -> 12 -> 15 ...` (giữa 7 và 15).

```
T2:  H ---------> 7 ----------------------> 30 -----> NIL
T1:  H -------- > 7 -- > 12 - > 15 -------- > 22 -- > 30 -----> NIL
T0:  H -> 3 -> 7 -> 10 -> 12 -> 15 -> 18 -> 22 -> 30 -> 40 -> NIL
```

### 8.5. Vì sao expected `O(log n)`?

**Lập luận trực giác**: ở mỗi tầng từ trên xuống, ta đi tối đa "tới phần tử lớn hơn" — trung bình `1/p = 2` bước. Tổng số tầng = `log_{1/p} n = log₂ n`. Vậy tổng bước ≈ `2 × log₂ n = O(log n)`.

**Lưu ý**: đây là expected, không phải worst-case. Worst-case là `O(n)` nếu xui tung xu mọi node đều cấp 0 → quay về linked list. Nhưng xác suất rất nhỏ (giảm theo lũy thừa của `n`).

### 8.6. ❓ Câu hỏi tự nhiên

- **"Skip list có deterministic không?"** — Không (chuẩn). Random cấp khi insert. Tồn tại biến thể deterministic (1-2-3 skip list) nhưng phức tạp hơn.
- **"Vì sao Redis chọn skip list cho `ZSET`?"** — (1) Cài dễ hơn RB tree nhiều. (2) Hỗ trợ range query gọn (`ZRANGEBYSCORE`). (3) Concurrent-friendly nếu cần. Antirez đã viết blog giải thích.
- **"So với balanced tree thì sao?"** — Tương đương về asymptotic. Skip list dùng thêm bộ nhớ (mỗi phần tử có nhiều pointer), nhưng cài đặt đơn giản hơn.
- **"Nếu chỉ có 1 phần tử cấp cao nhất, search có chậm không?"** — Không, search vẫn chia đôi không gian đều. Cấp cao thực ra ít quan trọng — chính các cấp giữa làm việc nhiều nhất.

### 8.7. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả |
|------|---------|
| Quên header sentinel ở mọi tầng | Insert đầu danh sách lỗi |
| Không giới hạn cấp tối đa (`MAX_LEVEL`) | Có thể tung xu vô hạn |
| Khi insert, không "ghi nhớ" path từ trên xuống | Phải tìm lại để chèn ở các tầng trên → tốn `O(log² n)` |
| `p` quá lớn (vd 0.9) | Nhiều cấp cao → tốn bộ nhớ, không nhanh thêm |
| `p` quá nhỏ (vd 0.1) | Ít cấp cao → biến gần thành linked list |

### 8.8. 📝 Tóm tắt Skip List

- Linked list nhiều tầng, mỗi tầng bỏ qua một nửa (xác suất `p=1/2`).
- Expected `O(log n)` cho search/insert/delete.
- Cài đặt **đơn giản hơn nhiều** so với balanced tree.
- Dùng cho **concurrent**, **range query**, **Redis ZSET**, **LevelDB memtable**.

## 9. Walk-through chi tiết — LSM-Tree

### 9.1. 💡 Trực giác — "Sổ ghi nháp và tủ lưu trữ"

Tưởng tượng bạn là thư ký:
- **Memtable** = quyển sổ tay nhỏ trên bàn (RAM). Mọi note mới ghi vào đây — nhanh, không cần lục tủ.
- Khi sổ tay đầy → **flush** → đóng quyển, copy thành file lưu trữ (**SSTable** — Sorted String Table) trên đĩa, mở quyển mới.
- Theo thời gian, có nhiều file SSTable nhỏ → định kỳ **compaction**: trộn nhiều SSTable thành 1 SSTable lớn, loại bỏ key đã ghi đè (tombstone).

**Mục tiêu**: ghi luôn nhanh (chỉ ghi vào RAM + append-only log đĩa); đọc chậm hơn nhưng có thể optimize bằng Bloom filter.

### 9.2. Walk-through một chuỗi thao tác

Memtable size limit = 3 entry (toy example).

**T=0**: trạng thái khởi đầu — memtable rỗng, không SSTable.

```
Memtable: {}
SSTables: []
```

**T=1**: `PUT name="alice"`. Ghi vào memtable.
```
Memtable: {name: "alice"}
```

**T=2**: `PUT age=30`.
```
Memtable: {age: 30, name: "alice"}    (sorted theo key)
```

**T=3**: `PUT city="HCM"` → memtable đầy (3 entry).
```
Memtable: {age: 30, city: "HCM", name: "alice"}
```

**T=4**: `PUT job="dev"` — memtable đã đầy → **FLUSH**: copy memtable thành SSTable-1 trên đĩa (file bất biến, đã sắp xếp), tạo memtable mới chứa `job`.
```
Memtable: {job: "dev"}
SSTables: [SSTable-1: {age:30, city:"HCM", name:"alice"}]
```

**T=5**: `GET name` — đọc:
1. Tìm trong memtable trước → không có.
2. Tìm trong SSTable-1 (mới nhất trước) → tìm thấy `"alice"`. Trả về.

**T=6**: `PUT name="bob"` (ghi đè).
```
Memtable: {job: "dev", name: "bob"}
SSTables: [SSTable-1: {age:30, city:"HCM", name:"alice"}]
```

**T=7**: `GET name` — đọc:
1. Memtable có `name="bob"` → trả về **"bob"** (không cần check SSTable cũ).

**T=8..n**: nhiều thao tác, memtable đầy nhiều lần → nhiều SSTable.
```
SSTables: [SSTable-3, SSTable-2, SSTable-1]   (mới đến cũ)
```

**T=compaction**: nền chạy → đọc SSTable-2 + SSTable-3, merge sắp xếp, loại entry cũ hơn cho cùng key → tạo SSTable-2-3 mới, xóa hai cái cũ.

### 9.3. Vì sao ghi nhanh mà đọc chậm?

- **Ghi**: chỉ append vào WAL (write-ahead log đĩa) + thêm vào memtable RAM. Cả hai **sequential** → cực nhanh (~hàng triệu write/s/đĩa).
- **Đọc**: phải tra **lần lượt** memtable → SSTable mới nhất → ... → SSTable cũ nhất (vì giá trị mới hơn có thể che giá trị cũ). Mỗi SSTable cần ≥ 1 disk seek nếu Bloom filter báo "có thể có".

**Tối ưu đọc**: mỗi SSTable kèm 1 Bloom filter. `GET k` → check Bloom trước; nếu Bloom nói "không có" → bỏ qua SSTable đó (0 disk IO). Bloom filter ở đây là **đặc biệt quan trọng** — nếu không có, mỗi GET có thể tốn 10+ disk seek.

### 9.4. ❓ Câu hỏi tự nhiên

- **"Xóa key thế nào nếu SSTable là immutable?"** — Ghi 1 "tombstone" (đánh dấu xóa) vào memtable. Khi compaction trộn, key có tombstone bị loại bỏ. Lúc GET, gặp tombstone trước giá trị cũ → trả "không tồn tại".
- **"Compaction tốn bao nhiêu IO?"** — Tốn nhiều. RocksDB có khái niệm **write amplification**: 1 byte user ghi có thể trở thành 10-30 byte ghi đĩa do compaction. Trade-off với "ghi nhanh ngay lập tức".
- **"Có bao nhiêu level SSTable?"** — Leveled compaction (LevelDB, RocksDB): nhiều tầng, mỗi tầng kích thước gấp 10. Tier-0 (vừa flush, có thể chồng range) → Tier-1 (sorted, không chồng), ... → Tier-6 (lớn nhất). Tổng `O(log n)` tầng.
- **"Vì sao memtable lại dùng skip list?"** — Cần sorted + concurrent + có range scan để flush. Skip list đáp ứng tất cả, dễ implement lock-free.

### 9.5. ⚠ Lỗi thường gặp (cài đặt)

| Lỗi | Hậu quả |
|------|---------|
| Bỏ qua WAL → ghi chỉ vào memtable | Crash mất dữ liệu chưa flush |
| Đọc SSTable không kiểm tra mới→cũ | Có thể trả giá trị stale (đã ghi đè) |
| Quên Bloom filter mỗi SSTable | Mỗi GET tốn `O(#SSTable)` disk seek |
| Compaction không throttle | Spike IO làm latency đọc tăng vọt |
| Tombstone không có TTL | Compaction không bao giờ thực sự xóa được key cũ |

### 9.6. 📝 Tóm tắt LSM-Tree

- Append-only, **ghi nhanh** (sequential write); **đọc chậm hơn** B-Tree.
- Memtable RAM → flush → SSTable đĩa → compaction trộn.
- Bloom filter bắt buộc để tránh tra SSTable thừa.
- Dùng cho **write-heavy**: time-series, log, NoSQL (Cassandra, HBase, RocksDB).

## 10. Callouts cho Bloom Filter (bổ sung)

### 10.1. 💡 Trực giác (đã có ở mục 4, nhắc gọn)

Bloom filter = "chữ ký phân bố": mỗi item bật vài bit ngẫu nhiên trong mảng. Check = "tất cả bit ấy đều bật không?". Đụng nhau ngẫu nhiên → false positive (nhỏ, kiểm soát được). Không bao giờ tắt bit từng bật → no false negative.

### 10.2. ❓ Câu hỏi đã được trả lời trong các mục 4.1-4.4

- "Sai 2 chiều không?" → mục 4.1.
- "Tại sao tiết kiệm bộ nhớ?" → mục 4.2 (~10 bit/item).
- "Khi nào đầy?" → mục 4.4 (saturation toán).
- "Có xóa được không?" → mục 4.2 (counting Bloom).

### 10.3. ⚠ Lỗi thường gặp với Bloom

| Lỗi | Hậu quả |
|------|---------|
| Thiết kế `m` không tính theo công thức `n × 4.6 / ln²2` | Quá to (lãng phí) hoặc quá nhỏ (FP cao) |
| Dùng cùng hash với seed giống nhau cho `k` hash | Các hash tương quan → FP cao hơn lý thuyết |
| Coi Bloom là "tìm kiếm cuối cùng" | Phải verify thật trong DB sau khi Bloom nói "có" |
| Cho phép xóa với Bloom thường (không counting) | Tắt bit có thể vô tình che key khác → false negative — sai nguyên tắc Bloom |

### 10.4. 📝 Tóm tắt Bloom Filter

- Bit array + `k` hash, không false negative, có false positive.
- ~10 bit/item cho FP 1%; ~14 bit/item cho FP 0.1%.
- Saturation khi `n` vượt thiết kế → cần SBF hoặc Cuckoo Filter để mở rộng.
- Use cases: pre-filter DB, web crawler, LSM SSTable lookup.

## Code & Minh họa

- [solutions.go](./solutions.go) — Bloom filter mini + Count-Min Sketch demo trong Go.
- [visualization.html](./visualization.html) — Bloom filter 64 bit / 3 hash function, thử Add + Check để thấy false positive xảy ra như thế nào.

## Kết thúc

Bạn đã đi qua toàn bộ các cấu trúc dữ liệu từ cơ bản tới nâng cao. Bước tiếp theo nên là **thuật toán (algorithms)**: sắp xếp, tìm kiếm, quy hoạch động, đồ thị nâng cao — sẽ được tạo thành một lĩnh vực riêng (`Algorithms`) khi bạn yêu cầu.
