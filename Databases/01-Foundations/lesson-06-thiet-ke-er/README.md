# Lesson 06 — Thiết kế ER & lược đồ (Entity-Relationship)

> Nhóm 1 — Nền tảng · Bài cuối của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình thực thể — mối quan hệ (ER — Entity-Relationship model)** dùng để *thiết kế* cơ sở dữ liệu ở mức khái niệm trước khi viết một dòng `CREATE TABLE` nào.
- Phân biệt **thực thể (entity)**, **tập thực thể (entity set)**, **thuộc tính (attribute)** và **mối quan hệ (relationship)**.
- Đọc và viết **bản số (cardinality)** 1-1, 1-N, N-N và **ràng buộc tham gia (participation)** total/partial.
- Nhận diện **thực thể yếu (weak entity)** và **khóa bộ phận (partial key)**.
- Thành thạo **ánh xạ ER → bảng quan hệ** theo các quy tắc cố định, để biến một sơ đồ trên giấy thành schema chạy được.

## Kiến thức tiền đề

- [Lesson 02 — Mô hình quan hệ](../lesson-02-mo-hinh-quan-he/): table, row, column, schema.
- [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/): **khóa chính (primary key)**, **khóa ngoại (foreign key)** — bài này là nơi các khóa đó được *sinh ra* từ thiết kế.

---

## 1. Vì sao cần mô hình ER?

💡 **Trực giác.** Bạn không xây nhà bằng cách đổ bê tông ngay; bạn vẽ **bản thiết kế (blueprint)** trước. Mô hình ER chính là bản thiết kế của cơ sở dữ liệu: nó nói "có những *thứ* nào (sinh viên, môn học), chúng *liên hệ* với nhau ra sao (sinh viên *đăng ký* môn học)" — mà chưa cần bận tâm cột nào kiểu `VARCHAR`, khóa ngoại đặt ở đâu. Sau đó ta *dịch máy móc* bản thiết kế đó thành các bảng.

Vẽ ER trước giúp:

- Trao đổi với người không rành kỹ thuật (sơ đồ dễ đọc hơn `CREATE TABLE`).
- Phát hiện sai sót thiết kế sớm (thiếu quan hệ, nhầm bản số) khi sửa còn rẻ.
- Có quy trình *cơ học* để ra schema, ít phụ thuộc cảm tính.

---

## 2. Các thành phần của mô hình ER

### 2.1 Thực thể & tập thực thể

**(a) Là gì.**
- **Thực thể (entity)**: một *đối tượng* riêng lẻ có thể phân biệt được — một sinh viên cụ thể "Nguyễn An, MSSV 21001".
- **Tập thực thể (entity set)**: *tập hợp* các thực thể cùng loại — toàn bộ "Sinh viên". Trong sơ đồ vẽ bằng **hình chữ nhật**. Khi ánh xạ sang bảng, một tập thực thể trở thành một **bảng (table)**, mỗi thực thể là một **hàng (row)**.

**(b) Vì sao cần.** Ta thiết kế theo *loại* (Sinh viên, Môn học), không theo từng cá thể. "Tập thực thể" là khái niệm cho phép nói về cả nhóm cùng lúc.

**(c) Bốn ví dụ.**

| Tập thực thể | Một thực thể (cá thể) cụ thể |
| --- | --- |
| `Student` (Sinh viên) | "Nguyễn An, MSSV 21001" |
| `Course` (Môn học) | "Cơ sở dữ liệu, mã CS301" |
| `Employee` (Nhân viên) | "Trần Bình, mã NV007" |
| `Department` (Phòng ban) | "Phòng Kế toán, mã D02" |

### 2.2 Thuộc tính (attribute)

**(a) Là gì.** **Thuộc tính** mô tả một đặc điểm của thực thể. Trong ký hiệu Chen vẽ bằng **hình elip** nối với hình chữ nhật. Có vài loại quan trọng:

