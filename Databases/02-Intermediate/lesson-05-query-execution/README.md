# Lesson 05 — Query Execution & EXPLAIN

> Nhóm 2 — Trung cấp · Lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hành trình của một câu SQL** bên trong DBMS: parse → rewrite → optimize → execute.
- Hiểu vì sao **query optimizer (bộ tối ưu truy vấn)** chọn kế hoạch (plan) dựa trên **ước lượng chi phí (cost estimation)** chứ không phải đoán mò, và chi phí đó dựa vào **thống kê (statistics)**.
- Phân biệt **quét tuần tự (sequential/full scan)** với **truy cập qua index (index seek/scan)**, và biết *khi nào optimizer cố ý chọn full scan dù có index*.
- Hiểu 3 thuật toán join và chi phí ước lượng của chúng: **nested loop join**, **hash join**, **merge join**.
- Đọc và diễn giải được output của **`EXPLAIN`** và **`EXPLAIN ANALYZE`** (Seq Scan, Index Scan, Hash Join, `cost=..`, `rows=..`), phân biệt **rows ước lượng (estimated)** với **rows thực tế (actual)**.
- Biết các cách tối ưu thực dụng: thêm index, viết lại query, cập nhật statistics (`ANALYZE`).

## Kiến thức tiền đề

- [Lesson 02 — Index](../lesson-02-index/): B-tree index, cách index tăng tốc tra cứu. Bài này dùng lại khái niệm đó liên tục.
- [Lesson 04 — SQL trung cấp](../../01-Foundations/lesson-04-sql-trung-cap/): JOIN, GROUP BY, subquery — bạn cần đọc hiểu câu SQL trước khi học cách nó chạy.
- Hữu ích: [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) (cho hash join) và [Sorting](../../../Algorithms/) (cho merge join).

---

## 1. Đặt vấn đề: cùng một câu SQL, chạy nhanh hay chậm?

Bạn viết một câu rất bình thường:

```sql
SELECT o.id, c.name
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE c.city = 'Hanoi';
```

Trên một máy nó trả về trong **2 mili-giây**. Trên một máy khác, cùng dữ liệu, nó mất **8 giây**. Cùng một câu SQL — vì sao chênh nhau 4000 lần?

Câu trả lời: **SQL chỉ mô tả *kết quả mong muốn*, không mô tả *cách lấy***. DBMS tự quyết định cách chạy — gọi là **kế hoạch thực thi (execution plan)**. Có rất nhiều plan cho cùng một câu: quét cả bảng `orders` rồi mới lọc, hay dùng index trên `city` trước; nối hai bảng bằng nested loop hay hash join... Mỗi plan có chi phí khác nhau, và việc chọn nhầm plan là nguyên nhân số một khiến query chậm.

Bài này mở nắp capô để xem DBMS chọn plan thế nào, và dạy bạn đọc cái plan đó qua `EXPLAIN` — công cụ chẩn đoán quan trọng nhất của một người làm việc với CSDL.

💡 **Trực giác.** SQL giống lúc bạn nói với tài xế *"đưa tôi tới sân bay"* — bạn nói **đích đến**, không nói **lối đi**. Query optimizer là người tài xế kinh nghiệm: nhìn bản đồ (thống kê), ước lượng quãng đường từng lối (cost), rồi chọn đường nhanh nhất. Nếu bản đồ trong đầu tài xế đã lỗi thời (kẹt xe mà không biết), anh ta chọn nhầm đường → đó chính là "statistics lỗi thời → plan tệ".

---

## 2. Hành trình của một câu SQL: 4 giai đoạn

Khi bạn gửi câu SQL, DBMS xử lý qua 4 bước:

| Bước | Tên | Làm gì | Ví dụ |
| --- | --- | --- | --- |
| 1 | **Parse (phân tích cú pháp)** | Kiểm tra cú pháp đúng chưa, biến text thành cây cú pháp (parse tree) | `SELCT` → báo lỗi cú pháp |
| 2 | **Rewrite (viết lại)** | Áp dụng quy tắc tương đương: thay view bằng định nghĩa, đẩy điều kiện lọc xuống gần dữ liệu (predicate pushdown), bỏ subquery thừa | `WHERE 1=1 AND city='Hanoi'` → `WHERE city='Hanoi'` |
| 3 | **Optimize (tối ưu)** | Sinh nhiều plan tương đương, ước lượng cost từng cái, **chọn cái rẻ nhất** | Quét bảng hay dùng index? Join kiểu nào? |
| 4 | **Execute (thực thi)** | Chạy plan đã chọn, đọc dữ liệu, trả kết quả | Đọc trang đĩa, lọc, nối, trả về |

