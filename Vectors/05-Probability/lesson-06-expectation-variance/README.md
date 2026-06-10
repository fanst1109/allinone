# Lesson 06 — Kỳ vọng, Phương sai, Covariance

## Mục tiêu học tập

Sau bài này bạn sẽ:

- **Tính được kỳ vọng $E[X]$** cho cả phân phối rời rạc ($\sum$) và liên tục ($\int$), hiểu nó là "trung bình có trọng số" chứ không phải "giá trị dễ xảy ra nhất".
- **Sử dụng tuyến tính của kỳ vọng** một cách thành thạo: $E[aX + b] = aE[X] + b$, $E[X+Y] = E[X] + E[Y]$ (luôn đúng, không cần độc lập). Đây là một trong những công cụ mạnh nhất xác suất cho.
- **Tính được $\operatorname{Var}[X]$** bằng cả định nghĩa $E[(X-\mu)^2]$ và công thức $E[X^2] - (E[X])^2$, biết khi nào dùng cái nào.
- **Phân biệt được $\operatorname{Var}$ và $\sigma$** (độ lệch chuẩn): $\operatorname{Var}$ đo bình phương lệch, $\sigma$ cùng đơn vị với X.
- **Hiểu Covariance và Correlation**: dấu của Cov nói gì, vì sao chia cho $\sigma_X \cdot \sigma_Y$ để chuẩn hóa về $[-1, 1]$, và vì sao $\rho = 0$ **không** kéo theo độc lập.
- **Đọc được Covariance matrix $\Sigma$**: đường chéo là phương sai, off-diagonal là covariance, đối xứng và positive semi-definite. Đây là nguyên liệu cho PCA.
- **Liên hệ ML**: MSE loss là variance của residuals, bias-variance tradeoff, và PCA = eigen-decomposition của Σ.

## Kiến thức tiền đề

- [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/) — PMF, Bernoulli, Binomial, Poisson.
- [Lesson 04 — Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/) — PDF, CDF.
- [Lesson 05 — Phân phối chuẩn](../lesson-05-normal-distribution/) — $\mu$, $\sigma^2$, CLT.
- [Tầng 3 — Calculus Lesson 08](../../03-Calculus/lesson-08-integration/) — tích phân (cho E[X] liên tục).
- [Tầng 4 — Linear Algebra Lesson 06](../../04-LinearAlgebra/lesson-06-eigenvalues/) — eigenvalue/eigenvector (cho positive semi-definite của Σ).

---

## 1. Kỳ vọng E[X]

### 1.1. Trực giác trước định nghĩa

> 💡 **Trực giác.** Tưởng tượng bạn chơi một trò chơi: tung xúc xắc 6 mặt, ăn số tiền bằng số chấm xuất hiện. Chơi 600 lần. Bạn dự đoán tổng ăn được bao nhiêu?
>
> Mỗi mặt xuất hiện trung bình $600/6 = 100$ lần. Tổng tiền $\approx 100 \cdot (1 + 2 + 3 + 4 + 5 + 6) = 100 \cdot 21 = 2100$. Trung bình mỗi lần: $2100/600 = 3.5$.
>
> **Đó chính là $E[X] = 3.5$.** Nó là **trung bình dài hạn** sau vô số lần lặp, không phải giá trị dễ xảy ra nhất. Lưu ý: 3.5 không bao giờ thực sự xảy ra trong một lần tung — kỳ vọng có thể là một con số không thuộc tập giá trị có thể.

Vậy $E[X]$ là "trọng tâm" của phân phối: nếu bạn vẽ PMF/PDF rồi cắt giấy ra, đặt lên cạnh dao, thì $E[X]$ là điểm cân bằng.

### 1.2. Định nghĩa hình thức

**Trường hợp rời rạc:** với biến ngẫu nhiên $X$ có giá trị $x_1, x_2, \dots$ và PMF $p(x_i) = P(X = x_i)$:

$$E[X] = \sum_i x_i \cdot p(x_i)$$

**Trường hợp liên tục:** với PDF $f(x)$:

$$E[X] = \int_{-\infty}^{+\infty} x \cdot f(x)\,dx$$

> ❓ **Hai công thức này có liên quan gì nhau không?** Có. Cả hai đều là "tổng có trọng số" của giá trị, trọng số là xác suất. Rời rạc tổng đếm, liên tục tổng tích phân. Đó là cùng một ý tưởng dưới hai dạng.

### 1.3. Walk-through 5 ví dụ

#### Ví dụ 1 — Xúc xắc đều 6 mặt

$X \in \{1, 2, 3, 4, 5, 6\}$, mỗi giá trị xác suất $1/6$.

$$\begin{aligned}
E[X] &= 1 \cdot \tfrac{1}{6} + 2 \cdot \tfrac{1}{6} + 3 \cdot \tfrac{1}{6} + 4 \cdot \tfrac{1}{6} + 5 \cdot \tfrac{1}{6} + 6 \cdot \tfrac{1}{6} \\
&= \frac{1+2+3+4+5+6}{6} = \frac{21}{6} = 3.5
\end{aligned}$$

#### Ví dụ 2 — Bernoulli(p)

$X = 1$ với xác suất $p$, $X = 0$ với xác suất $1-p$.

$$E[X] = 1 \cdot p + 0 \cdot (1-p) = p$$

Kiểm thử: tung xu cân $p = 0.5$, kỳ vọng $0.5$ — nghĩa là trung bình một nửa lần ra mặt ngửa ($X = 1$). Đúng.

#### Ví dụ 3 — Binomial(n, p)

$X = X_1 + X_2 + \dots + X_n$ với mỗi $X_i \sim \text{Bernoulli}(p)$ độc lập.

Dùng tuyến tính (sẽ chứng minh ở mục 4):

$$E[X] = E[X_1] + E[X_2] + \dots + E[X_n] = n \cdot p$$

Kiểm thử với $n = 10, p = 0.3$: kỳ vọng $3$ lần thành công trong 10 lần thử. Hợp lý.

#### Ví dụ 4 — Uniform(a, b) liên tục

$f(x) = \frac{1}{b-a}$ với $x \in [a, b]$, 0 ngoài đoạn đó.

$$\begin{aligned}
E[X] &= \int_a^b x \cdot \frac{1}{b-a}\,dx \\
&= \frac{1}{b-a} \cdot \left[\frac{x^2}{2}\right]_a^b \\
&= \frac{1}{b-a} \cdot \frac{b^2 - a^2}{2} \\
&= \frac{b+a}{2}
\end{aligned}$$

Đúng như trực giác: trung điểm của đoạn $[a, b]$.

#### Ví dụ 5 — Exponential(λ)

$f(x) = \lambda e^{-\lambda x}$ với $x \ge 0$.

$$E[X] = \int_0^\infty x \cdot \lambda e^{-\lambda x}\,dx$$

