// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/02-Investing/lesson-06-capm-beta/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — CAPM & Beta (Capital Asset Pricing Model)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **beta ($\\beta$)** đo **rủi ro hệ thống** của một tài sản so với thị trường.
- Hiểu và áp dụng **mô hình CAPM**: $E[R] = R_f + \\beta(R_m - R_f)$.
- Diễn giải beta: $\\beta > 1$ (tấn công), $\\beta < 1$ (phòng thủ), $\\beta < 0$ (ngược thị trường).
- Hiểu **đường thị trường chứng khoán (Security Market Line — SML)**.
- Tính beta của một danh mục.

## Kiến thức tiền đề

- [Lesson 05 — rủi ro hệ thống vs phi hệ thống](../lesson-05-diversification/): thị trường chỉ trả công cho rủi ro hệ thống.
- [Lesson 01 — equity risk premium](../lesson-01-asset-classes/).

---

## 1. Beta — đo rủi ro hệ thống

> 💡 **Trực giác / Hình dung.** Lesson 05 cho thấy đa dạng hóa xóa được rủi ro riêng, chỉ còn rủi ro **hệ thống** (cùng thị trường lên xuống). Beta trả lời: *"Khi thị trường nhúc nhích 1%, cổ phiếu này nhúc nhích bao nhiêu?"* Beta = 1,5 nghĩa là khi thị trường tăng 10%, cổ phiếu này có xu hướng tăng ~15% — và giảm ~15% khi thị trường giảm 10%. Nó là "hệ số khuếch đại" theo thị trường.

**Định nghĩa — Beta ($\\beta$):**

- **(a) Là gì** — độ nhạy của lợi nhuận một tài sản với lợi nhuận thị trường; đo rủi ro hệ thống (không xóa được bằng đa dạng hóa).
- **(b) Vì sao cần** — vì thị trường chỉ "trả công" cho rủi ro hệ thống (Lesson 05), ta cần một thước đo riêng cho phần rủi ro đó. Độ lệch chuẩn đo **tổng** rủi ro; beta đo **phần hệ thống**.
- **(c) Cách đọc:**

| Beta | Ý nghĩa | Ví dụ điển hình |
|---|---|---|
| $\\beta = 1$ | nhúc nhích đúng bằng thị trường | quỹ chỉ số toàn thị trường |
| $\\beta > 1$ | khuếch đại (tấn công, rủi ro cao) | cổ phiếu công nghệ, đòn bẩy |
| $0 < \\beta < 1$ | nhẹ hơn thị trường (phòng thủ) | tiện ích, hàng thiết yếu |
| $\\beta = 0$ | không liên quan thị trường | tín phiếu kho bạc |
| $\\beta < 0$ | ngược thị trường | đôi khi vàng, một số phái sinh |

> ❓ **Câu hỏi tự nhiên.** *"Beta khác độ lệch chuẩn thế nào?"* — σ đo **tổng** dao động (cả riêng lẻ lẫn hệ thống). Beta chỉ đo phần **đồng pha với thị trường**. Một cổ phiếu có thể σ cao nhưng beta thấp (dao động mạnh nhưng không theo thị trường).

> 🔁 **Dừng lại tự kiểm tra.** Cổ phiếu beta 0,5. Thị trường giảm 20%. Cổ phiếu dự kiến đổi bao nhiêu (chỉ tính phần hệ thống)?
> <details><summary>Đáp án</summary>$0{,}5 \\times (-20\\%) = -10\\%$ — giảm nhẹ hơn thị trường (phòng thủ).</details>

---

## 2. Mô hình CAPM

> 💡 **Trực giác / Hình dung.** CAPM trả lời câu hỏi cốt lõi: *"Một tài sản với rủi ro hệ thống beta nên cho lợi nhuận kỳ vọng bao nhiêu mới công bằng?"* Logic: bắt đầu từ lãi phi rủi ro $R_f$ (cái bạn được dù không gánh rủi ro), rồi **cộng phần thưởng cho rủi ro** = beta × phần bù rủi ro thị trường. Rủi ro hệ thống càng cao (beta lớn) → đòi hỏi lợi nhuận càng cao.

> 📐 **Công thức CAPM:**
>
> $$E[R] = R_f + \\beta\\,(R_m - R_f)$$
>
> với $R_f$ = lãi phi rủi ro, $R_m$ = lợi nhuận kỳ vọng thị trường, $(R_m - R_f)$ = **phần bù rủi ro thị trường (market risk premium)**.

**Walk-through bằng số thật (verify) — $R_f = 3\\%$, $R_m = 9\\%$ (phần bù 6%), $\\beta = 1{,}3$:**

