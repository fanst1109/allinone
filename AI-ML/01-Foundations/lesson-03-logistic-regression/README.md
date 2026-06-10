# Lesson 03 — Logistic Regression: từ "đường thẳng" sang "xác suất"

> **Tầng 6 — AI/ML · Lesson 03**  
> Sau khi linear regression dạy ta đoán **số thực**, lesson này dạy ta đoán **xác suất** — bước nhỏ về toán, nhưng là bước khổng lồ về tư duy: từ regression sang **classification**.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tại sao** không thể dùng linear regression cho bài toán phân loại nhị phân.
- Sử dụng hàm **sigmoid** để biến output thực thành xác suất $\in (0, 1)$.
- Viết được mô hình $P(y=1|x) = \sigma(w^\top x + b)$, gọi là **logistic regression**.
- Dẫn được **binary cross-entropy loss** từ MLE của phân phối Bernoulli.
- Tính được **gradient** một dòng: $\partial L / \partial w = (p - y) \cdot x$.
- Hiểu **decision boundary** là một siêu phẳng (hyperplane) và vì sao logistic là "linear classifier".
- Mở rộng sang **softmax regression** cho multi-class (≥ 3 nhãn).
- Đánh giá model bằng **confusion matrix, precision/recall/F1, ROC, AUC**.
- Nhìn ra logistic regression chính là một **neural network 1 lớp** với activation sigmoid — bước đệm để vào lesson 04.

---

## Kiến thức tiền đề

| Khái niệm | Lesson |
|-----------|--------|
| Linear regression — $y = w^\top x + b$, MSE, gradient descent | [`../lesson-02-linear-regression/`](../lesson-02-linear-regression/) |
| Sigmoid (xuất hiện lần đầu) | [`../../01-Algebra/lesson-07-exponentials-logs/`](../../01-Algebra/lesson-07-exponentials-logs/) |
| Phân phối Bernoulli, MLE | [`../../05-Probability/lesson-07-mle/`](../../05-Probability/lesson-07-mle/) |
| Cross-entropy, KL divergence | [`../../05-Probability/lesson-08-cross-entropy-kl/`](../../05-Probability/lesson-08-cross-entropy-kl/) |
| Đạo hàm chain rule | [`../../03-Calculus/lesson-04-chain-rule/`](../../03-Calculus/) |
| Vector, dot product | [`../../04-LinearAlgebra/`](../../04-LinearAlgebra/) |

---

## 1. Bài toán: phân loại nhị phân

### 1.1 Setup

Cho dataset gồm $n$ mẫu, mỗi mẫu là cặp $(x^{(i)}, y^{(i)})$:

- $x^{(i)} \in \mathbb{R}^d$: vector feature $d$ chiều.
- $y^{(i)} \in \{0, 1\}$: nhãn nhị phân (0 = âm, 1 = dương).

Mục tiêu: học một hàm $f(x)$ dự đoán $y$ cho mẫu mới.

> 💡 **Trực giác**  
> Hãy tưởng tượng bạn làm filter spam email. Mỗi email được biểu diễn bằng 2 con số: $x_1$ = số từ trong email, $x_2$ = tỉ lệ ký tự in hoa. Label $y = 1$ nếu là spam, $0$ nếu không. Bài toán: cho 1 email mới, đoán "có phải spam không?"

### 1.2 Ví dụ dataset spam (toy)

| $x_1$ (số từ) | $x_2$ (% in hoa) | $y$ (spam?) |
|:---:|:---:|:---:|
| 50 | 0.05 | 0 |
| 200 | 0.10 | 0 |
| 80 | 0.45 | 1 |
| 30 | 0.60 | 1 |
| 150 | 0.08 | 0 |
| 25 | 0.55 | 1 |

Quan sát: email spam thường ngắn + nhiều in hoa ($x_1$ thấp, $x_2$ cao).

### 1.3 Vì sao KHÔNG dùng linear regression?

Thử cách "ngây thơ": fit linear regression $\hat{y} = w^\top x + b$, rồi gán nhãn theo quy tắc "nếu $\hat{y} > 0{,}5$ thì 1, ngược lại 0".

**Vấn đề 1 — Output không bị chặn.**

Linear $w^\top x + b \in (-\infty, +\infty)$. Cho email cực dài ($x_1 = 5000$) thì $\hat{y}$ có thể bằng $47{,}3$. Số đó nghĩa là gì? Xác suất 47? Không hợp lý — xác suất phải $\in [0, 1]$.

**Walk-through cụ thể.** Giả sử fit ra $w = (-0{,}002, 3{,}0)$, $b = 0{,}1$:

- Email $x = (50, 0{,}05)$: $\hat{y} = -0{,}002 \cdot 50 + 3{,}0 \cdot 0{,}05 + 0{,}1 = -0{,}1 + 0{,}15 + 0{,}1 = 0{,}15$ → "không spam" (ok).
- Email $x = (25, 0{,}55)$: $\hat{y} = -0{,}05 + 1{,}65 + 0{,}1 = 1{,}70$ → "spam" (ok về nhãn, nhưng "xác suất = 1.70" thì vô nghĩa).
- Email cực đoan $x = (3, 0{,}95)$: $\hat{y} = -0{,}006 + 2{,}85 + 0{,}1 = 2{,}944$ → output to vô lý.

**Vấn đề 2 — MSE phạt sai khái niệm.**

Với label $y = 1$, nếu model output $\hat{y} = 5$ (rất tự tin spam), MSE $= (5-1)^2 = 16$ phạt nặng — dù model đoán **đúng nhãn** và rất tự tin. Ta không muốn phạt sự tự tin đúng hướng.

**Vấn đề 3 — Đường thẳng không "uốn" được ở biên.**

Linear regression cố ép một mặt phẳng đi qua đám điểm, nhưng ở vùng "rất chắc chắn" (xa boundary), ta muốn output **bão hòa** về 0 hoặc 1, không tiếp tục tăng/giảm tuyến tính.

> ❓ **Câu hỏi tự nhiên**  
> *"Vậy hồi quy tuyến tính có thực sự sai không, hay chỉ ‘không đẹp'?"*  
> Cả hai. Output không có ý nghĩa xác suất (cản trở việc kết hợp với loss xác suất), MSE không khớp với bài toán phân loại (gradient yếu khi sai nặng), và độ tự tin tăng tuyến tính là bệnh chứ không phải tính năng.

> ⚠ **Lỗi thường gặp**  
> "Tôi đã clip output về $[0, 1]$ rồi, dùng linear là được." — Clip phá vỡ gradient ở vùng cắt (gradient = 0 nên model không học được gì khi sai). Phải dùng hàm trơn — đó là vai trò của sigmoid.

### 1.4 Tóm tắt mục 1

📝 **Mục 1 — Bài toán**

- Binary classification: $y \in \{0, 1\}$, mục tiêu đoán xác suất $P(y=1|x)$.
- Linear regression không phù hợp vì: output không bị chặn, MSE phạt sai khái niệm, độ tự tin không bão hòa.
- Cần một hàm "ép" output $w^\top x + b \in \mathbb{R}$ về khoảng $(0, 1)$ — đó là sigmoid.

---

## 2. Sigmoid σ(z) — "ép số thực vào (0, 1)"

### 2.1 Định nghĩa

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

