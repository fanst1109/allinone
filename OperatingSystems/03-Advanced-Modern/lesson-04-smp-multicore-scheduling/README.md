# Lesson 04 — Lập lịch đa nhân & NUMA

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích **SMP (Symmetric Multi-Processing)** — từ 1 core lên nhiều core thay đổi gì trong lập lịch.
- Phân biệt **hàng đợi chung (global run queue)** và **hàng đợi mỗi CPU (per-CPU run queue)** — ưu nhược điểm.
- Mô tả **cân bằng tải (load balancing)** — khi nào, cơ chế nào Linux dùng để di chuyển task giữa CPU.
- Giải thích **CPU affinity** — vì sao giữ tiến trình ở cùng một core lại tốt hơn (cache nóng).
- Tóm tắt **cache coherence** ở mức sơ lược (MESI protocol) — tại sao di chuyển tiến trình giữa core có chi phí.
- Phân tích **NUMA** — truy cập bộ nhớ không đồng đều, walk-through chênh lệch độ trễ local vs remote.

## Kiến thức tiền đề

- [Tầng 1 — Lesson 04: CPU Scheduling](../../01-Foundations-Processes/lesson-04-cpu-scheduling/): FCFS, SJF, Round Robin — lập lịch đơn core. Bài này mở rộng lên đa core.
- [Tầng 2 — Lesson 02: Paging](../../02-Memory-Storage/lesson-02-paging/): địa chỉ ảo/vật lý — nền tảng hiểu tại sao "cache nóng" quan trọng với NUMA.

---

## 1. SMP — Từ 1 Core lên Nhiều Core

### 1.1. Bài toán đặt ra

💡 **Trực giác — Nhà hàng một bếp vs nhiều bếp:**
Nhà hàng 1 bếp trưởng: dù khách đông, chỉ có 1 người nấu — bottleneck rõ ràng. Mở rộng lên 8 bếp trưởng: thông lượng tăng lên đến 8 lần — nhưng cần "người điều phối" phân chia việc hợp lý, tránh 7 bếp nghỉ ngơi trong khi 1 bếp quá tải.

**SMP (Symmetric Multi-Processing)** = hệ thống nhiều CPU/core dùng chung bộ nhớ vật lý, dùng chung bus.

<svg viewBox="0 0 600 240" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Kiến trúc SMP 4 core: RAM chia sẻ qua System Bus, mỗi core có L1/L2 riêng, L3 cache chia sẻ">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="150.0" y="16.0" width="300.0" height="36.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="300.0" y="37.9" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">RAM (chia sẻ)</text>
  <line x1="300.0" y1="52.0" x2="300.0" y2="80.0" stroke="#1a202c" stroke-width="2"/>
  <text x="308.0" y="70.0" fill="#475569" font-size="10" text-anchor="start">System Bus</text>
  <line x1="80.0" y1="80.0" x2="520.0" y2="80.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="80.0" y1="80.0" x2="80.0" y2="100.0" stroke="#1a202c" stroke-width="1.6"/>
  <rect x="30.0" y="102.0" width="100.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="122.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Core 0</text>
  <rect x="30.0" y="142.0" width="100.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="80.0" y="160.5" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">L1/L2 cache</text>
  <line x1="226.7" y1="80.0" x2="226.7" y2="100.0" stroke="#1a202c" stroke-width="1.6"/>
  <rect x="176.7" y="102.0" width="100.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="226.7" y="122.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Core 1</text>
  <rect x="176.7" y="142.0" width="100.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="226.7" y="160.5" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">L1/L2 cache</text>
  <line x1="373.4" y1="80.0" x2="373.4" y2="100.0" stroke="#1a202c" stroke-width="1.6"/>
  <rect x="323.4" y="102.0" width="100.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="373.4" y="122.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Core 2</text>
  <rect x="323.4" y="142.0" width="100.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="373.4" y="160.5" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">L1/L2 cache</text>
  <line x1="520.1" y1="80.0" x2="520.1" y2="100.0" stroke="#1a202c" stroke-width="1.6"/>
  <rect x="470.1" y="102.0" width="100.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="520.1" y="122.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Core 3</text>
  <rect x="470.1" y="142.0" width="100.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="520.1" y="160.5" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">L1/L2 cache</text>
  <rect x="80.0" y="186.0" width="440.0" height="32.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="300.0" y="205.8" fill="#7c3aed" font-size="11" text-anchor="middle" font-weight="700">L3 Cache (chia sẻ)</text>
  <line x1="80.0" y1="172.0" x2="80.0" y2="186.0" stroke="#94a3b8" stroke-width="1.4"/>
  <line x1="226.7" y1="172.0" x2="226.7" y2="186.0" stroke="#94a3b8" stroke-width="1.4"/>
  <line x1="373.4" y1="172.0" x2="373.4" y2="186.0" stroke="#94a3b8" stroke-width="1.4"/>
  <line x1="520.1" y1="172.0" x2="520.1" y2="186.0" stroke="#94a3b8" stroke-width="1.4"/>
</svg>

**Vấn đề mới khi lên đa core:**
1. **Ai chạy task nào trên core nào?** — cần thuật toán lập lịch đa core.
2. **Task di chuyển giữa core có chi phí gì?** — cache trạng thái bị mất.
3. **Bộ nhớ có đồng nhất từ mọi core không?** — trên NUMA server thì không.
4. **Dữ liệu chia sẻ giữa các core giữ nhất quán thế nào?** — cache coherence.

### 1.2. So sánh Lập lịch đơn core vs đa core

| Tiêu chí | Đơn core | Đa core (SMP) |
|----------|----------|--------------|
| Hàng đợi | 1 run queue | 1 global hoặc nhiều per-CPU queue |
| Race condition | Không | Cần lock/spinlock truy cập run queue |
| Load balance | Không cần | Cần — tránh core thừa/thiếu task |
| Cache | Đơn giản | Di chuyển task → cache miss tăng |
| Scalability | Bị giới hạn | Scale tuyến tính (với lập lịch tốt) |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao không gắn mỗi task cố định vào một core?"* — Nếu workload không đồng đều (core A có 10 task, core B có 0 task), core B nhàn rỗi trong khi người dùng chờ task trên core A → cần load balancing.
- *"Tại sao không di chuyển task thật thường xuyên để cân bằng tải?"* — Di chuyển task = mất cache nóng (cold cache miss tốn ~100–300 cycle so với L1 hit ~4 cycle). Phải cân đối giữa tải đều và cache hiệu năng.
- *"Kernel Linux dùng cách nào?"* — CFS (Completely Fair Scheduler) dùng per-CPU run queue với load balancing định kỳ và triggered migration. Xem mục 3.

