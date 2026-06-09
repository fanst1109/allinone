// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-04-multivariable-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Hàm nhiều biến

## Mục tiêu

- Hàm $f(x, y)$, $f(x, y, z)$ — đồ thị mặt cong.
- **Đạo hàm riêng** $\\frac{\\partial f}{\\partial x}$, $\\frac{\\partial f}{\\partial y}$.
- **Gradient** $\\nabla f$ và ý nghĩa hình học.
- Cực trị 2 biến — định lý Hessian.

## Kiến thức tiền đề

- [Tier 4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. Hàm nhiều biến

💡 **Trực giác / Hình dung**: hàm 1 biến $f(x)$ vẽ ra 1 **đường cong** (mỗi x → 1 độ cao). Hàm 2 biến $f(x,y)$ vẽ ra 1 **mặt cong** trong không gian 3D — như mặt đất đồi núi: tại mỗi tọa độ $(x,y)$ trên bản đồ có 1 độ cao $f$. Đường mức = các đường nối những điểm cùng độ cao (đúng như đường đồng mức trên bản đồ địa hình).

**Định nghĩa**: $f: \\mathbb{R}^n \\to \\mathbb{R}$. Mỗi điểm $(x_1, \\ldots, x_n)$ gán 1 số $f(x_1, \\ldots, x_n)$.

**4 ví dụ số đa dạng** ($f(x,y) = x^2 + y^2$):
- $f(0,0) = 0$ (đáy "thung lũng").
- $f(1,0) = 1$; $f(0,2) = 4$ (cùng dạng theo từng trục).
- $f(3,4) = 9 + 16 = 25$ (= bình phương khoảng cách tới gốc).
- Đường mức $f = 25$: vòng tròn bán kính 5 (mọi điểm cách gốc 5).

**Ví dụ dạng khác**:
- $f(x, y) = x\\cdot y$ (mặt yên ngựa): $f(2,3) = 6$, $f(2,-3) = -6$.
- $f(x, y) = \\sin(x)\\cdot\\cos(y)$ (sóng 2D).

**Đồ thị**: trong $\\mathbb{R}^3$, vẽ điểm $(x, y, f(x, y))$ → mặt cong.

### Đường mức (level curves)

$f(x, y) = c$ (hằng số) → đường cong trong mặt phẳng xy.

⟶ Như **đường đồng mức** trên bản đồ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao đường mức của $x^2+y^2$ là hình tròn?"* Vì $x^2+y^2 = c$ (hằng) chính là phương trình đường tròn bán kính $\\sqrt{c}$. Mọi điểm trên tròn cùng "độ cao" $c$.
- *"Hàm 3 biến $f(x,y,z)$ vẽ thế nào?"* Không vẽ trực tiếp được (cần 4 chiều). Thay vào đó vẽ **mặt mức** $f = c$ (mặt cong trong 3D), tương tự đường mức.

⚠ **Lỗi thường gặp — nhầm đồ thị với đường mức**. Đồ thị $f(x,y)$ sống trong **3D** (mặt cong). Đường mức sống trong **2D** (mặt phẳng xy), là "lát cắt nằm ngang" của đồ thị chiếu xuống. Vd với $f = x^2+y^2$: đồ thị là chén parabol, đường mức là các vòng tròn đồng tâm.

🔁 **Dừng lại tự kiểm tra**

1. $f(x,y) = x^2 - y^2$. Tính $f(3,1)$.
2. Đường mức $f = 4$ của $f(x,y) = x + y$ là hình gì?

<details><summary>Đáp án</summary>

1. $f(3,1) = 9 - 1 = \\mathbf{8}$.
2. $x + y = 4$ → một **đường thẳng** (dốc −1, cắt trục y tại 4).

</details>

### 📝 Tóm tắt mục 1

- $f: \\mathbb{R}^n \\to \\mathbb{R}$; hàm 2 biến = mặt cong 3D (như địa hình).
- Đường mức $f = c$ = các điểm cùng "độ cao" (đồng mức trên bản đồ), sống trong mặt phẳng 2D.
- Đồ thị (3D) $\\neq$ đường mức (2D, lát cắt ngang).

---

## 2. Đạo hàm riêng

💡 **Trực giác / Hình dung**: đứng trên mặt đất đồi núi tại điểm $(a,b)$. Đi **chỉ theo hướng đông** (tăng x, giữ y cố định) thì dốc lên/xuống bao nhiêu? Đó là $\\frac{\\partial f}{\\partial x}$. Đi **chỉ theo hướng bắc** (tăng y) thì dốc bao nhiêu? Đó là $\\frac{\\partial f}{\\partial y}$. Đạo hàm riêng = độ dốc khi đi **dọc theo đúng 1 trục**, đóng băng các trục khác.

**Ý tưởng tính**: Khi tính $\\frac{\\partial f}{\\partial x}$, coi y là **hằng**, đạo hàm theo x như bình thường.

$$\\frac{\\partial f}{\\partial x} = \\lim_{h\\to 0} \\frac{f(x+h, y) - f(x, y)}{h}$$

**4 ví dụ số đa dạng**:
- $f = x^2\\cdot y + 3y$: $\\frac{\\partial f}{\\partial x} = 2x\\cdot y$, $\\frac{\\partial f}{\\partial y} = x^2 + 3$.
- $f = x^3 + y^2$: $\\frac{\\partial f}{\\partial x} = 3x^2$, $\\frac{\\partial f}{\\partial y} = 2y$ (tách rời, không lẫn).
- $f = \\sin(xy)$: $\\frac{\\partial f}{\\partial x} = y\\cdot\\cos(xy)$, $\\frac{\\partial f}{\\partial y} = x\\cdot\\cos(xy)$ (chain rule).
- $f = x/y$: $\\frac{\\partial f}{\\partial x} = 1/y$, $\\frac{\\partial f}{\\partial y} = -x/y^2$.

**Đánh giá tại điểm**: $f = x^2\\cdot y + 3y$ tại $(2, 1)$: $\\frac{\\partial f}{\\partial x} = 2\\cdot 2\\cdot 1 = \\mathbf{4}$, $\\frac{\\partial f}{\\partial y} = 2^2 + 3 = \\mathbf{7}$.

### Ý nghĩa hình học

$\\frac{\\partial f}{\\partial x}$ tại $(a, b)$ = slope của giao cắt với mặt phẳng $y = b$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao coi biến kia là hằng?"* Vì đạo hàm riêng đo thay đổi **chỉ theo 1 biến**. Cố định biến kia = đi dọc đúng 1 trục. Y như chụp 1 lát cắt của mặt cong rồi lấy đạo hàm đường cong 1 biến quen thuộc.
- *"$\\frac{\\partial f}{\\partial x}$ và $\\frac{\\partial f}{\\partial y}$ có thể khác nhau nhiều không?"* Có. Tại $(2,1)$ ở trên: dốc theo x là 4, theo y là 7 — mặt cong dốc khác nhau tùy hướng đi.

⚠ **Lỗi thường gặp — lẫn $\\partial$ (riêng) với $d$ (toàn phần)**. Khi lấy $\\frac{\\partial f}{\\partial x}$, biến y **bất biến** (đứng yên). Nếu viết $d/dx$ mà coi $y = y(x)$ phụ thuộc x thì khác hẳn (đó là đạo hàm toàn phần, có thêm số hạng $\\frac{\\partial f}{\\partial y} \\cdot \\frac{dy}{dx}$). Phản ví dụ: $f = xy$, $\\frac{\\partial f}{\\partial x} = y$ (coi y hằng); nhưng nếu $y = x$ thì $\\frac{df}{dx}$ của $f = x\\cdot x = x^2$ là $2x \\neq y$.

🔁 **Dừng lại tự kiểm tra**

1. $f(x,y) = 3x^2y + y^3$. Tính $\\frac{\\partial f}{\\partial x}$ và $\\frac{\\partial f}{\\partial y}$.
2. Đánh giá $\\frac{\\partial f}{\\partial x}$ tại $(1, 2)$.

<details><summary>Đáp án</summary>

1. $\\frac{\\partial f}{\\partial x} = 6xy$ (coi y hằng); $\\frac{\\partial f}{\\partial y} = 3x^2 + 3y^2$ (coi x hằng).
2. $\\frac{\\partial f}{\\partial x}\\big|_{(1,2)} = 6\\cdot 1\\cdot 2 = \\mathbf{12}$.

</details>

### 📝 Tóm tắt mục 2

- $\\frac{\\partial f}{\\partial x}$ = độ dốc đi dọc trục x (đóng băng y); $\\frac{\\partial f}{\\partial y}$ ngược lại.
- Tính bằng cách coi biến kia là hằng số, áp dụng quy tắc đạo hàm thường.
- Phân biệt $\\partial$ (riêng, biến kia cố định) với $d$ (toàn phần, biến kia phụ thuộc).

---

## 3. Gradient

$$\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$$

(Hoặc trong n chiều: $\\nabla f = \\left(\\frac{\\partial f}{\\partial x_1}, \\ldots, \\frac{\\partial f}{\\partial x_n}\\right)$.)

💡 **Tính chất quan trọng**:
- $\\nabla f$ chỉ **hướng tăng nhanh nhất** của $f$.
- $\\lVert\\nabla f\\rVert$ = tốc độ tăng theo hướng đó.
- $\\nabla f$ **vuông góc với đường mức** $f = c$.

**Ví dụ**: $f(x, y) = x^2 + y^2$. $\\nabla f = (2x, 2y)$. Tại $(1, 1)$: $\\nabla f = (2, 2)$ — chỉ "ra xa O" — đúng vì $f$ tăng theo bán kính.

### Hướng giảm nhanh nhất

$= \\mathbf{-\\nabla f}$. Đây là nền tảng của **Gradient Descent** trong ML.

> 📐 **Định nghĩa đầy đủ — Gradient ∇f**
>
> **(a) Là gì**: 1 vector có n thành phần là **n đạo hàm riêng** của $f$. $\\nabla f$ tại điểm P chỉ hướng $f$ **tăng nhanh nhất** từ P, độ lớn $\\lVert\\nabla f\\rVert$ = tốc độ tăng theo hướng đó. Vuông góc với mặt đẳng giá trị (đường mức $f = c$).
>
> **(b) Vì sao cần**: Gradient là **đạo hàm tổng quát hoá** sang nhiều biến. Hầu hết bài toán thực tế có nhiều biến (cost function trong ML có triệu tham số). Để tối ưu (tìm min/max), đi theo hướng $-\\nabla f$ → **Gradient Descent** — thuật toán cốt lõi của: AI/ML (huấn luyện mô hình), kinh tế (tối ưu portfolio), vật lý (Lagrangian, Hamiltonian mechanics), điều khiển (PID). Khi $\\nabla f = 0$ → điểm dừng (cực trị hoặc yên ngựa).
>
> **(c) Ví dụ số**: $f(x,y) = x^2 + y^2$ (paraboloid). $\\nabla f = (2x, 2y)$. Tại $(3, 4)$: $\\nabla f = (6, 8)$, $\\lVert\\nabla f\\rVert = 10$ ($= 2\\cdot\\sqrt{9+16}$). Hướng ra xa O — đúng vì $f$ tăng theo r. $f(x,y) = e^{-x^2-y^2}$ (chuông Gauss). $\\nabla f = (-2x\\cdot e^{\\ldots}, -2y\\cdot e^{\\ldots})$. Tại $(0,0)$ trên đỉnh: $\\nabla f = (0, 0)$ — cực đại. Tại $(1,0)$: $\\nabla f = (-2e^{-1}, 0) \\approx (-0.736, 0)$ — chỉ về tâm. Gradient descent: $x \\leftarrow x - \\alpha\\cdot\\nabla f$ đi xuống dốc.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\nabla f$ chỉ đúng hướng dốc nhất, không phải hướng nào khác?"* Vì độ dốc theo hướng đơn vị $\\vec{u}$ bằng $\\nabla f\\cdot\\vec{u} = \\lVert\\nabla f\\rVert\\cdot\\cos\\theta$, lớn nhất khi $\\theta = 0$ ($\\vec{u}$ cùng hướng $\\nabla f$). Toán $\\cos\\theta = 1 \\iff$ đi đúng hướng gradient.
- *"$\\nabla f = 0$ nghĩa là gì?"* Mọi hướng đều phẳng → điểm dừng (đỉnh, đáy, hoặc yên ngựa). Đây là điều kiện tìm cực trị (mục 5).
- *"Vì sao gradient vuông góc đường mức?"* Đi dọc đường mức thì $f$ không đổi → độ dốc theo hướng đó $= 0 \\to \\nabla f\\cdot$(hướng đường mức)$ = 0 \\to$ vuông góc.

⚠ **Lỗi thường gặp — tưởng $\\nabla f$ là 1 số**. Gradient là **vector** (gồm các đạo hàm riêng), không phải số. Phản ví dụ: $f = x^2+y^2$ tại $(3,4)$ cho $\\nabla f = \\mathbf{(6, 8)}$ (vector 2 thành phần), còn $\\lVert\\nabla f\\rVert = 10$ mới là số (độ lớn). Lẫn 2 thứ → sai khi áp dụng gradient descent.

🔁 **Dừng lại tự kiểm tra**

1. $f(x,y) = x^2 + 3y^2$. Tính $\\nabla f$ tại $(1, 1)$ và $\\lVert\\nabla f\\rVert$.
2. Hướng giảm nhanh nhất của $f$ tại $(1,1)$ là hướng nào?

<details><summary>Đáp án</summary>

1. $\\nabla f = (2x, 6y) \\to$ tại $(1,1)$: $(2, 6)$. $\\lVert\\nabla f\\rVert = \\sqrt{4+36} = \\sqrt{40} \\approx \\mathbf{6.32}$.
2. $\\mathbf{-\\nabla f = (-2, -6)}$ (ngược hướng gradient).

</details>

### 📝 Tóm tắt mục 3

- $\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$ là **vector** chỉ hướng tăng nhanh nhất.
- $\\lVert\\nabla f\\rVert$ = tốc độ tăng theo hướng đó; $\\nabla f \\perp$ đường mức.
- $-\\nabla f$ = hướng giảm nhanh nhất (nền tảng Gradient Descent); $\\nabla f = 0 \\iff$ điểm dừng.

---

## 4. Đạo hàm riêng bậc 2 & Ma trận Hessian

💡 **Trực giác / Hình dung**: nếu gradient (bậc 1) cho biết mặt cong dốc thế nào, thì Hessian (bậc 2) cho biết mặt cong **cong thế nào** — lõm xuống như cái chén (cực tiểu) hay vồng lên như mái vòm (cực đại) hay vừa lõm vừa vồng như yên ngựa. Đạo hàm bậc 2 = "độ cong" của địa hình.

**Đạo hàm bậc 2**:
- $\\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial x}\\right)$.
- $\\frac{\\partial^2 f}{\\partial x\\partial y} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$.

