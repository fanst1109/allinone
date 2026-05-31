// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-04-cpu-scheduling/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Lập lịch CPU (CPU Scheduling)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **vì sao cần lập lịch CPU** và 3 metric đánh giá chất lượng: waiting time, turnaround time, response time.
- Thực hiện được **walk-through Gantt chart** cho FCFS, SJF, SRTF, Round Robin — tính tay waiting time và turnaround time trung bình.
- Phân biệt **preemptive** và **non-preemptive** scheduling: cái nào được phép cướp CPU, cái nào không.
- Giải thích **vấn đề starvation** và cách MLFQ (Multi-Level Feedback Queue) giải quyết.
- So sánh ưu nhược điểm các thuật toán và biết khi nào dùng cái nào.

## Kiến thức tiền đề

- [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): trạng thái Ready/Running, PCB, context switch.
- [Lesson 03 — Thread & Concurrency](../lesson-03-threads-concurrency/): thread là đơn vị lập lịch thực tế.

---

## 1. Vì sao cần lập lịch CPU?

### 1.1. Vấn đề: Nhiều process, một CPU

💡 **Trực giác — Analogy quầy thu ngân siêu thị:**
Có 10 khách hàng đang chờ trước 1 quầy thu ngân. Ai được phục vụ trước? Theo thứ tự đến trước? Người có ít hàng nhất? Người VIP? Mỗi chiến lược cho ra thứ tự khác nhau và tổng thời gian chờ khác nhau. **Lập lịch CPU** là bài toán tương tự: nhiều process ở hàng Ready, CPU (quầy thu ngân) chỉ xử lý được 1 tại một thời điểm — ai đi tiếp theo?

**Khi nào cần quyết định lập lịch?**
1. Process chuyển từ **Running → Waiting** (gọi I/O, sleep): phải chọn process khác.
2. Process chuyển từ **Running → Ready** (bị timer interrupt preempt): nên chọn process nào.
3. Process chuyển từ **Waiting → Ready** (I/O xong): có thể ưu tiên process vừa sẵn sàng.
4. Process **Terminated**: dọn sạch, chọn người tiếp theo.

### 1.2. Ba metric đánh giá

**CPU Utilization (độ tận dụng CPU):** Phần trăm thời gian CPU đang thực sự chạy code (không idle). Mục tiêu: cao nhất có thể (lý tưởng 100%, thực tế 40-90%).

**Waiting Time (thời gian chờ):** Tổng thời gian process nằm trong hàng Ready, chờ được CPU. **Mục tiêu: ngắn nhất có thể.**

