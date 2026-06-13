# Lesson 04 — Rủi ro & Lợi nhuận (Risk & Return)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **lợi nhuận kỳ vọng (expected return)** và lợi nhuận **thực tế** từng năm.
- Đo **rủi ro bằng độ lệch chuẩn (standard deviation / volatility)** của lợi nhuận.
- Tính trung bình và độ lệch chuẩn của một chuỗi lợi nhuận.
- Hiểu **phân phối lợi nhuận** và quy tắc 68–95–99,7 áp cho đầu tư.
- Dùng **tỷ số Sharpe** để so sánh lợi nhuận **đã điều chỉnh rủi ro**.

## Kiến thức tiền đề

- [Lesson 01 — đánh đổi rủi ro–lợi nhuận](../lesson-01-asset-classes/).
- Trung bình, phương sai, độ lệch chuẩn, phân phối chuẩn: [`../../../Statistics/index.html`](../../../Statistics/index.html).

---

## 1. Lợi nhuận kỳ vọng vs thực tế

> 💡 **Trực giác / Hình dung.** "Cổ phiếu lời 9%/năm" không có nghĩa mỗi năm đúng 9%. Đó là **trung bình dài hạn** — thực tế có năm +30%, có năm −20%. 9% là **kỳ vọng**; các con số nhảy nhót quanh nó là **rủi ro**. Đầu tư là sống chung với khoảng cách giữa "trung bình mong đợi" và "thực tế từng năm".

**Định nghĩa — Lợi nhuận kỳ vọng:**

- **(a) Là gì** — trung bình của các lợi nhuận có thể xảy ra, có trọng số theo xác suất (hoặc trung bình lịch sử).
- **(b) Vì sao cần** — để có một con số đại diện cho "lợi nhuận trung tâm", làm điểm tựa so sánh.
- **(c) Công thức & ví dụ** — chuỗi lợi nhuận 5 năm: +20%, −10%, +15%, +5%, +10%:

$$\bar{R} = \frac{20 - 10 + 15 + 5 + 10}{5} = \frac{40}{5} = 8\%$$

> ⚠ **Lỗi thường gặp.** Nhầm "lợi nhuận trung bình cộng" với "lợi nhuận kép thực tế (CAGR)". Trung bình cộng > CAGR khi có biến động. Vd +50% rồi −50%: trung bình cộng = 0%, nhưng thực tế $1{,}5 \times 0{,}5 = 0{,}75$ → **mất 25%**. Biến động "ăn" lợi nhuận kép.

> 🔁 **Dừng lại tự kiểm tra.** Lợi nhuận 3 năm: +10%, −5%, +25%. Lợi nhuận trung bình (cộng) là bao nhiêu?
> <details><summary>Đáp án</summary>$(10 - 5 + 25)/3 = 30/3 = 10\%$.</details>

---

## 2. Rủi ro = Độ lệch chuẩn (Volatility)

> 💡 **Trực giác / Hình dung.** Hai khoản đầu tư cùng lợi nhuận trung bình 8%, nhưng một cái dao động nhẹ (6%→10%), cái kia điên loạn (−20%→+36%). Cái thứ hai **rủi ro hơn** dù cùng trung bình. **Độ lệch chuẩn** đo chính cái "dao động quanh trung bình" này — càng lớn càng bất định.

**Định nghĩa — Độ lệch chuẩn của lợi nhuận (volatility):**

- **(a) Là gì** — căn bậc hai của trung bình bình phương độ lệch khỏi trung bình; đo mức phân tán của lợi nhuận.
- **(b) Vì sao cần** — biến lợi nhuận "nhảy nhót" thành một con số rủi ro so sánh được; là thước đo rủi ro chuẩn trong tài chính.
- **(c) Công thức:**

$$\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(R_i - \bar{R})^2}$$

**Walk-through bằng số thật (verify) — chuỗi +20%, −10%, +15%, +5%, +10%, $\bar{R} = 8\%$:**

| $R_i$ | $R_i - \bar{R}$ | $(R_i - \bar{R})^2$ |
|---|---|---|
| 20 | +12 | 144 |
| −10 | −18 | 324 |
| 15 | +7 | 49 |
| 5 | −3 | 9 |
| 10 | +2 | 4 |
| | | **Σ = 530** |

$$\sigma = \sqrt{530/5} = \sqrt{106} = 10{,}3\%$$

