# Lesson 07 — Quan sát & Hiệu năng (Observability & Performance)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích tại sao **quan sát hệ thống đang chạy** là kỹ năng không thể thiếu của lập trình viên hệ thống.
- Hiểu cơ chế `/proc` và `/sys` — cách kernel phơi bày thông tin nội bộ dưới dạng file.
- Đọc và phân tích output của các công cụ: `top`, `vmstat`, `iostat`, `strace`, `perf`.
- Giải thích **load average** (1/5/15 phút) bằng số cụ thể.
- Chẩn đoán nút thắt cổ chai (bottleneck): CPU-bound, I/O-bound, hay memory-bound.
- Phân biệt **context switch/s**, **CPU%**, **%wa** (I/O wait), **thrashing**.

## Kiến thức tiền đề

- [Lesson 01 — OS, Kernel & Syscall](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): system call, kernel space.
- [Lesson 02 — CPU Scheduling](../../01-Foundations-Processes/lesson-02-cpu-scheduling/): process states, scheduler.
- [Lesson 07 — I/O & Disk Scheduling](../../02-Memory-Storage/lesson-07-io-disk-scheduling/): I/O stack, scheduling.

---

## 1. Tại sao cần quan sát hệ thống?

### 1.1. Vấn đề

💡 **Trực giác — Bác sĩ và bệnh nhân:**
Bạn không thể chữa bệnh mà không đo nhiệt độ, huyết áp, xét nghiệm máu. Hệ thống máy tính cũng vậy: "chậm" là triệu chứng, không phải chẩn đoán. Để biết **vì sao** chậm, cần đo đạc:
- CPU có đang bận không?
- Đang chờ đĩa không?
- Bộ nhớ có đủ không?
- Có process nào đang tranh chấp tài nguyên không?

**Observability (khả năng quan sát)** = khả năng hiểu trạng thái nội tại của hệ thống từ output bên ngoài (metrics, logs, traces).

### 1.2. Ba nguồn thông tin chính

| Nguồn | Công cụ | Dữ liệu |
|-------|---------|---------|
| `/proc` (filesystem ảo) | `cat /proc/cpuinfo`, `/proc/meminfo`, `/proc/<pid>/status` | CPU, memory, process info |
| `/sys` (sysfs) | `cat /sys/block/sda/stat`, perf events | Device stats, kernel params |
| Syscall tracing | `strace`, `perf trace` | System calls của process |

### 1.3. `/proc` — Cửa sổ vào kernel

`/proc` là **virtual filesystem** — không có file thật nào được ghi ra đĩa. Kernel tạo nội dung "on-the-fly" mỗi khi bạn đọc:

```bash
# Thông tin CPU
cat /proc/cpuinfo         # model, cores, frequency, cache

# Thông tin memory
cat /proc/meminfo         # MemTotal, MemFree, Cached, SwapUsed...

# Load average
cat /proc/loadavg         # 0.52 0.38 0.21 2/341 12345
                          # 1min 5min 15min running/total lastPID

# Thông tin một process cụ thể (PID=1234)
cat /proc/1234/status     # Name, State, VmRSS (resident memory)...
cat /proc/1234/maps       # Virtual memory mappings
cat /proc/1234/fd/        # File descriptors đang mở

# Thống kê I/O
cat /proc/diskstats       # Reads/writes/sectors per disk
```

📝 **Tóm tắt mục 1:**
- Quan sát = đo trước khi kết luận. "Chậm" không phải chẩn đoán.
- `/proc` là cửa sổ vào kernel — virtual filesystem, không tốn đĩa.
- Ba nguồn: `/proc`, `/sys`, syscall tracing.

---

## 2. Load Average — Chỉ số tổng hợp

### 2.1. Load average là gì?

💡 **Trực giác — Hàng chờ thu ngân:**
Chuỗi siêu thị đo "tải" của hàng thu ngân bằng số người đang chờ trung bình. Load average CPU cũng vậy: **số process đang chạy HOẶC chờ tài nguyên (CPU/disk) tại một thời điểm**.

