# Lesson 06 — Đường cong lợi suất (Yield Curve)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **đường cong lợi suất (yield curve)** — lợi suất theo kỳ hạn.
- Phân biệt 3 hình dạng: **dốc lên (normal)**, **phẳng (flat)**, **đảo ngược (inverted)**.
- Hiểu vì sao **đường cong đảo ngược** là tín hiệu suy thoái nổi tiếng.
- Nắm **lý thuyết kỳ vọng** và cách suy ra **lãi suất kỳ hạn (forward rate)** từ đường cong.

## Kiến thức tiền đề

- [Tầng 2 — Trái phiếu & lợi suất](../../02-Investing/lesson-03-bonds-yields/): YTM, quan hệ giá–lợi suất.
- [Tầng 1 — lãi kép](../../01-PersonalFinance/lesson-01-time-value-money/).

---

## 1. Đường cong lợi suất là gì

> 💡 **Trực giác / Hình dung.** Cho vay chính phủ 3 tháng được lãi bao nhiêu? 2 năm? 10 năm? 30 năm? Vẽ các lợi suất này theo kỳ hạn, nối lại → **đường cong lợi suất**. Nó cho thấy "giá của thời gian" trên thị trường nợ: thường vay càng dài lãi càng cao (đền bù rủi ro & bất định lâu hơn).

**Định nghĩa — Đường cong lợi suất:**

- **(a) Là gì** — đồ thị lợi suất của trái phiếu cùng chất lượng tín dụng (thường trái phiếu chính phủ) theo các **kỳ hạn** khác nhau.
- **(b) Vì sao quan trọng** — nó là "nhiệt kế" của nền kinh tế: hình dạng phản ánh kỳ vọng thị trường về lãi suất, lạm phát và tăng trưởng tương lai. Là tham chiếu định giá mọi khoản vay/nợ.
- **(c) Ví dụ** — lợi suất: 3 tháng 3%, 2 năm 3,8%, 10 năm 4,5%, 30 năm 4,8% → đường dốc lên (normal).

---

## 2. Ba hình dạng đường cong

> 💡 **Trực giác.** Hình dạng đường cong kể một câu chuyện về tương lai:

| Hình dạng | Mô tả | Thường ngụ ý |
|---|---|---|
| **Dốc lên (normal)** | lợi suất dài > ngắn | kinh tế bình thường/tăng trưởng, lạm phát ổn |
| **Phẳng (flat)** | dài ≈ ngắn | chuyển tiếp, bất định về hướng kinh tế |
| **Đảo ngược (inverted)** | lợi suất ngắn > dài | thị trường kỳ vọng lãi suất (và tăng trưởng) **giảm** → cảnh báo suy thoái |

**Walk-through đọc hình dạng (verify) — so lợi suất 10 năm vs 2 năm (chênh lệch "10Y−2Y"):**

| 2 năm | 10 năm | 10Y−2Y | Hình dạng |
|---|---|---|---|
| 3,0% | 4,5% | +1,5% | dốc lên (normal) |
| 4,0% | 4,1% | +0,1% | gần phẳng |
| 4,5% | 4,0% | −0,5% | **đảo ngược** |

→ Chỉ số **"10Y−2Y"** (spread) là cách nhanh đo độ dốc: dương = normal, âm = đảo ngược.

> 🔁 **Dừng lại tự kiểm tra.** Lợi suất 2 năm 5%, 10 năm 4,3%. Spread 10Y−2Y? Đường cong dạng gì?
> <details><summary>Đáp án</summary>Spread $= 4{,}3\% - 5\% = -0{,}7\%$ (âm) → đường cong **đảo ngược**.</details>

---

## 3. Vì sao đảo ngược báo hiệu suy thoái

> 💡 **Trực giác / Hình dung.** Bình thường vay dài lãi cao hơn (đền bù thời gian). Khi đường cong **đảo ngược** (ngắn > dài), nghĩa là thị trường tin lãi suất tương lai sẽ **thấp hơn hiện tại** — và lãi suất thường giảm khi ngân hàng trung ương **cắt lãi để cứu nền kinh tế suy thoái**. Vậy đảo ngược = thị trường đang "đặt cược" rằng kinh tế sắp xấu.

**Định nghĩa — Đảo ngược đường cong:**