→ Lợi nhuận 8% ± 10,3%. Độ lệch chuẩn lớn hơn cả trung bình → khoản này khá biến động (có năm âm là bình thường).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao bình phương rồi căn, không lấy trung bình độ lệch?"* — Vì độ lệch dương/âm sẽ triệt tiêu (trung bình độ lệch luôn = 0). Bình phương làm mọi lệch thành dương, phạt nặng các cú lệch lớn; căn bậc hai đưa về cùng đơn vị (%).
> - *"σ cao luôn xấu?"* — σ cao = bất định cao, gồm cả khả năng lời lớn lẫn lỗ lớn. Với nhà đầu tư ngại rủi ro, σ cao là xấu nếu không bù bằng lợi nhuận kỳ vọng cao hơn (xem Sharpe, mục 4).

> ⚠ **Lỗi thường gặp.** Chỉ nhìn lợi nhuận trung bình mà bỏ qua σ. Hai quỹ cùng "trung bình 8%" nhưng σ rất khác → trải nghiệm và rủi ro phá sản khác hẳn.

> 🔁 **Dừng lại tự kiểm tra.** Hai cổ phiếu cùng trung bình 10%. A có σ=5%, B có σ=25%. Cái nào rủi ro hơn? Năm tới cái nào dễ có kết quả âm hơn?
> <details><summary>Đáp án</summary>B rủi ro hơn (σ lớn gấp 5 lần). B dễ có năm âm hơn vì dao động rộng quanh 10% (có thể xuống dưới 0 dễ hơn).</details>

---

## 3. Phân phối lợi nhuận & quy tắc 68–95–99,7

> 💡 **Trực giác.** Nếu lợi nhuận xấp xỉ **phân phối chuẩn (normal)**, ta dự đoán được "khoảng dao động": phần lớn các năm rơi gần trung bình, năm cực đoan hiếm hơn. Quy tắc 68–95–99,7 cho biết bao nhiêu % thời gian lợi nhuận nằm trong 1σ, 2σ, 3σ quanh trung bình.

**Áp dụng — trung bình 8%, σ = 10%:**

| Khoảng | Phạm vi lợi nhuận | Xác suất |
|---|---|---|
| ±1σ | −2% đến 18% | ~68% các năm |
| ±2σ | −12% đến 28% | ~95% các năm |
| ±3σ | −22% đến 38% | ~99,7% các năm |

→ Khoảng 16% số năm (một nửa của 32% ngoài ±1σ) lợi nhuận **dưới −2%**; ~2,5% số năm dưới −12%. Hiểu điều này giúp không hoảng loạn khi gặp năm xấu "trong dự kiến thống kê".

> ❓ **Câu hỏi tự nhiên.** *"Lợi nhuận thật có đúng phân phối chuẩn không?"* — Gần đúng nhưng **không hoàn hảo**: thị trường thật có "đuôi béo" (fat tails) — các cú sụp đổ cực đoan xảy ra **thường hơn** mô hình chuẩn dự đoán (khủng hoảng 2008, 2020). Đây là giới hạn quan trọng, học kỹ ở Tầng 3.

> ⚠ **Lỗi thường gặp (toy model).** Dùng phân phối chuẩn rồi tin "sụp đổ −40% là không thể (ngoài 3σ)". Thực tế các biến cố "không thể" này xảy ra vài lần mỗi thế hệ. Mô hình chuẩn là điểm khởi đầu, không phải sự thật tuyệt đối.

---

## 4. Tỷ số Sharpe — lợi nhuận điều chỉnh rủi ro

> 💡 **Trực giác / Hình dung.** Lời 15% với σ=30% có "giỏi" hơn lời 10% với σ=10% không? Không rõ — phải xét **mỗi đơn vị rủi ro mang lại bao nhiêu lợi nhuận vượt trội**. Tỷ số Sharpe chính là "lợi nhuận vượt trội trên mỗi đơn vị rủi ro" — càng cao càng hiệu quả.

> 📐 **Công thức Sharpe:**
>
> $$\text{Sharpe} = \frac{\bar{R} - R_f}{\sigma}$$
>
> với $R_f$ = lãi suất phi rủi ro (vd trái phiếu chính phủ).

**Walk-through bằng số thật (verify), $R_f = 3\%$:**

- Quỹ A: $\bar{R} = 10\%$, σ = 10% → Sharpe $= (10-3)/10 = 0{,}70$.
- Quỹ B: $\bar{R} = 15\%$, σ = 30% → Sharpe $= (15-3)/30 = 0{,}40$.

→ Dù B lời cao hơn (15% > 10%), **A hiệu quả hơn** (Sharpe 0,70 > 0,40): A cho 0,70 đơn vị lợi nhuận vượt trội mỗi đơn vị rủi ro, B chỉ 0,40. "Lời nhiều" không bằng "lời nhiều so với rủi ro gánh".

**4 ví dụ số ($R_f = 3\%$):**

| Quỹ | $\bar{R}$ | σ | Sharpe |
|---|---|---|---|
| A | 10% | 10% | 0,70 |
| B | 15% | 30% | 0,40 |
| C | 6% | 4% | 0,75 |
| D | 20% | 50% | 0,34 |

