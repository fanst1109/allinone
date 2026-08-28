// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Accounting/02-Statements/lesson-05-balance-sheet/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Bảng cân đối kế toán (The Balance Sheet)

> Nếu phương trình kế toán là một câu, thì bảng cân đối kế toán là **bức ảnh chụp câu đó tại một thời điểm**: liệt kê chi tiết mọi thứ doanh nghiệp *có* và *nợ*, rồi chứng minh hai vế bằng nhau.

## Mục tiêu học tập

- Hiểu bảng cân đối kế toán (Balance Sheet) là **ảnh chụp** của $A = L + E$ tại một **thời điểm** cụ thể (không phải một thời kỳ).
- Phân loại được **tài sản** và **nợ phải trả** thành **ngắn hạn (current)** và **dài hạn (non-current)** — kèm ≥ 4 ví dụ mỗi loại.
- Dựng được một bảng cân đối hoàn chỉnh từ một danh sách số dư và **kiểm tra nó có cân không**.
- Tính và diễn giải được **vốn lưu động (working capital)** và **hệ số thanh toán hiện hành (current ratio)**.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): $A = L + E$ và ba đại lượng Tài sản / Nợ / Vốn chủ.
- [Lesson 04 — Kế toán dồn tích](../../01-Fundamentals/lesson-04-accrual-adjusting/): vì sao "phải thu", "phải trả", "chi phí trả trước" là những số dư có thật nằm trên bảng cân đối.

Đơn vị dùng xuyên suốt bài: **triệu đồng**.

---

## 1. Bảng cân đối kế toán là gì? — ảnh chụp tại một thời điểm

> 💡 **Trực giác.** Tưởng tượng bạn **bấm nút tạm dừng** đúng nửa đêm ngày 31/12 và hỏi doanh nghiệp: *"Ngay lúc này, mày đang có gì và nợ ai bao nhiêu?"* Câu trả lời đóng băng ngay khoảnh khắc đó chính là **bảng cân đối kế toán**. Nó không kể chuyện "trong năm kiếm được bao nhiêu" — đó là việc của báo cáo kết quả kinh doanh (Lesson 06). Bảng cân đối chỉ chụp **trạng thái** tại một mốc.

Bảng cân đối trình bày lại phương trình kế toán, nhưng **khai triển từng khoản mục cụ thể**:

$$\\underbrace{\\text{Tài sản}}_{\\text{doanh nghiệp CÓ gì}} = \\underbrace{\\text{Nợ phải trả}}_{\\text{NỢ ai}} + \\underbrace{\\text{Vốn chủ sở hữu}}_{\\text{phần của CHỦ}}$$

Vì thế nó **luôn cân** (chính là lý do có tên "cân đối"): vế trái và vế phải là **cùng một đống của cải** nhìn từ hai phía — có gì so với ai tài trợ cho những thứ đó. Nếu dựng xong mà hai vế **không** bằng nhau thì chắc chắn có lỗi ghi sổ.

**Thời điểm vs thời kỳ** — điểm phân biệt cốt lõi giữa các báo cáo:

| Báo cáo | Trả lời câu hỏi | Kiểu thời gian | Ví dụ tiêu đề |
|---------|-----------------|----------------|---------------|
| **Bảng cân đối kế toán** | Có gì / nợ ai *ngay lúc này*? | **Thời điểm** (1 mốc) | *"tại ngày 31/12/2025"* |
| Báo cáo kết quả KD (L06) | Lãi/lỗ *trong khoảng*? | Thời kỳ (khoảng) | *"cho năm kết thúc 31/12/2025"* |

> ⚠ **Lỗi thường gặp.** Ghi tiêu đề bảng cân đối là *"cho năm 2025"*. **Sai** — bảng cân đối luôn gắn với **một ngày** (*"tại ngày 31/12/2025"*). "Cho năm..." là ngôn ngữ của báo cáo thời kỳ.

---