Lệnh `uptime` hoặc `top` hiển thị:
```
load average: 2.15, 1.87, 1.23
              ↑1min ↑5min ↑15min
```

**Ý nghĩa:**
- Trên hệ thống 1 CPU: load=1.0 nghĩa là CPU được dùng 100% (1 process luôn sẵn sàng chạy).
- Load=2.0 trên 1 CPU: có 2 process muốn chạy, trung bình 1 process phải đợi.
- Trên hệ thống 4 CPU: load=4.0 nghĩa là đang dùng hết công suất (4 process chạy đồng thời).

**Quy tắc ngón tay cái:** Load / số CPU:
- < 0.7: thoải mái
- 0.7 – 1.0: bận nhưng ổn
- 1.0 – 2.0: bắt đầu quá tải
- > 2.0: quá tải, process phải chờ lâu

### 2.2. Walk-through đọc load average

**Ví dụ:** Máy chủ 4 nhân (4 CPU), `uptime` cho thấy: `load average: 5.20, 3.40, 1.60`.

Phân tích:
- **1 phút: $\frac{5.20}{4} = 1.30$** → hiện tại đang quá tải 130% — có 5 process sẵn sàng, chỉ 4 CPU → 1 process phải đợi.
- **5 phút: $\frac{3.40}{4} = 0.85$** → 5 phút qua, tải ổn (85% capacity).
- **15 phút: $\frac{1.60}{4} = 0.40$** → 15 phút trước, hệ thống nhàn rỗi.

**Kết luận:** Tải tăng đột ngột trong 5 phút gần đây. Cần kiểm tra process nào đang tiêu thụ CPU.

### 2.3. Cẩn thận với load average trên Linux

⚠ **Đặc điểm quan trọng của Linux:** Load average trên Linux tính cả **process đang chờ I/O không interruptible (D state)**. Vì vậy:
- Load cao có thể do CPU-intensive OR do I/O-bound (disk chậm).
- Cần nhìn thêm `%wa` (I/O wait) trong `top` để phân biệt.

**So sánh OS:** BSD/macOS: load average chỉ tính CPU-runnable processes. Linux: CPU + I/O wait.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Load average 0.5 nhưng ứng dụng vẫn chậm?"* — Load thấp có thể do ứng dụng đang chờ network (blocked I/O), không tốn CPU nhưng không xử lý được. Hoặc single-threaded app bị ghim vào 1 core.
- *"Load tính theo thuật toán gì?"* — Kernel dùng **exponential moving average** với hằng số thời gian 1, 5, 15 phút. Cụ thể: cứ mỗi 5 giây, kernel đếm số process runnable/uninterruptible → cập nhật 3 giá trị theo EMA.

📝 **Tóm tắt mục 2:**
- Load average = số process đang chạy hoặc chờ tài nguyên (trung bình theo thời gian).
- Đọc load: load / số CPU. >1.0 = bắt đầu quá tải.
- Linux load tính cả I/O wait (D state) — cần kết hợp %wa để phân biệt CPU vs I/O bound.

---

## 3. Các công cụ quan sát

### 3.1. `top` và `htop`

Lệnh `top` là dashboard real-time của hệ thống:

```
top - 14:23:05 up 5 days,  3:12,  2 users,  load average: 1.23, 0.87, 0.65
Tasks: 241 total,   1 running, 240 sleeping,   0 stopped,   0 zombie
%Cpu(s): 23.1 us,  4.2 sy,  0.0 ni, 68.4 id, 3.8 wa,  0.1 hi,  0.4 si,  0.0 st
MiB Mem :  7840.0 total,   823.4 free,  4231.2 used,  2785.4 buff/cache
MiB Swap:  2048.0 total,  1923.6 free,   124.4 used.  3104.2 avail Mem
```

