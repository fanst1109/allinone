// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/02-Trigonometry/lesson-04-trig-graphs/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Đồ thị hàm lượng giác (trig graphs)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** $y = \\sin x$ lại có hình "sóng" — không phải vì công thức đẹp, mà vì nó ghi lại tọa độ một điểm đang quay trên đường tròn.
- Vẽ được (bằng tay, bằng bảng số) đồ thị $y = \\sin x$, $y = \\cos x$, $y = \\tan x$ trên đoạn $[-2\\pi, 2\\pi]$.
- Đọc và biến đổi phương trình tổng quát $y = A \\cdot \\sin(Bx + C) + D$ — biết $A$, $B$, $C$, $D$ ảnh hưởng tới biên độ, chu kỳ, pha, dịch dọc thế nào.
- Tính được **chu kỳ** $T = \\frac{2\\pi}{B}$, **tần số** $f = \\frac{1}{T}$, **tần số góc** $\\omega = B = 2\\pi f$ cho mọi sóng sin/cos.
- Có cái nhìn đầu tiên về **chuỗi Fourier**: vì sao mọi tín hiệu tuần hoàn (sóng vuông, âm thanh, ảnh) đều phân tích được thành **tổng các sóng sin/cos**.
- Thấy được trig graphs xuất hiện ở đâu trong ML/AI: **positional encoding** trong Transformer, **spectrogram** trong xử lý âm thanh, **RoPE** (rotary positional embedding).

## Kiến thức tiền đề

- [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/): với mỗi góc $\\theta$ có một điểm $(\\cos\\theta, \\sin\\theta)$ trên đường tròn bán kính 1.
- [Algebra Lesson 05 — Hàm số](../../01-Algebra/lesson-05-functions/): khái niệm hàm số, domain, range, đồ thị, biến đổi (tịnh tiến, co giãn).

Bài này gắn hai thứ đó lại: **hàm lượng giác là một hàm số** (với domain là tập số thực, range là $[-1, 1]$ cho sin/cos) và đồ thị của nó có dạng "sóng" rất đặc trưng.

---

## 1. Từ đường tròn quay → đồ thị sóng

### 1.1. Vấn đề đặt ra

Ở Lesson 03 ta đã biết: cho góc $\\theta$, có một điểm $P = (\\cos\\theta, \\sin\\theta)$ nằm trên đường tròn đơn vị. Khi $\\theta$ thay đổi (chẳng hạn $\\theta = 0$, rồi $\\frac{\\pi}{6}$, rồi $\\frac{\\pi}{4}$, ...), điểm $P$ **quay** quanh tâm.

Câu hỏi: nếu ta **không vẽ điểm $P$ trên mặt phẳng $(x, y)$**, mà thay vào đó vẽ một đồ thị với:

- **Trục hoành** = góc $\\theta$ (thời gian, hoặc bất kỳ tham số nào điều khiển sự quay).
- **Trục tung** = tọa độ tung của $P$, tức $\\sin\\theta$.

Thì đồ thị đó trông thế nào? Đó chính là đồ thị $y = \\sin x$ mà bạn sẽ vẽ trong bài này.

### 1.2. Trực giác — quay đường tròn 90° để nhìn ngang

> 💡 **Trực giác**: Hãy tưởng tượng bạn đứng cạnh một bánh xe xoay (vd bánh xe ferris wheel). Có một chiếc đèn LED gắn trên vành bánh. Khi bánh quay đều, **chiều cao của LED so với trục bánh** dao động lên xuống — lên cao nhất khi LED ở 12 giờ, xuống thấp nhất khi LED ở 6 giờ. Nếu bạn ghi nhật ký chiều cao đó theo thời gian, bạn được đường **sin**. Đó là tất cả những gì $y = \\sin x$ ghi lại: tọa độ tung của một điểm đang quay.

Tương tự, $y = \\cos x$ ghi lại **tọa độ hoành** (chiều ngang) của điểm đang quay. Nó cũng có hình sóng, chỉ là **lệch pha** so với sin.

### 1.3. Hình — đường tròn ↔ đồ thị

Bên trái là đường tròn đơn vị, bên phải là đồ thị $y = \\sin x$. Bốn vị trí đặc biệt được đánh dấu $A$, $B$, $C$, $D$ ứng với $\\theta = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}$:

<svg viewBox="0 0 660 292" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường tròn đơn vị bên trái với các điểm A(0°), B(90°), C(180°), D(270°) nối bằng nét đứt tới vị trí tương ứng trên đồ thị y = sin x bên phải">
  <defs><marker id="w1a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="w1b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g transform="translate(20,0)">
  <line x1="0.0" y1="150.0" x2="236.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w1a)"/>
  <line x1="110.0" y1="260.0" x2="110.0" y2="24.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w1a)"/>
  <text x="228.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="118.0" y="34.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <circle cx="110" cy="150" r="80" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <text x="110.0" y="40.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Đường tròn đơn vị</text>
  <text x="450.0" y="40.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Đồ thị y = sin x  (x = θ)</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="319.1" y1="254.0" x2="319.1" y2="46.0"/>
<line x1="388.2" y1="254.0" x2="388.2" y2="46.0"/>
<line x1="457.3" y1="254.0" x2="457.3" y2="46.0"/>
<line x1="526.5" y1="254.0" x2="526.5" y2="46.0"/>
<line x1="236.8" y1="70.0" x2="558.0" y2="70.0"/>
<line x1="236.8" y1="230.0" x2="558.0" y2="230.0"/>
</g>
  <line x1="230.8" y1="150.0" x2="580.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w1b)"/>
  <line x1="250.0" y1="260.0" x2="250.0" y2="24.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w1b)"/>
  <text x="572.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="258.0" y="34.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="319.1" y1="146.0" x2="319.1" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="319.1" y="166.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="388.2" y1="146.0" x2="388.2" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="388.2" y="166.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="457.3" y1="146.0" x2="457.3" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="457.3" y="166.0" fill="#475569" font-size="11" text-anchor="middle">3π/2</text>
  <line x1="526.5" y1="146.0" x2="526.5" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="526.5" y="166.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="246.0" y1="70.0" x2="254.0" y2="70.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="243.0" y="74.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="246.0" y1="230.0" x2="254.0" y2="230.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="243.0" y="234.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 250.0,150.0 L 252.3,145.8 L 254.6,141.6 L 256.9,137.5 L 259.2,133.4 L 261.5,129.3 L 263.8,125.3 L 266.1,121.3 L 268.4,117.5 L 270.7,113.7 L 273.0,110.0 L 275.3,106.4 L 277.6,103.0 L 279.9,99.7 L 282.3,96.5 L 284.6,93.4 L 286.9,90.5 L 289.2,87.8 L 291.5,85.3 L 293.8,82.9 L 296.1,80.7 L 298.4,78.7 L 300.7,76.9 L 303.0,75.3 L 305.3,73.9 L 307.6,72.7 L 309.9,71.7 L 312.2,71.0 L 314.5,70.4 L 316.8,70.1 L 319.1,70.0 L 321.4,70.1 L 323.7,70.4 L 326.0,71.0 L 328.3,71.7 L 330.6,72.7 L 332.9,73.9 L 335.2,75.3 L 337.5,76.9 L 339.8,78.7 L 342.2,80.7 L 344.5,82.9 L 346.8,85.3 L 349.1,87.8 L 351.4,90.5 L 353.7,93.4 L 356.0,96.5 L 358.3,99.7 L 360.6,103.0 L 362.9,106.4 L 365.2,110.0 L 367.5,113.7 L 369.8,117.5 L 372.1,121.3 L 374.4,125.3 L 376.7,129.3 L 379.0,133.4 L 381.3,137.5 L 383.6,141.6 L 385.9,145.8 L 388.2,150.0 L 390.5,154.2 L 392.8,158.4 L 395.1,162.5 L 397.4,166.6 L 399.7,170.7 L 402.1,174.7 L 404.4,178.7 L 406.7,182.5 L 409.0,186.3 L 411.3,190.0 L 413.6,193.6 L 415.9,197.0 L 418.2,200.3 L 420.5,203.5 L 422.8,206.6 L 425.1,209.5 L 427.4,212.2 L 429.7,214.7 L 432.0,217.1 L 434.3,219.3 L 436.6,221.3 L 438.9,223.1 L 441.2,224.7 L 443.5,226.1 L 445.8,227.3 L 448.1,228.3 L 450.4,229.0 L 452.7,229.6 L 455.0,229.9 L 457.3,230.0 L 459.6,229.9 L 462.0,229.6 L 464.3,229.0 L 466.6,228.3 L 468.9,227.3 L 471.2,226.1 L 473.5,224.7 L 475.8,223.1 L 478.1,221.3 L 480.4,219.3 L 482.7,217.1 L 485.0,214.7 L 487.3,212.2 L 489.6,209.5 L 491.9,206.6 L 494.2,203.5 L 496.5,200.3 L 498.8,197.0 L 501.1,193.6 L 503.4,190.0 L 505.7,186.3 L 508.0,182.5 L 510.3,178.7 L 512.6,174.7 L 514.9,170.7 L 517.2,166.6 L 519.5,162.5 L 521.9,158.4 L 524.2,154.2 L 526.5,150.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="190.0" cy="150.0" r="5" fill="#15803d"/>
  <text x="200.0" y="154.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">A</text>
  <circle cx="250.0" cy="150.0" r="5" fill="#15803d"/>
  <text x="258.0" y="142.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">A</text>
  <line x1="190.0" y1="150.0" x2="250.0" y2="150.0" stroke="#15803d" stroke-width="0.8" stroke-dasharray="3 3"/>
  <circle cx="110.0" cy="70.0" r="5" fill="#dc2626"/>
  <text x="110.0" y="62.0" fill="#dc2626" font-size="13" text-anchor="middle" font-weight="700">B</text>
  <circle cx="319.1" cy="70.0" r="5" fill="#dc2626"/>
  <text x="327.1" y="62.0" fill="#dc2626" font-size="13" text-anchor="start" font-weight="700">B</text>
  <line x1="110.0" y1="70.0" x2="319.1" y2="70.0" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="3 3"/>
  <circle cx="30.0" cy="150.0" r="5" fill="#b45309"/>
  <text x="20.0" y="154.0" fill="#b45309" font-size="13" text-anchor="end" font-weight="700">C</text>
  <circle cx="388.2" cy="150.0" r="5" fill="#b45309"/>
  <text x="396.2" y="142.0" fill="#b45309" font-size="13" text-anchor="start" font-weight="700">C</text>
  <line x1="30.0" y1="150.0" x2="388.2" y2="150.0" stroke="#b45309" stroke-width="0.8" stroke-dasharray="3 3"/>
  <circle cx="110.0" cy="230.0" r="5" fill="#7c3aed"/>
  <text x="110.0" y="248.0" fill="#7c3aed" font-size="13" text-anchor="middle" font-weight="700">D</text>
  <circle cx="457.3" cy="230.0" r="5" fill="#7c3aed"/>
  <text x="465.3" y="248.0" fill="#7c3aed" font-size="13" text-anchor="start" font-weight="700">D</text>
  <line x1="110.0" y1="230.0" x2="457.3" y2="230.0" stroke="#7c3aed" stroke-width="0.8" stroke-dasharray="3 3"/>
  <text x="320.0" y="276.0" fill="#475569" font-size="11" text-anchor="middle">A (θ=0): sin = 0 · B (π/2): sin = 1 đỉnh · C (π): sin = 0 · D (3π/2): sin = −1 đáy · 2π: về A, lặp lại</text>
  </g>
</svg>

Đọc lại theo hành trình: từ A, điểm trên đường tròn quay ngược chiều kim đồng hồ. Tọa độ tung $\\sin\\theta$ đi từ $0$ (A) lên $1$ (B), trở về $0$ (C), xuống $-1$ (D), rồi lại về $0$ (A). Đó là **một chu kỳ** đầy đủ — và đồ thị bên phải cho thấy đúng hành trình đó vẽ ra một "ngọn sóng".

> ❓ **Câu hỏi tự nhiên**: "Tại sao đồ thị bắt đầu từ $(0, 0)$ chứ không phải $(0, 1)$?" — Vì $\\sin(0) = 0$ (góc 0 → điểm A ở vị trí $(1, 0)$, tọa độ tung là 0). Nếu vẽ $y = \\cos x$, đồ thị **bắt đầu từ $(0, 1)$** (vì $\\cos(0) = 1$ — tọa độ hoành của A là 1).

**📝 Tóm tắt mục 1**:

- Đồ thị $y = \\sin x$ ghi lại tọa độ tung của một điểm đang quay đều trên đường tròn đơn vị.
- Đồ thị $y = \\cos x$ ghi lại tọa độ hoành.
- 4 vị trí then chốt trong 1 chu kỳ: $\\theta = 0$ ($\\sin = 0$), $\\frac{\\pi}{2}$ ($\\sin = 1$), $\\pi$ ($\\sin = 0$), $\\frac{3\\pi}{2}$ ($\\sin = -1$).
- Sau $2\\pi$, đồ thị lặp lại — đó là tính tuần hoàn (periodicity).

---

## 2. Đồ thị \`y = sin x\`

### 2.1. Bảng giá trị

Lập bảng giá trị tại các góc đặc biệt đã học ở Lesson 03 ($\\frac{\\pi}{6} = 30°$, $\\frac{\\pi}{4} = 45°$, $\\frac{\\pi}{3} = 60°$, $\\frac{\\pi}{2} = 90°$...):

| x (rad) | x (deg) | sin x | Giá trị thập phân |
|---:|---:|---|---:|
| $0$ | 0° | $0$ | 0.000 |
| $\\frac{\\pi}{6}$ | 30° | $\\frac{1}{2}$ | 0.500 |
| $\\frac{\\pi}{4}$ | 45° | $\\frac{\\sqrt{2}}{2}$ | 0.707 |
| $\\frac{\\pi}{3}$ | 60° | $\\frac{\\sqrt{3}}{2}$ | 0.866 |
| $\\frac{\\pi}{2}$ | 90° | $1$ | **1.000** ← đỉnh |
| $\\frac{2\\pi}{3}$ | 120° | $\\frac{\\sqrt{3}}{2}$ | 0.866 |
| $\\frac{3\\pi}{4}$ | 135° | $\\frac{\\sqrt{2}}{2}$ | 0.707 |
| $\\frac{5\\pi}{6}$ | 150° | $\\frac{1}{2}$ | 0.500 |
| $\\pi$ | 180° | $0$ | 0.000 |
| $\\frac{7\\pi}{6}$ | 210° | $-\\frac{1}{2}$ | -0.500 |
| $\\frac{5\\pi}{4}$ | 225° | $-\\frac{\\sqrt{2}}{2}$ | -0.707 |
| $\\frac{4\\pi}{3}$ | 240° | $-\\frac{\\sqrt{3}}{2}$ | -0.866 |
| $\\frac{3\\pi}{2}$ | 270° | $-1$ | **-1.000** ← đáy |
| $\\frac{5\\pi}{3}$ | 300° | $-\\frac{\\sqrt{3}}{2}$ | -0.866 |
| $\\frac{7\\pi}{4}$ | 315° | $-\\frac{\\sqrt{2}}{2}$ | -0.707 |
| $\\frac{11\\pi}{6}$ | 330° | $-\\frac{1}{2}$ | -0.500 |
| $2\\pi$ | 360° | $0$ | 0.000 |

Đọc bảng: từ 0 lên 1 (nửa đầu chu kỳ), rồi xuống -1 (nửa sau), rồi về 0. Đối xứng quanh các điểm $\\frac{\\pi}{2}$ (đỉnh) và $\\frac{3\\pi}{2}$ (đáy).

### 2.2. Đặc điểm tổng hợp của \`y = sin x\`

- **Domain (miền xác định)**: $\\mathbb{R}$ — mọi số thực (mọi góc đều có sin).
- **Range (tập giá trị)**: $[-1, 1]$ — sin không bao giờ vượt khỏi đoạn này (đã chứng minh ở Lesson 03: điểm trên đường tròn đơn vị có tọa độ $\\in [-1, 1]$).
- **Chu kỳ** $T = 2\\pi$ — $\\sin(x + 2\\pi) = \\sin x$ với mọi $x$. Quay đủ 1 vòng thì lặp lại.
- **Hàm LẺ (odd)**: $\\sin(-x) = -\\sin(x)$. Đối xứng qua **gốc tọa độ**. Verify: $\\sin(-\\frac{\\pi}{6}) = -\\frac{1}{2} = -\\sin(\\frac{\\pi}{6})$ ✓
- **Đi qua gốc**: $\\sin(0) = 0$.
- **Các điểm 0**: $\\sin x = 0 \\iff x = k\\pi$ với $k$ nguyên ($\\ldots, -2\\pi, -\\pi, 0, \\pi, 2\\pi, \\ldots$).
- **Đỉnh** (max): $x = \\frac{\\pi}{2} + 2k\\pi$, giá trị $+1$.
- **Đáy** (min): $x = \\frac{3\\pi}{2} + 2k\\pi = -\\frac{\\pi}{2} + 2k\\pi$, giá trị $-1$.

### 2.3. Đồ thị \`y = sin x\` trên \`[-2π, 2π]\`

<svg viewBox="0 0 680 300" style="max-width:680px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = sin x trên [−2π, 2π]: qua 0 tại các bội của π, đỉnh 1 tại π/2 và −3π/2, đáy −1 tại −π/2 và 3π/2">
  <defs><marker id="w2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="89.1" y1="240.0" x2="89.1" y2="40.0"/>
<line x1="154.3" y1="240.0" x2="154.3" y2="40.0"/>
<line x1="219.5" y1="240.0" x2="219.5" y2="40.0"/>
<line x1="284.8" y1="240.0" x2="284.8" y2="40.0"/>
<line x1="415.2" y1="240.0" x2="415.2" y2="40.0"/>
<line x1="480.5" y1="240.0" x2="480.5" y2="40.0"/>
<line x1="545.7" y1="240.0" x2="545.7" y2="40.0"/>
<line x1="610.9" y1="240.0" x2="610.9" y2="40.0"/>
<line x1="60.0" y1="68.6" x2="640.0" y2="68.6"/>
<line x1="60.0" y1="211.4" x2="640.0" y2="211.4"/>
</g>
  <line x1="54.0" y1="140.0" x2="662.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w2)"/>
  <line x1="350.0" y1="246.0" x2="350.0" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w2)"/>
  <text x="654.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="358.0" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="89.1" y1="136.0" x2="89.1" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="89.1" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−2π</text>
  <line x1="154.3" y1="136.0" x2="154.3" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="154.3" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−3π/2</text>
  <line x1="219.5" y1="136.0" x2="219.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="219.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π</text>
  <line x1="284.8" y1="136.0" x2="284.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="284.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π/2</text>
  <line x1="415.2" y1="136.0" x2="415.2" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="415.2" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="480.5" y1="136.0" x2="480.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="480.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="545.7" y1="136.0" x2="545.7" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="545.7" y="156.0" fill="#475569" font-size="11" text-anchor="middle">3π/2</text>
  <line x1="610.9" y1="136.0" x2="610.9" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="610.9" y="156.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="346.0" y1="68.6" x2="354.0" y2="68.6" stroke="#1a202c" stroke-width="1.5"/>
  <text x="343.0" y="72.6" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="346.0" y1="211.4" x2="354.0" y2="211.4" stroke="#1a202c" stroke-width="1.5"/>
  <text x="343.0" y="215.4" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 60.0,186.0 L 61.4,184.1 L 62.9,182.1 L 64.4,180.1 L 65.8,178.0 L 67.2,175.8 L 68.7,173.6 L 70.2,171.4 L 71.6,169.2 L 73.1,166.9 L 74.5,164.5 L 75.9,162.2 L 77.4,159.8 L 78.9,157.4 L 80.3,155.0 L 81.8,152.5 L 83.2,150.1 L 84.6,147.6 L 86.1,145.1 L 87.6,142.6 L 89.0,140.1 L 90.4,137.6 L 91.9,135.1 L 93.4,132.7 L 94.8,130.2 L 96.3,127.7 L 97.7,125.3 L 99.2,122.8 L 100.6,120.4 L 102.1,118.0 L 103.5,115.7 L 105.0,113.3 L 106.4,111.0 L 107.9,108.8 L 109.3,106.6 L 110.8,104.4 L 112.2,102.2 L 113.7,100.1 L 115.1,98.1 L 116.6,96.1 L 118.0,94.2 L 119.5,92.3 L 120.9,90.5 L 122.3,88.7 L 123.8,87.0 L 125.2,85.3 L 126.7,83.8 L 128.2,82.3 L 129.6,80.8 L 131.1,79.5 L 132.5,78.2 L 134.0,77.0 L 135.4,75.8 L 136.8,74.8 L 138.3,73.8 L 139.8,72.9 L 141.2,72.1 L 142.7,71.4 L 144.1,70.7 L 145.5,70.2 L 147.0,69.7 L 148.5,69.3 L 149.9,69.0 L 151.3,68.8 L 152.8,68.6 L 154.2,68.6 L 155.7,68.6 L 157.2,68.7 L 158.6,69.0 L 160.0,69.3 L 161.5,69.6 L 163.0,70.1 L 164.4,70.7 L 165.8,71.3 L 167.3,72.0 L 168.8,72.9 L 170.2,73.7 L 171.7,74.7 L 173.1,75.8 L 174.5,76.9 L 176.0,78.1 L 177.4,79.4 L 178.9,80.7 L 180.4,82.2 L 181.8,83.7 L 183.2,85.2 L 184.7,86.9 L 186.2,88.6 L 187.6,90.3 L 189.0,92.1 L 190.5,94.0 L 192.0,96.0 L 193.4,98.0 L 194.8,100.0 L 196.3,102.1 L 197.8,104.2 L 199.2,106.4 L 200.7,108.6 L 202.1,110.9 L 203.6,113.2 L 205.0,115.5 L 206.5,117.9 L 207.9,120.2 L 209.3,122.7 L 210.8,125.1 L 212.2,127.5 L 213.7,130.0 L 215.2,132.5 L 216.6,135.0 L 218.1,137.4 L 219.5,139.9 L 221.0,142.4 L 222.4,144.9 L 223.9,147.4 L 225.3,149.9 L 226.8,152.3 L 228.2,154.8 L 229.7,157.2 L 231.1,159.6 L 232.6,162.0 L 234.0,164.4 L 235.4,166.7 L 236.9,169.0 L 238.3,171.3 L 239.8,173.5 L 241.2,175.7 L 242.7,177.8 L 244.2,179.9 L 245.6,181.9 L 247.1,183.9 L 248.5,185.9 L 249.9,187.8 L 251.4,189.6 L 252.8,191.4 L 254.3,193.1 L 255.8,194.7 L 257.2,196.3 L 258.7,197.8 L 260.1,199.2 L 261.6,200.6 L 263.0,201.8 L 264.4,203.0 L 265.9,204.2 L 267.4,205.2 L 268.8,206.2 L 270.2,207.1 L 271.7,207.9 L 273.1,208.7 L 274.6,209.3 L 276.0,209.9 L 277.5,210.3 L 278.9,210.7 L 280.4,211.0 L 281.9,211.3 L 283.3,211.4 L 284.8,211.4 L 286.2,211.4 L 287.6,211.3 L 289.1,211.0 L 290.6,210.7 L 292.0,210.3 L 293.4,209.9 L 294.9,209.3 L 296.4,208.7 L 297.8,207.9 L 299.2,207.1 L 300.7,206.2 L 302.1,205.3 L 303.6,204.2 L 305.1,203.1 L 306.5,201.9 L 307.9,200.6 L 309.4,199.2 L 310.9,197.8 L 312.3,196.3 L 313.8,194.7 L 315.2,193.1 L 316.6,191.4 L 318.1,189.6 L 319.6,187.8 L 321.0,185.9 L 322.4,184.0 L 323.9,182.0 L 325.4,180.0 L 326.8,177.9 L 328.2,175.7 L 329.7,173.5 L 331.1,171.3 L 332.6,169.1 L 334.1,166.8 L 335.5,164.4 L 337.0,162.1 L 338.4,159.7 L 339.9,157.3 L 341.3,154.9 L 342.8,152.4 L 344.2,149.9 L 345.6,147.5 L 347.1,145.0 L 348.6,142.5 L 350.0,140.0 L 351.5,137.5 L 352.9,135.0 L 354.4,132.5 L 355.8,130.1 L 357.2,127.6 L 358.7,125.1 L 360.1,122.7 L 361.6,120.3 L 363.1,117.9 L 364.5,115.6 L 366.0,113.2 L 367.4,110.9 L 368.9,108.7 L 370.3,106.5 L 371.8,104.3 L 373.2,102.1 L 374.6,100.0 L 376.1,98.0 L 377.6,96.0 L 379.0,94.1 L 380.4,92.2 L 381.9,90.4 L 383.3,88.6 L 384.8,86.9 L 386.2,85.3 L 387.7,83.7 L 389.1,82.2 L 390.6,80.8 L 392.1,79.4 L 393.5,78.1 L 394.9,76.9 L 396.4,75.8 L 397.8,74.7 L 399.3,73.8 L 400.8,72.9 L 402.2,72.1 L 403.6,71.3 L 405.1,70.7 L 406.6,70.1 L 408.0,69.7 L 409.4,69.3 L 410.9,69.0 L 412.3,68.7 L 413.8,68.6 L 415.2,68.6 L 416.7,68.6 L 418.1,68.7 L 419.6,69.0 L 421.1,69.3 L 422.5,69.7 L 424.0,70.1 L 425.4,70.7 L 426.8,71.3 L 428.3,72.1 L 429.8,72.9 L 431.2,73.8 L 432.6,74.8 L 434.1,75.8 L 435.6,77.0 L 437.0,78.2 L 438.4,79.4 L 439.9,80.8 L 441.3,82.2 L 442.8,83.7 L 444.2,85.3 L 445.7,86.9 L 447.1,88.6 L 448.6,90.4 L 450.1,92.2 L 451.5,94.1 L 452.9,96.1 L 454.4,98.1 L 455.9,100.1 L 457.3,102.2 L 458.7,104.3 L 460.2,106.5 L 461.6,108.7 L 463.1,111.0 L 464.5,113.3 L 466.0,115.6 L 467.4,118.0 L 468.9,120.4 L 470.4,122.8 L 471.8,125.2 L 473.2,127.7 L 474.7,130.1 L 476.2,132.6 L 477.6,135.1 L 479.0,137.6 L 480.5,140.1 L 481.9,142.6 L 483.4,145.0 L 484.9,147.5 L 486.3,150.0 L 487.8,152.5 L 489.2,154.9 L 490.6,157.3 L 492.1,159.8 L 493.5,162.1 L 495.0,164.5 L 496.4,166.8 L 497.9,169.1 L 499.4,171.4 L 500.8,173.6 L 502.2,175.8 L 503.7,177.9 L 505.2,180.0 L 506.6,182.0 L 508.0,184.0 L 509.5,186.0 L 511.0,187.9 L 512.4,189.7 L 513.8,191.4 L 515.3,193.1 L 516.8,194.8 L 518.2,196.3 L 519.6,197.8 L 521.1,199.3 L 522.5,200.6 L 524.0,201.9 L 525.4,203.1 L 526.9,204.2 L 528.4,205.3 L 529.8,206.3 L 531.2,207.1 L 532.7,208.0 L 534.2,208.7 L 535.6,209.3 L 537.0,209.9 L 538.5,210.4 L 540.0,210.7 L 541.4,211.0 L 542.8,211.3 L 544.3,211.4 L 545.8,211.4 L 547.2,211.4 L 548.6,211.2 L 550.1,211.0 L 551.5,210.7 L 553.0,210.3 L 554.5,209.8 L 555.9,209.3 L 557.4,208.6 L 558.8,207.9 L 560.2,207.1 L 561.7,206.2 L 563.2,205.2 L 564.6,204.2 L 566.0,203.0 L 567.5,201.8 L 568.9,200.5 L 570.4,199.2 L 571.8,197.7 L 573.3,196.2 L 574.7,194.7 L 576.2,193.0 L 577.6,191.3 L 579.1,189.5 L 580.5,187.7 L 582.0,185.8 L 583.5,183.9 L 584.9,181.9 L 586.4,179.9 L 587.8,177.8 L 589.2,175.6 L 590.7,173.4 L 592.2,171.2 L 593.6,169.0 L 595.0,166.7 L 596.5,164.3 L 597.9,162.0 L 599.4,159.6 L 600.8,157.2 L 602.3,154.7 L 603.8,152.3 L 605.2,149.8 L 606.6,147.3 L 608.1,144.9 L 609.5,142.4 L 611.0,139.9 L 612.5,137.4 L 613.9,134.9 L 615.3,132.4 L 616.8,129.9 L 618.2,127.5 L 619.7,125.0 L 621.2,122.6 L 622.6,120.2 L 624.0,117.8 L 625.5,115.5 L 626.9,113.1 L 628.4,110.8 L 629.8,108.6 L 631.3,106.4 L 632.8,104.2 L 634.2,102.0 L 635.6,99.9 L 637.1,97.9 L 638.5,95.9 L 640.0,94.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="434.9" y="64.4" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = sin x</text>
  <circle cx="89.1" cy="140.0" r="4" fill="#dc2626"/>
  <circle cx="219.5" cy="140.0" r="4" fill="#dc2626"/>
  <circle cx="350.0" cy="140.0" r="4" fill="#dc2626"/>
  <circle cx="480.5" cy="140.0" r="4" fill="#dc2626"/>
  <circle cx="610.9" cy="140.0" r="4" fill="#dc2626"/>
  <circle cx="415.2" cy="68.6" r="4" fill="#15803d"/>
  <circle cx="154.3" cy="68.6" r="4" fill="#15803d"/>
  <circle cx="284.8" cy="211.4" r="4" fill="#b45309"/>
  <circle cx="545.7" cy="211.4" r="4" fill="#b45309"/>
  <text x="340.0" y="270.0" fill="#475569" font-size="11" text-anchor="middle">sin = 0 tại −2π, −π, 0, π, 2π · đỉnh 1 tại π/2 (và −3π/2) · đáy −1 tại −π/2 (và 3π/2)</text>
