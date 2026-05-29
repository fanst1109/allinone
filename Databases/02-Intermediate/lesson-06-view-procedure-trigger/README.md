# Lesson 06 — View, Procedure, Trigger

> Nhóm 2 — Trung cấp · Bài cuối của nhóm, lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **view (khung nhìn)** là gì — một truy vấn được đặt tên, hoạt động như "bảng ảo (virtual table)" — và vì sao nó hữu ích (đơn giản hóa truy vấn, ẩn cột nhạy cảm, tái sử dụng logic).
- Phân biệt **view thường** và **materialized view (khung nhìn vật chất hóa)**: cái nào tính lại mỗi lần đọc, cái nào lưu sẵn kết quả và phải `REFRESH`.
- Viết được **stored procedure (thủ tục lưu trữ)** và **function (hàm)**: logic chạy ngay trong DBMS, dùng tham số `IN`/`OUT`, gói trong transaction.
- Hiểu **trigger (bẫy/cò)**: đoạn code tự động chạy khi có `INSERT`/`UPDATE`/`DELETE`, theo thời điểm `BEFORE`/`AFTER` và phạm vi `FOR EACH ROW`.
- Biết khi nào nên đặt logic trong DB và khi nào nên để ở tầng ứng dụng — tránh lạm dụng.

## Kiến thức tiền đề

- [Lesson 04 — SQL trung cấp](../../01-Foundations/lesson-04-sql-trung-cap/): `JOIN`, `GROUP BY`, subquery — view và procedure được xây trên những câu này.
- [Lesson 03 — Transaction & ACID](../lesson-03-transaction-acid/): thủ tục chuyển tiền dưới đây dùng `BEGIN`/`COMMIT`/`ROLLBACK`.
- Hữu ích: [Lesson 05 — Query Execution & EXPLAIN](../lesson-05-query-execution/) để hiểu view thường được "nội suy" vào kế hoạch truy vấn thế nào.

---

## 1. View — bảng ảo

### 1.1 Định nghĩa (đủ 3 phần)

💡 **Trực giác.** View giống một **ô cửa sổ nhìn vào căn phòng dữ liệu**: bạn không sao chép đồ đạc ra ngoài, chỉ *nhìn* qua khung cửa đã được cắt sẵn theo ý muốn ("chỉ thấy khách hàng VIP", "chỉ thấy cột tên và email, giấu lương"). Đồ trong phòng đổi thì khung cửa cũng thấy đổi ngay.

**(a) Là gì.** View là một **truy vấn `SELECT` được đặt tên và lưu trong DBMS**. Khi bạn `SELECT` từ view, DBMS chạy lại câu truy vấn gốc trên dữ liệu hiện tại. View *không* lưu dữ liệu riêng — nó là "bảng ảo".

**(b) Vì sao cần.** Nếu một câu `JOIN` 4 bảng với điều kiện phức tạp bị lặp lại ở 20 chỗ trong ứng dụng, sửa một lần là sửa 20 chỗ. Đặt nó thành view → mọi nơi `SELECT * FROM v_don_hang_vip`, sửa logic chỉ một chỗ. Ngoài ra view còn để **bảo mật** (cấp quyền đọc view nhưng giấu cột nhạy cảm của bảng gốc) và **đơn giản hóa** (người dùng cuối thấy bảng phẳng thay vì 4 bảng nối nhau).

**(c) Ví dụ trực giác.** Có bảng `nhan_vien(id, ten, luong, phong_ban)`. Tạo view giấu lương cho bộ phận lễ tân:

```sql
CREATE VIEW v_danh_ba AS
SELECT id, ten, phong_ban
FROM nhan_vien;
```

Lễ tân `SELECT * FROM v_danh_ba` → thấy 3 cột, không bao giờ thấy `luong`.

### 1.2 Bốn ví dụ `CREATE VIEW`

