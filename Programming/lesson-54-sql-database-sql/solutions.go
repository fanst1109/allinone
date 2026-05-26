// solutions.go — Lesson 54: SQL & package database/sql
//
// File này DÙNG THẬT package `database/sql` (stdlib) cộng driver SQLite thuần
// Go `modernc.org/sqlite` (không cần cgo). Tất cả pattern dưới đây — Open/Ping,
// connection pool, Query/QueryRow/Exec, prepared statement, parameterized query,
// NULL handling, context, transaction, batch insert, scan vào struct — đều
// giống hệt khi bạn đổi sang Postgres (driver pgx/pq) hay MySQL: chỉ khác
// placeholder (`?` cho SQLite/MySQL, `$1` cho Postgres) và DSN.
//
// Vì sao chọn modernc.org/sqlite? Nó là driver SQLite viết thuần Go (không cgo),
// chạy được `:memory:` nên demo không cần cài DB server. Trong production backend
// thật bạn thường nối Postgres:
//
//	import _ "github.com/jackc/pgx/v5/stdlib"
//	db, _ := sql.Open("pgx", "postgres://user:pass@localhost:5432/app?sslmode=disable")
//
// Build & run:
//
//	cd Programming/lesson-54-sql-database-sql
//	go mod tidy      # tải driver lần đầu
//	go run solutions.go
//
// LƯU Ý: nếu môi trường không tải được driver, phần cuối file có một bản
// "mock DB" thuần in-memory minh họa cùng interface — đọc hàm demoMockPattern().
package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	_ "modernc.org/sqlite" // driver, đăng ký tên "sqlite" qua init()
)

// =============================================================================
// Model & schema
// =============================================================================

// User là một dòng trong bảng users. Cột `bio` có thể NULL nên ta dùng
// sql.NullString (không phải string thường — string không biểu diễn được NULL).
type User struct {
	ID    int64
	Name  string
	Email string
	Bio   sql.NullString // NULL-able
}

// Account dùng cho demo transaction chuyển tiền.
type Account struct {
	ID      int64
	Owner   string
	Balance int64 // đơn vị xu, tránh float cho tiền
}

// setupSchema tạo bảng. CREATE TABLE là DDL → dùng Exec.
func setupSchema(db *sql.DB) error {
	_, err := db.Exec(`
		CREATE TABLE users (
			id    INTEGER PRIMARY KEY AUTOINCREMENT,
			name  TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			bio   TEXT            -- cho phép NULL
		);
		CREATE TABLE accounts (
			id      INTEGER PRIMARY KEY AUTOINCREMENT,
			owner   TEXT NOT NULL,
			balance INTEGER NOT NULL DEFAULT 0
		);
	`)
	return err
}

// =============================================================================
// CRUD (BT1) — Create / Read / Update / Delete
// =============================================================================

// createUser: INSERT → Exec → lấy LastInsertId.
// Placeholder `?` + tham số rời = parameterized query, chống SQL injection.
func createUser(db *sql.DB, name, email string, bio *string) (int64, error) {
	// Chuyển *string → sql.NullString: nil nghĩa là NULL.
	var nb sql.NullString
	if bio != nil {
		nb = sql.NullString{String: *bio, Valid: true}
	}
	res, err := db.Exec(
		`INSERT INTO users (name, email, bio) VALUES (?, ?, ?)`,
		name, email, nb,
	)
	if err != nil {
		return 0, fmt.Errorf("createUser: %w", err)
	}
	return res.LastInsertId()
}

// getUser: đọc đúng 1 dòng → QueryRow + Scan. Nếu không có dòng nào,
// Scan trả về sql.ErrNoRows — phải kiểm tra riêng (đây không phải "lỗi hệ thống").
func getUser(db *sql.DB, id int64) (*User, error) {
	var u User
	err := db.QueryRow(
		`SELECT id, name, email, bio FROM users WHERE id = ?`, id,
	).Scan(&u.ID, &u.Name, &u.Email, &u.Bio)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, fmt.Errorf("user %d không tồn tại", id)
	}
	if err != nil {
		return nil, fmt.Errorf("getUser: %w", err)
	}
	return &u, nil
}

