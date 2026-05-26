// solutions.go — Lesson 57: Database Migrations
//
// Mini migration runner CHẠY ĐƯỢC, minh họa các pattern cốt lõi của một tool
// migration thật (golang-migrate / goose) mà KHÔNG cần database thật:
//
//   - Track version đã apply (in-memory + lưu xuống file, giống bảng schema_migrations).
//   - Apply up theo thứ tự version tăng dần; down theo thứ tự giảm dần.
//   - up N / down N / goto N (giống golang-migrate CLI).
//   - Cờ dirty: migration chạy dở thì lỗi → đánh dấu dirty, chặn chạy tiếp.
//   - Backfill theo batch (mục 8 README) — minh họa không lock 1 phát.
//
// Tham chiếu tool thật:
//   - golang-migrate/migrate: file 000001_x.up.sql / .down.sql, bảng schema_migrations(version, dirty).
//   - pressly/goose: migration bằng SQL annotate hoặc Go code.
//   - ariga/atlas: declarative + versioned + lint an toàn.
//
// Ở đây "chạy SQL" chỉ là gọi một hàm Go (applyFn) để demo cơ chế thứ tự + version,
// không cần driver DB. Chạy:  go run solutions.go
package main

import (
	"errors"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

// ---------------------------------------------------------------------------
// Migration — một bước thay đổi schema có thứ tự (mục 2 README).
// Mỗi migration có Version (số tăng dần), tên, và 2 hàm Up/Down.
// Trong tool thật, Up/Down là nội dung file .up.sql / .down.sql; ở đây là func Go.
// ---------------------------------------------------------------------------
type Migration struct {
	Version int
	Name    string
	Up      func(db *FakeDB) error // apply (đi tiến)
	Down    func(db *FakeDB) error // rollback (đi lùi) — đảo ngược Up
}

// FakeDB — database giả lập trong bộ nhớ để demo không cần Postgres.
// schema = tập "object" đang tồn tại (bảng, cột, index). data = vài hàng mẫu.
type FakeDB struct {
	schema map[string]bool   // ví dụ key: "table:users", "column:users.email", "index:idx_posts_user"
	data   map[string]string // ví dụ key: "user:1" -> "full_name=NULL"
}

func NewFakeDB() *FakeDB {
	return &FakeDB{schema: map[string]bool{}, data: map[string]string{}}
}

// Các "lệnh DDL" giả lập — chỉ để demo, không phải SQL thật.
func (db *FakeDB) create(obj string) error {
	if db.schema[obj] {
		return fmt.Errorf("object %q đã tồn tại (migration không idempotent!)", obj)
	}
	db.schema[obj] = true
	return nil
}
func (db *FakeDB) drop(obj string) error {
	if !db.schema[obj] {
		return fmt.Errorf("object %q không tồn tại", obj)
	}
	delete(db.schema, obj)
	return nil
}
func (db *FakeDB) has(obj string) bool { return db.schema[obj] }

// ---------------------------------------------------------------------------
// Migrator — bộ chạy migration. Tương ứng "engine" của golang-migrate.
// version: migration cao nhất đã apply (giống cột version của schema_migrations).
// dirty:   true nếu lần chạy trước lỗi giữa chừng (mục 4.3 README).
// ---------------------------------------------------------------------------
type Migrator struct {
	migrations []Migration
	db         *FakeDB
	version    int
	dirty      bool
	stateFile  string // nơi lưu version (giống schema_migrations persist xuống đĩa)
}

func NewMigrator(db *FakeDB, stateFile string, ms []Migration) *Migrator {
	// Sắp xếp theo version tăng dần — thứ tự là BẮT BUỘC (mục 4.1).
	sort.Slice(ms, func(i, j int) bool { return ms[i].Version < ms[j].Version })
	m := &Migrator{migrations: ms, db: db, stateFile: stateFile}
	m.loadState()
	return m
}

// loadState/saveState — giả lập bảng schema_migrations bằng một file text.
func (m *Migrator) loadState() {
	b, err := os.ReadFile(m.stateFile)
	if err != nil {
		return // chưa có state -> version 0, sạch
	}
	parts := strings.Split(strings.TrimSpace(string(b)), ",")
	if len(parts) == 2 {
		m.version, _ = strconv.Atoi(parts[0])
		m.dirty = parts[1] == "1"
	}
}
func (m *Migrator) saveState() {
	d := "0"
	if m.dirty {
		d = "1"
	}
	_ = os.WriteFile(m.stateFile, []byte(fmt.Sprintf("%d,%s", m.version, d)), 0o644)
}

// guard — chặn mọi thao tác nếu DB đang dirty (mục 4.3).
func (m *Migrator) guard() error {
	if m.dirty {
		return fmt.Errorf("database DIRTY ở version %d: migration trước chạy dở. "+
			"Sửa tay rồi gọi Force(version) để gỡ cờ trước khi chạy tiếp", m.version)
	}
	return nil
}

// Up — chạy tối đa n migration chưa apply (n<=0 nghĩa là chạy hết, giống `migrate up`).
func (m *Migrator) Up(n int) error {
	if err := m.guard(); err != nil {
		return err
	}
	count := 0
	for _, mig := range m.migrations {
		if mig.Version <= m.version {
			continue // đã apply rồi -> bỏ qua (đảm bảo chạy đúng 1 lần)
		}
		if n > 0 && count >= n {
			break
		}
		// Đánh dấu dirty TRƯỚC khi chạy: nếu Up lỗi giữa chừng, cờ còn lại để cảnh báo.
		m.dirty = true
		m.saveState()
		if err := mig.Up(m.db); err != nil {
			m.saveState() // giữ dirty=true
			return fmt.Errorf("migration %06d_%s up lỗi: %w", mig.Version, mig.Name, err)
		}
		// Thành công: tiến version, gỡ dirty.
		m.version = mig.Version
		m.dirty = false
		m.saveState()
		fmt.Printf("  ✓ up   %06d_%s  -> version %d\n", mig.Version, mig.Name, m.version)
		count++
	}
	if count == 0 {
		fmt.Println("  (không có migration nào để up — đã ở mới nhất)")
	}
	return nil
}

// Down — lùi n migration (chạy Down theo thứ tự version giảm dần).
func (m *Migrator) Down(n int) error {
	if err := m.guard(); err != nil {
		return err
	}
	// Duyệt ngược.
	for i := len(m.migrations) - 1; i >= 0 && n > 0; i-- {
		mig := m.migrations[i]
		if mig.Version > m.version {
			continue // chưa apply -> không có gì để lùi
		}
		m.dirty = true
		m.saveState()
		if err := mig.Down(m.db); err != nil {
			m.saveState()
			return fmt.Errorf("migration %06d_%s down lỗi: %w", mig.Version, mig.Name, err)
		}
		// Sau khi down, version = version migration ngay trước nó.
		m.version = prevVersion(m.migrations, mig.Version)
		m.dirty = false
		m.saveState()
		fmt.Printf("  ✓ down %06d_%s  -> version %d\n", mig.Version, mig.Name, m.version)
		n--
	}
	return nil
}

// Goto — nhảy thẳng tới version target (tiến hoặc lùi tùy đang ở đâu) — giống `migrate goto N`.
func (m *Migrator) Goto(target int) error {
	if err := m.guard(); err != nil {
		return err
	}
	switch {
	case target > m.version:
		// đếm số migration cần up
		n := 0
		for _, mig := range m.migrations {
			if mig.Version > m.version && mig.Version <= target {
				n++
			}
		}
		return m.Up(n)
	case target < m.version:
		n := 0
		for _, mig := range m.migrations {
			if mig.Version > target && mig.Version <= m.version {
				n++
			}
		}
		return m.Down(n)
	default:
		fmt.Printf("  (đã ở version %d)\n", target)
		return nil
	}
}

// Force — gỡ cờ dirty thủ công sau khi đã sửa DB bằng tay (giống `migrate force N`).
func (m *Migrator) Force(version int) {
	m.version = version
	m.dirty = false
	m.saveState()
	fmt.Printf("  ! force version=%d, gỡ dirty\n", version)
}

func (m *Migrator) Status() string {
	d := "clean"
	if m.dirty {
		d = "DIRTY"
	}
	return fmt.Sprintf("version=%d (%s)", m.version, d)
}

// prevVersion — version của migration ngay trước `v` trong danh sách; 0 nếu không có.
func prevVersion(ms []Migration, v int) int {
	prev := 0
	for _, mig := range ms {
		if mig.Version < v && mig.Version > prev {
			prev = mig.Version
		}
	}
	return prev
}

// ---------------------------------------------------------------------------
// Backfill theo batch (mục 8 + BT5 README) — minh họa không lock 1 phát.
// Ở đây "row" là số nguyên 1..total; batch xử lý từng dải id.
// Trong DB thật mỗi vòng là: UPDATE ... WHERE id>=start AND id<start+batch AND col IS NULL.
// ---------------------------------------------------------------------------
func backfill(total, batch int, apply func(start, end int) int) int {
	updated := 0
	for start := 1; start <= total; start += batch {
		end := start + batch
		n := apply(start, end) // số row lô này cập nhật
		updated += n
		fmt.Printf("    batch [%d,%d): cập nhật %d row (tổng %d/%d)\n", start, end, n, updated, total)
		// Trong thực tế: time.Sleep để nhường tài nguyên cho traffic thật.
	}
	return updated
}

// ---------------------------------------------------------------------------
// Định nghĩa các migration mẫu (tương ứng BT1: users + posts).
// ---------------------------------------------------------------------------
func sampleMigrations() []Migration {
	return []Migration{
		{
			Version: 1, Name: "create_users",
			Up:   func(db *FakeDB) error { return db.create("table:users") },
			Down: func(db *FakeDB) error { return db.drop("table:users") },
		},
		{
			Version: 2, Name: "create_posts",
			Up: func(db *FakeDB) error {
				// posts phụ thuộc users (FK) -> users phải tồn tại trước.
				if !db.has("table:users") {
					return errors.New("không thể tạo posts: bảng users chưa tồn tại (FK)")
				}
				if err := db.create("table:posts"); err != nil {
					return err
				}
				return db.create("index:idx_posts_user_id")
			},
			Down: func(db *FakeDB) error {
				// Đảo ngược thứ tự up: drop index trước, drop bảng sau.
				_ = db.drop("index:idx_posts_user_id")
				return db.drop("table:posts")
			},
		},
		{
			Version: 3, Name: "add_users_full_name",
			Up:   func(db *FakeDB) error { return db.create("column:users.full_name") },
			Down: func(db *FakeDB) error { return db.drop("column:users.full_name") },
		},
	}
}

func main() {
	stateFile := "/tmp/lesson57_schema_migrations.txt"
	_ = os.Remove(stateFile) // bắt đầu sạch cho demo

	db := NewFakeDB()
	m := NewMigrator(db, stateFile, sampleMigrations())

	fmt.Println("== Trạng thái đầu:", m.Status(), "==")

	fmt.Println("\n-- migrate up (chạy hết) --")
	if err := m.Up(0); err != nil {
		fmt.Println("LỖI:", err)
	}
	fmt.Println("   ->", m.Status())
	fmt.Println("   schema hiện có:", sortedKeys(db.schema))

	fmt.Println("\n-- migrate down 1 (lùi posts... không, lùi cao nhất = full_name) --")
	if err := m.Down(1); err != nil {
		fmt.Println("LỖI:", err)
	}
	fmt.Println("   ->", m.Status())

	fmt.Println("\n-- migrate goto 1 (lùi tiếp về version 1) --")
	if err := m.Goto(1); err != nil {
		fmt.Println("LỖI:", err)
	}
	fmt.Println("   ->", m.Status())
	fmt.Println("   schema hiện có:", sortedKeys(db.schema))

	fmt.Println("\n-- migrate goto 3 (tiến lại lên mới nhất) --")
	if err := m.Goto(3); err != nil {
		fmt.Println("LỖI:", err)
	}
	fmt.Println("   ->", m.Status())

	// Demo dirty flag: tạo một migration cố tình lỗi.
	fmt.Println("\n-- Demo cờ DIRTY: thêm migration v4 cố tình lỗi --")
	db2 := NewFakeDB()
	_ = db2.create("table:users")
	failing := []Migration{
		{Version: 1, Name: "noop",
			Up: func(db *FakeDB) error { return nil }, Down: func(db *FakeDB) error { return nil }},
		{Version: 4, Name: "broken",
			Up:   func(db *FakeDB) error { return errors.New("DDL lỗi giữa chừng") },
			Down: func(db *FakeDB) error { return nil }},
	}
	m2 := NewMigrator(db2, "/tmp/lesson57_dirty.txt", failing)
	_ = os.Remove("/tmp/lesson57_dirty.txt")
	m2 = NewMigrator(db2, "/tmp/lesson57_dirty.txt", failing)
	if err := m2.Up(0); err != nil {
		fmt.Println("  up dừng vì lỗi:", err)
	}
	fmt.Println("   ->", m2.Status())
	fmt.Println("   thử up tiếp khi dirty:")
	if err := m2.Up(0); err != nil {
		fmt.Println("   bị chặn:", err)
	}
	m2.Force(1) // người vận hành sửa tay rồi force về version sạch
	fmt.Println("   ->", m2.Status())

	// Demo backfill batch (BT5): 23 row, batch 10.
	fmt.Println("\n-- Demo backfill batch: 23 row, batch=10 (chỉ row đang NULL) --")
	nullRows := map[int]bool{}
	for i := 1; i <= 23; i++ {
		nullRows[i] = true // ban đầu mọi row full_name = NULL
	}
	total := backfill(23, 10, func(start, end int) int {
		n := 0
		for id := start; id < end && id <= 23; id++ {
			if nullRows[id] { // idempotent: chỉ update row còn NULL
				nullRows[id] = false
				n++
			}
		}
		return n
	})
	fmt.Printf("   backfill xong: %d row được điền full_name\n", total)

	fmt.Println("\nHoàn tất. Trong production dùng golang-migrate/goose/atlas — đây chỉ là demo cơ chế.")
}

func sortedKeys(m map[string]bool) []string {
	ks := make([]string, 0, len(m))
	for k := range m {
		ks = append(ks, k)
	}
	sort.Strings(ks)
	return ks
}
