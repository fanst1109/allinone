# Lesson 03 — SQL cơ bản

> Nhóm 1 — Nền tảng · Bài thứ ba của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **SQL (Structured Query Language)** là gì và vì sao nó là một **ngôn ngữ khai báo (declarative language)**.
- Phân biệt sơ lược **DDL** (định nghĩa cấu trúc) và **DML** (thao tác dữ liệu), với trọng tâm là truy vấn DML.
- Viết được câu `SELECT ... FROM`: chọn cột, dùng **bí danh (alias)**.
- Lọc dữ liệu bằng `WHERE` với đủ các toán tử: `=`, `<>`, `<`, `>`, `AND`/`OR`/`NOT`, `BETWEEN`, `IN`, `LIKE` (`%` `_`), `IS NULL`.
- Sắp xếp (`ORDER BY`), giới hạn (`LIMIT`/`OFFSET`), loại trùng (`DISTINCT`).
- Bước đầu dùng **hàm tổng hợp (aggregate function)** `COUNT`/`SUM`/`AVG`/`MIN`/`MAX`.
- Thêm/sửa/xóa dữ liệu bằng `INSERT`/`UPDATE`/`DELETE` — và tránh cái bẫy quên `WHERE`.
- Nắm **thứ tự thực thi logic** của một câu SELECT để hiểu vì sao alias không dùng được trong `WHERE`.

## Kiến thức tiền đề

- [Lesson 02 — Mô hình quan hệ](../lesson-02-mo-hinh-quan-he/): table, row, column, schema, domain, NULL. SQL là ngôn ngữ đứng trên đúng bộ khung đó — `SELECT` chọn **cột**, `WHERE` lọc **hàng**, `NULL` là "không có giá trị".
- [Lesson 01 — Giới thiệu CSDL](../lesson-01-gioi-thieu-csdl/): nhớ rằng SQL là *ngôn ngữ truy vấn*, không phải DBMS.

---

## 1. SQL là gì? Ngôn ngữ khai báo

### 1.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** SQL (Structured Query Language — ngôn ngữ truy vấn có cấu trúc) là ngôn ngữ chuẩn để làm việc với cơ sở dữ liệu quan hệ: định nghĩa bảng, thêm/sửa/xóa dữ liệu, và truy vấn lấy dữ liệu ra.

**(b) Vì sao cần — và vì sao "khai báo".** SQL là **declarative**: bạn mô tả *kết quả mong muốn*, không mô tả *từng bước máy phải làm*. Trái ngược với ngôn ngữ **mệnh lệnh (imperative)** như Go/Python, nơi bạn viết vòng lặp, điều kiện, chỉ số mảng. Với SQL, DBMS có một bộ tối ưu (query optimizer) tự quyết định dùng index hay quét bảng, JOIN theo thứ tự nào — bạn không phải lo.

**(c) Ví dụ trực giác.** Cùng một yêu cầu "lấy tên các sản phẩm giá trên 100":

```sql
-- SQL (declarative): chỉ nói "muốn gì"
SELECT name FROM products WHERE price > 100;
```

```go
// Go (imperative): phải nói "làm thế nào"
var result []string
for _, p := range products {     // tự mở vòng lặp
    if p.Price > 100 {           // tự kiểm tra điều kiện
        result = append(result, p.Name)
    }
}
```

💡 **Trực giác.** SQL giống việc bạn nói với người phục vụ: *"cho tôi món gà, không cay, mang ra trong 10 phút"*. Bạn không xuống bếp chỉ đạo cách bật lửa, thái thịt, nêm nếm. Người phục vụ (DBMS) tự lo cách làm hiệu quả nhất.

### 1.2 DDL vs DML — hai nhóm câu lệnh

SQL có nhiều nhóm câu lệnh; ở bài này quan tâm hai nhóm phổ biến nhất:

| Nhóm | Tên đầy đủ | Làm gì | Lệnh tiêu biểu |
| --- | --- | --- | --- |
| **DDL** | Data Definition Language | Định nghĩa *cấu trúc* (schema): tạo/sửa/xóa bảng | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** | Data Manipulation Language | Thao tác *dữ liệu* bên trong bảng | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |

Một ví dụ DDL — tạo bảng `products` mà cả bài sẽ dùng:

```sql
CREATE TABLE products (
    id        INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    category  TEXT,
    price     INTEGER,
    stock     INTEGER
);
```

> DDL (`CREATE`/`ALTER`) chỉ đề cập nhẹ ở đây. Khóa chính (primary key), `NOT NULL` và các ràng buộc khác là chủ đề của [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/). Phần còn lại của bài tập trung vào **DML truy vấn**.

