# Lesson 02 — Index (chỉ mục)

> Nhóm 2 — Trung cấp · Bài thứ hai của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao truy vấn không có index phải **quét toàn bảng (full table scan)** với chi phí O(n), và **index (chỉ mục)** giúp tìm xuống còn ~O(log n).
- Nắm cấu trúc **B-tree / B+tree** — bộ khung của hầu hết index trong RDBMS — và vì sao nó hợp với đĩa.
- Phân biệt **hash index** (O(1) cho so sánh bằng) với B-tree (hỗ trợ range, ORDER BY).
- Phân biệt **clustered** vs **non-clustered (secondary) index**, hiểu **covering index** và **composite index** với quy tắc **leftmost prefix**.
- Cân nhắc đánh đổi: index tăng tốc đọc nhưng làm chậm ghi và tốn dung lượng → biết khi nào **không** nên index.

## Kiến thức tiền đề

- [Lesson 01 — Chuẩn hóa](../lesson-01-chuan-hoa/): hiểu bảng, khóa chính (primary key), khóa ngoại (foreign key).
- [Foundations — SQL cơ bản](../../01-Foundations/lesson-03-sql-co-ban/): biết `SELECT ... WHERE`, `ORDER BY`.
- Hữu ích: [DataStructures — Cây cân bằng (B-tree)](../../../DataStructures/02-Intermediate/lesson-04-balanced-trees/) và [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) — index chính là ứng dụng thực tế của hai cấu trúc này.

---

## 1. Đặt vấn đề: tìm 1 dòng trong 1 triệu dòng

Giả sử bảng `users` có **1.000.000 dòng** và bạn chạy:

```sql
SELECT * FROM users WHERE email = 'an@example.com';
```

Nếu không có gì hỗ trợ, DBMS buộc phải làm **full table scan (quét toàn bảng)**: đọc lần lượt từng dòng, so sánh `email`, cho tới khi tìm thấy (hoặc hết bảng).

💡 **Trực giác.** Quét toàn bảng giống việc tìm một người tên "An" trong cuốn danh bạ **không sắp xếp**: bạn phải lật từng trang từ đầu đến cuối. Index giống cuốn danh bạ **đã sắp theo tên + có gáy chữ cái**: lật thẳng tới chữ "A", thu hẹp dần — vài bước là tới nơi.

### 1.1 Walk-through bằng số thật

| | Quét toàn bảng | Index (B-tree) |
| --- | --- | --- |
| Cơ chế | Đọc tuần tự mọi dòng | Đi xuống cây, mỗi tầng loại bỏ phần lớn dữ liệu |
| Số bước (1.000.000 dòng) | tới **1.000.000** so sánh | log₂(1.000.000) ≈ **20** bước |
| Vì sao | Không có cách "nhảy thẳng" | Mỗi bước cắt đôi (hoặc hơn) không gian tìm kiếm |

Cụ thể: 2²⁰ = 1.048.576 > 1.000.000, nên cần khoảng **20** bước nếu cây phân nhánh đôi. Nhanh hơn ≈ 1.000.000 / 20 = **50.000 lần**. (Index thật phân nhánh hàng trăm nhánh mỗi tầng nên còn ít tầng hơn nữa — xem mục 2.)

⚠ **Lưu ý.** "Quét O(n)" không phải lúc nào cũng xấu. Nếu truy vấn lấy *phần lớn bảng* (vd 80% số dòng), quét tuần tự lại **nhanh hơn** đi qua index hàng triệu lần. Index chỉ thắng khi truy vấn **chọn lọc** (lọc ra ít dòng). Bộ tối ưu (optimizer) sẽ quyết định — xem mục 7.

📝 **Tóm tắt mục 1.** Không index → full table scan O(n). Index → ~O(log n). Với 1 triệu dòng là chênh lệch ~20 bước vs 1 triệu bước. Nhưng index chỉ có lợi với truy vấn chọn lọc.

---

## 2. B-tree / B+tree — cấu trúc index mặc định

