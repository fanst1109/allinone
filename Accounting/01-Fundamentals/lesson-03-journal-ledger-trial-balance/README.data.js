// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Accounting/01-Fundamentals/lesson-03-journal-ledger-trial-balance/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Chu trình ghi sổ: Nhật ký → Sổ cái → Bảng cân đối thử

> Một giao dịch không "nhảy thẳng" vào báo cáo tài chính. Nó đi qua ba trạm: **ghi Nhật ký** (theo thời gian) → **chuyển Sổ cái** (gom theo tài khoản) → **lập Bảng cân đối thử** (kiểm tra cân trước khi làm báo cáo).

## Mục tiêu học tập

- Hiểu **chu trình ghi sổ**: chứng từ → Nhật ký (Journal) → Sổ cái (Ledger) → Bảng cân đối thử (Trial Balance).
- Ghi được một **bút toán Nhật ký** (journal entry) đúng thứ tự thời gian, và **chuyển sổ** (posting) sang T-account.
- Tính **số dư** (balance) của một tài khoản từ T-account, đặt đúng cột Nợ/Có trên bảng cân đối thử.
- Giải thích *vì sao* tổng cột Nợ **luôn** bằng tổng cột Có — và vì sao **cân không có nghĩa là đúng**.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../lesson-01-accounting-equation/): $A = L + E$ luôn cân.
- [Lesson 02 — Bút toán kép & Nợ/Có](../lesson-02-double-entry/): mỗi giao dịch ghi **Nợ (Debit) = Có (Credit)**; tài khoản Tài sản/Chi phí có **số dư bên Nợ**, tài khoản Nợ phải trả/Vốn/Doanh thu có **số dư bên Có**. Lesson này giả định bạn đã định khoản được.

Đơn vị dùng xuyên suốt: **triệu đồng**.

---

## 1. Bức tranh lớn: ba trạm của một con số

> 💡 **Trực giác.** Hãy tưởng tượng bạn quản lý một cửa hàng. Cả ngày bạn viết **nhật ký bán hàng**: "9h15 bán 2 ly, thu 80k; 9h40 nhập đá, chi 30k"… — ghi *theo thứ tự thời gian*, cái gì xảy ra trước ghi trước. Nhưng cuối tháng, sếp hỏi *"quỹ tiền còn bao nhiêu?"*. Cuốn nhật ký theo thời gian **không trả lời được ngay** — bạn phải lật từng dòng, cộng hết tiền vào, trừ hết tiền ra. Muốn trả lời nhanh, bạn cần một cuốn khác **gom riêng mọi dòng liên quan tới Tiền mặt** vào một chỗ. Đó chính là lý do kế toán có **hai** cuốn sổ: một cuốn theo *thời gian* (Nhật ký), một cuốn theo *tài khoản* (Sổ cái).

Dòng chảy chuẩn của mọi con số:

$$\\underbrace{\\text{Chứng từ}}_{\\text{hóa đơn, phiếu thu}} \\;\\to\\; \\underbrace{\\text{Nhật ký}}_{\\text{theo thời gian}} \\;\\to\\; \\underbrace{\\text{Sổ cái}}_{\\text{theo tài khoản}} \\;\\to\\; \\underbrace{\\text{Bảng cân đối thử}}_{\\text{kiểm tra cân}}$$

| Trạm | Sắp xếp theo | Trả lời câu hỏi | Tên tiếng Anh |
|------|--------------|-----------------|---------------|
| Chứng từ | sự kiện thực tế | "có bằng chứng gì?" | source document |
| **Nhật ký** | **thời gian** | "ngày đó ghi gì?" | journal |
| **Sổ cái** | **tài khoản** | "tài khoản này dư bao nhiêu?" | ledger |
| **Bảng cân đối thử** | danh sách số dư | "sổ có cân không?" | trial balance |

Cùng một con số **80** (một lần thu tiền dịch vụ) sẽ xuất hiện ở cả ba trạm — chỉ khác cách nó được *xếp chỗ*. Mục 6 sẽ lần vết đúng con số này qua cả ba trạm.

