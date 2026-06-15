# Lesson 04 — Advanced Structures (B-Tree, Skip List, LSM-Tree, Bloom Filter)

## Mục tiêu học tập

- Hiểu **vì sao** cây nhị phân không đủ cho dữ liệu trên đĩa, và **B-Tree/B+ Tree** giải quyết thế nào.
- Nắm **Skip List** — cấu trúc xác suất thay thế balanced tree, đơn giản mà $O(\log n)$.
- Hiểu **LSM-Tree** (ghi nhanh) và đánh đổi đọc/ghi so với B-Tree.
- Hiểu **Bloom Filter** — kiểm tra thành viên xác suất, false positive vs false negative.
- Biết các cấu trúc này nằm ở đâu trong hệ thống thật (database, file system, NoSQL, cache).

## Kiến thức tiền đề

- [Lesson 04 — Balanced Trees](../../02-Intermediate/lesson-04-balanced-trees/) (B-Tree mở rộng từ ý tưởng cây cân bằng).
- [Lesson 06 — Hash Table](../../01-Basic/lesson-06-hash-table/) (Bloom Filter dùng nhiều hàm hash).
- [Lesson 03 — Segment Tree](../lesson-03-segment-tree/) (so sánh với cấu trúc disk-backed).

## 1. B-Tree và B+ Tree

### 1.1. Vấn đề

Cây nhị phân cân bằng có chiều cao $\log_2 n$. Với $n = 10^9$ thì chiều cao $\approx 30$. Nếu mỗi node nằm trên một block đĩa khác nhau → 30 lần đọc đĩa, chậm.

**Ý tưởng**: cho mỗi node chứa **nhiều khóa** (vài trăm) → chiều cao giảm mạnh.

### 1.2. B-Tree

- Mỗi node chứa tối đa $m-1$ khóa và $m$ con.
- Cây cân bằng tự động khi insert/delete (split/merge node).
- Chiều cao: $O(\log_m n)$.

Với $m \approx 256$, cây có $10^9$ phần tử chỉ cao 4-5 → chỉ 4-5 lần đọc đĩa.

### 1.3. B+ Tree

Biến thể: chỉ **lá** chứa dữ liệu, các node trong chỉ chứa key dẫn đường. Các lá nối thành **linked list** → duyệt theo khoảng cực nhanh.

### 1.4. Ứng dụng

- **Database index**: MySQL InnoDB, PostgreSQL.
- **File system**: NTFS, ext4, HFS+, Btrfs.

### 1.5. 💡 Trực giác — "Thư mục nhiều ngăn"

Hình dung **tủ hồ sơ văn phòng**: thay vì mỗi ngăn chỉ 1 tài liệu (BST), mỗi ngăn lớn chứa nhiều tài liệu được sắp xếp, và có **vách ngăn** chỉ hướng "tài liệu nhỏ hơn X đi sang ngăn trái, lớn hơn X đi sang phải". Khi mở 1 ngăn, ta đọc được nhiều khóa cùng lúc — đắt như nhau (1 lần mở ngăn = 1 lần đọc đĩa) dù trong ngăn có 1 hay 200 khóa.

Đây là lý do B-Tree thiết kế cho **ổ đĩa**: 1 lần seek đĩa rất đắt (~10 ms) nhưng đọc 1 block 16KB ~ đọc 100 byte (vì latency >> bandwidth). Nhồi nhiều khóa vào 1 node = giảm số lần seek.

### 1.6. Định nghĩa chính xác — B-Tree bậc `m`

Một B-Tree bậc $m$ (ví dụ $m = 4$):

- Mỗi node (trừ root) chứa **từ $\lceil m/2 \rceil - 1$ đến $m - 1$ khóa** (vd $m=4$ → 1-3 khóa/node).
- Mỗi node nội (không phải lá) có **số con = số khóa + 1**.
- Tất cả lá ở **cùng độ sâu** (cây cân bằng tuyệt đối).
- Khóa trong mỗi node sắp xếp tăng dần; các con xen kẽ giữa các khóa.

### 1.7. Walk-through insert + split với `m = 4`

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

### 1.8. Walk-through search

Tìm `20` trong cây cuối:

| Bước | Node | Khóa | Quyết định |
|------|------|------|------------|
| 1 | `[10, 17]` | 10, 17 | 20 > 17 → đi con thứ 3 |
| 2 | `[20, 30]` | 20, 30 | 20 == 20 → **TÌM THẤY** |

Số lần đọc node: 2 (= chiều cao). Với $m = 256$ và $10^9$ khóa, chiều cao chỉ $\sim 4$ → **4 lần đọc đĩa thay vì 30 lần** với BST.