Hầu hết index trong PostgreSQL, MySQL (InnoDB), SQL Server, Oracle đều là **B+tree**. Đây chính là ứng dụng trực tiếp của [cây cân bằng B-tree trong DataStructures](../../../DataStructures/02-Intermediate/lesson-04-balanced-trees/) — bài đó dạy cấu trúc; bài này dạy nó được dùng làm index ra sao.

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** B+tree là cây **cân bằng**, **nhiều nhánh (fanout cao)**: mỗi node chứa nhiều khóa và nhiều con trỏ con, không phải chỉ 2 như cây nhị phân. Mọi dữ liệu (con trỏ tới dòng) nằm ở **node lá (leaf)**; các lá nối nhau thành danh sách liên kết để quét range nhanh.

**(b) Vì sao tồn tại (vì sao không dùng cây nhị phân thường).** Dữ liệu nằm trên **đĩa**, đọc theo **page (trang ~ 4–16 KB)**. Mỗi lần đọc page tốn một lần I/O đắt. Nếu mỗi node chỉ chứa 1 khóa (cây nhị phân), một page chứa rất nhiều node bị lãng phí và cây cao → nhiều lần đọc đĩa. B+tree nhét cả trăm khóa vào một node = một page → **fanout cao → cây thấp → ít lần đọc đĩa**.

**(c) Ví dụ trực giác bằng số.** Giả sử mỗi node chứa **100** khóa (fanout 101):
- 1 tầng: tới 100 khóa.
- 2 tầng: tới 100 × 101 ≈ 10.100 khóa.
- 3 tầng: ≈ 1.020.000 khóa.
- 4 tầng: ≈ 100 triệu khóa.

Tức là tra 1 dòng trong **100 triệu dòng** chỉ cần đọc **4 page** (4 lần I/O). Đây là sức mạnh của fanout cao.

### 2.2 Walk-through: tra một khóa qua các tầng

Tìm khóa `57` trong B+tree (mỗi node minh họa giữ vài khóa cho gọn):

```
                 [ 30 | 60 ]                ← root
                /     |     \
        [10|20]   [40|50]   [70|80]         ← internal
                     |
              [40][50][57][58]              ← leaf  → con trỏ tới dòng
```

1. **Root** `[30 | 60]`: 57 nằm giữa 30 và 60 → đi nhánh giữa.
2. **Internal** `[40 | 50]`: 57 > 50 → đi nhánh phải của node này (tới lá `[...57...]`).
3. **Leaf** `[40][50][57][58]`: tìm thấy `57` → lấy con trỏ tới dòng.

Tổng cộng **3 lần đọc node** (3 tầng) thay vì quét toàn bộ khóa. Nếu cây có 1 triệu khóa nhưng chỉ 3–4 tầng, ta luôn chạm 3–4 node.

### 2.3 Vì sao B+tree hỗ trợ range tốt

Vì các **lá nối nhau theo thứ tự**, một truy vấn `WHERE age BETWEEN 30 AND 40` chỉ cần tìm lá đầu (age=30) rồi **đi dọc danh sách lá** tới khi vượt 40 — không phải quay lại root. Tương tự `ORDER BY age` lấy sẵn thứ tự từ chuỗi lá, không cần sort lại.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Sao không dùng mảng đã sắp xếp rồi binary search?"* — Mảng sắp xếp tra cũng O(log n), nhưng **chèn/xóa** phải dịch hàng triệu phần tử O(n). B+tree chèn/xóa O(log n) và vẫn giữ cân bằng → hợp với bảng thay đổi liên tục.
- *"B-tree khác B+tree chỗ nào?"* — B-tree để dữ liệu ở cả node trong lẫn lá; B+tree chỉ để ở lá + nối lá. RDBMS gần như luôn dùng **B+tree** vì range scan tốt hơn. Ta hay gọi chung là "B-tree index".

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao index trên đĩa dùng fanout cao thay vì cây nhị phân?
2. Cây fanout 100, 4 tầng chứa được khoảng bao nhiêu khóa?

<details><summary>Đáp án</summary>

1. Dữ liệu đọc theo page; fanout cao nhét nhiều khóa vào 1 page → cây thấp → ít lần đọc đĩa (I/O). Cây nhị phân cao → nhiều I/O đắt.
2. ≈ 100⁴ = 100 triệu khóa, tra chỉ cần 4 lần đọc page.
</details>

