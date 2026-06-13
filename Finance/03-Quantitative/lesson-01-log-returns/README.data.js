// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/03-Quantitative/lesson-01-log-returns/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Lợi nhuận log & Bước ngẫu nhiên (Log Returns & Random Walk)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **lợi nhuận đơn giản (simple return)** và **lợi nhuận log (log return)**.
- Hiểu vì sao dân định lượng thích log return (cộng dồn được, đối xứng).
- Hiểu mô hình **bước ngẫu nhiên (random walk)** của giá tài sản.
- Nắm trực giác **chuyển động Brown hình học (GBM)** — mô hình giá kinh điển.
- Hiểu **độ biến động co giãn theo căn thời gian** ($\\sigma_T = \\sigma\\sqrt{T}$).

## Kiến thức tiền đề

- [Tầng 2 — Rủi ro & lợi nhuận](../../02-Investing/lesson-04-risk-return/): độ lệch chuẩn, lợi nhuận.
- [Tầng 2 — EMH & random walk](../../02-Investing/lesson-07-efficient-markets/): giá khó dự đoán.
- Logarit tự nhiên: [\`../../../Math/index.html\`](../../../Math/index.html).

---

## 1. Lợi nhuận đơn giản vs lợi nhuận log

> 💡 **Trực giác / Hình dung.** Giá đi từ 100 lên 110. "Lời 10%" — đó là **lợi nhuận đơn giản**. Nhưng có một cách đo khác, dùng logarit: $\\ln(110/100) = \\ln(1{,}1) = 9{,}53\\%$ — **lợi nhuận log**. Với thay đổi nhỏ hai con số gần bằng nhau; điểm hay của log là nó **cộng dồn được** qua nhiều kỳ và **đối xứng** lên/xuống.

**Định nghĩa:**

- **Lợi nhuận đơn giản:** $R = \\dfrac{P_t - P_{t-1}}{P_{t-1}} = \\dfrac{P_t}{P_{t-1}} - 1$.
- **Lợi nhuận log:** $r = \\ln\\dfrac{P_t}{P_{t-1}} = \\ln(1 + R)$.

**Walk-through bằng số thật (verify) — giá 100 → 110 → 99:**

| Bước | Giá | Simple $R$ | Log $r = \\ln(1+R)$ |
|---|---|---|---|
| 1 | 100→110 | $+10{,}00\\%$ | $\\ln 1{,}10 = +9{,}53\\%$ |
| 2 | 110→99 | $-10{,}00\\%$ | $\\ln 0{,}90 = -10{,}54\\%$ |

**Tính chất cộng dồn (verify):** tổng hai log return $= 9{,}53\\% + (-10{,}54\\%) = -1{,}01\\%$. Kiểm tra: tổng cộng giá đi 100→99 = $\\ln(99/100) = \\ln 0{,}99 = -1{,}01\\%$ ✓. **Log return cộng được**; simple return thì không ($+10\\%$ rồi $-10\\%$ ≠ $0\\%$ mà là $1{,}1 \\times 0{,}9 = 0{,}99 = -1\\%$).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao log return đối xứng?"* — Tăng rồi giảm cùng tỷ lệ log thì về đúng giá cũ: $+x$ rồi $-x$ (log) → $\\ln$ tổng = 0. Với simple return, +50% rồi −50% không về chốn cũ (thành −25%) — bất đối xứng.
> - *"Khi nào hai loại gần bằng nhau?"* — Khi thay đổi nhỏ ($\\ln(1+R) \\approx R$ với $R$ nhỏ). 1% simple ≈ 0,995% log. Chênh lớn dần khi biến động lớn.

> ⚠ **Lỗi thường gặp.** Cộng các lợi nhuận **đơn giản** qua nhiều kỳ để ra tổng. Sai — phải nhân $(1+R_1)(1+R_2)...$ rồi trừ 1, hoặc dùng log return (cộng được). Cộng simple return chỉ gần đúng khi mỗi kỳ rất nhỏ.

> 🔁 **Dừng lại tự kiểm tra.** Giá 50 → 60. Tính simple return và log return.
> <details><summary>Đáp án</summary>Simple $= 60/50 - 1 = 20\\%$. Log $= \\ln(60/50) = \\ln 1{,}2 = 18{,}23\\%$.</details>

---

## 2. Bước ngẫu nhiên — mô hình giá

> 💡 **Trực giác / Hình dung.** Theo EMH (Tầng 2 Lesson 07), tin tức đã nằm trong giá; biến động tương lai là **cú sốc ngẫu nhiên chưa biết**. Vậy giá đi như một người say bước loạng choạng: mỗi bước thêm một cú sốc ngẫu nhiên, không nhớ hướng trước. Đó là **bước ngẫu nhiên (random walk)**.

**Định nghĩa — Random walk (của log giá):**

- **(a) Là gì** — mô hình trong đó log giá mỗi kỳ = log giá kỳ trước + một cú sốc ngẫu nhiên độc lập: $\\ln P_t = \\ln P_{t-1} + \\mu + \\sigma \\varepsilon_t$, với $\\varepsilon_t$ ngẫu nhiên chuẩn.
- **(b) Vì sao dùng** — phản ánh EMH (không dự đoán được hướng) và đảm bảo giá **không âm** (vì làm việc trên log).
- **(c) Hai thành phần:** $\\mu$ = xu hướng (drift, trung bình), $\\sigma$ = độ biến động (mỗi bước nhiễu loạn bao nhiêu).

> ❓ **Câu hỏi tự nhiên.** *"Random walk nghĩa là đầu tư = đánh bạc?"* — Không. Có **drift dương** ($\\mu > 0$): dài hạn giá có xu hướng đi lên (kinh tế tăng trưởng, equity risk premium). Ngắn hạn thì gần như không đoán được hướng; dài hạn xu hướng lên thắng thế nhiễu.

---

## 3. Chuyển động Brown hình học (GBM)

> 💡 **Trực giác.** Ghép random walk của log giá với drift + biến động liên tục, ta được **chuyển động Brown hình học (Geometric Brownian Motion)** — mô hình giá tài sản kinh điển, nền tảng của định giá quyền chọn (Black–Scholes, Lesson 03). "Hình học" vì giá nhân lên theo % (không cộng tuyến tính), nên luôn dương và tăng trưởng kép.

**Đặc điểm GBM:**
- Log giá phân phối chuẩn → giá phân phối **log-chuẩn (lognormal)**: lệch phải, không âm.
- Phù hợp thực tế hơn random walk tuyến tính (giá không thể âm; tăng/giảm theo %).

> ⚠ **Lỗi thường gặp (toy model).** Tin GBM mô tả giá **hoàn hảo**. Thực tế giá có "đuôi béo" (sụp đổ cực đoan thường hơn), biến động thay đổi theo thời gian (volatility clustering). GBM là mô hình **đơn giản hữu ích**, không phải sự thật — đây là giả định bị chỉ trích nhiều nhất của Black–Scholes.

---

## 4. Độ biến động co giãn theo căn thời gian

> 💡 **Trực giác / Hình dung.** Biến động 1 ngày nhỏ, nhưng tích lũy qua nhiều ngày thì lớn dần — **nhưng không theo tỷ lệ thẳng**. Vì các cú sốc ngẫu nhiên độc lập một phần triệt tiêu nhau, độ bất định tổng tăng theo **căn bậc hai** của thời gian, không phải tuyến tính.

> 📐 **Quy luật căn thời gian (square-root-of-time):**
>
> $$\\sigma_T = \\sigma_1 \\sqrt{T}$$
>
> Độ biến động qua $T$ kỳ = độ biến động 1 kỳ × $\\sqrt{T}$.

**Walk-through bằng số thật (verify) — biến động ngày $\\sigma_{\\text{ngày}} = 1\\%$:**

| Khoảng | $T$ (số ngày) | $\\sigma_T = 1\\% \\times \\sqrt{T}$ |
|---|---|---|
| 1 ngày | 1 | 1,00% |
| 1 tuần (~5) | 5 | $1\\% \\times 2{,}24 = 2{,}24\\%$ |
| 1 tháng (~21) | 21 | $1\\% \\times 4{,}58 = 4{,}58\\%$ |
| 1 năm (~252) | 252 | $1\\% \\times 15{,}87 = 15{,}87\\%$ |

→ Biến động năm ≈ biến động ngày × $\\sqrt{252} \\approx 15{,}9$ lần — đây là cách quy đổi biến động giữa các khung thời gian, dùng khắp tài chính định lượng.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao căn bậc hai chứ không nhân thẳng?"* — Vì phương sai (σ²) của tổng các cú sốc **độc lập** cộng tuyến tính ($\\text{Var tổng} = T \\times \\text{Var}_1$), nên độ lệch chuẩn (căn của phương sai) tăng theo $\\sqrt{T}$. Cùng logic làm đa dạng hóa giảm rủi ro theo căn (Tầng 2 Lesson 05).

> 🔁 **Dừng lại tự kiểm tra.** Biến động tháng 5%. Biến động năm (12 tháng) xấp xỉ bao nhiêu?
> <details><summary>Đáp án</summary>$5\\% \\times \\sqrt{12} = 5\\% \\times 3{,}46 = 17{,}3\\%$.</details>

> 📝 **Tóm tắt toàn bài.**
> - **Log return** $r = \\ln(P_t/P_{t-1})$ — **cộng dồn được** qua kỳ, **đối xứng**; ≈ simple return khi thay đổi nhỏ.
> - **Random walk**: log giá = log giá trước + drift + cú sốc ngẫu nhiên; phản ánh EMH, giá không âm.
> - **GBM**: mô hình giá kinh điển (giá lognormal); nền của Black–Scholes — nhưng bỏ qua đuôi béo.
> - **Căn thời gian**: $\\sigma_T = \\sigma_1\\sqrt{T}$ — biến động năm ≈ biến động ngày × $\\sqrt{252}$.

---

## Bài tập

1. **Log vs simple.** Giá 200 → 230. Tính simple return và log return.

2. **Cộng dồn log.** Ba kỳ log return: +5%, −3%, +8%. Tổng log return? Đổi ra simple return tương đương ($e^{\\text{tổng}}-1$).

3. **Đối xứng.** Giá 100 tăng 25% rồi giảm 25% (simple). Giá cuối? Tính log return mỗi bước và tổng.

4. **Căn thời gian.** Biến động ngày 1,2%. Tính biến động tuần (5 ngày) và năm (252 ngày).

5. **Quy đổi ngược.** Một quỹ báo biến động năm 20%. Biến động ngày xấp xỉ bao nhiêu? (252 ngày giao dịch.)

---

## Lời giải chi tiết

### Bài 1 — Log vs simple

- Simple $= 230/200 - 1 = 15\\%$.
- Log $= \\ln(230/200) = \\ln 1{,}15 = 13{,}98\\%$.

### Bài 2 — Cộng dồn log

- Tổng log $= 5\\% - 3\\% + 8\\% = 10\\%$ (cộng thẳng được).
- Simple tương đương $= e^{0{,}10} - 1 = 1{,}1052 - 1 = 10{,}52\\%$.

### Bài 3 — Đối xứng

- Giá: $100 \\times 1{,}25 = 125$, rồi $125 \\times 0{,}75 = 93{,}75$ → cuối 93,75 (mất 6,25%, không về 100!).
- Log mỗi bước: $\\ln 1{,}25 = +22{,}31\\%$; $\\ln 0{,}75 = -28{,}77\\%$. Tổng $= -6{,}45\\% = \\ln(93{,}75/100)$ ✓.
- → Tăng 25% rồi giảm 25% (simple) **không** hòa vốn — minh họa bất đối xứng của simple return.

### Bài 4 — Căn thời gian

- Tuần: $1{,}2\\% \\times \\sqrt{5} = 1{,}2\\% \\times 2{,}236 = 2{,}68\\%$.
- Năm: $1{,}2\\% \\times \\sqrt{252} = 1{,}2\\% \\times 15{,}87 = 19{,}05\\%$.

### Bài 5 — Quy đổi ngược

$$\\sigma_{\\text{ngày}} = \\frac{\\sigma_{\\text{năm}}}{\\sqrt{252}} = \\frac{20\\%}{15{,}87} = 1{,}26\\%$$

Cách tiếp cận: đảo công thức căn thời gian. Biến động năm 20% tương ứng biến động ngày ~1,26%.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Log vs simple return**: nhập 2 giá → so hai loại lợi nhuận; minh họa bất đối xứng của simple.
  - **Mô phỏng GBM / random walk**: kéo drift μ & biến động σ → sinh nhiều đường giá ngẫu nhiên, thấy "không đoán được hướng" nhưng có xu hướng dài hạn.
  - **Co giãn biến động theo căn thời gian**: kéo σ ngày & khung thời gian → biến động tích lũy, đường $\\sqrt{T}$ so với đường tuyến tính (sai).

---

## Bài tiếp theo

→ [Lesson 02 — Quyền chọn (Options)](../lesson-02-options/): call & put là gì, payoff diagram, vì sao quyền chọn là "đặt cược có giới hạn rủi ro", các chiến lược cơ bản.

**Tham khảo chéo:** độ lệch chuẩn [\`../../02-Investing/lesson-04-risk-return/\`](../../02-Investing/lesson-04-risk-return/) · logarit [\`../../../Math/index.html\`](../../../Math/index.html).
`;
