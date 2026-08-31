# Lesson 05 — Lập lịch thời gian thực (Real-Time Scheduling)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **hệ thời gian thực** là gì: đúng kết quả VÀ đúng thời điểm.
- Phân biệt **hard real-time** và **soft real-time** với ví dụ thực tế.
- Mô tả mô hình task định kỳ: **period**, **deadline**, **WCET** (worst-case execution time).
- Áp dụng thuật toán **Rate-Monotonic Scheduling (RMS)** và kiểm tra điều kiện khả thi Liu & Layland.
- Áp dụng thuật toán **Earliest-Deadline-First (EDF)** và giải thích vì sao nó tối ưu.
- Mô tả vấn đề **priority inversion** và giải pháp **priority inheritance**.
- Vẽ tay **timeline lập lịch** cho 2-3 task với RMS và EDF, phát hiện deadline miss.

## Kiến thức tiền đề

- [Lesson 02 — CPU Scheduling](../../01-Foundations-Processes/lesson-02-cpu-scheduling/): FCFS, SJF, Round-Robin, priority-based scheduling.
- [Lesson 04 — Lập lịch đa nhân](../lesson-04-smp-multicore-scheduling/): SMP, load balancing, cache affinity.

---

## 1. Hệ thời gian thực là gì?

### 1.1. Tiêu chí "đúng" của real-time

💡 **Trực giác:**
Thông thường, khi nói "máy tính trả lời đúng", ta chỉ quan tâm kết quả có chính xác không. Với hệ thời gian thực, tiêu chí đúng gồm **hai phần**:

1. **Kết quả đúng** — giống hệ thống thông thường.
2. **Thời điểm đúng** — trả lời phải đến trước một **deadline** xác định.

Ví dụ: Hệ điều khiển túi khí xe hơi phát hiện va chạm → phải kích hoạt trong **30 ms**. Kết quả đúng nhưng trả lời sau 50 ms = vô dụng, có thể gây chết người.

### 1.2. Hard real-time vs Soft real-time

| Loại | Định nghĩa | Hậu quả nếu trễ | Ví dụ |
|------|-----------|-----------------|-------|
| **Hard real-time** | Deadline tuyệt đối — vi phạm là thất bại hệ thống | Nguy hiểm/thảm họa | Túi khí xe, pacemaker tim, hệ điều khiển máy bay, robot công nghiệp |
| **Soft real-time** | Deadline quan trọng nhưng vi phạm chấp nhận được ở mức độ nhất định | Giảm chất lượng trải nghiệm | Streaming video, VoIP, game online, điện thoại |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Soft real-time có phải real-time thật không?"* — Có. Soft vẫn đòi hỏi xử lý kịp thời (vd 20–40 ms mỗi frame video), chỉ là hệ thống không sụp đổ nếu trễ thỉnh thoảng.
- *"Linux có phải real-time OS không?"* — Linux thông thường không phải RTOS. Tuy nhiên có bản vá `PREEMPT_RT` biến Linux thành soft/quasi-hard RTOS. VxWorks, FreeRTOS là các RTOS thật.
- *"RTOS khác OS thông thường ở điểm nào?"* — Kernel của RTOS đảm bảo **latency có giới hạn** (bounded latency): thời gian từ lúc sự kiện xảy ra đến lúc ISR/task phản hồi không bao giờ vượt một ngưỡng đã biết.

📝 **Tóm tắt mục 1:**
- Real-time = đúng kết quả + đúng thời hạn (deadline).
- Hard real-time: vi phạm deadline = thảm họa. Soft: vi phạm làm giảm chất lượng.
- RTOS đảm bảo bounded latency — OS thông thường không đảm bảo.

---

## 2. Mô hình Task định kỳ

### 2.1. Các tham số cơ bản

Trong real-time scheduling, công việc (task) thường là **định kỳ (periodic)**:

- **Period (T)**: khoảng thời gian lặp lại. Task $\tau_i$ kích hoạt mỗi $T_i$ đơn vị thời gian.
- **WCET — Worst-Case Execution Time (C)**: thời gian CPU tệ nhất để hoàn thành một lần kích hoạt.
- **Deadline (D)**: task phải hoàn thành trong $D_i$ đơn vị sau khi kích hoạt. Trong mô hình đơn giản nhất: $D_i = T_i$ (implicit deadline).
- **Utilization (U)**: phần CPU mà task chiếm $= \frac{C_i}{T_i}$.