> 💡 **Trực giác**  
> Sigmoid như một "công tắc trơn":
> - $z$ rất âm ($-\infty$) → $\sigma(z) \approx 0$ (tắt).
> - $z = 0$ → $\sigma(z) = 0{,}5$ (lưỡng lự).
> - $z$ rất dương ($+\infty$) → $\sigma(z) \approx 1$ (bật).
>
> Khác với hàm bước $\text{step}(z)$ (gãy tại 0), sigmoid **uốn cong mượt** — quan trọng để gradient descent hoạt động.

### 2.2 4 ví dụ số

| $z$ | $e^{-z}$ | $1 + e^{-z}$ | $\sigma(z) = \dfrac{1}{1+e^{-z}}$ |
|---:|:---:|:---:|:---:|
| $-3$ | $e^3 \approx 20{,}09$ | $21{,}09$ | $\approx 0{,}0474$ |
| $-1$ | $e^1 \approx 2{,}718$ | $3{,}718$ | $\approx 0{,}2689$ |
| $0$ | $1$ | $2$ | $0{,}5$ |
| $1$ | $e^{-1} \approx 0{,}3679$ | $1{,}3679$ | $\approx 0{,}7311$ |
| $3$ | $e^{-3} \approx 0{,}0498$ | $1{,}0498$ | $\approx 0{,}9526$ |

Verify đối xứng: $\sigma(-z) = 1 - \sigma(z)$. Ví dụ $\sigma(-1) = 0{,}2689$ và $1 - \sigma(1) = 1 - 0{,}7311 = 0{,}2689$ ✓.

### 2.3 Properties (4 tính chất cốt lõi)

**P1. Range:** $\sigma(z) \in (0, 1)$ cho mọi $z \in \mathbb{R}$. Cận $0$ và $1$ không bao giờ đạt được.

**P2. Đơn điệu tăng:** $z_1 < z_2 \Rightarrow \sigma(z_1) < \sigma(z_2)$. Đó là lý do thứ tự xác suất theo $z$.

**P3. Đối xứng quanh $(0, 0{,}5)$:**

$$\sigma(-z) = 1 - \sigma(z)$$

**Chứng minh từng bước:**

```
σ(-z) = 1 / (1 + e^z)
      = e^(-z) / (e^(-z) · (1 + e^z))     [nhân tử và mẫu với e^(-z)]
      = e^(-z) / (e^(-z) + 1)
      = 1 - 1/(e^(-z) + 1)                [vì e^(-z)/(1+e^(-z)) = 1 - 1/(1+e^(-z))]
      = 1 - σ(z)
```

**P4. Đạo hàm cực gọn:**

$$\sigma'(z) = \sigma(z) \cdot (1 - \sigma(z))$$

**Chứng minh từng bước** (dùng $\sigma(z) = (1 + e^{-z})^{-1}$):

```
dσ/dz = -1 · (1 + e^(-z))^(-2) · d(1 + e^(-z))/dz       [chain rule]
      = -1 · (1 + e^(-z))^(-2) · (-e^(-z))
      = e^(-z) / (1 + e^(-z))^2
      = [1/(1 + e^(-z))] · [e^(-z)/(1 + e^(-z))]
      = σ(z) · [1 - 1/(1 + e^(-z))]
      = σ(z) · (1 - σ(z))
```

**Verify số:** tại $z = 0$, $\sigma(0) = 0{,}5$, nên $\sigma'(0) = 0{,}5 \cdot 0{,}5 = 0{,}25$. Đó cũng chính là độ dốc tại điểm uốn — dốc nhất.

> ⚠ **Lỗi thường gặp**  
> "Sigmoid đạo hàm là $\sigma(z) \cdot (1-z)$." Sai — phải là $\sigma(z) \cdot (1 - \sigma(z))$. Cả hai factor đều là $\sigma$, không phải $z$.

### 2.4 Gradient saturation — mặt trái của sigmoid

Khi $z = 10$, $\sigma(z) \approx 0{,}99995$, gradient $\sigma'(z) \approx 0{,}0000454$. Khi $z = -10$, gradient cũng $\approx 4{,}5 \times 10^{-5}$.

Hậu quả: nếu $w^\top x + b$ rất lớn (model rất tự tin), gradient gần $0$ → cập nhật chậm. Đây là một lý do tại sao **deep networks** không dùng sigmoid ở hidden layer (dùng ReLU thay), nhưng vẫn dùng ở **output** cho bài binary.

> 🔁 **Dừng lại tự kiểm tra**  
> Cho $z = 2$. Tính $\sigma(z)$ và $\sigma'(z)$.  
> <details><summary>Đáp án</summary>  
> $e^{-2} \approx 0{,}1353$, $1 + e^{-2} \approx 1{,}1353$, $\sigma(2) \approx 1/1{,}1353 \approx 0{,}8808$.  
> $\sigma'(2) = 0{,}8808 \cdot (1 - 0{,}8808) = 0{,}8808 \cdot 0{,}1192 \approx 0{,}1050$.  
> </details>

### 2.5 Tóm tắt mục 2

📝 **Mục 2 — Sigmoid**

- $\sigma(z) = \dfrac{1}{1+e^{-z}}$ map $\mathbb{R} \to (0, 1)$, đơn điệu, đối xứng quanh $(0, 0{,}5)$.
- Đạo hàm cực gọn: $\sigma'(z) = \sigma(z) \cdot (1 - \sigma(z))$ — quan trọng cho gradient.
- Saturation: gradient gần 0 ở hai đầu — lý do không dùng sigmoid ở hidden layer của deep nets.

---

## 3. Logistic regression model

### 3.1 Định nghĩa

$$P(y = 1 \mid x; w, b) = \sigma(w^\top x + b)$$

$$P(y = 0 \mid x; w, b) = 1 - \sigma(w^\top x + b)$$

Gọi $z = w^\top x + b$ là **logit** (giá trị tuyến tính trước khi qua sigmoid). Gọi $p = \sigma(z)$ là **predicted probability**.

> 💡 **Trực giác**  
> Bước 1: kết hợp tuyến tính các feature thành một "điểm số" $z$. Score cao → có xu hướng dương.  
> Bước 2: ép score vào khoảng $(0, 1)$ để gọi là xác suất.  
> Toàn bộ "phép thuật" của logistic regression nằm trong bước 2.

### 3.2 Walk-through với 2 features

Lấy lại dataset spam, giả sử ta đã có $w = (-0{,}01, 5{,}0)$ và $b = -0{,}5$. Tính $p$ cho từng email:

| Email | $x_1$ | $x_2$ | $z = -0{,}01 \cdot x_1 + 5 \cdot x_2 - 0{,}5$ | $p = \sigma(z)$ | Dự đoán |
|---:|---:|---:|---:|:---:|:---:|
| 1 | 50 | 0.05 | $-0{,}5 + 0{,}25 - 0{,}5 = -0{,}75$ | $0{,}321$ | 0 |
| 2 | 200 | 0.10 | $-2 + 0{,}5 - 0{,}5 = -2{,}0$ | $0{,}119$ | 0 |
| 3 | 80 | 0.45 | $-0{,}8 + 2{,}25 - 0{,}5 = 0{,}95$ | $0{,}721$ | 1 |
| 4 | 30 | 0.60 | $-0{,}3 + 3{,}0 - 0{,}5 = 2{,}2$ | $0{,}900$ | 1 |
| 5 | 150 | 0.08 | $-1{,}5 + 0{,}4 - 0{,}5 = -1{,}6$ | $0{,}168$ | 0 |
| 6 | 25 | 0.55 | $-0{,}25 + 2{,}75 - 0{,}5 = 2{,}0$ | $0{,}881$ | 1 |

Verify email 4: $e^{-2{,}2} \approx 0{,}1108$, $1 + 0{,}1108 = 1{,}1108$, $1/1{,}1108 \approx 0{,}9002$ ✓.