Bước 3 — **optimize** — là phần thú vị nhất và là trọng tâm của bài.

### 2.1 Optimizer chọn plan thế nào?

Với một câu SQL, có thể có **hàng chục đến hàng nghìn** plan tương đương về mặt kết quả nhưng khác nhau về tốc độ. Optimizer không chạy thử từng cái (quá đắt) mà **ước lượng chi phí** mỗi plan bằng một công thức, rồi chọn cái có chi phí nhỏ nhất.

**(a) Cost là gì.** Cost là một con số ước lượng *trừu tượng* (không phải giây) đại diện cho công sức thực thi: chủ yếu là **số trang đĩa phải đọc (I/O)** cộng **chi phí CPU xử lý từng dòng**. Số càng lớn → plan càng đắt. Cost dùng để **so sánh tương đối giữa các plan**, không phải để dự đoán thời gian tuyệt đối.

**(b) Vì sao cần.** Optimizer không thể chạy thử mọi plan để xem cái nào nhanh — như thế còn tốn hơn cả việc chạy query. Nó cần một cách *ước lượng rẻ* để loại bỏ các plan tồi mà không cần thực thi. Cost chính là thước đo đó.

**(c) Statistics — dữ liệu để ước lượng.** Để ước lượng cost, optimizer cần biết về dữ liệu. DBMS lưu sẵn **thống kê (statistics)** cho mỗi bảng:

- **Số dòng (row count / cardinality)**: bảng `orders` có 1.000.000 dòng.
- **Độ phân biệt (distinct values / selectivity)**: cột `city` có 64 giá trị khác nhau → một giá trị cụ thể (`'Hanoi'`) khớp khoảng 1.000.000 / 64 ≈ 15.625 dòng.
- **Histogram**: phân bố giá trị (có giá trị xuất hiện rất nhiều, có giá trị hiếm).

Từ những con số này, optimizer ước lượng: *"WHERE city='Hanoi' sẽ trả về ~15.625 dòng (1,5% bảng)"* → rồi tính cost cho plan dùng index vs plan quét toàn bảng.

### 2.2 Bốn ví dụ ước lượng selectivity

**Selectivity** = tỉ lệ dòng dự kiến khớp điều kiện = (số dòng khớp) / (tổng số dòng). Số càng nhỏ → điều kiện càng "kén" → index càng hữu ích.

| Điều kiện trên bảng 1.000.000 dòng | Thống kê | Rows ước lượng | Selectivity |
| --- | --- | --- | --- |
| `WHERE id = 42` (id là khóa chính, duy nhất) | 1.000.000 distinct | 1 | 0,0001% |
| `WHERE city = 'Hanoi'` (64 thành phố) | 64 distinct | ≈ 15.625 | 1,56% |
| `WHERE status = 'active'` (2 giá trị, 90% active) | histogram | ≈ 900.000 | 90% |
| `WHERE age > 0` (mọi dòng đều thỏa) | min = 1 | 1.000.000 | 100% |

⚠ **Lỗi thường gặp.** Nhiều người nghĩ "có index thì lúc nào dùng index cũng nhanh hơn quét bảng". Sai. Khi selectivity cao (trả về phần lớn bảng, như `status='active'` ở trên với 90%), dùng index lại **chậm hơn** quét tuần tự — sẽ chứng minh bằng số ở mục 3.

🔁 **Dừng lại tự kiểm tra.**
1. Cost trong `EXPLAIN` có phải là số mili-giây không?
2. Bảng `products` có 500.000 dòng, cột `category` có 50 giá trị phân bố đều. Ước lượng `WHERE category = 'sách'` trả về bao nhiêu dòng?

<details><summary>Đáp án</summary>

1. Không. Cost là số ước lượng trừu tượng (chủ yếu là số trang I/O + CPU/dòng), chỉ dùng để *so sánh tương đối* giữa các plan, không phải thời gian thật.
2. ≈ 500.000 / 50 = **10.000 dòng** (selectivity = 2%), giả sử phân bố đều.
</details>