## 2. Cấu trúc hai phía & phân loại khoản mục

Bảng cân đối chuẩn chia mỗi vế thành nhóm nhỏ theo **tính thanh khoản** (khả năng biến thành tiền nhanh hay chậm):

| TÀI SẢN | NGUỒN VỐN |
|---|---|
| **Tài sản ngắn hạn** — tiền, phải thu, tồn kho… | **Nợ ngắn hạn** — phải trả người bán, vay ngắn… |
| **Tài sản dài hạn** — thiết bị, nhà xưởng, đất… | **Nợ dài hạn** — vay dài hạn, trái phiếu… |
| | **Vốn chủ sở hữu** — vốn góp + lợi nhuận giữ lại |
| **TỔNG TÀI SẢN** | **= TỔNG NỢ + VỐN CHỦ** |

### 2.1 Tài sản ngắn hạn (Current assets)

**(a) Là gì.** Tài sản dự kiến **biến thành tiền, bán, hoặc dùng hết trong vòng 12 tháng** (một chu kỳ kinh doanh). Đây là "máu lưu thông" — thanh khoản cao.

**(b) Vì sao cần tách riêng.** Để biết doanh nghiệp có đủ nguồn lực **sắp sẵn** trả các khoản nợ sắp đến hạn hay không. Một công ty có nhiều đất (dài hạn) nhưng cạn tiền (ngắn hạn) vẫn có thể **vỡ nợ ngắn hạn**.

**(c) Ví dụ số cụ thể** (≥ 4, xếp theo thanh khoản giảm dần):

| Tài sản ngắn hạn | Giá trị | Ghi chú |
|------------------|--------:|---------|
| Tiền mặt & tương đương | 150 | thanh khoản cao nhất |
| Khoản phải thu | 90 | khách nợ, thu trong 12 tháng |
| Hàng tồn kho | 110 | chờ bán thành tiền |
| Chi phí trả trước | 20 | đã trả trước (vd thuê 1 năm), dùng dần |
| **Cộng tài sản ngắn hạn** | **370** | |

### 2.2 Tài sản dài hạn (Non-current assets)

**(a) Là gì.** Tài sản dùng **lâu hơn 12 tháng**, phục vụ hoạt động chứ không để bán ngay. Còn gọi là tài sản cố định / tài sản dài hạn.

**(b) Vì sao cần tách riêng.** Đây là "bộ xương" — năng lực sản xuất dài hạn. Không kỳ vọng bán để trả nợ; bán chúng đi thường nghĩa là thu hẹp hoạt động.

**(c) Ví dụ số cụ thể** (≥ 4):

| Tài sản dài hạn | Giá trị | Ghi chú |
|-----------------|--------:|---------|
| Thiết bị, máy móc | 300 | dùng nhiều năm, có khấu hao |
| Nhà xưởng | 250 | công trình xây dựng |
| Đất | 180 | không khấu hao |
| Xe tải | 70 | phương tiện vận tải |
| **Cộng tài sản dài hạn** | **800** | |

Vậy **Tổng tài sản = 370 + 800 = 1.170**.

### 2.3 Nợ ngắn hạn (Current liabilities)

**(a) Là gì.** Nghĩa vụ phải thanh toán **trong vòng 12 tháng**.

**(b) Vì sao cần tách riêng.** Đây là các "hóa đơn sắp phải trả". So sánh nó với tài sản ngắn hạn cho biết công ty có **kẹt thanh khoản** không (xem mục 4).

**(c) Ví dụ số cụ thể** (≥ 4):

| Nợ ngắn hạn | Giá trị | Ghi chú |
|-------------|--------:|---------|
| Phải trả người bán | 80 | mua chịu hàng/nguyên liệu |
| Vay ngắn hạn | 100 | khoản vay đáo hạn < 12 tháng |
| Lương phải trả | 40 | đã phát sinh, chưa chi |
| Thuế phải nộp | 30 | nợ nhà nước, sắp đến hạn |
| **Cộng nợ ngắn hạn** | **250** | |

