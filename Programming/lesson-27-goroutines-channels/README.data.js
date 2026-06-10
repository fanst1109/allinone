// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-27-goroutines-channels/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 27 — Goroutine và Channel

> **Tier 2 — Intermediate.** Đây là lesson "đặc sản" của Go: cách Go biến concurrency từ một chủ đề khó nuốt (thread, mutex, condition variable, future, promise...) thành hai từ khoá nhỏ gọn — \`go\` và \`chan\` — mà người mới học vẫn dùng được trong 30 phút.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **goroutine** là gì, vì sao nó "nhẹ" hơn OS thread và 1 OS thread có thể chạy 10 000+ goroutine.
- Phân biệt được **concurrency** (cấu trúc chương trình) và **parallelism** (chạy thật song song trên nhiều CPU core).
- Biết dùng **channel** (\`make(chan T)\`, \`<-\`, \`close\`) để goroutine "nói chuyện" với nhau theo phương châm *"Don't communicate by sharing memory; share memory by communicating"*.
- Áp dụng được 4 pattern kinh điển: **fan-out**, **fan-in**, **worker pool**, **pipeline**.
- Tránh được 3 cái bẫy phổ biến: **deadlock**, **goroutine leak**, **send vào closed channel** (panic).
- Đọc được signature có channel direction (\`<-chan T\`, \`chan<- T\`) và biết khi nào dùng \`select\` thay vì \`if/switch\`.

## Kiến thức tiền đề

- [Lesson 11 — Functions](../lesson-11-functions/) (gọi hàm, closure, first-class function).
- [Lesson 15 — Struct & Method](../lesson-15-struct-method/).
- [Lesson 18 — Interface](../lesson-18-interfaces/) (không bắt buộc nhưng giúp đọc code chuẩn).
- Quen với việc chạy \`go run\` và \`go build\` ([Lesson 06](../lesson-06-hello-world-toolchain/)).

---

## 1. Goroutine là gì

### 💡 Trực giác

Hãy tưởng tượng bạn mở một quán cà phê. Mỗi khách = một việc cần xử lý. Có 2 cách:

- **Mô hình OS thread**: thuê 100 nhân viên, mỗi nhân viên = 1 OS thread. Mỗi nhân viên cần phòng nghỉ (stack) 8 MB, lương cao (context switch đắt), và quản lý 100 nhân viên rất rối.
- **Mô hình goroutine**: thuê 4 nhân viên (1 cho mỗi CPU core) và bảo: "tao có cuốn sổ ghi việc — \`runtime scheduler\` — chúng mày cứ pick việc ra làm. Mỗi việc mang theo 1 cái sổ tay 2 KB. Khi nào việc nó *chờ* (network, channel) thì gác lại lấy việc khác". 4 người này chạy được 10 000 việc cùng lúc.

**Goroutine** = "việc" trong mô hình thứ hai. Là một **đơn vị thực thi nhẹ** do **Go runtime** quản lý, **không phải** OS thread.

### Định nghĩa hình thức

Một goroutine có 3 đặc trưng:

1. **Stack ban đầu ~2 KB** (so với OS thread ~2 MB → 1 000 lần nhẹ hơn về RAM).
2. **Growable stack**: khi cần thêm chỗ, runtime cấp phát thêm và copy stack sang vùng lớn hơn (không cố định như OS thread).
3. **Multiplex lên M OS thread**: gọi là mô hình **M:N scheduling** — M goroutine (cỡ 10 000) chạy trên N OS thread (cỡ 4–16).

### Ví dụ số

| Đại lượng | OS thread | Goroutine |
|-----------|-----------|-----------|
| Stack ban đầu | 1–8 MB | ~2 KB |
| Tạo 1 đơn vị | ~10–100 µs | ~1 µs |
| Context switch | ~1 µs (qua kernel) | ~100 ns (user-space) |
| Mở 10 000 song song | ~80 GB RAM (∞) | ~20 MB RAM |

Đây là lý do \`go func()\` rẻ đến mức bạn **không cần** "thread pool" như Java/.NET — tạo goroutine mới rẻ hơn lấy từ pool.

### ❓ Câu hỏi tự nhiên

- *"Goroutine có phải là 'thread của Go' không?"* Không. Goroutine là **user-space task**. Go runtime "chia" goroutine lên các OS thread thật. OS không biết goroutine tồn tại.
- *"Vậy nếu 1 goroutine block thì sao?"* Nếu block ở **system call** (đọc file, network), runtime parking goroutine đó, kéo 1 OS thread khác lên chạy goroutine khác — gọi là **handoff**. Nếu block ở **channel/mutex/timer** thì runtime đơn giản đặt goroutine vào hàng đợi, không cần OS thread nào cả.
- *"Goroutine có thể chạy mãi mãi (background) không?"* Có. Nhưng coi chừng goroutine leak (xem §13).

### 🔁 Tự kiểm tra

Vì sao mở 100 000 goroutine không sập máy, nhưng 100 000 OS thread thì sập?

<details>
<summary>Đáp án</summary>

OS thread mỗi thread cần ~1 MB stack do kernel cấp, total ~100 GB → không có máy nào đủ RAM. Goroutine ban đầu chỉ 2 KB do Go runtime cấp ở heap, total ~200 MB → bình thường. Cộng thêm OS thread bị limit bởi kernel (\`ulimit -u\`), goroutine không bị limit nào ngoài RAM.
</details>

---

## 2. Từ khoá \`go\`

Cú pháp duy nhất:

\`\`\`go
go funcName(args)
\`\`\`

Trước **bất kỳ lời gọi hàm** nào, thêm \`go\` → hàm đó chạy trong **goroutine mới**, **caller không đợi**, trả về ngay.

### Ví dụ chạy được

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func chao(ten string) {
    for i := 0; i < 3; i++ {
        fmt.Println("Chào", ten, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go chao("An")   // goroutine 1
    go chao("Bình") // goroutine 2
    chao("Main")    // goroutine main (cũng là 1 goroutine)
}
\`\`\`

**Output** (thứ tự có thể thay đổi):

\`\`\`
Chào Main 0
Chào An 0
Chào Bình 0
Chào Bình 1
Chào An 1
Chào Main 1
...
\`\`\`

### ⚠ Lỗi thường gặp 1: \`main\` thoát trước khi goroutine xong

\`\`\`go
func main() {
    go fmt.Println("Tôi sẽ không bao giờ được in")
}
// main return ngay → process exit → goroutine bị giết
\`\`\`

**Sửa**: cho main đợi (dùng channel hoặc \`sync.WaitGroup\` — Lesson 28). Tạm thời:

\`\`\`go
go fmt.Println("OK")
time.Sleep(time.Second) // hack — dùng channel/WaitGroup cho production
\`\`\`

### ⚠ Lỗi thường gặp 2: goroutine và closure capture biến vòng lặp (Go < 1.22)

\`\`\`go
// SAI ở Go 1.21 và cũ hơn
for i := 0; i < 5; i++ {
    go func() { fmt.Println(i) }()
}
// → in 5,5,5,5,5 (hoặc bất kỳ giá trị nào của i tại thời điểm goroutine chạy)
\`\`\`

**Sửa**: copy biến vào tham số.

\`\`\`go
for i := 0; i < 5; i++ {
    go func(i int) { fmt.Println(i) }(i) // truyền i làm tham số
}
\`\`\`

Từ Go 1.22 trở đi (\`go.mod\` có \`go 1.22+\`), \`i\` được scope mới mỗi vòng → không cần workaround. Vẫn nên biết pattern cũ để đọc code legacy.

### 📝 Tóm tắt §2

- \`go f()\` chạy \`f\` trong goroutine mới, **không chặn** caller.
- Main thoát → tất cả goroutine bị giết → cần đồng bộ.
- Closure capture biến loop là cái bẫy quen thuộc — Go 1.22 đã sửa, nhưng vẫn nên truyền tham số rõ ràng.

---

## 3. Goroutine vs OS thread — bảng so sánh

| | OS thread (pthread, Java Thread) | Goroutine |
|--|--|--|
| Ai quản lý? | Kernel | Go runtime (user-space) |
| Stack | Cố định 1–8 MB | Bắt đầu 2 KB, tự lớn |
| Tạo bao lâu? | 10–100 µs | ~1 µs |
| Context switch | qua kernel, ~1 µs | user-space, ~100 ns |
| Ở scale 10 000 | ~80 GB RAM, sập | ~20 MB RAM, ok |
| Đồng bộ | mutex, cond var (phức tạp) | channel + select (đơn giản) |

### Mô hình M:N (Go scheduler)

\`\`\`
                    Go runtime scheduler
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
       M0 (OS thread)     M1 (OS thread)     M2 (OS thread)   ← N OS threads (N ≈ GOMAXPROCS)
         │                  │                  │
       G1 G2 G3           G4 G5              G6 G7 G8 G9      ← M goroutine (M ≫ N)
       (chạy lần lượt)     ...               ...
\`\`\`

- \`GOMAXPROCS\` (default = số CPU core) = N.
- Mỗi M có **local run queue** riêng (cache locality).
- Khi 1 M hết việc → "work stealing" lấy từ M khác.
- Khi 1 G block ở system call → M park G, lấy M mới chạy G khác.

---

## 4. Concurrency vs Parallelism

> **Rob Pike (Go co-author)**: *"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."*

| | Concurrency | Parallelism |
|--|--|--|
| Bản chất | **Cấu trúc** — chia bài toán thành các phần độc lập | **Thực thi** — chạy thật cùng lúc |
| Cần gì | Goroutine + channel | ≥ 2 CPU core |
| Ví dụ | Server xử lý 1 000 connection trên 1 core | Sum mảng dài bằng 8 core |
| Có cần Parallelism? | Không (1 core vẫn được) | Có |

**Quan trọng**: một chương trình **concurrent** chưa chắc chạy **parallel**. Nếu \`GOMAXPROCS=1\`, mọi goroutine vẫn chạy *interleaved* trên 1 OS thread duy nhất — đúng nghĩa "luân phiên".

### Ví dụ trực giác

- Bạn nấu cơm: cắm cơm điện → trong khi cơm đang nấu, đi rửa rau → đây là **concurrency** (1 người làm nhiều việc).
- Bạn và vợ cùng nấu: bạn rửa rau, vợ thái thịt → **parallelism** (2 người làm 2 việc cùng lúc).

Trong Go: \`go f()\` cho bạn concurrency. Có thật parallel hay không tuỳ vào \`runtime.GOMAXPROCS()\` và số CPU có sẵn.

\`\`\`go
import "runtime"

func main() {
    fmt.Println("CPU:", runtime.NumCPU())          // số core vật lý
    fmt.Println("MaxProcs:", runtime.GOMAXPROCS(0)) // số OS thread runtime dùng
}
\`\`\`

### ❓ Câu hỏi tự nhiên

- *"Nếu app tôi I/O-heavy (web server), concurrency có lợi gì không khi chỉ 1 core?"* Có. Khi 1 connection chờ network (block), goroutine khác vẫn chạy. Đây là lý do Go web server xử lý được 100 K connection trên 1 máy nhỏ.
- *"Khi nào tăng GOMAXPROCS có lợi?"* Khi workload là **CPU-bound** (encryption, image processing, math). Khi I/O-bound thì \`GOMAXPROCS=1\` cũng đủ.

---

## 5. Channel — Cơ chế giao tiếp

> **Triết lý Go**: *"Don't communicate by sharing memory; share memory by communicating."*
>
> Dịch: "Đừng giao tiếp bằng cách chia sẻ bộ nhớ (rồi khoá nó bằng mutex). Hãy chia sẻ bộ nhớ bằng cách **giao tiếp** (gửi giá trị qua channel)."

### 5.1 Channel là gì

Channel là **typed pipe** (ống có kiểu): bạn nhét giá trị vào một đầu, goroutine khác lấy ra ở đầu kia. Đặc điểm:

- **Có kiểu**: \`chan int\` chỉ chứa \`int\`, không lẫn được kiểu khác.
- **FIFO**: vào trước ra trước.
- **Goroutine-safe**: không cần mutex.
- **Đồng bộ hoá**: send + receive là cặp đôi — nếu cần, chúng đợi nhau.

### 5.2 Tạo channel

\`\`\`go
ch := make(chan int)        // unbuffered (cap = 0)
ch := make(chan int, 5)     // buffered, cap = 5
ch := make(chan string, 10) // string channel cap 10
\`\`\`

### 5.3 Gửi, nhận, đóng

\`\`\`go
ch <- 42              // send: đẩy 42 vào channel
v := <-ch             // receive: lấy giá trị ra
v, ok := <-ch         // receive 2-value: ok=false nếu channel đã closed và rỗng
close(ch)             // đóng channel
\`\`\`

### Ví dụ chạy được

\`\`\`go
package main

import "fmt"

func main() {
    ch := make(chan int)        // unbuffered

    go func() {
        ch <- 42                // send (block tới khi main nhận)
    }()

    v := <-ch                   // receive
    fmt.Println("Nhận được:", v) // 42
}
\`\`\`

---

## 6. Unbuffered channel — Synchronous handoff

**Quy tắc**: \`make(chan T)\` (không có cap) tạo channel cap = 0.

- **Send** (\`ch <- v\`) **block** đến khi có goroutine khác **receive** (\`<-ch\`).
- Tương tự, **receive** block đến khi có ai đó send.
- → **rendez-vous**: 2 goroutine "gặp nhau" tại điểm giao dịch, value đi thẳng từ sender sang receiver, không qua buffer.

### Timeline ASCII

\`\`\`
Goroutine A (sender)          Goroutine B (receiver)
───────────────────────       ────────────────────────
t0: ch <- 42 (BLOCK)
                              t1: v := <-ch (BLOCK)
                              ─── runtime ghép cặp ───
t2: unblock, tiếp tục         t2: v = 42, tiếp tục
\`\`\`

Cả 2 phải "có mặt" → đây là cách Go **đồng bộ hoá** 2 goroutine mà không cần mutex.

### Ứng dụng thực tế: "Signal-only"

\`\`\`go
done := make(chan struct{}) // dùng struct{} vì không cần giá trị, tiết kiệm

go func() {
    // làm gì đó dài
    doHeavyWork()
    done <- struct{}{} // báo "xong"
}()

<-done                      // main đợi
fmt.Println("Worker done")
\`\`\`

\`chan struct{}\` là idiom: nói "đây là channel chỉ để báo tin, không truyền dữ liệu".

### ⚠ Lỗi thường gặp: deadlock 1-goroutine

\`\`\`go
func main() {
    ch := make(chan int)
    ch <- 1   // BLOCK FOREVER — không ai nhận
    fmt.Println("Sẽ không in")
}
\`\`\`

Output runtime:

\`\`\`
fatal error: all goroutines are asleep - deadlock!
\`\`\`

Go runtime tự detect deadlock toàn cục (mọi goroutine đều waiting) và panic.

---

## 7. Buffered channel — Asynchronous với capacity

\`\`\`go
ch := make(chan int, 3) // buffer cap = 3

ch <- 1  // không block (buffer: [1])
ch <- 2  // không block (buffer: [1, 2])
ch <- 3  // không block (buffer: [1, 2, 3])
ch <- 4  // BLOCK — buffer đầy, đợi ai đó receive

go func() {
    v := <-ch  // lấy ra 1 → buffer còn [2, 3, 4]
    fmt.Println(v)
}()

// sau khi goroutine receive, send 4 unblock
\`\`\`

**Quy tắc**:

- Buffer **chưa đầy** → send không block.
- Buffer **đầy** → send block tới khi có receive.
- Buffer **rỗng** → receive block tới khi có send.

### Producer/Consumer cổ điển

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func main() {
    jobs := make(chan int, 5) // hàng đợi việc, cap 5

    // Producer
    go func() {
        for i := 1; i <= 10; i++ {
            jobs <- i
            fmt.Println("→ produced", i)
        }
        close(jobs)
    }()

    // Consumer (chậm)
    for j := range jobs {
        time.Sleep(100 * time.Millisecond)
        fmt.Println("  ← consumed", j)
    }
}
\`\`\`

Producer push nhanh, consumer pull chậm → buffer giúp producer tiếp tục push trong khi consumer chưa kịp. Khi buffer đầy, producer mới phải đợi.

### ❓ Câu hỏi tự nhiên

- *"Buffer size nên là bao nhiêu?"* Nguyên tắc:
  - **0 (unbuffered)** khi cần đồng bộ chính xác (signaling, handoff).
  - **Số nhỏ (1–10)** khi muốn smoothing variance giữa producer/consumer.
  - **Số to (100+)** chỉ khi đã đo và biết tại sao. **Buffer to ≠ nhanh hơn** — chỉ tăng latency và che giấu vấn đề scheduling.

---

## 8. Iteration \`for range ch\`

Cú pháp:

\`\`\`go
for v := range ch {
    fmt.Println(v)
}
\`\`\`

Tương đương:

\`\`\`go
for {
    v, ok := <-ch
    if !ok { break }   // channel closed và buffer rỗng
    fmt.Println(v)
}
\`\`\`

### Pattern chuẩn: producer close, consumer range

\`\`\`go
func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch) // QUAN TRỌNG: producer đóng kênh khi xong
}

func main() {
    ch := make(chan int)
    go producer(ch)

    for v := range ch { // tự dừng khi ch closed
        fmt.Println(v)
    }
}
\`\`\`

### ⚠ Quên \`close\` → goroutine leak

Nếu producer **không** \`close(ch)\`, \`for range\` block mãi → consumer goroutine leak.

---

## 9. \`select\` — Multiplex nhiều channel

\`select\` giống \`switch\` nhưng cho channel operations. Mỗi \`case\` là một send hoặc receive.

\`\`\`go
select {
case v := <-ch1:
    fmt.Println("ch1:", v)
case ch2 <- 42:
    fmt.Println("gửi 42 vào ch2")
case <-time.After(2 * time.Second):
    fmt.Println("timeout 2s")
default:
    fmt.Println("không case nào sẵn sàng — non-blocking")
}
\`\`\`

### Quy tắc

1. **Tất cả case đều đánh giá** (channel expression).
2. **Case nào sẵn sàng** (send/receive không block) → chọn 1 random nếu có nhiều case sẵn sàng.
3. **Không có case nào sẵn sàng**:
   - Có \`default\` → chạy \`default\` (non-blocking select).
   - Không có \`default\` → block tới khi 1 case sẵn sàng.

### Ví dụ 1: Timeout cho I/O

\`\`\`go
func fetchWithTimeout(url string) (string, error) {
    ch := make(chan string, 1)
    go func() {
        ch <- httpGet(url) // gọi blocking
    }()

    select {
    case v := <-ch:
        return v, nil
    case <-time.After(2 * time.Second):
        return "", fmt.Errorf("timeout sau 2s")
    }
}
\`\`\`

\`time.After(d)\` trả \`<-chan Time\` sau \`d\`. Nếu \`httpGet\` xong trước → return data. Nếu quá 2s → return timeout error.

### Ví dụ 2: Disable case bằng nil channel

\`\`\`go
var ch1, ch2 chan int = make(chan int), nil // ch2 = nil

select {
case v := <-ch1: fmt.Println(v)  // còn hoạt động
case v := <-ch2: fmt.Println(v)  // case "chết" vì ch2 nil → block forever → bị skip
}
\`\`\`

Idiom: set \`ch = nil\` để "tắt" 1 case trong select mà không cần \`if\`. Xem §15.

---

## 10. Common patterns

### 10.1 Fan-out: 1 producer → N worker

\`\`\`go
jobs := make(chan int, 100)

// 1 producer
go func() {
    for i := 0; i < 100; i++ { jobs <- i }
    close(jobs)
}()

// N worker đọc cùng channel
for w := 0; w < 5; w++ {
    go func(id int) {
        for j := range jobs {
            fmt.Printf("worker %d xử lý job %d\\n", id, j)
        }
    }(w)
}
\`\`\`

→ Tự động load-balance: worker nào rảnh thì pick job tiếp.

### 10.2 Fan-in: N producer → 1 consumer (merge)

\`\`\`go
func merge(chans ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(chans))

    for _, c := range chans {
        go func(ch <-chan int) {
            defer wg.Done()
            for v := range ch { out <- v }
        }(c)
    }

    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}
\`\`\`

(Dùng \`sync.WaitGroup\` — Lesson 28. Tạm hình dung như \`done\` counter.)

Ứng dụng: gom event từ nhiều source (websocket, kafka, file watcher) về 1 channel để xử lý đồng nhất.

### 10.3 Worker pool: N worker cố định xử lý queue

\`\`\`go
jobs := make(chan Job, 100)
results := make(chan Result, 100)

for w := 0; w < 4; w++ {
    go worker(jobs, results)
}

// đẩy job
for _, j := range allJobs { jobs <- j }
close(jobs)

// gom kết quả
for i := 0; i < len(allJobs); i++ {
    r := <-results
    fmt.Println(r)
}
\`\`\`

→ Giới hạn parallelism (4 worker thôi), tránh tạo 10 K goroutine để gọi 10 K HTTP request đồng thời (sẽ exhaust file descriptor).

### 10.4 Pipeline: stage1 → stage2 → stage3

Tưởng tượng dây chuyền sản xuất: thợ 1 chế phôi, đẩy sang thợ 2 mài, thợ 3 đóng gói.

\`\`\`go
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for v := range in { out <- v * v }
        close(out)
    }()
    return out
}

func main() {
    sum := 0
    for v := range square(gen(1, 2, 3, 4, 5)) {
        sum += v // 1+4+9+16+25 = 55
    }
    fmt.Println(sum)
}
\`\`\`

Ưu điểm pipeline:
- Mỗi stage độc lập, dễ test.
- Stage chậm tự bottleneck (back-pressure qua channel block).
- Dễ thêm/xoá stage.

Ứng dụng thực tế: **image processing pipeline** — \`load → decode → resize → watermark → encode → save\`. Mỗi stage một goroutine, ảnh chạy như nước qua đường ống.

---

## 11. Closing channel — Quy tắc

1. **Chỉ sender close**, không bao giờ receiver close.
   - Lý do: receiver close → sender không biết, vẫn send → **panic** (\`send on closed channel\`).
2. **Close 1 channel 2 lần → panic**.
3. **Close \`nil\` channel → panic**.
4. **Send vào closed channel → panic**.
5. **Receive từ closed channel** → trả về **zero-value** của kiểu, \`ok = false\`. Không panic.

### Multiple sender thì sao?

Khi có nhiều goroutine cùng send vào 1 channel, **không** ai được close một mình (vì sender khác có thể vẫn đang gửi). Giải pháp:

- Dùng \`sync.Once\` để đảm bảo close chỉ 1 lần.
- Hoặc dùng **done channel** riêng để báo "stop", không cần close data channel.

Ví dụ:

\`\`\`go
var once sync.Once
closeOnce := func() { once.Do(func() { close(ch) }) }

// mỗi sender khi xong gọi closeOnce()
\`\`\`

### ❓ Câu hỏi tự nhiên

- *"Cần close mọi channel không?"* Không. Channel sẽ được GC khi không ai reference. Close cần thiết khi:
  - Có goroutine đang \`for range\` chờ kết thúc.
  - Cần dùng \`v, ok := <-ch\` để phát hiện "không còn data nữa".
- *"Nếu quên close thì sao?"* Goroutine \`for range\` leak. App vẫn chạy nhưng RAM leak dần.

---

## 12. Deadlock

**Deadlock** = mọi goroutine đều đang đợi → không ai chạy → runtime panic.

### Pattern phổ biến gây deadlock

#### (a) Unbuffered + không có goroutine khác

\`\`\`go
ch := make(chan int)
ch <- 1 // BLOCK, không ai nhận, không có goroutine khác → deadlock
\`\`\`

#### (b) Receive trước, không ai sẽ send

\`\`\`go
ch := make(chan int)
v := <-ch // BLOCK, không ai send
\`\`\`

#### (c) Quên close → range block forever

\`\`\`go
go func() {
    for i := 0; i < 5; i++ { ch <- i }
    // không close → consumer block sau khi nhận đủ 5
}()
for v := range ch { fmt.Println(v) }
\`\`\`

#### (d) Vòng tròn dependency

\`\`\`go
// Goroutine A: ch1 <- 1; v := <-ch2
// Goroutine B: ch2 <- 2; v := <-ch1
// Cả 2 đều block ở send (unbuffered, không ai nhận) → deadlock
\`\`\`

### Phát hiện

- Runtime tự detect **global deadlock** (mọi goroutine sleep) → panic với stack trace.
- **Partial deadlock** (1 vài goroutine bị kẹt, còn lại chạy) → runtime KHÔNG detect được → leak.
- Dùng \`go run -race main.go\` để bật **race detector** — phát hiện data race (không phải deadlock, nhưng liên quan).
- Dùng \`pprof\` (\`net/http/pprof\`) để xem snapshot tất cả goroutine đang ở đâu khi nghi ngờ leak/deadlock.

---

## 13. Goroutine leak

**Leak** = goroutine không bao giờ kết thúc, không bao giờ được GC, ăn RAM mãi.

### Ví dụ leak điển hình

\`\`\`go
func loadData() <-chan int {
    out := make(chan int)
    go func() {
        for i := 0; i < 1_000_000; i++ {
            out <- i // sẽ block khi consumer dừng đọc
        }
        close(out)
    }()
    return out
}

func main() {
    ch := loadData()
    for v := range ch {
        if v == 100 { break } // dừng sớm
    }
    // ← goroutine bên trong loadData() vẫn block ở \`out <- 101\`, không bao giờ trở về
}
\`\`\`

Sau khi \`main\` thoát thì sao? Process exit → goroutine bị giết. Nhưng trong **server chạy mãi** (web service), pattern này tích luỹ → leak.

### Fix: done channel

\`\`\`go
func loadData(done <-chan struct{}) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for i := 0; i < 1_000_000; i++ {
            select {
            case out <- i:
            case <-done:
                return // thoát sạch
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    defer close(done) // báo hiệu khi main xong

    ch := loadData(done)
    for v := range ch {
        if v == 100 { break }
    }
}
\`\`\`

\`select\` cho phép sender check tín hiệu "dừng" mỗi lần send. Khi \`done\` closed, receive từ nó luôn trả về ngay → goroutine thoát.

(Pattern này được formalize thành \`context.Context\` — học ở Lesson 29.)

---

## 14. Channel direction trong signature

Khi viết hàm nhận channel, **luôn** khai báo hướng để giới hạn quyền:

\`\`\`go
func consumer(in <-chan int) {        // chỉ receive
    for v := range in { fmt.Println(v) }
}

func producer(out chan<- int) {       // chỉ send
    for i := 0; i < 5; i++ { out <- i }
    close(out)
}
\`\`\`

- \`<-chan T\` — receive-only (compile error nếu cố \`out <- v\`).
- \`chan<- T\` — send-only (compile error nếu cố \`<-out\`).
- \`chan T\` — bidirectional.
- **Bidirectional → directional**: tự động convert. Ngược lại không được.

### Vì sao quan trọng?

- Documentation: đọc signature biết ngay hàm này "tiêu thụ" hay "sản xuất".
- Compile-time safety: tránh nhầm.
- Encapsulation: function trả về \`<-chan T\` → caller không close được kênh (tránh phá quy tắc §11).

\`\`\`go
func produce() <-chan int {           // trả receive-only
    ch := make(chan int)              // tạo bidirectional bên trong
    go func() { /* ... */ close(ch) }()
    return ch                         // implicit convert
}
\`\`\`

---

## 15. Nil channel — Trick advanced

\`\`\`go
var ch chan int // ch = nil
ch <- 1         // BLOCK forever
<-ch            // BLOCK forever
\`\`\`

Nghe vô dụng? Thực ra rất hữu ích trong \`select\`:

\`\`\`go
func sender(out chan<- int, stop <-chan struct{}) {
    var pending int
    var send chan<- int // ban đầu nil → case "send" bị disable
    for {
        select {
        case pending = <-someSource:
            send = out // có data → enable case
        case send <- pending:
            send = nil // gửi xong → disable case
        case <-stop:
            return
        }
    }
}
\`\`\`

Pattern: muốn "tắt" 1 case trong select tạm thời → set channel = nil.

---

## 16. Performance

### Chi phí channel op

| Op | Cost (xấp xỉ) |
|----|---------------|
| Goroutine creation | ~1 µs |
| Channel send/recv (uncontended) | ~50–100 ns |
| Mutex lock/unlock (uncontended) | ~25 ns |
| atomic.AddInt64 | ~5 ns |

→ Channel ~2–4× chậm hơn mutex, ~20× chậm hơn atomic. Cho high-throughput (>1 M ops/s) nội bộ, dùng mutex/atomic; cho coordination/structure thì channel rõ ràng hơn.

### Khi nào dùng cái nào?

| Tình huống | Nên dùng |
|-----------|----------|
| Cấu trúc concurrency (worker pool, pipeline, fan-out) | Channel |
| Đếm số đơn giản (counter, request ID) | \`sync/atomic\` |
| Bảo vệ data structure (map, slice) chia sẻ | \`sync.Mutex\` / \`sync.RWMutex\` |
| Báo hiệu "xong" giữa goroutine | \`chan struct{}\` hoặc \`sync.WaitGroup\` |

### ⚠ Buffer to không phải lúc nào cũng nhanh

\`\`\`go
ch := make(chan int, 1_000_000) // mặc định ai cũng nghĩ "nhanh"
\`\`\`

Sai lầm: buffer to chỉ trì hoãn back-pressure → bug "queue đầy lúc nào không biết". Buffer **dài** = **latency cao** (item đợi trong buffer lâu hơn).

### 📝 Tóm tắt §16

- Channel có overhead — đo trước khi tối ưu.
- High-throughput thuần CPU → atomic > mutex > channel.
- Buffer size = số nhỏ thực sự cần — không phải càng to càng tốt.

---

## 17. Common pitfall (đã từng cắn ai cũng cắn)

| Pitfall | Triệu chứng | Sửa |
|---------|-------------|------|
| Send vào closed channel | \`panic: send on closed channel\` | Đảm bảo close sau khi mọi sender xong (WaitGroup + close-once) |
| Close 2 lần | \`panic: close of closed channel\` | Dùng \`sync.Once\` |
| Range không close | Goroutine block forever (leak) | Producer phải close |
| Loop variable capture (Go < 1.22) | Tất cả goroutine in cùng giá trị | Truyền tham số \`func(i int){}(i)\` |
| Goroutine leak sau early return | RAM tăng dần | done channel hoặc context |
| Unbuffered + send mà không có receiver | Deadlock | Hoặc dùng buffered, hoặc start receiver trước |
| Mutex + channel cùng bảo vệ 1 thứ | Code rối, dễ deadlock | Chọn 1 — không trộn |

---

## 18. Use cases thực tế

### 18.1 Concurrent HTTP request

\`\`\`go
urls := []string{"a.com", "b.com", "c.com"}
results := make(chan string, len(urls))

for _, u := range urls {
    go func(url string) {
        resp, _ := http.Get(url)
        results <- fmt.Sprintf("%s -> %d", url, resp.StatusCode)
    }(u)
}

for i := 0; i < len(urls); i++ {
    fmt.Println(<-results)
}
\`\`\`

3 request chạy song song thay vì tuần tự → tổng time = max thay vì sum.

### 18.2 Parse log file đa luồng

\`\`\`go
lines := make(chan string, 1000)
// 1 goroutine đọc file → push line vào channel
// N goroutine pull line, parse, count

go func() {
    f, _ := os.Open("access.log")
    s := bufio.NewScanner(f)
    for s.Scan() { lines <- s.Text() }
    close(lines)
    f.Close()
}()

var wg sync.WaitGroup
for w := 0; w < 4; w++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        for line := range lines {
            parseAndCount(line)
        }
    }()
}
wg.Wait()
\`\`\`

4 worker parse song song → 4× nhanh trên 4-core machine.

### 18.3 Image processing pipeline

\`\`\`go
// stage 1: list file
files := listFiles("./photos")
// stage 2: load
imgs := loadImages(files)
// stage 3: resize
resized := resizeImages(imgs)
// stage 4: save
saveImages(resized)
\`\`\`

Mỗi stage 1 goroutine + buffered channel cap 4. Đĩa chậm? CPU rảnh sẽ resize image kế tiếp.

---

## Bài tập

### BT1: Concurrent sum

Cho \`nums := []int{1, 2, ..., 100}\`. Chia thành 4 phần. Mỗi goroutine sum 1 phần, gửi kết quả qua channel. Main gộp lại.

### BT2: Worker pool

Có 100 job (mỗi job in \`"processing job X"\` rồi sleep 50ms). Dùng 5 worker xử lý song song. Trả kết quả (job ID + worker ID) qua channel \`results\`. Main thu thập tất cả result và in.

### BT3: Fan-in merge

Viết hàm \`merge(a, b, c <-chan int) <-chan int\` gộp 3 channel input thành 1 output. Khi cả 3 input close → output cũng close.

### BT4: Timeout HTTP

Viết \`fetchTimeout(url string, timeout time.Duration) (string, error)\` — gọi \`http.Get\` trong goroutine, timeout sau \`timeout\` thì return error \`"timeout"\`.

### BT5: Pipeline 3 stage

\`gen(1..10) → square → sum\`. Mỗi stage là 1 hàm trả \`<-chan int\`. Stage cuối in tổng \`1²+...+10² = 385\`.

### BT6: Detect deadlock

Đoạn code dưới đây có deadlock. Giải thích tại sao và sửa.

\`\`\`go
func main() {
    ch := make(chan int)
    ch <- 1
    fmt.Println(<-ch)
}
\`\`\`

### BT7: Detect & fix goroutine leak

Đoạn code dưới đây leak. Tìm leak và sửa bằng done channel.

\`\`\`go
func numbers() <-chan int {
    out := make(chan int)
    go func() {
        for i := 0; ; i++ { out <- i }
    }()
    return out
}

func main() {
    ch := numbers()
    for v := range ch {
        if v >= 5 { break }
        fmt.Println(v)
    }
}
\`\`\`

---

## Lời giải chi tiết

### BT1 — Concurrent sum

**Cách tiếp cận**: chia mảng làm 4 chunk, mỗi goroutine sum 1 chunk, gửi qua channel buffered cap 4 để không block.

\`\`\`go
nums := make([]int, 100)
for i := range nums { nums[i] = i + 1 } // 1..100

results := make(chan int, 4)
chunkSize := len(nums) / 4 // 25

for i := 0; i < 4; i++ {
    start, end := i*chunkSize, (i+1)*chunkSize
    go func(s []int) {
        sum := 0
        for _, v := range s { sum += v }
        results <- sum
    }(nums[start:end])
}

total := 0
for i := 0; i < 4; i++ { total += <-results }
fmt.Println(total) // 5050
\`\`\`

- Độ phức tạp: $O(n)$ thời gian, $O(n/p)$ wall-clock với p core.
- Lý do dùng buffer cap 4: 4 goroutine có thể "ném" kết quả mà không cần receiver sẵn sàng → giảm 1 lần đồng bộ.

### BT2 — Worker pool

\`\`\`go
type Result struct { Job, Worker int }
jobs := make(chan int, 100)
results := make(chan Result, 100)

// 5 worker
for w := 1; w <= 5; w++ {
    go func(id int) {
        for j := range jobs {
            time.Sleep(50 * time.Millisecond)
            results <- Result{Job: j, Worker: id}
        }
    }(w)
}

// đẩy job
for j := 1; j <= 100; j++ { jobs <- j }
close(jobs)

// thu thập
for i := 0; i < 100; i++ {
    r := <-results
    fmt.Printf("Job %d done by worker %d\\n", r.Job, r.Worker)
}
\`\`\`

- \`close(jobs)\` báo worker dừng \`for range\`.
- Không cần close \`results\` vì ta đếm đủ 100 result rồi thoát.
- Đo: tổng thời gian ≈ \`100 * 50ms / 5 = 1s\` (thay vì 5s tuần tự).

### BT3 — Fan-in merge

\`\`\`go
func merge(chans ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(chans))
    for _, ch := range chans {
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c { out <- v }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}
\`\`\`

- 3 worker goroutine: mỗi cái fan-in 1 channel input vào \`out\`.
- 1 closer goroutine: đợi tất cả xong rồi close \`out\`.

### BT4 — Timeout HTTP

\`\`\`go
func fetchTimeout(url string, timeout time.Duration) (string, error) {
    ch := make(chan string, 1) // buffer 1 → goroutine không leak nếu timeout
    go func() {
        resp, err := http.Get(url)
        if err != nil { ch <- ""; return }
        defer resp.Body.Close()
        b, _ := io.ReadAll(resp.Body)
        ch <- string(b)
    }()

    select {
    case body := <-ch:
        return body, nil
    case <-time.After(timeout):
        return "", fmt.Errorf("timeout sau %v", timeout)
    }
}
\`\`\`

**Tại sao buffer 1?** Nếu timeout xảy ra, không ai đọc \`ch\` nữa. Nếu \`ch\` unbuffered, goroutine \`ch <- string(b)\` sẽ block forever → leak. Buffer 1 cho phép send "fire and forget".

### BT5 — Pipeline

\`\`\`go
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums { out <- n }
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for v := range in { out <- v * v }
    }()
    return out
}

func sum(in <-chan int) int {
    s := 0
    for v := range in { s += v }
    return s
}

func main() {
    nums := make([]int, 10)
    for i := range nums { nums[i] = i + 1 }
    fmt.Println(sum(square(gen(nums...)))) // 385
}
\`\`\`

\`1²+2²+...+10² = 1+4+9+16+25+36+49+64+81+100 = 385\` ✓

### BT6 — Deadlock fix

**Phân tích**: \`ch := make(chan int)\` unbuffered. \`ch <- 1\` block tới khi có receiver. Receiver \`<-ch\` ở **dòng kế tiếp** trong cùng goroutine main → không bao giờ tới. Runtime detect global deadlock → panic.

**Sửa cách 1**: buffer 1.

\`\`\`go
ch := make(chan int, 1)
ch <- 1
fmt.Println(<-ch)
\`\`\`

**Sửa cách 2**: tách goroutine.

\`\`\`go
ch := make(chan int)
go func() { ch <- 1 }()
fmt.Println(<-ch)
\`\`\`

### BT7 — Goroutine leak fix

**Phân tích**: \`numbers()\` chạy \`for i := 0; ; i++\` không bao giờ dừng → goroutine sống mãi sau khi main \`break\`. Trong server dài hạn, mỗi lần gọi \`numbers()\` lại leak thêm.

**Sửa**:

\`\`\`go
func numbers(done <-chan struct{}) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for i := 0; ; i++ {
            select {
            case out <- i:
            case <-done:
                return
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    defer close(done) // báo cho goroutine sender dừng

    ch := numbers(done)
    for v := range ch {
        if v >= 5 { break }
        fmt.Println(v)
    }
}
\`\`\`

- \`close(done)\` trong \`defer\` đảm bảo dù main return cách nào, signal vẫn được phát.
- Sender \`select\`: hoặc gửi thành công, hoặc nhận tín hiệu thoát.
- Pattern này được nâng cấp lên \`context.Context\` ở Lesson 29.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — code Go biên dịch được, minh hoạ mọi pattern trong lesson.
- [visualization.html](./visualization.html) — 3 module tương tác: scheduler view, channel handoff, worker pool simulator.

Chạy code:

\`\`\`bash
cd Programming/lesson-27-goroutines-channels
go run solutions.go
\`\`\`

Mở visualization:

\`\`\`bash
open visualization.html # macOS
# hoặc python3 -m http.server và truy cập http://localhost:8000/visualization.html
\`\`\`

---

## Bài tiếp theo

- **Lesson 28 — Sync Primitives** (\`sync.Mutex\`, \`sync.RWMutex\`, \`sync.WaitGroup\`, \`sync.Once\`, \`sync/atomic\`). Sẽ giải đáp "khi nào dùng mutex thay vì channel".
- **Lesson 29 — Context** (cancellation, deadline, value propagation). Pattern done channel trong lesson này sẽ được formalize.

📝 **Tóm tắt lesson**:
- \`go f()\` = chạy concurrent; goroutine nhẹ (~2 KB), runtime quản lý.
- Channel = typed pipe; unbuffered = handoff, buffered = queue.
- \`for range ch\` + \`close(ch)\` = vòng đời đẹp nhất.
- \`select\` = multiplex; \`time.After\` = timeout; nil channel = disable case.
- 4 pattern phải nhớ: fan-out, fan-in, worker pool, pipeline.
- Tránh: deadlock (mọi goroutine wait), leak (goroutine block forever), panic (send/close trên closed channel).
`;