📝 **Tóm tắt mục 2.** SQL qua 4 bước: parse → rewrite → optimize → execute. Optimizer sinh nhiều plan tương đương, ước lượng **cost** (số trừu tượng, chủ yếu I/O + CPU) dựa trên **statistics** (số dòng, độ phân biệt, histogram), rồi chọn plan rẻ nhất. **Selectivity** = tỉ lệ dòng khớp, quyết định index có đáng dùng không.

---

## 3. Quét tuần tự vs Index: khi nào chọn cái nào?

### 3.1 Hai cách truy cập dữ liệu

**(a) Sequential scan / Full scan (quét tuần tự / quét toàn bảng).** Đọc lần lượt **mọi** trang của bảng, lọc từng dòng theo điều kiện. Đọc đĩa **tuần tự** — rất hiệu quả về mặt phần cứng (đĩa đọc liên tục nhanh hơn nhảy lung tung).

**(b) Index seek/scan (truy cập qua index).** Dùng B-tree index để tìm các dòng khớp (~O(log n) bước), rồi với mỗi dòng tìm được phải **nhảy ngẫu nhiên** tới trang chứa dòng đó để đọc (random I/O). Random I/O **đắt hơn nhiều** so với sequential I/O.

💡 **Trực giác.** Quét tuần tự giống đọc cả cuốn truyện từ đầu tới cuối — chậm nếu chỉ cần 1 câu, nhưng nếu cần 90% nội dung thì đọc thẳng vẫn nhanh hơn là tra mục lục rồi lật tới-lật lui 90% số trang một cách lộn xộn. Index giống mục lục: tuyệt vời khi tìm *vài* mục, nhưng nếu phải tra *gần hết* mục lục rồi lật tới từng trang rời rạc thì còn mệt hơn đọc thẳng.

### 3.2 Walk-through bằng số: vì sao 90% dòng thì full scan thắng

Mô hình chi phí đơn giản hóa (mô phỏng cách optimizer suy luận). Giả sử bảng `orders`:

- **N = 1.000.000 dòng**, đóng gói **P = 10.000 trang** (mỗi trang ~100 dòng).
- Chi phí đọc 1 trang **tuần tự** = 1 đơn vị; đọc 1 trang **ngẫu nhiên** (random) = 4 đơn vị (đĩa phải seek).

**Plan A — Sequential scan:** đọc cả 10.000 trang tuần tự.
```
cost_seq = P × 1 = 10.000 × 1 = 10.000 đơn vị  (luôn cố định, không phụ thuộc selectivity)
```

**Plan B — Index scan:** với mỗi dòng khớp, phải làm ~1 random I/O (giả sử mỗi dòng khớp nằm một trang khác). Gọi `k` = số dòng khớp.
```
cost_idx ≈ k × 4   (bỏ qua chi phí đi xuống B-tree, vốn nhỏ ~log n)
```

So sánh tại các mức selectivity:

| Selectivity | k (dòng khớp) | cost_idx = k×4 | cost_seq | Optimizer chọn |
| --- | --- | --- | --- | --- |
| 0,01% | 100 | 400 | 10.000 | **Index** (400 ≪ 10.000) |
| 1% | 10.000 | 40.000 | 10.000 | **Seq Scan** (40.000 > 10.000) |
| 10% | 100.000 | 400.000 | 10.000 | **Seq Scan** |
| 90% | 900.000 | 3.600.000 | 10.000 | **Seq Scan** (chênh 360 lần!) |

**Điểm hòa vốn (break-even):** `k × 4 = 10.000` → `k = 2.500` dòng ≈ **0,25%** của bảng. Dưới ngưỡng này index thắng; trên ngưỡng này quét tuần tự thắng.

> Đây là lý do trả về 90% bảng thì optimizer **bỏ index, chọn full scan** — và đó là quyết định *đúng*, không phải lỗi. Đọc 10.000 trang tuần tự rẻ hơn nhiều so với 900.000 lần nhảy ngẫu nhiên.