### 2.4 Nợ dài hạn (Non-current liabilities)

**(a) Là gì.** Nghĩa vụ đáo hạn **sau 12 tháng**.

**(b) Vì sao cần tách riêng.** Đây là nợ "chưa gấp" — không tạo áp lực thanh khoản trước mắt, nhưng vẫn là nghĩa vụ thật, ảnh hưởng đến cấu trúc vốn dài hạn.

**(c) Ví dụ số cụ thể** (≥ 4):

| Nợ dài hạn | Giá trị | Ghi chú |
|------------|--------:|---------|
| Vay dài hạn ngân hàng | 400 | trả góp qua nhiều năm |
| Trái phiếu phát hành | 100 | đáo hạn sau 12 tháng |
| Nợ thuê tài chính dài hạn | 0 | (chưa phát sinh trong ví dụ) |
| Dự phòng trợ cấp thôi việc | 0 | (chưa phát sinh trong ví dụ) |
| **Cộng nợ dài hạn** | **500** | |

Vậy **Tổng nợ phải trả = 250 + 500 = 750**.

### 2.5 Vốn chủ sở hữu (Equity)

Nhắc lại từ [Lesson 01](../../01-Fundamentals/lesson-01-accounting-equation/): vốn chủ là **phần còn lại** $E = A - L$, gồm 2 nguồn:

$$E = \\underbrace{\\text{Vốn góp}}_{\\text{chủ bỏ vào}} + \\underbrace{\\text{Lợi nhuận giữ lại}}_{\\text{tự làm ra, chưa chia}}$$

| Vốn chủ sở hữu | Giá trị | Ghi chú |
|----------------|--------:|---------|
| Vốn góp của chủ sở hữu | 300 | tiền chủ đầu tư vào |
| Lợi nhuận giữ lại | 120 | lãi tích lũy chưa chia |
| **Cộng vốn chủ sở hữu** | **420** | |

Kiểm tra cân: $L + E = 750 + 420 = 1.170 = A$ ✓.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khoản phải thu là tài sản hay nợ?"* → **Tài sản** — đó là *quyền đòi tiền* của mình. Đừng nhầm với "phải trả người bán" (nợ). Cùng chữ "phải" nhưng ngược chiều: *phải thu* = người ta nợ mình; *phải trả* = mình nợ người ta.
> - *"Lợi nhuận giữ lại có phải là tiền mặt không?"* → **Không.** Nó là một mục *vốn chủ*, đo phần lãi tích lũy chưa chia. Số đó có thể đã nằm trong hàng tồn kho, thiết bị... chứ không nhất thiết là tiền trong két.
> - *"Vì sao đất không khấu hao mà thiết bị thì có?"* → Đất không hao mòn theo thời gian sử dụng; thiết bị thì cũ đi, mất dần giá trị — sẽ học kỹ ở bài khấu hao.

> ⚠ **Lỗi thường gặp.** Xếp **vốn góp** vào nợ phải trả. Sai — vốn góp là phần của **chủ**, không có nghĩa vụ hoàn trả cố định như nợ. Chủ nợ được trả trước; chủ sở hữu nhận phần còn lại sau cùng.

> 📝 **Tóm tắt mục 2.**
> - Mỗi vế chia theo thanh khoản: tài sản (ngắn hạn → dài hạn), nguồn vốn (nợ ngắn hạn → nợ dài hạn → vốn chủ).
> - Ví dụ Bình Minh: Tài sản 1.170 = Nợ 750 + Vốn chủ 420.
> - *Phải thu* là tài sản; *phải trả* là nợ — đừng nhầm.

---

## 3. Ranh giới ngắn hạn / dài hạn — quy tắc 12 tháng