> ❓ **Câu hỏi tự nhiên.** *"Sao phải chép ra hai cuốn? Một cuốn không đủ à?"* → Vì hai câu hỏi khác nhau cần hai cách sắp xếp. Nhật ký giỏi trả lời "ngày X có gì" (kiểm toán, truy vết). Sổ cái giỏi trả lời "tài khoản Y dư bao nhiêu" (lập báo cáo). Một cuốn không thể tối ưu cho cả hai. Phần mềm kế toán ngày nay chép tự động, nhưng **logic hai trạm vẫn nguyên**.

---

## 2. Nhật ký (Journal) — sổ ghi theo thời gian

**(a) Là gì.** Nhật ký là sổ ghi **mọi giao dịch theo đúng thứ tự thời gian**, mỗi giao dịch là một **bút toán (journal entry)** gồm: ngày, (các) tài khoản ghi **Nợ**, (các) tài khoản ghi **Có**, và số tiền. Vì là nơi giao dịch được ghi *đầu tiên*, nó còn gọi là *sổ nhật ký chung* hay "book of original entry".

**(b) Vì sao cần.** Để có một dòng thời gian đầy đủ, không bỏ sót, dễ truy vết ngược về chứng từ. Nó tách hành động **"ghi nhận cái gì xảy ra"** (Nhật ký) khỏi hành động **"gom vào từng tài khoản"** (Sổ cái) — chia để dễ kiểm soát sai sót.

**(c) Ví dụ số cụ thể** (4 bút toán, quy tắc Nợ = Có mỗi dòng — từ [L02](../lesson-02-double-entry/)):

| Ngày | Tài khoản Nợ (Debit) | Tài khoản Có (Credit) | Số tiền |
|------|----------------------|------------------------|--------:|
| 05/01 | Tiền mặt | Vốn góp | 200 |
| 08/01 | Tiền mặt | Vay ngân hàng | 100 |
| 12/01 | Thiết bị | Tiền mặt | 120 |
| 18/01 | Tiền mặt | Doanh thu | 80 |

Đọc dòng 12/01: *"Nợ Thiết bị 120, Có Tiền mặt 120"* — thiết bị (tài sản) tăng nên ghi Nợ; tiền mặt (tài sản) giảm nên ghi Có. Mỗi dòng **tự cân**: số bên Nợ = số bên Có.

> ⚠ **Lỗi thường gặp.** Ghi Nợ và Có **khác số tiền** (vd Nợ Thiết bị 120 / Có Tiền mặt 100). Bút toán lệch ngay từ Nhật ký → kéo theo cả Sổ cái và Bảng cân đối thử lệch. Luôn kiểm tra: *tổng Nợ của bút toán = tổng Có?*

---

## 3. Sổ cái (Ledger) & T-account — gom theo tài khoản

**(a) Là gì.** Sổ cái là tập hợp **tất cả các tài khoản**; mỗi tài khoản gom **mọi phát sinh của riêng nó** vào một chỗ. Hình dung mỗi tài khoản như chữ **T**: gạch dọc chia đôi, **bên trái = Nợ**, **bên phải = Có**. Việc chép số từ Nhật ký sang đúng bên của từng T-account gọi là **chuyển sổ / posting**.

**(b) Vì sao cần.** Nhật ký theo thời gian **không** cho biết ngay "Tiền mặt còn bao nhiêu" — con số đó nằm rải rác ở nhiều dòng. Sổ cái gom tất cả dòng đụng tới Tiền mặt vào một T-account, nên chỉ cần cộng một cột là ra **số dư (balance)**.

**Số dư** của một tài khoản:

$$\\text{Số dư} = |\\ \\Sigma\\text{(bên Nợ)} - \\Sigma\\text{(bên Có)}\\ |,\\quad \\text{đặt ở bên lớn hơn}$$

Từ [L02](../lesson-02-double-entry/): Tài sản & Chi phí bình thường **dư Nợ**; Nợ phải trả, Vốn, Doanh thu bình thường **dư Có**.