⚠ **Lỗi thường gặp.** "Query chậm, tôi thấy nó dùng Seq Scan, chắc tại thiếu index!" — Chưa chắc. Nếu query trả về phần lớn bảng, Seq Scan **là** lựa chọn đúng; thêm index cũng vô ích vì optimizer sẽ không dùng. Vấn đề thật có thể nằm chỗ khác (join sai kiểu, thiếu điều kiện lọc).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy có index mà không dùng thì index thừa à?"* — Không hẳn. Cùng một index dùng đắc lực cho query selectivity thấp (`WHERE id=42`) nhưng bị bỏ qua cho query selectivity cao. Index vẫn đáng có nếu *có* query kén dùng tới nó.
- *"Số 4 (random I/O) ở đâu ra?"* — Là tham số mô hình (PostgreSQL gọi là `random_page_cost`, mặc định 4.0; `seq_page_cost` = 1.0). Trên SSD random rẻ hơn nên người ta hạ xuống ~1.1.

🔁 **Dừng lại tự kiểm tra.**
1. Với mô hình trên (P=10.000, random=4), nếu query trả về 1.500 dòng, optimizer chọn gì?
2. Nếu chuyển sang SSD và đặt random_page_cost = 1.0, điểm hòa vốn dịch về phía nào?

<details><summary>Đáp án</summary>

1. `cost_idx = 1.500 × 4 = 6.000 < 10.000 = cost_seq` → chọn **Index scan**.
2. Random rẻ hơn → index hấp dẫn hơn → điểm hòa vốn **dịch lên cao hơn** (break-even khi `k×1 = 10.000` → k = 10.000 dòng = 1%). Tức index được dùng cho nhiều query hơn.
</details>

📝 **Tóm tắt mục 3.** Seq scan đọc cả bảng tuần tự (cost cố định = P). Index scan tốt khi ít dòng khớp nhưng mỗi dòng tốn random I/O đắt. Có **điểm hòa vốn** về selectivity: dưới ngưỡng → index thắng, trên ngưỡng → full scan thắng. Optimizer chọn full scan khi trả về phần lớn bảng là quyết định đúng.

---

## 4. Ba thuật toán Join

Khi nối hai bảng, optimizer chọn 1 trong 3 thuật toán. Giả sử join `orders` (m dòng) với `customers` (n dòng) trên `orders.customer_id = customers.id` (equi-join — nối bằng dấu `=`).

### 4.1 Nested Loop Join (vòng lặp lồng nhau)

💡 **Trực giác.** Như tìm tên trong danh bạ: với *mỗi* người ở danh sách A, lật *cả* danh sách B tìm người trùng. Nếu B có mục lục (index) thì không phải lật cả B mà tra thẳng.

**Cách hoạt động:** với mỗi dòng của bảng ngoài (outer), duyệt bảng trong (inner) tìm dòng khớp.

```
cho mỗi dòng a trong outer:        # m lần
    cho mỗi dòng b trong inner:    # n lần
        nếu a.customer_id == b.id: xuất (a, b)
```

**Chi phí:** O(m × n) so sánh — đắt nếu cả hai bảng to. **Nhưng** nếu bảng inner có **index** trên cột join, không cần duyệt cả inner mà tra ~O(log n) → chi phí còn **O(m × log n)**.

**Ví dụ số.** outer `orders` = 1.000 dòng, inner `customers` = 100.000 dòng.
- Không index: 1.000 × 100.000 = **100.000.000** so sánh.
- Có index trên `customers.id`: 1.000 × log₂(100.000) ≈ 1.000 × 17 = **17.000** bước. Nhanh hơn ~5.900 lần.

**Tốt khi:** một bảng nhỏ + bảng kia có index trên cột join.

### 4.2 Hash Join (nối bằng bảng băm)

💡 **Trực giác.** Thay vì lật danh sách B nhiều lần, ta **đánh số nhà** cho mọi người trong B một lần (xây hash table), rồi với mỗi người ở A đi thẳng tới "số nhà" tương ứng. Xây 1 lần, tra cực nhanh.

**Cách hoạt động — 2 pha:**
1. **Build:** chọn bảng **nhỏ hơn**, xây [hash table](../../../DataStructures/01-Basic/lesson-06-hash-table/) trên cột join (key = `customers.id`).
2. **Probe:** quét bảng lớn, với mỗi dòng băm `customer_id` rồi tra trong hash table → tìm khớp trong O(1) trung bình.

**Chi phí:** O(m + n) — đọc mỗi bảng *một lần*. Tuyệt vời cho equi-join trên bảng lớn **không** có index sẵn.

