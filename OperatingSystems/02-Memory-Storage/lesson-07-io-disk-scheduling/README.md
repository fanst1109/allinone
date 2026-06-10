# Lesson 07 — I/O & Disk Scheduling

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả cấu trúc vật lý của đĩa cứng (HDD): track, sector, cylinder, seek time, rotational latency, transfer time.
- Giải thích vì sao **thứ tự phục vụ request I/O** ảnh hưởng lớn đến hiệu năng.
- Thực hiện **walk-through đầy đủ** 5 thuật toán disk scheduling — FCFS, SSTF, SCAN, C-SCAN, LOOK/C-LOOK — trên cùng một hàng đợi cylinder, **tính tổng quãng đường di chuyển** đầu đọc.
- Phân biệt buffering, caching, DMA và vai trò của mỗi cơ chế trong I/O hiệu năng cao.
- Giải thích cách ngắt (interrupt) cho phép CPU không bận chờ I/O.

## Kiến thức tiền đề

- [Lesson 06 — Filesystem](../lesson-06-filesystem/): file được lưu trong block, block nằm ở cylinder/sector nào trên đĩa.
- [Lesson 01 — OS, Kernel, System Call](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): khái niệm interrupt, DMA, system call.

---

## 1. Cấu trúc vật lý đĩa cứng

### 1.1. Các thành phần

💡 **Trực giác — Analogy đĩa than (vinyl record):**
Đĩa cứng giống một đĩa than nhưng có nhiều mặt, cùng được đọc bởi nhiều cần kim (đầu đọc). Kim phải di chuyển về vị trí đúng (seek), rồi chờ đoạn cần đọc quay đến (rotation), rồi mới đọc được. Mỗi lần "kim di chuyển" là thời gian chết.

Các thành phần vật lý:

| Thành phần | Định nghĩa | Tương tự |
|-----------|-----------|---------|
| **Platter** | Đĩa từ hình tròn, có thể có nhiều mặt | Đĩa than |
| **Track** | Vòng tròn đồng tâm trên một mặt | Rãnh trên đĩa than |
| **Sector** | Phần nhỏ của track (thường 512 bytes hoặc 4 KB) | Đoạn nhỏ của rãnh |
| **Cylinder** | Tập hợp các track cùng vị trí trên tất cả platter | Hình trụ xuyên qua |
| **Đầu đọc (head/arm)** | Di chuyển theo hướng bán kính để chọn track | Kim đĩa than |
| **Spindle** | Trục quay các platter (5,400 hoặc 7,200 RPM) | Mô-tơ quay đĩa |

### 1.2. Các loại thời gian

$$\text{Thời gian truy cập} = \text{Seek time} + \text{Rotational latency} + \text{Transfer time}$$

**Seek time (thời gian tìm track):**
- Thời gian đầu đọc di chuyển từ cylinder hiện tại đến cylinder đích.
- Thường 5–15 ms cho HDD tiêu dùng.
- Phụ thuộc khoảng cách di chuyển (số cylinder).
- **Đây là yếu tố lớn nhất ảnh hưởng đến hiệu năng HDD.**

**Rotational latency (độ trễ quay):**
- Thời gian chờ sector cần đọc quay đến vị trí đầu đọc.
- Trung bình $= 1/2$ vòng quay $= 4.17$ ms với 7,200 RPM.
- Tính: 1 vòng / 7200 RPM $= 60{,}000 \text{ ms} / 7200 = 8.33$ ms → half rotation $= 4.17$ ms.

**Transfer time (thời gian truyền):**
- Thời gian đọc/ghi dữ liệu thực tế.
- Thường 0.5–2 ms cho một sector nhỏ (nhanh nhất, ít ảnh hưởng nhất).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao seek time quan trọng nhất?"* — Vì nó chiếm phần lớn tổng thời gian và phụ thuộc vào cách sắp xếp request. Rotational latency và transfer time ít kiểm soát được hơn.
- *"SSD có seek time không?"* — Không! SSD không có thành phần cơ học. Mọi địa chỉ truy cập đều nhanh như nhau (~0.05–0.1 ms). Đây là lý do SSD không cần disk scheduling. Lesson 08 sẽ nói kỹ hơn.

