# Lesson 02 — Môi trường dev & Git

> **Tier 0 · Lesson 02** · Phụ thuộc: [Lesson 01 — Tư duy lập trình](../lesson-01-thinking-like-programmer/README.md). Lesson kế tiếp: [Lesson 03 — Command Line](../lesson-03-command-line-mastery/README.md).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Chọn được **OS phù hợp** để code (macOS / Linux native / Windows + WSL2) và biết vì sao.
- Sử dụng **terminal** thành thạo ở mức cơ bản (`pwd`, `ls`, `cd`, `cp`, `mv`, `rm`, `cat`, `less`, `man`, `which`) và hiểu **shell vs terminal vs tty** khác nhau ở đâu.
- Cài và dùng **VS Code** với 5–7 phím tắt sống còn; biết khi nào nâng cấp lên GoLand / Neovim.
- **Git căn bản đến mức làm việc thật được**: 3 vùng (working / staging / repo), workflow hằng ngày, branch & merge, remote (clone/push/pull/fetch), rebase vs merge, giải quyết conflict, và 5 lệnh cứu nguy.
- Viết được **`.gitignore`** cho project Go.
- Viết **commit message** tốt theo Conventional Commits.
- Hiểu **GitHub workflow**: clone → branch → commit → push → pull request → review → merge.

## Kiến thức tiền đề

- [Lesson 01 — Tư duy lập trình](../lesson-01-thinking-like-programmer/README.md). Biết "code là gì, làm việc với code là làm gì".
- Không yêu cầu Git, terminal, hay ngôn ngữ lập trình cụ thể.

## Câu chuyện mở bài — vì sao có lesson này?

Hồi tôi mới đi làm, có một ngày tôi mở project ra, sửa file `app.py` để thử một ý tưởng, ấn lưu, chạy thử — sập. Tôi sửa thêm. Sập tiếp. Hai tiếng sau tôi nhận ra: ý tưởng ban đầu sai, và tôi đã đè lên 200 dòng code đang chạy tốt. Không có Git, không có backup. Đó là buổi chiều dài nhất đời tôi.

Lesson này là cái phao mà tôi ước có lúc đó: **một bộ công cụ không cho phép bạn mất việc**. Nó không phải là phần "thú vị" của lập trình (thuật toán, thiết kế hệ thống mới là phần thú vị), nhưng nó là **phần bạn dùng mỗi ngày, từ ngày đầu đến hết sự nghiệp**. Đầu tư 1 tuần học kỹ, tiết kiệm 10 năm cuộc đời.

---

## 1. OS chọn cái nào?

Đây là câu đầu tiên mọi người mới hỏi. Câu trả lời ngắn: **bất kỳ Unix-like nào** (macOS hoặc Linux). Windows native được, nhưng **kèm WSL2**. Lý do dài hơn ở bên dưới.

### 1.1 So sánh thực tế

| Tiêu chí | macOS | Linux native (Ubuntu/Fedora/Arch) | Windows + WSL2 | Windows native |
|---|---|---|---|---|
| **Setup terminal Unix** | Sẵn có (zsh) | Sẵn có (bash) | Sẵn (Ubuntu trong WSL) | Cần Git Bash / PowerShell — khác Unix |
| **Compatibility với hướng dẫn online** | ~99% | ~99% | ~95% (vài quirk filesystem) | ~60%, hay phải dịch lệnh |
| **Tool dev** (Docker, Go, Node, …) | Trơn tru, Homebrew | Trơn tru, apt/pacman/dnf | Trơn tru trong WSL | Có Docker Desktop, đôi khi rắc rối |
| **Hardware support** | Chỉ máy Apple — đắt | Có khi phải tự fix driver | Tốt | Tốt nhất, hỗ trợ mọi driver |
| **Game / phần mềm chuyên dụng** | Hạn chế | Hạn chế | Có (Windows host) | Đầy đủ |
| **Cost** | Cao (máy Apple) | Miễn phí | Miễn phí (cần Windows) | Có sẵn Windows |
| **Phù hợp ai?** | Mua được Mac, không muốn nghĩ | Thích control + miễn phí | Đã có Windows, không muốn đổi máy | Người chỉ code .NET / game Windows |

### 1.2 Khuyến nghị

- **Có Mac → dùng Mac**. Setup nhanh nhất. Homebrew (`brew install`) lo gần như mọi thứ.
- **Có Windows → cài WSL2 + Ubuntu**. Code và compile trong Linux, edit bằng VS Code (Windows hoặc bên trong WSL đều được). Lưu ý: để code trong filesystem WSL (`/home/<bạn>/...`) chứ không phải `/mnt/c/...` để tránh chậm khủng khiếp.
- **Muốn học Linux thật → dual boot hoặc thay luôn**. Ubuntu LTS hoặc Fedora là an toàn cho người mới.

> **💡 Trực giác — vì sao Unix-like?**
> Phần lớn server thế giới chạy Linux. Hướng dẫn, lệnh, công cụ dev đều giả định bạn ở Unix. Code trên môi trường giống server đỡ cảnh "trên máy tao chạy được" khi deploy. Windows native không phải kém — chỉ là **lệch chuẩn** với ecosystem backend hiện đại.

> **⚠ Lỗi thường gặp**
> - Cài Docker Desktop trên Windows native rồi mount volume từ `C:\` — chậm khủng khiếp (10–100× chậm hơn WSL native).
> - Code trong WSL nhưng đặt project ở `/mnt/c/Users/...` — cùng vấn đề, chậm vì cross-filesystem.
> - Mua MacBook đời cũ Intel 8GB RAM để code — Xcode + Docker = nóng máy quay tay. Tối thiểu 16GB, ưu tiên Apple Silicon.

> **❓ Câu hỏi tự nhiên**
> - *"Tôi đang dùng Windows, có cần đổi không?"* — Không cần đổi, cài WSL2 là đủ cho 90% công việc backend.
> - *"WSL chậm hơn Linux native không?"* — Chậm hơn ~5–10% với compile/IO trong filesystem WSL. Không đáng kể cho người học.
> - *"Có nên dùng Chromebook?"* — Chromebook hiện đại có Linux container (Crostini) chạy được, nhưng RAM thấp + ARM hạn chế đa số môi trường dev. Tránh nếu nghiêm túc.

---

## 2. Terminal — công cụ số 1 của dev

### 2.1 Vì sao dev dùng terminal nhiều hơn GUI?

**4 lý do, không phải vì "trông ngầu":**

1. **Tốc độ**: Gõ `git commit -m "fix bug"` (5 giây) so với mở SourceTree, click Stage, gõ message, click Commit (30 giây). Nhân với 50 lần/ngày = hơn 20 phút tiết kiệm mỗi ngày.
2. **Scriptable**: Mọi lệnh terminal có thể bỏ vào file script chạy lại. GUI thì không. Vd: deploy script là 30 dòng bash chạy 1 lệnh; còn click qua dashboard AWS thì lần nào cũng phải nhớ.
3. **Remote**: Server không có GUI. SSH vào server prod để debug là chuyện hằng ngày — bạn buộc phải biết terminal.
4. **Không phụ thuộc OS**: Lệnh `ls`, `grep`, `git` chạy được trên macOS, Linux, WSL, server cloud, Docker container — học một lần dùng mọi nơi. GUI tool mỗi OS một khác.

### 2.2 Shell vs Terminal vs TTY — khác nhau thế nào?

Ba khái niệm hay bị lẫn:

- **TTY** (teletypewriter) — *vật lý*. Hồi xưa là cái máy đánh chữ nối với máy tính. Bây giờ là **một đường ống** kernel cấp cho mỗi phiên gõ phím / hiển thị text. Có thể coi là "thiết bị input/output dạng text".
- **Terminal** (terminal emulator) — *cái cửa sổ* bạn nhìn thấy. iTerm2, Windows Terminal, GNOME Terminal, kitty, alacritty… đều là **terminal emulator** — chúng giả lập một TTY trong cửa sổ đồ hoạ.
- **Shell** — *cái chương trình* chạy bên trong terminal, đọc lệnh bạn gõ và thực thi. `bash`, `zsh`, `fish`, `powershell`, `cmd.exe` là các shell khác nhau.

> **💡 Hình dung**
> Terminal là cái ô cửa, shell là người ngồi sau cửa nghe lệnh và làm việc, TTY là cái khe để bạn đẩy giấy lệnh và nhận giấy kết quả. Bạn có thể đổi shell (`bash` → `zsh`) mà không đổi terminal, hoặc đổi terminal (iTerm → kitty) mà vẫn dùng shell cũ.

> **❓ Câu hỏi tự nhiên**
> *"Tôi nên chọn shell nào?"* — Mặc định macOS là `zsh`, Linux/WSL Ubuntu là `bash`. Cả hai đều ổn. `fish` thân thiện hơn nhưng cú pháp khác chuẩn POSIX → script chia sẻ với người khác hay vỡ. Khuyến nghị: **giữ shell mặc định**, đến khi viết hàng nghìn dòng script mới cân nhắc đổi.

### 2.3 10 lệnh sống còn — kèm ví dụ thực

#### `pwd` — "tôi đang ở đâu?"

```bash
$ pwd
/home/duy/projects/myapp
```

Print Working Directory. Mỗi shell process có **một thư mục hiện tại** — mọi lệnh tương đối (`ls`, `cat file.txt`) đều tính từ đây. Gõ `pwd` khi bị lạc.

#### `ls` — "có gì trong thư mục này?"

```bash
$ ls                  # liệt kê
README.md  go.mod  go.sum  main.go  internal/

