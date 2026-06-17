# Lesson 55 — ORM vs Raw SQL trong Go

> **Tier 5 — Database & Storage.** Bài trước ([L54: SQL & `database/sql`](../lesson-54-sql-database-sql/)) cho bạn nói chuyện với DB ở mức "trần trụi" nhất: viết SQL bằng tay, scan từng cột. Bài này trả lời câu hỏi *"có cách nào đỡ cực hơn không?"* — và quan trọng hơn: **đỡ cực tới mức nào thì bắt đầu trả giá?**

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hình dung được **spectrum** từ raw SQL (`database/sql`) đến full ORM (GORM), và mỗi nấc đánh đổi cái gì.
- Dùng được `sqlx` để scan thẳng vào struct, viết named query.
- Hiểu workflow `sqlc`: viết SQL → generate code type-safe (best of both worlds).
- Biết `pgx` nhanh hơn nhờ đâu (native protocol, pool, batch, COPY).
- Viết được query GORM cơ bản và **nhìn ra SQL mà GORM sinh ra** (không để nó là hộp đen).
- Nhận diện và sửa lỗi **N+1** — cạm bẫy kinh điển của mọi ORM.
- Áp dụng **Repository pattern** để code không khoá chặt vào một thư viện DB nào.
- Chọn đúng công cụ cho từng tình huống thay vì "luôn dùng GORM" hay "luôn raw".

## Kiến thức tiền đề

- [L54: SQL & `database/sql`](../lesson-54-sql-database-sql/) — `sql.DB`, `Query`, `Scan`, `Exec`, prepared statement. **Bắt buộc** đọc trước: mọi thư viện ở bài này đều xây trên hoặc thay thế `database/sql`.
- [L18: Interfaces](../lesson-18-interfaces/) — Repository pattern dựa hoàn toàn vào interface.
- [L15: Struct & Method](../lesson-15-struct-method/) — struct tag (`db:"..."`, `gorm:"..."`) là cốt lõi của scan.
- [L19: Errors](../lesson-19-errors/) — `sql.ErrNoRows`, `gorm.ErrRecordNotFound`.
- [L29: Context](../lesson-29-context-cancellation/) — mọi query nên nhận `ctx`.

---

## 1. Spectrum: từ raw đến full ORM

> 💡 **Trực giác.** Hãy hình dung việc truy cập DB như **đi từ A đến B**. Raw SQL là **đi bộ**: bạn kiểm soát từng bước, biết chính xác mình ở đâu, nhưng mệt và chậm soạn. Full ORM là **gọi taxi tự lái**: bạn chỉ nói "đến số 7 đường X", xe tự đi — nhanh, nhàn, nhưng bạn không biết nó đi đường nào, kẹt xe ở đâu, và khi nó đi sai thì bạn chịu. Ở giữa có **xe đạp, xe máy, xe buýt** — mỗi cái đánh đổi *control* lấy *tiện*.

Trong Go, "spectrum" đó cụ thể là 6 nấc, xếp từ **nhiều control nhất** đến **nhiều magic nhất**:

```
control ◄──────────────────────────────────────────────► tiện/magic
 database/sql   sqlx     sqlc     pgx        ent        GORM
   (raw)      (wrapper)  (codegen) (driver)  (graph ORM) (full ORM)
```

| # | Công cụ | Mô tả 1 câu | Bạn viết gì | Thư viện sinh/làm gì |
|---|---------|-------------|-------------|----------------------|
| 1 | **`database/sql`** | Chuẩn thư viện, raw nhất | SQL + Scan từng cột bằng tay | Quản lý connection pool |
| 2 | **`sqlx`** | Wrapper mỏng trên `database/sql` | SQL + struct có tag `db:` | Scan tự động vào struct/slice |
| 3 | **`sqlc`** | Generator: SQL → Go code | SQL trong file `.sql` + annotate | **Sinh hàm Go type-safe** lúc build |
| 4 | **`pgx`** | Driver Postgres native | Như `database/sql` nhưng API riêng | Protocol Postgres trực tiếp, nhanh |
| 5 | **`ent`** | Graph ORM (Facebook/Meta) | Schema bằng Go code | Sinh toàn bộ client + builder type-safe |
| 6 | **`GORM`** | Full ORM, "magic" | Struct model + chain method | Sinh & chạy SQL ngầm, migration, hook |

> ⚠ **Lỗi tư duy thường gặp.** "ORM cao cấp hơn raw nên luôn tốt hơn." **Sai.** Spectrum này **không phải thang điểm** — không nấc nào "xịn hơn" nấc nào. Nó là **trục đánh đổi**. Một startup CRUD chọn GORM là đúng; một payment gateway xử lý hàng chục nghìn TPS chọn `pgx` cũng đúng. Sai là khi dùng nhầm chỗ.

> ❓ **Câu hỏi tự nhiên.**
> - *"Tôi đã học `database/sql` ở L54, giờ phải bỏ đi học cái khác à?"* — Không. `sqlx` và `sqlc` đều **xây trên** `database/sql`; kiến thức cũ vẫn dùng. Chỉ `pgx` và GORM có API riêng.
> - *"Dùng được nhiều cái cùng lúc không?"* — Được. Nhiều dự án thực tế: GORM cho CRUD đơn giản + raw `database/sql` cho 5-6 query phức tạp mà GORM sinh SQL kém. Đây là pattern hợp lệ.

> 📝 **Tóm tắt mục 1.**
> - Spectrum 6 nấc: `database/sql` → `sqlx` → `sqlc` → `pgx` → `ent` → GORM.
> - Trục là **control ↔ tiện**, không phải "dở ↔ xịn".
> - `sqlx`/`sqlc` đứng trên `database/sql`; `pgx`/GORM có API riêng.
> - Trộn nhiều công cụ trong 1 dự án là chuyện bình thường.

---

## 2. `sqlx` — wrapper mỏng, scan thẳng vào struct