### Bảng mẫu dùng xuyên suốt bài

Mọi ví dụ dưới đây chạy trên bảng `products` với dữ liệu sau (8 dòng):

| id | name | category | price | stock |
| --: | --- | --- | --: | --: |
| 1 | Bút bi | stationery | 5 | 200 |
| 2 | Vở 200 trang | stationery | 25 | 150 |
| 3 | Bàn phím cơ | electronics | 850 | 30 |
| 4 | Chuột không dây | electronics | 320 | 0 |
| 5 | Cặp sách | bag | 450 | 12 |
| 6 | Balo laptop | bag | 600 | 8 |
| 7 | Tai nghe | electronics | 1200 | 5 |
| 8 | Hộp bút | stationery | 40 | *NULL* |

(Dòng 8 có `stock` là `NULL` — "chưa biết tồn kho". Sẽ dùng để minh họa `IS NULL`.)

📝 **Tóm tắt mục 1.** SQL là ngôn ngữ khai báo: mô tả *muốn gì*, DBMS lo *làm thế nào*. DDL định nghĩa cấu trúc bảng, DML thao tác dữ liệu (`SELECT`/`INSERT`/`UPDATE`/`DELETE`). Bài này tập trung DML, chạy trên bảng mẫu `products`.

---

## 2. SELECT ... FROM — lấy dữ liệu ra

### 2.1 Cú pháp cơ bản

`SELECT <danh sách cột> FROM <bảng>;` — đọc là "chọn các cột này từ bảng kia".

**Ví dụ 1 — lấy tất cả cột bằng `*`:**

```sql
SELECT * FROM products;
```

Kết quả: trả về cả 8 dòng với đủ 5 cột (giống hệt bảng mẫu ở trên).

**Ví dụ 2 — chọn một cột:**

```sql
SELECT name FROM products;
```

| name |
| --- |
| Bút bi |
| Vở 200 trang |
| Bàn phím cơ |
| ... (8 dòng) |

**Ví dụ 3 — chọn nhiều cột (theo đúng thứ tự viết):**

```sql
SELECT name, price FROM products;
```

| name | price |
| --- | --: |
| Bút bi | 5 |
| Vở 200 trang | 25 |
| Bàn phím cơ | 850 |
| ... | ... |

**Ví dụ 4 — cột tính toán ngay trong SELECT:**

```sql
SELECT name, price * stock FROM products;
```

Mỗi dòng tính `price * stock` (giá trị tồn kho). Ví dụ "Bút bi" → `5 * 200 = 1000`. (Dòng 8 có `stock` NULL → kết quả NULL, vì phép tính với NULL ra NULL.)

### 2.2 Bí danh (alias) bằng `AS`

Cột tính toán hoặc tên dài có thể đặt **bí danh (alias)** cho dễ đọc bằng `AS`:

```sql
SELECT name AS ten_san_pham,
       price * stock AS gia_tri_ton_kho
FROM products;
```

| ten_san_pham | gia_tri_ton_kho |
| --- | --: |
| Bút bi | 1000 |
| Vở 200 trang | 3750 |
| Bàn phím cơ | 25500 |
| ... | ... |

Từ khóa `AS` có thể bỏ: `SELECT name ten_san_pham FROM products;` cũng đặt alias `ten_san_pham`. Nếu alias có dấu cách thì bọc trong dấu nháy kép: `AS "Tên sản phẩm"`.

⚠ **Lỗi thường gặp.** Đừng nhầm `SELECT name, category` (hai cột) với `SELECT name category` (alias!). Thiếu dấu phẩy giữa hai tên cột → SQL hiểu `category` là **alias** của `name`, chỉ trả về một cột. Luôn kiểm tra dấu phẩy giữa các cột.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"`SELECT *` có hại gì không?"* — Trong code production thường tránh `*` vì: (1) lấy thừa cột làm tốn băng thông, (2) nếu bảng đổi cấu trúc, kết quả đổi theo gây lỗi ngầm. Liệt kê cột rõ ràng an toàn hơn.
- *"Thứ tự cột trong kết quả theo cái gì?"* — Theo đúng thứ tự bạn viết trong `SELECT`, không theo thứ tự cột trong bảng.

🔁 **Dừng lại tự kiểm tra.**
1. Viết câu lấy `category` và `stock` của mọi sản phẩm.
2. `SELECT price stock FROM products;` trả về mấy cột?

<details><summary>Đáp án</summary>

1. `SELECT category, stock FROM products;`
2. Một cột — vì thiếu dấu phẩy, `stock` bị hiểu là alias của `price`. Kết quả là một cột chứa giá, nhưng tiêu đề cột là "stock".
</details>

