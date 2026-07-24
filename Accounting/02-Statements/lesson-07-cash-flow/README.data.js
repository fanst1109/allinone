// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Accounting/02-Statements/lesson-07-cash-flow/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Báo cáo lưu chuyển tiền tệ (Cash Flow Statement)

> Lãi trên giấy không phải là tiền trong két. Báo cáo này trả lời một câu duy nhất: **tiền thật đã đi đâu, về đâu trong kỳ?**

## Mục tiêu học tập

- Hiểu *vì sao* **lãi ≠ tiền** (nối tiếp cơ sở dồn tích ở Lesson 04 và báo cáo kết quả kinh doanh ở Lesson 06).
- Phân biệt **3 dòng tiền**: hoạt động kinh doanh (**CFO**), đầu tư (**CFI**), tài chính (**CFF**).
- Dựng CFO bằng **phương pháp gián tiếp**: bắt đầu từ lợi nhuận ròng, cộng lại khoản phi tiền mặt, điều chỉnh vốn lưu động.
- Kiểm tra hằng đẳng thức nền: $\\Delta\\text{Tiền} = \\text{CFO} + \\text{CFI} + \\text{CFF}$, rồi đối chiếu **tiền đầu kỳ → tiền cuối kỳ**.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): $A = L + E$, khái niệm phải thu / phải trả / tồn kho.
- **Lesson 04 — Cơ sở dồn tích (accrual)**: doanh thu/chi phí ghi nhận khi *phát sinh*, không phải khi *thu/chi tiền*. Đây là gốc rễ của việc "lãi ≠ tiền".
- [Lesson 06 — Báo cáo kết quả kinh doanh](../lesson-06-income-statement/visualization.html): nơi ra con số **lợi nhuận ròng (net income)** — điểm xuất phát của phương pháp gián tiếp.

---

## 1. Vì sao cần một báo cáo riêng cho tiền? (lãi ≠ tiền)

> 💡 **Trực giác.** Báo cáo kết quả kinh doanh (Lesson 06) nói công ty *kiếm được* bao nhiêu **theo kế toán dồn tích** — ghi doanh thu ngay khi giao hàng, kể cả khách còn nợ. Nhưng chủ doanh nghiệp trả lương, trả nợ, mua máy bằng **tiền thật**, không phải bằng "lợi nhuận trên giấy". Một công ty có thể *lãi to mà vẫn phá sản vì hết tiền* — hiện tượng "growing broke". Báo cáo lưu chuyển tiền tệ tồn tại để lần vết dòng tiền thật, tách khỏi các con số dồn tích.

**Vì sao lãi và tiền lệch nhau?** Vì kế toán dồn tích ghi nhận *thời điểm phát sinh*, còn tiền chạy vào/ra ở *thời điểm khác*. Bốn kiểu lệch điển hình:

| # | Tình huống | Ảnh hưởng **lợi nhuận** | Ảnh hưởng **tiền** | Kết quả |
|---|------------|:----------------------:|:------------------:|---------|
| 1 | Bán chịu 30 (khách chưa trả) | Lãi **+30** (ghi doanh thu) | Tiền **0** | Lãi > tiền |
| 2 | Khấu hao máy 40 trong kỳ | Lãi **−40** (chi phí) | Tiền **0** (đã chi từ trước) | Lãi < tiền |
| 3 | Mua tồn kho 20 trả tiền ngay | Lãi **0** (chưa bán) | Tiền **−20** | Lãi > tiền |
| 4 | Mua máy (capex) 80 trả tiền | Lãi **−khấu hao dần** (vài năm) | Tiền **−80** ngay | Lãi > tiền năm mua |

Nhìn bảng: mỗi dòng lãi và tiền đi **khác nhau**. Cộng dồn cả năm, chênh lệch có thể rất lớn. Báo cáo lưu chuyển tiền tệ chính là bản "hoà giải" (reconciliation) giữa hai thế giới đó.

> ⚠ **Lỗi thường gặp.** *"Công ty báo lãi 200 thì trong két phải nhiều thêm 200."* **Sai.** Nếu 200 lãi đó nằm phần lớn ở **khoản phải thu** (khách chưa trả) và công ty vừa chi 120 mua máy, tiền có thể **giảm** trong năm. Xem Bài 3.

> 🔁 **Dừng lại tự kiểm tra.**
> Công ty giao hàng trị giá 50, khách hẹn trả tháng sau. Trong kỳ này, *lợi nhuận* và *tiền* thay đổi bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Lợi nhuận **+50** (ghi doanh thu theo dồn tích khi giao hàng). Tiền **+0** (chưa thu). Chênh 50 nằm ở khoản phải thu — sẽ bị **trừ** khỏi CFO ở mục 3.
> </details>

