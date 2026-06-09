# Lesson 01 — Vector & Ma trận

## Mục tiêu

- **Vector** trong $\mathbb{R}^n$: phép toán cộng, nhân vô hướng, tích vô hướng.
- **Ma trận**: cộng, nhân ma trận-vector, nhân ma trận-ma trận.
- Hiểu ma trận như **phép biến đổi tuyến tính**.
- Kết nối với Vectors tier riêng (đã có).

## Kiến thức tiền đề

- [Tier 2 L08 — Biến hình & vector hình học](../../02-Geometry/lesson-08-transformations-vector-geo/).
- Có thể tham khảo [Vectors tier riêng](../../../Vectors/01-Algebra/) cho phần ứng dụng AI/ML.

---

## 1. Vector trong $\mathbb{R}^n$

💡 **Trực giác / Hình dung**: vector = "**mũi tên có hướng và độ dài**" trong không gian, ghi bằng tọa độ. Trong $\mathbb{R}^2$ mũi tên đi từ gốc O tới điểm $(3, 4)$. Lên $\mathbb{R}^n$ ta không "vẽ" được nữa nhưng vẫn tính như mũi tên: cộng vector = nối đuôi-đầu (luật hình bình hành), nhân vô hướng $c\cdot\vec{v}$ = kéo dài/co mũi tên gấp $c$ lần (nếu $c < 0$ thì quay ngược). Tích vô hướng đo "hai mũi tên cùng hướng tới mức nào".

💡 **Định nghĩa**: Vector n chiều = bộ n số thực, viết theo cột:

$$\vec{v} = (v_1, v_2, \ldots, v_n)$$

**Phép toán**:
- Cộng: $\vec{u} + \vec{v} = (u_1+v_1, \ldots, u_n+v_n)$.
- Nhân vô hướng: $c\cdot\vec{v} = (c\cdot v_1, \ldots, c\cdot v_n)$.
- **Tích vô hướng** (dot product): $\vec{u} \cdot \vec{v} = u_1 v_1 + \ldots + u_n v_n$ (= 1 số).
- **Độ dài (chuẩn)**: $\lVert\vec{v}\rVert = \sqrt{\vec{v} \cdot \vec{v}} = \sqrt{v_1^2 + \ldots + v_n^2}$.

**4 ví dụ số đa dạng** ($\vec{u} = (1, 2, 3)$, $\vec{v} = (4, -1, 2)$):
- Cộng: $\vec{u} + \vec{v} = (5, 1, 5)$.
- Tích vô hướng (ra dương): $\vec{u} \cdot \vec{v} = 1\cdot 4 + 2\cdot(-1) + 3\cdot 2 = 4 - 2 + 6 = \mathbf{8}$.
- Tích vô hướng (ra **0** → vuông góc): $(1, 0, 0) \cdot (0, 5, 7) = 0 + 0 + 0 = 0$ → 2 vector $\perp$.
- Chuẩn: $\lVert\vec{u}\rVert = \sqrt{1+4+9} = \mathbf{\sqrt{14} \approx 3.74}$; nhân vô hướng âm: $(-2)\cdot\vec{u} = (-2, -4, -6)$.

### Góc giữa 2 vector

$$\cos\theta = \frac{\vec{u} \cdot \vec{v}}{\lVert\vec{u}\rVert\cdot\lVert\vec{v}\rVert}$$

⟶ $\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}$.

**Verify bằng số**: $\vec{u} = (1, 0)$, $\vec{v} = (1, 1)$. $\vec{u}\cdot\vec{v} = 1$. $\lVert\vec{u}\rVert = 1$, $\lVert\vec{v}\rVert = \sqrt{2}$. $\cos\theta = 1/\sqrt{2} \approx 0.707$ → $\theta = 45°$ ✓ (đúng với hình: mũi tên $(1,1)$ nghiêng 45° so với trục x).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích vô hướng ra 1 số, vậy nó 'đo' cái gì?"* Đo mức độ 2 vector cùng hướng. $\vec{u}\cdot\vec{v} > 0$ → góc nhọn (cùng phía); $= 0$ → vuông góc; $< 0$ → góc tù (ngược phía). Vd $(1,0)\cdot(-1,0) = -1 < 0$ vì ngược hẳn.
- *"Vì sao chuẩn lại là √ của tích vô hướng với chính nó?"* Vì $\vec{v}\cdot\vec{v} = v_1^2+\ldots+v_n^2$ chính là Pytago mở rộng. Trong $\mathbb{R}^2$: $\lVert\vec{v}\rVert = \sqrt{v_1^2+v_2^2}$ đúng là độ dài cạnh huyền.

