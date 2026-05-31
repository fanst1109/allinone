// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-03-threads-concurrency/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Thread & Concurrency

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **thread** là gì và tại sao thread chia sẻ address space nhưng có stack riêng.
- Phân biệt rõ **process** và **thread**: cái gì được chia sẻ, cái gì tách biệt.
- Phân biệt **concurrency (đồng thời)** và **parallelism (song song)**: khái niệm khác nhau, đừng nhầm lẫn.
- Mô tả mô hình threading **1:1 (kernel thread)** và **M:N (user thread / green thread)**: ưu nhược điểm của mỗi mô hình.
- Hiểu tại sao concurrency tạo ra vấn đề **race condition** và **data race** — đặt nền tảng cho Lesson 05 (đồng bộ hoá).

## Kiến thức tiền đề

- [Lesson 01 — Kernel & System Call](../lesson-01-os-kernel-syscall/): user mode, kernel mode, syscall.
- [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): address space (text/data/heap/stack), PCB, context switch.

---

## 1. Thread là gì?

### 1.1. Vấn đề của Process

💡 **Trực giác — Analogy văn phòng:**
Một công ty (process) có văn phòng riêng (address space), tài liệu riêng (bộ nhớ), và điện thoại riêng (file descriptor). Mỗi nhân viên trong công ty (thread) ngồi ở bàn làm việc riêng (stack riêng) nhưng dùng chung phòng, tủ tài liệu và điện thoại với đồng nghiệp. Ngược lại, công ty khác (process khác) có văn phòng hoàn toàn tách biệt — không chia sẻ gì.