$ ls -la              # liệt kê chi tiết, có file ẩn
drwxr-xr-x 4 duy duy 4096 May 26 10:00 .
drwxr-xr-x 8 duy duy 4096 May 26 09:50 ..
-rw-r--r-- 1 duy duy   34 May 26 10:00 .gitignore
-rw-r--r-- 1 duy duy 1200 May 26 10:00 README.md
-rw-r--r-- 1 duy duy   42 May 26 10:00 go.mod
drwxr-xr-x 3 duy duy 4096 May 26 10:00 internal
-rw-r--r-- 1 duy duy  300 May 26 10:00 main.go
```

`-l` = long format (permission, size, ngày), `-a` = all (gồm file ẩn bắt đầu bằng dấu `.`). Thử kết hợp: `ls -lah` để có size dễ đọc (KB/MB).

#### `cd` — "vào thư mục"

```bash
$ cd internal/handler   # đi vào
$ cd ..                 # lên 1 cấp
$ cd                    # về home (~)
$ cd -                  # quay lại thư mục vừa rời (rất hữu ích!)
```

`cd -` là mẹo ít người biết: nhảy qua nhảy lại 2 thư mục. Ví dụ đang ở `/etc/nginx`, gõ `cd ~/projects/myapp`, làm việc, rồi `cd -` quay về `/etc/nginx`.

#### `mkdir` — tạo thư mục

```bash
$ mkdir notes
$ mkdir -p projects/myapp/internal/handler   # -p tạo cả cây
```

Không có `-p` mà tạo cây đa cấp khi cha chưa tồn tại → lỗi `No such file or directory`. **Hầu như luôn dùng `-p`** trừ khi muốn check chủ ý.

#### `cp` — copy

```bash
$ cp config.example.yml config.yml         # copy 1 file
$ cp -r templates/ output/                 # copy cả thư mục (-r = recursive)
$ cp file.txt /tmp/                        # copy sang thư mục khác
```

#### `mv` — di chuyển / đổi tên

```bash
$ mv draft.md README.md                    # đổi tên
$ mv *.log /tmp/                           # di chuyển nhiều file
$ mv old_dir new_name                      # đổi tên thư mục
```

Không có lệnh `rename` riêng — `mv` lo cả 2 việc.

#### `rm` — xoá

```bash
$ rm old.log
$ rm -r build/                             # xoá thư mục
$ rm -rf node_modules/                     # force, recursive — không hỏi
```

> **⚠ Lỗi kinh điển**
> `rm -rf /` (xoá toàn bộ filesystem) hoặc `rm -rf $VAR/*` khi `$VAR` không được set (= `rm -rf /*`). Luôn `echo "$VAR"` kiểm tra biến trước khi đưa vào `rm -rf`. Đã có dev xoá nhầm production server vì bug này.

#### `cat` / `less` — xem file

```bash
$ cat go.mod                               # in ra terminal, file nhỏ
$ less main.go                             # xem có thể scroll (q để thoát)
$ less +F app.log                          # follow log (như tail -f)
```

`cat` cho file < 100 dòng. File log dài → `less` (mũi tên / phím space để scroll, `/keyword` để search, `q` thoát).

#### `man` — sách hướng dẫn

```bash
$ man cp        # đọc full doc của cp (q để thoát)
$ man 7 signal  # section 7 — system overview
```

Nguyên tắc: **gặp lệnh lạ, `man <lệnh>` trước khi google**. Doc trên máy chính xác cho version đang dùng, không như tutorial cũ trên mạng.

#### `which` — "lệnh này từ đâu ra?"

```bash
$ which go
/usr/local/go/bin/go

$ which python
/usr/bin/python
```

Quan trọng khi gặp lỗi version: máy cài 2 bản Go, gõ `go version` không khớp dự kiến → `which go` để tìm cái nào đang được PATH ưu tiên.

> **🔁 Tự kiểm tra**
> 1. Khác nhau giữa `mv a.txt b.txt` và `cp a.txt b.txt`?
> 2. Sau `cd /tmp; cd /var/log; cd -`, đang ở đâu?
> 3. `rm -rf` khác `rm -r` chỗ nào?
>
> <details><summary>Đáp án</summary>
>
> 1. `mv` đổi tên (a.txt biến mất, chỉ còn b.txt). `cp` copy (cả 2 file đều có).
> 2. `/tmp` (quay lại nơi vừa rời).
> 3. `-f` = force, không hỏi xác nhận, không kêu khi file không tồn tại.
>
> </details>

### 2.4 Tình huống thực — "tải project về xem có gì"

```bash
$ cd ~                                # về home
$ mkdir -p projects && cd projects    # tạo / vào projects
$ git clone https://github.com/golang/example.git
$ cd example
$ ls
hello/  helloserver/  outyet/  README.md  ...
$ less README.md                      # đọc README
$ cd hello && ls                      # vào sub-project
$ cat hello.go                        # xem source
```

5 lệnh trên là **routine hằng ngày** của dev — clone, explore, đọc.

> **📝 Tóm tắt mục 2**
> - Terminal = cửa sổ, shell = chương trình chạy lệnh trong đó, TTY = đường ống text. Khác nhau rõ ràng.
> - 10 lệnh cốt lõi: `pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `cat`, `less`, `man`, `which`. Học thuộc, gõ phản xạ.
> - Quy tắc bảo vệ: kiểm tra biến trước `rm -rf`; dùng `mkdir -p`; `man` trước google.

---

## 3. Editor / IDE — chọn cái nào cho Go?

### 3.1 So sánh nhanh

| Editor | Phù hợp ai? | Mạnh | Yếu |
|---|---|---|---|
| **VS Code** + Go extension (chính chủ Google) | **Người mới — khuyến nghị** | Miễn phí, extension Go cực mạnh (debug, format, lint built-in), UI dễ làm quen | Tốn RAM hơn vim, đôi khi extension xung đột |
| **GoLand** (JetBrains) | Chuyên nghiệp, có ngân sách | Refactor mạnh nhất, debugger UI tốt nhất, integration test runner đỉnh | Trả phí (~$100/năm), nặng RAM (~2GB) |
| **Neovim** + `gopls` + nvim-lspconfig | Đã thạo vim, muốn tốc độ tối đa | Cực nhẹ, hoàn toàn keyboard, scriptable bằng Lua | Đường cong học dốc, cấu hình mất thời gian |
| Sublime Text | Người thích đơn giản | Nhẹ, mở file lớn nhanh | Ecosystem Go kém VS Code/GoLand |

### 3.2 Khuyến nghị

**Bắt đầu với VS Code + extension Go**. Lý do:

- Cài 2 lệnh xong là chạy: `brew install --cask visual-studio-code` (Mac) hoặc download installer.
- Mở file `.go` đầu tiên, VS Code tự gợi ý cài extension "Go" của Google — bấm Install. Xong.
- Extension đó tự cài thêm `gopls` (language server), `delve` (debugger), `gofmt`, `golangci-lint` khi cần. Bạn chỉ chấp nhận.
- Khi sau này muốn chuyển GoLand hoặc Neovim, các kỹ năng (debug, refactor, navigation) đã quen.

### 3.3 7 phím tắt VS Code sống còn

| Phím tắt (macOS / Linux+Windows) | Hành động | Khi nào dùng |
|---|---|---|
| `Cmd+P` / `Ctrl+P` | **Quick open file** | Mở file bất kỳ trong project — gõ tên không cần biết đường dẫn |
| `Cmd+Shift+F` / `Ctrl+Shift+F` | **Search across files** | Tìm chuỗi/regex trong toàn project. Thay thế Google "tìm hàm này ở đâu" |
| `F12` | **Jump to definition** | Đặt con trỏ vào tên hàm/biến → F12 nhảy đến nơi định nghĩa |
| `Shift+F12` | **Find all references** | Hàm này được gọi từ đâu? Đổi tên có ảnh hưởng gì? |
| `Cmd+D` / `Ctrl+D` | **Select next occurrence** (multi-cursor) | Sửa lặp lại 1 chuỗi nhiều chỗ — bấm liên tục để select thêm |
| `` Ctrl+` `` (cùng key trên cả 2 OS) | **Toggle terminal** | Mở/đóng terminal tích hợp ngay trong VS Code — không cần switch app |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | **Command Palette** | Mọi lệnh VS Code đều ở đây. Gõ "go test", "format", "git push" — đều có |

> **💡 Mẹo học phím tắt**
> Đừng học một lúc 50 phím. Mỗi tuần chọn **2 phím** in ra giấy dán cạnh màn hình, dùng đến khi phản xạ rồi đổi 2 phím tiếp. 1 tháng = 8 phím = đủ trên 90% trường hợp.

### 3.4 Settings VS Code khởi đầu cho Go

`~/.config/Code/User/settings.json` (Linux) hoặc `~/Library/Application Support/Code/User/settings.json` (macOS):

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": false,
  "[go]": {
    "editor.defaultFormatter": "golang.go"
  },
  "go.lintTool": "golangci-lint",
  "go.lintOnSave": "package",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

> **📝 Tóm tắt mục 3**
> - VS Code + extension Go là điểm khởi đầu hợp lý cho mọi người mới.
> - GoLand cho người chuyên nghiệp có ngân sách; Neovim cho người đã thạo vim.
> - 7 phím tắt: quick open, search, jump to def, find refs, multi-cursor, toggle terminal, command palette.

---

## 4. Git — version control căn bản (phần lớn nhất của lesson)

### 4.1 Vì sao cần Git?

Quay lại câu chuyện đầu bài: tôi sửa nhầm, đè lên 200 dòng đang chạy. Với Git, kịch bản sẽ là:

```bash
$ git status            # ah, có 3 file thay đổi
$ git diff app.py       # xem mình đã sửa gì
# (nhận ra ý tưởng sai)
$ git checkout -- app.py # vứt thay đổi, trở về bản đang chạy
```

3 lệnh, 5 giây. **Git là machine ngược thời gian cho code.** Mọi thay đổi từ lúc bạn `git init` đều có thể truy ngược.

Ngoài "ngược thời gian", Git còn:

- **Làm song song**: Bạn fix bug A, đồng nghiệp làm feature B, cả 2 không đè lên nhau nhờ **branch**.
- **Lịch sử ghi chép**: 6 tháng sau quay lại code, `git log` thấy ai sửa gì khi nào, kèm message giải thích.
- **Backup tự nhiên**: Push lên GitHub = có bản copy trên cloud. Máy cháy, dùng máy khác `git clone` lại.

### 4.2 Mental model — 3 vùng

Đây là khái niệm **trung tâm**, hiểu được nó thì 80% Git hết khó:

```
┌──────────────────┐   git add    ┌──────────────────┐   git commit   ┌──────────────────┐
│                  │ ───────────> │                  │ ─────────────> │                  │
│  Working dir     │              │  Staging area    │                │  Repository      │
│  (file thực)     │              │  (chuẩn bị)      │                │  (lịch sử)       │
│                  │ <─────────── │                  │ <───────────── │                  │
└──────────────────┘ git checkout └──────────────────┘ git reset      └──────────────────┘
                     git restore                      HEAD~1
```

- **Working directory** — các file `.go`, `.md`, `.yml` bạn đang sửa bằng editor. Đây là thứ duy nhất hệ điều hành "thấy".
- **Staging area** (còn gọi **index**) — *vùng chuẩn bị*. Bạn `git add file.go` để đẩy 1 file từ working sang staging, ý "tôi sắp commit cái này".
- **Repository** — *lịch sử bất biến*. `git commit` chụp một bức ảnh (snapshot) của staging area và lưu vĩnh viễn (cho đến khi rebase / reflog hết hạn).

> **💡 Vì sao có vùng staging?**
> Vì bạn không phải lúc nào cũng muốn commit **mọi thay đổi**. Thường đang code 1 thứ, sửa thêm 1 typo trong file khác, sửa luôn 1 config — 3 thay đổi nên là 3 commit khác nhau cho rõ lịch sử. Staging cho phép chọn lọc: `git add file1.go && git commit -m "feat: ..."`, rồi `git add typo.md && git commit -m "docs: fix typo"`.

> **❓ Câu hỏi tự nhiên**
> - *"Có thể skip staging không?"* — Có, `git commit -am "msg"` commit thẳng mọi file đã được track. Nhưng mất tính chọn lọc, không khuyến nghị khi đang học.
> - *"`HEAD` là gì?"* — Là **con trỏ tới commit hiện tại** (thường là commit cuối của branch hiện tại). `HEAD~1` = commit trước HEAD.

### 4.3 Workflow hằng ngày — 5 lệnh

```bash
# 1. Tôi đang có gì thay đổi?
$ git status
On branch main
Changes not staged for commit:
  modified:   main.go
  modified:   README.md
Untracked files:
  scratch.txt

# 2. Xem chi tiết thay đổi
$ git diff main.go
diff --git a/main.go b/main.go
@@ -10,3 +10,5 @@ func main() {
-    fmt.Println("Hello")
+    fmt.Println("Hello, world")
+    fmt.Println("New line")
 }

# 3. Đưa file đã sẵn sàng vào staging
$ git add main.go
$ git status
Changes to be committed:
  modified:   main.go
Changes not staged for commit:
  modified:   README.md

# 4. Tạo snapshot
$ git commit -m "feat: thêm dòng chào và log thử"
[main 4f2c91a] feat: thêm dòng chào và log thử
 1 file changed, 2 insertions(+), 1 deletion(-)

# 5. Xem lịch sử
$ git log --oneline
4f2c91a feat: thêm dòng chào và log thử
a8b3e2f docs: thêm hướng dẫn install
9f1c0bb init project
```

5 lệnh này = **80% công việc Git hằng ngày của bạn**. Học thuộc, gõ phản xạ.

> **⚠ Lỗi thường gặp**
> - `git add .` (add tất cả) khi chưa kiểm tra `git status` → vô tình commit file rác (`*.log`, `secret.env`). Quy tắc: **luôn `git status` trước khi add**.
> - Quên `-m`, gõ `git commit` → bị Git mở editor (thường là vim). Người mới hoảng. Cách thoát vim: `Esc` rồi `:q!` rồi Enter. Lần sau nhớ `-m "msg"`.

### 4.4 Branch & merge

#### Vì sao có branch?

3 lý do cụ thể:

1. **Làm việc song song không đè nhau** — Bạn làm feature login, đồng nghiệp làm feature payment, cả 2 commit lên cùng repo mà không xung đột (đến khi merge).
2. **Tách feature khỏi main** — Code đang dở chưa commit lên `main` (vì `main` cần luôn chạy được).
3. **Thử nghiệm rủi ro thấp** — Tạo branch `experiment/new-cache`, thử ý tưởng. Sai thì xoá branch, không ảnh hưởng `main`.

#### Cú pháp

```bash
$ git branch                              # liệt kê branch
* main

$ git checkout -b feature/login           # tạo branch mới và switch vào
Switched to a new branch 'feature/login'

# (sửa code, commit như bình thường)
$ git add . && git commit -m "feat: add login form"

$ git checkout main                       # quay lại main
$ git merge feature/login                 # gộp feature vào main
```

Tip: từ Git 2.23 có lệnh `git switch` thay cho `git checkout` khi chỉ chuyển branch (`git switch -c feature/login`), rõ nghĩa hơn. Cả 2 cùng tồn tại.

#### ASCII tree — fast-forward merge

Trước merge:

```
main:       A ── B ── C
                       \
feature:                D ── E
```

`main` đứng ở C, `feature` thêm D, E (rẽ từ C). Khi merge mà `main` không có commit mới nào ngoài C, Git chỉ cần **tua thẳng** con trỏ `main` lên E. Không tạo commit mới.

Sau merge (fast-forward):

```
main, feature: A ── B ── C ── D ── E
```

#### ASCII tree — 3-way merge

Khi `main` cũng có commit mới sau khi rẽ:

Trước merge:

```
main:       A ── B ── C ── F ── G
                       \
feature:                D ── E
```

`main` đã tiến đến G, `feature` đã tiến đến E, **hai nhánh rẽ riêng** từ C. Git không thể tua. Phải tạo **merge commit M** ghép cả 2:

Sau merge (3-way merge):

```
main:       A ── B ── C ── F ── G ── M
                       \             /
feature:                D ── E ─────
```

`M` có 2 cha (G và E). Cây có chỗ "ngã ba" nhập lại.

> **❓ Câu hỏi tự nhiên**
> *"Có nên ép fast-forward không?"* — Một số team thích lịch sử thẳng (no merge commit) → dùng `git merge --ff-only` (chỉ merge nếu fast-forward được) hoặc rebase trước khi merge. Đây là quyết định team, không có đúng/sai tuyệt đối.

### 4.5 Remote — làm việc với GitHub

#### `clone` — tải project từ remote về

```bash
$ git clone https://github.com/golang/example.git
$ cd example
$ git remote -v
origin  https://github.com/golang/example.git (fetch)
origin  https://github.com/golang/example.git (push)
```

`origin` là **biệt danh** cho URL remote (chuẩn mặc định). `git clone` tự thiết lập `origin` trỏ về URL bạn clone.

#### `push` — đẩy commit local lên remote

```bash
$ git push                              # push branch hiện tại lên upstream đã set
$ git push origin main                  # push tường minh branch main lên origin
$ git push -u origin feature/login      # lần đầu push branch mới, -u set upstream
```

#### `pull` vs `fetch` — đây là chỗ hay nhầm

- **`git fetch`** — tải commit mới **về** local nhưng **không gộp** vào branch hiện tại. Sau fetch, bạn có một bản copy của remote dưới dạng `origin/main`, nhưng `main` local chưa đổi.
- **`git pull`** = `git fetch` + `git merge origin/main` (hoặc `rebase` tuỳ config). Tải về **và gộp ngay**.

Khi nào dùng cái nào?

| Tình huống | Lệnh nên dùng |
|---|---|
| Sáng vào, muốn cập nhật code mới nhất từ team | `git pull` |
| Muốn xem có gì mới trước khi gộp | `git fetch` rồi `git log main..origin/main` |
| Trên branch feature, muốn lấy update mới nhất từ main remote | `git fetch origin && git rebase origin/main` |
| CI script chỉ cần data, không cần đổi branch hiện tại | `git fetch` |

> **💡 Trực giác**
> `fetch` = đi siêu thị mua đồ về để vào tủ lạnh — chưa nấu. `pull` = vừa mua vừa nấu luôn. Nếu muốn xem nguyên liệu trước khi nấu → `fetch` rồi quyết định.

### 4.6 Rebase vs merge — chọn cái nào?

Cả 2 đều **gộp thay đổi từ branch này sang branch khác**. Khác nhau ở **hình thù lịch sử**.

#### Merge — giữ lịch sử thật, có ngã ba

Đã trình bày ở mục 4.4 (3-way merge). Lịch sử trông như:

```
main:    A ── B ── C ── F ── G ── M
                  \             /
feature:           D ── E ─────
```

#### Rebase — "viết lại lịch sử" cho thẳng

Rebase **dời** commit của branch hiện tại lên đỉnh của branch đích, như thể bạn đã rẽ ra từ điểm mới nhất.

Trước rebase (giống ban đầu của 3-way):

```
main:       A ── B ── C ── F ── G
                       \
feature:                D ── E
```

Trên branch `feature` chạy `git rebase main`:

```
main:       A ── B ── C ── F ── G
                                 \
feature:                          D' ── E'
```

`D'` và `E'` là **commit mới** (hash khác D, E) nhưng nội dung thay đổi tương đương. Sau đó merge `feature` vào `main` sẽ là fast-forward, lịch sử thẳng:

```
main, feature: A ── B ── C ── F ── G ── D' ── E'
```

#### Khi nào dùng?

| Tình huống | Nên |
|---|---|
| Cleanup commit local **trước khi push** | **Rebase** (đẹp lịch sử, không ai bị ảnh hưởng) |
| Đã push lên remote và người khác đã pull về | **Merge** (rebase = đổi hash = phá lịch sử người khác) |
| Đồng bộ branch feature với main mới nhất | Rebase (giữ branch thẳng) |
| Gộp feature đã hoàn thành vào main (chính sách team là "no ff") | Merge với `--no-ff` (giữ ngã ba để thấy đường đời của feature) |

> **⚠ Quy tắc vàng**
> **Không rebase nhánh đã share với người khác.** Bạn rebase = mọi commit có hash mới → người khác đã pull về với hash cũ sẽ bị lệch lịch sử, sửa cực đau.

### 4.7 Conflict — cách giải quyết

Conflict xảy ra khi **2 branch sửa cùng 1 dòng** trong cùng 1 file, Git không biết nên giữ bên nào.

#### Ví dụ thật

Branch `main` có `app.go`:

```go
func greet(name string) string {
    return "Hello, " + name
}
```

Bạn ở branch `feature/vietnamese` sửa thành:

```go
func greet(name string) string {
    return "Xin chào, " + name
}
```

Đồng nghiệp ở branch `feature/spanish` (đã merge vào main rồi) đã sửa thành:

```go
func greet(name string) string {
    return "Hola, " + name
}
```

Bạn `git pull` (hoặc `git merge main` vào feature) → conflict:

```go
func greet(name string) string {
<<<<<<< HEAD
    return "Xin chào, " + name
=======
    return "Hola, " + name
>>>>>>> main
}
```

Đọc marker:
- Từ `<<<<<<< HEAD` đến `=======` là **phiên bản của bạn** (branch hiện tại).
- Từ `=======` đến `>>>>>>> main` là **phiên bản đến từ branch main**.

#### Cách giải quyết

1. **Mở file**, đọc cả 2 phiên bản, **quyết định** giữ gì:
   ```go
   func greet(name string, lang string) string {
       switch lang {
       case "vi":
           return "Xin chào, " + name
       case "es":
           return "Hola, " + name
       default:
           return "Hello, " + name
       }
   }
   ```
   (ở đây tôi kết hợp cả 2 thành function nhận lang)
2. **Xoá hết marker** `<<<<<<<`, `=======`, `>>>>>>>`. Editor như VS Code có nút "Accept Current Change / Incoming Change / Both" giúp xoá tự động.
3. **Test** code đã chạy đúng.
4. **`git add`** file đã sửa: `git add app.go`.
5. **`git commit`** (nếu đang merge): `git commit` (Git tự gợi ý message "Merge branch 'main' into feature/vietnamese"). Nếu đang rebase: `git rebase --continue`.

#### Hủy bỏ giữa chừng

- Đang merge: `git merge --abort` → trở về trạng thái trước merge.
- Đang rebase: `git rebase --abort` → trở về trạng thái trước rebase.
- Đang pull và bị conflict (= đang merge nội bộ): `git merge --abort`.

> **❓ Câu hỏi tự nhiên**
> *"Conflict có làm mất code không?"* — **Không**. Git không tự xoá; nó hỏi bạn chọn. Trừ khi bạn xoá tay rồi commit. Conflict không đáng sợ, chỉ đáng đọc kỹ.

### 4.8 5 lệnh cứu nguy hay dùng

| Lệnh | Khi nào | Tác dụng |
|---|---|---|
| `git stash` | Đang sửa dở, sếp bảo fix bug branch khác ngay | Cất tạm thay đổi vào "kho", working dir sạch trở lại. Sau `git stash pop` lấy lại |
| `git reset --soft HEAD~1` | Vừa commit nhưng phát hiện message sai / quên file | Huỷ commit cuối nhưng **giữ nguyên thay đổi** trong staging. Sửa rồi commit lại |
| `git checkout -- <file>` | Sửa nhầm file, muốn vứt thay đổi | Khôi phục file về **trạng thái commit cuối**. (Git ≥ 2.23 có `git restore <file>`) |
| `git reflog` | Vừa làm gì đó dại dột (reset --hard, rebase fail), commit "mất tích" | Liệt kê **mọi HEAD đã đi qua** trong ~30 ngày. Tìm hash, `git reset --hard <hash>` quay về |
| `git cherry-pick <hash>` | Một commit ở branch khác mình muốn ngay trên branch hiện tại | Sao chép **1 commit** sang branch hiện tại (tạo commit mới với hash khác) |

#### Ví dụ thật cho từng cái

##### `git stash` — chuyển ngữ cảnh nhanh

```bash
# Đang ở feature/login, code dở
$ git status
modified: login.go, modified: login_test.go

# Sếp bảo fix bug critical ngay
$ git stash
Saved working directory and index state WIP on feature/login: ...

$ git checkout main
$ git checkout -b hotfix/critical
# (fix, commit, push)
$ git checkout feature/login
$ git stash pop          # lấy lại code dở
```

##### `git reset --soft HEAD~1` — sửa commit cuối

```bash
$ git commit -m "feat: add lgoin"    # ôi viết sai chính tả
$ git reset --soft HEAD~1            # huỷ commit, code vẫn ở staging
$ git commit -m "feat: add login"    # commit lại với message đúng
```

##### `git checkout -- <file>` — undo thay đổi 1 file

```bash
$ git status
modified: config.yml          # ôi tôi đã thử sửa nhưng làm sập
$ git checkout -- config.yml  # vứt thay đổi, lấy lại bản commit cuối
```

(Lưu ý: thay đổi **chưa commit** sẽ mất luôn — không khôi phục được. Quy tắc: kiểm tra `git diff` trước khi `checkout --`.)

##### `git reflog` — cứu commit "mất tích"

```bash
$ git reset --hard HEAD~3       # ôi tôi định reset --soft mà gõ nhầm --hard
# 3 commit "biến mất"
$ git reflog
8f3a2c1 HEAD@{0}: reset: moving to HEAD~3
4e7b9c2 HEAD@{1}: commit: feat: add cache layer
9d1f8e3 HEAD@{2}: commit: refactor: split handler
1a2b3c4 HEAD@{3}: commit: feat: add login

$ git reset --hard 4e7b9c2     # khôi phục về trạng thái có "add cache layer"
```

Git lưu reflog ~30 ngày — quên thì xong. Nhưng trong 30 ngày, **gần như không có gì là mất thật sự**.

##### `git cherry-pick` — lấy 1 commit từ branch khác

```bash
# Đồng nghiệp đã fix bug X trên branch feature/payment commit 8f3a2c1
# Mình ở branch production hotfix, muốn bug fix đó ngay
$ git cherry-pick 8f3a2c1
[hotfix abc123] fix: ...
```

> **🔁 Tự kiểm tra**
> 1. Bạn commit cuối có message sai, code đúng. Lệnh nào sửa?
> 2. Vừa `git reset --hard HEAD~5` nhầm, 5 commit "biến mất". Cứu thế nào?
> 3. Khác nhau giữa `git checkout -- file.go` và `git checkout file.go`?
>
> <details><summary>Đáp án</summary>
>
> 1. `git commit --amend -m "message mới"` (đơn giản nhất) hoặc `git reset --soft HEAD~1` rồi commit lại.
> 2. `git reflog`, tìm hash trước reset, `git reset --hard <hash>`.
> 3. Giống nhau khi `file.go` là file (không phải branch tên `file.go`). Dấu `--` là để **Git phân biệt** tên file với tên branch khi trùng tên — best practice là luôn có `--` cho rõ ý.
>
> </details>

> **📝 Tóm tắt mục 4**
> - 3 vùng: working / staging / repository. Hiểu vùng = hiểu 80% Git.
> - Daily workflow: `status → diff → add → commit → log`.
> - Branch để làm song song; merge có 2 dạng (fast-forward, 3-way).
> - Remote: `clone` lần đầu, `fetch` xem, `pull` xem-và-gộp, `push` đẩy lên.
> - Rebase đẹp lịch sử nhưng **không rebase nhánh đã share**.
> - Conflict không đáng sợ — đọc marker, chọn, xoá marker, add, commit.
> - 5 lệnh cứu nguy: `stash`, `reset --soft HEAD~1`, `checkout -- file`, `reflog`, `cherry-pick`.

---

## 5. `.gitignore` — không commit thứ không nên commit

### 5.1 Vì sao cần?

Sau khi `git init`, mọi file đều **chờ được track**. Nhưng có những file bạn **không bao giờ muốn commit**:

- **Binary build** — `*.exe`, `app`, `main` — to, không cần thiết, build lại được.
- **Dependency tải về** — `node_modules/`, `vendor/` (Go) — to khổng lồ, có thể `go mod download` lại.
- **Secret** — `.env`, `credentials.json`, `*.pem` — commit lên GitHub public = đầu hàng cho attacker.
- **File IDE riêng** — `.idea/`, `.vscode/settings.json` cá nhân, `*.swp` (vim swap).
- **OS rác** — `.DS_Store` (macOS), `Thumbs.db` (Windows).
- **File log / temp** — `*.log`, `tmp/`, `__debug_bin*` (Go debugger build).

`.gitignore` là file text ở gốc repo, **liệt kê pattern** (1 dòng 1 pattern) Git sẽ bỏ qua.

### 5.2 `.gitignore` mẫu cho project Go

```gitignore
# Binary
*.exe
*.exe~
*.dll
*.so
*.dylib
main
app

# Go debugger
__debug_bin*

# Test output
*.test
*.out
coverage.html
coverage.out

# Dependency directory (nếu dùng vendor)
vendor/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Env / secret
.env
.env.local
*.pem
*.key
secrets/

# Log
*.log
logs/
```

### 5.3 Lưu ý

- `.gitignore` chỉ có tác dụng với **file chưa được track**. File đã `git add` trước đó vẫn bị track dù sau đó add vào ignore — phải `git rm --cached <file>` trước.
- `**/` matche thư mục bất kỳ độ sâu. `*.log` matche mọi file `.log`. Dấu `!` ở đầu = đảo ngược (`!important.log` = track lại file này).
- Mẫu `.gitignore` cộng đồng cho mọi ngôn ngữ: <https://github.com/github/gitignore>.

> **⚠ Lỗi cực kỳ phổ biến**
> Commit `.env` chứa AWS key, push lên GitHub public — bot scan trong 60 giây, mining EC2 hết tiền. Đã có dev mất hàng nghìn USD vì vụ này. **Quy tắc**: `.env` luôn trong `.gitignore` **trước** khi commit lần đầu. Có lỡ commit → rotate key NGAY, đừng chỉ xoá file (lịch sử Git vẫn còn).

---

## 6. Commit message tốt — Conventional Commits

### 6.1 Vì sao quan trọng?

`git log` 6 tháng sau, bạn (hoặc đồng nghiệp) đọc:

```
abc123 stuff
def456 update
ghi789 fix
```

→ không hiểu gì. Phải `git show abc123` xem diff để đoán.

So với:

```
abc123 feat(auth): thêm endpoint /login với JWT
def456 fix(api): trả 400 thay vì 500 khi body rỗng
ghi789 docs(readme): bổ sung hướng dẫn cài đặt
```

→ đọc 30 giây hiểu hết history. Message tốt = **văn hoá team thấp ma sát**.

### 6.2 Conventional Commits — chuẩn được dùng rộng rãi

Format: `<type>(<scope>): <subject>`

- **type** (bắt buộc): `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`.
- **scope** (tuỳ chọn): module/feature ảnh hưởng. `(auth)`, `(api)`, `(db)`.
- **subject** (bắt buộc): mô tả ngắn, dùng động từ chủ động.

| Type | Khi nào |
|---|---|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `docs` | Chỉ thay đổi tài liệu |
| `refactor` | Sửa code không thêm tính năng / không sửa bug |
| `test` | Thêm / sửa test |
| `chore` | Việc lặt vặt (đổi dependency, đổi config build) |
| `perf` | Cải thiện performance |

### 6.3 5 ví dụ tốt vs xấu

| ✗ Xấu | ✓ Tốt | Lý do |
|---|---|---|
| `update` | `fix(payment): handle expired credit card by returning 402` | Tốt: type rõ, scope rõ, mô tả tình huống cụ thể |
| `bug fix` | `fix(api): trim whitespace trong email khi register` | Tốt: nói rõ sửa gì |
| `wip` | `feat(auth): scaffold login endpoint (chưa validate)` | Tốt: nếu thật sự dở dang, ghi rõ trạng thái |
| `final` | `refactor(handler): split userHandler thành 3 file theo concern` | Tốt: "final" không có ý nghĩa, refactor + giải thích sạch hơn |
| `asdfgh` | `chore(deps): bump golang/x/crypto từ v0.17 → v0.20` | Tốt: nói rõ dep nào, version nào |

> **💡 Mẹo viết subject**
> Test bằng câu: *"If applied, this commit will <subject>"*. Ví dụ: "If applied, this commit will *handle expired credit card by returning 402*" — câu phải xuôi tai. Nếu thấy lệch ("If applied, this commit will *update*") → message quá mơ hồ.

### 6.4 Body và footer (cho commit lớn)

```
feat(auth): thêm OAuth2 flow với Google

