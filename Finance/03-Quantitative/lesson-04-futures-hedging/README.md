# Lesson 04 — Hợp đồng tương lai & Phòng hộ (Futures & Hedging)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hợp đồng kỳ hạn (forward)** và **tương lai (futures)** là gì — và khác quyền chọn thế nào.
- Định giá forward bằng **chi phí nắm giữ (cost of carry)**: $F = S(1+r)^T$.
- Hiểu **phòng hộ (hedging)**: dùng futures để **khóa giá**, loại bỏ rủi ro biến động.
- Hiểu **đòn bẩy (leverage)** và **ký quỹ (margin)** — vì sao futures khuếch đại cả lời lẫn lỗ.

## Kiến thức tiền đề

- [Lesson 02 — Quyền chọn](../lesson-02-options/): so sánh quyền vs nghĩa vụ.
- [Tầng 1 — giá trị thời gian của tiền](../../01-PersonalFinance/lesson-01-time-value-money/).

---

## 1. Forward & Futures là gì

> 💡 **Trực giác / Hình dung.** Nông dân lo giá lúa 3 tháng nữa rớt; nhà máy gạo lo giá tăng. Họ ký với nhau **hôm nay**: 3 tháng nữa giao 100 tấn ở giá cố định 5.000đ/kg, **bất kể** giá thị trường lúc đó. Cả hai **khóa giá**, hết lo biến động. Đó là **hợp đồng kỳ hạn**.

**Định nghĩa:**

- **Forward** — hợp đồng **bắt buộc** mua/bán tài sản ở giá định trước (forward price) vào một ngày tương lai. Thỏa thuận riêng (OTC), tùy chỉnh.
- **Futures** — như forward nhưng **chuẩn hóa** và giao dịch trên **sàn**, thanh toán lời/lỗ **hằng ngày** (mark-to-market), có thanh toán bù trừ trung tâm (giảm rủi ro đối tác).

**Khác quyền chọn (Lesson 02) — điểm cốt lõi:**

| | Quyền chọn (option) | Futures/forward |
|---|---|---|
| Bản chất | **quyền** (được chọn thực hiện) | **nghĩa vụ** (bắt buộc) |
| Trả phí trước? | có (premium) | không (chỉ ký quỹ) |
| Payoff | bất đối xứng (cong) | **đối xứng (tuyến tính)** |
| Lỗ tối đa người mua | = phí | lớn (theo giá) |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao futures không trả phí trước như option?"* — Vì futures là nghĩa vụ **hai chiều** đối xứng — không bên nào có "lợi thế quyền chọn", nên không ai trả phí cho ai. Chỉ cần **ký quỹ (margin)** để đảm bảo thực hiện.

---

## 2. Định giá forward — Chi phí nắm giữ (Cost of Carry)

> 💡 **Trực giác.** Giá forward không phải dự đoán giá tương lai. Nó được neo bởi no-arbitrage (Lesson 03): mua tài sản **bây giờ** và giữ tới ngày giao phải tốn **chi phí vốn** (tiền đáng lẽ sinh lãi). Vậy giá giao tương lai = giá hiện tại + chi phí nắm giữ.

> 📐 **Công thức (đơn giản, không cổ tức/lưu kho):**
>
> $$F = S\,(1 + r)^T$$
>
> với $S$ = giá giao ngay (spot), $r$ = lãi phi rủi ro, $T$ = thời gian (năm).

**Walk-through bằng số thật (verify) — $S = 1.000.000$đ, $r = 6\%$, $T = 0{,}5$ năm:**

$$F = 1.000.000 \times 1{,}06^{0{,}5} = 1.000.000 \times 1{,}0296 = 1.029.600 \text{đ}$$

→ Giá forward 6 tháng = 1.029.600đ. **Vì sao đúng?** Nếu $F$ cao hơn (vd 1.050.000): bán forward, vay tiền mua tài sản giữ → tới hạn giao tài sản nhận 1.050.000, trả nợ 1.029.600 → lời chắc 20.400 không rủi ro (arbitrage). Thị trường đẩy $F$ về 1.029.600.

> ⚠ **Lỗi thường gặp.** Nghĩ "giá futures = dự đoán giá tương lai của thị trường". Không — nó là giá spot điều chỉnh theo chi phí nắm giữ (no-arbitrage). Nếu có cổ tức/lợi tức nắm giữ, công thức trừ đi phần đó.

> 🔁 **Dừng lại tự kiểm tra.** $S = 500.000$đ, $r = 8\%$, $T = 1$ năm. Giá forward 1 năm?
> <details><summary>Đáp án</summary>$F = 500.000 \times 1{,}08 = 540.000$đ.</details>

---

## 3. Phòng hộ (Hedging) — khóa giá

