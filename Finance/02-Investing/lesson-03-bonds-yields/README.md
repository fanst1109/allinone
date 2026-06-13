# Lesson 03 — Trái phiếu & Lợi suất (Bonds & Yields)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **trái phiếu (bond)** là gì: mệnh giá (par), lãi coupon, kỳ hạn (maturity).
- **Định giá trái phiếu** bằng chiết khấu dòng tiền (coupon + mệnh giá).
- Hiểu **lợi suất đáo hạn (YTM)** và **quan hệ nghịch giá ↔ lợi suất**.
- Giải thích vì sao **giá trái phiếu giảm khi lãi suất thị trường tăng**.
- Nắm khái niệm **duration** — đo độ nhạy của giá với lãi suất.

## Kiến thức tiền đề

- [Tầng 1 — Chiết khấu PV & annuity](../../01-PersonalFinance/lesson-01-time-value-money/): $PV = FV/(1+r)^n$, dòng tiền đều.
- [Lesson 01 — Lớp tài sản](../lesson-01-asset-classes/): trái phiếu = cho vay, an toàn hơn cổ phiếu.

---

## 1. Trái phiếu là gì?

> 💡 **Trực giác / Hình dung.** Mua trái phiếu = **cho vay tiền**. Bạn đưa cho chính phủ/doanh nghiệp một khoản (mệnh giá), họ hứa trả bạn **lãi định kỳ (coupon)** và **hoàn lại mệnh giá** khi đáo hạn. Khác cổ phiếu (làm chủ, lời lỗ theo công ty), trái phiếu là **chủ nợ**: dòng tiền cố định, biết trước, ưu tiên trả trước cổ đông.

**Định nghĩa các thành phần:**

- **Mệnh giá (par / face value)** — số tiền hoàn lại khi đáo hạn (vd 1.000.000đ).
- **Lãi coupon** — lãi trả định kỳ, tính theo % mệnh giá (coupon 8% trên par 1 triệu = 80.000đ/năm).
- **Kỳ hạn (maturity)** — thời gian tới khi hoàn mệnh giá (vd 5 năm).

**Ví dụ:** trái phiếu par 1.000.000đ, coupon 8%/năm, kỳ hạn 5 năm → mỗi năm nhận 80.000đ, cuối năm 5 nhận thêm 1.000.000đ.

> ❓ **Câu hỏi tự nhiên.** *"Trái phiếu có rủi ro không?"* — Có hai rủi ro chính: (1) **vỡ nợ** (bên vay không trả được — trái phiếu chính phủ rủi ro thấp, doanh nghiệp cao hơn); (2) **lãi suất** (giá trái phiếu dao động khi lãi suất thị trường đổi — mục 3-4). "An toàn hơn cổ phiếu" không có nghĩa "không rủi ro".

---

## 2. Định giá trái phiếu

> 💡 **Trực giác.** Giá trị một trái phiếu = tổng **giá trị hiện tại (PV)** của tất cả dòng tiền nó trả: các coupon + mệnh giá cuối kỳ. Lại là chiết khấu của Tầng 1, áp cho một chuỗi dòng tiền biết trước.

> 📐 **Công thức định giá:**
>
> $$P = \sum_{t=1}^{n} \frac{C}{(1+y)^t} + \frac{F}{(1+y)^n}$$
>
> với $C$ = coupon/kỳ, $F$ = mệnh giá, $y$ = lợi suất thị trường (discount rate)/kỳ, $n$ = số kỳ.

**Walk-through bằng số thật (verify) — par 1.000.000đ, coupon 8% (80.000đ/năm), 5 năm, lợi suất thị trường $y = 8\%$:**

$$P = \underbrace{80.000 \times \frac{1 - 1{,}08^{-5}}{0{,}08}}_{\text{PV các coupon}} + \underbrace{\frac{1.000.000}{1{,}08^5}}_{\text{PV mệnh giá}}$$

$$P = 80.000 \times 3{,}9927 + \frac{1.000.000}{1{,}4693} = 319.417 + 680.583 = 1.000.000 \text{đ}$$

→ Khi **lợi suất = coupon (8% = 8%)**, giá đúng bằng **mệnh giá** (trái phiếu "ngang giá" — at par). Đây là mốc chuẩn để hiểu mục 3.

> 🔁 **Dừng lại tự kiểm tra.** Trái phiếu par 1 triệu, coupon 6%, lợi suất thị trường cũng 6%. Giá xấp xỉ bao nhiêu?
> <details><summary>Đáp án</summary>Đúng bằng mệnh giá ≈ 1.000.000đ — vì coupon = lợi suất → at par.</details>

---

## 3. Lợi suất & quan hệ nghịch giá ↔ lợi suất

