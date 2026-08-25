// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-08-elementary-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Hàm sơ cấp

## Mục tiêu

- Khảo sát các loại **hàm sơ cấp (elementary functions)** quan trọng:
  - **Hàm hằng** $y = c$ (đường ngang).
  - **Hàm bậc 1** $y = ax + b$ (đường thẳng).
  - **Hàm bậc 2** $y = ax^2 + bx + c$ (parabol).
  - **Hàm đa thức (polynomial)** $y = a_n x^n + \\dots + a_0$ và **phân thức hữu tỉ (rational)** $y = P(x)/Q(x)$.
  - **Hàm mũ (exponential)** $y = a^x$ ($a > 0, a \\neq 1$), đặc biệt $e^x$.
  - **Hàm log (logarithm)** $y = \\log_a(x)$.
  - **Hàm trị tuyệt đối** $y = |x|$ và **hàm sàn/trần (floor/ceiling)** $\\lfloor x \\rfloor$, $\\lceil x \\rceil$.
- Hiểu mối liên hệ giữa **mũ và log** (hàm ngược của nhau).
- Đọc được **tính chất** mỗi họ hàm: đồng biến/nghịch biến, **tiệm cận (asymptote)**, miền xác định (domain) và miền giá trị (range).
- Nắm **biến đổi đồ thị (graph transformation)**: dịch (shift), co giãn (scale), lật (reflect) — $f(x-h)+k$, $a\\,f(x)$, $f(-x)$.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/): đa thức, phân tích nhân tử.
- [Lesson 04 — PT bậc 2](../lesson-04-quadratic-equations/): $\\Delta$, nghiệm, đỉnh parabol.
- [Lesson 06 — Lũy thừa, log](../lesson-06-powers-roots-logs/): $a^n$, $\\log_a x$ và các quy tắc.
- [Lesson 07 — Hàm số](../lesson-07-functions-intro/): khái niệm hàm, domain/range, hàm hợp, hàm ngược, hàm chẵn/lẻ.

💡 **Bài này khác Lesson 07 ở đâu?** Lesson 07 dạy *"hàm số là gì"* (quy tắc input→output, cách tìm domain/range nói chung). Bài này đi **danh mục cụ thể**: với mỗi *họ* hàm sơ cấp, ta hỏi *"nó trông như thế nào, dùng ở đâu, đồ thị có hình gì, đổi dạng ra sao"*. Coi đây là "sổ tay nhận dạng" các đường cong bạn sẽ gặp suốt giải tích, vật lý và ML.

---

## 0. Bộ sưu tập trực giác — mỗi họ hàm "trông như thế nào"

💡 Trước khi đi vào từng họ, đây là **bức tranh tổng thể**: mỗi hàm sơ cấp có một "dáng" đặc trưng và một "công việc" mà nó làm tốt nhất. Học nhận diện dáng trước, công thức sau.

<svg viewBox="0 0 640 304" style="max-width:760px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tám dáng đồ thị đặc trưng: hằng, bậc nhất, bậc hai, mũ, log, trị tuyệt đối, hàm sàn và phân thức 1/x">
  <defs>
    <marker id="f1ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- vách ngăn giữa các ô -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="160" y1="8" x2="160" y2="296"/><line x1="320" y1="8" x2="320" y2="296"/><line x1="480" y1="8" x2="480" y2="296"/>
    <line x1="8" y1="152" x2="632" y2="152"/>
  </g>
  <!-- Ô 1: HẰNG y = c -->
  <g>
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">HẰNG y = c</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <line x1="77" y1="50" x2="83" y2="50" stroke="#1a202c" stroke-width="1.2"/>
    <text x="74" y="54" font-size="9.5" fill="#475569" text-anchor="end">c</text>
    <line x1="25" y1="50" x2="138" y2="50" stroke="#1d4ed8" stroke-width="2.2"/>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"đứng yên"</text>
  </g>
  <!-- Ô 2: BẬC 1 y = x -->
  <g transform="translate(160,0)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">BẬC 1 y = x</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <line x1="27" y1="114" x2="133" y2="38" stroke="#1d4ed8" stroke-width="2.2"/>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"dốc đều"</text>
  </g>
  <!-- Ô 3: BẬC 2 y = x² (parabol qua (−2,4),(0,0),(2,4)) -->
  <g transform="translate(320,0)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">BẬC 2 y = x²</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <path d="M36,36 Q80,116 124,36" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"ném vật"</text>
  </g>
  <!-- Ô 4: MŨ y = 2ˣ (qua (0,1), tiệm cận trục x bên trái) -->
  <g transform="translate(480,0)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">MŨ y = 2ˣ</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <path d="M27,74 C55,71.5 68,68.5 80,64 C93,59 110,44 124,28" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <circle cx="80" cy="64" r="2.6" fill="#dc2626"/>
    <text x="74" y="61" font-size="8.5" fill="#475569" text-anchor="end">(0,1)</text>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"bùng nổ"</text>
  </g>
  <!-- Ô 5: LOG y = log x (qua (1,0), tiệm cận đứng trục y) -->
  <g transform="translate(0,152)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">LOG y = log x</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="44" y1="126" x2="44" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="50" y="33" font-size="8.5" fill="#64748b">y</text>
    <path d="M48,124 C50,114 52,107 55,103 C60,95 68,84 80,76 C95,66.5 118,58 141,53" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <circle cx="80" cy="76" r="2.6" fill="#dc2626"/>
    <text x="80" y="88" font-size="8.5" fill="#475569" text-anchor="middle">1</text>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"nén / chậm"</text>
  </g>
  <!-- Ô 6: TRỊ TUYỆT ĐỐI |x| (chữ V đỉnh tại gốc) -->
  <g transform="translate(160,152)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">TRỊ TUYỆT ĐỐI |x|</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <path d="M27,38 L80,76 L133,38" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"khoảng cách"</text>
  </g>
  <!-- Ô 7: SÀN ⌊x⌋ (bậc thang, chấm đặc = đầu đóng, chấm rỗng = đầu mở) -->
  <g transform="translate(320,152)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">SÀN ⌊x⌋</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <g stroke="#1d4ed8" stroke-width="2.2">
      <line x1="36" y1="108" x2="58" y2="108"/><line x1="58" y1="92" x2="80" y2="92"/>
      <line x1="80" y1="76" x2="102" y2="76"/><line x1="102" y1="60" x2="124" y2="60"/><line x1="124" y1="44" x2="140" y2="44"/>
    </g>
    <g fill="#1d4ed8">
      <circle cx="36" cy="108" r="2.4"/><circle cx="58" cy="92" r="2.4"/><circle cx="80" cy="76" r="2.4"/><circle cx="102" cy="60" r="2.4"/><circle cx="124" cy="44" r="2.4"/>
    </g>
    <g fill="#f8fafc" stroke="#1d4ed8" stroke-width="1.4">
      <circle cx="58" cy="108" r="2.4"/><circle cx="80" cy="92" r="2.4"/><circle cx="102" cy="76" r="2.4"/><circle cx="124" cy="60" r="2.4"/>
    </g>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"bậc thang"</text>
  </g>
  <!-- Ô 8: PHÂN THỨC 1/x (2 nhánh, tiệm cận là 2 trục) -->
  <g transform="translate(480,152)">
    <text x="80" y="16" font-size="11" font-weight="700" fill="#1a202c" text-anchor="middle">PHÂN THỨC 1/x</text>
    <line x1="16" y1="76" x2="146" y2="76" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <line x1="80" y1="126" x2="80" y2="28" stroke="#1a202c" stroke-width="1.2" marker-end="url(#f1ax)"/>
    <text x="141" y="87" font-size="8.5" fill="#64748b">x</text><text x="86" y="33" font-size="8.5" fill="#64748b">y</text>
    <path d="M87,28 C89,37 90,41 91,44 C94,52 97,57 102,60 C110,65 122,68.5 137,70" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <path d="M73,124 C71,115 70,111 69,108 C66,100 63,95 58,92 C50,87 38,83.5 23,82" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
    <text x="80" y="144" font-size="10.5" fill="#475569" text-anchor="middle">"tiệm cận 2 phía"</text>
  </g>
</svg>

| Họ hàm | Dáng đồ thị | Công việc đặc trưng (dùng ở đâu) |
|--------|-------------|----------------------------------|
| Hằng $y=c$ | Đường ngang | Giá trị cố định: phí cố định, hằng số vật lý |
| Bậc 1 $y=ax+b$ | Đường thẳng | Quan hệ tuyến tính: vận tốc đều, linear regression |
| Bậc 2 $y=ax^2+bx+c$ | Parabol | **Ném vật** (quỹ đạo), tối ưu hóa (tìm min/max) |
| Đa thức bậc $n$ | Lượn $\\le n-1$ "khúc" | Khớp đường cong (curve fitting), nội suy |
| Phân thức $P/Q$ | Có tiệm cận | Tỉ lệ, nồng độ, tốc độ phản ứng bão hòa |
| Mũ $a^x$ | **Bùng nổ / phân rã** | **Tăng trưởng**: dân số, lãi kép, phóng xạ |
| Log $\\log_a x$ | Cong, tăng chậm | **Nén** thang đo: pH, Richter, decibel, $O(\\log n)$ |
| Trị tuyệt đối $|x|$ | Chữ V | **Khoảng cách**, sai số (loss L1) |
| Sàn/trần $\\lfloor x\\rfloor$ | Bậc thang | Làm tròn, chia ô, giá cước bậc thang |