```sql
-- Ví dụ 1: lọc — chỉ khách đang hoạt động
CREATE VIEW v_khach_active AS
SELECT id, ten, email
FROM khach_hang
WHERE trang_thai = 'active';

-- Ví dụ 2: join — đơn hàng kèm tên khách
CREATE VIEW v_don_hang_kem_ten AS
SELECT d.id AS don_id, k.ten AS khach, d.tong_tien
FROM don_hang d
JOIN khach_hang k ON d.khach_id = k.id;

-- Ví dụ 3: tổng hợp — doanh thu theo khách
CREATE VIEW v_doanh_thu_khach AS
SELECT khach_id, COUNT(*) AS so_don, SUM(tong_tien) AS tong
FROM don_hang
GROUP BY khach_id;

-- Ví dụ 4: ẩn cột nhạy cảm — danh bạ không lương
CREATE VIEW v_danh_ba AS
SELECT id, ten, phong_ban
FROM nhan_vien;
```

Dùng view y như bảng thật:

```sql
SELECT * FROM v_doanh_thu_khach WHERE tong > 5000000 ORDER BY tong DESC;
```

### 1.3 Updatable view — view có sửa được không?

Một số view cho phép `INSERT`/`UPDATE`/`DELETE` rồi DBMS ghi xuống bảng gốc, gọi là **updatable view**. Nhưng có giới hạn: thường chỉ được khi view **dựa trên đúng một bảng**, **không có `GROUP BY`, `DISTINCT`, hàm tổng hợp (aggregate), `JOIN`** — vì khi đó DBMS không biết một dòng tổng hợp tương ứng với dòng gốc nào.

```sql
-- Updatable: 1 bảng, không aggregate
CREATE VIEW v_khach_hn AS
SELECT id, ten, email, thanh_pho FROM khach_hang WHERE thanh_pho = 'Hanoi';

UPDATE v_khach_hn SET email = 'moi@x.com' WHERE id = 3;  -- OK, ghi vào khach_hang

-- KHÔNG updatable: có aggregate, DBMS không map ngược được
-- UPDATE v_doanh_thu_khach SET tong = 0 WHERE khach_id = 1;  -- LỖI
```

⚠ **Lỗi thường gặp.** Tưởng mọi view đều sửa được. View có `JOIN`/`GROUP BY`/`SUM` là *read-only* trên hầu hết DBMS. Muốn ghi qua view phức tạp, phải dùng `INSTEAD OF` trigger (mục 4) để tự định nghĩa cách ghi.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"View có làm truy vấn chậm hơn không?"* — View thường không lưu gì, nên không tốn đĩa; nhưng mỗi lần đọc, câu truy vấn gốc chạy lại. Nếu câu đó nặng (join nhiều bảng) thì đọc view cũng nặng tương đương. Đó là động lực cho materialized view (mục 2).
- *"View có lưu dữ liệu không?"* — Không. View thường chỉ lưu *định nghĩa truy vấn*. Dữ liệu luôn lấy tươi từ bảng gốc.

🔁 **Dừng lại tự kiểm tra.**
1. View thường lưu dữ liệu hay chỉ lưu câu truy vấn?
2. Vì sao view có `GROUP BY` thường không sửa được?

<details><summary>Đáp án</summary>

1. Chỉ lưu *định nghĩa truy vấn (câu `SELECT`)*. Dữ liệu lấy tươi từ bảng gốc mỗi lần đọc.
2. Vì một dòng tổng hợp (vd `SUM`) gộp từ nhiều dòng gốc — DBMS không biết sửa dòng tổng hợp thì phải ghi ngược vào dòng gốc nào.
</details>

📝 **Tóm tắt mục 1.** View = truy vấn `SELECT` được đặt tên, hành xử như bảng ảo, lấy dữ liệu tươi mỗi lần đọc. Lợi ích: đơn giản hóa, bảo mật (ẩn cột), tái sử dụng logic. Sửa được chỉ khi view đủ "đơn giản" (1 bảng, không aggregate/join).

---

## 2. Materialized view — lưu kết quả thật

### 2.1 Định nghĩa (đủ 3 phần)

