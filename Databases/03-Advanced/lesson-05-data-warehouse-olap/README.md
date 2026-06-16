# Lesson 05 — Data Warehouse & OLAP

> Nhóm 3 — Nâng cao · Bài cuối của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ hai kiểu tải công việc **OLTP** (giao dịch) và **OLAP** (phân tích), rồi đi sâu vào OLAP.
- Hiểu **kho dữ liệu (data warehouse)** là gì và **vì sao phải tách** nó khỏi hệ OLTP.
- Nắm luồng **ETL/ELT** (extract-transform-load — trích xuất, biến đổi, nạp) đưa dữ liệu từ hệ OLTP sang warehouse.
- Hiểu **mô hình chiều (dimensional modeling)**: bảng sự kiện (**fact table**) và bảng chiều (**dimension table**); phân biệt **star schema** (sơ đồ sao) và **snowflake schema** (sơ đồ bông tuyết).
- Hiểu vì sao kho dữ liệu thường **phi chuẩn hóa có chủ đích (denormalize)** thay vì chuẩn hóa như OLTP.
- Hiểu **lưu trữ theo cột (columnar storage)** vs **theo hàng (row storage)** và vì sao OLAP hợp với columnar.
- Nắm sơ lược khái niệm **cube (khối dữ liệu)**, **roll-up / drill-down**, **slice / dice**.

## Kiến thức tiền đề

- [Lesson 01 — Giới thiệu CSDL & DBMS](../../01-Foundations/lesson-01-gioi-thieu-csdl/): đã giới thiệu cặp khái niệm OLTP vs OLAP. Bài này ôn nhanh rồi đào sâu OLAP.
- [Lesson 06 — Thiết kế ER](../../01-Foundations/lesson-06-thiet-ke-er/): mô hình thực thể–quan hệ, khóa chính/khóa ngoại — nền để hiểu fact/dimension.
- [Lesson 01 — Chuẩn hóa (Nhóm 2)](../../02-Intermediate/lesson-01-chuan-hoa/): warehouse cố tình đi ngược chuẩn hóa, nên cần biết chuẩn hóa là gì để hiểu sự đánh đổi.
- [Lesson 02 — NoSQL (Nhóm 3)](../lesson-02-nosql/): column-family store liên hệ với ý tưởng lưu theo cột.

---

## 1. Ôn nhanh: OLTP vs OLAP

💡 **Trực giác.** **OLTP** giống *quầy thu ngân siêu thị*: hàng nghìn giao dịch nhỏ mỗi giây, mỗi cái chạm vài dòng ("trừ 1 hộp sữa khỏi kho, in 1 hóa đơn"). **OLAP** giống *phòng kế toán cuối năm*: rất ít truy vấn nhưng mỗi cái quét hàng chục triệu dòng ("tổng doanh thu theo tỉnh × danh mục trong 5 năm").

| | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
| --- | --- | --- |
| Mục đích | Giao dịch nghiệp vụ hằng ngày | Phân tích, báo cáo, ra quyết định |
| Truy vấn điển hình | Đọc/ghi **vài dòng** theo khóa | Quét & tổng hợp **hàng triệu dòng** |
| Thao tác | Nhiều `INSERT`/`UPDATE`/`DELETE` nhỏ | Chủ yếu `SELECT ... GROUP BY` lớn |
| Số lượng | Rất nhiều, đồng thời cao | Ít, mỗi cái nặng |
| Dữ liệu | Hiện tại, "sống" | Lịch sử, có thể trễ vài giờ/ngày |
| Tối ưu cho | Ghi nhanh, độ trễ thấp | Đọc tổng hợp khối lớn |
| Mô hình hóa | Chuẩn hóa (normalize) chống dư thừa | Phi chuẩn hóa (denormalize) để đọc nhanh |

⚠ **Lỗi thường gặp.** Đừng nghĩ "OLAP = chậm còn OLTP = nhanh". Cả hai đều phải nhanh — nhưng *nhanh ở việc khác nhau*. OLTP nhanh ở **ghi 1 dòng**; OLAP nhanh ở **gom 10 triệu dòng thành 1 con số**. Một hệ tối ưu cho việc này thường tệ ở việc kia — đó chính là lý do người ta tách hai hệ.

📝 **Tóm tắt mục 1.** OLTP = nhiều giao dịch nhỏ, ghi-nặng, dữ liệu hiện tại, chuẩn hóa. OLAP = ít truy vấn lớn, đọc-tổng-hợp-nặng, dữ liệu lịch sử, phi chuẩn hóa. Phần còn lại của bài tập trung OLAP.