> 💡 **Trực giác / Hình dung.** Hãng hàng không lo giá dầu tăng (chi phí nhiên liệu tăng). Họ **mua futures dầu** hôm nay khóa giá. Nếu dầu tăng → futures lời, bù chi phí nhiên liệu đắt; nếu dầu giảm → futures lỗ, nhưng nhiên liệu rẻ bù lại. Tổng: **chi phí cố định, hết lo biến động**. Đó là phòng hộ — **đổi bất định lấy chắc chắn** (giống bảo hiểm, Tầng 1 Lesson 07).

**Định nghĩa — Hedging:**

- **(a) Là gì** — mở một vị thế (futures) có lời/lỗ **ngược** với rủi ro sẵn có, để hai cái triệt tiêu → khóa kết quả.
- **(b) Vì sao dùng** — doanh nghiệp/nhà đầu tư muốn **loại rủi ro** họ không muốn gánh (giá nguyên liệu, tỷ giá), tập trung vào việc kinh doanh chính.
- **(c) Walk-through bằng số (verify) — hãng hàng không cần 1.000 thùng dầu sau 3 tháng, giá spot nay 80$/thùng, khóa futures ở 82$:**

| Giá dầu sau 3 tháng | Chi phí mua thực | Lời/lỗ futures (đã khóa 82) | Chi phí ròng |
|---|---|---|---|
| 100$ | 100.000$ | +18.000$ | **82.000$** |
| 82$ | 82.000$ | 0 | 82.000$ |
| 60$ | 60.000$ | −22.000$ | **82.000$** |

→ Dù giá dầu chạy 60–100$, chi phí ròng **luôn 82.000$**. Hãng đã khóa chi phí, hết rủi ro. Đánh đổi: nếu giá giảm họ **không** hưởng phần rẻ (khác với mua option — chỉ bảo vệ một chiều nhưng phải trả phí).

> ❓ **Câu hỏi tự nhiên.**
> - *"Hedge bằng futures vs bằng option khác gì?"* — Futures khóa **cứng** giá (đối xứng, không phí) → mất luôn phần lợi nếu giá đi có lợi. Option (put bảo hiểm) chặn một chiều, giữ phần lợi chiều kia, nhưng **trả phí**. Tùy muốn "khóa cứng" hay "bảo hiểm có phí".
> - *"Hedge có phải luôn tốt?"* — Hedge giảm rủi ro nhưng cũng bỏ phần lợi tiềm năng; nó dành cho ai **không muốn gánh** rủi ro đó, không phải để kiếm lời thêm.

---

## 4. Đòn bẩy & ký quỹ (Leverage & Margin)

> 💡 **Trực giác / Hình dung.** Để mở futures trị giá 1 tỷ, bạn chỉ cần đặt **ký quỹ** ~5–10% (50–100 triệu). Nghĩa là biến động giá tính trên **cả 1 tỷ** nhưng vốn bạn bỏ chỉ 100 triệu → lời/lỗ **phóng đại 10 lần** trên vốn. Đòn bẩy là con dao hai lưỡi cực sắc.

**Walk-through bằng số (verify) — hợp đồng giá trị 1 tỷ, ký quỹ 10% (100 triệu):**

| Giá tài sản đổi | Lời/lỗ trên hợp đồng | % trên vốn ký quỹ (100tr) |
|---|---|---|
| +5% | +50 triệu | **+50%** |
| +10% | +100 triệu | **+100%** (gấp đôi vốn) |
| −10% | −100 triệu | **−100%** (cháy tài khoản) |
| −15% | −150 triệu | **−150%** (lỗ hơn cả vốn → nợ thêm) |

→ Chỉ cần giá đi ngược 10%, bạn **mất sạch** ký quỹ; đi ngược 15%, bạn **nợ thêm** 50 triệu. Đòn bẩy khuếch đại cả hai chiều và có thể làm lỗ **vượt** vốn ban đầu.

> ⚠ **Lỗi thường gặp.** "Futures lời nhanh, ít vốn — dễ giàu." Đòn bẩy làm lỗ cũng nhanh tương ứng; **margin call** (yêu cầu nộp thêm ký quỹ) có thể buộc đóng vị thế lỗ đúng lúc xấu nhất. Đa số nhà đầu tư cá nhân dùng đòn bẩy cao đều thua nặng.

> 🔁 **Dừng lại tự kiểm tra.** Hợp đồng 500 triệu, ký quỹ 5% (25 triệu). Giá tăng 4%. Lời bao nhiêu, % trên ký quỹ?
> <details><summary>Đáp án</summary>Lời $= 500 \times 4\% = 20$ triệu trên ký quỹ 25 triệu = **+80%**. (Đòn bẩy ~20× → biến động ×20.)</details>