📝 **Tóm tắt mục 1:**
- SMP = nhiều core dùng chung RAM, cùng OS, cùng kernel.
- Lập lịch đa core phức tạp hơn đơn core: race condition, cache hiệu năng, load balance.
- Hai thiết kế chính: global queue (đơn giản, có bottleneck) vs per-CPU queue (hiệu năng cao, cần load balancing).

---

## 2. Hàng đợi Chung vs Hàng đợi Mỗi CPU

### 2.1. Global Run Queue — Thiết kế đơn giản

**Thiết kế:** Tất cả task sẵn sàng (TASK_RUNNING) nằm trong một hàng đợi duy nhất. Mỗi core, khi rảnh, lấy task từ hàng đợi chung này.

<svg viewBox="0 0 600 150" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Global run queue: 7 task T1–T7 xếp chung một hàng đợi, Core 0, 1, 2 cùng lấy task từ đó">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="80.0" y="16.0" width="440.0" height="54.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="1.8"/>
  <text x="300.0" y="34.0" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">Global Run Queue</text>
  <rect x="100.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="125.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T1</text>
  <rect x="158.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="183.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T2</text>
  <rect x="216.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="241.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T3</text>
  <rect x="274.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="299.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T4</text>
  <rect x="332.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="357.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T5</text>
  <rect x="390.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="415.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T6</text>
  <rect x="448.0" y="40.0" width="50.0" height="24.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="473.0" y="55.5" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">T7</text>
  <line x1="160.0" y1="100.0" x2="160.0" y2="72.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="115.0" y="102.0" width="90.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="160.0" y="121.8" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Core 0</text>
  <line x1="300.0" y1="100.0" x2="300.0" y2="72.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="255.0" y="102.0" width="90.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="300.0" y="121.8" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Core 1</text>
  <line x1="440.0" y1="100.0" x2="440.0" y2="72.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="395.0" y="102.0" width="90.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="440.0" y="121.8" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Core 2</text>
</svg>

**Ưu điểm:**
- Cân bằng tải tự nhiên: core nào rảnh đều lấy task tiếp theo trong queue.
- Đơn giản để lập trình và debug.

**Nhược điểm:**
- **Lock contention**: Mỗi lần core lấy task hoặc thêm task vào queue, phải lock toàn bộ queue (spinlock). Trên hệ thống 64 core, 64 core tranh nhau lock → lock hotspot → bottleneck nghiêm trọng.
- Ví dụ số: 64 core × lấy task mỗi 4ms = 16,000 lần lock/giây. Mỗi lần lock ~100ns → 1.6ms/giây overhead chỉ cho locking.

**Dùng bởi:** Linux kernel 2.4 trở về trước — global lock "Big Kernel Lock" (BKL).

### 2.2. Per-CPU Run Queue — Thiết kế hiệu năng cao

**Thiết kế:** Mỗi CPU/core có một hàng đợi riêng (run queue riêng). Task được gắn vào queue của một core cụ thể.

```
Core 0 queue: [T1] [T2] [T3]
Core 1 queue: [T4] [T5]
Core 2 queue: [T6] [T7] [T8] [T9]
Core 3 queue: (trống)
```

**Ưu điểm:**
- Không cần lock toàn cục — mỗi core chỉ cần lock queue của chính mình.
- Cache thân thiện: task thường xuyên ở trên cùng một core → L1/L2 cache "nóng" (hot cache).
- Scalability tốt hơn nhiều.

**Nhược điểm:**
- Mất cân bằng tải tự nhiên: Core 3 trống trong khi Core 2 có 4 task.
- Cần cơ chế **load balancing** tích cực để di chuyển task giữa queue.

**Dùng bởi:** Linux CFS từ kernel 2.6 (O(1) scheduler và sau đó CFS).

### 2.3. Walk-through Mất cân bằng tải

Hệ thống 4 core, có 8 task với thời gian chạy còn lại:

<svg viewBox="0 0 640 600" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba kịch bản 8 task trên 4 core: không cân bằng tải (Core 3 rảnh, makespan 15ms), steal T8 (throughput tăng), balanced từ đầu (makespan 10ms)">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="16.0" y="16.0" fill="#1a202c" font-size="11" text-anchor="start" font-weight="700">Không load balancing — makespan 15ms</text>
  <text x="110.0" y="42.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="580.0" y="42.0" fill="#475569" font-size="10" text-anchor="middle">15ms</text>
  <line x1="227.5" y1="48.0" x2="227.5" y2="172.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="227.5" y="42.0" fill="#475569" font-size="9" text-anchor="middle">3.75</text>
  <line x1="345.0" y1="48.0" x2="345.0" y2="172.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="345.0" y="42.0" fill="#475569" font-size="9" text-anchor="middle">7.5</text>
  <line x1="462.5" y1="48.0" x2="462.5" y2="172.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="462.5" y="42.0" fill="#475569" font-size="9" text-anchor="middle">11.25</text>
  <line x1="110.0" y1="48.0" x2="110.0" y2="172.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="580.0" y1="48.0" x2="580.0" y2="172.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="70.0" fill="#475569" font-size="10" text-anchor="end">Core 0</text>
  <rect x="110.0" y="56.0" width="470.0" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="345.0" y="70.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T1 T2 T3</text>
  <text x="102.0" y="100.0" fill="#475569" font-size="10" text-anchor="end">Core 1</text>
  <rect x="110.0" y="86.0" width="313.3" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="266.7" y="100.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T4 T5</text>
  <text x="102.0" y="130.0" fill="#475569" font-size="10" text-anchor="end">Core 2</text>
  <rect x="110.0" y="116.0" width="470.0" height="20.0" rx="3" fill="#7c3aed" fill-opacity="0.85" stroke="#7c3aed" stroke-width="0"/>
  <text x="345.0" y="130.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T6 T7 T8</text>
  <text x="102.0" y="160.0" fill="#475569" font-size="10" text-anchor="end">Core 3</text>
  <rect x="110.0" y="146.0" width="0.3" height="20.0" rx="3" fill="#94a3b8" fill-opacity="0.85" stroke="#94a3b8" stroke-width="0"/>
  <text x="114.3" y="160.0" fill="#94a3b8" font-size="9" text-anchor="start">idle 15ms — lãng phí!</text>
  <text x="16.0" y="214.0" fill="#1a202c" font-size="11" text-anchor="start" font-weight="700">Steal T8 về Core 3 — makespan vẫn 15ms (Core 0 là bottleneck), nhưng throughput tăng</text>
  <text x="110.0" y="240.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="580.0" y="240.0" fill="#475569" font-size="10" text-anchor="middle">15ms</text>
  <line x1="227.5" y1="246.0" x2="227.5" y2="370.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="227.5" y="240.0" fill="#475569" font-size="9" text-anchor="middle">3.75</text>
  <line x1="345.0" y1="246.0" x2="345.0" y2="370.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="345.0" y="240.0" fill="#475569" font-size="9" text-anchor="middle">7.5</text>
  <line x1="462.5" y1="246.0" x2="462.5" y2="370.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="462.5" y="240.0" fill="#475569" font-size="9" text-anchor="middle">11.25</text>
  <line x1="110.0" y1="246.0" x2="110.0" y2="370.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="580.0" y1="246.0" x2="580.0" y2="370.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="268.0" fill="#475569" font-size="10" text-anchor="end">Core 0</text>
  <rect x="110.0" y="254.0" width="470.0" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="345.0" y="268.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T1 T2 T3</text>
  <text x="102.0" y="298.0" fill="#475569" font-size="10" text-anchor="end">Core 1</text>
  <rect x="110.0" y="284.0" width="313.3" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="266.7" y="298.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T4 T5</text>
  <text x="102.0" y="328.0" fill="#475569" font-size="10" text-anchor="end">Core 2</text>
  <rect x="110.0" y="314.0" width="313.3" height="20.0" rx="3" fill="#7c3aed" fill-opacity="0.85" stroke="#7c3aed" stroke-width="0"/>
  <text x="266.7" y="328.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T6 T7</text>
  <text x="102.0" y="358.0" fill="#475569" font-size="10" text-anchor="end">Core 3</text>
  <rect x="110.0" y="344.0" width="156.7" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="188.3" y="358.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T8</text>
  <text x="16.0" y="412.0" fill="#1a202c" font-size="11" text-anchor="start" font-weight="700">Balanced từ đầu — makespan 10ms (giảm 33%)</text>
  <text x="110.0" y="438.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="580.0" y="438.0" fill="#475569" font-size="10" text-anchor="middle">15ms</text>
  <line x1="227.5" y1="444.0" x2="227.5" y2="568.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="227.5" y="438.0" fill="#475569" font-size="9" text-anchor="middle">3.75</text>
  <line x1="345.0" y1="444.0" x2="345.0" y2="568.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="345.0" y="438.0" fill="#475569" font-size="9" text-anchor="middle">7.5</text>
  <line x1="462.5" y1="444.0" x2="462.5" y2="568.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="462.5" y="438.0" fill="#475569" font-size="9" text-anchor="middle">11.25</text>
  <line x1="110.0" y1="444.0" x2="110.0" y2="568.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="580.0" y1="444.0" x2="580.0" y2="568.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="466.0" fill="#475569" font-size="10" text-anchor="end">Core 0</text>
  <rect x="110.0" y="452.0" width="313.3" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="266.7" y="466.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T1 T2</text>
  <text x="102.0" y="496.0" fill="#475569" font-size="10" text-anchor="end">Core 1</text>
  <rect x="110.0" y="482.0" width="313.3" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="266.7" y="496.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T3 T4</text>
  <text x="102.0" y="526.0" fill="#475569" font-size="10" text-anchor="end">Core 2</text>
  <rect x="110.0" y="512.0" width="313.3" height="20.0" rx="3" fill="#7c3aed" fill-opacity="0.85" stroke="#7c3aed" stroke-width="0"/>
  <text x="266.7" y="526.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T5 T6</text>
  <text x="102.0" y="556.0" fill="#475569" font-size="10" text-anchor="end">Core 3</text>
  <rect x="110.0" y="542.0" width="313.3" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="266.7" y="556.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">T7 T8</text>
</svg>

