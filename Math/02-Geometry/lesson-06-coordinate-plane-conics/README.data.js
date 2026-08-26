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

<svg viewBox="0 0 360 308" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hệ trục tọa độ Oxy chia mặt phẳng thành 4 góc phần tư QI, QII, QIII, QIV đánh số ngược chiều kim đồng hồ, kèm dấu của x và y trong từng góc; điểm M(3, 2) nằm trong QI: từ gốc O đi sang phải 3 rồi lên 2; trên trục hoành thì y bằng 0, trên trục tung thì x bằng 0">
  <defs>
    <marker id="k1-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="52" y1="22" x2="52" y2="278"/><line x1="84" y1="22" x2="84" y2="278"/><line x1="116" y1="22" x2="116" y2="278"/><line x1="148" y1="22" x2="148" y2="278"/>
    <line x1="212" y1="22" x2="212" y2="278"/><line x1="244" y1="22" x2="244" y2="278"/><line x1="276" y1="22" x2="276" y2="278"/><line x1="308" y1="22" x2="308" y2="278"/>
    <line x1="20" y1="54" x2="340" y2="54"/><line x1="20" y1="86" x2="340" y2="86"/><line x1="20" y1="118" x2="340" y2="118"/>
    <line x1="20" y1="182" x2="340" y2="182"/><line x1="20" y1="214" x2="340" y2="214"/><line x1="20" y1="246" x2="340" y2="246"/>
  </g>
  <!-- trục -->
  <line x1="14" y1="150" x2="346" y2="150" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k1-ax)"/>
  <line x1="180" y1="286" x2="180" y2="14" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k1-ax)"/>
  <text x="346" y="140" font-size="11" font-weight="700" fill="#1a202c" text-anchor="end">x (Ox)</text>
  <text x="187" y="22" font-size="11" font-weight="700" fill="#1a202c">y (Oy)</text>
  <!-- nhãn số trục -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="52" y="164">−4</text><text x="84" y="164">−3</text><text x="116" y="164">−2</text><text x="148" y="164">−1</text>
    <text x="212" y="164">1</text><text x="244" y="164">2</text><text x="276" y="164">3</text><text x="308" y="164">4</text>
    <text x="172" y="62" text-anchor="end">3</text><text x="172" y="94" text-anchor="end">2</text><text x="172" y="126" text-anchor="end">1</text>
    <text x="172" y="190" text-anchor="end">−1</text><text x="172" y="222" text-anchor="end">−2</text><text x="172" y="254" text-anchor="end">−3</text>
  </g>
  <text x="170" y="166" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- 4 góc phần tư + dấu (x, y) -->
  <text x="270" y="46" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">QI</text>
  <text x="270" y="62" font-size="11" fill="#475569" text-anchor="middle">x &gt; 0, y &gt; 0</text>
  <text x="90" y="46" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">QII</text>
  <text x="90" y="62" font-size="11" fill="#475569" text-anchor="middle">x &lt; 0, y &gt; 0</text>
  <text x="90" y="240" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">QIII</text>
  <text x="90" y="256" font-size="11" fill="#475569" text-anchor="middle">x &lt; 0, y &lt; 0</text>
  <text x="270" y="240" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">QIV</text>
  <text x="270" y="256" font-size="11" fill="#475569" text-anchor="middle">x &gt; 0, y &lt; 0</text>
  <!-- điểm M(3, 2) trong QI, gióng nét đứt về 2 trục -->
  <line x1="276" y1="150" x2="276" y2="86" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="180" y1="86" x2="276" y2="86" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  <circle cx="276" cy="86" r="5" fill="#1d4ed8"/>
  <text x="284" y="80" font-size="12" font-weight="700" fill="#1d4ed8">M(3, 2)</text>
  <!-- chú thích -->
  <text x="180" y="298" font-size="11" fill="#475569" text-anchor="middle">trên Ox: y = 0 · trên Oy: x = 0</text>
</svg>

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

