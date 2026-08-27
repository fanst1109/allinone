// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-05-multiple-integrals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Tích phân kép & bội

## Mục tiêu

- Hiểu **tích phân kép** $\\iint f(x,y)\\,dA$ — thể tích dưới mặt cong.
- Tính tích phân kép bằng tích phân lặp.
- Đổi biến (tọa độ cực).
- Tích phân bội (3 biến trở lên).

## Kiến thức tiền đề

- [Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/), [T4 L07-08 — Tích phân](../../04-Calculus-1var/lesson-07-definite-integral/).

---

## 1. Tích phân kép — Định nghĩa

💡 **Trực giác — cộng các cột mỏng trên miền 2D**: Tích phân 1 biến $\\int_a^b f(x)\\,dx$ = diện tích dưới đồ thị (cộng các **dải mỏng** chiều rộng $dx$, chiều cao $f(x)$). **Tích phân kép** $\\iint_D f(x,y)\\,dA$ = **thể tích** dưới mặt cong $z = f(x,y)$ trên miền $D \\subset \\mathbb{R}^2$. Hình dung: trên mỗi ô nhỏ $dA = dx\\,dy$ của sàn nhà (miền $D$), dựng một **cột** cao $f(x,y)$ — như một cột nước/cột gỗ tí hon. Tích phân kép = **cộng thể tích tất cả các cột** đó. Ô càng nhỏ, tổng càng chính xác; cho ô $\\to 0$ thì tổng $\\to$ thể tích thật.

<svg viewBox="0 0 500 285" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Thể tích dưới mặt cong z = f(x,y): sàn D chia ô nhỏ dA, mỗi ô dựng một cột cao f(x,y); tích phân bội là tổng thể tích các cột">
  <defs></defs>
  <path d="M 60.0,230.0 L 360.0,230.0 L 440.0,160.0 L 140.0,160.0 Z" fill="#94a3b8" stroke="#94a3b8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <text x="400.0" y="225.0" fill="#475569" font-size="12" text-anchor="end">miền D (sàn), chia ô dA</text>
  <rect x="90.0" y="162.0" width="40.0" height="60.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="90,162 130,162 142,153 102,153" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="116.0" y="113.9" width="40.0" height="86.1" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="116,113 156,113 168,104 128,104" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="142.0" y="73.4" width="40.0" height="104.6" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="142,73 182,73 194,64 154,64" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="160.0" y="142.4" width="40.0" height="79.6" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="160,142 200,142 212,133 172,133" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="186.0" y="105.0" width="40.0" height="95.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="186,105 226,105 238,96 198,96" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="212.0" y="79.4" width="40.0" height="98.6" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="212,79 252,79 264,70 224,70" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="230.0" y="137.7" width="40.0" height="84.3" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="230,137 270,137 282,128 242,128" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="256.0" y="115.0" width="40.0" height="85.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="256,115 296,115 308,106 268,106" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="282.0" y="99.5" width="40.0" height="78.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="282,99 322,99 334,90 294,90" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="300.0" y="151.3" width="40.0" height="70.7" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="300,151 340,151 352,142 312,142" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="326.0" y="136.4" width="40.0" height="63.6" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="326,136 366,136 378,127 338,127" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="352.0" y="118.5" width="40.0" height="59.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <polygon points="352,118 392,118 404,109 364,109" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1"/>
  <path d="M 90.0,150.0 L 100.0,140.8 L 110.0,131.9 L 120.0,123.8 L 130.0,116.8 L 140.0,111.0 L 150.0,106.8 L 160.0,104.0 L 170.0,102.7 L 180.0,102.9 L 190.0,104.2 L 200.0,106.6 L 210.0,109.7 L 220.0,113.3 L 230.0,117.1 L 240.0,120.9 L 250.0,124.7 L 260.0,128.2 L 270.0,131.5 L 280.0,134.7 L 290.0,137.7 L 300.0,140.8 L 310.0,144.1 L 320.0,147.7 L 330.0,151.8 L 340.0,156.4 L 350.0,161.5 L 360.0,167.1 L 370.0,173.1 L 380.0,179.1 L 390.0,185.1 L 400.0,190.7 L 410.0,195.5 L 420.0,199.4 L 430.0,201.9 L 440.0,203.0" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="420.0" y="60.0" fill="#dc2626" font-size="13" text-anchor="end" font-weight="700">z = f(x,y): mặt cong (nóc nhà)</text>
  <text x="250.0" y="268.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">mỗi cột: đáy dA, cao f(x,y)  →  ∬ f dA = cộng thể tích mọi cột</text>
</svg>

So với tích phân đơn: $\\int_a^b f\\,dx$ cộng **dải** (2D, ra diện tích); $\\iint_D f\\,dA$ cộng **cột** (3D, ra thể tích). Tăng 1 chiều ở cả input (miền) lẫn output (đo lường).

### Định nghĩa Riemann

Chia $D$ thành $n\\times n$ ô vuông nhỏ $\\Delta A$. Lấy tổng $f\\cdot\\Delta A$. Khi $n \\to \\infty$:

$$\\iint_D f(x, y)\\,dA = \\lim_{n\\to\\infty} \\sum f(x_i, y_j)\\cdot\\Delta A$$

> 📐 **Định nghĩa đầy đủ — Tích phân kép $\\iint_D f\\,dA$**
>
> **(a) Là gì**: Mở rộng tích phân 1 biến lên 2 biến. Tổng Riemann 2D: chia miền $D$ thành $n^2$ ô nhỏ $\\Delta A$, cộng $f\\cdot\\Delta A$, lấy giới hạn $n \\to \\infty$. Hình học = **thể tích** khối nằm dưới mặt cong $z = f(x,y)$ trên miền $D$ (nếu $f \\ge 0$; có thể âm).
>
> **(b) Vì sao cần**: Rất nhiều đại lượng "phân bố trên 1 miền 2D" cần tổng hợp: khối lượng tấm phẳng có mật độ $\\rho(x,y)$, tổng nhiệt năng trên 1 vùng, lượng nước rơi trên 1 vùng theo mật độ mưa, xác suất $P(X,Y \\in D)$ trong xác suất nhiều biến. Tích phân 1 biến không đủ — phải mở rộng. Fubini cho phép biến tích phân kép thành 2 tích phân lặp (đơn) — tính được.
>
> **(c) Ví dụ số**: $\\iint_{[0,1]\\times[0,2]} (x+2y)\\,dA$. Trong (theo $y$): $\\int_0^2 (x+2y)\\,dy = 2x + 4$. Ngoài (theo $x$): $\\int_0^1 (2x+4)\\,dx = \\mathbf{5}$. Diện tích đĩa bán kính 3: $\\iint_D 1\\,dA$ dùng tọa độ cực $= \\int_0^{2\\pi}\\int_0^3 r\\,dr\\,d\\theta = \\pi\\cdot 9 = \\mathbf{9\\pi}$ ✓ ($= \\pi R^2$). Thể tích cầu $R$: $\\iiint 1\\,dV$ bằng toạ độ cầu $= \\frac{4}{3}\\pi R^3$. Khối lượng đĩa mật độ $\\rho = r$ (đặc hơn ở rìa): $M = \\int_0^{2\\pi}\\int_0^R r\\cdot r\\,dr\\,d\\theta = \\frac{2\\pi}{3}R^3$.

#### Bảng đối chiếu: tích phân đơn vs kép vs ba

| Loại | Ký hiệu | Miền tích phân | $f=1$ cho ra | Phần tử | "Cộng" cái gì |
|------|---------|----------------|--------------|---------|---------------|
| Đơn | $\\int_a^b f\\,dx$ | đoạn $[a,b]$ (1D) | độ dài $b-a$ | $dx$ | dải mỏng (diện tích) |
| Kép | $\\iint_D f\\,dA$ | miền $D$ (2D) | diện tích $D$ | $dA = dx\\,dy$ | cột mỏng (thể tích) |
| Ba | $\\iiint_V f\\,dV$ | khối $V$ (3D) | thể tích $V$ | $dV = dx\\,dy\\,dz$ | "hộp" 4D (siêu thể tích) |

Mỗi lần tăng 1 chiều: miền tăng 1 chiều, và khi $f=1$ thì kết quả là "kích thước" của miền (độ dài → diện tích → thể tích).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân kép khác gì 2 lần tích phân đơn?"* Tích phân kép quét trên **cả miền 2D** (cộng $f\\cdot\\Delta A$ của mọi ô nhỏ). Fubini cho phép tính nó **bằng** 2 tích phân đơn lồng nhau — đó là kỹ thuật tính, còn ý nghĩa là tổng trên 2D.
- *"$f$ âm thì $\\iint$ ra gì?"* Phần $f < 0$ đóng góp **âm** (thể tích "dưới mặt xy" tính trừ). Nếu cần thể tích thực luôn dương, lấy $\\iint|f|$.
- *"Vì sao viết $dA$ chứ không luôn là $dx\\,dy$?"* $dA$ là **phần tử diện tích** trừu tượng, không gắn với hệ tọa độ nào. Trong Descartes $dA = dx\\,dy$; trong cực $dA = r\\,dr\\,d\\theta$. Viết $dA$ để công thức đúng với mọi hệ, rồi mới thay biểu thức cụ thể khi tính (xem mục 4).

⚠ **Lỗi thường gặp — quên $dA = dx\\cdot dy$ (hệ tọa độ Descartes), nhầm sang cực mà bỏ r**. Trong tọa độ cực $dA = \\mathbf{r\\cdot dr\\cdot d\\theta}$ (có thừa số $r$), KHÔNG phải $dr\\cdot d\\theta$. Phản ví dụ: diện tích đĩa bán kính 3 $= \\iint r\\,dr\\,d\\theta = 9\\pi$; nếu quên $r$: $\\iint dr\\,d\\theta = 3\\cdot 2\\pi = 6\\pi$ (sai).

🔁 **Dừng lại tự kiểm tra**

1. $\\iint_D 1\\,dA$ với $D$ = hình chữ nhật $[0,2]\\times[0,3]$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

= diện tích hình chữ nhật $= 2\\cdot 3 = \\mathbf{6}$. ($\\int_0^2\\int_0^3 1\\,dy\\,dx = \\int_0^2 3\\,dx = 6$.)

</details>

### 📝 Tóm tắt mục 1

- $\\iint_D f\\,dA$ = tổng $f\\cdot\\Delta A$ trên cả miền 2D = thể tích dưới mặt cong (nếu $f \\ge 0$).
- Fubini biến tích phân kép thành 2 tích phân đơn lồng nhau.
- $\\iint_D 1\\,dA$ = diện tích $D$; phần $f < 0$ đóng góp âm.

---

## 2. Tính bằng tích phân lặp (iterated integral)

💡 **Trực giác / Hình dung — tích phân từng lớp**: cắt khối thể tích thành các "lát mỏng". Với mỗi $x$ cố định, lát theo $y$ có diện tích $A(x) = \\int f\\,dy$. Cộng tất cả các lát ($\\int A(x)\\,dx$) ra thể tích. Giống đo thể tích ổ bánh mì bằng cách cộng diện tích từng lát cắt × độ dày.