Tích phân từng phần với $u = x,\ dv = \lambda e^{-\lambda x}\,dx \to du = dx,\ v = -e^{-\lambda x}$:

$$\begin{aligned}
E[X] &= \left[-x \cdot e^{-\lambda x}\right]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx \\
&= 0 + \left[-\tfrac{1}{\lambda} \cdot e^{-\lambda x}\right]_0^\infty \\
&= 0 - \left(-\tfrac{1}{\lambda}\right) = \frac{1}{\lambda}
\end{aligned}$$

Nghĩa là: nếu trung bình mỗi phút có $\lambda = 2$ sự kiện, thì thời gian chờ giữa 2 sự kiện trung bình là $1/2 = 0.5$ phút. Khớp trực giác.

> ⚠ **Lỗi thường gặp.** Đừng nghĩ $E[X]$ là "giá trị dễ xảy ra nhất" — đó là **mode**, khác hẳn. Với phân phối lệch (skewed), mean và mode lệch xa nhau. Ví dụ: lương trong một công ty có vài người siêu giàu → mean cao, mode (mức lương phổ biến nhất) thấp.

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Một xúc xắc 4 mặt đều có giá trị $\{1, 2, 3, 4\}$. Tính $E[X]$.
> 2. Một xu lệch $p = 0.7$. Tính $E[X]$ cho $X \sim \text{Bernoulli}$.
>
> <details><summary>Đáp án</summary>
>
> 1. $E[X] = (1+2+3+4)/4 = 2.5$.
> 2. $E[X] = 0.7$.
>
> </details>

### 1.4. 📝 Tóm tắt mục 1

- $E[X]$ = trung bình có trọng số, "trọng tâm" của phân phối.
- Rời rạc: tổng $\sum x \cdot p(x)$; liên tục: $\int x \cdot f(x)\,dx$.
- Khác mode, khác median. Có thể là giá trị không xảy ra thực tế (xúc xắc 3.5).
- 5 ví dụ chuẩn: dice 3.5, Bernoulli $p$, Binomial $np$, Uniform $(a+b)/2$, Exp $1/\lambda$.

---

## 2. Tính chất của kỳ vọng

### 2.1. Tuyến tính (linearity) — định lý quan trọng nhất

$$\begin{aligned}
E[aX + b] &= a \cdot E[X] + b \\
E[X + Y] &= E[X] + E[Y] \quad (\text{cho mọi } X, Y - \text{KHÔNG cần độc lập!})
\end{aligned}$$

> 💡 **Vì sao quan trọng?** Vì nó cho phép "tách" một biến phức tạp thành tổng nhiều biến đơn giản, tính $E$ từng cái rồi cộng lại. Đây là lý do $E[\text{Binomial}(n, p)] = np$ được dẫn ra trong 1 dòng ở Ví dụ 3.

#### Chứng minh rời rạc (cho $E[X + Y]$)

$$\begin{aligned}
E[X + Y] &= \sum_{x,y} (x + y) \cdot p(x, y) \\
&= \sum_{x,y} x \cdot p(x,y) + \sum_{x,y} y \cdot p(x,y) \\
&= \sum_x x \cdot \left(\sum_y p(x,y)\right) + \sum_y y \cdot \left(\sum_x p(x,y)\right) \\
&= \sum_x x \cdot p_X(x) + \sum_y y \cdot p_Y(y) \\
&= E[X] + E[Y]
\end{aligned}$$

Lưu ý: ở dòng 3 ta dùng "marginal" — tổng theo $y$ của joint là PMF của $X$. **Không có bước nào giả định độc lập.**

### 2.2. Walk-through tuyến tính

#### Ví dụ — tổng 2 xúc xắc

$X, Y$ là 2 xúc xắc 6 mặt. $Z = X + Y$.

$$E[Z] = E[X] + E[Y] = 3.5 + 3.5 = 7$$

Tính kiểu "khó" thì phải liệt kê 36 kết quả, tính PMF của tổng rồi nhân — mất 1 trang. Tuyến tính cho ngay trong 1 dòng.

#### Ví dụ — bù lương theo doanh thu

Lương cố định 10 triệu + 5% doanh thu $X$. Doanh thu kỳ vọng $E[X] = 200$ triệu.

$$\begin{aligned}
\text{Lương} &= 10 + 0.05 \cdot X \\
E[\text{Lương}] &= 10 + 0.05 \cdot 200 = 10 + 10 = 20 \text{ triệu}
\end{aligned}$$

> ❓ **Câu hỏi tự nhiên.** Tại sao $E[X + Y] = E[X] + E[Y]$ không cần độc lập, nhưng $\operatorname{Var}[X + Y] = \operatorname{Var}[X] + \operatorname{Var}[Y]$ lại cần? Lý do: tuyến tính bảo toàn dưới expectation (vì E là tích phân/tổng tuyến tính), nhưng phương sai có thành phần bình phương → khi mở $(X + Y - \mu_X - \mu_Y)^2$ xuất hiện số hạng chéo $2(X-\mu_X)(Y-\mu_Y)$, kỳ vọng của nó **chính là** covariance. Nếu $\operatorname{Cov} = 0$ (đặc biệt khi độc lập) thì thành phần đó biến mất → cộng được. Sẽ chứng minh đầy đủ ở mục 8.

### 2.3. Một số tính chất khác

- **Hằng số**: $E[c] = c$ (biến ngẫu nhiên không đổi).
- **Đơn điệu**: nếu $X \le Y$ chắc chắn thì $E[X] \le E[Y]$.
- **Tích KHÔNG bằng tích kỳ vọng nói chung**: $E[XY] \ne E[X] \cdot E[Y]$ trừ khi X, Y độc lập.

> ⚠ **Lỗi thường gặp.** Đừng viết $E[X \cdot Y] = E[X] \cdot E[Y]$ mà không kiểm tra độc lập. Ví dụ phản chứng: $Y = X$, thì $E[X \cdot Y] = E[X^2]$, nhưng $E[X] \cdot E[Y] = (E[X])^2$. Hai cái này khác nhau bằng đúng $\operatorname{Var}[X] \ge 0$. Bằng nhau chỉ khi $\operatorname{Var}[X] = 0$, tức X là hằng số.

> 🔁 **Tự kiểm tra.** Cho $X \sim \text{Uniform}(0, 10)$, $Y = 3X + 5$. Tính $E[Y]$.
>
> <details><summary>Đáp án</summary>
>
> $E[X] = 5$. Theo tuyến tính: $E[Y] = 3 \cdot 5 + 5 = 20$.
>
> </details>

### 2.4. 📝 Tóm tắt mục 2

- Tuyến tính $E[aX + b] = aE[X] + b$ và $E[X+Y] = E[X] + E[Y]$ — **luôn đúng**.
- Tích $E[XY]$ chỉ tách được khi độc lập.
- Tuyến tính là cách "nhanh" để tính $E$ của biến phức tạp.

