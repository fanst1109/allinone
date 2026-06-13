# Lesson 06 — Mục tiêu & Tiết kiệm (Goals & Saving)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đặt **mục tiêu tài chính SMART** và quy chúng thành con số cụ thể (cần bao nhiêu, trong bao lâu).
- Tính **khoản đóng định kỳ cần thiết** để đạt một mục tiêu (đảo ngược công thức annuity ở Lesson 01).
- Hiểu **bình quân giá (dollar-cost averaging, DCA)** và vì sao đóng đều bất kể thị trường lên xuống lại hiệu quả.
- So sánh **đầu tư một lần (lump sum) vs đóng dần (DCA)**.
- Thấy bằng số vì sao **bắt đầu sớm** quan trọng hơn cả đóng nhiều.

## Kiến thức tiền đề

- [Lesson 01 — annuity & lãi kép](../lesson-01-time-value-money/): $FV_{\text{annuity}} = PMT\frac{(1+r)^n-1}{r}$.
- [Lesson 05 — tỷ lệ tiết kiệm](../lesson-05-budgeting/): có dòng tiền dương mới đóng đều được.

---

## 1. Mục tiêu tài chính SMART

> 💡 **Trực giác / Hình dung.** "Tôi muốn giàu" không phải mục tiêu — nó như nói "tôi muốn đi đâu đó". Mục tiêu hữu ích phải có **đích đến cụ thể + thời hạn**: "tích đủ 300 triệu trả trước mua nhà trong 5 năm". Khi đó mới tính ngược ra mỗi tháng cần để dành bao nhiêu.

**Định nghĩa — Mục tiêu SMART:**

- **(a) Là gì** — mục tiêu **S**pecific (cụ thể), **M**easurable (đo được), **A**chievable (khả thi), **R**elevant (phù hợp), **T**ime-bound (có thời hạn).
- **(b) Vì sao cần** — chỉ khi có số tiền đích + thời hạn, ta mới biến mong muốn thành kế hoạch đóng góp đo được hằng tháng.
- **(c) Ví dụ** — "Tích 300 triệu trong 5 năm để trả trước mua nhà" (cụ thể, đo được, có hạn) thay vì "để dành mua nhà" (mơ hồ).

> ⚠ **Lỗi thường gặp.** Đặt mục tiêu không có thời hạn hoặc số tiền → không bao giờ biết mình đang đi đúng tiến độ hay không.

---

## 2. Tính khoản đóng định kỳ cần thiết

> 💡 **Trực giác.** Lesson 01 cho công thức: đóng $PMT$ mỗi kỳ thì cuối kỳ có $FV$. Giờ ta đi **ngược**: biết muốn có $FV$ (mục tiêu) trong $n$ kỳ với lãi $r$, cần đóng $PMT$ bao nhiêu mỗi kỳ?

**Công thức (đảo ngược FV annuity):**

$$PMT = FV \cdot \frac{r}{(1 + r)^n - 1}$$

**Walk-through bằng số thật (verify) — mục tiêu 300 triệu, 5 năm = 60 tháng, lãi 0,5%/tháng (~6%/năm):**

$$PMT = 300 \cdot \frac{0{,}005}{1{,}005^{60} - 1} = 300 \cdot \frac{0{,}005}{1{,}3489 - 1} = 300 \cdot \frac{0{,}005}{0{,}34885} = 4{,}30 \text{ triệu/tháng}$$

Kiểm chứng ngược: đóng 4,30 tr/tháng, $FV = 4{,}30 \cdot \frac{1{,}005^{60}-1}{0{,}005} = 4{,}30 \cdot 69{,}77 = 300$ triệu ✓.

**4 ví dụ số (mục tiêu 300 triệu, lãi 6%/năm ghép tháng):**

| Số năm | Số kỳ | PMT cần/tháng | Tổng đóng | Phần lãi đóng góp |
|---|---|---|---|---|
| 3 | 36 | 7,62 tr | 274 tr | 26 tr |
| 5 | 60 | 4,30 tr | 258 tr | 42 tr |
| 10 | 120 | 1,83 tr | 220 tr | 80 tr |
| 15 | 180 | 1,03 tr | 186 tr | 114 tr |