Tất cả 6 mẫu dự đoán đúng — model tốt.

### 3.3 Decision rule

Mặc định: gán nhãn $1$ nếu $p \geq 0{,}5$, ngược lại $0$. Vì $\sigma(z) \geq 0{,}5 \Leftrightarrow z \geq 0$, quy tắc tương đương:

$$\hat{y} = 1 \text{ nếu } w^\top x + b \geq 0$$

Ngưỡng $0{,}5$ có thể đổi khi cần (vd. y học, fraud detection) — sẽ bàn ở mục 10.

### 3.4 Tóm tắt mục 3

📝 **Mục 3 — Mô hình**

- Logistic regression: $p = \sigma(w^\top x + b)$, output là xác suất $P(y=1|x)$.
- Logit $z = w^\top x + b$ là kết hợp tuyến tính của feature.
- Dự đoán nhãn: $\hat{y} = 1$ nếu $z \geq 0$ (tương đương $p \geq 0{,}5$).

---

## 4. Binary cross-entropy loss — dẫn từ MLE

### 4.1 Phân phối Bernoulli

Mỗi label $y \in \{0, 1\}$ là một biến Bernoulli với tham số $p$:

$$P(y \mid p) = p^y (1-p)^{1-y}$$

Verify hai trường hợp:
- $y = 1$: $P = p^1 \cdot (1-p)^0 = p$ ✓
- $y = 0$: $P = p^0 \cdot (1-p)^1 = 1 - p$ ✓

### 4.2 Likelihood của dataset

Giả sử các mẫu độc lập (i.i.d.). Likelihood là tích:

$$\mathcal{L}(w, b) = \prod_{i=1}^{n} p_i^{y_i} (1 - p_i)^{1 - y_i}, \quad p_i = \sigma(w^\top x_i + b)$$

### 4.3 Log-likelihood

Lấy $\log$ (đơn điệu nên không đổi argmax) để biến tích thành tổng:

$$\log \mathcal{L} = \sum_{i=1}^{n} \left[ y_i \log p_i + (1 - y_i) \log(1 - p_i) \right]$$

### 4.4 Binary cross-entropy loss

Tối đa hóa log-likelihood ↔ tối thiểu hóa **negative log-likelihood** (đổi dấu). Chuẩn hóa theo $n$:

$$\boxed{L(w, b) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log p_i + (1 - y_i) \log(1 - p_i) \right]}$$

Đây chính là **binary cross-entropy** (BCE) đã học ở [Lesson 08 Probability](../../05-Probability/lesson-08-cross-entropy-kl/), áp dụng cho phân phối Bernoulli $(y, 1-y)$ vs $(p, 1-p)$.

### 4.5 4 ví dụ tính loss

Với 1 sample:

| $y$ | $p$ | $L = -y \log p - (1-y) \log(1-p)$ |
|:---:|:---:|:---:|
| $1$ | $0{,}9$ | $-\log 0{,}9 \approx 0{,}1054$ (tốt) |
| $1$ | $0{,}5$ | $-\log 0{,}5 \approx 0{,}6931$ (lưỡng lự) |
| $1$ | $0{,}1$ | $-\log 0{,}1 \approx 2{,}3026$ (rất tệ) |
| $0$ | $0{,}05$ | $-\log 0{,}95 \approx 0{,}0513$ (tốt) |
| $0$ | $0{,}9$ | $-\log 0{,}1 \approx 2{,}3026$ (rất tệ) |

Quan sát: khi model rất tự tin sai ($y=1$ nhưng $p=0{,}01$), loss $\approx 4{,}6$ — rất lớn, đẩy gradient mạnh. Đó là điều ta muốn.

### 4.6 So sánh BCE vs MSE (cho 1 sample, `y = 1`)

| $p$ | $\text{BCE} = -\log p$ | $\text{MSE} = (1-p)^2$ |
|:---:|:---:|:---:|
| $0{,}99$ | $0{,}01005$ | $0{,}0001$ |
| $0{,}9$ | $0{,}1054$ | $0{,}01$ |
| $0{,}5$ | $0{,}6931$ | $0{,}25$ |
| $0{,}1$ | $2{,}3026$ | $0{,}81$ |
| $0{,}01$ | $4{,}6052$ | $0{,}9801$ |
| $0{,}001$ | $6{,}9078$ | $0{,}998$ |

Thấy ngay: BCE đi tới **vô cực** khi $p \to 0$ (chỉ ra: dự đoán xác suất $\approx 0$ cho thứ thực sự là $1$ là **không tha thứ**). MSE bị chặn bởi $1$ — gradient nhỏ ở vùng cực.

> ❓ **Câu hỏi tự nhiên**  
> *"Sao MSE cũng tăng khi sai, nhưng người ta lại nói không tốt?"*  
> Vấn đề là **đạo hàm của MSE** đối với $w$ qua sigmoid có chứa $\sigma'(z) = \sigma(1-\sigma)$, làm gradient biến mất khi $p$ gần $0$ hoặc $1$. BCE triệt tiêu được factor đó (xem mục 5) — nên gradient luôn "đủ to" để học.

### 4.7 Tóm tắt mục 4

📝 **Mục 4 — BCE Loss**

- Bernoulli likelihood $p^y (1-p)^{1-y}$ → log-likelihood → negative → BCE.
- $L = -[y \log p + (1-y) \log(1-p)]$ per sample, trung bình cho dataset.
- BCE phạt mạnh hơn MSE khi sai và có gradient sạch — đó là lý do được dùng mặc định.

---

## 5. Gradient — viên ngọc đơn giản

### 5.1 Mục tiêu

Tính $\partial L / \partial w$ và $\partial L / \partial b$ để chạy gradient descent.

### 5.2 Setup cho 1 sample

Gọi:

- $z = w^\top x + b$
- $p = \sigma(z)$
- $\ell = -y \log p - (1-y) \log(1-p)$

Áp dụng chain rule:

$$\frac{\partial \ell}{\partial w_j} = \frac{\partial \ell}{\partial p} \cdot \frac{\partial p}{\partial z} \cdot \frac{\partial z}{\partial w_j}$$

### 5.3 Tính từng phần

**$\partial \ell / \partial p$:**

$$\frac{\partial \ell}{\partial p} = -\frac{y}{p} + \frac{1-y}{1-p} = \frac{-y(1-p) + (1-y)p}{p(1-p)} = \frac{p - y}{p(1-p)}$$

**$\partial p / \partial z = \sigma'(z) = \sigma(z)(1-\sigma(z)) = p(1-p)$** (từ mục 2.3).

**$\partial z / \partial w_j = x_j$** (vì $z = w_1 x_1 + \ldots + w_d x_d + b$).

### 5.4 Nhân lại — kỳ tích triệt tiêu

$$\frac{\partial \ell}{\partial w_j} = \frac{p - y}{p(1-p)} \cdot p(1-p) \cdot x_j = (p - y) \cdot x_j$$

Factor $p(1-p)$ triệt tiêu — kết quả gọn không thể tin nổi:

$$\boxed{\frac{\partial \ell}{\partial w_j} = (p - y) \cdot x_j}$$

Tương tự:

$$\frac{\partial \ell}{\partial b} = p - y$$

