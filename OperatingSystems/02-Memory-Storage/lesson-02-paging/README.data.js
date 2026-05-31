// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-02-paging/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Paging (Phân trang)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích ý tưởng **paging**: chia bộ nhớ thành các trang (page) và khung (frame) bằng nhau để diệt phân mảnh ngoài.
- Thực hiện tay **dịch địa chỉ**: từ địa chỉ ảo → (page number, offset) → frame number → địa chỉ vật lý.
- Tính page number và offset từ địa chỉ ảo cho bất kỳ kích thước trang nào.
- Giải thích **phân mảnh trong (internal fragmentation)** trong paging — đánh đổi có chủ ý.
- Mô tả cấu trúc **bảng trang (page table)** và vai trò của nó.

## Kiến thức tiền đề

- [Lesson 01 — Quản lý bộ nhớ](../lesson-01-memory-management/README.md) — phân mảnh ngoài, tại sao cần giải pháp mới.

---

## 1. Ý tưởng cốt lõi của Paging

### 1.1. Vấn đề cần giải quyết

Lesson 01 chỉ ra rằng contiguous allocation dẫn đến phân mảnh ngoài: tổng RAM trống đủ nhưng không liên tục → không cấp được. Compaction quá chậm.

💡 **Trực giác — Tủ sách ngăn kéo:**
Hãy tưởng tượng bạn có một cuốn sách dày 12 trang cần để lên tủ, nhưng không có kệ nào trống 12 ô liền nhau. Giải pháp: **xé sách thành từng tờ đơn lẻ** và đặt mỗi tờ vào **bất kỳ ô trống nào** trên tủ — không cần liền nhau. Kèm theo một **mục lục** ghi: "tờ 1 ở ô 7, tờ 2 ở ô 3, tờ 3 ở ô 11..." Khi đọc, tra mục lục → lấy đúng tờ.

**Paging làm y hệt:**
- Chia **không gian địa chỉ logic** của tiến trình thành các **trang (page)** kích thước bằng nhau.
- Chia **RAM vật lý** thành các **khung (frame)** cùng kích thước.
- Mỗi page được đặt vào một frame bất kỳ — không cần liền nhau.
- **Bảng trang (page table)**: mục lục ánh xạ page → frame.

### 1.2. Kết quả

- **Diệt hoàn toàn phân mảnh ngoài**: mọi frame đều dùng được, không có "lỗ" nào quá nhỏ.
- **Đánh đổi**: phân mảnh trong nhỏ (trung bình nửa trang cuối cùng của mỗi tiến trình).
- **Chi phí**: phải tra bảng trang mỗi lần truy cập bộ nhớ → thêm một lần truy cập RAM (giải quyết bằng TLB ở Lesson 03).

❓ **Câu hỏi tự nhiên:**

- *"Kích thước trang bao nhiêu là tốt?"* — Thường 4 KB (x86-64 Linux mặc định). Trang lớn hơn → bảng trang nhỏ hơn nhưng phân mảnh trong lớn hơn. Trang nhỏ hơn → chi tiết hơn nhưng bảng trang to hơn. 4 KB là điểm cân bằng thực nghiệm tốt.
- *"Phân mảnh ngoài hoàn toàn biến mất không?"* — Có! Mỗi frame độc lập, bất kỳ frame nào cũng có thể dùng cho bất kỳ page nào. Không bao giờ có tình huống "trống nhiều nhưng không dùng được".

📝 **Tóm tắt mục 1:**
- Paging chia logic và vật lý thành các đơn vị bằng nhau (page/frame).
- Page đặt vào frame bất kỳ, không cần liên tục.
- Bảng trang làm "mục lục" ánh xạ page number → frame number.

---

## 2. Dịch địa chỉ trong Paging

### 2.1. Cấu trúc địa chỉ ảo

Địa chỉ ảo (logical address) gồm 2 phần:

\`\`\`
┌─────────────────────┬───────────────────┐
│   Page Number (p)   │   Offset (d)      │
│  (m - n) bit        │   (n) bit         │
└─────────────────────┴───────────────────┘
\`\`\`

Nếu **kích thước trang = 2^n byte** thì:
- **n bit thấp nhất** = offset (vị trí trong trang).
- **Các bit còn lại** = page number.

**Ví dụ: Page size = 4 KB = 2^12 byte → n = 12.**

Địa chỉ ảo 32-bit: 20 bit cao = page number (tối đa 2^20 = 1,048,576 trang), 12 bit thấp = offset (0–4095).

### 2.2. Công thức dịch địa chỉ

\`\`\`
1. page_number = địa_chỉ_ảo ÷ page_size   (chia nguyên)
2. offset      = địa_chỉ_ảo mod page_size  (phần dư)
3. frame_number = page_table[page_number]   (tra bảng trang)
4. địa_chỉ_vật_lý = frame_number × page_size + offset
\`\`\`

### 2.3. Walk-through số cụ thể — Ví dụ 1

**Thiết lập:**
- Page size = 4 KB = 4096 bytes
- Địa chỉ ảo cần dịch: **0x1234** = 4660 (decimal)
- Bảng trang: [page 0 → frame 3, page 1 → frame 7, page 2 → frame 1, page 3 → frame 5]

**Bước 1: Tách page number và offset.**
\`\`\`
page_number = 4660 ÷ 4096 = 1  (thương nguyên)
offset      = 4660 mod 4096 = 564
\`\`\`
Kiểm tra bằng hex: 0x1234 → 12 bit thấp = 0x234 = 564 (offset), bit còn lại = 0x1 (page number = 1). ✓

**Bước 2: Tra bảng trang.**
\`\`\`
page_table[1] = frame 7
\`\`\`

**Bước 3: Tính địa chỉ vật lý.**
\`\`\`
địa_chỉ_vật_lý = 7 × 4096 + 564 = 28672 + 564 = 29236
\`\`\`

Kiểm tra hex: frame 7 bắt đầu ở 7 × 0x1000 = 0x7000, offset 0x234 → vật lý = **0x7234**. ✓

### 2.4. Walk-through số cụ thể — Ví dụ 2

**Thiết lập:**
- Page size = 256 bytes (ví dụ nhỏ để dễ tính)
- Địa chỉ ảo: **1000**
- Bảng trang: [page 0 → frame 2, page 1 → frame 5, page 2 → frame 0, page 3 → frame 4, page 4 → frame 6]

**Bước 1:**
\`\`\`
page_number = 1000 ÷ 256 = 3  (thương nguyên: 3 × 256 = 768, còn lại 232)
offset      = 1000 mod 256 = 232
\`\`\`

**Bước 2:**
\`\`\`
page_table[3] = frame 4
\`\`\`

**Bước 3:**
\`\`\`
địa_chỉ_vật_lý = 4 × 256 + 232 = 1024 + 232 = 1256
\`\`\`

### 2.5. Walk-through số cụ thể — Ví dụ 3

**Thiết lập:**
- Page size = 512 bytes
- Địa chỉ ảo: **0** (byte đầu tiên của tiến trình)
- Bảng trang: [page 0 → frame 9]

**Bước 1:**
\`\`\`
page_number = 0 ÷ 512 = 0
offset      = 0 mod 512 = 0
\`\`\`

**Bước 2:**
\`\`\`
page_table[0] = frame 9
\`\`\`

**Bước 3:**
\`\`\`
địa_chỉ_vật_lý = 9 × 512 + 0 = 4608
\`\`\`

### 2.6. Walk-through số cụ thể — Ví dụ 4 (byte cuối trang)

**Thiết lập:**
- Page size = 1024 bytes
- Địa chỉ ảo: **3071** (byte cuối cùng của page 2, vì 3 × 1024 − 1 = 3071)
- Bảng trang: [page 0 → frame 0, page 1 → frame 4, page 2 → frame 2]

**Bước 1:**
\`\`\`
page_number = 3071 ÷ 1024 = 2  (2 × 1024 = 2048, còn lại 1023)
offset      = 3071 mod 1024 = 1023  (byte cuối trang)
\`\`\`

**Bước 2:**
\`\`\`
page_table[2] = frame 2
\`\`\`

**Bước 3:**
\`\`\`
địa_chỉ_vật_lý = 2 × 1024 + 1023 = 2048 + 1023 = 3071
\`\`\`

Trùng hợp vật lý = logic ở đây vì frame 2 ứng với page 2 — không phải lúc nào cũng vậy!

❓ **Câu hỏi tự nhiên:**

- *"Nếu page number vượt quá giới hạn bảng trang thì sao?"* — MMU phát sinh lỗi bảo vệ bộ nhớ (Segmentation Fault) tương tự cơ chế limit register. Mỗi mục bảng trang có **valid bit**: nếu 0 → page chưa được ánh xạ → OS tạo page fault (Lesson 04).
- *"Bảng trang lưu ở đâu?"* — Trong RAM, được trỏ đến bởi **PTBR (Page Table Base Register)** — một register đặc biệt của CPU. Context switch chỉ cần cập nhật PTBR (nhanh) thay vì copy toàn bộ bảng trang.
- *"Truy cập bộ nhớ mất 2 lần RAM access (tra bảng + đọc dữ liệu) — chậm quá?"* — Đây chính là lý do TLB ra đời. Xem Lesson 03.

🔁 **Dừng lại tự kiểm tra:**

Page size = 2048 bytes. Địa chỉ ảo = 5500. Page number và offset là bao nhiêu?

<details>
<summary>Đáp án</summary>

page_number = 5500 ÷ 2048 = **2** (thương nguyên: 2 × 2048 = 4096).
offset = 5500 − 4096 = **1404**.
Kiểm tra: 2 × 2048 + 1404 = 4096 + 1404 = 5500 ✓
</details>

📝 **Tóm tắt mục 2:**
- Địa chỉ ảo = (page_number, offset).
- page_number = địa_chỉ ÷ page_size (chia nguyên).
- offset = địa_chỉ mod page_size.
- Địa chỉ vật lý = frame_number × page_size + offset.
- frame_number lấy từ bảng trang qua tra cứu.

---

## 3. Cấu trúc Bảng trang (Page Table)

### 3.1. Mỗi mục bảng trang (Page Table Entry — PTE)

Mỗi PTE chứa nhiều hơn chỉ frame number:

| Trường | Bit | Ý nghĩa |
|--------|-----|---------|
| Frame number | nhiều bit | Khung vật lý tương ứng |
| Valid bit | 1 | 1 = page trong RAM; 0 = chưa nạp (page fault) |
| Dirty bit | 1 | 1 = page đã bị sửa (cần ghi đĩa khi bị thay) |
| Reference bit | 1 | 1 = page được truy cập gần đây (dùng cho page replacement) |
| Protection | 2+ | Quyền: read/write/execute |

### 3.2. Kích thước bảng trang

**Vấn đề quy mô:**

Với không gian địa chỉ 32-bit và page size 4 KB:
- Số trang = 2^32 ÷ 2^12 = **2^20 = 1,048,576 trang**.
- Mỗi PTE thường 4 bytes.
- Kích thước bảng trang = 2^20 × 4 = **4 MB per process** (chỉ cho bảng trang!).

Với 100 tiến trình → 400 MB chỉ để lưu bảng trang. Đây là lý do cần **bảng trang nhiều cấp** (Lesson 03).

### 3.3. Phân mảnh trong trong Paging

💡 **Trực giác:** Nếu tiến trình dùng 10,001 bytes với page size 4096 bytes → cần 3 trang (page 0 dùng đủ 4096, page 1 dùng đủ 4096, page 2 chỉ dùng 1 byte). Page 2 có 4095 bytes không dùng → **phân mảnh trong 4095 bytes**.

Trung bình: mỗi tiến trình lãng phí nửa trang cuối = page_size / 2. Với page 4 KB → lãng phí trung bình 2 KB / tiến trình — chấp nhận được.

⚠ **Lỗi thường gặp:**

*"Paging loại bỏ hoàn toàn phân mảnh."* — Sai. Paging loại bỏ **phân mảnh ngoài** nhưng **giữ lại phân mảnh trong** (nửa trang cuối). Đây là đánh đổi có chủ ý.

🔁 **Dừng lại tự kiểm tra:**

Tiến trình cần 9000 bytes. Page size = 4096 bytes. Cần bao nhiêu trang? Phân mảnh trong bao nhiêu?

<details>
<summary>Đáp án</summary>

9000 ÷ 4096 = 2 (phần nguyên) + 808 (dư). Cần **3 trang**.
Page thứ 3 dùng 808 bytes, lãng phí 4096 − 808 = **3288 bytes** phân mảnh trong.
</details>

📝 **Tóm tắt mục 3:**
- PTE gồm: frame number + valid/dirty/reference bit + protection bits.
- Bảng trang 32-bit với page 4 KB: 4 MB / tiến trình → cần multi-level paging (Lesson 03).
- Paging loại bỏ external fragmentation, chấp nhận internal fragmentation nhỏ.

---

## Bài tập

**Bài 1.** Page size = 4096 bytes. Dịch các địa chỉ ảo sau:
- (a) 8192
- (b) 12288
- (c) 5000
- (d) 16383

Với bảng trang: page 0 → frame 3, page 1 → frame 7, page 2 → frame 1, page 3 → frame 4, page 4 → frame 0.

**Bài 2.** Hệ thống 16-bit, page size = 512 bytes. Tiến trình có 3 trang (page 0 → frame 2, page 1 → frame 4, page 2 → frame 6). Địa chỉ ảo 1500: frame và offset là bao nhiêu? Địa chỉ vật lý?

**Bài 3.** Page size 4 KB. Tiến trình cần 20,000 bytes.
- (a) Cần bao nhiêu trang?
- (b) Phân mảnh trong bao nhiêu bytes?
- (c) Nếu tổng RAM 16 frame (64 KB), có cấp đủ không?

**Bài 4 (nâng cao).** Không gian địa chỉ 32-bit, page size 4 KB, mỗi PTE 4 bytes. Tính kích thước (bytes) của bảng trang cho một tiến trình. Nếu hệ thống chạy 50 tiến trình đồng thời, tổng RAM dành cho bảng trang là bao nhiêu MB?

---

## Lời giải chi tiết

### Bài 1 — Page size = 4096, bảng trang [3, 7, 1, 4, 0]

Công thức: page = địa_chỉ ÷ 4096 (nguyên), offset = địa_chỉ mod 4096, vật_lý = frame × 4096 + offset.

**(a) 8192:**
- page = 8192 ÷ 4096 = 2, offset = 0.
- frame = page_table[2] = 1.
- Vật lý = 1 × 4096 + 0 = **4096**.

**(b) 12288:**
- page = 12288 ÷ 4096 = 3, offset = 0.
- frame = page_table[3] = 4.
- Vật lý = 4 × 4096 + 0 = **16384**.

**(c) 5000:**
- page = 5000 ÷ 4096 = 1, offset = 5000 − 4096 = 904.
- frame = page_table[1] = 7.
- Vật lý = 7 × 4096 + 904 = 28672 + 904 = **29576**.

**(d) 16383:**
- page = 16383 ÷ 4096 = 3, offset = 16383 − 12288 = 4095 (byte cuối trang 3).
- frame = page_table[3] = 4.
- Vật lý = 4 × 4096 + 4095 = 16384 + 4095 = **20479**.

### Bài 2 — 16-bit, page 512 bytes, địa chỉ 1500

- page = 1500 ÷ 512 = 2 (vì 2 × 512 = 1024, còn lại 476; thực ra: 2 × 512 = 1024 < 1500 < 3 × 512 = 1536).
- offset = 1500 − 1024 = **476**.
- frame = page_table[2] = 6.
- Vật lý = 6 × 512 + 476 = 3072 + 476 = **3548**.

### Bài 3 — Tiến trình 20,000 bytes, page 4 KB

**(a)** 20000 ÷ 4096 = 4 (phần nguyên: 4 × 4096 = 16384), dư = 3616. Cần **5 trang** (page 0–3 đầy, page 4 dùng 3616 bytes).

**(b)** Phân mảnh trong = 4096 − 3616 = **480 bytes** (trong page cuối).

**(c)** RAM = 16 frames × 4096 = 65536 bytes. Tiến trình cần 5 frames. 5 ≤ 16 → **cấp được**. Còn lại 11 frames trống cho tiến trình khác.

### Bài 4 — Kích thước bảng trang 32-bit

- Số trang = 2^32 ÷ 2^12 = 2^20 = 1,048,576 mục.
- Mỗi PTE = 4 bytes.
- Kích thước = 1,048,576 × 4 = **4,194,304 bytes = 4 MB** / tiến trình.
- 50 tiến trình: 50 × 4 MB = **200 MB** chỉ để lưu bảng trang.

Đây chính là lý do bảng trang nhiều cấp (Lesson 03) ra đời: tiến trình thực tế chỉ dùng một phần nhỏ không gian địa chỉ → chỉ cấp phát phần bảng trang cần thiết.

---

## Liên kết và bài tiếp theo

- **Bài trước:** [Lesson 01 — Quản lý bộ nhớ](../lesson-01-memory-management/README.md).
- **Bài tiếp theo:** [Lesson 03 — TLB & bảng trang nhiều cấp](../lesson-03-tlb-multilevel-paging/README.md) — giải quyết vấn đề bảng trang quá lớn và truy cập chậm.
- **Visualization:** [visualization.html](./visualization.html).

---

## 📝 Tổng kết Lesson 02

- **Paging** chia logic/physical thành page/frame bằng nhau, đặt ngẫu nhiên — diệt external fragmentation.
- **Dịch địa chỉ**: page_number = logic ÷ page_size; offset = logic mod page_size; vật_lý = frame × page_size + offset.
- **Bảng trang**: mảng PTE, mỗi PTE có frame number + valid/dirty/reference bits.
- **Internal fragmentation**: trung bình nửa trang / tiến trình — đánh đổi chấp nhận được.
- **Vấn đề tồn đọng**: bảng trang quá lớn (4 MB / tiến trình với 32-bit) và chậm (2 lần RAM access) → giải quyết ở Lesson 03.
`;
