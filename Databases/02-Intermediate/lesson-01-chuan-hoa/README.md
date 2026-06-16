# Lesson 01 — Chuẩn hóa (Normalization)

> Nhóm 2 — Trung cấp · Bài đầu tiên của nhóm này, thuộc lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao một bảng "gộp tất cả" gây ra **bất thường (anomaly)** khi thêm, sửa, xóa dữ liệu — và nhận diện được cả ba loại: insertion, update, deletion anomaly.
- Định nghĩa được **phụ thuộc hàm (functional dependency, $X \to Y$)**, phân biệt **phụ thuộc bộ phận (partial dependency)** và **phụ thuộc bắc cầu (transitive dependency)**.
- Tách một bảng phi chuẩn qua các dạng chuẩn (normal form) **1NF → 2NF → 3NF → BCNF**, hiểu mỗi mức loại bỏ đúng loại phụ thuộc nào.
- Biết khi nào nên **phi chuẩn hóa (denormalize)** có chủ đích để đánh đổi hiệu năng đọc lấy tính toàn vẹn.

## Kiến thức tiền đề

- [Lesson 05 — Khóa & ràng buộc](../../01-Foundations/lesson-05-khoa-rang-buoc/): khóa chính (primary key), khóa ngoại (foreign key), khóa ứng viên (candidate key), super key. Bài này dùng các khái niệm đó liên tục.
- [Lesson 06 — Thiết kế ER](../../01-Foundations/lesson-06-thiet-ke-er/): mô hình thực thể-quan hệ (entity-relationship). Chuẩn hóa là cách kiểm chứng và sửa một thiết kế ER bằng lý thuyết phụ thuộc.

---

## 1. Đặt vấn đề: một bảng "gộp tất cả" hỏng ở đâu?

💡 **Trực giác.** Một bảng gộp mọi thứ giống như **một tờ giấy duy nhất chép cả danh bạ lẫn nhật ký giao dịch**: mỗi lần ghi một giao dịch bạn lại phải chép lại tên, số điện thoại, địa chỉ của người đó. Khi người ấy đổi số điện thoại, bạn phải lục lại *mọi* dòng có tên họ để sửa — sót một dòng là dữ liệu mâu thuẫn.

Giả sử ta thiết kế một bảng `Orders` duy nhất, nhồi cả thông tin khách hàng lẫn sản phẩm vào:

| order_id | cust_id | cust_name | cust_city | product | unit_price | qty |
| :---: | :---: | --- | --- | --- | ---: | ---: |
| 1001 | C1 | An | Hanoi | Bàn phím | 350000 | 2 |
| 1002 | C1 | An | Hanoi | Chuột | 150000 | 1 |
| 1003 | C2 | Bình | Da Nang | Bàn phím | 350000 | 1 |
| 1004 | C3 | Chi | Hanoi | Màn hình | 2400000 | 1 |

Nhìn thì "tiện" — một truy vấn lấy được hết. Nhưng bảng này chứa ba loại bệnh. Ta sẽ chỉ rõ từng cái bằng thao tác thật, **không để treo**.

### 1.1 Update anomaly (bất thường khi sửa)

Khách `C1` (An) đổi tên thành "An Nguyễn". An xuất hiện ở **hai dòng** (1001, 1002). Bạn phải chạy:

```sql
UPDATE Orders SET cust_name = 'An Nguyễn' WHERE cust_id = 'C1';
```

Nếu bạn (hoặc một đoạn code lỗi) chỉ sửa dòng 1001 mà quên 1002 → bảng có An ở dòng này, "An Nguyễn" ở dòng kia. **Cùng một người, hai cái tên** — dữ liệu mâu thuẫn. Tên khách bị lặp ở bao nhiêu đơn thì rủi ro sai nhân lên bấy nhiêu.

### 1.2 Insertion anomaly (bất thường khi thêm)

Có khách mới `C4` (Dũng, ở Huế) vừa đăng ký nhưng **chưa đặt đơn nào**. Bảng `Orders` lấy `order_id` làm khóa chính, mà khóa chính không được NULL. Vậy bạn **không thể** lưu Dũng vào hệ thống cho tới khi anh ấy đặt đơn đầu tiên:

```sql
-- Muốn lưu khách C4 nhưng chưa có đơn → buộc phải bịa order_id, product...
INSERT INTO Orders (order_id, cust_id, cust_name, cust_city, product, unit_price, qty)
VALUES (????, 'C4', 'Dũng', 'Hue', NULL, NULL, NULL);  -- gượng ép, sai bản chất
```

Thông tin khách bị **trói buộc vào sự tồn tại của đơn hàng** — đó là insertion anomaly.

### 1.3 Deletion anomaly (bất thường khi xóa)

Khách `C2` (Bình) chỉ có đúng một đơn — dòng 1003. Vì lý do nào đó ta hủy/xóa đơn này:

```sql
DELETE FROM Orders WHERE order_id = 1003;
```

Xóa xong, **toàn bộ thông tin về Bình biến mất khỏi cơ sở dữ liệu** (tên, thành phố). Ta không hề muốn xóa khách, chỉ muốn xóa một đơn — nhưng dữ liệu khách bị "ăn theo". Đó là deletion anomaly.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Sao không chỉ cẩn thận hơn khi sửa là xong?"* — Vì lỗi do con người/code là tất yếu ở quy mô lớn. Chuẩn hóa loại bỏ **khả năng** sai về mặt cấu trúc, không trông cậy vào kỷ luật thủ công.
- *"Lặp dữ liệu (redundancy) chỉ tốn chỗ thôi mà?"* — Không chỉ tốn chỗ. Mỗi bản sao là một cơ hội để hai bản lệch nhau. Redundancy là *gốc rễ* của cả ba anomaly trên.

📝 **Tóm tắt mục 1.** Bảng gộp tất cả lặp dữ liệu → sinh ba anomaly: **update** (sửa sót dòng → mâu thuẫn), **insertion** (không lưu được thực thể chưa có dữ liệu liên quan), **deletion** (xóa một dòng kéo mất thông tin không liên quan). Chuẩn hóa là quy trình tách bảng để diệt tận gốc.

---

## 2. Phụ thuộc hàm (Functional Dependency)

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** Phụ thuộc hàm $X \to Y$ (đọc: "X xác định Y") nghĩa là: nếu hai dòng có cùng giá trị ở (các) cột $X$ thì **bắt buộc** phải có cùng giá trị ở (các) cột $Y$. Nói cách khác, biết $X$ là biết duy nhất $Y$. $X$ gọi là **vế trái / determinant (yếu tố quyết định)**.

**(b) Vì sao cần.** Phụ thuộc hàm là *ngôn ngữ chính xác* để mô tả "cột nào quyết định cột nào". Cả lý thuyết chuẩn hóa xây trên nó: mỗi dạng chuẩn được định nghĩa bằng việc cho phép hay cấm một loại phụ thuộc cụ thể. Không có FD thì "tách bảng" chỉ là cảm tính.

**(c) Ví dụ trực giác bằng số.** Trong bảng `Orders` ở mục 1: hễ `cust_id = 'C1'` thì `cust_name` luôn là "An" và `cust_city` luôn là "Hanoi". Vậy `cust_id → cust_name, cust_city`. Ngược lại `cust_name → cust_id` **không** đúng (có thể hai khách cùng tên "An" nhưng khác id).

### 2.2 Bốn ví dụ phụ thuộc hàm

Dùng bảng `Orders` (và quy ước hợp lý của nghiệp vụ):

1. `cust_id → cust_name` ✓ — mỗi mã khách ứng với đúng một tên. C1→An, C2→Bình, C3→Chi.
2. `product → unit_price` ✓ — giả định mỗi sản phẩm một giá niêm yết. "Bàn phím"→350000 ở cả dòng 1001 và 1003 (nhất quán).
3. `order_id → cust_id, product, qty` ✓ — mã đơn xác định toàn bộ nội dung đơn. 1001→(C1, Bàn phím, 2).
4. `cust_city → cust_id` ✗ — "Hanoi" ứng với cả C1 và C3 → một giá trị X cho hai giá trị Y khác nhau → **không** phải FD.

⚠ **Lỗi thường gặp.** Nhầm chiều mũi tên. `cust_id → cust_name` đúng không có nghĩa `cust_name → cust_id` đúng. FD có hướng; phải kiểm tra "biết X có suy ra duy nhất Y không", không phải ngược lại.

### 2.3 Phụ thuộc bộ phận (partial dependency)

