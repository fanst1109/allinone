# Lesson 06 — Ma trận = biến đổi (Linear Transformation)

> **Tầng 4 — Linear Algebra · Bài 6/8**
>
> "Ma trận không chỉ là một bảng số. **Ma trận LÀ một hàm**. Mỗi ma trận $A$ định nghĩa một cách 'cầm vector lên và biến nó thành vector khác'. Hiểu được điều này là cánh cửa để hiểu mọi thứ phía sau: eigenvector, PCA, SVD, neural network."

---

## Mục tiêu bài học

Sau khi học xong bài này, bạn sẽ:

1. **Đổi cách nhìn** ma trận: từ "bảng số" sang "hàm biến đổi" — $T(\mathbf{x}) = A\mathbf{x}$.
2. Hiểu thế nào là **linear transformation** (biến đổi tuyến tính) và 2 tính chất định nghĩa nó.
3. Nhận diện ngay 6 loại biến đổi cơ bản trong $\mathbb{R}^2$: **identity, scaling, rotation, reflection, shear, projection**.
4. Hiểu **composition = nhân ma trận**: $T_2 \circ T_1 = B \cdot A$. (Đây là lý do nhân ma trận được định nghĩa "kỳ lạ" như vậy.)
5. Tính được **kernel** (nhân), **image** (ảnh), **rank** (hạng) của một ma trận và đọc được ý nghĩa hình học.
6. Biết **định thức (determinant)** là *hệ số nhân diện tích/thể tích* của biến đổi.
7. Phân biệt **ma trận trực giao (orthogonal)**, **đối xứng (symmetric)**, **đường chéo (diagonal)** và biết khi nào gặp chúng trong ML.
8. Liên hệ tới ứng dụng: **fully-connected layer** trong neural net, **convolution** trong CNN, **whitening data** trong PCA.

---

## Kiến thức tiền đề

- [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) — bạn cần biết nhân ma trận $A \cdot B$, transpose $A^\top$, inverse $A^{-1}$, identity $I$.
- [Lesson 04 — Độc lập tuyến tính, basis](../lesson-04-linear-independence/) — khái niệm span, basis, dimension.
- [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/) — $\lVert \mathbf{v} \rVert$ để đo độ dài vector.
- [Tầng 2 Trigonometry — Lesson 06: Rotation matrix](../../02-Trigonometry/lesson-06-rotation-matrix/) — đã gặp ma trận xoay $R(\theta)$ ở đó; bài này chính thức hóa và mở rộng.
- [Tầng 1 Algebra — Lesson 08: Hệ phương trình tuyến tính](../../01-Algebra/lesson-08-linear-systems/) — $A\mathbf{x} = \mathbf{b}$ đã quen mặt.

---

## 1. Trực giác mới — Ma trận LÀ một hàm

### 1.1. Đổi góc nhìn

Cho đến hết Lesson 05, bạn nhìn ma trận như **một bảng số có quy tắc cộng/nhân**. Bài này yêu cầu bạn đổi hệ tham chiếu:

> **Mỗi ma trận $A$ kích thước $m \times n$ chính là một hàm $T : \mathbb{R}^n \to \mathbb{R}^m$, định nghĩa bởi $T(\mathbf{x}) = A\mathbf{x}$.**

- **Đầu vào**: vector cột $\mathbf{x} \in \mathbb{R}^n$ (kích thước $n \times 1$).
- **Đầu ra**: vector cột $T(\mathbf{x}) = A\mathbf{x} \in \mathbb{R}^m$ (kích thước $m \times 1$).
- **$A$ "biến đổi"** không gian $n$ chiều thành không gian $m$ chiều.

> **💡 Trực giác — Hình dung**
>
> Tưởng tượng $\mathbb{R}^n$ là một tờ giấy (nếu $n = 2$). Ma trận $A$ là một **bàn tay** cầm tờ giấy đó và:
> - Giãn nó ra hoặc co lại (scaling).
> - Xoay nó (rotation).
> - Lật nó (reflection).
> - Kéo lệch nó (shear).
> - Bóp dẹt nó thành đường thẳng (projection).
> - Hoặc bóp dẹt thành điểm 0 (zero map).
>
> Hành động "cầm và biến đổi" này = hàm $T$. Ma trận chỉ là **cách viết** hành động đó bằng số.

### 1.2. Ví dụ mở bài — Scaling theo trục x gấp đôi

Cho

$$A = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}$$

Áp vào $\mathbf{x} = (3, 4)$:

$$A\mathbf{x} = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 3 \\ 4 \end{bmatrix} = \begin{bmatrix} 2 \cdot 3 + 0 \cdot 4 \\ 0 \cdot 3 + 1 \cdot 4 \end{bmatrix} = \begin{bmatrix} 6 \\ 4 \end{bmatrix}$$

→ Vector $(3, 4)$ bị **kéo dài gấp đôi theo trục x**, thành $(6, 4)$.

- Một vector khác $(1, 0)$ → $A \cdot (1, 0) = (2, 0)$. Dài gấp đôi theo x.
- $(0, 1)$ → $A \cdot (0, 1) = (0, 1)$. Không đổi.
- $(1, 1)$ → $A \cdot (1, 1) = (2, 1)$. Phần x bị nhân đôi.

Toàn bộ mặt phẳng bị "kéo căng theo trục x". $A$ chính là **hành động kéo căng đó**, viết dưới dạng số.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vậy ma trận và hàm là hai từ cho cùng một thứ à?"* — Gần như vậy, nhưng chỉ cho một loại hàm rất đặc biệt: **linear transformation**. Hàm $f(x) = x^2 + 1$ không thể viết thành ma trận (vì không tuyến tính). Mọi linear transformation lại có thể viết thành ma trận và ngược lại.
> - *"Tại sao phải đổi cách nhìn này?"* — Vì khi nhìn ma trận là HÀM, bạn có ngay các câu hỏi tự nhiên: hàm này có inverse không? (→ $A^{-1}$). Hàm này "bóp dẹt" cái gì? (→ kernel). Đầu ra của hàm này là gì? (→ image). Có hướng nào hàm không xoay không? (→ eigenvector — Lesson 07).

### 1.3. Walk-through đầy đủ với 4 ví dụ

**Ví dụ A.** $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $\mathbf{x} = (1, 1)$:

$$A\mathbf{x} = (1 \cdot 1 + 2 \cdot 1, \ 3 \cdot 1 + 4 \cdot 1) = (3, 7)$$

**Ví dụ B.** $A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$, $\mathbf{x} = (1, 0)$:

$$A\mathbf{x} = (0 \cdot 1 + (-1) \cdot 0, \ 1 \cdot 1 + 0 \cdot 0) = (0, 1)$$

→ Vector $(1, 0)$ thành $(0, 1)$. Đây là **xoay 90° ngược chiều kim đồng hồ**.

**Ví dụ C.** $A = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$, $\mathbf{x} = (1, 0)$:

$$A\mathbf{x} = (1 \cdot 1 + 1 \cdot 0, \ 0 \cdot 1 + 1 \cdot 0) = (1, 0)$$

→ Trục x giữ nguyên. Còn $(0, 1)$ → $(1, 1)$ — bị "kéo lệch" sang phải. Đây là **shear**.

**Ví dụ D.** $A$ là $3 \times 2$:

$$A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{bmatrix}, \qquad \mathbf{x} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$$

Đầu ra: $A\mathbf{x} = (2, 3, 5) \in \mathbb{R}^3$. Vector 2 chiều được "nhúng" vào không gian 3 chiều.

---

## 2. Định nghĩa chính thức — Linear Transformation

### 2.1. Hai tính chất xác định