- **Thuộc tính đơn trị (single-valued)**: mỗi thực thể chỉ một giá trị — `birthdate` của sinh viên.
- **Thuộc tính đa trị (multi-valued)**: một thực thể có thể có *nhiều* giá trị — một sinh viên có nhiều `phone` (số điện thoại). Vẽ bằng elip viền đôi.
- **Thuộc tính dẫn xuất (derived)**: *tính ra được* từ thuộc tính khác, không lưu trực tiếp — `age` (tuổi) suy từ `birthdate`. Vẽ bằng elip nét đứt.
- **Thuộc tính khóa (key attribute)**: định danh duy nhất thực thể trong tập — `student_id`. Tên thuộc tính được **gạch chân** trong sơ đồ.

**(b) Vì sao phân loại.** Mỗi loại được *ánh xạ khác nhau* khi ra bảng: đơn trị → một cột; đa trị → một **bảng riêng**; dẫn xuất → thường *không* lưu (tính lúc truy vấn); khóa → trở thành primary key.

**(c) Bốn ví dụ.**

| Thuộc tính | Loại | Vì sao |
| --- | --- | --- |
| `student_id` | Khóa | Định danh duy nhất sinh viên |
| `name` | Đơn trị | Mỗi sinh viên một tên (đầy đủ) |
| `phone` | Đa trị | Một sinh viên có thể đăng ký nhiều số |
| `age` | Dẫn xuất | Tính từ `birthdate` + ngày hiện tại |

⚠ **Lỗi thường gặp.** Coi thuộc tính đa trị như một cột bình thường rồi nhét nhiều giá trị vào một ô (`phone = "090..., 091..."`). Điều này phá vỡ dạng chuẩn 1NF (sẽ học ở [Chuẩn hóa](../../02-Intermediate/lesson-01-chuan-hoa/)). Đúng quy tắc: đa trị → tách thành bảng riêng (mục 6).

### 2.3 Mối quan hệ (relationship)

**(a) Là gì.** **Mối quan hệ (relationship)** liên kết hai (hay nhiều) thực thể: `Student` **đăng ký (Enrolls)** `Course`. Trong ký hiệu Chen vẽ bằng **hình thoi (diamond)** nối hai hình chữ nhật. Một *tập mối quan hệ (relationship set)* là tập tất cả các liên kết cùng loại.

**(b) Vì sao cần.** Dữ liệu thực tế không rời rạc: nhân viên *thuộc* phòng ban, đơn hàng *gồm* sản phẩm. Quan hệ chính là thứ về sau biến thành **foreign key** (1-N) hoặc **bảng nối** (N-N).

**(c) Bốn ví dụ.**

| Quan hệ | Giữa | Đời thực |
| --- | --- | --- |
| `Enrolls` (Đăng ký) | Student — Course | Sinh viên đăng ký môn học |
| `WorksIn` (Làm việc tại) | Employee — Department | Nhân viên thuộc một phòng |
| `Manages` (Quản lý) | Employee — Department | Một nhân viên quản lý một phòng |
| `Owns` (Sở hữu) | Customer — Account | Khách hàng sở hữu tài khoản |

🔁 **Dừng lại tự kiểm tra.**
1. `phone` của sinh viên (nhiều số) là thuộc tính loại gì? Ánh xạ ra sao?
2. Trong ký hiệu Chen, hình chữ nhật, hình elip, hình thoi lần lượt biểu diễn gì?

<details><summary>Đáp án</summary>

1. Đa trị (multi-valued) → ánh xạ thành **bảng riêng** `Student_Phone(student_id, phone)`.
2. Hình chữ nhật = tập thực thể; elip = thuộc tính; hình thoi = mối quan hệ.
</details>

📝 **Tóm tắt mục 2.** Bốn khối xây dựng: tập thực thể (chữ nhật → bảng), thuộc tính (elip → cột, có đơn/đa/dẫn xuất/khóa), mối quan hệ (thoi → FK hoặc bảng nối). Thiết kế ER là sắp xếp các khối này.

---

