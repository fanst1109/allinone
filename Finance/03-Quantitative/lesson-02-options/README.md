# Lesson 02 — Quyền chọn (Options)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **quyền chọn (option)** là gì: **quyền** chứ không phải **nghĩa vụ** mua/bán.
- Phân biệt **call (quyền mua)** và **put (quyền bán)**, vai trò **người mua** và **người bán**.
- Nắm các thuật ngữ: **giá thực hiện (strike)**, **phí quyền chọn (premium)**, **đáo hạn**, **ITM/ATM/OTM**.
- Vẽ và đọc **payoff diagram (đồ thị lời/lỗ khi đáo hạn)**.
- Hiểu **đòn bẩy** và bất đối xứng rủi ro giữa người mua (giới hạn) và người bán (có thể vô hạn).

## Kiến thức tiền đề

- [Tầng 2 — Cổ phiếu](../../02-Investing/lesson-02-stock-valuation/): giá tài sản cơ sở.
- [Lesson 01 — GBM](../lesson-01-log-returns/): giá tương lai bất định.

---

## 1. Quyền chọn là gì?

> 💡 **Trực giác / Hình dung.** Bạn đặt cọc giữ chỗ mua một căn nhà giá 2 tỷ trong 3 tháng tới, cọc 20 triệu. Nếu nhà lên 2,3 tỷ → bạn thực hiện quyền, mua 2 tỷ (lời). Nếu nhà xuống 1,8 tỷ → bạn **bỏ cọc**, không mua (chỉ mất 20 triệu). Đó chính là **quyền chọn**: trả một khoản phí nhỏ để có **quyền** (không bắt buộc) mua/bán ở giá định trước.

**Định nghĩa — Quyền chọn:**

- **(a) Là gì** — hợp đồng cho người mua **quyền** (không phải nghĩa vụ) mua hoặc bán tài sản cơ sở ở **giá thực hiện (strike)** trước/tại ngày **đáo hạn**, đổi lấy một khoản **phí (premium)**.
- **(b) Vì sao tồn tại** — để **phòng hộ (hedge)** rủi ro hoặc **đầu cơ có đòn bẩy** với rủi ro giới hạn (người mua chỉ mất tối đa phí).
- **(c) Hai loại:**
  - **Call (quyền MUA)**: quyền mua tài sản ở giá strike → đặt cược giá **tăng**.
  - **Put (quyền BÁN)**: quyền bán tài sản ở giá strike → đặt cược giá **giảm** (hoặc bảo hiểm danh mục).

**Thuật ngữ:**

| Thuật ngữ | Nghĩa |
|---|---|
| Strike $K$ | giá mua/bán đã định trong hợp đồng |
| Premium | phí trả để sở hữu quyền chọn |
| Đáo hạn | ngày quyền chọn hết hiệu lực |
| ITM (in-the-money) | quyền chọn đang có lợi nếu thực hiện ngay |
| ATM (at-the-money) | giá ≈ strike |
| OTM (out-of-the-money) | thực hiện sẽ lỗ → không thực hiện |

> ❓ **Câu hỏi tự nhiên.** *"Sao phải trả phí?"* — Vì quyền chọn cho bạn **lợi thế bất đối xứng**: hưởng phần lên, giới hạn phần xuống. Người bán nhận phí để gánh rủi ro đó. Phí là giá của sự linh hoạt.

---

## 2. Payoff khi đáo hạn — Call

> 💡 **Trực giác.** Một **call** chỉ đáng thực hiện khi giá tài sản $S$ **vượt** strike $K$. Nếu $S > K$, bạn mua ở $K$ rồi (về lý thuyết) bán ở $S$, lời $S - K$. Nếu $S \leq K$, bạn không thực hiện (mua ngoài thị trường rẻ hơn), giá trị = 0. Trừ phí đã trả ra là lời/lỗ thực.

> 📐 **Payoff & lợi nhuận của LONG CALL (người mua call):**
>
> $$\text{Payoff} = \max(S - K,\, 0), \qquad \text{Lợi nhuận} = \max(S - K,\, 0) - \text{premium}$$

**Walk-through bằng số thật (verify) — call strike $K = 100$, premium = 5:**

| Giá $S$ khi đáo hạn | Payoff $=\max(S-100,0)$ | Lợi nhuận $=$ payoff $-5$ |
|---|---|---|
| 90 | 0 | −5 (mất phí) |
| 100 | 0 | −5 |
| 105 | 5 | 0 (hòa vốn) |
| 110 | 10 | +5 |
| 130 | 30 | +25 |

