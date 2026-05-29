// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Psychology/03-Clinical-Methods/lesson-05-statistics-in-psychology/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Statistics in Psychology: Thống kê trong tâm lý học

## Mục tiêu học tập

Sau bài này bạn sẽ:
- Biết khi nào dùng t-test, ANOVA, và correlation — và phân biệt chúng.
- Tính được Cohen's d và diễn giải đúng small/medium/large.
- Hiểu statistical power là gì và tại sao power thấp gây ra false positive rate cao.
- Tính sample size tối thiểu cho một nghiên cứu tâm lý học đơn giản.
- Phân biệt significance (p < 0.05) với practical importance (effect size).

## Kiến thức tiền đề

- [T3-L04 — Research Methods](../lesson-04-research-methods-ethics/): replication crisis và p-hacking cho thấy tại sao effect size + power quan trọng hơn chỉ p-value.
- **Đào sâu**: [Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample](../../../Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample/), [lesson-04-two-sample-tests](../../../Statistics/02-Inferential/lesson-04-two-sample-tests/), [lesson-05-anova-chisquare](../../../Statistics/02-Inferential/lesson-05-anova-chisquare/), [lesson-06-pvalue-power-effect](../../../Statistics/02-Inferential/lesson-06-pvalue-power-effect/).

---

## 1. Bức tranh tổng quan — Khi nào dùng test nào?

💡 **Hình dung**: Statistics là "tool kit" để trả lời câu hỏi "sự khác biệt này có thật không, hay chỉ do may mắn?". Từng tool phù hợp với từng loại câu hỏi.

| Câu hỏi nghiên cứu | Test phù hợp | Ví dụ psych |
|--------------------|-------------|-------------|
| So sánh mean 2 nhóm độc lập | Independent t-test | CBT vs control, BDI score |
| So sánh mean cùng người đo 2 lần | Paired t-test | Trước và sau therapy |
| So sánh mean so với giá trị biết trước | One-sample t-test | IQ so với population mean 100 |
| So sánh mean ≥3 nhóm | One-way ANOVA | 3 loại therapy |
| Mối quan hệ 2 biến liên tục | Pearson r | Anxiety cha mẹ và con cái |
| Mối quan hệ 2 biến categorical | Chi-square | Diagnosis × giới tính |

❓ **Câu hỏi tự nhiên**:
- *"Tại sao không dùng nhiều t-tests thay vì ANOVA?"* — Vì mỗi t-test có α=5% false positive rate. 3 nhóm cần 3 t-tests → cumulative α tăng. ANOVA kiểm soát family-wise error rate (xem L04).
- *"p-value < 0.05 có nghĩa là gì thực sự?"* — Xác suất nhận được data *này hoặc extreme hơn* giả sử H₀ thật. Không phải xác suất H₀ đúng hay sai.

---

## 2. Independent t-test — So sánh 2 nhóm

### 2.1 Công thức và logic

**t-statistic**:
$$t = \\frac{\\bar{X}_1 - \\bar{X}_2}{SE_{diff}}$$

Trong đó:
$$SE_{diff} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}$$

hoặc với pooled SD (khi sample sizes tương đương):
$$SE_{diff} = s_{pooled} \\times \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}$$

**Logic**: t lớn → sự khác biệt giữa hai nhóm lớn so với variability trong nhóm → khó giải thích bằng chance.

### 2.2 Walk-through số cụ thể 1 — Therapy outcome study

**Setup**: Nghiên cứu CBT cho depression. BDI scale (Beck Depression Inventory): điểm cao = depressed nhiều hơn.
- **CBT group**: n₁ = 30, M₁ = 18, SD₁ = 6.
- **Control group**: n₂ = 30, M₂ = 22, SD₂ = 7.

**Bước 1 — Pooled SD**:
$$s_{pooled} = \\sqrt{\\frac{(30-1) \\times 6^2 + (30-1) \\times 7^2}{30+30-2}} = \\sqrt{\\frac{29 \\times 36 + 29 \\times 49}{58}} = \\sqrt{\\frac{1044 + 1421}{58}} = \\sqrt{42.5} \\approx 6.52$$

**Bước 2 — SE_diff**:
$$SE_{diff} = 6.52 \\times \\sqrt{\\frac{1}{30} + \\frac{1}{30}} = 6.52 \\times \\sqrt{0.0667} = 6.52 \\times 0.258 = 1.68$$