> 💡 **Trực giác**  
> Gradient theo $w_j$ = "sai số $(p - y)$" × "feature $x_j$".
> - Nếu sai số dương ($p > y$, tức model dự đoán cao quá), gradient dương → cập nhật $w_j \mathrel{-}= \eta \cdot (p-y) \cdot x_j$ giảm $w_j$ → kéo $z$ xuống → kéo $p$ xuống.
> - Sai số càng to, cập nhật càng mạnh. Feature càng to (về độ lớn), cập nhật càng mạnh.

### 5.5 Vectorized cho cả dataset

Gọi $X \in \mathbb{R}^{n \times d}$, $y \in \mathbb{R}^n$, $p = \sigma(Xw + b \cdot \mathbf{1})$. Khi đó:

$$\nabla_w L = \frac{1}{n} X^\top (p - y), \quad \frac{\partial L}{\partial b} = \frac{1}{n} \sum_{i=1}^{n} (p_i - y_i)$$

### 5.6 Walk-through tính gradient 1 step

Lấy 4 mẫu đầu, khởi tạo $w = (0, 0)$, $b = 0$:

| i | $x_1$ | $x_2$ | $y$ | $z$ | $p = \sigma(0)$ | $p - y$ |
|---:|---:|---:|:---:|:---:|:---:|:---:|
| 1 | 50 | 0.05 | 0 | 0 | 0.5 | 0.5 |
| 2 | 200 | 0.10 | 0 | 0 | 0.5 | 0.5 |
| 3 | 80 | 0.45 | 1 | 0 | 0.5 | -0.5 |
| 4 | 30 | 0.60 | 1 | 0 | 0.5 | -0.5 |

Gradient theo $w_1$:

```
∂L/∂w₁ = (1/4) · Σ (p_i - y_i) · x₁_i
       = (1/4) · [0.5·50 + 0.5·200 + (-0.5)·80 + (-0.5)·30]
       = (1/4) · [25 + 100 - 40 - 15]
       = (1/4) · 70
       = 17.5
```

Gradient theo $w_2$:

```
∂L/∂w₂ = (1/4) · [0.5·0.05 + 0.5·0.10 + (-0.5)·0.45 + (-0.5)·0.60]
       = (1/4) · [0.025 + 0.05 - 0.225 - 0.30]
       = (1/4) · (-0.45)
       = -0.1125
```

Gradient theo $b$:

```
∂L/∂b = (1/4) · (0.5 + 0.5 - 0.5 - 0.5) = 0
```

Với learning rate $\eta = 0{,}01$:

- $w_1 \leftarrow 0 - 0{,}01 \cdot 17{,}5 = -0{,}175$
- $w_2 \leftarrow 0 - 0{,}01 \cdot (-0{,}1125) = +0{,}001125$
- $b \leftarrow 0$

Hướng đúng: spam có $x_1$ nhỏ ($w_1 < 0$ đẩy $z$ cao khi $x_1$ thấp) và $x_2$ lớn ($w_2 > 0$).

> ⚠ **Lỗi thường gặp**  
> "Gradient của BCE là $-y \log p$." Không — đó là loss. Gradient là $(p-y) \cdot x$. Đừng nhầm hàm và đạo hàm của nó.

### 5.7 Tóm tắt mục 5

📝 **Mục 5 — Gradient**

- Gradient sạch: $\partial L / \partial w = (p-y) \cdot x$, $\partial L / \partial b = p-y$.
- Factor $p(1-p)$ từ $\sigma'$ bị triệt tiêu khi gặp $-y/p + (1-y)/(1-p)$ của log-loss — duyên gặp gỡ của Bernoulli + log.
- Vectorized: $\nabla_w L = \dfrac{1}{n} X^\top(p - y)$.

---

## 6. Training với Gradient Descent

### 6.1 Pseudocode

```
Khởi tạo w = 0, b = 0
Lặp T epoch:
    Tính z = X·w + b
    Tính p = sigmoid(z)
    Tính loss L = -mean(y·log p + (1-y)·log(1-p))
    Tính grad_w = (1/n) · Xᵀ(p - y)
    Tính grad_b = mean(p - y)
    Cập nhật w ← w - η · grad_w
    Cập nhật b ← b - η · grad_b
Trả về w, b
```

Trong NumPy / Go đây là vài chục dòng.

### 6.2 Walk-through 5 step trên 4 mẫu

Dataset:

| i | $x_1$ | $x_2$ | $y$ |
|:-:|:-:|:-:|:-:|
| 1 | 50 | 0.05 | 0 |
| 2 | 200 | 0.10 | 0 |
| 3 | 80 | 0.45 | 1 |
| 4 | 30 | 0.60 | 1 |

Chuẩn hóa: chia $x_1$ cho $100$ để cùng thang. Bộ dataset hiệu dụng:

| i | $x_1'$ | $x_2$ | $y$ |
|:-:|:-:|:-:|:-:|
| 1 | 0.5 | 0.05 | 0 |
| 2 | 2.0 | 0.10 | 0 |
| 3 | 0.8 | 0.45 | 1 |
| 4 | 0.3 | 0.60 | 1 |

Khởi tạo $w = (0, 0)$, $b = 0$, $\eta = 0{,}5$. (Lý do $\eta$ to: bộ data tí hon nên không sợ vọt.)

**Step 0 (init):** $p = (0{,}5, 0{,}5, 0{,}5, 0{,}5)$, $\text{loss} = -\text{mean}(0+0+\log 0{,}5+\log 0{,}5) \cdot \ldots = 0{,}693$.

**Step 1:**
- $p - y = (0{,}5, 0{,}5, -0{,}5, -0{,}5)$.
- $\text{grad}_{w_1} = \frac{1}{4}(0{,}5 \cdot 0{,}5 + 0{,}5 \cdot 2 + (-0{,}5) \cdot 0{,}8 + (-0{,}5) \cdot 0{,}3) = \frac{1}{4}(0{,}25+1{,}0-0{,}4-0{,}15) = \frac{1}{4} \cdot 0{,}70 = 0{,}175$.
- $\text{grad}_{w_2} = \frac{1}{4}(0{,}5 \cdot 0{,}05 + 0{,}5 \cdot 0{,}10 + (-0{,}5) \cdot 0{,}45 + (-0{,}5) \cdot 0{,}60) = \frac{1}{4}(-0{,}45) = -0{,}1125$.
- $\text{grad}_b = 0$.
- $w_1 \leftarrow -0{,}0875$, $w_2 \leftarrow +0{,}0563$, $b \leftarrow 0$.

**Step 2:**
- $z = w_1 \cdot x_1 + w_2 \cdot x_2$:
  - i=1: $-0{,}0875 \cdot 0{,}5 + 0{,}0563 \cdot 0{,}05 = -0{,}0438 + 0{,}0028 = -0{,}0410$ → $p \approx 0{,}4898$
  - i=2: $-0{,}0875 \cdot 2{,}0 + 0{,}0563 \cdot 0{,}10 = -0{,}175 + 0{,}0056 = -0{,}1694$ → $p \approx 0{,}4578$
  - i=3: $-0{,}0875 \cdot 0{,}8 + 0{,}0563 \cdot 0{,}45 = -0{,}0700 + 0{,}0253 = -0{,}0447$ → $p \approx 0{,}4888$
  - i=4: $-0{,}0875 \cdot 0{,}3 + 0{,}0563 \cdot 0{,}60 = -0{,}0263 + 0{,}0338 = 0{,}0075$ → $p \approx 0{,}5019$