Đóng issue #123. Trước đây user chỉ đăng ký bằng email/password.
Giờ có thể đăng nhập bằng Google account, dùng PKCE để bảo vệ
mobile client.

- Thêm /auth/google/login và /auth/google/callback
- Lưu refresh token được mã hoá AES-GCM trong DB
- Update SDK client để wrap PKCE challenge

Breaking change: bảng `users` thêm cột `oauth_provider`.
Migration: db/migrations/0024_add_oauth.sql

Closes #123
```

- **Dòng 1**: tiêu đề ngắn (≤ 50 ký tự).
- **Dòng 2**: trống.
- **Body**: giải thích "vì sao", "tác động", trích issue nếu có.

---

## 7. GitHub workflow căn bản — từ clone đến merge

Đây là workflow chuẩn của 95% team backend hiện đại. Walk-through cụ thể:

### 7.1 Lần đầu — clone repo

```bash
$ git clone https://github.com/myteam/myapp.git
$ cd myapp
```

Hoặc nếu là private repo, dùng SSH (cần setup SSH key trên GitHub):

```bash
$ git clone git@github.com:myteam/myapp.git
```

### 7.2 Tạo branch cho công việc

```bash
$ git checkout main
$ git pull                                   # đảm bảo đang ở bản mới nhất
$ git checkout -b feat/user-profile-page
```

Quy ước đặt tên branch (đa số team):

- `feat/<tên-ngắn>` cho feature
- `fix/<tên-ngắn>` cho bug fix
- `refactor/<tên-ngắn>` cho refactor
- `chore/<tên-ngắn>` cho việc lặt vặt

### 7.3 Code, commit nhiều lần

```bash
# (sửa code)
$ git add internal/handler/user.go
$ git commit -m "feat(user): scaffold profile handler"

