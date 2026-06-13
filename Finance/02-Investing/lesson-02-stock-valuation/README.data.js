// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/02-Investing/lesson-02-stock-valuation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Cổ phiếu & Định giá (Stocks & Valuation)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **cổ phiếu (stock)** là gì: quyền sở hữu một phần doanh nghiệp, hai nguồn lợi nhuận (**cổ tức** + **lãi vốn**).
- Phân biệt **giá (price)** và **giá trị nội tại (intrinsic value)** — vì sao chúng khác nhau.
- Định giá cổ phiếu bằng **chiết khấu dòng cổ tức** và **mô hình tăng trưởng Gordon**: $P = \\dfrac{D}{r - g}$.
- Đọc và dùng tỷ số **P/E (price-to-earnings)**.
- Hiểu vì sao **giá cổ phiếu dao động** mạnh.

## Kiến thức tiền đề

- [Tầng 1 — Giá trị hiện tại & chiết khấu](../../01-PersonalFinance/lesson-01-time-value-money/): $PV = FV/(1+r)^n$.
- [Lesson 01 — Các lớp tài sản](../lesson-01-asset-classes/): cổ phiếu = sở hữu doanh nghiệp, equity risk premium.

---

## 1. Cổ phiếu là gì?

> 💡 **Trực giác / Hình dung.** Một công ty chia quyền sở hữu thành hàng triệu "miếng bánh" gọi là **cổ phần**. Mua 1 cổ phiếu = sở hữu 1 miếng → bạn là **chủ một phần** công ty, hưởng phần lợi nhuận tương ứng. Không phải cho vay (như trái phiếu) mà là **làm chủ**.

**Định nghĩa — Cổ phiếu:**

- **(a) Là gì** — chứng nhận quyền sở hữu một phần vốn của doanh nghiệp; cổ đông là đồng chủ sở hữu.
- **(b) Vì sao tồn tại** — doanh nghiệp bán cổ phần để huy động vốn (không phải vay, không phải trả lãi); nhà đầu tư mua để hưởng tăng trưởng & lợi nhuận của công ty.
- **(c) Hai nguồn lợi nhuận:**
  - **Cổ tức (dividend)**: phần lợi nhuận công ty chia cho cổ đông định kỳ.
  - **Lãi vốn (capital gain)**: chênh lệch giá khi bán cao hơn giá mua.

**Ví dụ số:** mua 100 cổ phiếu giá 50.000đ (tổng 5 triệu). Năm sau nhận cổ tức 2.000đ/cp (200.000đ) và giá lên 58.000đ. Lợi nhuận = lãi vốn $100 \\times 8.000 = 800.000$đ + cổ tức $200.000$đ = 1 triệu → $1.000.000/5.000.000 = 20\\%$.

> ⚠ **Lỗi thường gặp.** Nghĩ "mua cổ phiếu là mua một con số nhảy nhót". Cổ phiếu là **phần sở hữu doanh nghiệp thật** — giá trị cuối cùng đến từ khả năng công ty tạo ra lợi nhuận, không phải từ đồ thị.

---

## 2. Giá vs Giá trị nội tại

> 💡 **Trực giác.** **Giá** là con số thị trường đang giao dịch (do cung–cầu, tâm lý). **Giá trị nội tại** là "giá trị thật" dựa trên dòng tiền tương lai công ty tạo ra. Người đầu tư giỏi tìm lúc **giá < giá trị** (mua hời) — như mua món đồ tốt đang giảm giá.

**Định nghĩa — Giá trị nội tại (intrinsic value):**

- **(a) Là gì** — tổng **giá trị hiện tại (PV)** của mọi dòng tiền tương lai mà cổ phiếu sẽ mang lại (chủ yếu là cổ tức).
- **(b) Vì sao cần** — để biết một cổ phiếu "đắt hay rẻ" so với giá trị thật, thay vì chạy theo giá thị trường.
- **(c) Nguyên tắc** — giá trị một tài sản = PV của dòng tiền nó tạo ra (đúng cho cả cổ phiếu, trái phiếu, BĐS). Đây là áp dụng trực tiếp chiết khấu ở Tầng 1.

> ❓ **Câu hỏi tự nhiên.** *"Nếu thị trường hiệu quả thì giá = giá trị, sao còn định giá?"* — Thị trường **gần** hiệu quả nhưng không hoàn hảo; tâm lý đám đông tạo lúc quá hưng phấn (giá > giá trị) hoặc hoảng loạn (giá < giá trị). Định giá giúp nhận ra chênh lệch. (Tranh luận hiệu quả thị trường: [Lesson 07](../lesson-07-efficient-markets/).)

---

## 3. Định giá bằng chiết khấu cổ tức — Mô hình Gordon

> 💡 **Trực giác / Hình dung.** Một cổ phiếu trả cổ tức mãi mãi, tăng đều mỗi năm, giống một "dòng suối tiền" chảy vô tận và ngày càng to. Giá trị của nó = tổng PV của cả dòng suối đó. Toán học rút gọn dòng vô hạn tăng trưởng đều thành một công thức cực gọn.