→ Càng nhiều thời gian, khoản đóng/tháng càng nhẹ VÀ phần lãi kép gánh hộ càng lớn (15 năm: lãi đóng góp 114/300 = 38% mục tiêu).

> ❓ **Câu hỏi tự nhiên.** *"Vì sao kéo dài thời gian lại nhẹ gánh đến vậy?"* — Hai lý do cộng hưởng: (1) chia mục tiêu cho nhiều kỳ hơn, (2) lãi kép có thêm thời gian sinh lời. Đây là lý do "bắt đầu sớm" mạnh hơn "đóng nhiều" (mục 4).

> 🔁 **Dừng lại tự kiểm tra.** Mục tiêu 120 triệu trong 4 năm (48 tháng), lãi 0,5%/tháng. Ước lượng PMT? (Gợi ý: dùng công thức.)
> <details><summary>Đáp án</summary>$PMT = 120 \cdot \frac{0{,}005}{1{,}005^{48}-1} = 120 \cdot \frac{0{,}005}{0{,}2705} = 2{,}22$ triệu/tháng.</details>

---

## 3. Bình quân giá (Dollar-Cost Averaging — DCA)

> 💡 **Trực giác / Hình dung.** Bạn đóng **một số tiền cố định** mỗi tháng để mua một tài sản có giá lên xuống (vd chứng chỉ quỹ). Khi giá **rẻ**, cùng số tiền đó mua được **nhiều** đơn vị; khi giá **đắt**, mua được **ít**. Kết quả: bạn tự động mua nhiều lúc rẻ, ít lúc đắt → **giá vốn trung bình thấp hơn giá trung bình** của thị trường. Không cần đoán đỉnh đáy.

**Định nghĩa — DCA:**

- **(a) Là gì** — chiến lược đầu tư một khoản tiền **cố định** đều đặn theo lịch, bất kể giá hiện tại.
- **(b) Vì sao hiệu quả** — loại bỏ việc "căn thời điểm" (market timing) vốn rất khó; tự động mua nhiều khi rẻ nhờ cơ chế số học của trung bình điều hòa (harmonic mean).
- **(c) Walk-through bằng số thật (verify):** đóng **6 triệu/tháng** trong 4 tháng, giá đơn vị quỹ thay đổi:

| Tháng | Giá/đơn vị | Tiền đóng | Số đơn vị mua $= 6/\text{giá}$ |
|---|---|---|---|
| 1 | 30.000đ | 6 tr | 200,0 |
| 2 | 20.000đ | 6 tr | 300,0 |
| 3 | 25.000đ | 6 tr | 240,0 |
| 4 | 40.000đ | 6 tr | 150,0 |
| **Tổng** | | **24 tr** | **890,0** |

- **Giá trung bình (của thị trường)** $= (30+20+25+40)/4 = 28{,}75$ nghìn/đơn vị.
- **Giá vốn trung bình của bạn** $= 24{.}000{.}000 / 890 = 26{.}966$đ $\approx 26{,}97$ nghìn/đơn vị.

→ Giá vốn của bạn (26,97k) **thấp hơn** giá trung bình thị trường (28,75k) — chỉ nhờ đóng đều, không cần đoán gì. Đó là "phần thưởng số học" của DCA.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao giá vốn lại thấp hơn giá trung bình?"* — Vì khi giá rẻ bạn mua **nhiều đơn vị hơn**, nên các tháng giá rẻ "nặng ký" hơn trong trung bình. Toán học: trung bình điều hòa ≤ trung bình cộng.
> - *"DCA có luôn thắng không?"* — Không đảm bảo lời (nếu tài sản giảm dài hạn vẫn lỗ). Nó **giảm rủi ro căn sai thời điểm** và kỷ luật hóa việc đầu tư, không phải phép màu sinh lời.