**Bước 3 — t-statistic**:
$$t = \\frac{22 - 18}{1.68} = \\frac{4}{1.68} \\approx 2.38$$

**Bước 4 — Lookup**: df = 30+30-2 = 58. t(58) = 2.38, **p ≈ 0.021** (two-tailed). p < 0.05 → reject H₀.

**Verify**: t = 2.38 > critical value t(58, α=0.05) ≈ 2.00 → significant. ✓

**Kết luận**: CBT group có BDI score thấp hơn đáng kể so với control (M=18 vs M=22, t(58)=2.38, p=0.021).

⚠ **Nhưng chờ**: p=0.021 nói ta reject H₀, nhưng không nói sự khác biệt 4 điểm có *clinically meaningful* không → cần **effect size**.

---

## 3. Cohen's d — Effect Size cho t-test

### 3.1 Định nghĩa và ý nghĩa

**Cohen's d**:
$$d = \\frac{\\bar{X}_1 - \\bar{X}_2}{s_{pooled}}$$

**Là gì**: Đo sự khác biệt giữa 2 nhóm theo đơn vị *standard deviation*. d=1.0 → hai nhóm cách nhau 1 SD.

**Vì sao cần**: p-value phụ thuộc vào sample size. Với n=10,000, ngay cả d=0.01 (cực nhỏ, practically useless) có thể p < 0.0001. Effect size không phụ thuộc sample size.

**Benchmarks (Cohen, 1988)**:
| d | Mức độ | Ý nghĩa thực tiễn |
|---|--------|--------------------|
| 0.2 | Small | Phân biệt được nhưng nhỏ (vd chiều cao nam vs nữ theo inch) |
| 0.5 | Medium | Khác biệt rõ ràng với mắt thường |
| 0.8 | Large | Khác biệt lớn (vd chiều cao người 13 vs 18 tuổi) |

### 3.2 Walk-through — tiếp theo ví dụ CBT

$$d = \\frac{22 - 18}{6.52} = \\frac{4}{6.52} \\approx 0.61$$

→ **Medium effect size**. CBT tốt hơn control với mức độ vừa phải — consistent với literature (meta-analysis CBT cho MDD: d ≈ 0.55–0.70).

### 3.3 Walk-through số cụ thể 2 — Kiểm tra "trivial" effect

Giả sử cùng study nhưng n=500 mỗi nhóm:
- M₁=18.2, M₂=18.6, SD_pooled=6.5.
- SE_diff = 6.5 × √(1/500+1/500) = 6.5 × 0.063 = 0.41.
- t = (18.6−18.2)/0.41 = 0.4/0.41 = 0.98. p ≈ 0.33. NOT significant.

Nhưng nếu n=5000:
- SE_diff = 6.5 × √(2/5000) = 0.13.
- t = 0.4/0.13 = 3.08. p ≈ 0.002. SIGNIFICANT!
- d = 0.4/6.5 = 0.06 (tiny — practically meaningless).

**Lesson**: Với n đủ lớn, bất kỳ khác biệt trivial nào cũng "significant". Effect size mới nói lên *magnitude*.

❓ **Câu hỏi tự nhiên**:
- *"d=0.2 có bao giờ quan trọng không?"* — Có. Phụ thuộc context. d=0.2 cho vaccine prevention của rare deadly disease = clinically important. d=0.2 cho một app productivity = may not be worth the cost.
- *"Có overlap formula nào không?"* — Có: Cohen's U₃ = % người nhóm treatment tốt hơn median nhóm control. d=0.5 → U₃ ≈ 69% (người trị liệu tốt hơn median người không trị liệu).

📝 **Tóm tắt mục 2–3**: t = (M₁−M₂)/SE_diff. Ví dụ CBT: t(58)=2.38, p=0.021, d=0.61 (medium). Effect size không phụ thuộc n; p-value phụ thuộc n.

---

## 4. One-Way ANOVA — So sánh 3+ nhóm

### 4.1 Logic

ANOVA so sánh **between-group variance** (khác biệt giữa các nhóm) với **within-group variance** (khác biệt trong mỗi nhóm):

$$F = \\frac{MS_{between}}{MS_{within}} = \\frac{\\text{Variance do group differences}}{\\text{Variance do random noise}}$$

F lớn → group differences không giải thích được bằng random variation.

### 4.2 Walk-through — 3 therapy types