💡 **Trực giác.** Nếu view thường là *ô cửa sổ* (nhìn qua là thấy hiện trạng), thì materialized view là *bức ảnh chụp* căn phòng: xem ảnh rất nhanh (không phải mở cửa nhìn lại), nhưng ảnh chỉ đúng tại thời điểm chụp — phòng thay đổi thì phải **chụp lại (`REFRESH`)**.

**(a) Là gì.** Materialized view **lưu thật kết quả của truy vấn xuống đĩa** như một bảng. Đọc nó chỉ là đọc bảng đã tính sẵn → rất nhanh, không phải chạy lại join/aggregate.

**(b) Vì sao cần.** Một truy vấn OLAP kiểu "doanh thu theo tỉnh × tháng × năm" quét hàng triệu dòng, mất vài giây. Nếu dashboard gọi nó 1000 lần/phút thì sập. Materialized view tính một lần, lưu lại, mọi người đọc kết quả tức thì. Đổi lại: dữ liệu có thể **cũ (stale)** cho đến lần `REFRESH` tiếp theo.

**(c) Ví dụ trực giác.**

```sql
CREATE MATERIALIZED VIEW mv_doanh_thu_thang AS
SELECT thang, SUM(tong_tien) AS doanh_thu
FROM don_hang
GROUP BY thang;

-- Đọc: nhanh như đọc 1 bảng nhỏ đã tính sẵn
SELECT * FROM mv_doanh_thu_thang;

-- Khi don_hang đã thay đổi, phải làm tươi thủ công (PostgreSQL):
REFRESH MATERIALIZED VIEW mv_doanh_thu_thang;
```

### 2.2 So sánh view thường vs materialized view

| Tiêu chí | View thường | Materialized view |
| --- | --- | --- |
| Lưu dữ liệu? | Không (chỉ lưu câu `SELECT`) | Có (lưu kết quả thật xuống đĩa) |
| Tốc độ đọc | Bằng tốc độ chạy lại truy vấn gốc | Rất nhanh (đọc bảng tính sẵn) |
| Độ tươi dữ liệu | Luôn tươi (real-time) | Cũ đến lần `REFRESH` tiếp theo |
| Tốn dung lượng đĩa | Không đáng kể | Có (bằng kích thước kết quả) |
| Phù hợp | Logic dùng lại, dữ liệu thay đổi liên tục | Báo cáo/dashboard OLAP, truy vấn nặng ít đổi |

Materialized view là một kỹ thuật điển hình trong **kho dữ liệu (data warehouse)** và tải OLAP — xem [Lesson 05 (Nhóm 3) — Data Warehouse & OLAP](../../03-Advanced/lesson-05-data-warehouse-olap/).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Khi nào dữ liệu materialized view sai?"* — Ngay sau khi bảng gốc đổi mà chưa `REFRESH`. Nếu kết quả phải tuyệt đối tươi (số dư tài khoản) → đừng dùng materialized view. Nếu cũ vài phút cũng được (báo cáo doanh thu) → rất hợp.
- *"Có tự refresh được không?"* — Có, qua lịch (cron job) hoặc cơ chế incremental refresh của DBMS, nhưng vẫn có độ trễ. Không có gì "vừa tức thì vừa miễn phí".

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao đọc materialized view nhanh hơn view thường?
2. Cái giá phải trả của materialized view là gì?

<details><summary>Đáp án</summary>

1. Materialized view đã lưu sẵn kết quả → đọc chỉ là đọc một bảng; view thường phải *chạy lại* toàn bộ truy vấn (join/aggregate) mỗi lần.
2. Tốn đĩa lưu kết quả + dữ liệu có thể cũ (stale) cho tới lần `REFRESH`.
</details>

📝 **Tóm tắt mục 2.** Materialized view đánh đổi *độ tươi* lấy *tốc độ đọc*: lưu sẵn kết quả → đọc nhanh nhưng phải `REFRESH` để cập nhật. Hợp với OLAP/báo cáo; không hợp dữ liệu cần tức thì.