> **Hàm $T : \mathbb{R}^n \to \mathbb{R}^m$ được gọi là biến đổi tuyến tính (linear transformation) nếu thoả mãn 2 tính chất:**
>
> 1. **Bảo toàn phép cộng**: $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ với mọi $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$.
> 2. **Bảo toàn nhân vô hướng**: $T(c \cdot \mathbf{u}) = c \cdot T(\mathbf{u})$ với mọi $\mathbf{u} \in \mathbb{R}^n$, $c \in \mathbb{R}$.

Tổng hợp 2 tính chất: $T(\alpha\mathbf{u} + \beta\mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v})$ — gọi là **bảo toàn tổ hợp tuyến tính**.

> **💡 Trực giác**
>
> "Tuyến tính" = **thẳng**. Linear transformation:
> - **Không bẻ cong**: đường thẳng → đường thẳng. Lưới ô vuông → lưới ô bình hành.
> - **Bảo toàn gốc tọa độ**: $T(\mathbf{0}) = \mathbf{0}$ luôn. (Chứng minh: $T(\mathbf{0}) = T(0 \cdot \mathbf{v}) = 0 \cdot T(\mathbf{v}) = \mathbf{0}$.)
> - **Tỷ lệ đều**: nếu điểm A ở giữa B và C, sau khi biến đổi, A' vẫn ở giữa B' và C'.
>
> Hàm $f(x) = x + 5$ (cộng 5 vào tọa độ) **không phải** linear transformation vì $f(0) = 5 \neq 0$. Nó là **affine** (tuyến tính + dịch chuyển). Sẽ gặp ở mục 11 (FC layer).

### 2.2. Verify với 4 ví dụ số

**Ví dụ 1.** $T(\mathbf{x}) = 2\mathbf{x}$ (scaling đều).
- $T(\mathbf{u} + \mathbf{v}) = 2(\mathbf{u} + \mathbf{v}) = 2\mathbf{u} + 2\mathbf{v} = T(\mathbf{u}) + T(\mathbf{v})$. ✓
- $T(c \cdot \mathbf{u}) = 2(c \cdot \mathbf{u}) = c \cdot (2\mathbf{u}) = c \cdot T(\mathbf{u})$. ✓
- → Linear. Ma trận: $A = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} = 2I$.

**Ví dụ 2.** $T(x, y) = (x + y, \ x - y)$.
- $T((1,2) + (3,4)) = T(4, 6) = (10, -2)$.
- $T(1,2) + T(3,4) = (3, -1) + (7, -1) = (10, -2)$. ✓
- → Linear. Ma trận: $A = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$.

**Ví dụ 3.** $T(x, y) = (x^2, \ y)$.
- $T(2 \cdot (1, 1)) = T(2, 2) = (4, 2)$.
- $2 \cdot T(1, 1) = 2 \cdot (1, 1) = (2, 2)$. ✗ ($4 \neq 2$).
- → **Không** linear.

**Ví dụ 4.** $T(x, y) = (x + 1, \ y)$ (dịch chuyển 1 đơn vị).
- $T(0, 0) = (1, 0) \neq \mathbf{0}$. ✗
- → **Không** linear (chỉ affine).

### 2.3. Định lý nền — Ma trận ↔ Linear Transformation

> **Định lý (sự tương ứng 1-1)**:
> Mọi linear transformation $T : \mathbb{R}^n \to \mathbb{R}^m$ đều có thể biểu diễn duy nhất dưới dạng $T(\mathbf{x}) = A\mathbf{x}$, với $A$ là ma trận $m \times n$. Ngược lại, mọi ma trận $m \times n$ đều xác định một linear transformation.

**Cách dựng ma trận $A$ từ $T$** — đây là quy tắc quan trọng nhất:

> **Cột thứ $j$ của $A$ chính là $T(\mathbf{e}_j)$** — ảnh của vector cơ sở $\mathbf{e}_j$.

Trong $\mathbb{R}^2$, $\mathbf{e}_1 = (1, 0)$, $\mathbf{e}_2 = (0, 1)$. Vậy

$$A = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{bmatrix} \quad (T(\mathbf{e}_1) \text{ và } T(\mathbf{e}_2) \text{ là 2 cột})$$

**Chứng minh từng bước:**
- Mọi vector $\mathbf{x} = (x_1, x_2)$ viết được thành $\mathbf{x} = x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2$.
- $T(\mathbf{x}) = T(x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2) = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2)$ (linear).
- Đây chính là $A\mathbf{x}$ với $A$ có cột là $T(\mathbf{e}_1), T(\mathbf{e}_2)$.

**Walk-through:**
- Cho $T(x, y) = (x + 2y, \ 3x - y)$.
- $T(\mathbf{e}_1) = T(1, 0) = (1, 3)$ → cột 1.
- $T(\mathbf{e}_2) = T(0, 1) = (2, -1)$ → cột 2.
- → $A = \begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix}$.
- Kiểm tra: $A \cdot (5, 7) = (1 \cdot 5 + 2 \cdot 7, \ 3 \cdot 5 + (-1) \cdot 7) = (19, 8)$. Mà $T(5, 7) = (5 + 14, \ 15 - 7) = (19, 8)$. ✓

> **📝 Tóm tắt mục 2**
> - Linear ⇔ giữ cộng và giữ scaling ⇔ giữ tổ hợp tuyến tính ⇔ luôn có $T(\mathbf{0}) = \mathbf{0}$.
> - Mọi linear transformation = nhân ma trận, và ngược lại.
> - Cột $j$ của ma trận = $T(\mathbf{e}_j)$ — đây là quy tắc dựng ma trận từ mô tả hình học.

---

## 3. Sáu biến đổi cơ bản trong ℝ²

Đây là "bộ chữ cái" mà mọi biến đổi tuyến tính trong mặt phẳng đều có thể phân tích ra. Học thuộc 6 ma trận này.

### 3.1. Identity I — giữ nguyên

$$I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \qquad T(\mathbf{x}) = \mathbf{x}$$

- $I \cdot (1, 0) = (1, 0)$, $I \cdot (0, 1) = (0, 1)$, $I \cdot (3, -2) = (3, -2)$.
- Hình học: không làm gì cả. Lưới giữ nguyên.

### 3.2. Scaling — phóng/thu theo trục

$$A = \begin{bmatrix} a & 0 \\ 0 & b \end{bmatrix}, \qquad T(x, y) = (a x, \ b y)$$

- $a > 1$: kéo dài theo x. $0 < a < 1$: nén lại.
- $a < 0$: kéo dài + lật theo trục y (đảo dấu x).
- $a = b$: scaling đều (uniform). $a = b = 2$: phóng to gấp đôi mọi hướng.

**Walk-through $A = \operatorname{diag}(3, 0.5)$:**
- $A \cdot (1, 0) = (3, 0)$ (kéo x gấp 3).
- $A \cdot (0, 1) = (0, 0.5)$ (nén y còn nửa).
- $A \cdot (2, 4) = (6, 2)$.
- Hình vuông đơn vị → hình chữ nhật $3 \times 0.5$.

### 3.3. Rotation `R(θ)` — xoay quanh gốc

Đã gặp ở [Trig Lesson 06](../../02-Trigonometry/lesson-06-rotation-matrix/):

$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

- $R(90°) = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$. $R(90°) \cdot (1, 0) = (0, 1)$. ✓
- $R(180°) = \begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix} = -I$. Đảo dấu cả 2 trục.
- $R(-\theta) = R(\theta)^\top = R(\theta)^{-1}$ (rotation là ma trận trực giao — xem mục 10).

### 3.4. Reflection — lật

- **Qua trục x**: $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$. $(3, 4) \to (3, -4)$.
- **Qua trục y**: $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$. $(3, 4) \to (-3, 4)$.
- **Qua đường $y = x$**: $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. $(3, 4) \to (4, 3)$. Hoán đổi x và y.
- **Qua gốc tọa độ**: $\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix} = -I$. Trùng với rotation 180°.