Xét bảng có **khóa chính ghép (composite key)** gồm nhiều cột. Một phụ thuộc bộ phận là khi một cột không-khóa phụ thuộc vào **chỉ một phần** của khóa, chứ không toàn bộ khóa.

Ví dụ bảng `OrderItems(order_id, product, product_name, qty)` với khóa chính = `(order_id, product)`:

- `qty` phụ thuộc cả `(order_id, product)` — cần biết cả hai mới biết số lượng. Đây là phụ thuộc **toàn bộ (full)**.
- `product_name` chỉ phụ thuộc `product` (một phần của khóa). `product → product_name`. Đây là phụ thuộc **bộ phận**.

Walk-through: khóa là `(order_id, product)`. Tên sản phẩm "Bàn phím" được xác định chỉ bởi `product`, lặp lại ở mọi đơn mua bàn phím → redundancy. 2NF sẽ xử lý đúng tình huống này.

### 2.4 Phụ thuộc bắc cầu (transitive dependency)

Khi $X \to Y$ và $Y \to Z$ (với $Y$ không phải khóa), thì $X \to Z$ là phụ thuộc **bắc cầu** — $Z$ phụ thuộc khóa *gián tiếp* qua một cột không-khóa trung gian $Y$.

Ví dụ bảng `Customers(cust_id, cust_city, city_zone)` với `cust_id` là khóa:

- `cust_id → cust_city` (mỗi khách một thành phố).
- `cust_city → city_zone` (mỗi thành phố thuộc một vùng giao hàng, ví dụ "Hanoi"→"Bắc", "HCM"→"Nam").
- Suy ra `cust_id → city_zone` **bắc cầu** qua `cust_city`.

`city_zone` thực ra là thuộc tính của *thành phố*, không phải của *khách*. Lưu nó ở bảng khách → mọi khách cùng thành phố lặp lại zone. 3NF sẽ xử lý.

🔁 **Dừng lại tự kiểm tra.**
1. Trong `Orders`, `product → cust_name` có phải FD không?
2. Phân biệt: phụ thuộc bộ phận cần điều kiện gì về khóa mới xảy ra?

<details><summary>Đáp án</summary>

1. Không. "Bàn phím" được mua bởi cả C1 (An) và C2 (Bình) → một product ứng với nhiều cust_name → không phải FD.
2. Phụ thuộc bộ phận chỉ xảy ra khi khóa là **khóa ghép (≥ 2 cột)**. Với khóa đơn, không có "một phần của khóa" → không có partial dependency, nên bảng khóa đơn ở 1NF đã tự động đạt 2NF.
</details>

📝 **Tóm tắt mục 2.** FD $X \to Y$: cùng X buộc cùng Y, có hướng. **Bộ phận** = phụ thuộc vào một phần khóa ghép. **Bắc cầu** = phụ thuộc gián tiếp qua cột không-khóa. Hai loại này là "thủ phạm" mà 2NF và 3NF nhắm tới.

---

## 3. Các dạng chuẩn (Normal Forms)

Mỗi dạng chuẩn là một điều kiện ngày càng chặt. Bảng đạt 3NF thì đương nhiên đã đạt 2NF và 1NF.

### 3.1 1NF — giá trị nguyên tử (atomic values)

**Định nghĩa.** Một bảng ở **1NF** nếu mọi ô chứa một **giá trị nguyên tử (atomic)** — không phải danh sách, không phải nhóm lặp; và mỗi cột có một kiểu nhất quán.

**Bảng VI PHẠM 1NF** (cột `products` nhồi nhiều giá trị):

| order_id | cust_name | products |
| :---: | --- | --- |
| 1001 | An | Bàn phím, Chuột |
| 1004 | Chi | Màn hình |

Ô `"Bàn phím, Chuột"` là một danh sách → không nguyên tử. Không thể truy vấn `WHERE products = 'Chuột'` đúng đắn, không thể JOIN theo sản phẩm.

**Walk-through tách về 1NF:** mỗi giá trị trong danh sách thành một dòng riêng.

| order_id | cust_name | product |
| :---: | --- | --- |
| 1001 | An | Bàn phím |
| 1001 | An | Chuột |
| 1004 | Chi | Màn hình |