**Ví dụ số.** `orders` = 1.000.000 dòng, `customers` = 100.000 dòng.
- Hash join: 100.000 (build) + 1.000.000 (probe) = **1.100.000** thao tác.
- Nested loop không index: 1.000.000 × 100.000 = **100 tỉ** so sánh.
- Hash join nhanh hơn ~90.000 lần.

⚠ **Lỗi thường gặp.** Hash join chỉ dùng được cho **equi-join** (điều kiện `=`). Với `ON a.x < b.y` (bất đẳng thức) không băm được → optimizer phải dùng nested loop hoặc merge.

### 4.3 Merge Join (nối trộn — sort-merge)

💡 **Trực giác.** Như ghép hai danh sách điểm danh **đã sắp theo tên**: hai ngón tay trỏ chạy song song từ trên xuống, ngón nào nhỏ hơn thì nhích, gặp trùng thì ghép. Mỗi danh sách chỉ đi qua một lần.

**Cách hoạt động:** yêu cầu **cả hai input đã được sắp xếp** theo cột join. Hai con trỏ chạy song song, nhích con trỏ ở bên có giá trị nhỏ hơn, khớp khi hai giá trị bằng nhau. (Liên quan: [merge sort](../../../Algorithms/), bước trộn giống hệt.)

**Chi phí:**
- Nếu **đã sắp sẵn** (vì có index theo thứ tự, hoặc bước trước đã sort): chỉ O(m + n) để trộn.
- Nếu **phải sort trước**: O(m log m + n log n) cho việc sắp, rồi O(m + n) trộn.

**Ví dụ số.** `orders` = 1.000.000, `customers` = 100.000, **cả hai đã có index sắp theo cột join**:
- Merge join: chỉ ~1.000.000 + 100.000 = **1.100.000** bước trộn (không tốn sort).
- Nếu phải sort `orders`: thêm 1.000.000 × log₂(1.000.000) ≈ 20.000.000 bước → đắt hơn hash join.

**Tốt khi:** cả hai input đã sorted/indexed theo cột join (hoặc query cần kết quả đã sắp xếp luôn).

### 4.4 Bảng so sánh nhanh

| Thuật toán | Chi phí | Điều kiện join | Tốt nhất khi |
| --- | --- | --- | --- |
| **Nested loop** | O(m×n), hoặc O(m·log n) nếu inner có index | Bất kỳ (kể cả `<`, `>`) | 1 bảng nhỏ + bảng kia có index |
| **Hash join** | O(m+n) | Chỉ equi-join (`=`) | 2 bảng lớn, không index sẵn |
| **Merge join** | O(m+n) nếu sorted; +sort nếu chưa | Equi-join & range (`<=`) | Input đã sorted/indexed |

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Optimizer chọn cái nào?"* — Ước lượng cost cả ba (dựa trên kích thước bảng + có index + đã sorted chưa) rồi chọn rẻ nhất. Bảng nhỏ → nested loop; equi-join hai bảng lớn không index → hash; có sẵn thứ tự → merge.
- *"Hash table có vỡ bộ nhớ không?"* — Nếu bảng build không vừa RAM, DBMS chia thành nhiều phần (grace hash join), tốn thêm I/O. Đây là lúc hash join mất ưu thế.

🔁 **Dừng lại tự kiểm tra.**
1. Join hai bảng 5.000.000 dòng trên `a.id = b.aid`, không bảng nào có index, không sorted. Chọn thuật toán nào?
2. Cùng câu trên nhưng điều kiện là `a.ts BETWEEN b.lo AND b.hi` (range). Hash join còn dùng được không?

<details><summary>Đáp án</summary>

1. **Hash join** — equi-join hai bảng lớn không index, O(m+n) ≈ 10 triệu thao tác, rẻ nhất.
2. **Không** — đây không phải equi-join. Phải dùng nested loop (hoặc merge nếu sắp theo `ts`).
</details>

📝 **Tóm tắt mục 4.** Nested loop O(m×n) (hoặc O(m·log n) với index inner) — hợp bảng nhỏ. Hash join O(m+n) — hợp equi-join hai bảng lớn, build hash trên bảng nhỏ rồi probe. Merge join O(m+n) khi input đã sorted — hợp khi có index theo thứ tự. Optimizer ước lượng cost cả ba rồi chọn rẻ nhất.

