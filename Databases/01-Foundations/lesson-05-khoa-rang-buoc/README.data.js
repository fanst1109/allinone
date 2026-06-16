// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/01-Foundations/lesson-05-khoa-rang-buoc/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Khóa & ràng buộc (keys & constraints)

> Nhóm 1 — Nền tảng · Bài thứ năm của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được các loại khóa: **super key**, **candidate key (khóa dự tuyển)**, **primary key (khóa chính)**, **alternate key (khóa thay thế)**, **composite key (khóa nhiều cột)** — và biết *vì sao* chọn cột này làm khóa chính chứ không phải cột khác.
- Hiểu **foreign key (khóa ngoại)** và **toàn vẹn tham chiếu (referential integrity)**: vì sao không thể chèn một đơn hàng trỏ tới khách hàng không tồn tại.
- Biết bốn hành vi khi xóa/sửa bản ghi được tham chiếu: \`CASCADE\`, \`SET NULL\`, \`RESTRICT\`, \`NO ACTION\`.
- Sử dụng đúng các ràng buộc cột: \`NOT NULL\`, \`UNIQUE\`, \`CHECK\`, \`DEFAULT\` — và phân biệt \`UNIQUE\` với \`PRIMARY KEY\`.
- Cân nhắc đánh đổi giữa **surrogate key (khóa nhân tạo)** và **natural key (khóa tự nhiên)**.
- Viết được một câu \`CREATE TABLE\` hoàn chỉnh với đầy đủ ràng buộc.

## Kiến thức tiền đề

- [Lesson 02 — Mô hình quan hệ](../lesson-02-mo-hinh-quan-he/): table, row, column, NULL — khóa được định nghĩa trên các cột của bảng.
- [Lesson 03 — SQL cơ bản](../lesson-03-sql-co-ban/): \`CREATE TABLE\`, \`INSERT\`, \`DELETE\` — ta sẽ khai báo ràng buộc bằng các câu lệnh này.

---

## 1. Đặt vấn đề: dữ liệu "trông đúng" nhưng vẫn sai

Giả sử bạn có hai bảng:

\`\`\`
students(id, email, phone, name)
orders(id, customer_id, total)
\`\`\`

Không có ràng buộc nào, database vẫn vui vẻ nhận:

- Hai sinh viên cùng \`id = 7\` → sau này \`WHERE id = 7\` trả về 2 dòng, không biết ai là ai.
- Một đơn hàng \`orders\` có \`customer_id = 999\` trong khi **không tồn tại** khách hàng số 999 → đơn hàng "mồ côi".
- Một sản phẩm có \`price = -50000\` → bán ra là lỗ.

Mỗi dòng dữ liệu *trông* hợp lệ, nhưng tập dữ liệu lại **mâu thuẫn nội tại**. Ràng buộc (constraint) là cách ta khai báo cho DBMS: "dữ liệu nào là *không được phép tồn tại*" — và DBMS sẽ **từ chối ngay lúc ghi**, thay vì để ứng dụng tự kiểm tra (và quên kiểm tra).

💡 **Trực giác.** Ràng buộc giống **luật ra vào của một tòa nhà**: thay vì hy vọng mọi người tự giác, bạn đặt cửa từ + thẻ ở cổng. Ai không đủ điều kiện thì *không vào được*, bất kể họ đến từ đâu (ứng dụng web, script, hay người gõ SQL tay). Database là *người gác cổng cuối cùng* — đặt luật ở đây thì không lối nào lách được.

---

## 2. Các loại khóa

Ta dùng một bảng cụ thể xuyên suốt mục này:

\`\`\`
students
┌────┬──────────────────┬────────────┬───────┐
│ id │ email            │ phone      │ name  │
├────┼──────────────────┼────────────┼───────┤
│ 1  │ an@uni.edu       │ 0901111111 │ An    │
│ 2  │ binh@uni.edu     │ 0902222222 │ Binh  │
│ 3  │ chi@uni.edu      │ 0903333333 │ Chi   │
└────┴──────────────────┴────────────┴───────┘
\`\`\`

Giả thiết nghiệp vụ: **mỗi sinh viên có một \`id\` riêng, một \`email\` riêng, một \`phone\` riêng** — ba cột này đều không trùng nhau giữa các sinh viên. \`name\` thì có thể trùng (hai bạn cùng tên "An").

### 2.1 Super key (siêu khóa)

**(a) Là gì.** Một **super key** là *bất kỳ tập cột nào* mà giá trị của nó **xác định duy nhất** một dòng — không có hai dòng nào trùng nhau trên tập cột đó.

**(b) Vì sao tồn tại.** Đây là khái niệm rộng nhất, làm nền cho các loại khóa khác. Mọi loại khóa "hẹp hơn" đều là super key có thêm điều kiện.

**(c) Ví dụ (≥4) trên bảng \`students\`:**

1. \`{id}\` — đủ để phân biệt mọi dòng → super key.
2. \`{email}\` — cũng duy nhất → super key.
3. \`{id, name}\` — đã có \`id\` duy nhất rồi, thêm \`name\` vẫn duy nhất → **vẫn là super key** (nhưng *thừa*).
4. \`{id, email, phone, name}\` — cả bảng → super key (thừa nặng).
5. \`{name}\` — **KHÔNG** phải super key, vì hai sinh viên có thể cùng tên.

### 2.2 Candidate key (khóa dự tuyển)

**(a) Là gì.** Một **candidate key** là super key **tối thiểu** — bỏ đi bất kỳ cột nào thì *không còn* duy nhất nữa. Không thừa cột.

**(b) Vì sao tồn tại.** Trong vô số super key (thường có thể thêm cột thừa thoải mái), ta chỉ quan tâm những cái "gọn nhất" — đó là các ứng viên để làm khóa chính.

**(c) Ví dụ (≥4) trên bảng \`students\`:**

1. \`{id}\` — tối thiểu (1 cột, bỏ đi thì rỗng) → candidate key.
2. \`{email}\` — tối thiểu, duy nhất → candidate key.
3. \`{phone}\` — tối thiểu, duy nhất → candidate key.
4. \`{id, name}\` — **KHÔNG** phải candidate key: bỏ \`name\` đi vẫn còn \`{id}\` duy nhất → có cột thừa → chỉ là super key.
5. \`{email, phone}\` — **KHÔNG** phải candidate key: bỏ \`phone\` còn \`{email}\` vẫn duy nhất → thừa.

Vậy bảng \`students\` có **ba** candidate key: \`{id}\`, \`{email}\`, \`{phone}\`.

⚠ **Lỗi thường gặp.** Nhầm "duy nhất" với "tối thiểu". \`{id, name}\` *duy nhất* nhưng *không tối thiểu* → không phải candidate key. Kiểm tra tính tối thiểu: thử bỏ từng cột, nếu vẫn duy nhất thì cột đó thừa.

### 2.3 Primary key (khóa chính)

**(a) Là gì.** **Primary key** là *một* candidate key mà ta **chọn** làm định danh chính thức cho bảng. Mỗi bảng có **đúng một** primary key. Primary key tự động kéo theo hai ràng buộc: **\`NOT NULL\`** (không được rỗng) và **\`UNIQUE\`** (không trùng).

**(b) Vì sao cần.** Database cần một cách thống nhất để các bảng khác *tham chiếu* tới dòng này (qua foreign key), và để index chính được xây trên đó. Nhiều candidate key thì phải chọn ra một làm "đại diện".

**(c) Chọn primary key cho \`students\`.** Có 3 ứng viên \`{id}\`, \`{email}\`, \`{phone}\`. Ta nên chọn **\`id\`**, vì:

- \`email\`/\`phone\` có thể *đổi* (sinh viên đổi số điện thoại) → nếu dùng làm khóa chính, mọi bảng tham chiếu phải cập nhật theo → rất phiền.
- \`id\` là số nguyên ngắn, so sánh/index nhanh hơn chuỗi email dài.
- \`id\` không mang ý nghĩa nghiệp vụ → không bao giờ phải đổi vì lý do nghiệp vụ.

\`email\` và \`phone\` còn lại trở thành **alternate key**.

### 2.4 Alternate key (khóa thay thế)

**(a) Là gì.** Các candidate key **không** được chọn làm primary key gọi là **alternate key**. Chúng vẫn duy nhất, nên ta thường khai báo \`UNIQUE\` cho chúng.

**(c) Ví dụ.** Sau khi chọn \`id\` làm primary key, \`email\` và \`phone\` là alternate key → khai báo \`email UNIQUE\`, \`phone UNIQUE\` để DBMS vẫn cấm trùng.

### 2.5 Composite key (khóa nhiều cột)

**(a) Là gì.** Một **composite key** là khóa gồm **từ hai cột trở lên**, khi không có cột đơn nào đủ để định danh.

**(b) Vì sao cần.** Nhiều bảng quan hệ nhiều-nhiều không có cột đơn duy nhất. Ví dụ bảng ghi danh:

\`\`\`
enrollments(student_id, course_id, grade)
\`\`\`

Một sinh viên học nhiều môn, một môn có nhiều sinh viên. \`student_id\` đơn → trùng (học nhiều môn). \`course_id\` đơn → trùng. Nhưng **cặp** \`{student_id, course_id}\` thì duy nhất (mỗi sinh viên ghi danh một môn đúng một lần) → đó là composite primary key.

**(c) Ví dụ (≥4) các bảng cần composite key:**

1. \`enrollments\` → \`{student_id, course_id}\`.
2. \`order_items(order_id, product_id, qty)\` → \`{order_id, product_id}\` (mỗi sản phẩm xuất hiện một lần trong một đơn).
3. \`seat_booking(flight_id, seat_no, passenger)\` → \`{flight_id, seat_no}\` (một ghế trên một chuyến chỉ đặt một lần).
4. \`friendship(user_a, user_b)\` → \`{user_a, user_b}\`.

🔁 **Dừng lại tự kiểm tra.**
1. Cho bảng \`students(id, email, phone, name)\`, \`{email, name}\` thuộc loại khóa nào?
2. Vì sao mỗi bảng chỉ có một primary key nhưng có thể có nhiều candidate key?

<details><summary>Đáp án</summary>

1. \`{email, name}\` là **super key** (duy nhất vì \`email\` đã duy nhất) nhưng **không** phải candidate key (bỏ \`name\` còn \`{email}\` vẫn duy nhất → thừa cột).
2. Candidate key là *mọi* super key tối thiểu — bảng có thể có nhiều cột riêng biệt cùng duy nhất (\`id\`, \`email\`, \`phone\`). Primary key là cái ta *chọn* ra một trong số đó để làm định danh chính thức, nên chỉ có một.
</details>

📝 **Tóm tắt mục 2.** Super key = duy nhất (có thể thừa). Candidate key = duy nhất + tối thiểu. Primary key = candidate key được chọn (tự \`NOT NULL\` + \`UNIQUE\`). Alternate key = candidate key không được chọn. Composite key = khóa nhiều cột khi không có cột đơn nào đủ.

---

## 3. Foreign key & toàn vẹn tham chiếu

### 3.1 Định nghĩa

**(a) Là gì.** **Foreign key (khóa ngoại)** là một (hoặc nhiều) cột ở bảng A mà giá trị của nó **phải khớp** với một primary key (hoặc khóa duy nhất) đang tồn tại ở bảng B. Đó là cách hai bảng "nối" với nhau.

**(b) Vì sao cần — toàn vẹn tham chiếu.** Nếu không có foreign key, một đơn hàng có thể trỏ tới khách hàng "ma". **Referential integrity (toàn vẹn tham chiếu)** là quy tắc: *mọi giá trị khóa ngoại phải trỏ tới một dòng thật đang tồn tại, hoặc là NULL*.

**(c) Ví dụ.** Hai bảng:

\`\`\`
customers(id PK, name)            orders(id PK, customer_id FK → customers.id, total)
┌────┬──────┐                     ┌────┬─────────────┬───────┐
│ id │ name │                     │ id │ customer_id │ total │
├────┼──────┤                     ├────┼─────────────┼───────┤
│ 1  │ An   │                     │ 10 │ 1           │ 500   │
│ 2  │ Binh │                     │ 11 │ 2           │ 300   │
└────┴──────┘                     │ 12 │ 1           │ 700   │
                                  └────┴─────────────┴───────┘
\`\`\`

\`orders.customer_id\` là foreign key trỏ tới \`customers.id\`. Mọi \`customer_id\` trong \`orders\` (1, 2, 1) đều có mặt trong \`customers.id\` → hợp lệ.

### 3.2 Walk-through: chèn một đơn hàng vi phạm

Thử chạy:

\`\`\`sql
INSERT INTO orders (id, customer_id, total) VALUES (13, 999, 200);
\`\`\`

DBMS xử lý từng bước:

1. Nhận lệnh INSERT, thấy \`customer_id = 999\`.
2. \`orders.customer_id\` có ràng buộc \`FOREIGN KEY ... REFERENCES customers(id)\` → kiểm tra: *có dòng nào trong \`customers\` mà \`id = 999\` không?*
3. Quét (qua index trên \`customers.id\`): \`customers\` chỉ có \`id\` ∈ {1, 2}. Không có 999.
4. → **Vi phạm toàn vẹn tham chiếu** → DBMS **từ chối**, trả lỗi kiểu:
   \`\`\`
   ERROR: insert or update on table "orders" violates foreign key constraint
   DETAIL: Key (customer_id)=(999) is not present in table "customers".
   \`\`\`
5. Dòng không được ghi. Database vẫn nhất quán.

Ngược lại, \`INSERT INTO orders VALUES (13, 2, 200);\` — \`customer_id = 2\` *có* trong \`customers\` → **chấp nhận**.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Foreign key có được NULL không?"* — Được, *nếu* cột đó không khai báo \`NOT NULL\`. NULL nghĩa là "chưa trỏ tới ai" — không vi phạm toàn vẹn tham chiếu (ví dụ: một đơn hàng khách vãng lai chưa gắn tài khoản).
- *"Bảng B (customers) có cần index trên id không?"* — Có, và primary key đã tạo sẵn index → việc kiểm tra "id = 999 có tồn tại không" rất nhanh.
- *"Foreign key có nhất thiết trỏ tới primary key?"* — Thường là vậy, nhưng đúng ra nó trỏ tới *bất kỳ cột nào có ràng buộc \`UNIQUE\`* (gồm cả primary key).

---

## 4. Hành vi ON DELETE / ON UPDATE

Câu hỏi: nếu **xóa** \`customers.id = 1\` trong khi vẫn còn \`orders\` trỏ tới khách số 1 (đơn 10 và 12), thì sao? Bốn lựa chọn khai báo kèm foreign key:

| Hành vi | Khi xóa customer #1 (còn order 10, 12 trỏ tới) | Khi nào dùng |
| --- | --- | --- |
| \`RESTRICT\` / \`NO ACTION\` | **Từ chối xóa**, báo lỗi — còn đơn hàng tham chiếu | Mặc định an toàn: không cho xóa "cha" khi còn "con" |
| \`CASCADE\` | Xóa luôn các đơn 10, 12 theo | Khi "con" không có ý nghĩa nếu "cha" mất (vd dòng \`order_items\` khi xóa \`orders\`) |
| \`SET NULL\` | Đặt \`orders.customer_id = NULL\` ở đơn 10, 12 | Khi đơn hàng vẫn cần giữ lịch sử, chỉ là "không còn gắn khách" |

> \`RESTRICT\` và \`NO ACTION\` gần như giống nhau trong thực hành; khác biệt tinh tế là *thời điểm* kiểm tra trong transaction (\`NO ACTION\` cho phép hoãn kiểm tra tới cuối câu lệnh). Coi như đều nghĩa là "cấm".

**Walk-through CASCADE.** Bảng:

\`\`\`
customers: {1:An, 2:Binh}    orders: {10→1, 11→2, 12→1}
\`\`\`

Chạy \`DELETE FROM customers WHERE id = 1;\` với foreign key khai \`ON DELETE CASCADE\`:

1. Xóa dòng \`customers.id = 1\`.
2. CASCADE: tìm mọi \`orders\` có \`customer_id = 1\` → đơn 10 và 12.
3. Xóa luôn đơn 10 và 12.
4. Kết quả: \`customers: {2:Binh}\`, \`orders: {11→2}\`. Vẫn nhất quán, không còn đơn mồ côi.

Cùng tình huống với \`ON DELETE SET NULL\`:

1. Xóa \`customers.id = 1\`.
2. Đặt \`customer_id = NULL\` cho đơn 10, 12.
3. Kết quả: \`orders: {10→NULL, 11→2, 12→NULL}\`. Đơn vẫn còn (giữ lịch sử doanh thu) nhưng không trỏ ai.

Với \`ON DELETE RESTRICT\`: bước 1 đã **thất bại** — DBMS từ chối xóa customer #1 vì còn đơn 10, 12. Muốn xóa thì phải xử lý các đơn trước.

⚠ **Lỗi thường gặp.** Đặt \`CASCADE\` bừa bãi → một lệnh \`DELETE\` nhỏ vô tình quét sạch hàng nghìn dòng phụ thuộc theo dây chuyền. \`CASCADE\` chỉ nên dùng khi "con" thực sự *thuộc về* "cha" về mặt nghiệp vụ (composition). Còn lại nên để \`RESTRICT\` cho an toàn.

\`ON UPDATE\` tương tự nhưng kích hoạt khi giá trị khóa được tham chiếu *thay đổi* (vd đổi \`customers.id\`). Đây là một lý do nữa để primary key dùng giá trị *không bao giờ đổi* (\`id\` nhân tạo) → khi đó \`ON UPDATE\` gần như không bao giờ chạy.

🔁 **Dừng lại tự kiểm tra.**
1. Bảng \`order_items\` trỏ tới \`orders\`. Khi xóa một đơn hàng, các dòng \`order_items\` của nó nên xử lý thế nào, dùng hành vi gì?
2. Vì sao \`SET NULL\` đòi hỏi cột khóa ngoại *không* được khai \`NOT NULL\`?

<details><summary>Đáp án</summary>

1. \`ON DELETE CASCADE\` — một \`order_item\` không có ý nghĩa nếu đơn hàng cha bị xóa; nó *thuộc về* đơn hàng đó.
2. \`SET NULL\` cần ghi \`NULL\` vào cột khóa ngoại. Nếu cột đó \`NOT NULL\` thì việc ghi NULL lại vi phạm ràng buộc khác → mâu thuẫn, DBMS sẽ báo lỗi khi tạo bảng.
</details>

📝 **Tóm tắt mục 4.** \`RESTRICT/NO ACTION\` cấm xóa cha khi còn con (an toàn, mặc định). \`CASCADE\` xóa con theo (chỉ khi con thuộc về cha). \`SET NULL\` giữ con nhưng bỏ liên kết (cột phải cho NULL).

---

## 5. Các ràng buộc khác: NOT NULL, UNIQUE, CHECK, DEFAULT

### 5.1 NOT NULL

**(a) Là gì.** Cấm cột chứa giá trị NULL ("không có giá trị").

**(c) Ví dụ (≥4):**

1. \`name VARCHAR(100) NOT NULL\` — sinh viên phải có tên.
2. \`email VARCHAR NOT NULL\` — không cho thiếu email.
3. \`created_at TIMESTAMP NOT NULL\` — bắt buộc có thời điểm tạo.
4. \`customer_id INT\` (KHÔNG \`NOT NULL\`) — đơn khách vãng lai được phép để trống.

### 5.2 UNIQUE — và khác PRIMARY KEY thế nào

**(a) Là gì.** \`UNIQUE\` cấm hai dòng trùng giá trị trên cột (hoặc nhóm cột), **nhưng cho phép NULL** (và trong nhiều DBMS, cho phép *nhiều* NULL — vì NULL ≠ NULL).

**(b) Khác primary key:**

| | PRIMARY KEY | UNIQUE |
| --- | --- | --- |
| Số lượng mỗi bảng | Đúng 1 | Nhiều cũng được |
| Cho phép NULL | Không (tự \`NOT NULL\`) | Có (thường nhiều NULL) |
| Vai trò | Định danh chính, đích của foreign key | Đảm bảo không trùng cho alternate key |

**(c) Ví dụ (≥4):**

1. \`email VARCHAR UNIQUE\` — không hai sinh viên cùng email; nhưng nếu \`email\` cho NULL thì nhiều dòng có thể cùng NULL.
2. \`phone VARCHAR UNIQUE\` — alternate key.
3. \`UNIQUE(student_id, course_id)\` — composite unique: cấm ghi danh trùng.
4. \`tax_code VARCHAR UNIQUE\` — mã số thuế duy nhất nhưng có thể chưa khai (NULL).

⚠ **Lỗi thường gặp.** Tưởng \`UNIQUE\` cấm cả NULL như primary key. Thực tế: trong PostgreSQL/SQLite/MySQL, một cột \`UNIQUE\` cho-NULL có thể chứa *nhiều* dòng NULL — vì hai NULL không được coi là "bằng nhau". Muốn cấm NULL phải thêm \`NOT NULL\`.

### 5.3 CHECK

**(a) Là gì.** \`CHECK (điều_kiện)\` cấm ghi dòng nếu điều kiện sai. Là cách diễn đạt quy tắc nghiệp vụ ngay trong schema.

**(c) Walk-through + ví dụ (≥4):**

1. \`price NUMERIC CHECK (price >= 0)\` — giá không âm. \`INSERT ... price = -50000\` → điều kiện \`-50000 >= 0\` là **false** → từ chối.
2. \`age INT CHECK (age BETWEEN 0 AND 150)\` — tuổi hợp lý.
3. \`discount NUMERIC CHECK (discount >= 0 AND discount <= 1)\` — chiết khấu 0–100%.
4. \`status VARCHAR CHECK (status IN ('new','paid','shipped','cancelled'))\` — chỉ nhận các trạng thái hợp lệ (kiểu enum giả lập).

### 5.4 DEFAULT

**(a) Là gì.** \`DEFAULT giá_trị\` đặt giá trị mặc định khi INSERT không nêu cột đó.

**(c) Ví dụ (≥4):**

1. \`status VARCHAR DEFAULT 'new'\` — đơn mới mặc định "new".
2. \`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\` — tự lấy thời điểm hiện tại.
3. \`is_active BOOLEAN DEFAULT TRUE\`.
4. \`qty INT DEFAULT 1\`.

📝 **Tóm tắt mục 5.** \`NOT NULL\` cấm rỗng. \`UNIQUE\` cấm trùng nhưng cho NULL (khác primary key). \`CHECK\` ép quy tắc nghiệp vụ (giá ≥ 0…). \`DEFAULT\` điền sẵn khi không nêu.

---

## 6. Surrogate key vs natural key

💡 **Trực giác.** **Natural key (khóa tự nhiên)** dùng dữ liệu *vốn có ý nghĩa* (email, số CMND, mã số thuế) làm khóa. **Surrogate key (khóa nhân tạo)** là một số tự sinh (\`id\` tăng dần, hoặc UUID) *không mang ý nghĩa nghiệp vụ*, chỉ để định danh.

| | Natural key | Surrogate key |
| --- | --- | --- |
| Ví dụ | \`email\`, số CMND, mã ISBN | \`id SERIAL\`, UUID |
| Có ý nghĩa nghiệp vụ | Có | Không |
| Có thể đổi? | Có (đổi email, đổi CMND) → phiền | Không bao giờ |
| Kích thước/tốc độ | Thường dài (chuỗi) | Ngắn (số nguyên) → index nhanh |
| Lộ thông tin? | Có thể (đoán được) | Không |

**Đánh đổi.** Surrogate key được dùng *mặc định* trong phần lớn thiết kế vì ổn định và nhanh. Nhưng nó *không tự đảm bảo không trùng* về mặt nghiệp vụ — bạn vẫn nên đặt \`UNIQUE\` cho natural key (email) song song, nếu không hai dòng có \`id\` khác nhau nhưng cùng email vẫn lọt.

Ví dụ kết hợp tốt:

\`\`\`sql
id    SERIAL PRIMARY KEY,   -- surrogate: định danh ổn định
email VARCHAR UNIQUE NOT NULL  -- natural: vẫn cấm trùng email
\`\`\`

❓ *"Vậy dùng email làm primary key luôn cho gọn được không?"* — Được về mặt kỹ thuật, nhưng nếu sinh viên đổi email, mọi bảng \`orders\`, \`enrollments\`… trỏ tới email cũ phải cập nhật theo (\`ON UPDATE CASCADE\`) → rủi ro và chậm. Surrogate \`id\` không đổi → an toàn hơn.

---

## 7. CREATE TABLE đầy đủ ràng buộc

Gộp tất cả lại thành hai bảng hoàn chỉnh:

\`\`\`sql
CREATE TABLE customers (
    id       SERIAL      PRIMARY KEY,           -- surrogate key, tự NOT NULL + UNIQUE
    email    VARCHAR(255) UNIQUE NOT NULL,       -- alternate/natural key
    phone    VARCHAR(20)  UNIQUE,                -- alternate key, cho phép NULL
    name     VARCHAR(100) NOT NULL,
    created_at TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id          SERIAL    PRIMARY KEY,
    customer_id INT,                              -- FK, cho NULL (khách vãng lai)
    total       NUMERIC(12,2) NOT NULL CHECK (total >= 0),
    status      VARCHAR(20)   NOT NULL DEFAULT 'new'
                CHECK (status IN ('new','paid','shipped','cancelled')),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE SET NULL          -- xóa khách: giữ đơn, bỏ liên kết
        ON UPDATE CASCADE
);

-- Bảng nối nhiều-nhiều với composite primary key:
CREATE TABLE order_items (
    order_id   INT NOT NULL,
    product_id INT NOT NULL,
    qty        INT NOT NULL CHECK (qty > 0),
    PRIMARY KEY (order_id, product_id),           -- composite key
    FOREIGN KEY (order_id)  REFERENCES orders(id) ON DELETE CASCADE
    -- xóa đơn: xóa luôn các dòng hàng (chúng thuộc về đơn)
);
\`\`\`

Đọc lại từng ràng buộc: \`customers.id\` là primary key (surrogate); \`email\`/\`phone\` là alternate key (\`UNIQUE\`); \`orders.customer_id\` là foreign key với \`ON DELETE SET NULL\`; \`total\` và \`qty\` có \`CHECK\`; \`status\` có \`DEFAULT\` + \`CHECK\` kiểu enum; \`order_items\` dùng composite primary key và \`CASCADE\`.

---

## 8. Liên kết với các bài khác

- **Chuẩn hóa (normalization)** dựa trên *phụ thuộc hàm (functional dependency)* và *khóa* — candidate key chính là nền của 2NF/3NF/BCNF. Học tiếp: [Nhóm 2 — Lesson 01: Chuẩn hóa](../../02-Intermediate/lesson-01-chuan-hoa/).
- **Thiết kế ER (Entity-Relationship)** dùng khóa để biểu diễn và nối thực thể; foreign key chính là cách hiện thực một quan hệ trên bảng. Học tiếp: [Lesson 06 — Thiết kế ER](../lesson-06-thiet-ke-er/).
- Index trên khóa giúp việc kiểm tra \`UNIQUE\`/foreign key nhanh: [Nhóm 2 — Lesson 02: Index](../../02-Intermediate/lesson-02-index/).

---

## 9. Ứng dụng thực tế trong phần mềm

> 💡 **Ràng buộc (constraint) là "lớp phòng thủ cuối cùng" cho dữ liệu — nó đúng kể cả khi code app có bug.** Đây là quyết định kiến trúc thật: validate ở DB, ở app, hay cả hai.

| Ràng buộc | Chặn lỗi thật gì |
|-----------|------------------|
| **PRIMARY KEY / UNIQUE** | Hai user trùng email, đặt đơn trùng (idempotency) |
| **FOREIGN KEY** | Đơn hàng trỏ tới user đã bị xóa (orphan record) |
| **NOT NULL / CHECK** | \`balance < 0\`, \`status\` ngoài tập cho phép, field bắt buộc bị bỏ trống |
| **ON DELETE CASCADE/RESTRICT** | Xóa user → xóa luôn đơn (cascade) hoặc cấm xóa (restrict) |
| **DEFAULT** | \`created_at\`, \`status='pending'\` tự điền |

### 9.1. Ví dụ cụ thể — vì sao validate ở DB chứ không chỉ ở app

App của bạn check "email không trùng" trong code. Nhưng: (1) hai request đến **đồng thời** cùng vượt qua check rồi cùng insert → trùng; (2) một service khác / script migration ghi thẳng vào DB, bỏ qua code app. **UNIQUE constraint** ở DB chặn cả hai — nó là chân lý duy nhất, không phụ thuộc app nào ghi. Đây là nguyên tắc "DB là người gác cổng cuối": app validate để UX tốt (báo lỗi sớm), DB constraint để **đảm bảo** (không bao giờ sai).

> ⚠ **Bẫy production — quên FK gây "orphan record".** Xóa user mà không có FK ON DELETE → các đơn hàng của user đó trỏ tới id không còn tồn tại → app crash khi join, báo cáo sai. FK với \`ON DELETE RESTRICT\` (cấm xóa nếu còn đơn) hoặc \`CASCADE\` (xóa kèm) giữ toàn vẹn tham chiếu. Nhiều bug "dữ liệu ma" đến từ thiếu FK.

### 9.2. Surrogate vs natural key trong thực tế (§6)

Hầu hết hệ thống dùng **surrogate key** (\`id\` auto-increment hoặc UUID) làm PK, kể cả khi có natural key (email, CMND). Lý do: natural key có thể **đổi** (đổi email) → vỡ mọi FK trỏ tới; surrogate ổn định mãi mãi. UUID còn cho phép sinh id ở client/nhiều server không đụng nhau (hữu ích khi [sharding](../../03-Advanced/lesson-03-replication-sharding/)).

### 9.3. 📝 Tóm tắt mục 9

- Constraint = lớp phòng thủ cuối, đúng kể cả khi code app có bug: **UNIQUE** (chống trùng/race), **FK** (chống orphan), **CHECK/NOT NULL** (chống dữ liệu rác).
- Validate ở app (UX) **và** DB (đảm bảo) — DB là chân lý cuối vì nhiều nguồn ghi.
- Production thường dùng **surrogate key** (id/UUID) vì natural key có thể đổi → vỡ FK.

## 10. Bài tập

1. **Xác định candidate key.** Cho bảng \`employees(emp_id, ssn, email, dept_id, name)\`, biết: \`emp_id\` duy nhất, \`ssn\` (số an sinh xã hội) duy nhất, \`email\` duy nhất, \`dept_id\` *không* duy nhất (nhiều người cùng phòng), \`name\` không duy nhất. Liệt kê tất cả candidate key. Cho một ví dụ super key *không* phải candidate key. Bạn chọn cột nào làm primary key, vì sao?

2. **Viết ràng buộc phù hợp.** Viết câu \`CREATE TABLE products\` với các quy tắc: \`id\` là khóa chính tự sinh; \`sku\` (mã hàng) duy nhất và bắt buộc; \`name\` bắt buộc; \`price\` không âm; \`stock\` (tồn kho) không âm, mặc định 0; \`category\` chỉ nhận \`'food'\`, \`'drink'\`, \`'other'\`, mặc định \`'other'\`.

3. **Dự đoán kết quả khi vi phạm FK.** Cho \`customers(id PK)\` chứa id ∈ {1,2,3} và \`orders(id PK, customer_id FK→customers.id)\` chứa các đơn \`(10→1), (11→3)\`. Với mỗi lệnh, nói rõ DBMS chấp nhận hay từ chối, và vì sao:
   - (a) \`INSERT INTO orders VALUES (12, 2, 0);\`
   - (b) \`INSERT INTO orders VALUES (13, 5, 0);\`
   - (c) \`INSERT INTO orders VALUES (14, NULL, 0);\` (cột \`customer_id\` cho phép NULL)
   - (d) \`DELETE FROM customers WHERE id = 1;\` (foreign key khai \`ON DELETE RESTRICT\`)

4. **Chọn ON DELETE.** Với mỗi cặp quan hệ, chọn \`CASCADE\`, \`SET NULL\`, hay \`RESTRICT\` và giải thích một câu:
   - (a) \`comments.post_id → posts.id\` (bình luận thuộc về bài viết)
   - (b) \`orders.customer_id → customers.id\` (cửa hàng cần giữ lịch sử doanh thu kể cả khi khách đóng tài khoản)
   - (c) \`employees.dept_id → departments.id\` (không cho phép xóa một phòng ban đang còn nhân viên)
   - (d) \`order_items.order_id → orders.id\` (dòng hàng thuộc về đơn)

---

## 11. Lời giải chi tiết

### Bài 1 — Xác định candidate key

- Các cột duy nhất, đứng một mình tối thiểu: \`{emp_id}\`, \`{ssn}\`, \`{email}\` → **ba candidate key**.
- \`{dept_id}\`, \`{name}\` không duy nhất → không thể là (một phần) candidate key đơn.
- Ví dụ super key *không* phải candidate key: \`{emp_id, name}\` — duy nhất (vì \`emp_id\` đã duy nhất) nhưng bỏ \`name\` đi vẫn duy nhất → thừa cột → chỉ là super key.
- **Primary key nên chọn \`emp_id\`**: là số nhân tạo (surrogate), không đổi, ngắn → index nhanh và ổn định. \`ssn\` và \`email\` có thể đổi hoặc nhạy cảm (lộ thông tin) nên giữ làm alternate key (\`UNIQUE\`).

### Bài 2 — Viết ràng buộc phù hợp

\`\`\`sql
CREATE TABLE products (
    id       SERIAL       PRIMARY KEY,
    sku      VARCHAR(50)  UNIQUE NOT NULL,
    name     VARCHAR(200) NOT NULL,
    price    NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    stock    INT          NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category VARCHAR(10)  NOT NULL DEFAULT 'other'
             CHECK (category IN ('food','drink','other'))
);
\`\`\`

Giải thích: \`sku\` vừa \`UNIQUE\` vừa \`NOT NULL\` (mã hàng bắt buộc, không trùng); \`price\`/\`stock\` có \`CHECK >= 0\`; \`stock\` có \`DEFAULT 0\`; \`category\` có \`DEFAULT 'other'\` + \`CHECK ... IN (...)\` để giới hạn giá trị.

### Bài 3 — Dự đoán kết quả khi vi phạm FK

- **(a) \`customer_id = 2\`** → 2 ∈ {1,2,3} → **CHẤP NHẬN**. Khách số 2 tồn tại.
- **(b) \`customer_id = 5\`** → 5 ∉ {1,2,3} → **TỪ CHỐI**, vi phạm toàn vẹn tham chiếu: không có khách số 5.
- **(c) \`customer_id = NULL\`** → NULL nghĩa "chưa trỏ ai", không vi phạm foreign key (cột cho phép NULL) → **CHẤP NHẬN**.
- **(d) \`DELETE customers id=1\`** với \`ON DELETE RESTRICT\`: còn đơn 10 trỏ tới khách 1 → **TỪ CHỐI**. Phải xử lý đơn 10 trước (xóa, hoặc đổi \`customer_id\`) rồi mới xóa được khách 1.

### Bài 4 — Chọn ON DELETE

- **(a) \`comments.post_id\`** → **\`CASCADE\`**: bình luận không có nghĩa nếu bài viết bị xóa; chúng thuộc về bài viết.
- **(b) \`orders.customer_id\`** → **\`SET NULL\`**: cần giữ đơn hàng để thống kê doanh thu, chỉ bỏ liên kết tới khách đã đóng tài khoản (cột \`customer_id\` phải cho NULL).
- **(c) \`employees.dept_id\`** → **\`RESTRICT\`**: không cho xóa phòng ban khi còn nhân viên → buộc phải chuyển nhân viên đi trước.
- **(d) \`order_items.order_id\`** → **\`CASCADE\`**: dòng hàng thuộc về đơn; xóa đơn thì xóa luôn các dòng hàng.

---

## 12. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — (1) thử chèn trùng/NULL vào primary key và xem UNIQUE cho nhiều NULL; (2) hai bảng customers/orders với foreign key, mô phỏng từ chối khi vi phạm và xem CASCADE/SET NULL/RESTRICT khi xóa khách; (3) bộ kiểm tra CHECK constraint với \`price\`, \`age\`.

---

## Bài tiếp theo

→ [Lesson 06 — Thiết kế ER](../lesson-06-thiet-ke-er/): biến yêu cầu nghiệp vụ thành sơ đồ thực thể-quan hệ, rồi ánh xạ thành bảng với khóa chính/khóa ngoại đã học ở bài này.
`;