⚠ **Lỗi thường gặp.** Tưởng "lưu JSON `["a","b"]` vào một cột là vẫn nguyên tử vì là 1 chuỗi". Về mặt mô hình quan hệ thuần túy, đó vẫn là nhóm lặp — bạn mất khả năng dùng ràng buộc khóa ngoại và JOIN trên từng phần tử.

### 3.2 2NF — loại phụ thuộc bộ phận

**Định nghĩa.** Bảng ở **2NF** nếu đã ở 1NF *và* mọi thuộc tính không-khóa phụ thuộc **toàn bộ** khóa chính (không có phụ thuộc bộ phận). Chỉ liên quan khi khóa là **khóa ghép**.

**Bảng VI PHẠM 2NF** — `OrderItems` khóa `(order_id, product)`:

| order_id | product | product_name | unit_price | qty |
| :---: | --- | --- | ---: | ---: |
| 1001 | P-KB | Bàn phím | 350000 | 2 |
| 1001 | P-MS | Chuột | 150000 | 1 |
| 1003 | P-KB | Bàn phím | 350000 | 1 |

Phụ thuộc: `(order_id, product) → qty` (full), nhưng `product → product_name, unit_price` (bộ phận — chỉ cần `product`). "Bàn phím / 350000" lặp ở dòng 1001 và 1003.

**Walk-through tách:** tách các cột phụ thuộc-bộ-phận ra một bảng `Products` khóa bởi `product`; giữ lại `qty` (phụ thuộc full) ở bảng quan hệ đơn-sản phẩm.

`Products`:

| product (PK) | product_name | unit_price |
| --- | --- | ---: |
| P-KB | Bàn phím | 350000 |
| P-MS | Chuột | 150000 |

`OrderItems`:

| order_id (PK) | product (PK, FK→Products) | qty |
| :---: | --- | ---: |
| 1001 | P-KB | 2 |
| 1001 | P-MS | 1 |
| 1003 | P-KB | 1 |

Giờ giá "Bàn phím" lưu **một lần**. Đổi giá → sửa một dòng trong `Products`.

### 3.3 3NF — loại phụ thuộc bắc cầu

**Định nghĩa.** Bảng ở **3NF** nếu đã ở 2NF *và* không có thuộc tính không-khóa nào phụ thuộc **bắc cầu** vào khóa (mọi thuộc tính không-khóa phụ thuộc *trực tiếp* vào khóa, không qua trung gian).

**Bảng VI PHẠM 3NF** — `Customers` khóa `cust_id`:

| cust_id (PK) | cust_name | cust_city | city_zone |
| :---: | --- | --- | --- |
| C1 | An | Hanoi | Bắc |
| C2 | Bình | Da Nang | Trung |
| C3 | Chi | Hanoi | Bắc |

Phụ thuộc: `cust_id → cust_city → city_zone`. `city_zone` phụ thuộc khóa **bắc cầu** qua `cust_city`. "Hanoi / Bắc" lặp ở C1 và C3.

**Walk-through tách:** đưa cặp `cust_city → city_zone` ra bảng `Cities` riêng.

`Cities`:

| city (PK) | zone |
| --- | --- |
| Hanoi | Bắc |
| Da Nang | Trung |

`Customers`:

| cust_id (PK) | cust_name | cust_city (FK→Cities) |
| :---: | --- | --- |
| C1 | An | Hanoi |
| C2 | Bình | Da Nang |
| C3 | Chi | Hanoi |

Đổi zone của Hanoi → sửa một dòng trong `Cities`, mọi khách Hà Nội tự động đúng.

### 3.4 BCNF — mọi determinant là super key

💡 **Trực giác.** 3NF vẫn còn một kẽ hở hiếm: khi vế trái của một FD *không phải* là khóa (super key) nhưng cột bên phải lại là *một phần* của một khóa ứng viên khác. BCNF (Boyce-Codd Normal Form) bịt kẽ này: **mọi determinant (vế trái của mọi FD không tầm thường) phải là super key**.

**Bảng VI PHẠM BCNF** — `Enroll(student, subject, teacher)` với quy ước:
- Mỗi `(student, subject)` có một `teacher` → `(student, subject) → teacher`.
- Mỗi `teacher` chỉ dạy **một** `subject` → `teacher → subject`.

Khóa ứng viên: `(student, subject)` và `(student, teacher)`. Bảng này *ở 3NF* (subject là cột khóa, không có phụ thuộc bắc cầu vào cột không-khóa). Nhưng `teacher → subject` có vế trái `teacher` **không phải** super key → vi phạm BCNF.