→ Quỹ C lời thấp nhất (6%) nhưng Sharpe cao nhất (0,75) — hiệu quả nhất theo rủi ro. Quỹ D lời cao nhất nhưng tệ nhất.

> 📝 **Tóm tắt toàn bài.**
> - **Lợi nhuận kỳ vọng** = trung bình; thực tế nhảy quanh nó. Trung bình cộng > lợi nhuận kép khi biến động (vol drag).
> - **Rủi ro = độ lệch chuẩn** $\sigma = \sqrt{\frac{1}{N}\sum(R_i-\bar R)^2}$ — đo dao động quanh trung bình.
> - **Phân phối** ~ chuẩn (68–95–99,7), nhưng thực tế có **đuôi béo** — sụp đổ cực đoan thường hơn dự đoán.
> - **Sharpe** = $(\bar R - R_f)/\sigma$ — lợi nhuận vượt trội/đơn vị rủi ro; cao = hiệu quả. "Lời nhiều" ≠ "hiệu quả".

---

## Bài tập

1. **Trung bình.** Lợi nhuận 4 năm: +12%, +8%, −4%, +16%. Tính lợi nhuận trung bình.

2. **Vol drag.** Năm 1 +40%, năm 2 −30%. Tính trung bình cộng và lợi nhuận kép thực tế. So sánh.

3. **Độ lệch chuẩn.** Chuỗi: +10%, +6%, +14%, +2%, +8% (trung bình 8%). Tính σ.

4. **Quy tắc 68%.** Quỹ trung bình 9%, σ=12%. Khoảng ±1σ là gì? ~bao nhiêu % số năm rơi ngoài khoảng này về phía âm?

5. **Sharpe.** $R_f = 2\%$. Quỹ X: 12%, σ=16%. Quỹ Y: 8%, σ=8%. Tính Sharpe mỗi quỹ, chọn quỹ hiệu quả hơn.

---

## Lời giải chi tiết

### Bài 1 — Trung bình

$$\bar{R} = \frac{12 + 8 - 4 + 16}{4} = \frac{32}{4} = 8\%$$

### Bài 2 — Vol drag

- Trung bình cộng $= (40 - 30)/2 = 5\%$.
- Lợi nhuận kép thực tế: $1{,}40 \times 0{,}70 = 0{,}98 \to -2\%$ (mất 2%).
- → Trung bình cộng (+5%) **dương** nhưng thực tế **âm** (−2%). Biến động lớn làm lợi nhuận kép thấp hơn nhiều trung bình cộng — đây là "lực cản biến động (volatility drag)".

### Bài 3 — Độ lệch chuẩn

Độ lệch khỏi 8%: +2, −2, +6, −6, 0 → bình phương: 4, 4, 36, 36, 0 → Σ = 80.

$$\sigma = \sqrt{80/5} = \sqrt{16} = 4\%$$

### Bài 4 — Quy tắc 68%

- ±1σ: $9\% \pm 12\%$ = **−3% đến 21%** (~68% số năm rơi trong khoảng này).
- Ngoài khoảng = 32%, chia đôi → **~16% số năm** lợi nhuận dưới −3%.

### Bài 5 — Sharpe

- X: $(12 - 2)/16 = 10/16 = 0{,}625$.
- Y: $(8 - 2)/8 = 6/8 = 0{,}75$.
- → **Y hiệu quả hơn** (0,75 > 0,625), dù X lời cao hơn (12% > 8%). Y cho nhiều lợi nhuận vượt trội hơn trên mỗi đơn vị rủi ro.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính trung bình & độ lệch chuẩn**: nhập chuỗi lợi nhuận → trung bình, σ, và lợi nhuận kép thực tế (thấy vol drag).
  - **Mô phỏng phân phối lợi nhuận**: kéo trung bình & σ → đường chuông + vùng 68/95/99,7, đánh dấu xác suất năm âm.
  - **So sánh Sharpe**: nhập nhiều quỹ (lợi nhuận, σ) → xếp hạng theo Sharpe, cho thấy "lời nhiều" ≠ "hiệu quả".

---

## Bài tiếp theo

→ [Lesson 05 — Đa dạng hóa & danh mục](../lesson-05-diversification/): vì sao trộn các tài sản **ít tương quan** lại giảm rủi ro mà không hy sinh nhiều lợi nhuận — "bữa trưa miễn phí" duy nhất trong đầu tư, và biên hiệu quả Markowitz.

**Tham khảo chéo:** độ lệch chuẩn & phân phối chuẩn [`../../../Statistics/index.html`](../../../Statistics/index.html) · đánh đổi rủi ro–lợi nhuận [`../lesson-01-asset-classes/`](../lesson-01-asset-classes/).