$$E[R] = 3\\% + 1{,}3 \\times (9\\% - 3\\%) = 3\\% + 1{,}3 \\times 6\\% = 3\\% + 7{,}8\\% = 10{,}8\\%$$

→ Tài sản này nên cho lợi nhuận kỳ vọng **10,8%** để bù rủi ro hệ thống beta 1,3. Nếu thực tế nó chỉ hứa 8% → định giá quá cao (lợi nhuận không bù rủi ro); nếu hứa 13% → hấp dẫn (lợi nhuận vượt mức công bằng).

**4 ví dụ số ($R_f = 3\\%$, $R_m = 9\\%$):**

| β | $E[R] = 3\\% + \\beta \\times 6\\%$ | Loại |
|---|---|---|
| 0 | 3,0% | phi rủi ro |
| 0,5 | 6,0% | phòng thủ |
| 1,0 | 9,0% | bằng thị trường |
| 1,8 | 13,8% | tấn công |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao β=0 cho đúng $R_f$?"* — Không rủi ro hệ thống → không đáng được thưởng rủi ro → chỉ nhận lãi phi rủi ro.
> - *"CAPM có đúng trong thực tế?"* — Là **mô hình đơn giản hóa** (giả định nhiều thứ lý tưởng). Thực tế lợi nhuận không hoàn toàn khớp CAPM; có các yếu tố khác (quy mô, giá trị, momentum). Nhưng CAPM là nền tảng tư duy "lợi nhuận = phần thưởng cho rủi ro hệ thống".

> ⚠ **Lỗi thường gặp.** Dùng **tổng** rủi ro (σ) trong CAPM thay vì beta. CAPM chỉ thưởng **rủi ro hệ thống (beta)** — vì rủi ro phi hệ thống đa dạng hóa xóa được, không ai trả công cho nó.

> 🔁 **Dừng lại tự kiểm tra.** $R_f = 2\\%$, $R_m = 8\\%$, $\\beta = 1{,}5$. Lợi nhuận kỳ vọng theo CAPM?
> <details><summary>Đáp án</summary>$E[R] = 2\\% + 1{,}5 \\times (8\\% - 2\\%) = 2\\% + 9\\% = 11\\%$.</details>

---

## 3. Đường thị trường chứng khoán (Security Market Line — SML)

> 💡 **Trực giác / Hình dung.** Vẽ CAPM lên đồ thị: trục ngang beta, trục dọc lợi nhuận kỳ vọng. CAPM là một **đường thẳng** đi từ $(0, R_f)$ với độ dốc = phần bù rủi ro thị trường. Đó là **SML** — "giá công bằng" của lợi nhuận theo rủi ro hệ thống. Cổ phiếu nằm **trên** đường (lợi nhuận cao hơn mức công bằng) là hấp dẫn (định giá thấp); nằm **dưới** đường là đắt.

**Định nghĩa — SML:**

- **(a) Là gì** — đường thẳng biểu diễn CAPM: lợi nhuận kỳ vọng theo beta.
- **(b) Vì sao hữu ích** — chấm một cổ phiếu lên đồ thị (beta, lợi nhuận kỳ vọng thực tế) so với SML để biết nó đang được định giá hời hay đắt.
- **(c) Cách đọc** — trên SML → undervalued (mua); dưới SML → overvalued (tránh); trên SML → định giá đúng.

> ❓ **Câu hỏi tự nhiên.** *"Khác biên hiệu quả (Lesson 05) thế nào?"* — Biên hiệu quả vẽ theo **tổng rủi ro σ** (cho danh mục). SML vẽ theo **rủi ro hệ thống beta** (cho tài sản đơn lẻ trong danh mục đã đa dạng hóa). Hai góc nhìn bổ sung nhau.

---

## 4. Beta của danh mục

> 💡 **Trực giác.** Beta của danh mục đơn giản là **trung bình có trọng số** beta các tài sản — khác với rủi ro σ (phải tính tương quan phức tạp). Điều này khiến beta tiện dụng để điều chỉnh mức rủi ro hệ thống của cả danh mục.

**Công thức & walk-through (verify):**

$$\\beta_p = \\sum w_i \\beta_i$$

Danh mục: 50% cổ phiếu beta 1,4 + 30% beta 0,8 + 20% tiền mặt beta 0:

$$\\beta_p = 0{,}5 \\times 1{,}4 + 0{,}3 \\times 0{,}8 + 0{,}2 \\times 0 = 0{,}70 + 0{,}24 + 0 = 0{,}94$$

→ Danh mục beta 0,94 — hơi phòng thủ hơn thị trường. Muốn tấn công hơn → tăng tỷ trọng cổ phiếu beta cao.