---

## 2. Data warehouse — vì sao phải tách khỏi OLTP?

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** **Kho dữ liệu (data warehouse)** là một cơ sở dữ liệu **riêng**, chứa dữ liệu lịch sử đã được gom từ một hay nhiều hệ OLTP (và các nguồn khác), tổ chức để phục vụ **phân tích** — chứ không phục vụ giao dịch hằng ngày.

**(b) Vì sao cần (tách riêng).** Hai lý do chính:

1. **Hiệu năng không giẫm chân nhau.** Một truy vấn OLAP "tổng doanh thu 5 năm" quét hàng chục triệu dòng, khóa bảng lâu, ngốn CPU/đĩa. Nếu chạy ngay trên hệ OLTP đang phục vụ khách đặt hàng, nó làm **chậm cả giao dịch** — khách bấm "Thanh toán" mà quay vòng vòng. Tách warehouse ra máy riêng → phân tích nặng không ảnh hưởng giao dịch.
2. **Tối ưu ngược nhau.** OLTP chuẩn hóa + index cho ghi nhanh; OLAP phi chuẩn hóa + lưu theo cột cho đọc-tổng-hợp nhanh. Không thể bắt một bảng vừa giỏi cả hai.

**(c) Ví dụ trực giác.** Công ty bán lẻ có hệ OLTP PostgreSQL phục vụ website (đặt hàng, kho, thanh toán). Mỗi đêm 2h sáng, một tiến trình **ETL** sao chép dữ liệu bán hàng trong ngày sang warehouse (ví dụ BigQuery / ClickHouse / Snowflake). Sáng hôm sau, phòng phân tích chạy báo cáo "doanh thu theo tháng × danh mục" trên warehouse — website vẫn chạy mượt vì truy vấn nặng không chạm vào PostgreSQL.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Sao không mua server OLTP thật mạnh là chạy được cả hai?"* — Phần cứng mạnh giúp được phần nào, nhưng không giải quyết việc **tối ưu ngược nhau** (row vs columnar) và việc một query quét cả bảng vẫn khóa/đụng cache của giao dịch. Tách hệ vẫn rẻ và sạch hơn.
- *"Warehouse có cần real-time không?"* — Thường **không**. Phân tích chấp nhận trễ vài giờ tới một ngày (gọi là *batch*). Nếu cần real-time có kiến trúc riêng (streaming), nằm ngoài phạm vi bài này.

### 2.2 ETL / ELT — đưa dữ liệu sang warehouse

💡 **Trực giác.** ETL giống dây chuyền *thu gom – làm sạch – đóng gói* nông sản: lấy rau từ nhiều vườn (extract), rửa và phân loại (transform), rồi xếp lên kệ siêu thị (load).

- **Extract (trích xuất):** đọc dữ liệu thô từ các nguồn — bảng OLTP, file log, API.
- **Transform (biến đổi):** làm sạch và chuẩn dạng — bỏ trùng, đổi `M/F` thành `Nam/Nữ`, đổi múi giờ, gom `orders` + `order_items` thành dòng doanh thu, tính sẵn cột phái sinh.
- **Load (nạp):** ghi kết quả vào fact/dimension của warehouse.

**ETL vs ELT.** Chỉ khác **thứ tự**:

| | ETL | ELT |
| --- | --- | --- |
| Thứ tự | Extract → **Transform** → Load | Extract → Load → **Transform** |
| Biến đổi ở đâu | Ở tầng trung gian (trước khi vào kho) | Ngay **trong** warehouse bằng SQL |
| Hợp khi | Kho cũ, năng lực tính toán hạn chế | Kho đám mây mạnh (BigQuery, Snowflake) — nạp thô rồi transform bằng sức mạnh của kho |

**Ví dụ một bước transform cụ thể.** Hệ OLTP có hai bảng chuẩn hóa: `orders(order_id, customer_id, order_date)` và `order_items(order_id, product_id, qty, unit_price)`. Bước transform **gộp** chúng và tính sẵn thành tiền:

```sql
-- Từ 2 bảng OLTP chuẩn hóa, sinh ra các dòng fact đã tính sẵn amount
SELECT o.order_date, oi.product_id, o.store_id,
       oi.qty                       AS quantity,
       oi.qty * oi.unit_price       AS amount
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id;
```

Mỗi dòng kết quả sẽ thành một dòng trong `fact_sales` (mục 3).

