# Lesson 07: Bootstrap & Permutation Test

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả thuật toán **bootstrap**: resample WITH replacement → phân phối bootstrap → percentile CI.
- Tính **bootstrap CI** tay (cho tập nhỏ) và hiểu tại sao nó hiệu quả.
- Thực hiện **permutation test** cho two-sample comparison.
- Biết khi nào dùng resampling (non-normal, small n, statistic phức tạp) và khi nào không nên.
- So sánh bootstrap CI với t-CI và hiểu ưu/nhược điểm mỗi loại.

## Kiến thức tiền đề

- **Lesson 01**: Sampling distribution — bootstrap thực ra xây dựng sampling distribution thực nghiệm.
- **Lesson 02**: CI — bootstrap CI là cách thay thế t-CI.
- **Lesson 03 & 04**: Hypothesis testing — permutation test là cách thay thế t-test non-parametric.

---

## 1. Bài toán mở đầu: Khi phân phối không phải Normal

> 💡 **Trực giác**: T-CI và t-test giả định dữ liệu gần Normal (hoặc n đủ lớn cho CLT). Nhưng nếu bạn có n=15 và dữ liệu lệch mạnh (lương, giá nhà, thời gian phản hồi)? Hoặc bạn muốn CI cho **median** — không phải mean? T-distribution không giúp ích gì. Bootstrap giải quyết: không cần giả định phân phối.

**Dữ liệu ví dụ** (thời gian phản hồi API, ms, $n=10$):
{45, 62, 38, 71, 55, 120, 48, 67, 41, 200}

- Mean $= 74{,}7$, Median $= 58{,}5$.
- Phân phối: lệch phải mạnh (2 outlier 120, 200).
- Với $n=10$, CLT chưa ổn. T-CI cho mean sẽ rộng và không tin cậy. T-CI cho median? Không tồn tại.

Bootstrap giải quyết cả hai.

---

## 2. Bootstrap CI — Thuật toán và Nguyên lý

### 2.1. Ý tưởng cốt lõi

> 💡 **Trực giác**: Tổng thể thật → lấy mẫu → tính statistic. Nhưng ta không có tổng thể. Bootstrap nói: **"Dùng mẫu như thể đó là tổng thể"** — resample FROM mẫu WITH replacement nhiều lần → mỗi bootstrap sample cho 1 giá trị statistic → tập hợp các giá trị đó = xấp xỉ sampling distribution.

**Tại sao "with replacement"?**: Nếu lấy mẫu không hoàn lại (without replacement), mỗi bootstrap sample = một hoán vị của mẫu gốc $\to$ tất cả $\bar{x}^*$ đều bằng nhau $\to$ không có variance. Phải WITH replacement để bootstrap sample khác nhau.

### 2.2. Thuật toán đầy đủ

```
Input: mẫu X = {x₁, x₂, ..., xₙ}, số lần B (thường 1000-10000)

for b = 1 to B:
    X* = lấy ngẫu nhiên n phần tử TỪ X, WITH replacement
    θ* = tính statistic trên X*  (mean, median, SD, correlation, ...)

Bootstrap distribution = {θ*₁, θ*₂, ..., θ*_B}

95% Percentile CI = [percentile 2.5% của {θ*}, percentile 97.5% của {θ*}]
```

### 2.3. Walk-through tay với n nhỏ

**Dữ liệu**: {3, 7, 5, 9, 1}. $n=5$. Tính bootstrap CI cho **median**.

$B=6$ bootstrap samples (thực tế cần 1000+, ở đây làm 6 để minh họa):

| Sample | Bootstrap X* | Median* |
|--------|-------------|--------|
| 1 | {3, 7, 3, 9, 9} | 7 |
| 2 | {1, 5, 5, 7, 3} | 5 |
| 3 | {9, 1, 7, 1, 5} | 5 |
| 4 | {7, 7, 9, 3, 5} | 7 |
| 5 | {1, 1, 5, 9, 7} | 5 |
| 6 | {3, 9, 9, 1, 7} | 7 |

Bootstrap medians: {7, 5, 5, 7, 5, 7}. Mean $= 6$. Std $\approx 1{,}09$.

95% CI ($B=6$ không đủ, nhưng để minh họa): Nếu $B=1000$, lấy percentile 25 (2,5%) và 975 (97,5%).

### 2.4. Ví dụ số đầy đủ với B=1000 (simulation kết quả)

**Dữ liệu API response time** ($n=10$): {45, 62, 38, 71, 55, 120, 48, 67, 41, 200}

- Mean mẫu gốc $= 74{,}7$
- Median mẫu gốc $= 58{,}5$

