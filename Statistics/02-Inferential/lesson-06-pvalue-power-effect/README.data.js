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
\`\`\`
p = P(T ≥ t_obs | H₀ đúng)   (one-sided right)
p = P(|T| ≥ |t_obs| | H₀ đúng)  (two-sided)
\`\`\`

### 1.2. Năm cách hiểu SAI (với phản chứng)

**Sai lầm 1: "p là xác suất H₀ đúng"**

Ví dụ sai: "p = 0.03, vậy H₀ sai với xác suất 97%."

Phản chứng: P(H₀|data) cần Bayes' theorem và prior P(H₀). Nếu H₀ a priori rất khả năng (vd kiểm tra đồng xu fair), p = 0.03 không có nghĩa là "đồng xu 97% không fair." Một cú tung 1000 lần ra 519 lần head sẽ có p ≈ 0.03 two-sided, nhưng đồng xu vẫn gần như chắc chắn fair.

**Sai lầm 2: "1-p là xác suất H₁ đúng"**

Trực tiếp sai theo logic trên. P(H₁|data) = 1 - P(H₀|data), không phải 1 - p-value.

**Sai lầm 3: "p nhỏ → effect lớn"**

Phản chứng: với n đủ lớn, ngay cả effect cực nhỏ cũng cho p cực nhỏ.

**Ví dụ số**: Hai nhóm IQ:
- Nhóm A: μ = 100.0, Nhóm B: μ = 100.1 (khác 0.1 điểm — hoàn toàn vô nghĩa thực tế).
- n = 1.000.000 mỗi nhóm, σ = 15.
- SE = 15/√1000000 = 0.015. z = 0.1/0.015 = 6.67. p < 0.00000001.
- **p cực nhỏ nhưng effect không có ý nghĩa thực tế nào.**

**Sai lầm 4: "p ≥ 0.05 → H₀ đúng / không có hiệu ứng"**

Phản chứng: Fail to reject H₀ có thể vì:
- Thật sự không có hiệu ứng (H₀ đúng), HOẶC
- Có hiệu ứng nhưng **n quá nhỏ** để phát hiện (low power).

**Ví dụ số**: Thuốc có effect nhỏ (d = 0.2). Với n = 20: power ≈ 14% → 86% cơ hội fail to reject dù thuốc có tác dụng.

**Sai lầm 5: "p-value là 'xác suất kết quả xảy ra do ngẫu nhiên'"**

Cụm từ "by chance" rất mơ hồ. Chính xác hơn: p đo mức độ bất thường của dữ liệu **dưới giả thuyết H₀**, không phải "xác suất ngẫu nhiên" theo nghĩa thông thường.

> ❓ **Câu hỏi tự nhiên**
> - **Q: Nếu p không phải P(H₀|data), thì nó dùng để làm gì?**
>   A: P-value là **quy tắc quyết định**: nếu p < α, ta có đủ bằng chứng để bác bỏ H₀ ở mức ý nghĩa α. Nó kiểm soát Type I error trong dài hạn — không hơn không kém.
> - **Q: Threshold p < 0.05 từ đâu ra?**
>   A: R.A. Fisher đề xuất 0.05 như "mức tiện dùng" vào 1925. Không có lý do toán học sâu xa nào — chỉ là convention. Nhiều field dùng 0.01 hoặc 0.001.

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

**(a) Là gì**: Effect size đo **độ lớn thực sự** của hiệu ứng, không phụ thuộc vào n. Cohen's d cho sự khác biệt hai mean:

\`\`\`
d = (μ₁ - μ₂) / σ_pooled

σ_pooled = √[(n₁-1)s₁² + (n₂-1)s₂²] / (n₁+n₂-2)
\`\`\`

**(b) Vì sao cần**: P-value phụ thuộc vào n (n lớn → p nhỏ dù effect không có). Effect size không phụ thuộc n → đo ý nghĩa thực tế.

**(c) Thang đánh giá (Cohen, 1988)**:

| d | Mức độ |
|---|--------|
| 0.2 | Nhỏ (small) |
| 0.5 | Vừa (medium) |
| 0.8 | Lớn (large) |
| > 1.2 | Rất lớn |

### 3.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Thuốc A vs Thuốc B**:
- Group A: x̄₁ = 140, s₁ = 20, n₁ = 50.
- Group B: x̄₂ = 130, s₂ = 18, n₂ = 50.
- σ_pooled = √[(49×400+49×324)/98] = √[(19600+15876)/98] = √362 ≈ 19.03
- d = (140-130)/19.03 ≈ **0.526** (medium effect)

**Ví dụ 2 — Ví dụ IQ từ trên**:
- μ₁ = 100.0, μ₂ = 100.1, σ = 15.
- d = 0.1/15 ≈ **0.0067** (cực nhỏ — không có ý nghĩa thực tế, dù p << 0.05 với n lớn).

**Ví dụ 3 — Training effectiveness**:
- Trước: x̄ = 60, Sau: x̄ = 72, σ = 15.
- d = (72-60)/15 = **0.8** (large effect)

**Ví dụ 4 — Giáo dục can thiệp**:
- Control: x̄ = 50, SD = 10. Treatment: x̄ = 53, SD = 10.
- d = 3/10 = **0.3** (nhỏ đến vừa — có ý nghĩa thực tế trong can thiệp giáo dục trên diện rộng)

> ⚠ **Lỗi thường gặp**: Báo cáo chỉ p-value mà không có effect size. APA guidelines, journal policies ngày càng yêu cầu báo cáo cả effect size + CI. "p < 0.001, d = 0.07, n = 50000" nói lên rất rõ: statistically significant nhưng practically negligible.

---

## 4. Sample Size Calculation — Power Analysis

### 4.1. Công thức cho two-sample t-test

\`\`\`
n (mỗi nhóm) = 2 × (z_α/2 + z_β)² / d²
\`\`\`

Với: z_α/2 = critical value cho α (two-sided), z_β = critical value cho power = 1-β.

Thường dùng:
- α = 0.05: z_α/2 = 1.96
- Power = 0.80 (β = 0.20): z_β = 0.842
- Power = 0.90 (β = 0.10): z_β = 1.282

### 4.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Medium effect (d=0.5), α=0.05, power=0.80**:
n = 2 × (1.96+0.842)² / 0.5² = 2 × 7.849 / 0.25 = 2 × 31.396 ≈ **64 người mỗi nhóm**

**Ví dụ 2 — Small effect (d=0.2), α=0.05, power=0.80**:
n = 2 × (1.96+0.842)² / 0.2² = 2 × 7.849 / 0.04 ≈ **393 người mỗi nhóm** (gần 800 tổng!)

Nhận xét: Effect nhỏ cần mẫu rất lớn. Nhiều nghiên cứu underpowered vì không tính trước.

**Ví dụ 3 — Large effect (d=0.8), α=0.01, power=0.90**:
z_α/2 = 2.576 (α=0.01), z_β = 1.282 (power=90%).
n = 2 × (2.576+1.282)² / 0.8² = 2 × 14.89 / 0.64 ≈ **47 người mỗi nhóm**

**Ví dụ 4 — A/B test conversion rate**:
Muốn detect thay đổi từ p₁=0.10 lên p₂=0.13 (3%), two-sided, α=0.05, power=0.80.
Effect size cho proportion: h = 2×arcsin(√p₂) - 2×arcsin(√p₁) ≈ 2×(0.3710-0.3217) ≈ 0.0986.
n = (1.96+0.842)²/0.0986² ≈ 7.849/0.00972 ≈ **808 người mỗi nhóm** (1616 tổng).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. d=0.5, α=0.05. Nếu muốn tăng power từ 0.80 lên 0.90, n thay đổi thế nào?
> <details><summary>Đáp án</summary>
> Power=0.90: n = 2×(1.96+1.282)²/0.25 = 2×10.509/0.25 ≈ 84 mỗi nhóm.
> Power=0.80: n ≈ 64 mỗi nhóm.
> Tăng power từ 80% lên 90% cần tăng n từ 64 lên 84 — khoảng 31%.
> </details>

---

## 5. Multiple Testing Problem

### 5.1. Vấn đề

> 💡 **Trực giác**: Thử nghiệm 20 giả thuyết độc lập với α=0.05, **dù tất cả đều đúng (không có hiệu ứng thật nào)**. Số false positive kỳ vọng là bao nhiêu?

**Tính số**: E[false positives] = 20 × 0.05 = **1 false positive**.

P(ít nhất 1 false positive) = 1 - (1-0.05)²⁰ = 1 - 0.358 = **0.642 = 64.2%**.

Kết luận: Kiểm tra 20 hypothesis mà không điều chỉnh → 64% cơ hội báo "có ý nghĩa" cho ít nhất 1 thứ không có ý nghĩa thật sự.

**Ví dụ thực tế**: "Chocolate cure for cancer" (viral study 2015). Prankster Johannes Bohannon chạy thật 18 test trên 5 nhóm (15 biến kết quả). Với α=0.05, kỳ vọng 18×0.05 ≈ 1 false positive. Test weight loss: p=0.04. Media đưa tin ầm ĩ mà không kiểm tra study design. Đây chính xác là multiple testing problem.

### 5.2. Bonferroni Correction

**Ý tưởng**: Kiểm tra m hypothesis, muốn FWER ≤ α → dùng ngưỡng α/m cho mỗi test.

\`\`\`
α_adjusted = α / m
\`\`\`

**Ví dụ**: 20 test, α = 0.05 → ngưỡng mới = 0.05/20 = **0.0025**. Chỉ reject nếu p < 0.0025.

**Ưu điểm**: Đơn giản, kiểm soát FWER chặt.

**Nhược điểm**: **Conservative** (quá nghiêm ngặt) — tăng Type II error (miss nhiều hiệu ứng thật). Khi m lớn, ngưỡng rất thấp → khó reject bất cứ gì.

### 5.3. Benjamini-Hochberg (FDR correction)

**Ý tưởng**: Thay vì kiểm soát FWER (xác suất bất kỳ false positive), kiểm soát **False Discovery Rate (FDR)** = tỷ lệ kỳ vọng của false positive trong số các rejection.

**Thuật toán**:
1. Sắp xếp m p-value theo thứ tự tăng dần: p₍₁₎ ≤ p₍₂₎ ≤ ... ≤ p₍ₘ₎.
2. Tìm k lớn nhất sao cho: p₍ₖ₎ ≤ (k/m) × α.
3. Reject tất cả test từ 1 đến k.

**Ví dụ số**: 5 p-value (đã sort): {0.003, 0.012, 0.025, 0.08, 0.15}. α = 0.05, m = 5.

| k | p₍ₖ₎ | (k/5)×0.05 | p ≤ threshold? |
|---|------|-----------|----------------|
| 1 | 0.003 | 0.010 | ✓ |
| 2 | 0.012 | 0.020 | ✓ |
| 3 | 0.025 | 0.030 | ✓ |
| 4 | 0.080 | 0.040 | ✗ |
| 5 | 0.150 | 0.050 | ✗ |

k tối đa thỏa = 3. **Reject 3 test đầu tiên** (p ≤ 0.025).

So với Bonferroni: ngưỡng = 0.05/5 = 0.01 → chỉ reject test 1 (p=0.003). BH reject nhiều hơn (power cao hơn) đồng thời chấp nhận FDR ≤ 5% thay vì FWER ≤ 5%.

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

1. Test H₀: μ=10 trên n=10.000. Kết quả: x̄=10.05, s=2, p=0.012. Tính Cohen's d. Kết quả có "practically significant" không?

2. Một study có power = 0.20 (20%). Nếu H₁ đúng thật, xác suất "fail to detect" (Type II error) là bao nhiêu? Điều này có nghĩa gì về độ tin cậy của kết quả "không có ý nghĩa"?

3. Chạy 50 t-test độc lập với α=0.05. Không có hiệu ứng thật nào. (a) Bao nhiêu false positive kỳ vọng? (b) P(ít nhất 1 false positive)? (c) Nếu dùng Bonferroni, ngưỡng mới là bao nhiêu?

4. Dùng BH correction cho 6 p-values: {0.001, 0.008, 0.039, 0.065, 0.12, 0.25} với α=0.05. Test nào được reject?

## Lời giải chi tiết

### Bài 1

Cohen's d = (x̄ - μ₀) / s = (10.05 - 10) / 2 = **0.025** — cực nhỏ (jauh dưới 0.2).

Dù p=0.012 < 0.05 (statistically significant), d=0.025 cho thấy hiệu ứng gần như không tồn tại về mặt thực tế. Với n=10.000, ngay cả sự khác biệt 0.05 đơn vị (trên thang 2 SD) cũng cho p nhỏ. **Không practically significant**.

### Bài 2

β = 1 - power = 1 - 0.20 = **0.80 = 80%**.

Nghĩa là: nếu H₁ thật sự đúng (có hiệu ứng), study này có 80% xác suất báo "không có ý nghĩa" — miss hiệu ứng thật. Kết quả "không có ý nghĩa" từ study này gần như vô nghĩa: không thể phân biệt "không có hiệu ứng" vs "có hiệu ứng nhưng underpowered".

### Bài 3

(a) E[false positives] = 50 × 0.05 = **2.5 false positives** kỳ vọng.

(b) P(ít nhất 1) = 1 - (0.95)⁵⁰ = 1 - 0.0769 ≈ **0.923 = 92.3%**.

(c) Bonferroni: α/m = 0.05/50 = **0.001**. Chỉ reject p < 0.001.

### Bài 4

m=6 p-values sorted: {0.001, 0.008, 0.039, 0.065, 0.12, 0.25}. α=0.05.

| k | p₍ₖ₎ | (k/6)×0.05 | ≤? |
|---|------|-----------|-----|
| 1 | 0.001 | 0.0083 | ✓ |
| 2 | 0.008 | 0.0167 | ✓ |
| 3 | 0.039 | 0.025 | ✗ |
| 4 | 0.065 | 0.033 | ✗ |
| 5 | 0.12 | 0.042 | ✗ |
| 6 | 0.25 | 0.050 | ✗ |

k tối đa = 2. **Reject 2 test đầu** (p=0.001 và p=0.008). Test 3 (p=0.039) không reject dù p < 0.05 thông thường — vì sau BH correction.

So với Bonferroni: ngưỡng = 0.05/6 ≈ 0.0083 → chỉ reject test 1 (p=0.001). BH reject nhiều hơn (test 1 và 2).

---

## Bài tiếp theo

[Lesson 07: Bootstrap & Permutation](../lesson-07-resampling/README.md) — Non-parametric inference không cần giả định phân phối.

## Tham khảo

- Nuzzo (2014) "Statistical Errors" — Nature. https://www.nature.com/articles/506150a
- Wasserstein & Lazar (2016) "The ASA Statement on p-Values" — American Statistician.
- Cohen (1988) "Statistical Power Analysis for the Behavioral Sciences."
- Benjamini & Hochberg (1995) "Controlling the False Discovery Rate."
`;