## 3. Bản số (cardinality) — 1-1, 1-N, N-N

💡 **Trực giác.** Bản số trả lời câu hỏi: *"một thực thể bên này nối được với bao nhiêu thực thể bên kia?"* Giống như hỏi "một người mẹ có mấy con, một đứa con có mấy mẹ ruột".

**(a) Là gì.** Ba loại bản số của một quan hệ hai ngôi (binary):

- **1-1 (one-to-one)**: mỗi A nối tối đa một B và ngược lại.
- **1-N (one-to-many)**: một A nối nhiều B, nhưng mỗi B chỉ nối một A.
- **N-N (many-to-many)**: một A nối nhiều B *và* một B nối nhiều A.

**(b) Vì sao quan trọng.** Bản số quyết định *cách ánh xạ*: 1-N đặt FK ở phía N; N-N bắt buộc tạo bảng nối. Đoán sai bản số → schema sai (dư thừa hoặc không lưu được dữ liệu).

**(c) Ví dụ đời thực cho từng loại.**

| Bản số | Ví dụ đời thực | Giải thích |
| --- | --- | --- |
| **1-1** | `Employee` — `Manages` — `Department` | Một phòng có *đúng một* trưởng phòng; một người làm trưởng *một* phòng |
| **1-1** | `Person` — `Passport` | Mỗi người một hộ chiếu, mỗi hộ chiếu của một người |
| **1-N** | `Department` — `WorksIn` — `Employee` | Một phòng có *nhiều* nhân viên; mỗi nhân viên thuộc *một* phòng |
| **1-N** | `Customer` — `Order` | Một khách nhiều đơn; mỗi đơn của một khách |
| **N-N** | `Student` — `Enrolls` — `Course` | Một sinh viên học nhiều môn; một môn có nhiều sinh viên |
| **N-N** | `Author` — `Book` | Một tác giả viết nhiều sách; một sách có nhiều tác giả |

### 3.1 Ràng buộc tham gia (participation)

**(a) Là gì.** Ngoài "bao nhiêu", còn hỏi "có *bắt buộc* tham gia không":

- **Tham gia toàn bộ (total participation)**: *mọi* thực thể của tập đều phải tham gia quan hệ. Vẽ bằng **đường đôi**. Ví dụ: *mọi* nhân viên phải thuộc một phòng → `Employee` tham gia toàn bộ vào `WorksIn`.
- **Tham gia một phần (partial participation)**: *có thể có* thực thể không tham gia. Vẽ bằng **đường đơn**. Ví dụ: không phải nhân viên nào cũng làm trưởng phòng → `Employee` tham gia một phần vào `Manages`.

**(c) Bốn ví dụ.**

| Cạnh tham gia | Loại | Vì sao |
| --- | --- | --- |
| `Employee` → `WorksIn` | Total | Mọi nhân viên phải thuộc một phòng |
| `Employee` → `Manages` | Partial | Chỉ vài nhân viên là trưởng phòng |
| `Order` → `PlacedBy` (Customer) | Total | Mọi đơn hàng phải có khách đặt |
| `Customer` → `PlacedBy` | Partial | Có khách chưa đặt đơn nào |

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Total participation ảnh hưởng schema thế nào?"* — Phía total thường khiến cột FK tương ứng là `NOT NULL` (bắt buộc phải có giá trị tham chiếu). Ví dụ `Employee.dept_id NOT NULL` vì mọi nhân viên phải thuộc phòng.
- *"N-N có participation không?"* — Có, nhưng vì N-N luôn thành bảng nối nên participation thường thể hiện qua việc có dòng nối hay không, ít ảnh hưởng `NULL`.

🔁 **Dừng lại tự kiểm tra.**
1. `Customer — Order` là bản số gì?
2. "Mọi đơn hàng đều phải có khách" là ràng buộc gì?

<details><summary>Đáp án</summary>

1. 1-N (một khách nhiều đơn, mỗi đơn một khách).
2. Tham gia toàn bộ (total participation) của `Order` vào quan hệ với `Customer` → `Order.customer_id NOT NULL`.
</details>