<svg viewBox="0 0 320 312" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông minh họa công thức khoảng cách trên hệ trục Oxy: A(1, 1), B(4, 5), C(4, 1); cạnh ngang AC là delta x bằng 3, cạnh dọc CB là delta y bằng 4, cạnh huyền AB là khoảng cách d bằng 5 theo Pythagoras">
  <defs>
    <marker id="k2-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="90" y1="26" x2="90" y2="292"/><line x1="130" y1="26" x2="130" y2="292"/><line x1="170" y1="26" x2="170" y2="292"/><line x1="210" y1="26" x2="210" y2="292"/><line x1="250" y1="26" x2="250" y2="292"/>
    <line x1="26" y1="230" x2="292" y2="230"/><line x1="26" y1="190" x2="292" y2="190"/><line x1="26" y1="150" x2="292" y2="150"/><line x1="26" y1="110" x2="292" y2="110"/><line x1="26" y1="70" x2="292" y2="70"/><line x1="26" y1="30" x2="292" y2="30"/>
  </g>
  <!-- trục -->
  <line x1="22" y1="270" x2="302" y2="270" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k2-ax)"/>
  <line x1="50" y1="296" x2="50" y2="20" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k2-ax)"/>
  <text x="306" y="262" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="57" y="26" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="90" y="284">1</text><text x="130" y="284">2</text><text x="170" y="284">3</text><text x="210" y="284">4</text><text x="250" y="284">5</text>
    <text x="42" y="234" text-anchor="end">1</text><text x="42" y="194" text-anchor="end">2</text><text x="42" y="154" text-anchor="end">3</text><text x="42" y="114" text-anchor="end">4</text><text x="42" y="74" text-anchor="end">5</text><text x="42" y="34" text-anchor="end">6</text>
  </g>
  <text x="44" y="284" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- ô vuông góc vuông tại C -->
  <path d="M 198 230 L 198 218 L 210 218" fill="none" stroke="#475569" stroke-width="1.5"/>
  <!-- 2 cạnh góc vuông song song trục -->
  <line x1="90" y1="230" x2="210" y2="230" stroke="#1d4ed8" stroke-width="2.2"/>
  <line x1="210" y1="230" x2="210" y2="70" stroke="#1d4ed8" stroke-width="2.2"/>
  <text x="150" y="224" font-size="11" font-weight="600" fill="#1d4ed8" text-anchor="middle">Δx = 3</text>
  <text x="218" y="154" font-size="11" font-weight="600" fill="#1d4ed8">Δy = 4</text>
  <!-- cạnh huyền AB = d -->
  <line x1="90" y1="230" x2="210" y2="70" stroke="#dc2626" stroke-width="2.5"/>
  <text x="141" y="140" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle" transform="rotate(-53 141 140)">d = 5 (cạnh huyền)</text>
  <!-- 3 đỉnh -->
  <circle cx="90" cy="230" r="4.5" fill="#1d4ed8"/>
  <text x="84" y="248" font-size="10.5" font-weight="700" fill="#1d4ed8" text-anchor="end">A(1, 1)</text>
  <circle cx="210" cy="70" r="4.5" fill="#1d4ed8"/>
  <text x="218" y="64" font-size="10.5" font-weight="700" fill="#1d4ed8">B(4, 5)</text>
  <circle cx="210" cy="230" r="4" fill="#334155"/>
  <text x="220" y="246" font-size="10.5" font-weight="600" fill="#334155">C(4, 1)</text>
  <!-- chú thích -->
  <text x="58" y="44" font-size="11" fill="#475569">Δx = 4 − 1 = 3 ; Δy = 5 − 1 = 4</text>
  <text x="58" y="62" font-size="11" fill="#475569">d² = 3² + 4² = 25 → d = 5</text>
</svg>

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