📝 **Tóm tắt mục 2.** `SELECT cột FROM bảng` chọn cột; `*` lấy tất cả; có thể tính toán ngay trong SELECT; `AS` đặt alias. Cẩn thận dấu phẩy giữa các cột để khỏi tạo alias ngoài ý muốn.

---

## 3. WHERE — lọc hàng theo điều kiện

`WHERE` đặt sau `FROM`, giữ lại những **hàng** thỏa điều kiện. Ta đi qua từng toán tử với bảng mẫu.

### 3.1 So sánh: `=`, `<>`, `<`, `>`

**Ví dụ 1 — bằng (`=`):**

```sql
SELECT name, category FROM products WHERE category = 'electronics';
```

| name | category |
| --- | --- |
| Bàn phím cơ | electronics |
| Chuột không dây | electronics |
| Tai nghe | electronics |

**Ví dụ 2 — khác (`<>`, cũng viết `!=`):**

```sql
SELECT name FROM products WHERE category <> 'stationery';
```

→ Bàn phím cơ, Chuột không dây, Cặp sách, Balo laptop, Tai nghe (5 dòng — mọi thứ trừ stationery).

**Ví dụ 3 — lớn hơn (`>`):**

```sql
SELECT name, price FROM products WHERE price > 500;
```

| name | price |
| --- | --: |
| Bàn phím cơ | 850 |
| Balo laptop | 600 |
| Tai nghe | 1200 |

**Ví dụ 4 — nhỏ hơn hoặc bằng (`<=`):**

```sql
SELECT name, price FROM products WHERE price <= 40;
```

→ Bút bi (5), Vở 200 trang (25), Hộp bút (40). (Có cả `>=` tương tự.)

⚠ **Lỗi thường gặp.** Chuỗi phải bọc trong **dấu nháy đơn**: `WHERE category = 'bag'`. Dùng nháy kép `"bag"` trong nhiều DBMS bị hiểu là *tên cột*, gây lỗi. Số thì không cần nháy: `WHERE price > 500`.

### 3.2 Kết hợp điều kiện: `AND`, `OR`, `NOT`

**Ví dụ 1 — `AND` (cả hai phải đúng):**

```sql
SELECT name FROM products
WHERE category = 'electronics' AND price < 1000;
```

→ Bàn phím cơ (850), Chuột không dây (320). (Tai nghe 1200 bị loại vì không < 1000.)

**Ví dụ 2 — `OR` (chỉ cần một đúng):**

```sql
SELECT name FROM products
WHERE category = 'bag' OR price < 30;
```

→ Bút bi (price 5), Vở 200 trang (price 25), Cặp sách (bag), Balo laptop (bag).

**Ví dụ 3 — `NOT` (phủ định):**

```sql
SELECT name FROM products WHERE NOT category = 'stationery';
```

→ giống `category <> 'stationery'` ở trên (5 dòng không phải stationery).

**Ví dụ 4 — kết hợp, dùng ngoặc cho rõ:**

```sql
SELECT name FROM products
WHERE (category = 'electronics' OR category = 'bag') AND price > 400;
```

→ Bàn phím cơ (850), Cặp sách (450), Balo laptop (600), Tai nghe (1200).

⚠ **Lỗi thường gặp — ưu tiên toán tử.** `AND` được tính trước `OR` (giống `*` trước `+`). Nên `A OR B AND C` nghĩa là `A OR (B AND C)`, không phải `(A OR B) AND C`. Khi nghi ngờ, **luôn dùng ngoặc** để diễn đạt đúng ý.

### 3.3 `BETWEEN` — trong khoảng (bao gồm hai đầu)

`BETWEEN x AND y` tương đương `>= x AND <= y` — **bao gồm cả hai mút**.

```sql
SELECT name, price FROM products WHERE price BETWEEN 40 AND 600;
```

| name | price |
| --- | --: |
| Hộp bút | 40 |
| Chuột không dây | 320 |
| Cặp sách | 450 |
| Balo laptop | 600 |

Các ví dụ khác: `price BETWEEN 1 AND 25` → Bút bi, Vở 200 trang; `stock BETWEEN 0 AND 10` → Chuột (0), Balo (8), Tai nghe (5); `price NOT BETWEEN 40 AND 600` → Bút bi (5), Bàn phím (850), Tai nghe (1200).

⚠ **Lỗi thường gặp.** `BETWEEN` **bao gồm** cả hai biên. `BETWEEN 40 AND 600` lấy luôn cả 40 và 600. Nếu muốn loại biên, dùng `> 40 AND < 600`.

### 3.4 `IN` — thuộc một tập giá trị