⚠ **Lỗi thường gặp:** "Thêm core thì chương trình nhanh gấp đôi". Sai. Chỉ phần nào **song song** mới tăng tốc (Amdahl's Law: $\text{speedup} = \frac{1}{\text{serial} + \text{parallel}/N}$). Nếu 20% code là serial, tối đa speedup = 5x dù dùng bao nhiêu core.

📝 **Tóm tắt mục 2:**
- Global queue: đơn giản, cân bằng tải tự nhiên, nhưng lock contention bottleneck trên nhiều core.
- Per-CPU queue: hiệu năng cao, cache thân thiện, nhưng cần load balancing tích cực.
- Linux CFS dùng per-CPU queue với load balancing định kỳ — giải pháp hiện đại.

---

## 3. Load Balancing và CPU Affinity

### 3.1. Cơ chế Load Balancing trong Linux CFS

Linux CFS (Completely Fair Scheduler) dùng **work stealing** — core rảnh chủ động lấy (steal) task từ core bận nhất.

**Hai trigger load balancing:**

**1. Idle balance (ngay khi core rảnh):**
```
Core 3 hoàn thành task cuối → IDLE
   ↓
Kernel gọi: trigger_load_balance() ngay lập tức
Core 3 tìm core có queue dài nhất (vd: Core 0 có 3 task)
Core 3 steal task từ Core 0: T3 di chuyển Core 0 → Core 3
   ↓
Core 3 bắt đầu chạy T3, Core 0 còn T1 và T2
```

**2. Periodic balance (scheduler tick, thường mỗi 1ms):**
```
Mỗi 1ms (HZ=1000): scheduler_tick()
   ↓
Kiểm tra: load của core này so với trung bình các core?
Nếu imbalance > threshold → trigger load balancing
   ↓
Di chuyển task từ core bận nhất sang core ít bận
```

**Metric để quyết định steal:**
- Linux dùng **load weight** (không phải task count) — task với priority cao có weight cao hơn.
- Chỉ steal task "eligible": task không có CPU affinity cứng, không bị pin.

### 3.2. CPU Affinity — Giữ task ở một core

**CPU affinity** = ràng buộc tiến trình/thread chỉ chạy trên một tập CPU nhất định.

**Vì sao affinity quan trọng — Cache hot:**

Khi task chạy trên Core 0:
```
Task T1 đọc biến x, y, z:
  L1 cache Core 0: {x:42, y:100, z:7}  ← hot cache (latency ~4 cycle)
  RAM vật lý:       {x:42, y:100, z:7}

Task T1 bị migrate sang Core 1 (do load balancing):
  L1 cache Core 1: {} ← COLD! (không có x, y, z)
  → Phải load lại từ RAM: ~100–300 cycle mỗi cache miss
  → Mất ~10–50 µs chỉ để "làm ấm" cache mới
```

**Ví dụ cụ thể với số:**
- L1 cache hit: 4 cycle = ~1.3ns (ở 3 GHz)
- L2 cache hit: 12 cycle = ~4ns
- L3 cache hit: 30–40 cycle = ~13ns
- RAM access: 200–300 cycle = ~100ns (DRAM)
- Chênh lệch L1 hit vs RAM: **70x**!

Nếu task bị migrate, lần đầu chạy trên core mới: tất cả working set (~4 MB) phải load từ RAM hoặc L3 → overhead rất lớn.

**Đặt CPU affinity trong Linux:**

```bash
# Gắn process PID 1234 vào core 0 và 1:
taskset -cp 0,1 1234

# Khởi động process với affinity:
taskset -c 0,1 python3 worker.py

# Trong code C:
#include <sched.h>
cpu_set_t cpuset;
CPU_ZERO(&cpuset);
CPU_SET(0, &cpuset);  // chỉ core 0
sched_setaffinity(pid, sizeof(cpuset), &cpuset);
```

**Khi nào dùng affinity:**
- **Realtime system**: task realtime cần latency thấp → pin vào core riêng, isolate khỏi scheduler.
- **NUMA optimization**: pin task vào core thuộc NUMA node gần RAM mà task dùng (xem mục 5).
- **Cache partition**: nhiều worker thread, mỗi thread pin vào core riêng → không tranh L1/L2 cache.
- **Container/VM**: Kubernetes CPU requests/limits dùng cpuset cgroup để pin pod vào core.

⚠ **Lỗi thường gặp:** "Affinity mạnh luôn tốt hơn". Sai. Nếu task có affinity cứng vào core 0 nhưng core 0 quá tải, task phải chờ ngay cả khi core 1-7 rảnh. Affinity phải đi cùng với resource planning.

🔁 **Dừng lại tự kiểm tra:**

Hệ thống 4 core. Task T với CPU affinity cứng chỉ chạy trên Core 0. Tại thời điểm T được schedule:
- Core 0 đang chạy task khác, queue Core 0 còn 5 task.
- Core 1, 2, 3 đều rảnh.

Task T phải đợi bao lâu?

<details>
<summary>Đáp án</summary>
Task T phải đợi toàn bộ queue của Core 0 cạn (hoặc task trước đó bị preempt) — có thể vài mili-giây. Core 1, 2, 3 rảnh nhưng KHÔNG chạy T được vì T có CPU affinity cứng chỉ vào Core 0. Đây là lý do phải cẩn thận khi dùng hard affinity — đặc biệt khi workload biến động.
</details>

📝 **Tóm tắt mục 3:**
- Load balancing: idle balance (ngay khi core rảnh, work stealing) + periodic balance (mỗi 1ms kiểm tra).
- CPU affinity: giữ task ở core nhất định → cache hot → giảm latency. Tradeoff: nếu core quá tải, task phải chờ.
- Cache hot quantitative: L1 hit ~4 cycle vs RAM ~300 cycle → 75x difference → migration cost rất đáng kể.

---

## 4. Cache Coherence — Sơ lược

### 4.1. Vấn đề

Khi nhiều core dùng chung RAM nhưng có L1/L2 cache riêng, cùng một địa chỉ bộ nhớ có thể tồn tại trong cache của nhiều core cùng lúc. Nếu Core 0 ghi vào địa chỉ X, Core 1 đọc địa chỉ X — Core 1 có thấy giá trị mới không?

```
Ban đầu:  RAM[X] = 5
          Core 0 L1: X=5
          Core 1 L1: X=5

Core 0 ghi: X = 10
          Core 0 L1: X=10 (cập nhật)
          Core 1 L1: X=5  (CŨ — stale!)
          RAM[X]: X=5 (chưa cập nhật)
```

Đây là vấn đề **cache inconsistency** — đọc stale data là bug nghiêm trọng trong lập trình đa core.

### 4.2. Giao thức MESI — 4 trạng thái cache line

💡 **Trực giác:** Mỗi "dòng cache" (cache line, 64 byte) có một trạng thái được theo dõi bởi phần cứng. Các core phối hợp qua bus để giữ trạng thái nhất quán tự động.

| Trạng thái | Ý nghĩa |
|------------|---------|
| **M (Modified)** | Cache line chỉ có ở core này, và đã bị sửa đổi (khác RAM). Khi core khác muốn đọc, core này phải ghi về RAM trước. |
| **E (Exclusive)** | Cache line chỉ có ở core này, nhưng giống RAM. Core này có thể sửa mà không cần báo ai. |
| **S (Shared)** | Cache line có ở nhiều core, giống RAM. Mọi core đều đọc được. Nếu muốn ghi → phải invalidate các core khác trước. |
| **I (Invalid)** | Cache line không hợp lệ — phải load từ RAM hoặc core khác khi cần. |

**Walk-through giao thức MESI:**

<svg viewBox="0 0 722 184" style="max-width:722px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="MESI với biến X: Exclusive khi một mình đọc, Shared khi hai core đọc, Modified + invalidate khi ghi, writeback khi core khác đọc lại">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="16.0" y="14.0" width="690.0" height="26.0" rx="0" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="26.0" y="31.0" fill="#1d4ed8" font-size="9" text-anchor="start" font-weight="700">Bước</text>
  <text x="156.0" y="31.0" fill="#1d4ed8" font-size="9" text-anchor="start" font-weight="700">Hành động trên bus</text>
  <text x="421.0" y="31.0" fill="#1d4ed8" font-size="9" text-anchor="middle" font-weight="700">Core 0</text>
  <text x="551.0" y="31.0" fill="#1d4ed8" font-size="9" text-anchor="middle" font-weight="700">Core 1</text>
  <text x="661.0" y="31.0" fill="#1d4ed8" font-size="9" text-anchor="middle" font-weight="700">RAM</text>
  <rect x="16.0" y="40.0" width="690.0" height="26.0" rx="0" fill="#ffffff" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="26.0" y="57.0" fill="#1f2937" font-size="9" text-anchor="start">1. Khởi đầu</text>
  <text x="156.0" y="57.0" fill="#1f2937" font-size="9" text-anchor="start">—</text>
  <text x="421.0" y="57.0" fill="#94a3b8" font-size="9" text-anchor="middle">Invalid</text>
  <text x="551.0" y="57.0" fill="#94a3b8" font-size="9" text-anchor="middle">Invalid</text>
  <text x="661.0" y="57.0" fill="#1f2937" font-size="9" text-anchor="middle">X=5</text>
  <rect x="16.0" y="66.0" width="690.0" height="26.0" rx="0" fill="#f1f5f9" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="26.0" y="83.0" fill="#1f2937" font-size="9" text-anchor="start">2. Core 0 đọc X</text>
  <text x="156.0" y="83.0" fill="#1f2937" font-size="9" text-anchor="start">Read trên bus, RAM trả 5</text>
  <text x="421.0" y="83.0" fill="#15803d" font-size="9" text-anchor="middle">Exclusive · X=5</text>
  <text x="551.0" y="83.0" fill="#94a3b8" font-size="9" text-anchor="middle">Invalid</text>
  <text x="661.0" y="83.0" fill="#1f2937" font-size="9" text-anchor="middle">X=5</text>
  <rect x="16.0" y="92.0" width="690.0" height="26.0" rx="0" fill="#ffffff" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="26.0" y="109.0" fill="#1f2937" font-size="9" text-anchor="start">3. Core 1 đọc X</text>
  <text x="156.0" y="109.0" fill="#1f2937" font-size="9" text-anchor="start">Core 0 nghe bus → hạ Shared</text>
  <text x="421.0" y="109.0" fill="#1d4ed8" font-size="9" text-anchor="middle">Shared · X=5</text>
  <text x="551.0" y="109.0" fill="#1d4ed8" font-size="9" text-anchor="middle">Shared · X=5</text>
  <text x="661.0" y="109.0" fill="#1f2937" font-size="9" text-anchor="middle">X=5</text>
  <rect x="16.0" y="118.0" width="690.0" height="26.0" rx="0" fill="#f1f5f9" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="26.0" y="135.0" fill="#1f2937" font-size="9" text-anchor="start">4. Core 0 ghi X=10</text>
  <text x="156.0" y="135.0" fill="#1f2937" font-size="9" text-anchor="start">RFO / invalidate trên bus</text>
  <text x="421.0" y="135.0" fill="#dc2626" font-size="9" text-anchor="middle">Modified · X=10</text>
  <text x="551.0" y="135.0" fill="#94a3b8" font-size="9" text-anchor="middle">Invalid</text>
  <text x="661.0" y="135.0" fill="#b45309" font-size="9" text-anchor="middle">X=5 (cũ)</text>
  <rect x="16.0" y="144.0" width="690.0" height="26.0" rx="0" fill="#ffffff" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="26.0" y="161.0" fill="#1f2937" font-size="9" text-anchor="start">5. Core 1 đọc lần 2</text>
  <text x="156.0" y="161.0" fill="#1f2937" font-size="9" text-anchor="start">Core 0 writeback rồi hạ Shared</text>
  <text x="421.0" y="161.0" fill="#1d4ed8" font-size="9" text-anchor="middle">Shared · X=10</text>
  <text x="551.0" y="161.0" fill="#1d4ed8" font-size="9" text-anchor="middle">Shared · X=10</text>
  <text x="661.0" y="161.0" fill="#15803d" font-size="9" text-anchor="middle">X=10</text>
</svg>

**Tại sao điều này liên quan đến migration cost:**

Khi task T chạy trên Core 0, T đọc/ghi nhiều biến trong L1 Core 0 (trạng thái M hoặc E). Khi T bị migrate sang Core 2:
- Tất cả dữ liệu của T trong L1 Core 0 phải được writeback về RAM (M → I) hoặc chuyển sang Core 2.
- Core 2 phải load lại từ RAM → cold miss → nhiều cycle lãng phí.
- Đây là chi phí "cache thrashing" khi migrate quá thường xuyên.

📝 **Tóm tắt mục 4:**
- Cache coherence: phần cứng đảm bảo mọi core thấy giá trị nhất quán qua giao thức MESI.
- MESI: 4 trạng thái (Modified/Exclusive/Shared/Invalid) — hardware tự quản lý qua bus snooping.
- Migration cost: task di chuyển = cache cold → phải load lại từ RAM → overhead lớn.

---

## 5. NUMA — Truy cập Bộ nhớ Không đồng đều

### 5.1. Bài toán NUMA

💡 **Trực giác — Kho sách trong tòa nhà nhiều tầng:**
Bạn ngồi tầng 3. Sách của bạn để ở kệ cùng tầng (local) và kệ tầng 1 (remote). Lấy sách tầng 3: 30 giây. Lấy sách tầng 1: phải đi thang bộ, 120 giây. Bạn nên để sách thường dùng ở tầng 3. NUMA: "tầng" = NUMA node; "sách" = bộ nhớ; "thang bộ" = interconnect giữa node.

**NUMA (Non-Uniform Memory Access)** xuất hiện trên server đa socket (multi-socket). Mỗi socket (CPU) có RAM cục bộ riêng. Truy cập RAM cục bộ (local) nhanh hơn RAM của socket khác (remote).

```
Socket 0 (Node 0):                    Socket 1 (Node 1):
  [Core 0] [Core 1] [Core 2] [Core 3]   [Core 4] [Core 5] [Core 6] [Core 7]
  [L1] [L1] [L1] [L1]                    [L1] [L1] [L1] [L1]
  [L3 Cache: 32 MB]                       [L3 Cache: 32 MB]
  [RAM: 64 GB — LOCAL]                    [RAM: 64 GB — LOCAL]
        ↕ QPI/UPI Interconnect (chậm hơn ↕)
  Truy cập RAM Node 1 từ Node 0 = REMOTE  Truy cập RAM Node 0 từ Node 1 = REMOTE
```

### 5.2. Walk-through — Chênh lệch độ trễ NUMA

**Số liệu thực tế (Intel Xeon 2-socket server):**

| Loại truy cập | Độ trễ (latency) | Ví dụ cụ thể |
|---------------|-----------------|--------------|
| L1 cache hit | ~4 cycle (~1.3ns) | Biến trong register cache |
| L2 cache hit | ~12 cycle (~4ns) | Dữ liệu vừa truy cập gần đây |
| L3 cache hit | ~40 cycle (~13ns) | Dữ liệu chia sẻ nhiều core |
| RAM local (same node) | ~200 cycle (~67ns) | Core 0 đọc RAM Node 0 |
| RAM remote (cross node) | ~350–400 cycle (~120–130ns) | Core 0 đọc RAM Node 1 |

**Hệ số NUMA (NUMA factor)**: remote latency / local latency $\approx \frac{120}{67} \approx 1.8$x — remote chậm hơn ~80%.

**Ví dụ cụ thể — Walk-through latency:**

Process P chạy trên Core 2 (Node 0), cần đọc mảng A (1 GB):

<svg viewBox="0 0 720 212" style="max-width:720px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="NUMA: đọc 1 GB từ RAM node local mất 1.12 s (67ns/access), từ node remote qua QPI/UPI mất 2.0 s (120ns) — chậm hơn 78%">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="16.0" y="26.0" fill="#15803d" font-size="11" text-anchor="start" font-weight="700">Trường hợp 1 — cấp phát local (Node 0):</text>
  <rect x="14.0" y="36.0" width="110.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="69.0" y="56.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Core 2</text>
  <line x1="126.0" y1="53.0" x2="152.0" y2="53.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="154.0" y="36.0" width="134.7" height="34.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="221.3" y="56.7" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="700">L1 → L2 → L3 miss</text>
  <line x1="290.7" y1="53.0" x2="316.7" y2="53.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="318.7" y="36.0" width="110.0" height="34.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="373.7" y="56.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">RAM Node 0</text>
  <text x="520.0" y="57.0" fill="#15803d" font-size="10" text-anchor="start">~67ns/access → 16.7M × 67ns ≈ 1.12 s</text>
  <text x="16.0" y="116.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">Trường hợp 2 — cấp phát remote (Node 1):</text>
  <g transform="translate(0,126)">
  <rect x="14.0" y="0.0" width="110.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="69.0" y="20.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Core 2</text>
  <line x1="126.0" y1="17.0" x2="148.0" y2="17.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="150.0" y="0.0" width="134.7" height="34.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="217.3" y="20.7" fill="#94a3b8" font-size="10" text-anchor="middle" font-weight="700">L1 → L2 → L3 miss</text>
  <line x1="286.7" y1="17.0" x2="308.7" y2="17.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="310.7" y="0.0" width="110.0" height="34.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="365.7" y="20.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">QPI/UPI</text>
  <line x1="422.7" y1="17.0" x2="444.7" y2="17.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="446.7" y="0.0" width="110.0" height="34.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="501.7" y="20.7" fill="#dc2626" font-size="10" text-anchor="middle" font-weight="700">RAM Node 1</text>
  </g>
  <text x="560.0" y="147.0" fill="#dc2626" font-size="10" text-anchor="start">~120ns → ≈ 2.0 s</text>
  <text x="360.0" y="196.0" fill="#1f2937" font-size="11" text-anchor="middle" font-weight="700">Chênh lệch 2.0 / 1.12 = 1.78× — chậm hơn 78% chỉ vì đặt nhầm node</text>
</svg>

### 5.3. Hệ thống NUMA trên Linux

**Xem NUMA topology:**
```bash
numactl --hardware
# Output:
# available: 2 nodes (0-1)
# node 0 cpus: 0 1 2 3 4 5 6 7 8 9 10 11
# node 0 size: 65536 MB
# node 1 cpus: 12 13 14 15 16 17 18 19 20 21 22 23
# node 1 size: 65536 MB
# node distances:
# node   0   1
#   0:  10  21
#   1:  21  10
# → 10 = local (1x), 21 = remote (2.1x latency)
```

**NUMA-aware memory allocation:**
```bash
# Chạy process và pin vào Node 0 (CPU + memory):
numactl --cpunodebind=0 --membind=0 python3 worker.py

# Cấp phát memory trên node gần nhất:
numactl --localalloc python3 worker.py
```

**Linux NUMA Balancing (kernel 3.8+):**
Linux có tính năng **Automatic NUMA Balancing** — kernel tự động phát hiện tiến trình đang truy cập RAM remote nhiều và di chuyển trang RAM về node gần hơn (page migration).

```
Cơ chế:
1. Kernel thỉnh thoảng unmap trang RAM của tiến trình (PROT_NONE).
2. Khi tiến trình truy cập → page fault.
3. Kernel ghi nhận: tiến trình P đang ở Core 2 (Node 0) nhưng page này ở Node 1.
4. Kernel migrate page từ Node 1 → Node 0.
5. Tiến trình được resume, lần sau access local.
```

### 5.4. NUMA và Container/VM

**Trong Kubernetes:** Kubernetes topology manager có thể đảm bảo pod được gán CPU và memory cùng một NUMA node.

```yaml
# topology-manager policy: single-numa-node
# Kubernetes đảm bảo 8 CPU của pod thuộc cùng 1 NUMA node
resources:
  limits:
    cpu: "8"
    memory: "32Gi"
```

**Hệ quả thực tế:** Một web server chạy bình thường với 50ms p99 latency. Sau khi di chuyển sang server mới có 2 NUMA nodes và process không được pin đúng NUMA node: p99 tăng lên 85ms. Đây là NUMA effect — thường bị nhầm là "server mới chậm hơn".

⚠ **Lỗi thường gặp:** Nhầm "NUMA chỉ quan trọng với HPC (High Performance Computing)". Sai. Hầu hết server 2-socket trở lên đều có NUMA. Web service, database, message queue đều bị ảnh hưởng. PostgreSQL có NUMA-aware memory allocation từ version 9.x. Java JVM có `-XX:+UseNUMAInterleaving`.

🔁 **Dừng lại tự kiểm tra:**

Server có 2 NUMA node (Node 0 và Node 1). Process P chạy trên Core 5 (Node 1). Mảng B của P được cấp phát mặc định trên Node 0 (vì `malloc` không NUMA-aware).

(a) Mỗi lần P đọc phần tử của B, kernel phải làm gì?
(b) Ước tính overhead so với nếu B ở Node 1. (dùng số liệu: local 67ns, remote 120ns)
(c) Làm sao sửa lại mà không recompile code?

<details>
<summary>Đáp án</summary>

(a) Mỗi L3 miss của Core 5 khi đọc B: request đi qua QPI/UPI interconnect sang Node 0 → RAM Node 0 → trả về qua interconnect → Core 5. Kernel MMU xử lý page table, cache coherence protocol xử lý phần còn lại. Từ góc nhìn software: chỉ đơn giản là `mov rax, [addr]` nhưng phần cứng phải traverse interconnect.

(b) Overhead = (120ns - 67ns) / 67ns ≈ 79% chậm hơn mỗi cache miss. Nếu B chiếm nhiều L3 miss, đây là bottleneck đáng kể.

(c) Không cần recompile: `numactl --membind=1 --cpunodebind=1 ./process_P`. Hoặc enable automatic NUMA balancing: `echo 1 > /proc/sys/kernel/numa_balancing` — kernel tự migrate page về đúng node theo time.
</details>

📝 **Tóm tắt mục 5:**
- NUMA: server đa socket — mỗi socket có RAM local riêng. Truy cập remote chậm hơn ~1.8–2x.
- Latency local ~67ns; remote ~120ns (Intel Xeon điển hình). Chênh lệch ~80%.
- NUMA-aware: pin process (numactl), cấp phát memory trên node đúng, Kubernetes topology manager.
- Linux auto NUMA balancing: tự động migrate page về node gần hơn.

---

## Bài tập

**Bài 1:** Phân tích kiến trúc.

Server có 4 core, 16 task sẵn sàng chạy. So sánh hai thiết kế:

(a) Global queue: bao nhiêu lần lock tối thiểu để schedule 16 task?
(b) Per-CPU queue (4 queue): mỗi queue có mấy task? Bao nhiêu lần lock mỗi CPU?
(c) Nếu sau 5ms, 12 task hoàn thành và 4 task còn lại đều ở Core 0. Per-CPU queue phản ứng thế nào?

---

**Bài 2:** Cache cost analysis.

Thread T đang chạy trên Core 2, working set 8 MB (nằm trong L3 cache, ~75% hot in L1/L2).

(a) Nếu T đang trong L1 của Core 2 và bị migrate sang Core 3 — số cycle đầu tiên khi T chạy trên Core 3 để load lại working set từ L3 là bao nhiêu? (8 MB / 64 byte/line × 40 cycle/L3 miss)
(b) Tại 3 GHz, thời gian này là bao nhiêu µs?
(c) Nếu T chạy 10ms trên mỗi quantum (time slice), migration cost chiếm % bao nhiêu của quantum?

---

**Bài 3:** NUMA latency.

Server 2-socket (Node 0: Core 0–11, Node 1: Core 12–23). Latency: local 70ns, remote 130ns.

Database server chạy 3 worker thread (W1, W2, W3), mỗi thread đọc 500 MB data liên tục:

(a) Nếu cả 3 thread chạy trên Node 0 và data ở Node 0: tổng thời gian đọc mỗi thread?
(b) Nếu W3 chạy trên Node 1 nhưng data vẫn ở Node 0: tổng thời gian đọc W3?
(c) Ước tính throughput giảm bao nhiêu % cho W3?

*(Giả sử: 500 MB / 64 byte/line cache miss, không có TLB/L3 cache hit)*

---

**Bài 4:** Load balancing decisions.

Hệ thống 4 core, quantum = 4ms. Trạng thái tại t=0:
```
Core 0: [T1:remaining=8ms] [T2:remaining=4ms]
Core 1: [T3:remaining=12ms]
Core 2: [T4:remaining=2ms]
Core 3: (trống)
```

(a) Load balancer tại t=0 quyết định steal task nào về Core 3? Giải thích.
(b) T4 hoàn thành tại t=2ms. Core 2 idle. Load balancer steal task nào?
(c) Nếu T3 có CPU affinity cứng vào Core 1, load balancer có steal T3 không?

---

**Bài 5:** CPU affinity tradeoff.

Real-time audio processing system: 1 thread capture audio từ mic (thread A), 1 thread process (thread B), 1 thread output (thread C).

(a) Tại sao cần CPU affinity cho 3 thread này?
(b) Nếu system có 8 core, pin mỗi thread vào core riêng (A→Core 0, B→Core 1, C→Core 2), còn lại 5 core idle. Điều này có lãng phí không? Giải thích.
(c) Làm sao cả hai: đảm bảo realtime latency cho audio threads VÀ tận dụng 5 core còn lại?

---

## Lời giải chi tiết

**Bài 1:**

**(a)** Global queue, 16 task, 4 core: Mỗi core cần lock để lấy task, mỗi task = 1 lần lock + 1 lần unlock khi xong (để trả hoặc lấy task mới). Tối thiểu: **16 lần lock** (mỗi task lấy 1 lần). Thực tế nhiều hơn vì blocking/preemption.

**(b)** Per-CPU queue, 16/4 = **4 task mỗi CPU**. Mỗi CPU chỉ lock queue của mình → **4 lần lock** mỗi CPU cho 4 task. Tổng: 4 × 4 = 16 lần lock nhưng KHÔNG tranh nhau → song song hoàn toàn.

**(c)** Sau 5ms, Core 0 còn 4 task, Core 1, 2, 3 idle. **Idle balance** triggered:
- Core 1 (rảnh trước): steal task từ Core 0 (busiest) → 1 task về Core 1.
- Core 2: steal 1 task từ Core 0.
- Core 3: steal 1 task từ Core 0.
- Cuối cùng: Core 0–3 mỗi core 1 task → cân bằng.

---

**Bài 2:**

**(a)** Working set 8 MB hot in L1/L2 của Core 2. Sau migrate sang Core 3, L1/L2 Core 3 cold.
Phải load từ L3 (còn hot ở L3 chia sẻ giữa các core):
- 8 MB / 64 bytes = 131,072 cache lines
- Mỗi L3 miss: ~40 cycle
- Tổng cycle: 131,072 × 40 = **~5.24 triệu cycle**

**(b)** Ở 3 GHz: 5.24M / (3×10⁹) × 10⁶ = **~1,748 µs ≈ 1.75ms**

**(c)** Quantum = 10ms. Migration cost = 1.75ms. Chiếm **17.5%** của quantum. Đây là overhead đáng kể — đó là lý do kernel cân nhắc kỹ trước khi migrate (chỉ migrate khi lợi ích cân bằng tải vượt qua cache cost).

---

**Bài 3:**

**(a)** 500 MB = 500 × 1024 × 1024 / 64 = 8,192,000 cache lines (L3 miss).
- Latency local: 70ns mỗi access.
- Tổng: 8,192,000 × 70ns = **573ms ≈ 0.57 giây**

**(b)** W3 trên Node 1, data Node 0: latency remote 130ns.
- Tổng: 8,192,000 × 130ns = **1.065 giây ≈ 1.06 giây**

**(c)** Throughput W3 giảm: (1.06 - 0.57) / 0.57 = **86% chậm hơn** (hoặc throughput = 0.57/1.06 = 54% so với local). NUMA factor = 130/70 ≈ 1.86 → remote chậm gần gấp đôi.

---

**Bài 4:**

**(a)** Tại t=0, Core 3 idle → idle balance:
- Core 0: 2 task (T1:8ms + T2:4ms = 12ms total)
- Core 1: 1 task (T3:12ms)
- Core 2: 1 task (T4:2ms) — sắp xong
- Load balancer chọn core bận nhất để steal: **Core 0 hoặc Core 1** (load tương đương).
- Steal task **cuối queue** (T2:4ms từ Core 0) — tránh steal task đang chạy.
- Core 3 nhận T2:4ms.

**(b)** t=2ms: T4 xong, Core 2 idle:
- Core 0 còn T1:8ms (đang chạy, còn 6ms)
- Core 1 còn T3:12ms (đang chạy)
- Core 3 còn T2:4ms (đang chạy, còn 2ms)
- Core 2 idle → steal từ busiest: **T3 từ Core 1** (nếu không có affinity).
- Core 2 nhận T3.

**(c)** Nếu T3 có CPU affinity cứng vào Core 1: **load balancer KHÔNG steal T3**. Affinity cứng = kernel không di chuyển task ra khỏi set CPU được phép. Core 2 vẫn idle cho đến khi có task khác eligible.

---

**Bài 5:**

**(a)** Audio processing là hard realtime: nếu thread bị delay >10ms, có "glitch" (tiếng ngắt/bụp) trong audio. Nếu không có affinity, scheduler có thể di chuyển thread sang core khác → cold cache → latency tăng đột ngột → deadline miss. Affinity đảm bảo thread luôn có L1/L2 hot cache, không bị preempt bởi task không liên quan.

**(b)** Không lãng phí trong context realtime. 5 core "idle" (không có audio thread) vẫn phục vụ OS tasks, system calls, background processes. Quan trọng hơn: cô lập core 0, 1, 2 khỏi nhiễu → đảm bảo audio threads không bị eviction từ cache bởi interrupt handler hay background task chạy trên cùng core.

**(c)** Hai cơ chế kết hợp:
1. **CPU isolation**: dùng `isolcpus=0,1,2` trong kernel boot param → các core này chỉ chạy task được pin vào, không có scheduler thông thường.
2. **Realtime priority**: đặt audio threads với `SCHED_FIFO` priority cao trên core 0–2.
3. **Core 3–7**: để scheduler thông thường dùng cho background workload (web request, logging, background job...).
4. **NUMA**: đảm bảo audio buffer cấp phát trên node chứa core 0–2 để minimize latency.

---

## Liên kết và bài tiếp theo

- Đã học:
  - [Tầng 1 — Lesson 04: CPU Scheduling](../../01-Foundations-Processes/lesson-04-cpu-scheduling/): thuật toán lập lịch đơn core (FCFS, SJF, RR) — Lesson này mở rộng lên đa core.
  - [Lesson 02 — Container](../lesson-02-containers/): cpuset cgroup = CPU affinity cho container.
  - [Lesson 03 — Bảo mật OS](../lesson-03-os-security/): isolation vận dụng affinity để cô lập core realtime.
- Bài tiếp theo:
  - [Lesson 05 — Lập lịch thời gian thực (Real-time)](../lesson-05-realtime-scheduling/): khi SMP scheduling không đủ — hard realtime cần thuật toán RMS/EDF với guarantee deadline.

---

## 📝 Tổng kết Lesson 04

1. **SMP**: nhiều core dùng chung RAM và OS. Lập lịch đa core phức tạp hơn đơn core vì race condition trên run queue và cache coherence.
2. **Global queue**: đơn giản, cân bằng tự nhiên, nhưng lock contention bottleneck trên nhiều core. **Per-CPU queue**: hiệu năng cao, cần load balancing tích cực — Linux CFS dùng thiết kế này.
3. **Load balancing**: idle balance (work stealing ngay khi core rảnh) + periodic balance (kiểm tra mỗi ~1ms). Cân đối giữa lợi ích tải đều và chi phí cache cold.
4. **CPU affinity**: giữ task ở core nhất định → L1/L2 hot cache (L1 ~4 cycle vs RAM ~300 cycle = 75x). Dùng cho realtime, NUMA optimization, cache partitioning.
5. **Cache coherence (MESI)**: hardware tự động giữ nhất quán qua 4 trạng thái. Migration cost = cold cache = overhead thực tế.
6. **NUMA**: server đa socket — local RAM ~67ns, remote ~120ns (1.8x chậm hơn). Pin process và memory vào cùng NUMA node với `numactl`. Linux auto NUMA balancing tự động migrate page.
