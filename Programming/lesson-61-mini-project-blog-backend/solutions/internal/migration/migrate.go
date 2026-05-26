// Package migration mô phỏng schema version tracker (L57).
//
// Trong Postgres thật, migration thường lưu trong bảng `schema_migrations`
// (như golang-migrate / goose dùng). Mỗi migration có version tăng dần và
// chỉ chạy 1 lần. Ở đây ta mô phỏng: giữ version hiện tại trong bộ nhớ và
// chạy lần lượt các bước migration chưa áp dụng.
package migration

import (
	"fmt"
	"sort"
)

// Migration — 1 bước thay đổi schema. Up là hàm thực thi thay đổi.
type Migration struct {
	Version int
	Name    string
	Up      func() error
}

// Migrator theo dõi version đã áp dụng và chạy các migration còn thiếu.
type Migrator struct {
	current    int         // version cao nhất đã áp dụng (0 = chưa có gì).
	migrations []Migration // danh sách migration đã đăng ký.
	applied    []string    // log các migration đã chạy (cho hiển thị).
}

// New tạo Migrator rỗng ở version 0.
func New() *Migrator {
	return &Migrator{current: 0}
}

// Register đăng ký 1 migration. Version phải duy nhất.
func (m *Migrator) Register(mig Migration) {
	m.migrations = append(m.migrations, mig)
}

// Current trả về version schema hiện tại.
func (m *Migrator) Current() int { return m.current }

// Applied trả về log tên các migration đã chạy (theo thứ tự).
func (m *Migrator) Applied() []string { return m.applied }

// Up chạy mọi migration có Version > current, theo thứ tự version tăng dần.
// Đây là cốt lõi "idempotent migration": chạy lại lần nữa sẽ không làm gì
// vì current đã bằng version cao nhất.
func (m *Migrator) Up() error {
	sort.Slice(m.migrations, func(i, j int) bool {
		return m.migrations[i].Version < m.migrations[j].Version
	})
	for _, mig := range m.migrations {
		if mig.Version <= m.current {
			continue // đã áp dụng, bỏ qua.
		}
		if mig.Up != nil {
			if err := mig.Up(); err != nil {
				return fmt.Errorf("migration v%d (%s) failed: %w", mig.Version, mig.Name, err)
			}
		}
		m.current = mig.Version
		m.applied = append(m.applied, fmt.Sprintf("v%d_%s", mig.Version, mig.Name))
	}
	return nil
}