📝 **Tóm tắt mục 2.** B+tree = cây cân bằng fanout cao, dữ liệu ở lá, lá nối nhau. Hợp đĩa (đọc theo page → ít I/O), hỗ trợ cả tra điểm (=), range (BETWEEN) và ORDER BY. Đây là index mặc định của hầu hết RDBMS.

---

## 3. Hash index — nhanh cho so sánh bằng, nhưng không range

### 3.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** Hash index lưu các khóa qua một **hàm băm (hash function)** vào **bảng băm (hash table)** — xem [DataStructures — Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/). Tra cứu `key = giá trị` → tính hash → nhảy thẳng tới bucket → ~**O(1)**.

**(b) Vì sao tồn tại.** Với truy vấn **chỉ so sánh bằng** (vd `WHERE token = 'abc123'`), hash index nhanh hơn B+tree vì không cần đi nhiều tầng — chỉ một phép tính hash.

**(c) Hạn chế quan trọng.** Hash phá vỡ thứ tự: `hash(10)` và `hash(11)` rơi vào bucket bất kỳ, **không** liền nhau. Do đó hash index **KHÔNG hỗ trợ**:
- Range: `WHERE age > 30`, `BETWEEN`.
- `ORDER BY` (không lấy được thứ tự).
- Tìm theo tiền tố: `LIKE 'an%'`.

### 3.2 Bốn ví dụ: B-tree hay hash phù hợp?

| Truy vấn | Phù hợp | Vì sao |
| --- | --- | --- |
| `WHERE email = 'a@x.com'` | Cả hai (hash hơi nhanh hơn) | Chỉ so sánh bằng |
| `WHERE age BETWEEN 20 AND 30` | **B-tree** | Range — hash không làm được |
| `ORDER BY created_at` | **B-tree** | Cần thứ tự — hash không có |
| `WHERE status = 'paid'` (chỉ =) | Cả hai | So sánh bằng đơn thuần |

⚠ **Lỗi thường gặp.** Tưởng "hash luôn nhanh hơn nên dùng hash cho mọi cột". Sai: phần lớn truy vấn thực tế có range / sort / nhiều cột → B-tree đa năng hơn. Vì vậy mặc định của hầu hết RDBMS là **B+tree**, hash chỉ dùng cho ca thuần so-sánh-bằng.

📝 **Tóm tắt mục 3.** Hash index: O(1) cho `=`, nhưng không range/ORDER BY/LIKE prefix. B-tree đa năng → mặc định. Chọn hash chỉ khi truy vấn thuần so sánh bằng.

---

## 4. Các loại index theo cách tổ chức dữ liệu

### 4.1 Clustered vs non-clustered (secondary)

💡 **Trực giác.** **Clustered index** giống một cuốn từ điển: các *trang dữ liệu thật* được **sắp xếp vật lý** theo khóa (từ A→Z). **Non-clustered index** giống mục lục cuối sách: một bảng "từ → số trang" tách riêng, dữ liệu thật nằm chỗ khác.

- **Clustered index**: dòng dữ liệu được lưu trữ vật lý **theo thứ tự của khóa index**. Vì dữ liệu chỉ xếp được theo *một* thứ tự, mỗi bảng chỉ có **một** clustered index (thường là khóa chính). Tra qua clustered → tới thẳng dòng.
- **Non-clustered / secondary index**: cấu trúc tách riêng, lá chứa **con trỏ** (hoặc khóa chính) tới dòng thật. Một bảng có **nhiều** secondary index. Tra qua secondary → tìm con trỏ → còn một bước "nhảy" tới dòng thật.

### 4.2 Covering index (index-only scan)

**Là gì.** Nếu mọi cột mà truy vấn cần đều **đã nằm trong index**, DBMS đọc xong index là trả kết quả luôn, **không cần** nhảy về bảng. Gọi là **index-only scan / covering index**.

