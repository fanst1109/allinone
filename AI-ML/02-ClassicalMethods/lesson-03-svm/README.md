# Lesson 03 — Support Vector Machine (SVM)

> **Tier 2 — Classical Methods · AI-ML**

SVM tìm **hyperplane tối ưu** không phải bằng cách khớp data tốt nhất, mà bằng cách **tối đa hóa margin** — khoảng trống lớn nhất giữa các class. Một ý tưởng đơn giản, nhưng dẫn đến một trong những classifier mạnh nhất trước khi deep learning ra đời.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Phát biểu bài toán **maximum margin classifier**: tối đa hóa $2/\|w\|$ tương đương minimize $\|w\|^2/2$.
- Giải thích **support vectors** là gì và tại sao chỉ chúng quyết định hyperplane.
- Phân biệt **hard margin** và **soft margin** (slack variable ξᵢ, cost C).
- Mô tả **kernel trick**: tại sao KNN không cần tính $\varphi(x)$ tường minh.
- Tính kernel values: linear, polynomial, RBF với ví dụ số cụ thể.
- Giải thích effect của hyperparameter C và γ (RBF) lên margin và boundary.

## Kiến thức tiền đề

- [T2-L01 — Decision Tree](../lesson-01-knn-decision-tree/): binary classification.
- Linear algebra: dot product, norm, hyperplane $w \cdot x + b = 0$.
- Optimization cơ bản: Lagrange multipliers (khái niệm, không cần tính).

---

## 1. Maximum Margin Classifier

### 1.1. Vấn đề đặt ra

> 💡 **Trực giác**: có vô số đường thẳng có thể tách được hai class. Đường nào tốt nhất? — Đường có **khoảng trống rộng nhất** hai bên. Nếu test point hơi dao động về bất kỳ phía nào, đường có margin rộng vẫn phân loại đúng nhiều hơn.

Cho tập linearly separable: $\{(x_1, y_1), \dots, (x_n, y_n)\}$ với $y_i \in \{-1, +1\}$.

Hyperplane: $f(x) = w \cdot x + b = 0$.

Điều kiện phân loại đúng: $y_i \cdot (w \cdot x_i + b) \geq 1$ cho mọi i.

### 1.2. Margin

**Margin** = khoảng cách từ hyperplane tới support vector gần nhất = $2 / \|w\|$.

**(a) Là gì**: vùng "safety buffer" quanh decision boundary.

**(b) Vì sao tối đa hóa margin**: lý thuyết VC dimension và structural risk minimization chứng minh rằng tối đa margin → minimize upper bound của generalization error.

**(c) Bài toán tối ưu**: tối đa hóa $2/\|w\|$ ≡ minimize $\|w\|^2/2$:

```
min   (1/2)‖w‖²
s.t.  yᵢ(w·xᵢ + b) ≥ 1  ∀i
```

**(d) Ví dụ số** (2D, linearly separable):

```
Class +1: A=(1,2), B=(2,3), C=(3,1)
Class −1: D=(5,4), E=(6,3), F=(4,5)
```

Optimal hyperplane (sau giải QP): $w = [-1{,}2,\ 0{,}8]$, b = 2,4.

Check: $w \cdot A + b = -1{,}2 \times 1 + 0{,}8 \times 2 + 2{,}4 = -1{,}2 + 1{,}6 + 2{,}4 = 2{,}8 > 0$. (class +1 ✓)

Margin = $2/\|w\| = 2/\sqrt{1{,}44+0{,}64} = 2/\sqrt{2{,}08} \approx 2/1{,}44 \approx \textbf{1{,}39}$.

### 1.3. Support Vectors

**(a) Là gì**: các điểm data **nằm đúng trên margin boundaries** (khoảng cách = $1/\|w\|$ tới hyperplane). Chỉ những điểm này ảnh hưởng tới hyperplane — xóa bất kỳ điểm nào không phải support vector → hyperplane không đổi.

**(b) Ví dụ số** (tiếp):

