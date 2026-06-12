// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-06-coordinate-plane-conics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Tọa độ Oxy & Conic

## Mục tiêu

- Hiểu **hệ tọa độ Oxy (Cartesian coordinate system)** — cách "đánh số" mọi điểm trên mặt phẳng.
- Tính **khoảng cách (distance)** 2 điểm, **trung điểm (midpoint)**, **hệ số góc (slope)** — mỗi công cụ kèm walk-through số cụ thể.
- Viết phương trình **đường thẳng (line)** ở mọi dạng và phương trình **đường tròn (circle)**.
- Hiểu 3 đường **conic (conic section)**: parabol (parabola), elip (ellipse), hypebol (hyperbola) — sinh ra khi cắt hình nón, định nghĩa theo tiêu điểm (focus) – đường chuẩn (directrix).

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/) (Pythagoras), [Lesson 04 (T1) — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/).

---

## 1. Hệ tọa độ Oxy

**Hệ tọa độ Descartes (Cartesian coordinate system)** (Descartes ~1637): 2 trục vuông góc Ox (ngang) và Oy (dọc), cắt nhau tại gốc O.

Mỗi điểm M trên mặt phẳng có **tọa độ (x, y)** = hoành độ (abscissa) + tung độ (ordinate).

💡 **Ý nghĩa cách mạng**: Trước Descartes, hình học và đại số tách biệt. Sau Descartes, có thể **dịch** mọi bài hình thành bài đại số (và ngược lại). Đây là nền cho giải tích.

### Bức tranh mặt phẳng Oxy — 4 góc phần tư (quadrant)

Hai trục chia mặt phẳng thành **4 góc phần tư** đánh số ngược chiều kim đồng hồ. Dấu của $(x, y)$ trong từng góc:

\`\`\`
                 y  (trục tung, Oy)
                 ^
        QII      |      QI
     (-x, +y)    |   (+x, +y)
                 |
                 |  • M(3, 2)
        ---------O---------------> x  (trục hoành, Ox)
                 |
     (-x, -y)    |   (+x, -y)
        QIII     |      QIV

   QI:  x>0, y>0   |  QII:  x<0, y>0
   QIII: x<0, y<0  |  QIV:  x>0, y<0
   Trên Ox: y=0     |  Trên Oy: x=0
\`\`\`

Đọc điểm $M(3, 2)$: đi từ gốc O **sang phải 3** (theo Ox) rồi **lên 2** (theo Oy). Vài điểm mẫu để định vị góc phần tư:

| Điểm | Dấu (x, y) | Góc phần tư |
|------|-----------|-------------|
| $(3, 2)$ | $(+, +)$ | QI |
| $(-4, 1)$ | $(-, +)$ | QII |
| $(-2, -5)$ | $(-, -)$ | QIII |
| $(6, -3)$ | $(+, -)$ | QIV |
| $(0, 4)$ | nằm trên Oy | trục tung |
| $(-5, 0)$ | nằm trên Ox | trục hoành |

### Khoảng cách 2 điểm A(x₁, y₁), B(x₂, y₂)

$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

(Pythagoras áp dụng trên tam giác vuông tạo bởi đoạn AB.)

**Vì sao đúng — minh họa Pythagoras**: dựng tam giác vuông có cạnh huyền là AB, hai cạnh góc vuông song song trục:

\`\`\`
   B(4,5) •
          |\\
          | \\  d = AB (cạnh huyền)
   Δy = 4 |  \\
          |   \\
          |____\\
   A(1,1) •     • C(4,1)
          Δx = 3

   Δx = x₂−x₁ = 4−1 = 3   (cạnh ngang AC)
   Δy = y₂−y₁ = 5−1 = 4   (cạnh dọc CB)
   d² = Δx² + Δy² = 9 + 16 = 25  →  d = 5
\`\`\`

#### Walk-through khoảng cách — 4 bước trên A(1,1), B(4,5)

> **Bước 1 — tính Δx**: $\\Delta x = x_2 - x_1 = 4 - 1 = 3$.
> **Bước 2 — tính Δy**: $\\Delta y = y_2 - y_1 = 5 - 1 = 4$.
> **Bước 3 — bình phương rồi cộng**: $\\Delta x^2 + \\Delta y^2 = 3^2 + 4^2 = 9 + 16 = 25$.
> **Bước 4 — lấy căn**: $d = \\sqrt{25} = \\mathbf{5}$.

### Trung điểm (midpoint)

$$M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$

💡 **Trực giác / Hình dung**: hệ tọa độ giống "địa chỉ nhà" trong thành phố lưới ô bàn cờ — số đường ngang (x) + số đường dọc (y) chỉ đúng 1 vị trí. Khoảng cách 2 điểm = cạnh huyền của tam giác vuông có 2 cạnh góc vuông là Δx và Δy → chính là Pythagoras. Trung điểm = "lấy trung bình cộng" từng tọa độ — điểm cân bằng đứng chính giữa đoạn AB.

#### Walk-through trung điểm — 2 bước trên A(2,3), B(8,7)

> **Bước 1 — trung bình hoành độ**: $x_M = \\dfrac{x_1 + x_2}{2} = \\dfrac{2 + 8}{2} = 5$.
> **Bước 2 — trung bình tung độ**: $y_M = \\dfrac{y_1 + y_2}{2} = \\dfrac{3 + 7}{2} = 5$.
> → **$M = (5, 5)$**. Kiểm: $d(A,M) = \\sqrt{3^2+2^2} = \\sqrt{13}$ và $d(M,B) = \\sqrt{3^2+2^2} = \\sqrt{13}$ — cách đều 2 đầu ✓.

**4 ví dụ số đa dạng (khoảng cách)**:
- A(0,0), B(3,4): $d = \\sqrt{9+16} = $ **5**.
- A(1,1), B(4,5): $d = \\sqrt{9+16} = $ **5**.
- A(−2,3), B(1,−1): $d = \\sqrt{3^2 + (-4)^2} = \\sqrt{9+16} = $ **5** (tọa độ âm vẫn ổn vì bình phương).
- A(2,5), B(2,9): $d = \\sqrt{0+16} = $ **4** (cùng x → thẳng đứng).
- A(−3,−2), B(3,6): $d = \\sqrt{6^2 + 8^2} = \\sqrt{36+64} = $ **10** (cả 2 tọa độ âm vẫn đúng).

**4 ví dụ số đa dạng (trung điểm)**:
- A(0,0), B(6,8): $M = (3, 4)$.
- A(1,1), B(4,5): $M = (2.5, 3)$ (ra phân số — bình thường).
- A(−2,3), B(4,−1): $M = (1, 1)$ (âm + dương triệt tiêu nhau).
- A(−5,−4), B(−1,−2): $M = (−3, −3)$ (cả hai âm → trung điểm vẫn âm).

#### Hệ số góc (slope) của đoạn / đường thẳng qua 2 điểm

Trước khi sang mục đường thẳng, định nghĩa **hệ số góc** ngay từ 2 điểm — vì cùng dùng Δx, Δy như khoảng cách:

$$a = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} \\quad (x_1 \\ne x_2)$$

💡 **(a) Là gì**: $a$ đo "lên/xuống bao nhiêu khi đi ngang 1 đơn vị" — độ dốc của đoạn AB. **(b) Vì sao cần**: nó tóm gọn hướng nghiêng của đường thành **một con số**, để so sánh song song/vuông góc và lập phương trình. **(c) Ví dụ số**: đi từ A(1,2) tới B(4,8) thì lên $\\Delta y = 6$ khi đi ngang $\\Delta x = 3$ → $a = 2$ (mỗi bước ngang lên 2).

**4 ví dụ số đa dạng (hệ số góc)**:
- A(1,2), B(4,8): $a = \\dfrac{8-2}{4-1} = \\dfrac{6}{3} = $ **2** (dốc lên).
- A(0,5), B(2,1): $a = \\dfrac{1-5}{2-0} = \\dfrac{-4}{2} = $ **−2** (dốc xuống).
- A(1,3), B(5,3): $a = \\dfrac{3-3}{5-1} = \\dfrac{0}{4} = $ **0** (nằm ngang).
- A(2,1), B(2,7): $\\Delta x = 0$ → $a$ **không xác định** (đường thẳng đứng, chia cho 0).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tọa độ âm có làm hỏng công thức khoảng cách không?"* Không — vì hiệu được **bình phương**, dấu biến mất. $(x_2-x_1)^2$ luôn $\\ge 0$.
- *"Thứ tự A, B có quan trọng trong khoảng cách không?"* Không — $d(A,B) = d(B,A)$ vì $(x_2-x_1)^2 = (x_1-x_2)^2$.
- *"Trung điểm có phải lúc nào cũng nằm giữa?"* Có — luôn là điểm cách đều 2 đầu, nằm trên đoạn AB.

⚠ **Lỗi thường gặp**: quên bình phương, viết $d = |\\Delta x| + |\\Delta y|$ (đó là khoảng cách "taxi", không phải đường chim bay). Phản ví dụ: A(0,0), B(3,4) — đường chim bay = 5, nhưng $|3|+|4| = 7$ (đi theo lưới đường). Lỗi khác: trừ sai thứ tự trong trung điểm (trung điểm dùng **cộng** rồi chia 2, không phải trừ).

🔁 **Dừng lại tự kiểm tra**

1. A(1,2), B(7,10). Tính khoảng cách AB và trung điểm.
2. Khoảng cách từ gốc O đến điểm (−6, 8) là bao nhiêu?

<details><summary>Đáp án</summary>

1. $d = \\sqrt{6^2+8^2} = \\sqrt{100} = $ **10**. $M = \\left(\\frac{1+7}{2}, \\frac{2+10}{2}\\right) = $ **(4, 6)**.
2. $\\sqrt{36+64} = \\sqrt{100} = $ **10**.

</details>

### 📝 Tóm tắt mục 1

- Hệ Oxy: mỗi điểm $= (x, y)$ (hoành độ, tung độ); gốc $O = (0,0)$; 4 góc phần tư QI–QIV theo dấu của $(x,y)$.
- **Khoảng cách**: $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$ (Pythagoras) — tọa độ âm vẫn đúng (bình phương khử dấu).
- **Trung điểm**: $M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$ — trung bình cộng từng tọa độ.
- **Hệ số góc**: $a = \\frac{\\Delta y}{\\Delta x}$ — độ dốc; $\\Delta x = 0$ → không xác định (đứng).
- Descartes nối hình học ↔ đại số — nền cho giải tích.

---

## 2. Đường thẳng

💡 **Trực giác / Hình dung**: hệ số góc a của đường thẳng = "độ dốc" — đi sang phải 1 đơn vị thì lên (a > 0) hay xuống (a < 0) bao nhiêu. a = 2 nghĩa là "lên 2 khi đi ngang 1" (dốc đứng); a = 0 là đường nằm ngang (mặt hồ phẳng); a âm là đổ dốc xuống. Giống độ dốc của con đường: 5% nghĩa là lên 5 m mỗi 100 m ngang.

### 2.1. Dạng đại số

$$\\begin{aligned}
y &= ax + b &&(\\text{dạng hệ số góc, slope-intercept}) \\\\
ax + by + c &= 0 &&(\\text{dạng tổng quát, general form})
\\end{aligned}$$

- $a$ = hệ số góc = $\\tan(\\theta)$ với $\\theta$ = góc nghiêng so với Ox.
- $b$ = **tung độ gốc (y-intercept)** — chỗ đường cắt trục Oy (tại $x = 0$, $y = b$).
- 2 đường thẳng **song song (parallel)**: cùng $a$ (khác $b$).
- 2 đường thẳng **vuông góc (perpendicular)**: $a_1\\cdot a_2 = -1$.

**Minh họa 3 độ dốc** trên cùng 1 hình:

\`\`\`
   y                  y = 2x  (a=2, dốc lên gắt)
   ^                 /
   |                /        y = x  (a=1)
 4 +              /        /
   |             /       /
 2 +           /      /  _____  y = 3  (a=0, ngang)
   |          /    /  __/
   +---------/--/---------------> x
   |       //
   |     //   y = −x  (a=−1, dốc xuống)
\`\`\`

**2 dạng đặc biệt — không viết được $y = ax+b$**:
- **Đường ngang (horizontal)**: $y = k$ (hằng), hệ số góc $a = 0$. Vd $y = 3$ đi qua mọi điểm có tung độ 3.
- **Đường đứng (vertical)**: $x = k$ (hằng), **không có hệ số góc** ($\\Delta x = 0$). Vd $x = 5$. Chỉ viết được dạng tổng quát ($x - 5 = 0$).

### 2.2. Viết PT đường thẳng

**Qua 1 điểm A(x₀, y₀) với hệ số góc a**:

$$y - y_0 = a(x - x_0)$$

**Qua 2 điểm A(x₁, y₁) và B(x₂, y₂)**:

$$\\frac{y - y_1}{x - x_1} = \\frac{y_2 - y_1}{x_2 - x_1}$$

**Verify bằng số**: đường qua A(1,2) và B(4,8). Hệ số góc $a = \\frac{8-2}{4-1} = \\frac{6}{3} = 2$. PT: $y - 2 = 2(x-1) \\to y = 2x$. Kiểm: tại $x=1 \\to y=2$ ✓ (qua A); tại $x=4 \\to y=8$ ✓ (qua B). Đường vuông góc với nó có $a' = -\\frac{1}{2}$ (vì $2\\cdot(-\\frac{1}{2}) = -1$).

#### 2.2.1. Walk-through lập PT đường thẳng — 3 ví dụ

**Ví dụ 1 — qua 1 điểm + hệ số góc** ($A(2,3)$, $a = 5$):
> **Bước 1 — thay vào dạng điểm-góc**: $y - 3 = 5(x - 2)$.
> **Bước 2 — khai triển**: $y - 3 = 5x - 10$.
> **Bước 3 — rút gọn**: $y = 5x - 7$.
> **Kiểm**: tại $x=2 \\to y = 10-7 = 3$ ✓ (qua A).

**Ví dụ 2 — qua 2 điểm** ($A(-1, 4)$, $B(3, -4)$):
> **Bước 1 — tính hệ số góc**: $a = \\dfrac{-4 - 4}{3 - (-1)} = \\dfrac{-8}{4} = -2$.
> **Bước 2 — dùng điểm A**: $y - 4 = -2(x - (-1)) = -2(x + 1)$.
> **Bước 3 — rút gọn**: $y = -2x - 2 + 4 = -2x + 2$.
> **Kiểm**: tại $x=3 \\to y = -6+2 = -4$ ✓ (qua B).

**Ví dụ 3 — song song với đường cho, qua 1 điểm** (song song $y = 3x - 1$, qua $A(0, 5)$):
> **Bước 1 — chép hệ số góc** (song song → cùng $a$): $a = 3$.
> **Bước 2 — qua A(0,5)**: $y - 5 = 3(x - 0)$.
> **Bước 3 — rút gọn**: $y = 3x + 5$.
> **Kiểm**: cùng $a = 3$ với đường gốc nhưng $b = 5 \\ne -1$ → song song, không trùng ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 đường vuông góc thì $a_1\\cdot a_2 = -1$?"* Vì xoay 1 đường $90^\\circ$ thì độ dốc "lật nghịch đảo và đổi dấu" (dốc lên thành dốc xuống nghịch đảo). Vd dốc 2 vuông góc với dốc $-\\frac{1}{2}$.
- *"Đường thẳng đứng có hệ số góc không?"* Không — đường thẳng đứng (x = hằng) có hệ số góc "vô cực", không viết được dạng y = ax+b. Phải dùng dạng tổng quát.
- *"2 đường song song nhận biết thế nào?"* Cùng a, khác b. Nếu cùng cả a và b thì trùng nhau.

⚠ **Lỗi thường gặp**: cho 2 đường song song khi $a_1\\cdot a_2 = -1$ (đó là **vuông góc**). Song song là $a_1 = a_2$. Phản ví dụ: $y = 2x+1$ và $y = 2x-3$ song song (cùng $a=2$); $y = 2x+1$ và $y = -0.5x$ vuông góc ($2\\cdot(-0.5) = -1$).

🔁 **Dừng lại tự kiểm tra**

1. Viết PT đường thẳng qua A(0, 3) với hệ số góc −2.
2. Đường y = 3x + 1 và y = ax − 2 vuông góc. Tìm a.

<details><summary>Đáp án</summary>

1. $y - 3 = -2(x - 0) \\to y = $ **−2x + 3**.
2. $3\\cdot a = -1 \\to a = $ **−1/3**.

</details>

### 2.3. Đường tròn (circle)

💡 **Là gì**: đường tròn = tập mọi điểm cách **tâm I** một khoảng **bán kính R** không đổi. Áp công thức khoảng cách: điểm $(x,y)$ cách tâm $I(x_0, y_0)$ đúng $R$ nghĩa là $\\sqrt{(x-x_0)^2 + (y-y_0)^2} = R$. Bình phương 2 vế → **phương trình chính tắc**:

$$(x - x_0)^2 + (y - y_0)^2 = R^2$$

(Tâm tại gốc O: $x^2 + y^2 = R^2$.)

\`\`\`
            y
            ^
            |    ___
            |  /     \\
            | |   •I  | R   • mọi điểm trên vành
            |  \\_____/      cách I đúng R
       -----O---------------> x
\`\`\`

**Vì sao đường tròn KHÔNG phải hàm số** $y = f(x)$: 1 hoành độ ứng 2 tung độ — vd $x^2 + y^2 = 25$ tại $x=0$ cho $y = \\pm 5$ (xem lại vertical line test ở [Lesson 07 (T1) — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/)).

#### 2.3.1. Walk-through lập PT đường tròn — 3 ví dụ

**Ví dụ 1 — biết tâm + bán kính** (tâm $I(2, -3)$, $R = 4$):
> Thay thẳng: $(x - 2)^2 + (y - (-3))^2 = 4^2 \\Rightarrow (x-2)^2 + (y+3)^2 = 16$.
> **Kiểm** điểm $(6, -3)$ (bên phải tâm 4 đơn vị): $(6-2)^2 + 0 = 16$ ✓.

**Ví dụ 2 — biết tâm + 1 điểm trên đường tròn** (tâm $I(1, 2)$, qua $A(4, 6)$):
> **Bước 1 — bán kính = khoảng cách tâm→điểm**: $R = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9+16} = 5$.
> **Bước 2 — thay**: $(x-1)^2 + (y-2)^2 = 25$.
> **Kiểm**: $A(4,6) \\to 9 + 16 = 25$ ✓.

**Ví dụ 3 — đường kính cho bởi 2 đầu mút** ($A(-2, 1)$, $B(4, 9)$):
> **Bước 1 — tâm = trung điểm AB**: $I = \\left(\\frac{-2+4}{2}, \\frac{1+9}{2}\\right) = (1, 5)$.
> **Bước 2 — bán kính = nửa AB**: $AB = \\sqrt{6^2 + 8^2} = 10 \\Rightarrow R = 5$.
> **Bước 3 — thay**: $(x-1)^2 + (y-5)^2 = 25$.

⚠ **Lỗi thường gặp (đường tròn)**: (1) quên bình phương bán kính — vế phải là $R^2$ chứ không phải $R$ (vd $R=4 \\to 16$, không phải 4). (2) sai dấu trong ngoặc — tâm $I(2,-3)$ cho $(x-2)^2 + (y+3)^2$, **trừ tọa độ tâm** nên $y - (-3) = y + 3$.

🔁 **Dừng lại tự kiểm tra (đường tròn)**

1. Viết PT đường tròn tâm $I(0, 0)$, bán kính 7.
2. Đường tròn $(x-3)^2 + (y+1)^2 = 36$ có tâm và bán kính bao nhiêu?

<details><summary>Đáp án</summary>

1. $x^2 + y^2 = 49$.
2. Tâm $I(3, -1)$, bán kính $R = \\sqrt{36} = $ **6** (nhớ lấy căn vế phải).

</details>

### 📝 Tóm tắt mục 2

- Dạng hệ số góc: $y = ax + b$ ($a$ = độ dốc, $b$ = tung độ gốc).
- **Song song**: $a_1 = a_2$ (khác $b$). **Vuông góc**: $a_1\\cdot a_2 = -1$.
- Qua 1 điểm + hệ số góc: $y - y_0 = a(x - x_0)$; qua 2 điểm: tính $a$ trước rồi dùng điểm-góc.
- Đường thẳng đứng ($x$ = hằng) không có hệ số góc; đường ngang $y = k$ có $a = 0$.
- **Đường tròn**: $(x - x_0)^2 + (y - y_0)^2 = R^2$ (tâm $I(x_0,y_0)$, bán kính $R$); vế phải là $R^2$, không phải $R$.

---

## 3. Conic — Parabol, Ellipse, Hyperbola

💡 **Trực giác / Hình dung**: cầm 1 cây kem ốc quế (hình nón đôi) rồi cắt nó bằng 1 con dao phẳng. Tùy góc dao mà mặt cắt ra hình khác nhau: cắt ngang → đường tròn; cắt hơi nghiêng → **ellipse** (hình trứng); cắt song song với sườn nón → **parabol** (hở 1 đầu); cắt dốc đứng xuyên cả 2 phần nón → **hyperbola** (2 nhánh). Cùng 1 cái nón, chỉ đổi góc dao là ra cả họ đường cong.

Tất cả 3 đường này sinh ra khi **cắt mặt nón** với mặt phẳng theo các góc khác nhau:
- **Parabol**: mặt phẳng song song với đường sinh.
- **Ellipse**: mặt phẳng cắt cả nón, không song song đáy.
- **Hyperbola**: mặt phẳng cắt cả 2 nón.

\`\`\`
   Lát cắt hình nón đôi (double cone) — đổi góc dao → đổi conic

        /\\              /\\              /\\         |  /\\
       /  \\            /  \\            /  \\        | /  \\
      /----\\  ← ngang /    \\         ━/━━━━\\━ //   |/----\\  dốc đứng
     /      \\  TRÒN  /-----,\\ nghiêng/      \\ sinh /|     \\  xuyên 2 nón
    /        \\      /       '\\  ELIP /        \\    / |      \\ HYPEBOL
   ----------       ---------          (mở 1 đầu)     (2 nhánh)
     (e=0)            (e<1)            PARABOL (e=1)    (e>1)
\`\`\`

> 📐 **Định nghĩa đầy đủ — Conic**
>
> **(a) Là gì**: 1 họ 3 đường cong (parabol, ellipse, hyperbola) **có chung 1 cách định nghĩa** qua khoảng cách. Mỗi đường = tập điểm thoả 1 quan hệ giữa khoảng cách tới tiêu điểm và khoảng cách tới đường chuẩn (= **eccentricity $e$**): $e < 1 \\to$ ellipse, $e = 1 \\to$ parabol, $e > 1 \\to$ hyperbola, $e = 0$ (đặc biệt) $\\to$ đường tròn.
>
> **(b) Vì sao cần**: Vì hầu hết quỹ đạo trong vũ trụ là conic. Newton chứng minh: vật chuyển động dưới lực hấp dẫn $1/r^2$ **luôn vẽ ra 1 conic** — hành tinh (ellipse), sao chổi (parabol/hyperbola với 1 lần ghé qua). Trong kỹ thuật: gương parabol hội tụ tia // → tiêu điểm (đèn pin, ăng-ten Mặt Trời, vệ tinh parabol). Ellipse: ổ cứng máy bay, phòng "whisper" (âm thanh từ 1 tiêu hội tụ tại tiêu kia).
>
> **(c) Ví dụ số**: Quỹ đạo Trái Đất quanh Mặt Trời = ellipse với $e \\approx 0.017$ (gần tròn). Quỹ đạo sao Hỏa: $e \\approx 0.093$. Sao chổi Halley: $e \\approx 0.967$ (rất dẹt). Ánh sáng đèn pin: tia phát từ tiêu điểm parabol $y^2 = 4px \\to$ ra song song trục Ox. Hyperbola $xy = 1$: 2 nhánh, tiệm cận 2 trục — đồ thị hàm $1/x$.

### 3.1. Parabol (parabola)

$$y = ax^2 + bx + c \\quad \\text{hoặc dạng tiêu điểm: } y^2 = 2px \\ (\\text{mở phải})$$

(Một số sách viết $y^2 = 4px$; ở đây dùng $y^2 = 2px$ theo chuẩn phổ thông Việt Nam, với $p$ = tham số tiêu, **tiêu điểm** $F\\left(\\frac{p}{2}, 0\\right)$, **đường chuẩn** $x = -\\frac{p}{2}$.)

💡 **Định nghĩa theo tiêu điểm – đường chuẩn**: parabol = tập điểm M **cách đều** 1 điểm cố định (tiêu điểm $F$) và 1 đường thẳng cố định (đường chuẩn, directrix $d$). Tức $MF = d(M, d)$ — eccentricity $e = 1$.

\`\`\`
   y                      Parabol y² = 2px (mở sang phải)
   ^         _____•M
   |    ___/      :  MF = khoảng cách M→F
   |  _/   F      :  d(M,d) = khoảng cách M→đường chuẩn
   | /   • (p/2,0):  → parabol: MF = d(M,d)
 --O----+---------|----> x       đỉnh (vertex) tại O(0,0)
   | \\   :        :
   |  \\_ :        :
   |    \\____     :
   |        \\___•M'
   :
   đường chuẩn x = −p/2  (đường đứng nét đứt)
\`\`\`

Dạng quen thuộc $y = ax^2$ là parabol mở **lên** ($a>0$) hoặc **xuống** ($a<0$), đỉnh tại gốc; còn $y = a(x-h)^2 + k$ có đỉnh $(h, k)$. Liên hệ [Lesson 04 (T1) — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/).

#### 3.1.1. 4 ví dụ nhận dạng & tìm yếu tố parabol

- $y = x^2$: mở **lên**, đỉnh $(0,0)$, trục đối xứng $x = 0$. Tại $x=2 \\to y=4$.
- $y = -2x^2 + 3$: mở **xuống** ($a=-2<0$), đỉnh $(0, 3)$, trục $x=0$.
- $y = (x-1)^2 - 4$: mở lên, đỉnh $(1, -4)$, trục $x = 1$ (giao Ox tại $x = -1, 3$).
- $y^2 = 8x$: dạng $y^2 = 2px$ với $2p = 8 \\Rightarrow p = 4$. Tiêu điểm $F\\left(\\frac{p}{2},0\\right) = (2, 0)$, đường chuẩn $x = -2$, đỉnh $O(0,0)$, mở sang phải.

**Ứng dụng**: gương parabol (đèn pin, ăng-ten parabol) — tia từ tiêu điểm phản xạ thành chùm song song; quỹ đạo ném xiên (Physics).

### 3.2. Elip (ellipse — hình elip)

PT chuẩn (tâm O, trục lớn 2a theo Ox, trục nhỏ 2b theo Oy, với $a > b$):

$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$

💡 **Định nghĩa theo 2 tiêu điểm**: elip = tập điểm M có **tổng khoảng cách đến 2 tiêu điểm $F_1, F_2$ là hằng số** $= 2a$. (Mẹo dây + 2 đinh: căng sợi dây dài $2a$ quanh 2 đinh tại $F_1, F_2$, kéo bút đi → vẽ ra elip.)

\`\`\`
   y
   ^          trục nhỏ 2b
   |      ___•(0,b)___
   |   /        |        \\
   | /          |          \\      M
 --+--•---------O--------•---+--> x
   |  F₁(-c,0)  |   F₂(c,0)  (a,0)   MF₁ + MF₂ = 2a (hằng)
   | \\          |          /
   |   \\____ (0,-b) _____/
   |        trục lớn 2a (theo Ox)
   |  c² = a² − b²   (TRỪ)
\`\`\`

- **Tâm sai (eccentricity) $e = c/a$** với $c = \\sqrt{a^2 - b^2}$ (TRỪ). $e$ càng gần 0 → càng "tròn".
- $e = 0$: đường tròn ($a = b$, hai tiêu điểm trùng tâm).
- Tiêu điểm nằm trên **trục lớn**, tại $(\\pm c, 0)$.

#### 3.2.1. 4 ví dụ nhận dạng & tìm yếu tố elip

- $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$: $a^2=25 \\to a=5$, $b^2=9 \\to b=3$, $c=\\sqrt{25-9}=4$. Tiêu điểm $(\\pm 4, 0)$, $e = 4/5 = 0.8$.
- $\\dfrac{x^2}{4} + \\dfrac{y^2}{1} = 1$: $a=2$, $b=1$, $c=\\sqrt{4-1}=\\sqrt 3 \\approx 1.73$. Tiêu điểm $(\\pm\\sqrt 3, 0)$, $e \\approx 0.87$ (khá dẹt).
- $\\dfrac{x^2}{16} + \\dfrac{y^2}{16} = 1$: $a=b=4 \\to c=0$ → **đường tròn** bán kính 4, $e=0$.
- $9x^2 + 4y^2 = 36$: chia 2 vế cho 36 → $\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1$. Ở đây mẫu lớn ($9$) nằm dưới $y^2$ → **trục lớn theo Oy**: $a^2=9 \\to a=3$ (dọc), $b=2$, $c=\\sqrt{9-4}=\\sqrt 5$, tiêu điểm $(0, \\pm\\sqrt 5)$.

**Ứng dụng**: quỹ đạo hành tinh (Kepler) — Mặt Trời ở 1 tiêu điểm. Phòng "thì thầm" (whispering room).

### 3.3. Hypebol (hyperbola)

PT chuẩn:

$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$

💡 **Định nghĩa theo 2 tiêu điểm**: hypebol = tập điểm M có **hiệu (trị tuyệt đối) khoảng cách đến 2 tiêu điểm là hằng số** $= 2a$, tức $|MF_1 - MF_2| = 2a$. Khác elip ở chữ **hiệu** thay vì **tổng**.

\`\`\`
   y           tiệm cận y = +(b/a)x
   ^          /
   |  \\      /         2 nhánh mở sang trái & phải
   |   \\    /          đỉnh tại (±a, 0)
   |    \\  /
 --+--•--\\/--•------•--•--> x
   |  F₁ /\\  (-a,0) (a,0) F₂(c,0)
   |    /  \\
   |   /    \\         |MF₁ − MF₂| = 2a (hằng)
   |  /      \\        c² = a² + b²   (CỘNG!)
   tiệm cận y = −(b/a)x
\`\`\`

Đặc trưng: 2 nhánh, 2 **tiệm cận (asymptote)** $y = \\pm\\frac{b}{a}\\cdot x$. $c = \\sqrt{a^2 + b^2}$ (**CỘNG**, khác elip), tiêu điểm $(\\pm c, 0)$, $e = c/a > 1$.

#### 3.3.1. 4 ví dụ nhận dạng & tìm yếu tố hypebol

- $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$: $a=4$, $b=3$, $c=\\sqrt{16+9}=5$. Đỉnh $(\\pm 4, 0)$, tiêu điểm $(\\pm 5, 0)$, tiệm cận $y = \\pm\\frac34 x$, $e = 5/4 = 1.25$.
- $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$: $a=3$, $b=4$, $c=\\sqrt{9+16}=5$. Tiệm cận $y = \\pm\\frac43 x$, $e = 5/3 \\approx 1.67$.
- $x^2 - y^2 = 1$: $a=b=1$, $c=\\sqrt 2$. Tiệm cận $y = \\pm x$ (hypebol "vuông" — equilateral), $e = \\sqrt 2 \\approx 1.41$.
- $xy = 1$: cũng là hypebol (xoay 45°), 2 nhánh ở QI và QIII, tiệm cận là 2 trục Ox, Oy — chính là đồ thị hàm $y = 1/x$.

**Ứng dụng**: định vị GPS / LORAN (hiệu thời gian tới 2 trạm → quỹ tích hypebol), ống làm mát nhà máy điện (mặt hyperboloid).

### 3.4. Verify bằng số — phân biệt ellipse và hyperbola

**Ellipse** $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ (dấu **+**): $a^2 = 25$ (mẫu lớn hơn dưới $x^2$) → $a = 5$, $b^2 = 9 \\to b = 3$. $c = \\sqrt{a^2-b^2} = \\sqrt{25-9} = $ **4**. Tâm sai $e = c/a = 4/5 = 0.8 < 1$. Tiêu điểm $(\\pm 4, 0)$. Điểm $(5,0)$ và $(0,3)$ đều thuộc: $25/25+0 = 1$ ✓; $0+9/9 = 1$ ✓.

**Hyperbola** $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ (dấu **−**): $a^2 = 16 \\to a = 4$, $b^2 = 9 \\to b = 3$. $c = \\sqrt{a^2+b^2} = \\sqrt{16+9} = $ **5** (chú ý: **cộng**, khác ellipse). Tiệm cận $y = \\pm\\frac{3}{4}x$. Tâm sai $e = c/a = 5/4 = 1.25 > 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết $a^2$ là số dưới $x^2$ hay $y^2$?"* Với **ellipse**, $a^2$ là mẫu **lớn hơn** ($a \\ge b$, a theo trục lớn). Với **hyperbola** $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$, $a^2$ luôn ở số hạng **dương** (trước dấu trừ).
- *"c tính cộng hay trừ?"* Ellipse: $c^2 = a^2 - b^2$ (trừ). Hyperbola: $c^2 = a^2 + b^2$ (cộng). Đây là chỗ hay nhầm nhất.
- *"Tâm sai e nói lên gì?"* $e$ đo "độ dẹt": ellipse $e < 1$ ($e=0$ là tròn, $e\\to 1$ là rất dẹt); parabol $e=1$; hyperbola $e > 1$.

⚠ **Lỗi thường gặp**

**Lỗi 1 — nhầm dấu khi tính c.** Ellipse: $c^2 = a^2 - b^2$ (TRỪ). Hyperbola: $c^2 = a^2 + b^2$ (CỘNG). Phản ví dụ: với $\\frac{x^2}{25} - \\frac{y^2}{9} = 1$ (hyperbola), lấy $c = \\sqrt{25-9} = 4$ là **sai** — phải cộng: $c = \\sqrt{25+9} = \\sqrt{34} \\approx 5.83$. Còn $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ (ellipse) mới là $c = \\sqrt{25-9} = 4$.

**Lỗi 2 — nhầm a, b trong elip (lấy $a$ là mẫu dưới $x^2$ một cách máy móc).** Với elip, $a$ luôn ứng **trục lớn** = mẫu **lớn hơn**, bất kể nó nằm dưới $x^2$ hay $y^2$. Phản ví dụ: $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$ có mẫu lớn (9) dưới $y^2$ → $a = 3$ (theo Oy), $b = 2$, tiêu điểm $(0, \\pm\\sqrt 5)$ — **không** phải $(\\pm\\sqrt 5, 0)$. Lấy $a^2 = 4$ vì "ở dưới $x^2$" là sai.

**Lỗi 3 — quên bình phương khi đọc bán kính/đỉnh.** Mẫu là $a^2$, không phải $a$: $\\frac{x^2}{16} - \\frac{y^2}{9}=1$ có $a = \\sqrt{16} = 4$ (đỉnh tại $\\pm 4$), không phải 16.

🔁 **Dừng lại tự kiểm tra**

1. Ellipse $\\frac{x^2}{16} + \\frac{y^2}{4} = 1$. Tìm a, b, c và tâm sai.
2. Hyperbola $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$. Tìm a, b, c và phương trình tiệm cận.
3. Parabol $y^2 = 12x$. Tìm tiêu điểm và đường chuẩn.

<details><summary>Đáp án</summary>

1. $a^2=16 \\to a=4$, $b^2=4 \\to b=2$, $c = \\sqrt{16-4} = \\sqrt{12} = 2\\sqrt{3} \\approx 3.46$. $e = \\frac{2\\sqrt{3}}{4} = \\frac{\\sqrt{3}}{2} \\approx$ **0.87**.
2. $a^2=9 \\to a=3$, $b^2=16 \\to b=4$, $c = \\sqrt{9+16} = $ **5**. Tiệm cận $y = \\pm\\frac{4}{3}x$.
3. $y^2 = 2px$ với $2p = 12 \\Rightarrow p = 6$. Tiêu điểm $F(\\frac p2, 0) = $ **(3, 0)**, đường chuẩn $x = -3$.

</details>

### 📝 Tóm tắt mục 3

- 3 conic sinh từ mặt cắt nón ở các góc khác nhau; cũng phân theo tâm sai $e$ ($e<1$ elip, $e=1$ parabol, $e>1$ hypebol).
- **Parabol** $y = ax^2+bx+c$ hoặc $y^2=2px$: cách đều 1 tiêu điểm và 1 đường chuẩn ($e = 1$); $y^2=2px$ có $F(\\frac p2,0)$, chuẩn $x=-\\frac p2$.
- **Elip** $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ (dấu +): 2 tiêu điểm, **tổng** khoảng = 2a, **$c^2 = a^2-b^2$** (trừ), $e < 1$; $a$ ứng mẫu **lớn hơn**.
- **Hypebol** $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ (dấu −): 2 nhánh, **hiệu** khoảng = 2a, **$c^2 = a^2+b^2$** (cộng!), $e > 1$, tiệm cận $y = \\pm\\frac{b}{a}x$.

#### Bảng so sánh 3 conic

| Yếu tố | Parabol | Elip | Hypebol |
|--------|---------|------|---------|
| PT chuẩn | $y^2 = 2px$ | $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ | $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ |
| Dấu | — | $+$ | $-$ |
| Định nghĩa | $MF = d(M,d)$ | $MF_1+MF_2 = 2a$ | $|MF_1-MF_2| = 2a$ |
| Số tiêu điểm | 1 | 2 | 2 |
| Tính $c$ | — | $c^2 = a^2 - b^2$ | $c^2 = a^2 + b^2$ |
| Tâm sai $e$ | $= 1$ | $< 1$ | $> 1$ |
| Tiệm cận | không | không | $y = \\pm\\frac ba x$ |

---

## 4. Bài tập

### Bài tập

**Bài 1**: A(1, 2), B(4, 6). Tính khoảng cách AB và trung điểm.

**Bài 2**: Viết PT đường thẳng qua A(2, 3) với hệ số góc 5.

**Bài 3**: Viết PT đường thẳng qua A(1, 2) và B(4, 8).

**Bài 4**: PT y = 2x + 3 và y = ax − 1 vuông góc. Tìm a.

**Bài 5**: Ellipse $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$. Tìm a, b, c, tâm sai.

**Bài 6**: Cho A(−2, 1), B(6, 7). Tìm trung điểm M của AB và hệ số góc của đường thẳng AB.

**Bài 7**: Viết PT đường tròn tâm $I(3, -2)$ đi qua điểm $A(7, 1)$.

**Bài 8**: Hyperbola $\\frac{x^2}{36} - \\frac{y^2}{64} = 1$. Tìm a, b, c, phương trình tiệm cận và tâm sai.

**Bài 9**: Parabol $y^2 = 20x$. Tìm tiêu điểm, đường chuẩn và đỉnh.

**Bài 10**: Cho elip $4x^2 + 9y^2 = 36$. Đưa về dạng chuẩn rồi cho biết trục lớn nằm theo trục nào, tìm tiêu điểm.

### Lời giải

**Bài 1**: $d = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9+16} = $ **5**. $M = (2.5, 4)$.

**Bài 2**: $y - 3 = 5(x - 2) \\to y = $ **5x − 7**.

**Bài 3**: Hệ số góc $= \\frac{8-2}{4-1} = 2$. $y - 2 = 2(x - 1) \\to y = $ **2x**.

**Bài 4**: $a_1\\cdot a_2 = -1 \\to 2\\cdot a = -1 \\to$ **a = −1/2**.

**Bài 5**: $a^2 = 25 \\to a = 5$. $b^2 = 9 \\to b = 3$. $c = \\sqrt{25-9} = 4$. Tâm sai $e = c/a = $ **0.8**. Tiêu điểm tại $(\\pm 4, 0)$.

**Bài 6**: Trung điểm $M = \\left(\\frac{-2+6}{2}, \\frac{1+7}{2}\\right) = $ **(2, 4)**. Hệ số góc $a = \\frac{7-1}{6-(-2)} = \\frac{6}{8} = $ **3/4**.

**Bài 7**: Bán kính $R = IA = \\sqrt{(7-3)^2 + (1-(-2))^2} = \\sqrt{16+9} = 5$. PT: $(x-3)^2 + (y+2)^2 = $ **25** (nhớ $R^2 = 25$, và $y - (-2) = y+2$).

**Bài 8**: $a^2 = 36 \\to a = 6$, $b^2 = 64 \\to b = 8$. Hyperbola → **cộng**: $c = \\sqrt{36+64} = \\sqrt{100} = $ **10**. Tiệm cận $y = \\pm\\frac{b}{a}x = \\pm\\frac{8}{6}x = \\pm\\frac{4}{3}x$. Tâm sai $e = c/a = 10/6 = $ **5/3 ≈ 1.67**.

**Bài 9**: $y^2 = 2px$ với $2p = 20 \\Rightarrow p = 10$. Tiêu điểm $F\\left(\\frac p2, 0\\right) = $ **(5, 0)**, đường chuẩn $x = -5$, đỉnh $O(0,0)$, mở sang phải.

**Bài 10**: Chia 2 vế cho 36: $\\frac{4x^2}{36} + \\frac{9y^2}{36} = 1 \\Rightarrow \\frac{x^2}{9} + \\frac{y^2}{4} = 1$. Mẫu lớn (9) dưới $x^2$ → **trục lớn theo Ox**. $a^2 = 9 \\to a = 3$, $b^2 = 4 \\to b = 2$, elip → **trừ**: $c = \\sqrt{9-4} = \\sqrt 5 \\approx 2.24$. Tiêu điểm $(\\pm\\sqrt 5, 0)$.

---

## 5. Bài tiếp theo

[Lesson 07 — Tọa độ Oxyz](../lesson-07-coordinate-3d/).

## 📝 Tổng kết

1. **Oxy**: mỗi điểm $= (x, y)$; 4 góc phần tư theo dấu. $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$ (Pythagoras); trung điểm = trung bình cộng; hệ số góc $a = \\Delta y/\\Delta x$.
2. **Đường thẳng**: $y = ax + b$. Song song: $a_1 = a_2$; vuông góc: $a_1 a_2 = -1$. Đứng $x=k$ không có hệ số góc.
3. **Đường tròn**: $(x-x_0)^2 + (y-y_0)^2 = R^2$ (tâm $I$, bán kính $R$); vế phải là $R^2$.
4. **Parabol** $y = ax^2 + bx + c$ / $y^2 = 2px$: cách đều 1 tiêu điểm và 1 đường chuẩn ($e=1$).
5. **Elip** $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$: 2 tiêu điểm, **tổng** khoảng = 2a, $c^2=a^2-b^2$, $e<1$.
6. **Hypebol** $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$: 2 nhánh, **hiệu** khoảng = 2a, $c^2=a^2+b^2$ (cộng!), $e>1$, tiệm cận $y=\\pm\\frac ba x$.
`;