💡 **Trực giác — Ví dụ bếp nhà hàng:**
Bếp phải nấu một món ăn mỗi 10 phút (T=10), mỗi lần nấu tốn tối đa 3 phút (C=3). Utilization $= \frac{3}{10} = 0.3$ (30%). Nếu có nhiều bếp (task) dùng chung một bếp (CPU), tổng utilization phải $\leq 1$ (100%) — nếu không, sẽ có món nấu không kịp.

### 2.2. Walk-through tính utilization

**Ví dụ hệ thống 3 task:**

| Task | Period T | WCET C | Utilization $U = \frac{C}{T}$ |
|------|----------|--------|---------------------|
| τ₁ | 4 ms | 1 ms | 0.25 |
| τ₂ | 6 ms | 2 ms | 0.333 |
| τ₃ | 12 ms | 3 ms | 0.25 |
| **Tổng** | | | **0.833** |

Tổng utilization:

$$\sum U_i = 0.25 + 0.333 + 0.25 = 0.833$$

hay **83.3%**. CPU còn 16.7% idle. Về mặt tổng thể không quá tải, nhưng có đảm bảo deadline không phụ thuộc vào thuật toán lập lịch.

⚠ **Lỗi thường gặp:** Nhiều người nghĩ "tổng $U \leq 1$ (100%) là an toàn". Sai. Với lập lịch tĩnh (fixed-priority như RMS), điều kiện an toàn **chặt hơn** nhiều. Xem mục 3.

📝 **Tóm tắt mục 2:**
- Task định kỳ có 3 tham số: Period T, WCET C, Deadline D.
- Utilization $U = \frac{C}{T}$. Tổng $\sum U_i$ phải $\leq 1$ để có cơ hội đảm bảo deadline.
- Tổng U < 1 là điều kiện cần, chưa đủ.

---

## 3. Rate-Monotonic Scheduling (RMS)

### 3.1. Ý tưởng

💡 **Trực giác — Ưu tiên theo tần suất:**
Task nào "hỏi thăm" CPU thường xuyên nhất (period ngắn nhất) thì cần phản hồi nhanh nhất → cho độ ưu tiên cao nhất. RMS là thuật toán ưu tiên **tĩnh** (gán một lần, không đổi trong suốt vòng đời task).

**Quy tắc RMS:** Task có period ngắn hơn → ưu tiên cao hơn.

- τ₁ (T=4) > τ₂ (T=6) > τ₃ (T=12) về độ ưu tiên.

### 3.2. Điều kiện khả thi Liu & Layland (1973)

Với $n$ task định kỳ độc lập, RMS đảm bảo mọi deadline nếu:

$$\sum \frac{C_i}{T_i} \leq n \cdot (2^{1/n} - 1)$$

Bound này tiến đến $\ln 2 \approx 0.693$ khi $n \to \infty$.

| n | Bound $n \cdot (2^{1/n} - 1)$ |
|---|---------------------|
| 1 | 1.000 (100%) |
| 2 | 0.828 (82.8%) |
| 3 | 0.780 (78.0%) |
| 4 | 0.757 (75.7%) |
| ∞ | 0.693 (69.3%) |

**Lưu ý:** Đây là điều kiện **đủ**. Nếu $\sum U_i \leq$ bound → chắc chắn đảm bảo deadline. Nếu $\sum U_i >$ bound → có thể đảm bảo hoặc không, cần phân tích thêm (response time analysis).

### 3.3. Walk-through RMS với 3 task

**Bộ task:**

| Task | T | C | Ưu tiên RMS |
|------|---|---|-------------|
| τ₁ | 4 | 1 | Cao nhất (period ngắn nhất) |
| τ₂ | 6 | 2 | Trung bình |
| τ₃ | 12 | 3 | Thấp nhất |

**Kiểm tra Liu & Layland (n=3):**
$\sum U_i = \frac{1}{4} + \frac{2}{6} + \frac{3}{12} = 0.25 + 0.333 + 0.25 = 0.833 > 0.780$ (bound với n=3).

→ Điều kiện đủ không thỏa. Phải phân tích từng task bằng response time analysis để xác định có miss deadline không.