→ **Điểm hòa vốn** = strike + premium = $100 + 5 = 105$. Dưới 100: lỗ tối đa = phí (5). Trên 105: lời, **không giới hạn** khi giá càng cao.

> 🔁 **Dừng lại tự kiểm tra.** Call strike 50, premium 3. Giá đáo hạn 58. Lợi nhuận? Điểm hòa vốn?
> <details><summary>Đáp án</summary>Payoff $= \max(58-50,0)=8$; lợi nhuận $= 8-3 = +5$. Hòa vốn $= 50+3 = 53$.</details>

---

## 3. Payoff khi đáo hạn — Put

> 💡 **Trực giác.** Một **put** đáng thực hiện khi giá $S$ **dưới** strike $K$: bạn bán ở $K$ (cao) dù giá thị trường chỉ $S$ (thấp), lời $K - S$. Put là đặt cược giá **giảm**, hoặc dùng như **bảo hiểm** cho cổ phiếu đang giữ (giá rớt thì put bù lại).

> 📐 **Payoff & lợi nhuận của LONG PUT:**
>
> $$\text{Payoff} = \max(K - S,\, 0), \qquad \text{Lợi nhuận} = \max(K - S,\, 0) - \text{premium}$$

**Walk-through bằng số thật (verify) — put strike $K = 100$, premium = 4:**

| Giá $S$ | Payoff $=\max(100-S,0)$ | Lợi nhuận $=$ payoff $-4$ |
|---|---|---|
| 70 | 30 | +26 |
| 90 | 10 | +6 |
| 96 | 4 | 0 (hòa vốn) |
| 100 | 0 | −4 |
| 120 | 0 | −4 (mất phí) |

→ Hòa vốn $= K - \text{premium} = 100 - 4 = 96$. Lời tối đa khi $S \to 0$ (giá $= K - \text{premium} = 96$). Lỗ tối đa = phí (4) khi giá ≥ strike.

> ❓ **Câu hỏi tự nhiên.** *"Put dùng làm bảo hiểm thế nào?"* — Giữ cổ phiếu + mua put = **protective put**: nếu cổ phiếu rớt mạnh, put tăng giá bù lỗ, đặt "sàn" cho khoản lỗ. Giống mua bảo hiểm (Tầng 1 Lesson 07): trả phí để giới hạn tổn thất tối đa.

---

## 4. Đòn bẩy & bất đối xứng rủi ro

> 💡 **Trực giác / Hình dung.** Với 5 đồng phí, một call cho bạn "tiếp xúc" với 100 đồng tài sản. Nếu giá tăng 10% (lên 110), call lời từ 5 thành 10 — **+100%** trên vốn bỏ ra, dù tài sản chỉ +10%. Đó là **đòn bẩy**. Nhưng dao động ngược cũng mạnh: giá đứng yên → bạn mất 100% phí.

**Bất đối xứng người mua vs người bán:**

| | Người MUA (long) | Người BÁN (short/write) |
|---|---|---|
| Trả/nhận phí | trả phí | nhận phí |
| Lỗ tối đa | = phí (giới hạn) | có thể **rất lớn / vô hạn** (call) |
| Lời tối đa | lớn / vô hạn (call) | = phí (giới hạn) |
| Đặt cược | biến động lớn theo hướng mình | giá đứng yên / không vượt strike |

> ⚠ **Lỗi thường gặp.** Bán call "trần" (naked call) vì "nhận phí ngon". Nếu giá tăng vọt, lỗ của người bán call **không giới hạn** (phải giao tài sản ở giá strike thấp dù thị trường cao bao nhiêu). Bán quyền chọn trần là một trong những vị thế rủi ro nhất.

> 🔁 **Dừng lại tự kiểm tra.** Bạn nghĩ cổ phiếu sẽ tăng mạnh nhưng muốn giới hạn lỗ. Mua call hay bán put? Vì sao?
> <details><summary>Đáp án</summary>**Mua call**: lỗ tối đa = phí (giới hạn), lời lớn nếu giá tăng. Bán put cũng cược giá tăng nhưng lỗ lớn nếu giá rớt mạnh — không giới hạn rủi ro như mong muốn.</details>

> 📝 **Tóm tắt toàn bài.**
> - **Quyền chọn** = quyền (không nghĩa vụ) mua (**call**) / bán (**put**) ở **strike**, trả **premium**.
> - **Long call** payoff $\max(S-K,0)$, hòa vốn $K+$ phí, lời vô hạn, lỗ = phí.
> - **Long put** payoff $\max(K-S,0)$, hòa vốn $K-$ phí, dùng làm bảo hiểm (protective put).
> - **Người mua**: lỗ giới hạn (phí), đòn bẩy cao. **Người bán**: lời giới hạn (phí), lỗ có thể vô hạn (naked call).