Reflection có **$\det = -1$** (đảo hướng, xem mục 9).

### 3.5. Shear — kéo lệch

$$\text{Shear theo x:} \quad \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}, \qquad (x, y) \to (x + k y, \ y)$$

- $k > 0$: kéo phần trên sang phải. Hình vuông → hình bình hành nghiêng phải.
- $(1, 0) \to (1, 0)$ (trục x giữ nguyên).
- $(0, 1) \to (k, 1)$ (đỉnh trên dịch sang $(k, 1)$).

$$\text{Shear theo y:} \quad \begin{bmatrix} 1 & 0 \\ k & 1 \end{bmatrix}, \qquad (x, y) \to (x, \ k x + y)$$

**Ví dụ $k = 1$:** $(0, 1) \to (1, 1)$, $(2, 3) \to (5, 3)$.

### 3.6. Projection — chiếu lên trục/đường thẳng

- **Lên trục x**: $\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$. $(3, 4) \to (3, 0)$.
- **Lên trục y**: $\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$. $(3, 4) \to (0, 4)$.
- **Lên đường $y = x$**: $\frac{1}{2} \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$. $(3, 5) \to (4, 4)$.

Projection có **$\det = 0$** (bóp dẹt mặt phẳng thành đường thẳng).

> **⚠ Lỗi thường gặp**
>
> - **Nhầm $(a, b) \to (b, a)$ với rotation**: đó là **reflection qua $y = x$**, không phải rotation. Rotation phải có dạng $\cos$/$\sin$, $\det = +1$; còn reflection có $\det = -1$.
> - **Quên rằng shear bảo toàn diện tích**: $\det(\text{shear}) = 1 \cdot 1 - k \cdot 0 = 1$. Mặt phẳng bị "nghiêng" nhưng diện tích các hình không đổi.
> - **Tưởng projection là invertible**: KHÔNG. Projection mất thông tin (mọi điểm trên đường thẳng song song với hướng chiếu đều map vào cùng 1 điểm). $\det = 0$ → không có inverse.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Ma trận $\begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$ là biến đổi gì?
> 2. Ma trận $\begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$ (chú ý dấu) là biến đổi gì?
> 3. Áp dụng $\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ cho $(5, 7)$ được gì?
>
> <details><summary>Đáp án</summary>
>
> 1. Scaling đều gấp đôi. Mọi vector dài gấp 2.
> 2. Rotation $R(-90°)$ (xoay 90° theo chiều kim đồng hồ). $(1, 0) \to (0, -1)$.
> 3. $(5, 0)$ — chiếu xuống trục x.
> </details>

---

## 4. Walk-through 5 biến đổi cụ thể — xem `(1,0), (0,1), (1,1)` đi đâu

Đây là cách nhanh nhất để "đọc" một ma trận: chỉ cần xem 3 vector đặc biệt đi về đâu.

### 4.1. `A₁ = [[2, 0], [0, 3]]` — Scaling

| Vector | Ảnh | Mô tả |
|--------|-----|-------|
| $(1, 0)$ | $(2, 0)$ | Trục x kéo dài gấp 2 |
| $(0, 1)$ | $(0, 3)$ | Trục y kéo dài gấp 3 |
| $(1, 1)$ | $(2, 3)$ | Đường chéo bị biến dạng |

Hình vuông đơn vị → hình chữ nhật $2 \times 3$. Diện tích $2 \cdot 3 = 6$.

### 4.2. `A₂ = R(45°)` — Rotation 45°

$\cos 45° = \sin 45° = \frac{\sqrt{2}}{2} \approx 0.707$.

$$A_2 \approx \begin{bmatrix} 0.707 & -0.707 \\ 0.707 & 0.707 \end{bmatrix}$$

| Vector | Ảnh |
|--------|-----|
| $(1, 0)$ | $(0.707, 0.707)$ |
| $(0, 1)$ | $(-0.707, 0.707)$ |
| $(1, 1)$ | $(0, 1.414)$ — đường chéo thẳng đứng |

Diện tích không đổi: $\det = \cos^2(45°) + \sin^2(45°) = 1$.

### 4.3. `A₃ = [[0, 1], [1, 0]]` — Reflection qua `y = x`

| Vector | Ảnh |
|--------|-----|
| $(1, 0)$ | $(0, 1)$ |
| $(0, 1)$ | $(1, 0)$ |
| $(1, 1)$ | $(1, 1)$ (fixed) |

Đường $y = x$ là **trục đối xứng** — mọi điểm trên đó là điểm bất động.

### 4.4. `A₄ = [[1, 1], [0, 1]]` — Shear

| Vector | Ảnh |
|--------|-----|
| $(1, 0)$ | $(1, 0)$ (trục x bất động) |
| $(0, 1)$ | $(1, 1)$ |
| $(1, 1)$ | $(2, 1)$ |

Hình vuông đơn vị → hình bình hành. Diện tích vẫn = 1 ($\det = 1$).

### 4.5. `A₅ = [[1, 1], [1, 1]]` — Ma trận hạng 1 (projection lên `y = x`, có scaling)

| Vector | Ảnh |
|--------|-----|
| $(1, 0)$ | $(1, 1)$ |
| $(0, 1)$ | $(1, 1)$ |
| $(1, 1)$ | $(2, 2)$ |

Cả $(1, 0)$ và $(0, 1)$ đều map vào $(1, 1)$ — **mất thông tin**. Toàn bộ mặt phẳng bị bóp dẹt vào đường $y = x$. $\det = 0$.

> **📝 Tóm tắt mục 4**
> - Để "đọc" một ma trận 2×2: chỉ cần xem cột 1 (ảnh của $(1, 0)$) và cột 2 (ảnh của $(0, 1)$).
> - 6 biến đổi cơ bản (identity, scaling, rotation, reflection, shear, projection) là "bảng chữ cái" của linear transformation trong $\mathbb{R}^2$.

---

## 5. Composition = Nhân ma trận

### 5.1. Phát biểu

> Nếu $T_1(\mathbf{x}) = A\mathbf{x}$ và $T_2(\mathbf{y}) = B\mathbf{y}$, thì **composition** $T_2 \circ T_1$, tức là "áp $T_1$ trước rồi áp $T_2$", chính là nhân ma trận:
>
> $$(T_2 \circ T_1)(\mathbf{x}) = T_2(T_1(\mathbf{x})) = T_2(A\mathbf{x}) = B(A\mathbf{x}) = (BA)\mathbf{x}$$

Ma trận biểu diễn composition là **$BA$** (B đứng trước, A đứng sau — thứ tự ngược với thứ tự đọc!).

> **💡 Trực giác**
>
> Quy tắc đọc: **đọc từ PHẢI sang TRÁI**. $BA\mathbf{x}$ = "trước tiên áp A vào $\mathbf{x}$, rồi áp B vào kết quả".
>
> Đây là lý do duy nhất nhân ma trận được định nghĩa "kỳ lạ" — hàng nhân cột, thứ tự không giao hoán. Nó được thiết kế để **biểu diễn composition của linear transformation**. Nếu nhân ma trận được định nghĩa kiểu "ô tương ứng nhân nhau" (element-wise) thì composition sẽ KHÔNG biểu diễn được — và linear algebra sẽ vô dụng.

### 5.2. Walk-through

**Ví dụ.** $A$ = scaling gấp 2 theo x: $\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}$. $B$ = rotation 90° ngược chiều kim đồng hồ: $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$.

**Composition $BA$** (scale trước, rotate sau):