**(c) Ví dụ số cụ thể** — post 4 bút toán mục 2 (và thêm 2 giao dịch để đủ ví dụ) vào các T-account:

**Tiền mặt** (tài sản → dư Nợ):

| Nợ (tiền vào) | Có (tiền ra) |
|--------------:|-------------:|
| 200 (05/01) | 120 (12/01) |
| 100 (08/01) | 30 (25/01) |
| 80 (18/01) | 40 (28/01) |
| **Σ Nợ = 380** | **Σ Có = 190** |

→ Dư Nợ = $380 - 190 = \\mathbf{190}$.

**Thiết bị** (tài sản → dư Nợ): chỉ có 1 phát sinh bên Nợ 120 → **Dư Nợ = 120**.

**Vay ngân hàng** (nợ phải trả → dư Có):

| Nợ (trả bớt) | Có (vay thêm) |
|-------------:|--------------:|
| 40 (28/01) | 100 (08/01) |
| **Σ Nợ = 40** | **Σ Có = 100** |

→ Dư Có = $100 - 40 = \\mathbf{60}$.

**Doanh thu** (dư Có): 1 phát sinh bên Có 80 → **Dư Có = 80**.

(Hai giao dịch thêm: 25/01 *Nợ Chi phí lương 30 / Có Tiền mặt 30*; 28/01 *Nợ Vay ngân hàng 40 / Có Tiền mặt 40* — sẽ dùng đầy đủ ở walk-through mục 6.)

> ❓ **Câu hỏi tự nhiên.**
> - *"Post là chép y nguyên số, hay tính toán gì?"* → Chép **y nguyên**. Số ở bên Nợ của bút toán → chép sang bên Nợ của T-account tương ứng; bên Có → chép sang bên Có. Posting không "sáng tạo" con số nào, chỉ **đổi chỗ sắp xếp**. Nhờ vậy tổng tiền không đổi (nền tảng để mục 5 chứng minh cân).
> - *"Một tài khoản có thể dư 0 không?"* → Có. Nếu Σ Nợ = Σ Có (vd vay 100 rồi trả hết 100) thì dư 0, không xuất hiện trên bảng cân đối thử.

> 🔁 **Dừng lại tự kiểm tra.** Tài khoản *Phải trả người bán* (nợ phải trả) có: bên Có 70 và 50, bên Nợ 90. Dư bao nhiêu, bên nào?
>
> <details><summary>Đáp án</summary>
>
> Σ Có $= 70 + 50 = 120$; Σ Nợ $= 90$. Dư $= 120 - 90 = 30$, bên **Có** (đúng chiều bình thường của nợ phải trả). ✓
> </details>

---

## 4. Bảng cân đối thử (Trial Balance) — kiểm tra cân

**(a) Là gì.** Bảng liệt kê **số dư cuối kỳ của mọi tài khoản** trong Sổ cái, chia thành hai cột: **Dư Nợ** và **Dư Có**. Mỗi tài khoản ghi số dư vào đúng cột theo bản chất của nó. Cuối bảng cộng hai cột — chúng **phải bằng nhau**.

**(b) Vì sao cần.** Là bước **kiểm tra sơ bộ** trước khi lập báo cáo tài chính: nếu hai cột không khớp, chắc chắn có lỗi ghi/cộng đâu đó, phải sửa trước. Nó cũng là "bản nháp gọn" tập hợp tất cả số dư về một trang để lập Bảng cân đối kế toán và Báo cáo KQKD.

**(c) Ví dụ số cụ thể** (lấy số dư từ mục 3, đủ 6 tài khoản):

| Tài khoản | Dư Nợ | Dư Có |
|-----------|------:|------:|
| Tiền mặt | 190 | |
| Thiết bị | 120 | |
| Chi phí lương | 30 | |
| Vay ngân hàng | | 60 |
| Vốn góp | | 200 |
| Doanh thu | | 80 |
| **TỔNG** | **340** | **340** |

