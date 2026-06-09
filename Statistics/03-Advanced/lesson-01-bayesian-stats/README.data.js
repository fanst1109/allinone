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

Theo frequentist, **tham số $\\theta$ là cố định, dữ liệu mới là ngẫu nhiên**. Ta không thể nói $P(\\theta = 0{,}5)$ vì $\\theta$ không có phân phối — nó hoặc là $0{,}5$ hoặc không. Để rút kết luận, ta tính:

- **p-value**: "Nếu $\\theta = 0{,}5$ thật, xác suất quan sát được kết quả ÍT NHẤT cực đoan như data của mình là bao nhiêu?"
- **Confidence interval (CI) 95%**: "Trong 100 lần lặp lại quy trình này, khoảng $[a, b]$ sẽ bao phủ $\\theta$ thật khoảng 95 lần."

**Hệ quả**: frequentist CI không có nghĩa là "$P(\\theta \\in [a,b]) = 95\\%$". $\\theta$ cố định — nó hoặc nằm trong khoảng hoặc không, không có xác suất. Câu nói "tôi 95% tin rằng $\\theta$ trong khoảng này" là sai theo frequentist.

### 1.2. Bayesian

Theo Bayesian, **dữ liệu là quan sát cố định, tham số $\\theta$ có phân phối** phản ánh sự không chắc chắn của ta:

- Trước khi thấy data: **prior $P(\\theta)$** — niềm tin ban đầu về $\\theta$.
- Khi thấy data X: cập nhật niềm tin bằng **định lý Bayes** → **posterior $P(\\theta \\mid X)$**.

Bayesian cho phép hỏi trực tiếp: "$P(\\theta > 0{,}5 \\mid \\text{data}) = ?$" — câu hỏi tự nhiên mà frequentist không thể trả lời trực tiếp.

### 1.3. Bảng so sánh

| Khía cạnh | Frequentist | Bayesian |
|-----------|-------------|----------|
| Tham số $\\theta$ | Cố định, không có phân phối | Có phân phối, phản ánh sự không chắc |
| Xác suất | Tần suất dài hạn | Mức độ tin tưởng |
| Kết quả | p-value, CI | Posterior distribution |
| Prior | Không dùng | Bắt buộc chỉ định |
| Diễn giải | "Nếu lặp lại vô hạn lần..." | "Biết data này rồi, tin $\\theta$ ra sao?" |
| Câu hỏi | "Reject $H_0$ không?" | "$P(\\theta > 0{,}5 \\mid \\text{data}) = ?$" |

> ❓ **Câu hỏi tự nhiên: Trường phái nào "đúng"?**
>
> Không có câu trả lời tuyệt đối. Frequentist có ưu điểm không yêu cầu prior (tránh chủ quan). Bayesian có ưu điểm cho phép kết hợp kiến thức chuyên gia vào prior và đưa ra câu trả lời trực tiếp hơn. Trong thực tế, ta chọn phương pháp phù hợp với bài toán.

> 📝 **Tóm tắt mục 1**:
> - Frequentist: $\\theta$ cố định, xác suất = tần suất dài hạn.
> - Bayesian: $\\theta$ có phân phối, xác suất = mức độ tin tưởng.
> - Bayesian cho phép trả lời "$P(\\theta \\mid \\text{data}) = ?$" trực tiếp.

---

## 2. Định lý Bayes cho tham số

### 2.1. Công thức

Định lý Bayes với tham số liên tục $\\theta$:

$$P(\\theta \\mid \\text{data}) = \\dfrac{P(\\text{data} \\mid \\theta)\\,P(\\theta)}{P(\\text{data})}$$

Hay viết gọn hơn:

$$\\text{posterior} \\propto \\text{likelihood} \\times \\text{prior}$$

Trong đó:

- **$P(\\theta)$** — **prior**: phân phối của $\\theta$ trước khi thấy data. Thể hiện kiến thức/niềm tin ban đầu.
- **$P(\\text{data} \\mid \\theta)$** — **likelihood**: xác suất quan sát được data ĐÃ CHO $\\theta$. Đây là thứ data "nói" với ta.
- **$P(\\theta \\mid \\text{data})$** — **posterior**: phân phối cập nhật của $\\theta$ sau khi thấy data.
- **$P(\\text{data})$** — **marginal likelihood (evidence)**: hằng số chuẩn hóa, thường bỏ qua khi chỉ quan tâm shape của posterior.