$$BA = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 \cdot 2 + (-1) \cdot 0 & 0 \cdot 0 + (-1) \cdot 1 \\ 1 \cdot 2 + 0 \cdot 0 & 1 \cdot 0 + 0 \cdot 1 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 2 & 0 \end{bmatrix}$$

Áp $BA$ vào $(1, 0)$: $(0 \cdot 1 + (-1) \cdot 0, \ 2 \cdot 1 + 0 \cdot 0) = (0, 2)$.

Kiểm tra từng bước:
- $A \cdot (1, 0) = (2, 0)$ (kéo x gấp 2).
- $B \cdot (2, 0) = (0, 2)$ (xoay 90° → trục y, dài 2). ✓

**Composition $AB$** (rotate trước, scale sau):

$$AB = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 1 & 0 \end{bmatrix}$$

Áp vào $(1, 0)$: $(0 \cdot 1 + (-2) \cdot 0, \ 1 \cdot 1 + 0 \cdot 0) = (0, 1)$.

Kiểm tra:
- $B \cdot (1, 0) = (0, 1)$ (xoay → trục y).
- $A \cdot (0, 1) = (0, 1)$ (không scale vì đang trên y).

→ $AB \neq BA$. **Thứ tự quan trọng.**

> **⚠ Lỗi thường gặp**
>
> - **Nhầm thứ tự**: muốn "rotate trước, scale sau" lại viết $BA$ (đáng ra phải $AB$). Quy tắc: ma trận đứng GẦN $\mathbf{x}$ nhất được áp ĐẦU TIÊN. $BA\mathbf{x}$ = $A$ áp trước.
> - **Tưởng $AB = BA$ luôn**: chỉ đúng trong một số trường hợp đặc biệt (cùng là rotation quanh gốc, hoặc cùng là diagonal). Tổng quát thì sai.

### 5.3. Vì sao điều này quan trọng?

- **Animation trong game/CGI**: nhân vật bị rotate, scale, translate liên tục → ghép thành 1 ma trận $M = T_3 T_2 T_1$ rồi áp 1 lần (tăng tốc).
- **Neural network**: 1 forward pass = $\text{output} = \sigma(W_n \, \sigma(W_{n-1} \, \cdots \, \sigma(W_1 \mathbf{x})))$ — composition của nhiều linear transformation (xen kẽ với non-linear $\sigma$).
- **Camera 3D → màn hình 2D**: ma trận projection ghép với ma trận view ghép với ma trận model.

> **📝 Tóm tắt mục 5**
> - Composition = nhân ma trận. $(T_2 \circ T_1)(\mathbf{x}) = (BA)\mathbf{x}$.
> - Đọc từ PHẢI sang TRÁI.
> - Nhân ma trận **không giao hoán** vì composition không giao hoán.

---

## 6. Kernel (Nhân) và Image (Ảnh)

### 6.1. Định nghĩa

> **Kernel (null space)** của ma trận $A$ (kích thước $m \times n$):
>
> $$\operatorname{Ker}(A) = \{ \mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0} \}$$
>
> Tập tất cả vector bị **nén về 0** dưới biến đổi $T$.

> **Image (column space, range)** của $A$:
>
> $$\operatorname{Im}(A) = \{ A\mathbf{x} : \mathbf{x} \in \mathbb{R}^n \} = \operatorname{span}(\text{các cột của } A)$$
>
> Tập tất cả vector có thể là **đầu ra** của $T$.

> **💡 Trực giác**
>
> - **Kernel** = "lỗ đen" của hàm. Mọi vector trong kernel bị **bóp dẹt thành 0**, không phân biệt được nhau sau khi áp $T$.
> - **Image** = "tầm với" của hàm. Đâu là các vector mà $T$ có thể tạo ra?
>
> Ví dụ với projection lên trục x:
> - Kernel = toàn bộ trục y (mọi $(0, y)$ đều → $(0, 0)$).
> - Image = toàn bộ trục x (mọi điểm trên trục x đều có thể là output).

### 6.2. Walk-through 3 ví dụ

**Ví dụ A. $A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$** (projection lên x).
- $A \cdot (x, y) = (x, 0)$.
- **Kernel**: $(x, y) = \mathbf{0}$ ⇒ $x = 0$, $y$ tự do ⇒ $\operatorname{Ker} = \{(0, y) : y \in \mathbb{R}\}$ = **trục y**, dim = 1.
- **Image**: $\{(x, 0) : x \in \mathbb{R}\}$ = **trục x**, dim = 1.

**Ví dụ B. $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$**.
- $\det = 1 \cdot 4 - 2 \cdot 3 = -2 \neq 0$ ⇒ $A$ invertible.
- **Kernel**: $A\mathbf{x} = \mathbf{0}$ chỉ có nghiệm $\mathbf{x} = \mathbf{0}$ (vì $A^{-1}$ tồn tại) ⇒ $\operatorname{Ker} = \{\mathbf{0}\}$, dim = 0.
- **Image**: span của cột $(1, 3)$ và $(2, 4)$ — 2 cột độc lập ⇒ $\operatorname{Im} = \mathbb{R}^2$, dim = 2.

**Ví dụ C. $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$** (cột 2 = 2·cột 1).
- $\det = 1 \cdot 4 - 2 \cdot 2 = 0$ ⇒ suy biến.
- Phương trình $A\mathbf{x} = \mathbf{0}$: $x + 2y = 0$ và $2x + 4y = 0$ (cùng phương trình) ⇒ $x = -2y$.
- **Kernel** = $\{(-2y, y) : y \in \mathbb{R}\}$ = đường thẳng đi qua gốc tọa độ có hướng $(-2, 1)$, dim = 1.
- **Image** = span của $(1, 2)$ (chỉ 1 cột độc lập) = đường thẳng $y = 2x$, dim = 1.

### 6.3. Tính kernel — giải `A·x = 0`

Phương pháp: dùng Gaussian elimination trên $A$ (giống Algebra Lesson 08) để đưa về dạng bậc thang, rồi đọc nghiệm.

**Ví dụ chi tiết.** $A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}$ ($2 \times 3$).
- Hàng 2 = 2·hàng 1 ⇒ hàng 2 bị triệt tiêu.
- Hệ rút gọn: $x_1 + 2x_2 + 3x_3 = 0$.
- 2 biến tự do $x_2 = s$, $x_3 = t$. Vậy $x_1 = -2s - 3t$.
- Kernel = $\{(-2s - 3t, \ s, \ t) : s, t \in \mathbb{R}\}$ = span của $(-2, 1, 0)$ và $(-3, 0, 1)$. Dim = 2.

> **❓ Câu hỏi tự nhiên**
>
> - *"Image và column space khác nhau ở đâu?"* — Là cùng một thứ. $\operatorname{Im} = \{A\mathbf{x}\} = \{x_1 \mathbf{a}_1 + x_2 \mathbf{a}_2 + \cdots + x_n \mathbf{a}_n\}$ (với $\mathbf{a}_i$ là cột thứ $i$) = span các cột.
> - *"Tại sao image gọi là 'range'?"* — Vì đó là **tập giá trị (range)** của hàm $T$.
> - *"Kernel có luôn chứa vector 0 không?"* — Có, vì $A\mathbf{0} = \mathbf{0}$ luôn đúng. Câu hỏi quan trọng hơn: kernel có **chỉ chứa** $\mathbf{0}$ hay không. Nếu chỉ có $\mathbf{0}$ ⇒ $A$ injective (1-1) ⇒ $A$ invertible (khi vuông).

---

## 7. Rank (Hạng)

### 7.1. Định nghĩa

> **Rank** của ma trận $A$:
>
> $$\operatorname{rank}(A) = \dim(\operatorname{Im}(A)) = \text{số cột độc lập tuyến tính của } A$$

