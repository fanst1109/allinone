# Lesson 03 — Transaction & ACID

> Nhóm 2 — Trung cấp · Lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **transaction (giao dịch)** là gì: một nhóm thao tác chạy theo nguyên tắc "tất cả hoặc không gì".
- Dùng được `BEGIN` / `COMMIT` / `ROLLBACK` với ví dụ SQL thật.
- Giải thích vì sao nếu **không** có transaction thì tiền có thể "bốc hơi" giữa chừng khi chuyển khoản.
- Nắm vững **ACID** — định nghĩa đủ 3 phần (là gì / vì sao cần / ví dụ số) cho từng chữ: **A**tomicity, **C**onsistency, **I**solation, **D**urability.
- Mô tả vòng đời trạng thái của một transaction: active → partially committed → committed, hoặc failed → aborted.

## Kiến thức tiền đề

- [Lesson 03 (Nhóm 1) — SQL cơ bản](../../01-Foundations/lesson-03-sql-co-ban/): biết viết `INSERT`, `UPDATE`, `SELECT`. Transaction là cách *gói* nhiều câu lệnh đó lại.
- Hữu ích: hiểu sơ về việc DBMS giải quyết bài toán *đồng thời* và *bền vững* ([Lesson 01 — Giới thiệu CSDL](../../01-Foundations/lesson-01-gioi-thieu-csdl/)).

---

## 1. Đặt vấn đề: chuyển tiền A → B

Bạn xây ứng dụng ngân hàng. Tài khoản A có **1.000.000đ**, tài khoản B có **500.000đ**. Khách yêu cầu chuyển **200.000đ** từ A sang B. Về mặt SQL, đó là **hai** câu lệnh:

```sql
UPDATE accounts SET balance = balance - 200000 WHERE id = 'A';  -- bước 1: trừ A
UPDATE accounts SET balance = balance + 200000 WHERE id = 'B';  -- bước 2: cộng B
```

> Câu hỏi cốt lõi: nếu **máy chủ sập ngay sau bước 1, trước bước 2**, thì sao? A đã bị trừ 200k nhưng B chưa nhận. **200.000đ vừa bốc hơi.** Ai chịu trách nhiệm đảm bảo "hoặc cả hai bước cùng xảy ra, hoặc không bước nào xảy ra"?

Câu trả lời là **transaction**. Cả bài này sẽ đóng câu hỏi đó bằng số cụ thể.

💡 **Trực giác.** Transaction giống một **lễ trao nhẫn cưới**: hoặc cả hai người cùng đeo nhẫn và thành vợ chồng, hoặc nghi lễ huỷ và không ai đeo gì. Không có chuyện một người đeo nhẫn còn người kia bỏ chạy giữa chừng mà vẫn "tính là cưới một nửa".

---

## 2. Transaction là gì?

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.** **Transaction (giao dịch)** là một **đơn vị công việc logic** gồm một hoặc nhiều thao tác đọc/ghi, được DBMS xử lý như **một khối không thể chia nhỏ**: hoặc toàn bộ thao tác có hiệu lực (`COMMIT`), hoặc không thao tác nào có hiệu lực (`ROLLBACK`).

**(b) Vì sao cần.** Một nghiệp vụ đời thực (chuyển tiền, đặt vé, trừ kho + ghi đơn) thường gồm *nhiều* câu lệnh SQL. Nếu mỗi câu chạy độc lập, sự cố giữa chừng (mất điện, lỗi mạng, vi phạm ràng buộc) để lại dữ liệu **dở dang** — sai về nghiệp vụ. Transaction gom các câu lệnh thành một khối "tất cả hoặc không gì" để loại bỏ trạng thái dở dang.

