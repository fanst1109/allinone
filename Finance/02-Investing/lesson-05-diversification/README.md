# Lesson 05 — Đa dạng hóa & Danh mục (Diversification & Portfolios)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **đa dạng hóa (diversification)** là "bữa trưa miễn phí" duy nhất trong đầu tư.
- Hiểu vai trò then chốt của **tương quan (correlation)** giữa các tài sản.
- Tính **lợi nhuận và rủi ro của danh mục 2 tài sản**, và thấy rủi ro giảm khi tương quan thấp.
- Hiểu **biên hiệu quả (efficient frontier)** của Markowitz.
- Phân biệt **rủi ro hệ thống vs phi hệ thống** — cái nào đa dạng hóa được.

## Kiến thức tiền đề

- [Lesson 04 — Rủi ro & lợi nhuận](../lesson-04-risk-return/): lợi nhuận kỳ vọng, độ lệch chuẩn.
- Hiệp phương sai & tương quan: [`../../../Statistics/index.html`](../../../Statistics/index.html).

---

## 1. Đa dạng hóa — "bữa trưa miễn phí"

> 💡 **Trực giác / Hình dung.** Bạn bán cả kem lẫn áo mưa. Ngày nắng kem đắt hàng, áo mưa ế; ngày mưa thì ngược lại. Doanh thu **mỗi mặt hàng** dao động mạnh, nhưng **tổng** lại khá ổn định — vì khi cái này xuống thì cái kia lên. Đầu tư cũng vậy: trộn các tài sản **không cùng lên xuống** thì rủi ro tổng **giảm** mà lợi nhuận trung bình **không giảm tương ứng**. Đó là lý do người ta gọi đa dạng hóa là "bữa trưa miễn phí".

**Định nghĩa — Đa dạng hóa:**

- **(a) Là gì** — phân bổ vốn vào nhiều tài sản khác nhau để giảm rủi ro tổng của danh mục.
- **(b) Vì sao hiệu quả** — khi các tài sản không hoàn toàn cùng pha, các dao động riêng lẻ **triệt tiêu một phần** lẫn nhau, làm dao động của tổng nhỏ hơn trung bình dao động từng cái.
- **(c) Ví dụ trực giác** — danh mục chỉ cổ phiếu hàng không sụp khi giá dầu tăng; thêm cổ phiếu dầu khí (tăng khi dầu tăng) làm tổng ổn định hơn.

> ⚠ **Lỗi thường gặp.** "Đa dạng hóa = mua thật nhiều cổ phiếu." Mua 50 cổ phiếu cùng ngành (cùng lên xuống) **không** đa dạng hóa tốt. Chìa khóa là tài sản **ít tương quan**, không phải số lượng.

---

## 2. Tương quan — chìa khóa của đa dạng hóa

> 💡 **Trực giác.** **Hệ số tương quan $\rho$** đo hai tài sản "cùng pha" tới mức nào, từ −1 đến +1:
> - $\rho = +1$: luôn cùng lên cùng xuống → đa dạng hóa **vô dụng**.
> - $\rho = 0$: độc lập → đa dạng hóa **tốt**.
> - $\rho = -1$: ngược pha hoàn hảo → có thể **triệt tiêu rủi ro gần như hoàn toàn**.

**Định nghĩa — Tương quan ($\rho$):**

- **(a) Là gì** — số đo (−1 đến +1) mức độ hai chuỗi lợi nhuận di chuyển cùng chiều.
- **(b) Vì sao quan trọng** — lợi ích đa dạng hóa **phụ thuộc hoàn toàn** vào $\rho$: càng thấp (hoặc âm), rủi ro danh mục càng giảm.
- **(c) Ví dụ** — cổ phiếu & trái phiếu thường $\rho$ thấp/âm → trộn chúng giảm rủi ro hiệu quả; hai cổ phiếu ngân hàng $\rho$ ~0,9 → trộn ít tác dụng.

---

## 3. Rủi ro danh mục 2 tài sản

> 💡 **Trực giác.** Lợi nhuận danh mục chỉ là trung bình có trọng số — đơn giản. Nhưng **rủi ro** thì không: nó **nhỏ hơn** trung bình trọng số của hai σ (trừ khi $\rho=1$). Phần "giảm được" chính là quà của đa dạng hóa.

> 📐 **Công thức (2 tài sản, trọng số $w$ và $1-w$):**
>
> Lợi nhuận: $\quad R_p = w R_1 + (1-w) R_2$
>
> Rủi ro: $\quad \sigma_p = \sqrt{w^2\sigma_1^2 + (1-w)^2\sigma_2^2 + 2w(1-w)\rho\,\sigma_1\sigma_2}$

**Walk-through bằng số thật (verify) — $w = 0{,}5$, $\sigma_1 = \sigma_2 = 20\%$, đổi $\rho$:**

| $\rho$ | $\sigma_p = \sqrt{0{,}25(400) + 0{,}25(400) + 2(0{,}25)\rho(400)}$ | Kết quả |
|---|---|---|
| +1 | $\sqrt{100+100+200} = \sqrt{400}$ | 20,0% (không giảm) |
| 0 | $\sqrt{100+100+0} = \sqrt{200}$ | 14,1% |
| −1 | $\sqrt{100+100-200} = \sqrt{0}$ | 0% (triệt tiêu!) |