---

## 5. Đọc EXPLAIN và EXPLAIN ANALYZE

`EXPLAIN <câu SQL>` cho ta xem **plan mà optimizer đã chọn** (kèm cost ước lượng) **mà không chạy** query. `EXPLAIN ANALYZE` thì **chạy thật** và báo thêm thời gian + số dòng *thực tế*.

### 5.1 Ví dụ output (PostgreSQL)

```sql
EXPLAIN SELECT o.id, c.name
FROM orders o JOIN customers c ON c.id = o.customer_id
WHERE c.city = 'Hanoi';
```

Output (đọc từ **trong ra ngoài, dưới lên trên**):

```
Hash Join  (cost=270.00..18750.00 rows=15600 width=40)
  Hash Cond: (o.customer_id = c.id)
  ->  Seq Scan on orders o  (cost=0.00..16370.00 rows=1000000 width=12)
  ->  Hash  (cost=255.00..255.00 rows=15600 width=36)
        ->  Index Scan using idx_cust_city on customers c
              (cost=0.42..255.00 rows=15600 width=36)
              Index Cond: (city = 'Hanoi')
```

**Cách đọc:**

| Phần tử | Ý nghĩa |
| --- | --- |
| `Hash Join` | Node trên cùng: nối hai nhánh con bằng hash join |
| `Seq Scan on orders` | Quét toàn bảng `orders` (optimizer thấy cần phần lớn `orders`) |
| `Index Scan using idx_cust_city` | Dùng index trên `customers.city` vì `city='Hanoi'` rất kén dòng |
| `cost=270.00..18750.00` | `start..total`: cost để trả **dòng đầu tiên** = 270, cost để trả **toàn bộ** = 18750 |
| `rows=15600` | **Ước lượng** số dòng node này trả ra |
| `width=40` | Ước lượng bề rộng trung bình mỗi dòng (byte) |

Cây plan tương ứng:

```
        Hash Join  (cost ..18750, rows 15600)
        /                    \
  Seq Scan orders        Hash build
  (rows 1.000.000)            |
                       Index Scan customers.city='Hanoi'
                       (rows 15600)
```

### 5.2 EXPLAIN ANALYZE — estimated vs actual

```
Hash Join  (cost=270.00..18750.00 rows=15600 width=40)
           (actual time=3.2..142.5 rows=15203 loops=1)
  ->  Seq Scan on orders o
        (cost=0.00..16370.00 rows=1000000 width=12)
        (actual time=0.01..58.0 rows=1000000 loops=1)
  ->  ...
```

Mỗi node giờ có thêm `(actual time=.. rows=.. loops=..)`.

⚠ **Lỗi thường gặp — estimated vs actual rows.** So sánh `rows=` (ước lượng) với `actual rows=` (thực tế) là **kỹ năng chẩn đoán quan trọng nhất**:

- Nếu **gần bằng nhau** (15.600 vs 15.203) → statistics còn chuẩn, optimizer suy luận đúng.
- Nếu **lệch nhiều** (ví dụ ước lượng `rows=10` nhưng `actual rows=2000000`) → **statistics lỗi thời** → optimizer tưởng nhánh đó bé nên chọn nested loop, hóa ra khổng lồ → plan tệ, query chậm thảm hại.

> Lệch ước lượng/thực tế là dấu hiệu số một của "statistics cần cập nhật" hoặc "điều kiện phức tạp optimizer không ước lượng nổi". Cách sửa thường là chạy `ANALYZE` (mục 6).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"`loops=N` nghĩa là gì?"* — Node đó được thực thi N lần (thường trong nested loop, nhánh inner chạy lại với mỗi dòng outer). `actual time` là thời gian **mỗi loop**, tổng = time × loops.
- *"Vì sao đọc từ trong ra?"* — Vì node con chạy trước, kết quả của nó là input cho node cha. Node thụt sâu nhất là việc làm đầu tiên.

📝 **Tóm tắt mục 5.** `EXPLAIN` xem plan + cost ước lượng (không chạy); `EXPLAIN ANALYZE` chạy thật, cho `actual time/rows`. Đọc cây từ trong ra ngoài. `cost=start..total`, `rows=` là ước lượng. So sánh **estimated vs actual rows**: lệch lớn = statistics lỗi thời → plan tệ.

