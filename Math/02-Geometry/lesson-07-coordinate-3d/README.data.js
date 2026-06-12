// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-07-coordinate-3d/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tọa độ Oxyz

## Mục tiêu

- Hiểu **hệ tọa độ 3 chiều Oxyz**.
- Tính **khoảng cách** trong không gian 3D.
- Viết **phương trình mặt phẳng** và **phương trình đường thẳng** trong không gian.
- Tính khoảng cách điểm-mặt-đường.

## Kiến thức tiền đề

- [Lesson 06 — Tọa độ Oxy](../lesson-06-coordinate-plane-conics/) — biết khái niệm tọa độ 2D.

---

## 1. Hệ tọa độ 3D

💡 **Trực giác / Hình dung**: đứng trong 1 căn phòng — góc phòng là gốc O. Vị trí 1 con ruồi cần 3 số: cách tường trái bao xa (x), cách tường sau bao xa (y), cao bao nhiêu so với sàn (z). 3 trục Ox, Oy, Oz như 3 mép tường gặp nhau ở góc, đôi một vuông góc. Khoảng cách 3D = Pythagoras áp dụng 2 lần.

**Hệ tọa độ Oxyz**: 3 trục Ox, Oy, Oz đôi một vuông góc, cắt nhau tại O.

Mỗi điểm M có 3 tọa độ **(x, y, z)** = hoành độ, tung độ, **cao độ**.

### Hình dung hệ trục Oxyz (ASCII)

Quy ước **tay phải (right-handed)**: ngón cái Ox, ngón trỏ Oy, ngón giữa Oz. Trục Oz hướng "lên", còn Ox vẽ "đâm ra phía người xem".