<svg viewBox="0 0 580 255" style="max-width:580px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Nguyên lý Fubini: khối 3D dưới mặt cong cắt thành các lát mỏng theo x, mỗi lát có diện tích A(x) = ∫ f dy; cộng A(x)·dx cho thể tích">
  <defs><marker id="ar7" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="120.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Khối 3D dưới mặt cong</text>
  <polygon points="40,180 200,180 240,140 80,140" fill="#94a3b8" fill-opacity="0.25" stroke="#94a3b8"/>
  <rect x="40.0" y="80.0" width="160.0" height="100.0" rx="0" fill="#93c5fd" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="1.5"/>
  <polygon points="40,80 200,80 240,40 80,40" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.5"/>
  <polygon points="200,80 240,40 240,140 200,180" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="255.0" y1="110.0" x2="295.0" y2="110.0" stroke="#475569" stroke-width="2" marker-end="url(#ar7)"/>
  <text x="275.0" y="100.0" fill="#475569" font-size="11" text-anchor="middle">cắt lát</text>
  <text x="430.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Cắt thành lát theo x</text>
  <rect x="320.0" y="110.0" width="30.0" height="70.0" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="335.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <rect x="356.0" y="97.1" width="30.0" height="82.9" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="371.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <rect x="392.0" y="92.0" width="30.0" height="88.0" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="407.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <rect x="428.0" y="97.8" width="30.0" height="82.2" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="443.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <rect x="464.0" y="111.1" width="30.0" height="68.9" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="479.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <rect x="500.0" y="123.6" width="30.0" height="56.4" rx="0" fill="#dcfce7" fill-opacity="0.8" stroke="#15803d" stroke-width="1.5"/>
  <text x="515.0" y="150.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">A</text>
  <line x1="310.0" y1="182.0" x2="545.0" y2="182.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar7)"/>
  <text x="320.0" y="198.0" fill="#475569" font-size="12" text-anchor="middle">a</text>
  <text x="530.0" y="198.0" fill="#475569" font-size="12" text-anchor="middle">b</text>
  <text x="550.0" y="186.0" fill="#475569" font-size="12" text-anchor="start">x</text>
  <text x="430.0" y="222.0" fill="#475569" font-size="11" text-anchor="middle">mỗi lát: mặt phẳng x = const, diện tích A(x) = ∫ f(x,y) dy</text>
  <text x="430.0" y="240.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">cộng A(x)·dx từ a đến b → thể tích  =  ∫ₐᵇ A(x) dx</text>
</svg>

Hai bước rời rạc: **(1)** "tích phân trong" $\\int_c^d f\\,dy$ — coi $x$ là **hằng số** — ra diện tích lát $A(x)$, một biểu thức theo $x$; **(2)** "tích phân ngoài" $\\int_a^b A(x)\\,dx$ — cộng mọi lát — ra một **số**. Đổi thứ tự = cắt lát theo $y$ thay vì theo $x$; cùng khối nên cùng thể tích.

🎯 **Định lý Fubini**: Nếu $f$ đủ "đẹp" và $D = [a,b] \\times [c,d]$ (hình chữ nhật):

$$\\iint_D f\\,dA = \\int_a^b \\left[\\int_c^d f(x, y)\\,dy\\right] dx = \\int_c^d \\left[\\int_a^b f(x, y)\\,dx\\right] dy$$

Tính tích phân trong trước (theo 1 biến, biến kia hằng), rồi tích phân ngoài.

### Ví dụ

$$\\iint_{[0,1]\\times[0,2]} (x + 2y)\\,dA$$

Tính trong (theo $y$):

$$\\int_0^2 (x + 2y)\\,dy = \\left[xy + y^2\\right]_0^2 = 2x + 4$$

Tính ngoài (theo $x$):

$$\\int_0^1 (2x + 4)\\,dx = \\left[x^2 + 4x\\right]_0^1 = 5$$

⟶ Kết quả = **5**.

**Verify đổi thứ tự** (Fubini nói kết quả không đổi): tính trong theo $x$ trước. $\\int_0^1 (x+2y)\\,dx = \\left[\\frac{x^2}{2} + 2yx\\right]_0^1 = \\frac{1}{2} + 2y$. Ngoài theo $y$: $\\int_0^2 \\left(\\frac{1}{2} + 2y\\right)\\,dy = \\left[\\frac{y}{2} + y^2\\right]_0^2 = 1 + 4 = \\mathbf{5}$ ✓. Hai thứ tự cho cùng đáp số.

#### Walk-through 4 ví dụ tích phân kép trên hình chữ nhật

Chạy đủ 2 bước (trong → ngoài) trên miền chữ nhật, để thấy quy trình ổn định với nhiều dạng hàm khác nhau.

**Ví dụ 1 (hàm hằng)**: $\\iint_{[0,3]\\times[0,2]} 5\\,dA$.
- Trong (theo $y$, coi $x$ hằng): $\\int_0^2 5\\,dy = \\left[5y\\right]_0^2 = 10$.
- Ngoài (theo $x$): $\\int_0^3 10\\,dx = \\left[10x\\right]_0^3 = \\mathbf{30}$.
- **Kiểm tra ý nghĩa**: hàm hằng $f = 5$ trên đáy diện tích $3\\times 2 = 6$ → khối hộp thể tích $5\\cdot 6 = 30$ ✓. Hàm hằng = "nóc nhà phẳng".

**Ví dụ 2 (tách được — separable)**: $\\iint_{[0,1]\\times[0,3]} x^2 y\\,dA$.
- Trong (theo $y$): $\\int_0^3 x^2 y\\,dy = x^2\\left[\\frac{y^2}{2}\\right]_0^3 = x^2\\cdot\\frac{9}{2} = \\frac{9x^2}{2}$.
- Ngoài (theo $x$): $\\int_0^1 \\frac{9x^2}{2}\\,dx = \\frac{9}{2}\\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{9}{2}\\cdot\\frac{1}{3} = \\mathbf{\\dfrac{3}{2}}$.
- **Mẹo separable**: vì $f = x^2\\cdot y$ tách thành (hàm chỉ theo $x$)×(hàm chỉ theo $y$) trên hình chữ nhật, tích phân kép **bằng tích 2 tích phân đơn**: $\\left(\\int_0^1 x^2 dx\\right)\\left(\\int_0^3 y\\,dy\\right) = \\frac{1}{3}\\cdot\\frac{9}{2} = \\frac{3}{2}$ ✓.

**Ví dụ 3 (chứa $e^x$, tách được)**: $\\iint_{[0,1]\\times[0,1]} e^x\\cos y\\,dA$.
- Trong (theo $y$): $\\int_0^1 e^x\\cos y\\,dy = e^x\\left[\\sin y\\right]_0^1 = e^x\\sin 1$.
- Ngoài (theo $x$): $\\int_0^1 e^x\\sin 1\\,dx = \\sin 1\\left[e^x\\right]_0^1 = \\sin 1\\,(e - 1) \\approx 0.8415\\cdot 1.718 \\approx \\mathbf{1.446}$.

**Ví dụ 4 (không tách được — phải tích phân lồng)**: $\\iint_{[0,2]\\times[0,1]} (x + y)^2\\,dA$.
- Trong (theo $y$, $x$ hằng): $\\int_0^1 (x+y)^2\\,dy = \\left[\\frac{(x+y)^3}{3}\\right]_0^1 = \\frac{(x+1)^3 - x^3}{3}$.
- Khai triển tử: $(x+1)^3 - x^3 = (x^3 + 3x^2 + 3x + 1) - x^3 = 3x^2 + 3x + 1$. Vậy lát $A(x) = \\frac{3x^2 + 3x + 1}{3} = x^2 + x + \\frac{1}{3}$.
- Ngoài (theo $x$): $\\int_0^2 \\left(x^2 + x + \\frac{1}{3}\\right)dx = \\left[\\frac{x^3}{3} + \\frac{x^2}{2} + \\frac{x}{3}\\right]_0^2 = \\frac{8}{3} + 2 + \\frac{2}{3} = \\frac{10}{3} + 2 = \\mathbf{\\dfrac{16}{3}}$.
- **Vì sao không tách**: $(x+y)^2 = x^2 + 2xy + y^2$ có hạng tử chéo $2xy$ — không viết được thành (hàm $x$)×(hàm $y$), nên không dùng mẹo separable mà phải tích phân lồng đầy đủ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi thứ tự tích phân luôn cho cùng kết quả?"* Trên hình chữ nhật và $f$ "đẹp": **luôn** (Fubini). Trên miền cong, đổi thứ tự thì **cận tích phân thay đổi** theo (xem mục 3) — phải tính lại cận, nhưng kết quả cuối vẫn bằng nhau.
- *"Khi nào chọn thứ tự nào?"* Chọn thứ tự khiến tích phân **trong dễ tính hơn** hoặc cận đơn giản hơn. Đây là kỹ năng quan trọng khi gặp miền cong.

⚠ **Lỗi thường gặp — coi biến ngoài là hằng nhưng quên thế cận đúng**. Khi tính tích phân trong, biến ngoài là **hằng** (giữ nguyên trong biểu thức), nhưng cận của tích phân trong có thể **phụ thuộc** biến ngoài (miền cong). Trên hình chữ nhật thì cận là số cố định.

🔁 **Dừng lại tự kiểm tra**

1. Tính $\\int_0^1 \\int_0^1 (x + y)\\,dy\\,dx$.

<details><summary>Đáp án</summary>

Trong: $\\int_0^1 (x+y)\\,dy = \\left[xy + \\frac{y^2}{2}\\right]_0^1 = x + \\frac{1}{2}$. Ngoài: $\\int_0^1 \\left(x + \\frac{1}{2}\\right)\\,dx = \\left[\\frac{x^2}{2} + \\frac{x}{2}\\right]_0^1 = \\frac{1}{2} + \\frac{1}{2} = \\mathbf{1}$.

</details>

### 📝 Tóm tắt mục 2

- Fubini: tính tích phân trong (1 biến, biến kia hằng) rồi tích phân ngoài.
- Đổi thứ tự cho cùng kết quả (hình chữ nhật, $f$ đẹp); chọn thứ tự dễ tính hơn.
- Tích phân trong: biến ngoài là hằng, nhưng cận có thể phụ thuộc nó (miền cong).

---

## 3. Miền không-chữ-nhật

💡 **Trực giác / Hình dung**: với miền cong (tam giác, hình quạt...), cận của biến trong **không cố định** mà "men theo đường biên". Cố định $x$, biến $y$ chạy từ biên dưới $g(x)$ tới biên trên $h(x)$ — cận là **hàm của $x$**. Như quét từng cột dọc qua hình, mỗi cột cao thấp khác nhau.

Nếu $D = \\{(x, y) : a \\le x \\le b,\\ g(x) \\le y \\le h(x)\\}$ (đường biên $y = g, h$):

$$\\iint_D f\\,dA = \\int_a^b \\left[\\int_{g(x)}^{h(x)} f(x, y)\\,dy\\right] dx$$

**Ví dụ**: Tính $\\iint_T x\\cdot y\\,dA$, $T$ = tam giác $(0,0)$, $(1,0)$, $(1,1)$.
- $T$: $0 \\le x \\le 1$, $0 \\le y \\le x$.
- Trong: $\\int_0^x x\\cdot y\\,dy = x\\cdot\\left[\\frac{y^2}{2}\\right]_0^x = \\frac{x^3}{2}$.
- Ngoài: $\\int_0^1 \\frac{x^3}{2}\\,dx = \\frac{1}{8}$.

Miền $T$ và cách quét cột (cố định $x$, $y$ chạy từ $0$ lên đường $y = x$):

<svg viewBox="0 0 340 250" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền tam giác T: đỉnh (0,0), (1,0), (1,1); cột tại x chạy từ y = 0 lên y = x">
  <defs><marker id="ar8" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar8r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="198.0" y1="200.0" x2="198.0" y2="57.0"/>