---

## 2. Ba dòng tiền: CFO, CFI, CFF

Mọi đồng tiền vào/ra được xếp vào đúng **một** trong ba nhóm theo *bản chất hoạt động*. Cộng ba nhóm ra thay đổi tiền trong kỳ:

$$\\Delta\\text{Tiền} = \\text{CFO} + \\text{CFI} + \\text{CFF}$$

Rồi đối chiếu:

$$\\text{Tiền cuối kỳ} = \\text{Tiền đầu kỳ} + \\Delta\\text{Tiền}$$

### 2.1 CFO — Dòng tiền từ hoạt động kinh doanh

**(a) Là gì.** Tiền sinh ra (hoặc tiêu đi) từ **việc kinh doanh cốt lõi hằng ngày**: bán hàng, thu tiền khách, trả lương, trả nhà cung cấp, nộp thuế.

**(b) Vì sao cần tách riêng.** Đây là dòng tiền **quan trọng nhất** — nó cho biết bản thân hoạt động kinh doanh có *tự nuôi sống* được không, hay phải sống nhờ đi vay/bán tài sản. CFO âm dài hạn là dấu hiệu nguy hiểm.

**(c) Ví dụ số cụ thể** (≥ 4):

| Khoản mục CFO | Tiền |
|---------------|-----:|
| Thu tiền từ khách hàng | +420 |
| Trả lương nhân viên | −180 |
| Trả tiền nhà cung cấp | −120 |
| Nộp thuế | −15 |
| **CFO** | **+105** |

### 2.2 CFI — Dòng tiền từ hoạt động đầu tư

**(a) Là gì.** Tiền dùng để **mua/bán tài sản dài hạn** và các khoản đầu tư: mua máy móc, nhà xưởng (**capex** — capital expenditure), bán thiết bị cũ, mua/bán cổ phần công ty khác.

**(b) Vì sao cần.** Cho biết công ty đang *mở rộng năng lực* (capex lớn, CFI âm) hay *thu hẹp/bán tài sản* (CFI dương). Một công ty tăng trưởng lành mạnh thường có CFI âm vì liên tục đầu tư.

**(c) Ví dụ số cụ thể:**

| Khoản mục CFI | Tiền |
|---------------|-----:|
| Mua máy móc mới (capex) | −80 |
| Xây thêm nhà xưởng | −30 |
| Bán xe tải cũ | +12 |
| Mua cổ phần công ty con | −25 |
| **CFI** | **−123** |

### 2.3 CFF — Dòng tiền từ hoạt động tài chính

**(a) Là gì.** Tiền qua lại với **người tài trợ vốn**: vay nợ mới, trả nợ gốc, phát hành cổ phần (nhận vốn góp), mua lại cổ phiếu, **trả cổ tức**.

**(b) Vì sao cần.** Cho biết công ty đang *huy động thêm vốn* (CFF dương) hay *hoàn trả vốn cho chủ nợ & cổ đông* (CFF âm). Nối với Lesson 01: đây chính là các giao dịch chạm vào **Nợ (L)** và **Vốn góp / Cổ tức (E)**.

**(c) Ví dụ số cụ thể:**

| Khoản mục CFF | Tiền |
|---------------|-----:|
| Vay ngân hàng mới | +60 |
| Trả nợ gốc | −20 |
| Cổ đông góp thêm vốn | +30 |
| Trả cổ tức | −25 |
| **CFF** | **+45** |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tiền lãi vay trả ngân hàng nằm ở CFO hay CFF?"* → Theo chuẩn phổ biến (US GAAP), **lãi vay** trả nằm ở **CFO** (là chi phí kinh doanh trong kỳ), còn **nợ gốc** hoàn trả nằm ở **CFF**. Đừng lẫn hai thứ.
> - *"Cổ tức nằm ở đâu?"* → **Cổ tức trả cho cổ đông** ở **CFF** (hoàn vốn cho chủ). Nhất quán với Lesson 01: cổ tức trừ thẳng vào vốn chủ, không phải chi phí.
> - *"Mua tồn kho là đầu tư (CFI) chứ?"* → **Không.** Tồn kho là tài sản ngắn hạn phục vụ bán hàng hằng ngày → thuộc **CFO** (qua điều chỉnh vốn lưu động, mục 3). CFI chỉ dành cho **tài sản dài hạn**.

