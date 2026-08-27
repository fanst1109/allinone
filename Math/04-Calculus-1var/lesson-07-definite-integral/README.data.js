// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-07-definite-integral/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tích phân xác định

## Mục tiêu

- Hiểu **tích phân xác định** $\\int_a^b f(x)\\,dx$ như diện tích dưới đồ thị.
- Định nghĩa qua **tổng Riemann**.
- **Định lý cơ bản giải tích** (FTC) — kết nối đạo hàm và tích phân.
- Tính chất của tích phân xác định.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

---

## 1. Vấn đề diện tích

💡 **Câu hỏi**: Diện tích hình giới hạn bởi $y = x^2$, trục Ox, và 2 đường thẳng $x = 0$, $x = 1$ là bao nhiêu?

Đây là hình **cong** — không có công thức diện tích thẳng. Phải dùng tích phân.

💡 **Trực giác — "cộng vô số lát mỏng"**. Hình dung bạn cắt vùng cần tính thành **rất nhiều dải đứng mỏng** (như cắt một ổ bánh mì thành lát). Mỗi lát rộng $\\Delta x$ rất nhỏ, cao gần bằng $f(x)$ tại vị trí đó, nên diện tích mỗi lát $\\approx f(x) \\cdot \\Delta x$ (gần như một hình chữ nhật mảnh). Diện tích cả vùng = **cộng tất cả các lát**. Cắt càng mỏng → tổng các lát càng khít với hình cong thật. Tích phân chính là **giới hạn của phép cộng đó khi lát mỏng dần về 0** — ký hiệu $\\int$ là chữ "S" (Sum) kéo dài, $dx$ là "bề rộng vô cùng nhỏ" của một lát.

Hình dung — vùng dưới $y = x^2$ trên $[0, 1]$, xấp xỉ bằng các dải đứng:

<svg viewBox="0 0 440 280" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Vùng dưới y = x² trên [0, 1] xấp xỉ bằng 8 dải đứng rộng Δx = 1/8, cao f(xᵢ) tại mép phải">
  <defs><marker id="ar4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="210.0" y1="230.0" x2="210.0" y2="23.0"/>
<line x1="360.0" y1="230.0" x2="360.0" y2="23.0"/>
<line x1="60.0" y1="140.0" x2="420.0" y2="140.0"/>
<line x1="60.0" y1="50.0" x2="420.0" y2="50.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="442.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="1.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text x="434.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="11.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="210.0" y1="226.0" x2="210.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="210.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">0.5</text>
  <line x1="360.0" y1="226.0" x2="360.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="360.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="56.0" y1="140.0" x2="64.0" y2="140.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="144.0" fill="#475569" font-size="11" text-anchor="end">0.5</text>
  <line x1="56.0" y1="50.0" x2="64.0" y2="50.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="54.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <rect x="60.0" y="227.2" width="37.5" height="2.8" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="97.5" y="218.8" width="37.5" height="11.2" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="135.0" y="204.7" width="37.5" height="25.3" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="172.5" y="185.0" width="37.5" height="45.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="210.0" y="159.7" width="37.5" height="70.3" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="247.5" y="128.8" width="37.5" height="101.2" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="285.0" y="92.2" width="37.5" height="137.8" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="322.5" y="50.0" width="37.5" height="180.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <path d="M 60.0,230.0 L 62.8,230.0 L 65.5,229.9 L 68.2,229.9 L 71.0,229.8 L 73.8,229.6 L 76.5,229.5 L 79.2,229.3 L 82.0,229.0 L 84.8,228.8 L 87.5,228.5 L 90.2,228.2 L 93.0,227.8 L 95.8,227.4 L 98.5,227.0 L 101.2,226.6 L 104.0,226.1 L 106.8,225.6 L 109.5,225.1 L 112.2,224.5 L 115.0,223.9 L 117.8,223.3 L 120.5,222.7 L 123.2,222.0 L 126.0,221.3 L 128.8,220.5 L 131.5,219.8 L 134.2,219.0 L 137.0,218.1 L 139.8,217.3 L 142.5,216.4 L 145.2,215.5 L 148.0,214.5 L 150.8,213.5 L 153.5,212.5 L 156.2,211.5 L 159.0,210.4 L 161.8,209.3 L 164.5,208.2 L 167.2,207.0 L 170.0,205.8 L 172.8,204.6 L 175.5,203.3 L 178.2,202.0 L 181.0,200.7 L 183.8,199.4 L 186.5,198.0 L 189.2,196.6 L 192.0,195.2 L 194.8,193.7 L 197.5,192.2 L 200.2,190.7 L 203.0,189.1 L 205.8,187.5 L 208.5,185.9 L 211.3,184.2 L 214.0,182.6 L 216.8,180.9 L 219.5,179.1 L 222.3,177.3 L 225.0,175.5 L 227.8,173.7 L 230.5,171.9 L 233.3,170.0 L 236.0,168.0 L 238.8,166.1 L 241.5,164.1 L 244.2,162.1 L 247.0,160.1 L 249.8,158.0 L 252.5,155.9 L 255.2,153.8 L 258.0,151.6 L 260.8,149.4 L 263.5,147.2 L 266.2,144.9 L 269.0,142.6 L 271.8,140.3 L 274.5,138.0 L 277.2,135.6 L 280.0,133.2 L 282.8,130.8 L 285.5,128.3 L 288.2,125.8 L 291.0,123.3 L 293.8,120.7 L 296.5,118.1 L 299.2,115.5 L 302.0,112.9 L 304.8,110.2 L 307.5,107.5 L 310.2,104.7 L 313.0,102.0 L 315.8,99.2 L 318.5,96.4 L 321.3,93.5 L 324.0,90.6 L 326.8,87.7 L 329.5,84.7 L 332.2,81.8 L 335.0,78.7 L 337.8,75.7 L 340.5,72.6 L 343.2,69.5 L 346.0,66.4 L 348.8,63.2 L 351.5,60.1 L 354.2,56.8 L 357.0,53.6 L 359.8,50.3 L 362.5,47.0 L 365.2,43.6 L 368.0,40.3 L 370.8,36.9 L 373.5,33.4 L 376.2,30.0 L 379.0,26.5 L 381.8,23.0 L 384.5,19.4 L 387.2,15.8 L 390.0,12.2" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="368.0" y="46.0" fill="#475569" font-size="11" text-anchor="start">cao f(1) = 1</text>
  <text x="180.0" y="68.0" fill="#1d4ed8" font-size="13" text-anchor="start" font-weight="700">y = x²</text>
  <line x1="210.0" y1="253.4" x2="247.5" y2="253.4" stroke="#15803d" stroke-width="1.5"/>
  <text x="228.8" y="267.4" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Δx = 1/8</text>
  <text x="200.0" y="268.0" fill="#475569" font-size="11" text-anchor="middle">mỗi dải rộng Δx, cao f(xᵢ); cộng hết = xấp xỉ diện tích dưới đường cong</text>
</svg>

Cắt mịn hơn (nhiều dải hơn) → đường răng cưa phía trên càng bám sát parabol → tổng diện tích các dải càng gần $\\frac{1}{3}$ thật.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng công thức hình học quen thuộc?"* Vì cạnh trên là đường cong $y = x^2$, không phải đoạn thẳng — không có công thức diện tích đa giác/hình tròn nào áp được. Ý tưởng giải tích: **xấp xỉ** bằng nhiều hình chữ nhật mỏng rồi cho số hình $\\to \\infty$.
- *"Diện tích này có ra số cụ thể không?"* Có, và bằng đúng $\\frac{1}{3}$ (sẽ tính ở mục 2 + 3). Đường cong vẫn cho diện tích hữu hạn xác định.

### 📝 Tóm tắt mục 1

- Diện tích dưới đường **cong** không có công thức hình học trực tiếp.
- Giải pháp: xấp xỉ bằng hình chữ nhật mỏng, lấy giới hạn → tích phân.
- Trực giác: tích phân = **cộng vô số lát mỏng** $f(x) \\cdot \\Delta x$; $\\int$ = "S" (Sum) kéo dài.
- Ví dụ dẫn dắt $\\int_0^1 x^2\\,dx = \\frac{1}{3}$ (tính ở mục 2-3).

---

## 2. Tổng Riemann — Định nghĩa tích phân

💡 **Ý tưởng**: Chia khoảng $[a, b]$ thành $n$ đoạn nhỏ, mỗi đoạn rộng $\\Delta x = (b-a)/n$. Trên mỗi đoạn, **xấp xỉ diện tích bằng hình chữ nhật** chiều cao $f(x_i)$.

$$\\text{Tổng Riemann: } S_n = \\sum_{i=1}^n f(x_i) \\cdot \\Delta x$$

Khi $n \\to \\infty$ (mảnh càng mỏng), tổng $\\to$ diện tích thật.

$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum f(x_i) \\cdot \\Delta x$$

### Ví dụ số: $\\int_0^1 x^2\\,dx$

Chia $[0, 1]$ thành $n$ đoạn, dùng cận phải. $x_i = i/n$, $\\Delta x = 1/n$.

$$S_n = \\sum_{i=1}^n \\left(\\frac{i}{n}\\right)^2 \\cdot \\frac{1}{n} = \\frac{1}{n^3} \\cdot \\sum i^2$$