<line x1="60.0" y1="90.0" x2="239.4" y2="90.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="261.4" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar8)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="35.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar8)"/>
  <text x="253.4" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="198.0" y1="196.0" x2="198.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="198.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="90.0" x2="64.0" y2="90.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="94.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 60.0,200.0 L 198.0,200.0 L 198.0,90.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 62.3,198.2 L 64.6,196.3 L 66.9,194.5 L 69.2,192.7 L 71.5,190.8 L 73.8,189.0 L 76.1,187.2 L 78.4,185.3 L 80.7,183.5 L 83.0,181.7 L 85.3,179.8 L 87.6,178.0 L 89.9,176.2 L 92.2,174.3 L 94.5,172.5 L 96.8,170.7 L 99.1,168.8 L 101.4,167.0 L 103.7,165.2 L 106.0,163.3 L 108.3,161.5 L 110.6,159.7 L 112.9,157.8 L 115.2,156.0 L 117.5,154.2 L 119.8,152.3 L 122.1,150.5 L 124.4,148.7 L 126.7,146.8 L 129.0,145.0 L 131.3,143.2 L 133.6,141.3 L 135.9,139.5 L 138.2,137.7 L 140.5,135.8 L 142.8,134.0 L 145.1,132.2 L 147.4,130.3 L 149.7,128.5 L 152.0,126.7 L 154.3,124.8 L 156.6,123.0 L 158.9,121.2 L 161.2,119.3 L 163.5,117.5 L 165.8,115.7 L 168.1,113.8 L 170.4,112.0 L 172.7,110.2 L 175.0,108.3 L 177.3,106.5 L 179.6,104.7 L 181.9,102.8 L 184.2,101.0 L 186.5,99.2 L 188.8,97.3 L 191.1,95.5 L 193.4,93.7 L 195.7,91.8 L 198.0,90.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="135.9" y="120.8" fill="#1d4ed8" font-size="12" text-anchor="end" font-weight="700">y = x</text>
  <line x1="142.8" y1="200.0" x2="142.8" y2="134.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar8r)"/>
  <line x1="142.8" y1="200.0" x2="142.8" y2="134.0" stroke="#dc2626" stroke-width="0"/>
  <text x="150.8" y="171.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">y: 0 → x</text>
  <circle cx="198.0" cy="90.0" r="4" fill="#dc2626"/>
  <text x="206.0" y="90.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="142.8" y="216.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <text x="170.0" y="238.0" fill="#475569" font-size="12" text-anchor="middle">cận: 0 ≤ x ≤ 1, 0 ≤ y ≤ x</text>
</svg>

#### Walk-through thêm 3 ví dụ miền tổng quát

Mỗi ví dụ: **(i)** vẽ/mô tả miền, **(ii)** quét cột tìm cận biến trong, **(iii)** tích phân trong → ngoài.

**Ví dụ A (miền dưới parabol)**: $\\iint_D 2x\\,dA$, $D = \\{0 \\le x \\le 2,\\ 0 \\le y \\le x^2\\}$.
- Cận: cố định $x$, $y$ đi từ $0$ (trục Ox) lên $x^2$ (đường parabol).

<svg viewBox="0 0 340 250" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền dưới parabol y = x² từ x = 0 đến 2: cột tại x chạy từ 0 lên x²">
  <defs><marker id="ar9" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar9r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="134.0" y1="200.0" x2="134.0" y2="57.4"/>
<line x1="208.0" y1="200.0" x2="208.0" y2="57.4"/>
<line x1="60.0" y1="169.0" x2="237.6" y2="169.0"/>
<line x1="60.0" y1="138.0" x2="237.6" y2="138.0"/>
<line x1="60.0" y1="107.0" x2="237.6" y2="107.0"/>
<line x1="60.0" y1="76.0" x2="237.6" y2="76.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="259.6" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="35.4" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
  <text x="251.6" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.4" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="134.0" y1="196.0" x2="134.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="134.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="208.0" y1="196.0" x2="208.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="208.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="56.0" y1="169.0" x2="64.0" y2="169.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="173.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="56.0" y1="138.0" x2="64.0" y2="138.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="142.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="56.0" y1="107.0" x2="64.0" y2="107.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="111.0" fill="#475569" font-size="11" text-anchor="end">3</text>
  <line x1="56.0" y1="76.0" x2="64.0" y2="76.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="80.0" fill="#475569" font-size="11" text-anchor="end">4</text>
  <path d="M 60.0,200.0 L 63.7,199.9 L 67.4,199.7 L 71.1,199.3 L 74.8,198.8 L 78.5,198.1 L 82.2,197.2 L 85.9,196.2 L 89.6,195.0 L 93.3,193.7 L 97.0,192.2 L 100.7,190.6 L 104.4,188.8 L 108.1,186.9 L 111.8,184.8 L 115.5,182.6 L 119.2,180.2 L 122.9,177.6 L 126.6,174.9 L 130.3,172.0 L 134.0,169.0 L 137.7,165.8 L 141.4,162.5 L 145.1,159.0 L 148.8,155.4 L 152.5,151.6 L 156.2,147.6 L 159.9,143.5 L 163.6,139.2 L 167.3,134.8 L 171.0,130.2 L 174.7,125.5 L 178.4,120.6 L 182.1,115.6 L 185.8,110.4 L 189.5,105.1 L 193.2,99.6 L 196.9,93.9 L 200.6,88.1 L 204.3,82.1 L 208.0,76.0 L 208.0,200.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 62.6,200.0 L 65.2,199.8 L 67.8,199.7 L 70.4,199.4 L 73.0,199.1 L 75.5,198.6 L 78.1,198.1 L 80.7,197.6 L 83.3,196.9 L 85.9,196.2 L 88.5,195.4 L 91.1,194.5 L 93.7,193.6 L 96.3,192.6 L 98.8,191.5 L 101.4,190.3 L 104.0,189.0 L 106.6,187.7 L 109.2,186.3 L 111.8,184.8 L 114.4,183.3 L 117.0,181.6 L 119.6,179.9 L 122.2,178.1 L 124.8,176.3 L 127.3,174.3 L 129.9,172.3 L 132.5,170.2 L 135.1,168.1 L 137.7,165.8 L 140.3,163.5 L 142.9,161.1 L 145.5,158.6 L 148.1,156.1 L 150.7,153.5 L 153.2,150.8 L 155.8,148.0 L 158.4,145.2 L 161.0,142.2 L 163.6,139.2 L 166.2,136.2 L 168.8,133.0 L 171.4,129.8 L 174.0,126.5 L 176.6,123.1 L 179.1,119.6 L 181.7,116.1 L 184.3,112.5 L 186.9,108.8 L 189.5,105.1 L 192.1,101.2 L 194.7,97.3 L 197.3,93.3 L 199.9,89.3 L 202.5,85.1 L 205.0,80.9 L 207.6,76.6 L 210.2,72.3 L 212.8,67.8 L 215.4,63.3" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="174.7" y="88.4" fill="#1d4ed8" font-size="12" text-anchor="end" font-weight="700">y = x²</text>
  <line x1="163.6" y1="200.0" x2="163.6" y2="139.2" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar9r)"/>
  <line x1="163.6" y1="200.0" x2="163.6" y2="139.2" stroke="#dc2626" stroke-width="0"/>
  <text x="171.6" y="173.6" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">0 ≤ y ≤ x²</text>
  <circle cx="208.0" cy="76.0" r="4" fill="#dc2626"/>
  <text x="216.0" y="76.0" fill="#475569" font-size="11" text-anchor="start">(2,4)</text>
</svg>

- Trong (theo $y$): $\\int_0^{x^2} 2x\\,dy = 2x\\left[y\\right]_0^{x^2} = 2x\\cdot x^2 = 2x^3$.
- Ngoài (theo $x$): $\\int_0^2 2x^3\\,dx = \\left[\\frac{x^4}{2}\\right]_0^2 = \\frac{16}{2} = \\mathbf{8}$.

**Ví dụ B (miền giữa 2 đường cong)**: $\\iint_D 1\\,dA$, $D$ kẹp giữa $y = x^2$ (dưới) và $y = x$ (trên), với $0 \\le x \\le 1$. (Đây cũng là diện tích vùng kẹp.)
- Trên $[0,1]$ thì $x \\ge x^2$ (vd $x=0.5$: $0.5 > 0.25$), nên $y$ chạy từ biên dưới $x^2$ lên biên trên $x$.

<svg viewBox="0 0 340 250" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền D kẹp giữa y = x² (dưới) và y = x (trên) trên [0,1]">
  <defs><marker id="ar10" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar10r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="198.0" y1="200.0" x2="198.0" y2="57.0"/>
<line x1="60.0" y1="90.0" x2="239.4" y2="90.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="261.4" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar10)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="35.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar10)"/>
  <text x="253.4" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="198.0" y1="196.0" x2="198.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="198.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="90.0" x2="64.0" y2="90.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="94.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 60.0,200.0 L 66.9,199.7 L 73.8,198.9 L 80.7,197.5 L 87.6,195.6 L 94.5,193.1 L 101.4,190.1 L 108.3,186.5 L 115.2,182.4 L 122.1,177.7 L 129.0,172.5 L 135.9,166.7 L 142.8,160.4 L 149.7,153.5 L 156.6,146.1 L 163.5,138.1 L 170.4,129.6 L 177.3,120.5 L 184.2,110.9 L 191.1,100.7 L 198.0,90.0 L 198.0,90.0 L 191.1,95.5 L 184.2,101.0 L 177.3,106.5 L 170.4,112.0 L 163.5,117.5 L 156.6,123.0 L 149.7,128.5 L 142.8,134.0 L 135.9,139.5 L 129.0,145.0 L 122.1,150.5 L 115.2,156.0 L 108.3,161.5 L 101.4,167.0 L 94.5,172.5 L 87.6,178.0 L 80.7,183.5 L 73.8,189.0 L 66.9,194.5 L 60.0,200.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 62.5,198.0 L 65.1,196.0 L 67.6,193.9 L 70.1,191.9 L 72.7,189.9 L 75.2,187.9 L 77.7,185.9 L 80.2,183.9 L 82.8,181.8 L 85.3,179.8 L 87.8,177.8 L 90.4,175.8 L 92.9,173.8 L 95.4,171.8 L 98.0,169.8 L 100.5,167.7 L 103.0,165.7 L 105.5,163.7 L 108.1,161.7 L 110.6,159.7 L 113.1,157.7 L 115.7,155.6 L 118.2,153.6 L 120.7,151.6 L 123.2,149.6 L 125.8,147.6 L 128.3,145.6 L 130.8,143.5 L 133.4,141.5 L 135.9,139.5 L 138.4,137.5 L 141.0,135.5 L 143.5,133.4 L 146.0,131.4 L 148.6,129.4 L 151.1,127.4 L 153.6,125.4 L 156.1,123.4 L 158.7,121.3 L 161.2,119.3 L 163.7,117.3 L 166.3,115.3 L 168.8,113.3 L 171.3,111.3 L 173.9,109.2 L 176.4,107.2 L 178.9,105.2 L 181.4,103.2 L 184.0,101.2 L 186.5,99.2 L 189.0,97.1 L 191.6,95.1 L 194.1,93.1 L 196.6,91.1 L 199.2,89.1 L 201.7,87.1 L 204.2,85.0 L 206.7,83.0 L 209.3,81.0 L 211.8,79.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="73.8" y="123.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = x (trên)</text>
  <path d="M 60.0,200.0 L 62.5,200.0 L 65.1,199.9 L 67.6,199.7 L 70.1,199.4 L 72.7,199.1 L 75.2,198.7 L 77.7,198.2 L 80.2,197.6 L 82.8,197.0 L 85.3,196.3 L 87.8,195.5 L 90.4,194.7 L 92.9,193.8 L 95.4,192.8 L 98.0,191.7 L 100.5,190.5 L 103.0,189.3 L 105.5,188.0 L 108.1,186.7 L 110.6,185.2 L 113.1,183.7 L 115.7,182.1 L 118.2,180.4 L 120.7,178.7 L 123.2,176.9 L 125.8,175.0 L 128.3,173.0 L 130.8,171.0 L 133.4,168.9 L 135.9,166.7 L 138.4,164.5 L 141.0,162.1 L 143.5,159.7 L 146.0,157.3 L 148.6,154.7 L 151.1,152.1 L 153.6,149.4 L 156.1,146.6 L 158.7,143.8 L 161.2,140.8 L 163.7,137.8 L 166.3,134.8 L 168.8,131.6 L 171.3,128.4 L 173.9,125.1 L 176.4,121.8 L 178.9,118.3 L 181.4,114.8 L 184.0,111.2 L 186.5,107.6 L 189.0,103.8 L 191.6,100.0 L 194.1,96.1 L 196.6,92.2 L 199.2,88.2 L 201.7,84.1 L 204.2,79.9 L 206.7,75.6 L 209.3,71.3 L 211.8,66.9" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="145.6" y="175.8" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">y = x² (dưới)</text>
  <line x1="142.8" y1="160.4" x2="142.8" y2="134.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar10r)"/>
  <line x1="142.8" y1="160.4" x2="142.8" y2="134.0" stroke="#dc2626" stroke-width="0"/>
  <text x="150.8" y="151.2" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">x² ≤ y ≤ x</text>
  <circle cx="198.0" cy="90.0" r="4" fill="#dc2626"/>
  <text x="206.0" y="90.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