> 📝 **Tóm tắt mục 2.**
> - CFO = tiền từ kinh doanh cốt lõi; CFI = mua/bán tài sản dài hạn; CFF = vay/trả nợ, vốn góp, cổ tức.
> - $\\Delta\\text{Tiền} = \\text{CFO} + \\text{CFI} + \\text{CFF}$, rồi tiền cuối = tiền đầu + ΔTiền.
> - Mỗi đồng tiền vào đúng **một** nhóm — không đếm hai lần.

---

## 3. Phương pháp gián tiếp — dựng CFO từ lợi nhuận ròng

Có hai cách trình bày CFO: **trực tiếp** (liệt kê thẳng từng khoản thu/chi tiền) và **gián tiếp** (bắt đầu từ lợi nhuận ròng rồi *điều chỉnh ngược* về tiền). Thực tế **99% doanh nghiệp dùng gián tiếp** vì số liệu có sẵn từ báo cáo kết quả kinh doanh và bảng cân đối.

> 💡 **Trực giác.** Lợi nhuận ròng đã là "gần đúng" của tiền từ kinh doanh, nhưng bị "nhiễu" bởi hai loại sai lệch: **(1)** các chi phí *không tốn tiền* (khấu hao) đã trừ vào lãi → cộng lại; **(2)** các khoản dồn tích *chưa thu/chưa chi* (phải thu, tồn kho, phải trả thay đổi) → điều chỉnh cho khớp tiền. Gỡ hai loại nhiễu này khỏi lợi nhuận ròng, ta được CFO.

### 3.1 Công thức

$$\\text{CFO} = \\text{Lợi nhuận ròng} + \\text{Khấu hao} - \\Delta\\text{Phải thu} - \\Delta\\text{Tồn kho} + \\Delta\\text{Phải trả}$$

Trong đó $\\Delta X = X_{\\text{cuối kỳ}} - X_{\\text{đầu kỳ}}$ (số dương = *tăng* trong kỳ).

### 3.2 Vì sao mỗi dấu lại như vậy — giải thích từng khoản

**Khấu hao (cộng lại, dấu +).** Là chi phí *phi tiền mặt*: máy đã mua và trả tiền từ trước (nằm ở CFI năm mua), năm nay chỉ "phân bổ" giá trị vào chi phí. Nó đã **trừ** vào lợi nhuận ròng nhưng **không** làm tiền ra kỳ này → cộng ngược lại.

**Tăng phải thu (trừ, dấu −).** Phải thu tăng nghĩa là công ty đã ghi doanh thu (lãi tăng) nhưng **khách chưa trả tiền** → tiền bị "kẹt" ở khoản phải thu → trừ khỏi lãi.

**Tăng tồn kho (trừ, dấu −).** Đã chi tiền mua/sản xuất hàng nhưng hàng còn nằm kho, **chưa thành chi phí** (chưa bán) → tiền ra mà lãi chưa giảm → trừ.

**Tăng phải trả (cộng, dấu +).** Đã nhận hàng/dịch vụ (có thể đã tính chi phí) nhưng **chưa trả tiền nhà cung cấp** → công ty *giữ* được tiền → cộng vào.

> ❓ **Câu hỏi tự nhiên.** *"Thế nếu các khoản đó GIẢM thì sao?"*
> Đảo dấu tự động vì $\\Delta$ mang dấu âm:
> - Phải thu **giảm** 10 ($\\Delta = -10$): thu bớt được nợ cũ → $-\\Delta = +10$ tiền về. ✓
> - Tồn kho **giảm** 8 ($\\Delta = -8$): bán bớt hàng cũ, không phải mua thêm → $-\\Delta = +8$. ✓
> - Phải trả **giảm** 5 ($\\Delta = -5$): trả bớt nợ nhà cung cấp → $+\\Delta = -5$ tiền ra. ✓

### 3.3 Bốn ví dụ điều chỉnh (walk qua từng con số)

| Điều chỉnh | Δ trong kỳ | Vào công thức | Tác động CFO |
|-----------|:----------:|:-------------:|:-----------:|
| Khấu hao | +40 | $+40$ | **+40** |
| Phải thu tăng | +30 | $-\\Delta = -30$ | **−30** |
| Tồn kho tăng | +20 | $-\\Delta = -20$ | **−20** |
| Phải trả tăng | +15 | $+\\Delta = +15$ | **+15** |