📝 **Tóm tắt mục 1:**
- HDD: platter → track → sector → cylinder, đầu đọc di chuyển theo bán kính.
- Thời gian = seek + rotational latency + transfer.
- Seek time là yếu tố chính, phụ thuộc thứ tự phục vụ request.

---

## 2. Vì sao cần disk scheduling?

### 2.1. Bài toán

Nhiều tiến trình đồng thời cần đọc/ghi đĩa → hàng đợi request tích lũy. Mỗi request là một (cylinder, track, sector). Thứ tự phục vụ ảnh hưởng trực tiếp đến tổng quãng đường di chuyển của đầu đọc → ảnh hưởng đến tổng thời gian.

**Chuỗi request dùng xuyên suốt bài:**

- **Hàng đợi cylinder:** `98 183 37 122 14 124 65 67`
- **Vị trí đầu đọc ban đầu:** 53
- **Tổng số cylinder:** 200 (cylinder 0–199)
- **Hướng di chuyển ban đầu (cho SCAN/LOOK):** đang đi về phía cylinder cao hơn (ascending)

💡 **Trực giác — bài toán người giao hàng:**
Một người giao hàng ở tòa nhà cần phục vụ các tầng: 98, 183, 37, 122, 14, 124, 65, 67. Xuất phát tầng 53. Cách giao theo thứ tự đặt hàng (lên-xuống-lên...) sẽ tốn rất nhiều thời gian di chuyển thang máy. Nhưng nếu sắp xếp thông minh → giảm tổng quãng đường.

📝 **Tóm tắt mục 2:**
- Nhiều request → hàng đợi → OS chọn thứ tự phục vụ.
- Mục tiêu: giảm tổng quãng đường = giảm tổng seek time.

---

## 3. Thuật toán FCFS (First Come, First Served)

### 3.1. Nguyên lý

**Phục vụ theo thứ tự đến:** Request nào đến trước phục vụ trước. Đơn giản nhất, không có optimization.

### 3.2. Walk-through

Hàng đợi: `98 183 37 122 14 124 65 67`. Đầu đọc tại 53.

| Bước | Từ | Đến | Di chuyển |
|------|-----|------|----------|
| 1 | 53 | 98 | 45 |
| 2 | 98 | 183 | 85 |
| 3 | 183 | 37 | 146 |
| 4 | 37 | 122 | 85 |
| 5 | 122 | 14 | 108 |
| 6 | 14 | 124 | 110 |
| 7 | 124 | 65 | 59 |
| 8 | 65 | 67 | 2 |

**Tổng quãng đường FCFS** $= 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = 640$ **cylinder**

⚠ **Lỗi thường gặp:** FCFS công bằng nhất về thứ tự nhưng tệ nhất về hiệu năng. Đầu đọc nhảy qua lại nhiều lần (ví dụ: 183 → 37 → 122 → 14 là di chuyển cực xa).

---

## 4. Thuật toán SSTF (Shortest Seek Time First)

### 4.1. Nguyên lý

**Luôn phục vụ request gần nhất** (về cylinder) với vị trí đầu đọc hiện tại. Tham lam (greedy) — tối ưu cục bộ từng bước.

### 4.2. Walk-through

Đầu tại 53. Hàng đợi còn lại: {98, 183, 37, 122, 14, 124, 65, 67}.

