# Lesson 07 — Maximum Likelihood Estimation (MLE)

> **Tầng 5 — Probability · Bài 7/8**
>
> *Cho data, đoán tham số. Đoán sao cho "data quan sát có khả năng nhất". Đây là cách ML chọn weights — không phải bằng phép màu, mà bằng MLE.*

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phân biệt được **xác suất (probability)** và **likelihood** — cùng công thức, khác cách đọc.
2. Hiểu **MLE = $\arg\max_\theta L(\theta)$** là gì, vì sao đó là cách hợp lý để ước lượng tham số.
3. Biết vì sao luôn dùng **log-likelihood** thay cho likelihood (numerical + đạo hàm).
4. Tự dẫn được **MLE cho Bernoulli** → ra $\hat{p} = k/n$.
5. Tự dẫn được **MLE cho Gaussian** → ra $\hat{\mu} = \text{trung bình}$, $\hat{\sigma}^2 = \text{trung bình bình phương lệch}$.
6. Hiểu **linear regression** là MLE dưới giả định **Gaussian noise** → giải thích vì sao loss = MSE.
7. Preview **cross-entropy** (Lesson 08): negative log-likelihood của classification.
8. Phân biệt **MLE vs MAP**: thêm prior thì MLE biến thành MAP.

---

## Kiến thức tiền đề

Bài này gọi lại nhiều thứ từ các lesson trước. Nếu thiếu bài nào, đọc lại trước khi đi tiếp:

- [Lesson 05 — Phân phối chuẩn (Gaussian)](../lesson-05-normal-distribution/) — biết PDF Gaussian, hiểu $\mu$ và $\sigma^2$.
- [Lesson 06 — Kỳ vọng, phương sai, covariance](../lesson-06-expectation-variance/) — biết $E[X]$, $\text{Var}[X]$, tính ước lượng từ mẫu.
- [Calculus L5 — Tối ưu 1 biến](../../03-Calculus/lesson-05-optimization-1d/) — tìm cực trị bằng $f'(x) = 0$.
- [Calculus L7 — Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) — khi không giải kín được, dùng GD.

Ngoài ra cần nhẹ:

- Log: $\log(a \cdot b) = \log a + \log b$, $\log a^k = k \log a$, log đơn điệu tăng → argmax giữ nguyên.
- Đạo hàm riêng (Calculus L6) khi MLE có $\geq 2$ tham số (vd Gaussian: $\mu$ và $\sigma^2$).

---

## 1. Bài toán: từ data ngược về tham số

### 💡 Trực giác

Cho tới giờ chúng ta học **theo chiều xuôi**: cho phân phối có tham số đã biết → tính xác suất quan sát một mẫu nào đó.

Vd Lesson 05: cho $X \sim N(0, 1)$, tính $P(X > 1.5)$.

**Đời thực ngược lại**: chúng ta có data, **không biết tham số**, phải đoán.

- Tung 1 đồng xu lạ 100 lần, ra 63 mặt ngửa. **Xác suất ngửa $p$ của xu này là bao nhiêu?**
- Đo 50 người: chiều cao trung bình mẫu 168cm, độ lệch chuẩn mẫu 7cm. **Phân phối chiều cao của toàn dân số là $N(\mu, \sigma^2)$ với $\mu, \sigma^2$ là gì?**
- Có 1000 cặp $(x, y)$: vé số bán được theo nhiệt độ. **Hàm tuyến tính $y = wx + b$ nào fit nhất?**

Cả 3 bài toán đều có chung khung:

> Cho **data quan sát được** $x_1, \dots, x_n$, giả định chúng sinh ra từ phân phối có **tham số ẩn $\theta$**. Hãy ước lượng $\theta$.

### Phát biểu hình thức

- **Model**: chọn một họ phân phối với tham số $\theta$. Vd $\text{Bernoulli}(p)$, $\text{Gaussian}(\mu, \sigma^2)$, $\text{Poisson}(\lambda)$.
- **Data**: $x_1, \dots, x_n$ quan sát được, giả định **i.i.d.** (independent and identically distributed — độc lập, cùng phân phối) từ model.
- **Mục tiêu**: tìm $\hat{\theta}$ "tốt nhất" giải thích data.

"Tốt nhất" có nhiều nghĩa. MLE chọn nghĩa **"làm data quan sát có xác suất xảy ra cao nhất"**.

### ❓ Câu hỏi tự nhiên của người đọc

> "Tham số ẩn" nghĩa là gì? Tại sao không đo trực tiếp?

Tham số đặc trưng cho **toàn bộ dân số / cơ chế sinh data**, không phải cho 1 mẫu. Vd $\mu$ của chiều cao là kỳ vọng cho toàn dân Việt Nam — bạn không thể đo từng người. Cái bạn đo được là **mẫu hữu hạn**, và bạn dùng mẫu để **suy luận về tham số**.

> i.i.d. nghĩa là sao? Khi nào KHÔNG i.i.d.?

- **Independent**: data point này không ảnh hưởng data khác.
- **Identically distributed**: tất cả cùng đến từ một phân phối.

KHÔNG i.i.d. ví dụ: lấy 10 mẫu từ Hà Nội rồi 10 mẫu từ TP.HCM — 2 dân số khác nhau, không "identically distributed". Hoặc time-series: giá cổ phiếu hôm nay phụ thuộc hôm qua → không independent.

i.i.d. là giả định **đơn giản nhưng mạnh**. Khi không đúng, MLE vẫn áp dụng được nhưng phải đổi công thức.

### 📝 Tóm tắt mục 1

- Đời thực: có data, không biết tham số → phải **ước lượng**.
- Khung MLE: chọn họ phân phối có tham số $\theta$, giả định data i.i.d., tìm $\theta$ "tốt nhất".
- "Tốt nhất" theo MLE = data quan sát có xác suất xảy ra cao nhất.

---

## 2. Likelihood — cùng công thức, đọc ngược

### 💡 Trực giác

Nhìn vào công thức $P(x \mid \theta)$:

- **Cách đọc "xác suất"** (probability): cố định $\theta$, $x$ là biến. Hỏi "với tham số này, sample sẽ trông thế nào?".
- **Cách đọc "likelihood"** (khả năng): cố định $x$ (data đã quan sát), $\theta$ là biến. Hỏi "với data này, tham số nào hợp lý?".

Cùng công thức, cùng số. Khác cách nhìn.

### Định nghĩa

Cho data đã quan sát $x_1, \dots, x_n$, **likelihood function** là:

$$L(\theta; x_1, \dots, x_n) = P(x_1, \dots, x_n \mid \theta)$$

Nếu data i.i.d.:

$$L(\theta) = P(x_1 \mid \theta) \cdot P(x_2 \mid \theta) \cdots P(x_n \mid \theta) = \prod_i P(x_i \mid \theta)$$

(Tích các xác suất vì independent.)

### Ví dụ số: đồng xu

Tung xu 5 lần được $\text{data} = (H, H, T, H, T)$ (H = ngửa, T = sấp). Giả định mô hình $\text{Bernoulli}(p)$.

$$\begin{aligned}
L(p) &= P(H \mid p) \cdot P(H \mid p) \cdot P(T \mid p) \cdot P(H \mid p) \cdot P(T \mid p) \\
     &= p \cdot p \cdot (1-p) \cdot p \cdot (1-p) \\
     &= p^3 \cdot (1-p)^2
\end{aligned}$$

Đây là **hàm của $p$** (data đã cố định).

Thử vài giá trị:

| $p$   | $p^3$        | $(1-p)^2$    | $L(p) = p^3(1-p)^2$ |
|-----|-----------|-----------|------------------|
| 0.1 | 0.001     | 0.81      | 0.000810 |
| 0.3 | 0.027     | 0.49      | 0.013230 |
| 0.5 | 0.125     | 0.25      | 0.031250 |
| **0.6** | **0.216** | **0.16** | **0.034560** ← cực đại |
| 0.7 | 0.343     | 0.09      | 0.030870 |
| 0.9 | 0.729     | 0.01      | 0.007290 |

**$p = 0.6$ cho $L$ lớn nhất.** Trong 5 lần có 3 ngửa → tỷ lệ ngửa = $3/5 = 0.6$. MLE trùng với "trung bình mẫu" — không phải tình cờ, mục 6 sẽ chứng minh.

### ⚠ Lỗi thường gặp

- **Nhầm $L$ với phân phối xác suất của $\theta$**. $L(\theta)$ KHÔNG phải PDF/PMF — nó không cần tích phân/tổng = 1. Vd thử $\int L(p) \, dp$ cho ví dụ trên $\neq 1$.
- **Nhầm $L$ với $P(\theta \mid \text{data})$**. Đó là posterior (Bayesian), khác $L$. Posterior $= L \cdot \text{prior} / \text{evidence}$. Mục 10 nói rõ.
- **Quên giả định i.i.d.** rồi vẫn nhân các $P$ lại. Nếu data không độc lập, $L = P(x_1, \dots, x_n \mid \theta)$ KHÔNG bằng tích.

### ❓ Câu hỏi tự nhiên

> Cho phân phối liên tục, $P(x_i \mid \theta) = 0$ chứ?

Đúng — với phân phối liên tục, dùng PDF $f(x_i \mid \theta)$ thay cho PMF. Likelihood liên tục:

$$L(\theta) = \prod_i f(x_i \mid \theta)$$