- $p - y = (0{,}4898, 0{,}4578, -0{,}5112, -0{,}4981)$.
- $\text{grad}_{w_1} = \frac{1}{4}(0{,}4898 \cdot 0{,}5 + 0{,}4578 \cdot 2{,}0 - 0{,}5112 \cdot 0{,}8 - 0{,}4981 \cdot 0{,}3) = \frac{1}{4}(0{,}2449+0{,}9156-0{,}4090-0{,}1494) = \frac{1}{4} \cdot 0{,}6021 = 0{,}1505$.
- $\text{grad}_{w_2} = \frac{1}{4}(0{,}4898 \cdot 0{,}05 + 0{,}4578 \cdot 0{,}10 - 0{,}5112 \cdot 0{,}45 - 0{,}4981 \cdot 0{,}60) = \frac{1}{4}(0{,}0245+0{,}0458-0{,}2300-0{,}2989) = \frac{1}{4} \cdot (-0{,}4586) = -0{,}1147$.
- $\text{grad}_b = \frac{1}{4}(0{,}4898+0{,}4578-0{,}5112-0{,}4981) = \frac{1}{4} \cdot (-0{,}0617) = -0{,}0154$.
- $w_1 \leftarrow -0{,}0875 - 0{,}5 \cdot 0{,}1505 = -0{,}163$, $w_2 \leftarrow 0{,}0563 + 0{,}5 \cdot 0{,}1147 = 0{,}114$, $b \leftarrow 0 + 0{,}5 \cdot 0{,}0154 = 0{,}0077$.

**Step 3 (gọn).**
- $z$ mới: i=1 $-0{,}075$, i=2 $-0{,}314$, i=3 $-0{,}079$, i=4 $0{,}027$.
- $p$: $0{,}4813, 0{,}4222, 0{,}4803, 0{,}5067$.
- Loss $\approx -\text{mean}(\log 0{,}5187 + \log 0{,}5778 + \log 0{,}4803 + \log 0{,}5067) = \ldots \approx 0{,}6766$.
- Gradient và cập nhật tương tự... $w$ tiến dần về hướng tách đúng spam.

**Sau 200 step ($\eta = 0{,}5$):** $w_1 \approx -2{,}3$, $w_2 \approx 9{,}1$, $b \approx -0{,}5$. Loss $\approx 0{,}08$, mọi mẫu phân đúng với $p$ xa $0{,}5$.

(Số chính xác phụ thuộc seed; xem viz để tự chạy.)

> 🔁 **Dừng lại tự kiểm tra**  
> Tại step 1 ở trên, tại sao $\text{grad}_b = 0$ mặc dù dữ liệu không cân?  
> <details><summary>Đáp án</summary>  
> Trùng hợp vì $\sum(p-y) = 0{,}5+0{,}5-0{,}5-0{,}5 = 0$ với $p$ đồng đều $= 0{,}5$ và $y$ cân bằng. Bước sau khi $p$ lệch sẽ làm $\text{grad}_b \neq 0$.  
> </details>

### 6.3 Tóm tắt mục 6

📝 **Mục 6 — Training**

- Pseudocode 6 dòng: tính $p$, tính $p - y$, tính grad, cập nhật.
- Trên dataset chuẩn hóa, $\eta$ lớn vẫn hội tụ; trên dataset thô, phải nhỏ.
- Walk-through 5 step cho thấy $w$ từ từ "quay" về hướng phân tách đúng.

---

## 7. Decision boundary là một siêu phẳng

### 7.1 Boundary

Quy tắc dự đoán $\hat{y} = 1 \Leftrightarrow p \geq 0{,}5 \Leftrightarrow \sigma(w^\top x + b) \geq 0{,}5 \Leftrightarrow w^\top x + b \geq 0$.

**Decision boundary** là tập hợp $\{x : w^\top x + b = 0\}$ — đây là một **siêu phẳng** (hyperplane) trong $\mathbb{R}^d$:

- $d = 2$: đường thẳng.
- $d = 3$: mặt phẳng.
- $d \geq 4$: hyperplane (không vẽ được).

### 7.2 Ví dụ với spam (`d = 2`)

Với $w = (-0{,}01, 5{,}0)$, $b = -0{,}5$, boundary:

```
-0.01·x₁ + 5·x₂ - 0.5 = 0
⇔ x₂ = (0.5 + 0.01·x₁) / 5
⇔ x₂ = 0.1 + 0.002·x₁
```

Tại $x_1 = 0$, boundary cắt trục $x_2$ tại $0{,}1$. Slope $0{,}002$ rất nhỏ → đường gần ngang. Spam (in hoa nhiều, $x_2 > 0{,}1+0{,}002\, x_1$) nằm phía trên.

### 7.3 Vì sao gọi "linear classifier"

Vì boundary là **tuyến tính theo $x$**. Logistic regression không thể tách dữ liệu mà boundary phải cong (vd. circle XOR). Để vượt qua giới hạn này, ta cần:

1. **Feature engineering**: thêm $x_1^2, x_1 x_2, \ldots$ rồi vẫn dùng logistic.
2. **Kernel methods** (SVM kernel).
3. **Neural networks** (lesson 04) — học feature tự động qua hidden layers.

> ⚠ **Lỗi thường gặp**  
> "Logistic regression là phi tuyến vì có sigmoid." Sigmoid biến $z$ thành $p$ phi tuyến, nhưng decision boundary $z = 0$ vẫn là siêu phẳng tuyến tính. Tính phi tuyến chỉ áp lên xác suất, không lên ranh giới quyết định.

### 7.4 Tóm tắt mục 7

📝 **Mục 7 — Boundary**

- Boundary $w^\top x + b = 0$ là hyperplane.
- Logistic regression = linear classifier.
- Muốn boundary cong → phải engineer feature hoặc dùng NN.

---

## 8. Multi-class: Softmax regression

### 8.1 Bài toán

Bây giờ $y \in \{1, 2, \ldots, K\}$. Ví dụ Iris dataset:
- $K = 3$ lớp: Setosa, Versicolor, Virginica.
- $d = 4$ feature: sepal length, sepal width, petal length, petal width.

### 8.2 Từ sigmoid sang softmax

Mỗi lớp $k$ có vector tham số $w_k \in \mathbb{R}^d$ và bias $b_k$. Tính $K$ logit:

$$z_k = w_k^\top x + b_k, \quad k = 1, \ldots, K$$

Softmax biến vector logit $(z_1, \ldots, z_K)$ thành phân phối xác suất:

$$P(y = k \mid x) = \frac{e^{z_k}}{\sum_{j=1}^{K} e^{z_j}}$$

> 💡 **Trực giác**  
> Softmax: "ai có logit lớn nhất được phần lớn nhất, nhưng vẫn chia cho cả nhóm để tổng bằng 1." Khi $z$ của một lớp lớn vượt trội, nó "thắng" gần như tuyệt đối.

### 8.3 Verify: softmax bằng sigmoid khi `K = 2`

Cho $K = 2$:

$$P(y=1|x) = \frac{e^{z_1}}{e^{z_1} + e^{z_2}} = \frac{1}{1 + e^{z_2 - z_1}} = \sigma(z_1 - z_2)$$

Đặt $z = z_1 - z_2$ → softmax 2-class = sigmoid. Vậy sigmoid là trường hợp đặc biệt.

### 8.4 4 ví dụ số

| Logits $(z_1, z_2, z_3)$ | $(e^{z_1}, e^{z_2}, e^{z_3})$ | Tổng | Softmax |
|:---:|:---:|:---:|:---:|
| $(2, 1, 0)$ | $(7{,}389, 2{,}718, 1{,}000)$ | $11{,}107$ | $(0{,}665, 0{,}245, 0{,}090)$ |
| $(0, 0, 0)$ | $(1, 1, 1)$ | $3$ | $(0{,}333, 0{,}333, 0{,}333)$ |
| $(5, 1, 0)$ | $(148{,}4, 2{,}718, 1{,}000)$ | $152{,}1$ | $(0{,}976, 0{,}018, 0{,}007)$ |
| $(-2, 4, 1)$ | $(0{,}135, 54{,}60, 2{,}718)$ | $57{,}45$ | $(0{,}0024, 0{,}9504, 0{,}0473)$ |

