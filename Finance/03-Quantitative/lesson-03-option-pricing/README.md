# Lesson 03 — Định giá quyền chọn (Option Pricing)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu nguyên lý cốt lõi định giá quyền chọn: **không có cơ hội kinh doanh chênh lệch (no-arbitrage)** & **sao chép (replication)**.
- Định giá quyền chọn bằng **mô hình cây nhị phân (binomial model)** một bước.
- Hiểu trực giác **Black–Scholes** và **5 yếu tố** quyết định giá quyền chọn.
- Hiểu vì sao **biến động (volatility)** làm tăng giá quyền chọn.

## Kiến thức tiền đề

- [Lesson 02 — Quyền chọn](../lesson-02-options/): call/put, payoff.
- [Lesson 01 — GBM & biến động](../lesson-01-log-returns/).
- [Tầng 1 — chiết khấu PV](../../01-PersonalFinance/lesson-01-time-value-money/).

---

## 1. Vì sao quyền chọn có "giá đúng"?

> 💡 **Trực giác / Hình dung.** Premium không phải con số tùy hứng. Ý tưởng thiên tài: ta có thể **sao chép** payoff của quyền chọn bằng một danh mục gồm tài sản cơ sở + tiền vay/gửi. Nếu sao chép được, thì giá quyền chọn **phải bằng** chi phí của danh mục sao chép — nếu không, sẽ có **cơ hội kiếm lời không rủi ro (arbitrage)**, và thị trường lập tức xóa nó. Đó là "giá đúng".

**Định nghĩa — Nguyên lý no-arbitrage:**

- **(a) Là gì** — không thể có lợi nhuận chắc chắn, không rủi ro, không vốn. Hai thứ cho dòng tiền tương lai **giống hệt** phải có **giá hiện tại giống hệt**.
- **(b) Vì sao là nền tảng** — nó cho phép định giá quyền chọn **không cần biết xác suất tăng/giảm** hay khẩu vị rủi ro — chỉ cần khả năng sao chép. Đây là đột phá của Black–Scholes–Merton (Nobel 1997).
- **(c) Hệ quả** — giá quyền chọn = chi phí của danh mục sao chép payoff của nó.

---

## 2. Mô hình cây nhị phân (Binomial) — một bước

> 💡 **Trực giác / Hình dung.** Đơn giản hóa: trong một kỳ, giá chỉ có thể **lên** (tới $S_u$) hoặc **xuống** (tới $S_d$). Ta tìm một danh mục (mua $\Delta$ cổ phiếu + vay tiền) có payoff khớp quyền chọn ở **cả hai** kịch bản. Chi phí danh mục đó = giá quyền chọn.

**Walk-through bằng số thật (verify) — định giá CALL strike $K=100$:**

Giả sử: giá hiện tại $S=100$; sau 1 kỳ lên $S_u=120$ hoặc xuống $S_d=90$; lãi phi rủi ro $r=0$ (đơn giản hóa).

**Bước 1 — payoff call khi đáo hạn:**
- Nếu lên 120: $C_u = \max(120-100,0) = 20$.
- Nếu xuống 90: $C_d = \max(90-100,0) = 0$.

**Bước 2 — tỷ lệ phòng hộ (hedge ratio) $\Delta$:**

$$\Delta = \frac{C_u - C_d}{S_u - S_d} = \frac{20 - 0}{120 - 90} = \frac{20}{30} = 0{,}667$$

**Bước 3 — danh mục sao chép:** mua 0,667 cổ phiếu. Giá trị danh mục khi đáo hạn:
- Lên: $0{,}667 \times 120 = 80$; để khớp call ($C_u=20$) cần **vay** một khoản trả lại 60.
- Xuống: $0{,}667 \times 90 = 60$; khớp call ($C_d=0$) cần trả lại 60 ✓ (nhất quán).

**Bước 4 — giá call hôm nay** = chi phí danh mục = $\Delta \times S - \text{khoản vay}$ (chiết khấu, ở đây $r=0$):

$$C = 0{,}667 \times 100 - 60 = 66{,}7 - 60 = 6{,}67$$

→ Giá hợp lý của call này là **6,67**. Nếu ai bán 5 → mua call + bán danh mục sao chép = lời chắc 1,67 không rủi ro (arbitrage). Thị trường đẩy giá về 6,67.