📝 **Tóm tắt mục 3.** Bản số (1-1/1-N/N-N) = "nối được bao nhiêu"; participation (total/partial) = "có bắt buộc nối không". Hai thông tin này quyết định cách ánh xạ và ràng buộc `NULL`.

---

## 4. Ký hiệu: Chen vs Crow's Foot

Có hai phong cách vẽ phổ biến:

- **Chen notation**: hình chữ nhật (thực thể), elip (thuộc tính), hình thoi (quan hệ); bản số ghi bằng số `1`, `N`, `M` trên cạnh. Trực quan với học thuật, nhưng rườm rà khi sơ đồ lớn (nhiều elip).
- **Crow's foot notation** (chân quạ): chỉ vẽ hình chữ nhật cho bảng, thuộc tính liệt kê *bên trong* chữ nhật. Bản số vẽ ở đầu đường nối bằng ký hiệu: `|` (một), `O` (không / tùy chọn), và "chân quạ" `<` (nhiều). Gọn, phổ biến trong công cụ thiết kế thực tế (dbdiagram, MySQL Workbench).

⚠ **Lỗi thường gặp.** Đọc nhầm chiều "nhiều" trong crow's foot. Chân quạ `<` đặt ở *phía nào* thì phía đó là "nhiều". `Department ||——< Employee` nghĩa là một phòng có *nhiều* nhân viên (chân quạ ở phía Employee).

Bài này dùng tư duy Chen để giải thích, nhưng kết quả ánh xạ giống nhau bất kể ký hiệu — vì cả hai cùng mô tả một thực tế.

---

## 5. Thực thể yếu (weak entity)

💡 **Trực giác.** Có những thứ *không tự đứng một mình* được. Một "phòng 101" chỉ có nghĩa khi gắn với "tòa nhà A" — bản thân số "101" không định danh được nếu tòa B cũng có phòng 101. "Phòng" ở đây là **thực thể yếu**: nó *mượn* danh tính từ "tòa nhà".

**(a) Là gì.**
- **Thực thể yếu (weak entity)**: tập thực thể *không có khóa riêng đủ để định danh*; nó phụ thuộc vào một **thực thể chủ (owner / identifying entity)** thông qua một **quan hệ định danh (identifying relationship)**. Vẽ bằng hình chữ nhật viền đôi.
- **Khóa bộ phận (partial key)**: thuộc tính phân biệt các thực thể yếu *trong cùng một chủ* — như số phòng `101` chỉ phân biệt trong cùng tòa nhà. Gạch chân nét đứt.
- **Khóa đầy đủ** của thực thể yếu = (khóa của chủ) + (partial key). Ví dụ: (`building_id`, `room_no`).

**(b) Vì sao cần.** Một số đối tượng vốn không có định danh độc lập (dòng chi tiết hóa đơn, người phụ thuộc của nhân viên). Ép gán khóa nhân tạo cho chúng đôi khi không tự nhiên; mô hình weak entity diễn tả đúng sự phụ thuộc.

**(c) Bốn ví dụ.**

| Thực thể yếu | Chủ (owner) | Partial key | Khóa đầy đủ |
| --- | --- | --- | --- |
| `Room` (Phòng) | `Building` (Tòa nhà) | `room_no` | (`building_id`, `room_no`) |
| `OrderLine` (Dòng đơn) | `Order` (Đơn hàng) | `line_no` | (`order_id`, `line_no`) |
| `Dependent` (Người phụ thuộc) | `Employee` | `dep_name` | (`emp_id`, `dep_name`) |
| `Episode` (Tập phim) | `Series` (Bộ phim) | `episode_no` | (`series_id`, `episode_no`) |

⚠ **Lỗi thường gặp.** Nhầm thực thể yếu với quan hệ 1-N thông thường. Dấu hiệu của weak entity: thực thể *không thể* phân biệt nếu thiếu chủ (partial key trùng nhau giữa các chủ khác nhau). Nếu nó có khóa riêng tự định danh (vd `Order` có `order_id` toàn cục) thì *không* yếu.