<svg viewBox="0 0 385 316" style="max-width:470px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bốn đường thẳng minh họa hệ số góc trên cùng hệ trục Oxy: y bằng 2x dốc lên gắt, y bằng x dốc lên vừa, y bằng 3 nằm ngang với hệ số góc 0, y bằng trừ x dốc xuống">
  <defs>
    <marker id="k3-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="58" y1="40" x2="58" y2="302"/><line x1="86" y1="40" x2="86" y2="302"/><line x1="114" y1="40" x2="114" y2="302"/><line x1="142" y1="40" x2="142" y2="302"/>
    <line x1="198" y1="40" x2="198" y2="302"/><line x1="226" y1="40" x2="226" y2="302"/><line x1="254" y1="40" x2="254" y2="302"/><line x1="282" y1="40" x2="282" y2="302"/>
    <line x1="44" y1="46" x2="296" y2="46"/><line x1="44" y1="74" x2="296" y2="74"/><line x1="44" y1="102" x2="296" y2="102"/><line x1="44" y1="130" x2="296" y2="130"/><line x1="44" y1="158" x2="296" y2="158"/>
    <line x1="44" y1="214" x2="296" y2="214"/><line x1="44" y1="242" x2="296" y2="242"/><line x1="44" y1="270" x2="296" y2="270"/>
  </g>
  <!-- trục -->
  <line x1="38" y1="186" x2="308" y2="186" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k3-ax)"/>
  <line x1="170" y1="306" x2="170" y2="32" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k3-ax)"/>
  <text x="312" y="178" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="177" y="38" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="58" y="199">−4</text><text x="86" y="199">−3</text><text x="114" y="199">−2</text><text x="142" y="199">−1</text>
    <text x="198" y="199">1</text><text x="226" y="199">2</text><text x="254" y="199">3</text><text x="282" y="199">4</text>
    <text x="162" y="50" text-anchor="end">5</text><text x="162" y="78" text-anchor="end">4</text><text x="162" y="106" text-anchor="end">3</text><text x="162" y="134" text-anchor="end">2</text><text x="162" y="162" text-anchor="end">1</text>
    <text x="162" y="218" text-anchor="end">−1</text><text x="162" y="246" text-anchor="end">−2</text><text x="162" y="274" text-anchor="end">−3</text>
  </g>
  <text x="162" y="200" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- y = 2x (a = 2) -->
  <line x1="114" y1="298" x2="240" y2="46" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="240" y="34" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="middle">y = 2x (a = 2, dốc lên)</text>
  <!-- y = x (a = 1) -->
  <line x1="58" y1="298" x2="290" y2="66" stroke="#15803d" stroke-width="2.5"/>
  <text x="296" y="70" font-size="11" font-weight="700" fill="#15803d">y = x (a = 1)</text>
  <!-- y = 3 (a = 0, nằm ngang) -->
  <line x1="50" y1="102" x2="290" y2="102" stroke="#475569" stroke-width="2.5"/>
  <text x="296" y="106" font-size="11" font-weight="700" fill="#475569">y = 3 (a = 0)</text>
  <!-- y = −x (a = −1) -->
  <line x1="50" y1="66" x2="282" y2="298" stroke="#dc2626" stroke-width="2.5"/>
  <text x="272" y="310" font-size="11" font-weight="700" fill="#dc2626" text-anchor="end">y = −x (a = −1, dốc xuống)</text>
</svg>

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

<svg viewBox="0 0 330 306" style="max-width:410px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường tròn tâm I(2, 1) bán kính R bằng 2 trên hệ trục Oxy: một bán kính R nối tâm I tới điểm trên vành, điểm M(4, 1) trên vành cũng cách I đúng R, minh họa phương trình (x trừ 2) bình phương cộng (y trừ 1) bình phương bằng 4">
  <defs>
    <marker id="k4-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="34" y1="44" x2="34" y2="262"/><line x1="106" y1="44" x2="106" y2="262"/><line x1="142" y1="44" x2="142" y2="262"/><line x1="178" y1="44" x2="178" y2="262"/><line x1="214" y1="44" x2="214" y2="262"/><line x1="250" y1="44" x2="250" y2="262"/><line x1="286" y1="44" x2="286" y2="262"/>
    <line x1="20" y1="82" x2="306" y2="82"/><line x1="20" y1="118" x2="306" y2="118"/><line x1="20" y1="154" x2="306" y2="154"/><line x1="20" y1="226" x2="306" y2="226"/>
  </g>
  <!-- trục -->
  <line x1="14" y1="190" x2="312" y2="190" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k4-ax)"/>
  <line x1="70" y1="266" x2="70" y2="40" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k4-ax)"/>
  <text x="316" y="182" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="77" y="46" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="34" y="204">−1</text><text x="106" y="204">1</text><text x="142" y="204">2</text><text x="178" y="204">3</text><text x="214" y="204">4</text><text x="250" y="204">5</text><text x="286" y="204">6</text>
    <text x="62" y="158" text-anchor="end">1</text><text x="62" y="122" text-anchor="end">2</text><text x="62" y="86" text-anchor="end">3</text><text x="62" y="234" text-anchor="end">−1</text>
  </g>
  <text x="64" y="182" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- đường tròn tâm I(2,1), R = 2 -->
  <circle cx="142" cy="154" r="72" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <!-- bán kính R tới 1 điểm trên vành (hướng 45°) -->
  <line x1="142" y1="154" x2="192.9" y2="103.1" stroke="#15803d" stroke-width="2.2"/>
  <circle cx="192.9" cy="103.1" r="3.5" fill="#15803d"/>
  <text x="159" y="122" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle" transform="rotate(-45 159 122)">R = 2</text>
  <!-- điểm M(4,1) trên vành — cũng cách I đúng R -->
  <line x1="142" y1="154" x2="214" y2="154" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <text x="178" y="148" font-size="10" fill="#475569" text-anchor="middle">= R</text>
  <circle cx="214" cy="154" r="4.5" fill="#dc2626"/>
  <text x="220" y="172" font-size="10.5" font-weight="700" fill="#dc2626">M(4, 1)</text>
  <!-- tâm I -->
  <circle cx="142" cy="154" r="4" fill="#1a202c"/>
  <text x="136" y="170" font-size="11" font-weight="700" fill="#1a202c" text-anchor="end">I(2, 1)</text>
  <!-- chú thích -->
  <text x="165" y="284" font-size="10.5" fill="#475569" text-anchor="middle">mọi điểm (x, y) trên vành cách tâm I đúng R = 2</text>
  <text x="165" y="300" font-size="10.5" fill="#475569" text-anchor="middle">(x − 2)² + (y − 1)² = 4 — dạng (x − x₀)² + (y − y₀)² = R²</text>