Phần còn lại của bài "mổ xẻ" từng dòng trong bảng này bằng số cụ thể.

---

## 1. Hàm hằng & hàm bậc 1 — Đường ngang và đường thẳng

### 1.0. Hàm hằng

$$y = c \\quad (c \\text{ là số cố định})$$

💡 **Là gì**: output **không đổi** dù x là gì — đồ thị là **đường nằm ngang** ở độ cao $c$. Đây là trường hợp đặc biệt của bậc 1 với $a = 0$.

- $D = \\mathbb{R}$, $E = \\{c\\}$ (chỉ đúng một giá trị).
- Không đồng biến cũng không nghịch biến (phẳng lì).
- **Vừa chẵn vừa lẻ?** $f(-x) = c = f(x)$ → chẵn (đối xứng trục y). Lẻ chỉ khi $c = 0$.

**4 ví dụ số**: với $f(x) = 5$: $f(0) = 5$, $f(100) = 5$, $f(-3) = 5$, $f(\\sqrt{2}) = 5$ — mọi input đều ra 5.

**Dùng ở đâu**: phí thuê bao cố định (50.000đ/tháng bất kể dùng bao nhiêu), gia tốc trọng trường $g \\approx 9.8$ coi như hằng, đường tiệm cận ngang của hàm khác.

### 1.1. Hàm bậc 1

$$y = ax + b$$

💡 **Là gì**: đồ thị là đường thẳng. **$a$ = hệ số góc** (slope) đo "dốc", **$b$ = tung độ gốc** (cắt trục y).

- $a > 0$: đồng biến (tăng).
- $a < 0$: nghịch biến (giảm).
- $a = 0$: hằng số (đường ngang).

**Vì sao quan trọng**: mô hình tuyến tính trong hầu hết mọi thứ — vận tốc đều, chi phí cố định, ML linear regression.

**Verify slope bằng số**: $y = 2x - 3$. Tại $x=0$ → $y=-3$; tại $x=1$ → $y=-1$. Khi x tăng 1, y tăng 2 → slope $a=2$ ✓. Cắt trục y tại $b=-3$ ✓.

**Bảng giá trị + đồ thị** $y = 2x - 3$:

| x | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|----|----|----|----|----|
| $y$ | $-5$ | $-3$ | $-1$ | $1$ | $3$ |

<svg viewBox="0 0 380 348" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm bậc nhất y bằng 2x trừ 3: đường thẳng dốc lên qua các điểm trong bảng, cắt trục y tại (0, −3), tam giác nét đứt minh họa hệ số góc x tăng 1 thì y tăng 2">
  <defs>
    <marker id="f3ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="32" y1="20" x2="32" y2="330"/><line x1="66" y1="20" x2="66" y2="330"/>
    <line x1="134" y1="20" x2="134" y2="330"/><line x1="168" y1="20" x2="168" y2="330"/><line x1="202" y1="20" x2="202" y2="330"/>
    <line x1="20" y1="46" x2="230" y2="46"/><line x1="20" y1="80" x2="230" y2="80"/><line x1="20" y1="114" x2="230" y2="114"/>
    <line x1="20" y1="182" x2="230" y2="182"/><line x1="20" y1="216" x2="230" y2="216"/><line x1="20" y1="250" x2="230" y2="250"/>
    <line x1="20" y1="284" x2="230" y2="284"/><line x1="20" y1="318" x2="230" y2="318"/>
  </g>
  <!-- trục -->
  <line x1="16" y1="148" x2="246" y2="148" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f3ax)"/>
  <line x1="100" y1="340" x2="100" y2="16" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f3ax)"/>
  <text x="256" y="142" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="108" y="24" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="32" y="162">−2</text><text x="66" y="162">−1</text><text x="134" y="162">1</text><text x="168" y="162">2</text><text x="202" y="162">3</text>
    <text x="92" y="50" text-anchor="end">3</text><text x="92" y="118" text-anchor="end">1</text>
    <text x="92" y="186" text-anchor="end">−1</text><text x="92" y="254" text-anchor="end">−3</text><text x="92" y="322" text-anchor="end">−5</text>
  </g>
  <text x="94" y="162" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- đường thẳng y = 2x − 3 -->
  <line x1="62.6" y1="324.8" x2="212.2" y2="25.6" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="220" y="32" font-size="11" font-weight="700" fill="#1d4ed8">y = 2x − 3</text>
  <!-- tam giác slope: từ (1, −1) sang phải 1, lên 2 tới (2, 1) -->
  <line x1="134" y1="182" x2="168" y2="182" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <line x1="168" y1="182" x2="168" y2="114" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <text x="151" y="196" font-size="9.5" fill="#475569" text-anchor="middle">+1</text>
  <text x="174" y="152" font-size="9.5" fill="#475569">+2</text>
  <text x="232" y="108" font-size="9.5" fill="#475569">slope a = +2:</text>
  <text x="232" y="122" font-size="9.5" fill="#475569">x tăng 1 → y tăng 2</text>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="66" cy="318" r="3.5"/><circle cx="100" cy="250" r="3.5"/><circle cx="134" cy="182" r="3.5"/>
    <circle cx="168" cy="114" r="3.5"/><circle cx="202" cy="46" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="196" y="40" text-anchor="end">(3, 3)</text>
    <text x="108" y="256">(0, −3) — tung độ gốc</text>
  </g>
</svg>

**4 ví dụ số đa dạng** (tính giá trị, slope, giao trục):

1. $y = 3x + 6$: $a=3>0$ tăng; cắt y tại $(0,6)$; cắt x tại $x=-6/3=-2$. $y(4)=18$.
2. $y = -\\tfrac12 x + 2$: $a=-0.5<0$ giảm; cắt y tại $(0,2)$; cắt x tại $x=4$. $y(-2)=3$.
3. $y = 0\\cdot x + 7 = 7$: hàm hằng (đường ngang), không cắt trục x. $y(99)=7$.
4. $y = x$ (với $a=1,b=0$): đường phân giác góc phần tư I–III, đi qua gốc O. $y(-5)=-5$.

⚠ **Lỗi thường gặp**: nhầm "hệ số góc" với "tung độ gốc". $a$ là **độ dốc** (x tăng 1 thì y tăng $a$); $b$ là **chỗ cắt trục y** (giá trị tại $x=0$).

❓ **Câu hỏi tự nhiên của người đọc**: *"Đường thẳng cắt trục x ở đâu?"* Giải $ax+b=0$ → $x = -b/a$. Vd $2x-3=0$ → $x = 1.5$.

🔁 **Dừng lại tự kiểm tra**: $y = -x + 4$ đồng biến hay nghịch biến? Cắt trục y ở đâu?

<details><summary>Đáp án</summary>

$a = -1 < 0$ → **nghịch biến** (giảm). Cắt trục y tại $(0, 4)$.

</details>

### 📝 Tóm tắt mục 1

- Hàm hằng $y=c$: đường ngang, $E=\\{c\\}$, là bậc 1 với $a=0$.
- $y = ax + b$: đường thẳng, $a$ = độ dốc, $b$ = tung độ gốc.
- $a>0$ tăng, $a<0$ giảm, $a=0$ ngang. Cắt trục x tại $x = -b/a$.

---

## 2. Hàm bậc 2 — Parabol

$$y = ax^2 + bx + c$$

💡 **Là gì**: đồ thị là **parabol**.

- **$a > 0$**: parabol "mở lên" (mặt cười).
- **$a < 0$**: mở xuống (mặt buồn).
- **Đỉnh** tại $x = -b/(2a)$, $y = c - b^2/(4a) = -\\Delta/(4a)$.
- Đối xứng qua trục đứng $x = -b/(2a)$.

**Ứng dụng**: quỹ đạo ném (Lesson 01 Physics), tối ưu hóa (max/min của parabol).

**Verify đỉnh bằng số**: $y = x^2 - 4x + 3$. Đỉnh tại $x = -(-4)/(2\\cdot 1) = 2$; $y(2) = 4-8+3 = -1$ → đỉnh $(2, -1)$. Liên hệ nghiệm (chỗ cắt trục x) ở [Lesson 04](../lesson-04-quadratic-equations/): $x=1, x=3$, đỉnh nằm chính giữa $(1+3)/2 = 2$ ✓.

**Bảng giá trị + đồ thị** $y = x^2 - 4x + 3$ (đỉnh $(2,-1)$, mở lên):

| x | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|----|----|----|----|----|
| $y$ | $3$ | $0$ | $-1$ | $0$ | $3$ |

