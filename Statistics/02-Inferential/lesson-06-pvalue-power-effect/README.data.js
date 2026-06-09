// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-06-pvalue-power-effect/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06: P-value, Power, Effect Size

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu đúng định nghĩa p-value và liệt kê ít nhất 5 cách hiểu SAI phổ biến.
- Phân biệt **Type I error (α)** và **Type II error (β)**, và **power (1-β)**.
- Tính và giải thích **Cohen's d** (effect size cho mean).
- Dùng power analysis để tính **sample size cần thiết**.
- Giải thích **multiple testing problem** qua ví dụ số cụ thể, hiểu Bonferroni correction và FDR (Benjamini-Hochberg).
- Phân biệt "statistically significant" vs "practically significant".

## Kiến thức tiền đề

- **Lesson 03**: P-value, α, hypothesis testing — bài này đi sâu hơn vào các khái niệm đó.
- **Lesson 04**: Two-sample tests — ví dụ power analysis dùng hai mẫu.

---

## 1. P-value — Định nghĩa Đúng và 5 Cách Hiểu Sai

### 1.1. Định nghĩa chuẩn

> **P-value** là xác suất, tính giả sử H₀ đúng, để thu được test statistic **cực đoan ít nhất bằng** giá trị quan sát được.

**Ký hiệu chính thức**:

$$\\begin{aligned}
p &= P(T \\geq t_{obs} \\mid H_0 \\text{ đúng}) \\quad \\text{(one-sided right)} \\\\
p &= P(|T| \\geq |t_{obs}| \\mid H_0 \\text{ đúng}) \\quad \\text{(two-sided)}
\\end{aligned}$$

### 1.2. Năm cách hiểu SAI (với phản chứng)

**Sai lầm 1: "p là xác suất H₀ đúng"**

Ví dụ sai: "p = 0.03, vậy H₀ sai với xác suất 97%."

Phản chứng: $P(H_0 \\mid \\text{data})$ cần Bayes' theorem và prior $P(H_0)$. Nếu $H_0$ a priori rất khả năng (vd kiểm tra đồng xu fair), $p = 0{,}03$ không có nghĩa là "đồng xu 97% không fair." Một cú tung 1000 lần ra 519 lần head sẽ có $p \\approx 0{,}03$ two-sided, nhưng đồng xu vẫn gần như chắc chắn fair.

**Sai lầm 2: "1−p là xác suất H₁ đúng"**

Trực tiếp sai theo logic trên. $P(H_1 \\mid \\text{data}) = 1 - P(H_0 \\mid \\text{data})$, không phải $1 - $ p-value.

**Sai lầm 3: "p nhỏ → effect lớn"**

Phản chứng: với n đủ lớn, ngay cả effect cực nhỏ cũng cho p cực nhỏ.

**Ví dụ số**: Hai nhóm IQ:
- Nhóm A: $\\mu = 100{,}0$, Nhóm B: $\\mu = 100{,}1$ (khác 0,1 điểm — hoàn toàn vô nghĩa thực tế).
- $n = 1.000.000$ mỗi nhóm, $\\sigma = 15$.
- $\\text{SE} = \\dfrac{15}{\\sqrt{1000000}} = 0{,}015$. $z = \\dfrac{0{,}1}{0{,}015} = 6{,}67$. $p < 10^{-8}$.
- **p cực nhỏ nhưng effect không có ý nghĩa thực tế nào.**

**Sai lầm 4: "p ≥ 0.05 → H₀ đúng / không có hiệu ứng"**

Phản chứng: Fail to reject H₀ có thể vì:
- Thật sự không có hiệu ứng (H₀ đúng), HOẶC
- Có hiệu ứng nhưng **n quá nhỏ** để phát hiện (low power).

**Ví dụ số**: Thuốc có effect nhỏ ($d = 0{,}2$). Với $n = 20$: power $\\approx 14\\% \\to 86\\%$ cơ hội fail to reject dù thuốc có tác dụng.

**Sai lầm 5: "p-value là 'xác suất kết quả xảy ra do ngẫu nhiên'"**