📝 **Tóm tắt mục 2.** Warehouse là CSDL riêng cho phân tích, tách khỏi OLTP để (1) không làm chậm giao dịch và (2) tối ưu ngược cho việc đọc-tổng-hợp. ETL/ELT là luồng extract–transform–load chuyển dữ liệu sang kho; khác nhau chỉ ở chỗ transform trước hay sau khi load.

---

## 3. Mô hình chiều (dimensional modeling)

💡 **Trực giác.** Hãy hình dung một câu hỏi kinh doanh: *"bán **bao nhiêu**, của **cái gì**, ở **đâu**, **khi nào**?"*. Phần "bao nhiêu" là **số đo (measure)** — đặt vào **fact table**. Các phần "cái gì / ở đâu / khi nào" là **bối cảnh** — tách thành các **dimension table**. Fact table ở giữa, các dimension vây quanh như cánh sao.

### 3.1 Fact table (bảng sự kiện)

**(a) Là gì.** Một bảng chứa các **sự kiện đo lường được**. Mỗi dòng là một sự kiện (một lần bán). Cột gồm: các **measure** (số đo: quantity, amount...) và các **khóa ngoại (foreign key)** trỏ tới dimension. Fact table thường **rất nhiều dòng** (hàng triệu–tỉ).

**(b) Vì sao cần.** Tách số đo khỏi mô tả để fact table gọn (chỉ chứa số + khóa), nén tốt, quét nhanh khi tổng hợp.

**(c) Bốn ví dụ measure:**

| Nghiệp vụ | Fact table | Measure (số đo) |
| --- | --- | --- |
| Bán lẻ | `fact_sales` | `quantity`, `amount` |
| Web | `fact_pageviews` | `view_count`, `duration_sec` |
| Ngân hàng | `fact_transactions` | `amount`, `fee` |
| Kho vận | `fact_shipments` | `weight_kg`, `delivery_days` |

### 3.2 Dimension table (bảng chiều)

**(a) Là gì.** Bảng **mô tả** một góc nhìn để cắt lát dữ liệu: thời gian, sản phẩm, cửa hàng, khách hàng. Mỗi dimension có một **khóa chính (primary key)** mà fact table tham chiếu. Dimension thường **ít dòng hơn fact** nhưng **nhiều cột** mô tả.

**(b) Vì sao cần.** Cho phép `GROUP BY` và lọc theo thuộc tính dễ đọc ("theo *danh mục* sản phẩm", "theo *quý*") mà không nhồi mọi mô tả vào fact.

**(c) Bốn ví dụ dimension:**

| Dimension | Khóa | Vài cột mô tả |
| --- | --- | --- |
| `dim_date` | `date_id` | `day`, `month`, `quarter`, `year`, `weekday` |
| `dim_product` | `product_id` | `name`, `category`, `brand`, `unit_price` |
| `dim_store` | `store_id` | `store_name`, `city`, `region` |
| `dim_customer` | `customer_id` | `name`, `segment`, `city` |

### 3.3 Star schema vs Snowflake schema

**Star schema (sơ đồ sao).** Fact ở giữa, mỗi dimension là **một bảng phẳng duy nhất** (đã phi chuẩn hóa). Sơ đồ trông như ngôi sao:

```
        dim_date
            |
dim_store --+-- fact_sales --+-- dim_product
            |
        dim_customer
```

**Snowflake schema (sơ đồ bông tuyết).** Giống star, nhưng các dimension được **chuẩn hóa tiếp** thành nhiều bảng con. Ví dụ tách `category` ra khỏi `dim_product`:

```
fact_sales --- dim_product --- dim_category --- dim_department
```

`dim_product` trông như sao, các bảng con tách ra như tinh thể tuyết — nên gọi snowflake.

**Đánh đổi:**

| | Star schema | Snowflake schema |
| --- | --- | --- |
| Chuẩn hóa | Phi chuẩn hóa (dimension phẳng) | Chuẩn hóa dimension thành nhiều bảng |
| Dư thừa dữ liệu | Có (lặp `category`, `brand`...) | Ít hơn |
| Số JOIN khi truy vấn | Ít (fact ↔ vài dimension) | Nhiều (phải JOIN qua các bảng con) |
| Tốc độ đọc/phân tích | **Nhanh hơn** (ít JOIN) | Chậm hơn |
| Tốn dung lượng | Nhiều hơn | Ít hơn |
| Phổ biến trong warehouse | **Mặc định** | Khi dimension rất lớn/hay đổi |