| student | subject | teacher |
| --- | --- | --- |
| S1 | Toán | Thầy Long |
| S2 | Toán | Thầy Long |
| S3 | Toán | Cô Mai |

"Thầy Long dạy Toán" lặp ở mỗi học sinh học với thầy → update anomaly (đổi môn thầy Long phải sửa nhiều dòng).

**Walk-through tách:** đưa FD vi phạm `teacher → subject` ra bảng riêng.

`Teaches`:

| teacher (PK) | subject |
| --- | --- |
| Thầy Long | Toán |
| Cô Mai | Toán |

`Enroll`:

| student (PK) | teacher (PK, FK→Teaches) |
| --- | --- |
| S1 | Thầy Long |
| S2 | Thầy Long |
| S3 | Cô Mai |

Giờ `teacher → subject` lưu một lần; mọi determinant trong cả hai bảng đều là khóa.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"3NF và BCNF khác nhau nhiều không?"* — Rất hiếm khi. Đa số bảng đạt 3NF cũng đạt BCNF. Khác biệt chỉ xuất hiện khi có **nhiều khóa ứng viên chồng lấn nhau**. Trong thực tế, đạt 3NF là mục tiêu phổ biến nhất.
- *"Có cần lên tới 4NF, 5NF không?"* — Hiếm. Chúng xử lý phụ thuộc đa trị (multivalued) và join — ngoài phạm vi bài này. 3NF/BCNF đã đủ cho gần hết hệ thống thực tế.

🔁 **Dừng lại tự kiểm tra.**
1. Một bảng khóa đơn `Users(id, name, email)` ở 1NF. Nó có cần làm gì để đạt 2NF không?
2. Vì sao bảng `Enroll` ở mục 3.4 vẫn vi phạm BCNF dù đã ở 3NF?

<details><summary>Đáp án</summary>

1. Không cần. Khóa đơn không có "một phần khóa" → không thể có phụ thuộc bộ phận → 1NF khóa đơn tự động đạt 2NF.
2. Vì có FD `teacher → subject` mà `teacher` không phải super key. 3NF tha thứ cho điều này khi `subject` là một cột-khóa (prime attribute); BCNF thì không — đòi mọi determinant là super key.
</details>

📝 **Tóm tắt mục 3.** 1NF: giá trị nguyên tử. 2NF: bỏ phụ thuộc bộ phận (tách phần phụ thuộc nửa-khóa ghép). 3NF: bỏ phụ thuộc bắc cầu (tách cặp `Y→Z` với Y không-khóa). BCNF: mọi determinant là super key (chặt hơn 3NF, khác biệt chỉ ở trường hợp nhiều khóa ứng viên chồng lấn).

---

## 4. Khi nào nên phi chuẩn hóa (Denormalize)?

💡 **Trực giác.** Chuẩn hóa tối ưu cho **ghi đúng** (mỗi dữ kiện một chỗ). Nhưng đọc dữ liệu đã chuẩn hóa thường phải **JOIN nhiều bảng** — tốn công. Phi chuẩn hóa là *cố ý* thêm lại một ít redundancy để đọc nhanh hơn, chấp nhận gánh nặng giữ đồng bộ.

Ví dụ: bảng `Orders` đã chuẩn hóa cần JOIN với `Customers` và `Cities` mỗi lần hiển thị đơn kèm tên khách + vùng. Nếu trang này được mở hàng triệu lần/ngày và dữ liệu khách gần như không đổi, ta có thể **sao một bản `cust_name` vào `Orders`** để khỏi JOIN.

⚠ **Cảnh báo cân nhắc.** Phi chuẩn hóa làm sống lại đúng các anomaly mà chuẩn hóa diệt. Chỉ làm khi:
1. Đã đo được JOIN thực sự là nút thắt hiệu năng (đừng tối ưu non).
2. Dữ liệu sao chép **ít đổi** (tên khách đổi hiếm hơn nhiều so với tạo đơn).
3. Có cơ chế giữ đồng bộ rõ ràng (trigger, hoặc cập nhật ở tầng ứng dụng — xem [Lesson 06 — View, Procedure, Trigger](../lesson-06-view-procedure-trigger/)).