🔁 **Dừng lại tự kiểm tra.** Khóa đầy đủ của `OrderLine` gồm những gì? Vì sao `line_no` một mình không đủ?

<details><summary>Đáp án</summary>

Khóa đầy đủ = (`order_id`, `line_no`). `line_no` một mình không đủ vì *mọi* đơn hàng đều có dòng `line_no = 1` → trùng. Phải kèm `order_id` của chủ để phân biệt.
</details>

📝 **Tóm tắt mục 5.** Thực thể yếu mượn danh tính từ chủ. Khóa của nó = khóa chủ + partial key. Khi ánh xạ, bảng của nó mang FK tới chủ và PK ghép.

---

## 6. Ánh xạ ER → bảng quan hệ (quy tắc + walk-through)

Đây là phần *cốt lõi*: biến sơ đồ thành schema chạy được. Dùng hai ví dụ xuyên suốt:

- **Student — Course** quan hệ **N-N** qua `Enrolls`.
- **Department — Employee** quan hệ **1-N** qua `WorksIn`.

### Quy tắc 1 — Tập thực thể → bảng

Mỗi tập thực thể thành một bảng; thuộc tính đơn trị thành cột; thuộc tính khóa thành **primary key**.

```sql
CREATE TABLE Student (
  student_id INT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  birthdate  DATE
);
CREATE TABLE Course (
  course_id  VARCHAR(10) PRIMARY KEY,
  title      VARCHAR(150) NOT NULL,
  credits    INT
);
CREATE TABLE Department (
  dept_id    INT PRIMARY KEY,
  dept_name  VARCHAR(100) NOT NULL
);
CREATE TABLE Employee (
  emp_id     INT PRIMARY KEY,
  emp_name   VARCHAR(100) NOT NULL
);
```

(Thuộc tính dẫn xuất như `age` **không** tạo cột — tính lúc truy vấn.)

### Quy tắc 2 — Quan hệ 1-N → đặt FK ở phía "N"

💡 **Trực giác.** Phía "nhiều" (mỗi nhân viên chỉ thuộc *một* phòng) là nơi có thể chứa "con trỏ" duy nhất tới phía "một". Đặt FK ở phía N thì mỗi dòng có đúng một giá trị, không dư thừa.

Quan hệ `WorksIn`: `Department (1) —— (N) Employee`. Phía N là `Employee` → thêm cột `dept_id` (FK) vào `Employee`:

```sql
ALTER TABLE Employee
  ADD COLUMN dept_id INT NOT NULL,            -- NOT NULL vì total participation
  ADD FOREIGN KEY (dept_id) REFERENCES Department(dept_id);
```

**Walk-through dữ liệu.** Phòng D01 (Kỹ thuật), D02 (Kế toán). Ba nhân viên:

| emp_id | emp_name | dept_id |
| --- | --- | --- |
| 1 | An | D01 |
| 2 | Binh | D01 |
| 3 | Chi | D02 |

→ An và Binh cùng phòng D01 (một phòng *nhiều* nhân viên ✓); mỗi nhân viên đúng *một* `dept_id` (mỗi người *một* phòng ✓). Không tạo bảng thứ ba.

⚠ **Lỗi thường gặp.** Đặt FK ngược — thêm cột `emp_id` vào `Department`. Sai, vì một phòng có nhiều nhân viên → một ô `emp_id` không chứa nổi nhiều giá trị (lại rơi vào bẫy đa trị).

### Quy tắc 3 — Quan hệ N-N → tạo bảng nối (junction table) với FK kép

💡 **Trực giác.** Không bên nào "đặt FK đơn" được, vì *cả hai* phía đều nhiều. Giải pháp: tách quan hệ ra thành một **bảng riêng**, mỗi dòng là một cặp (Student, Course) — chính là một lần đăng ký.