💡 **Liên hệ chuẩn hóa.** Ở [Lesson 01 — Chuẩn hóa](../../02-Intermediate/lesson-01-chuan-hoa/), ta học chuẩn hóa để **chống dư thừa & bất thường khi ghi**. Warehouse **ghi rất ít** (chỉ ETL ban đêm) nhưng **đọc cực nhiều**, nên đảo ngược ưu tiên: cố tình **phi chuẩn hóa (denormalize)** dimension để **bớt JOIN**, đọc nhanh. Dư thừa không phải tội ở đây vì dữ liệu chỉ ghi 1 lần qua ETL, không sửa lắt nhắt như OLTP.

⚠ **Lỗi thường gặp.** Đừng "chuẩn hóa tới chuẩn 3 (3NF)" cho warehouse theo phản xạ OLTP — nó tạo nhiều JOIN làm chậm phân tích. Ngược lại, đừng phi chuẩn hóa OLTP để "đọc nhanh" — sẽ gây bất thường khi cập nhật (update anomaly). Mỗi hệ một triết lý.

### 3.4 Ví dụ cụ thể + walk-through một truy vấn OLAP

**Schema (star):**

```sql
fact_sales(date_id, product_id, store_id, quantity, amount)   -- bảng sự kiện
dim_date(date_id, day, month, quarter, year)                  -- chiều thời gian
dim_product(product_id, name, category)                       -- chiều sản phẩm
dim_store(store_id, store_name, city, region)                 -- chiều cửa hàng
```

**Vài dòng fact mẫu:**

| date_id | product_id | store_id | quantity | amount |
| --- | --- | --- | --- | --- |
| 20240105 | P1 | S1 | 2 | 200 |
| 20240120 | P2 | S1 | 1 | 50 |
| 20240210 | P1 | S2 | 3 | 300 |
| 20240315 | P2 | S2 | 4 | 200 |
| 20240318 | P1 | S1 | 1 | 100 |

`dim_product`: `P1 → category='Đồ điện'`, `P2 → category='Sách'`. `dim_date`: tháng từ `date_id` (20240105 → tháng 1).

**Truy vấn OLAP "doanh thu theo tháng × danh mục":**

```sql
SELECT d.month, p.category, SUM(f.amount) AS revenue
FROM fact_sales f
JOIN dim_date    d ON d.date_id    = f.date_id
JOIN dim_product p ON p.product_id = f.product_id
GROUP BY d.month, p.category
ORDER BY d.month, p.category;
```

**Walk-through từng dòng fact (gắn tháng + danh mục, rồi cộng dồn):**

| date_id | tháng | product | category | amount |
| --- | --- | --- | --- | --- |
| 20240105 | 1 | P1 | Đồ điện | 200 |
| 20240120 | 1 | P2 | Sách | 50 |
| 20240210 | 2 | P1 | Đồ điện | 300 |
| 20240315 | 3 | P2 | Sách | 200 |
| 20240318 | 3 | P1 | Đồ điện | 100 |

Gom nhóm `(tháng, category)` và cộng `amount`:

| month | category | revenue |
| --- | --- | --- |
| 1 | Đồ điện | 200 |
| 1 | Sách | 50 |
| 2 | Đồ điện | 300 |
| 3 | Đồ điện | 100 |
| 3 | Sách | 200 |

Đây chính là bản chất của OLAP: **quét nhiều dòng fact, JOIN với dimension để lấy nhãn dễ đọc (tháng, danh mục), rồi gom nhóm + tổng hợp** thành một bảng nhỏ để con người đọc.

🔁 **Dừng lại tự kiểm tra.**
1. Trong schema trên, `quantity` và `amount` thuộc fact hay dimension? Còn `category`?
2. Vì sao star schema nhanh hơn snowflake khi chạy truy vấn phân tích?

<details><summary>Đáp án</summary>

1. `quantity`, `amount` là **measure** → nằm trong **fact_sales**. `category` là thuộc tính mô tả → nằm trong **dim_product** (dimension).
2. Star giữ mỗi dimension phẳng (đã phi chuẩn hóa) → truy vấn chỉ cần JOIN fact với vài dimension. Snowflake tách dimension thành nhiều bảng con → phải JOIN thêm nhiều bảng, chậm hơn.
</details>

📝 **Tóm tắt mục 3.** Fact table = số đo (measure) + khóa ngoại tới dimension, rất nhiều dòng. Dimension table = mô tả để cắt lát, nhiều cột. Star schema (dimension phẳng) là mặc định cho warehouse vì ít JOIN, đọc nhanh; snowflake chuẩn hóa dimension hơn (ít dư thừa, nhiều JOIN, chậm hơn).

---

## 4. Lưu trữ theo cột vs theo hàng