> 💡 **Trực giác.** Ở L54, đoạn đau nhất là `rows.Scan(&u.ID, &u.Name, &u.Email, ...)` — phải liệt kê từng con trỏ, đúng thứ tự cột, dễ lệch. `sqlx` nói: *"struct của bạn có tag `db:` rồi, để tôi tự nối cột vào field."* Vậy thôi — nó **không** viết SQL hộ bạn, chỉ **đỡ phần scan**.

`sqlx` giữ nguyên `*sql.DB` bên dưới (thực ra `sqlx.DB` nhúng `*sql.DB`), nên mọi thứ ở L54 vẫn chạy. Nó thêm 4 method "vàng":

| Method | Thay cho gì ở L54 | Trả về |
|--------|-------------------|--------|
| `db.Get(&u, query, args...)` | `QueryRow` + `Scan` thủ công | 1 row → 1 struct |
| `db.Select(&us, query, args...)` | `Query` + loop `Scan` | N rows → slice struct |
| `db.NamedExec(query, structOrMap)` | `Exec` với `?`/`$1` thủ công | dùng `:field` thay vì `?` |
| `db.NamedQuery(query, structOrMap)` | như trên cho SELECT | rows |

### 2.1 Struct với tag `db:`

```go
type User struct {
    ID    int64  `db:"id"`
    Name  string `db:"name"`
    Email string `db:"email"`
}
```

`sqlx` đọc tag `db:` để biết cột `id` của DB nối vào field `ID`. Không có tag → nó dùng tên field lowercase.

### 2.2 `Get` — 1 row vào struct

```go
var u User
err := db.Get(&u, "SELECT id, name, email FROM users WHERE id = $1", 7)
// err == sql.ErrNoRows nếu không có row nào
```

So với L54 (đếm thử): raw cần `QueryRow(...).Scan(&u.ID, &u.Name, &u.Email)` — 3 con trỏ liệt kê tay. `Get` chỉ 1 dòng, thêm cột không phải sửa lời gọi.

### 2.3 `Select` — nhiều row vào slice

```go
var users []User
err := db.Select(&users, "SELECT id, name, email FROM users WHERE active = $1", true)
// users đã đầy, không cần loop Scan
```

### 2.4 Named query

```go
_, err := db.NamedExec(
    `INSERT INTO users (name, email) VALUES (:name, :email)`,
    User{Name: "Alice", Email: "a@x.com"},
)
```

`:name`, `:email` được map từ tag `db:` của struct truyền vào. Đỡ phải đếm `$1, $2, $3` đúng thứ tự.

> ⚠ **Lỗi thường gặp.** `db.Get`/`db.Select` báo lỗi `missing destination name xxx in *User` khi **cột trả về không có field tương ứng**. Ví dụ `SELECT *` lấy cả cột `created_at` nhưng struct không có field nào tag `db:"created_at"` → lỗi. Cách sửa: hoặc thêm field, hoặc chỉ SELECT đúng cột cần. Đây là lý do **`SELECT *` nguy hiểm với struct scan**.

> 🔁 **Dừng lại tự kiểm tra.** `sqlx` có viết SQL hộ bạn không?
> <details><summary>Đáp án</summary>
> **Không.** `sqlx` chỉ tự động hoá phần *scan kết quả vào struct* và *map named param*. SQL vẫn do bạn viết tay 100%. Đây là lý do nó được gọi là "thin wrapper" — control gần như raw, chỉ bớt boilerplate scan.
> </details>

> 📝 **Tóm tắt mục 2.** `sqlx` = `database/sql` + struct scan tự động (`Get`/`Select`) + named query (`:field`). SQL vẫn viết tay. Đổi 5-7 dòng `Scan` thủ công lấy 1 dòng. Cái giá: gần như bằng 0 — vẫn full control.

---

## 3. `sqlc` — viết SQL, sinh code Go type-safe

> 💡 **Trực giác.** `sqlx` đỡ phần scan **lúc chạy** (runtime), nhưng nếu bạn gõ sai tên cột thì tới lúc chạy mới biết. `sqlc` lật ngược: bạn viết SQL trong file `.sql`, nó **đọc SQL + schema lúc build** rồi **sinh ra hàm Go**. Gõ sai cột → `sqlc generate` báo lỗi ngay, chưa cần chạy. Đây là *"best of both worlds"*: viết SQL thật (full control) + được type-safety của Go (compiler bắt lỗi).

### 3.1 Workflow 3 bước

```
   schema.sql          query.sql            sqlc.yaml
 (CREATE TABLE...)   (SELECT... -- name:)  (config)
        │                  │                   │
        └──────────────────┴───────────────────┘
                           │
                   $ sqlc generate
                           ▼
                  db.go  models.go  query.sql.go   ← code Go sinh ra
```

1. Khai báo **schema** (`CREATE TABLE`) trong `schema.sql`.
2. Viết **query** trong `query.sql`, mỗi query có comment annotate.
3. Chạy `sqlc generate` → ra package Go với hàm type-safe.

### 3.2 Annotate query

```sql
-- name: GetUser :one
SELECT id, name, email FROM users WHERE id = $1;

-- name: ListActiveUsers :many
SELECT id, name, email FROM users WHERE active = $1;

-- name: CreateUser :one
INSERT INTO users (name, email) VALUES ($1, $2)
RETURNING id, name, email;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
```

Cú pháp comment: `-- name: <TênHàm> :<kiểu trả về>`

| Annotation | Sinh ra hàm trả về | Khi nào |
|------------|--------------------|---------| 
| `:one` | `(T, error)` | query lấy đúng 1 row |
| `:many` | `([]T, error)` | query lấy nhiều row |
| `:exec` | `error` | INSERT/UPDATE/DELETE không cần kết quả |
| `:execrows` | `(int64, error)` | cần số row bị ảnh hưởng |

### 3.3 Code Go sinh ra (predict được)

Từ `-- name: GetUser :one` ở trên, `sqlc` sinh đại khái:

```go
// models.go — sinh từ schema.sql
type User struct {
    ID    int64
    Name  string
    Email string
}

// query.sql.go — sinh từ query.sql
const getUser = `SELECT id, name, email FROM users WHERE id = $1`

func (q *Queries) GetUser(ctx context.Context, id int64) (User, error) {
    row := q.db.QueryRowContext(ctx, getUser, id)
    var u User
    err := row.Scan(&u.ID, &u.Name, &u.Email)
    return u, err
}
```

Bạn **không viết** hàm này — nó được sinh. Nhưng vì biết quy tắc (`:one` → `(User, error)`, param `$1` → tham số đầu tiên), bạn **predict** được signature mà không cần mở file. Đó là điều BT2 yêu cầu.

> ❓ **Câu hỏi tự nhiên.**
> - *"Sửa query thì sao?"* — Sửa file `.sql`, chạy lại `sqlc generate`. Nếu signature đổi (thêm param, đổi cột), code gọi sẽ **không compile** → bạn buộc phải sửa theo. Đây là tính năng, không phải bug: compiler bắt bạn cập nhật.
> - *"`sqlc` có chạy SQL không?"* — Không lúc generate. Nó **parse** SQL + schema để hiểu kiểu, rồi sinh code. Code đó lúc chạy mới gọi DB (qua `database/sql` hoặc `pgx`).
> - *"Phải có DB thật khi generate không?"* — Không. Chỉ cần file schema. Generate offline được, hợp với CI.

> ⚠ **Lỗi thường gặp.** Sửa query nhưng **quên `sqlc generate`** → code Go cũ, không khớp SQL mới. Khắc phục: cho `sqlc generate` vào `go generate` / Makefile / CI để không quên. Đây chính là pitfall ở mục 12.

> 🔁 **Dừng lại tự kiểm tra.** Từ `-- name: CountUsers :one\nSELECT COUNT(*) FROM users;` — `sqlc` sinh hàm signature gì?
> <details><summary>Đáp án</summary>
> `:one` + 1 cột số → `func (q *Queries) CountUsers(ctx context.Context) (int64, error)`. Không có param vì không có `$1`. Trả về `int64` vì `COUNT(*)` là số nguyên.
> </details>

> 📝 **Tóm tắt mục 3.** `sqlc` = viết SQL trong `.sql` + annotate (`:one/:many/:exec`) → `sqlc generate` sinh hàm Go type-safe. Lỗi cột/param bị bắt lúc build. Phải re-generate khi đổi query. Best of both: SQL thật + an toàn kiểu.

---

## 4. `pgx` — driver Postgres native, tối ưu tốc độ

> 💡 **Trực giác.** `database/sql` là **giao diện chung** cho mọi DB (MySQL, Postgres, SQLite...). Để chung được, nó phải đi qua một lớp trừu tượng + driver dịch lại. `pgx` bỏ lớp chung đó, **nói thẳng protocol nhị phân của Postgres**. Giống như nói chuyện trực tiếp với người bản xứ thay vì qua phiên dịch — nhanh hơn, nắm được nhiều "thổ ngữ" hơn (kiểu dữ liệu riêng của Postgres: `jsonb`, `uuid`, array, range...).

### 4.1 Nhanh hơn nhờ đâu

- **Binary protocol**: gửi/nhận dữ liệu dạng nhị phân thay vì text → ít parse, ít cấp phát.
- **Prepared statement cache** tự động.
- **Bỏ overhead** của lớp `driver.Driver` interface chung.

### 4.2 `pgxpool` — connection pool

```go
pool, err := pgxpool.New(ctx, "postgres://user:pass@localhost/db")
defer pool.Close()

var name string
err = pool.QueryRow(ctx, "SELECT name FROM users WHERE id=$1", 7).Scan(&name)
```

`pgxpool` là pool tối ưu cho concurrency cao, thay cho `sql.DB`.

### 4.3 Batch — gửi nhiều query 1 round-trip

```go
batch := &pgx.Batch{}
batch.Queue("INSERT INTO logs (msg) VALUES ($1)", "a")
batch.Queue("INSERT INTO logs (msg) VALUES ($1)", "b")
batch.Queue("INSERT INTO logs (msg) VALUES ($1)", "c")
br := pool.SendBatch(ctx, batch)
defer br.Close()
// 3 INSERT đi trong 1 round-trip mạng thay vì 3 → giảm latency
```

### 4.4 COPY — nạp hàng loạt cực nhanh

```go
rows := [][]any{{"a@x.com"}, {"b@x.com"}, {"c@x.com"}}
n, err := pool.CopyFrom(ctx,
    pgx.Identifier{"emails"}, []string{"addr"},
    pgx.CopyFromRows(rows))
// COPY nhanh hơn N câu INSERT cả chục lần khi nạp hàng nghìn-triệu row
```

> ❓ **Câu hỏi tự nhiên.** *"`pgx` thay luôn `database/sql` à?"* — Tuỳ. `pgx` có **2 chế độ**: (a) dùng API native (`pgxpool`, nhanh nhất, không tương thích `database/sql`); (b) dùng qua adapter `stdlib` để vẫn xài `database/sql` interface (chậm hơn chút nhưng tương thích `sqlx`/`sqlc`). `sqlc` thậm chí sinh code cho `pgx` native được.

> 📝 **Tóm tắt mục 4.** `pgx` = driver Postgres native, nhanh nhờ binary protocol + bỏ lớp chung. Có `pgxpool`, `Batch` (gộp round-trip), `CopyFrom` (nạp hàng loạt). Chỉ Postgres. Dùng được native hoặc qua `database/sql`.

---

## 5. `GORM` — full ORM, "magic"

> 💡 **Trực giác.** GORM nói: *"Đừng viết SQL nữa. Cho tôi struct, tôi lo hết."* Bạn khai báo `User` là struct, GORM tự biết bảng tên `users`, cột `created_at`, khoá ngoại `user_id`... và sinh SQL ngầm. Nhàn kinh khủng cho CRUD. Nhưng "magic" có hai mặt: bạn **không thấy SQL** trừ khi bật log → khi nó sinh SQL ngu (N+1, full table scan), bạn không biết cho tới khi prod chậm.