**Sau $B=1000$ bootstrap** (kết quả simulation):
- Bootstrap distribution của mean: mean $\approx 74{,}6$, SD $\approx 15{,}8$
- 95% bootstrap CI cho mean: $\mathbf{[46{,}1;\ 108{,}4]}$ (rộng vì outlier 200)
- 95% bootstrap CI cho median: $\mathbf{[46{,}5;\ 71{,}0]}$ (hẹp hơn vì median robust hơn)

**So sánh với t-CI cho mean**:
- $s = 52{,}3$, $\text{SE} = \dfrac{52{,}3}{\sqrt{10}} \approx 16{,}5$
- $t^*(9,\ 95\%) = 2{,}262$
- t-CI: $74{,}7 \pm 2{,}262 \times 16{,}5 = \mathbf{[37{,}4;\ 112{,}0]}$

T-CI và bootstrap CI cho mean khá giống nhau dù phân phối lệch — vì CLT vẫn hoạt động ở một mức. Nhưng bootstrap CI cho **median** $= [46{,}5;\ 71{,}0]$ không thể tính bằng t-CI.

---

## 3. Khi nào dùng Bootstrap?

| Tình huống | Bootstrap phù hợp? | Lý do |
|-----------|-------------------|-------|
| n nhỏ (< 30), phân phối lệch | ✓ Tốt hơn t | CLT chưa hội tụ tốt |
| Statistic phức tạp (median, ratio, correlation) | ✓ Tốt | Không có công thức closed-form SE |
| Phân phối có heavy tail | ✓ Tốt | T-CI underestimate variance |
| n lớn, phân phối gần Normal | △ OK nhưng không cần | T-CI đã đủ tốt |
| n rất nhỏ (< 10) | ⚠ Cẩn thận | Bootstrap cũng không tốt nếu mẫu gốc không đại diện tổng thể |

> ⚠ **Hạn chế quan trọng**: Bootstrap giả định **mẫu đại diện tổng thể**. Nếu mẫu biased (chọn mẫu không ngẫu nhiên), bootstrap chỉ khuếch đại bias — không sửa được. "Garbage in, garbage out."

---

## 4. Permutation Test (Randomization Test)

### 4.1. Ý tưởng

> 💡 **Trực giác**: Bạn có hai nhóm A và B. H₀: không có sự khác biệt giữa hai nhóm. Nếu H₀ đúng, nhãn "A" và "B" chỉ là arbitrary — ta có thể **shuffle ngẫu nhiên** nhãn và tính lại sự khác biệt. Làm vậy nhiều lần → phân phối của sự khác biệt **dưới H₀** (permutation distribution). Nếu sự khác biệt thật của ta nằm ở đuôi xa của phân phối này → reject H₀.

### 4.2. Thuật toán

```
Input: Group A = {a₁,...,aₙ₁}, Group B = {b₁,...,bₙ₂}
Observed: D_obs = mean(A) - mean(B)

Gộp: all_data = A ∪ B (n₁+n₂ phần tử)

for b = 1 to B:
    Shuffle nhãn ngẫu nhiên: gán n₁ phần tử vào "A*", n₂ vào "B*"
    D* = mean(A*) - mean(B*)

Permutation distribution = {D*₁, D*₂, ..., D*_B}

p-value = P(|D*| ≥ |D_obs|) = fraction of |D*| ≥ |D_obs|
```

### 4.3. Walk-through bằng số tay

**Dữ liệu nhỏ**: A = {5, 8, 7} ($n_1=3$), B = {3, 4, 6} ($n_2=3$).

$D_{obs} = \dfrac{5+8+7}{3} - \dfrac{3+4+6}{3} = \dfrac{20}{3} - \dfrac{13}{3} = \mathbf{\dfrac{7}{3} \approx 2{,}33}$

All data: {3, 4, 5, 6, 7, 8}. Tổng $C(6,3) = 20$ hoán vị có thể.

Một số permutations:

| A* | B* | D* = mean(A*)-mean(B*) |
|----|----|-----------------------|
| {3,4,5} | {6,7,8} | 4 - 7 = **-3.0** |
| {3,4,6} | {5,7,8} | 4.33-6.67 = **-2.33** |
| {5,7,8} | {3,4,6} | 6.67-4.33 = **+2.33** |
| {6,7,8} | {3,4,5} | 7 - 4 = **+3.0** |
| {5,8,7} | {3,4,6} | 6.67-4.33 = **+2.33** ← D_obs |

$P(|D^*| \geq 2{,}33) = \dfrac{\text{số permutation có } |D^*| \geq 2{,}33}{20}$.

Liệt kê đầy đủ: các $D^*$ là {−3,0, −2,33, −2,33, −2,0, −1,67, −1,33, −1,0, −0,67, −0,33, 0, 0, 0,33, 0,67, 1,0, 1,33, 1,67, 2,0, 2,33, 2,33, 3,0}.

Số $|D^*| \geq 2{,}33$: {−3,0, −2,33, −2,33, 2,33, 2,33, 3,0} $= \mathbf{6 \text{ permutations}}$.

