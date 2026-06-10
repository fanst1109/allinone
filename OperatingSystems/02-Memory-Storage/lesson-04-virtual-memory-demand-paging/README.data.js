// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-04-virtual-memory-demand-paging/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Bộ nhớ ảo & Demand Paging

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích ý tưởng **bộ nhớ ảo (virtual memory)**: tại sao tiến trình có thể dùng nhiều bộ nhớ hơn RAM vật lý có.
- Mô tả **demand paging** và **lazy loading**: trang chỉ được nạp khi cần.
- Giải thích **page fault**: khi nào xảy ra, OS xử lý như thế nào (từng bước).
- Tính **EAT (Effective Access Time)** khi có page fault, với walk-through số cụ thể.
- Giải thích **working set** và **thrashing** — khi nào hệ thống sụp đổ hiệu năng.

## Kiến thức tiền đề

- [Lesson 03 — TLB & Bảng trang nhiều cấp](../lesson-03-tlb-multilevel-paging/README.md) — bit valid/invalid trong PTE, TLB.

---

## 1. Bộ nhớ ảo (Virtual Memory)

### 1.1. Ý tưởng cốt lõi

💡 **Trực giác — Thư viện với hệ thống mượn sách:**
Thư viện chỉ có 10 kệ chứa sách (RAM). Nhưng tổng số sách là 1000 (không gian địa chỉ). Bí quyết: chỉ đặt lên kệ những cuốn đang được đọc. Khi ai đó cần cuốn không có trên kệ, nhân viên lấy từ kho (đĩa) mang lên — và cất đi một cuốn ít dùng nhất để nhường chỗ.

**Bộ nhớ ảo** làm y hệt: đĩa đóng vai trò "kho sách mở rộng", OS là "nhân viên thư viện". Tiến trình tưởng mình có toàn bộ không gian địa chỉ, nhưng thực ra chỉ một phần nhỏ đang nằm trong RAM — phần còn lại nằm trên đĩa (swap space).

**Kết quả:**
- Tổng bộ nhớ các tiến trình có thể vượt RAM vật lý.
- Tiến trình khởi động nhanh hơn (không cần nạp toàn bộ code ngay).
- Nhiều tiến trình chạy đồng thời hơn.

### 1.2. Bit valid/invalid trong PTE

Mỗi PTE (Page Table Entry) có **valid bit**:
- **Valid = 1**: trang đang nằm trong RAM, frame number hợp lệ → truy cập bình thường.
- **Valid = 0**: trang không ở RAM (chưa nạp, hoặc đang ở đĩa) → gây **page fault**.

**Ví dụ bảng trang:**

| Page | Frame | Valid | Ý nghĩa |
|------|-------|-------|---------|
| 0    | 4     | 1     | Trong RAM, frame 4 |
| 1    | —     | 0     | Trên đĩa (swap) |
| 2    | 7     | 1     | Trong RAM, frame 7 |
| 3    | —     | 0     | Chưa nạp (lazy) |
| 4    | 2     | 1     | Trong RAM, frame 2 |

Khi CPU tra bảng trang và thấy valid=0 → MMU phát ngắt → OS xử lý page fault.

❓ **Câu hỏi tự nhiên:**

- *"Tất cả các trang của tiến trình đều lưu trong swap không?"* — Không nhất thiết. Code của chương trình thường được ánh xạ trực tiếp từ file thực thi (executable). Khi page fault, OS nạp từ file, không từ swap. Chỉ heap/stack mới dùng swap.
- *"RAM 8 GB, swap 16 GB → tiến trình dùng được 24 GB không?"* — Về lý thuyết có, nhưng swap chậm hơn RAM hàng nghìn lần → hiệu năng suy giảm nặng nếu dùng swap nhiều (xem mục 5: thrashing).
- *"Android/iOS dùng swap không?"* — iOS không có swap truyền thống (dùng compressed memory). Android từ v4.4 có zRAM (swap vào RAM nén). Các thiết bị này thường kill tiến trình khi hết RAM thay vì swap chậm.

📝 **Tóm tắt mục 1:**
- Virtual memory = RAM + swap space = "RAM gần như vô hạn" nhìn từ tiến trình.
- Valid bit: 1 = trong RAM; 0 = phải nạp từ đĩa.
- Chỉ các trang đang dùng mới cần nằm trong RAM.

---