> 💡 **Trực giác.** Ranh giới là câu hỏi duy nhất: *"Khoản này sẽ biến thành tiền (tài sản) hoặc phải chi tiền (nợ) trong vòng 12 tháng tới không?"* **Có → ngắn hạn. Không → dài hạn.** Toàn bộ việc "phân loại" chỉ là trả lời câu này cho từng dòng.

Áp dụng cho ví dụ Bình Minh:

| Khoản mục | Biến thành / phải chi tiền trong 12 tháng? | Xếp vào |
|-----------|:-------------------------------------------:|---------|
| Hàng tồn kho | Có (bán trong năm) | TS ngắn hạn |
| Đất | Không (giữ lâu dài) | TS dài hạn |
| Phải trả người bán | Có (trả trong vài tháng) | Nợ ngắn hạn |
| Trái phiếu 3 năm | Không | Nợ dài hạn |

> ⚠ **Lỗi thường gặp — phần đến hạn của nợ dài hạn.** Một khoản vay dài hạn 400, trong đó **50 phải trả trong 12 tháng tới**, thì 50 đó **chuyển sang nợ ngắn hạn**, chỉ 350 còn ở nợ dài hạn. Lý do: 50 kia tạo áp lực thanh khoản ngay năm nay. Đừng để cả 400 nằm ở dài hạn chỉ vì gốc là khoản vay dài hạn.

> 🔁 **Dừng lại tự kiểm tra.** Xếp mỗi khoản vào ngắn hạn hay dài hạn:
> 1. Xe tải dùng để giao hàng nhiều năm.
> 2. Khoản phải thu khách hàng, dự kiến thu sau 2 tháng.
> 3. Vay ngân hàng kỳ hạn 5 năm.
>
> <details><summary>Đáp án</summary>
>
> 1. **Tài sản dài hạn** (dùng > 12 tháng).
> 2. **Tài sản ngắn hạn** (thu trong 12 tháng).
> 3. **Nợ dài hạn** — trừ phần gốc phải trả trong 12 tháng tới thì tách sang nợ ngắn hạn.
> </details>

---

## 4. Vốn lưu động & hệ số thanh toán hiện hành

Hai chỉ số này khai thác đúng lý do ta tách ngắn hạn / dài hạn: **đo sức khỏe thanh khoản** — công ty có đủ nguồn lực sắp sẵn để trả các khoản sắp đến hạn không.

### 4.1 Vốn lưu động (Working capital)

**(a) Là gì.** Phần tài sản ngắn hạn **dư ra** sau khi đã đủ để trả hết nợ ngắn hạn:

$$\\text{Vốn lưu động} = \\text{Tài sản ngắn hạn} - \\text{Nợ ngắn hạn}$$

**(b) Vì sao cần.** Nó trả lời trực tiếp: *"Nếu mọi khoản ngắn hạn cùng đến hạn, sau khi trả hết nợ ngắn hạn mình còn dư bao nhiêu đệm?"* Dương = có đệm an toàn; âm = có nguy cơ kẹt tiền.

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng dương/âm/bằng 0):

| TS ngắn hạn | Nợ ngắn hạn | Vốn lưu động | Đọc |
|------------:|------------:|-------------:|-----|
| 370 | 250 | **+120** | Bình Minh — có đệm tốt |
| 200 | 250 | **−50** | thiếu hụt, rủi ro thanh khoản |
| 500 | 500 | **0** | vừa khít, không đệm |
| 800 | 300 | **+500** | rất dư dả (có thể đang giữ tiền chết) |

### 4.2 Hệ số thanh toán hiện hành (Current ratio)

**(a) Là gì.** Tỷ số giữa tài sản ngắn hạn và nợ ngắn hạn — cùng thông tin như vốn lưu động nhưng ở dạng **tỷ lệ** (dễ so sánh giữa các công ty to nhỏ khác nhau):

$$\\text{Current ratio} = \\frac{\\text{Tài sản ngắn hạn}}{\\text{Nợ ngắn hạn}}$$

