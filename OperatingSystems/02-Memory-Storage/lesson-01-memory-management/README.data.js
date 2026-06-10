// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-01-memory-management/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Quản lý bộ nhớ (Memory Management)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được sự khác biệt giữa **địa chỉ logic (logical address)** và **địa chỉ vật lý (physical address)**, vai trò của **MMU (Memory Management Unit)**.
- Mô tả cơ chế **cấp phát liền kề (contiguous allocation)** với **base register** và **limit register**.
- Thực hiện tay **walk-through** cho ba chiến lược first-fit, best-fit, worst-fit với danh sách lỗ trống cụ thể.
- Phân biệt **phân mảnh ngoài (external fragmentation)** và **phân mảnh trong (internal fragmentation)**.
- Hiểu ý tưởng của **compaction** và vì sao nó tốn kém.

## Kiến thức tiền đề

- [OperatingSystems — Lesson 08 Tầng 1: IPC](../../01-Foundations-Processes/lesson-08-ipc/README.md) — tiến trình và không gian địa chỉ.

---

## 1. Địa chỉ logic vs địa chỉ vật lý

### 1.1. Vấn đề đặt ra

💡 **Trực giác — Analogy căn hộ:**
Hãy tưởng tượng một tòa nhà chung cư (RAM vật lý). Mỗi chủ căn hộ đánh số phòng riêng trong căn của mình: "phòng 1 = phòng ngủ", "phòng 2 = nhà bếp" — những số này là **địa chỉ logic** (chỉ có ý nghĩa trong căn hộ đó). Bảo vệ tòa nhà biết thực tế căn hộ nằm ở tầng 5, từ phòng 501 đến 508 — đó là **địa chỉ vật lý**. Người dịch giữa hai hệ số này là **MMU** (như quầy lễ tân ánh xạ "phòng ngủ tầng 5" → "501").

**Vấn đề thực:** Một tiến trình khi biên dịch không biết mình sẽ được nạp vào vị trí nào trong RAM. Địa chỉ trong file thực thi (executable) bắt đầu từ 0 — đó là địa chỉ logic. Khi nạp vào RAM, OS đặt tiến trình ở một vị trí thực tế nào đó — đó là địa chỉ vật lý.

### 1.2. MMU và cơ chế dịch địa chỉ

**MMU (Memory Management Unit)** là một chip phần cứng (thường tích hợp vào CPU) thực hiện việc dịch địa chỉ ở tốc độ phần cứng — không phải phần mềm — nên rất nhanh.

Cơ chế đơn giản nhất: **base register + limit register**.

$$\\text{Địa chỉ vật lý} = \\text{Địa chỉ logic} + \\text{Base}$$

$$\\text{Điều kiện hợp lệ:} \\quad \\text{Địa chỉ logic} < \\text{Limit}$$

**Walk-through cụ thể:**

| Thông số | Giá trị |
|----------|---------|
| Base register | 14000 |
| Limit register | 4096 |

- Tiến trình truy cập địa chỉ logic **0** → vật lý = 0 + 14000 = **14000** (hợp lệ vì 0 < 4096).
- Tiến trình truy cập địa chỉ logic **1000** → vật lý = 1000 + 14000 = **15000** (hợp lệ vì 1000 < 4096).
- Tiến trình truy cập địa chỉ logic **4100** → 4100 ≥ 4096 → **Segmentation Fault** (bảo vệ bộ nhớ!).
- Tiến trình truy cập địa chỉ logic **4095** → vật lý = 4095 + 14000 = **18095** (hợp lệ, byte cuối cùng).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tiến trình B đọc được vùng nhớ của tiến trình A không?"* — Không. Mỗi tiến trình có base/limit riêng. MMU kiểm tra limit trước khi truy cập. Tiến trình B không biết base của A, và dù biết cũng không thể tạo địa chỉ vật lý của A (vì MMU cộng base của B, không phải A).
- *"Context switch thì sao?"* — OS lưu base/limit vào PCB (Process Control Block) khi switch out, nạp lại khi switch in. Mỗi tiến trình có cặp base/limit riêng.
- *"Chỉ base+limit là đủ không?"* — Chưa đủ. Tiến trình thường có nhiều vùng (code, heap, stack) nằm rải rác. Paging giải quyết vấn đề này — xem Lesson 02.