**Thiết kế**: 90 người được random assign vào 3 nhóm (n=30 mỗi nhóm):
- Group 1: CBT → mean BDI = 15.
- Group 2: Behavioral Activation → mean BDI = 17.
- Group 3: Waitlist Control → mean BDI = 22.
- Grand mean: (15+17+22)/3 = 18.

**Đã biết**: F(2, 87) = 5.4, p = 0.006, η² = 0.11.

**Diễn giải**:
- F(2, 87): df_between = 3-1 = 2; df_within = 90-3 = 87.
- p = 0.006 < 0.05 → ít nhất một cặp nhóm khác nhau đáng kể.
- η² = 0.11: 11% variance trong BDI scores được giải thích bởi loại therapy (medium effect).

**Hạn chế ANOVA**: Chỉ nói "có sự khác biệt" nhưng không nói *nhóm nào* khác nhau. Cần **post-hoc tests**.

**Post-hoc — Tukey HSD**:
- CBT vs Control: M_diff = 7, p = 0.003. Significant.
- BA vs Control: M_diff = 5, p = 0.020. Significant.
- CBT vs BA: M_diff = 2, p = 0.28. Not significant.

**Ý nghĩa**: Cả CBT và BA đều tốt hơn waitlist, nhưng không khác nhau đáng kể giữa hai active treatments.

### 4.3 Eta-squared (η²) — Effect size cho ANOVA

$$\\eta^2 = \\frac{SS_{between}}{SS_{total}}$$

Benchmarks: η² = 0.01 (small), 0.06 (medium), 0.14 (large).
η² = 0.11 trong ví dụ trên → medium-to-large.

---

## 5. Pearson Correlation (r)

### 5.1 Công thức và diễn giải

$$r = \\frac{\\sum(X_i - \\bar{X})(Y_i - \\bar{Y})}{(n-1)s_X s_Y}$$

r đo strength và direction của mối quan hệ tuyến tính giữa 2 biến liên tục.

| r | Diễn giải |
|---|----------|
| 0.0–0.1 | Negligible |
| 0.1–0.3 | Small |
| 0.3–0.5 | Moderate |
| 0.5–0.7 | Large |
| 0.7–1.0 | Very large |

### 5.2 Walk-through — Anxiety cha mẹ và con cái

**Study**: n=200 cặp cha/mẹ + con. Đo anxiety bằng STAI scale (20–80).

Kết quả: **r = 0.35, p < 0.001**.

**Tính p**: Với n=200, df=198.
$$t = r\\sqrt{\\frac{n-2}{1-r^2}} = 0.35\\sqrt{\\frac{198}{1-0.1225}} = 0.35\\sqrt{\\frac{198}{0.8775}} = 0.35 \\times 15.02 = 5.26$$

t(198) = 5.26 → p < 0.0001. Significant.

**Diễn giải**: Moderate positive correlation (r=0.35). Con cái của cha/mẹ có anxiety cao thường có anxiety cao hơn. Nhưng r² = 0.12 → anxiety cha/mẹ chỉ giải thích 12% variance trong anxiety con cái. 88% explained by other factors.

**Không thể kết luận**: Không phải cha/mẹ "gây ra" anxiety con. Confounds: shared genes, shared environment, reverse causation (lo lắng về sức khỏe con → cha/mẹ cũng lo).

---

## 6. Statistical Power — Sức mạnh phát hiện hiệu ứng

### 6.1 Định nghĩa

**Power (1-β)** = xác suất phát hiện ra hiệu ứng có thật khi nó tồn tại.

$$\\text{Power} = P(\\text{reject } H_0 \\mid H_0 \\text{ false})$$

- β = Type II error rate (false negative — bỏ lỡ hiệu ứng có thật).
- Convention: **power ≥ 0.80** (80% chance detect nếu effect thật sự tồn tại).

### 6.2 Determinants of Power

Power phụ thuộc vào 3 yếu tố:

1. **Effect size (d)**: d lớn hơn → dễ detect hơn → power cao hơn.
2. **Sample size (n)**: n lớn hơn → SE nhỏ hơn → power cao hơn.
3. **Alpha (α)**: α lớn hơn → easier to reject H₀ → power cao hơn (nhưng tradeoff với Type I error).

### 6.3 Walk-through — Sample size calculation

**Câu hỏi**: Cần bao nhiêu người để detect d=0.5 với α=0.05, power=0.80?

**Công thức xấp xỉ cho independent t-test**:
$$n_{per group} \\approx \\frac{2(z_{\\alpha/2} + z_\\beta)^2}{d^2}$$