> 💡 **Trực giác**: Prior là "niềm tin trước"; likelihood là "điểm dữ liệu chỉ ra"; posterior là "niềm tin sau". Giống như bác sĩ trước khi xét nghiệm (prior) → thấy kết quả xét nghiệm (likelihood) → điều chỉnh chẩn đoán (posterior).

### 2.2. Ví dụ walk-through: Tung đồng xu

Giả sử ta có một đồng xu, không biết xác suất ra mặt ngửa $\\theta$. Ta muốn ước lượng $\\theta$ sau khi quan sát kết quả tung.

**Ví dụ 1: Prior uniform, 1 flip ra heads**

- Prior: $P(\\theta) = \\text{Uniform}(0, 1)$ — "không biết gì, mọi $\\theta$ đều khả dĩ như nhau".
- Quan sát: 1 flip, ra heads ($H = 1, T = 0$).
- Likelihood: $P(H=1 \\mid \\theta) = \\theta$ (Bernoulli, ra ngửa với xác suất $\\theta$).
- Posterior $\\propto \\theta \\times 1 = \\theta$ — là phân phối $\\text{Beta}(2, 1)$.
- Posterior mean $= \\dfrac{\\alpha}{\\alpha+\\beta} = \\dfrac{2}{2+1} = 0{,}667$. Hợp lý: quan sát 1 H, tự nhiên nghĩ $\\theta > 0{,}5$.

**Ví dụ 2: Prior uniform, 7 heads 3 tails**

- Prior: $P(\\theta) = \\text{Uniform}(0, 1) = \\text{Beta}(1, 1)$.
- Quan sát: 7 heads, 3 tails ($n=10$).
- Likelihood: $P(\\text{data} \\mid \\theta) = \\theta^7 \\times (1-\\theta)^3$ (Binomial).
- Posterior: $\\text{Beta}(1+7, 1+3) = \\textbf{Beta(8, 4)}$.
- Posterior mean $= \\dfrac{8}{8+4} = \\mathbf{\\dfrac{8}{12} \\approx 0{,}667}$.
- MAP (mode) $= \\dfrac{8-1}{8+4-2} = \\dfrac{7}{10} = \\mathbf{0{,}7}$. Bằng MLE của frequentist — hợp lý với flat prior.

**Ví dụ 3: Prior có kiến thức chuyên gia, Beta(2, 2)**

- Prior: $\\text{Beta}(2, 2)$ — "nghĩ rằng đồng xu khá cân bằng, $\\theta$ quanh $0{,}5$".
- Quan sát: 7 heads, 3 tails.
- Posterior: $\\text{Beta}(2+7, 2+3) = \\textbf{Beta(9, 5)}$.
- Posterior mean $= \\dfrac{9}{9+5} = \\mathbf{\\dfrac{9}{14} \\approx 0{,}643}$.
- So sánh: prior kéo estimate về gần $0{,}5$ hơn so với ví dụ 2 ($0{,}643 < 0{,}667$).

**Ví dụ 4: Prior mạnh (nhiều quan sát ảo), Beta(10, 10)**

- Prior: $\\text{Beta}(10, 10)$ — prior rất mạnh, tin rằng $\\theta$ gần $0{,}5$.
- Quan sát: 7 heads, 3 tails.
- Posterior: $\\text{Beta}(10+7, 10+3) = \\textbf{Beta(17, 13)}$.
- Posterior mean $= \\dfrac{17}{17+13} = \\mathbf{\\dfrac{17}{30} \\approx 0{,}567}$.
- Prior mạnh → data 10 flip chưa đủ để thay đổi niềm tin nhiều. Phải có nhiều data hơn để "thuyết phục" prior mạnh.