</svg>

- Trong (theo $y$): $\\int_{x^2}^{x} 1\\,dy = \\left[y\\right]_{x^2}^{x} = x - x^2$.
- Ngoài (theo $x$): $\\int_0^1 (x - x^2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\mathbf{\\dfrac{1}{6}}$.

**Ví dụ C (cận theo chiều ngang — quét theo $y$)**: $\\iint_D y\\,dA$, $D$ = tam giác $(0,0)$, $(0,2)$, $(1,2)$. Lần này cố định $y$, cho $x$ chạy.
- Cạnh xiên nối $(0,0)$–$(1,2)$ có phương trình $y = 2x$, tức $x = y/2$. Với $y$ cố định trong $[0,2]$: $x$ đi từ $0$ (trục Oy) tới $y/2$ (cạnh xiên).

<svg viewBox="0 0 340 250" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền tam giác đỉnh (0,0), (1,2), (0,2): hàng tại y chạy từ x = 0 đến x = y/2">
  <defs><marker id="ar11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar11r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="188.0" y1="200.0" x2="188.0" y2="57.5"/>
<line x1="60.0" y1="143.0" x2="239.2" y2="143.0"/>
<line x1="60.0" y1="86.0" x2="239.2" y2="86.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="261.2" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="35.5" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <text x="253.2" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.5" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="188.0" y1="196.0" x2="188.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="188.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="143.0" x2="64.0" y2="143.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="147.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="56.0" y1="86.0" x2="64.0" y2="86.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="90.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <path d="M 60.0,200.0 L 188.0,86.0 L 60.0,86.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 62.3,197.9 L 64.7,195.8 L 67.0,193.7 L 69.4,191.6 L 71.7,189.6 L 74.1,187.5 L 76.4,185.4 L 78.8,183.3 L 81.1,181.2 L 83.5,179.1 L 85.8,177.0 L 88.2,174.9 L 90.5,172.8 L 92.9,170.7 L 95.2,168.7 L 97.5,166.6 L 99.9,164.5 L 102.2,162.4 L 104.6,160.3 L 106.9,158.2 L 109.3,156.1 L 111.6,154.0 L 114.0,151.9 L 116.3,149.8 L 118.7,147.8 L 121.0,145.7 L 123.4,143.6 L 125.7,141.5 L 128.1,139.4 L 130.4,137.3 L 132.7,135.2 L 135.1,133.1 L 137.4,131.0 L 139.8,128.9 L 142.1,126.8 L 144.5,124.8 L 146.8,122.7 L 149.2,120.6 L 151.5,118.5 L 153.9,116.4 L 156.2,114.3 L 158.6,112.2 L 160.9,110.1 L 163.3,108.0 L 165.6,105.9 L 167.9,103.9 L 170.3,101.8 L 172.6,99.7 L 175.0,97.6 L 177.3,95.5 L 179.7,93.4 L 182.0,91.3 L 184.4,89.2 L 186.7,87.1 L 189.1,85.0 L 191.4,83.0 L 193.8,80.9 L 196.1,78.8 L 198.5,76.7 L 200.8,74.6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="156.0" y="137.3" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">x = y/2 (cạnh xiên)</text>
  <line x1="60.0" y1="125.9" x2="143.2" y2="125.9" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar11r)"/>
  <text x="101.6" y="117.9" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">x: 0 → y/2</text>
  <circle cx="188.0" cy="86.0" r="4" fill="#dc2626"/>
  <text x="196.0" y="86.0" fill="#475569" font-size="11" text-anchor="start">(1,2)</text>
  <text x="52.0" y="129.9" fill="#dc2626" font-size="12" text-anchor="end" font-weight="700" font-style="italic">y</text>
</svg>

- Trong (theo $x$): $\\int_0^{y/2} y\\,dx = y\\left[x\\right]_0^{y/2} = y\\cdot\\frac{y}{2} = \\frac{y^2}{2}$.
- Ngoài (theo $y$): $\\int_0^2 \\frac{y^2}{2}\\,dy = \\frac{1}{2}\\left[\\frac{y^3}{3}\\right]_0^2 = \\frac{1}{2}\\cdot\\frac{8}{3} = \\mathbf{\\dfrac{4}{3}}$.
- **Ghi nhớ**: chọn quét theo cột (cố định $x$) hay theo hàng (cố định $y$) tùy miền — cái nào cho cận đơn giản hơn thì chọn (xem mục 3.5 về đổi thứ tự).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao tìm cận $g(x)$, $h(x)$?"* Vẽ miền $D$, cố định 1 giá trị $x$, xem $y$ chạy từ biên nào tới biên nào. Vd tam giác trên: tại $x$ cố định, $y$ đi từ trục Ox ($y=0$) lên đường $y=x$.
- *"Tích phân trong còn ra số không?"* Không — ra **biểu thức theo $x$** (vì cận phụ thuộc $x$), rồi tích phân ngoài mới khử hết thành số.

⚠ **Lỗi thường gặp — đặt cận biến trong là hằng số thay vì hàm**. Trên miền cong, cận tích phân **trong** phải là hàm của biến ngoài. Phản ví dụ: tam giác $T$ ở trên, nếu đặt nhầm $0 \\le y \\le 1$ (cố định) thì tính ra diện tích hình vuông, không phải tam giác → sai miền.

🔁 **Dừng lại tự kiểm tra**

1. Mô tả cận cho miền $D$ dưới parabol $y = x^2$, trên trục Ox, từ $x = 0$ đến $x = 2$.

<details><summary>Đáp án</summary>

$0 \\le x \\le 2$, $\\mathbf{0 \\le y \\le x^2}$. $\\iint_D f\\,dA = \\int_0^2 \\int_0^{x^2} f\\,dy\\,dx$ (cận trên của $y$ là hàm $x^2$).

</details>

### 3.5. Đổi thứ tự tích phân

💡 **Trực giác / Hình dung**: cùng một khối, cắt lát **theo $x$** (dọc) hay **theo $y$** (ngang) đều ra cùng thể tích — nhưng cận hai cách **khác hẳn nhau**. Đổi thứ tự = mô tả lại **cùng miền $D$** từ góc nhìn biến kia. Quy trình: **(1)** vẽ miền $D$, **(2)** đọc lại cận theo biến mới (quét hàng thay vì cột, hoặc ngược lại), **(3)** tính.

**Vì sao cần đổi?** Hai lý do: (a) tích phân trong theo thứ tự cũ **không tính được bằng tay** (vd $\\int e^{x^2}dx$ không có nguyên hàm sơ cấp) nhưng đổi thứ tự thì tính được; (b) một thứ tự cần **tách miền thành nhiều phần**, thứ tự kia chỉ cần **một** tích phân.

⚠ **Lỗi thường gặp — giữ nguyên cận khi đổi thứ tự.** KHÔNG được chỉ hoán hai dấu $\\int$ rồi giữ y nguyên cận cũ. Cận **phải đọc lại từ hình**. Phản ví dụ: $\\int_0^1\\int_0^x f\\,dy\\,dx$ (tam giác dưới đường $y=x$) đổi thành $\\int_0^1\\int_0^y f\\,dx\\,dy$ là **SAI** — cận đúng phải là $\\int_0^1\\int_y^1 f\\,dx\\,dy$ (xem Ví dụ 1 ngay dưới).

**Ví dụ 1 (tam giác — đọc lại cận)**: đổi thứ tự cho $\\displaystyle\\int_0^1\\int_0^x f(x,y)\\,dy\\,dx$.

Miền: $0 \\le x \\le 1$, $0 \\le y \\le x$ — tam giác dưới đường $y = x$.

<svg viewBox="0 0 600 255" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đổi thứ tự trên tam giác dưới y = x: quét cột (cố định x, y từ 0 đến x) hoặc quét hàng (cố định y, x từ y đến 1)">
  <defs><marker id="ar120" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar120r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="ar121" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar121r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <text x="150.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Thứ tự cũ (dy dx): quét CỘT</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="200.0" y1="200.0" x2="200.0" y2="18.0"/>
<line x1="60.0" y1="60.0" x2="242.0" y2="60.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="264.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar120)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="-4.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar120)"/>
  <text x="256.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="6.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="200.0" y1="196.0" x2="200.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="200.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="60.0" x2="64.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 60.0,200.0 L 200.0,200.0 L 200.0,60.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 67.0,193.0 L 74.0,186.0 L 81.0,179.0 L 88.0,172.0 L 95.0,165.0 L 102.0,158.0 L 109.0,151.0 L 116.0,144.0 L 123.0,137.0 L 130.0,130.0 L 137.0,123.0 L 144.0,116.0 L 151.0,109.0 L 158.0,102.0 L 165.0,95.0 L 172.0,88.0 L 179.0,81.0 L 186.0,74.0 L 193.0,67.0 L 200.0,60.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="144.0" y1="200.0" x2="144.0" y2="116.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar120r)"/>
  <line x1="144.0" y1="200.0" x2="144.0" y2="116.0" stroke="#dc2626" stroke-width="0"/>
  <text x="152.0" y="162.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">y: 0 → x</text>
  <circle cx="200.0" cy="60.0" r="4" fill="#dc2626"/>
  <text x="208.0" y="60.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="150.0" y="240.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">cố định x, y chạy 0 → x</text>
  <text x="450.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Thứ tự mới (dx dy): quét HÀNG</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="500.0" y1="200.0" x2="500.0" y2="18.0"/>