Tương đương: số hàng độc lập (định lý: rank cột = rank hàng).

> **💡 Trực giác**
>
> Rank = **số chiều thực sự** của không gian đầu ra. Nếu $A : \mathbb{R}^n \to \mathbb{R}^m$ có rank $r$:
> - Đầu vào là $n$ chiều, nhưng image chỉ là một không gian $r$ chiều bên trong $\mathbb{R}^m$.
> - Nếu $r < n$, ma trận **mất thông tin** (bóp dẹt từ $n$ chiều xuống $r$ chiều).
> - Nếu $r = n = m$, ma trận **giữ đầy đủ** thông tin (invertible).

### 7.2. Định lý Rank-Nullity

> **Định lý Rank-Nullity**: Với $A$ kích thước $m \times n$,
>
> $$\operatorname{rank}(A) + \dim(\operatorname{Ker}(A)) = n \quad (\text{số cột})$$

$\dim(\operatorname{Ker}(A))$ còn gọi là **nullity** — số chiều của kernel.

**Ý nghĩa**: tổng "phần được giữ" (rank) và "phần bị nén về 0" (nullity) bằng đúng số chiều đầu vào.

### 7.3. Walk-through 3 ví dụ tính rank

**Ví dụ 1.** $A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$.
- Cột 1 = $(1, 0)$, cột 2 = $(0, 1)$ — độc lập.
- rank = 2. nullity = 0. Tổng = 2 = số cột. ✓

**Ví dụ 2.** $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$.
- Cột 2 = 2·cột 1 — phụ thuộc.
- rank = 1 (chỉ 1 cột độc lập). nullity = 1. Tổng = 2 = số cột. ✓

**Ví dụ 3.** $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$.
- Gauss elimination:
  - $R_2 \leftarrow R_2 - 4 R_1$: $(0, -3, -6)$.
  - $R_3 \leftarrow R_3 - 7 R_1$: $(0, -6, -12)$.
  - $R_3 \leftarrow R_3 - 2 R_2$: $(0, 0, 0)$.
- Dạng bậc thang: chỉ 2 hàng khác 0 ⇒ rank = 2. nullity = 3 - 2 = 1.

### 7.4. Phân loại theo rank

Cho $A$ kích thước $m \times n$:

| Trường hợp | Tên | Tính chất |
|------------|-----|-----------|
| $\operatorname{rank}(A) = \min(m, n)$ | **Full rank** | Không gian đầu ra là tối đa |
| $\operatorname{rank}(A) < \min(m, n)$ | **Rank deficient** | Mất thông tin, suy biến |
| $\operatorname{rank}(A) = n = m$ | **Invertible** (vuông) | $A^{-1}$ tồn tại, $\det \neq 0$ |
| $\operatorname{rank}(A) = 0$ | **Zero matrix** | Toàn ma trận = 0 |

> **🔁 Dừng lại tự kiểm tra**
>
> Tính rank và nullity của $A = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$.
>
> <details><summary>Đáp án</summary>
>
> Hàng 2 = hàng 1 ⇒ rank = 1. nullity = 3 - 1 = 2. (Kernel: $x + y + z = 0$ ⇒ span của $(-1, 1, 0)$ và $(-1, 0, 1)$.)
> </details>

> **📝 Tóm tắt mục 6-7**
> - Kernel = vector bị nén về 0. Image = ảnh đầu ra.
> - Rank = số chiều của image = số cột (hoặc hàng) độc lập.
> - Rank-Nullity: $\operatorname{rank} + \operatorname{nullity} = \text{số cột}$.

---

## 8. Định thức (Determinant)

### 8.1. Trực giác hình học

> **Định thức của ma trận $A$ ($n \times n$) = hệ số nhân thể tích ($n$ chiều) khi $A$ biến đổi không gian.**

- $n = 2$: $\det$ = diện tích hình bình hành mà hình vuông đơn vị biến thành.
- $n = 3$: $\det$ = thể tích khối hộp mà khối lập phương đơn vị biến thành.
- **Dấu của $\det$**: dương = giữ hướng (orientation), âm = đảo hướng (lật).

### 8.2. Công thức 2×2

$$A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}, \qquad \det(A) = ad - bc$$

**Chứng minh hình học**: Cột 1 = $(a, c)$, cột 2 = $(b, d)$. Hai vector này tạo hình bình hành với diện tích bằng $|ad - bc|$. (Đây là **cross product** của 2 vector trong mặt phẳng.)

**Ví dụ:**
- $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$: $\det = 2 \cdot 3 - 0 \cdot 0 = 6$. Hình vuông đơn vị → hình chữ nhật $2 \times 3$, diện tích 6. ✓
- $A = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$ (shear): $\det = 1 \cdot 1 - 1 \cdot 0 = 1$. Shear bảo toàn diện tích. ✓
- $A = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ (reflection qua trục x): $\det = 1 \cdot (-1) - 0 \cdot 0 = -1$. Diện tích = 1 (giữ nguyên), nhưng đảo hướng.
- $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$: $\det = 1 \cdot 4 - 2 \cdot 2 = 0$. Suy biến — bóp dẹt thành đường thẳng.
- $R(45°) = \begin{bmatrix} 0.707 & -0.707 \\ 0.707 & 0.707 \end{bmatrix}$: $\det = 0.707^2 + 0.707^2 = 1$. Rotation luôn $\det = 1$.

### 8.3. Công thức 3×3 (Sarrus / khai triển)

$$A = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix}$$

$$\begin{aligned}
\det(A) &= a(ei - fh) - b(di - fg) + c(dh - eg) \\
        &= aei + bfg + cdh - ceg - bdi - afh
\end{aligned}$$

**Ví dụ.** $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 10 \end{bmatrix}$.

$$\begin{aligned}
\det &= 1 \cdot (5 \cdot 10 - 6 \cdot 8) - 2 \cdot (4 \cdot 10 - 6 \cdot 7) + 3 \cdot (4 \cdot 8 - 5 \cdot 7) \\
     &= 1 \cdot (50 - 48) - 2 \cdot (40 - 42) + 3 \cdot (32 - 35) \\
     &= 1 \cdot 2 - 2 \cdot (-2) + 3 \cdot (-3) = 2 + 4 - 9 = -3
\end{aligned}$$

→ $\det = -3$. Có inverse, đảo hướng.

### 8.4. Tính chất quan trọng

1. **$\det(AB) = \det(A) \cdot \det(B)$** — định thức của composition = tích định thức.
2. **$\det(I) = 1$**.
3. **$\det(A^\top) = \det(A)$**.
4. **$\det(A^{-1}) = \dfrac{1}{\det(A)}$** (khi tồn tại).
5. **$\det(A) = 0$ ⇔ A suy biến ⇔ A không invertible ⇔ $\operatorname{rank}(A) < n$ ⇔ Kernel chứa nhiều hơn vector 0**.
6. Đổi 2 hàng ⇒ $\det$ đổi dấu. Nhân hàng với $k$ ⇒ $\det \times k$.

### 8.5. Tại sao det = 0 quan trọng?

- **$\det \neq 0$**: ma trận **trải** không gian đầu vào lên toàn bộ $\mathbb{R}^n$ đầu ra. Mọi $\mathbf{b}$ đều có duy nhất $\mathbf{x}$ sao cho $A\mathbf{x} = \mathbf{b}$.
- **$\det = 0$**: ma trận **bóp dẹt** không gian. Một số $\mathbf{b}$ không có nghiệm, một số có vô số nghiệm. (Đây là 3 trường hợp của Algebra Lesson 08!)