`IN (a, b, c)` đúng khi giá trị bằng một trong các phần tử — gọn hơn nhiều `OR`.

```sql
SELECT name, category FROM products
WHERE category IN ('bag', 'electronics');
```

→ Bàn phím cơ, Chuột không dây, Cặp sách, Balo laptop, Tai nghe (5 dòng).

Tương đương: `WHERE category = 'bag' OR category = 'electronics'`. Các ví dụ khác: `id IN (1, 3, 5)` → Bút bi, Bàn phím cơ, Cặp sách; `price IN (5, 40, 1200)` → Bút bi, Hộp bút, Tai nghe; `category NOT IN ('stationery')` → 5 dòng không phải stationery.

### 3.5 `LIKE` — khớp mẫu chuỗi (`%` và `_`)

- `%` khớp **0 hoặc nhiều** ký tự bất kỳ.
- `_` khớp **đúng 1** ký tự bất kỳ.

**Ví dụ 1 — bắt đầu bằng "B":**

```sql
SELECT name FROM products WHERE name LIKE 'B%';
```

→ Bút bi, Bàn phím cơ, Balo laptop.

**Ví dụ 2 — chứa "sách" ở bất kỳ đâu:**

```sql
SELECT name FROM products WHERE name LIKE '%sách%';
```

→ Cặp sách.

**Ví dụ 3 — kết thúc bằng "bút":**

```sql
SELECT name FROM products WHERE name LIKE '%bút';
```

→ Hộp bút. (Lưu ý "Bút bi" *bắt đầu* bằng "Bút" nhưng không *kết thúc* bằng "bút".)

**Ví dụ 4 — `_` khớp đúng một ký tự:**

```sql
SELECT name FROM products WHERE name LIKE 'B_t%';
```

→ Bút bi (B, ký tự bất kỳ là "ú", rồi "t"...). Mẫu `'B_t%'` = "B" + 1 ký tự + "t" + phần còn lại.

⚠ **Lỗi thường gặp.** `LIKE` thường **phân biệt hoa-thường tùy DBMS** (PostgreSQL có; MySQL mặc định không). Đừng nhầm `%` của SQL với `*` của shell/regex — trong `LIKE` ký tự "nhiều" là `%`, không phải `*`.

### 3.6 `IS NULL` — kiểm tra giá trị rỗng

NULL nghĩa là "không có/chưa biết giá trị". **Không** so sánh được bằng `=`.

```sql
SELECT name FROM products WHERE stock IS NULL;
```

→ Hộp bút (dòng 8, stock = NULL).

```sql
SELECT name FROM products WHERE stock IS NOT NULL;
```

→ 7 dòng còn lại (mọi sản phẩm có biết stock).

Các ví dụ minh họa thêm: `WHERE stock = 0` → Chuột không dây (hết hàng, **khác** NULL); `WHERE stock IS NULL OR stock = 0` → Chuột không dây + Hộp bút.

⚠ **Lỗi thường gặp — bẫy lớn nhất với NULL.** Viết `WHERE stock = NULL` **luôn trả về rỗng**, không báo lỗi! Vì so sánh bất cứ thứ gì với NULL cho kết quả "unknown" (không phải true). Phải dùng `IS NULL` / `IS NOT NULL`. Đây là lỗi kinh điển khiến truy vấn "im lặng" trả 0 dòng.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"`stock = 0` và `stock IS NULL` khác nhau ra sao?"* — `0` là "biết chắc tồn kho bằng không" (đã bán hết). `NULL` là "chưa biết tồn kho là bao nhiêu". Khác nhau hoàn toàn về ý nghĩa.
- *"Một dòng NULL có lọt vào `WHERE price > 500` không?"* — Không. So sánh NULL ra "unknown", mà WHERE chỉ giữ hàng cho kết quả *true*.

🔁 **Dừng lại tự kiểm tra.**
1. Viết câu lấy sản phẩm `electronics` có giá từ 300 đến 900 (bao gồm hai mút).
2. Vì sao `WHERE stock = NULL` không lấy được dòng có stock NULL?

<details><summary>Đáp án</summary>

1. `SELECT name FROM products WHERE category = 'electronics' AND price BETWEEN 300 AND 900;` → Bàn phím cơ (850), Chuột không dây (320).
2. Vì so sánh `= NULL` cho kết quả "unknown" chứ không phải true, nên WHERE loại hết. Phải dùng `IS NULL`.
</details>

📝 **Tóm tắt mục 3.** `WHERE` lọc hàng. So sánh `= <> < > <= >=`; ghép bằng `AND`/`OR`/`NOT` (AND ưu tiên hơn OR, dùng ngoặc cho chắc); `BETWEEN` bao gồm hai biên; `IN` thay nhiều `OR`; `LIKE` khớp mẫu với `%` (nhiều ký tự) và `_` (một ký tự); NULL phải dùng `IS NULL`/`IS NOT NULL`, không bao giờ `= NULL`.