- **(a) Là gì** — tình huống lợi suất ngắn hạn **cao hơn** dài hạn (spread âm).
- **(b) Vì sao là tín hiệu** — phản ánh kỳ vọng lãi suất giảm trong tương lai (suy thoái → cắt lãi). Về lịch sử (Mỹ), đảo ngược 10Y−2Y đi trước **hầu hết** các đợt suy thoái 6–18 tháng — một trong những chỉ báo dẫn dắt đáng tin nhất.
- **(c) Cơ chế bổ sung** — khi nhà đầu tư lo sợ, họ đổ vào trái phiếu dài hạn an toàn → giá dài hạn tăng → lợi suất dài hạn **giảm** (quan hệ nghịch, Tầng 2 Lesson 03) → đường cong đảo.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đảo ngược là chắc chắn suy thoái?"* — Không chắc chắn, nhưng là **chỉ báo dẫn dắt mạnh** trong lịch sử. Có "báo nhầm" (false positive). Nó là cảnh báo xác suất cao, không phải định mệnh.
> - *"Đảo ngược thì suy thoái ngay?"* — Không — thường có độ trễ 6–18 tháng. Đảo ngược báo "trong tầm 1–1,5 năm tới", không phải tức thì.

> ⚠ **Lỗi thường gặp.** Thấy đường cong đảo rồi bán tháo ngay. Độ trễ dài và thị trường có thể còn tăng nhiều tháng sau đảo ngược. Đây là chỉ báo vĩ mô, không phải tín hiệu giao dịch ngắn hạn.

---

## 4. Lý thuyết kỳ vọng & lãi suất kỳ hạn

> 💡 **Trực giác / Hình dung.** Lãi suất dài hạn ≈ trung bình các lãi suất ngắn hạn **kỳ vọng** trong tương lai. Nếu gửi 2 năm phải tương đương với gửi 1 năm rồi tái gửi thêm 1 năm (no-arbitrage) — từ đó suy ra thị trường **đang ngầm dự báo** lãi suất 1 năm tới là bao nhiêu: gọi là **lãi suất kỳ hạn (forward rate)**.

> 📐 **Công thức (lý thuyết kỳ vọng đơn giản):**
>
> $$(1 + r_2)^2 = (1 + r_1)(1 + f)$$
>
> với $r_1, r_2$ = lợi suất kỳ hạn 1 và 2 năm, $f$ = lãi suất kỳ hạn 1 năm bắt đầu sau 1 năm.

**Walk-through bằng số thật (verify) — $r_1 = 3\%$, $r_2 = 4\%$:**

$$1 + f = \frac{(1 + r_2)^2}{1 + r_1} = \frac{1{,}04^2}{1{,}03} = \frac{1{,}0816}{1{,}03} = 1{,}05010 \Rightarrow f = 5{,}01\%$$

→ Thị trường đang ngầm dự báo: lãi suất 1 năm, **bắt đầu sau 1 năm nữa**, là ~5,01%. Cao hơn cả $r_1$ và $r_2$ — đó là điều đường cong dốc lên "đang nói".

> ❓ **Câu hỏi tự nhiên.** *"Forward rate có đúng là dự báo không?"* — Là dự báo **ngầm** của thị trường (cộng phần bù kỳ hạn), không phải lời tiên tri chính xác. Nhưng nó cho biết thị trường đang định giá kỳ vọng gì — hữu ích để đối chiếu với quan điểm của bạn.

> 🔁 **Dừng lại tự kiểm tra.** $r_1 = 2\%$, $r_2 = 2\%$ (đường phẳng). Tính forward rate $f$.
> <details><summary>Đáp án</summary>$1+f = 1{,}02^2/1{,}02 = 1{,}02 \to f = 2\%$. Đường phẳng → thị trường kỳ vọng lãi suất không đổi.</details>

> 📝 **Tóm tắt toàn bài.**
> - **Đường cong lợi suất**: lợi suất theo kỳ hạn; "nhiệt kế" kỳ vọng kinh tế.
> - **3 hình dạng**: dốc lên (normal), phẳng, **đảo ngược** (ngắn > dài). Spread **10Y−2Y** đo độ dốc.
> - **Đảo ngược** = kỳ vọng lãi giảm → cảnh báo suy thoái (dẫn dắt 6–18 tháng, không tức thì, có thể báo nhầm).
> - **Forward rate** từ $(1+r_2)^2 = (1+r_1)(1+f)$ — dự báo ngầm của thị trường về lãi suất tương lai.