> 📝 **Tóm tắt toàn bài.**
> - **Beta** đo rủi ro **hệ thống**: độ nhạy với thị trường. β>1 tấn công, β<1 phòng thủ, β=0 phi rủi ro hệ thống.
> - **CAPM**: $E[R] = R_f + \\beta(R_m - R_f)$ — lợi nhuận công bằng = phi rủi ro + thưởng cho rủi ro hệ thống.
> - **SML**: đường CAPM; trên đường = hời, dưới đường = đắt.
> - **Beta danh mục** = trung bình trọng số beta — tiện điều chỉnh rủi ro hệ thống.

---

## Bài tập

1. **Đọc beta.** Cổ phiếu beta 1,6. Thị trường tăng 10%. Cổ phiếu dự kiến đổi bao nhiêu (phần hệ thống)? Nếu thị trường giảm 10%?

2. **CAPM cơ bản.** $R_f = 4\\%$, $R_m = 10\\%$, $\\beta = 1{,}2$. Tính lợi nhuận kỳ vọng.

3. **Định giá hời/đắt.** Dùng số bài 2. Một cổ phiếu beta 1,2 đang được kỳ vọng cho 13%. Theo CAPM nên cho bao nhiêu? Cổ phiếu này hời hay đắt?

4. **Beta phòng thủ.** $R_f = 3\\%$, $R_m = 9\\%$. Cổ phiếu tiện ích beta 0,4. Lợi nhuận kỳ vọng? Vì sao thấp?

5. **Beta danh mục.** 40% A (beta 1,5) + 40% B (beta 0,9) + 20% trái phiếu (beta 0,1). Tính beta danh mục.

---

## Lời giải chi tiết

### Bài 1 — Đọc beta

- Thị trường +10%: cổ phiếu $\\approx 1{,}6 \\times 10\\% = +16\\%$.
- Thị trường −10%: cổ phiếu $\\approx 1{,}6 \\times (-10\\%) = -16\\%$.
- → Beta > 1 khuếch đại cả hai chiều: lời mạnh hơn khi lên, lỗ mạnh hơn khi xuống.

### Bài 2 — CAPM cơ bản

$$E[R] = 4\\% + 1{,}2 \\times (10\\% - 4\\%) = 4\\% + 1{,}2 \\times 6\\% = 4\\% + 7{,}2\\% = 11{,}2\\%$$

### Bài 3 — Hời hay đắt

- CAPM cho lợi nhuận công bằng = 11,2% (bài 2).
- Cổ phiếu kỳ vọng cho **13%** > 11,2% → lợi nhuận **vượt** mức công bằng cho rủi ro của nó → **hời** (nằm trên SML, đáng mua).

### Bài 4 — Beta phòng thủ

$$E[R] = 3\\% + 0{,}4 \\times (9\\% - 3\\%) = 3\\% + 2{,}4\\% = 5{,}4\\%$$

Thấp vì rủi ro hệ thống nhỏ (beta 0,4): cổ phiếu tiện ích ít nhạy với thị trường (người ta vẫn dùng điện nước khi suy thoái) → ít rủi ro hệ thống → phần thưởng rủi ro nhỏ.

### Bài 5 — Beta danh mục

$$\\beta_p = 0{,}4 \\times 1{,}5 + 0{,}4 \\times 0{,}9 + 0{,}2 \\times 0{,}1 = 0{,}60 + 0{,}36 + 0{,}02 = 0{,}98$$

→ Danh mục beta 0,98 — gần như đúng bằng thị trường.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính CAPM**: kéo $R_f$, $R_m$, beta → lợi nhuận kỳ vọng, tách phần phi rủi ro + phần thưởng rủi ro.
  - **Đường SML**: vẽ đường CAPM theo beta, chấm một cổ phiếu (beta, lợi nhuận kỳ vọng thực) → báo trên/dưới đường (hời/đắt).
  - **Beta danh mục**: kéo trọng số nhiều tài sản → beta danh mục = trung bình trọng số, thấy cách dịch tấn công/phòng thủ.

---

## Bài tiếp theo

→ [Lesson 07 — Thị trường hiệu quả & hành vi](../lesson-07-efficient-markets/): giả thuyết thị trường hiệu quả (EMH), vì sao khó "thắng thị trường", và các thiên kiến hành vi khiến nhà đầu tư sai lầm (nối tới Psychology).

**Tham khảo chéo:** rủi ro hệ thống [\`../lesson-05-diversification/\`](../lesson-05-diversification/) · equity risk premium [\`../lesson-01-asset-classes/\`](../lesson-01-asset-classes/).
`;