</svg>

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

<svg viewBox="0 0 720 256" style="max-width:720px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bốn lát cắt hình nón đôi bằng mặt phẳng: cắt ngang ra đường tròn với e bằng 0, cắt hơi nghiêng ra elip với e nhỏ hơn 1, cắt song song đường sinh ra parabol với e bằng 1, cắt dốc đứng xuyên cả hai nón ra hypebol hai nhánh với e lớn hơn 1">
  <text x="360" y="16" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">Cắt hình nón đôi (double cone) bằng mặt phẳng — đổi góc dao → đổi conic</text>
  <!-- 4 hình nón đôi giống nhau -->
  <g fill="#e2e8f0">
    <polygon points="38,44 90,121 142,44"/><polygon points="90,121 38,198 142,198"/>
    <polygon points="218,44 270,121 322,44"/><polygon points="270,121 218,198 322,198"/>
    <polygon points="398,44 450,121 502,44"/><polygon points="450,121 398,198 502,198"/>
    <polygon points="578,44 630,121 682,44"/><polygon points="630,121 578,198 682,198"/>
  </g>
  <g fill="#f8fafc" stroke="#475569" stroke-width="1.5">
    <ellipse cx="90" cy="44" rx="52" ry="10"/><ellipse cx="90" cy="198" rx="52" ry="10"/>
    <ellipse cx="270" cy="44" rx="52" ry="10"/><ellipse cx="270" cy="198" rx="52" ry="10"/>
    <ellipse cx="450" cy="44" rx="52" ry="10"/><ellipse cx="450" cy="198" rx="52" ry="10"/>
    <ellipse cx="630" cy="44" rx="52" ry="10"/><ellipse cx="630" cy="198" rx="52" ry="10"/>
  </g>
  <g stroke="#475569" stroke-width="1.5">
    <line x1="38" y1="44" x2="90" y2="121"/><line x1="142" y1="44" x2="90" y2="121"/><line x1="90" y1="121" x2="38" y2="198"/><line x1="90" y1="121" x2="142" y2="198"/>
    <line x1="218" y1="44" x2="270" y2="121"/><line x1="322" y1="44" x2="270" y2="121"/><line x1="270" y1="121" x2="218" y2="198"/><line x1="270" y1="121" x2="322" y2="198"/>
    <line x1="398" y1="44" x2="450" y2="121"/><line x1="502" y1="44" x2="450" y2="121"/><line x1="450" y1="121" x2="398" y2="198"/><line x1="450" y1="121" x2="502" y2="198"/>
    <line x1="578" y1="44" x2="630" y2="121"/><line x1="682" y1="44" x2="630" y2="121"/><line x1="630" y1="121" x2="578" y2="198"/><line x1="630" y1="121" x2="682" y2="198"/>
  </g>
  <!-- lát cắt 1: ngang → đường tròn -->
  <ellipse cx="90" cy="161" rx="27" ry="6" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <!-- lát cắt 2: hơi nghiêng → elip (2 đầu chạm 2 sườn nón) -->
  <ellipse cx="280.2" cy="159" rx="29.7" ry="7" fill="none" stroke="#dc2626" stroke-width="2.5" transform="rotate(30.3 280.2 159)"/>
  <!-- lát cắt 3: song song đường sinh → parabol -->
  <line x1="470.3" y1="131" x2="421.6" y2="203" stroke="#dc2626" stroke-width="2.5"/>
  <!-- lát cắt 4: dốc đứng, xuyên cả 2 nón → hypebol -->
  <line x1="645" y1="36" x2="645" y2="206" stroke="#dc2626" stroke-width="2.5"/>
  <!-- nhãn -->
  <g font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">
    <text x="90" y="228">Tròn</text><text x="270" y="228">Elip</text><text x="450" y="228">Parabol</text><text x="630" y="228">Hypebol</text>
  </g>
  <g font-size="10.5" fill="#475569" text-anchor="middle">
    <text x="90" y="244">cắt ngang · e = 0</text><text x="270" y="244">cắt hơi nghiêng · e &lt; 1</text><text x="450" y="244">song song đường sinh · e = 1</text><text x="630" y="244">xuyên 2 nón → 2 nhánh · e &gt; 1</text>
  </g>