**(c) Ví dụ trực giác bằng số.** Chuyển 200k A→B. Trước: A=1.000.000, B=500.000, **tổng = 1.500.000**. Sau khi `COMMIT`: A=800.000, B=700.000, **tổng = 1.500.000** (không đổi). Nếu sập giữa chừng mà có transaction: `ROLLBACK` đưa về A=1.000.000, B=500.000, **tổng = 1.500.000**. Trong cả hai kết cục hợp lệ, tổng tiền luôn = 1.500.000.

### 2.2 Bốn ví dụ về một transaction

| Nghiệp vụ | Các thao tác trong transaction | Vì sao phải gói chung |
| --- | --- | --- |
| Chuyển tiền A→B | trừ A, cộng B | Không được trừ A mà quên cộng B |
| Đặt vé máy bay | giảm số ghế trống, tạo bản ghi vé, trừ tiền ví | Không được trừ tiền mà không có vé |
| Bán 1 sản phẩm | trừ tồn kho, tạo dòng hoá đơn | Không được ghi hoá đơn mà kho không giảm |
| Đổi mật khẩu + ghi log | cập nhật `password_hash`, chèn dòng `audit_log` | Hai việc phải cùng thành công để audit khớp thực tế |

### 2.3 Cú pháp: BEGIN / COMMIT / ROLLBACK

```sql
BEGIN;                                                           -- mở transaction
  UPDATE accounts SET balance = balance - 200000 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 200000 WHERE id = 'B';
COMMIT;                                                          -- chốt: cả hai thay đổi thành vĩnh viễn
```

Nếu giữa chừng phát hiện lỗi (ví dụ A không đủ tiền), ta huỷ tất cả:

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 200000 WHERE id = 'A';
  -- kiểm tra: nếu balance của A âm → lỗi nghiệp vụ