**(b) Vì sao cần thêm dù đã có vốn lưu động.** Vốn lưu động là số tuyệt đối — dư 120 với công ty nhỏ là nhiều, với tập đoàn lại chẳng đáng kể. Tỷ số chuẩn hóa điều đó: cứ 1 đồng nợ ngắn hạn được bao nhiêu đồng tài sản ngắn hạn "đỡ".

**(c) Ví dụ số cụ thể** (≥ 4):

| TS ngắn hạn | Nợ ngắn hạn | Current ratio | Đọc |
|------------:|------------:|:-------------:|-----|
| 370 | 250 | **1,48** | Bình Minh — lành mạnh (thường mong ≥ 1,5) |
| 200 | 250 | **0,80** | < 1: nợ ngắn > tài sản ngắn → cảnh báo |
| 500 | 500 | **1,00** | vừa đủ, không đệm |
| 800 | 300 | **2,67** | rất cao (an toàn, nhưng có thể kém hiệu quả) |

> ⚠ **Lỗi thường gặp.** *"Current ratio càng cao càng tốt."* Không hẳn. Quá cao (vd 4-5) có thể nghĩa là công ty **ôm quá nhiều tiền/tồn kho không sinh lời** thay vì đầu tư. "Tốt" là **đủ đệm mà không lãng phí** — thường quanh 1,5–2 tùy ngành.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Vốn lưu động và current ratio có mâu thuẫn nhau bao giờ không?"* → Không về dấu: current ratio > 1 **khi và chỉ khi** vốn lưu động > 0 (cùng tử số/mẫu số). Chúng chỉ khác **cách trình bày** — một số tuyệt đối, một tỷ lệ.

> 🔁 **Dừng lại tự kiểm tra.** Công ty có TS ngắn hạn 600, nợ ngắn hạn 400.
> 1. Vốn lưu động?
> 2. Current ratio?
>
> <details><summary>Đáp án</summary>
>
> 1. $600 - 400 = \\mathbf{200}$.
> 2. $600 / 400 = \\mathbf{1{,}5}$.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Vốn lưu động $= $ TS ngắn hạn $-$ Nợ ngắn hạn (số tuyệt đối, đo đệm thanh khoản).
> - Current ratio $= $ TS ngắn hạn $/$ Nợ ngắn hạn (tỷ lệ, dễ so sánh).
> - CR $> 1 \\Leftrightarrow$ vốn lưu động $> 0$. Cao quá cũng không hẳn tốt.

---

## 5. Walk-through: dựng một bảng cân đối hoàn chỉnh

**Đề bài.** Cho danh sách số dư (chưa phân loại, đơn vị triệu đồng) của Công ty Bình Minh tại ngày 31/12/2025:

> Tiền mặt 150 · Vay dài hạn ngân hàng 400 · Hàng tồn kho 110 · Vốn góp 300 · Thiết bị 300 · Phải trả người bán 80 · Đất 180 · Lợi nhuận giữ lại 120 · Khoản phải thu 90 · Vay ngắn hạn 100 · Nhà xưởng 250 · Trái phiếu phát hành 100 · Chi phí trả trước 20 · Lương phải trả 40 · Xe tải 70 · Thuế phải nộp 30

**Bước 1 — phân loại từng dòng** (hỏi: tài sản/nợ/vốn? ngắn hay dài hạn?).

**Bước 2 — cộng theo nhóm:**

$$\\begin{aligned}
\\text{TS ngắn hạn} &= 150 + 90 + 110 + 20 = 370 \\\\
\\text{TS dài hạn} &= 300 + 250 + 180 + 70 = 800 \\\\
\\text{Tổng tài sản} &= 370 + 800 = 1{.}170 \\\\[4pt]
\\text{Nợ ngắn hạn} &= 80 + 100 + 40 + 30 = 250 \\\\
\\text{Nợ dài hạn} &= 400 + 100 = 500 \\\\
\\text{Tổng nợ} &= 250 + 500 = 750 \\\\[4pt]
\\text{Vốn chủ} &= 300 + 120 = 420
\\end{aligned}$$