**Định lý Schwarz**: Nếu $f$ đủ "đẹp" (đạo hàm liên tục), thì $\\frac{\\partial^2 f}{\\partial x\\partial y} = \\frac{\\partial^2 f}{\\partial y\\partial x}$. Thứ tự đạo hàm không quan trọng.

**Ma trận Hessian** (2 biến):

$$H = \\begin{bmatrix} \\dfrac{\\partial^2 f}{\\partial x^2} & \\dfrac{\\partial^2 f}{\\partial x\\partial y} \\\\[8pt] \\dfrac{\\partial^2 f}{\\partial y\\partial x} & \\dfrac{\\partial^2 f}{\\partial y^2} \\end{bmatrix}$$

⟶ $H$ đối xứng (Schwarz).

**Walk-through bằng số** ($f = x^3 + x^2y + y^2$):
- $\\frac{\\partial f}{\\partial x} = 3x^2 + 2xy \\to \\frac{\\partial^2 f}{\\partial x^2} = 6x + 2y$; $\\frac{\\partial^2 f}{\\partial x\\partial y} = 2x$.
- $\\frac{\\partial f}{\\partial y} = x^2 + 2y \\to \\frac{\\partial^2 f}{\\partial y^2} = 2$; $\\frac{\\partial^2 f}{\\partial y\\partial x} = 2x$.
- Kiểm Schwarz: $\\frac{\\partial^2 f}{\\partial x\\partial y} = 2x = \\frac{\\partial^2 f}{\\partial y\\partial x}$ ✓. $H = \\begin{bmatrix} 6x+2y & 2x \\\\ 2x & 2 \\end{bmatrix}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Schwarz luôn đúng?"* Hầu như mọi hàm gặp trong thực tế (đạo hàm bậc 2 liên tục) thì đúng. Chỉ vài hàm bệnh lý hiếm gặp mới vi phạm — không phải lo ở mức này.
- *"Hessian dùng làm gì?"* Phân loại điểm dừng (mục 5) và trong tối ưu (phương pháp Newton dùng nghịch đảo Hessian để hội tụ nhanh).