---

## 3. Stored procedure & function — logic chạy trong DB

### 3.1 Định nghĩa (đủ 3 phần)

💡 **Trực giác.** Thay vì ứng dụng gửi 5 câu SQL qua mạng rồi chờ từng cái, ta đóng gói cả 5 câu thành một "nút bấm" đặt sẵn trong DBMS. Ứng dụng chỉ gọi `CALL chuyen_tien(...)` — như nhấn một nút, mọi việc xảy ra ngay bên trong, gần dữ liệu.

**(a) Là gì.**
- **Stored procedure (thủ tục lưu trữ)**: một khối lệnh SQL (kèm biến, điều kiện, vòng lặp) được đặt tên và lưu trong DBMS, gọi bằng `CALL`. Có thể *không* trả giá trị, hoặc trả qua tham số `OUT`.
- **Function (hàm)**: tương tự nhưng **trả về một giá trị** và gọi được *bên trong câu SQL* (vd `SELECT tinh_thue(luong)`).

**(b) Vì sao cần.** (1) Giảm **round-trip mạng (network round-trip)** — gói nhiều thao tác thành 1 lời gọi thay vì hàng chục lượt qua lại. (2) Gói logic nghiệp vụ kèm transaction để **đảm bảo nguyên tử (atomicity)** — vd chuyển tiền: trừ A và cộng B phải cùng thành công hoặc cùng thất bại. (3) Tập trung quy tắc dùng chung cho mọi ứng dụng truy cập DB.

**(c) Ví dụ trực giác — thủ tục chuyển tiền (PostgreSQL `plpgsql`).**

```sql
CREATE PROCEDURE chuyen_tien(IN tu_id INT, IN den_id INT, IN so_tien NUMERIC)
LANGUAGE plpgsql AS $$
BEGIN
  -- cả khối nằm trong 1 transaction: cùng thành công hoặc cùng rollback
  UPDATE tai_khoan SET so_du = so_du - so_tien WHERE id = tu_id;
  IF (SELECT so_du FROM tai_khoan WHERE id = tu_id) < 0 THEN
     RAISE EXCEPTION 'Không đủ số dư';   -- ném lỗi → rollback toàn bộ
  END IF;
  UPDATE tai_khoan SET so_du = so_du + so_tien WHERE id = den_id;
END;
$$;

CALL chuyen_tien(1, 2, 500000);
```

Nếu dòng `RAISE EXCEPTION` chạy, cả hai `UPDATE` đều bị huỷ — không có chuyện trừ tiền A mà chưa cộng cho B.

### 3.2 Tham số IN / OUT — bốn ví dụ

| Khai báo | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| `IN x INT` | Đầu vào (mặc định) | `chuyen_tien(IN tu_id INT, ...)` |
| `OUT y NUMERIC` | Đầu ra trả về cho caller | `lay_so_du(IN id INT, OUT sd NUMERIC)` |
| `INOUT z INT` | Vừa vào vừa ra | `tang_dem(INOUT n INT)` |
| function `RETURNS` | Trả 1 giá trị, gọi trong SQL | `CREATE FUNCTION tinh_thue(l NUMERIC) RETURNS NUMERIC ...` |

```sql
-- Function dùng ngay trong SELECT
CREATE FUNCTION tinh_thue(luong NUMERIC) RETURNS NUMERIC
LANGUAGE sql AS $$ SELECT luong * 0.1 $$;

SELECT ten, luong, tinh_thue(luong) AS thue FROM nhan_vien;
```

### 3.3 Ưu / nhược

| Ưu điểm | Nhược điểm |
| --- | --- |
| Giảm round-trip mạng (gói nhiều lệnh) | Khó **version control** (logic nằm trong DB, không nằm cùng code app trong Git) |
| Logic chạy gần dữ liệu → nhanh | Khó **test/debug** bằng công cụ phần mềm thông thường |
| Đảm bảo transaction nhất quán | Mỗi DBMS một phương ngữ (plpgsql ≠ T-SQL ≠ PL/SQL) → khó chuyển |
| Tập trung quy tắc cho mọi app | Dễ phình to thành "logic ẩn" khó bảo trì nếu lạm dụng |