### 5.1 Model & convention

```go
type User struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string
    Email     string    `gorm:"uniqueIndex"`
    CreatedAt time.Time            // GORM tự set khi create
    Posts     []Post              // association: 1 user có nhiều post
}

type Post struct {
    ID     uint
    Title  string
    UserID uint   // khoá ngoại, GORM suy ra từ tên
}
```

GORM **convention over configuration**: struct `User` → bảng `users` (số nhiều, snake_case), field `CreatedAt` → cột `created_at`.

### 5.2 Query cơ bản → SQL sinh ra

| Code GORM | SQL sinh ra (xấp xỉ) |
|-----------|----------------------|
| `db.First(&u, 7)` | `SELECT * FROM users WHERE id = 7 ORDER BY id LIMIT 1` |
| `db.Where("email = ?", e).First(&u)` | `SELECT * FROM users WHERE email = ? ORDER BY id LIMIT 1` |
| `db.Find(&us)` | `SELECT * FROM users` |
| `db.Where("active = ?", true).Find(&us)` | `SELECT * FROM users WHERE active = true` |
| `db.Create(&u)` | `INSERT INTO users (...) VALUES (...)` |
| `db.Model(&u).Update("name", "Bob")` | `UPDATE users SET name='Bob' WHERE id=?` |
| `db.Delete(&u, 7)` | `UPDATE users SET deleted_at=NOW() WHERE id=7` (soft delete!) |

> ⚠ **Lỗi thường gặp #1 — soft delete bất ngờ.** Nếu model có field `gorm.DeletedAt`, `Delete` **không** xoá thật mà set `deleted_at`. Mọi `Find` sau đó tự thêm `WHERE deleted_at IS NULL`. Nhiều người tưởng đã xoá nhưng row vẫn nằm đó → bối rối khi đếm. Đây là magic ẩn điển hình.

### 5.3 Hooks

```go
func (u *User) BeforeCreate(tx *gorm.DB) error {
    u.Email = strings.ToLower(u.Email)  // chạy tự động trước INSERT
    return nil
}
```

Hooks (`BeforeCreate`, `AfterUpdate`...) chạy ngầm. Tiện, nhưng lại thêm một lớp "không thấy được từ chỗ gọi".

> ❓ **Câu hỏi tự nhiên.** *"Làm sao thấy SQL GORM sinh ra?"* — Bật logger: `db.Logger = logger.Default.LogMode(logger.Info)`. **Luôn bật khi dev** để không bị magic dắt mũi. Đây là kỹ năng số 1 khi dùng ORM: *đọc SQL nó sinh*.

> 🔁 **Dừng lại tự kiểm tra.** `db.Where("name LIKE ?", "A%").Find(&users)` sinh SQL gì?
> <details><summary>Đáp án</summary>
> `SELECT * FROM users WHERE name LIKE 'A%'` (nếu model có soft delete thì thêm `AND deleted_at IS NULL`). `Find` = nhiều row, không có `LIMIT`.
> </details>

> 📝 **Tóm tắt mục 5.** GORM = full ORM. Struct → bảng (convention). `Where/First/Find/Create/Update/Delete` sinh SQL ngầm. Có association, hook, soft delete. Cực nhanh để code CRUD nhưng SQL ẩn → **luôn bật logger khi dev**.

---

## 6. So sánh toàn cảnh

Đây là bảng "tra cứu nhanh" — xem mỗi công cụ mạnh/yếu chỗ nào:

| Tiêu chí | `database/sql` | `sqlx` | `sqlc` | `pgx` | `ent` | GORM |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Type-safety** | Thấp (scan tay) | Thấp-TB | **Cao** (compile-time) | TB | **Cao** | TB (runtime) |
| **Performance** | **Cao** | **Cao** | **Cao** | **Cao nhất** (PG) | Cao | TB-thấp |
| **Learning curve** | TB | **Thấp** | TB (cần tool) | TB | Cao | TB (API rộng) |
| **Control SQL** | **Toàn quyền** | **Toàn quyền** | **Toàn quyền** | **Toàn quyền** | Hạn chế | Hạn chế |
| **Magic / ẩn SQL** | Không | Không | Không | Không | Ít | **Nhiều** |
| **Migration tích hợp** | Không | Không | Không | Không | **Có (codegen)** | **Có (AutoMigrate)** |
| **Boilerplate** | **Nhiều** | Ít | **Rất ít** | TB | Ít | **Rất ít** |
| **Đa DB** | Có | Có | Có | Chỉ PG | Có | Có |

Đọc bảng theo cột để chọn: cần *control + performance* → 4 cột trái; cần *nhanh code, ít boilerplate* → 2 cột phải; muốn *cân bằng* → `sqlc` (cao gần như mọi mặt, đổi lại cần tool generate) hoặc `ent`.

> 📝 **Tóm tắt mục 6.** Không công cụ nào thắng mọi tiêu chí. `sqlc` cân bằng tốt nhất (type-safe + control + perf, trả giá bằng bước generate). GORM thắng về tốc-độ-code và migration nhưng thua về control và minh bạch SQL.

---

## 7. Khi nào chọn raw / `sqlx` / `sqlc`

Chọn nhóm "control cao" khi:

- **Query phức tạp**: nhiều JOIN, window function, CTE, subquery. ORM hoặc sinh SQL kém, hoặc bạn phải "đấu" với DSL của nó.
- **Performance là yêu cầu cứng**: high-throughput API, latency budget chặt. Bạn muốn nhìn thấy & tối ưu từng query.
- **Cần kiểm soát chính xác SQL**: index hint, query plan, batch tinh chỉnh.
- **Reporting / analytics**: query đọc nặng, GROUP BY phức tạp — viết SQL thật dễ và minh bạch hơn nhiều.