**Giải thích từng trường %Cpu:**
| Field | Ý nghĩa |
|-------|---------|
| `us` (user) | CPU dùng bởi user-space process |
| `sy` (system) | CPU dùng bởi kernel (syscalls, drivers) |
| `ni` (nice) | CPU dùng bởi process có nice value > 0 |
| `id` (idle) | CPU nhàn rỗi |
| `wa` (iowait) | CPU đang chờ I/O hoàn thành |
| `hi` (hardware interrupt) | CPU phục vụ hardware interrupts |
| `si` (software interrupt) | CPU phục vụ software interrupts / softirq |
| `st` (steal) | CPU bị hypervisor "đánh cắp" (VM) |

**Ví dụ đọc ảnh hệ thống trên:**
- `23.1 us` — user process dùng 23% CPU.
- `3.8 wa` — 3.8% thời gian CPU idle **do chờ I/O** → có thể có I/O bottleneck.
- `68.4 id` — CPU nhàn rỗi 68% → CPU không phải bottleneck chính.

### 3.2. `vmstat` — Thống kê virtual memory và I/O

```bash
vmstat 2 5    # mỗi 2 giây, lấy 5 lần
```

Output mẫu:
```
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  1  124416  823424  12345 2785400   0    8   512  1024  523 1842 23  4 69  4  0
 1  0  124416  823120  12348 2785680   0    0   128   256  412 1523 18  3 76  3  0
```

**Các cột quan trọng:**
- `r`: số process đang READY (runnable queue). >CPU cores → CPU bound.
- `b`: số process đang block (D state — uninterruptible I/O wait).
- `si/so`: swap-in / swap-out (MB/s). Si+So > 0 liên tục → RAM thiếu, thrashing.
- `bi/bo`: block-in / block-out (blocks/s). Đọc/ghi đĩa.
- `in`: interrupts/s. Cao bất thường → network hoặc I/O rất busy.
- `cs`: context switches/s. Cao → nhiều process cạnh tranh CPU.
- `wa`: % CPU idle do I/O wait.

### 3.3. `iostat` — Thống kê I/O theo thiết bị

```bash
iostat -xz 2 3    # extended stats, bỏ qua thiết bị không active
```

Output:
```
Device  r/s    w/s    rMB/s  wMB/s  await  r_await  w_await  util
sda    45.2   120.3   2.14   8.72   18.3   12.1     21.4     87.3%
nvme0  892.0  450.0  112.0   56.0    0.8    0.6      1.1      34.2%
```

**Các cột quan trọng:**
- `r/s`, `w/s`: reads/writes per second.
- `await` (ms): thời gian trung bình từ lúc request đến lúc hoàn thành (queue time + service time).
- `util%`: % thời gian thiết bị đang xử lý request. >80% → I/O bottleneck.

**Ví dụ trên:** `sda` có `util=87.3%` và `await=18.3ms` → đĩa SATA này gần đến giới hạn. `nvme0` `util=34.2%` → còn nhiều dư địa.

### 3.4. `strace` — Theo dõi system call

```bash
strace -p <PID>               # attach vào process đang chạy
strace -e trace=read,write ls # chỉ trace syscall read và write
strace -c ls                  # thống kê syscall (count + time)
```

Output `-c`:
```
% time     seconds  usecs/call     calls    errors syscall
 52.41    0.000523          15        34           read
 22.10    0.000221          10        22      22    openat
 15.31    0.000153           5        30           fstat
  ...
```

**Ứng dụng chẩn đoán:**
- App chậm nhưng CPU thấp? → `strace` xem app đang `sleep()` / `poll()` / `read()` chờ gì.
- App gọi `write()` nhiều file nhỏ? → Gộp lại để giảm syscall overhead.
- `ENOENT` nhiều lần? → App đang tìm file không tồn tại → lãng phí.

### 3.5. `perf` — Performance counters

```bash
perf stat -p <PID>            # hardware counters (cycles, cache miss, branch...)
perf top                      # live profiling như top nhưng per-function
perf record -g ./app          # record call graph
perf report                   # phân tích flame graph
```

