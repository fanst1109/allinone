// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-54-sql-database-sql/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 54 — SQL & \`database/sql\`

> **Tier 5 — Database & Storage.** Bài đầu tiên về lưu trữ: cách Go nói chuyện với
> cơ sở dữ liệu quan hệ (relational database) thông qua package chuẩn \`database/sql\`.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu \`database/sql\` là **lớp trừu tượng (abstraction layer)**, vì sao cần **driver** riêng cho từng DB.
- Mở kết nối (\`sql.Open\`), verify (\`Ping\`), và cấu hình **connection pool** đúng cách.
- Phân biệt và dùng đúng \`Query\` / \`QueryRow\` / \`Exec\`.
- Viết **prepared statement** và **parameterized query** — chống **SQL injection** triệt để.
- Xử lý cột **NULL** bằng \`sql.NullString\` / \`sql.NullInt64\` / pointer.
- Dùng **context** để timeout/cancel, dùng **transaction** với pattern \`defer rollback\`.
- **Batch insert** hiệu quả; scan kết quả vào **slice struct**.
- Tránh các bẫy kinh điển: leak connection, quên \`rows.Err()\`, N+1 query.

## Kiến thức tiền đề

- [Lesson 18 — Interfaces](../lesson-18-interfaces/) (driver được đăng ký qua interface).
- [Lesson 19 — Errors](../lesson-19-errors/) và [Lesson 40 — Error handling sâu](../lesson-40-error-handling-deep/) (\`errors.Is\`, \`sql.ErrNoRows\`).
- [Lesson 29 — Context & cancellation](../lesson-29-context-cancellation/) (cho \`QueryContext\`/\`ExecContext\`).
- [Lesson 15 — Struct & method](../lesson-15-struct-method/) (scan vào struct).
- Biết SQL cơ bản (\`SELECT/INSERT/UPDATE/DELETE\`, \`WHERE\`, \`JOIN\`). Bài này tập trung phía **Go**, không dạy SQL từ đầu.

Bài tiếp theo: [Lesson 55 — ORM vs Raw SQL](../lesson-55-orm-vs-raw/) sẽ so sánh viết tay \`database/sql\` với sqlc/GORM/ent.

---

## 1. \`database/sql\` — lớp trừu tượng, không phải driver

> **💡 Trực giác.** Hãy nghĩ \`database/sql\` như **ổ cắm điện chuẩn** trên tường:
> hình dạng ổ cắm là cố định (API: \`Query\`, \`Exec\`, \`Begin\`...). Còn **driver** là
> cái phích cắm của từng hãng thiết bị (Postgres, MySQL, SQLite). Bạn viết code
> với "ổ cắm chuẩn" một lần; muốn đổi từ SQLite sang Postgres chỉ cần thay
> "phích cắm" (đổi import driver + DSN), phần lớn code Go giữ nguyên.

\`database/sql\` (stdlib) **không** biết nói chuyện trực tiếp với bất kỳ DB nào. Nó định
nghĩa các **interface** (\`driver.Driver\`, \`driver.Conn\`, \`driver.Stmt\`...) và quản lý
connection pool, transaction, prepared statement ở mức chung. Việc dịch sang giao thức
mạng cụ thể (wire protocol) của Postgres/MySQL là việc của **driver**.

Driver tự **đăng ký (register)** tên của nó vào \`database/sql\` qua hàm \`init()\`. Vì thế
bạn import driver bằng **blank import** (\`_\`) — chỉ cần side-effect đăng ký, không gọi
hàm nào của nó trực tiếp:

\`\`\`go
import (
    "database/sql"
    _ "github.com/jackc/pgx/v5/stdlib" // đăng ký tên "pgx"
)
\`\`\`

### Driver phổ biến

| DB | Driver | Tên đăng ký | Placeholder |
|----|--------|-------------|-------------|
| PostgreSQL | \`github.com/jackc/pgx/v5/stdlib\` (khuyến nghị) hoặc \`github.com/lib/pq\` | \`pgx\` / \`postgres\` | \`$1, $2, $3\` |
| MySQL/MariaDB | \`github.com/go-sql-driver/mysql\` | \`mysql\` | \`?\` |
| SQLite (cgo) | \`github.com/mattn/go-sqlite3\` | \`sqlite3\` | \`?\` |
| SQLite (thuần Go) | \`modernc.org/sqlite\` | \`sqlite\` | \`?\` |

> **❓ Câu hỏi tự nhiên của người đọc**
> - *"Vì sao không gói luôn driver vào stdlib cho gọn?"* → Để stdlib không phụ thuộc DB cụ thể, và để driver tiến hóa độc lập (vá lỗi, hỗ trợ tính năng mới của DB) mà không chờ Go release.
> - *"\`pgx\` vs \`lib/pq\` chọn cái nào?"* → \`pgx\` hiện đại hơn, nhanh hơn, còn được bảo trì tích cực; \`lib/pq\` ở chế độ maintenance. Dự án mới nên dùng \`pgx\`.
> - *"\`modernc.org/sqlite\` khác \`mattn/go-sqlite3\` ở đâu?"* → \`mattn\` cần **cgo** (gọi thư viện C, build phức tạp, cross-compile khó); \`modernc\` là SQLite dịch sang Go thuần, build dễ, không cần cgo. Bài này dùng \`modernc\` cho demo.

---

## 2. Open & Ping — mở kết nối "lười"

\`\`\`go
db, err := sql.Open("pgx", "postgres://user:pass@localhost:5432/app?sslmode=disable")
if err != nil {
    log.Fatal(err) // err ở đây thường chỉ là DSN sai cú pháp, KHÔNG phải lỗi mạng
}
defer db.Close()

if err := db.Ping(); err != nil { // ĐÂY mới thực sự mở 1 connection để kiểm tra
    log.Fatal(err)
}
\`\`\`

> **💡 Trực giác.** \`sql.Open\` giống như **lưu số điện thoại** của DB vào danh bạ — chưa
> gọi cho ai cả. \`db.Ping()\` mới là **bấm gọi thử** xem đầu kia có nhấc máy không.

Điểm cực kỳ hay nhầm:

> **⚠ Lỗi thường gặp.** \`sql.Open\` **KHÔNG** mở kết nối ngay (lazy). Nếu DB chết hoặc DSN
> trỏ sai host, \`sql.Open\` vẫn trả \`err == nil\`. Connection thật chỉ được mở khi bạn chạy
> query đầu tiên — hoặc khi gọi \`Ping()\`. Vì vậy **luôn \`Ping()\` sau \`Open\` lúc khởi động**
> để fail-fast thay vì để lỗi nổ ra giữa lúc phục vụ request.

\`*sql.DB\` **không** phải một connection — nó là **handle quản lý cả một pool** nhiều
connection. Vì thế:

- Tạo \`*sql.DB\` **một lần** khi khởi động app, dùng chung toàn vòng đời (nó thread-safe).
- **KHÔNG** \`Open\`/\`Close\` mỗi request — đó là sai lầm phá hủy hiệu năng.

> **🔁 Dừng lại tự kiểm tra**
> 1. \`sql.Open\` trả về \`err == nil\` — chắc chắn DB đang sống chưa?
> 2. Nên tạo bao nhiêu \`*sql.DB\` cho một service?
>
> <details><summary>Đáp án</summary>
>
> 1. Chưa chắc. \`Open\` lazy, chỉ kiểm tra DSN. Phải \`Ping()\` mới biết DB sống.
> 2. Một (1) — dùng chung. \`*sql.DB\` quản lý pool nội bộ, an toàn cho goroutine.
> </details>

---

## 3. Connection pool — tham số sống còn ở production

\`*sql.DB\` duy trì một **pool** connection để tái dùng (mở TCP + handshake + auth mỗi
connection rất đắt). Bốn núm chỉnh:

\`\`\`go
db.SetMaxOpenConns(25)                  // tối đa connection mở đồng thời (mặc định: 0 = vô hạn)
db.SetMaxIdleConns(25)                  // số connection rảnh giữ sẵn để tái dùng (mặc định: 2)
db.SetConnMaxLifetime(5 * time.Minute)  // mỗi connection sống tối đa bao lâu rồi recycle
db.SetConnMaxIdleTime(1 * time.Minute)  // connection rảnh quá lâu thì đóng
\`\`\`

> **💡 Trực giác.** Pool giống **đội taxi đang chờ khách**. \`MaxOpenConns\` = tối đa bao
> nhiêu xe được ra đường cùng lúc. \`MaxIdleConns\` = bao nhiêu xe đậu sẵn ở bến (không
> tắt máy) để khách tới là đi luôn, khỏi phải khởi động. \`ConnMaxLifetime\` = sau ca này
> phải về garage bảo dưỡng (tránh xe chạy mãi gặp trục trặc).

### Vì sao quan trọng đến thế?

Postgres mặc định chỉ chịu được **~100 connection đồng thời** (\`max_connections\`). Nếu
bạn chạy 10 instance service, mỗi instance để \`MaxOpenConns = 50\` → 500 connection đòi
hỏi → DB **từ chối kết nối / sập**. Đây là sự cố thật rất phổ biến.

> **⚠ Lỗi thường gặp.**
> - **Pool quá lớn**: nhiều instance × MaxOpenConns lớn > \`max_connections\` của DB → exhaust, lỗi \`too many connections\`.
> - **Pool quá nhỏ**: dưới tải, các goroutine xếp hàng chờ connection → latency tăng vọt dù DB còn rảnh.
> - **\`MaxIdleConns\` < \`MaxOpenConns\` nhiều**: connection vừa dùng xong bị đóng ngay rồi lại mở lại liên tục (churn) → tốn tài nguyên. Thường đặt \`MaxIdleConns == MaxOpenConns\`.
> - **Không set \`ConnMaxLifetime\`**: gặp load balancer/proxy (như PgBouncer) ngắt connection ngầm → app giữ connection chết, query lỗi ngẫu nhiên. Đặt lifetime hữu hạn (vài phút) để tự recycle.

### Ví dụ tính sizing (4 case cụ thể)

| Tình huống | \`max_connections\` DB | Số instance | \`MaxOpenConns\` an toàn mỗi instance |
|------------|:---:|:---:|:---:|
| Monolith 1 instance, dành 20 conn cho admin | 100 | 1 | ~80 |
| 4 instance như nhau | 100 | 4 | (100 − 20) / 4 = **20** |
| 10 instance + 1 job worker (5 conn) | 100 | 10 | (100 − 5 − 20) / 10 = **7** |
| Có PgBouncer (transaction pooling) đứng trước | 100 (về PgBouncer 1000) | 10 | có thể 20–50 vì PgBouncer ghép connection |

> **🔁 Dừng lại tự kiểm tra.** Postgres \`max_connections=100\`, bạn deploy 8 instance, muốn
> chừa 12 connection cho việc bảo trì. Mỗi instance nên đặt \`MaxOpenConns\` bao nhiêu?
> <details><summary>Đáp án</summary> (100 − 12) / 8 = 11. Đặt khoảng 10–11 để có biên an toàn. </details>

> **📝 Tóm tắt mục 1–3.**
> - \`database/sql\` là abstraction; driver (blank import) làm phần dịch wire protocol.
> - \`sql.Open\` lazy → luôn \`Ping()\` để fail-fast. \`*sql.DB\` là pool, tạo 1 lần dùng chung.
> - Bốn núm pool: \`SetMaxOpenConns\`, \`SetMaxIdleConns\`, \`SetConnMaxLifetime\`, \`SetConnMaxIdleTime\`. Sai sizing → exhaust DB hoặc latency.

---

## 4. Query — ba cửa: \`Query\`, \`QueryRow\`, \`Exec\`

Chọn đúng hàm theo "hình dạng" kết quả mong đợi:

| Hàm | Dùng cho | Trả về | Đặc điểm |
|-----|----------|--------|----------|
| \`db.Query(...)\` | \`SELECT\` trả **nhiều dòng** | \`*sql.Rows, error\` | phải loop + **\`rows.Close()\`** |
| \`db.QueryRow(...)\` | \`SELECT\` trả **1 dòng** | \`*sql.Row\` | gọi \`.Scan(...)\`; không có → \`sql.ErrNoRows\` |
| \`db.Exec(...)\` | \`INSERT/UPDATE/DELETE/DDL\` (không trả dòng) | \`sql.Result, error\` | có \`RowsAffected()\`, \`LastInsertId()\` |

### 4.1 \`db.Query\` — nhiều dòng

\`\`\`go
rows, err := db.Query(\`SELECT id, name, email FROM users WHERE name LIKE ?\`, "A%")
if err != nil {
    return err
}
defer rows.Close()              // (1) BẮT BUỘC — quên = leak connection

for rows.Next() {               // (2) lặp từng dòng
    var u User
    if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
        return err
    }
    users = append(users, u)
}
if err := rows.Err(); err != nil { // (3) BẮT BUỘC — loop dừng do hết dòng HAY do lỗi?
    return err
}
\`\`\`

> **⚠ Lỗi thường gặp.** Thứ tự và **kiểu** của các con trỏ trong \`Scan\` phải khớp đúng
> thứ tự cột trong \`SELECT\`. \`SELECT id, name\` thì \`Scan(&id, &name)\` — đảo lại là sai.
> Đừng dùng \`SELECT *\` rồi \`Scan\` cứng thứ tự cột: thêm/đổi cột trong schema là vỡ.

### 4.2 \`db.QueryRow\` — đúng một dòng

\`\`\`go
var name string
err := db.QueryRow(\`SELECT name FROM users WHERE id = ?\`, id).Scan(&name)
if errors.Is(err, sql.ErrNoRows) {
    // không có user — đây KHÔNG phải lỗi hệ thống, xử lý riêng (trả 404 chẳng hạn)
    return nil, ErrUserNotFound
}
if err != nil {
    return nil, err // lỗi thật (mất kết nối, kiểu sai...)
}
\`\`\`

> **💡 Trực giác.** \`sql.ErrNoRows\` không phải "hỏng" — nó nghĩa là "tìm nhưng không thấy",
> giống \`map[key]\` trả \`ok == false\`. Phân biệt rõ với lỗi hạ tầng để trả HTTP status đúng
> (404 vs 500).

### 4.3 \`db.Exec\` — thay đổi dữ liệu

\`\`\`go
res, err := db.Exec(\`UPDATE users SET email = ? WHERE id = ?\`, newEmail, id)
if err != nil {
    return err
}
n, _ := res.RowsAffected()   // bao nhiêu dòng thực sự đổi
if n == 0 {
    return ErrUserNotFound    // id không tồn tại → 0 dòng bị ảnh hưởng
}
id, _ := res.LastInsertId()  // (chỉ ý nghĩa với INSERT có AUTOINCREMENT; Postgres không hỗ trợ — dùng RETURNING)
\`\`\`

> **⚠ Lỗi thường gặp.** Postgres **không** hỗ trợ \`LastInsertId()\`. Để lấy id vừa insert,
> dùng \`INSERT ... RETURNING id\` với \`QueryRow\`:
> \`\`\`go
> var id int64
> db.QueryRow(\`INSERT INTO users(name) VALUES($1) RETURNING id\`, name).Scan(&id)
> \`\`\`

> **🔁 Dừng lại tự kiểm tra.** Bạn cần biết "có đúng dòng nào bị UPDATE không". Dùng hàm
> nào và đọc giá trị gì?
> <details><summary>Đáp án</summary> \`db.Exec(...)\` → \`res.RowsAffected()\`. Nếu \`== 0\` nghĩa là điều kiện \`WHERE\` không khớp dòng nào. </details>

---

## 5. Prepared statement — chuẩn bị một lần, chạy nhiều lần

\`\`\`go
stmt, err := db.Prepare(\`INSERT INTO users(name, email) VALUES (?, ?)\`)
if err != nil {
    return err
}
defer stmt.Close()

for _, u := range users {
    if _, err := stmt.Exec(u.Name, u.Email); err != nil {
        return err
    }
}
\`\`\`

> **💡 Trực giác.** Prepared statement giống **điền sẵn mẫu đơn có chỗ trống**: DB phân
> tích cú pháp (parse) + lập kế hoạch thực thi (plan) **một lần**, sau đó mỗi lần chỉ điền
> giá trị vào ô trống. Lặp lại 1000 lần thì tiết kiệm 999 lần parse/plan.

Hai lợi ích: (1) **hiệu năng** khi chạy lặp; (2) **an toàn** — giá trị luôn đi tách khỏi
câu lệnh nên không thể bị hiểu thành SQL (chống injection, xem mục 6).

> **❓ Câu hỏi tự nhiên.**
> - *"Lúc nào nên Prepare?"* → Khi câu lệnh chạy lặp nhiều lần (vòng lặp insert/update). Với câu chạy 1 lần, \`db.Query\`/\`db.Exec\` (đã ngầm prepare rồi discard) là đủ.
> - *"Prepared statement gắn với connection nào?"* → \`database/sql\` tự lo: nếu connection chứa stmt bận, nó re-prepare trên connection khác. Bạn không cần quản lý thủ công.
> - *"Trong transaction thì sao?"* → Dùng \`tx.Prepare\` để stmt chạy trong đúng transaction đó.

---

## 6. Parameterized query — TUYỆT ĐỐI không nối chuỗi

> **⚠ Đây là phần quan trọng nhất bài.** Lỗi SQL injection xuất phát từ việc **nối input
> người dùng thẳng vào câu SQL**.

### SAI — nối chuỗi (string concat)

\`\`\`go
// ĐỪNG BAO GIỜ LÀM THẾ NÀY
q := "SELECT * FROM users WHERE email = '" + email + "'"
db.Query(q)
\`\`\`

Nếu \`email = "x' OR '1'='1"\`, câu lệnh thành:

\`\`\`sql
SELECT * FROM users WHERE email = 'x' OR '1'='1'
\`\`\`

\`'1'='1'\` luôn đúng → trả về **toàn bộ** user. Tệ hơn, \`email = "x'; DROP TABLE users; --"\`:

\`\`\`sql
SELECT * FROM users WHERE email = 'x'; DROP TABLE users; --'
\`\`\`

→ **xóa cả bảng**.

### ĐÚNG — placeholder + tham số rời

\`\`\`go
db.Query(\`SELECT * FROM users WHERE email = ?\`, email)        // MySQL/SQLite
db.Query(\`SELECT * FROM users WHERE email = $1\`, email)       // Postgres
\`\`\`

> **💡 Vì sao an toàn?** Driver gửi **câu lệnh** và **dữ liệu** qua hai kênh tách biệt
> (hoặc DB tự bind giá trị vào placeholder đã parse). Input dù chứa \`'\`, \`;\`, \`--\` cũng
> chỉ là **một chuỗi giá trị** để so sánh, **không bao giờ** được DB hiểu là cú pháp SQL.
> Với \`email = "x' OR '1'='1"\`, DB đi tìm user có email đúng bằng chuỗi \`x' OR '1'='1\` →
> không có → trả rỗng. Tấn công vô hiệu.

### Bốn ví dụ input độc hại đều bị vô hiệu khi dùng placeholder

| Input người dùng | Với concat (SAI) | Với placeholder (ĐÚNG) |
|------------------|------------------|------------------------|
| \`alice@x.io\` | OK | OK |
| \`x' OR '1'='1\` | trả về mọi user | tìm email đúng chuỗi đó → rỗng |
| \`'; DROP TABLE users; --\` | xóa bảng | tìm email đúng chuỗi đó → rỗng |
| \`' UNION SELECT password FROM admins --\` | lộ mật khẩu | tìm email đúng chuỗi đó → rỗng |

> **⚠ Lưu ý.** Placeholder chỉ bind được **giá trị**, KHÔNG bind được **tên bảng/cột** hay
> từ khóa. Nếu cần \`ORDER BY <cột động>\`, KHÔNG nối chuỗi tên cột từ input — hãy **whitelist**:
> \`\`\`go
> allowed := map[string]bool{"name": true, "email": true, "created_at": true}
> if !allowed[col] { return errBadColumn }
> q := "SELECT * FROM users ORDER BY " + col // an toàn vì col đã qua whitelist
> \`\`\`

> **🔁 Dừng lại tự kiểm tra.** Vì sao \`db.Query("... WHERE name = ?", "O'Brien")\` không bị
> lỗi cú pháp dù tên có dấu nháy đơn?
> <details><summary>Đáp án</summary> Vì \`O'Brien\` đi qua kênh dữ liệu tách biệt; DB không parse nó như SQL nên dấu \`'\` không "đóng" chuỗi. Nếu nối chuỗi thì \`'O'Brien'\` mới gây lỗi cú pháp. </details>

> **📝 Tóm tắt mục 4–6.**
> - \`Query\` (nhiều dòng, nhớ \`Close\` + \`rows.Err\`), \`QueryRow\` (1 dòng, bắt \`ErrNoRows\`), \`Exec\` (đổi dữ liệu, đọc \`RowsAffected\`).
> - Prepared statement: chuẩn bị 1 lần, reuse → nhanh + an toàn.
> - LUÔN dùng placeholder (\`?\` / \`$1\`). Nối chuỗi = lỗ hổng SQL injection. Tên cột/bảng động phải whitelist.

---

## 7. NULL handling — \`string\` không biểu diễn được NULL

Cột cho phép \`NULL\` không thể scan thẳng vào \`string\`/\`int\` (sẽ lỗi nếu giá trị là NULL).
Ba cách xử lý:

### Cách 1 — \`sql.NullXxx\` (khuyến nghị khi cần phân biệt rõ)

\`\`\`go
type User struct {
    ID   int64
    Name string
    Bio  sql.NullString // {String string; Valid bool}
}

var u User
db.QueryRow(\`SELECT id, name, bio FROM users WHERE id = ?\`, id).
    Scan(&u.ID, &u.Name, &u.Bio)

if u.Bio.Valid {
    fmt.Println("bio:", u.Bio.String) // có giá trị
} else {
    fmt.Println("chưa có bio")        // NULL
}
\`\`\`

Các kiểu có sẵn: \`sql.NullString\`, \`sql.NullInt64\`, \`sql.NullInt32\`, \`sql.NullFloat64\`,
\`sql.NullBool\`, \`sql.NullTime\`, và generic \`sql.Null[T]\` (Go 1.22+).

### Cách 2 — pointer

\`\`\`go
var bio *string
db.QueryRow(...).Scan(&id, &name, &bio)
if bio != nil { /* có giá trị */ }
\`\`\`

\`*string\` sẽ là \`nil\` nếu cột NULL, ngược lại trỏ tới chuỗi. Gọn khi serialize JSON
(field \`omitempty\`).

### Cách 3 — \`COALESCE\` ở SQL (đẩy default về DB)

\`\`\`sql
SELECT id, name, COALESCE(bio, '') AS bio FROM users WHERE id = ?
\`\`\`

Khi đó scan thẳng vào \`string\` được vì NULL đã biến thành \`''\`. Mất khả năng phân biệt
"chưa nhập" với "nhập chuỗi rỗng" — chỉ dùng khi không cần phân biệt.

> **❓ Câu hỏi tự nhiên.** *"Khi nào NullString, khi nào pointer?"* → \`NullString\` rõ ràng
> hơn khi đọc code và làm việc tốt với struct cố định; pointer tiện khi cần \`nil\` cho JSON
> \`omitempty\`. Cùng một dự án nên thống nhất một kiểu.

> **⚠ Lỗi thường gặp.** \`Scan(&s)\` với \`s string\` vào cột NULL → lỗi
> \`converting NULL to string is unsupported\`. Đây là dấu hiệu phải đổi sang \`sql.NullString\`
> hoặc pointer.

---

## 8. Context-aware — timeout & cancel

Mọi method query đều có biến thể \`...Context\`: \`QueryContext\`, \`QueryRowContext\`,
\`ExecContext\`, \`BeginTx\`. Truyền \`context.Context\` để **hủy** query khi request bị cancel
hoặc quá hạn:

\`\`\`go
ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
defer cancel()

rows, err := db.QueryContext(ctx, \`SELECT ... FROM big_table WHERE ...\`)
if errors.Is(err, context.DeadlineExceeded) {
    // query quá 2s → bị hủy, trả 504/503 thay vì để treo
}
\`\`\`

> **💡 Trực giác.** Context giống **cái cầu dao**: nếu client đóng tab (request cancel) hoặc
> query chạy quá lâu, cầu dao ngắt → DB ngừng tốn công, connection được trả về pool sớm,
> không "treo" tài nguyên.

> **⚠ Lỗi thường gặp.** Dùng \`db.Query\` (không Context) trong HTTP handler → khi client
> ngắt kết nối, query vẫn chạy tới cùng, lãng phí connection. Ở backend production, **luôn**
> truyền \`r.Context()\` xuống tầng DB.

---

## 9. Transaction — \`Begin\` → \`Commit\`/\`Rollback\` với \`defer rollback\`

Transaction đảm bảo một nhóm thao tác **all-or-nothing** (tính nguyên tử — atomicity).

\`\`\`go
func transfer(ctx context.Context, db *sql.DB, from, to, amount int64) (err error) {
    tx, err := db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }
    // defer rollback pattern: nếu return sớm vì lỗi → Rollback hoàn tác.
    // Nếu Commit thành công → Rollback là no-op (trả sql.ErrTxDone, nuốt đi).
    defer func() {
        _ = tx.Rollback()
    }()

    if _, err = tx.ExecContext(ctx,
        \`UPDATE accounts SET balance = balance - ? WHERE id = ?\`, amount, from); err != nil {
        return err // → defer Rollback hoàn tác
    }
    if _, err = tx.ExecContext(ctx,
        \`UPDATE accounts SET balance = balance + ? WHERE id = ?\`, amount, to); err != nil {
        return err // → defer Rollback hoàn tác (tiền không bị trừ "treo")
    }
    return tx.Commit() // chốt mọi thay đổi
}
\`\`\`

> **💡 Trực giác.** Transaction giống **chuyển tiền ngân hàng**: hoặc cả "trừ tài khoản A"
> và "cộng tài khoản B" cùng xảy ra, hoặc **không gì cả**. Không thể có chuyện trừ A xong
> mà chưa cộng B (mất tiền). \`defer Rollback\` là **lưới an toàn**: bất kỳ lỗi/\`panic\`/return
> sớm nào cũng làm sạch transaction dở dang.

> **⚠ Lỗi thường gặp.**
> - **Dùng \`db\` thay vì \`tx\`** bên trong transaction → các query đó chạy NGOÀI transaction (trên connection khác của pool) → mất tính nguyên tử. Trong transaction phải gọi \`tx.Exec\`/\`tx.Query\`.
> - **Quên Rollback khi return sớm** → connection bị giữ ở trạng thái "đang mở transaction" → leak. \`defer tx.Rollback()\` ngay sau \`Begin\` giải quyết.
> - **Giữ transaction mở quá lâu** (làm I/O, gọi HTTP bên trong tx) → giữ lock DB lâu → nghẽn. Transaction nên ngắn gọn.

> **🔁 Dừng lại tự kiểm tra.** Sau \`tx.Commit()\` thành công, \`defer tx.Rollback()\` chạy có
> phá hỏng dữ liệu vừa commit không?
> <details><summary>Đáp án</summary> Không. Sau Commit, transaction đã đóng; Rollback trả về \`sql.ErrTxDone\` và không làm gì. Đó chính là lý do pattern này an toàn. </details>

Chi tiết về isolation level, deadlock, \`SELECT FOR UPDATE\` sẽ học ở
[Lesson 56 — Transaction & Isolation](../lesson-56-transactions-isolation/).

---

## 10. Batch insert — chèn nhiều dòng hiệu quả

Chèn 1000 dòng bằng 1000 lần \`db.Exec\` riêng lẻ là **chậm** (mỗi lần 1 round-trip mạng +
1 auto-commit). Ba cách nhanh hơn, từ đơn giản tới mạnh nhất:

### 10.1 Gói trong 1 transaction + prepared statement

\`\`\`go
tx, _ := db.Begin()
defer tx.Rollback()
stmt, _ := tx.Prepare(\`INSERT INTO accounts(owner, balance) VALUES (?, ?)\`)
defer stmt.Close()
for _, a := range accs {
    stmt.Exec(a.Owner, a.Balance)
}
tx.Commit() // 1 lần commit thay vì 1000 lần
\`\`\`

Nhanh hơn nhiều lần vì chỉ commit 1 lần và reuse statement.

### 10.2 Multi-row VALUES — ít round-trip nhất

\`\`\`sql
INSERT INTO accounts(owner, balance) VALUES (?,?),(?,?),(?,?), ...
\`\`\`

Gom nhiều dòng vào **một câu lệnh** → 1 round-trip.

> **⚠ Lỗi thường gặp.** DB giới hạn số placeholder mỗi câu: Postgres ~**65535**, SQLite
> mặc định **999**. Insert chục nghìn dòng phải **chia chunk** (ví dụ mỗi lần 500 dòng) kẻo
> lỗi \`too many SQL variables\`.

### 10.3 Postgres \`COPY\` — cho hàng triệu dòng

Driver \`pgx\` có \`CopyFrom\` (binary protocol), nhanh hơn nhiều so với INSERT cho khối lượng
lớn (import/ETL). MySQL có \`LOAD DATA\`. Đây là vũ khí cho bulk thật sự lớn.

> **📝 Tóm tắt mục 7–10.**
> - NULL: dùng \`sql.NullString\`/pointer/\`COALESCE\`. Scan NULL vào \`string\` thường = lỗi.
> - Context: truyền vào \`...Context\` để timeout/cancel, tránh treo connection.
> - Transaction: \`BeginTx\` → dùng \`tx.Exec\` → \`Commit\`, với \`defer tx.Rollback()\` làm lưới an toàn. Phải dùng \`tx\`, không phải \`db\`.
> - Batch: gói trong tx + prepared (đơn giản), multi-row VALUES (nhanh, nhớ giới hạn placeholder), COPY (bulk khổng lồ).

---

## 11. Scan vào struct — thủ công vs thư viện

\`database/sql\` chỉ cho scan **từng field một** theo đúng thứ tự cột:

\`\`\`go
var u User
rows.Scan(&u.ID, &u.Name, &u.Email, &u.Bio) // phải khớp thứ tự cột trong SELECT
\`\`\`

Với struct nhiều field, viết tay dễ sai thứ tự. Hệ sinh thái có thư viện scan tự động
theo tên cột:

| Thư viện | Cách dùng |
|----------|-----------|
| \`github.com/jmoiron/sqlx\` | \`db.Get(&u, query)\` / \`db.Select(&users, query)\`, map theo tag \`db:"..."\` |
| \`github.com/georgysavva/scany\` | \`sqlscan.Select(ctx, db, &users, query)\` — chỉ lo scan, không thay query |

\`\`\`go
// với sqlx — không cần viết Scan thủ công
type User struct {
    ID    int64  \`db:"id"\`
    Name  string \`db:"name"\`
    Email string \`db:"email"\`
}
var users []User
err := dbx.Select(&users, \`SELECT id, name, email FROM users WHERE active = $1\`, true)
\`\`\`

> **❓ Câu hỏi tự nhiên.** *"Vậy có nên luôn dùng sqlx?"* → sqlx/scany chỉ giúp **scan**, vẫn
> là raw SQL — nhẹ và rõ ràng. Khác hẳn ORM đầy đủ (GORM) sinh SQL giùm bạn. Lựa chọn
> ORM vs raw là chủ đề [Lesson 55](../lesson-55-orm-vs-raw/).

---

## 12. Các bẫy kinh điển (tổng hợp)

> **⚠ Lỗi thường gặp — checklist sống còn:**
>
> 1. **Quên \`rows.Close()\`** → connection không trả về pool → cạn pool, app treo. Luôn \`defer rows.Close()\` ngay sau \`db.Query\`.
> 2. **Quên \`rows.Err()\` sau loop** → bỏ sót lỗi I/O giữa chừng (loop dừng vì lỗi mạng nhưng bạn tưởng đã đọc hết dòng) → dữ liệu thiếu mà không biết.
> 3. **String concat** → SQL injection. Luôn placeholder.
> 4. **Connection pool sai cỡ** → exhaust DB (quá lớn) hoặc nghẽn (quá nhỏ).
> 5. **N+1 query** → xem dưới.
> 6. **\`sql.Open\` mỗi request** → mở/đóng pool liên tục, phá hiệu năng. Tạo \`*sql.DB\` 1 lần.
> 7. **Không phân biệt \`sql.ErrNoRows\`** với lỗi thật → trả 500 cho trường hợp đáng lẽ 404.

### N+1 query

\`\`\`go
// SAI: 1 query lấy danh sách + N query lấy chi tiết từng cái → 1 + N round-trip
orders, _ := db.Query(\`SELECT id, user_id FROM orders\`)       // 1 query
for each order {
    db.QueryRow(\`SELECT name FROM users WHERE id = ?\`, userID) // N query!
}
\`\`\`

> **💡 Sửa N+1.** Dùng **JOIN** để lấy tất cả trong 1 query:
> \`\`\`sql
> SELECT o.id, u.name FROM orders o JOIN users u ON u.id = o.user_id
> \`\`\`
> hoặc gom id rồi 1 query \`WHERE id IN (...)\`. 1 + N round-trip → còn 1.

> **🔁 Dừng lại tự kiểm tra.** Bạn thấy log DB có 1 query danh sách rồi 200 query gần như
> giống nhau theo sau. Tên hiện tượng là gì và sửa ra sao?
> <details><summary>Đáp án</summary> N+1 query. Sửa bằng JOIN hoặc \`WHERE id IN (...)\` để gộp về 1–2 query. </details>

> **📝 Tóm tắt mục 11–12.** Scan thủ công khớp thứ tự cột, hoặc dùng sqlx/scany cho gọn.
> Bảy bẫy: quên Close/Err, concat, pool sai cỡ, N+1, Open mỗi request, lẫn ErrNoRows với lỗi thật.

---

## Bài tập

> Code lời giải đầy đủ ở [solutions.go](./solutions.go) (dùng thật \`database/sql\` +
> driver SQLite in-memory \`modernc.org/sqlite\`). Chạy: \`go mod tidy && go run solutions.go\`.

1. **BT1 — CRUD users.** Viết 4 hàm \`createUser\`, \`getUser\`, \`updateUserEmail\`, \`deleteUser\`
   trên bảng \`users(id, name, email, bio)\`. Dùng đúng \`Exec\`/\`QueryRow\`, đọc \`LastInsertId\`
   và \`RowsAffected\`, phân biệt \`sql.ErrNoRows\`.
2. **BT2 — Query nhiều row.** Viết \`listUsers(db) ([]User, error)\` dùng \`db.Query\`, scan
   vào slice struct, đảm bảo \`defer rows.Close()\` và kiểm \`rows.Err()\`.
3. **BT3 — NULL handling.** Cột \`bio\` cho phép NULL. Tạo 1 user có bio, 1 user bio NULL.
   Đọc lại và in "chưa có bio" cho user NULL, không bị lỗi scan.
4. **BT4 — Transaction chuyển tiền.** Bảng \`accounts(id, owner, balance)\`. Viết
   \`transfer(ctx, db, from, to, amount)\` đảm bảo nguyên tử; nếu số dư không đủ → rollback,
   số dư hai bên không đổi.
5. **BT5 — Batch insert 1000 record.** Viết hàm chèn 1000 account hiệu quả (so sánh: 1000
   \`db.Exec\` rời vs 1 transaction + prepared vs multi-row VALUES).
6. **BT6 — Fix SQL injection.** Cho hàm \`findUserByEmail\` nối chuỗi input vào SQL. Chỉ ra lỗ
   hổng với input \`x' OR '1'='1\`, rồi viết lại bằng placeholder.

---

## Lời giải chi tiết

### BT1 — CRUD users

**Cách tiếp cận.** Mỗi thao tác map sang đúng "cửa" của \`database/sql\`:

- **Create** = \`INSERT\` → \`db.Exec\` → \`res.LastInsertId()\` lấy id mới.
- **Read** = \`SELECT\` 1 dòng → \`db.QueryRow(...).Scan(...)\`, bắt \`sql.ErrNoRows\` trả lỗi "không tồn tại".
- **Update** = \`UPDATE\` → \`db.Exec\` → kiểm \`res.RowsAffected() == 0\` để biết id có tồn tại không.
- **Delete** = \`DELETE\` → tương tự Update, dựa \`RowsAffected\`.

Tất cả dùng placeholder \`?\`. Cột \`bio\` NULL-able nên Create nhận \`*string\` rồi chuyển sang
\`sql.NullString\` (nil → NULL). Xem \`createUser\`/\`getUser\`/\`updateUserEmail\`/\`deleteUser\`
trong solutions.go.

**Độ phức tạp.** Mỗi thao tác là một round-trip $O(1)$ phía Go; chi phí thực nằm ở DB (index
lookup theo \`id\` ~ $O(\\log n)$ với B-tree index).

### BT2 — Query nhiều row, scan vào slice

**Cách tiếp cận.** \`db.Query\` → \`*sql.Rows\`. Ba bước bắt buộc: (1) \`defer rows.Close()\`,
(2) loop \`rows.Next()\` + \`Scan\` append vào slice, (3) \`rows.Err()\` sau loop. Bỏ bước (1) →
leak connection; bỏ (3) → có thể bỏ sót lỗi I/O giữa chừng. Xem \`listUsers\`.

**Độ phức tạp.** $O(\\text{số dòng})$ cho scan; bộ nhớ $O(\\text{số dòng})$ vì gom hết vào slice. Nếu kết quả
khổng lồ, hãy xử lý streaming từng dòng trong loop thay vì gom hết.

### BT3 — NULL handling

**Cách tiếp cận.** Khai báo \`Bio sql.NullString\` trong struct. Khi Create user không có bio,
truyền \`nil\` → lưu NULL. Khi đọc, kiểm \`u.Bio.Valid\`: \`true\` → dùng \`u.Bio.String\`; \`false\`
→ NULL, in thông báo mặc định. Nếu thử scan NULL vào \`string\` thường sẽ lỗi
\`converting NULL to string is unsupported\` — đó là lý do phải dùng \`NullString\`. Xem phần
in Bob trong \`main\`.

### BT4 — Transaction chuyển tiền

**Cách tiếp cận.** \`db.BeginTx\` lấy \`tx\`, đặt ngay \`defer tx.Rollback()\` làm lưới an toàn.
Trong tx: (1) đọc balance nguồn bằng \`tx.QueryRowContext\`; (2) nếu thiếu tiền → \`return\`
lỗi (defer Rollback hoàn tác); (3) \`UPDATE\` trừ nguồn; (4) \`UPDATE\` cộng đích; (5)
\`tx.Commit()\`. **Mọi** query dùng \`tx\`, không dùng \`db\`. Khi Commit thành công, defer
Rollback là no-op (\`sql.ErrTxDone\`). Xem \`transfer\`.

Trong demo, lệnh chuyển 999999 (vượt số dư) bị từ chối và số dư hai account giữ nguyên —
chứng minh tính nguyên tử.

**Độ phức tạp.** 3 round-trip DB trong 1 transaction. Ở môi trường thật cần thêm
\`SELECT ... FOR UPDATE\` hoặc isolation phù hợp để chống race khi hai transfer chạy song
song (Lesson 56).

### BT5 — Batch insert 1000 record

**Cách tiếp cận & so sánh:**

- **1000 \`db.Exec\` rời**: 1000 round-trip + 1000 auto-commit → chậm nhất.
- **1 transaction + prepared (\`batchInsertAccounts\`)**: parse 1 lần, commit 1 lần → nhanh hơn nhiều (thường 10–50×). Đơn giản, an toàn, là lựa chọn mặc định tốt.
- **Multi-row VALUES (\`batchInsertMultiRow\`)**: gom thành \`INSERT ... VALUES (?,?),(?,?),...\` → ít round-trip nhất. Phải để ý giới hạn placeholder (SQLite 999, Postgres 65535) → chia chunk khi vượt.
- **Postgres COPY** (\`pgx.CopyFrom\`): cho hàng trăm nghìn / triệu dòng (ETL).

**Độ phức tạp.** Tất cả $O(N)$ công ghi, nhưng **hằng số** (số round-trip) khác nhau rất lớn —
đó là điểm mấu chốt của tối ưu batch. Xem \`batchInsertAccounts\` và \`batchInsertMultiRow\`.

### BT6 — Fix SQL injection

**Lỗ hổng.** Hàm gốc nối chuỗi:

\`\`\`go
q := "SELECT ... WHERE email = '" + email + "'"
\`\`\`

Với \`email = "x' OR '1'='1"\`, câu thành \`... WHERE email = 'x' OR '1'='1'\` → điều kiện luôn
đúng → trả mọi user (hoặc với \`'; DROP TABLE users; --\` → xóa bảng).

**Sửa.** Dùng placeholder + tham số rời:

\`\`\`go
db.QueryRow(\`SELECT ... FROM users WHERE email = ?\`, email).Scan(...)
\`\`\`

Giờ input độc hại chỉ là **giá trị chuỗi** để so sánh — DB tìm email đúng bằng chuỗi
\`x' OR '1'='1\` → không có → trả rỗng. Tấn công vô hiệu. Xem \`findUserByEmailUNSAFE\`
(minh họa lỗi) và \`findUserByEmailSAFE\` (bản đúng) trong solutions.go; demo trong \`main\`
cho thấy input độc hại bị coi là chuỗi thường.

---

## Code & Minh họa

- **Lời giải code:** [solutions.go](./solutions.go) — \`database/sql\` + driver SQLite
  in-memory, đủ CRUD, query nhiều row, NULL, prepared statement, context, transaction,
  batch insert, demo SQL injection an toàn. Chạy: \`go mod tidy && go run solutions.go\`.
- **Minh họa trực quan:** [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Connection pool visualizer** — mô phỏng request lấy/trả connection từ pool, thấy pool cạn (exhaust) khi quá tải.
  2. **Prepared vs string concat** — gõ input độc hại, thấy attack thành công với nối chuỗi và bị vô hiệu với placeholder.
  3. **Query lifecycle** — đi từng bước \`Query → Rows → Scan loop → Close\`.

---

## Bài tiếp theo

- [Lesson 55 — ORM vs Raw SQL](../lesson-55-orm-vs-raw/): khi nào viết tay \`database/sql\`,
  khi nào dùng sqlc/GORM/ent/pgx; trade-off năng suất vs kiểm soát.
- [Lesson 56 — Transaction & Isolation](../lesson-56-transactions-isolation/): ACID sâu hơn,
  isolation level, \`SELECT FOR UPDATE\`, deadlock, optimistic vs pessimistic lock.

**Tham khảo:**
- [Tài liệu chuẩn \`database/sql\`](https://pkg.go.dev/database/sql)
- [Go database/sql tutorial — go-database-sql.org](http://go-database-sql.org/)
`;