> ⚠ **Lỗi thường gặp.** Cố "chờ giá xuống mới mua". Đa số nhà đầu tư cá nhân căn thời điểm **sai**, bỏ lỡ những ngày tăng mạnh. DCA tránh cái bẫy đó bằng kỷ luật.

> 🔁 **Dừng lại tự kiểm tra.** Đóng 10 triệu/tháng, 2 tháng: giá 50k rồi 25k. Tổng đơn vị? Giá vốn trung bình?
> <details><summary>Đáp án</summary>Tháng 1: $10tr/50k = 200$ đơn vị; tháng 2: $10tr/25k = 400$ đơn vị; tổng 600 đơn vị / 20 triệu = 33.333đ giá vốn. (So với giá trung bình $(50+25)/2 = 37{,}5$k → DCA thấp hơn.)</details>

---

## 4. Bắt đầu sớm > đóng nhiều

> 💡 **Trực giác.** Lãi kép thưởng cho **thời gian** nhiều hơn cho **số tiền**. Người bắt đầu sớm dù đóng ít thường vượt người bắt đầu muộn dù đóng nhiều — vì những đồng đóng sớm có thêm hàng chục năm sinh lãi.

**Walk-through bằng số thật (verify) — lãi 8%/năm:**

- **An** đóng 3 triệu/năm từ tuổi 25 đến 35 (10 năm, tổng 30 triệu) rồi **dừng**, để yên tới 65 tuổi.
- **Bình** bắt đầu muộn: đóng 3 triệu/năm từ 35 đến 65 (30 năm, tổng 90 triệu).

Tại tuổi 65:
- **An:** 30 triệu đóng trong 10 năm đầu, rồi 30 năm tăng trưởng kép → giá trị cuối ≈ **472 triệu**.
- **Bình:** 90 triệu đóng đều 30 năm → giá trị cuối ≈ **367 triệu**.

→ An đóng **ít hơn 3 lần** (30 vs 90 triệu) nhưng cuối cùng **nhiều hơn** Bình (~472 vs ~367 triệu), chỉ vì bắt đầu sớm 10 năm. Thời gian là đồng minh mạnh nhất của lãi kép.

> 📝 **Tóm tắt toàn bài.**
> - **Mục tiêu SMART**: cụ thể + thời hạn → tính ngược ra khoản đóng/tháng.
> - **PMT cần** $= FV \cdot \frac{r}{(1+r)^n - 1}$; kéo dài thời gian giảm gánh nặng phi tuyến.
> - **DCA**: đóng cố định đều → mua nhiều lúc rẻ, giá vốn < giá trung bình; bỏ qua việc căn thời điểm.
> - **Bắt đầu sớm** thắng đóng nhiều: thời gian là đòn bẩy mạnh nhất của lãi kép.

---

## Bài tập

1. **PMT cần.** Mục tiêu 500 triệu trong 10 năm (120 tháng), lãi 0,5%/tháng. Tính khoản đóng/tháng.

2. **Đổi thời hạn.** Cùng mục tiêu 500 triệu, lãi 0,5%/tháng, nhưng 20 năm (240 tháng). PMT mới? So với bài 1.

3. **DCA — giá vốn.** Đóng 5 triệu/tháng, 3 tháng, giá: 50k, 40k, 25k. Tính tổng đơn vị, giá vốn trung bình, so với giá trung bình thị trường.

4. **DCA vs một lần.** Bạn có 15 triệu. So sánh: (a) mua hết tháng 1 ở giá 50k; (b) DCA 5 triệu/tháng ×3 ở giá 50k/40k/25k. Cách nào nhiều đơn vị hơn?

5. **Bắt đầu sớm.** Lãi 8%/năm. Đóng 5 triệu/năm trong 10 năm rồi dừng, để yên 20 năm nữa. Giá trị cuối? (Gợi ý: FV annuity 10 năm rồi nhân $(1{,}08)^{20}$.)

---

## Lời giải chi tiết

### Bài 1 — PMT cần