→ Cùng hai tài sản σ=20%, trộn 50/50: nếu $\rho=1$ rủi ro vẫn 20%; $\rho=0$ giảm còn 14,1%; $\rho=-1$ **về 0**. Lợi nhuận trung bình không đổi suốt — đó là "bữa trưa miễn phí" hiển thị bằng số.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao $\rho=0$ đã giảm rủi ro xuống 14,1% chứ không phải 20%?"* — Vì các dao động độc lập triệt tiêu nhau một phần một cách ngẫu nhiên. Toán: $\sqrt{0{,}5} \times 20\% = 14{,}1\%$ — rủi ro giảm theo căn bậc hai.
> - *"Thực tế $\rho = -1$ có không?"* — Gần như không. Hầu hết tài sản có $\rho$ dương (cùng chịu chu kỳ kinh tế). Nhưng chỉ cần $\rho < 1$ là đã có lợi ích đa dạng hóa.

> ⚠ **Lỗi thường gặp.** Tính rủi ro danh mục bằng trung bình trọng số của σ ($0{,}5 \times 20 + 0{,}5 \times 20 = 20\%$). Sai trừ khi $\rho=1$. Phải dùng công thức có số hạng $\rho$.

> 🔁 **Dừng lại tự kiểm tra.** Hai tài sản σ=20% mỗi cái, trộn 50/50, $\rho = 0{,}5$. Rủi ro danh mục?
> <details><summary>Đáp án</summary>$\sigma_p = \sqrt{100 + 100 + 2(0{,}25)(0{,}5)(400)} = \sqrt{200 + 100} = \sqrt{300} = 17{,}3\%$. (Giữa 14,1% của ρ=0 và 20% của ρ=1.)</details>

---

## 4. Biên hiệu quả (Efficient Frontier)

> 💡 **Trực giác / Hình dung.** Thử mọi tỷ lệ trộn giữa các tài sản, chấm mỗi danh mục lên đồ thị rủi ro × lợi nhuận. Tập các điểm tốt nhất — **lợi nhuận cao nhất ứng với mỗi mức rủi ro** — tạo thành một đường cong gọi là **biên hiệu quả**. Mọi danh mục "khôn ngoan" nằm trên đường này; nằm dưới nó là lãng phí (có thể đạt lợi nhuận cao hơn cùng rủi ro).

**Định nghĩa — Biên hiệu quả:**

- **(a) Là gì** — tập hợp các danh mục cho lợi nhuận kỳ vọng cao nhất ứng với mỗi mức rủi ro (hoặc rủi ro thấp nhất ứng với mỗi mức lợi nhuận).
- **(b) Vì sao quan trọng** — đây là nền tảng **lý thuyết danh mục hiện đại (Modern Portfolio Theory)** của Markowitz (Nobel 1990): chọn danh mục trên biên này là tối ưu hóa rủi ro–lợi nhuận.
- **(c) Hệ quả** — nhờ tương quan < 1, biên hiệu quả **cong về bên trái** (rủi ro thấp hơn) so với đường thẳng nối các tài sản đơn lẻ — chính là lợi ích đa dạng hóa thể hiện bằng hình.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao chọn điểm nào trên biên?"* — Tùy mức chấp nhận rủi ro của bạn: ngại rủi ro → chọn điểm trái (rủi ro thấp); chấp nhận rủi ro → chọn điểm phải (lợi nhuận cao). Điểm rủi ro thấp nhất gọi là **danh mục phương sai tối thiểu (minimum variance portfolio)**.

---

## 5. Rủi ro hệ thống vs phi hệ thống

> 💡 **Trực giác.** Có hai loại rủi ro: rủi ro **riêng** của một công ty (giám đốc từ chức, nhà máy cháy) — gọi là **phi hệ thống**; và rủi ro **chung toàn thị trường** (suy thoái, lãi suất, chiến tranh) — gọi là **hệ thống**. Đa dạng hóa **xóa được** rủi ro riêng (cái này xui thì cái kia may), nhưng **không xóa được** rủi ro chung (suy thoái dìm tất cả).

| Loại rủi ro | Nguồn | Đa dạng hóa được? |
|---|---|---|
| **Phi hệ thống** (riêng lẻ) | sự kiện riêng của công ty/ngành | **Có** — triệt tiêu khi nắm nhiều tài sản |
| **Hệ thống** (thị trường) | suy thoái, lãi suất, vĩ mô | **Không** — ảnh hưởng tất cả |

→ Đây là lý do thị trường chỉ "trả công" (lợi nhuận kỳ vọng) cho **rủi ro hệ thống** — vì rủi ro phi hệ thống bạn tự xóa được bằng đa dạng hóa, không ai trả tiền cho rủi ro né được. Ý này dẫn thẳng tới **beta & CAPM** ở [Lesson 06](../lesson-06-capm-beta/).