Ví dụ index `(city, name)`:
```sql
SELECT name FROM users WHERE city = 'Hanoi';   -- covered: name có sẵn trong index
SELECT email FROM users WHERE city = 'Hanoi';  -- KHÔNG covered: email không có trong index → phải về bảng
```
Câu đầu nhanh hơn vì tránh bước nhảy về bảng cho từng dòng.

### 4.3 Composite index và quy tắc leftmost prefix

**Composite index (index nhiều cột)** `(a, b, c)` sắp xếp dữ liệu **theo a trước, rồi b, rồi c** — giống sắp danh bạ theo (họ, tên đệm, tên). Hệ quả: chỉ dùng được index khi điều kiện bắt đầu từ **tiền tố bên trái (leftmost prefix)**.

💡 **Trực giác.** Danh bạ sắp theo (Họ, Tên): tìm "họ = Nguyễn" → dễ, nhảy thẳng. Tìm "họ = Nguyễn, tên = An" → dễ. Nhưng "tên = An" (bỏ qua họ) → vô dụng, vì các An nằm rải rác khắp danh bạ.

Với index `(a, b, c)`:

| Điều kiện WHERE | Dùng index? | Dùng tới đâu |
| --- | --- | --- |
| `a = ?` | ✓ | tới `a` |
| `a = ? AND b = ?` | ✓ | tới `b` |
| `a = ? AND b = ? AND c = ?` | ✓ | cả 3 cột |
| `a = ? AND c = ?` | ✓ một phần | chỉ tới `a` (c không liền sau a vì thiếu b) |
| `b = ?` | ✗ | không (thiếu tiền tố `a`) |
| `c = ?` | ✗ | không (thiếu `a`, `b`) |
| `b = ? AND c = ?` | ✗ | không (thiếu `a`) |

⚠ **Lỗi thường gặp.** Tạo index `(a, b, c)` rồi tưởng nó tăng tốc *mọi* truy vấn đụng tới b hoặc c. Không — chỉ truy vấn bắt đầu từ `a` mới dùng được. Muốn lọc nhanh theo riêng `b`, cần index riêng `(b)` hoặc đổi thứ tự cột.

❓ **Câu hỏi tự nhiên.**
- *"Vì sao `a = ? AND c = ?` chỉ dùng tới a?"* — Vì trong index, sau khi cố định `a`, các dòng còn được sắp theo `b`. Không biết `b` thì `c` nằm rải rác → index chỉ thu hẹp được tới `a`, phần `c` phải lọc thủ công.

🔁 **Dừng lại tự kiểm tra.** Index `(country, city, age)`. Query nào dùng được index, tới đâu?
(1) `WHERE country='VN'` (2) `WHERE city='Hanoi'` (3) `WHERE country='VN' AND age>20`

<details><summary>Đáp án</summary>

1. Dùng được, tới `country`.
2. Không dùng được (thiếu tiền tố `country`).
3. Dùng được tới `country` (age không liền sau country vì thiếu `city`); `age>20` lọc sau.
</details>

📝 **Tóm tắt mục 4.** Clustered = dữ liệu xếp vật lý theo khóa (1 cái/bảng); secondary = cấu trúc phụ trỏ tới dòng (nhiều cái). Covering index trả kết quả không cần về bảng. Composite index chỉ dùng được theo leftmost prefix.

---

## 5. Đánh đổi: index không miễn phí

⚠ **Index tăng tốc đọc nhưng làm CHẬM ghi.** Mỗi `INSERT`/`UPDATE`/`DELETE` phải cập nhật **mọi index** liên quan (chèn/xóa node, tách/gộp node B-tree). Bảng có 5 index → một INSERT làm 1 ghi bảng + 5 ghi index.

**Walk-through chi phí ghi.** Bảng `orders`, mỗi giây 1.000 INSERT:
- 0 index: 1.000 thao tác ghi/giây.
- 4 index: 1.000 ghi bảng + 4.000 cập nhật index = **5.000 thao tác/giây** → ghi chậm hơn ~5 lần, tốn thêm dung lượng đĩa cho 4 cây index.

### 5.1 Khi nào KHÔNG nên index