**Hyperperiod (LCM):** LCM(4, 6, 12) = 12 ms.

**Vẽ timeline t=0..12 với RMS:**

<svg viewBox="0 0 620 160" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Lịch Rate Monotonic: τ₁ chạy tại t=0-1, 4-5, 8-9; τ₂ tại t=1-3, 5-7; τ₃ tại t=9-12">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="100.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="560.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">12</text>
  <line x1="215.0" y1="24.0" x2="215.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="215.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">3</text>
  <line x1="330.0" y1="24.0" x2="330.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="330.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">6</text>
  <line x1="445.0" y1="24.0" x2="445.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="445.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">9</text>
  <line x1="100.0" y1="24.0" x2="100.0" y2="118.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="560.0" y1="24.0" x2="560.0" y2="118.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="92.0" y="46.0" fill="#475569" font-size="10" text-anchor="end">τ₁ (P=4)</text>
  <rect x="100.0" y="32.0" width="38.3" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <rect x="253.3" y="32.0" width="38.3" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <rect x="406.7" y="32.0" width="38.3" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="92.0" y="76.0" fill="#475569" font-size="10" text-anchor="end">τ₂ (P=5)</text>
  <rect x="138.3" y="62.0" width="76.7" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <rect x="291.7" y="62.0" width="76.7" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="92.0" y="106.0" fill="#475569" font-size="10" text-anchor="end">τ₃ (P=12)</text>
  <rect x="445.0" y="92.0" width="115.0" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="310.0" y="140.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">số nhỏ = chạy trước; τ₃ ưu tiên thấp nhất chỉ chạy khi CPU rảnh</text>
</svg>

Chi tiết từng đơn vị thời gian:
- t=0: τ₁,τ₂,τ₃ đều kích hoạt. τ₁ (cao nhất) chạy → xong lúc t=1.
- t=1: τ₂ chạy (τ₃ ưu tiên thấp hơn) → chạy t=1..2 (còn 1 đơn vị nữa).
- t=2: τ₂ chạy → xong lúc t=3. Deadline τ₂ = t=6 ✓.
- t=3: τ₃ bắt đầu chạy → t=3..4? Nhưng t=4 τ₁ kích hoạt lại!
- t=4: τ₁ preempt τ₃ → τ₁ chạy → xong t=5. Deadline τ₁ = t=8 ✓.
- t=5: τ₂ kích hoạt lần 2, τ₃ vẫn còn 2 đơn vị. τ₂ ưu tiên > τ₃ → τ₂ chạy t=5..7. Deadline τ₂ lần 2 = t=12 ✓.
- t=7: τ₃ chạy tiếp t=7..8 (đã chạy 1 đơn vị trước đó, còn 2). t=7..9.
- t=8: τ₁ kích hoạt lần 3 → preempt τ₃ → chạy t=8..9. Deadline τ₁ = t=12 ✓.
- t=9: τ₃ chạy tiếp, còn 1 đơn vị → t=9..10. Deadline τ₃ = t=12 ✓.
- t=10..12: idle.

Tất cả deadline được đáp ứng! Dù $\sum U_i >$ bound, hệ thống này vẫn khả thi.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao bound không phải 100% mà chỉ 69.3%?"* — RMS ưu tiên tĩnh không tận dụng được 100% CPU khi mix nhiều period khác nhau. Có các "lỗ hổng" nhỏ mà không task nào chen vào được.
- *"Nếu task không có period bằng nhau (harmonics) thì sao?"* — Khi $T_i$ là bội số của nhau (harmonics), bound thực tế đạt 100% với RMS. Đây là lý do hệ thống nhúng thường thiết kế task có period dạng 1ms, 2ms, 4ms...
- *"Response time analysis là gì?"* — Tính thời gian phản hồi tệ nhất $R_i$ của task $\tau_i$ bằng công thức lặp: $R_i^{(k+1)} = C_i + \sum_{j \in hp(i)} \lceil R_i^{(k)}/T_j \rceil \cdot C_j$, trong đó $hp(i)$ là tập task có ưu tiên cao hơn $i$.

⚠ **Lỗi thường gặp:**
- Nhầm RMS với "lập lịch theo tốc độ" — RMS ưu tiên theo period, không phải tốc độ thực thi.
- Quên rằng bound Liu & Layland là điều kiện **đủ** không phải **cần** — khi $\sum U_i >$ bound, task vẫn có thể khả thi.

