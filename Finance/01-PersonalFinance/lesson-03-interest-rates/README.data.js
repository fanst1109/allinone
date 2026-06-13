// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-03-interest-rates/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Lãi suất: APR vs APY (Nominal vs Effective Rate)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **lãi suất danh nghĩa năm** (nominal, hay "APR" ghi trên hợp đồng) và **lãi suất hiệu dụng năm (APY / EAR)** — con số bạn **thực sự** nhận hoặc trả.
- Tính APY từ lãi danh nghĩa và tần suất ghép lãi: $APY = (1 + r/m)^m - 1$.
- Hiểu vì sao ghép lãi càng dày thì APY càng cao hơn lãi danh nghĩa.
- Vạch trần **bẫy lãi suất "phẳng" (flat rate)** trong vay trả góp — vì sao "1%/tháng" có thể thực chất là ~21,5%/năm.
- Biết nhìn đúng con số khi so sánh sản phẩm tiết kiệm / vay.

## Kiến thức tiền đề

- [Lesson 01 — Lãi kép](../lesson-01-time-value-money/): tần suất ghép lãi $(1+r/m)^{mt}$.
- [Lesson 02 — Lạm phát](../lesson-02-inflation/): lãi danh nghĩa vs thực (khác với danh nghĩa vs hiệu dụng ở bài này).

---

## 1. Hai con số "lãi suất" dễ bị nhầm

> 💡 **Trực giác / Hình dung.** Hai ngân hàng cùng quảng cáo "lãi 12%/năm". Ngân hàng A ghép lãi **mỗi năm**, ngân hàng B ghép lãi **mỗi tháng**. Cuối năm, B trả bạn nhiều hơn — dù cùng "12%". Con số 12% là **danh nghĩa**; số tiền thực bạn nhận quy ra phần trăm là **hiệu dụng**. Cùng một nhãn, hai kết quả.

**Định nghĩa — Lãi suất danh nghĩa năm (nominal / APR):**

- **(a) Là gì** — lãi suất công bố theo năm, **chưa tính** đến việc ghép lãi nhiều lần trong năm. Còn gọi là APR (Annual Percentage Rate) ở dạng cơ bản.
- **(b) Vì sao tồn tại** — là con số "niêm yết" tiện để ghi hợp đồng, nhưng **không** phản ánh đúng số tiền thực.
- **(c) Ví dụ** — "12%/năm ghép tháng" nghĩa là mỗi tháng tính $12\\%/12 = 1\\%$.

**Định nghĩa — Lãi suất hiệu dụng năm (APY / EAR — Effective Annual Rate):**

- **(a) Là gì** — phần trăm tăng **thực tế** sau một năm, đã tính đủ tác động ghép lãi.
- **(b) Vì sao cần** — đây là con số duy nhất so sánh công bằng giữa các sản phẩm có tần suất ghép khác nhau.
- **(c) Công thức:**

$$APY = \\left(1 + \\frac{r}{m}\\right)^m - 1$$

với $r$ = lãi danh nghĩa năm, $m$ = số lần ghép lãi/năm.

**Walk-through bằng số thật (verify) — $r = 12\\%$:**

| Tần suất ghép | $m$ | $APY = (1+0{,}12/m)^m - 1$ |
|---|---|---|
| Năm | 1 | $1{,}12 - 1 = 12{,}00\\%$ |
| Nửa năm | 2 | $1{,}06^2 - 1 = 12{,}36\\%$ |
| Quý | 4 | $1{,}03^4 - 1 = 12{,}55\\%$ |
| Tháng | 12 | $1{,}01^{12} - 1 = 12{,}68\\%$ |
| Ngày | 365 | $1{,}000329^{365} - 1 = 12{,}747\\%$ |
| Liên tục | $\\infty$ | $e^{0{,}12} - 1 = 12{,}750\\%$ |