<line x1="360.0" y1="60.0" x2="542.0" y2="60.0"/>
</g>
  <line x1="354.0" y1="200.0" x2="564.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar121)"/>
  <line x1="360.0" y1="206.0" x2="360.0" y2="-4.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar121)"/>
  <text x="556.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="368.0" y="6.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="500.0" y1="196.0" x2="500.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="500.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="356.0" y1="60.0" x2="364.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="353.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 360.0,200.0 L 500.0,200.0 L 500.0,60.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 360.0,200.0 L 367.0,193.0 L 374.0,186.0 L 381.0,179.0 L 388.0,172.0 L 395.0,165.0 L 402.0,158.0 L 409.0,151.0 L 416.0,144.0 L 423.0,137.0 L 430.0,130.0 L 437.0,123.0 L 444.0,116.0 L 451.0,109.0 L 458.0,102.0 L 465.0,95.0 L 472.0,88.0 L 479.0,81.0 L 486.0,74.0 L 493.0,67.0 L 500.0,60.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="430.0" y1="130.0" x2="500.0" y2="130.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar121r)"/>
  <text x="465.0" y="122.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">x: y → 1</text>
  <circle cx="500.0" cy="60.0" r="4" fill="#dc2626"/>
  <text x="508.0" y="60.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="450.0" y="240.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">cố định y, x chạy y → 1</text>
</svg>

- Đọc lại cận theo $y$: với mỗi $y \\in [0,1]$ cố định, điểm trong tam giác có $x$ chạy từ đường $x = y$ (cạnh huyền) tới $x = 1$ (cạnh phải). Vậy $y \\le x \\le 1$.
- **Kết quả**: $\\displaystyle\\int_0^1\\int_0^x f\\,dy\\,dx = \\int_0^1\\int_y^1 f\\,dx\\,dy$.
- **Verify bằng số** với $f = 1$ (ra diện tích tam giác $= \\frac12$): cũ $\\int_0^1 x\\,dx = \\frac12$; mới $\\int_0^1 (1-y)\\,dy = \\left[y - \\frac{y^2}{2}\\right]_0^1 = \\frac12$ ✓.

**Ví dụ 2 (đổi thứ tự để tính được — kinh điển)**: tính $\\displaystyle\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$.

Thử tính trực tiếp: tích phân trong $\\int_x^1 e^{y^2}\\,dy$ — hàm $e^{y^2}$ **không có nguyên hàm sơ cấp**, bế tắc. Đổi thứ tự.

Miền: $0 \\le x \\le 1$, $x \\le y \\le 1$ — tam giác **trên** đường $y = x$.

<svg viewBox="0 0 600 255" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đổi thứ tự trên tam giác trên y = x: quét cột (y từ x đến 1) hoặc quét hàng (x từ 0 đến y)">
  <defs><marker id="ar130" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar130r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="ar131" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar131r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <text x="150.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Cũ (dy dx): cột, y: x → 1</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="200.0" y1="200.0" x2="200.0" y2="18.0"/>
<line x1="60.0" y1="60.0" x2="242.0" y2="60.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="264.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar130)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="-4.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar130)"/>
  <text x="256.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="6.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="200.0" y1="196.0" x2="200.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="200.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="60.0" x2="64.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 60.0,200.0 L 200.0,60.0 L 60.0,60.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 67.0,193.0 L 74.0,186.0 L 81.0,179.0 L 88.0,172.0 L 95.0,165.0 L 102.0,158.0 L 109.0,151.0 L 116.0,144.0 L 123.0,137.0 L 130.0,130.0 L 137.0,123.0 L 144.0,116.0 L 151.0,109.0 L 158.0,102.0 L 165.0,95.0 L 172.0,88.0 L 179.0,81.0 L 186.0,74.0 L 193.0,67.0 L 200.0,60.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="116.0" y1="144.0" x2="116.0" y2="60.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar130r)"/>
  <line x1="116.0" y1="144.0" x2="116.0" y2="60.0" stroke="#dc2626" stroke-width="0"/>
  <text x="124.0" y="106.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">y: x → 1</text>
  <circle cx="200.0" cy="60.0" r="4" fill="#dc2626"/>
  <text x="208.0" y="60.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="150.0" y="240.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">cố định x, y chạy x → 1</text>
  <text x="450.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Mới (dx dy): hàng, x: 0 → y</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="500.0" y1="200.0" x2="500.0" y2="18.0"/>
<line x1="360.0" y1="60.0" x2="542.0" y2="60.0"/>
</g>
  <line x1="354.0" y1="200.0" x2="564.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar131)"/>
  <line x1="360.0" y1="206.0" x2="360.0" y2="-4.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar131)"/>
  <text x="556.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="368.0" y="6.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="500.0" y1="196.0" x2="500.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="500.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="356.0" y1="60.0" x2="364.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="353.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 360.0,200.0 L 500.0,60.0 L 360.0,60.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 360.0,200.0 L 367.0,193.0 L 374.0,186.0 L 381.0,179.0 L 388.0,172.0 L 395.0,165.0 L 402.0,158.0 L 409.0,151.0 L 416.0,144.0 L 423.0,137.0 L 430.0,130.0 L 437.0,123.0 L 444.0,116.0 L 451.0,109.0 L 458.0,102.0 L 465.0,95.0 L 472.0,88.0 L 479.0,81.0 L 486.0,74.0 L 493.0,67.0 L 500.0,60.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="360.0" y1="102.0" x2="458.0" y2="102.0" stroke="#dc2626" stroke-width="2.5" marker-end="url(#ar131r)"/>
  <text x="409.0" y="94.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">x: 0 → y</text>
  <circle cx="500.0" cy="60.0" r="4" fill="#dc2626"/>
  <text x="508.0" y="60.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="450.0" y="240.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">cố định y, x chạy 0 → y</text>
</svg>

- Đọc lại: với $y$ cố định trong $[0,1]$, $x$ chạy từ $0$ tới $y$. Vậy $0 \\le x \\le y$.
- Đổi: $\\displaystyle\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy$. Bây giờ tích phân trong **theo $x$**, mà $e^{y^2}$ là hằng theo $x$:
$$\\int_0^y e^{y^2}\\,dx = e^{y^2}\\left[x\\right]_0^y = y\\,e^{y^2}.$$
- Ngoài (theo $y$, đặt $u = y^2$, $du = 2y\\,dy$): $\\displaystyle\\int_0^1 y\\,e^{y^2}\\,dy = \\left[\\frac{1}{2}e^{y^2}\\right]_0^1 = \\frac{1}{2}(e - 1) \\approx \\mathbf{0.859}$.
- **Bài học**: thừa số $y$ xuất hiện tự nhiên sau khi đổi thứ tự, biến tích phân bế tắc thành tích phân dễ. Đây là lý do quan trọng nhất để biết đổi thứ tự.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết khi nào nên đổi thứ tự?"* Ba dấu hiệu: (1) tích phân trong không có nguyên hàm sơ cấp ($e^{y^2}$, $\\sin(y^2)$, $\\frac{\\sin y}{y}$...); (2) cận thứ tự hiện tại buộc tách miền thành nhiều mảnh; (3) cận biến trong xấu, đổi sang thì gọn.
- *"Đổi thứ tự có làm đổi đáp số không?"* **Không** — cùng miền, cùng $f$ → cùng thể tích (Fubini). Chỉ đổi cách tính. Nếu hai cách ra hai số khác nhau, chắc chắn đọc sai cận một bên.

🔁 **Dừng lại tự kiểm tra**

1. Viết lại $\\displaystyle\\int_0^2\\int_0^{x} f\\,dy\\,dx$ theo thứ tự $dx\\,dy$.

<details><summary>Đáp án</summary>

Miền: $0 \\le x \\le 2$, $0 \\le y \\le x$ — tam giác dưới $y=x$, đỉnh $(2,2)$. Đọc lại theo $y$: $0 \\le y \\le 2$, và $x$ chạy từ $x=y$ tới $x=2$. Vậy $\\displaystyle\\int_0^2\\int_y^2 f\\,dx\\,dy$. Verify $f=1$: cũ $\\int_0^2 x\\,dx = 2$; mới $\\int_0^2 (2-y)\\,dy = [2y - \\frac{y^2}{2}]_0^2 = 4-2 = 2$ ✓.

</details>

### 📝 Tóm tắt mục 3

- Miền cong: cận biến trong là **hàm** của biến ngoài (men theo biên).
- Tích phân trong ra biểu thức theo biến ngoài, rồi tích phân ngoài khử thành số.
- Vẽ miền + quét cột để xác định cận $g(x)$, $h(x)$.
- **Đổi thứ tự tích phân**: vẽ miền → đọc lại cận theo biến kia (KHÔNG giữ cận cũ). Dùng khi tích phân trong bế tắc ($e^{y^2}$) hoặc cận xấu; đáp số không đổi.

---

## 4. Đổi biến — Tọa độ cực

💡 **Trực giác / Hình dung**: với miền tròn, dùng $(x, y)$ khiến cận xấu (đường tròn $x^2+y^2 = R^2$). Đổi sang $(r, \\theta)$ — "khoảng cách tới tâm" và "góc" — thì hình tròn thành hình chữ nhật đơn giản ($0 \\le r \\le R$, $0 \\le \\theta \\le 2\\pi$). Thừa số **$r$** trong $dA = r\\,dr\\,d\\theta$ là vì ô lưới cực ở xa tâm thì **to hơn** (cung dài hơn): diện tích ô $\\approx r\\,dr\\,d\\theta$.

Với miền tròn / đối xứng quay, dùng tọa độ cực:

$$x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad dA = r\\,dr\\,d\\theta$$

(Yếu tố Jacobian $= r$.)

#### Vì sao có thừa số $r$ — derivation bằng hình

Ô lưới cực không phải hình vuông mà là hình "rẻ quạt nhỏ", giới hạn bởi 2 bán kính (cách nhau góc $d\\theta$) và 2 cung tròn (cách nhau $dr$):