### 1.9. ❓ Câu hỏi tự nhiên

- **"Vì sao chọn $m$ lớn?"** — Mỗi lần đọc đĩa = đọc 1 block (4-16 KB). $m$ chọn sao cho 1 node vừa = 1 block. Vd block 16KB, mỗi entry (key+pointer) 64 byte → $m \approx 256$.
- **"B-Tree khác B+ Tree ra sao?"** — B-Tree lưu dữ liệu ở **mọi node**; B+ Tree lưu dữ liệu **chỉ ở lá**, các node trong chỉ là routing key. B+ Tree thắng cho range query vì lá nối linked list.
- **"Delete có phức tạp không?"** — Có. Khi node có ít hơn $\lceil m/2 \rceil - 1$ khóa → phải "mượn" từ anh em hoặc merge với anh em. Logic gấp 2-3 lần insert.
- **"Vì sao tất cả lá cùng độ sâu?"** — Vì split luôn đẩy lên trên (root mới ra ở trên đỉnh), không xuống dưới. Khác BST cân bằng truyền thống.

### 1.10. ⚠ Lỗi thường gặp khi cài B-Tree

| Lỗi | Hậu quả |
|------|---------|
| Chọn $m$ quá nhỏ (vd $m=4$) cho DB thực | Không tận dụng được block size → IO lãng phí |
| Quên split khi node đầy ngay lúc insert | Node vượt $m-1$ khóa → cấu trúc sai |
| Khi split, đẩy median lên nhưng quên update con của node cha | Node cha có khóa nhưng thiếu pointer con |
| Delete mà không xử lý underflow | Cây mất cân bằng, một số lá nông hơn lá khác |

### 1.11. 📝 Tóm tắt B-Tree

- Mỗi node nhiều khóa (vài trăm) → chiều cao $\log_m n$ rất thấp.
- Tất cả lá cùng độ sâu, cân bằng tự động qua **split** (khi đầy) và **merge** (khi cạn).
- Dùng cho **disk-backed structure**: DB index, file system.
- B+ Tree tối ưu hơn cho range query (lá nối linked list).

### 1.12. 🔁 Tự kiểm tra

1. B-Tree bậc $m = 5$. Mỗi node chứa tối đa và tối thiểu bao nhiêu khóa (node không phải root)? Khi node thứ mấy thì phải split?
   <details><summary>Đáp án</summary>Tối đa $m - 1 = 4$ khóa; tối thiểu $\lceil m/2 \rceil - 1 = \lceil 2{,}5 \rceil - 1 = 2$ khóa. Khi insert làm node có **5 khóa** (vượt 4) → split: đẩy median (khóa thứ 3) lên cha, chia còn lại thành 2 node 2 khóa.</details>
2. Một index B+ Tree bậc $m = 256$ chứa $10^{12}$ (nghìn tỷ) khóa. Chiều cao xấp xỉ bao nhiêu? Một truy vấn tốn bao nhiêu lần đọc đĩa?
   <details><summary>Đáp án</summary>Chiều cao $\approx \log_{256}(10^{12}) = \frac{12 \ln 10}{\ln 256} \approx \frac{27{,}6}{5{,}5} \approx 5$. → ~**5 lần đọc đĩa** cho nghìn tỷ khóa. Cây nhị phân cân bằng cần $\log_2(10^{12}) \approx 40$ lần — chậm gấp 8 lần.</details>
3. Vì sao trong B+ Tree, range query (`WHERE age BETWEEN 20 AND 30`) nhanh hơn B-Tree thường?
   <details><summary>Đáp án</summary>Trong B+ Tree **mọi dữ liệu nằm ở lá**, và các lá được **nối thành linked list** theo thứ tự. Tìm `20` ở lá ($O(\log_m n)$), rồi chỉ cần **đi tuần tự** theo linked list tới `30` — không phải leo lên/xuống cây nhiều lần như B-Tree thường (dữ liệu rải ở node nội).</details>

## 2. Skip List

### 2.1. Ý tưởng

Một linked list "có nhiều tầng": tầng 0 là toàn bộ phần tử; tầng trên chỉ chứa một số phần tử, mỗi tầng bỏ qua một nửa (xác suất).

```
tầng 2:  A -----------------> E
tầng 1:  A -----> C --------> E
tầng 0:  A -> B -> C -> D -> E
```

Tìm kiếm đi từ tầng cao xuống, mỗi tầng bỏ qua nhiều node → $O(\log n)$ xác suất.

### 2.2. Ưu