ROLLBACK;                                                        -- huỷ: mọi thay đổi trong khối biến mất
```

- `BEGIN` (hay `START TRANSACTION`): bắt đầu một transaction.
- `COMMIT`: chốt vĩnh viễn mọi thay đổi từ `BEGIN` tới giờ.
- `ROLLBACK`: huỷ toàn bộ thay đổi, đưa dữ liệu về đúng trạng thái trước `BEGIN`.

⚠ **Lỗi thường gặp.** Nhiều người tưởng *mỗi* câu `UPDATE` đơn lẻ chạy ngoài `BEGIN` thì "an toàn rồi". Thực tế ở chế độ auto-commit, mỗi câu là một transaction *riêng* — nên hai câu chuyển tiền chạy rời nhau **không** được bảo vệ chung: sập giữa hai câu vẫn mất tiền. Phải bọc **cả hai** trong cùng một `BEGIN ... COMMIT`.

---

## 3. Walk-through bằng số: có vs không có transaction

Trạng thái ban đầu: **A = 1.000.000**, **B = 500.000**, tổng = **1.500.000**.

### 3.1 Trường hợp KHÔNG có transaction (auto-commit từng câu), sập sau bước 1

| Bước | Thao tác | A | B | Tổng | Ghi chú |
| --- | --- | ---: | ---: | ---: | --- |
| 0 | (ban đầu) | 1.000.000 | 500.000 | 1.500.000 | hợp lệ |
| 1 | trừ A 200k → **commit ngay** | 800.000 | 500.000 | **1.300.000** | đã chốt! |
| — | 💥 máy sập trước bước 2 | 800.000 | 500.000 | **1.300.000** | **sai: mất 200k** |

Vì bước 1 đã tự commit, không còn gì để rollback. **200.000đ bốc hơi** — vi phạm nghiệp vụ.

### 3.2 Trường hợp CÓ transaction, sập sau bước 1

| Bước | Thao tác | A | B | Tổng | Ghi chú |
| --- | --- | ---: | ---: | ---: | --- |
| 0 | `BEGIN` | 1.000.000 | 500.000 | 1.500.000 | hợp lệ |
| 1 | trừ A 200k (chưa commit) | 800.000 | 500.000 | (tạm) | thay đổi *chưa* vĩnh viễn |
| — | 💥 máy sập trước `COMMIT` | — | — | — | DBMS tự `ROLLBACK` khi khởi động lại |
| sau khi khôi phục | trở về trạng thái trước `BEGIN` | **1.000.000** | **500.000** | **1.500.000** | **đúng: không mất tiền** |

Vì chưa `COMMIT`, mọi thay đổi dở dang bị huỷ. Tiền nguyên vẹn.

### 3.3 Trường hợp CÓ transaction, chạy trọn vẹn

| Bước | Thao tác | A | B | Tổng |
| --- | --- | ---: | ---: | ---: |
| 0 | `BEGIN` | 1.000.000 | 500.000 | 1.500.000 |
| 1 | trừ A 200k | 800.000 | 500.000 | (tạm) |
| 2 | cộng B 200k | 800.000 | 700.000 | (tạm) |
| 3 | `COMMIT` | **800.000** | **700.000** | **1.500.000** |

Kết quả hợp lệ, tổng không đổi.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao ở mục 3.1 không thể "rollback" lại bước 1?
2. Ở mục 3.2, tại thời điểm máy sập, B đã nhận tiền chưa? Sau khôi phục A bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Vì mỗi câu chạy auto-commit — bước 1 đã chốt vĩnh viễn ngay, không nằm trong một transaction mở nào để huỷ.
2. B chưa nhận (mới làm bước 1). Sau khôi phục, DBMS rollback transaction chưa commit → A trở về 1.000.000.
</details>

---

## 4. ACID — bốn tính chất bảo đảm của transaction

**ACID** là 4 tính chất mà một DBMS giao dịch hứa giữ cho mọi transaction. Ta định nghĩa đủ 3 phần cho từng chữ.

### 4.1 A — Atomicity (tính nguyên tử)

**(a) Là gì.** Một transaction là **không thể chia nhỏ**: hoặc *tất cả* thao tác trong nó cùng xảy ra, hoặc *không* thao tác nào xảy ra. Không có trạng thái "làm được một nửa".

**(b) Vì sao cần.** Nghiệp vụ gồm nhiều bước (trừ A, cộng B). Nếu một bước thành công còn bước kia thất bại, dữ liệu dở dang → sai. Atomicity loại bỏ "nửa vời" bằng cách `ROLLBACK` toàn bộ khi có lỗi.

**(c) Ví dụ số.** Chuyển 200k A→B, sập sau khi trừ A. Atomicity ⇒ rollback ⇒ A quay lại **1.000.000**, B vẫn **500.000**. Không tồn tại kết cục A=800.000 mà B=500.000.

⚠ Đừng nhầm "nguyên tử" với "nhanh" hay "một câu lệnh". Một transaction nguyên tử vẫn có thể gồm 100 câu UPDATE — điểm mấu chốt là *tất-cả-hoặc-không*, không phải số câu lệnh.

### 4.2 C — Consistency (tính nhất quán)

**(a) Là gì.** Transaction đưa database từ **một trạng thái hợp lệ** sang **một trạng thái hợp lệ khác**. Mọi **ràng buộc (constraint)** — khoá chính, khoá ngoại, `CHECK`, và các quy tắc nghiệp vụ — vẫn được giữ sau khi commit.

**(b) Vì sao cần.** Nếu một transaction để lại dữ liệu vi phạm ràng buộc (số dư âm, khoá ngoại trỏ vào dòng không tồn tại), những transaction sau sẽ dựa trên dữ liệu sai → lỗi lan rộng. Consistency là "luật bất biến" của hệ.

**(c) Ví dụ số.** Bất biến nghiệp vụ ở đây: *tổng tiền hai tài khoản không đổi*. Trước: 1.000.000 + 500.000 = **1.500.000**. Sau commit: 800.000 + 700.000 = **1.500.000** ✓. Nếu transaction chỉ trừ A mà quên cộng B (vi phạm Atomicity) thì tổng còn 1.300.000 → phá vỡ Consistency. Một ví dụ ràng buộc khác: `CHECK (balance >= 0)` — nếu A chỉ có 100k mà chuyển 200k, transaction bị từ chối, giữ trạng thái hợp lệ.

### 4.3 I — Isolation (tính cô lập)

**(a) Là gì.** Nhiều transaction chạy **song song** phải cho kết quả *như thể* chúng chạy **lần lượt** (tuần tự). Một transaction không "nhìn thấy" trạng thái dở dang của transaction khác.

**(b) Vì sao cần.** Khi hai người cùng rút tiền từ A một lúc, nếu không cô lập, cả hai có thể đọc cùng số dư 1.000.000 rồi mỗi người trừ 800.000 → A xuống −600.000 (rút quá số dư). Isolation ngăn các transaction giẫm chân nhau.

**(c) Ví dụ số.** A=1.000.000. T1 rút 800k, T2 rút 800k chạy song song. Nếu cô lập đúng: một transaction chạy trước (A→200.000), transaction sau đọc 200.000 → **bị từ chối** vì không đủ. Nếu *không* cô lập: cả hai đọc 1.000.000, cùng trừ → A = −600.000 (sai).

> Mức độ cô lập (isolation level: Read Committed, Repeatable Read, Serializable) và các lỗi đồng thời (dirty read, lost update, phantom) là chủ đề lớn, học chi tiết ở [Lesson 04 — Concurrency & Isolation](../lesson-04-concurrency-isolation/). Ở đây chỉ cần nắm *ý nghĩa*: song song mà vẫn đúng như tuần tự.

### 4.4 D — Durability (tính bền vững)

**(a) Là gì.** Một khi transaction đã `COMMIT`, thay đổi của nó là **vĩnh viễn** — tồn tại qua cả mất điện, crash, khởi động lại.

**(b) Vì sao cần.** Người dùng nhận thông báo "chuyển tiền thành công" rồi máy chủ sập 1 giây sau. Nếu dữ liệu chỉ ở RAM thì mất. Durability đảm bảo điều đã hứa (commit) không bị nuốt lời.

**(c) Ví dụ số / cơ chế.** Sau khi `COMMIT` chuyển 200k, A=800.000 và B=700.000 được ghi bền. Máy sập rồi bật lại: vẫn A=800.000, B=700.000. DBMS đạt được điều này nhờ **WAL (write-ahead log — log ghi-trước)**: ghi *ý định thay đổi* ra log trên đĩa **trước** khi áp vào dữ liệu chính, nên khi khởi động lại có thể *replay* các transaction đã commit nhưng chưa kịp ghi xong vào file dữ liệu.

> Cơ chế WAL và storage engine học sâu ở [Lesson 01 (Nhóm 3) — Storage Engine](../../03-Advanced/lesson-01-storage-engine/).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Atomicity và Consistency khác gì nhau?"* — Atomicity nói về *cách thực thi* (tất-cả-hoặc-không, dựa trên rollback). Consistency nói về *kết quả* (không vi phạm ràng buộc). Atomicity giúp đạt Consistency, nhưng Consistency còn cần cả ràng buộc do bạn khai báo + logic nghiệp vụ đúng.
- *"Đã commit rồi mà ổ cứng cháy thì sao?"* — Durability hứa "qua được crash phần mềm / mất điện", giả định phương tiện lưu trữ không hỏng vật lý. Chống hỏng đĩa là việc của sao lưu (backup) và replication, không phải ACID.
- *"WAL không làm chậm mọi commit à?"* — Có chi phí, nhưng ghi log tuần tự (append) nhanh hơn nhiều so với ghi rải rác vào file dữ liệu; và nhiều transaction có thể gộp ghi log (group commit).

📝 **Tóm tắt mục 4.** **A**tomicity = tất-cả-hoặc-không. **C**onsistency = giữ mọi ràng buộc, trạng thái hợp lệ → hợp lệ. **I**solation = song song nhưng kết quả như tuần tự. **D**urability = đã commit thì còn mãi (nhờ WAL). Bốn tính chất phối hợp để "chuyển tiền không bao giờ bốc hơi".

---

## 5. Vòng đời trạng thái của một transaction

Một transaction đi qua các trạng thái sau:

```
                 đọc/ghi xong
   ┌────────┐   tất cả thao tác   ┌──────────────────┐   COMMIT thành công   ┌───────────┐
   │ active │ ──────────────────> │ partially         │ ────────────────────> │ committed │
   └────────┘                     │ committed         │                       └───────────┘
        │                         └──────────────────┘
        │ gặp lỗi                          │ lỗi khi ghi xuống đĩa
        v                                  v
   ┌────────┐        rollback        ┌──────────┐
   │ failed │ ─────────────────────> │ aborted  │
   └────────┘                        └──────────┘
