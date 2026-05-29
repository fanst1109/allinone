// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/02-Intermediate/lesson-04-concurrency-isolation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Concurrency & Isolation (Đồng thời & Mức cô lập)

> Nhóm 2 — Trung cấp · Tiếp nối [Lesson 03 — Transaction & ACID](../lesson-03-transaction-acid/)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao chạy nhiều transaction song song lại nguy hiểm** nếu không kiểm soát, và "anomaly" (bất thường) nghĩa là gì.
- Nhận diện 4 loại anomaly đọc qua **lịch trình (schedule)** cụ thể với giá trị thật: **dirty read**, **non-repeatable read**, **phantom read**, **lost update**.
- Nắm 4 **mức cô lập (isolation level)** theo chuẩn SQL và biết mỗi mức ngăn được anomaly nào — cùng cái giá phải trả.
- Hiểu hai cơ chế thực thi: **khóa (locking)** kèm **two-phase locking (2PL)** & **deadlock**, và **MVCC (multi-version concurrency control)**.

## Kiến thức tiền đề

- [Lesson 03 — Transaction & ACID](../lesson-03-transaction-acid/): biết transaction là gì, atomicity, commit/rollback. Bài này đi sâu vào chữ **I** (Isolation).
- Hữu ích: hiểu thao tác đọc/ghi cơ bản trên một bảng.

---

## 1. Đặt vấn đề: hai người cùng rút tiền một lúc