Output `perf stat`:
```
     10,234,456,789  cycles                  #  3.12 GHz
      8,129,344,210  instructions            #  0.79  insn per cycle
        234,123,456  cache-misses            #  8.34% of all cache refs
         12,345,678  branch-misses           #  3.21% of all branches
```

**IPC (Instructions Per Cycle) = 0.79** → thấp hơn lý tưởng (2.0+) → có thể do cache miss hoặc memory-bound.

⚠ **Lỗi thường gặp:**
- Dùng `top` rồi kết luận ngay "CPU bottleneck" mà không nhìn `%wa`. CPU 90% nhưng `wa=85%` nghĩa là CPU thực ra rảnh, chỉ đang ngồi chờ I/O.
- Nhìn 1 lần rồi kết luận — cần lấy nhiều mẫu theo thời gian vì workload có thể biến đổi.
- Nhầm "load average cao" với "CPU bottleneck" — trên Linux, load bao gồm cả I/O wait.

🔁 **Dừng lại tự kiểm tra:**

`vmstat` cho thấy: `r=0, b=8, wa=72`, `si=50, so=50`. Chẩn đoán hệ thống đang gặp vấn đề gì?

<details>
<summary>Đáp án</summary>

- `b=8`: có 8 process đang uninterruptible I/O wait → đĩa rất chậm.
- `wa=72`: CPU idle 72% do chờ I/O → CPU không phải bottleneck.
- `si=50, so=50`: có swap-in và swap-out liên tục → RAM đang thiếu, kernel đang swap.
- `r=0`: không có process chờ CPU.

Chẩn đoán: **RAM không đủ → thrashing** (swap liên tục) + I/O bottleneck từ đĩa chậm. Giải pháp: thêm RAM, xem process nào dùng nhiều RAM (`top -o RES`), hoặc giảm workload.

</details>

📝 **Tóm tắt mục 3:**
- `top`: dashboard real-time — `%wa` cao → I/O wait, `us` cao → CPU bound.
- `vmstat`: context switch, swap, block I/O — `b` và `si/so` là dấu hiệu memory pressure.
- `iostat`: thống kê thiết bị — `util>80%`, `await` cao → I/O bottleneck.
- `strace`: xem process gọi syscall gì — debug chính xác nguyên nhân chậm.
- `perf`: hardware counters — IPC thấp, cache miss cao → memory bound.

---

## 4. Chẩn đoán bottleneck

### 4.1. Phân loại bottleneck

| Loại | Triệu chứng | Công cụ xác nhận | Giải pháp |
|------|------------|-----------------|-----------|
| **CPU-bound** | `us`+`sy` cao (>80%), `r` queue lớn, load/CPU >1 | `perf top` xem function nào dùng nhiều CPU | Tối ưu thuật toán, thêm CPU, song song hóa |
| **I/O-bound** | `wa` cao (>20%), `b` queue lớn, `iostat util` >80% | `iostat -x`, `iotop` | SSD thay HDD, tăng page cache, tối ưu query |
| **Memory-bound** | `si/so` > 0, cache miss cao (perf), `free` thấp | `vmstat`, `perf stat` cache-miss | Thêm RAM, tối ưu data locality |
| **Network-bound** | `ss -s` nhiều connections, `sar -n DEV` bandwidth cao | `iftop`, `nethogs` | Tăng bandwidth, CDN, cache |

### 4.2. Thrashing

💡 **Trực giác:**
Thrashing = tình trạng OS dành phần lớn thời gian swap trang (page fault liên tục) thay vì chạy process thật. Giống người làm việc nhưng 90% thời gian bị gián đoạn để tìm hồ sơ.

**Vòng luẩn quẩn:**
```
RAM đầy → page fault → kernel swap trang ra đĩa → 
→ process cần trang đó → lại swap vào → 
→ swap process khác ra → ... (lặp vô tận)
```

**Nhận diện thrashing:**
- `vmstat`: `si` + `so` > 0 liên tục (số MB/s).
- Load average rất cao nhưng throughput thực tế thấp.
- Máy phản hồi rất chậm mặc dù CPU có vẻ bận.