Trước khi có thread, chỉ có process. Vấn đề:
- Tạo process mới (\`fork\`) tốn kém: sao chép toàn bộ address space (dù COW), tạo PCB riêng, thiết lập bảng trang.
- Giao tiếp giữa 2 process (IPC) phức tạp: pipe, shared memory, socket — không đơn giản như chia sẻ biến.
- Một process dùng 1 CPU core — không tận dụng máy nhiều core.

**Thread** ra đời để giải quyết: nhiều "dòng thực thi" trong cùng một process, chia sẻ tài nguyên.

### 1.2. Định nghĩa Thread

**Thread (luồng)** là đơn vị thực thi nhỏ nhất trong một process. Một process có ít nhất 1 thread (main thread); có thể có nhiều thread chạy "đồng thời".

**Cái gì được chia sẻ giữa các thread trong cùng process:**
- Text segment (code) — tất cả thread chạy cùng code binary.
- Data segment và BSS — biến global.
- Heap — bộ nhớ \`malloc()\`.
- File descriptors (bảng fd).
- Con trỏ đến các tài nguyên khác: socket, signal handler...

**Cái gì riêng của từng thread:**
- **Stack** — mỗi thread có stack riêng (biến cục bộ, tham số hàm, địa chỉ trả về của thread đó).
- **Program Counter (PC/rip)** — mỗi thread đang thực thi tại địa chỉ khác nhau.
- **CPU Registers** — trạng thái thanh ghi của thread tại thời điểm đang chạy.
- **Thread-local storage (TLS)** — vùng nhớ private của từng thread (nếu có dùng \`__thread\` hoặc \`pthread_key\`).

**Ví dụ minh hoạ với số:**
\`\`\`
Process PID=1000:
  Address space:
    Text:    0x400000 - 0x401FFF (code chung)
    Data:    0x602000 - 0x602FFF (biến global: counter = 0)
    Heap:    0x1000000 - ...     (malloc pool)
    
  Thread 1 (main thread):
    Stack: 0x7fff8000 - 0x7fff9000  (biến cục bộ của T1)
    PC:    0x400A00                   (đang chạy tại hàm process_request)
    rax:   42
    
  Thread 2 (worker thread):
    Stack: 0x7ffe8000 - 0x7ffe9000  (stack riêng, địa chỉ khác)
    PC:    0x400B80                   (đang chạy tại hàm do_computation)
    rax:   17
    
  Cả 2 đều thấy: counter (tại 0x602000) và heap cùng một pool
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Stack của thread 2 thì ở đâu? Ai cấp?"* — Khi tạo thread (pthread_create), thư viện hoặc OS cấp phát một vùng stack riêng cho thread mới, thường bằng \`mmap\`. Kích thước mặc định: 8 MB mỗi thread trên Linux. 1000 thread → 8 GB stack nếu mỗi thread 8 MB (mặc dù phần lớn chưa được cấp RAM thật do lazy allocation).
- *"Thread 1 có thể đọc stack của Thread 2 không?"* — Về kỹ thuật CÓ thể (cùng address space), nhưng đây là **undefined behavior** — không có cơ chế bảo vệ phần cứng giữa stack của các thread trong cùng process. Đây là lý do thread dễ gây bug hơn process: một thread viết sai địa chỉ có thể corrupt data của thread khác.

🔁 **Dừng lại tự kiểm tra:**

Thread A trong process P tăng biến global \`counter++\`. Thread B trong cùng process P có thấy sự thay đổi không? Nếu Thread A trong process P1 tăng \`counter++\`, Thread B trong process P2 (process khác, cùng chạy binary) có thấy không?

<details>
<summary>Đáp án</summary>
Thread A và B cùng process: CÓ thấy — họ chia sẻ cùng vùng data/BSS, \`counter\` chỉ có 1 bản trong RAM. (Nhưng nếu không đồng bộ, kết quả có thể sai — race condition, xem mục 4.)

Thread trong P1 và P2 (process khác nhau): KHÔNG thấy — mỗi process có address space riêng, \`counter\` ở 2 vùng RAM khác nhau, thay đổi ở P1 không ảnh hưởng P2.
</details>

📝 **Tóm tắt mục 1:**
- Thread = đơn vị thực thi nhỏ nhất trong process. Nhiều thread trong 1 process chia sẻ code, data, heap, fd.
- Mỗi thread có: stack riêng, PC riêng, registers riêng.
- Thread nhẹ hơn process: tạo nhanh hơn, giao tiếp qua biến shared (không cần IPC), nhưng ít cô lập hơn.

---

## 2. Concurrency vs Parallelism

### 2.1. Hai khái niệm hay bị nhầm

⚠ **Đây là điểm gây nhầm lẫn phổ biến nhất trong lập trình đa luồng.** Rất nhiều lập trình viên dùng hai từ này như nhau — nhưng chúng khác nhau về bản chất.

💡 **Trực giác — Analogy bếp nhà hàng:**

Nhà hàng A chỉ có 1 đầu bếp, nhưng ông ta tài năng: ông đang nấu phở → chờ nước sôi → trong lúc đó chặt thịt → quay lại khuấy phở → gọt rau → tiếp tục nấu... Ông xử lý nhiều món "đồng thời" — đây là **concurrency** (đồng thời). Thực tế tại mỗi giây chỉ có 1 việc được thực hiện, nhưng tiến độ nhiều việc được xen kẽ.

Nhà hàng B có 4 đầu bếp: mỗi người nấu 1 món độc lập, thực sự 4 món được nấu cùng lúc — đây là **parallelism** (song song).

**Định nghĩa chính xác:**

- **Concurrency (đồng thời):** Nhiều tác vụ *bắt đầu, chạy, và kết thúc trong các khoảng thời gian chồng chéo nhau*, nhưng không nhất thiết phải chạy tại cùng một thời điểm. Là tính chất của *cấu trúc chương trình*.
- **Parallelism (song song):** Nhiều tác vụ *thực sự thực thi tại cùng một thời điểm vật lý*, yêu cầu nhiều đơn vị xử lý (nhiều core, nhiều CPU, SIMD, GPU...). Là tính chất của *thực thi*.

**Ví dụ số với 1 core và 4 core:**

*Hệ thống 1 core, 2 thread A và B, mỗi thread 10ms:*
\`\`\`
Timeline (1 core):
t=0    t=5    t=10   t=15   t=20
|--A---|--B---|--A---|--B---|
         ↑ context switch mỗi 5ms

→ CONCURRENT (đồng thời) nhưng KHÔNG PARALLEL
→ Tổng thời gian: 20ms (A: 10ms + B: 10ms, xen kẽ nhau)
→ Wallclock A bắt đầu t=0, kết thúc t=20 (nhưng chỉ dùng CPU 10ms)
\`\`\`

*Hệ thống 2 core, 2 thread A và B:*
\`\`\`
Timeline (2 core):
t=0    t=5    t=10
Core1: |----A----|
Core2: |----B----|

→ CONCURRENT VÀ PARALLEL
→ Tổng thời gian: 10ms (giảm 2x)
→ A và B thực sự chạy cùng lúc
\`\`\`

### 2.2. Hệ quả thực tế

| Tình huống | Concurrent? | Parallel? |
|-----------|------------|---------|
| 1 core, nhiều thread, OS scheduling | Có | Không |
| 4 core, 4 thread CPU-bound | Có | Có |
| Async I/O (Node.js event loop) | Có | Không (1 thread) |
| SIMD (vector instructions) | Không | Có (1 thread, nhiều data) |
| 4 máy chủ xử lý request | Có | Có |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nếu chỉ có 1 core, dùng nhiều thread có nhanh hơn không?"* — Phụ thuộc. Nếu tác vụ I/O-bound (nhiều thời gian chờ I/O): CÓ nhanh hơn vì thread khác chạy trong lúc thread đang chờ I/O. Nếu CPU-bound (tính toán liên tục): KHÔNG nhanh hơn, còn chậm hơn vì tốn thêm overhead context switch.
- *"Go, Node.js, Python — cái nào thực sự parallel?"* — Go với \`GOMAXPROCS=4\` (mặc định): có thể chạy parallel trên 4 core. Node.js: concurrency nhưng không parallel trong JS thread (single-threaded event loop). Python CPython: GIL (Global Interpreter Lock) ngăn parallel execution của Python bytecode, dù có nhiều thread — thực tế là concurrent chứ không parallel cho CPU-bound tasks.

📝 **Tóm tắt mục 2:**
- **Concurrency** = nhiều tác vụ tiến triển xen kẽ (không cần cùng lúc). Tính chất của cấu trúc.
- **Parallelism** = nhiều tác vụ thực thi thực sự cùng lúc. Cần nhiều core.
- Concurrency ⊇ parallelism: mọi parallel đều concurrent, nhưng concurrent chưa chắc parallel.
- 1 core + nhiều thread = concurrent nhưng không parallel.

---

## 3. Mô hình Threading: 1:1 và M:N

### 3.1. Mô hình 1:1 (Kernel Thread)

**Mô hình 1:1:** Mỗi user thread tương ứng với 1 kernel thread (kernel scheduling entity). OS kernel quản lý và lập lịch trực tiếp từng thread.

\`\`\`
User space:  Thread 1   Thread 2   Thread 3
                ↕           ↕           ↕
Kernel:      KThread1   KThread2   KThread3
                ↕           ↕           ↕
CPU:          Core 1     Core 2     Core 1
\`\`\`

**Ưu điểm:**
- Kernel lập lịch trực tiếp → tận dụng được nhiều core (thực sự parallel).
- Nếu một thread block (chờ I/O), kernel cho thread khác chạy — không block cả process.
- Đơn giản, không cần runtime riêng.

**Nhược điểm:**
- Tạo thread tốn kém hơn: mỗi thread phải có kernel-level TCB (Thread Control Block) tương tự PCB.
- Context switch do kernel quản lý: overhead ~1-100 μs.
- Giới hạn số thread thực tế: hệ thống Linux mặc định giới hạn ~32,768 thread/user (do bộ nhớ kernel stack).

**Ví dụ sử dụng:** POSIX threads (pthreads) trên Linux, Java threads (mặc định dùng kernel thread kể từ Java 1.2+).

### 3.2. Mô hình M:N (User Thread / Green Thread)

**Mô hình M:N:** M user thread được ánh xạ lên N kernel thread (M > N). Runtime của ngôn ngữ/thư viện tự quản lý lập lịch M user thread trên N kernel thread.

\`\`\`
User space:  G1  G2  G3  G4  G5  G6  G7  G8  (M=8 goroutine/green thread)
                 ↕       ↕       ↕       ↕
Runtime:     OS Thread OS Thread OS Thread     (N=3 kernel thread, N ≤ core số)
                 ↕           ↕       ↕
CPU:          Core 1      Core 2   Core 3
\`\`\`

**Ưu điểm:**
- Tạo user thread rất rẻ (vài KB stack, không cần syscall): Go tạo goroutine với stack khởi tạo 2 KB (so với 8 MB mặc định pthread). Có thể có hàng triệu goroutine.
- Context switch trong user space: ~100 ns (10-100× nhanh hơn kernel context switch).
- Runtime có thể tối ưu lập lịch theo workload (work-stealing, cooperative/preemptive).

**Nhược điểm:**
- Nếu một user thread block trên syscall (ví dụ: đọc file chậm), kernel thread đó bị block → tất cả user thread đang dùng kernel thread đó cũng bị kẹt. Runtime phải dùng non-blocking syscall hoặc có thread riêng cho I/O.
- Phức tạp hơn: cần runtime scheduler thêm vào trên OS scheduler.
- Debugging khó hơn (stack trace có thể không ánh xạ trực tiếp với kernel thread).

### 3.3. Ví dụ thực tế: Go Goroutine

💡 **Liên kết chéo:** Go (Golang) dùng mô hình M:N với tên gọi **goroutine**. Đây là lý do tại sao trong Go, bạn có thể dễ dàng tạo 100,000 goroutine mà không hết RAM hay quá tải hệ thống.

\`\`\`go
// Tạo goroutine: chỉ cần từ khoá "go"
go func() {
    doWork()
}()
// Stack khởi đầu: 2 KB (tự grow khi cần, tối đa vài GB)
// Kernel thread: do Go runtime quản lý (GOMAXPROCS kernel thread)
\`\`\`

So sánh với pthread (1:1):
\`\`\`c
// Tạo pthread: 8 MB stack, syscall clone()
pthread_create(&tid, NULL, doWork, NULL);
// 10,000 thread = 80 GB stack (phần lớn virtual, nhưng vẫn tốn page table)
\`\`\`

| Tiêu chí | 1:1 (pthreads) | M:N (goroutine) |
|----------|----------------|-----------------|
| Stack khởi tạo | 8 MB (Linux default) | 2 KB |
| Thời gian tạo | ~20 μs (syscall) | ~1 μs (user space) |
| Context switch | ~1-10 μs (kernel) | ~100 ns (user space) |
| Số thread tối đa | ~32,768 (hệ thống) | Hàng triệu (RAM) |
| Parallel trên nhiều core | Có (kernel lập lịch) | Có (runtime dùng N kernel thread) |

📝 **Tóm tắt mục 3:**
- **1:1 (kernel thread)**: mỗi user thread = 1 kernel thread. Đơn giản, parallel thật sự, nhưng tốn kém. Ví dụ: pthreads, Java thread.
- **M:N (user thread)**: M user thread trên N kernel thread. Tạo nhanh, chuyển đổi rẻ, có thể hàng triệu. Ví dụ: Go goroutine, Erlang process, Python asyncio coroutine.
- Xu hướng hiện đại: M:N hoặc hybrid. Java 21 virtual threads (Project Loom) = M:N.

---

## 4. Concurrency và Vấn đề Race Condition

### 4.1. Race Condition là gì?

Khi nhiều thread chia sẻ dữ liệu và đều có thể đọc/ghi dữ liệu đó, thứ tự thực thi không được kiểm soát có thể dẫn đến kết quả sai.

💡 **Analogy — Hai người cùng sửa một file Google Docs mà không thấy nhau:**
A và B cùng mở file, thấy số 100. A đọc → tăng → ghi lại 101. B đọc (đọc 100 cũ) → tăng → ghi lại 101. Kết quả là 101, nhưng đáng lẽ phải là 102.

**Ví dụ cụ thể trong C (counter toàn cục, 2 thread cùng tăng):**

\`\`\`c
int counter = 0;  // biến global chia sẻ

void* increment(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // có vẻ đơn giản, nhưng thực ra là 3 bước!
    }
    return NULL;
}
\`\`\`

\`counter++\` thực ra gồm 3 lệnh máy:
\`\`\`asm
mov rax, [counter]    ; (1) Đọc giá trị counter vào register
add rax, 1            ; (2) Tăng lên 1
mov [counter], rax    ; (3) Ghi lại vào bộ nhớ
\`\`\`

**Kịch bản lỗi (race condition):**

\`\`\`
counter = 5 (ban đầu)

Thread A:                     Thread B:
(1) mov rax, [counter]        
    rax_A = 5               
(2) add rax, 1              
    rax_A = 6               
                              (1) mov rax, [counter]
                                  rax_B = 5  ← đọc TRƯỚC khi A ghi!
(3) mov [counter], rax      
    counter = 6             
                              (2) add rax, 1
                                  rax_B = 6
                              (3) mov [counter], rax
                                  counter = 6  ← ghi đè 6 lên 6!

Kết quả: counter = 6 (thay vì 7 — mất 1 lần tăng!)
\`\`\`

**Kết quả thực nghiệm:** Chạy 2 thread, mỗi thread tăng counter 1 triệu lần. Kết quả mong đợi: 2,000,000. Kết quả thực tế: thường là 1,300,000 đến 1,900,000 (ngẫu nhiên mỗi lần chạy) — số bị mất phụ thuộc vào timing của CPU scheduler.

### 4.2. Data Race

**Data race** là loại race condition cụ thể: 2 thread cùng truy cập một vùng nhớ đồng thời, ít nhất 1 lần là ghi, và không có đồng bộ hoá.

Data race là **undefined behavior** trong C/C++, Go race detector (\`go run -race\`), và Rust (không biên dịch được nếu có data race trong safe code).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nếu mỗi thread đọc biến khác nhau thì có race condition không?"* — Không. Race condition chỉ xảy ra khi ít nhất có 1 thread ghi. Nếu tất cả chỉ đọc, không có vấn đề gì.
- *"Làm sao sửa?"* — Dùng cơ chế đồng bộ hoá: mutex lock, atomic operations, channel (Go), semaphore... Đây là nội dung của Lesson 05 — Đồng bộ hoá.
- *"Có thể tránh hoàn toàn shared state không?"* — Có, bằng cách thiết kế theo mô hình **message passing** (mỗi thread có state riêng, giao tiếp qua message/channel) thay vì shared memory. Go channel, Erlang message passing là ví dụ. Nhưng đôi khi shared state vẫn hiệu quả hơn — tuỳ use case.

⚠ **Lỗi thường gặp — "Code trông đúng nên không có race condition":** Race condition thường không xuất hiện khi chạy thử nghiệm đơn giản (1 thread thường đủ thời gian hoàn tất trước khi thread 2 bắt đầu). Chỉ khi tải cao, máy nhiều core, hoặc timing đặc biệt mới lộ ra. Đây là loại bug đặc biệt nguy hiểm: *"Không tái hiện được trên máy dev, chỉ xảy ra trên production."*

📝 **Tóm tắt mục 4:**
- Race condition: kết quả phụ thuộc vào thứ tự thực thi không xác định của các thread.
- Data race: ≥ 2 thread truy cập cùng vùng nhớ đồng thời, ≥ 1 ghi, không có đồng bộ.
- \`counter++\` trông đơn giản nhưng thực ra 3 bước lệnh máy — không nguyên tử (atomic).
- Giải pháp: mutex, atomic, channel — sẽ học ở Lesson 05.

---

## Bài tập

**Bài 1** — Chia sẻ vs tách biệt.

Process P tạo 3 thread: T1, T2, T3. Biến nào được chia sẻ, biến nào riêng?
- (a) \`int shared_counter;\` (biến global ở cấp process)
- (b) \`int local_var = 0;\` (khai báo trong hàm của T1)
- (c) Biến fd \`int sock = socket(...)\` được tạo trong thread T2
- (d) Stack pointer (rsp) của từng thread

---

**Bài 2** — Concurrency vs Parallelism.

Phân loại mỗi tình huống sau: concurrent? parallel? cả hai? không cái nào?
- (a) Máy 1 core chạy 10 thread Python với GIL.
- (b) Máy 4 core chạy 4 goroutine Go tính toán số nguyên tố.
- (c) 1 thread đợi I/O, 1 thread tính toán, trên máy 1 core.
- (d) 1 thread chạy tuần tự, không có thread nào khác.

---

**Bài 3** — Stack và Heap thread.

Thread A khai báo \`int arr[100]\` bên trong hàm của nó. Thread B khai báo \`int* buf = malloc(200 * sizeof(int))\`.
- (a) \`arr\` nằm ở đâu trong address space? Thread nào khác có thể truy cập?
- (b) Vùng nhớ \`buf\` trỏ đến nằm ở đâu? Thread nào khác có thể truy cập?
- (c) Điều gì xảy ra nếu Thread A kết thúc (exit) nhưng B vẫn đang chạy?

---

**Bài 4** — Race Condition.

Hai thread cùng chạy hàm sau, \`balance\` là biến global khởi tạo = 1000:

\`\`\`c
void transfer(int amount) {
    int temp = balance;
    temp = temp - amount;
    balance = temp;
}
\`\`\`

Thread A gọi \`transfer(200)\`, Thread B gọi \`transfer(300)\`. Giá trị cuối của \`balance\` có thể là những giá trị nào? Giải thích.

---

**Bài 5** — Mô hình threading.

So sánh: ứng dụng web server cần xử lý 100,000 kết nối đồng thời.
- (a) Dùng 1:1 thread model (pthreads): vấn đề gì xảy ra với 100,000 thread?
- (b) Tại sao Go với goroutine (M:N) phù hợp hơn cho bài toán này?
- (c) Node.js (1 thread + async I/O) giải quyết bài toán này như thế nào?

---

## Lời giải chi tiết

**Bài 1 — Chia sẻ vs tách biệt**

**(a) \`int shared_counter;\` (global):**
**Chia sẻ** — biến global nằm trong Data/BSS của process. Tất cả T1, T2, T3 đều thấy và có thể đọc/ghi cùng một địa chỉ bộ nhớ.

**(b) \`int local_var = 0;\` (trong hàm T1):**
**Riêng của T1** — biến cục bộ nằm trên stack của T1. T2 và T3 có stack riêng ở địa chỉ khác. T2/T3 không tự nhiên truy cập được. (Kỹ thuật: T1 có thể truyền địa chỉ \`&local_var\` cho T2 — nhưng cực kỳ nguy hiểm nếu T1 kết thúc trước khi T2 dùng xong — dangling pointer.)

**(c) \`int sock = socket(...)\` trong T2:**
**Chia sẻ bảng fd** — file descriptor (số nguyên) \`sock\` là biến cục bộ của T2 (trên stack T2, riêng). Nhưng file descriptor TABLE (kernel lưu cho process) là shared: nếu T2 truyền giá trị \`sock\` cho T1, T1 có thể dùng cùng socket đó với \`send(sock, ...)\`.

**(d) Stack pointer (rsp):**
**Riêng của từng thread** — rsp là thanh ghi CPU, mỗi thread có bản sao riêng trong TCB/PCB. rsp của T1 trỏ đến stack T1; rsp của T2 trỏ stack T2.

---

**Bài 2 — Concurrent vs Parallel**

**(a) 1 core, 10 thread Python với GIL:**
**Concurrent, KHÔNG parallel.** GIL (Global Interpreter Lock) của CPython chỉ cho phép 1 thread Python bytecode chạy tại một thời điểm. Dù có nhiều core, Python chỉ dùng 1. Các thread xen kẽ nhau trên 1 core → concurrent. Không thực sự chạy cùng lúc → không parallel. (Ngoại lệ: các C extension như numpy có thể release GIL và chạy parallel.)

**(b) 4 core, 4 goroutine Go:**
**Concurrent VÀ parallel.** Go runtime dùng tất cả 4 core (\`GOMAXPROCS=4\` mặc định). Bốn goroutine tính toán thực sự chạy cùng lúc trên 4 core khác nhau. Đây là parallelism thật sự.

**(c) 1 thread đợi I/O, 1 thread tính toán, 1 core:**
**Concurrent, KHÔNG parallel.** Hai thread xen kẽ nhau: khi thread I/O block, CPU chạy thread tính toán. Chúng tiến triển trong khoảng thời gian chồng chéo → concurrent. Không cùng lúc → không parallel.

**(d) 1 thread chạy tuần tự:**
**Không concurrent, không parallel.** Chỉ có 1 dòng thực thi, chạy thẳng từ đầu đến cuối.

---

**Bài 3 — Stack và Heap thread**

**(a) \`int arr[100]\` của Thread A:**
Nằm trên **Stack của Thread A**. Địa chỉ thuộc vùng stack riêng của A. Thread B *kỹ thuật có thể truy cập* nếu biết địa chỉ (vì cùng address space), nhưng về ngữ nghĩa là **undefined behavior** — không nên làm. Không có bảo vệ phần cứng giữa stack của các thread.

**(b) Vùng nhớ \`buf\` của Thread B:**
Vùng \`200 * sizeof(int)\` = 800 byte nằm trên **Heap** — đây là phần của address space dùng chung. Thread A CÓ THỂ truy cập nếu biết địa chỉ (ví dụ B truyền \`buf\` cho A). Đây là cách hợp lệ để share data giữa thread — nhưng cần đồng bộ (mutex) để tránh race condition.

**(c) Thread A kết thúc:**
Biến \`arr[100]\` trên stack A: vùng stack của A trở thành "không hợp lệ" sau khi A kết thúc (stack frame bị thu hồi). Nếu Thread B đang giữ con trỏ vào stack của A → dangling pointer → crash hoặc đọc rác.

Vùng heap của B (\`buf\`): vẫn hợp lệ — heap tồn tại đến khi process kết thúc hoặc có lệnh \`free()\`. B vẫn có thể dùng \`buf\` bình thường.

---

**Bài 4 — Race Condition và \`balance\`**

\`balance\` ban đầu = 1000. T_A gọi \`transfer(200)\`, T_B gọi \`transfer(300)\`.

Kết quả đúng: 1000 - 200 - 300 = **500**.

**Nhưng với race condition**, các giá trị có thể là:

**Kịch bản 1 — A chạy xong trước B:** 
A: temp=1000, temp-=200, balance=800. Sau đó B: temp=800, temp-=300, balance=**500**. ✓ (Đúng)

**Kịch bản 2 — B chạy xong trước A:**
B: temp=1000, temp-=300, balance=700. Sau đó A: temp=700, temp-=200, balance=**500**. ✓ (Đúng)

**Kịch bản 3 — Race (B đọc trước khi A ghi):**
A đọc: temp_A = 1000.
B đọc: temp_B = 1000. ← B đọc trước khi A cập nhật!
A ghi: balance = 800.
B ghi: balance = 700. ← B ghi đè, bỏ qua kết quả của A.
Kết quả: **700** (sai — mất 200 của A).

**Kịch bản 4 — Race (A đọc trước khi B ghi):**
B đọc: temp_B = 1000.
A đọc: temp_A = 1000.
B ghi: balance = 700.
A ghi: balance = 800. ← A ghi đè, bỏ qua kết quả của B.
Kết quả: **800** (sai — mất 300 của B).

**Tóm lại:** Kết quả có thể là 500 (đúng), 700, hoặc 800 — phụ thuộc timing không xác định.

---

**Bài 5 — Web server 100k connections**

**(a) 1:1 thread, 100,000 thread:**
- Bộ nhớ: 100,000 × 8 MB = **800 GB RAM** chỉ cho stack (dù large part là virtual, page table vẫn tốn). Thực tế kernel thường giới hạn ~32,768 thread/user.
- CPU: Context switch giữa 100,000 thread = overhead khổng lồ, scheduler chạy nhiều hơn code thật.
- Kết luận: **không khả thi** với 1:1 thread model trên phần cứng thông thường.

**(b) Go goroutine (M:N):**
- Bộ nhớ: 100,000 × 2 KB = **200 MB** (so với 800 GB). Khả thi trên bất kỳ máy chủ nào.
- CPU: Go runtime dùng N kernel thread (N = số core, ví dụ 8), 100,000 goroutine được lập lịch trên 8 thread. Khi goroutine chờ I/O (read socket), Go runtime dùng non-blocking syscall + epoll bên dưới, goroutine suspend → goroutine khác chạy.
- Kết luận: **đây là cách Go được thiết kế** — xem gói \`net/http\` tạo 1 goroutine/request tự nhiên.

**(c) Node.js (single-threaded + async I/O):**
- 1 thread JavaScript chạy event loop. Không thể bị block trên I/O — mọi I/O đều async (callback/promise).
- Khi socket có data: OS thông báo qua epoll → event loop gọi callback handler.
- Ưu điểm: không race condition trong JS code (single-threaded), overhead thấp.
- Nhược điểm: CPU-bound task block cả event loop — nếu handler tính toán 1 giây, tất cả 100k request phải chờ.
- Thực tế Node.js production dùng cluster module (fork N process, mỗi process 1 event loop) để tận dụng nhiều core.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): address space, context switch — nền tảng cho thread.
- Bài tiếp theo:
  - [Lesson 04 — Lập lịch CPU](../lesson-04-cpu-scheduling/): OS quyết định thread/process nào được chạy, khi nào, dùng thuật toán gì.
  - [Lesson 05 — Đồng bộ hoá (Synchronization)](../lesson-05-synchronization/): mutex, semaphore, monitor — giải quyết race condition từ bài tập 4.
- Liên kết chéo:
  - [Programming — Goroutine và Channel](../../../Programming/): Go goroutine là mô hình M:N, channel là cơ chế giao tiếp an toàn giữa goroutine (thay thế cho shared memory).
  - [DataStructures — Queue](../../../DataStructures/): Work queue dùng trong thread pool, producer-consumer pattern.

---

## 📝 Tổng kết Lesson 03

1. **Thread** = đơn vị thực thi nhỏ nhất trong process. Chia sẻ: code, data, heap, fd. Riêng: stack, PC, registers.
2. Tạo thread rẻ hơn fork: không cần sao chép address space. Nhưng ít cô lập hơn: bug 1 thread có thể corrupt data của thread khác.
3. **Concurrency** ≠ **Parallelism**. Concurrent = nhiều tác vụ tiến triển xen kẽ (không cần cùng lúc). Parallel = thực sự cùng lúc, cần nhiều core.
4. **1:1 model** (pthreads): mỗi user thread = kernel thread. Parallel thật sự, nhưng tốn kém (8 MB stack, syscall). **M:N model** (goroutine): M user thread trên N kernel thread. Rẻ hơn, scale tốt hơn.
5. **Race condition**: nhiều thread chia sẻ dữ liệu, thứ tự thực thi không xác định → kết quả sai. Giải pháp: đồng bộ hoá (Lesson 05).

[Bài tiếp theo: Lesson 04 — Lập lịch CPU](../lesson-04-cpu-scheduling/)
`;