> 💡 **Trực giác / Hình dung.** Đây là điều "ngược đời" nhất của trái phiếu: **giá và lợi suất đi ngược nhau**. Hình dung: bạn cầm trái phiếu cũ trả coupon 8%. Bỗng lãi suất thị trường tăng lên 10% — trái phiếu mới phát hành trả 10%, hấp dẫn hơn. Ai thèm mua trái phiếu 8% của bạn với giá cũ? Không ai → bạn phải **hạ giá bán** để người mua đạt lợi suất tương đương 10%. Giá xuống. Ngược lại, lãi thị trường giảm còn 6% → trái phiếu 8% của bạn thành "ngon", giá **lên**.

**Định nghĩa — Lợi suất đáo hạn (YTM — Yield to Maturity):**

- **(a) Là gì** — tỷ suất lợi nhuận thực tế nếu mua trái phiếu ở giá hiện tại và giữ tới đáo hạn; chính là $y$ làm cho PV dòng tiền = giá thị trường.
- **(b) Vì sao cần** — coupon cố định, nhưng nếu mua ở giá khác mệnh giá thì lợi nhuận thực khác coupon. YTM là thước đo lợi nhuận thật.
- **(c) Quan hệ giá–lợi suất:**

| Tình huống | Giá so mệnh giá |
|---|---|
| Lợi suất thị trường = coupon | Giá = mệnh giá (at par) |
| Lợi suất > coupon | Giá < mệnh giá (chiết khấu — discount) |
| Lợi suất < coupon | Giá > mệnh giá (phụ trội — premium) |

**Walk-through (verify) — cùng trái phiếu (coupon 8%, par 1tr, 5 năm), nhưng lợi suất thị trường giờ là $y = 10\%$:**

$$P = 80.000 \times \frac{1 - 1{,}10^{-5}}{0{,}10} + \frac{1.000.000}{1{,}10^5} = 80.000 \times 3{,}7908 + 620.921 = 303.263 + 620.921 = 924.184 \text{đ}$$

→ Lợi suất tăng 8%→10% làm giá rớt từ 1.000.000 xuống **924.184đ** (−7,6%). Quan hệ nghịch được xác nhận bằng số.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao tôi giữ tới đáo hạn vẫn lỗ khi lãi tăng?"* — Nếu giữ tới đáo hạn, bạn vẫn nhận đủ coupon + mệnh giá (không lỗ danh nghĩa nếu không vỡ nợ). Nhưng **giá thị trường** giảm — bạn lỗ nếu **phải bán sớm**, và chịu chi phí cơ hội (lẽ ra mua được trái phiếu mới lãi cao hơn).
> - *"Lãi suất tăng tốt hay xấu cho người mua trái phiếu mới?"* — Tốt cho người **sắp mua** (lợi suất cao hơn), xấu cho người **đang giữ** (giá trái phiếu cũ giảm).

> ⚠ **Lỗi thường gặp.** Nghĩ "trái phiếu an toàn nên giá không đổi". Giá trái phiếu **dao động hằng ngày** theo lãi suất thị trường. Trái phiếu dài hạn có thể mất giá đáng kể khi lãi tăng mạnh.

> 🔁 **Dừng lại tự kiểm tra.** Lãi suất thị trường giảm từ 8% xuống 6%. Giá trái phiếu coupon 8% sẽ lên hay xuống? Trên hay dưới mệnh giá?
> <details><summary>Đáp án</summary>Giá **lên**, **trên** mệnh giá (premium) — vì coupon 8% giờ hấp dẫn hơn lãi thị trường 6%.</details>

---

## 4. Duration — độ nhạy với lãi suất

> 💡 **Trực giác.** Không phải trái phiếu nào cũng nhạy với lãi suất như nhau. Trái phiếu **kỳ hạn dài** rớt giá mạnh hơn nhiều khi lãi tăng, vì dòng tiền của nó nằm xa trong tương lai → chiết khấu "ăn" nặng hơn. **Duration** đo độ nhạy này: bằng số năm xấp xỉ, cho biết giá đổi bao nhiêu % khi lãi suất đổi 1%.

**Định nghĩa — Duration:**

- **(a) Là gì** — thước đo độ nhạy của giá trái phiếu với thay đổi lãi suất; xấp xỉ: **giá đổi ≈ −Duration × Δ lãi suất**.
- **(b) Vì sao cần** — để so sánh và quản lý rủi ro lãi suất giữa các trái phiếu; duration cao = rủi ro lãi suất cao.
- **(c) Ví dụ số** — trái phiếu duration 4 năm, lãi suất tăng 1% → giá giảm ≈ $4 \times 1\% = 4\%$. Nếu tăng 2% → giảm ≈ 8%.

**4 ví dụ số:**

| Duration | Δ lãi suất | Giá đổi ≈ |
|---|---|---|
| 2 năm | +1% | −2% |
| 7 năm | +1% | −7% |
| 7 năm | −1% | +7% |
| 15 năm | +2% | −30% |