<svg viewBox="0 0 320 300" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị parabol y bằng x bình phương trừ 4x cộng 3: mở lên, đỉnh (2, −1) là điểm thấp nhất, cắt trục x tại x bằng 1 và x bằng 3, trục đối xứng đứng x bằng 2">
  <defs>
    <marker id="f4ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="100" y1="20" x2="100" y2="268"/><line x1="144" y1="20" x2="144" y2="268"/>
    <line x1="188" y1="20" x2="188" y2="268"/><line x1="232" y1="20" x2="232" y2="268"/>
    <line x1="26" y1="58" x2="250" y2="58"/><line x1="26" y1="102" x2="250" y2="102"/>
    <line x1="26" y1="146" x2="250" y2="146"/><line x1="26" y1="234" x2="250" y2="234"/>
  </g>
  <!-- trục -->
  <line x1="20" y1="190" x2="264" y2="190" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f4ax)"/>
  <line x1="56" y1="282" x2="56" y2="16" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f4ax)"/>
  <text x="272" y="183" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="64" y="24" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="100" y="204">1</text><text x="144" y="204">2</text><text x="188" y="204">3</text><text x="232" y="204">4</text>
    <text x="48" y="62" text-anchor="end">3</text><text x="48" y="106" text-anchor="end">2</text>
    <text x="48" y="150" text-anchor="end">1</text><text x="48" y="238" text-anchor="end">−1</text>
  </g>
  <text x="50" y="204" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- trục đối xứng x = 2 -->
  <line x1="144" y1="60" x2="144" y2="266" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <text x="144" y="292" font-size="9.5" fill="#475569" text-anchor="middle">trục đối xứng x = 2</text>
  <!-- parabol (Bézier bậc 2 biểu diễn chính xác): đỉnh (2, −1), qua (0,3),(1,0),(3,0),(4,3) -->
  <path d="M47.2,21 Q144,447 240.8,21" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="144" y="48" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="middle">y = x² − 4x + 3</text>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="56" cy="58" r="3.5"/><circle cx="100" cy="190" r="3.5"/><circle cx="144" cy="234" r="3.5"/>
    <circle cx="188" cy="190" r="3.5"/><circle cx="232" cy="58" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="64" y="54">(0, 3)</text>
    <text x="90" y="178" text-anchor="end">(1, 0)</text>
    <text x="198" y="178">(3, 0)</text>
    <text x="238" y="54">(4, 3)</text>
    <text x="152" y="254">đỉnh (2, −1) = MIN</text>
  </g>
</svg>

**4 ví dụ số đa dạng** (tìm đỉnh, hướng mở, range):

1. $y = x^2$: $a=1>0$ mở lên; đỉnh $(0,0)$ là **min**; $E=[0,\\infty)$.
2. $y = -2x^2 + 8x - 5$: $a=-2<0$ mở xuống; đỉnh $x=-8/(2\\cdot-2)=2$, $y(2)=-8+16-5=3$ → đỉnh $(2,3)$ là **max**; $E=(-\\infty,3]$.
3. $y = x^2 + 2x + 1 = (x+1)^2$: đỉnh $(-1,0)$ (nghiệm kép); $y(1)=4$.
4. $y = 3x^2 - 12$: đỉnh $(0,-12)$; cắt x tại $3x^2=12 \\Rightarrow x=\\pm 2$; $E=[-12,\\infty)$.

⚠ **Lỗi thường gặp**: nhớ sai dấu công thức đỉnh — là $x = -b/(2a)$, với $b=-4$ thì $-b = +4$, không phải $-4$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Đỉnh là max hay min?"* Nếu $a>0$ (mở lên) → đỉnh là **điểm thấp nhất (min)**; nếu $a<0$ (mở xuống) → đỉnh là **max**.

🔁 **Dừng lại tự kiểm tra**: tìm đỉnh của $y = x^2 - 6x + 5$.

<details><summary>Đáp án</summary>

$x = 6/2 = 3$, $y(3) = 9-18+5 = -4$ → đỉnh $(3, -4)$, là **min** (vì $a>0$).

</details>

### 📝 Tóm tắt mục 2

- $y = ax^2+bx+c$: parabol; $a>0$ mở lên (đỉnh = min), $a<0$ mở xuống (đỉnh = max).
- Đỉnh tại $x = -b/(2a)$, nằm giữa 2 nghiệm; trục đối xứng đứng qua đỉnh.

---

## 3. Hàm đa thức & phân thức hữu tỉ

### 3.1. Hàm đa thức (polynomial)

$$y = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0 \\quad (a_n \\neq 0)$$

💡 **Là gì**: tổng các lũy thừa nguyên không âm của x. **Bậc (degree)** $n$ = số mũ cao nhất. Hằng (bậc 0), bậc 1, bậc 2 ở trên đều là trường hợp riêng. Đồ thị là **đường cong mượt** (không gãy, không nhảy), lượn lên xuống **tối đa $n-1$ lần**.

- $D = \\mathbb{R}$ (đa thức tính được với mọi x — không có mẫu, căn hay log).
- **Hành vi đuôi (end behavior)** quyết định bởi số hạng bậc cao nhất $a_n x^n$:
  - $n$ chẵn: hai đuôi cùng hướng (cùng lên nếu $a_n>0$, cùng xuống nếu $a_n<0$) — giống parabol.
  - $n$ lẻ: hai đuôi ngược hướng (xuống-lên nếu $a_n>0$) — giống $x^3$.

**Trực giác "đuôi đa thức"**: khi $|x|$ rất lớn, số hạng bậc cao nhất "nuốt chửng" các số hạng còn lại. Vd $y = x^3 - 100x$: tại $x=1000$, $x^3 = 10^9$ áp đảo $100x = 10^5$ → đồ thị xử sự gần như $x^3$.

**Walk-through $y = x^3 - 3x$ (bậc lẻ, lượn $2$ khúc)**:

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|----|----|---|---|---|
| $y$ | $-2$ | $2$ | $0$ | $-2$ | $2$ |

<svg viewBox="0 0 340 328" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm bậc ba y bằng x mũ 3 trừ 3x: lượn hai khúc, max cục bộ tại (−1, 2), min cục bộ tại (1, −2), qua gốc O, hai đuôi ngược hướng vì bậc lẻ">
  <defs>
    <marker id="f5ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="86" y1="20" x2="86" y2="300"/><line x1="128" y1="20" x2="128" y2="300"/>
    <line x1="212" y1="20" x2="212" y2="300"/><line x1="254" y1="20" x2="254" y2="300"/>
    <line x1="24" y1="76" x2="310" y2="76"/><line x1="24" y1="118" x2="310" y2="118"/>
    <line x1="24" y1="202" x2="310" y2="202"/><line x1="24" y1="244" x2="310" y2="244"/>
  </g>
  <!-- trục -->
  <line x1="24" y1="160" x2="316" y2="160" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f5ax)"/>
  <line x1="170" y1="300" x2="170" y2="20" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f5ax)"/>
  <text x="324" y="153" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="178" y="28" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="86" y="174">−2</text><text x="128" y="174">−1</text><text x="212" y="174">1</text><text x="254" y="174">2</text>
    <text x="162" y="80" text-anchor="end">2</text><text x="162" y="248" text-anchor="end">−2</text>
  </g>
  <text x="163" y="174" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- gióng nét đứt tới max/min cục bộ -->
  <line x1="170" y1="76" x2="128" y2="76" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <line x1="170" y1="244" x2="212" y2="244" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <!-- đường cong y = x^3 − 3x (Bézier bậc 3 biểu diễn chính xác đa thức bậc 3) -->
  <path d="M81.8,284.4 C140.6,-317.2 199.4,637.2 258.2,35.6" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="30" y="40" font-size="11" font-weight="700" fill="#1d4ed8">y = x³ − 3x</text>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="86" cy="244" r="3.5"/><circle cx="128" cy="76" r="3.5"/><circle cx="170" cy="160" r="3.5"/>
    <circle cx="212" cy="244" r="3.5"/><circle cx="254" cy="76" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="122" y="62" text-anchor="end">max cục bộ (−1, 2)</text>
    <text x="218" y="262">min cục bộ (1, −2)</text>
    <text x="78" y="262" text-anchor="end">(−2, −2)</text>
    <text x="260" y="70">(2, 2)</text>
  </g>
  <!-- hành vi đuôi -->
  <text x="170" y="318" font-size="9.5" fill="#475569" text-anchor="middle">x → −∞ thì y → −∞ · x → +∞ thì y → +∞ (hai đuôi ngược hướng — bậc lẻ)</text>
</svg>

Đồ thị lên (tới max cục bộ tại $x=-1$), xuống (tới min cục bộ tại $x=1$), rồi lên — **2 khúc lượn** $= n-1 = 3-1$.

**4 ví dụ số đa dạng**:

1. $y = x^3$: bậc 3 lẻ, qua O, hàm lẻ; $y(2)=8$, $y(-2)=-8$. Lượn $0$ khúc (đơn điệu tăng).
2. $y = x^4 - 5x^2 + 4$: bậc 4 chẵn, hai đuôi cùng lên. Nghiệm: đặt $t=x^2$, $t^2-5t+4=0 \\Rightarrow t=1,4 \\Rightarrow x=\\pm1,\\pm2$. $y(0)=4$.
3. $y = 2x^3 - 6x^2$: bậc 3, $y(0)=0$, $y(3)=54-54=0$, $y(1)=2-6=-4$.
4. $y = -x^2 + 1$: bậc 2 (đa thức là khái niệm bao trùm); đuôi cùng xuống vì $a_n<0$; $y(0)=1$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Đa thức bậc $n$ có nhiều nhất bao nhiêu nghiệm?"* Tối đa $n$ nghiệm thực (định lý cơ bản đại số). $x^3-3x = x(x^2-3)$ có $3$ nghiệm $0,\\pm\\sqrt3$. Có thể ít hơn: $x^2+1$ (bậc 2) có $0$ nghiệm thực.

