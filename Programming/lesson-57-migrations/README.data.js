// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-57-migrations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 57 — Database Migrations

> **Tier 5 — Database & Storage.** Schema không bao giờ đứng yên: thêm bảng, thêm cột, đổi tên, đánh index. Bài này dạy cách **thay đổi schema một cách có version, reproducible, và không làm sập production** — trọng tâm là **zero-downtime migration** và **expand-contract pattern**.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Hiểu **vì sao** cần migration thay vì sửa schema bằng tay.
2. Biết **migration là gì** — set thay đổi có thứ tự, mỗi cái có \`up\` (apply) + \`down\` (rollback).
3. So sánh các tool Go: \`golang-migrate\`, \`goose\`, \`atlas\`, GORM AutoMigrate — khi nào dùng cái nào.
4. Thực hiện **golang-migrate workflow**: file naming, \`up\`/\`down\`/\`goto\`, table \`schema_migrations\`.
5. Nắm **zero-downtime migration** cho từng thao tác: add column, drop column, rename column, add NOT NULL, add index.
6. Áp dụng **expand-contract pattern** (parallel change) để thay đổi schema khi app vẫn đang chạy.
7. **Backfill** data lớn theo batch mà không lock table.
8. Chạy migration trong **CI/CD** và chọn **rollback strategy** đúng (forward-fix vs down).
9. Phân biệt **schema migration (DDL)** vs **data migration (DML)**.
10. Tránh các **common pitfall** đã làm sập không biết bao nhiêu hệ thống production.

## Kiến thức tiền đề

- [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/README.md): biết DDL (\`CREATE TABLE\`, \`ALTER TABLE\`), \`database/sql\`.
- [Lesson 55 — ORM vs Raw SQL](../lesson-55-orm-vs-raw/README.md): hiểu GORM AutoMigrate, sqlc.
- [Lesson 56 — Transaction & Isolation](../lesson-56-transactions-isolation/README.md): hiểu lock, isolation — vì migration đụng tới lock table.

---

## 1. Vì sao cần migration

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng schema database là một tòa nhà đang có người ở. Bạn không thể "đập đi xây lại" — phải sửa từng phòng trong khi cư dân vẫn sinh hoạt. Migration là **bản vẽ thi công có đánh số thứ tự**: ai cũng làm theo đúng bản vẽ đó, kết quả ra giống hệt nhau, và nếu sai có thể tháo dỡ phần vừa làm.

Schema (cấu trúc bảng, cột, index, constraint) **thay đổi theo thời gian**: thêm tính năng → thêm bảng; tối ưu query → thêm index; refactor → đổi tên cột. Nếu mỗi lập trình viên tự gõ \`ALTER TABLE\` trên database của mình, sẽ xảy ra ba thảm họa:

1. **Không reproducible.** Máy của bạn có cột \`users.avatar_url\`, máy đồng nghiệp không có. Code chạy ở máy bạn, crash ở máy họ. Không ai biết database "đúng" trông như thế nào.
2. **Không version control.** Schema sống trong đầu vài người. Khi họ nghỉ việc, không ai biết tại sao có cột \`legacy_flag\`. Không có lịch sử "ai đổi gì, khi nào, vì sao".
3. **Không sync được team / môi trường.** Dev, staging, production lệch schema → "chạy ở local mà sao prod lỗi?". Onboarding người mới mất cả buổi để dựng database.

**Migration giải quyết cả ba**: các thay đổi schema được viết thành **file SQL (hoặc code) đánh số thứ tự**, commit vào git như source code. Bất kỳ ai, bất kỳ môi trường nào, chạy \`migrate up\` đều ra **đúng cùng một schema**.

**Ví dụ cụ thể (kịch bản thật).** Ngày 1, bạn tạo bảng \`users(id, name)\`. Ngày 5, cần thêm \`email\` cho tính năng đăng nhập. Ngày 12, thêm bảng \`posts\`. Ngày 20, đánh index cho \`posts.user_id\` vì query chậm. Nếu mỗi thay đổi này chỉ là một dòng \`ALTER\`/\`CREATE\` gõ tay trên DB của bạn:

- Đồng nghiệp pull code "tính năng đăng nhập" về nhưng DB của họ chưa có cột \`email\` → code gọi \`SELECT email\` → crash. Họ phải hỏi bạn "phải chạy SQL gì?".
- Production đang ở schema ngày 12, staging ở ngày 20 → test pass ở staging, fail ở prod.
- Một năm sau không ai nhớ vì sao \`users\` có cột \`legacy_token\`.

Với migration, bốn thay đổi trên là bốn file \`000001..000004\` trong git. Đồng nghiệp pull code đăng nhập về kèm luôn file migration tạo cột \`email\`; chạy \`migrate up\` là DB tự nhảy từ ngày 1 lên ngày 5. Production, staging, local đều \`migrate up\` → cùng schema. Lịch sử "ai thêm \`legacy_token\`, commit nào, vì sao" nằm ngay trong git blame của file migration.

| Vấn đề | Sửa schema bằng tay | Dùng migration |
|--------|---------------------|----------------|
| Reproducible | ❌ Mỗi máy mỗi khác | ✅ \`migrate up\` → giống nhau |
| Version control | ❌ Không lịch sử | ✅ File trong git, có diff |
| Team sync | ❌ Lệch schema | ✅ Pull code = pull schema |
| Rollback | ❌ Nhớ tay viết \`DROP\` | ✅ File \`.down.sql\` |
| CI/CD | ❌ Không tự động được | ✅ Chạy migration trong pipeline |

> 📝 **Tóm tắt mục 1.** Migration = schema-as-code: có version, reproducible, sync được team và môi trường. Không bao giờ sửa schema production bằng tay.

---

## 2. Migration là gì

**Migration** là một **tập các thay đổi schema có thứ tự**. Mỗi migration là một bước nhỏ, gồm hai phần:

- **up** — *apply* thay đổi (đi tiến): vd \`CREATE TABLE users\`.
- **down** — *rollback* thay đổi (đi lùi): vd \`DROP TABLE users\`, đảo ngược chính xác phần \`up\`.

Database lưu **version hiện tại** của nó (đã chạy tới migration số mấy) trong một bảng đặc biệt. Khi bạn gọi \`migrate up\`, tool nhìn version hiện tại, tìm các migration **chưa chạy**, và chạy phần \`up\` của chúng theo đúng thứ tự tăng dần.

\`\`\`
Version 0 (trống)
  │  001_create_users.up.sql   →  CREATE TABLE users
  ▼
Version 1
  │  002_add_email.up.sql      →  ALTER TABLE users ADD email
  ▼
Version 2
  │  003_create_posts.up.sql   →  CREATE TABLE posts
  ▼
Version 3  ← database đang ở đây
\`\`\`

Gọi \`migrate down 1\` → chạy \`003_create_posts.down.sql\` (\`DROP TABLE posts\`) → quay về Version 2.

> 💡 **Trực giác.** Migration giống **commit của git nhưng cho schema**. \`up\` = "apply commit này", \`down\` = "revert commit này". Version number = con trỏ HEAD chỉ database đang ở commit nào.

**Walk-through version tracking bằng số cụ thể.** Giả sử database ở Version 1 (đã chạy \`001\`). Bạn pull code mới có thêm \`002\` và \`003\`. Gọi \`migrate up\`:

\`\`\`
schema_migrations.version = 1   (trạng thái hiện tại)
→ tool tìm các file > 1: thấy 002, 003
→ chạy 002.up.sql  → set version = 2
→ chạy 003.up.sql  → set version = 3
schema_migrations.version = 3   (kết thúc)
\`\`\`

Bây giờ gọi \`migrate down 2\`:
\`\`\`
version = 3
→ chạy 003.down.sql → version = 2
→ chạy 002.down.sql → version = 1
version = 1
\`\`\`

Tool **không bao giờ** chạy lại \`001\` (vì version ≥ 1 đã apply) — đó là cách migration đảm bảo mỗi bước chạy đúng một lần.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mỗi migration phải nhỏ cỡ nào?"* → Một thay đổi logic độc lập: 1 bảng, 1 cột, 1 index. Nhỏ để dễ rollback và review.
> - *"Đã chạy migration rồi sửa file đó được không?"* → **Không.** File đã chạy là bất biến (immutable). Muốn sửa → tạo migration **mới**. Sửa file cũ làm các môi trường lệch nhau (máy bạn re-run, máy khác không).
> - *"Down có bắt buộc không?"* → Khuyến nghị có, nhưng nhiều down không an toàn (mất data) — xem mục 10.

> 📝 **Tóm tắt mục 2.** Migration = bước thay đổi schema có thứ tự, mỗi bước có up (tiến) + down (lùi). Database nhớ version. File đã chạy là immutable.

---

## 3. Các tool migration trong Go

Hệ sinh thái Go có 4 lựa chọn chính. Đây không phải toy — đây là các tool dùng thật ở production:

### 3.1 \`golang-migrate/migrate\` — phổ biến nhất

- Dạng: **CLI + library**. Viết migration bằng **file SQL thuần** (\`.up.sql\` / \`.down.sql\`).
- Hỗ trợ nhiều database (Postgres, MySQL, SQLite, Mongo...) và nhiều nguồn file (local, S3, GitHub).
- Track version trong table \`schema_migrations\`.
- **Khi nào dùng:** team thích viết SQL thuần, muốn tool đơn giản, ổn định. Đây là lựa chọn mặc định an toàn.

\`\`\`bash
migrate -path ./migrations -database "$DATABASE_URL" up
\`\`\`

### 3.2 \`pressly/goose\` — migration bằng SQL hoặc Go code

- Dạng: CLI + library. Migration viết bằng **SQL** (với annotation \`-- +goose Up\`) **hoặc bằng Go code** (\`func upXXX(tx *sql.Tx)\`).
- Điểm mạnh: migration **bằng Go** cho phép logic phức tạp (vd backfill cần gọi API, transform data) ngay trong migration.
- **Khi nào dùng:** cần data migration phức tạp viết bằng Go, không chỉ SQL thuần.

\`\`\`sql
-- +goose Up
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
-- +goose Down
DROP TABLE users;
\`\`\`

### 3.3 \`ariga/atlas\` — declarative + versioned, HCL

- Dạng: tool hiện đại, hỗ trợ **2 mode**:
  - **Versioned**: giống golang-migrate (file có thứ tự).
  - **Declarative**: bạn khai báo schema **mục tiêu** (bằng HCL hoặc SQL), atlas tự **diff** schema hiện tại và sinh ra các lệnh ALTER cần thiết — giống \`terraform plan\` cho database.
- Có kiểm tra an toàn (lint): cảnh báo "lệnh này lock table", "drop cột này nguy hiểm".
- **Khi nào dùng:** muốn khai báo schema mong muốn thay vì viết từng ALTER; muốn tool tự cảnh báo migration nguy hiểm.

### 3.4 GORM AutoMigrate — **chỉ dùng cho dev**

- GORM (ORM ở [Lesson 55](../lesson-55-orm-vs-raw/README.md)) có \`db.AutoMigrate(&User{})\`: tự tạo/sửa bảng cho khớp struct Go.
- **Hạn chế nghiêm trọng:** AutoMigrate **chỉ thêm**, **không xóa** cột/index thừa; **không có rollback**; **không có thứ tự version**; **không kiểm soát được** lệnh nguy hiểm. Nó có thể lock bảng lớn lúc nào không biết.

> ⚠ **Lỗi thường gặp.** Dùng \`AutoMigrate\` trên **production**. Nó tiện cho prototype local, nhưng không version, không down, không an toàn cho zero-downtime. Production luôn dùng tool versioned (golang-migrate / goose / atlas). AutoMigrate chỉ nên xuất hiện trong môi trường dev hoặc test ephemeral.

| Tool | Format | Rollback | Declarative | Dùng tốt nhất khi |
|------|--------|:---:|:---:|---|
| golang-migrate | SQL file | ✅ down.sql | ❌ | Mặc định an toàn, SQL thuần |
| goose | SQL hoặc Go | ✅ | ❌ | Cần logic Go trong migration |
| atlas | HCL/SQL | ✅ | ✅ | Muốn diff schema tự động + lint an toàn |
| GORM AutoMigrate | Struct Go | ❌ | (kiểu) | **Chỉ dev/prototype** |

> 📝 **Tóm tắt mục 3.** golang-migrate = mặc định an toàn (SQL file). goose = thêm logic Go. atlas = declarative + lint an toàn. GORM AutoMigrate = chỉ dev, KHÔNG production.

---

## 4. golang-migrate workflow

Đây là workflow bạn sẽ dùng hàng ngày. Dùng làm chuẩn cho cả bài.

### 4.1 File naming

Mỗi migration là **một cặp file**:

\`\`\`
migrations/
  000001_create_users.up.sql
  000001_create_users.down.sql
  000002_create_posts.up.sql
  000002_create_posts.down.sql
  000003_add_users_email.up.sql
  000003_add_users_email.down.sql
\`\`\`

- Prefix số **6 chữ số tăng dần** (\`000001\`, \`000002\`...) — quyết định **thứ tự** chạy.
- Phần mô tả (\`create_users\`) chỉ để người đọc hiểu.
- \`.up.sql\` chạy khi \`up\`, \`.down.sql\` chạy khi \`down\`.

Sinh file mới bằng CLI (tự đánh số):

\`\`\`bash
migrate create -ext sql -dir migrations -seq create_users
# → tạo 000001_create_users.up.sql + .down.sql
\`\`\`

### 4.2 Các lệnh chính

\`\`\`bash
# Chạy TẤT CẢ migration chưa chạy (đi tiến tới mới nhất)
migrate -path migrations -database "$DATABASE_URL" up

# Chạy N migration tiếp theo
migrate ... up 2

# Lùi N migration (chạy down)
migrate ... down 1

# Nhảy thẳng tới version N (tiến hoặc lùi tùy đang ở đâu)
migrate ... goto 2

# Xem version hiện tại
migrate ... version
\`\`\`

### 4.3 Table \`schema_migrations\`

golang-migrate tự tạo bảng này để nhớ database đang ở version nào:

\`\`\`sql
CREATE TABLE schema_migrations (
    version BIGINT NOT NULL PRIMARY KEY,  -- version cao nhất đã chạy
    dirty   BOOLEAN NOT NULL              -- true nếu migration trước CHẠY DỞ rồi lỗi
);
\`\`\`

- \`version\` = số migration cao nhất đã apply thành công.
- \`dirty = true\` nghĩa là migration đang chạy thì lỗi giữa chừng → database ở trạng thái **không xác định**. Phải sửa tay rồi \`migrate force <version>\` để gỡ cờ dirty trước khi chạy tiếp.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao có cờ dirty?"* → Vì nếu một file \`.up.sql\` có 3 lệnh, lệnh 2 lỗi, thì database đã chạy lệnh 1 nhưng không phải lệnh 3 — nửa nạc nửa mỡ. Tool không biết tự dọn (trừ khi migration chạy trong transaction). Cờ dirty bắt bạn xử lý thủ công thay vì mù quáng chạy tiếp.

> ⚠ **Lỗi thường gặp.** Postgres chạy được DDL trong transaction (an toàn, rollback tự động khi lỗi); **MySQL thì không** — mỗi lệnh DDL tự commit ngầm, nên migration nhiều lệnh trên MySQL dễ để lại trạng thái dirty. Trên MySQL, giữ mỗi migration **chỉ một lệnh DDL** khi có thể.

> 📝 **Tóm tắt mục 4.** File \`NNNNNN_name.up.sql\`/\`.down.sql\` đánh số tăng dần. Lệnh: \`up\`/\`down N\`/\`goto N\`/\`version\`. Bảng \`schema_migrations\` nhớ version + cờ \`dirty\` báo migration chạy dở.

---

## 5. Up / Down migration

Mỗi migration phải có **cặp** up/down đối xứng: down phải đảo ngược **chính xác** up.

\`000001_create_users.up.sql\`:
\`\`\`sql
CREATE TABLE users (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
\`\`\`

\`000001_create_users.down.sql\`:
\`\`\`sql
DROP TABLE users;
\`\`\`

Một ví dụ phức tạp hơn — thêm cột và index:

\`000003_add_users_email.up.sql\`:
\`\`\`sql
ALTER TABLE users ADD COLUMN email TEXT;
CREATE INDEX idx_users_email ON users (email);
\`\`\`

\`000003_add_users_email.down.sql\`:
\`\`\`sql
DROP INDEX idx_users_email;
ALTER TABLE users DROP COLUMN email;
\`\`\`

Lưu ý: down chạy **ngược thứ tự** up (tạo index sau → drop index trước).

> ⚠ **Lỗi thường gặp.** Viết down không thật sự đảo ngược up. Vd up \`ALTER TABLE users ADD COLUMN email TEXT DEFAULT 'x'\` nhưng down chỉ \`DROP COLUMN email\` — ổn. Nhưng up \`UPDATE users SET status = 'active'\` (data migration) thì down **không thể** khôi phục giá trị status cũ vì nó đã bị ghi đè. Đây là lý do down migration của data thường **không an toàn** (mục 10).

> 🔁 **Dừng lại tự kiểm tra.** Up của bạn là \`CREATE INDEX idx ON t(c); ALTER TABLE t ADD COLUMN c2 INT;\`. Down đúng phải là gì?
> <details><summary>Đáp án</summary>
> Đảo ngược thứ tự: <code>ALTER TABLE t DROP COLUMN c2; DROP INDEX idx;</code>. Drop cột trước (vì nó tạo sau), drop index sau. Thực tế thứ tự index/cột ở đây độc lập nên không bắt buộc, nhưng nguyên tắc "down đảo ngược up theo thứ tự ngược" luôn an toàn.
> </details>

> 📝 **Tóm tắt mục 5.** Cặp up/down đối xứng; down đảo ngược up theo thứ tự ngược. Data migration (UPDATE) thường không down lại được — cẩn thận.

---

## 6. Zero-downtime migration (quan trọng nhất)

> 💡 **Trực giác / Hình dung.** App production có **nhiều instance** chạy đồng thời. Khi deploy, code cũ và code mới **chạy song song trong vài giây/phút** (rolling deploy). Schema phải tương thích với **CẢ HAI** phiên bản code cùng lúc — như cái cầu phải đỡ được cả xe cũ lẫn xe mới trong lúc đang nâng cấp, không được đóng cầu.

Nguyên tắc vàng: **schema change phải backward-compatible với code đang chạy**. Đừng bao giờ làm một thay đổi mà code hiện tại (chưa deploy phiên bản mới) sẽ crash.

Xét từng thao tác:

### 6.1 Add column — thường safe

- Thêm cột **nullable** hoặc **có DEFAULT** → an toàn. Code cũ không biết cột mới, vẫn \`INSERT\` bình thường (cột nhận NULL/default).
- **Cảnh báo Postgres:** thêm cột có \`DEFAULT\` **giá trị động** (vd \`DEFAULT now()\`) hoặc trên version cũ (< PG 11) có thể **rewrite cả bảng** → lock lâu. Từ PG 11 trở lên, default hằng số được tối ưu (không rewrite).

\`\`\`sql
-- safe: nullable
ALTER TABLE users ADD COLUMN phone TEXT;
-- safe trên PG 11+: default hằng
ALTER TABLE users ADD COLUMN active BOOLEAN NOT NULL DEFAULT true;
\`\`\`

### 6.2 Drop column — phải 2-phase

Code cũ vẫn \`SELECT col\` hoặc \`INSERT ... col\`. Nếu bạn drop cột ngay → code cũ crash (\`column does not exist\`).

- **Phase 1 (deploy code mới):** code mới **ngừng dùng** cột đó (không SELECT, không INSERT vào nó). Cột vẫn còn trong DB.
- **Phase 2 (sau khi không còn instance code cũ):** chạy migration \`DROP COLUMN\`.

### 6.3 Rename column — KHÔNG rename trực tiếp

\`ALTER TABLE users RENAME COLUMN name TO full_name\` là **một lệnh atomic** trong DB, nhưng nó **không zero-downtime**: ngay sau khi rename, code cũ tìm cột \`name\` → crash; trước khi rename, code mới tìm \`full_name\` → crash. Không có thời điểm nào cả hai cùng chạy được.

Cách đúng (5 bước — chính là expand-contract, mục 7):

1. **Add** cột mới \`full_name\` (nullable).
2. **Backfill**: \`UPDATE users SET full_name = name\` (theo batch, mục 8).
3. **Dual-write**: deploy code ghi vào **cả hai** cột \`name\` và \`full_name\` (đọc vẫn từ \`name\`).
4. **Switch read**: deploy code đọc từ \`full_name\`.
5. **Drop** cột cũ \`name\` (sau khi chắc không còn ai dùng).

### 6.4 Add NOT NULL — 3 bước

Không \`ALTER TABLE ADD COLUMN x INT NOT NULL\` thẳng (nếu không có default thì lỗi/lock; có default thì xem 6.1). Với cột đã tồn tại muốn thêm NOT NULL:

1. **Add** cột nullable (nếu là cột mới): \`ADD COLUMN x INT\`.
2. **Backfill**: điền giá trị cho mọi row đang NULL.
3. **Add constraint**: \`ALTER TABLE t ALTER COLUMN x SET NOT NULL\` (Postgres ≥ 12 dùng cách kiểm tra rẻ hơn nếu có \`CHECK ... NOT VALID\` + \`VALIDATE\`).

### 6.5 Add index — CONCURRENTLY (Postgres)

\`CREATE INDEX\` thường **lock write** cả bảng cho tới khi index xây xong → trên bảng lớn = downtime. Postgres có:

\`\`\`sql
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);
\`\`\`

\`CONCURRENTLY\` xây index **không lock write** (chậm hơn, quét bảng 2 lần). **Lưu ý:** \`CREATE INDEX CONCURRENTLY\` **không chạy được trong transaction** → trong golang-migrate phải tắt transaction cho migration đó (đặt comment \`-- migrate:no-transaction\` tùy tool, hoặc tách riêng file).

| Thao tác | Cách naive (nguy hiểm) | Cách zero-downtime |
|----------|------------------------|--------------------|
| Add column | \`ADD COLUMN x NOT NULL\` (không default) | nullable / có default |
| Drop column | \`DROP COLUMN\` ngay | 2-phase: stop using → drop |
| Rename column | \`RENAME COLUMN\` | add → backfill → dual-write → switch read → drop |
| Add NOT NULL | thêm thẳng | add nullable → backfill → set NOT NULL |
| Add index | \`CREATE INDEX\` | \`CREATE INDEX CONCURRENTLY\` |

> ⚠ **Lỗi thường gặp.** Tưởng \`RENAME COLUMN\` là zero-downtime vì nó "nhanh". Nó nhanh nhưng **phá tương thích**: không có thời điểm nào code cũ và code mới cùng đọc được. Luôn tách thành add → migrate → drop.

> 🔁 **Dừng lại tự kiểm tra.** Bạn cần thêm cột \`created_at TIMESTAMP NOT NULL DEFAULT now()\` vào bảng \`orders\` 50 triệu row trên Postgres 13. An toàn không?
> <details><summary>Đáp án</summary>
> Khá an toàn. PG 11+ tối ưu DEFAULT hằng (không rewrite bảng). Nhưng <code>now()</code> là <strong>biểu thức động</strong>, không phải hằng → PG vẫn phải rewrite để điền giá trị thật cho từng row → lock lâu trên 50M row. An toàn hơn: add nullable → backfill <code>created_at</code> theo batch → set DEFAULT + NOT NULL.
> </details>

> 📝 **Tóm tắt mục 6.** Nguyên tắc: schema phải tương thích với code cũ lẫn mới đang chạy song song. Add column nullable/default = safe. Drop/rename/NOT NULL = nhiều phase. Add index = CONCURRENTLY (ngoài transaction).

---

## 7. Expand-contract pattern (parallel change)

Đây là **khuôn mẫu tổng quát** cho mọi thay đổi schema phá tương thích. Tên khác: **parallel change**. Ba giai đoạn:

\`\`\`
EXPAND  → MIGRATE → CONTRACT
(nới ra)  (chuyển)  (thu lại)
\`\`\`

1. **Expand** — thêm schema mới **tương thích với cả code cũ và code mới**. Cả hai schema (cũ + mới) cùng tồn tại. Không xóa gì.
2. **Migrate** — deploy code mới dùng schema mới; backfill data; chuyển traffic dần. Trong giai đoạn này cả hai code có thể cùng chạy.
3. **Contract** — sau khi chắc chắn **không còn ai dùng** schema cũ, xóa nó đi.

Ví dụ cụ thể: **đổi tên cột \`name\` → \`full_name\`** (5 phase chi tiết, là instance của expand-contract):

| Phase | Migration / Deploy | Code đọc | Code ghi | Trạng thái DB |
|-------|--------------------|----------|----------|----------------|
| 0 | (ban đầu) | \`name\` | \`name\` | chỉ có \`name\` |
| 1 — Expand | migration: \`ADD COLUMN full_name\` | \`name\` | \`name\` | có cả 2, \`full_name\` NULL |
| 2 — Backfill | migration/script: \`UPDATE SET full_name=name\` (batch) | \`name\` | \`name\` | \`full_name\` đã đầy |
| 3 — Dual-write | deploy code: ghi cả 2 | \`name\` | \`name\` + \`full_name\` | đồng bộ |
| 4 — Switch read | deploy code: đọc \`full_name\` | \`full_name\` | \`name\` + \`full_name\` | đồng bộ |
| 5 — Contract | migration: \`DROP COLUMN name\` | \`full_name\` | \`full_name\` | chỉ còn \`full_name\` |

Giữa các phase phải **chờ** cho tất cả instance code cũ rút hết (rolling deploy xong) trước khi sang phase tiếp. Nếu vội (vd contract khi code cũ còn ghi vào \`name\`) → mất dữ liệu hoặc crash.

> 💡 **Trực giác.** Giống thay đường ray xe lửa khi tàu vẫn chạy: đặt ray mới song song ray cũ (expand) → chuyển tàu sang ray mới dần (migrate) → tháo ray cũ (contract). Không bao giờ có lúc tàu không có ray để chạy.

> ❓ **Câu hỏi tự nhiên.** *"Sao nhiều bước thế, mất công?"* → Vì đánh đổi giữa **công sức** và **uptime**. Với bảng nhỏ + maintenance window cho phép downtime, bạn có thể rename thẳng. Với hệ thống 24/7 không được downtime, expand-contract là cái giá bắt buộc.

> 📝 **Tóm tắt mục 7.** Expand-contract = nới schema (giữ cả cũ + mới) → migrate code/data → thu schema cũ. Mỗi phase chờ deploy trước rút hết. Khuôn mẫu cho mọi thay đổi phá tương thích.

---

## 8. Backfill — điền data cho cột mới

Khi thêm cột (hoặc bảng mới cần populate), thường phải **backfill** = điền giá trị cho các row đang có.

Cách **sai** (lock cả bảng):
\`\`\`sql
-- 10 triệu row → 1 transaction khổng lồ → lock dài, blow up WAL, có thể timeout
UPDATE users SET full_name = name;
\`\`\`

Cách **đúng — batch**: chia thành nhiều lô nhỏ, mỗi lô là một transaction ngắn, nghỉ giữa các lô để DB thở:

\`\`\`sql
-- lặp lại tới khi không còn row nào để update
UPDATE users
SET full_name = name
WHERE full_name IS NULL
  AND id IN (
    SELECT id FROM users WHERE full_name IS NULL LIMIT 5000
  );
\`\`\`

Hoặc theo dải khóa (key-range, hiệu quả hơn vì dùng index):
\`\`\`sql
UPDATE users SET full_name = name
WHERE id >= :start AND id < :start + 5000 AND full_name IS NULL;
-- tăng :start lên 5000 mỗi vòng, lặp tới hết max(id)
\`\`\`

Trong Go (pseudo, xem \`solutions.go\`):
\`\`\`go
const batch = 5000
for start := 0; start <= maxID; start += batch {
    db.Exec(\`UPDATE users SET full_name = name
             WHERE id >= $1 AND id < $2 AND full_name IS NULL\`,
        start, start+batch)
    time.Sleep(50 * time.Millisecond) // nhường tài nguyên cho traffic thật
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Backfill \`UPDATE ... \` không có \`WHERE\` lọc + không batch → lock table lâu, transaction dài làm autovacuum không dọn được dead tuple, replica lag tăng vọt. Luôn batch + giới hạn theo điều kiện + nghỉ giữa lô.

> ❓ **Câu hỏi tự nhiên.** *"Batch size bao nhiêu là đúng?"* → Không có con số vàng; 1000–10000 là điểm khởi đầu phổ biến. Đo lock time / replica lag rồi điều chỉnh. Nhỏ hơn = an toàn hơn nhưng lâu hơn.

> 📝 **Tóm tắt mục 8.** Backfill data lớn phải batch (mỗi lô vài nghìn row, transaction ngắn, nghỉ giữa lô). Không bao giờ một UPDATE khổng lồ.

---

## 9. Migration trong CI/CD

Migration phải chạy **trước khi** app phiên bản mới phục vụ traffic. Hai mô hình phổ biến:

### 9.1 Bước riêng trong pipeline
\`\`\`yaml
# pseudo CI/CD
deploy:
  - step: run-migrations    # migrate up trước
      run: migrate -path migrations -database $DATABASE_URL up
  - step: deploy-app        # rồi mới deploy code
      run: kubectl rollout restart deployment/api
\`\`\`

### 9.2 Init container trong Kubernetes
App pod có một **init container** chạy \`migrate up\` trước khi container chính (app) khởi động. Pod chỉ "ready" sau khi migration xong.

> ⚠ **Lỗi thường gặp.** Để **mỗi instance app** tự chạy migration lúc khởi động → khi scale 10 pod, 10 pod cùng chạy migration → đua nhau (race), một số lỗi "relation already exists". Giải pháp: dùng **một** job/init-container chạy migration (golang-migrate dùng advisory lock để chỉ một process chạy được tại một thời điểm — nhưng đừng phụ thuộc may rủi, hãy tách bước migration ra riêng).

> ❓ **Câu hỏi tự nhiên.** *"Migrate trước hay deploy code trước?"* → Vì schema phải backward-compatible (mục 6), migration luôn **expand** an toàn cho code cũ → chạy migration **trước** deploy là chuẩn. Chỉ phần **contract** (drop) mới chạy **sau** khi code cũ rút hết.

> 📝 **Tóm tắt mục 9.** Chạy migration trong một bước/init-container riêng, TRƯỚC khi deploy app. Không để mỗi instance tự migrate (race). Expand trước deploy, contract sau.

---

## 10. Rollback strategy — forward-fix thường tốt hơn

Khi migration mới gây lỗi production, bản năng là "chạy \`down\` quay lại". Nhưng:

- **Down DDL** (drop bảng/cột vừa tạo) thường ổn nếu chưa có data mới.
- **Down DML / data** thường **mất dữ liệu**: vd up đã \`UPDATE\` ghi đè giá trị cũ → down không khôi phục được giá trị gốc.
- Trong production, sau khi up chạy thành công, **app đã ghi data mới** vào schema mới. Down sẽ **vứt data** đó đi.

Vì vậy production thường ưu tiên **forward-fix (roll-forward)**: thay vì lùi, viết **migration mới** sửa vấn đề.

| Tình huống | Nên làm |
|-----------|---------|
| Migration vừa chạy, chưa có data mới, môi trường dev | \`down\` để thử lại |
| Production, đã có data mới, schema sai | Forward-fix: migration mới sửa |
| Migration làm lock/perf, nhưng schema đúng | Forward-fix: thêm index / sửa cách backfill |
| Data migration ghi sai → cần khôi phục | Restore từ backup (down không cứu được) |

> ⚠ **Lỗi thường gặp.** Hoảng loạn chạy \`migrate down\` trên production để "quay về trạng thái trước" → drop cột vừa add → mất hết data đã ghi vào cột đó trong vài phút app chạy. Trên production, **mặc định nghĩ tới forward-fix trước**.

> 📝 **Tóm tắt mục 10.** Down an toàn cho dev / DDL chưa có data. Production ưu tiên forward-fix (migration mới sửa) vì down dễ mất data. Data sai nặng → restore backup.

---

## 11. Data migration vs schema migration

Hai loại "migration" rất khác nhau, **nên tách riêng**:

- **Schema migration (DDL)** — đổi *cấu trúc*: \`CREATE/ALTER/DROP TABLE\`, \`ADD/DROP COLUMN\`, \`CREATE INDEX\`. Nhanh (thường), reversible (thường), chạy bằng migration tool.
- **Data migration (DML)** — *biến đổi dữ liệu*: \`UPDATE users SET role = 'member' WHERE role IS NULL\`, copy data sang bảng mới, normalize. Có thể chậm (chạm hàng triệu row), thường **không reversible** (mất giá trị cũ).

**Vì sao tách riêng?**
- DDL thường chạy nhanh + an toàn để lùi; DML chậm + không lùi được. Trộn chung → một migration vừa khó rollback vừa lâu.
- DML lớn cần batch (mục 8); để chung file DDL khiến file đó vừa thay schema vừa lock lâu vì update.
- DML đôi khi nên chạy **bất đồng bộ** (background job) sau khi schema đã expand, thay vì block deploy.

> ⚠ **Lỗi thường gặp.** Nhét một \`UPDATE\` 10 triệu row vào cùng file migration với \`ALTER TABLE\`. Migration đó chạy 20 phút, lock bảng, làm deploy treo, và không down lại được. Tách: migration DDL (nhanh) chạy đồng bộ; data backfill (chậm) chạy batch/background.

> 📝 **Tóm tắt mục 11.** DDL (cấu trúc) nhanh + reversible; DML (data) chậm + thường không reversible. Tách riêng để rollback dễ và không lock lâu.

---

## 12. Common pitfall (tổng hợp)

Sáu cái bẫy kinh điển làm sập production:

1. **Migration không idempotent.** Chạy lại lần 2 thì lỗi (\`table already exists\`). Dùng \`CREATE TABLE IF NOT EXISTS\`, \`DROP ... IF EXISTS\`, hoặc đảm bảo tool track version để không chạy lại. Đặc biệt nguy hiểm khi migration để lại cờ \`dirty\`.
2. **Drop column khi code cũ còn dùng.** Code cũ \`SELECT dropped_col\` → crash hàng loạt. Luôn 2-phase (mục 6.2).
3. **Lock table lớn trong giờ peak.** \`CREATE INDEX\` (không CONCURRENTLY), \`ALTER TABLE\` rewrite, \`UPDATE\` toàn bảng → lock → request xếp hàng → timeout dây chuyền. Chạy ngoài giờ peak + CONCURRENTLY + batch.
4. **Down migration mất data.** Drop cột/bảng vừa add đã có data mới → mất. Production ưu tiên forward-fix (mục 10).
5. **Migration không test trên prod-like data size.** Migration chạy 0.1s trên 10 row dev, nhưng 40 phút lock trên 50M row prod. Luôn test trên dữ liệu cỡ production (staging clone).
6. **Mỗi instance tự chạy migration → race.** (mục 9.1). Tách bước migration riêng.

> 🔁 **Dừng lại tự kiểm tra.** Migration của bạn là \`CREATE TABLE sessions (...)\`. Tại sao nó **không idempotent**, và sửa thế nào?
> <details><summary>Đáp án</summary>
> Chạy lần 2 (vd sau khi lần 1 lỗi giữa chừng để lại dirty, rồi <code>force</code> và chạy lại) sẽ báo <code>relation "sessions" already exists</code>. Sửa: <code>CREATE TABLE IF NOT EXISTS sessions (...)</code>. Tổng quát hơn: tin vào version tracking + giữ migration chạy trong transaction để lỗi thì rollback sạch.
> </details>

> 📝 **Tóm tắt mục 12.** Idempotent (IF NOT EXISTS) · 2-phase drop · tránh lock peak (CONCURRENTLY/batch) · down mất data → forward-fix · test trên prod-size · một bước migration tránh race.

---

## Bài tập

> Mọi bài tập đều có lời giải đầy đủ ở mục "Lời giải chi tiết" bên dưới. Hãy thử tự làm trước.

- **BT1.** Viết cặp migration \`000001_create_users\` và \`000002_create_posts\` (mỗi cái \`up\` + \`down\`). \`posts\` tham chiếu \`users\` qua khóa ngoại.
- **BT2.** Bảng \`orders\` (đang có data) cần thêm cột \`currency TEXT NOT NULL\`. Viết quy trình 3 bước an toàn (expand-contract) gồm các file migration.
- **BT3.** Đổi tên cột \`users.name\` → \`users.full_name\` **zero-downtime**. Liệt kê đủ các phase (migration + deploy code) theo thứ tự.
- **BT4.** Bảng \`events\` 30 triệu row trên Postgres. Cần index trên \`events(user_id)\` mà **không lock write**. Viết migration đúng (chú ý transaction).
- **BT5.** Bảng \`users\` 10 triệu row vừa thêm cột \`full_name\` (đang NULL). Viết backfill **không lock**, batch theo \`id\`. Viết bằng SQL lặp và phác bằng Go.
- **BT6.** **Chẩn đoán:** team chạy migration \`ALTER TABLE users DROP COLUMN legacy_token;\` lúc 14h. Ngay lập tức 30% request 500 với log \`pq: column "legacy_token" does not exist\`. Vì sao? Fix bằng 2-phase như thế nào?

---

## Lời giải chi tiết

### Lời giải BT1 — tạo users + posts (up/down)

**Cách tiếp cận:** hai migration riêng, đánh số tăng dần. \`posts\` có FK tới \`users\` nên phải tạo \`users\` trước (\`000001\`), \`posts\` sau (\`000002\`). Down phải đảo ngược: drop \`posts\` trước (vì nó phụ thuộc \`users\`), drop \`users\` sau.

\`000001_create_users.up.sql\`:
\`\`\`sql
CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
\`\`\`
\`000001_create_users.down.sql\`:
\`\`\`sql
DROP TABLE users;
\`\`\`

\`000002_create_posts.up.sql\`:
\`\`\`sql
CREATE TABLE posts (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title      TEXT NOT NULL,
    body       TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_posts_user_id ON posts (user_id);
\`\`\`
\`000002_create_posts.down.sql\`:
\`\`\`sql
DROP INDEX idx_posts_user_id;
DROP TABLE posts;
\`\`\`

**Lý do thứ tự down:** \`posts\` tham chiếu \`users\` (FK). Nếu drop \`users\` trước trong khi \`posts\` còn → lỗi constraint. Nên drop \`posts\` (migration 002 down) trước, \`users\` (001 down) sau — và đó đúng là thứ tự \`migrate down\` chạy (ngược version). Độ phức tạp: $O(1)$ DDL, không đụng data lớn → an toàn.

### Lời giải BT2 — thêm cột NOT NULL an toàn (3 bước)

**Cách tiếp cận:** không \`ADD COLUMN currency TEXT NOT NULL\` thẳng (lỗi: cột mới không default → các row cũ vi phạm NOT NULL ngay). Tách 3 migration tách rời các deploy:

**Bước 1 — Expand (add nullable):** \`000010_add_orders_currency.up.sql\`
\`\`\`sql
ALTER TABLE orders ADD COLUMN currency TEXT;  -- nullable: code cũ không ảnh hưởng
\`\`\`
Deploy code mới: khi tạo order luôn set \`currency\` (vd \`'USD'\`). Giờ row mới có currency, row cũ vẫn NULL.

**Bước 2 — Backfill:** \`000011_backfill_orders_currency\` (chạy batch, mục 8)
\`\`\`sql
-- lặp tới khi hết NULL
UPDATE orders SET currency = 'USD'
WHERE currency IS NULL AND id IN (
    SELECT id FROM orders WHERE currency IS NULL LIMIT 5000
);
\`\`\`

**Bước 3 — Contract (add constraint):** \`000012_orders_currency_notnull.up.sql\`
\`\`\`sql
ALTER TABLE orders ALTER COLUMN currency SET NOT NULL;
\`\`\`
(Postgres ≥ 12: có thể thêm \`ALTER TABLE orders ADD CONSTRAINT chk CHECK (currency IS NOT NULL) NOT VALID;\` rồi \`VALIDATE CONSTRAINT chk;\` để tránh full-table lock; hoặc \`SET NOT NULL\` trực tiếp nếu bảng nhỏ.)

**Down** cho bước 3: \`ALTER TABLE orders ALTER COLUMN currency DROP NOT NULL;\`. Độ phức tạp: bước 2 là $O(n)$ nhưng batch nên lock ngắn; bước 1,3 là $O(1)$ DDL (3 nhanh nếu đã backfill xong, vì PG chỉ cần verify không còn NULL).

### Lời giải BT3 — rename column zero-downtime

**Cách tiếp cận:** không \`RENAME COLUMN\` (phá tương thích). Dùng expand-contract 5 phase. Phải **chờ rolling deploy hoàn tất** giữa các deploy.

1. **Expand** — migration: \`ALTER TABLE users ADD COLUMN full_name TEXT;\` (nullable).
2. **Backfill** — migration/script batch: \`UPDATE users SET full_name = name WHERE full_name IS NULL AND id ...\` (theo BT5).
3. **Dual-write** — *deploy code*: mọi nơi ghi \`name\` thì ghi luôn \`full_name\` (\`INSERT/UPDATE\` cả hai cột). Đọc vẫn từ \`name\`. Chờ tất cả instance lên phiên bản này.
4. **Switch read** — *deploy code*: đổi mọi \`SELECT name\` → \`SELECT full_name\`. Vẫn dual-write để code cũ (nếu còn) không crash. Chờ rolling xong.
5. **Stop dual-write + Contract** — *deploy code* ngừng ghi \`name\`; rồi migration: \`ALTER TABLE users DROP COLUMN name;\`.

Thứ tự bắt buộc: **add → backfill → dual-write → switch read → drop**. Nếu drop sớm (phase 3) → code đang đọc \`name\` crash. Nếu switch read trước backfill → đọc \`full_name\` NULL → sai dữ liệu. Mỗi bước "đóng" một khả năng crash trước khi mở bước sau.

### Lời giải BT4 — add index không lock (CONCURRENTLY)

**Cách tiếp cận:** \`CREATE INDEX\` thường lock write toàn bảng tới khi xong → 30M row = downtime dài. Dùng \`CONCURRENTLY\`. Lưu ý quan trọng: \`CREATE INDEX CONCURRENTLY\` **không chạy trong transaction**, mà golang-migrate mặc định bọc mỗi migration trong transaction → phải tắt.

\`000020_index_events_user_id.up.sql\`:
\`\`\`sql
-- golang-migrate: cần đánh dấu migration này KHÔNG transaction.
-- (Một số setup: đặt lệnh này là migration RIÊNG, không chung với DDL khác.)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_user_id ON events (user_id);
\`\`\`
\`000020_index_events_user_id.down.sql\`:
\`\`\`sql
DROP INDEX CONCURRENTLY IF EXISTS idx_events_user_id;
\`\`\`

Điểm cần nhớ:
- \`CONCURRENTLY\` quét bảng 2 lần → chậm hơn, nhưng không chặn \`INSERT/UPDATE/DELETE\`.
- Nếu \`CREATE INDEX CONCURRENTLY\` **lỗi giữa chừng**, để lại index ở trạng thái \`INVALID\` → phải \`DROP INDEX\` rồi tạo lại (đây là lý do \`IF EXISTS\` trong down hữu ích).
- Không gộp chung migration này với lệnh DDL khác trong cùng transaction. Trong golang-migrate, để CONCURRENTLY hoạt động, tách thành migration riêng và đảm bảo runner không bọc transaction cho nó.

### Lời giải BT5 — backfill 10M row không lock (batch)

**Cách tiếp cận:** không \`UPDATE users SET full_name = name\` một phát (lock 10M row, transaction khổng lồ). Batch theo dải \`id\` (dùng index PK, rẻ), mỗi lô vài nghìn, nghỉ giữa lô.

SQL lặp (chạy lặp tới khi \`id\` vượt max):
\`\`\`sql
UPDATE users SET full_name = name
WHERE id >= :start AND id < :start + 5000
  AND full_name IS NULL;
-- :start += 5000 mỗi vòng
\`\`\`

Go (xem \`solutions.go\` cho bản chạy được, đây là cốt lõi):
\`\`\`go
const batch = 5000
var maxID int
db.QueryRow(\`SELECT COALESCE(MAX(id),0) FROM users\`).Scan(&maxID)

for start := 0; start <= maxID; start += batch {
    _, err := db.Exec(\`
        UPDATE users SET full_name = name
        WHERE id >= $1 AND id < $2 AND full_name IS NULL\`,
        start, start+batch)
    if err != nil {
        log.Printf("batch [%d,%d) lỗi: %v — sẽ retry", start, start+batch, err)
        start -= batch // retry lô này
        time.Sleep(time.Second)
        continue
    }
    time.Sleep(50 * time.Millisecond) // nhường tài nguyên cho traffic thật
}
\`\`\`

**Vì sao đúng:** mỗi lô là transaction ngắn (5000 row) → lock cực ngắn, autovacuum kịp dọn, replica không lag. \`full_name IS NULL\` làm backfill **idempotent** (chạy lại không ghi đè row đã xong). Độ phức tạp tổng $O(n)$ nhưng chia nhỏ → không đỉnh lock. Batch theo dải \`id\` dùng index PK → mỗi UPDATE rẻ; nếu \`id\` có lỗ hổng (gap), một số lô rỗng — vô hại.

### Lời giải BT6 — diagnose: drop column làm prod crash

**Triệu chứng:** chạy \`DROP COLUMN legacy_token\` → 30% request 500, log \`column "legacy_token" does not exist\`.

**Nguyên nhân:** đang **rolling deploy** hoặc code production **vẫn còn dùng** \`legacy_token\` (\`SELECT legacy_token\` / \`INSERT ... legacy_token\`). Cột bị drop ngay trong khi code cũ còn chạy → mọi query chạm cột đó lỗi. 30% là phần instance/code đường dẫn còn tham chiếu cột. Đây là vi phạm nguyên tắc zero-downtime (mục 6.2): drop schema mà code đang dùng.

**Fix tức thời (forward-fix, vì down cũng không cứu được data đã mất):**
1. Nếu vừa drop và còn backup/transaction chưa commit: rollback. Nhưng thường đã commit → cột mất. Khi đó **forward-fix**: tạm thời \`ALTER TABLE users ADD COLUMN legacy_token TEXT;\` (thêm lại cột nullable) để code cũ không crash nữa (dữ liệu cột cũ đã mất nhưng app sống lại). Đây là vá khẩn cấp.

**Fix đúng (2-phase, làm lại từ đầu):**
- **Phase 1 — deploy code:** sửa code **ngừng dùng** \`legacy_token\` hoàn toàn (không SELECT, không INSERT/UPDATE vào nó). Deploy, chờ **mọi** instance code cũ rút hết.
- **Phase 2 — migration:** *bây giờ* mới \`ALTER TABLE users DROP COLUMN legacy_token;\`. Lúc này không còn code nào tham chiếu → drop an toàn.

**Bài học:** thứ tự bắt buộc là **stop using (deploy) → rồi mới drop (migration)**, không bao giờ ngược lại. Và luôn \`git grep legacy_token\` toàn codebase trước khi drop để chắc không còn chỗ dùng.

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — mini migration runner chạy được: track version (in-memory + file), apply \`up\`/\`down\` các SQL string theo thứ tự, demo dirty flag, demo backfill batch. Comment tiếng Việt, có tham chiếu golang-migrate.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Migration timeline** — apply up/down, xem version tracking + schema_migrations.
  2. **Expand-contract** — animate đổi tên cột zero-downtime qua 5 phase.
  3. **Lock impact** — so sánh \`CREATE INDEX\` vs \`CONCURRENTLY\`, mô phỏng lock table.

---

## Bài tiếp theo

→ [Lesson 58 — Redis & Caching](../lesson-58-redis-caching/README.md): tăng tốc đọc bằng cache (cache-aside, write-through, TTL, chống cache stampede).

**Tham khảo:**
- [golang-migrate/migrate](https://github.com/golang-migrate/migrate)
- [pressly/goose](https://github.com/pressly/goose)
- [ariga/atlas](https://atlasgo.io/)
- Martin Fowler — *Evolutionary Database Design* & *ParallelChange (expand-contract)*.
`;