</svg>

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

<svg viewBox="0 0 340 322" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Parabol y bình phương bằng 4x với p bằng 2, mở sang phải trên hệ trục Oxy: đỉnh tại gốc O, tiêu điểm F(1, 0), đường chuẩn nét đứt x bằng âm 1; điểm M(2.25, 3) trên parabol cách tiêu điểm F đúng bằng khoảng cách tới đường chuẩn, cùng bằng 3.25; điểm M phẩy đối xứng qua trục hoành">
  <defs>
    <marker id="k6-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="64" y1="22" x2="64" y2="278"/><line x1="128" y1="22" x2="128" y2="278"/><line x1="160" y1="22" x2="160" y2="278"/><line x1="192" y1="22" x2="192" y2="278"/><line x1="224" y1="22" x2="224" y2="278"/><line x1="256" y1="22" x2="256" y2="278"/>
    <line x1="32" y1="54" x2="260" y2="54"/><line x1="32" y1="86" x2="260" y2="86"/><line x1="32" y1="118" x2="260" y2="118"/>
    <line x1="32" y1="182" x2="260" y2="182"/><line x1="32" y1="214" x2="260" y2="214"/><line x1="32" y1="246" x2="260" y2="246"/>
  </g>
  <!-- trục -->
  <line x1="26" y1="150" x2="280" y2="150" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k6-ax)"/>
  <line x1="96" y1="284" x2="96" y2="14" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k6-ax)"/>
  <text x="284" y="142" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="103" y="20" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục (bỏ −1 vì trùng đường chuẩn) -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="128" y="163">1</text><text x="160" y="163">2</text><text x="192" y="163">3</text><text x="224" y="163">4</text><text x="256" y="163">5</text>
    <text x="88" y="58" text-anchor="end">3</text><text x="88" y="90" text-anchor="end">2</text><text x="88" y="122" text-anchor="end">1</text>
    <text x="88" y="186" text-anchor="end">−1</text><text x="88" y="218" text-anchor="end">−2</text><text x="88" y="250" text-anchor="end">−3</text>
  </g>
  <!-- đường chuẩn x = −1 (nét đứt) -->
  <line x1="64" y1="22" x2="64" y2="278" stroke="#15803d" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="54" y="150" font-size="10" font-weight="600" fill="#15803d" text-anchor="middle" transform="rotate(-90 54 150)">đường chuẩn d: x = −1</text>
  <!-- parabol y² = 4x (Bezier bậc 2 vẽ chính xác parabol) -->
  <path d="M 224 278 Q -32 150 224 22" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="230" y="34" font-size="11" font-weight="700" fill="#1d4ed8">y² = 4x (p = 2)</text>
  <!-- MF và khoảng cách tới đường chuẩn -->
  <line x1="168" y1="54" x2="128" y2="150" stroke="#dc2626" stroke-width="2"/>
  <text x="154" y="104" font-size="10.5" font-weight="600" fill="#dc2626">MF = 3.25</text>
  <line x1="168" y1="54" x2="64" y2="54" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <circle cx="64" cy="54" r="3" fill="#94a3b8"/>
  <text x="106" y="68" font-size="10.5" font-weight="600" fill="#475569" text-anchor="middle">d(M, d) = 3.25</text>
  <!-- các điểm -->
  <circle cx="168" cy="54" r="4.5" fill="#1d4ed8"/>
  <text x="162" y="42" font-size="10.5" font-weight="700" fill="#1d4ed8" text-anchor="end">M(2.25, 3)</text>
  <circle cx="168" cy="246" r="3.5" fill="#334155"/>
  <text x="174" y="252" font-size="10.5" font-weight="600" fill="#334155">M′(2.25, −3)</text>
  <circle cx="128" cy="150" r="4.5" fill="#dc2626"/>
  <text x="134" y="142" font-size="10.5" font-weight="700" fill="#dc2626">F(1, 0)</text>
  <circle cx="96" cy="150" r="3" fill="#1a202c"/>
  <text x="90" y="164" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <text x="92" y="176" font-size="9" fill="#475569" text-anchor="end">(đỉnh)</text>
  <!-- chú thích -->
  <text x="170" y="300" font-size="10.5" fill="#475569" text-anchor="middle">MF = √(1.25² + 3²) = 3.25 = d(M, d) = 2.25 + 1</text>
  <text x="170" y="316" font-size="10.5" fill="#475569" text-anchor="middle">parabol = tập điểm cách đều tiêu điểm F và đường chuẩn d (e = 1)</text>