```

| Trạng thái | Ý nghĩa |
| --- | --- |
| **active** (đang hoạt động) | Transaction đang thực thi các câu lệnh đọc/ghi. |
| **partially committed** (commit một phần) | Thao tác cuối đã chạy xong, đang trong quá trình chốt (ghi log/đĩa) nhưng chưa hoàn tất. |
| **committed** (đã chốt) | `COMMIT` thành công, thay đổi vĩnh viễn (durable). |
| **failed** (thất bại) | Gặp lỗi (vi phạm ràng buộc, mất kết nối, crash) → không thể tiếp tục. |
| **aborted** (đã huỷ) | Đã `ROLLBACK` xong, database quay về trạng thái trước `BEGIN`. Có thể thử lại transaction mới. |

💡 **Trực giác.** *active* là "đang gói hàng", *partially committed* là "đã dán tem, đang đưa lên xe giao", *committed* là "khách đã nhận và ký", *failed* là "phát hiện hỏng hàng giữa chừng", *aborted* là "huỷ đơn, hoàn kho như chưa từng đặt".

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **Transaction là thứ giữ cho tiền không bốc hơi khi hệ thống crash giữa chừng.** Bất cứ thao tác nào "phải xảy ra trọn vẹn hoặc không gì cả" đều cần transaction.

| Tình huống thật | ACID đảm bảo gì |
|-----------------|-----------------|
| **Chuyển khoản (trừ A, cộng B)** | Atomicity — cả hai hoặc không gì; không bao giờ trừ mà quên cộng |
| **Đặt vé/giữ kho** | Isolation — hai người không cùng mua chỗ cuối |
| **Đăng ký + tạo profile + gửi mail** | Atomicity — rollback nếu một bước lỗi |
| **Crash giữa ghi** | Durability — đã commit thì còn sau khi mất điện (WAL) |
| **Constraint giữa các bảng** | Consistency — invariant luôn đúng trước/sau ([nối invariant](../../../Algorithms/lesson-04-correctness-invariant/)) |

### 6.1. Ví dụ cụ thể — chuyển khoản phải là một transaction

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;  -- cả hai cùng "thật"; nếu crash sau dòng 1 → ROLLBACK, A không mất tiền
```

