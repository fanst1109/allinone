// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-02-confidence-interval/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02: Khoảng tin cậy (Confidence Interval)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu đúng ý nghĩa của confidence interval (CI) 95% — tránh cách hiểu sai phổ biến nhất.
- Tính z-CI cho mean khi σ đã biết, và t-CI khi σ không biết.
- Giải thích t-distribution và bậc tự do (degrees of freedom — df), hiểu tại sao cần t thay vì z.
- Tính CI cho proportion (tỷ lệ).
- Mô tả ý tưởng bootstrap CI và khi nào nó có lợi hơn CI tham số.

## Kiến thức tiền đề

- **Lesson 01 (Tầng 2)**: Sampling distribution, $\\text{SE} = \\sigma/\\sqrt{n}$, CLT — tất cả cơ sở của CI.
- **Tầng 1 — Lesson 03**: Variance, SD, z-score — [\`../../../Statistics/01-Descriptive/lesson-03-dispersion/\`](../../../Statistics/01-Descriptive/lesson-03-dispersion/).
- **Normal distribution**: Vectors/05-Probability Lesson 05 — cần hiểu z-score và Φ(z).

---

## 1. Bài toán mở đầu: ước lượng có sai số

> 💡 **Trực giác**: Bạn đo 100 người, x̄ = 163.5 cm. Bạn báo cáo "chiều cao trung bình là 163.5 cm". Câu hỏi tự nhiên: *chính xác tới đâu?* Không ai tin "đúng chính xác 163.5 cm" — nhưng "163.5 ± 2 cm" thì nghe có lý hơn. Confidence interval chính là cách tính cái "± 2 cm" đó một cách chặt chẽ về mặt thống kê.

**Sai lầm phổ biến cần tránh ngay từ đầu**:

Nhiều người đọc "CI 95% = [161, 166]" và nghĩ: *"Xác suất để μ nằm trong [161, 166] là 95%."* Điều này **sai về mặt logic thống kê tần suất (frequentist)**. μ là một hằng số, không có xác suất. Câu đúng là:

> **"Nếu ta lặp lại quy trình lấy mẫu n=100 rất nhiều lần và mỗi lần tính một CI, thì 95% số CI đó sẽ chứa μ thật."**

---

## 2. Z-CI: Confidence Interval khi σ đã biết

### 2.1. Công thức

$$CI = \\bar{x} \\pm z^* \\dfrac{\\sigma}{\\sqrt{n}} = \\bar{x} \\pm z^* \\cdot \\text{SE}$$

Trong đó $z^*$ là **critical value** tương ứng với mức tin cậy (confidence level):

| Confidence level | α | z* |
|-----------------|---|----|
| 90% | 0.10 | 1.645 |
| 95% | 0.05 | 1.960 |
| 99% | 0.01 | 2.576 |

**Tại sao $z^* = 1{,}96$ cho 95%?** Vì $P(-1{,}96 \\leq Z \\leq 1{,}96) = 0{,}95$ trong $N(0,1)$. Kiểm tra: $\\Phi(1{,}96) = 0{,}975 \\to$ diện tích hai đuôi $= 2 \\times 0{,}025 = 0{,}05 \\to$ diện tích giữa $= 0{,}95$ ✓.

### 2.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Chiều cao học sinh**:
- $\\mu$ không biết, $\\sigma = 8$ cm (từ lịch sử), $n = 64$, $\\bar{x} = 163{,}5$
- $\\text{SE} = \\dfrac{8}{\\sqrt{64}} = 1{,}0$
- 95% CI: $163{,}5 \\pm 1{,}96 \\times 1{,}0 = \\mathbf{[161{,}54;\\ 165{,}46]}$
- Kiểm tra margin of error: $1{,}96 \\times 1 = 1{,}96$ cm.

**Ví dụ 2 — Session time**:
- $\\sigma = 3$ phút, $n = 100$, $\\bar{x} = 4{,}3$
- $\\text{SE} = \\dfrac{3}{10} = 0{,}3$
- 99% CI: $4{,}3 \\pm 2{,}576 \\times 0{,}3 = 4{,}3 \\pm 0{,}773 = \\mathbf{[3{,}527;\\ 5{,}073]}$
- Nhận xét: Tăng confidence từ 95% lên 99% $\\to$ CI rộng hơn (1,546 thay vì 1,176 phút).

**Ví dụ 3 — Ảnh hưởng của n**:
- $\\sigma = 10$, $\\bar{x} = 50$
- $n = 25$: $\\text{SE} = 2{,}0 \\to$ 95% CI $= [46{,}08;\\ 53{,}92]$, width $= 7{,}84$
- $n = 100$: $\\text{SE} = 1{,}0 \\to$ 95% CI $= [48{,}04;\\ 51{,}96]$, width $= 3{,}92$
- $n$ tăng $4\\times \\to$ CI hẹp lại $2\\times$ (do $\\sqrt{n}$).

**Ví dụ 4 — 90% CI vs 95% CI**:
- $\\sigma = 5$, $n = 36$, $\\bar{x} = 20$. $\\text{SE} = \\dfrac{5}{6} \\approx 0{,}833$.
- 90% CI: $20 \\pm 1{,}645 \\times 0{,}833 = \\mathbf{[18{,}63;\\ 21{,}37]}$, width $= 2{,}74$
- 95% CI: $20 \\pm 1{,}960 \\times 0{,}833 = \\mathbf{[18{,}37;\\ 21{,}63]}$, width $= 3{,}26$
- Tăng confidence $\\to$ CI rộng hơn. Trade-off: muốn chắc hơn thì phải chấp nhận "nói ít chính xác hơn".

> ⚠ **Lỗi thường gặp**: "Rộng CI là tốt vì chắc chắn hơn." Sai quan điểm. CI rộng = **ít informative**. CI [0, 200] cho chiều cao bao gồm mọi giá trị thực tế — đúng 100% nhưng vô nghĩa. Mục tiêu là CI đủ hẹp (precision) với confidence đủ cao (reliability).

---

## 3. T-CI: Confidence Interval khi σ không biết

### 3.1. Tại sao cần t-distribution?

Trong thực tế, $\\sigma$ gần như không bao giờ biết trước. Khi ta thay $\\sigma$ bằng $s$ (sample SD), thống kê:

$$t = \\dfrac{\\bar{x} - \\mu}{s/\\sqrt{n}}$$

**không còn theo $N(0,1)$** mà theo **t-distribution với df $= n-1$ bậc tự do**.

> 💡 **Trực giác**: Khi dùng s thay σ, ta đang ước lượng thêm một tham số nữa từ mẫu → có thêm nguồn không chắc chắn. T-distribution "đền bù" sự không chắc chắn này bằng cách có đuôi dày hơn Normal → critical value t* > z* (để CI rộng hơn, phản ánh đúng sự không chắc chắn).

**(a) Là gì**: T-distribution có 1 tham số là df (degrees of freedom). Khi df $\\to \\infty$, t-distribution tiến về $N(0,1)$.

**(b) Vì sao df $= n-1$**: Khi tính $s$, ta đã dùng $\\bar{x}$ — mất đi 1 bậc tự do ("ràng buộc" rằng $\\sum (x_i - \\bar{x}) = 0$). Nên từ $n$ quan sát chỉ còn $n-1$ thông tin độc lập để ước lượng phân tán.

### 3.2. Công thức t-CI

$$CI = \\bar{x} \\pm t^*(\\text{df}) \\dfrac{s}{\\sqrt{n}}$$

Trong đó $t^*(\\text{df})$ = critical value của t-distribution với df $= n-1$ tại mức tin cậy mong muốn.

So sánh $t^*$ với $z^*$ (cho 95% CI):

| n | df = n-1 | t* (95%) | z* |
|---|----------|----------|-----|
| 5 | 4 | 2.776 | 1.960 |
| 10 | 9 | 2.262 | 1.960 |
| 20 | 19 | 2.093 | 1.960 |
| 30 | 29 | 2.045 | 1.960 |
| 100 | 99 | 1.984 | 1.960 |
| ∞ | ∞ | 1.960 | 1.960 |

**Nhận xét**: Với $n \\geq 30$, $t^* \\approx z^*$ (sai số < 2%). Thực tế, **luôn dùng t-CI** (kể cả khi $n$ lớn) — không bao giờ sai, đôi khi cần thiết.

### 3.3. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Mẫu nhỏ**:
- $n = 8$, $\\bar{x} = 75$, $s = 6$. df $= 7$.
- $t^*(7,\\ 95\\%) = 2{,}365$ (tra bảng).
- $\\text{SE} = \\dfrac{6}{\\sqrt{8}} \\approx 2{,}121$.
- 95% CI: $75 \\pm 2{,}365 \\times 2{,}121 = 75 \\pm 5{,}016 = \\mathbf{[69{,}98;\\ 80{,}02]}$

**Ví dụ 2 — n = 25**:
- $n = 25$, $\\bar{x} = 50$, $s = 10$. df $= 24$.
- $t^*(24,\\ 95\\%) = 2{,}064$.
- $\\text{SE} = \\dfrac{10}{5} = 2$.
- 95% CI: $50 \\pm 2{,}064 \\times 2 = 50 \\pm 4{,}128 = \\mathbf{[45{,}87;\\ 54{,}13]}$

**Ví dụ 3 — n = 100**:
- $n = 100$, $\\bar{x} = 8{,}5$, $s = 2{,}4$. df $= 99$.
- $t^*(99,\\ 95\\%) \\approx 1{,}984 \\approx 1{,}96$.
- $\\text{SE} = \\dfrac{2{,}4}{10} = 0{,}24$.
- 95% CI: $8{,}5 \\pm 1{,}984 \\times 0{,}24 = \\mathbf{[8{,}024;\\ 8{,}976]}$

**Ví dụ 4 — So sánh với z-CI**:
- Giả sử biết $\\sigma = 2{,}4$ (ví dụ 3), CI sẽ là: $8{,}5 \\pm 1{,}96 \\times 0{,}24 = \\mathbf{[8{,}029;\\ 8{,}971]}$ — gần như giống hệt t-CI vì $n=100$ đủ lớn.
- Nhưng với $n = 8$ (ví dụ 1): nếu dùng $z^* = 1{,}96$ thay vì $t^* = 2{,}365 \\to$ CI hẹp hơn **sai** (underestimate sự không chắc chắn).

---

## 4. CI cho Proportion (Tỷ lệ)

### 4.1. Công thức

$$\\hat{p} \\pm z^* \\sqrt{\\dfrac{\\hat{p}(1-\\hat{p})}{n}}$$

Điều kiện áp dụng: $n \\cdot \\hat{p} \\geq 10$ và $n \\cdot (1-\\hat{p}) \\geq 10$ (đủ sự kiện thành công VÀ thất bại).

### 4.2. Walk-through bằng số

**Ví dụ 1**: Khảo sát 400 người, 220 thích sản phẩm A ($\\hat{p} = 0{,}55$).
- $\\text{SE} = \\sqrt{\\dfrac{0{,}55 \\times 0{,}45}{400}} = \\sqrt{\\dfrac{0{,}2475}{400}} = \\sqrt{0{,}000619} \\approx 0{,}0249$
- 95% CI: $0{,}55 \\pm 1{,}96 \\times 0{,}0249 = \\mathbf{[0{,}501;\\ 0{,}599]}$
- Kiểm tra điều kiện: $400 \\times 0{,}55 = 220 \\geq 10$ ✓, $400 \\times 0{,}45 = 180 \\geq 10$ ✓.

**Ví dụ 2**: $n=1000$, $\\hat{p} = 0{,}08$ (tỷ lệ churn).
- $\\text{SE} = \\sqrt{\\dfrac{0{,}08 \\times 0{,}92}{1000}} = \\sqrt{0{,}0000736} \\approx 0{,}00858$
- 95% CI: $0{,}08 \\pm 1{,}96 \\times 0{,}00858 = \\mathbf{[0{,}063;\\ 0{,}097]}$

> ⚠ **Lỗi thường gặp**: Nếu $\\hat{p} = 0{,}02$ và $n = 100 \\to n \\cdot \\hat{p} = 2 < 10 \\to$ điều kiện vi phạm, z-CI không tin cậy. Dùng Clopper-Pearson (exact) CI hoặc bootstrap trong trường hợp này.

---

## 5. Bootstrap CI — Khi không muốn giả định phân phối

> 💡 **Trực giác**: Thay vì dùng công thức lý thuyết (giả định Normal), bootstrap tự hỏi: *"Nếu tôi lấy mẫu lại từ dữ liệu mình đang có, thống kê sẽ dao động bao nhiêu?"* Bằng cách resample WITH replacement hàng nghìn lần, ta tạo ra phân phối thực nghiệm của thống kê — rồi lấy percentile 2.5% và 97.5% làm CI.

**Thuật toán bootstrap CI**:
1. Có mẫu gốc $X = \\{x_1, \\ldots, x_n\\}$.
2. Lặp $B=1000$ lần: lấy mẫu bootstrap $X^*$ từ $X$ WITH replacement ($n$ phần tử), tính $\\bar{x}^*$.
3. Có $B$ giá trị $\\bar{x}^*$. Lấy percentile 2,5% và 97,5% $\\to$ đó là 95% percentile CI.

**Ưu điểm**:
- Không giả định phân phối.
- Hoạt động cho mọi thống kê (median, correlation, ratio...).
- Tốt hơn khi phân phối lệch hoặc n nhỏ.

**Hạn chế**: Cần tính toán nhiều (nhưng không vấn đề với máy tính hiện đại). Không tốt khi n rất nhỏ (< 20) vì resample từ mẫu nhỏ không phản ánh đủ sự biến thiên của tổng thể.

(Bootstrap sẽ học kỹ hơn ở Lesson 07 — Resampling.)

---

## 6. Quan hệ CI ↔ Hypothesis Test

CI 95% cho μ và hypothesis test α = 0.05 cho μ có **duality (quan hệ đối ngẫu)**:

- Nếu 95% CI cho $\\mu$ **không chứa** giá trị $\\mu_0 \\to$ two-sided test tại $\\alpha=0{,}05$ **sẽ reject $H_0: \\mu=\\mu_0$**.
- Nếu CI **chứa** $\\mu_0 \\to$ test **không reject $H_0$**.

**Ví dụ**: 95% CI $= [161{,}54;\\ 165{,}46]$. Nếu ta test $H_0: \\mu=160 \\to 160$ không trong CI $\\to$ reject $H_0$ ($\\alpha=0{,}05$). Nếu test $H_0: \\mu=163 \\to 163$ trong CI $\\to$ không reject $H_0$.

Duality này hữu ích vì CI cung cấp thông tin phong phú hơn: không chỉ "reject hay không" mà còn cho biết **range giá trị plausible** của $\\mu$.

---

## Bài tập

1. Khảo sát 50 đơn hàng, x̄ = 235.000 VND, s = 45.000 VND. Tính 95% t-CI cho mean. (Dùng t*(49) ≈ 2.010.)

2. Cùng bài toán trên, nếu σ = 45.000 (đã biết), tính 95% z-CI. So sánh với t-CI.

3. Cuộc khảo sát online có 800 người tham gia, 312 người nói "sẽ mua". Tính 99% CI cho tỷ lệ mua (p).

4. (Tư duy) Một nghiên cứu báo cáo 95% CI = [1.2, 4.8] cho tham số β. Nhà nghiên cứu kết luận "P(β ∈ [1.2, 4.8]) = 0.95." Giải thích tại sao phát biểu này sai, và phát biểu đúng là gì.

5. Để margin of error ≤ 0.03 với 95% CI cho proportion (p̂ ≈ 0.5), cần n tối thiểu là bao nhiêu?

## Lời giải chi tiết

### Bài 1

$\\text{SE} = \\dfrac{s}{\\sqrt{n}} = \\dfrac{45000}{\\sqrt{50}} = \\dfrac{45000}{7{,}071} \\approx \\mathbf{6364 \\text{ VND}}$.

df $= 49$, $t^*(49,\\ 95\\%) \\approx 2{,}010$.

95% t-CI: $235000 \\pm 2{,}010 \\times 6364 = 235000 \\pm 12791 = \\mathbf{[222{,}209;\\ 247{,}791 \\text{ nghìn VND}]}$

### Bài 2

$\\text{SE} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{45000}{7{,}071} \\approx 6364 \\text{ VND}$.

95% z-CI: $235000 \\pm 1{,}960 \\times 6364 = 235000 \\pm 12473 = \\mathbf{[222{,}527;\\ 247{,}473 \\text{ nghìn VND}]}$

**So sánh**: z-CI hẹp hơn t-CI một chút (12473 vs 12791) vì $z^* = 1{,}960 < t^*(49) = 2{,}010$. Sự khác biệt nhỏ vì $n = 50$ đủ lớn.

### Bài 3

$\\hat{p} = \\dfrac{312}{800} = 0{,}39$.

$\\text{SE} = \\sqrt{\\dfrac{0{,}39 \\times 0{,}61}{800}} = \\sqrt{\\dfrac{0{,}2379}{800}} = \\sqrt{0{,}000297} \\approx \\mathbf{0{,}01724}$

Kiểm tra: $800 \\times 0{,}39 = 312 \\geq 10$ ✓, $800 \\times 0{,}61 = 488 \\geq 10$ ✓.

$z^*(99\\%) = 2{,}576$.

99% CI: $0{,}39 \\pm 2{,}576 \\times 0{,}01724 = 0{,}39 \\pm 0{,}04438 = \\mathbf{[0{,}346;\\ 0{,}434]}$

### Bài 4

Phát biểu sai vì theo thống kê frequentist, **$\\mu$ là một hằng số cố định** (không phải biến ngẫu nhiên). Hỏi "xác suất để hằng số nằm trong khoảng" là không có nghĩa trong framework này.

**Phát biểu đúng**: "Nếu ta lặp lại quy trình thu thập dữ liệu và tính CI 95% rất nhiều lần, 95% các CI đó sẽ chứa giá trị thật của β." Hoặc: "CI [1.2, 4.8] được tính bằng phương pháp mà 95% thời gian sẽ cho CI chứa β."

(Lưu ý: Trong framework Bayesian, phát biểu "xác suất posterior của β" có ý nghĩa — nhưng đó là ngôn ngữ khác. Học ở Tầng 3 Lesson 01.)

### Bài 5

Margin of error (ME) $= z^* \\sqrt{\\dfrac{\\hat{p}(1-\\hat{p})}{n}} \\leq 0{,}03$.

Worst case (ME lớn nhất) khi $\\hat{p} = 0{,}5$:

$$\\begin{aligned}
\\text{ME} &= 1{,}96 \\sqrt{\\dfrac{0{,}25}{n}} \\leq 0{,}03 \\\\
\\sqrt{\\dfrac{0{,}25}{n}} &\\leq \\dfrac{0{,}03}{1{,}96} = 0{,}01531 \\\\
\\dfrac{0{,}25}{n} &\\leq 0{,}01531^2 = 0{,}0002344 \\\\
n &\\geq \\dfrac{0{,}25}{0{,}0002344} \\approx \\mathbf{1067}
\\end{aligned}$$

**Kết quả**: $n$ tối thiểu $= \\mathbf{1067}$. (Rule of thumb cho poll 3% margin: ~1000 người — phù hợp!)

---

## Bài tiếp theo

[Lesson 03: Kiểm định 1 mẫu](../lesson-03-hypothesis-testing-1sample/README.md) — Từ CI tới hypothesis test: H₀, H₁, p-value, vùng reject.

## Tham khảo

- OpenIntro Statistics — Chapter 5: Confidence intervals for a proportion, Chapter 7: Inference for numerical data (t-CI).
- Statistics (Freedman, Pisani, Purves) — Chapter 26.
`;