Trong nhóm này: bắt đầu bằng `sqlx` (đỡ boilerplate, gần như free), nâng lên `sqlc` khi muốn type-safety mà vẫn viết SQL thật, dùng `pgx` khi chỉ Postgres và cần đỉnh hiệu năng.

---

## 8. Khi nào chọn GORM (hoặc `ent`)

Chọn full ORM khi:

- **CRUD đơn giản, lặp lại nhiều**: 80% endpoint là create/read/update/delete một bảng. ORM tiết kiệm hàng nghìn dòng.
- **Prototype / MVP**: cần ra sản phẩm nhanh, schema còn thay đổi xoành xoạch. `AutoMigrate` rất tiện ở giai đoạn này.
- **Team đã quen ORM**: chi phí học = 0, năng suất cao ngay.
- **Quan hệ phong phú nhưng truy vấn đơn giản**: association + Preload xử lý gọn nếu bạn dùng đúng.

> ⚠ **Lỗi tư duy.** "Dự án nghiêm túc thì không dùng GORM." Sai — vô số production system chạy GORM ổn định. Vấn đề không phải GORM xấu, mà là **dùng GORM mà không hiểu SQL nó sinh**. Bật logger, biết Preload, không AutoMigrate prod → GORM hoàn toàn dùng được nghiêm túc.

---

## 9. N+1 — cạm bẫy kinh điển của ORM

> 💡 **Trực giác.** Bạn lấy 10 user, rồi với **mỗi** user lại hỏi DB "post của ông này đâu?". Thành 1 query lấy user + 10 query lấy post = **11 query**. Đó là "N+1": 1 query gốc + N query con. Với 1000 user → 1001 query → DB sập. Cái độc của ORM là **bạn không thấy** — code trông như vòng lặp Go bình thường.

### 9.1 Code gây N+1

```go
var users []User
db.Find(&users)                 // QUERY 1: SELECT * FROM users  (lấy 10 user)

for _, u := range users {
    var posts []Post
    db.Where("user_id = ?", u.ID).Find(&posts)   // QUERY 2..11: mỗi vòng 1 query!
    fmt.Println(u.Name, len(posts))
}
// Tổng: 1 + 10 = 11 query
```

Nhìn code Go thì "1 query users + 1 vòng lặp". Nhưng mỗi vòng lặp **âm thầm bắn 1 query**. Đây là lý do phải đọc SQL log.

### 9.2 Fix bằng `Preload` (eager loading)

```go
var users []User
db.Preload("Posts").Find(&users)
// QUERY 1: SELECT * FROM users
// QUERY 2: SELECT * FROM posts WHERE user_id IN (1,2,3,...,10)
// Tổng: 2 query bất kể bao nhiêu user

for _, u := range users {
    fmt.Println(u.Name, len(u.Posts))   // u.Posts đã được nạp sẵn
}
```

`Preload` biến **N+1 → 2 query**: 1 lấy user, 1 lấy *tất cả* post của các user đó bằng `IN (...)`, rồi GORM tự ghép post vào đúng user trong Go.

| Cách | Số query với N user | Khi nào dùng |
|------|---------------------|--------------|
| Lazy (vòng lặp query) | **N+1** | gần như không bao giờ cố ý |
| `Preload` (eager) | **2** (1 + 1 IN) | khi chắc chắn cần dữ liệu liên quan |
| `Joins` (1 query JOIN) | **1** | khi cần lọc/sắp theo bảng liên quan |

> ❓ **Câu hỏi tự nhiên.** *"Vậy luôn Preload mọi thứ cho chắc?"* — Không. Preload nạp **tất cả** dữ liệu liên quan kể cả không dùng → lãng phí RAM/băng thông (over-fetch). Quy tắc: chỉ Preload cái bạn **chắc chắn** dùng trong vòng đó. Cân bằng giữa N+1 (under-fetch nhiều round-trip) và over-fetch.

> 🔁 **Dừng lại tự kiểm tra.** Lấy 50 user kèm post, không Preload thì bao nhiêu query? Có Preload?
> <details><summary>Đáp án</summary>
> Không Preload: **51** query (1 + 50). Có Preload: **2** query (1 lấy user + 1 lấy post `WHERE user_id IN (...50 id...)`). Đây là khác biệt 51 → 2 — lý do N+1 nguy hiểm khi N lớn.
> </details>

> 📝 **Tóm tắt mục 9.** N+1 = 1 query gốc + N query con trong vòng lặp, ẩn sau code ORM trông vô hại. Fix: `Preload` (→2 query) hoặc `Joins` (→1 query). Không over-Preload. Luôn đọc SQL log để phát hiện.

---

## 10. Migration tích hợp

Migration = đổi schema DB (thêm bảng, thêm cột) theo thời gian, có kiểm soát phiên bản.

### 10.1 GORM `AutoMigrate`

```go
db.AutoMigrate(&User{}, &Post{})
// So sánh struct với DB, TỰ thêm bảng/cột/index còn thiếu
```

> ⚠ **Lỗi nghiêm trọng — `AutoMigrate` trên prod.** `AutoMigrate` chỉ **thêm**, không bao giờ xoá cột/đổi kiểu một cách an toàn, và bạn **không thấy SQL DDL** nó chạy. Trên production điều này nguy hiểm: không có rollback, không review được DDL, dễ lock bảng lớn. **Quy tắc: `AutoMigrate` chỉ cho dev/test. Prod dùng migration tool có version** (`golang-migrate`, `goose`, `atlas`) với file `.sql` review được + rollback.

### 10.2 `ent` codegen

`ent` đi theo hướng khác: bạn định nghĩa schema bằng Go, `ent generate` sinh code; migration cũng sinh từ schema (versioned migration qua Atlas). An toàn hơn AutoMigrate vì có file migration review được.

> 📝 **Tóm tắt mục 10.** GORM `AutoMigrate` tiện cho dev nhưng **cấm dùng prod** (không rollback, DDL ẩn). Prod: migration tool có version (`golang-migrate`/`goose`/`atlas`). `ent` sinh migration versioned an toàn hơn.