⚠ **Lỗi thường gặp — nhầm $\\frac{\\partial^2 f}{\\partial x^2}$ với $\\left(\\frac{\\partial f}{\\partial x}\\right)^2$**. $\\frac{\\partial^2 f}{\\partial x^2}$ là đạo hàm **hai lần** (lấy đạo hàm của đạo hàm). Phản ví dụ: $f = x^2$, $\\frac{\\partial f}{\\partial x} = 2x$. $\\frac{\\partial^2 f}{\\partial x^2} = 2$ (đạo hàm lần nữa), KHÁC $\\left(\\frac{\\partial f}{\\partial x}\\right)^2 = (2x)^2 = 4x^2$.

🔁 **Dừng lại tự kiểm tra**

1. $f = x^2y$. Tính ma trận Hessian.

<details><summary>Đáp án</summary>

$\\frac{\\partial f}{\\partial x} = 2xy \\to \\frac{\\partial^2 f}{\\partial x^2} = 2y$, $\\frac{\\partial^2 f}{\\partial x\\partial y} = 2x$. $\\frac{\\partial f}{\\partial y} = x^2 \\to \\frac{\\partial^2 f}{\\partial y^2} = 0$, $\\frac{\\partial^2 f}{\\partial y\\partial x} = 2x$. $H = \\begin{bmatrix} 2y & 2x \\\\ 2x & 0 \\end{bmatrix}$ (đối xứng ✓).