<svg viewBox="0 0 580 255" style="max-width:580px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Phần tử diện tích tọa độ cực: ô kẹp giữa hai cung bán kính r và r + dr, góc mở dθ; diện tích ≈ r dr dθ">
  <defs><marker id="ar14" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="70.0" y1="230.0" x2="300.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar14)"/>
  <circle cx="70.0" cy="230.0" r="3" fill="#1a202c"/>
  <text x="64.0" y="246.0" fill="#475569" font-size="12" text-anchor="end">O (tâm)</text>
  <line x1="70.0" y1="230.0" x2="259.8" y2="129.1" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4"/>
  <line x1="70.0" y1="230.0" x2="208.2" y2="65.3" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4"/>
  <path fill-opacity="0.6" d="M 184.8,169.0 L 183.6,166.8 L 182.4,164.6 L 181.1,162.5 L 179.8,160.3 L 178.4,158.2 L 177.0,156.2 L 175.6,154.1 L 174.1,152.1 L 172.6,150.1 L 171.0,148.2 L 169.4,146.3 L 167.8,144.4 L 166.2,142.5 L 164.5,140.7 L 162.7,138.9 L 161.0,137.1 L 159.2,135.4 L 157.3,133.7 L 155.5,132.0 L 153.6,130.4 L 182.5,95.9 L 185.0,98.1 L 187.6,100.4 L 190.0,102.6 L 192.4,105.0 L 194.8,107.3 L 197.2,109.8 L 199.4,112.2 L 201.7,114.7 L 203.9,117.3 L 206.0,119.9 L 208.1,122.5 L 210.1,125.2 L 212.1,127.9 L 214.0,130.6 L 215.9,133.4 L 217.8,136.2 L 219.5,139.1 L 221.2,142.0 L 222.9,144.9 L 224.5,147.8 Z" fill="#fca5a5" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 200.0,230.0 L 200.0,227.7 L 199.9,225.5 L 199.8,223.2 L 199.7,220.9 L 199.5,218.7 L 199.3,216.4 L 199.0,214.2 L 198.7,211.9 L 198.4,209.7 L 198.0,207.4 L 197.6,205.2 L 197.2,203.0 L 196.7,200.8 L 196.1,198.6 L 195.6,196.4 L 195.0,194.2 L 194.3,192.0 L 193.6,189.8 L 192.9,187.7 L 192.2,185.5 L 191.4,183.4 L 190.5,181.3 L 189.7,179.2 L 188.8,177.1 L 187.8,175.1 L 186.8,173.0 L 185.8,171.0 L 184.8,169.0 L 183.7,167.0 L 182.6,165.0 L 181.4,163.0 L 180.2,161.1 L 179.0,159.2 L 177.8,157.3 L 176.5,155.4 L 175.2,153.6 L 173.8,151.8 L 172.4,150.0 L 171.0,148.2 L 169.6,146.4 L 168.1,144.7 L 166.6,143.0 L 165.1,141.3 L 163.5,139.7 L 161.9,138.1 L 160.3,136.5 L 158.7,134.9 L 157.0,133.4 L 155.3,131.9 L 153.6,130.4 L 151.8,129.0 L 150.0,127.6 L 148.2,126.2 L 146.4,124.8 L 144.6,123.5 L 142.7,122.2 L 140.8,121.0 L 138.9,119.8 L 137.0,118.6 L 135.0,117.4 L 133.0,116.3 L 131.0,115.2 L 129.0,114.2 L 127.0,113.2 L 124.9,112.2 L 122.9,111.2 L 120.8,110.3 L 118.7,109.5 L 116.6,108.6" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4 3"/>
  <path d="M 245.0,230.0 L 245.0,226.9 L 244.9,223.9 L 244.8,220.8 L 244.6,217.8 L 244.3,214.7 L 244.0,211.7 L 243.7,208.7 L 243.3,205.6 L 242.8,202.6 L 242.3,199.6 L 241.8,196.6 L 241.2,193.6 L 240.5,190.6 L 239.8,187.7 L 239.0,184.7 L 238.2,181.8 L 237.4,178.8 L 236.4,175.9 L 235.5,173.0 L 234.4,170.1 L 233.4,167.3 L 232.3,164.4 L 231.1,161.6 L 229.9,158.8 L 228.6,156.0 L 227.3,153.3 L 225.9,150.6 L 224.5,147.8 L 223.1,145.2 L 221.6,142.5 L 220.0,139.9 L 218.4,137.3 L 216.8,134.7 L 215.1,132.1 L 213.4,129.6 L 211.6,127.1 L 209.8,124.7 L 207.9,122.3 L 206.0,119.9 L 204.1,117.5 L 202.1,115.2 L 200.1,112.9 L 198.0,110.7 L 195.9,108.4 L 193.7,106.3 L 191.6,104.1 L 189.3,102.0 L 187.1,99.9 L 184.8,97.9 L 182.5,95.9 L 180.1,94.0 L 177.7,92.1 L 175.3,90.2 L 172.9,88.4 L 170.4,86.6 L 167.9,84.9 L 165.3,83.2 L 162.7,81.6 L 160.1,80.0 L 157.5,78.4 L 154.8,76.9 L 152.2,75.5 L 149.4,74.1 L 146.7,72.7 L 144.0,71.4 L 141.2,70.1 L 138.4,68.9 L 135.6,67.7 L 132.7,66.6" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4 3"/>
  <path d="M 130.0,230.0 A 60,60 0 0 0 123.0,201.8" fill="none" stroke="#475569" stroke-width="1.5"/>
  <text x="136.0" y="220.0" fill="#475569" font-size="13" text-anchor="start" font-style="italic">θ</text>
  <text x="162.0" y="105.2" fill="#dc2626" font-size="13" text-anchor="end" font-weight="700">dr</text>
  <text x="216.9" y="111.1" fill="#1d4ed8" font-size="11" text-anchor="start" font-weight="700">cung ngoài ≈ r·dθ</text>
  <text x="160" y="150" fill="#1d4ed8" font-size="11" text-anchor="end" font-weight="700">cung trong r·dθ</text>
  <text x="150" y="124" fill="#dc2626" font-size="12" text-anchor="end" font-weight="700">dθ</text>
  <text x="330.0" y="70.0" fill="#1a202c" font-size="13" text-anchor="start" font-weight="700">ô cực: dày dr, rộng (cung) r·dθ</text>
  <text x="330.0" y="94.0" fill="#dc2626" font-size="14" text-anchor="start" font-weight="700">diện tích ≈ dr × (r·dθ) = r dr dθ</text>
  <text x="330.0" y="120.0" fill="#475569" font-size="12" text-anchor="start">xa tâm (r lớn) → cung dài hơn → ô TO hơn</text>
  <text x="330.0" y="140.0" fill="#475569" font-size="12" text-anchor="start">→ thừa số r trong dA = r dr dθ</text>
</svg>

Cung tròn dài = bán kính × góc $= r\\,d\\theta$ (công thức độ dài cung). Ô cực ≈ chữ nhật cạnh $dr$ và $r\\,d\\theta$ → **diện tích $= r\\,dr\\,d\\theta$**. Thừa số $r$ chính là **Jacobian** của phép đổi biến: ô ở xa tâm (r lớn) to hơn ô gần tâm, nên phải nhân trọng số $r$ để "đếm" thể tích cho đúng.

**Ví dụ 1**: Tính $\\iint_D (x^2 + y^2)\\,dA$, $D$ = đĩa bán kính $R$.
- $D$: $0 \\le r \\le R$, $0 \\le \\theta \\le 2\\pi$.
- $x^2 + y^2 = r^2$ (đổi biểu thức sang cực — gọn hẳn).
- $\\displaystyle = \\int_0^{2\\pi} \\int_0^R \\underbrace{r^2}_{f}\\cdot \\underbrace{r}_{\\text{Jac}}\\,dr\\,d\\theta = \\int_0^{2\\pi} \\left[\\frac{r^4}{4}\\right]_0^R d\\theta = \\int_0^{2\\pi} \\frac{R^4}{4}\\,d\\theta = \\mathbf{\\dfrac{\\pi R^4}{2}}$.

**Ví dụ 2 (tích phân Gauss — không tính được trong Descartes)**: tính $\\displaystyle I^2 = \\iint_{\\mathbb{R}^2} e^{-(x^2+y^2)}\\,dA$, từ đó suy ra $I = \\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx$.
- Trong Descartes, $\\int e^{-x^2}dx$ không có nguyên hàm sơ cấp — bế tắc. Đổi sang cực: $x^2 + y^2 = r^2$, miền $\\mathbb{R}^2$ thành $0 \\le r < \\infty$, $0 \\le \\theta \\le 2\\pi$.
$$I^2 = \\int_0^{2\\pi}\\int_0^{\\infty} e^{-r^2}\\cdot r\\,dr\\,d\\theta.$$
- Trong (theo $r$, đặt $u = r^2$, $du = 2r\\,dr$): $\\displaystyle\\int_0^{\\infty} e^{-r^2} r\\,dr = \\left[-\\frac{1}{2}e^{-r^2}\\right]_0^{\\infty} = 0 - \\left(-\\frac{1}{2}\\right) = \\frac{1}{2}$.
- Ngoài: $\\displaystyle\\int_0^{2\\pi}\\frac{1}{2}\\,d\\theta = \\pi$. Vậy $I^2 = \\pi \\Rightarrow I = \\sqrt{\\pi}$.
- **Điểm mấu chốt**: chính thừa số $r$ (Jacobian) tạo ra $r\\,e^{-r^2}$ tích phân được dễ dàng — trong khi $e^{-x^2}$ thì không. Kết quả $\\int_{-\\infty}^\\infty e^{-x^2}dx = \\sqrt{\\pi}$ là nền tảng của phân phối chuẩn (Gauss) trong xác suất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $dA = r\\,dr\\,d\\theta$ chứ không phải $dr\\,d\\theta$?"* Ô lưới cực hình "rẻ quạt" có 2 cạnh: bề dày $dr$ và cung $r\\,d\\theta$ (cung = bán kính $\\times$ góc). Diện tích ô $\\approx dr \\times (r\\,d\\theta) = r\\,dr\\,d\\theta$. Thừa số $r$ là Jacobian của phép đổi biến.
- *"Khi nào nên đổi sang cực?"* Khi miền tròn/quạt/vành khăn HOẶC biểu thức chứa $x^2+y^2$ (thành $r^2$, gọn hẳn).

⚠ **Lỗi thường gặp — quên thừa số $r$**. Đây là lỗi #1 với tọa độ cực. Phản ví dụ: diện tích đĩa bán kính $R = \\iint r\\,dr\\,d\\theta = \\pi R^2$. Nếu quên $r$: $\\iint dr\\,d\\theta = R\\cdot 2\\pi = 2\\pi R$ (sai cả thứ nguyên — ra chu vi-ish chứ không phải diện tích).

🔁 **Dừng lại tự kiểm tra**

1. Tính diện tích đĩa bán kính 2 bằng tọa độ cực.

<details><summary>Đáp án</summary>

$\\int_0^{2\\pi}\\int_0^2 r\\,dr\\,d\\theta = \\int_0^{2\\pi} \\left[\\frac{r^2}{2}\\right]_0^2 d\\theta = \\int_0^{2\\pi} 2\\,d\\theta = 4\\pi$. Khớp $\\pi R^2 = \\pi\\cdot 4 = \\mathbf{4\\pi}$ ✓.

</details>

2. Tính diện tích **một phần tư đĩa** (góc phần tư thứ nhất) bán kính 3 bằng tọa độ cực.

<details><summary>Đáp án</summary>

Cận góc chỉ còn $0 \\le \\theta \\le \\frac{\\pi}{2}$, bán kính $0 \\le r \\le 3$: $\\int_0^{\\pi/2}\\int_0^3 r\\,dr\\,d\\theta = \\int_0^{\\pi/2}\\frac{9}{2}\\,d\\theta = \\frac{9}{2}\\cdot\\frac{\\pi}{2} = \\mathbf{\\dfrac{9\\pi}{4}}$. Khớp $\\frac{1}{4}\\pi R^2 = \\frac{1}{4}\\cdot 9\\pi = \\frac{9\\pi}{4}$ ✓ (đúng một phần tư diện tích đĩa $9\\pi$).

</details>

### 📝 Tóm tắt mục 4

- Tọa độ cực: $x = r\\cos\\theta$, $y = r\\sin\\theta$; miền tròn → hình chữ nhật trong $(r,\\theta)$.
- **$dA = r\\,dr\\,d\\theta$** (đừng quên $r$ — Jacobian).
- Dùng khi miền tròn/quạt hoặc biểu thức chứa $x^2+y^2 = r^2$.

---

## 5. Tích phân bội (n biến)

💡 **Trực giác / Hình dung**: tích phân kép cộng f trên miền 2D (diện tích), tích phân bội 3 cộng f trên khối 3D (thể tích). Nếu f = mật độ, tích phân = khối lượng cả vật. Tọa độ trụ (cho hình trụ) và cầu (cho hình cầu) là các "hệ tọa độ thuận" giống tọa độ cực nhưng cho 3D — mỗi cái có Jacobian riêng.

**3 biến**: $\\iiint_V f(x, y, z)\\,dV$ — tích phân trên khối $V$ trong $\\mathbb{R}^3$.

$$\\iiint_V f\\,dV = \\int_a^b \\int_c^d \\int_e^f f(x, y, z)\\,dz\\,dy\\,dx$$

(Thứ tự lặp tùy chọn.)

### Tọa độ trụ và cầu

- **Trụ**: $x = r\\cos\\theta$, $y = r\\sin\\theta$, $z = z$. $dV = r\\,dr\\,d\\theta\\,dz$.
- **Cầu**: $x = \\rho\\sin\\varphi\\cos\\theta$, $y = \\rho\\sin\\varphi\\sin\\theta$, $z = \\rho\\cos\\varphi$. $dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$.