> 📐 **Mô hình tăng trưởng Gordon (Gordon Growth Model):**
>
> $$P = \\frac{D_1}{r - g}$$
>
> với $D_1$ = cổ tức kỳ tới, $r$ = tỷ suất lợi nhuận yêu cầu (discount rate), $g$ = tốc độ tăng cổ tức đều (với $g < r$).

**Walk-through bằng số thật (verify) — cổ tức năm tới $D_1 = 3.000$đ, yêu cầu $r = 10\\%$, tăng trưởng $g = 4\\%$:**

$$P = \\frac{3.000}{0{,}10 - 0{,}04} = \\frac{3.000}{0{,}06} = 50.000 \\text{đ/cp}$$

→ Giá trị nội tại 50.000đ. Nếu thị trường bán 42.000đ → có thể đang rẻ; bán 65.000đ → có thể đang đắt.

**4 ví dụ số (verify cảm giác công thức):**

| $D_1$ | r | g | $P = D_1/(r-g)$ |
|---|---|---|---|
| 3.000 | 10% | 4% | 50.000 |
| 3.000 | 10% | 0% | 30.000 |
| 3.000 | 8% | 4% | 75.000 |
| 5.000 | 12% | 5% | 71.429 |

→ Quan sát: $g$ tăng (4%→ gần r) làm giá **vọt lên**; $r$ tăng (yêu cầu lợi nhuận cao hơn) làm giá **giảm**. Mẫu số $r - g$ càng nhỏ, giá càng nhạy.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao cần $g < r$?"* — Nếu $g \\geq r$, mẫu số $\\leq 0$ → công thức cho giá vô hạn/âm, vô nghĩa. Về kinh tế: không công ty nào tăng cổ tức nhanh hơn lợi nhuận yêu cầu **mãi mãi** (sẽ to hơn cả nền kinh tế).
> - *"Công ty không trả cổ tức thì định giá sao?"* — Dùng mô hình chiết khấu **dòng tiền tự do (DCF)** tổng quát hơn, hoặc cổ tức kỳ vọng trong tương lai. Gordon là trường hợp đơn giản nhất để hiểu nguyên lý.

> ⚠ **Lỗi thường gặp.** Lấy $g$ quá cao (vd 9% khi $r=10\\%$) → mẫu số 1% → giá phóng đại khủng khiếp. Mô hình **cực nhạy** với $g$; dùng $g$ thực tế, bền vững (thường ≤ tăng trưởng GDP dài hạn).

> 🔁 **Dừng lại tự kiểm tra.** $D_1 = 4.000$đ, $r = 9\\%$, $g = 3\\%$. Giá trị nội tại?
> <details><summary>Đáp án</summary>$P = 4.000/(0{,}09 - 0{,}03) = 4.000/0{,}06 = 66.667$đ.</details>

---

## 4. Tỷ số P/E (Price-to-Earnings)

> 💡 **Trực giác.** P/E trả lời: *"Tôi phải trả bao nhiêu đồng giá để mua 1 đồng lợi nhuận/năm của công ty?"* P/E = 15 nghĩa là trả 15 đồng cho mỗi 1 đồng EPS — hay "mất 15 năm lợi nhuận để hoàn vốn nếu lợi nhuận không đổi".

**Định nghĩa — P/E:**

- **(a) Là gì** — tỷ số giá cổ phiếu chia cho **lợi nhuận trên mỗi cổ phiếu (EPS — earnings per share)**: $P/E = \\dfrac{\\text{Giá}}{EPS}$.
- **(b) Vì sao dùng** — thước đo nhanh xem cổ phiếu "đắt hay rẻ" tương đối, và so sánh giữa các công ty/ngành.
- **(c) Walk-through:** giá 60.000đ, EPS 4.000đ → $P/E = 60.000/4.000 = 15$. Nghịch đảo $1/15 = 6{,}7\\%$ là **earnings yield** (lợi suất lợi nhuận).

**4 ví dụ số:**

| Giá | EPS | P/E | Diễn giải |
|---|---|---|---|
| 30.000 | 3.000 | 10 | tương đối rẻ / tăng trưởng thấp |
| 60.000 | 4.000 | 15 | trung bình |
| 100.000 | 4.000 | 25 | đắt / kỳ vọng tăng trưởng cao |
| 80.000 | 1.000 | 80 | rất đắt / kỳ vọng bùng nổ |

> ❓ **Câu hỏi tự nhiên.**
> - *"P/E cao là xấu?"* — Không hẳn. P/E cao = thị trường kỳ vọng lợi nhuận **tăng mạnh** trong tương lai. Rủi ro: nếu tăng trưởng không như kỳ vọng, giá rớt mạnh. P/E thấp có thể là "rẻ" hoặc "công ty đang gặp vấn đề".
> - *"P/E bao nhiêu là hợp lý?"* — Tùy ngành & tăng trưởng; phải so với công ty cùng ngành và lịch sử của chính nó, không có con số tuyệt đối.