Quan hệ `Enrolls`: `Student (N) —— (N) Course` → tạo bảng nối `Enrollment`:

```sql
CREATE TABLE Enrollment (
  student_id INT,
  course_id  VARCHAR(10),
  grade      DECIMAL(3,1),                    -- thuộc tính CỦA quan hệ (điểm) đặt ở đây
  PRIMARY KEY (student_id, course_id),        -- khóa kép = FK kép
  FOREIGN KEY (student_id) REFERENCES Student(student_id),
  FOREIGN KEY (course_id)  REFERENCES Course(course_id)
);
```

**Walk-through dữ liệu.** Sinh viên 21 (An), 22 (Binh); môn CS301 (CSDL), MA101 (Toán):

| student_id | course_id | grade |
| --- | --- | --- |
| 21 | CS301 | 8.0 |
| 21 | MA101 | 7.5 |
| 22 | CS301 | 9.0 |

→ An (21) học *hai* môn (một SV nhiều môn ✓); CS301 có *hai* sinh viên (một môn nhiều SV ✓). Cặp (`student_id`, `course_id`) là khóa chính → không cho đăng ký trùng đúng một môn hai lần. Thuộc tính *của quan hệ* (`grade` — điểm của một lần học, không thuộc riêng SV hay Môn) nằm trong bảng nối.

❓ **Câu hỏi tự nhiên.** *"Vì sao điểm `grade` không để trong `Student` hay `Course`?"* — Vì điểm phụ thuộc *cả cặp*: An có điểm khác nhau ở từng môn. Thuộc tính phụ thuộc một quan hệ N-N luôn thuộc về bảng nối.

### Quy tắc 4 — Thuộc tính đa trị → bảng riêng

Thuộc tính đa trị `phone` của `Student` → bảng riêng, khóa gồm (khóa thực thể + giá trị đa trị):

```sql
CREATE TABLE Student_Phone (
  student_id INT,
  phone      VARCHAR(20),
  PRIMARY KEY (student_id, phone),
  FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
```

**Walk-through.** Sinh viên 21 có hai số:

| student_id | phone |
| --- | --- |
| 21 | 0901112222 |
| 21 | 0903334444 |

→ Mỗi số một dòng. Thêm/xóa số chỉ là thêm/xóa dòng, không phá cấu trúc.

### Quy tắc 5 — Thực thể yếu → bảng với khóa ghép (khóa chủ + partial key)

`OrderLine` (yếu) phụ thuộc `Order` (chủ). Bảng `OrderLine` mang FK tới `Order` *và* dùng nó làm phần đầu của primary key:

```sql
CREATE TABLE "Order" (
  order_id INT PRIMARY KEY,
  order_date DATE
);
CREATE TABLE OrderLine (
  order_id  INT,                              -- FK tới chủ
  line_no   INT,                              -- partial key
  product   VARCHAR(100),
  qty       INT,
  PRIMARY KEY (order_id, line_no),            -- khóa chủ + partial key
  FOREIGN KEY (order_id) REFERENCES "Order"(order_id)
);
```

**Walk-through.** Đơn 1000 có hai dòng; đơn 1001 cũng có dòng `line_no = 1`:

| order_id | line_no | product |
| --- | --- | --- |
| 1000 | 1 | Bàn |
| 1000 | 2 | Ghế |
| 1001 | 1 | Đèn |

→ `line_no = 1` xuất hiện ở cả hai đơn nhưng không trùng khóa, vì khóa là cặp (`order_id`, `line_no`): (1000,1) ≠ (1001,1) ✓.

❓ **Câu hỏi tự nhiên.** *"Quan hệ 1-1 ánh xạ sao?"* — Đặt FK ở *một trong hai* phía (kèm `UNIQUE`), thường ở phía tham gia *total*. Vd `Manages`: thêm `mgr_emp_id UNIQUE` vào `Department` (mỗi phòng một trưởng, mỗi người trưởng tối đa một phòng).