Ròng bốn điều chỉnh: $+40 - 30 - 20 + 15 = +5$. Nghĩa là CFO **cao hơn** lợi nhuận ròng 5 đơn vị.

> ⚠ **Lỗi thường gặp.** Nhầm dấu vốn lưu động. Nhớ mẹo: **tài sản** (phải thu, tồn kho) **tăng → tiền giảm** (dấu −); **nợ** (phải trả) **tăng → tiền tăng** (dấu +). Tài sản "ngốn" tiền, nợ "sinh" tiền.

> 🔁 **Dừng lại tự kiểm tra.**
> Lợi nhuận ròng 60, khấu hao 20, phải thu tăng 25, tồn kho giảm 10, phải trả tăng 5. Tính CFO.
>
> <details><summary>Đáp án</summary>
>
> $\\text{CFO} = 60 + 20 - 25 - (-10) + 5 = 60 + 20 - 25 + 10 + 5 = \\mathbf{70}$.
> (Tồn kho giảm 10 → $-\\Delta = +10$ tiền về.)
> </details>

---

## 4. Walk-through số thật: từ lợi nhuận ròng đến ΔTiền

Một công ty trong một năm có các số liệu sau (đơn vị: triệu đồng):

- Lợi nhuận ròng = **100**, Khấu hao = **40**
- Phải thu **tăng 30**, Tồn kho **tăng 20**, Phải trả **tăng 15**
- Capex (mua tài sản cố định) = **80**
- Vay nợ mới = **60**, Trả nợ gốc = **20**, Cổ tức = **25**
- Tiền đầu kỳ = **50**

**Bước 1 — Dựng CFO (gián tiếp):**

| Bước | Khoản mục | Số tiền | CFO chạy dồn |
|------|-----------|--------:|-------------:|
| | Lợi nhuận ròng | +100 | 100 |
| + | Khấu hao (phi tiền mặt) | +40 | 140 |
| − | Tăng phải thu | −30 | 110 |
| − | Tăng tồn kho | −20 | 90 |
| + | Tăng phải trả | +15 | **105** |

$\\Rightarrow \\text{CFO} = 100 + 40 - 30 - 20 + 15 = \\mathbf{105}$.

**Bước 2 — CFI:** chỉ có capex.

$$\\text{CFI} = -80$$

**Bước 3 — CFF:** vay, trả nợ, cổ tức.

$$\\text{CFF} = +60 - 20 - 25 = +15$$

**Bước 4 — Ráp lại và đối chiếu:**

$$\\Delta\\text{Tiền} = \\text{CFO} + \\text{CFI} + \\text{CFF} = 105 + (-80) + 15 = \\mathbf{40}$$

$$\\text{Tiền cuối kỳ} = 50 + 40 = \\mathbf{90}$$

> ❓ **Câu hỏi tự nhiên.** *"Lợi nhuận ròng 100, sao tiền chỉ tăng 40?"* Vì: đầu tư 80 mua tài sản (CFI) và ròng vốn lưu động ngốn thêm tiền, chỉ được bù một phần bởi khấu hao và vay mới. Đây chính là bức tranh "lãi 100 nhưng tiền thực chỉ +40" mà báo cáo này giúp nhìn ra.

> 📝 **Tóm tắt mục 4.** Trình tự gián tiếp: **lợi nhuận ròng → +phi tiền mặt → ±vốn lưu động → CFO → +CFI → +CFF → ΔTiền → tiền cuối kỳ.** Mọi bước là cộng/trừ đơn giản, nhưng dấu phải đúng.

---

## 5. Bài tập

**Bài 1 (CFO gián tiếp).** Cho: lợi nhuận ròng 80, khấu hao 25, phải thu **tăng** 12, tồn kho **giảm** 8, phải trả **tăng** 6. Tính CFO.

**Bài 2 (báo cáo đầy đủ).** Cho các số (triệu đồng): lợi nhuận ròng 150, khấu hao 50, phải thu tăng 40, tồn kho tăng 10, phải trả **giảm** 5, capex 100, vay mới 0, trả nợ gốc 30, cổ tức 40, tiền đầu kỳ 70. Tính CFO, CFI, CFF, ΔTiền và **tiền cuối kỳ**. Kiểm tra hằng đẳng thức.

**Bài 3 (lãi ≠ tiền).** Công ty báo lợi nhuận ròng **200** nhưng cuối năm tiền lại **giảm**. Biết: khấu hao 0, phải thu **tăng 150** (bán chịu ồ ạt để đẩy doanh số), tồn kho và phải trả không đổi, capex 120, không vay/trả nợ, không cổ tức, tiền đầu kỳ 90. Tính ΔTiền và tiền cuối kỳ. Giải thích bằng lời vì sao "lãi to mà tiền cạn".