📝 **Tóm tắt mục 3.** Procedure/function = logic chạy trong DBMS, gọi bằng `CALL`/dùng trong `SELECT`, nhận tham số `IN`/`OUT`. Lợi: giảm round-trip, gói transaction nguyên tử. Hại: khó version/test, mỗi DBMS một phương ngữ.

---

## 4. Trigger — tự động chạy khi dữ liệu thay đổi

### 4.1 Định nghĩa (đủ 3 phần)

💡 **Trực giác.** Trigger giống một **cảm biến tự động**: bạn không bấm gì cả, nhưng cứ mỗi khi có ai đó `INSERT`/`UPDATE`/`DELETE` trên bảng, một đoạn code tự bật chạy. Như đèn hành lang tự sáng khi có người bước qua.

**(a) Là gì.** Trigger là một đoạn code gắn vào một bảng, **tự động thực thi** khi xảy ra một thao tác ghi (`INSERT`/`UPDATE`/`DELETE`). Hai trục cấu hình:
- **Thời điểm**: `BEFORE` (chạy *trước* khi ghi — dùng để kiểm tra/sửa giá trị) hay `AFTER` (chạy *sau* khi ghi — dùng để ghi log, cập nhật bảng khác).
- **Phạm vi**: `FOR EACH ROW` (chạy một lần *cho mỗi dòng* bị ảnh hưởng) hay `FOR EACH STATEMENT` (chạy một lần *cho cả câu lệnh*).

**(b) Vì sao cần.** Có những việc *phải luôn xảy ra* khi dữ liệu đổi, bất kể ứng dụng nào ghi: ghi nhật ký kiểm toán (audit log), tự cập nhật cột tổng, chặn dữ liệu sai. Đặt ở trigger → không ứng dụng nào "quên" làm.

**(c) Ví dụ trực giác — tự ghi audit log khi cập nhật lương (PostgreSQL).**

```sql
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  bang TEXT, thao_tac TEXT,
  cu TEXT, moi TEXT, thoi_diem TIMESTAMP DEFAULT now()
);

CREATE FUNCTION log_doi_luong() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO audit_log(bang, thao_tac, cu, moi)
  VALUES ('nhan_vien', 'UPDATE', OLD.luong::TEXT, NEW.luong::TEXT);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_luong
AFTER UPDATE OF luong ON nhan_vien
FOR EACH ROW
EXECUTE FUNCTION log_doi_luong();
```

Giờ bất kỳ `UPDATE nhan_vien SET luong = ...` nào cũng tự sinh một dòng trong `audit_log` — không cần ứng dụng tự ghi.

### 4.2 Bốn ví dụ trigger điển hình

```sql
-- 1) BEFORE INSERT: chuẩn hóa email về chữ thường trước khi lưu
CREATE TRIGGER trg_lower_email BEFORE INSERT ON khach_hang
FOR EACH ROW EXECUTE FUNCTION lower_email();   -- NEW.email := lower(NEW.email)

-- 2) AFTER INSERT: tự cập nhật cột tổng số đơn của khách
CREATE TRIGGER trg_dem_don AFTER INSERT ON don_hang
FOR EACH ROW EXECUTE FUNCTION tang_so_don();   -- khach_hang.so_don += 1

-- 3) AFTER DELETE: ghi audit khi xóa
CREATE TRIGGER trg_log_xoa AFTER DELETE ON nhan_vien
FOR EACH ROW EXECUTE FUNCTION log_xoa();

-- 4) BEFORE UPDATE: chặn hạ lương xuống âm
CREATE TRIGGER trg_chan_luong_am BEFORE UPDATE ON nhan_vien
FOR EACH ROW EXECUTE FUNCTION chan_am();       -- IF NEW.luong < 0 THEN RAISE EXCEPTION
```