💡 **Trực giác.** Hình dung bảng là một tủ hồ sơ. **Lưu theo hàng (row storage)** xếp *trọn bộ hồ sơ của một người* liền nhau (đọc 1 người thì tiện). **Lưu theo cột (columnar storage)** gom *tất cả "số điện thoại" của mọi người* vào một ngăn riêng, "tất cả họ tên" vào ngăn khác. Khi sếp hỏi "tổng lương của 1 triệu người", lưu theo cột chỉ cần kéo ra **một ngăn lương**, không phải lật từng hồ sơ.

### 4.1 Hai cách đặt dữ liệu trên đĩa

Cùng bảng `fact_sales(date_id, product_id, store_id, quantity, amount)`:

- **Row storage:** trên đĩa, các byte của một dòng nằm liền nhau:
  `[20240105,P1,S1,2,200][20240120,P2,S1,1,50][20240210,P1,S2,3,300]...`
  Hợp OLTP: "lấy nguyên 1 đơn hàng" → đọc 1 vùng liền mạch.

- **Columnar storage:** mỗi cột lưu thành một mảng riêng:
  `date_id:  [20240105, 20240120, 20240210, ...]`
  `amount:   [200, 50, 300, 200, 100, ...]`
  Hợp OLAP: muốn `SUM(amount)` → đọc thẳng **mảng amount**, bỏ qua mọi cột khác.

### 4.2 Vì sao OLAP hợp columnar — ví dụ bằng số

Bảng có **20 cột**, **10.000.000 dòng**. Truy vấn `SELECT SUM(amount) FROM fact_sales;` chỉ cần **1 cột** (`amount`).

- **Row storage:** để lấy cột `amount`, đĩa vẫn phải đọc **cả dòng** (cách bố trí byte không cho đọc riêng 1 cột) → đọc $20 \text{ cột} \times 10{.}000{.}000 = \mathbf{200{.}000{.}000}$ ô, rồi vứt bỏ 19/20.
- **Columnar storage:** đọc **đúng 1 cột** → $1 \times 10{.}000{.}000 = \mathbf{10{.}000{.}000}$ ô.

→ Columnar đọc **ít hơn ~20 lần** cho truy vấn này. Truy vấn OLAP điển hình chạm rất ít cột nhưng rất nhiều dòng → đây là kiểu lợi thế thường gặp.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Ngoài đọc ít cột, columnar còn lợi gì?"* — **Nén (compression) tốt hơn nhiều.** Một cột chứa toàn giá trị cùng kiểu/cùng miền (vd `category` chỉ có vài giá trị lặp lại) → nén bằng run-length / dictionary cực hiệu quả. Ít dữ liệu trên đĩa → đọc còn nhanh hơn nữa.
- *"Vậy sao OLTP không dùng columnar luôn?"* — Vì OLTP hay **ghi/sửa nguyên một dòng**. Với columnar, một dòng bị xé ra 20 ngăn → ghi 1 dòng phải chạm 20 chỗ, chậm. Row storage ghi 1 dòng vào 1 vùng liền mạch, nhanh hơn hẳn.

💡 **Liên hệ.** Ý tưởng "gom dữ liệu theo cột" này họ hàng với **column-family store** (Cassandra/HBase) ở [Lesson 02 — NoSQL](../lesson-02-nosql/) — dù mục tiêu và chi tiết khác nhau, cùng chung trực giác "tổ chức theo cột để đọc nhóm cột nhanh".

⚠ **Lỗi thường gặp.** "Columnar luôn nhanh hơn" là sai. Với truy vấn `SELECT * FROM fact WHERE id = 5` (lấy đủ 20 cột của 1 dòng), columnar phải ghép 20 ngăn lại → **chậm hơn** row storage. Columnar chỉ thắng khi *đọc ít cột, nhiều dòng* — đúng kiểu OLAP.

📝 **Tóm tắt mục 4.** Row storage để các byte của một dòng liền nhau (hợp OLTP, ghi/đọc trọn dòng). Columnar storage để mỗi cột thành mảng riêng (hợp OLAP, đọc vài cột × nhiều dòng), lại nén tốt hơn. Truy vấn `SUM` một cột trên bảng 20 cột: columnar đọc ít hơn ~20 lần.

---

## 5. Cube, roll-up / drill-down, slice / dice (sơ lược)

💡 **Trực giác.** Hãy hình dung dữ liệu doanh thu như một **khối Rubik (cube — khối dữ liệu)** với 3 cạnh là 3 chiều: *thời gian × sản phẩm × cửa hàng*. Mỗi ô nhỏ trong khối là một con số tổng hợp (vd doanh thu của "P1, tháng 1, store S1"). Các thao tác OLAP là cách **xoay / cắt / phóng to** khối này.