> ⚠ **Lỗi thường gặp**: Nhầm likelihood $P(\\text{data} \\mid \\theta)$ với posterior $P(\\theta \\mid \\text{data})$. Ví dụ: "likelihood $\\theta=0{,}7$ là $0{,}12$ cho data này" KHÔNG có nghĩa là "xác suất $\\theta=0{,}7$ là 12% khi biết data này". Posterior cần nhân thêm prior và chuẩn hóa.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Prior từ đâu ra? Có tuỳ tiện không?**
> A: Prior là kiến thức chuyên gia, kinh nghiệm từ dữ liệu trước, hoặc chọn "non-informative" (như Uniform). Với nhiều data, prior ít ảnh hưởng — posterior do data chi phối. Với ít data, prior quan trọng hơn và phải được biện minh.
>
> **Q: Marginal likelihood $P(\\text{data})$ tính thế nào?**
> A: $P(\\text{data}) = \\int P(\\text{data} \\mid \\theta)\\,P(\\theta)\\,d\\theta$. Tích phân này thường không có dạng closed form và rất tốn kém tính. Đó là lý do MCMC, variational inference ra đời — để tránh tính trực tiếp $P(\\text{data})$.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Prior Beta(3, 3), quan sát 5 heads 5 tails. Posterior là phân phối gì? Posterior mean bằng bao nhiêu?
> <details><summary>Đáp án</summary>
> Posterior $= \\text{Beta}(3+5, 3+5) = \\text{Beta}(8, 8)$. Posterior mean $= \\dfrac{8}{8+8} = 0{,}5$. Hợp lý: data cân bằng + prior cân bằng = posterior cân bằng.
> </details>

> 📝 **Tóm tắt mục 2**:
> - Bayes rule: $\\text{posterior} \\propto \\text{likelihood} \\times \\text{prior}$.
> - Prior thể hiện kiến thức ban đầu; likelihood thể hiện "tiếng nói" của data.
> - Posterior mean tổng hợp cả hai, bị kéo về phía prior nếu prior mạnh hoặc data ít.

---

## 3. Beta–Binomial conjugate

### 3.1. Conjugate prior là gì?

> 💡 **Trực giác**: Một prior được gọi là **conjugate** với likelihood nếu posterior có cùng họ phân phối với prior. Lợi ích: tính toán đơn giản, có công thức closed form, không cần số trị (MCMC).

**Định nghĩa chính thức**: Prior $P(\\theta)$ là conjugate với likelihood $P(\\text{data} \\mid \\theta)$ nếu:

$$P(\\theta) \\in \\text{họ } F \\implies P(\\theta \\mid \\text{data}) \\in \\text{họ } F$$

### 3.2. Beta–Binomial

Với thí nghiệm Binomial (n lần tung, H lần ngửa):

- Likelihood: $P(H \\mid n, \\theta) \\propto \\theta^H \\times (1-\\theta)^{n-H}$
- Prior conjugate: **$\\text{Beta}(\\alpha, \\beta)$** với density $\\propto \\theta^{\\alpha-1} \\times (1-\\theta)^{\\beta-1}$
- Posterior: **$\\text{Beta}(\\alpha + H, \\beta + (n - H))$**

**Diễn giải trực giác về $\\alpha, \\beta$**: $\\text{Beta}(\\alpha, \\beta)$ tương đương đã quan sát $(\\alpha-1)$ heads và $(\\beta-1)$ tails trong "dữ liệu ảo" trước khi thực sự tung đồng xu. Ta cộng dữ liệu thật vào dữ liệu ảo.

### 3.3. Thống kê quan trọng của Beta(α, β)

| Thống kê | Công thức | Ví dụ Beta(9, 5) |
|----------|-----------|------------------|
| Mean | $\\dfrac{\\alpha}{\\alpha + \\beta}$ | $\\dfrac{9}{14} \\approx 0{,}643$ |
| Mode (MAP) | $\\dfrac{\\alpha - 1}{\\alpha + \\beta - 2}$ | $\\dfrac{8}{12} \\approx 0{,}667$ |
| Variance | $\\dfrac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}$ | $\\dfrac{9 \\times 5}{14^2 \\times 15} \\approx 0{,}015$ |
| Độ lệch chuẩn | $\\sqrt{\\text{Variance}}$ | $\\approx 0{,}122$ |

**Walk-through Beta(9, 5) — tiếp tục từ ví dụ 3 ở mục 2:**

Prior: $\\text{Beta}(2, 2)$, quan sát 7H, 3T → Posterior: $\\text{Beta}(9, 5)$.