---

## 6. Tối ưu thực dụng: 3 công cụ

Khi gặp query chậm, theo thứ tự:

1. **Cập nhật statistics — `ANALYZE` (rẻ nhất, thử trước).** DBMS dựa trên thống kê để chọn plan; nếu bảng vừa thay đổi nhiều mà thống kê chưa cập nhật, optimizer ước lượng sai. Chạy `ANALYZE orders;` (PostgreSQL) để thu lại số dòng & phân bố. Nếu `EXPLAIN ANALYZE` cho thấy estimated lệch actual nhiều → đây là thủ phạm.

2. **Thêm index.** Nếu query lọc/join trên cột chưa có index *và* selectivity thấp (kén dòng), thêm index có thể đổi Seq Scan → Index Scan. Nhớ: chỉ hữu ích khi selectivity thấp (mục 3). Cái giá: ghi chậm hơn, tốn dung lượng (xem [Lesson 02 — Index](../lesson-02-index/)).

3. **Viết lại query.** Đôi khi cùng kết quả nhưng cách viết khác cho plan tốt hơn:
   - Thêm điều kiện lọc để giảm dòng sớm (đẩy `WHERE` xuống dưới).
   - Tránh hàm bọc quanh cột được index: `WHERE YEAR(created_at) = 2024` khiến index trên `created_at` **vô dụng** (optimizer không tra index qua hàm); viết `WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'` thì index dùng được.
   - Tránh `SELECT *` khi chỉ cần vài cột (giảm I/O, có thể dùng index-only scan).

💡 **Trực giác.** Ba công cụ theo thứ tự "rẻ → đắt về công sức": dạy lại bản đồ cho tài xế (`ANALYZE`) → làm thêm lối tắt (index) → đổi điểm đến cho dễ đi (viết lại query).

⚠ **Lỗi thường gặp.** Bọc cột trong hàm rồi than "index không ăn". `WHERE LOWER(email) = 'a@x.com'` vô hiệu hóa index trên `email`. Sửa: tạo index trên biểu thức `LOWER(email)`, hoặc chuẩn hóa dữ liệu lúc ghi.

---

## 7. Bài tập

1. **Đọc EXPLAIN.** Cho output sau:
   ```
   Index Scan using idx_orders_id on orders  (cost=0.42..8.44 rows=1 width=20)
     Index Cond: (id = 42)
   ```
   (a) Optimizer dùng cách truy cập nào? (b) Vì sao chọn cách đó? (c) Ước lượng trả về bao nhiêu dòng?

2. **Chọn join algorithm.** Với mỗi tình huống, chọn thuật toán phù hợp nhất và giải thích một câu:
   (a) Nối `users` (50 dòng) với `orders` (2.000.000 dòng có index trên `user_id`), điều kiện `=`.
   (b) Nối `orders` (5.000.000) với `payments` (4.000.000), điều kiện `=`, không bảng nào có index, không sorted.
   (c) Nối `a` với `b`, cả hai đã có index sắp theo cột join, điều kiện `=`.
   (d) Nối `events` với `sessions` theo `event.ts BETWEEN session.start AND session.end` (range).

3. **Scan hay Index theo selectivity.** Bảng `logs` có **2.000.000 dòng**, đóng gói **20.000 trang**, `random_page_cost = 4`, `seq_page_cost = 1`. Mô hình: `cost_seq = số_trang × 1`, `cost_idx = số_dòng_khớp × 4`.
   (a) Query trả về 3.000 dòng — optimizer chọn gì?
   (b) Query trả về 800.000 dòng (40%) — chọn gì?
   (c) Tính điểm hòa vốn (số dòng khớp mà ở đó hai cách bằng cost).

4. **Chẩn đoán query chậm.** Một query `EXPLAIN ANALYZE` cho:
   ```
   Nested Loop  (cost=0.42..120.0 rows=5 ...) (actual time=.. rows=1850000 loops=1)
     ->  Seq Scan on big  (... rows=5 ...) (actual rows=1850000 loops=1)
     ->  Index Scan on other (... loops=1850000)
   ```
   (a) Optimizer ước lượng `big` trả 5 dòng nhưng thực tế bao nhiêu? (b) Hệ quả gì lên lựa chọn join? (c) Đề xuất 1 cách sửa.

---

## 8. Lời giải chi tiết