- **Roll-up (cuộn lên):** gộp lên mức tổng quát hơn theo một chiều. Vd doanh thu *theo ngày* → cuộn lên *theo tháng* → *theo quý* → *theo năm*. Số dòng kết quả **giảm**, mỗi dòng tổng hợp nhiều hơn.

  Ví dụ số: ngày `[1/1: 200, 5/1: 50, 20/1: 100]` → roll-up theo tháng → `[tháng 1: 350]`.

- **Drill-down (khoan xuống):** ngược lại roll-up — từ mức tổng quát đi vào chi tiết hơn. Vd *theo quý* → bung ra *theo tháng* → *theo ngày*.

  Ví dụ: `[Q1: 750]` → drill-down → `[tháng 1: 350, tháng 2: 300, tháng 3: 100]`.

- **Slice (cắt lát):** cố định **một** chiều ở một giá trị, lấy "lát" còn lại. Vd "chỉ xem cube ở `store = S1`" → còn một mặt 2 chiều thời gian × sản phẩm.

- **Dice (xúc khối):** lọc **nhiều** chiều cùng lúc theo các tập giá trị → lấy ra một **khối con**. Vd "$store \in \{S1, S2\}$ và `quarter = Q1` và `category = 'Đồ điện'`".

❓ *"Roll-up khác `GROUP BY` thường ở đâu?"* — Về bản chất roll-up **là** dùng `GROUP BY` ở mức cao hơn. Thuật ngữ cube/roll-up/drill-down là **góc nhìn người dùng** trên công cụ BI (Business Intelligence), còn bên dưới warehouse vẫn thực thi bằng các `GROUP BY`/`SUM` như mục 3.4.

📝 **Tóm tắt mục 5.** Cube = dữ liệu nhìn theo nhiều chiều. Roll-up = gộp lên mức tổng quát hơn (ít dòng hơn); drill-down = đi vào chi tiết hơn; slice = cố định 1 chiều; dice = lọc nhiều chiều lấy khối con. Bên dưới đều quy về `GROUP BY` + tổng hợp.

---

## 6. Dùng đúng hệ — đừng lẫn lộn

⚠ **Lỗi thường gặp (quan trọng nhất bài).**

- **Dùng warehouse cho OLTP:** chạy nhiều `INSERT`/`UPDATE` đơn lẻ vào kho columnar → mỗi ghi chạm nhiều ngăn cột, không tối ưu cho ghi-một-dòng, không phục vụ độ trễ thấp của giao dịch. Warehouse sinh ra để **đọc tổng hợp**, không phải ghi lắt nhắt.
- **Dùng OLTP cho OLAP:** chạy báo cáo "doanh thu 5 năm" thẳng trên PostgreSQL đang phục vụ khách → khóa bảng, ngốn tài nguyên, **làm chậm giao dịch** của khách thật. Đây đúng là lý do người ta tách warehouse.

Quy tắc ngón tay cái: **ghi nhiều giao dịch nhỏ, độ trễ thấp → OLTP. Đọc tổng hợp khối lớn, chấp nhận trễ → OLAP/warehouse.**

---

## 7. Ứng dụng thực tế trong phần mềm

> 💡 **Data warehouse / OLAP là vì sao dashboard phân tích không chạy thẳng trên DB sản phẩm.** Tách OLTP (giao dịch) khỏi OLAP (phân tích) là kiến trúc dữ liệu chuẩn.

| Khái niệm | Trong hệ thống thật |
|-----------|---------------------|
| **OLTP vs OLAP** | DB sản phẩm (Postgres) phục vụ app; warehouse (BigQuery/Snowflake) phục vụ phân tích |
| **ETL/ELT** | Sao dữ liệu từ OLTP → warehouse mỗi đêm/realtime (Airflow, dbt, Fivetran) |
| **Star schema (fact + dimension)** | Mô hình dữ liệu cho báo cáo: bảng fact (giao dịch) + dimension (sản phẩm, thời gian, khách) |
| **Column store** | Lưu theo cột → aggregate (SUM/AVG) cực nhanh trên tỉ dòng |
| **OLAP cube / rollup** | Tổng hợp sẵn theo nhiều chiều (doanh thu theo vùng × tháng × sản phẩm) |

### 7.1. Ví dụ cụ thể — vì sao không chạy báo cáo trên DB sản phẩm

