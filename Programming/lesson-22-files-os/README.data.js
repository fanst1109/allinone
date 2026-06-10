// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-22-files-os/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 22 — File & OS

> Tier 2 — Go Intermediate · Lesson 22/79
>
> Prev: [L21 — IO Streaming](../lesson-21-io-streaming/README.md) · Next: [L23 — JSON Encoding](../lesson-23-json-encoding/README.md)

## Mục tiêu học tập

Sau lesson này bạn sẽ:

- Hiểu **\`os.File\`** là gì, vì sao nó vừa là một struct vừa thoả mãn ba interface \`io.Reader\`, \`io.Writer\`, \`io.Closer\` cùng lúc.
- Biết khi nào dùng \`os.Open\` / \`os.Create\` / \`os.OpenFile\` — khác nhau ra sao, dùng flag và permission như thế nào.
- Phân biệt **đọc/ghi toàn bộ file** (\`os.ReadFile\` / \`os.WriteFile\`) với **đọc/ghi stream** (bufio Scanner) — và vì sao chọn cái này thay cái kia.
- Hiểu **permission Unix dạng octal** (\`0644\`, \`0755\`, …) — mỗi digit nói gì.
- Duyệt thư mục bằng \`os.ReadDir\` (1 cấp) hoặc \`filepath.Walk\` (đệ quy), và sự khác biệt giữa hai package \`path\` và \`path/filepath\`.
- Cài đặt **atomic file write** pattern — write tmp + rename, để tránh corrupt khi crash.
- Đọc/ghi qua \`os.Stdin\` / \`os.Stdout\` / \`os.Stderr\`, gọi \`os.Getenv\`, \`os.Args\` — những công cụ cơ bản để viết CLI tool.
- Tránh được các pitfall điển hình: FD leak, race khi 2 process ghi cùng file, dùng \`+\` thay vì \`filepath.Join\`.

## Kiến thức tiền đề

- [L21 — IO Streaming](../lesson-21-io-streaming/README.md): \`io.Reader\`, \`io.Writer\`, \`bufio.Scanner\`, \`io.Copy\`. **Bắt buộc**, vì \`*os.File\` thực chất chỉ là một implementation của các interface đó.
- [L18 — Interface](../lesson-18-interfaces/README.md): hiểu implicit interface để biết vì sao file dùng được ở mọi chỗ nhận \`io.Reader\`.
- [L19 — Error Handling](../lesson-19-errors/README.md): mọi syscall đều trả error — phải check.
- Một chút quen với terminal Linux/macOS: \`ls -l\`, \`chmod\`, \`mkdir\`. Không bắt buộc nhưng giúp hiểu nhanh hơn.

---

## 1. \`os.File\` — đại diện một file descriptor

### 1.1 File descriptor là gì?

> 💡 **Trực giác / Hình dung**
>
> Trong Unix, khi bạn mở một file, OS không trao cho bạn cả nội dung file. Nó trao cho bạn một **số nguyên nhỏ** gọi là *file descriptor* (FD) — kiểu như "vé giữ chỗ ở quầy giữ xe". Bạn cầm vé này đi đọc / ghi / đóng. OS dùng vé để tra cứu *open file table* của nó, biết bạn đang nói tới file nào, vị trí con trỏ đang ở đâu.
>
> FD \`0\` = stdin, FD \`1\` = stdout, FD \`2\` = stderr — luôn được OS mở sẵn cho process.

Trong Go, thay vì làm việc trực tiếp với \`int\`, ta dùng \`*os.File\`. Struct này wrap FD số nguyên đó cùng với metadata (tên file, một mutex để tránh race khi nhiều goroutine cùng đọc/ghi).

\`\`\`go
f, err := os.Open("/etc/hosts")  // f là *os.File
if err != nil { /* handle */ }
defer f.Close()

fmt.Println(f.Name())  // "/etc/hosts"
fmt.Println(f.Fd())    // ví dụ: 3 (FD nguyên trả về từ kernel)
\`\`\`

### 1.2 \`*os.File\` thoả mãn 3 interface

\`\`\`go
type File struct { /* ... */ }
func (f *File) Read(b []byte) (n int, err error)     // io.Reader
func (f *File) Write(b []byte) (n int, err error)    // io.Writer
func (f *File) Close() error                          // io.Closer
\`\`\`

Hệ quả: **bất cứ chỗ nào nhận \`io.Reader\` (vd \`bufio.NewScanner\`, \`json.NewDecoder\`, \`io.Copy\`), bạn truyền thẳng \`*os.File\` vào**.

\`\`\`go
f, _ := os.Open("data.txt")
defer f.Close()

scanner := bufio.NewScanner(f)   // f satisfy io.Reader → OK
for scanner.Scan() {
    fmt.Println(scanner.Text())
}
\`\`\`

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> - *"Sao Go không bắt mình gọi \`read(fd, buf, n)\` như C?"* → Vì interface \`io.Reader\` ẩn syscall đi, cho phép dùng cùng code đọc file / network / in-memory buffer. Đây là lý do \`io.Copy(dst, src)\` chạy được với 9+ kiểu source/sink khác nhau.
> - *"\`Fd()\` để làm gì?"* → Khi cần gọi syscall đặc biệt chưa được Go wrap (vd \`flock\`, \`fcntl\`), bạn pass FD nguyên cho package \`golang.org/x/sys/unix\`.

### 1.3 Đóng file = bắt buộc

> ⚠ **Lỗi thường gặp — FD leak**
>
> Mỗi process có hạn ngạch FD (Linux thường \`1024\` mặc định, nâng được lên \`ulimit -n 65536\`). Quên \`Close()\` → mở 1000 file rồi crash với lỗi \`too many open files\`. Pattern an toàn:
>
> \`\`\`go
> f, err := os.Open(path)
> if err != nil { return err }
> defer f.Close()   // ← LUÔN viết defer ngay sau khi check err
> \`\`\`
>
> Đặt \`defer\` *ngay* sau check err — không lùi xuống vài dòng, vì giữa đó nếu return sớm hoặc panic, file không đóng.

📝 **Tóm tắt mục 1**

- \`*os.File\` = wrapper quanh file descriptor số nguyên.
- Satisfy \`io.Reader\` + \`io.Writer\` + \`io.Closer\` → ghép được với mọi tool stream trong stdlib.
- Mở xong là \`defer f.Close()\`, không có ngoại lệ.

---

## 2. Mở file — \`Open\`, \`Create\`, \`OpenFile\`

Ba hàm này thực ra là 3 wrapper khác nhau quanh **một syscall duy nhất** \`open(2)\`. Khác nhau ở chỗ flag/permission được preset sẵn ra sao.

### 2.1 \`os.Open(path)\` — read-only

\`\`\`go
f, err := os.Open("/etc/hosts")
\`\`\`

Tương đương \`os.OpenFile(path, os.O_RDONLY, 0)\`. Nếu file không tồn tại → trả \`*PathError\` với \`os.ErrNotExist\`. Check bằng:

\`\`\`go
if errors.Is(err, os.ErrNotExist) { /* file không có */ }
\`\`\`

### 2.2 \`os.Create(path)\` — tạo mới / truncate, mở write-only

\`\`\`go
f, err := os.Create("output.txt")
\`\`\`

Tương đương \`os.OpenFile(path, O_RDWR|O_CREATE|O_TRUNC, 0666)\`. Có 3 hậu quả cần nhớ:

1. **Truncate**: nếu file đã tồn tại, **xoá sạch nội dung cũ** trước khi mở. Ghi đè lên data — đây là pitfall nếu bạn nhầm \`Create\` với "append".
2. **Permission \`0666\`** trên file mới tạo, sau đó **bị umask của process trừ đi** (umask mặc định \`022\` → permission thực ra là \`0644\`).
3. **Mode \`O_RDWR\`** dù tên là Create — nên bạn *có thể* \`Read\` từ file vừa tạo, chỉ là thường không cần.

### 2.3 \`os.OpenFile(path, flag, perm)\` — generic, control hết

Cú pháp:

\`\`\`go
f, err := os.OpenFile(path, flag, perm)
\`\`\`

\`flag\` là bitwise OR của các hằng số:

| Flag | Ý nghĩa |
|------|---------|
| \`os.O_RDONLY\` | Chỉ đọc |
| \`os.O_WRONLY\` | Chỉ ghi |
| \`os.O_RDWR\` | Đọc + ghi |
| \`os.O_APPEND\` | Ghi luôn cuối file (atomic — kernel đảm bảo seek+write là một bước) |
| \`os.O_CREATE\` | Tạo mới nếu chưa có |
| \`os.O_TRUNC\` | Cắt về độ dài 0 nếu file đã tồn tại |
| \`os.O_EXCL\` | Kết hợp với \`O_CREATE\`: fail nếu file đã tồn tại (chống race) |

\`perm\` chỉ áp dụng *khi tạo mới* (khi \`O_CREATE\` được set và file chưa tồn tại). Định dạng octal, vd \`0644\`, \`0755\`. Sẽ giải thích kỹ ở mục 7.

### 2.4 Ví dụ — append vào log file

\`\`\`go
// Mở file log: append, tạo nếu chưa có, write-only, perm 0644
f, err := os.OpenFile("app.log",
    os.O_APPEND|os.O_CREATE|os.O_WRONLY,
    0644)
if err != nil { return err }
defer f.Close()

f.WriteString("[INFO] start\\n")
\`\`\`

Mỗi \`Write\` được kernel ghi vào cuối file dưới dạng atomic — kể cả khi 2 process cùng append vào file này.

> ❓ **Câu hỏi tự nhiên**
>
> - *"\`os.Create\` vs \`OpenFile(O_CREATE|O_TRUNC|O_WRONLY)\` khác gì?"* → Chỉ khác \`O_RDWR\` vs \`O_WRONLY\`. Trong thực tế, dùng \`Create\` cho gọn nếu chỉ ghi.
> - *"Tại sao có \`O_EXCL\`?"* → Để chống race "tôi check file chưa tồn tại, rồi tôi tạo" — giữa 2 thao tác có thể có process khác tạo file. \`O_CREATE|O_EXCL\` gộp 2 thao tác thành 1 atomic syscall, fail nếu đã có.

### 2.5 So sánh nhanh

\`\`\`go
// Read-only, file phải tồn tại:
f, _ := os.Open("config.json")

// Write fresh, đè data cũ:
f, _ := os.Create("output.log")

// Append vào log:
f, _ := os.OpenFile("app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

// Create exclusive — fail nếu file đã có (lock file pattern):
f, err := os.OpenFile("/var/run/myapp.pid",
    os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0644)
if errors.Is(err, os.ErrExist) {
    log.Fatal("Có instance khác đang chạy")
}
\`\`\`

📝 **Tóm tắt mục 2**

- \`os.Open\` = read-only, \`os.Create\` = ghi mới (truncate).
- \`os.OpenFile\` = generic, dùng khi cần append, exclusive create, hay control permission.
- Mỗi flag là 1 bit — OR chúng lại.

---

## 3. Đọc cả file một lần

### 3.1 \`os.ReadFile\` — gọn nhất, dùng cho file nhỏ

\`\`\`go
data, err := os.ReadFile("config.json")   // Go 1.16+
if err != nil { return err }
fmt.Println(string(data))
\`\`\`

\`os.ReadFile\`:

1. Mở file.
2. \`Stat\` để biết size, allocate buffer.
3. Đọc hết vào buffer.
4. Đóng file.
5. Trả \`[]byte\` + error.

**Tự đóng file** — không cần \`defer Close()\`. Đây là API "one-shot".

> ⚠ **Khi nào KHÔNG dùng \`os.ReadFile\`**
>
> File 4GB → alloc 4GB RAM. File 50GB → process OOM (Out Of Memory) crash. Quy tắc rule of thumb: **\`os.ReadFile\` cho file < 10 MB**. Lớn hơn → stream.

### 3.2 Stream — đọc từng dòng với \`bufio.Scanner\`

\`\`\`go
f, err := os.Open("huge.log")
if err != nil { return err }
defer f.Close()

scanner := bufio.NewScanner(f)
for scanner.Scan() {
    line := scanner.Text()        // không gồm '\\n'
    // ... xử lý từng dòng
}
if err := scanner.Err(); err != nil {
    return err
}
\`\`\`

Hai ưu điểm:

1. **Memory không đổi** dù file 100GB — Scanner chỉ giữ 1 dòng tại 1 thời điểm.
2. **Bắt đầu xử lý ngay từ dòng đầu**, không phải chờ load hết file.

> ❓ **"Dòng dài 5MB thì sao?"**
>
> \`bufio.Scanner\` mặc định cap buffer ở \`64 KiB\`/dòng. Dòng vượt quá → error \`bufio.ErrTooLong\`. Sửa bằng:
>
> \`\`\`go
> scanner := bufio.NewScanner(f)
> buf := make([]byte, 0, 1024*1024)
> scanner.Buffer(buf, 10*1024*1024)  // tối đa 10MB/dòng
> \`\`\`

### 3.3 Walk-through — đọc số dòng có chứa "ERROR"

\`\`\`go
f, err := os.Open("app.log")
if err != nil { return 0, err }
defer f.Close()

count := 0
scanner := bufio.NewScanner(f)
for scanner.Scan() {
    if strings.Contains(scanner.Text(), "ERROR") {
        count++
    }
}
return count, scanner.Err()
\`\`\`

Memory dùng ≈ 64 KiB (buffer Scanner) + size 1 dòng. Chạy được trên file log 200 GB.

📝 **Tóm tắt mục 3**

- File nhỏ (< 10 MB) → \`os.ReadFile(path)\` cho gọn.
- File lớn → stream bằng \`bufio.NewScanner(f)\` đọc từng dòng.
- Dòng dài > 64 KiB → tăng buffer Scanner.

---

## 4. Ghi file

### 4.1 \`os.WriteFile\` — one-shot

\`\`\`go
data := []byte("Hello\\nWorld\\n")
err := os.WriteFile("hello.txt", data, 0644)
\`\`\`

Tương đương \`os.OpenFile(O_WRONLY|O_CREATE|O_TRUNC, 0644)\` + \`Write\` + \`Close\`. Atomic ở mức syscall? **Không** — nếu crash giữa lúc đang ghi, file có thể còn ở trạng thái dở dang. Với write atomic xem mục 10.

### 4.2 Stream write

\`\`\`go
f, err := os.Create("output.csv")
if err != nil { return err }
defer f.Close()

w := bufio.NewWriter(f)
defer w.Flush()   // QUAN TRỌNG: flush buffer ra file trước khi close

for _, row := range rows {
    w.WriteString(row + "\\n")
}
\`\`\`

> ⚠ **Hai pitfall**
>
> 1. **Quên \`w.Flush()\`** — \`bufio.Writer\` đệm trong 4 KiB. Nếu data chưa đủ buffer, lúc \`Close()\` data chưa flush → mất.
> 2. **Thứ tự defer**: \`defer f.Close()\` xếp trước \`defer w.Flush()\` → khi return, Flush chạy *trước* Close (defer là LIFO). Đúng. Nhưng nếu Flush trả error, bạn không thấy nó vì kết quả bị Close ghi đè. Pattern an toàn hơn:
>
>    \`\`\`go
>    err := w.Flush()
>    if err != nil { /* handle */ }
>    f.Close()
>    \`\`\`

### 4.3 Khi nào dùng cái nào?

| Tình huống | API |
|-----------|-----|
| Ghi cả config nhỏ một lần | \`os.WriteFile\` |
| Ghi dần từng dòng (vd export CSV 1 triệu rows) | \`os.Create\` + \`bufio.Writer\` |
| Append vào log | \`os.OpenFile(O_APPEND\\|O_CREATE\\|O_WRONLY)\` |
| Cần đảm bảo "không corrupt khi crash" | Atomic write (mục 10) |

📝 **Tóm tắt mục 4**

- \`os.WriteFile\` ngắn nhưng không atomic — ghi đè toàn bộ.
- Stream lớn → \`bufio.NewWriter\` + nhớ \`Flush()\`.
- Append là một flag riêng (\`O_APPEND\`) — đừng nhầm với \`Create\`.

---

## 5. Append — ghi vào cuối file

\`\`\`go
f, err := os.OpenFile("history.log",
    os.O_APPEND|os.O_CREATE|os.O_WRONLY,
    0644)
if err != nil { return err }
defer f.Close()

f.WriteString(time.Now().Format(time.RFC3339) + " " + msg + "\\n")
\`\`\`

> 💡 **Trực giác — vì sao \`O_APPEND\` đặc biệt**
>
> Bình thường, ghi file = (1) seek tới vị trí con trỏ, (2) ghi data, (3) tăng con trỏ. Với 2 process cùng ghi file → cả 2 cùng seek về cùng vị trí cuối file, ghi đè data của nhau.
>
> \`O_APPEND\` thay đổi luật: kernel đảm bảo *mỗi lần write*, seek đến cuối file rồi ghi diễn ra **atomic** (như 1 thao tác). 2 process append vào cùng file → data không đè nhau, chỉ là thứ tự không xác định.
>
> Đó là lý do log file của hệ thống (vd \`/var/log/nginx/access.log\`) có thể được ghi đồng thời bởi nhiều worker mà không corrupt.

> ⚠ **Append không atomic giữa các filesystem**
>
> Trên NFS (network filesystem), \`O_APPEND\` không phải lúc nào cũng atomic — vì semantics atomic là syscall local. Với log từ nhiều máy → dùng centralized logging (mục Tier 7).

📝 **Tóm tắt mục 5**

- \`O_APPEND\` = mỗi \`Write\` ghi vào cuối file atomic.
- Phù hợp cho log, history, audit trail.
- Trên local filesystem (ext4, xfs, apfs): an toàn với nhiều process. Network FS: không đảm bảo.

---

## 6. File info — \`Stat\` và \`Lstat\`

### 6.1 \`os.Stat\` trả về \`FileInfo\`

\`\`\`go
info, err := os.Stat("photo.jpg")
if err != nil { return err }

fmt.Println(info.Name())      // "photo.jpg"
fmt.Println(info.Size())      // 2459613 (bytes)
fmt.Println(info.Mode())      // -rw-r--r--
fmt.Println(info.ModTime())   // 2026-05-26 10:34:21
fmt.Println(info.IsDir())     // false
\`\`\`

Interface \`os.FileInfo\`:

\`\`\`go
type FileInfo interface {
    Name() string       // tên (không gồm path)
    Size() int64        // byte (regular file)
    Mode() FileMode     // permission + type
    ModTime() time.Time // lần sửa cuối
    IsDir() bool        // shortcut cho Mode().IsDir()
    Sys() any           // raw stat_t, OS-specific
}
\`\`\`

### 6.2 \`os.Lstat\` — không follow symlink

\`\`\`go
os.Symlink("/etc/hosts", "/tmp/myhosts")

info1, _ := os.Stat("/tmp/myhosts")   // info của /etc/hosts (file thật)
info2, _ := os.Lstat("/tmp/myhosts")  // info của bản thân symlink
info2.Mode()&os.ModeSymlink != 0      // true
\`\`\`

> ❓ **Khi nào dùng \`Lstat\`?**
>
> - Khi viết script cleanup: bạn muốn xoá symlink dangling (target không tồn tại), \`Stat\` sẽ trả \`ErrNotExist\` còn \`Lstat\` thì OK.
> - Khi đếm size thư mục: nếu follow symlink, có thể count trùng (symlink trỏ về cùng file đã đếm) hoặc loop vô tận.

### 6.3 Check file/dir tồn tại

\`\`\`go
if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
    fmt.Println("Không tồn tại")
}
\`\`\`

> ⚠ **Anti-pattern: check-then-act**
>
> \`\`\`go
> if _, err := os.Stat(path); err == nil {
>     f, _ := os.Open(path)  // race: file có thể bị xoá giữa Stat và Open
>     // ...
> }
> \`\`\`
> Đúng hơn: cứ \`Open\` thẳng, check error trả về.

📝 **Tóm tắt mục 6**

- \`os.Stat\` cho biết size / mode / mtime / isDir.
- \`os.Lstat\` dùng khi cần info của bản thân symlink, không phải target.
- Đừng check-then-act — ưu tiên thử thao tác rồi xử lý error.

---

## 7. Permission Unix dạng octal

### 7.1 Đọc mặt nạ 9 bit

Mỗi file/folder Unix có 9 bit permission, chia 3 nhóm × 3 quyền:

\`\`\`
 owner  group  other
 r w x  r w x  r w x
\`\`\`

Mỗi quyền là 1 bit, mỗi nhóm thành 1 digit octal (0–7):

| Permission | Bit | Octal |
|------------|-----|-------|
| \`---\` | \`000\` | 0 |
| \`--x\` | \`001\` | 1 |
| \`-w-\` | \`010\` | 2 |
| \`-wx\` | \`011\` | 3 |
| \`r--\` | \`100\` | 4 |
| \`r-x\` | \`101\` | 5 |
| \`rw-\` | \`110\` | 6 |
| \`rwx\` | \`111\` | 7 |

### 7.2 Walk-through bằng số

**\`0644\`** = \`rw- r-- r--\`

- Owner: read + write
- Group: read
- Other: read

Tính: \`0o644 = 6*64 + 4*8 + 4 = 384 + 32 + 4 = 420\` (decimal). Trong Go, hằng số \`0644\` *phải có prefix \`0\`* để parser hiểu là octal.

**\`0755\`** = \`rwx r-x r-x\`

- Owner: rwx (đủ quyền)
- Group: r-x (đọc + execute, không write)
- Other: r-x

Đây là perm chuẩn cho **thư mục** và **executable**.

**\`0600\`** = \`rw- --- ---\`

- Chỉ owner đọc/ghi, group/other không thấy gì.
- Dùng cho file chứa secret (private key SSH, file \`.env\`).

**\`0666\`** = \`rw- rw- rw-\` — ai cũng đọc/ghi. Hiếm khi nên dùng cho file thật (thường bị umask trừ về \`0644\`).

### 7.3 So sánh: 4 ví dụ cụ thể

| Octal | Symbolic | Dùng cho |
|-------|----------|----------|
| \`0644\` | \`-rw-r--r--\` | File text/code thông thường |
| \`0755\` | \`drwxr-xr-x\` | Thư mục, binary executable |
| \`0600\` | \`-rw-------\` | Secret: SSH key, \`.env\`, \`~/.aws/credentials\` |
| \`0700\` | \`drwx------\` | Thư mục private (vd \`~/.ssh/\`) |

### 7.4 Set permission trong Go

\`\`\`go
// Lúc tạo file:
f, _ := os.OpenFile("secret.txt", os.O_CREATE|os.O_WRONLY, 0600)

// Lúc tạo dir:
os.Mkdir("private", 0700)

// Đổi perm file đã có:
os.Chmod("script.sh", 0755)

// Đổi owner (cần root, hoặc owner hiện tại đổi sang group khác):
os.Chown(path, uid, gid)
\`\`\`

> ⚠ **Pitfall: quên prefix \`0\`**
>
> \`\`\`go
> os.Chmod("file", 644)   // ← SAI: đây là decimal 644 = octal 1204
> os.Chmod("file", 0644)  // ← ĐÚNG
> os.Chmod("file", 0o644) // ← cũng đúng (Go 1.13+, rõ ràng hơn)
> \`\`\`

> ❓ **Umask là gì?**
>
> Mỗi process có **umask** — mask bit *bị trừ* khỏi permission khi tạo file. Mặc định \`022\` → khi bạn \`Create\` với perm \`0666\`, file thật có perm \`0666 & ~022 = 0644\`. Đó là lý do \`os.Create\` cho \`0644\` chứ không phải \`0666\`.

📝 **Tóm tắt mục 7**

- 3 digit octal = 3 nhóm rwx (owner / group / other).
- \`0644\` cho file thường, \`0755\` cho dir/binary, \`0600\` cho secret.
- Trong Go: luôn viết với prefix \`0\` (octal) hoặc \`0o\`. Quên = bug nghiêm trọng.

---

## 8. Thư mục — tạo, đọc, walk

### 8.1 Tạo thư mục

\`\`\`go
os.Mkdir("project", 0755)         // chỉ tạo 1 cấp; fail nếu parent thiếu
os.MkdirAll("a/b/c/d", 0755)      // tạo cả chain, như \`mkdir -p\`
\`\`\`

\`MkdirAll\` không error nếu dir đã tồn tại — đây là tính năng quan trọng cho idempotent setup.

### 8.2 Đọc nội dung dir — \`os.ReadDir\`

\`\`\`go
entries, err := os.ReadDir("/etc")
if err != nil { return err }

for _, e := range entries {
    fmt.Println(e.Name(), e.IsDir(), e.Type())
}
\`\`\`

\`DirEntry\` interface:

\`\`\`go
type DirEntry interface {
    Name() string
    IsDir() bool
    Type() FileMode       // chỉ phần type (regular/dir/symlink/...)
    Info() (FileInfo, error)  // gọi syscall riêng để lấy full info
}
\`\`\`

Khác \`os.ReadDir\` cũ (đã deprecated \`ioutil.ReadDir\`): \`DirEntry\` *lười* — không tự gọi \`stat\` cho mỗi entry. Bạn chỉ \`Info()\` khi thực sự cần size/mtime → nhanh hơn nhiều trên dir có 100k file.

### 8.3 Đệ quy — \`filepath.Walk\` và \`filepath.WalkDir\`

\`\`\`go
err := filepath.WalkDir("project", func(path string, d fs.DirEntry, err error) error {
    if err != nil { return err }
    fmt.Println(path)
    return nil
})
\`\`\`

- Visit DFS pre-order: parent trước children.
- Trả \`filepath.SkipDir\` từ callback → skip vào dir đó.
- Trả error khác \`nil\` → dừng walk.

\`filepath.Walk\` (cũ) gọi \`Info()\` cho mỗi entry (chậm). \`filepath.WalkDir\` (Go 1.16+) dùng \`DirEntry\` → nhanh hơn. **Mặc định dùng WalkDir** từ giờ.

### 8.4 Ví dụ — đếm file \`.go\` trong project

\`\`\`go
var count int
filepath.WalkDir(".", func(p string, d fs.DirEntry, err error) error {
    if err != nil { return err }
    if !d.IsDir() && filepath.Ext(p) == ".go" {
        count++
    }
    return nil
})
\`\`\`

📝 **Tóm tắt mục 8**

- Tạo: \`os.Mkdir\` (1 cấp) hoặc \`os.MkdirAll\` (recursive).
- Đọc 1 cấp: \`os.ReadDir\`.
- Đệ quy: \`filepath.WalkDir\` (chuộng) hoặc \`filepath.Walk\` (cũ).

---

## 9. Path manipulation — \`path/filepath\` vs \`path\`

### 9.1 Hai package, mục đích khác nhau

| Package | Khi nào dùng |
|---------|--------------|
| \`path/filepath\` | Đường dẫn **filesystem trên OS hiện tại** — biết về backslash trên Windows, drive letter \`C:\` |
| \`path\` | Đường dẫn **slash-only** — dành cho URL, embedded FS, archive (tar/zip) |

99% bạn dùng \`path/filepath\`. Trừ khi xử lý URL path hoặc đọc archive zip.

### 9.2 Các API chính của \`filepath\`

\`\`\`go
filepath.Join("a", "b", "c")           // "a/b/c" (linux), "a\\\\b\\\\c" (windows)
filepath.Split("/etc/hosts")           // dir="/etc/", file="hosts"
filepath.Base("/etc/hosts")            // "hosts"
filepath.Dir("/etc/hosts")             // "/etc"
filepath.Ext("photo.jpg")              // ".jpg"
filepath.Abs("./data")                 // tuyệt đối hoá: "/home/user/data"
filepath.Clean("a/./b/../c")           // "a/c"  (normalize)
filepath.IsAbs("/etc")                 // true
filepath.IsAbs("etc")                  // false
filepath.Rel("/a", "/a/b/c")           // "b/c" (relative path)
filepath.ToSlash("a\\\\b\\\\c")            // "a/b/c" (chuyển sang slash chuẩn)
\`\`\`

> ⚠ **Pitfall: dùng \`+\` để nối path**
>
> \`\`\`go
> path := dir + "/" + filename   // sai: trên Windows dùng \`\\\`
> path := filepath.Join(dir, filename)  // đúng
> \`\`\`
>
> \`Join\` còn xử lý các edge case: nếu \`dir\` kết thúc bằng \`/\`, không thêm \`/\` thừa. Nếu \`filename\` rỗng, không append.

### 9.3 \`Clean\` chống path traversal

\`\`\`go
filepath.Clean("/var/www/../../etc/passwd")  // "/etc/passwd"
\`\`\`

Pattern bảo mật khi xử lý filename từ user input (vd HTTP upload):

\`\`\`go
func saveUpload(name string, body []byte) error {
    safe := filepath.Clean(name)
    if strings.Contains(safe, "..") || filepath.IsAbs(safe) {
        return errors.New("invalid filename")
    }
    return os.WriteFile(filepath.Join("uploads", safe), body, 0644)
}
\`\`\`

📝 **Tóm tắt mục 9**

- \`path/filepath\` cho filesystem; \`path\` cho URL/archive — KHÔNG nhầm.
- Luôn dùng \`filepath.Join\`, không nối path bằng \`+\`.
- \`filepath.Clean\` để normalize, chống path traversal.

---

## 10. Atomic file write — pattern không bao giờ corrupt

### 10.1 Vấn đề

\`\`\`go
os.WriteFile("config.json", data, 0644)
\`\`\`

Nếu process crash, máy mất điện, hoặc bị kill \`-9\` đúng *lúc đang ghi*, file \`config.json\` còn lại có thể:

- Rỗng (chưa kịp ghi gì).
- Cụt đầu (mới ghi được 1 KB / 5 KB total).
- Mix giữa data cũ và data mới — corrupt.

Khi process khởi động lại đọc config → fail parse JSON → app không lên được.

### 10.2 Pattern atomic — write tmp + rename

\`\`\`go
func atomicWrite(path string, data []byte, perm os.FileMode) error {
    dir := filepath.Dir(path)
    tmp, err := os.CreateTemp(dir, ".tmp-*")
    if err != nil { return err }
    tmpName := tmp.Name()
    defer os.Remove(tmpName)  // cleanup nếu rename fail

    if _, err := tmp.Write(data); err != nil {
        tmp.Close()
        return err
    }
    if err := tmp.Sync(); err != nil {   // fsync — flush page cache xuống disk
        tmp.Close()
        return err
    }
    if err := tmp.Close(); err != nil { return err }
    if err := os.Chmod(tmpName, perm); err != nil { return err }
    return os.Rename(tmpName, path)
}
\`\`\`

### 10.3 Vì sao atomic?

> 💡 **Trực giác**
>
> Trong cùng filesystem, \`rename\` là 1 syscall đổi pointer trong dir entry — kernel đảm bảo: hoặc người đọc thấy file cũ, hoặc thấy file mới, *không có trạng thái giữa chừng*. Đây là tính chất \`posix rename\` của filesystem hiện đại (ext4, xfs, apfs, ntfs).
>
> Tmp file là "chỗ build sẵn" — nếu crash giữa lúc đang ghi tmp, không ai đụng tới \`config.json\` vì rename chưa xảy ra. Lần sau khởi động, app vẫn đọc được \`config.json\` cũ.

### 10.4 Hai chú ý quan trọng

1. **Tmp phải cùng thư mục với file đích**. Nếu khác filesystem (vd tmp ở \`/tmp\`, target ở \`/var/data\` mount riêng), \`Rename\` sẽ rơi vào fallback "copy + delete" — KHÔNG còn atomic.
2. **Phải \`Sync()\` trước khi \`Rename\`**. Bằng không, data còn ở page cache, crash trước khi flush → file rỗng dù rename đã xong.

### 10.5 Ví dụ thực tế

- **Lưu game save** — tránh save file bị corrupt khi player tắt máy đột ngột.
- **Cấu hình app** (\`config.json\`, \`.env\`) — reload-safe.
- **Database snapshot** (Redis RDB, SQLite checkpoint).
- **Log rotation** — \`logrotate\` tạo file mới, rename file cũ thành \`.1\`, không mất data đang được ghi.

📝 **Tóm tắt mục 10**

- Write thẳng = có thể corrupt khi crash.
- Pattern: tạo tmp cùng dir → write → fsync → rename.
- Rename trong cùng filesystem = atomic POSIX.

---

## 11. Temp file/dir — workspace tạm

\`\`\`go
// File tạm:
f, err := os.CreateTemp("", "myapp-*.log")
// "" = dir mặc định ($TMPDIR hoặc /tmp).
// Pattern "myapp-*.log" — \`*\` được thay bằng random suffix.
defer os.Remove(f.Name())

// Dir tạm:
dir, err := os.MkdirTemp("", "extract-*")
defer os.RemoveAll(dir)
\`\`\`

> ❓ **Khác \`os.OpenFile(O_CREATE|O_EXCL)\` ở đâu?**
>
> \`CreateTemp\` tự sinh suffix random, đảm bảo tên không trùng. Bạn không phải tự retry khi trùng.

Ví dụ thực tế:

\`\`\`go
// Tải file remote, extract vào dir tạm, xử lý, xoá khi xong
dir, _ := os.MkdirTemp("", "download-*")
defer os.RemoveAll(dir)

if err := download(url, filepath.Join(dir, "archive.zip")); err != nil { return err }
if err := extract(filepath.Join(dir, "archive.zip"), dir); err != nil { return err }
// ... xử lý files trong dir
// Kết thúc → defer tự xoá toàn bộ
\`\`\`

📝 **Tóm tắt mục 11**

- \`os.CreateTemp("", "pattern-*")\` → file tạm unique.
- \`os.MkdirTemp("", "pattern-*")\` → dir tạm.
- \`defer os.RemoveAll\` để cleanup.

---

## 12. Symlink

\`\`\`go
os.Symlink("/etc/hosts", "/tmp/myhosts")  // tạo symlink
target, err := os.Readlink("/tmp/myhosts")  // đọc target → "/etc/hosts"
\`\`\`

Khác hardlink (\`os.Link\`): symlink là 1 file riêng chứa đường dẫn, có thể trỏ tới file ở filesystem khác. Hardlink share cùng inode.

Use case thực tế:

- \`current → release-2026-05-26/\` — pattern deploy zero-downtime: build release mới ở dir riêng, rồi \`mv\` symlink \`current\` sang dir mới (atomic).
- Trong \`node_modules\` của npm/pnpm: dùng symlink chia sẻ package giữa các project.

📝 **Tóm tắt mục 12**

- \`os.Symlink(target, linkPath)\` tạo soft link.
- \`os.Readlink\` đọc target.
- \`os.Stat\` follow symlink, \`os.Lstat\` không.

---

## 13. OS info

\`\`\`go
fmt.Println(runtime.GOOS)        // "linux", "darwin", "windows"
fmt.Println(runtime.GOARCH)      // "amd64", "arm64"
host, _ := os.Hostname()
fmt.Println(host)                // "macbook-pro.local"

path := os.Getenv("PATH")        // đọc env var
os.Setenv("MY_VAR", "value")     // set env (chỉ trong process này)

fmt.Println(os.Args)             // ["./myapp", "arg1", "arg2"]
fmt.Println(os.Args[0])          // tên binary
\`\`\`

> ❓ **\`os.Args\` vs \`flag.Parse()\`?**
>
> \`os.Args\` là raw. Để parse \`--name value\` đẹp thì dùng package \`flag\` (đã cover ở L11) hoặc thư viện như \`cobra\` (Tier 4).

Ví dụ thực tế — pick code path theo OS:

\`\`\`go
func openConfig() string {
    switch runtime.GOOS {
    case "linux", "darwin":
        return os.Getenv("HOME") + "/.config/myapp/config.json"
    case "windows":
        return os.Getenv("APPDATA") + "\\\\myapp\\\\config.json"
    }
    return "config.json"
}
\`\`\`

📝 **Tóm tắt mục 13**

- \`runtime.GOOS\` để chọn code path theo OS.
- \`os.Getenv\` đọc env var, \`os.Setenv\` chỉ ảnh hưởng process hiện tại.
- \`os.Args\` là raw args; parse flag thì dùng package \`flag\`.

---

## 14. Stdin / Stdout / Stderr

\`\`\`go
// Cả 3 đều là *os.File:
var (
    Stdin  = NewFile(0, "/dev/stdin")
    Stdout = NewFile(1, "/dev/stdout")
    Stderr = NewFile(2, "/dev/stderr")
)
\`\`\`

→ Bạn có thể \`bufio.NewScanner(os.Stdin)\`, hay \`io.Copy(os.Stdout, src)\`.

Ví dụ — đọc dòng từ user, echo lại:

\`\`\`go
scanner := bufio.NewScanner(os.Stdin)
for scanner.Scan() {
    line := scanner.Text()
    fmt.Fprintln(os.Stdout, "Echo:", line)
}
\`\`\`

Ghi error ra stderr (để pipe stdout sang file vẫn thấy error trên terminal):

\`\`\`go
fmt.Fprintln(os.Stderr, "[ERROR]", err)
\`\`\`

> ❓ **Tại sao tách stdout / stderr?**
>
> Trong shell, \`myapp > out.log\` chỉ redirect stdout. Stderr vẫn hiện trên terminal → user thấy lỗi ngay. \`myapp > out.log 2>&1\` mới redirect cả 2.

📝 **Tóm tắt mục 14**

- \`os.Stdin/Stdout/Stderr\` là \`*os.File\`.
- Dùng \`bufio.Scanner(os.Stdin)\` để đọc dòng từ user.
- Lỗi → \`os.Stderr\`, output thường → \`os.Stdout\`.

---

## 15. Signal handling — sơ lược

\`\`\`go
import "os/signal"
import "syscall"

ch := make(chan os.Signal, 1)
signal.Notify(ch, os.Interrupt, syscall.SIGTERM)

go func() {
    sig := <-ch
    fmt.Println("Received:", sig)
    // cleanup ...
    os.Exit(0)
}()
\`\`\`

\`os.Interrupt\` = SIGINT (Ctrl+C). \`SIGTERM\` = \`kill <pid>\` (Kubernetes gửi khi shutdown pod).

Lesson này chỉ giới thiệu — full pattern **graceful shutdown** (dừng HTTP server, drain connection, flush log) sẽ ở Tier 4 / Tier 7.

📝 **Tóm tắt mục 15**

- \`signal.Notify(ch, sig...)\` đăng ký nhận signal qua channel.
- SIGINT (Ctrl+C), SIGTERM (kill) — 2 signal cần handle để shutdown sạch.
- Sâu hơn ở Tier 4 (HTTP server) và Tier 7 (DevOps).

---

## 16. Common pitfall — đầy đủ

| Lỗi | Triệu chứng | Cách tránh |
|-----|-------------|-----------|
| Quên \`Close()\` | \`too many open files\` sau khi mở > 1024 file | \`defer f.Close()\` ngay sau check err |
| \`Create\` thay vì \`O_APPEND\` | Mỗi lần ghi log đè data cũ | Dùng \`os.OpenFile(O_APPEND\\|O_CREATE\\|O_WRONLY, 0644)\` |
| \`os.ReadFile\` file lớn | OOM | Stream với \`bufio.Scanner\` |
| Quên \`bufio.Writer.Flush()\` | File ra ít data hơn dự kiến | \`defer w.Flush()\` hoặc gọi tay trước Close |
| Path nối bằng \`+\` | Bug trên Windows | \`filepath.Join\` |
| Quên prefix \`0\` cho perm | \`Chmod(file, 644)\` set perm \`1204\` (rác) | \`0644\` hoặc \`0o644\` |
| Check-then-act race | \`Stat\` rồi \`Open\`, file biến mất giữa | Cứ \`Open\` thẳng, check error |
| 2 process ghi cùng file non-atomic | Corrupt config | Atomic write pattern (mục 10) |
| Tmp ở filesystem khác target | \`Rename\` không atomic, fallback copy+delete | \`os.CreateTemp(filepath.Dir(target), ...)\` |
| \`os.ReadDir\` rồi loop gọi \`Stat\` | Chậm — N syscalls | Dùng \`d.Info()\` trên \`DirEntry\` chỉ khi cần |

---

## Bài tập

### BT1 — Đếm số host entry trong \`/etc/hosts\`

Mỗi dòng có format \`IP    hostname1 hostname2 ...\`. Lines bắt đầu bằng \`#\` là comment. Đếm tổng số *hostname* (mỗi token sau IP), bỏ qua comment và dòng trống.

### BT2 — Walk dir đếm tổng size file \`.go\`

Cho path root, đệ quy duyệt, tính tổng byte của tất cả file đuôi \`.go\`. Skip thư mục \`vendor/\` và \`.git/\`.

### BT3 — Atomic write JSON config

Viết hàm \`SaveConfig(path string, cfg any) error\`. Marshal \`cfg\` thành JSON pretty (2-space indent), ghi atomic vào \`path\` (write tmp + rename).

### BT4 — Tail file 10 dòng cuối

Cho file size N MB, in 10 dòng cuối. Yêu cầu: không đọc cả file vào memory (file có thể 50 GB). Hint: dùng \`f.Seek\` từ cuối ngược lại theo chunk.

### BT5 — Copy file với progress

Copy A → B, in progress mỗi 5% (vd \`[####     ] 50%\`). Dùng \`io.Copy\` qua một custom Reader đếm byte đã đọc.

### BT6 — Detect file changed bằng poll

Mỗi 2s, \`Stat\` file \`target\`. Nếu \`ModTime\` đổi so với lần trước → in \`"FILE CHANGED at <time>"\`. Chạy mãi cho tới Ctrl+C.

---

## Lời giải chi tiết

### Lời giải BT1 — Đếm host entry

**Cách tiếp cận**: stream file qua \`bufio.Scanner\`, mỗi dòng:
1. \`strings.TrimSpace\` → bỏ whitespace 2 đầu.
2. Skip nếu rỗng hoặc bắt đầu bằng \`#\`.
3. Cắt comment trailing (sau \`#\`) trong dòng.
4. Split theo whitespace → token đầu là IP, các token sau là hostname → đếm.

\`\`\`go
func countHosts(path string) (int, error) {
    f, err := os.Open(path)
    if err != nil { return 0, err }
    defer f.Close()

    count := 0
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        line := strings.TrimSpace(scanner.Text())
        if line == "" || strings.HasPrefix(line, "#") {
            continue
        }
        // Cắt comment trailing
        if idx := strings.Index(line, "#"); idx >= 0 {
            line = strings.TrimSpace(line[:idx])
        }
        fields := strings.Fields(line)
        if len(fields) >= 2 {
            count += len(fields) - 1   // bỏ field đầu (IP)
        }
    }
    return count, scanner.Err()
}
\`\`\`

**Độ phức tạp**: $O(N)$ với N = số byte file. Memory: $O(1)$ (Scanner buffer cố định).

**Edge case**:
- Dòng chỉ có IP, không có hostname → \`len(fields) == 1\` → không count.
- Dòng có comment giữa: \`127.0.0.1 localhost # main loopback\` → cắt từ \`#\` trở đi đúng.

### Lời giải BT2 — Tổng size file \`.go\`

\`\`\`go
func sumGoSize(root string) (int64, error) {
    var total int64
    err := filepath.WalkDir(root, func(p string, d fs.DirEntry, err error) error {
        if err != nil { return err }
        if d.IsDir() {
            name := d.Name()
            if name == "vendor" || name == ".git" {
                return filepath.SkipDir
            }
            return nil
        }
        if filepath.Ext(p) != ".go" { return nil }
        info, err := d.Info()
        if err != nil { return err }
        total += info.Size()
        return nil
    })
    return total, err
}
\`\`\`

**Bí kíp**: trả \`filepath.SkipDir\` khi gặp \`vendor\` / \`.git\` → tiết kiệm hàng nghìn syscall trên project lớn.

**Độ phức tạp**: $O(N)$ với N = tổng entry trong cây thư mục. Cho dự án 10k file Go, chạy < 1s.

### Lời giải BT3 — Atomic write JSON

\`\`\`go
func SaveConfig(path string, cfg any) error {
    data, err := json.MarshalIndent(cfg, "", "  ")
    if err != nil { return err }

    dir := filepath.Dir(path)
    tmp, err := os.CreateTemp(dir, ".cfg-*.tmp")
    if err != nil { return err }
    tmpName := tmp.Name()
    success := false
    defer func() {
        if !success { os.Remove(tmpName) }
    }()

    if _, err := tmp.Write(data); err != nil {
        tmp.Close()
        return err
    }
    if err := tmp.Sync(); err != nil {
        tmp.Close()
        return err
    }
    if err := tmp.Close(); err != nil { return err }
    if err := os.Chmod(tmpName, 0644); err != nil { return err }
    if err := os.Rename(tmpName, path); err != nil { return err }
    success = true
    return nil
}
\`\`\`

**Tại sao có cờ \`success\`?** Để defer chỉ xoá tmp khi *fail*. Nếu Rename thành công, tmp đã được "đổi tên" thành path đích — không có gì để xoá nữa, mà \`Remove(tmpName)\` lúc này sẽ no-op (\`ErrNotExist\`).

**Test crash**: chạy program, \`kill -9\` đúng lúc đang write tmp → file đích vẫn còn nguyên (data cũ hoặc chưa tồn tại). Không corrupt.

### Lời giải BT4 — Tail 10 dòng cuối

**Ý tưởng**: seek từ cuối file ngược lên theo chunk 4 KiB. Mỗi chunk đọc về, đếm \`\\n\` từ phải sang trái. Khi đã đủ 10 newline → cắt từ vị trí đó in ra.

\`\`\`go
func tail(path string, n int) ([]string, error) {
    f, err := os.Open(path)
    if err != nil { return nil, err }
    defer f.Close()

    info, err := f.Stat()
    if err != nil { return nil, err }
    size := info.Size()

    const chunkSize = 4096
    var buf []byte
    offset := size
    newlines := 0

    for offset > 0 && newlines <= n {
        readSize := int64(chunkSize)
        if offset < readSize { readSize = offset }
        offset -= readSize

        chunk := make([]byte, readSize)
        if _, err := f.ReadAt(chunk, offset); err != nil {
            return nil, err
        }
        buf = append(chunk, buf...)   // prepend
        newlines = bytes.Count(buf, []byte{'\\n'})
    }

    lines := strings.Split(strings.TrimRight(string(buf), "\\n"), "\\n")
    if len(lines) > n {
        lines = lines[len(lines)-n:]
    }
    return lines, nil
}
\`\`\`

**Độ phức tạp**: $O(K)$ với K = tổng byte 10 dòng cuối (chứ không phải N = size file). File 50 GB, 10 dòng cuối 200 KB → đọc tối đa 200 KB.

**Edge case**:
- File có < 10 dòng → trả tất cả.
- File kết thúc bằng \`\\n\` (chuẩn POSIX) → \`TrimRight\` cắt trailing newline trước khi split.

### Lời giải BT5 — Copy với progress

Pattern: wrap \`Reader\` thành "counting reader" tự cập nhật progress mỗi lần \`Read\`.

\`\`\`go
type progressReader struct {
    r        io.Reader
    total    int64
    read     int64
    lastPct  int   // % đã in lần trước
}

func (p *progressReader) Read(buf []byte) (int, error) {
    n, err := p.r.Read(buf)
    p.read += int64(n)
    pct := int(p.read * 100 / p.total)
    if pct/5 > p.lastPct/5 {   // mỗi 5%
        bar := strings.Repeat("#", pct/5) + strings.Repeat(" ", 20-pct/5)
        fmt.Printf("\\r[%s] %3d%%", bar, pct)
        p.lastPct = pct
    }
    return n, err
}

func copyWithProgress(src, dst string) error {
    in, err := os.Open(src)
    if err != nil { return err }
    defer in.Close()

    info, _ := in.Stat()
    out, err := os.Create(dst)
    if err != nil { return err }
    defer out.Close()

    pr := &progressReader{r: in, total: info.Size()}
    if _, err := io.Copy(out, pr); err != nil { return err }
    fmt.Println()
    return nil
}
\`\`\`

**Key insight**: \`io.Copy\` không quan tâm \`Reader\` của bạn là gì — nó cứ gọi \`Read\` cho tới EOF. Bạn lồng counting logic vào đó "miễn phí".

### Lời giải BT6 — Detect file changed

\`\`\`go
func watch(path string) error {
    info, err := os.Stat(path)
    if err != nil { return err }
    lastMod := info.ModTime()

    ticker := time.NewTicker(2 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        info, err := os.Stat(path)
        if err != nil {
            fmt.Fprintln(os.Stderr, "stat err:", err)
            continue
        }
        if info.ModTime() != lastMod {
            fmt.Println("FILE CHANGED at", time.Now().Format(time.RFC3339))
            lastMod = info.ModTime()
        }
    }
    return nil
}
\`\`\`

**Hạn chế của polling**: trễ tối đa 2s, ăn CPU vô ích nếu file ít thay đổi. Production dùng \`fsnotify\` (\`inotify\` trên Linux, \`kqueue\` trên macOS) — kernel chủ động báo khi file đổi, không cần poll.

**Vì sao vẫn học polling?** Đơn giản, không phụ thuộc lib ngoài, và đôi khi file ở NFS/SMB không hỗ trợ inotify → polling là phương án duy nhất.

---

## Ứng dụng thực tế

1. **Log rotation** — service ghi vào \`app.log\`, định kỳ \`Rename app.log → app.log.1\` + tạo file mới. Code mở file với \`O_APPEND\` thì kernel tự follow rename qua FD đang giữ → không mất log.
2. **Atomic config reload** — server đang chạy, ops sửa config, gọi atomic write. Server poll \`ModTime\`, thấy đổi → reload (parse lại config trong memory). Nhờ atomic, server không bao giờ đọc nửa file.
3. **Save game state** — game tự save mỗi 30s. Atomic write tránh save corrupt khi player tắt máy.
4. **Backup script** — dùng \`filepath.WalkDir\` quét cây thư mục, copy file thay đổi (compare \`ModTime\` với lần backup trước).
5. **Deploy script** — build artifact vào \`releases/2026-05-26-abc/\`, rename symlink \`current → releases/2026-05-26-abc/\`. Atomic switch, có thể rollback bằng đổi symlink về release cũ.
6. **Lock file** — \`/var/run/myapp.pid\` mở với \`O_CREATE|O_EXCL\`, ghi PID, đóng. Nếu instance khác chạy → fail vì file đã tồn tại.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — code đầy đủ các pattern: open / OpenFile / append / walk / atomic write / tail / stdin demo.
- [visualization.html](./visualization.html) — 3 module:
  - Module 1: Permission grid 3×3 — click toggle rwx, hiển thị octal + lệnh \`chmod\`.
  - Module 2: File tree walker animation — DFS qua thư mục, highlight node đang visit.
  - Module 3: Atomic write — animate 3 bước (write tmp → fsync → rename), demo song song với non-atomic (crash giữa write → corrupt).

---

## Bài tiếp theo

→ [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/README.md): học \`encoding/json\`, marshal/unmarshal, struct tag, streaming JSON, custom \`Marshaler\`. Sẽ kết hợp ngay với atomic write của lesson này để build config loader hoàn chỉnh.

## Tham khảo

- Go stdlib: [\`os\`](https://pkg.go.dev/os), [\`io\`](https://pkg.go.dev/io), [\`path/filepath\`](https://pkg.go.dev/path/filepath), [\`io/fs\`](https://pkg.go.dev/io/fs).
- Linux man pages: \`open(2)\`, \`rename(2)\`, \`fsync(2)\` — đọc 1 lần cho hiểu syscall thật làm gì.
- "The Linux Programming Interface" — Michael Kerrisk, chương 4-5-13 (file I/O + buffering).
`;
