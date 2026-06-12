// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-08-transformations-vector-geo/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Biến hình & Vector hình học

## Mục tiêu

- Hiểu **4 phép biến hình cơ bản** trong mặt phẳng: tịnh tiến, đối xứng (trục, tâm), quay, vị tự.
- Biểu diễn mỗi phép biến hình bằng **công thức tọa độ** và **ma trận** (cầu nối với Đại số tuyến tính ở Tier 6).
- **Áp ma trận biến đổi lên điểm cụ thể** (nhân ma trận × vector) và **ghép nhiều phép biến đổi bằng cách nhân ma trận** — hiểu vì sao thứ tự quan trọng (không giao hoán).
- Hiểu **vector hình học**: cộng/trừ, nhân vô hướng, ứng dụng (chứng minh hình học bằng vector).
- Phân biệt **phép dời hình** (giữ khoảng cách) và **phép đồng dạng** (giữ tỉ lệ); nắm **bất biến** của từng phép (khoảng cách, góc, diện tích, hướng).

## Kiến thức tiền đề

- [Lesson 06 — Tọa độ Oxy](../lesson-06-coordinate-plane-conics/), [Lesson 07 — Tọa độ Oxyz](../lesson-07-coordinate-3d/).

---

## 1. Phép biến hình là gì?

💡 **Trực giác**: Phép biến hình là một **quy tắc** biến mỗi điểm M trong mặt phẳng thành điểm M' khác (hoặc giữ nguyên). Hình ảnh: cầm 1 tờ giấy có hình tam giác, di chuyển/lật/xoay/phóng to → hình mới.

**Định nghĩa hình thức**: Phép biến hình **f** là một ánh xạ 1-1 từ mặt phẳng vào chính nó: với mỗi M có duy nhất $M' = f(M)$.

**Phân loại theo tính chất**:
- **Phép dời hình** (isometry): giữ khoảng cách. $AB = A'B'$. Bao gồm: tịnh tiến, đối xứng, quay.
- **Phép đồng dạng** (similarity): giữ tỉ lệ khoảng cách. $A'B'/AB = k$ (hằng). Bao gồm dời hình + vị tự.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phép biến hình khác hàm số chỗ nào?"* Bản chất là 1 hàm số, nhưng "đầu vào" và "đầu ra" đều là **điểm** trong mặt phẳng (không phải số). f: điểm → điểm.
- *"Dời hình có phải luôn là đồng dạng không?"* Có — dời hình là đồng dạng với tỉ số $k = 1$ (giữ nguyên kích thước). Mọi dời hình đều đồng dạng, nhưng không ngược lại (vị tự đồng dạng mà không dời hình).
- *"Vì sao gọi là ánh xạ 1-1?"* Vì mỗi điểm M cho đúng 1 ảnh M', và mỗi M' đến từ đúng 1 M — không có 2 điểm cùng ảnh, không có điểm bị "bỏ sót".

⚠ **Lỗi thường gặp**: nghĩ "mọi phép biến hình đều giữ kích thước". Sai — **vị tự** ($k\\neq\\pm 1$) phóng to/thu nhỏ, không giữ khoảng cách. Phản ví dụ: vị tự $k=3$ biến đoạn dài 2 thành đoạn dài 6 ($A'B' = 3\\cdot AB$).

🔁 **Dừng lại tự kiểm tra**

1. Phép nào trong số: tịnh tiến, quay, vị tự (k=2) — KHÔNG phải phép dời hình?
2. Phép dời hình có giữ diện tích hình không?

<details><summary>Đáp án</summary>

1. Vị tự k=2 (đổi kích thước → $A'B' = 2\\cdot AB \\neq AB$). Tịnh tiến và quay giữ khoảng cách.
2. Có — dời hình giữ khoảng cách nên giữ cả góc và diện tích.

</details>

### 📝 Tóm tắt mục 1

- Phép biến hình = ánh xạ 1-1 từ mặt phẳng vào chính nó (điểm → điểm).
- **Dời hình**: giữ khoảng cách (tịnh tiến, đối xứng, quay).
- **Đồng dạng**: giữ tỉ lệ (dời hình + vị tự).
- Dời hình $\\subset$ đồng dạng (dời hình = đồng dạng với $k=1$).

---

## 2. Tịnh tiến (Translation)

💡 **Hình dung**: Đẩy mọi điểm theo cùng 1 hướng, cùng 1 khoảng cách. Như đẩy 1 tờ giấy trượt trên bàn.

**Công thức**: Cho vector tịnh tiến **v** $= (a, b)$. Phép tịnh tiến $T_v$ biến $M(x, y) \\to M'(x+a, y+b)$.

$$M(x, y) \\xrightarrow{\\ T_v\\ } M'(x+a, y+b)$$

**Ví dụ số**: $v = (3, -2)$. $M(1, 5) \\to M'(4, 3)$.