- Mean $= \\dfrac{9}{14} = 0{,}6429$
- Mode $= \\dfrac{8}{12} = 0{,}6667$
- Var $= \\dfrac{9 \\times 5}{14^2 \\times 15} = \\dfrac{45}{2940} = 0{,}0153$
- SD $= \\sqrt{0{,}0153} \\approx 0{,}124$
- 95% credible interval $\\approx [0{,}39, 0{,}87]$ (lấy từ percentile 2.5 và 97.5 của $\\text{Beta}(9,5)$)

> ⚠ **Lỗi thường gặp**: Nhầm MAP (mode) với MLE. Với flat prior $\\text{Beta}(1,1)$, MAP = MLE $= H/n$. Nhưng với prior có thông tin, MAP $\\neq$ MLE — MAP "điều chỉnh" MLE về phía prior.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Nếu không có conjugate prior, làm sao?**
> A: Dùng MCMC (Markov Chain Monte Carlo) hoặc Variational Inference để xấp xỉ posterior. Ví dụ: Stan, PyMC3, NumPyro là các thư viện phổ biến. Conjugate chỉ có trong một số họ phân phối đặc biệt.
>
> **Q: Prior Beta(1, 1) có nghĩa gì về mặt thực tế?**
> A: $\\text{Uniform}(0,1)$ — mọi $\\theta$ đều khả dĩ như nhau. Đây là "non-informative prior" đơn giản nhất cho tham số xác suất. Posterior $= \\text{Beta}(1+H, 1+T)$ với mean $= \\dfrac{H+1}{n+2}$ — "Laplace smoothing".

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Một đồng xu mới ra lò, ta không biết gì → dùng prior Beta(1, 1). Tung 20 lần: 14 heads, 6 tails. Tính posterior mean và 95% credible interval (dùng công thức xấp xỉ mean ± 2SD).
> <details><summary>Đáp án</summary>
> Posterior: $\\text{Beta}(1+14, 1+6) = \\text{Beta}(15, 7)$. Mean $= \\dfrac{15}{22} \\approx 0{,}682$. Var $= \\dfrac{15 \\times 7}{22^2 \\times 23} = \\dfrac{105}{11132} \\approx 0{,}00943$. SD $\\approx 0{,}097$. CI xấp xỉ $[0{,}682 - 2 \\times 0{,}097, 0{,}682 + 2 \\times 0{,}097] = [0{,}488, 0{,}876]$. (Lưu ý: đây là xấp xỉ normal; CI chính xác từ Beta quantile sẽ khác đôi chút.)
> </details>

---

## 4. MAP và posterior mean — hai ước lượng điểm

### 4.1. Tại sao cần ước lượng điểm?

Posterior là một phân phối — chứa toàn bộ thông tin về $\\theta$. Nhưng đôi khi ta cần **một con số duy nhất** để đưa ra quyết định (ví dụ: quyết định đồng xu có thiên lệch không, cần một ước lượng $\\theta$ cụ thể). Hai ước lượng điểm phổ biến:

### 4.2. MAP — Maximum A Posteriori

$$\\theta_{\\text{MAP}} = \\arg\\max_\\theta P(\\theta \\mid \\text{data}) = \\arg\\max_\\theta \\big[P(\\text{data} \\mid \\theta) \\times P(\\theta)\\big]$$

MAP tìm $\\theta$ **làm posterior đạt giá trị lớn nhất** — tức mode của posterior. Với $\\text{Beta}(\\alpha, \\beta)$: $\\text{MAP} = \\dfrac{\\alpha-1}{\\alpha+\\beta-2}$ (với $\\alpha,\\beta > 1$).

**Ví dụ 1**: Prior $\\text{Beta}(2,2)$, 7H 3T → posterior $\\text{Beta}(9,5)$ → MAP $= \\dfrac{8}{12} \\approx \\mathbf{0{,}667}$
**Ví dụ 2**: Prior $\\text{Beta}(1,1)$, 7H 3T → posterior $\\text{Beta}(8,4)$ → MAP $= \\dfrac{7}{10} = \\mathbf{0{,}7}$ (= MLE)
**Ví dụ 3**: Prior $\\text{Beta}(5,5)$, 1H 0T → posterior $\\text{Beta}(6,5)$ → MAP $= \\dfrac{5}{9} \\approx \\mathbf{0{,}556}$ (prior kéo mạnh về $0{,}5$)
**Ví dụ 4**: Prior $\\text{Beta}(1,1)$, 0H 0T (chưa tung) → posterior $\\text{Beta}(1,1)$ → MAP **không xác định** (uniform không có mode đơn)