Vd Gaussian: $f(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \cdot \exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$. Likelihood là tích các giá trị PDF, không phải xác suất chính xác. Vẫn dùng được, miễn argmax (xem mục 5 lý do log).

> $L(\theta)$ thường rất bé. Vd $0.5^{100} \approx 7.9 \cdot 10^{-31}$. Vậy sao máy tính được?

Đó chính là lý do **dùng log-likelihood**. Mục 5.

### 📝 Tóm tắt mục 2

- Likelihood = cùng công thức $P(\text{data} \mid \theta)$, nhưng cố định data, biến $\theta$.
- i.i.d. → $L(\theta) = \prod P(x_i \mid \theta)$.
- $L$ KHÔNG phải phân phối xác suất của $\theta$. Đừng nhầm.

---

## 3. MLE — chọn θ làm L cực đại

### 💡 Trực giác

Có rất nhiều giá trị $\theta$ giải thích được data, mỗi giá trị có "khả năng" khác nhau. MLE chọn giá trị **làm khả năng cao nhất**:

$$\hat{\theta}_{MLE} = \arg\max_\theta L(\theta)$$

Đọc là "$\hat{\theta}$ MLE bằng $\theta$ nào tối đa hóa $L(\theta)$".

### Cách tìm

Bài toán argmax. Có 2 cách:

1. **Closed-form** (giải kín): giải $\frac{dL}{d\theta} = 0$, kiểm điểm cực đại. Áp dụng cho Bernoulli, Gaussian, Poisson, Exponential, linear regression Gaussian.
2. **Numerical** (số): không giải được kín thì dùng [gradient descent](../../03-Calculus/lesson-07-gradient-descent/) trên $-\log L$ (vì GD minimize, không maximize). Áp dụng cho neural network, logistic regression, GMM với nhiều thành phần.

### Ví dụ số: xu đầu mục 2

$L(p) = p^3(1-p)^2$. Tìm argmax bằng đạo hàm:

$$\begin{aligned}
\frac{dL}{dp} &= 3p^2(1-p)^2 + p^3 \cdot 2(1-p) \cdot (-1) \\
      &= p^2(1-p) \cdot [3(1-p) - 2p] \\
      &= p^2(1-p) \cdot (3 - 5p)
\end{aligned}$$

$\frac{dL}{dp} = 0 \iff p = 0$ hoặc $p = 1$ hoặc $p = 3/5 = 0.6$.

- $p = 0$: $L = 0$ (cực tiểu).
- $p = 1$: $L = 0$ (cực tiểu).
- $p = 0.6$: $L = 0.034560$ (cực đại).

→ **$\hat{p}_{MLE} = 0.6 = 3/5 = k/n$** với $k = 3$ ngửa, $n = 5$ lần tung. Khớp trực giác.

### ❓ Câu hỏi tự nhiên

> Nếu $k = 0$ (toàn sấp)? $\hat{p} = 0$ nghĩa là "xu không bao giờ ngửa"?

Đúng theo MLE. Nhưng đó là **chỉ dấu MLE bị overfit khi data ít** — 5 lần toàn sấp chưa đủ để khẳng định $p = 0$. MAP (mục 10) hoặc thêm prior khắc phục.

> Có khi nào $L(\theta)$ không có max?

Có. Vd $\text{Uniform}[0, b]$ với data: $L(b) = (1/b)^n$ cho $b \geq \max(x_i)$, $0$ nếu nhỏ hơn. Max tại $\hat{b} = \max(x_i)$, là điểm biên — KHÔNG tìm bằng $\frac{dL}{db} = 0$. Phải xét miền xác định.

### 📝 Tóm tắt mục 3

- $\hat{\theta}_{MLE} = \arg\max_\theta L(\theta)$.
- Cách giải: closed-form (đạo hàm = 0) khi được, GD khi không.
- Coi chừng cực tiểu / điểm biên / nghiệm không xác định.

---

## 4. Bước nhỏ: xem tận mắt argmax = giá trị nào

Trước khi đi qua đại số tổng quát, hãy "nhìn" $L(p)$ cho data đồng xu thực sự:

$\text{data} = (H, T, H, H, H, T, T, H, H, T)$ → $n = 10$, $k = 6$ ngửa.

$L(p) = p^6 \cdot (1-p)^4$.

| $p$   | $L(p)$            | $\log L(p)$ |
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

Cực đại tại $p = 0.6 = k/n = 6/10$. Cả $L$ lẫn $\log L$ đỉnh ở cùng điểm — log đơn điệu, không thay đổi argmax.

**Quan sát quan trọng**: $L(p)$ cực bé (mức $10^{-3}$ đến $10^{-14}$). Với data $n = 100$, $L$ bé tới mức $10^{-30}$ — vượt khả năng `float64`. Đó là lý do mục 5.

---

## 5. Log-likelihood — bí kíp tính

### 💡 Trực giác

Nhân nhiều số nhỏ → bùng số (underflow). Lấy log:

- Tích → tổng: $\log(a \cdot b) = \log a + \log b$.
- $\log L = \log \prod_i P(x_i \mid \theta) = \sum_i \log P(x_i \mid \theta)$.
- Tổng dễ chịu hơn tích nhiều.
- Đạo hàm tổng dễ hơn đạo hàm tích (không cần product rule).

### Định nghĩa

$$\ell(\theta) \equiv \log L(\theta) = \sum_i \log P(x_i \mid \theta)$$

Vì log đơn điệu tăng:

$$\arg\max_\theta L(\theta) = \arg\max_\theta \ell(\theta)$$

→ Cứ tối đa hóa $\ell$ thoải mái, kết quả không đổi.

### Verify cả 2 vế cho ví dụ xu

$L(0.6) = 0.6^3 \cdot 0.4^2 = 0.216 \cdot 0.16 = 0.034560$ ($n=5$, $k=3$).

$\log L(0.6) = 3 \cdot \log(0.6) + 2 \cdot \log(0.4)$

Dùng $\log$ tự nhiên ($\ln$): $\ln(0.6) \approx -0.5108$, $\ln(0.4) \approx -0.9163$.

$\ell(0.6) = 3 \cdot (-0.5108) + 2 \cdot (-0.9163) = -1.5324 + (-1.8326) = -3.3650$.

Check: $\exp(-3.3650) \approx 0.03455$ ✓ (làm tròn).

### Đạo hàm log L cho xu

Cùng ví dụ $n=5$, $k=3$:

$$\begin{aligned}
\ell(p) &= 3 \cdot \log p + 2 \cdot \log(1-p) \\
\frac{d\ell}{dp} &= \frac{3}{p} - \frac{2}{1-p}
\end{aligned}$$

Đặt = 0:

$$\begin{aligned}
\frac{3}{p} &= \frac{2}{1-p} \\
3(1-p) &= 2p \\
3 - 3p &= 2p \\
3 &= 5p \\
\hat{p} &= 3/5 = 0.6 \quad ✓
\end{aligned}$$

Cùng kết quả, đại số **gọn hơn nhiều** so với đạo hàm trực tiếp $L$ (đã làm ở mục 3).

### ⚠ Lỗi thường gặp

- **Dùng $L$ thay $\ell$ trong code**: với $n$ vừa lớn (~30), $L$ underflow → $0.0$ → $\log L = -\infty$ → vô dụng. **Luôn dùng log probability ngay từ đầu** trong code ML.
- **Quên $\log(1-p)$ khi $p$ quá gần 1**: gây $\log(0)$. Trong code, `clip(p, ε, 1-ε)` trước khi log. Tương tự $\log(p)$ khi $p \approx 0$.
- **Lẫn log tự nhiên ($\ln$) và log cơ số 10**: argmax không đổi nhưng giá trị $\ell$ khác. ML chuẩn dùng **$\ln$**.

### ❓ Câu hỏi tự nhiên

> $L$ có thể âm không?

Không — $L$ = product của xác suất $\in [0, 1]$ (rời rạc), hoặc PDF $\geq 0$ (liên tục). $L \geq 0$.

> $\ell$ có thể dương không?

Có. Với PDF (liên tục), PDF có thể $> 1$ (vd Gaussian $\sigma$ nhỏ tại đỉnh), nên $\log f$ có thể $> 0$. $\ell$ tổng có thể dương hoặc âm.

> Nếu $L(p)$ chứa các tham số ràng buộc (vd $p \in [0,1]$)?

Tìm argmax trong miền hợp lệ. Nghiệm $\frac{d\ell}{dp} = 0$ ở ngoài miền → check biên.

### 📝 Tóm tắt mục 5

- $\ell(\theta) = \log L(\theta) = \sum \log P(x_i \mid \theta)$.
- $\arg\max L = \arg\max \ell$ (log đơn điệu).
- Lý do bắt buộc dùng $\ell$: numerical stability + đạo hàm gọn.
- Code: luôn `log_prob` chứ không `prob` rồi log.

---

## 6. MLE cho Bernoulli — `p̂ = k/n`

### Setup

- Mô hình: $X_i \sim \text{Bernoulli}(p)$ (xu có xác suất ngửa $= p$, đại lượng cần ước lượng).
- Data: $n$ lần tung, $k$ lần ngửa, $n-k$ lần sấp.
- PMF: $P(x \mid p) = p^x \cdot (1-p)^{1-x}$ với $x \in \{0, 1\}$.

### Likelihood

$$\begin{aligned}
L(p) &= \prod_i P(x_i \mid p) = \prod_i p^{x_i} \cdot (1-p)^{1-x_i} \\
     &= p^{\sum x_i} \cdot (1-p)^{n - \sum x_i} \\
     &= p^k \cdot (1-p)^{n-k}
\end{aligned}$$

($\sum x_i = k$ vì các $x_i$ là 0/1.)

### Log-likelihood

$$\ell(p) = k \cdot \log p + (n-k) \cdot \log(1-p)$$

### Đạo hàm và giải

$$\frac{d\ell}{dp} = \frac{k}{p} - \frac{n-k}{1-p}$$

Đặt = 0:

$$\begin{aligned}
\frac{k}{p} &= \frac{n-k}{1-p} \\
k(1-p) &= p(n-k) \\
k - kp &= pn - pk \\
k &= pn \\
\hat{p}_{MLE} &= k/n
\end{aligned}$$

### Kiểm tra cực đại (không phải cực tiểu)

Đạo hàm cấp 2:

$$\frac{d^2\ell}{dp^2} = -\frac{k}{p^2} - \frac{n-k}{(1-p)^2}$$

Cả 2 số hạng đều âm với $p \in (0, 1)$, $0 < k < n$ → $\ell$ lõm xuống → $\hat{p}$ là cực đại. ✓

### Walk-through số

$n = 100$ tung, $k = 63$ ngửa:

$$\begin{aligned}
\hat{p} &= 63/100 = 0.63 \\
\ell(0.63) &= 63 \cdot \log(0.63) + 37 \cdot \log(0.37) \\
        &= 63 \cdot (-0.4620) + 37 \cdot (-0.9943) \\
        &\approx -29.106 + (-36.788) \\
        &\approx -65.894
\end{aligned}$$

So với $p = 0.5$:

$$\ell(0.5) = 63 \cdot \log(0.5) + 37 \cdot \log(0.5) = 100 \cdot \log(0.5) = 100 \cdot (-0.6931) = -69.315$$

$\ell(0.63) > \ell(0.5)$ ✓ — như mong đợi.

### ❓ Q&A

> Nếu $n = 5$, $k = 5$ (toàn ngửa)? $\hat{p} = 1$.

Theo MLE: đúng. Nhưng thực tế xu công bằng vẫn có thể ra 5 ngửa với xác suất $(0.5)^5 = 1/32 \approx 3\%$. MLE quá tin tưởng data ít. Cách khắc phục: smoothing $(k+1)/(n+2)$ (Laplace) hoặc MAP (mục 10).

> Bernoulli có 1 tham số. Nếu phân phối có nhiều tham số (như Gaussian)?

Đạo hàm riêng theo từng tham số = 0, giải hệ. Xem mục 7.

### 📝 Tóm tắt mục 6

- Bernoulli MLE: $\hat{p} = k/n$ (tỷ lệ thành công trong mẫu).
- Cách dẫn: viết $L$, log → $\ell$, đạo hàm = 0, giải.
- Trùng trực giác "trung bình mẫu" — đó là điểm tốt.

---

## 7. MLE cho Gaussian — `μ̂` và `σ̂²`

### Setup

- Mô hình: $X_i \sim N(\mu, \sigma^2)$, tham số $\theta = (\mu, \sigma^2)$.
- Data: $x_1, \dots, x_n$.
- PDF: $f(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \cdot \exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$.

### Log-likelihood

$$\begin{aligned}
\ell(\mu, \sigma^2) &= \sum_i \log f(x_i \mid \mu, \sigma^2) \\
        &= \sum_i \left[ -\tfrac{1}{2} \log(2\pi\sigma^2) - \frac{(x_i-\mu)^2}{2\sigma^2} \right] \\
        &= -\frac{n}{2} \cdot \log(2\pi\sigma^2) - \sum_i \frac{(x_i-\mu)^2}{2\sigma^2}
\end{aligned}$$

### Đạo hàm riêng theo μ

$$\frac{\partial \ell}{\partial \mu} = - \sum_i \frac{2(x_i-\mu) \cdot (-1)}{2\sigma^2} = \sum_i \frac{x_i-\mu}{\sigma^2}$$

Đặt = 0 (giả sử $\sigma^2 > 0$):

$$\begin{aligned}
\sum_i (x_i - \mu) &= 0 \\
\sum_i x_i - n\mu &= 0 \\
\hat{\mu}_{MLE} &= \frac{1}{n} \sum_i x_i = \text{trung bình mẫu } \bar{x}
\end{aligned}$$

### Đạo hàm riêng theo σ² (coi $v \equiv \sigma^2$ là biến)

$$\begin{aligned}
\ell(\mu, v) &= -\frac{n}{2} \cdot \log(2\pi v) - \sum_i \frac{(x_i-\mu)^2}{2v} \\
\frac{\partial \ell}{\partial v} &= -\frac{n}{2v} + \sum_i \frac{(x_i-\mu)^2}{2v^2}
\end{aligned}$$

Đặt = 0:

$$\begin{aligned}
-\frac{n}{2v} + \sum_i \frac{(x_i-\mu)^2}{2v^2} &= 0 \\
\frac{n}{2v} &= \sum_i \frac{(x_i-\mu)^2}{2v^2} \\
n \cdot v &= \sum_i (x_i-\mu)^2 \\
\hat{v} &= \frac{1}{n} \sum_i (x_i - \hat{\mu})^2
\end{aligned}$$

Tức là $\hat{\sigma}^2_{MLE} = \frac{1}{n} \sum_i (x_i - \hat{\mu})^2$.

### Walk-through số

Data: $x = (2, 4, 4, 4, 5, 5, 7, 9)$ ($n = 8$).

**$\hat{\mu}$**:

$$\begin{aligned}
\sum x_i &= 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40 \\
\hat{\mu} &= 40 / 8 = 5
\end{aligned}$$

**$\hat{\sigma}^2$**:

$$\begin{aligned}
(x_i - 5)^2 &= (-3)^2, (-1)^2, (-1)^2, (-1)^2, 0^2, 0^2, 2^2, 4^2 \\
         &= 9, 1, 1, 1, 0, 0, 4, 16 \\
\sum (x_i - 5)^2 &= 32 \\
\hat{\sigma}^2 &= 32 / 8 = 4 \\
\hat{\sigma} &= 2
\end{aligned}$$

### Verify

$\ell$ tại MLE:

$$\begin{aligned}
\ell(5, 4) &= -\frac{8}{2} \cdot \log(2\pi \cdot 4) - \frac{32}{2 \cdot 4} \\
       &= -4 \cdot \log(8\pi) - 4 \\
       &\approx -4 \cdot 3.2237 - 4 \\
       &\approx -12.895 - 4 = -16.895
\end{aligned}$$

So với $(\mu=5, \sigma^2=8)$ ($\sigma^2$ to gấp đôi MLE):

$$\begin{aligned}
\ell(5, 8) &= -\frac{8}{2} \cdot \log(16\pi) - \frac{32}{2 \cdot 8} \\
       &= -4 \cdot \log(16\pi) - 2 \\
       &\approx -4 \cdot 3.9170 - 2 \approx -17.668
\end{aligned}$$

$\ell(5, 4) > \ell(5, 8)$ ✓ — MLE thắng.

### ⚠ Lỗi thường gặp

- **Dùng $\mu$ thay $\hat{\mu}$ trong công thức $\hat{\sigma}^2$**: nếu $\mu$ chưa biết, phải dùng $\hat{\mu}$ (MLE của $\mu$).
- **Nhầm với phương sai mẫu không-bias**: thống kê dạy $s^2 = \frac{1}{n-1} \sum_i (x_i - \bar{x})^2$ (chia $n-1$). Đó là **unbiased estimator**, KHÁC MLE. MLE chia $n$, hơi bias nhỏ. Mục 11 giải thích.

### ❓ Q&A

> Vì sao chia $n$ ra biased? Bias bao nhiêu?

Vì $\hat{\mu}$ được fit từ chính data → đã "ăn" mất 1 bậc tự do. $E[\hat{\sigma}^2_{MLE}] = \frac{n-1}{n} \cdot \sigma^2$. Vd $n = 8$: bias $7/8 = 0.875$. Chia $n-1$ thay vì $n$ thì khử bias. Trong ML thực tế, $n$ thường cực lớn → bias nhỏ → MLE vẫn ổn.

> Nếu Gaussian đa biến ($N(\mu, \Sigma)$ với $\Sigma$ ma trận hiệp phương sai)?

Tương tự: $\hat{\mu} = \frac{1}{n} \sum x_i$ (vector trung bình), $\hat{\Sigma} = \frac{1}{n} \sum (x_i-\hat{\mu})(x_i-\hat{\mu})^\top$ (outer product). Xem [LinearAlgebra L8 — PCA](../../04-LinearAlgebra/lesson-08-pca/) — covariance matrix cách dùng ở đó cùng dạng.

### 📝 Tóm tắt mục 7

- $\hat{\mu}_{MLE} = \bar{x}$ (trung bình mẫu).
- $\hat{\sigma}^2_{MLE} = \frac{1}{n} \sum (x_i - \bar{x})^2$ (chia $n$, hơi biased).
- Cách dẫn: $\frac{\partial \ell}{\partial \mu} = 0$, $\frac{\partial \ell}{\partial \sigma^2} = 0$, giải tuần tự.
- Chia $n-1$ thì có $s^2$ unbiased (không phải MLE).

---

## 8. MLE cho linear regression → MSE

### Setup

Mô hình ML kinh điển:

$$y_i = w \cdot x_i + b + \varepsilon_i, \quad \varepsilon_i \sim N(0, \sigma^2), \quad \text{i.i.d.}$$

- $(x_i, y_i)$: data quan sát, $i = 1..n$.
- $w, b$: tham số cần ước lượng.
- $\varepsilon_i$: nhiễu (noise), giả định Gaussian, độc lập.

Với giả định Gaussian noise, **$y_i \mid x_i, w, b \sim N(wx_i + b, \sigma^2)$**.

### Likelihood

$$\begin{aligned}
L(w, b, \sigma^2) &= \prod_i N(y_i; wx_i + b, \sigma^2) \\
            &= \prod_i \frac{1}{\sqrt{2\pi\sigma^2}} \cdot \exp\!\left(-\frac{(y_i - wx_i - b)^2}{2\sigma^2}\right)
\end{aligned}$$

### Log-likelihood

$$\begin{aligned}
\ell(w, b, \sigma^2) &= \sum_i \log N(y_i; wx_i + b, \sigma^2) \\
            &= -\frac{n}{2} \cdot \log(2\pi\sigma^2) - \frac{1}{2\sigma^2} \cdot \sum_i (y_i - wx_i - b)^2
\end{aligned}$$

### Argmax w, b

$\sigma^2$ là const với mục đích tìm $w, b$. Chỉ cần tối thiểu hóa:

$$\sum_i (y_i - wx_i - b)^2 \equiv \text{SSE (sum of squared errors)}$$

Hay tương đương $\text{MSE} = \text{SSE} / n$.

→ **$\arg\max_{w,b} \ell = \arg\min_{w,b} \text{SSE} = \arg\min_{w,b} \text{MSE}$**.

### Đây là điểm chốt

> **MLE với giả định Gaussian noise = minimize MSE**.

Khi sách ML viết "loss = MSE", đó không phải lựa chọn tùy hứng — đó là **hệ quả** của giả định noise Gaussian.

Đổi giả định → đổi loss:

- Noise Laplace $\sim \text{Lap}(0, b)$: MLE → minimize **MAE** (mean absolute error).
- Noise Student-t: MLE → loss robust với outlier.
- Classification (mục 9): MLE → cross-entropy.

### Closed-form cho (w, b)

Đạo hàm SSE:

$$\begin{aligned}
\frac{\partial \text{SSE}}{\partial w} &= -2 \sum x_i(y_i - wx_i - b) \\
\frac{\partial \text{SSE}}{\partial b} &= -2 \sum (y_i - wx_i - b)
\end{aligned}$$

Đặt = 0:

$$\begin{aligned}
\sum x_i y_i &= w \sum x_i^2 + b \sum x_i \\
\sum y_i &= w \sum x_i + n b
\end{aligned}$$

Giải hệ:

$$\begin{aligned}
\hat{w} &= \frac{n \sum xy - \sum x \sum y}{n \sum x^2 - (\sum x)^2} = \frac{\text{Cov}(x,y)}{\text{Var}(x)} \\
\hat{b} &= \bar{y} - \hat{w} \bar{x}
\end{aligned}$$

(Trong đó $\bar{x} = \frac{1}{n} \sum x_i$, $\bar{y} = \frac{1}{n} \sum y_i$.)

### Walk-through số

$(x_i, y_i) = (1, 2), (2, 3), (3, 5), (4, 6), (5, 8)$ ($n = 5$).

$$\begin{aligned}
\sum x &= 15, \quad \sum y = 24 \\
\sum x^2 &= 1+4+9+16+25 = 55 \\
\sum xy &= 2+6+15+24+40 = 87 \\
\bar{x} &= 3, \quad \bar{y} = 4.8
\end{aligned}$$

Công thức:

$$\begin{aligned}
\hat{w} &= \frac{5 \cdot 87 - 15 \cdot 24}{5 \cdot 55 - 15^2} = \frac{435 - 360}{275 - 225} = \frac{75}{50} = 1.5 \\
\hat{b} &= 4.8 - 1.5 \cdot 3 = 0.3
\end{aligned}$$

→ $\hat{y} = 1.5x + 0.3$.

Kiểm tra fit:

| $x_i$ | $y_i$ | $\hat{y}_i = 1.5x_i + 0.3$ | residual $y_i - \hat{y}_i$ |
|----|-----|------------------|------------------|
| 1  | 2   | 1.8              | +0.2 |
| 2  | 3   | 3.3              | -0.3 |
| 3  | 5   | 4.8              | +0.2 |
| 4  | 6   | 6.3              | -0.3 |
| 5  | 8   | 7.8              | +0.2 |

$\text{SSE} = 0.04 + 0.09 + 0.04 + 0.09 + 0.04 = 0.30$. $\text{MSE} = 0.06$.

### MLE cho σ² (đã có w, b)

Tương tự mục 7:

$$\hat{\sigma}^2 = \frac{1}{n} \sum (y_i - \hat{w}x_i - \hat{b})^2 = \text{SSE} / n = 0.30 / 5 = 0.06$$

### Liên hệ với negative log-likelihood (NLL)

$\text{NLL} = -\ell$. Trong ML, ta minimize NLL:

$$-\ell(w, b, \sigma^2) = \frac{n}{2} \cdot \log(2\pi\sigma^2) + \frac{\text{SSE}}{2\sigma^2}$$

Với $\sigma^2$ cố định, minimize NLL ↔ minimize SSE ↔ minimize MSE.

### ❓ Q&A

> Nếu noise không Gaussian, MSE vẫn dùng được không?

Vẫn dùng được, nhưng **không còn là MLE**. Có thể không phải lựa chọn tối ưu thống kê. Vd có outliers nặng, dùng MSE → outlier kéo lệch. Khi đó MAE (Laplace noise) hoặc Huber loss tốt hơn.

> Linear regression nhiều biến ($x$ là vector)?

Tương tự. $y = w \cdot x + b$ với $w, x \in \mathbb{R}^d$. MLE → minimize SSE → closed-form $w = (X^\top X)^{-1} X^\top y$ (xem [LinearAlgebra L7 — Least Squares](../../04-LinearAlgebra/lesson-07-least-squares/) nếu có).

### 📝 Tóm tắt mục 8

- Linear regression với noise Gaussian → MLE → **minimize MSE**.
- Closed-form: $\hat{w} = \text{Cov}(x,y)/\text{Var}(x)$, $\hat{b} = \bar{y} - \hat{w} \bar{x}$.
- "Loss = MSE" KHÔNG phải tùy chọn — đó là hệ quả của giả định noise.
- Đổi giả định noise → đổi loss (Laplace → MAE, t-student → robust loss).

---

## 9. Preview Lesson 08: MLE classification = cross-entropy

### Setup

Classification: mỗi data point $x_i$ thuộc 1 trong K lớp $c_i \in \{1, \dots, K\}$. Model output vector xác suất $\hat{p}(x_i) = (\hat{p}_1, \dots, \hat{p}_K)$ với $\sum \hat{p}_k = 1$.

→ Phân phối của lớp thật: $\text{Categorical}(p_1, \dots, p_K)$.

### Likelihood

$P(c_i \mid x_i) = \hat{p}_{c_i}$ (xác suất model gán cho lớp thật).

Likelihood toàn data:

$$L = \prod_i \hat{p}_{c_i}(x_i)$$

### Log-likelihood

$$\ell = \sum_i \log \hat{p}_{c_i}(x_i)$$

### Negative log-likelihood (NLL)

$$\text{NLL} = -\ell = -\sum_i \log \hat{p}_{c_i}(x_i)$$

Chia trung bình:

$$\frac{1}{n} \text{NLL} = -\frac{1}{n} \sum_i \log \hat{p}_{c_i}(x_i)$$

**Đây chính là cross-entropy loss** (Lesson 08 sẽ chứng minh chi tiết). Trong sklearn / PyTorch / TF, `CrossEntropyLoss` chính là cái này.

### Walk-through ngắn

3 data points, 3 lớp (A, B, C):

| i | true class | $\hat{p}$ model | $\hat{p}_{\text{true}}$ | $\log \hat{p}_{\text{true}}$ |
|---|------------|---------|-----------|----------------|
| 1 | A | (0.7, 0.2, 0.1) | 0.7 | -0.3567 |
| 2 | B | (0.3, 0.4, 0.3) | 0.4 | -0.9163 |
| 3 | C | (0.2, 0.1, 0.7) | 0.7 | -0.3567 |

$\ell = -0.3567 + (-0.9163) + (-0.3567) = -1.6297$
$\text{NLL} = 1.6297$. Per-sample $= 1.6297 / 3 = 0.5432$.

Model nào có cross-entropy nhỏ hơn = MLE tốt hơn = "khả năng đúng" cao hơn. Đây là **lý do mọi mạng classification dùng cross-entropy**.

### Liên kết về MLE

> **Train neural network classification = MLE.**
> Mạng output $\hat{p}$, loss = NLL = cross-entropy, minimize bằng [gradient descent](../../03-Calculus/lesson-07-gradient-descent/). Bạn không "chọn" cross-entropy vì nó "có vẻ hợp lý" — bạn chọn vì nó là NLL của Categorical model.

Lesson 08 sẽ làm rõ entropy, cross-entropy, KL divergence.

### 📝 Tóm tắt mục 9

- Classification model: $\text{Categorical}(\hat{p})$, true class $c$.
- MLE → maximize $\sum \log \hat{p}_c$ → minimize $-\sum \log \hat{p}_c$ = cross-entropy.
- "Cross-entropy loss" trong ML chính là NLL của Categorical MLE.

---

## 10. MAP estimation — MLE + prior

### 💡 Trực giác

MLE chỉ nhìn data. MAP (Maximum A Posteriori) thêm **niềm tin có trước (prior)** về $\theta$.

Ví dụ: tung xu **lạ** 5 lần ra 5 ngửa. MLE bảo $\hat{p} = 1$ (xu chỉ ngửa). Nhưng bạn biết hầu hết xu trên thế giới gần $p = 0.5$ → bạn không tin $p = 1$. MAP cho phép bạn ghi vào prior "$p$ có khả năng quanh 0.5" → kết quả $\hat{p}_{MAP}$ sẽ giữa 0.5 và 1.

### Setup Bayesian

Bayes' rule (xem [L2 — Bayes](../lesson-02-conditional-bayes/)):

$$P(\theta \mid \text{data}) = \frac{P(\text{data} \mid \theta) \cdot P(\theta)}{P(\text{data})} = \frac{L(\theta) \cdot P(\theta)}{P(\text{data})}$$

- $P(\theta \mid \text{data})$: **posterior** — phân phối của $\theta$ sau khi thấy data.
- $L(\theta) = P(\text{data} \mid \theta)$: likelihood.
- $P(\theta)$: **prior** — niềm tin về $\theta$ trước khi thấy data.
- $P(\text{data})$: evidence (chuẩn hóa, không phụ thuộc $\theta$).

### MAP estimate

$$\begin{aligned}
\hat{\theta}_{MAP} &= \arg\max_\theta P(\theta \mid \text{data}) \\
       &= \arg\max_\theta L(\theta) \cdot P(\theta) && (\text{vì } P(\text{data}) \text{ const}) \\
       &= \arg\max_\theta [\log L(\theta) + \log P(\theta)] && (\text{log đơn điệu}) \\
       &= \arg\max_\theta [\ell(\theta) + \log P(\theta)]
\end{aligned}$$

→ MAP = MLE **+ một số hạng log prior**.

### MLE là trường hợp đặc biệt của MAP

Nếu $P(\theta) = \text{const}$ (uniform prior, không thiên về giá trị nào):

$$\begin{aligned}
\log P(\theta) &= \text{const} \quad \to \text{không ảnh hưởng argmax} \\
\hat{\theta}_{MAP} &= \arg\max \ell(\theta) = \hat{\theta}_{MLE}
\end{aligned}$$

### Walk-through số (xu Beta prior)

Mô hình: $X \sim \text{Bernoulli}(p)$, prior $p \sim \text{Beta}(\alpha, \beta)$ với PDF:

$$P(p) \propto p^{\alpha-1} \cdot (1-p)^{\beta-1}$$

(Beta là phân phối liên tục trên $[0,1]$, tham số $\alpha, \beta$ kiểm soát hình dạng — chi tiết ngoài phạm vi.)

Data: $n = 5$, $k = 5$ (toàn ngửa).

Likelihood: $L(p) \propto p^5 \cdot (1-p)^0 = p^5$.

Posterior: $L(p) \cdot P(p) \propto p^5 \cdot p^{\alpha-1}(1-p)^{\beta-1} = p^{5+\alpha-1}(1-p)^{\beta-1}$.

Đạo hàm log = 0:

$$\begin{aligned}
\frac{5 + \alpha - 1}{p} - \frac{\beta - 1}{1 - p} &= 0 \\
\hat{p}_{MAP} &= \frac{5 + \alpha - 1}{5 + \alpha + \beta - 2} = \frac{k + \alpha - 1}{n + \alpha + \beta - 2}
\end{aligned}$$

Với prior **uniform** = $\text{Beta}(1, 1)$ ($\alpha=\beta=1$):

$$\hat{p}_{MAP} = \frac{5 + 0}{5 + 0} = 1 \quad \leftarrow \text{bằng MLE}$$

Với prior **gần 0.5** = $\text{Beta}(10, 10)$ (centered 0.5, vừa phải):

$$\hat{p}_{MAP} = \frac{5 + 9}{5 + 18} = \frac{14}{23} \approx 0.609$$

→ Prior kéo $\hat{p}$ về phía 0.5, không tin 100% data ít.

Với prior **rất mạnh** = $\text{Beta}(100, 100)$:

$$\hat{p}_{MAP} = \frac{5 + 99}{5 + 198} = \frac{104}{203} \approx 0.512$$

→ Prior mạnh gần như "lờ data".

### ⚠ Lỗi thường gặp

- **Nhầm MAP với mean posterior**. MAP = argmax (mode) posterior. Mean posterior $= E[\theta \mid \text{data}]$ = posterior mean, là số khác (trừ khi posterior đối xứng).
- **Tưởng MAP là "luôn tốt hơn MLE"**. Không — phụ thuộc prior có hợp lý không. Prior sai → MAP tệ.
- **Tưởng prior = regularization**: gần đúng, nhưng tế nhị. L2 regularization tương ứng với Gaussian prior trên weights. L1 ↔ Laplace prior. Chứng minh chính thức tốn 1 bài riêng.

### ❓ Q&A

> MLE và MAP, ML thực tế dùng cái nào?

Cả 2. Vanilla mạng neural minimize cross-entropy = MLE. Khi thêm `L2 weight decay`, đó là Gaussian prior trên weights → effectively MAP. Khi train với "label smoothing", "data augmentation"... cũng là cách áp prior.

> Bayesian không chỉ tìm point estimate (MAP) mà giữ cả posterior. Lợi ích gì?

Posterior cho cả **uncertainty**: không chỉ "$p \approx 0.6$", mà "$p$ khả năng cao trong $[0.5, 0.7]$". MLE/MAP đưa 1 số duy nhất, mất thông tin. ML Bayesian (BNN, MC dropout) làm việc với cả posterior.

### 📝 Tóm tắt mục 10

- MAP = argmax posterior = $\arg\max (L \cdot \text{prior})$.
- log dạng: $\ell(\theta) + \log P(\theta)$.
- **MLE = MAP với uniform prior** — MLE là trường hợp đặc biệt.
- Prior mạnh → kéo $\hat{\theta}$ về phía giá trị prior. Prior yếu → MAP $\approx$ MLE.

---

## 11. Q&A tổng hợp

### MLE có biased không?

Tùy mô hình.

- **Bernoulli $\hat{p} = k/n$**: unbiased. $E[k/n] = E[k]/n = np/n = p$. ✓
- **Gaussian $\hat{\mu} = \bar{x}$**: unbiased. $E[\bar{x}] = \mu$. ✓
- **Gaussian $\hat{\sigma}^2_{MLE} = \frac{1}{n} \sum(x_i - \bar{x})^2$**: **biased**! $E[\hat{\sigma}^2_{MLE}] = \frac{n-1}{n} \cdot \sigma^2$. Bias $-\sigma^2/n$. Chia $n-1$ thay $n$ thì unbiased (gọi $s^2$).

Khi $n \to \infty$, bias $\to 0$ → MLE **consistent** (hội tụ về $\theta$ thật).

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

- Closed-form: $O(n)$ hoặc $O(n^2)$ tùy mô hình.
- GD: O(n · iters) cho 1 epoch. Stochastic GD chia mini-batch giảm tải.

### Khi nào KHÔNG dùng MLE?

- Khi prior thông tin có sẵn → dùng MAP.
- Khi cần uncertainty (không chỉ point estimate) → dùng Bayesian full posterior.
- Khi mô hình không đúng (mis-specified) → MLE có thể converge về $\theta$ "sai-nhất-không-sai" (KL nearest), không phải $\theta$ thật.
- Khi data có outlier nhiều và mô hình giả định nhẹ → MLE nhạy với outlier (vd Gaussian MLE bị outlier kéo).

### MLE và CRLB?

Cramér-Rao Lower Bound: bất kỳ unbiased estimator nào của $\theta$ có variance $\geq 1 / I(\theta)$ (Fisher information). MLE asymptotically đạt CRLB → efficient (best possible variance asymptotically). Lý do MLE phổ biến.

---

## 12. Lỗi thường gặp (gom lại)

| # | Lỗi | Hậu quả | Sửa |
|---|-----|----------|------|
| 1 | Dùng $L$ thay $\log L$ trong code | Underflow $\to 0$, MLE crash | Luôn `log_prob` ngay từ đầu |
| 2 | Quên giả định i.i.d., vẫn nhân $P$ | $L$ sai | Kiểm tra i.i.d. trước; data không độc lập → đổi mô hình (time-series, hierarchical) |
| 3 | Nhầm $\mu$ với $\hat{\mu}$ trong $\hat{\sigma}^2$ | Nếu $\mu$ chưa biết, dùng $\hat{\mu}$ | $\hat{\sigma}^2 = \frac{1}{n} \sum (x_i - \hat{\mu})^2$ |
| 4 | Dùng $\hat{\sigma}^2$ MLE rồi tuyên bố "unbiased" | Nhầm hai khái niệm | MLE chia $n$; unbiased chia $n-1$ |
| 5 | Áp MLE cho data ít → overfit | $\hat{p} = 0$ hoặc $1$ khi data ít | Smoothing / MAP / Bayesian |
| 6 | Tưởng $\arg\max L(\theta) \neq \arg\max \log L(\theta)$ | Phí công | log đơn điệu — argmax giống nhau |
| 7 | Quên check điều kiện cực đại (chỉ dùng $\frac{d\ell}{d\theta} = 0$) | Ra cực tiểu hoặc điểm yên ngựa | Kiểm $\frac{d^2\ell}{d\theta^2} < 0$ hoặc check biên |
| 8 | Tưởng MLE = MAP luôn | Sai | MAP = MLE chỉ khi prior uniform |
| 9 | Linear regression dùng MSE "vì sách bảo thế" | Thiếu hiểu cội rễ | MSE = MLE với Gaussian noise; đổi noise → đổi loss |
| 10 | $\log(0)$ khi $p = 0$ hoặc $1$ | NaN | Clip $p \in [\varepsilon, 1-\varepsilon]$ trước log |

---

## 13. Bài tập

### Bài 1 — MLE Bernoulli cơ bản

Bạn tung 50 lần một đồng xu lạ, ra 17 mặt ngửa.

(a) Tính $\hat{p}_{MLE}$.

(b) Tính $\ell(\hat{p})$ (dùng log tự nhiên).

(c) So sánh $\ell(0.5)$ — liệu xu công bằng "kém khả năng" hơn $\hat{p}$ bao nhiêu?

---

### Bài 2 — MLE Gaussian

Cho mẫu chiều cao 6 người (cm): $(165, 170, 172, 168, 175, 169)$.

(a) Tính $\hat{\mu}_{MLE}$ và $\hat{\sigma}^2_{MLE}$.

(b) Tính phương sai mẫu unbiased $s^2$ (chia $n-1$).

(c) Tính tỷ lệ bias $\hat{\sigma}^2/s^2$.

---

### Bài 3 — MLE Poisson

Phân phối Poisson với tham số $\lambda$ có PMF:

$$P(X = k \mid \lambda) = \frac{e^{-\lambda} \cdot \lambda^k}{k!}, \quad k = 0, 1, 2, \dots$$

(a) Dẫn $\hat{\lambda}_{MLE}$ từ data $x_1, \dots, x_n$ (số sự kiện trong $n$ đơn vị thời gian).

(b) Áp dụng: trong 7 ngày, số khách vào cửa hàng là $(8, 12, 9, 11, 7, 13, 10)$. Tính $\hat{\lambda}_{MLE}$.

---

### Bài 4 — MLE Exponential

Phân phối Exponential có PDF:

$$f(x \mid \lambda) = \lambda e^{-\lambda x}, \quad x \geq 0$$

($\lambda$ là rate parameter.)

(a) Dẫn $\hat{\lambda}_{MLE}$ từ data $x_1, \dots, x_n$.

(b) Áp dụng: thời gian giữa 5 cuộc gọi (phút) là $(2.1, 3.5, 1.8, 4.2, 2.9)$. Tính $\hat{\lambda}_{MLE}$.

(c) Suy ra thời gian chờ kỳ vọng ($1/\hat{\lambda}$).

---

### Bài 5 — Linear regression bằng tay

Cho 4 điểm $(x_i, y_i) = (0, 1), (1, 2), (2, 2), (3, 4)$.

(a) Tính $\hat{w}, \hat{b}$ MLE (Gaussian noise).

(b) Tính SSE.

(c) Tính $\hat{\sigma}^2_{MLE}$.

---

### Bài 6 — MAP với Beta prior

Đồng xu mới, prior $p \sim \text{Beta}(2, 8)$ (mean prior $= 2/10 = 0.2$, bạn nghĩ xu có xu hướng ra sấp).

Bạn tung 10 lần, ra 4 mặt ngửa.

(a) Tính $\hat{p}_{MLE}$.

(b) Tính $\hat{p}_{MAP}$ (dùng công thức $\frac{k + \alpha - 1}{n + \alpha + \beta - 2}$).

(c) So sánh và giải thích.

---

## 14. Lời giải chi tiết

### Lời giải bài 1

(a) $\hat{p}_{MLE} = k/n = 17/50 = 0.34$.

(b) $\ell(0.34) = 17 \cdot \log(0.34) + 33 \cdot \log(0.66)$

$\log(0.34) \approx -1.0788$, $\log(0.66) \approx -0.4155$.

$\ell(0.34) = 17 \cdot (-1.0788) + 33 \cdot (-0.4155) = -18.339 + (-13.712) = -32.051$.

(c) $\ell(0.5) = 50 \cdot \log(0.5) = 50 \cdot (-0.6931) = -34.657$.

$\ell(0.34) - \ell(0.5) = -32.051 - (-34.657) = 2.606$. Xu công bằng kém khả năng hơn $\hat{p} = 0.34$ bằng $\exp(2.606) \approx 13.5$ lần. Dữ liệu khá thuyết phục rằng xu KHÔNG công bằng (nhưng 50 lần chưa đủ kết luận chắc — cần test thống kê chính thức).

---

### Lời giải bài 2

(a)
$$\begin{aligned}
\sum x_i &= 165 + 170 + 172 + 168 + 175 + 169 = 1019 \\
\hat{\mu} &= 1019 / 6 \approx 169.833
\end{aligned}$$

Sai số:
$$\begin{aligned}
(165 - 169.833)^2 &= 23.36 \\
(170 - 169.833)^2 &= 0.028 \\
(172 - 169.833)^2 &= 4.70 \\
(168 - 169.833)^2 &= 3.36 \\
(175 - 169.833)^2 &= 26.70 \\
(169 - 169.833)^2 &= 0.694 \\
\sum &= 58.83 \\
\hat{\sigma}^2_{MLE} &= 58.83 / 6 \approx 9.806 \\
\hat{\sigma} &\approx 3.131
\end{aligned}$$

(b) $s^2 = 58.83 / 5 = 11.767$. $s \approx 3.430$.

(c) $\hat{\sigma}^2/s^2 = 9.806 / 11.767 = 0.833 = 5/6 = (n-1)/n$. ✓ với công thức bias.

---

### Lời giải bài 3

(a) Log-likelihood:

$$\begin{aligned}
\ell(\lambda) &= \sum_i [-\lambda + x_i \cdot \log \lambda - \log(x_i!)] \\
     &= -n\lambda + \left(\sum x_i\right) \cdot \log \lambda - \sum \log(x_i!)
\end{aligned}$$

Đạo hàm:
$$\begin{aligned}
\frac{d\ell}{d\lambda} &= -n + \frac{\sum x_i}{\lambda} = 0 \\
\hat{\lambda}_{MLE} &= \frac{\sum x_i}{n} = \bar{x}
\end{aligned}$$

→ MLE Poisson cũng là trung bình mẫu.

(b)
$$\begin{aligned}
\sum x_i &= 8+12+9+11+7+13+10 = 70 \\
\hat{\lambda}_{MLE} &= 70 / 7 = 10
\end{aligned}$$

→ Trung bình 10 khách/ngày.

---

### Lời giải bài 4

(a) Log-likelihood:

$$\ell(\lambda) = \sum_i [\log \lambda - \lambda x_i] = n \cdot \log \lambda - \lambda \cdot \sum x_i$$

Đạo hàm:
$$\begin{aligned}
\frac{d\ell}{d\lambda} &= \frac{n}{\lambda} - \sum x_i = 0 \\
\hat{\lambda}_{MLE} &= \frac{n}{\sum x_i} = \frac{1}{\bar{x}}
\end{aligned}$$

(b)
$$\begin{aligned}
\sum x_i &= 2.1 + 3.5 + 1.8 + 4.2 + 2.9 = 14.5 \\
\bar{x} &= 14.5 / 5 = 2.9 \\
\hat{\lambda}_{MLE} &= 1 / 2.9 \approx 0.3448 \text{ (cuộc/phút)}
\end{aligned}$$

(c) Kỳ vọng Exponential: $E[X] = 1/\lambda$. $1/\hat{\lambda} = 2.9$ phút. Trùng $\bar{x}$ — không tình cờ, MLE đảm bảo thế.

---

### Lời giải bài 5

(a)
$$\begin{aligned}
\sum x &= 0+1+2+3 = 6 \\
\sum y &= 1+2+2+4 = 9 \\
\sum xy &= 0+2+4+12 = 18 \\
\sum x^2 &= 0+1+4+9 = 14 \\
n &= 4, \quad \bar{x} = 1.5, \quad \bar{y} = 2.25 \\
\hat{w} &= \frac{4 \cdot 18 - 6 \cdot 9}{4 \cdot 14 - 6^2} = \frac{72 - 54}{56 - 36} = \frac{18}{20} = 0.9 \\
\hat{b} &= 2.25 - 0.9 \cdot 1.5 = 2.25 - 1.35 = 0.9
\end{aligned}$$

→ $\hat{y} = 0.9x + 0.9$.

(b)
$$\begin{aligned}
\hat{y}_1 &= 0.9 \cdot 0 + 0.9 = 0.9, & y_1 - \hat{y}_1 &= 0.1 \\
\hat{y}_2 &= 0.9 \cdot 1 + 0.9 = 1.8, & y_2 - \hat{y}_2 &= 0.2 \\
\hat{y}_3 &= 0.9 \cdot 2 + 0.9 = 2.7, & y_3 - \hat{y}_3 &= -0.7 \\
\hat{y}_4 &= 0.9 \cdot 3 + 0.9 = 3.6, & y_4 - \hat{y}_4 &= 0.4 \\
\text{SSE} &= 0.01 + 0.04 + 0.49 + 0.16 = 0.70
\end{aligned}$$

(c) $\hat{\sigma}^2_{MLE} = \text{SSE} / n = 0.70 / 4 = 0.175$.

---

### Lời giải bài 6

(a) $\hat{p}_{MLE} = 4/10 = 0.4$.

(b) $\hat{p}_{MAP} = \frac{k + \alpha - 1}{n + \alpha + \beta - 2} = \frac{4 + 2 - 1}{10 + 2 + 8 - 2} = \frac{5}{18} \approx 0.278$.

(c) Prior nghĩ $p$ quanh 0.2, data nói $p \approx 0.4$. MAP kết hợp 2 ý kiến: $\hat{p}_{MAP} \approx 0.278$, gần prior hơn vì $n = 10$ là data tương đối ít so với "sức mạnh" prior $\alpha + \beta = 10$.

Hình dung prior $\text{Beta}(\alpha, \beta)$ như "data ảo": coi như đã thấy $\alpha - 1$ ngửa và $\beta - 1$ sấp trước. $\text{Beta}(2, 8)$ ↔ "đã thấy 1 ngửa, 7 sấp" → tổng (ảo + thật) = (5 ngửa, 13 sấp), $\hat{p}_{MAP} = 5/18$. Trực giác này khớp công thức.

---

## 15. Tóm tắt toàn bài

| Khái niệm | Định nghĩa | Công thức / Ví dụ |
|------------|-------------|---------------------|
| Likelihood | $P(\text{data} \mid \theta)$, data cố định, $\theta$ biến | $L(p) = p^k (1-p)^{n-k}$ cho Bernoulli |
| Log-likelihood | $\ell = \log L = \sum \log P(x_i \mid \theta)$ | Tránh underflow, đạo hàm gọn |
| MLE | $\hat{\theta} = \arg\max L = \arg\max \ell$ | Bernoulli: $\hat{p} = k/n$ |
| MLE Gaussian | $\hat{\mu} = \bar{x}$, $\hat{\sigma}^2 = \frac{1}{n}\sum(x_i-\bar{x})^2$ | $\hat{\sigma}^2$ chia $n$, biased; $s^2$ chia $n-1$, unbiased |
| Linear regression MLE | minimize SSE = MSE | $\hat{w} = \text{Cov}(x,y)/\text{Var}(x)$, $\hat{b} = \bar{y}-\hat{w}\bar{x}$ |
| Classification MLE | minimize cross-entropy = $-\sum \log \hat{p}_c$ | Preview L8 |
| MAP | $\arg\max (L \cdot \text{prior}) = \arg\max (\ell + \log \text{prior})$ | MLE = MAP với uniform prior |
| Bias | $E[\hat{\theta}] - \theta$ | MLE biased nhỏ với $\hat{\sigma}^2$, unbiased với $\hat{p}, \hat{\mu}$ |

**Mạch kết nối với toàn lộ trình**:

- MLE → minimize $-\ell$ bằng [GD](../../03-Calculus/lesson-07-gradient-descent/) → train mạng neural.
- MLE Gaussian → MSE → linear regression (Tầng 6 đầu tiên).
- MLE Categorical → cross-entropy → classification, softmax, language model (Lesson 08 + Tầng 6).
- MAP → regularization (L2 ↔ Gaussian prior, L1 ↔ Laplace prior) → giảm overfit.

→ Sau bài này, mọi loss function bạn gặp trong ML đều có **dẫn xuất từ MLE/MAP**, không phải lựa chọn "trên trời".

---

## Liên kết

- **Bài trước**: [Lesson 06 — Kỳ vọng, phương sai, covariance](../lesson-06-expectation-variance/).
- **Bài tiếp**: [Lesson 08 — Cross-entropy + KL divergence](../lesson-08-cross-entropy-kl/) — sẽ formalize "MLE classification = cross-entropy".
- **Liên quan**:
  - [Calculus L5 — Tối ưu 1 biến](../../03-Calculus/lesson-05-optimization-1d/) — tìm cực đại bằng $f'=0$.
  - [Calculus L7 — Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) — khi không closed-form.
  - [Probability L02 — Bayes](../lesson-02-conditional-bayes/) — nền cho MAP.
  - [Probability L05 — Gaussian](../lesson-05-normal-distribution/), [L06 — E, Var](../lesson-06-expectation-variance/) — phân phối nền.
- [Trang chính Probability](../index.html) · [Vectors roadmap](../../README.md).