⚠ **Lỗi thường gặp**: tưởng "bậc $n$ thì lượn $n$ khúc". Sai — lượn **tối đa $n-1$** khúc (tối đa $n-1$ điểm cực trị). $x^3$ bậc 3 nhưng lượn $0$ khúc.

🔁 **Dừng lại tự kiểm tra**: $y = x^4$ có bao nhiêu khúc lượn? Hai đuôi hướng nào?

<details><summary>Đáp án</summary>

Bậc chẵn $a_n=1>0$ → hai đuôi **cùng lên**. Đồ thị giống parabol bẹt đáy, lượn **1** khúc (chỉ một min tại O). (Tối đa $n-1=3$ nhưng thực tế chỉ 1.)

</details>

### 3.2. Phân thức hữu tỉ (rational function)

$$y = \\frac{P(x)}{Q(x)} \\quad (P, Q \\text{ là đa thức}, \\ Q \\neq 0)$$

💡 **Là gì**: thương hai đa thức. Điều thú vị nhất: **tiệm cận (asymptote)** — đường mà đồ thị tiến sát nhưng không chạm.

- $D = \\mathbb{R} \\setminus \\{x : Q(x) = 0\\}$ (loại các x làm mẫu bằng 0).
- **Tiệm cận đứng (vertical asymptote)**: tại $x = x_0$ làm $Q(x_0)=0$ nhưng $P(x_0)\\neq 0$ → đồ thị "bay" lên $\\pm\\infty$.
- **Tiệm cận ngang (horizontal asymptote)**: hành vi khi $x\\to\\pm\\infty$, so bậc tử/mẫu:
  - bậc tử $<$ bậc mẫu → tiệm cận $y=0$.
  - bậc tử $=$ bậc mẫu → tiệm cận $y = $ (tỉ số hệ số cao nhất).
  - bậc tử $>$ bậc mẫu → không có tiệm cận ngang (có thể có tiệm cận xiên).

**Trực giác — hàm $y = 1/x$**: x càng gần 0, $1/x$ càng to khủng (tiệm cận đứng $x=0$); x càng lớn, $1/x$ càng về 0 (tiệm cận ngang $y=0$). Như "chia một cái bánh cho $x$ người": ít người → phần to; rất đông → phần bé tí.

**Walk-through $y = 1/x$**:

| x | $-2$ | $-0.5$ | $0.5$ | $1$ | $2$ |
|---|----|----|----|---|---|
| $y$ | $-0.5$ | $-2$ | $2$ | $1$ | $0.5$ |

<svg viewBox="0 0 340 308" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm y bằng 1 trên x: hai nhánh ở góc phần tư I và III, tiệm cận đứng x bằng 0 và tiệm cận ngang y bằng 0, đánh dấu các điểm trong bảng walk-through">
  <defs>
    <marker id="f2ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="32" y1="22" x2="32" y2="278"/><line x1="78" y1="22" x2="78" y2="278"/><line x1="124" y1="22" x2="124" y2="278"/>
    <line x1="216" y1="22" x2="216" y2="278"/><line x1="262" y1="22" x2="262" y2="278"/><line x1="308" y1="22" x2="308" y2="278"/>
    <line x1="26" y1="58" x2="314" y2="58"/><line x1="26" y1="104" x2="314" y2="104"/>
    <line x1="26" y1="196" x2="314" y2="196"/><line x1="26" y1="242" x2="314" y2="242"/>
  </g>
  <!-- trục (đồng thời là 2 tiệm cận) -->
  <line x1="18" y1="150" x2="320" y2="150" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f2ax)"/>
  <line x1="170" y1="288" x2="170" y2="14" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f2ax)"/>
  <text x="326" y="143" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="178" y="22" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="32" y="164">−3</text><text x="78" y="164">−2</text><text x="124" y="164">−1</text>
    <text x="216" y="164">1</text><text x="262" y="164">2</text><text x="308" y="164">3</text>
    <text x="162" y="108" text-anchor="end">1</text><text x="162" y="62" text-anchor="end">2</text>
    <text x="162" y="200" text-anchor="end">−1</text><text x="162" y="246" text-anchor="end">−2</text>
  </g>
  <text x="161" y="164" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- nhánh x > 0 (góc phần tư I) -->
  <path d="M186.5,22 C188,32 190,46 193,58 C198,78 206,94 216,104 C228,116 244,122 262,127 C278,131 296,134 313,135" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <!-- nhánh x < 0 (góc phần tư III) -->
  <path d="M153.5,278 C152,268 150,254 147,242 C142,222 134,206 124,196 C112,184 96,178 78,173 C62,169 44,166 27,165" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="193" cy="58" r="3.5"/><circle cx="216" cy="104" r="3.5"/><circle cx="262" cy="127" r="3.5"/>
    <circle cx="124" cy="196" r="3.5"/><circle cx="147" cy="242" r="3.5"/><circle cx="78" cy="173" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="200" y="54">(0.5, 2)</text>
    <text x="223" y="100">(1, 1)</text>
    <text x="266" y="119">(2, 0.5)</text>
    <text x="117" y="192" text-anchor="end">(−1, −1)</text>
    <text x="140" y="248" text-anchor="end">(−0.5, −2)</text>
    <text x="72" y="168" text-anchor="end">(−2, −0.5)</text>
  </g>
  <!-- chú thích tiệm cận -->
  <g font-size="9.5" fill="#475569">
    <text x="28" y="142">tiệm cận ngang y = 0</text>
    <text x="176" y="274">tiệm cận đứng x = 0</text>
  </g>
</svg>

Hai nhánh: x>0 ở góc phần tư I, x<0 ở góc III. Đây là **hàm lẻ** ($1/(-x) = -1/x$).

**4 ví dụ số đa dạng** (domain + tiệm cận):

1. $y = \\dfrac{1}{x-2}$: $D=\\mathbb{R}\\setminus\\{2\\}$; tiệm cận đứng $x=2$, ngang $y=0$. $y(3)=1$, $y(1)=-1$.
2. $y = \\dfrac{2x+1}{x-3}$: $D=\\mathbb{R}\\setminus\\{3\\}$; bậc tử = bậc mẫu = 1 → tiệm cận ngang $y=2/1=2$; đứng $x=3$. $y(0)=-1/3$.
3. $y = \\dfrac{x}{x^2-1}$: $D=\\mathbb{R}\\setminus\\{-1,1\\}$; hai tiệm cận đứng $x=\\pm1$; bậc tử < mẫu → ngang $y=0$.
4. $y = \\dfrac{x^2}{x^2+1}$: $D=\\mathbb{R}$ (mẫu $>0$ luôn); tiệm cận ngang $y=1$; $E=[0,1)$. $y(0)=0$, $y(1)=0.5$.

⚠ **Lỗi thường gặp**: tưởng "đồ thị không bao giờ cắt tiệm cận ngang". Sai — tiệm cận ngang nói về **đuôi** ($x\\to\\pm\\infty$); ở giữa đồ thị có thể cắt qua. Vd $y=x/(x^2+1)$ cắt $y=0$ tại $x=0$. (Tiệm cận **đứng** thì thật sự không bao giờ chạm.)

🔁 **Dừng lại tự kiểm tra**: tìm domain và tiệm cận đứng của $y = \\dfrac{x+1}{x^2-9}$.

<details><summary>Đáp án</summary>

$x^2-9=0 \\Rightarrow x=\\pm3$ → $D=\\mathbb{R}\\setminus\\{-3,3\\}$. Tiệm cận đứng tại $x=-3$ và $x=3$ (tử khác 0 tại đó). Bậc tử < mẫu → tiệm cận ngang $y=0$.

</details>

### 📝 Tóm tắt mục 3

- Đa thức bậc $n$: $D=\\mathbb{R}$, lượn **tối đa $n-1$** khúc; đuôi quyết định bởi $a_n x^n$ (chẵn cùng hướng, lẻ ngược hướng); tối đa $n$ nghiệm.
- Phân thức $P/Q$: loại x làm $Q=0$; **tiệm cận đứng** ở nghiệm mẫu, **tiệm cận ngang** so bậc tử/mẫu.
- $y=1/x$ là nguyên mẫu: lẻ, hai nhánh, tiệm cận $x=0$ và $y=0$.

---

## 4. Hàm mũ — Tăng trưởng cấp số nhân

$$y = a^x \\quad (a > 0, a \\neq 1)$$

💡 **Là gì**: x tăng đều → y tăng theo **cấp số nhân**.

- $a > 1$: tăng (y tăng nhanh khi x tăng).
- $0 < a < 1$: giảm.
- $y > 0$ luôn (đồ thị nằm trên trục x).
- Cắt trục y tại $(0, 1)$ (vì $a^0 = 1$).

**Cơ số phổ biến**: $e \\approx 2.718$. Hàm $e^x$ là hàm "đẹp nhất" — đạo hàm = chính nó.

**Ứng dụng**: dân số, lãi kép, phóng xạ, vi khuẩn nhân đôi.