Cụm từ "by chance" rất mơ hồ. Chính xác hơn: p đo mức độ bất thường của dữ liệu **dưới giả thuyết H₀**, không phải "xác suất ngẫu nhiên" theo nghĩa thông thường.

> ❓ **Câu hỏi tự nhiên**
> - **Q: Nếu p không phải $P(H_0 \\mid \\text{data})$, thì nó dùng để làm gì?**
>   A: P-value là **quy tắc quyết định**: nếu $p < \\alpha$, ta có đủ bằng chứng để bác bỏ $H_0$ ở mức ý nghĩa $\\alpha$. Nó kiểm soát Type I error trong dài hạn — không hơn không kém.
> - **Q: Threshold $p < 0{,}05$ từ đâu ra?**
>   A: R.A. Fisher đề xuất 0,05 như "mức tiện dùng" vào 1925. Không có lý do toán học sâu xa nào — chỉ là convention. Nhiều field dùng 0,01 hoặc 0,001.

---

## 2. Type I và Type II Error

### 2.1. Bảng phân tích

| | **Thực tế: H₀ đúng** | **Thực tế: H₀ sai** |
|-|---------------------|---------------------|
| **Quyết định: Reject H₀** | Type I error (false positive) — xác suất = **α** | Correct (true positive) — xác suất = **1-β = Power** |
| **Quyết định: Fail to reject H₀** | Correct (true negative) — xác suất = **1-α** | Type II error (false negative) — xác suất = **β** |

**(a) Type I error (α)**: Reject H₀ khi H₀ thật sự đúng. Ta kiểm soát trực tiếp α khi đặt ngưỡng (0.05, 0.01,...). Giảm α → ít false positive hơn, nhưng test khó reject hơn.

**(b) Type II error (β)**: Không reject H₀ khi H₀ thật sự sai. Ta kiểm soát β thông qua sample size và effect size. β thường không được kiểm soát chặt chẽ bằng α trong thực tế.

**(c) Power = 1 - β**: Xác suất phát hiện đúng khi H₁ thật sự đúng. Power cao = test nhạy. Thường đặt mục tiêu power ≥ 0.80 (80%).

> 💡 **Trực giác**: Giống xét nghiệm y tế.
> - False positive (Type I): Nói bạn bệnh khi thực ra không.
> - False negative (Type II): Nói bạn khỏe khi thực ra đang bệnh.
> - Power: Xác suất phát hiện đúng bệnh khi bạn thật sự bệnh.
> - Trong y học, false negative nguy hiểm hơn → cần power cao.

### 2.2. Các yếu tố ảnh hưởng power

Power tăng khi:

| Yếu tố | Hướng thay đổi | Giải thích |
|--------|----------------|-----------|
| n (sample size) | Tăng n → tăng power | SE giảm → dễ phân biệt H₀ và H₁ |
| Effect size (d) | Effect lớn hơn → tăng power | Sự khác biệt thật sự lớn → dễ phát hiện |
| α (mức ý nghĩa) | Tăng α → tăng power | Nhưng đồng thời tăng Type I error |
| σ (variance) | Giảm σ → tăng power | Ít noise → dễ thấy signal |
| One-sided vs two-sided | One-sided có power cao hơn với cùng α | Nhưng chỉ dùng khi có lý do |

---

## 3. Effect Size — Cohen's d

### 3.1. Định nghĩa và ý nghĩa

**(a) Là gì**: Effect size đo **độ lớn thực sự** của hiệu ứng, không phụ thuộc vào $n$. Cohen's d cho sự khác biệt hai mean:

$$d = \\dfrac{\\mu_1 - \\mu_2}{\\sigma_{pooled}}, \\quad \\sigma_{pooled} = \\sqrt{\\dfrac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}}$$

**(b) Vì sao cần**: P-value phụ thuộc vào $n$ ($n$ lớn $\\to p$ nhỏ dù effect không có). Effect size không phụ thuộc $n \\to$ đo ý nghĩa thực tế.

**(c) Thang đánh giá (Cohen, 1988)**:

| d | Mức độ |
|---|--------|
| 0.2 | Nhỏ (small) |
| 0.5 | Vừa (medium) |
| 0.8 | Lớn (large) |
| > 1.2 | Rất lớn |

### 3.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Thuốc A vs Thuốc B**:
- Group A: $\\bar{x}_1 = 140$, $s_1 = 20$, $n_1 = 50$.
- Group B: $\\bar{x}_2 = 130$, $s_2 = 18$, $n_2 = 50$.
- $\\sigma_{pooled} = \\sqrt{\\dfrac{49 \\times 400+49 \\times 324}{98}} = \\sqrt{\\dfrac{19600+15876}{98}} = \\sqrt{362} \\approx 19{,}03$
- $d = \\dfrac{140-130}{19{,}03} \\approx \\mathbf{0{,}526}$ (medium effect)

**Ví dụ 2 — Ví dụ IQ từ trên**:
- $\\mu_1 = 100{,}0$, $\\mu_2 = 100{,}1$, $\\sigma = 15$.
- $d = \\dfrac{0{,}1}{15} \\approx \\mathbf{0{,}0067}$ (cực nhỏ — không có ý nghĩa thực tế, dù $p \\ll 0{,}05$ với $n$ lớn).

**Ví dụ 3 — Training effectiveness**:
- Trước: $\\bar{x} = 60$, Sau: $\\bar{x} = 72$, $\\sigma = 15$.
- $d = \\dfrac{72-60}{15} = \\mathbf{0{,}8}$ (large effect)

**Ví dụ 4 — Giáo dục can thiệp**:
- Control: $\\bar{x} = 50$, SD $= 10$. Treatment: $\\bar{x} = 53$, SD $= 10$.
- $d = \\dfrac{3}{10} = \\mathbf{0{,}3}$ (nhỏ đến vừa — có ý nghĩa thực tế trong can thiệp giáo dục trên diện rộng)

> ⚠ **Lỗi thường gặp**: Báo cáo chỉ p-value mà không có effect size. APA guidelines, journal policies ngày càng yêu cầu báo cáo cả effect size + CI. "$p < 0{,}001$, $d = 0{,}07$, $n = 50000$" nói lên rất rõ: statistically significant nhưng practically negligible.

---

## 4. Sample Size Calculation — Power Analysis

### 4.1. Công thức cho two-sample t-test

$$n \\ (\\text{mỗi nhóm}) = \\dfrac{2 (z_{\\alpha/2} + z_\\beta)^2}{d^2}$$

Với: $z_{\\alpha/2}$ = critical value cho $\\alpha$ (two-sided), $z_\\beta$ = critical value cho power $= 1-\\beta$.

Thường dùng:
- $\\alpha = 0{,}05$: $z_{\\alpha/2} = 1{,}96$
- Power $= 0{,}80$ ($\\beta = 0{,}20$): $z_\\beta = 0{,}842$
- Power $= 0{,}90$ ($\\beta = 0{,}10$): $z_\\beta = 1{,}282$

### 4.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Medium effect (d=0,5), α=0,05, power=0,80**:

$$n = \\dfrac{2 (1{,}96+0{,}842)^2}{0{,}5^2} = \\dfrac{2 \\times 7{,}849}{0{,}25} = 2 \\times 31{,}396 \\approx \\mathbf{64 \\text{ người mỗi nhóm}}$$

**Ví dụ 2 — Small effect (d=0,2), α=0,05, power=0,80**:

$$n = \\dfrac{2 (1{,}96+0{,}842)^2}{0{,}2^2} = \\dfrac{2 \\times 7{,}849}{0{,}04} \\approx \\mathbf{393 \\text{ người mỗi nhóm}} \\ (\\text{gần 800 tổng!})$$

Nhận xét: Effect nhỏ cần mẫu rất lớn. Nhiều nghiên cứu underpowered vì không tính trước.

**Ví dụ 3 — Large effect (d=0,8), α=0,01, power=0,90**:
$z_{\\alpha/2} = 2{,}576$ ($\\alpha=0{,}01$), $z_\\beta = 1{,}282$ (power=90%).

