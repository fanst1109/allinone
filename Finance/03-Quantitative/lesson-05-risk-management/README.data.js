// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/03-Quantitative/lesson-05-risk-management/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Quản trị rủi ro: VaR & Monte Carlo

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu và tính **Value at Risk (VaR)** — "mất tối đa với độ tin cậy X% trong khoảng thời gian".
- Hiểu **drawdown** (sụt từ đỉnh) — thước đo "nỗi đau" thực tế của nhà đầu tư.
- Dùng **mô phỏng Monte Carlo** để ước lượng phân phối kết quả tương lai.
- Hiểu **giới hạn của VaR** (rủi ro đuôi, "thiên nga đen").

## Kiến thức tiền đề

- [Tầng 2 — Rủi ro & lợi nhuận](../../02-Investing/lesson-04-risk-return/): độ lệch chuẩn, phân phối chuẩn.
- [Lesson 01 — biến động & căn thời gian](../lesson-01-log-returns/).

---

## 1. Value at Risk (VaR)

> 💡 **Trực giác / Hình dung.** Sếp hỏi: *"Tệ nhất danh mục mình có thể mất bao nhiêu trong 1 ngày?"* Tệ nhất tuyệt đối = mất hết (vô dụng). VaR cho câu trả lời thực tế hơn: *"Với độ tin cậy 95%, mất không quá X trong 1 ngày."* Tức 95% số ngày lỗ ≤ X; chỉ 5% số ngày tệ hơn. VaR là **ngưỡng lỗ ở một mức tin cậy**.

**Định nghĩa — VaR:**

- **(a) Là gì** — khoản lỗ **tối đa** kỳ vọng không bị vượt với xác suất (độ tin cậy) cho trước, trong một khoảng thời gian.
- **(b) Vì sao cần** — gói rủi ro thành một con số tiền tệ duy nhất, dễ truyền đạt & giám sát (ngân hàng, quỹ dùng VaR làm hạn mức rủi ro).
- **(c) Công thức (giả định phân phối chuẩn):**

$$\\text{VaR} = z_\\alpha \\times \\sigma \\times V$$

với $V$ = giá trị danh mục, $\\sigma$ = độ biến động (cùng kỳ), $z_\\alpha$ = điểm z của mức tin cậy (95% → 1,645; 99% → 2,326).

**Walk-through bằng số thật (verify) — danh mục $V = 1.000$ triệu, biến động ngày $\\sigma = 2\\%$, tin cậy 95%:**

$$\\text{VaR}_{95\\%} = 1{,}645 \\times 0{,}02 \\times 1.000 = 32{,}9 \\text{ triệu}$$

→ "Với độ tin cậy 95%, danh mục không mất quá **32,9 triệu** trong 1 ngày." Nói cách khác: ~5% số ngày (1 trong 20) có thể mất **nhiều hơn** 32,9 triệu.

**4 ví dụ số ($V = 1.000$ triệu, $\\sigma$ ngày = 2%):**

| Độ tin cậy | $z$ | VaR ngày |
|---|---|---|
| 90% | 1,282 | 25,6 tr |
| 95% | 1,645 | 32,9 tr |
| 99% | 2,326 | 46,5 tr |
| 99,9% | 3,090 | 61,8 tr |

→ Tin cậy càng cao → VaR càng lớn (đòi hỏi "chắc chắn hơn" thì ngưỡng lỗ phải rộng hơn).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"VaR 95% = 33 triệu nghĩa là tối đa mất 33 triệu?"* — KHÔNG. Nghĩa là 95% thời gian mất ≤ 33 triệu; 5% thời gian còn lại có thể mất **nhiều hơn nữa** (VaR không cho biết tệ tới đâu — đó là nhược điểm lớn, mục 4).
> - *"VaR nhiều ngày tính sao?"* — Dùng căn thời gian (Lesson 01): $\\text{VaR}_T = \\text{VaR}_{\\text{ngày}} \\times \\sqrt{T}$.

> 🔁 **Dừng lại tự kiểm tra.** Danh mục 500 triệu, σ ngày 1,5%, tin cậy 99% (z=2,326). VaR ngày?
> <details><summary>Đáp án</summary>$\\text{VaR} = 2{,}326 \\times 0{,}015 \\times 500 = 17{,}4$ triệu.</details>

---

## 2. Drawdown — nỗi đau thực tế

> 💡 **Trực giác / Hình dung.** Danh mục bạn từng đạt đỉnh 1 tỷ, rồi rớt còn 700 triệu, rồi hồi. **Drawdown** là mức sụt từ đỉnh gần nhất: $-30\\%$ ở đáy đó. Đây là con số khiến người ta **mất ngủ và bán tháo** — quan trọng về mặt tâm lý hơn cả độ lệch chuẩn, vì nó đo "đã đau tới mức nào so với lúc giàu nhất".

