package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// ===================================================================
// Mỗi command là một function nhận (store, args) trả về error.
// Pattern thống nhất giúp main.go dispatch dễ qua map[string]handler.
// ===================================================================

// cmdAdd — thêm task mới.
// Cách dùng: `todo add "Mua sữa"` hoặc `todo add Mua sữa cho mèo`
// (gộp tất cả args còn lại thành title nếu không có quote).
func cmdAdd(s *Store, args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("thiếu tiêu đề task. Cú pháp: add <title>")
	}
	title := strings.TrimSpace(strings.Join(args, " "))
	if title == "" {
		return fmt.Errorf("tiêu đề không được rỗng")
	}

	task := Task{
		ID:        s.NextID,
		Title:     title,
		Status:    StatusPending,
		CreatedAt: time.Now(),
	}
	s.Tasks = append(s.Tasks, task)
	s.NextID++

	fmt.Printf("Đã thêm task #%d: %s\n", task.ID, task.Title)
	return nil
}

// cmdList — liệt kê task. Hỗ trợ filter qua flag.
// `list` — tất cả
// `list --done` — chỉ done
// `list --pending` — chỉ pending
func cmdList(s *Store, args []string) error {
	// filter là Map từ flag → predicate. Demo dùng map[string]func.
	filters := map[string]func(Task) bool{
		"":          func(t Task) bool { return true },
		"--all":     func(t Task) bool { return true },
		"--done":    func(t Task) bool { return t.IsDone() },
		"--pending": func(t Task) bool { return !t.IsDone() },
	}

	flag := ""
	if len(args) > 0 {
		flag = args[0]
	}
	keep, ok := filters[flag]
	if !ok {
		return fmt.Errorf("flag không hỗ trợ: %s (chỉ có --done, --pending, --all)", flag)
	}

	// Lọc trước, in sau (để biết có dữ liệu nào không trước khi vẽ header).
	var visible []Task
	for _, t := range s.Tasks {
		if keep(t) {
			visible = append(visible, t)
		}
	}

	if len(visible) == 0 {
		fmt.Println("Không có task nào.")
		return nil
	}

	printTable(visible)
	return nil
}

// cmdDone — đánh dấu task hoàn thành.
func cmdDone(s *Store, args []string) error {
	id, err := parseID(args, "done")
	if err != nil {
		return err
	}
	task := s.FindByID(id)
	if task == nil {
		return fmt.Errorf("không tìm thấy task #%d", id)
	}
	if task.IsDone() {
		fmt.Printf("Task #%d đã done từ trước.\n", id)
		return nil
	}
	task.MarkDone() // pointer receiver → sửa được task gốc trong slice
	fmt.Printf("Đã đánh dấu xong task #%d: %s\n", task.ID, task.Title)
	return nil
}

// cmdUndone — chuyển task từ done về pending.
func cmdUndone(s *Store, args []string) error {
	id, err := parseID(args, "undone")
	if err != nil {
		return err
	}
	task := s.FindByID(id)
	if task == nil {
		return fmt.Errorf("không tìm thấy task #%d", id)
	}
	task.MarkPending()
	fmt.Printf("Đã chuyển task #%d về pending.\n", task.ID)
	return nil
}

// cmdRemove — xóa task khỏi list.
func cmdRemove(s *Store, args []string) error {
	id, err := parseID(args, "remove")
	if err != nil {
		return err
	}
	idx := s.FindIndex(id)
	if idx == -1 {
		return fmt.Errorf("không tìm thấy task #%d", id)
	}
	removed := s.Tasks[idx]
	// Slice trick xóa phần tử thứ idx: nối 2 phần trước-sau.
	s.Tasks = append(s.Tasks[:idx], s.Tasks[idx+1:]...)
	fmt.Printf("Đã xóa task #%d: %s\n", removed.ID, removed.Title)
	return nil
}

// cmdEdit — đổi title của task.
// Cú pháp: edit <id> <new title...>
func cmdEdit(s *Store, args []string) error {
	if len(args) < 2 {
		return fmt.Errorf("cú pháp: edit <id> <new title>")
	}
	id, err := strconv.Atoi(args[0])
	if err != nil {
		return fmt.Errorf("ID phải là số: %s", args[0])
	}
	task := s.FindByID(id)
	if task == nil {
		return fmt.Errorf("không tìm thấy task #%d", id)
	}
	newTitle := strings.TrimSpace(strings.Join(args[1:], " "))
	if newTitle == "" {
		return fmt.Errorf("tiêu đề mới không được rỗng")
	}
	old := task.Title
	task.Title = newTitle
	fmt.Printf("Đã sửa task #%d: %q → %q\n", id, old, newTitle)
	return nil
}

// cmdClear — xóa hết task done.
func cmdClear(s *Store, _ []string) error {
	// Filter trick: viết lại slice giữ những item không done.
	kept := s.Tasks[:0]
	cleared := 0
	for _, t := range s.Tasks {
		if t.IsDone() {
			cleared++
			continue
		}
		kept = append(kept, t)
	}
	s.Tasks = kept
	fmt.Printf("Đã xóa %d task done.\n", cleared)
	return nil
}

// ===================================================================
// Helper
// ===================================================================

// parseID — extract id (int) từ args[0] với error message thân thiện.
// Dùng chung cho done/undone/remove → đỡ lặp code.
func parseID(args []string, name string) (int, error) {
	if len(args) == 0 {
		return 0, fmt.Errorf("cú pháp: %s <id>", name)
	}
	id, err := strconv.Atoi(args[0])
	if err != nil {
		return 0, fmt.Errorf("ID phải là số nguyên, nhận: %q", args[0])
	}
	return id, nil
}

// printTable — pretty print danh sách task dưới dạng bảng.
// Cột: ID | trạng thái | Title | Created.
// Width cố định để gọn; title dài bị truncate bằng "…".
func printTable(tasks []Task) {
	// Header
	fmt.Printf("%s  %s  %s  %s\n",
		padRight("ID", 4),
		padRight("ST", 3),
		padRight("Title", 40),
		"Created",
	)
	fmt.Println(strings.Repeat("─", 70))

	// Rows
	for _, t := range tasks {
		fmt.Printf("%s  %s  %s  %s\n",
			padRight("#"+strconv.Itoa(t.ID), 4),
			t.Icon(),
			padRight(truncate(t.Title, 40), 40),
			t.CreatedAt.Format("2006-01-02 15:04"),
		)
	}
	fmt.Println(strings.Repeat("─", 70))

	// Summary
	done := 0
	for _, t := range tasks {
		if t.IsDone() {
			done++
		}
	}
	fmt.Printf("Tổng %d task — %d done, %d pending\n",
		len(tasks), done, len(tasks)-done)
}