# (sửa thêm, viết test)
$ git add internal/handler/user_test.go
$ git commit -m "test(user): thêm test cho profile handler"
```

### 7.4 Push lên GitHub

```bash
$ git push -u origin feat/user-profile-page
```

GitHub trả về URL gợi ý mở Pull Request.

### 7.5 Mở Pull Request (PR)

Trên GitHub:

```
┌─────────────────────────────────────────────────────────┐
│ feat/user-profile-page  ──>  main                       │
│                                                         │
│ Title: feat(user): user profile page                    │
│                                                         │
│ Description:                                            │
│ ## Summary                                              │
│ - Thêm GET /users/:id/profile                          │
│ - Cache 5 phút bằng Redis                              │
│                                                         │
│ ## Test plan                                            │
│ - [x] Unit test cho handler                            │
│ - [x] Integration test với Redis                        │
│ - [ ] Load test (sẽ làm sau)                            │
│                                                         │
│ Closes #234                                             │
│                                                         │
│ [ Create Pull Request ]                                 │
└─────────────────────────────────────────────────────────┘
```

### 7.6 Review

Đồng nghiệp xem PR:

```
┌─ user.go ────────────────────────────────────────┐
│  + func (h *userHandler) Profile(...) {          │
│  +     id := chi.URLParam(r, "id")               │
│                                                  │
│  ┌─ Comment ─────────────────────────────────┐  │
│  │ thiếu validation id rỗng → 500           │  │
│  │                              [Resolve]   │  │
│  └─────────────────────────────────────────┘   │
│  +     user, err := h.svc.GetUser(ctx, id)       │
└──────────────────────────────────────────────────┘
```

Bạn fix:

```bash
$ # sửa code thêm validation
$ git add internal/handler/user.go
$ git commit -m "fix(user): validate empty id, trả 400"
$ git push
```

PR tự cập nhật (vì cùng branch).

### 7.7 Merge

Sau khi tất cả comment resolved + CI xanh + ≥1 approval:

```
┌─────────────────────────────────────────────────────────┐
│ ✓ All checks passed                                     │
│ ✓ 2 approving reviews                                   │
│                                                         │
│ [ ▼ Merge pull request ]                                │
│   ├─ Create a merge commit                              │
│   ├─ Squash and merge   ← thường dùng nhất              │
│   └─ Rebase and merge                                   │
└─────────────────────────────────────────────────────────┘
```

**Squash and merge** = gộp mọi commit của PR thành **1 commit duy nhất** trên main → lịch sử main sạch, mỗi PR = 1 commit. Đa số team backend modern chọn cái này.

Sau merge:

```bash
$ git checkout main
$ git pull
$ git branch -d feat/user-profile-page   # xoá branch local (đã merge xong)
```

> **📝 Tóm tắt mục 7**
> - Branch → code → commit → push → PR → review → merge → xoá branch. Lặp lại.
> - PR là **chỗ review code và thảo luận**, không phải chỉ là cơ chế gộp code.
> - Squash and merge là chiến lược an toàn cho team mới.

---

## 8. Ứng dụng thực tế — checklist setup máy mới

Đây là checklist tôi dùng mỗi khi setup máy dev mới. In ra cũng được.

### Mac / Linux

```bash
# 1. Cài Homebrew (Mac) hoặc dùng apt/dnf (Linux)
# (Mac)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Git
brew install git              # Mac
sudo apt install git -y       # Ubuntu/WSL

# 3. Config Git
git config --global user.name "Duy Nguyen"
git config --global user.email "duy@example.com"
git config --global init.defaultBranch main
git config --global pull.rebase false        # mặc định pull=merge, an toàn cho người mới
git config --global core.editor "code --wait" # dùng VS Code làm editor mặc định

# 4. Tạo SSH key cho GitHub
ssh-keygen -t ed25519 -C "duy@example.com"
cat ~/.ssh/id_ed25519.pub      # copy nội dung
# Paste vào GitHub → Settings → SSH and GPG keys → New SSH key

# 5. Cài Go (lesson 05 sẽ dùng)
brew install go                # Mac
# (Linux: tải tarball từ go.dev/dl/)

# 6. Cài VS Code
brew install --cask visual-studio-code   # Mac
# (Linux/WSL: download .deb hoặc snap)

# 7. Mở VS Code, cài extension "Go" của Google → tự cài gopls
```

### Windows + WSL2

```powershell
# Trong PowerShell admin:
wsl --install -d Ubuntu        # cài WSL2 + Ubuntu

# Sau khi Ubuntu khởi động, set user, rồi chạy phần "Linux" bên trên
# bên trong shell Ubuntu
```

---

## 9. Bài tập

> Làm xong trước khi đọc "Lời giải chi tiết" — đó là chỗ kiến thức chuyển từ "biết" thành "biết làm".

### BT1 — Đọc `git status`

Cho output sau, giải thích **từng phần** đang nói gì:

```
On branch feat/login
Your branch is ahead of 'origin/feat/login' by 2 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   internal/handler/login.go
        new file:   internal/handler/login_test.go

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        scratch.go
```

### BT2 — Trace bằng tay

Bắt đầu: repo trống có 1 commit ("init") trên branch `main`. Working dir có file `a.txt` nội dung "v1" (chưa thay đổi).

```
1. echo "v2" > a.txt           # ghi đè a.txt = "v2"
2. git add a.txt
3. echo "v3" > a.txt           # ghi đè lần nữa = "v3"
4. git commit -m "update a"
5. git checkout HEAD~1 -- a.txt
6. git status
```

**Câu hỏi**: Sau bước 6, nội dung file `a.txt` là gì? Staging area có gì? HEAD trỏ tới commit nào? `git status` báo gì?

### BT3 — Giải quyết conflict

File `config.go` đang có conflict:

```go
package config

import "os"

type Config struct {
<<<<<<< HEAD
    Port     int
    LogLevel string
    DebugMode bool
=======
    Port    int
    Verbose bool
    Region  string
>>>>>>> feature/region
}

func Load() *Config {
<<<<<<< HEAD
    return &Config{
        Port:      8080,
        LogLevel:  "info",
        DebugMode: os.Getenv("DEBUG") != "",
    }
=======
    return &Config{
        Port:    8080,
        Verbose: os.Getenv("VERBOSE") != "",
        Region:  os.Getenv("REGION"),
    }
>>>>>>> feature/region
}
```

Yêu cầu: **kết hợp cả 2 phiên bản** — giữ tất cả field từ cả `HEAD` và `feature/region`. Viết ra file kết quả (đã xoá hết marker).

### BT4 — Đọc `git log --oneline --graph`

```
*   8f3a2c1 (HEAD -> main) Merge branch 'feat/cache'
|\
| * 4e7b9c2 (feat/cache) feat(cache): thêm Redis layer
| * 9d1f8e3 chore: bump redis-go v0.5 → v0.6
|/
* 1a2b3c4 fix(api): trả 400 khi body rỗng
* 6c5d4e3 feat(api): scaffold /users endpoint
* 7a8b9c0 init project
```

Mô tả lịch sử trên **bằng lời** (4–6 câu): branch nào rẽ ở đâu, có bao nhiêu commit, được merge khi nào.

### BT5 — Viết commit message

Viết 5 commit message **tốt** (theo Conventional Commits) cho 5 tình huống sau:

1. Thêm endpoint `GET /users` trả danh sách user, hỗ trợ pagination qua query param `?page=1&limit=20`.
2. Sửa bug tràn array khi user gửi `limit=1000000` (giới hạn max 100).
3. Đổi tên struct `UserModel` thành `User` cho gọn, không thay đổi behavior.
4. Bump dependency `github.com/go-chi/chi` từ v5.0.10 lên v5.0.12.
5. Thêm hướng dẫn cài đặt trong `README.md`, bao gồm yêu cầu Go ≥ 1.22.

---

## 10. Lời giải chi tiết

### Giải BT1 — Đọc `git status`

- **`On branch feat/login`** — đang ở branch tên `feat/login` (không phải `main`).
- **`Your branch is ahead of 'origin/feat/login' by 2 commits.`** — local có 2 commit mà remote (`origin/feat/login`) chưa có. Cần `git push` để đồng bộ.
- **`Changes to be committed:`** — vùng **staging**. Sẽ vào commit kế tiếp:
  - `modified: internal/handler/login.go` — file đã được sửa và đã `git add`.
  - `new file: internal/handler/login_test.go` — file mới tạo, đã `git add`.
- **`Changes not staged for commit:`** — file đang **trong working directory** nhưng **chưa add** vào staging:
  - `modified: README.md` — file đã sửa nhưng chưa quyết định commit. Nếu commit ngay bây giờ, thay đổi này **không vào** commit.
- **`Untracked files:`** — file Git **chưa biết tới** (chưa từng được add):
  - `scratch.go` — file mới tạo, chưa add. Khác `Changes not staged` ở chỗ: file untracked chưa từng được track trong lịch sử Git.

Tóm lại: 4 file đang ở 3 trạng thái khác nhau, branch chưa đồng bộ với remote.

### Giải BT2 — Trace bằng tay

Theo dõi 3 vùng qua từng bước:

| Bước | Working dir (`a.txt`) | Staging | HEAD (commit cuối) |
|---|---|---|---|
| Start | "v1" | — | init (a.txt = "v1") |
| 1. `echo "v2" > a.txt` | **"v2"** | — | init |
| 2. `git add a.txt` | "v2" | **"v2"** | init |
| 3. `echo "v3" > a.txt` | **"v3"** | "v2" | init |
| 4. `git commit -m "update a"` | "v3" | "v2" (= HEAD vừa tạo) | **"update a"** (a.txt = "v2") |
| 5. `git checkout HEAD~1 -- a.txt` | **"v1"** (lấy từ commit init) | **"v1"** (checkout cũng đặt vào staging) | "update a" |
| 6. `git status` | — | — | — |

**Kết quả sau bước 6**:
- Working dir: `a.txt` = "v1".
- Staging: a.txt = "v1" (đã được staged bởi `checkout`).
- HEAD: commit "update a" với a.txt = "v2".
- `git status` báo: `Changes to be committed: modified: a.txt` (vì staging "v1" khác HEAD "v2").

Bài học: `git commit` chụp **staging**, không phải working dir. Khoảnh khắc step 4, file thực có "v3" nhưng commit ghi nhận "v2".

### Giải BT3 — Giải quyết conflict

Kết hợp tất cả field:

```go
package config

import "os"

type Config struct {
    Port      int
    LogLevel  string
    DebugMode bool
    Verbose   bool
    Region    string
}

func Load() *Config {
    return &Config{
        Port:      8080,
        LogLevel:  "info",
        DebugMode: os.Getenv("DEBUG") != "",
        Verbose:   os.Getenv("VERBOSE") != "",
        Region:    os.Getenv("REGION"),
    }
}
```

Bước thực hiện:
1. Xoá `<<<<<<< HEAD`, `=======`, `>>>>>>> feature/region`.
2. Gộp các field, sắp xếp lại cho thẳng cột.
3. Test build: `go build ./...`.
4. `git add config.go`.
5. `git commit` (Git tự gợi ý "Merge branch 'feature/region'") hoặc `git rebase --continue` nếu đang rebase.

### Giải BT4 — Đọc graph

Đọc graph từ dưới lên (cũ → mới):

1. Commit `7a8b9c0 init project` — khởi tạo repo.
2. Commit `6c5d4e3 feat(api): scaffold /users endpoint` — thêm endpoint cơ bản trên `main`.
3. Commit `1a2b3c4 fix(api): trả 400 khi body rỗng` — vẫn trên `main`.
4. Từ điểm này branch **`feat/cache`** rẽ ra. Trên branch này có 2 commit: `9d1f8e3 chore: bump redis-go v0.5 → v0.6` rồi `4e7b9c2 feat(cache): thêm Redis layer`.
5. Commit `8f3a2c1 Merge branch 'feat/cache'` là **3-way merge** gộp branch `feat/cache` vào `main`. `HEAD -> main` cho biết hiện tại đang ở commit này, branch `main`.

Tổng: 5 commit thường + 1 merge commit. `feat/cache` đã được merge xong, có thể xoá branch local nếu muốn.

### Giải BT5 — Commit message

1. `feat(users): GET /users với pagination ?page&limit`
2. `fix(users): giới hạn limit ≤ 100 để tránh OOM`
3. `refactor(model): đổi tên UserModel → User`
4. `chore(deps): bump go-chi/chi v5.0.10 → v5.0.12`
5. `docs(readme): thêm hướng dẫn cài đặt và yêu cầu Go ≥ 1.22`

Test bằng câu "If applied, this commit will …":
- "… add `GET /users` với pagination …" ✓ xuôi
- "… giới hạn limit ≤ 100 …" ✓ xuôi
- "… rename `UserModel` → `User`" ✓ xuôi

---

## 11. Code & Minh hoạ

- File minh hoạ tương tác: [visualization.html](./visualization.html) — gồm Git simulator (3 vùng), Branch tree visualizer (fast-forward + 3-way merge), Conflict resolver.
- Bài này không có `solutions.go` vì nội dung là công cụ + workflow, không phải code Go cụ thể.

---

## 12. Bài tiếp theo

- [Lesson 03 — Command Line Mastery](../lesson-03-command-line-mastery/README.md) — đi sâu hơn vào bash/zsh, pipe, redirect, `find`, `grep`, `sed`, `awk`, `ssh`, `tmux`.
- Tham khảo thêm:
  - [Pro Git book](https://git-scm.com/book/en/v2) — sách Git chính chủ, miễn phí, đầy đủ nhất.
  - [Oh My Git!](https://ohmygit.org/) — game học Git tương tác.
  - [GitHub Skills](https://skills.github.com/) — bài thực hành ngắn từ GitHub.

---

## 📝 Tóm tắt toàn lesson

- **OS**: macOS / Linux native hoặc Windows + WSL2 (Ubuntu). Tránh code production trên Windows native.
- **Terminal**: 10 lệnh sống còn (`pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `cat`, `less`, `man`, `which`). Phân biệt shell / terminal / TTY.
- **Editor**: VS Code + extension Go cho người mới. 7 phím tắt cần thuộc.
- **Git**:
  - 3 vùng: working / staging / repo.
  - Daily: `status → diff → add → commit → log`.
  - Branch + merge (FF / 3-way) hoặc rebase (cleanup local).
  - Remote: `clone / fetch / pull / push`.
  - Conflict: đọc marker, chọn, xoá marker, add, commit.
  - 5 lệnh cứu nguy: `stash`, `reset --soft HEAD~1`, `checkout -- file`, `reflog`, `cherry-pick`.
- **`.gitignore`**: luôn có trước commit đầu, đặc biệt để bảo vệ `.env`.
- **Commit message**: Conventional Commits, test bằng câu "If applied, this commit will …".
- **GitHub workflow**: branch → code → commit → push → PR → review → merge → xoá branch.