---

## 3. E[g(X)] và LOTUS

### 3.1. Trực giác

> 💡 **Vấn đề.** Cho $X \sim \text{Uniform}(0, 1)$. Tính $E[X^2]$. Cám dỗ đầu tiên là viết $E[X^2] = (E[X])^2 = (1/2)^2 = 1/4$. **SAI.**
>
> Đúng: phải lấy mọi giá trị có thể của $X^2$, nhân với mật độ của $X$ ban đầu, rồi tích phân.

### 3.2. LOTUS — Law of the Unconscious Statistician

$$\begin{aligned}
E[g(X)] &= \sum_x g(x) \cdot p(x) &&\text{(rời rạc)} \\
E[g(X)] &= \int g(x) \cdot f(x)\,dx &&\text{(liên tục)}
\end{aligned}$$

Tại sao gọi là "Unconscious"? Vì hầu hết người dùng áp công thức này mà không nhận ra nó cần được chứng minh — nó **không hiển nhiên**: ta tính $E[g(X)]$ mà không cần đi qua PDF của $Y = g(X)$.

### 3.3. Ví dụ — E[X²] cho X ~ Uniform(0, 1)

$$E[X^2] = \int_0^1 x^2 \cdot 1\,dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3}$$

So với $(E[X])^2 = 1/4$. Khác nhau $1/3 - 1/4 = 1/12$ — đó chính là $\operatorname{Var}[\text{Uniform}(0,1)]$.

### 3.4. Ví dụ — E[X²] cho xúc xắc

$$\begin{aligned}
E[X^2] &= \frac{1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2}{6} \\
&= \frac{1 + 4 + 9 + 16 + 25 + 36}{6} \\
&= \frac{91}{6} \approx 15.167
\end{aligned}$$

(Sẽ dùng ở mục 6 để tính $\operatorname{Var}[X]$ của xúc xắc.)

### 3.5. 📝 Tóm tắt mục 3

- $E[g(X)] = \sum g(x) \cdot p(x)$ hoặc $\int g(x) \cdot f(x)\,dx$.
- Không phải $g(E[X])$ — ngoại trừ $g$ tuyến tính.
- Là nền tảng để tính phương sai ($g(x) = (x-\mu)^2$).

---

## 4. Phương sai Var[X]

### 4.1. Trực giác

> 💡 **Trực giác.** $E[X]$ chỉ nói "trung bình" — không nói "biến động cỡ nào". Hai phân phối có cùng mean nhưng khác hẳn về độ tản: ví dụ một phân phối tập trung sát mean (variance nhỏ), một phân phối trải rộng (variance lớn). Variance đo "độ rộng" này.
>
> Cụ thể: trung bình của **bình phương** khoảng cách từ X đến $\mu$.

### 4.2. Định nghĩa

$$\operatorname{Var}[X] = E[(X - \mu)^2] \quad \text{với } \mu = E[X]$$

**Công thức thực hành** (tiện tính hơn):

$$\operatorname{Var}[X] = E[X^2] - (E[X])^2$$

Chứng minh:

$$\begin{aligned}
E[(X - \mu)^2] &= E[X^2 - 2\mu X + \mu^2] \\
&= E[X^2] - 2\mu \cdot E[X] + \mu^2 \quad \text{(tuyến tính)} \\
&= E[X^2] - 2\mu^2 + \mu^2 \\
&= E[X^2] - \mu^2
\end{aligned}$$

> ❓ **Câu hỏi tự nhiên.** Sao không dùng $E[|X - \mu|]$ (mean absolute deviation) cho dễ hiểu? Lý do thực dụng: bình phương cho ta khả vi mượt → dễ làm giải tích, dễ ráp vào MLE, MSE. Trị tuyệt đối không khả vi tại 0 → giải tích đau đầu. Bình phương cũng "phạt nặng" outlier — phù hợp với nhiều ứng dụng.

### 4.3. Walk-through 4 ví dụ

#### Ví dụ 1 — Xúc xắc 6 mặt

$$\begin{aligned}
E[X] &= 3.5 \\
E[X^2] &= \frac{91}{6} \approx 15.167 \quad \text{(mục 3.4)} \\
\operatorname{Var}[X] &= \frac{91}{6} - \left(\frac{7}{2}\right)^2 = \frac{91}{6} - \frac{49}{4} = \frac{182}{12} - \frac{147}{12} = \frac{35}{12} \approx 2.917 \\
\sigma &= \sqrt{\frac{35}{12}} \approx 1.708
\end{aligned}$$

#### Ví dụ 2 — Bernoulli(p)

$$\begin{aligned}
E[X] &= p \\
E[X^2] &= 1^2 \cdot p + 0^2 \cdot (1-p) = p \\
\operatorname{Var}[X] &= p - p^2 = p(1-p)
\end{aligned}$$

Đặc biệt $p = 0.5$ cho $\operatorname{Var} = 0.25$ (max), $p = 0$ hoặc $1$ cho $\operatorname{Var} = 0$ (hằng số).

#### Ví dụ 3 — Uniform(a, b)

$$\begin{aligned}
E[X] &= \frac{a+b}{2} \\
E[X^2] &= \int_a^b x^2 \cdot \frac{1}{b-a}\,dx = \frac{b^3 - a^3}{3(b-a)} = \frac{a^2 + ab + b^2}{3} \\
\operatorname{Var}[X] &= \frac{a^2 + ab + b^2}{3} - \left(\frac{a+b}{2}\right)^2 \\
&= \frac{a^2 + ab + b^2}{3} - \frac{a^2 + 2ab + b^2}{4}
\end{aligned}$$

Quy đồng 12:

$$\begin{aligned}
&= \frac{4(a^2 + ab + b^2) - 3(a^2 + 2ab + b^2)}{12} \\
&= \frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12} \\
&= \frac{a^2 - 2ab + b^2}{12} \\
&= \frac{(b - a)^2}{12}
\end{aligned}$$

Khớp Ví dụ 3.3 với $a=0, b=1$: $\operatorname{Var} = 1/12$. ✓

#### Ví dụ 4 — Exponential(λ)

Tính $E[X^2]$ bằng tích phân từng phần (hai lần):

$$\begin{aligned}
E[X^2] &= \int_0^\infty x^2 \cdot \lambda e^{-\lambda x}\,dx = \frac{2}{\lambda^2} \\
\operatorname{Var}[X] &= \frac{2}{\lambda^2} - \left(\frac{1}{\lambda}\right)^2 = \frac{1}{\lambda^2} \\
\sigma &= \frac{1}{\lambda}
\end{aligned}$$

Đặc biệt: với exponential, $\sigma = \text{mean}$ — phân phối tản rộng đúng bằng trung bình.

### 4.4. 📝 Tóm tắt mục 4