> **⚠ Lỗi thường gặp**
>
> - **Tưởng det là tổng các phần tử trên đường chéo**: đó là **trace** (vết), không phải det. Trace = $a + d$ cho 2×2, trong khi $\det = ad - bc$.
> - **Quên lấy giá trị tuyệt đối khi nói về diện tích**: diện tích = $|\det|$, $\det$ có thể âm.
> - **Tính det cho ma trận không vuông**: định thức chỉ định nghĩa cho ma trận VUÔNG.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. $\det\begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix} = ?$
> 2. Ma trận $\begin{bmatrix} 2 & 1 \\ 4 & 2 \end{bmatrix}$ có invertible không?
> 3. Rotation luôn có det bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $3 \cdot 2 - 4 \cdot 1 = 2$.
> 2. $\det = 2 \cdot 2 - 1 \cdot 4 = 0$. Không invertible.
> 3. $\det R(\theta) = \cos^2\theta + \sin^2\theta = 1$.
> </details>

> **📝 Tóm tắt mục 8**
> - $\det$ = hệ số nhân diện tích/thể tích.
> - $\det = 0$ ⇔ suy biến (mất thông tin).
> - $\det < 0$ ⇔ đảo hướng (reflection-like).
> - $\det(AB) = \det(A) \cdot \det(B)$.

---

## 9. Ma trận đặc biệt

### 9.1. Trực giao (Orthogonal)

> **A trực giao ⇔ $A^\top A = I$ ⇔ $A^{-1} = A^\top$.**

- **Bảo toàn độ dài**: $\lVert A\mathbf{x} \rVert = \lVert \mathbf{x} \rVert$ với mọi $\mathbf{x}$.
- **Bảo toàn góc và dot product**: $(A\mathbf{u}) \cdot (A\mathbf{v}) = \mathbf{u} \cdot \mathbf{v}$.
- **Các cột tạo thành orthonormal basis** (vuông góc đôi một, mỗi cột có độ dài 1).
- **$\det = \pm 1$**.

**Ví dụ**:
- Rotation $R(\theta)$: trực giao, $\det = +1$.
- Reflection: trực giao, $\det = -1$.
- Identity $I$: trực giao.

**Walk-through** $A = R(60°) = \begin{bmatrix} 0.5 & -0.866 \\ 0.866 & 0.5 \end{bmatrix}$:
- $A^\top A$: phần tử (1,1) = $0.5^2 + 0.866^2 = 0.25 + 0.75 = 1$. ✓
- Phần tử (1,2) = $0.5 \cdot (-0.866) + 0.866 \cdot 0.5 = 0$. ✓
- → $A^\top A = I$. Trực giao.

**Trong ML**: PCA tìm trục mới = ma trận trực giao. SVD phân tích $A = U \Sigma V^\top$ với $U$, $V$ trực giao.

### 9.2. Đối xứng (Symmetric)

> **A đối xứng ⇔ $A = A^\top$** (ma trận vuông, đối xứng qua đường chéo).

- Mọi eigenvalue là **số thực** (sẽ học Lesson 07).
- Có thể chéo hóa được (diagonalizable) bằng ma trận trực giao.

**Ví dụ trong ML**:
- **Covariance matrix**: $\Sigma = \frac{1}{n} X^\top X$. Luôn đối xứng. Là trung tâm của PCA.
- **Hessian** (ma trận đạo hàm bậc 2): $H_{ij} = \dfrac{\partial^2 f}{\partial x_i \, \partial x_j}$. Đối xứng theo định lý Schwarz.
- **Gram matrix** $G = X^\top X$ trong kernel methods.

### 9.3. Đường chéo (Diagonal)

> **A đường chéo ⇔ $a_{ij} = 0$ với mọi $i \neq j$.** Chỉ có phần tử trên đường chéo khác 0.

- Biểu diễn scaling thuần (mỗi trục bị scale với hệ số $a_{ii}$).
- **det = tích các phần tử đường chéo**: $\det(\operatorname{diag}(\lambda_1, \ldots, \lambda_n)) = \lambda_1 \cdots \lambda_n$.
- **Nhân ma trận đường chéo rất nhanh**: $O(n)$ thay vì $O(n^2)$.
- **Inverse**: $(\operatorname{diag}(\lambda_1, \ldots, \lambda_n))^{-1} = \operatorname{diag}(1/\lambda_1, \ldots, 1/\lambda_n)$ (nếu mọi $\lambda_i \neq 0$).

**Trong ML**: SVD cho ma trận giữa $\Sigma$ là **diagonal** chứa các giá trị kỳ dị (singular values).

### 9.4. Bảng so sánh

| Loại | Định nghĩa | det | Inverse | Ví dụ ML |
|------|-----------|-----|---------|----------|
| Identity | $a_{ij} = \delta_{ij}$ | 1 | $I$ | "Không làm gì" |
| Diagonal | $a_{ij} = 0$ khi $i \neq j$ | $\prod a_{ii}$ | $\operatorname{diag}(1/a_{ii})$ | $\Sigma$ trong SVD |
| Symmetric | $A = A^\top$ | bất kỳ | thường tồn tại | Covariance, Hessian |
| Orthogonal | $A^\top A = I$ | $\pm 1$ | $A^\top$ | Rotation, U, V trong SVD |
| Triangular (tam giác) | $a_{ij} = 0$ ở nửa kia | $\prod a_{ii}$ | bằng back-substitution | LU decomposition |

> **❓ Câu hỏi tự nhiên**
>
> - *"Orthogonal và orthonormal khác nhau gì?"* — "Orthogonal matrix" trong linear algebra = các cột **orthonormal** (vừa vuông góc vừa có độ dài 1). Tên hơi không chuẩn nhưng đã thành quy ước.
> - *"Symmetric thì có invertible không?"* — Không nhất thiết. $\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$ đối xứng nhưng $\det = 0$. Nhưng nếu symmetric **và** mọi eigenvalue $\neq 0$ ⇒ invertible.

---

## 10. Affine Transformation và liên hệ với ML/AI

### 10.1. Affine = Linear + Translation

> **Affine transformation**: $T(\mathbf{x}) = A\mathbf{x} + \mathbf{b}$, với $A$ là ma trận, $\mathbf{b}$ là vector hằng.
>
> - Khi $\mathbf{b} = \mathbf{0}$: thuần linear.
> - Khi $\mathbf{b} \neq \mathbf{0}$: KHÔNG còn linear ($T(\mathbf{0}) = \mathbf{b} \neq \mathbf{0}$).

Nhưng có một mẹo: dùng **homogeneous coordinates** — nhúng $\mathbb{R}^n$ vào $\mathbb{R}^{n+1}$ bằng cách thêm 1 vào cuối:

$$\begin{bmatrix} A & \mathbf{b} \\ \mathbf{0} & 1 \end{bmatrix} \begin{bmatrix} \mathbf{x} \\ 1 \end{bmatrix} = \begin{bmatrix} A\mathbf{x} + \mathbf{b} \\ 1 \end{bmatrix}$$

→ Affine **trở thành** linear trong không gian cao hơn 1 chiều. Đây là lý do trong graphics 3D người ta dùng ma trận $4 \times 4$ thay vì $3 \times 3$.

### 10.2. Fully-Connected Layer trong Neural Network

Một FC layer trong neural net có công thức chuẩn:

$$\mathbf{y} = \sigma(W\mathbf{x} + \mathbf{b})$$

- $\mathbf{x} \in \mathbb{R}^n$: input.
- $W \in \mathbb{R}^{m \times n}$: weight matrix (linear transformation).
- $\mathbf{b} \in \mathbb{R}^m$: bias.
- $\sigma$: hàm phi tuyến (ReLU, sigmoid, ...).
- $\mathbf{y} \in \mathbb{R}^m$: output.

