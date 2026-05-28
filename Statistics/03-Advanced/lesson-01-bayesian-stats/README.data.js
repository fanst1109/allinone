// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/03-Advanced/lesson-01-bayesian-stats/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: Bayesian Statistics

> **Tầng 3 — Advanced · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Giải thích được sự khác biệt triết học giữa **frequentist** và **Bayesian** — hai trường phái lớn nhất của suy luận thống kê.
2. Áp dụng **định lý Bayes** để tính posterior từ prior và likelihood.
3. Hiểu và tính toán được **Beta–Binomial conjugate** — ví dụ giáo khoa chuẩn của Bayesian inference.
4. Phân biệt **MAP** (Maximum A Posteriori) với **posterior mean** và biết khi nào dùng cái nào.
5. Phân biệt **credible interval** (Bayesian) với **confidence interval** (frequentist) — và giải thích vì sao chúng KHÔNG bằng nhau dù đôi khi cho cùng số.

## Kiến thức tiền đề

- Tầng 1 toàn bộ: mean, variance, phân phối cơ bản.
- Tầng 2 toàn bộ: hypothesis testing, confidence interval.
- [\`../../../Vectors/05-Probability/lesson-02-conditional-bayes/\`](../../../Vectors/05-Probability/lesson-02-conditional-bayes/) — Bayes' theorem và xác suất có điều kiện (bắt buộc đọc trước nếu chưa quen).

---

## 1. Frequentist vs Bayesian — hai thế giới quan

> 💡 **Trực giác**: Frequentist tin rằng "xác suất = tần suất dài hạn". Bayesian tin rằng "xác suất = mức độ tin tưởng (degree of belief), có thể cập nhật". Câu hỏi "đồng xu này có thiên lệch không?" sẽ được hai trường phái trả lời rất khác nhau.

### 1.1. Frequentist

Theo frequentist, **tham số θ là cố định, dữ liệu mới là ngẫu nhiên**. Ta không thể nói P(θ = 0.5) vì θ không có phân phối — nó hoặc là 0.5 hoặc không. Để rút kết luận, ta tính:

- **p-value**: "Nếu θ = 0.5 thật, xác suất quan sát được kết quả ÍT NHẤT cực đoan như data của mình là bao nhiêu?"
- **Confidence interval (CI) 95%**: "Trong 100 lần lặp lại quy trình này, khoảng [a, b] sẽ bao phủ θ thật khoảng 95 lần."

**Hệ quả**: frequentist CI không có nghĩa là "P(θ ∈ [a,b]) = 95%". θ cố định — nó hoặc nằm trong khoảng hoặc không, không có xác suất. Câu nói "tôi 95% tin rằng θ trong khoảng này" là sai theo frequentist.

### 1.2. Bayesian

Theo Bayesian, **dữ liệu là quan sát cố định, tham số θ có phân phối** phản ánh sự không chắc chắn của ta:

- Trước khi thấy data: **prior P(θ)** — niềm tin ban đầu về θ.
- Khi thấy data X: cập nhật niềm tin bằng **định lý Bayes** → **posterior P(θ|X)**.

Bayesian cho phép hỏi trực tiếp: "P(θ > 0.5 | data) = ?"  — câu hỏi tự nhiên mà frequentist không thể trả lời trực tiếp.

### 1.3. Bảng so sánh

| Khía cạnh | Frequentist | Bayesian |
|-----------|-------------|----------|
| Tham số θ | Cố định, không có phân phối | Có phân phối, phản ánh sự không chắc |
| Xác suất | Tần suất dài hạn | Mức độ tin tưởng |
| Kết quả | p-value, CI | Posterior distribution |
| Prior | Không dùng | Bắt buộc chỉ định |
| Diễn giải | "Nếu lặp lại vô hạn lần..." | "Biết data này rồi, tin θ ra sao?" |
| Câu hỏi | "Reject H₀ không?" | "P(θ > 0.5 \\| data) = ?" |

> ❓ **Câu hỏi tự nhiên: Trường phái nào "đúng"?**
>
> Không có câu trả lời tuyệt đối. Frequentist có ưu điểm không yêu cầu prior (tránh chủ quan). Bayesian có ưu điểm cho phép kết hợp kiến thức chuyên gia vào prior và đưa ra câu trả lời trực tiếp hơn. Trong thực tế, ta chọn phương pháp phù hợp với bài toán.

> 📝 **Tóm tắt mục 1**:
> - Frequentist: θ cố định, xác suất = tần suất dài hạn.
> - Bayesian: θ có phân phối, xác suất = mức độ tin tưởng.
> - Bayesian cho phép trả lời "P(θ | data) = ?" trực tiếp.

---

## 2. Định lý Bayes cho tham số

### 2.1. Công thức

Định lý Bayes với tham số liên tục θ:

\`\`\`
P(θ | data) = P(data | θ) × P(θ) / P(data)
\`\`\`

Hay viết gọn hơn:

\`\`\`
posterior ∝ likelihood × prior
\`\`\`

Trong đó:

- **P(θ)** — **prior**: phân phối của θ trước khi thấy data. Thể hiện kiến thức/niềm tin ban đầu.
- **P(data | θ)** — **likelihood**: xác suất quan sát được data ĐÃ CHO θ. Đây là thứ data "nói" với ta.
- **P(θ | data)** — **posterior**: phân phối cập nhật của θ sau khi thấy data.
- **P(data)** — **marginal likelihood (evidence)**: hằng số chuẩn hóa, thường bỏ qua khi chỉ quan tâm shape của posterior.

> 💡 **Trực giác**: Prior là "niềm tin trước"; likelihood là "điểm dữ liệu chỉ ra"; posterior là "niềm tin sau". Giống như bác sĩ trước khi xét nghiệm (prior) → thấy kết quả xét nghiệm (likelihood) → điều chỉnh chẩn đoán (posterior).

### 2.2. Ví dụ walk-through: Tung đồng xu

Giả sử ta có một đồng xu, không biết xác suất ra mặt ngửa θ. Ta muốn ước lượng θ sau khi quan sát kết quả tung.

**Ví dụ 1: Prior uniform, 1 flip ra heads**

- Prior: P(θ) = Uniform(0, 1) — "không biết gì, mọi θ đều khả dĩ như nhau".
- Quan sát: 1 flip, ra heads (H = 1, T = 0).
- Likelihood: P(H=1 | θ) = θ (Bernoulli, ra ngửa với xác suất θ).
- Posterior ∝ θ × 1 = θ — là phân phối Beta(2, 1).
- Posterior mean = α/(α+β) = 2/(2+1) = 0.667. Hợp lý: quan sát 1 H, tự nhiên nghĩ θ > 0.5.

**Ví dụ 2: Prior uniform, 7 heads 3 tails**

- Prior: P(θ) = Uniform(0, 1) = Beta(1, 1).
- Quan sát: 7 heads, 3 tails (n=10).
- Likelihood: P(data | θ) = θ^7 × (1-θ)^3 (Binomial).
- Posterior: Beta(1+7, 1+3) = **Beta(8, 4)**.
- Posterior mean = 8/(8+4) = **8/12 ≈ 0.667**.
- MAP (mode) = (8-1)/(8+4-2) = 7/10 = **0.7**. Bằng MLE của frequentist — hợp lý với flat prior.

**Ví dụ 3: Prior có kiến thức chuyên gia, Beta(2, 2)**

- Prior: Beta(2, 2) — "nghĩ rằng đồng xu khá cân bằng, θ quanh 0.5".
- Quan sát: 7 heads, 3 tails.
- Posterior: Beta(2+7, 2+3) = **Beta(9, 5)**.
- Posterior mean = 9/(9+5) = **9/14 ≈ 0.643**.
- So sánh: prior kéo estimate về gần 0.5 hơn so với ví dụ 2 (0.643 < 0.667).

**Ví dụ 4: Prior mạnh (nhiều quan sát ảo), Beta(10, 10)**

- Prior: Beta(10, 10) — prior rất mạnh, tin rằng θ gần 0.5.
- Quan sát: 7 heads, 3 tails.
- Posterior: Beta(10+7, 10+3) = **Beta(17, 13)**.
- Posterior mean = 17/(17+13) = **17/30 ≈ 0.567**.
- Prior mạnh → data 10 flip chưa đủ để thay đổi niềm tin nhiều. Phải có nhiều data hơn để "thuyết phục" prior mạnh.

> ⚠ **Lỗi thường gặp**: Nhầm likelihood P(data|θ) với posterior P(θ|data). Ví dụ: "likelihood θ=0.7 là 0.12 cho data này" KHÔNG có nghĩa là "xác suất θ=0.7 là 12% khi biết data này". Posterior cần nhân thêm prior và chuẩn hóa.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Prior từ đâu ra? Có tuỳ tiện không?**
> A: Prior là kiến thức chuyên gia, kinh nghiệm từ dữ liệu trước, hoặc chọn "non-informative" (như Uniform). Với nhiều data, prior ít ảnh hưởng — posterior do data chi phối. Với ít data, prior quan trọng hơn và phải được biện minh.
>
> **Q: Marginal likelihood P(data) tính thế nào?**
> A: P(data) = ∫ P(data|θ)P(θ)dθ. Tích phân này thường không có dạng closed form và rất tốn kém tính. Đó là lý do MCMC, variational inference ra đời — để tránh tính trực tiếp P(data).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Prior Beta(3, 3), quan sát 5 heads 5 tails. Posterior là phân phối gì? Posterior mean bằng bao nhiêu?
> <details><summary>Đáp án</summary>
> Posterior = Beta(3+5, 3+5) = Beta(8, 8). Posterior mean = 8/(8+8) = 0.5. Hợp lý: data cân bằng + prior cân bằng = posterior cân bằng.
> </details>

> 📝 **Tóm tắt mục 2**:
> - Bayes rule: posterior ∝ likelihood × prior.
> - Prior thể hiện kiến thức ban đầu; likelihood thể hiện "tiếng nói" của data.
> - Posterior mean tổng hợp cả hai, bị kéo về phía prior nếu prior mạnh hoặc data ít.

---

## 3. Beta–Binomial conjugate

### 3.1. Conjugate prior là gì?

> 💡 **Trực giác**: Một prior được gọi là **conjugate** với likelihood nếu posterior có cùng họ phân phối với prior. Lợi ích: tính toán đơn giản, có công thức closed form, không cần số trị (MCMC).

**Định nghĩa chính thức**: Prior P(θ) là conjugate với likelihood P(data|θ) nếu:

\`\`\`
P(θ) ∈ họ F  ⟹  P(θ | data) ∈ họ F
\`\`\`

### 3.2. Beta–Binomial

Với thí nghiệm Binomial (n lần tung, H lần ngửa):

- Likelihood: P(H | n, θ) ∝ θ^H × (1-θ)^(n-H)
- Prior conjugate: **Beta(α, β)** với density ∝ θ^(α-1) × (1-θ)^(β-1)
- Posterior: **Beta(α + H, β + (n − H))**

**Diễn giải trực giác về α, β**: Beta(α, β) tương đương đã quan sát (α-1) heads và (β-1) tails trong "dữ liệu ảo" trước khi thực sự tung đồng xu. Ta cộng dữ liệu thật vào dữ liệu ảo.

### 3.3. Thống kê quan trọng của Beta(α, β)

| Thống kê | Công thức | Ví dụ Beta(9, 5) |
|----------|-----------|------------------|
| Mean | α / (α + β) | 9/14 ≈ 0.643 |
| Mode (MAP) | (α - 1) / (α + β - 2) | 8/12 ≈ 0.667 |
| Variance | αβ / [(α+β)²(α+β+1)] | 9×5 / (14²×15) ≈ 0.015 |
| Độ lệch chuẩn | √Variance | ≈ 0.122 |

**Walk-through Beta(9, 5) — tiếp tục từ ví dụ 3 ở mục 2:**

Prior: Beta(2, 2), quan sát 7H, 3T → Posterior: Beta(9, 5).

- Mean = 9/14 = 0.6429
- Mode = 8/12 = 0.6667
- Var = (9×5)/(14²×15) = 45/2940 = 0.0153
- SD = √0.0153 ≈ 0.124
- 95% credible interval ≈ [0.39, 0.87] (lấy từ percentile 2.5 và 97.5 của Beta(9,5))

> ⚠ **Lỗi thường gặp**: Nhầm MAP (mode) với MLE. Với flat prior Beta(1,1), MAP = MLE = H/n. Nhưng với prior có thông tin, MAP ≠ MLE — MAP "điều chỉnh" MLE về phía prior.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Nếu không có conjugate prior, làm sao?**
> A: Dùng MCMC (Markov Chain Monte Carlo) hoặc Variational Inference để xấp xỉ posterior. Ví dụ: Stan, PyMC3, NumPyro là các thư viện phổ biến. Conjugate chỉ có trong một số họ phân phối đặc biệt.
>
> **Q: Prior Beta(1, 1) có nghĩa gì về mặt thực tế?**
> A: Uniform(0,1) — mọi θ đều khả dĩ như nhau. Đây là "non-informative prior" đơn giản nhất cho tham số xác suất. Posterior = Beta(1+H, 1+T) với mean = (H+1)/(n+2) — "Laplace smoothing".

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Một đồng xu mới ra lò, ta không biết gì → dùng prior Beta(1, 1). Tung 20 lần: 14 heads, 6 tails. Tính posterior mean và 95% credible interval (dùng công thức xấp xỉ mean ± 2SD).
> <details><summary>Đáp án</summary>
> Posterior: Beta(1+14, 1+6) = Beta(15, 7). Mean = 15/22 ≈ 0.682. Var = 15×7/(22²×23) = 105/11132 ≈ 0.00943. SD ≈ 0.097. CI xấp xỉ [0.682 - 2×0.097, 0.682 + 2×0.097] = [0.488, 0.876]. (Lưu ý: đây là xấp xỉ normal; CI chính xác từ Beta quantile sẽ khác đôi chút.)
> </details>

---

## 4. MAP và posterior mean — hai ước lượng điểm

### 4.1. Tại sao cần ước lượng điểm?

Posterior là một phân phối — chứa toàn bộ thông tin về θ. Nhưng đôi khi ta cần **một con số duy nhất** để đưa ra quyết định (ví dụ: quyết định đồng xu có thiên lệch không, cần một ước lượng θ cụ thể). Hai ước lượng điểm phổ biến:

### 4.2. MAP — Maximum A Posteriori

\`\`\`
θ_MAP = argmax_θ P(θ | data) = argmax_θ [P(data | θ) × P(θ)]
\`\`\`

MAP tìm θ **làm posterior đạt giá trị lớn nhất** — tức mode của posterior. Với Beta(α, β): MAP = (α-1)/(α+β-2) (với α,β > 1).

**Ví dụ 1**: Prior Beta(2,2), 7H 3T → posterior Beta(9,5) → MAP = 8/12 ≈ **0.667**
**Ví dụ 2**: Prior Beta(1,1), 7H 3T → posterior Beta(8,4) → MAP = 7/10 = **0.7** (= MLE)
**Ví dụ 3**: Prior Beta(5,5), 1H 0T → posterior Beta(6,5) → MAP = 5/9 ≈ **0.556** (prior kéo mạnh về 0.5)
**Ví dụ 4**: Prior Beta(1,1), 0H 0T (chưa tung) → posterior Beta(1,1) → MAP **không xác định** (uniform không có mode đơn)

### 4.3. Posterior mean

\`\`\`
θ_mean = E[θ | data] = α_post / (α_post + β_post)   [với Beta posterior]
\`\`\`

Posterior mean tối ưu hóa **mean squared error** — đây là ước lượng "trung bình" của posterior.

### 4.4. Khi nào dùng MAP vs posterior mean?

| Tình huống | Dùng | Lý do |
|-----------|------|-------|
| Posterior đối xứng (normal-like) | Cả hai đều OK | MAP = posterior mean |
| Posterior lệch (skewed) | Posterior mean | MAP có thể không đại diện tốt |
| Loss function là 0-1 (đúng/sai) | MAP | Tối đa hóa xác suất đúng |
| Loss function là squared error | Posterior mean | Tối thiểu hóa MSE |

> ⚠ **Lỗi thường gặp**: Báo MAP như thể nó là "chân lý" duy nhất. MAP bỏ qua độ rộng của posterior — hai posterior có cùng MAP nhưng độ phân tán rất khác sẽ dẫn đến quyết định khác nhau trong điều kiện bất định. Luôn kèm theo credible interval.

---

## 5. Credible interval vs Confidence interval

### 5.1. Định nghĩa

**Credible interval (Bayesian)**: Khoảng [a, b] sao cho P(a ≤ θ ≤ b | data) = 0.95.

Đây là **câu trả lời trực tiếp**: "Biết data rồi, tôi 95% tin rằng θ nằm trong [a, b]."

**Confidence interval (frequentist)**: Quy trình tạo khoảng [L(data), U(data)] sao cho nếu lặp lại thí nghiệm vô hạn lần, khoảng sẽ bao phủ θ thật 95% số lần.

### 5.2. Ví dụ walk-through với Prior Beta(2, 2), 7H 3T

Posterior: Beta(9, 5).

**Credible interval 95% (HDI — Highest Density Interval)**:
Tìm [a, b] sao cho P(a ≤ θ ≤ b | data) = 0.95 với độ dài [a,b] nhỏ nhất.
- Từ bảng phân vị Beta: a = Beta_0.025(9,5) ≈ **0.370**, b = Beta_0.975(9,5) ≈ **0.880**.
- Diễn giải Bayesian: "Có 95% khả năng θ nằm trong [0.37, 0.88], biết rằng ta đã quan sát 7H 3T với prior Beta(2,2)."

**Confidence interval 95% (frequentist, Wilson method)**:
Với p̂ = 7/10 = 0.7, n = 10:
- CI Wilson ≈ [0.350, 0.933]
- Diễn giải frequentist: "Quy trình này sẽ chứa θ thật trong 95% lần thực hiện."
- **KHÔNG** được diễn giải là "P(θ ∈ [0.35, 0.93]) = 95%".

### 5.3. Khi nào hai cái cho kết quả khác nhau?

| Tình huống | CI ≈ Credible | CI ≠ Credible |
|-----------|:---:|:---:|
| Prior flat (uniform) + nhiều data | ✓ | |
| Prior mạnh + ít data | | ✓ |
| Tham số ở biên (0, 1) | | ✓ |
| Phân phối đối xứng, nhiều data | ✓ | |

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Tại sao nhiều người dùng CI nhưng lại diễn giải theo kiểu Bayesian?**
> A: Đây là lỗi diễn giải rất phổ biến — ngay cả trong sách giáo khoa. Câu "95% CI = [a,b] nghĩa là θ nằm trong [a,b] với xác suất 95%" là SAI theo frequentist. Nhưng con người tư duy tự nhiên theo Bayesian. Đây là một trong những lý do Bayesian statistics ngày càng phổ biến.

---

## 6. Bayes Factor

### 6.1. Là gì và vì sao cần?

Bayes Factor (BF) là công cụ so sánh hai mô hình M₁ và M₂ dưới framework Bayesian:

\`\`\`
BF₁₂ = P(data | M₁) / P(data | M₂)
\`\`\`

BF > 1: data ủng hộ M₁ hơn. BF < 1: data ủng hộ M₂ hơn.

**Ý nghĩa thực tế**: BF₁₂ = 10 nghĩa là data "10 lần khả dĩ hơn" dưới M₁ so với M₂.

### 6.2. Thang đánh giá Jeffreys

| BF₁₂ | Bằng chứng cho M₁ |
|------|------------------|
| 1 – 3 | Chưa đáng kể |
| 3 – 10 | Khá mạnh |
| 10 – 30 | Mạnh |
| 30 – 100 | Rất mạnh |
| > 100 | Quyết định |

### 6.3. Ví dụ walk-through

**Bài toán**: Đồng xu quan sát 15 heads, 5 tails (n=20). So sánh:
- M₁: θ = 0.5 (đồng xu cân bằng)
- M₂: θ = 0.75 (đồng xu thiên lệch 75%)

**Bước 1**: Tính P(data | M₁):
\`\`\`
P(15H, 5T | θ=0.5) = C(20,15) × 0.5^15 × 0.5^5
= 15504 × (1/2)^20
= 15504 / 1048576
≈ 0.01479
\`\`\`

**Bước 2**: Tính P(data | M₂):
\`\`\`
P(15H, 5T | θ=0.75) = C(20,15) × 0.75^15 × 0.25^5
= 15504 × 0.01336 × 0.000977
≈ 15504 × 1.305×10⁻⁵
≈ 0.2023
\`\`\`

**Bước 3**: Tính Bayes Factor:
\`\`\`
BF₁₂ = 0.01479 / 0.2023 ≈ 0.073
BF₂₁ = 0.2023 / 0.01479 ≈ 13.7
\`\`\`

**Kết luận**: BF₂₁ ≈ 13.7 → data ủng hộ M₂ (θ=0.75) **mạnh** hơn M₁ (θ=0.5). Điều này hợp lý: 15/20 = 75% head → data khớp M₂ hơn.

> ⚠ **Lỗi thường gặp**: Bayes Factor khác posterior odds. BF so sánh likelihood của data; posterior odds còn phụ thuộc prior odds: Posterior_odds = BF × Prior_odds.

> 📝 **Tóm tắt mục 6**:
> - BF = tỉ số marginal likelihood của hai mô hình.
> - BF > 10: bằng chứng mạnh cho mô hình tử số.
> - Khác p-value: BF có thể ủng hộ H₀ ("không có hiệu ứng"), trong khi p-value chỉ đưa ra bằng chứng chống H₀.

---

## Bài tập

1. **Prior sensitivity**: Một nhà nghiên cứu quan sát 8 heads 4 tails (n=12). So sánh posterior mean khi dùng ba prior khác nhau: Beta(1,1), Beta(2,2), Beta(10,10). Nhận xét ảnh hưởng của prior.

2. **Bayesian update tuần tự**: Bắt đầu với prior Beta(1,1). Ngày 1: quan sát 3H 2T. Ngày 2: quan sát thêm 4H 1T. Tính posterior sau ngày 1, sau ngày 2. So sánh với việc cập nhật một lần từ tổng 7H 3T.

3. **Credible interval**: Với prior Beta(3,3) và quan sát 10H 5T, tính posterior. Tính posterior mean, MAP, và xấp xỉ 95% CI bằng công thức mean ± 2SD.

4. **Bayes Factor**: Đồng xu quan sát 12 heads 8 tails. Tính Bayes Factor cho M₁: θ=0.5 vs M₂: θ=0.6. Kết luận gì?

---

## Lời giải chi tiết

### Bài 1

Ba prior → ba posterior:

**Prior Beta(1,1)** (flat prior):
- Posterior: Beta(1+8, 1+4) = Beta(9, 5)
- Mean = 9/14 ≈ **0.643**

**Prior Beta(2,2)** (yếu, thiên về 0.5):
- Posterior: Beta(2+8, 2+4) = Beta(10, 6)
- Mean = 10/16 = **0.625**

**Prior Beta(10,10)** (mạnh, rất tin θ ≈ 0.5):
- Posterior: Beta(10+8, 10+4) = Beta(18, 14)
- Mean = 18/32 = **0.5625**

**Nhận xét**: Prior càng mạnh (α+β lớn = nhiều "pseudo-observations") → posterior mean bị kéo về mean của prior (0.5) nhiều hơn. Data 12 flip chưa đủ để "áp đảo" prior Beta(10,10) tương đương 20 pseudo-observations. Cần nhiều data hơn để posterior ít phụ thuộc prior.

### Bài 2

**Ngày 1**: Prior Beta(1,1) → Posterior₁ = Beta(1+3, 1+2) = Beta(4, 3). Mean = 4/7 ≈ 0.571.

**Ngày 2**: Prior = Posterior₁ = Beta(4,3) → Posterior₂ = Beta(4+4, 3+1) = Beta(8, 4). Mean = 8/12 ≈ **0.667**.

**Cập nhật một lần từ tổng**: Prior Beta(1,1), 7H 3T → Beta(8,4). Mean = 8/12 = **0.667**.

**Kết luận**: Hai cách **cho kết quả giống hệt nhau**. Đây là tính chất tuần tự (sequential consistency) của Bayesian inference — thứ tự cập nhật không quan trọng, chỉ quan trọng tổng dữ liệu. Rất hữu ích: có thể cập nhật mô hình online khi data đến từng phần.

### Bài 3

Prior Beta(3,3), 10H 5T → Posterior: Beta(3+10, 3+5) = **Beta(13, 8)**.

- Mean = 13/21 ≈ **0.619**
- Mode (MAP) = 12/19 ≈ **0.632**
- Var = 13×8 / (21² × 22) = 104/9702 ≈ 0.01072
- SD ≈ √0.01072 ≈ **0.1035**
- 95% CI ≈ [0.619 - 2×0.1035, 0.619 + 2×0.1035] = [**0.412, 0.826**]

Diễn giải Bayesian: "Biết prior và data, có 95% khả năng θ ∈ [0.41, 0.83]."

### Bài 4

n=20, 12H 8T.

**P(data | θ=0.5)**:
\`\`\`
C(20,12) × 0.5^12 × 0.5^8 = 125970 × (0.5)^20
= 125970 / 1048576 ≈ 0.1201
\`\`\`

**P(data | θ=0.6)**:
\`\`\`
C(20,12) × 0.6^12 × 0.4^8 = 125970 × 0.002177 × 0.000655
= 125970 × 1.426×10⁻⁶ ≈ 0.1797
\`\`\`

**BF₁₂ = 0.1201 / 0.1797 ≈ 0.668**  
**BF₂₁ = 0.1797 / 0.1201 ≈ 1.496**

BF₂₁ ≈ 1.5 — theo thang Jeffreys, bằng chứng "chưa đáng kể" cho M₂. Data 12/20 = 60% nhỉnh hơn θ=0.6 so với θ=0.5, nhưng sự chênh lệch chưa đủ rõ ràng với n=20. Cần nhiều data hơn để phân biệt θ=0.5 vs θ=0.6.

---

## Bài tiếp theo

[Lesson 02: Suy luận nhân quả →](../lesson-02-causal-inference/README.md)

Từ Bayesian (cách cập nhật niềm tin về tham số), ta chuyển sang câu hỏi sâu hơn: dữ liệu có thể nói gì về **quan hệ nhân quả**?

---

## Tham khảo

- Gelman, A. et al. — *Bayesian Data Analysis* (3rd ed., 2013) — quyển kinh điển, miễn phí online.
- Kruschke, J. — *Doing Bayesian Data Analysis* — tiếp cận practical, kèm R/Python code.
- McElreath, R. — *Statistical Rethinking* — rất được khuyến nghị, phong cách trực quan.
- [Visualizing Bayesian Updating](https://seeing-theory.brown.edu/) — Seeing Theory, Brown University.
`;