Kiểm tra: Tổng Nợ $= 190 + 120 + 30 = 340$; Tổng Có $= 60 + 200 + 80 = 340$. **340 = 340 ✓ cân.**

> ⚠ **Lỗi thường gặp.** Đặt số dư **nhầm cột**: ví dụ ghi *Doanh thu* (dư Có) vào cột Nợ. Từng số vẫn đúng độ lớn, nhưng hai cột lệch $2 \\times 80 = 160$. Quy tắc: tài sản & chi phí → cột **Nợ**; nợ phải trả, vốn, doanh thu → cột **Có**.

---

## 5. Vì sao tổng Nợ LUÔN bằng tổng Có — và vì sao cân ≠ đúng

### 5.1 Chứng minh: cột Nợ = cột Có

> 💡 **Trực giác.** Cân ở bảng cân đối thử **không phải phép màu** — nó là hệ quả cơ học của việc *mỗi bút toán đã cân sẵn từ Nhật ký* (Nợ = Có). Cộng nhiều thứ cân lại thì vẫn cân.

Gọi tài khoản $i$ có tổng phát sinh bên Nợ là $D_i$, bên Có là $C_i$. Chứng minh **từng bước**:

$$\\begin{aligned}
\\text{(1) Mỗi bút toán } k:\\quad & \\text{Nợ}_k = \\text{Có}_k \\quad \\text{(quy tắc bút toán kép, L02)}\\\\
\\text{(2) Cộng mọi bút toán:}\\quad & \\sum_k \\text{Nợ}_k = \\sum_k \\text{Có}_k \\;\\Rightarrow\\; \\sum_i D_i = \\sum_i C_i\\\\
\\text{(3) Posting chỉ chép số, không đổi tổng:}\\quad & D_i,\\, C_i \\text{ là các số đó gom theo tài khoản}\\\\
\\text{(4) Số dư đặt cột:}\\quad & \\text{cột Nợ} - \\text{cột Có} = \\sum_i (D_i - C_i) = \\sum_i D_i - \\sum_i C_i\\\\
\\text{(5) Thay (2) vào (4):}\\quad & \\text{cột Nợ} - \\text{cột Có} = 0 \\;\\Rightarrow\\; \\boxed{\\text{cột Nợ} = \\text{cột Có}}
\\end{aligned}$$

Bước (4) đúng vì: tài khoản dư Nợ đóng góp $D_i - C_i > 0$ vào cột Nợ; tài khoản dư Có đóng góp $C_i - D_i > 0$ vào cột Có, tức $-(D_i - C_i)$. Gộp cả hai loại: hiệu hai cột $= \\sum_i (D_i - C_i)$. Không bước nào dùng "dễ thấy" — mọi thứ suy ra từ (1).

**Kiểm chứng bằng số** (dữ liệu mục 4): $\\sum D_i = 380 + 120 + 30 + 40 + 0 + 0 = 570$; $\\sum C_i = 190 + 0 + 0 + 100 + 200 + 80 = 570$. Bằng nhau ✓ — và đúng bằng tổng số tiền của 6 bút toán ($200+100+120+80+30+40 = 570$). Số dư ròng đưa hai cột về $340 = 340$.

### 5.2 Cảnh báo: cân KHÔNG bảo đảm không sai

> ⚠ **Đây là hiểu lầm nguy hiểm nhất của mục này.** "Trial balance cân" chỉ chứng minh **tổng Nợ đã ghi = tổng Có đã ghi**. Nó **mù** với các lỗi làm hỏng *cả hai vế cùng lúc* hoặc *không đụng tới thế cân*.

Các loại lỗi **vẫn để bảng cân** (bảng khớp nhưng sổ sai):