### 4.3. Posterior mean

$$\\theta_{\\text{mean}} = E[\\theta \\mid \\text{data}] = \\dfrac{\\alpha_{\\text{post}}}{\\alpha_{\\text{post}} + \\beta_{\\text{post}}} \\quad \\text{[với Beta posterior]}$$

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

**Credible interval (Bayesian)**: Khoảng $[a, b]$ sao cho $P(a \\leq \\theta \\leq b \\mid \\text{data}) = 0{,}95$.

Đây là **câu trả lời trực tiếp**: "Biết data rồi, tôi 95% tin rằng $\\theta$ nằm trong $[a, b]$."

**Confidence interval (frequentist)**: Quy trình tạo khoảng $[L(\\text{data}), U(\\text{data})]$ sao cho nếu lặp lại thí nghiệm vô hạn lần, khoảng sẽ bao phủ $\\theta$ thật 95% số lần.

### 5.2. Ví dụ walk-through với Prior Beta(2, 2), 7H 3T

Posterior: $\\text{Beta}(9, 5)$.

**Credible interval 95% (HDI — Highest Density Interval)**:
Tìm $[a, b]$ sao cho $P(a \\leq \\theta \\leq b \\mid \\text{data}) = 0{,}95$ với độ dài $[a,b]$ nhỏ nhất.
- Từ bảng phân vị Beta: $a = \\text{Beta}_{0{,}025}(9,5) \\approx \\mathbf{0{,}370}$, $b = \\text{Beta}_{0{,}975}(9,5) \\approx \\mathbf{0{,}880}$.
- Diễn giải Bayesian: "Có 95% khả năng $\\theta$ nằm trong $[0{,}37, 0{,}88]$, biết rằng ta đã quan sát 7H 3T với prior $\\text{Beta}(2,2)$."

**Confidence interval 95% (frequentist, Wilson method)**:
Với $\\hat{p} = \\dfrac{7}{10} = 0{,}7$, $n = 10$:
- CI Wilson $\\approx [0{,}350, 0{,}933]$
- Diễn giải frequentist: "Quy trình này sẽ chứa $\\theta$ thật trong 95% lần thực hiện."
- **KHÔNG** được diễn giải là "$P(\\theta \\in [0{,}35, 0{,}93]) = 95\\%$".

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
> A: Đây là lỗi diễn giải rất phổ biến — ngay cả trong sách giáo khoa. Câu "95% CI = $[a,b]$ nghĩa là $\\theta$ nằm trong $[a,b]$ với xác suất 95%" là SAI theo frequentist. Nhưng con người tư duy tự nhiên theo Bayesian. Đây là một trong những lý do Bayesian statistics ngày càng phổ biến.

---

## 6. Bayes Factor

### 6.1. Là gì và vì sao cần?

Bayes Factor (BF) là công cụ so sánh hai mô hình $M_1$ và $M_2$ dưới framework Bayesian:

$$BF_{12} = \\dfrac{P(\\text{data} \\mid M_1)}{P(\\text{data} \\mid M_2)}$$

$BF > 1$: data ủng hộ $M_1$ hơn. $BF < 1$: data ủng hộ $M_2$ hơn.

**Ý nghĩa thực tế**: $BF_{12} = 10$ nghĩa là data "10 lần khả dĩ hơn" dưới $M_1$ so với $M_2$.

### 6.2. Thang đánh giá Jeffreys

| $BF_{12}$ | Bằng chứng cho $M_1$ |
|------|------------------|
| 1 – 3 | Chưa đáng kể |
| 3 – 10 | Khá mạnh |
| 10 – 30 | Mạnh |
| 30 – 100 | Rất mạnh |
| > 100 | Quyết định |

### 6.3. Ví dụ walk-through