---

## 11. Repository pattern — tách code khỏi thư viện DB

> 💡 **Trực giác.** Đừng để 200 chỗ trong code gọi thẳng `db.Where(...).First(...)` của GORM. Nếu mai mốt muốn đổi sang `sqlc` hay raw, bạn phải sửa 200 chỗ. Repository pattern dựng **1 cánh cửa** — interface `UserRepository` — mọi code đi qua cửa đó. Đổi thư viện = chỉ thay phần *sau* cửa, code *trước* cửa không đụng tới.

### 11.1 Interface (hợp đồng, không gắn ORM nào)

```go
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    List(ctx context.Context) ([]*User, error)
    Create(ctx context.Context, u *User) error
    Delete(ctx context.Context, id int64) error
}
```

Interface này **không nhắc tới GORM, sqlx, pgx**. Code nghiệp vụ (service) chỉ phụ thuộc vào nó.

### 11.2 Hai implementation swap được

```go
// Bản GORM
type gormUserRepo struct{ db *gorm.DB }
func (r *gormUserRepo) GetByID(ctx context.Context, id int64) (*User, error) {
    var u User
    err := r.db.WithContext(ctx).First(&u, id).Error
    return &u, err
}

// Bản raw sqlx — CÙNG interface
type sqlxUserRepo struct{ db *sqlx.DB }
func (r *sqlxUserRepo) GetByID(ctx context.Context, id int64) (*User, error) {
    var u User
    err := r.db.GetContext(ctx, &u, "SELECT * FROM users WHERE id=$1", id)
    return &u, err
}
```

Service nhận `UserRepository` qua tham số → đổi từ GORM sang sqlx chỉ là đổi 1 dòng `wireUp`. Test thì truyền bản in-memory (xem `solutions.go`).

> ❓ **Câu hỏi tự nhiên.** *"Repository pattern có làm chậm không?"* — Chi phí runtime ~0 (1 lần gọi interface). Cái giá thật là **boilerplate** (viết interface + nhiều impl) và nguy cơ *leaky abstraction* (vd phơi `*gorm.DB` ra interface → mất ý nghĩa). Giữ interface "thuần Go", không lọt kiểu của thư viện ra ngoài.

> 📝 **Tóm tắt mục 11.** Repository pattern = interface đứng giữa service và DB. Đổi thư viện DB chỉ sửa impl, không đụng nghiệp vụ. Lợi: test dễ (mock/in-memory), swap được. Giá: boilerplate. Giữ interface thuần Go, không lọt kiểu ORM ra ngoài.

---

## 12. Pitfall thường gặp (tổng hợp)

| # | Pitfall | Hậu quả | Cách tránh |
|---|---------|---------|------------|
| 1 | **GORM `AutoMigrate` trên prod** | DDL ẩn, không rollback, lock bảng | Migration tool versioned (`goose`/`migrate`), AutoMigrate chỉ dev |
| 2 | **N+1 không Preload** | 1001 query thay vì 2 | `Preload`/`Joins`, đọc SQL log |
| 3 | **ORM giấu SQL xấu** | Full scan, thiếu index, chậm âm thầm | Bật logger, EXPLAIN query nóng |
| 4 | **Quên `sqlc generate`** | Code Go lệch SQL | `go generate`/Makefile/CI tự chạy |
| 5 | **`SELECT *` với struct scan** | Lỗi `missing destination` khi schema đổi | SELECT đúng cột cần |
| 6 | **Leaky repository** | Phơi `*gorm.DB` ra interface → mất abstraction | Interface chỉ dùng kiểu domain thuần Go |
| 7 | **Soft delete bất ngờ (GORM)** | Tưởng đã xoá nhưng row còn | Biết `DeletedAt`, dùng `Unscoped()` khi cần xoá thật |
| 8 | **Over-Preload** | Over-fetch, tốn RAM/băng thông | Chỉ Preload dữ liệu chắc chắn dùng |

> 📝 **Tóm tắt mục 12.** Phần lớn pitfall đến từ **không thấy SQL** (magic của ORM). Vũ khí chung: bật logger, đọc SQL sinh ra, EXPLAIN query nóng. Migration prod luôn versioned. `sqlc` thì đừng quên generate.

---

## 13. Ứng dụng thực tế trong phần mềm

> 💡 **ORM vs raw SQL là tranh luận muôn thuở — sự thật: dùng đúng công cụ cho đúng query, và LUÔN biết SQL đang chạy.**

| Cách | Mạnh ở | Yếu ở |
|------|--------|-------|
| **ORM (GORM, Ent)** | CRUD nhanh, ít boilerplate, migration | Query phức tạp sinh SQL kém, "magic" ẩn |
| **Raw SQL / sqlx** | Kiểm soát hoàn toàn, query phức tạp | Boilerplate scan, dễ SQL injection nếu nối chuỗi |
| **`sqlc` (sinh code từ SQL)** | Viết SQL thật + có type-safety | Cần generate lại khi đổi |
| **Query builder (squirrel)** | SQL động an toàn | Trung gian, vẫn cần hiểu SQL |

### 13.1. Ví dụ cụ thể — N+1 query, sát thủ của ORM

```go
users := db.Find(&users)        // 1 query lấy users
for _, u := range users {
    db.Where("user_id=?", u.ID).Find(&u.Orders) // N query — mỗi user một lần!
}
```

1000 user → 1001 query → chậm gấp trăm lần. ORM ẩn điều này. Sửa: **eager loading** (`Preload("Orders")` → JOIN/IN, 2 query). Đây là bug hiệu năng #1 với ORM ([nối query execution](../../Databases/02-Intermediate/lesson-05-query-execution/)). Quy tắc sống còn: **bật SQL logger** để thấy ORM thực sự sinh gì — "magic không thấy SQL" là gốc mọi pitfall.

