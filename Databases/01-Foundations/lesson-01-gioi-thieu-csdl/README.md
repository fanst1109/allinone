# Lesson 01 — Giới thiệu Cơ sở dữ liệu & DBMS

> Nhóm 1 — Nền tảng · Bài đầu tiên của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **cơ sở dữ liệu (database)** và **hệ quản trị cơ sở dữ liệu (DBMS — Database Management System)** là gì, khác nhau ra sao.
- Trả lời được câu hỏi cốt lõi: *vì sao không lưu thẳng dữ liệu vào file CSV/JSON cho xong, mà phải dùng cả một DBMS?*
- Nắm 5 vấn đề mà DBMS giải quyết: truy vấn, toàn vẹn, đồng thời, bền vững, kiểm soát truy cập.
- Phân biệt hai kiểu tải công việc **OLTP** (giao dịch) và **OLAP** (phân tích).
- Biết bức tranh tổng thể của lĩnh vực để định vị các bài sau.

## Kiến thức tiền đề

- Biết đọc một file văn bản phẳng (CSV, JSON) là gì — không cần code.
- Hữu ích (không bắt buộc): [DataStructures](../../../DataStructures/index.html) để hiểu vì sao tìm kiếm trong cấu trúc có index nhanh hơn duyệt tuyến tính.

---

## 1. Đặt vấn đề: chỉ cần một file là đủ?

Giả sử bạn viết một ứng dụng quản lý khách hàng. Cách "ngây thơ" nhất: lưu mọi thứ vào một file `customers.csv`:

```
id,name,email,city,balance
1,An,an@example.com,Hanoi,1500000
2,Binh,binh@example.com,Da Nang,800000
3,Chi,chi@example.com,Hanoi,2300000
```

Với 3 dòng thì ổn. Nhưng hãy đặt một câu hỏi rất đời thường:

> Có **1 triệu khách hàng**. Hãy lấy ra tất cả khách ở `Hanoi` có `balance > 2000000`, sắp theo balance giảm dần. Đồng thời, ngay lúc đó có 50 nhân viên khác cũng đang đọc và sửa file. Và máy chủ **mất điện giữa chừng** khi đang ghi.

Một file phẳng sụp đổ trước yêu cầu này. Ta sẽ trả lời cụ thể từng mảnh ngay trong bài (không để treo).

💡 **Trực giác.** File phẳng giống một **cuốn sổ tay chép tay**: ghi thì dễ, nhưng để *tìm*, *sửa an toàn khi nhiều người cùng viết*, hay *khôi phục khi rách trang* thì bạn phải tự làm mọi thứ bằng tay. DBMS giống một **thư viện có thủ thư, mục lục, nội quy mượn-trả và bản sao lưu** — hạ tầng lo sẵn những việc khó đó.

---

## 2. Database và DBMS là gì?

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.**
- **Database (cơ sở dữ liệu)**: một tập hợp dữ liệu có tổ chức, liên quan đến nhau, được lưu trữ bền vững (persistent — còn nguyên sau khi tắt máy).
- **DBMS (hệ quản trị cơ sở dữ liệu)**: phần mềm đứng giữa ứng dụng và dữ liệu, lo việc lưu trữ, truy vấn, đảm bảo toàn vẹn, xử lý đồng thời và phục hồi. Ví dụ: PostgreSQL, MySQL, SQLite, MongoDB, Oracle.

**(b) Vì sao cần (tách riêng khỏi ứng dụng).** Nếu mỗi ứng dụng tự quản lý byte trên đĩa, mọi lập trình viên phải tự viết lại cùng những thứ khó: index, khóa, log phục hồi. DBMS gom các bài toán đó vào một chỗ, cho ta một **giao diện khai báo (declarative)** — ta nói *muốn gì* (SQL), DBMS lo *làm thế nào*.

**(c) Ví dụ trực giác.** Câu `SELECT name FROM customers WHERE city = 'Hanoi';` — bạn không nói "mở file, đọc từng dòng, tách dấu phẩy, so sánh cột thứ 4". Bạn chỉ mô tả *kết quả mong muốn*; DBMS chọn dùng index hay quét toàn bảng.