Dùng công thức $\\sum i^2 = n(n+1)(2n+1)/6$:

$$S_n = \\frac{n(n+1)(2n+1)}{6n^3} = \\frac{(1 + 1/n)(2 + 1/n)}{6}$$

Khi $n \\to \\infty$: $S_n \\to (1 \\cdot 2)/6 =$ **$\\frac{1}{3}$**.

$\\to \\int_0^1 x^2\\,dx =$ **$\\frac{1}{3}$**.

**Kiểm tra bằng số**:
- $n=10$: $S \\approx 0.385$.
- $n=100$: $S \\approx 0.3383$.
- $n=1000$: $S \\approx 0.3338$.
- $\\to \\frac{1}{3} \\approx 0.3333$.

### Ba cách chọn chiều cao hình chữ nhật — Trái / Phải / Giữa

Mỗi dải nằm trên một đoạn nhỏ $[x_{i-1}, x_i]$. Chiều cao hình chữ nhật là $f$ tại **một điểm** trong đoạn đó — chọn điểm nào thì có 3 quy ước phổ biến:

| Cách chọn | Điểm lấy chiều cao $x_i^*$ | Với $f$ **tăng** |
|-----------|---------------------------|------------------|
| **Trái (Left)** | mép trái $x_{i-1}$ | thấp hơn thật (underestimate) |
| **Phải (Right)** | mép phải $x_i$ | cao hơn thật (overestimate) |
| **Giữa (Mid)** | trung điểm $\\frac{x_{i-1}+x_i}{2}$ | thường chính xác nhất |

Cùng đường cong tăng, 3 cách đặt chiều cao dải (mỗi cột xanh là một dải):

<svg viewBox="0 0 600 205" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Cùng đường cong tăng, ba cách chọn chiều cao dải Riemann: mép trái (thiếu), mép phải (dư), trung điểm (khớp tốt nhất)">
  <defs><marker id="ar5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="95.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">LEFT (mép trái)</text>
  <line x1="14.0" y1="150.0" x2="222.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <line x1="20.0" y1="156.0" x2="20.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <text x="214.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="28.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <rect x="20.0" y="129.0" width="37.5" height="21.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="57.5" y="125.5" width="37.5" height="24.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="95.0" y="115.0" width="37.5" height="35.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="132.5" y="97.5" width="37.5" height="52.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <path d="M 20.0,129.0 L 22.8,129.0 L 25.5,128.9 L 28.2,128.8 L 31.0,128.7 L 33.8,128.5 L 36.5,128.3 L 39.2,128.1 L 42.0,127.8 L 44.8,127.5 L 47.5,127.1 L 50.2,126.7 L 53.0,126.3 L 55.8,125.8 L 58.5,125.3 L 61.2,124.8 L 64.0,124.2 L 66.8,123.6 L 69.5,122.9 L 72.2,122.2 L 75.0,121.5 L 77.8,120.7 L 80.5,119.9 L 83.2,119.0 L 86.0,118.2 L 88.8,117.2 L 91.5,116.3 L 94.3,115.3 L 97.0,114.2 L 99.8,113.2 L 102.5,112.1 L 105.2,110.9 L 108.0,109.7 L 110.8,108.5 L 113.5,107.2 L 116.3,105.9 L 119.0,104.6 L 121.8,103.2 L 124.5,101.8 L 127.3,100.4 L 130.0,98.9 L 132.8,97.4 L 135.5,95.8 L 138.2,94.2 L 141.0,92.6 L 143.8,90.9 L 146.5,89.2 L 149.2,87.4 L 152.0,85.6 L 154.8,83.8 L 157.5,81.9 L 160.2,80.0 L 163.0,78.1 L 165.8,76.1 L 168.5,74.1 L 171.3,72.1 L 174.0,70.0 L 176.8,67.8 L 179.5,65.7 L 182.3,63.5 L 185.0,61.2" fill="none" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
  <text x="95.0" y="175.0" fill="#475569" font-size="11" text-anchor="middle">cong ở trên, dải tụt xuống</text>
  <text x="95.0" y="191.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">→ dải THẤP: underestimate</text>
  <text x="295.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">RIGHT (mép phải)</text>
  <line x1="214.0" y1="150.0" x2="422.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <line x1="220.0" y1="156.0" x2="220.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <text x="414.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="228.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <rect x="220.0" y="125.5" width="37.5" height="24.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="257.5" y="115.0" width="37.5" height="35.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="295.0" y="97.5" width="37.5" height="52.5" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="332.5" y="73.0" width="37.5" height="77.0" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <path d="M 220.0,129.0 L 222.8,129.0 L 225.5,128.9 L 228.2,128.8 L 231.0,128.7 L 233.8,128.5 L 236.5,128.3 L 239.2,128.1 L 242.0,127.8 L 244.8,127.5 L 247.5,127.1 L 250.2,126.7 L 253.0,126.3 L 255.8,125.8 L 258.5,125.3 L 261.2,124.8 L 264.0,124.2 L 266.8,123.6 L 269.5,122.9 L 272.2,122.2 L 275.0,121.5 L 277.8,120.7 L 280.5,119.9 L 283.2,119.0 L 286.0,118.2 L 288.8,117.2 L 291.5,116.3 L 294.2,115.3 L 297.0,114.2 L 299.8,113.2 L 302.5,112.1 L 305.2,110.9 L 308.0,109.7 L 310.8,108.5 L 313.5,107.2 L 316.2,105.9 L 319.0,104.6 L 321.8,103.2 L 324.5,101.8 L 327.2,100.4 L 330.0,98.9 L 332.8,97.4 L 335.5,95.8 L 338.2,94.2 L 341.0,92.6 L 343.8,90.9 L 346.5,89.2 L 349.2,87.4 L 352.0,85.6 L 354.8,83.8 L 357.5,81.9 L 360.2,80.0 L 363.0,78.1 L 365.8,76.1 L 368.5,74.1 L 371.2,72.1 L 374.0,70.0 L 376.8,67.8 L 379.5,65.7 L 382.2,63.5 L 385.0,61.2" fill="none" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
  <text x="295.0" y="175.0" fill="#475569" font-size="11" text-anchor="middle">cong ở dưới, dải nhô lên</text>
  <text x="295.0" y="191.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">→ dải CAO: overestimate</text>
  <text x="495.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">MID (trung điểm)</text>
  <line x1="414.0" y1="150.0" x2="622.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <line x1="420.0" y1="156.0" x2="420.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <text x="614.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="428.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <rect x="420.0" y="128.1" width="37.5" height="21.9" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="457.5" y="121.1" width="37.5" height="28.9" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="495.0" y="107.1" width="37.5" height="42.9" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <rect x="532.5" y="86.1" width="37.5" height="63.9" rx="0" fill="#93c5fd" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1"/>
  <path d="M 420.0,129.0 L 422.8,129.0 L 425.5,128.9 L 428.2,128.8 L 431.0,128.7 L 433.8,128.5 L 436.5,128.3 L 439.2,128.1 L 442.0,127.8 L 444.8,127.5 L 447.5,127.1 L 450.2,126.7 L 453.0,126.3 L 455.8,125.8 L 458.5,125.3 L 461.2,124.8 L 464.0,124.2 L 466.8,123.6 L 469.5,122.9 L 472.2,122.2 L 475.0,121.5 L 477.8,120.7 L 480.5,119.9 L 483.2,119.0 L 486.0,118.2 L 488.8,117.2 L 491.5,116.3 L 494.2,115.3 L 497.0,114.2 L 499.8,113.2 L 502.5,112.1 L 505.2,110.9 L 508.0,109.7 L 510.8,108.5 L 513.5,107.2 L 516.2,105.9 L 519.0,104.6 L 521.8,103.2 L 524.5,101.8 L 527.2,100.4 L 530.0,98.9 L 532.8,97.4 L 535.5,95.8 L 538.2,94.2 L 541.0,92.6 L 543.8,90.9 L 546.5,89.2 L 549.2,87.4 L 552.0,85.6 L 554.8,83.8 L 557.5,81.9 L 560.2,80.0 L 563.0,78.1 L 565.8,76.1 L 568.5,74.1 L 571.2,72.1 L 574.0,70.0 L 576.8,67.8 L 579.5,65.7 L 582.2,63.5 L 585.0,61.2" fill="none" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
  <text x="495.0" y="175.0" fill="#475569" font-size="11" text-anchor="middle">dải khớp giữa, lệch ít</text>
  <text x="495.0" y="191.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">→ gần nhất</text>
</svg>

Bất kể chọn cách nào, khi $n \\to \\infty$ cả ba **cùng tiến về một số** — đó là tích phân xác định. Chọn cách nào chỉ ảnh hưởng **tốc độ hội tụ**: Trái/Phải sai số $\\sim O(1/n)$, Giữa sai số $\\sim O(1/n^2)$ (nhanh hơn hẳn).

### Walk-through tổng Riemann từng bước — $\\int_0^1 x^2\\,dx$ với $n = 4$ (cận phải)

Làm tay từng bước, không bỏ qua phép nào.

**Bước 1 — tính bề rộng dải.** $\\Delta x = \\dfrac{b - a}{n} = \\dfrac{1 - 0}{4} = 0.25$.

