// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-04-multivariable-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Hàm nhiều biến

## Mục tiêu

- Hàm $f(x, y)$, $f(x, y, z)$ — đồ thị mặt cong.
- **Đạo hàm riêng** $\\frac{\\partial f}{\\partial x}$, $\\frac{\\partial f}{\\partial y}$.
- **Gradient** $\\nabla f$ và ý nghĩa hình học; **đạo hàm hướng**; **mặt phẳng tiếp xúc**.
- Cực trị 2 biến — định lý Hessian; **điểm yên ngựa**.
- Tối ưu có ràng buộc — **nhân tử Lagrange** $\\nabla f = \\lambda\\nabla g$.

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

**4 ví dụ số đường mức đa dạng** (mỗi dạng hàm cho 1 họ đường mức khác hẳn nhau):

| Hàm $f(x,y)$ | Đường mức $f = c$ | Hình dạng | Ví dụ |
|---|---|---|---|
| $x^2 + y^2$ | $x^2 + y^2 = c$ | đường tròn bán kính $\\sqrt{c}$ | $c=9 \\to$ tròn r=3 |
| $x + y$ | $x + y = c$ | đường thẳng dốc $-1$ | $c=5 \\to$ qua $(5,0),(0,5)$ |
| $x\\cdot y$ | $xy = c$ | hyperbol | $c=6 \\to$ qua $(2,3),(6,1)$ |
| $y - x^2$ | $y = x^2 + c$ | parabol dịch lên/xuống | $c=1 \\to y=x^2+1$ |

⟶ Cùng 1 mặt cong, nhưng "chụp" ở các độ cao $c$ khác nhau cho ta các đường mức khác nhau; gom lại = bản đồ đồng mức (contour map).