> Mặc định: **chuẩn hóa tới 3NF trước, phi chuẩn hóa sau khi đo** — không phải ngược lại.

📝 **Tóm tắt mục 4.** Denormalize = đánh đổi toàn vẹn lấy tốc độ đọc. Hợp lý khi JOIN là nút thắt thật, dữ liệu sao chép ít đổi, và có cách giữ đồng bộ. Luôn chuẩn hóa trước, denormalize có chủ đích sau.

---

## 5. Liên kết: index trên các bảng đã tách

Sau khi tách, bạn có nhiều bảng nhỏ nối nhau bằng khóa ngoại (`OrderItems.product → Products`, `Customers.cust_city → Cities`). Các JOIN này chạy nhanh khi cột khóa ngoại có **index**. Đó chính là nội dung bài tiếp theo: [Lesson 02 — Index](../lesson-02-index/). Chuẩn hóa tạo ra cấu trúc đúng; index làm cho việc nối các mảnh đó hiệu quả.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **Chuẩn hóa không phải để "đẹp lý thuyết" — nó chống dữ liệu mâu thuẫn. Nhưng production đôi khi cố ý DENORMALIZE để nhanh hơn.** Biết cả hai chiều mới thiết kế đúng.

| Khái niệm | Trong thiết kế schema thật |
|-----------|----------------------------|
| **1NF (không nhóm lặp)** | Không nhét CSV/list vào một cột; tách bảng con |
| **2NF/3NF (bỏ phụ thuộc bộ phận/bắc cầu)** | Tách `order` khỏi `customer_name` → chỉ giữ `customer_id` (FK) |
| **Anomaly (insert/update/delete)** | Vì sao sửa tên khách ở 1 chỗ, không phải 1000 dòng đơn |
| **Denormalization (có chủ đích)** | Lưu sẵn `total_amount`, `comment_count` để khỏi join/đếm mỗi lần đọc |

### 6.1. Ví dụ cụ thể — chuẩn hóa vs denormalize trong thực tế

**Chuẩn hóa (OLTP, ghi nhiều)**: bảng `orders` chỉ lưu `customer_id`, không lưu `customer_name`. Khách đổi tên → sửa **một dòng** ở bảng `customers`, mọi đơn tự đúng. Nếu lưu lặp tên ở mỗi đơn (chưa chuẩn hóa) → đổi tên phải update hàng nghìn dòng, sót một dòng = mâu thuẫn (update anomaly).

**Denormalize (đọc nhiều)**: trang sản phẩm hiển thị "1.234 đánh giá". Đếm `COUNT(*)` mỗi lần tải = chậm. Lưu sẵn cột `review_count`, cập nhật khi có review mới → đọc tức thì. Đánh đổi: phải giữ đồng bộ (trigger hoặc app logic). Đây là trade-off [time-space](../../../Algorithms/lesson-51-complexity-tradeoffs/) ở tầng schema.

> ⚠ **Đừng denormalize sớm.** Mặc định **chuẩn hóa** (3NF) — nó chống bug dữ liệu, đủ nhanh cho hầu hết app. Chỉ denormalize khi đo được bottleneck đọc thật (join/đếm chậm trên đường nóng). Denormalize sớm = gánh chi phí đồng bộ mà chưa cần.

### 6.2. 📝 Tóm tắt mục 6

- Chuẩn hóa (3NF) = mặc định: mỗi sự thật một chỗ → chống insert/update/delete anomaly.
- **Denormalize có chủ đích** (lưu sẵn count/total) khi đọc là bottleneck — đổi tốc độ lấy chi phí đồng bộ.
- Quy tắc: chuẩn hóa trước, denormalize chỉ khi đo được nút thắt đọc thật.

## 7. Bài tập

1. **Xác định FD.** Cho bảng `Shipments(shipment_id, order_id, carrier, carrier_phone, ship_date)`, biết: mỗi shipment thuộc đúng một order; mỗi carrier có một số điện thoại cố định; một order có thể tách nhiều shipment. Liệt kê các phụ thuộc hàm hợp lý và chỉ ra cái nào là bắc cầu.

2. **Bảng đang ở normal form nào?** Bảng `Grades(student_id, course_id, course_name, grade)` với khóa chính `(student_id, course_id)`, biết `course_id → course_name`. Bảng đang ở dạng chuẩn cao nhất nào? Vì sao chưa lên được mức kế tiếp?