**Phần $W\mathbf{x} + \mathbf{b}$ chính là affine transformation** từ $\mathbb{R}^n$ sang $\mathbb{R}^m$. Không có hàm phi tuyến $\sigma$, một mạng FC nhiều layer chỉ là **composition của các affine transformation** = một affine transformation duy nhất (vô dụng). $\sigma$ mới làm cho mạng "deep".

**Walk-through.** Mạng 2 layer:
- Layer 1: $\mathbf{h} = \operatorname{ReLU}(W_1 \mathbf{x} + \mathbf{b}_1)$. $\mathbf{x} \in \mathbb{R}^3, W_1 \in \mathbb{R}^{4 \times 3}, \mathbf{b}_1 \in \mathbb{R}^4, \mathbf{h} \in \mathbb{R}^4$.
- Layer 2: $\mathbf{y} = W_2 \mathbf{h} + \mathbf{b}_2$. $W_2 \in \mathbb{R}^{2 \times 4}, \mathbf{b}_2 \in \mathbb{R}^2, \mathbf{y} \in \mathbb{R}^2$.

Nếu bỏ $\operatorname{ReLU}$: $\mathbf{y} = W_2(W_1 \mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = (W_2 W_1)\mathbf{x} + (W_2 \mathbf{b}_1 + \mathbf{b}_2)$ — vẫn affine, không học được hàm phức.

### 10.3. Convolution trong CNN = Sparse Matrix

**Convolution** với kernel 3×3 cho ảnh 5×5 thực ra **là phép nhân ma trận**: ảnh được flatten thành vector 25 chiều, output flatten thành vector (hoặc giữ 2D). Ma trận biến đổi có:
- Kích thước $(\text{số pixel output}) \times 25$.
- **Thưa**: hầu hết phần tử = 0, chỉ ~9 phần tử khác 0 mỗi hàng (tương ứng với 9 ô của kernel).
- **Chia sẻ tham số**: các hàng có cùng cấu trúc, chỉ dịch chuyển vị trí.

Convolution = **linear transformation đặc biệt** với 2 ràng buộc: sparse + parameter sharing. Đây là lý do CNN học efficient hơn FC layer cho ảnh.

### 10.4. Whitening Data — chuẩn bị cho ML

**Whitening** = biến đổi dữ liệu để **covariance matrix = I**:
- Trừ mean: $\tilde{\mathbf{x}} = \mathbf{x} - \boldsymbol{\mu}$.
- Tính covariance $\Sigma = \frac{1}{n} \tilde{X}^\top \tilde{X}$.
- Eigendecomposition $\Sigma = U D U^\top$ (Lesson 07).
- Áp $W = D^{-1/2} U^\top$ lên dữ liệu: $\mathbf{z} = W\tilde{\mathbf{x}}$.
- Kết quả: dữ liệu mới $\mathbf{z}$ có covariance = $I$.

**Tại sao có ích?** Một số thuật toán (PCA gradient descent, một số loss function) hội tụ nhanh hơn khi dữ liệu "tròn" (covariance = $I$) thay vì "elip kéo dài" (eigenvalue chênh lệch lớn → ill-conditioned).

### 10.5. Tổng kết liên hệ

| Khái niệm linear algebra | Ứng dụng ML/AI |
|--------------------------|-----------------|
| Ma trận = linear transformation | Weight matrix $W$ trong neural net |
| Affine transformation | FC layer $W\mathbf{x} + \mathbf{b}$ |
| Composition = nhân ma trận | Forward pass của deep network |
| Sparse matrix | Convolution layer |
| Orthogonal matrix | Rotation trong embeddings, U/V trong SVD |
| Symmetric matrix | Covariance, Hessian, Gram matrix |
| Diagonal matrix | $\Sigma$ trong SVD, sau khi whitening |
| $\det = 0$ | Mất thông tin (PCA cắt component) |
| Kernel | Null space — feature bị "kill" |
| Image | Subspace mà model có thể đại diện |

> **📝 Tóm tắt mục 9-10**
> - 4 loại ma trận đặc biệt: orthogonal (bảo toàn dài/góc), symmetric (eigenvalue thực), diagonal (scaling thuần), triangular (LU).
> - FC layer = affine = $W\mathbf{x} + \mathbf{b}$. Phi tuyến $\sigma$ mới là chìa khóa.
> - Convolution = sparse linear transformation.
> - Whitening = biến đổi để covariance = $I$.

---

## 11. Bài tập

### Bài tập 1 — Dựng ma trận từ mô tả

Cho $T : \mathbb{R}^2 \to \mathbb{R}^2$ là biến đổi đáp ứng $T(1, 0) = (2, 1)$ và $T(0, 1) = (-1, 3)$. Viết ma trận của $T$. Tính $T(4, -2)$.

### Bài tập 2 — Composition

Cho $A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$ (shear), $B = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$ (scale gấp 2).
- a) Tính $AB$ và $BA$. Có bằng nhau không?
- b) Áp $AB$ vào $(1, 1)$. So sánh với áp lần lượt $B$ rồi $A$.

### Bài tập 3 — Kernel và Image

Cho $A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix}$.
- a) Tìm kernel của $A$.
- b) Tính rank và image của $A$.
- c) Kiểm tra Rank-Nullity.

### Bài tập 4 — Determinant và ý nghĩa hình học

- a) Tính det của $M = \begin{bmatrix} 3 & 1 \\ 2 & 4 \end{bmatrix}$.
- b) Hình vuông đơn vị (đỉnh $(0,0), (1,0), (1,1), (0,1)$) bị $M$ biến đổi thành hình gì? Diện tích bằng bao nhiêu?
- c) $M$ có đảo hướng không?

### Bài tập 5 — Nhận diện ma trận đặc biệt

Với mỗi ma trận sau, xác định: orthogonal? symmetric? diagonal? Tính det:
- a) $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$
- b) $\dfrac{1}{\sqrt{2}} \begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}$
- c) $\begin{bmatrix} 3 & 2 \\ 2 & 5 \end{bmatrix}$
- d) $\begin{bmatrix} 2 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & -1 \end{bmatrix}$

### Bài tập 6 — Affine và FC layer mini

Giả sử bạn có một FC layer $\mathbf{y} = W\mathbf{x} + \mathbf{b}$ với $W = \begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix}$, $\mathbf{b} = (1, 0)$. Bỏ hàm phi tuyến.
- a) Tính $\mathbf{y}$ cho $\mathbf{x} = (2, 1)$.
- b) Layer này biểu diễn linear transformation hay affine? Tại sao?
- c) Viết biểu diễn của layer này dưới dạng homogeneous (ma trận $3 \times 3$ áp dụng cho vector $(x, y, 1)$).

---

## 12. Lời giải chi tiết

### Bài 1

$A = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{bmatrix} = \begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$.

$T(4, -2) = A \cdot (4, -2) = (2 \cdot 4 + (-1) \cdot (-2), \ 1 \cdot 4 + 3 \cdot (-2)) = (8 + 2, \ 4 - 6) = (10, -2)$.

### Bài 2

a)

$$\begin{aligned}
AB &= \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} 1 \cdot 2 + 2 \cdot 0 & 1 \cdot 0 + 2 \cdot 2 \\ 0 \cdot 2 + 1 \cdot 0 & 0 \cdot 0 + 1 \cdot 2 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 0 & 2 \end{bmatrix} \\[6pt]
BA &= \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 0 & 2 \end{bmatrix}
\end{aligned}$$

Trùng nhau! Đây là trường hợp đặc biệt: $B = 2I$ (scaling đều) giao hoán với mọi ma trận. (Vì $I$ giao hoán với mọi ma trận, và scalar $2$ giao hoán.)

b) $AB \cdot (1, 1) = \begin{bmatrix} 2 & 4 \\ 0 & 2 \end{bmatrix} (1, 1) = (2 + 4, \ 0 + 2) = (6, 2)$.