---

## 6. Lời giải chi tiết

**Bài 1.** Áp công thức, chú ý dấu:

$$\\text{CFO} = 80 + 25 - 12 - (-8) + 6 = 80 + 25 - 12 + 8 + 6 = \\mathbf{107}$$

Cách tiếp cận: tồn kho **giảm** 8 nghĩa là $\\Delta = -8$, vào công thức $-\\Delta\\text{Tồn kho} = -(-8) = +8$ (bán bớt hàng tồn, tiền về). Các khoản còn lại theo dấu chuẩn.

**Bài 2.** Dựng từng phần:

- **CFO** $= 150 + 50 - 40 - 10 + (-5) = 150 + 50 - 40 - 10 - 5 = \\mathbf{145}$.
  (Phải trả **giảm** 5 → $\\Delta = -5$ → $+\\Delta = -5$: đã trả bớt nợ nhà cung cấp, tiền ra.)
- **CFI** $= -100$ (capex).
- **CFF** $= 0 - 30 - 40 = \\mathbf{-70}$ (không vay mới, trả nợ 30, cổ tức 40).
- **ΔTiền** $= 145 + (-100) + (-70) = \\mathbf{-25}$.
- **Tiền cuối kỳ** $= 70 + (-25) = \\mathbf{45}$.

Kiểm tra hằng đẳng thức: $\\text{CFO} + \\text{CFI} + \\text{CFF} = 145 - 100 - 70 = -25 = \\Delta\\text{Tiền}$ ✓. Tiền đi từ 70 xuống 45 dù CFO dương mạnh (145) — bị "nuốt" bởi đầu tư 100 và hoàn vốn 70.

**Bài 3.** Tính:

- **CFO** $= 200 + 0 - 150 - 0 + 0 = \\mathbf{50}$ (phải thu tăng 150 trừ gần hết lãi).
- **CFI** $= -120$ (capex).
- **CFF** $= 0$.
- **ΔTiền** $= 50 - 120 + 0 = \\mathbf{-70}$.
- **Tiền cuối kỳ** $= 90 + (-70) = \\mathbf{20}$.

**Giải thích bằng lời:** Công ty "lãi" 200 nhưng phần lớn nằm ở **khoản phải thu** — khách nợ 150 chưa trả, nên chỉ 50 thành tiền thật từ kinh doanh. Cùng lúc chi 120 mua tài sản. Kết quả tiền **giảm 70**, xuống còn 20. Đây là mô hình "growing broke" kinh điển: đẩy doanh số bằng bán chịu + đầu tư mạnh → sổ sách đẹp nhưng két gần cạn. Báo cáo lưu chuyển tiền tệ phơi bày điều mà báo cáo kết quả kinh doanh (Lesson 06) che giấu.

> 📝 **Tóm tắt bài học.**
> - Lãi ≠ tiền vì kế toán dồn tích ghi nhận theo *thời điểm phát sinh*, không phải *thời điểm thu/chi*.
> - Ba dòng tiền: **CFO** (kinh doanh cốt lõi), **CFI** (mua/bán tài sản dài hạn), **CFF** (vay/trả nợ, vốn góp, cổ tức).
> - Phương pháp gián tiếp: $\\text{CFO} = \\text{LN ròng} + \\text{Khấu hao} - \\Delta\\text{Phải thu} - \\Delta\\text{Tồn kho} + \\Delta\\text{Phải trả}$.
> - Mẹo dấu: tài sản tăng → tiền giảm; nợ tăng → tiền tăng.
> - $\\Delta\\text{Tiền} = \\text{CFO} + \\text{CFI} + \\text{CFF}$; tiền cuối = tiền đầu + ΔTiền.

---

## Bài tiếp theo

**Lesson 08 — Mô hình 3 báo cáo (three-statement model)**: ráp báo cáo kết quả kinh doanh, bảng cân đối và lưu chuyển tiền tệ thành một cỗ máy liên kết — lợi nhuận ròng chảy vào vốn chủ và mở đầu CFO, tiền cuối kỳ khớp bảng cân đối. Xem [Lesson 08](../lesson-08-three-statement-model/).

Minh họa tương tác: [visualization.html](./visualization.html) — nhập từng số, xem CFO/CFI/CFF, biểu đồ waterfall và ΔTiền cập nhật theo thời gian thực.
`;