Sếp muốn "doanh thu theo vùng theo tháng 2 năm qua". Chạy query này thẳng trên Postgres sản phẩm: quét hàng trăm triệu dòng `orders`, aggregate nặng → **làm chậm cả app** (giao dịch của khách bị nghẽn). Giải pháp chuẩn: **ETL** sao dữ liệu sang warehouse (BigQuery/Snowflake/ClickHouse) theo **star schema**, chạy phân tích ở đó. App không bị ảnh hưởng; warehouse dùng column store + tổng hợp sẵn → báo cáo nhanh. Tách OLTP/OLAP (đã nêu ở [Lesson 01 §5](../../01-Foundations/lesson-01-gioi-thieu-csdl/)).

> ❓ **"Column store nhanh hơn ở đâu cho phân tích?"** Báo cáo thường `SUM(amount)` trên 1-2 cột của tỉ dòng. **Row store** (Postgres) phải đọc cả dòng (mọi cột) → phí I/O. **Column store** chỉ đọc đúng cột `amount` liên tục trên đĩa → ít I/O, nén tốt, vectorize được → nhanh gấp nhiều lần cho aggregate. Đổi lại ghi/sửa từng dòng chậm → không hợp OLTP.

### 7.2. 📝 Tóm tắt mục 7

- Tách **OLTP** (app, row store) khỏi **OLAP** (phân tích, column store) qua **ETL/ELT** → báo cáo không làm chậm app.
- **Star schema** (fact + dimension) là mô hình chuẩn cho warehouse; column store tăng tốc aggregate.
- Đừng chạy báo cáo nặng thẳng trên DB sản phẩm; dùng warehouse (BigQuery/Snowflake/ClickHouse).

## 8. Bài tập

1. **Phân biệt fact vs dimension.** Cho schema một hệ phân tích đặt phòng khách sạn:
   `fact_bookings(date_id, hotel_id, room_type_id, customer_id, nights, revenue)`,
   `dim_date(date_id, day, month, year)`, `dim_hotel(hotel_id, hotel_name, city, star_rating)`, `dim_room_type(room_type_id, type_name, capacity)`, `dim_customer(customer_id, name, country)`.
   (a) Đâu là fact table, đâu là các dimension? (b) Cột nào là measure? (c) `city`, `star_rating`, `nights` mỗi cái nằm ở bảng nào và đóng vai trò gì?

2. **Vẽ star schema.** Một thư viện muốn phân tích lượt mượn sách: cần phân tích theo *thời gian mượn*, *đầu sách* (tên, thể loại), *chi nhánh thư viện* (tên, quận), *bạn đọc* (nhóm tuổi); số đo là *số lượt mượn* và *số ngày giữ sách*. Hãy thiết kế star schema: nêu tên fact table với các cột, và các dimension table với vài cột mỗi bảng.

3. **Vì sao columnar nhanh.** Bảng `fact_events(user_id, event_type, ts, country, device, amount)` — 6 cột, 50.000.000 dòng. Truy vấn: `SELECT country, SUM(amount) FROM fact_events GROUP BY country;`. (a) Truy vấn chạm mấy cột? (b) Ước lượng số ô đọc với row storage và với columnar. (c) Columnar đọc ít hơn khoảng bao nhiêu lần?

4. **OLTP hay OLAP/warehouse?** Với mỗi tình huống, chọn hệ phù hợp và giải thích một câu: (a) khách bấm "Đặt hàng", trừ kho và ghi đơn; (b) giám đốc xem dashboard "doanh thu theo vùng × danh mục theo từng quý của 3 năm"; (c) cập nhật số điện thoại của 1 khách; (d) phòng marketing phân tích "tỉ lệ giữ chân khách theo tháng đăng ký" trên toàn bộ lịch sử.

5. **Roll-up / drill-down.** Có doanh thu theo ngày của Q1: `tháng 1 = [10, 20, 5]` (3 ngày), `tháng 2 = [30, 10]`, `tháng 3 = [15, 25]` (đơn vị: triệu). (a) Roll-up lên mức **tháng** cho kết quả gì? (b) Roll-up tiếp lên mức **quý** cho con số nào? (c) Từ kết quả quý, "drill-down" về tháng nghĩa là làm gì?

---

## 9. Lời giải chi tiết

### Bài 1 — Fact vs dimension