**Bài toán**: Đồng xu quan sát 15 heads, 5 tails ($n=20$). So sánh:
- $M_1$: $\\theta = 0{,}5$ (đồng xu cân bằng)
- $M_2$: $\\theta = 0{,}75$ (đồng xu thiên lệch 75%)

**Bước 1**: Tính $P(\\text{data} \\mid M_1)$:

$$\\begin{aligned}
P(15H, 5T \\mid \\theta=0{,}5) &= \\binom{20}{15} \\times 0{,}5^{15} \\times 0{,}5^{5} \\\\
&= 15504 \\times (1/2)^{20} = \\dfrac{15504}{1048576} \\approx 0{,}01479
\\end{aligned}$$

**Bước 2**: Tính $P(\\text{data} \\mid M_2)$:

$$\\begin{aligned}
P(15H, 5T \\mid \\theta=0{,}75) &= \\binom{20}{15} \\times 0{,}75^{15} \\times 0{,}25^{5} \\\\
&= 15504 \\times 0{,}01336 \\times 0{,}000977 \\\\
&\\approx 15504 \\times 1{,}305 \\times 10^{-5} \\approx 0{,}2023
\\end{aligned}$$

**Bước 3**: Tính Bayes Factor:

$$\\begin{aligned}
BF_{12} &= \\dfrac{0{,}01479}{0{,}2023} \\approx 0{,}073 \\\\
BF_{21} &= \\dfrac{0{,}2023}{0{,}01479} \\approx 13{,}7
\\end{aligned}$$

**Kết luận**: $BF_{21} \\approx 13{,}7$ → data ủng hộ $M_2$ ($\\theta=0{,}75$) **mạnh** hơn $M_1$ ($\\theta=0{,}5$). Điều này hợp lý: $15/20 = 75\\%$ head → data khớp $M_2$ hơn.

> ⚠ **Lỗi thường gặp**: Bayes Factor khác posterior odds. BF so sánh likelihood của data; posterior odds còn phụ thuộc prior odds: $\\text{Posterior odds} = BF \\times \\text{Prior odds}$.

> 📝 **Tóm tắt mục 6**:
> - BF = tỉ số marginal likelihood của hai mô hình.
> - BF > 10: bằng chứng mạnh cho mô hình tử số.
> - Khác p-value: BF có thể ủng hộ $H_0$ ("không có hiệu ứng"), trong khi p-value chỉ đưa ra bằng chứng chống $H_0$.

---

## Bài tập

1. **Prior sensitivity**: Một nhà nghiên cứu quan sát 8 heads 4 tails (n=12). So sánh posterior mean khi dùng ba prior khác nhau: Beta(1,1), Beta(2,2), Beta(10,10). Nhận xét ảnh hưởng của prior.

2. **Bayesian update tuần tự**: Bắt đầu với prior Beta(1,1). Ngày 1: quan sát 3H 2T. Ngày 2: quan sát thêm 4H 1T. Tính posterior sau ngày 1, sau ngày 2. So sánh với việc cập nhật một lần từ tổng 7H 3T.

3. **Credible interval**: Với prior Beta(3,3) và quan sát 10H 5T, tính posterior. Tính posterior mean, MAP, và xấp xỉ 95% CI bằng công thức mean ± 2SD.

4. **Bayes Factor**: Đồng xu quan sát 12 heads 8 tails. Tính Bayes Factor cho $M_1$: $\\theta=0{,}5$ vs $M_2$: $\\theta=0{,}6$. Kết luận gì?

---

## Lời giải chi tiết

### Bài 1

Ba prior → ba posterior:

**Prior $\\text{Beta}(1,1)$** (flat prior):
- Posterior: $\\text{Beta}(1+8, 1+4) = \\text{Beta}(9, 5)$
- Mean $= \\dfrac{9}{14} \\approx \\mathbf{0{,}643}$

**Prior $\\text{Beta}(2,2)$** (yếu, thiên về $0{,}5$):
- Posterior: $\\text{Beta}(2+8, 2+4) = \\text{Beta}(10, 6)$
- Mean $= \\dfrac{10}{16} = \\mathbf{0{,}625}$

