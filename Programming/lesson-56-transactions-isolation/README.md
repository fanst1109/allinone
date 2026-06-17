# Lesson 56 — Transaction & Isolation Level

> Tier 5 — Database & Storage · Lesson 56
>
> Hai người cùng rút tiền từ một tài khoản đúng một mili-giây như nhau. Hai khách
> cùng đặt chiếc ghế máy bay cuối cùng. Một transaction crash giữa lúc trừ tiền tài
> khoản A nhưng chưa kịp cộng cho B. Đây là những tình huống mà **transaction** và
> **isolation level** sinh ra để xử lý. Bài này giải thích từ ACID đến deadlock,
> kèm code Go chạy được và 3 module minh họa tương tác.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được 4 tính chất **ACID** bằng ví dụ cụ thể, không chỉ định nghĩa khô khan.
- Viết transaction trong Go đúng pattern: `Begin` → `Exec` → `Commit`/`Rollback`, với `defer rollback`.
- Phân biệt 4 **isolation level** SQL standard và 3 **anomaly** (dirty / non-repeatable / phantom read).
- Đọc và viết được bảng "level × anomaly" mà không cần tra cứu.
- Dùng `SELECT ... FOR UPDATE`, optimistic lock (version column), hiểu khi nào dùng cái nào.
- Hiểu deadlock xảy ra thế nào và sửa bằng **lock ordering** + **retry**.
- Tránh các pitfall kinh điển: quên rollback, long transaction, external call trong tx.

## Kiến thức tiền đề

- [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/README.md): `db.Exec`, `db.Query`, connection pool.
- [Lesson 55 — ORM vs Raw SQL](../lesson-55-orm-vs-raw/README.md): cách map struct ↔ row.
- [Lesson 28 — Sync primitives](../lesson-28-sync-primitives/README.md): mutex, race condition — transaction là phiên bản "cấp DB" của những vấn đề concurrency đã gặp ở mức goroutine.

---

## 1. ACID — bốn tính chất của một transaction tốt

> 💡 **Trực giác.** Hãy hình dung transaction như một **phong bì niêm phong** chứa nhiều
> thao tác. Hoặc cả phong bì được mở và áp dụng trọn vẹn, hoặc không gì cả. Người
> ngoài không bao giờ nhìn thấy nửa chừng bên trong. Khi đã niêm phong (commit) thì
> nội dung không bao giờ mất. ACID chính là 4 lời hứa này được phát biểu chính xác.

ACID là viết tắt của **A**tomicity, **C**onsistency, **I**solation, **D**urability.

### 1.1 Atomicity (Tính nguyên tử) — "tất cả hoặc không gì cả"

**(a) Là gì.** Một transaction gồm nhiều câu lệnh. Atomicity đảm bảo: hoặc **toàn bộ**
câu lệnh được áp dụng, hoặc **không câu nào** được áp dụng. Không có trạng thái "nửa
vời".

**(b) Vì sao cần.** Vì các thao tác nghiệp vụ thường gồm nhiều bước phụ thuộc nhau.
Chuyển tiền = trừ A **và** cộng B. Nếu chỉ làm một nửa, tiền biến mất hoặc nhân đôi.

**(c) Ví dụ số cụ thể.** A có 100đ, B có 50đ. Chuyển 30đ từ A sang B gồm 2 lệnh:

```sql
UPDATE accounts SET balance = balance - 30 WHERE id = 'A';  -- A: 100 → 70
UPDATE accounts SET balance = balance + 30 WHERE id = 'B';  -- B: 50  → 80
```

Nếu server crash **ngay sau lệnh 1**: A = 70, B = 50 → mất 30đ. Atomicity bảo: khi
crash, transaction chưa commit sẽ bị **rollback** → A quay về 100, B vẫn 50. Tổng tiền
hệ thống (`A + B = 150`) được bảo toàn.

### 1.2 Consistency (Tính nhất quán) — "không vi phạm ràng buộc"