3. **Tách về 3NF.** Cho bảng phi chuẩn `Books(book_id, title, author_id, author_name, author_country)` khóa `book_id`, với `author_id → author_name, author_country`. Tách về 3NF, ghi rõ các bảng kết quả kèm khóa chính/khóa ngoại.

4. **Tìm vi phạm BCNF.** Cho `Booking(room, time_slot, guest)` với quy ước: một `(room, time_slot)` có đúng một `guest`; một `guest` tại một thời điểm chỉ ở một phòng (`(guest, time_slot) → room`). Chỉ ra các khóa ứng viên, xác định bảng có vi phạm BCNF không, nếu có thì tách.

---

## 8. Lời giải chi tiết

### Bài 1 — Xác định FD

Các phụ thuộc hàm hợp lý:

- `shipment_id → order_id, carrier, ship_date` — mã shipment xác định toàn bộ dòng (khóa chính).
- `carrier → carrier_phone` — mỗi nhà vận chuyển một số điện thoại cố định.
- Suy ra `shipment_id → carrier → carrier_phone` là **phụ thuộc bắc cầu**: `carrier_phone` phụ thuộc khóa `shipment_id` *gián tiếp* qua cột không-khóa `carrier`.

Để đạt 3NF, tách `carrier → carrier_phone` ra bảng `Carriers(carrier PK, carrier_phone)`, bảng `Shipments` giữ `carrier` làm khóa ngoại.

### Bài 2 — Bảng đang ở normal form nào?

- Khóa chính ghép `(student_id, course_id)`. Mọi ô nguyên tử → đạt **1NF**.
- Có `course_id → course_name`: `course_name` phụ thuộc **chỉ một phần** của khóa (`course_id`) → **phụ thuộc bộ phận** → **vi phạm 2NF**.
- Vậy dạng chuẩn cao nhất hiện tại là **1NF**. Chưa lên 2NF được vì còn phụ thuộc bộ phận `course_id → course_name`.
- Cách lên 2NF: tách `Courses(course_id PK, course_name)`, bảng `Grades(student_id, course_id, grade)` với `course_id` là FK.

### Bài 3 — Tách về 3NF

Bảng gốc có `author_id → author_name, author_country` trong khi khóa là `book_id` → `author_name, author_country` phụ thuộc khóa **bắc cầu** qua `author_id` → vi phạm 3NF.

Tách thành hai bảng:

`Authors`:

| author_id (PK) | author_name | author_country |
| --- | --- | --- |

`Books`:

| book_id (PK) | title | author_id (FK→Authors) |
| --- | --- | --- |

Giờ mỗi tác giả (tên + quốc gia) lưu một lần; `Books` chỉ tham chiếu qua `author_id`. Mọi thuộc tính không-khóa của cả hai bảng phụ thuộc trực tiếp khóa → đạt 3NF.

### Bài 4 — Tìm vi phạm BCNF

FD đề cho:
- `(room, time_slot) → guest`
- `(guest, time_slot) → room`

Khóa ứng viên: cả `(room, time_slot)` lẫn `(guest, time_slot)` đều xác định toàn bộ → **hai khóa ứng viên** chồng lấn ở `time_slot`.

Kiểm tra BCNF: xét vế trái mỗi FD. `(room, time_slot)` là super key ✓; `(guest, time_slot)` là super key ✓. **Mọi determinant đều là super key → bảng đã ở BCNF**, không cần tách.

> Đây là ví dụ kinh điển cho thấy: có nhiều khóa ứng viên chồng lấn **chưa chắc** vi phạm BCNF — chỉ vi phạm khi tồn tại một determinant *không* phải super key (như `teacher → subject` ở mục 3.4). Đối chiếu hai ví dụ để thấy ranh giới.

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm ba mô-đun: (1) mô phỏng update/deletion anomaly trên bảng phi chuẩn, (2) tách bảng 1NF→2NF→3NF từng bước với highlight cột chuyển đi, (3) bộ kiểm tra "bảng này đang ở normal form nào".

---

## Bài tiếp theo

→ [Lesson 02 — Index](../lesson-02-index/): vì sao thêm index làm JOIN và truy vấn nhanh hơn, cấu trúc B-tree, và cái giá phải trả khi ghi.