**Định nghĩa — Drawdown & Max Drawdown:**

- **Drawdown** tại thời điểm $t$ $= \\dfrac{V_t - V_{\\text{đỉnh tới }t}}{V_{\\text{đỉnh}}}$ (luôn ≤ 0).
- **Maximum drawdown (MDD)** = drawdown tệ nhất trong cả giai đoạn.

**Walk-through (verify) — giá trị danh mục qua các tháng: 100 → 120 → 90 → 110 → 80:**

| Tháng | Giá trị | Đỉnh tới nay | Drawdown |
|---|---|---|---|
| 1 | 100 | 100 | 0% |
| 2 | 120 | 120 | 0% |
| 3 | 90 | 120 | $(90-120)/120 = -25\\%$ |
| 4 | 110 | 120 | $-8{,}3\\%$ |
| 5 | 80 | 120 | $(80-120)/120 = -33{,}3\\%$ |

→ **Max drawdown $= -33{,}3\\%$** (từ đỉnh 120 xuống đáy 80). Lưu ý drawdown tính từ **đỉnh cao nhất từng đạt**, không phải giá ban đầu.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao drawdown quan trọng hơn σ?"* — σ đo dao động trung bình; drawdown đo **trải nghiệm tồi tệ nhất liên tục**. Một danh mục σ vừa phải vẫn có thể MDD −50% (như 2008) — đủ để nhà đầu tư hoảng loạn bán đáy. MDD đo sức chịu đựng tâm lý cần có.

> ⚠ **Lỗi thường gặp.** Hồi phục sau drawdown cần lời **lớn hơn** mức sụt: mất 50% cần lời **+100%** mới về cũ (không phải +50%). Drawdown sâu rất khó gỡ.

---

## 3. Mô phỏng Monte Carlo

> 💡 **Trực giác / Hình dung.** Tương lai bất định — thay vì đoán một kết quả, ta **mô phỏng hàng nghìn kịch bản** ngẫu nhiên (mỗi cái là một đường giá theo GBM, Lesson 01), rồi xem **phân phối** các kết quả: trung vị bao nhiêu, kịch bản tệ 5% ra sao. Như "chơi lại cuộc đời danh mục 10.000 lần" để thấy dải khả năng.

**Định nghĩa — Monte Carlo:**

- **(a) Là gì** — phương pháp ước lượng phân phối kết quả bằng cách mô phỏng nhiều lần với đầu vào ngẫu nhiên.
- **(b) Vì sao cần** — nhiều bài toán (danh mục nhiều tài sản, rút tiền hưu trí) quá phức tạp cho công thức kín; mô phỏng cho ra phân phối đầy đủ, không chỉ trung bình.
- **(c) Ví dụ ứng dụng** — "Tôi rút 4%/năm khi hưu, xác suất hết tiền trước 30 năm là bao nhiêu?" → chạy 10.000 kịch bản thị trường, đếm % kịch bản cháy túi.

**Cách dùng kết quả:** sau 10.000 lần mô phỏng giá trị cuối, sắp xếp lại → **phân vị 5%** chính là một dạng VaR (kịch bản tệ 5%); **trung vị** là kỳ vọng "điển hình"; **phân vị 95%** là kịch bản tốt.

> ❓ **Câu hỏi tự nhiên.** *"Monte Carlo có chính xác không?"* — Chính xác bằng đúng **giả định đầu vào** (μ, σ, mô hình). Nếu giả định sai (vd bỏ qua đuôi béo), kết quả lạc quan quá. "Rác vào, rác ra" — đẹp về phương pháp không bù được giả định tồi.

---

## 4. Giới hạn của VaR — rủi ro đuôi

> 💡 **Trực giác.** VaR nói "95% thời gian mất không quá X" — nhưng **im lặng về 5% còn lại**. Năm 2008, các ngân hàng có VaR "đẹp" vẫn sụp, vì cú sốc nằm trong cái đuôi 5% mà VaR không mô tả. VaR đo "ngày bình thường tệ", không đo "ngày tận thế".

**Hai vấn đề lớn:**
- **Không đo độ sâu đuôi**: VaR cho **ngưỡng**, không cho biết vượt ngưỡng thì mất bao nhiêu. Khắc phục: **Expected Shortfall (CVaR)** — trung bình lỗ **trong** vùng đuôi.
- **Giả định phân phối chuẩn**: thực tế "đuôi béo" (Lesson Tầng 2) → cú sốc cực đoan **thường hơn** mô hình → VaR chuẩn **đánh giá thấp** rủi ro thật.