### 4.3. Context switch/s

**Context switch** = kernel lưu state process hiện tại, nạp state process khác. Hai loại:
- **Voluntary**: process tự từ bỏ CPU (`sleep()`, `read()` block, `sched_yield()`).
- **Involuntary**: kernel preempt process (time quantum hết, process cao ưu tiên đến).

```bash
vmstat 1 | awk '{print $12}'    # cột cs — context switch/s
pidstat -w -p <PID> 1           # cs/s của từng process
```

**Context switch/s cao** (>10,000/s trên server): không phải luôn là vấn đề, nhưng cần xem:
- `cswch/s` (voluntary) cao → process đang block nhiều (I/O intensive → bình thường).
- `nvcswch/s` (involuntary) cao → nhiều process cạnh tranh CPU → có thể cần tăng quantum hoặc giảm process.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Bao nhiêu context switch/s thì là vấn đề?"* — Không có ngưỡng tuyệt đối. 10,000/s trên web server với 1,000 concurrent request là bình thường. Vấn đề khi cs/s tăng đột ngột kèm latency tăng.
- *"perf có overhead không?"* — Có, nhưng nhỏ khi dùng sampling (~1-5%). `perf stat` overhead ~1%. `strace` overhead lớn hơn (~30-50%) vì phải intercept mọi syscall.

📝 **Tóm tắt mục 4:**
- CPU-bound: `us`/`sy` cao, giải pháp: tối ưu thuật toán/thêm CPU.
- I/O-bound: `wa` cao, `iostat util` >80%, giải pháp: SSD/cache.
- Memory-bound: thrashing (`si/so` >0), giải pháp: thêm RAM.
- Context switch/s cao: cần phân biệt voluntary (I/O) vs involuntary (CPU contention).

---

## Bài tập

**Bài 1.** Hệ thống 8-core hiển thị `load average: 12.5, 8.2, 4.1`. Phân tích:
- (a) Load 1 phút tính theo %capacity là bao nhiêu?
- (b) Load đang tăng hay giảm so với 15 phút trước?
- (c) Bước đầu tiên cần làm để chẩn đoán?

**Bài 2.** `top` hiển thị: `%Cpu: 12.0 us, 3.0 sy, 0.0 ni, 12.0 id, 71.0 wa, 2.0 hi, 0.0 si`.
- (a) Bottleneck chính là gì?
- (b) Công cụ nào nên chạy tiếp theo để xác nhận?
- (c) Có bao nhiêu % CPU thực sự "bận" (không idle)?

**Bài 3.** `vmstat 1` liên tục cho thấy `si=200, so=180` (MB/s). Tại sao đây là dấu hiệu nguy hiểm và cần làm gì?

**Bài 4.** `strace -c ./myapp` cho kết quả: `read` chiếm 78% thời gian, 50,000 lần gọi. Đây là vấn đề gì? Đề xuất giải pháp.

---

## Lời giải chi tiết

### Bài 1

**(a) Load 1 phút theo %capacity:**
Load $= \frac{12.5}{8} = 1.5625$ (8 cores) → đang dùng **156%** capacity → có $12.5 - 8 = 4.5$ process phải chờ CPU tại mỗi thời điểm.

**(b) Xu hướng:**
1min=12.5 > 5min=8.2 > 15min=4.1 → Load đang **tăng nhanh** trong 15 phút qua. Nếu không can thiệp, tình trạng sẽ tiếp tục xấu đi.

**(c) Bước đầu:**
Chạy `top` để xem:
- Process nào đang chiếm CPU nhiều nhất (`%CPU` column).
- `%wa` có cao không (I/O wait hay CPU tranh chấp?).
- Sau đó: `ps aux --sort=-%cpu | head -20` để confirm.

---

### Bài 2

**(a) Bottleneck chính:**
`wa = 71%` — CPU đang idle 71% thời gian do chờ I/O. Đây là **I/O bottleneck** nghiêm trọng. CPU (`us=12%`) không phải vấn đề.