| Loại lỗi | Ví dụ số cụ thể | Vì sao vẫn cân |
|----------|-----------------|----------------|
| **Bỏ sót cả bút toán** | Quên hẳn giao dịch trả lương 30 (không ghi Nợ lẫn Có) | Không đụng bên nào → hai cột vẫn khớp, chỉ cùng thiếu 30 |
| **Ghi sai số ở cả hai vế** | Thu dịch vụ 80 nhưng ghi *Nợ Tiền mặt 800 / Có Doanh thu 800* | Nợ và Có cùng sai 800 → vẫn bằng nhau |
| **Nhầm tài khoản cùng bên** | Mua thiết bị 120 nhưng ghi *Nợ Chi phí 120 / Có Tiền mặt 120* | Vẫn 1 Nợ = 1 Có; nhưng tài sản bị biến thành chi phí → lãi sai |
| **Ghi trùng cả bút toán** | Post giao dịch vay 100 hai lần | Cả Nợ và Có đều +100 lần thứ hai → vẫn cân |
| **Lỗi bù trừ** | Cộng dư Tiền mặt thừa 10, đồng thời cộng dư Doanh thu thừa 10 | Hai lỗi triệt tiêu trên tổng |

Các loại lỗi **làm bảng LỆCH** (bảng tự tố cáo):

- Ghi **một vế, quên vế kia** (Nợ Tiền mặt 80 nhưng quên Có Doanh thu).
- Ghi hai vế **khác số tiền** (Nợ 120 / Có 100).
- **Post nhầm bên** (số đáng ghi Nợ lại ghi sang Có).
- **Cộng sai** số dư hoặc cộng sai tổng cột.

> ❓ **Câu hỏi tự nhiên.** *"Vậy trial balance để làm gì nếu nó bỏ lọt nhiều lỗi thế?"* → Nó bắt **rẻ và nhanh** nguyên một *lớp* lỗi phổ biến (lệch Nợ/Có). Còn các lỗi "cân nhưng sai" cần công cụ khác: đối chiếu chứng từ, đối chiếu ngân hàng, kiểm toán. Trial balance là *cửa kiểm tra đầu tiên*, không phải cửa duy nhất.

> 📝 **Tóm tắt mục 5.**
> - Cột Nợ = cột Có là hệ quả toán học của "mỗi bút toán Nợ = Có" — không phải trùng hợp.
> - Kiểm chứng số: $\\sum D_i = \\sum C_i = 570$ → hai cột dư ròng $340 = 340$.
> - **Cân ≠ đúng.** 5 loại lỗi (bỏ sót, sai cả hai vế, nhầm TK cùng bên, ghi trùng, bù trừ) vẫn để bảng cân.
> - Trial balance chỉ bắt lỗi *lệch Nợ/Có*; lỗi bản chất cần đối chiếu chứng từ/kiểm toán.

---

## 6. Walk-through đầy đủ: lần vết một con số qua ba trạm

Công ty tư vấn "Minh An" trong tháng 1, **6 giao dịch** (triệu đồng). Ta lần vết **giao dịch 18/01 (thu dịch vụ 80)** qua cả ba trạm, rồi lập bảng cân đối thử cho cả 6 giao dịch.

### 6.1 Lần vết con số 80 qua 3 trạm

- **Trạm 1 — Chứng từ:** hóa đơn dịch vụ số 04, khách trả ngay 80 bằng chuyển khoản.
- **Trạm 2 — Nhật ký (theo thời gian):** dòng ngày 18/01 → *Nợ Tiền mặt 80 / Có Doanh thu 80*.
- **Trạm 3 — Sổ cái (theo tài khoản):** con số 80 tách làm hai đường:
  - chép **80 vào bên Nợ** của T-account **Tiền mặt** (dòng thứ ba bên Nợ),
  - chép **80 vào bên Có** của T-account **Doanh thu**.
- **Trạm 4 — Bảng cân đối thử:** khi cộng số dư, 80 này nằm trong *Dư Nợ 190 của Tiền mặt* (cột Nợ) và *Dư Có 80 của Doanh thu* (cột Có) → đóng góp cân đối vào cả hai cột.

Một con số, ba cách xếp chỗ, luôn cân ở mọi trạm.

### 6.2 Sáu giao dịch → Nhật ký