</details>

### 📝 Tóm tắt mục 4

- Đạo hàm bậc 2 đo **độ cong** mặt; Hessian gom 4 đạo hàm bậc 2.
- Schwarz: $\\frac{\\partial^2 f}{\\partial x\\partial y} = \\frac{\\partial^2 f}{\\partial y\\partial x} \\to H$ đối xứng (với hàm "đẹp").
- $\\frac{\\partial^2 f}{\\partial x^2} \\neq \\left(\\frac{\\partial f}{\\partial x}\\right)^2$; Hessian dùng để phân loại cực trị.

---

## 5. Cực trị 2 biến

💡 **Trực giác / Hình dung**: tìm đỉnh núi / đáy thung lũng / điểm yên ngựa. Ở những chỗ này mặt đất **phẳng theo mọi hướng** → gradient $= 0$ (điều kiện cần). Nhưng phẳng chưa đủ biết là đỉnh hay đáy hay yên ngựa — phải xem **độ cong** (Hessian): chén lõm = đáy (cực tiểu), vòm = đỉnh (cực đại), vừa lõm vừa vồng = yên ngựa.

🎯 **Điều kiện cần** (Fermat): Tại cực trị, **$\\nabla f = 0$**.

⟶ Tìm các điểm $(a, b)$ sao cho $\\frac{\\partial f}{\\partial x} = 0$ và $\\frac{\\partial f}{\\partial y} = 0$. Gọi là **điểm dừng** (critical point).