$$n = \\dfrac{2 (2{,}576+1{,}282)^2}{0{,}8^2} = \\dfrac{2 \\times 14{,}89}{0{,}64} \\approx \\mathbf{47 \\text{ người mỗi nhóm}}$$

**Ví dụ 4 — A/B test conversion rate**:
Muốn detect thay đổi từ $p_1=0{,}10$ lên $p_2=0{,}13$ (3%), two-sided, $\\alpha=0{,}05$, power$=0{,}80$.
Effect size cho proportion: $h = 2 \\arcsin(\\sqrt{p_2}) - 2 \\arcsin(\\sqrt{p_1}) \\approx 2 \\times (0{,}3710-0{,}3217) \\approx 0{,}0986$.

$$n = \\dfrac{(1{,}96+0{,}842)^2}{0{,}0986^2} \\approx \\dfrac{7{,}849}{0{,}00972} \\approx \\mathbf{808 \\text{ người mỗi nhóm}} \\ (\\text{1616 tổng})$$

> 🔁 **Dừng lại tự kiểm tra**:
> 1. $d=0{,}5$, $\\alpha=0{,}05$. Nếu muốn tăng power từ 0,80 lên 0,90, $n$ thay đổi thế nào?
> <details><summary>Đáp án</summary>
> Power$=0{,}90$: $n = \\dfrac{2 (1{,}96+1{,}282)^2}{0{,}25} = \\dfrac{2 \\times 10{,}509}{0{,}25} \\approx 84$ mỗi nhóm.
> Power$=0{,}80$: $n \\approx 64$ mỗi nhóm.
> Tăng power từ 80% lên 90% cần tăng $n$ từ 64 lên 84 — khoảng 31%.
> </details>

---

## 5. Multiple Testing Problem

### 5.1. Vấn đề

> 💡 **Trực giác**: Thử nghiệm 20 giả thuyết độc lập với α=0.05, **dù tất cả đều đúng (không có hiệu ứng thật nào)**. Số false positive kỳ vọng là bao nhiêu?

**Tính số**: $E[\\text{false positives}] = 20 \\times 0{,}05 = \\mathbf{1 \\text{ false positive}}$.

$P(\\text{ít nhất 1 false positive}) = 1 - (1-0{,}05)^{20} = 1 - 0{,}358 = \\mathbf{0{,}642 = 64{,}2\\%}$.

Kết luận: Kiểm tra 20 hypothesis mà không điều chỉnh $\\to$ 64% cơ hội báo "có ý nghĩa" cho ít nhất 1 thứ không có ý nghĩa thật sự.

**Ví dụ thực tế**: "Chocolate cure for cancer" (viral study 2015). Prankster Johannes Bohannon chạy thật 18 test trên 5 nhóm (15 biến kết quả). Với $\\alpha=0{,}05$, kỳ vọng $18 \\times 0{,}05 \\approx 1$ false positive. Test weight loss: $p=0{,}04$. Media đưa tin ầm ĩ mà không kiểm tra study design. Đây chính xác là multiple testing problem.

### 5.2. Bonferroni Correction

**Ý tưởng**: Kiểm tra $m$ hypothesis, muốn FWER $\\leq \\alpha \\to$ dùng ngưỡng $\\alpha/m$ cho mỗi test.

$$\\alpha_{adjusted} = \\dfrac{\\alpha}{m}$$

**Ví dụ**: 20 test, $\\alpha = 0{,}05 \\to$ ngưỡng mới $= \\dfrac{0{,}05}{20} = \\mathbf{0{,}0025}$. Chỉ reject nếu $p < 0{,}0025$.

**Ưu điểm**: Đơn giản, kiểm soát FWER chặt.

**Nhược điểm**: **Conservative** (quá nghiêm ngặt) — tăng Type II error (miss nhiều hiệu ứng thật). Khi m lớn, ngưỡng rất thấp → khó reject bất cứ gì.

### 5.3. Benjamini-Hochberg (FDR correction)