</svg>

(Đồ thị là **đường cong trơn**, không có góc nhọn. Khi chạy \`visualization.html\`, bạn có thể kéo θ và xem điểm chạy dọc đường cong.)

> ⚠ **Lỗi thường gặp**: vẽ $y = \\sin x$ thành "đường zigzag răng cưa". Sin là hàm **trơn (smooth)**, không có góc nhọn — mọi điểm đều có tiếp tuyến rõ ràng (sẽ học chính thức ở Tầng 3 Calculus).

### 2.4. Tại sao đồ thị đối xứng quanh đỉnh/đáy?

Hãy nhìn lại bảng giá trị: $\\sin(\\frac{\\pi}{3}) = \\sin(\\frac{2\\pi}{3}) = \\frac{\\sqrt{3}}{2}$. Tức $\\sin$ tại các điểm **cách đều $\\frac{\\pi}{2}$** (đỉnh) cho cùng giá trị. Đó là **đối xứng trục** qua đường thẳng $x = \\frac{\\pi}{2}$.

**Chứng minh từng bước**: với mọi $a$, ta có $\\sin(\\frac{\\pi}{2} - a) = \\cos(a)$ (đồng nhất thức từ đường tròn đơn vị — ở Lesson 03 đã chỉ ra). Và $\\sin(\\frac{\\pi}{2} + a) = \\cos(a)$ cũng. Hai vế bằng nhau → đối xứng quanh $x = \\frac{\\pi}{2}$. (Sẽ học kỹ hơn ở Lesson 05 — identities.)

> 🔁 **Dừng lại tự kiểm tra**:
> - $\\sin(\\frac{7\\pi}{6}) = ?$
>   <details><summary>Đáp</summary>$-\\frac{1}{2}$. Vì $\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}$, và $\\sin(\\pi + a) = -\\sin(a) = -\\frac{1}{2}$.</details>
> - $\\sin x = 1$ có bao nhiêu nghiệm trong $[0, 4\\pi]$?
>   <details><summary>Đáp</summary>2 nghiệm: $x = \\frac{\\pi}{2}$ và $x = \\frac{\\pi}{2} + 2\\pi = \\frac{5\\pi}{2}$.</details>
> - Đồ thị $y = \\sin x$ cắt trục Ox tại bao nhiêu điểm trong $[-2\\pi, 2\\pi]$?
>   <details><summary>Đáp</summary>5 điểm: $x = -2\\pi, -\\pi, 0, \\pi, 2\\pi$.</details>

**📝 Tóm tắt mục 2**:

- $y = \\sin x$ có domain $\\mathbb{R}$, range $[-1, 1]$, chu kỳ $2\\pi$.
- Hàm lẻ, đối xứng qua gốc.
- Đi qua $(0, 0)$. Đỉnh tại $\\frac{\\pi}{2}$, đáy tại $\\frac{3\\pi}{2}$.
- Cắt trục Ox tại $x = k\\pi$.

---

## 3. Đồ thị \`y = cos x\`

### 3.1. Bảng giá trị

| x (rad) | x (deg) | cos x | Giá trị thập phân |
|---:|---:|---|---:|
| $0$ | 0° | $1$ | **1.000** ← đỉnh |
| $\\frac{\\pi}{6}$ | 30° | $\\frac{\\sqrt{3}}{2}$ | 0.866 |
| $\\frac{\\pi}{4}$ | 45° | $\\frac{\\sqrt{2}}{2}$ | 0.707 |
| $\\frac{\\pi}{3}$ | 60° | $\\frac{1}{2}$ | 0.500 |
| $\\frac{\\pi}{2}$ | 90° | $0$ | 0.000 |
| $\\frac{2\\pi}{3}$ | 120° | $-\\frac{1}{2}$ | -0.500 |
| $\\frac{3\\pi}{4}$ | 135° | $-\\frac{\\sqrt{2}}{2}$ | -0.707 |
| $\\frac{5\\pi}{6}$ | 150° | $-\\frac{\\sqrt{3}}{2}$ | -0.866 |
| $\\pi$ | 180° | $-1$ | **-1.000** ← đáy |
| $\\frac{7\\pi}{6}$ | 210° | $-\\frac{\\sqrt{3}}{2}$ | -0.866 |
| $\\frac{5\\pi}{4}$ | 225° | $-\\frac{\\sqrt{2}}{2}$ | -0.707 |
| $\\frac{4\\pi}{3}$ | 240° | $-\\frac{1}{2}$ | -0.500 |
| $\\frac{3\\pi}{2}$ | 270° | $0$ | 0.000 |
| $\\frac{5\\pi}{3}$ | 300° | $\\frac{1}{2}$ | 0.500 |
| $\\frac{7\\pi}{4}$ | 315° | $\\frac{\\sqrt{2}}{2}$ | 0.707 |
| $\\frac{11\\pi}{6}$ | 330° | $\\frac{\\sqrt{3}}{2}$ | 0.866 |
| $2\\pi$ | 360° | $1$ | 1.000 |

### 3.2. Đặc điểm tổng hợp của \`y = cos x\`

- **Domain**: $\\mathbb{R}$.
- **Range**: $[-1, 1]$.
- **Chu kỳ** $T = 2\\pi$.
- **Hàm CHẴN (even)**: $\\cos(-x) = \\cos(x)$. Đối xứng qua **trục Oy**. Verify: $\\cos(-\\frac{\\pi}{3}) = \\frac{1}{2} = \\cos(\\frac{\\pi}{3})$ ✓
- **Đi qua $(0, 1)$** (KHÔNG phải gốc). Đỉnh ban đầu nằm trên trục Oy.
- **Các điểm 0**: $\\cos x = 0 \\iff x = \\frac{\\pi}{2} + k\\pi$.
- **Đỉnh** (max): $x = 2k\\pi$ ($\\ldots, -2\\pi, 0, 2\\pi, \\ldots$), giá trị $+1$.
- **Đáy** (min): $x = \\pi + 2k\\pi$, giá trị $-1$.

### 3.3. Liên hệ then chốt: \`cos x = sin(x + π/2)\`

> 💡 **Trực giác**: Trên đường tròn đơn vị, $\\cos\\theta$ là tọa độ hoành; $\\sin\\theta$ là tọa độ tung. Nếu ta **quay điểm thêm $\\frac{\\pi}{2}$ ngược chiều kim đồng hồ**, tọa độ hoành cũ trở thành tọa độ tung mới. Tức $\\cos\\theta = \\sin(\\theta + \\frac{\\pi}{2})$ — cos chính là sin **dịch sang trái** $\\frac{\\pi}{2}$.

**Walk-through verify bằng số**:

| $x$ | $\\cos x$ | $x + \\frac{\\pi}{2}$ | $\\sin(x + \\frac{\\pi}{2})$ | Khớp? |
|---:|---:|---:|---:|:---:|
| $0$ | $1$ | $\\frac{\\pi}{2}$ | $\\sin(\\frac{\\pi}{2}) = 1$ | ✓ |
| $\\frac{\\pi}{6}$ | $\\frac{\\sqrt{3}}{2} \\approx 0.866$ | $\\frac{2\\pi}{3}$ | $\\sin(\\frac{2\\pi}{3}) = \\frac{\\sqrt{3}}{2}$ | ✓ |
| $\\frac{\\pi}{2}$ | $0$ | $\\pi$ | $\\sin(\\pi) = 0$ | ✓ |
| $\\pi$ | $-1$ | $\\frac{3\\pi}{2}$ | $\\sin(\\frac{3\\pi}{2}) = -1$ | ✓ |
| $-\\frac{\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\pi}{4}$ | $\\sin(\\frac{\\pi}{4}) = \\frac{\\sqrt{2}}{2}$ | ✓ |

Tất cả khớp. Đó là vì sao đồ thị $\\cos$ trông giống $\\sin$ chỉ trượt sang trái $\\frac{\\pi}{2}$ đơn vị.

> ⚠ **Lỗi thường gặp**: viết $\\cos x = \\sin(x - \\frac{\\pi}{2})$ (sai dấu). Hãy verify lại tại $x = 0$: $\\sin(0 - \\frac{\\pi}{2}) = \\sin(-\\frac{\\pi}{2}) = -1$, không bằng $\\cos(0) = 1$. Dấu **đúng** là $\\cos x = \\sin(x + \\frac{\\pi}{2})$.

### 3.4. Đồ thị \`y = cos x\` trên \`[-2π, 2π]\`

<svg viewBox="0 0 680 300" style="max-width:680px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = cos x trên [−2π, 2π]: đỉnh 1 tại −2π, 0, 2π; đáy −1 tại −π, π; qua 0 tại ±π/2, ±3π/2">
  <defs><marker id="w3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="89.1" y1="240.0" x2="89.1" y2="40.0"/>
<line x1="154.3" y1="240.0" x2="154.3" y2="40.0"/>
<line x1="219.5" y1="240.0" x2="219.5" y2="40.0"/>
<line x1="284.8" y1="240.0" x2="284.8" y2="40.0"/>
<line x1="415.2" y1="240.0" x2="415.2" y2="40.0"/>
<line x1="480.5" y1="240.0" x2="480.5" y2="40.0"/>
<line x1="545.7" y1="240.0" x2="545.7" y2="40.0"/>
<line x1="610.9" y1="240.0" x2="610.9" y2="40.0"/>
<line x1="60.0" y1="68.6" x2="640.0" y2="68.6"/>
<line x1="60.0" y1="211.4" x2="640.0" y2="211.4"/>
</g>
  <line x1="54.0" y1="140.0" x2="662.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w3)"/>
  <line x1="350.0" y1="246.0" x2="350.0" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w3)"/>
  <text x="654.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="358.0" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="89.1" y1="136.0" x2="89.1" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="89.1" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−2π</text>
  <line x1="154.3" y1="136.0" x2="154.3" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="154.3" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−3π/2</text>
  <line x1="219.5" y1="136.0" x2="219.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="219.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π</text>
  <line x1="284.8" y1="136.0" x2="284.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="284.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π/2</text>
  <line x1="415.2" y1="136.0" x2="415.2" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="415.2" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="480.5" y1="136.0" x2="480.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="480.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="545.7" y1="136.0" x2="545.7" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="545.7" y="156.0" fill="#475569" font-size="11" text-anchor="middle">3π/2</text>
  <line x1="610.9" y1="136.0" x2="610.9" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="610.9" y="156.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="346.0" y1="68.6" x2="354.0" y2="68.6" stroke="#1a202c" stroke-width="1.5"/>
  <text x="343.0" y="72.6" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="346.0" y1="211.4" x2="354.0" y2="211.4" stroke="#1a202c" stroke-width="1.5"/>
  <text x="343.0" y="215.4" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 60.0,85.4 L 61.4,83.8 L 62.9,82.3 L 64.4,80.9 L 65.8,79.5 L 67.2,78.2 L 68.7,77.0 L 70.2,75.9 L 71.6,74.8 L 73.1,73.8 L 74.5,72.9 L 75.9,72.1 L 77.4,71.4 L 78.9,70.7 L 80.3,70.2 L 81.8,69.7 L 83.2,69.3 L 84.6,69.0 L 86.1,68.8 L 87.6,68.6 L 89.0,68.6 L 90.4,68.6 L 91.9,68.7 L 93.4,69.0 L 94.8,69.3 L 96.3,69.6 L 97.7,70.1 L 99.2,70.7 L 100.6,71.3 L 102.1,72.0 L 103.5,72.8 L 105.0,73.7 L 106.4,74.7 L 107.9,75.8 L 109.3,76.9 L 110.8,78.1 L 112.2,79.4 L 113.7,80.7 L 115.1,82.1 L 116.6,83.6 L 118.0,85.2 L 119.5,86.8 L 120.9,88.5 L 122.3,90.3 L 123.8,92.1 L 125.2,94.0 L 126.7,95.9 L 128.2,97.9 L 129.6,100.0 L 131.1,102.1 L 132.5,104.2 L 134.0,106.4 L 135.4,108.6 L 136.8,110.9 L 138.3,113.2 L 139.8,115.5 L 141.2,117.8 L 142.7,120.2 L 144.1,122.6 L 145.5,125.1 L 147.0,127.5 L 148.5,130.0 L 149.9,132.4 L 151.3,134.9 L 152.8,137.4 L 154.2,139.9 L 155.7,142.4 L 157.2,144.9 L 158.6,147.4 L 160.0,149.9 L 161.5,152.3 L 163.0,154.8 L 164.4,157.2 L 165.8,159.6 L 167.3,162.0 L 168.8,164.4 L 170.2,166.7 L 171.7,169.0 L 173.1,171.2 L 174.5,173.5 L 176.0,175.6 L 177.4,177.8 L 178.9,179.9 L 180.4,181.9 L 181.8,183.9 L 183.2,185.9 L 184.7,187.7 L 186.2,189.6 L 187.6,191.3 L 189.0,193.0 L 190.5,194.7 L 192.0,196.2 L 193.4,197.7 L 194.8,199.2 L 196.3,200.5 L 197.8,201.8 L 199.2,203.0 L 200.7,204.2 L 202.1,205.2 L 203.6,206.2 L 205.0,207.1 L 206.5,207.9 L 207.9,208.6 L 209.3,209.3 L 210.8,209.9 L 212.2,210.3 L 213.7,210.7 L 215.2,211.0 L 216.6,211.3 L 218.1,211.4 L 219.5,211.4 L 221.0,211.4 L 222.4,211.3 L 223.9,211.0 L 225.3,210.7 L 226.8,210.4 L 228.2,209.9 L 229.7,209.3 L 231.1,208.7 L 232.6,207.9 L 234.0,207.1 L 235.4,206.2 L 236.9,205.3 L 238.3,204.2 L 239.8,203.1 L 241.2,201.9 L 242.7,200.6 L 244.2,199.2 L 245.6,197.8 L 247.1,196.3 L 248.5,194.7 L 249.9,193.1 L 251.4,191.4 L 252.8,189.7 L 254.3,187.8 L 255.8,185.9 L 257.2,184.0 L 258.7,182.0 L 260.1,180.0 L 261.6,177.9 L 263.0,175.7 L 264.4,173.6 L 265.9,171.3 L 267.4,169.1 L 268.8,166.8 L 270.2,164.5 L 271.7,162.1 L 273.1,159.7 L 274.6,157.3 L 276.0,154.9 L 277.5,152.4 L 278.9,150.0 L 280.4,147.5 L 281.9,145.0 L 283.3,142.5 L 284.8,140.0 L 286.2,137.5 L 287.6,135.0 L 289.1,132.6 L 290.6,130.1 L 292.0,127.6 L 293.4,125.2 L 294.9,122.7 L 296.4,120.3 L 297.8,118.0 L 299.2,115.6 L 300.7,113.3 L 302.1,111.0 L 303.6,108.7 L 305.1,106.5 L 306.5,104.3 L 307.9,102.2 L 309.4,100.1 L 310.9,98.0 L 312.3,96.0 L 313.8,94.1 L 315.2,92.2 L 316.6,90.4 L 318.1,88.6 L 319.6,86.9 L 321.0,85.3 L 322.4,83.7 L 323.9,82.2 L 325.4,80.8 L 326.8,79.4 L 328.2,78.1 L 329.7,76.9 L 331.1,75.8 L 332.6,74.8 L 334.1,73.8 L 335.5,72.9 L 337.0,72.1 L 338.4,71.3 L 339.9,70.7 L 341.3,70.1 L 342.8,69.7 L 344.2,69.3 L 345.6,69.0 L 347.1,68.7 L 348.6,68.6 L 350.0,68.6 L 351.5,68.6 L 352.9,68.7 L 354.4,69.0 L 355.8,69.3 L 357.2,69.7 L 358.7,70.1 L 360.1,70.7 L 361.6,71.3 L 363.1,72.1 L 364.5,72.9 L 366.0,73.8 L 367.4,74.8 L 368.9,75.8 L 370.3,76.9 L 371.8,78.1 L 373.2,79.4 L 374.6,80.8 L 376.1,82.2 L 377.6,83.7 L 379.0,85.3 L 380.4,86.9 L 381.9,88.6 L 383.3,90.4 L 384.8,92.2 L 386.2,94.1 L 387.7,96.0 L 389.1,98.0 L 390.6,100.1 L 392.1,102.2 L 393.5,104.3 L 394.9,106.5 L 396.4,108.7 L 397.8,111.0 L 399.3,113.3 L 400.8,115.6 L 402.2,118.0 L 403.6,120.3 L 405.1,122.7 L 406.6,125.2 L 408.0,127.6 L 409.4,130.1 L 410.9,132.6 L 412.3,135.0 L 413.8,137.5 L 415.2,140.0 L 416.7,142.5 L 418.1,145.0 L 419.6,147.5 L 421.1,150.0 L 422.5,152.4 L 424.0,154.9 L 425.4,157.3 L 426.8,159.7 L 428.3,162.1 L 429.8,164.5 L 431.2,166.8 L 432.6,169.1 L 434.1,171.3 L 435.6,173.6 L 437.0,175.7 L 438.4,177.9 L 439.9,180.0 L 441.3,182.0 L 442.8,184.0 L 444.2,185.9 L 445.7,187.8 L 447.1,189.7 L 448.6,191.4 L 450.1,193.1 L 451.5,194.7 L 452.9,196.3 L 454.4,197.8 L 455.9,199.2 L 457.3,200.6 L 458.7,201.9 L 460.2,203.1 L 461.6,204.2 L 463.1,205.3 L 464.5,206.2 L 466.0,207.1 L 467.4,207.9 L 468.9,208.7 L 470.4,209.3 L 471.8,209.9 L 473.2,210.4 L 474.7,210.7 L 476.2,211.0 L 477.6,211.3 L 479.0,211.4 L 480.5,211.4 L 481.9,211.4 L 483.4,211.3 L 484.9,211.0 L 486.3,210.7 L 487.8,210.3 L 489.2,209.9 L 490.6,209.3 L 492.1,208.6 L 493.5,207.9 L 495.0,207.1 L 496.4,206.2 L 497.9,205.2 L 499.4,204.2 L 500.8,203.0 L 502.2,201.8 L 503.7,200.5 L 505.2,199.2 L 506.6,197.7 L 508.0,196.2 L 509.5,194.7 L 511.0,193.0 L 512.4,191.3 L 513.8,189.6 L 515.3,187.7 L 516.8,185.9 L 518.2,183.9 L 519.6,181.9 L 521.1,179.9 L 522.5,177.8 L 524.0,175.6 L 525.4,173.5 L 526.9,171.2 L 528.4,169.0 L 529.8,166.7 L 531.2,164.4 L 532.7,162.0 L 534.2,159.6 L 535.6,157.2 L 537.0,154.8 L 538.5,152.3 L 540.0,149.9 L 541.4,147.4 L 542.8,144.9 L 544.3,142.4 L 545.8,139.9 L 547.2,137.4 L 548.6,134.9 L 550.1,132.4 L 551.5,130.0 L 553.0,127.5 L 554.5,125.1 L 555.9,122.6 L 557.4,120.2 L 558.8,117.8 L 560.2,115.5 L 561.7,113.2 L 563.2,110.9 L 564.6,108.6 L 566.0,106.4 L 567.5,104.2 L 568.9,102.1 L 570.4,100.0 L 571.8,97.9 L 573.3,95.9 L 574.7,94.0 L 576.2,92.1 L 577.6,90.3 L 579.1,88.5 L 580.5,86.8 L 582.0,85.2 L 583.5,83.6 L 584.9,82.1 L 586.4,80.7 L 587.8,79.4 L 589.2,78.1 L 590.7,76.9 L 592.2,75.8 L 593.6,74.7 L 595.0,73.7 L 596.5,72.8 L 597.9,72.0 L 599.4,71.3 L 600.8,70.7 L 602.3,70.1 L 603.8,69.6 L 605.2,69.3 L 606.6,69.0 L 608.1,68.7 L 609.5,68.6 L 611.0,68.6 L 612.5,68.6 L 613.9,68.8 L 615.3,69.0 L 616.8,69.3 L 618.2,69.7 L 619.7,70.2 L 621.2,70.7 L 622.6,71.4 L 624.0,72.1 L 625.5,72.9 L 626.9,73.8 L 628.4,74.8 L 629.8,75.9 L 631.3,77.0 L 632.8,78.2 L 634.2,79.5 L 635.6,80.9 L 637.1,82.3 L 638.5,83.8 L 640.0,85.4" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="366.4" y="62.8" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">y = cos x</text>
  <circle cx="89.1" cy="68.6" r="4" fill="#dc2626"/>
  <circle cx="350.0" cy="68.6" r="4" fill="#dc2626"/>
  <circle cx="610.9" cy="68.6" r="4" fill="#dc2626"/>
  <circle cx="219.5" cy="211.4" r="4" fill="#b45309"/>
  <circle cx="480.5" cy="211.4" r="4" fill="#b45309"/>
  <circle cx="154.3" cy="140.0" r="4" fill="#94a3b8"/>
  <circle cx="284.8" cy="140.0" r="4" fill="#94a3b8"/>
  <circle cx="415.2" cy="140.0" r="4" fill="#94a3b8"/>
  <circle cx="545.7" cy="140.0" r="4" fill="#94a3b8"/>
  <text x="340.0" y="270.0" fill="#475569" font-size="11" text-anchor="middle">đỉnh tại −2π, 0, 2π · đáy tại −π, π · cắt 0 tại ±π/2, ±3π/2</text>
</svg>

> 🔁 **Dừng lại tự kiểm tra**:
> - $\\cos(-\\pi) = ?$
>   <details><summary>Đáp</summary>$-1$. Hàm chẵn nên $\\cos(-\\pi) = \\cos(\\pi) = -1$.</details>
> - Đồ thị $\\cos$ và $\\sin$ có cắt nhau không? Tại đâu trong $[0, 2\\pi]$?
>   <details><summary>Đáp</summary>Có. $\\sin x = \\cos x \\iff \\tan x = 1 \\iff x = \\frac{\\pi}{4} + k\\pi$. Trong $[0, 2\\pi]$: $x = \\frac{\\pi}{4}$ (cả hai $= \\frac{\\sqrt{2}}{2}$) và $x = \\frac{5\\pi}{4}$ (cả hai $= -\\frac{\\sqrt{2}}{2}$).</details>

**📝 Tóm tắt mục 3**:

- $\\cos$ cùng hình sóng với $\\sin$, nhưng **dịch sang trái $\\frac{\\pi}{2}$**: $\\cos x = \\sin(x + \\frac{\\pi}{2})$.
- Hàm chẵn, đối xứng qua Oy.
- Đi qua $(0, 1)$. Đỉnh tại $2k\\pi$, đáy tại $(2k+1)\\pi$.
- Cắt trục Ox tại $\\frac{\\pi}{2} + k\\pi$.

---

## 4. Đồ thị \`y = tan x\`

### 4.1. Định nghĩa và domain

$\\tan x = \\frac{\\sin x}{\\cos x}$. Vấn đề ngay lập tức: khi $\\cos x = 0$ thì $\\tan x$ **không xác định** (chia cho 0).

$\\cos x = 0$ tại các điểm $x = \\frac{\\pi}{2} + k\\pi$, tức $\\ldots, -\\frac{3\\pi}{2}, -\\frac{\\pi}{2}, \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots$

- **Domain**: $\\mathbb{R} \\setminus \\{\\frac{\\pi}{2} + k\\pi : k \\in \\mathbb{Z}\\}$.
- Tại các điểm này, đồ thị có **đường tiệm cận đứng (vertical asymptote)**.

### 4.2. Bảng giá trị

| x | sin x | cos x | tan x |
|---:|---:|---:|---:|
| $0$ | $0$ | $1$ | $0$ |
| $\\frac{\\pi}{6}$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{3}} \\approx 0.577$ |
| $\\frac{\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $1$ |
| $\\frac{\\pi}{3}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ | $\\sqrt{3} \\approx 1.732$ |
| $\\frac{\\pi}{2} - 0.01$ | $\\approx 1$ | $\\approx 0.01$ | $\\approx$ **100** (rất lớn) |
| $\\frac{\\pi}{2}$ | $1$ | $0$ | **undefined** ($\\to +\\infty$) |
| $\\frac{\\pi}{2} + 0.01$ | $\\approx 1$ | $\\approx -0.01$ | $\\approx$ **-100** (rất âm) |
| $\\frac{2\\pi}{3}$ | $\\frac{\\sqrt{3}}{2}$ | $-\\frac{1}{2}$ | $-\\sqrt{3} \\approx -1.732$ |
| $\\frac{3\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $-\\frac{\\sqrt{2}}{2}$ | $-1$ |
| $\\frac{5\\pi}{6}$ | $\\frac{1}{2}$ | $-\\frac{\\sqrt{3}}{2}$ | $-\\frac{1}{\\sqrt{3}} \\approx -0.577$ |
| $\\pi$ | $0$ | $-1$ | $0$ |

Đọc kỹ: khi $x$ tiến tới $\\frac{\\pi}{2}$ từ **bên trái** ($x < \\frac{\\pi}{2}$), $\\cos x$ dương nhỏ dần → $\\tan x = \\frac{\\sin}{\\cos}$ **tiến tới $+\\infty$**. Khi vượt qua $\\frac{\\pi}{2}$ ($x > \\frac{\\pi}{2}$), $\\cos x$ âm nhỏ → $\\tan x$ **tiến từ $-\\infty$**. Đó là vì sao có "nhảy" từ $+\\infty$ sang $-\\infty$ tại tiệm cận.

### 4.3. Đặc điểm tổng hợp của \`y = tan x\`

- **Domain**: $\\mathbb{R} \\setminus \\{\\frac{\\pi}{2} + k\\pi\\}$.
- **Range**: $\\mathbb{R}$ (tất cả số thực — không bị chặn).
- **Chu kỳ** $T = \\pi$ (KHÔNG phải $2\\pi$!). Verify: $\\tan(x + \\pi) = \\frac{\\sin(x+\\pi)}{\\cos(x+\\pi)} = \\frac{-\\sin x}{-\\cos x} = \\frac{\\sin x}{\\cos x} = \\tan x$. ✓
- **Hàm LẺ**: $\\tan(-x) = -\\tan(x)$. Đối xứng qua gốc.
- **Đi qua gốc**: $\\tan(0) = 0$.
- **Các điểm 0**: $\\tan x = 0 \\iff \\sin x = 0 \\iff x = k\\pi$.
- **Tiệm cận đứng**: $x = \\frac{\\pi}{2} + k\\pi$.

> ❓ **Câu hỏi tự nhiên**: "Sao chu kỳ tan là $\\pi$ mà sin/cos là $2\\pi$?" — Vì khi cộng $\\pi$ vào $x$, cả $\\sin$ và $\\cos$ đều **đổi dấu** (đối xứng qua gốc tròn). Tỉ số $\\frac{\\sin}{\\cos}$ **không đổi dấu** (âm chia âm vẫn dương). Tức tan tự khôi phục sau nửa vòng quay.

### 4.4. Đồ thị \`y = tan x\` trên \`[-π, π]\`

<svg viewBox="0 0 640 320" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = tan x trên [−π, π]: ba nhánh, tiệm cận đứng tại −π/2 và π/2, qua 0 tại −π, 0, π">
  <defs><marker id="w4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="83.5" y1="240.0" x2="83.5" y2="40.0"/>
<line x1="206.8" y1="240.0" x2="206.8" y2="40.0"/>
<line x1="453.2" y1="240.0" x2="453.2" y2="40.0"/>
<line x1="576.5" y1="240.0" x2="576.5" y2="40.0"/>
<line x1="60.0" y1="108.8" x2="600.0" y2="108.8"/>
<line x1="60.0" y1="77.5" x2="600.0" y2="77.5"/>
<line x1="60.0" y1="46.2" x2="600.0" y2="46.2"/>
<line x1="60.0" y1="171.2" x2="600.0" y2="171.2"/>
<line x1="60.0" y1="202.5" x2="600.0" y2="202.5"/>
<line x1="60.0" y1="233.8" x2="600.0" y2="233.8"/>
</g>
  <line x1="54.0" y1="140.0" x2="622.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w4)"/>
  <line x1="330.0" y1="246.0" x2="330.0" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w4)"/>
  <text x="614.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="338.0" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="83.5" y1="136.0" x2="83.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="83.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π</text>
  <line x1="206.8" y1="136.0" x2="206.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="206.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−π/2</text>
  <line x1="453.2" y1="136.0" x2="453.2" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="453.2" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="576.5" y1="136.0" x2="576.5" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="576.5" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="326.0" y1="108.8" x2="334.0" y2="108.8" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="112.8" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="326.0" y1="77.5" x2="334.0" y2="77.5" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="81.5" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="326.0" y1="46.2" x2="334.0" y2="46.2" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="50.2" fill="#475569" font-size="11" text-anchor="end">3</text>
  <line x1="326.0" y1="171.2" x2="334.0" y2="171.2" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="175.2" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="326.0" y1="202.5" x2="334.0" y2="202.5" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="206.5" fill="#475569" font-size="11" text-anchor="end">−2</text>
  <line x1="326.0" y1="233.8" x2="334.0" y2="233.8" stroke="#1a202c" stroke-width="1.5"/>
  <text x="323.0" y="237.8" fill="#475569" font-size="11" text-anchor="end">−3</text>
  <path d="M 60.0,149.7 L 61.3,149.1 L 62.7,148.5 L 64.0,147.9 L 65.4,147.4 L 66.7,146.8 L 68.1,146.2 L 69.4,145.7 L 70.8,145.1 L 72.1,144.6 L 73.5,144.0 L 74.8,143.5 L 76.2,142.9 L 77.5,142.4 L 78.9,141.8 L 80.2,141.3 L 81.6,140.8 L 82.9,140.2 L 84.3,139.7 L 85.6,139.2 L 87.0,138.6 L 88.3,138.1 L 89.7,137.5 L 91.1,137.0 L 92.4,136.5 L 93.8,135.9 L 95.1,135.4 L 96.4,134.8 L 97.8,134.3 L 99.1,133.7 L 100.5,133.1 L 101.8,132.6 L 103.2,132.0 L 104.5,131.4 L 105.9,130.8 L 107.2,130.3 L 108.6,129.7 L 109.9,129.1 L 111.3,128.5 L 112.7,127.8 L 114.0,127.2 L 115.3,126.6 L 116.7,125.9 L 118.0,125.3 L 119.4,124.6 L 120.7,124.0 L 122.1,123.3 L 123.5,122.6 L 124.8,121.9 L 126.1,121.1 L 127.5,120.4 L 128.8,119.6 L 130.2,118.9 L 131.5,118.1 L 132.9,117.3 L 134.2,116.4 L 135.6,115.6 L 136.9,114.7 L 138.3,113.8 L 139.6,112.9 L 141.0,111.9 L 142.3,110.9 L 143.7,109.9 L 145.0,108.8 L 146.4,107.7 L 147.7,106.6 L 149.1,105.4 L 150.4,104.2 L 151.8,102.9 L 153.2,101.6 L 154.5,100.2 L 155.8,98.8 L 157.2,97.3 L 158.5,95.7 L 159.9,94.1 L 161.3,92.3 L 162.6,90.5 L 164.0,88.5 L 165.3,86.5 L 166.7,84.3 L 168.0,82.0 L 169.3,79.5 L 170.7,76.9 L 172.0,74.1 L 173.4,71.0 L 174.8,67.7 L 176.1,64.2 L 177.5,60.3 L 178.8,56.1 L 180.2,51.5 L 181.5,46.4 L 182.8,40.7 L 184.2,34.4 L 185.6,27.3 L 186.9,19.3 L 188.2,10.1 L 189.6,-0.5" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 223.3,285.6 L 224.7,274.3 L 226.1,264.6 L 227.4,256.1 L 228.8,248.6 L 230.1,242.0 L 231.4,236.0 L 232.8,230.7 L 234.1,225.9 L 235.5,221.5 L 236.8,217.5 L 238.2,213.8 L 239.5,210.4 L 240.9,207.2 L 242.2,204.3 L 243.6,201.6 L 244.9,199.1 L 246.3,196.7 L 247.7,194.4 L 249.0,192.3 L 250.3,190.3 L 251.7,188.5 L 253.1,186.7 L 254.4,185.0 L 255.8,183.4 L 257.1,181.8 L 258.4,180.4 L 259.8,179.0 L 261.1,177.6 L 262.5,176.3 L 263.8,175.1 L 265.2,173.9 L 266.5,172.7 L 267.9,171.6 L 269.2,170.6 L 270.6,169.5 L 271.9,168.5 L 273.3,167.6 L 274.6,166.6 L 276.0,165.7 L 277.3,164.8 L 278.7,163.9 L 280.0,163.1 L 281.4,162.3 L 282.8,161.5 L 284.1,160.7 L 285.4,159.9 L 286.8,159.2 L 288.1,158.5 L 289.5,157.7 L 290.9,157.0 L 292.2,156.3 L 293.6,155.7 L 294.9,155.0 L 296.2,154.3 L 297.6,153.7 L 298.9,153.1 L 300.3,152.4 L 301.6,151.8 L 303.0,151.2 L 304.4,150.6 L 305.7,150.0 L 307.1,149.4 L 308.4,148.8 L 309.8,148.3 L 311.1,147.7 L 312.4,147.1 L 313.8,146.5 L 315.1,146.0 L 316.5,145.4 L 317.8,144.9 L 319.2,144.3 L 320.6,143.8 L 321.9,143.2 L 323.2,142.7 L 324.6,142.2 L 325.9,141.6 L 327.3,141.1 L 328.6,140.5 L 330.0,140.0 L 331.4,139.5 L 332.7,138.9 L 334.1,138.4 L 335.4,137.8 L 336.8,137.3 L 338.1,136.8 L 339.5,136.2 L 340.8,135.7 L 342.2,135.1 L 343.5,134.6 L 344.9,134.0 L 346.2,133.5 L 347.6,132.9 L 348.9,132.3 L 350.2,131.7 L 351.6,131.2 L 352.9,130.6 L 354.3,130.0 L 355.7,129.4 L 357.0,128.8 L 358.4,128.2 L 359.7,127.6 L 361.1,126.9 L 362.4,126.3 L 363.8,125.7 L 365.1,125.0 L 366.4,124.3 L 367.8,123.7 L 369.1,123.0 L 370.5,122.3 L 371.9,121.5 L 373.2,120.8 L 374.6,120.1 L 375.9,119.3 L 377.2,118.5 L 378.6,117.7 L 380.0,116.9 L 381.3,116.1 L 382.7,115.2 L 384.0,114.3 L 385.4,113.4 L 386.7,112.4 L 388.1,111.5 L 389.4,110.5 L 390.8,109.4 L 392.1,108.4 L 393.5,107.3 L 394.8,106.1 L 396.2,104.9 L 397.5,103.7 L 398.9,102.4 L 400.2,101.0 L 401.6,99.6 L 402.9,98.2 L 404.2,96.6 L 405.6,95.0 L 406.9,93.3 L 408.3,91.5 L 409.6,89.7 L 411.0,87.7 L 412.4,85.6 L 413.7,83.3 L 415.1,80.9 L 416.4,78.4 L 417.8,75.7 L 419.1,72.8 L 420.4,69.6 L 421.8,66.2 L 423.1,62.5 L 424.5,58.5 L 425.8,54.1 L 427.2,49.3 L 428.5,44.0 L 429.9,38.0 L 431.2,31.4 L 432.6,23.9 L 433.9,15.4 L 435.3,5.7 L 436.7,-5.6" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 470.4,280.5 L 471.8,269.9 L 473.1,260.7 L 474.5,252.7 L 475.8,245.6 L 477.2,239.3 L 478.5,233.6 L 479.9,228.5 L 481.2,223.9 L 482.6,219.7 L 483.9,215.8 L 485.2,212.3 L 486.6,209.0 L 488.0,205.9 L 489.3,203.1 L 490.6,200.5 L 492.0,198.0 L 493.4,195.7 L 494.7,193.5 L 496.0,191.5 L 497.4,189.5 L 498.8,187.7 L 500.1,185.9 L 501.4,184.3 L 502.8,182.7 L 504.1,181.2 L 505.5,179.8 L 506.9,178.4 L 508.2,177.1 L 509.5,175.8 L 510.9,174.6 L 512.2,173.4 L 513.6,172.3 L 514.9,171.2 L 516.3,170.1 L 517.7,169.1 L 519.0,168.1 L 520.3,167.1 L 521.7,166.2 L 523.0,165.3 L 524.4,164.4 L 525.8,163.6 L 527.1,162.7 L 528.5,161.9 L 529.8,161.1 L 531.1,160.4 L 532.5,159.6 L 533.9,158.9 L 535.2,158.1 L 536.5,157.4 L 537.9,156.7 L 539.2,156.0 L 540.6,155.4 L 542.0,154.7 L 543.3,154.1 L 544.7,153.4 L 546.0,152.8 L 547.3,152.2 L 548.7,151.5 L 550.1,150.9 L 551.4,150.3 L 552.8,149.7 L 554.1,149.2 L 555.5,148.6 L 556.8,148.0 L 558.2,147.4 L 559.5,146.9 L 560.9,146.3 L 562.2,145.7 L 563.5,145.2 L 564.9,144.6 L 566.2,144.1 L 567.6,143.5 L 569.0,143.0 L 570.3,142.5 L 571.7,141.9 L 573.0,141.4 L 574.4,140.8 L 575.7,140.3 L 577.1,139.8 L 578.4,139.2 L 579.8,138.7 L 581.1,138.2 L 582.5,137.6 L 583.8,137.1 L 585.1,136.5 L 586.5,136.0 L 587.9,135.4 L 589.2,134.9 L 590.5,134.3 L 591.9,133.8 L 593.2,133.2 L 594.6,132.6 L 596.0,132.1 L 597.3,131.5 L 598.7,130.9 L 600.0,130.3" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="402.7" y="96.4" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">y = tan x</text>
  <line x1="206.8" y1="236.9" x2="206.8" y2="43.1" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="453.2" y1="236.9" x2="453.2" y2="43.1" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="320.0" y="290.0" fill="#475569" font-size="11" text-anchor="middle">tiệm cận đứng (nét đứt) tại x = −π/2 và π/2 — tan không xác định · chu kỳ π</text>
</svg>

(Chú ý các đường dọc \`│\` ở $-\\frac{\\pi}{2}$ và $\\frac{\\pi}{2}$ chính là tiệm cận — đồ thị **không chạm** vào chúng, chỉ tiến tới $\\pm\\infty$.)

> 🔁 **Dừng lại tự kiểm tra**:
> - $\\tan(\\frac{\\pi}{4}) + \\tan(\\frac{3\\pi}{4}) = ?$
>   <details><summary>Đáp</summary>$1 + (-1) = 0$.</details>
> - $\\tan x = 1$ có bao nhiêu nghiệm trong $[0, 4\\pi]$?
>   <details><summary>Đáp</summary>4 nghiệm: $\\frac{\\pi}{4}, \\frac{5\\pi}{4}, \\frac{9\\pi}{4}, \\frac{13\\pi}{4}$ (vì chu kỳ $\\pi$).</details>

**📝 Tóm tắt mục 4**:

- $\\tan x = \\frac{\\sin x}{\\cos x}$. Không xác định khi $\\cos x = 0$.
- Chu kỳ $\\pi$ (khác sin/cos).
- Range $\\mathbb{R}$ (không bị chặn).
- Tiệm cận đứng tại $\\frac{\\pi}{2} + k\\pi$.

---

## 5. Biến đổi đồ thị — biên độ \`A\`

Bây giờ ta bắt đầu **biến đổi** đồ thị cơ bản để có gia đình hàm sin tổng quát.

### 5.1. Phương trình \`y = A · sin x\`

> 💡 **Trực giác**: nhân cả hàm với $A$ = **kéo dãn theo trục y** với tỉ số $|A|$. Đồ thị cao gấp $|A|$ lần. Nếu $A < 0$, còn **lật ngược** (gương qua trục Ox).

**Định nghĩa**: với $y = A \\cdot \\sin x$:

- **Biên độ (amplitude)** = $|A|$ — khoảng cách từ trục trung bình tới đỉnh.
- **Range** thay đổi: từ $[-1, 1] \\to [-|A|, |A|]$.
- Chu kỳ, pha, các điểm 0 **không đổi** (vẫn $2\\pi$, vẫn cắt Ox tại $k\\pi$).

### 5.2. Bốn ví dụ walk-through

**Ví dụ 1**: $y = 2\\sin x$. Biên độ $= |2| = 2$. Range $= [-2, 2]$.

| x | sin x | 2 sin x |
|---:|---:|---:|
| $0$ | $0$ | $0$ |
| $\\frac{\\pi}{6}$ | $0.5$ | **1** |
| $\\frac{\\pi}{2}$ | $1$ | **2** (đỉnh) |
| $\\pi$ | $0$ | $0$ |
| $\\frac{3\\pi}{2}$ | $-1$ | **-2** (đáy) |

Đồ thị có hình giống $\\sin x$ nhưng **gấp đôi chiều cao**.

**Ví dụ 2**: $y = 0.5\\sin x$. Biên độ $= 0.5$. Range $= [-0.5, 0.5]$.

| x | sin x | 0.5 sin x |
|---:|---:|---:|
| $\\frac{\\pi}{2}$ | $1$ | $0.5$ |
| $\\frac{3\\pi}{2}$ | $-1$ | $-0.5$ |

Đồ thị **bẹp** hơn — chiều cao chỉ một nửa.

**Ví dụ 3**: $y = -1 \\cdot \\sin x = -\\sin x$. Biên độ $= |-1| = 1$. Range vẫn $[-1, 1]$. NHƯNG **lật ngược qua trục Ox**.

| x | sin x | -sin x |
|---:|---:|---:|
| $0$ | $0$ | $0$ |
| $\\frac{\\pi}{2}$ | $1$ | **-1** (giờ là đáy, không phải đỉnh) |
| $\\pi$ | $0$ | $0$ |
| $\\frac{3\\pi}{2}$ | $-1$ | **1** (giờ là đỉnh) |

Đỉnh và đáy đổi vị trí. Nhớ: $-\\sin x = \\sin(-x)$ (vì sin là hàm lẻ) $= \\sin(x + \\pi)$ (dịch pha $\\pi$).

**Ví dụ 4**: $y = 3\\sin x$. Biên độ $= 3$. Range $= [-3, 3]$. Đỉnh $+3$, đáy $-3$.

### 5.3. So sánh \`y = sin x\` vs \`y = 2 sin x\`

<svg viewBox="0 0 600 300" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="So sánh y = sin x (biên độ 1) và y = 2 sin x (biên độ 2) trên [0, 2π]: cùng chu kỳ, cùng điểm qua 0">
  <defs><marker id="w5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="192.1" y1="240.0" x2="192.1" y2="40.0"/>
<line x1="302.9" y1="240.0" x2="302.9" y2="40.0"/>
<line x1="413.8" y1="240.0" x2="413.8" y2="40.0"/>
<line x1="524.7" y1="240.0" x2="524.7" y2="40.0"/>
<line x1="60.0" y1="98.3" x2="560.0" y2="98.3"/>
<line x1="60.0" y1="56.7" x2="560.0" y2="56.7"/>
<line x1="60.0" y1="181.7" x2="560.0" y2="181.7"/>
<line x1="60.0" y1="223.3" x2="560.0" y2="223.3"/>
</g>
  <line x1="54.0" y1="140.0" x2="582.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w5)"/>
  <line x1="81.2" y1="246.0" x2="81.2" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w5)"/>
  <text x="574.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="89.2" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="192.1" y1="136.0" x2="192.1" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="192.1" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="302.9" y1="136.0" x2="302.9" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="302.9" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="413.8" y1="136.0" x2="413.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="413.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">3π/2</text>
  <line x1="524.7" y1="136.0" x2="524.7" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="524.7" y="156.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="77.2" y1="98.3" x2="85.2" y2="98.3" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="102.3" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="77.2" y1="56.7" x2="85.2" y2="56.7" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="60.7" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="77.2" y1="181.7" x2="85.2" y2="181.7" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="185.7" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="77.2" y1="223.3" x2="85.2" y2="223.3" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="227.3" fill="#475569" font-size="11" text-anchor="end">−2</text>
  <path d="M 60.0,152.3 L 61.2,151.6 L 62.5,150.9 L 63.8,150.2 L 65.0,149.5 L 66.2,148.7 L 67.5,148.0 L 68.8,147.3 L 70.0,146.6 L 71.2,145.8 L 72.5,145.1 L 73.8,144.4 L 75.0,143.6 L 76.2,142.9 L 77.5,142.2 L 78.8,141.4 L 80.0,140.7 L 81.2,140.0 L 82.5,139.2 L 83.8,138.5 L 85.0,137.7 L 86.2,137.0 L 87.5,136.3 L 88.8,135.5 L 90.0,134.8 L 91.2,134.1 L 92.5,133.3 L 93.8,132.6 L 95.0,131.9 L 96.2,131.2 L 97.5,130.5 L 98.8,129.7 L 100.0,129.0 L 101.2,128.3 L 102.5,127.6 L 103.8,126.9 L 105.0,126.2 L 106.2,125.5 L 107.5,124.8 L 108.8,124.1 L 110.0,123.5 L 111.2,122.8 L 112.5,122.1 L 113.8,121.4 L 115.0,120.8 L 116.2,120.1 L 117.5,119.5 L 118.8,118.9 L 120.0,118.2 L 121.2,117.6 L 122.5,117.0 L 123.8,116.4 L 125.0,115.8 L 126.2,115.2 L 127.5,114.6 L 128.8,114.0 L 130.0,113.4 L 131.2,112.9 L 132.5,112.3 L 133.8,111.8 L 135.0,111.2 L 136.2,110.7 L 137.5,110.2 L 138.8,109.7 L 140.0,109.2 L 141.2,108.7 L 142.5,108.2 L 143.8,107.7 L 145.0,107.3 L 146.2,106.8 L 147.5,106.4 L 148.8,105.9 L 150.0,105.5 L 151.2,105.1 L 152.5,104.7 L 153.8,104.3 L 155.0,103.9 L 156.2,103.6 L 157.5,103.2 L 158.8,102.9 L 160.0,102.6 L 161.2,102.2 L 162.5,101.9 L 163.8,101.6 L 165.0,101.4 L 166.2,101.1 L 167.5,100.8 L 168.8,100.6 L 170.0,100.4 L 171.2,100.1 L 172.5,99.9 L 173.8,99.7 L 175.0,99.5 L 176.2,99.4 L 177.5,99.2 L 178.8,99.1 L 180.0,98.9 L 181.2,98.8 L 182.5,98.7 L 183.8,98.6 L 185.0,98.5 L 186.2,98.5 L 187.5,98.4 L 188.8,98.4 L 190.0,98.4 L 191.2,98.3 L 192.5,98.3 L 193.8,98.3 L 195.0,98.4 L 196.2,98.4 L 197.5,98.5 L 198.8,98.5 L 200.0,98.6 L 201.2,98.7 L 202.5,98.8 L 203.8,98.9 L 205.0,99.0 L 206.3,99.2 L 207.5,99.3 L 208.8,99.5 L 210.0,99.7 L 211.2,99.9 L 212.5,100.1 L 213.8,100.3 L 215.0,100.5 L 216.2,100.8 L 217.5,101.0 L 218.8,101.3 L 220.0,101.6 L 221.2,101.8 L 222.5,102.1 L 223.8,102.5 L 225.0,102.8 L 226.2,103.1 L 227.5,103.5 L 228.8,103.8 L 230.0,104.2 L 231.2,104.6 L 232.5,105.0 L 233.8,105.4 L 235.0,105.8 L 236.2,106.2 L 237.5,106.7 L 238.8,107.1 L 240.0,107.6 L 241.2,108.0 L 242.5,108.5 L 243.8,109.0 L 245.0,109.5 L 246.3,110.0 L 247.5,110.5 L 248.8,111.1 L 250.0,111.6 L 251.3,112.1 L 252.5,112.7 L 253.8,113.3 L 255.0,113.8 L 256.2,114.4 L 257.5,115.0 L 258.8,115.6 L 260.0,116.2 L 261.2,116.8 L 262.5,117.4 L 263.8,118.0 L 265.0,118.7 L 266.2,119.3 L 267.5,119.9 L 268.8,120.6 L 270.0,121.3 L 271.3,121.9 L 272.5,122.6 L 273.8,123.3 L 275.0,123.9 L 276.3,124.6 L 277.5,125.3 L 278.8,126.0 L 280.0,126.7 L 281.2,127.4 L 282.5,128.1 L 283.8,128.8 L 285.0,129.5 L 286.2,130.2 L 287.5,131.0 L 288.8,131.7 L 290.0,132.4 L 291.2,133.1 L 292.5,133.9 L 293.8,134.6 L 295.0,135.3 L 296.2,136.1 L 297.5,136.8 L 298.8,137.5 L 300.0,138.3 L 301.3,139.0 L 302.5,139.7 L 303.8,140.5 L 305.0,141.2 L 306.2,142.0 L 307.5,142.7 L 308.8,143.4 L 310.0,144.2 L 311.3,144.9 L 312.5,145.6 L 313.8,146.4 L 315.0,147.1 L 316.2,147.8 L 317.5,148.5 L 318.8,149.3 L 320.0,150.0 L 321.2,150.7 L 322.5,151.4 L 323.8,152.1 L 325.0,152.8 L 326.2,153.5 L 327.5,154.2 L 328.8,154.9 L 330.0,155.6 L 331.2,156.3 L 332.5,156.9 L 333.8,157.6 L 335.0,158.3 L 336.3,158.9 L 337.5,159.6 L 338.8,160.2 L 340.0,160.9 L 341.2,161.5 L 342.5,162.1 L 343.8,162.8 L 345.0,163.4 L 346.3,164.0 L 347.5,164.6 L 348.8,165.2 L 350.0,165.8 L 351.2,166.3 L 352.5,166.9 L 353.8,167.5 L 355.0,168.0 L 356.2,168.6 L 357.5,169.1 L 358.8,169.6 L 360.0,170.1 L 361.2,170.6 L 362.5,171.1 L 363.8,171.6 L 365.0,172.1 L 366.2,172.6 L 367.5,173.0 L 368.8,173.5 L 370.0,173.9 L 371.3,174.3 L 372.5,174.7 L 373.8,175.1 L 375.0,175.5 L 376.2,175.9 L 377.5,176.3 L 378.8,176.6 L 380.0,177.0 L 381.2,177.3 L 382.5,177.6 L 383.8,177.9 L 385.0,178.2 L 386.2,178.5 L 387.5,178.8 L 388.8,179.1 L 390.0,179.3 L 391.2,179.6 L 392.5,179.8 L 393.8,180.0 L 395.0,180.2 L 396.3,180.4 L 397.5,180.6 L 398.8,180.7 L 400.0,180.9 L 401.2,181.0 L 402.5,181.1 L 403.8,181.2 L 405.0,181.3 L 406.2,181.4 L 407.5,181.5 L 408.8,181.6 L 410.0,181.6 L 411.2,181.6 L 412.5,181.7 L 413.8,181.7 L 415.0,181.7 L 416.2,181.6 L 417.5,181.6 L 418.8,181.6 L 420.0,181.5 L 421.3,181.4 L 422.5,181.4 L 423.8,181.3 L 425.0,181.1 L 426.2,181.0 L 427.5,180.9 L 428.8,180.7 L 430.0,180.6 L 431.3,180.4 L 432.5,180.2 L 433.8,180.0 L 435.0,179.8 L 436.2,179.6 L 437.5,179.3 L 438.8,179.1 L 440.0,178.8 L 441.2,178.6 L 442.5,178.3 L 443.8,178.0 L 445.0,177.7 L 446.2,177.3 L 447.5,177.0 L 448.8,176.7 L 450.0,176.3 L 451.3,175.9 L 452.5,175.6 L 453.8,175.2 L 455.0,174.8 L 456.2,174.4 L 457.5,173.9 L 458.8,173.5 L 460.0,173.1 L 461.3,172.6 L 462.5,172.1 L 463.8,171.7 L 465.0,171.2 L 466.2,170.7 L 467.5,170.2 L 468.8,169.7 L 470.0,169.2 L 471.2,168.6 L 472.5,168.1 L 473.7,167.5 L 475.0,167.0 L 476.3,166.4 L 477.5,165.8 L 478.8,165.2 L 480.0,164.7 L 481.2,164.1 L 482.5,163.5 L 483.8,162.8 L 485.0,162.2 L 486.3,161.6 L 487.5,161.0 L 488.8,160.3 L 490.0,159.7 L 491.2,159.0 L 492.5,158.4 L 493.8,157.7 L 495.0,157.0 L 496.2,156.3 L 497.5,155.7 L 498.7,155.0 L 500.0,154.3 L 501.3,153.6 L 502.5,152.9 L 503.8,152.2 L 505.0,151.5 L 506.2,150.8 L 507.5,150.1 L 508.8,149.3 L 510.0,148.6 L 511.3,147.9 L 512.5,147.2 L 513.8,146.4 L 515.0,145.7 L 516.2,145.0 L 517.5,144.2 L 518.8,143.5 L 520.0,142.8 L 521.2,142.0 L 522.5,141.3 L 523.8,140.6 L 525.0,139.8 L 526.3,139.1 L 527.5,138.4 L 528.8,137.6 L 530.0,136.9 L 531.2,136.1 L 532.5,135.4 L 533.8,134.7 L 535.0,133.9 L 536.3,133.2 L 537.5,132.5 L 538.8,131.8 L 540.0,131.0 L 541.2,130.3 L 542.5,129.6 L 543.8,128.9 L 545.0,128.2 L 546.2,127.5 L 547.5,126.8 L 548.8,126.1 L 550.0,125.4 L 551.3,124.7 L 552.5,124.0 L 553.8,123.3 L 555.0,122.7 L 556.2,122.0 L 557.5,121.3 L 558.8,120.7 L 560.0,120.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="129.5" y="108.5" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = sin x</text>
  <path d="M 60.0,164.6 L 61.2,163.2 L 62.5,161.8 L 63.8,160.4 L 65.0,158.9 L 66.2,157.5 L 67.5,156.0 L 68.8,154.6 L 70.0,153.1 L 71.2,151.7 L 72.5,150.2 L 73.8,148.8 L 75.0,147.3 L 76.2,145.8 L 77.5,144.3 L 78.8,142.9 L 80.0,141.4 L 81.2,139.9 L 82.5,138.4 L 83.8,137.0 L 85.0,135.5 L 86.2,134.0 L 87.5,132.5 L 88.8,131.1 L 90.0,129.6 L 91.2,128.1 L 92.5,126.7 L 93.8,125.2 L 95.0,123.8 L 96.2,122.3 L 97.5,120.9 L 98.8,119.5 L 100.0,118.0 L 101.2,116.6 L 102.5,115.2 L 103.8,113.8 L 105.0,112.4 L 106.2,111.0 L 107.5,109.6 L 108.8,108.3 L 110.0,106.9 L 111.2,105.6 L 112.5,104.2 L 113.8,102.9 L 115.0,101.6 L 116.2,100.3 L 117.5,99.0 L 118.8,97.7 L 120.0,96.4 L 121.2,95.2 L 122.5,94.0 L 123.8,92.7 L 125.0,91.5 L 126.2,90.3 L 127.5,89.2 L 128.8,88.0 L 130.0,86.8 L 131.2,85.7 L 132.5,84.6 L 133.8,83.5 L 135.0,82.4 L 136.2,81.4 L 137.5,80.3 L 138.8,79.3 L 140.0,78.3 L 141.2,77.3 L 142.5,76.4 L 143.8,75.4 L 145.0,74.5 L 146.2,73.6 L 147.5,72.7 L 148.8,71.9 L 150.0,71.0 L 151.2,70.2 L 152.5,69.4 L 153.8,68.6 L 155.0,67.9 L 156.2,67.2 L 157.5,66.5 L 158.8,65.8 L 160.0,65.1 L 161.2,64.5 L 162.5,63.9 L 163.8,63.3 L 165.0,62.7 L 166.2,62.2 L 167.5,61.7 L 168.8,61.2 L 170.0,60.7 L 171.2,60.3 L 172.5,59.8 L 173.8,59.5 L 175.0,59.1 L 176.2,58.7 L 177.5,58.4 L 178.8,58.1 L 180.0,57.9 L 181.2,57.6 L 182.5,57.4 L 183.8,57.2 L 185.0,57.1 L 186.2,56.9 L 187.5,56.8 L 188.8,56.8 L 190.0,56.7 L 191.2,56.7 L 192.5,56.7 L 193.8,56.7 L 195.0,56.7 L 196.2,56.8 L 197.5,56.9 L 198.8,57.0 L 200.0,57.2 L 201.2,57.4 L 202.5,57.6 L 203.8,57.8 L 205.0,58.1 L 206.3,58.3 L 207.5,58.7 L 208.8,59.0 L 210.0,59.3 L 211.2,59.7 L 212.5,60.1 L 213.8,60.6 L 215.0,61.0 L 216.2,61.5 L 217.5,62.0 L 218.8,62.6 L 220.0,63.1 L 221.2,63.7 L 222.5,64.3 L 223.8,64.9 L 225.0,65.6 L 226.2,66.3 L 227.5,67.0 L 228.8,67.7 L 230.0,68.4 L 231.2,69.2 L 232.5,70.0 L 233.8,70.8 L 235.0,71.6 L 236.2,72.5 L 237.5,73.3 L 238.8,74.2 L 240.0,75.2 L 241.2,76.1 L 242.5,77.1 L 243.8,78.0 L 245.0,79.0 L 246.3,80.0 L 247.5,81.1 L 248.8,82.1 L 250.0,83.2 L 251.3,84.3 L 252.5,85.4 L 253.8,86.5 L 255.0,87.7 L 256.2,88.8 L 257.5,90.0 L 258.8,91.2 L 260.0,92.4 L 261.2,93.6 L 262.5,94.8 L 263.8,96.1 L 265.0,97.3 L 266.2,98.6 L 267.5,99.9 L 268.8,101.2 L 270.0,102.5 L 271.3,103.8 L 272.5,105.2 L 273.8,106.5 L 275.0,107.9 L 276.3,109.2 L 277.5,110.6 L 278.8,112.0 L 280.0,113.4 L 281.2,114.8 L 282.5,116.2 L 283.8,117.6 L 285.0,119.0 L 286.2,120.5 L 287.5,121.9 L 288.8,123.4 L 290.0,124.8 L 291.2,126.3 L 292.5,127.7 L 293.8,129.2 L 295.0,130.6 L 296.2,132.1 L 297.5,133.6 L 298.8,135.1 L 300.0,136.5 L 301.3,138.0 L 302.5,139.5 L 303.8,141.0 L 305.0,142.4 L 306.2,143.9 L 307.5,145.4 L 308.8,146.8 L 310.0,148.3 L 311.3,149.8 L 312.5,151.3 L 313.8,152.7 L 315.0,154.2 L 316.2,155.6 L 317.5,157.1 L 318.8,158.5 L 320.0,159.9 L 321.2,161.4 L 322.5,162.8 L 323.8,164.2 L 325.0,165.6 L 326.2,167.0 L 327.5,168.4 L 328.8,169.8 L 330.0,171.2 L 331.2,172.5 L 332.5,173.9 L 333.8,175.2 L 335.0,176.6 L 336.3,177.9 L 337.5,179.2 L 338.8,180.5 L 340.0,181.8 L 341.2,183.0 L 342.5,184.3 L 343.8,185.5 L 345.0,186.8 L 346.3,188.0 L 347.5,189.2 L 348.8,190.4 L 350.0,191.5 L 351.2,192.7 L 352.5,193.8 L 353.8,194.9 L 355.0,196.0 L 356.2,197.1 L 357.5,198.2 L 358.8,199.2 L 360.0,200.3 L 361.2,201.3 L 362.5,202.3 L 363.8,203.2 L 365.0,204.2 L 366.2,205.1 L 367.5,206.0 L 368.8,206.9 L 370.0,207.8 L 371.3,208.6 L 372.5,209.5 L 373.8,210.3 L 375.0,211.0 L 376.2,211.8 L 377.5,212.5 L 378.8,213.3 L 380.0,213.9 L 381.2,214.6 L 382.5,215.3 L 383.8,215.9 L 385.0,216.5 L 386.2,217.1 L 387.5,217.6 L 388.8,218.1 L 390.0,218.6 L 391.2,219.1 L 392.5,219.6 L 393.8,220.0 L 395.0,220.4 L 396.3,220.8 L 397.5,221.1 L 398.8,221.4 L 400.0,221.7 L 401.2,222.0 L 402.5,222.3 L 403.8,222.5 L 405.0,222.7 L 406.2,222.9 L 407.5,223.0 L 408.8,223.1 L 410.0,223.2 L 411.2,223.3 L 412.5,223.3 L 413.8,223.3 L 415.0,223.3 L 416.2,223.3 L 417.5,223.2 L 418.8,223.1 L 420.0,223.0 L 421.3,222.9 L 422.5,222.7 L 423.8,222.5 L 425.0,222.3 L 426.2,222.0 L 427.5,221.8 L 428.8,221.5 L 430.0,221.2 L 431.3,220.8 L 432.5,220.4 L 433.8,220.0 L 435.0,219.6 L 436.2,219.2 L 437.5,218.7 L 438.8,218.2 L 440.0,217.7 L 441.2,217.1 L 442.5,216.6 L 443.8,216.0 L 445.0,215.3 L 446.2,214.7 L 447.5,214.0 L 448.8,213.3 L 450.0,212.6 L 451.3,211.9 L 452.5,211.1 L 453.8,210.4 L 455.0,209.6 L 456.2,208.7 L 457.5,207.9 L 458.8,207.0 L 460.0,206.1 L 461.3,205.2 L 462.5,204.3 L 463.8,203.3 L 465.0,202.4 L 466.2,201.4 L 467.5,200.4 L 468.8,199.4 L 470.0,198.3 L 471.2,197.2 L 472.5,196.2 L 473.7,195.1 L 475.0,193.9 L 476.3,192.8 L 477.5,191.7 L 478.8,190.5 L 480.0,189.3 L 481.2,188.1 L 482.5,186.9 L 483.8,185.7 L 485.0,184.4 L 486.3,183.2 L 487.5,181.9 L 488.8,180.6 L 490.0,179.3 L 491.2,178.0 L 492.5,176.7 L 493.8,175.4 L 495.0,174.0 L 496.2,172.7 L 497.5,171.3 L 498.7,170.0 L 500.0,168.6 L 501.3,167.2 L 502.5,165.8 L 503.8,164.4 L 505.0,163.0 L 506.2,161.5 L 507.5,160.1 L 508.8,158.7 L 510.0,157.2 L 511.3,155.8 L 512.5,154.3 L 513.8,152.9 L 515.0,151.4 L 516.2,150.0 L 517.5,148.5 L 518.8,147.0 L 520.0,145.6 L 521.2,144.1 L 522.5,142.6 L 523.8,141.1 L 525.0,139.7 L 526.3,138.2 L 527.5,136.7 L 528.8,135.2 L 530.0,133.8 L 531.2,132.3 L 532.5,130.8 L 533.8,129.4 L 535.0,127.9 L 536.3,126.4 L 537.5,125.0 L 538.8,123.5 L 540.0,122.1 L 541.2,120.6 L 542.5,119.2 L 543.8,117.8 L 545.0,116.4 L 546.2,115.0 L 547.5,113.6 L 548.8,112.2 L 550.0,110.8 L 551.3,109.4 L 552.5,108.0 L 553.8,106.7 L 555.0,105.3 L 556.2,104.0 L 557.5,102.7 L 558.8,101.3 L 560.0,100.0" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <text x="175.4" y="52.9" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">y = 2 sin x</text>
  <text x="300.0" y="270.0" fill="#475569" font-size="11" text-anchor="middle">nhân biên độ chỉ kéo giãn theo chiều dọc: đỉnh 1 → 2, đáy −1 → −2; các điểm qua 0 không đổi</text>
</svg>

Quan sát: cả hai cắt Ox tại cùng các điểm ($0, \\pi, 2\\pi$). Khác duy nhất là **chiều cao**.

> ⚠ **Lỗi thường gặp**: nghĩ rằng "biên độ luôn dương — nếu $A = -3$ thì biên độ là $-3$". **Sai**. Biên độ là một số dương ($|A|$). Dấu của $A$ chỉ kiểm soát việc lật ngược, không đổi biên độ.

**📝 Tóm tắt mục 5**:

- Hệ số $A$ trong $y = A \\cdot \\sin x$ điều khiển **biên độ** $= |A|$.
- $A < 0$: lật ngược qua trục Ox.
- Range: $[-|A|, |A|]$. Chu kỳ và các điểm 0 không đổi.

---

## 6. Chu kỳ — hệ số \`B\`

### 6.1. Phương trình \`y = sin(B · x)\`

> 💡 **Trực giác**: $B$ nhân vào $x$ = **đếm vòng quay nhanh hơn $B$ lần**. Cùng quãng đường $x$, điểm trên đường tròn quay được $B$ lần nhiều hơn → đồ thị **gọn lại theo chiều ngang** với hệ số $\\frac{1}{|B|}$.

**Định nghĩa**: với $y = \\sin(Bx)$ ($B > 0$):

- **Chu kỳ** mới $= T = \\frac{2\\pi}{|B|}$.
- **Tần số** (số chu kỳ trên 1 đơn vị x) $= f = \\frac{B}{2\\pi}$.
- **Biên độ** vẫn $= 1$.

**Vì sao**: ta cần tìm $T$ nhỏ nhất sao cho $\\sin(B(x + T)) = \\sin(Bx)$, tức $B \\cdot T = 2\\pi \\to T = \\frac{2\\pi}{B}$.

### 6.2. Bốn ví dụ walk-through

**Ví dụ 1**: $y = \\sin(2x)$. $B = 2$ → chu kỳ $T = \\frac{2\\pi}{2} = \\pi$. Tần số gấp đôi $\\sin x$.

Verify: tại $x = \\frac{\\pi}{2}$, $\\sin(2 \\cdot \\frac{\\pi}{2}) = \\sin(\\pi) = 0$. Tại $x = \\frac{\\pi}{4}$, $\\sin(2 \\cdot \\frac{\\pi}{4}) = \\sin(\\frac{\\pi}{2}) = 1$ (đỉnh). Vậy trong đoạn $[0, \\pi]$, đồ thị $\\sin(2x)$ đã hoàn thành **1 chu kỳ đầy đủ**, trong khi $\\sin x$ mới đi được nửa chu kỳ.

| x | 2x | sin(2x) |
|---:|---:|---:|
| $0$ | $0$ | $0$ |
| $\\frac{\\pi}{4}$ | $\\frac{\\pi}{2}$ | $1$ (đỉnh) |
| $\\frac{\\pi}{2}$ | $\\pi$ | $0$ |
| $\\frac{3\\pi}{4}$ | $\\frac{3\\pi}{2}$ | $-1$ (đáy) |
| $\\pi$ | $2\\pi$ | $0$ (hết 1 chu kỳ) |

**Ví dụ 2**: $y = \\sin(\\frac{x}{2})$. $B = \\frac{1}{2}$ → $T = \\frac{2\\pi}{1/2} = 4\\pi$. Đồ thị **giãn ra**, chu kỳ dài gấp đôi.

| x | x/2 | sin(x/2) |
|---:|---:|---:|
| $0$ | $0$ | $0$ |
| $\\pi$ | $\\frac{\\pi}{2}$ | $1$ (đỉnh) |
| $2\\pi$ | $\\pi$ | $0$ |
| $3\\pi$ | $\\frac{3\\pi}{2}$ | $-1$ (đáy) |
| $4\\pi$ | $2\\pi$ | $0$ (hết 1 chu kỳ) |

**Ví dụ 3**: $y = \\sin(\\pi x)$. $B = \\pi$ → $T = \\frac{2\\pi}{\\pi} = 2$. Chu kỳ chỉ 2 đơn vị (rất ngắn so với $2\\pi \\approx 6.28$).

| $x$ | $\\pi x$ | $\\sin(\\pi x)$ |
|---:|---:|---:|
| $0$ | $0$ | $0$ |
| $0.5$ | $\\frac{\\pi}{2}$ | $1$ |
| $1$ | $\\pi$ | $0$ |
| $1.5$ | $\\frac{3\\pi}{2}$ | $-1$ |
| $2$ | $2\\pi$ | $0$ |

**Ví dụ 4**: $y = \\sin(100x)$. $B = 100$ → $T = \\frac{2\\pi}{100} \\approx 0.0628$. Đồ thị **dao động cực nhanh** — trong 1 đơn vị có gần 16 chu kỳ. Dùng cho mô phỏng dao động cao tần (vd sóng radio).

### 6.3. Bảng tổng hợp

| Phương trình | $B$ | Chu kỳ $T = \\frac{2\\pi}{B}$ | Tần số $f = \\frac{B}{2\\pi}$ | Quan sát |
|---|---:|---:|---:|---|
| $\\sin x$ | $1$ | $2\\pi \\approx 6.28$ | $\\frac{1}{2\\pi} \\approx 0.159$ | chuẩn |
| $\\sin(2x)$ | $2$ | $\\pi \\approx 3.14$ | $\\frac{1}{\\pi} \\approx 0.318$ | nhanh gấp đôi |
| $\\sin(\\frac{x}{2})$ | $0.5$ | $4\\pi \\approx 12.57$ | $\\frac{1}{4\\pi} \\approx 0.080$ | chậm một nửa |
| $\\sin(\\pi x)$ | $\\pi$ | $2$ | $\\frac{1}{2} = 0.5$ | 0.5 chu kỳ/đv |
| $\\sin(100x)$ | $100$ | $\\frac{\\pi}{50} \\approx 0.063$ | $\\frac{50}{\\pi} \\approx 15.9$ | cao tần |

> ⚠ **Lỗi thường gặp**: nhầm $T = 2\\pi \\cdot B$ (đúng là $T = \\frac{2\\pi}{B}$). Nhớ: $B$ to → quay nhanh → $T$ ngắn → **chia**, không nhân.

**📝 Tóm tắt mục 6**:

- $B$ trong $y = \\sin(Bx)$ điều khiển **tốc độ quay**: chu kỳ $T = \\frac{2\\pi}{|B|}$.
- $B$ to → chu kỳ ngắn → đồ thị "co" ngang.
- $B$ nhỏ → chu kỳ dài → đồ thị "giãn" ngang.

---

## 7. Pha (phase shift) — hằng số \`C\`

### 7.1. Phương trình \`y = sin(Bx + C)\`

> 💡 **Trực giác**: cộng hằng số $C$ vào bên trong sin = **dịch ngang đồ thị**. Cụ thể: $\\sin(Bx + C) = \\sin(B(x + \\frac{C}{B}))$ — dịch **sang trái** một lượng $\\frac{C}{B}$ (nếu $C > 0$).

**Lưu ý quan trọng**: dịch là theo $\\frac{C}{B}$, KHÔNG phải theo $C$. Vì sao? Vì để dịch ngang một hàm $f(x)$ sang trái $h$, ta thay $x$ bởi $x + h$, ra $f(x + h)$. Ở đây hàm cốt là $\\sin(Bu)$, dịch sang trái $h$ thành $\\sin(B(x + h)) = \\sin(Bx + Bh)$. So sánh với $\\sin(Bx + C)$: $Bh = C \\to h = \\frac{C}{B}$.

### 7.2. Bốn ví dụ walk-through

**Ví dụ 1**: $y = \\sin(x + \\frac{\\pi}{2})$. $B = 1$, $C = \\frac{\\pi}{2}$ → dịch trái $\\frac{C}{B} = \\frac{\\pi}{2}$.

Verify: tại $x = -\\frac{\\pi}{2}$, $\\sin(-\\frac{\\pi}{2} + \\frac{\\pi}{2}) = \\sin(0) = 0$ (giống $\\sin x$ tại $x = 0$). Tại $x = 0$, $\\sin(\\frac{\\pi}{2}) = 1$ (đỉnh). Đồ thị có đỉnh tại gốc — đúng là **đồ thị cos**!

Tức $\\sin(x + \\frac{\\pi}{2}) = \\cos x$ (đồng nhất thức đã chứng minh ở mục 3).

**Ví dụ 2**: $y = \\sin(x - \\frac{\\pi}{4})$. $B = 1$, $C = -\\frac{\\pi}{4}$ → dịch trái $\\frac{C}{B} = -\\frac{\\pi}{4}$ = **dịch phải $\\frac{\\pi}{4}$**.

| $x$ | $x - \\frac{\\pi}{4}$ | $\\sin(x - \\frac{\\pi}{4})$ |
|---:|---:|---:|
| $\\frac{\\pi}{4}$ | $0$ | $0$ (giống $\\sin$ tại 0) |
| $\\frac{3\\pi}{4}$ | $\\frac{\\pi}{2}$ | $1$ (đỉnh — chậm hơn sin chuẩn $\\frac{\\pi}{4}$) |

**Ví dụ 3**: $y = \\sin(2x + \\pi)$. $B = 2$, $C = \\pi$. Dịch trái $\\frac{C}{B} = \\frac{\\pi}{2}$.

Sai lầm phổ biến: tưởng dịch trái $\\pi$ (theo $C$). Đúng là $\\frac{\\pi}{2}$ (theo $\\frac{C}{B}$). Verify: tại $x = -\\frac{\\pi}{2}$, $\\sin(2 \\cdot (-\\frac{\\pi}{2}) + \\pi) = \\sin(0) = 0$. So với $\\sin(2x)$ tại $x = 0$ cũng $= 0$. Khớp — đồ thị bị dịch trái $\\frac{\\pi}{2}$. ✓

**Ví dụ 4**: $y = \\sin(3x + \\frac{\\pi}{4})$. $B = 3$, $C = \\frac{\\pi}{4}$. Dịch trái $\\frac{\\pi}{12}$. (Nhỏ hơn pha vì $B$ lớn nén ngang.)

> ⚠ **Lỗi thường gặp** (rất nghiêm trọng): dịch theo $C$ thay vì $\\frac{C}{B}$. Ví dụ kinh điển: $\\sin(2x + \\pi)$ không phải dịch trái $\\pi$, mà là dịch trái $\\frac{\\pi}{2}$. Luôn phải **chia cho $B$** trước khi đọc pha.

> 🔁 **Dừng lại tự kiểm tra**:
> - $y = \\sin(4x - \\pi)$ dịch ngang bao nhiêu?
>   <details><summary>Đáp</summary>$C = -\\pi$, $B = 4$. $\\frac{C}{B} = -\\frac{\\pi}{4}$. Dịch sang **phải** $\\frac{\\pi}{4}$.</details>
> - $y = \\cos x$ viết được dưới dạng $\\sin(x + C)$ với $C = ?$
>   <details><summary>Đáp</summary>$C = \\frac{\\pi}{2}$. Vì $\\cos x = \\sin(x + \\frac{\\pi}{2})$.</details>

**📝 Tóm tắt mục 7**:

- $C$ trong $y = \\sin(Bx + C)$ điều khiển **pha**: dịch trái $\\frac{C}{B}$ đơn vị (nếu $C > 0$); dịch phải $|\\frac{C}{B}|$ nếu $C < 0$.
- Luôn **chia cho $B$** để tính lượng dịch — không dùng trực tiếp $C$.

---

## 8. Dịch dọc (vertical shift) — hằng số \`D\`

### 8.1. Phương trình \`y = sin x + D\`

> 💡 **Trực giác**: cộng $D$ ngoài hàm sin = **dời toàn bộ đồ thị lên/xuống** $D$ đơn vị. Trục trung bình (đường tâm sóng) không còn là $y = 0$ nữa, mà là $y = D$.

**Định nghĩa**:

- **Trục trung bình**: $y = D$.
- **Range** mới: $[D - |A|, D + |A|]$ (với phương trình tổng quát $A\\sin(Bx + C) + D$).
- Biên độ, chu kỳ, pha **không đổi**.

### 8.2. Bốn ví dụ

| Phương trình | Trục trung bình | Range |
|---|---:|---:|
| $y = \\sin x$ | $y = 0$ | $[-1, 1]$ |
| $y = \\sin x + 1$ | $y = 1$ | $[0, 2]$ |
| $y = \\sin x - 3$ | $y = -3$ | $[-4, -2]$ |
| $y = 2\\sin x + 5$ | $y = 5$ | $[3, 7]$ |
| $y = 0.5\\sin x + 0.5$ | $y = 0.5$ | $[0, 1]$ (giống xác suất!) |

Ví dụ cuối thú vị: $0.5\\sin x + 0.5$ luôn nằm trong $[0, 1]$ — đôi khi dùng làm "xung dao động đại diện xác suất" trong simulation.

**📝 Tóm tắt mục 8**:

- $D$ dịch toàn bộ đồ thị lên $D$ đơn vị (xuống nếu âm).
- Range mới: $[D - |A|, D + |A|]$.

---

## 9. Phương trình tổng quát \`y = A · sin(B · x + C) + D\`

### 9.1. Bảng tổng hợp 4 tham số

| Tham số | Ý nghĩa | Công thức liên quan |
|---|---|---|
| $A$ | Biên độ | Biên độ $= |A|$. $A < 0$: lật. |
| $B$ | Tần số góc (angular frequency) | Chu kỳ $T = \\frac{2\\pi}{|B|}$, tần số $f = \\frac{1}{T} = \\frac{|B|}{2\\pi}$. |
| $C$ | Pha | Dịch ngang $-\\frac{C}{B}$ (trái nếu $C > 0$). |
| $D$ | Dịch dọc / offset | Trục trung bình $y = D$. Range $[D-|A|, D+|A|]$. |

### 9.2. Walk-through phân tích 4 phương trình cụ thể

**Phân tích 1**: $y = 3\\sin(2x - \\frac{\\pi}{3}) + 1$.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| $A$ | $3$ | Biên độ $= 3$, không lật |
| $B$ | $2$ | Chu kỳ $= \\frac{2\\pi}{2} = \\pi$ |
| $C$ | $-\\frac{\\pi}{3}$ | Pha dịch ngang $= -\\frac{C}{B} = \\frac{\\pi}{6}$ → dịch **phải** $\\frac{\\pi}{6}$ |
| $D$ | $1$ | Trục trung bình $y = 1$, range $[1-3, 1+3] = [-2, 4]$ |

**Phân tích 2**: $y = -2\\sin(\\pi x) + 5$.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| $A$ | $-2$ | Biên độ $= 2$, **lật ngược** |
| $B$ | $\\pi$ | Chu kỳ $= \\frac{2\\pi}{\\pi} = 2$ |
| $C$ | $0$ | Không dịch ngang |
| $D$ | $5$ | Trục $y = 5$, range $[3, 7]$ |

**Phân tích 3**: $y = 0.5\\sin(0.5x + \\frac{\\pi}{4}) - 1$.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| $A$ | $0.5$ | Biên độ $= 0.5$ |
| $B$ | $0.5$ | Chu kỳ $= \\frac{2\\pi}{0.5} = 4\\pi$ |
| $C$ | $\\frac{\\pi}{4}$ | Dịch trái $\\frac{\\pi/4}{0.5} = \\frac{\\pi}{2}$ |
| $D$ | $-1$ | Trục $y = -1$, range $[-1.5, -0.5]$ |

**Phân tích 4**: $y = 220\\sin(100\\pi \\cdot t)$. (Mô phỏng điện AC Việt Nam — sẽ thảo luận ở mục 10.)

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| $A$ | $220$ | Biên độ 220V |
| $B$ | $100\\pi$ | Chu kỳ $= \\frac{2\\pi}{100\\pi} = 0.02s = 20ms$ |
| $C$ | $0$ | Không pha |
| $D$ | $0$ | Không offset |

Tần số: $f = \\frac{1}{T} = \\frac{1}{0.02} = 50$ Hz. Đó chính là **50 Hz lưới điện Việt Nam**.

**📝 Tóm tắt mục 9**:

- 4 tham số $A, B, C, D$ điều khiển 4 chiều biến đổi độc lập.
- Mẹo nhớ: đọc theo thứ tự "biên độ → chu kỳ → pha → offset". Pha luôn chia $B$.

---

## 10. Tần số và chu kỳ — đơn vị và ứng dụng

### 10.1. Ba khái niệm: chu kỳ, tần số, tần số góc

| Đại lượng | Ký hiệu | Đơn vị | Công thức |
|---|---:|---|---|
| Chu kỳ | $T$ | giây (s), radian | $T = \\frac{2\\pi}{B}$ |
| Tần số | $f$ | Hz (= 1/s) | $f = \\frac{1}{T} = \\frac{B}{2\\pi}$ |
| Tần số góc | $\\omega$ | rad/s | $\\omega = B = 2\\pi f$ |

> 💡 **Trực giác**: "Chu kỳ" là thời gian quay 1 vòng. "Tần số" là số vòng/giây. "Tần số góc" là số radian/giây — vì 1 vòng $= 2\\pi$ rad, ta có $\\omega = 2\\pi \\cdot f$.

### 10.2. Ví dụ: điện AC

Điện gia dụng Việt Nam: tần số $f = 50$ Hz, điện áp hiệu dụng 220V (đỉnh $\\approx 311$V).

- Tần số góc: $\\omega = 2\\pi f = 100\\pi \\approx 314.16$ rad/s.
- Chu kỳ: $T = \\frac{1}{f} = \\frac{1}{50} = 0.02$ s $= 20$ ms.
- Phương trình điện áp đỉnh-đỉnh: $V(t) = 311 \\cdot \\sin(100\\pi \\cdot t)$ (giả sử pha 0).

(Lưu ý: 220V là **giá trị hiệu dụng RMS**, đỉnh $= 220\\sqrt{2} \\approx 311$V. Trong các bài tập đơn giản hóa ta vẫn dùng 220 cho gọn.)

### 10.3. Ví dụ: âm thanh

Một nốt nhạc **La (A4)** = 440 Hz. Sóng âm dạng:

$$p(t) = A \\cdot \\sin(2\\pi \\cdot 440 \\cdot t)$$

Chu kỳ $T = \\frac{1}{440} \\approx 2.27$ ms. Tần số góc $\\omega = 880\\pi \\approx 2765$ rad/s.

Tai người nghe được dải $20$ Hz $-$ $20$ kHz. Mỗi nhạc cụ có một bộ "**hài (harmonics)**" riêng — tức ngoài tần số chính $f_0$, còn có các tần số phụ $2f_0, 3f_0, 4f_0, \\ldots$ với biên độ khác nhau. Đó là vì sao đàn piano và violin chơi cùng nốt La nhưng nghe khác — khác về thành phần hài.

**📝 Tóm tắt mục 10**:

- $T$, $f$, $\\omega$ là 3 cách diễn đạt cùng một thông tin — biết một suy ra hai cái còn lại.
- Lưới điện Việt Nam: 50 Hz, $T = 20$ ms, $\\omega = 100\\pi$ rad/s.
- Âm thanh: nốt La = 440 Hz.

---

## 11. Preview chuỗi Fourier — vì sao sin/cos là "viên gạch" của mọi tín hiệu

> 💡 **Tuyên bố lớn** (sẽ chứng minh ở Tầng 4–5): **mọi tín hiệu tuần hoàn** (và rất nhiều tín hiệu phi-tuần hoàn) **đều phân tích được thành tổng các sóng sin/cos** với các tần số khác nhau. Đây là **chuỗi Fourier** (cho tuần hoàn) hoặc **biến đổi Fourier** (cho phi-tuần hoàn).

### 11.1. Walk-through: xấp xỉ sóng vuông

Sóng vuông (square wave) là tín hiệu bật/tắt — nhảy giữa \`+1\` và \`-1\` lặp lại. Trông như răng cưa hình chữ nhật:

<svg viewBox="0 0 640 220" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Sóng vuông chu kỳ 2π: bằng +1 trên (0, π), −1 trên (π, 2π), lặp lại tới 4π">
  <defs><marker id="w6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="201.2" y1="240.0" x2="201.2" y2="40.0"/>
<line x1="330.0" y1="240.0" x2="330.0" y2="40.0"/>
<line x1="458.8" y1="240.0" x2="458.8" y2="40.0"/>
<line x1="587.7" y1="240.0" x2="587.7" y2="40.0"/>
<line x1="60.0" y1="73.3" x2="600.0" y2="73.3"/>
<line x1="60.0" y1="206.7" x2="600.0" y2="206.7"/>
</g>
  <line x1="54.0" y1="140.0" x2="622.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w6)"/>
  <line x1="72.3" y1="246.0" x2="72.3" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w6)"/>
  <text x="614.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="80.3" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="201.2" y1="136.0" x2="201.2" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="201.2" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="330.0" y1="136.0" x2="330.0" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="156.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="458.8" y1="136.0" x2="458.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="458.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">3π</text>
  <line x1="587.7" y1="136.0" x2="587.7" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="587.7" y="156.0" fill="#475569" font-size="11" text-anchor="middle">4π</text>
  <line x1="68.3" y1="73.3" x2="76.3" y2="73.3" stroke="#1a202c" stroke-width="1.5"/>
  <text x="65.3" y="77.3" fill="#475569" font-size="11" text-anchor="end">+1</text>
  <line x1="68.3" y1="206.7" x2="76.3" y2="206.7" stroke="#1a202c" stroke-width="1.5"/>
  <text x="65.3" y="210.7" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 60.0,206.7 L 61.4,206.7 L 62.7,206.7 L 64.1,206.7 L 65.4,206.7 L 66.8,206.7 L 68.1,206.7 L 69.5,206.7 L 70.8,206.7 L 72.2,206.7 L 73.5,73.3 L 74.9,73.3 L 76.2,73.3 L 77.6,73.3 L 78.9,73.3 L 80.2,73.3 L 81.6,73.3 L 83.0,73.3 L 84.3,73.3 L 85.7,73.3 L 87.0,73.3 L 88.4,73.3 L 89.7,73.3 L 91.1,73.3 L 92.4,73.3 L 93.8,73.3 L 95.1,73.3 L 96.5,73.3 L 97.8,73.3 L 99.2,73.3 L 100.5,73.3 L 101.9,73.3 L 103.2,73.3 L 104.5,73.3 L 105.9,73.3 L 107.2,73.3 L 108.6,73.3 L 110.0,73.3 L 111.3,73.3 L 112.6,73.3 L 114.0,73.3 L 115.3,73.3 L 116.7,73.3 L 118.1,73.3 L 119.4,73.3 L 120.8,73.3 L 122.1,73.3 L 123.5,73.3 L 124.8,73.3 L 126.2,73.3 L 127.5,73.3 L 128.9,73.3 L 130.2,73.3 L 131.6,73.3 L 132.9,73.3 L 134.2,73.3 L 135.6,73.3 L 136.9,73.3 L 138.3,73.3 L 139.7,73.3 L 141.0,73.3 L 142.3,73.3 L 143.7,73.3 L 145.1,73.3 L 146.4,73.3 L 147.8,73.3 L 149.1,73.3 L 150.4,73.3 L 151.8,73.3 L 153.1,73.3 L 154.5,73.3 L 155.9,73.3 L 157.2,73.3 L 158.6,73.3 L 159.9,73.3 L 161.2,73.3 L 162.6,73.3 L 163.9,73.3 L 165.3,73.3 L 166.7,73.3 L 168.0,73.3 L 169.4,73.3 L 170.7,73.3 L 172.1,73.3 L 173.4,73.3 L 174.8,73.3 L 176.1,73.3 L 177.5,73.3 L 178.8,73.3 L 180.2,73.3 L 181.5,73.3 L 182.8,73.3 L 184.2,73.3 L 185.6,73.3 L 186.9,73.3 L 188.2,73.3 L 189.6,73.3 L 191.0,73.3 L 192.3,73.3 L 193.7,73.3 L 195.0,73.3 L 196.4,73.3 L 197.7,73.3 L 199.1,73.3 L 200.4,73.3 L 201.8,206.7 L 203.1,206.7 L 204.5,206.7 L 205.8,206.7 L 207.2,206.7 L 208.5,206.7 L 209.9,206.7 L 211.2,206.7 L 212.6,206.7 L 213.9,206.7 L 215.2,206.7 L 216.6,206.7 L 217.9,206.7 L 219.3,206.7 L 220.7,206.7 L 222.0,206.7 L 223.4,206.7 L 224.7,206.7 L 226.1,206.7 L 227.4,206.7 L 228.8,206.7 L 230.1,206.7 L 231.5,206.7 L 232.8,206.7 L 234.2,206.7 L 235.5,206.7 L 236.9,206.7 L 238.2,206.7 L 239.6,206.7 L 240.9,206.7 L 242.2,206.7 L 243.6,206.7 L 244.9,206.7 L 246.3,206.7 L 247.7,206.7 L 249.0,206.7 L 250.4,206.7 L 251.7,206.7 L 253.1,206.7 L 254.4,206.7 L 255.8,206.7 L 257.1,206.7 L 258.4,206.7 L 259.8,206.7 L 261.2,206.7 L 262.5,206.7 L 263.9,206.7 L 265.2,206.7 L 266.6,206.7 L 267.9,206.7 L 269.2,206.7 L 270.6,206.7 L 271.9,206.7 L 273.3,206.7 L 274.6,206.7 L 276.0,206.7 L 277.4,206.7 L 278.7,206.7 L 280.0,206.7 L 281.4,206.7 L 282.8,206.7 L 284.1,206.7 L 285.5,206.7 L 286.8,206.7 L 288.1,206.7 L 289.5,206.7 L 290.9,206.7 L 292.2,206.7 L 293.6,206.7 L 294.9,206.7 L 296.2,206.7 L 297.6,206.7 L 298.9,206.7 L 300.3,206.7 L 301.7,206.7 L 303.0,206.7 L 304.4,206.7 L 305.7,206.7 L 307.1,206.7 L 308.4,206.7 L 309.8,206.7 L 311.1,206.7 L 312.5,206.7 L 313.8,206.7 L 315.1,206.7 L 316.5,206.7 L 317.9,206.7 L 319.2,206.7 L 320.6,206.7 L 321.9,206.7 L 323.2,206.7 L 324.6,206.7 L 325.9,206.7 L 327.3,206.7 L 328.7,206.7 L 330.0,73.3 L 331.4,73.3 L 332.7,73.3 L 334.1,73.3 L 335.4,73.3 L 336.8,73.3 L 338.1,73.3 L 339.4,73.3 L 340.8,73.3 L 342.2,73.3 L 343.5,73.3 L 344.9,73.3 L 346.2,73.3 L 347.6,73.3 L 348.9,73.3 L 350.2,73.3 L 351.6,73.3 L 352.9,73.3 L 354.3,73.3 L 355.7,73.3 L 357.0,73.3 L 358.4,73.3 L 359.7,73.3 L 361.1,73.3 L 362.4,73.3 L 363.8,73.3 L 365.1,73.3 L 366.4,73.3 L 367.8,73.3 L 369.2,73.3 L 370.5,73.3 L 371.9,73.3 L 373.2,73.3 L 374.6,73.3 L 375.9,73.3 L 377.2,73.3 L 378.6,73.3 L 379.9,73.3 L 381.3,73.3 L 382.7,73.3 L 384.0,73.3 L 385.4,73.3 L 386.7,73.3 L 388.1,73.3 L 389.4,73.3 L 390.8,73.3 L 392.1,73.3 L 393.4,73.3 L 394.8,73.3 L 396.1,73.3 L 397.5,73.3 L 398.9,73.3 L 400.2,73.3 L 401.6,73.3 L 402.9,73.3 L 404.2,73.3 L 405.6,73.3 L 406.9,73.3 L 408.3,73.3 L 409.6,73.3 L 411.0,73.3 L 412.3,73.3 L 413.7,73.3 L 415.0,73.3 L 416.4,73.3 L 417.8,73.3 L 419.1,73.3 L 420.4,73.3 L 421.8,73.3 L 423.1,73.3 L 424.5,73.3 L 425.8,73.3 L 427.2,73.3 L 428.5,73.3 L 429.9,73.3 L 431.2,73.3 L 432.6,73.3 L 433.9,73.3 L 435.3,73.3 L 436.7,73.3 L 438.0,73.3 L 439.3,73.3 L 440.7,73.3 L 442.1,73.3 L 443.4,73.3 L 444.8,73.3 L 446.1,73.3 L 447.4,73.3 L 448.8,73.3 L 450.1,73.3 L 451.5,73.3 L 452.8,73.3 L 454.2,73.3 L 455.6,73.3 L 456.9,73.3 L 458.2,73.3 L 459.6,206.7 L 460.9,206.7 L 462.3,206.7 L 463.6,206.7 L 465.0,206.7 L 466.3,206.7 L 467.7,206.7 L 469.0,206.7 L 470.4,206.7 L 471.8,206.7 L 473.1,206.7 L 474.4,206.7 L 475.8,206.7 L 477.2,206.7 L 478.5,206.7 L 479.9,206.7 L 481.2,206.7 L 482.5,206.7 L 483.9,206.7 L 485.2,206.7 L 486.6,206.7 L 487.9,206.7 L 489.3,206.7 L 490.6,206.7 L 492.0,206.7 L 493.4,206.7 L 494.7,206.7 L 496.1,206.7 L 497.4,206.7 L 498.7,206.7 L 500.1,206.7 L 501.4,206.7 L 502.8,206.7 L 504.1,206.7 L 505.5,206.7 L 506.8,206.7 L 508.2,206.7 L 509.5,206.7 L 510.9,206.7 L 512.2,206.7 L 513.6,206.7 L 514.9,206.7 L 516.3,206.7 L 517.6,206.7 L 519.0,206.7 L 520.3,206.7 L 521.7,206.7 L 523.0,206.7 L 524.4,206.7 L 525.7,206.7 L 527.1,206.7 L 528.5,206.7 L 529.8,206.7 L 531.1,206.7 L 532.5,206.7 L 533.8,206.7 L 535.2,206.7 L 536.5,206.7 L 537.9,206.7 L 539.2,206.7 L 540.6,206.7 L 541.9,206.7 L 543.3,206.7 L 544.6,206.7 L 546.0,206.7 L 547.4,206.7 L 548.7,206.7 L 550.0,206.7 L 551.4,206.7 L 552.7,206.7 L 554.1,206.7 L 555.4,206.7 L 556.8,206.7 L 558.1,206.7 L 559.5,206.7 L 560.8,206.7 L 562.2,206.7 L 563.5,206.7 L 564.9,206.7 L 566.2,206.7 L 567.6,206.7 L 568.9,206.7 L 570.3,206.7 L 571.6,206.7 L 573.0,206.7 L 574.4,206.7 L 575.7,206.7 L 577.0,206.7 L 578.4,206.7 L 579.8,206.7 L 581.1,206.7 L 582.4,206.7 L 583.8,206.7 L 585.1,206.7 L 586.5,206.7 L 587.8,73.3 L 589.2,73.3 L 590.5,73.3 L 591.9,73.3 L 593.2,73.3 L 594.6,73.3 L 595.9,73.3 L 597.3,73.3 L 598.6,73.3 L 600.0,73.3" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="320.0" y="190.0" fill="#475569" font-size="11" text-anchor="middle">hàm nhảy bậc: +1 rồi −1, không có đoạn cong</text>
</svg>

Câu hỏi: làm sao "ghép" được đường thẳng và góc vuông như thế này từ những đường sin **trơn tru**?

**Công thức** (sẽ chứng minh ở Tầng 4):

$$\\text{square}(x) \\approx \\frac{4}{\\pi} \\cdot \\left[\\sin(x) + \\frac{\\sin(3x)}{3} + \\frac{\\sin(5x)}{5} + \\frac{\\sin(7x)}{7} + \\ldots\\right]$$

Tức cộng sin của các tần số **lẻ** (1, 3, 5, 7, ...) với biên độ giảm dần ($1, \\frac{1}{3}, \\frac{1}{5}, \\frac{1}{7}$).

**Walk-through bằng số tại $x = \\frac{\\pi}{2}$** (sóng vuông ở giá trị $+1$ ở đây):

- $\\sin(\\frac{\\pi}{2}) = 1$.
- $\\frac{\\sin(3\\pi/2)}{3} = -\\frac{1}{3} \\approx -0.333$.
- $\\frac{\\sin(5\\pi/2)}{5} = \\frac{1}{5} = 0.2$.
- $\\frac{\\sin(7\\pi/2)}{7} = -\\frac{1}{7} \\approx -0.143$.
- $\\frac{\\sin(9\\pi/2)}{9} = \\frac{1}{9} \\approx 0.111$.
- ...

Tổng 5 số hạng: $1 - 0.333 + 0.2 - 0.143 + 0.111 \\approx 0.835$. Nhân $\\frac{4}{\\pi}$: $0.835 \\cdot 1.273 \\approx 1.063$. Khá gần $+1$.

Tổng 100 số hạng cho gần $+1.000$. Tổng **vô hạn** cho **đúng** $+1$ (nhưng có hiện tượng Gibbs ở các "góc nhảy" — sẽ học sau).

**So sánh bằng hình** (vẽ từ công thức):

<svg viewBox="0 0 660 175" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tổng Fourier sin x + sin 3x/3 + sin 5x/5 + … với n = 1, 2, 10, 50: càng nhiều hạng càng gần sóng vuông, xuất hiện gợn Gibbs ở mép">
  <defs><marker id="fp0" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="fp160" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="fp320" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="fp480" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="90.0" y="16.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">n = 1: sin x</text>
  <line x1="9.9" y1="90.0" x2="176.1" y2="90.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp0)"/>
  <line x1="20.0" y1="156.0" x2="20.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp0)"/>
  <text x="168.1" y="106.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="28.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 20.0,90.0 L 20.4,89.2 L 20.9,88.3 L 21.3,87.5 L 21.7,86.7 L 22.2,85.8 L 22.6,85.0 L 23.0,84.2 L 23.5,83.3 L 23.9,82.5 L 24.3,81.7 L 24.8,80.9 L 25.2,80.1 L 25.6,79.2 L 26.1,78.4 L 26.5,77.6 L 26.9,76.8 L 27.4,76.1 L 27.8,75.3 L 28.2,74.5 L 28.7,73.7 L 29.1,73.0 L 29.5,72.2 L 30.0,71.5 L 30.4,70.7 L 30.8,70.0 L 31.3,69.3 L 31.7,68.6 L 32.1,67.9 L 32.6,67.2 L 33.0,66.5 L 33.4,65.8 L 33.9,65.2 L 34.3,64.5 L 34.7,63.9 L 35.2,63.2 L 35.6,62.6 L 36.0,62.0 L 36.5,61.4 L 36.9,60.8 L 37.3,60.3 L 37.8,59.7 L 38.2,59.2 L 38.6,58.7 L 39.1,58.1 L 39.5,57.6 L 39.9,57.2 L 40.4,56.7 L 40.8,56.2 L 41.2,55.8 L 41.7,55.4 L 42.1,54.9 L 42.5,54.6 L 43.0,54.2 L 43.4,53.8 L 43.8,53.5 L 44.3,53.1 L 44.7,52.8 L 45.1,52.5 L 45.6,52.2 L 46.0,52.0 L 46.4,51.7 L 46.9,51.5 L 47.3,51.3 L 47.7,51.1 L 48.2,50.9 L 48.6,50.7 L 49.0,50.6 L 49.5,50.4 L 49.9,50.3 L 50.3,50.2 L 50.8,50.1 L 51.2,50.1 L 51.6,50.0 L 52.1,50.0 L 52.5,50.0 L 52.9,50.0 L 53.4,50.0 L 53.8,50.1 L 54.2,50.1 L 54.7,50.2 L 55.1,50.3 L 55.5,50.4 L 56.0,50.6 L 56.4,50.7 L 56.8,50.9 L 57.3,51.1 L 57.7,51.3 L 58.1,51.5 L 58.6,51.7 L 59.0,52.0 L 59.4,52.2 L 59.9,52.5 L 60.3,52.8 L 60.7,53.1 L 61.2,53.5 L 61.6,53.8 L 62.0,54.2 L 62.5,54.6 L 62.9,54.9 L 63.3,55.4 L 63.8,55.8 L 64.2,56.2 L 64.6,56.7 L 65.1,57.2 L 65.5,57.6 L 65.9,58.1 L 66.4,58.7 L 66.8,59.2 L 67.2,59.7 L 67.7,60.3 L 68.1,60.8 L 68.5,61.4 L 69.0,62.0 L 69.4,62.6 L 69.8,63.2 L 70.3,63.9 L 70.7,64.5 L 71.1,65.2 L 71.6,65.8 L 72.0,66.5 L 72.4,67.2 L 72.9,67.9 L 73.3,68.6 L 73.7,69.3 L 74.2,70.0 L 74.6,70.7 L 75.0,71.5 L 75.5,72.2 L 75.9,73.0 L 76.3,73.7 L 76.8,74.5 L 77.2,75.3 L 77.6,76.1 L 78.1,76.8 L 78.5,77.6 L 78.9,78.4 L 79.4,79.2 L 79.8,80.1 L 80.2,80.9 L 80.7,81.7 L 81.1,82.5 L 81.5,83.3 L 82.0,84.2 L 82.4,85.0 L 82.8,85.8 L 83.3,86.7 L 83.7,87.5 L 84.1,88.3 L 84.6,89.2 L 85.0,90.0 L 85.4,90.8 L 85.9,91.7 L 86.3,92.5 L 86.7,93.3 L 87.2,94.2 L 87.6,95.0 L 88.0,95.8 L 88.5,96.7 L 88.9,97.5 L 89.3,98.3 L 89.8,99.1 L 90.2,99.9 L 90.6,100.8 L 91.1,101.6 L 91.5,102.4 L 91.9,103.2 L 92.4,103.9 L 92.8,104.7 L 93.2,105.5 L 93.7,106.3 L 94.1,107.0 L 94.5,107.8 L 95.0,108.5 L 95.4,109.3 L 95.8,110.0 L 96.3,110.7 L 96.7,111.4 L 97.1,112.1 L 97.6,112.8 L 98.0,113.5 L 98.4,114.2 L 98.9,114.8 L 99.3,115.5 L 99.7,116.1 L 100.2,116.8 L 100.6,117.4 L 101.0,118.0 L 101.5,118.6 L 101.9,119.2 L 102.3,119.7 L 102.8,120.3 L 103.2,120.8 L 103.6,121.3 L 104.1,121.9 L 104.5,122.4 L 104.9,122.8 L 105.4,123.3 L 105.8,123.8 L 106.2,124.2 L 106.7,124.6 L 107.1,125.1 L 107.5,125.4 L 108.0,125.8 L 108.4,126.2 L 108.8,126.5 L 109.3,126.9 L 109.7,127.2 L 110.1,127.5 L 110.6,127.8 L 111.0,128.0 L 111.4,128.3 L 111.9,128.5 L 112.3,128.7 L 112.7,128.9 L 113.2,129.1 L 113.6,129.3 L 114.0,129.4 L 114.5,129.6 L 114.9,129.7 L 115.3,129.8 L 115.8,129.9 L 116.2,129.9 L 116.6,130.0 L 117.1,130.0 L 117.5,130.0 L 117.9,130.0 L 118.4,130.0 L 118.8,129.9 L 119.2,129.9 L 119.7,129.8 L 120.1,129.7 L 120.5,129.6 L 121.0,129.4 L 121.4,129.3 L 121.8,129.1 L 122.3,128.9 L 122.7,128.7 L 123.1,128.5 L 123.6,128.3 L 124.0,128.0 L 124.4,127.8 L 124.9,127.5 L 125.3,127.2 L 125.7,126.9 L 126.2,126.5 L 126.6,126.2 L 127.0,125.8 L 127.5,125.4 L 127.9,125.1 L 128.3,124.6 L 128.8,124.2 L 129.2,123.8 L 129.6,123.3 L 130.1,122.8 L 130.5,122.4 L 130.9,121.9 L 131.4,121.3 L 131.8,120.8 L 132.2,120.3 L 132.7,119.7 L 133.1,119.2 L 133.5,118.6 L 134.0,118.0 L 134.4,117.4 L 134.8,116.8 L 135.3,116.1 L 135.7,115.5 L 136.1,114.8 L 136.6,114.2 L 137.0,113.5 L 137.4,112.8 L 137.9,112.1 L 138.3,111.4 L 138.7,110.7 L 139.2,110.0 L 139.6,109.3 L 140.0,108.5 L 140.5,107.8 L 140.9,107.0 L 141.3,106.3 L 141.8,105.5 L 142.2,104.7 L 142.6,103.9 L 143.1,103.2 L 143.5,102.4 L 143.9,101.6 L 144.4,100.8 L 144.8,99.9 L 145.2,99.1 L 145.7,98.3 L 146.1,97.5 L 146.5,96.7 L 147.0,95.8 L 147.4,95.0 L 147.8,94.2 L 148.3,93.3 L 148.7,92.5 L 149.1,91.7 L 149.6,90.8 L 150.0,90.0" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linejoin="round"/>
  <text x="90.0" y="160.0" fill="#475569" font-size="10" text-anchor="middle">sóng tròn trơn</text>
  <text x="250.0" y="16.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">n = 2: + sin 3x/3</text>
  <line x1="169.9" y1="90.0" x2="336.1" y2="90.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp160)"/>
  <line x1="180.0" y1="156.0" x2="180.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp160)"/>
  <text x="328.1" y="106.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="188.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 180.0,90.0 L 180.4,88.3 L 180.9,86.7 L 181.3,85.0 L 181.7,83.3 L 182.2,81.7 L 182.6,80.1 L 183.0,78.5 L 183.5,76.9 L 183.9,75.4 L 184.3,73.8 L 184.8,72.4 L 185.2,70.9 L 185.6,69.5 L 186.1,68.2 L 186.5,66.9 L 186.9,65.6 L 187.4,64.4 L 187.8,63.2 L 188.2,62.1 L 188.7,61.0 L 189.1,60.1 L 189.5,59.1 L 190.0,58.2 L 190.4,57.4 L 190.8,56.7 L 191.3,56.0 L 191.7,55.3 L 192.1,54.8 L 192.6,54.3 L 193.0,53.8 L 193.4,53.4 L 193.9,53.1 L 194.3,52.8 L 194.7,52.6 L 195.2,52.4 L 195.6,52.3 L 196.0,52.3 L 196.5,52.3 L 196.9,52.3 L 197.3,52.4 L 197.8,52.6 L 198.2,52.8 L 198.6,53.0 L 199.1,53.2 L 199.5,53.5 L 199.9,53.8 L 200.4,54.2 L 200.8,54.6 L 201.2,54.9 L 201.7,55.4 L 202.1,55.8 L 202.5,56.2 L 203.0,56.7 L 203.4,57.1 L 203.8,57.6 L 204.3,58.0 L 204.7,58.5 L 205.1,58.9 L 205.6,59.4 L 206.0,59.8 L 206.4,60.2 L 206.9,60.6 L 207.3,61.0 L 207.7,61.3 L 208.2,61.7 L 208.6,62.0 L 209.0,62.2 L 209.5,62.5 L 209.9,62.7 L 210.3,62.9 L 210.8,63.1 L 211.2,63.2 L 211.6,63.3 L 212.1,63.3 L 212.5,63.3 L 212.9,63.3 L 213.4,63.3 L 213.8,63.2 L 214.2,63.1 L 214.7,62.9 L 215.1,62.7 L 215.5,62.5 L 216.0,62.2 L 216.4,62.0 L 216.8,61.7 L 217.3,61.3 L 217.7,61.0 L 218.1,60.6 L 218.6,60.2 L 219.0,59.8 L 219.4,59.4 L 219.9,58.9 L 220.3,58.5 L 220.7,58.0 L 221.2,57.6 L 221.6,57.1 L 222.0,56.7 L 222.5,56.2 L 222.9,55.8 L 223.3,55.4 L 223.8,54.9 L 224.2,54.6 L 224.6,54.2 L 225.1,53.8 L 225.5,53.5 L 225.9,53.2 L 226.4,53.0 L 226.8,52.8 L 227.2,52.6 L 227.7,52.4 L 228.1,52.3 L 228.5,52.3 L 229.0,52.3 L 229.4,52.3 L 229.8,52.4 L 230.3,52.6 L 230.7,52.8 L 231.1,53.1 L 231.6,53.4 L 232.0,53.8 L 232.4,54.3 L 232.9,54.8 L 233.3,55.3 L 233.7,56.0 L 234.2,56.7 L 234.6,57.4 L 235.0,58.2 L 235.5,59.1 L 235.9,60.1 L 236.3,61.0 L 236.8,62.1 L 237.2,63.2 L 237.6,64.4 L 238.1,65.6 L 238.5,66.9 L 238.9,68.2 L 239.4,69.5 L 239.8,70.9 L 240.2,72.4 L 240.7,73.8 L 241.1,75.4 L 241.5,76.9 L 242.0,78.5 L 242.4,80.1 L 242.8,81.7 L 243.3,83.3 L 243.7,85.0 L 244.1,86.7 L 244.6,88.3 L 245.0,90.0 L 245.4,91.7 L 245.9,93.3 L 246.3,95.0 L 246.7,96.7 L 247.2,98.3 L 247.6,99.9 L 248.0,101.5 L 248.5,103.1 L 248.9,104.6 L 249.3,106.2 L 249.8,107.6 L 250.2,109.1 L 250.6,110.5 L 251.1,111.8 L 251.5,113.1 L 251.9,114.4 L 252.4,115.6 L 252.8,116.8 L 253.2,117.9 L 253.7,119.0 L 254.1,119.9 L 254.5,120.9 L 255.0,121.8 L 255.4,122.6 L 255.8,123.3 L 256.3,124.0 L 256.7,124.7 L 257.1,125.2 L 257.6,125.7 L 258.0,126.2 L 258.4,126.6 L 258.9,126.9 L 259.3,127.2 L 259.7,127.4 L 260.2,127.6 L 260.6,127.7 L 261.0,127.7 L 261.5,127.7 L 261.9,127.7 L 262.3,127.6 L 262.8,127.4 L 263.2,127.2 L 263.6,127.0 L 264.1,126.8 L 264.5,126.5 L 264.9,126.2 L 265.4,125.8 L 265.8,125.4 L 266.2,125.1 L 266.7,124.6 L 267.1,124.2 L 267.5,123.8 L 268.0,123.3 L 268.4,122.9 L 268.8,122.4 L 269.3,122.0 L 269.7,121.5 L 270.1,121.1 L 270.6,120.6 L 271.0,120.2 L 271.4,119.8 L 271.9,119.4 L 272.3,119.0 L 272.7,118.7 L 273.2,118.3 L 273.6,118.0 L 274.0,117.8 L 274.5,117.5 L 274.9,117.3 L 275.3,117.1 L 275.8,116.9 L 276.2,116.8 L 276.6,116.7 L 277.1,116.7 L 277.5,116.7 L 277.9,116.7 L 278.4,116.7 L 278.8,116.8 L 279.2,116.9 L 279.7,117.1 L 280.1,117.3 L 280.5,117.5 L 281.0,117.8 L 281.4,118.0 L 281.8,118.3 L 282.3,118.7 L 282.7,119.0 L 283.1,119.4 L 283.6,119.8 L 284.0,120.2 L 284.4,120.6 L 284.9,121.1 L 285.3,121.5 L 285.7,122.0 L 286.2,122.4 L 286.6,122.9 L 287.0,123.3 L 287.5,123.8 L 287.9,124.2 L 288.3,124.6 L 288.8,125.1 L 289.2,125.4 L 289.6,125.8 L 290.1,126.2 L 290.5,126.5 L 290.9,126.8 L 291.4,127.0 L 291.8,127.2 L 292.2,127.4 L 292.7,127.6 L 293.1,127.7 L 293.5,127.7 L 294.0,127.7 L 294.4,127.7 L 294.8,127.6 L 295.3,127.4 L 295.7,127.2 L 296.1,126.9 L 296.6,126.6 L 297.0,126.2 L 297.4,125.7 L 297.9,125.2 L 298.3,124.7 L 298.7,124.0 L 299.2,123.3 L 299.6,122.6 L 300.0,121.8 L 300.5,120.9 L 300.9,119.9 L 301.3,119.0 L 301.8,117.9 L 302.2,116.8 L 302.6,115.6 L 303.1,114.4 L 303.5,113.1 L 303.9,111.8 L 304.4,110.5 L 304.8,109.1 L 305.2,107.6 L 305.7,106.2 L 306.1,104.6 L 306.5,103.1 L 307.0,101.5 L 307.4,99.9 L 307.8,98.3 L 308.3,96.7 L 308.7,95.0 L 309.1,93.3 L 309.6,91.7 L 310.0,90.0" fill="none" stroke="#15803d" stroke-width="2" stroke-linejoin="round"/>
  <text x="250.0" y="160.0" fill="#475569" font-size="10" text-anchor="middle">bắt đầu vuông hóa</text>
  <text x="410.0" y="16.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">n = 10</text>
  <line x1="329.9" y1="90.0" x2="496.1" y2="90.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp320)"/>
  <line x1="340.0" y1="156.0" x2="340.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp320)"/>
  <text x="488.1" y="106.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="348.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 340.0,90.0 L 340.4,81.7 L 340.9,73.9 L 341.3,67.0 L 341.7,61.3 L 342.2,57.1 L 342.6,54.3 L 343.0,53.1 L 343.5,53.1 L 343.9,54.0 L 344.3,55.6 L 344.8,57.4 L 345.2,59.1 L 345.6,60.5 L 346.1,61.4 L 346.5,61.7 L 346.9,61.4 L 347.4,60.7 L 347.8,59.7 L 348.2,58.6 L 348.7,57.6 L 349.1,56.9 L 349.5,56.5 L 350.0,56.5 L 350.4,56.8 L 350.8,57.5 L 351.3,58.2 L 351.7,59.0 L 352.1,59.7 L 352.6,60.1 L 353.0,60.3 L 353.4,60.1 L 353.9,59.7 L 354.3,59.2 L 354.7,58.5 L 355.2,57.9 L 355.6,57.5 L 356.0,57.2 L 356.5,57.2 L 356.9,57.4 L 357.3,57.9 L 357.8,58.4 L 358.2,58.9 L 358.6,59.4 L 359.1,59.7 L 359.5,59.8 L 359.9,59.7 L 360.4,59.4 L 360.8,59.0 L 361.2,58.5 L 361.7,58.0 L 362.1,57.7 L 362.5,57.5 L 363.0,57.5 L 363.4,57.7 L 363.8,58.0 L 364.3,58.4 L 364.7,58.9 L 365.1,59.3 L 365.6,59.5 L 366.0,59.6 L 366.4,59.5 L 366.9,59.3 L 367.3,58.9 L 367.7,58.5 L 368.2,58.1 L 368.6,57.8 L 369.0,57.6 L 369.5,57.6 L 369.9,57.8 L 370.3,58.1 L 370.8,58.5 L 371.2,58.9 L 371.6,59.3 L 372.1,59.5 L 372.5,59.6 L 372.9,59.5 L 373.4,59.3 L 373.8,58.9 L 374.2,58.5 L 374.7,58.1 L 375.1,57.8 L 375.5,57.6 L 376.0,57.6 L 376.4,57.8 L 376.8,58.1 L 377.3,58.5 L 377.7,58.9 L 378.1,59.3 L 378.6,59.5 L 379.0,59.6 L 379.4,59.5 L 379.9,59.3 L 380.3,58.9 L 380.7,58.4 L 381.2,58.0 L 381.6,57.7 L 382.0,57.5 L 382.5,57.5 L 382.9,57.7 L 383.3,58.0 L 383.8,58.5 L 384.2,59.0 L 384.6,59.4 L 385.1,59.7 L 385.5,59.8 L 385.9,59.7 L 386.4,59.4 L 386.8,58.9 L 387.2,58.4 L 387.7,57.9 L 388.1,57.4 L 388.5,57.2 L 389.0,57.2 L 389.4,57.5 L 389.8,57.9 L 390.3,58.5 L 390.7,59.2 L 391.1,59.7 L 391.6,60.1 L 392.0,60.3 L 392.4,60.1 L 392.9,59.7 L 393.3,59.0 L 393.7,58.2 L 394.2,57.5 L 394.6,56.8 L 395.0,56.5 L 395.5,56.5 L 395.9,56.9 L 396.3,57.6 L 396.8,58.6 L 397.2,59.7 L 397.6,60.7 L 398.1,61.4 L 398.5,61.7 L 398.9,61.4 L 399.4,60.5 L 399.8,59.1 L 400.2,57.4 L 400.7,55.6 L 401.1,54.0 L 401.5,53.1 L 402.0,53.1 L 402.4,54.3 L 402.8,57.1 L 403.3,61.3 L 403.7,67.0 L 404.1,73.9 L 404.6,81.7 L 405.0,90.0 L 405.4,98.3 L 405.9,106.1 L 406.3,113.0 L 406.7,118.7 L 407.2,122.9 L 407.6,125.7 L 408.0,126.9 L 408.5,126.9 L 408.9,126.0 L 409.3,124.4 L 409.8,122.6 L 410.2,120.9 L 410.6,119.5 L 411.1,118.6 L 411.5,118.3 L 411.9,118.6 L 412.4,119.3 L 412.8,120.3 L 413.2,121.4 L 413.7,122.4 L 414.1,123.1 L 414.5,123.5 L 415.0,123.5 L 415.4,123.2 L 415.8,122.5 L 416.3,121.8 L 416.7,121.0 L 417.1,120.3 L 417.6,119.9 L 418.0,119.7 L 418.4,119.9 L 418.9,120.3 L 419.3,120.8 L 419.7,121.5 L 420.2,122.1 L 420.6,122.5 L 421.0,122.8 L 421.5,122.8 L 421.9,122.6 L 422.3,122.1 L 422.8,121.6 L 423.2,121.1 L 423.6,120.6 L 424.1,120.3 L 424.5,120.2 L 424.9,120.3 L 425.4,120.6 L 425.8,121.0 L 426.2,121.5 L 426.7,122.0 L 427.1,122.3 L 427.5,122.5 L 428.0,122.5 L 428.4,122.3 L 428.8,122.0 L 429.3,121.6 L 429.7,121.1 L 430.1,120.7 L 430.6,120.5 L 431.0,120.4 L 431.4,120.5 L 431.9,120.7 L 432.3,121.1 L 432.7,121.5 L 433.2,121.9 L 433.6,122.2 L 434.0,122.4 L 434.5,122.4 L 434.9,122.2 L 435.3,121.9 L 435.8,121.5 L 436.2,121.1 L 436.6,120.7 L 437.1,120.5 L 437.5,120.4 L 437.9,120.5 L 438.4,120.7 L 438.8,121.1 L 439.2,121.5 L 439.7,121.9 L 440.1,122.2 L 440.5,122.4 L 441.0,122.4 L 441.4,122.2 L 441.8,121.9 L 442.3,121.5 L 442.7,121.1 L 443.1,120.7 L 443.6,120.5 L 444.0,120.4 L 444.4,120.5 L 444.9,120.7 L 445.3,121.1 L 445.7,121.6 L 446.2,122.0 L 446.6,122.3 L 447.0,122.5 L 447.5,122.5 L 447.9,122.3 L 448.3,122.0 L 448.8,121.5 L 449.2,121.0 L 449.6,120.6 L 450.1,120.3 L 450.5,120.2 L 450.9,120.3 L 451.4,120.6 L 451.8,121.1 L 452.2,121.6 L 452.7,122.1 L 453.1,122.6 L 453.5,122.8 L 454.0,122.8 L 454.4,122.5 L 454.8,122.1 L 455.3,121.5 L 455.7,120.8 L 456.1,120.3 L 456.6,119.9 L 457.0,119.7 L 457.4,119.9 L 457.9,120.3 L 458.3,121.0 L 458.7,121.8 L 459.2,122.5 L 459.6,123.2 L 460.0,123.5 L 460.5,123.5 L 460.9,123.1 L 461.3,122.4 L 461.8,121.4 L 462.2,120.3 L 462.6,119.3 L 463.1,118.6 L 463.5,118.3 L 463.9,118.6 L 464.4,119.5 L 464.8,120.9 L 465.2,122.6 L 465.7,124.4 L 466.1,126.0 L 466.5,126.9 L 467.0,126.9 L 467.4,125.7 L 467.8,122.9 L 468.3,118.7 L 468.7,113.0 L 469.1,106.1 L 469.6,98.3 L 470.0,90.0" fill="none" stroke="#b45309" stroke-width="2" stroke-linejoin="round"/>
  <text x="410.0" y="160.0" fill="#475569" font-size="10" text-anchor="middle">gần vuông, có rung</text>
  <text x="570.0" y="16.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">n = 50 (→ ∞)</text>
  <line x1="489.9" y1="90.0" x2="656.1" y2="90.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp480)"/>
  <line x1="500.0" y1="156.0" x2="500.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#fp480)"/>
  <text x="648.1" y="106.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="508.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 500.0,90.0 L 500.4,57.1 L 500.9,55.6 L 501.3,61.6 L 501.7,57.6 L 502.2,57.5 L 502.6,60.2 L 503.0,58.0 L 503.5,57.9 L 503.9,59.6 L 504.3,58.1 L 504.8,58.1 L 505.2,59.4 L 505.6,58.2 L 506.1,58.2 L 506.5,59.2 L 506.9,58.3 L 507.4,58.3 L 507.8,59.1 L 508.2,58.3 L 508.7,58.3 L 509.1,59.1 L 509.5,58.4 L 510.0,58.4 L 510.4,59.0 L 510.8,58.4 L 511.3,58.4 L 511.7,59.0 L 512.1,58.4 L 512.6,58.4 L 513.0,58.9 L 513.4,58.4 L 513.9,58.4 L 514.3,58.9 L 514.7,58.4 L 515.2,58.4 L 515.6,58.9 L 516.0,58.4 L 516.5,58.4 L 516.9,58.9 L 517.3,58.5 L 517.8,58.5 L 518.2,58.8 L 518.6,58.5 L 519.1,58.5 L 519.5,58.8 L 519.9,58.5 L 520.4,58.5 L 520.8,58.8 L 521.2,58.5 L 521.7,58.5 L 522.1,58.8 L 522.5,58.5 L 523.0,58.5 L 523.4,58.8 L 523.8,58.5 L 524.3,58.5 L 524.7,58.8 L 525.1,58.5 L 525.6,58.5 L 526.0,58.8 L 526.4,58.5 L 526.9,58.5 L 527.3,58.8 L 527.7,58.5 L 528.2,58.5 L 528.6,58.8 L 529.0,58.5 L 529.5,58.5 L 529.9,58.8 L 530.3,58.5 L 530.8,58.5 L 531.2,58.8 L 531.6,58.5 L 532.1,58.5 L 532.5,58.8 L 532.9,58.5 L 533.4,58.5 L 533.8,58.8 L 534.2,58.5 L 534.7,58.5 L 535.1,58.8 L 535.5,58.5 L 536.0,58.5 L 536.4,58.8 L 536.8,58.5 L 537.3,58.5 L 537.7,58.8 L 538.1,58.5 L 538.6,58.5 L 539.0,58.8 L 539.4,58.5 L 539.9,58.5 L 540.3,58.8 L 540.7,58.5 L 541.2,58.5 L 541.6,58.8 L 542.0,58.5 L 542.5,58.5 L 542.9,58.8 L 543.3,58.5 L 543.8,58.5 L 544.2,58.8 L 544.6,58.5 L 545.1,58.5 L 545.5,58.8 L 545.9,58.5 L 546.4,58.5 L 546.8,58.8 L 547.2,58.5 L 547.7,58.5 L 548.1,58.9 L 548.5,58.4 L 549.0,58.4 L 549.4,58.9 L 549.8,58.4 L 550.3,58.4 L 550.7,58.9 L 551.1,58.4 L 551.6,58.4 L 552.0,58.9 L 552.4,58.4 L 552.9,58.4 L 553.3,59.0 L 553.7,58.4 L 554.2,58.4 L 554.6,59.0 L 555.0,58.4 L 555.5,58.4 L 555.9,59.1 L 556.3,58.3 L 556.8,58.3 L 557.2,59.1 L 557.6,58.3 L 558.1,58.3 L 558.5,59.2 L 558.9,58.2 L 559.4,58.2 L 559.8,59.4 L 560.2,58.1 L 560.7,58.1 L 561.1,59.6 L 561.5,57.9 L 562.0,58.0 L 562.4,60.2 L 562.8,57.5 L 563.3,57.6 L 563.7,61.6 L 564.1,55.6 L 564.6,57.1 L 565.0,90.0 L 565.4,122.9 L 565.9,124.4 L 566.3,118.4 L 566.7,122.4 L 567.2,122.5 L 567.6,119.8 L 568.0,122.0 L 568.5,122.1 L 568.9,120.4 L 569.3,121.9 L 569.8,121.9 L 570.2,120.6 L 570.6,121.8 L 571.1,121.8 L 571.5,120.8 L 571.9,121.7 L 572.4,121.7 L 572.8,120.9 L 573.2,121.7 L 573.7,121.7 L 574.1,120.9 L 574.5,121.6 L 575.0,121.6 L 575.4,121.0 L 575.8,121.6 L 576.3,121.6 L 576.7,121.0 L 577.1,121.6 L 577.6,121.6 L 578.0,121.1 L 578.4,121.6 L 578.9,121.6 L 579.3,121.1 L 579.7,121.6 L 580.2,121.6 L 580.6,121.1 L 581.0,121.6 L 581.5,121.6 L 581.9,121.1 L 582.3,121.5 L 582.8,121.5 L 583.2,121.2 L 583.6,121.5 L 584.1,121.5 L 584.5,121.2 L 584.9,121.5 L 585.4,121.5 L 585.8,121.2 L 586.2,121.5 L 586.7,121.5 L 587.1,121.2 L 587.5,121.5 L 588.0,121.5 L 588.4,121.2 L 588.8,121.5 L 589.3,121.5 L 589.7,121.2 L 590.1,121.5 L 590.6,121.5 L 591.0,121.2 L 591.4,121.5 L 591.9,121.5 L 592.3,121.2 L 592.7,121.5 L 593.2,121.5 L 593.6,121.2 L 594.0,121.5 L 594.5,121.5 L 594.9,121.2 L 595.3,121.5 L 595.8,121.5 L 596.2,121.2 L 596.6,121.5 L 597.1,121.5 L 597.5,121.2 L 597.9,121.5 L 598.4,121.5 L 598.8,121.2 L 599.2,121.5 L 599.7,121.5 L 600.1,121.2 L 600.5,121.5 L 601.0,121.5 L 601.4,121.2 L 601.8,121.5 L 602.3,121.5 L 602.7,121.2 L 603.1,121.5 L 603.6,121.5 L 604.0,121.2 L 604.4,121.5 L 604.9,121.5 L 605.3,121.2 L 605.7,121.5 L 606.2,121.5 L 606.6,121.2 L 607.0,121.5 L 607.5,121.5 L 607.9,121.2 L 608.3,121.5 L 608.8,121.5 L 609.2,121.2 L 609.6,121.5 L 610.1,121.5 L 610.5,121.2 L 610.9,121.5 L 611.4,121.5 L 611.8,121.2 L 612.2,121.5 L 612.7,121.5 L 613.1,121.1 L 613.5,121.6 L 614.0,121.6 L 614.4,121.1 L 614.8,121.6 L 615.3,121.6 L 615.7,121.1 L 616.1,121.6 L 616.6,121.6 L 617.0,121.1 L 617.4,121.6 L 617.9,121.6 L 618.3,121.0 L 618.7,121.6 L 619.2,121.6 L 619.6,121.0 L 620.0,121.6 L 620.5,121.6 L 620.9,120.9 L 621.3,121.7 L 621.8,121.7 L 622.2,120.9 L 622.6,121.7 L 623.1,121.7 L 623.5,120.8 L 623.9,121.8 L 624.4,121.8 L 624.8,120.6 L 625.2,121.9 L 625.7,121.9 L 626.1,120.4 L 626.5,122.1 L 627.0,122.0 L 627.4,119.8 L 627.8,122.5 L 628.3,122.4 L 628.7,118.4 L 629.1,124.4 L 629.6,122.9 L 630.0,90.0" fill="none" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
  <text x="570.0" y="160.0" fill="#475569" font-size="10" text-anchor="middle">vuông thật, 'tai' Gibbs ở mép</text>
</svg>

> 🤯 **Insight**: Sin/cos là "viên gạch nguyên tử" để xây mọi tín hiệu khác. Đây là tư tưởng sâu sắc nhất của trigonometry và là nền tảng của xử lý tín hiệu hiện đại.

### 11.2. Ứng dụng thực tế

- **Nén audio MP3**: tách âm thanh thành các thành phần tần số, vứt bỏ các tần số tai người không nghe được, lưu cái còn lại → nén từ 10MB → 1MB.
- **Nén ảnh JPEG**: tách ảnh thành các "sóng 2D" (sin/cos của tọa độ pixel), giữ các tần số thấp, vứt cao → nén với ít mất mát.
- **Xử lý tín hiệu radio, viễn thông**: tách tín hiệu khỏi nhiễu bằng cách lọc theo tần số.
- **Attention trong Transformer**: sẽ thấy ở mục 12.

**📝 Tóm tắt mục 11**:

- Chuỗi Fourier: mọi tín hiệu tuần hoàn = tổng các sóng sin/cos.
- Sóng vuông $\\approx \\sin x + \\frac{\\sin(3x)}{3} + \\frac{\\sin(5x)}{5} + \\ldots$
- Càng nhiều hài → càng giống sóng vuông thật.

---

## 12. Liên hệ ML/AI — Positional Encoding và Spectrogram

### 12.1. Positional Encoding trong Transformer

Trong Transformer (kiến trúc của GPT, BERT, ...), mô hình xử lý các "**token**" (từ, byte, pixel...) **song song** — không có khái niệm "thứ tự" sẵn. Nhưng thứ tự câu cực kỳ quan trọng ("con chó cắn người" ≠ "người cắn con chó"). Giải pháp: **gán cho mỗi vị trí \`pos\` trong câu một vector đặc trưng**, gọi là positional encoding (PE).

Paper "Attention Is All You Need" (Vaswani et al., 2017) dùng công thức:

$$\\begin{aligned}
PE(pos, 2i) &= \\sin\\left(\\frac{pos}{10000^{2i/d}}\\right) \\\\
PE(pos, 2i+1) &= \\cos\\left(\\frac{pos}{10000^{2i/d}}\\right)
\\end{aligned}$$

Trong đó $pos$ là vị trí (0, 1, 2, ...), $i$ là chỉ số chiều ($0, 1, \\ldots, \\frac{d}{2} - 1$), $d$ là số chiều của embedding (vd 512).

**Đọc kỹ**: với mỗi chiều $i$, hàm $\\sin / \\cos$ có **tần số góc khác nhau** $= \\frac{1}{10000^{2i/d}}$. Khi $i = 0$: tần số cao nhất ($1$). Khi $i$ lớn: tần số rất thấp ($10^{-4}$ chẳng hạn).

> 💡 **Trực giác**: vector PE của vị trí $pos$ là **một "vân tay tần số" duy nhất** — gồm các giá trị sin/cos ở nhiều tần số khác nhau. Hai vị trí gần nhau có PE giống nhau (các sóng đồng pha). Hai vị trí xa nhau có PE khác hẳn.

**Walk-through đơn giản** với $d = 4$, vị trí $pos = 3$:

- $PE(3, 0) = \\sin(\\frac{3}{10000^0}) = \\sin(3) \\approx 0.141$.
- $PE(3, 1) = \\cos(\\frac{3}{10000^0}) = \\cos(3) \\approx -0.990$.
- $PE(3, 2) = \\sin(\\frac{3}{10000^{2/4}}) = \\sin(\\frac{3}{100}) = \\sin(0.03) \\approx 0.030$.
- $PE(3, 3) = \\cos(\\frac{3}{100}) = \\cos(0.03) \\approx 0.9996$.

Vector: $[0.141, -0.990, 0.030, 0.9996]$.

Vector này được **cộng** vào embedding gốc của token. Mô hình tự học cách "đọc" vân tay đó để biết vị trí.

### 12.2. Spectrogram trong xử lý âm thanh ML

Spectrogram là cách biểu diễn âm thanh bằng **cường độ của các tần số sin/cos theo thời gian**:

- Trục hoành: thời gian.
- Trục tung: tần số (Hz).
- Màu (đậm/nhạt): biên độ của tần số đó tại thời điểm tương ứng.

Bạn có thể "nhìn thấy" tiếng nói qua spectrogram — các nguyên âm, phụ âm, mỗi cái có vân tần số đặc trưng. Đây là input chuẩn cho:

- **Speech recognition** (Whisper, Google ASR).
- **Music generation** (MusicGen, Suno).
- **Sound classification**.

Quá trình tạo spectrogram: cắt âm thanh thành các đoạn ngắn (~25ms), với mỗi đoạn áp **biến đổi Fourier** (FFT) để tách thành các tần số sin/cos. Tức **sin/cos là "ngôn ngữ trung gian" giữa âm thanh thô và mạng neural**.

### 12.3. RoPE — Rotary Positional Embedding (preview)

Một cải tiến hiện đại hơn dùng trong LLaMA, GPT-NeoX, Falcon: thay vì cộng PE vào embedding, **xoay** embedding theo một góc tỉ lệ với vị trí. Sin/cos lại xuất hiện — ở dạng ma trận xoay 2D $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$. Sẽ học chi tiết ở Tầng 4 (Linear Algebra).

**📝 Tóm tắt mục 12**:

- Positional encoding (Transformer): mỗi chiều của PE là một sóng sin/cos với tần số khác.
- Spectrogram: biểu diễn âm thanh bằng các sóng sin/cos theo thời gian.
- RoPE: xoay embedding bằng ma trận sin/cos — sẽ học sâu ở Tầng 4.

---

## Tóm tắt toàn bài

**1. Hàm sin/cos là "tọa độ của điểm quay":**
- $\\sin x$ = tọa độ tung của điểm trên đường tròn đơn vị ở góc $x$.
- $\\cos x$ = tọa độ hoành.
- Đó là vì sao đồ thị có hình sóng, lặp lại sau $2\\pi$.

**2. $y = \\sin x$:** domain $\\mathbb{R}$, range $[-1,1]$, chu kỳ $2\\pi$, hàm lẻ, qua gốc.

**3. $y = \\cos x$:** giống sin nhưng dịch trái $\\frac{\\pi}{2}$. Hàm chẵn, qua $(0,1)$.

**4. $y = \\tan x$:** chu kỳ $\\pi$ (KHÔNG $2\\pi$), range $\\mathbb{R}$, có tiệm cận đứng tại $\\frac{\\pi}{2} + k\\pi$.

**5. Phương trình tổng quát $y = A\\sin(Bx + C) + D$:**
- $|A|$: biên độ. $A<0$: lật.
- $B$: tần số góc. Chu kỳ $T = \\frac{2\\pi}{B}$.
- $C$: pha. Dịch trái $\\frac{C}{B}$.
- $D$: dịch dọc. Range $[D-|A|, D+|A|]$.

**6. Quy tắc nhớ:** chu kỳ chia $B$, không nhân. Pha chia $B$, không trực tiếp $C$.

**7. Chuỗi Fourier:** mọi tín hiệu tuần hoàn = tổng sin/cos. Nền của MP3, JPEG, FFT.

**8. ML/AI:** Positional encoding (Transformer), spectrogram (speech), RoPE — đều dùng sin/cos.

---

## Bài tập

### Bài 1 — Vẽ 4 đồ thị trên cùng trục

Lập bảng giá trị (≥ 9 điểm) cho mỗi hàm trên $[-2\\pi, 2\\pi]$. Sau đó phác đồ thị và so sánh:

(a) $y = \\sin x$
(b) $y = \\sin(2x)$
(c) $y = 2\\sin x$
(d) $y = \\sin x + 1$

Trả lời: cái nào dao động nhanh nhất? Cái nào cao nhất? Cái nào không bao giờ chạm trục Ox?

### Bài 2 — Phân tích phương trình

Cho $y = 3\\sin(2x - \\frac{\\pi}{3}) + 1$. Tìm:

(a) Biên độ.
(b) Chu kỳ.
(c) Pha (dịch ngang).
(d) Dịch dọc.
(e) Range.
(f) Giá trị $y$ tại $x = 0$ và $x = \\frac{\\pi}{3}$.

### Bài 3 — Điện AC

Một sóng điện áp AC có biên độ đỉnh 220V, tần số 50 Hz. Viết phương trình $V(t)$ (giả sử pha 0, offset 0). Tính $V$ tại $t = 0$, $t = 0.005$ s, $t = 0.01$ s.

### Bài 4 — Xấp xỉ Fourier

Cho $y = \\sin x + \\frac{\\sin(3x)}{3}$. Lập bảng 10 điểm trong $[0, 2\\pi]$. Phác đồ thị. So sánh với $y = \\sin x$ đơn lẻ — có giống "sóng vuông" hơn không?

### Bài 5 — Chứng minh \`cos x = sin(x + π/2)\` bằng bảng

Lập bảng 9 điểm cho cả $\\cos x$ và $\\sin(x + \\frac{\\pi}{2})$ trên $[0, 2\\pi]$. Khớp từng giá trị. Kết luận?

### Bài 6 — Code Go

Viết các hàm:

1. \`analyzeWave(A, B, C, D float64) (period, freq, rangeMin, rangeMax float64)\` — phân tích phương trình $y = A\\sin(Bx + C) + D$.
2. \`samplePoints(A, B, C, D float64, xMin, xMax float64, n int) (xs, ys []float64)\` — sinh $n$ điểm cách đều trong $[xMin, xMax]$.
3. \`fourierSquare(x float64, nHarmonics int) float64\` — xấp xỉ sóng vuông với \`nHarmonics\` hài đầu tiên.
4. Demo: in bảng giá trị 12 điểm cho $y = 3\\sin(2x - \\frac{\\pi}{3}) + 1$ trên $[0, 2\\pi]$, kèm chu kỳ và range.

---

## Lời giải chi tiết

### Lời giải bài 1

**Bảng giá trị** tại các điểm chuẩn:

| x | sin x | sin(2x) | 2 sin x | sin x + 1 |
|---:|---:|---:|---:|---:|
| $-2\\pi$ | $0$ | $0$ | $0$ | $1$ |
| $-\\frac{3\\pi}{2}$ | $1$ | $0$ | $2$ | $2$ |
| $-\\pi$ | $0$ | $0$ | $0$ | $1$ |
| $-\\frac{\\pi}{2}$ | $-1$ | $0$ | $-2$ | $0$ |
| $0$ | $0$ | $0$ | $0$ | $1$ |
| $\\frac{\\pi}{4}$ | $0.707$ | $1$ | $1.414$ | $1.707$ |
| $\\frac{\\pi}{2}$ | $1$ | $0$ | $2$ | $2$ |
| $\\pi$ | $0$ | $0$ | $0$ | $1$ |
| $\\frac{3\\pi}{2}$ | $-1$ | $0$ | $-2$ | $0$ |
| $2\\pi$ | $0$ | $0$ | $0$ | $1$ |

**Trả lời**:
- **Dao động nhanh nhất**: $y = \\sin(2x)$ — chu kỳ $\\pi$ (gấp đôi tần số).
- **Cao nhất** (đỉnh xa trục x nhất): $y = 2\\sin x$ đạt $+2$; $y = \\sin x + 1$ cũng đạt $+2$. Hòa.
- **Không chạm trục Ox**: $y = \\sin x + 1$ (range $[0, 2]$, **chạm Ox** tại các điểm $\\sin = -1$, tức $x = -\\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots$). Sau kiểm lại: tại $x = -\\frac{\\pi}{2}$, $\\sin(-\\frac{\\pi}{2}) + 1 = -1 + 1 = 0$. Vậy nó **có** chạm trục Ox.

Sửa lại: **không có cái nào không chạm trục Ox** trong 4 phương trình này — vì range của cả 4 đều bao gồm 0. Tuy nhiên, nếu thay $D = 2$, ta được $\\sin x + 2$, range $[1, 3]$, không bao giờ chạm Ox. Đây là điểm cần ý thức: $D > |A|$ thì đồ thị không cắt Ox.

### Lời giải bài 2

Cho $y = 3\\sin(2x - \\frac{\\pi}{3}) + 1$. Đọc tham số: $A = 3$, $B = 2$, $C = -\\frac{\\pi}{3}$, $D = 1$.

| Mục | Đáp | Lý do |
|---|---|---|
| (a) Biên độ | $|3| = 3$ | $|A|$ |
| (b) Chu kỳ | $T = \\frac{2\\pi}{2} = \\pi$ | $\\frac{2\\pi}{B}$ |
| (c) Pha (dịch ngang) | $-\\frac{C}{B} = -\\frac{-\\pi/3}{2} = \\frac{\\pi}{6}$ → dịch **phải** $\\frac{\\pi}{6}$ | dấu đảo vì cộng $C$ nhưng dịch theo $-\\frac{C}{B}$ |
| (d) Dịch dọc | $D = 1$ (lên 1 đơn vị) | trục trung bình $y = 1$ |
| (e) Range | $[1 - 3, 1 + 3] = [-2, 4]$ | $[D-|A|, D+|A|]$ |
| (f) Tại $x = 0$ | $y = 3\\sin(-\\frac{\\pi}{3}) + 1 = 3 \\cdot (-\\frac{\\sqrt{3}}{2}) + 1 = 1 - \\frac{3\\sqrt{3}}{2} \\approx -1.598$ | |
| (f) Tại $x = \\frac{\\pi}{3}$ | $y = 3\\sin(\\frac{2\\pi}{3} - \\frac{\\pi}{3}) + 1 = 3\\sin(\\frac{\\pi}{3}) + 1 = 3 \\cdot \\frac{\\sqrt{3}}{2} + 1 \\approx 3.598$ | |

Quan sát: tại $x = 0$ và $x = \\frac{\\pi}{3}$, hai giá trị **đối xứng quanh trục $y = 1$** (chênh $\\pm 2.598$). Đó là vì hai điểm cách nhau $\\frac{\\pi}{3} = \\frac{T}{3}$ — một phần ba chu kỳ.

### Lời giải bài 3

$f = 50$ Hz → $B = \\omega = 2\\pi f = 100\\pi$ rad/s. Biên độ $A = 220$. Vậy:

$$V(t) = 220 \\cdot \\sin(100\\pi \\cdot t)$$

| $t$ (s) | $100\\pi \\cdot t$ (rad) | $\\sin(\\ldots)$ | $V$ (V) |
|---:|---:|---:|---:|
| $0$ | $0$ | $0$ | **0** |
| $0.005$ | $0.5\\pi = \\frac{\\pi}{2}$ | $1$ | **220** |
| $0.01$ | $\\pi$ | $0$ | **0** |
| $0.015$ | $1.5\\pi$ | $-1$ | **-220** |
| $0.02$ | $2\\pi$ | $0$ | **0** (hết 1 chu kỳ — 20ms khớp với f=50Hz) |

Quan sát: $t = 0.005s$ là $\\frac{T}{4}$ (quý chu kỳ) → đạt biên độ đỉnh. Sau $\\frac{T}{2} = 0.01s$ về 0, sau $\\frac{3T}{4} = 0.015s$ đạt đáy -220V. Đúng pattern của sóng AC.

### Lời giải bài 4

Bảng giá trị cho $y = \\sin x + \\frac{\\sin(3x)}{3}$:

| x | sin x | 3x | sin(3x) | sin(3x)/3 | y |
|---:|---:|---:|---:|---:|---:|
| $0$ | $0$ | $0$ | $0$ | $0$ | **0** |
| $\\frac{\\pi}{6}$ | $0.5$ | $\\frac{\\pi}{2}$ | $1$ | $0.333$ | **0.833** |
| $\\frac{\\pi}{3}$ | $0.866$ | $\\pi$ | $0$ | $0$ | **0.866** |
| $\\frac{\\pi}{2}$ | $1$ | $\\frac{3\\pi}{2}$ | $-1$ | $-0.333$ | **0.667** |
| $\\frac{2\\pi}{3}$ | $0.866$ | $2\\pi$ | $0$ | $0$ | **0.866** |
| $\\frac{5\\pi}{6}$ | $0.5$ | $\\frac{5\\pi}{2}$ | $1$ | $0.333$ | **0.833** |
| $\\pi$ | $0$ | $3\\pi$ | $0$ | $0$ | **0** |
| $\\frac{7\\pi}{6}$ | $-0.5$ | $\\frac{7\\pi}{2}$ | $-1$ | $-0.333$ | **-0.833** |
| $\\frac{4\\pi}{3}$ | $-0.866$ | $4\\pi$ | $0$ | $0$ | **-0.866** |
| $\\frac{3\\pi}{2}$ | $-1$ | $\\frac{9\\pi}{2}$ | $1$ | $0.333$ | **-0.667** |
| $\\frac{5\\pi}{3}$ | $-0.866$ | $5\\pi$ | $0$ | $0$ | **-0.866** |
| $\\frac{11\\pi}{6}$ | $-0.5$ | $\\frac{11\\pi}{2}$ | $-1$ | $-0.333$ | **-0.833** |
| $2\\pi$ | $0$ | $6\\pi$ | $0$ | $0$ | **0** |

So sánh bằng hình:

<svg viewBox="0 0 600 280" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="So sánh y = sin x và y = sin x + sin(3x)/3 trên [0, 2π]: đường thứ hai phẳng hơn ở đỉnh và đáy, gần sóng vuông hơn">
  <defs><marker id="w8" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="192.1" y1="240.0" x2="192.1" y2="40.0"/>
<line x1="302.9" y1="240.0" x2="302.9" y2="40.0"/>
<line x1="413.8" y1="240.0" x2="413.8" y2="40.0"/>
<line x1="524.7" y1="240.0" x2="524.7" y2="40.0"/>
<line x1="60.0" y1="68.6" x2="560.0" y2="68.6"/>
<line x1="60.0" y1="211.4" x2="560.0" y2="211.4"/>
</g>
  <line x1="54.0" y1="140.0" x2="582.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w8)"/>
  <line x1="81.2" y1="246.0" x2="81.2" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#w8)"/>
  <text x="574.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="89.2" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="192.1" y1="136.0" x2="192.1" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="192.1" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π/2</text>
  <line x1="302.9" y1="136.0" x2="302.9" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="302.9" y="156.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="413.8" y1="136.0" x2="413.8" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="413.8" y="156.0" fill="#475569" font-size="11" text-anchor="middle">3π/2</text>
  <line x1="524.7" y1="136.0" x2="524.7" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="524.7" y="156.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="77.2" y1="68.6" x2="85.2" y2="68.6" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="72.6" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="77.2" y1="211.4" x2="85.2" y2="211.4" stroke="#1a202c" stroke-width="1.5"/>
  <text x="74.2" y="215.4" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 60.0,161.1 L 61.2,159.9 L 62.5,158.7 L 63.8,157.5 L 65.0,156.2 L 66.2,155.0 L 67.5,153.8 L 68.8,152.5 L 70.0,151.3 L 71.2,150.0 L 72.5,148.8 L 73.8,147.5 L 75.0,146.2 L 76.2,145.0 L 77.5,143.7 L 78.8,142.5 L 80.0,141.2 L 81.2,139.9 L 82.5,138.7 L 83.8,137.4 L 85.0,136.1 L 86.2,134.9 L 87.5,133.6 L 88.8,132.4 L 90.0,131.1 L 91.2,129.8 L 92.5,128.6 L 93.8,127.3 L 95.0,126.1 L 96.2,124.9 L 97.5,123.6 L 98.8,122.4 L 100.0,121.2 L 101.2,120.0 L 102.5,118.8 L 103.8,117.5 L 105.0,116.3 L 106.2,115.2 L 107.5,114.0 L 108.8,112.8 L 110.0,111.6 L 111.2,110.5 L 112.5,109.3 L 113.8,108.2 L 115.0,107.1 L 116.2,106.0 L 117.5,104.8 L 118.8,103.8 L 120.0,102.7 L 121.2,101.6 L 122.5,100.5 L 123.8,99.5 L 125.0,98.5 L 126.2,97.4 L 127.5,96.4 L 128.8,95.4 L 130.0,94.4 L 131.2,93.5 L 132.5,92.5 L 133.8,91.6 L 135.0,90.7 L 136.2,89.8 L 137.5,88.9 L 138.8,88.0 L 140.0,87.1 L 141.2,86.3 L 142.5,85.5 L 143.8,84.7 L 145.0,83.9 L 146.2,83.1 L 147.5,82.3 L 148.8,81.6 L 150.0,80.9 L 151.2,80.2 L 152.5,79.5 L 153.8,78.8 L 155.0,78.2 L 156.2,77.6 L 157.5,77.0 L 158.8,76.4 L 160.0,75.8 L 161.2,75.3 L 162.5,74.7 L 163.8,74.2 L 165.0,73.8 L 166.2,73.3 L 167.5,72.9 L 168.8,72.4 L 170.0,72.0 L 171.2,71.7 L 172.5,71.3 L 173.8,71.0 L 175.0,70.6 L 176.2,70.4 L 177.5,70.1 L 178.8,69.8 L 180.0,69.6 L 181.2,69.4 L 182.5,69.2 L 183.8,69.1 L 185.0,68.9 L 186.2,68.8 L 187.5,68.7 L 188.8,68.6 L 190.0,68.6 L 191.2,68.6 L 192.5,68.6 L 193.8,68.6 L 195.0,68.6 L 196.2,68.7 L 197.5,68.8 L 198.8,68.9 L 200.0,69.0 L 201.2,69.2 L 202.5,69.4 L 203.8,69.5 L 205.0,69.8 L 206.3,70.0 L 207.5,70.3 L 208.8,70.6 L 210.0,70.9 L 211.2,71.2 L 212.5,71.5 L 213.8,71.9 L 215.0,72.3 L 216.2,72.7 L 217.5,73.2 L 218.8,73.6 L 220.0,74.1 L 221.2,74.6 L 222.5,75.1 L 223.8,75.6 L 225.0,76.2 L 226.2,76.8 L 227.5,77.4 L 228.8,78.0 L 230.0,78.6 L 231.2,79.3 L 232.5,80.0 L 233.8,80.7 L 235.0,81.4 L 236.2,82.1 L 237.5,82.9 L 238.8,83.6 L 240.0,84.4 L 241.2,85.2 L 242.5,86.0 L 243.8,86.9 L 245.0,87.7 L 246.3,88.6 L 247.5,89.5 L 248.8,90.4 L 250.0,91.3 L 251.3,92.2 L 252.5,93.2 L 253.8,94.2 L 255.0,95.1 L 256.2,96.1 L 257.5,97.1 L 258.8,98.1 L 260.0,99.2 L 261.2,100.2 L 262.5,101.3 L 263.8,102.3 L 265.0,103.4 L 266.2,104.5 L 267.5,105.6 L 268.8,106.7 L 270.0,107.9 L 271.3,109.0 L 272.5,110.1 L 273.8,111.3 L 275.0,112.5 L 276.3,113.6 L 277.5,114.8 L 278.8,116.0 L 280.0,117.2 L 281.2,118.4 L 282.5,119.6 L 283.8,120.8 L 285.0,122.0 L 286.2,123.3 L 287.5,124.5 L 288.8,125.7 L 290.0,127.0 L 291.2,128.2 L 292.5,129.5 L 293.8,130.7 L 295.0,132.0 L 296.2,133.2 L 297.5,134.5 L 298.8,135.8 L 300.0,137.0 L 301.3,138.3 L 302.5,139.6 L 303.8,140.8 L 305.0,142.1 L 306.2,143.3 L 307.5,144.6 L 308.8,145.9 L 310.0,147.1 L 311.3,148.4 L 312.5,149.6 L 313.8,150.9 L 315.0,152.1 L 316.2,153.4 L 317.5,154.6 L 318.8,155.9 L 320.0,157.1 L 321.2,158.3 L 322.5,159.5 L 323.8,160.8 L 325.0,162.0 L 326.2,163.2 L 327.5,164.4 L 328.8,165.5 L 330.0,166.7 L 331.2,167.9 L 332.5,169.0 L 333.8,170.2 L 335.0,171.3 L 336.3,172.5 L 337.5,173.6 L 338.8,174.7 L 340.0,175.8 L 341.2,176.9 L 342.5,178.0 L 343.8,179.0 L 345.0,180.1 L 346.3,181.1 L 347.5,182.2 L 348.8,183.2 L 350.0,184.2 L 351.2,185.2 L 352.5,186.1 L 353.8,187.1 L 355.0,188.0 L 356.2,189.0 L 357.5,189.9 L 358.8,190.8 L 360.0,191.7 L 361.2,192.5 L 362.5,193.4 L 363.8,194.2 L 365.0,195.0 L 366.2,195.8 L 367.5,196.6 L 368.8,197.4 L 370.0,198.1 L 371.3,198.8 L 372.5,199.5 L 373.8,200.2 L 375.0,200.9 L 376.2,201.5 L 377.5,202.2 L 378.8,202.8 L 380.0,203.4 L 381.2,204.0 L 382.5,204.5 L 383.8,205.0 L 385.0,205.6 L 386.2,206.0 L 387.5,206.5 L 388.8,207.0 L 390.0,207.4 L 391.2,207.8 L 392.5,208.2 L 393.8,208.6 L 395.0,208.9 L 396.3,209.2 L 397.5,209.5 L 398.8,209.8 L 400.0,210.1 L 401.2,210.3 L 402.5,210.5 L 403.8,210.7 L 405.0,210.9 L 406.2,211.0 L 407.5,211.1 L 408.8,211.2 L 410.0,211.3 L 411.2,211.4 L 412.5,211.4 L 413.8,211.4 L 415.0,211.4 L 416.2,211.4 L 417.5,211.3 L 418.8,211.3 L 420.0,211.2 L 421.3,211.0 L 422.5,210.9 L 423.8,210.7 L 425.0,210.5 L 426.2,210.3 L 427.5,210.1 L 428.8,209.8 L 430.0,209.6 L 431.3,209.3 L 432.5,208.9 L 433.8,208.6 L 435.0,208.2 L 436.2,207.9 L 437.5,207.4 L 438.8,207.0 L 440.0,206.6 L 441.2,206.1 L 442.5,205.6 L 443.8,205.1 L 445.0,204.6 L 446.2,204.0 L 447.5,203.5 L 448.8,202.9 L 450.0,202.3 L 451.3,201.6 L 452.5,201.0 L 453.8,200.3 L 455.0,199.6 L 456.2,198.9 L 457.5,198.2 L 458.8,197.4 L 460.0,196.7 L 461.3,195.9 L 462.5,195.1 L 463.8,194.3 L 465.0,193.5 L 466.2,192.6 L 467.5,191.8 L 468.8,190.9 L 470.0,190.0 L 471.2,189.1 L 472.5,188.1 L 473.7,187.2 L 475.0,186.2 L 476.3,185.3 L 477.5,184.3 L 478.8,183.3 L 480.0,182.3 L 481.2,181.2 L 482.5,180.2 L 483.8,179.2 L 485.0,178.1 L 486.3,177.0 L 487.5,175.9 L 488.8,174.8 L 490.0,173.7 L 491.2,172.6 L 492.5,171.5 L 493.8,170.3 L 495.0,169.2 L 496.2,168.0 L 497.5,166.9 L 498.7,165.7 L 500.0,164.5 L 501.3,163.3 L 502.5,162.1 L 503.8,160.9 L 505.0,159.7 L 506.2,158.5 L 507.5,157.2 L 508.8,156.0 L 510.0,154.8 L 511.3,153.5 L 512.5,152.3 L 513.8,151.0 L 515.0,149.8 L 516.2,148.5 L 517.5,147.3 L 518.8,146.0 L 520.0,144.8 L 521.2,143.5 L 522.5,142.2 L 523.8,141.0 L 525.0,139.7 L 526.3,138.4 L 527.5,137.2 L 528.8,135.9 L 530.0,134.6 L 531.2,133.4 L 532.5,132.1 L 533.8,130.9 L 535.0,129.6 L 536.3,128.4 L 537.5,127.1 L 538.8,125.9 L 540.0,124.6 L 541.2,123.4 L 542.5,122.2 L 543.8,121.0 L 545.0,119.7 L 546.2,118.5 L 547.5,117.3 L 548.8,116.1 L 550.0,114.9 L 551.3,113.8 L 552.5,112.6 L 553.8,111.4 L 555.0,110.3 L 556.2,109.1 L 557.5,108.0 L 558.8,106.9 L 560.0,105.8" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <text x="111.9" y="107.5" fill="#94a3b8" font-size="12" text-anchor="start" font-weight="700">sin x</text>
  <path d="M 60.0,179.8 L 61.2,177.7 L 62.5,175.7 L 63.8,173.5 L 65.0,171.3 L 66.2,169.1 L 67.5,166.8 L 68.8,164.5 L 70.0,162.2 L 71.2,159.8 L 72.5,157.3 L 73.8,154.9 L 75.0,152.4 L 76.2,149.9 L 77.5,147.4 L 78.8,144.9 L 80.0,142.4 L 81.2,139.9 L 82.5,137.3 L 83.8,134.8 L 85.0,132.3 L 86.2,129.8 L 87.5,127.3 L 88.8,124.8 L 90.0,122.4 L 91.2,120.0 L 92.5,117.6 L 93.8,115.2 L 95.0,112.9 L 96.2,110.6 L 97.5,108.4 L 98.8,106.2 L 100.0,104.1 L 101.2,102.0 L 102.5,100.0 L 103.8,98.1 L 105.0,96.2 L 106.2,94.3 L 107.5,92.6 L 108.8,90.9 L 110.0,89.2 L 111.2,87.7 L 112.5,86.2 L 113.8,84.8 L 115.0,83.5 L 116.2,82.2 L 117.5,81.0 L 118.8,79.9 L 120.0,78.9 L 121.2,78.0 L 122.5,77.1 L 123.8,76.4 L 125.0,75.6 L 126.2,75.0 L 127.5,74.5 L 128.8,74.0 L 130.0,73.6 L 131.2,73.3 L 132.5,73.0 L 133.8,72.8 L 135.0,72.7 L 136.2,72.7 L 137.5,72.7 L 138.8,72.7 L 140.0,72.9 L 141.2,73.1 L 142.5,73.3 L 143.8,73.6 L 145.0,74.0 L 146.2,74.3 L 147.5,74.8 L 148.8,75.3 L 150.0,75.8 L 151.2,76.3 L 152.5,76.9 L 153.8,77.5 L 155.0,78.1 L 156.2,78.7 L 157.5,79.4 L 158.8,80.1 L 160.0,80.7 L 161.2,81.4 L 162.5,82.1 L 163.8,82.8 L 165.0,83.5 L 166.2,84.2 L 167.5,84.8 L 168.8,85.5 L 170.0,86.1 L 171.2,86.7 L 172.5,87.3 L 173.8,87.9 L 175.0,88.5 L 176.2,89.0 L 177.5,89.5 L 178.8,89.9 L 180.0,90.4 L 181.2,90.7 L 182.5,91.1 L 183.8,91.4 L 185.0,91.7 L 186.2,91.9 L 187.5,92.1 L 188.8,92.2 L 190.0,92.3 L 191.2,92.4 L 192.5,92.4 L 193.8,92.3 L 195.0,92.3 L 196.2,92.1 L 197.5,92.0 L 198.8,91.7 L 200.0,91.5 L 201.2,91.2 L 202.5,90.9 L 203.8,90.5 L 205.0,90.1 L 206.3,89.6 L 207.5,89.1 L 208.8,88.6 L 210.0,88.1 L 211.2,87.5 L 212.5,86.9 L 213.8,86.3 L 215.0,85.7 L 216.2,85.0 L 217.5,84.4 L 218.8,83.7 L 220.0,83.0 L 221.2,82.3 L 222.5,81.6 L 223.8,80.9 L 225.0,80.3 L 226.2,79.6 L 227.5,78.9 L 228.8,78.3 L 230.0,77.7 L 231.2,77.0 L 232.5,76.5 L 233.8,75.9 L 235.0,75.4 L 236.2,74.9 L 237.5,74.5 L 238.8,74.1 L 240.0,73.7 L 241.2,73.4 L 242.5,73.1 L 243.8,72.9 L 245.0,72.8 L 246.3,72.7 L 247.5,72.7 L 248.8,72.7 L 250.0,72.8 L 251.3,73.0 L 252.5,73.2 L 253.8,73.5 L 255.0,73.9 L 256.2,74.3 L 257.5,74.8 L 258.8,75.5 L 260.0,76.1 L 261.2,76.9 L 262.5,77.7 L 263.8,78.6 L 265.0,79.6 L 266.2,80.7 L 267.5,81.9 L 268.8,83.1 L 270.0,84.4 L 271.3,85.8 L 272.5,87.2 L 273.8,88.8 L 275.0,90.4 L 276.3,92.1 L 277.5,93.8 L 278.8,95.6 L 280.0,97.5 L 281.2,99.4 L 282.5,101.4 L 283.8,103.5 L 285.0,105.6 L 286.2,107.8 L 287.5,110.0 L 288.8,112.2 L 290.0,114.5 L 291.2,116.9 L 292.5,119.3 L 293.8,121.7 L 295.0,124.1 L 296.2,126.6 L 297.5,129.0 L 298.8,131.5 L 300.0,134.1 L 301.3,136.6 L 302.5,139.1 L 303.8,141.6 L 305.0,144.2 L 306.2,146.7 L 307.5,149.2 L 308.8,151.7 L 310.0,154.2 L 311.3,156.6 L 312.5,159.1 L 313.8,161.5 L 315.0,163.8 L 316.2,166.1 L 317.5,168.4 L 318.8,170.7 L 320.0,172.9 L 321.2,175.0 L 322.5,177.1 L 323.8,179.2 L 325.0,181.2 L 326.2,183.1 L 327.5,184.9 L 328.8,186.7 L 330.0,188.4 L 331.2,190.1 L 332.5,191.7 L 333.8,193.2 L 335.0,194.6 L 336.3,196.0 L 337.5,197.3 L 338.8,198.5 L 340.0,199.6 L 341.2,200.7 L 342.5,201.6 L 343.8,202.5 L 345.0,203.3 L 346.3,204.1 L 347.5,204.7 L 348.8,205.3 L 350.0,205.8 L 351.2,206.2 L 352.5,206.6 L 353.8,206.9 L 355.0,207.1 L 356.2,207.2 L 357.5,207.3 L 358.8,207.3 L 360.0,207.3 L 361.2,207.2 L 362.5,207.0 L 363.8,206.8 L 365.0,206.5 L 366.2,206.2 L 367.5,205.8 L 368.8,205.4 L 370.0,204.9 L 371.3,204.5 L 372.5,203.9 L 373.8,203.4 L 375.0,202.8 L 376.2,202.2 L 377.5,201.5 L 378.8,200.9 L 380.0,200.2 L 381.2,199.5 L 382.5,198.9 L 383.8,198.2 L 385.0,197.5 L 386.2,196.8 L 387.5,196.1 L 388.8,195.4 L 390.0,194.8 L 391.2,194.1 L 392.5,193.5 L 393.8,192.9 L 395.0,192.3 L 396.3,191.8 L 397.5,191.2 L 398.8,190.7 L 400.0,190.2 L 401.2,189.8 L 402.5,189.4 L 403.8,189.0 L 405.0,188.7 L 406.2,188.4 L 407.5,188.2 L 408.8,188.0 L 410.0,187.8 L 411.2,187.7 L 412.5,187.6 L 413.8,187.6 L 415.0,187.6 L 416.2,187.7 L 417.5,187.8 L 418.8,188.0 L 420.0,188.2 L 421.3,188.4 L 422.5,188.7 L 423.8,189.0 L 425.0,189.4 L 426.2,189.8 L 427.5,190.2 L 428.8,190.7 L 430.0,191.2 L 431.3,191.7 L 432.5,192.2 L 433.8,192.8 L 435.0,193.4 L 436.2,194.1 L 437.5,194.7 L 438.8,195.4 L 440.0,196.0 L 441.2,196.7 L 442.5,197.4 L 443.8,198.1 L 445.0,198.8 L 446.2,199.5 L 447.5,200.1 L 448.8,200.8 L 450.0,201.5 L 451.3,202.1 L 452.5,202.7 L 453.8,203.3 L 455.0,203.9 L 456.2,204.4 L 457.5,204.9 L 458.8,205.4 L 460.0,205.8 L 461.3,206.1 L 462.5,206.5 L 463.8,206.8 L 465.0,207.0 L 466.2,207.2 L 467.5,207.3 L 468.8,207.3 L 470.0,207.3 L 471.2,207.3 L 472.5,207.1 L 473.7,206.9 L 475.0,206.6 L 476.3,206.3 L 477.5,205.9 L 478.8,205.4 L 480.0,204.8 L 481.2,204.2 L 482.5,203.4 L 483.8,202.6 L 485.0,201.7 L 486.3,200.8 L 487.5,199.7 L 488.8,198.6 L 490.0,197.4 L 491.2,196.1 L 492.5,194.8 L 493.8,193.4 L 495.0,191.9 L 496.2,190.3 L 497.5,188.6 L 498.7,186.9 L 500.0,185.1 L 501.3,183.3 L 502.5,181.4 L 503.8,179.4 L 505.0,177.4 L 506.2,175.3 L 507.5,173.1 L 508.8,170.9 L 510.0,168.7 L 511.3,166.4 L 512.5,164.1 L 513.8,161.7 L 515.0,159.3 L 516.2,156.9 L 517.5,154.5 L 518.8,152.0 L 520.0,149.5 L 521.2,147.0 L 522.5,144.5 L 523.8,141.9 L 525.0,139.4 L 526.3,136.9 L 527.5,134.4 L 528.8,131.8 L 530.0,129.3 L 531.2,126.8 L 532.5,124.4 L 533.8,121.9 L 535.0,119.5 L 536.3,117.2 L 537.5,114.8 L 538.8,112.5 L 540.0,110.2 L 541.2,108.0 L 542.5,105.8 L 543.8,103.7 L 545.0,101.7 L 546.2,99.7 L 547.5,97.7 L 548.8,95.8 L 550.0,94.0 L 551.3,92.3 L 552.5,90.6 L 553.8,89.0 L 555.0,87.4 L 556.2,86.0 L 557.5,84.6 L 558.8,83.2 L 560.0,82.0" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="178.9" y="79.5" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">sin x + sin 3x/3</text>
  <text x="300.0" y="250.0" fill="#475569" font-size="11" text-anchor="middle">thêm hài bậc 3 làm đỉnh và đáy phẳng hơn (gần 'vuông' hơn)</text>
</svg>

**Quan sát**: Đỉnh và đáy "**bẹt**" hơn so với $\\sin x$ đơn lẻ. Đó là bước đầu trên đường tới sóng vuông. Nếu thêm nữa $\\frac{\\sin(5x)}{5}$, $\\frac{\\sin(7x)}{7}$, ..., dạng sẽ càng giống sóng vuông.

### Lời giải bài 5

Bảng cho cả $\\cos x$ và $\\sin(x + \\frac{\\pi}{2})$:

| $x$ | $\\cos x$ | $x + \\frac{\\pi}{2}$ | $\\sin(x + \\frac{\\pi}{2})$ | Khớp? |
|---:|---:|---:|---:|:---:|
| $0$ | $1$ | $\\frac{\\pi}{2}$ | $1$ | ✓ |
| $\\frac{\\pi}{4}$ | $\\frac{\\sqrt{2}}{2} \\approx 0.707$ | $\\frac{3\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | ✓ |
| $\\frac{\\pi}{2}$ | $0$ | $\\pi$ | $0$ | ✓ |
| $\\frac{3\\pi}{4}$ | $-\\frac{\\sqrt{2}}{2}$ | $\\frac{5\\pi}{4}$ | $-\\frac{\\sqrt{2}}{2}$ | ✓ |
| $\\pi$ | $-1$ | $\\frac{3\\pi}{2}$ | $-1$ | ✓ |
| $\\frac{5\\pi}{4}$ | $-\\frac{\\sqrt{2}}{2}$ | $\\frac{7\\pi}{4}$ | $-\\frac{\\sqrt{2}}{2}$ | ✓ |
| $\\frac{3\\pi}{2}$ | $0$ | $2\\pi$ | $0$ | ✓ |
| $\\frac{7\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{9\\pi}{4} = \\frac{\\pi}{4} + 2\\pi$ | $\\frac{\\sqrt{2}}{2}$ | ✓ |
| $2\\pi$ | $1$ | $\\frac{5\\pi}{2} = \\frac{\\pi}{2} + 2\\pi$ | $1$ | ✓ |

**Kết luận**: cả 9 điểm khớp hoàn toàn. Do tính chất hàm số (nếu hai hàm trùng tại đủ nhiều điểm trong một chu kỳ và đều liên tục, chúng đồng nhất), ta có $\\cos x = \\sin(x + \\frac{\\pi}{2})$ với mọi $x$. ✓

(Chứng minh hình thức: tại Lesson 03, đã thấy hai điểm $(\\cos\\theta, \\sin\\theta)$ và $(\\cos(\\theta+\\frac{\\pi}{2}), \\sin(\\theta+\\frac{\\pi}{2}))$ cách nhau bởi phép quay $+\\frac{\\pi}{2}$. Phép quay $+\\frac{\\pi}{2}$ biến điểm $(a, b)$ thành $(-b, a)$. Vậy $\\cos(\\theta+\\frac{\\pi}{2}) = -\\sin\\theta$ và $\\sin(\\theta+\\frac{\\pi}{2}) = \\cos\\theta$. Cái thứ hai chính là điều cần chứng minh.)

### Lời giải bài 6

Xem file [solutions.go](./solutions.go). Tóm tắt approach:

- \`analyzeWave\`: trả về $\\text{period} = \\frac{2\\pi}{|B|}$, $\\text{freq} = \\frac{1}{\\text{period}}$, $\\text{rangeMin} = D-|A|$, $\\text{rangeMax} = D+|A|$.
- \`samplePoints\`: chia $[xMin, xMax]$ thành $n-1$ khoảng đều, tính $y = A\\sin(Bx+C) + D$ tại mỗi điểm.
- \`fourierSquare\`: tổng $\\frac{4}{\\pi} \\cdot \\sum_{k=0}^{nHarmonics-1} \\frac{\\sin((2k+1)x)}{2k+1}$.
- Demo cuối in bảng 12 điểm cho $y = 3\\sin(2x - \\frac{\\pi}{3}) + 1$ cùng chu kỳ và range.

**Độ phức tạp**: \`analyzeWave\` $O(1)$, \`samplePoints\` $O(n)$, \`fourierSquare\` $O(nHarmonics)$.

---

## Tiếp theo

- File code: [solutions.go](./solutions.go)
- Minh họa tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/)
- Bài sau: [Lesson 05 — Identity và định lý cosin](../lesson-05-identities-cosine-law/)
- Quay lại lộ trình Trigonometry: [Tầng 2 Trigonometry](../)
`;