🔁 **Dừng lại tự kiểm tra:**

Hệ 2 task: τ₁ (T=5, C=2), τ₂ (T=10, C=4). Điều kiện Liu & Layland có thỏa không?

<details>
<summary>Đáp án</summary>

$\sum U_i = \frac{2}{5} + \frac{4}{10} = 0.4 + 0.4 = 0.8$.
Bound với n=2: $2 \cdot (2^{1/2} - 1) = 2 \cdot (1.414 - 1) = 2 \cdot 0.414 = 0.828$.
$0.8 \leq 0.828$ → Điều kiện đủ THỎA → RMS đảm bảo deadline cho cả 2 task.

</details>

📝 **Tóm tắt mục 3:**
- RMS: period ngắn hơn → ưu tiên cao hơn (tĩnh).
- Điều kiện đủ Liu & Layland: $\sum U_i \leq n \cdot (2^{1/n} - 1)$, tiến đến 69.3% khi $n \to \infty$.
- Nếu $\sum U_i \leq$ bound → chắc chắn an toàn. Nếu $>$ bound → cần phân tích thêm.

---

## 4. Earliest-Deadline-First (EDF)

### 4.1. Ý tưởng và tính tối ưu

💡 **Trực giác — Hạn nộp bài:**
Trong đống bài tập, bạn ưu tiên làm cái nào nộp sớm nhất trước. EDF làm đúng vậy: tại mỗi thời điểm, task nào có deadline gần nhất được chạy trước. Đây là ưu tiên **động** (thay đổi mỗi khi có task mới kích hoạt).

**Định lý tối ưu (Liu & Layland, 1973):** EDF tối ưu cho bài toán lập lịch preemptive đơn CPU — nếu **bất kỳ** thuật toán nào có thể đáp ứng mọi deadline, EDF cũng đáp ứng được.

**Điều kiện khả thi EDF:** $\sum U_i \leq 1$ (tổng utilization $\leq$ 100%). Đơn giản hơn nhiều so với RMS!

### 4.2. Walk-through EDF với 3 task

Cùng bộ task: τ₁(T=4,C=1), τ₂(T=6,C=2), τ₃(T=12,C=3). $\sum U_i = 0.833 \leq 1$ → EDF khả thi.

**Timeline t=0..12:**

| Thời gian | Task kích hoạt (deadline) | Task đang chạy | Lý do |
|-----------|--------------------------|----------------|-------|
| t=0 | τ₁(d=4), τ₂(d=6), τ₃(d=12) | τ₁ | deadline τ₁=4 gần nhất |
| t=1 | — | τ₂ | deadline τ₂=6 < τ₃=12 |
| t=2 | — | τ₂ | tiếp tục (còn 1 đơn vị) |
| t=3 | — | τ₃ | τ₂ xong, τ₃ còn lại |
| t=4 | τ₁(d=8) kích hoạt | τ₁ | deadline τ₁=8 < τ₃=12, preempt |
| t=5 | τ₂(d=12) kích hoạt | τ₃ | deadline τ₃=12 = τ₂=12, nhưng τ₃ đang chạy (tie-break) |
| t=5..6 | — | τ₂ | deadline τ₂=12, τ₃ còn 2 đơn vị cũng d=12 |

Kết quả: tất cả deadline đáp ứng với utilization 83.3%.

### 4.3. So sánh RMS và EDF

| Tiêu chí | RMS | EDF |
|----------|-----|-----|
| Loại ưu tiên | Tĩnh (period ngắn → ưu tiên cao) | Động (deadline gần → ưu tiên cao) |
| Điều kiện khả thi | $\sum U_i \leq n \cdot (2^{1/n} - 1) \approx 69.3\%$ | $\sum U_i \leq 100\%$ |
| Tính tối ưu | Tối ưu trong lớp fixed-priority | Tối ưu tuyệt đối (preemptive, đơn CPU) |
| Overhead | Thấp (không cần tính lại ưu tiên) | Cao hơn (tính lại mỗi khi task kích hoạt) |
| Dùng trong thực tế | Phổ biến (VxWorks, FreeRTOS) | Ít hơn, nhưng Linux SCHED_DEADLINE dùng EDF |
| Khi overload ($\sum U_i > 1$) | Predictable: task thấp ưu tiên miss | Unpredictable: nhiều task miss đồng thời |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"EDF tối ưu → tại sao không dùng EDF ở khắp nơi?"* — Overhead quản lý ưu tiên động, và khi overload EDF không đảm bảo task nào miss (unpredictable). RMS predictable hơn trong overload.
- *"Linux `SCHED_DEADLINE` là gì?"* — Scheduler class trong Linux kernel (từ 3.14) implement EDF + CBS (Constant Bandwidth Server) để isolation task. Task khai báo runtime, deadline, period.