---

## Bài tập

1. **Call payoff.** Call strike 80, premium 6. Tính lợi nhuận khi giá đáo hạn = 75, 86, 100. Điểm hòa vốn?

2. **Put payoff.** Put strike 120, premium 8. Tính lợi nhuận khi giá = 100, 112, 130. Điểm hòa vốn?

3. **Đòn bẩy.** Cổ phiếu giá 100, bạn nghĩ sẽ lên 120. So sánh: (a) mua 1 cổ phiếu; (b) mua 1 call strike 100 premium 5. Lợi nhuận % trên vốn mỗi cách nếu giá lên 120?

4. **Bảo hiểm.** Bạn giữ cổ phiếu giá 100, mua put strike 90 premium 3. Giá rớt còn 70. Tổng lời/lỗ (cổ phiếu + put)?

5. **Naked call rủi ro.** Bạn bán (write) 1 call strike 100, nhận phí 5. Giá vọt lên 140. Lời/lỗ của bạn?

---

## Lời giải chi tiết

### Bài 1 — Call payoff

Hòa vốn = $80 + 6 = 86$.
- $S=75$: payoff 0, lợi nhuận $0 - 6 = -6$.
- $S=86$: payoff $86-80=6$, lợi nhuận $6-6 = 0$ (hòa vốn).
- $S=100$: payoff 20, lợi nhuận $20-6 = +14$.

### Bài 2 — Put payoff

Hòa vốn = $120 - 8 = 112$.
- $S=100$: payoff $120-100=20$, lợi nhuận $20-8 = +12$.
- $S=112$: payoff 8, lợi nhuận $8-8 = 0$.
- $S=130$: payoff 0, lợi nhuận $0-8 = -8$ (mất phí).

### Bài 3 — Đòn bẩy

- **(a) Cổ phiếu:** mua giá 100, lên 120 → lời 20 trên vốn 100 = **+20%**.
- **(b) Call:** phí 5, giá lên 120 → payoff $120-100=20$, lợi nhuận $20-5 = 15$ trên vốn 5 = **+300%**.
- → Call khuếch đại lợi nhuận ×15 lần (đòn bẩy), nhưng nếu giá đứng yên ở 100, call mất 100% phí còn cổ phiếu hòa vốn.

### Bài 4 — Bảo hiểm (protective put)

- Cổ phiếu: mua 100, còn 70 → lỗ 30.
- Put strike 90: payoff $\max(90-70,0)=20$, trừ phí 3 → +17.
- Tổng: $-30 + 17 = -13$.
- → Không có put thì lỗ 30; có put giới hạn lỗ còn 13. Put đặt "sàn": lỗ tối đa ≈ (100−90) + phí 3 = 13, dù giá rớt sâu hơn.

### Bài 5 — Naked call rủi ro

- Bạn bán call strike 100, nhận phí 5. Người mua thực hiện khi giá 140.
- Bạn phải bán tài sản giá 140 ở mức strike 100 → lỗ $140-100 = 40$ trên payoff, bù phí 5 → **lỗ ròng 35**.
- → Giá càng vọt, lỗ càng lớn **không giới hạn**. Đây là rủi ro chết người của bán call trần.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy vẽ payoff diagram**: chọn call/put, long/short, strike, premium → đồ thị lợi nhuận theo giá đáo hạn, đánh dấu điểm hòa vốn & vùng lời/lỗ.
  - **So sánh đòn bẩy**: cổ phiếu vs call → lợi nhuận % trên vốn theo giá, thấy đòn bẩy khuếch đại cả hai chiều.
  - **Protective put**: cổ phiếu + put → đồ thị tổng cho thấy "sàn" lỗ.

---

## Bài tiếp theo

→ [Lesson 03 — Định giá quyền chọn](../lesson-03-option-pricing/): vì sao premium có giá đó, định giá bằng **cây nhị phân (binomial)** và trực giác **Black–Scholes**, vai trò của biến động.

**Tham khảo chéo:** bảo hiểm & rủi ro [`../../01-PersonalFinance/lesson-07-risk-insurance/`](../../01-PersonalFinance/lesson-07-risk-insurance/) · GBM [`../lesson-01-log-returns/`](../lesson-01-log-returns/).