Tổng mỗi hàng $= 1$ ✓.

### 8.5 Multi-class cross-entropy

One-hot encode label: nếu $y = k$, $y_{\text{onehot}}$ là vector có $1$ tại vị trí $k$, còn lại $0$.

Loss cho 1 sample:

$$\ell = -\sum_{k=1}^{K} y_k^{\text{onehot}} \log p_k = -\log p_{y_{\text{true}}}$$

Tức là **chỉ phạt xác suất gán cho lớp đúng** (vì các $y_k$ khác đều $= 0$).

### 8.6 Walk-through Iris 3-class

Mẫu Versicolor ($y = 2$), giả sử logits $(1{,}5, 3{,}2, 0{,}5)$:

- $e^{1{,}5} = 4{,}482$, $e^{3{,}2} = 24{,}53$, $e^{0{,}5} = 1{,}649$.
- Tổng $= 30{,}66$.
- $p = (0{,}146, 0{,}800, 0{,}054)$.
- Lớp đúng là 2, loss $= -\log 0{,}800 = 0{,}2231$.

Nếu model sai (logits $(3{,}2, 1{,}5, 0{,}5)$):

- $p = (0{,}800, 0{,}146, 0{,}054)$.
- Lớp đúng là 2 → loss $= -\log 0{,}146 = 1{,}923$.

Sai → loss to gấp ~8.6 lần. Đúng tinh thần.

### 8.7 Gradient cho softmax + cross-entropy

Phép kỳ tích triệt tiêu (tương tự sigmoid) cho:

$$\frac{\partial \ell}{\partial z_k} = p_k - y_k^{\text{onehot}}$$

Vector hóa: $\partial \ell / \partial z = p - y_{\text{onehot}}$. Sau đó $\partial \ell / \partial w_k = (p_k - y_k^{\text{onehot}}) \cdot x$.

> ❓ **Câu hỏi tự nhiên**  
> *"Cả $K$ weight vector song song — không trùng nhau à?"*  
> Có dư thừa: dịch tất cả $z_k$ cùng một hằng số không thay đổi $p$ (cộng cùng $C$ trên tử và mẫu tự triệt). Trong thực tế người ta giữ nguyên cho đơn giản hoặc fix $w_K = 0$ để bỏ dư.

### 8.8 Tóm tắt mục 8

📝 **Mục 8 — Softmax**

- Multi-class: $K$ logit, softmax chia chuẩn hóa thành phân phối.
- Sigmoid = softmax 2-class.
- Cross-entropy loss $= -\log p$ của lớp đúng. Gradient theo $z$ vẫn là $p - y_{\text{onehot}}$.

---

## 9. Đánh giá model classification

### 9.1 Confusion matrix (binary)

Với threshold $\tau$ (mặc định $0{,}5$):

|  | Dự đoán 1 | Dự đoán 0 |
|---|:-:|:-:|
| Thực tế 1 | **TP** (true positive) | FN (false negative) |
| Thực tế 0 | FP (false positive) | **TN** (true negative) |

### 9.2 4 metric chính (cùng 1 ví dụ)

Giả sử 100 email: 30 spam, 70 ham. Model với $\tau = 0{,}5$ cho:

- TP = 24 (spam đoán đúng)
- FN = 6 (spam đoán nhầm thành ham)
- FP = 5 (ham đoán nhầm thành spam)
- TN = 65 (ham đoán đúng)

| Metric | Công thức | Số | Ý nghĩa |
|--------|-----------|:--:|----------|
| **Accuracy** | $\dfrac{\text{TP}+\text{TN}}{\text{total}}$ | $89/100 = 0{,}89$ | tỉ lệ đúng tổng thể |
| **Precision** | $\dfrac{\text{TP}}{\text{TP}+\text{FP}}$ | $24/29 \approx 0{,}828$ | trong số "gán spam", bao nhiêu đúng |
| **Recall** | $\dfrac{\text{TP}}{\text{TP}+\text{FN}}$ | $24/30 = 0{,}80$ | trong số spam thật, bao nhiêu bắt được |
| **F1** | $\dfrac{2 \cdot P \cdot R}{P+R}$ | $2 \cdot 0{,}828 \cdot 0{,}80 / 1{,}628 \approx 0{,}814$ | trung bình hài giữa P và R |

> ⚠ **Lỗi thường gặp**  
> "Accuracy 99% là model tốt." Sai khi dữ liệu mất cân bằng. Nếu 99% mẫu là class âm, model "luôn đoán 0" cũng đạt 99% accuracy mà không bắt được trường hợp dương nào ($\text{recall} = 0$).

### 9.3 Precision vs Recall trade-off

Tăng $\tau$ (nghiêm khắc hơn) → ít gán dương → precision tăng, recall giảm. Giảm $\tau$ → ngược lại.

- **Medical screening** (sàng lọc bệnh): ưu tiên **recall cao** — không được bỏ sót.
- **Spam filter**: ưu tiên **precision cao** — không được oan email quan trọng.

### 9.4 ROC curve và AUC

Khi $\tau$ quét từ $0$ đến $1$, ta vẽ điểm $(\text{FPR}, \text{TPR})$:

- $\text{TPR} = \text{recall} = \dfrac{\text{TP}}{\text{TP}+\text{FN}}$
- $\text{FPR} = \dfrac{\text{FP}}{\text{FP}+\text{TN}}$ (false positive rate)

Tại $\tau = 1$: TPR = 0, FPR = 0 (không gán dương cho ai).  
Tại $\tau = 0$: TPR = 1, FPR = 1 (gán dương cho mọi mẫu).

Đường nối các điểm là **ROC curve**.

**AUC** (area under curve) $\in [0, 1]$:

- $\text{AUC} = 1$: phân tách hoàn hảo.
- $\text{AUC} = 0{,}5$: random.
- $\text{AUC} < 0{,}5$: tệ hơn random (đảo nhãn là tốt hơn).

> 💡 **Trực giác AUC**  
> AUC = xác suất mà model gán logit cao hơn cho 1 mẫu dương ngẫu nhiên so với 1 mẫu âm ngẫu nhiên.  
> AUC $= 0{,}92$ nghĩa là "trong 92% cặp (dương, âm), model đoán đúng cái dương có xác suất cao hơn".

### 9.5 4 ví dụ AUC

| Model | TPR @ FPR=0.05 | TPR @ FPR=0.5 | AUC |
|-------|:-:|:-:|:-:|
| Hoàn hảo | 1.00 | 1.00 | 1.00 |
| Tốt | 0.70 | 0.95 | 0.92 |
| Khá | 0.40 | 0.80 | 0.75 |
| Random | 0.05 | 0.50 | 0.50 |

### 9.6 Tóm tắt mục 9

📝 **Mục 9 — Đánh giá**

- Confusion matrix 2×2 là gốc — mọi metric khác đều rút ra từ đây.
- Accuracy ổn khi data cân, dùng F1 hoặc AUC khi mất cân bằng.
- ROC quét threshold, AUC tổng kết hiệu năng ngang thresholds.

---

## 10. Liên hệ với Neural Networks

### 10.1 Logistic regression = NN 1 lớp