**(a) Là gì.** Transaction chuyển DB từ một trạng thái hợp lệ sang một trạng thái hợp
lệ khác. "Hợp lệ" = thỏa mọi ràng buộc: `CHECK`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL`,
và các bất biến nghiệp vụ (vd: số dư không âm).

**(b) Vì sao cần.** Để DB không bao giờ rơi vào trạng thái "không thể có thật". Vd: một
đơn hàng trỏ tới `customer_id` không tồn tại.

**(c) Ví dụ.** Có ràng buộc `CHECK (balance >= 0)`. Nếu A chỉ có 20đ mà transaction cố
trừ 30đ → balance = −10 → vi phạm CHECK → DB **từ chối** commit, rollback toàn bộ. Trạng
thái sau transaction luôn là `balance >= 0`.

> ⚠ **Lỗi thường gặp.** Consistency trong ACID **không** giống "consistency" trong CAP
> theorem (Lesson 67). ACID-C nói về ràng buộc trong một DB; CAP-C nói về việc các bản
> sao (replica) thấy cùng dữ liệu. Đừng lẫn lộn — đây là hai khái niệm khác nhau dùng
> chung một từ.

### 1.3 Isolation (Tính cô lập) — "transaction không giẫm chân nhau"

**(a) Là gì.** Khi nhiều transaction chạy đồng thời, kết quả phải **như thể** chúng chạy
tuần tự (lần lượt). Một transaction không nhìn thấy trạng thái dở dang của transaction
khác.

**(b) Vì sao cần.** Server thật phục vụ hàng nghìn request đồng thời. Nếu T1 đang trừ
tiền A mà T2 đọc thấy số dư "nửa chừng", T2 ra quyết định sai.

**(c) Ví dụ.** T1 đang chuyển 30đ A→B nhưng chưa commit. T2 đọc tổng `A + B`. Nếu
isolation kém, T2 có thể thấy `A = 70, B = 50` → tổng 120đ (sai, "mất" 30đ giữa chừng).
Isolation tốt: T2 thấy hoặc `150` (trước) hoặc `150` (sau), không bao giờ `120`.

Đây là phần **phức tạp nhất** của ACID — có tới 4 mức độ (isolation level), trade-off
giữa đúng và nhanh. Cả mục 4-5 dưới đây dành riêng cho nó.

### 1.4 Durability (Tính bền vững) — "đã commit thì không mất"

**(a) Là gì.** Một khi transaction đã **commit thành công**, thay đổi tồn tại vĩnh viễn,
kể cả khi server mất điện ngay sau đó.

**(b) Vì sao cần.** Khách hàng nhận thông báo "chuyển tiền thành công" rồi server sập —
tiền không được phép quay lại trạng thái cũ.

**(c) Cơ chế.** DB ghi thay đổi vào **WAL (Write-Ahead Log)** trên đĩa **trước khi** báo
commit thành công. Khi khởi động lại sau crash, DB đọc WAL và "replay" các transaction đã
commit. Vì vậy `Commit()` trả về nil = dữ liệu đã nằm an toàn trên đĩa (hoặc được
fsync).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Chuyển tiền crash sau khi trừ A. Tính chất nào cứu ta?
> 2. `balance` xuống âm bị từ chối — tính chất nào?
>
> <details><summary>Đáp án</summary>
>
> 1. **Atomicity** — rollback nửa chừng. 2. **Consistency** — ràng buộc CHECK.
> </details>

> 📝 **Tóm tắt mục 1.**
> - **A**tomicity: tất-cả-hoặc-không (rollback nửa chừng).
> - **C**onsistency: không vi phạm ràng buộc/bất biến.
> - **I**solation: transaction đồng thời như thể chạy tuần tự.
> - **D**urability: đã commit thì sống sót qua crash (nhờ WAL).

---

## 2. Transaction trong Go

`database/sql` cung cấp API transaction qua type `*sql.Tx`.

```go
tx, err := db.Begin()           // mở transaction, mượn 1 connection từ pool
if err != nil {
    return err
}
defer tx.Rollback()             // (1) an toàn — rollback nếu chưa commit

_, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, from)
if err != nil {
    return err                  // defer tx.Rollback() chạy → hủy bỏ
}
_, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to)
if err != nil {
    return err
}