- Cài đặt **đơn giản hơn balanced tree** rất nhiều.
- Lock-free / concurrent friendly.

### 2.3. Ứng dụng

- **Redis sorted set** (`ZSET`).
- LevelDB internal.

### 2.4. 💡 Trực giác — "Tàu nhanh, tàu chậm, tàu thường"

Hình dung tuyến tàu điện ngầm:
- **Tầng 0**: tàu thường, dừng ở mọi ga (`A → B → C → D → E`).
- **Tầng 1**: tàu nhanh, dừng ga thưa hơn (`A → C → E`).
- **Tầng 2**: tàu siêu nhanh, chỉ dừng 2-3 ga (`A → E`).

Muốn đi từ `A` tới ga gần `D`: lên tàu siêu nhanh đến `E` quá xa → xuống tàu nhanh ở `C`, tới `D` chỉ còn 1 ga ở tầng thường. **Đi nhanh hơn nhiều so với chỉ dùng tầng 0**.

Skip list áp dụng đúng nguyên tắc này cho **linked list có sắp xếp**: thêm các "express link" bỏ qua nhiều phần tử.

### 2.5. Cấu trúc và xác suất cấp

Khi insert một phần tử, ta tung đồng xu nhiều lần để quyết định nó xuất hiện ở bao nhiêu tầng:

- Tầng 0: chắc chắn xuất hiện (xác suất 1).
- Tầng 1: xác suất $p = 1/2$.
- Tầng 2: xác suất $p^2 = 1/4$.
- Tầng $k$: xác suất $p^k = 1/2^k$.

**Số phần tử trung bình ở tầng $k$** với $n$ phần tử: $n \times p^k = n / 2^k$.

| Tầng | Số phần tử (n=1000) | Khoảng cách trung bình |
|------|---------------------|------------------------|
| 0 | 1000 | 1 |
| 1 | 500 | 2 |
| 2 | 250 | 4 |
| 3 | 125 | 8 |
| ... | ... | ... |
| $\log_2 n \approx 10$ | 1 | $n$ |

Tầng cao nhất expected $\sim \log_2 n$. Mỗi tầng "bỏ qua" trung bình một nửa node → tổng quãng đường $\sim \log_2 n$ bước → search $O(\log n)$ xác suất.

### 2.6. Walk-through search

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

Số so sánh: ~5 thay vì 6 nếu duyệt linked list thẳng (`3,7,10,15,18`). Với $n$ lớn, lợi ích lớn hơn nhiều.

### 2.7. Walk-through insert

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

### 2.8. Vì sao expected `O(log n)`?

**Lập luận trực giác**: ở mỗi tầng từ trên xuống, ta đi tối đa "tới phần tử lớn hơn" — trung bình $1/p = 2$ bước. Tổng số tầng = $\log_{1/p} n = \log_2 n$. Vậy tổng bước $\approx 2 \times \log_2 n = O(\log n)$.

**Lưu ý**: đây là expected, không phải worst-case. Worst-case là $O(n)$ nếu xui tung xu mọi node đều cấp 0 → quay về linked list. Nhưng xác suất rất nhỏ (giảm theo lũy thừa của $n$).

### 2.9. ❓ Câu hỏi tự nhiên

- **"Skip list có deterministic không?"** — Không (chuẩn). Random cấp khi insert. Tồn tại biến thể deterministic (1-2-3 skip list) nhưng phức tạp hơn.
- **"Vì sao Redis chọn skip list cho `ZSET`?"** — (1) Cài dễ hơn RB tree nhiều. (2) Hỗ trợ range query gọn (`ZRANGEBYSCORE`). (3) Concurrent-friendly nếu cần. Antirez đã viết blog giải thích.
- **"So với balanced tree thì sao?"** — Tương đương về asymptotic. Skip list dùng thêm bộ nhớ (mỗi phần tử có nhiều pointer), nhưng cài đặt đơn giản hơn.
- **"Nếu chỉ có 1 phần tử cấp cao nhất, search có chậm không?"** — Không, search vẫn chia đôi không gian đều. Cấp cao thực ra ít quan trọng — chính các cấp giữa làm việc nhiều nhất.

### 2.10. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả |
|------|---------|
| Quên header sentinel ở mọi tầng | Insert đầu danh sách lỗi |
| Không giới hạn cấp tối đa (`MAX_LEVEL`) | Có thể tung xu vô hạn |
| Khi insert, không "ghi nhớ" path từ trên xuống | Phải tìm lại để chèn ở các tầng trên → tốn $O(\log^2 n)$ |
| $p$ quá lớn (vd 0.9) | Nhiều cấp cao → tốn bộ nhớ, không nhanh thêm |
| $p$ quá nhỏ (vd 0.1) | Ít cấp cao → biến gần thành linked list |