#### Walk-through tích phân ba trên hình hộp (Descartes)

**Ví dụ (hộp)**: $\\displaystyle\\iiint_V xyz\\,dV$, $V = [0,1]\\times[0,2]\\times[0,3]$. Tích phân lồng 3 lớp, mỗi lớp coi 2 biến kia là hằng:
- Trong nhất (theo $z$): $\\int_0^3 xyz\\,dz = xy\\left[\\frac{z^2}{2}\\right]_0^3 = xy\\cdot\\frac{9}{2} = \\frac{9xy}{2}$.
- Giữa (theo $y$): $\\int_0^2 \\frac{9xy}{2}\\,dy = \\frac{9x}{2}\\left[\\frac{y^2}{2}\\right]_0^2 = \\frac{9x}{2}\\cdot 2 = 9x$.
- Ngoài (theo $x$): $\\int_0^1 9x\\,dx = 9\\left[\\frac{x^2}{2}\\right]_0^1 = \\mathbf{\\dfrac{9}{2}}$.
- **Mẹo separable** (kiểm tra): $\\left(\\int_0^1 x\\,dx\\right)\\left(\\int_0^2 y\\,dy\\right)\\left(\\int_0^3 z\\,dz\\right) = \\frac{1}{2}\\cdot 2\\cdot\\frac{9}{2} = \\frac{9}{2}$ ✓.

#### Walk-through tích phân ba trên miền tổng quát (cận z phụ thuộc x, y)

Khi $V$ không phải hộp, cận cũng "men theo biên" như miền 2D — chỉ là **3 lớp** thay vì 2. Quy ước thường gặp: cận $z$ là hàm theo $(x,y)$, chiếu xuống mặt phẳng $xy$ ra miền 2D $D$, rồi tích phân $D$ như mục 3.

**Ví dụ (tứ diện)**: $\\displaystyle\\iiint_V 1\\,dV$ trên tứ diện chặn bởi 3 mặt tọa độ và mặt phẳng $x+y+z = 1$ (các giao $\\ge 0$). Đây là thể tích tứ diện.
- **Cận $z$**: cố định $(x,y)$, $z$ chạy từ $0$ (mặt $xy$) lên $1-x-y$ (mặt phẳng nghiêng).
- **Chiếu xuống $xy$** ($z=0$): miền $D$ là tam giác $x+y\\le 1$, tức $0\\le x\\le 1$, $0\\le y\\le 1-x$.
$$V = \\int_0^1\\int_0^{1-x}\\int_0^{1-x-y} 1\\,dz\\,dy\\,dx.$$
- Trong nhất (theo $z$): $\\int_0^{1-x-y} dz = 1-x-y$.
- Giữa (theo $y$): $\\int_0^{1-x} (1-x-y)\\,dy = \\left[(1-x)y - \\frac{y^2}{2}\\right]_0^{1-x} = (1-x)^2 - \\frac{(1-x)^2}{2} = \\frac{(1-x)^2}{2}$.
- Ngoài (theo $x$): $\\int_0^1 \\frac{(1-x)^2}{2}\\,dx = \\frac{1}{2}\\left[-\\frac{(1-x)^3}{3}\\right]_0^1 = \\frac{1}{2}\\cdot\\frac{1}{3} = \\mathbf{\\dfrac{1}{6}}$.
- **Kiểm tra**: tứ diện vuông cạnh $1$ có thể tích $\\frac{1}{6}$ (= $\\frac{1}{6}$ khối lập phương đơn vị) ✓.

#### Walk-through tọa độ trụ — thể tích hình trụ

**Ví dụ (trụ)**: thể tích hình trụ bán kính $a$, cao $h$, dùng $dV = r\\,dr\\,d\\theta\\,dz$ với $f = 1$:
$$V = \\int_0^h\\int_0^{2\\pi}\\int_0^a r\\,dr\\,d\\theta\\,dz.$$
- Theo $r$: $\\int_0^a r\\,dr = \\frac{a^2}{2}$. Theo $\\theta$: $\\int_0^{2\\pi} d\\theta = 2\\pi$. Theo $z$: $\\int_0^h dz = h$.
- Tích $= \\frac{a^2}{2}\\cdot 2\\pi\\cdot h = \\mathbf{\\pi a^2 h}$ ✓ (đúng công thức "diện tích đáy × chiều cao").

**Verify thể tích cầu bán kính $R$** (tọa độ cầu, $f = 1$):
- $\\int_0^{2\\pi}\\int_0^\\pi\\int_0^R \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$.
- Theo $\\rho$: $\\int_0^R \\rho^2\\,d\\rho = \\frac{R^3}{3}$. Theo $\\varphi$: $\\int_0^\\pi \\sin\\varphi\\,d\\varphi = \\left[-\\cos\\varphi\\right]_0^\\pi = -(-1)-(-1) = 2$. Theo $\\theta$: $\\int_0^{2\\pi} d\\theta = 2\\pi$.
- Tích $= \\frac{R^3}{3}\\cdot 2\\cdot 2\\pi = \\mathbf{\\dfrac{4}{3}\\pi R^3}$ ✓ (đúng công thức thể tích cầu).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Jacobian trụ và cầu khác nhau thế nào?"* Trụ: **$r$** (giống cực, thêm $z$ không đổi). Cầu: **$\\rho^2\\sin\\varphi$** (phức tạp hơn vì cả 2 góc cong). Nhớ sai Jacobian → sai toàn bộ.
- *"Khi nào dùng trụ vs cầu?"* Trụ cho vật có trục đối xứng (lon, ống). Cầu cho vật đối xứng quanh 1 điểm (quả bóng, hành tinh).

⚠ **Lỗi thường gặp — dùng nhầm Jacobian giữa trụ và cầu**. $dV$ cầu là $\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$, KHÔNG phải $\\rho\\cdot...$ Phản ví dụ: tính thể tích cầu mà dùng Jacobian $= \\rho$ (như trụ) → ra $(\\pi R^3)\\cdot...$ sai hệ số, không khớp $\\frac{4}{3}\\pi R^3$.

🔁 **Dừng lại tự kiểm tra**

1. Jacobian (dV) trong tọa độ cầu là gì?

<details><summary>Đáp án</summary>

$dV = \\mathbf{\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta}$. ($\\rho^2$ vì khối cách tâm xa thì lớn hơn; $\\sin\\varphi$ điều chỉnh theo góc cực.)

</details>

### 📝 Tóm tắt mục 5

- $\\iiint_V f\\,dV$ cộng $f$ trên khối 3D (= khối lượng nếu $f$ = mật độ).
- Trụ: $dV = r\\,dr\\,d\\theta\\,dz$ (trục đối xứng); cầu: $dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$ (đối xứng điểm).
- Chọn đúng hệ tọa độ + đúng Jacobian là then chốt.

---

## 6. Ứng dụng

### 6.1. Diện tích & thể tích

- Diện tích $D = \\iint_D 1\\,dA$.
- Thể tích vật khối $V = \\iiint_V 1\\,dV$.

### 6.2. Khối tâm

$$\\bar{x} = \\frac{\\iint_D x\\cdot\\rho\\,dA}{\\iint_D \\rho\\,dA}, \\qquad \\bar{y} = \\frac{\\iint_D y\\cdot\\rho\\,dA}{\\iint_D \\rho\\,dA}$$

$\\rho(x, y)$ = mật độ.

### 6.3. Momen quán tính

$$I_z = \\iint_D (x^2 + y^2)\\cdot\\rho\\,dA$$

Đại lượng quan trọng trong cơ học: $I_z$ đo **độ "khó quay"** của vật quanh trục $z$ — khối lượng càng xa trục (thừa số $x^2+y^2$ lớn) thì đóng góp càng nhiều. Cùng khối lượng, vật phân bố ở rìa khó quay hơn vật dồn vào tâm.

**Walk-through — momen quán tính đĩa đặc**: đĩa bán kính $R$, mật độ đều $\\rho$, quay quanh trục qua tâm. Dùng tọa độ cực ($x^2+y^2=r^2$, $dA = r\\,dr\\,d\\theta$):
$$I_z = \\int_0^{2\\pi}\\int_0^R r^2\\cdot\\rho\\cdot r\\,dr\\,d\\theta = \\rho\\int_0^{2\\pi}\\left[\\frac{r^4}{4}\\right]_0^R d\\theta = \\rho\\cdot\\frac{R^4}{4}\\cdot 2\\pi = \\frac{\\pi\\rho R^4}{2}.$$
Khối lượng đĩa $M = \\rho\\cdot\\pi R^2$, nên $I_z = \\frac{\\pi\\rho R^4}{2} = \\frac{1}{2}(\\rho\\pi R^2)R^2 = \\mathbf{\\dfrac{1}{2}MR^2}$ — đúng công thức momen quán tính đĩa trong sách vật lý ✓.

💡 **Trực giác / Hình dung**: cùng 1 công cụ tích phân kép/bội, đổi hàm $f$ là ra đại lượng khác. $f = 1$ → diện tích/thể tích. $f = \\rho$ (mật độ) → khối lượng. $f = x\\cdot\\rho$ → "momen" để tính khối tâm. $f = (x^2+y^2)\\cdot\\rho$ → momen quán tính (đo "khó quay" của vật). Khối tâm = vị trí trung bình có trọng số theo mật độ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khối tâm chia cho $\\iint\\rho\\,dA$?"* Vì đó là **trung bình có trọng số**: tử = tổng (vị trí $\\times$ khối lượng nhỏ), mẫu = tổng khối lượng. Chia ra vị trí trung bình. Mật độ đều thì $\\rho$ rút gọn → khối tâm = trọng tâm hình học.

#### Walk-through khối tâm — mật độ KHÔNG đều

**Ví dụ**: tấm hình vuông $D = [0,1]\\times[0,1]$, mật độ $\\rho(x,y) = x$ (bên phải nặng hơn). Tìm $\\bar{x}$.
- **Khối lượng** (mẫu số): $M = \\iint_D x\\,dA = \\int_0^1\\int_0^1 x\\,dy\\,dx = \\int_0^1 x\\,dx = \\frac{1}{2}$.
- **Momen theo $x$** (tử số): $M_y = \\iint_D x\\cdot\\rho\\,dA = \\iint_D x\\cdot x\\,dA = \\int_0^1\\int_0^1 x^2\\,dy\\,dx = \\int_0^1 x^2\\,dx = \\frac{1}{3}$.
- $\\bar{x} = \\dfrac{M_y}{M} = \\dfrac{1/3}{1/2} = \\mathbf{\\dfrac{2}{3}}$.
- **Kiểm tra trực giác**: mật độ tăng theo $x$ (phải nặng hơn) nên khối tâm lệch sang phải, $\\bar{x} = \\frac{2}{3} > \\frac{1}{2}$ (tâm hình học) ✓. Nếu mật độ đều, $\\bar{x}$ sẽ là $\\frac{1}{2}$.
- $\\bar{y}$: vì $\\rho = x$ không phụ thuộc $y$ và miền đối xứng theo $y$ → $\\bar{y} = \\frac{1}{2}$.

⚠ **Lỗi thường gặp — quên chia cho tổng khối lượng khi tính khối tâm**. $\\bar{x} = \\dfrac{\\iint x\\rho\\,dA}{\\iint \\rho\\,dA}$. Quên mẫu số → ra "momen" chứ không phải tọa độ (sai thứ nguyên). Ví dụ trên: nếu chỉ tính tử $\\frac{1}{3}$ rồi báo "$\\bar{x} = \\frac{1}{3}$" là sai — phải chia cho $M = \\frac{1}{2}$ ra $\\frac{2}{3}$.