→ Trái phiếu kỳ hạn dài (duration lớn) là "đòn bẩy lãi suất" — lời/lỗ mạnh khi lãi đổi.

> ❓ **Câu hỏi tự nhiên.** *"Vậy khi nào nên mua trái phiếu dài hạn?"* — Khi bạn nghĩ lãi suất sẽ **giảm** (giá dài hạn vọt lên) hoặc muốn khóa lợi suất cao dài hạn. Khi nghĩ lãi sẽ **tăng**, trái phiếu ngắn hạn an toàn hơn (ít mất giá).

> 📝 **Tóm tắt toàn bài.**
> - **Trái phiếu** = cho vay; có par, coupon, kỳ hạn; dòng tiền cố định, biết trước.
> - **Giá** = PV của coupon + mệnh giá; lợi suất = coupon → at par.
> - **Quan hệ nghịch**: lãi suất ↑ → giá ↓ (discount); lãi suất ↓ → giá ↑ (premium). **YTM** = lợi nhuận thực nếu giữ tới đáo hạn.
> - **Duration** = độ nhạy: giá đổi ≈ −Duration × Δ lãi; kỳ hạn dài → duration lớn → rủi ro lãi suất cao.

---

## Bài tập

1. **Coupon.** Trái phiếu par 2.000.000đ, coupon 7%/năm. Tiền lãi mỗi năm?

2. **At par.** Trái phiếu coupon 9%, lợi suất thị trường 9%, kỳ hạn 3 năm, par 1 triệu. Giá xấp xỉ bao nhiêu (không cần tính chi tiết)?

3. **Discount/premium.** Trái phiếu coupon 5%, lợi suất thị trường hiện 7%. Giá trên hay dưới mệnh giá? Vì sao?

4. **Định giá.** Par 1.000.000đ, coupon 6% (60.000đ/năm), 3 năm, lợi suất thị trường 8%. Tính giá. (PV annuity 3 năm @8% = 2,5771; $1{,}08^{-3} = 0{,}7938$.)

5. **Duration.** Trái phiếu duration 9 năm. Lãi suất thị trường tăng 1,5%. Ước lượng % thay đổi giá.

---

## Lời giải chi tiết

### Bài 1 — Coupon

$$\text{Lãi/năm} = 2.000.000 \times 7\% = 140.000 \text{đ}$$

### Bài 2 — At par

Lợi suất (9%) = coupon (9%) → giá **= mệnh giá ≈ 1.000.000đ** (at par).

### Bài 3 — Discount/premium

Lợi suất thị trường (7%) > coupon (5%) → giá **dưới** mệnh giá (**discount**). Vì coupon 5% kém hấp dẫn hơn lãi thị trường 7%, phải hạ giá để người mua đạt lợi suất 7%.

### Bài 4 — Định giá

$$P = 60.000 \times 2{,}5771 + 1.000.000 \times 0{,}7938 = 154.626 + 793.800 = 948.426 \text{đ}$$

Cách tiếp cận: PV các coupon (annuity) + PV mệnh giá. Lợi suất (8%) > coupon (6%) → giá 948.426 < 1.000.000 (discount), khớp quy luật ✓.

### Bài 5 — Duration

$$\text{Giá đổi} \approx -\text{Duration} \times \Delta y = -9 \times 1{,}5\% = -13{,}5\%$$

Cách tiếp cận: lãi tăng → giá giảm; duration 9 năm khuếch đại thành −13,5%. Trái phiếu dài hạn nhạy mạnh với lãi suất.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy định giá trái phiếu**: nhập par, coupon, kỳ hạn, lợi suất → giá, báo at par / discount / premium, tách PV coupon vs PV mệnh giá.
  - **Đường cong giá ↔ lợi suất**: kéo lợi suất → thấy giá di chuyển ngược, đường cong dốc xuống.
  - **Mô phỏng duration**: chọn kỳ hạn & cú sốc lãi suất → ước lượng % thay đổi giá, so trái phiếu ngắn vs dài.

---

## Bài tiếp theo

→ [Lesson 04 — Rủi ro & lợi nhuận](../lesson-04-risk-return/): định lượng rủi ro bằng **độ lệch chuẩn**, phân biệt lợi nhuận kỳ vọng vs thực tế, và tỷ số Sharpe — nối thẳng tới Statistics.

**Tham khảo chéo:** chiết khấu & annuity [`../../01-PersonalFinance/lesson-01-time-value-money/`](../../01-PersonalFinance/lesson-01-time-value-money/) · lãi suất danh nghĩa [`../../01-PersonalFinance/lesson-03-interest-rates/`](../../01-PersonalFinance/lesson-03-interest-rates/).