### 2.11. 📝 Tóm tắt Skip List

- Linked list nhiều tầng, mỗi tầng bỏ qua một nửa (xác suất $p=1/2$).
- Expected $O(\log n)$ cho search/insert/delete.
- Cài đặt **đơn giản hơn nhiều** so với balanced tree.
- Dùng cho **concurrent**, **range query**, **Redis ZSET**, **LevelDB memtable**.

### 2.12. 🔁 Tự kiểm tra

1. Skip list với $p = 1/2$ chứa $n = 10^6$ phần tử. Số tầng kỳ vọng khoảng bao nhiêu? Tầng cao nhất trung bình chứa mấy phần tử?
   <details><summary>Đáp án</summary>Số tầng $\approx \log_2(10^6) \approx 20$. Tầng $k$ kỳ vọng $n/2^k$ phần tử → tầng cao nhất (~20) còn $10^6/2^{20} \approx 1$ phần tử. Đó là lý do số tầng dừng quanh $\log_2 n$.</details>
2. Vì sao skip list là $O(\log n)$ **kỳ vọng** chứ không phải **worst-case**? Trường hợp xấu nhất là gì?
   <details><summary>Đáp án</summary>Cấp của mỗi node do **tung đồng xu ngẫu nhiên** quyết định, không đảm bảo. Worst-case: xui đến mức MỌI node đều cấp 0 → skip list suy biến thành linked list thường → search $O(n)$. Nhưng xác suất việc này cực nhỏ (giảm theo lũy thừa của $n$), nên thực tế luôn $\approx O(\log n)$.</details>
3. So với Red-Black tree (cùng $O(\log n)$), skip list được Redis chọn cho `ZSET` vì lý do gì?
   <details><summary>Đáp án</summary>(1) **Cài đặt đơn giản hơn nhiều** (vài chục dòng vs hàng trăm dòng cho RB tree, ít bug). (2) **Range query gọn** (`ZRANGEBYSCORE` chỉ cần đi linked list ở tầng 0). (3) Dễ làm **concurrent/lock-free**. Đổi lại tốn thêm bộ nhớ (mỗi node nhiều con trỏ tầng).</details>

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

### 3.4. 💡 Trực giác — "Sổ ghi nháp và tủ lưu trữ"

Tưởng tượng bạn là thư ký:
- **Memtable** = quyển sổ tay nhỏ trên bàn (RAM). Mọi note mới ghi vào đây — nhanh, không cần lục tủ.
- Khi sổ tay đầy → **flush** → đóng quyển, copy thành file lưu trữ (**SSTable** — Sorted String Table) trên đĩa, mở quyển mới.
- Theo thời gian, có nhiều file SSTable nhỏ → định kỳ **compaction**: trộn nhiều SSTable thành 1 SSTable lớn, loại bỏ key đã ghi đè (tombstone).

**Mục tiêu**: ghi luôn nhanh (chỉ ghi vào RAM + append-only log đĩa); đọc chậm hơn nhưng có thể optimize bằng Bloom filter.

### 3.5. Walk-through một chuỗi thao tác

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

### 3.6. Vì sao ghi nhanh mà đọc chậm?

- **Ghi**: chỉ append vào WAL (write-ahead log đĩa) + thêm vào memtable RAM. Cả hai **sequential** → cực nhanh (~hàng triệu write/s/đĩa).
- **Đọc**: phải tra **lần lượt** memtable → SSTable mới nhất → ... → SSTable cũ nhất (vì giá trị mới hơn có thể che giá trị cũ). Mỗi SSTable cần ≥ 1 disk seek nếu Bloom filter báo "có thể có".

**Tối ưu đọc**: mỗi SSTable kèm 1 Bloom filter. `GET k` → check Bloom trước; nếu Bloom nói "không có" → bỏ qua SSTable đó (0 disk IO). Bloom filter ở đây là **đặc biệt quan trọng** — nếu không có, mỗi GET có thể tốn 10+ disk seek.

### 3.7. ❓ Câu hỏi tự nhiên