---

## 4. ORDER BY, LIMIT / OFFSET, DISTINCT

### 4.1 `ORDER BY` — sắp xếp kết quả

Mặc định tăng dần (`ASC`); thêm `DESC` để giảm dần.

**Ví dụ 1 — giá tăng dần:**

```sql
SELECT name, price FROM products ORDER BY price ASC;
```

→ Bút bi (5), Vở (25), Hộp bút (40), Chuột (320), Cặp sách (450), Balo (600), Bàn phím (850), Tai nghe (1200).

**Ví dụ 2 — giá giảm dần:**

```sql
SELECT name, price FROM products ORDER BY price DESC;
```

→ Tai nghe (1200), Bàn phím (850), Balo (600), ... ngược lại ví dụ 1.

**Ví dụ 3 — sắp theo nhiều cột:**

```sql
SELECT name, category, price FROM products
ORDER BY category ASC, price DESC;
```

Sắp theo `category` trước (A→Z), trong cùng category thì giá giảm dần. Ví dụ nhóm `bag`: Balo (600) rồi Cặp sách (450).

**Ví dụ 4 — sắp theo cột tính toán dùng alias:**

```sql
SELECT name, price * stock AS gia_tri FROM products
ORDER BY gia_tri DESC;
```

→ sắp theo giá trị tồn kho giảm dần (alias dùng được ở `ORDER BY` — lý do giải thích ở mục 6).

### 4.2 `LIMIT` / `OFFSET` — lấy một phần

`LIMIT n` lấy tối đa `n` dòng đầu; `OFFSET k` bỏ qua `k` dòng đầu. Hay dùng để **phân trang (pagination)**.

```sql
SELECT name, price FROM products ORDER BY price DESC LIMIT 3;
```

→ 3 sản phẩm đắt nhất: Tai nghe (1200), Bàn phím (850), Balo (600).

```sql
SELECT name, price FROM products ORDER BY price DESC LIMIT 3 OFFSET 3;
```

→ bỏ 3 đắt nhất, lấy 3 tiếp theo: Cặp sách (450), Chuột (320), Hộp bút (40). (Đây là "trang 2", mỗi trang 3 dòng.)

Ví dụ thêm: `LIMIT 1` → 1 dòng đầu; `ORDER BY price ASC LIMIT 1` → sản phẩm rẻ nhất (Bút bi); `LIMIT 2 OFFSET 0` ≡ "trang 1, mỗi trang 2 dòng".

⚠ **Lỗi thường gặp.** `LIMIT` mà **không** có `ORDER BY` → DBMS trả "3 dòng nào đó", thứ tự không bảo đảm. Muốn "3 đắt nhất" thì bắt buộc `ORDER BY price DESC` trước, rồi mới `LIMIT 3`.

### 4.3 `DISTINCT` — loại bỏ dòng trùng

```sql
SELECT DISTINCT category FROM products;
```

| category |
| --- |
| stationery |
| electronics |
| bag |

3 dòng — dù bảng có nhiều sản phẩm cùng category. Ví dụ thêm: `SELECT DISTINCT category, price FROM products;` loại các *cặp* (category, price) trùng nhau; `SELECT COUNT(DISTINCT category) FROM products;` đếm số category khác nhau = 3.

❓ *"DISTINCT áp dụng cho cả dòng hay từng cột?"* — Cho **toàn bộ tổ hợp cột** trong SELECT. `SELECT DISTINCT category, price` chỉ bỏ những dòng mà *cả* category lẫn price đều trùng.

📝 **Tóm tắt mục 4.** `ORDER BY cột [ASC|DESC]` sắp xếp (nhiều cột được, alias dùng được); `LIMIT n OFFSET k` lấy `n` dòng sau khi bỏ `k` dòng (cần `ORDER BY` để ổn định); `DISTINCT` bỏ dòng trùng theo toàn bộ cột được chọn.

---

## 5. Hàm tổng hợp sơ khởi: COUNT, SUM, AVG, MIN, MAX

💡 **Trực giác.** Hàm tổng hợp (aggregate function) "gộp **nhiều dòng** thành **một con số**": đếm có bao nhiêu, cộng tổng, trung bình, nhỏ nhất, lớn nhất.