// updateUserEmail: UPDATE → Exec → kiểm tra RowsAffected để biết có dòng nào
// thực sự đổi không (id sai → 0 dòng, không phải lỗi).
func updateUserEmail(db *sql.DB, id int64, newEmail string) error {
	res, err := db.Exec(`UPDATE users SET email = ? WHERE id = ?`, newEmail, id)
	if err != nil {
		return fmt.Errorf("updateUserEmail: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("không có user id=%d để update", id)
	}
	return nil
}

// deleteUser: DELETE → Exec, cũng dựa RowsAffected.
func deleteUser(db *sql.DB, id int64) error {
	res, err := db.Exec(`DELETE FROM users WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("deleteUser: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("không có user id=%d để xóa", id)
	}
	return nil
}

// =============================================================================
// Query nhiều row + scan vào slice struct (BT2)
// =============================================================================

// listUsers: db.Query trả về *sql.Rows. BẮT BUỘC:
//  1. defer rows.Close()         → tránh leak connection.
//  2. loop rows.Next() + Scan.
//  3. kiểm tra rows.Err() SAU loop → loop kết thúc do hết dòng HAY do lỗi I/O?
func listUsers(db *sql.DB) ([]User, error) {
	rows, err := db.Query(`SELECT id, name, email, bio FROM users ORDER BY id`)
	if err != nil {
		return nil, fmt.Errorf("listUsers query: %w", err)
	}
	defer rows.Close() // (1) — quên dòng này = leak connection trong pool

	var out []User
	for rows.Next() { // (2)
		var u User
		if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.Bio); err != nil {
			return nil, fmt.Errorf("listUsers scan: %w", err)
		}
		out = append(out, u)
	}
	if err := rows.Err(); err != nil { // (3) — đừng quên!
		return nil, fmt.Errorf("listUsers rows.Err: %w", err)
	}
	return out, nil
}

// =============================================================================
// Prepared statement (BT cũng dùng) — reuse, parse SQL 1 lần
// =============================================================================

// insertManyPrepared: chuẩn bị câu lệnh 1 lần rồi reuse cho từng dòng.
// Khi insert lặp lại nhiều lần, prepared statement tránh parse + plan lại SQL.
func insertManyPrepared(db *sql.DB, users []User) error {
	stmt, err := db.Prepare(`INSERT INTO users (name, email, bio) VALUES (?, ?, ?)`)
	if err != nil {
		return fmt.Errorf("prepare: %w", err)
	}
	defer stmt.Close()

	for _, u := range users {
		if _, err := stmt.Exec(u.Name, u.Email, u.Bio); err != nil {
			return fmt.Errorf("exec prepared (%s): %w", u.Email, err)
		}
	}
	return nil
}

// =============================================================================
// Context-aware (BT cũng dùng) — timeout/cancel
// =============================================================================

// countUsersCtx: QueryRowContext nhận context để hủy/timeout truy vấn.
func countUsersCtx(ctx context.Context, db *sql.DB) (int, error) {
	var n int
	err := db.QueryRowContext(ctx, `SELECT COUNT(*) FROM users`).Scan(&n)
	return n, err
}

// =============================================================================
// Transaction (BT4) — chuyển tiền giữa 2 account
// =============================================================================

// transfer: trừ tiền account from, cộng vào account to — phải ATOMIC.
// Pattern chuẩn: Begin → defer Rollback → các Exec → Commit.
// Nếu Commit thành công thì Rollback (trong defer) là no-op; nếu return sớm
// vì lỗi, defer Rollback hoàn tác mọi thay đổi → không mất/nhân đôi tiền.
func transfer(ctx context.Context, db *sql.DB, fromID, toID, amount int64) (err error) {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	// defer rollback pattern: chạy luôn; sau Commit thành công nó là no-op
	// (trả ErrTxDone, ta nuốt nó).
	defer func() {
		if rbErr := tx.Rollback(); rbErr != nil && !errors.Is(rbErr, sql.ErrTxDone) {
			// chỉ ghi đè err nếu chưa có lỗi nào
			if err == nil {
				err = fmt.Errorf("rollback: %w", rbErr)
			}
		}
	}()

	// 1) Kiểm tra số dư đủ.
	var bal int64
	if err = tx.QueryRowContext(ctx,
		`SELECT balance FROM accounts WHERE id = ?`, fromID,
	).Scan(&bal); err != nil {
		return fmt.Errorf("đọc balance: %w", err)
	}
	if bal < amount {
		return fmt.Errorf("không đủ tiền: có %d cần %d", bal, amount)
	}

	// 2) Trừ tiền nguồn.
	if _, err = tx.ExecContext(ctx,
		`UPDATE accounts SET balance = balance - ? WHERE id = ?`, amount, fromID,
	); err != nil {
		return fmt.Errorf("trừ tiền: %w", err)
	}

	// 3) Cộng tiền đích.
	if _, err = tx.ExecContext(ctx,
		`UPDATE accounts SET balance = balance + ? WHERE id = ?`, amount, toID,
	); err != nil {
		return fmt.Errorf("cộng tiền: %w", err)
	}

	// 4) Commit. Nếu lỗi ở bất kỳ bước trên → return sớm → defer Rollback.
	if err = tx.Commit(); err != nil {
		return fmt.Errorf("commit: %w", err)
	}
	return nil
}

// =============================================================================
// Batch insert (BT5) — insert nhiều dòng trong 1 transaction
// =============================================================================

// batchInsertAccounts: insert N account hiệu quả bằng cách gói trong 1 tx +
// prepared statement. So với N lần db.Exec rời (mỗi lần 1 round-trip + auto-commit),
// cách này nhanh hơn nhiều lần vì chỉ 1 lần commit.
//
// Cách nhanh nhất nữa là multi-row VALUES: INSERT ... VALUES (?,?),(?,?),...
// Postgres còn có COPY (driver pgx hỗ trợ CopyFrom) cho hàng triệu dòng.
func batchInsertAccounts(ctx context.Context, db *sql.DB, accs []Account) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback() //nolint — no-op sau commit

	stmt, err := tx.PrepareContext(ctx,
		`INSERT INTO accounts (owner, balance) VALUES (?, ?)`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, a := range accs {
		if _, err := stmt.ExecContext(ctx, a.Owner, a.Balance); err != nil {
			return fmt.Errorf("batch insert %s: %w", a.Owner, err)
		}
	}
	return tx.Commit()
}

// batchInsertMultiRow: gom thành 1 câu INSERT ... VALUES (?,?),(?,?),...
// Ít round-trip nhất nhưng lưu ý giới hạn số placeholder của DB
// (Postgres ~65535, SQLite mặc định 999 → cần chia chunk khi quá lớn).
func batchInsertMultiRow(db *sql.DB, accs []Account) error {
	if len(accs) == 0 {
		return nil
	}
	var b strings.Builder
	b.WriteString(`INSERT INTO accounts (owner, balance) VALUES `)
	args := make([]any, 0, len(accs)*2)
	for i, a := range accs {
		if i > 0 {
			b.WriteByte(',')
		}
		b.WriteString("(?, ?)")
		args = append(args, a.Owner, a.Balance)
	}
	_, err := db.Exec(b.String(), args...)
	return err
}

// =============================================================================
// SQL injection — SAI vs ĐÚNG (BT6)
// =============================================================================

// findUserByEmailUNSAFE — ĐỪNG BAO GIỜ LÀM THẾ NÀY.
// Nối thẳng input vào SQL → input `' OR '1'='1` biến WHERE thành luôn-đúng,
// `'; DROP TABLE users; --` có thể xóa bảng. Để đây CHỈ để minh họa lỗi.
func findUserByEmailUNSAFE(db *sql.DB, email string) (*User, error) {
	// LỖI: string concat.
	q := "SELECT id, name, email, bio FROM users WHERE email = '" + email + "'"
	var u User
	err := db.QueryRow(q).Scan(&u.ID, &u.Name, &u.Email, &u.Bio)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

// findUserByEmailSAFE — ĐÚNG: placeholder `?` + tham số rời.
// Driver gửi SQL và data tách biệt → input dù chứa `'` hay `;` cũng chỉ là
// một CHUỖI GIÁ TRỊ, không bao giờ được hiểu là cú pháp SQL.
func findUserByEmailSAFE(db *sql.DB, email string) (*User, error) {
	var u User
	err := db.QueryRow(
		`SELECT id, name, email, bio FROM users WHERE email = ?`, email,
	).Scan(&u.ID, &u.Name, &u.Email, &u.Bio)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, fmt.Errorf("không tìm thấy email %q", email)
	}
	return &u, err
}

// =============================================================================
// Demo chạy được
// =============================================================================

func main() {
	// 1) Open — LAZY: KHÔNG mở connection ngay, chỉ validate DSN + chuẩn bị pool.
	db, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// 2) Cấu hình connection pool (xem mục 3 README).
	db.SetMaxOpenConns(10)               // tối đa 10 conn mở đồng thời
	db.SetMaxIdleConns(5)                // giữ 5 conn rảnh để tái dùng
	db.SetConnMaxLifetime(time.Hour)     // conn sống tối đa 1h rồi recycle
	db.SetConnMaxIdleTime(10 * time.Minute)

	// 3) Ping — đây mới thực sự mở 1 connection để verify DB sống.
	// LƯU Ý: ":memory:" của SQLite gắn với từng connection. Để mọi conn
	// thấy chung 1 DB in-memory cần dùng cache shared; ở đây ta giới hạn
	// pool về 1 conn cho demo đơn giản, đảm bảo cùng một in-memory DB.
	db.SetMaxOpenConns(1)
	if err := db.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("== Ping OK — đã kết nối in-memory SQLite ==")

	if err := setupSchema(db); err != nil {
		panic(err)
	}

	ctx := context.Background()

	// --- BT1: CRUD ---
	fmt.Println("\n--- CRUD ---")
	bio := "Software engineer ở Hà Nội"
	id1, _ := createUser(db, "Alice", "alice@x.io", &bio)
	id2, _ := createUser(db, "Bob", "bob@x.io", nil) // bio NULL
	fmt.Printf("Tạo user id=%d và id=%d\n", id1, id2)

	u, _ := getUser(db, id1)
	fmt.Printf("Read: %+v (bio.Valid=%v)\n", u, u.Bio.Valid)

	_ = updateUserEmail(db, id1, "alice@new.io")
	u, _ = getUser(db, id1)
	fmt.Printf("Sau update email: %s\n", u.Email)

	// --- BT3: NULL handling ---
	bobUser, _ := getUser(db, id2)
	if bobUser.Bio.Valid {
		fmt.Println("Bob bio:", bobUser.Bio.String)
	} else {
		fmt.Println("Bob chưa có bio (NULL) — hiển thị mặc định")
	}

	// --- BT2: list nhiều row + prepared insert ---
	_ = insertManyPrepared(db, []User{
		{Name: "Carol", Email: "carol@x.io"},
		{Name: "Dave", Email: "dave@x.io", Bio: sql.NullString{String: "DBA", Valid: true}},
	})
	users, _ := listUsers(db)
	fmt.Printf("\n--- listUsers: %d user ---\n", len(users))
	for _, x := range users {
		fmt.Printf("  #%d %-6s %-14s bio=%q\n", x.ID, x.Name, x.Email, nz(x.Bio))
	}

	n, _ := countUsersCtx(ctx, db)
	fmt.Println("COUNT(*) =", n)

	// --- delete ---
	_ = deleteUser(db, id2)
	n, _ = countUsersCtx(ctx, db)
	fmt.Println("Sau khi xóa Bob, COUNT(*) =", n)

	// --- BT5: batch insert accounts ---
	fmt.Println("\n--- Transaction & Batch ---")
	_ = batchInsertAccounts(ctx, db, []Account{
		{Owner: "Alice", Balance: 1000},
		{Owner: "Bob", Balance: 500},
	})

	// --- BT4: transfer ---
	if err := transfer(ctx, db, 1, 2, 300); err != nil {
		fmt.Println("transfer lỗi:", err)
	} else {
		fmt.Println("Chuyển 300 từ acc#1 → acc#2 OK")
	}
	// transfer vượt số dư → bị rollback, số dư không đổi.
	if err := transfer(ctx, db, 1, 2, 999999); err != nil {
		fmt.Println("transfer (cố tình lỗi) bị từ chối:", err)
	}
	printBalances(db)

	// --- BT6: SQL injection demo ---
	fmt.Println("\n--- SQL injection ---")
	// Input độc hại: '1'='1' để bypass. Bản UNSAFE sẽ lỗi cú pháp hoặc trả sai.
	evil := "x' OR '1'='1"
	if _, err := findUserByEmailSAFE(db, evil); err != nil {
		fmt.Printf("SAFE: input độc hại %q bị coi là chuỗi thường → %v\n", evil, err)
	}
	if alice, err := findUserByEmailSAFE(db, "alice@new.io"); err == nil {
		fmt.Printf("SAFE: tìm đúng %s\n", alice.Name)
	}

	// Tham chiếu để compiler không báo "declared and not used".
	_ = findUserByEmailUNSAFE
	_ = batchInsertMultiRow

	fmt.Println("\n== Xong ==")
}

// nz trả về string của NullString, "" nếu NULL — tiện in.
func nz(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return "<NULL>"
}

func printBalances(db *sql.DB) {
	rows, err := db.Query(`SELECT id, owner, balance FROM accounts ORDER BY id`)
	if err != nil {
		fmt.Println("printBalances:", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var a Account
		_ = rows.Scan(&a.ID, &a.Owner, &a.Balance)
		fmt.Printf("  acc#%d %-6s balance=%d\n", a.ID, a.Owner, a.Balance)
	}
	_ = rows.Err()
}