**Bước 2 — liệt kê điểm chia.** $x_0 = 0,\\ x_1 = 0.25,\\ x_2 = 0.5,\\ x_3 = 0.75,\\ x_4 = 1$.

**Bước 3 — chọn điểm lấy chiều cao (cận phải).** $x_i^* = x_i$ với $i = 1..4$: tức $0.25,\\ 0.5,\\ 0.75,\\ 1$.

**Bước 4 — tính chiều cao $f(x_i^*) = (x_i^*)^2$ và diện tích mỗi dải $f(x_i^*)\\cdot\\Delta x$.**

| $i$ | $x_i^*$ | $f(x_i^*)=(x_i^*)^2$ | $f(x_i^*)\\cdot\\Delta x$ |
|-----|---------|----------------------|--------------------------|
| 1 | 0.25 | 0.0625 | $0.0625 \\times 0.25 = 0.015625$ |
| 2 | 0.50 | 0.2500 | $0.2500 \\times 0.25 = 0.062500$ |
| 3 | 0.75 | 0.5625 | $0.5625 \\times 0.25 = 0.140625$ |
| 4 | 1.00 | 1.0000 | $1.0000 \\times 0.25 = 0.250000$ |
| | | **tổng $S_4$ (phải)** | **0.468750** |

**Bước 5 — cộng lại.** $S_4 \\text{ (phải)} = 0.015625 + 0.0625 + 0.140625 + 0.25 = 0.46875$.

So với thật $\\frac13 \\approx 0.3333$: cận phải cho $0.46875$ — cao hơn (overestimate) vì $x^2$ tăng. Làm tương tự cận **trái** ($x_i^* = 0, 0.25, 0.5, 0.75$) ra $S_4 \\text{ (trái)} = 0.21875$ (thấp hơn). Cận **giữa** ($x_i^* = 0.125, 0.375, 0.625, 0.875$) ra $S_4 \\text{ (giữa)} = 0.328125$ — gần nhất. Giá trị thật luôn **kẹp giữa** trái và phải.

### Bảng tổng hội tụ khi $n$ tăng — $\\int_0^1 x^2\\,dx$

| $n$ | $S_n$ (trái) | $S_n$ (phải) | $S_n$ (giữa) | sai số (giữa) |
|-----|--------------|--------------|--------------|---------------|
| 4    | 0.21875  | 0.46875  | 0.328125 | 0.0052 |
| 10   | 0.285000 | 0.385000 | 0.332500 | 0.0008 |
| 100  | 0.328350 | 0.338350 | 0.333325 | 8.3e-6 |
| 1000 | 0.332834 | 0.333834 | 0.333333 | 8.3e-8 |
| $\\infty$ | $\\frac13$ | $\\frac13$ | $\\frac13$ | 0 |