**Ý tưởng**: Thay vì kiểm soát FWER (xác suất bất kỳ false positive), kiểm soát **False Discovery Rate (FDR)** = tỷ lệ kỳ vọng của false positive trong số các rejection.

**Thuật toán**:
1. Sắp xếp $m$ p-value theo thứ tự tăng dần: $p_{(1)} \\leq p_{(2)} \\leq \\ldots \\leq p_{(m)}$.
2. Tìm $k$ lớn nhất sao cho: $p_{(k)} \\leq \\dfrac{k}{m} \\alpha$.
3. Reject tất cả test từ 1 đến $k$.

**Ví dụ số**: 5 p-value (đã sort): {0,003, 0,012, 0,025, 0,08, 0,15}. $\\alpha = 0{,}05$, $m = 5$.

| k | $p_{(k)}$ | $\\frac{k}{5} \\times 0{,}05$ | $p \\leq$ threshold? |
|---|------|-----------|----------------|
| 1 | 0,003 | 0,010 | ✓ |
| 2 | 0,012 | 0,020 | ✓ |
| 3 | 0,025 | 0,030 | ✓ |
| 4 | 0,080 | 0,040 | ✗ |
| 5 | 0,150 | 0,050 | ✗ |

$k$ tối đa thỏa $= 3$. **Reject 3 test đầu tiên** ($p \\leq 0{,}025$).

So với Bonferroni: ngưỡng $= \\dfrac{0{,}05}{5} = 0{,}01 \\to$ chỉ reject test 1 ($p=0{,}003$). BH reject nhiều hơn (power cao hơn) đồng thời chấp nhận FDR $\\leq 5\\%$ thay vì FWER $\\leq 5\\%$.

---

## 6. "Statistically Significant" vs "Practically Significant"

### 6.1. Vấn đề cốt lõi

**Statistical significance** phụ thuộc vào n và α — là quyết định nhị phân.
**Practical significance** phụ thuộc vào **effect size** và **context**.

> ⚠ **Lỗi thường gặp**: Report "statistically significant (p=0.0001)" và đây là headline — nhưng không report effect size. Người đọc/nhà báo/stakeholder nghĩ "có hiệu ứng lớn" trong khi effect thực tế là d=0.05 (nhỏ đến mức vô nghĩa).

### 6.2. Framework đúng cho báo cáo

Thay vì chỉ "p < 0.05 → significant", hãy trả lời đầy đủ:

1. **Có hiệu ứng không?** → p-value (reject/fail-to-reject H₀).
2. **Hiệu ứng lớn cỡ nào?** → effect size (Cohen's d, η², r...).
3. **Ước lượng điểm kèm độ không chắc chắn?** → point estimate + CI.
4. **Có ý nghĩa thực tế không?** → context-specific judgment.

**Ví dụ báo cáo đúng**:

"Nhóm điều trị có mean = 4.8, nhóm chứng mean = 4.2 (sự khác biệt = 0.6 phút, 95% CI: [0.14, 1.06]). Independent t-test: t(198)=2.56, p=0.011, Cohen's d=0.36 (small-to-medium effect). Tuy có ý nghĩa thống kê, magnitude chỉ 0.6 phút — cần đánh giá business value để quyết định có roll out không."

> 📝 **Tóm tắt**
> - P-value: P(data cực đoan | H₀ đúng) — không phải P(H₀ đúng | data).
> - Type I (α): false positive. Type II (β): false negative. Power = 1-β.
> - Effect size (Cohen's d) không phụ thuộc n — đo ý nghĩa thực tế.
> - Sample size: small effect cần n rất lớn.
> - Multiple testing: m tests → tăng false positive rate. Dùng Bonferroni (chặt) hoặc BH-FDR (cân bằng hơn).
> - Always report: p + effect size + CI, không chỉ p.

---

## Bài tập

1. Test $H_0: \\mu=10$ trên $n=10.000$. Kết quả: $\\bar{x}=10{,}05$, $s=2$, $p=0{,}012$. Tính Cohen's d. Kết quả có "practically significant" không?

2. Một study có power $= 0{,}20$ (20%). Nếu $H_1$ đúng thật, xác suất "fail to detect" (Type II error) là bao nhiêu? Điều này có nghĩa gì về độ tin cậy của kết quả "không có ý nghĩa"?

3. Chạy 50 t-test độc lập với $\\alpha=0{,}05$. Không có hiệu ứng thật nào. (a) Bao nhiêu false positive kỳ vọng? (b) $P(\\text{ít nhất 1 false positive})$? (c) Nếu dùng Bonferroni, ngưỡng mới là bao nhiêu?

4. Dùng BH correction cho 6 p-values: {0,001, 0,008, 0,039, 0,065, 0,12, 0,25} với $\\alpha=0{,}05$. Test nào được reject?

## Lời giải chi tiết

### Bài 1

Cohen's d $= \\dfrac{\\bar{x} - \\mu_0}{s} = \\dfrac{10{,}05 - 10}{2} = \\mathbf{0{,}025}$ — cực nhỏ (xa dưới 0,2).

Dù $p=0{,}012 < 0{,}05$ (statistically significant), $d=0{,}025$ cho thấy hiệu ứng gần như không tồn tại về mặt thực tế. Với $n=10.000$, ngay cả sự khác biệt 0,05 đơn vị (trên thang 2 SD) cũng cho $p$ nhỏ. **Không practically significant**.

### Bài 2

$\\beta = 1 - \\text{power} = 1 - 0{,}20 = \\mathbf{0{,}80 = 80\\%}$.

Nghĩa là: nếu $H_1$ thật sự đúng (có hiệu ứng), study này có 80% xác suất báo "không có ý nghĩa" — miss hiệu ứng thật. Kết quả "không có ý nghĩa" từ study này gần như vô nghĩa: không thể phân biệt "không có hiệu ứng" vs "có hiệu ứng nhưng underpowered".

### Bài 3

(a) $E[\\text{false positives}] = 50 \\times 0{,}05 = \\mathbf{2{,}5 \\text{ false positives}}$ kỳ vọng.

(b) $P(\\text{ít nhất 1}) = 1 - (0{,}95)^{50} = 1 - 0{,}0769 \\approx \\mathbf{0{,}923 = 92{,}3\\%}$.

(c) Bonferroni: $\\dfrac{\\alpha}{m} = \\dfrac{0{,}05}{50} = \\mathbf{0{,}001}$. Chỉ reject $p < 0{,}001$.

### Bài 4

$m=6$ p-values sorted: {0,001, 0,008, 0,039, 0,065, 0,12, 0,25}. $\\alpha=0{,}05$.

| k | $p_{(k)}$ | $\\frac{k}{6} \\times 0{,}05$ | ≤? |
|---|------|-----------|-----|
| 1 | 0,001 | 0,0083 | ✓ |
| 2 | 0,008 | 0,0167 | ✓ |
| 3 | 0,039 | 0,025 | ✗ |
| 4 | 0,065 | 0,033 | ✗ |
| 5 | 0,12 | 0,042 | ✗ |
| 6 | 0,25 | 0,050 | ✗ |

$k$ tối đa $= 2$. **Reject 2 test đầu** ($p=0{,}001$ và $p=0{,}008$). Test 3 ($p=0{,}039$) không reject dù $p < 0{,}05$ thông thường — vì sau BH correction.

So với Bonferroni: ngưỡng $= \\dfrac{0{,}05}{6} \\approx 0{,}0083 \\to$ chỉ reject test 1 ($p=0{,}001$). BH reject nhiều hơn (test 1 và 2).

---

## Bài tiếp theo

[Lesson 07: Bootstrap & Permutation](../lesson-07-resampling/README.md) — Non-parametric inference không cần giả định phân phối.

## Tham khảo

- Nuzzo (2014) "Statistical Errors" — Nature. https://www.nature.com/articles/506150a
- Wasserstein & Lazar (2016) "The ASA Statement on p-Values" — American Statistician.
- Cohen (1988) "Statistical Power Analysis for the Behavioral Sciences."
- Benjamini & Hochberg (1995) "Controlling the False Discovery Rate."
`;