- **"Xóa key thế nào nếu SSTable là immutable?"** — Ghi 1 "tombstone" (đánh dấu xóa) vào memtable. Khi compaction trộn, key có tombstone bị loại bỏ. Lúc GET, gặp tombstone trước giá trị cũ → trả "không tồn tại".
- **"Compaction tốn bao nhiêu IO?"** — Tốn nhiều. RocksDB có khái niệm **write amplification**: 1 byte user ghi có thể trở thành 10-30 byte ghi đĩa do compaction. Trade-off với "ghi nhanh ngay lập tức".
- **"Có bao nhiêu level SSTable?"** — Leveled compaction (LevelDB, RocksDB): nhiều tầng, mỗi tầng kích thước gấp 10. Tier-0 (vừa flush, có thể chồng range) → Tier-1 (sorted, không chồng), ... → Tier-6 (lớn nhất). Tổng $O(\log n)$ tầng.
- **"Vì sao memtable lại dùng skip list?"** — Cần sorted + concurrent + có range scan để flush. Skip list đáp ứng tất cả, dễ implement lock-free.

### 3.8. ⚠ Lỗi thường gặp (cài đặt)

| Lỗi | Hậu quả |
|------|---------|
| Bỏ qua WAL → ghi chỉ vào memtable | Crash mất dữ liệu chưa flush |
| Đọc SSTable không kiểm tra mới→cũ | Có thể trả giá trị stale (đã ghi đè) |
| Quên Bloom filter mỗi SSTable | Mỗi GET tốn $O(\#\text{SSTable})$ disk seek |
| Compaction không throttle | Spike IO làm latency đọc tăng vọt |
| Tombstone không có TTL | Compaction không bao giờ thực sự xóa được key cũ |

### 3.9. 📝 Tóm tắt LSM-Tree

- Append-only, **ghi nhanh** (sequential write); **đọc chậm hơn** B-Tree.
- Memtable RAM → flush → SSTable đĩa → compaction trộn.
- Bloom filter bắt buộc để tránh tra SSTable thừa.
- Dùng cho **write-heavy**: time-series, log, NoSQL (Cassandra, HBase, RocksDB).

### 3.10. 🔁 Tự kiểm tra

1. `GET key` trong LSM-Tree tra theo thứ tự nào, và vì sao thứ tự đó quan trọng?
   <details><summary>Đáp án</summary>Tra **memtable trước**, rồi các SSTable từ **mới nhất → cũ nhất**. Quan trọng vì giá trị mới hơn (ghi đè) phải che giá trị cũ. Nếu tra nhầm thứ tự (cũ trước) → trả về giá trị stale đã bị ghi đè.</details>
2. Vì sao LSM-Tree **ghi nhanh** hơn B-Tree nhưng **đọc chậm** hơn?
   <details><summary>Đáp án</summary>**Ghi**: chỉ append vào WAL (đĩa, tuần tự) + thêm vào memtable (RAM) → không random write, cực nhanh. **Đọc**: phải tra lần lượt memtable + nhiều SSTable (mỗi cái ≥ 1 disk seek nếu Bloom báo "có thể có") → nhiều IO hơn B-Tree vốn chỉ leo cây ~4-5 lần đọc.</details>
3. Xóa một key trong LSM-Tree được làm thế nào, khi SSTable là bất biến (immutable)?
   <details><summary>Đáp án</summary>Ghi một **tombstone** (đánh dấu "đã xóa") vào memtable — không sửa SSTable cũ. Khi `GET`, gặp tombstone (mới hơn) trước giá trị cũ → trả "không tồn tại". Key thật chỉ bị loại bỏ khi **compaction** trộn các SSTable và bỏ qua key có tombstone.</details>

## 4. Bloom Filter

### 4.1. Ý tưởng

Cấu trúc xác suất kiểm tra "phần tử có trong tập hay không":

- **Không có sai âm** (false negative = 0).
- **Có thể sai dương** (false positive > 0).

Dùng $k$ hàm hash, đẩy mỗi key vào $k$ vị trí trong một mảng bit. Kiểm tra: cả $k$ bit đều bật → "có thể" có; có bit nào tắt → chắc chắn không.

### 4.2. Trade-off

- Cực kỳ tiết kiệm bộ nhớ ($\sim 10$ bit/phần tử).
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

Bảng $m$ bit, $k$ hash function, đã add $n$ key:
- Xác suất một bit **vẫn tắt**: $(1 - 1/m)^{kn} \approx e^{-kn/m}$
- Tỷ lệ **false positive**: $(1 - e^{-kn/m})^k$

Khi $n/m$ lớn → $e^{-kn/m} \to 0$ → FP rate **→ 100%**.

#### Số cụ thể với bảng nhỏ trong viz (m=64, k=3)

| Đã add $n$ | Bit bật xấp xỉ | FP rate xấp xỉ |
| --- | --- | --- |
| 5 | 21% | 0.9% |
| 10 | 38% | 5.5% |
| 20 | 61% | 23% |
| 30 | 76% | 44% |
| 50 | 90% | **73%** |
| 100 | 99% | **97%** |

→ Bảng 64 bit chỉ đáng tin với ~10 phần tử. Add 100 phần tử là **trả về "có" gần như luôn luôn**.

#### Cách thiết kế kích thước đúng

Công thức ngược: cho trước $n$ (số phần tử dự kiến) và $p$ (FP rate chấp nhận được):
```
m = - n · ln(p) / (ln 2)²
k = (m/n) · ln 2 ≈ 0.693 · (m/n)
```

**Ví dụ — 1 tỷ username, FP rate 1%**:
- $m \approx 10^9 \cdot 4{,}6 / 0{,}48 \approx 9{,}6 \times 10^9$ bit $\approx 1{,}2$ GB
- $k \approx 0{,}693 \cdot 9{,}6 \approx 7$ hàm hash

**Quy tắc gọn**: ~**10 bit/phần tử** cho FP ~1%; ~14 bit cho 0.1%.

#### Khi `n` vượt dự kiến (Bloom đã saturate)

| Cách | Mô tả |
| --- | --- |
| Resize/rebuild | Tạo Bloom mới lớn hơn, rehash toàn bộ key. $O(n)$ một lần. |
| **Scalable Bloom Filter (SBF)** | Chuỗi nhiều Bloom lớn dần. Khi cái hiện tại đầy → tạo cái mới gấp đôi. Query duyệt cả chuỗi. Không cần biết `n` từ đầu. |
| **Cuckoo Filter** | Thay thế hiện đại: tương đương memory, **hỗ trợ xóa**, khi đầy thì *thực sự* đầy (reject `add` ngay, không saturate ngầm). RocksDB, ScyllaDB đang chuyển sang. |

#### Phòng saturate trong production

Hệ thống thực luôn monitor `bits_set / m`. Vượt ngưỡng (vd 50%) → cảnh báo, lên kế hoạch rebuild. **Bloom không tự bảo vệ — người vận hành phải biết $n$ xấp xỉ trước, hoặc dùng SBF/Cuckoo.**

### 4.5. 💡 Trực giác (đã có ở mục 4, nhắc gọn)

Bloom filter = "chữ ký phân bố": mỗi item bật vài bit ngẫu nhiên trong mảng. Check = "tất cả bit ấy đều bật không?". Đụng nhau ngẫu nhiên → false positive (nhỏ, kiểm soát được). Không bao giờ tắt bit từng bật → no false negative.

### 4.6. ❓ Câu hỏi đã được trả lời trong các mục 4.1-4.4

- "Sai 2 chiều không?" → mục 4.1.
- "Tại sao tiết kiệm bộ nhớ?" → mục 4.2 (~10 bit/item).
- "Khi nào đầy?" → mục 4.4 (saturation toán).
- "Có xóa được không?" → mục 4.2 (counting Bloom).

### 4.7. ⚠ Lỗi thường gặp với Bloom

| Lỗi | Hậu quả |
|------|---------|
| Thiết kế $m$ không tính theo công thức $n \times 4{,}6 / \ln^2 2$ | Quá to (lãng phí) hoặc quá nhỏ (FP cao) |
| Dùng cùng hash với seed giống nhau cho $k$ hash | Các hash tương quan → FP cao hơn lý thuyết |
| Coi Bloom là "tìm kiếm cuối cùng" | Phải verify thật trong DB sau khi Bloom nói "có" |
| Cho phép xóa với Bloom thường (không counting) | Tắt bit có thể vô tình che key khác → false negative — sai nguyên tắc Bloom |

### 4.8. 📝 Tóm tắt Bloom Filter

- Bit array + $k$ hash, không false negative, có false positive.
- ~10 bit/item cho FP 1%; ~14 bit/item cho FP 0.1%.
- Saturation khi $n$ vượt thiết kế → cần SBF hoặc Cuckoo Filter để mở rộng.
- Use cases: pre-filter DB, web crawler, LSM SSTable lookup.

### 4.9. 🔁 Tự kiểm tra

1. Bloom filter trả về "**không có**" cho key `x`. Có thể tin chắc `x` không trong tập không? Còn khi trả "**có thể có**"?
   <details><summary>Đáp án</summary>"Không có" → **chắc chắn đúng** (no false negative): nếu `x` từng được add thì cả $k$ bit của nó đã bật, không thể có bit tắt. "Có thể có" → **phải verify thật** (có thể false positive: $k$ bit đó bị các key khác bật trùng).</details>
2. Bảng $m = 1000$ bit, $k = 3$ hàm hash, đã add $n = 100$ key. Ước lượng false positive rate.
   <details><summary>Đáp án</summary>FP $\approx (1 - e^{-kn/m})^k = (1 - e^{-3 \cdot 100/1000})^3 = (1 - e^{-0{,}3})^3 = (1 - 0{,}741)^3 = 0{,}259^3 \approx 0{,}017 = $ **~1,7%**. (Khá tốt vì $n/m = 0{,}1$ còn nhỏ.)</details>
3. Muốn lưu $10^7$ phần tử với FP rate 1%, cần bao nhiêu bộ nhớ và mấy hàm hash?
   <details><summary>Đáp án</summary>~**10 bit/phần tử** cho FP 1% → $m \approx 10 \times 10^7 = 10^8$ bit $= 12{,}5$ MB. Số hash $k \approx 0{,}693 \times (m/n) = 0{,}693 \times 10 \approx 7$ hàm. (So với lưu thật $10^7$ chuỗi ~ vài trăm MB — tiết kiệm hàng chục lần.)</details>

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

## 6. Thực hành: dùng trong code thật

> 💡 **Bài này giới thiệu 4 cấu trúc hệ thống. Sự thật thực tế: bạn TỰ CÀI đúng MỘT cái (Bloom), còn 3 cái kia bạn DÙNG qua thư viện/DB.** B-tree, skip list, LSM-tree quá phức tạp + đã được tối ưu hàng chục năm → tự cài cho production là sai lầm. Bloom filter thì đủ đơn giản (~30 dòng) và hữu ích để tự viết. Code Go dưới đây `go run` được.

### 6.1. Mini-project — Bloom filter chống cache penetration

Bài toán thật: trước mỗi truy vấn DB nặng, hỏi "key này **chắc chắn không tồn tại**?" để **khỏi đụng DB**. Bloom trả lời cực nhanh, $O(k)$, RAM nhỏ. **false = chắc chắn không có** (bỏ qua DB an toàn); **true = có thể có** (mới truy DB):

```go
import "hash/fnv"

type Bloom struct {
	bits []bool
	m, k int // m = số bit, k = số hàm hash
}

func NewBloom(m, k int) *Bloom { return &Bloom{bits: make([]bool, m), m: m, k: k} }

// k vị trí bằng double hashing (h1 + i·h2) từ một hash 64-bit — đỡ phải k hàm riêng
func (b *Bloom) positions(s string) []int {
	h := fnv.New64a()
	h.Write([]byte(s))
	x := h.Sum64()
	hi, lo := uint32(x>>32), uint32(x)
	pos := make([]int, b.k)
	for i := 0; i < b.k; i++ {
		pos[i] = int((hi+uint32(i)*lo)%uint32(b.m))
	}
	return pos
}

func (b *Bloom) Add(s string) {
	for _, p := range b.positions(s) {
		b.bits[p] = true
	}
}

// MightContain: false = CHẮC CHẮN chưa thêm; true = CÓ THỂ đã thêm (false positive được)
func (b *Bloom) MightContain(s string) bool {
	for _, p := range b.positions(s) {
		if !b.bits[p] {
			return false // 1 bit = 0 → chắc chắn chưa từng Add
		}
	}
	return true
}
```

Luồng dùng thật: `if !bloom.MightContain(key) { return "không có" }` → chặn ngay, khỏi query DB. Chỉ khi Bloom nói "có thể" mới đụng DB. Redis, Cassandra, HBase, Bitcoin SPV đều dùng kiểu này.

> ⚠ **Bẫy — Bloom KHÔNG xóa được, và sai một chiều.** Xóa một key = clear vài bit có thể phá key khác chung bit → Bloom chuẩn **không hỗ trợ xóa** (cần Counting Bloom / Cuckoo filter §5). Và nó chỉ sai kiểu **false positive** ("nói có nhưng không"), **không bao giờ false negative** — nên `false` luôn đáng tin tuyệt đối.

### 6.2. Ba cái còn lại: DÙNG, đừng tự cài

| Cấu trúc | Tự cài? | Dùng thật qua | Vì sao không tự cài |
|----------|---------|---------------|---------------------|
| **B+ tree** | ✗ | DB index (MySQL/Postgres), `go.etcd.io/bbolt`, `google/btree` | Cài đúng + tối ưu đĩa cực khó |
| **Skip list** | ✗ | **Redis Sorted Set** (`ZADD`...), một số concurrent map | Concurrency + cấp tầng ngẫu nhiên dễ sai |
| **LSM-tree** | ✗ | **LevelDB, RocksDB, Pebble, Cassandra, ScyllaDB** | Compaction + WAL + bloom-per-SSTable = cả một hệ thống |

```go
// Skip list trong thực tế = Redis ZSet (đã thấy ở L04 §8.2):
//   ZADD leaderboard 1500 "an"   → O(log n), bên dưới là skip list
// LSM-tree trong thực tế = mở một embedded KV store, KHÔNG tự viết:
//   db, _ := pebble.Open("data", &pebble.Options{})  // ghi nhanh nhờ LSM
//   db.Set([]byte("key"), []byte("val"), nil)
```

Hiểu cấu trúc bên trong (bài này dạy) = biết **chọn đúng** DB/lib cho workload: ghi nhiều → LSM (Cassandra/RocksDB); đọc-range nhiều → B+ tree (Postgres); ranking → skip list (Redis ZSet); lọc tồn tại → Bloom.

### 6.3. 🔁 Tự kiểm tra

> 1. Bloom `MightContain` trả `false` — có chắc key chưa từng thêm không? Trả `true` thì sao?
>    <details><summary>Đáp án</summary><b>false = chắc chắn chưa thêm</b> (vì nếu đã thêm thì mọi bit đã bật, không thể có bit 0). <b>true = có thể đã thêm</b>, nhưng có thể là false positive (các bit tình cờ bị key khác bật). Bloom sai một chiều.</details>
> 2. Vì sao không nên tự cài LSM-tree cho production?
>    <details><summary>Đáp án</summary>LSM = memtable + WAL + nhiều SSTable trên đĩa + compaction nền + bloom filter mỗi SSTable — cả một hệ con. LevelDB/RocksDB/Pebble đã tối ưu + test hàng chục năm. Tự cài = nhiều bug, chậm hơn.</details>
> 3. Workload **ghi cực nhiều** (log, metrics, time-series) nên chọn engine bên dưới là gì?
>    <details><summary>Đáp án</summary><b>LSM-tree</b> (RocksDB/Cassandra/ScyllaDB): ghi tuần tự vào memtable + WAL rất nhanh, flush thành SSTable sau. Đổi lại đọc point chậm hơn B-tree (phải tra nhiều SSTable, có bloom filter giúp).</details>

### 6.4. 📝 Tóm tắt mục 6

- **Tự cài**: chỉ Bloom filter (~30 dòng, hữu ích chống cache penetration). `false` đáng tin tuyệt đối, không xóa được.
- **Dùng thư viện/DB**: B+ tree (DB index/bbolt), skip list (Redis ZSet), LSM (RocksDB/Pebble/Cassandra).
- Hiểu cấu trúc → **chọn đúng** engine theo workload: ghi nhiều→LSM, đọc-range→B+tree, ranking→ZSet, lọc tồn tại→Bloom.

## 7. Tổng kết khóa học

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
- BST cân bằng (Red-Black/AVL): mỗi node chỉ chứa 1 khóa, cây cao $\sim \log_2 n$. Với $n = 10^9$ → chiều cao ~30 → 30 lần đọc đĩa.
- B+ tree với $m \approx 256$: chiều cao $\log_m n$ ~ 4-5 → 4-5 lần đọc đĩa, nhanh hơn ~6 lần.
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
   - Ma trận $d \times w$ (vd $5 \times 2^{20}$) hash counter.
   - Khi tăng view: hash URL bằng $d$ hàm → tăng $d$ ô.
   - Khi query: lấy min của $d$ ô đó.
   - Chi phí: ~20 MB cho sai số nhỏ.
3. Kết hợp với **top-K (Heavy Hitter)** nếu cần top URL.

Đổi lại: kết quả là xấp xỉ, có thể cao hơn thật một chút (không bao giờ thấp hơn).

## Code & Minh họa

- [solutions.go](./solutions.go) — Bloom filter mini + Count-Min Sketch demo trong Go.
- [visualization.html](./visualization.html) — Bloom filter 64 bit / 3 hash function, thử Add + Check để thấy false positive xảy ra như thế nào.

## Kết thúc

Bạn đã đi qua toàn bộ các cấu trúc dữ liệu từ cơ bản tới nâng cao. Bước tiếp theo là **[thuật toán (Algorithms)](../../../Algorithms/README.md)**: sắp xếp, tìm kiếm, quy hoạch động, đồ thị nâng cao — đã có thành một lĩnh vực riêng (`Algorithms`, ~52 lesson chia 8 tier), thuật toán chạy *trên* các cấu trúc bạn vừa học.