Tài khoản có \`balance = 100\`. Cùng một khoảnh khắc, T1 rút 50 ở ATM, T2 rút 30 ở quầy. Nếu hai transaction chạy *xen kẽ* sai cách:

\`\`\`
balance ban đầu = 100
T1: đọc balance → 100
T2: đọc balance → 100        (T2 cũng thấy 100, chưa biết T1 sẽ rút)
T1: ghi balance = 100 - 50 = 50
T2: ghi balance = 100 - 30 = 70   (đè lên kết quả của T1!)
→ balance cuối = 70
\`\`\`

Ngân hàng rút tổng 80 nhưng số dư chỉ giảm 30. **Mất 50 vô hình** — đây là *lost update*. Cùng những thao tác đó, nếu chạy **lần lượt** (T1 xong rồi T2) thì kết quả đúng là \`100 − 50 − 30 = 20\`.

💡 **Trực giác.** Hai transaction song song giống hai người cùng sửa **một bảng trắng**: nếu không có quy tắc "ai cầm bút lúc nào", người sau xóa mất chữ người trước. Bài này nói về các quy tắc đó: vừa cho song song (nhanh) vừa giữ kết quả đúng *như thể* chạy lần lượt — gọi là **serializability (khả tuần tự)**.

❓ **Tại sao không cứ chạy lần lượt cho an toàn?** Một transaction có thể chờ I/O đĩa, chờ mạng. Nếu khóa cứng "mỗi lần một transaction" thì 1000 người dùng phải xếp hàng → hệ thống tê liệt. Mục tiêu là **song song tối đa mà kết quả vẫn đúng**.

---

## 2. Bốn anomaly khi chạy song song

Mỗi anomaly dưới đây kèm một **lịch trình** ghi rõ từng bước của T1 và T2 theo thời gian (đọc từ trên xuống).

### 2.1 Dirty read — đọc dữ liệu chưa commit

**(a) Là gì.** T2 đọc một giá trị mà T1 vừa ghi nhưng **chưa commit**. Nếu sau đó T1 *rollback*, thì T2 đã dùng một giá trị "ma" — chưa từng tồn tại thật.

**(b) Vì sao nguy hiểm.** T2 ra quyết định dựa trên dữ liệu sẽ bị hủy.

**(c) Lịch trình cụ thể** (\`balance\` ban đầu = 100):

| Thời điểm | T1 | T2 | Giá trị T2 thấy |
| :---: | --- | --- | :---: |
| t1 | \`UPDATE balance = 200\` (chưa commit) | | |
| t2 | | \`SELECT balance\` | **200** ← bẩn |
| t3 | \`ROLLBACK\` (balance về 100) | | |
| t4 | | dùng 200 để tính tiếp | sai! thực ra là 100 |

T2 tưởng số dư 200 và có thể cho rút 150, nhưng thật ra chỉ còn 100.

**4 ví dụ giá trị khác:** (1) T1 ghi \`stock = 0\` chưa commit → T2 đọc 0, từ chối bán, rồi T1 rollback về \`stock = 5\`. (2) T1 đặt \`status = 'paid'\` chưa commit → T2 gửi hàng → T1 rollback. (3) T1 ghi \`price = 1\` (lỗi) chưa commit → T2 đọc 1, bán giá 1đ. (4) T1 cộng điểm \`points = 1000\` chưa commit → T2 đổi quà → T1 rollback.

### 2.2 Non-repeatable read — đọc lại cùng một dòng ra giá trị khác

**(a) Là gì.** Trong cùng một transaction, T2 đọc một dòng **hai lần** và nhận **hai giá trị khác nhau**, vì giữa hai lần đọc có T1 đã commit thay đổi.

**(b) Vì sao là vấn đề.** T2 mong "trong cùng một transaction, thế giới đứng yên". Hai lần đọc khác nhau phá vỡ tính nhất quán của tính toán.

**(c) Lịch trình** (\`price\` ban đầu = 100):

| Thời điểm | T1 | T2 | Giá trị T2 thấy |
| :---: | --- | --- | :---: |
| t1 | | \`SELECT price\` (lần 1) | **100** |
| t2 | \`UPDATE price = 150\` | | |
| t3 | \`COMMIT\` | | |
| t4 | | \`SELECT price\` (lần 2) | **150** ← khác! |

Khác dirty read ở chỗ: ở đây T1 **đã commit** — giá trị mới là thật. Vấn đề là *cùng một dòng đọc hai lần ra hai số*.

**4 ví dụ:** (1) đọc \`balance\` 100 rồi 80 (người khác rút). (2) đọc \`stock\` 5 rồi 3. (3) đọc \`discount\` 10% rồi 20%. (4) đọc \`vote_count\` 41 rồi 42.

### 2.3 Phantom read — truy vấn lại ra thêm/bớt dòng

**(a) Là gì.** T2 chạy cùng một truy vấn *theo điều kiện* (\`WHERE ...\`) hai lần, lần sau có **thêm hoặc bớt dòng** ("bóng ma") vì T1 đã *insert/delete* một dòng khớp điều kiện rồi commit.

**(b) Khác non-repeatable read.** Non-repeatable: *cùng một dòng* đổi giá trị. Phantom: *tập hợp dòng* khớp điều kiện thay đổi (xuất hiện dòng mới).

**(c) Lịch trình** (đếm khách ở \`Hanoi\`, ban đầu có 3):

| Thời điểm | T1 | T2 | Kết quả T2 |
| :---: | --- | --- | :---: |
| t1 | | \`SELECT COUNT(*) WHERE city='Hanoi'\` | **3** |
| t2 | \`INSERT (name='Khoa', city='Hanoi')\` | | |
| t3 | \`COMMIT\` | | |
| t4 | | \`SELECT COUNT(*) WHERE city='Hanoi'\` | **4** ← bóng ma |

**4 ví dụ:** (1) \`COUNT\` đơn hàng > 1tr: 12 rồi 13. (2) liệt kê sản phẩm còn hàng: 8 dòng rồi 9. (3) tổng \`SUM(amount)\` giao dịch hôm nay đổi vì có dòng mới. (4) danh sách user đăng ký hôm nay: 50 rồi 51.

### 2.4 Lost update — mất cập nhật

**(a) Là gì.** Hai transaction cùng đọc một giá trị, cùng tính toán dựa trên nó, rồi cùng ghi đè — cập nhật của một bên **biến mất**. Đây là tình huống ở mục 1.

**(c) Lịch trình** (\`stock\` ban đầu = 10, mỗi bên bán bớt):

| Thời điểm | T1 (bán 4) | T2 (bán 3) | stock |
| :---: | --- | --- | :---: |
| t1 | \`read stock\` → 10 | | 10 |
| t2 | | \`read stock\` → 10 | 10 |
| t3 | \`write 10−4 = 6\` | | 6 |
| t4 | | \`write 10−3 = 7\` | **7** ← đè! |

Bán tổng 7 sản phẩm nhưng \`stock\` chỉ giảm 3 (từ 10 còn 7). Đúng phải là \`10 − 4 − 3 = 3\`.

⚠ **Lỗi thường gặp.** Nghĩ rằng "đọc rồi ghi trong cùng transaction là an toàn". KHÔNG — nếu hai transaction *đan xen* (đọc-đọc-ghi-ghi) thì vẫn mất update. Phải dùng khóa hoặc \`UPDATE stock = stock - 4\` (tính ngay trong DB) hoặc mức cô lập đủ cao.

🔁 **Dừng lại tự kiểm tra.**
1. Dirty read và non-repeatable read khác nhau ở điểm cốt lõi nào?
2. Phantom read khác non-repeatable read ở chỗ nào?

<details><summary>Đáp án</summary>

1. Dirty read: T2 đọc giá trị T1 **chưa commit** (có thể bị rollback → giá trị ma). Non-repeatable: T2 đọc lại giá trị T1 **đã commit** — giá trị thật nhưng đổi giữa hai lần đọc trong cùng T2.
2. Non-repeatable: *cùng một dòng* đổi giá trị. Phantom: *số lượng dòng* khớp \`WHERE\` thay đổi do insert/delete (dòng mới xuất hiện).
</details>

📝 **Tóm tắt mục 2.** Bốn anomaly: dirty (đọc cái chưa commit), non-repeatable (cùng dòng đọc hai lần khác nhau), phantom (số dòng khớp điều kiện đổi), lost update (hai ghi đè nhau). Tất cả sinh ra vì các thao tác đan xen mà không có quy tắc bảo vệ.

---

## 3. Bốn mức cô lập (isolation level) theo chuẩn SQL

Chuẩn SQL định nghĩa 4 mức, từ lỏng tới chặt. Mỗi mức ngăn thêm một loại anomaly:

| Mức cô lập | Dirty read | Non-repeatable read | Phantom read |
| --- | :---: | :---: | :---: |
| **READ UNCOMMITTED** | có thể xảy ra | có thể xảy ra | có thể xảy ra |
| **READ COMMITTED** | **ngăn** | có thể xảy ra | có thể xảy ra |
| **REPEATABLE READ** | **ngăn** | **ngăn** | có thể xảy ra* |
| **SERIALIZABLE** | **ngăn** | **ngăn** | **ngăn** |

> *Theo chuẩn SQL, REPEATABLE READ vẫn có thể có phantom. Trên thực tế, REPEATABLE READ của PostgreSQL (dùng snapshot MVCC) cũng ngăn được phantom; MySQL InnoDB dùng next-key lock cũng vậy. Chuẩn và hiện thực không trùng khít — đây là bẫy hay gặp.

💡 **Trực giác về đánh đổi.** Cô lập càng cao → bảo vệ càng nhiều anomaly → **kết quả càng đúng**, NHƯNG phải khóa nhiều hơn / giữ snapshot lâu hơn → **ít song song hơn, chậm hơn**. READ COMMITTED là mặc định của PostgreSQL và Oracle vì cân bằng tốt. SERIALIZABLE đúng nhất nhưng đắt nhất, dùng khi bắt buộc (chuyển tiền, kiểm kho chặt).

❓ **Câu hỏi tự nhiên.**
- *"Lost update nằm ở đâu trong bảng?"* — Chuẩn SQL không liệt nó như một dòng riêng, nhưng nó bị chặn từ REPEATABLE READ trở lên (vì transaction không thấy thay đổi của bên kia, và khi ghi sẽ xung đột → một bên phải rollback).
- *"Mức nào hay dùng nhất?"* — READ COMMITTED. Hiếm khi cần READ UNCOMMITTED (chỉ khi chấp nhận đọc bẩn để báo cáo gần đúng siêu nhanh).

**4 ví dụ chọn mức:** (1) thống kê "ước lượng" số đơn đang chờ, chấp nhận sai số → READ UNCOMMITTED. (2) hiển thị số dư tài khoản cho user xem → READ COMMITTED. (3) tính báo cáo cần đọc nhiều dòng nhất quán trong một transaction → REPEATABLE READ. (4) chuyển tiền liên ngân hàng, kiểm kho không được âm → SERIALIZABLE.

🔁 **Dừng lại tự kiểm tra.** Mức tối thiểu nào ngăn được dirty read? Còn non-repeatable read?

<details><summary>Đáp án</summary>

Dirty read: tối thiểu **READ COMMITTED**. Non-repeatable read: tối thiểu **REPEATABLE READ**.
</details>

📝 **Tóm tắt mục 3.** 4 mức tăng dần: READ UNCOMMITTED → READ COMMITTED (ngăn dirty) → REPEATABLE READ (ngăn thêm non-repeatable) → SERIALIZABLE (ngăn cả phantom). Cô lập cao = đúng hơn nhưng chậm/ít song song hơn.

---

## 4. Cơ chế thực thi (1): Khóa (locking) & 2PL

### 4.1 Shared lock và exclusive lock

💡 **Trực giác.** Khóa giống "biển báo trên cửa phòng": **shared lock (S — khóa chia sẻ, để đọc)** là biển "đang đọc, ai cũng vào đọc cùng được nhưng đừng sửa". **Exclusive lock (X — khóa độc quyền, để ghi)** là biển "đang sửa, cấm vào".

| | Bên kia muốn S (đọc) | Bên kia muốn X (ghi) |
| --- | :---: | :---: |
| **Đang giữ S** | ✓ cho phép (nhiều đọc song song) | ✗ phải chờ |
| **Đang giữ X** | ✗ phải chờ | ✗ phải chờ |

Nhiều đọc cùng lúc được; nhưng ghi thì độc quyền. Đây là cách ngăn dirty read và lost update: muốn ghi \`balance\`, T2 phải lấy X-lock, mà T1 đang giữ → T2 chờ tới khi T1 commit.

### 4.2 Two-phase locking (2PL — khóa hai pha)

Để đảm bảo **serializability**, mỗi transaction phải tuân thủ 2PL: chia làm 2 pha.

- **Pha tăng (growing):** chỉ *lấy thêm* khóa, không nhả khóa nào.
- **Pha giảm (shrinking):** sau khi nhả khóa đầu tiên, chỉ *nhả*, không lấy thêm.

Nói cách khác: **không bao giờ lấy một khóa mới sau khi đã nhả một khóa**. Biến thể phổ biến là **strict 2PL**: giữ mọi X-lock tới tận khi commit/rollback — đảm bảo không ai đọc dữ liệu chưa commit (ngăn dirty read).

**Walk-through 2PL ngăn lost update** (\`stock\` = 10):

| Thời điểm | T1 (bán 4) | T2 (bán 3) | Ghi chú |
| :---: | --- | --- | --- |
| t1 | lấy **X-lock** trên stock | | T1 giữ khóa ghi |
| t2 | \`read 10\` | xin X-lock → **bị chặn, chờ** | T2 không đan xen được |
| t3 | \`write 6\`, \`COMMIT\`, nhả X | | |
| t4 | | nhận X-lock, \`read 6\` | giờ mới đọc, thấy 6 |
| t5 | | \`write 6−3 = 3\`, \`COMMIT\` | **stock = 3** ✓ đúng |

Khóa ép T2 chờ → biến thực thi đan xen thành tuần tự thực sự → không mất update.

### 4.3 Deadlock (khóa chết) & cách xử lý

⚠ **Khóa sinh ra rủi ro mới: deadlock.** Hai transaction chờ nhau theo vòng tròn, không ai đi tiếp.

**Ví dụ kinh điển** (hai tài khoản A, B):

| Thời điểm | T1 | T2 |
| :---: | --- | --- |
| t1 | lấy X-lock **A** | |
| t2 | | lấy X-lock **B** |
| t3 | xin X-lock **B** → chờ T2 | |
| t4 | | xin X-lock **A** → chờ T1 |

T1 giữ A chờ B; T2 giữ B chờ A → vòng tròn chờ vĩnh viễn.

**Đồ thị wait-for (chờ):** vẽ mũi tên "ai chờ ai". Có **chu trình (cycle)** ⇒ deadlock.

\`\`\`
   T1  ──chờ B (T2 giữ)──▶  T2
    ▲                        │
    └────chờ A (T1 giữ)──────┘
\`\`\`

**Cách xử lý:**
- **Timeout:** transaction chờ quá ngưỡng (vd 1s) thì tự hủy (rollback) và thử lại. Đơn giản nhưng có thể hủy nhầm khi hệ thống chỉ chậm.
- **Deadlock detection (phát hiện):** DBMS định kỳ dựng đồ thị wait-for, tìm chu trình; nếu có, chọn một transaction làm **nạn nhân (victim)** — thường là cái rẻ nhất để rollback — và hủy nó để phá vòng. PostgreSQL dùng cách này.
- **Phòng ngừa:** quy ước luôn khóa tài nguyên theo cùng thứ tự (vd luôn khóa A trước B) → không bao giờ tạo được chu trình.

❓ *"Deadlock có làm hỏng dữ liệu không?"* — Không. DBMS rollback nạn nhân về trạng thái nhất quán, ứng dụng nhận lỗi và *thử lại*. Chỉ là mất một chút hiệu năng.

📝 **Tóm tắt mục 4.** S-lock cho đọc song song, X-lock cho ghi độc quyền. 2PL (đặc biệt strict 2PL) đảm bảo serializability. Cái giá: deadlock — xử lý bằng timeout hoặc detection (dựng đồ thị wait-for, tìm chu trình, hủy victim).

---

## 5. Cơ chế thực thi (2): MVCC — đọc không chặn ghi

### 5.1 Ý tưởng

💡 **Trực giác.** Thay vì khóa để cấm ghi khi có người đọc, **MVCC (multi-version concurrency control — điều khiển đồng thời nhiều phiên bản)** giữ **nhiều phiên bản** của một dòng. Giống Google Docs lưu lịch sử: người đọc xem một **bản chụp (snapshot)** tại thời điểm transaction bắt đầu, còn người ghi tạo phiên bản mới song song — **đọc không bao giờ chặn ghi, ghi không chặn đọc**.

### 5.2 Walk-through MVCC tránh chặn

\`balance = 100\`, T2 là transaction đọc dài, T1 ghi xen vào:

| Thời điểm | T1 (ghi) | T2 (đọc, snapshot lúc bắt đầu) | T2 thấy |
| :---: | --- | --- | :---: |
| t0 | | \`BEGIN\` → chốt snapshot | |
| t1 | | \`SELECT balance\` | **100** |
| t2 | \`UPDATE balance = 100→150\`, tạo *phiên bản mới* | | |
| t3 | \`COMMIT\` | | |
| t4 | | \`SELECT balance\` (lần 2, cùng T2) | **100** ← vẫn snapshot cũ |
| t5 | | \`COMMIT\` | |
| sau | | transaction mới đọc | **150** |

T2 không phải chờ T1 (không bị chặn), và trong suốt T2 luôn thấy **một thế giới nhất quán** (100) — đó là cách MVCC cho REPEATABLE READ mà vẫn song song cao. T1 cũng không phải chờ T2 đọc xong.

**4 điểm cụ thể về MVCC:**
1. Mỗi dòng mang dấu phiên bản (vd \`xmin\`/\`xmax\` trong PostgreSQL — transaction nào tạo/xóa).
2. Reader chọn phiên bản "hợp lệ với snapshot của mình", bỏ qua phiên bản do transaction chưa commit hoặc commit sau mình tạo.
3. UPDATE không sửa tại chỗ mà tạo dòng mới + đánh dấu dòng cũ chết → cần **vacuum/garbage collection** dọn rác phiên bản cũ.
4. PostgreSQL hiện thực MVCC ngay trong heap; chi tiết lưu trữ các phiên bản học ở [Storage Engine](../../03-Advanced/lesson-01-storage-engine/).

⚠ **Lỗi thường gặp.** Tưởng MVCC làm mọi anomaly biến mất. Không — MVCC ngăn dirty/non-repeatable read tốt, nhưng *lost update* vẫn có thể xảy ra dưới snapshot isolation nếu hai bên cùng update; DBMS phát hiện *write conflict* và bắt một bên rollback (lỗi \`serialization failure\`), ứng dụng phải thử lại.

🔁 **Dừng lại tự kiểm tra.** Vì sao trong MVCC "đọc không chặn ghi"?

<details><summary>Đáp án</summary>

Vì reader đọc một *phiên bản cũ* (snapshot tại lúc bắt đầu transaction), còn writer tạo *phiên bản mới* song song. Hai bên thao tác trên hai phiên bản khác nhau nên không tranh chấp khóa → không chặn nhau.
</details>

📝 **Tóm tắt mục 5.** MVCC giữ nhiều phiên bản; mỗi transaction đọc một snapshot nhất quán; đọc không chặn ghi và ngược lại → song song cao. Cái giá: tốn chỗ cho phiên bản cũ + cần dọn rác (vacuum). PostgreSQL dùng MVCC.

---

## 6. Bài tập

1. **Xác định anomaly.** Cho lịch trình (\`x\` ban đầu = 5):
   \`\`\`
   T1: read x → 5
   T2: write x = 8
   T2: COMMIT
   T1: read x → 8
   T1: COMMIT
   \`\`\`
   T1 đọc \`x\` hai lần ra hai giá trị. Đây là anomaly nào? Mức cô lập tối thiểu nào ngăn được nó?

2. **Chọn mức cô lập tối thiểu.** Một báo cáo cần \`SELECT COUNT(*) FROM orders WHERE status='pending'\` hai lần trong cùng transaction và *không được phép có dòng mới xen vào giữa* (nếu không số đếm lệch). Cần mức cô lập tối thiểu nào? Anomaly đang phòng là gì?

3. **Phát hiện deadlock.** Cho lịch trình trên hai dòng R1, R2:
   \`\`\`
   T1: X-lock R1
   T2: X-lock R2
   T1: xin X-lock R2  (chờ)
   T2: xin X-lock R1  (chờ)
   \`\`\`
   Vẽ đồ thị wait-for. Có deadlock không? Nếu có, nêu một cách DBMS phá nó.

4. **MVCC tránh chặn ra sao.** Transaction T_đọc chạy một báo cáo dài quét triệu dòng. Giữa lúc đó T_ghi muốn update một dòng trong bảng đó. Giải thích vì sao dưới MVCC, T_ghi **không phải chờ** T_đọc xong, và T_đọc vẫn nhận kết quả nhất quán.

---

## 7. Lời giải chi tiết

### Bài 1 — Xác định anomaly

- T1 đọc \`x\` lần 1 = 5, sau khi T2 commit \`x = 8\`, T1 đọc lại = 8. **Cùng một dòng, hai lần đọc trong cùng transaction ra hai giá trị khác nhau** → đây là **non-repeatable read**. (Không phải dirty read vì T2 đã COMMIT — giá trị 8 là thật.)
- Mức tối thiểu ngăn được: **REPEATABLE READ**. Ở mức này T1 chốt snapshot/giữ S-lock trên \`x\` tới hết transaction, nên lần đọc thứ hai vẫn ra 5.

### Bài 2 — Chọn mức cô lập tối thiểu

- Vấn đề: giữa hai lần \`COUNT(*)\` theo điều kiện \`WHERE status='pending'\`, có thể có dòng \`INSERT\` mới khớp điều kiện → đếm lệch. Đây là **phantom read**.
- Mức tối thiểu (theo chuẩn SQL) ngăn phantom là **SERIALIZABLE**. (Lưu ý thực tế: REPEATABLE READ của PostgreSQL với snapshot MVCC cũng đã ngăn phantom, nhưng theo *chuẩn* thì phải SERIALIZABLE — bài hỏi theo chuẩn nên trả lời SERIALIZABLE.)

### Bài 3 — Phát hiện deadlock

Đồ thị wait-for (mũi tên "X chờ Y"):

\`\`\`
   T1  ──chờ R2 (T2 giữ)──▶  T2
    ▲                         │
    └────chờ R1 (T1 giữ)──────┘
\`\`\`

- T1 giữ R1, xin R2 (do T2 giữ) → \`T1 → T2\`. T2 giữ R2, xin R1 (do T1 giữ) → \`T2 → T1\`.
- Có **chu trình** \`T1 → T2 → T1\` ⇒ **có deadlock**.
- Cách phá: DBMS phát hiện chu trình, chọn một **victim** (vd T2 — cái rẻ hơn để rollback), **rollback** nó để nhả R2; T1 lấy được R2 và chạy tiếp. Hoặc dùng **timeout**: transaction chờ quá ngưỡng tự hủy và thử lại. Phòng ngừa: luôn khóa theo thứ tự cố định (R1 trước R2) thì không tạo được chu trình.

### Bài 4 — MVCC tránh chặn

- Khi T_đọc \`BEGIN\`, nó chốt một **snapshot** — tập các phiên bản dòng "hợp lệ" tại thời điểm đó. Suốt báo cáo, T_đọc chỉ nhìn các phiên bản này.
- T_ghi \`UPDATE\` không sửa tại chỗ mà **tạo một phiên bản mới** của dòng, đánh dấu phiên bản cũ "chết từ transaction T_ghi". Phiên bản cũ vẫn còn cho ai đang dùng snapshot cũ.
- Vì T_đọc đọc *phiên bản cũ* còn T_ghi tạo *phiên bản mới*, hai bên thao tác trên hai bản khác nhau → **không tranh chấp X-lock** → T_ghi commit ngay, không chờ T_đọc.
- T_đọc vẫn nhất quán vì nó bỏ qua phiên bản mới (do T_ghi commit *sau* snapshot của T_đọc). Cái giá: phiên bản cũ tồn tại tới khi không còn ai cần → cần **vacuum** dọn rác.

---

## 8. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — (1) mô phỏng hai transaction T1/T2 song song bấm từng bước để thấy anomaly với giá trị thật, (2) bảng isolation level × anomaly bấm chọn để highlight cái nào được ngăn, (3) đồ thị wait-for SVG phát hiện deadlock.

---

## Liên kết & Bài tiếp theo

- Nền tảng transaction: [Lesson 03 — Transaction & ACID](../lesson-03-transaction-acid/).
- Lưu trữ các phiên bản cho MVCC: [Storage Engine — Nhóm 3](../../03-Advanced/lesson-01-storage-engine/).
- → [Lesson 05 — Query Execution](../lesson-05-query-execution/): DBMS biến một câu SQL thành kế hoạch thực thi (query plan) ra sao.
`;