> ⚠ **Lỗi thường gặp (toy/giả định).** Tin "VaR thấp = an toàn". VaR thấp chỉ nói ngày thường ổn; nó **không** bảo vệ trước thiên nga đen. Quản trị rủi ro tốt cần thêm stress test, kịch bản cực đoan, và đệm vốn — không chỉ một con số VaR.

> 📝 **Tóm tắt toàn bài.**
> - **VaR** $= z_\\alpha \\sigma V$ — lỗ tối đa không vượt với độ tin cậy cho trước; KHÔNG phải lỗ tối đa tuyệt đối.
> - **Drawdown** = sụt từ đỉnh; **MDD** đo trải nghiệm tệ nhất; mất 50% cần +100% để gỡ.
> - **Monte Carlo**: mô phỏng nghìn kịch bản → phân phối kết quả; chính xác bằng giả định đầu vào.
> - **VaR im lặng về đuôi** → bổ sung Expected Shortfall, stress test; cẩn thận đuôi béo / thiên nga đen.

---

## Bài tập

1. **VaR cơ bản.** Danh mục 2.000 triệu, σ ngày 1,8%, tin cậy 95% (z=1,645). VaR ngày?

2. **VaR đổi độ tin cậy.** Cùng danh mục bài 1, tin cậy 99% (z=2,326). VaR ngày? So bài 1.

3. **VaR nhiều ngày.** VaR 1 ngày = 30 triệu. VaR 10 ngày (căn thời gian)?

4. **Max drawdown.** Giá trị: 100 → 130 → 110 → 140 → 95. Tính max drawdown.

5. **Gỡ drawdown.** Danh mục mất 40%. Cần lời bao nhiêu % để về vốn cũ?

---

## Lời giải chi tiết

### Bài 1 — VaR cơ bản

$$\\text{VaR}_{95\\%} = 1{,}645 \\times 0{,}018 \\times 2.000 = 59{,}2 \\text{ triệu}$$

### Bài 2 — VaR 99%

$$\\text{VaR}_{99\\%} = 2{,}326 \\times 0{,}018 \\times 2.000 = 83{,}7 \\text{ triệu}$$

So bài 1 (59,2): tin cậy cao hơn → VaR lớn hơn (đòi hỏi chắc chắn hơn thì ngưỡng lỗ rộng hơn). Chênh ~24,5 triệu.

### Bài 3 — VaR nhiều ngày

$$\\text{VaR}_{10} = \\text{VaR}_1 \\times \\sqrt{10} = 30 \\times 3{,}162 = 94{,}9 \\text{ triệu}$$

(Dùng quy luật căn thời gian — rủi ro tăng theo √số ngày, không tuyến tính.)

### Bài 4 — Max drawdown

| Giá trị | Đỉnh | Drawdown |
|---|---|---|
| 100 | 100 | 0% |
| 130 | 130 | 0% |
| 110 | 130 | −15,4% |
| 140 | 140 | 0% |
| 95 | 140 | $(95-140)/140 = -32{,}1\\%$ |

Max drawdown $= -32{,}1\\%$ (từ đỉnh 140 xuống 95).

### Bài 5 — Gỡ drawdown

Mất 40% → còn 60% vốn. Để về 100%: cần nhân $100/60 = 1{,}667$ → lời **+66,7%**.

Cách tiếp cận: gỡ lỗ cần lời lớn hơn mức mất, vì tính trên vốn nhỏ hơn. Công thức: lời cần $= \\dfrac{1}{1 - \\text{loss}} - 1 = \\dfrac{1}{0{,}6} - 1 = 66{,}7\\%$.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính VaR**: kéo giá trị danh mục, σ, độ tin cậy → VaR, minh họa trên đường chuông (vùng đuôi 5%).
  - **Mô phỏng Monte Carlo**: chạy hàng trăm đường GBM → histogram giá trị cuối, đánh dấu phân vị 5%/trung vị/95%.
  - **Drawdown**: đường giá trị + vùng tô drawdown, hiển thị max drawdown và "lời cần để gỡ".

---

## Bài tiếp theo

→ [Lesson 06 — Đường cong lợi suất](../lesson-06-yield-curve/): đường cong lợi suất là gì, vì sao **đảo ngược** báo hiệu suy thoái, kỳ hạn & kỳ vọng lãi suất.

**Tham khảo chéo:** độ lệch chuẩn & phân phối [\`../../02-Investing/lesson-04-risk-return/\`](../../02-Investing/lesson-04-risk-return/) · căn thời gian [\`../lesson-01-log-returns/\`](../lesson-01-log-returns/).
`;