📝 **Tóm tắt mục 4:**
- EDF: ưu tiên động theo deadline gần nhất.
- EDF tối ưu: nếu bất kỳ thuật toán nào đảm bảo được, EDF đảm bảo được.
- Điều kiện khả thi EDF đơn giản: $\sum U_i \leq 1$.

---

## 5. Priority Inversion & Priority Inheritance

### 5.1. Vấn đề priority inversion

💡 **Trực giác:**
Tưởng tượng bạn (ưu tiên cao) cần mượn sách từ thư viện. Thư viện đang bị bạn khác (ưu tiên thấp) giữ. Bạn phải chờ. Trong khi đó, người ưu tiên trung bình chen ngang chiếm CPU của người ưu tiên thấp → người ưu tiên thấp không thể trả sách → bạn bị chặn bởi kẻ ưu tiên **trung bình**. "Nghịch lý" là người ưu tiên cao nhất lại chờ người ưu tiên trung bình!

**Ví dụ với 3 task:**
- τ_H (ưu tiên cao) và τ_L (ưu tiên thấp) chia sẻ mutex M.
- τ_M (ưu tiên trung bình) không dùng M.

<svg viewBox="0 0 640 158" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Priority inversion: τ_L giữ M, τ_H block; τ_M ưu tiên giữa preempt τ_L t=2..5 khiến τ_H phải chờ tới t=6">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="110.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="580.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">6</text>
  <line x1="227.5" y1="24.0" x2="227.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="227.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">1.5</text>
  <line x1="345.0" y1="24.0" x2="345.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="345.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">3</text>
  <line x1="462.5" y1="24.0" x2="462.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="462.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">4.5</text>
  <line x1="110.0" y1="24.0" x2="110.0" y2="118.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="580.0" y1="24.0" x2="580.0" y2="118.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="46.0" fill="#475569" font-size="10" text-anchor="end">τ_H (cao)</text>
  <rect x="188.3" y="32.0" width="313.3" height="20.0" rx="3" fill="#dc2626" fill-opacity="0.85" stroke="#dc2626" stroke-width="0"/>
  <text x="345.0" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">BLOCK chờ M</text>
  <rect x="501.7" y="32.0" width="78.3" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="540.8" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy</text>
  <text x="102.0" y="76.0" fill="#475569" font-size="10" text-anchor="end">τ_M (giữa)</text>
  <rect x="266.7" y="62.0" width="235.0" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="384.2" y="76.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy — preempt τ_L!</text>
  <text x="102.0" y="106.0" fill="#475569" font-size="10" text-anchor="end">τ_L (thấp)</text>
  <rect x="110.0" y="92.0" width="156.7" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="188.3" y="106.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">giữ M (CS)</text>
  <rect x="501.7" y="92.0" width="54.8" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="529.1" y="106.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">unlock</text>
  <text x="320.0" y="138.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">τ_M không liên quan M nhưng làm τ_H trễ — đảo ngược ưu tiên</text>
</svg>

τ_H bị chặn từ t=1 đến t=5 — do τ_M gián tiếp!

**Hậu quả thực tế:** Sự cố Mars Pathfinder (1997) là ví dụ kinh điển về priority inversion khiến hệ thống reset liên tục.

### 5.2. Priority Inheritance Protocol (PIP)

**Giải pháp:** Khi τ_H bị block bởi τ_L đang giữ mutex, tạm thời **nâng ưu tiên của τ_L lên bằng τ_H**.