- $\operatorname{Var}[X] = E[(X-\mu)^2] = E[X^2] - \mu^2$.
- Bernoulli(p): $p(1-p)$. Dice: $35/12$. Uniform(a,b): $(b-a)^2/12$. Exp(λ): $1/\lambda^2$.
- $\operatorname{Var} \ge 0$ luôn, bằng 0 khi và chỉ khi X là hằng số.

---

## 5. Tính chất phương sai

### 5.1. Var[aX + b]

$$\operatorname{Var}[aX + b] = a^2 \cdot \operatorname{Var}[X]$$

Chứng minh:

$$\begin{aligned}
\operatorname{Var}[aX + b] &= E[(aX + b - (a\mu + b))^2] \\
&= E[(aX - a\mu)^2] \\
&= E[a^2(X - \mu)^2] \\
&= a^2 \cdot E[(X - \mu)^2] \\
&= a^2 \cdot \operatorname{Var}[X]
\end{aligned}$$

Cả $b$ (dịch chuyển) lẫn $a$ (scale) đều quan trọng:

- $b$ không ảnh hưởng — dịch chuyển không thay đổi độ tản.
- $a$ được bình phương — scale gấp đôi → variance gấp 4.

> ⚠ **Lỗi rất phổ biến.** Viết $\operatorname{Var}[2X] = 2 \cdot \operatorname{Var}[X]$. **SAI.** Đúng là $\operatorname{Var}[2X] = 4 \cdot \operatorname{Var}[X]$. Lý do: variance đo theo bình phương đơn vị, scale $a$ ảnh hưởng $a^2$.
>
> Tương ứng cho σ: $\sigma[aX] = |a| \cdot \sigma[X]$ (cùng đơn vị với X).

### 5.2. Var[X + Y] và covariance

$$\operatorname{Var}[X + Y] = \operatorname{Var}[X] + \operatorname{Var}[Y] + 2 \cdot \operatorname{Cov}(X, Y)$$

**Nếu X, Y độc lập** (hoặc tổng quát hơn: uncorrelated): $\operatorname{Cov} = 0$ → $\operatorname{Var}[X + Y] = \operatorname{Var}[X] + \operatorname{Var}[Y]$.

Chứng minh đầy đủ:

$$\begin{aligned}
\operatorname{Var}[X + Y] &= E[(X + Y - \mu_X - \mu_Y)^2] \\
&= E[((X - \mu_X) + (Y - \mu_Y))^2] \\
&= E[(X - \mu_X)^2 + (Y - \mu_Y)^2 + 2(X - \mu_X)(Y - \mu_Y)] \\
&= \operatorname{Var}[X] + \operatorname{Var}[Y] + 2 \cdot E[(X - \mu_X)(Y - \mu_Y)] \\
&= \operatorname{Var}[X] + \operatorname{Var}[Y] + 2 \cdot \operatorname{Cov}(X, Y)
\end{aligned}$$

### 5.3. Ví dụ thực hành

#### Tổng hai xúc xắc độc lập

$$\begin{aligned}
\operatorname{Var}[X + Y] &= \operatorname{Var}[X] + \operatorname{Var}[Y] = \frac{35}{12} + \frac{35}{12} = \frac{70}{12} \approx 5.833 \\
\sigma_{X+Y} &= \sqrt{\frac{70}{12}} \approx 2.415
\end{aligned}$$

#### Hiệu hai biến — Var[X - Y]

$X - Y = X + (-Y)$. Áp công thức:

$$\begin{aligned}
\operatorname{Var}[X - Y] &= \operatorname{Var}[X] + \operatorname{Var}[-Y] + 2 \cdot \operatorname{Cov}(X, -Y) \\
&= \operatorname{Var}[X] + \operatorname{Var}[Y] - 2 \cdot \operatorname{Cov}(X, Y)
\end{aligned}$$

Nếu độc lập: $\operatorname{Var}[X - Y] = \operatorname{Var}[X] + \operatorname{Var}[Y]$ — **vẫn cộng**, không trừ.

> ❓ **Câu hỏi tự nhiên: $\operatorname{Var}[X - Y]$ có thể âm không?** Không, không bao giờ. Variance theo định nghĩa là kỳ vọng của một bình phương ≥ 0. Nếu bạn ra số âm, đó là lỗi tính.

### 5.4. 📝 Tóm tắt mục 5

- $\operatorname{Var}[aX + b] = a^2 \cdot \operatorname{Var}[X]$. Đừng quên bình phương $a$.
- $\operatorname{Var}[X + Y] = \operatorname{Var}[X] + \operatorname{Var}[Y] + 2 \cdot \operatorname{Cov}$. Độc lập → bỏ Cov.
- $\operatorname{Var}[X - Y] = \operatorname{Var}[X] + \operatorname{Var}[Y] - 2 \cdot \operatorname{Cov}$. Vẫn không âm.

---

## 6. Độ lệch chuẩn (Standard Deviation)

$$\sigma[X] = \sqrt{\operatorname{Var}[X]}$$

**Tại sao cần thêm σ khi đã có Var?**

- $\operatorname{Var}$ có đơn vị **bình phương** của X. Nếu X là chiều cao tính bằng cm, $\operatorname{Var}$ có đơn vị cm². Không trực quan.
- σ cùng đơn vị với X — đọc được trực tiếp: "trung bình lệch khỏi mean khoảng σ".
- Trong phân phối chuẩn: 68% giá trị nằm trong $\mu \pm \sigma$, 95% trong $\mu \pm 2\sigma$, 99.7% trong $\mu \pm 3\sigma$.

### Ví dụ

- Xúc xắc: $\sigma \approx 1.708$ — giá trị trung bình lệch khỏi 3.5 khoảng 1.7.
- IQ chuẩn $N(100, 15^2)$: $\sigma = 15$, nghĩa là $[85, 115]$ chứa 68% dân số.

> 📝 **Tóm tắt mục 6.** $\sigma = \sqrt{\operatorname{Var}}$. Cùng đơn vị X. Là thước đo "tản" có ý nghĩa thực tế.

---

## 7. Covariance Cov(X, Y)

### 7.1. Trực giác

> 💡 **Trực giác.** Khi $X$ lớn, $Y$ có xu hướng cũng lớn hay nhỏ?
>
> - Cùng lớn / cùng nhỏ → **đồng biến** → Cov dương.
> - X lớn đi với Y nhỏ → **nghịch biến** → Cov âm.
> - Không có quan hệ tuyến tính → $\operatorname{Cov} \approx 0$.

### 7.2. Định nghĩa

$$\begin{aligned}
\operatorname{Cov}(X, Y) &= E[(X - \mu_X)(Y - \mu_Y)] \\
&= E[XY] - E[X] \cdot E[Y] \quad \text{(công thức thực hành)}
\end{aligned}$$