**Verify "cấp số nhân" bằng số**: $y = 2^x$. $y(0)=1, y(1)=2, y(2)=4, y(3)=8$ — mỗi bước x tăng 1, y **nhân đôi** (không phải cộng). So với hàm bậc 1 cộng đều, mũ nhân đều.

**Bảng giá trị + đồ thị** $y = 2^x$ (tiệm cận ngang $y=0$ bên trái):

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|----|----|---|---|---|---|
| $y$ | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |

<svg viewBox="0 0 340 316" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm mũ y bằng 2 mũ x: tăng theo cấp số nhân, đi qua các điểm (0, 1), (1, 2), (2, 4), (3, 8), tiệm cận ngang y bằng 0 về phía x âm, không bao giờ chạm trục x">
  <defs>
    <marker id="f6ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="46" y1="20" x2="46" y2="280"/><line x1="86" y1="20" x2="86" y2="280"/>
    <line x1="166" y1="20" x2="166" y2="280"/><line x1="206" y1="20" x2="206" y2="280"/><line x1="246" y1="20" x2="246" y2="280"/>
    <line x1="20" y1="250" x2="300" y2="250"/><line x1="20" y1="220" x2="300" y2="220"/>
    <line x1="20" y1="160" x2="300" y2="160"/><line x1="20" y1="40" x2="300" y2="40"/>
  </g>
  <!-- trục (trục x đồng thời là tiệm cận ngang y = 0) -->
  <line x1="18" y1="280" x2="320" y2="280" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f6ax)"/>
  <line x1="126" y1="308" x2="126" y2="18" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f6ax)"/>
  <text x="328" y="273" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="134" y="26" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="46" y="294">−2</text><text x="86" y="294">−1</text><text x="166" y="294">1</text><text x="206" y="294">2</text><text x="246" y="294">3</text>
    <text x="118" y="254" text-anchor="end">1</text><text x="118" y="224" text-anchor="end">2</text>
    <text x="118" y="164" text-anchor="end">4</text><text x="118" y="44" text-anchor="end">8</text>
  </g>
  <text x="120" y="294" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- đường cong y = 2^x, vẽ từ các điểm thật -->
  <path d="M26,274.7 C46,272.9 66,270.2 86,265 C99.3,261.5 112.7,256.9 126,250 C139.3,243.1 152.7,233.9 166,220 C179.3,206.1 192.7,187.7 206,160 C220.5,129.8 235.1,88.9 249.6,24.6" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="232" y="66" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="end">y = 2ˣ</text>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="46" cy="272.5" r="3.5"/><circle cx="86" cy="265" r="3.5"/><circle cx="126" cy="250" r="3.5"/>
    <circle cx="166" cy="220" r="3.5"/><circle cx="206" cy="160" r="3.5"/><circle cx="246" cy="40" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="133" y="262">(0, 1)</text>
    <text x="173" y="224">(1, 2)</text>
    <text x="213" y="162">(2, 4)</text>
    <text x="240" y="34" text-anchor="end">(3, 8)</text>
  </g>
  <!-- chú thích tiệm cận -->
  <text x="310" y="268" font-size="9.5" fill="#475569" text-anchor="end">tiệm cận ngang y = 0 — không bao giờ chạm</text>
</svg>

**4 ví dụ số đa dạng** (tính giá trị, tăng/giảm):

1. $y = 2^x$: $a=2>1$ tăng; $y(10)=1024$, $y(-3)=1/8$.
2. $y = (1/2)^x = 2^{-x}$: $0<a<1$ **giảm**; $y(0)=1$, $y(1)=0.5$, $y(-2)=4$. Gương của $2^x$ qua trục y.
3. $y = e^x$ ($e\\approx2.718$): $y(0)=1$, $y(1)\\approx2.718$, $y(2)\\approx7.389$.
4. $y = 10^x$: $y(0)=1$, $y(2)=100$, $y(-1)=0.1$ — cơ số 10 dùng cho thang log thập phân.

So sánh **tốc độ** $2^x$ vs $x^2$: tại $x=2$ bằng nhau (4=4); $x=4$: $2^4=16=4^2$; $x=5$: $2^5=32>25$; từ đó mũ vượt hẳn và không bao giờ thua lại.

⚠ **Lỗi thường gặp**: lẫn $2^x$ (hàm mũ — biến ở **số mũ**) với $x^2$ (hàm lũy thừa — biến ở **cơ số**). $2^3=8$ nhưng $3^2=9$ — khác nhau, và tốc độ tăng cũng khác hẳn khi x lớn.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao $a^x > 0$ luôn, đồ thị không chạm trục x?"* Vì nhân số dương $a$ với chính nó (kể cả mũ âm = nghịch đảo) **không bao giờ ra 0 hay âm**. $2^{-10} = 1/1024$ rất nhỏ nhưng vẫn dương → đồ thị tiệm cận trục x chứ không cắt.

🔁 **Dừng lại tự kiểm tra**: $y = 3^x$, tính $y(0), y(2), y(-1)$.

<details><summary>Đáp án</summary>

$y(0)=1$, $y(2)=9$, $y(-1)=1/3$.

</details>

### 📝 Tóm tắt mục 4

- $y = a^x$ ($a>0, a\\neq 1$): x tăng đều → y **nhân** đều (cấp số nhân).
- $a>1$ tăng, $0<a<1$ giảm; $y>0$ luôn, cắt trục y tại $(0,1)$; tiệm cận ngang $y=0$.
- Phân biệt với $x^n$ (biến ở cơ số, không phải số mũ).

---

## 5. Hàm log — Hàm ngược của mũ

$$y = \\log_a(x)$$

💡 **Là gì**: hàm ngược của $y = a^x$. "log mạnh thế nào để ra x?".

- $D = (0, +\\infty)$ (x phải dương).
- $E = \\mathbb{R}$.
- $a > 1$: log tăng (chậm).
- Cắt trục x tại $(1, 0)$ (vì $\\log_a(1) = 0$).
- **Đối xứng với $a^x$ qua đường $y = x$** (mọi cặp hàm ngược).

**Cơ số phổ biến**: $\\ln$ (cơ số $e$), $\\log_{10}$, $\\log_2$.

**Ứng dụng**: đo "độ lớn" (decibel, Richter, pH), entropy ML, complexity $O(\\log n)$.

**Verify đối xứng qua y=x bằng số**: hàm mũ $2^3 = 8$ ↔ điểm $(3, 8)$. Hàm log ngược: $\\log_2(8) = 3$ ↔ điểm $(8, 3)$. Hai điểm $(3,8)$ và $(8,3)$ đối xứng nhau qua đường $y=x$ ✓ — đó là quan hệ hàm ngược.

**Bảng giá trị + đồ thị** $y = \\log_2(x)$ (tiệm cận đứng $x=0$):

| x | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |
|---|----|----|---|---|---|---|
| $y$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |

<svg viewBox="0 0 340 264" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm log cơ số 2 của x: tăng chậm dần, tiệm cận đứng x bằng 0, cắt trục x tại (1, 0), đi qua các điểm trong bảng từ (0.25, −2) tới (8, 3)">
  <defs>
    <marker id="f7ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="70" y1="20" x2="70" y2="240"/><line x1="100" y1="20" x2="100" y2="240"/>
    <line x1="160" y1="20" x2="160" y2="240"/><line x1="280" y1="20" x2="280" y2="240"/>
    <line x1="16" y1="38" x2="320" y2="38"/><line x1="16" y1="74" x2="320" y2="74"/><line x1="16" y1="110" x2="320" y2="110"/>
    <line x1="16" y1="182" x2="320" y2="182"/><line x1="16" y1="218" x2="320" y2="218"/>
  </g>
  <!-- trục (trục y đồng thời là tiệm cận đứng x = 0) -->
  <line x1="16" y1="146" x2="322" y2="146" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f7ax)"/>
  <line x1="40" y1="254" x2="40" y2="18" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f7ax)"/>
  <text x="330" y="139" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="48" y="26" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="70" y="160">1</text><text x="100" y="160">2</text><text x="160" y="160">4</text><text x="280" y="160">8</text>
    <text x="32" y="42" text-anchor="end">3</text><text x="32" y="78" text-anchor="end">2</text><text x="32" y="114" text-anchor="end">1</text>
    <text x="32" y="186" text-anchor="end">−1</text><text x="32" y="222" text-anchor="end">−2</text>
  </g>
  <text x="34" y="160" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- đường cong y = log2(x), vẽ từ các điểm thật -->
  <path d="M45.4,235.1 C48.6,204.3 51.8,193.1 55,182 C60,164.7 65,154.7 70,146 C80,128.7 90,118.7 100,110 C120,92.7 140,82.7 160,74 C205,54.5 250,44 295,34.9" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="240" y="80" font-size="11" font-weight="700" fill="#1d4ed8">y = log₂ x</text>
  <!-- các điểm trong bảng walk-through -->
  <g fill="#dc2626">
    <circle cx="47.5" cy="218" r="3.5"/><circle cx="55" cy="182" r="3.5"/><circle cx="70" cy="146" r="3.5"/>
    <circle cx="100" cy="110" r="3.5"/><circle cx="160" cy="74" r="3.5"/><circle cx="280" cy="38" r="3.5"/>
  </g>
  <g font-size="10" font-weight="600" fill="#dc2626">
    <text x="54" y="224">(0.25, −2)</text>
    <text x="62" y="188">(0.5, −1)</text>
    <text x="78" y="140">(1, 0) — cắt trục x</text>
    <text x="107" y="106">(2, 1)</text>
    <text x="167" y="70">(4, 2)</text>
    <text x="274" y="32" text-anchor="end">(8, 3)</text>
  </g>
  <!-- chú thích tiệm cận -->
  <text x="46" y="248" font-size="9.5" fill="#475569">tiệm cận đứng x = 0</text>