Không có transaction: crash sau khi trừ A nhưng trước khi cộng B → **100 bốc hơi**. `BEGIN...COMMIT` đảm bảo Atomicity. Trong code app: ORM bọc bằng `db.Transaction(func(tx){...})` — mọi câu lệnh trong closure cùng commit/rollback.

> ⚠ **Bẫy — quên transaction cho thao tác nhiều bước.** Lỗi kinh điển: tạo user xong, tạo profile ở câu lệnh riêng; nếu tạo profile lỗi → user "mồ côi" không profile. Bọc trong transaction. Và nhớ: transaction giữ **lock** → giữ càng ngắn càng tốt; transaction dài (gọi API bên ngoài bên trong nó) gây nghẽn ([isolation/concurrency](../lesson-04-concurrency-isolation/)).

### 6.2. 📝 Tóm tắt mục 6

- Transaction = "trọn vẹn hoặc không gì": chuyển khoản, đặt vé, đăng ký nhiều bước.
- **A**tomicity (all-or-nothing), **C**onsistency (invariant), **I**solation (không đè nhau), **D**urability (còn sau crash, nhờ WAL).
- Bẫy: quên bọc thao tác nhiều bước → bản ghi mồ côi; transaction dài giữ lock → nghẽn.

## 7. Bài tập