**Prior $\\text{Beta}(10,10)$** (mạnh, rất tin $\\theta \\approx 0{,}5$):
- Posterior: $\\text{Beta}(10+8, 10+4) = \\text{Beta}(18, 14)$
- Mean $= \\dfrac{18}{32} = \\mathbf{0{,}5625}$

**Nhận xét**: Prior càng mạnh ($\\alpha+\\beta$ lớn = nhiều "pseudo-observations") → posterior mean bị kéo về mean của prior ($0{,}5$) nhiều hơn. Data 12 flip chưa đủ để "áp đảo" prior $\\text{Beta}(10,10)$ tương đương 20 pseudo-observations. Cần nhiều data hơn để posterior ít phụ thuộc prior.

### Bài 2

**Ngày 1**: Prior $\\text{Beta}(1,1)$ → $\\text{Posterior}_1 = \\text{Beta}(1+3, 1+2) = \\text{Beta}(4, 3)$. Mean $= \\dfrac{4}{7} \\approx 0{,}571$.

**Ngày 2**: Prior $= \\text{Posterior}_1 = \\text{Beta}(4,3)$ → $\\text{Posterior}_2 = \\text{Beta}(4+4, 3+1) = \\text{Beta}(8, 4)$. Mean $= \\dfrac{8}{12} \\approx \\mathbf{0{,}667}$.

**Cập nhật một lần từ tổng**: Prior $\\text{Beta}(1,1)$, 7H 3T → $\\text{Beta}(8,4)$. Mean $= \\dfrac{8}{12} = \\mathbf{0{,}667}$.

**Kết luận**: Hai cách **cho kết quả giống hệt nhau**. Đây là tính chất tuần tự (sequential consistency) của Bayesian inference — thứ tự cập nhật không quan trọng, chỉ quan trọng tổng dữ liệu. Rất hữu ích: có thể cập nhật mô hình online khi data đến từng phần.

### Bài 3

Prior $\\text{Beta}(3,3)$, 10H 5T → Posterior: $\\text{Beta}(3+10, 3+5) = \\textbf{Beta(13, 8)}$.

- Mean $= \\dfrac{13}{21} \\approx \\mathbf{0{,}619}$
- Mode (MAP) $= \\dfrac{12}{19} \\approx \\mathbf{0{,}632}$
- Var $= \\dfrac{13 \\times 8}{21^2 \\times 22} = \\dfrac{104}{9702} \\approx 0{,}01072$
- SD $\\approx \\sqrt{0{,}01072} \\approx \\mathbf{0{,}1035}$
- 95% CI $\\approx [0{,}619 - 2 \\times 0{,}1035, 0{,}619 + 2 \\times 0{,}1035] = [\\mathbf{0{,}412, 0{,}826}]$

Diễn giải Bayesian: "Biết prior và data, có 95% khả năng $\\theta \\in [0{,}41, 0{,}83]$."

### Bài 4

$n=20$, 12H 8T.

**$P(\\text{data} \\mid \\theta=0{,}5)$**:

$$\\binom{20}{12} \\times 0{,}5^{12} \\times 0{,}5^{8} = 125970 \\times (0{,}5)^{20} = \\dfrac{125970}{1048576} \\approx 0{,}1201$$

**$P(\\text{data} \\mid \\theta=0{,}6)$**:

$$\\binom{20}{12} \\times 0{,}6^{12} \\times 0{,}4^{8} = 125970 \\times 0{,}002177 \\times 0{,}000655 = 125970 \\times 1{,}426 \\times 10^{-6} \\approx 0{,}1797$$

$$BF_{12} = \\dfrac{0{,}1201}{0{,}1797} \\approx 0{,}668 \\qquad BF_{21} = \\dfrac{0{,}1797}{0{,}1201} \\approx 1{,}496$$

$BF_{21} \\approx 1{,}5$ — theo thang Jeffreys, bằng chứng "chưa đáng kể" cho $M_2$. Data $12/20 = 60\\%$ nhỉnh hơn $\\theta=0{,}6$ so với $\\theta=0{,}5$, nhưng sự chênh lệch chưa đủ rõ ràng với $n=20$. Cần nhiều data hơn để phân biệt $\\theta=0{,}5$ vs $\\theta=0{,}6$.

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
