// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-21-io-streaming/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 21 — IO Streaming với \`io.Reader\` và \`io.Writer\`

> **Tier 2 — Intermediate · Bài 21**
> Hai interface quan trọng nhất của Go stdlib. Hiểu được \`io.Reader\`/\`Writer\` là chìa khoá đọc hiểu phần lớn thư viện chuẩn (net/http, encoding/json, os, compress/gzip, crypto/sha256, ...).

## Mục tiêu học tập

Sau bài này, bạn:

1. Hiểu **vì sao streaming** — vì sao không nên load 10 GB vào RAM rồi mới xử lý.
2. Đọc được signature của \`io.Reader\` và \`io.Writer\`, biết cách hành xử với \`io.EOF\`.
3. Dùng được \`bufio.Reader\`, \`bufio.Writer\`, \`bufio.Scanner\` cho I/O hiệu quả và đọc theo dòng/word.
4. Dùng \`io.Copy\`, \`io.TeeReader\`, \`io.MultiReader\`, \`io.MultiWriter\`, \`io.LimitReader\`, \`io.Pipe\` để ghép pipeline xử lý dữ liệu.
5. Tự viết được Reader/Writer wrapper (đếm byte, rate-limit, hashing, ...).
6. Biết các pitfall: quên \`Flush()\`, quên \`Close()\`, dùng \`io.ReadAll\` trên stream lớn.

## Kiến thức tiền đề

- [Lesson 18 — Interfaces](../lesson-18-interfaces/) — \`io.Reader\`/\`Writer\` là interface, mọi thứ ở bài này dựa trên duck typing.
- [Lesson 19 — Errors](../lesson-19-errors/) — \`io.EOF\` là sentinel error; chu kỳ check \`err != nil\` cực kỳ quan trọng.
- [Lesson 12 — Arrays & Slices](../lesson-12-arrays-slices/) — buffer là \`[]byte\`.
- [Lesson 16 — Pointers](../lesson-16-pointers/) — \`Read(p []byte)\` mutate slice qua underlying array.

---

## 1. Vì sao streaming — vấn đề "load hết vào RAM"

### 💡 Trực giác

Hình dung bạn cần đọc một file log 10 GB để đếm số dòng chứa từ \`ERROR\`. Có 2 cách:

| Cách | Bộ nhớ | Khả thi? |
|---|---|---|
| Đọc toàn bộ file vào 1 chuỗi \`[]byte\` rồi \`strings.Split\` | ~10 GB RAM | Máy 8 GB RAM → crash |
| Đọc từng dòng (~80 byte), kiểm tra, vứt đi, lấy dòng tiếp | ~vài KB RAM | Đọc được file lớn vô hạn |

**Streaming** là cách 2: dữ liệu chảy qua chương trình như nước qua ống, mỗi lúc chỉ giữ một mẩu nhỏ trong tay.

### Ví dụ thực tế

- **Upload file 2 GB** từ HTTP request: nếu load hết vào RAM rồi mới ghi xuống disk → 1000 request đồng thời = 2000 GB RAM. Stream chunk by chunk → vài MB RAM mỗi request.
- **Parse log realtime** từ \`journalctl -f\` (stream vô hạn) — không bao giờ "hết" để load.
- **Gzip pipeline**: \`tar | gzip | ssh remote 'cat > backup.tar.gz'\` — dữ liệu chảy qua các stage, không bao giờ tồn tại đầy đủ ở một nơi.
- **HTTP response 4 GB video**: client stream xuống vừa hiển thị, không chờ download hết.

### ❓ Câu hỏi tự nhiên

> "Sao không cứ mua RAM nhiều?"

Vì:
1. Disk lớn rẻ hơn RAM rất nhiều (RAM 64 GB đắt gấp 100 lần SSD 1 TB).
2. Có dữ liệu **vô hạn về bản chất** (socket TCP, stdin, \`journalctl -f\`) — không có "đầy đủ" để load.
3. Latency: streaming bắt đầu xử lý ngay từ byte đầu, không cần chờ byte cuối.

> "Vậy tốc độ có chậm hơn không?"

Không, nếu làm đúng. Tốc độ I/O thật bị giới hạn bởi disk/network, không phải bởi cách lập trình. \`bufio\` đảm bảo mỗi syscall đọc một khối lớn (4 KB / 64 KB), giảm overhead syscall.

### ⚠ Lỗi thường gặp

\`\`\`go
// ❌ TỆ: đọc cả file 10 GB vào RAM
data, _ := os.ReadFile("huge.log")
for _, line := range strings.Split(string(data), "\\n") {
    if strings.Contains(line, "ERROR") { count++ }
}
// → OOM khi file lớn

// ✅ TỐT: streaming
f, _ := os.Open("huge.log")
defer f.Close()
sc := bufio.NewScanner(f)
for sc.Scan() {
    if strings.Contains(sc.Text(), "ERROR") { count++ }
}
\`\`\`

### 📝 Tóm tắt mục 1

- Streaming = đọc/ghi từng chunk nhỏ, không load hết.
- Áp dụng khi data lớn (>vài chục MB), vô hạn, hoặc cần latency thấp.
- Tốc độ không chậm hơn nếu dùng buffer đúng cách.

---

## 2. \`io.Reader\` — interface chỉ có 1 method

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}
\`\`\`

### 💡 Trực giác

\`Read(p)\` nghĩa là: "Tôi đưa cho bạn cái thùng \`p\` rỗng (\`[]byte\`), bạn đổ dữ liệu vào, rồi nói cho tôi biết đã đổ được \`n\` byte." Khi không còn gì để đổ nữa, trả \`io.EOF\`.

\`\`\`
              ┌──────────────────┐
caller cấp p  │  p = [_,_,_,_,_] │
              └──────────────────┘
                       ↓ Read(p)
              ┌──────────────────┐
reader fill   │  p = [H,e,l,l,o] │  n=5, err=nil
              └──────────────────┘
                       ↓ Read(p) lần kế
              ┌──────────────────┐
reader fill   │  p = [!,_,_,_,_] │  n=1, err=io.EOF
              └──────────────────┘
\`\`\`

### Walk-through bằng số

Giả sử source có chuỗi \`"Hello!"\` (6 byte), buffer \`p\` có size 5.

| Lượt | Trước | \`Read(p)\` trả | \`p\` sau | Hành động |
|---|---|---|---|---|
| 1 | nguồn còn \`"Hello!"\` | \`n=5, err=nil\` | \`['H','e','l','l','o']\` | Process \`p[:5]\` |
| 2 | nguồn còn \`"!"\` | \`n=1, err=nil\` hoặc \`n=1, err=io.EOF\` | \`['!','e','l','l','o']\` | Process \`p[:1]\` (CHỈ 1 byte đầu, không phải toàn bộ p!) |
| 3 | nguồn rỗng | \`n=0, err=io.EOF\` | không thay đổi | Dừng vòng lặp |

### ⚠ Lỗi cực kỳ phổ biến

\`\`\`go
// ❌ SAI: dùng cả p, không nhìn n
n, err := r.Read(p)
process(p)  // p[n:] có thể là rác từ lần trước!

// ✅ ĐÚNG: chỉ dùng p[:n]
n, err := r.Read(p)
if n > 0 {
    process(p[:n])
}
if err == io.EOF { break }
if err != nil   { return err }
\`\`\`

### ❓ Câu hỏi tự nhiên

> "Có thể trả \`n > 0\` VÀ \`err != nil\` cùng lúc không?"

**Có!** Đây là điểm gây bug nhất. Ví dụ:

\`\`\`go
// File còn 3 byte cuối + có lỗi disk
n, err := r.Read(p)   // n=3, err=someError
// Phải xử lý 3 byte này TRƯỚC khi return lỗi
\`\`\`

Quy tắc: **luôn xử lý \`p[:n]\` trước, rồi mới kiểm tra \`err\`**.

> "Vì sao \`Read\` không tự cấp slice trả về cho mình?"

Vì caller cần kiểm soát memory:
- Tái sử dụng cùng 1 buffer cho hàng triệu vòng → 0 allocation.
- Caller quyết định size buffer (4 KB? 64 KB? 1 MB?).

Nếu \`Read\` tự tạo slice trả về, mỗi lần đọc sẽ allocate → GC pressure khủng khiếp.

> "n có thể bằng 0 nhưng err = nil không?"

Theo doc: "implementations of Read are discouraged from returning a zero byte count with a nil error". Tức là cố gắng tránh, nhưng caller phải vẫn handle được.

### 🔁 Dừng lại tự kiểm tra

Code dưới có bug gì?

\`\`\`go
buf := make([]byte, 4)
n, err := r.Read(buf)
if err != nil { return err }
fmt.Println(string(buf))
\`\`\`

<details><summary>Đáp án</summary>3 bug: (1) check \`err\` trước khi process \`p[:n]\` → mất data khi \`n>0 && EOF\`. (2) \`string(buf)\` thay vì \`string(buf[:n])\` → in rác. (3) chỉ gọi \`Read\` 1 lần, không lặp đến hết stream.</details>

### 📝 Tóm tắt mục 2

- \`Read(p) (n, err)\`: đổ data vào \`p\`, trả số byte đọc.
- Luôn xử lý \`p[:n]\` trước khi check \`err\`.
- \`n>0 && err=io.EOF\` là hợp lệ.
- Caller cấp buffer → tái sử dụng → 0 alloc.

---

## 3. \`io.Writer\` — đối ngẫu của Reader

\`\`\`go
type Writer interface {
    Write(p []byte) (n int, err error)
}
\`\`\`

### 💡 Trực giác

\`Write(p)\` nghĩa là: "Tôi đưa bạn \`p\` byte, hãy ghi đi. Trả lời tôi đã ghi được \`n\` byte."

Khác với Reader: **Writer phải ghi hết** \`len(p)\` byte hoặc trả lỗi. Nếu \`n < len(p)\` thì luôn kèm \`err != nil\`.

### Walk-through bằng số

\`\`\`go
w := os.Stdout
n, err := w.Write([]byte("Hello"))
// n=5, err=nil  → đã ghi đủ 5 byte
\`\`\`

Với network writer khi bị partial write:

\`\`\`go
n, err := tcpConn.Write([]byte("ABCDEFGH"))
// có thể: n=3, err=someNetworkError (chỉ ghi A,B,C rồi đứt)
\`\`\`

### Ví dụ implementer

\`\`\`go
type stdoutWriter struct{}
func (stdoutWriter) Write(p []byte) (int, error) {
    return os.Stdout.Write(p)
}

type discardWriter struct{}
func (discardWriter) Write(p []byte) (int, error) {
    return len(p), nil  // giả vờ ghi, vứt đi (như /dev/null)
}
// stdlib có sẵn: io.Discard

type loggingWriter struct{ w io.Writer }
func (lw loggingWriter) Write(p []byte) (int, error) {
    fmt.Printf("[LOG] writing %d bytes\\n", len(p))
    return lw.w.Write(p)
}
\`\`\`

### ⚠ Lỗi thường gặp

\`\`\`go
// ❌ Quên check n nếu writer không đảm bảo full write
n, err := w.Write(data)
if err == nil && n < len(data) {
    // missed partial write!
}

// ✅ Dùng helper io.WriteString hoặc lặp
written := 0
for written < len(data) {
    n, err := w.Write(data[written:])
    if err != nil { return err }
    written += n
}

// Hoặc tốt hơn: dùng io.Copy / io.WriteString — đã handle sẵn.
\`\`\`

### 📝 Tóm tắt mục 3

- \`Write(p) (n, err)\`: ghi data đi.
- Writer phải ghi hết hoặc trả lỗi.
- Implementer custom Writer → wrap được mọi sink (file, network, /dev/null, logging tee).

---

## 4. \`io.Closer\` và composite interface

\`\`\`go
type Closer interface {
    Close() error
}

type ReadCloser    interface { Reader; Closer }
type WriteCloser   interface { Writer; Closer }
type ReadWriteCloser interface { Reader; Writer; Closer }
\`\`\`

### 💡 Trực giác

Mọi resource gắn với hệ thống (file, socket, gzip stream) cần \`Close()\` để release. Composite interface = "Reader nhưng phải đóng được" — phù hợp khi nhận về \`*os.File\`, \`*http.Response.Body\`, \`*gzip.Reader\`.

### Ví dụ thực tế

\`\`\`go
resp, err := http.Get("https://example.com")
if err != nil { return err }
defer resp.Body.Close()  // resp.Body là io.ReadCloser

io.Copy(os.Stdout, resp.Body)
\`\`\`

### ⚠ Lỗi thường gặp

\`\`\`go
// ❌ Quên close → leak file descriptor
f, _ := os.Open("a.txt")
io.Copy(os.Stdout, f)
// f không bao giờ được đóng

// ✅ Luôn defer Close ngay sau khi mở
f, err := os.Open("a.txt")
if err != nil { return err }
defer f.Close()
\`\`\`

> Trên Linux mỗi process có giới hạn \`ulimit -n\` (mặc định ~1024) file descriptor. Quên close 1024 lần → mọi open sau đó fail.

### 📝 Tóm tắt mục 4

- \`Close() error\` release resource.
- Composite interface để nhận đối tượng cần đóng (file, HTTP body).
- Luôn \`defer Close()\` ngay sau khi mở.

---

## 5. \`io.EOF\` — sentinel đặc biệt

\`\`\`go
var EOF = errors.New("EOF")
\`\`\`

### 💡 Trực giác

\`io.EOF\` không phải lỗi — nó là **tín hiệu kết thúc bình thường** của stream, giống như cuối câu có dấu chấm. Bug rất hay gặp là log \`io.EOF\` như lỗi.

### Quy tắc xử lý

\`\`\`go
for {
    n, err := r.Read(buf)
    if n > 0 {
        process(buf[:n])
    }
    if err == io.EOF { break }        // KẾT THÚC BÌNH THƯỜNG
    if err != nil    { return err }   // LỖI THẬT
}
\`\`\`

### Walk-through số cụ thể

Stream \`"AB"\`, buf size 4:

| Read | n | err | Hành động |
|---|---|---|---|
| 1 | 2 | nil hoặc io.EOF | process "AB"; nếu EOF → break |
| 2 (nếu lần 1 không EOF) | 0 | io.EOF | break |

Cả 2 đều đúng — implementer chọn cách nào cũng được. Caller phải handle cả 2.

### ⚠ Lỗi thường gặp

\`\`\`go
// ❌ So sánh sai cách
if err.Error() == "EOF" { ... }   // fragile, không idiomatic
if errors.Is(err, io.EOF) { ... } // ✅ ĐÚNG (Go 1.13+, an toàn nếu err bị wrap)
if err == io.EOF { ... }           // ✅ Cũng đúng, đơn giản hơn nhưng không bắt được wrapped
\`\`\`

### ❓ Câu hỏi tự nhiên

> "Có error gì khác giống EOF nhưng không phải EOF không?"

Có:
- \`io.ErrUnexpectedEOF\` — đọc giữa chừng record mà stream đứt. Vd đọc int 4 byte mà chỉ còn 2 byte.
- \`io.ErrClosedPipe\` — đọc từ pipe đã bị đóng.

### 📝 Tóm tắt mục 5

- \`io.EOF\` = stream hết bình thường, không phải lỗi.
- Pattern: process \`n\` trước, kiểm \`EOF\` để break, kiểm err khác để return.
- Dùng \`errors.Is(err, io.EOF)\` cho an toàn.

---

## 6. \`bufio\` — wrapper buffer

### 💡 Trực giác

Mỗi \`Read()\` của \`*os.File\` có thể trigger **syscall** (~µs/lần). Đọc từng byte một → triệu lần syscall = chậm chết. Wrap bằng \`bufio.Reader\` size 4 KB → 1 syscall đọc 4 KB, sau đó các \`Read()\` nhỏ múc từ buffer trong RAM (~ns).

\`\`\`
Without bufio: app ── Read(1 byte) ──→ syscall ──→ disk    (lặp 10^6 lần)
With bufio:    app ── Read(1 byte) ──→ bufio (RAM)           (10^6 lần)
                                          ↓
                                        Read(4096) ──→ syscall (lặp 250 lần)
\`\`\`

### Walk-through số

Đọc file 1 MB bằng \`Read(buf 1 byte)\`:

| Cách | Số syscall | Thời gian ước tính |
|---|---|---|
| Raw \`os.File.Read(p[1])\` | 1 048 576 | ~1 048 576 × 1 µs ≈ **1.05 s** |
| \`bufio.NewReader(f).Read(p[1])\` size 4 KB | 1 048 576 / 4096 = 256 | ~256 × 1 µs + đọc RAM ≈ **2 ms** |

→ Tăng tốc 500 lần.

### Các kiểu dùng

\`\`\`go
// 1. Buffered Reader
br := bufio.NewReader(f)
b, _ := br.ReadByte()
line, _ := br.ReadString('\\n')
peek, _ := br.Peek(5)        // xem trước, không tiêu thụ

// 2. Buffered Writer
bw := bufio.NewWriter(f)
bw.WriteString("Hello\\n")
bw.Flush()    // ⚠ BẮT BUỘC, nếu không data còn trong buffer

// 3. Scanner — đọc theo dòng/word/byte
sc := bufio.NewScanner(f)
for sc.Scan() {
    fmt.Println(sc.Text())   // 1 dòng (không có \\n cuối)
}
if err := sc.Err(); err != nil { ... }

// Word
sc.Split(bufio.ScanWords)
\`\`\`

### ⚠ Pitfall #1: quên \`Flush()\`

\`\`\`go
// ❌ data có thể MẤT
f, _ := os.Create("out.txt")
defer f.Close()
bw := bufio.NewWriter(f)
bw.WriteString("Hello")
// program exit → buffer vẫn còn "Hello" chưa được ghi xuống disk
// File rỗng!

// ✅ Đúng
bw := bufio.NewWriter(f)
defer bw.Flush()           // flush trước khi f.Close()
defer f.Close()            // → thứ tự defer ngược: f.Close() chạy SAU bw.Flush()
bw.WriteString("Hello")
\`\`\`

> **Thứ tự defer**: defer LIFO. \`defer bw.Flush()\` viết TRƯỚC \`defer f.Close()\` → flush chạy SAU close → fail. Pattern đúng là khai báo \`defer bw.Flush()\` ngay sau khi \`defer f.Close()\` (tức flush sẽ chạy trước close).

Đúng hơn:
\`\`\`go
f, _ := os.Create("out.txt")
defer f.Close()           // chạy lần 2
bw := bufio.NewWriter(f)
defer bw.Flush()          // chạy lần 1 (LIFO)
bw.WriteString("Hello")
\`\`\`

### ⚠ Pitfall #2: Scanner buffer limit

\`\`\`go
sc := bufio.NewScanner(f)
// Dòng > 64 KB → sc.Scan() trả false, sc.Err() = "token too long"

// Fix:
buf := make([]byte, 1024*1024)
sc.Buffer(buf, 10*1024*1024)  // cho phép dòng đến 10 MB
\`\`\`

### Ví dụ thực tế

\`\`\`go
// Đếm dòng có "ERROR" trong file log
f, _ := os.Open("app.log")
defer f.Close()
sc := bufio.NewScanner(f)
count := 0
for sc.Scan() {
    if bytes.Contains(sc.Bytes(), []byte("ERROR")) {
        count++
    }
}
\`\`\`

### 📝 Tóm tắt mục 6

- \`bufio\` giảm số syscall — tăng tốc đọc/ghi nhỏ x100–500.
- \`bufio.Writer\` phải \`Flush()\` trước khi đóng file.
- \`bufio.Scanner\` tiện cho line-by-line, nhưng có giới hạn dòng 64 KB mặc định.
- \`Peek(n)\` xem trước không tiêu thụ — hữu ích khi parse format.

---

## 7. \`io.Copy\` — copy stream đến hết

\`\`\`go
func Copy(dst Writer, src Reader) (written int64, err error)
\`\`\`

### 💡 Trực giác

\`io.Copy(dst, src)\` = vòng \`for { Read(src) → Write(dst) }\` cho đến EOF. **Cốt lõi của streaming pipeline trong Go.**

### Walk-through

Implementation đơn giản hoá:

\`\`\`go
func Copy(dst Writer, src Reader) (int64, error) {
    buf := make([]byte, 32*1024)   // 32 KB buffer
    var written int64
    for {
        n, er := src.Read(buf)
        if n > 0 {
            nw, ew := dst.Write(buf[:n])
            written += int64(nw)
            if ew != nil { return written, ew }
            if nw < n   { return written, io.ErrShortWrite }
        }
        if er == io.EOF { return written, nil }
        if er != nil    { return written, er }
    }
}
\`\`\`

### Ví dụ thực tế: stream HTTP body sang file

\`\`\`go
resp, _ := http.Get("https://example.com/4gb-video.mp4")
defer resp.Body.Close()

f, _ := os.Create("video.mp4")
defer f.Close()

n, err := io.Copy(f, resp.Body)
// Đọc 4 GB từ network, ghi xuống disk, KHÔNG load 4 GB vào RAM
// Chỉ giữ 32 KB buffer
\`\`\`

### Họ hàng của \`io.Copy\`

- \`io.CopyN(dst, src, n)\` — copy đúng \`n\` byte rồi dừng. Hữu ích khi đọc fixed-size record.
- \`io.CopyBuffer(dst, src, buf)\` — copy với buffer do caller cấp. Tái sử dụng buffer giữa nhiều \`Copy\` để 0 alloc.

### ⚠ Lỗi thường gặp

\`\`\`go
// ❌ Dùng io.ReadAll cho HTTP body
data, _ := io.ReadAll(resp.Body)
os.WriteFile("video.mp4", data, 0644)
// Load 4 GB vào RAM → OOM

// ✅ io.Copy stream
io.Copy(f, resp.Body)
\`\`\`

### Ví dụ pipeline: HTTP body → gzip → file

\`\`\`go
resp, _ := http.Get(url)
defer resp.Body.Close()

f, _ := os.Create("data.gz")
defer f.Close()

gw := gzip.NewWriter(f)
defer gw.Close()

io.Copy(gw, resp.Body)  // network → gzip → file, mỗi lúc chỉ 32 KB trong RAM
\`\`\`

### 📝 Tóm tắt mục 7

- \`io.Copy(dst, src)\` là khối xây dựng cốt lõi của streaming.
- Dùng buffer 32 KB nội bộ — không load toàn bộ.
- \`CopyN\` giới hạn, \`CopyBuffer\` cho buffer custom.
- Thay thế hoàn hảo cho pattern \`ReadAll + Write\`.

---

## 8. \`io.TeeReader\` — đọc + ghi đồng thời

\`\`\`go
func TeeReader(r Reader, w Writer) Reader
\`\`\`

### 💡 Trực giác

Giống lệnh \`tee\` Unix: dòng dữ liệu vừa chảy đi đâu đó, vừa được "rẽ nhánh" copy sang \`w\`. Đọc từ Reader trả về → tự động ghi vào \`w\` mỗi chunk.

\`\`\`
src.Read ──→ TeeReader.Read ──→ caller
                  │
                  └──→ w.Write
\`\`\`

### Ví dụ thực tế: download file + compute SHA-256 cùng lúc

\`\`\`go
resp, _ := http.Get(url)
defer resp.Body.Close()

f, _ := os.Create("file.bin")
defer f.Close()

hasher := sha256.New()
tee := io.TeeReader(resp.Body, hasher)

io.Copy(f, tee)
// Mỗi byte chảy từ network → hasher (update hash) → file
// KHÔNG cần đọc file lại lần 2 để hash
fmt.Printf("SHA256: %x\\n", hasher.Sum(nil))
\`\`\`

### Walk-through

\`\`\`
network → resp.Body ──→ tee.Read(p) ┬─→ writes p to hasher
                                     └─→ returns p to caller (io.Copy)
                                          └─→ writes p to f
\`\`\`

Mỗi chunk đi qua hash → file. 1 lượt I/O, không phải 2.

### 📝 Tóm tắt mục 8

- \`TeeReader(r, w)\` rẽ nhánh stream sang \`w\` mà vẫn return data cho caller.
- Use case: tính hash khi download, log raw bytes, audit.
- Tiết kiệm 1 lượt đọc lại file.

---

## 9. \`io.MultiReader\` và \`io.MultiWriter\`

\`\`\`go
func MultiReader(readers ...Reader) Reader
func MultiWriter(writers ...Writer) Writer
\`\`\`

### 💡 Trực giác

- \`MultiReader(a, b, c)\` = nối tiếp stream a → b → c thành 1 stream lớn (như cat a b c).
- \`MultiWriter(a, b, c)\` = ghi vào 1 chỗ → broadcast ra cả 3 (như tee).

### Ví dụ thực tế

\`\`\`go
// Ghép header + body + footer thành 1 request body
header := strings.NewReader("HEAD\\n")
body, _ := os.Open("body.txt")
defer body.Close()
footer := strings.NewReader("FOOT\\n")

req, _ := http.NewRequest("POST", url, io.MultiReader(header, body, footer))
// Stream cả 3 phần, không cần concat vào RAM
\`\`\`

\`\`\`go
// Ghi log đồng thời ra file + stdout
f, _ := os.Create("app.log")
defer f.Close()
log := io.MultiWriter(f, os.Stdout)
fmt.Fprintln(log, "Hello")  // xuất hiện cả 2 nơi
\`\`\`

### 📝 Tóm tắt mục 9

- \`MultiReader\` nối stream tuần tự.
- \`MultiWriter\` broadcast cùng data ra nhiều sink.
- Cả 2 đều streaming, không buffer toàn bộ.

---

## 10. \`io.Pipe\` — in-memory pair Reader/Writer

\`\`\`go
func Pipe() (*PipeReader, *PipeWriter)
\`\`\`

### 💡 Trực giác

\`io.Pipe\` tạo một cặp Reader/Writer "đối diện": ghi vào \`pw\` → đọc được từ \`pr\`. **Synchronous, in-memory, không buffer**. Producer goroutine \`pw.Write\` block đến khi consumer goroutine \`pr.Read\` đọc xong.

\`\`\`
   goroutine A                goroutine B
   ───────────                ───────────
   pw.Write(data)  ─────────→ pr.Read(buf)
                  (blocks until paired)
\`\`\`

### Vì sao cần

Có những API yêu cầu \`io.Reader\` (vd \`http.Post(url, contentType, body io.Reader)\`), nhưng data bạn sinh ra là tự generate (json.Encoder, csv.Writer, ...). Pipe ghép 2 nửa:

\`\`\`go
pr, pw := io.Pipe()

go func() {
    defer pw.Close()
    enc := json.NewEncoder(pw)
    enc.Encode(bigStruct)   // ghi JSON dần dần vào pw
}()

// Upload JSON stream lên server, không cần serialize ra RAM
http.Post("https://api/upload", "application/json", pr)
\`\`\`

### Walk-through

\`\`\`
[ G1: encoder ]                [ G2: http.Post ]
enc.Encode → pw.Write(chunk) ───→ blocks
                                  ←─── pr.Read(buf) reads chunk
pw.Write(chunk2) ───────────────→ blocks
                                  ←─── pr.Read(buf) reads chunk2
                       ...
pw.Close() ─────────────────────→ pr.Read returns io.EOF
\`\`\`

### ⚠ Pitfall

\`\`\`go
// ❌ Quên close pw → consumer block mãi mãi
go func() {
    pw.Write(data)
    // không có pw.Close() → pr.Read block forever
}()

// ✅ Luôn defer pw.Close() hoặc pw.CloseWithError(err)
go func() {
    defer pw.Close()
    if err := produce(pw); err != nil {
        pw.CloseWithError(err)
        return
    }
}()
\`\`\`

### 📝 Tóm tắt mục 10

- \`io.Pipe()\` = Reader+Writer in-memory, đồng bộ giữa 2 goroutine.
- Dùng khi: data sinh ra dạng Writer, nhưng API cần Reader.
- BẮT BUỘC close \`pw\` để consumer biết EOF.

---

## 11. \`io.LimitReader\` — giới hạn chống DoS

\`\`\`go
func LimitReader(r Reader, n int64) Reader
\`\`\`

### 💡 Trực giác

Wrap reader để chỉ đọc tối đa \`n\` byte rồi trả EOF. Bảo vệ khỏi user gửi file 100 GB.

### Ví dụ thực tế

\`\`\`go
// HTTP server giới hạn body upload 10 MB
http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
    limited := io.LimitReader(r.Body, 10*1024*1024)
    f, _ := os.Create("upload.dat")
    defer f.Close()
    io.Copy(f, limited)
})

// Hoặc tốt hơn: http.MaxBytesReader (close conn nếu vượt)
\`\`\`

### Walk-through số

\`\`\`
LimitReader(src, 100)
  src có 1 GB
  Read(buf[64]) → n=64  (limit -= 64 → 36 còn lại)
  Read(buf[64]) → n=36, err=nil
  Read(buf[64]) → n=0, err=io.EOF
\`\`\`

### 📝 Tóm tắt mục 11

- \`LimitReader(r, n)\` đọc tối đa n byte.
- Chống DoS upload/download lớn.
- Production: dùng \`http.MaxBytesReader\` để cắt cả connection.

---

## 12. Adapter: string/byte → Reader/Writer

| Kiểu nguồn | Adapter | Trả về |
|---|---|---|
| \`string\` | \`strings.NewReader(s)\` | \`*strings.Reader\` (Reader) |
| \`[]byte\` | \`bytes.NewReader(b)\` | \`*bytes.Reader\` (Reader) |
| sink → \`[]byte\` | \`bytes.NewBuffer(nil)\` | \`*bytes.Buffer\` (Reader + Writer) |

### Ví dụ thực tế

\`\`\`go
// Unit test cho function nhận io.Reader
func parse(r io.Reader) (int, error) { ... }

func TestParse(t *testing.T) {
    n, _ := parse(strings.NewReader("42"))
    if n != 42 { t.Fail() }
}

// Hàm sinh data
var buf bytes.Buffer
fmt.Fprintf(&buf, "Hello %s\\n", "world")
data := buf.Bytes()  // []byte("Hello world\\n")

// Cũng có thể đọc lại:
io.Copy(os.Stdout, &buf)
\`\`\`

### 📝 Tóm tắt mục 12

- \`strings.NewReader\` / \`bytes.NewReader\` adapt source thành Reader (read-only).
- \`bytes.Buffer\` vừa Reader vừa Writer — sink trong RAM.
- Cực hữu ích cho unit test và prototyping.

---

## 13. \`ioutil\` deprecated — dùng \`io\` / \`os\` (Go 1.16+)

| Cũ (deprecated) | Mới |
|---|---|
| \`ioutil.ReadAll(r)\` | \`io.ReadAll(r)\` |
| \`ioutil.ReadFile(path)\` | \`os.ReadFile(path)\` |
| \`ioutil.WriteFile(path, data, perm)\` | \`os.WriteFile(path, data, perm)\` |
| \`ioutil.ReadDir(path)\` | \`os.ReadDir(path)\` |
| \`ioutil.NopCloser(r)\` | \`io.NopCloser(r)\` |
| \`ioutil.Discard\` | \`io.Discard\` |
| \`ioutil.TempFile / TempDir\` | \`os.CreateTemp / os.MkdirTemp\` |

Code mới không nên import \`ioutil\`. \`go vet\` không cảnh báo, nhưng linter (\`staticcheck\`) sẽ.

---

## 14. Best practice tổng kết

1. **Function nhận \`io.Reader\`/\`io.Writer\` thay vì kiểu cụ thể.** Caller truyền được file, network, \`strings.Reader\`, mock, ... — cực kỳ linh hoạt cho test.
   \`\`\`go
   // ❌ ít linh hoạt
   func parse(f *os.File) { ... }

   // ✅ linh hoạt — test bằng strings.NewReader
   func parse(r io.Reader) { ... }
   \`\`\`
2. **Tránh \`io.ReadAll\`** nếu data có thể >100 MB. Dùng streaming pipeline \`io.Copy + bufio.Scanner\`.
3. **Luôn \`defer Close()\`** sau khi mở resource.
4. **Luôn \`defer Flush()\`** sau khi tạo \`bufio.Writer\`. Đặt sau \`defer Close()\` để chạy trước (LIFO).
5. **Wrap với \`bufio\`** khi đọc/ghi nhỏ-nhiều. Skip khi đọc/ghi lớn-ít (\`io.Copy\` đã có buffer 32 KB).
6. **Dùng \`io.Copy + TeeReader/MultiWriter\`** thay vì viết tay loop.
7. **Pipe** khi cần bridge writer-style API ↔ reader-style API qua goroutine.

---

## 15. Ứng dụng thực tế trong phần mềm

> 💡 **\`io.Reader\`/\`io.Writer\` là interface quan trọng nhất Go — nó cho phép stream dữ liệu lớn mà không nạp hết vào RAM, và ghép nối mọi nguồn/đích.**

| Tình huống thật | io làm gì |
|-----------------|-----------|
| **Upload/download file lớn** | Stream qua \`io.Copy\` — không nạp cả GB vào RAM |
| **Nén/giải nén on-the-fly** | \`gzip.NewWriter(w)\` bọc writer — nén lúc ghi |
| **Hash file** | \`io.Copy(hasher, file)\` — tính SHA stream |
| **HTTP body** | \`r.Body\` là Reader, \`w\` là Writer — xử lý không buffer hết |
| **Pipe / ghép tầng** | \`io.MultiWriter\`, \`io.TeeReader\` — ghi nhiều đích cùng lúc |

### 15.1. Ví dụ cụ thể — \`io.Copy\` stream file khổng lồ

Copy file 10GB từ upload sang disk/S3:

\`\`\`go
io.Copy(dst, src)  // chuyển từng chunk (buffer ~32KB), KHÔNG nạp 10GB vào RAM
\`\`\`

So với \`data, _ := io.ReadAll(src); dst.Write(data)\` — \`ReadAll\` nạp **toàn bộ 10GB vào RAM** → OOM crash. \`io.Copy\` stream theo chunk → RAM phẳng. Cùng lý do: nén on-the-fly (\`io.Copy(gzipWriter, file)\`), hash stream, proxy request. Đây là sức mạnh của interface Reader/Writer — ghép bất kỳ nguồn nào với bất kỳ đích nào.

> ⚠ **Bẫy — \`io.ReadAll\` trên input không giới hạn = DoS.** Đọc hết body request bằng \`ReadAll\` mà không giới hạn → kẻ tấn công gửi 100GB → hết RAM. Production dùng \`io.LimitReader(r, maxBytes)\` hoặc \`http.MaxBytesReader\`. Và **luôn \`defer f.Close()\`** sau khi mở reader/writer (file, body) — quên → rò rỉ file descriptor.

### 15.2. 📝 Tóm tắt mục 15

- \`io.Reader\`/\`Writer\` = stream dữ liệu lớn không nạp hết RAM; \`io.Copy\` chuyển theo chunk (~32KB).
- Ghép nối: nén on-the-fly, hash stream, \`MultiWriter\`/\`TeeReader\` — bất kỳ nguồn ↔ đích.
- Bẫy: \`ReadAll\` input không giới hạn → DoS (dùng \`LimitReader\`); luôn \`defer Close()\`.

## 16. Bài tập

### BT1 — \`CountingReader\`
Implement wrapper:
\`\`\`go
type CountingReader struct {
    R io.Reader
    N int64   // tổng số byte đã đọc
}
func (cr *CountingReader) Read(p []byte) (int, error)
\`\`\`
Mỗi \`Read\` cộng vào \`N\`. Viết hàm test verify đọc string \`"abcdefghij"\` (10 byte) cho \`N == 10\`.

### BT2 — Line-by-line scanner
Cho 1 file (hoặc 1 string đa dòng), in:
- Tổng số dòng
- Độ dài dòng dài nhất (đếm rune, không phải byte)
- Nội dung dòng dài nhất

Dùng \`bufio.Scanner\`, KHÔNG đọc cả file vào RAM.

### BT3 — Stream HTTP → file
Viết hàm \`Download(url, path string) (int64, error)\` dùng \`io.Copy\` để stream response body sang file. Trả số byte đã ghi. Không load body vào RAM.

### BT4 — TeeReader: download + SHA256 cùng lúc
Mở rộng BT3: trong khi stream, đồng thời tính SHA256 của data. Trả thêm \`[32]byte\` hash.

### BT5 — \`io.Pipe\`: producer/consumer cross goroutine
1 goroutine sinh số nguyên 1..100 (ghi mỗi số 1 dòng vào \`pw\`), 1 goroutine đọc từ \`pr\` và in tổng các dòng chứa số chia hết cho 3.

### BT6 — Rate-limited Reader
Implement:
\`\`\`go
type RateLimitedReader struct {
    R         io.Reader
    BytesPerS int       // vd 1024*1024 cho 1 MB/s
}
func (r *RateLimitedReader) Read(p []byte) (int, error)
\`\`\`
Đảm bảo tốc độ đọc trung bình không vượt \`BytesPerS\`. Hint: sau mỗi \`Read\`, nếu đã đọc nhiều hơn quota của khoảng thời gian từ lúc bắt đầu → \`time.Sleep\`.

---

## 17. Lời giải chi tiết

### Lời giải BT1 — CountingReader

**Cách tiếp cận**: Đây là pattern decorator. Struct giữ reference Reader gốc + state đếm. \`Read\` delegate cho gốc rồi cập nhật state.

\`\`\`go
type CountingReader struct {
    R io.Reader
    N int64
}

func (cr *CountingReader) Read(p []byte) (int, error) {
    n, err := cr.R.Read(p)
    cr.N += int64(n)
    return n, err
}
\`\`\`

**Lưu ý**:
- Method receiver phải là pointer (\`*CountingReader\`) vì cần mutate \`N\`.
- Cộng \`n\` ngay cả khi \`err != nil\` — vì \`Read\` có thể trả \`n>0 && err=io.EOF\`.

Test:
\`\`\`go
cr := &CountingReader{R: strings.NewReader("abcdefghij")}
io.ReadAll(cr)
fmt.Println(cr.N)  // 10
\`\`\`

**Độ phức tạp**: $O(1)$ overhead mỗi Read. Không alloc.

### Lời giải BT2 — Line scanner

**Cách tiếp cận**: \`bufio.Scanner\` đọc từng dòng. Đếm rune bằng \`utf8.RuneCountInString\` (không phải \`len()\` vì byte != rune trong UTF-8).

\`\`\`go
func longestLine(r io.Reader) (count int, maxLen int, longest string) {
    sc := bufio.NewScanner(r)
    for sc.Scan() {
        line := sc.Text()
        count++
        if l := utf8.RuneCountInString(line); l > maxLen {
            maxLen = l
            longest = line
        }
    }
    return
}
\`\`\`

**Walk-through**: input \`"hi\\nxin chào\\nfoo"\`:
- Dòng 1: \`"hi"\` → 2 rune → max
- Dòng 2: \`"xin chào"\` → 8 rune (8 char, "à" là 1 rune mặc dù 2 byte) → max
- Dòng 3: \`"foo"\` → 3 rune

→ \`count=3, maxLen=8, longest="xin chào"\`.

**⚠ Pitfall**: dòng >64 KB → cần \`sc.Buffer(make([]byte, 1MB), 10MB)\`.

**Độ phức tạp**: $O(N)$ byte, RAM = $O(L)$ với L là dòng dài nhất (chỉ giữ 1 dòng + buffer).

### Lời giải BT3 — Download stream

\`\`\`go
func Download(url, path string) (int64, error) {
    resp, err := http.Get(url)
    if err != nil { return 0, err }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return 0, fmt.Errorf("status %d", resp.StatusCode)
    }
    f, err := os.Create(path)
    if err != nil { return 0, err }
    defer f.Close()
    return io.Copy(f, resp.Body)
}
\`\`\`

**Vì sao đúng**: \`io.Copy\` dùng buffer 32 KB nội bộ. File 10 GB chỉ cần ~32 KB RAM.

**Độ phức tạp**: $O(N)$ thời gian (giới hạn bởi network), O(32 KB) RAM.

### Lời giải BT4 — Tee + hash

\`\`\`go
func DownloadWithHash(url, path string) (int64, [32]byte, error) {
    var sum [32]byte
    resp, err := http.Get(url)
    if err != nil { return 0, sum, err }
    defer resp.Body.Close()

    f, err := os.Create(path)
    if err != nil { return 0, sum, err }
    defer f.Close()

    h := sha256.New()
    tee := io.TeeReader(resp.Body, h)
    n, err := io.Copy(f, tee)
    copy(sum[:], h.Sum(nil))
    return n, sum, err
}
\`\`\`

**Cốt lõi**: mỗi chunk đi qua TeeReader thì hash được update đồng thời. 1 lượt qua data → không cần re-read file để hash.

**Compare với cách ngây thơ**:
\`\`\`go
// ❌ Tốn 2x I/O
io.Copy(f, resp.Body)         // ghi file
data, _ := os.ReadFile(path)  // ĐỌC LẠI từ disk
hash := sha256.Sum256(data)   // hash
\`\`\`

**Độ phức tạp**: $O(N)$ thời gian, O(32 KB) RAM.

### Lời giải BT5 — Pipe producer/consumer

\`\`\`go
func sumDivisibleByThree() int {
    pr, pw := io.Pipe()

    // Producer
    go func() {
        defer pw.Close()
        for i := 1; i <= 100; i++ {
            fmt.Fprintf(pw, "%d\\n", i)
        }
    }()

    // Consumer
    total := 0
    sc := bufio.NewScanner(pr)
    for sc.Scan() {
        n, _ := strconv.Atoi(sc.Text())
        if n%3 == 0 {
            total += n
        }
    }
    return total
}
\`\`\`

**Walk-through**:
- Producer ghi \`"1\\n"\`, \`"2\\n"\`, \`"3\\n"\`, ...
- Consumer scan từng dòng, cộng các số chia hết 3: 3+6+9+...+99 = 3*(1+2+...+33) = 3*561 = 1683.

**Vì sao cần defer \`pw.Close()\`**: không có nó, scan trên consumer block mãi vì \`pr.Read\` không bao giờ trả EOF.

**Độ phức tạp**: $O(N)$ thời gian. Bộ nhớ $O(1)$ — pipe synchronous, không buffer.

### Lời giải BT6 — Rate limiter

**Cách tiếp cận**: track tổng byte đã đọc + thời điểm bắt đầu. Sau mỗi Read, nếu tổng đọc vượt quá \`BytesPerS × elapsed_seconds\` → sleep cho đến khi cân bằng lại.

\`\`\`go
type RateLimitedReader struct {
    R         io.Reader
    BytesPerS int
    start     time.Time
    read      int64
}

func (r *RateLimitedReader) Read(p []byte) (int, error) {
    if r.start.IsZero() {
        r.start = time.Now()
    }
    n, err := r.R.Read(p)
    r.read += int64(n)
    // Tính thời gian "đúng" để đã đọc được r.read byte ở rate BytesPerS
    target := time.Duration(float64(r.read) / float64(r.BytesPerS) * float64(time.Second))
    actual := time.Since(r.start)
    if target > actual {
        time.Sleep(target - actual)
    }
    return n, err
}
\`\`\`

**Walk-through**: \`BytesPerS = 1000\`. Đọc 500 byte instant (actual = 1ms). target = 500/1000 s = 500ms. Sleep 499ms để khớp tốc độ.

**Edge case**: Read trả lượng nhỏ → sleep nhỏ → granular. Nếu reader gốc đã chậm, không sleep gì cả.

**Độ phức tạp**: $O(1)$ overhead mỗi Read. Sleep block goroutine current, không tiêu CPU.

---

## 18. Code & Minh họa

- File code Go: [solutions.go](./solutions.go) — biên dịch bằng \`go run solutions.go\`.
- Minh họa trực quan: [visualization.html](./visualization.html) — mở trong browser, 3 module animation cho Read loop, io.Copy buffer, io.Pipe.

---

## 19. Checklist hiểu bài

- Vì sao \`Read(p)\` trả \`n\` thay vì slice mới? · Tại sao \`n>0 && err=io.EOF\` hợp lệ? · \`bufio.Writer.Flush()\` gọi lúc nào? · \`io.TeeReader\` khác \`io.MultiWriter\` ở đâu? · Khi nào nên dùng \`io.Pipe\` thay \`bytes.Buffer\`? · \`io.LimitReader(r, 100)\` đảm bảo gì?

## Bài tiếp theo

- [Lesson 22 — File & OS](../lesson-22-file-os/) — đi sâu hơn vào \`os.File\`, file system ops, permissions, atomic write.

## Tham khảo

- [pkg.go.dev/io](https://pkg.go.dev/io), [pkg.go.dev/bufio](https://pkg.go.dev/bufio).
`;