1. **Xác định tính chất ACID bị vi phạm.** Với mỗi tình huống, ghi rõ chữ nào trong ACID bị vi phạm và giải thích một câu:
   - (a) Chuyển tiền: A bị trừ 200k nhưng do crash, B không được cộng; hệ thống không hoàn lại.
   - (b) Hệ thống báo "đặt vé thành công", nhưng sau khi máy chủ khởi động lại thì vé biến mất.
   - (c) Hai giao dịch rút tiền song song cùng đọc số dư cũ, kết quả số dư bị âm dù mỗi giao dịch riêng lẻ hợp lệ.
   - (d) Sau một transaction, một dòng `orders` trỏ tới `customer_id` không tồn tại trong bảng `customers`.

2. **Viết transaction SQL chuyển tiền có kiểm tra & rollback.** Viết khối `BEGIN ... COMMIT` chuyển **300.000đ** từ tài khoản `'A'` sang `'B'`, sao cho nếu số dư A sau khi trừ bị âm thì `ROLLBACK`. Giả định có bảng `accounts(id, balance)`.

3. **Tính số dư sau một dãy thao tác có abort.** A=1.000.000, B=500.000. Thực hiện lần lượt:
   - T1: `BEGIN`; A −= 200.000; B += 200.000; `COMMIT`.
   - T2: `BEGIN`; B −= 100.000; A += 100.000; `ROLLBACK`.
   - T3: `BEGIN`; A −= 50.000; B += 50.000; `COMMIT`.

   Hỏi A và B cuối cùng bằng bao nhiêu? Tổng có đổi không?

4. **Giải thích vì sao cần Atomicity.** Một bạn lập luận: "Cứ chạy hai câu UPDATE chuyển tiền liền nhau là đủ an toàn, xác suất crash đúng giữa hai câu rất nhỏ." Hãy phản biện bằng nguyên tắc đúng đắn (correctness), không phải xác suất.

---

## 8. Lời giải chi tiết

### Bài 1 — Xác định tính chất ACID bị vi phạm

| Tình huống | Vi phạm | Vì sao |
| --- | --- | --- |
| (a) A bị trừ, B không được cộng, không hoàn lại | **Atomicity** | Transaction "làm một nửa" — phải tất-cả-hoặc-không; lẽ ra rollback đưa A về cũ. |
| (b) Báo thành công rồi vé biến mất sau restart | **Durability** | Đã commit (báo thành công) mà không tồn tại qua crash. |
| (c) Hai giao dịch song song làm số dư âm | **Isolation** | Không cô lập → cùng đọc số dư cũ, giẫm chân nhau (lost update). |
| (d) `orders.customer_id` trỏ vào khách không tồn tại | **Consistency** | Vi phạm ràng buộc khoá ngoại — trạng thái không hợp lệ. |

### Bài 2 — Transaction SQL chuyển tiền có rollback

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 300000 WHERE id = 'A';

  -- Kiểm tra số dư A sau khi trừ. Nếu âm → huỷ toàn bộ.
  -- Cách 1 (đơn giản, dùng logic ứng dụng): SELECT balance FROM accounts WHERE id='A';
  --   nếu < 0 thì ROLLBACK; ngược lại tiếp tục.

  UPDATE accounts SET balance = balance + 300000 WHERE id = 'B';