### Bài 1 — Đọc EXPLAIN

- **(a)** `Index Scan` — truy cập qua index `idx_orders_id`, với `Index Cond: (id = 42)`.
- **(b)** Vì điều kiện `id = 42` trên khóa chính (duy nhất) → selectivity cực thấp (1 dòng / cả bảng). Index trỏ thẳng tới đúng dòng, rẻ hơn quét toàn bảng rất nhiều. Cost tổng chỉ 8.44 (rất nhỏ).
- **(c)** `rows=1` — ước lượng trả về **1 dòng** (vì `id` là khóa chính duy nhất).

### Bài 2 — Chọn join algorithm

- **(a) Nested loop join.** `users` rất nhỏ (50 dòng) làm outer, `orders` có index trên `user_id` làm inner → 50 × log(2.000.000) ≈ 50 × 21 ≈ 1.050 bước. Bảng nhỏ + inner có index = đúng "sân nhà" của nested loop.
- **(b) Hash join.** Equi-join hai bảng lớn, không index, không sorted. Build hash trên `payments` (nhỏ hơn, 4 triệu) rồi probe bằng `orders` → O(m+n) ≈ 9 triệu thao tác. Nested loop sẽ là 5M×4M = 20 nghìn tỉ → loại. Merge phải sort cả hai → đắt hơn hash.
- **(c) Merge join.** Cả hai đã sorted/indexed theo cột join → chỉ cần bước trộn O(m+n), không tốn sort. Rẻ nhất trong trường hợp này.
- **(d) Nested loop join.** Điều kiện là range (`BETWEEN`), **không phải equi-join** → hash join không dùng được. Merge join chỉ hợp nếu sắp theo `ts`; mặc định nested loop (lý tưởng nếu `sessions` có index theo `start/end`).

### Bài 3 — Scan hay Index theo selectivity

- `cost_seq = 20.000 × 1 = 20.000` (cố định).
- **(a)** 3.000 dòng: `cost_idx = 3.000 × 4 = 12.000 < 20.000` → chọn **Index Scan**.
- **(b)** 800.000 dòng: `cost_idx = 800.000 × 4 = 3.200.000 ≫ 20.000` → chọn **Seq Scan** (chênh 160 lần).
- **(c)** Điểm hòa vốn: `k × 4 = 20.000` → `k = 5.000 dòng` = 5.000 / 2.000.000 = **0,25%**. Dưới 5.000 dòng → index thắng; trên → seq scan thắng.

### Bài 4 — Chẩn đoán query chậm

- **(a)** Ước lượng `rows=5` nhưng `actual rows=1.850.000` — lệch **370.000 lần**. Statistics sai nghiêm trọng (hoặc điều kiện phức tạp optimizer không ước lượng nổi).
- **(b)** Vì tưởng `big` chỉ trả 5 dòng, optimizer chọn **nested loop** (rẻ khi outer bé). Thực tế outer có 1,85 triệu dòng → nhánh inner (`Index Scan on other`) bị chạy `loops=1.850.000` lần → cực chậm. Với kích thước thật, **hash join** mới đúng.
- **(c)** Cách sửa:
  1. Chạy `ANALYZE big;` để cập nhật statistics → optimizer ước lượng lại đúng, có thể tự đổi sang hash join.
  2. Nếu vẫn sai (điều kiện phức tạp): tạo *extended statistics* hoặc viết lại query để optimizer ước lượng dễ hơn.
  3. Kiểm tra điều kiện `WHERE` trên `big` có bọc hàm làm hỏng ước lượng không.

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm 3 mô-đun:
  1. **Optimizer: scan vs index theo selectivity** — kéo thanh trượt "% dòng khớp", xem cost ước lượng của full scan vs index, optimizer tự đổi quyết định quanh điểm hòa vốn.
  2. **3 join algorithm** — chọn nested loop / hash / merge trên 2 bảng nhỏ, xem animation cách chạy + đếm số phép so sánh và so sánh chi phí.
  3. **EXPLAIN viewer** — cây plan dạng node lồng nhau (SVG), bấm node để xem giải thích cost/rows.

---

## Bài tiếp theo

→ [Lesson 06 — View / Procedure / Trigger](../lesson-06-view-procedure-trigger/): đóng gói logic truy vấn thành view, thủ tục lưu trữ và trigger.