**ASCII before/after — tịnh tiến tam giác bởi $v = (3, -1)$** (mỗi \`·\` = 1 ô lưới, \`o\` = đỉnh gốc, \`*\` = đỉnh ảnh):

Tam giác gốc $A(0,0), B(2,0), C(0,2)$ → ảnh $A'(3,-1), B'(5,-1), C'(3,1)$. Cả hình "trượt" sang phải 3, xuống 1, **không xoay, không đổi kích thước**:

\`\`\`
 y
 3 ·  ·  ·  ·  ·  ·
 2 o(C) ·  ·  ·  ·             C gốc
 1 ·  ·  ·  *(C')·  ·          C' = C + (3,-1)
 0 o──o(B)·  ·  ·  ·   x       AB gốc
-1 ·  ·  *(A')──*(B')          A'B' = ảnh (trượt nguyên khối)
   0  1  2  3  4  5
\`\`\`

Quan sát: vector $\\vec{AA'} = \\vec{BB'} = \\vec{CC'} = (3,-1)$ — **mọi điểm dịch cùng 1 vector**. Đó chính là định nghĩa tịnh tiến.

**Ma trận** (dạng affine 3×3, dùng tọa độ thuần nhất):

$$\\begin{pmatrix} x' \\\\ y' \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & a \\\\ 0 & 1 & b \\\\ 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ 1 \\end{pmatrix}$$

**Tính chất**: Bảo toàn khoảng cách, góc, diện tích. Hai đường thẳng song song vẫn song song.

**6 ví dụ số đa dạng** ($v = (3, -2)$):
- $M(0,0) \\to (3,-2)$.
- $M(1,5) \\to (4,3)$.
- $M(-2,4) \\to (1,2)$.
- $M(-3,2) \\to (0,0)$ (về gốc — vì $M = -v$).
- $M(2.5, -1) \\to (5.5, -3)$ (tọa độ phân số vẫn cộng từng thành phần).
- $M(-5, -5) \\to (-2, -7)$ (cả hai âm — vẫn $+a, +b$).

**Walk-through ghép 2 tịnh tiến** (composition = cộng vector). Cho $T_u$ với $u = (3, -2)$ rồi tiếp $T_w$ với $w = (-1, 5)$, áp lên $M(2, 2)$:

$$\\begin{aligned}
M(2,2) \\xrightarrow{\\ T_u\\ } & (2+3,\\ 2-2) = (5, 0) \\\\
(5,0) \\xrightarrow{\\ T_w\\ } & (5-1,\\ 0+5) = (4, 5)
\\end{aligned}$$

Kiểm tra bằng vector tổng: $u + w = (3-1,\\ -2+5) = (2, 3)$, nên $T_w \\circ T_u = T_{(2,3)}$. Áp thẳng: $M(2,2) \\to (2+2,\\ 2+3) = (4, 5)$ ✓ — khớp với làm 2 bước.

⚠ Tịnh tiến **giao hoán**: $T_u \\circ T_w = T_w \\circ T_u$ vì cộng vector giao hoán. Đây là ngoại lệ hiếm — quay quanh tâm khác nhau hay quay+đối xứng thì KHÔNG giao hoán (xem Mục 7).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tịnh tiến có làm hình xoay hay phóng to không?"* Không — chỉ "trượt" cả hình theo 1 hướng, giữ nguyên kích thước, hướng, hình dạng.
- *"Tịnh tiến rồi tịnh tiến nữa thì sao?"* Bằng 1 tịnh tiến duy nhất với vector = tổng 2 vector. $T_u$ rồi $T_v = T_{u+v}$.
- *"Vì sao ma trận tịnh tiến phải 3×3 (affine)?"* Vì cộng hằng số (a, b) không biểu diễn được bằng nhân ma trận 2×2; phải dùng "tọa độ thuần nhất" thêm 1 chiều.

⚠ **Lỗi thường gặp**: trừ thay vì cộng vector. $T_v$ biến $(x,y) \\to (x+a, y+b)$, **cộng** từng thành phần. Phản ví dụ: $v=(3,-2)$, $M(1,5) \\to (1+3, 5+(-2)) = (4,3)$, không phải $(1-3, 5+2) = (-2,7)$.

🔁 **Dừng lại tự kiểm tra**

1. Tịnh tiến v = (−4, 6) biến M(5, 1) thành điểm nào?
2. Tịnh tiến nào biến gốc O(0,0) về điểm (7, −3)?

<details><summary>Đáp án</summary>

1. $(5-4, 1+6) = $ **(1, 7)**.
2. $v = $ **(7, −3)** (vì $O + v = (7,-3)$).

</details>

### 📝 Tóm tắt mục 2

- Tịnh tiến $T_v$: $M(x,y) \\to M'(x+a, y+b)$ với $v = (a,b)$.
- Là phép dời hình: giữ khoảng cách, góc, diện tích, tính song song.
- Ghép 2 tịnh tiến = 1 tịnh tiến với vector tổng.
- Ma trận affine 3×3 (tọa độ thuần nhất) vì cộng hằng số.

---

## 3. Đối xứng (Reflection)

💡 **Hình dung**: đối xứng = "soi gương". Trục đối xứng là mặt gương; ảnh M' là ảnh phản chiếu của M, cách gương đúng bằng M nhưng ở phía bên kia. Lật 1 tờ giấy qua 1 đường gấp cũng là đối xứng. Đặc điểm: đối xứng **lật hướng** (chữ "b" thành "d") — khác với quay (giữ hướng).

### 3.1. Đối xứng qua trục Ox / Oy

- Qua Ox: $M(x, y) \\to M'(x, -y)$. (Lật trên-dưới)
- Qua Oy: $M(x, y) \\to M'(-x, y)$. (Lật trái-phải)

**Ma trận**:

$$\\text{Ox: } \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\qquad \\text{Oy: } \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$

### 3.2. Đối xứng qua điểm O (đối xứng tâm)

$M(x, y) \\to M'(-x, -y)$. Tương đương quay $180^\\circ$ quanh O.

### 3.3. Đối xứng qua đường thẳng y = x

$M(x, y) \\to M'(y, x)$. Đổi chỗ tọa độ.

💡 **Vì sao đặc biệt?** Đây là phép biến hình "đảo ngược" hàm số: nếu $y = f(x)$ thì hàm ngược có đồ thị đối xứng qua $y = x$.

### 3.4. ASCII before/after — đối xứng qua Ox

Tam giác $A(1,1), B(4,1), C(1,3)$ "lật trên-dưới" qua trục Ox → ảnh $A'(1,-1), B'(4,-1), C'(1,-3)$. Để ý chữ "tam giác" bị **lật hướng** (đỉnh nhọn C đang chỉ lên → ảnh C' chỉ xuống):

\`\`\`
 y
 3 o(C)·  ·  ·             C gốc (chỉ lên)
 2 ·  ·  ·  ·
 1 o(A)──────o(B)          cạnh đáy AB nằm trên y=1
 0 ═══════════════ Ox  ← trục gương (mặt phẳng phản chiếu)
-1 *(A')──────*(B')        ảnh: mỗi điểm cách Ox đúng bằng gốc
-2 ·  ·  ·  ·
-3 *(C')·  ·  ·             C' gốc (chỉ xuống — đã lật)
   1  2  3  4
\`\`\`

Mỗi điểm và ảnh **cách trục Ox đúng bằng nhau** nhưng ngược phía: $C(1,3)$ cách Ox 3 ô phía trên, $C'(1,-3)$ cách Ox 3 ô phía dưới.

### 3.5. Walk-through áp ma trận đối xứng lên điểm

Đối xứng qua Ox là ma trận $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$. Áp lên $M(3, 5)$ theo quy tắc hàng × cột:

$$\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 1\\cdot 3 + 0\\cdot 5 \\\\ 0\\cdot 3 + (-1)\\cdot 5 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ -5 \\end{bmatrix}$$

→ $(3, -5)$ ✓ (giữ x, đổi dấu y). Đối xứng qua Oy, áp $\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$ lên $(3, 5)$:

$$\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} -1\\cdot 3 + 0\\cdot 5 \\\\ 0\\cdot 3 + 1\\cdot 5 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 5 \\end{bmatrix} \\to (-3, 5)$$ ✓

**6 ví dụ số đa dạng** (điểm M(3, 5)):
- Qua Ox: $(3, -5)$ (đổi dấu y).
- Qua Oy: $(-3, 5)$ (đổi dấu x).
- Qua O (tâm): $(-3, -5)$ (đổi dấu cả hai).
- Qua y = x: $(5, 3)$ (đổi chỗ).
- Điểm âm $N(-2, 4)$ qua Ox: $(-2, -4)$; qua y = x: $(4, -2)$.
- Điểm trên trục $P(0, 6)$ qua Oy: $(0, 6)$ (điểm trên trục gương Oy là **bất động** — đổi dấu $x=0$ vẫn là 0).

**Walk-through tính tự nghịch đảo (làm 2 lần = identity).** Đối xứng qua Ox 2 lần liên tiếp, áp lên $M(3,5)$:

$$\\begin{aligned}
M(3,5) \\xrightarrow{\\ \\text{Ox}\\ } & (3, -5) \\\\
(3,-5) \\xrightarrow{\\ \\text{Ox}\\ } & (3, 5)
\\end{aligned}$$

Về đúng điểm gốc. Bằng ma trận: $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}^2 = \\begin{bmatrix} 1\\cdot 1 + 0\\cdot 0 & 0 \\\\ 0 & (-1)(-1) \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I$ — bình phương ma trận đối xứng = ma trận đơn vị $I$. Đó là lý do đối xứng "tự nghịch đảo".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đối xứng tâm O khác đối xứng trục thế nào?"* Đối xứng tâm = quay $180^\\circ$ quanh O (đổi dấu cả x và y); đối xứng trục = lật qua 1 đường (đổi dấu 1 tọa độ với Ox/Oy).
- *"Đối xứng 2 lần qua cùng 1 trục thì sao?"* Về lại điểm gốc (đối xứng là phép "tự nghịch đảo": làm 2 lần = identity).
- *"Vì sao qua y=x lại đổi chỗ tọa độ?"* Vì đường $y=x$ đối xứng vai trò của x và y; soi gương qua nó hoán đổi 2 trục.

⚠ **Lỗi thường gặp**: lẫn đối xứng qua Ox với qua Oy. Qua **Ox** (trục ngang) giữ x, đổi dấu **y**; qua **Oy** (trục dọc) giữ y, đổi dấu **x**. Phản ví dụ: $M(3,5)$ qua Ox $= (3,-5)$, KHÔNG phải $(-3,5)$.

🔁 **Dừng lại tự kiểm tra**

1. M(−2, 7). Tìm ảnh qua Oy và qua tâm O.
2. M(4, 1) đối xứng qua y = x thành điểm nào?

<details><summary>Đáp án</summary>

1. Qua Oy: $(2, 7)$ (đổi dấu x). Qua O: $(2, -7)$ (đổi dấu cả hai).
2. $(1, 4)$ (đổi chỗ tọa độ).

</details>

### 📝 Tóm tắt mục 3

- Đối xứng = "soi gương", **lật hướng** hình.
- Qua Ox: $(x,-y)$; qua Oy: $(-x,y)$; qua O: $(-x,-y)$; qua y=x: $(y,x)$.
- Đối xứng tâm O = quay $180^\\circ$.
- Đối xứng làm 2 lần qua cùng trục = về điểm gốc.

---

## 4. Phép quay (Rotation)

💡 **Hình dung**: Xoay mặt phẳng quanh 1 điểm cố định 1 góc $\\alpha$.

**Công thức** (quay quanh gốc O, góc $\\alpha$ ngược chiều kim đồng hồ):

$$\\begin{aligned}
x' &= x\\cos\\alpha - y\\sin\\alpha \\\\
y' &= x\\sin\\alpha + y\\cos\\alpha
\\end{aligned}$$

**Ma trận quay**:

$$R(\\alpha) = \\begin{pmatrix} \\cos\\alpha & -\\sin\\alpha \\\\ \\sin\\alpha & \\cos\\alpha \\end{pmatrix}$$

> 📐 **Định nghĩa đầy đủ — Phép quay quanh O góc α**
>
> **(a) Là gì**: 1 ánh xạ biến mỗi điểm $(x, y)$ thành $(x', y') = R(\\alpha)\\cdot(x, y)$, với $R(\\alpha)$ là ma trận chứa cos/sin của $\\alpha$. **Đặc trưng**: bảo toàn khoảng cách (mọi điểm về O cùng khoảng) và bảo toàn hướng (không lật).
>
> **(b) Vì sao cần**: Vì quay là 1 trong những phép biến hình cơ bản — xuất hiện ở mọi nơi từ đồ hoạ máy tính (xoay nhân vật, camera), robotics (xoay khớp), thiên văn (Trái Đất xoay), đến cơ học (vận tốc góc). Biểu diễn bằng ma trận cho phép ghép nhiều phép quay = nhân ma trận (kết hợp = ghép biến đổi), điều khó làm bằng công thức rời rạc. Cốt lõi cho hệ toạ độ chuyển động.
>
> **(c) Ví dụ số**: Quay $(1, 0)$ góc $90^\\circ$: $x' = 1\\cdot 0-0\\cdot 1 = 0$, $y' = 1\\cdot 1+0\\cdot 0 = 1 \\to$ **(0, 1)** ✓. Quay $(1, 0)$ góc $60^\\circ$: $x' = 0.5$, $y' = \\frac{\\sqrt{3}}{2} \\approx 0.866 \\to (0.5, 0.866)$. Quay $(3, 4)$ góc $90^\\circ$: $x' = 0-4 = -4$, $y' = 3+0 = 3 \\to$ **(-4, 3)** (mô-đun bảo toàn: $|3+4i|=5$, $|-4+3i|=5$). Quay $180^\\circ$: $R = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ (giống đối xứng O). Quay 2 lần $30^\\circ$ = quay $60^\\circ$ (ghép = cộng góc).

**Ví dụ số**: Quay M(1, 0) góc 90°. $\\cos 90^\\circ = 0$, $\\sin 90^\\circ = 1$.
- $x' = 1\\cdot 0 - 0\\cdot 1 = 0$
- $y' = 1\\cdot 1 + 0\\cdot 0 = 1$
- $M'(0, 1)$ ✓ (đúng — điểm $(1,0)$ quay $90^\\circ$ thành $(0,1)$)

**Quay 180°**: $\\cos 180^\\circ = -1$, $\\sin 180^\\circ = 0 \\to R = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\to$ giống đối xứng tâm O.

### 4.1. ASCII before/after — quay 90° quanh O

Quay 90° ngược chiều kim đồng hồ biến trục Ox dương → trục Oy dương ("Đông → Bắc"). Tam giác $A(1,0), B(3,0), C(1,2)$ → ảnh $A'(0,1), B'(0,3), C'(-2,1)$:

\`\`\`
          y
 3 ·  *(B')·  ·  ·  ·       B(3,0) → B'(0,3): trục Ox→Oy
 2 ·  ·  ·  ·  o(C)·         C gốc
 1 *(C')──*(A')·  ·  ·       A(1,0) → A'(0,1)
 0 ──────o(A)──o(B)──  x     AB gốc nằm trên trục Ox
   -2 -1  0  1  2  3
\`\`\`

Mỗi điểm "lượn 1/4 vòng quanh O ngược kim đồng hồ", khoảng cách tới O giữ nguyên: $|OB| = 3 = |OB'|$, $|OC| = \\sqrt{1+4} = \\sqrt 5 = |OC'|$.

### 4.2. Walk-through áp ma trận quay lên điểm (≥3 ví dụ)

Áp $R(\\alpha)$ theo quy tắc hàng × cột: $\\begin{bmatrix} \\cos\\alpha & -\\sin\\alpha \\\\ \\sin\\alpha & \\cos\\alpha \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} x\\cos\\alpha - y\\sin\\alpha \\\\ x\\sin\\alpha + y\\cos\\alpha \\end{bmatrix}$.

**Ví dụ 4.2a — quay $(3,4)$ góc $90°$** ($\\cos = 0, \\sin = 1$):

$$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 0\\cdot 3 + (-1)\\cdot 4 \\\\ 1\\cdot 3 + 0\\cdot 4 \\end{bmatrix} = \\begin{bmatrix} -4 \\\\ 3 \\end{bmatrix} \\to (-4, 3)$$

Kiểm tra độ dài: $|(3,4)| = 5$, $|(-4,3)| = \\sqrt{16+9} = 5$ ✓.

**Ví dụ 4.2b — quay $(2,2)$ góc $45°$** ($\\cos 45° = \\sin 45° = \\tfrac{\\sqrt 2}{2} \\approx 0.7071$):

$$\\begin{bmatrix} 0.7071 & -0.7071 \\\\ 0.7071 & 0.7071 \\end{bmatrix}\\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 0.7071\\cdot 2 - 0.7071\\cdot 2 \\\\ 0.7071\\cdot 2 + 0.7071\\cdot 2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 2.828 \\end{bmatrix}$$

→ $(0, 2.828)$. Đúng trực giác: $(2,2)$ lệch trục Ox $45°$, quay thêm $45°$ thành $90°$ → nằm thẳng trên trục Oy, độ dài $\\sqrt{2^2+2^2} = 2\\sqrt 2 \\approx 2.828$ giữ nguyên ✓.

**Ví dụ 4.2c — quay $(1,0)$ góc $30°$** ($\\cos 30° \\approx 0.866, \\sin 30° = 0.5$):

$$\\begin{bmatrix} 0.866 & -0.5 \\\\ 0.5 & 0.866 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0.866 \\\\ 0.5 \\end{bmatrix} \\to (0.866, 0.5)$$

= $(\\cos 30°, \\sin 30°)$ — điểm đầu trục Ox quay $\\alpha$ thì luôn rơi vào $(\\cos\\alpha, \\sin\\alpha)$ trên đường tròn đơn vị.

**Ví dụ 4.2d — quay $(0,5)$ góc $90°$**: $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 0 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} -5 \\\\ 0 \\end{bmatrix} \\to (-5, 0)$ (trục Oy dương → trục Ox âm).

### 4.3. Walk-through quay quanh tâm I khác gốc O

⚠ **Quay quanh điểm I khác O**: Phải tịnh tiến về O trước. $M \\to M - I \\to$ quay $\\to$ kết quả $+ I$. Quay $M(4, 2)$ góc $90°$ quanh **tâm $I(1, 1)$**, từng bước:

$$\\begin{aligned}
\\text{(1) dời về O: } & M - I = (4-1,\\ 2-1) = (3, 1) \\\\
\\text{(2) quay 90°: } & \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 3 \\end{bmatrix} \\\\
\\text{(3) dời lại: } & (-1, 3) + I = (-1+1,\\ 3+1) = (0, 4)
\\end{aligned}$$

→ $M'(0, 4)$. Nếu **quên dời tâm** và quay thẳng quanh O: $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 2 \\end{bmatrix} = (-2, 4)$ — **sai**, vì tâm quay thực là $I$ chứ không phải O.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Quay góc dương là chiều nào?"* Quy ước: góc dương = **ngược chiều kim đồng hồ**. Góc âm = cùng chiều kim đồng hồ.
- *"Quay 90° rồi 90° nữa có bằng quay 180°?"* Có — ghép 2 phép quay = cộng góc ($R(\\alpha)\\cdot R(\\beta) = R(\\alpha+\\beta)$). Đây là sức mạnh của biểu diễn ma trận.
- *"Quay có giữ kích thước không?"* Có — quay là phép dời hình, mọi điểm giữ nguyên khoảng cách tới tâm quay ($|3+4i| = 5$ trước và sau khi quay).

🔁 **Dừng lại tự kiểm tra**

1. Quay điểm (0, 1) góc 90° quanh O thành điểm nào?
2. Quay điểm (2, 0) góc 180° quanh O thành điểm nào?

<details><summary>Đáp án</summary>

1. $x' = 0\\cdot\\cos 90 - 1\\cdot\\sin 90 = -1$; $y' = 0\\cdot\\sin 90 + 1\\cdot\\cos 90 = 0 \\to$ **(−1, 0)**.
2. Quay $180^\\circ$ = đổi dấu cả hai → **(−2, 0)**.

</details>

### 📝 Tóm tắt mục 4

- Quay quanh O góc α: $x' = x\\cos\\alpha - y\\sin\\alpha$, $y' = x\\sin\\alpha + y\\cos\\alpha$.
- Ma trận quay $R(\\alpha) = \\begin{pmatrix} \\cos\\alpha & -\\sin\\alpha \\\\ \\sin\\alpha & \\cos\\alpha \\end{pmatrix}$.
- Góc dương = ngược chiều kim đồng hồ; ghép 2 phép quay = cộng góc.
- Quay là dời hình (giữ khoảng cách); quay $180^\\circ$ = đối xứng tâm O.

---

## 5. Phép vị tự (Dilation / Homothety)

💡 **Hình dung**: Phóng to/thu nhỏ hình ảnh quanh 1 tâm. Như zoom camera quanh 1 điểm.

**Công thức** (tâm O, tỉ số $k \\neq 0$):

$$M(x, y) \\to M'(k\\cdot x, k\\cdot y)$$

- $k > 1$: phóng to.
- $0 < k < 1$: thu nhỏ.
- $k = -1$: giống đối xứng tâm O.
- $k < 0$: vừa thu nhỏ/phóng to vừa lật (như qua O).

**Ma trận**: $R = k\\cdot I = \\begin{pmatrix} k & 0 \\\\ 0 & k \\end{pmatrix}$.

### 5.1. ASCII before/after — vị tự $k = 2$ (phóng to) và $k = 0.5$ (thu nhỏ)

Tam giác $A(1,1), B(2,1), C(1,2)$ vị tự tâm O. Với $k=2$ ảnh $A'(2,2), B'(4,2), C'(2,4)$ — hình **lớn gấp đôi**, các đỉnh "xa O gấp đôi":

\`\`\`
 y
 4 ·  ·  *(C')·  ·          C(1,2) → C'(2,4): xa O gấp 2
 3 ·  ·  ·  ·  ·
 2 o(C)*(A')·  *(B')        A(1,1) → A'(2,2), B(2,1) → B'(4,2)
 1 o(A)o(B)·  ·  ·          tam giác gốc nhỏ, sát O
 0 O──────────────  x
   0  1  2  3  4
\`\`\`

Vector $\\vec{OA'} = 2\\vec{OA}$, $\\vec{OB'} = 2\\vec{OB}$… — **mỗi đỉnh kéo ra xa O theo tỉ số $k$**, nên hình to lên nhưng **giữ nguyên hình dạng** (đồng dạng). Với $k = 0.5$ thì ngược lại: $A(1,1) \\to (0.5, 0.5)$, hình co về phía O còn một nửa.

### 5.2. Walk-through áp ma trận vị tự lên điểm (≥3 ví dụ)

$\\begin{bmatrix} k & 0 \\\\ 0 & k \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} kx \\\\ ky \\end{bmatrix}$ — đơn giản là nhân cả 2 tọa độ với $k$.

- $k = 2$, $M(4,2)$: $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 4 \\end{bmatrix} \\to (8, 4)$.
- $k = -1$, $M(4,2)$: $\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} -4 \\\\ -2 \\end{bmatrix} \\to (-4, -2)$ = đối xứng tâm O.
- $k = 1.5$, $M(-2, 6)$: $\\begin{bmatrix} 1.5 & 0 \\\\ 0 & 1.5 \\end{bmatrix}\\begin{bmatrix} -2 \\\\ 6 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 9 \\end{bmatrix} \\to (-3, 9)$.

**Tính chất**: KHÔNG bảo toàn khoảng cách ($A'B' = |k|\\cdot AB$), nhưng **bảo toàn góc** và **tỉ lệ**. Mọi hình → hình đồng dạng.

**4 ví dụ số đa dạng** (tâm O, điểm M(4, 2)):
- $k = 2$: $(8, 4)$ (phóng to gấp đôi).
- $k = 0.5$: $(2, 1)$ (thu nhỏ một nửa).
- $k = -1$: $(-4, -2)$ (= đối xứng tâm O).
- $k = 3$: $(12, 6)$; diện tích hình tăng $k^2 = 9$ lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vị tự k âm nghĩa là gì?"* Vừa phóng/thu theo $|k|$, vừa lật qua tâm O. $k=-1$ đúng bằng đối xứng tâm.
- *"Diện tích đổi theo k hay $k^2$?"* Theo **$k^2$** (vì 2 chiều). Vị tự $k=3 \\to$ diện tích $\\times 9$. Bán kính đường tròn $\\times 3 \\to$ diện tích $\\times 9$.
- *"Vì sao vị tự là đồng dạng mà không phải dời hình?"* Vì giữ hình dạng + góc (đồng dạng) nhưng đổi kích thước (không dời hình), trừ khi $k=\\pm 1$.

⚠ **Lỗi thường gặp**: cho rằng diện tích nhân k (thay vì $k^2$) hoặc quên đổi cả bán kính khi vị tự đường tròn. Phản ví dụ: vị tự $k=2$ đường tròn $R=3 \\to R'=6$ ($\\times k$), nhưng diện tích $\\times k^2 = 4$. Lỗi: tâm I của đường tròn cũng phải vị tự ($I \\to k\\cdot I$ khi tâm vị tự là O).

🔁 **Dừng lại tự kiểm tra**

1. Vị tự tâm O, k=3 biến điểm (2, −1) thành điểm nào?
2. Vị tự k=2 biến đường tròn bán kính 4 thành đường tròn bán kính bao nhiêu? Diện tích tăng mấy lần?

<details><summary>Đáp án</summary>

1. $(3\\cdot 2, 3\\cdot(-1)) = $ **(6, −3)**.
2. Bán kính 8 ($= 4\\cdot 2$); diện tích tăng $2^2 = $ **4 lần**.

</details>

### 📝 Tóm tắt mục 5

- Vị tự tâm O tỉ số k: $M(x,y) \\to M'(kx, ky)$; ma trận $k\\cdot I$.
- Không giữ khoảng cách ($A'B' = |k|\\cdot AB$) nhưng giữ góc + tỉ lệ → ra hình đồng dạng.
- Diện tích $\\times$ **$k^2$** (3D: thể tích $\\times k^3$).
- $k=-1$ = đối xứng tâm O; $k>0$ không lật, $k<0$ lật.

---

## 6. Vector hình học

### 6.1. Định nghĩa

💡 **Trực giác**: Vector = mũi tên có **hướng** và **độ dài**, không quan tâm vị trí đặt. $\\vec{AB}$ = mũi tên từ A đến B.

**Khác với đoạn thẳng**: đoạn AB không có hướng ($AB = BA$). Vector $\\vec{AB} \\neq \\vec{BA}$ (ngược hướng).

**Biểu diễn tọa độ**: nếu A(x₁, y₁), B(x₂, y₂) thì $\\vec{AB} = (x_2 - x_1, y_2 - y_1)$.

### 6.2. Các phép toán

**Cộng vector** (quy tắc hình bình hành / tam giác):
- $\\vec{u} = (a, b)$, $\\vec{v} = (c, d) \\to \\vec{u} + \\vec{v} = (a+c, b+d)$.

**Nhân với số**: $k\\cdot\\vec{u} = (k\\cdot a, k\\cdot b)$. Phóng to k lần (nếu $k > 0$) hoặc đổi hướng ($k < 0$).

**Trung điểm AB**: $M = \\frac{A+B}{2}$. Vector $\\vec{OM} = \\frac{\\vec{OA} + \\vec{OB}}{2}$.

### 6.3. Vector chỉ phương, vector pháp tuyến (đã gặp ở L06, L07)

- **Vector chỉ phương** của đường thẳng d: vector $\\parallel$ d. $(a, b)$ là VTCP → d có hệ số góc $b/a$.
- **Vector pháp tuyến**: vector $\\perp$ d. Nếu d: $Ax + By + C = 0$ thì $n = (A, B)$ là VTPT.

### 6.4. Ứng dụng — chứng minh hình học bằng vector

**Ví dụ**: Chứng minh trung điểm 2 cạnh đối nhau của tứ giác bất kỳ bằng nhau **không** xảy ra trừ khi đó là hình bình hành.

Đẹp hơn: **Định lý trung điểm tam giác**. Cho M, N là trung điểm AB, AC. CMR MN // BC và $MN = \\frac{1}{2} BC$.

Chứng minh:
- $\\vec{AM} = \\frac{1}{2}\\vec{AB}$, $\\vec{AN} = \\frac{1}{2}\\vec{AC}$
- $\\vec{MN} = \\vec{AN} - \\vec{AM} = \\frac{1}{2}(\\vec{AC} - \\vec{AB}) = \\frac{1}{2}\\vec{BC}$
- $\\implies MN \\parallel BC$ và $MN = \\frac{1}{2} BC$. □

⟵ Chứng minh bằng vector **2 dòng**, không cần hình vẽ phức tạp. Đó là sức mạnh.

**4 ví dụ số đa dạng** (A(1,2), B(4,6)):
- $\\vec{AB} = (4-1, 6-2) = (3, 4)$; $|\\vec{AB}| = \\sqrt{9+16} = 5$.
- $\\vec{BA} = (-3, -4)$ (ngược hướng $\\vec{AB}$); $|\\vec{BA}| = 5$ (cùng độ dài).
- $2\\cdot\\vec{AB} = (6, 8)$.
- Trung điểm AB $= \\left(\\frac{1+4}{2}, \\frac{2+6}{2}\\right) = (2.5, 4)$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector AB và đoạn AB khác nhau gì?"* Đoạn không có hướng ($AB = BA$ về độ dài, là 1 đối tượng). Vector $\\vec{AB} \\neq \\vec{BA}$ (ngược hướng), mang cả hướng lẫn độ dài.
- *"Cộng vector hình dung thế nào?"* Quy tắc tam giác: đặt nối đuôi v vào ngọn u, tổng là mũi tên từ gốc u tới ngọn v. Hoặc hình bình hành.
- *"Vì sao chứng minh bằng vector gọn?"* Vì vector "đóng gói" cả hướng và độ dài trong 1 phép toán cộng/nhân — thay cho nhiều bước hình học rời.

⚠ **Lỗi thường gặp**: lẫn vector chỉ phương ($\\parallel$ đường) với vector pháp tuyến ($\\perp$ đường). Nếu d: $Ax+By+C=0$ thì $n = (A, B)$ là **pháp tuyến**, còn chỉ phương là $(-B, A)$ (hoặc $(B,-A)$). Phản ví dụ: đường $2x+3y-1=0$ có pháp $(2,3)$, chỉ phương $(-3,2)$ — không phải $(2,3)$.

🔁 **Dừng lại tự kiểm tra**

1. Cho A(2,1), B(5,5). Tính $\\vec{AB}$ và $|\\vec{AB}|$.
2. $u = (3, 1)$, $v = (-1, 4)$. Tính u + v và 2u.

<details><summary>Đáp án</summary>

1. $\\vec{AB} = (3, 4)$; $|\\vec{AB}| = \\sqrt{9+16} = $ **5**.
2. $u + v = (2, 5)$; $2u = (6, 2)$.

</details>

### 📝 Tóm tắt mục 6

- Vector = mũi tên có hướng + độ dài; $\\vec{AB} \\neq \\vec{BA}$; $\\vec{AB} = (x_2-x_1, y_2-y_1)$.
- Cộng: $(a,b)+(c,d) = (a+c, b+d)$; nhân số $k\\cdot(a,b) = (ka, kb)$.
- Đường d: $Ax+By+C=0 \\to$ pháp tuyến $(A,B)$, chỉ phương $(-B,A)$.
- Chứng minh hình học bằng vector ngắn gọn (vd định lý đường trung bình tam giác).

---

## 7. Tổ hợp biến đổi = nhân ma trận

💡 **Trực giác**: làm phép biến đổi A rồi phép B liên tiếp = **một** phép biến đổi duy nhất, mà ma trận của nó là **tích** $M_B \\cdot M_A$ (ma trận của phép làm **sau** đứng **bên trái**). Lý do: áp lên vector $v$ là $M_B (M_A v) = (M_B M_A) v$ — tính kết hợp của nhân ma trận. Đây là lý do sâu xa khiến ma trận trở thành "ngôn ngữ" của biến hình: ghép nhiều bước = nhân vài ma trận, máy tính chạy cực nhanh.

⚠ **Đọc thứ tự từ PHẢI sang TRÁI**: $M_B M_A$ nghĩa là $A$ làm trước (sát vector nhất), $B$ làm sau. Viết ngược thứ tự thường ra kết quả khác (xem cảnh báo không giao hoán bên dưới).

### 7.1. Walk-through 1 — quay 90° rồi đối xứng qua Ox

Gọi $R = R(90°) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ (làm **trước**), $S = $ đối xứng Ox $= \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$ (làm **sau**). Phép ghép = $S \\cdot R$:

$$S \\cdot R = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$$

Nhân hàng × cột từng phần tử:
- $(1,1) = 1\\cdot 0 + 0\\cdot 1 = 0$
- $(1,2) = 1\\cdot(-1) + 0\\cdot 0 = -1$
- $(2,1) = 0\\cdot 0 + (-1)\\cdot 1 = -1$
- $(2,2) = 0\\cdot(-1) + (-1)\\cdot 0 = 0$

$$S \\cdot R = \\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}$$

Kiểm tra trên điểm $M(2, 0)$ — làm 2 bước rồi so với ma trận ghép:

$$\\begin{aligned}
\\text{Bước 1 (quay 90°): } & R\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix} \\\\
\\text{Bước 2 (đối xứng Ox): } & S\\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ -2 \\end{bmatrix}
\\end{aligned}$$

Áp thẳng ma trận ghép: $\\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ -2 \\end{bmatrix}$ ✓ — khớp. Ma trận $\\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}$ thực chất là đối xứng qua đường $y = -x$.

### 7.2. Walk-through 2 — thứ tự QUAN TRỌNG (không giao hoán)

Đảo thứ tự: đối xứng Ox **trước** rồi quay 90° **sau** = $R \\cdot S$:

$$R \\cdot S = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$$

- $(1,1) = 0\\cdot 1 + (-1)\\cdot 0 = 0$
- $(1,2) = 0\\cdot 0 + (-1)\\cdot(-1) = 1$
- $(2,1) = 1\\cdot 1 + 0\\cdot 0 = 1$
- $(2,2) = 1\\cdot 0 + 0\\cdot(-1) = 0$

$$R \\cdot S = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\neq S \\cdot R = \\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}$$

Khác hẳn! $R \\cdot S = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$ là đối xứng qua $y = x$, còn $S \\cdot R$ là đối xứng qua $y = -x$. Kiểm tra trên $M(2,0)$: $RS$ cho $(0, 2)$, còn $SR$ cho $(0,-2)$ — hai kết quả ngược dấu y.

⚠ **Lỗi cực phổ biến**: tưởng "quay rồi lật" = "lật rồi quay". SAI — đa số tổ hợp biến đổi **không giao hoán** ($M_B M_A \\neq M_A M_B$). Riêng 2 phép quay quanh **cùng** một tâm thì giao hoán (cộng góc), 2 tịnh tiến cũng giao hoán (cộng vector) — nhưng đó là ngoại lệ, không phải quy luật.

### 7.3. Walk-through 3 — ghép 2 phép quay = cộng góc

$R(30°) \\cdot R(60°) = R(90°)$. Lấy $R(30°) = \\begin{bmatrix} 0.866 & -0.5 \\\\ 0.5 & 0.866 \\end{bmatrix}$, $R(60°) = \\begin{bmatrix} 0.5 & -0.866 \\\\ 0.866 & 0.5 \\end{bmatrix}$:

- $(1,1) = 0.866\\cdot 0.5 + (-0.5)\\cdot 0.866 = 0.433 - 0.433 = 0$
- $(1,2) = 0.866\\cdot(-0.866) + (-0.5)\\cdot 0.5 = -0.75 - 0.25 = -1$
- $(2,1) = 0.5\\cdot 0.5 + 0.866\\cdot 0.866 = 0.25 + 0.75 = 1$
- $(2,2) = 0.5\\cdot(-0.866) + 0.866\\cdot 0.5 = -0.433 + 0.433 = 0$

$$= \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} = R(90°)$$ ✓

Đúng như kỳ vọng $30° + 60° = 90°$. Quay quanh cùng tâm O thì $R(\\alpha)R(\\beta) = R(\\beta)R(\\alpha) = R(\\alpha+\\beta)$ — **giao hoán**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao ma trận làm sau đứng bên trái?"* Vì áp lên vector viết là $M v$, nên làm A trước: $M_A v$; rồi B: $M_B(M_A v) = (M_B M_A) v$. Vector ở bên phải nên phép sát nó (làm trước) cũng ở bên phải.
- *"Có phải mọi tổ hợp biến đổi đều ra 1 ma trận 2×2 không?"* Đúng với quay/đối xứng/vị tự quanh O. Riêng **tịnh tiến** cần ma trận affine 3×3 (Mục 2) vì không biểu diễn được bằng 2×2 — khi ghép có tịnh tiến, dùng 3×3 cho đồng nhất.
- *"Ghép vị tự $k$ với quay $\\alpha$ ra gì?"* Ra phép "quay-co giãn" (spiral similarity), ma trận $k\\cdot R(\\alpha) = \\begin{bmatrix} k\\cos\\alpha & -k\\sin\\alpha \\\\ k\\sin\\alpha & k\\cos\\alpha \\end{bmatrix}$ — vừa xoay vừa phóng to, đồng dạng tỉ số $k$.

🔁 **Dừng lại tự kiểm tra**

1. Đối xứng qua Oy có ma trận $\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Tính ma trận "đối xứng Oy rồi đối xứng Ox" (tích $S_{Ox} \\cdot S_{Oy}$). Nó là phép gì?
2. $R(90°) \\cdot R(90°) = ?$ Phép gì?

<details><summary>Đáp án</summary>

1. $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$ = đối xứng tâm O (= quay $180°$). Hợp 2 đối xứng trục vuông góc = đối xứng tâm.
2. $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}^2 = \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix} = R(180°)$ (cộng góc $90°+90°$). 

</details>

### 📝 Tóm tắt mục 7

- Tổ hợp 2 biến đổi = nhân ma trận; phép làm **sau** đứng **bên trái** ($M_B M_A$).
- Đa số tổ hợp **không giao hoán**: $M_B M_A \\neq M_A M_B$ (quay rồi lật $\\neq$ lật rồi quay).
- Ngoại lệ giao hoán: 2 phép quay cùng tâm (cộng góc), 2 tịnh tiến (cộng vector).
- Vị tự $k$ ghép quay $\\alpha$ = "quay-co giãn" $k\\cdot R(\\alpha)$ (đồng dạng tỉ số $k$).

---

## 8. Bất biến của phép biến đổi (Invariants)

💡 **Trực giác**: "bất biến" = đại lượng **không đổi** sau khi áp phép biến đổi. Biết một phép giữ gì / phá gì giúp chọn đúng công cụ: muốn giữ kích thước → dùng dời hình; chỉ cần giữ hình dạng → đồng dạng được phép phóng to.

| Đại lượng | Tịnh tiến | Quay | Đối xứng | Vị tự ($k$) |
|-----------|:--:|:--:|:--:|:--:|
| Khoảng cách giữa 2 điểm | giữ | giữ | giữ | $\\times\\|k\\|$ |
| Góc giữa 2 đường | giữ | giữ | giữ | giữ |
| Diện tích | giữ | giữ | giữ | $\\times k^2$ |
| Tính song song | giữ | giữ | giữ | giữ |
| **Hướng** (định hướng) | giữ | giữ | **lật** | giữ nếu $k>0$, lật nếu $k<0$ |

**Walk-through bất biến khoảng cách với phép quay.** Lấy $A(1,0), B(0,1)$, quay cả hai $90°$:
- $A(1,0) \\to A'(0,1)$, $B(0,1) \\to B'(-1,0)$.
- Trước: $AB = \\sqrt{(1-0)^2 + (0-1)^2} = \\sqrt 2$.
- Sau: $A'B' = \\sqrt{(0-(-1))^2 + (1-0)^2} = \\sqrt 2$ ✓ — khoảng cách **bất biến** với phép quay (dời hình).

**Walk-through khoảng cách KHÔNG bất biến với vị tự.** Cùng $A(1,0), B(0,1)$, vị tự $k = 3$:
- $A \\to (3,0)$, $B \\to (0,3)$.
- $A'B' = \\sqrt{9+9} = 3\\sqrt 2 = 3\\cdot AB$ → đúng $A'B' = |k|\\cdot AB$ ✓. Khoảng cách **không** bất biến, nhưng **tỉ lệ** thì có (mọi khoảng cách đều nhân 3).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dời hình quan trọng đến vậy?"* Vì nó là phép biến đổi "giữ nguyên hình thật" — đặt vật ở đâu, xoay thế nào, hình học của nó (cạnh, góc, diện tích) không đổi. Mọi định lý hình học "không phụ thuộc vị trí/hướng" đều dựa trên bất biến của dời hình.
- *"Phép nào KHÔNG giữ góc?"* Trong 4 phép cơ bản ở bài này, **tất cả giữ góc** (vị tự cũng giữ góc, chỉ đổi độ dài). Phép phá góc là các biến đổi affine tổng quát hơn (shear/kéo xiên) — học sâu ở Tier 6.

📝 **Tóm tắt mục 8**: Dời hình (tịnh tiến/quay/đối xứng) giữ khoảng cách + góc + diện tích; đối xứng lật hướng. Vị tự giữ góc + tỉ lệ nhưng khoảng cách $\\times|k|$, diện tích $\\times k^2$, lật hướng khi $k<0$.

---

## 9. Tổng hợp các phép biến hình

| Phép | Công thức | Ma trận | Dời hình? | Đồng dạng? |
|------|-----------|---------|:--:|:--:|
| Tịnh tiến $v=(a,b)$ | $(x+a, y+b)$ | affine | ✓ | ✓ |
| Đối xứng Ox | $(x, -y)$ | $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ | ✓ | ✓ |
| Đối xứng O | $(-x, -y)$ | $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ | ✓ | ✓ |
| Quay α quanh O | $x\\cos\\alpha - y\\sin\\alpha,\\ x\\sin\\alpha + y\\cos\\alpha$ | $R(\\alpha)$ | ✓ | ✓ |
| Vị tự tỉ số k | $(kx, ky)$ | $k\\cdot I$ | ✗ | ✓ |

📝 **Liên hệ Tier 6 — Đại số tuyến tính**: mọi phép biến hình (trừ tịnh tiến) là **ma trận 2×2** nhân với vector tọa độ. Đó là lý do ma trận quan trọng — nó là ngôn ngữ chung của hình học và đại số.

---

## 10. Bài tập

### Bài tập

**Bài 1**: Tịnh tiến $v = (5, -3)$ biến A(2, 7) thành điểm nào?

**Bài 2**: Đối xứng qua Ox biến M(4, -6) thành điểm nào? Qua O?

**Bài 3**: Quay 90° quanh O biến điểm (3, 4) thành điểm nào?

**Bài 4**: Vị tự tâm O tỉ số k = 2 biến đường tròn $(x-1)^2 + (y-2)^2 = 9$ thành đường tròn nào?

**Bài 5**: Cho A(1, 2), B(4, 6). Tính $\\vec{AB}$, $|\\vec{AB}|$. Tìm điểm M sao cho $\\vec{AM} = 2\\cdot\\vec{AB}$.

**Bài 6**: Trong tam giác ABC, M là trung điểm BC. CMR $\\vec{AM} = \\frac{1}{2}(\\vec{AB} + \\vec{AC})$ (dùng vector).

**Bài 7** (tổ hợp biến đổi): Tính ma trận của phép "vị tự $k=2$ tâm O **rồi** quay $90°$ quanh O". Áp lên điểm $(1, 2)$.

**Bài 8** (không giao hoán): Cho $R = R(90°)$ và $S$ = đối xứng qua $y = x$ (ma trận $\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$). Tính $R\\cdot S$ và $S\\cdot R$. Chúng có bằng nhau không?

### Lời giải

**Bài 1**: $A'(2+5, 7-3) = $ **(7, 4)**.

**Bài 2**: Qua Ox: **(4, 6)** (giữ x, đổi dấu y). Qua O: **(-4, 6)**.

**Bài 3**: $x' = 3\\cdot 0 - 4\\cdot 1 = -4$, $y' = 3\\cdot 1 + 4\\cdot 0 = 3$. → **(-4, 3)**.

**Bài 4**: Tâm $I(1,2) \\to I'(2, 4)$. Bán kính $R = 3 \\to R' = 2\\cdot 3 = 6$. → **(x−2)² + (y−4)² = 36**.

**Bài 5**: $\\vec{AB} = (4-1, 6-2) = (3, 4)$. $|\\vec{AB}| = \\sqrt{9+16} = $ **5**.  
$\\vec{AM} = 2\\vec{AB} = (6, 8) \\to M = A + (6, 8) = $ **(7, 10)**.

**Bài 6**: M trung điểm BC → $\\vec{AM} = \\frac{\\vec{AB} + \\vec{AC}}{2}$. Chứng minh:
- $\\vec{AM} = \\vec{AB} + \\vec{BM} = \\vec{AB} + \\frac{1}{2}\\vec{BC} = \\vec{AB} + \\frac{1}{2}(\\vec{AC} - \\vec{AB}) = \\frac{1}{2}\\vec{AB} + \\frac{1}{2}\\vec{AC} = \\frac{1}{2}(\\vec{AB} + \\vec{AC})$. □

**Bài 7**: Vị tự làm trước → ma trận của nó $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$ đứng bên phải; quay $90°$ làm sau → $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ bên trái. Tích:

$$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix} = \\begin{bmatrix} 0\\cdot 2 + (-1)\\cdot 0 & 0\\cdot 0 + (-1)\\cdot 2 \\\\ 1\\cdot 2 + 0\\cdot 0 & 1\\cdot 0 + 0\\cdot 2 \\end{bmatrix} = \\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}$$

Áp lên $(1,2)$: $\\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} -4 \\\\ 2 \\end{bmatrix} \\to$ **(−4, 2)**. (Kiểm tra 2 bước: vị tự $(1,2)\\to(2,4)$; quay $90°$: $(2,4)\\to(-4,2)$ ✓.)

**Bài 8**: 
$$R\\cdot S = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}, \\quad S\\cdot R = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$$
**Không** bằng nhau ($R S$ = đối xứng Oy, $S R$ = đối xứng Ox). Khẳng định lại: tổ hợp biến đổi nói chung **không giao hoán**.

---

## 11. 🎉 HOÀN THÀNH TIER 2 GEOMETRY (8/8)!

Tiếp theo: **Tier 3 — Trig & Complex** (lượng giác, số phức, công thức Euler).

## 📝 Tổng kết Tier 2

1. **Euclid cơ sở**: 5 tiên đề, góc.
2. **Tam giác**: bằng nhau, đồng dạng, Pythagore.
3. **Đường tròn**: tiếp tuyến, góc nội tiếp.
4. **Đa giác**: tổng góc trong, diện tích.
5. **Hình không gian**: V, S, công thức Euler đa diện.
6. **Tọa độ Oxy + conic**: đường thẳng, parabol, ellipse, hyperbola.
7. **Tọa độ Oxyz**: mặt phẳng, đường thẳng 3D, khoảng cách.
8. **Biến hình + vector**: tịnh tiến/đối xứng/quay/vị tự, vector hình học → cầu nối Đại số tuyến tính.

🎉 Hình học phổ thông đã hoàn chỉnh từ Euclid đến giải tích hình học.
`;
