// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/03-Advanced-Modern/lesson-08-capstone-mini-scheduler/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Capstone: Mini-Scheduler

## Mục tiêu học tập

Bài này là **bài tổng hợp** toàn lĩnh vực OperatingSystems. Sau bài này bạn sẽ:

- Nhìn lại và kết nối toàn bộ mạch kiến thức: process → scheduling → memory → I/O → multi-core.
- Mô tả pseudo-code của một **mô phỏng OS thu nhỏ** đầy đủ: scheduler + memory management + thống kê.
- Hiểu cách các thành phần OS tương tác trong một hệ thống tích hợp.
- Tính được các chỉ số hiệu năng: throughput, average waiting time, CPU utilization, page fault rate.

## Kiến thức tiền đề

Toàn bộ lĩnh vực OperatingSystems:
- **Tầng 1 — Foundations:** Process, CPU Scheduling, Deadlock, IPC, Synchronization.
- **Tầng 2 — Memory & Storage:** Virtual Memory, Paging, Disk Scheduling, File System.
- **Tầng 3 — Advanced:** Virtualization, Containers, Security, SMP, Real-time, Boot, Observability.

---

## 1. Mạch xuyên suốt OperatingSystems

### 1.1. Ba câu hỏi trung tâm

💡 **Trực giác — OS là "người quản lý" phần cứng:**
OS giải quyết 3 câu hỏi cơ bản:
1. **Ai được chạy? Khi nào?** → Scheduling (CPU management).
2. **Bộ nhớ ở đâu? Bao nhiêu?** → Virtual memory, paging (Memory management).
3. **Dữ liệu đọc/ghi từ đâu? Theo thứ tự nào?** → I/O subsystem, file system.

Mọi khái niệm đã học đều là câu trả lời cho một trong ba câu hỏi này, hoặc giải quyết vấn đề nảy sinh khi nhiều process cùng cạnh tranh tài nguyên.

### 1.2. Bản đồ kiến thức

<svg viewBox="0 0 600 320" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Kiến trúc mini-OS: user space (process) gọi system call vào kernel gồm CPU Scheduler, Memory Manager, I/O Subsystem trên HAL, dưới là CPU, RAM/SWAP, Disk/NIC">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="20.0" y="16.0" width="560.0" height="50.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="300.0" y="34.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">USER SPACE</text>
  <text x="300.0" y="52.0" fill="#475569" font-size="10" text-anchor="middle">[Process A]  [Process B]  [Process C]  [Thread…]</text>
  <line x1="300.0" y1="68.0" x2="300.0" y2="92.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="308.0" y="84.0" fill="#475569" font-size="10" text-anchor="start">system calls</text>
  <rect x="20.0" y="94.0" width="560.0" height="196.0" rx="8" fill="#f8fafc" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="300.0" y="112.0" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">KERNEL</text>
  <rect x="40.0" y="124.0" width="166.0" height="54.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="123.0" y="154.8" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">CPU Sched.</text>
  <text x="123.0" y="166.0" fill="#475569" font-size="8" text-anchor="middle">FCFS/SJF/RR/Priority · Real-time · SMP/NUMA</text>
  <line x1="123.0" y1="180.0" x2="123.0" y2="208.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="220.0" y="124.0" width="166.0" height="54.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="303.0" y="154.8" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">Mem Manager</text>
  <text x="303.0" y="166.0" fill="#475569" font-size="8" text-anchor="middle">Virtual Mem · Paging · Swap · TLB</text>
  <line x1="303.0" y1="180.0" x2="303.0" y2="208.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="400.0" y="124.0" width="166.0" height="54.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="483.0" y="154.8" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">I/O Subsystem</text>
  <text x="483.0" y="166.0" fill="#475569" font-size="8" text-anchor="middle">VFS · Block · Driver · Scheduler</text>
  <line x1="483.0" y1="180.0" x2="483.0" y2="208.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="40.0" y="210.0" width="526.0" height="36.0" rx="6" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="1.8"/>
  <text x="303.0" y="232.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">HAL (Hardware Abstraction Layer)</text>
  <line x1="123.0" y1="246.0" x2="123.0" y2="268.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="63.0" y="270.0" width="120.0" height="30.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="123.0" y="288.7" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="700">CPU cores</text>
  <line x1="303.0" y1="246.0" x2="303.0" y2="268.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="243.0" y="270.0" width="120.0" height="30.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="303.0" y="288.7" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="700">RAM / SWAP</text>
  <line x1="483.0" y1="246.0" x2="483.0" y2="268.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="423.0" y="270.0" width="120.0" height="30.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="483.0" y="288.7" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="700">Disk / NIC</text>