<svg viewBox="0 0 640 158" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Priority inheritance: τ_L thừa kế ưu tiên của τ_H nên τ_M không preempt được; τ_L unlock tại t=2, τ_H chạy ngay">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="110.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="580.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">5</text>
  <line x1="227.5" y1="24.0" x2="227.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="227.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">1.25</text>
  <line x1="345.0" y1="24.0" x2="345.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="345.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">2.5</text>
  <line x1="462.5" y1="24.0" x2="462.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="462.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">3.75</text>
  <line x1="110.0" y1="24.0" x2="110.0" y2="118.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="580.0" y1="24.0" x2="580.0" y2="118.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="46.0" fill="#475569" font-size="10" text-anchor="end">τ_H (cao)</text>
  <rect x="204.0" y="32.0" width="94.0" height="20.0" rx="3" fill="#dc2626" fill-opacity="0.85" stroke="#dc2626" stroke-width="0"/>
  <text x="251.0" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">block</text>
  <rect x="298.0" y="32.0" width="94.0" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="345.0" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy ngay</text>
  <text x="102.0" y="76.0" fill="#475569" font-size="10" text-anchor="end">τ_M (giữa)</text>
  <rect x="392.0" y="62.0" width="188.0" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="486.0" y="76.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy sau</text>
  <text x="102.0" y="106.0" fill="#475569" font-size="10" text-anchor="end">τ_L (thấp)</text>
  <rect x="110.0" y="92.0" width="188.0" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="204.0" y="106.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">giữ M — thừa kế ưu tiên τ_H</text>
  <text x="320.0" y="138.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">τ_M bị đẩy xuống sau — không còn inversion</text>
</svg>

τ_H chỉ bị chặn từ t=1 đến t=2 — giảm từ 4 đơn vị xuống còn 1!

⚠ **Lỗi thường gặp:**
- Nhầm priority inheritance với priority ceiling — ceiling là giao thức khác, nâng ưu tiên ngay khi lock (không cần chờ task cao hơn bị block).
- Nghĩ PIP giải quyết mọi vấn đề: PIP vẫn có thể có **deadlock** nếu task lock nhiều mutex theo thứ tự khác nhau.

🔁 **Dừng lại tự kiểm tra:**

Tại sao priority inversion đặc biệt nguy hiểm với hệ hard real-time?

<details>
<summary>Đáp án</summary>

Vì nó làm task có ưu tiên cao bị delay không xác định (unbounded blocking). Trong hard real-time, mọi delay phải có giới hạn để tính WCET chính xác. Nếu priority inversion xảy ra, task có thể miss deadline mà không thể dự đoán trước.

</details>

📝 **Tóm tắt mục 5:**
- Priority inversion: task ưu tiên cao bị delay bởi task ưu tiên trung bình gián tiếp qua mutex.
- Priority inheritance: tạm nâng ưu tiên task đang giữ lock lên bằng task bị block.
- Mars Pathfinder 1997 là ví dụ thực tế kinh điển của priority inversion.

---

## Bài tập

**Bài 1.** Hệ thống có 2 task: τ₁(T=8ms, C=3ms), τ₂(T=12ms, C=4ms).
- (a) Tính $\sum U_i$.
- (b) Kiểm tra điều kiện Liu & Layland với RMS.
- (c) Kiểm tra điều kiện khả thi EDF.
- (d) Phân công ưu tiên RMS cho 2 task.

**Bài 2.** Cho 3 task: τ₁(T=5, C=2), τ₂(T=10, C=3), τ₃(T=20, C=5).
- (a) Vẽ timeline t=0..20 với RMS. Có task nào miss deadline không?
- (b) Nếu C₃ tăng lên 7 ($\sum U_i = \frac{2}{5} + \frac{3}{10} + \frac{7}{20} = 0.4 + 0.3 + 0.35 = 1.05$), EDF còn đảm bảo được không? Tại sao?

**Bài 3.** Mô tả một tình huống priority inversion với 3 task τ_H, τ_M, τ_L và mutex M. Vẽ timeline thể hiện: (a) không có priority inheritance, (b) có priority inheritance. Xác định thời gian τ_H bị block trong mỗi trường hợp.

---

## Lời giải chi tiết

### Bài 1

**(a) Tính $\sum U_i$:**
$U_1 = \frac{3}{8} = 0.375$; $U_2 = \frac{4}{12} \approx 0.333$. $\sum U_i = 0.375 + 0.333 = 0.708$.