**(b) Công cụ tiếp theo:**
```bash
iostat -xz 2 5         # xem thiết bị nào có util% cao và await cao
iotop                  # xem process nào đang đọc/ghi nhiều nhất
```

**(c) CPU % thực sự "bận":**
100% - idle = 100% - 12% = **88% "bận"**. Nhưng `wa=71%` trong số đó là "idle do chờ I/O" — CPU thật sự xử lý code chỉ có: `us + sy + hi + si = 12 + 3 + 2 + 0 = 17%`. Còn lại 71% là CPU ngồi chờ đĩa.

---

### Bài 3

**Giải thích:**
`si=200 MB/s` (swap-in) và `so=180 MB/s` (swap-out) liên tục = **thrashing nghiêm trọng**. Kernel đang di chuyển 200 MB/s dữ liệu từ đĩa vào RAM (để đáp ứng page fault) trong khi đồng thời đẩy 180 MB/s ra đĩa (để nhường chỗ). Đĩa cơ (HDD) thường chỉ có tốc độ 50-150 MB/s → I/O đang bị bão hòa hoàn toàn.

**Hậu quả:** Hệ thống trở nên gần như unusable — mọi operation cần RAM đều phải đợi đĩa.

**Cần làm ngay:**
1. Tìm process đang dùng nhiều RAM nhất: `ps aux --sort=-%mem | head -10` hoặc `top -o %MEM`.
2. Kill hoặc restart process gây ra áp lực RAM (nếu có thể).
3. Giải pháp dài hạn: thêm RAM, giảm swappiness (`sysctl vm.swappiness=10`), hoặc cấu hình OOM killer ưu tiên.

---

### Bài 4

**Vấn đề:**
50,000 lần `read()` chiếm 78% thời gian → rất nhiều **small reads**. Mỗi `read()` là một syscall → context switch user→kernel→user. Nếu mỗi lần chỉ đọc vài byte, overhead syscall chiếm phần lớn thời gian thay vì đọc dữ liệu thật.

**Xác nhận:** Thêm `-e trace=read` và in kích thước mỗi lần đọc:
```bash
strace -e read -e read=all ./myapp 2>&1 | grep "read(" | awk '{print $NF}'
```

**Giải pháp:**
1. **Buffered reading**: thay vì `read(fd, buf, 1)` gọi 50,000 lần → dùng `fread()` (C library đã buffer), hoặc tự buffer với `read(fd, buf, 4096)`.
2. **mmap**: map file vào virtual memory — không cần syscall read, CPU tự page fault khi cần.
3. **Tăng buffer size**: nếu đang dùng `BufferedReader` Java/Python, tăng buffer từ 512 byte lên 8KB+.

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo:** [Lesson 08 — Capstone: Mini-Scheduler](../lesson-08-capstone-mini-scheduler/) — tổng hợp toàn lĩnh vực OperatingSystems.
- **Bài trước:** [Lesson 06 — Boot, Init & Driver](../lesson-06-boot-init-drivers/).
- **Liên quan:** [Lesson 01 — OS, Kernel & Syscall](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/) — nền tảng syscall và kernel.

---

## 📝 Tổng kết Lesson 07

- **Observability**: đo trước khi kết luận. `top`, `vmstat`, `iostat`, `strace`, `perf` là bộ công cụ thiết yếu.
- **Load average**: $\text{load}/\text{CPU}$ — $\leq 0.7$ thoải mái, $> 1.0$ bắt đầu quá tải. Linux bao gồm cả I/O wait.
- **%wa (iowait)**: CPU idle do chờ I/O. Cao → I/O bottleneck, không phải CPU bottleneck.
- **Thrashing**: si/so liên tục → RAM thiếu, kernel swap không ngừng → hệ thống gần unusable.
- **Context switch/s**: cao chưa chắc xấu; phân biệt voluntary (I/O) vs involuntary (CPU tranh chấp).
- **Quy trình chẩn đoán**: CPU% → I/O wait → swap → per-process → syscall-level → hardware counter.
