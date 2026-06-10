// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/01-Foundations/lesson-02-linear-regression/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Linear Regression

> Mô hình ML đầu tiên, đơn giản nhất, nhưng là *building block* của mọi thứ sau này. Hiểu kỹ Lesson này = hiểu được 70% NN, logistic regression, và phần lớn các loss-based model.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Phát biểu được bài toán linear regression dưới dạng *univariate* và *multivariate* ($y = Xw + b$).
- Giải thích **tại sao MSE** là loss "tự nhiên" — không phải tùy chọn, mà rơi ra từ MLE với Gaussian noise.
- Tính được **closed-form Normal Equation** $w^* = (X^\\top X)^{-1} X^\\top y$ từng bước với ma trận thực.
- Cài đặt **gradient descent** cho linear regression: đạo hàm, update rule, pseudocode.
- Trả lời câu hỏi "**khi nào** dùng closed-form, **khi nào** dùng GD" — không bao giờ "tùy thích".
- Thêm **regularization** (Ridge L2, Lasso L1) và hiểu tại sao Lasso tạo sparse weights.
- Đánh giá model bằng R², MSE, MAE — biết hạn chế của từng metric.
- Nhìn linear regression dưới góc nhìn ML thật: nó **là** một neural network 0-hidden-layer + linear activation.

## Kiến thức tiền đề

Trước khi đọc bài này, bạn cần nắm vững:

- [Tầng 4 — Linear Algebra](../../04-LinearAlgebra/): vector, ma trận, phép nhân ma trận, nghịch đảo, hệ phương trình.
  - Đặc biệt: [Lesson 05 — Ma trận](../../04-LinearAlgebra/lesson-05-matrices/) và [Lesson 08 — PCA/SVD](../../04-LinearAlgebra/lesson-08-pca-svd/) (SVD dùng để giải normal equation cho ma trận ill-conditioned).