**Cách 2 — xác suất trung hòa rủi ro (risk-neutral):** $p = \dfrac{S - S_d}{S_u - S_d} = \dfrac{100-90}{120-90} = \dfrac{10}{30} = 0{,}333$. Giá $= p \cdot C_u + (1-p)\cdot C_d = 0{,}333 \times 20 + 0{,}667 \times 0 = 6{,}67$ ✓ (khớp).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao không dùng xác suất thật của tăng/giảm?"* — Đột phá: giá quyền chọn **không phụ thuộc** xác suất thật hay mức ưa rủi ro, chỉ phụ thuộc khả năng sao chép. "Xác suất trung hòa rủi ro" $p$ là công cụ tính, không phải niềm tin về thị trường.
> - *"Một bước thì quá thô?"* — Đúng. Thực tế chia thành **nhiều bước nhỏ** (cây nhiều tầng); khi số bước → ∞, cây nhị phân **hội tụ về công thức Black–Scholes**.

> 🔁 **Dừng lại tự kiểm tra.** Cây 1 bước, $S=100$, lên 110 / xuống 95, $r=0$, call strike 100. Tính $C_u, C_d, \Delta$.
> <details><summary>Đáp án</summary>$C_u=\max(110-100,0)=10$; $C_d=\max(95-100,0)=0$; $\Delta=(10-0)/(110-95)=10/15=0{,}667$.</details>

---

## 3. Black–Scholes — trực giác & 5 yếu tố

> 💡 **Trực giác.** Black–Scholes là "cây nhị phân với vô số bước nhỏ" cho giá theo GBM (Lesson 01). Công thức trông đáng sợ nhưng ý tưởng đơn giản: **giá call ≈ giá trị kỳ vọng của payoff, dưới xác suất trung hòa rủi ro, chiết khấu về hiện tại.**

> 📐 **Công thức Black–Scholes (call):**
>
> $$C = S\,N(d_1) - K e^{-rT} N(d_2)$$
> $$d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \quad d_2 = d_1 - \sigma\sqrt{T}$$
>
> với $N(\cdot)$ = hàm phân phối tích lũy chuẩn.

**5 yếu tố ảnh hưởng giá call (và chiều tác động):**

| Yếu tố | Tăng yếu tố → giá call |
|---|---|
| Giá tài sản $S$ ↑ | **tăng** (gần ITM hơn) |
| Strike $K$ ↑ | **giảm** (khó vượt hơn) |
| Biến động $\sigma$ ↑ | **tăng** (xem mục 4) |
| Thời gian $T$ ↑ | **tăng** (nhiều cơ hội hơn) |
| Lãi suất $r$ ↑ | tăng nhẹ (chiết khấu strike) |

> ⚠ **Lỗi thường gặp (toy/giả định).** Black–Scholes giả định biến động **hằng số** và giá theo GBM (không đuôi béo). Thực tế σ thay đổi và sụp đổ cực đoan thường hơn → BS định giá sai quyền chọn "xa tiền" (OTM sâu); thị trường điều chỉnh bằng **volatility smile**. BS là điểm khởi đầu mạnh, không phải chân lý.

---

## 4. Vì sao biến động làm tăng giá quyền chọn

> 💡 **Trực giác / Hình dung.** Đây là điều phản trực giác nhất. Quyền chọn có **payoff bất đối xứng**: người mua call hưởng trọn phần giá tăng nhưng **lỗ tối đa chỉ = phí** (Lesson 02). Vậy biến động lớn = khả năng giá tăng vọt cao hơn (tốt cho call) mà phần lỗ vẫn bị chặn ở phí (không tệ hơn). "Mặt tốt rộng ra, mặt xấu bị chặn" → quyền chọn **đáng giá hơn** khi biến động cao.

**Walk-through minh họa (verify ý bất đối xứng) — call strike 100, hai kịch bản biến động, cùng kỳ vọng giá 100:**

- **Biến động thấp:** giá đáo hạn 95 hoặc 105 (50/50). Payoff call: 0 hoặc 5 → kỳ vọng $= 0{,}5 \times 0 + 0{,}5 \times 5 = 2{,}5$.
- **Biến động cao:** giá đáo hạn 70 hoặc 130 (50/50). Payoff call: 0 hoặc 30 → kỳ vọng $= 0{,}5 \times 0 + 0{,}5 \times 30 = 15$.

→ Cùng giá kỳ vọng 100, nhưng biến động cao cho call kỳ vọng payoff **15** so với 2,5 — gấp 6 lần. Vì phần xuống (70 vs 95) đều cho payoff 0 (bị chặn), chỉ phần lên được hưởng. **Biến động cao → call đắt hơn.**

> ❓ **Câu hỏi tự nhiên.** *"Put cũng đắt hơn khi biến động cao?"* — Có. Cùng lý do bất đối xứng (lỗ chặn ở phí, lời mở rộng khi giá rớt mạnh). Biến động cao làm **cả call lẫn put** đắt hơn.