Chứng minh dạng thứ hai:

$$\begin{aligned}
E[(X - \mu_X)(Y - \mu_Y)] &= E[XY - \mu_X \cdot Y - X \cdot \mu_Y + \mu_X \cdot \mu_Y] \\
&= E[XY] - \mu_X \cdot E[Y] - \mu_Y \cdot E[X] + \mu_X \cdot \mu_Y \\
&= E[XY] - \mu_X \cdot \mu_Y - \mu_X \cdot \mu_Y + \mu_X \cdot \mu_Y \\
&= E[XY] - \mu_X \cdot \mu_Y
\end{aligned}$$

### 7.3. Tính chất

- $\operatorname{Cov}(X, X) = \operatorname{Var}[X]$.
- $\operatorname{Cov}(X, Y) = \operatorname{Cov}(Y, X)$ — đối xứng.
- Bilinear: $\operatorname{Cov}(aX + b, cY + d) = ac \cdot \operatorname{Cov}(X, Y)$ — hằng số bị triệt, scale nhân vào.
- $|\operatorname{Cov}(X, Y)| \le \sigma_X \cdot \sigma_Y$ (bất đẳng thức Cauchy-Schwarz).
- **Độc lập → $\operatorname{Cov} = 0$** (nhưng chiều ngược lại không đúng — xem 8.3).

### 7.4. Walk-through 3 ví dụ

#### Ví dụ 1 — X, Y độc lập

$X, Y \sim \text{Bernoulli}(0.5)$ độc lập. Tính $\operatorname{Cov}(X, Y)$.

$$\begin{aligned}
E[X] &= E[Y] = 0.5 \\
E[XY] &= P(X=1, Y=1) \cdot 1 \cdot 1 = 0.5 \cdot 0.5 = 0.25 \\
\operatorname{Cov}(X, Y) &= 0.25 - 0.5 \cdot 0.5 = 0
\end{aligned}$$

Như mong đợi.

#### Ví dụ 2 — Y = X (đồng biến hoàn hảo)

$$\operatorname{Cov}(X, X) = E[X^2] - (E[X])^2 = \operatorname{Var}[X]$$

#### Ví dụ 3 — Joint PMF cho 2 xúc xắc giả tạo

$X, Y \in \{1, 2, 3\}$ với joint PMF:

| X\Y | 1 | 2 | 3 |
|-----|-----|-----|-----|
| 1 | 0.25 | 0.05 | 0 |
| 2 | 0.05 | 0.20 | 0.05 |
| 3 | 0 | 0.05 | 0.25 |

Marginal: $P(X=1) = 0.3, P(X=2) = 0.3, P(X=3) = 0.3$. Đợi — tổng $0.9$. Để đúng tổng 1, sửa diagonal lên một chút. Lấy bảng dễ hơn:

| X\Y | 1 | 2 | 3 |
|-----|-----|-----|-----|
| 1 | 0.3 | 0.05 | 0 |
| 2 | 0.05 | 0.20 | 0.05 |
| 3 | 0 | 0.05 | 0.3 |

Tổng $= 0.3+0.05+0+0.05+0.2+0.05+0+0.05+0.3 = 1.0$ ✓.

Marginal X: $P(X=1) = 0.35, P(X=2) = 0.30, P(X=3) = 0.35$. Đối xứng → marginal Y giống hệt.

$$\begin{aligned}
E[X] &= 1 \cdot 0.35 + 2 \cdot 0.30 + 3 \cdot 0.35 = 0.35 + 0.6 + 1.05 = 2.0 \\
E[Y] &= 2.0
\end{aligned}$$

$$\begin{aligned}
E[XY] &= 1 \cdot 1 \cdot 0.3 + 1 \cdot 2 \cdot 0.05 + 1 \cdot 3 \cdot 0 + 2 \cdot 1 \cdot 0.05 + 2 \cdot 2 \cdot 0.20 + 2 \cdot 3 \cdot 0.05 \\
&\quad + 3 \cdot 1 \cdot 0 + 3 \cdot 2 \cdot 0.05 + 3 \cdot 3 \cdot 0.3 \\
&= 0.3 + 0.1 + 0 + 0.1 + 0.8 + 0.3 + 0 + 0.3 + 2.7 \\
&= 4.6 \\
\operatorname{Cov}(X, Y) &= 4.6 - 2.0 \cdot 2.0 = 0.6
\end{aligned}$$

Dương — đúng vì bảng tập trung khối lượng ở đường chéo $X = Y$ (đồng biến).

### 7.5. 📝 Tóm tắt mục 7

- Cov đo mức "đồng biến": dương = cùng tăng/giảm, âm = ngược.
- $\operatorname{Cov}(X, Y) = E[XY] - E[X]E[Y]$. Khi độc lập = 0.
- $\operatorname{Cov}(X, X) = \operatorname{Var}[X]$. Bilinear.

---

## 8. Hệ số tương quan ρ

### 8.1. Tại sao cần?

Covariance có đơn vị **đơn vị X · đơn vị Y** — không thể so sánh giữa các cặp khác đơn vị. Ví dụ: $\operatorname{Cov}(\text{chiều cao cm}, \text{cân nặng kg})$ và $\operatorname{Cov}(\text{chiều cao m}, \text{cân nặng kg})$ khác nhau bằng đúng tỉ lệ 100, dù cùng một dữ liệu.

Cần một số **không đơn vị**, **bị chặn**, để dùng phổ quát.

### 8.2. Định nghĩa và tính chất