**(b) Kiểm tra Liu & Layland (n=2):**
Bound $= 2 \cdot (2^{1/2} - 1) = 2 \cdot (1.4142 - 1) = 2 \cdot 0.4142 = 0.828$.
$\sum U_i = 0.708 \leq 0.828$ → **Điều kiện đủ thỏa** → RMS đảm bảo tất cả deadline.

**(c) Kiểm tra EDF:**
$\sum U_i = 0.708 \leq 1.0$ → **Khả thi với EDF**.

**(d) Ưu tiên RMS:**
τ₁ (T=8ms) < τ₂ (T=12ms) → τ₁ có ưu tiên **cao hơn** τ₂.

---

### Bài 2

**(a) Timeline RMS (τ₁ > τ₂ > τ₃, vì T₁=5 < T₂=10 < T₃=20):**

$\sum U_i = \frac{2}{5} + \frac{3}{10} + \frac{5}{20} = 0.4 + 0.3 + 0.25 = 0.95 > 0.780$ (bound với n=3) → cần phân tích thực tế.

Hyperperiod = LCM(5,10,20) = 20.

Timeline chi tiết:
- t=0: τ₁,τ₂,τ₃ kích hoạt. τ₁ chạy (ưu tiên cao nhất) → t=0..2. Xong tại t=2 (deadline τ₁=5 ✓).
- t=2: τ₂ chạy → t=2..5 (3 đơn vị). Xong tại t=5 (deadline τ₂=10 ✓).
- t=5: τ₁ kích hoạt lần 2 (deadline=10). τ₁ chạy → t=5..7.
- t=7: τ₃ chạy → t=7..9 (2 đơn vị xong, còn 3).
- t=9: ??? Không có task nào kích hoạt. τ₃ chạy tiếp → t=9..12.
- t=10: τ₁ kích hoạt (d=15), τ₂ kích hoạt (d=20). τ₁ preempt τ₃ → t=10..12.
- t=12: τ₂ chạy → t=12..15. Xong t=15 (deadline τ₂=20 ✓).
- t=15: τ₁ kích hoạt (d=20) → t=15..17.
- t=17: τ₃ cần chạy thêm 2 đơn vị (đã chạy 3 từ t=7..9 và t=9..12, thực ra chạy t=7..10 = 3 đơn vị → còn 2).
  - Chạy t=17..19. Deadline τ₃=20 ✓.
- t=20: Hyperperiod kết thúc. Tất cả task hoàn thành đúng deadline.

**Không có task nào miss deadline.**

**(b) $\sum U_i = 1.05 > 1$:** EDF **không** đảm bảo deadline. $\sum U_i > 1$ nghĩa là các task đòi hỏi CPU nhiều hơn 100% → không thể đáp ứng tất cả. Một số task sẽ miss deadline trong mọi thuật toán.

---

### Bài 3

**Tình huống:** τ_H(ưu tiên cao), τ_M(trung bình), τ_L(thấp). Mutex M.

**(a) Không có priority inheritance:**
<svg viewBox="0 0 760 136" style="max-width:760px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Không inheritance: τ_L bị τ_M preempt giữa CS, τ_H block từ t=1 tới t=6 rồi mới chạy xong t=8">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="110.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="700.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">8</text>
  <line x1="257.5" y1="24.0" x2="257.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="257.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">2</text>
  <line x1="405.0" y1="24.0" x2="405.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="405.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">4</text>
  <line x1="552.5" y1="24.0" x2="552.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="552.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">6</text>
  <line x1="110.0" y1="24.0" x2="110.0" y2="118.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="700.0" y1="24.0" x2="700.0" y2="118.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="46.0" fill="#475569" font-size="10" text-anchor="end">τ_H (cao)</text>
  <rect x="183.8" y="32.0" width="368.8" height="20.0" rx="3" fill="#dc2626" fill-opacity="0.85" stroke="#dc2626" stroke-width="0"/>
  <text x="368.1" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">BLOCK chờ M</text>
  <rect x="552.5" y="32.0" width="147.5" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="626.2" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy</text>
  <text x="102.0" y="76.0" fill="#475569" font-size="10" text-anchor="end">τ_M (giữa)</text>
  <rect x="183.8" y="62.0" width="221.2" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="294.4" y="76.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy — preempt τ_L</text>
  <text x="102.0" y="106.0" fill="#475569" font-size="10" text-anchor="end">τ_L (thấp)</text>
  <rect x="110.0" y="92.0" width="73.8" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="146.9" y="106.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">CS (1/3)</text>
  <rect x="405.0" y="92.0" width="147.5" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="556.5" y="106.0" fill="#1d4ed8" font-size="9" text-anchor="start">CS (2 còn lại), unlock t=6</text>