- **(a) Fact table:** `fact_bookings`. **Dimensions:** `dim_date`, `dim_hotel`, `dim_room_type`, `dim_customer`.
- **(b) Measure:** `nights` (số đêm) và `revenue` (doanh thu) — là các số có thể cộng/tổng hợp. (`date_id`, `hotel_id`, `room_type_id`, `customer_id` là khóa ngoại, không phải measure.)
- **(c)**
  - `city` → trong `dim_hotel`, vai trò **thuộc tính mô tả** của chiều khách sạn (dùng để lọc/gom nhóm theo thành phố).
  - `star_rating` → trong `dim_hotel`, cũng là **thuộc tính mô tả**.
  - `nights` → trong `fact_bookings`, vai trò **measure** (số đo, tổng hợp được).

### Bài 2 — Star schema cho thư viện

```sql
-- Fact table
fact_loans(date_id, book_id, branch_id, reader_id,
           loan_count, hold_days)        -- measure: loan_count, hold_days

-- Dimensions
dim_date(date_id, day, month, quarter, year)
dim_book(book_id, title, genre, author)
dim_branch(branch_id, branch_name, district)
dim_reader(reader_id, age_group, gender)
```

Sơ đồ sao: `fact_loans` ở giữa, 4 dimension (`dim_date`, `dim_book`, `dim_branch`, `dim_reader`) vây quanh, mỗi dimension nối tới fact qua khóa ngoại. Measure đặt trong fact; mọi thuộc tính mô tả (genre, district, age_group...) đặt trong dimension tương ứng.

### Bài 3 — Columnar nhanh cỡ nào

- **(a)** Truy vấn chạm **2 cột**: `country` (để `GROUP BY`) và `amount` (để `SUM`).
- **(b)**
  - **Row storage:** phải đọc cả dòng → `6 cột × 50.000.000 = 300.000.000` ô.
  - **Columnar:** chỉ đọc 2 cột → `2 × 50.000.000 = 100.000.000` ô.
- **(c)** Ít hơn `300.000.000 / 100.000.000 = 3` lần. (Nếu chỉ cần 1 cột thì sẽ là 6 lần; ở đây cần 2/6 cột nên 3 lần. Chưa kể columnar còn nén tốt hơn nên thực tế thường nhanh hơn con số này.)

### Bài 4 — OLTP hay OLAP/warehouse?

- **(a)** Đặt hàng, trừ kho, ghi đơn → **OLTP**. Ghi vài dòng, cần độ trễ thấp, đồng thời cao.
- **(b)** Dashboard doanh thu theo vùng × danh mục × quý của 3 năm → **OLAP/warehouse**. Tổng hợp khối lớn theo nhiều chiều, chạy hiếm; nếu chạy trên OLTP sẽ làm chậm giao dịch.
- **(c)** Cập nhật số điện thoại của 1 khách → **OLTP**. Sửa 1 dòng theo khóa.
- **(d)** Phân tích tỉ lệ giữ chân theo tháng đăng ký trên toàn lịch sử → **OLAP/warehouse**. Quét & tổng hợp toàn bộ dữ liệu lịch sử.

### Bài 5 — Roll-up / drill-down

- **(a) Roll-up lên tháng** = cộng các ngày trong mỗi tháng:
  - tháng 1 $= 10 + 20 + 5 = \mathbf{35}$
  - tháng 2 $= 30 + 10 = \mathbf{40}$
  - tháng 3 $= 15 + 25 = \mathbf{40}$
- **(b) Roll-up lên quý** = cộng cả 3 tháng: $35 + 40 + 40 = \mathbf{115}$ (triệu).
- **(c) Drill-down về tháng** = đi ngược lại: từ con số quý `115` bung ra chi tiết theo từng tháng `[35, 40, 40]` (và có thể khoan tiếp xuống ngày). Drill-down không tạo dữ liệu mới — nó hiển thị mức chi tiết hơn của cùng dữ liệu.

---

## 10. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm 3 mô-đun: (1) sơ đồ **star schema** bằng SVG, bấm vào bảng để xem cột & vai trò; (2) so sánh **row vs columnar storage** với animation đếm số ô đọc cho truy vấn `SUM` một cột; (3) **mini OLAP** với nút roll-up/drill-down theo chiều thời gian (ngày → tháng → quý).

---

## Kết thúc lĩnh vực

Đây là bài cuối của lĩnh vực [Databases](../../README.md). Bạn đã đi từ nền tảng (CSDL, mô hình quan hệ, SQL, ER) qua trung cấp (chuẩn hóa, index, transaction, concurrency) tới nâng cao (storage engine, NoSQL, replication/sharding, CAP, và data warehouse/OLAP).

→ Ôn lại bức tranh tổng thể: [Lesson 01 — Giới thiệu CSDL & DBMS](../../01-Foundations/lesson-01-gioi-thieu-csdl/) để thấy mọi mảnh ghép khớp vào đâu.