| Tình huống | Vì sao không index |
| --- | --- |
| **Cột ít phân biệt (low cardinality)**, vd `gender` chỉ 2 giá trị | Index trỏ tới ~50% bảng → optimizer chọn full scan dù sao; index vô dụng mà tốn ghi |
| **Bảng nhỏ** (vài chục–trăm dòng) | Quét cả bảng đã nhanh; index thêm overhead vô ích |
| **Bảng ghi-nặng, đọc-ít** (log, sự kiện) | Mỗi ghi phải cập nhật index → chậm; lợi ích đọc không đáng |
| **Cột gần như không bao giờ xuất hiện trong WHERE/JOIN/ORDER BY** | Index không bao giờ được dùng, chỉ tốn chỗ + làm chậm ghi |

❓ *"Vậy cứ index hết các cột cho chắc?"* — Không. Index thừa làm chậm mọi lần ghi và tốn dung lượng mà chẳng truy vấn nào dùng. Nguyên tắc: **index theo truy vấn thật sự chạy** (cột trong `WHERE`, `JOIN`, `ORDER BY`), đo đạc rồi mới thêm.

📝 **Tóm tắt mục 5.** Index = đánh đổi: đọc nhanh hơn ↔ ghi chậm hơn + tốn đĩa. Không index cột ít phân biệt, bảng nhỏ, hoặc bảng ghi-nặng. Index theo truy vấn thật, không index "cho chắc".

---

## 6. Ai quyết định dùng index?

Bạn **không** ra lệnh "dùng index". Bạn tạo index, còn việc *có dùng nó cho một truy vấn cụ thể hay không* do **bộ tối ưu truy vấn (query optimizer)** quyết định, dựa trên thống kê (số dòng, độ chọn lọc). Nếu optimizer ước lượng truy vấn lấy phần lớn bảng, nó có thể **bỏ qua index** và quét tuần tự cho nhanh hơn. Chi tiết: [Lesson 05 — Query Execution](../lesson-05-query-execution/).

> Mẹo thực hành: dùng `EXPLAIN` (PostgreSQL/MySQL) để xem optimizer chọn `Index Scan` hay `Seq Scan` cho truy vấn của bạn.

---

## 7. Bài tập

1. **Chọn cột nên index.** Bảng `orders(id PK, user_id, status, created_at, note)`. Các truy vấn hay chạy: (A) tra đơn theo `id`; (B) `WHERE user_id = ?`; (C) `WHERE status = 'paid' ORDER BY created_at`; `status` chỉ có 3 giá trị. Đề xuất index nào nên tạo, cột nào *không* nên index riêng và vì sao.

2. **Leftmost prefix.** Có index `(user_id, status, created_at)`. Với mỗi query, cho biết index có dùng được không và dùng tới cột nào:
   (a) `WHERE user_id = 7`
   (b) `WHERE status = 'paid'`
   (c) `WHERE user_id = 7 AND created_at > '2026-01-01'`
   (d) `WHERE user_id = 7 AND status = 'paid' AND created_at > '2026-01-01'`

3. **B-tree hay hash?** Với mỗi truy vấn, chọn loại index phù hợp và giải thích: (a) `WHERE session_token = ?`; (b) `WHERE price BETWEEN 100 AND 200`; (c) `ORDER BY created_at DESC LIMIT 10`; (d) `WHERE country = ?` (chỉ so sánh bằng, không sort).

4. **Ước lượng số bước.** Bảng `events` có 64.000.000 dòng. (a) Full table scan mất bao nhiêu bước? (b) Với B-tree, ước lượng theo log₂. (c) Nếu B+tree fanout 256, cây cần khoảng mấy tầng (tức mấy lần đọc page)?

5. **Covering index.** Có index `(city, name)` trên `users(id, city, name, email)`. Truy vấn nào là index-only scan (không cần về bảng), truy vấn nào phải về bảng?
   (a) `SELECT name FROM users WHERE city = 'Hanoi'`
   (b) `SELECT email FROM users WHERE city = 'Hanoi'`
   (c) `SELECT city, name FROM users WHERE city = 'HCM'`

---

## 8. Lời giải chi tiết

### Bài 1 — Chọn cột nên index