| # | Ngày | Nợ | Có | Số tiền |
|---|------|----|----|--------:|
| 1 | 05/01 | Tiền mặt | Vốn góp | 200 |
| 2 | 08/01 | Tiền mặt | Vay ngân hàng | 100 |
| 3 | 12/01 | Thiết bị | Tiền mặt | 120 |
| 4 | 18/01 | Tiền mặt | Doanh thu | 80 |
| 5 | 25/01 | Chi phí lương | Tiền mặt | 30 |
| 6 | 28/01 | Vay ngân hàng | Tiền mặt | 40 |

### 6.3 Chuyển sổ → số dư từng T-account

| Tài khoản | Σ Nợ | Σ Có | Số dư | Bên |
|-----------|-----:|-----:|------:|-----|
| Tiền mặt | 380 | 190 | 190 | Nợ |
| Thiết bị | 120 | 0 | 120 | Nợ |
| Chi phí lương | 30 | 0 | 30 | Nợ |
| Vay ngân hàng | 40 | 100 | 60 | Có |
| Vốn góp | 0 | 200 | 200 | Có |
| Doanh thu | 0 | 80 | 80 | Có |

### 6.4 Bảng cân đối thử

| Tài khoản | Dư Nợ | Dư Có |
|-----------|------:|------:|
| Tiền mặt | 190 | |
| Thiết bị | 120 | |
| Chi phí lương | 30 | |
| Vay ngân hàng | | 60 |
| Vốn góp | | 200 |
| Doanh thu | | 80 |
| **TỔNG** | **340** | **340** |

**Tổng Nợ = Tổng Có = 340 ✓.** Kiểm tra chéo với [L01](../lesson-01-accounting-equation/): Tài sản $= 190 + 120 = 310$; Nợ phải trả $= 60$; Vốn chủ $= 200 + (80 - 30) = 250$. Vậy $A = 310 = L + E = 60 + 250$ ✓ — bảng cân đối thử cân **và** phương trình kế toán cân, hai mặt của cùng một sự thật.

---

## 7. Bài tập

**Bài 1 (Nhật ký → T-account).** Công ty X, tháng 3 (triệu đồng):
1. 02/03 — Chủ góp vốn 150 bằng tiền mặt.
2. 05/03 — Vay ngân hàng 90, nhận bằng tiền mặt.
3. 10/03 — Mua xe tải 100, trả bằng tiền mặt.
4. 20/03 — Cung cấp dịch vụ, thu ngay 60 tiền mặt.

Yêu cầu: (a) ghi 4 bút toán Nhật ký; (b) lập T-account **Tiền mặt** và tính số dư.

**Bài 2 (Bảng cân đối thử).** Dùng kết quả Bài 1, số dư cuối kỳ các tài khoản: Tiền mặt (?), Xe tải 100 (dư Nợ), Vay ngân hàng 90 (dư Có), Vốn góp 150 (dư Có), Doanh thu 60 (dư Có). Lập bảng cân đối thử và kiểm tra tổng hai cột.

**Bài 3 (Lỗi & tư duy phản biện).**
- (a) Một kế toán lập bảng cân đối thử ra Tổng Nợ = 540, Tổng Có = 500. Nêu **hai** loại lỗi có thể gây lệch này.
- (b) Bảng cân đối thử của công ty Y **cân khớp hoàn toàn**. Một bạn kết luận: "Vậy sổ sách chắc chắn không có lỗi nào." Đúng hay sai? Cho **một** ví dụ lỗi cụ thể mà bảng vẫn cân.

---

## 8. Lời giải chi tiết

**Bài 1.**

(a) Cách tiếp cận: mỗi giao dịch xác định tài khoản tăng/giảm, áp quy tắc Nợ/Có (L02):

| Ngày | Nợ | Có | Số tiền |
|------|----|----|--------:|
| 02/03 | Tiền mặt | Vốn góp | 150 |
| 05/03 | Tiền mặt | Vay ngân hàng | 90 |
| 10/03 | Xe tải | Tiền mặt | 100 |
| 20/03 | Tiền mặt | Doanh thu | 60 |