return tx.Commit()              // (2) chốt thay đổi
```

### 2.1 Pattern `defer tx.Rollback()` — vì sao luôn dùng

`tx.Rollback()` **sau khi đã commit** trả về lỗi `sql.ErrTxDone` nhưng **không gây hại**:
transaction đã đóng, rollback là no-op. Vì vậy đặt `defer tx.Rollback()` ngay sau `Begin`
là an toàn tuyệt đối:

- Nếu code `return err` giữa chừng → defer rollback hủy transaction. **Không leak.**
- Nếu code chạy tới `tx.Commit()` thành công → defer rollback là no-op vô hại.

> ⚠ **Lỗi thường gặp.** Quên `defer tx.Rollback()` rồi `return` sớm khi lỗi → transaction
> không bao giờ đóng → **connection không trả về pool** → connection leak → pool cạn →
> toàn app treo. Đây là một trong những bug production phổ biến nhất với database/sql.

### 2.2 Quy tắc: chỉ dùng `tx` bên trong transaction

Sau khi `Begin()`, **mọi** câu lệnh thuộc transaction phải gọi qua `tx.Exec` / `tx.Query`,
**không** qua `db.Exec`. Vì `db` lấy một connection **khác** từ pool → câu lệnh đó nằm
ngoài transaction, không được rollback chung.

> 🔁 **Dừng lại tự kiểm tra.** `tx.Rollback()` gọi sau `tx.Commit()` thành công có crash
> app không?
>
> <details><summary>Đáp án</summary>
> Không. Nó trả về <code>sql.ErrTxDone</code> và là no-op. Vì vậy <code>defer tx.Rollback()</code>
> luôn an toàn.</details>

---

## 3. Vì sao cần transaction — câu chuyện chuyển tiền

Đặt vấn đề cụ thể: **chuyển 30đ từ A sang B**. A=100, B=50.

### 3.1 Không có transaction — thảm họa

```go
db.Exec("UPDATE accounts SET balance = balance - 30 WHERE id = 'A'") // A: 100→70
// ⚡ server crash / panic / mất điện ngay tại đây
db.Exec("UPDATE accounts SET balance = balance + 30 WHERE id = 'B'") // không bao giờ chạy
```

Kết quả: **A=70, B=50. Tổng = 120đ. Mất 30đ.** Lệnh 1 đã commit độc lập (autocommit),
không có gì hoàn tác được. Tiền bốc hơi.

### 3.2 Có transaction — an toàn

```go
tx, _ := db.Begin()
tx.Exec("UPDATE accounts SET balance = balance - 30 WHERE id = 'A'") // A: 100→70 (chưa thật)
// ⚡ crash tại đây → transaction CHƯA commit → DB tự rollback khi restart
tx.Exec("UPDATE accounts SET balance = balance + 30 WHERE id = 'B'")
tx.Commit() // chỉ tới đây cả 2 thay đổi mới "thật"
```

Crash trước `Commit()` → khi DB khởi động lại, transaction dở dang bị **rollback** → A
quay về 100. **Tổng vẫn 150đ.** Không mất tiền.

### 3.3 Còn thiếu gì? Kiểm tra số dư

Transaction lo atomicity, nhưng nghiệp vụ cần thêm: **A phải đủ tiền**. Phải kiểm tra
**trong** transaction:

```go
var balance int
tx.QueryRow("SELECT balance FROM accounts WHERE id = 'A'").Scan(&balance)
if balance < 30 {
    return errors.New("không đủ số dư") // defer rollback → hủy
}
```

Nhưng kiểm tra này có một cái bẫy concurrency — nếu T2 cũng rút tiền A cùng lúc, cả hai
đọc thấy "đủ" rồi cả hai trừ → âm tiền. Đây chính là lý do cần **isolation level** và
**locking** (mục 4, 7).

> 📝 **Tóm tắt mục 3.** Transaction biến nhiều lệnh thành một đơn vị nguyên tử. Không có
> nó, crash giữa chừng = dữ liệu hỏng. Nhưng atomicity một mình chưa đủ cho concurrency —
> cần thêm isolation.

---

## 4. Isolation level — 4 mức của SQL standard

> 💡 **Trực giác.** Isolation level là **núm xoay đánh đổi giữa "đúng" và "nhanh"**. Vặn
> chặt (Serializable) → mọi transaction như xếp hàng lần lượt, an toàn tuyệt đối nhưng
> chậm. Vặn lỏng (Read Uncommitted) → cho phép nhìn trộm nhau, nhanh nhưng dễ sai. Bốn
> nấc của núm xoay tương ứng với việc cho phép bao nhiêu **anomaly** xảy ra.

SQL standard định nghĩa 4 mức, từ lỏng đến chặt:

| Level | Dirty read | Non-repeatable read | Phantom read |
|-------|:---:|:---:|:---:|
| **Read Uncommitted** | ❌ cho phép | ❌ cho phép | ❌ cho phép |
| **Read Committed** | ✅ chặn | ❌ cho phép | ❌ cho phép |
| **Repeatable Read** | ✅ chặn | ✅ chặn | ❌ cho phép* |
| **Serializable** | ✅ chặn | ✅ chặn | ✅ chặn |

`✅ chặn` = anomaly không xảy ra. `❌ cho phép` = anomaly có thể xảy ra.

\* **Lưu ý quan trọng:** Postgres ở mức Repeatable Read (dùng snapshot MVCC) **cũng chặn
phantom read**, nghiêm ngặt hơn chuẩn SQL. MySQL/InnoDB RR chặn phantom cho range query
nhờ next-key lock. Bảng trên là chuẩn lý thuyết; engine thật thường mạnh hơn.

### 4.1 Default của từng engine

- **PostgreSQL**: mặc định **Read Committed**.
- **MySQL (InnoDB)**: mặc định **Repeatable Read**.
- **SQL Server / Oracle**: mặc định **Read Committed**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao không luôn dùng Serializable cho chắc?"* → Vì nó chậm và dễ sinh
>   serialization failure (phải retry). Chỉ dùng cho nghiệp vụ thực sự cần (tiền bạc, tồn
>   kho). Đa số đọc-ghi thường Read Committed là đủ.
> - *"Read Uncommitted dùng làm gì?"* → Gần như không dùng trong production. Postgres
>   thậm chí không hỗ trợ thật — yêu cầu Read Uncommitted được nâng lên Read Committed.
> - *"Đổi level có cần đổi code không?"* → Chỉ đổi 1 dòng `TxOptions` (mục 6). Nhưng phải
>   thêm logic retry vì level cao sinh lỗi serialization.

---

## 5. Ba anomaly — đọc kỹ từng cái bằng ví dụ số

### 5.1 Dirty read — đọc dữ liệu CHƯA commit

T1 sửa dữ liệu nhưng **chưa commit**; T2 đọc thấy giá trị đó; rồi T1 **rollback**. T2 đã
đọc một giá trị **không bao giờ tồn tại thật**.

```
A = 100
T1: UPDATE balance = 70  (chưa commit)
                              T2: SELECT balance → đọc 70  ← DIRTY!
T1: ROLLBACK              (A quay về 100)
                              T2: đã dựa trên 70 để quyết định → SAI
```

Chỉ **Read Uncommitted** cho phép. Mọi level từ Read Committed trở lên đều chặn.

### 5.2 Non-repeatable read — đọc lại cùng row ra giá trị KHÁC

Trong **cùng một transaction** T1, đọc row X hai lần ra hai giá trị khác nhau, vì T2 đã
commit thay đổi ở giữa.

```
T1: SELECT balance WHERE id=A → 100
                              T2: UPDATE balance=200 WHERE id=A; COMMIT