### Phân loại bằng Hessian (định thức 2nd derivative test)

Tại điểm dừng:
- **$\\det(H) > 0$** và **$\\frac{\\partial^2 f}{\\partial x^2} > 0$**: **cực tiểu**.
- **$\\det(H) > 0$** và **$\\frac{\\partial^2 f}{\\partial x^2} < 0$**: **cực đại**.
- **$\\det(H) < 0$**: **điểm yên ngựa** (saddle).
- **$\\det(H) = 0$**: chưa kết luận.

### Ví dụ

$f(x, y) = x^2 + y^2 - 4x + 6y$.
- $\\frac{\\partial f}{\\partial x} = 2x - 4 = 0 \\to x = 2$.
- $\\frac{\\partial f}{\\partial y} = 2y + 6 = 0 \\to y = -3$.
- Điểm dừng: $(2, -3)$.
- $H = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$. $\\det = 4 > 0$. $\\frac{\\partial^2 f}{\\partial x^2} = 2 > 0$.
- → **Cực tiểu** tại $(2, -3)$. $f(2, -3) = 4 + 9 - 8 - 18 = -13$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\nabla f = 0$ chắc chắn là cực trị?"* Không — chỉ là **điều kiện cần**. Điểm yên ngựa cũng có $\\nabla f = 0$ nhưng không phải cực trị. Phải dùng Hessian phân loại.
- *"$\\det(H) = 0$ thì sao?"* Test thất bại (chưa kết luận). Phải dùng cách khác (xét trực tiếp giá trị quanh điểm, hoặc đạo hàm bậc cao hơn).