Với α=0.05 → z_{α/2} = 1.96; power=0.80 → z_β = 0.84.

$$n = \\frac{2(1.96 + 0.84)^2}{0.5^2} = \\frac{2 \\times (2.80)^2}{0.25} = \\frac{2 \\times 7.84}{0.25} = \\frac{15.68}{0.25} = 62.7 \\approx \\textbf{64 per group}$$

→ **64 người mỗi nhóm** (tổng 128) để detect d=0.5 với power 80%.

### 6.4 Số liệu cụ thể — Power trong các nghiên cứu tâm lý học cổ điển

**Vấn đề**: Cohen (1962) review 70 studies trong Journal of Abnormal and Social Psychology. Median power để detect medium effect (d=0.5) = **~0.48** — chỉ 48% chance phát hiện dù effect có thật!

**Implications cho replication crisis**:
- Study có power = 0.48 được chạy, may mắn thấy p < 0.05 (false positive hoặc true positive).
- Khi người khác replicate với cùng n → 48% chance thấy lại. Giải thích một phần tại sao 36–39% replicate.
- **Winner's curse**: những studies "first successful" thường overestimate effect size do selection bias. Replication hướng về true effect nhỏ hơn.

### 6.5 Walk-through số cụ thể — Power calculation table

| d (effect) | n per group (power=0.80, α=0.05) | n per group (power=0.90) |
|-----------|:---:|:---:|
| Small (0.2) | 197 | 264 |
| Medium (0.5) | 64 | 85 |
| Large (0.8) | 26 | 34 |
| Very large (1.2) | 12 | 16 |

⚠ **Lỗi thường gặp**:
- "Mẫu của tôi n=20, có kết quả significant → tốt rồi" — Với n=20, power để detect d=0.5 chỉ ~0.34. Nếu significant với n nhỏ, khả năng cao là overestimate của true effect (winner's curse).
- "p < 0.001 = effect size lớn" — Sai. p phụ thuộc n. Với n=1000, d=0.1 (tiny) có thể cho p < 0.001.

---

## 7. Bridge sang Statistics — Mở rộng kiến thức

Các bài học này đi sâu hơn vào từng test:

| Link | Nội dung |
|------|---------|
| [Statistics/L03 — One-sample tests](../../../Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample/) | z-test, one-sample t, chi-square goodness-of-fit |
| [Statistics/L04 — Two-sample tests](../../../Statistics/02-Inferential/lesson-04-two-sample-tests/) | Independent t, paired t, Mann-Whitney |
| [Statistics/L05 — ANOVA & Chi-square](../../../Statistics/02-Inferential/lesson-05-anova-chisquare/) | One-way ANOVA, factorial, post-hoc, chi-square |
| [Statistics/L06 — p-value, power, effect](../../../Statistics/02-Inferential/lesson-06-pvalue-power-effect/) | Philosophical debate về p-value, APA guidelines, bayesian alternatives |

---

## 8. Bài tập thực hành

**Bài tập 1 — t-test và Cohen's d**:

Nghiên cứu mindfulness cho anxiety. STAI scale (20–80, cao = anxious hơn).
- Mindfulness group: n=25, M=38, SD=8.
- Control group: n=25, M=44, SD=9.

a) Tính pooled SD.
b) Tính t-statistic (dùng pooled SE).
c) df bằng bao nhiêu?
d) Tính Cohen's d.
e) Diễn giải: effect size ở mức nào?

**Bài tập 2 — ANOVA diễn giải**:

Nghiên cứu 3 loại trị liệu cho PTSD. F(2, 87) = 8.2, p = 0.0005, η² = 0.16.

a) Tổng số participants là bao nhiêu?
b) η² = 0.16 có nghĩa gì?
c) F significant → cần làm thêm gì để biết cụ thể nhóm nào khác nhau?
d) η² = 0.16 ở mức nào (small/medium/large)?

**Bài tập 3 — Power and Sample Size**:

Bạn muốn nghiên cứu liệu thiền định có giảm cortisol không.
Dựa vào literature: expect d ≈ 0.4 (moderate).

a) Với α=0.05, power=0.80, cần bao nhiêu người mỗi nhóm? (dùng công thức xấp xỉ)
b) Nếu chỉ có tiền để test n=20 mỗi nhóm, power bằng bao nhiêu? (approximate)
c) Nếu study chạy với n=20 mỗi nhóm và "có kết quả significant" — tại sao vẫn nên hoài nghi?