T1: SELECT balance WHERE id=A → 200   ← cùng query, khác kết quả! Không "repeatable".
```

**Read Committed** cho phép (vì nó luôn đọc bản committed mới nhất). **Repeatable Read**
chặn (T1 thấy snapshot cố định từ lúc bắt đầu).

### 5.3 Phantom read — đọc lại cùng QUERY ra số ROW khác

Giống non-repeatable nhưng về **tập hợp row**: chạy lại cùng query với điều kiện range,
số row trả về khác vì T2 đã `INSERT`/`DELETE` row thỏa điều kiện.

```
T1: SELECT count(*) WHERE balance > 50 → 3 rows
                              T2: INSERT account balance=80; COMMIT
T1: SELECT count(*) WHERE balance > 50 → 4 rows   ← "bóng ma" xuất hiện!
```

Chuẩn SQL: chỉ **Serializable** chặn. Thực tế: Postgres RR và MySQL RR cũng chặn (xem
ghi chú mục 4).

> ⚠ **Phân biệt non-repeatable vs phantom.** Non-repeatable = **giá trị** của row đã có
> thay đổi. Phantom = **số lượng** row trong tập kết quả thay đổi (row mới xuất hiện/biến
> mất). Cùng là "đọc lại ra khác" nhưng một cái về cell, một cái về tập row.

> 🔁 **Dừng lại tự kiểm tra.** Ở Read Committed, đọc cùng row 2 lần có thể ra khác nhau
> không? Đọc số row có thể khác không?
>
> <details><summary>Đáp án</summary>
> Cả hai đều CÓ THỂ khác (non-repeatable + phantom đều được phép ở Read Committed). Read
> Committed chỉ đảm bảo không đọc dữ liệu chưa-commit (no dirty read).</details>

> 📝 **Tóm tắt mục 5.**
> - **Dirty**: đọc data chưa commit (rồi nó rollback). Chỉ Read Uncommitted dính.
> - **Non-repeatable**: đọc lại 1 row → giá trị khác. Read Committed dính.
> - **Phantom**: đọc lại 1 query → số row khác. Chuẩn SQL: chỉ Serializable chặn.

---

## 6. Set isolation level trong Go

Dùng `BeginTx` thay cho `Begin`, truyền `sql.TxOptions`:

```go
ctx := context.Background()
tx, err := db.BeginTx(ctx, &sql.TxOptions{
    Isolation: sql.LevelSerializable, // hoặc LevelReadCommitted, LevelRepeatableRead...
    ReadOnly:  false,
})
```

Các hằng có sẵn trong `database/sql`:

```go
sql.LevelDefault          // dùng default của engine
sql.LevelReadUncommitted
sql.LevelReadCommitted
sql.LevelWriteCommitted   // ít engine hỗ trợ
sql.LevelRepeatableRead
sql.LevelSnapshot         // SQL Server
sql.LevelSerializable
sql.LevelLinearizable     // hiếm
```

`ReadOnly: true` cho phép engine tối ưu (vd Postgres dùng read-only snapshot, không lock
ghi). Dùng cho transaction chỉ đọc nhiều row mà cần nhất quán.

> ⚠ Driver có thể trả lỗi nếu engine không hỗ trợ level yêu cầu. Postgres nâng
> `LevelReadUncommitted` thành Read Committed thay vì báo lỗi.

---

## 7. Locking — cách DB cưỡng chế isolation

Isolation level cao được cài đặt bằng **lock** (hoặc MVCC snapshot). Ngoài ra bạn có thể
**chủ động khóa** bằng các câu lệnh sau.

### 7.1 `SELECT ... FOR UPDATE` — pessimistic write lock

Khóa các row được chọn để **không transaction nào khác** đọc-để-ghi hay sửa chúng cho
đến khi transaction hiện tại kết thúc.

```sql
BEGIN;
SELECT balance FROM accounts WHERE id = 'A' FOR UPDATE; -- khóa row A
-- giờ chắc chắn không ai khác chen vào sửa A
UPDATE accounts SET balance = balance - 30 WHERE id = 'A';
COMMIT; -- nhả khóa
```

Dùng khi: **đọc rồi quyết định ghi** dựa trên giá trị vừa đọc (read-modify-write). Ngăn
được race "cả hai cùng thấy đủ tiền rồi cùng trừ".

### 7.2 `SELECT ... FOR SHARE` — read lock

Khóa row ở chế độ **chia sẻ**: nhiều transaction cùng `FOR SHARE` được, nhưng không ai
được `UPDATE`/`FOR UPDATE` cho tới khi tất cả nhả. Dùng khi: cần đảm bảo row không bị đổi
trong khi mình còn đọc, nhưng cho phép nhiều reader song song.

### 7.3 Optimistic lock — version column (không khóa)

Thay vì khóa, ta **giả định không có xung đột** và **kiểm tra lúc ghi**. Thêm cột
`version`:

```sql
-- đọc: lấy luôn version hiện tại
SELECT balance, version FROM accounts WHERE id = 'A'; -- balance=100, version=7