### 4.3 Thứ tự chạy — `BEFORE` trước, `AFTER` sau

Với một câu `UPDATE` trên một dòng, thứ tự là:

1. Các trigger `BEFORE ... FOR EACH ROW` chạy (có thể sửa `NEW`).
2. DBMS thực hiện ghi thật xuống bảng.
3. Các trigger `AFTER ... FOR EACH ROW` chạy (đọc được giá trị đã ghi).

Nếu một bảng có nhiều trigger cùng loại, DBMS chạy chúng theo thứ tự tên (PostgreSQL) hoặc theo thứ tự khai báo — đừng phụ thuộc thứ tự ngầm định.

⚠ **Lỗi thường gặp.**
- **Hiệu ứng phụ ẩn khó debug.** Bạn chạy một `UPDATE` đơn giản, nhưng nó âm thầm kích hoạt 3 trigger sửa 3 bảng khác. Khi có bug, người mới nhìn câu SQL không hề thấy nguyên nhân — logic "vô hình".
- **Đệ quy trigger (recursive trigger).** Trigger trên bảng A ghi vào bảng B, mà bảng B lại có trigger ghi ngược vào A → vòng lặp vô tận hoặc lỗi vượt độ sâu. Phải thiết kế cẩn thận hoặc dùng cờ chống đệ quy.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"`BEFORE` và `AFTER` khác nhau khi nào quan trọng?"* — Dùng `BEFORE` khi cần *sửa hoặc chặn* giá trị sắp ghi (`NEW`). Dùng `AFTER` khi cần *phản ứng sau khi đã ghi xong* (ghi log, đồng bộ bảng khác) — lúc đó dữ liệu đã chắc chắn vào bảng.
- *"Trigger có chạy khi rollback không?"* — Trigger chạy *trong cùng transaction*. Nếu transaction rollback, mọi thứ trigger ghi cũng bị huỷ theo.

🔁 **Dừng lại tự kiểm tra.**
1. Muốn chuẩn hóa giá trị *trước khi* ghi, dùng `BEFORE` hay `AFTER`?
2. Đệ quy trigger là gì và vì sao nguy hiểm?

<details><summary>Đáp án</summary>

1. `BEFORE` — vì nó cho phép sửa `NEW` trước khi DBMS ghi xuống bảng. `AFTER` thì đã ghi rồi, không sửa được giá trị đang ghi.
2. Trigger trên bảng A gây thao tác làm trigger khác chạy rồi vòng lại tác động A → có thể lặp vô tận, gây lỗi vượt độ sâu hoặc treo. Nguy hiểm vì khó nhìn thấy chuỗi kích hoạt.
</details>

📝 **Tóm tắt mục 4.** Trigger tự chạy khi `INSERT`/`UPDATE`/`DELETE`. `BEFORE` để kiểm tra/sửa giá trị; `AFTER` để phản ứng (log, đồng bộ). Mạnh nhưng dễ tạo logic ẩn khó debug và đệ quy — dùng tiết chế.

---

## 5. Khi nào dùng — và đừng lạm dụng

💡 **Trực giác.** DB là nơi *giữ và đảm bảo tính đúng đắn của dữ liệu*; tầng ứng dụng là nơi *thể hiện quy tắc nghiệp vụ phức tạp, dễ test và version*. Cái gì là "luật bất biến của dữ liệu" → hợp với DB; cái gì là "quy trình nghiệp vụ hay đổi" → hợp với app.

| Công cụ | Nên dùng khi | Nên tránh khi |
| --- | --- | --- |
| **View** | Đơn giản hóa truy vấn lặp lại, ẩn cột nhạy cảm | Truy vấn nặng đọc rất nhiều lần → cân nhắc materialized |
| **Materialized view** | Báo cáo/OLAP, truy vấn nặng, chấp nhận dữ liệu cũ vài phút | Cần dữ liệu tức thì, thay đổi liên tục |
| **Procedure/function** | Gói transaction nguyên tử (chuyển tiền), giảm round-trip | Logic nghiệp vụ phức tạp, hay đổi → để ở app cho dễ test/version |
| **Trigger** | Audit log bắt buộc, ràng buộc dữ liệu không-thể-bỏ-qua | Logic nghiệp vụ chính → biến thành "ma thuật ẩn" khó debug |