| Bước | Từ | Hàng đợi còn lại | Chọn | Di chuyển |
|------|-----|-----------------|------|----------|
| 1 | 53 | {98,183,37,122,14,124,65,67} | 65 (gần nhất: $\lvert 65-53 \rvert = 12$) | 12 |
| 2 | 65 | {98,183,37,122,14,124,67} | 67 ($\lvert 67-65 \rvert = 2$) | 2 |
| 3 | 67 | {98,183,37,122,14,124} | 98 ($\lvert 98-67 \rvert = 31$) | 31 |
| 4 | 98 | {183,37,122,14,124} | 122 ($\lvert 122-98 \rvert = 24$) | 24 |
| 5 | 122 | {183,37,14,124} | 124 ($\lvert 124-122 \rvert = 2$) | 2 |
| 6 | 124 | {183,37,14} | 183 ($\lvert 183-124 \rvert = 59$) | 59 |
| 7 | 183 | {37,14} | 37 ($\lvert 37-183 \rvert = 146$) | 146 |
| 8 | 37 | {14} | 14 ($\lvert 14-37 \rvert = 23$) | 23 |

**Tổng SSTF** $= 12 + 2 + 31 + 24 + 2 + 59 + 146 + 23 = 299$ **cylinder**

**SSTF tốt hơn FCFS gần gấp đôi!**

⚠ **Lỗi thường gặp — Starvation (đói):** Request ở cylinder xa (ví dụ 14 và 183 trong bài) phải chờ rất lâu nếu luôn có request mới đến gần vị trí đầu đọc hiện tại. SSTF không đảm bảo thời gian phục vụ tối đa.

---

## 5. Thuật toán SCAN (Elevator)

### 5.1. Nguyên lý

💡 **Trực giác — Thang máy:** Đầu đọc di chuyển theo một **hướng** (tăng hoặc giảm cylinder), phục vụ tất cả request trên đường đi. Khi đến cuối dải (cylinder 0 hoặc 199) → **đổi hướng** và quét ngược lại. Giống thang máy: đi lên phục vụ hết các tầng yêu cầu, đến tầng cao nhất → đi xuống phục vụ ngược lại.

### 5.2. Walk-through

Đầu tại 53, hướng đang đi: **ascending (tăng)**. Sắp xếp tất cả request theo thứ tự: 14, 37, 65, 67, 98, 122, 124, 183.

**Pha 1 (ascending — từ 53 lên):** 65, 67, 98, 122, 124, 183, **đến 199** (đầu đĩa).
**Pha 2 (descending — từ 199 xuống):** 37, 14.

| Bước | Từ | Đến | Di chuyển |
|------|-----|------|----------|
| 1 | 53 | 65 | 12 |
| 2 | 65 | 67 | 2 |
| 3 | 67 | 98 | 31 |
| 4 | 98 | 122 | 24 |
| 5 | 122 | 124 | 2 |
| 6 | 124 | 183 | 59 |
| 7 | 183 | 199 | 16 (đến cuối đĩa) |
| 8 | 199 | 37 | 162 |
| 9 | 37 | 14 | 23 |

**Tổng SCAN** $= 12+2+31+24+2+59+16+162+23 = 331$ **cylinder**

*(Lưu ý: SCAN đi đến cylinder 199 — đầu cuối — trước khi quay)*

---

## 6. Thuật toán C-SCAN (Circular SCAN)

### 6.1. Nguyên lý

**Chỉ phục vụ theo một chiều** (ví dụ ascending). Khi đến cuối dải → quay ngay lập tức về đầu (cylinder 0), **không phục vụ** trên đường quay về, rồi tiếp tục quét lên. Giống thang máy chỉ dừng khi đi lên, đi xuống chạy nhanh không dừng.

### 6.2. Walk-through

Đầu tại 53, ascending. Request trên đường đi lên (≥ 53): 65, 67, 98, 122, 124, 183. Request còn lại: 37, 14.