⚠ **Phân biệt dễ nhầm.** "Database" là *dữ liệu*; "DBMS" là *phần mềm quản lý*. Người ta hay gọi tắt "MySQL là database" — thực ra MySQL là DBMS, còn database là cái `shop_db` bạn tạo bên trong nó. "SQL" lại là *ngôn ngữ truy vấn*, không phải DBMS.

### 2.2 Bốn ví dụ phân biệt 3 khái niệm

| Câu nói | Database? | DBMS? | SQL? |
| --- | :---: | :---: | :---: |
| `shop_db` chứa 12 bảng | ✓ | | |
| PostgreSQL 16 đang chạy ở cổng 5432 | | ✓ | |
| `SELECT * FROM orders;` | | | ✓ |
| MongoDB lưu collection `users` | một phần (collection ≈ dữ liệu) | ✓ (MongoDB) | (MongoDB dùng query API riêng, không SQL) |

---

## 3. Năm vấn đề DBMS giải quyết (mà file phẳng không)

Đây chính là lời giải cho câu hỏi đặt ra ở mục 1.

### 3.1 Truy vấn hiệu quả (querying)

Lọc "Hanoi & balance > 2tr" trên 1 triệu dòng:

- **File phẳng**: đọc tuần tự cả 1.000.000 dòng, mỗi truy vấn ~O(n). Không có cách "nhảy thẳng" tới đúng dòng.
- **DBMS có index**: tạo index trên `city` → tra cứu kiểu B-tree ~O(log n). Với n = 1.000.000, log₂(n) ≈ **20** bước thay vì 1.000.000. Nhanh hơn ~50.000 lần.

> Index là một bài học riêng: [Nhóm 2 — Index](../../02-Intermediate/lesson-02-index/). Ở đây chỉ cần nhớ: DBMS *có thể* tổ chức dữ liệu để tìm nhanh, file phẳng thì không.

### 3.2 Toàn vẹn dữ liệu (integrity)

File phẳng cho bạn ghi `balance = "xin chào"` hay hai khách trùng `id = 1` — không ai cản. DBMS cho phép khai báo **ràng buộc (constraint)**: kiểu dữ liệu, khóa chính (primary key) duy nhất, khóa ngoại (foreign key) tham chiếu hợp lệ. Dữ liệu sai bị từ chối ngay lúc ghi. (Chi tiết: [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/).)

### 3.3 Đồng thời (concurrency)

50 nhân viên cùng sửa file `.csv`: hai người ghi đè lên nhau, mất cập nhật (lost update). DBMS dùng **transaction** + cơ chế khóa/MVCC để nhiều người đọc-ghi song song mà kết quả vẫn đúng như thể chạy lần lượt. (Chi tiết: [Lesson 04 — Concurrency](../../02-Intermediate/lesson-04-concurrency-isolation/).)

### 3.4 Bền vững & phục hồi (durability & recovery)

Mất điện giữa lúc ghi file phẳng → file hỏng, mất dữ liệu. DBMS dùng **write-ahead log (WAL)**: ghi ý định ra log trước, nên khi bật lại có thể *replay* hoặc *rollback* về trạng thái nhất quán. (Chi tiết: [Lesson 01 — Storage Engine](../../03-Advanced/lesson-01-storage-engine/).)

### 3.5 Kiểm soát truy cập (access control)

DBMS phân quyền theo user/role: ai được đọc bảng nào, ai được xóa. File phẳng chỉ có quyền ở mức hệ điều hành — hoặc đọc được cả file, hoặc không.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy file phẳng vô dụng à?"* — Không. Với cấu hình nhỏ, log ghi-một-lần, dữ liệu tạm, hoặc trao đổi giữa hệ thống thì CSV/JSON rất tốt. Chỉ khi cần *truy vấn linh hoạt + nhiều người dùng + an toàn dữ liệu* thì DBMS mới đáng công.
- *"SQLite có phải DBMS không khi nó cũng chỉ là một file?"* — Có. SQLite lưu cả database trong **một file**, nhưng bên trên file đó là cả một engine lo index, transaction, SQL. Khác hẳn việc bạn tự đọc CSV.