| Hàm | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| `COUNT(*)` | Đếm số dòng | `SELECT COUNT(*) FROM products;` → **8** |
| `SUM(col)` | Cộng tổng | `SELECT SUM(stock) FROM products;` → 405 (NULL bị bỏ qua) |
| `AVG(col)` | Trung bình | `SELECT AVG(price) FROM products;` → 436.25 |
| `MIN(col)` | Nhỏ nhất | `SELECT MIN(price) FROM products;` → **5** |
| `MAX(col)` | Lớn nhất | `SELECT MAX(price) FROM products;` → **1200** |

**Ví dụ kết hợp với WHERE** (tổng hợp chỉ trên hàng đã lọc):

```sql
SELECT COUNT(*), AVG(price) FROM products WHERE category = 'electronics';
```

→ `COUNT(*)` = 3 (3 món electronics), `AVG(price)` = (850+320+1200)/3 = **790**.

⚠ **Lỗi thường gặp — NULL trong tổng hợp.** `COUNT(*)` đếm *mọi* dòng kể cả NULL. Nhưng `COUNT(stock)` chỉ đếm dòng có `stock` **không NULL** → ra 7, không phải 8. `SUM`/`AVG` cũng **bỏ qua** NULL: `AVG(stock)` = 405/7 ≈ 57.86, chia cho 7 (số dòng không NULL), không phải 8.

❓ *"Đếm số sản phẩm theo từng category một lần thì sao?"* — Đó là việc của `GROUP BY`: gom các dòng cùng category rồi áp hàm tổng hợp cho mỗi nhóm. Ví dụ "mỗi category có bao nhiêu sản phẩm, giá trung bình bao nhiêu". `GROUP BY` (cùng `HAVING`) là trọng tâm bài sau — xem [Lesson 04 — SQL trung cấp](../lesson-04-sql-trung-cap/).

📝 **Tóm tắt mục 5.** Hàm tổng hợp gộp nhiều dòng thành một số: `COUNT`/`SUM`/`AVG`/`MIN`/`MAX`. `COUNT(*)` đếm cả NULL; `COUNT(col)`/`SUM`/`AVG` bỏ qua NULL. Gộp theo nhóm cần `GROUP BY` (Lesson 04).

---

## 6. INSERT, UPDATE, DELETE — thay đổi dữ liệu

### 6.1 `INSERT` — thêm dòng mới

```sql
INSERT INTO products (id, name, category, price, stock)
VALUES (9, 'Thước kẻ', 'stationery', 8, 100);
```

→ bảng có thêm dòng id=9. Có thể thêm **nhiều dòng** một lần:

```sql
INSERT INTO products (id, name, category, price, stock)
VALUES (10, 'Bút chì', 'stationery', 3, 300),
       (11, 'Đèn bàn', 'electronics', 180, 25);
```

Nếu cung cấp giá trị cho **mọi cột theo đúng thứ tự**, có thể bỏ danh sách cột (không khuyến khích vì dễ sai thứ tự):

```sql
INSERT INTO products VALUES (12, 'Gôm tẩy', 'stationery', 2, 500);
```

⚠ **Lỗi thường gặp.** Số giá trị trong `VALUES` phải khớp số cột liệt kê. Thiếu/thừa → lỗi. Cột bỏ trống sẽ nhận giá trị mặc định hoặc NULL (nếu cho phép).

### 6.2 `UPDATE` — sửa dòng đã có

```sql
UPDATE products SET price = 900 WHERE id = 3;
```

→ chỉ dòng id=3 (Bàn phím cơ) đổi giá thành 900. Sửa nhiều cột cùng lúc:

```sql
UPDATE products SET price = price - 50, stock = stock + 10
WHERE category = 'bag';
```

→ mọi sản phẩm `bag` giảm giá 50 và tăng tồn kho 10.

> ⚠ **CẢNH BÁO QUAN TRỌNG — quên `WHERE` sẽ sửa CẢ BẢNG.** Câu sau:
> ```sql
> UPDATE products SET price = 0;   -- KHÔNG có WHERE!
> ```
> sẽ đặt giá **mọi** sản phẩm về 0. Đây là tai nạn kinh điển. **Luôn kiểm tra `WHERE` trước khi chạy `UPDATE`.** Mẹo an toàn: chạy `SELECT * FROM products WHERE <điều kiện>` trước để xem chính xác những dòng nào sẽ bị ảnh hưởng.

### 6.3 `DELETE` — xóa dòng

```sql
DELETE FROM products WHERE stock = 0;
```

→ xóa dòng có tồn kho bằng 0 (Chuột không dây). Các ví dụ: `DELETE FROM products WHERE category = 'bag';` (xóa mọi túi/balo); `DELETE FROM products WHERE price > 1000;` (xóa Tai nghe).