> ⚠ **Raw SQL phải dùng parameterized query — KHÔNG nối chuỗi.** `"SELECT * WHERE id = " + userInput` = **SQL injection** (kẻ tấn công nhập `1 OR 1=1; DROP TABLE`). Luôn `db.Query("... WHERE id = ?", userInput)` — driver tự escape. Quy tắc thực dụng: ORM cho CRUD thường (nhanh), raw/sqlc cho query phức tạp/báo cáo (kiểm soát + nhanh), không bao giờ nối chuỗi input vào SQL.

### 13.2. 📝 Tóm tắt mục 13

- ORM (CRUD nhanh) vs raw/sqlc (query phức tạp, kiểm soát) — dùng đúng cho đúng query.
- **N+1 query** = bẫy ORM #1 → eager loading (Preload); **bật SQL logger** để luôn thấy SQL thật.
- Raw SQL: **parameterized query** (`?`), không bao giờ nối chuỗi input → chống SQL injection.

## Bài tập

> Lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới. Thử tự làm trước.

**BT1.** Viết cùng một thao tác CRUD (lấy 1 user theo id) bằng raw `database/sql` và bằng `sqlx`. Đếm số dòng "ý nghĩa" mỗi cách, nhận xét.

**BT2.** Cho query `.sql` sau, **predict** signature hàm Go mà `sqlc` sinh ra (không cần chạy tool):
```sql
-- name: GetUserByEmail :one
SELECT id, name, email FROM users WHERE email = $1;

-- name: ListUsersByActive :many
SELECT id, name, email FROM users WHERE active = $1 ORDER BY name;

-- name: CountUsers :one
SELECT COUNT(*) FROM users;

-- name: DeactivateUser :exec
UPDATE users SET active = false WHERE id = $1;
```

**BT3.** Cho model GORM và đoạn query, xác định SQL được sinh ra:
```go
type Product struct {
    ID    uint
    Name  string
    Price int
}
db.Where("price > ?", 100).Order("price desc").Limit(5).Find(&products)
```

**BT4.** Đoạn code dưới gây N+1. (a) Giải thích nó bắn bao nhiêu query với 20 user. (b) Sửa bằng `Preload`. (c) Cho biết số query sau khi sửa.
```go
var users []User
db.Find(&users)
for i := range users {
    db.Model(&users[i]).Association("Orders").Find(&users[i].Orders)
}
```

**BT5.** Thiết kế `UserRepository` interface + 1 impl in-memory (cho test) và mô tả cách swap sang GORM impl mà không sửa code service.

**BT6.** Chọn công cụ phù hợp nhất cho 4 tình huống, giải thích:
- (a) Startup làm app quản lý công việc, chủ yếu CRUD, team 2 người, cần ra MVP trong 2 tuần.
- (b) API thanh toán, latency budget < 20ms, hàng chục nghìn TPS, chỉ dùng Postgres.
- (c) Hệ thống báo cáo doanh thu: query GROUP BY/JOIN/window function phức tạp, đọc nặng.
- (d) Mạng xã hội nội bộ: dữ liệu dạng graph (user ↔ friend ↔ group ↔ post) quan hệ chằng chịt, cần type-safe.

---

## Lời giải chi tiết

### Lời giải BT1 — Raw vs sqlx

**Raw `database/sql`:**
```go
func getUserRaw(db *sql.DB, id int64) (*User, error) {
    var u User
    err := db.QueryRow(
        "SELECT id, name, email FROM users WHERE id = $1", id,
    ).Scan(&u.ID, &u.Name, &u.Email)   // (1) liệt kê từng con trỏ, đúng thứ tự
    if err != nil {
        return nil, err
    }
    return &u, nil
}
```

**`sqlx`:**
```go
func getUserSqlx(db *sqlx.DB, id int64) (*User, error) {
    var u User
    err := db.Get(&u, "SELECT id, name, email FROM users WHERE id = $1", id)
    if err != nil {
        return nil, err
    }
    return &u, nil
}
```

**Đếm & nhận xét:** dòng "ý nghĩa" tương đương, nhưng raw có dòng `Scan(&u.ID, &u.Name, &u.Email)` — phải liệt kê **đúng số cột, đúng thứ tự**. Thêm 1 cột (vd `created_at`) → raw phải sửa cả SELECT lẫn Scan; `sqlx` chỉ thêm field tag, lời gọi `Get` không đổi. Khác biệt nổ to khi struct có 15-20 cột: raw thành 20 con trỏ trong `Scan`, dễ lệch. **Kết luận:** `sqlx` giảm boilerplate scan gần như free, control SQL giữ nguyên.

### Lời giải BT2 — Predict code sqlc sinh ra

Áp dụng quy tắc: `:one`→`(T,error)`, `:many`→`([]T,error)`, `:exec`→`error`; param `$1` thành tham số sau `ctx`.

```go
// GetUserByEmail :one — 1 row, param email (string từ cột email)
func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error)

// ListUsersByActive :many — nhiều row, param active (bool)
func (q *Queries) ListUsersByActive(ctx context.Context, active bool) ([]User, error)

// CountUsers :one — 1 giá trị COUNT, không param → trả int64
func (q *Queries) CountUsers(ctx context.Context) (int64, error)

// DeactivateUser :exec — không trả dữ liệu, param id (int64)
func (q *Queries) DeactivateUser(ctx context.Context, id int64) error
```

**Giải thích từng cái:**
- `GetUserByEmail`: `:one` → trả `(User, error)`. `$1` là `email` kiểu `string` (suy từ cột `email TEXT/VARCHAR`).
- `ListUsersByActive`: `:many` → `([]User, error)`. `$1` là `active bool`.
- `CountUsers`: `:one` nhưng SELECT 1 cột số → sqlc trả thẳng `int64` (không bọc struct). Không có `$` → không param.
- `DeactivateUser`: `:exec` → chỉ `error`. `$1` là `id int64`.

Điểm chốt: chỉ cần đọc annotation + param, **không cần chạy tool** vẫn đoán đúng signature → đó là sức mạnh "predictable" của sqlc.