## 2. Demand Paging & Lazy Loading

### 2.1. Demand Paging là gì?

💡 **Trực giác — Đặt hàng theo yêu cầu:**
Thay vì mang toàn bộ kho hàng vào cửa hàng ngay từ đầu, chỉ đưa hàng ra khi khách hỏi mua. Nếu không ai hỏi, hàng ở kho mãi — tiết kiệm diện tích cửa hàng (RAM).

**Demand paging** = chỉ nạp trang vào RAM khi tiến trình thực sự truy cập (không nạp trước). Ban đầu, tất cả PTE của tiến trình mới có valid=0. Khi CPU truy cập trang đầu tiên → page fault → nạp → valid=1.

**Ưu điểm:**
- Khởi động tiến trình gần như tức thì (chỉ cần tạo page table, chưa nạp gì cả).
- Không lãng phí RAM cho code không bao giờ chạy (ví dụ: handler lỗi hiếm gặp).

**Ví dụ thực tế:** Bạn mở một ứng dụng lớn (trình soạn thảo 200 MB). Demand paging khiến nó hiện lên trong vài giây, dù chưa nạp hết — các trang chưa dùng sẽ được nạp khi bạn dùng đến.

### 2.2. Tiến trình hoàn toàn mới — Pure Demand Paging

Tiến trình bắt đầu không có trang nào trong RAM. Mọi truy cập đầu tiên đều gây page fault. OS nạp từng trang theo yêu cầu.

**Xét tiến trình 5 trang, chạy tuần tự code từ page 0:**