---

## Bài tập

1. **Spread.** Lợi suất 2 năm 3,5%, 10 năm 4,8%. Tính spread 10Y−2Y. Hình dạng?

2. **Đảo ngược.** Lợi suất 2 năm 5,2%, 10 năm 4,6%. Spread? Tín hiệu gì?

3. **Forward rate.** $r_1 = 4\%$, $r_2 = 5\%$. Tính lãi suất kỳ hạn $f$ (1 năm, bắt đầu sau 1 năm).

4. **Forward khi dốc xuống.** $r_1 = 5\%$, $r_2 = 4\%$ (đảo ngược). Tính $f$. Nhận xét so với $r_1$.

5. **Đọc tín hiệu.** Đường cong vừa đảo ngược. Bạn có nên bán hết cổ phiếu ngay hôm nay không? Giải thích.

---

## Lời giải chi tiết

### Bài 1 — Spread

$$\text{Spread} = 4{,}8\% - 3{,}5\% = +1{,}3\%$$

Dương → đường cong **dốc lên (normal)** — kinh tế bình thường.

### Bài 2 — Đảo ngược

$$\text{Spread} = 4{,}6\% - 5{,}2\% = -0{,}6\%$$

Âm → đường cong **đảo ngược** → cảnh báo suy thoái (thị trường kỳ vọng lãi suất/tăng trưởng giảm trong 6–18 tháng tới).

### Bài 3 — Forward rate

$$1 + f = \frac{1{,}05^2}{1{,}04} = \frac{1{,}1025}{1{,}04} = 1{,}06010 \Rightarrow f = 6{,}01\%$$

→ Thị trường ngầm dự báo lãi 1 năm sau 1 năm nữa ~6,01% (cao hơn hiện tại — đường dốc lên ngụ ý lãi tăng).

### Bài 4 — Forward khi dốc xuống

$$1 + f = \frac{1{,}04^2}{1{,}05} = \frac{1{,}0816}{1{,}05} = 1{,}03010 \Rightarrow f = 3{,}01\%$$

→ $f = 3{,}01\%$ **thấp hơn** $r_1 = 5\%$. Đường đảo ngược ngụ ý thị trường kỳ vọng lãi suất tương lai **giảm** — nhất quán với tín hiệu suy thoái.

### Bài 5 — Đọc tín hiệu

Không nên bán tháo ngay. Lý do: (1) đảo ngược có **độ trễ 6–18 tháng** trước suy thoái — thị trường có thể còn tăng nhiều tháng; (2) đôi khi **báo nhầm**; (3) đây là chỉ báo **vĩ mô dài hạn**, không phải tín hiệu giao dịch ngắn hạn. Phản ứng hợp lý: rà soát phân bổ tài sản, đảm bảo quỹ khẩn cấp & mức rủi ro phù hợp (Tầng 1-2), không hoảng loạn bán đáy.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy dựng đường cong**: kéo lợi suất từng kỳ hạn → vẽ đường cong, tự phân loại dốc lên / phẳng / đảo ngược, hiện spread 10Y−2Y.
  - **Tín hiệu suy thoái**: tạo đảo ngược → cảnh báo + giải thích cơ chế & độ trễ.
  - **Máy tính forward rate**: nhập $r_1, r_2$ → lãi suất kỳ hạn ngầm $f$.

---

## Bài tiếp theo

→ [Lesson 07 — Đọc báo cáo tài chính](../lesson-07-financial-statements/): ba báo cáo cốt lõi (cân đối kế toán, kết quả kinh doanh, lưu chuyển tiền), các tỷ số quan trọng, cách nhìn sức khỏe doanh nghiệp.

**Tham khảo chéo:** quan hệ giá–lợi suất [`../../02-Investing/lesson-03-bonds-yields/`](../../02-Investing/lesson-03-bonds-yields/) · lãi kép [`../../01-PersonalFinance/lesson-01-time-value-money/`](../../01-PersonalFinance/lesson-01-time-value-money/).
