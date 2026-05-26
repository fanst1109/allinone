package migration

import "testing"

// TestMigratorUp kiểm tra chạy migration tăng dần và idempotent (chạy lại
// không làm gì thêm).
func TestMigratorUp(t *testing.T) {
	var ran []int
	m := New()
	m.Register(Migration{Version: 2, Name: "b", Up: func() error { ran = append(ran, 2); return nil }})
	m.Register(Migration{Version: 1, Name: "a", Up: func() error { ran = append(ran, 1); return nil }})
	m.Register(Migration{Version: 3, Name: "c", Up: func() error { ran = append(ran, 3); return nil }})

	if err := m.Up(); err != nil {
		t.Fatalf("Up lỗi: %v", err)
	}
	if m.Current() != 3 {
		t.Fatalf("mong version 3, được %d", m.Current())
	}
	// Phải chạy theo thứ tự version tăng dần: 1,2,3.
	if len(ran) != 3 || ran[0] != 1 || ran[1] != 2 || ran[2] != 3 {
		t.Fatalf("thứ tự migration sai: %v", ran)
	}

	// Chạy lại -> idempotent, không chạy migration nào nữa.
	ran = nil
	if err := m.Up(); err != nil {
		t.Fatal(err)
	}
	if len(ran) != 0 {
		t.Fatalf("idempotent thất bại: chạy lại %v", ran)
	}
}