**ASCII — bản đồ đường mức + gradient** của $f = x^2 + y^2$ (chén). Các vòng tròn đồng tâm là đường mức; mũi tên \`→ ↗ ↑\` là gradient $\\nabla f$ (luôn **vuông góc** với vòng tròn, **chỉ ra ngoài** vì đi ra xa gốc thì $f$ tăng):

\`\`\`
        y
        │        f=9   f=4   f=1
        │      .-''''-.
        │    ,'  .--.  ',
        │   /  ,'    ',  \\      ↗  ∇f tại (1.5,1.5)
        │  |  | ( O )|  |        chỉ ra ngoài, ⊥ vòng tròn
   ─────┼──|──|──+───|──|───────→ x
        │  |  | gốc | →|  | →  ∇f tại (2,0) = (4,0), chỉ Đông
        │   \\  ',  ,' /
        │    ',  '--'  ,'
        │      '-....-'
        │
   gần gốc: vòng khít  →  |∇f| nhỏ (mặt phẳng, dốc thoải)
   xa gốc:  vòng thưa  →  |∇f| lớn (mặt dốc đứng)
\`\`\`

💡 **Đọc bản đồ đồng mức như dân leo núi**: đường mức **khít nhau** = sườn dốc đứng ($|\\nabla f|$ lớn); đường mức **thưa** = sườn thoải ($|\\nabla f|$ nhỏ); chỗ chỉ có 1 điểm đơn độc không vòng nào = đỉnh/đáy. Gradient luôn cắt vuông góc các đường mức, chỉ về phía $f$ tăng.

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

### Walk-through từng bước — coi biến kia là HẰNG SỐ

Quy trình máy móc, không bao giờ sai: gạch chân biến đang lấy đạo hàm, mọi thứ khác đối xử như số.

**Walk-through 1 — $f(x,y) = x^2 y^3$, tính $\\frac{\\partial f}{\\partial x}$**:

$$\\begin{aligned}
\\frac{\\partial f}{\\partial x} &= \\frac{\\partial}{\\partial x}\\left(x^2 \\cdot \\underbrace{y^3}_{\\text{coi là số } c}\\right) \\\\
&= c \\cdot \\frac{\\partial}{\\partial x}(x^2) \\qquad \\text{(số } c \\text{ "kéo ra ngoài")} \\\\
&= y^3 \\cdot 2x = 2x\\,y^3
\\end{aligned}$$

Đổi vai, tính $\\frac{\\partial f}{\\partial y}$ (giờ $x^2$ là số):
$$\\frac{\\partial f}{\\partial y} = x^2 \\cdot \\frac{\\partial}{\\partial y}(y^3) = x^2 \\cdot 3y^2 = 3x^2 y^2.$$

**Kiểm tra bằng số tại $(1,2)$** (xác minh đạo hàm = tốc độ thay đổi thật):
- $f(1,2) = 1\\cdot 8 = 8$; $f(1.01, 2) = 1.0201 \\cdot 8 = 8.1608$.
- Tốc độ thực $\\approx \\dfrac{8.1608 - 8}{0.01} = 16.08$. Công thức: $\\frac{\\partial f}{\\partial x}\\big|_{(1,2)} = 2\\cdot 1\\cdot 8 = 16$ ✓ (lệch nhỏ do $h=0.01$).

**Walk-through 2 — $f(x,y) = \\dfrac{x}{y}$** (quy tắc thương theo $x$, lũy thừa âm theo $y$):
- $\\frac{\\partial f}{\\partial x}$: coi $y$ là số → $f = \\frac{1}{y}\\cdot x \\to \\frac{\\partial f}{\\partial x} = \\frac{1}{y}$.
- $\\frac{\\partial f}{\\partial y}$: viết $f = x\\cdot y^{-1}$, coi $x$ là số → $\\frac{\\partial f}{\\partial y} = x\\cdot(-1)y^{-2} = -\\frac{x}{y^2}$.
- Tại $(6,2)$: $\\frac{\\partial f}{\\partial x} = \\frac{1}{2}$, $\\frac{\\partial f}{\\partial y} = -\\frac{6}{4} = -1.5$ (tăng $x$ thì $f$ lên, tăng $y$ thì $f$ xuống — hợp lý vì $y$ ở mẫu).

**Walk-through 3 — chain rule: $f(x,y) = \\sin(x^2 y)$**:
- Đặt $u = x^2 y$. $\\frac{\\partial f}{\\partial x} = \\cos(u)\\cdot\\frac{\\partial u}{\\partial x} = \\cos(x^2 y)\\cdot 2xy$.
- $\\frac{\\partial f}{\\partial y} = \\cos(u)\\cdot\\frac{\\partial u}{\\partial y} = \\cos(x^2 y)\\cdot x^2$.

**Walk-through 4 — hàm 3 biến $f(x,y,z) = x^2 y + y z^2$** (đạo hàm riêng tổng quát lên n biến chỉ là "thêm trục"):
- $\\frac{\\partial f}{\\partial x} = 2xy$ (coi $y,z$ là số; số hạng $yz^2$ không chứa $x$ → biến mất).
- $\\frac{\\partial f}{\\partial y} = x^2 + z^2$.
- $\\frac{\\partial f}{\\partial z} = 2yz$.
- Tại $(1,2,3)$: $\\frac{\\partial f}{\\partial x} = 4$, $\\frac{\\partial f}{\\partial y} = 1+9 = 10$, $\\frac{\\partial f}{\\partial z} = 2\\cdot2\\cdot3 = 12$.

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

### Walk-through tính ∇f (4 ví dụ số)

| # | Hàm $f(x,y)$ | $\\frac{\\partial f}{\\partial x}$ | $\\frac{\\partial f}{\\partial y}$ | $\\nabla f$ tại điểm | $\\lVert\\nabla f\\rVert$ |
|---|---|---|---|---|---|
| 1 | $x^2 + y^2$ | $2x$ | $2y$ | tại $(3,4)$: $(6,8)$ | $\\sqrt{36+64}=10$ |
| 2 | $xy$ | $y$ | $x$ | tại $(3,4)$: $(4,3)$ | $\\sqrt{16+9}=5$ |
| 3 | $\\ln(x^2+y^2)$ | $\\frac{2x}{x^2+y^2}$ | $\\frac{2y}{x^2+y^2}$ | tại $(1,1)$: $(1,1)$ | $\\sqrt{2}\\approx 1.41$ |
| 4 | $e^{xy}$ | $y\\,e^{xy}$ | $x\\,e^{xy}$ | tại $(0,5)$: $(5,0)$ | $5$ |

Walk-through chi tiết ví dụ **3** ($f = \\ln(x^2+y^2)$ tại $(1,1)$):
$$\\begin{aligned}
u &= x^2 + y^2, \\quad f = \\ln(u) \\\\
\\frac{\\partial f}{\\partial x} &= \\frac{1}{u}\\cdot\\frac{\\partial u}{\\partial x} = \\frac{2x}{x^2+y^2} \\xrightarrow{(1,1)} \\frac{2}{2} = 1 \\\\
\\frac{\\partial f}{\\partial y} &= \\frac{2y}{x^2+y^2} \\xrightarrow{(1,1)} \\frac{2}{2} = 1 \\\\
\\nabla f(1,1) &= (1, 1), \\quad \\lVert\\nabla f\\rVert = \\sqrt{1^2+1^2} = \\sqrt{2}
\\end{aligned}$$
→ tại $(1,1)$ hàm tăng nhanh nhất theo hướng Đông-Bắc $45°$, vuông góc với đường mức (vòng tròn) đi qua điểm đó.

### Đạo hàm hướng (directional derivative) — vì sao ∇f là hướng dốc nhất

💡 **Trực giác**: gradient cho hướng dốc nhất, nhưng nếu tôi **bắt buộc** đi theo hướng khác $\\hat{u}$ (vd đường mòn có sẵn) thì dốc bao nhiêu? Đó là **đạo hàm hướng** $D_{\\hat u} f$ — chiếu gradient lên hướng đi.

Với vector **đơn vị** $\\hat{u}$ ($\\lVert\\hat u\\rVert = 1$):
$$D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u} = \\lVert\\nabla f\\rVert\\,\\lVert\\hat u\\rVert\\cos\\theta = \\lVert\\nabla f\\rVert\\cos\\theta$$

với $\\theta$ = góc giữa $\\hat u$ và $\\nabla f$. Vì $\\cos\\theta \\in [-1, 1]$:
- $\\theta = 0$ (đi đúng hướng gradient) → $D_{\\hat u} f = \\lVert\\nabla f\\rVert$ (**max** — dốc lên nhanh nhất).
- $\\theta = 180°$ (ngược gradient) → $D_{\\hat u} f = -\\lVert\\nabla f\\rVert$ (dốc xuống nhanh nhất → gradient descent).
- $\\theta = 90°$ (vuông góc, dọc đường mức) → $D_{\\hat u} f = 0$ (không đổi độ cao).

**Walk-through** — $f = x^2+y^2$ tại $(1,2)$, $\\nabla f = (2,4)$, $\\lVert\\nabla f\\rVert = \\sqrt{20}$:
- Hướng $\\hat u = (1,0)$ (Đông): $D_{\\hat u} f = (2,4)\\cdot(1,0) = 2$.
- Hướng $\\hat u = (0,1)$ (Bắc): $D_{\\hat u} f = (2,4)\\cdot(0,1) = 4$.
- Hướng gradient chuẩn hóa $\\hat u = (2,4)/\\sqrt{20} = (1,2)/\\sqrt5$: $D_{\\hat u} f = \\frac{2\\cdot1 + 4\\cdot2}{\\sqrt5} = \\frac{10}{\\sqrt5} = \\sqrt{20}$ ✓ (đúng bằng $\\lVert\\nabla f\\rVert$ — không hướng nào dốc hơn).
- Hướng vuông góc $\\hat u = (-2,1)/\\sqrt5$: $D_{\\hat u} f = \\frac{2(-2)+4(1)}{\\sqrt5} = 0$ ✓ (dọc đường mức).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\hat u$ phải là vector ĐƠN VỊ?"* Để $D_{\\hat u} f$ đo tốc độ thay đổi trên **1 đơn vị độ dài** di chuyển, công bằng giữa các hướng. Nếu $\\hat u$ dài gấp đôi, dot product gấp đôi nhưng không phải vì hàm dốc hơn — chỉ vì ta "bước dài hơn". Chuẩn hóa loại bỏ nhiễu này.
- *"$D_{\\hat u} f$ âm nghĩa là gì?"* Đi theo hướng $\\hat u$ làm $f$ **giảm** (xuống dốc). Âm nhất khi $\\hat u = -\\nabla f / \\lVert\\nabla f\\rVert$, giá trị $-\\lVert\\nabla f\\rVert$ — đây chính là bước của gradient descent.

⚠ **Lỗi thường gặp — dùng $\\hat u$ chưa chuẩn hóa**. Phản ví dụ: với $\\nabla f = (2,4)$, dùng "hướng" $(3,4)$ chưa chuẩn hóa cho $D = 2\\cdot3+4\\cdot4 = 22$ — số vô nghĩa (lớn hơn cả $\\lVert\\nabla f\\rVert = \\sqrt{20}$!). Đúng phải chuẩn hóa: $\\hat u = (3,4)/5$, $D = 22/5 = 4.4 < \\sqrt{20}$ ✓.

### Mặt phẳng tiếp xúc (tangent plane)

💡 **Trực giác**: như tiếp tuyến áp sát đường cong 1 biến, **mặt phẳng tiếp xúc** áp sát mặt cong $z = f(x,y)$ tại 1 điểm — xấp xỉ tuyến tính tốt nhất ở lân cận.

Tại $(a, b)$ với $z_0 = f(a,b)$:
$$z = f(a,b) + \\frac{\\partial f}{\\partial x}(a,b)\\,(x-a) + \\frac{\\partial f}{\\partial y}(a,b)\\,(y-b)$$

**Walk-through** — $f = x^2 + y^2$ tại $(1, 2)$:
- $f(1,2) = 5$; $\\frac{\\partial f}{\\partial x} = 2x = 2$; $\\frac{\\partial f}{\\partial y} = 2y = 4$.
- Mặt phẳng tiếp xúc: $z = 5 + 2(x-1) + 4(y-2) = 2x + 4y - 5$.
- Kiểm tra xấp xỉ tại $(1.1, 2.1)$: mặt phẳng cho $z \\approx 2(1.1)+4(2.1)-5 = 5.6$; giá trị thật $f = 1.21 + 4.41 = 5.62$ — sai số chỉ $0.02$ ✓.

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
- *"Vì sao gradient vuông góc đường mức?"* Đi dọc đường mức thì $f$ không đổi → độ dốc theo hướng đó bằng 0 → $\\nabla f \\cdot (\\text{hướng đường mức}) = 0$ → vuông góc.

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
- Đạo hàm hướng $D_{\\hat u} f = \\nabla f\\cdot\\hat u = \\lVert\\nabla f\\rVert\\cos\\theta$: max khi $\\hat u \\parallel \\nabla f$, $=0$ khi $\\perp$ (dọc đường mức).
- Mặt phẳng tiếp xúc: $z = f(a,b) + f_x(x-a) + f_y(y-b)$ — xấp xỉ tuyến tính tốt nhất tại $(a,b)$.
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

### Walk-through đầy đủ 4 bước (≥2 ví dụ + điểm yên ngựa)

Quy trình cố định cho mọi bài: **(1)** giải $\\nabla f = 0$ → điểm dừng; **(2)** lập Hessian $H$; **(3)** tính $\\det(H)$ tại từng điểm dừng; **(4)** đọc bảng phân loại.

**Ví dụ A — có cả cực tiểu lẫn yên ngựa: $f(x,y) = x^3 - 3x + y^2$**

Bước 1 — giải $\\nabla f = 0$:
$$\\frac{\\partial f}{\\partial x} = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1; \\qquad \\frac{\\partial f}{\\partial y} = 2y = 0 \\Rightarrow y = 0.$$
→ Hai điểm dừng: $(1, 0)$ và $(-1, 0)$.

Bước 2 — Hessian:
$$H = \\begin{bmatrix} \\dfrac{\\partial^2 f}{\\partial x^2} & \\dfrac{\\partial^2 f}{\\partial x\\partial y} \\\\[6pt] \\dfrac{\\partial^2 f}{\\partial y\\partial x} & \\dfrac{\\partial^2 f}{\\partial y^2} \\end{bmatrix} = \\begin{bmatrix} 6x & 0 \\\\ 0 & 2 \\end{bmatrix}, \\quad \\det(H) = 12x.$$

Bước 3 & 4 — phân loại từng điểm:
- Tại $(1,0)$: $\\det = 12 > 0$ và $f_{xx} = 6 > 0$ → **cực tiểu**. $f(1,0) = 1 - 3 + 0 = -2$.
- Tại $(-1,0)$: $\\det = -12 < 0$ → **điểm yên ngựa** (saddle). Theo trục $x$ mặt cong xuống ($f_{xx} = -6 < 0$), theo trục $y$ mặt cong lên ($f_{yy} = 2 > 0$) — vừa lõm vừa vồng.

**Ví dụ B — điểm yên ngựa kinh điển: $f(x,y) = x^2 - y^2$**

- Bước 1: $f_x = 2x = 0$, $f_y = -2y = 0$ → điểm dừng duy nhất $(0,0)$.
- Bước 2: $H = \\begin{bmatrix} 2 & 0 \\\\ 0 & -2 \\end{bmatrix}$.
- Bước 3: $\\det(H) = (2)(-2) - 0 = -4 < 0$.
- Bước 4: $\\det < 0$ → **yên ngựa**. Đi dọc trục $x$ ($y=0$): $f = x^2$ → đáy thung lũng (cong lên). Đi dọc trục $y$ ($x=0$): $f = -y^2$ → đỉnh đồi (cong xuống). Đúng hình "yên ngựa": cao theo 1 hướng, thấp theo hướng vuông góc.

**ASCII — yên ngựa $f = x^2 - y^2$** (nhìn từ trên, dấu = giá trị $f$ quanh gốc):

\`\`\`
        y
   −4   │   −1    −4        ↑ dọc trục y: f = −y², ĐI XUỐNG
        │                     (đỉnh tại gốc theo hướng này)
   −1   │    0    −1
   ─────┼──────────────→ x
   −1   │    0    −1        → dọc trục x: f = x², ĐI LÊN
        │                     (đáy tại gốc theo hướng này)
   −4   │   −1    −4
        gốc (0,0): f = 0 — không min, không max → SADDLE
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\nabla f = 0$ chắc chắn là cực trị?"* Không — chỉ là **điều kiện cần**. Điểm yên ngựa cũng có $\\nabla f = 0$ nhưng không phải cực trị. Phải dùng Hessian phân loại.
- *"$\\det(H) = 0$ thì sao?"* Test thất bại (chưa kết luận). Phải dùng cách khác (xét trực tiếp giá trị quanh điểm, hoặc đạo hàm bậc cao hơn).

⚠ **Lỗi thường gặp — quên kiểm dấu $\\frac{\\partial^2 f}{\\partial x^2}$ khi $\\det(H) > 0$**. $\\det(H) > 0$ chỉ nói "cực trị (không phải yên ngựa)", còn **cực đại hay cực tiểu** phải xem $\\frac{\\partial^2 f}{\\partial x^2}$: $> 0 \\to$ tiểu, $< 0 \\to$ đại. Phản ví dụ: $f = -x^2-y^2$ có $H = \\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix}$, $\\det = 4 > 0$ nhưng $\\frac{\\partial^2 f}{\\partial x^2} = -2 < 0 \\to$ **cực đại** (không phải tiểu).

⚠ **Tại sao test này đúng — góc nhìn định dấu (definiteness) của Hessian**. Bản chất phân loại là xét $H$ **xác định dương / âm** (positive/negative definite). Với ma trận $2\\times2$ đối xứng, dấu hai eigenvalue $\\lambda_1, \\lambda_2$ quyết định:
- $\\det(H) = \\lambda_1\\lambda_2 > 0$ → hai $\\lambda$ **cùng dấu**: cùng dương ($f_{xx}>0$, lõm lên mọi hướng → cực tiểu) hoặc cùng âm (cực đại).
- $\\det(H) = \\lambda_1\\lambda_2 < 0$ → hai $\\lambda$ **trái dấu**: 1 hướng cong lên, 1 hướng cong xuống → yên ngựa.
- $\\det(H) = 0$ → có $\\lambda = 0$ (hướng "phẳng" cấp 2) → test thất bại, phải xét bậc cao hơn.

Vì sao $\\det > 0$ thôi chưa đủ phân biệt min/max? Vì cả "cùng dương" lẫn "cùng âm" đều cho $\\det > 0$ — nên cần thêm dấu $f_{xx}$ (hoặc dấu một eigenvalue) để biết lõm lên hay vồng xuống.

🔁 **Dừng lại tự kiểm tra**

1. $f = x^2 + y^2$. Tìm điểm dừng và phân loại.
2. $f = 4xy - x^4 - y^4$. Tại điểm dừng $(1, 1)$, $H = \\begin{bmatrix} -12 & 4 \\\\ 4 & -12 \\end{bmatrix}$. Đây là loại điểm gì?

<details><summary>Đáp án</summary>

1. $\\frac{\\partial f}{\\partial x} = 2x = 0$, $\\frac{\\partial f}{\\partial y} = 2y = 0 \\to (0,0)$. $H = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, $\\det = 4 > 0$, $\\frac{\\partial^2 f}{\\partial x^2} = 2 > 0 \\to$ **cực tiểu** tại $(0,0)$, $f = 0$.
2. $\\det(H) = (-12)(-12) - 4\\cdot4 = 144 - 16 = 128 > 0$ và $f_{xx} = -12 < 0 \\to$ **cực đại** tại $(1,1)$. (Hai eigenvalue cùng âm.)

</details>

### 📝 Tóm tắt mục 5

- Điều kiện cần: $\\nabla f = 0$ → điểm dừng (có thể đỉnh/đáy/yên ngựa).
- Phân loại bằng Hessian: $\\det(H) > 0$ & $\\frac{\\partial^2 f}{\\partial x^2} > 0 \\to$ tiểu; $\\det(H) > 0$ & $\\frac{\\partial^2 f}{\\partial x^2} < 0 \\to$ đại; $\\det(H) < 0 \\to$ yên ngựa.
- $\\det(H) = 0 \\to$ chưa kết luận.

---

## 6. Tối ưu có ràng buộc — nhân tử Lagrange

💡 **Trực giác / Hình dung**: cực trị ở Mục 5 là tối ưu **tự do** (đi đâu cũng được). Thực tế thường có **ràng buộc** (constraint): "tối đa diện tích nhưng hàng rào chỉ dài 40m", "tối thiểu chi phí nhưng phải đạt sản lượng cố định". Lúc này điểm tối ưu KHÔNG còn ở chỗ $\\nabla f = 0$ — mà ở chỗ ta bị "kẹt" vào đường ràng buộc $g(x,y) = c$ và không thể đi tiếp theo hướng làm $f$ tốt hơn.

**Hình ảnh then chốt**: tưởng tượng các đường mức $f = $ const và đường ràng buộc $g = c$ vẽ chung. Đi dọc đường ràng buộc, ta cắt ngang các đường mức của $f$ (giá trị $f$ thay đổi). Ta dừng ở chỗ đường ràng buộc **tiếp xúc** (chạm, không cắt qua) một đường mức của $f$ — vì ở đó không còn cách nào đi dọc ràng buộc mà làm $f$ tăng/giảm thêm. Tại điểm tiếp xúc, hai đường mức **cùng tiếp tuyến** → hai gradient **song song**:

$$\\boxed{\\nabla f = \\lambda\\,\\nabla g}$$

$\\lambda$ (lambda) gọi là **nhân tử Lagrange** (Lagrange multiplier). Giải hệ:
$$\\frac{\\partial f}{\\partial x} = \\lambda\\frac{\\partial g}{\\partial x}, \\quad \\frac{\\partial f}{\\partial y} = \\lambda\\frac{\\partial g}{\\partial y}, \\quad g(x,y) = c.$$
(3 phương trình, 3 ẩn $x, y, \\lambda$.)

> 📐 **Định nghĩa đầy đủ — nhân tử Lagrange $\\lambda$**
>
> **(a) Là gì**: hệ số tỉ lệ giữa hai gradient tại điểm tối ưu có ràng buộc, $\\nabla f = \\lambda\\nabla g$. Về số học, $\\lambda$ còn = **tốc độ cải thiện** giá trị tối ưu khi nới lỏng ràng buộc 1 đơn vị: $\\lambda = \\frac{df^*}{dc}$ ("shadow price" trong kinh tế).
>
> **(b) Vì sao cần**: bài tối ưu có ràng buộc không thể giải bằng $\\nabla f = 0$ (điểm đó thường nằm ngoài ràng buộc). Lagrange biến bài "tối ưu có ràng buộc" thành "giải hệ phương trình" — không cần tham số hóa đường cong ràng buộc (thường khó/bất khả).
>
> **(c) Ví dụ số**: tối đa $f = xy$ với $x + y = 10$. Giải dưới đây cho $(5,5)$, $f^* = 25$, $\\lambda = 5$. Nếu nới ràng buộc thành $x+y = 11$ thì $f^*$ mới $= 5.5\\cdot5.5 = 30.25$, tăng $\\approx 5$ — đúng bằng $\\lambda$ ✓.

**Walk-through 1 — tối đa $f(x,y) = xy$ với ràng buộc $g = x + y = 10$**:

Bước 1 — viết hệ $\\nabla f = \\lambda\\nabla g$. Ở đây $\\nabla f = (y, x)$, $\\nabla g = (1, 1)$:
$$\\begin{aligned}
y &= \\lambda \\cdot 1 \\\\
x &= \\lambda \\cdot 1 \\\\
x + y &= 10
\\end{aligned}$$
Bước 2 — từ 2 phương trình đầu: $x = y = \\lambda$. Thay vào ràng buộc: $2\\lambda = 10 \\to \\lambda = 5$.
Bước 3 — nghiệm: $(x, y) = (5, 5)$, $f = 25$. (So sánh: $(1,9) \\to 9$, $(2,8)\\to16$, $(4,6)\\to24$ đều nhỏ hơn → đúng là cực đại.)

**Walk-through 2 — tối thiểu $f(x,y) = x^2 + y^2$ (khoảng cách² tới gốc) với ràng buộc $g = x + 2y = 5$** (tìm điểm trên đường thẳng gần gốc nhất):

Bước 1 — $\\nabla f = (2x, 2y)$, $\\nabla g = (1, 2)$:
$$2x = \\lambda\\cdot 1, \\quad 2y = \\lambda\\cdot 2, \\quad x + 2y = 5.$$
Bước 2 — từ 2 phương trình đầu: $x = \\frac{\\lambda}{2}$, $y = \\lambda$. Thay vào ràng buộc:
$$\\frac{\\lambda}{2} + 2\\lambda = 5 \\;\\Rightarrow\\; \\frac{5\\lambda}{2} = 5 \\;\\Rightarrow\\; \\lambda = 2.$$
Bước 3 — $x = 1$, $y = 2$. $f = 1 + 4 = 5$, khoảng cách $= \\sqrt5$.

Kiểm tra hình học: điểm gần gốc nhất trên đường thẳng là chân đường vuông góc hạ từ gốc — và $\\nabla f = (2,4) \\parallel \\nabla g = (1,2)$ ✓ (gradient của $f$ song song pháp tuyến đường thẳng = vuông góc đường thẳng).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tại tối ưu hai gradient lại song song?"* Vì $\\nabla f \\perp$ đường mức $f$, $\\nabla g \\perp$ đường ràng buộc. Tại điểm tiếp xúc hai đường có chung tiếp tuyến → chung pháp tuyến → hai gradient cùng phương.
- *"$\\lambda$ âm hay 0 nghĩa là gì?"* $\\lambda$ có thể âm (ràng buộc "đẩy" ngược hướng $f$ tăng). $\\lambda = 0 \\iff \\nabla f = 0$ tại điểm đó → điểm tối ưu tự do tình cờ thỏa ràng buộc.
- *"Nhiều ràng buộc thì sao?"* $\\nabla f = \\lambda_1\\nabla g_1 + \\lambda_2\\nabla g_2 + \\ldots$ — mỗi ràng buộc một nhân tử.

⚠ **Lỗi thường gặp — quên phương trình ràng buộc**. Hệ Lagrange có **3 phương trình** (2 từ $\\nabla f = \\lambda\\nabla g$ + 1 là $g = c$). Bỏ phương trình ràng buộc → thiếu thông tin, không giải ra $\\lambda$. Phản ví dụ: chỉ giải $y = \\lambda, x = \\lambda$ ở walk-through 1 cho $x = y$ nhưng không ra số cụ thể; phải thêm $x + y = 10$ mới khóa được $\\lambda = 5$.

🔁 **Dừng lại tự kiểm tra**

1. Tối đa $f = xy$ với $x^2 + y^2 = 8$. (Gợi ý: $g = x^2+y^2$, $\\nabla g = (2x, 2y)$.)

<details><summary>Đáp án</summary>

$\\nabla f = (y,x) = \\lambda(2x, 2y)$ → $y = 2\\lambda x$ và $x = 2\\lambda y$. Nhân chéo / chia: $\\frac{y}{x} = \\frac{x}{y} \\to x^2 = y^2 \\to y = \\pm x$. Với $y = x$ và $x^2+y^2 = 8$: $2x^2 = 8 \\to x = 2, y = 2$ (hoặc $x=y=-2$), $f = 4$. Đó là **cực đại** ($y = -x$ cho $f = -4$, cực tiểu). Vậy max $f = \\mathbf{4}$ tại $(2,2)$ và $(-2,-2)$.

</details>

### 📝 Tóm tắt mục 6

- Tối ưu có ràng buộc $g(x,y) = c$: nghiệm ở chỗ $\\nabla f = \\lambda\\nabla g$ (hai gradient song song).
- Giải hệ 3 phương trình ($2$ thành phần gradient + ràng buộc) cho $x, y, \\lambda$.
- $\\lambda$ = "shadow price" = tốc độ cải thiện $f^*$ khi nới ràng buộc 1 đơn vị.
- KHÔNG quên phương trình ràng buộc — thiếu nó hệ vô định.

---

## 7. Ứng dụng

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

### Walk-through end-to-end gradient descent (từng bước bằng số)

Loss đồ chơi 2 tham số: $L(w_1, w_2) = (w_1 - 3)^2 + (w_2 - 5)^2$. Cực tiểu rõ ràng tại $(3, 5)$, $L = 0$. Gradient: $\\nabla L = \\big(2(w_1 - 3),\\ 2(w_2 - 5)\\big)$. Learning rate $\\eta = 0.1$. Bắt đầu $\\theta_0 = (0, 0)$.

| Bước $k$ | $\\theta_k$ | $L(\\theta_k)$ | $\\nabla L(\\theta_k)$ | $\\theta_{k+1} = \\theta_k - \\eta\\,\\nabla L$ |
|---|---|---|---|---|
| 0 | $(0, 0)$ | $9 + 25 = 34$ | $(-6, -10)$ | $(0.6, 1.0)$ |
| 1 | $(0.6, 1.0)$ | $5.76 + 16 = 21.76$ | $(-4.8, -8.0)$ | $(1.08, 1.8)$ |
| 2 | $(1.08, 1.8)$ | $3.69 + 10.24 = 13.93$ | $(-3.84, -6.4)$ | $(1.46, 2.44)$ |
| 3 | $(1.46, 2.44)$ | $2.36 + 6.55 = 8.92$ | $(-3.07, -5.12)$ | $(1.77, 2.95)$ |

Chi tiết **bước 0 → 1** (công thức $\\theta \\leftarrow \\theta - \\eta\\nabla L$):
$$\\begin{aligned}
\\nabla L(0,0) &= \\big(2(0-3),\\ 2(0-5)\\big) = (-6, -10) \\\\
\\theta_1 &= (0,0) - 0.1\\cdot(-6, -10) = (0.6,\\ 1.0)
\\end{aligned}$$
$L$ giảm $34 \\to 21.76 \\to 13.93 \\to 8.92$ — mỗi bước tiến gần $(3,5)$. Sau $\\sim 30$ bước $\\theta \\approx (3, 5)$, $L \\approx 0$. Đây chính xác là vòng lặp huấn luyện mọi mạng nơ-ron, chỉ khác số chiều của $\\theta$ (vài tỉ thay vì 2) và $\\nabla L$ tính bằng backpropagation.

⚠ **Lỗi thường gặp — $\\eta$ quá lớn gây phân kỳ**. Với $L = (w-3)^2$ 1 chiều và $\\eta = 1.1$: từ $w_0 = 0$, $\\nabla L = -6$, $w_1 = 0 - 1.1(-6) = 6.6$ (vọt qua $3$); $\\nabla L|_{6.6} = 7.2$, $w_2 = 6.6 - 1.1(7.2) = -1.32$... dao động ngày càng xa $3$ → **phân kỳ**. Cùng bài với $\\eta = 0.1$ thì hội tụ êm. Đây là lý do learning rate phải đủ nhỏ.

### 📝 Tóm tắt mục 7

- Gradient Descent: $\\theta \\leftarrow \\theta - \\alpha\\cdot\\nabla J$, lặp đến khi $\\nabla J \\approx 0$.
- $\\alpha$ (learning rate): cân bằng tốc độ vs ổn định.
- Cốt lõi huấn luyện ML; rủi ro kẹt cực tiểu địa phương.

---

## 8. Bài tập

### Bài tập

**Bài 1**: $f(x, y) = 3x^2 + 2xy - y^2$. Tính $\\frac{\\partial f}{\\partial x}$, $\\frac{\\partial f}{\\partial y}$.

**Bài 2**: $f(x, y) = e^{x^2+y^2}$. Tính $\\nabla f$ tại $(1, 1)$.

**Bài 3**: Tìm cực trị của $f(x, y) = x^2 + xy + y^2 - 3x - 3y$.

**Bài 4**: $f(x, y) = x^3 - 3xy + y^3$. Tìm điểm dừng. Phân loại bằng Hessian.

**Bài 5**: $f(x, y) = x^2 - y^2$. Tìm điểm dừng. Phân loại.

**Bài 6**: $f(x, y) = x^2 + 2y^2$ tại $(1, 1)$. Tính đạo hàm hướng theo $\\hat u = (3/5, 4/5)$. Hướng nào cho đạo hàm hướng lớn nhất, bằng bao nhiêu?

**Bài 7** (Lagrange): Tối thiểu $f(x, y) = x^2 + y^2$ với ràng buộc $x + y = 6$. Tìm điểm và giá trị tối ưu, và $\\lambda$.

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

**Bài 6**:
- $\\nabla f = (2x, 4y) \\xrightarrow{(1,1)} (2, 4)$.
- Đạo hàm hướng: $D_{\\hat u} f = \\nabla f\\cdot\\hat u = 2\\cdot\\frac{3}{5} + 4\\cdot\\frac{4}{5} = \\frac{6 + 16}{5} = \\frac{22}{5} = \\mathbf{4.4}$.
- Hướng cho đạo hàm hướng lớn nhất = hướng gradient $\\hat u = (2,4)/\\sqrt{20}$, giá trị max $= \\lVert\\nabla f\\rVert = \\sqrt{2^2 + 4^2} = \\sqrt{20} \\approx \\mathbf{4.47}$ (lớn hơn $4.4$ — hợp lý, không hướng nào vượt $\\lVert\\nabla f\\rVert$).

**Bài 7**:
- $\\nabla f = (2x, 2y)$, $\\nabla g = (1, 1)$. Hệ Lagrange: $2x = \\lambda$, $2y = \\lambda$, $x + y = 6$.
- Từ 2 phương trình đầu: $x = y = \\lambda/2$. Thay vào ràng buộc: $\\lambda = 6 \\to \\lambda/2 = 3$... cụ thể $2x = \\lambda$ và $x = y$ → $2x + 2y = 2\\lambda$? Giải trực tiếp: $x = y$ nên $2x = 6 \\to x = y = 3$.
- Điểm tối ưu $(3, 3)$, $f = 9 + 9 = \\mathbf{18}$. $\\lambda = 2x = \\mathbf{6}$.
- Kiểm tra "shadow price": nới ràng buộc thành $x+y = 7$ cho $(3.5, 3.5)$, $f^* = 24.5$, tăng $6.5 \\approx \\lambda$ (xấp xỉ vì $\\lambda$ thay đổi theo $c$ ở hàm bậc 2) ✓.

---

## 9. Bài tiếp theo

[Lesson 05 — Tích phân bội](../lesson-05-multiple-integrals/).

## 📝 Tổng kết

1. **Đạo hàm riêng** $\\frac{\\partial f}{\\partial x}$: coi biến khác hằng.
2. **Gradient** $\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$ chỉ hướng tăng nhanh nhất, vuông góc đường mức.
3. **Đạo hàm hướng** $D_{\\hat u} f = \\nabla f\\cdot\\hat u = \\lVert\\nabla f\\rVert\\cos\\theta$; **mặt phẳng tiếp xúc** = xấp xỉ tuyến tính của mặt.
4. **Cực trị**: tại điểm dừng ($\\nabla f = 0$). Phân loại bằng Hessian ($\\det$ + dấu $f_{xx}$ = định dấu eigenvalue).
5. **Yên ngựa** $= \\det(H) < 0$ — cao theo 1 hướng, thấp theo hướng khác.
6. **Lagrange** $\\nabla f = \\lambda\\nabla g$: tối ưu có ràng buộc; $\\lambda$ = shadow price.
7. **Gradient Descent** $\\theta \\leftarrow \\theta - \\eta\\nabla L$ cốt lõi ML; $\\eta$ quá lớn → phân kỳ.
`;