⚠ **Lỗi thường gặp — nhầm tích vô hướng với nhân từng phần tử**. $\vec{u}\cdot\vec{v}$ là **1 số** (cộng tất cả các tích), KHÔNG phải vector. Phản ví dụ: $(1,2)\cdot(3,4) = 1\cdot 3 + 2\cdot 4 = \mathbf{11}$ (một số), không phải $(3, 8)$. Phép "nhân từng phần tử" $(3, 8)$ tồn tại nhưng gọi là tích Hadamard, khác hẳn.

🔁 **Dừng lại tự kiểm tra**

1. Cho $\vec{a} = (2, -1)$, $\vec{b} = (1, 2)$. Tính $\vec{a}\cdot\vec{b}$. Hai vector này có vuông góc không?
2. Tính $\lVert(3, 4)\rVert$.

<details><summary>Đáp án</summary>

1. $\vec{a}\cdot\vec{b} = 2\cdot 1 + (-1)\cdot 2 = 2 - 2 = \mathbf{0}$ → **có**, vuông góc.
2. $\lVert(3,4)\rVert = \sqrt{9+16} = \sqrt{25} = \mathbf{5}$.

</details>

### 📝 Tóm tắt mục 1

- Vector $\mathbb{R}^n$ = bộ n số = "mũi tên" có hướng + độ dài.
- Cộng/nhân vô hướng làm **từng thành phần**; tích vô hướng $\vec{u}\cdot\vec{v}$ cộng các tích → ra **1 số**.
- $\vec{u}\cdot\vec{v} = 0 \iff$ vuông góc; $\cos\theta = \vec{u}\cdot\vec{v} / (\lVert\vec{u}\rVert\cdot\lVert\vec{v}\rVert)$; $\lVert\vec{v}\rVert = \sqrt{\vec{v}\cdot\vec{v}}$.

---

## 2. Ma trận

💡 **Trực giác / Hình dung**: ma trận = một **cái máy biến đổi không gian**. Đưa vào 1 vector $\vec{x}$, máy nhả ra vector mới $A\vec{x}$ (đã bị quay/co/giãn/lật/chiếu). Bảng số chỉ là cách "ghi cấu hình" của máy: mỗi cột cho biết vector đơn vị đi về đâu. Vd cột 1 = ảnh của $(1,0)$, cột 2 = ảnh của $(0,1)$. Cộng/nhân vô hướng ma trận = chỉnh cấu hình từng nút; nhân 2 ma trận = **ghép 2 máy** (chạy máy này rồi máy kia).

**Ma trận** $m \times n$ = bảng số có m hàng, n cột:

$$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & & & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}$$

### Cộng / nhân vô hướng

Tương tự vector — cộng từng phần tử, nhân số.

### Nhân ma trận-vector

Nếu A là $m \times n$ và $\vec{x} \in \mathbb{R}^n$:

$$\vec{y} = A\cdot\vec{x} \in \mathbb{R}^m, \qquad y_i = \sum_j a_{ij}\cdot x_j$$

Mỗi thành phần $y_i$ = tích vô hướng của hàng i của A với $\vec{x}$.

**Ví dụ**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $\vec{x} = (5, 6)$.
- $y_1 = 1\cdot 5 + 2\cdot 6 = 17$.
- $y_2 = 3\cdot 5 + 4\cdot 6 = 39$.