</svg>

So với $2^x$ ở mục 4: bảng này chính là bảng của $2^x$ **đổi chỗ cột x↔y** — minh chứng quan hệ hàm ngược.

**4 ví dụ số đa dạng** (tính giá trị, domain):

1. $y=\\log_2 x$: $y(1)=0$, $y(8)=3$, $y(1/4)=-2$, $y(32)=5$.
2. $y=\\log_{10} x$: $y(1)=0$, $y(100)=2$, $y(0.001)=-3$ — mỗi lần x ×10 thì y +1.
3. $y=\\ln x$ (cơ số $e$): $y(1)=0$, $y(e)=1$, $y(e^2)=2$, $y(1/e)=-1$.
4. $y=\\log_2(x-3)$: $D=(3,\\infty)$ (cần $x-3>0$); $y(4)=0$, $y(7)=2$, $y(5)=1$.

⚠ **Lỗi thường gặp**: quên điều kiện đối số $> 0$. $\\log_a(x)$ chỉ định nghĩa với $x > 0$ (xem [Lesson 06](../lesson-06-powers-roots-logs/)); $\\log(0)$ và $\\log(\\text{số âm})$ vô nghĩa trong $\\mathbb{R}$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao log tăng 'chậm'?"* Vì để $y$ tăng thêm 1, $x$ phải **nhân** thêm $a$ lần. $\\log_{10}$: từ $y=2$ lên $y=3$, x phải nhảy từ 100 lên 1000. x tăng gấp 10 mà y chỉ +1 → cảm giác "chậm".

🔁 **Dừng lại tự kiểm tra**: $y = \\log_2(x)$, tính $y(1), y(16), y(1/2)$.

<details><summary>Đáp án</summary>

$y(1)=0$, $y(16)=4$, $y(1/2)=-1$.

</details>

### 📝 Tóm tắt mục 5

- $y = \\log_a(x)$: hàm ngược của $a^x$, đối xứng qua $y=x$.
- $D = (0,\\infty)$, cắt trục x tại $(1,0)$; tăng **chậm** (x nhân a thì y chỉ +1); tiệm cận đứng $x=0$.
- Đối số phải $> 0$.

---

## 6. Hàm trị tuyệt đối & hàm sàn/trần

### 6.1. Hàm trị tuyệt đối $y = |x|$

$$|x| = \\begin{cases} x & \\text{nếu } x \\ge 0 \\\\ -x & \\text{nếu } x < 0 \\end{cases}$$

💡 **Là gì**: "khoảng cách từ x tới 0" — luôn $\\ge 0$. Đồ thị hình **chữ V**, đỉnh tại gốc O, hai cạnh dốc $\\pm1$. Đây là hàm từng khúc (piecewise, xem [Lesson 07](../lesson-07-functions-intro/)) nhưng quan trọng đủ để đứng riêng.

- $D=\\mathbb{R}$, $E=[0,\\infty)$.
- **Hàm chẵn**: $|-x|=|x|$ → đối xứng trục y.
- Nghịch biến trên $(-\\infty,0]$, đồng biến trên $[0,\\infty)$ — "gãy" tại O (không trơn).

<svg viewBox="0 0 300 224" style="max-width:380px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm trị tuyệt đối của x: hình chữ V, đỉnh tại gốc O, cạnh trái dốc trừ 1, cạnh phải dốc cộng 1, đối xứng qua trục y">
  <defs>
    <marker id="f8ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="54" y1="20" x2="54" y2="196"/><line x1="102" y1="20" x2="102" y2="196"/>
    <line x1="198" y1="20" x2="198" y2="196"/><line x1="246" y1="20" x2="246" y2="196"/>
    <line x1="16" y1="80" x2="284" y2="80"/><line x1="16" y1="128" x2="284" y2="128"/>
  </g>
  <!-- trục -->
  <line x1="16" y1="176" x2="284" y2="176" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f8ax)"/>
  <line x1="150" y1="202" x2="150" y2="16" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f8ax)"/>
  <text x="292" y="169" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="158" y="24" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="54" y="190">−2</text><text x="102" y="190">−1</text><text x="198" y="190">1</text><text x="246" y="190">2</text>
    <text x="142" y="132" text-anchor="end">1</text><text x="142" y="84" text-anchor="end">2</text>
  </g>
  <text x="144" y="190" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- chữ V: y = |x|, hai cạnh dốc ±1 -->
  <path d="M39.6,65.6 L150,176 L260.4,65.6" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="26" y="42" font-size="11" font-weight="700" fill="#1d4ed8">y = |x|</text>
  <text x="76" y="110" font-size="9.5" fill="#475569" text-anchor="end">dốc −1</text>
  <text x="222" y="110" font-size="9.5" fill="#475569">dốc +1</text>
  <!-- đỉnh -->
  <circle cx="150" cy="176" r="3.5" fill="#dc2626"/>
  <text x="150" y="218" font-size="10" font-weight="600" fill="#dc2626" text-anchor="middle">đỉnh (0, 0)</text>
</svg>

**4 ví dụ số**: $|{-5}|=5$, $|3|=3$, $|0|=0$, $|{-0.7}|=0.7$. Với $y=|x-2|$ (V dịch sang phải 2): $y(2)=0$, $y(5)=3$, $y(0)=2$.

**Dùng ở đâu**: khoảng cách $|a-b|$, sai số tuyệt đối, hàm mất mát L1 trong ML, biên độ dao động.

### 6.2. Hàm sàn $\\lfloor x\\rfloor$ và trần $\\lceil x\\rceil$

💡 **Là gì**: **sàn (floor)** $\\lfloor x\\rfloor$ = số nguyên lớn nhất $\\le x$ ("làm tròn xuống"); **trần (ceiling)** $\\lceil x\\rceil$ = số nguyên nhỏ nhất $\\ge x$ ("làm tròn lên"). Đồ thị hình **bậc thang** — nhảy nguyên, đi ngang giữa các số nguyên.

- $D=\\mathbb{R}$, $E=\\mathbb{Z}$ (chỉ ra số nguyên).
- Không liên tục: "nhảy" 1 đơn vị tại mỗi số nguyên.

<svg viewBox="0 0 320 280" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm sàn của x: bậc thang tăng từng nấc 1 đơn vị, mỗi đoạn ngang có chấm đặc ở đầu trái (điểm lấy) và chấm rỗng ở đầu phải (điểm không lấy), minh họa sàn của −1.2 bằng −2">
  <defs>
    <marker id="f9ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="18" y1="20" x2="18" y2="248"/><line x1="64" y1="20" x2="64" y2="248"/>
    <line x1="156" y1="20" x2="156" y2="248"/><line x1="202" y1="20" x2="202" y2="248"/><line x1="248" y1="20" x2="248" y2="248"/>
    <line x1="10" y1="40" x2="290" y2="40"/><line x1="10" y1="80" x2="290" y2="80"/><line x1="10" y1="120" x2="290" y2="120"/>
    <line x1="10" y1="200" x2="290" y2="200"/><line x1="10" y1="240" x2="290" y2="240"/>
  </g>
  <!-- trục -->
  <line x1="10" y1="160" x2="300" y2="160" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f9ax)"/>
  <line x1="110" y1="252" x2="110" y2="16" stroke="#1a202c" stroke-width="1.6" marker-end="url(#f9ax)"/>
  <text x="308" y="153" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
  <text x="118" y="24" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="18" y="174">−2</text><text x="64" y="174">−1</text><text x="156" y="174">1</text><text x="202" y="174">2</text><text x="248" y="174">3</text>
    <text x="102" y="44" text-anchor="end">3</text><text x="102" y="84" text-anchor="end">2</text><text x="102" y="124" text-anchor="end">1</text>
    <text x="102" y="204" text-anchor="end">−1</text><text x="102" y="244" text-anchor="end">−2</text>
  </g>
  <text x="104" y="174" font-size="10" fill="#1a202c" text-anchor="end">O</text>
  <!-- bậc thang: mỗi đoạn ngang là floor trên [n, n+1) -->
  <g stroke="#1d4ed8" stroke-width="2.4">
    <line x1="18" y1="240" x2="64" y2="240"/><line x1="64" y1="200" x2="110" y2="200"/>
    <line x1="110" y1="160" x2="156" y2="160"/><line x1="156" y1="120" x2="202" y2="120"/>
    <line x1="202" y1="80" x2="248" y2="80"/><line x1="248" y1="40" x2="276" y2="40"/>
  </g>
  <!-- đầu đóng: điểm lấy -->
  <g fill="#1d4ed8">
    <circle cx="18" cy="240" r="3.2"/><circle cx="64" cy="200" r="3.2"/><circle cx="110" cy="160" r="3.2"/>
    <circle cx="156" cy="120" r="3.2"/><circle cx="202" cy="80" r="3.2"/><circle cx="248" cy="40" r="3.2"/>
  </g>
  <!-- đầu mở: điểm không lấy -->
  <g fill="#f8fafc" stroke="#1d4ed8" stroke-width="1.6">
    <circle cx="64" cy="240" r="3.2"/><circle cx="110" cy="200" r="3.2"/><circle cx="156" cy="160" r="3.2"/>
    <circle cx="202" cy="120" r="3.2"/><circle cx="248" cy="80" r="3.2"/>
  </g>
  <text x="312" y="30" font-size="11" font-weight="700" fill="#1d4ed8" text-anchor="end">y = ⌊x⌋</text>
  <!-- ví dụ số âm: ⌊−1.2⌋ = −2 -->
  <line x1="54.8" y1="164" x2="54.8" y2="236" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5,4"/>
  <text x="54.8" y="152" font-size="9" fill="#dc2626" text-anchor="middle">−1.2</text>
  <circle cx="54.8" cy="240" r="3.5" fill="#dc2626"/>
  <text x="20" y="258" font-size="10" font-weight="600" fill="#dc2626">⌊−1.2⌋ = −2</text>
  <text x="160" y="272" font-size="9.5" fill="#475569" text-anchor="middle">● đầu đóng — điểm lấy · ○ đầu mở — điểm không lấy</text>