🔁 **Dừng lại tự kiểm tra.**
1. File phẳng thua DBMS ở điểm nào khi có 1 triệu dòng và cần lọc theo điều kiện?
2. "Mất điện giữa lúc ghi" được DBMS xử lý bằng cơ chế tên là gì?

<details><summary>Đáp án</summary>

1. Không có index → phải quét tuyến tính O(n); DBMS dùng index tra ~O(log n).
2. Write-ahead log (WAL) — ghi log ý định trước khi ghi dữ liệu, cho phép replay/rollback khi khởi động lại.
</details>

📝 **Tóm tắt mục 3.** DBMS giải quyết 5 việc khó: (1) truy vấn nhanh nhờ index, (2) toàn vẹn nhờ constraint, (3) đồng thời nhờ transaction, (4) bền vững nhờ WAL, (5) phân quyền truy cập. File phẳng tự làm hết những việc này bằng tay → bất khả thi ở quy mô lớn.

---

## 4. Các loại DBMS (bức tranh tổng thể)

| Loại | Mô hình dữ liệu | Ví dụ | Khi nào dùng |
| --- | --- | --- | --- |
| **Quan hệ (relational/SQL)** | Bảng có hàng & cột, quan hệ qua khóa | PostgreSQL, MySQL, SQLite, SQL Server | Mặc định cho phần lớn ứng dụng; dữ liệu có cấu trúc rõ, cần JOIN & transaction |
| **Key-Value** | Cặp khóa → giá trị | Redis, DynamoDB | Cache, session, tra cứu siêu nhanh theo khóa |
| **Document** | Tài liệu JSON lồng nhau | MongoDB, Couchbase | Dữ liệu bán cấu trúc, schema linh hoạt |
| **Column-family** | Lưu theo cột, ghi cực nhiều | Cassandra, HBase | Ghi-nặng, phân tán nhiều máy |
| **Graph** | Đỉnh & cạnh | Neo4j | Quan hệ nhiều bậc (mạng xã hội, gợi ý) |

Lĩnh vực này tập trung **quan hệ** trước (Nhóm 1–2) vì nó là nền tảng và phổ biến nhất, rồi mở sang NoSQL ở [Nhóm 3 — NoSQL](../../03-Advanced/lesson-02-nosql/).

---

## 5. OLTP vs OLAP — hai kiểu tải công việc

💡 **Trực giác.** **OLTP** giống *quầy thu ngân*: rất nhiều giao dịch nhỏ, nhanh, mỗi cái chạm vài dòng ("trừ 1 sản phẩm khỏi kho, ghi 1 hóa đơn"). **OLAP** giống *kế toán cuối quý*: ít truy vấn nhưng mỗi cái quét hàng triệu dòng ("tổng doanh thu theo tỉnh trong 5 năm").

| | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
| --- | --- | --- |
| Mục đích | Giao dịch nghiệp vụ hằng ngày | Phân tích, báo cáo |
| Truy vấn điển hình | Đọc/ghi vài dòng | Quét & tổng hợp hàng triệu dòng |
| Số lượng | Rất nhiều, đồng thời cao | Ít, chạy nặng |
| Ví dụ | "Đặt 1 đơn hàng" | "Doanh thu theo tháng × khu vực" |
| Tối ưu cho | Ghi nhanh, độ trễ thấp | Đọc tổng hợp khối lớn |

Phần lớn bài học dùng góc nhìn OLTP. OLAP và data warehouse là [Lesson 05 — Nhóm 3](../../03-Advanced/lesson-05-data-warehouse-olap/).

❓ *"Một database vừa OLTP vừa OLAP được không?"* — Được, nhưng thường tách ra: hệ OLTP phục vụ ứng dụng, rồi dữ liệu được sao chép (ETL) sang một **data warehouse** riêng cho OLAP, để truy vấn phân tích nặng không làm chậm giao dịch.

---

## 6. Bài tập

1. **Phân loại khái niệm.** Với mỗi mục, ghi rõ nó là *database*, *DBMS*, hay *ngôn ngữ truy vấn*: (a) MySQL; (b) `inventory_db`; (c) `UPDATE products SET stock = stock - 1;`; (d) PostgreSQL; (e) SQL.