\`\`\`
              z (lên)
              ↑
              |
              |
              |        • M(2, 3, 4)
              |       ╱:
              |      ╱ :  ← cao độ z = 4
              |     ╱  :
              |    ╱   :
              O───┼────┼──────────► y (sang phải)
             ╱   ╱:    :
            ╱   ╱ :....:  ← hình chiếu (2, 3, 0) trên đáy Oxy
           ╱   ╱
          ╱   ╱  hoành độ x = 2, tung độ y = 3
         ╱
        x (đâm ra khỏi trang, về phía người xem)
\`\`\`

💡 **Trực giác — trục Oz "đâm ra khỏi trang giấy"**: mặt phẳng đáy Oxy là tờ giấy nằm trên bàn. Trục Oz dựng vuông góc lên khỏi mặt bàn — đó là chiều "cao". Để định vị điểm M(2, 3, 4): đi 2 đơn vị theo x, 3 theo y (vẫn đang trên mặt bàn, tại bóng đổ (2, 3, 0)), rồi **leo lên 4** theo z. Bóng đổ xuống đáy gọi là **hình chiếu (projection)** của M lên mặt phẳng Oxy — luôn là (x, y, 0).

⚠ **Lỗi thường gặp — nhầm hệ tay phải / tay trái**: đồ họa máy tính (OpenGL dùng tay phải, DirectX dùng tay trái) khác nhau ở chiều trục z. Cùng điểm (1, 1, 1) nhưng hệ trái và hệ phải cho vị trí "trước/sau màn hình" ngược nhau. Trong toán phổ thông luôn dùng **tay phải**; nhớ cố định 1 quy ước để cross product (mục 1.5) không bị đảo dấu.

### Khoảng cách 2 điểm A(x₁, y₁, z₁), B(x₂, y₂, z₂)

$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

(Pythagoras mở rộng 3D.)

### Vector

**Vector AB** $= (x_2-x_1, y_2-y_1, z_2-z_1)$.

**Tích vô hướng** $u \\cdot v = u_1 v_1 + u_2 v_2 + u_3 v_3$.

**Độ lớn** $|u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$.

**Góc**: $\\cos(\\theta) = \\frac{u\\cdot v}{|u|\\cdot|v|}$.

**4 ví dụ số đa dạng (khoảng cách 3D)**:
- A(0,0,0), B(2,3,6): $d = \\sqrt{4+9+36} = \\sqrt{49} = $ **7**.
- A(1,1,1), B(2,3,3): $d = \\sqrt{1+4+4} = \\sqrt{9} = $ **3**.
- A(0,0,0), B(1,2,2): $d = \\sqrt{1+4+4} = $ **3**.
- A(−1,0,2), B(1,4,2): $d = \\sqrt{4+16+0} = \\sqrt{20} = $ **2√5 ≈ 4.47** (cùng z).

#### Walk-through chi tiết — Pythagoras áp 2 lần

Lấy A(0,0,0), B(2,3,6). Vì sao $\\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$ đúng, làm rõ từng bước (cấm "dễ thấy"):

$$\\begin{aligned}
\\text{Bước 1 — bóng đổ trên đáy Oxy:}\\quad
d_{\\text{đáy}} &= \\sqrt{\\Delta x^2 + \\Delta y^2} = \\sqrt{2^2 + 3^2} = \\sqrt{13} \\\\
\\text{Bước 2 — dựng tam giác vuông đứng:}\\quad
& \\text{cạnh đáy} = d_{\\text{đáy}} = \\sqrt{13},\\ \\ \\text{cạnh đứng} = \\Delta z = 6 \\\\
\\text{Bước 3 — Pythagoras lần 2:}\\quad
d &= \\sqrt{d_{\\text{đáy}}^2 + \\Delta z^2} = \\sqrt{(\\sqrt{13})^2 + 6^2} \\\\
&= \\sqrt{13 + 36} = \\sqrt{49} = 7
\\end{aligned}$$

Vì $(\\sqrt{13})^2 = 13 = \\Delta x^2 + \\Delta y^2$ nên gộp lại đúng $\\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$. Verify ngược: $7^2 = 49 = 4+9+36$ ✓.

ASCII của 2 tam giác vuông lồng nhau:

\`\`\`
        B(2,3,6)
        /|
       / | Δz = 6  (cạnh đứng)
      /  |
     /   |
    A----P  ← P(2,3,0) là bóng đổ của B
      √13   (cạnh đáy, đã là cạnh huyền của tam giác Δx-Δy)
\`\`\`

### Walk-through tích vô hướng & góc — 3 ví dụ số

Công thức góc: $\\cos\\theta = \\dfrac{u\\cdot v}{|u|\\,|v|}$. Quy trình 3 bước: (1) tính $u\\cdot v$, (2) tính $|u|, |v|$, (3) chia rồi $\\arccos$.

**Ví dụ 1 — góc nhọn**: $u = (1, 2, 2)$, $v = (2, 1, -1)$.
- $u\\cdot v = 1\\cdot 2 + 2\\cdot 1 + 2\\cdot(-1) = 2 + 2 - 2 = 2$.
- $|u| = \\sqrt{1+4+4} = 3$; $|v| = \\sqrt{4+1+1} = \\sqrt{6}$.
- $\\cos\\theta = \\dfrac{2}{3\\sqrt{6}} \\approx 0.272 \\Rightarrow \\theta \\approx$ **74.2°** (nhọn vì $u\\cdot v > 0$).

**Ví dụ 2 — vuông góc**: $u = (1, 0, 1)$, $v = (1, 0, -1)$.
- $u\\cdot v = 1 + 0 - 1 = 0 \\Rightarrow \\cos\\theta = 0 \\Rightarrow \\theta = $ **90°**. Tích vô hướng bằng 0 → vuông góc, không cần tính độ lớn.

**Ví dụ 3 — góc tù**: $u = (1, 1, 0)$, $v = (-1, 0, 1)$.
- $u\\cdot v = -1 + 0 + 0 = -1$ (âm → góc tù).
- $|u| = \\sqrt{2}$; $|v| = \\sqrt{2}$.
- $\\cos\\theta = \\dfrac{-1}{\\sqrt{2}\\cdot\\sqrt{2}} = \\dfrac{-1}{2} = -0.5 \\Rightarrow \\theta = $ **120°**.

💡 **Dấu của $u\\cdot v$ cho biết loại góc**: dương → nhọn (< 90°), bằng 0 → vuông, âm → tù (> 90°). Đây là cách "đọc nhanh" trước khi cần con số chính xác.

### 1.5 Tích có hướng (cross product) — sinh vector pháp tuyến

💡 **Trực giác**: tích vô hướng (dot) cho ra **một số** (đo "cùng hướng nhiều hay ít"). Tích có hướng (cross) cho ra **một vector mới** $u \\times v$ **vuông góc với cả** $u$ và $v$ cùng lúc — như "ngón cái chỉ lên khi 4 ngón còn lại quét từ $u$ sang $v$" (quy tắc bàn tay phải). Đây chính là cách lấy **vector pháp tuyến (normal)** của mặt phẳng chứa $u, v$ — nền tảng của chiếu sáng trong đồ họa 3D/game.

Công thức (định thức formal):

$$u \\times v = \\begin{bmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{bmatrix}$$

Mẹo nhớ: mỗi thành phần "bỏ qua chỉ số của nó, lấy chéo 2 chỉ số còn lại, theo vòng x→y→z→x".

> 📐 **Định nghĩa đầy đủ — Tích có hướng $u \\times v$**
>
> **(a) Là gì**: phép toán nhận 2 vector 3D, trả về **một vector 3D mới** vuông góc với cả hai. Độ lớn $|u\\times v| = |u|\\,|v|\\sin\\theta$ = **diện tích hình bình hành** căng bởi $u, v$.
>
> **(b) Vì sao cần**: dot product không cho được "hướng vuông góc" — nó trả số. Trong 3D, vô số vector vuông góc với một vector cho trước; nhưng vuông góc với **cả hai** $u, v$ thì (gần như) chỉ còn 1 hướng — chính là pháp tuyến mặt phẳng. Đồ họa cần normal để tính ánh sáng phản chiếu; vật lý cần nó cho moment lực (torque $\\tau = r \\times F$) và lực Lorentz.
>
> **(c) Ví dụ số**: $u = (1,0,0)$ (trục x), $v = (0,1,0)$ (trục y). $u\\times v = (0\\cdot0-0\\cdot1,\\ 0\\cdot0-1\\cdot0,\\ 1\\cdot1-0\\cdot0) = (0,0,1)$ = trục z. Đúng quy tắc tay phải: x quét sang y thì ngón cái chỉ lên z. Diện tích hình bình hành (ở đây là hình vuông đơn vị) $= |(0,0,1)| = 1$ ✓.

**Walk-through 3 ví dụ cross product**:

**Ví dụ 1** (2 trục): $u = (1,0,0)$, $v = (0,1,0)$.
$$u\\times v = (0\\cdot0 - 0\\cdot1,\\ \\ 0\\cdot0 - 1\\cdot0,\\ \\ 1\\cdot1 - 0\\cdot0) = (0, 0, 1).$$
Kiểm vuông góc: $(0,0,1)\\cdot(1,0,0) = 0$ ✓ và $(0,0,1)\\cdot(0,1,0) = 0$ ✓.

**Ví dụ 2** (tổng quát): $u = (1,2,3)$, $v = (4,5,6)$.
$$\\begin{aligned}
(u\\times v)_x &= u_2 v_3 - u_3 v_2 = 2\\cdot6 - 3\\cdot5 = 12 - 15 = -3 \\\\
(u\\times v)_y &= u_3 v_1 - u_1 v_3 = 3\\cdot4 - 1\\cdot6 = 12 - 6 = 6 \\\\
(u\\times v)_z &= u_1 v_2 - u_2 v_1 = 1\\cdot5 - 2\\cdot4 = 5 - 8 = -3
\\end{aligned}$$
→ $u\\times v = (-3, 6, -3)$. Kiểm: $(-3,6,-3)\\cdot(1,2,3) = -3+12-9 = 0$ ✓; $(-3,6,-3)\\cdot(4,5,6) = -12+30-18 = 0$ ✓ (vuông góc cả hai).

**Ví dụ 3** (diện tích tam giác): $A(0,0,0)$, $B(1,0,0)$, $C(0,2,0)$ — tam giác trong mặt phẳng đáy.
- $\\vec{AB} = (1,0,0)$, $\\vec{AC} = (0,2,0)$.
- $\\vec{AB}\\times\\vec{AC} = (0\\cdot0-0\\cdot2,\\ 0\\cdot0-1\\cdot0,\\ 1\\cdot2-0\\cdot0) = (0,0,2)$.
- Diện tích tam giác $= \\frac{1}{2}|\\vec{AB}\\times\\vec{AC}| = \\frac{1}{2}\\cdot 2 = $ **1** (khớp công thức $\\frac12\\cdot\\text{đáy}\\cdot\\text{cao} = \\frac12\\cdot1\\cdot2 = 1$ ✓).

⚠ **Lỗi thường gặp — cross product KHÔNG giao hoán**: $u\\times v = -(v\\times u)$ (đảo dấu, không bằng nhau!). Phản ví dụ: từ Ví dụ 1, $v\\times u = (0,1,0)\\times(1,0,0) = (0,0,-1) = -(u\\times v)$. Khác hẳn dot product (giao hoán: $u\\cdot v = v\\cdot u$). Đảo thứ tự cross → pháp tuyến lật ngược hướng.

⚠ **Lỗi thường gặp — nhầm dot với cross**: dot $u\\cdot v$ → **một số** (vô hướng), dùng tìm góc / kiểm vuông góc. Cross $u\\times v$ → **một vector** (3 thành phần), dùng tìm pháp tuyến / diện tích. Phản ví dụ: với $u=(1,2,3), v=(4,5,6)$: $u\\cdot v = 4+10+18 = 32$ (số), còn $u\\times v = (-3,6,-3)$ (vector) — hai đại lượng hoàn toàn khác loại, đừng lẫn.

🔁 **Dừng lại tự kiểm tra (cross product)**

1. Tính $(0,1,0)\\times(0,0,1)$.
2. Diện tích hình bình hành căng bởi $u=(2,0,0)$ và $v=(0,3,0)$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. $(1\\cdot1-0\\cdot0,\\ 0\\cdot0-0\\cdot1,\\ 0\\cdot0-1\\cdot0) = $ **(1, 0, 0)** (trục x — đúng vòng y×z = x).
2. $u\\times v = (0,0,6) \\to$ diện tích $= |(0,0,6)| = $ **6** (= 2 × 3, đúng hình chữ nhật) .

</details>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khoảng cách 3D vẫn là Pythagoras?"* Áp Pythagoras 2 lần: trước trên mặt phẳng đáy ($\\sqrt{\\Delta x^2+\\Delta y^2}$), rồi với chiều cao $\\Delta z \\to \\sqrt{(\\Delta x^2+\\Delta y^2)+\\Delta z^2} = \\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$.
- *"Tích vô hướng $u\\cdot v = 0$ nghĩa là gì?"* 2 vector **vuông góc** ($\\cos\\theta = 0 \\to \\theta = 90^\\circ$). Đây là cách kiểm vuông góc nhanh nhất trong 3D.
- *"Độ lớn vector và khoảng cách 2 điểm liên hệ sao?"* $|AB|$ = độ lớn vector AB = khoảng cách giữa A và B.

⚠ **Lỗi thường gặp**: quên căn bậc 2 hoặc thiếu 1 thành phần z. Phản ví dụ: A(0,0,0), B(2,3,6) — nếu chỉ tính $\\sqrt{4+9} = \\sqrt{13}$ (quên z) là sai; đúng phải gồm cả $6^2 = 36 \\to \\sqrt{49} = 7$. Lỗi tích vô hướng: nhân chéo thay vì nhân cùng thành phần.

🔁 **Dừng lại tự kiểm tra**

1. A(1,2,3), B(3,5,3). Tính khoảng cách AB.
2. $u = (1,2,2)$, $v = (2,-2,1)$. Tính $u\\cdot v$. Hai vector có vuông góc không?

<details><summary>Đáp án</summary>

1. $d = \\sqrt{2^2+3^2+0^2} = \\sqrt{13} \\approx$ **3.61**.
2. $u\\cdot v = 2 - 4 + 2 = $ **0** → **vuông góc**.

</details>

### 📝 Tóm tắt mục 1

- Hệ Oxyz: mỗi điểm $= (x, y, z)$; 3 trục đôi một vuông góc tại O (quy ước tay phải, Oz "đâm lên/ra").
- **Khoảng cách 3D**: $d = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$ (Pythagoras 2 lần).
- **Tích vô hướng** (ra **số**): $u\\cdot v = u_1 v_1+u_2 v_2+u_3 v_3$; $= 0 \\iff$ vuông góc. Dấu: + nhọn, 0 vuông, − tù.
- Độ lớn $|u| = \\sqrt{u_1^2+u_2^2+u_3^2}$; góc qua $\\cos\\theta = \\frac{u\\cdot v}{|u||v|}$.
- **Tích có hướng** (ra **vector**): $u\\times v \\perp$ cả $u, v$ → pháp tuyến; $|u\\times v| = $ diện tích hình bình hành. KHÔNG giao hoán: $u\\times v = -(v\\times u)$.

---

## 2. Phương trình mặt phẳng

Mặt phẳng có **vector pháp tuyến** $n = (A, B, C)$ đi qua điểm M₀(x₀, y₀, z₀):

$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$

Hoặc dạng tổng quát:

$$Ax + By + Cz + D = 0$$

💡 **Ý nghĩa**: vector pháp tuyến $n \\perp$ với mọi vector nằm trong mặt phẳng.

ASCII — mặt phẳng và pháp tuyến đâm vuông góc:

\`\`\`
            n (pháp tuyến)
            ↑
            |
   ┌────────┼────────────┐
   │        •M₀          │   ← mặt phẳng (tờ giấy nghiêng)
   │     ╱        ╲      │     mọi vector trong mặt
   │   v₁          v₂    │     đều ⊥ n  (n·v₁ = n·v₂ = 0)
   └────────────────────┘
\`\`\`

#### Lập phương trình mặt phẳng qua 3 điểm (dùng cross product)

💡 3 điểm không thẳng hàng xác định **duy nhất 1 mặt phẳng**. Cách lấy pháp tuyến: dựng 2 vector trong mặt rồi **cross** chúng — kết quả vuông góc cả hai, chính là $n$.

**Walk-through**: mặt phẳng qua $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.
- Bước 1 — 2 vector trong mặt: $\\vec{AB} = (-1,1,0)$, $\\vec{AC} = (-1,0,1)$.
- Bước 2 — pháp tuyến $n = \\vec{AB}\\times\\vec{AC}$:
$$n = (1\\cdot1 - 0\\cdot0,\\ \\ 0\\cdot(-1) - (-1)\\cdot1,\\ \\ (-1)\\cdot0 - 1\\cdot(-1)) = (1, 1, 1).$$
- Bước 3 — viết PT qua A(1,0,0) với $n=(1,1,1)$: $1(x-1)+1(y-0)+1(z-0)=0 \\to$ **$x+y+z = 1$**.
- Verify cả 3 điểm: $A: 1+0+0=1$ ✓; $B: 0+1+0=1$ ✓; $C: 0+0+1=1$ ✓.

**≥4 ví dụ phương trình mặt phẳng**:
1. Qua $(0,0,0)$ với $n=(1,2,2)$: $x+2y+2z = 0$ (D = 0 vì đi qua gốc).
2. Qua $(2,1,3)$ với $n=(1,2,1)$: $1(x-2)+2(y-1)+1(z-3)=0 \\to x+2y+z = 7$.
3. Mặt phẳng đáy Oxy: mọi điểm có $z=0$ → PT là $z = 0$, pháp tuyến $(0,0,1)$.
4. Qua 3 điểm $A(1,0,0),B(0,1,0),C(0,0,1)$ (vừa làm): $x+y+z = 1$, pháp $(1,1,1)$.
5. Song song với $2x-y+2z=5$ và qua gốc: cùng pháp $(2,-1,2)$ → $2x-y+2z = 0$.

> 📐 **Định nghĩa đầy đủ — Phương trình mặt phẳng Ax+By+Cz+D=0**
>
> **(a) Là gì**: Tập điểm $(x,y,z)$ trong $\\mathbb{R}^3$ thoả 1 PT tuyến tính 3 biến. Hệ số $(A, B, C)$ **không phải tùy ý** — chúng là vector pháp tuyến **n** vuông góc với mặt phẳng đó.
>
> **(b) Vì sao cần**: Vì mặt phẳng là "1D ít hơn không gian" — cần 1 hạn chế (1 PT) để xác định. Vector pháp tuyến đóng vai trò "hướng" thay cho điểm — biết hướng vuông góc thì biết được mặt phẳng. Trong đồ hoạ 3D, vật lý (mặt cân bằng lực), tối ưu hoá (siêu phẳng phân lớp trong SVM), mặt phẳng là nguyên thuỷ cơ bản. Hằng số D quy định mặt phẳng "dời" khỏi gốc bao xa.
>
> **(c) Ví dụ số**: Mặt phẳng $2x + y + 2z = 6$ có **$n = (2, 1, 2)$** (vector pháp tuyến). Điểm $(1, 2, 1)$ có thuộc không? $2\\cdot 1+2+2\\cdot 1 = 6$ ✓ → có. Điểm $(0,0,0)$: $0 \\neq 6$ → không thuộc. Khoảng cách từ O đến mặt phẳng: $\\frac{|0+0+0-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**. Mặt phẳng song song $x+y+z = 0$ và $x+y+z = 5$: cùng $n = (1,1,1) \\to$ khoảng cách $= \\frac{|0-5|}{\\sqrt{3}} = \\frac{5}{\\sqrt{3}} \\approx 2.89$.

**Khoảng cách từ điểm P(x₀, y₀, z₀) đến mặt Ax + By + Cz + D = 0**:

$$d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector pháp tuyến lấy từ đâu trong PT?"* Trực tiếp từ hệ số: mặt $Ax+By+Cz+D=0$ có $n = (A, B, C)$. Vd $2x+y+2z-6=0 \\to n = (2,1,2)$.
- *"Vì sao khoảng cách có dấu trị tuyệt đối?"* Vì khoảng cách luôn $\\ge 0$; tử số có thể âm (điểm nằm "phía sau" mặt phẳng) nên lấy $|...|$.
- *"2 mặt phẳng song song nhận biết sao?"* Cùng vector pháp tuyến (tỉ lệ): $(A,B,C)$ của mặt này tỉ lệ với mặt kia.

⚠ **Lỗi thường gặp**: quên chuẩn hóa (chia cho $\\sqrt{A^2+B^2+C^2}$) khi tính khoảng cách, hoặc dùng sai dấu D. Phản ví dụ: khoảng cách từ O tới $2x+y+2z-6=0$ $= \\frac{|-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**; nếu quên chia $\\sqrt{9}$ thì ra 6 (sai gấp 3). Lỗi khác: lẫn vector pháp tuyến $(A,B,C)$ với 1 điểm trên mặt.

🔁 **Dừng lại tự kiểm tra**

1. Mặt phẳng $x - 2y + 2z + 3 = 0$. Vector pháp tuyến là gì?
2. Khoảng cách từ O(0,0,0) tới mặt phẳng đó?

<details><summary>Đáp án</summary>

1. $n = $ **(1, −2, 2)**.
2. $d = \\frac{|0-0+0+3|}{\\sqrt{1+4+4}} = \\frac{3}{3} = $ **1**.

</details>

### 📝 Tóm tắt mục 2

- Mặt phẳng: $Ax + By + Cz + D = 0$, vector pháp tuyến **$n = (A, B, C)$**.
- Qua điểm M₀ với pháp $n$: $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$.
- Khoảng cách điểm–mặt: $\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$ (nhớ chuẩn hóa).
- 2 mặt song song ↔ pháp tuyến tỉ lệ.

---

## 3. Phương trình đường thẳng

💡 **Trực giác / Hình dung**: 1 đường thẳng trong không gian = "1 điểm xuất phát + 1 hướng đi". Tham số t giống "thời gian": tại t=0 ở điểm M₀, t tăng thì trượt theo hướng vector chỉ phương u, t âm thì trượt ngược. Như con kiến bò thẳng đều — biết vị trí ban đầu + vận tốc (hướng) là biết toàn bộ đường đi.

Đường thẳng qua M₀(x₀, y₀, z₀) với **vector chỉ phương** $u = (a, b, c)$:

**Tham số**:

$$\\begin{aligned}
x &= x_0 + a\\cdot t \\\\
y &= y_0 + b\\cdot t \\\\
z &= z_0 + c\\cdot t
\\end{aligned}$$

**Chính tắc** (nếu $a, b, c \\neq 0$):

$$\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}$$

**Verify bằng số**: đường qua M₀(1,2,0) với $u = (3,1,4)$. Tham số: $x = 1+3t$, $y = 2+t$, $z = 4t$. Tại $t=0 \\to (1,2,0) = M_0$ ✓. Tại $t=1 \\to (4,3,4)$ (điểm khác trên đường). Kiểm điểm $(4,3,4)$ bằng dạng chính tắc: $\\frac{4-1}{3} = 1$, $\\frac{3-2}{1} = 1$, $\\frac{4-0}{4} = 1 \\to$ cả 3 $= 1 = t$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector chỉ phương có duy nhất không?"* Không — mọi bội số $k\\cdot u$ ($k\\neq 0$) cũng là chỉ phương của cùng đường thẳng (cùng hướng). Vd $(3,1,4)$ và $(6,2,8)$ chỉ cùng 1 đường.
- *"Dạng chính tắc khi a hoặc b = 0 thì sao?"* Không chia cho 0 được; phải viết riêng (vd nếu $a=0$ thì $x = x_0$ cố định, còn 2 phần kia bằng nhau).
- *"Sao 2D không cần z mà 3D cần?"* Vì 3D có thêm chiều cao — đường thẳng phải mô tả cả hướng theo z.

⚠ **Lỗi thường gặp**: lẫn vector chỉ phương ($\\parallel$ đường) với vector pháp tuyến ($\\perp$ mặt). Đường thẳng dùng **chỉ phương**, mặt phẳng dùng **pháp tuyến**. Phản ví dụ: PT mặt $2x+y+2z=6$ có pháp $(2,1,2)$; đường vuông góc mặt này nhận đúng $(2,1,2)$ làm **chỉ phương** (vì $u \\parallel n$ khi đường $\\perp$ mặt).

🔁 **Dừng lại tự kiểm tra**

1. Viết PT tham số đường thẳng qua A(2,0,1) với vector chỉ phương $(1,-1,2)$.
2. Điểm $(4,-2,5)$ có nằm trên đường đó không?

<details><summary>Đáp án</summary>

1. $x = 2+t$, $y = -t$, $z = 1+2t$.
2. Từ x: $4 = 2+t \\to t=2$. Kiểm y: $-2 = -2$ ✓; z: $1+4 = 5$ ✓ → **có nằm trên** ($t=2$).

</details>

### 📝 Tóm tắt mục 3

- Đường thẳng = điểm M₀ + vector chỉ phương $u = (a,b,c)$.
- **Tham số**: $x = x_0+at$, $y = y_0+bt$, $z = z_0+ct$ ($t$ là tham số "thời gian").
- **Chính tắc**: $\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}$ (khi $a,b,c \\neq 0$).
- Vector chỉ phương không duy nhất (mọi bội số đều được); đừng lẫn với pháp tuyến.

---

## 4. Vị trí tương đối

💡 **Trực giác / Hình dung**: trong không gian 3D có 1 khả năng mới mà 2D không có — 2 đường **chéo nhau** (skew): không cắt và cũng không song song, như 1 cây cầu vượt và con đường bên dưới (2 đường ở 2 "tầng" khác nhau, không gặp dù kéo dài, nhưng không cùng hướng). Trong mặt phẳng 2D, 2 đường chỉ có thể cắt hoặc song song.

### 2 đường thẳng

- **Song song**: vector chỉ phương $u_1 \\parallel u_2$, không có điểm chung.
- **Trùng nhau**: $u_1 \\parallel u_2$, có điểm chung.
- **Cắt nhau**: có điểm chung duy nhất.
- **Chéo nhau**: không cùng mặt phẳng (đặc thù 3D, không có ở 2D).

### Đường thẳng và mặt phẳng

- **Vuông góc**: $u \\parallel n$.
- **Song song**: $u \\perp n$ và đường không trên mặt.
- **Cắt**: tại 1 điểm.

### 2 mặt phẳng

- **Song song**: $n_1 \\parallel n_2$.
- **Trùng**: $n_1 \\parallel n_2$, cùng D (so với chuẩn hóa).
- **Cắt**: tạo đường giao tuyến.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường $\\perp$ mặt thì u quan hệ gì với n?"* $u \\parallel n$ (chỉ phương đường song song pháp tuyến mặt) — vì đường vuông góc mặt thì cùng hướng với pháp tuyến.
- *"Đường $\\parallel$ mặt thì u quan hệ gì với n?"* $u \\perp n$ (chỉ phương vuông góc pháp tuyến), tức $u\\cdot n = 0$, và đường không nằm trên mặt.
- *"Làm sao phân biệt chéo nhau với cắt nhau?"* Cùng giải hệ tham số 2 đường: có nghiệm chung → cắt; vô nghiệm và $u_1$ không $\\parallel u_2$ → chéo nhau.

⚠ **Lỗi thường gặp**: cho rằng "2 đường không cắt thì song song" (đúng ở 2D, sai ở 3D). Phản ví dụ: đường $x=t,y=0,z=0$ (trục Ox) và đường $x=0,y=1,z=s$ — không cắt (đường 2 luôn có $y=1\\neq 0$), nhưng chỉ phương $(1,0,0)$ và $(0,0,1)$ không $\\parallel$ → **chéo nhau**, không song song.

🔁 **Dừng lại tự kiểm tra**

1. Đường có chỉ phương $u=(2,1,2)$, mặt phẳng có pháp tuyến $n=(2,1,2)$. Đường và mặt quan hệ gì?
2. 2D có khả năng "chéo nhau" giữa 2 đường không?

<details><summary>Đáp án</summary>

1. $u \\parallel n$ → đường **vuông góc** với mặt phẳng.
2. Không — chéo nhau là đặc thù 3D. Trong mặt phẳng, 2 đường chỉ cắt hoặc song song (hoặc trùng).

</details>

### 📝 Tóm tắt mục 4

- 2 đường thẳng 3D: song song / trùng / cắt / **chéo nhau** (đặc thù 3D).
- Đường $\\perp$ mặt ↔ $u \\parallel n$; đường $\\parallel$ mặt ↔ $u \\perp n$ (và không nằm trên mặt).
- 2 mặt: song song ($n_1 \\parallel n_2$), trùng, hoặc cắt (tạo giao tuyến).
- "Không cắt → song song" chỉ đúng trong 2D, sai trong 3D (có thể chéo nhau).

---

## 5. Mặt cầu

💡 **Trực giác**: mặt cầu = tập **mọi điểm cách tâm I một khoảng không đổi R** (bán kính). Y hệt đường tròn 2D ("cách tâm cùng khoảng cách") nhưng nâng lên 3D — thay vì 1 vòng dẹt thì là cả vỏ quả bóng. PT của nó chính là viết lại công thức **khoảng cách 3D** = R rồi bình phương 2 vế.

Mặt cầu tâm $I(a, b, c)$, bán kính $R$:

$$(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2$$

Dạng khai triển (tổng quát): $x^2+y^2+z^2 - 2ax - 2by - 2cz + d = 0$, với $d = a^2+b^2+c^2 - R^2$.

> 📐 **Định nghĩa đầy đủ — Mặt cầu**
>
> **(a) Là gì**: tập điểm $M(x,y,z)$ thoả $IM = R$, tức $\\sqrt{(x-a)^2+(y-b)^2+(z-c)^2} = R$. Bình phương 2 vế khử căn → PT chuẩn. Nó là **bề mặt** (rỗng bên trong); phần đặc bên trong gọi là **khối cầu (ball)**.
>
> **(b) Vì sao cần**: nhiều bài toán 3D quy về "khoảng cách cố định": vùng phủ sóng (mọi điểm trong R mét), va chạm trong game (2 vật chạm khi khoảng cách tâm $\\le R_1+R_2$), quỹ đạo. Dạng tổng quát hữu ích vì dữ liệu thực thường cho ở dạng đã khai triển, phải "hoàn thành bình phương" để moi ra tâm & bán kính.
>
> **(c) Ví dụ số**: mặt cầu tâm $I(1,2,3)$, $R=5$: $(x-1)^2+(y-2)^2+(z-3)^2 = 25$. Điểm $(1,2,8)$ có thuộc? $0+0+25 = 25$ ✓ (nằm trên cầu, đúng "đỉnh" cao hơn tâm 5 đơn vị). Điểm $(1,2,3)$ (tâm): $0 \\ne 25$ → không thuộc (tâm không nằm trên bề mặt).

**≥4 ví dụ mặt cầu (lập PT / tìm tâm–bán kính)**:
1. Tâm $O(0,0,0)$, $R=3$: $x^2+y^2+z^2 = 9$.
2. Tâm $I(1,2,3)$, $R=5$: $(x-1)^2+(y-2)^2+(z-3)^2 = 25$.
3. Đường kính AB với $A(0,0,0), B(2,4,4)$: tâm = trung điểm $= (1,2,2)$; $R = \\frac12|AB| = \\frac12\\sqrt{4+16+16} = \\frac12\\cdot6 = 3$ → $(x-1)^2+(y-2)^2+(z-2)^2 = 9$.
4. Tìm tâm–bán kính từ dạng tổng quát $x^2+y^2+z^2 - 2x - 4y - 6z + 5 = 0$: so khớp $2a=2,2b=4,2c=6 \\to I(1,2,3)$; $R = \\sqrt{a^2+b^2+c^2 - d} = \\sqrt{1+4+9-5} = \\sqrt{9} = $ **3**.

#### Vị trí mặt phẳng & mặt cầu

So sánh $d$ (khoảng cách từ tâm I tới mặt phẳng) với $R$:
- $d > R$: mặt phẳng **không cắt** mặt cầu.
- $d = R$: **tiếp xúc** (tiếp diện) tại đúng 1 điểm.
- $d < R$: **cắt** theo một **đường tròn** bán kính $r = \\sqrt{R^2 - d^2}$.

**Walk-through**: cầu tâm $O(0,0,0)$, $R=5$; mặt phẳng $z = 3$. Khoảng cách từ O tới mặt: $d = 3 < 5$ → cắt. Đường tròn giao có $r = \\sqrt{25-9} = \\sqrt{16} = $ **4** (nằm trên mặt $z=3$). Kiểm: điểm $(4,0,3)$ thuộc cầu? $16+0+9 = 25$ ✓.

⚠ **Lỗi thường gặp — quên bình phương R, hoặc sai dấu khi moi tâm**: trong dạng tổng quát hệ số là $-2a$, nên tâm $a = -\\frac{\\text{hệ số } x}{2}$. Phản ví dụ: $x^2+y^2+z^2 - 2x = 0$ có $-2a = -2 \\to a = 1$ (KHÔNG phải $-1$), tâm $(1,0,0)$, $R = \\sqrt{1-0} = 1$. Lỗi khác: viết vế phải là $R$ thay vì $R^2$ — với $R=5$ phải là 25, không phải 5.

🔁 **Dừng lại tự kiểm tra (mặt cầu)**

1. Lập PT mặt cầu tâm $I(2,-1,0)$, bán kính $R=4$.
2. Cho $x^2+y^2+z^2 - 4x + 2y - 4 = 0$. Tìm tâm và bán kính.

<details><summary>Đáp án</summary>

1. $(x-2)^2+(y+1)^2+z^2 = 16$.
2. $-2a=-4\\to a=2$; $-2b=2\\to b=-1$; $c=0$; $d=-4$. Tâm $(2,-1,0)$; $R=\\sqrt{a^2+b^2+c^2-d}=\\sqrt{4+1+0+4}=\\sqrt{9}=$ **3**.

</details>

### 📝 Tóm tắt mục 5

- Mặt cầu = tập điểm cách tâm I khoảng R: $(x-a)^2+(y-b)^2+(z-c)^2 = R^2$ (viết lại khoảng cách 3D).
- Dạng tổng quát $x^2+y^2+z^2-2ax-2by-2cz+d=0$ → tâm $(a,b,c)$, $R=\\sqrt{a^2+b^2+c^2-d}$ (chú ý dấu & bình phương R).
- Mặt phẳng vs cầu: so $d$ với $R$ → không cắt / tiếp xúc / cắt (đường tròn $r=\\sqrt{R^2-d^2}$).

---

## 6. Liên hệ đồ họa 3D & game

💡 Mọi khái niệm bài này là **xương sống của render 3D và vật lý game** — không phải lý thuyết suông:

- **Pháp tuyến (cross product) → chiếu sáng**: mỗi tam giác (mesh) của vật thể có pháp tuyến $n = \\vec{AB}\\times\\vec{AC}$. Độ sáng bề mặt $= \\max(0,\\ \\hat{n}\\cdot\\hat{L})$ với $\\hat{L}$ là hướng tới nguồn sáng (mô hình Lambert) — chính là **tích vô hướng** đã học. Mặt quay thẳng về đèn ($n \\parallel L$, dot lớn) → sáng; quay nghiêng (dot nhỏ) → tối.

  **Ví dụ số**: tam giác có $n=(0,0,1)$ (mặt ngửa lên), đèn từ trên $\\hat L=(0,0,1)$: độ sáng $= (0,0,1)\\cdot(0,0,1) = 1$ (sáng tối đa). Đèn xiên $\\hat L = (0, 0.6, 0.8)$: độ sáng $= 0.8$ (mờ hơn).

- **Mặt phẳng $ax+by+cz=d$ → mặt va chạm (collision plane)**: sàn, tường trong game là mặt phẳng. Nhân vật cao độ $z$ "rơi" tới khi khoảng cách tới sàn = 0.
- **Mặt cầu → bounding sphere**: kiểm va chạm nhanh bằng cách bọc vật thể trong 1 mặt cầu; 2 vật chạm nhau khi khoảng cách 2 tâm $\\le R_1 + R_2$ (chỉ 1 phép khoảng cách 3D — rẻ hơn nhiều so với kiểm từng tam giác).
- **Đường thẳng tham số $M_0 + t\\,u$ → ray (tia)**: ray tracing và "bắn tia chuột" (picking) đều bắn 1 tia từ camera, tìm $t$ nhỏ nhất cắt vật thể.

📝 Tóm lại: dot → góc/độ sáng; cross → pháp tuyến/diện tích; mặt cầu → va chạm; đường tham số → tia. Học chắc bài này là có nền cho đồ họa 3D.

---

## 7. Bài tập

### Bài tập

**Bài 1**: A(1, 2, 3), B(4, 6, 8). Tính khoảng cách.

**Bài 2**: Viết PT mặt phẳng qua A(2, 1, 3) với vector pháp tuyến $n = (1, 2, 1)$.

**Bài 3**: Tính khoảng cách từ O(0,0,0) đến mặt phẳng $2x + y + 2z - 6 = 0$.

**Bài 4**: Cho $u = (1, 2, 2)$ và $v = (2, 1, -1)$. Tính $u\\cdot v$ và góc.

**Bài 5**: Viết PT tham số đường thẳng qua A(1, 2, 0) với vector chỉ phương $(3, 1, 4)$.

**Bài 6**: Cho $u = (1, 2, 3)$, $v = (4, 5, 6)$. Tính $u \\times v$ và kiểm $u\\times v \\perp u$.

**Bài 7**: Lập PT mặt phẳng qua 3 điểm $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$.

**Bài 8**: Tìm tâm và bán kính của mặt cầu $x^2+y^2+z^2 - 2x - 4y - 6z + 5 = 0$.

**Bài 9**: Tính diện tích tam giác $A(0,0,0)$, $B(2,0,0)$, $C(0,3,0)$ bằng cross product.

### Lời giải

**Bài 1**: $d = \\sqrt{9 + 16 + 25} = \\sqrt{50} = $ **5√2 ≈ 7.07**.

**Bài 2**: $1(x-2) + 2(y-1) + 1(z-3) = 0 \\to$ **x + 2y + z − 7 = 0**.

**Bài 3**: $d = \\frac{|0 + 0 + 0 - 6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**.

**Bài 4**: $u\\cdot v = 2 + 2 - 2 = 2$. $|u| = \\sqrt{9} = 3$. $|v| = \\sqrt{6}$. $\\cos\\theta = \\frac{2}{3\\sqrt{6}} \\approx 0.272 \\to \\theta \\approx$ **74.2°**.

**Bài 5**: $x = 1 + 3t$, $y = 2 + t$, $z = 4t$.

**Bài 6**: $u\\times v = (2\\cdot6-3\\cdot5,\\ 3\\cdot4-1\\cdot6,\\ 1\\cdot5-2\\cdot4) = (12-15,\\ 12-6,\\ 5-8) = $ **(−3, 6, −3)**. Kiểm: $(-3,6,-3)\\cdot(1,2,3) = -3+12-9 = 0$ ✓ → vuông góc với $u$.

**Bài 7**: $\\vec{AB} = (-1,2,0)$, $\\vec{AC} = (-1,0,3)$. Pháp tuyến $n = \\vec{AB}\\times\\vec{AC} = (2\\cdot3-0\\cdot0,\\ 0\\cdot(-1)-(-1)\\cdot3,\\ (-1)\\cdot0-2\\cdot(-1)) = (6, 3, 2)$. PT qua $A(1,0,0)$: $6(x-1)+3y+2z = 0 \\to$ **$6x + 3y + 2z = 6$**. Verify: $B(0,2,0): 0+6+0=6$ ✓; $C(0,0,3): 0+0+6=6$ ✓.

**Bài 8**: $-2a=-2\\to a=1$; $-2b=-4\\to b=2$; $-2c=-6\\to c=3$; $d=5$. Tâm **$I(1,2,3)$**; $R=\\sqrt{a^2+b^2+c^2-d}=\\sqrt{1+4+9-5}=\\sqrt{9}=$ **3**.

**Bài 9**: $\\vec{AB}=(2,0,0)$, $\\vec{AC}=(0,3,0)$. $\\vec{AB}\\times\\vec{AC} = (0\\cdot0-0\\cdot3,\\ 0\\cdot0-2\\cdot0,\\ 2\\cdot3-0\\cdot0) = (0,0,6)$. Diện tích $= \\frac12|(0,0,6)| = \\frac12\\cdot6 = $ **3** (khớp $\\frac12\\cdot2\\cdot3 = 3$ ✓).

---

## 8. Bài tiếp theo

[Lesson 08 — Biến hình & Vector](../lesson-08-transformations-vector-geo/).

## 📝 Tổng kết

1. **Oxyz**: mỗi điểm $= (x, y, z)$ (tay phải). $d = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$.
2. **Dot vs cross**: $u\\cdot v$ → số (góc, độ sáng); $u\\times v$ → vector ⊥ cả hai (pháp tuyến, diện tích), KHÔNG giao hoán.
3. **Mặt phẳng**: $Ax + By + Cz + D = 0$. Vector pháp $n = (A,B,C)$; lập từ 3 điểm bằng $n = \\vec{AB}\\times\\vec{AC}$.
4. **Đường thẳng**: tham số $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$.
5. **Khoảng cách điểm-mặt**: $\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$.
6. **Mặt cầu**: $(x-a)^2+(y-b)^2+(z-c)^2 = R^2$; dạng tổng quát → tâm $(a,b,c)$, $R=\\sqrt{a^2+b^2+c^2-d}$.
7. **Đặc thù 3D**: 2 đường có thể **chéo nhau** (không có ở 2D).
8. **Ứng dụng**: dot → độ sáng (Lambert), cross → pháp tuyến mesh, mặt cầu → bounding sphere, đường tham số → ray tracing.
`;
