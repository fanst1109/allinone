// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-08-ipc/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — IPC — Giao tiếp liên tiến trình

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **tại sao IPC cần thiết**: process có không gian địa chỉ riêng biệt, không thể đọc bộ nhớ của nhau trực tiếp.
- Mô tả và so sánh 4 cơ chế IPC chính: **shared memory**, **pipe** (anonymous & named), **message queue**, **signal**.
- Walk-through \`ls | grep\` — phân tích pipe ẩn danh từng bước (fork, dup2, execve).
- Biết socket là cơ chế IPC qua mạng và link sang kiến thức Networking.
- Ra quyết định chọn cơ chế IPC phù hợp cho tình huống cụ thể.

## Kiến thức tiền đề

- [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): virtual address space, fork(), PCB — hiểu tại sao process không chia sẻ bộ nhớ mặc định.
- [Lesson 03 — Luồng & Tương tranh](../lesson-03-threads-concurrency/): thread chia sẻ heap; process không — đây là lý do cần IPC.
- [Lesson 05 — Đồng bộ hoá](../lesson-05-synchronization/) và [Lesson 06 — Semaphore](../lesson-06-semaphores-classic-problems/): shared memory cần đồng bộ hoá để tránh race condition.

---

## 1. Tại sao cần IPC?

### 1.1. Vấn đề: Process cô lập hoàn toàn

💡 **Trực giác:** Hai ứng dụng trên máy tính giống như hai nhà riêng biệt. Thread trong cùng process như người trong cùng một nhà — họ dùng chung phòng khách (heap). Nhưng hai process khác nhau sống ở hai nhà tách biệt — không ai vào nhà người kia được nếu không có cửa thông.

Mỗi process có **virtual address space riêng biệt** được OS quản lý. Khi process A ghi vào địa chỉ \`0x1000\`, process B đọc địa chỉ \`0x1000\` — chúng đang đọc hai vùng vật lý khác nhau (do page table khác nhau). Không có cách nào để A "nhìn vào" RAM của B theo mặc định.

**Tại sao không dùng thread thay vì process?** Thread chia sẻ bộ nhớ tự nhiên nhưng không có isolation — crash ở một thread có thể kéo theo toàn bộ process. Nhiều ứng dụng ưu tiên isolation (security, fault tolerance) nên dùng nhiều process và cần IPC để giao tiếp.

**Nhu cầu IPC xuất hiện khi:**
- Shell pipeline: \`ps aux | grep chrome | wc -l\` — 3 process trao đổi data.
- Web browser: render process tách biệt với network process — bị exploit render process thì không ảnh hưởng network.
- Database: client process giao tiếp với server process.
- Microservices: mỗi service là process riêng, trao đổi qua network hoặc socket.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"File có phải là IPC không?"* — Có, nhưng chậm (cần I/O disk). File phù hợp với dữ liệu lớn hoặc cần persistent. Các cơ chế IPC "thật" (pipe, shared memory, message queue) hoạt động hoàn toàn trong RAM.
- *"Socket có phải IPC không?"* — Có. Socket vừa dùng cho IPC trên cùng máy (Unix domain socket), vừa dùng cho giao tiếp qua mạng (TCP/IP socket). Bài [Networking — Lesson 01](../../../Networking/) đi sâu hơn.

---

## 2. Shared Memory

### 2.1. Cơ chế

💡 **Trực giác:** Hai nhà riêng biệt nhưng có một cái kho ở giữa mà cả hai đều có chìa khoá. Ai muốn trao đổi đồ thì để vào kho, người kia vào lấy.

**Shared Memory** là cơ chế OS tạo ra một vùng nhớ vật lý và map (ánh xạ) vào không gian địa chỉ ảo của nhiều process khác nhau. Sau khi map, các process đọc/ghi vùng nhớ đó như biến local thông thường — cực kỳ nhanh.

**Luồng hoạt động (POSIX shared memory):**

\`\`\`
// Process A (tạo và ghi):
fd = shm_open("/my_shm", O_CREAT|O_RDWR, 0666)
ftruncate(fd, size)
ptr = mmap(NULL, size, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0)
*ptr = 42              // ghi vào shared memory
munmap(ptr, size)

// Process B (đọc):
fd = shm_open("/my_shm", O_RDONLY, 0666)
ptr = mmap(NULL, size, PROT_READ, MAP_SHARED, fd, 0)
value = *ptr           // đọc = 42
\`\`\`

### 2.2. Đặc điểm

| Ưu điểm | Nhược điểm |
|---------|-----------|
| **Nhanh nhất** trong các cơ chế IPC — giao tiếp qua RAM trực tiếp, không cần copy | Cần **tự đồng bộ hoá** — race condition nếu nhiều process ghi đồng thời |
| Phù hợp với dữ liệu lớn (video, audio, database buffer pool) | Khó debug: lỗi access violation khó trace |
| Sau khi setup, không có overhead syscall mỗi lần đọc/ghi | Cần process thỏa thuận về layout bộ nhớ (format, offsets) |

⚠ **Lỗi thường gặp — Không đồng bộ:** Nếu Process A và B cùng ghi vào shared memory mà không có semaphore hay mutex → race condition. Shared memory là "kho" không có khoá — bạn phải tự thêm khoá. Dùng POSIX semaphore (\`sem_open\`, \`sem_wait\`, \`sem_post\`) hoặc mutex được tạo trong shared memory để bảo vệ.

---

## 3. Pipe

### 3.1. Anonymous Pipe — \`ls | grep\`

💡 **Trực giác:** Pipe là một ống nước một chiều. Một bên đổ nước vào (ghi), bên kia hứng ra (đọc). Không thể chảy ngược. Nếu ống đầy, bên đổ phải chờ. Nếu ống rỗng, bên hứng phải chờ.

**Pipe ẩn danh (anonymous pipe)** chỉ tồn tại trong bộ nhớ kernel, không có tên trong filesystem. Chỉ dùng giữa **process cha và con** (hoặc con và con có cùng cha — sau \`fork\`).

**Walk-through \`ls | grep .go\`:**

**Bước 1 — Shell gọi \`pipe(fd)\`:**

\`\`\`
fd[0]: đầu đọc (read end)
fd[1]: đầu ghi (write end)

Kernel tạo pipe buffer (thường 64KB) trong RAM.
\`\`\`

**Bước 2 — Shell gọi \`fork()\` (hai lần, tạo 2 tiến trình con):**

\`\`\`
Child 1 (sẽ là ls):
  - Đóng fd[0] (không cần đọc)
  - Redirect stdout → fd[1]: dup2(fd[1], STDOUT_FILENO)
  - Đóng fd[1] gốc
  - execve("ls", ...)  → ls bây giờ ghi vào pipe

Child 2 (sẽ là grep):
  - Đóng fd[1] (không cần ghi)
  - Redirect stdin ← fd[0]: dup2(fd[0], STDIN_FILENO)
  - Đóng fd[0] gốc
  - execve("grep", ".go", ...)  → grep đọc từ pipe
\`\`\`

**Bước 3 — ls ghi, grep đọc:**

\`\`\`
ls viết danh sách file vào pipe buffer (fd[1] = stdout của ls)
→ kernel đẩy vào pipe buffer
grep đọc từ stdin (= fd[0] = pipe buffer)
→ kernel trả data từ pipe buffer cho grep
grep lọc và in ra terminal (stdout gốc của grep)
\`\`\`

**Bước 4 — Kết thúc:**

\`\`\`
ls xong → đóng fd[1] → kernel đánh dấu pipe end-of-file
grep đọc hết → nhận EOF → kết thúc
\`\`\`

**Giá trị của dup2:** \`dup2(fd[1], 1)\` sao chép file descriptor \`fd[1]\` vào slot số 1 (STDOUT). Từ đó, mọi \`write(1, ...)\` thực ra ghi vào pipe. Process không cần biết stdout là terminal hay pipe.

### 3.2. Named Pipe (FIFO)

**Named pipe (FIFO)** có một tên trong filesystem, ví dụ \`/tmp/mypipe\`. Hai process không cần quan hệ cha-con mới dùng được.

\`\`\`bash
# Terminal 1:
mkfifo /tmp/mypipe
cat /tmp/mypipe     # blocked, chờ dữ liệu

# Terminal 2:
echo "hello world" > /tmp/mypipe  # ghi, Terminal 1 in ra
\`\`\`

**FIFO hoạt động:** \`mkfifo\` tạo special file trong filesystem. Khi process mở FIFO để đọc, nó block cho đến khi có process khác mở để ghi (và ngược lại). Sau đó data chảy qua kernel buffer như anonymous pipe.

### 3.3. Đặc điểm Pipe

| Đặc điểm | Anonymous Pipe | Named Pipe (FIFO) |
|----------|---------------|-------------------|
| Tên trong FS | Không | Có (\`mkfifo\`) |
| Quan hệ process | Cần cha-con | Bất kỳ |
| Hướng | Một chiều | Một chiều |
| Tồn tại đến khi | Cả 2 đầu đóng | Xoá file hoặc đóng |
| Dùng điển hình | Shell pipeline | Daemon ↔ client |

📝 **Tóm tắt mục 3:**
- Pipe: kênh một chiều trong kernel, producer ghi, consumer đọc. Backpressure tự nhiên.
- Anonymous: fork() → parent/child chia sẻ qua fd.
- Named (FIFO): file đặc biệt trong FS, bất kỳ process nào mở được.
- \`dup2\` là cơ chế redirect fd — nền tảng của shell pipeline.

---

## 4. Message Queue

### 4.1. Cơ chế

💡 **Trực giác:** Hộp thư chung. Bất kỳ process nào biết tên hộp thư đều có thể gửi thư vào hoặc lấy thư ra. Mỗi thư có thể có nhãn (type) để lọc.

**Message Queue** (hàng đợi tin nhắn) là cấu trúc dữ liệu do kernel quản lý. Process gửi message (write) vào queue, process nhận đọc ra (read). Khác pipe: nhiều sender và receiver, có thể lọc theo type, message giữ nguyên ranh giới (pipe là byte stream liên tục).

**POSIX Message Queue:**

\`\`\`c
// Gửi:
mqd_t mq = mq_open("/my_queue", O_WRONLY | O_CREAT, 0666, &attr);
mq_send(mq, message, msg_len, priority);

// Nhận:
mqd_t mq = mq_open("/my_queue", O_RDONLY);
mq_receive(mq, buffer, buf_size, &priority);
\`\`\`

### 4.2. So sánh với Pipe

| | Pipe | Message Queue |
|---|------|--------------|
| **Ranh giới message** | Byte stream (grep phải tự tách dòng) | Từng message riêng biệt |
| **Số sender/receiver** | 1-1 (hoặc fan-out sau fork) | Nhiều-nhiều |
| **Lọc theo type** | Không | Có (priority, type) |
| **Persist** | Không (mất khi đóng fd) | Tồn tại trong kernel cho đến khi xoá |
| **Phù hợp** | Shell pipeline, streaming | Task queue, event notification |

---

## 5. Signal

### 5.1. Signal là gì?

**Signal** là thông báo bất đồng bộ (asynchronous notification) gửi đến một process. Giống như interrupt nhưng ở cấp process.

\`\`\`
Process A gửi signal SIGTERM đến Process B:
→ Kernel đặt signal vào "pending" của B
→ Khi B được scheduler cấp CPU, trước khi thực thi lệnh tiếp theo,
  kernel kiểm tra pending signal → gọi signal handler của B
\`\`\`

**Một số signal phổ biến:**

| Signal | Số | Hành vi mặc định | Ý nghĩa |
|--------|----|--------------------|---------|
| SIGINT | 2 | Terminate | Ctrl+C — yêu cầu kết thúc lịch sự |
| SIGKILL | 9 | Terminate (force) | Không thể bị bắt/ignore — kill ngay |
| SIGTERM | 15 | Terminate | Yêu cầu kết thúc — có thể bắt để cleanup |
| SIGSEGV | 11 | Core dump | Vi phạm bộ nhớ (null pointer, ...) |
| SIGCHLD | 17 | Ignore | Child process kết thúc — thông báo cho parent |
| SIGUSR1/2 | 10/12 | Terminate | Tùy ứng dụng định nghĩa |

### 5.2. Signal Handler

\`\`\`c
#include <signal.h>

void handler(int signum) {
    // Thực hiện cleanup
    printf("Received SIGTERM, cleaning up...\\n");
    exit(0);
}

int main() {
    signal(SIGTERM, handler);  // đăng ký handler
    // ... chạy bình thường ...
    pause();  // chờ signal
}
\`\`\`

⚠ **Hạn chế của Signal:** Signal chỉ truyền được **loại sự kiện** (số hiệu signal), không mang data. Không thể gửi "giá trị" qua signal. Nếu cần truyền data, dùng pipe hoặc shared memory.

---

## 6. So sánh tổng hợp các cơ chế IPC

| Cơ chế | Tốc độ | Data | Hướng | Phù hợp |
|--------|--------|------|-------|---------|
| **Shared Memory** | Nhanh nhất (RAM) | Bất kỳ | 2 chiều | Data lớn, latency thấp, streaming |
| **Pipe ẩn danh** | Nhanh (kernel buffer) | Byte stream | 1 chiều | Shell pipeline, parent-child |
| **FIFO (Named pipe)** | Nhanh | Byte stream | 1 chiều | Daemon ↔ client trên cùng máy |
| **Message Queue** | Trung bình | Discrete message | 2 chiều | Task queue, event system, nhiều reader |
| **Signal** | Nhanh (async) | Chỉ số hiệu | Gửi → nhận | Notification, shutdown, interrupt |
| **Socket** | Trung bình | Byte stream / Datagram | 2 chiều | IPC qua mạng, client-server |

### 6.1. Khi nào chọn cơ chế nào?

| Tình huống | Cơ chế đề xuất | Lý do |
|-----------|---------------|-------|
| Shell pipeline | Anonymous pipe | Đơn giản, parent tạo child, 1 chiều |
| Truyền video frame giữa 2 process | Shared memory | Latency thấp, data lớn, không muốn copy |
| Web server → worker pool | Message queue | Nhiều worker, discrete task, priority |
| Daemon lắng nghe lệnh từ CLI | Named FIFO hoặc Unix socket | Không cần quan hệ cha-con |
| Graceful shutdown | SIGTERM | Async notification, không cần data |
| Client ↔ Server qua mạng | TCP socket | Cross-machine, reliable |

---

## Bài tập

**Bài 1 — Walk-through Pipe.**

Shell thực thi \`echo "hello" | wc -c\`. Mô tả từng bước hệ thống tạo pipe, fork, redirect và exec. Kết quả cuối của \`wc -c\` là gì? (Lưu ý: \`wc -c\` đếm số byte, "hello\\n" có bao nhiêu byte?)

---

**Bài 2 — Chọn cơ chế IPC.**

Cho mỗi tình huống sau, chọn cơ chế IPC phù hợp nhất và giải thích tại sao:

(a) Ứng dụng video streaming: process decode H.264 → process render OpenGL, cần truyền frame 1920×1080×3 bytes mỗi 16ms.

(b) Web crawler: 1 process manager phân phối URL cho 10 worker process. Worker gửi kết quả về cho manager.

(c) Daemon monitoring server, muốn reload config mà không restart service.

(d) Process A cần biết khi nào Process B (con) kết thúc để cleanup resource.

---

**Bài 3 — Pipe backpressure.**

Pipe buffer kernel thường là 64KB. Nếu Producer ghi dữ liệu nhanh hơn Consumer đọc:

(a) Điều gì xảy ra khi buffer đầy?

(b) Tính toán: nếu Consumer đọc với tốc độ 1MB/s và Producer ghi 10MB/s, sau bao nhiêu millisecond buffer đầy?

(c) Backpressure có hại hay có lợi? Giải thích trong ngữ cảnh shell pipeline.

---

**Bài 4 — Shared Memory + Đồng bộ.**

Hai process A và B dùng shared memory để trao đổi một biến \`counter\`. A tăng \`counter\` 1 triệu lần, B cũng tăng 1 triệu lần. Không có đồng bộ.

(a) Kết quả cuối của \`counter\` là bao nhiêu? Tại sao không phải 2 triệu?

(b) Đề xuất cơ chế đồng bộ phù hợp.

(c) Nếu dùng file-based lock (\`flock()\`), có vấn đề gì so với semaphore?

---

## Lời giải chi tiết

**Bài 1 — Walk-through \`echo "hello" | wc -c\`**

**Bước 1:** Shell gọi \`pipe(fd)\` → tạo \`fd[0]\` (đọc) và \`fd[1]\` (ghi) — 1 pipe.

**Bước 2:** Shell fork lần 1 → Child 1 sẽ là \`echo\`:
\`\`\`
Child 1 (echo):
  dup2(fd[1], STDOUT_FILENO)  // stdout → write end của pipe
  close(fd[0]); close(fd[1])
  execve("/bin/echo", ["echo","hello"], ...)
  // echo ghi "hello\\n" (6 byte) vào stdout = pipe
\`\`\`

**Bước 3:** Shell fork lần 2 → Child 2 sẽ là \`wc\`:
\`\`\`
Child 2 (wc):
  dup2(fd[0], STDIN_FILENO)   // stdin ← read end của pipe
  close(fd[0]); close(fd[1])
  execve("/usr/bin/wc", ["wc","-c"], ...)
  // wc đọc từ stdin = pipe → đếm byte → in ra
\`\`\`

**Bước 4:** Shell đóng \`fd[0]\` và \`fd[1]\` (parent không dùng pipe trực tiếp).

**Bước 5:** \`echo\` ghi \`"hello\\n"\` = 6 byte vào pipe. \`wc -c\` đọc, đếm 6 byte, in \`6\`.

\`echo "hello"\` tạo output \`hello\\n\` — 5 chữ + 1 newline = **6 byte**. Kết quả: \`wc -c\` in \`6\`.

---

**Bài 2 — Chọn cơ chế IPC**

**(a) Video streaming, frame 1920×1080×3 = ~6MB mỗi 16ms:**
**Shared Memory.** Lý do: 6MB/frame × 60fps = 360MB/s throughput. Copy qua pipe hay socket sẽ tạo thêm 1 lần copy trong kernel. Shared memory zero-copy — decode process ghi trực tiếp vào buffer, render process đọc cùng địa chỉ vật lý. Dùng semaphore để sync đọc/ghi.

**(b) 1 manager + 10 worker:**
**Message Queue.** Lý do: nhiều sender (worker → manager) và nhiều receiver (manager → bất kỳ worker nào rảnh). Message queue hỗ trợ priority (ưu tiên task khẩn). Worker chỉ \`mq_receive\` khi rảnh — tự nhiên load balancing. Pipe sẽ phức tạp hơn khi có 10 consumer.

**(c) Daemon reload config không restart:**
**Signal (SIGHUP).** Lý do: SIGHUP là convention Unix chuẩn để báo daemon reload config. Daemon đăng ký handler cho SIGHUP; khi nhận, đọc lại config file và cập nhật. Không cần truyền data — chỉ cần "trigger" event.

**(d) Parent biết khi nào child kết thúc:**
**Signal (SIGCHLD) + \`waitpid()\`.** Lý do: khi child process kết thúc, kernel tự động gửi SIGCHLD cho parent. Parent đăng ký handler SIGCHLD và gọi \`waitpid(-1, &status, WNOHANG)\` để collect exit status và giải phóng zombie. Đây là cơ chế chuẩn Unix.

---

**Bài 3 — Pipe backpressure**

**(a)** Khi pipe buffer đầy (64KB), lệnh \`write()\` của Producer **bị block** — hệ thống tạm dừng Producer cho đến khi Consumer đọc ra đủ chỗ. Producer không bị lỗi, không mất dữ liệu — chỉ bị "pause" tự nhiên.

**(b)** Tốc độ ghi = 10MB/s, đọc = 1MB/s. Net accumulation = 10 - 1 = 9MB/s. Buffer 64KB = 0.0625MB. Thời gian đầy = 0.0625MB / 9MB/s ≈ **0.007 giây = 7 millisecond**.

**(c)** Backpressure **có lợi** trong shell pipeline. Nó tự điều chỉnh tốc độ hai process mà không cần code thêm. Ví dụ: \`cat large_file | grep pattern | sort\` — cat đọc file rất nhanh, nhưng sort cần đọc hết mới sort được → pipe backpressure tự nhiên làm cat chậm lại, không tràn bộ nhớ. Hệ thống tự cân bằng.

---

**Bài 4 — Shared Memory + Đồng bộ**

**(a)** Kết quả thường nhỏ hơn 2.000.000 (có thể 1.000.000 đến 2.000.000, không xác định). Lý do: \`counter++\` trong C cũng là LOAD/ADD/STORE ở cấp máy — race condition giống lesson 05. Hai process xen kẽ LOAD → cả hai thấy cùng giá trị → ghi đè → mất cập nhật.

**(b)** Dùng **POSIX named semaphore** (\`sem_open\`, \`sem_wait\`, \`sem_post\`) hoặc **POSIX mutex trong shared memory** (\`pthread_mutex_t\` với \`PTHREAD_PROCESS_SHARED\`). Semaphore đơn giản hơn để implement, mutex trong shared memory linh hoạt hơn (có thể kết hợp với condition variable).

\`\`\`c
// Mutex trong shared memory:
pthread_mutex_attr_t attr;
pthread_mutexattr_setpshared(&attr, PTHREAD_PROCESS_SHARED);
pthread_mutex_init(&shm->mutex, &attr);

// Process A và B:
pthread_mutex_lock(&shm->mutex);
shm->counter++;
pthread_mutex_unlock(&shm->mutex);
\`\`\`

**(c)** File-based lock (\`flock()\`) có vấn đề:
- **Overhead**: mỗi lock/unlock cần syscall liên quan đến file I/O — chậm hơn semaphore trong RAM.
- **Stale lock**: nếu process crash khi giữ \`flock()\`, trên Linux lock sẽ được release tự động khi fd đóng. Nhưng nếu logic không cleanup → lock file còn nhưng không ai release.
- **Không hỗ trợ priority**: semaphore kernel có queue đợi hiệu quả hơn việc các process liên tục retry \`flock()\`.

Semaphore POSIX tốt hơn cho IPC in-memory: thao tác nguyên tử, OS-managed queue, nhanh hơn flock.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 02 — Process](../lesson-02-process/): virtual address space, fork() — giải thích vì sao process không chia sẻ bộ nhớ.
  - [Lesson 05 — Đồng bộ hoá](../lesson-05-synchronization/) và [Lesson 06 — Semaphore](../lesson-06-semaphores-classic-problems/): bảo vệ shared memory khỏi race condition.
  - [Lesson 07 — Deadlock](../lesson-07-deadlock/): tránh deadlock khi nhiều process dùng chung tài nguyên IPC.
- Mở rộng:
  - [Networking — Bài học về TCP/IP](../../../Networking/): socket IPC qua mạng — TCP, UDP, HTTP protocol.

---

## 📝 Tổng kết Lesson 08

1. **IPC cần thiết** vì mỗi process có virtual address space riêng — không thể đọc bộ nhớ nhau mà không có cơ chế OS hỗ trợ.
2. **Shared Memory** = nhanh nhất, phù hợp data lớn. Nhưng cần tự đồng bộ (semaphore/mutex).
3. **Pipe** = kênh 1 chiều, byte stream, backpressure tự nhiên. Anonymous: cha-con; Named (FIFO): bất kỳ process. Shell pipeline \`ls | grep\` dùng anonymous pipe + fork + dup2 + execve.
4. **Message Queue** = discrete message, nhiều sender/receiver, lọc theo priority. Phù hợp task queue, event system.
5. **Signal** = async notification, chỉ mang số hiệu sự kiện, không mang data. Dùng cho shutdown, reload config, child exit.
6. **Socket** = IPC linh hoạt nhất, hoạt động cả trên cùng máy (Unix socket) lẫn qua mạng (TCP/IP).
7. **Chọn cơ chế:** data lớn → shared memory; pipeline → pipe; nhiều worker → message queue; notification → signal; cross-network → socket.
`;