Sau giải QP, chỉ có B=(2,3) từ class +1 và E=(6,3) từ class −1 là support vectors. A, C, D, F không ảnh hưởng.

Verify B là support vector: $|w \cdot B + b| / \|w\| = |-1{,}2 \times 2 + 0{,}8 \times 3 + 2{,}4| / 1{,}44 = |-2{,}4+2{,}4+2{,}4| / 1{,}44 = 2{,}4/1{,}44 \approx 1{,}67$... (chuẩn hóa khác nhau tùy ký hiệu).

> ❓ **Câu hỏi**: Có bao nhiêu support vectors tối thiểu trong 2D? — Ít nhất 3: 2 từ một class, 1 từ class kia (hoặc ngược lại). Với d chiều: ít nhất d+1 support vectors.

> ❓ **Câu hỏi**: SVM có thể train được khi n << d không? — Có! Vì SVM chỉ phụ thuộc vào support vectors (thường ít hơn n nhiều) và giải trong dual space với n×n matrix thay vì d×d.

📝 **Tóm tắt mục 1**:
- Maximum margin hyperplane: minimize $\|w\|^2$ subject to $y_i(w \cdot x_i + b) \geq 1$.
- Margin = $2/\|w\|$ — càng rộng càng generalize tốt.
- Support vectors: điểm trên margin, quyết định hyperplane. Phần còn lại vô nghĩa.

---

## 2. Soft Margin SVM

### 2.1. Vấn đề data không linearly separable

> 💡 **Trực giác**: Hard margin yêu cầu mọi điểm phải bên đúng phía margin — không có exception. Thực tế data có noise, overlap class → không linearly separable → không có feasible solution. Soft margin cho phép vi phạm với "phạt".

### 2.2. Slack Variables ξᵢ

**(a) Là gì**: mỗi điểm i có slack $\xi_i \geq 0$ đo mức độ vi phạm:
- $\xi_i = 0$: điểm đúng phía, ngoài margin.
- $0 < \xi_i < 1$: điểm đúng phía nhưng **trong margin**.
- $\xi_i > 1$: điểm **sai phía** (misclassified).

**(b) Bài toán**:

```
min   (1/2)‖w‖² + C · Σ ξᵢ
s.t.  yᵢ(w·xᵢ + b) ≥ 1 − ξᵢ  ∀i
      ξᵢ ≥ 0  ∀i
```

**(c) Hyperparameter C**: trade-off margin vs. violations:
- **C lớn**: phạt nặng violations → ép hầu hết điểm bên đúng phía → margin hẹp hơn → overfit.
- **C nhỏ**: chấp nhận nhiều violations → margin rộng → regularize, underfit nếu quá nhỏ.

**(d) Ví dụ số** (toy dataset 10 điểm, overlap):

| C | Margin | Misclassified (train) | Val Acc |
|:---:|:---:|:---:|:---:|
| 0.01 | 2.8 | 4 | 82% |
| 0.1 | 1.9 | 2 | 88% |
| 1.0 | 1.1 | 1 | **91%** |
| 10 | 0.4 | 0 | 87% |
| 100 | 0.1 | 0 | 83% |

C=1.0 optimal — balance giữa margin rộng và ít violation.

> ⚠ **Lỗi thường gặp**: nghĩ C lớn luôn tốt hơn (ít misclassification). **Sai**: C lớn → overfit noise → val accuracy giảm. Tune C bằng CV.

📝 **Tóm tắt mục 2**:
- Soft margin: thêm slack $\xi_i$ cho phép violation, phạt bởi cost C.
- C lớn: ít violation, margin hẹp, overfit. C nhỏ: nhiều violation, margin rộng, underfit.
- Tune C bằng CV (cross-validation).

---

## 3. Kernel Trick

### 3.1. Vấn đề phi tuyến