-- ghi: chỉ thành công nếu version chưa đổi
UPDATE accounts
SET balance = 70, version = version + 1
WHERE id = 'A' AND version = 7;
```

Nếu `UPDATE` trả về **0 rows affected** → ai đó đã sửa A (version đã thành 8) → **conflict**
→ ta đọc lại và retry. Không hề khóa row → không deadlock, tốt cho low-contention.

> 💡 **Trực giác optimistic vs pessimistic.** Pessimistic = "khóa cửa trước khi vào, ai
> tới sau phải đợi". Optimistic = "cứ vào làm, lúc ra mới kiểm tra có ai đụng đồ của mình
> không; nếu có thì làm lại". Ít người tranh chấp → optimistic nhanh hơn (không ai phải
> đợi). Nhiều người tranh chấp → optimistic retry liên tục, lúc đó pessimistic tốt hơn.

> 📝 **Tóm tắt mục 7.** `FOR UPDATE` = khóa ghi (pessimistic). `FOR SHARE` = khóa đọc.
> Optimistic = version column, không khóa, check-on-write, retry nếu conflict.

---

## 8. Deadlock — khi hai transaction khóa nhau

> 💡 **Trực giác.** Hai người đi qua hành lang hẹp ngược chiều, mỗi người bước sang một
> bên — nhưng cùng bên đối nghịch nhau. Mỗi người đợi người kia nhường. Nếu không ai chịu
> lùi, cả hai kẹt mãi. Đó là deadlock.

### 8.1 Kịch bản tạo deadlock

Hai transaction khóa hai row **theo thứ tự ngược nhau**:

```
T1: lock A ✓          T2: lock B ✓
T1: muốn lock B  ⏳    T2: muốn lock A  ⏳
     (B đang bị T2 giữ)      (A đang bị T1 giữ)
→ T1 đợi T2, T2 đợi T1 → DEADLOCK
```

### 8.2 DB tự phát hiện và phá

DB có cơ chế **deadlock detection**: định kỳ dựng đồ thị "ai đợi ai" (wait-for graph),
nếu phát hiện chu trình → chọn một transaction làm **victim** và **abort** nó (rollback),
giải phóng khóa cho transaction kia đi tiếp. Postgres trả lỗi:

```
ERROR: deadlock detected
SQLSTATE 40P01
```

MySQL trả `Error 1213`. Ứng dụng nhận lỗi này phải **retry** transaction bị abort.

### 8.3 Fix 1 — Lock ordering (phòng bệnh hơn chữa)

Nếu **mọi** transaction luôn khóa các row theo **cùng một thứ tự** (vd luôn theo `id` tăng
dần), không bao giờ có chu trình → không bao giờ deadlock.

```go
// Sai: khóa theo thứ tự người dùng truyền vào (from, to bất kỳ)
lock(from); lock(to)