Cấu trúc logistic regression:

```
x (input vector d-d)
    ↓ (dot product with w + b)
z (scalar logit)
    ↓ (sigmoid)
p ∈ (0, 1)
```

Đây chính là **một neuron** với activation $\sigma$. Không có hidden layer.

### 10.2 Softmax regression = NN 1 lớp, K output

```
x ─▶ [w₁ᵀx + b₁, ..., w_Kᵀx + b_K] ─▶ softmax ─▶ p ∈ Δ^(K-1)
```

Vẫn 1 lớp — không có hidden.

### 10.3 Vì sao NN mạnh hơn

NN thêm **hidden layer**:

```
x ─▶ Linear ─▶ ReLU ─▶ Linear ─▶ ReLU ─▶ ... ─▶ Linear ─▶ softmax
```

Mỗi linear-then-activation học **một mức trừu tượng** của feature. Logistic chỉ tổ hợp tuyến tính x — NN học được feature phi tuyến tự động.

### 10.4 Sigmoid/softmax vẫn ngự trị ở output

Hidden layer hiện đại dùng ReLU/GELU (tránh saturation). Nhưng **output cho classification** vẫn là sigmoid (binary) hoặc softmax (multi-class) — vì ta cần xác suất.

Hệ quả: BCE/cross-entropy vẫn là loss chuẩn cho mọi classification head, dù model là logistic, ResNet, hay Transformer.

> 💡 **Trực giác chuyển tiếp lesson 04**  
> "NN 1 hidden layer = chồng nhiều logistic regression lên nhau qua một activation phi tuyến, rồi gộp lại bằng một logistic nữa." Lesson 04 sẽ chính thức hóa.

### 10.5 Tóm tắt mục 10

📝 **Mục 10 — NN**

- Logistic = NN không hidden, output sigmoid. Softmax regression = NN không hidden, output softmax.
- Hidden layer cho phép học feature phi tuyến → tăng sức biểu diễn.
- Sigmoid/softmax + cross-entropy là combo chuẩn của mọi classification head, kể cả deep model.

---

## 11. Bài tập

### Bài 1 — Tính sigmoid và đạo hàm

a) Tính $\sigma(z)$ cho $z \in \{-4, -1, 0, 2, 5\}$.  
b) Tính $\sigma'(z)$ cho cùng các $z$.  
c) Tại $z$ nào $\sigma'$ đạt cực đại?

### Bài 2 — Logistic regression 1 feature

Cho $w = 2$, $b = -3$, $x \in \{0, 1, 1{,}5, 2, 3\}$:

a) Tính $z$ và $p = \sigma(z)$ cho từng $x$.  
b) Với threshold $0{,}5$, nhãn nào được gán?  
c) Tại $x$ nào model "lưỡng lự nhất"?

### Bài 3 — Tính BCE loss

Dataset 5 mẫu $(y, p)$:
1. $(1, 0{,}9)$
2. $(0, 0{,}2)$
3. $(1, 0{,}4)$
4. $(0, 0{,}7)$
5. $(1, 0{,}95)$

Tính:
a) Loss của từng mẫu.  
b) Loss trung bình $L = \dfrac{1}{5} \sum \ell_i$.  
c) Mẫu nào model sai nặng nhất?

### Bài 4 — Gradient cho 1 step

Cho 3 mẫu $(x, y)$: $((1, 2), 1)$, $((2, 1), 0)$, $((0{,}5, 1{,}5), 1)$. Khởi tạo $w = (0, 0)$, $b = 0$, $\eta = 0{,}5$.

a) Tính $p$ cho từng mẫu.  
b) Tính $\text{grad}_w$ và $\text{grad}_b$.  
c) Cập nhật $w$ và $b$ sau 1 step.

### Bài 5 — Softmax

Logits $(z_1, z_2, z_3) = (2, 0, -1)$:

a) Tính $p_1, p_2, p_3$.  
b) Nếu lớp đúng là 1, tính cross-entropy loss.  
c) Cho biết $\partial \ell / \partial z_k$ cho từng $k$.

### Bài 6 — Confusion matrix và AUC

Model trả về điểm số cho 6 mẫu. Đã sort giảm theo score:

| Mẫu | Score | Label thật |
|:-:|:-:|:-:|
| A | 0.95 | 1 |
| B | 0.85 | 1 |
| C | 0.70 | 0 |
| D | 0.55 | 1 |
| E | 0.40 | 0 |
| F | 0.20 | 0 |

a) Tính confusion matrix với $\tau = 0{,}5$.  
b) Tính precision, recall, F1.  
c) Tính AUC bằng định nghĩa (số cặp $(\text{dương}, \text{âm})$ model rank đúng / tổng cặp).

---

## 12. Lời giải chi tiết

### Lời giải Bài 1

a) Sigmoid:

| $z$ | $e^{-z}$ | $\sigma(z)$ |
|---:|:---:|:---:|
| $-4$ | $54{,}60$ | $1/55{,}60 \approx 0{,}01799$ |
| $-1$ | $2{,}718$ | $1/3{,}718 \approx 0{,}2689$ |
| $0$ | $1$ | $0{,}5$ |
| $2$ | $0{,}1353$ | $1/1{,}1353 \approx 0{,}8808$ |
| $5$ | $0{,}00674$ | $1/1{,}00674 \approx 0{,}9933$ |

b) Đạo hàm $\sigma'(z) = \sigma(z) \cdot (1-\sigma(z))$:

| $z$ | $\sigma(z)$ | $1-\sigma(z)$ | $\sigma'(z)$ |
|---:|:---:|:---:|:---:|
| $-4$ | $0{,}01799$ | $0{,}9820$ | $0{,}01767$ |
| $-1$ | $0{,}2689$ | $0{,}7311$ | $0{,}1966$ |
| $0$ | $0{,}5$ | $0{,}5$ | $0{,}25$ |
| $2$ | $0{,}8808$ | $0{,}1192$ | $0{,}1050$ |
| $5$ | $0{,}9933$ | $0{,}00674$ | $0{,}006693$ |

c) Cực đại tại $z = 0$. Lý do: $\sigma'(z) = \sigma(1-\sigma)$, với $\sigma \in (0,1)$ thì $\sigma(1-\sigma)$ cực đại khi $\sigma = 0{,}5 \Leftrightarrow z = 0$.

### Lời giải Bài 2

a) $z = 2x - 3$:

| $x$ | $z$ | $e^{-z}$ | $p = \sigma(z)$ |
|---:|---:|:---:|:---:|
| $0$ | $-3$ | $20{,}09$ | $0{,}0474$ |
| $1$ | $-1$ | $2{,}718$ | $0{,}2689$ |
| $1{,}5$ | $0$ | $1$ | $0{,}5$ |
| $2$ | $1$ | $0{,}3679$ | $0{,}7311$ |
| $3$ | $3$ | $0{,}0498$ | $0{,}9526$ |

b) Nhãn (threshold 0.5): $0, 0$, lưỡng lự, $1, 1$.

c) Lưỡng lự nhất tại $x = 1{,}5$ (vì $p = 0{,}5$ đúng tại boundary $z = 0$).

### Lời giải Bài 3

a) $\ell = -y \log p - (1-y) \log(1-p)$:

| i | $y$ | $p$ | $\ell$ |
|:-:|:-:|:-:|---:|
| 1 | 1 | 0.9 | $-\log 0{,}9 = 0{,}1054$ |
| 2 | 0 | 0.2 | $-\log 0{,}8 = 0{,}2231$ |
| 3 | 1 | 0.4 | $-\log 0{,}4 = 0{,}9163$ |
| 4 | 0 | 0.7 | $-\log 0{,}3 = 1{,}2040$ |
| 5 | 1 | 0.95 | $-\log 0{,}95 = 0{,}0513$ |