🔁 **Dừng lại tự kiểm tra.** Bảng nối `Enrollment` có khóa chính là gì? Vì sao không dùng một cột `id` tự tăng?

<details><summary>Đáp án</summary>

Khóa chính là cặp (`student_id`, `course_id`) — vừa là FK kép vừa là PK ghép. Dùng cặp này còn *chặn đăng ký trùng* (một SV không đăng ký cùng môn hai lần). Cột `id` tự tăng vẫn được trong thực tế nhưng khi đó phải thêm ràng buộc `UNIQUE(student_id, course_id)` để giữ tính duy nhất.
</details>

📝 **Tóm tắt mục 6.** 5 quy tắc: (1) entity set → bảng; (2) 1-N → FK ở phía N; (3) N-N → bảng nối với FK/PK kép; (4) đa trị → bảng riêng; (5) weak entity → PK ghép (khóa chủ + partial key). Kết quả ánh xạ **cần chuẩn hóa** tiếp ở [Chuẩn hóa](../../02-Intermediate/lesson-01-chuan-hoa/) để loại dư thừa.

---

## 7. Bài tập

1. **Vẽ ER bằng lời.** Một thư viện: *mỗi đầu sách (Book) có nhiều bản sao vật lý (Copy); mỗi bản sao thuộc đúng một đầu sách. Thành viên (Member) mượn (Borrows) các bản sao, mỗi lần mượn ghi ngày mượn và ngày trả; một bản sao theo thời gian được nhiều người mượn, một người mượn nhiều bản.* Liệt kê các tập thực thể, thuộc tính khóa, các quan hệ và bản số của chúng.

2. **Xác định cardinality & participation.** Với mỗi cặp, ghi bản số (1-1/1-N/N-N) và participation của phía in đậm: (a) **Country** — City (thủ đô là City, nhưng nước có nhiều City); (b) **Employee** — Project (một người làm nhiều dự án, một dự án nhiều người); (c) **Person** — passport (mỗi người 1 hộ chiếu); (d) **Invoice** — Customer (mọi hóa đơn phải có khách).

3. **Ánh xạ N-N thành bảng.** Cho quan hệ N-N `Author — Writes — Book` với thuộc tính của quan hệ là `royalty_pct` (tỷ lệ nhuận bút của tác giả đó cho cuốn đó). `Author(author_id, name)`, `Book(isbn, title)`. Viết các lệnh `CREATE TABLE` (gồm bảng nối) và cho ví dụ 3 dòng dữ liệu thể hiện một tác giả viết 2 sách và một sách có 2 tác giả.

4. **Nhận diện weak entity.** Với mỗi mô tả, cho biết đó là *thực thể yếu* hay *thực thể mạnh (có khóa riêng)* và nêu khóa đầy đủ: (a) `Apartment` được định danh bằng số căn hộ *trong* một `Building`; (b) `Employee` có mã nhân viên toàn công ty; (c) `Comment` của một bài viết, đánh số thứ tự `seq` trong từng bài; (d) `Product` có mã SKU toàn hệ thống.

---

## 8. Lời giải chi tiết

### Bài 1 — ER thư viện

**Tập thực thể & khóa:**
- `Book` (đầu sách) — khóa `book_id`. Thuộc tính: `title`, `author`.
- `Copy` (bản sao vật lý) — đây là **thực thể yếu** phụ thuộc `Book`; partial key `copy_no`; khóa đầy đủ (`book_id`, `copy_no`).
- `Member` (thành viên) — khóa `member_id`. Thuộc tính: `name`.

**Quan hệ & bản số:**
- `Book (1) —— (N) Copy` (`HasCopy`, quan hệ định danh) — một đầu sách nhiều bản, mỗi bản một đầu sách. `Copy` tham gia *total* (mọi bản sao phải thuộc một đầu sách).
- `Member (N) —— (N) Copy` (`Borrows`) — N-N, thuộc tính quan hệ `borrow_date`, `return_date`.

**Lược đồ kết quả (text):**

