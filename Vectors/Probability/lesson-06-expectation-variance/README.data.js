// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Probability/lesson-06-expectation-variance/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Kỳ vọng, Phương sai, Covariance

## Mục tiêu học tập

Sau bài này bạn sẽ:

- **Tính được kỳ vọng \`E[X]\`** cho cả phân phối rời rạc (Σ) và liên tục (∫), hiểu nó là "trung bình có trọng số" chứ không phải "giá trị dễ xảy ra nhất".
- **Sử dụng tuyến tính của kỳ vọng** một cách thành thạo: \`E[aX + b] = aE[X] + b\`, \`E[X+Y] = E[X] + E[Y]\` (luôn đúng, không cần độc lập). Đây là một trong những công cụ mạnh nhất xác suất cho.
- **Tính được \`Var[X]\`** bằng cả định nghĩa \`E[(X-μ)²]\` và công thức \`E[X²] - (E[X])²\`, biết khi nào dùng cái nào.
- **Phân biệt được Var và σ** (độ lệch chuẩn): Var đo bình phương lệch, σ cùng đơn vị với X.
- **Hiểu Covariance và Correlation**: dấu của Cov nói gì, vì sao chia cho \`σ_X·σ_Y\` để chuẩn hóa về \`[-1, 1]\`, và vì sao \`ρ = 0\` **không** kéo theo độc lập.
- **Đọc được Covariance matrix Σ**: đường chéo là phương sai, off-diagonal là covariance, đối xứng và positive semi-definite. Đây là nguyên liệu cho PCA.
- **Liên hệ ML**: MSE loss là variance của residuals, bias-variance tradeoff, và PCA = eigen-decomposition của Σ.

## Kiến thức tiền đề

- [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/) — PMF, Bernoulli, Binomial, Poisson.
- [Lesson 04 — Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/) — PDF, CDF.
- [Lesson 05 — Phân phối chuẩn](../lesson-05-normal-distribution/) — μ, σ², CLT.
- [Tầng 3 — Calculus Lesson 08](../../03-Calculus/lesson-08-integration/) — tích phân (cho E[X] liên tục).
- [Tầng 4 — Linear Algebra Lesson 06](../../04-LinearAlgebra/lesson-06-eigenvalues/) — eigenvalue/eigenvector (cho positive semi-definite của Σ).

---

## 1. Kỳ vọng \`E[X]\`

### 1.1. Trực giác trước định nghĩa

> 💡 **Trực giác.** Tưởng tượng bạn chơi một trò chơi: tung xúc xắc 6 mặt, ăn số tiền bằng số chấm xuất hiện. Chơi 600 lần. Bạn dự đoán tổng ăn được bao nhiêu?
>
> Mỗi mặt xuất hiện trung bình \`600/6 = 100\` lần. Tổng tiền ≈ \`100·(1 + 2 + 3 + 4 + 5 + 6) = 100·21 = 2100\`. Trung bình mỗi lần: \`2100/600 = 3.5\`.
>
> **Đó chính là \`E[X] = 3.5\`.** Nó là **trung bình dài hạn** sau vô số lần lặp, không phải giá trị dễ xảy ra nhất. Lưu ý: 3.5 không bao giờ thực sự xảy ra trong một lần tung — kỳ vọng có thể là một con số không thuộc tập giá trị có thể.

Vậy \`E[X]\` là "trọng tâm" của phân phối: nếu bạn vẽ PMF/PDF rồi cắt giấy ra, đặt lên cạnh dao, thì \`E[X]\` là điểm cân bằng.

### 1.2. Định nghĩa hình thức

**Trường hợp rời rạc:** với biến ngẫu nhiên \`X\` có giá trị \`x₁, x₂, ...\` và PMF \`p(xᵢ) = P(X = xᵢ)\`:

\`\`\`
E[X] = Σᵢ xᵢ · p(xᵢ)
\`\`\`

**Trường hợp liên tục:** với PDF \`f(x)\`:

\`\`\`
E[X] = ∫_{-∞}^{+∞} x · f(x) dx
\`\`\`

> ❓ **Hai công thức này có liên quan gì nhau không?** Có. Cả hai đều là "tổng có trọng số" của giá trị, trọng số là xác suất. Rời rạc tổng đếm, liên tục tổng tích phân. Đó là cùng một ý tưởng dưới hai dạng.

### 1.3. Walk-through 5 ví dụ

#### Ví dụ 1 — Xúc xắc đều 6 mặt

\`X ∈ {1, 2, 3, 4, 5, 6}\`, mỗi giá trị xác suất \`1/6\`.

\`\`\`
E[X] = 1·(1/6) + 2·(1/6) + 3·(1/6) + 4·(1/6) + 5·(1/6) + 6·(1/6)
     = (1+2+3+4+5+6)/6 = 21/6 = 3.5
\`\`\`

#### Ví dụ 2 — Bernoulli(p)

\`X = 1\` với xác suất \`p\`, \`X = 0\` với xác suất \`1-p\`.

\`\`\`
E[X] = 1·p + 0·(1-p) = p
\`\`\`

Kiểm thử: tung xu cân \`p = 0.5\`, kỳ vọng \`0.5\` — nghĩa là trung bình một nửa lần ra mặt ngửa (X = 1). Đúng.

#### Ví dụ 3 — Binomial(n, p)

\`X = X₁ + X₂ + ... + Xₙ\` với mỗi \`Xᵢ ~ Bernoulli(p)\` độc lập.

Dùng tuyến tính (sẽ chứng minh ở mục 4):

\`\`\`
E[X] = E[X₁] + E[X₂] + ... + E[Xₙ] = n·p
\`\`\`

Kiểm thử với \`n = 10, p = 0.3\`: kỳ vọng \`3\` lần thành công trong 10 lần thử. Hợp lý.

#### Ví dụ 4 — Uniform(a, b) liên tục

\`f(x) = 1/(b-a)\` với \`x ∈ [a, b]\`, 0 ngoài đoạn đó.

\`\`\`
E[X] = ∫ₐᵇ x · 1/(b-a) dx
     = 1/(b-a) · [x²/2]ₐᵇ
     = 1/(b-a) · (b² - a²)/2
     = (b+a)/2
\`\`\`

Đúng như trực giác: trung điểm của đoạn \`[a, b]\`.

#### Ví dụ 5 — Exponential(λ)

\`f(x) = λe^{-λx}\` với \`x ≥ 0\`.

\`\`\`
E[X] = ∫₀^∞ x · λe^{-λx} dx
\`\`\`

Tích phân từng phần với \`u = x, dv = λe^{-λx} dx → du = dx, v = -e^{-λx}\`:

\`\`\`
E[X] = [-x·e^{-λx}]₀^∞ + ∫₀^∞ e^{-λx} dx
     = 0 + [-1/λ · e^{-λx}]₀^∞
     = 0 - (-1/λ) = 1/λ
\`\`\`

Nghĩa là: nếu trung bình mỗi phút có \`λ = 2\` sự kiện, thì thời gian chờ giữa 2 sự kiện trung bình là \`1/2 = 0.5\` phút. Khớp trực giác.

> ⚠ **Lỗi thường gặp.** Đừng nghĩ \`E[X]\` là "giá trị dễ xảy ra nhất" — đó là **mode**, khác hẳn. Với phân phối lệch (skewed), mean và mode lệch xa nhau. Ví dụ: lương trong một công ty có vài người siêu giàu → mean cao, mode (mức lương phổ biến nhất) thấp.

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Một xúc xắc 4 mặt đều có giá trị \`{1, 2, 3, 4}\`. Tính \`E[X]\`.
> 2. Một xu lệch \`p = 0.7\`. Tính \`E[X]\` cho \`X ~ Bernoulli\`.
>
> <details><summary>Đáp án</summary>
>
> 1. \`E[X] = (1+2+3+4)/4 = 2.5\`.
> 2. \`E[X] = 0.7\`.
>
> </details>

### 1.4. 📝 Tóm tắt mục 1

- \`E[X]\` = trung bình có trọng số, "trọng tâm" của phân phối.
- Rời rạc: tổng \`Σ x·p(x)\`; liên tục: \`∫ x·f(x) dx\`.
- Khác mode, khác median. Có thể là giá trị không xảy ra thực tế (xúc xắc 3.5).
- 5 ví dụ chuẩn: dice 3.5, Bernoulli p, Binomial np, Uniform \`(a+b)/2\`, Exp \`1/λ\`.

---

## 2. Tính chất của kỳ vọng

### 2.1. Tuyến tính (linearity) — định lý quan trọng nhất

\`\`\`
E[aX + b] = a·E[X] + b
E[X + Y] = E[X] + E[Y]    (cho mọi X, Y — KHÔNG cần độc lập!)
\`\`\`

> 💡 **Vì sao quan trọng?** Vì nó cho phép "tách" một biến phức tạp thành tổng nhiều biến đơn giản, tính \`E\` từng cái rồi cộng lại. Đây là lý do \`E[Binomial(n, p)] = np\` được dẫn ra trong 1 dòng ở Ví dụ 3.

#### Chứng minh rời rạc (cho \`E[X + Y]\`)

\`\`\`
E[X + Y] = Σ_{x,y} (x + y) · p(x, y)
         = Σ_{x,y} x·p(x,y) + Σ_{x,y} y·p(x,y)
         = Σ_x x · (Σ_y p(x,y)) + Σ_y y · (Σ_x p(x,y))
         = Σ_x x · p_X(x) + Σ_y y · p_Y(y)
         = E[X] + E[Y]
\`\`\`

Lưu ý: ở dòng 3 ta dùng "marginal" — tổng theo \`y\` của joint là PMF của \`X\`. **Không có bước nào giả định độc lập.**

### 2.2. Walk-through tuyến tính

#### Ví dụ — tổng 2 xúc xắc

\`X, Y\` là 2 xúc xắc 6 mặt. \`Z = X + Y\`.

\`\`\`
E[Z] = E[X] + E[Y] = 3.5 + 3.5 = 7
\`\`\`

Tính kiểu "khó" thì phải liệt kê 36 kết quả, tính PMF của tổng rồi nhân — mất 1 trang. Tuyến tính cho ngay trong 1 dòng.

#### Ví dụ — bù lương theo doanh thu

Lương cố định 10 triệu + 5% doanh thu \`X\`. Doanh thu kỳ vọng \`E[X] = 200\` triệu.

\`\`\`
Lương = 10 + 0.05·X
E[Lương] = 10 + 0.05·200 = 10 + 10 = 20 triệu
\`\`\`

> ❓ **Câu hỏi tự nhiên.** Tại sao \`E[X + Y] = E[X] + E[Y]\` không cần độc lập, nhưng \`Var[X + Y] = Var[X] + Var[Y]\` lại cần? Lý do: tuyến tính bảo toàn dưới expectation (vì E là tích phân/tổng tuyến tính), nhưng phương sai có thành phần bình phương → khi mở \`(X + Y - μ_X - μ_Y)²\` xuất hiện số hạng chéo \`2(X-μ_X)(Y-μ_Y)\`, kỳ vọng của nó **chính là** covariance. Nếu Cov = 0 (đặc biệt khi độc lập) thì thành phần đó biến mất → cộng được. Sẽ chứng minh đầy đủ ở mục 8.

### 2.3. Một số tính chất khác

- **Hằng số**: \`E[c] = c\` (biến ngẫu nhiên không đổi).
- **Đơn điệu**: nếu \`X ≤ Y\` chắc chắn thì \`E[X] ≤ E[Y]\`.
- **Tích KHÔNG bằng tích kỳ vọng nói chung**: \`E[XY] ≠ E[X]·E[Y]\` trừ khi X, Y độc lập.

> ⚠ **Lỗi thường gặp.** Đừng viết \`E[X·Y] = E[X]·E[Y]\` mà không kiểm tra độc lập. Ví dụ phản chứng: \`Y = X\`, thì \`E[X·Y] = E[X²]\`, nhưng \`E[X]·E[Y] = (E[X])²\`. Hai cái này khác nhau bằng đúng \`Var[X] ≥ 0\`. Bằng nhau chỉ khi \`Var[X] = 0\`, tức X là hằng số.

> 🔁 **Tự kiểm tra.** Cho \`X ~ Uniform(0, 10)\`, \`Y = 3X + 5\`. Tính \`E[Y]\`.
>
> <details><summary>Đáp án</summary>
>
> \`E[X] = 5\`. Theo tuyến tính: \`E[Y] = 3·5 + 5 = 20\`.
>
> </details>

### 2.4. 📝 Tóm tắt mục 2

- Tuyến tính \`E[aX + b] = aE[X] + b\` và \`E[X+Y] = E[X] + E[Y]\` — **luôn đúng**.
- Tích \`E[XY]\` chỉ tách được khi độc lập.
- Tuyến tính là cách "nhanh" để tính \`E\` của biến phức tạp.

---

## 3. \`E[g(X)]\` và LOTUS

### 3.1. Trực giác

> 💡 **Vấn đề.** Cho \`X ~ Uniform(0, 1)\`. Tính \`E[X²]\`. Cám dỗ đầu tiên là viết \`E[X²] = (E[X])² = (1/2)² = 1/4\`. **SAI.**
>
> Đúng: phải lấy mọi giá trị có thể của \`X²\`, nhân với mật độ của \`X\` ban đầu, rồi tích phân.

### 3.2. LOTUS — Law of the Unconscious Statistician

\`\`\`
E[g(X)] = Σ_x g(x) · p(x)         (rời rạc)
E[g(X)] = ∫ g(x) · f(x) dx        (liên tục)
\`\`\`

Tại sao gọi là "Unconscious"? Vì hầu hết người dùng áp công thức này mà không nhận ra nó cần được chứng minh — nó **không hiển nhiên**: ta tính \`E[g(X)]\` mà không cần đi qua PDF của \`Y = g(X)\`.

### 3.3. Ví dụ — \`E[X²]\` cho \`X ~ Uniform(0, 1)\`

\`\`\`
E[X²] = ∫₀¹ x² · 1 dx = [x³/3]₀¹ = 1/3
\`\`\`

So với \`(E[X])² = 1/4\`. Khác nhau \`1/3 - 1/4 = 1/12\` — đó chính là \`Var[Uniform(0,1)]\`.

### 3.4. Ví dụ — \`E[X²]\` cho xúc xắc

\`\`\`
E[X²] = (1² + 2² + 3² + 4² + 5² + 6²) / 6
      = (1 + 4 + 9 + 16 + 25 + 36) / 6
      = 91/6 ≈ 15.167
\`\`\`

(Sẽ dùng ở mục 6 để tính \`Var[X]\` của xúc xắc.)

### 3.5. 📝 Tóm tắt mục 3

- \`E[g(X)] = Σ g(x)·p(x)\` hoặc \`∫ g(x)·f(x) dx\`.
- Không phải \`g(E[X])\` — ngoại trừ \`g\` tuyến tính.
- Là nền tảng để tính phương sai (\`g(x) = (x-μ)²\`).

---

## 4. Phương sai \`Var[X]\`

### 4.1. Trực giác

> 💡 **Trực giác.** \`E[X]\` chỉ nói "trung bình" — không nói "biến động cỡ nào". Hai phân phối có cùng mean nhưng khác hẳn về độ tản: ví dụ một phân phối tập trung sát mean (variance nhỏ), một phân phối trải rộng (variance lớn). Variance đo "độ rộng" này.
>
> Cụ thể: trung bình của **bình phương** khoảng cách từ X đến \`μ\`.

### 4.2. Định nghĩa

\`\`\`
Var[X] = E[(X - μ)²]    với μ = E[X]
\`\`\`

**Công thức thực hành** (tiện tính hơn):

\`\`\`
Var[X] = E[X²] - (E[X])²
\`\`\`

Chứng minh:

\`\`\`
E[(X - μ)²] = E[X² - 2μX + μ²]
            = E[X²] - 2μ·E[X] + μ²       (tuyến tính)
            = E[X²] - 2μ² + μ²
            = E[X²] - μ²
\`\`\`

> ❓ **Câu hỏi tự nhiên.** Sao không dùng \`E[|X - μ|]\` (mean absolute deviation) cho dễ hiểu? Lý do thực dụng: bình phương cho ta khả vi mượt → dễ làm giải tích, dễ ráp vào MLE, MSE. Trị tuyệt đối không khả vi tại 0 → giải tích đau đầu. Bình phương cũng "phạt nặng" outlier — phù hợp với nhiều ứng dụng.

### 4.3. Walk-through 4 ví dụ

#### Ví dụ 1 — Xúc xắc 6 mặt

\`\`\`
E[X]  = 3.5
E[X²] = 91/6 ≈ 15.167   (mục 3.4)
Var[X] = 91/6 - (7/2)² = 91/6 - 49/4 = 182/12 - 147/12 = 35/12 ≈ 2.917
σ = √(35/12) ≈ 1.708
\`\`\`

#### Ví dụ 2 — Bernoulli(p)

\`\`\`
E[X]  = p
E[X²] = 1²·p + 0²·(1-p) = p
Var[X] = p - p² = p(1-p)
\`\`\`

Đặc biệt \`p = 0.5\` cho \`Var = 0.25\` (max), \`p = 0\` hoặc \`1\` cho \`Var = 0\` (hằng số).

#### Ví dụ 3 — Uniform(a, b)

\`\`\`
E[X]  = (a+b)/2
E[X²] = ∫ₐᵇ x² · 1/(b-a) dx = (b³ - a³)/(3(b-a)) = (a² + ab + b²)/3
Var[X] = (a² + ab + b²)/3 - ((a+b)/2)²
       = (a² + ab + b²)/3 - (a² + 2ab + b²)/4
\`\`\`

Quy đồng 12:

\`\`\`
       = (4(a² + ab + b²) - 3(a² + 2ab + b²)) / 12
       = (4a² + 4ab + 4b² - 3a² - 6ab - 3b²) / 12
       = (a² - 2ab + b²) / 12
       = (b - a)² / 12
\`\`\`

Khớp Ví dụ 3.3 với \`a=0, b=1\`: \`Var = 1/12\`. ✓

#### Ví dụ 4 — Exponential(λ)

Tính \`E[X²]\` bằng tích phân từng phần (hai lần):

\`\`\`
E[X²] = ∫₀^∞ x² · λe^{-λx} dx = 2/λ²
Var[X] = 2/λ² - (1/λ)² = 1/λ²
σ = 1/λ
\`\`\`

Đặc biệt: với exponential, \`σ = mean\` — phân phối tản rộng đúng bằng trung bình.

### 4.4. 📝 Tóm tắt mục 4

- \`Var[X] = E[(X-μ)²] = E[X²] - μ²\`.
- Bernoulli(p): \`p(1-p)\`. Dice: \`35/12\`. Uniform(a,b): \`(b-a)²/12\`. Exp(λ): \`1/λ²\`.
- \`Var ≥ 0\` luôn, bằng 0 khi và chỉ khi X là hằng số.

---

## 5. Tính chất phương sai

### 5.1. \`Var[aX + b]\`

\`\`\`
Var[aX + b] = a² · Var[X]
\`\`\`

Chứng minh:

\`\`\`
Var[aX + b] = E[(aX + b - (aμ + b))²]
            = E[(aX - aμ)²]
            = E[a²(X - μ)²]
            = a²·E[(X - μ)²]
            = a²·Var[X]
\`\`\`

Cả \`b\` (dịch chuyển) lẫn \`a\` (scale) đều quan trọng:

- \`b\` không ảnh hưởng — dịch chuyển không thay đổi độ tản.
- \`a\` được bình phương — scale gấp đôi → variance gấp 4.

> ⚠ **Lỗi rất phổ biến.** Viết \`Var[2X] = 2·Var[X]\`. **SAI.** Đúng là \`Var[2X] = 4·Var[X]\`. Lý do: variance đo theo bình phương đơn vị, scale \`a\` ảnh hưởng \`a²\`.
>
> Tương ứng cho σ: \`σ[aX] = |a|·σ[X]\` (cùng đơn vị với X).

### 5.2. \`Var[X + Y]\` và covariance

\`\`\`
Var[X + Y] = Var[X] + Var[Y] + 2·Cov(X, Y)
\`\`\`

**Nếu X, Y độc lập** (hoặc tổng quát hơn: uncorrelated): \`Cov = 0\` → \`Var[X + Y] = Var[X] + Var[Y]\`.

Chứng minh đầy đủ:

\`\`\`
Var[X + Y] = E[(X + Y - μ_X - μ_Y)²]
           = E[((X - μ_X) + (Y - μ_Y))²]
           = E[(X - μ_X)² + (Y - μ_Y)² + 2(X - μ_X)(Y - μ_Y)]
           = Var[X] + Var[Y] + 2·E[(X - μ_X)(Y - μ_Y)]
           = Var[X] + Var[Y] + 2·Cov(X, Y)
\`\`\`

### 5.3. Ví dụ thực hành

#### Tổng hai xúc xắc độc lập

\`\`\`
Var[X + Y] = Var[X] + Var[Y] = 35/12 + 35/12 = 70/12 ≈ 5.833
σ_{X+Y} = √(70/12) ≈ 2.415
\`\`\`

#### Hiệu hai biến — \`Var[X - Y]\`

\`X - Y = X + (-Y)\`. Áp công thức:

\`\`\`
Var[X - Y] = Var[X] + Var[-Y] + 2·Cov(X, -Y)
           = Var[X] + Var[Y] - 2·Cov(X, Y)
\`\`\`

Nếu độc lập: \`Var[X - Y] = Var[X] + Var[Y]\` — **vẫn cộng**, không trừ.

> ❓ **Câu hỏi tự nhiên: \`Var[X - Y]\` có thể âm không?** Không, không bao giờ. Variance theo định nghĩa là kỳ vọng của một bình phương ≥ 0. Nếu bạn ra số âm, đó là lỗi tính.

### 5.4. 📝 Tóm tắt mục 5

- \`Var[aX + b] = a²·Var[X]\`. Đừng quên bình phương \`a\`.
- \`Var[X + Y] = Var[X] + Var[Y] + 2·Cov\`. Độc lập → bỏ Cov.
- \`Var[X - Y] = Var[X] + Var[Y] - 2·Cov\`. Vẫn không âm.

---

## 6. Độ lệch chuẩn (Standard Deviation)

\`\`\`
σ[X] = √Var[X]
\`\`\`

**Tại sao cần thêm σ khi đã có Var?**

- Var có đơn vị **bình phương** của X. Nếu X là chiều cao tính bằng cm, Var có đơn vị cm². Không trực quan.
- σ cùng đơn vị với X — đọc được trực tiếp: "trung bình lệch khỏi mean khoảng σ".
- Trong phân phối chuẩn: 68% giá trị nằm trong \`μ ± σ\`, 95% trong \`μ ± 2σ\`, 99.7% trong \`μ ± 3σ\`.

### Ví dụ

- Xúc xắc: \`σ ≈ 1.708\` — giá trị trung bình lệch khỏi 3.5 khoảng 1.7.
- IQ chuẩn \`N(100, 15²)\`: \`σ = 15\`, nghĩa là \`[85, 115]\` chứa 68% dân số.

> 📝 **Tóm tắt mục 6.** σ = √Var. Cùng đơn vị X. Là thước đo "tản" có ý nghĩa thực tế.

---

## 7. Covariance \`Cov(X, Y)\`

### 7.1. Trực giác

> 💡 **Trực giác.** Khi \`X\` lớn, \`Y\` có xu hướng cũng lớn hay nhỏ?
>
> - Cùng lớn / cùng nhỏ → **đồng biến** → Cov dương.
> - X lớn đi với Y nhỏ → **nghịch biến** → Cov âm.
> - Không có quan hệ tuyến tính → Cov ≈ 0.

### 7.2. Định nghĩa

\`\`\`
Cov(X, Y) = E[(X - μ_X)(Y - μ_Y)]
          = E[XY] - E[X]·E[Y]    (công thức thực hành)
\`\`\`

Chứng minh dạng thứ hai:

\`\`\`
E[(X - μ_X)(Y - μ_Y)] = E[XY - μ_X·Y - X·μ_Y + μ_X·μ_Y]
                     = E[XY] - μ_X·E[Y] - μ_Y·E[X] + μ_X·μ_Y
                     = E[XY] - μ_X·μ_Y - μ_X·μ_Y + μ_X·μ_Y
                     = E[XY] - μ_X·μ_Y
\`\`\`

### 7.3. Tính chất

- \`Cov(X, X) = Var[X]\`.
- \`Cov(X, Y) = Cov(Y, X)\` — đối xứng.
- Bilinear: \`Cov(aX + b, cY + d) = ac·Cov(X, Y)\` — hằng số bị triệt, scale nhân vào.
- \`|Cov(X, Y)| ≤ σ_X · σ_Y\` (bất đẳng thức Cauchy-Schwarz).
- **Độc lập → \`Cov = 0\`** (nhưng chiều ngược lại không đúng — xem 8.3).

### 7.4. Walk-through 3 ví dụ

#### Ví dụ 1 — X, Y độc lập

\`X, Y ~ Bernoulli(0.5)\` độc lập. Tính Cov(X, Y).

\`\`\`
E[X] = E[Y] = 0.5
E[XY] = P(X=1, Y=1)·1·1 = 0.5·0.5 = 0.25
Cov(X, Y) = 0.25 - 0.5·0.5 = 0
\`\`\`

Như mong đợi.

#### Ví dụ 2 — Y = X (đồng biến hoàn hảo)

\`\`\`
Cov(X, X) = E[X²] - (E[X])² = Var[X]
\`\`\`

#### Ví dụ 3 — Joint PMF cho 2 xúc xắc giả tạo

\`X, Y ∈ {1, 2, 3}\` với joint PMF:

| X\\Y | 1 | 2 | 3 |
|-----|-----|-----|-----|
| 1 | 0.25 | 0.05 | 0 |
| 2 | 0.05 | 0.20 | 0.05 |
| 3 | 0 | 0.05 | 0.25 |

Marginal: \`P(X=1) = 0.3, P(X=2) = 0.3, P(X=3) = 0.3\`. Đợi — tổng \`0.9\`. Để đúng tổng 1, sửa diagonal lên một chút. Lấy bảng dễ hơn:

| X\\Y | 1 | 2 | 3 |
|-----|-----|-----|-----|
| 1 | 0.3 | 0.05 | 0 |
| 2 | 0.05 | 0.20 | 0.05 |
| 3 | 0 | 0.05 | 0.3 |

Tổng = \`0.3+0.05+0+0.05+0.2+0.05+0+0.05+0.3 = 1.0\` ✓.

Marginal X: \`P(X=1) = 0.35, P(X=2) = 0.30, P(X=3) = 0.35\`. Đối xứng → marginal Y giống hệt.

\`\`\`
E[X] = 1·0.35 + 2·0.30 + 3·0.35 = 0.35 + 0.6 + 1.05 = 2.0
E[Y] = 2.0
\`\`\`

\`\`\`
E[XY] = 1·1·0.3 + 1·2·0.05 + 1·3·0 + 2·1·0.05 + 2·2·0.20 + 2·3·0.05
      + 3·1·0 + 3·2·0.05 + 3·3·0.3
      = 0.3 + 0.1 + 0 + 0.1 + 0.8 + 0.3 + 0 + 0.3 + 2.7
      = 4.6

Cov(X, Y) = 4.6 - 2.0·2.0 = 0.6
\`\`\`

Dương — đúng vì bảng tập trung khối lượng ở đường chéo \`X = Y\` (đồng biến).

### 7.5. 📝 Tóm tắt mục 7

- Cov đo mức "đồng biến": dương = cùng tăng/giảm, âm = ngược.
- \`Cov(X, Y) = E[XY] - E[X]E[Y]\`. Khi độc lập = 0.
- \`Cov(X, X) = Var[X]\`. Bilinear.

---

## 8. Hệ số tương quan \`ρ\`

### 8.1. Tại sao cần?

Covariance có đơn vị **đơn vị X · đơn vị Y** — không thể so sánh giữa các cặp khác đơn vị. Ví dụ: Cov(chiều cao cm, cân nặng kg) và Cov(chiều cao m, cân nặng kg) khác nhau bằng đúng tỉ lệ 100, dù cùng một dữ liệu.

Cần một số **không đơn vị**, **bị chặn**, để dùng phổ quát.

### 8.2. Định nghĩa và tính chất

\`\`\`
ρ(X, Y) = Cov(X, Y) / (σ_X · σ_Y)
\`\`\`

**Tính chất quan trọng:**

- \`-1 ≤ ρ ≤ 1\` (suy từ Cauchy-Schwarz).
- \`ρ = +1\` ⇔ \`Y = aX + b\` với \`a > 0\` (tuyến tính dương hoàn hảo).
- \`ρ = -1\` ⇔ \`Y = aX + b\` với \`a < 0\`.
- \`ρ = 0\` ⇔ **uncorrelated** (không có quan hệ **tuyến tính**) — không kéo theo độc lập!

Bằng số:

- \`|ρ| > 0.7\` thường gọi là "tương quan mạnh".
- \`0.3 < |ρ| < 0.7\` "trung bình".
- \`|ρ| < 0.3\` "yếu".

### 8.3. ⚠ \`ρ = 0\` không kéo theo độc lập

**Ví dụ phản chứng kinh điển.** \`X ~ Uniform(-1, 1)\`, \`Y = X²\`.

\`\`\`
E[X] = 0, E[Y] = E[X²] = 1/3 (đã tính cho Uniform(0,1), điều chỉnh)
E[XY] = E[X³] = ∫_{-1}^{1} x³ · 1/2 dx = 0  (hàm lẻ)
Cov(X, Y) = 0 - 0·(1/3) = 0
→ ρ = 0
\`\`\`

Nhưng \`Y\` được xác định **hoàn toàn** bởi \`X\` (\`Y = X²\`) — chúng cực kỳ phụ thuộc!

**Bài học:** Cov và ρ chỉ bắt được quan hệ **tuyến tính**. Quan hệ phi tuyến (parabola, sin, exp) có thể có \`ρ = 0\` mà vẫn rất phụ thuộc.

> ❓ **Câu hỏi tự nhiên: Vậy độc lập có suy ra ρ = 0 không?** Có. \`X ⊥ Y ⇒ E[XY] = E[X]E[Y] ⇒ Cov = 0 ⇒ ρ = 0\`. Chiều ngược thì không, như ví dụ trên.
>
> **Một ngoại lệ quan trọng:** nếu \`(X, Y)\` là **joint normal**, thì \`ρ = 0 ⇔ X ⊥ Y\`. Đây là một trong những lý do Gaussian đặc biệt.

### 8.4. 📝 Tóm tắt mục 8

- ρ = Cov chuẩn hóa, không đơn vị, ∈ [-1, 1].
- ρ = ±1 ⇔ tuyến tính hoàn hảo.
- ρ = 0 chỉ là uncorrelated, **không** kéo theo độc lập (trừ joint normal).

---

## 9. Covariance matrix \`Σ\`

### 9.1. Trực giác

> 💡 Khi có **nhiều** biến ngẫu nhiên \`X₁, ..., Xₙ\` cùng lúc (vector ngẫu nhiên \`X ∈ ℝⁿ\`), ta cần một cách gọn để ghi:
>
> - Phương sai của mỗi \`Xᵢ\`.
> - Covariance giữa mọi cặp \`Xᵢ, Xⱼ\`.
>
> → Đóng gói trong một ma trận \`n × n\`.

### 9.2. Định nghĩa

Với \`X = (X₁, ..., Xₙ)ᵀ\` và \`μ = E[X] = (μ₁, ..., μₙ)ᵀ\`:

\`\`\`
Σ = E[(X - μ)(X - μ)ᵀ]
\`\`\`

Thành phần thứ \`(i, j)\`:

\`\`\`
Σᵢⱼ = Cov(Xᵢ, Xⱼ)
\`\`\`

Đặc biệt:

\`\`\`
Σᵢᵢ = Var[Xᵢ]    (đường chéo = phương sai mỗi biến)
\`\`\`

### 9.3. Ví dụ — \`n = 2\`

\`\`\`
      [ Var[X]      Cov(X,Y) ]
Σ  =  [ Cov(X,Y)    Var[Y]   ]
\`\`\`

Với \`Var[X] = 4, Var[Y] = 9, Cov(X, Y) = 3\`:

\`\`\`
      [ 4   3 ]
Σ  =  [ 3   9 ]
\`\`\`

\`ρ = 3 / (2·3) = 0.5\`.

### 9.4. Tính chất của \`Σ\`

#### 9.4.1. Đối xứng

\`Σᵢⱼ = Cov(Xᵢ, Xⱼ) = Cov(Xⱼ, Xᵢ) = Σⱼᵢ\`. Suy ra \`Σᵀ = Σ\`.

#### 9.4.2. Positive semi-definite (PSD)

\`vᵀ Σ v ≥ 0\` với mọi \`v ∈ ℝⁿ\`.

**Chứng minh:**

\`\`\`
vᵀ Σ v = vᵀ E[(X-μ)(X-μ)ᵀ] v
       = E[vᵀ(X-μ)(X-μ)ᵀv]
       = E[((X-μ)ᵀv)²]
       ≥ 0   (kỳ vọng của một bình phương)
\`\`\`

Hệ quả: mọi eigenvalue của \`Σ\` ≥ 0.

> ❓ **Khi nào Σ là positive definite (strict, không "semi")?** Khi không có hướng nào mà phương sai bằng 0 — tương đương \`det Σ > 0\`. Ví dụ: nếu một biến là tổ hợp tuyến tính của các biến khác (collinear), thì có hướng mà phương sai = 0 → Σ chỉ PSD, không PD.

### 9.5. Ví dụ tính eigenvalue (n = 2)

\`\`\`
      [ 4   3 ]
Σ  =  [ 3   9 ]

det(Σ - λI) = (4 - λ)(9 - λ) - 9 = λ² - 13λ + 27 = 0
λ = (13 ± √(169 - 108))/2 = (13 ± √61)/2
λ₁ ≈ 10.405, λ₂ ≈ 2.595    — cả hai > 0, Σ là PD.
\`\`\`

### 9.6. Liên hệ Tầng 4 — PCA

> 💡 **Bridge tới PCA.** PCA (Principal Component Analysis) bắt đầu bằng cách:
>
> 1. Lấy ma trận dữ liệu, trừ mean từng feature.
> 2. Tính ma trận covariance mẫu \`Σ̂ = (1/N) Xᵀ X\`.
> 3. Eigen-decompose \`Σ̂ = V Λ Vᵀ\`.
> 4. Eigenvector ứng với eigenvalue lớn nhất = "hướng phương sai lớn nhất" = principal component đầu tiên.
>
> Sẽ học chi tiết ở [Tầng 4 — Linear Algebra Lesson 08](../../04-LinearAlgebra/lesson-08-pca/) (nếu chưa có thì coi như mục tiếp theo cần học).

### 9.7. 📝 Tóm tắt mục 9

- \`Σᵢⱼ = Cov(Xᵢ, Xⱼ)\`. Đường chéo = variance.
- Đối xứng và PSD. Eigenvalue ≥ 0.
- Nền tảng cho PCA, Gaussian đa biến, Kalman filter.

---

## 10. Liên hệ ML

### 10.1. MSE loss và variance của residuals

Cho dataset \`{(xᵢ, yᵢ)}\` và model dự đoán \`ŷᵢ = f(xᵢ)\`. Residual \`rᵢ = yᵢ - ŷᵢ\`.

\`\`\`
MSE = (1/N) Σᵢ rᵢ² = (1/N) Σᵢ (yᵢ - ŷᵢ)²
\`\`\`

Nếu model được fit để \`mean(rᵢ) = 0\` (true cho linear regression với intercept), thì:

\`\`\`
MSE = (1/N) Σ (rᵢ - 0)² = sample variance of residuals
\`\`\`

Tức là **train với MSE = minimize phương sai của sai số**. Đó là lý do MSE rất tự nhiên dưới giả thuyết Gaussian noise.

### 10.2. Bias-variance tradeoff

\`\`\`
E[(ŷ - y)²] = Bias² + Variance + Irreducible noise
\`\`\`

Trong đó:

- **Bias** = \`E[ŷ] - y\` — model "trung bình" có lệch khỏi sự thật bao nhiêu (underfit).
- **Variance** = \`Var[ŷ]\` — model thay đổi cỡ nào khi đổi tập train (overfit).
- **Irreducible noise** = \`Var[noise]\` — không thể giảm bằng model tốt hơn.

Tradeoff: model phức tạp → bias thấp + variance cao; model đơn giản → bias cao + variance thấp. Mục tiêu là tổng \`Bias² + Variance\` nhỏ nhất.

### 10.3. PCA và covariance matrix

Như đã nói mục 9.6: PCA = eigen-decomposition của Σ. Eigenvalue lớn nhất → hướng có phương sai lớn nhất → "thông tin nhiều nhất" → giữ lại để giảm chiều.

### 10.4. Gaussian đa biến

\`\`\`
X ~ N(μ, Σ)
\`\`\`

PDF có dạng \`exp(-(1/2)(x - μ)ᵀ Σ⁻¹ (x - μ))\`. Σ⁻¹ gọi là **precision matrix**, đóng vai trò trong nhiều thuật toán (Gaussian Process, Kalman filter).

> 📝 **Tóm tắt mục 10.** MSE ≈ variance of residuals. Bias² + Variance là phân rã sai số. PCA cần Σ. Gaussian đa biến cần Σ⁻¹.

---

## 11. ❓ Q&A — câu hỏi tự nhiên

### Q1. \`E[XY] ≠ E[X]·E[Y]\` khi nào?

Khi \`Cov(X, Y) ≠ 0\`. Cụ thể:

\`\`\`
E[XY] = E[X]·E[Y] + Cov(X, Y)
\`\`\`

Nếu X, Y độc lập thì Cov = 0 và đẳng thức trở thành \`E[XY] = E[X]E[Y]\`. Ngược lại không.

### Q2. \`Var[X - Y]\` có thể nhỏ hơn 0 không?

**Không.** Variance theo định nghĩa là kỳ vọng của bình phương ≥ 0. Nếu tính ra số âm → lỗi tính.

### Q3. Tại sao dùng bình phương trong Var thay vì trị tuyệt đối?

- **Toán học**: bình phương khả vi mượt, dễ làm giải tích, dễ ráp vào MLE.
- **Thống kê**: với Gaussian noise, MLE = least squares = MSE. Không có "mean absolute error MLE" trừ khi noise là Laplace.
- **Hình học**: variance ↔ độ dài bình phương trong không gian L² → quan hệ rõ với Pythagore và orthogonality.

### Q4. Σ luôn có inverse?

**Không.** Σ là PSD, có thể có eigenvalue = 0 (singular). Khi nào singular?

- Khi tồn tại tổ hợp tuyến tính của các biến có phương sai = 0 (collinear).
- Trong thực tế: dữ liệu có ít sample hơn chiều (\`N < n\`) → sample Σ̂ chắc chắn singular.

Giải pháp: regularize, \`Σ̂ + λI\` để đảm bảo invertible.

### Q5. Nếu hai biến không độc lập nhưng ρ = 0, sao phát hiện được?

- Vẽ scatter plot — quan hệ phi tuyến nhìn ra ngay.
- Dùng "distance correlation" hoặc "mutual information" — bắt được quan hệ phi tuyến.
- Test phi tham số (Spearman, Kendall) cho monotonic relationships.

---

## 12. ⚠ Lỗi thường gặp tổng hợp

1. **\`Var[2X] = 2·Var[X]\`** — SAI, đúng là \`4·Var[X]\`.
2. **\`E[g(X)] = g(E[X])\`** — SAI nói chung, đúng chỉ khi \`g\` tuyến tính.
3. **\`E[XY] = E[X]·E[Y]\`** — chỉ đúng khi độc lập.
4. **"ρ = 0 nghĩa là độc lập"** — SAI, chỉ là uncorrelated. Phản chứng: \`Y = X²\`.
5. **"Var có cùng đơn vị X"** — SAI. Đó là σ. Var có đơn vị bình phương.
6. **"Σ luôn invertible"** — SAI khi singular.
7. **Nhầm Var/SD trong báo cáo** — đọc kỹ tài liệu.
8. **"Hai biến cùng dấu thì ρ > 0"** — phát biểu mập mờ. Đúng phải nói "đồng biến": khi X trên mean thì Y cũng có xu hướng trên mean.

---

## 13. Bài tập thực hành

### Bài 1

Một xúc xắc 8 mặt đều. Tính \`E[X]\`, \`Var[X]\`, \`σ\`.

### Bài 2

\`X ~ Binomial(10, 0.4)\`. Tính \`E[X]\`, \`Var[X]\`.

### Bài 3

Cho \`X ~ Uniform(2, 8)\`. \`Y = 3X - 5\`. Tính \`E[Y]\` và \`Var[Y]\`.

### Bài 4

\`X, Y\` độc lập, \`Var[X] = 4, Var[Y] = 9\`. Tính:
- \`Var[X + Y]\`
- \`Var[X - Y]\`
- \`Var[2X - 3Y]\`

### Bài 5

Joint PMF của \`(X, Y)\` với \`X, Y ∈ {0, 1}\`:

| X\\Y | 0 | 1 |
|-----|---|---|
| 0 | 0.4 | 0.1 |
| 1 | 0.2 | 0.3 |

Tính \`Cov(X, Y)\` và \`ρ(X, Y)\`.

### Bài 6

Cho covariance matrix:

\`\`\`
      [ 2   1   0 ]
Σ  =  [ 1   2   1 ]
      [ 0   1   2 ]
\`\`\`

- Kiểm tra Σ có symmetric không.
- Tính eigenvalue. Σ có PD không?
- Cov(X₁, X₃) bằng bao nhiêu? Hai biến này có uncorrelated không?

---

## 14. Lời giải chi tiết

### Lời giải Bài 1

\`X ∈ {1, 2, ..., 8}\`, mỗi giá trị xác suất \`1/8\`.

\`\`\`
E[X] = (1+2+3+4+5+6+7+8)/8 = 36/8 = 4.5
E[X²] = (1+4+9+16+25+36+49+64)/8 = 204/8 = 25.5
Var[X] = 25.5 - 4.5² = 25.5 - 20.25 = 5.25 = 21/4
σ = √5.25 ≈ 2.291
\`\`\`

**Verify nhanh:** với xúc xắc đều \`n\` mặt, có công thức \`Var = (n² - 1)/12\`. Với \`n = 8\`: \`(64-1)/12 = 63/12 = 5.25\`. ✓

### Lời giải Bài 2

Binomial(n, p): \`E[X] = np, Var[X] = np(1-p)\`.

\`\`\`
E[X] = 10·0.4 = 4
Var[X] = 10·0.4·0.6 = 2.4
σ = √2.4 ≈ 1.549
\`\`\`

### Lời giải Bài 3

\`X ~ Uniform(2, 8)\`:

\`\`\`
E[X] = (2+8)/2 = 5
Var[X] = (8-2)²/12 = 36/12 = 3
\`\`\`

\`Y = 3X - 5\`:

\`\`\`
E[Y] = 3·5 - 5 = 10
Var[Y] = 3²·Var[X] = 9·3 = 27
σ_Y = √27 ≈ 5.196
\`\`\`

### Lời giải Bài 4

Vì độc lập nên \`Cov = 0\`.

\`\`\`
Var[X + Y] = Var[X] + Var[Y] = 4 + 9 = 13
Var[X - Y] = Var[X] + Var[Y] = 4 + 9 = 13   (CŨNG là cộng!)
Var[2X - 3Y] = 4·Var[X] + 9·Var[Y] = 4·4 + 9·9 = 16 + 81 = 97
\`\`\`

### Lời giải Bài 5

Marginal:
- \`P(X=0) = 0.4 + 0.1 = 0.5\`, \`P(X=1) = 0.5\`.
- \`P(Y=0) = 0.4 + 0.2 = 0.6\`, \`P(Y=1) = 0.4\`.

\`\`\`
E[X] = 0·0.5 + 1·0.5 = 0.5
E[Y] = 0·0.6 + 1·0.4 = 0.4
E[XY] = 0·0·0.4 + 0·1·0.1 + 1·0·0.2 + 1·1·0.3 = 0.3

Cov(X, Y) = 0.3 - 0.5·0.4 = 0.3 - 0.2 = 0.1

Var[X] = E[X²] - (E[X])² = 0.5 - 0.25 = 0.25 (Bernoulli(0.5): 0.5·0.5)
Var[Y] = 0.4·0.6 = 0.24

σ_X = 0.5, σ_Y = √0.24 ≈ 0.4899

ρ = 0.1 / (0.5 · 0.4899) ≈ 0.408
\`\`\`

**Diễn giải:** ρ ≈ 0.41 — tương quan dương vừa phải. Nhìn bảng cũng thấy: khối lượng tập trung ở \`(0,0)\` và \`(1,1)\`.

### Lời giải Bài 6

**Symmetric?**

\`Σ[1][2] = 1 = Σ[2][1]\`, \`Σ[1][3] = 0 = Σ[3][1]\`, \`Σ[2][3] = 1 = Σ[3][2]\`. ✓ Đối xứng.

**Eigenvalue:**

\`\`\`
det(Σ - λI) = det([2-λ  1   0
                   1   2-λ  1
                   0   1   2-λ])
\`\`\`

Khai triển theo hàng 1:

\`\`\`
= (2-λ)·det([2-λ  1; 1  2-λ]) - 1·det([1  1; 0  2-λ]) + 0
= (2-λ)·((2-λ)² - 1) - (2-λ)
= (2-λ)·[(2-λ)² - 1 - 1]
= (2-λ)·[(2-λ)² - 2]
\`\`\`

Cho bằng 0:

- \`λ = 2\`
- \`(2-λ)² = 2 ⇒ 2 - λ = ±√2 ⇒ λ = 2 ± √2\`

Vậy ba eigenvalue: \`λ₁ = 2 + √2 ≈ 3.414\`, \`λ₂ = 2\`, \`λ₃ = 2 - √2 ≈ 0.586\`. Tất cả > 0 → Σ là **positive definite**.

**Cov(X₁, X₃):** từ ma trận = \`Σ[1][3] = 0\`. Vậy X₁ và X₃ **uncorrelated**. Nhưng có độc lập không thì không kết luận được chỉ từ Σ (cần joint distribution). Tuy nhiên nếu (X₁, X₂, X₃) joint normal thì ρ = 0 ⇔ độc lập → trong trường hợp đó X₁ ⊥ X₃.

---

## 15. Liên kết tiếp theo

- [Lesson 07 — Maximum Likelihood Estimation](../lesson-07-mle/): dùng \`E\` và \`Var\` để chứng minh MLE là estimator hợp lý.
- [Lesson 08 — Cross-entropy và KL divergence](../lesson-08-cross-entropy-kl/): các "khoảng cách" giữa phân phối, dẫn loss của classification.
- [Tầng 4 — Linear Algebra Lesson 08 — PCA](../../04-LinearAlgebra/lesson-08-pca/): eigen-decompose covariance matrix.
- [Visualization](./visualization.html): 4 component tương tác (E[X]+Var, linearity, correlation, Σ matrix viewer).
`;