> ⚠ **CẢNH BÁO QUAN TRỌNG — quên `WHERE` sẽ xóa CẢ BẢNG.**
> ```sql
> DELETE FROM products;   -- KHÔNG có WHERE → xóa SẠCH mọi dòng!
> ```
> Giống `UPDATE`, thiếu `WHERE` là thảm họa. Luôn `SELECT` thử điều kiện trước, và cân nhắc dùng transaction (`BEGIN; ... ROLLBACK;`) khi thao tác nguy hiểm.

📝 **Tóm tắt mục 6.** `INSERT INTO ... VALUES (...)` thêm dòng (được nhiều dòng); `UPDATE ... SET ... WHERE ...` sửa; `DELETE FROM ... WHERE ...` xóa. Quên `WHERE` ở `UPDATE`/`DELETE` → tác động **toàn bộ bảng**. Luôn `SELECT` kiểm tra điều kiện trước.

---

## 7. Thứ tự thực thi logic của câu SELECT

Bạn **viết** câu SQL theo thứ tự `SELECT → FROM → WHERE → ORDER BY → LIMIT`, nhưng DBMS **thực thi (logic)** theo thứ tự khác:

```
1. FROM       — lấy bảng nguồn (xác định các dòng & cột có sẵn)
2. WHERE      — lọc hàng theo điều kiện
3. SELECT     — chọn/tính các cột, đặt alias
4. ORDER BY   — sắp xếp các dòng còn lại
5. LIMIT      — cắt lấy n dòng
```

💡 **Trực giác.** Hình dung dây chuyền: trước hết *gom nguyên liệu* (FROM), *loại bỏ thứ không cần* (WHERE), rồi mới *chế biến/dán nhãn* (SELECT → tạo alias), *xếp thứ tự* (ORDER BY), cuối cùng *đóng gói lấy phần đầu* (LIMIT).

### Vì sao alias định ở SELECT KHÔNG dùng được trong WHERE?

Đây là hệ quả trực tiếp của thứ tự trên. Xét:

```sql
-- LỖI: alias 'gia_tri' chưa tồn tại lúc WHERE chạy
SELECT name, price * stock AS gia_tri
FROM products
WHERE gia_tri > 1000;     -- ✗ WHERE chạy TRƯỚC SELECT
```

`WHERE` (bước 2) chạy **trước** `SELECT` (bước 3) — lúc đó alias `gia_tri` *chưa được tạo ra*, nên DBMS không biết `gia_tri` là gì → báo lỗi "column does not exist".

**Cách sửa** — lặp lại biểu thức trong WHERE:

```sql
SELECT name, price * stock AS gia_tri
FROM products
WHERE price * stock > 1000;   -- ✓ dùng biểu thức gốc
```

**Ngược lại**, `ORDER BY` (bước 4) chạy **sau** `SELECT` (bước 3), nên ở đó alias **đã tồn tại** và dùng được:

```sql
SELECT name, price * stock AS gia_tri
FROM products
ORDER BY gia_tri DESC;        -- ✓ alias đã được tạo ở bước SELECT
```

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy `ORDER BY` dùng alias được, `WHERE` thì không — nhớ thế nào cho dễ?"* — Nhớ vị trí trong dây chuyền: SELECT tạo alias ở **bước 3**. Cái nào *trước* bước 3 (WHERE) không thấy alias; cái nào *sau* (ORDER BY) thấy được.
- *"`GROUP BY` xen vào đâu?"* — Giữa WHERE và SELECT (sau WHERE, trước SELECT). Sẽ học ở [Lesson 04](../lesson-04-sql-trung-cap/).

🔁 **Dừng lại tự kiểm tra.**
1. Câu nào lỗi, vì sao: `SELECT price*2 AS gp FROM products WHERE gp > 100;`?
2. Sửa lại câu trên cho chạy được.

<details><summary>Đáp án</summary>

1. Lỗi: `WHERE` (bước 2) chạy trước `SELECT` (bước 3) nên alias `gp` chưa tồn tại.
2. `SELECT price*2 AS gp FROM products WHERE price*2 > 100;` — lặp lại biểu thức gốc trong WHERE.
</details>

📝 **Tóm tắt mục 7.** Thứ tự thực thi logic: FROM → WHERE → SELECT → ORDER BY → LIMIT. Vì SELECT (tạo alias) chạy *sau* WHERE nhưng *trước* ORDER BY: alias **không** dùng được trong WHERE (lặp lại biểu thức gốc), **dùng được** trong ORDER BY.

---

## 8. Bài tập

Mọi bài chạy trên bảng `products` mẫu ở mục 1. Viết câu SQL hoàn chỉnh.

1. **Lọc + chọn cột.** Lấy `name` và `price` của các sản phẩm thuộc category `electronics`, sắp theo giá giảm dần.