</svg>

### 1.3. Vòng đời một process

<svg viewBox="0 0 740 180" style="max-width:740px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Vòng đời process trong mini-scheduler: fork tạo CREATED → READY → RUNNING; RUNNING bị preempt về READY, chờ I/O sang WAITING rồi I/O done về READY; kết thúc TERMINATED">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="16.0" y="50.0" width="100.0" height="34.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="66.0" y="70.8" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="700">CREATED</text>
  <line x1="118.0" y1="67.0" x2="166.0" y2="67.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="142.0" y="60.0" fill="#475569" font-size="9" text-anchor="middle">fork()</text>
  <rect x="168.0" y="50.0" width="90.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="213.0" y="70.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">READY</text>
  <line x1="260.0" y1="67.0" x2="318.0" y2="67.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="320.0" y="50.0" width="100.0" height="34.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="370.0" y="70.8" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">RUNNING</text>
  <line x1="422.0" y1="67.0" x2="480.0" y2="67.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="451.0" y="60.0" fill="#475569" font-size="9" text-anchor="middle">I/O req</text>
  <rect x="482.0" y="50.0" width="100.0" height="34.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="532.0" y="70.8" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">WAITING</text>
  <path d="M 370.0,84.0 L 370.0,120.0 L 213.0,120.0 L 213.0,86.0" fill="none" stroke="#b45309" stroke-width="1.8" marker-end="url(#aro)"/>
  <text x="292.0" y="134.0" fill="#b45309" font-size="10" text-anchor="middle">preempted</text>
  <path d="M 532.0,84.0 L 532.0,150.0 L 230.0,150.0 L 230.0,88.0" fill="none" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#arb)"/>
  <text x="380.0" y="164.0" fill="#1d4ed8" font-size="10" text-anchor="middle">I/O done</text>
  <line x1="370.0" y1="48.0" x2="370.0" y2="26.0" stroke="#1a202c" stroke-width="1.8"/>
  <path d="M 370.0,26.0 L 600.0,26.0 L 600.0,67.0 L 586.0,67.0" fill="none" stroke="#1a202c" stroke-width="1.8"/>
  <rect x="600.0" y="50.0" width="120.0" height="34.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="660.0" y="70.8" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">TERMINATED</text>
</svg>

**Giao thoa giữa các hệ con:**
- CPU Scheduler quyết định READY → RUNNING.
- Page fault (Memory Manager) kéo process sang WAITING.
- I/O completion (I/O subsystem) đưa process từ WAITING về READY.
- Scheduler quyết định ai được chạy tiếp theo.

📝 **Tóm tắt mục 1:**
- OS quản lý 3 tài nguyên: CPU (scheduling), Memory (virtual memory/paging), I/O (drivers/VFS).
- Các hệ con tương tác chặt chẽ — page fault từ memory manager ảnh hưởng scheduling.
- Process đi qua vòng đời CREATED → READY ↔ RUNNING → WAITING → TERMINATED.

---

## 2. Thiết kế Mini-Scheduler

### 2.1. Cấu trúc dữ liệu

**Process Control Block (PCB) đơn giản hóa:**