🔁 **Dừng lại tự kiểm tra**

1. Khối tâm của hình vuông [0,2]×[0,2] mật độ đều nằm ở đâu?

<details><summary>Đáp án</summary>

Mật độ đều → khối tâm = tâm hình học = $\\mathbf{(1, 1)}$ (trung điểm theo cả 2 trục).

</details>

### 📝 Tóm tắt mục 6

- Đổi hàm $f$ → đại lượng khác: $f=1$ (diện tích/thể tích), $f=\\rho$ (khối lượng), $f=(x^2+y^2)\\rho$ (momen quán tính).
- Khối tâm = trung bình vị trí có trọng số mật độ: $\\bar{x} = \\dfrac{\\iint x\\rho\\,dA}{\\iint\\rho\\,dA}$.
- Mật độ đều → khối tâm = trọng tâm hình học.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\\int_0^1 \\int_0^2 (3x^2\\cdot y)\\,dy\\,dx$.

**Bài 2**: Tính $\\iint_D x\\,dA$ trên $D = \\{(x,y) : 0 \\le x \\le 1,\\ x \\le y \\le 1\\}$.

**Bài 3**: Tính thể tích hình cầu bán kính $R$ bằng tích phân.

**Bài 4**: Tính $\\iint_D dA$ trên $D$ = đĩa bán kính 3.

**Bài 5**: Khối tâm tam giác đỉnh $(0,0)$, $(1,0)$, $(0,1)$ (mật độ đều).

**Bài 6**: Đổi thứ tự tích phân của $\\displaystyle\\int_0^1\\int_{\\sqrt{x}}^{1} f(x,y)\\,dy\\,dx$ sang thứ tự $dx\\,dy$.

**Bài 7**: Tính $\\displaystyle\\int_0^1\\int_y^1 \\sin(x^2)\\,dx\\,dy$ bằng cách đổi thứ tự tích phân.

**Bài 8**: Tính $\\iint_D (x^2+y^2)\\,dA$ trên vành khăn (annulus) $1 \\le x^2+y^2 \\le 4$ bằng tọa độ cực.

### Lời giải

**Bài 1**: Trong (theo $y$): $\\int_0^2 3x^2\\cdot y\\,dy = 3x^2\\cdot\\left[\\frac{y^2}{2}\\right]_0^2 = 6x^2$. Ngoài: $\\int_0^1 6x^2\\,dx = \\mathbf{2}$.

**Bài 2**: $\\int_0^1 \\int_x^1 x\\,dy\\,dx = \\int_0^1 x(1-x)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\mathbf{\\dfrac{1}{6}}$.

**Bài 3**: $V = \\int_0^{2\\pi} \\int_0^\\pi \\int_0^R \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta = \\frac{R^3}{3}\\cdot 2\\cdot 2\\pi = \\mathbf{\\dfrac{4}{3}\\pi R^3}$ ✓.

**Bài 4**: Diện tích đĩa $= \\int_0^{2\\pi} \\int_0^3 r\\,dr\\,d\\theta = \\int_0^{2\\pi} \\frac{9}{2}\\,d\\theta = \\mathbf{9\\pi}$. Khớp $\\pi R^2 = 9\\pi$ ✓.

**Bài 5**: $D$: $0 \\le x \\le 1$, $0 \\le y \\le 1-x$. $S(D) = \\frac{1}{2}$.  
- $\\iint x\\,dA = \\int_0^1 x(1-x)\\,dx = \\frac{1}{6}$. $\\bar{x} = \\dfrac{1/6}{1/2} = \\mathbf{\\dfrac{1}{3}}$.  
- Tương tự $\\bar{y} = \\mathbf{\\dfrac{1}{3}}$. → khối tâm $\\left(\\frac{1}{3}, \\frac{1}{3}\\right)$.

**Bài 6**: Miền cũ: $0 \\le x \\le 1$, $\\sqrt{x} \\le y \\le 1$ — vùng giữa đường $y=\\sqrt{x}$ (dưới) và $y=1$ (trên).

<svg viewBox="0 0 340 250" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền trên đường y = √x và dưới y = 1 trên [0,1]">
  <defs><marker id="ar15" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar15r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="198.0" y1="200.0" x2="198.0" y2="57.0"/>
<line x1="60.0" y1="90.0" x2="239.4" y2="90.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="261.4" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar15)"/>
  <line x1="60.0" y1="206.0" x2="60.0" y2="35.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar15)"/>
  <text x="253.4" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="198.0" y1="196.0" x2="198.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="198.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="90.0" x2="64.0" y2="90.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="94.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <path d="M 60.0,200.0 L 66.9,175.4 L 73.8,165.2 L 80.7,157.4 L 87.6,150.8 L 94.5,145.0 L 101.4,139.8 L 108.3,134.9 L 115.2,130.4 L 122.1,126.2 L 129.0,122.2 L 135.9,118.4 L 142.8,114.8 L 149.7,111.3 L 156.6,108.0 L 163.5,104.7 L 170.4,101.6 L 177.3,98.6 L 184.2,95.6 L 191.1,92.8 L 198.0,90.0 L 198.0,90.0 L 60.0,90.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.25" stroke-linejoin="round"/>
  <path d="M 60.0,200.0 L 62.5,185.1 L 65.1,178.9 L 67.6,174.2 L 70.1,170.2 L 72.7,166.7 L 75.2,163.5 L 77.7,160.6 L 80.2,157.9 L 82.8,155.3 L 85.3,152.9 L 87.8,150.6 L 90.4,148.4 L 92.9,146.3 L 95.4,144.3 L 98.0,142.3 L 100.5,140.4 L 103.0,138.6 L 105.5,136.8 L 108.1,135.1 L 110.6,133.4 L 113.1,131.7 L 115.7,130.1 L 118.2,128.6 L 120.7,127.0 L 123.2,125.5 L 125.8,124.1 L 128.3,122.6 L 130.8,121.2 L 133.4,119.8 L 135.9,118.4 L 138.4,117.1 L 141.0,115.7 L 143.5,114.4 L 146.0,113.2 L 148.6,111.9 L 151.1,110.6 L 153.6,109.4 L 156.1,108.2 L 158.7,107.0 L 161.2,105.8 L 163.7,104.6 L 166.3,103.5 L 168.8,102.3 L 171.3,101.2 L 173.9,100.1 L 176.4,99.0 L 178.9,97.9 L 181.4,96.8 L 184.0,95.7 L 186.5,94.7 L 189.0,93.6 L 191.6,92.6 L 194.1,91.6 L 196.6,90.6 L 199.2,89.5 L 201.7,88.5 L 204.2,87.6 L 206.7,86.6 L 209.3,85.6 L 211.8,84.6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="135.9" y="145.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = √x (biên dưới)</text>
  <line x1="60.0" y1="90.0" x2="198.0" y2="90.0" stroke="#15803d" stroke-width="2.5"/>
  <text x="101.4" y="82.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">y = 1</text>
  <circle cx="198.0" cy="90.0" r="4" fill="#dc2626"/>
  <text x="206.0" y="78.0" fill="#475569" font-size="11" text-anchor="start">(1,1)</text>
  <text x="170.0" y="238.0" fill="#475569" font-size="12" text-anchor="middle">miền: trên √x, dưới y = 1</text>
</svg>

Đọc lại theo $y$: với $y \\in [0,1]$ cố định, biên $y = \\sqrt{x} \\Leftrightarrow x = y^2$. Trong miền, $x$ chạy từ $0$ tới $y^2$ (vì miền ở **bên trái** đường $y=\\sqrt{x}$, tức $x \\le y^2$). Vậy $0 \\le x \\le y^2$ và $0 \\le y \\le 1$:
$$\\int_0^1\\int_{\\sqrt{x}}^1 f\\,dy\\,dx = \\mathbf{\\int_0^1\\int_0^{y^2} f\\,dx\\,dy}.$$
Verify $f=1$ (diện tích): cũ $\\int_0^1 (1-\\sqrt{x})\\,dx = \\left[x - \\frac{2}{3}x^{3/2}\\right]_0^1 = 1 - \\frac23 = \\frac13$; mới $\\int_0^1 y^2\\,dy = \\frac13$ ✓.

**Bài 7**: Tích phân trong $\\int\\sin(x^2)\\,dx$ không có nguyên hàm sơ cấp → đổi thứ tự. Miền: $0\\le y\\le 1$, $y\\le x\\le 1$ — tam giác trên đường $y=x$. Đọc lại theo $x$: $0\\le x\\le 1$, $0\\le y\\le x$. Đổi:
$$\\int_0^1\\int_0^x \\sin(x^2)\\,dy\\,dx.$$
Trong (theo $y$, $\\sin(x^2)$ hằng): $\\int_0^x \\sin(x^2)\\,dy = x\\sin(x^2)$. Ngoài (đặt $u=x^2$, $du=2x\\,dx$): $\\int_0^1 x\\sin(x^2)\\,dx = \\left[-\\frac{1}{2}\\cos(x^2)\\right]_0^1 = \\frac{1}{2}(1 - \\cos 1) \\approx \\frac{1}{2}(1 - 0.5403) \\approx \\mathbf{0.230}$.

**Bài 8**: Vành khăn: $1 \\le r \\le 2$, $0 \\le \\theta \\le 2\\pi$; $x^2+y^2 = r^2$; $dA = r\\,dr\\,d\\theta$.
$$\\int_0^{2\\pi}\\int_1^2 r^2\\cdot r\\,dr\\,d\\theta = \\int_0^{2\\pi}\\left[\\frac{r^4}{4}\\right]_1^2 d\\theta = \\int_0^{2\\pi}\\frac{16-1}{4}\\,d\\theta = \\frac{15}{4}\\cdot 2\\pi = \\mathbf{\\dfrac{15\\pi}{2}}.$$
(Kiểm tra: bằng kết quả đĩa $R=2$ trừ đĩa $R=1$: $\\frac{\\pi\\cdot 2^4}{2} - \\frac{\\pi\\cdot 1^4}{2} = 8\\pi - \\frac{\\pi}{2} = \\frac{15\\pi}{2}$ ✓.)

---

## 8. Bài tiếp theo

[Lesson 06 — Chuỗi & Taylor](../lesson-06-series-taylor/).

## 📝 Tổng kết

1. **$\\iint_D f\\,dA$** = thể tích dưới mặt cong $f(x,y)$ trên miền $D$ (cộng các cột mỏng $f\\cdot dA$).
2. **Fubini**: tính tích phân lặp (trong → ngoài, cắt lát từng lớp), thứ tự đổi được khi $f$ "đẹp". Hàm tách được → tích 2 tích phân đơn.
3. **Miền tổng quát**: cận biến trong là hàm của biến ngoài (quét cột/hàng). **Đổi thứ tự tích phân**: vẽ miền, đọc lại cận (KHÔNG giữ cận cũ) — cứu các tích phân bế tắc ($e^{y^2}$, $\\sin x^2$).
4. **Tọa độ cực**: $dA = r\\,dr\\,d\\theta$ (đừng quên Jacobian $r$). Cho miền tròn / biểu thức $x^2+y^2$; nhờ $r$ mà tính được tích phân Gauss $\\int e^{-x^2}dx = \\sqrt{\\pi}$.
5. **Cầu, trụ**: 3 chiều đối xứng quay — trụ $dV = r\\,dr\\,d\\theta\\,dz$, cầu $dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$.
6. **Ứng dụng**: diện tích ($f=1$), thể tích, khối lượng ($f=\\rho$), khối tâm (trung bình có trọng số — nhớ chia tổng khối lượng), momen quán tính.
`;