**Bước 3 — trình bày hai phía và kiểm tra cân:**

| TÀI SẢN | | NGUỒN VỐN | |
|---------|--:|-----------|--:|
| **Tài sản ngắn hạn** | | **Nợ ngắn hạn** | |
| Tiền mặt | 150 | Phải trả người bán | 80 |
| Khoản phải thu | 90 | Vay ngắn hạn | 100 |
| Hàng tồn kho | 110 | Lương phải trả | 40 |
| Chi phí trả trước | 20 | Thuế phải nộp | 30 |
| *Cộng ngắn hạn* | *370* | *Cộng nợ ngắn hạn* | *250* |
| **Tài sản dài hạn** | | **Nợ dài hạn** | |
| Thiết bị | 300 | Vay dài hạn | 400 |
| Nhà xưởng | 250 | Trái phiếu phát hành | 100 |
| Đất | 180 | *Cộng nợ dài hạn* | *500* |
| Xe tải | 70 | **Vốn chủ sở hữu** | |
| *Cộng dài hạn* | *800* | Vốn góp | 300 |
| | | Lợi nhuận giữ lại | 120 |
| | | *Cộng vốn chủ* | *420* |
| **TỔNG TÀI SẢN** | **1.170** | **TỔNG NỢ + VỐN CHỦ** | **1.170** |

**Bước 4 — kiểm tra:** $1.170 = 750 + 420 = 1.170$ ✓ **Cân.**

**Bước 5 — chỉ số thanh khoản:**
- Vốn lưu động $= 370 - 250 = 120$ (dương → có đệm an toàn).
- Current ratio $= 370 / 250 = 1{,}48$ (lành mạnh).

Bấm thử [visualization.html](./visualization.html) để sửa từng số dư và xem bảng cân đối tự dựng lại, kiểm tra cân theo thời gian thực.

---

## 6. Bài tập

**Bài 1 (phân loại).** Xếp mỗi khoản vào đúng ô: TS ngắn hạn / TS dài hạn / Nợ ngắn hạn / Nợ dài hạn / Vốn chủ.

a) Hàng tồn kho b) Vay ngân hàng 3 năm c) Phải trả người bán d) Đất e) Lợi nhuận giữ lại f) Khoản phải thu g) Thuế phải nộp trong tháng h) Thiết bị

**Bài 2 (điền số còn thiếu).** Dùng cấu trúc bảng cân đối:

| | TS ngắn hạn | TS dài hạn | Nợ ngắn hạn | Nợ dài hạn | Vốn chủ |
|--|--:|--:|--:|--:|--:|
| a | 200 | 500 | 150 | 250 | ? |
| b | 300 | ? | 200 | 300 | 400 |
| c | 260 | 640 | ? | 350 | 450 |

**Bài 3 (dựng & phân tích).** Cửa hàng Hoa Sen có các số dư: tiền 80, phải thu 60, tồn kho 100, thiết bị 220, đất 140, phải trả người bán 70, vay ngắn hạn 50, vay dài hạn 200, vốn góp 180. Yêu cầu:
1. Tính tổng tài sản, tổng nợ.
2. Tìm **lợi nhuận giữ lại** (biết bảng phải cân).
3. Tính **vốn lưu động** và **current ratio**, nhận xét.

---

## 7. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: với mỗi khoản hỏi "tài sản/nợ/vốn?" rồi "trong 12 tháng?".

| Khoản | Phân loại |
|-------|-----------|
| a) Hàng tồn kho | TS ngắn hạn |
| b) Vay ngân hàng 3 năm | Nợ dài hạn |
| c) Phải trả người bán | Nợ ngắn hạn |
| d) Đất | TS dài hạn |
| e) Lợi nhuận giữ lại | Vốn chủ |
| f) Khoản phải thu | TS ngắn hạn |
| g) Thuế phải nộp trong tháng | Nợ ngắn hạn |
| h) Thiết bị | TS dài hạn |