Lần lượt: $B \cdot (1, 1) = (2, 2)$. Rồi $A \cdot (2, 2) = (1 \cdot 2 + 2 \cdot 2, \ 0 \cdot 2 + 1 \cdot 2) = (6, 2)$. ✓ Khớp.

### Bài 3

a) Tìm $\mathbf{x}$ sao cho $A\mathbf{x} = \mathbf{0}$:
- Hệ: $x_1 + 2x_2 - x_3 = 0$ và $2x_1 + 4x_2 - 2x_3 = 0$. Hàng 2 = 2·hàng 1 ⇒ chỉ 1 phương trình độc lập.
- $x_1 = -2x_2 + x_3$. Cho $x_2 = s, x_3 = t$: $\mathbf{x} = (-2s + t, \ s, \ t) = s \cdot (-2, 1, 0) + t \cdot (1, 0, 1)$.
- → $\operatorname{Ker}$ = span của $(-2, 1, 0)$ và $(1, 0, 1)$. dim = 2.

b) Image = span của cột $(1, 2), (2, 4), (-1, -2)$. Tất cả đều là bội của $(1, 2)$. → Image = span của $(1, 2)$, dim = rank = 1.

c) Rank-Nullity: $\operatorname{rank} + \operatorname{nullity} = 1 + 2 = 3 =$ số cột. ✓

### Bài 4

a) $\det(M) = 3 \cdot 4 - 1 \cdot 2 = 12 - 2 = 10$.

b) Hình vuông đơn vị → hình bình hành với 4 đỉnh:
- $(0, 0) \to (0, 0)$.
- $(1, 0) \to (3, 2)$.
- $(0, 1) \to (1, 4)$.
- $(1, 1) \to (4, 6)$.

Diện tích = $|\det| = 10$.

c) $\det > 0$ ⇒ KHÔNG đảo hướng. Giữ orientation (vẫn ngược chiều kim đồng hồ như ban đầu).

### Bài 5

a) $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$:
- Symmetric: $A = A^\top$ ✓
- Diagonal: ✓ (các phần tử ngoài chéo = 0)
- Orthogonal: $A^\top A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$ ✓
- $\det = 1 \cdot (-1) - 0 = -1$. (Reflection qua trục x.)

b) $\dfrac{1}{\sqrt{2}} \begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}$:
- Symmetric: cột 1 = $(1/\sqrt{2}, \ 1/\sqrt{2})$, cột 2 = $(-1/\sqrt{2}, \ 1/\sqrt{2})$. Hàng 1 = $(1/\sqrt{2}, \ -1/\sqrt{2})$. Không bằng $A^\top$. → KHÔNG symmetric.
- Diagonal: KHÔNG.
- Orthogonal: tính $A^\top A$:
  - (1,1) = $(1/\sqrt{2})^2 + (1/\sqrt{2})^2 = 1/2 + 1/2 = 1$ ✓
  - (1,2) = $(1/\sqrt{2}) \cdot (-1/\sqrt{2}) + (1/\sqrt{2}) \cdot (1/\sqrt{2}) = 0$ ✓
  - (2,2) = $(-1/\sqrt{2})^2 + (1/\sqrt{2})^2 = 1$ ✓
  - → $A^\top A = I$. Trực giao.
- $\det = (1/\sqrt{2}) \cdot (1/\sqrt{2}) - (-1/\sqrt{2}) \cdot (1/\sqrt{2}) = 1/2 + 1/2 = 1$. (Đây là $R(45°)$.)

c) $\begin{bmatrix} 3 & 2 \\ 2 & 5 \end{bmatrix}$:
- Symmetric: ✓
- Diagonal: ✗
- Orthogonal: $A^\top A = A A = \begin{bmatrix} 3 \cdot 3 + 2 \cdot 2 & 3 \cdot 2 + 2 \cdot 5 \\ 2 \cdot 3 + 5 \cdot 2 & 2 \cdot 2 + 5 \cdot 5 \end{bmatrix} = \begin{bmatrix} 13 & 16 \\ 16 & 29 \end{bmatrix} \neq I$. KHÔNG.
- $\det = 3 \cdot 5 - 2 \cdot 2 = 11$.

d) $\operatorname{diag}(2, 3, -1)$:
- Diagonal: ✓
- Symmetric: ✓
- Orthogonal: $A^\top A = \operatorname{diag}(4, 9, 1) \neq I$. KHÔNG.
- $\det = 2 \cdot 3 \cdot (-1) = -6$.

### Bài 6

a) $\mathbf{y} = W\mathbf{x} + \mathbf{b} = (1 \cdot 2 + 2 \cdot 1, \ 3 \cdot 2 + (-1) \cdot 1) + (1, 0) = (4, 5) + (1, 0) = (5, 5)$.

b) **Affine**, không phải linear thuần. Vì $\mathbf{b} \neq \mathbf{0}$ ⇒ $T(\mathbf{0}) = \mathbf{b} = (1, 0) \neq \mathbf{0}$, không thoả mãn $T(\mathbf{0}) = \mathbf{0}$ của linear transformation.

c) Homogeneous form: nhúng $\mathbf{x} = (x_1, x_2)$ thành $(x_1, x_2, 1) \in \mathbb{R}^3$, dùng ma trận:

$$M = \begin{bmatrix} 1 & 2 & 1 \\ 3 & -1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

Kiểm tra: $M \cdot (2, 1, 1) = (1 \cdot 2 + 2 \cdot 1 + 1 \cdot 1, \ 3 \cdot 2 + (-1) \cdot 1 + 0 \cdot 1, \ 0 + 0 + 1) = (5, 5, 1)$. ✓ Khớp với $\mathbf{y} = (5, 5)$ từ phần (a).

---

## 13. Tổng kết và liên kết

**Bài này đã đặt nền cho mọi thứ phía sau:**

- **Lesson 07 — Eigenvector & eigenvalue**: tìm các vector mà $A\mathbf{v} = \lambda \mathbf{v}$ — hướng "không bị xoay" bởi $A$. Đây là khái niệm trung tâm của PCA, PageRank, spectral clustering.
- **Lesson 08 — PCA và SVD**: PCA = tìm hệ trục mới sao cho dữ liệu trải dài tối đa theo một số trục (eigenvector của covariance matrix). SVD = phân tích MỌI ma trận $A = U \Sigma V^\top$ (3 ma trận đặc biệt: orthogonal, diagonal, orthogonal).
- **Tầng 5+ — Probability và Statistics**: covariance matrix (symmetric, semi-positive-definite), multivariate Gaussian.
- **Tầng 6+ — Machine Learning**: linear regression = giải $A\mathbf{x} = \mathbf{b}$ bằng least squares. Logistic regression, neural network = composition of affine + nonlinear.

**Slogan cho bài này**:

> "Mỗi ma trận là một hành động. Học linear algebra là học **mục lục các hành động** mà bạn có thể làm với vector — và cách kết hợp chúng."

---

## 14. Tham khảo

- **3Blue1Brown — Essence of Linear Algebra (chương 3-7)** — series video kinh điển về geometric intuition. Bài này lấy cảm hứng nhiều từ đó.
- **Strang, *Introduction to Linear Algebra*** — sách giáo trình MIT, chương 7-8 cho linear transformation.
- **Axler, *Linear Algebra Done Right*** — nhìn từ góc độ abstract (vector space, transformation), không phụ thuộc tọa độ.

---

**Tiếp theo**: [Lesson 07 — Eigenvector và Eigenvalue →](../lesson-07-eigenvectors/)

**Quay lại**: [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) · [Trang chính tầng](../index.html) · [Trang chính repo](../../index.html)