// Đúng: luôn khóa id nhỏ trước
a, b := from, to
if a > b { a, b = b, a } // sắp xếp
lock(a); lock(b)         // mọi transaction cùng thứ tự → không chu trình
```

Trong transfer A↔B: T1 chuyển A→B và T2 chuyển B→A nếu cùng "khóa id nhỏ trước" thì cả
hai đều khóa A trước rồi B → T2 chỉ đợi T1 xong, không khóa chéo.

### 8.4 Fix 2 — Retry on deadlock

Lock ordering không phải lúc nào cũng khả thi (vd query động). Bổ sung: bắt lỗi deadlock
và **thử lại** với backoff:

```go
for attempt := 0; attempt < maxRetry; attempt++ {
    err := doTransaction()
    if err == nil { return nil }
    if isDeadlock(err) || isSerializationFailure(err) {
        time.Sleep(backoff(attempt)) // exponential backoff + jitter
        continue                     // thử lại
    }
    return err // lỗi khác → không retry
}
```

> 📝 **Tóm tắt mục 8.** Deadlock = hai tx khóa ngược thứ tự → đợi vòng. DB detect + abort
> 1 victim. Fix: (1) lock ordering — phòng; (2) retry on deadlock — chữa.

---

## 9. Optimistic vs Pessimistic — chọn cái nào?

| Tiêu chí | Pessimistic (`FOR UPDATE`) | Optimistic (version) |
|----------|----------------------------|----------------------|
| Cơ chế | Khóa row trước khi sửa | Không khóa, check version lúc ghi |
| An toàn | Cao — không ai chen vào | Cao — conflict bị từ chối |
| Tốc độ khi ít tranh chấp | Chậm hơn (vẫn phải lấy lock) | Nhanh (không lock, không đợi) |
| Tốc độ khi nhiều tranh chấp | Ổn (xếp hàng tuần tự) | Tệ (retry liên tục) |
| Deadlock | Có rủi ro | Không (không giữ lock) |
| Lock giữ lâu | Có thể chặn người khác | Không chặn ai |
| Phù hợp | Tài chính, tồn kho hot | Sửa profile, ít va chạm |

**Quy tắc ngón tay cái:**

- **Pessimistic** khi: xác suất tranh chấp cao (mọi người tranh 1 row), hậu quả sai nặng
  (tiền), cần đảm bảo ghi thành công ngay lần đầu.
- **Optimistic** khi: tranh chấp hiếm (mỗi user sửa data của riêng mình), muốn throughput
  cao, chấp nhận retry thỉnh thoảng.

---

## 10. Transaction best practice

1. **Transaction ngắn.** Giữ lock càng ngắn càng tốt. Mọi thao tác chậm (đọc file lớn,
   tính toán nặng) làm **trước** khi `Begin`, hoặc **sau** khi `Commit`.

2. **Không gọi external API trong transaction.** Gọi HTTP/gRPC bên thứ ba **trong** tx →
   nếu nó chậm/timeout (vài giây), tx giữ lock cả mấy giây → chặn mọi người khác → snowball.

   ```go
   // SAI
   tx.Begin()
   resp := http.Get("https://payment-gateway/...") // ⚡ 5s → giữ lock 5s
   tx.Commit()

   // ĐÚNG: gọi API ngoài tx, dùng kết quả rồi mới mở tx ngắn
   resp := http.Get(...)
   tx.Begin(); tx.Exec(...); tx.Commit()
   ```

3. **Retry on serialization failure.** Ở Serializable/Repeatable Read, DB có thể abort tx
   với lỗi serialization (Postgres `40001`). Bọc tx trong vòng retry (xem mục 8.4).

4. **Set timeout** bằng `context`. Tránh tx treo vô hạn giữ lock:

   ```go
   ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
   defer cancel()
   tx, _ := db.BeginTx(ctx, nil)
   tx.ExecContext(ctx, ...) // tự hủy nếu quá 3s
   ```

5. **Chọn isolation level đúng use case.** Tiền/tồn kho → Serializable hoặc `FOR UPDATE`.
   Đọc dashboard → Read Committed là đủ.

---

## 11. Savepoint — nested transaction & partial rollback

**Savepoint** là một "điểm đánh dấu" bên trong transaction. Có thể rollback **về
savepoint** mà không hủy toàn bộ transaction.

```sql
BEGIN;
INSERT INTO orders (...) VALUES (...);   -- bước 1: chắc chắn giữ
SAVEPOINT sp1;
INSERT INTO order_items (...) VALUES (...); -- bước 2: có thể fail
-- nếu bước 2 lỗi:
ROLLBACK TO SAVEPOINT sp1;                -- hủy chỉ bước 2, GIỮ bước 1
-- xử lý thay thế cho bước 2...
COMMIT;                                   -- chốt bước 1 + xử lý thay thế
```

Trong Go, kể từ Go 1.x `database/sql` không có API savepoint trực tiếp, nhưng có thể dùng
`tx.Exec("SAVEPOINT sp1")` và `tx.Exec("ROLLBACK TO SAVEPOINT sp1")` như câu lệnh thường.
Một số driver/ORM (vd GORM, ent) wrap thành "nested transaction" tự động dùng savepoint
bên dưới.

> 💡 **Trực giác.** Savepoint giống nút "checkpoint" trong game. Chết → quay về checkpoint
> gần nhất, không phải chơi lại từ đầu màn.

---

## 12. Common pitfall — bảng tổng hợp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|-----------|
| Quên `tx.Rollback()` khi return sớm | Connection leak → pool cạn → app treo | Luôn `defer tx.Rollback()` ngay sau Begin |
| Long transaction | Giữ lock lâu → chặn người khác → throughput sụp | Tx ngắn, tách việc nặng ra ngoài |
| Gọi external API trong tx | Tx treo theo timeout API → giữ lock | Gọi API ngoài tx |
| Dùng `db.Exec` thay `tx.Exec` trong tx | Lệnh đó nằm ngoài tx, không rollback chung | Chỉ dùng `tx.*` sau Begin |
| Isolation level sai (tiền dùng Read Committed) | Lost update, oversell | Money → Serializable / `FOR UPDATE` |
| Không retry serialization failure | Tx fail random, user thấy lỗi | Wrap retry loop với backoff |
| Không set timeout | Tx treo vô hạn | `context.WithTimeout` + `BeginTx` |

---

## 13. Ứng dụng thực tế trong phần mềm

> 💡 **Isolation level là đánh đổi đúng-đắn vs đồng-thời. Chọn sai gây bug "tiền tự nhân đôi" hoặc nghẽn cổ chai — cả hai đều ở production thật.**

| Isolation | Chặn được | Đánh đổi |
|-----------|-----------|----------|
| **Read Committed** (default Postgres) | dirty read | vẫn có non-repeatable/phantom read |
| **Repeatable Read** | + non-repeatable read | ít đồng thời hơn |
| **Serializable** | tất cả (như chạy tuần tự) | chậm nhất, có thể serialization failure → retry |
| **SELECT ... FOR UPDATE** | khóa dòng để cập nhật an toàn | giữ lock → giảm đồng thời |

### 13.1. Ví dụ cụ thể — lost update khi 2 request cùng trừ kho

Hai request cùng đọc `stock=1`, cả hai thấy "còn hàng", cả hai trừ → bán 2 món dù chỉ 1 (**lost update**). Sửa, ba cách: (1) **`SELECT ... FOR UPDATE`** khóa dòng → request 2 chờ request 1 xong mới đọc; (2) **atomic update** `UPDATE stock = stock - 1 WHERE id=? AND stock > 0` rồi kiểm rows affected; (3) **optimistic locking** (cột version, update WHERE version=cũ, fail thì retry). Đây là bug kinh điển của đặt vé/bán hàng — cùng dạng race condition nhưng ở tầng DB.

> ⚠ **Serializable không miễn phí — phải xử lý retry.** Postgres Serializable phát hiện xung đột → một transaction bị abort với "serialization failure" → app **phải retry**. Quên xử lý → lỗi 500 ngẫu nhiên dưới tải cao. Quy tắc: dùng isolation **vừa đủ** (Read Committed cho phần lớn; nâng lên khi có invariant đồng thời cụ thể như trừ kho/chuyển tiền); giữ transaction **ngắn** (không gọi API ngoài trong transaction — giữ lock lâu gây nghẽn, [nối transaction ACID](../../Databases/02-Intermediate/lesson-03-transaction-acid/)).

### 13.2. 📝 Tóm tắt mục 13

- Isolation level = đánh đổi đúng-đắn vs đồng-thời: Read Committed (default) → Serializable (chặt nhất, cần retry).
- **Lost update** (2 request cùng trừ kho) → `FOR UPDATE` / atomic update / optimistic locking.
- Dùng isolation vừa đủ; giữ transaction ngắn (không gọi API ngoài trong tx → giữ lock lâu gây nghẽn).

## Bài tập

> Làm trước, xem [Lời giải chi tiết](#lời-giải-chi-tiết) sau. Code mẫu Go ở
> [solutions.go](./solutions.go).

### BT1 — Transfer tiền với transaction + rollback on error
Viết hàm `Transfer(db, from, to, amount)` chuyển tiền giữa hai tài khoản. Yêu cầu:
atomic (dùng transaction), kiểm tra số dư đủ, rollback nếu lỗi, dùng `defer tx.Rollback()`.

### BT2 — Predict anomaly cho 3 isolation level scenario
Cho cùng một interleaving sau, dự đoán T1 đọc lần 2 ra gì ở mỗi level:
```
T1: SELECT balance FROM acc WHERE id=A   (lần 1)
                       T2: UPDATE acc SET balance=200 WHERE id=A; COMMIT