→ Cùng "12% danh nghĩa", ghép tháng cho APY 12,68%. Trên 100 triệu, đó là chênh **680.000đ** so với 12% phẳng — nhỏ, nhưng càng vốn lớn / lãi cao càng đáng kể.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy khi gửi tiết kiệm tôi nên nhìn con số nào?"* — Nhìn **APY** (lãi hiệu dụng). Nếu ngân hàng chỉ ghi lãi danh nghĩa + tần suất ghép, tự tính APY để so sánh táo với táo.
> - *"APR và APY khác lãi danh nghĩa/thực ở Lesson 02 không?"* — Khác hẳn. Lesson 02: **danh nghĩa vs thực** = có/không trừ **lạm phát**. Bài này: **danh nghĩa vs hiệu dụng** = có/không tính **ghép lãi**. Một khoản có thể có cả ba con số.

> ⚠ **Lỗi thường gặp.** Cộng lãi: "1%/tháng = 12%/năm". Sai (dù gần đúng) — đó là APY $= 1{,}01^{12} - 1 = 12{,}68\\%$, không phải 12%. Lãi tháng ghép lại **luôn** cho năm cao hơn ×12.

> 🔁 **Dừng lại tự kiểm tra.** Lãi danh nghĩa 6%/năm ghép quý. APY bằng bao nhiêu?
> <details><summary>Đáp án</summary>$APY = (1 + 0{,}06/4)^4 - 1 = 1{,}015^4 - 1 = 1{,}06136 - 1 = 6{,}14\\%$.</details>

---

## 2. Vì sao ghép càng dày, APY càng cao

> 💡 **Trực giác.** Mỗi lần ghép lãi, phần lãi vừa sinh ra **bắt đầu tự sinh lãi sớm hơn**. Ghép tháng nghĩa là lãi tháng 1 đã đẻ lãi từ tháng 2, thay vì phải đợi hết năm. Ghép càng sớm/dày → lãi-đẻ-lãi càng nhiều → APY cao hơn. Nhưng phần tăng thêm **giảm dần** và chạm trần ở ghép liên tục $e^r - 1$ (đã thấy ở Lesson 01).

**4 ví dụ số (cùng $r$, đổi $m$) — $r = 10\\%$:**

| $m$ | APY |
|---|---|
| 1 (năm) | 10,00% |
| 4 (quý) | 10,38% |
| 12 (tháng) | 10,47% |
| ∞ (liên tục) | $e^{0{,}1}-1 = 10{,}517\\%$ |

→ Từ ghép năm lên ghép tháng tăng 0,47 điểm %; nhưng từ tháng lên liên tục chỉ thêm ~0,05. Lợi ích ghép dày bão hòa nhanh.

> 📝 **Ghi nhớ nhanh.** APY $\\geq$ lãi danh nghĩa, dấu "=" chỉ khi ghép đúng 1 lần/năm.

---

## 3. Bẫy lãi suất "phẳng" (Flat Rate) trong vay trả góp

> 💡 **Trực giác.** Đây là chỗ con số lãi suất lừa người nhất ở Việt Nam. Vay 120 triệu "lãi 1%/tháng", nhân viên nói "rẻ mà, mỗi tháng 1% thôi". Nhưng họ tính 1% trên **toàn bộ 120 triệu gốc ban đầu** suốt kỳ vay — trong khi bạn **đang trả dần gốc về**. Đến tháng cuối bạn chỉ còn nợ vài triệu nhưng vẫn bị tính lãi như đang nợ đủ 120 triệu. Lãi suất **thực** (trên dư nợ giảm dần) gần **gấp đôi** con số quảng cáo.

**Định nghĩa — hai cách tính lãi vay:**

- **Lãi trên dư nợ giảm dần (reducing balance)** — lãi mỗi kỳ tính trên **số còn nợ thực tế**. Công bằng, là chuẩn của lãi suất thực.
- **Lãi phẳng (flat rate)** — lãi mỗi kỳ tính trên **gốc ban đầu**, không đổi dù đã trả bớt. Tổng lãi cao hơn nhiều.

**Walk-through bằng số thật — vay 120 triệu, "1%/tháng", trả đều trong 12 tháng:**

*Cách phẳng (flat):*
- Lãi mỗi tháng $= 120 \\times 1\\% = 1{,}2$ triệu, cố định.
- Gốc mỗi tháng $= 120/12 = 10$ triệu.
- Trả mỗi tháng $= 10 + 1{,}2 = 11{,}2$ triệu. Tổng lãi cả năm $= 1{,}2 \\times 12 = 14{,}4$ triệu.