| Bước | Từ | Đến | Di chuyển | Ghi chú |
|------|-----|------|----------|---------|
| 1 | 53 | 65 | 12 | |
| 2 | 65 | 67 | 2 | |
| 3 | 67 | 98 | 31 | |
| 4 | 98 | 122 | 24 | |
| 5 | 122 | 124 | 2 | |
| 6 | 124 | 183 | 59 | |
| 7 | 183 | 199 | 16 | Đến cuối |
| 8 | 199 | 0 | 199 | Quay về 0, không phục vụ |
| 9 | 0 | 14 | 14 | |
| 10 | 14 | 37 | 23 | |

**Tổng C-SCAN** $= 12+2+31+24+2+59+16+199+14+23 = 382$ **cylinder**

**C-SCAN tệ hơn SCAN trong ví dụ này** nhưng có ưu điểm: thời gian chờ phân phối **đều hơn** — request ở cylinder thấp không phải chờ đầu đọc quét hết từ 199 về 0 rồi mới đến, mà quay nhanh về 0.

---

## 7. Thuật toán LOOK và C-LOOK

### 7.1. LOOK

Giống SCAN nhưng **không đi đến tận cylinder 0 hoặc 199** — chỉ đi đến request **xa nhất** theo hướng hiện tại rồi đổi chiều.

**Walk-through LOOK:** Đầu tại 53, ascending. Request cao nhất = 183. LOOK đi đến 183 (không đến 199).

| Bước | Từ | Đến | Di chuyển |
|------|-----|------|----------|
| 1 | 53 | 65 | 12 |
| 2 | 65 | 67 | 2 |
| 3 | 67 | 98 | 31 |
| 4 | 98 | 122 | 24 |
| 5 | 122 | 124 | 2 |
| 6 | 124 | 183 | 59 |
| 7 | 183 | 37 | 146 (đổi chiều, xuống) |
| 8 | 37 | 14 | 23 |

**Tổng LOOK** $= 12+2+31+24+2+59+146+23 = 299$ **cylinder**

### 7.2. C-LOOK

Giống C-SCAN nhưng chỉ quay về request thấp nhất (không về cylinder 0). Request thấp nhất = 14.

| Bước | Từ | Đến | Di chuyển | Ghi chú |
|------|-----|------|----------|---------|
| 1 | 53 | 65 | 12 | |
| 2 | 65 | 67 | 2 | |
| 3 | 67 | 98 | 31 | |
| 4 | 98 | 122 | 24 | |
| 5 | 122 | 124 | 2 | |
| 6 | 124 | 183 | 59 | Request cao nhất |
| 7 | 183 | 14 | 169 | Nhảy về request thấp nhất |
| 8 | 14 | 37 | 23 | |

**Tổng C-LOOK** $= 12+2+31+24+2+59+169+23 = 322$ **cylinder**

---

## 8. So sánh tổng hợp và lựa chọn thực tế

| Thuật toán | Tổng quãng đường | Starvation | Phân phối thời gian chờ | Dùng thực tế |
|-----------|-----------------|-----------|------------------------|-------------|
| FCFS | 640 | Không | Rất không đều | Hiếm |
| SSTF | 299 | **Có** | Không đều | Có |
| SCAN | 331 | Không | Tương đối đều | Có |
| C-SCAN | 382 | Không | **Đều nhất** | Nhiều nhất |
| LOOK | 299 | Không | Tương đối đều | **Khuyến nghị** |
| C-LOOK | 322 | Không | Đều | **Khuyến nghị** |

**Kết luận thực tế:**
- LOOK và C-LOOK thường được dùng vì không đi đến tận đầu/cuối đĩa → tiết kiệm di chuyển thừa.
- SSD: disk scheduling không cần thiết (không có seek time cơ học).
- Linux kernel: CFQ (Completely Fair Queuing), deadline, noop (cho SSD).

🔁 **Dừng lại tự kiểm tra:**

SSTF đạt tổng di chuyển bằng LOOK (299) nhưng có nhược điểm gì mà LOOK không có?