T1: SELECT balance FROM acc WHERE id=A   (lần 2) → ?
```
với 3 level: Read Committed, Repeatable Read, Serializable. (Giả sử lần 1 đọc ra 100.)

### BT3 — `SELECT FOR UPDATE` chống double booking (vé máy bay)
Có 1 ghế cuối cùng (`seat 12A`, status `available`). Hai khách đặt cùng lúc. Viết
transaction dùng `FOR UPDATE` sao cho **chỉ một** người đặt được, người kia thấy "đã hết".

### BT4 — Optimistic lock với version column
Viết hàm `UpdateProfileOptimistic` cập nhật một field, dùng version column. Nếu version
đã đổi (conflict) → trả lỗi `ErrConflict` để caller retry.

### BT5 — Deadlock scenario + fix bằng lock ordering
Chỉ ra interleaving gây deadlock khi T1 transfer A→B và T2 transfer B→A cùng dùng
`FOR UPDATE`. Sửa bằng lock ordering.

### BT6 — Retry on serialization failure
Viết hàm `WithRetry(fn, maxRetry)` chạy `fn` (một transaction), nếu gặp deadlock /
serialization failure thì retry với exponential backoff, lỗi khác thì trả ngay.

---

## Lời giải chi tiết

### Lời giải BT1 — Transfer

**Cách tiếp cận:** mở tx, `defer rollback`, đọc số dư A (`FOR UPDATE` để khóa), kiểm tra,
trừ A, cộng B, commit.

```go
func Transfer(db *sql.DB, from, to string, amount int) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback() // an toàn: no-op nếu đã commit

    var bal int
    err = tx.QueryRow(
        "SELECT balance FROM accounts WHERE id = $1 FOR UPDATE", from,
    ).Scan(&bal)
    if err != nil {
        return err
    }
    if bal < amount {
        return fmt.Errorf("tài khoản %s không đủ số dư (%d < %d)", from, bal, amount)
    }

    if _, err = tx.Exec(
        "UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, from,
    ); err != nil {
        return err
    }
    if _, err = tx.Exec(
        "UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to,
    ); err != nil {
        return err
    }
    return tx.Commit()
}
```

**Vì sao đúng:** mọi `return err` giữa chừng đều kích hoạt `defer tx.Rollback()` → A không
bị trừ nếu B lỗi. `FOR UPDATE` ngăn hai transfer cùng đọc "đủ" rồi cùng trừ. Commit chỉ
chạy khi cả 4 bước OK.

### Lời giải BT2 — Predict anomaly

| Level | T1 đọc lần 2 | Giải thích |
|-------|:---:|---|
| **Read Committed** | **200** | Mỗi câu SELECT đọc bản committed mới nhất → thấy update của T2. Đây là **non-repeatable read**. |
| **Repeatable Read** | **100** | T1 thấy snapshot cố định từ lúc tx bắt đầu → vẫn 100, dù T2 đã commit. Không non-repeatable. |
| **Serializable** | **100** | Như Repeatable Read về mặt đọc; ngoài ra nếu T1 ghi dựa trên giá trị này, DB có thể abort 1 tx để giữ tính tuần tự. |

### Lời giải BT3 — Double booking với FOR UPDATE

```go
func BookSeat(db *sql.DB, seatID, customer string) error {
    tx, err := db.Begin()
    if err != nil { return err }
    defer tx.Rollback()

    var status string
    // FOR UPDATE: người thứ 2 sẽ ĐỢI ở đây tới khi người 1 commit
    err = tx.QueryRow(
        "SELECT status FROM seats WHERE id = $1 FOR UPDATE", seatID,
    ).Scan(&status)
    if err != nil { return err }

    if status != "available" {
        return errors.New("ghế đã được đặt")
    }
    if _, err = tx.Exec(
        "UPDATE seats SET status='booked', customer=$1 WHERE id=$2", customer, seatID,
    ); err != nil { return err }

    return tx.Commit()
}
```

**Vì sao chỉ 1 người đặt được:** khách 1 khóa row bằng `FOR UPDATE`. Khách 2 chạy cùng
câu `SELECT ... FOR UPDATE` → **bị block đợi**. Khi khách 1 commit (status='booked'),
khách 2 được tiếp tục, đọc thấy status='booked' → trả "đã hết". Không có cửa sổ race.

### Lời giải BT4 — Optimistic lock

```go
var ErrConflict = errors.New("optimistic lock conflict: ai đó đã sửa, hãy thử lại")