> 📝 **Tóm tắt toàn bài.**
> - **Forward/futures** = **nghĩa vụ** mua/bán giá định trước (khác option = quyền); payoff **đối xứng**, không phí trả trước, chỉ ký quỹ.
> - **Giá forward** $F = S(1+r)^T$ (cost of carry, no-arbitrage) — không phải dự đoán giá.
> - **Hedging**: vị thế ngược rủi ro sẵn có → khóa giá/chi phí; đổi bất định lấy chắc chắn (mất phần lợi nếu giá đi có lợi).
> - **Đòn bẩy/ký quỹ**: vốn nhỏ điều khiển hợp đồng lớn → lời/lỗ phóng đại nhiều lần, có thể lỗ vượt vốn (margin call).

---

## Bài tập

1. **Giá forward.** $S = 2.000.000$đ, $r = 5\%$, $T = 1$ năm. Tính giá forward.

2. **Forward 6 tháng.** $S = 1.000.000$đ, $r = 8\%$, $T = 0{,}5$. Tính $F$. ($1{,}08^{0{,}5}=1{,}0392$.)

3. **Hedging.** Nông dân sẽ bán 50 tấn lúa sau 3 tháng, khóa futures ở 6.000đ/kg. Tính doanh thu ròng nếu giá lúc bán là (a) 5.000đ, (b) 7.000đ. Nhận xét.

4. **Đòn bẩy.** Hợp đồng 800 triệu, ký quỹ 8% (64 triệu). Giá tăng 6%. Lời trên hợp đồng và % trên ký quỹ?

5. **Cháy tài khoản.** Cùng hợp đồng bài 4, giá giảm 8%. Lỗ bao nhiêu? So với ký quỹ — chuyện gì xảy ra?

---

## Lời giải chi tiết

### Bài 1 — Giá forward

$$F = 2.000.000 \times 1{,}05 = 2.100.000 \text{đ}$$

### Bài 2 — Forward 6 tháng

$$F = 1.000.000 \times 1{,}08^{0{,}5} = 1.000.000 \times 1{,}0392 = 1.039.200 \text{đ}$$

### Bài 3 — Hedging

Khóa giá 6.000đ/kg cho 50 tấn = 50.000 kg → doanh thu khóa $= 50.000 \times 6.000 = 300$ triệu.
- (a) Giá 5.000: bán thực 250 triệu, nhưng futures lời $50.000 \times 1.000 = 50$ triệu → ròng 300 triệu.
- (b) Giá 7.000: bán thực 350 triệu, futures lỗ $50.000 \times 1.000 = 50$ triệu → ròng 300 triệu.
- → Cả hai trường hợp doanh thu ròng **luôn 300 triệu** — đã khóa giá, hết rủi ro. Đánh đổi: ở (b) nông dân không hưởng phần giá cao.

### Bài 4 — Đòn bẩy

- Lời trên hợp đồng $= 800 \times 6\% = 48$ triệu.
- % trên ký quỹ $= 48 / 64 = 75\%$.
- → Giá chỉ +6% nhưng vốn lời +75% (đòn bẩy ~12,5×).

### Bài 5 — Cháy tài khoản

- Lỗ $= 800 \times 8\% = 64$ triệu.
- Ký quỹ chỉ có 64 triệu → **mất sạch ký quỹ (−100%)**. Nếu giá tiếp tục giảm, sẽ có **margin call** (phải nộp thêm tiền) hoặc bị buộc đóng vị thế. Đòn bẩy biến cú giảm 8% thành mất toàn bộ vốn.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính giá forward**: kéo S, r, T → giá forward (cost of carry), giải thích no-arbitrage.
  - **Mô phỏng hedging**: khóa giá futures → bảng/đồ thị cho thấy chi phí (hoặc doanh thu) ròng **phẳng** dù giá spot chạy.
  - **Đòn bẩy & ký quỹ**: kéo % ký quỹ & thay đổi giá → lời/lỗ % trên vốn, cảnh báo cháy tài khoản khi lỗ vượt ký quỹ.

---

## Bài tiếp theo

→ [Lesson 05 — Quản trị rủi ro](../lesson-05-risk-management/): đo rủi ro mất mát bằng **VaR (Value at Risk)** và **drawdown**, và dùng **mô phỏng Monte Carlo** để ước lượng phân phối kết quả.

**Tham khảo chéo:** quyền vs nghĩa vụ [`../lesson-02-options/`](../lesson-02-options/) · no-arbitrage [`../lesson-03-option-pricing/`](../lesson-03-option-pricing/) · phòng hộ ~ bảo hiểm [`../../01-PersonalFinance/lesson-07-risk-insurance/`](../../01-PersonalFinance/lesson-07-risk-insurance/).