- [Tầng 3 — Calculus](../../03-Calculus/), đặc biệt [Lesson 07 — Gradient Descent](../../03-Calculus/lesson-07-gradient-descent/): đạo hàm riêng, gradient, update rule $w \\leftarrow w - \\eta \\cdot \\nabla L$.
- [Tầng 5 — Probability](../../05-Probability/), đặc biệt [Lesson 07 — MLE](../../05-Probability/lesson-07-mle/): maximum likelihood + Gaussian distribution.
- [Lesson 01 — Pipeline ML end-to-end](../lesson-01-ml-pipeline/) (cùng tầng): để hiểu vị trí của linear regression trong pipeline \`data → feature → model → loss → train → evaluate\`.

---

## 1. Bài toán đặt ra

### 1.1. Câu hỏi mở bài

Bạn có dữ liệu giá nhà:

| Diện tích (m²) | Giá (tỷ VND) |
|---:|---:|
| 30 | 1.8 |
| 50 | 2.9 |
| 70 | 3.7 |
| 90 | 4.9 |
| 110 | 5.8 |

Câu hỏi: **một căn 60 m² thì giá khoảng bao nhiêu?**

Trực giác nói "khoảng 3.3 tỷ" — vì giá nhà có vẻ tăng tuyến tính theo diện tích. Linear regression chính là cách **chính thức hoá** trực giác đó: tìm đường thẳng *tốt nhất* xuyên qua các điểm, rồi dùng nó để dự đoán.

> 💡 **Trực giác**: tưởng tượng bạn rải 5 cái đinh trên bảng theo toạ độ (30, 1.8), (50, 2.9), … rồi căng một sợi dây thẳng. Bạn không thể đi qua tất cả các đinh (chúng không thật sự thẳng hàng), nhưng bạn **tìm vị trí dây sao cho tổng khoảng cách từ đinh đến dây là nhỏ nhất**. Sợi dây đó chính là đường hồi quy tuyến tính.

### 1.2. Phát biểu hình thức (univariate)

Cho $n$ cặp $(x_1, y_1), (x_2, y_2), \\ldots, (x_n, y_n)$. Tìm hai số $w$ (slope) và $b$ (intercept) sao cho hàm:

\`\`\`
ŷ = w·x + b
\`\`\`

dự đoán $y$ **tốt nhất** từ $x$. "Tốt nhất" theo nghĩa nào → mục 4 (MSE).

Với bộ giá nhà:
- $x$ là diện tích (input / feature)
- $y$ là giá (output / target / label)
- $\\hat{y} = wx + b$ là giá **dự đoán**
- Residual $r_i = y_i - \\hat{y}_i$ là sai số trên điểm $i$.

> ❓ **Câu hỏi tự nhiên**: tại sao không nội suy đa thức bậc cao đi qua tất cả các điểm? — Vì như vậy sẽ **overfit**: model nhớ data thay vì học quy luật. Đường thẳng đơn giản hơn → tổng quát hoá tốt hơn cho điểm mới ($60 \\text{ m}^2$). Sẽ làm rõ ở mục 9 và Lesson 04 (bias-variance trade-off).

### 1.3. Tổng quát: multivariate

Trong thực tế, giá nhà không chỉ phụ thuộc diện tích. Có thêm: số phòng, tuổi nhà, khoảng cách đến trung tâm, v.v. Mỗi mẫu trở thành **vector feature**:

\`\`\`
x = (x⁽¹⁾, x⁽²⁾, …, x⁽ᵈ⁾)   ∈ ℝᵈ
\`\`\`

Mô hình:

\`\`\`
ŷ = w₁·x⁽¹⁾ + w₂·x⁽²⁾ + … + w_d·x⁽ᵈ⁾ + b
  = w·x + b      (dot product)
\`\`\`

Với $n$ mẫu, gom thành ma trận $X \\in \\mathbb{R}^{n \\times d}$ (mỗi hàng = 1 mẫu, mỗi cột = 1 feature) và vector $y \\in \\mathbb{R}^n$:

\`\`\`
ŷ = X·w + b·𝟙   (𝟙 là vector toàn 1, độ dài n)
\`\`\`

Để gọn, người ta thường **gắn intercept vào w** bằng cách thêm cột 1 vào X:

\`\`\`
X̃ = [1, X]   ∈ ℝⁿˣ⁽ᵈ⁺¹⁾,   w̃ = (b, w₁, …, w_d)ᵀ
⇒ ŷ = X̃·w̃
\`\`\`

Từ đây trong các công thức ta viết $Xw$ ngầm hiểu đã chứa intercept.

> 📝 Vector hoá là *chìa khoá*. Mọi thư viện ML (NumPy, PyTorch, TensorFlow, gonum) đều biểu diễn linear regression dưới dạng $Xw$ để chạy batch trên GPU/SIMD, không bao giờ là vòng \`for\` 1 mẫu 1 lần.

---

## 2. Walk-through multivariate với 3 features

Giả sử ta có 4 căn nhà, mỗi căn có 3 features: **diện tích (m²)**, **số phòng**, **tuổi nhà (năm)**. Mục tiêu dự đoán giá (tỷ VND).

| # | Diện tích | Số phòng | Tuổi | Giá thật |
|---|---:|---:|---:|---:|
| 1 | 50 | 2 | 10 | 2.8 |
| 2 | 80 | 3 | 5  | 4.6 |
| 3 | 60 | 2 | 20 | 2.5 |
| 4 | 100| 4 | 2  | 6.0 |

Ma trận thiết kế (với cột intercept đầu tiên):

\`\`\`
       [ 1   50   2   10 ]            [ 2.8 ]
X̃  =  [ 1   80   3    5 ]    y  =   [ 4.6 ]
       [ 1   60   2   20 ]            [ 2.5 ]
       [ 1  100   4    2 ]            [ 6.0 ]
\`\`\`

Vector tham số: $\\tilde{w} = (b, w_1, w_2, w_3)$. Giả sử tạm $\\tilde{w} = (0{,}5,\\ 0{,}04,\\ 0{,}3,\\ -0{,}02)$. Dự đoán:

\`\`\`
ŷ₁ = 0.5 + 0.04·50 + 0.3·2  + (-0.02)·10 = 0.5 + 2.0 + 0.6 - 0.2 = 2.90
ŷ₂ = 0.5 + 0.04·80 + 0.3·3  + (-0.02)·5  = 0.5 + 3.2 + 0.9 - 0.1 = 4.50
ŷ₃ = 0.5 + 0.04·60 + 0.3·2  + (-0.02)·20 = 0.5 + 2.4 + 0.6 - 0.4 = 3.10
ŷ₄ = 0.5 + 0.04·100+ 0.3·4  + (-0.02)·2  = 0.5 + 4.0 + 1.2 - 0.04= 5.66
\`\`\`

Residuals: $r = y - \\hat{y} = (-0{,}10,\\ 0{,}10,\\ -0{,}60,\\ 0{,}34)$.

Tổng bình phương sai số (chưa chia n):
\`\`\`
Σ rᵢ² = 0.01 + 0.01 + 0.36 + 0.1156 = 0.4956
MSE   = 0.4956 / 4 = 0.1239
\`\`\`

Đây mới là một bộ $\\tilde{w}$ đoán tay. **Bài toán huấn luyện**: tìm $\\tilde{w}$ cho MSE *nhỏ nhất* — mục 5 sẽ giải.

> ❓ Tại sao $w_3 = -0{,}02$ (âm)? — Vì tuổi nhà tăng thì giá thường giảm (nhà cũ rẻ hơn). Dấu của trọng số có ý nghĩa: dương → feature làm tăng y; âm → làm giảm.

> ⚠ **Lỗi thường gặp**: quên chuẩn hoá feature. Diện tích cỡ 50-100, số phòng cỡ 2-4 — chênh nhau ~20 lần. GD sẽ rất chậm hoặc dao động. Xử lý: **standardize** ($(x - \\mu)/\\sigma$) hoặc **min-max scale** trước khi train. Closed-form ít nhạy với scale hơn, nhưng vẫn nên scale để $X^\\top X$ không quá ill-conditioned.

> 🔁 **Tự kiểm tra**: nếu căn nhà thứ 5 có (70 m², 3 phòng, 8 năm), dự đoán giá bằng $\\tilde{w}$ ở trên là bao nhiêu?
> <details><summary>Đáp án</summary>
> $\\hat{y}_5 = 0{,}5 + 0{,}04 \\cdot 70 + 0{,}3 \\cdot 3 + (-0{,}02) \\cdot 8 = 0{,}5 + 2{,}8 + 0{,}9 - 0{,}16 = 4{,}04$ tỷ.
> </details>

---

## 3. MSE Loss — và tại sao là MSE?

### 3.1. Định nghĩa

Mean Squared Error:

\`\`\`
L(w, b) = (1/n) · Σᵢ (yᵢ - ŷᵢ)²
        = (1/n) · ||y - Xw||²
\`\`\`

$\\|\\cdot\\|^2$ là squared L2 norm. Trong dạng ma trận: $L = \\dfrac{1}{n}(y - Xw)^\\top(y - Xw)$.

Tính cụ thể cho dataset mục 2 với $\\tilde{w} = (0{,}5,\\ 0{,}04,\\ 0{,}3,\\ -0{,}02)$:
\`\`\`
L = (0.10² + 0.10² + 0.60² + 0.34²) / 4
  = (0.01 + 0.01 + 0.36 + 0.1156) / 4
  = 0.4956 / 4
  = 0.1239
\`\`\`

### 3.2. Tại sao "**bình phương**"? Tại sao không trị tuyệt đối?

> 💡 **Trực giác**: bình phương phạt sai số lớn nặng hơn — sai 0.6 bị phạt $0{,}36$, sai 0.1 bị phạt $0{,}01$. Khoảng cách giữa 0.1 và 0.6 không phải gấp 6 lần khi tính loss, mà gấp **36 lần**. Model ưu tiên giảm những sai số to → tránh outlier "bị bỏ rơi".

Lý do thứ hai (toán học): bình phương → loss khả vi mọi nơi, đạo hàm liên tục → GD đẹp. Trị tuyệt đối $|\\cdot|$ có điểm gấp tại 0 (đạo hàm không tồn tại), khó tối ưu hơn (mặc dù vẫn có cách — gọi là **MAE loss**, mục 9).

### 3.3. Tại sao là MSE, không phải các luỹ thừa khác (\`r⁴\`, \`r⁶\`,…)?

Đây là phần *quyết định*: MSE **rơi ra một cách tự nhiên** từ MLE với Gaussian noise.

Giả thiết sinh dữ liệu:
\`\`\`
yᵢ = w·xᵢ + b + εᵢ,   εᵢ ~ N(0, σ²)   (Gaussian noise độc lập)
\`\`\`

⇒ $y_i \\mid x_i \\sim N(w \\cdot x_i + b, \\sigma^2)$.

Likelihood của toàn bộ dataset:
\`\`\`
L(w, b) = Πᵢ p(yᵢ | xᵢ) = Πᵢ (1/√(2πσ²)) · exp(-(yᵢ - ŷᵢ)² / (2σ²))
\`\`\`

Log-likelihood (chuyển tích thành tổng):
\`\`\`
ℓ(w, b) = -n/2 · log(2πσ²)  -  (1/(2σ²)) · Σᵢ (yᵢ - ŷᵢ)²
\`\`\`

Số hạng đầu không phụ thuộc $w, b$. Tối đa hoá $\\ell$ ⇔ **tối thiểu hoá** $\\sum_i (y_i - \\hat{y}_i)^2$ ⇔ tối thiểu hoá MSE.

📌 **Kết luận**: chọn MSE *không phải vì tiện*. Chọn MSE = chọn niềm tin "noise quanh đường thẳng có phân phối Gaussian". Nếu noise nặng đuôi (Laplace), MAE sẽ thay thế tự nhiên. Xem lại [Lesson 07 MLE](../../05-Probability/lesson-07-mle/) để rõ tại sao "tối đa likelihood ⇔ tối thiểu loss đúng".

> ❓ **Câu hỏi tự nhiên**:
> - *MSE có đơn vị gì?* Đơn vị bình phương của y. Nếu y là tỷ VND, MSE có đơn vị $(\\text{tỷ VND})^2$ — khó cảm nhận. Thường báo cáo **RMSE** $= \\sqrt{\\text{MSE}}$ (cùng đơn vị y) cho dễ đọc.
> - *MSE có chặn dưới = 0?* Có, đạt được khi và chỉ khi tất cả $y_i = \\hat{y}_i$ (model perfect). Trong thực tế chỉ có khi data nằm đúng trên 1 hyperplane.
> - *MSE có lồi (convex) không?* Có. $L(w)$ là một paraboloid (đa thức bậc 2 theo $w$), luôn lồi → mỗi điểm dừng = minimum toàn cục. Đây là lý do linear regression "đẹp" hơn neural network (loss phi lồi).

### 3.4. Bốn ví dụ số cho MSE

| Dataset $(y, \\hat{y})$ | Residuals | $\\sum r^2$ | MSE |
|---|---|---:|---:|
| $(2, 2), (3, 3), (4, 4)$ | $0, 0, 0$ | 0 | **0.0000** |
| $(2, 2{,}1), (3, 2{,}9), (4, 4{,}2)$ | $-0{,}1,\\ 0{,}1,\\ -0{,}2$ | 0.06 | **0.0200** |
| $(1, 1{,}5), (2, 1{,}0), (3, 2{,}5)$ | $-0{,}5,\\ 1{,}0,\\ 0{,}5$ | 1.50 | **0.5000** |
| $(0, 5), (0, -5)$ | $-5, 5$ | 50 | **25.0000** |

Lưu ý ví dụ cuối: ŷ luôn đoán xa thật → MSE rất lớn. Đường thẳng "tốt nhất" trong trường hợp này sẽ phải đi qua y = 0 (trung bình).

> 📝 **Tóm tắt mục 3**: MSE = trung bình bình phương sai số. Lý do chọn MSE không phải tuỳ ý, mà từ giả thiết Gaussian noise + MLE. MSE lồi → đảm bảo có nghiệm tối ưu duy nhất.

---

## 4. Closed-form: Normal Equation

### 4.1. Dẫn xuất

Loss (gom intercept vào w, bỏ hằng $1/n$ không đổi nghiệm):
\`\`\`
L(w) = (y - Xw)ᵀ(y - Xw)
     = yᵀy - 2·wᵀXᵀy + wᵀXᵀXw
\`\`\`

Đạo hàm theo $w$ (dùng ma trận):
\`\`\`
∂L/∂w = -2·Xᵀy + 2·XᵀXw
\`\`\`

Đặt = 0:
\`\`\`
XᵀXw = Xᵀy
⇒ w* = (XᵀX)⁻¹ · Xᵀy        ← Normal Equation
\`\`\`

Điều kiện: $X^\\top X$ phải khả nghịch — tương đương các **cột của $X$ độc lập tuyến tính** (không có feature dư thừa, tương đương feature khác).

### 4.2. Walk-through với 3 điểm

Dataset (univariate cho dễ tính tay):
\`\`\`
(x₁, y₁) = (1, 2)
(x₂, y₂) = (2, 3)
(x₃, y₃) = (3, 5)
\`\`\`

Thêm cột intercept:
\`\`\`
        [ 1  1 ]              [ 2 ]
X  =    [ 1  2 ]      y  =    [ 3 ]
        [ 1  3 ]              [ 5 ]
\`\`\`

**Bước 1**: tính $X^\\top$:
\`\`\`
Xᵀ = [ 1  1  1 ]
     [ 1  2  3 ]
\`\`\`

**Bước 2**: tính $X^\\top X$ ($2 \\times 3 \\cdot 3 \\times 2 = 2 \\times 2$):
\`\`\`
(XᵀX)₁₁ = 1·1 + 1·1 + 1·1 = 3
(XᵀX)₁₂ = 1·1 + 1·2 + 1·3 = 6
(XᵀX)₂₁ = 1·1 + 2·1 + 3·1 = 6
(XᵀX)₂₂ = 1·1 + 2·2 + 3·3 = 14

⇒ XᵀX = [ 3   6 ]
        [ 6  14 ]
\`\`\`

**Bước 3**: nghịch đảo $X^\\top X$. Với ma trận $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, nghịch đảo $= \\dfrac{1}{\\det}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.
\`\`\`
det = 3·14 - 6·6 = 42 - 36 = 6

(XᵀX)⁻¹ = (1/6) · [ 14  -6 ]
                  [ -6   3 ]
        = [  14/6  -1   ]
          [ -1     1/2  ]
        ≈ [  2.333  -1.000 ]
          [ -1.000   0.500 ]
\`\`\`

**Bước 4**: tính $X^\\top y$:
\`\`\`
Xᵀy = [ 1·2 + 1·3 + 1·5 ]  = [ 10 ]
      [ 1·2 + 2·3 + 3·5 ]    [ 23 ]
\`\`\`

**Bước 5**: nhân $(X^\\top X)^{-1} \\cdot X^\\top y$:
\`\`\`
w*₀ (intercept b) = 14/6·10 + (-1)·23 = 140/6 - 23 = 23.333 - 23 = 0.3333
w*₁ (slope w)     = (-1)·10 + (1/2)·23 = -10 + 11.5 = 1.5000
\`\`\`

⇒ **Đường hồi quy tốt nhất**: $\\hat{y} = 0{,}333 + 1{,}5 \\cdot x$.

**Bước 6**: verify trên dataset:
\`\`\`
ŷ₁ = 0.333 + 1.5·1 = 1.833    (y₁ = 2,  r = 0.167)
ŷ₂ = 0.333 + 1.5·2 = 3.333    (y₂ = 3,  r = -0.333)
ŷ₃ = 0.333 + 1.5·3 = 4.833    (y₃ = 5,  r = 0.167)

Σr² = 0.0279 + 0.1111 + 0.0279 = 0.1667
MSE = 0.1667 / 3 = 0.0556
\`\`\`

Không phải 0 (vì 3 điểm không thẳng hàng), nhưng đây là **MSE thấp nhất có thể** với đường thẳng.

### 4.3. So sánh với khử Gauss

Normal equation $X^\\top X\\, w = X^\\top y$ là **hệ phương trình tuyến tính** với $d+1$ ẩn (nếu kèm intercept). Có thể giải bằng:

- **Nghịch đảo trực tiếp**: $w = (X^\\top X)^{-1} X^\\top y$. Đẹp về lý thuyết, **chậm và mất ổn định số** nếu $X^\\top X$ ill-conditioned.
- **Khử Gauss** (LU decomposition) — xem [Tầng 1 Lesson 08: Hệ phương trình](../../01-Algebra/lesson-08-systems/): giải $Aw = b$ trực tiếp, $O(d^3)$ nhưng tránh nghịch đảo tường minh. Đây là cách thư viện thực tế dùng.
- **QR decomposition / SVD**: phân tích $X = QR$ hoặc $X = U\\Sigma V^\\top$, sau đó giải tránh hoàn toàn $X^\\top X$ (tích này khuếch đại số điều kiện gấp đôi — $\\text{cond}(X^\\top X) = \\text{cond}(X)^2$). Thư viện sản xuất (NumPy \`lstsq\`, gonum) dùng SVD mặc định vì ổn định nhất.

> ⚠ **Lỗi thường gặp**: gọi \`np.linalg.inv(X.T @ X) @ X.T @ y\` trong production. Đúng về toán nhưng dễ nổ số khi $X$ có cột gần thẳng hàng. Dùng \`np.linalg.lstsq(X, y)\` hoặc \`scipy.linalg.lstsq\` — chúng dùng SVD bên trong.

### 4.4. Bốn ví dụ số cho normal equation

| Dataset | $X^\\top X$ | $X^\\top y$ | $w^*$ | Đường |
|---|---|---|---|---|
| $(0,1),(1,3),(2,5)$ | $\\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$ | $[9,13]$ | $b=1, w=2$ | $\\hat{y}=1+2x$ (đi đúng qua data) |
| $(1,2),(2,3),(3,5)$ | $\\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$ | $[10,23]$ | $b=0{,}333, w=1{,}5$ | mục 4.2 |
| $(1,1),(2,2),(3,3),(4,4)$ | $\\begin{bmatrix}4&10\\\\10&30\\end{bmatrix}$ | $[10,30]$ | $b=0, w=1$ | line qua gốc |
| $(0,2),(1,2),(2,2)$ (y hằng) | $\\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$ | $[6,6]$ | $b=2, w=0$ | đường ngang |

> 🔁 **Tự kiểm tra**: cho $(0, 1), (1, 3), (2, 5)$. Đường hồi quy?
> <details><summary>Đáp án</summary>
> $X^\\top X = \\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$, $\\det = 6$, $X^\\top y = [9, 13]$.
> $w = \\dfrac{1}{6}\\begin{bmatrix}5&-3\\\\-3&3\\end{bmatrix}[9,13] = \\dfrac{1}{6}[5 \\cdot 9 - 3 \\cdot 13,\\ -3 \\cdot 9 + 3 \\cdot 13] = \\dfrac{1}{6}[6, 12] = [1, 2]$.
> Đường: $\\hat{y} = 1 + 2x$. Verify: $\\hat{y}_1 = 1, \\hat{y}_2 = 3, \\hat{y}_3 = 5$ — khớp hoàn toàn (vì 3 điểm này thẳng hàng).
> </details>

> 📝 **Tóm tắt mục 4**: Normal equation cho nghiệm chính xác trong 1 phép tính. $O(d^3)$ cho việc nghịch đảo/khử. Production dùng SVD/QR thay vì \`inv()\` để tránh mất ổn định số.

---

## 5. Gradient Descent cho Linear Regression

### 5.1. Tại sao cần GD nếu đã có closed-form?

Closed-form yêu cầu:
1. Tính $X^\\top X$ — $O(n \\cdot d^2)$ thời gian, $O(d^2)$ bộ nhớ.
2. Nghịch đảo (hoặc giải hệ) — $O(d^3)$ thời gian.

Khi $d$ cỡ **vạn** (đặc trưng văn bản TF-IDF, embedding) hoặc $n$ cỡ **triệu** (data lớn), $d^3$ vượt khả năng tính, hoặc $X^\\top X$ không vừa RAM. **GD** chạy $O(\\text{epochs} \\cdot n \\cdot d)$ — tuyến tính theo $d$, cho phép xử lý high-dimensional.

GD cũng là **template chung** cho mọi model phức tạp hơn (logistic, NN, transformer) — closed-form không áp dụng cho các model phi tuyến.

### 5.2. Đạo hàm

Với loss $L(w) = \\dfrac{1}{n}\\|y - Xw\\|^2 = \\dfrac{1}{n}(y - Xw)^\\top(y - Xw)$:

\`\`\`
∂L/∂w = -(2/n) · Xᵀ(y - Xw)
      = (2/n) · Xᵀ(Xw - y)
\`\`\`

Có thể viết dưới dạng tổng từng mẫu:
\`\`\`
∂L/∂w = (2/n) · Σᵢ (ŷᵢ - yᵢ) · xᵢ      (xᵢ là vector hàng feature của mẫu i)
\`\`\`

Trực giác: gradient theo $w_j$ (feature thứ j) tỉ lệ với **tương quan giữa residual và feature j**. Nếu sai dấu nào, push trọng số ngược lại.

### 5.3. Update rule

\`\`\`
w ← w - η · ∂L/∂w
  = w - η · (2/n) · Xᵀ(Xw - y)
\`\`\`

$\\eta$ (eta) là **learning rate**.

### 5.4. Pseudocode (Go-flavored)

\`\`\`go
// Vào: X [n×d], y [n], η, epochs
// Ra:  w [d]

w := make([]float64, d)  // init = 0 (hoặc random nhỏ)
for epoch := 0; epoch < epochs; epoch++ {
    // 1. Dự đoán
    yhat := matVec(X, w)                  // [n]
    // 2. Residual (đảo dấu để thuận update)
    resid := vecSub(yhat, y)              // [n] = ŷ - y
    // 3. Gradient
    grad := scalarVec(2.0/float64(n), matTVec(X, resid))  // [d]
    // 4. Update
    for j := range w { w[j] -= eta * grad[j] }

    if epoch%100 == 0 {
        loss := mse(y, yhat)
        fmt.Printf("epoch=%d  loss=%.6f\\n", epoch, loss)
    }
}
\`\`\`

### 5.5. Walk-through 5 bước GD

Dùng dataset mục 4.2 (3 điểm): nghiệm đúng $b^* = 0{,}333, w^* = 1{,}5$. Bắt đầu từ $(b, w) = (0, 0)$, $\\eta = 0{,}1$, $n = 3$.

Ma trận $X = \\begin{bmatrix}1&1\\\\1&2\\\\1&3\\end{bmatrix}$, $y = [2, 3, 5]$.

**Step 1**:
\`\`\`
ŷ = X·w̃ = [0, 0, 0]
resid = ŷ - y = [-2, -3, -5]
Xᵀ·resid = [ 1·-2 + 1·-3 + 1·-5,  1·-2 + 2·-3 + 3·-5 ] = [-10, -23]
grad = (2/3)·[-10, -23] = [-6.667, -15.333]
w̃ ← [0, 0] - 0.1·[-6.667, -15.333] = [0.667, 1.533]
\`\`\`

**Step 2** ($b = 0{,}667, w = 1{,}533$):
\`\`\`
ŷ = [0.667+1.533·1, 0.667+1.533·2, 0.667+1.533·3] = [2.200, 3.733, 5.267]
resid = ŷ - y = [0.200, 0.733, 0.267]
Xᵀ·resid = [0.200+0.733+0.267, 0.200+1.467+0.800] = [1.200, 2.467]
grad = (2/3)·[1.200, 2.467] = [0.800, 1.644]
w̃ ← [0.667, 1.533] - 0.1·[0.800, 1.644] = [0.587, 1.369]
\`\`\`

**Step 3** ($b = 0{,}587, w = 1{,}369$):
\`\`\`
ŷ = [1.956, 3.324, 4.693]
resid = [-0.044, 0.324, -0.307]
Xᵀ·resid = [-0.027, 0.358]   (≈)
grad = (2/3)·[-0.027, 0.358] ≈ [-0.018, 0.239]
w̃ ← [0.587, 1.369] - 0.1·[-0.018, 0.239] = [0.589, 1.345]
\`\`\`

**Step 4** ($b = 0{,}589, w = 1{,}345$):
\`\`\`
ŷ = [1.935, 3.280, 4.625]
resid = [-0.065, 0.280, -0.375]
Xᵀ·resid ≈ [-0.160, 0.395]
grad ≈ [-0.107, 0.263]
w̃ ≈ [0.600, 1.319]
\`\`\`

**Step 5**:
\`\`\`
b ≈ 0.611, w ≈ 1.305    (đã dao động hội tụ về (0.333, 1.500))
\`\`\`

Chạy đủ ~500 step, $\\tilde{w}$ về đúng $(0{,}333, 1{,}500)$. Vẽ trajectory trên loss landscape — xem visualization.

> ⚠ **Lỗi thường gặp**: $\\eta$ quá lớn → loss nhảy, divergence. $\\eta$ quá nhỏ → hội tụ chậm. Heuristic: thử các giá trị $1, 0{,}1, 0{,}01, 0{,}001$ rồi quan sát loss curve. Hoặc dùng **Adam/RMSprop** (Lesson 04 sẽ giới thiệu) tự động điều chỉnh.

> ❓ **Câu hỏi tự nhiên**:
> - *Có batch / mini-batch / SGD không?* Có. Code trên là **batch GD** (dùng cả $n$ mẫu mỗi step). **SGD** = mỗi step chỉ 1 mẫu. **Mini-batch** = nhóm 32-512 mẫu. SGD/mini-batch hữu ích khi data quá lớn không vừa RAM, và có hiệu ứng regularization nhờ noise.
> - *Initialize w thế nào?* Linear regression loss lồi → bất kỳ điểm khởi tạo nào cũng hội tụ về cùng 1 nghiệm. NN thì khác (loss phi lồi) — sẽ bàn ở Lesson 04.
> - *Khi nào dừng?* (a) Số epoch cố định; (b) $\\|\\nabla\\| < \\epsilon$; (c) loss trên validation set không cải thiện sau $k$ epoch (early stopping).

### 5.6. Bốn ví dụ chọn η

| η | Hành vi |
|---|---|
| 0.001 | Hội tụ rất chậm, an toàn |
| 0.01 | Chậm vừa, ổn định cho hầu hết bài |
| 0.1 | Nhanh nếu feature đã scale; có thể dao động nếu chưa scale |
| 1.0 | Nguy hiểm — dễ divergence; chỉ dùng khi loss đặc biệt mượt |

> 📝 **Tóm tắt mục 5**: GD lặp $w \\leftarrow w - \\eta \\cdot \\nabla L$. Đạo hàm $\\nabla L = \\dfrac{2}{n} X^\\top(Xw - y)$. Hội tụ về cùng nghiệm closed-form khi loss lồi. Lựa chọn $\\eta$ quan trọng; feature scaling giúp ổn định.

---

## 6. Closed-form vs GD — Khi nào dùng cái nào?

### 6.1. Bảng so sánh

| Tiêu chí | Closed-form (Normal Eq.) | Gradient Descent |
|---|---|---|
| Thời gian | $O(n \\cdot d^2 + d^3)$ | $O(\\text{epochs} \\cdot n \\cdot d)$ |
| Bộ nhớ | $O(d^2)$ (cần $X^\\top X$) | $O(d)$ (chỉ cần $w$, grad) |
| Streaming data | Không | Có (SGD update từng mẫu) |
| Nghiệm | Chính xác (lên đến floating point) | Xấp xỉ; tiệm cận với epoch tăng |
| Hyperparameter | Không có | $\\eta$, \`epochs\`, \`batch_size\` |
| Áp dụng cho NN, logistic | **Không** | **Có** |
| Áp dụng ridge | Có (closed-form ridge) | Có |
| Áp dụng lasso | Không (L1 không khả vi) | Có (subgradient / proximal) |

### 6.2. Quy tắc thực tế

- **$d \\leq 1000$, $n$ vừa phải, data tĩnh** → closed-form (qua \`lstsq\` / SVD).
- **$d > 10^4$ hoặc $n > 10^6$** → GD (batch hoặc SGD).
- **Online / streaming** (Kafka, real-time) → SGD.
- **Lasso, neural network, logistic** → GD (closed-form không tồn tại).

### 6.3. Bốn case study

| Bài toán | d | n | Đề xuất |
|---|---:|---:|---|
| Dự đoán giá nhà với 5 feature, 1000 mẫu | 5 | 1000 | Closed-form (cực nhanh) |
| TF-IDF features cho phân loại email | 50,000 | 100,000 | GD (closed-form $O(d^3) = O(10^{15})$ không khả thi) |
| Streaming click-through-rate | ~ vài chục | vô hạn | SGD online |
| Polynomial regression bậc 5, 10 feature gốc → 1001 feature mở rộng | 1001 | 5000 | Vẫn closed-form OK ($1001^3 \\approx 10^9$ — chạy được vài giây) |

> 📝 **Tóm tắt mục 6**: closed-form nhanh và chính xác khi $d$ nhỏ; GD bắt buộc khi $d$ lớn, loss phi lồi, hoặc streaming. Lasso ép phải dùng GD.

---

## 7. Regularization — Ridge và Lasso

### 7.1. Vấn đề: overfit khi nhiều feature

Khi $d$ lớn (hoặc $d > n$), $X^\\top X$ có thể không khả nghịch hoặc gần singular. Model có thể "đi qua" gần hết data nhưng tổng quát hoá kém. Regularization = thêm penalty vào loss để **kìm trọng số** không phình to.

\`\`\`
L_reg(w) = L(w) + λ · R(w)
\`\`\`

$\\lambda \\geq 0$ là regularization strength. $R(w)$ là regularizer.

### 7.2. Ridge regression (L2)

\`\`\`
R(w) = ||w||² = Σⱼ wⱼ²
L_ridge(w) = (1/n)·||y - Xw||² + λ · ||w||²
\`\`\`

**Closed-form ridge**:
\`\`\`
∂L/∂w = -(2/n)·Xᵀ(y - Xw) + 2λw = 0
⇒ (XᵀX + nλI)·w = Xᵀy
⇒ w*_ridge = (XᵀX + nλI)⁻¹ · Xᵀy
\`\`\`

(Quy ước có hoặc không nhân $n$ vào $\\lambda$ thay đổi giữa các thư viện; sklearn dùng $\\lambda$ không nhân n.)

**Walk-through λ** với dataset mục 4.2 ($X^\\top X = \\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$, $X^\\top y = [10,23]$):

| $\\lambda$ | $X^\\top X + \\lambda I$ | Inverse | $w^* = \\text{inv} \\cdot X^\\top y$ |
|---|---|---|---|
| 0 | $\\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$ | $\\begin{bmatrix}14/6&-1\\\\-1&1/2\\end{bmatrix}$ | $(0{,}333, 1{,}500)$ |
| 0.5 | $\\begin{bmatrix}3{,}5&6\\\\6&14{,}5\\end{bmatrix}$ | $\\det = 14{,}75; \\begin{bmatrix}14{,}5&-6\\\\-6&3{,}5\\end{bmatrix}/14{,}75$ | $(0{,}510, 1{,}288)$ (≈) |
| 5 | $\\begin{bmatrix}8&6\\\\6&19\\end{bmatrix}$ | $\\det = 116; \\begin{bmatrix}19&-6\\\\-6&8\\end{bmatrix}/116$ | $(0{,}448, 1{,}069)$ (≈) |
| 100 | $\\begin{bmatrix}103&6\\\\6&114\\end{bmatrix}$ | $\\det \\approx 11706$ | $(0{,}0846, 0{,}198)$ (gần 0) |

⇒ $\\lambda$ càng lớn, trọng số càng **shrink về 0**, nhưng không bao giờ chính xác bằng 0.

> 💡 **Trực giác**: thêm $\\lambda \\cdot \\|w\\|^2$ vào loss = phạt model có trọng số to. Ưu tiên đường ít dốc, ít "nhạy" với một feature nào đó. $\\lambda = 0$ → trở về OLS; $\\lambda \\to \\infty$ → ép $w \\to 0$ (model dự đoán trung bình).

### 7.3. Lasso regression (L1)

\`\`\`
R(w) = ||w||₁ = Σⱼ |wⱼ|
L_lasso(w) = (1/n)·||y - Xw||² + λ · ||w||₁
\`\`\`

L1 norm **không khả vi tại 0** → không có closed-form. Phải dùng:

- **Coordinate descent** (sklearn \`Lasso\`): cập nhật từng $w_j$ một, mỗi lần giải bài toán 1 chiều có nghiệm soft-thresholding.
- **Proximal gradient (ISTA / FISTA)**: GD + bước "shrink" sau mỗi update.
- **Subgradient method**: dùng $\\text{sign}(w)$ thay đạo hàm.

**Soft-thresholding** (xuất hiện trong coordinate descent / proximal):
\`\`\`
soft(z, τ) =  z - τ   nếu z > τ
              z + τ   nếu z < -τ
              0       nếu |z| ≤ τ
\`\`\`

Hành vi đặc biệt: Lasso **đẩy hẳn nhiều $w_j$ về đúng 0** → **sparse weights**. Ridge co lại nhưng không sparse.

### 7.4. Walk-through: tại sao L1 → sparse, L2 → không?

Tưởng tượng feasible region khi tối ưu có ràng buộc tương đương:
- Ridge: $\\|w\\|^2 \\leq C$ → hình tròn (smooth).
- Lasso: $\\|w\\|_1 \\leq C$ → hình thoi (có **góc** trên các trục toạ độ).

Đường viền của loss $L(w)$ là ellipse. Nghiệm tối ưu là điểm tiếp xúc giữa ellipse và region.

- Tiếp xúc với hình tròn → thường ở chỗ không có toạ độ nào bằng 0 (xác suất 0 để chạm trục).
- Tiếp xúc với hình thoi → **rất hay rơi đúng vào góc** = một số toạ độ bằng 0.

Hệ quả thực dụng: dùng Lasso để **feature selection** — model tự loại bỏ feature không quan trọng (đặt $w_j = 0$).

### 7.5. Bốn so sánh ví dụ

| Bài toán | Đề xuất |
|---|---|
| Có 10000 feature, biết hầu hết không quan trọng | **Lasso** — sparse |
| Tất cả feature đều có chút thông tin, không muốn loại | **Ridge** — shrink đều |
| Feature có nhóm tương quan cao | **Elastic Net** ($= \\lambda_1 \\cdot \\text{L1} + \\lambda_2 \\cdot \\text{L2}$) |
| Cần stable solution, không quá sparse | Ridge |

> ⚠ **Lỗi thường gặp**: dùng L1/L2 **không scale feature trước**. Feature có scale lớn (vd \`diện tích = 50-100\`) bị phạt ít hơn (vì $w_j$ nhỏ là đủ); feature scale nhỏ (vd \`tuổi/100\`) bị phạt nặng. Luôn standardize trước khi áp regularization.

> ❓ **Câu hỏi tự nhiên**: *Sao không dùng L0 = số feature $\\neq$ 0?* — L0 không lồi, không khả vi, NP-hard. Lasso (L1) là **xấp xỉ lồi tốt nhất của L0**.

> 🔁 **Tự kiểm tra**: với $X^\\top X = \\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$, $X^\\top y = [10, 23]$, tính $w_{\\text{ridge}}$ cho $\\lambda = 1$.
> <details><summary>Đáp án</summary>
> $X^\\top X + I = \\begin{bmatrix}4&6\\\\6&15\\end{bmatrix}$. $\\det = 4 \\cdot 15 - 36 = 24$.
> $\\text{inv} = \\dfrac{1}{24}\\begin{bmatrix}15&-6\\\\-6&4\\end{bmatrix}$.
> $w = \\text{inv} \\cdot [10, 23] = \\dfrac{1}{24}[15 \\cdot 10 - 6 \\cdot 23,\\ -6 \\cdot 10 + 4 \\cdot 23] = \\dfrac{1}{24}[12, 32] = [0{,}500, 1{,}333]$.
> So với OLS $(0{,}333, 1{,}500)$ — slope giảm từ 1.5 → 1.333, intercept tăng nhẹ.
> </details>

> 📝 **Tóm tắt mục 7**: Ridge phạt L2 → shrink, có closed-form. Lasso phạt L1 → sparse, không closed-form (dùng coordinate descent). Elastic Net pha trộn cả hai.

---

## 8. Đánh giá model

### 8.1. MSE và RMSE

\`\`\`
MSE  = (1/n) Σ(yᵢ - ŷᵢ)²
RMSE = √MSE
\`\`\`

RMSE cùng đơn vị $y$ → dễ giải thích "trung bình lệch ±RMSE".

### 8.2. MAE — Mean Absolute Error

\`\`\`
MAE = (1/n) Σ|yᵢ - ŷᵢ|
\`\`\`

Ít nhạy outlier hơn MSE. Nếu data có vài outlier "bệnh", MSE bị kéo lệch — báo cáo cả MAE để có cái nhìn cân bằng.

### 8.3. R² — Coefficient of Determination

\`\`\`
R² = 1 - (Σ(yᵢ - ŷᵢ)²) / (Σ(yᵢ - ȳ)²)
   = 1 - (SS_res / SS_tot)
\`\`\`

Trong đó $\\bar{y}$ là trung bình mẫu của $y$. Ý nghĩa:
- $R^2 = 1$ → model giải thích 100% phương sai của $y$ (perfect fit).
- $R^2 = 0$ → model dự đoán bằng đúng trung bình; không tốt hơn baseline.
- $R^2 < 0$ → tệ hơn cả baseline $\\bar{y}$ (xảy ra với model rất tồi hoặc evaluate trên test set không phù hợp).

**Walk-through** với mục 4.2 ($\\hat{y} = 0{,}333 + 1{,}5x$, $y = (2, 3, 5)$):
\`\`\`
ȳ = (2+3+5)/3 = 3.333
SS_tot = (2-3.333)² + (3-3.333)² + (5-3.333)² = 1.778 + 0.111 + 2.778 = 4.667
SS_res = 0.0279 + 0.1111 + 0.0279 = 0.1667
R² = 1 - 0.1667 / 4.667 = 1 - 0.0357 = 0.9643
\`\`\`

→ Model giải thích 96.4% phương sai. Khá tốt.

### 8.4. Bốn ví dụ R²

| Trường hợp | $R^2$ | Ý nghĩa |
|---|---:|---|
| $y = (2,3,5)$, $\\hat{y} = (2,3,5)$ | 1.000 | Perfect fit |
| $y = (2,3,5)$, $\\hat{y} = (1{,}83, 3{,}33, 4{,}83)$ | 0.964 | Rất tốt (mục 4.2) |
| $y = (2,3,5)$, $\\hat{y} = (3{,}33, 3{,}33, 3{,}33)$ | 0.000 | Bằng trung bình → không học gì |
| $y = (2,3,5)$, $\\hat{y} = (5, 4, 1)$ | -2.85 | Tệ hơn baseline; ngược chiều |

> ⚠ **Lỗi thường gặp**:
> - **$R^2$ cao không có nghĩa model tốt cho dữ liệu mới**. $R^2$ đo trên *training set* có thể là 0.99 nhưng test set chỉ 0.4 (overfit). Luôn đánh giá trên test set.
> - **$R^2$ tự động tăng khi thêm feature** dù feature đó là noise. Dùng **adjusted $R^2$** hoặc cross-validation để so sánh model có số feature khác nhau.

> 📝 **Tóm tắt mục 8**: MSE/RMSE/MAE đo "lệch trung bình". $R^2$ đo "tỉ lệ phương sai được giải thích" — không phụ thuộc scale của $y$. Luôn báo cáo nhiều metric, đo trên test set.

---

## 9. Linear Regression như Neural Network 0-hidden-layer

Đây là phần *trừu tượng* nhưng quan trọng để nối Lesson 02 → Lesson 03 (logistic) → Lesson 04 (NN).

### 9.1. Sơ đồ

\`\`\`
        x⁽¹⁾ ──┐
        x⁽²⁾ ──┼──[ w·x + b ]── ŷ
        x⁽³⁾ ──┘
              (1 neuron, linear activation, no hidden layer)
\`\`\`

Mỗi feature đi vào một neuron duy nhất với trọng số riêng. Output $= \\sum_j w_j \\cdot x_j + b$. Không có activation phi tuyến.

So sánh với neural network 1-hidden-layer:
\`\`\`
x ──[hidden layer]──[output layer]── ŷ
     |  10-100 neurons + activation
\`\`\`

Mỗi neuron hidden cũng là $\\sum_i w_{ij} \\cdot x_i + b_j$ rồi qua ReLU/sigmoid. NN = ráp **nhiều linear regression** chồng lên nhau, xen kẽ phi tuyến.

### 9.2. Hệ quả

- Linear regression là **building block**: hiểu MSE + GD + closed-form ở đây = hiểu được mọi NN training step.
- Khi NN có 1 neuron output và loss = MSE, gradient cuối cùng có dạng $(\\hat{y} - y) \\cdot x$ — **chính xác** như linear regression.
- Backprop = chain rule áp dụng để truyền gradient này về các layer trước. Sẽ học chi tiết ở Lesson 04.

> 💡 **Trực giác**: linear regression giống "1 nơron duy nhất nhìn thẳng vào input". NN = "nhiều nơron đứng tầng, mỗi tầng học một biểu diễn trung gian". Bản chất training vẫn là gradient descent trên MSE / cross-entropy.

> 📝 **Tóm tắt mục 9**: linear regression = NN tối giản nhất. Toàn bộ machinery (MSE, GD, normal equation) là nền cho mọi model nâng cao.

---

## 10. Bài tập

Mỗi bài đều có lời giải chi tiết ở mục 11.

### Bài 1 — Tính \`XᵀX\`, \`Xᵀy\`, \`w*\` bằng tay

Cho dataset:
\`\`\`
(x₁, y₁) = (1, 1)
(x₂, y₂) = (2, 2)
(x₃, y₃) = (4, 3)
\`\`\`
(a) Lập ma trận $X$ (kèm cột intercept) và vector $y$.
(b) Tính $X^\\top X$, $X^\\top y$, $\\det(X^\\top X)$.
(c) Tìm $w^*$ bằng normal equation.
(d) Tính MSE và $R^2$.

### Bài 2 — Gradient descent từng bước

Cùng dataset Bài 1. Bắt đầu $(b, w) = (0, 0)$, $\\eta = 0{,}1$. Thực hiện 3 bước GD bằng tay. So sánh với nghiệm đúng.

### Bài 3 — Multivariate

Cho $X = \\begin{bmatrix}1&30&1\\\\1&50&2\\\\1&70&2\\\\1&90&3\\end{bmatrix}$ (cột 1 là intercept, cột 2 diện tích, cột 3 số phòng) và $y = [1{,}5, 2{,}6, 3{,}6, 4{,}8]$. Tính $X^\\top X$, $X^\\top y$, và (nếu có thể bằng tay) $w^*$.

### Bài 4 — Ridge

Cho $X^\\top X = \\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$, $X^\\top y = [10, 23]$. Tính $w_{\\text{ridge}}$ cho $\\lambda = 0{,}1$, $\\lambda = 1$, $\\lambda = 10$. Nhận xét.

### Bài 5 — Lasso intuition

Giả sử bài toán 1 chiều: minimize $(w - 2)^2 + \\lambda \\cdot |w|$. Tìm $w^*$ cho $\\lambda = 0, 1, 3, 5$. Khi nào $w^* = 0$? Tại sao Lasso tạo sparse?

### Bài 6 — Implement linear regression bằng Go

Viết hàm Go nhận \`X [][]float64\`, \`y []float64\`, trả về \`w []float64\` qua:
(a) Normal equation (dùng package \`gonum.org/v1/gonum/mat\`).
(b) Batch gradient descent (chỉ slice + vòng for).

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

(a) 
\`\`\`
X = [ 1  1 ]      y = [ 1 ]
    [ 1  2 ]          [ 2 ]
    [ 1  4 ]          [ 3 ]
\`\`\`

(b)
\`\`\`
XᵀX = [ 3   7 ]      Xᵀy = [ 1+2+3   ] = [ 6  ]
      [ 7  21 ]            [ 1+4+12  ]   [ 17 ]

det(XᵀX) = 3·21 - 7·7 = 63 - 49 = 14
\`\`\`

(c)
\`\`\`
(XᵀX)⁻¹ = (1/14)·[ 21  -7 ]
                 [ -7   3 ]

w* = (XᵀX)⁻¹ · Xᵀy 
   = (1/14)·[ 21·6 - 7·17,  -7·6 + 3·17 ]
   = (1/14)·[ 126 - 119,    -42 + 51    ]
   = (1/14)·[ 7,  9 ]
   = [ 0.500,  0.643 ]
\`\`\`

⇒ Đường: $\\hat{y} = 0{,}5 + 0{,}643 \\cdot x$.

(d)
\`\`\`
ŷ₁ = 0.5 + 0.643·1 = 1.143    r = 1 - 1.143 = -0.143
ŷ₂ = 0.5 + 0.643·2 = 1.786    r = 2 - 1.786 = 0.214
ŷ₃ = 0.5 + 0.643·4 = 3.071    r = 3 - 3.071 = -0.071

MSE = ((-0.143)² + 0.214² + (-0.071)²) / 3
    = (0.0204 + 0.0459 + 0.0051) / 3
    = 0.0714 / 3
    = 0.0238

ȳ = 6/3 = 2
SS_tot = (1-2)² + (2-2)² + (3-2)² = 1 + 0 + 1 = 2
SS_res = 0.0714
R² = 1 - 0.0714/2 = 1 - 0.0357 = 0.9643
\`\`\`

### Lời giải Bài 2

$n = 3$, $X$, $y$ như trên.

**Step 0**: $(b, w) = (0, 0)$.

**Step 1**:
\`\`\`
ŷ = [0, 0, 0]
resid = ŷ - y = [-1, -2, -3]
Xᵀ·resid = [-1-2-3, -1·1 - 2·2 - 3·4] = [-6, -17]
grad = (2/3)·[-6, -17] = [-4.000, -11.333]
w̃ ← [0, 0] - 0.1·[-4, -11.333] = [0.400, 1.133]
\`\`\`

**Step 2**: $b = 0{,}400, w = 1{,}133$.
\`\`\`
ŷ = [0.400+1.133·1, 0.400+1.133·2, 0.400+1.133·4]
  = [1.533, 2.667, 4.933]
resid = ŷ - y = [0.533, 0.667, 1.933]
Xᵀ·resid = [0.533+0.667+1.933, 0.533+1.333+7.733]
         = [3.133, 9.600]
grad = (2/3)·[3.133, 9.600] = [2.089, 6.400]
w̃ ← [0.400, 1.133] - 0.1·[2.089, 6.400] = [0.191, 0.493]
\`\`\`

**Step 3**: $b = 0{,}191, w = 0{,}493$.
\`\`\`
ŷ = [0.684, 1.178, 2.165]
resid = [-0.316, -0.822, -0.835]
Xᵀ·resid = [-1.973, -5.144]
grad = (2/3)·[...] = [-1.315, -3.429]
w̃ ← [0.191, 0.493] - 0.1·[-1.315, -3.429] = [0.323, 0.836]
\`\`\`

Nghiệm đúng (Bài 1): $(0{,}500, 0{,}643)$. Sau 3 step ta ở $(0{,}323, 0{,}836)$ — còn dao động. Cần thêm vài chục step (hoặc giảm $\\eta$) để hội tụ.

### Lời giải Bài 3

\`\`\`
        [ 1  30  1 ]
X  =    [ 1  50  2 ]
        [ 1  70  2 ]
        [ 1  90  3 ]

Xᵀ = [ 1    1    1    1  ]
     [ 30   50   70   90 ]
     [ 1    2    2    3  ]

XᵀX:
(1,1) = 4
(1,2) = 30+50+70+90 = 240
(1,3) = 1+2+2+3 = 8
(2,2) = 900+2500+4900+8100 = 16400
(2,3) = 30+100+140+270 = 540
(3,3) = 1+4+4+9 = 18

XᵀX = [ 4    240   8   ]
      [ 240  16400 540 ]
      [ 8    540   18  ]

Xᵀy:
(1) = 1.5+2.6+3.6+4.8 = 12.5
(2) = 1.5·30 + 2.6·50 + 3.6·70 + 4.8·90 = 45+130+252+432 = 859
(3) = 1.5·1 + 2.6·2 + 3.6·2 + 4.8·3 = 1.5+5.2+7.2+14.4 = 28.3

Xᵀy = [ 12.5,  859,  28.3 ]ᵀ
\`\`\`

Giải hệ $(X^\\top X) \\cdot w = X^\\top y$ cho 3 ẩn — quá lằng nhằng bằng tay; dùng Gauss-Jordan hoặc gonum. Kết quả xấp xỉ:
\`\`\`
w* ≈ [ b ≈ 0.0,  w₁ ≈ 0.042,  w₂ ≈ 0.31 ]
ŷ = 0.0 + 0.042·diện_tích + 0.31·số_phòng
\`\`\`

Verify nhanh trên mẫu 1: $\\hat{y} = 0 + 0{,}042 \\cdot 30 + 0{,}31 \\cdot 1 = 1{,}26 + 0{,}31 = 1{,}57 \\approx 1{,}5$ ✓.

### Lời giải Bài 4

\`\`\`
XᵀX + λI = [[3+λ,  6], [6, 14+λ]]
det = (3+λ)(14+λ) - 36 = λ² + 17λ + 42 - 36 = λ² + 17λ + 6
inv = (1/det)·[[14+λ, -6], [-6, 3+λ]]
w_ridge = inv · [10, 23] 
        = (1/det)·[(14+λ)·10 - 6·23, -6·10 + (3+λ)·23]
        = (1/det)·[140 + 10λ - 138, -60 + 69 + 23λ]
        = (1/det)·[2 + 10λ, 9 + 23λ]
\`\`\`

| $\\lambda$ | $\\det$ | numerator | $w_{\\text{ridge}}$ |
|---|---:|---|---|
| 0   | 6      | $(2, 9)$     | $(0{,}333, 1{,}500)$ |
| 0.1 | 7.71   | $(3, 11{,}3)$  | $(0{,}389, 1{,}466)$ |
| 1   | 24     | $(12, 32)$   | $(0{,}500, 1{,}333)$ |
| 10  | 276    | $(102, 239)$ | $(0{,}370, 0{,}866)$ |

Nhận xét: $\\lambda$ tăng → cả $b, w$ thay đổi; $w$ (slope) shrink rõ rệt; intercept dao động lên rồi xuống. Không có hệ số nào về đúng 0 — đặc trưng của Ridge.

### Lời giải Bài 5

Cần minimize $f(w) = (w - 2)^2 + \\lambda \\cdot |w|$.

$f$ không khả vi tại 0 → xét theo trường hợp.

- $w > 0$: $f'(w) = 2(w-2) + \\lambda = 0 \\Rightarrow w = 2 - \\lambda/2$. Hợp lệ nếu $2 - \\lambda/2 > 0 \\Leftrightarrow \\lambda < 4$.
- $w < 0$: $f'(w) = 2(w-2) - \\lambda = 0 \\Rightarrow w = 2 + \\lambda/2$. Vô lý vì $\\lambda > 0 \\Rightarrow w > 2$, mâu thuẫn $w < 0$.
- $w = 0$: kiểm tra điều kiện subgradient $0 \\in \\partial f(0)$. $\\partial f(0) = -4 + \\lambda \\cdot [-1, 1] = [-4-\\lambda, -4+\\lambda]$. Chứa 0 ⇔ $-4-\\lambda \\leq 0 \\leq -4+\\lambda \\Leftrightarrow \\lambda \\geq 4$.

⇒
- $\\lambda = 0$: $w^* = 2$.
- $\\lambda = 1$: $w^* = 2 - 0{,}5 = 1{,}5$.
- $\\lambda = 3$: $w^* = 2 - 1{,}5 = 0{,}5$.
- $\\lambda = 5$: $\\lambda \\geq 4 \\Rightarrow$ **$w^* = 0$** (đạt đúng 0).

Đây chính xác là **soft-thresholding**: $w^* = \\text{soft}(2, \\lambda/2)$. Khi $\\lambda$ vượt ngưỡng $2 \\cdot |\\text{target}| = 4$, $w^*$ rơi hẳn xuống 0 → sparse.

### Lời giải Bài 6

\`\`\`go
package main

import (
	"fmt"

	"gonum.org/v1/gonum/mat"
)

// NormalEquation: w = (XᵀX)⁻¹ Xᵀ y
func NormalEquation(X *mat.Dense, y *mat.VecDense) *mat.VecDense {
	var XtX mat.Dense
	XtX.Mul(X.T(), X)

	var XtXInv mat.Dense
	if err := XtXInv.Inverse(&XtX); err != nil {
		panic("XᵀX singular: " + err.Error())
	}

	var Xty mat.VecDense
	Xty.MulVec(X.T(), y)

	var w mat.VecDense
	w.MulVec(&XtXInv, &Xty)
	return &w
}

// GradientDescent: w ← w - η·(2/n)·Xᵀ(Xw - y)
func GradientDescent(X [][]float64, y []float64, eta float64, epochs int) []float64 {
	n := len(X)
	d := len(X[0])
	w := make([]float64, d)

	for epoch := 0; epoch < epochs; epoch++ {
		// 1. ŷ = X·w
		yhat := make([]float64, n)
		for i := 0; i < n; i++ {
			for j := 0; j < d; j++ {
				yhat[i] += X[i][j] * w[j]
			}
		}
		// 2. resid = ŷ - y
		resid := make([]float64, n)
		for i := 0; i < n; i++ {
			resid[i] = yhat[i] - y[i]
		}
		// 3. grad = (2/n) · Xᵀ·resid
		grad := make([]float64, d)
		for j := 0; j < d; j++ {
			for i := 0; i < n; i++ {
				grad[j] += X[i][j] * resid[i]
			}
			grad[j] *= 2.0 / float64(n)
		}
		// 4. update
		for j := 0; j < d; j++ {
			w[j] -= eta * grad[j]
		}

		if epoch%100 == 0 {
			loss := 0.0
			for _, r := range resid {
				loss += r * r
			}
			loss /= float64(n)
			fmt.Printf("epoch=%4d  loss=%.6f  w=%v\\n", epoch, loss, w)
		}
	}
	return w
}

func main() {
	// Dataset Bài 1
	Xdata := []float64{1, 1, 1, 2, 1, 4}
	ydata := []float64{1, 2, 3}
	X := mat.NewDense(3, 2, Xdata)
	y := mat.NewVecDense(3, ydata)

	wCF := NormalEquation(X, y)
	fmt.Printf("Closed-form: b=%.4f  w=%.4f\\n",
		wCF.AtVec(0), wCF.AtVec(1))

	Xs := [][]float64{{1, 1}, {1, 2}, {1, 4}}
	wGD := GradientDescent(Xs, ydata, 0.05, 2000)
	fmt.Printf("GD:          b=%.4f  w=%.4f\\n", wGD[0], wGD[1])
}
\`\`\`

Output kỳ vọng:
\`\`\`
Closed-form: b=0.5000  w=0.6429
epoch=   0  loss=4.666666  w=[0.2 0.5666666666666667]
...
epoch=1900 loss=0.023810  w=[0.4998... 0.6429...]
GD:          b=0.5000  w=0.6429
\`\`\`

Hai phương pháp cho cùng nghiệm — kiểm chứng lý thuyết.

---

## 12. Đọc thêm và bước tiếp

- **Lesson tiếp theo**: [Lesson 03 — Logistic regression](../lesson-03-logistic-regression/). Đổi target từ $\\mathbb{R}$ (giá) sang $\\{0, 1\\}$ (spam / không spam); MSE → cross-entropy; nhưng vẫn dùng GD + gradient $(\\hat{y} - y) \\cdot x$.
- **Lesson 04** [Neural network](../lesson-04-neural-network/): chồng các linear regression + activation → NN.
- **Cross-references**:
  - [Tầng 1 Lesson 08 — Hệ phương trình](../../01-Algebra/lesson-08-systems/) để hiểu giải $(X^\\top X) \\cdot w = X^\\top y$ bằng khử Gauss.
  - [Tầng 3 Lesson 07 — Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) để ôn lại update rule và learning rate.
  - [Tầng 4 Lesson 08 — PCA / SVD](../../04-LinearAlgebra/lesson-08-pca-svd/) — SVD là công cụ ổn định nhất để giải normal equation.
  - [Tầng 5 Lesson 07 — MLE](../../05-Probability/lesson-07-mle/) — gốc rễ tại sao MSE là loss "tự nhiên".

- **Reference ngoài**:
  - Bishop, *Pattern Recognition and Machine Learning*, Chương 3.
  - Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning*, Chương 3.
  - Andrew Ng, Coursera ML — Week 1-2 (linear regression).
`;