> ⚠ **Lỗi thường gặp.** So P/E giữa các ngành khác nhau (vd công nghệ vs ngân hàng) rồi kết luận. Mỗi ngành có mức P/E "bình thường" riêng do đặc tính tăng trưởng khác nhau.

> 📝 **Tóm tắt toàn bài.**
> - **Cổ phiếu** = sở hữu một phần doanh nghiệp; lợi nhuận từ **cổ tức + lãi vốn**.
> - **Giá ≠ giá trị nội tại**; giá trị = PV dòng tiền tương lai.
> - **Gordon**: $P = D_1/(r-g)$, cần $g < r$, cực nhạy với $g$.
> - **P/E** = giá / EPS = "trả bao nhiêu cho 1 đồng lợi nhuận"; cao = kỳ vọng tăng trưởng cao, so trong cùng ngành.

---

## Bài tập

1. **Lợi nhuận cổ phiếu.** Mua 200 cp giá 40.000đ. Năm sau cổ tức 1.500đ/cp, giá lên 45.000đ. Tính tổng lợi nhuận (đ) và tỷ suất (%).

2. **Gordon cơ bản.** $D_1 = 2.500$đ, $r = 11\\%$, $g = 5\\%$. Tính giá trị nội tại.

3. **Độ nhạy với g.** Giữ $D_1 = 2.500$đ, $r = 11\\%$. Tính giá khi $g = 5\\%$ và $g = 8\\%$. Nhận xét.

4. **P/E.** Cổ phiếu giá 90.000đ, EPS 6.000đ. Tính P/E và earnings yield.

5. **Đắt hay rẻ?** Cổ phiếu A: giá 50.000đ, $D_1 = 3.500$đ, $r = 12\\%$, $g = 5\\%$. Tính giá trị nội tại và so với giá thị trường — nên mua không?

---

## Lời giải chi tiết

### Bài 1 — Lợi nhuận cổ phiếu

- Lãi vốn $= 200 \\times (45.000 - 40.000) = 200 \\times 5.000 = 1.000.000$đ.
- Cổ tức $= 200 \\times 1.500 = 300.000$đ.
- Tổng $= 1.300.000$đ; vốn bỏ ra $200 \\times 40.000 = 8.000.000$đ.
- Tỷ suất $= 1.300.000 / 8.000.000 = 16{,}25\\%$.

### Bài 2 — Gordon cơ bản

$$P = \\frac{2.500}{0{,}11 - 0{,}05} = \\frac{2.500}{0{,}06} = 41.667 \\text{đ}$$

### Bài 3 — Độ nhạy với g

- $g = 5\\%$: $P = 2.500/(0{,}11 - 0{,}05) = 2.500/0{,}06 = 41.667$đ.
- $g = 8\\%$: $P = 2.500/(0{,}11 - 0{,}08) = 2.500/0{,}03 = 83.333$đ.

→ Tăng $g$ từ 5% lên 8% (chỉ 3 điểm %) làm giá **gấp đôi**. Mô hình cực nhạy với $g$ — sai một chút trong giả định tăng trưởng làm định giá lệch khủng khiếp.

### Bài 4 — P/E

- $P/E = 90.000 / 6.000 = 15$.
- Earnings yield $= 1/15 = 6{,}67\\%$.

### Bài 5 — Đắt hay rẻ?

$$\\text{Giá trị nội tại} = \\frac{3.500}{0{,}12 - 0{,}05} = \\frac{3.500}{0{,}07} = 50.000 \\text{đ}$$

Giá trị nội tại = 50.000đ = đúng bằng giá thị trường → cổ phiếu **định giá hợp lý** (fair value). Không rõ ràng hời; quyết định mua phụ thuộc bạn có tin $g, r$ này không. Nếu bạn nghĩ $g$ thực ra cao hơn (vd 6%) → giá trị $= 3.500/0{,}06 = 58.333$ → rẻ → đáng mua.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy định giá Gordon**: kéo $D_1$, $r$, $g$ → giá trị nội tại, đồ thị độ nhạy theo $g$ (thấy giá vọt khi $g$ tiến gần $r$).
  - **So giá vs giá trị**: nhập giá thị trường → báo "rẻ / hợp lý / đắt" so với giá trị nội tại.
  - **Khám phá P/E**: nhập giá & EPS → P/E, earnings yield, và "số năm hoàn vốn".

---

## Bài tiếp theo

→ [Lesson 03 — Trái phiếu & lợi suất](../lesson-03-bonds-yields/): trái phiếu hoạt động thế nào, định giá bằng chiết khấu coupon, vì sao giá trái phiếu **giảm khi lãi suất tăng**, và khái niệm duration.

**Tham khảo chéo:** chiết khấu PV [\`../../01-PersonalFinance/lesson-01-time-value-money/\`](../../01-PersonalFinance/lesson-01-time-value-money/) · hiệu quả thị trường [Lesson 07](../lesson-07-efficient-markets/).
`;