\`\`\`go
type Process struct {
    PID         int
    Name        string
    ArrivalTime int    // thời điểm đến
    BurstTime   int    // tổng CPU cần (= tổng CPU burst)
    Priority    int    // 1 = cao nhất
    MemPages    int    // số trang bộ nhớ cần

    // Runtime state
    State        State  // READY, RUNNING, WAITING, DONE
    RemainingBurst int  // CPU burst còn lại
    StartTime    int    // lần đầu được chạy
    FinishTime   int    // hoàn thành
    WaitTime     int    // tổng thời gian chờ CPU
    PagesLoaded  []int  // trang nào đang ở RAM (indices)
    PageFaults   int    // số lần page fault
}

type State int
const (
    READY   State = iota
    RUNNING
    WAITING
    DONE
)
\`\`\`

**Memory Manager:**
\`\`\`go
type MemoryManager struct {
    TotalFrames   int       // tổng số frame RAM
    FreeFrames    []int     // danh sách frame trống
    FrameOwner    []int     // frame[i] thuộc PID nào (-1 = free)
    Policy        string    // "FIFO", "LRU"
    AccessHistory []int     // lịch sử truy cập frame (cho LRU)
}
\`\`\`

### 2.2. Vòng lặp mô phỏng (Event-driven)

\`\`\`
for t = 0; t < max_time; t++ {
    
    // 1. Kiểm tra process mới đến
    for each p where p.ArrivalTime == t {
        allocate_memory(p)    // cấp trang RAM, ghi nhận page fault nếu cần
        p.State = READY
        add_to_ready_queue(p)
    }
    
    // 2. Nếu có process đang RUNNING hoàn thành hoặc bị preempt
    if running != nil {
        running.RemainingBurst--
        if running.RemainingBurst == 0 {
            running.FinishTime = t + 1
            running.State = DONE
            release_memory(running)
            running = nil
        } else if algorithm == "RR" && quantum_expired {
            running.State = READY
            add_to_ready_queue(running)
            running = nil
        }
    }
    
    // 3. Scheduler chọn process tiếp theo
    if running == nil && ready_queue not empty {
        running = select_next(ready_queue, algorithm)
        running.State = RUNNING
        if running.StartTime < 0 {
            running.StartTime = t
        }
    }
    
    // 4. Cập nhật thống kê
    for each p in READY queue {
        p.WaitTime++
    }
    record_gantt(t, running)
}
\`\`\`

### 2.3. Thuật toán lập lịch

**FCFS (First Come First Served):**
\`\`\`
select_next(queue) = process có ArrivalTime nhỏ nhất (first in queue)
\`\`\`

**SJF (Shortest Job First — non-preemptive):**
\`\`\`
select_next(queue) = process có RemainingBurst nhỏ nhất
// Nếu bằng nhau: ưu tiên ArrivalTime nhỏ hơn
\`\`\`

**Round-Robin (RR):**
\`\`\`
select_next(queue) = head của queue (FIFO order)
// Preempt sau quantum Q đơn vị thời gian
// Process bị preempt → về cuối queue
\`\`\`

**Priority:**
\`\`\`
select_next(queue) = process có Priority nhỏ nhất (1 = cao nhất)
// Preemptive: nếu process mới có priority cao hơn đang chạy → preempt ngay
\`\`\`

### 2.4. Memory management đơn giản

**Demand paging:** Mỗi process cần \`p.MemPages\` trang. Khi process vào READY:
- Cấp phát từ \`FreeFrames\`.
- Nếu không đủ frame → **page replacement** (FIFO hoặc LRU) — lấy frame từ process khác đang READY (simulated swap).
- Mỗi lần page replacement = 1 page fault.

**Walk-through tính page fault:**
Giả sử: 6 frames tổng, 3 process cần 3/3/4 trang.
- P1 đến: cấp 3 frames → 3 frames còn trống.
- P2 đến: cấp 3 frames → 0 frame trống.
- P3 đến: cần 4 frames, trống 0 → phải evict 4 frames từ P1/P2 → 4 page faults.
- Khi P1 chạy lại: 3 trang đã bị evict → 3 page faults thêm.

### 2.5. Thống kê

\`\`\`
Throughput         = số process hoàn thành / tổng thời gian
Avg. Waiting Time  = Σ p.WaitTime / số process
Avg. Turnaround    = Σ (p.FinishTime - p.ArrivalTime) / số process
CPU Utilization    = số đơn vị thời gian CPU bận / tổng thời gian
Page Fault Rate    = tổng page faults / tổng lần truy cập trang
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Mini-scheduler này khác OS thật ở chỗ nào?"* — Rất nhiều. OS thật có: timer interrupt (preemption phần cứng), DMA, nhiều CPU, hệ thống file thật, mạng, security, hàng trăm syscall. Mini-scheduler này chỉ mô phỏng logic scheduling và memory allocation — đủ để hiểu cơ chế cốt lõi.
- *"SJF cần biết burst time trước — thực tế thường không biết?"* — Đúng. SJF chỉ khả thi khi biết trước burst (batch jobs). OS thật dùng MLFQ (Multi-Level Feedback Queue) để estimate burst từ lịch sử.
- *"Vì sao Round-Robin quantum nhỏ không phải lúc nào cũng tốt?"* — Quantum quá nhỏ → nhiều context switch → overhead cao, throughput giảm. Quantum quá lớn → giống FCFS, latency cao cho process ngắn.

📝 **Tóm tắt mục 2:**
- PCB chứa: PID, arrival, burst, priority, mem pages, runtime stats.
- Event loop: xử lý arrival → update running → schedule next → update stats.
- Bốn thuật toán: FCFS (FIFO), SJF (min burst), RR (quantum), Priority.
- Memory: demand paging với FIFO/LRU page replacement.
- Thống kê: throughput, avg wait, avg turnaround, CPU util, page fault rate.

---

## 3. Ví dụ tính tay

### 3.1. Walk-through FCFS

**Workload:**

| PID | Arrival | Burst | Priority | Pages |
|-----|---------|-------|----------|-------|
| P1 | 0 | 5 | 2 | 2 |
| P2 | 1 | 3 | 1 | 3 |
| P3 | 2 | 2 | 3 | 1 |

**Timeline FCFS (non-preemptive):**
\`\`\`
t=0: P1 đến → chạy P1
t=1: P2 đến (chờ), P1 tiếp tục
t=2: P3 đến (chờ), P1 tiếp tục
t=5: P1 xong. Chạy P2 (đến trước)
t=8: P2 xong. Chạy P3
t=10: P3 xong.
\`\`\`

**Gantt chart:** \`[P1][P1][P1][P1][P1][P2][P2][P2][P3][P3]\`
\`\`\`
t: 0  1  2  3  4  5  6  7  8  9  10
   P1 P1 P1 P1 P1 P2 P2 P2 P3 P3
\`\`\`

**Thống kê:**
- P1: Wait $= 0$, Turnaround $= 5 - 0 = 5$.
- P2: Wait $= 5 - 1 = 4$, Turnaround $= 8 - 1 = 7$.
- P3: Wait $= 8 - 2 = 6$, Turnaround $= 10 - 2 = 8$.
- **Avg Wait** $= \\frac{0+4+6}{3} = 3.33$ đơn vị.
- **Avg Turnaround** $= \\frac{5+7+8}{3} = 6.67$ đơn vị.
- **Throughput** $= \\frac{3}{10} = 0.3$ process/đơn vị.
- **CPU Utilization** $= \\frac{10}{10} = 100\\%$.

### 3.2. Walk-through Round-Robin (Q=2)

Cùng workload, RR với quantum=2:

\`\`\`
t=0: P1 đến, chạy P1
t=1: P2 đến (queue: P2)
t=2: quantum P1 hết, P1 còn 3 burst. Queue: P2, P1. Chạy P2
t=3: P3 đến (queue: P1, P3)
t=4: quantum P2 hết, P2 còn 1 burst. Queue: P1, P3, P2. Chạy P1
t=6: quantum P1 hết, P1 còn 1 burst. Queue: P3, P2, P1. Chạy P3
t=8: P3 xong. Queue: P2, P1. Chạy P2
t=9: P2 xong (1 burst). Queue: P1. Chạy P1
t=10: P1 xong (1 burst).
\`\`\`

**Gantt:** \`P1 P1 P2 P2 P1 P1 P3 P3 P2 P1\`
\`\`\`
t: 0  1  2  3  4  5  6  7  8  9  10
   P1 P1 P2 P2 P1 P1 P3 P3 P2 P1
\`\`\`

**Thống kê:**
- P1: Finish=10, Wait $= 10 - 0 - 5 = 5$, Turnaround $= 10$.
- P2: Finish=9, Wait $= 9 - 1 - 3 = 5$, Turnaround $= 8$.
- P3: Finish=8, Wait $= 8 - 2 - 2 = 4$, Turnaround $= 6$.
- **Avg Wait** $= \\frac{5+5+4}{3} = 4.67$.
- **Avg Turnaround** $= \\frac{10+8+6}{3} = 8.0$.

**So sánh FCFS vs RR (Q=2):**
| | FCFS | RR (Q=2) |
|--|------|----------|
| Avg Wait | 3.33 | 4.67 |
| Avg Turnaround | 6.67 | 8.0 |
| CPU Util | 100% | 100% |
| Fairness | Kém (P3 chờ lâu) | Tốt hơn |

FCFS có avg wait thấp hơn trong ví dụ này vì P1 dài được chạy ngay, không bị gián đoạn. RR phân phối CPU công bằng hơn (không có process nào chờ >5 đơn vị).

---

## Bài tập mở rộng

**Bài 1.** Thêm process vào workload: P4 (arrival=3, burst=4, priority=1, pages=2). Chạy lại FCFS và tính Avg Wait, Avg Turnaround.

**Bài 2.** Với cùng 4 process, chạy Priority scheduling (preemptive, số nhỏ = ưu tiên cao). Vẽ Gantt chart. P1=priority 2, P2=priority 1, P3=priority 3, P4=priority 1.

**Bài 3.** Hệ thống có 4 frames RAM. Workload 3 process: P1(pages=3), P2(pages=3), P3(pages=2). Khi cả 3 đến cùng lúc (t=0), tính số page fault theo chính sách FIFO replacement.

**Bài 4.** (Thiết kế) Thêm tính năng I/O burst vào mini-scheduler: mỗi process có danh sách \`[(cpu_burst, io_burst)]\` xen kẽ. Khi CPU burst xong, process sang WAITING \`io_burst\` đơn vị, sau đó về READY. Mô tả cách sửa vòng lặp event và PCB.

---

## Lời giải chi tiết

### Bài 1

Thêm P4 (arrival=3, burst=4): FCFS chạy theo thứ tự đến:

**Timeline:**
- P1 chạy t=0..5 (arrive=0). Xong t=5.
- P2 chạy t=5..8 (arrive=1). Xong t=8.
- P3 chạy t=8..10 (arrive=2). Xong t=10.
- P4 chạy t=10..14 (arrive=3). Xong t=14.

**Thống kê:**
- P1: Wait $= 0$, Turnaround $= 5$.
- P2: Wait $= 5 - 1 = 4$, Turnaround $= 7$.
- P3: Wait $= 8 - 2 = 6$, Turnaround $= 8$.
- P4: Wait $= 10 - 3 = 7$, Turnaround $= 11$.

**Avg Wait** $= \\frac{0+4+6+7}{4} = 4.25$.
**Avg Turnaround** $= \\frac{5+7+8+11}{4} = 7.75$.
**Throughput** $= \\frac{4}{14} \\approx 0.286$ process/đơn vị.

---

### Bài 2

**Priority preemptive** (P1=2, P2=1, P3=3, P4=1; thứ tự đến: P1@0, P2@1, P3@2, P4@3):

- t=0: P1 đến, chạy P1 (priority 2, không ai khác).
- t=1: P2 đến (priority 1 < 2) → **preempt P1**! Chạy P2.
- t=2: P3 đến (priority 3 > 1) → không preempt. P2 tiếp.
- t=3: P4 đến (priority 1 = P2's priority) → tie-break: giữ P2 đang chạy.
- t=4: P2 xong (burst=3, chạy từ t=1). P4 đến (priority 1 = P2). Trong queue có P4(p=1), P1(p=2), P3(p=3). P4 thắng.
- t=8: P4 xong. Chạy P1 (priority 2 < P3's 3).
- t=12: P1 xong (còn 4 burst: đã chạy 1 đơn vị trước khi bị preempt, chạy thêm 4 từ t=8→12). Chạy P3.
- t=14: P3 xong.

**Gantt:** \`P1 P2 P2 P2 P4 P4 P4 P4 P1 P1 P1 P1 P3 P3\`

Wait time (tổng thời gian chờ trong READY queue):
- P1: chờ t=1..8 $= 7$, Finish=12, Turnaround=12.
- P2: chờ 0, Finish=4, Turnaround=3.
- P3: chờ t=2..12 $= 10$, Finish=14, Turnaround=12.
- P4: chờ t=3..4 $= 1$, Finish=8, Turnaround=5.

**Avg Wait** $= \\frac{7+0+10+1}{4} = 4.5$.
**Avg Turnaround** $= \\frac{12+3+12+5}{4} = 8.0$.

---

### Bài 3

**4 frames, 3 process: P1(3 trang), P2(3 trang), P3(2 trang). Tất cả đến t=0.**

FIFO replacement: frame được evict là frame nạp lâu nhất.

- t=0: P1 cần 3 trang → cấp frames [0,1,2] → 3 page faults (cold start, không có gì trong RAM).
- P2 cần 3 trang, còn 1 frame trống [3] → evict 2 frame của P1 (FIFO: frame 0 và 1, cũ nhất) → 1 cold + 2 evict = 3 page faults. Frames: [2(P1), 3(P1 evicted→P2), 0(P2), 1(P2)].

Thực ra khi tất cả đến t=0 đồng thời, allocation theo thứ tự P1→P2→P3:

- P1: 3 page faults (cold), dùng frame 0,1,2.
- P2: cần 3, còn 1 frame (frame 3) → evict 2 của P1 (FIFO: frame 0, frame 1) → P2 dùng frame 3, 0, 1. **3 page faults** (2 eviction + 1 cold).
- P3: cần 2, còn 0 frame → evict 2 của P1 hoặc P2 (FIFO: frame 2 của P1, frame 3 của P2) → P3 dùng frame 2, 3. **2 page faults**.

**Tổng: 3 + 3 + 2 = 8 page faults**.

---

### Bài 4

**Thêm I/O burst — thiết kế:**

**Sửa PCB:**
\`\`\`go
type Process struct {
    // ... existing fields ...
    Bursts      []BurstPair  // [(cpu1,io1), (cpu2,io2), ...]
    BurstIdx    int          // đang ở burst pair nào
    IORemaining int          // I/O burst còn lại (khi đang WAITING)
}

type BurstPair struct {
    CPU int
    IO  int  // 0 = không có I/O sau CPU burst này (kết thúc)
}
\`\`\`

**Sửa vòng lặp:**
\`\`\`
for t = 0; t < max_time; t++ {

    // Xử lý I/O wait: đếm ngược IORemaining
    for each p in WAITING_IO {
        p.IORemaining--
        if p.IORemaining == 0 {
            p.BurstIdx++  // chuyển sang CPU burst tiếp theo
            p.RemainingBurst = p.Bursts[p.BurstIdx].CPU
            p.State = READY
            add_to_ready_queue(p)
        }
    }

    // Xử lý running như cũ...
    if running.RemainingBurst == 0 {
        if running.BurstIdx < len(running.Bursts)-1 && running.Bursts[running.BurstIdx].IO > 0 {
            // Còn I/O burst → sang WAITING
            running.IORemaining = running.Bursts[running.BurstIdx].IO
            running.State = WAITING_IO
            add_to_io_wait(running)
            running = nil
        } else {
            // Xong hẳn
            running.FinishTime = t+1
            running.State = DONE
            release_memory(running)
            running = nil
        }
    }

    // Schedule và stats như cũ...
}
\`\`\`

Thiết kế này phản ánh chính xác **CPU-I/O burst cycle** mà các hệ thống thực tế có — process không chỉ CPU-intensive mà luôn xen kẽ với I/O.

---

## Liên kết và bài tiếp theo

Bạn đã hoàn thành toàn bộ lĩnh vực **OperatingSystems**. Có thể tiếp tục với:

- **Networking**: mạng máy tính, giao thức TCP/IP, routing — [xem Networking/](../../Networking/).
- **DataStructures**: cấu trúc dữ liệu nền tảng (heap, hash table, graph) — [xem DataStructures/](../../DataStructures/).
- **Java**: lập trình hướng đối tượng, concurrency trong Java — [xem Java/](../../Java/).

**Ôn tập nhanh:**
- Tầng 1 Foundations: [Lesson 01](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/) | [Lesson 02](../../01-Foundations-Processes/lesson-02-cpu-scheduling/) | [Lesson 03](../../01-Foundations-Processes/lesson-03-synchronization-mutex/) | [Lesson 04](../../01-Foundations-Processes/lesson-04-deadlock/)
- Tầng 2 Memory & Storage: [Lesson 05](../../02-Memory-Storage/lesson-05-virtual-memory-paging/) | [Lesson 06](../../02-Memory-Storage/lesson-06-page-replacement/) | [Lesson 07](../../02-Memory-Storage/lesson-07-io-disk-scheduling/) | [Lesson 08](../../02-Memory-Storage/lesson-08-file-system/)
- Tầng 3 Advanced: [L01](../lesson-01-virtualization/) | [L02](../lesson-02-containers/) | [L03](../lesson-03-os-security/) | [L04](../lesson-04-smp-multicore-scheduling/) | [L05](../lesson-05-realtime-scheduling/) | [L06](../lesson-06-boot-init-drivers/) | [L07](../lesson-07-observability-performance/)

---

## 📝 Tổng kết Lesson 08 (và toàn lĩnh vực)

**Capstone — những điểm then chốt:**
- OS = quản lý 3 tài nguyên: CPU, Memory, I/O — mọi concept đều xoay quanh đây.
- Process vòng đời: CREATED → READY ↔ RUNNING → WAITING → DONE. Scheduler quyết định READY→RUNNING.
- FCFS đơn giản nhưng không công bằng (convoy effect). SJF tối ưu avg wait nhưng cần biết burst trước. RR công bằng nhưng overhead context switch. Priority linh hoạt nhưng có starvation.
- Memory = demand paging + page replacement (FIFO/LRU). Page fault làm chậm process (disk I/O).
- Thrashing khi quá nhiều process cạnh tranh RAM → working set model/process throttling.
- Quan sát hệ thống: \`top\` (tổng quan) → \`vmstat\` (memory/swap) → \`iostat\` (I/O) → \`perf\`/\`strace\` (per-process).
- Real-time: deadline là ràng buộc cứng (RMS/EDF). Boot: firmware→kernel→systemd→user space. Driver: kernel module nạp động.
`;