> 📐 **Định nghĩa đầy đủ — Ma trận**
>
> **(a) Là gì**: Bảng số chữ nhật $m \times n$. KHÔNG chỉ là "lưu trữ data" — ma trận **= phép biến đổi tuyến tính** $\mathbb{R}^n \to \mathbb{R}^m$. Mỗi cột của A là **vector ảnh** của vector đơn vị tương ứng ($e_1 \to$ cột 1, $e_2 \to$ cột 2, ...). Nhân $A\vec{x}$ = "tổ hợp tuyến tính" các cột của A với hệ số là $\vec{x}$.
>
> **(b) Vì sao cần**: Ma trận là **ngôn ngữ chung** của hàng trăm bài toán: hệ PT tuyến tính ($A\vec{x} = \vec{b}$), phép biến hình hình học (quay, đối xứng, vị tự), graph (ma trận liên kết), markov chain, neural network (mỗi layer = nhân ma trận), nén ảnh (SVD), computer graphics (3D rendering = ma trận 4x4). Quan trọng hơn — nhân ma trận = **ghép biến đổi** (composition), cho phép biểu diễn các phép tuyến tính phức tạp = tích các phép đơn giản.
>
> **(c) Ví dụ số**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $\vec{x} = (5, 6)$ → $A\vec{x} = (17, 39)$. $A\cdot(1,0) = (1,3)$ = cột 1 của A ✓. $A\cdot(0,1) = (2,4)$ = cột 2 ✓. Ma trận quay 90° $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ biến $(1,0) \to (0,1)$, $(0,1) \to (-1,0)$. Ghép 2 quay 30° = quay 60°: $R(30)\cdot R(30) = R(60)$. Identity $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$: $I\cdot\vec{x} = \vec{x}$ (không đổi). Nhân ma trận-ma trận $AB$: cột j của $AB$ = $A\cdot$(cột j của B). $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\cdot\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$.
- $\vec{y} = (17, 39)$.

### Nhân ma trận-ma trận

A $m \times n$, B $n \times p$ → $AB$ là $m \times p$.

$$(AB)_{ij} = \sum_k a_{ik} \cdot b_{kj}$$

= tích vô hướng hàng i của A với cột j của B.

**Verify bằng số** ($AB$ với $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$):
- $(AB)_{11}$ = hàng 1 của A · cột 1 của B = $1\cdot 5 + 2\cdot 7 = \mathbf{19}$.
- $(AB)_{12} = 1\cdot 6 + 2\cdot 8 = \mathbf{22}$.
- $(AB)_{21} = 3\cdot 5 + 4\cdot 7 = \mathbf{43}$.
- $(AB)_{22} = 3\cdot 6 + 4\cdot 8 = \mathbf{50}$. → $AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$.

⚠ **Lỗi thường gặp 1 — Nhân ma trận KHÔNG giao hoán**: $AB \neq BA$ (nói chung). Phản ví dụ với $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$: $AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}$ nhưng $BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$. Khác hẳn. Lý do trực giác: "quay rồi lật" ≠ "lật rồi quay".

