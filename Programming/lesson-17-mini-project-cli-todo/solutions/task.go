package main

import (
	"fmt"
	"strings"
	"time"
)

// Status — trạng thái của một task.
// Dùng kiểu string (chứ không phải int enum) để JSON đọc cho người vẫn dễ hiểu.
type Status string

const (
	StatusPending Status = "pending"
	StatusDone    Status = "done"
)

// Task — một mục trong todo list.
// Tag JSON dùng để (de)serialize sang file .todo.json.
// CreatedAt dùng kiểu time.Time vì encoding/json đã hỗ trợ format RFC3339 sẵn.
type Task struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Status    Status    `json:"status"`
	CreatedAt time.Time `json:"createdAt"`
}

// MarkDone — đổi status sang done.
// Receiver là pointer (*Task) vì hàm này SỬA dữ liệu task gốc.
// Nếu dùng value receiver thì task gốc trong slice không thay đổi.
func (t *Task) MarkDone() {
	t.Status = StatusDone
}

// MarkPending — đổi status quay lại pending (lệnh `undone`).
func (t *Task) MarkPending() {
	t.Status = StatusPending
}

// IsDone — helper trả về true nếu task đã hoàn thành.
// Value receiver vì chỉ ĐỌC, không sửa state.
func (t Task) IsDone() bool {
	return t.Status == StatusDone
}

// Icon — ký tự hiển thị trạng thái khi pretty print.
func (t Task) Icon() string {
	if t.IsDone() {
		return "[x]"
	}
	return "[ ]"
}

// String — implement fmt.Stringer, dùng cho debug nhanh.
// Khi fmt.Println(task) sẽ gọi hàm này tự động.
func (t Task) String() string {
	return fmt.Sprintf("#%d %s %s (created %s)",
		t.ID,
		t.Icon(),
		t.Title,
		t.CreatedAt.Format("2006-01-02 15:04"),
	)
}

// truncate — cắt chuỗi cho vừa cột table, chèn dấu "…" nếu bị cắt.
// Dùng []rune để cắt theo ký tự, không theo byte → không phá UTF-8.
func truncate(s string, max int) string {
	rs := []rune(s)
	if len(rs) <= max {
		return s
	}
	return string(rs[:max-1]) + "…"
}

// padRight — đệm khoảng trắng bên phải để cột table thẳng hàng.
// Cũng đếm bằng rune để chữ tiếng Việt không lệch (mỗi rune Việt ~1 visual cell).
func padRight(s string, width int) string {
	n := len([]rune(s))
	if n >= width {
		return s
	}
	return s + strings.Repeat(" ", width-n)
}