Nhưng dư nợ **trung bình** trong năm chỉ khoảng $120/2 = 60$ triệu (giảm đều từ 120 về 0). Trả 14,4 triệu lãi trên dư nợ trung bình ~60 triệu nghĩa là lãi thực:

$$\\text{Lãi thực} \\approx \\frac{14{,}4}{60} = 24\\% \\text{/năm}$$

Tính chính xác bằng cách giải lãi suất thực của dòng tiền (nhận 120 tr, trả 11,2 tr × 12) cho ra **APR thực ≈ 21,5%/năm** — gần gấp đôi "12%/năm" mà cách cộng phẳng gợi ý, và xa hơn nữa so với cảm giác "1%/tháng nghe rẻ".

> ❓ **Câu hỏi tự nhiên.**
> - *"Quy tắc nhẩm nhanh?"* — Với vay trả góp đều, **lãi suất thực ≈ gần gấp đôi lãi phẳng** (vì dư nợ trung bình ~ một nửa gốc). "1%/tháng phẳng" ≈ ~1,8–2%/tháng thực.
> - *"Làm sao tránh bị lừa?"* — Luôn hỏi: *"Lãi tính trên dư nợ gốc ban đầu hay dư nợ giảm dần?"* và yêu cầu con số **APR/APY thực**. Nhiều nước bắt buộc công bố APR thực để chống bẫy này.

> ⚠ **Lỗi thường gặp.** Lấy tổng lãi chia gốc chia số năm: $14{,}4/120 = 12\\%$ rồi tưởng đó là lãi suất. Sai — đó là **lãi phẳng**, bỏ qua việc gốc đã giảm dần. Lãi thực cao gần gấp đôi.

> 🔁 **Dừng lại tự kiểm tra.** Vay 60 triệu, lãi phẳng 0,8%/tháng, 10 tháng. Tổng lãi phẳng? Ước lượng lãi thực/năm.
> <details><summary>Đáp án</summary>Lãi phẳng/tháng $= 60 \\times 0{,}8\\% = 0{,}48$ tr; ×10 = 4,8 triệu tổng lãi. Lãi phẳng/năm ≈ $0{,}8\\% \\times 12 = 9{,}6\\%$. Lãi thực ≈ gần gấp đôi ≈ ~17–18%/năm.</details>

---

## 4. So sánh sản phẩm — luôn quy về một thước đo

> 💡 **Trực giác.** Tiết kiệm: chọn **APY cao nhất**. Vay: chọn **APR thực thấp nhất** (trên dư nợ giảm dần). Đừng để tần suất ghép hay cách tính "phẳng" che mắt.

**4 ví dụ so sánh tiết kiệm (chọn cái nào?):**

| Sản phẩm | Công bố | APY thực |
|---|---|---|
| A | 7,0% ghép năm | 7,00% |
| B | 6,9% ghép tháng | $1{,}00575^{12}-1 = 7{,}12\\%$ |
| C | 6,85% ghép ngày | $\\approx 7{,}09\\%$ |
| D | 7,1% ghép nửa năm | $1{,}0355^2-1 = 7{,}23\\%$ |

→ Dù A có con số niêm yết cao thứ nhì, **D thắng** (APY 7,23%) nhờ ghép. Xếp hạng theo APY khác hẳn xếp theo con số quảng cáo.

> 📝 **Tóm tắt toàn bài.**
> - **Danh nghĩa (APR)**: con số niêm yết, chưa tính ghép lãi. **Hiệu dụng (APY/EAR)**: số thực sau ghép, $APY = (1+r/m)^m - 1$.
> - Ghép càng dày → APY càng cao, nhưng bão hòa về $e^r - 1$ (liên tục).
> - **Bẫy lãi phẳng**: tính lãi trên gốc ban đầu thay vì dư nợ giảm dần → lãi thực ≈ **gần gấp đôi** con số phẳng.
> - **So sánh**: tiết kiệm chọn APY cao nhất; vay chọn APR thực (dư nợ giảm dần) thấp nhất.