COMMIT;
```

Phiên bản an toàn hơn dùng ràng buộc `CHECK` ngay ở schema để DBMS tự bảo vệ:

```sql
-- Khai báo một lần khi tạo bảng:
-- ALTER TABLE accounts ADD CONSTRAINT non_negative CHECK (balance >= 0);

BEGIN;
  UPDATE accounts SET balance = balance - 300000 WHERE id = 'A';  -- nếu A < 300k → vi phạm CHECK → lỗi
  UPDATE accounts SET balance = balance + 300000 WHERE id = 'B';
COMMIT;
-- Nếu câu UPDATE đầu tiên gây lỗi CHECK, transaction vào trạng thái failed;
-- ta gọi ROLLBACK (hoặc DBMS tự abort) → không mất tiền.
```

Ý chính: phép trừ A và phép cộng B phải nằm **cùng một transaction**; điều kiện "không âm" được kiểm tra trong khối đó, vi phạm thì `ROLLBACK` huỷ cả hai.

### Bài 3 — Tính số dư sau dãy thao tác có abort

Ban đầu: A=1.000.000, B=500.000, tổng=1.500.000.

| Bước | Kết quả | A | B | Tổng |
| --- | --- | ---: | ---: | ---: |
| T1 `COMMIT` (A−200k, B+200k) | có hiệu lực | 800.000 | 700.000 | 1.500.000 |
| T2 `ROLLBACK` (B−100k, A+100k) | **bị huỷ — không tính** | 800.000 | 700.000 | 1.500.000 |
| T3 `COMMIT` (A−50k, B+50k) | có hiệu lực | 750.000 | 750.000 | 1.500.000 |

**Kết quả: A = 750.000, B = 750.000.** Tổng vẫn = **1.500.000**, không đổi. Mấu chốt: T2 `ROLLBACK` nên mọi thay đổi của nó (B−100k, A+100k) bị huỷ hoàn toàn, *không* ảnh hưởng số dư.

### Bài 4 — Vì sao cần Atomicity (phản biện theo correctness)

Lập luận "xác suất crash nhỏ" sai về nguyên tắc, vì:

1. **Correctness không phải trò chơi xác suất.** Một hệ tài chính phải *luôn* đúng, không phải "đúng 99,99% lần". Một lần mất tiền là một lần sai không chấp nhận được, và ở quy mô hàng triệu giao dịch/ngày, xác suất "nhỏ" vẫn thành sự cố thật xảy ra đều đặn.
2. **Crash không phải nguyên nhân duy nhất.** Câu UPDATE thứ hai có thể *thất bại logic* (vi phạm ràng buộc, deadlock bị DBMS huỷ, mất kết nối) ngay cả khi máy không sập. Không có atomicity thì mọi lỗi giữa chừng đều để lại dữ liệu dở dang.
3. **Atomicity cho phép suy luận đơn giản.** Khi transaction là tất-cả-hoặc-không, lập trình viên chỉ cần lý giải hai kết cục (thành công trọn vẹn / không gì cả), thay vì vô số trạng thái dở dang. Đây là giá trị về tính đúng đắn lẫn bảo trì, không thể thay bằng "xác suất thấp".

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm: (1) mô phỏng chuyển tiền A→B so sánh **có vs không** transaction (lỗi giữa chừng → rollback khôi phục số dư), (2) sơ đồ trạng thái transaction highlight bước đang chạy, (3) bộ thẻ ACID bấm từng chữ xem giải thích + ví dụ.

---

## Bài tiếp theo

→ [Lesson 04 — Concurrency & Isolation](../lesson-04-concurrency-isolation/): khi nhiều transaction chạy song song — dirty read, lost update, phantom, và các isolation level (Read Committed, Repeatable Read, Serializable). Đào sâu chữ **I** trong ACID.