🔁 **Dừng lại tự kiểm tra:**

Tiến trình có base = 8000, limit = 2000. CPU phát địa chỉ logic 1999 và 2000. Địa chỉ vật lý tương ứng là gì? Có lỗi không?

<details>
<summary>Đáp án</summary>

- Logic 1999: 1999 < 2000 (hợp lệ) → vật lý = 1999 + 8000 = **9999**.
- Logic 2000: 2000 ≥ 2000 (vi phạm limit!) → **Segmentation Fault**, không tính địa chỉ vật lý.
</details>

📝 **Tóm tắt mục 1:**
- Địa chỉ logic = địa chỉ "tương đối" bên trong tiến trình (bắt đầu từ 0).
- Địa chỉ vật lý = địa chỉ thực trong RAM chip.
- MMU dịch: $\\text{vật lý} = \\text{logic} + \\text{base}$; kiểm tra: $\\text{logic} < \\text{limit}$.
- Bảo vệ: tiến trình vi phạm limit → lỗi phần cứng ngay lập tức.

---

## 2. Cấp phát liền kề (Contiguous Allocation)

### 2.1. Ý tưởng

💡 **Trực giác — Bãi đỗ xe:**
RAM là một bãi đỗ xe dài. Mỗi tiến trình là một chiếc xe cần N ô liền nhau (vì base+limit chỉ mô tả một dải liên tục). OS phải tìm N ô trống liền tiếp để đặt xe vào.

Khi các tiến trình kết thúc, chúng rời bãi, để lại các **lỗ trống (hole)** rải rác. Khi tiến trình mới đến, OS phải tìm lỗ đủ lớn.

### 2.2. Ba chiến lược tìm lỗ

Giả sử danh sách lỗ trống hiện tại (địa chỉ bắt đầu, kích thước):