$$PMT = 500 \cdot \frac{0{,}005}{1{,}005^{120} - 1} = 500 \cdot \frac{0{,}005}{1{,}8194 - 1} = 500 \cdot \frac{0{,}005}{0{,}81940} = 3{,}05 \text{ triệu/tháng}$$

### Bài 2 — Đổi thời hạn

$$PMT = 500 \cdot \frac{0{,}005}{1{,}005^{240} - 1} = 500 \cdot \frac{0{,}005}{3{,}3102 - 1} = 500 \cdot \frac{0{,}005}{2{,}31020} = 1{,}08 \text{ triệu/tháng}$$

So bài 1: gấp đôi thời hạn (10→20 năm) làm khoản đóng giảm từ 3,05 xuống 1,08 triệu — giảm **gần 3 lần**, không phải 2, vì lãi kép gánh thêm phần lớn. Tổng đóng: bài 1 = 366 tr, bài 2 = 259 tr (đóng ít tổng hơn dù mục tiêu như nhau).

### Bài 3 — DCA giá vốn

- Đơn vị: $5/50 = 0{,}1$ tr→ thực ra theo nghìn: tháng 1 $5.000.000/50.000 = 100$; tháng 2 $5.000.000/40.000 = 125$; tháng 3 $5.000.000/25.000 = 200$. Tổng $= 425$ đơn vị.
- Giá vốn $= 15.000.000 / 425 = 35.294$đ $\approx 35{,}3$k.
- Giá trung bình thị trường $= (50+40+25)/3 = 38{,}3$k.
- → Giá vốn (35,3k) < giá trung bình (38,3k) ✓ — phần thưởng DCA.

### Bài 4 — DCA vs một lần

- **(a) Một lần** ở 50k: $15.000.000/50.000 = 300$ đơn vị.
- **(b) DCA** (từ bài 3): 425 đơn vị.
- → DCA cho nhiều hơn (425 > 300) **trong kịch bản giá giảm** này, vì mua được nhiều lúc giá rẻ. (Lưu ý: nếu giá **tăng** đều thì mua một lần sớm lại lợi hơn — DCA không phải luôn thắng, nó giảm rủi ro căn sai thời điểm.)

### Bài 5 — Bắt đầu sớm

- FV sau 10 năm đóng: $5 \cdot \frac{1{,}08^{10} - 1}{0{,}08} = 5 \cdot \frac{2{,}1589 - 1}{0{,}08} = 5 \cdot 14{,}487 = 72{,}43$ triệu.
- Để yên 20 năm: $72{,}43 \times 1{,}08^{20} = 72{,}43 \times 4{,}661 = 337{,}6$ triệu.

Cách tiếp cận: chỉ đóng tổng 50 triệu trong 10 năm đầu, nhưng nhờ 20 năm tăng trưởng kép sau đó, thành ~338 triệu — gấp gần 7 lần số tiền bỏ ra. Minh chứng "bắt đầu sớm".

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính khoản đóng theo mục tiêu**: nhập mục tiêu + thời hạn + lãi → PMT cần/tháng, tách phần gốc đóng vs lãi kép.
  - **Mô phỏng DCA**: nhập giá từng kỳ (chỉnh được) + khoản đóng cố định → giá vốn trung bình vs giá trung bình thị trường, minh họa mua nhiều lúc rẻ.
  - **Bắt đầu sớm vs muộn**: so hai người đóng cùng số tiền nhưng thời điểm khác nhau → đường tăng trưởng kép tách biệt.

---

## Bài tiếp theo

→ [Lesson 07 — Rủi ro & bảo hiểm](../lesson-07-risk-insurance/): vì sao gộp rủi ro (pooling) hoạt động, cách bảo hiểm định giá, và khi nào nên mua bảo hiểm thay vì tự gánh.

**Tham khảo chéo:** annuity & lãi kép [`../lesson-01-time-value-money/`](../lesson-01-time-value-money/) · tỷ lệ tiết kiệm [`../lesson-05-budgeting/`](../lesson-05-budgeting/).