(b) T-account **Tiền mặt** (tài sản → dư Nợ):

| Nợ (vào) | Có (ra) |
|---------:|--------:|
| 150 (02/03) | 100 (10/03) |
| 90 (05/03) | |
| 60 (20/03) | |
| **Σ 300** | **Σ 100** |

Số dư $= 300 - 100 = \\mathbf{200}$, **dư Nợ**.

**Bài 2.** Điền dư Nợ Tiền mặt = 200 (từ Bài 1) vào cột Nợ; các tài khoản còn lại đặt đúng cột theo bản chất:

| Tài khoản | Dư Nợ | Dư Có |
|-----------|------:|------:|
| Tiền mặt | 200 | |
| Xe tải | 100 | |
| Vay ngân hàng | | 90 |
| Vốn góp | | 150 |
| Doanh thu | | 60 |
| **TỔNG** | **300** | **300** |

Tổng Nợ $= 200 + 100 = 300$; Tổng Có $= 90 + 150 + 60 = 300$. **300 = 300 ✓ cân.**

**Bài 3.**

(a) Chênh $540 - 500 = 40$. Hai loại lỗi làm **lệch** bảng:
- **Ghi thiếu một vế / hai vế khác số tiền**: ví dụ một bút toán ghi Nợ 40 nhưng quên (hoặc ghi thiếu) bên Có tương ứng → cột Nợ dư 40.
- **Post nhầm bên hoặc cộng sai số dư**: ví dụ một số dư đáng nằm cột Có 40 bị bỏ sót, hoặc cộng nhầm khiến một cột thừa 40. (Mẹo thực hành: chênh lệch chia hết cho 9 thường là lỗi *đảo chữ số* — vd ghi 54 thành 45; ở đây 40 không chia hết cho 9 nên nghiêng về lỗi thiếu/thừa một khoản 40 hoặc hai khoản 20.)

(b) **Sai.** Cân chỉ chứng minh tổng Nợ đã ghi = tổng Có đã ghi, **không** chứng minh mọi con số đúng bản chất. Ví dụ: giao dịch mua xe tải 100 bị ghi nhầm thành *Nợ Chi phí 100 / Có Tiền mặt 100* thay vì *Nợ Xe tải 100*. Bảng vẫn cân (1 Nợ = 1 Có), nhưng tài sản Xe tải bị "biến mất" và chi phí bị thổi phồng 100 → lợi nhuận sai. Đây là loại lỗi "nhầm tài khoản cùng bên" ở mục 5.2.

> 📝 **Tóm tắt bài học.**
> - Chu trình: Chứng từ → **Nhật ký** (theo thời gian) → **Sổ cái** (theo tài khoản, T-account) → **Bảng cân đối thử** (kiểm tra cân).
> - Nhật ký ghi bút toán Nợ = Có; **posting** chép y nguyên số sang đúng bên của T-account; **số dư** = $|\\Sigma\\text{Nợ} - \\Sigma\\text{Có}|$ đặt ở bên lớn hơn.
> - Bảng cân đối thử liệt kê số dư mọi tài khoản; **tổng cột Nợ = tổng cột Có** là hệ quả toán học của bút toán kép.
> - **Cân ≠ đúng**: bỏ sót, sai cả hai vế, nhầm TK cùng bên, ghi trùng, bù trừ — vẫn cân.

---

## Bài tiếp theo

**[Lesson 04 — Kế toán dồn tích & bút toán điều chỉnh](../lesson-04-accrual-adjusting/)**: cuối kỳ, trước khi lập báo cáo, ta còn phải ghi các **bút toán điều chỉnh** (adjusting entries) — khấu hao, chi phí trả trước, doanh thu chưa thực hiện — để con số phản ánh đúng kỳ phát sinh chứ không phải theo dòng tiền.

Minh họa tương tác: [visualization.html](./visualization.html) — bấm từng giao dịch, xem nó chảy qua Nhật ký → Sổ cái → Bảng cân đối thử, highlight để lần vết.
`;