> 📝 **Tóm tắt toàn bài.**
> - **No-arbitrage + sao chép**: giá quyền chọn = chi phí danh mục sao chép payoff; không cần xác suất thật.
> - **Cây nhị phân**: tìm $\Delta = (C_u-C_d)/(S_u-S_d)$, định giá bằng danh mục sao chép hoặc xác suất trung hòa rủi ro; hội tụ về Black–Scholes khi nhiều bước.
> - **Black–Scholes**: 5 yếu tố — $S\uparrow$, $T\uparrow$, $\sigma\uparrow$, $r\uparrow$ làm call tăng; $K\uparrow$ làm call giảm.
> - **Biến động ↑ → quyền chọn đắt hơn** (cả call & put) do payoff bất đối xứng: mặt tốt mở rộng, mặt xấu chặn ở phí.

---

## Bài tập

1. **Payoff cây.** $S=100$, lên 130 / xuống 80, call strike 100. Tính $C_u, C_d$.

2. **Hedge ratio.** Dùng bài 1. Tính $\Delta = (C_u-C_d)/(S_u-S_d)$.

3. **Định giá binomial.** Dùng bài 1-2, $r=0$. Tính giá call bằng xác suất trung hòa rủi ro $p=(S-S_d)/(S_u-S_d)$.

4. **Yếu tố tác động.** Một call. Cho biết giá tăng hay giảm khi: (a) biến động tăng; (b) strike tăng; (c) thời gian tới đáo hạn ngắn lại.

5. **Biến động & giá.** Hai call cùng strike 100, kỳ vọng giá 100. Call A: giá đáo hạn 90/110. Call B: 60/140. Tính kỳ vọng payoff mỗi cái, cái nào đắt hơn?

---

## Lời giải chi tiết

### Bài 1 — Payoff cây

- $C_u = \max(130-100,0) = 30$.
- $C_d = \max(80-100,0) = 0$.

### Bài 2 — Hedge ratio

$$\Delta = \frac{30 - 0}{130 - 80} = \frac{30}{50} = 0{,}6$$

### Bài 3 — Định giá binomial

$$p = \frac{S - S_d}{S_u - S_d} = \frac{100 - 80}{130 - 80} = \frac{20}{50} = 0{,}4$$
$$C = p \cdot C_u + (1-p)\cdot C_d = 0{,}4 \times 30 + 0{,}6 \times 0 = 12$$

→ Giá call = 12 (với $r=0$). Kiểm cách sao chép: $\Delta \times S - \text{vay}$; lên: $0{,}6 \times 130 = 78$, khớp $C_u=30$ cần vay 48; xuống: $0{,}6 \times 80 = 48$, khớp $C_d=0$ cần trả 48 ✓. Giá $= 0{,}6 \times 100 - 48 = 12$ ✓.

### Bài 4 — Yếu tố tác động

- (a) Biến động tăng → giá call **tăng** (bất đối xứng, mục 4).
- (b) Strike tăng → call **giảm** (khó vượt strike hơn).
- (c) Thời gian ngắn lại → call **giảm** (ít cơ hội cho giá di chuyển có lợi — "time decay").

### Bài 5 — Biến động & giá

- **A (90/110):** payoff $\max(90-100,0)=0$ hoặc $\max(110-100,0)=10$ → kỳ vọng $0{,}5 \times 0 + 0{,}5 \times 10 = 5$.
- **B (60/140):** payoff 0 hoặc $\max(140-100,0)=40$ → kỳ vọng $0{,}5 \times 0 + 0{,}5 \times 40 = 20$.
- → **B đắt hơn** (20 vs 5) dù cùng giá kỳ vọng 100. Biến động cao đẩy giá quyền chọn lên do payoff bất đối xứng.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Cây nhị phân 1 bước**: nhập S, S_u, S_d, strike → tính $C_u, C_d, \Delta$, giá call/put, kiểm bằng danh mục sao chép.
  - **Máy tính Black–Scholes**: kéo 5 yếu tố (S, K, σ, T, r) → giá call & put, thấy chiều tác động từng yếu tố.
  - **Giá quyền chọn vs biến động**: kéo σ → đường giá call/put dốc lên, minh họa "biến động ↑ → giá ↑".

---

## Bài tiếp theo

→ [Lesson 04 — Hợp đồng tương lai & phòng hộ](../lesson-04-futures-hedging/): futures/forwards là gì, định giá, dùng để hedge (khóa giá) và đầu cơ có đòn bẩy, rủi ro của đòn bẩy.

**Tham khảo chéo:** payoff quyền chọn [`../lesson-02-options/`](../lesson-02-options/) · biến động & GBM [`../lesson-01-log-returns/`](../lesson-01-log-returns/).