</svg>

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

<svg viewBox="0 0 345 280" style="max-width:430px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Elip x bình phương trên 25 cộng y bình phương trên 9 bằng 1 trên hệ trục Oxy: đỉnh tại cộng trừ 5 trên trục hoành và cộng trừ 3 trên trục tung, hai tiêu điểm F1 tại âm 4 và F2 tại 4 nằm trên trục lớn; điểm M(3, 2.4) trên elip có tổng khoảng cách tới hai tiêu điểm bằng 2a bằng 10">
  <defs>
    <marker id="k7-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="42" y1="20" x2="42" y2="228"/><line x1="68" y1="20" x2="68" y2="228"/><line x1="94" y1="20" x2="94" y2="228"/><line x1="120" y1="20" x2="120" y2="228"/><line x1="146" y1="20" x2="146" y2="228"/>
    <line x1="198" y1="20" x2="198" y2="228"/><line x1="224" y1="20" x2="224" y2="228"/><line x1="250" y1="20" x2="250" y2="228"/><line x1="276" y1="20" x2="276" y2="228"/><line x1="302" y1="20" x2="302" y2="228"/>
    <line x1="14" y1="44" x2="330" y2="44"/><line x1="14" y1="70" x2="330" y2="70"/><line x1="14" y1="96" x2="330" y2="96"/>
    <line x1="14" y1="148" x2="330" y2="148"/><line x1="14" y1="174" x2="330" y2="174"/><line x1="14" y1="200" x2="330" y2="200"/>
  </g>
  <!-- trục -->
  <line x1="8" y1="122" x2="336" y2="122" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k7-ax)"/>
  <line x1="172" y1="236" x2="172" y2="10" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k7-ax)"/>
  <text x="330" y="110" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="179" y="18" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục (bỏ ±4 vì đã có nhãn tiêu điểm) -->
  <g font-size="8.5" fill="#64748b" text-anchor="middle">
    <text x="42" y="135">−5</text><text x="94" y="135">−3</text><text x="120" y="135">−2</text><text x="146" y="135">−1</text>
    <text x="198" y="135">1</text><text x="224" y="135">2</text><text x="250" y="135">3</text><text x="302" y="135">5</text>
    <text x="165" y="47" text-anchor="end">3</text><text x="165" y="73" text-anchor="end">2</text><text x="165" y="99" text-anchor="end">1</text>
    <text x="165" y="151" text-anchor="end">−1</text><text x="165" y="177" text-anchor="end">−2</text><text x="165" y="203" text-anchor="end">−3</text>
  </g>
  <text x="166" y="134" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- elip x²/25 + y²/9 = 1 (a=5, b=3) -->
  <ellipse cx="172" cy="122" rx="130" ry="78" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <!-- điểm M(3, 2.4) và 2 đoạn tới tiêu điểm -->
  <line x1="250" y1="60" x2="68" y2="122" stroke="#15803d" stroke-width="2"/>
  <line x1="250" y1="60" x2="276" y2="122" stroke="#15803d" stroke-width="2"/>
  <text x="150" y="82" font-size="10" font-weight="600" fill="#15803d" text-anchor="middle">MF₁ = 7.4</text>
  <text x="286" y="80" font-size="10" font-weight="600" fill="#15803d">MF₂ = 2.6</text>
  <circle cx="250" cy="60" r="4.5" fill="#15803d"/>
  <text x="256" y="54" font-size="10.5" font-weight="700" fill="#15803d">M(3, 2.4)</text>
  <!-- 4 đỉnh -->
  <circle cx="302" cy="122" r="3.5" fill="#1d4ed8"/>
  <circle cx="42" cy="122" r="3.5" fill="#1d4ed8"/>
  <circle cx="172" cy="44" r="3.5" fill="#1d4ed8"/>
  <circle cx="172" cy="200" r="3.5" fill="#1d4ed8"/>
  <text x="306" y="114" font-size="9.5" font-weight="600" fill="#1d4ed8">(5, 0)</text>
  <text x="38" y="114" font-size="9.5" font-weight="600" fill="#1d4ed8" text-anchor="end">(−5, 0)</text>
  <text x="178" y="40" font-size="9.5" font-weight="600" fill="#1d4ed8">(0, 3)</text>
  <text x="178" y="212" font-size="9.5" font-weight="600" fill="#1d4ed8">(0, −3)</text>
  <!-- 2 tiêu điểm trên trục lớn -->
  <circle cx="68" cy="122" r="4.5" fill="#dc2626"/>
  <circle cx="276" cy="122" r="4.5" fill="#dc2626"/>
  <text x="68" y="146" font-size="9.5" font-weight="700" fill="#dc2626" text-anchor="middle">F₁(−4, 0)</text>
  <text x="276" y="146" font-size="9.5" font-weight="700" fill="#dc2626" text-anchor="middle">F₂(4, 0)</text>
  <!-- chú thích -->
  <text x="172" y="252" font-size="10.5" fill="#475569" text-anchor="middle">MF₁ + MF₂ = 7.4 + 2.6 = 10 = 2a (hằng số với mọi M trên elip)</text>
  <text x="172" y="268" font-size="10.5" fill="#475569" text-anchor="middle">trục lớn 2a = 10, trục nhỏ 2b = 6; c² = a² − b² → c = 4 (TRỪ)</text>