⚠ **Lỗi thường gặp 2 — nhầm hàng với cột khi nhân**. $(AB)_{ij}$ = **hàng i của A** · **cột j của B**, KHÔNG phải cột i · hàng j. Nếu kích thước không khớp (số cột của A $\neq$ số hàng của B) thì phép nhân **không tồn tại**: A là $2 \times 3$ nhân B là $2 \times 2$ → vô nghĩa ($3 \neq 2$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quy tắc nhân ma trận 'rối' thế, sao không nhân từng ô như cộng?"* Vì nhân ma trận được **thiết kế để = ghép biến đổi**. Muốn "(A rồi B)$\cdot\vec{x}$ = A$\cdot$(B$\cdot\vec{x}$)" đúng thì buộc phải dùng quy tắc hàng·cột này. Nhân từng ô không cho tính chất đó.
- *"AB tốn bao nhiêu phép tính?"* Với 2 ma trận $n \times n$: mỗi ô cần n phép nhân, có $n^2$ ô → $n^3$ phép nhân. Vd $n=2$ → 8 phép nhân (khớp 4 ô × 2 tích mỗi ô ở trên).

🔁 **Dừng lại tự kiểm tra**

1. $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$, $\vec{x} = (1, 1)$. Tính $A\vec{x}$.
2. A là $3 \times 2$, B là $2 \times 4$. $AB$ là ma trận cỡ nào? $BA$ có tồn tại không?

<details><summary>Đáp án</summary>

1. $A\vec{x} = (2\cdot 1+0\cdot 1, 0\cdot 1+3\cdot 1) = \mathbf{(2, 3)}$ (giãn x gấp 2, y gấp 3).
2. $AB$ là $\mathbf{3 \times 4}$ (lấy số hàng của A và số cột của B). $BA$: B là $2 \times 4$, A là $3 \times 2$ → $4 \neq 3$ → **không tồn tại**.

</details>

### 📝 Tóm tắt mục 2

- Ma trận $m \times n$ = bảng số = "máy biến đổi" $\mathbb{R}^n \to \mathbb{R}^m$.
- $(A\vec{x})_i$ = hàng i của A · $\vec{x}$; $(AB)_{ij}$ = hàng i của A · cột j của B.
- Nhân ma trận **không giao hoán** ($AB \neq BA$) và đòi kích thước khớp (cột A = hàng B).

---

## 3. Ma trận = Phép biến đổi tuyến tính

💡 **Ý tưởng quan trọng**: Ma trận $A$ $m\times n$ định nghĩa 1 ánh xạ tuyến tính:

$$T: \mathbb{R}^n \to \mathbb{R}^m, \qquad T(\vec{x}) = A\cdot\vec{x}$$

**Tính chất tuyến tính**:
- $T(\vec{x} + \vec{y}) = T(\vec{x}) + T(\vec{y})$.
- $T(c\cdot\vec{x}) = c\cdot T(\vec{x})$.

### Ví dụ — Phép quay 2D

Ma trận quay góc $\theta$:

$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Đã gặp ở [Tier 2 L08](../../02-Geometry/lesson-08-transformations-vector-geo/).

### Ví dụ — Phép vị tự

Ma trận $k\cdot I = \begin{bmatrix} k & 0 \\ 0 & k \end{bmatrix}$ biến $(x, y) \to (kx, ky)$.

**Verify tính tuyến tính bằng số** ($T$ = nhân với $\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$):
- $T(\vec{x}+\vec{y}) = T(\vec{x}) + T(\vec{y})$? Lấy $\vec{x} = (1,0)$, $\vec{y} = (0,1)$. $T(\vec{x}+\vec{y}) = T(1,1) = (2,3)$. $T(\vec{x})+T(\vec{y}) = (2,0)+(0,3) = (2,3)$ ✓.
- $T(c\cdot\vec{x}) = c\cdot T(\vec{x})$? $c = 5$, $\vec{x} = (1,0)$. $T(5,0) = (10,0)$. $5\cdot T(1,0) = 5\cdot(2,0) = (10,0)$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi phép biến đổi đều là ma trận?"* Không — chỉ các phép **tuyến tính** (giữ gốc O cố định, biến đường thẳng thành đường thẳng, giữ tỉ lệ). Vd "dịch chuyển +5 theo x" (tịnh tiến) KHÔNG tuyến tính vì $T(0) \neq 0$. (Mẹo: dùng toạ độ thuần nhất $3\times 3$ mới gói được tịnh tiến.)
- *"Sao biết cột ma trận = ảnh của vector đơn vị?"* Vì $A\cdot(1,0) =$ cột 1, $A\cdot(0,1) =$ cột 2 — nhân thử ra đúng. Mọi $\vec{x} = x_1\cdot(1,0) + x_2\cdot(0,1)$ nên $A\vec{x} = x_1\cdot$cột1$ + x_2\cdot$cột2.

⚠ **Lỗi thường gặp — tưởng phép quay rồi co bằng phép co rồi quay**. Quay/co riêng lẻ thì tráo thứ tự cho cùng kết quả (vì vị tự đều $k\cdot I$ giao hoán với mọi ma trận), nhưng co **không đều** thì không: co theo x rồi quay $\neq$ quay rồi co theo x. Liên hệ trực tiếp với $AB \neq BA$ ở mục 2.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận quay 90° $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ biến $(1,0)$ thành vector nào?
2. $T(\vec{x}) = A\cdot\vec{x}$ với $A = \begin{bmatrix} 3 & 0 \\ 0 & 3 \end{bmatrix}$. Đây là phép gì?

<details><summary>Đáp án</summary>

1. $R\cdot(1,0) = (0\cdot 1+(-1)\cdot 0, 1\cdot 1+0\cdot 0) = \mathbf{(0, 1)}$ — đúng là $(1,0)$ quay 90° ngược chiều kim đồng hồ.
2. **Vị tự** (phóng to đều) hệ số 3: mọi vector dài gấp 3, giữ nguyên hướng.

</details>

### 📝 Tóm tắt mục 3

- Ma trận $A$ định nghĩa ánh xạ tuyến tính $T(\vec{x}) = A\vec{x}$, thoả $T(\vec{x}+\vec{y})=T(\vec{x})+T(\vec{y})$ và $T(c\vec{x})=cT(\vec{x})$.
- Cột thứ j của $A$ = ảnh của vector đơn vị $e_j$.
- Quay, vị tự, chiếu, đối xứng đều là ma trận; tịnh tiến thì **không** (không tuyến tính).

---

## 4. Ma trận đặc biệt

| Tên | Định nghĩa | Ví dụ 2×2 |
|-----|------------|-----------|
| Đơn vị $I$ | $a_{ij} = 1$ nếu $i=j$, 0 otherwise | $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ |
| Đối xứng | $A^T = A$ | $\begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}$ |
| Tam giác trên | $a_{ij} = 0$ khi $i > j$ | $\begin{bmatrix} 1 & 2 \\ 0 & 3 \end{bmatrix}$ |
| Khả nghịch | $\exists A^{-1}: A\cdot A^{-1} = I$ | $\det \neq 0$ |
| Trực giao | $A^T = A^{-1}$ | $R(\theta)$ (quay) |