⚠ **Lỗi thường gặp — quên kiểm dấu $\\frac{\\partial^2 f}{\\partial x^2}$ khi $\\det(H) > 0$**. $\\det(H) > 0$ chỉ nói "cực trị (không phải yên ngựa)", còn **cực đại hay cực tiểu** phải xem $\\frac{\\partial^2 f}{\\partial x^2}$: $> 0 \\to$ tiểu, $< 0 \\to$ đại. Phản ví dụ: $f = -x^2-y^2$ có $H = \\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix}$, $\\det = 4 > 0$ nhưng $\\frac{\\partial^2 f}{\\partial x^2} = -2 < 0 \\to$ **cực đại** (không phải tiểu).

🔁 **Dừng lại tự kiểm tra**

1. $f = x^2 + y^2$. Tìm điểm dừng và phân loại.

<details><summary>Đáp án</summary>

$\\frac{\\partial f}{\\partial x} = 2x = 0$, $\\frac{\\partial f}{\\partial y} = 2y = 0 \\to (0,0)$. $H = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, $\\det = 4 > 0$, $\\frac{\\partial^2 f}{\\partial x^2} = 2 > 0 \\to$ **cực tiểu** tại $(0,0)$, $f = 0$.

</details>

### 📝 Tóm tắt mục 5

- Điều kiện cần: $\\nabla f = 0$ → điểm dừng (có thể đỉnh/đáy/yên ngựa).
- Phân loại bằng Hessian: $\\det(H) > 0$ & $\\frac{\\partial^2 f}{\\partial x^2} > 0 \\to$ tiểu; $\\det(H) > 0$ & $\\frac{\\partial^2 f}{\\partial x^2} < 0 \\to$ đại; $\\det(H) < 0 \\to$ yên ngựa.
- $\\det(H) = 0 \\to$ chưa kết luận.

---

## 6. Ứng dụng

### Gradient Descent
- Hàm cost $J(\\theta)$ trong ML có nhiều tham số $\\theta = (\\theta_1, \\ldots, \\theta_n)$.
- Cập nhật: $\\theta \\leftarrow \\theta - \\alpha\\cdot\\nabla J(\\theta)$ ($\\alpha$ = learning rate).
- Tiến dần đến cực tiểu.

### Tối ưu hóa
- Tìm thông số tối ưu của mô hình, mạng nơ-ron, ...

💡 **Trực giác / Hình dung**: Gradient Descent = "lăn bóng xuống dốc". Đứng trên mặt cost $J$, nhìn hướng dốc xuống nhất ($-\\nabla J$), bước 1 bước nhỏ (cỡ $\\alpha$), lặp lại. Cuối cùng dừng ở đáy ($\\nabla J \\approx 0$) = cực tiểu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\alpha$ (learning rate) chọn sao?"* Quá nhỏ → học chậm; quá lớn → "nhảy" qua đáy, có thể phân kỳ. Vd $\\alpha = 0.01$–$0.1$ phổ biến, thường giảm dần.
- *"Gradient descent có chắc tìm cực tiểu toàn cục?"* Không — có thể kẹt ở cực tiểu **địa phương** (đáy thung lũng nhỏ, không phải sâu nhất). Đây là thách thức lớn của tối ưu phi lồi trong ML.