⚠ **Lỗi thường gặp.** Nhồi *toàn bộ* logic nghiệp vụ vào trigger và procedure để "cho gọn app". Hậu quả: logic phân tán giữa code và DB, khó test, khó version, người mới không hiểu vì sao dữ liệu tự đổi. Quy tắc thực dụng: **ràng buộc toàn vẹn dữ liệu → DB (constraint/trigger); quy trình nghiệp vụ → app.**

📝 **Tóm tắt mục 5.** Đặt ở DB những gì là *luật bất biến của dữ liệu* (toàn vẹn, audit). Đặt ở app những gì là *quy trình nghiệp vụ hay đổi*. Lạm dụng trigger/procedure → logic ẩn khó bảo trì.

---

## 6. Bài tập

1. **Viết view.** Có bảng `san_pham(id, ten, gia, ton_kho, an_hien)`. Viết một view `v_san_pham_con_hang` chỉ hiện sản phẩm đang bày bán (`an_hien = TRUE`) và còn hàng (`ton_kho > 0`), chỉ gồm cột `id, ten, gia`.

2. **View hay materialized view?** Với mỗi tình huống, chọn loại view phù hợp và giải thích một câu: (a) số dư tài khoản hiện tại để hiển thị khi rút tiền; (b) báo cáo "tổng doanh thu theo tỉnh" cho dashboard ban giám đốc, cập nhật mỗi 15 phút là đủ; (c) danh sách đơn hàng chưa giao của một khách (thay đổi liên tục); (d) bảng xếp hạng "top 100 bài viết nhiều like nhất tháng trước" hiển thị cho hàng triệu lượt xem.

3. **Viết trigger audit.** Bảng `nhan_vien(id, ten, luong)` và bảng `audit_log(id, nhan_vien_id, luong_cu, luong_moi, thoi_diem)`. Viết (mô tả/pseudo-SQL) một trigger tự ghi vào `audit_log` mỗi khi `luong` của một nhân viên thay đổi. Trigger nên là `BEFORE` hay `AFTER`? Vì sao?

4. **Dự đoán thứ tự chạy.** Bảng `tai_khoan` có 2 trigger: `trg_check` (`BEFORE UPDATE`, chặn `so_du < 0`) và `trg_log` (`AFTER UPDATE`, ghi audit). Chạy `UPDATE tai_khoan SET so_du = so_du - 100 WHERE id = 1;` Hãy liệt kê thứ tự các bước xảy ra. Nếu `trg_check` ném lỗi thì `trg_log` có chạy không?

---

## 7. Lời giải chi tiết

### Bài 1 — Viết view

```sql
CREATE VIEW v_san_pham_con_hang AS
SELECT id, ten, gia
FROM san_pham
WHERE an_hien = TRUE AND ton_kho > 0;
```

Cách tiếp cận: view chỉ là một `SELECT` đặt tên. Chọn đúng 3 cột yêu cầu trong mệnh đề `SELECT`, đưa hai điều kiện vào `WHERE`. Vì view dựa trên một bảng và không có aggregate nên nó là updatable — nhưng yêu cầu chỉ cần đọc.

### Bài 2 — View hay materialized view?

