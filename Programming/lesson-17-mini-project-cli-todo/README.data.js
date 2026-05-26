// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-17-mini-project-cli-todo/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 17 — Mini-project: CLI Todo App

Đây là **lesson tổng kết Tier 1**. Bạn sẽ build một CLI todo app **thực tế dùng được**: thêm/sửa/xóa/list task, lưu vào file JSON, tất cả đóng gói trong vài trăm dòng Go. Sau lesson này bạn có một binary \`todo\` có thể \`go install\` rồi dùng thật.

## Mục tiêu học tập

- Tự thiết kế kiến trúc 1 CLI nhỏ (entry / domain / storage / commands).
- Kết nối **tất cả kiến thức Tier 1**: package, struct + method, slice, map, pointer, string, control flow, function.
- Đọc/ghi file JSON với \`encoding/json\` + \`os.ReadFile\`/\`WriteFile\`.
- Dispatch command bằng \`map[string]handler\` (pattern thường gặp trong CLI tool thật).
- Pretty-print bảng dữ liệu trong terminal mà không cần thư viện ngoài.

## Kiến thức tiền đề

- [Lesson 11 — Hàm](../lesson-11-functions/README.md): multiple return, error.
- [Lesson 12 — Slice](../lesson-12-arrays-slices/README.md): \`append\`, slice trick xóa phần tử.
- [Lesson 13 — Map](../lesson-13-maps/README.md): dispatch table.
- [Lesson 14 — String](../lesson-14-strings-runes-utf8/README.md): cắt UTF-8 đúng bằng \`[]rune\`.
- [Lesson 15 — Struct & method](../lesson-15-struct-method/README.md): receiver, embedding.
- [Lesson 16 — Pointer](../lesson-16-pointers/README.md): khi nào dùng \`*T\` vs \`T\`.

## 1. Project goal — ta sắp build cái gì?

Một CLI gọi là \`todo\`. Khi cài xong, user gõ:

\`\`\`sh
$ todo add "Mua sữa"
Đã thêm task #1: Mua sữa

$ todo add "Đi tập gym"
Đã thêm task #2: Đi tập gym

$ todo list
ID    ST   Title                                     Created
──────────────────────────────────────────────────────────────────────
#1    [ ]  Mua sữa                                   2026-05-26 09:14
#2    [ ]  Đi tập gym                                2026-05-26 09:15
──────────────────────────────────────────────────────────────────────
Tổng 2 task — 0 done, 2 pending

$ todo done 1
Đã đánh dấu xong task #1: Mua sữa

$ todo list --done
ID    ST   Title                                     Created
──────────────────────────────────────────────────────────────────────
#1    [x]  Mua sữa                                   2026-05-26 09:14
──────────────────────────────────────────────────────────────────────
Tổng 1 task — 1 done, 0 pending
\`\`\`

State được lưu vào file \`.todo.json\` trong thư mục hiện tại (CWD) để app **có nhớ qua các lần chạy**. Đây không phải toy — cài xong dùng thật được.

> 💡 **Trực giác**: CLI app = \`os.Args\` (input) + state file (memory) + \`fmt.Print\` (output). Không có gì ma thuật. Mọi tool bạn xài hàng ngày (\`git\`, \`npm\`, \`go\`) đều cùng kiến trúc, chỉ phức tạp hơn.

## 2. Requirements — danh sách lệnh đầy đủ

| Lệnh | Tác dụng |
|------|----------|
| \`add <title>\` | Thêm task mới, ID tự tăng |
| \`list\` / \`list --all\` | Liệt kê toàn bộ task |
| \`list --done\` | Chỉ task đã hoàn thành |
| \`list --pending\` | Chỉ task chưa hoàn thành |
| \`done <id>\` | Đánh dấu task hoàn thành |
| \`undone <id>\` | Đưa task về pending |
| \`edit <id> <new title>\` | Sửa tiêu đề |
| \`remove <id>\` / \`rm <id>\` | Xóa task |
| \`clear\` | Xóa hết task đã done |
| \`help\` | In hướng dẫn dùng |

**Mô hình dữ liệu**:

\`\`\`go
type Task struct {
    ID        int
    Title     string
    Status    Status   // "pending" | "done"
    CreatedAt time.Time
}
\`\`\`

**Storage**: file JSON \`.todo.json\` ở CWD, format:

\`\`\`json
{
  "nextId": 3,
  "tasks": [
    { "id": 1, "title": "Mua sữa", "status": "done",    "createdAt": "..." },
    { "id": 2, "title": "Đi tập",  "status": "pending", "createdAt": "..." }
  ]
}
\`\`\`

Lưu \`nextId\` riêng để xóa task cuối không làm ID bị tái sử dụng. Đây là chi tiết quan trọng — nhiều CLI todo dùng \`len(tasks)+1\` làm ID mới và sinh bug khi xóa.

## 3. Architecture — vẽ ra trước khi code

\`\`\`
┌─────────────────────────────────────────────────┐
│  main.go                                        │
│    • parse os.Args                              │
│    • dispatch: command name → handler           │
│    • load store → run handler → save store      │
└─────────┬─────────────────────────┬─────────────┘
          │                         │
          ▼                         ▼
┌──────────────────┐      ┌──────────────────────┐
│  commands.go     │      │  storage.go          │
│    • cmdAdd      │      │   • LoadStore        │
│    • cmdList     │◄────►│   • Store.Save       │
│    • cmdDone     │      │   • Store.FindByID   │
│    • cmdRemove   │      │   • Store.FindIndex  │
│    • cmdEdit     │      └──────────┬───────────┘
│    • cmdClear    │                 │
└─────────┬────────┘                 │
          │                          │
          ▼                          ▼
┌─────────────────────────────────────────────────┐
│  task.go                                        │
│    type Task struct { ... }                     │
│    func (t *Task) MarkDone()                    │
│    func (t  Task) IsDone() bool                 │
│    func (t  Task) Icon() / String()             │
└─────────────────────────────────────────────────┘
\`\`\`

Quy tắc phụ thuộc (dependency direction):
- \`task.go\` thuần data — không phụ thuộc ai.
- \`storage.go\` chỉ phụ thuộc \`task.go\` (biết về Task để (de)serialize).
- \`commands.go\` phụ thuộc cả 2 (đọc/ghi store, gọi method Task).
- \`main.go\` đứng trên cùng, biết tất cả.

Pattern này gọi là **layered architecture**: domain (Task) ở đáy, infrastructure (Storage) ở giữa, application (Commands + main) ở trên. Tier 7 sẽ học sâu hơn (Clean Architecture, Hexagonal). Bây giờ chỉ cần thấy: "phụ thuộc đi một chiều, không vòng".

> ❓ **Câu hỏi tự nhiên**: "Sao không gộp hết vào 1 file \`todo.go\` cho gọn?". Trả lời: 1 file ~300 dòng đã khó scroll, và **người đọc sẽ không biết tìm logic Task ở đâu**. Tách file theo trách nhiệm = dễ navigate. Quan trọng hơn: bạn đang luyện thói quen tách file đúng cho project to.

## 4. Step-by-step build

Đây là phần build từng bước. Bạn nên đọc xong rồi tự gõ lại, đừng copy-paste.

### Bước 1 — Setup module + main.go khung

\`\`\`sh
mkdir todo && cd todo
go mod init todo
\`\`\`

\`main.go\`:

\`\`\`go
package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: todo <command> [args]")
        os.Exit(1)
    }
    cmd := os.Args[1]
    args := os.Args[2:]
    fmt.Printf("cmd=%s args=%v\\n", cmd, args)
}
\`\`\`

Chạy thử:

\`\`\`sh
$ go run . hello world
cmd=hello args=[world]
\`\`\`

Đây là baseline. Tất cả bước sau là **bồi thêm** lên khung này, không phải viết lại.

### Bước 2 — Task struct + storage JSON

\`task.go\`:

\`\`\`go
package main

import "time"

type Status string

const (
    StatusPending Status = "pending"
    StatusDone    Status = "done"
)

type Task struct {
    ID        int       \`json:"id"\`
    Title     string    \`json:"title"\`
    Status    Status    \`json:"status"\`
    CreatedAt time.Time \`json:"createdAt"\`
}

func (t *Task) MarkDone()      { t.Status = StatusDone }
func (t  Task) IsDone() bool   { return t.Status == StatusDone }
\`\`\`

Tag \`json:"id"\` quyết định tên field khi serialize. Mặc định Go viết hoa (\`ID\` → \`"ID"\`), không quen mắt với JSON convention nên ta đặt rõ.

\`storage.go\`:

\`\`\`go
package main

import (
    "encoding/json"
    "errors"
    "os"
)

const dataFile = ".todo.json"

type Store struct {
    NextID int    \`json:"nextId"\`
    Tasks  []Task \`json:"tasks"\`
}

func LoadStore() (*Store, error) {
    data, err := os.ReadFile(dataFile)
    if err != nil {
        if errors.Is(err, os.ErrNotExist) {
            return &Store{NextID: 1, Tasks: []Task{}}, nil
        }
        return nil, err
    }
    if len(data) == 0 {
        return &Store{NextID: 1, Tasks: []Task{}}, nil
    }
    var s Store
    if err := json.Unmarshal(data, &s); err != nil {
        return nil, err
    }
    return &s, nil
}

func (s *Store) Save() error {
    data, err := json.MarshalIndent(s, "", "  ")
    if err != nil {
        return err
    }
    return os.WriteFile(dataFile, data, 0644)
}
\`\`\`

> ⚠ **Lỗi thường gặp**: Quên check \`os.ErrNotExist\`. Lần đầu chạy chưa có file, nếu coi đây là lỗi thì user không bao giờ thoát được vòng "tạo task để file tồn tại / đọc file để tạo task". Phải treat file-not-exist = empty store.

### Bước 3 — Lệnh \`add\`

\`\`\`go
// commands.go
package main

import (
    "fmt"
    "strings"
    "time"
)

func cmdAdd(s *Store, args []string) error {
    if len(args) == 0 {
        return fmt.Errorf("thiếu tiêu đề")
    }
    title := strings.TrimSpace(strings.Join(args, " "))
    s.Tasks = append(s.Tasks, Task{
        ID:        s.NextID,
        Title:     title,
        Status:    StatusPending,
        CreatedAt: time.Now(),
    })
    s.NextID++
    fmt.Printf("Đã thêm task #%d\\n", s.NextID-1)
    return nil
}
\`\`\`

Wire vào \`main.go\`:

\`\`\`go
store, err := LoadStore()
if err != nil { /* ... */ }

switch cmd {
case "add":
    if err := cmdAdd(store, args); err != nil { /* print error */ }
}

if err := store.Save(); err != nil { /* print error */ }
\`\`\`

Test: \`go run . add "Mua sữa"\` → file \`.todo.json\` xuất hiện. Mở ra xem JSON.

### Bước 4 — Lệnh \`list\` (basic)

\`\`\`go
func cmdList(s *Store, args []string) error {
    if len(s.Tasks) == 0 {
        fmt.Println("Không có task nào.")
        return nil
    }
    for _, t := range s.Tasks {
        fmt.Println(t)
    }
    return nil
}
\`\`\`

Lúc này print kiểu thô: \`{1 Mua sữa pending 2026-...}\` (default format của struct). Để đẹp, định nghĩa \`String() string\` cho \`Task\` (implement \`fmt.Stringer\`):

\`\`\`go
func (t Task) String() string {
    icon := "[ ]"
    if t.IsDone() { icon = "[x]" }
    return fmt.Sprintf("#%d %s %s", t.ID, icon, t.Title)
}
\`\`\`

Sau khi có method này, \`fmt.Println(t)\` tự gọi nó.

### Bước 5 — Lệnh \`done\`

\`\`\`go
func cmdDone(s *Store, args []string) error {
    if len(args) == 0 {
        return fmt.Errorf("cú pháp: done <id>")
    }
    id, err := strconv.Atoi(args[0])
    if err != nil {
        return fmt.Errorf("ID phải là số: %s", args[0])
    }
    task := s.FindByID(id)
    if task == nil {
        return fmt.Errorf("không tìm thấy task #%d", id)
    }
    task.MarkDone()
    return nil
}
\`\`\`

\`FindByID\` phải trả \`*Task\` (pointer), KHÔNG phải \`Task\` (value):

\`\`\`go
func (s *Store) FindByID(id int) *Task {
    for i := range s.Tasks {
        if s.Tasks[i].ID == id {
            return &s.Tasks[i]   // địa chỉ phần tử slice
        }
    }
    return nil
}
\`\`\`

> ⚠ **Pitfall pointer kinh điển**: Nếu viết
> \`\`\`go
> for _, t := range s.Tasks {
>     if t.ID == id { return &t }   // SAI!
> }
> \`\`\`
> thì \`t\` là **biến copy** của vòng lặp, \`&t\` là địa chỉ biến tạm — sửa nó không ảnh hưởng slice gốc. Phải dùng \`&s.Tasks[i]\`. Xem [Lesson 16 — Pointer](../lesson-16-pointers/README.md) để hiểu sâu.

### Bước 6 — \`list --done\` / \`--pending\` filter

Dùng map[string]predicate cho gọn:

\`\`\`go
filters := map[string]func(Task) bool{
    "":          func(t Task) bool { return true },
    "--all":     func(t Task) bool { return true },
    "--done":    func(t Task) bool { return t.IsDone() },
    "--pending": func(t Task) bool { return !t.IsDone() },
}

flag := ""
if len(args) > 0 { flag = args[0] }
keep := filters[flag]
// ... iterate, in những task thỏa keep(t)
\`\`\`

Đây là pattern dispatch table biến thể — thay vì command thì là filter. Học được từ map = dùng được khắp nơi.

### Bước 7 — \`edit\`, \`remove\`, \`clear\`

Remove dùng slice trick:

\`\`\`go
func cmdRemove(s *Store, args []string) error {
    id, _ := strconv.Atoi(args[0])
    idx := s.FindIndex(id)
    if idx == -1 { return fmt.Errorf("không tìm thấy") }
    s.Tasks = append(s.Tasks[:idx], s.Tasks[idx+1:]...)
    return nil
}
\`\`\`

Clear lọc ngược lại (filter in-place):

\`\`\`go
func cmdClear(s *Store, _ []string) error {
    kept := s.Tasks[:0]   // reuse underlying array
    for _, t := range s.Tasks {
        if !t.IsDone() { kept = append(kept, t) }
    }
    s.Tasks = kept
    return nil
}
\`\`\`

> 💡 Slice trick \`s.Tasks[:0]\` reuse memory thay vì cấp phát mới. Production code không cần optimize sớm — \`var kept []Task\` cũng OK.

### Bước 8 — Pretty print + error handling

Bảng:

\`\`\`
ID    ST   Title                                     Created
──────────────────────────────────────────────────────────────────────
#1    [x]  Mua sữa                                   2026-05-26 09:14
#2    [ ]  Đi tập gym                                2026-05-26 09:15
──────────────────────────────────────────────────────────────────────
Tổng 2 task — 1 done, 1 pending
\`\`\`

Trick: dùng \`padRight(s, n)\` đệm khoảng trắng đếm theo **rune** (không phải byte) để chữ Việt có dấu không lệch cột:

\`\`\`go
func padRight(s string, width int) string {
    n := len([]rune(s))
    if n >= width { return s }
    return s + strings.Repeat(" ", width-n)
}
\`\`\`

Error handling: tất cả handler trả \`error\`, main in ra \`os.Stderr\` rồi \`os.Exit(1)\`. Đừng \`log.Fatal\` rải rác — sẽ khó test sau này.

> 📝 **Tóm tắt 8 bước**: Khung main → struct + storage → 1 lệnh chạy được (add) → list để xác nhận → done (chạm pointer) → filter (map) → các lệnh phụ → polish. Mỗi bước **chạy được** mới sang bước sau — không build hết rồi mới test.

## 5. Kiến thức Tier 1 dùng ở đâu trong project này

Đây là phần để bạn thấy mọi lesson Tier 1 không phải lý thuyết suông:

| Kiến thức Tier 1 | Dùng ở chỗ nào trong todo app |
|------------------|-------------------------------|
| **Package** (L06) | \`package main\`, import \`encoding/json\`, \`os\`, \`strings\`, \`strconv\`, \`time\` |
| **Types & const** (L07) | \`type Status string\`, \`const StatusDone Status = "done"\` |
| **Control flow** (L09) | \`if err != nil\`, switch trong dispatch (option), early return mọi handler |
| **Function** (L11) | Mỗi handler là 1 function với signature thống nhất; multiple return \`(int, error)\` cho \`parseID\` |
| **Slice** (L12) | \`s.Tasks []Task\`, \`append(...)\`, slice trick xóa \`s.Tasks[:idx]\` + \`s.Tasks[idx+1:]...\` |
| **Map** (L13) | \`commandTable map[string]handler\` dispatch, \`filters map[string]func(...)\` cho list |
| **String** (L14) | \`strings.Join\`, \`strings.TrimSpace\`, \`strings.Repeat\`, padding bằng \`[]rune\` để UTF-8 đúng |
| **Struct + method** (L15) | \`Task\` struct, method \`(t *Task) MarkDone()\` pointer receiver, \`(t Task) IsDone()\` value receiver |
| **Pointer** (L16) | \`FindByID\` trả \`*Task\` để sửa được; \`&s.Tasks[i]\` lấy địa chỉ phần tử slice |

Khi đọc code \`solutions/\`, để ý từng dòng tương ứng kiến thức nào. Đó là cách kiến trúc trong đầu được củng cố.

## 6. Hướng dẫn test thủ công

Sau khi clone xong, copy đoạn này để verify mọi tính năng:

\`\`\`sh
cd solutions
rm -f .todo.json   # reset

# Thêm vài task
go run . add "Mua sữa"
go run . add "Đi tập gym"
go run . add "Học Go lesson 17"

# Xem tất cả
go run . list

# Hoàn thành 1 task
go run . done 1

# Lọc
go run . list --done
go run . list --pending

# Sửa
go run . edit 2 "Đi tập sáng 6h"
go run . list

# Xóa
go run . remove 3
go run . list

# Dọn done
go run . clear
go run . list

# Đọc raw JSON
cat .todo.json
\`\`\`

Output expected: mỗi lệnh in một dòng confirm, \`list\` in bảng đúng format. Nếu có sai khác, đối chiếu với \`solutions/\` xem mình nhầm chỗ nào.

Cài đặt như binary thật:

\`\`\`sh
cd solutions
go install .          # cài vào $GOPATH/bin
todo add "task ở bất kỳ đâu"
\`\`\`

## 7. Hướng phát triển tiếp (nâng cao)

Đây là tuỳ chọn — không bắt buộc, nhưng làm xong sẽ thấy bản thân tự xây được app to hơn:

- **Priority** (1-5): thêm field, sort khi list.
- **Deadline date**: parse RFC3339, hiển thị overdue đỏ qua ANSI escape.
- **Tag/label**: \`add --tag work "Họp..."\`, lệnh \`list --tag work\`.
- **Export CSV**: \`todo export tasks.csv\` dùng \`encoding/csv\`.
- **Tích hợp [cobra](https://github.com/spf13/cobra)**: thay parser tự viết bằng framework chuẩn của Go community. Sẽ học ở Tier 4 (CLI for backend tooling).
- **TUI** dùng [bubbletea](https://github.com/charmbracelet/bubbletea) thay CLI text. Đẹp hơn, tương tác keyboard.
- **Sync với REST API**: server lưu task cho nhiều máy. Sẽ làm được sau Tier 4.

## 8. Bài tập — mở rộng project

Vì đây là project tổng kết, bài tập = thêm tính năng. Mỗi BT đều có lời giải đầy đủ ở mục sau.

### BT1 — Thêm priority

Thêm field \`Priority int\` (1-5, mặc định 3). Thêm lệnh \`priority <id> <n>\` để set. Khi \`list\`, sort theo priority giảm dần (5 lên đầu).

### BT2 — Search

Lệnh \`search <keyword>\` — in ra task nào có title chứa keyword (case-insensitive). Dùng \`strings.ToLower\` + \`strings.Contains\`.

### BT3 — Deadline + overdue hiển thị màu

Thêm field \`Deadline *time.Time\` (pointer để cho phép nil = không deadline). Lệnh \`due <id> <YYYY-MM-DD>\` set deadline. Khi \`list\`, nếu deadline đã qua và task còn pending → in title màu đỏ qua ANSI \`\\033[31m...\\033[0m\`.

### BT4 — Stats command

Lệnh \`stats\` in:

\`\`\`
Tổng: 12
Done: 7 (58.3%)
Pending: 5 (41.7%)
Đã thêm trong 7 ngày qua: 4
\`\`\`

### BT5 — Undo last action

Lưu \`.todo.json.bak\` backup trước MỖI lần Save. Lệnh \`undo\` swap \`.todo.json\` ↔ \`.todo.json.bak\`. Đơn giản, không cần history dài.

## 9. Lời giải chi tiết

### BT1 — Priority

Thêm vào \`Task\`:

\`\`\`go
type Task struct {
    // ...
    Priority int \`json:"priority"\`
}
\`\`\`

Trong \`cmdAdd\`, mặc định \`Priority: 3\`. Migration: file cũ không có field này thì JSON unmarshal để zero = 0; ta xử lý ngay sau \`LoadStore\`:

\`\`\`go
for i := range s.Tasks {
    if s.Tasks[i].Priority == 0 {
        s.Tasks[i].Priority = 3
    }
}
\`\`\`

Lệnh \`cmdPriority\`:

\`\`\`go
func cmdPriority(s *Store, args []string) error {
    if len(args) < 2 {
        return fmt.Errorf("cú pháp: priority <id> <n>")
    }
    id, err := strconv.Atoi(args[0])
    if err != nil { return err }
    n, err := strconv.Atoi(args[1])
    if err != nil || n < 1 || n > 5 {
        return fmt.Errorf("priority phải là số 1-5")
    }
    task := s.FindByID(id)
    if task == nil { return fmt.Errorf("không tìm thấy #%d", id) }
    task.Priority = n
    return nil
}
\`\`\`

Sort trong \`cmdList\`:

\`\`\`go
sort.SliceStable(visible, func(i, j int) bool {
    return visible[i].Priority > visible[j].Priority
})
\`\`\`

Độ phức tạp \`O(n log n)\`. Với todo ≤ 1000 task không đáng kể.

### BT2 — Search

\`\`\`go
func cmdSearch(s *Store, args []string) error {
    if len(args) == 0 {
        return fmt.Errorf("cú pháp: search <keyword>")
    }
    keyword := strings.ToLower(strings.Join(args, " "))
    var hits []Task
    for _, t := range s.Tasks {
        if strings.Contains(strings.ToLower(t.Title), keyword) {
            hits = append(hits, t)
        }
    }
    if len(hits) == 0 {
        fmt.Printf("Không có task nào chứa %q.\\n", keyword)
        return nil
    }
    printTable(hits)
    return nil
}
\`\`\`

Độ phức tạp \`O(n * m)\` với n = số task, m = độ dài title. Với 1000 task vẫn tức thời.

> ❓ Nếu task = 1 triệu thì sao? Lúc đó cần inverted index (tách title thành từ, build map[word]→[]id). Tier 5 (Data) sẽ học.

### BT3 — Deadline + overdue đỏ

Thêm field:

\`\`\`go
type Task struct {
    // ...
    Deadline *time.Time \`json:"deadline,omitempty"\`
}
\`\`\`

Pointer + tag \`omitempty\` để task không có deadline thì JSON không in field này (sạch sẽ).

Lệnh \`cmdDue\`:

\`\`\`go
func cmdDue(s *Store, args []string) error {
    if len(args) < 2 {
        return fmt.Errorf("cú pháp: due <id> <YYYY-MM-DD>")
    }
    id, _ := strconv.Atoi(args[0])
    task := s.FindByID(id)
    if task == nil { return fmt.Errorf("không tìm thấy") }
    d, err := time.Parse("2006-01-02", args[1])
    if err != nil { return fmt.Errorf("format date sai, dùng YYYY-MM-DD") }
    task.Deadline = &d
    return nil
}
\`\`\`

Render overdue đỏ trong \`printTable\`:

\`\`\`go
title := truncate(t.Title, 40)
if t.Deadline != nil && time.Now().After(*t.Deadline) && !t.IsDone() {
    title = "\\033[31m" + title + "\\033[0m"  // ANSI red
}
\`\`\`

> ⚠ ANSI escape không chạy trên Windows cmd cổ. Trong dự án thật dùng [fatih/color](https://github.com/fatih/color) để cross-platform. Bây giờ học khái niệm trước.

### BT4 — Stats

\`\`\`go
func cmdStats(s *Store, _ []string) error {
    total := len(s.Tasks)
    done := 0
    recentlyAdded := 0
    weekAgo := time.Now().Add(-7 * 24 * time.Hour)
    for _, t := range s.Tasks {
        if t.IsDone() { done++ }
        if t.CreatedAt.After(weekAgo) { recentlyAdded++ }
    }
    pending := total - done
    var donePct, pendingPct float64
    if total > 0 {
        donePct = float64(done) / float64(total) * 100
        pendingPct = float64(pending) / float64(total) * 100
    }
    fmt.Printf("Tổng: %d\\n", total)
    fmt.Printf("Done: %d (%.1f%%)\\n", done, donePct)
    fmt.Printf("Pending: %d (%.1f%%)\\n", pending, pendingPct)
    fmt.Printf("Đã thêm trong 7 ngày qua: %d\\n", recentlyAdded)
    return nil
}
\`\`\`

Quan trọng: check \`total > 0\` trước khi chia (tránh \`NaN\`/\`+Inf\` khi list rỗng).

### BT5 — Undo

Trong \`Store.Save\`, copy file cũ sang \`.todo.json.bak\` trước khi ghi đè:

\`\`\`go
func (s *Store) Save() error {
    // Backup file cũ nếu có
    if old, err := os.ReadFile(dataFile); err == nil {
        _ = os.WriteFile(dataFile+".bak", old, 0644)
    }
    // ... rest of Save
}
\`\`\`

Lệnh \`cmdUndo\`:

\`\`\`go
func cmdUndo(s *Store, _ []string) error {
    backup, err := os.ReadFile(dataFile + ".bak")
    if err != nil {
        return fmt.Errorf("không có backup để undo")
    }
    if err := os.WriteFile(dataFile, backup, 0644); err != nil {
        return err
    }
    fmt.Println("Đã rollback. (undo chỉ hoạt động 1 lần — không có redo)")
    // Trick: sau khi rollback, prevent main.go save đè lên.
    // Đơn giản: gọi os.Exit(0) ngay đây.
    os.Exit(0)
    return nil
}
\`\`\`

> ⚠ \`os.Exit(0)\` trong handler là hack — production nên dùng flag \`skipSave\` ở Store rồi check trong main. Ở đây dùng cách đơn giản để minh họa concept undo.

## 10. Code & minh họa

- [solutions/](./solutions/) — project Go đầy đủ, build và chạy được. \`cd solutions && go run . help\`.
- [visualization.html](./visualization.html) — terminal simulator tương tác (gõ lệnh thật, xem state JSON đổi real-time), architecture diagram click-to-explore.

## 11. Kết thúc Tier 1 — bước tiếp

Sau lesson này bạn đã:

- Build xong app Go thực, dùng được hằng ngày.
- Áp dụng được mọi syntax Tier 1 vào project.
- Bắt đầu hiểu cách chia file theo trách nhiệm.

**Tier 2 — Go Intermediate** sẽ học: interface, error handling sâu, goroutine + channel, generic, context, testing. Đây là phần Go khác biệt nhất so với Java/Python — chuẩn bị tinh thần đọc nhiều.

→ Xem [Tier 2 — Intermediate](../tier-2-intermediate/index.html).
`;