```
Book(book_id PK, title, author)
Copy(book_id FK→Book, copy_no, status, PK(book_id, copy_no))
Member(member_id PK, name)
Borrows(member_id FK→Member, book_id, copy_no, borrow_date, return_date,
        FK(book_id, copy_no)→Copy, PK(member_id, book_id, copy_no, borrow_date))
```

(Khóa của `Borrows` gồm cả `borrow_date` vì cùng một người có thể mượn lại cùng bản sao ở thời điểm khác.)

### Bài 2 — Cardinality & participation

| Cặp | Bản số | Participation phía in đậm |
| --- | --- | --- |
| (a) **Country** — City | 1-N (nước nhiều city) | Partial (chưa chắc mọi Country đã nhập city, nhưng nếu mọi nước phải có ≥1 city thì total) |
| (b) **Employee** — Project | N-N | Partial (có nhân viên chưa vào dự án nào) |
| (c) **Person** — passport | 1-1 | Partial (có người chưa làm hộ chiếu) |
| (d) **Invoice** — Customer | 1-N (một khách nhiều hóa đơn) | **Total** (mọi hóa đơn phải có khách → `Invoice.customer_id NOT NULL`) |

### Bài 3 — Ánh xạ N-N `Author — Writes — Book`

```sql
CREATE TABLE Author (
  author_id INT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL
);
CREATE TABLE Book (
  isbn  VARCHAR(20) PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);
CREATE TABLE Writes (                          -- bảng nối
  author_id    INT,
  isbn         VARCHAR(20),
  royalty_pct  DECIMAL(5,2),                   -- thuộc tính của quan hệ
  PRIMARY KEY (author_id, isbn),
  FOREIGN KEY (author_id) REFERENCES Author(author_id),
  FOREIGN KEY (isbn)      REFERENCES Book(isbn)
);
```

Dữ liệu ví dụ (tác giả 1 viết 2 sách; sách `B1` có 2 tác giả):

| author_id | isbn | royalty_pct |
| --- | --- | --- |
| 1 | B1 | 60.00 |
| 1 | B2 | 100.00 |
| 2 | B1 | 40.00 |

→ Tác giả 1 xuất hiện ở B1 và B2 (một tác giả nhiều sách ✓); B1 có tác giả 1 và 2 (một sách nhiều tác giả ✓). `royalty_pct` thuộc *cặp* (tác giả 1 nhận 60% của B1, 100% của B2).

### Bài 4 — Nhận diện weak entity

- **(a) Apartment**: **thực thể yếu**. Số căn hộ trùng giữa các tòa → cần chủ `Building`. Khóa đầy đủ (`building_id`, `apt_no`).
- **(b) Employee**: **mạnh**. Có `emp_id` toàn công ty tự định danh.
- **(c) Comment**: **thực thể yếu**. `seq` chỉ duy nhất *trong* một bài. Khóa đầy đủ (`post_id`, `seq`).
- **(d) Product**: **mạnh**. `SKU` toàn hệ thống là khóa riêng.

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — (1) mô phỏng ánh xạ ER→bảng theo loại quan hệ 1-1/1-N/N-N (đặc biệt N-N sinh bảng nối FK kép), (2) sơ đồ ER `Student–Enrollment–Course` bấm xem giải thích, (3) bộ chọn cardinality minh họa bằng ví dụ.

---

## Kết thúc Nhóm 1 — Nền tảng

Bạn đã đi hết Nhóm 1: từ *DBMS là gì* → *mô hình quan hệ* → *SQL* → *khóa & ràng buộc* → *thiết kế ER*. Bước tiếp theo là làm cho schema vừa thiết kế **gọn và không dư thừa**:

→ [Nhóm 2 — Chuẩn hóa (Normalization)](../../02-Intermediate/lesson-01-chuan-hoa/): 1NF, 2NF, 3NF, BCNF — tinh chỉnh các bảng vừa ánh xạ ra từ ER. Và [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/) là nơi xem lại cơ chế FK/PK mà bài này sinh ra.