\`\`\`
Lỗ A: [địa chỉ 0,    kích thước 100 KB]
Lỗ B: [địa chỉ 200,  kích thước 500 KB]
Lỗ C: [địa chỉ 800,  kích thước 200 KB]
\`\`\`

Tiến trình mới yêu cầu **300 KB**. Lỗ nào được chọn?

#### First-Fit — "Lỗ đầu tiên đủ lớn"

Duyệt từ đầu danh sách, chọn lỗ **đầu tiên** có kích thước ≥ 300 KB.

- Lỗ A: 100 KB < 300 KB → bỏ qua.
- Lỗ B: 500 KB ≥ 300 KB → **chọn Lỗ B**.
- Đặt tiến trình vào đầu Lỗ B (địa chỉ 200, dùng 300 KB).
- Lỗ B còn lại: [địa chỉ 500, 200 KB].

**Kết quả:** Tiến trình ở [200, 499]. Phần còn thừa 200 KB vẫn dùng được.

#### Best-Fit — "Lỗ vừa khít nhất"

Duyệt toàn bộ danh sách, chọn lỗ **nhỏ nhất** mà vẫn đủ kích thước (tránh lãng phí).

- Lỗ A: 100 KB < 300 KB → loại.
- Lỗ B: 500 KB ≥ 300 KB, dư = 200 KB.
- Lỗ C: 200 KB < 300 KB → loại.
- Lỗ nhỏ nhất đủ điều kiện: **Lỗ B** (dư 200 KB).

**Kết quả:** Giống first-fit ở ví dụ này. Lỗ dư 200 KB.

⚠ **Lưu ý về best-fit:** Best-fit tạo ra nhiều lỗ nhỏ ("vụn bào") không dùng được — vì nó luôn cố để lại phần nhỏ nhất. Về lâu dài gây phân mảnh ngoài nghiêm trọng hơn first-fit.

#### Worst-Fit — "Lỗ lớn nhất"

Chọn lỗ **lớn nhất** để phần còn lại cũng đủ lớn cho tiến trình khác.

- Lỗ B: 500 KB (lớn nhất) → **chọn Lỗ B**.
- Dư: 500 − 300 = 200 KB.

**Kết quả:** Tương tự ở ví dụ này. Nhưng với nhiều request khác nhau, worst-fit để lại lỗ lớn hơn → có thể phục vụ thêm tiến trình lớn.

**Walk-through thứ hai — Request 450 KB:**

\`\`\`
Lỗ A: 100 KB  (quá nhỏ)
Lỗ B: 500 KB
Lỗ C: 200 KB  (quá nhỏ)
\`\`\`

| Chiến lược | Chọn lỗ | Lý do | Lỗ còn lại |
|------------|---------|-------|-----------|
| First-fit  | Lỗ B    | đầu tiên đủ | 50 KB |
| Best-fit   | Lỗ B    | nhỏ nhất đủ (chỉ có 1 lựa chọn) | 50 KB |
| Worst-fit  | Lỗ B    | lớn nhất | 50 KB |

Khi chỉ có 1 lỗ đủ điều kiện, ba chiến lược ra kết quả như nhau.

**Walk-through thứ ba — Request 150 KB (có nhiều lỗ đủ điều kiện):**

Giả sử danh sách:
\`\`\`
Lỗ A: 200 KB  [địa chỉ 0]
Lỗ B: 500 KB  [địa chỉ 300]
Lỗ C: 180 KB  [địa chỉ 900]
\`\`\`

| Chiến lược | Chọn lỗ | Lý do | Lỗ còn lại |
|------------|---------|-------|-----------|
| First-fit  | Lỗ A (200 KB) | đầu tiên ≥ 150 | 50 KB |
| Best-fit   | Lỗ C (180 KB) | vừa nhất (dư 30 KB thay vì 50/350 KB) | 30 KB |
| Worst-fit  | Lỗ B (500 KB) | lớn nhất | 350 KB |

Ở đây **worst-fit** để lại lỗ 350 KB — còn dùng được. **Best-fit** để lại lỗ 30 KB — quá nhỏ để dùng tiếp (dễ trở thành phân mảnh ngoài).

❓ **Câu hỏi tự nhiên:**

- *"Chiến lược nào tốt nhất trong thực tế?"* — Thực nghiệm cho thấy first-fit thường nhanh nhất và tương đương best-fit về hiệu quả dùng bộ nhớ. Worst-fit thường kém nhất trong các benchmark thực.
- *"Tìm kiếm lỗ mất O(N) mỗi lần — có cách nào nhanh hơn không?"* — Có. Dùng cây tìm kiếm nhị phân (BST) sắp xếp theo kích thước lỗ → O(log N). Nhưng phần cứng hiện đại dùng paging thay vì contiguous allocation, nên câu hỏi này ít quan trọng trong thực tiễn.

🔁 **Dừng lại tự kiểm tra:**

Danh sách lỗ: [50 KB, 300 KB, 150 KB, 600 KB]. Request 200 KB. First-fit và best-fit chọn lỗ nào?

<details>
<summary>Đáp án</summary>

- **First-fit**: duyệt từ đầu: 50 < 200 → bỏ; 300 ≥ 200 → chọn **lỗ 300 KB**, dư 100 KB.
- **Best-fit**: các lỗ đủ điều kiện: 300 KB (dư 100), 600 KB (dư 400). Chọn **lỗ 300 KB** (dư ít hơn).
- Cả hai ra cùng kết quả ở ví dụ này, nhưng không phải lúc nào cũng vậy.
</details>

📝 **Tóm tắt mục 2:**
- Contiguous allocation: mỗi tiến trình chiếm một dải RAM liên tục.
- First-fit: nhanh, chọn lỗ đầu tiên đủ.
- Best-fit: tối thiểu hóa lãng phí mỗi lần, nhưng tạo nhiều "vụn" nhỏ.
- Worst-fit: để lại lỗ lớn, nhưng phân tán bộ nhớ lớn.

---

## 3. Phân mảnh (Fragmentation)

### 3.1. Phân mảnh ngoài (External Fragmentation)

💡 **Trực giác — Bàn cờ:**
Sau một thời gian đặt và bỏ xe (tiến trình), bãi đỗ trông như bàn cờ: ô có người, ô không, xen kẽ nhau. Tổng ô trống đủ cho một xe to, nhưng không có dãy liên tiếp đủ. Đây là **phân mảnh ngoài**: tổng bộ nhớ trống đủ nhưng không liên tục → không dùng được.

**Định nghĩa chính xác:** Bộ nhớ trống nằm rải rác thành nhiều lỗ nhỏ, không có lỗ nào đủ lớn để thỏa mãn request — dù tổng kích thước tất cả các lỗ là đủ.

**Ví dụ số:** RAM 1000 KB. Tiến trình hiện tại:
\`\`\`
[0–200]:   Tiến trình A (200 KB)
[200–350]: Trống (150 KB)
[350–600]: Tiến trình B (250 KB)
[600–750]: Trống (150 KB)
[750–900]: Tiến trình C (150 KB)
[900–1000]:Trống (100 KB)
\`\`\`
Tổng trống = 150 + 150 + 100 = **400 KB**. Nhưng tiến trình D cần 300 KB liên tục — không có lỗ nào đủ. → Phân mảnh ngoài.

### 3.2. Phân mảnh trong (Internal Fragmentation)

Xảy ra khi OS cấp phát **nhiều hơn** kích thước yêu cầu (vì đơn vị cấp phát là khối cố định).

**Ví dụ:** OS cấp phát theo đơn vị 100 KB. Tiến trình cần 230 KB → OS cấp 300 KB → lãng phí **70 KB bên trong** khối đã cấp (tiến trình không dùng, nhưng cũng không ai khác dùng được).

**Phân mảnh trong không tránh được** khi cấp phát theo đơn vị cố định (như paging với kích thước trang). Chấp nhận phân mảnh trong để đổi lấy việc diệt phân mảnh ngoài.

| Loại | Nguyên nhân | Vị trí lãng phí | Cách giảm |
|------|-------------|-----------------|-----------|
| External | Lỗ trống rải rác | Bên ngoài vùng được cấp | Compaction / Paging |
| Internal | Cấp nhiều hơn cần | Bên trong vùng được cấp | Giảm kích thước đơn vị cấp |

### 3.3. Compaction — Chống phân mảnh ngoài

**Compaction** là quá trình OS dồn tất cả tiến trình về một đầu, gộp các lỗ trống về phía kia để tạo một khối lớn liên tục.

**Ví dụ trước/sau compaction:**

\`\`\`
Trước: [A:200][trống:150][B:250][trống:150][C:150][trống:100]
Sau:   [A:200][B:250][C:150][trống:400 KB liên tục]
\`\`\`

⚠ **Vấn đề của compaction:**

1. **Cực kỳ chậm:** Phải copy hàng trăm MB/GB dữ liệu trong RAM → tốn thời gian O(N) theo lượng dữ liệu.
2. **Phải dừng tiến trình:** Trong khi dịch chuyển, địa chỉ vật lý thay đổi → tiến trình phải dừng (hoặc dùng kỹ thuật phức tạp).
3. **Chỉ là tạm thời:** Sau một thời gian chạy, phân mảnh lại xuất hiện.

Vì những lý do trên, OS hiện đại không dùng contiguous allocation + compaction cho tiến trình thông thường. Thay vào đó, dùng **paging** (Lesson 02) — chia nhỏ bộ nhớ thành các trang bằng nhau, đặt ở bất kỳ đâu, không cần liên tục.

❓ **Câu hỏi tự nhiên:**

- *"Compaction có bao giờ được dùng không?"* — Có, trong một số trường hợp đặc biệt: garbage collector của Java/Go dùng compacting GC; defragmentation ổ đĩa (HDD) cũng là một dạng compaction. Nhưng không dùng cho bộ nhớ RAM tiến trình trong OS hiện đại.
- *"Nếu không dùng contiguous allocation, base+limit register còn ý nghĩa không?"* — Base+limit vẫn dùng ở cấp segment (segmentation). Nhưng x86-64 hiện đại chạy trong chế độ "flat memory" với paging, bỏ qua segmentation phần lớn. Chi tiết ở Lesson 02-03.

🔁 **Dừng lại tự kiểm tra:**

RAM 500 KB, tiến trình X (100 KB) ở [0–100], Y (150 KB) ở [200–350], Z (50 KB) ở [400–450]. Lỗ trống ở đâu? Tổng trống? Có thể cấp tiến trình 200 KB không?

<details>
<summary>Đáp án</summary>

Lỗ trống: [100–200] = 100 KB, [350–400] = 50 KB, [450–500] = 50 KB.
Tổng trống = 200 KB. Nhưng không có lỗ nào ≥ 200 KB liên tục → Phân mảnh ngoài → không cấp được 200 KB.
</details>

📝 **Tóm tắt mục 3:**
- External fragmentation: tổng trống đủ nhưng không liên tục → không dùng được.
- Internal fragmentation: cấp nhiều hơn cần → lãng phí bên trong.
- Compaction gộp lỗ nhưng chậm và không thực tế cho RAM runtime.
- Giải pháp thực tế: paging (Lesson 02).

---

## Bài tập

**Bài 1.** Tiến trình có base = 5000, limit = 3000. CPU phát các địa chỉ logic: 0, 1500, 2999, 3000, 3500. Tính địa chỉ vật lý (hoặc báo lỗi) cho từng trường hợp.

**Bài 2.** Danh sách lỗ trống: [50 KB, 420 KB, 110 KB, 250 KB, 80 KB] (theo thứ tự địa chỉ). Request 100 KB. Xác định chiến lược nào chọn lỗ nào:
- (a) First-fit
- (b) Best-fit
- (c) Worst-fit

**Bài 3.** RAM 800 KB. Tiến trình: A [0–300], B [300–500], C [500–650]. B kết thúc, để lại lỗ [300–500]. Tiến trình D (190 KB) vào.
- (a) D có được cấp không? Dùng first-fit.
- (b) Vẽ bản đồ bộ nhớ trước và sau khi D vào.
- (c) Có xảy ra phân mảnh trong không? Phân mảnh ngoài?

**Bài 4 (nâng cao).** Sau khi B rời khỏi bài 3, thêm tiến trình E (160 KB) và F (200 KB). Dùng first-fit cho cả hai. Kết quả? Nếu không cấp được, vì sao?

---

## Lời giải chi tiết

### Bài 1 — Dịch địa chỉ với base = 5000, limit = 3000

Quy tắc: nếu logic < limit → vật lý = logic + base; ngược lại → lỗi.

| Địa chỉ logic | So với limit (3000) | Địa chỉ vật lý |
|--------------|---------------------|----------------|
| 0            | 0 < 3000 — OK       | 0 + 5000 = **5000** |
| 1500         | 1500 < 3000 — OK    | 1500 + 5000 = **6500** |
| 2999         | 2999 < 3000 — OK    | 2999 + 5000 = **7999** |
| 3000         | 3000 ≥ 3000 — **LỖII** | Segmentation Fault |
| 3500         | 3500 ≥ 3000 — **LỖI** | Segmentation Fault |

**Nhận xét:** Byte hợp lệ cuối cùng là logic 2999 → vật lý 7999. Tiến trình chiếm vật lý [5000–7999].

### Bài 2 — Ba chiến lược với [50, 420, 110, 250, 80] KB, request 100 KB

Các lỗ đủ điều kiện (≥ 100 KB): **420 KB** (vị trí 2), **110 KB** (vị trí 3), **250 KB** (vị trí 4).

**(a) First-fit:** Duyệt từ đầu:
- 50 KB < 100 KB → bỏ.
- **420 KB ≥ 100 KB → chọn** (vị trí 2). Lỗ còn lại: 420 − 100 = 320 KB.

**(b) Best-fit:** Tìm lỗ nhỏ nhất ≥ 100 KB:
- 420 KB → dư 320 KB.
- **110 KB → dư 10 KB** (nhỏ nhất dư).
- 250 KB → dư 150 KB.
- **Chọn lỗ 110 KB** (vị trí 3). Lỗ còn lại: 10 KB.

**(c) Worst-fit:** Tìm lỗ lớn nhất ≥ 100 KB:
- **420 KB** là lớn nhất → chọn (vị trí 2). Lỗ còn lại: 320 KB.

**So sánh hậu quả:**
- First-fit và worst-fit cùng chọn lỗ 420 KB → để lại 320 KB (dùng được).
- Best-fit chọn lỗ 110 KB → để lại 10 KB (thực tế không dùng được cho bất kỳ request nào ≥ 10 KB → "vụn bào").

### Bài 3 — Cấp tiến trình D (190 KB) sau khi B rời

**Bản đồ trước khi D vào:**
\`\`\`
[0–299]:   Tiến trình A (300 KB)
[300–499]: LỖ TRỐNG (200 KB)
[500–649]: Tiến trình C (150 KB)
[650–799]: LỖ TRỐNG (150 KB)
\`\`\`

**(a) First-fit với request 190 KB:**
- Lỗ [300–499] = 200 KB ≥ 190 KB → **chọn**. Đặt D ở [300–489].

**(b) Bản đồ sau khi D vào:**
\`\`\`
[0–299]:   Tiến trình A (300 KB)
[300–489]: Tiến trình D (190 KB)
[490–499]: Trống (10 KB)
[500–649]: Tiến trình C (150 KB)
[650–799]: Trống (150 KB)
\`\`\`

**(c) Phân mảnh:**
- **Phân mảnh trong:** Không (contiguous allocation cấp đúng kích thước yêu cầu, không làm tròn lên).
- **Phân mảnh ngoài:** Có! Lỗ 10 KB ở [490–499] quá nhỏ để dùng cho hầu hết request. Đây là phân mảnh ngoài nhỏ phát sinh từ việc D không vừa khít lỗ.

### Bài 4 — Thêm E (160 KB) và F (200 KB) sau bài 3

**Bản đồ hiện tại (từ bài 3):**
\`\`\`
Lỗ 1: [490–499] = 10 KB
Lỗ 2: [650–799] = 150 KB
\`\`\`

**First-fit cho E (160 KB):**
- Lỗ 1 (10 KB) < 160 KB → bỏ.
- Lỗ 2 (150 KB) < 160 KB → bỏ.
- **Không cấp được E** → E phải chờ (hoặc bị từ chối).

**First-fit cho F (200 KB):**
- Tương tự, không có lỗ nào ≥ 200 KB → **không cấp được F**.

**Tổng trống = 10 + 150 = 160 KB.** Đủ cho E về tổng lượng, nhưng không đủ liên tục. → **Phân mảnh ngoài điển hình.** Giải pháp: compaction (dồn A, D, C về đầu → lỗ [640–799] = 160 KB liên tục) → cấp được E, nhưng vẫn không đủ cho F (200 KB > 160 KB).

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo:** [Lesson 02 — Paging](../lesson-02-paging/README.md) — giải quyết phân mảnh ngoài bằng cách chia nhỏ bộ nhớ thành các trang (page) bằng nhau.
- **Visualization:** [visualization.html](./visualization.html) — mô phỏng bộ cấp phát bộ nhớ tương tác.

---

## 📝 Tổng kết Lesson 01

- **Địa chỉ logic** = địa chỉ tiến trình dùng (bắt đầu từ 0). **MMU** dịch sang địa chỉ vật lý bằng $\\text{vật lý} = \\text{logic} + \\text{base}$.
- **Limit register** bảo vệ: địa chỉ logic ≥ limit → Segmentation Fault tức thì.
- **Contiguous allocation**: tiến trình chiếm một dải RAM liên tục; OS tìm lỗ phù hợp bằng first/best/worst-fit.
- **External fragmentation**: tổng trống đủ nhưng không liên tục — vấn đề chính của contiguous allocation.
- **Internal fragmentation**: cấp nhiều hơn cần — đánh đổi khi dùng đơn vị cấp cố định.
- **Compaction** gộp lỗ nhưng chậm và tốn kém — OS hiện đại dùng **paging** thay thế (Lesson 02).
`;