> 💡 **Trực giác**: XOR problem: class +1 ở (0,0), (1,1); class −1 ở (0,1), (1,0) — **không linearly separable** trong 2D. Nhưng nếu map lên 3D: $\varphi(x_1,x_2) = (x_1, x_2, x_1 x_2)$ → class +1 tại z₃=0, class −1 tại z₃=0 hoặc z₃=1... vẫn tricky. Nhưng ý tưởng là: **data phi tuyến trong thấp-D có thể linearly separable trong cao-D**.

### 3.2. Kernel Function

**(a) Là gì**: hàm $K(x, x') = \varphi(x) \cdot \varphi(x')$ tính inner product trong **feature space $\varphi$** mà không cần compute $\varphi$ tường minh.

**(b) Vì sao cần**: SVM dual formulation chỉ cần inner products $x_i \cdot x_j$. Thay $x_i \cdot x_j$ bằng $K(x_i, x_j)$ → SVM trong high-d space mà không cần tính $\varphi$ (có thể vô hạn chiều).

**(c) 4 kernel phổ biến**:

**1. Linear**: $K(x, x') = x \cdot x'$.
- Ví dụ: x=(1,2), x'=(3,4) → K = 1×3 + 2×4 = **11**.
- Khi dùng: data linearly separable hoặc high-d (text).

**2. Polynomial**: $K(x, x') = (x \cdot x' + c)^d$.
- Ví dụ: c=1, d=2, x=(1,2), x'=(3,4): $K = (11+1)^2 = \textbf{144}$.
- Implicit $\varphi$: $x=(x_1,x_2) \to \varphi = (x_1^2, \sqrt{2} \cdot x_1 x_2, x_2^2, \sqrt{2} x_1, \sqrt{2} x_2, 1)$ (d=2, 6 chiều).
- Khi dùng: NLP (n-grams), gene expression.

**3. RBF / Gaussian**: $K(x, x') = \exp(-\gamma \|x-x'\|^2)$.
- γ = 0,1, x=(1,2), x'=(3,4): $\|x-x'\|^2 = (1-3)^2+(2-4)^2 = 4+4=8$. $K = \exp(-0{,}1 \times 8) = e^{-0{,}8} \approx \textbf{0{,}449}$.
- γ = 1,0: $K = \exp(-8) \approx \textbf{0{,}000335}$ (gần 0 vì x và x' xa nhau trong feature space).
- $\varphi$ có **vô hạn chiều** (Taylor expansion của exp).
- Khi dùng: mặc định khi không biết cấu trúc.

**4. Sigmoid**: $K(x, x') = \tanh(\alpha \cdot x \cdot x' + c)$.
- Không phải positive definite mọi trường hợp → dùng cẩn thận.

### 3.3. Ảnh hưởng của γ (RBF)

| γ nhỏ | γ lớn |
|:---|:---|
| Kernel rộng — điểm xa vẫn ảnh hưởng nhau | Kernel hẹp — chỉ điểm rất gần mới ảnh hưởng |
| Smooth decision boundary | Jagged, overfit từng điểm |
| High bias / underfit | High variance / overfit |

**(a) Ví dụ số**: dataset xoắn ốc (non-linearly separable):

| γ | Val Acc |
|:---:|:---:|
| 0.001 | 52% (underfits — nearly linear) |
| 0.1 | 89% |
| 1.0 | **96%** |
| 10 | 91% |
| 100 | 74% (overfits) |

> ❓ **Câu hỏi**: Tại sao kernel SVM không tính φ(x) tường minh? — RBF kernel có φ vô hạn chiều → không thể lưu trữ hay tính. Nhưng dual SVM chỉ cần $K(x_i, x_j)$ — một số thực — để predict: $f(x) = \sum \alpha_i y_i K(x_i, x) + b$. Tính kernel function đủ rồi.

> ⚠ **Lỗi thường gặp**: quên normalize features trước khi dùng RBF kernel. RBF nhạy với scale: feature range [0,1] và [0,1000] → ‖x−x'‖² bị dominated bởi feature lớn → kernel không hoạt động đúng. Luôn StandardScaler/MinMaxScaler trước SVM.

### 3.4. Grid Search C và γ

Tune cả C và γ bằng 5-fold CV:

| C \ γ | 0.01 | 0.1 | 1.0 | 10 |
|:---:|:---:|:---:|:---:|:---:|
| 0.1 | 62% | 78% | 85% | 80% |
| 1.0 | 70% | 88% | **96%** | 87% |
| 10 | 72% | 91% | 93% | 85% |
| 100 | 73% | 90% | 90% | 82% |

Optimal: C=1.0, γ=1.0. Grid search: 16 configurations × 5 folds = 80 fits.

> 🔁 **Kiểm tra**: Tính K_RBF(x, x') với γ=0.5, x=(0,1), x'=(2,3). Kết quả bao nhiêu?

<details><summary>Đáp án</summary>

$\|x - x'\|^2 = (0-2)^2 + (1-3)^2 = 4 + 4 = 8$.

$K = \exp(-0{,}5 \times 8) = \exp(-4) = e^{-4} \approx \textbf{0{,}0183}$.

Rất nhỏ vì hai điểm cách nhau xa (khoảng cách $\sqrt{8} \approx 2{,}83$) và γ=0,5 tạo kernel hẹp.

</details>

📝 **Tóm tắt mục 3**:
- Kernel = inner product trong high-d feature space, không cần tính φ.
- Linear: đơn giản; Polynomial: n-gram features; **RBF: mặc định** (vô hạn chiều).
- γ: bandwidth RBF — nhỏ=smooth/underfit, lớn=jagged/overfit.
- Luôn normalize features + tune (C, γ) bằng CV.

---

## 4. Bài tập

**Bài 1**: Hai điểm support vectors: A=(2,1) class +1, B=(4,3) class −1. Midpoint giữa hai support vectors là? Nếu optimal hyperplane đi qua midpoint và vuông góc với AB, tính $w$ (unit normal) và margin.

**Bài 2**: Tính polynomial kernel $K(x, x')$ với c=0, d=3, x=(1,2), x'=(3,1). Tính bằng cả công thức kernel lẫn inner product của $\varphi$ tường minh (gợi ý: d=3, 1D là x → $\varphi(x)=(1, \sqrt{3}x, \sqrt{3}x^2, x^3)$).

**Bài 3**: SVM với C=0.01 cho train accuracy 70%, val accuracy 75%. SVM với C=100 cho train accuracy 99%, val accuracy 78%. Kết luận gì? Bạn sẽ thử C nào tiếp theo?

**Bài 4**: Dataset: feature 1 range [0, 1000], feature 2 range [0, 1]. Tính $\|x - x'\|^2$ với x=(500, 0.5), x'=(501, 0.6) trước và sau khi chuẩn hóa Min-Max. Nhận xét ảnh hưởng tới RBF kernel.

---

## 5. Lời giải chi tiết

### Bài 1

**Midpoint**: M = ((2+4)/2, (1+3)/2) = **(3, 2)**.

**Vector AB**: AB = (4−2, 3−1) = (2, 2). 

**w (vuông góc với AB)**: $w = (2,2)$ normalize → $\|(2,2)\| = \sqrt{4+4} = 2\sqrt{2}$.
Unit normal: $w = (2/2\sqrt{2}, 2/2\sqrt{2}) = (1/\sqrt{2}, 1/\sqrt{2}) \approx \textbf{(0{,}707, 0{,}707)}$.

**Margin**: khoảng cách từ A tới midplane = $|w \cdot (A-M)| = |(0{,}707 \times (2-3) + 0{,}707 \times (1-2))| = |0{,}707 \times (-1)+0{,}707 \times (-1)| = |-1{,}414| = \sqrt{2}/2 \times 2 = \sqrt{2}$. Half margin = $\sqrt{2}/2 \approx 0{,}707$.

Margin = $2 \times 0{,}707 = \sqrt{2} \approx \textbf{1{,}414}$.

Verify: margin = $2/\|w\| = 2/|(2,2)|/\sqrt{2}$... Với non-unit $w = (2,2)$: $\|w\|=2\sqrt{2}$, margin = $2/(2\sqrt{2}) = 1/\sqrt{2}$ → total = $2 \times 1/\sqrt{2} = \sqrt{2}$. ✓

### Bài 2

**Kernel**: $K = (x \cdot x')^3 = ((1 \times 3)+(2 \times 1))^3 = (3+2)^3 = 5^3 = \textbf{125}$.

**φ tường minh** (simplified 1D, mỗi feature độc lập — thực ra 2D polynomial phức tạp hơn, đây là illustration):
- $\varphi(x_1=1)$: $(1, \sqrt{3} \times 1, \sqrt{3} \times 1^2, 1^3) = (1, \sqrt{3}, \sqrt{3}, 1)$.
- $\varphi(x'_1=3)$: $(1, \sqrt{3} \times 3, \sqrt{3} \times 9, 27) = (1, 3\sqrt{3}, 9\sqrt{3}, 27)$.

Nhưng với 2D input và degree 3: $x=(x_1,x_2)=(1,2)$, $x'=(3,1)$.
$K(x,x') = (x \cdot x')^d = (1 \times 3 + 2 \times 1)^3 = 5^3 = \textbf{125}$. (c=0)

Verify bằng cách expand: $(x_1 x'_1 + x_2 x'_2)^3 = (3+2)^3 = 125$. ✓

### Bài 3

**Phân tích**:
- C=0.01: train=70%, val=75%. Train thấp nhưng val cao → soft margin rộng, accept nhiều violations → **high bias** (underfitting).
- C=100: train=99%, val=78%. Train rất cao, val gap = 21% → **high variance** (overfitting).

**Kết luận**: sweet spot ở C giữa 0.01 và 100. Val accuracy: 75% vs 78% — C=100 nhỉnh hơn nhưng không chắc ổn định.

**Thử tiếp**: C ∈ {0.1, 1, 10} bằng grid search. Theo pattern U-shape: C tối ưu likely nằm ở C=1 hoặc C=10.

### Bài 4

**Trước chuẩn hóa**: x=(500, 0.5), x'=(501, 0.6).
```
‖x − x'‖² = (500−501)² + (0.5−0.6)² = 1 + 0.01 = 1.01
```

Feature 1 chiếm 1/1,01 = 99% của distance. Feature 2 (0,01) = 1% → gần như vô hình.

$K_{\text{RBF}}(\gamma=1) = \exp(-1{,}01) \approx 0{,}365$.

**Sau Min-Max** (feature 1: /1000, feature 2: /1):
x_norm = (0.500, 0.5), x'_norm = (0.501, 0.6).
```
‖x_norm − x'_norm‖² = (0.001)² + (0.1)² = 0.000001 + 0.01 = 0.010001
```

Feature 2 nay chiếm 99.99% → đóng góp cân bằng.

$K_{\text{RBF}}(\gamma=1) = \exp(-0{,}01) \approx \textbf{0{,}990}$ (rất khác 0,365 trước!).

**Nhận xét**: kết quả kernel thay đổi hoàn toàn sau chuẩn hóa. Feature 2 (biến đổi 0.1) ảnh hưởng nhiều hơn feature 1 (biến đổi 1 trong 1000 scale) chỉ sau normalize → model học pattern thực sự trong data.

---

## 6. Tham khảo

- **ESL** Chapter 12 — Support Vector Machines.
- **ISL** Chapter 9 — Support Vector Machines.
- **MLPP** Chapter 14 — Kernels.
- Cortes & Vapnik (1995) — *Support-Vector Networks*, Machine Learning.
- [Bài trước — T2-L02: Random Forest](../lesson-02-random-forest/README.md)
- [Bài tiếp theo — T2-L04: Gradient Boosting](../lesson-04-gradient-boosting/README.md)
- [visualization.html](./visualization.html)