<details>
<summary>Đáp án</summary>
SSTF có thể gây **starvation**: nếu liên tục có request mới đến gần vị trí đầu đọc, request ở xa (cylinder 14 và 183 trong ví dụ) phải chờ vô hạn. LOOK đảm bảo mọi request được phục vụ trong tối đa 2 lần quét (qua rồi quay về) → không starvation.
</details>

---

## 9. Buffering, Caching, DMA và Interrupt

### 9.1. Buffering (Bộ đệm)

💡 **Trực giác:** Bồn rửa bát có hai tốc độ: vòi chảy nhanh, cống thoát chậm. Bồn là **buffer** — tích lũy nước khi vòi chảy nhanh hơn cống. Trong I/O: CPU xử lý dữ liệu nhanh hơn đĩa → buffer chứa dữ liệu đang chờ.

**Double buffering:** Trong khi CPU xử lý buffer 1, DMA đang nạp buffer 2 từ đĩa. Khi CPU xong buffer 1, đổi sang buffer 2 — CPU và đĩa làm việc song song.

### 9.2. Caching (Bộ nhớ đệm đĩa)

**Page cache** (buffer cache): OS lưu dữ liệu vừa đọc từ đĩa vào RAM. Lần sau cùng block được yêu cầu → phục vụ từ RAM, không cần đĩa (cache hit). Lesson 08 nói chi tiết hơn.

### 9.3. DMA (Direct Memory Access)

**Không dùng DMA:** CPU phải đọc từng byte từ controller đĩa vào register, rồi ghi vào RAM. CPU bận hoàn toàn suốt quá trình → không thể làm gì khác.

**Dùng DMA:** CPU nói với DMA controller: "Copy dữ liệu từ đĩa vào RAM địa chỉ X, số byte Y". DMA tự làm — CPU free để chạy tiến trình khác. Khi xong, DMA báo ngắt (interrupt) cho CPU.

**Tại sao DMA quan trọng?** Vì I/O tốc độ đĩa (MB/s) << tốc độ CPU (GHz operations/s). Nếu CPU chờ đĩa → lãng phí hàng nghìn CPU cycles mỗi lần I/O.

### 9.4. Interrupt (Ngắt)

Khi thiết bị I/O hoàn thành (đĩa đọc xong, DMA xong), nó gửi **interrupt signal** đến CPU. CPU tạm dừng tiến trình hiện tại, chạy **interrupt handler** (ISR — Interrupt Service Routine), xử lý kết quả I/O, rồi resume tiến trình.

**Không dùng interrupt → polling:** CPU liên tục hỏi "đĩa xong chưa?" trong vòng lặp → lãng phí CPU. Interrupt cho phép CPU làm việc hữu ích trong khi đợi I/O.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Interrupt có chi phí không?"* — Có: phải lưu/phục hồi trạng thái CPU (context switch nhỏ). Nhưng chi phí này nhỏ hơn nhiều so với lãng phí khi polling. Với I/O rất nhanh (ví dụ NVMe SSD < 0.05 ms), OS có thể dùng polling thay interrupt để tránh overhead.
- *"DMA controller là phần cứng hay phần mềm?"* — Phần cứng tích hợp trong chipset hoặc trên card I/O. OS chỉ cần lập trình địa chỉ và kích thước, hardware tự copy.

📝 **Tóm tắt mục 9:**
- Buffering: đệm tốc độ chênh lệch CPU/đĩa.
- Caching (page cache): tránh đọc đĩa lần 2 với dữ liệu đã có trong RAM.
- DMA: CPU giao việc copy bộ nhớ cho hardware, tự làm việc khác.
- Interrupt: thiết bị báo CPU khi xong, tránh polling.

---

## Bài tập

**Bài 1.** Hàng đợi cylinder: `176 79 34 60 92 11 41 114`, đầu đọc tại 50, hướng ascending, 200 cylinder (0–199). Tính tổng quãng đường cho: FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK.

**Bài 2.** Với bài 1, thuật toán nào tốt nhất về tổng quãng đường? Thuật toán nào tốt nhất về đảm bảo không starvation?

