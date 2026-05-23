// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/05-Probability/lesson-07-mle/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Maximum Likelihood Estimation (MLE)

> **Tầng 5 — Probability · Bài 7/8**
>
> *Cho data, đoán tham số. Đoán sao cho "data quan sát có khả năng nhất". Đây là cách ML chọn weights — không phải bằng phép màu, mà bằng MLE.*

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phân biệt được **xác suất (probability)** và **likelihood** — cùng công thức, khác cách đọc.
2. Hiểu **MLE = argmax L(θ)** là gì, vì sao đó là cách hợp lý để ước lượng tham số.
3. Biết vì sao luôn dùng **log-likelihood** thay cho likelihood (numerical + đạo hàm).
4. Tự dẫn được **MLE cho Bernoulli** → ra \`p̂ = k/n\`.
5. Tự dẫn được **MLE cho Gaussian** → ra \`μ̂ = trung bình\`, \`σ̂² = trung bình bình phương lệch\`.
6. Hiểu **linear regression** là MLE dưới giả định **Gaussian noise** → giải thích vì sao loss = MSE.
7. Preview **cross-entropy** (Lesson 08): negative log-likelihood của classification.
8. Phân biệt **MLE vs MAP**: thêm prior thì MLE biến thành MAP.

---

## Kiến thức tiền đề

Bài này gọi lại nhiều thứ từ các lesson trước. Nếu thiếu bài nào, đọc lại trước khi đi tiếp:

- [Lesson 05 — Phân phối chuẩn (Gaussian)](../lesson-05-normal-distribution/) — biết PDF Gaussian, hiểu μ và σ².
- [Lesson 06 — Kỳ vọng, phương sai, covariance](../lesson-06-expectation-variance/) — biết E[X], Var[X], tính ước lượng từ mẫu.
- [Calculus L5 — Tối ưu 1 biến](../../03-Calculus/lesson-05-optimization-1d/) — tìm cực trị bằng \`f'(x) = 0\`.
- [Calculus L7 — Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) — khi không giải kín được, dùng GD.

Ngoài ra cần nhẹ:

- Log: \`log(a·b) = log a + log b\`, \`log a^k = k log a\`, log đơn điệu tăng → argmax giữ nguyên.
- Đạo hàm riêng (Calculus L6) khi MLE có ≥ 2 tham số (vd Gaussian: μ và σ²).

---

## 1. Bài toán: từ data ngược về tham số

### 💡 Trực giác

Cho tới giờ chúng ta học **theo chiều xuôi**: cho phân phối có tham số đã biết → tính xác suất quan sát một mẫu nào đó.

Vd Lesson 05: cho \`X ~ N(0, 1)\`, tính \`P(X > 1.5)\`.

**Đời thực ngược lại**: chúng ta có data, **không biết tham số**, phải đoán.

- Tung 1 đồng xu lạ 100 lần, ra 63 mặt ngửa. **Xác suất ngửa \`p\` của xu này là bao nhiêu?**
- Đo 50 người: chiều cao trung bình mẫu 168cm, độ lệch chuẩn mẫu 7cm. **Phân phối chiều cao của toàn dân số là \`N(μ, σ²)\` với μ, σ² là gì?**
- Có 1000 cặp \`(x, y)\`: vé số bán được theo nhiệt độ. **Hàm tuyến tính \`y = wx + b\` nào fit nhất?**

Cả 3 bài toán đều có chung khung:

> Cho **data quan sát được** \`x₁, ..., xₙ\`, giả định chúng sinh ra từ phân phối có **tham số ẩn θ**. Hãy ước lượng θ.

### Phát biểu hình thức

- **Model**: chọn một họ phân phối với tham số θ. Vd Bernoulli(\`p\`), Gaussian(\`μ\`, \`σ²\`), Poisson(\`λ\`).
- **Data**: \`x₁, ..., xₙ\` quan sát được, giả định **i.i.d.** (independent and identically distributed — độc lập, cùng phân phối) từ model.
- **Mục tiêu**: tìm θ̂ "tốt nhất" giải thích data.

"Tốt nhất" có nhiều nghĩa. MLE chọn nghĩa **"làm data quan sát có xác suất xảy ra cao nhất"**.

### ❓ Câu hỏi tự nhiên của người đọc

> "Tham số ẩn" nghĩa là gì? Tại sao không đo trực tiếp?

Tham số đặc trưng cho **toàn bộ dân số / cơ chế sinh data**, không phải cho 1 mẫu. Vd \`μ\` của chiều cao là kỳ vọng cho toàn dân Việt Nam — bạn không thể đo từng người. Cái bạn đo được là **mẫu hữu hạn**, và bạn dùng mẫu để **suy luận về tham số**.

> i.i.d. nghĩa là sao? Khi nào KHÔNG i.i.d.?

- **Independent**: data point này không ảnh hưởng data khác.
- **Identically distributed**: tất cả cùng đến từ một phân phối.

KHÔNG i.i.d. ví dụ: lấy 10 mẫu từ Hà Nội rồi 10 mẫu từ TP.HCM — 2 dân số khác nhau, không "identically distributed". Hoặc time-series: giá cổ phiếu hôm nay phụ thuộc hôm qua → không independent.

i.i.d. là giả định **đơn giản nhưng mạnh**. Khi không đúng, MLE vẫn áp dụng được nhưng phải đổi công thức.

### 📝 Tóm tắt mục 1

- Đời thực: có data, không biết tham số → phải **ước lượng**.
- Khung MLE: chọn họ phân phối có tham số θ, giả định data i.i.d., tìm θ "tốt nhất".
- "Tốt nhất" theo MLE = data quan sát có xác suất xảy ra cao nhất.

---

## 2. Likelihood — cùng công thức, đọc ngược

### 💡 Trực giác

Nhìn vào công thức \`P(x | θ)\`:

- **Cách đọc "xác suất"** (probability): cố định θ, x là biến. Hỏi "với tham số này, sample sẽ trông thế nào?".
- **Cách đọc "likelihood"** (khả năng): cố định x (data đã quan sát), θ là biến. Hỏi "với data này, tham số nào hợp lý?".

Cùng công thức, cùng số. Khác cách nhìn.

### Định nghĩa

Cho data đã quan sát \`x₁, ..., xₙ\`, **likelihood function** là:

\`\`\`
L(θ; x₁, ..., xₙ) = P(x₁, ..., xₙ | θ)
\`\`\`

Nếu data i.i.d.:

\`\`\`
L(θ) = P(x₁ | θ) · P(x₂ | θ) · ... · P(xₙ | θ) = ∏ᵢ P(xᵢ | θ)
\`\`\`

(Tích các xác suất vì independent.)

### Ví dụ số: đồng xu

Tung xu 5 lần được \`data = (H, H, T, H, T)\` (H = ngửa, T = sấp). Giả định mô hình Bernoulli(\`p\`).

\`\`\`
L(p) = P(H|p) · P(H|p) · P(T|p) · P(H|p) · P(T|p)
     = p · p · (1-p) · p · (1-p)
     = p³ · (1-p)²
\`\`\`

Đây là **hàm của p** (data đã cố định).

Thử vài giá trị:

| p   | p³        | (1-p)²    | L(p) = p³(1-p)² |
|-----|-----------|-----------|------------------|
| 0.1 | 0.001     | 0.81      | 0.000810 |
| 0.3 | 0.027     | 0.49      | 0.013230 |
| 0.5 | 0.125     | 0.25      | 0.031250 |
| **0.6** | **0.216** | **0.16** | **0.034560** ← cực đại |
| 0.7 | 0.343     | 0.09      | 0.030870 |
| 0.9 | 0.729     | 0.01      | 0.007290 |

**p = 0.6 cho L lớn nhất.** Trong 5 lần có 3 ngửa → tỷ lệ ngửa = 3/5 = 0.6. MLE trùng với "trung bình mẫu" — không phải tình cờ, mục 6 sẽ chứng minh.

### ⚠ Lỗi thường gặp

- **Nhầm L với phân phối xác suất của θ**. L(θ) KHÔNG phải PDF/PMF — nó không cần tích phân/tổng = 1. Vd thử \`∫ L(p) dp\` cho ví dụ trên ≠ 1.
- **Nhầm L với P(θ|data)**. Đó là posterior (Bayesian), khác L. Posterior = L · prior / evidence. Mục 10 nói rõ.
- **Quên giả định i.i.d.** rồi vẫn nhân các P lại. Nếu data không độc lập, \`L = P(x₁,...,xₙ|θ)\` KHÔNG bằng tích.

### ❓ Câu hỏi tự nhiên

> Cho phân phối liên tục, \`P(xᵢ | θ)\` = 0 chứ?

Đúng — với phân phối liên tục, dùng PDF \`f(xᵢ | θ)\` thay cho PMF. Likelihood liên tục:

\`\`\`
L(θ) = ∏ᵢ f(xᵢ | θ)
\`\`\`

Vd Gaussian: \`f(x | μ, σ²) = (1 / √(2πσ²)) · exp(-(x-μ)²/(2σ²))\`. Likelihood là tích các giá trị PDF, không phải xác suất chính xác. Vẫn dùng được, miễn argmax (xem mục 5 lý do log).

> L(θ) thường rất bé. Vd \`0.5^100 ≈ 7.9·10⁻³¹\`. Vậy sao máy tính được?

Đó chính là lý do **dùng log-likelihood**. Mục 5.

### 📝 Tóm tắt mục 2

- Likelihood = cùng công thức \`P(data | θ)\`, nhưng cố định data, biến θ.
- i.i.d. → \`L(θ) = ∏ P(xᵢ | θ)\`.
- L KHÔNG phải phân phối xác suất của θ. Đừng nhầm.

---

## 3. MLE — chọn θ làm L cực đại

### 💡 Trực giác

Có rất nhiều giá trị θ giải thích được data, mỗi giá trị có "khả năng" khác nhau. MLE chọn giá trị **làm khả năng cao nhất**:

\`\`\`
θ̂_MLE = argmax_θ L(θ)
\`\`\`

Đọc là "θ-hat MLE bằng θ nào tối đa hóa L(θ)".

### Cách tìm

Bài toán argmax. Có 2 cách:

1. **Closed-form** (giải kín): giải \`dL/dθ = 0\`, kiểm điểm cực đại. Áp dụng cho Bernoulli, Gaussian, Poisson, Exponential, linear regression Gaussian.
2. **Numerical** (số): không giải được kín thì dùng [gradient descent](../../03-Calculus/lesson-07-gradient-descent/) trên \`-log L\` (vì GD minimize, không maximize). Áp dụng cho neural network, logistic regression, GMM với nhiều thành phần.

### Ví dụ số: xu đầu mục 2

\`L(p) = p³(1-p)²\`. Tìm argmax bằng đạo hàm:

\`\`\`
dL/dp = 3p²(1-p)² + p³·2(1-p)·(-1)
      = p²(1-p)·[3(1-p) - 2p]
      = p²(1-p)·(3 - 5p)
\`\`\`

\`dL/dp = 0\` ↔ \`p = 0\` hoặc \`p = 1\` hoặc \`p = 3/5 = 0.6\`.

- p = 0: L = 0 (cực tiểu).
- p = 1: L = 0 (cực tiểu).
- p = 0.6: L = 0.034560 (cực đại).

→ **\`p̂_MLE = 0.6 = 3/5 = k/n\`** với \`k = 3\` ngửa, \`n = 5\` lần tung. Khớp trực giác.

### ❓ Câu hỏi tự nhiên

> Nếu k = 0 (toàn sấp)? p̂ = 0 nghĩa là "xu không bao giờ ngửa"?

Đúng theo MLE. Nhưng đó là **chỉ dấu MLE bị overfit khi data ít** — 5 lần toàn sấp chưa đủ để khẳng định p = 0. MAP (mục 10) hoặc thêm prior khắc phục.

> Có khi nào L(θ) không có max?

Có. Vd Uniform[0, b] với data: L(b) = (1/b)ⁿ cho \`b ≥ max(xᵢ)\`, 0 nếu nhỏ hơn. Max tại \`b̂ = max(xᵢ)\`, là điểm biên — KHÔNG tìm bằng \`dL/db = 0\`. Phải xét miền xác định.

### 📝 Tóm tắt mục 3

- \`θ̂_MLE = argmax_θ L(θ)\`.
- Cách giải: closed-form (đạo hàm = 0) khi được, GD khi không.
- Coi chừng cực tiểu / điểm biên / nghiệm không xác định.

---

## 4. Bước nhỏ: xem tận mắt argmax = giá trị nào

Trước khi đi qua đại số tổng quát, hãy "nhìn" L(p) cho data đồng xu thực sự:

\`data = (H, T, H, H, H, T, T, H, H, T)\` → n = 10, k = 6 ngửa.

\`L(p) = p⁶ · (1-p)⁴\`.

| p   | L(p)            | log L(p) |
|-----|-----------------|----------|
| 0.1 | 0.0000006561    | -14.234 |
| 0.2 | 0.0000262144    | -10.547 |
| 0.3 | 0.0001750329    | -8.650  |
| 0.4 | 0.0005308416    | -7.541  |
| 0.5 | 0.0009765625    | -6.931  |
| **0.6** | **0.0011943936** | **-6.730** ← max |
| 0.7 | 0.0009529569    | -6.957  |
| 0.8 | 0.0004194304    | -7.778  |
| 0.9 | 0.0000531441    | -9.842  |

Cực đại tại \`p = 0.6 = k/n = 6/10\`. Cả L lẫn log L đỉnh ở cùng điểm — log đơn điệu, không thay đổi argmax.

**Quan sát quan trọng**: L(p) cực bé (mức \`10⁻³\` đến \`10⁻¹⁴\`). Với data n = 100, L bé tới mức \`10⁻³⁰\` — vượt khả năng \`float64\`. Đó là lý do mục 5.

---

## 5. Log-likelihood — bí kíp tính

### 💡 Trực giác

Nhân nhiều số nhỏ → bùng số (underflow). Lấy log:

- Tích → tổng: \`log(a·b) = log a + log b\`.
- \`log L = log ∏ P(xᵢ|θ) = Σ log P(xᵢ|θ)\`.
- Tổng dễ chịu hơn tích nhiều.
- Đạo hàm tổng dễ hơn đạo hàm tích (không cần product rule).

### Định nghĩa

\`\`\`
ℓ(θ) ≡ log L(θ) = Σᵢ log P(xᵢ | θ)
\`\`\`

Vì log đơn điệu tăng:

\`\`\`
argmax_θ L(θ) = argmax_θ ℓ(θ)
\`\`\`

→ Cứ tối đa hóa ℓ thoải mái, kết quả không đổi.

### Verify cả 2 vế cho ví dụ xu

\`L(0.6) = 0.6³ · 0.4² = 0.216 · 0.16 = 0.034560\` (n=5, k=3).

\`log L(0.6) = 3·log(0.6) + 2·log(0.4)\`

Dùng \`log\` tự nhiên (ln): \`ln(0.6) ≈ -0.5108\`, \`ln(0.4) ≈ -0.9163\`.

\`ℓ(0.6) = 3·(-0.5108) + 2·(-0.9163) = -1.5324 + (-1.8326) = -3.3650\`.

Check: \`exp(-3.3650) ≈ 0.03455\` ✓ (làm tròn).

### Đạo hàm log L cho xu

Cùng ví dụ n=5, k=3:

\`\`\`
ℓ(p) = 3·log p + 2·log(1-p)
dℓ/dp = 3/p − 2/(1-p)
\`\`\`

Đặt = 0:

\`\`\`
3/p = 2/(1-p)
3(1-p) = 2p
3 - 3p = 2p
3 = 5p
p̂ = 3/5 = 0.6 ✓
\`\`\`

Cùng kết quả, đại số **gọn hơn nhiều** so với đạo hàm trực tiếp L (đã làm ở mục 3).

### ⚠ Lỗi thường gặp

- **Dùng L thay ℓ trong code**: với n vừa lớn (~30), L underflow → \`0.0\` → log L = -∞ → vô dụng. **Luôn dùng log probability ngay từ đầu** trong code ML.
- **Quên \`log(1-p)\` khi \`p\` quá gần 1**: gây \`log(0)\`. Trong code, \`clip(p, ε, 1-ε)\` trước khi log. Tương tự \`log(p)\` khi p ≈ 0.
- **Lẫn log tự nhiên (ln) và log cơ số 10**: argmax không đổi nhưng giá trị ℓ khác. ML chuẩn dùng **ln**.

### ❓ Câu hỏi tự nhiên

> L có thể âm không?

Không — L = product của xác suất ∈ [0, 1] (rời rạc), hoặc PDF ≥ 0 (liên tục). L ≥ 0.

> ℓ có thể dương không?

Có. Với PDF (liên tục), PDF có thể > 1 (vd Gaussian σ nhỏ tại đỉnh), nên \`log f\` có thể > 0. ℓ tổng có thể dương hoặc âm.

> Nếu L(p) chứa các tham số ràng buộc (vd \`p ∈ [0,1]\`)?

Tìm argmax trong miền hợp lệ. Nghiệm \`dℓ/dp = 0\` ở ngoài miền → check biên.

### 📝 Tóm tắt mục 5

- ℓ(θ) = log L(θ) = Σ log P(xᵢ|θ).
- \`argmax L = argmax ℓ\` (log đơn điệu).
- Lý do bắt buộc dùng ℓ: numerical stability + đạo hàm gọn.
- Code: luôn \`log_prob\` chứ không \`prob\` rồi log.

---

## 6. MLE cho Bernoulli — \`p̂ = k/n\`

### Setup

- Mô hình: \`Xᵢ ~ Bernoulli(p)\` (xu có xác suất ngửa = p, đại lượng cần ước lượng).
- Data: \`n\` lần tung, \`k\` lần ngửa, \`n-k\` lần sấp.
- PMF: \`P(x | p) = pˣ · (1-p)^(1-x)\` với \`x ∈ {0, 1}\`.

### Likelihood

\`\`\`
L(p) = ∏ᵢ P(xᵢ | p) = ∏ᵢ p^(xᵢ) · (1-p)^(1-xᵢ)
     = p^(Σxᵢ) · (1-p)^(n - Σxᵢ)
     = p^k · (1-p)^(n-k)
\`\`\`

(\`Σxᵢ = k\` vì các xᵢ là 0/1.)

### Log-likelihood

\`\`\`
ℓ(p) = k·log p + (n-k)·log(1-p)
\`\`\`

### Đạo hàm và giải

\`\`\`
dℓ/dp = k/p − (n-k)/(1-p)
\`\`\`

Đặt = 0:

\`\`\`
k/p = (n-k)/(1-p)
k(1-p) = p(n-k)
k − kp = pn − pk
k = pn
p̂_MLE = k/n
\`\`\`

### Kiểm tra cực đại (không phải cực tiểu)

Đạo hàm cấp 2:

\`\`\`
d²ℓ/dp² = -k/p² − (n-k)/(1-p)²
\`\`\`

Cả 2 số hạng đều âm với \`p ∈ (0, 1)\`, \`0 < k < n\` → ℓ lõm xuống → \`p̂\` là cực đại. ✓

### Walk-through số

n = 100 tung, k = 63 ngửa:

\`\`\`
p̂ = 63/100 = 0.63
ℓ(0.63) = 63·log(0.63) + 37·log(0.37)
        = 63·(-0.4620) + 37·(-0.9943)
        ≈ -29.106 + (-36.788)
        ≈ -65.894
\`\`\`

So với p = 0.5:

\`\`\`
ℓ(0.5) = 63·log(0.5) + 37·log(0.5) = 100·log(0.5) = 100·(-0.6931) = -69.315
\`\`\`

\`ℓ(0.63) > ℓ(0.5)\` ✓ — như mong đợi.

### ❓ Q&A

> Nếu n = 5, k = 5 (toàn ngửa)? p̂ = 1.

Theo MLE: đúng. Nhưng thực tế xu công bằng vẫn có thể ra 5 ngửa với xác suất \`(0.5)⁵ = 1/32 ≈ 3%\`. MLE quá tin tưởng data ít. Cách khắc phục: smoothing \`(k+1)/(n+2)\` (Laplace) hoặc MAP (mục 10).

> Bernoulli có 1 tham số. Nếu phân phối có nhiều tham số (như Gaussian)?

Đạo hàm riêng theo từng tham số = 0, giải hệ. Xem mục 7.

### 📝 Tóm tắt mục 6

- Bernoulli MLE: \`p̂ = k/n\` (tỷ lệ thành công trong mẫu).
- Cách dẫn: viết L, log → ℓ, đạo hàm = 0, giải.
- Trùng trực giác "trung bình mẫu" — đó là điểm tốt.

---

## 7. MLE cho Gaussian — \`μ̂\` và \`σ̂²\`

### Setup

- Mô hình: \`Xᵢ ~ N(μ, σ²)\`, tham số \`θ = (μ, σ²)\`.
- Data: \`x₁, ..., xₙ\`.
- PDF: \`f(x | μ, σ²) = (1/√(2πσ²)) · exp(-(x-μ)²/(2σ²))\`.

### Log-likelihood

\`\`\`
ℓ(μ, σ²) = Σᵢ log f(xᵢ | μ, σ²)
        = Σᵢ [ -½ log(2πσ²) − (xᵢ-μ)²/(2σ²) ]
        = -n/2 · log(2πσ²) − Σᵢ (xᵢ-μ)² / (2σ²)
\`\`\`

### Đạo hàm riêng theo μ

\`\`\`
∂ℓ/∂μ = − Σᵢ 2(xᵢ-μ)·(-1) / (2σ²) = Σᵢ (xᵢ-μ) / σ²
\`\`\`

Đặt = 0 (giả sử σ² > 0):

\`\`\`
Σᵢ (xᵢ - μ) = 0
Σᵢ xᵢ − nμ = 0
μ̂_MLE = (1/n) Σᵢ xᵢ = trung bình mẫu x̄
\`\`\`

### Đạo hàm riêng theo σ² (coi \`v ≡ σ²\` là biến)

\`\`\`
ℓ(μ, v) = -n/2 · log(2πv) - Σᵢ (xᵢ-μ)² / (2v)
∂ℓ/∂v = -n/(2v) + Σᵢ (xᵢ-μ)² / (2v²)
\`\`\`

Đặt = 0:

\`\`\`
-n/(2v) + Σᵢ (xᵢ-μ)² / (2v²) = 0
n/(2v) = Σᵢ (xᵢ-μ)² / (2v²)
n·v = Σᵢ (xᵢ-μ)²
v̂ = (1/n) Σᵢ (xᵢ - μ̂)²
\`\`\`

Tức là \`σ̂²_MLE = (1/n) Σᵢ (xᵢ - μ̂)²\`.

### Walk-through số

Data: \`x = (2, 4, 4, 4, 5, 5, 7, 9)\` (n = 8).

**μ̂**:

\`\`\`
Σ xᵢ = 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40
μ̂ = 40 / 8 = 5
\`\`\`

**σ̂²**:

\`\`\`
(xᵢ - 5)² = (-3)², (-1)², (-1)², (-1)², 0², 0², 2², 4²
         =   9,    1,    1,    1, 0,  0,  4,  16
Σ (xᵢ - 5)² = 32
σ̂² = 32 / 8 = 4
σ̂ = 2
\`\`\`

### Verify

ℓ tại MLE:

\`\`\`
ℓ(5, 4) = -8/2 · log(2π·4) − 32/(2·4)
       = -4 · log(8π) − 4
       ≈ -4 · 3.2237 − 4
       ≈ -12.895 − 4
       = -16.895
\`\`\`

So với (μ=5, σ²=8) (σ² to gấp đôi MLE):

\`\`\`
ℓ(5, 8) = -8/2 · log(16π) − 32/(2·8)
       = -4 · log(16π) − 2
       ≈ -4 · 3.9170 − 2
       ≈ -17.668
\`\`\`

\`ℓ(5, 4) > ℓ(5, 8)\` ✓ — MLE thắng.

### ⚠ Lỗi thường gặp

- **Dùng \`μ\` thay \`μ̂\` trong công thức σ̂²**: nếu μ chưa biết, phải dùng μ̂ (MLE của μ).
- **Nhầm với phương sai mẫu không-bias**: thống kê dạy \`s² = (1/(n-1)) Σ (xᵢ - x̄)²\` (chia \`n-1\`). Đó là **unbiased estimator**, KHÁC MLE. MLE chia \`n\`, hơi bias nhỏ. Mục 11 giải thích.

### ❓ Q&A

> Vì sao chia \`n\` ra biased? Bias bao nhiêu?

Vì \`μ̂\` được fit từ chính data → đã "ăn" mất 1 bậc tự do. \`E[σ̂²_MLE] = (n-1)/n · σ²\`. Vd n = 8: bias \`7/8 = 0.875\`. Chia \`n-1\` thay vì \`n\` thì khử bias. Trong ML thực tế, n thường cực lớn → bias nhỏ → MLE vẫn ổn.

> Nếu Gaussian đa biến (\`N(μ, Σ)\` với Σ ma trận hiệp phương sai)?

Tương tự: \`μ̂ = (1/n) Σ xᵢ\` (vector trung bình), \`Σ̂ = (1/n) Σ (xᵢ-μ̂)(xᵢ-μ̂)ᵀ\` (outer product). Xem [LinearAlgebra L8 — PCA](../../04-LinearAlgebra/lesson-08-pca/) — covariance matrix cách dùng ở đó cùng dạng.

### 📝 Tóm tắt mục 7

- \`μ̂_MLE = x̄\` (trung bình mẫu).
- \`σ̂²_MLE = (1/n) Σ (xᵢ - x̄)²\` (chia \`n\`, hơi biased).
- Cách dẫn: ∂ℓ/∂μ = 0, ∂ℓ/∂σ² = 0, giải tuần tự.
- Chia \`n-1\` thì có \`s²\` unbiased (không phải MLE).

---

## 8. MLE cho linear regression → MSE

### Setup

Mô hình ML kinh điển:

\`\`\`
yᵢ = w·xᵢ + b + εᵢ,    εᵢ ~ N(0, σ²),    i.i.d.
\`\`\`

- \`(xᵢ, yᵢ)\`: data quan sát, i = 1..n.
- \`w, b\`: tham số cần ước lượng.
- \`εᵢ\`: nhiễu (noise), giả định Gaussian, độc lập.

Với giả định Gaussian noise, **\`yᵢ | xᵢ, w, b ~ N(wxᵢ + b, σ²)\`**.

### Likelihood

\`\`\`
L(w, b, σ²) = ∏ᵢ N(yᵢ; wxᵢ + b, σ²)
            = ∏ᵢ (1/√(2πσ²)) · exp(-(yᵢ - wxᵢ - b)² / (2σ²))
\`\`\`

### Log-likelihood

\`\`\`
ℓ(w, b, σ²) = Σᵢ log N(yᵢ; wxᵢ + b, σ²)
            = -n/2 · log(2πσ²) − (1/(2σ²)) · Σᵢ (yᵢ - wxᵢ - b)²
\`\`\`

### Argmax w, b

\`σ²\` là const với mục đích tìm \`w, b\`. Chỉ cần tối thiểu hóa:

\`\`\`
Σᵢ (yᵢ - wxᵢ - b)² ≡ SSE (sum of squared errors)
\`\`\`

Hay tương đương MSE = SSE / n.

→ **\`argmax_{w,b} ℓ = argmin_{w,b} SSE = argmin_{w,b} MSE\`**.

### Đây là điểm chốt

> **MLE với giả định Gaussian noise = minimize MSE**.

Khi sách ML viết "loss = MSE", đó không phải lựa chọn tùy hứng — đó là **hệ quả** của giả định noise Gaussian.

Đổi giả định → đổi loss:

- Noise Laplace \`~ Lap(0, b)\`: MLE → minimize **MAE** (mean absolute error).
- Noise Student-t: MLE → loss robust với outlier.
- Classification (mục 9): MLE → cross-entropy.

### Closed-form cho (w, b)

Đạo hàm SSE:

\`\`\`
∂SSE/∂w = -2 Σ xᵢ(yᵢ - wxᵢ - b)
∂SSE/∂b = -2 Σ (yᵢ - wxᵢ - b)
\`\`\`

Đặt = 0:

\`\`\`
Σ xᵢ yᵢ = w Σ xᵢ² + b Σ xᵢ
Σ yᵢ    = w Σ xᵢ  + n b
\`\`\`

Giải hệ:

\`\`\`
ŵ = (n Σxy − Σx Σy) / (n Σx² − (Σx)²) = Cov(x,y) / Var(x)
b̂ = ȳ − ŵ x̄
\`\`\`

(Trong đó \`x̄ = (1/n) Σ xᵢ\`, \`ȳ = (1/n) Σ yᵢ\`.)

### Walk-through số

\`(xᵢ, yᵢ) = (1, 2), (2, 3), (3, 5), (4, 6), (5, 8)\` (n = 5).

\`\`\`
Σx = 15,   Σy = 24
Σx² = 1+4+9+16+25 = 55
Σxy = 2+6+15+24+40 = 87
x̄ = 3,    ȳ = 4.8
\`\`\`

Công thức:

\`\`\`
ŵ = (5·87 − 15·24) / (5·55 − 15²)
  = (435 − 360) / (275 − 225)
  = 75 / 50
  = 1.5
b̂ = 4.8 − 1.5·3 = 0.3
\`\`\`

→ ŷ = 1.5x + 0.3.

Kiểm tra fit:

| xᵢ | yᵢ | ŷᵢ = 1.5xᵢ + 0.3 | residual yᵢ - ŷᵢ |
|----|-----|------------------|------------------|
| 1  | 2   | 1.8              | +0.2 |
| 2  | 3   | 3.3              | -0.3 |
| 3  | 5   | 4.8              | +0.2 |
| 4  | 6   | 6.3              | -0.3 |
| 5  | 8   | 7.8              | +0.2 |

SSE = 0.04 + 0.09 + 0.04 + 0.09 + 0.04 = 0.30. MSE = 0.06.

### MLE cho σ² (đã có w, b)

Tương tự mục 7:

\`\`\`
σ̂² = (1/n) Σ (yᵢ - ŵxᵢ - b̂)² = SSE / n = 0.30 / 5 = 0.06
\`\`\`

### Liên hệ với negative log-likelihood (NLL)

NLL = \`-ℓ\`. Trong ML, ta minimize NLL:

\`\`\`
-ℓ(w, b, σ²) = n/2 · log(2πσ²) + SSE / (2σ²)
\`\`\`

Với \`σ²\` cố định, minimize NLL ↔ minimize SSE ↔ minimize MSE.

### ❓ Q&A

> Nếu noise không Gaussian, MSE vẫn dùng được không?

Vẫn dùng được, nhưng **không còn là MLE**. Có thể không phải lựa chọn tối ưu thống kê. Vd có outliers nặng, dùng MSE → outlier kéo lệch. Khi đó MAE (Laplace noise) hoặc Huber loss tốt hơn.

> Linear regression nhiều biến (x là vector)?

Tương tự. \`y = w·x + b\` với \`w, x ∈ Rᵈ\`. MLE → minimize SSE → closed-form \`w = (XᵀX)⁻¹Xᵀy\` (xem [LinearAlgebra L7 — Least Squares](../../04-LinearAlgebra/lesson-07-least-squares/) nếu có).

### 📝 Tóm tắt mục 8

- Linear regression với noise Gaussian → MLE → **minimize MSE**.
- Closed-form: \`ŵ = Cov(x,y)/Var(x)\`, \`b̂ = ȳ − ŵ x̄\`.
- "Loss = MSE" KHÔNG phải tùy chọn — đó là hệ quả của giả định noise.
- Đổi giả định noise → đổi loss (Laplace → MAE, t-student → robust loss).

---

## 9. Preview Lesson 08: MLE classification = cross-entropy

### Setup

Classification: mỗi data point \`xᵢ\` thuộc 1 trong K lớp \`cᵢ ∈ {1, ..., K}\`. Model output vector xác suất \`p̂(xᵢ) = (p̂₁, ..., p̂_K)\` với \`Σ p̂_k = 1\`.

→ Phân phối của lớp thật: \`Categorical(p₁, ..., p_K)\`.

### Likelihood

\`P(cᵢ | xᵢ) = p̂_{cᵢ}\` (xác suất model gán cho lớp thật).

Likelihood toàn data:

\`\`\`
L = ∏ᵢ p̂_{cᵢ}(xᵢ)
\`\`\`

### Log-likelihood

\`\`\`
ℓ = Σᵢ log p̂_{cᵢ}(xᵢ)
\`\`\`

### Negative log-likelihood (NLL)

\`\`\`
NLL = -ℓ = -Σᵢ log p̂_{cᵢ}(xᵢ)
\`\`\`

Chia trung bình:

\`\`\`
(1/n) NLL = -(1/n) Σᵢ log p̂_{cᵢ}(xᵢ)
\`\`\`

**Đây chính là cross-entropy loss** (Lesson 08 sẽ chứng minh chi tiết). Trong sklearn / PyTorch / TF, \`CrossEntropyLoss\` chính là cái này.

### Walk-through ngắn

3 data points, 3 lớp (A, B, C):

| i | true class | p̂ model | p̂_{true} | log p̂_{true} |
|---|------------|---------|-----------|----------------|
| 1 | A | (0.7, 0.2, 0.1) | 0.7 | -0.3567 |
| 2 | B | (0.3, 0.4, 0.3) | 0.4 | -0.9163 |
| 3 | C | (0.2, 0.1, 0.7) | 0.7 | -0.3567 |

\`ℓ = -0.3567 + -0.9163 + -0.3567 = -1.6297\`
\`NLL = 1.6297\`. Per-sample = 1.6297 / 3 = 0.5432.

Model nào có cross-entropy nhỏ hơn = MLE tốt hơn = "khả năng đúng" cao hơn. Đây là **lý do mọi mạng classification dùng cross-entropy**.

### Liên kết về MLE

> **Train neural network classification = MLE.**
> Mạng output \`p̂\`, loss = NLL = cross-entropy, minimize bằng [gradient descent](../../03-Calculus/lesson-07-gradient-descent/). Bạn không "chọn" cross-entropy vì nó "có vẻ hợp lý" — bạn chọn vì nó là NLL của Categorical model.

Lesson 08 sẽ làm rõ entropy, cross-entropy, KL divergence.

### 📝 Tóm tắt mục 9

- Classification model: \`Categorical(p̂)\`, true class \`c\`.
- MLE → maximize \`Σ log p̂_c\` → minimize \`−Σ log p̂_c\` = cross-entropy.
- "Cross-entropy loss" trong ML chính là NLL của Categorical MLE.

---

## 10. MAP estimation — MLE + prior

### 💡 Trực giác

MLE chỉ nhìn data. MAP (Maximum A Posteriori) thêm **niềm tin có trước (prior)** về θ.

Ví dụ: tung xu **lạ** 5 lần ra 5 ngửa. MLE bảo \`p̂ = 1\` (xu chỉ ngửa). Nhưng bạn biết hầu hết xu trên thế giới gần \`p = 0.5\` → bạn không tin \`p = 1\`. MAP cho phép bạn ghi vào prior "p có khả năng quanh 0.5" → kết quả \`p̂_MAP\` sẽ giữa 0.5 và 1.

### Setup Bayesian

Bayes' rule (xem [L2 — Bayes](../lesson-02-conditional-bayes/)):

\`\`\`
P(θ | data) = P(data | θ) · P(θ) / P(data)
            = L(θ) · P(θ) / P(data)
\`\`\`

- \`P(θ | data)\`: **posterior** — phân phối của θ sau khi thấy data.
- \`L(θ) = P(data | θ)\`: likelihood.
- \`P(θ)\`: **prior** — niềm tin về θ trước khi thấy data.
- \`P(data)\`: evidence (chuẩn hóa, không phụ thuộc θ).

### MAP estimate

\`\`\`
θ̂_MAP = argmax_θ P(θ | data)
       = argmax_θ L(θ) · P(θ)               (vì P(data) const)
       = argmax_θ [log L(θ) + log P(θ)]      (log đơn điệu)
       = argmax_θ [ℓ(θ) + log P(θ)]
\`\`\`

→ MAP = MLE **+ một số hạng log prior**.

### MLE là trường hợp đặc biệt của MAP

Nếu \`P(θ) = const\` (uniform prior, không thiên về giá trị nào):

\`\`\`
log P(θ) = const   → không ảnh hưởng argmax
θ̂_MAP = argmax ℓ(θ) = θ̂_MLE
\`\`\`

### Walk-through số (xu Beta prior)

Mô hình: \`X ~ Bernoulli(p)\`, prior \`p ~ Beta(α, β)\` với PDF:

\`\`\`
P(p) ∝ p^(α-1) · (1-p)^(β-1)
\`\`\`

(Beta là phân phối liên tục trên [0,1], tham số α, β kiểm soát hình dạng — chi tiết ngoài phạm vi.)

Data: n = 5, k = 5 (toàn ngửa).

Likelihood: \`L(p) ∝ p^5 · (1-p)^0 = p^5\`.

Posterior: \`L(p) · P(p) ∝ p^5 · p^(α-1)(1-p)^(β-1) = p^(5+α-1)(1-p)^(β-1)\`.

Đạo hàm log = 0:

\`\`\`
(5 + α - 1)/p − (β - 1)/(1 - p) = 0
p̂_MAP = (5 + α - 1) / (5 + α + β - 2) = (k + α - 1) / (n + α + β - 2)
\`\`\`

Với prior **uniform** = \`Beta(1, 1)\` (α=β=1):

\`\`\`
p̂_MAP = (5 + 0) / (5 + 0) = 1   ← bằng MLE
\`\`\`

Với prior **gần 0.5** = \`Beta(10, 10)\` (centered 0.5, vừa phải):

\`\`\`
p̂_MAP = (5 + 9) / (5 + 18) = 14 / 23 ≈ 0.609
\`\`\`

→ Prior kéo \`p̂\` về phía 0.5, không tin 100% data ít.

Với prior **rất mạnh** = \`Beta(100, 100)\`:

\`\`\`
p̂_MAP = (5 + 99) / (5 + 198) = 104 / 203 ≈ 0.512
\`\`\`

→ Prior mạnh gần như "lờ data".

### ⚠ Lỗi thường gặp

- **Nhầm MAP với mean posterior**. MAP = argmax (mode) posterior. Mean posterior = E[θ|data] = posterior mean, là số khác (trừ khi posterior đối xứng).
- **Tưởng MAP là "luôn tốt hơn MLE"**. Không — phụ thuộc prior có hợp lý không. Prior sai → MAP tệ.
- **Tưởng prior = regularization**: gần đúng, nhưng tế nhị. L2 regularization tương ứng với Gaussian prior trên weights. L1 ↔ Laplace prior. Chứng minh chính thức tốn 1 bài riêng.

### ❓ Q&A

> MLE và MAP, ML thực tế dùng cái nào?

Cả 2. Vanilla mạng neural minimize cross-entropy = MLE. Khi thêm \`L2 weight decay\`, đó là Gaussian prior trên weights → effectively MAP. Khi train với "label smoothing", "data augmentation"... cũng là cách áp prior.

> Bayesian không chỉ tìm point estimate (MAP) mà giữ cả posterior. Lợi ích gì?

Posterior cho cả **uncertainty**: không chỉ "p ≈ 0.6", mà "p khả năng cao trong [0.5, 0.7]". MLE/MAP đưa 1 số duy nhất, mất thông tin. ML Bayesian (BNN, MC dropout) làm việc với cả posterior.

### 📝 Tóm tắt mục 10

- MAP = argmax posterior = argmax (L · prior).
- log dạng: \`ℓ(θ) + log P(θ)\`.
- **MLE = MAP với uniform prior** — MLE là trường hợp đặc biệt.
- Prior mạnh → kéo θ̂ về phía giá trị prior. Prior yếu → MAP ≈ MLE.

---

## 11. Q&A tổng hợp

### MLE có biased không?

Tùy mô hình.

- **Bernoulli \`p̂ = k/n\`**: unbiased. \`E[k/n] = E[k]/n = np/n = p\`. ✓
- **Gaussian \`μ̂ = x̄\`**: unbiased. \`E[x̄] = μ\`. ✓
- **Gaussian \`σ̂²_MLE = (1/n) Σ(xᵢ - x̄)²\`**: **biased**! \`E[σ̂²_MLE] = (n-1)/n · σ²\`. Bias \`-σ²/n\`. Chia \`n-1\` thay \`n\` thì unbiased (gọi \`s²\`).

Khi n → ∞, bias → 0 → MLE **consistent** (hội tụ về θ thật).

### MLE overfitting?

Có, nhất là khi:

- Model quá phức tạp so với data (nhiều params, ít samples).
- Data ít → likelihood "tin" mọi quirk của mẫu.

Cách giảm overfit (đều là MAP với prior khác nhau):

- L2 regularization (Gaussian prior).
- L1 regularization (Laplace prior, sparse).
- Early stopping (tương đương implicit prior).
- Data augmentation.

### MLE luôn có nghiệm closed-form?

Không. Có với Bernoulli, Gaussian, Exponential, Poisson, Uniform, linear regression Gaussian. KHÔNG có với:

- Logistic regression (must iterate, vd Newton-Raphson hoặc GD).
- Neural network (must GD, backprop).
- Mixture model (must EM algorithm).
- Hidden Markov Model (must Baum-Welch).

### Tính phức tạp của MLE?

- Closed-form: O(n) hoặc O(n²) tùy mô hình.
- GD: O(n · iters) cho 1 epoch. Stochastic GD chia mini-batch giảm tải.

### Khi nào KHÔNG dùng MLE?

- Khi prior thông tin có sẵn → dùng MAP.
- Khi cần uncertainty (không chỉ point estimate) → dùng Bayesian full posterior.
- Khi mô hình không đúng (mis-specified) → MLE có thể converge về θ "sai-nhất-không-sai" (KL nearest), không phải θ thật.
- Khi data có outlier nhiều và mô hình giả định nhẹ → MLE nhạy với outlier (vd Gaussian MLE bị outlier kéo).

### MLE và CRLB?

Cramér-Rao Lower Bound: bất kỳ unbiased estimator nào của θ có variance ≥ 1 / I(θ) (Fisher information). MLE asymptotically đạt CRLB → efficient (best possible variance asymptotically). Lý do MLE phổ biến.

---

## 12. Lỗi thường gặp (gom lại)

| # | Lỗi | Hậu quả | Sửa |
|---|-----|----------|------|
| 1 | Dùng L thay log L trong code | Underflow \`→ 0\`, MLE crash | Luôn \`log_prob\` ngay từ đầu |
| 2 | Quên giả định i.i.d., vẫn nhân P | L sai | Kiểm tra i.i.d. trước; data không độc lập → đổi mô hình (time-series, hierarchical) |
| 3 | Nhầm \`μ\` với \`μ̂\` trong σ̂² | Nếu μ chưa biết, dùng μ̂ | \`σ̂² = (1/n) Σ (xᵢ - μ̂)²\` |
| 4 | Dùng σ̂² MLE rồi tuyên bố "unbiased" | Nhầm hai khái niệm | MLE chia \`n\`; unbiased chia \`n-1\` |
| 5 | Áp MLE cho data ít → overfit | \`p̂ = 0\` hoặc \`1\` khi data ít | Smoothing / MAP / Bayesian |
| 6 | Tưởng \`argmax L(θ)\` ≠ \`argmax log L(θ)\` | Phí công | log đơn điệu — argmax giống nhau |
| 7 | Quên check điều kiện cực đại (chỉ dùng \`dℓ/dθ = 0\`) | Ra cực tiểu hoặc điểm yên ngựa | Kiểm \`d²ℓ/dθ² < 0\` hoặc check biên |
| 8 | Tưởng MLE = MAP luôn | Sai | MAP = MLE chỉ khi prior uniform |
| 9 | Linear regression dùng MSE "vì sách bảo thế" | Thiếu hiểu cội rễ | MSE = MLE với Gaussian noise; đổi noise → đổi loss |
| 10 | \`log(0)\` khi \`p = 0\` hoặc \`1\` | NaN | Clip \`p ∈ [ε, 1-ε]\` trước log |

---

## 13. Bài tập

### Bài 1 — MLE Bernoulli cơ bản

Bạn tung 50 lần một đồng xu lạ, ra 17 mặt ngửa.

(a) Tính \`p̂_MLE\`.

(b) Tính \`ℓ(p̂)\` (dùng log tự nhiên).

(c) So sánh \`ℓ(0.5)\` — liệu xu công bằng "kém khả năng" hơn \`p̂\` bao nhiêu?

---

### Bài 2 — MLE Gaussian

Cho mẫu chiều cao 6 người (cm): \`(165, 170, 172, 168, 175, 169)\`.

(a) Tính \`μ̂_MLE\` và \`σ̂²_MLE\`.

(b) Tính phương sai mẫu unbiased \`s²\` (chia \`n-1\`).

(c) Tính tỷ lệ bias \`σ̂²/s²\`.

---

### Bài 3 — MLE Poisson

Phân phối Poisson với tham số \`λ\` có PMF:

\`\`\`
P(X = k | λ) = e^(-λ) · λ^k / k!,   k = 0, 1, 2, ...
\`\`\`

(a) Dẫn \`λ̂_MLE\` từ data \`x₁, ..., xₙ\` (số sự kiện trong n đơn vị thời gian).

(b) Áp dụng: trong 7 ngày, số khách vào cửa hàng là \`(8, 12, 9, 11, 7, 13, 10)\`. Tính \`λ̂_MLE\`.

---

### Bài 4 — MLE Exponential

Phân phối Exponential có PDF:

\`\`\`
f(x | λ) = λ e^(-λx),   x ≥ 0
\`\`\`

(\`λ\` là rate parameter.)

(a) Dẫn \`λ̂_MLE\` từ data \`x₁, ..., xₙ\`.

(b) Áp dụng: thời gian giữa 5 cuộc gọi (phút) là \`(2.1, 3.5, 1.8, 4.2, 2.9)\`. Tính \`λ̂_MLE\`.

(c) Suy ra thời gian chờ kỳ vọng (1/λ̂).

---

### Bài 5 — Linear regression bằng tay

Cho 4 điểm \`(xᵢ, yᵢ) = (0, 1), (1, 2), (2, 2), (3, 4)\`.

(a) Tính \`ŵ, b̂\` MLE (Gaussian noise).

(b) Tính SSE.

(c) Tính \`σ̂²_MLE\`.

---

### Bài 6 — MAP với Beta prior

Đồng xu mới, prior \`p ~ Beta(2, 8)\` (mean prior = 2/10 = 0.2, bạn nghĩ xu có xu hướng ra sấp).

Bạn tung 10 lần, ra 4 mặt ngửa.

(a) Tính \`p̂_MLE\`.

(b) Tính \`p̂_MAP\` (dùng công thức \`(k + α - 1) / (n + α + β - 2)\`).

(c) So sánh và giải thích.

---

## 14. Lời giải chi tiết

### Lời giải bài 1

(a) \`p̂_MLE = k/n = 17/50 = 0.34\`.

(b) \`ℓ(0.34) = 17·log(0.34) + 33·log(0.66)\`

\`log(0.34) ≈ -1.0788\`, \`log(0.66) ≈ -0.4155\`.

\`ℓ(0.34) = 17·(-1.0788) + 33·(-0.4155) = -18.339 + (-13.712) = -32.051\`.

(c) \`ℓ(0.5) = 50·log(0.5) = 50·(-0.6931) = -34.657\`.

\`ℓ(0.34) − ℓ(0.5) = -32.051 − (-34.657) = 2.606\`. Xu công bằng kém khả năng hơn \`p̂ = 0.34\` bằng \`exp(2.606) ≈ 13.5\` lần. Dữ liệu khá thuyết phục rằng xu KHÔNG công bằng (nhưng 50 lần chưa đủ kết luận chắc — cần test thống kê chính thức).

---

### Lời giải bài 2

(a)
\`\`\`
Σ xᵢ = 165 + 170 + 172 + 168 + 175 + 169 = 1019
μ̂ = 1019 / 6 ≈ 169.833
\`\`\`

Sai số:
\`\`\`
(165 - 169.833)² = 23.36
(170 - 169.833)² = 0.028
(172 - 169.833)² = 4.70
(168 - 169.833)² = 3.36
(175 - 169.833)² = 26.70
(169 - 169.833)² = 0.694
Σ = 58.83
σ̂²_MLE = 58.83 / 6 ≈ 9.806
σ̂ ≈ 3.131
\`\`\`

(b) \`s² = 58.83 / 5 = 11.767\`. \`s ≈ 3.430\`.

(c) \`σ̂²/s² = 9.806 / 11.767 = 0.833 = 5/6 = (n-1)/n\`. ✓ với công thức bias.

---

### Lời giải bài 3

(a) Log-likelihood:

\`\`\`
ℓ(λ) = Σᵢ [-λ + xᵢ·log λ - log(xᵢ!)]
     = -nλ + (Σ xᵢ)·log λ - Σ log(xᵢ!)
\`\`\`

Đạo hàm:
\`\`\`
dℓ/dλ = -n + (Σxᵢ)/λ = 0
λ̂_MLE = (Σ xᵢ) / n = x̄
\`\`\`

→ MLE Poisson cũng là trung bình mẫu.

(b)
\`\`\`
Σ xᵢ = 8+12+9+11+7+13+10 = 70
λ̂_MLE = 70 / 7 = 10
\`\`\`

→ Trung bình 10 khách/ngày.

---

### Lời giải bài 4

(a) Log-likelihood:

\`\`\`
ℓ(λ) = Σᵢ [log λ - λ xᵢ] = n·log λ - λ·Σxᵢ
\`\`\`

Đạo hàm:
\`\`\`
dℓ/dλ = n/λ - Σxᵢ = 0
λ̂_MLE = n / Σxᵢ = 1 / x̄
\`\`\`

(b)
\`\`\`
Σ xᵢ = 2.1 + 3.5 + 1.8 + 4.2 + 2.9 = 14.5
x̄ = 14.5 / 5 = 2.9
λ̂_MLE = 1 / 2.9 ≈ 0.3448 (cuộc/phút)
\`\`\`

(c) Kỳ vọng Exponential: \`E[X] = 1/λ\`. \`1/λ̂ = 2.9 phút\`. Trùng \`x̄\` — không tình cờ, MLE đảm bảo thế.

---

### Lời giải bài 5

(a)
\`\`\`
Σx = 0+1+2+3 = 6
Σy = 1+2+2+4 = 9
Σxy = 0+2+4+12 = 18
Σx² = 0+1+4+9 = 14
n = 4
x̄ = 1.5,   ȳ = 2.25

ŵ = (4·18 - 6·9) / (4·14 - 6²) = (72 - 54) / (56 - 36) = 18 / 20 = 0.9
b̂ = 2.25 - 0.9·1.5 = 2.25 - 1.35 = 0.9
\`\`\`

→ ŷ = 0.9x + 0.9.

(b)
\`\`\`
ŷ₁ = 0.9·0 + 0.9 = 0.9,   y₁ - ŷ₁ = 0.1
ŷ₂ = 0.9·1 + 0.9 = 1.8,   y₂ - ŷ₂ = 0.2
ŷ₃ = 0.9·2 + 0.9 = 2.7,   y₃ - ŷ₃ = -0.7
ŷ₄ = 0.9·3 + 0.9 = 3.6,   y₄ - ŷ₄ = 0.4

SSE = 0.01 + 0.04 + 0.49 + 0.16 = 0.70
\`\`\`

(c) \`σ̂²_MLE = SSE / n = 0.70 / 4 = 0.175\`.

---

### Lời giải bài 6

(a) \`p̂_MLE = 4/10 = 0.4\`.

(b) \`p̂_MAP = (k + α - 1) / (n + α + β - 2) = (4 + 2 - 1) / (10 + 2 + 8 - 2) = 5 / 18 ≈ 0.278\`.

(c) Prior nghĩ p quanh 0.2, data nói p ≈ 0.4. MAP kết hợp 2 ý kiến: \`p̂_MAP ≈ 0.278\`, gần prior hơn vì n = 10 là data tương đối ít so với "sức mạnh" prior \`α + β = 10\`.

Hình dung prior \`Beta(α, β)\` như "data ảo": coi như đã thấy \`α - 1\` ngửa và \`β - 1\` sấp trước. \`Beta(2, 8)\` ↔ "đã thấy 1 ngửa, 7 sấp" → tổng (ảo + thật) = (5 ngửa, 13 sấp), \`p̂_MAP = 5/18\`. Trực giác này khớp công thức.

---

## 15. Tóm tắt toàn bài

| Khái niệm | Định nghĩa | Công thức / Ví dụ |
|------------|-------------|---------------------|
| Likelihood | P(data \\| θ), data cố định, θ biến | \`L(p) = p^k (1-p)^(n-k)\` cho Bernoulli |
| Log-likelihood | \`ℓ = log L = Σ log P(xᵢ\\|θ)\` | Tránh underflow, đạo hàm gọn |
| MLE | \`θ̂ = argmax L = argmax ℓ\` | Bernoulli: \`p̂ = k/n\` |
| MLE Gaussian | μ̂ = x̄, σ̂² = (1/n)Σ(xᵢ-x̄)² | σ̂² chia \`n\`, biased; \`s²\` chia \`n-1\`, unbiased |
| Linear regression MLE | minimize SSE = MSE | \`ŵ = Cov(x,y)/Var(x)\`, \`b̂ = ȳ-ŵx̄\` |
| Classification MLE | minimize cross-entropy = \`-Σ log p̂_c\` | Preview L8 |
| MAP | \`argmax (L · prior)\` = \`argmax (ℓ + log prior)\` | MLE = MAP với uniform prior |
| Bias | E[θ̂] − θ | MLE biased nhỏ với σ̂², unbiased với p̂, μ̂ |

**Mạch kết nối với toàn lộ trình**:

- MLE → minimize \`-ℓ\` bằng [GD](../../03-Calculus/lesson-07-gradient-descent/) → train mạng neural.
- MLE Gaussian → MSE → linear regression (Tầng 6 đầu tiên).
- MLE Categorical → cross-entropy → classification, softmax, language model (Lesson 08 + Tầng 6).
- MAP → regularization (L2 ↔ Gaussian prior, L1 ↔ Laplace prior) → giảm overfit.

→ Sau bài này, mọi loss function bạn gặp trong ML đều có **dẫn xuất từ MLE/MAP**, không phải lựa chọn "trên trời".

---

## Liên kết

- **Bài trước**: [Lesson 06 — Kỳ vọng, phương sai, covariance](../lesson-06-expectation-variance/).
- **Bài tiếp**: [Lesson 08 — Cross-entropy + KL divergence](../lesson-08-cross-entropy-kl/) — sẽ formalize "MLE classification = cross-entropy".
- **Liên quan**:
  - [Calculus L5 — Tối ưu 1 biến](../../03-Calculus/lesson-05-optimization-1d/) — tìm cực đại bằng \`f'=0\`.
  - [Calculus L7 — Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) — khi không closed-form.
  - [Probability L02 — Bayes](../lesson-02-conditional-bayes/) — nền cho MAP.
  - [Probability L05 — Gaussian](../lesson-05-normal-distribution/), [L06 — E, Var](../lesson-06-expectation-variance/) — phân phối nền.
- [Trang chính Probability](../index.html) · [Vectors roadmap](../../README.md).
`;