- **(A) tra theo `id`**: `id` là khóa chính → đã có **clustered index** sẵn, không cần thêm.
- **(B) `WHERE user_id = ?`**: nên tạo index `(user_id)` — cột này lọc chọn lọc, hay xuất hiện trong WHERE/JOIN.
- **(C) `WHERE status='paid' ORDER BY created_at`**: tạo **composite index `(status, created_at)`**. `status` lọc trước, rồi index đã sắp sẵn `created_at` nên bỏ luôn bước sort.
- **`status` không nên index *riêng* `(status)`**: chỉ 3 giá trị (low cardinality) → trỏ tới ~1/3 bảng, optimizer dễ bỏ qua. Nhưng đặt nó làm cột đầu của composite `(status, created_at)` thì vẫn hữu ích vì kết hợp được với sort.
- **`note`**: không xuất hiện trong WHERE/JOIN/ORDER BY → **không index** (chỉ tốn ghi + đĩa).

### Bài 2 — Leftmost prefix với index `(user_id, status, created_at)`

- **(a)** `user_id = 7` → ✓ dùng tới **`user_id`**.
- **(b)** `status = 'paid'` → ✗ **không dùng được** (thiếu tiền tố `user_id`).
- **(c)** `user_id = 7 AND created_at > ...` → ✓ dùng tới **`user_id`**; `created_at` không liền sau `user_id` vì thiếu `status` ở giữa → phần `created_at` lọc thủ công.
- **(d)** cả ba điều kiện → ✓ dùng **cả 3 cột** (tiền tố đầy đủ, cột cuối là range nên dừng ở đó là hợp lý).

### Bài 3 — B-tree hay hash?

- **(a)** `session_token = ?` → **hash** (hoặc B-tree) — thuần so sánh bằng, hash nhanh nhất.
- **(b)** `price BETWEEN 100 AND 200` → **B-tree** — range, hash không hỗ trợ.
- **(c)** `ORDER BY created_at DESC LIMIT 10` → **B-tree** — cần thứ tự; B-tree lấy sẵn 10 lá cuối, hash không có thứ tự.
- **(d)** `country = ?` thuần bằng → **hash** hoặc B-tree đều được; nếu sau này cần range/sort thì B-tree an toàn hơn.

### Bài 4 — Ước lượng số bước (64.000.000 dòng)

- **(a)** Full scan: tới **64.000.000** bước.
- **(b)** log₂(64.000.000): vì 2²⁶ = 67.108.864 > 64.000.000, nên ≈ **26** bước. Nhanh hơn ≈ 64.000.000 / 26 ≈ **2,46 triệu lần**.
- **(c)** Fanout 256: 256² = 65.536; 256³ = 16.777.216; 256⁴ = 4,29 tỷ > 64 triệu → **3–4 tầng** là đủ (3 tầng phủ 16,7 triệu < 64 triệu nên cần **4 tầng**). Tức chỉ **~4 lần đọc page** cho 64 triệu dòng — minh họa rõ vì sao fanout cao thắng log₂.

### Bài 5 — Covering index `(city, name)`

- **(a)** `SELECT name WHERE city='Hanoi'` → **index-only scan**: cả `city` (lọc) và `name` (trả về) đều có trong index → không cần về bảng.
- **(b)** `SELECT email WHERE city='Hanoi'` → **phải về bảng**: `email` không nằm trong index `(city, name)`, phải nhảy về dòng thật để lấy.
- **(c)** `SELECT city, name WHERE city='HCM'` → **index-only scan**: cả hai cột trả về đều nằm trong index.

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm 3 mô-đun: (1) animate full scan vs B-tree lookup, đếm số node chạm; (2) mô phỏng đường đi tra khóa qua B-tree; (3) bộ kiểm tra leftmost prefix cho composite index `(a, b, c)`.

---

## Bài tiếp theo

→ [Lesson 03 — Transaction & ACID](../lesson-03-transaction-acid/): vì sao nhiều thao tác phải "tất cả hoặc không gì", và 4 tính chất A-C-I-D bảo đảm dữ liệu đúng khi có lỗi và đồng thời.