Công thức: \`waiting_time = turnaround_time − burst_time\`

**Turnaround Time (thời gian hoàn thành):** Tổng thời gian từ khi process được submit đến khi hoàn tất. **Mục tiêu: ngắn nhất có thể.**

Công thức: \`turnaround_time = completion_time − arrival_time\`

**Response Time (thời gian phản hồi đầu tiên):** Thời gian từ khi process được submit đến khi *lần đầu tiên* được CPU (bắt đầu thực thi). Quan trọng cho interactive system (user đang chờ màn hình phản hồi).

Công thức: \`response_time = first_cpu_time − arrival_time\`

**Ví dụ cụ thể — Tính tay cho 1 process:**
- Process P: đến lúc t=0, burst time = 10ms, bắt đầu chạy lúc t=3ms, kết thúc lúc t=13ms.
- Waiting time = 13 - 10 - 0 = **3ms** (hoặc: turnaround - burst = 13 - 10 = 3ms).
- Turnaround time = 13 - 0 = **13ms**.
- Response time = 3 - 0 = **3ms**.

📝 **Tóm tắt mục 1:**
- Lập lịch = chọn process nào được CPU tiếp theo trong hàng Ready.
- Ba metric: waiting time (chờ CPU), turnaround time (tổng từ submit đến xong), response time (đến khi CPU lần đầu).
- Mục tiêu: minimize waiting và turnaround, maximize CPU utilization.

---

## 2. FCFS — First Come, First Served

### 2.1. Cách hoạt động

**FCFS (First Come, First Served):** Process nào đến hàng Ready trước thì được CPU trước. **Non-preemptive** — một khi CPU được trao, process giữ đến khi tự nguyện nhả (I/O hoặc exit).

### 2.2. Walk-through Gantt Chart — 4 Process

**Input:**

| Process | Arrival Time | Burst Time |
|---------|-------------|-----------|
| P1 | 0 ms | 24 ms |
| P2 | 1 ms | 3 ms |
| P3 | 2 ms | 3 ms |
| P4 | 3 ms | 5 ms |

**Thực hiện FCFS (theo thứ tự arrival):**
- t=0: P1 đến → CPU cho P1.
- P1 chạy từ t=0 đến t=24 (burst=24ms, không bị ngắt).
- t=24: P1 xong. Trong hàng Ready: P2(đến t=1), P3(đến t=2), P4(đến t=3) → P2 đến trước.
- P2 chạy từ t=24 đến t=27.
- P3 chạy từ t=27 đến t=30.
- P4 chạy từ t=30 đến t=35.

**Gantt Chart:**
\`\`\`
|----P1----|P2-|P3-|--P4--|
0          24  27  30    35
\`\`\`

**Tính waiting time và turnaround time:**

| Process | Arrival | Burst | Start | Finish | Turnaround | Waiting |
|---------|---------|-------|-------|--------|-----------|---------|
| P1 | 0 | 24 | 0 | 24 | 24−0=**24** | 24−24=**0** |
| P2 | 1 | 3 | 24 | 27 | 27−1=**26** | 26−3=**23** |
| P3 | 2 | 3 | 27 | 30 | 30−2=**28** | 28−3=**25** |
| P4 | 3 | 5 | 30 | 35 | 35−3=**32** | 32−5=**27** |

**Trung bình:**
- Average turnaround = (24 + 26 + 28 + 32) / 4 = 110 / 4 = **27.5 ms**
- Average waiting = (0 + 23 + 25 + 27) / 4 = 75 / 4 = **18.75 ms**

### 2.3. Convoy Effect (Hiệu ứng đoàn xe)

⚠ **Convoy Effect:** P1 (burst 24ms) chạy xong mới đến lượt P2, P3, P4 (mỗi cái chỉ 3-5ms). Các process ngắn phải chờ rất lâu sau process dài. Giống đoàn xe: xe tải chậm đi trước → cả hàng dài xe con phải đi theo.

**Nhược điểm FCFS:** Average waiting time cao khi có process dài ở trước. Hoàn toàn không tốt cho interactive system.

📝 **Tóm tắt mục 2:**
- FCFS: đến trước được trước, non-preemptive, đơn giản nhưng convoy effect → waiting time cao.
- Với 4 process trên: avg waiting = 18.75ms — P2/P3/P4 chờ quá lâu do P1 dài 24ms.

---

## 3. SJF — Shortest Job First (Non-Preemptive)

### 3.1. Cách hoạt động

**SJF (Shortest Job First):** Khi CPU rảnh, chọn process trong hàng Ready có **burst time ngắn nhất**. **Non-preemptive** — một khi bắt đầu, không bị cướp giữa chừng.

### 3.2. Walk-through Gantt Chart

**Input** (cùng 4 process, cùng arrival time, cùng burst time):

| Process | Arrival Time | Burst Time |
|---------|-------------|-----------|
| P1 | 0 ms | 24 ms |
| P2 | 1 ms | 3 ms |
| P3 | 2 ms | 3 ms |
| P4 | 3 ms | 5 ms |

**Thực hiện SJF:**

- t=0: Hàng Ready: chỉ P1 → cho P1 (dù P1 dài, không ai khác).
- P1 chạy từ t=0 → t=24.
- t=24: Hàng Ready: P2(burst=3), P3(burst=3), P4(burst=5) → SJF chọn burst ngắn nhất. P2 và P3 cùng 3ms → chọn P2 (đến trước).
- P2: t=24 → t=27.
- t=27: Hàng Ready: P3(3), P4(5) → P3.
- P3: t=27 → t=30.
- t=30: Hàng Ready: P4(5) → P4.
- P4: t=30 → t=35.

**Gantt Chart:**
\`\`\`
|----P1----|P2-|P3-|--P4--|
0          24  27  30    35
\`\`\`

Kết quả giống FCFS vì P1 đến t=0 khi không có ai khác → phải cho P1. Ưu thế SJF thể hiện rõ hơn khi các process đến cùng lúc:

**Ví dụ tốt hơn — Tất cả đến t=0:**

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 6 |
| P2 | 0 | 8 |
| P3 | 0 | 7 |
| P4 | 0 | 3 |

**SJF:** Sắp xếp theo burst: P4(3), P1(6), P3(7), P2(8).

\`\`\`
|-P4--|---P1---|----P3----|-----P2-----|
0     3        9          16           24
\`\`\`

| Process | Burst | Start | Finish | Turnaround | Waiting |
|---------|-------|-------|--------|-----------|---------|
| P4 | 3 | 0 | 3 | **3** | **0** |
| P1 | 6 | 3 | 9 | **9** | **3** |
| P3 | 7 | 9 | 16 | **16** | **9** |
| P2 | 8 | 16 | 24 | **24** | **16** |

- Average turnaround = (3 + 9 + 16 + 24) / 4 = 52 / 4 = **13 ms**
- Average waiting = (0 + 3 + 9 + 16) / 4 = 28 / 4 = **7 ms**

**So sánh với FCFS** (nếu chạy FCFS thứ tự P1, P2, P3, P4):
\`\`\`
|---P1---|-----P2-----|----P3----|--P4--|
0        6            14         21    24
\`\`\`
- FCFS avg waiting = (0 + 6 + 14 + 21) / 4 = 41 / 4 = **10.25 ms**
- SJF avg waiting = **7 ms** — giảm 32%!

**SJF cho average waiting time nhỏ nhất** trong số các non-preemptive algorithm — đây là kết quả có thể chứng minh được.

⚠ **Lỗi thường gặp — "SJF là thuật toán tốt nhất nên dùng mọi lúc":** SJF có 2 vấn đề thực tế:
1. **Không biết burst time trước:** Không ai biết process tiếp theo sẽ chạy bao lâu. OS phải *dự đoán* dựa trên burst time lịch sử (exponential averaging). Dự đoán có thể sai.
2. **Starvation:** Process dài có thể không bao giờ được chạy nếu luôn có process ngắn hơn đến sau. Process P với burst=100ms có thể chờ mãi nếu hàng liên tục có process burst=1ms.

📝 **Tóm tắt mục 3:**
- SJF: chọn process burst ngắn nhất, non-preemptive. Optimal cho average waiting time (khi biết burst time).
- Nhược điểm: không biết burst time thật, starvation cho process dài.

---

## 4. SRTF — Shortest Remaining Time First (Preemptive SJF)

### 4.1. Cách hoạt động

**SRTF (Shortest Remaining Time First):** Giống SJF nhưng **preemptive** — mỗi khi có process mới vào hàng Ready, so sánh burst time còn lại của process đang chạy với burst time của process mới. Nếu process mới ngắn hơn → cướp CPU.

### 4.2. Walk-through Gantt Chart

**Input:**

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

**Thực hiện SRTF từng bước:**

| Thời điểm | Sự kiện | Hàng Ready | CPU running | Remaining |
|-----------|---------|-----------|-------------|-----------|
| t=0 | P1 đến | {P1(8)} | P1 | P1:8 |
| t=1 | P2 đến | {P2(4)} | P2 cướp! P2(4) < P1(7 còn lại) | P1:7, P2:4 |
| t=2 | P3 đến | {P3(9)} | P2 tiếp (P2(3) < P3(9)) | P2:3, P3:9 |
| t=3 | P4 đến | {P4(5)} | P2 tiếp (P2(2) < P4(5)) | P2:2, P4:5 |
| t=5 | P2 xong | {P1(7),P3(9),P4(5)} | P4 (5 < 7 < 9) | P1:7, P4:5 |
| t=10 | P4 xong | {P1(7),P3(9)} | P1 (7 < 9) | P1:7, P3:9 |
| t=17 | P1 xong | {P3(9)} | P3 | P3:9 |
| t=26 | P3 xong | {} | idle | — |

**Gantt Chart:**
\`\`\`
|P1|--P2--|--P4--|---P1---|-----P3-----|
0  1     5     10       17           26
\`\`\`

**Tính toán:**

| Process | Arrival | Burst | Finish | Turnaround | Waiting |
|---------|---------|-------|--------|-----------|---------|
| P1 | 0 | 8 | 17 | 17−0=**17** | 17−8=**9** |
| P2 | 1 | 4 | 5 | 5−1=**4** | 4−4=**0** |
| P3 | 2 | 9 | 26 | 26−2=**24** | 24−9=**15** |
| P4 | 3 | 5 | 10 | 10−3=**7** | 7−5=**2** |

- **Average turnaround** = (17 + 4 + 24 + 7) / 4 = 52 / 4 = **13 ms**
- **Average waiting** = (9 + 0 + 15 + 2) / 4 = 26 / 4 = **6.5 ms**

**SRTF cho average waiting time nhỏ hơn SJF** (6.5 ms vs 7 ms trong ví dụ 4-process kia) vì có thể cướp CPU cho job ngắn hơn ngay khi chúng đến.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Context switch khi cướp CPU có tốn không?"* — Có. Mỗi lần cướp = 1 context switch = ~1-100 μs overhead. Trong ví dụ trên, có 5 context switch. Nếu burst time rất ngắn (1ms) và context switch 1 μs, overhead = 0.1% — chấp nhận được. Nhưng nếu burst time ngắn bằng context switch time → overhead tăng đáng kể.
- *"Làm sao biết remaining time?"* — Không biết chính xác. OS ước tính bằng exponential average: \`τ_{n+1} = α * t_n + (1-α) * τ_n\`, với \`t_n\` là burst thực tế lần trước, \`α\` thường = 0.5.

📝 **Tóm tắt mục 4:**
- SRTF = preemptive SJF: process mới đến nếu ngắn hơn remaining time → cướp CPU.
- Optimal cho average waiting time (trong số tất cả scheduling algorithm).
- Nhược điểm: nhiều context switch hơn, starvation vẫn có thể xảy ra, burst time không biết trước.

---

## 5. Round Robin

### 5.1. Cách hoạt động

**Round Robin (RR):** Mỗi process được cấp một khoảng thời gian CPU cố định gọi là **time quantum (q)** (thường 10–100 ms). Sau q ms, nếu process chưa xong → bị đưa về cuối hàng Ready. **Preemptive** và **công bằng**.

💡 **Trực giác:** Mỗi người trong nhóm được nói chuyện tối đa 2 phút. Hết 2 phút → nhường lời cho người tiếp theo, dù chưa nói xong. Vòng lặp đến khi mọi người nói hết.

### 5.2. Walk-through với q=4ms

**Input:**

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 12 |
| P2 | 0 | 5 |
| P3 | 0 | 3 |

**Thực hiện RR (q=4), tất cả đến t=0:**

Hàng Ready ban đầu: P1, P2, P3 (theo thứ tự đến hoặc thứ tự FCFS ban đầu).

| Interval | Process | Duration | P1 remain | P2 remain | P3 remain |
|----------|---------|----------|----------|----------|----------|
| 0–4 | P1 | 4 | 8 | 5 | 3 |
| 4–8 | P2 | 4 | 8 | 1 | 3 |
| 8–11 | P3 | 3 | 8 | 1 | 0 ← xong |
| 11–15 | P1 | 4 | 4 | 1 | — |
| 15–16 | P2 | 1 | 4 | 0 ← xong | — |
| 16–20 | P1 | 4 | 0 ← xong | — | — |

**Gantt Chart:**
\`\`\`
|-P1-|-P2-|-P3|---P1---|P2|-P1-|
0    4    8   11      15 16   20
\`\`\`

**Tính toán:**

| Process | Arrival | Burst | Finish | Turnaround | Waiting |
|---------|---------|-------|--------|-----------|---------|
| P1 | 0 | 12 | 20 | 20−0=**20** | 20−12=**8** |
| P2 | 0 | 5 | 16 | 16−0=**16** | 16−5=**11** |
| P3 | 0 | 3 | 11 | 11−0=**11** | 11−3=**8** |

- **Average turnaround** = (20 + 16 + 11) / 3 = 47 / 3 = **15.67 ms**
- **Average waiting** = (8 + 11 + 8) / 3 = 27 / 3 = **9 ms**

### 5.3. Chọn Time Quantum

Quantum ảnh hưởng lớn đến hiệu năng:

| Quantum | Hệ quả |
|---------|--------|
| **Quá nhỏ** (< 1ms) | Overhead context switch chiếm phần lớn CPU. Ví dụ: q=1ms, switch=1ms → 50% CPU lãng phí. |
| **Quá lớn** (→∞) | Round Robin thoái hoá thành FCFS. Response time tệ (process cuối phải chờ lâu). |
| **Lý tưởng** | q lớn hơn 80% burst time của các process. Thực tế: 10–100 ms trên hệ thống thời gian thực/tương tác. |

**Ví dụ tính overhead:** quantum=5ms, context switch=0.5ms. Overhead = 0.5/(5+0.5) = **9%** CPU — chấp nhận được. Nếu quantum=1ms: 0.5/(1+0.5) = **33%** — quá cao.

🔁 **Dừng lại tự kiểm tra:**

Process P1 (burst=20ms) và P2 (burst=3ms), cả hai đến t=0. Round Robin với q=5ms. Vẽ Gantt chart và tính response time của P2.

<details>
<summary>Đáp án</summary>
Hàng: P1, P2.

| Interval | Process | P1 remain | P2 remain |
|----------|---------|-----------|-----------|
| 0–5 | P1 | 15 | 3 |
| 5–8 | P2 | 15 | 0 ← xong |
| 8–13 | P1 | 10 | — |
| 13–18 | P1 | 5 | — |
| 18–23 | P1 | 0 ← xong | — |

Gantt: |---P1---|P2-|---P1---|---P1---|---P1---|
       0       5   8      13      18      23

Response time P2 = 5ms (P2 lần đầu tiên được CPU tại t=5).
</details>

📝 **Tóm tắt mục 5:**
- Round Robin: mỗi process có q ms CPU, sau đó ra cuối hàng. Công bằng, response time tốt cho interactive.
- q nhỏ → overhead cao. q lớn → như FCFS. Chọn q sao cho overhead < 10%.
- Good response time (không ai đợi quá q × n ms).

---

## 6. Priority Scheduling & MLFQ

### 6.1. Priority Scheduling

**Priority Scheduling:** Mỗi process có một số ưu tiên (priority number). Process ưu tiên cao nhất được CPU trước. Có thể preemptive hoặc non-preemptive.

**Vấn đề Starvation:** Process ưu tiên thấp có thể không bao giờ chạy nếu luôn có process ưu tiên cao hơn.

**Giải pháp — Aging:** Ưu tiên của process tăng dần theo thời gian chờ. Ví dụ: mỗi 15 phút chờ, tăng priority lên 1. Process ưu tiên thấp cuối cùng sẽ đủ ưu tiên để được chọn.

### 6.2. MLFQ — Multi-Level Feedback Queue

**MLFQ** kết hợp nhiều hàng chờ (queue) với ưu tiên khác nhau và quantum khác nhau, với feedback — process có thể di chuyển giữa các queue dựa trên hành vi.

💡 **Trực giác:** Nghĩ đến ưu tiên check-in ở sân bay: hành khách business class (queue Q1) được ưu tiên; hành khách economy nhưng có pre-check (Q2) tiếp theo; còn lại (Q3) chờ cuối. Tuy nhiên, nếu một hành khách business class mua vé rồi ngồi quá lâu, hệ thống có thể "hạ cấp" họ để tránh kẹt.

**Quy tắc MLFQ tiêu biểu:**

\`\`\`
Q1 (Priority cao nhất, quantum=8ms)
Q2 (Priority trung bình, quantum=16ms)
Q3 (Priority thấp nhất, FCFS)
\`\`\`

**Quy tắc:**
1. Process mới vào Q1.
2. Nếu process dùng hết quantum trong Q1 → chuyển xuống Q2 (đây là process CPU-intensive).
3. Nếu process dùng hết quantum trong Q2 → chuyển xuống Q3.
4. Nếu process nhường CPU trước khi hết quantum (gọi I/O) → ở lại queue hiện tại hoặc lên queue trên (đây là process interactive/I/O-bound).
5. **Periodic boost:** Định kỳ đưa mọi process lên Q1 — tránh starvation.

**Walk-through ví dụ:**
- P1 là editor (interactive): thường gọi I/O sau mỗi 5ms → không bao giờ hết quantum Q1(8ms) → luôn ở Q1, response time tốt.
- P2 là video encoder (CPU-bound): chạy liên tục → hết quantum Q1, xuống Q2, hết Q2, xuống Q3. Ở Q3 chạy FCFS — vẫn chạy được khi không có interactive task.

**Tại sao MLFQ hoạt động tốt:**
- Process interactive (I/O-bound): ngắn, thường nhường CPU trước hết quantum → ở queue cao → response time tốt.
- Process CPU-bound (batch): dài, tốn quantum → xuống queue thấp → không ảnh hưởng interactive task.
- Periodic boost đảm bảo không có starvation.

**MLFQ là nền tảng của scheduler thực tế** trong Linux (Completely Fair Scheduler — CFS), macOS, Windows.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"CFS của Linux có phải là MLFQ không?"* — CFS không phải MLFQ thuần tuý — nó dùng **virtual runtime** và **red-black tree** thay cho queue nhiều cấp. Mỗi process có \`vruntime\` — thời gian CPU ảo đã dùng (điều chỉnh theo priority). Scheduler luôn chọn process có \`vruntime\` nhỏ nhất (đã dùng CPU ít nhất). Nhưng ý tưởng cốt lõi — ưu tiên process đã dùng CPU ít — tương đồng với MLFQ.
- *"Burst time thật sự được dự đoán như thế nào?"* — OS dùng **exponential averaging**: \`τ_{n+1} = α × t_n + (1-α) × τ_n\`. Với \`α=0.5\`: dự đoán mới = 50% burst thực lần trước + 50% dự đoán cũ. Các burst gần đây có trọng số cao hơn — phản ánh hành vi hiện tại của process.

📝 **Tóm tắt mục 6:**
- Priority scheduling: process ưu tiên cao chạy trước. Starvation là vấn đề → dùng aging.
- MLFQ: nhiều queue với quantum và priority khác nhau. Process mới vào queue cao, tốn CPU nhiều → xuống queue thấp. Periodic boost tránh starvation.
- MLFQ là cơ sở của scheduler thực tế (Linux CFS, Windows scheduler).

---

## 7. So sánh các thuật toán

| Thuật toán | Preemptive | Avg Waiting | Starvation | Phù hợp với |
|-----------|-----------|------------|-----------|------------|
| **FCFS** | Không | Cao (convoy effect) | Không | Batch job đơn giản |
| **SJF** | Không | Thấp (optimal non-preemptive) | Có (process dài) | Batch system biết burst time |
| **SRTF** | Có | Thấp nhất (optimal overall) | Có (process dài) | Lý thuyết (burst time không biết trước) |
| **Round Robin** | Có | Trung bình | Không | Time-sharing, interactive |
| **Priority** | Có / Không | Tuỳ | Có (nếu không aging) | Real-time OS, hệ thống có class dịch vụ |
| **MLFQ** | Có | Thấp (interactive) | Không (với boost) | Hệ thống đa mục đích (Linux, macOS, Windows) |

**Không có thuật toán "tốt nhất" tuyệt đối** — mỗi cái tối ưu cho một mục tiêu:
- **Minimizing average waiting**: SJF/SRTF.
- **Fairness**: Round Robin.
- **Interactive response**: Round Robin, MLFQ.
- **Real-time deadlines**: Priority preemptive.
- **Thực tế đa dụng**: MLFQ (Linux CFS, Windows scheduler).

---

## Bài tập

**Bài 1** — FCFS với arrival time khác nhau.

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 10 |
| P2 | 3 | 4 |
| P3 | 6 | 5 |
| P4 | 7 | 2 |

Vẽ Gantt chart FCFS, tính waiting time và turnaround time của từng process, tính giá trị trung bình.

---

**Bài 2** — SJF Non-Preemptive.

Cùng 4 process ở Bài 1. Vẽ Gantt chart SJF non-preemptive, tính waiting time và turnaround time trung bình. So sánh với FCFS.

---

**Bài 3** — SRTF.

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

Vẽ Gantt chart SRTF, tính waiting time và turnaround time trung bình. Chỉ rõ từng thời điểm có context switch và lý do.

---

**Bài 4** — Round Robin.

| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 10 |
| P2 | 0 | 6 |
| P3 | 0 | 4 |

Quantum = 3ms. Vẽ Gantt chart, tính turnaround time và response time của từng process.

---

**Bài 5** — So sánh thuật toán.

Cho 3 process đến đồng thời lúc t=0:

| Process | Burst |
|---------|-------|
| P1 | 15 |
| P2 | 8 |
| P3 | 3 |

Tính average waiting time cho: (a) FCFS theo thứ tự P1, P2, P3. (b) SJF. (c) Round Robin với q=5ms. Thuật toán nào tốt nhất theo tiêu chí này?

---

**Bài 6** — MLFQ Tư duy.

Hệ thống MLFQ có Q1 (q=4ms), Q2 (q=8ms), Q3 (FCFS). Quy tắc: hết quantum → xuống queue; nhường CPU trước hết quantum → lên queue (hoặc giữ Q1).

Phân tích hành vi của 2 process:
- TextEditor: cứ sau 2ms gọi \`read()\` chờ phím gõ.
- Compiler: chạy CPU liên tục, mỗi lần burst 30ms.

(a) Sau 3 lần lập lịch, TextEditor ở queue nào? Compiler ở queue nào?
(b) Khi cả hai đều ở Ready, queue TextEditor cao hơn → TextEditor được CPU. Tại sao điều này tốt cho người dùng?

---

## Lời giải chi tiết

**Bài 1 — FCFS**

FCFS: phục vụ theo thứ tự arrival. P1(arrive=0) → P2(arrive=3) → P3(arrive=6) → P4(arrive=7).

| Interval | Process | P1 wait | P2 wait | P3 wait | P4 wait |
|----------|---------|---------|---------|---------|---------|
| 0–10 | P1 chạy | — | chờ | (chưa đến) | (chưa đến) |
| 10–14 | P2 chạy | — | — | chờ | (chưa đến) |
| 14–19 | P3 chạy | — | — | — | chờ |
| 19–21 | P4 chạy | — | — | — | — |

**Gantt:**
\`\`\`
|------P1------|--P2--|--P3--|P4|
0             10    14    19  21
\`\`\`

| Process | Arrival | Burst | Finish | Turnaround | Waiting |
|---------|---------|-------|--------|-----------|---------|
| P1 | 0 | 10 | 10 | 10 | 0 |
| P2 | 3 | 4 | 14 | 11 | 7 |
| P3 | 6 | 5 | 19 | 13 | 8 |
| P4 | 7 | 2 | 21 | 14 | 12 |

- **Avg turnaround** = (10+11+13+14)/4 = 48/4 = **12 ms**
- **Avg waiting** = (0+7+8+12)/4 = 27/4 = **6.75 ms**

---

**Bài 2 — SJF Non-Preemptive**

SJF: khi CPU rảnh, chọn process ngắn nhất trong hàng Ready.

- t=0: chỉ P1 → P1 chạy đến t=10.
- t=10: hàng Ready = {P2(4), P3(5), P4(2)} → P4 ngắn nhất(2) → P4 chạy.
- t=12: hàng = {P2(4), P3(5)} → P2(4) → P2 chạy.
- t=16: hàng = {P3(5)} → P3 → P3 chạy.

**Gantt:**
\`\`\`
|------P1------|P4|--P2--|--P3--|
0             10 12    16    21
\`\`\`

| Process | Arrival | Burst | Finish | Turnaround | Waiting |
|---------|---------|-------|--------|-----------|---------|
| P1 | 0 | 10 | 10 | 10 | 0 |
| P4 | 7 | 2 | 12 | 5 | 3 |
| P2 | 3 | 4 | 16 | 13 | 9 |
| P3 | 6 | 5 | 21 | 15 | 10 |

- **Avg turnaround** = (10+5+13+15)/4 = 43/4 = **10.75 ms**
- **Avg waiting** = (0+3+9+10)/4 = 22/4 = **5.5 ms**

**So sánh:** SJF avg waiting = 5.5ms vs FCFS avg waiting = 6.75ms — SJF tốt hơn 18%.

---

**Bài 3 — SRTF**

SRTF: mỗi khi process mới đến, so sánh burst của nó với remaining time của process đang chạy.

Theo dõi từng mốc:

| t | Sự kiện | Hàng Ready | CPU | Remaining |
|---|---------|-----------|-----|-----------|
| 0 | P1 đến | {P1(7)} | P1 | P1:7 |
| 2 | P2 đến (burst=4) | {P2(4)} | P2 cướp! 4 < 5(P1 còn lại) | P1:5, P2:4 |
| 4 | P3 đến (burst=1) | {P3(1)} | P3 cướp! 1 < 2(P2 còn lại) | P2:2, P3:1 |
| 5 | P3 xong | {P1(5),P2(2),P4(4)} | P2 (2 < 4 < 5) | P1:5, P2:2, P4:4 |
| 5 | P4 đến cùng lúc | (tính vào t=5) | P2 (2) ngắn nhất | |
| 7 | P2 xong | {P1(5),P4(4)} | P4 (4 < 5) | P1:5, P4:4 |
| 11 | P4 xong | {P1(5)} | P1 | P1:5 |
| 16 | P1 xong | {} | idle | — |

**Gantt:**
\`\`\`
|--P1--|--P2--|P3|-P2-|--P4--|---P1---|
0     2     4  5    7      11       16
\`\`\`

| Process | Arrival | Burst | Finish | Turnaround | Waiting |
|---------|---------|-------|--------|-----------|---------|
| P1 | 0 | 7 | 16 | 16 | 9 |
| P2 | 2 | 4 | 7 | 5 | 1 |
| P3 | 4 | 1 | 5 | 1 | 0 |
| P4 | 5 | 4 | 11 | 6 | 2 |

- **Avg turnaround** = (16+5+1+6)/4 = 28/4 = **7 ms**
- **Avg waiting** = (9+1+0+2)/4 = 12/4 = **3 ms**

Context switch xảy ra tại: t=2 (P2 cướp P1), t=4 (P3 cướp P2), t=5 (P2 quay lại), t=7 (P4 được CPU), t=11 (P1 quay lại) — tổng 5 context switch.

---

**Bài 4 — Round Robin, q=3ms**

P1(10), P2(6), P3(4), tất cả đến t=0. Hàng ban đầu: P1, P2, P3.

| Interval | Process | P1 rem | P2 rem | P3 rem |
|----------|---------|--------|--------|--------|
| 0–3 | P1 | 7 | 6 | 4 |
| 3–6 | P2 | 7 | 3 | 4 |
| 6–9 | P3 | 7 | 3 | 1 |
| 9–12 | P1 | 4 | 3 | 1 |
| 12–15 | P2 | 4 | 0 ← done | 1 |
| 15–16 | P3 | 4 | — | 0 ← done |
| 16–19 | P1 | 1 | — | — |
| 19–20 | P1 | 0 ← done | — | — |

**Gantt:**
\`\`\`
|-P1-|-P2-|-P3-|-P1-|-P2-|P3|-P1-|P1|
0    3    6    9   12  15 16  19  20
\`\`\`

| Process | Burst | Finish | Turnaround | Response Time |
|---------|-------|--------|-----------|--------------|
| P1 | 10 | 20 | 20 | 0 (bắt đầu t=0) |
| P2 | 6 | 15 | 15 | 3 (bắt đầu t=3) |
| P3 | 4 | 16 | 16 | 6 (bắt đầu t=6) |

- **Avg turnaround** = (20+15+16)/3 = 51/3 = **17 ms**
- **Avg response** = (0+3+6)/3 = 9/3 = **3 ms**

---

**Bài 5 — So sánh 3 thuật toán**

P1(15), P2(8), P3(3), tất cả t=0.

**(a) FCFS: thứ tự P1, P2, P3:**
\`\`\`
P1: finish=15, wait=0
P2: finish=23, wait=15
P3: finish=26, wait=23
Avg waiting = (0+15+23)/3 = 38/3 = 12.67 ms
\`\`\`

**(b) SJF: thứ tự P3(3), P2(8), P1(15):**
\`\`\`
P3: finish=3,  wait=0
P2: finish=11, wait=3
P1: finish=26, wait=11
Avg waiting = (0+3+11)/3 = 14/3 = 4.67 ms
\`\`\`

**(c) Round Robin, q=5ms:**

Hàng: P1, P2, P3.

| Interval | Process | P1 rem | P2 rem | P3 rem |
|----------|---------|--------|--------|--------|
| 0–5 | P1 | 10 | 8 | 3 |
| 5–10 | P2 | 10 | 3 | 3 |
| 10–13 | P3 | 10 | 3 | 0 done |
| 13–18 | P1 | 5 | 3 | — |
| 18–21 | P2 | 5 | 0 done | — |
| 21–26 | P1 | 0 done | — | — |

\`\`\`
P3: finish=13, wait=13-3=10
P2: finish=21, wait=21-8=13
P1: finish=26, wait=26-15=11
Avg waiting = (10+13+11)/3 = 34/3 = 11.33 ms
\`\`\`

**Bảng so sánh:**

| Thuật toán | Avg Waiting |
|-----------|------------|
| FCFS | **12.67 ms** |
| SJF | **4.67 ms** ← thấp nhất |
| Round Robin (q=5) | **11.33 ms** |

**SJF tốt nhất** cho average waiting time — đây là kết quả lý thuyết đã biết (SJF optimal cho non-preemptive). Tuy nhiên, nhớ rằng trong thực tế SJF không biết burst time trước.

---

**Bài 6 — MLFQ Tư duy**

**(a) Sau 3 lần lập lịch:**

**TextEditor:**
- Lần 1: Q1, quantum=4ms. Sau 2ms gọi \`read()\` → nhường CPU trước hết quantum → ở lại **Q1**.
- Lần 2: Q1, lại nhường sau 2ms → **Q1**.
- Lần 3: Q1, lại nhường sau 2ms → **Q1**.
→ TextEditor vẫn ở **Q1** sau 3 lần.

**Compiler:**
- Lần 1: Q1, quantum=4ms. Chạy hết 4ms mà không nhường → bị đưa xuống **Q2**.
- Lần 2: Q2, quantum=8ms. Chạy hết 8ms → bị đưa xuống **Q3**.
- Lần 3: Q3, FCFS. Chạy tiếp (còn 30-12=18ms còn lại)...
→ Compiler ở **Q3** sau 3 lần.

**(b) Tại sao điều này tốt cho người dùng:**

TextEditor ở Q1 (priority cao) → khi người dùng gõ phím, TextEditor được CPU ngay (response time ngắn, < 4ms). Người dùng thấy văn bản xuất hiện tức thì.

Nếu TextEditor phải cạnh tranh với Compiler ở cùng hàng chờ → đôi khi phải chờ Compiler xong batch của nó → delay 8-30ms → người dùng thấy "lag".

MLFQ nhận diện tự động: TextEditor là I/O-bound (interactive) → ưu tiên cao; Compiler là CPU-bound (batch) → ưu tiên thấp. Không cần lập trình viên khai báo loại process — hành vi của process tự nói lên điều đó.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 02 — Tiến trình](../lesson-02-process/): trạng thái Ready/Running là nền tảng để hiểu scheduling queue.
  - [Lesson 03 — Thread & Concurrency](../lesson-03-threads-concurrency/): Thread là đơn vị được scheduler lập lịch thực tế.
- Bài tiếp theo:
  - [Lesson 05 — Đồng bộ hoá (Synchronization)](../lesson-05-synchronization/): Race condition từ Lesson 03 được giải quyết bằng mutex, semaphore.
- Liên kết chéo:
  - [Algorithms — Greedy Algorithms](../../../Algorithms/): SJF là greedy algorithm — luôn chọn burst ngắn nhất tại thời điểm quyết định. Ý tưởng tương tự Huffman coding (symbol ngắn nhất được xử lý trước).
  - [DataStructures — Priority Queue](../../../DataStructures/): Hàng chờ của scheduler có thể được implement bằng priority queue (heap) để O(log n) lấy process ưu tiên cao nhất.

---

## 📝 Tổng kết Lesson 04

1. **Lập lịch CPU** = chọn process trong hàng Ready để cấp CPU. Metric: waiting time, turnaround time, response time.
2. **FCFS**: đơn giản, non-preemptive, convoy effect → avg waiting cao. Không phù hợp interactive.
3. **SJF**: chọn burst ngắn nhất, non-preemptive. Optimal avg waiting nhưng không biết burst time, starvation.
4. **SRTF**: preemptive SJF. Optimal tổng thể nhưng nhiều context switch, starvation vẫn có.
5. **Round Robin**: công bằng, preemptive, response time tốt. Chọn quantum hợp lý (10-100ms).
6. **MLFQ**: nhiều queue + feedback. Ưu tiên interactive, CPU-bound tự động xuống queue thấp. Nền tảng scheduler thực tế.

[Bài tiếp theo: Lesson 05 — Đồng bộ hoá](../lesson-05-synchronization/)
`;