</svg>
τ_H bị block: **5 đơn vị** (t=1 đến t=6). Bị τ_M (không liên quan M) làm delay!

**(b) Có priority inheritance:**
<svg viewBox="0 0 680 136" style="max-width:680px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Có inheritance: τ_L chạy trọn CS với ưu tiên thừa kế, unlock t=3; τ_H xong t=5, τ_M chạy t=5–8">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="110.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">0</text>
  <text x="620.0" y="18.0" fill="#475569" font-size="10" text-anchor="middle">8</text>
  <line x1="237.5" y1="24.0" x2="237.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="237.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">2</text>
  <line x1="365.0" y1="24.0" x2="365.0" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="365.0" y="18.0" fill="#475569" font-size="9" text-anchor="middle">4</text>
  <line x1="492.5" y1="24.0" x2="492.5" y2="118.0" stroke="#e2e8f0" stroke-width="1"/>
  <text x="492.5" y="18.0" fill="#475569" font-size="9" text-anchor="middle">6</text>
  <line x1="110.0" y1="24.0" x2="110.0" y2="118.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="620.0" y1="24.0" x2="620.0" y2="118.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="102.0" y="46.0" fill="#475569" font-size="10" text-anchor="end">τ_H (cao)</text>
  <rect x="173.8" y="32.0" width="127.5" height="20.0" rx="3" fill="#dc2626" fill-opacity="0.85" stroke="#dc2626" stroke-width="0"/>
  <text x="237.5" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">block</text>
  <rect x="301.2" y="32.0" width="127.5" height="20.0" rx="3" fill="#15803d" fill-opacity="0.85" stroke="#15803d" stroke-width="0"/>
  <text x="365.0" y="46.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy</text>
  <text x="102.0" y="76.0" fill="#475569" font-size="10" text-anchor="end">τ_M (giữa)</text>
  <rect x="428.8" y="62.0" width="191.2" height="20.0" rx="3" fill="#b45309" fill-opacity="0.85" stroke="#b45309" stroke-width="0"/>
  <text x="524.4" y="76.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">chạy</text>
  <text x="102.0" y="106.0" fill="#475569" font-size="10" text-anchor="end">τ_L (thấp)</text>
  <rect x="110.0" y="92.0" width="191.2" height="20.0" rx="3" fill="#1d4ed8" fill-opacity="0.85" stroke="#1d4ed8" stroke-width="0"/>
  <text x="205.6" y="106.0" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="700">CS — thừa kế ưu tiên τ_H</text>
</svg>
τ_H bị block: **2 đơn vị** (t=1 đến t=3). Giảm đáng kể so với 5 đơn vị!

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo:** [Lesson 06 — Boot, Init & Driver](../lesson-06-boot-init-drivers/) — khám phá cách OS khởi động từ firmware đến user space.
- **Bài trước:** [Lesson 04 — Lập lịch đa nhân (SMP)](../lesson-04-smp-multicore-scheduling/) — lập lịch trên nhiều CPU.
- **Tham khảo thêm:** Liu, C.L. & Layland, J.W. (1973). "Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment". *Journal of the ACM*.

---

## 📝 Tổng kết Lesson 05

- **Hệ real-time** yêu cầu đúng kết quả VÀ đúng thời hạn. Hard real-time: vi phạm là thảm họa. Soft: vi phạm làm giảm chất lượng.
- **Task định kỳ** có 3 tham số: Period T, WCET C, Deadline D. Utilization $U = \frac{C}{T}$.
- **RMS**: ưu tiên tĩnh theo period, điều kiện đủ $\sum U_i \leq n \cdot (2^{1/n} - 1) \approx 69.3\%$.
- **EDF**: ưu tiên động theo deadline, tối ưu tuyệt đối, điều kiện đủ $\sum U_i \leq 100\%$.
- **Priority inversion**: task ưu tiên cao bị chặn bởi task ưu tiên trung bình gián tiếp qua mutex.
- **Priority inheritance**: giải pháp — tạm nâng ưu tiên task đang giữ lock lên bằng task bị block.