2. **File phẳng hay DBMS?** Với mỗi tình huống, chọn giải pháp hợp lý và giải thích một câu: (a) ghi log truy cập web append-only để sau này phân tích offline; (b) hệ thống ngân hàng nhiều chi nhánh cùng chuyển tiền; (c) file cấu hình của một ứng dụng nhỏ; (d) cửa hàng online với 200 nhân viên cùng cập nhật kho.

3. **OLTP hay OLAP?** Phân loại các truy vấn: (a) "trừ 1 khỏi tồn kho khi bán 1 sản phẩm"; (b) "doanh thu trung bình theo quý trong 3 năm qua"; (c) "thêm 1 bình luận của user"; (d) "top 10 sản phẩm bán chạy nhất mọi thời đại".

4. **Suy luận về index.** Một bảng có 16.000.000 dòng. Quét tuyến tính mất 16 triệu bước. Nếu dùng index kiểu B-tree (≈ tra cứu log₂), ước lượng số bước cần để tìm 1 dòng theo khóa. Nhanh hơn khoảng bao nhiêu lần?

---

## 7. Lời giải chi tiết

### Bài 1 — Phân loại khái niệm

| Mục | Phân loại | Vì sao |
| --- | --- | --- |
| (a) MySQL | DBMS | Phần mềm quản lý dữ liệu |
| (b) `inventory_db` | Database | Một tập dữ liệu có tên, nằm trong DBMS |
| (c) `UPDATE ...` | Ngôn ngữ truy vấn (SQL) | Một câu lệnh SQL |
| (d) PostgreSQL | DBMS | Phần mềm quản lý dữ liệu |
| (e) SQL | Ngôn ngữ truy vấn | Ngôn ngữ, không phải phần mềm cụ thể |

### Bài 2 — File phẳng hay DBMS?

- **(a) Log append-only**: **File phẳng** ổn. Chỉ ghi nối đuôi, không sửa, không cần truy vấn đồng thời phức tạp; phân tích offline có thể nạp vào công cụ riêng sau.
- **(b) Ngân hàng nhiều chi nhánh**: **DBMS** (quan hệ). Bắt buộc transaction + ACID để tiền không bốc hơi, nhiều nơi ghi đồng thời.
- **(c) File cấu hình app nhỏ**: **File phẳng** (JSON/YAML). Dữ liệu bé, một người sửa, không cần truy vấn.
- **(d) Cửa hàng 200 nhân viên cập nhật kho**: **DBMS**. Đồng thời cao + cần toàn vẹn (không bán âm kho) → constraint + transaction.

### Bài 3 — OLTP hay OLAP?

- (a) Trừ tồn kho khi bán → **OLTP** (ghi vài dòng, nhanh, rất thường xuyên).
- (b) Doanh thu trung bình theo quý 3 năm → **OLAP** (tổng hợp khối lớn, hiếm khi chạy).
- (c) Thêm 1 bình luận → **OLTP** (ghi 1 dòng).
- (d) Top 10 bán chạy mọi thời đại → **OLAP** (quét & tổng hợp toàn lịch sử).

### Bài 4 — Suy luận về index

- Quét tuyến tính: **16.000.000** bước.
- B-tree ≈ log₂(16.000.000). Vì 2²⁴ = 16.777.216 > 16.000.000, nên log₂(16.000.000) ≈ **24** bước (thực tế B-tree bậc cao còn ít tầng hơn, nhưng dùng log₂ để ước lượng trên).
- Nhanh hơn ≈ 16.000.000 / 24 ≈ **666.667 lần**.

> Đây là lý do "thêm index" là cách tối ưu truy vấn phổ biến nhất. Cái giá của index (chậm khi ghi, tốn bộ nhớ) sẽ học ở [Lesson 02 — Index](../../02-Intermediate/lesson-02-index/).

---

## 8. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — so sánh trực quan quét file phẳng vs index, mô phỏng 5 vấn đề của DBMS, và bộ phân loại OLTP/OLAP.

---

## Bài tiếp theo

→ [Lesson 02 — Mô hình quan hệ](../lesson-02-mo-hinh-quan-he/): table, row, column, schema, domain, NULL — bộ khung mà SQL đứng trên đó.