\`\`\`
Truy cập page 0 → page fault → nạp page 0 → tiếp tục
Truy cập page 0 lại → RAM hit → không fault
Truy cập page 1 → page fault → nạp page 1 → tiếp tục
...
\`\`\`

Sau khi các trang "nóng" (hot pages) được nạp, page fault giảm dần → steady state: hầu hết truy cập là RAM hit.

📝 **Tóm tắt mục 2:**
- Demand paging: nạp trang khi cần, không nạp trước.
- Tiết kiệm RAM và giảm thời gian khởi động tiến trình.
- Page fault ban đầu nhiều, sau đó giảm khi working set ổn định.

---

## 3. Page Fault — OS xử lý như thế nào?

### 3.1. Các bước xử lý page fault

💡 **Trực giác — Tìm sách không có trên kệ:**
Bạn đọc đến trang 100, nhân viên không tìm thấy sách trên kệ (valid=0) → dừng việc đọc → nhân viên vào kho tìm sách (đĩa) → đặt lên kệ → bạn đọc tiếp.

**Các bước chi tiết:**

\`\`\`
1. CPU phát địa chỉ ảo → MMU tra bảng trang.
2. Valid bit = 0 → MMU phát tín hiệu ngắt (trap) lên OS.
3. OS lưu trạng thái CPU (registers, PC, ...) vào PCB.
4. OS kiểm tra: địa chỉ hợp lệ không?
   - Nếu không hợp lệ (tiến trình truy cập vùng không được phép) → Segmentation Fault → kill tiến trình.
   - Nếu hợp lệ: tiếp tục bước 5.
5. OS tìm frame trống trong RAM.
   - Có frame trống: dùng luôn.
   - Không có frame trống: chọn victim frame để thay thế (Lesson 05).
6. OS đọc trang từ đĩa (I/O operation — rất chậm, ~8 ms).
7. Cập nhật bảng trang: ghi frame number vào PTE, set valid=1.
8. OS resume tiến trình từ instruction đã gây ra fault (tiến trình không biết gì đã xảy ra).
9. CPU thực thi lại instruction → lần này valid=1 → RAM hit → tiếp tục.
\`\`\`

⚠ **Lỗi thường gặp:**

*"Page fault là lỗi nghiêm trọng cần kill tiến trình."* — Sai. Page fault là sự kiện **bình thường** trong hệ thống dùng virtual memory. OS xử lý âm thầm, tiến trình không biết. Chỉ khi địa chỉ **thật sự không hợp lệ** mới dẫn đến kill tiến trình (Segmentation Fault).

### 3.2. Điểm then chốt: I/O đĩa là nút cổ chai

Bước 6 (đọc đĩa) mất ~8 ms (HDD) hoặc ~100 µs (SSD). Trong khi đó, RAM access chỉ ~100 ns.

- HDD: chậm hơn RAM **80,000 lần**.
- SSD: chậm hơn RAM **1,000 lần**.

→ Giảm thiểu page fault là tối quan trọng cho hiệu năng.

❓ **Câu hỏi tự nhiên:**

- *"Instruction bị lặp lại có gây vấn đề không?"* — Không, vì CPU được thiết kế để có thể restart instruction sau khi fault được xử lý. Đây gọi là **restartable instruction** — đặc điểm phần cứng bắt buộc khi thiết kế CPU hỗ trợ virtual memory.
- *"Nếu OS không tìm được frame trống thì sao?"* — OS phải **evict** (đuổi) một trang khác ra đĩa trước khi nạp trang mới. Đây là bài toán **page replacement** — chủ đề của Lesson 05.
- *"Dirty bit dùng để làm gì trong quá trình này?"* — Khi evict một frame, OS kiểm tra dirty bit. Nếu dirty=1 (trang đã bị sửa sau khi nạp vào RAM) → phải ghi ra đĩa trước khi evict (tránh mất dữ liệu). Nếu dirty=0 → đơn giản overwrite frame.

🔁 **Dừng lại tự kiểm tra:**

Tiến trình truy cập page 3 (valid=0). OS xác nhận địa chỉ hợp lệ. RAM có 2 frame trống. Liệt kê các bước từ khi page fault xảy ra đến khi tiến trình tiếp tục.

<details>
<summary>Đáp án</summary>

1. MMU phát ngắt (valid=0). 2. OS lưu trạng thái CPU. 3. Kiểm tra → hợp lệ. 4. Tìm frame trống → dùng một trong 2 frame. 5. Đọc page 3 từ đĩa vào frame chọn (~8ms). 6. Cập nhật PTE: frame=X, valid=1. 7. Resume tiến trình từ instruction gây fault. 8. CPU thực thi lại → valid=1 → RAM hit.
</details>

📝 **Tóm tắt mục 3:**
- Page fault = ngắt phần cứng → OS nạp trang từ đĩa → tiếp tục.
- 9 bước: trap → kiểm tra → tìm frame → đọc đĩa → cập nhật bảng → resume.
- I/O đĩa (~8 ms) là nguyên nhân chính page fault chậm.
- Page fault là bình thường trong virtual memory — chỉ fault ở địa chỉ không hợp lệ mới kill tiến trình.

---

## 4. EAT với Page Fault

### 4.1. Công thức

$$EAT = (1 - p) \\cdot t_{\\text{mem}} + p \\cdot t_{\\text{fault}}$$

Trong đó:
- $p$ = page fault rate (tỷ lệ truy cập gây page fault, $0 \\leq p \\leq 1$).
- $t_{\\text{mem}}$ = thời gian truy cập RAM bình thường.
- $t_{\\text{fault}}$ = thời gian xử lý một page fault (bao gồm I/O đĩa).

### 4.2. Walk-through EAT — Ví dụ 1 (HDD)

**Thông số:**
- $p =$ **0.001** (1 trong 1000 truy cập gây fault — khá thực tế)
- $t_{\\text{mem}} =$ **100 ns**
- $t_{\\text{fault}} =$ **8 ms = 8,000,000 ns** (HDD)

$$\\begin{aligned}
EAT &= (1 - 0.001) \\cdot 100 + 0.001 \\cdot 8{,}000{,}000 \\\\
    &= 0.999 \\cdot 100 + 0.001 \\cdot 8{,}000{,}000 \\\\
    &= 99.9 + 8{,}000 = 8{,}099.9 \\text{ ns} \\approx 8.1 \\text{ µs}
\\end{aligned}$$

**So sánh:** RAM bình thường 100 ns; với p=0.001 → EAT = 8100 ns → **chậm hơn 81 lần**!

Đây là lý do page fault cần được giảm thiểu.

### 4.3. Walk-through EAT — Ví dụ 2 (SSD)

**Thông số:**
- $p =$ **0.001**
- $t_{\\text{mem}} =$ **100 ns**
- $t_{\\text{fault}} =$ **100 µs = 100,000 ns** (SSD)

$$\\begin{aligned}
EAT &= 0.999 \\cdot 100 + 0.001 \\cdot 100{,}000 \\\\
    &= 99.9 + 100 = 199.9 \\text{ ns} \\approx 200 \\text{ ns}
\\end{aligned}$$

SSD: chậm hơn 2 lần — chấp nhận được hơn nhiều.

### 4.4. Walk-through EAT — Ví dụ 3 (p nhỏ hơn)

**Thông số (HDD, $p = 0.00001$):**
- $t_{\\text{mem}} = 100$ ns, $t_{\\text{fault}} = 8{,}000{,}000$ ns.

$$\\begin{aligned}
EAT &= 0.99999 \\cdot 100 + 0.00001 \\cdot 8{,}000{,}000 \\\\
    &= 99.999 + 80 = 179.999 \\text{ ns} \\approx 180 \\text{ ns}
\\end{aligned}$$

Chỉ chậm hơn 80% — gần như ổn. Bài học: **giữ page fault rate $< 0.00001$ (1 phần 100,000)** để overhead chấp nhận được với HDD.

### 4.5. Walk-through EAT — Tính ngược p tối đa cho mục tiêu EAT

**Yêu cầu:** $EAT \\leq 200$ ns, $t_{\\text{mem}} = 100$ ns, $t_{\\text{fault}} = 8{,}000{,}000$ ns (HDD).

$$\\begin{aligned}
(1-p) \\cdot 100 + p \\cdot 8{,}000{,}000 &\\leq 200 \\\\
100 - 100p + 8{,}000{,}000p &\\leq 200 \\\\
7{,}999{,}900p &\\leq 100 \\\\
p &\\leq 100 / 7{,}999{,}900 \\approx 0.0000125 \\\\
p &\\leq 1.25 \\times 10^{-5}
\\end{aligned}$$

Kết luận: phải giữ page fault rate dưới **0.00125%** (1 fault / 80,000 truy cập) để EAT ≤ 200 ns với HDD.

❓ **Câu hỏi tự nhiên:**

- *"Page fault rate thực tế là bao nhiêu?"* — Với workload thông thường và RAM đủ: $p \\approx 10^{-6}$ đến $10^{-5}$. Khi RAM đầy và thrashing xảy ra: $p$ có thể tăng vọt lên 0.01–0.1.
- *"t_fault = 8ms có bao gồm thời gian evict không?"* — Nếu frame trống: t_fault = thời gian đọc đĩa (~8ms). Nếu phải evict dirty page: t_fault = ghi đĩa (8ms) + đọc đĩa (8ms) = ~16ms.

📝 **Tóm tắt mục 4:**
- $EAT = (1-p) \\cdot t_{\\text{mem}} + p \\cdot t_{\\text{fault}}$.
- Với HDD và $p = 0.001$: EAT tăng 81× → phải giữ $p$ cực nhỏ.
- SSD giảm $t_{\\text{fault}}$ 80× → hệ thống virtual memory thực tế hơn nhiều.
- Mục tiêu: $p < 10^{-5}$ với HDD; thoải mái hơn với SSD.

---

## 5. Working Set & Thrashing

### 5.1. Working Set — Tập trang đang làm việc

**Working set $W(t, \\Delta)$** = tập các trang tiến trình truy cập trong $\\Delta$ đơn vị thời gian gần nhất. $\\Delta$ là **cửa sổ working set (working set window)**.

**Ví dụ:** Chuỗi truy cập trang: 1, 2, 3, 4, 3, 2, 1, 1, 2, 5. Với $\\Delta = 5$:

- Tại $t = 10$ (5 truy cập gần nhất: 1, 1, 2, 5, ...): $W = \\{1, 2, 5\\}$ — cần 3 frame.

**Ý nghĩa:** Nếu OS cấp cho tiến trình $\\geq |W|$ frame → gần như không có page fault (tất cả trang đang dùng đều nằm trong RAM).

### 5.2. Locality of Reference

Chương trình thực tế truy cập bộ nhớ theo mô hình **cục bộ (locality)**:

- **Temporal locality**: vòng lặp truy cập cùng biến nhiều lần.
- **Spatial locality**: truy cập mảng theo thứ tự → các phần tử liên tiếp (cùng trang).

Nhờ locality, working set thường chỉ gồm vài chục đến vài trăm trang — nhỏ hơn nhiều so với toàn bộ không gian địa chỉ.

### 5.3. Thrashing — Hiệu năng sụp đổ

💡 **Trực giác — Thủ thư bị điên:**
10 kệ, 100 cuốn đang yêu cầu đồng thời. Thủ thư không ngừng lấy sách từ kho lên rồi cất xuống, lấy lên cất xuống... không còn thời gian để phục vụ ai đọc thật sự.

**Thrashing** = OS dành gần như toàn bộ thời gian xử lý page fault thay vì chạy tiến trình.

**Nguyên nhân:** Tổng working set của tất cả tiến trình > RAM vật lý.

Nếu $\\sum_i |W(t_i)| >$ số frame RAM, thì:

\`\`\`
thiếu frame → page fault liên tục → CPU utilization giảm
→ OS nạp thêm tiến trình (CPU idle có vẻ "rảnh") → thậm chí thiếu frame hơn
→ vòng luẩn quẩn → thrashing
\`\`\`

**Dấu hiệu thrashing:**

- CPU utilization thấp (< 20%) dù hệ thống "bận".
- Disk activity cực cao (đèn HDD sáng liên tục).
- Các tiến trình đều chạy cực chậm.
- Swap usage gần 100%.

**Giải pháp:**

1. **Giảm số tiến trình đồng thời** (OS kill/swap out một số tiến trình).
2. **Tăng RAM** (dài hạn).
3. **Working set model**: OS chỉ cho tiến trình chạy khi có đủ frame cho working set của nó.
4. **Page fault frequency (PFF) algorithm**: theo dõi tỷ lệ fault; nếu cao → cấp thêm frame; nếu thấp → lấy bớt frame.

⚠ **Lỗi thường gặp:**

*"CPU utilization thấp = hệ thống nhàn rỗi, có thể chạy thêm tiến trình."* — Đây chính là bẫy thrashing! CPU utilization thấp do thrashing không phải do hệ thống rảnh. Nạp thêm tiến trình sẽ làm mọi thứ tệ hơn.

🔁 **Dừng lại tự kiểm tra:**

Hệ thống có 20 frame RAM. 3 tiến trình có working set lần lượt: {1,2,3,4,5}, {6,7,8,9,10,11}, {12,13,14,15,16}. Có xảy ra thrashing không?

<details>
<summary>Đáp án</summary>

$\\sum |W| = 5 + 6 + 5 = 16$ frame. $16 \\leq 20$ → đủ frame cho cả 3 tiến trình. **Không thrashing.** Còn dư 4 frame có thể dùng cho tiến trình mới hoặc buffer.
</details>

📝 **Tóm tắt mục 5:**
- Working set: tập trang tiến trình dùng trong cửa sổ thời gian $\\Delta$.
- Cấp đủ frame cho working set → fault thấp.
- Thrashing = tổng working set > RAM → fault liên tục → CPU util thấp → hệ thống tê liệt.
- Giải pháp: giảm tiến trình, hoặc dùng working set model / PFF.

---

## Bài tập

**Bài 1.** Tiến trình có bảng trang: page 0→frame 3 (valid), page 1→invalid, page 2→frame 7 (valid), page 3→invalid, page 4→frame 1 (valid). CPU truy cập địa chỉ ảo 8200 (page size 4096). Page fault hay không? Nếu không: tính địa chỉ vật lý.

**Bài 2.** t_mem = 100 ns, t_fault = 10 ms (HDD), p = 0.0001.
- (a) Tính EAT.
- (b) EAT gấp bao nhiêu lần truy cập RAM bình thường?

**Bài 3.** Yêu cầu EAT ≤ 300 ns, t_mem = 150 ns, t_fault = 5 ms (SSD tốt). Tính p tối đa.

**Bài 4.** Liệt kê toàn bộ các bước OS thực hiện khi xử lý page fault cho page 1 (invalid) của tiến trình ở Bài 1. RAM đang đầy (cần evict frame 7, dirty bit = 1).

**Bài 5 (nâng cao).** Hệ thống 16 frame. Tiến trình A có working set {1,2,3} (3 frame), B có {4,5,6,7,8} (5 frame), C có {9,10,11,12,13,14} (6 frame). OS đang muốn nạp thêm tiến trình D có working set {15,16,17} (3 frame). Có nên nạp không? Phân tích.

---

## Lời giải chi tiết

### Bài 1 — Kiểm tra page fault cho địa chỉ 8200

- page = 8200 ÷ 4096 = **2** (thương nguyên: 2 × 4096 = 8192, còn lại 8).
- offset = 8200 − 8192 = **8**.
- Tra bảng trang: page 2 → frame 7, valid = **1** → **Không page fault**.
- Địa chỉ vật lý = 7 × 4096 + 8 = 28672 + 8 = **28680**.

### Bài 2 — EAT với HDD

**(a)**

$$\\begin{aligned}
EAT &= (1 - 0.0001) \\cdot 100 + 0.0001 \\cdot 10{,}000{,}000 \\\\
    &= 0.9999 \\cdot 100 + 0.0001 \\cdot 10{,}000{,}000 \\\\
    &= 99.99 + 1{,}000 = 1{,}099.99 \\text{ ns} \\approx 1{,}100 \\text{ ns}
\\end{aligned}$$

**(b)** $EAT / t_{\\text{mem}} = 1100 / 100 =$ **11 lần** chậm hơn. Với $p$ chỉ 0.01% (1/10000), hệ thống đã chậm hơn 11 lần!

### Bài 3 — Tính p tối đa

$$\\begin{aligned}
(1-p) \\cdot 150 + p \\cdot 5{,}000{,}000 &\\leq 300 \\\\
150 - 150p + 5{,}000{,}000p &\\leq 300 \\\\
4{,}999{,}850p &\\leq 150 \\\\
p &\\leq 150 / 4{,}999{,}850 \\approx 3 \\times 10^{-5}
\\end{aligned}$$

Phải giữ $p <$ **0.00003** (3 fault / 100,000 truy cập).

### Bài 4 — Các bước xử lý page fault cho page 1 (RAM đầy, frame 7 dirty)

1. CPU truy cập page 1 → MMU tra bảng trang → valid=0 → MMU phát ngắt page fault.
2. OS lưu trạng thái CPU (PC, registers) vào PCB.
3. OS kiểm tra: địa chỉ page 1 có hợp lệ trong không gian địa chỉ tiến trình? → Có → tiếp tục.
4. OS tìm frame trống → RAM đầy → chọn victim: frame 7 (đang giữ page 2).
5. Dirty bit của frame 7 = 1 → OS ghi frame 7 ra đĩa (~8ms). Cập nhật PTE page 2: valid=0.
6. OS đọc page 1 từ đĩa vào frame 7 (~8ms).
7. OS cập nhật bảng trang: PTE page 1: frame=7, valid=1; dirty=0.
8. OS resume tiến trình từ instruction gây fault.
9. CPU thực thi lại instruction → tra bảng trang → valid=1, frame=7 → tính địa chỉ vật lý → tiếp tục.

**Tổng thời gian bước 5+6 ≈ 16ms** (vì dirty page cần ghi + đọc).

### Bài 5 — Có nên nạp tiến trình D?

Tổng working set hiện tại: $3 + 5 + 6 =$ **14 frame**.
Nếu nạp D: tổng $= 14 + 3 =$ **17 frame** $> 16$ frame (RAM).

**Không nên nạp D.** Tổng working set vượt RAM → thrashing. OS nên từ chối hoặc swap out một tiến trình hiện tại trước.

**Nếu swap out A** (working set 3 frame): còn lại B+C+D $= 5+6+3 = 14 \\leq 16$ frame → an toàn.

---

## Liên kết và bài tiếp theo

- **Bài trước:** [Lesson 03 — TLB & Bảng trang nhiều cấp](../lesson-03-tlb-multilevel-paging/README.md).
- **Bài tiếp theo:** [Lesson 05 — Thuật toán thay trang](../lesson-05-page-replacement/README.md) — khi không còn frame trống, chọn page nào để evict?
- **Visualization:** [visualization.html](./visualization.html).

---

## 📝 Tổng kết Lesson 04

- **Virtual memory** = RAM + swap → tiến trình thấy không gian địa chỉ "vô hạn".
- **Demand paging**: nạp trang khi cần, không nạp trước → khởi động nhanh, tiết kiệm RAM.
- **Page fault**: valid=0 → ngắt → OS nạp từ đĩa → resume. Bình thường; chỉ fault địa chỉ sai mới kill tiến trình.
- $EAT = (1-p) \\cdot t_{\\text{mem}} + p \\cdot t_{\\text{fault}}$. HDD: $p = 0.001$ → EAT tăng 81×. SSD: nhẹ hơn nhiều.
- **Thrashing**: $\\sum$ working set > RAM → fault liên tục → CPU util thấp. Giải pháp: giảm tiến trình hoặc tăng RAM.
`;