### 📝 Tóm tắt mục 6

- Gradient Descent: $\\theta \\leftarrow \\theta - \\alpha\\cdot\\nabla J$, lặp đến khi $\\nabla J \\approx 0$.
- $\\alpha$ (learning rate): cân bằng tốc độ vs ổn định.
- Cốt lõi huấn luyện ML; rủi ro kẹt cực tiểu địa phương.

---

## 7. Bài tập

### Bài tập

**Bài 1**: $f(x, y) = 3x^2 + 2xy - y^2$. Tính $\\frac{\\partial f}{\\partial x}$, $\\frac{\\partial f}{\\partial y}$.

**Bài 2**: $f(x, y) = e^{x^2+y^2}$. Tính $\\nabla f$ tại $(1, 1)$.

**Bài 3**: Tìm cực trị của $f(x, y) = x^2 + xy + y^2 - 3x - 3y$.

**Bài 4**: $f(x, y) = x^3 - 3xy + y^3$. Tìm điểm dừng. Phân loại bằng Hessian.

**Bài 5**: $f(x, y) = x^2 - y^2$. Tìm điểm dừng. Phân loại.

### Lời giải

**Bài 1**: $\\frac{\\partial f}{\\partial x} = 6x + 2y$. $\\frac{\\partial f}{\\partial y} = 2x - 2y$.

**Bài 2**: $\\nabla f = (2x\\cdot e^{x^2+y^2}, 2y\\cdot e^{x^2+y^2})$. Tại $(1,1)$: $(2e^2, 2e^2)$.

**Bài 3**:  
- $\\frac{\\partial f}{\\partial x} = 2x + y - 3 = 0$.  
- $\\frac{\\partial f}{\\partial y} = x + 2y - 3 = 0$.  
- Giải: $2x + y = 3$, $x + 2y = 3$. Trừ: $x - y = 0 \\to x = y$. Thay: $3x = 3 \\to \\mathbf{x = y = 1}$.  
- $H = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. $\\det = 3 > 0$. $\\frac{\\partial^2 f}{\\partial x^2} = 2 > 0 \\to$ **cực tiểu** tại $(1, 1)$.

**Bài 4**:  
- $\\frac{\\partial f}{\\partial x} = 3x^2 - 3y = 0 \\to y = x^2$.  
- $\\frac{\\partial f}{\\partial y} = -3x + 3y^2 = 0 \\to x = y^2$.  
- Thay: $x = (x^2)^2 = x^4 \\to x^4 - x = 0 \\to x(x^3 - 1) = 0 \\to x = 0$ hoặc $x = 1$.  
- Điểm dừng: $(0, 0)$, $(1, 1)$.  
- $H = \\begin{bmatrix} 6x & -3 \\\\ -3 & 6y \\end{bmatrix}$. $\\det = 36xy - 9$.  
- Tại $(0,0)$: $\\det = -9 < 0 \\to$ **yên ngựa**.  
- Tại $(1,1)$: $\\det = 27 > 0$, $\\frac{\\partial^2 f}{\\partial x^2} = 6 > 0 \\to$ **cực tiểu**.

**Bài 5**: $\\frac{\\partial f}{\\partial x} = 2x = 0$, $\\frac{\\partial f}{\\partial y} = -2y = 0 \\to (0, 0)$. $H = \\begin{bmatrix} 2 & 0 \\\\ 0 & -2 \\end{bmatrix}$. $\\det = -4 < 0 \\to$ **yên ngựa** (mặt yên ngựa kinh điển).

---

## 8. Bài tiếp theo

[Lesson 05 — Tích phân bội](../lesson-05-multiple-integrals/).

## 📝 Tổng kết

1. **Đạo hàm riêng** $\\frac{\\partial f}{\\partial x}$: coi biến khác hằng.
2. **Gradient** $\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$ chỉ hướng tăng nhanh nhất, vuông góc đường mức.
3. **Cực trị**: tại điểm dừng ($\\nabla f = 0$). Phân loại bằng Hessian.
4. **Yên ngựa** $= \\det(H) < 0$ — cao theo 1 hướng, thấp theo hướng khác.
5. **Gradient Descent** cốt lõi ML.
`;