**Bài 2.** Dùng $\\text{TS ngắn} + \\text{TS dài} = \\text{Nợ ngắn} + \\text{Nợ dài} + \\text{Vốn chủ}$:
- a) $A = 200 + 500 = 700$; $L = 150 + 250 = 400$; $E = 700 - 400 = \\mathbf{300}$.
- b) $L + E = 200 + 300 + 400 = 900$ nên $A = 900$; $\\text{TS dài} = 900 - 300 = \\mathbf{600}$.
- c) $A = 260 + 640 = 900$; $\\text{Nợ dài} + \\text{Vốn} = 350 + 450 = 800$; $\\text{Nợ ngắn} = 900 - 800 = \\mathbf{100}$.

**Bài 3.** Cách tiếp cận: dựng phương trình, giải vốn chủ rồi tách lợi nhuận giữ lại.

*Phân loại & cộng nhóm:*
$$\\begin{aligned}
\\text{TS ngắn hạn} &= 80 + 60 + 100 = 240 \\\\
\\text{TS dài hạn} &= 220 + 140 = 360 \\\\
\\text{Tổng tài sản} &= 240 + 360 = 600 \\\\
\\text{Nợ ngắn hạn} &= 70 + 50 = 120 \\\\
\\text{Nợ dài hạn} &= 200 \\\\
\\text{Tổng nợ} &= 120 + 200 = 320
\\end{aligned}$$

1. **Tổng tài sản = 600; tổng nợ = 320.**
2. Vốn chủ $= A - L = 600 - 320 = 280$. Mà vốn chủ $=$ vốn góp $+$ lợi nhuận giữ lại $\\Rightarrow 280 = 180 + \\text{LN giữ lại}$ ⇒ **lợi nhuận giữ lại $= 100$.**
3. Vốn lưu động $= 240 - 120 = \\mathbf{120}$; current ratio $= 240/120 = \\mathbf{2{,}0}$. **Nhận xét:** đệm thanh khoản tốt (mỗi đồng nợ ngắn hạn có 2 đồng tài sản ngắn hạn đỡ); không quá cao đến mức lãng phí.

> 📝 **Tóm tắt bài học.**
> - Bảng cân đối = ảnh chụp $A = L + E$ tại **một thời điểm** (khác báo cáo KQKD theo thời kỳ).
> - Hai vế chia theo thanh khoản: tài sản (ngắn/dài hạn), nguồn vốn (nợ ngắn/dài hạn + vốn chủ).
> - Ranh giới ngắn/dài hạn = quy tắc **12 tháng**; phần nợ dài hạn đến hạn trong 12 tháng chuyển sang ngắn hạn.
> - Vốn lưu động $=$ TS ngắn $-$ Nợ ngắn; current ratio $=$ TS ngắn $/$ Nợ ngắn — đo sức khỏe thanh khoản.
> - Dựng xong phải **cân**: tổng tài sản $=$ tổng nợ $+$ vốn chủ. Lệch $\\Rightarrow$ có lỗi ghi sổ.

---

## Bài tiếp theo

**[Lesson 06 — Báo cáo kết quả kinh doanh](../lesson-06-income-statement/)** *(sắp ra)*: nếu bảng cân đối là ảnh chụp một thời điểm, thì báo cáo kết quả kinh doanh là **thước phim** của cả thời kỳ — doanh thu − chi phí = lợi nhuận, và chính lợi nhuận đó chảy vào "lợi nhuận giữ lại" trên bảng cân đối.

Minh họa tương tác: [visualization.html](./visualization.html) — nhập số dư từng khoản mục, xem bảng cân đối tự dựng và kiểm tra cân theo thời gian thực.
`;