**Chuyển vị** $A^T$: đổi hàng $\leftrightarrow$ cột. $(A^T)_{ij} = a_{ji}$.

💡 **Trực giác / Hình dung**: các ma trận đặc biệt = các "máy biến đổi" có hành vi đặc thù dễ nhận. Đơn vị $I$ = máy "không làm gì" (đầu vào = đầu ra). Trực giao = máy chỉ quay/lật, **không co giãn** (giữ nguyên độ dài, góc). Tam giác trên = hệ phương trình đã "giải sẵn một nửa" (giải ngược được ngay).

**4 ví dụ chuyển vị**: $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$; $\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}^T =$ cột $(1,2,3)$; ma trận đối xứng $\begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}^T =$ chính nó; $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}^T = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$ (= ma trận quay −90°, đúng vì với ma trận trực giao $A^T = A^{-1}$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận trực giao 'giữ nguyên độ dài' nghĩa là gì?"* $\lVert A\vec{x}\rVert = \lVert\vec{x}\rVert$ với mọi $\vec{x}$. Vd quay 90° không đổi độ dài mũi tên. Kiểm: $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$, $\vec{x} = (3,4)$, $A\vec{x} = (-4,3)$, $\lVert A\vec{x}\rVert = 5 = \lVert\vec{x}\rVert$ ✓.
- *"Vì sao quan tâm ma trận khả nghịch?"* Vì khả nghịch $\iff$ máy "có nút undo" — phục hồi được $\vec{x}$ từ $A\vec{x}$. $\det \neq 0$ là điều kiện (học kỹ ở Lesson 02).

⚠ **Lỗi thường gặp — tưởng $(A^T)_{ij} = a_{ij}$**. Chuyển vị **tráo chỉ số**: $(A^T)_{ij} = a_{ji}$. Phản ví dụ: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $a_{12} = 2$ nhưng $(A^T)_{12} = a_{21} = \mathbf{3}$, không phải 2.

🔁 **Dừng lại tự kiểm tra**

1. Viết chuyển vị của $\begin{bmatrix} 2 & 5 \\ 0 & 7 \end{bmatrix}$.
2. Ma trận đối xứng $2\times 2$ tổng quát có dạng nào?

<details><summary>Đáp án</summary>

1. $\begin{bmatrix} 2 & 0 \\ 5 & 7 \end{bmatrix}$ (tráo hàng$\leftrightarrow$cột).
2. $\begin{bmatrix} a & b \\ b & c \end{bmatrix}$ — phần tử ngoài đường chéo bằng nhau ($A^T = A$).

</details>

### 📝 Tóm tắt mục 4

- $I$ = "không làm gì"; trực giao = chỉ quay/lật ($A^T = A^{-1}$, giữ độ dài); đối xứng $A^T = A$.
- Chuyển vị tráo chỉ số: $(A^T)_{ij} = a_{ji}$.
- Khả nghịch $\iff \det \neq 0 \iff$ máy "undo được".

---

## 5. Quy tắc đại số ma trận

- $A + B = B + A$ (giao hoán cộng).
- $(AB)C = A(BC)$ (kết hợp).
- $A(B+C) = AB + AC$ (phân phối).
- $AB \neq BA$ (không giao hoán).
- $(AB)^T = B^T \cdot A^T$ (đảo thứ tự).
- $I\cdot A = A\cdot I = A$.

💡 **Trực giác / Hình dung**: đại số ma trận giống đại số số thực ở **gần như mọi luật** (kết hợp, phân phối, có "số 1" là $I$), **trừ một điều**: phép nhân không giao hoán. Nhớ điều ngoại lệ này là chìa khoá tránh sai.

**Verify $(AB)^T = B^T\cdot A^T$ bằng số** ($A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$):
- $AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix} \to (AB)^T = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$.
- $B^T\cdot A^T = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\cdot\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$ ✓ (khớp). Lưu ý thứ tự **đảo**: $B^T$ trước $A^T$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $(AB)^T$ lại đảo thành $B^T\cdot A^T$ chứ không $A^T\cdot B^T$?"* Trực giác "mặc áo rồi cởi": mặc áo trong → áo ngoài; cởi thì ngoài trước → trong sau. Chuyển vị "đảo trình tự". Verify số ở trên xác nhận.
- *"$(A+B)^T$ có đảo không?"* Không — cộng giao hoán nên $(A+B)^T = A^T + B^T$ (không cần đảo). Chỉ phép **nhân** mới đảo.