---

## Bài tập

1. **APY cơ bản.** Lãi danh nghĩa 9%/năm ghép tháng. Tính APY.

2. **Tìm tần suất.** Hai sản phẩm: A = 8% ghép quý, B = 7,9% ghép tháng. Cái nào APY cao hơn?

3. **Ghép liên tục.** Lãi danh nghĩa 5%/năm ghép liên tục. APY?

4. **Bẫy lãi phẳng.** Vay 100 triệu, lãi phẳng 1%/tháng, trả đều 12 tháng. Tính tổng lãi và ước lượng lãi suất thực/năm.

5. **Số tiền thực nhận.** Gửi 200 triệu, 6%/năm ghép tháng, 3 năm. Tính số tiền cuối kỳ bằng APY.

---

## Lời giải chi tiết

### Bài 1 — APY cơ bản

$$APY = (1 + 0{,}09/12)^{12} - 1 = 1{,}0075^{12} - 1 = 1{,}09381 - 1 = 9{,}38\\%$$

### Bài 2 — So sánh

- **A:** $(1 + 0{,}08/4)^4 - 1 = 1{,}02^4 - 1 = 8{,}24\\%$.
- **B:** $(1 + 0{,}079/12)^{12} - 1 = 1{,}0065833^{12} - 1 = 8{,}19\\%$.

→ **A cao hơn** (8,24% vs 8,19%), dù con số niêm yết của A (8%) lớn hơn B (7,9%) và A ghép thưa hơn. Phải tính APY mới biết.

### Bài 3 — Ghép liên tục

$$APY = e^{0{,}05} - 1 = 1{,}05127 - 1 = 5{,}13\\%$$

### Bài 4 — Bẫy lãi phẳng

- Lãi phẳng/tháng $= 100 \\times 1\\% = 1$ triệu; tổng lãi $= 1 \\times 12 = 12$ triệu.
- Gốc/tháng $= 100/12 = 8{,}33$ triệu; trả/tháng $= 9{,}33$ triệu.
- Dư nợ trung bình $\\approx 100/2 = 50$ triệu → lãi thực $\\approx 12/50 = 24\\%$/năm (ước lượng thô).
- Giải chính xác dòng tiền (nhận 100, trả 9,33 ×12): **APR thực ≈ 21,5%/năm**.

Cách tiếp cận: con số "1%/tháng" gợi cảm giác 12%/năm, nhưng vì gốc giảm dần mà lãi vẫn tính trên 100 triệu, lãi thực gần gấp đôi. Đây là bài học quan trọng nhất của lesson.

### Bài 5 — Số tiền thực nhận

$APY = (1 + 0{,}06/12)^{12} - 1 = 1{,}005^{12} - 1 = 6{,}1678\\%$.

$$FV = 200 \\times (1 + 0{,}061678)^3 = 200 \\times 1{,}19668 = 239{,}34 \\text{ triệu}$$

Kiểm bằng công thức trực tiếp: $200 \\times 1{,}005^{36} = 200 \\times 1{,}19668 = 239{,}34$ ✓ (hai cách phải khớp).

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính APY**: nhập lãi danh nghĩa + tần suất ghép → APY, kèm bảng so sánh tất cả tần suất (năm → liên tục).
  - **Bẫy lãi phẳng vs dư nợ giảm dần**: nhập khoản vay → so sánh tổng lãi và lãi suất **thực** của hai cách tính, vẽ biểu đồ dư nợ giảm dần.
  - **So sánh sản phẩm tiết kiệm**: nhập nhiều sản phẩm (lãi + tần suất) → tự xếp hạng theo APY.

---

## Bài tiếp theo

→ [Lesson 04 — Nợ & khoản vay](../lesson-04-debt-loans/): lịch trả góp (amortization) chi tiết từng kỳ, thẻ tín dụng và lãi kép của nợ, vì sao trả tối thiểu là cái bẫy.

**Tham khảo chéo:** tần suất ghép lãi [\`../lesson-01-time-value-money/\`](../lesson-01-time-value-money/) · lãi thực sau lạm phát [\`../lesson-02-inflation/\`](../lesson-02-inflation/).
`;