func UpdateProfileOptimistic(db *sql.DB, id, newName string, expectedVersion int) error {
    res, err := db.Exec(
        `UPDATE profiles SET name=$1, version=version+1
         WHERE id=$2 AND version=$3`,
        newName, id, expectedVersion,
    )
    if err != nil { return err }

    n, _ := res.RowsAffected()
    if n == 0 {
        // version không khớp → có người đã sửa giữa lúc ta đọc và ghi
        return ErrConflict
    }
    return nil
}
```

**Vì sao đúng:** `WHERE version = expectedVersion` chỉ match nếu chưa ai sửa. Nếu có người
sửa, version đã tăng, `RowsAffected() == 0` → ta biết conflict → caller đọc lại version
mới và retry. Không khóa row → không deadlock.

### Lời giải BT5 — Deadlock + fix

**Interleaving gây deadlock:**
```
T1 (A→B): SELECT ... id='A' FOR UPDATE  ✓ khóa A
T2 (B→A): SELECT ... id='B' FOR UPDATE  ✓ khóa B
T1: SELECT ... id='B' FOR UPDATE  ⏳ đợi T2 nhả B
T2: SELECT ... id='A' FOR UPDATE  ⏳ đợi T1 nhả A
→ DEADLOCK → DB abort 1 tx
```

**Fix — lock ordering:** luôn khóa id nhỏ trước.
```go
func TransferOrdered(db *sql.DB, from, to string, amount int) error {
    tx, _ := db.Begin()
    defer tx.Rollback()

    // sắp xếp 2 id cần khóa, luôn khóa id nhỏ hơn trước
    first, second := from, to
    if first > second {
        first, second = second, first
    }
    tx.Exec("SELECT balance FROM accounts WHERE id=$1 FOR UPDATE", first)
    tx.Exec("SELECT balance FROM accounts WHERE id=$1 FOR UPDATE", second)

    // ... kiểm tra số dư & update ...
    return tx.Commit()
}
```
Giờ T1 (A→B) và T2 (B→A) **đều** khóa A trước rồi B. T2 chỉ đợi T1 xong A rồi tiếp tục
tuần tự — không còn chu trình đợi → không deadlock.

### Lời giải BT6 — Retry on serialization failure

```go
func WithRetry(fn func() error, maxRetry int) error {
    var err error
    for attempt := 0; attempt < maxRetry; attempt++ {
        err = fn()
        if err == nil {
            return nil
        }
        if !isRetryable(err) {
            return err // lỗi nghiệp vụ → không retry
        }
        // exponential backoff + jitter để tránh thundering herd
        base := time.Duration(1<<attempt) * 10 * time.Millisecond
        jitter := time.Duration(rand.Int63n(int64(base) + 1))
        time.Sleep(base + jitter)
    }
    return fmt.Errorf("hết %d lần retry: %w", maxRetry, err)
}

func isRetryable(err error) bool {
    // Postgres: 40001 serialization_failure, 40P01 deadlock_detected
    var pqErr interface{ SQLState() string }
    if errors.As(err, &pqErr) {
        s := pqErr.SQLState()
        return s == "40001" || s == "40P01"
    }
    return false
}
```

**Vì sao đúng:** chỉ retry các lỗi **thoáng qua** (serialization/deadlock) — chạy lại
thường thành công vì tx kia đã xong. Backoff tăng dần + jitter tránh nhiều client retry
cùng lúc. Lỗi nghiệp vụ (không đủ tiền) trả ngay, không phí lượt retry.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — mô phỏng in-memory transaction/lock semantics bằng
  mutex (chạy `go run solutions.go`): transfer with tx, optimistic version lock, deadlock
  demo + fix lock ordering, retry pattern.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Isolation level explorer** — chọn level + 2 transaction đồng thời, xem anomaly nào xảy ra.
  2. **Deadlock visualizer** — 2 tx khóa ngược thứ tự → deadlock; bật lock ordering để fix.
  3. **Optimistic vs Pessimistic** — animate hai cách xử lý concurrent write.

---

## Bài tiếp theo

[Lesson 57 — Migrations](../lesson-57-migrations/README.md): thay đổi schema an toàn
zero-downtime với golang-migrate / atlas, forward & backward migration.

## Tham khảo

- PostgreSQL docs — Transaction Isolation: https://www.postgresql.org/docs/current/transaction-iso.html
- Go `database/sql` — `BeginTx`, `TxOptions`.
- Martin Kleppmann, *Designing Data-Intensive Applications*, ch.7 (Transactions).
