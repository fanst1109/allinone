// Package main — CLI todo app (lesson 17 mini project).
//
// Cách chạy:
//
//	go run . add "Mua sữa"
//	go run . list
//	go run . done 1
//	go run . list --done
//	go run . remove 2
//
// File state lưu ở .todo.json trong thư mục hiện tại.
package main

import (
	"fmt"
	"os"
)

// handler — signature chung cho mọi command.
type handler func(s *Store, args []string) error

// commandTable — dispatch table: command name → handler.
// Pattern này là phiên bản đơn giản hóa của cách cobra hoặc flag.NewFlagSet làm.
var commandTable = map[string]handler{
	"add":    cmdAdd,
	"list":   cmdList,
	"ls":     cmdList, // alias quen tay
	"done":   cmdDone,
	"undone": cmdUndone,
	"remove": cmdRemove,
	"rm":     cmdRemove, // alias
	"edit":   cmdEdit,
	"clear":  cmdClear,
}

func main() {
	// os.Args[0] là tên program, [1] là command, [2:] là args.
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	cmd := os.Args[1]
	args := os.Args[2:]

	// Lệnh help xử lý riêng (không cần load store).
	if cmd == "help" || cmd == "-h" || cmd == "--help" {
		printUsage()
		return
	}

	fn, ok := commandTable[cmd]
	if !ok {
		fmt.Fprintf(os.Stderr, "Lệnh không hỗ trợ: %s\n\n", cmd)
		printUsage()
		os.Exit(1)
	}

	// Load store (đọc .todo.json).
	store, err := LoadStore()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Lỗi load: %v\n", err)
		os.Exit(1)
	}

	// Thực thi command.
	if err := fn(store, args); err != nil {
		fmt.Fprintf(os.Stderr, "Lỗi: %v\n", err)
		os.Exit(1)
	}

	// Lưu store (ghi .todo.json).
	// Lệnh đọc-only như `list` vẫn save — không sao vì save idempotent.
	// Nếu muốn skip thì track dirty flag (bài tập).
	if err := store.Save(); err != nil {
		fmt.Fprintf(os.Stderr, "Lỗi save: %v\n", err)
		os.Exit(1)
	}
}

// printUsage — in hướng dẫn dùng. Tự tay format thay cho flag.PrintDefaults().
func printUsage() {
	fmt.Println(`todo — CLI todo app (lesson 17).

Cú pháp:
  todo <command> [args]

Lệnh:
  add <title>           Thêm task mới
  list [--all|--done|--pending]
                        Liệt kê task (mặc định: tất cả)
  ls                    Alias của list
  done <id>             Đánh dấu task hoàn thành
  undone <id>           Đưa task về pending
  edit <id> <title>     Sửa tiêu đề task
  remove <id>           Xóa task
  rm <id>               Alias của remove
  clear                 Xóa hết task đã done
  help                  In hướng dẫn này

Ví dụ:
  todo add "Mua sữa"
  todo list --pending
  todo done 1
  todo edit 2 "Mua sữa tươi không đường"

File state lưu tại ./.todo.json (cùng thư mục chạy).`)
}