**Bài 3.** HDD 7,200 RPM. Tính rotational latency trung bình (ms). Nếu seek time trung bình 8 ms, transfer time 0.5 ms, truy cập ngẫu nhiên 1 sector mất bao lâu?

**Bài 4.** Giải thích vì sao với SSD NVMe, OS thường chọn scheduler "noop" (không sắp xếp, phục vụ theo thứ tự đến) thay vì LOOK hay C-SCAN.

**Bài 5.** Một tiến trình đọc file 1 MB lần đầu (cache miss) và lần thứ hai (cache hit). Mỗi lần, hệ thống cần bao nhiêu disk I/O? Giải thích vai trò của page cache.

## Lời giải chi tiết

### Bài 1 — Walk-through 6 thuật toán

Sắp xếp: {11, 34, 41, 60, 79, 92, 114, 176}. Đầu tại 50, ascending.

**FCFS** (theo thứ tự đến: 176, 79, 34, 60, 92, 11, 41, 114):

|50→176|176→79|79→34|34→60|60→92|92→11|11→41|41→114|
|------|------|-----|-----|-----|-----|-----|------|
|126|97|45|26|32|81|30|73|

**Tổng FCFS** $= 126 + 97 + 45 + 26 + 32 + 81 + 30 + 73 = 510$

**SSTF** (luôn chọn gần nhất):

| Từ | Chọn | Di chuyển | Lý do |
|----|------|----------|-------|
| 50 | 60 | 10 | $\lvert 60-50 \rvert = 10$ |
| 60 | 41 | 19 | $\lvert 41-60 \rvert = 19$ |
| 41 | 34 | 7 | $\lvert 34-41 \rvert = 7$ |
| 34 | 11 | 23 | $\lvert 11-34 \rvert = 23$ |
| 11 | 79 | 68 | còn {79,92,114,176}: 79 gần nhất |
| 79 | 92 | 13 | |
| 92 | 114 | 22 | |
| 114 | 176 | 62 | |

**Tổng SSTF** $= 10+19+7+23+68+13+22+62 = 224$

**SCAN** (ascending từ 50, đến 199, rồi xuống):

50 → 60 → 79 → 92 → 114 → 176 → **199** → 41 → 34 → 11

|50→60|60→79|79→92|92→114|114→176|176→199|199→41|41→34|34→11|
|-----|-----|-----|------|-------|-------|------|-----|-----|
|10|19|13|22|62|23|158|7|23|

**Tổng SCAN** $= 10+19+13+22+62+23+158+7+23 = 337$

**C-SCAN** (50 → ... → 199 → 0 → 11 → 34 → 41):

50→60→79→92→114→176→199 (giống SCAN phase 1: 151) + 199→0 (199) + 0→11 (11) + 11→34 (23) + 34→41 (7)

**Tổng C-SCAN** $= 151 + 199 + 11 + 23 + 7 = 391$

**LOOK** (ascending từ 50, chỉ đến 176 rồi xuống):

50 → 60 → 79 → 92 → 114 → 176 → 41 → 34 → 11

|50→60|60→79|79→92|92→114|114→176|176→41|41→34|34→11|
|-----|-----|-----|------|-------|------|-----|-----|
|10|19|13|22|62|135|7|23|

**Tổng LOOK** $= 10+19+13+22+62+135+7+23 = 291$

**C-LOOK** (50 → 176, nhảy về 11 rồi lên):

50→60→79→92→114→176 (151) + 176→11 (165) + 11→34 (23) + 34→41 (7)

**Tổng C-LOOK** $= 151+165+23+7 = 346$

**Bảng tổng hợp Bài 1:**

| Thuật toán | Tổng quãng đường |
|-----------|-----------------|
| FCFS | 510 |
| SSTF | **224** (tốt nhất) |
| SCAN | 337 |
| C-SCAN | 391 |
| LOOK | 291 |
| C-LOOK | 346 |