---

## 9. Lời giải chi tiết

### Bài 1:

**a) Pooled SD**:
$$s_{pooled} = \\sqrt{\\frac{(25-1) \\times 64 + (25-1) \\times 81}{25+25-2}} = \\sqrt{\\frac{24 \\times 64 + 24 \\times 81}{48}} = \\sqrt{\\frac{1536 + 1944}{48}} = \\sqrt{72.5} \\approx 8.51$$

**b) SE_diff**:
$$SE_{diff} = 8.51 \\times \\sqrt{\\frac{1}{25} + \\frac{1}{25}} = 8.51 \\times \\sqrt{0.08} = 8.51 \\times 0.283 = 2.41$$

**t-statistic**:
$$t = \\frac{44 - 38}{2.41} = \\frac{6}{2.41} \\approx 2.49$$

**c) df** = 25+25-2 = **48**.

**d) Cohen's d**:
$$d = \\frac{44-38}{8.51} = \\frac{6}{8.51} \\approx 0.71$$

**e) Diễn giải**: d = 0.71 → gần ngưỡng **Large** (d ≥ 0.8) nhưng chắc chắn trên Medium (d ≥ 0.5). Thực tiễn: người tham gia mindfulness có anxiety thấp hơn khoảng 0.7 SD so với control — khác biệt rõ ràng và clinically meaningful.

Với t(48) = 2.49, critical value t(48, α=0.05) ≈ 2.01 → **p ≈ 0.016 < 0.05, significant**.

### Bài 2:

**a) Tổng participants**: F(2, 87) → df_within = 87 = N - k = N - 3 → **N = 90 participants**.

**b) η² = 0.16**: 16% variance trong PTSD outcomes được giải thích bởi loại trị liệu. 84% còn lại do individual differences, measurement error, và factors khác.

**c) Cần post-hoc tests** (Tukey HSD, Bonferroni) để so sánh từng cặp nhóm với correction cho multiple comparisons.

**d) η² = 0.16 → Large effect** (benchmarks: 0.01 small, 0.06 medium, 0.14 large). Loại therapy giải thích một phần đáng kể của variance trong outcomes.

### Bài 3:

**a) Sample size cho d=0.4, α=0.05, power=0.80**:
$$n = \\frac{2(1.96+0.84)^2}{0.4^2} = \\frac{2 \\times 7.84}{0.16} = \\frac{15.68}{0.16} \\approx 98 \\text{ per group}$$

→ **98 người mỗi nhóm** (tổng ~196).

**b) Power với n=20, d=0.4**:
- SE_diff ≈ s × √(2/20) = 1 × 0.316 (standardized).
- noncentrality λ = d/SE_diff (standardized) = d × √(n/2) = 0.4 × √10 = 0.4 × 3.16 = 1.26.
- Power ≈ P(|Z| > 1.96 − 1.26) = P(|Z| > 0.70) ≈ **0.24** (chỉ 24%).

**c) Tại sao hoài nghi khi n=20, significant**: Power chỉ 24% → nếu study significant, xác suất cao là: (1) false positive (Type I), hoặc (2) true positive nhưng với overestimate effect size (winner's curse). Với power 24%, chỉ 24% true positives bị phát hiện — những cái "may mắn" bị phát hiện thường là cái có effect size lớn hơn thật (sampling fluctuation). Khi replicate, thường không replicate. Điều này giải thích tại sao nhiều classic studies với small n không replicate.

---

## Tổng kết Psychology — 3 tầng × 15 bài

Hoàn thành 15 bài Psychology! Lộ trình đã đi qua:
- **Tầng 1 (Cognitive)**: Perception, Attention, Memory, Biases, Decision Making.
- **Tầng 2 (Social/Developmental)**: Social influence, Group dynamics, Attribution, Development, Personality.
- **Tầng 3 (Clinical/Methods)**: Psychopathology, Therapy, Stress, Research Methods, Statistics.

**Bước tiếp theo**:
- [Economics/Tier4-Applied](../../../Economics/Tier4-Applied/): Behavioral economics ứng dụng — System 1/2, Prospect Theory, Nudge.
- [Statistics/02-Inferential](../../../Statistics/02-Inferential/): Đi sâu hơn về hypothesis testing, power, regression.

---

*[visualization.html](./visualization.html) — t-test calculator, ANOVA visualizer, power curve, effect size visualizer.*
`;