> 📝 **Tóm tắt toàn bài.**
> - **Đa dạng hóa**: trộn tài sản ít tương quan → giảm rủi ro mà không giảm lợi nhuận trung bình ("bữa trưa miễn phí").
> - **Tương quan $\rho$** (−1 đến +1) là chìa khóa: ρ thấp/âm → lợi ích lớn; ρ=1 → vô dụng.
> - **Rủi ro danh mục** $\sigma_p = \sqrt{w^2\sigma_1^2 + (1-w)^2\sigma_2^2 + 2w(1-w)\rho\sigma_1\sigma_2}$ — nhỏ hơn trung bình trọng số khi ρ<1.
> - **Biên hiệu quả** (Markowitz): danh mục tối ưu rủi ro–lợi nhuận, cong nhờ ρ<1.
> - **Rủi ro hệ thống** (không xóa được) vs **phi hệ thống** (đa dạng hóa xóa được) → thị trường chỉ trả công cho rủi ro hệ thống.

---

## Bài tập

1. **Lợi nhuận danh mục.** 70% tài sản A (lợi nhuận 10%) + 30% B (lợi nhuận 5%). Lợi nhuận danh mục?

2. **Rủi ro, ρ=1.** A và B đều σ=15%, trộn 50/50, ρ=1. Rủi ro danh mục? (Cho thấy không có lợi ích.)

3. **Rủi ro, ρ=0.** Cùng A, B (σ=15%), 50/50, nhưng ρ=0. Rủi ro danh mục? So bài 2.

4. **Tương quan âm.** A, B đều σ=20%, 50/50, ρ=−1. Rủi ro danh mục? Giải thích kết quả.

5. **Loại rủi ro.** Phân loại hệ thống/phi hệ thống: (a) suy thoái kinh tế, (b) CEO công ty X bị bắt, (c) lãi suất ngân hàng trung ương tăng, (d) nhà máy công ty Y cháy. Cái nào đa dạng hóa xóa được?

---

## Lời giải chi tiết

### Bài 1 — Lợi nhuận danh mục

$$R_p = 0{,}7 \times 10\% + 0{,}3 \times 5\% = 7\% + 1{,}5\% = 8{,}5\%$$

### Bài 2 — Rủi ro, ρ=1

$$\sigma_p = \sqrt{0{,}25(225) + 0{,}25(225) + 2(0{,}25)(1)(225)} = \sqrt{56{,}25 + 56{,}25 + 112{,}5} = \sqrt{225} = 15\%$$

→ Bằng đúng σ của từng tài sản — **không có lợi ích đa dạng hóa** khi ρ=1.

### Bài 3 — Rủi ro, ρ=0

$$\sigma_p = \sqrt{56{,}25 + 56{,}25 + 0} = \sqrt{112{,}5} = 10{,}6\%$$

→ Giảm từ 15% (bài 2) xuống 10,6% chỉ bằng cách chọn hai tài sản độc lập (ρ=0), cùng lợi nhuận trung bình. Đó là quà đa dạng hóa.

### Bài 4 — Tương quan âm

$$\sigma_p = \sqrt{0{,}25(400) + 0{,}25(400) + 2(0{,}25)(-1)(400)} = \sqrt{100 + 100 - 200} = \sqrt{0} = 0\%$$

→ Rủi ro **triệt tiêu hoàn toàn**: khi A xuống đúng lúc B lên (ngược pha hoàn hảo), tổng luôn ổn định. Đây là trường hợp lý tưởng (hiếm trong thực tế).

### Bài 5 — Loại rủi ro

- (a) suy thoái → **hệ thống** (cả thị trường).
- (b) CEO bị bắt → **phi hệ thống** (riêng công ty X).
- (c) lãi suất tăng → **hệ thống**.
- (d) nhà máy cháy → **phi hệ thống** (riêng công ty Y).
- → Đa dạng hóa xóa được (b) và (d) — rủi ro riêng lẻ. Không xóa được (a), (c) — rủi ro chung toàn thị trường.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Danh mục 2 tài sản**: kéo trọng số & tương quan ρ → lợi nhuận và rủi ro danh mục, thấy rủi ro tụt khi ρ giảm.
  - **Biên hiệu quả**: vẽ đường cong rủi ro–lợi nhuận của mọi tỷ lệ trộn, đánh dấu danh mục phương sai tối thiểu; đổi ρ thấy đường cong "cong" hơn.
  - **Hệ thống vs phi hệ thống**: mô phỏng rủi ro danh mục giảm dần khi thêm tài sản, chạm sàn ở mức rủi ro hệ thống (không xóa được).

---

## Bài tiếp theo

→ [Lesson 06 — CAPM & beta](../lesson-06-capm-beta/): vì sao thị trường chỉ trả công cho rủi ro hệ thống, **beta** đo rủi ro hệ thống thế nào, và mô hình **CAPM** định giá lợi nhuận kỳ vọng.

**Tham khảo chéo:** độ lệch chuẩn & tương quan [`../../../Statistics/index.html`](../../../Statistics/index.html) · rủi ro–lợi nhuận [`../lesson-04-risk-return/`](../lesson-04-risk-return/).