- **(a) Số dư tài khoản khi rút tiền** → **View thường** (hoặc đọc thẳng bảng). Phải tuyệt đối tươi; số dư cũ vài phút có thể cho rút quá tiền → nguy hiểm.
- **(b) Doanh thu theo tỉnh, cập nhật 15 phút/lần là đủ** → **Materialized view**. Truy vấn tổng hợp nặng, chấp nhận dữ liệu hơi cũ → lưu sẵn + `REFRESH` định kỳ, đọc tức thì cho dashboard.
- **(c) Đơn chưa giao của một khách (đổi liên tục)** → **View thường**. Cần phản ánh thay đổi ngay; lượng dữ liệu nhỏ nên chạy lại không tốn kém.
- **(d) Top 100 bài viết tháng trước, hàng triệu lượt xem** → **Materialized view**. Dữ liệu của *tháng trước* đã cố định (không đổi nữa) mà bị đọc cực nhiều → lưu sẵn để mỗi lượt xem không phải tính lại bảng xếp hạng.

### Bài 3 — Viết trigger audit

Trigger nên là **`AFTER UPDATE`**: ta chỉ muốn ghi log *sau khi* việc cập nhật lương đã chắc chắn thành công. Nếu dùng `BEFORE` mà câu update sau đó bị một ràng buộc khác chặn lại, ta đã ghi nhầm một dòng log cho thay đổi không thực sự xảy ra (dù cùng transaction nên cũng rollback, nhưng `AFTER` rõ nghĩa hơn).

```sql
CREATE FUNCTION log_doi_luong() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.luong <> OLD.luong THEN          -- chỉ ghi khi lương thực sự đổi
     INSERT INTO audit_log(nhan_vien_id, luong_cu, luong_moi, thoi_diem)
     VALUES (OLD.id, OLD.luong, NEW.luong, now());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_audit_luong
AFTER UPDATE OF luong ON nhan_vien
FOR EACH ROW
EXECUTE FUNCTION log_doi_luong();
```

Giải thích từng bước: hàm trigger nhận hai biến đặc biệt `OLD` (giá trị trước) và `NEW` (giá trị sau). Ta so sánh `NEW.luong <> OLD.luong` để chỉ ghi khi lương thật sự thay đổi (tránh ghi rác khi update không đổi lương). `FOR EACH ROW` để chạy đúng một lần cho mỗi nhân viên bị ảnh hưởng.

### Bài 4 — Dự đoán thứ tự chạy

Thứ tự khi chạy `UPDATE tai_khoan SET so_du = so_du - 100 WHERE id = 1;`:

1. `trg_check` (`BEFORE UPDATE FOR EACH ROW`) chạy — tính `NEW.so_du = so_du - 100` và kiểm tra `< 0`.
2. Nếu hợp lệ: DBMS ghi giá trị mới xuống bảng `tai_khoan`.
3. `trg_log` (`AFTER UPDATE FOR EACH ROW`) chạy — đọc giá trị đã ghi và chèn dòng audit.

**Nếu `trg_check` ném lỗi** (vd `so_du` sẽ âm): câu `UPDATE` bị huỷ ngay tại bước 1, **không có bước 2 và 3** → `trg_log` **không chạy**. Toàn bộ thao tác rollback trong transaction, không dòng audit nào được ghi. Đây chính là lý do đặt kiểm tra ở `BEFORE`: chặn được *trước khi* dữ liệu kịp đổi và trước khi các `AFTER` trigger kịp phản ứng.

---

## 8. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — (1) view thường vs materialized view: sửa bảng gốc rồi xem view tự đổi còn materialized phải bấm `REFRESH`; (2) demo trigger: `INSERT`/`UPDATE`/`DELETE` tự sinh dòng trong `audit_log` theo thời gian thực; (3) bảng so sánh tương tác view vs materialized view (tốc độ đọc, độ tươi).

---

## Kết thúc Nhóm 2

Đây là bài cuối của **Nhóm 2 — Trung cấp**. Bạn đã đi qua chuẩn hóa, index, transaction & ACID, concurrency, query execution và giờ là view/procedure/trigger.

→ Tiếp theo, [Nhóm 3 — Nâng cao](../../03-Advanced/index.html): storage engine, NoSQL, replication & sharding, CAP, và data warehouse/OLAP — nơi materialized view ở bài này sẽ xuất hiện lại như một công cụ chủ lực.