2. **WHERE phức hợp.** Lấy `name`, `category`, `price` của các sản phẩm có giá trong khoảng 30 đến 600 (bao gồm hai mút) **và** không thuộc category `bag`.

3. **LIKE + LIMIT.** Lấy `name` của 2 sản phẩm đầu tiên (theo tên A→Z) có tên bắt đầu bằng chữ "B".

4. **NULL + tổng hợp.** Đếm có bao nhiêu sản phẩm *biết* tồn kho (stock không NULL), và tính tổng tồn kho đó.

5. **DISTINCT + tính toán.** Liệt kê các category khác nhau, sắp theo bảng chữ cái.

6. **UPDATE an toàn.** Viết câu tăng giá thêm 10% cho mọi sản phẩm `stationery`. Trước đó, viết câu `SELECT` để kiểm tra những dòng nào sẽ bị ảnh hưởng.

---

## 9. Lời giải chi tiết

### Bài 1 — Lọc + chọn cột

```sql
SELECT name, price FROM products
WHERE category = 'electronics'
ORDER BY price DESC;
```

Giải thích: `WHERE` giữ 3 món electronics, `SELECT` lấy 2 cột, `ORDER BY price DESC` sắp giảm dần. Kết quả: Tai nghe (1200), Bàn phím cơ (850), Chuột không dây (320).

### Bài 2 — WHERE phức hợp

```sql
SELECT name, category, price FROM products
WHERE price BETWEEN 30 AND 600
  AND category <> 'bag';
```

Giải thích: `BETWEEN 30 AND 600` lấy Hộp bút (40), Chuột (320), Cặp sách (450), Balo (600). Loại `bag` (Cặp sách, Balo) → còn Hộp bút, Chuột không dây. (Có thể viết `category != 'bag'` hoặc `NOT category = 'bag'`.)

### Bài 3 — LIKE + LIMIT

```sql
SELECT name FROM products
WHERE name LIKE 'B%'
ORDER BY name ASC
LIMIT 2;
```

Giải thích: `LIKE 'B%'` lấy Bút bi, Bàn phím cơ, Balo laptop; sắp A→Z rồi lấy 2 dòng đầu. Cần `ORDER BY` trước `LIMIT` để kết quả ổn định, nếu không "2 dòng đầu" là tùy ý.

### Bài 4 — NULL + tổng hợp

```sql
SELECT COUNT(stock) AS so_san_pham_biet_ton, SUM(stock) AS tong_ton
FROM products;
```

Giải thích: `COUNT(stock)` đếm dòng có stock **không NULL** → 7 (bỏ Hộp bút NULL). `SUM(stock)` cộng các stock không NULL = 200+150+30+0+12+8+5 = **405**. Lưu ý nếu dùng `COUNT(*)` sẽ ra 8 (sai ý đề) vì đếm cả dòng NULL.

### Bài 5 — DISTINCT

```sql
SELECT DISTINCT category FROM products
ORDER BY category ASC;
```

Giải thích: `DISTINCT` bỏ trùng → bag, electronics, stationery; `ORDER BY` sắp A→Z. Kết quả 3 dòng: bag, electronics, stationery.

### Bài 6 — UPDATE an toàn

Bước 1 — kiểm tra dòng bị ảnh hưởng trước:

```sql
SELECT id, name, price FROM products WHERE category = 'stationery';
```

→ Bút bi, Vở 200 trang, Hộp bút (và bất kỳ stationery nào khác). Xác nhận đúng các dòng cần sửa.

Bước 2 — thực hiện update:

```sql
UPDATE products SET price = price * 1.1 WHERE category = 'stationery';
```

Giải thích: `price * 1.1` tăng 10%. **Bắt buộc** có `WHERE category = 'stationery'` — quên `WHERE` sẽ tăng giá *toàn bộ* bảng. Việc `SELECT` thử trước ở bước 1 chính là thói quen an toàn cần rèn.

---

## 10. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — một "SQL playground" giả lập chạy hoàn toàn bằng JavaScript trên bảng `products` mẫu: bấm các truy vấn dựng sẵn (chọn cột, WHERE, ORDER BY, LIMIT) để xem bảng kết quả và số dòng; kèm panel minh họa thứ tự thực thi FROM → WHERE → SELECT → ORDER BY → LIMIT highlight từng bước.

---

## Bài tiếp theo

→ [Lesson 04 — SQL trung cấp](../lesson-04-sql-trung-cap/): `GROUP BY` + `HAVING` (gộp nhóm), `JOIN` (ghép nhiều bảng), subquery — bước tiếp theo sau khi đã vững truy vấn một bảng.