⚠ **Lỗi thường gặp — áp dụng $(AB)^2 = A^2B^2$**. Sai vì $(AB)^2 = ABAB$, mà $BA \neq AB$ nên không gom thành $A^2B^2$. Chỉ đúng khi $A, B$ giao hoán. Phản ví dụ: $A=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$, $B=\begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} \to (AB)^2 \neq A^2B^2$ (tự nhân kiểm chứng).

🔁 **Dừng lại tự kiểm tra**

1. Rút gọn $(ABC)^T$.
2. Đúng/sai: $A(B+C) = AB + AC$?

<details><summary>Đáp án</summary>

1. $(ABC)^T = C^T\cdot B^T\cdot A^T$ (đảo toàn bộ thứ tự).
2. **Đúng** — phân phối luôn đúng (kể cả khi không giao hoán), miễn kích thước khớp.

</details>

### 📝 Tóm tắt mục 5

- Ma trận có kết hợp, phân phối, đơn vị $I$ — giống số thực.
- Ngoại lệ then chốt: **không giao hoán** $AB \neq BA \to (AB)^2 \neq A^2B^2$, cẩn thận khi rút gọn.
- $(AB)^T = B^T\cdot A^T$ (đảo thứ tự); $(A+B)^T = A^T+B^T$ (không đảo).

---

## 6. Bài tập

### Bài tập

**Bài 1**: $\vec{u} = (1, 2, -1)$, $\vec{v} = (3, 0, 2)$. Tính $\vec{u} \cdot \vec{v}$ và $\lVert\vec{u}\rVert$.

**Bài 2**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. Tính $AB$ và $BA$.

**Bài 3**: Cho $A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}$, $\vec{x} = (1, 2)$. Tính $A\vec{x}$.

**Bài 4**: Tính tích vô hướng $(1, 2, 3, 4) \cdot (5, 6, 7, 8)$.

**Bài 5**: Ma trận đối xứng $A$ $2\times 2$ có dạng nào tổng quát?

### Lời giải

**Bài 1**: $\vec{u}\cdot\vec{v} = 3 + 0 - 2 = \mathbf{1}$. $\lVert\vec{u}\rVert = \sqrt{1+4+1} = \mathbf{\sqrt{6}}$.

**Bài 2**:  
- $AB$: hàng 1 nhân cột $B$: $[1\cdot 0+2\cdot 1, 1\cdot 1+2\cdot 0] = [2, 1]$. Hàng 2: $[3\cdot 0+4\cdot 1, 3\cdot 1+4\cdot 0] = [4, 3]$.  
- $AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}$.  
- $BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$.  
- $\neq \to$ không giao hoán.

**Bài 3**: $y_1 = 2\cdot 1+1\cdot 2 = 4$. $y_2 = 1\cdot 1+3\cdot 2 = 7$. → $\mathbf{\vec{y} = (4, 7)}$.

**Bài 4**: $5+12+21+32 = \mathbf{70}$.

**Bài 5**: $A = \begin{bmatrix} a & b \\ b & c \end{bmatrix}$ với $a, b, c$ bất kỳ. (Đường chéo phụ đối xứng.)

---

## 7. Bài tiếp theo

[Lesson 02 — Định thức & hệ tuyến tính](../lesson-02-determinants-linear-systems/).

## 📝 Tổng kết

1. **Vector $\mathbb{R}^n$**: cộng, nhân vô hướng, tích vô hướng, chuẩn.
2. **Ma trận**: cộng, nhân, **không giao hoán**.
3. **Nhân ma trận-vector**: $y_i =$ hàng i của $A \cdot \vec{x}$.
4. **Ma trận = phép biến đổi tuyến tính** $T: \mathbb{R}^n \to \mathbb{R}^m$.
5. **Quay**, **vị tự**, **chiếu**, ... đều là ma trận.