</svg>

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

<svg viewBox="0 0 360 290" style="max-width:450px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hypebol x bình phương trên 16 trừ y bình phương trên 9 bằng 1 trên hệ trục Oxy: hai nhánh mở sang trái và phải, đỉnh tại cộng trừ 4 trên trục hoành, hai tiêu điểm F1 tại âm 5 và F2 tại 5, hai tiệm cận nét đứt y bằng cộng trừ ba phần tư x; điểm M(5, 2.25) có hiệu khoảng cách tới hai tiêu điểm bằng 2a bằng 8">
  <defs>
    <marker id="k8-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="40" y1="26" x2="40" y2="234"/><line x1="60" y1="26" x2="60" y2="234"/><line x1="80" y1="26" x2="80" y2="234"/><line x1="100" y1="26" x2="100" y2="234"/><line x1="120" y1="26" x2="120" y2="234"/><line x1="140" y1="26" x2="140" y2="234"/><line x1="160" y1="26" x2="160" y2="234"/>
    <line x1="200" y1="26" x2="200" y2="234"/><line x1="220" y1="26" x2="220" y2="234"/><line x1="240" y1="26" x2="240" y2="234"/><line x1="260" y1="26" x2="260" y2="234"/><line x1="280" y1="26" x2="280" y2="234"/><line x1="300" y1="26" x2="300" y2="234"/><line x1="320" y1="26" x2="320" y2="234"/>
    <line x1="16" y1="50" x2="344" y2="50"/><line x1="16" y1="70" x2="344" y2="70"/><line x1="16" y1="90" x2="344" y2="90"/><line x1="16" y1="110" x2="344" y2="110"/>
    <line x1="16" y1="150" x2="344" y2="150"/><line x1="16" y1="170" x2="344" y2="170"/><line x1="16" y1="190" x2="344" y2="190"/><line x1="16" y1="210" x2="344" y2="210"/>
  </g>
  <!-- trục -->
  <line x1="10" y1="130" x2="348" y2="130" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k8-ax)"/>
  <line x1="180" y1="240" x2="180" y2="20" stroke="#1a202c" stroke-width="1.6" marker-end="url(#k8-ax)"/>
  <text x="342" y="118" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="187" y="28" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="60" y="143">−6</text><text x="140" y="143">−2</text><text x="220" y="143">2</text><text x="300" y="143">6</text>
    <text x="173" y="53" text-anchor="end">4</text><text x="173" y="93" text-anchor="end">2</text><text x="173" y="173" text-anchor="end">−2</text><text x="173" y="213" text-anchor="end">−4</text>
  </g>
  <text x="171" y="142" font-size="10" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <!-- 2 tiệm cận nét đứt y = ±(3/4)x -->
  <line x1="46.7" y1="230" x2="313.3" y2="30" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="6,5"/>
  <line x1="46.7" y1="30" x2="313.3" y2="230" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="6,5"/>
  <text x="311" y="22" font-size="9.5" fill="#475569" text-anchor="end">tiệm cận y = (3/4)x</text>
  <text x="311" y="246" font-size="9.5" fill="#475569" text-anchor="end">tiệm cận y = −(3/4)x</text>
  <!-- 2 nhánh hypebol x²/16 − y²/9 = 1 -->
  <path d="M 335.5 230 L 329.8 225 324.2 220 318.7 215 313.3 210 308.1 205 302.9 200 297.9 195 293.1 190 288.5 185 284.1 180 280 175 276.1 170 272.6 165 269.4 160 266.7 155 264.3 150 262.5 145 261.1 140 260.3 135 260 130 260.3 125 261.1 120 262.5 115 264.3 110 266.7 105 269.4 100 272.6 95 276.1 90 280 85 284.1 80 288.5 75 293.1 70 297.9 65 302.9 60 308.1 55 313.3 50 318.7 45 324.2 40 329.8 35 335.5 30" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 24.5 230 L 30.2 225 35.8 220 41.3 215 46.7 210 51.9 205 57.1 200 62.1 195 66.9 190 71.5 185 75.9 180 80 175 83.9 170 87.4 165 90.6 160 93.3 155 95.7 150 97.5 145 98.9 140 99.7 135 100 130 99.7 125 98.9 120 97.5 115 95.7 110 93.3 105 90.6 100 87.4 95 83.9 90 80 85 75.9 80 71.5 75 66.9 70 62.1 65 57.1 60 51.9 55 46.7 50 41.3 45 35.8 40 30.2 35 24.5 30" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="166" y="28" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="end">x²/16 − y²/9 = 1</text>
  <!-- điểm M và 2 đoạn tới tiêu điểm -->
  <line x1="280" y1="85" x2="80" y2="130" stroke="#15803d" stroke-width="2"/>
  <line x1="280" y1="85" x2="280" y2="130" stroke="#15803d" stroke-width="2"/>
  <text x="166" y="100" font-size="10" font-weight="600" fill="#15803d" text-anchor="middle">MF₁ = 10.25</text>
  <text x="286" y="112" font-size="10" font-weight="600" fill="#15803d">MF₂ = 2.25</text>
  <circle cx="280" cy="85" r="4.5" fill="#15803d"/>
  <text x="274" y="78" font-size="10" font-weight="700" fill="#15803d" text-anchor="end">M(5, 2.25)</text>
  <!-- đỉnh và tiêu điểm -->
  <circle cx="100" cy="130" r="4" fill="#1d4ed8"/>
  <circle cx="260" cy="130" r="4" fill="#1d4ed8"/>
  <text x="108" y="150" font-size="9.5" font-weight="600" fill="#1d4ed8" text-anchor="middle">đỉnh (−4, 0)</text>
  <text x="252" y="150" font-size="9.5" font-weight="600" fill="#1d4ed8" text-anchor="middle">đỉnh (4, 0)</text>
  <circle cx="80" cy="130" r="4.5" fill="#dc2626"/>
  <circle cx="280" cy="130" r="4.5" fill="#dc2626"/>
  <text x="78" y="116" font-size="9.5" font-weight="700" fill="#dc2626" text-anchor="middle">F₁(−5, 0)</text>
  <text x="284" y="148" font-size="9.5" font-weight="700" fill="#dc2626">F₂(5, 0)</text>
  <!-- chú thích -->
  <text x="180" y="262" font-size="10.5" fill="#475569" text-anchor="middle">|MF₁ − MF₂| = 10.25 − 2.25 = 8 = 2a (hằng số với mọi M)</text>
  <text x="180" y="278" font-size="10.5" fill="#475569" text-anchor="middle">c² = a² + b² = 16 + 9 = 25 → c = 5 (CỘNG, khác elip)</text>
</svg>

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