b) $L = (0{,}1054 + 0{,}2231 + 0{,}9163 + 1{,}2040 + 0{,}0513)/5 = 2{,}5001/5 = 0{,}5000$.

c) Mẫu 4: $y = 0$ nhưng $p = 0{,}7$ — sai và tự tin cao, loss $= 1{,}204$ lớn nhất.

### Lời giải Bài 4

a) $w = (0, 0)$, $b = 0$ → $z = 0$ mọi mẫu → $p = 0{,}5$.

b) $p - y$:

| i | $x$ | $y$ | $p$ | $p - y$ |
|:-:|:-:|:-:|:-:|:-:|
| 1 | (1, 2) | 1 | 0.5 | -0.5 |
| 2 | (2, 1) | 0 | 0.5 | 0.5 |
| 3 | (0.5, 1.5) | 1 | 0.5 | -0.5 |

$\text{grad}_{w_1} = \frac{1}{3}(-0{,}5 \cdot 1 + 0{,}5 \cdot 2 + (-0{,}5) \cdot 0{,}5) = \frac{1}{3}(-0{,}5 + 1{,}0 - 0{,}25) = \frac{1}{3} \cdot 0{,}25 = 0{,}0833$.

$\text{grad}_{w_2} = \frac{1}{3}(-0{,}5 \cdot 2 + 0{,}5 \cdot 1 + (-0{,}5) \cdot 1{,}5) = \frac{1}{3}(-1 + 0{,}5 - 0{,}75) = \frac{1}{3} \cdot (-1{,}25) = -0{,}4167$.

$\text{grad}_b = \frac{1}{3}(-0{,}5 + 0{,}5 - 0{,}5) = -0{,}1667$.

c) Cập nhật:

- $w_1 \leftarrow 0 - 0{,}5 \cdot 0{,}0833 = -0{,}0417$
- $w_2 \leftarrow 0 - 0{,}5 \cdot (-0{,}4167) = 0{,}2083$
- $b \leftarrow 0 - 0{,}5 \cdot (-0{,}1667) = 0{,}0833$

Quan sát: $w_2 > 0$ to nhất — model học rằng $x_2$ cao gắn với $y = 1$ (vì mẫu 1 và 3 có $x_2$ lớn và $y = 1$).

### Lời giải Bài 5

a) Softmax $(2, 0, -1)$:
- $e^2 = 7{,}389$, $e^0 = 1$, $e^{-1} = 0{,}3679$.
- Tổng $= 8{,}757$.
- $p_1 = 7{,}389/8{,}757 = 0{,}8438$.
- $p_2 = 1/8{,}757 = 0{,}1142$.
- $p_3 = 0{,}3679/8{,}757 = 0{,}0420$.

Verify: $0{,}8438 + 0{,}1142 + 0{,}0420 = 1{,}0000$ ✓.

b) Lớp đúng = 1, loss $= -\log p_1 = -\log 0{,}8438 = 0{,}1700$.

c) $\partial \ell / \partial z_k = p_k - y_k^{\text{onehot}}$. Với $y_{\text{onehot}} = (1, 0, 0)$:
- $\partial \ell / \partial z_1 = 0{,}8438 - 1 = -0{,}1562$
- $\partial \ell / \partial z_2 = 0{,}1142 - 0 = 0{,}1142$
- $\partial \ell / \partial z_3 = 0{,}0420 - 0 = 0{,}0420$

(Verify: tổng $= 0$ vì softmax có ràng buộc $\sum p = 1 \Rightarrow$ gradient theo $z$ tổng $= 0$.)

### Lời giải Bài 6

a) $\tau = 0{,}5$: A, B, C, D dự đoán 1; E, F dự đoán 0.

| Thực | A=1, B=1, C=0, D=1 đoán 1 | E=0, F=0 đoán 0 |
|---|:-:|:-:|
| Spam thật (A, B, D) | TP = 3 | FN = 0 |
| Không spam thật (C, E, F) | FP = 1 | TN = 2 |

b)
- Precision $= 3/(3+1) = 0{,}75$.
- Recall $= 3/(3+0) = 1{,}0$.
- F1 $= 2 \cdot 0{,}75 \cdot 1{,}0/(0{,}75+1{,}0) = 1{,}5/1{,}75 = 0{,}857$.

c) AUC bằng định nghĩa: đếm số cặp $(\text{dương}, \text{âm})$ mà model rank đúng (dương > âm).

Cặp dương = {A, B, D}, âm = {C, E, F}. Tổng cặp $= 3 \cdot 3 = 9$.

Scores: A(0.95), B(0.85), D(0.55) dương; C(0.70), E(0.40), F(0.20) âm.

| Cặp (dương, âm) | score dương > score âm? |
|---|:-:|
| (A=0.95, C=0.70) | ✓ |
| (A=0.95, E=0.40) | ✓ |
| (A=0.95, F=0.20) | ✓ |
| (B=0.85, C=0.70) | ✓ |
| (B=0.85, E=0.40) | ✓ |
| (B=0.85, F=0.20) | ✓ |
| (D=0.55, C=0.70) | ✗ |
| (D=0.55, E=0.40) | ✓ |
| (D=0.55, F=0.20) | ✓ |

8/9 đúng → AUC $= 8/9 \approx 0{,}889$. Model gần như hoàn hảo, chỉ thua ở cặp $(D, C)$ vì C có score cao hơn D.

---

## 13. Liên hệ và bài tiếp theo

- **Bài trước**: [Lesson 02 — Linear Regression](../lesson-02-linear-regression/) — cùng pipeline (model, loss, gradient, GD), khác là output là số thực.
- **Bài tiếp**: [Lesson 04 — Neural Network](../lesson-04-neural-network/) — chồng nhiều logistic + activation phi tuyến lên nhau, học feature tự động.
- **Lý thuyết loss**: [Cross-entropy + KL](../../05-Probability/lesson-08-cross-entropy-kl/) — gốc gác BCE từ Bernoulli + KL divergence.
- **Gradient descent tổng quát**: [Linear regression](../lesson-02-linear-regression/) — đã được giới thiệu chi tiết ở Tầng 6 Lesson 02.
- **Visualization**: [`./visualization.html`](./visualization.html) — kéo data point, slider threshold, xem ROC chuyển động.

---

📝 **Tóm tắt cả bài**

1. Linear regression không hợp cho binary classification — cần sigmoid để ép output vào $(0,1)$.
2. Sigmoid $\sigma(z)$ có đạo hàm cực gọn $\sigma(1-\sigma)$ — chìa khóa cho gradient sạch.
3. Mô hình logistic: $p = \sigma(w^\top x + b)$. Loss = binary cross-entropy = negative log-likelihood của Bernoulli.
4. Gradient $(p - y) \cdot x$ — đẹp như mơ vì $p(1-p)$ của $\sigma'$ và $-y/p + (1-y)/(1-p)$ của log-loss triệt tiêu nhau.
5. Decision boundary là hyperplane → logistic là linear classifier.
6. Multi-class: softmax + cross-entropy, gradient vẫn $p - y_{\text{onehot}}$.
7. Đánh giá: confusion matrix → precision, recall, F1; ROC quét threshold → AUC.
8. Logistic = NN 1 layer; lesson 04 sẽ chồng nhiều layer lên để học phi tuyến.