p-value $= \dfrac{6}{20} = \mathbf{0{,}30}$. Với $\alpha=0{,}05 \to$ Fail to reject $H_0$.

**Nhận xét**: $n$ nhỏ (3 mỗi nhóm) $\to$ p-value tối thiểu đạt được là $\dfrac{1}{20} = 0{,}05 \to$ gần như không thể reject với $\alpha=0{,}05$.

### 4.4. Ví dụ thực tế với B=10.000

**Hai phương pháp dạy học**: A (traditional, $n=20$): mean$=75$, SD$=10$. B (new, $n=20$): mean$=80$, SD$=11$.

$D_{obs} = 80 - 75 = 5$.

Sau $B=10000$ permutations (simulation):
- Phân phối $D^* \sim N(0,\ {\sim}3{,}3)$ do CLT.
- $P(|D^*| \geq 5) \approx P\left(|Z| \geq \dfrac{5}{3{,}3}\right) = P(|Z| \geq 1{,}515) \approx \mathbf{0{,}13}$.

So với Welch's t-test: $p \approx 0{,}13 \to$ giống nhau! (Khi assumptions t-test gần đúng, hai test cho kết quả tương tự.)

Điểm mạnh của permutation: không cần giả định Normal, không cần tính SE theo công thức — tự nhiên từ data.

---

## 5. So sánh: Parametric vs Bootstrap vs Permutation

| | Parametric (t, z) | Bootstrap CI | Permutation Test |
|--|------------------|-------------|----------------|
| **Giả định** | Normal (hoặc n lớn) | Mẫu đại diện | Exchangeability |
| **Dùng cho** | Mean | Bất kỳ statistic | Hypothesis test |
| **Khi nào tốt** | n lớn, near-Normal | Statistic phức tạp, n nhỏ | Non-normal, two-sample |
| **Tốc độ** | Nhanh (công thức) | Chậm (cần B iterations) | Chậm (cần B iterations) |
| **Interpretability** | Dễ giải thích | Trực quan | Trực quan |

---

## 6. Ưu và nhược điểm tổng hợp

**Ưu điểm của Resampling**:
1. Không cần giả định phân phối (distribution-free).
2. Hoạt động cho mọi thống kê (median, ratio, max, correlation...).
3. Trực quan — dễ giải thích với người không có nền thống kê.
4. Tự nhiên xử lý dữ liệu phức tạp (clustered, hierarchical) nếu resample đúng cách.

**Nhược điểm**:
1. Tốn CPU (B=10000 iterations), không dùng tốt khi real-time cần kết quả.
2. Không sửa được bias nếu mẫu gốc không representative.
3. Với n rất nhỏ (< 10), bootstrap sample space hạn chế → CI không tin cậy.
4. Permutation test exact chỉ khả thi khi $n$ nhỏ ($C(n_1+n_2, n_1)$ nhỏ); $n$ lớn dùng approximate (random shuffle $B$ lần).

> 📝 **Tóm tắt**
> - Bootstrap: resample WITH replacement, tính statistic, lấy percentile → CI cho bất kỳ statistic.
> - Permutation: shuffle nhãn nhóm, tính test statistic → p-value non-parametric.
> - Dùng khi: non-normal, n nhỏ, statistic không có formula SE, muốn kiểm tra assumption.
> - Không dùng khi: mẫu gốc không representative, n quá nhỏ (< 10).
> - Kết quả gần giống parametric khi assumptions parametric đúng — nhưng robust hơn khi sai.

---

## Bài tập

1. Mẫu: {2, 5, 3, 8, 4}. Viết ra 4 bootstrap samples (WITH replacement) và tính mean của từng sample. Độ biến thiên của 4 mean đó phản ánh điều gì?

2. Dữ liệu lương (triệu VND): {8, 10, 12, 9, 15, 11, 14, 9}. Dùng bootstrap CI (mô tả thuật toán, không cần chạy hết 1000 iteration) để tính 95% CI cho **median** lương. Vì sao không dùng t-CI cho median?

3. Hai nhóm: A={10, 12, 11}, B={7, 9, 8}. Liệt kê tất cả $C(6,3)=20$ permutations, tính $D^*$ cho từng cái, và tính exact p-value (two-sided) cho $D_{obs} = \text{mean}(A)-\text{mean}(B)$.

4. (Tư duy) Bạn bootstrap 10000 lần từ mẫu lương (n=50) gốc và thu được 95% CI = [12.5, 18.3] triệu. Mẫu gốc được lấy từ LinkedIn jobs (self-reported). CI này có tin cậy không? Vấn đề gì?

## Lời giải chi tiết

### Bài 1

Mẫu gốc: {2, 5, 3, 8, 4}.