Đọc bảng: trái dâng lên, phải hạ xuống, cả hai **kẹp dần** $\\frac13$; giữa đã sát ngay từ $n$ nhỏ. Tăng $n$ gấp 10 → sai số giữa giảm ~100 lần (bậc 2), còn trái/phải chỉ giảm ~10 lần (bậc 1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cận trái hay cận phải của mỗi đoạn?"* Với hàm liên tục, khi $n \\to \\infty$ cả hai (và điểm bất kỳ trong đoạn) cho **cùng** giới hạn. Vd $\\int_0^1 x^2\\,dx$: cận phải cho $0.385$ ($n=10$), cận trái cho $0.285$ — nhưng cả hai $\\to \\frac{1}{3}$. Chọn cận nào chỉ ảnh hưởng tốc độ hội tụ.
- *"Vì sao $\\sum i^2 = n(n+1)(2n+1)/6$?"* Đây là công thức tổng bình phương đã biết (chứng minh bằng quy nạp). Kiểm $n=3$: $1+4+9 = 14$, công thức $3 \\cdot 4 \\cdot 7/6 = 84/6 = 14$ ✓. Nó cho phép biến tổng Riemann thành biểu thức đóng rồi mới lấy giới hạn.
- *"Hàm nào thì tổng Riemann chắc chắn hội tụ?"* Mọi hàm **liên tục** trên $[a, b]$ đều **khả tích (integrable)** — giới hạn $\\lim_n S_n$ tồn tại và không phụ thuộc cách chọn $x_i^*$ (trái/phải/giữa đều cùng số). Hàm bị chặn và chỉ gián đoạn ở hữu hạn điểm cũng khả tích. Chỉ những hàm "bệnh hoạn" (vd hàm Dirichlet — bằng 1 ở số hữu tỉ, 0 ở vô tỉ) mới không khả tích theo Riemann.

⚠ **Lỗi thường gặp — quên nhân $\\Delta x$**. Tổng Riemann là $\\sum f(x_i) \\cdot \\Delta x$, KHÔNG phải $\\sum f(x_i)$. Thiếu $\\Delta x$ (= bề rộng hình chữ nhật) thì kết quả không phải diện tích. Vd quên $1/n$ ở trên sẽ ra $\\infty$ thay vì $\\frac{1}{3}$.

🔁 **Dừng lại tự kiểm tra**

1. Với $\\int_0^1 x^2\\,dx$, công thức $S_n = (1+1/n)(2+1/n)/6$. Tính $S_n$ khi $n = 2$.
2. Khi $n \\to \\infty$, mỗi hình chữ nhật rộng $\\Delta x$ tiến về đâu?
3. Cho $f(x) = 2x$ trên $[0, 3]$, $n = 3$, cận phải. Tính $S_3$ và so với diện tích tam giác.

<details><summary>Đáp án</summary>

1. $(1+0.5)(2+0.5)/6 = (1.5 \\cdot 2.5)/6 = 3.75/6 = 0.625$ (xấp xỉ thô vì $n$ nhỏ).
2. $\\Delta x = 1/n \\to 0$ (hình chữ nhật càng mỏng, xấp xỉ càng khít đường cong).
3. $\\Delta x = 1$; $x_i^* = 1, 2, 3$; $f = 2, 4, 6$; $S_3 = (2+4+6)\\cdot 1 = 12$. Diện tích tam giác đáy 3, cao 6 là $\\frac{3 \\cdot 6}{2} = 9$. Cận phải overestimate (12 > 9) vì $f$ tăng. Dùng cận **giữa** ($x_i^* = 0.5, 1.5, 2.5$, $f = 1, 3, 5$) cho $S_3 = 9$ — khớp chính xác.

</details>

### 📝 Tóm tắt mục 2

- Tổng Riemann $S_n = \\sum f(x_i) \\cdot \\Delta x$ xấp xỉ diện tích bằng $n$ hình chữ nhật.
- $\\int_a^b f\\,dx = \\lim_{n \\to \\infty} S_n$ — giới hạn khi hình chữ nhật mỏng vô hạn.
- 3 cách chọn chiều cao: **Trái / Phải / Giữa**. Trái-phải kẹp giá trị thật; giữa hội tụ nhanh nhất ($O(1/n^2)$ so với $O(1/n)$).
- Mọi hàm **liên tục** trên $[a,b]$ đều khả tích — cả 3 cách cùng giới hạn.
- **Đừng quên $\\Delta x$**; nhớ $\\Delta x = \\frac{b-a}{n}$ chứ không phải $\\frac1n$ khi $b - a \\neq 1$.

---

## 3. Định lý cơ bản giải tích (Fundamental Theorem of Calculus)

🎯 **Đây là định lý quan trọng nhất Calculus**, kết nối đạo hàm và tích phân.

### Phần 1 (FTC1)
Nếu $f$ liên tục trên $[a, b]$ và $F(x) = \\int_a^x f(t)\\,dt$, thì **$F'(x) = f(x)$**.

💡 Đọc: "Đạo hàm của tích phân = chính hàm". Đạo hàm và tích phân là **2 phép toán ngược nhau**.

💡 **Vì sao FTC nối đạo hàm ↔ tích phân? — lập luận "diện tích tích lũy"**. Đặt $G(x) = \\int_a^x f(t)\\,dt$ = "diện tích đã gom được tính từ $a$ đến $x$". Tăng $x$ thêm một chút $h$: phần diện tích **mới thêm** là một dải hẹp từ $x$ đến $x + h$ — rộng $h$, cao gần như $f(x)$ (vì $f$ liên tục, trên đoạn cực ngắn nó gần như không đổi). Nên:

$$G(x + h) - G(x) \\approx f(x) \\cdot h \\quad\\Longrightarrow\\quad \\frac{G(x+h) - G(x)}{h} \\approx f(x)$$

Cho $h \\to 0$, vế trái đúng bằng định nghĩa đạo hàm $G'(x)$, vế phải là $f(x)$. Vậy $G'(x) = f(x)$ — **đạo hàm của diện tích tích lũy = chính hàm gốc**. Đó là FTC1, và nó *không phải trùng hợp*: gom diện tích (tích phân) rồi đo tốc độ gom (đạo hàm) thì quay lại đúng hàm ban đầu. Từ FTC1 suy ra FTC2: nếu $F$ là nguyên hàm bất kỳ thì $F$ và $G$ chỉ chênh một hằng số (vì $(F - G)' = f - f = 0$), nên $F(b) - F(a) = G(b) - G(a) = G(b) - 0 = \\int_a^b f$.

💡 **Trực giác xe chạy**: $v(t)$ là vận tốc trên đồng hồ, $G(t)$ là số trên đồng hồ quãng đường. Hai điều hiển nhiên — "tốc độ tăng quãng đường = vận tốc" ($G' = v$) và "quãng đường đi từ 0 đến $T$ = diện tích dưới đồ thị vận tốc" ($G(T) - G(0) = \\int_0^T v\\,dt$) — gộp lại chính là FTC.

### Phần 2 (FTC2) — Cách tính tích phân thực tế
Nếu $F$ là **nguyên hàm** của $f$ ($F' = f$), thì:

$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$

> 📐 **Định nghĩa đầy đủ — Định lý cơ bản giải tích (FTC)**
>
> **(a) Là gì**: Cây cầu nối **đạo hàm và tích phân**. Phần 1: nếu ta tích phân $f$ rồi đạo hàm, ta được lại $f$ (ngược nhau). Phần 2: tích phân xác định = hiệu nguyên hàm ở 2 đầu, $F(b) - F(a)$. Không cần tính tổng Riemann vô hạn nữa.
>
> **(b) Vì sao cần**: Trước Newton/Leibniz, tính diện tích = tổng Riemann thủ công, **cực kỳ khó** với hàm bất kỳ. Archimedes đã làm cho parabol bằng tổng Riemann, mất nhiều trang giấy chỉ cho 1 hàm. FTC biến phép tính diện tích thành 2 phép tính nguyên hàm + trừ — đơn giản hơn vô số lần. Đây là **lý do** Calculus tạo ra cách mạng khoa học thế kỷ 17: từ nay tính diện tích, thể tích, công, lưu lượng... trở nên hệ thống. Là đỉnh cao của toán THPT.
>
> **(c) Ví dụ số**: $\\int_0^1 x^2\\,dx$. $F(x) = x^3/3$. $F(1) - F(0) = 1/3 - 0 =$ **$\\frac{1}{3}$**. Verify bằng tổng Riemann ($n \\to \\infty$ cho cùng kết quả $\\approx 0.333$). $\\int_0^\\pi \\sin x\\,dx = \\left.-\\cos x\\right|_0^\\pi = -\\cos \\pi + \\cos 0 = 1+1 =$ **2**. $\\int_1^e (1/x)\\,dx = \\ln e - \\ln 1 =$ **1**. $\\int_0^1 e^x\\,dx = e^1 - e^0 = e - 1 \\approx$ **1.718**. Diện tích dưới đường thẳng $y = 2x$ trên $[0, 5]$: $\\int_0^5 2x\\,dx = \\left.x^2\\right|_0^5 = 25$ ✓ (= tam giác đáy 5 cao 10 $\\to \\frac{1}{2} \\cdot 5 \\cdot 10 = 25$).

Viết tắt: $F(b) - F(a)$ thường ghi là $\\left[F(x)\\right]_a^b$ hoặc $\\left.F(x)\\right|_a^b$.

💡 **Quy trình tính tích phân**:
1. Tìm nguyên hàm $F(x)$ (như L06).
2. Tính $F(b) - F(a)$.

**Ví dụ**: $\\int_0^1 x^2\\,dx$.
- $F(x) = x^3/3$ (1 nguyên hàm bất kỳ, không cần $+C$ vì cancel khi trừ).
- $F(1) - F(0) = 1/3 - 0 =$ **$\\frac{1}{3}$** ✓.

Khớp với kết quả tổng Riemann!

### Walk-through FTC từng bước — bốn ví dụ

Mỗi ví dụ: (1) tìm nguyên hàm $F$ — kiểm bằng cách đạo hàm ngược lại; (2) tính $F(b) - F(a)$.

**Ví dụ A — $\\int_0^2 3x^2\\,dx$ (đa thức).**
- Cần $F$ với $F'(x) = 3x^2$. Vì $(x^3)' = 3x^2$, lấy $F(x) = x^3$ (kiểm: $(x^3)' = 3x^2$ ✓).
- $F(2) - F(0) = 2^3 - 0^3 = 8 - 0 =$ **8**.
- Verify diện tích thật: tổng Riemann hội tụ về 8 khi $n \\to \\infty$.

**Ví dụ B — $\\int_0^\\pi \\sin x\\,dx$ (lượng giác, dễ sai dấu).**
- Cần $F'(x) = \\sin x$. Vì $(\\cos x)' = -\\sin x$, nên $(-\\cos x)' = \\sin x$ → lấy $F(x) = -\\cos x$ (kiểm: $(-\\cos x)' = \\sin x$ ✓).
- Tính từng đầu: $F(\\pi) = -\\cos\\pi = -(-1) = 1$; $F(0) = -\\cos 0 = -1$.
- $F(\\pi) - F(0) = 1 - (-1) =$ **2**. (Cẩn thận hai dấu trừ liên tiếp.)

**Ví dụ C — $\\int_1^e \\frac{1}{x}\\,dx$ (hàm $1/x$ ra log).**
- Cần $F'(x) = \\frac1x$. Theo bảng nguyên hàm, $F(x) = \\ln|x|$ (kiểm: $(\\ln x)' = \\frac1x$ ✓). Trên $[1, e]$, $x > 0$ nên bỏ trị tuyệt đối.
- $F(e) - F(1) = \\ln e - \\ln 1 = 1 - 0 =$ **1**.

**Ví dụ D — $\\int_0^1 e^x\\,dx$ (hàm mũ tự nguyên hàm).**
- Cần $F'(x) = e^x$. Vì $(e^x)' = e^x$, lấy $F(x) = e^x$ (kiểm ✓ — "hàm tự nguyên hàm").
- $F(1) - F(0) = e^1 - e^0 = e - 1 \\approx 2.718 - 1 =$ **1.718**.

**Ví dụ E (bonus) — đường thẳng, đối chiếu hình học.** $\\int_0^5 2x\\,dx$. $F(x) = x^2$. $F(5) - F(0) = 25 - 0 =$ **25**. Kiểm bằng hình học: vùng dưới $y = 2x$ trên $[0, 5]$ là tam giác đáy 5, cao $2 \\cdot 5 = 10$ → diện tích $\\frac{5 \\cdot 10}{2} = 25$ ✓. FTC và hình học khớp nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không cần $+C$ ở tích phân xác định?"* Vì khi tính $F(b) - F(a)$, hằng số bị triệt tiêu: $(F(b)+C) - (F(a)+C) = F(b) - F(a)$. Tích phân **bất định** (nguyên hàm) cần $+C$, nhưng tích phân **xác định** thì không.
- *"FTC1 và FTC2 liên hệ thế nào?"* FTC1 nói "tích phân rồi đạo hàm $\\to$ trở lại hàm gốc" (chứng minh đạo hàm và tích phân ngược nhau). FTC2 là **hệ quả tính toán**: dùng nguyên hàm để tính tích phân xác định mà không cần tổng Riemann.
- *"Chọn nguyên hàm nào trong FTC2?"* Bất kỳ một nguyên hàm nào cũng được (hằng số tự triệt tiêu). Thường chọn cái đơn giản nhất với $C = 0$.

⚠ **Lỗi thường gặp — tính $F(a) - F(b)$ thay vì $F(b) - F(a)$**. Thứ tự là **cận trên trừ cận dưới**. Đảo lại sẽ ra dấu ngược. Vd $\\int_0^1 x^2\\,dx = F(1)-F(0) = 1/3$, nếu viết $F(0)-F(1) = -1/3$ là sai dấu.

⚠ **Lỗi thường gặp — sai dấu khi tìm nguyên hàm của $\\sin/\\cos$**. $\\int \\sin x\\,dx = -\\cos x$ (có dấu trừ), $\\int \\cos x\\,dx = +\\sin x$ (không trừ). Viết $\\int \\sin x\\,dx = \\cos x$ là sai — kiểm ngay bằng đạo hàm: $(\\cos x)' = -\\sin x \\neq \\sin x$. **Mẹo phòng sai**: tìm xong $F$, luôn đạo hàm $F$ kiểm có ra lại $f$ không.

⚠ **Lỗi thường gặp — dùng công thức $\\frac{x^{n+1}}{n+1}$ cho $n = -1$**. Với $\\int \\frac1x\\,dx$ ($n = -1$) công thức lũy thừa chia cho $n + 1 = 0$ → vô nghĩa. Trường hợp này nguyên hàm là $\\ln|x|$, không phải $\\frac{x^0}{0}$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^2 3x^2\\,dx = ?$ (dùng FTC2).
2. $\\int_1^3 (1/x)\\,dx = ?$
3. $\\int_0^{\\pi/2} \\cos x\\,dx = ?$
4. Vì sao tính $\\int_a^b$ chỉ cần MỘT nguyên hàm $F$ bất kỳ, không cần $+C$?

<details><summary>Đáp án</summary>

1. $F(x) = x^3 \\to F(2) - F(0) = 8 - 0 = 8$.
2. $F(x) = \\ln|x| \\to \\ln 3 - \\ln 1 = \\ln 3 \\approx 1.0986$.
3. $F(x) = \\sin x \\to \\sin(\\pi/2) - \\sin 0 = 1 - 0 = 1$.
4. Vì khi trừ, hằng số triệt tiêu: $(F(b)+C) - (F(a)+C) = F(b) - F(a)$. Chọn $C = 0$ cho gọn.

</details>

### 📝 Tóm tắt mục 3

- FTC1: $\\dfrac{d}{dx} \\int_a^x f(t)\\,dt = f(x)$ — đạo hàm và tích phân ngược nhau (lập luận "diện tích tích lũy").
- FTC2: $\\int_a^b f\\,dx = F(b) - F(a)$ với $F' = f$ — tính tích phân qua nguyên hàm, không cần tổng Riemann.
- Không cần $+C$ (triệt tiêu khi trừ); thứ tự **trên trừ dưới**.
- Quy trình: tìm $F$ → đạo hàm $F$ kiểm lại ra $f$ → thế cận. Cẩn thận dấu của $\\int\\sin = -\\cos$ và $\\int\\frac1x = \\ln|x|$.

---

## 4. Tính chất tích phân xác định

| Tính chất | Công thức |
|-----------|-----------|
| Hằng nhân | $\\int c \\cdot f\\,dx = c \\cdot \\int f\\,dx$ |
| Tổng | $\\int (f + g)\\,dx = \\int f\\,dx + \\int g\\,dx$ |
| Cộng đoạn | $\\int_a^b = \\int_a^c + \\int_c^b$ |
| Đảo cận | $\\int_a^b = -\\int_b^a$ |
| Trùng cận | $\\int_a^a = 0$ |
| Diện tích âm | $f < 0 \\to$ tích phân âm |
| So sánh | $f \\leq g \\to \\int_a^b f \\leq \\int_a^b g$ |

### Walk-through verify từng tính chất bằng số

Mỗi tính chất kèm một ví dụ tính cả hai vế để thấy bằng nhau.

**1. Tuyến tính** ($\\int (\\alpha f + \\beta g) = \\alpha\\int f + \\beta\\int g$), lấy $f = x$, $g = x^2$, $[0,1]$, $\\alpha = 2$, $\\beta = 3$:
- Vế trái: $\\int_0^1 (2x + 3x^2)\\,dx = \\left[x^2 + x^3\\right]_0^1 = (1 + 1) - 0 = 2$.
- Vế phải: $2\\int_0^1 x\\,dx + 3\\int_0^1 x^2\\,dx = 2\\cdot\\frac12 + 3\\cdot\\frac13 = 1 + 1 = 2$ ✓.

**2. Cộng đoạn** ($\\int_a^c = \\int_a^b + \\int_b^c$), lấy $f = x$, tách $[0,4]$ qua $b = 2$:
- $\\int_0^4 x\\,dx = \\left[\\frac{x^2}{2}\\right]_0^4 = 8$.
- $\\int_0^2 x\\,dx + \\int_2^4 x\\,dx = \\frac{4}{2} + \\left(\\frac{16}{2} - \\frac{4}{2}\\right) = 2 + 6 = 8$ ✓.

**3. Đảo cận** ($\\int_b^a = -\\int_a^b$), lấy $f = x$, $[0,1]$:
- $\\int_1^0 x\\,dx = \\left[\\frac{x^2}{2}\\right]_1^0 = 0 - \\frac12 = -\\frac12 = -\\int_0^1 x\\,dx$ ✓. (Trực giác: đi ngược chiều thì $\\Delta x < 0$.)

**4. Trùng cận** ($\\int_a^a = 0$): $\\int_3^3 x^2\\,dx = F(3) - F(3) = 0$ — bề rộng miền bằng 0, không gom được diện tích nào.

**5. So sánh** ($f \\leq g \\Rightarrow \\int f \\leq \\int g$): trên $[0,1]$ có $x^2 \\leq x$ (vì $0 \\leq x \\leq 1$). Kiểm: $\\int_0^1 x^2 = \\frac13 \\leq \\frac12 = \\int_0^1 x$ ✓. Hệ quả "kẹp hộp": nếu $m \\leq f \\leq M$ thì $m(b-a) \\leq \\int_a^b f \\leq M(b-a)$.

⚠ **Tích phân có thể âm**: $\\int_a^b f\\,dx$ **không phải lúc nào cũng = diện tích**. Là **diện tích đại số** — phần trên Ox cộng, phần dưới trừ.

Diện tích có dấu của $\\sin x$ trên $[0, 2\\pi]$:

<svg viewBox="0 0 480 240" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Diện tích có dấu của sin x trên [0, 2π]: nửa trên Ox dương (+2), nửa dưới Ox âm (−2); tích phân bằng 0 nhưng diện tích thật bằng 4">
  <defs><marker id="ar6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="238.5" y1="221.0" x2="238.5" y2="32.0"/>
<line x1="427.0" y1="221.0" x2="427.0" y2="32.0"/>
<line x1="50.0" y1="60.0" x2="464.0" y2="60.0"/>
<line x1="50.0" y1="200.0" x2="464.0" y2="200.0"/>
</g>
  <line x1="44.0" y1="130.0" x2="486.0" y2="130.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="50.0" y1="227.0" x2="50.0" y2="10.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="478.0" y="146.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="58.0" y="20.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="238.5" y1="126.0" x2="238.5" y2="134.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="238.5" y="146.0" fill="#475569" font-size="11" text-anchor="middle">π</text>
  <line x1="427.0" y1="126.0" x2="427.0" y2="134.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="427.0" y="146.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="46.0" y1="60.0" x2="54.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">+1</text>
  <line x1="46.0" y1="200.0" x2="54.0" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="204.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <path d="M 50.0,130.0 L 53.1,126.3 L 56.3,122.7 L 59.4,119.0 L 62.6,115.4 L 65.7,111.9 L 68.8,108.4 L 72.0,104.9 L 75.1,101.5 L 78.3,98.2 L 81.4,95.0 L 84.6,91.9 L 87.7,88.9 L 90.8,85.9 L 94.0,83.2 L 97.1,80.5 L 100.3,78.0 L 103.4,75.6 L 106.5,73.4 L 109.7,71.3 L 112.8,69.4 L 116.0,67.6 L 119.1,66.1 L 122.3,64.6 L 125.4,63.4 L 128.5,62.4 L 131.7,61.5 L 134.8,60.9 L 138.0,60.4 L 141.1,60.1 L 144.2,60.0 L 147.4,60.1 L 150.5,60.4 L 153.7,60.9 L 156.8,61.5 L 160.0,62.4 L 163.1,63.4 L 166.2,64.6 L 169.4,66.1 L 172.5,67.6 L 175.7,69.4 L 178.8,71.3 L 181.9,73.4 L 185.1,75.6 L 188.2,78.0 L 191.4,80.5 L 194.5,83.2 L 197.7,85.9 L 200.8,88.9 L 203.9,91.9 L 207.1,95.0 L 210.2,98.2 L 213.4,101.5 L 216.5,104.9 L 219.6,108.4 L 222.8,111.9 L 225.9,115.4 L 229.1,119.0 L 232.2,122.7 L 235.4,126.3 L 238.5,130.0 L 238.5,130.0 L 50.0,130.0 Z" fill="#93c5fd" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.5" stroke-linejoin="round"/>
  <path d="M 238.5,130.0 L 241.6,133.7 L 244.8,137.3 L 247.9,141.0 L 251.1,144.6 L 254.2,148.1 L 257.3,151.6 L 260.5,155.1 L 263.6,158.5 L 266.8,161.8 L 269.9,165.0 L 273.1,168.1 L 276.2,171.1 L 279.3,174.1 L 282.5,176.8 L 285.6,179.5 L 288.8,182.0 L 291.9,184.4 L 295.0,186.6 L 298.2,188.7 L 301.3,190.6 L 304.5,192.4 L 307.6,193.9 L 310.8,195.4 L 313.9,196.6 L 317.0,197.6 L 320.2,198.5 L 323.3,199.1 L 326.5,199.6 L 329.6,199.9 L 332.7,200.0 L 335.9,199.9 L 339.0,199.6 L 342.2,199.1 L 345.3,198.5 L 348.5,197.6 L 351.6,196.6 L 354.7,195.4 L 357.9,193.9 L 361.0,192.4 L 364.2,190.6 L 367.3,188.7 L 370.4,186.6 L 373.6,184.4 L 376.7,182.0 L 379.9,179.5 L 383.0,176.8 L 386.2,174.1 L 389.3,171.1 L 392.4,168.1 L 395.6,165.0 L 398.7,161.8 L 401.9,158.5 L 405.0,155.1 L 408.1,151.6 L 411.3,148.1 L 414.4,144.6 L 417.6,141.0 L 420.7,137.3 L 423.8,133.7 L 427.0,130.0 L 427.0,130.0 L 238.5,130.0 Z" fill="#fca5a5" stroke="#dc2626" stroke-width="0" fill-opacity="0.5" stroke-linejoin="round"/>
  <path d="M 50.0,130.0 L 53.1,126.3 L 56.3,122.7 L 59.4,119.0 L 62.6,115.4 L 65.7,111.9 L 68.8,108.4 L 72.0,104.9 L 75.1,101.5 L 78.3,98.2 L 81.4,95.0 L 84.6,91.9 L 87.7,88.9 L 90.8,85.9 L 94.0,83.2 L 97.1,80.5 L 100.3,78.0 L 103.4,75.6 L 106.5,73.4 L 109.7,71.3 L 112.8,69.4 L 116.0,67.6 L 119.1,66.1 L 122.3,64.6 L 125.4,63.4 L 128.5,62.4 L 131.7,61.5 L 134.8,60.9 L 138.0,60.4 L 141.1,60.1 L 144.2,60.0 L 147.4,60.1 L 150.5,60.4 L 153.7,60.9 L 156.8,61.5 L 160.0,62.4 L 163.1,63.4 L 166.2,64.6 L 169.4,66.1 L 172.5,67.6 L 175.7,69.4 L 178.8,71.3 L 181.9,73.4 L 185.1,75.6 L 188.2,78.0 L 191.4,80.5 L 194.5,83.2 L 197.7,85.9 L 200.8,88.9 L 203.9,91.9 L 207.1,95.0 L 210.2,98.2 L 213.4,101.5 L 216.5,104.9 L 219.6,108.4 L 222.8,111.9 L 225.9,115.4 L 229.1,119.0 L 232.2,122.7 L 235.4,126.3 L 238.5,130.0 L 241.6,133.7 L 244.8,137.3 L 247.9,141.0 L 251.1,144.6 L 254.2,148.1 L 257.3,151.6 L 260.5,155.1 L 263.6,158.5 L 266.8,161.8 L 269.9,165.0 L 273.1,168.1 L 276.2,171.1 L 279.3,174.1 L 282.5,176.8 L 285.6,179.5 L 288.8,182.0 L 291.9,184.4 L 295.0,186.6 L 298.2,188.7 L 301.3,190.6 L 304.5,192.4 L 307.6,193.9 L 310.8,195.4 L 313.9,196.6 L 317.0,197.6 L 320.2,198.5 L 323.3,199.1 L 326.5,199.6 L 329.6,199.9 L 332.7,200.0 L 335.9,199.9 L 339.0,199.6 L 342.2,199.1 L 345.3,198.5 L 348.5,197.6 L 351.6,196.6 L 354.7,195.4 L 357.9,193.9 L 361.0,192.4 L 364.2,190.6 L 367.3,188.7 L 370.4,186.6 L 373.6,184.4 L 376.7,182.0 L 379.9,179.5 L 383.0,176.8 L 386.2,174.1 L 389.3,171.1 L 392.4,168.1 L 395.6,165.0 L 398.7,161.8 L 401.9,158.5 L 405.0,155.1 L 408.1,151.6 L 411.3,148.1 L 414.4,144.6 L 417.6,141.0 L 420.7,137.3 L 423.8,133.7 L 427.0,130.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="144.2" y="98.5" fill="#1d4ed8" font-size="14" text-anchor="middle" font-weight="700">+A = 2</text>
  <text x="332.7" y="165.0" fill="#dc2626" font-size="14" text-anchor="middle" font-weight="700">−A = −2</text>
  <text x="144.2" y="42.5" fill="#1d4ed8" font-size="11" text-anchor="middle">trên Ox: gom (+)</text>
  <text x="332.7" y="220.0" fill="#dc2626" font-size="11" text-anchor="middle">dưới Ox: gom (−)</text>
  <text x="240.0" y="225.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">tổng đại số ∫₀²π sin x dx = (+2) + (−2) = 0  ;  diện tích thật = 2 + 2 = 4</text>
</svg>

**Ví dụ**: $\\int_0^{2\\pi} \\sin x\\,dx = \\left.-\\cos x\\right|_0^{2\\pi} = -\\cos(2\\pi) + \\cos(0) = -1 + 1 =$ **0**. (Phần dương từ $0$-$\\pi$ và phần âm từ $\\pi$-$2\\pi$ triệt tiêu nhau.)

Nếu muốn **diện tích thật**: $\\int_0^{2\\pi} |\\sin x|\\,dx = 4$.

💡 **Trực giác**: tích phân xác định là **diện tích có dấu** — phần đồ thị trên trục Ox đóng góp dương, phần dưới đóng góp âm. Như "lãi và lỗ" cộng dồn: tổng đại số có thể nhỏ hơn tổng độ lớn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân bằng 0 có nghĩa hàm bằng 0?"* Không. $\\int_0^{2\\pi} \\sin x\\,dx = 0$ nhưng $\\sin x$ không hề bằng 0 khắp nơi — phần dương và âm **triệt tiêu**. Tích phân = 0 chỉ nói tổng đại số bằng 0.
- *"Khi nào dùng tính chất cộng đoạn?"* Khi hàm đổi công thức/đổi dấu giữa chừng, hoặc muốn tách $\\int_a^b = \\int_a^c + \\int_c^b$ để xử lý từng phần. Rất hữu ích với hàm chia khúc hay $|f(x)|$.

⚠ **Lỗi thường gặp — lẫn tích phân với diện tích thật**. Để tính **diện tích** giữa đường và trục khi hàm đổi dấu, phải lấy $\\int|f|$ (chia đoạn theo dấu), KHÔNG phải $\\int f$. Vd diện tích của $\\sin x$ trên $[0, 2\\pi]$ là $4$, không phải $0$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_{-1}^1 x\\,dx = ?$ Giải thích.
2. Tách $\\int_0^4 f\\,dx$ qua điểm $c = 2$ như thế nào?
3. Tính **diện tích thật** giữa $y = \\sin x$ và trục Ox trên $[0, 2\\pi]$ (không phải tích phân).

<details><summary>Đáp án</summary>

1. $\\left.x^2/2\\right|_{-1}^1 = 1/2 - 1/2 = 0$ (hàm lẻ, phần âm $[-1,0]$ triệt tiêu phần dương $[0,1]$).
2. $\\int_0^4 f\\,dx = \\int_0^2 f\\,dx + \\int_2^4 f\\,dx$ (cộng đoạn).
3. Tách theo dấu: $\\int_0^\\pi \\sin x\\,dx = 2$ (dương) và $\\int_\\pi^{2\\pi}\\sin x\\,dx = -2$ (âm). Diện tích thật $= |2| + |-2| = 4$, khác hẳn tích phân $= 0$.

</details>

### 📝 Tóm tắt mục 4

- Tích phân tuyến tính, cộng đoạn $\\int_a^b = \\int_a^c + \\int_c^b$, đảo cận đổi dấu, $\\int_a^a = 0$.
- So sánh: $f \\leq g \\Rightarrow \\int f \\leq \\int g$; kẹp hộp $m(b-a) \\leq \\int_a^b f \\leq M(b-a)$.
- Tích phân là **diện tích có dấu** — phần dưới Ox âm; có thể bằng 0 dù hàm $\\neq 0$.
- Muốn **diện tích thật** khi hàm đổi dấu: chia đoạn theo dấu rồi cộng trị tuyệt đối ($\\int|f|$).

---

## 5. Đổi biến trong tích phân xác định

$$\\int_a^b f(g(x)) \\cdot g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$$

⚠ **Lưu ý**: Phải **đổi cả cận** theo $u$.

**Ví dụ**: $\\int_0^1 2x \\cdot e^{x^2}\\,dx$.
- Đặt $u = x^2$, $du = 2x\\,dx$.
- $x = 0 \\to u = 0$; $x = 1 \\to u = 1$.
- $= \\int_0^1 e^u\\,du = e - 1 \\approx 1.718$.

### Walk-through đổi biến từng bước — ba ví dụ

Đổi biến chính là **chain rule chạy ngược** (xem [Lesson 04 — Chain rule](../lesson-04-chain-rule/)): nhận ra biểu thức trong tích phân có dạng $f(g(x))\\cdot g'(x)$ rồi gom $g(x)$ thành $u$.

**Ví dụ A — $\\int_1^2 2x\\cdot e^{x^2}\\,dx$ (đổi cận thực sự khác).**
- Đặt $u = x^2 \\Rightarrow du = 2x\\,dx$.
- Đổi cận: $x = 1 \\to u = 1$; $x = 2 \\to u = 4$ (lần này cận **thay đổi rõ**, không trùng như $[0,1]$).
- $= \\int_1^4 e^u\\,du = e^4 - e^1 \\approx 54.60 - 2.72 =$ **51.88**.

**Ví dụ B — $\\int_0^{\\sqrt\\pi} x\\cos(x^2)\\,dx$ (gom hằng số).**
- Đặt $u = x^2 \\Rightarrow du = 2x\\,dx \\Rightarrow x\\,dx = \\frac{du}{2}$.
- Đổi cận: $x = 0 \\to u = 0$; $x = \\sqrt\\pi \\to u = \\pi$.
- $= \\int_0^\\pi \\cos u\\cdot\\frac{du}{2} = \\frac12\\left[\\sin u\\right]_0^\\pi = \\frac12(\\sin\\pi - \\sin 0) = \\frac12(0 - 0) =$ **0**.

**Ví dụ C — $\\int_0^1 \\frac{2x}{1+x^2}\\,dx$ (tử là đạo hàm mẫu → ra log).**
- Đặt $u = 1 + x^2 \\Rightarrow du = 2x\\,dx$.
- Đổi cận: $x = 0 \\to u = 1$; $x = 1 \\to u = 2$.
- $= \\int_1^2 \\frac{du}{u} = \\left[\\ln u\\right]_1^2 = \\ln 2 - \\ln 1 = \\ln 2 \\approx$ **0.693**.

💡 **Trực giác**: giống đổi biến cho nguyên hàm, nhưng cận tích phân là "vị trí trên trục x" — khi đổi sang biến $u$, các vị trí đó cũng phải dịch sang giá trị $u$ tương ứng. Đổi cận giúp **không cần** thay $u$ trở lại $x$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi cận rồi có cần thay $u$ về $x$ không?"* Không. Khi đã đổi cận sang $u$, tính thẳng $\\int_{g(a)}^{g(b)} f(u)\\,du$ rồi áp FTC2 với biến $u$. Đỡ một bước so với nguyên hàm bất định.
- *"Nếu quên đổi cận thì sao?"* Sẽ tính $\\left[F(u)\\right]$ với cận $x$ cũ → kết quả sai. Phải chọn một trong hai: đổi cận theo $u$, **hoặc** thay $u$ về $x$ rồi dùng cận $x$ gốc — không trộn.

⚠ **Lỗi thường gặp — đổi biến nhưng giữ nguyên cận $x$**. $\\int_0^1 2x \\cdot e^{x^2}\\,dx$: sau khi đặt $u = x^2$, nếu vẫn viết $\\int_0^1 e^u\\,du$ với cận $x$ cũ thì... ở đây trùng hợp $0 \\to 0, 1 \\to 1$ nên đúng; nhưng $\\int_1^2 2x \\cdot e^{x^2}\\,dx$ thì $u$ chạy $1 \\to 4$, giữ cận $1 \\to 2$ sẽ sai. Luôn đổi cận theo $u = g(x)$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^2 2x \\cdot e^{x^2}\\,dx$ — cận $u$ mới là gì? Tính kết quả.
2. Vì sao đổi cận tiện hơn thay $u$ về $x$?

<details><summary>Đáp án</summary>

1. $u = x^2$: $x=0 \\to u=0$, $x=2 \\to u=4$. $\\int_0^4 e^u\\,du = e^4 - 1 \\approx 53.6$.
2. Vì tránh được bước thay $u = g(x)$ ngược lại — tính trực tiếp trên biến $u$ với cận mới.

</details>

### 📝 Tóm tắt mục 5

- Đổi biến tích phân xác định: $\\int_a^b f(g(x))g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$.
- **Phải đổi cả cận** theo $u = g(x)$; sau đó không cần thay $u$ về $x$.
- Hoặc đổi cận, hoặc thay $u$ về $x$ rồi dùng cận gốc — không trộn lẫn.

---

## 6. Tích phân từng phần xác định

$$\\int_a^b u\\,dv = \\left[u \\cdot v\\right]_a^b - \\int_a^b v\\,du$$

💡 **Từng phần = product rule chạy ngược**. Từ $(uv)' = u'v + uv'$, lấy tích phân hai vế trên $[a,b]$: $\\left[uv\\right]_a^b = \\int_a^b u'v\\,dx + \\int_a^b uv'\\,dx$. Chuyển vế ra đúng công thức trên. Chọn $u, dv$ theo **LIATE** (ưu tiên đặt $u$ là: **L**og > **I**nverse trig > **A**lgebraic > **T**rig > **E**xponential) — vì ta muốn $u$ đạo hàm thì **đơn giản dần**, còn $dv$ thì dễ tìm nguyên hàm.

**Ví dụ**: $\\int_0^\\pi x \\cdot \\sin x\\,dx$.
- $u = x$, $dv = \\sin x\\,dx$. $v = -\\cos x$.
- $= \\left[-x \\cdot \\cos x\\right]_0^\\pi + \\int_0^\\pi \\cos x\\,dx$
- $= -\\pi \\cdot \\cos \\pi + 0 + \\left[\\sin x\\right]_0^\\pi$
- $= \\pi + 0 - 0 =$ **$\\pi$**.

💡 **Trực giác**: công thức giống nguyên hàm $\\int u\\,dv = uv - \\int v\\,du$, chỉ thêm việc **đánh giá $uv$ tại hai cận** ngay. Phần $\\left[uv\\right]_a^b$ lấy giá trị ở hai đầu, phần $\\int_a^b v\\,du$ vẫn là tích phân xác định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\left[u \\cdot v\\right]_a^b$ tính thế nào?"* Thay cận trên trừ cận dưới vào tích $u \\cdot v$. Ví dụ trên: $\\left[-x \\cdot \\cos x\\right]_0^\\pi = (-\\pi \\cdot \\cos \\pi) - (-0 \\cdot \\cos 0) = (-\\pi \\cdot (-1)) - 0 = \\pi$.
- *"Chọn $u, dv$ có khác nguyên hàm không?"* Không, vẫn theo **LIATE** như L06. Chỉ thêm bước đánh giá tại cận.
- *"Có khi nào phải làm từng phần hai lần không?"* Có — khi phần Algebraic là $x^2$ (đạo hàm hai lần mới hết). Walk-through $\\int_0^1 x^2 e^x\\,dx$: lần 1 lấy $u = x^2, dv = e^x dx \\Rightarrow v = e^x$, được $\\left[x^2 e^x\\right]_0^1 - \\int_0^1 2x e^x\\,dx = e - 2\\int_0^1 x e^x\\,dx$. Phần $\\int_0^1 x e^x\\,dx = 1$ (đã tính ở 🔁 trên). Vậy kết quả $= e - 2\\cdot 1 = e - 2 \\approx$ **0.718**. Verify: nguyên hàm $\\int x^2 e^x dx = (x^2 - 2x + 2)e^x$, thế cận $[(1-2+2)e - 2] = e - 2$ ✓.

⚠ **Lỗi thường gặp — quên đánh giá phần $\\left[uv\\right]$ tại cận**. Viết $\\int_0^\\pi x \\sin x\\,dx = -\\int_0^\\pi \\cos x\\,dx$ (bỏ luôn $\\left[-x \\cos x\\right]_0^\\pi$) là thiếu hẳn một phần. Cả $\\left[uv\\right]_a^b$ lẫn $\\int v\\,du$ đều phải đánh giá tại cận.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^1 x \\cdot e^x\\,dx = ?$
2. Tính $\\left[x \\cdot \\sin x\\right]_0^{\\pi/2}$.

<details><summary>Đáp án</summary>

1. $u=x, dv=e^x\\,dx, v=e^x$: $\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx = e - \\left[e^x\\right]_0^1 = e - (e-1) = 1$.
2. $(\\pi/2) \\cdot \\sin(\\pi/2) - 0 \\cdot \\sin 0 = (\\pi/2) \\cdot 1 - 0 = \\pi/2$.

</details>

### 📝 Tóm tắt mục 6

- Từng phần xác định: $\\int_a^b u\\,dv = \\left[uv\\right]_a^b - \\int_a^b v\\,du$.
- Đánh giá **cả** $\\left[uv\\right]$ tại hai cận **lẫn** tích phân còn lại; chọn $u, dv$ theo LIATE.
- Đừng bỏ sót phần $\\left[uv\\right]_a^b$.

---

## 7. Tích phân bằng số (Numerical Integration) — khi không có nguyên hàm dạng đóng

Nhiều tích phân thực tế **không** có nguyên hàm sơ cấp — ví dụ $\\int e^{-x^2}\\,dx$ (hàm mật độ Gauss, gặp lại ở phần xác suất). Khi đó không dùng FTC được; phải xấp xỉ **bằng số** từ tổng dạng Riemann nhưng thông minh hơn.

💡 **Trực giác**: thay vì xấp xỉ mỗi mảnh bằng hình chữ nhật (đỉnh phẳng), ta xấp xỉ bằng **hình thang** (đỉnh nghiêng nối 2 điểm) hoặc **cung parabol** (đỉnh cong) — bám đường cong tốt hơn, sai số nhỏ hơn nhiều với cùng số mảnh $n$.

### 7.1. Quy tắc hình thang (Trapezoidal rule)

Trên mỗi đoạn nối $(x_{i-1}, f(x_{i-1}))$ và $(x_i, f(x_i))$ bằng đoạn thẳng → mỗi mảnh là hình thang diện tích $\\frac{f(x_{i-1}) + f(x_i)}{2}\\cdot\\Delta x$. Cộng hết:

$$\\int_a^b f(x)\\,dx \\approx \\frac{\\Delta x}{2}\\left[f(x_0) + 2f(x_1) + 2f(x_2) + \\cdots + 2f(x_{n-1}) + f(x_n)\\right]$$

(các điểm trong được tính 2 lần → hệ số 2). Sai số $O(1/n^2)$ — tốt hơn Riemann trái/phải ($O(1/n)$).

### 7.2. Quy tắc Simpson

Thay đoạn thẳng bằng **parabol** đi qua 3 điểm liên tiếp ($n$ phải chẵn):

$$\\int_a^b f(x)\\,dx \\approx \\frac{\\Delta x}{3}\\left[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \\cdots + 4f(x_{n-1}) + f(x_n)\\right]$$

Hệ số xen kẽ $1, 4, 2, 4, \\ldots, 4, 1$. Sai số $O(1/n^4)$ — cực nhanh; chính xác **tuyệt đối** với mọi đa thức bậc $\\leq 3$.

### 7.3. So sánh hội tụ — $\\int_0^1 x^2\\,dx$ (thật $= \\frac13 \\approx 0.333333$)

| $n$ | Trái | Phải | Giữa | Hình thang | Simpson |
|-----|------|------|------|------------|---------|
| 4   | 0.21875  | 0.46875  | 0.328125 | 0.34375  | 0.3333333 |
| 10  | 0.285    | 0.385    | 0.3325   | 0.335    | 0.3333333 |
| 100 | 0.328350 | 0.338350 | 0.333325 | 0.333350 | 0.3333333 |

Simpson "chạm đáy" ngay từ $n = 4$ vì $x^2$ là parabol — đúng dạng Simpson dùng để xấp xỉ. Hình thang cần $n$ lớn hơn, Riemann trái/phải tệ nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao Simpson đúng tuyệt đối với $x^2$ nhưng không với $\\sin x$?"* Simpson xấp xỉ bằng parabol (đa thức bậc $\\leq 3$). $x^2$ chính là parabol → khớp 100%. $\\sin x$ không phải đa thức → còn sai số nhỏ ($O(1/n^4)$), giảm rất nhanh khi tăng $n$.
- *"Khi nào buộc phải tính bằng số?"* Khi hàm không có nguyên hàm sơ cấp ($e^{-x^2}$, $\\frac{\\sin x}{x}$), hoặc khi $f$ chỉ cho dưới dạng bảng số đo (không có công thức). Tích phân nhiều chiều thì dùng **Monte Carlo** — lấy mẫu ngẫu nhiên, sai số $O(1/\\sqrt N)$ không phụ thuộc số chiều.

⚠ **Lỗi thường gặp — quên $n$ chẵn cho Simpson**. Công thức Simpson cần số đoạn chẵn (số điểm lẻ) để ghép từng cặp đoạn thành một cung parabol. $n$ lẻ → hệ số xen kẽ lệch, kết quả sai.

### 7.4. Vì sao tích phân lại quan trọng về sau

💡 **Trực giác — tích phân là ngôn ngữ của xác suất liên tục**. Với biến liên tục (chiều cao, thời gian), xác suất không gán cho từng điểm (mỗi điểm có xác suất 0) mà cho **khoảng**: $P(a \\leq X \\leq b) = \\int_a^b p(x)\\,dx$, với $p(x)$ là **hàm mật độ (probability density)**. Điều kiện chuẩn hóa "chắc chắn xảy ra đâu đó" là $\\int_{-\\infty}^{+\\infty} p(x)\\,dx = 1$, và kỳ vọng $E[X] = \\int x\\,p(x)\\,dx$. Đúng cái phân phối quan trọng nhất — Gauss $p(x) \\propto e^{-x^2/2}$ — lại **không** có nguyên hàm sơ cấp, nên các giá trị của nó phải tính bằng số (mục 7.1–7.3) hoặc Monte Carlo. Đó là lý do mục này không chỉ là kỹ thuật phụ. Sẽ học kỹ ở các bài xác suất sau.

### 📝 Tóm tắt mục 7

- Khi không có nguyên hàm dạng đóng → tính tích phân **bằng số**.
- Hình thang (đỉnh nghiêng, $O(1/n^2)$) tốt hơn hình chữ nhật; Simpson (đỉnh parabol, $O(1/n^4)$) tốt hơn nữa.
- Simpson chính xác tuyệt đối với đa thức bậc $\\leq 3$; cần $n$ chẵn.
- Nhiều chiều → Monte Carlo (sai số $O(1/\\sqrt N)$, không phụ thuộc chiều).

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\\int_1^3 (2x + 1)\\,dx$.

**Bài 2**: Tính $\\int_0^{\\pi/2} \\cos x\\,dx$.

**Bài 3**: Tính $\\int_{-2}^2 x^3\\,dx$. Giải thích kết quả.

**Bài 4**: Tính $\\int_0^1 x \\cdot e^x\\,dx$.

**Bài 5**: Tính $\\int_1^e (\\ln x)/x\\,dx$.

**Bài 6**: Tính diện tích **thật** giữa $y = x^2 - 1$ và trục Ox trên $[0, 2]$ (hàm đổi dấu tại $x = 1$).

**Bài 7**: Tính $\\int_0^2 |x - 1|\\,dx$ bằng tính chất cộng đoạn.

**Bài 8**: Xấp xỉ $\\int_0^1 x^2\\,dx$ bằng quy tắc hình thang với $n = 2$, rồi so với giá trị thật.

### Lời giải

**Bài 1**: $F(x) = x^2 + x$. $F(3) - F(1) = 12 - 2 =$ **10**.

**Bài 2**: $F(x) = \\sin x$. $\\sin(\\pi/2) - \\sin 0 =$ **1**.

**Bài 3**: $F(x) = x^4/4$. $F(2) - F(-2) = 4 - 4 =$ **0**. Vì $x^3$ là hàm lẻ, đối xứng qua O → phần âm và dương triệt tiêu.

**Bài 4**: Từng phần. $u=x, dv=e^x\\,dx \\to v=e^x$. $\\left[x \\cdot e^x\\right]_0^1 - \\int_0^1 e^x\\,dx = e - \\left[e^x\\right]_0^1 = e - (e-1) =$ **1**.

**Bài 5**: Đổi biến $u = \\ln x$, $du = dx/x$. $x=1 \\to u=0$, $x=e \\to u=1$. $= \\int_0^1 u\\,du =$ **$\\frac{1}{2}$**.

**Bài 6**: Cách tiếp cận — hàm đổi dấu nên **không** lấy $\\int f$ thẳng, phải tách theo dấu. $x^2 - 1 < 0$ trên $[0, 1]$ và $> 0$ trên $[1, 2]$. Nguyên hàm $F(x) = \\frac{x^3}{3} - x$.
- Đoạn $[0,1]$ (âm): $\\int_0^1 (x^2-1)\\,dx = F(1) - F(0) = \\left(\\frac13 - 1\\right) - 0 = -\\frac23$. Diện tích phần này $= \\left|-\\frac23\\right| = \\frac23$.
- Đoạn $[1,2]$ (dương): $\\int_1^2 (x^2-1)\\,dx = F(2) - F(1) = \\left(\\frac83 - 2\\right) - \\left(\\frac13 - 1\\right) = \\frac23 - \\left(-\\frac23\\right) = \\frac43$.
- Diện tích thật $= \\frac23 + \\frac43 =$ **2**. (Lưu ý: $\\int_0^2 (x^2-1)\\,dx = -\\frac23 + \\frac43 = \\frac23$ — đây là diện tích đại số, KHÁC diện tích thật.)

**Bài 7**: Cách tiếp cận — $|x-1|$ đổi công thức tại $x = 1$, dùng cộng đoạn. Trên $[0,1]$: $|x-1| = 1 - x$. Trên $[1,2]$: $|x-1| = x - 1$.
- $\\int_0^1 (1-x)\\,dx = \\left[x - \\frac{x^2}{2}\\right]_0^1 = 1 - \\frac12 = \\frac12$.
- $\\int_1^2 (x-1)\\,dx = \\left[\\frac{x^2}{2} - x\\right]_1^2 = (2 - 2) - \\left(\\frac12 - 1\\right) = 0 - \\left(-\\frac12\\right) = \\frac12$.
- Tổng $= \\frac12 + \\frac12 =$ **1**. (Khớp hình học: hai tam giác vuông cạnh 1 → mỗi cái $\\frac12$.)

**Bài 8**: Cách tiếp cận — hình thang với $n = 2$: $\\Delta x = 0.5$, điểm $x_0 = 0, x_1 = 0.5, x_2 = 1$. $f = 0, 0.25, 1$.
$$\\int_0^1 x^2\\,dx \\approx \\frac{\\Delta x}{2}\\left[f(x_0) + 2f(x_1) + f(x_2)\\right] = \\frac{0.5}{2}\\left[0 + 2(0.25) + 1\\right] = 0.25 \\times 1.5 = 0.375.$$
So với thật $\\frac13 \\approx 0.3333$: sai số $\\approx 0.042$. Hình thang overestimate vì $x^2$ lồi (cong lên) → đoạn thẳng nối nằm trên đường cong. Tăng $n$ → sai số giảm bậc 2.

---

## 9. Bài tiếp theo

[Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/).

## 📝 Tổng kết

1. **Tổng Riemann**: $S_n = \\sum f(x_i)\\Delta x$ = cộng vô số lát mỏng. $n \\to \\infty \\to \\int_a^b f\\,dx$. 3 cách chọn (trái/phải/giữa) cùng giới hạn; giữa hội tụ nhanh nhất.
2. **FTC**: nếu $F' = f$ thì $\\int_a^b f = F(b) - F(a)$. Đạo hàm & tích phân là ngược nhau (diện tích tích lũy $G' = f$).
3. **Tính chất**: tuyến tính, cộng đoạn, đảo cận đổi dấu, $\\int_a^a = 0$, so sánh $f\\leq g$.
4. $\\int$ có thể âm — là **diện tích có dấu**; diện tích thật khi đổi dấu dùng $\\int|f|$ (tách theo dấu).
5. Đổi biến **phải đổi cận**. Từng phần áp dụng được.
6. Không có nguyên hàm dạng đóng → tính **bằng số**: hình thang $O(1/n^2)$, Simpson $O(1/n^4)$.
`;