</svg>

**4 ví dụ số** (chú ý số âm — bẫy lớn):

| x | $\\lfloor x\\rfloor$ | $\\lceil x\\rceil$ |
|---|----|----|
| $2.3$ | $2$ | $3$ |
| $2.0$ | $2$ | $2$ |
| $-1.2$ | $-2$ | $-1$ |
| $-0.5$ | $-1$ | $0$ |

⚠ **Lỗi thường gặp**: với số âm, "làm tròn xuống" nghĩa là về phía $-\\infty$, không phải "bỏ phần thập phân". $\\lfloor -1.2\\rfloor = -2$ (KHÔNG phải $-1$). "Bỏ phần thập phân" là phép **truncate** ($-1$), khác floor.

**Dùng ở đâu**: chia trang ($\\lceil n/k\\rceil$ trang cho n mục, k mục/trang), giá cước bậc thang, lập chỉ mục mảng, phân ô lưới.

🔁 **Dừng lại tự kiểm tra**: tính $\\lfloor 3.9\\rfloor$, $\\lceil 3.1\\rceil$, $\\lfloor -2.5\\rfloor$, $|{-4}|+|3|$.

<details><summary>Đáp án</summary>

$\\lfloor 3.9\\rfloor=3$, $\\lceil 3.1\\rceil=4$, $\\lfloor -2.5\\rfloor=-3$ (về phía $-\\infty$), $|{-4}|+|3|=4+3=7$.

</details>

### 📝 Tóm tắt mục 6

- $|x|$: chữ V, đỉnh O, $E=[0,\\infty)$, hàm chẵn — đo khoảng cách/sai số.
- $\\lfloor x\\rfloor$/$\\lceil x\\rceil$: bậc thang, $E=\\mathbb{Z}$; số âm floor về $-\\infty$ (bẫy).

---

## 7. Biến đổi đồ thị — dịch, co giãn, lật

💡 **Là gì**: từ một đồ thị "gốc" $y=f(x)$ đã biết, tạo đồ thị mới bằng cách **thêm/nhân hằng số** vào x hoặc y. Học một lần, áp cho mọi họ hàm ở trên — đỡ phải dựng bảng giá trị lại từ đầu.

### 7.1. Bốn phép biến đổi cơ bản

| Biến đổi | Tác dụng lên đồ thị | Ghi nhớ |
|----------|---------------------|---------|
| $f(x)+k$ | dịch **lên** $k$ (nếu $k>0$) | cộng *ngoài* → dọc, đúng chiều trực giác |
| $f(x-h)$ | dịch **sang phải** $h$ (nếu $h>0$) | trừ *trong* → ngang, **ngược** trực giác |
| $a\\,f(x)$ | co giãn **dọc** hệ số $a$ ($a>1$ kéo cao, $0<a<1$ ép dẹt) | nhân ngoài |
| $f(-x)$ | **lật qua trục y** (gương trái-phải) | đảo dấu trong |
| $-f(x)$ | **lật qua trục x** (gương trên-dưới) | đảo dấu ngoài |

⚠ **Lỗi #1 — dịch trái/phải ngược dấu**: $f(x-h)$ dịch **sang phải** $h$ (không phải trái). Trực giác: để điểm mới đạt cùng giá trị, x phải *lớn hơn* $h$ → đồ thị trượt sang phải. Verify $f(x)=x^2$, $f(x-3)=(x-3)^2$: đỉnh gốc tại $x=0$, đỉnh mới tại $x=3$ (sang **phải** 3) ✓. Ngược lại $f(x+2)=(x+2)^2$ có đỉnh tại $x=-2$ (sang **trái**).

### 7.2. Walk-through từng bước $f(x)=x^2 \\to (x-3)^2+2$

Áp dụng lần lượt: trừ trong (dịch phải 3), cộng ngoài (dịch lên 2).

| x | $x^2$ (gốc) | $(x-3)^2$ (phải 3) | $(x-3)^2+2$ (lên 2) |
|---|----|----|----|
| $0$ | $0$ | $9$ | $11$ |
| $3$ | $9$ | $0$ | $2$ |
| $4$ | $16$ | $1$ | $3$ |

Đỉnh dời từ $(0,0) \\to (3,0) \\to (3,2)$. Tổng quát: $y=(x-h)^2+k$ là parabol đỉnh $(h,k)$ — đây là **dạng đỉnh** của hàm bậc 2 (liên hệ [Lesson 04](../lesson-04-quadratic-equations/)).

### 7.3. Bốn ví dụ biến đổi đa họ hàm

**Ví dụ 1 — dịch ngang+dọc** ($f(x)=|x| \\to |x+1|-3$): trừ trong là $x-(-1)$ → dịch **trái** 1; cộng ngoài $-3$ → dịch **xuống** 3. Đỉnh V dời $(0,0)\\to(-1,-3)$. Kiểm tra $x=-1$: $|0|-3=-3$ ✓.

**Ví dụ 2 — co giãn dọc** ($f(x)=x^2 \\to 3x^2$ và $\\to \\tfrac12 x^2$): $3x^2$ tại $x=2$ cho $12$ (cao gấp 3 so với $x^2=4$) → parabol **hẹp/dốc** hơn. $\\tfrac12 x^2$ tại $x=2$ cho $2$ → **bẹt** hơn.

**Ví dụ 3 — lật qua trục x** ($f(x)=2^x \\to -2^x$): mọi giá trị đổi dấu. $-2^0=-1$, $-2^2=-4$. Đồ thị mũ tăng lật thành cong **đi xuống dưới** trục x, tiệm cận $y=0$ từ phía dưới.

**Ví dụ 4 — lật qua trục y** ($f(x)=\\ln x \\to \\ln(-x)$): $D$ đổi từ $(0,\\infty)$ thành $(-\\infty,0)$ (cần $-x>0$). $\\ln(-x)$ tại $x=-1$ cho $0$, tại $x=-e$ cho $1$. Đồ thị log soi gương sang nửa trái.

❓ **Câu hỏi tự nhiên của người đọc**: *"Khi vừa dịch vừa co giãn, làm theo thứ tự nào?"* Với $y=a\\,f(x-h)+k$: làm **trong ra ngoài** — dịch ngang $h$, rồi co giãn dọc $a$ (và lật nếu $a<0$), cuối cùng dịch dọc $k$. Đổi thứ tự co giãn và dịch dọc cho kết quả khác.

🔁 **Dừng lại tự kiểm tra**: đồ thị $y=(x+2)^2-1$ là parabol đỉnh ở đâu, mở hướng nào? Còn $y=-(x-1)^2$?

<details><summary>Đáp án</summary>

$(x+2)^2-1$: dịch trái 2, xuống 1 → đỉnh $(-2,-1)$, mở **lên** ($a=1>0$). $-(x-1)^2$: dịch phải 1, lật trục x → đỉnh $(1,0)$, mở **xuống**.

</details>

### 📝 Tóm tắt mục 7

- $f(x)+k$: dọc lên $k$; $f(x-h)$: ngang **phải** $h$ (ngược trực giác — bẫy).
- $a\\,f(x)$: co giãn dọc; $f(-x)$ lật trục y; $-f(x)$ lật trục x.
- $y=(x-h)^2+k$ = parabol đỉnh $(h,k)$; thứ tự áp: trong→ngoài.

---

## 8. Bảng tổng hợp các hàm sơ cấp