Ví dụ 4 bootstrap samples:
- B1: {5, 5, 3, 2, 8} $\to$ mean $= 4{,}6$
- B2: {2, 4, 4, 3, 8} $\to$ mean $= 4{,}2$
- B3: {8, 5, 5, 5, 2} $\to$ mean $= 5{,}0$
- B4: {3, 3, 8, 4, 2} $\to$ mean $= 4{,}0$

Mean gốc $= \dfrac{2+5+3+8+4}{5} = \mathbf{4{,}4}$.

Độ biến thiên của 4 mean {4,6, 4,2, 5,0, 4,0} phản ánh **uncertainty của $\bar{x}$** — đây là xấp xỉ thực nghiệm của sampling distribution của $\bar{x}$. Nếu lấy đủ $B=1000$, SD của {mean bootstrap} $\approx \text{SE} = \dfrac{s}{\sqrt{n}}$.

### Bài 2

**Median mẫu gốc**: Sort {8,9,9,10,11,12,14,15} $\to$ median $= \dfrac{10+11}{2} = 10{,}5$.

**Thuật toán**:
1. Resample WITH replacement 8 phần tử từ {8,10,12,9,15,11,14,9} 1000 lần.
2. Mỗi lần tính median của 8 phần tử đó.
3. Kết quả: 1000 giá trị median*.
4. 95% CI = [percentile 2.5%, percentile 97.5%] của 1000 median*.

**Vì sao không dùng t-CI cho median**: T-CI dựa trên phân phối của $\bar{x}$, không phải median. Không có công thức closed-form cho SE của median trừ khi biết pdf tổng thể ($\text{SE}_{median} \approx \dfrac{1}{2 f(m) \sqrt{n}}$ — cần ước lượng $f(m)$ là mật độ tại median). Bootstrap tránh được vấn đề này.

### Bài 3

A={10,12,11}, B={7,9,8}. $D_{obs} = \dfrac{10+12+11}{3} - \dfrac{7+9+8}{3} = 11 - 8 = \mathbf{3{,}0}$.

All data: {7,8,9,10,11,12}. $C(6,3)=20$ permutations.

Tất cả D* (chọn 3 vào A*, 3 vào B*):

| A* | mean(A*) | D* |
|----|----------|----|
| {7,8,9} | 8 | 8-11=-3.0 |
| {7,8,10} | 8.33 | 8.33-10.67=-2.33 |
| {7,8,11} | 8.67 | 8.67-10.33=-1.67 |
| {7,8,12} | 9 | 9-10=-1.0 |
| {7,9,10} | 8.67 | -1.67 |
| {7,9,11} | 9 | -1.0 |
| {7,9,12} | 9.33 | -0.33 |
| {7,10,11} | 9.33 | -0.33 |
| {7,10,12} | 9.67 | +0.33 |
| {7,11,12} | 10 | +1.0 |
| {8,9,10} | 9 | -1.0 |
| {8,9,11} | 9.33 | -0.33 |
| {8,9,12} | 9.67 | +0.33 |
| {8,10,11} | 9.67 | +0.33 |
| {8,10,12} | 10 | +1.0 |
| {8,11,12} | 10.33 | +1.67 |
| {9,10,11} | 10 | +1.0 |
| {9,10,12} | 10.33 | +1.67 |
| {9,11,12} | 10.67 | +2.33 |
| {10,11,12} | 11 | **+3.0** |

$|D^*| \geq 3{,}0$: {−3,0, +3,0} $\to \mathbf{2 \text{ permutations}}$.

p-value (two-sided) $= \dfrac{2}{20} = \mathbf{0{,}10}$. Với $\alpha=0{,}05 \to$ Fail to reject $H_0$.

### Bài 4

CI này **không đáng tin cậy**. Vấn đề: mẫu từ LinkedIn jobs có **selection bias** — chỉ những người muốn khoe lương (và thường là lương cao) hoặc đang tìm việc mới mới post. Đây không phải random sample từ population. Bootstrap dùng mẫu như thể nó representative → chỉ khuếch đại bias.

Kết quả CI = [12.5, 18.3] có thể overestimate lương thật của tổng thể lao động. Bootstrap không thể sửa sampling bias — đây là vấn đề thiết kế thu thập dữ liệu, không phải vấn đề phương pháp thống kê.

---

## Bài tiếp theo

Tầng 3 — Advanced Statistics: [Lesson 01: Bayesian Statistics](../../03-Advanced/lesson-01-bayesian-stats/README.md) — Từ frequentist sang Bayesian: prior, likelihood, posterior.

## Tham khảo

- Efron & Hastie (2016) "Computer Age Statistical Inference" — Chapters 10-11 (Bootstrap).
- Good (2005) "Permutation, Parametric, and Bootstrap Tests of Hypotheses."
- Davison & Hinkley (1997) "Bootstrap Methods and Their Application."