### Lời giải BT3 — SQL GORM sinh ra

```sql
SELECT * FROM products
WHERE price > 100
ORDER BY price desc
LIMIT 5
```

**Giải thích:** `Find` = nhiều row (`SELECT *`). `Where("price > ?", 100)` → `WHERE price > 100` (GORM thay `?` bằng param, thực tế là prepared statement với `$1`). `Order("price desc")` → `ORDER BY price desc`. `Limit(5)` → `LIMIT 5`. Vì model `Product` không có `DeletedAt` nên **không** thêm `deleted_at IS NULL`. Nếu có sẽ thành `WHERE price > 100 AND deleted_at IS NULL`.

### Lời giải BT4 — N+1 với Association

**(a) Số query với 20 user:** `db.Find(&users)` = 1 query lấy 20 user. Vòng `for` 20 lần, mỗi lần `Association(...).Find` bắn 1 query lấy orders của user đó → 20 query. **Tổng = 1 + 20 = 21 query.** Với N user là N+1.

**(b) Sửa bằng Preload:**
```go
var users []User
db.Preload("Orders").Find(&users)   // 1 query users + 1 query orders WHERE user_id IN (...)
for i := range users {
    _ = users[i].Orders             // đã được nạp sẵn, không query thêm
}
```

**(c) Số query sau khi sửa = 2** (bất kể 20 hay 2000 user): 1 lấy users, 1 lấy tất cả orders bằng `WHERE user_id IN (1,2,...,20)`. GORM tự ghép orders vào đúng user. Từ 21 → 2.

### Lời giải BT5 — Repository pattern + in-memory

```go
type User struct {
    ID    int64
    Name  string
    Email string
}

// Hợp đồng — không nhắc tới thư viện DB nào
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    List(ctx context.Context) ([]*User, error)
    Create(ctx context.Context, u *User) error
    Delete(ctx context.Context, id int64) error
}

// Impl in-memory cho test — không cần DB thật
type memUserRepo struct {
    mu   sync.RWMutex
    data map[int64]*User
    seq  int64
}

func NewMemUserRepo() *memUserRepo {
    return &memUserRepo{data: make(map[int64]*User)}
}
func (r *memUserRepo) GetByID(_ context.Context, id int64) (*User, error) {
    r.mu.RLock(); defer r.mu.RUnlock()
    u, ok := r.data[id]
    if !ok { return nil, errors.New("not found") }
    cp := *u; return &cp, nil
}
func (r *memUserRepo) Create(_ context.Context, u *User) error {
    r.mu.Lock(); defer r.mu.Unlock()
    r.seq++; u.ID = r.seq
    cp := *u; r.data[u.ID] = &cp
    return nil
}
// List, Delete tương tự...
```

**Swap sang GORM mà không sửa service:** Service chỉ nhận `UserRepository` (interface), ví dụ:
```go
type UserService struct{ repo UserRepository }
func NewUserService(r UserRepository) *UserService { return &UserService{repo: r} }
```
Lúc wire-up (trong `main`): test thì `NewUserService(NewMemUserRepo())`; prod thì `NewUserService(NewGormUserRepo(db))`. Cả hai impl thoả cùng interface → **service không đổi một dòng nào**. Đây chính là điểm mạnh: code nghiệp vụ không biết và không cần biết bên dưới là GORM, sqlx hay map in-memory. (Xem `solutions.go` để chạy thực tế.)

### Lời giải BT6 — Chọn công cụ theo tình huống

- **(a) Startup CRUD, MVP 2 tuần → GORM.** CRUD lặp lại nhiều, schema còn đổi → AutoMigrate (dev) + chain method tiết kiệm cả nghìn dòng. Tốc-độ-ra-sản-phẩm thắng. Chỉ cần bật logger để không bị magic dắt.
- **(b) Payment API, <20ms, chục nghìn TPS, chỉ Postgres → `pgx` (có thể kèm `sqlc` sinh code cho pgx).** Cần đỉnh hiệu năng + control: binary protocol, pool, batch. `sqlc` thêm type-safety mà vẫn viết SQL thật. Tuyệt đối không GORM ở hot path.
- **(c) Báo cáo phức tạp (GROUP BY/JOIN/window) → raw `sqlx` hoặc `sqlc`.** Query analytics phức tạp viết SQL thật mới rõ ràng & tối ưu được; ORM sinh SQL kém hoặc bất lực với window function. `sqlx` để đỡ scan, `sqlc` nếu muốn type-safe.
- **(d) Mạng xã hội dạng graph, quan hệ chằng chịt, type-safe → `ent`.** `ent` sinh từ "graph" được thiết kế đúng cho quan hệ nhiều-nhiều phức tạp, traversal type-safe (`user.QueryFriends().QueryGroups()...`). GORM association cũng làm được nhưng `ent` mạnh & an toàn hơn ở mô hình graph.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — Repository pattern chạy được: interface `UserRepository` + impl in-memory, demo API kiểu raw vs kiểu ORM, mô phỏng N+1 vs Preload bằng đếm "query". Comment tiếng Việt, biên dịch & chạy được không cần DB thật.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) **Tool spectrum picker** — chọn scenario → gợi ý công cụ; (2) **N+1 visualizer** — so sánh lazy vs Preload theo số user; (3) **Code comparison** — cùng 1 query viết bằng raw/sqlx/sqlc/GORM cạnh nhau, kèm số dòng + badge type-safety.

## Bài tiếp theo

- [L56: Transactions & Isolation](../lesson-56-transactions-isolation/) — sau khi biết *cách nói chuyện* với DB, học *đảm bảo tính đúng đắn* khi nhiều thao tác phải "cùng thành công hoặc cùng thất bại": `BEGIN/COMMIT/ROLLBACK`, mức isolation, deadlock.
- Ôn lại [L54: SQL & `database/sql`](../lesson-54-sql-database-sql/) — nền tảng mọi thư viện ở bài này.