### Bài 2

**Tổng quãng đường tốt nhất:** SSTF (224). Nhưng SSTF có thể gây starvation.

**Không starvation tốt nhất:** SCAN, C-SCAN, LOOK, C-LOOK — đảm bảo mọi request được phục vụ trong hữu hạn thời gian. Trong số này, C-LOOK (346) và LOOK (291) cân bằng tốt hiệu năng và fairness.

### Bài 3

**Rotational latency:** 7,200 RPM = 7,200 vòng/phút = 120 vòng/giây.

Thời gian 1 vòng $= 1/120$ giây $= 8.33$ ms.

**Rotational latency trung bình** $= 8.33 / 2 = 4.17$ **ms.**

Tổng thời gian truy cập ngẫu nhiên 1 sector $= 8 \text{ ms (seek)} + 4.17 \text{ ms (rotation)} + 0.5 \text{ ms (transfer)} =$ **12.67 ms**.

### Bài 4

LOOK và C-SCAN giảm tổng seek time bằng cách sắp xếp lại thứ tự request theo cylinder. Điều này có giá trị vì di chuyển đầu đọc cơ học tốn kém.

**SSD NVMe không có đầu đọc cơ học** → không có seek time → mọi địa chỉ truy cập trong ~0.05–0.1 ms bất kể vị trí. Sắp xếp lại thứ tự không cải thiện gì về latency, chỉ thêm overhead tính toán trong OS. "Noop scheduler" (phục vụ nguyên thứ tự đến) giảm overhead và đảm bảo fairness tốt hơn.

### Bài 5

**Lần đọc đầu (cache miss):**
- OS nhận `read()` system call.
- Kiểm tra page cache: không có → cache miss.
- OS yêu cầu DMA copy dữ liệu từ đĩa vào page cache (RAM).
- File 1 MB với block 4 KB → 256 block → có thể **256 disk I/O** (nếu random) hoặc **1 lần đọc sequential** (nếu liền kề).
- Dữ liệu từ page cache → user buffer.

**Lần đọc thứ hai (cache hit):**
- OS kiểm tra page cache: có → cache hit.
- Copy trực tiếp từ RAM → user buffer.
- **0 disk I/O** (không truy cập đĩa).

**Vai trò page cache:** Lưu dữ liệu từ đĩa vào RAM sau lần đọc đầu. Mọi lần đọc sau phục vụ từ RAM (~100 ns) thay vì đĩa (~10 ms) → **nhanh hơn ~100,000 lần**. Đây là lý do hiệu năng database và web server phụ thuộc rất nhiều vào RAM (để page cache lớn).

## Liên kết và bài tiếp theo

- [Lesson 06 — Filesystem](../lesson-06-filesystem/) — filesystem giao tiếp với disk I/O
- [Lesson 08 — Lưu trữ hiện đại](../lesson-08-modern-storage/) — SSD, journaling, RAID, page cache chi tiết hơn
- [visualization.html](./visualization.html) — mô phỏng di chuyển đầu đọc interactive

## 📝 Tổng kết Lesson 07

- **HDD:** seek time (di chuyển arm) + rotational latency + transfer time; seek time quan trọng nhất.
- **FCFS:** đơn giản, tệ nhất (640 cylinder với ví dụ chuẩn).
- **SSTF:** tốt nhất về tổng quãng đường nhưng có starvation (299 cylinder).
- **SCAN/LOOK:** thang máy, đảm bảo fairness, không starvation (LOOK: 299, SCAN: 331).
- **C-SCAN/C-LOOK:** chỉ phục vụ một chiều, phân phối thời gian chờ đều hơn.
- **SSD:** không cần disk scheduling (không có seek cơ học).
- **DMA + Interrupt:** CPU không bận chờ I/O, làm việc khác, thiết bị báo ngắt khi xong.
- **Page cache:** cache đĩa trong RAM, biến đọc lần 2 từ hàng ms xuống ns.