$$\rho(X, Y) = \frac{\operatorname{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$

**Tính chất quan trọng:**

- $-1 \le \rho \le 1$ (suy từ Cauchy-Schwarz).
- $\rho = +1 \iff Y = aX + b$ với $a > 0$ (tuyến tính dương hoàn hảo).
- $\rho = -1 \iff Y = aX + b$ với $a < 0$.
- $\rho = 0 \iff$ **uncorrelated** (không có quan hệ **tuyến tính**) — không kéo theo độc lập!

Bằng số:

- $|\rho| > 0.7$ thường gọi là "tương quan mạnh".
- $0.3 < |\rho| < 0.7$ "trung bình".
- $|\rho| < 0.3$ "yếu".

### 8.3. ⚠ ρ = 0 không kéo theo độc lập

**Ví dụ phản chứng kinh điển.** $X \sim \text{Uniform}(-1, 1)$, $Y = X^2$.

$$\begin{aligned}
E[X] &= 0, \quad E[Y] = E[X^2] = \tfrac{1}{3} \quad (\text{đã tính cho Uniform(0,1), điều chỉnh}) \\
E[XY] &= E[X^3] = \int_{-1}^{1} x^3 \cdot \tfrac{1}{2}\,dx = 0 \quad (\text{hàm lẻ}) \\
\operatorname{Cov}(X, Y) &= 0 - 0 \cdot \tfrac{1}{3} = 0 \\
&\to \rho = 0
\end{aligned}$$

Nhưng $Y$ được xác định **hoàn toàn** bởi $X$ ($Y = X^2$) — chúng cực kỳ phụ thuộc!

**Bài học:** Cov và ρ chỉ bắt được quan hệ **tuyến tính**. Quan hệ phi tuyến (parabola, sin, exp) có thể có $\rho = 0$ mà vẫn rất phụ thuộc.

> ❓ **Câu hỏi tự nhiên: Vậy độc lập có suy ra ρ = 0 không?** Có. $X \perp Y \Rightarrow E[XY] = E[X]E[Y] \Rightarrow \operatorname{Cov} = 0 \Rightarrow \rho = 0$. Chiều ngược thì không, như ví dụ trên.
>
> **Một ngoại lệ quan trọng:** nếu $(X, Y)$ là **joint normal**, thì $\rho = 0 \iff X \perp Y$. Đây là một trong những lý do Gaussian đặc biệt.

### 8.4. 📝 Tóm tắt mục 8

- $\rho = \operatorname{Cov}$ chuẩn hóa, không đơn vị, $\in [-1, 1]$.
- $\rho = \pm 1 \iff$ tuyến tính hoàn hảo.
- $\rho = 0$ chỉ là uncorrelated, **không** kéo theo độc lập (trừ joint normal).

---

## 9. Covariance matrix Σ

### 9.1. Trực giác

> 💡 Khi có **nhiều** biến ngẫu nhiên $X_1, \dots, X_n$ cùng lúc (vector ngẫu nhiên $X \in \mathbb{R}^n$), ta cần một cách gọn để ghi:
>
> - Phương sai của mỗi $X_i$.
> - Covariance giữa mọi cặp $X_i, X_j$.
>
> → Đóng gói trong một ma trận $n \times n$.

### 9.2. Định nghĩa

Với $X = (X_1, \dots, X_n)^\mathsf{T}$ và $\mu = E[X] = (\mu_1, \dots, \mu_n)^\mathsf{T}$:

$$\Sigma = E[(X - \mu)(X - \mu)^\mathsf{T}]$$

Thành phần thứ $(i, j)$:

$$\Sigma_{ij} = \operatorname{Cov}(X_i, X_j)$$

Đặc biệt:

$$\Sigma_{ii} = \operatorname{Var}[X_i] \quad \text{(đường chéo = phương sai mỗi biến)}$$

### 9.3. Ví dụ — n = 2

$$\Sigma = \begin{bmatrix} \operatorname{Var}[X] & \operatorname{Cov}(X,Y) \\ \operatorname{Cov}(X,Y) & \operatorname{Var}[Y] \end{bmatrix}$$

Với $\operatorname{Var}[X] = 4, \operatorname{Var}[Y] = 9, \operatorname{Cov}(X, Y) = 3$:

$$\Sigma = \begin{bmatrix} 4 & 3 \\ 3 & 9 \end{bmatrix}$$

$\rho = 3 / (2 \cdot 3) = 0.5$.

### 9.4. Tính chất của Σ

#### 9.4.1. Đối xứng

$\Sigma_{ij} = \operatorname{Cov}(X_i, X_j) = \operatorname{Cov}(X_j, X_i) = \Sigma_{ji}$. Suy ra $\Sigma^\mathsf{T} = \Sigma$.

#### 9.4.2. Positive semi-definite (PSD)

$v^\mathsf{T} \Sigma v \ge 0$ với mọi $v \in \mathbb{R}^n$.

**Chứng minh:**

$$\begin{aligned}
v^\mathsf{T} \Sigma v &= v^\mathsf{T} E[(X-\mu)(X-\mu)^\mathsf{T}] v \\
&= E[v^\mathsf{T}(X-\mu)(X-\mu)^\mathsf{T}v] \\
&= E[((X-\mu)^\mathsf{T}v)^2] \\
&\ge 0 \quad \text{(kỳ vọng của một bình phương)}
\end{aligned}$$

Hệ quả: mọi eigenvalue của $\Sigma \ge 0$.

> ❓ **Khi nào Σ là positive definite (strict, không "semi")?** Khi không có hướng nào mà phương sai bằng 0 — tương đương $\det \Sigma > 0$. Ví dụ: nếu một biến là tổ hợp tuyến tính của các biến khác (collinear), thì có hướng mà phương sai = 0 → Σ chỉ PSD, không PD.

### 9.5. Ví dụ tính eigenvalue (n = 2)

$$\Sigma = \begin{bmatrix} 4 & 3 \\ 3 & 9 \end{bmatrix}$$

$$\begin{aligned}
\det(\Sigma - \lambda I) &= (4 - \lambda)(9 - \lambda) - 9 = \lambda^2 - 13\lambda + 27 = 0 \\
\lambda &= \frac{13 \pm \sqrt{169 - 108}}{2} = \frac{13 \pm \sqrt{61}}{2} \\
\lambda_1 &\approx 10.405, \quad \lambda_2 \approx 2.595 \quad \text{— cả hai} > 0, \Sigma \text{ là PD.}
\end{aligned}$$

### 9.6. Liên hệ Tầng 4 — PCA

> 💡 **Bridge tới PCA.** PCA (Principal Component Analysis) bắt đầu bằng cách:
>
> 1. Lấy ma trận dữ liệu, trừ mean từng feature.
> 2. Tính ma trận covariance mẫu $\hat{\Sigma} = \frac{1}{N} X^\mathsf{T} X$.
> 3. Eigen-decompose $\hat{\Sigma} = V \Lambda V^\mathsf{T}$.
> 4. Eigenvector ứng với eigenvalue lớn nhất = "hướng phương sai lớn nhất" = principal component đầu tiên.
>
> Sẽ học chi tiết ở [Tầng 4 — Linear Algebra Lesson 08](../../04-LinearAlgebra/lesson-08-pca/) (nếu chưa có thì coi như mục tiếp theo cần học).

### 9.7. 📝 Tóm tắt mục 9

- $\Sigma_{ij} = \operatorname{Cov}(X_i, X_j)$. Đường chéo = variance.
- Đối xứng và PSD. Eigenvalue $\ge 0$.
- Nền tảng cho PCA, Gaussian đa biến, Kalman filter.

---

## 10. Liên hệ ML

### 10.1. MSE loss và variance của residuals

Cho dataset $\{(x_i, y_i)\}$ và model dự đoán $\hat{y}_i = f(x_i)$. Residual $r_i = y_i - \hat{y}_i$.

$$\text{MSE} = \frac{1}{N} \sum_i r_i^2 = \frac{1}{N} \sum_i (y_i - \hat{y}_i)^2$$

Nếu model được fit để $\text{mean}(r_i) = 0$ (true cho linear regression với intercept), thì:

$$\text{MSE} = \frac{1}{N} \sum (r_i - 0)^2 = \text{sample variance of residuals}$$

Tức là **train với MSE = minimize phương sai của sai số**. Đó là lý do MSE rất tự nhiên dưới giả thuyết Gaussian noise.

### 10.2. Bias-variance tradeoff

$$E[(\hat{y} - y)^2] = \text{Bias}^2 + \text{Variance} + \text{Irreducible noise}$$

Trong đó:

- **Bias** $= E[\hat{y}] - y$ — model "trung bình" có lệch khỏi sự thật bao nhiêu (underfit).
- **Variance** $= \operatorname{Var}[\hat{y}]$ — model thay đổi cỡ nào khi đổi tập train (overfit).
- **Irreducible noise** $= \operatorname{Var}[\text{noise}]$ — không thể giảm bằng model tốt hơn.

Tradeoff: model phức tạp → bias thấp + variance cao; model đơn giản → bias cao + variance thấp. Mục tiêu là tổng $\text{Bias}^2 + \text{Variance}$ nhỏ nhất.

### 10.3. PCA và covariance matrix

Như đã nói mục 9.6: PCA = eigen-decomposition của Σ. Eigenvalue lớn nhất → hướng có phương sai lớn nhất → "thông tin nhiều nhất" → giữ lại để giảm chiều.

### 10.4. Gaussian đa biến

$$X \sim N(\mu, \Sigma)$$

PDF có dạng $\exp\left(-\tfrac{1}{2}(x - \mu)^\mathsf{T} \Sigma^{-1} (x - \mu)\right)$. $\Sigma^{-1}$ gọi là **precision matrix**, đóng vai trò trong nhiều thuật toán (Gaussian Process, Kalman filter).

> 📝 **Tóm tắt mục 10.** MSE ≈ variance of residuals. $\text{Bias}^2 + \text{Variance}$ là phân rã sai số. PCA cần Σ. Gaussian đa biến cần $\Sigma^{-1}$.

---

## 11. ❓ Q&A — câu hỏi tự nhiên

### Q1. E[XY] ≠ E[X]·E[Y] khi nào?

Khi $\operatorname{Cov}(X, Y) \ne 0$. Cụ thể:

$$E[XY] = E[X] \cdot E[Y] + \operatorname{Cov}(X, Y)$$

Nếu X, Y độc lập thì $\operatorname{Cov} = 0$ và đẳng thức trở thành $E[XY] = E[X]E[Y]$. Ngược lại không.

### Q2. Var[X - Y] có thể nhỏ hơn 0 không?

**Không.** Variance theo định nghĩa là kỳ vọng của bình phương ≥ 0. Nếu tính ra số âm → lỗi tính.

### Q3. Tại sao dùng bình phương trong Var thay vì trị tuyệt đối?

- **Toán học**: bình phương khả vi mượt, dễ làm giải tích, dễ ráp vào MLE.
- **Thống kê**: với Gaussian noise, MLE = least squares = MSE. Không có "mean absolute error MLE" trừ khi noise là Laplace.
- **Hình học**: variance ↔ độ dài bình phương trong không gian $L^2$ → quan hệ rõ với Pythagore và orthogonality.

### Q4. Σ luôn có inverse?

**Không.** Σ là PSD, có thể có eigenvalue = 0 (singular). Khi nào singular?

- Khi tồn tại tổ hợp tuyến tính của các biến có phương sai = 0 (collinear).
- Trong thực tế: dữ liệu có ít sample hơn chiều ($N < n$) → sample $\hat{\Sigma}$ chắc chắn singular.

Giải pháp: regularize, $\hat{\Sigma} + \lambda I$ để đảm bảo invertible.

### Q5. Nếu hai biến không độc lập nhưng ρ = 0, sao phát hiện được?

- Vẽ scatter plot — quan hệ phi tuyến nhìn ra ngay.
- Dùng "distance correlation" hoặc "mutual information" — bắt được quan hệ phi tuyến.
- Test phi tham số (Spearman, Kendall) cho monotonic relationships.

---

## 12. ⚠ Lỗi thường gặp tổng hợp

1. **$\operatorname{Var}[2X] = 2 \cdot \operatorname{Var}[X]$** — SAI, đúng là $4 \cdot \operatorname{Var}[X]$.
2. **$E[g(X)] = g(E[X])$** — SAI nói chung, đúng chỉ khi $g$ tuyến tính.
3. **$E[XY] = E[X] \cdot E[Y]$** — chỉ đúng khi độc lập.
4. **"ρ = 0 nghĩa là độc lập"** — SAI, chỉ là uncorrelated. Phản chứng: $Y = X^2$.
5. **"Var có cùng đơn vị X"** — SAI. Đó là σ. Var có đơn vị bình phương.
6. **"Σ luôn invertible"** — SAI khi singular.
7. **Nhầm Var/SD trong báo cáo** — đọc kỹ tài liệu.
8. **"Hai biến cùng dấu thì ρ > 0"** — phát biểu mập mờ. Đúng phải nói "đồng biến": khi X trên mean thì Y cũng có xu hướng trên mean.

---

## 13. Bài tập thực hành

### Bài 1

Một xúc xắc 8 mặt đều. Tính $E[X]$, $\operatorname{Var}[X]$, $\sigma$.

### Bài 2

$X \sim \text{Binomial}(10, 0.4)$. Tính $E[X]$, $\operatorname{Var}[X]$.

### Bài 3

Cho $X \sim \text{Uniform}(2, 8)$. $Y = 3X - 5$. Tính $E[Y]$ và $\operatorname{Var}[Y]$.

### Bài 4

$X, Y$ độc lập, $\operatorname{Var}[X] = 4, \operatorname{Var}[Y] = 9$. Tính:
- $\operatorname{Var}[X + Y]$
- $\operatorname{Var}[X - Y]$
- $\operatorname{Var}[2X - 3Y]$

### Bài 5

Joint PMF của $(X, Y)$ với $X, Y \in \{0, 1\}$:

| X\Y | 0 | 1 |
|-----|---|---|
| 0 | 0.4 | 0.1 |
| 1 | 0.2 | 0.3 |

Tính $\operatorname{Cov}(X, Y)$ và $\rho(X, Y)$.

### Bài 6

Cho covariance matrix:

$$\Sigma = \begin{bmatrix} 2 & 1 & 0 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{bmatrix}$$

- Kiểm tra Σ có symmetric không.
- Tính eigenvalue. Σ có PD không?
- $\operatorname{Cov}(X_1, X_3)$ bằng bao nhiêu? Hai biến này có uncorrelated không?

---

## 14. Lời giải chi tiết

### Lời giải Bài 1

$X \in \{1, 2, \dots, 8\}$, mỗi giá trị xác suất $1/8$.

$$\begin{aligned}
E[X] &= \frac{1+2+3+4+5+6+7+8}{8} = \frac{36}{8} = 4.5 \\
E[X^2] &= \frac{1+4+9+16+25+36+49+64}{8} = \frac{204}{8} = 25.5 \\
\operatorname{Var}[X] &= 25.5 - 4.5^2 = 25.5 - 20.25 = 5.25 = \frac{21}{4} \\
\sigma &= \sqrt{5.25} \approx 2.291
\end{aligned}$$

**Verify nhanh:** với xúc xắc đều $n$ mặt, có công thức $\operatorname{Var} = (n^2 - 1)/12$. Với $n = 8$: $(64-1)/12 = 63/12 = 5.25$. ✓

### Lời giải Bài 2

Binomial(n, p): $E[X] = np, \operatorname{Var}[X] = np(1-p)$.

$$\begin{aligned}
E[X] &= 10 \cdot 0.4 = 4 \\
\operatorname{Var}[X] &= 10 \cdot 0.4 \cdot 0.6 = 2.4 \\
\sigma &= \sqrt{2.4} \approx 1.549
\end{aligned}$$

### Lời giải Bài 3

$X \sim \text{Uniform}(2, 8)$:

$$\begin{aligned}
E[X] &= \frac{2+8}{2} = 5 \\
\operatorname{Var}[X] &= \frac{(8-2)^2}{12} = \frac{36}{12} = 3
\end{aligned}$$

$Y = 3X - 5$:

$$\begin{aligned}
E[Y] &= 3 \cdot 5 - 5 = 10 \\
\operatorname{Var}[Y] &= 3^2 \cdot \operatorname{Var}[X] = 9 \cdot 3 = 27 \\
\sigma_Y &= \sqrt{27} \approx 5.196
\end{aligned}$$

### Lời giải Bài 4

Vì độc lập nên $\operatorname{Cov} = 0$.

$$\begin{aligned}
\operatorname{Var}[X + Y] &= \operatorname{Var}[X] + \operatorname{Var}[Y] = 4 + 9 = 13 \\
\operatorname{Var}[X - Y] &= \operatorname{Var}[X] + \operatorname{Var}[Y] = 4 + 9 = 13 \quad \text{(CŨNG là cộng!)} \\
\operatorname{Var}[2X - 3Y] &= 4 \cdot \operatorname{Var}[X] + 9 \cdot \operatorname{Var}[Y] = 4 \cdot 4 + 9 \cdot 9 = 16 + 81 = 97
\end{aligned}$$

### Lời giải Bài 5

Marginal:
- $P(X=0) = 0.4 + 0.1 = 0.5$, $P(X=1) = 0.5$.
- $P(Y=0) = 0.4 + 0.2 = 0.6$, $P(Y=1) = 0.4$.

$$\begin{aligned}
E[X] &= 0 \cdot 0.5 + 1 \cdot 0.5 = 0.5 \\
E[Y] &= 0 \cdot 0.6 + 1 \cdot 0.4 = 0.4 \\
E[XY] &= 0 \cdot 0 \cdot 0.4 + 0 \cdot 1 \cdot 0.1 + 1 \cdot 0 \cdot 0.2 + 1 \cdot 1 \cdot 0.3 = 0.3 \\[4pt]
\operatorname{Cov}(X, Y) &= 0.3 - 0.5 \cdot 0.4 = 0.3 - 0.2 = 0.1 \\[4pt]
\operatorname{Var}[X] &= E[X^2] - (E[X])^2 = 0.5 - 0.25 = 0.25 \quad (\text{Bernoulli(0.5): } 0.5 \cdot 0.5) \\
\operatorname{Var}[Y] &= 0.4 \cdot 0.6 = 0.24 \\[4pt]
\sigma_X &= 0.5, \quad \sigma_Y = \sqrt{0.24} \approx 0.4899 \\[4pt]
\rho &= \frac{0.1}{0.5 \cdot 0.4899} \approx 0.408
\end{aligned}$$

**Diễn giải:** ρ ≈ 0.41 — tương quan dương vừa phải. Nhìn bảng cũng thấy: khối lượng tập trung ở $(0,0)$ và $(1,1)$.

### Lời giải Bài 6

**Symmetric?**

$\Sigma_{12} = 1 = \Sigma_{21}$, $\Sigma_{13} = 0 = \Sigma_{31}$, $\Sigma_{23} = 1 = \Sigma_{32}$. ✓ Đối xứng.

**Eigenvalue:**

$$\det(\Sigma - \lambda I) = \det\begin{bmatrix} 2-\lambda & 1 & 0 \\ 1 & 2-\lambda & 1 \\ 0 & 1 & 2-\lambda \end{bmatrix}$$

Khai triển theo hàng 1:

$$\begin{aligned}
&= (2-\lambda) \cdot \det\begin{bmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{bmatrix} - 1 \cdot \det\begin{bmatrix} 1 & 1 \\ 0 & 2-\lambda \end{bmatrix} + 0 \\
&= (2-\lambda) \cdot ((2-\lambda)^2 - 1) - (2-\lambda) \\
&= (2-\lambda) \cdot [(2-\lambda)^2 - 1 - 1] \\
&= (2-\lambda) \cdot [(2-\lambda)^2 - 2]
\end{aligned}$$

Cho bằng 0:

- $\lambda = 2$
- $(2-\lambda)^2 = 2 \Rightarrow 2 - \lambda = \pm\sqrt{2} \Rightarrow \lambda = 2 \pm \sqrt{2}$

Vậy ba eigenvalue: $\lambda_1 = 2 + \sqrt{2} \approx 3.414$, $\lambda_2 = 2$, $\lambda_3 = 2 - \sqrt{2} \approx 0.586$. Tất cả > 0 → Σ là **positive definite**.

**$\operatorname{Cov}(X_1, X_3)$:** từ ma trận $= \Sigma_{13} = 0$. Vậy $X_1$ và $X_3$ **uncorrelated**. Nhưng có độc lập không thì không kết luận được chỉ từ Σ (cần joint distribution). Tuy nhiên nếu $(X_1, X_2, X_3)$ joint normal thì $\rho = 0 \iff$ độc lập → trong trường hợp đó $X_1 \perp X_3$.

---

## 15. Liên kết tiếp theo

- [Lesson 07 — Maximum Likelihood Estimation](../lesson-07-mle/): dùng $E$ và $\operatorname{Var}$ để chứng minh MLE là estimator hợp lý.
- [Lesson 08 — Cross-entropy và KL divergence](../lesson-08-cross-entropy-kl/): các "khoảng cách" giữa phân phối, dẫn loss của classification.
- [Tầng 4 — Linear Algebra Lesson 08 — PCA](../../04-LinearAlgebra/lesson-08-pca/): eigen-decompose covariance matrix.
- [Visualization](./visualization.html): 4 component tương tác (E[X]+Var, linearity, correlation, Σ matrix viewer).
