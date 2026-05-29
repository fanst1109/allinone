// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/01-Foundations/lesson-04-sql-trung-cap/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — SQL trung cấp (JOIN, GROUP BY)

> Nhóm 1 — Nền tảng · Bài thứ tư của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Ghép dữ liệu từ nhiều bảng bằng **JOIN**: phân biệt \`INNER\`, \`LEFT\`/\`RIGHT\`/\`FULL OUTER\`, \`CROSS JOIN\` và **self join** (tự ghép một bảng với chính nó).
- Hiểu chính xác dòng nào trở thành \`NULL\` trong mỗi loại OUTER JOIN, và vì sao.
- Gom nhóm và tổng hợp bằng **GROUP BY** + các hàm tổng hợp (aggregate) \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`.
- Phân biệt rạch ròi **\`WHERE\` lọc trước khi gom** và **\`HAVING\` lọc sau khi gom**.
- Dùng **subquery (truy vấn con)** trong \`WHERE\`: dạng \`IN\`, dạng so sánh, **scalar subquery** (trả về một giá trị), và **correlated subquery (truy vấn con tương quan)**.
- Đọc được **thứ tự thực thi logic** của một câu SELECT đầy đủ để giải thích vì sao \`WHERE\` không dùng được alias còn \`HAVING\` thì có.

## Kiến thức tiền đề

- [Lesson 03 — SQL cơ bản](../lesson-03-sql-co-ban/): \`SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT\`, các phép lọc cơ bản. Bài này nối tiếp trực tiếp.
- Khái niệm khóa chính (primary key) và khóa ngoại (foreign key) ở mức nhận biết — sẽ học sâu ở [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/).

---

## 1. Dữ liệu mẫu — dùng xuyên suốt bài

Toàn bộ ví dụ trong bài đứng trên hai bảng sau. Hãy ghi nhớ chúng.

**Bảng \`customers\`** — khách hàng:

| id | name | city |
| :-: | --- | --- |
| 1 | An | Hanoi |
| 2 | Binh | Da Nang |
| 3 | Chi | Hanoi |
| 4 | Dung | HCM |

**Bảng \`orders\`** — đơn hàng (cột \`customer_id\` là khóa ngoại trỏ về \`customers.id\`):

| id | customer_id | amount |
| :-: | :-: | --: |
| 101 | 1 | 200 |
| 102 | 1 | 150 |
| 103 | 2 | 300 |
| 104 | 3 | 500 |
| 105 | 3 | 50 |

Quan sát quan trọng trước khi vào JOIN:

- Khách **#4 Dung** (HCM) **không có đơn hàng nào** — không \`customer_id\` nào bằng 4.
- Mọi đơn hàng đều có \`customer_id\` hợp lệ (1, 2, 3) — không có đơn "mồ côi".

💡 **Trực giác.** Hai bảng giống hai cuốn sổ: sổ *khách* (ai là ai) và sổ *đơn* (đơn nào của ai). JOIN là động tác **đặt hai cuốn cạnh nhau và nối các dòng có cùng mã khách** lại thành một dòng dài hơn, để bạn thấy "tên khách + số tiền đơn" trên cùng một hàng.

---

## 2. JOIN — ghép nhiều bảng

### 2.1 INNER JOIN — chỉ giữ dòng khớp được cả hai bên

\`INNER JOIN\` ghép mỗi dòng của bảng trái với mỗi dòng của bảng phải **thỏa điều kiện \`ON\`**. Dòng nào không tìm được "bạn nhảy" bên kia thì bị loại.

\`\`\`sql
SELECT c.name, o.id AS order_id, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
\`\`\`

**Walk-through từng dòng** (điều kiện \`c.id = o.customer_id\`):

| Xét khách | Tìm trong orders | Ghép ra |
| --- | --- | --- |
| #1 An | đơn 101 (cid=1), 102 (cid=1) | (An,101,200), (An,102,150) |
| #2 Binh | đơn 103 (cid=2) | (Binh,103,300) |
| #3 Chi | đơn 104 (cid=3), 105 (cid=3) | (Chi,104,500), (Chi,105,50) |
| #4 Dung | không có cid=4 | **bị loại** |

Kết quả thật (5 dòng):

| name | order_id | amount |
| --- | :-: | --: |
| An | 101 | 200 |
| An | 102 | 150 |
| Binh | 103 | 300 |
| Chi | 104 | 500 |
| Chi | 105 | 50 |

Dung biến mất vì không có đơn nào khớp — đó là bản chất "inner": chỉ phần **giao** giữ lại.

### 2.2 LEFT / RIGHT / FULL OUTER JOIN — giữ thêm dòng không khớp

OUTER JOIN giữ lại cả những dòng **không tìm được bạn nhảy**, và điền \`NULL\` vào phần cột của bảng bên kia.

- **\`LEFT JOIN\`**: giữ **mọi dòng bảng trái**, kể cả dòng không khớp (cột bên phải = \`NULL\`).
- **\`RIGHT JOIN\`**: giữ **mọi dòng bảng phải**.
- **\`FULL OUTER JOIN\`**: giữ **mọi dòng cả hai bên**.

\`\`\`sql
SELECT c.name, o.id AS order_id, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

Kết quả \`LEFT JOIN\` — giống INNER nhưng **thêm Dung với cột đơn = NULL** (6 dòng):

| name | order_id | amount |
| --- | :-: | --: |
| An | 101 | 200 |
| An | 102 | 150 |
| Binh | 103 | 300 |
| Chi | 104 | 500 |
| Chi | 105 | 50 |
| Dung | **NULL** | **NULL** |

Vì sao chỉ Dung thành NULL? Vì trong dữ liệu mẫu **chỉ Dung là khách không có đơn**. Mọi đơn đều có khách hợp lệ → bên \`orders\` không ai bị "bỏ rơi".

\`RIGHT JOIN\` ở đây cho ra **đúng 5 dòng giống INNER** — bởi không có đơn mồ côi nào để giữ thêm. Nếu ta thêm một đơn \`(106, customer_id=9, 400)\` với khách #9 không tồn tại, thì \`RIGHT JOIN\` sẽ giữ đơn 106 và cột \`name\` = \`NULL\`.

\`FULL OUTER JOIN\` = LEFT ∪ RIGHT. Với dữ liệu mẫu (không có đơn mồ côi) nó cho **6 dòng giống hệt LEFT**. Nếu có cả khách không đơn (Dung) **và** đơn không khách (106), FULL sẽ chứa cả dòng Dung-NULL lẫn dòng NULL-106.

> Lưu ý: MySQL **không có** \`FULL OUTER JOIN\` trực tiếp — phải mô phỏng bằng \`LEFT ... UNION ... RIGHT\`. PostgreSQL, SQL Server thì hỗ trợ sẵn.

### 2.3 CROSS JOIN — tích Descartes (Cartesian product)

\`CROSS JOIN\` ghép **mọi dòng trái với mọi dòng phải**, không có điều kiện. Số dòng kết quả = \`m × n\`.

\`\`\`sql
SELECT c.name, o.id
FROM customers c
CROSS JOIN orders o;
\`\`\`

Với \`customers\` có **m = 4** dòng (nhưng bỏ Dung ra cho gọn minh họa, lấy 3 khách An/Binh/Chi) và \`orders\` có **n = 4** đơn (lấy 4 đơn đầu), kết quả = **3 × 4 = 12** dòng:

| | đơn A | đơn B | đơn C | đơn D |
| --- | :-: | :-: | :-: | :-: |
| **An** | An-A | An-B | An-C | An-D |
| **Binh** | Binh-A | Binh-B | Binh-C | Binh-D |
| **Chi** | Chi-A | Chi-B | Chi-C | Chi-D |

3 hàng × 4 cột = 12 ô = 12 dòng kết quả. CROSS JOIN hữu ích khi cần tạo mọi tổ hợp (ví dụ: mọi cặp \`size × color\`), nhưng phần lớn thời gian nó xuất hiện **do lỗi**.

⚠ **Lỗi thường gặp: quên điều kiện \`ON\` → tích Descartes ngoài ý muốn.** Nếu viết:

\`\`\`sql
SELECT c.name, o.amount
FROM customers c, orders o;   -- dấu phẩy = CROSS JOIN ngầm, KHÔNG có ON
\`\`\`

bạn nhận **4 × 5 = 20 dòng** vô nghĩa (mỗi khách ghép với *mọi* đơn của *mọi* người), không phải 5 dòng đúng. Với bảng 1 triệu × 1 triệu dòng, tích Descartes là 10¹² dòng — đủ làm sập máy chủ. Luôn nhớ kèm \`ON c.id = o.customer_id\` (hoặc dùng cú pháp \`JOIN ... ON\` rõ ràng thay vì dấu phẩy).

### 2.4 Self join — ghép một bảng với chính nó

Đôi khi cần so các dòng *trong cùng một bảng*. Ví dụ: tìm các **cặp khách hàng ở cùng thành phố**. Ta đặt hai alias cho \`customers\` rồi join nó với chính nó:

\`\`\`sql
SELECT a.name AS kh_1, b.name AS kh_2, a.city
FROM customers a
JOIN customers b ON a.city = b.city AND a.id < b.id;
\`\`\`

Điều kiện \`a.id < b.id\` để mỗi cặp chỉ xuất hiện một lần và không tự ghép với chính mình. Trong dữ liệu mẫu, chỉ An (#1) và Chi (#3) cùng ở Hanoi:

| kh_1 | kh_2 | city |
| --- | --- | --- |
| An | Chi | Hanoi |

💡 **Trực giác self join.** Tưởng tượng bạn photocopy bảng \`customers\` ra hai bản, dán cạnh nhau (bản \`a\` và bản \`b\`), rồi nối các dòng theo điều kiện — đúng như join hai bảng khác nhau, chỉ là chúng tình cờ giống hệt.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"\`JOIN\` không ghi rõ loại thì là gì?"* — \`JOIN\` trần (không có \`INNER\`/\`LEFT\`...) mặc định là \`INNER JOIN\`.
- *"\`LEFT JOIN\` và \`RIGHT JOIN\` khác nhau thật không, hay chỉ đảo tên?"* — Chỉ là góc nhìn: \`A LEFT JOIN B\` cho cùng kết quả với \`B RIGHT JOIN A\`. Người ta hầu như chỉ dùng \`LEFT JOIN\` cho dễ đọc.
- *"\`ON\` khác \`WHERE\` chỗ nào?"* — \`ON\` định nghĩa *cách ghép*; \`WHERE\` *lọc* sau khi đã ghép. Với OUTER JOIN, đặt điều kiện ở \`ON\` hay \`WHERE\` cho kết quả **khác nhau** — \`WHERE o.amount > 100\` sẽ loại luôn dòng Dung-NULL (vì \`NULL > 100\` là không-đúng).

🔁 **Dừng lại tự kiểm tra.**
1. \`customers LEFT JOIN orders\` cho bao nhiêu dòng với dữ liệu mẫu? Dòng nào có NULL?
2. Quên \`ON\` khi join \`customers\` (4) với \`orders\` (5) cho bao nhiêu dòng?

<details><summary>Đáp án</summary>

1. **6 dòng**: 5 dòng khớp (An×2, Binh, Chi×2) + 1 dòng **Dung** với \`order_id\`/\`amount\` = \`NULL\` (vì Dung không có đơn).
2. **4 × 5 = 20 dòng** — tích Descartes ngoài ý muốn.
</details>

📝 **Tóm tắt mục 2.** \`INNER JOIN\` giữ phần giao (loại dòng không khớp). \`LEFT/RIGHT/FULL OUTER\` giữ thêm dòng không khớp và điền \`NULL\`. \`CROSS JOIN\` = tích Descartes \`m×n\` — quên \`ON\` là vô tình tạo ra nó. Self join ghép bảng với chính nó qua alias.

---

## 3. GROUP BY + hàm tổng hợp

### 3.1 Ý tưởng

💡 **Trực giác.** \`GROUP BY\` giống việc **chia một chồng hóa đơn thành các xấp theo khách**, rồi với mỗi xấp tính một con số: đếm bao nhiêu tờ (\`COUNT\`), cộng tổng tiền (\`SUM\`), tiền trung bình (\`AVG\`), tờ nhỏ nhất/lớn nhất (\`MIN\`/\`MAX\`). Kết quả: **mỗi nhóm thành đúng một dòng**.

Các hàm tổng hợp:

| Hàm | Ý nghĩa | Ví dụ trên nhóm {200,150} |
| --- | --- | --- |
| \`COUNT(*)\` | đếm số dòng trong nhóm | 2 |
| \`SUM(amount)\` | tổng | 350 |
| \`AVG(amount)\` | trung bình | 175 |
| \`MIN(amount)\` | nhỏ nhất | 150 |
| \`MAX(amount)\` | lớn nhất | 200 |

### 3.2 Walk-through: tổng tiền theo từng khách

\`\`\`sql
SELECT customer_id, COUNT(*) AS so_don, SUM(amount) AS tong
FROM orders
GROUP BY customer_id;
\`\`\`

**Bước 1 — gom \`orders\` theo \`customer_id\`:**

| Nhóm (customer_id) | Các dòng amount |
| :-: | --- |
| 1 | 200, 150 |
| 2 | 300 |
| 3 | 500, 50 |

**Bước 2 — tính aggregate cho mỗi nhóm:**

| customer_id | so_don = COUNT(*) | tong = SUM(amount) |
| :-: | :-: | --: |
| 1 | 2 | 200 + 150 = **350** |
| 2 | 1 | **300** |
| 3 | 2 | 500 + 50 = **550** |

3 nhóm → 3 dòng kết quả. Lưu ý khách #4 Dung **không xuất hiện** vì bảng \`orders\` không có dòng nào của Dung (muốn thấy Dung với tổng 0, phải \`LEFT JOIN\` rồi mới gom).

⚠ **Lỗi thường gặp.** Trong \`SELECT\` có \`GROUP BY\`, mọi cột **không nằm trong hàm tổng hợp** đều **phải có mặt trong \`GROUP BY\`**. Viết \`SELECT customer_id, amount, SUM(amount) ... GROUP BY customer_id\` là sai — \`amount\` của nhóm {200,150} là 200 hay 150? Không xác định. (PostgreSQL báo lỗi; MySQL chế độ lỏng lẻo trả bừa một giá trị — càng nguy hiểm.)

🔁 **Dừng lại tự kiểm tra.** \`AVG(amount)\` của khách #1 và #3 là bao nhiêu?

<details><summary>Đáp án</summary>

- Khách #1: (200+150)/2 = **175**.
- Khách #3: (500+50)/2 = **275**.
</details>

---

## 4. HAVING vs WHERE — lọc trước gom vs lọc sau gom

Đây là điểm hay nhầm nhất của bài.

- **\`WHERE\` lọc các *dòng* TRƯỚC khi gom nhóm.** Không được dùng hàm tổng hợp trong \`WHERE\`.
- **\`HAVING\` lọc các *nhóm* SAU khi gom nhóm.** Được dùng hàm tổng hợp.

💡 **Trực giác.** \`WHERE\` là người gác cổng ở **cửa vào** (loại bớt hóa đơn trước khi chia xấp). \`HAVING\` là người kiểm tra ở **cửa ra** (sau khi đã chia xấp và tính tổng, mới loại bỏ những xấp không đạt).

### 4.1 Ví dụ số: hai câu giống mặt nhưng khác nghĩa

**Câu A — \`WHERE\`: chỉ tính trên các đơn ≥ 100, rồi gom.**

\`\`\`sql
SELECT customer_id, SUM(amount) AS tong
FROM orders
WHERE amount >= 100        -- lọc DÒNG trước
GROUP BY customer_id;
\`\`\`

\`WHERE amount >= 100\` loại đơn 105 (amount=50) **trước khi gom**. Các dòng còn lại: 101(200), 102(150), 103(300), 104(500).

| customer_id | dòng còn sau WHERE | tong |
| :-: | --- | --: |
| 1 | 200, 150 | 350 |
| 2 | 300 | 300 |
| 3 | 500 (đơn 50 đã bị loại) | **500** |

**Câu B — \`HAVING\`: gom tất cả, rồi chỉ giữ nhóm có tổng > 350.**

\`\`\`sql
SELECT customer_id, SUM(amount) AS tong
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 350;  -- lọc NHÓM sau
\`\`\`

Gom đầy đủ trước (kết quả mục 3.2): nhóm1=350, nhóm2=300, nhóm3=550. Rồi \`HAVING SUM > 350\` chỉ giữ nhóm nào tổng > 350:

| customer_id | tong | qua HAVING? |
| :-: | --: | :-: |
| 1 | 350 | không (350 không > 350) |
| 2 | 300 | không |
| 3 | 550 | **giữ** |

Kết quả câu B: **chỉ 1 dòng** \`(3, 550)\`. Cùng dữ liệu mà hai câu cho kết quả hoàn toàn khác — vì một câu lọc *dòng* trước gom, câu kia lọc *nhóm* sau gom.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Có thể dùng cả hai trong một câu không?"* — Có, và rất thường: \`WHERE\` thu hẹp dữ liệu thô trước (nhanh hơn), \`HAVING\` lọc kết quả tổng hợp sau. Ví dụ: \`WHERE amount > 0 ... GROUP BY ... HAVING COUNT(*) >= 2\`.
- *"Vì sao \`WHERE COUNT(*) > 1\` báo lỗi?"* — Vì lúc \`WHERE\` chạy, **chưa gom nhóm**, nên \`COUNT(*)\` chưa tồn tại. Phải dùng \`HAVING\`.

📝 **Tóm tắt mục 4.** \`WHERE\` lọc dòng *trước* \`GROUP BY\`, không dùng được aggregate. \`HAVING\` lọc nhóm *sau* \`GROUP BY\`, dùng được aggregate. Đặt sai chỗ → kết quả khác hẳn.

---

## 5. Subquery — truy vấn con

**Subquery (truy vấn con)** là một câu \`SELECT\` lồng bên trong câu khác. Bốn dạng hay gặp:

### 5.1 Trong WHERE với \`IN\` — tập hợp giá trị

"Lấy khách hàng **có ít nhất một đơn** (id nằm trong tập \`customer_id\` của orders)":

\`\`\`sql
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

Subquery \`SELECT customer_id FROM orders\` trả về tập \`{1, 1, 2, 3, 3}\` = \`{1, 2, 3}\`. Câu ngoài giữ khách có \`id\` thuộc tập này → **An, Binh, Chi** (Dung bị loại vì id=4 không thuộc). Đây là một cách trả lời "ai có đơn" mà không cần JOIN.

### 5.2 So sánh với scalar subquery — trả về một giá trị

**Scalar subquery** là subquery trả về **đúng một dòng, một cột** (một con số). "Lấy đơn có số tiền **lớn hơn trung bình** mọi đơn":

\`\`\`sql
SELECT id, amount FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);
\`\`\`

\`SELECT AVG(amount) FROM orders\` = (200+150+300+500+50)/5 = 1200/5 = **240**. Câu ngoài giữ đơn có \`amount > 240\`:

| id | amount | > 240? |
| :-: | --: | :-: |
| 101 | 200 | không |
| 102 | 150 | không |
| 103 | 300 | **có** |
| 104 | 500 | **có** |
| 105 | 50 | không |

Kết quả: đơn **103 (300)** và **104 (500)**.

⚠ **Lỗi thường gặp.** Nếu scalar subquery lỡ trả về **nhiều dòng** (ví dụ quên \`AVG\`, viết \`SELECT amount FROM orders\`), phép so sánh \`amount > (...)\` sẽ lỗi runtime ("subquery returns more than one row"). Scalar subquery phải đảm bảo đúng 1 giá trị.

### 5.3 Correlated subquery — truy vấn con tương quan (sơ lược)

**Correlated subquery (tương quan)** là subquery **tham chiếu tới bảng của câu ngoài** — nó chạy **lại một lần cho mỗi dòng ngoài**. "Lấy khách có **tổng tiền đơn > 300**":

\`\`\`sql
SELECT c.name
FROM customers c
WHERE (SELECT SUM(o.amount) FROM orders o WHERE o.customer_id = c.id) > 300;
\`\`\`

Chú ý \`o.customer_id = c.id\` — \`c\` là bảng *ngoài*. Với mỗi khách \`c\`, subquery tính tổng đơn riêng:

| khách c | SUM đơn của c | > 300? |
| --- | --: | :-: |
| #1 An | 350 | **có** |
| #2 Binh | 300 | không (không > 300) |
| #3 Chi | 550 | **có** |
| #4 Dung | NULL (không đơn) | không |

Kết quả: **An, Chi**.

💡 **Trực giác tương quan.** Subquery thường (mục 5.1, 5.2) chạy **một lần**, lấy kết quả rồi dùng lại. Subquery tương quan giống một **vòng lặp**: "với mỗi khách, đi đếm đơn của riêng người đó". Mạnh nhưng có thể chậm nếu bảng lớn — cùng việc này thường viết được bằng \`GROUP BY ... HAVING\` nhanh hơn (để optimizer lo). Cách optimizer chọn chiến lược chạy join/subquery học ở [Lesson 05 — Query Execution](../../02-Intermediate/lesson-05-query-execution/).

📝 **Tóm tắt mục 5.** \`IN (subquery)\` lọc theo tập giá trị. Scalar subquery trả 1 giá trị để so sánh. Correlated subquery chạy lại cho từng dòng ngoài (như vòng lặp), thường thay thế được bằng GROUP BY + HAVING.

---

## 6. Thứ tự thực thi logic của một câu SELECT

Bạn *viết* SELECT theo một thứ tự, nhưng DBMS *thực thi logic* theo thứ tự khác. Hiểu thứ tự này giải thích mọi quy tắc "vì sao được/không được" ở trên.

\`\`\`
1. FROM / JOIN     →  ghép & xác định nguồn dữ liệu
2. WHERE           →  lọc DÒNG (chưa có nhóm, chưa có alias của SELECT)
3. GROUP BY        →  gom thành các nhóm
4. HAVING          →  lọc NHÓM (dùng được aggregate)
5. SELECT          →  chọn cột, tính biểu thức, đặt alias
6. ORDER BY        →  sắp xếp (dùng được alias của SELECT)
7. LIMIT / OFFSET  →  cắt số dòng trả về
\`\`\`

Hai hệ quả thực tế suy ra trực tiếp từ thứ tự này:

- \`WHERE\` chạy ở bước 2, **trước** \`SELECT\` (bước 5) → không dùng được alias đặt trong SELECT, cũng không dùng được aggregate (chưa gom ở bước 3).
- \`ORDER BY\` chạy ở bước 6, **sau** \`SELECT\` → **dùng được** alias. Đó là lý do \`SELECT amount*2 AS gia_doi ... ORDER BY gia_doi\` hợp lệ nhưng \`WHERE gia_doi > 100\` thì không.

❓ *"Vậy DBMS thật sự chạy đúng thứ tự này từng bước?"* — Đây là **thứ tự logic** (để định nghĩa kết quả đúng). Optimizer có thể đảo thứ tự *vật lý* (ví dụ đẩy lọc xuống sớm) miễn là kết quả không đổi — xem [Lesson 05 — Query Execution](../../02-Intermediate/lesson-05-query-execution/).

🔁 **Dừng lại tự kiểm tra.** Vì sao \`WHERE SUM(amount) > 100\` luôn báo lỗi nhưng \`HAVING SUM(amount) > 100\` thì không?

<details><summary>Đáp án</summary>

\`WHERE\` (bước 2) chạy **trước** \`GROUP BY\` (bước 3) nên chưa có nhóm để tính \`SUM\`. \`HAVING\` (bước 4) chạy **sau** gom nhóm nên \`SUM\` đã sẵn sàng.
</details>

---

## 7. Bài tập

Dùng hai bảng \`customers\` và \`orders\` ở mục 1.

1. **JOIN cơ bản.** Viết câu liệt kê \`name\` của khách kèm \`amount\` từng đơn của họ — chỉ những khách *có* đơn. Sau đó sửa câu để **bao gồm cả khách không có đơn** (cột amount = NULL).

2. **GROUP BY + aggregate.** Với mỗi \`city\`, đếm số *khách hàng* và tính *tổng tiền tất cả đơn* của các khách ở thành phố đó. (Gợi ý: cần JOIN trước rồi mới GROUP BY theo \`city\`.)

3. **HAVING.** Liệt kê \`customer_id\` của các khách **có từ 2 đơn trở lên**, kèm tổng tiền của họ.

4. **Subquery.** Dùng subquery (không dùng JOIN ở câu ngoài) để lấy \`name\` các khách **không có đơn hàng nào**.

5. **Tổng hợp (JOIN + GROUP BY + HAVING + ORDER BY).** Với mỗi khách *có đơn*, tính tổng tiền; chỉ giữ khách có tổng > 300; sắp theo tổng giảm dần.

---

## 8. Lời giải chi tiết

### Bài 1 — JOIN cơ bản

Chỉ khách có đơn → \`INNER JOIN\`:

\`\`\`sql
SELECT c.name, o.amount
FROM customers c
JOIN orders o ON c.id = o.customer_id;
\`\`\`

Kết quả 5 dòng: (An,200), (An,150), (Binh,300), (Chi,500), (Chi,50).

Bao gồm cả khách không có đơn → đổi thành \`LEFT JOIN\`:

\`\`\`sql
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

Thêm dòng \`(Dung, NULL)\` → 6 dòng.

### Bài 2 — GROUP BY theo city

Phải \`LEFT JOIN\` (để khách không đơn vẫn đếm vào số khách của city) rồi gom theo \`city\`:

\`\`\`sql
SELECT c.city,
       COUNT(DISTINCT c.id) AS so_khach,
       SUM(o.amount)        AS tong_tien
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.city;
\`\`\`

Walk-through:

| city | khách | đơn ghép | so_khach (DISTINCT id) | tong_tien |
| --- | --- | --- | :-: | --: |
| Hanoi | An(#1), Chi(#3) | 200,150,500,50 | 2 | 900 |
| Da Nang | Binh(#2) | 300 | 1 | 300 |
| HCM | Dung(#4) | NULL | 1 | NULL (SUM bỏ qua NULL → thực ra trả NULL vì không có giá trị nào) |

> Dùng \`COUNT(DISTINCT c.id)\` chứ không \`COUNT(*)\`: vì sau JOIN, An và Chi mỗi người xuất hiện 2 dòng (2 đơn), \`COUNT(*)\` ở Hanoi sẽ ra 4 thay vì 2. \`DISTINCT c.id\` đếm đúng số khách.

### Bài 3 — HAVING từ 2 đơn trở lên

\`\`\`sql
SELECT customer_id, COUNT(*) AS so_don, SUM(amount) AS tong
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;
\`\`\`

Gom: nhóm1 có 2 đơn, nhóm2 có 1 đơn, nhóm3 có 2 đơn. \`HAVING COUNT(*) >= 2\` giữ nhóm 1 và 3:

| customer_id | so_don | tong |
| :-: | :-: | --: |
| 1 | 2 | 350 |
| 3 | 2 | 550 |

### Bài 4 — Subquery: khách không có đơn

\`\`\`sql
SELECT name FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);
\`\`\`

Tập \`customer_id\` của orders = \`{1,2,3}\`. Khách có id **không** thuộc tập này: chỉ **Dung (#4)**.

> Cảnh báo \`NOT IN\` + NULL: nếu cột \`customer_id\` chứa \`NULL\`, \`NOT IN\` có thể trả rỗng bất ngờ (so sánh với NULL ra "unknown"). An toàn hơn: \`WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)\`.

### Bài 5 — Tổng hợp

\`\`\`sql
SELECT c.name, SUM(o.amount) AS tong
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
HAVING SUM(o.amount) > 300
ORDER BY tong DESC;
\`\`\`

- \`JOIN\` (inner) → chỉ khách có đơn (loại Dung từ đầu).
- Gom theo khách: An=350, Binh=300, Chi=550.
- \`HAVING SUM > 300\` → giữ An(350) và Chi(550); loại Binh(300, không > 300).
- \`ORDER BY tong DESC\`:

| name | tong |
| --- | --: |
| Chi | 550 |
| An | 350 |

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — mô phỏng JOIN (chọn loại JOIN → animate ghép dòng, đếm số dòng, đánh dấu ô NULL), mô phỏng GROUP BY (gom theo cột → tính COUNT/SUM/AVG từng nhóm), và panel so sánh WHERE vs HAVING (lọc trước/sau gom).

---

## Bài tiếp theo

→ [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/): primary key, foreign key, unique, check, NOT NULL — cơ chế đảm bảo \`customer_id\` luôn trỏ tới một khách có thật, để JOIN không bao giờ gặp đơn "mồ côi".
`;