| Hàm | Đồ thị | D | E | Tính chất nổi bật |
|-----|--------|---|---|-------------------|
| Hằng $y=c$ | Đường ngang | $\\mathbb{R}$ | $\\{c\\}$ | Phẳng; chẵn |
| Bậc 1 $y=ax+b$ | Đường thẳng | $\\mathbb{R}$ | $\\mathbb{R}$ ($a\\neq0$) | Slope $a$; tăng $a>0$ |
| Bậc 2 $y=ax^2+bx+c$ | Parabol | $\\mathbb{R}$ | $[y_{min},\\infty)$ / $(-\\infty,y_{max}]$ | Đỉnh $x=-b/(2a)$ |
| Đa thức bậc $n$ | Cong mượt | $\\mathbb{R}$ | tùy | Lượn $\\le n-1$ khúc; $\\le n$ nghiệm |
| Phân thức $1/x$ | 2 nhánh | $\\mathbb{R}\\setminus\\{0\\}$ | $\\mathbb{R}\\setminus\\{0\\}$ | Tiệm cận $x=0$, $y=0$; lẻ |
| Mũ $y=a^x$ | Cong bùng nổ | $\\mathbb{R}$ | $(0,\\infty)$ | Qua $(0,1)$; tiệm cận $y=0$; tăng $a>1$ |
| Log $y=\\log_a x$ | Cong chậm | $(0,\\infty)$ | $\\mathbb{R}$ | Qua $(1,0)$; tiệm cận $x=0$; ngược của $a^x$ |
| Trị tuyệt đối $y=|x|$ | Chữ V | $\\mathbb{R}$ | $[0,\\infty)$ | Đỉnh O; chẵn; gãy tại 0 |
| Sàn $y=\\lfloor x\\rfloor$ | Bậc thang | $\\mathbb{R}$ | $\\mathbb{Z}$ | Làm tròn xuống; không liên tục |

**Thứ tự tăng trưởng khi $x$ lớn** (rất quan trọng cho độ phức tạp thuật toán):

$$\\log_a x \\ \\ll\\ x \\ \\ll\\ x^2 \\ \\ll\\ x^n \\ \\ll\\ a^x \\quad (a>1, n\\ge 1)$$

Verify tại $x=10$: $\\log_2 10\\approx3.3 < 10 < 100 < 1000\\,(x^3) < 1024\\,(2^{10})$. Đây là vì sao $O(\\log n)$ "tốt nhất" và $O(2^n)$ "không xài được" (liên hệ [Lesson 07](../lesson-07-functions-intro/) phần ML, và DataStructures).

---

## 9. Bài tập

### Bài tập

**Bài 1**: Đường thẳng $y = 2x - 3$. Tính y khi $x = 5$. Cắt trục x tại đâu?

**Bài 2**: Parabol $y = x^2 - 4x + 3$. Tìm đỉnh.

**Bài 3**: $y = 2^x$. Tính $y(0), y(3), y(-2)$.

**Bài 4**: $y = \\log_2(x)$. Tính $y(1), y(8), y(1/4)$.

**Bài 5**: Vẽ phác họa các hàm: $y = x$, $y = x^2$, $y = e^x$, $y = \\ln(x)$. Nhận xét tăng trưởng.

**Bài 6**: Cho $y = \\dfrac{x+1}{x-2}$. Tìm domain, tiệm cận đứng và tiệm cận ngang. Tính $y(0)$.

**Bài 7**: Đa thức $y = x^3 - 4x$. Tìm các nghiệm và số khúc lượn tối đa.

**Bài 8**: Tính $\\lfloor 4.7\\rfloor$, $\\lceil 4.2\\rceil$, $\\lfloor -3.1\\rfloor$, $|{-6}|$, $|2-9|$.

**Bài 9**: Đồ thị $y = |x-3|+1$ là chữ V đỉnh ở đâu? Tính $y(3)$, $y(0)$, $y(6)$.

**Bài 10**: Mô tả biến đổi từ $y=x^2$ để được $y=2(x+1)^2-4$. Tìm đỉnh.

**Bài 11**: Bài toán quỹ đạo ném (ứng dụng parabol): độ cao $h(t) = -5t^2 + 20t$ (mét, t giây). Vật đạt độ cao cực đại bao nhiêu, tại thời điểm nào? Khi nào chạm đất?

**Bài 12**: Bài toán phân rã (ứng dụng mũ): khối lượng chất phóng xạ $m(t) = 100\\cdot(0.5)^{t/3}$ (gam, t giờ). Tính $m(0)$, $m(3)$, $m(6)$. Sau bao lâu còn 12.5g?

### Lời giải

**Bài 1**: $y(5) = 10 - 3 = $ **7**. Cắt trục x: $y = 0 \\to 2x = 3 \\to x = $ **3/2**.

**Bài 2**: Đỉnh tại $x = 4/2 = 2$. $y(2) = 4 - 8 + 3 = -1$. → đỉnh **$(2, -1)$**.

**Bài 3**: $y(0) = 1$, $y(3) = 8$, $y(-2) = 1/4$.

**Bài 4**: $y(1) = 0$, $y(8) = 3$, $y(1/4) = -2$.

**Bài 5**: 
- $y = x$: đường thẳng, slope 1.
- $y = x^2$: parabol mở lên, đỉnh O.
- $y = e^x$: tăng RẤT nhanh.
- $y = \\ln(x)$: tăng RẤT chậm.

Thứ tự **tăng trưởng** khi x lớn: $\\ln(x) \\ll x \\ll x^2 \\ll e^x$. Đó là tại sao trong CS, thuật toán $O(\\log n)$ "tốt nhất", $O(n^2)$ "kém", $O(2^n)$ "không dùng được".

**Bài 6**: Domain: mẫu $x-2\\neq0 \\Rightarrow x\\neq2$ → **$D=\\mathbb{R}\\setminus\\{2\\}$**. Tiệm cận đứng **$x=2$** (mẫu = 0, tử $\\neq0$ tại đó). Bậc tử = bậc mẫu = 1, tỉ số hệ số cao nhất $1/1$ → tiệm cận ngang **$y=1$**. $y(0)=\\dfrac{0+1}{0-2}=-\\dfrac12$.

**Bài 7**: $x^3-4x = x(x^2-4) = x(x-2)(x+2)$ → nghiệm **$x=0, 2, -2$** (3 nghiệm, đúng bằng bậc). Bậc 3 → lượn **tối đa $3-1=2$** khúc. Verify: $y(1)=1-4=-3$, $y(-1)=-1+4=3$ → có lên xuống thật.

**Bài 8**: $\\lfloor 4.7\\rfloor=4$; $\\lceil 4.2\\rceil=5$; $\\lfloor -3.1\\rfloor=-4$ (về phía $-\\infty$, KHÔNG phải $-3$); $|{-6}|=6$; $|2-9|=|-7|=7$.

**Bài 9**: $|x-3|+1$ = chữ V của $|x|$ dịch **phải 3, lên 1** → đỉnh **$(3,1)$**. $y(3)=|0|+1=1$; $y(0)=|-3|+1=4$; $y(6)=|3|+1=4$ (đối xứng quanh $x=3$ ✓).

**Bài 10**: Từ $x^2$: (1) trừ trong $x-(-1)$ → dịch **trái 1**; (2) nhân ngoài 2 → co giãn dọc, parabol **hẹp hơn** (dốc gấp đôi); (3) cộng ngoài $-4$ → dịch **xuống 4**. Đỉnh dời $(0,0)\\to(-1,0)\\to(-1,-4)$ → đỉnh **$(-1,-4)$**, mở lên. Kiểm tra $x=-1$: $2\\cdot0-4=-4$ ✓.

**Bài 11** (parabol): $h(t)=-5t^2+20t$, $a=-5<0$ mở xuống → đỉnh là **max**. Đỉnh tại $t=-b/(2a)=-20/(2\\cdot-5)=2$ giây. $h(2)=-5\\cdot4+40=20$ m → **cao nhất 20 m tại t=2 s**. Chạm đất khi $h=0$: $-5t^2+20t=0 \\Rightarrow -5t(t-4)=0 \\Rightarrow t=0$ (lúc ném) hoặc **$t=4$ giây** (rơi xuống). Đỉnh nằm giữa $0$ và $4$ tại $t=2$ ✓.

**Bài 12** (mũ phân rã): $m(0)=100\\cdot0.5^0=100$ g. $m(3)=100\\cdot0.5^1=50$ g. $m(6)=100\\cdot0.5^2=25$ g — cứ **3 giờ giảm một nửa** (chu kì bán rã = 3 h, là số $3$ ở mẫu của $t/3$). Còn $12.5$ g: $12.5=100\\cdot0.5^{t/3} \\Rightarrow 0.5^{t/3}=0.125=0.5^3 \\Rightarrow t/3=3 \\Rightarrow$ **$t=9$ giờ** (qua 3 chu kì: $100\\to50\\to25\\to12.5$).

---

## 10. 🎉 HOÀN THÀNH TIER 1 MATH (8/8)!

Tiếp theo: **Tier 2 — Geometry** (chưa triển khai).

## 📝 Tổng kết Tier 1

Sau 8 lesson, bạn nắm được:
1. **Hệ số học** ($\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{R}$).
2. **Biểu thức đại số** (đa thức, hằng đẳng thức, phân tích).
3. **PT bậc 1** + hệ 2 ẩn.
4. **PT bậc 2** ($\\Delta$, Viete).
5. **Bất phương trình** (xét dấu tam thức).
6. **Lũy thừa, căn, log**.
7. **Hàm số** (domain, range, hàm hợp).
8. **Hàm sơ cấp** (hằng, bậc 1, bậc 2, đa thức, phân thức, mũ, log, trị tuyệt đối, sàn/trần) + biến đổi đồ thị.

🎉 Đây là **nền tảng đại số phổ thông** đã hoàn chỉnh.
`;
