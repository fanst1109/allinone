// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-02-function-limits-continuity/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Giới hạn hàm & Liên tục

## Mục tiêu

- Hiểu **giới hạn hàm số** $\\lim_{x \\to a} f(x)$.
- Giới hạn 1 bên (trái, phải) và giới hạn 2 bên.
- Định nghĩa **hàm liên tục** tại 1 điểm và trên 1 khoảng.
- Phân loại điểm gián đoạn.
- Định lý giá trị trung gian (IVT).

## Kiến thức tiền đề

- [Lesson 01 — Giới hạn dãy](../lesson-01-sequences-limits/).

---

## 1. Giới hạn hàm số

💡 **Là gì**: $\\lim_{x \\to a} f(x) = L$ có nghĩa **khi $x$ càng gần $a$, $f(x)$ càng gần $L$**.

💡 **Trực giác cốt lõi — "tiến tới mà không cần chạm"**: tưởng tượng bạn lái xe trên một con đường (đồ thị $y = f(x)$) hướng về cột mốc tại $x = a$. Câu hỏi của giới hạn **không** phải "có cái gì ngay tại cột mốc?" mà là "khi tôi tiến sát cột mốc, độ cao của con đường đang **nhắm tới** giá trị nào?". Bạn có thể không bao giờ tới đúng cột mốc (đường có thể bị đào hố ngay tại đó — $f(a)$ không xác định), hoặc tại cột mốc có một biển báo lẻ treo lơ lửng ở độ cao khác ($f(a) \\neq L$) — cả hai đều **không** ảnh hưởng tới "độ cao đang nhắm tới". Giới hạn chỉ đọc **xu hướng của lân cận**, không đọc giá trị tại điểm.

Cụ thể hơn, "tiến tới mà không cần chạm" thể hiện ngay trong ký hiệu $0 < |x - a|$ của định nghĩa hình thức bên dưới: dấu $0 <$ cố ý **loại trừ** $x = a$. Ta lấy thông tin từ mọi điểm sát $a$, trừ đúng $a$.

⚠ **Quan trọng**: Giá trị tại $x = a$ **không quan trọng** (có thể $f(a)$ không xác định, hoặc khác $L$). Chỉ quan tâm "xung quanh $a$".

**Bảng tiến gần (numerical approach) cho $\\lim_{x \\to 1} \\frac{x^2-1}{x-1}$** — thấy tận mắt "tiến tới mà không chạm":

| $x$ (trái) | $f(x)$ | | $x$ (phải) | $f(x)$ |
|-----------|--------|---|-----------|--------|
| $0.9$ | $1.9$ | | $1.1$ | $2.1$ |
| $0.99$ | $1.99$ | | $1.01$ | $2.01$ |
| $0.999$ | $1.999$ | | $1.001$ | $2.001$ |
| $0.9999$ | $1.9999$ | | $1.0001$ | $2.0001$ |
| $1$ | **không xác định** | | $1$ | **không xác định** |

Hai cột cùng ép $f(x)$ về **2** — dù ngay tại $x = 1$ hàm "thủng lỗ". Đó chính là $\\lim_{x \\to 1} f(x) = 2$.

Đồ thị (lỗ trống tại $x = 1$, vòng tròn rỗng = điểm bị khoét):

<svg viewBox="0 0 400 280" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị f(x) tiến tới 2 khi x tiến tới 1 nhưng có lỗ trống tại x = 1: giới hạn tồn tại, giá trị hàm không">
  <defs><marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="150.0" y1="240.0" x2="150.0" y2="36.0"/>
<line x1="240.0" y1="240.0" x2="240.0" y2="36.0"/>
<line x1="330.0" y1="240.0" x2="330.0" y2="36.0"/>
<line x1="60.0" y1="180.0" x2="366.0" y2="180.0"/>
<line x1="60.0" y1="120.0" x2="366.0" y2="120.0"/>
<line x1="60.0" y1="60.0" x2="366.0" y2="60.0"/>
</g>
  <line x1="54.0" y1="240.0" x2="388.0" y2="240.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
  <line x1="60.0" y1="246.0" x2="60.0" y2="14.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
  <text x="380.0" y="256.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="24.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">f(x)</text>
  <line x1="150.0" y1="236.0" x2="150.0" y2="244.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="150.0" y="256.0" fill="#475569" font-size="11" text-anchor="middle">0.5</text>
  <line x1="240.0" y1="236.0" x2="240.0" y2="244.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="240.0" y="256.0" fill="#475569" font-size="11" text-anchor="middle">1 (a)</text>
  <line x1="330.0" y1="236.0" x2="330.0" y2="244.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="256.0" fill="#475569" font-size="11" text-anchor="middle">1.5</text>
  <line x1="56.0" y1="180.0" x2="64.0" y2="180.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="184.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="56.0" y1="120.0" x2="64.0" y2="120.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="124.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="56.0" y1="60.0" x2="64.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">3</text>
  <path d="M 60.0,240.0 L 61.5,239.0 L 62.9,238.1 L 64.4,237.1 L 65.8,236.1 L 67.3,235.2 L 68.7,234.2 L 70.2,233.2 L 71.6,232.2 L 73.1,231.3 L 74.5,230.3 L 76.0,229.3 L 77.5,228.4 L 78.9,227.4 L 80.4,226.4 L 81.8,225.4 L 83.3,224.5 L 84.7,223.5 L 86.2,222.5 L 87.6,221.6 L 89.1,220.6 L 90.6,219.6 L 92.0,218.7 L 93.5,217.7 L 94.9,216.7 L 96.4,215.8 L 97.8,214.8 L 99.3,213.8 L 100.7,212.8 L 102.2,211.9 L 103.7,210.9 L 105.1,209.9 L 106.6,209.0 L 108.0,208.0 L 109.5,207.0 L 110.9,206.1 L 112.4,205.1 L 113.8,204.1 L 115.3,203.1 L 116.7,202.2 L 118.2,201.2 L 119.7,200.2 L 121.1,199.3 L 122.6,198.3 L 124.0,197.3 L 125.5,196.3 L 126.9,195.4 L 128.4,194.4 L 129.8,193.4 L 131.3,192.5 L 132.8,191.5 L 134.2,190.5 L 135.7,189.6 L 137.1,188.6 L 138.6,187.6 L 140.0,186.7 L 141.5,185.7 L 142.9,184.7 L 144.4,183.7 L 145.8,182.8 L 147.3,181.8 L 148.8,180.8 L 150.2,179.9 L 151.7,178.9 L 153.1,177.9 L 154.6,176.9 L 156.0,176.0 L 157.5,175.0 L 158.9,174.0 L 160.4,173.1 L 161.8,172.1 L 163.3,171.1 L 164.8,170.2 L 166.2,169.2 L 167.7,168.2 L 169.1,167.2 L 170.6,166.3 L 172.0,165.3 L 173.5,164.3 L 174.9,163.4 L 176.4,162.4 L 177.9,161.4 L 179.3,160.5 L 180.8,159.5 L 182.2,158.5 L 183.7,157.6 L 185.1,156.6 L 186.6,155.6 L 188.0,154.6 L 189.5,153.7 L 190.9,152.7 L 192.4,151.7 L 193.9,150.8 L 195.3,149.8 L 196.8,148.8 L 198.2,147.9 L 199.7,146.9 L 201.1,145.9 L 202.6,144.9 L 204.0,144.0 L 205.5,143.0 L 207.0,142.0 L 208.4,141.1 L 209.9,140.1 L 211.3,139.1 L 212.8,138.2 L 214.2,137.2 L 215.7,136.2 L 217.1,135.2 L 218.6,134.3 L 220.1,133.3 L 221.5,132.3 L 223.0,131.4 L 224.4,130.4 L 225.9,129.4 L 227.3,128.4 L 228.8,127.5 L 230.2,126.5 L 231.7,125.5 L 233.1,124.6 L 234.6,123.6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 245.4,116.4 L 246.3,115.8 L 247.3,115.2 L 248.2,114.5 L 249.1,113.9 L 250.1,113.3 L 251.0,112.7 L 251.9,112.1 L 252.8,111.4 L 253.8,110.8 L 254.7,110.2 L 255.6,109.6 L 256.6,109.0 L 257.5,108.3 L 258.4,107.7 L 259.4,107.1 L 260.3,106.5 L 261.2,105.9 L 262.1,105.2 L 263.1,104.6 L 264.0,104.0 L 264.9,103.4 L 265.9,102.8 L 266.8,102.1 L 267.7,101.5 L 268.6,100.9 L 269.6,100.3 L 270.5,99.7 L 271.4,99.0 L 272.4,98.4 L 273.3,97.8 L 274.2,97.2 L 275.2,96.6 L 276.1,95.9 L 277.0,95.3 L 278.0,94.7 L 278.9,94.1 L 279.8,93.5 L 280.7,92.8 L 281.7,92.2 L 282.6,91.6 L 283.5,91.0 L 284.5,90.4 L 285.4,89.7 L 286.3,89.1 L 287.2,88.5 L 288.2,87.9 L 289.1,87.3 L 290.0,86.6 L 291.0,86.0 L 291.9,85.4 L 292.8,84.8 L 293.8,84.2 L 294.7,83.5 L 295.6,82.9 L 296.6,82.3 L 297.5,81.7 L 298.4,81.1 L 299.3,80.4 L 300.3,79.8 L 301.2,79.2 L 302.1,78.6 L 303.1,78.0 L 304.0,77.3 L 304.9,76.7 L 305.9,76.1 L 306.8,75.5 L 307.7,74.9 L 308.6,74.2 L 309.6,73.6 L 310.5,73.0 L 311.4,72.4 L 312.4,71.8 L 313.3,71.1 L 314.2,70.5 L 315.1,69.9 L 316.1,69.3 L 317.0,68.7 L 317.9,68.0 L 318.9,67.4 L 319.8,66.8 L 320.7,66.2 L 321.7,65.6 L 322.6,64.9 L 323.5,64.3 L 324.4,63.7 L 325.4,63.1 L 326.3,62.5 L 327.2,61.8 L 328.2,61.2 L 329.1,60.6 L 330.0,60.0 L 331.0,59.4 L 331.9,58.7 L 332.8,58.1 L 333.8,57.5 L 334.7,56.9 L 335.6,56.3 L 336.5,55.6 L 337.5,55.0 L 338.4,54.4 L 339.3,53.8 L 340.3,53.2 L 341.2,52.5 L 342.1,51.9 L 343.1,51.3 L 344.0,50.7 L 344.9,50.1 L 345.8,49.4 L 346.8,48.8 L 347.7,48.2 L 348.6,47.6 L 349.6,47.0 L 350.5,46.3 L 351.4,45.7 L 352.3,45.1 L 353.3,44.5 L 354.2,43.9 L 355.1,43.2 L 356.1,42.6 L 357.0,42.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="240.0" y1="120.0" x2="240.0" y2="240.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="240.0" y1="120.0" x2="60.0" y2="120.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="240.0" cy="120.0" r="5" fill="#f8fafc" stroke="#dc2626" stroke-width="2"/>
  <text x="252.0" y="114.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">lim f = 2, nhưng f(1) không tồn tại (lỗ trống)</text>
  <text x="122.0" y="204.0" fill="#1d4ed8" font-size="12" text-anchor="start">f(x)</text>
</svg>

**Ví dụ kinh điển**: $f(x) = \\frac{x^2 - 1}{x - 1}$ khi $x \\to 1$.
- Tại $x = 1$: $f(1) = \\frac{0}{0} =$ không xác định!
- Nhưng $x \\neq 1$: $f(x) = \\frac{(x-1)(x+1)}{x-1} = x + 1$.
- $\\lim_{x \\to 1} f(x) = 1 + 1 =$ **2**.

⟶ Giới hạn tồn tại dù $f$ không xác định tại $a$.

### Định nghĩa hình thức ($\\varepsilon$-$\\delta$, Cauchy 1820)

$$\\lim_{x \\to a} f(x) = L \\iff \\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x: 0 < |x - a| < \\delta \\implies |f(x) - L| < \\varepsilon$$

💡 Đọc: "Cho dù sai số $\\varepsilon$ đòi nhỏ thế nào, có khoảng $(a-\\delta, a+\\delta)$ (trừ chính $a$) làm cho $f$ rơi vào khoảng $(L-\\varepsilon, L+\\varepsilon)$".

> 📐 **Định nghĩa đầy đủ — Liên tục tại $a$**
>
> **(a) Là gì**: Hàm $f$ liên tục tại $a$ khi và chỉ khi **3 điều** đồng thời đúng: (1) $f(a)$ xác định, (2) $\\lim_{x \\to a} f(x)$ tồn tại, (3) chúng bằng nhau: $\\lim = f(a)$. Đồ thị "vẽ được không nhấc bút" qua điểm $a$.
>
> **(b) Vì sao cần**: Liên tục là điều kiện đảm bảo các tính chất "đẹp" — IVT (PT có nghiệm khi đổi dấu), định lý cực trị (đạt min/max trên đoạn đóng), tích phân được. Hàm liên tục là **vật liệu tốt** của Giải tích. Mọi hàm "tự nhiên" (đa thức, $\\sin$, $\\cos$, $e^x$, $\\ln x$) đều liên tục trên miền xác định. Gián đoạn là dấu hiệu của "biến động đột ngột" — vd nhiệt độ thay đổi pha (đá → nước), điện áp on/off.
>
> **(c) Ví dụ số**: $f(x) = x^2$ liên tục tại 2: $f(2) = 4$, $\\lim_{x \\to 2} x^2 = 4$, khớp ✓. $f(x) = \\frac{x^2-1}{x-1}$ **gián đoạn bỏ được** tại 1: $f(1)$ chưa định nghĩa, nhưng $\\lim = 2 \\to$ sửa $f(1)=2$ thì liên tục. $f(x) = \\frac{1}{x}$ **gián đoạn vô hạn** tại 0: $\\lim$ trái $= -\\infty$, $\\lim$ phải $= +\\infty$. $f(x) = \\lfloor x \\rfloor$ (sàn) **gián đoạn nhảy** tại mọi số nguyên: $f(2^-) = 1$, $f(2^+) = 2$.

**4 ví dụ số đa dạng cho $\\lim_{x \\to a} f(x)$** (đủ các "kiểu" gặp được):
- Hàm liên tục thường (thay trực tiếp): $\\lim_{x \\to 3} (2x+1) = 7$. Verify: $x = 2.99 \\to 6.98$, $x = 3.01 \\to 7.02$ — kẹp về 7.
- Dạng $\\frac{0}{0}$ rút gọn được: $\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = \\lim(x+2) = 4$. Verify: $x = 1.999 \\to 3.999$, $x = 2.001 \\to 4.001$.
- Giới hạn không tồn tại (hai bên lệch): $\\lim_{x \\to 0} \\frac{|x|}{x}$ — trái $= -1$, phải $= +1 \\to$ không tồn tại.
- Giới hạn tại điểm hàm xác định nhưng lệch giá trị: $f(x) = 1$ mọi $x \\neq 0$, $f(0) = 5 \\to \\lim_{x \\to 0} f = 1 \\neq f(0)$.

**Một cái bẫy thực sự — bảng giá trị có thể lừa**: với $f(x) = \\sin\\!\\left(\\frac{1}{x}\\right)$ khi $x \\to 0$, nếu bạn lập bảng tại $x = \\frac{1}{\\pi}, \\frac{1}{2\\pi}, \\frac{1}{3\\pi}, \\dots$ thì $f$ luôn $= 0$ → tưởng $\\lim = 0$. Nhưng tại $x = \\frac{1}{\\pi/2 + 2k\\pi}$ thì $f = 1$, và tại $x = \\frac{1}{-\\pi/2 + 2k\\pi}$ thì $f = -1$. Hàm dao động **vô số lần** càng gần 0 càng nhanh → $\\lim_{x \\to 0} \\sin(1/x)$ **không tồn tại**. Bài học: bảng số là **gợi ý**, không phải chứng minh; chỉ định nghĩa $\\varepsilon$-$\\delta$ hoặc quy tắc đại số mới chắc chắn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu chỉ quan tâm 'xung quanh $a$', sao không thay luôn $x = a$ vào?"* Với hàm liên tục thì thay được (đó chính là định nghĩa liên tục). Nhưng khi gặp $\\frac{0}{0}$ (như $\\frac{x^2-1}{x-1}$ tại 1), thay trực tiếp ra vô nghĩa — phải rút gọn rồi mới thay. Giới hạn là công cụ xử lý đúng những chỗ "thay không được".
- *"$\\delta$ phụ thuộc vào gì?"* Phụ thuộc cả $\\varepsilon$ lẫn điểm $a$. $\\varepsilon$ đòi nhỏ hơn → $\\delta$ thường phải nhỏ hơn. Giống $\\varepsilon$-N của dãy: trật tự "$\\forall \\varepsilon, \\exists \\delta$" cho phép $\\delta$ co theo $\\varepsilon$.

⚠ **Lỗi thường gặp — tưởng $\\lim_{x \\to a} f(x) = f(a)$ luôn đúng**. Sai cho hàm gián đoạn. Phản ví dụ: $f(x) = \\frac{x^2-1}{x-1}$ có $f(1)$ không xác định nhưng $\\lim = 2$; hay $f(x) = \\lfloor x \\rfloor$ có $f(2) = 2$ nhưng $\\lim_{x \\to 2^-} = 1$. Thay trực tiếp chỉ hợp lệ khi đã biết hàm liên tục tại đó.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = ?$
2. Giá trị $f(2)$ có ảnh hưởng tới $\\lim_{x \\to 2} f(x)$ không?

<details><summary>Đáp án</summary>

1. $x^3-1 = (x-1)(x^2+x+1) \\to$ rút gọn còn $x^2+x+1 \\to$ thay $x=1 \\to 3$.
2. Không. Giới hạn chỉ phụ thuộc giá trị $f$ ở **lân cận** $a$, không phụ thuộc $f(a)$.

</details>

### 📝 Tóm tắt mục 1

- $\\lim_{x \\to a} f(x) = L$: $f(x)$ gần $L$ tùy ý khi $x$ gần $a$ — **không quan tâm $f(a)$**.
- Định nghĩa $\\varepsilon$-$\\delta$: $\\forall \\varepsilon > 0, \\exists \\delta > 0, 0 < |x-a| < \\delta \\implies |f(x)-L| < \\varepsilon$.
- Gặp $\\frac{0}{0}$: rút gọn/nhân liên hợp trước rồi mới thay.

---

## 2. Giới hạn 1 bên

**Giới hạn trái**: $\\lim_{x \\to a^-} f(x)$ — $x$ tiến $a$ từ phía nhỏ hơn.

**Giới hạn phải**: $\\lim_{x \\to a^+} f(x)$ — $x$ tiến $a$ từ phía lớn hơn.

**Định lý**: Giới hạn 2 bên tồn tại $\\iff$ 2 giới hạn 1 bên tồn tại và **bằng nhau**.

**Ví dụ**: $f(x) = \\frac{|x|}{x}$. Khi $x \\to 0$:
- $x < 0$: $f = -1 \\to \\lim$ trái $= -1$.
- $x > 0$: $f = 1 \\to \\lim$ phải $= 1$.
- Khác nhau → **$\\lim$ 2 bên KHÔNG tồn tại**.

Đồ thị hàm dấu $\\frac{|x|}{x}$ (nhảy tại 0, hai bên lệch):

<svg viewBox="0 0 400 255" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị hàm dấu |x|/x: bằng −1 khi x &lt; 0, bằng +1 khi x &gt; 0, nhảy tại x = 0, hai bên lệch nhau">
  <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="40.0" y1="200.0" x2="40.0" y2="40.0"/>
<line x1="120.0" y1="200.0" x2="120.0" y2="40.0"/>
<line x1="280.0" y1="200.0" x2="280.0" y2="40.0"/>
<line x1="360.0" y1="200.0" x2="360.0" y2="40.0"/>
<line x1="24.0" y1="70.0" x2="376.0" y2="70.0"/>
<line x1="24.0" y1="170.0" x2="376.0" y2="170.0"/>
</g>
  <line x1="18.0" y1="120.0" x2="398.0" y2="120.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar2)"/>
  <line x1="200.0" y1="206.0" x2="200.0" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar2)"/>
  <text x="390.0" y="136.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">f(x)</text>
  <line x1="40.0" y1="116.0" x2="40.0" y2="124.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="40.0" y="136.0" fill="#475569" font-size="11" text-anchor="middle">−2</text>
  <line x1="120.0" y1="116.0" x2="120.0" y2="124.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="120.0" y="136.0" fill="#475569" font-size="11" text-anchor="middle">−1</text>
  <line x1="280.0" y1="116.0" x2="280.0" y2="124.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="280.0" y="136.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="360.0" y1="116.0" x2="360.0" y2="124.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="360.0" y="136.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="196.0" y1="70.0" x2="204.0" y2="70.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="74.0" fill="#475569" font-size="11" text-anchor="end">+1</text>
  <line x1="196.0" y1="170.0" x2="204.0" y2="170.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="174.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="204.0" y1="70.0" x2="368.0" y2="70.0" stroke="#1d4ed8" stroke-width="3"/>
  <line x1="32.0" y1="170.0" x2="196.0" y2="170.0" stroke="#1d4ed8" stroke-width="3"/>
  <circle cx="200.0" cy="70.0" r="5" fill="#f8fafc" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="200.0" cy="170.0" r="5" fill="#f8fafc" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="200.0" cy="120.0" r="5" fill="#f8fafc" stroke="#dc2626" stroke-width="2"/>
  <text x="280.0" y="60.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">x &gt; 0: f = +1</text>
  <text x="120.0" y="190.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">x &lt; 0: f = −1</text>
  <text x="208.0" y="138.0" fill="#dc2626" font-size="11" text-anchor="start">a = 0: không xác định</text>
  <text x="200.0" y="240.0" fill="#475569" font-size="12" text-anchor="middle">lim trái = −1 ≠ lim phải = +1 → NHẢY, giới hạn không tồn tại</text>
</svg>

Hai mép \`o\` ở hai độ cao khác nhau → không có giá trị duy nhất để "tiến tới" → giới hạn hai bên DNE.

💡 **Trực giác**: tưởng tượng đi bộ trên đồ thị tiến về điểm $x = a$. Đi từ bên trái thấy hàm dẫn về giá trị nào ($\\lim$ trái), đi từ bên phải thấy dẫn về đâu ($\\lim$ phải). Chỉ khi hai lối đi gặp nhau ở cùng một điểm thì mới có giới hạn hai bên.

**3 ví dụ walk-through giới hạn một bên**:
- Hàm chia khúc: $f(x) = \\begin{cases} x^2 & x < 1 \\\\ x+3 & x \\ge 1 \\end{cases}$. $\\lim_{x \\to 1^-} = 1^2 = 1$; $\\lim_{x \\to 1^+} = 1+3 = 4$. Lệch → $\\lim_{x \\to 1}$ DNE.
- Biên miền xác định: $f(x) = \\sqrt{x}$ tại $x = 0$. Bên trái $x < 0$ không xác định (không lấy căn số âm) → chỉ có $\\lim_{x \\to 0^+} \\sqrt{x} = 0$. Đây là giới hạn một bên "tự nhiên" — không phải lỗi.
- Tiệm cận đứng lệch dấu: $f(x) = \\frac{1}{x}$. $\\lim_{x \\to 0^-} = -\\infty$, $\\lim_{x \\to 0^+} = +\\infty$. Hai bên bay về hai vô cực khác → $\\lim_{x \\to 0} \\frac{1}{x}$ DNE.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào bắt buộc xét 1 bên?"* Khi hàm "đổi công thức" qua $a$ (hàm chia khúc), có giá trị tuyệt đối quanh $a$, hoặc $a$ là biên miền xác định (vd $\\sqrt{x}$ tại $x = 0$ chỉ có $\\lim$ phải). Hàm trơn thông thường thì hai bên tự khớp.
- *"Hàm sàn $\\lfloor x \\rfloor$ tại $x = 2$ có giới hạn không?"* Không. $\\lim$ trái $= 1$ (các giá trị ngay dưới 2 như $1.99$ cho $\\lfloor \\cdot \\rfloor = 1$), $\\lim$ phải $= 2$. Lệch → không tồn tại giới hạn hai bên.

⚠ **Lỗi thường gặp — kết luận có giới hạn khi mới xét 1 bên**. Tính $\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty$ rồi vội nói "$\\lim = +\\infty$" là sai: $\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty$. Hai bên lệch → giới hạn hai bên KHÔNG tồn tại. Luôn kiểm tra cả hai phía ở điểm nghi ngờ.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$ với $x < 1$, $f(x) = x + 3$ với $x \\ge 1$. $\\lim_{x \\to 1} f(x)$ có tồn tại không?
2. $\\lim_{x \\to 0^-} \\frac{|x|}{x} = ?$

<details><summary>Đáp án</summary>

1. $\\lim$ trái $= 1^2 = 1$, $\\lim$ phải $= 1+3 = 4$. Lệch → **không tồn tại**.
2. Với $x < 0$, $|x| = -x \\to \\frac{|x|}{x} = -1$. $\\lim$ trái $= -1$.

</details>

### 📝 Tóm tắt mục 2

- $\\lim$ trái $\\lim_{x \\to a^-}$ (tiến từ phía nhỏ), $\\lim$ phải $\\lim_{x \\to a^+}$ (tiến từ phía lớn).
- Giới hạn hai bên tồn tại $\\iff$ hai $\\lim$ một bên tồn tại **và bằng nhau**.
- Bắt buộc xét một bên ở: hàm chia khúc, $|\\cdot|$, biên miền xác định.

---

## 3. Giới hạn vô hạn / vô cùng

- **$\\lim f(x) = \\infty$**: $f$ tăng vô hạn khi $x \\to a$. VD $\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty$.
- **$\\lim_{x \\to \\infty} f(x) = L$**: $x$ ra vô cùng, $f$ tiến $L$. VD $\\lim_{x \\to \\infty} \\frac{1}{x} = 0$.

💡 **Trực giác — phân biệt hai loại "vô cùng"**: $\\lim = \\infty$ (giá trị hàm bay lên trời, tiệm cận **đứng**) khác $\\lim_{x \\to \\infty}$ (biến bay ra xa, xét tiệm cận **ngang**). Đừng lẫn "hàm ra vô cực" với "biến ra vô cực".

**Walk-through giới hạn ∞ — chia cho lũy thừa lớn nhất**: $\\lim_{x \\to \\infty} \\frac{3x^2 + 2x}{x^2 - 5}$ là dạng vô định $\\frac{\\infty}{\\infty}$. Chia cả tử và mẫu cho $x^2$ (lũy thừa cao nhất):

$$\\frac{3x^2 + 2x}{x^2 - 5} = \\frac{3 + \\dfrac{2}{x}}{1 - \\dfrac{5}{x^2}} \\xrightarrow{x \\to \\infty} \\frac{3 + 0}{1 - 0} = 3$$

Verify số: $x = 100 \\to \\frac{30200}{9995} \\approx 3.022$; $x = 1000 \\to \\approx 3.002$ — tiến về 3 ✓.

**Quy tắc nhanh cho thương đa thức $\\frac{P(x)}{Q(x)}$ tại $x \\to \\infty$** (bậc tử $m$, bậc mẫu $n$):

$$\\lim_{x \\to \\infty} \\frac{P(x)}{Q(x)} = \\begin{cases} 0 & m < n \\ (\\text{mẫu trội}) \\\\[4pt] \\dfrac{\\text{hệ số đầu } P}{\\text{hệ số đầu } Q} & m = n \\\\[4pt] \\pm\\infty & m > n \\ (\\text{tử trội}) \\end{cases}$$

Verify 3 trường hợp:
- $m < n$: $\\lim_{x \\to \\infty} \\frac{x+1}{x^2+3} = 0$. Check $x = 1000 \\to \\frac{1001}{1000003} \\approx 0.001 \\to 0$ ✓.
- $m = n$: $\\lim_{x \\to \\infty} \\frac{2x^3+x}{5x^3-7} = \\frac{2}{5}$. Check $x = 1000 \\to \\approx 0.4$ ✓.
- $m > n$: $\\lim_{x \\to \\infty} \\frac{x^2+1}{x-1} = +\\infty$. Check $x = 1000 \\to \\approx 1001$, tăng vô hạn ✓.

⚠ **Cẩn thận dấu khi $x \\to -\\infty$ với lũy thừa lẻ**: $\\lim_{x \\to -\\infty} x^3 = -\\infty$ (không phải $+\\infty$). Và với căn: $\\sqrt{x^2} = |x| = -x$ khi $x < 0$ — sai dấu này là lỗi kinh điển khi xử lý $\\frac{\\sqrt{x^2+1}}{x}$ tại $-\\infty$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\lim = \\infty$ có phải là 'giới hạn tồn tại' không?"* Theo nghĩa chặt (giới hạn hữu hạn) thì KHÔNG — ta nói "giới hạn vô cực" như một mô tả hành vi, không phải một số. Khi viết $\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty$ ta đang nói "hàm tăng vô hạn", đây là cách diễn đạt được chấp nhận.
- *"Làm sao tính $\\lim_{x \\to \\infty}$ của hàm hữu tỉ nhanh?"* So bậc tử/mẫu: bậc tử < mẫu → 0; bằng nhau → tỉ số hệ số đầu; tử > mẫu → $\\pm\\infty$. Vd $\\lim_{x \\to \\infty} \\frac{3x^2+1}{x^2+5} = \\frac{3}{1} = 3$.

⚠ **Lỗi thường gặp — nhầm tiệm cận đứng với ngang**. $\\frac{1}{x}$: tại $x \\to 0$ ra $\\pm\\infty$ (tiệm cận **đứng** $x = 0$); tại $x \\to \\infty$ ra $0$ (tiệm cận **ngang** $y = 0$). Hai câu hỏi hoàn toàn khác nhau, đừng trộn lẫn.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to \\infty} \\frac{2x^3 + x}{5x^3 - 1} = ?$
2. $\\lim_{x \\to 0} \\frac{1}{x^2} = ?$ (cẩn thận hai bên)

<details><summary>Đáp án</summary>

1. Cùng bậc 3 → tỉ số hệ số đầu $= \\frac{2}{5}$.
2. $+\\infty$ cả hai bên (vì $x^2 > 0$ luôn → khác $\\frac{1}{x}$). Ở đây nói $\\lim = +\\infty$ hợp lệ vì hai bên khớp.

</details>

### 📝 Tóm tắt mục 3

- $\\lim = \\infty$: hàm tăng/giảm vô hạn tại điểm $a$ → tiệm cận **đứng**.
- $\\lim_{x \\to \\infty} = L$: biến ra vô cực, hàm tiến $L$ → tiệm cận **ngang**.
- Hàm hữu tỉ tại vô cực: so bậc tử/mẫu để có kết quả nhanh.

---

## 4. Quy tắc tính giới hạn hàm

Tương tự dãy: $\\lim(f+g) = \\lim f + \\lim g$, ... (khi cả 2 tồn tại).

Giả sử $\\lim_{x \\to a} f = L$ và $\\lim_{x \\to a} g = M$ đều là số thực. Khi đó:

| Quy tắc | Phát biểu |
|---------|-----------|
| Tổng / Hiệu | $\\lim (f \\pm g) = L \\pm M$ |
| Hằng số | $\\lim (c \\cdot f) = c \\cdot L$ |
| Tích | $\\lim (f \\cdot g) = L \\cdot M$ |
| Thương | $\\lim (f / g) = L / M$, **miễn $M \\neq 0$** |
| Lũy thừa | $\\lim f^n = L^n$ ($n$ nguyên dương) |
| Hợp | nếu $g$ liên tục tại $L$ thì $\\lim g(f(x)) = g(L)$ |

**Walk-through kết hợp**: $\\lim_{x \\to 2} \\frac{x^2 + 3x}{x+1}$ — tách từng mảnh: $\\lim x^2 = 4$, $\\lim 3x = 6$, nên $\\lim(x^2+3x) = 10$ (quy tắc tổng); $\\lim(x+1) = 3 \\neq 0$, dùng quy tắc thương → $\\frac{10}{3}$. Khớp thay số trực tiếp $\\frac{4+6}{3} = \\frac{10}{3}$ ✓.

**Định lý kẹp (squeeze theorem)** — vũ khí cho hàm dao động: nếu $g(x) \\le f(x) \\le h(x)$ quanh $a$ và $\\lim g = \\lim h = L$ thì $\\lim f = L$. Ví dụ $\\lim_{x \\to 0} x^2 \\sin(1/x)$: vì $-1 \\le \\sin(1/x) \\le 1$ nên $-x^2 \\le x^2 \\sin(1/x) \\le x^2$; hai mép cùng $\\to 0$ → kẹp được $\\lim = 0$ (dù $\\sin(1/x)$ dao động điên cuồng).

**Dạng không xác định** (giống dãy): $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0 \\cdot \\infty$, $1^\\infty$...

### Mẹo giải $\\frac{0}{0}$

- Phân tích nhân tử (như VD trên).
- Liên hợp (cho căn).
- $\\frac{\\sin x}{x} = 1$.

💡 **Trực giác — vì sao có $\\frac{0}{0}$ mà vẫn ra số hữu hạn**: $\\frac{0}{0}$ không có nghĩa "tử và mẫu đều bằng 0" mà là "cả hai cùng tiến về 0". Tốc độ tiến về 0 của tử so với mẫu quyết định kết quả. Như cuộc đua hai vận động viên cùng về đích: ai nhanh hơn (gấp mấy lần) mới là câu trả lời.

#### Kỹ thuật 1 — phân tích nhân tử (walk-through 4 ví dụ)

Khi tử/mẫu là **đa thức** và cùng triệt tiêu tại $x = a$, chúng đều có nhân tử $(x - a)$. Rút gọn rồi mới thay:

- $\\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim \\frac{(x-1)(x+1)}{x-1} = \\lim (x+1) = 2$.
- $\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = \\lim (x+2) = 4$.
- $\\lim_{x \\to 3} \\frac{x^2-5x+6}{x-3} = \\lim \\frac{(x-2)(x-3)}{x-3} = \\lim (x-2) = 1$.
- $\\lim_{x \\to 1} \\frac{x^3-1}{x-1} = \\lim \\frac{(x-1)(x^2+x+1)}{x-1} = \\lim (x^2+x+1) = 3$.

Tổng quát đẹp: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n \\cdot a^{n-1}$ — đây chính là đạo hàm của $x^n$ (sẽ gặp ở [Lesson 03](../lesson-03-derivative-definition/)).

#### Kỹ thuật 2 — nhân lượng liên hợp (rationalize, walk-through 4 ví dụ)

Khi có **căn** $\\sqrt{\\dots}$, nhân tử và mẫu với "lượng liên hợp" để biến hiệu căn thành hiệu bình phương ($(\\sqrt{A}-B)(\\sqrt{A}+B) = A - B^2$):

$$\\begin{aligned}
\\lim_{x \\to 0} \\frac{\\sqrt{x+1}-1}{x}
&= \\lim_{x \\to 0} \\frac{(\\sqrt{x+1}-1)(\\sqrt{x+1}+1)}{x(\\sqrt{x+1}+1)} \\\\[4pt]
&= \\lim_{x \\to 0} \\frac{(x+1)-1}{x(\\sqrt{x+1}+1)}
= \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x+1}+1)} \\\\[4pt]
&= \\lim_{x \\to 0} \\frac{1}{\\sqrt{x+1}+1} = \\frac{1}{2}
\\end{aligned}$$

Verify số: $x = 0.01 \\to \\frac{\\sqrt{1.01}-1}{0.01} \\approx 0.4988$; $x = 0.001 \\to \\approx 0.4999 \\to 0.5$ ✓.

Thêm 3 ví dụ liên hợp:
- $\\lim_{x \\to 4} \\frac{\\sqrt{x}-2}{x-4} = \\lim \\frac{x-4}{(x-4)(\\sqrt{x}+2)} = \\lim \\frac{1}{\\sqrt{x}+2} = \\frac{1}{4}$.
- $\\lim_{x \\to 0} \\frac{x}{\\sqrt{x+9}-3} = \\lim \\frac{x(\\sqrt{x+9}+3)}{(x+9)-9} = \\lim (\\sqrt{x+9}+3) = 6$.
- $\\lim_{x \\to 1} \\frac{x-1}{\\sqrt{x}-1} = \\lim \\frac{(x-1)(\\sqrt{x}+1)}{x-1} = \\lim (\\sqrt{x}+1) = 2$.

#### Kỹ thuật 3 — giới hạn đặc biệt $\\dfrac{\\sin x}{x} = 1$

💡 Với $x$ nhỏ (radian), $\\sin x \\approx x$. Bảng kiểm:

| $x$ | $\\sin x$ | $\\sin x / x$ |
|-----|---------|-------------|
| $1$ | $0.84147$ | $0.84147$ |
| $0.1$ | $0.09983$ | $0.99833$ |
| $0.01$ | $0.00999983$ | $0.99998$ |
| $0.001$ | $0.0009999998$ | $0.99999983$ |

**Chứng minh từng bước (định lý kẹp)** — trên đường tròn đơn vị, với $x \\in (0, \\frac{\\pi}{2})$, so diện tích:

$$\\begin{aligned}
&\\text{tam giác nhỏ} < \\text{hình quạt} < \\text{tam giác lớn} \\\\[4pt]
&\\tfrac{1}{2}\\sin x < \\tfrac{1}{2}x < \\tfrac{1}{2}\\tan x \\\\[4pt]
&\\sin x < x < \\frac{\\sin x}{\\cos x}
\\end{aligned}$$

Chia ba vế cho $\\sin x > 0$ rồi lật ngược (đảo dấu bất đẳng thức):

$$\\cos x < \\frac{\\sin x}{x} < 1$$

Khi $x \\to 0^+$, $\\cos x \\to 1$, hai mép kẹp $\\frac{\\sin x}{x}$ về 1. Hàm $\\frac{\\sin x}{x}$ chẵn nên phía âm cũng vậy. Kết luận $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.

Áp dụng nhanh: $\\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} 3 \\cdot \\frac{\\sin 3x}{3x} = 3 \\cdot 1 = 3$ (đặt $u = 3x$).

#### Kỹ thuật 4 — giới hạn đặc biệt $\\dfrac{e^x - 1}{x} = 1$

$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$$

Verify số: $x = 0.001 \\to \\frac{e^{0.001}-1}{0.001} = \\frac{0.0010005}{0.001} \\approx 1.0005 \\to 1$; $x = -0.001 \\to \\approx 0.9995 \\to 1$. Đây là đạo hàm của $e^x$ tại 0 (sẽ chứng minh kỹ ở Lesson về đạo hàm). Họ hàng: $\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\frac{1}{2}$ (verify: $x = 0.1 \\to \\frac{1-0.995004}{0.01} = 0.4996 \\approx 0.5$).

⚠ **Vòng lặp logic cấm**: KHÔNG dùng L'Hôpital để chứng minh $\\frac{\\sin x}{x} \\to 1$ — vì L'Hôpital cần $(\\sin x)' = \\cos x$, mà điều đó lại cần chính giới hạn này. Phải chứng minh bằng hình học/kẹp như trên.

**Verify mẹo bằng số** — $\\lim_{x \\to 1} \\frac{x^2-1}{x-1} = 2$:
- Thay gần: $x = 1.001 \\to \\frac{1.002001 - 1}{0.001} = \\frac{0.002001}{0.001} = 2.001 \\to$ tiến 2 ✓.
- Phân tích: $\\frac{(x-1)(x+1)}{x-1} = x+1 \\to 2$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng nhân liên hợp thay vì phân tích nhân tử?"* Khi biểu thức có **căn**. Vd $\\lim_{x \\to 0} \\frac{\\sqrt{x+1}-1}{x}$: nhân tử/mẫu với $\\sqrt{x+1}+1 \\to$ tử thành $(x+1)-1 = x \\to$ rút gọn $x \\to \\frac{1}{\\sqrt{x+1}+1} \\to \\frac{1}{2}$.
- *"$\\frac{0}{0}$ luôn ra số hữu hạn?"* Không. Có thể ra số ($\\frac{x^2-1}{x-1} \\to 2$), ra $\\infty$ ($\\frac{x}{x^2} = \\frac{1}{x} \\to \\infty$ khi $x \\to 0$), hoặc không tồn tại. Vì thế nó là dạng **vô định** — phải biến đổi mới biết.

⚠ **Lỗi thường gặp — kết luận $\\frac{0}{0} = 1$ hoặc $\\frac{0}{0} = 0$**. Phản ví dụ ngay: $\\lim_{x \\to 0} \\frac{2x}{x} = 2$ (không phải 1 hay 0), $\\lim_{x \\to 0} \\frac{x^2}{x} = 0$, $\\lim_{x \\to 0} \\frac{x}{x^2} = \\infty$. Ba kết quả khác nhau cho cùng dạng $\\frac{0}{0} \\to$ bắt buộc biến đổi.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = ?$
2. $\\lim_{x \\to 0} \\frac{\\sqrt{4+x} - 2}{x} = ?$

<details><summary>Đáp án</summary>

1. $\\frac{(x-3)(x+3)}{x-3} = x+3 \\to 6$.
2. Nhân liên hợp $\\sqrt{4+x}+2$: tử $\\to (4+x)-4 = x \\to \\frac{1}{\\sqrt{4+x}+2} \\to \\frac{1}{4}$.

</details>

### 📝 Tóm tắt mục 4

- $\\lim$ phân phối qua $+, -, \\cdot, /$ khi cả hai tồn tại (thương cần mẫu $\\neq 0$).
- $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$... là **vô định** — phải biến đổi (nhân tử, liên hợp, $\\frac{\\sin x}{x}$).
- Cùng dạng $\\frac{0}{0}$ có thể ra số, $\\infty$, hoặc không tồn tại tùy biểu thức.

---

## 5. Hàm liên tục

💡 **Trực giác**: Hàm liên tục là hàm "vẽ được không nhấc bút" — không có nhảy, không có lỗ.

**Định nghĩa hình thức**: $f$ liên tục tại $a$ nếu:

$$\\lim_{x \\to a} f(x) = f(a)$$

**3 điều kiện**:
1. $f(a)$ xác định.
2. $\\lim_{x \\to a} f(x)$ tồn tại.
3. Bằng nhau: $\\lim = f(a)$.

⟶ Nếu thiếu 1 trong 3 → **gián đoạn**.

#### Quy trình kiểm tra 3 điều kiện — walk-through ≥3 ví dụ

Mỗi điều kiện bịt một loại "vỡ": (1) có lỗ trống không, (2) có nhảy/dao động không, (3) giá trị thật có khớp xu hướng không. Kiểm theo thứ tự:

**Ví dụ A — liên tục**: $f(x) = x^2 + 1$ tại $a = 3$.
1. $f(3) = 10$ → xác định ✓.
2. $\\lim_{x \\to 3} (x^2+1) = 10$ → tồn tại ✓.
3. $10 = 10$ → khớp ✓. **Kết luận: liên tục** (phân loại: không gián đoạn).

**Ví dụ B — gián đoạn bỏ được** (vi phạm (3)): $f(x) = \\begin{cases} \\frac{x^2-9}{x-3} & x \\ne 3 \\\\ 1 & x = 3 \\end{cases}$ tại $a = 3$.
1. $f(3) = 1$ → xác định ✓.
2. $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = \\lim (x+3) = 6$ → tồn tại ✓.
3. $6 \\ne 1$ → **vi phạm**. Gián đoạn **bỏ được** — sửa $f(3) = 6$ thì liên tục.

**Ví dụ C — gián đoạn nhảy** (vi phạm (2)): $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ 2x & x > 1 \\end{cases}$ tại $a = 1$.
1. $f(1) = 1^2 = 1$ → xác định ✓.
2. $\\lim_{x \\to 1^-} = 1$, $\\lim_{x \\to 1^+} = 2 \\cdot 1 = 2$. Hai bên lệch → giới hạn **không tồn tại** → **vi phạm (2)**. Gián đoạn **nhảy** (jump), bước nhảy $= 2 - 1 = 1$.

**Ví dụ D — gián đoạn vô hạn** (vi phạm (1) và (2)): $f(x) = \\frac{1}{x-2}$ tại $a = 2$.
1. $f(2)$ → chia 0, **không xác định** → vi phạm (1).
2. $\\lim_{x \\to 2^-} = -\\infty$, $\\lim_{x \\to 2^+} = +\\infty$ → DNE → vi phạm (2). Gián đoạn **vô hạn** (tiệm cận đứng $x = 2$).

**4 ví dụ số đa dạng**:
- Liên tục: $f(x) = x^2$ tại $a = 2$: $f(2) = 4 = \\lim_{x \\to 2} x^2$ ✓.
- Gián đoạn (lỗ): $f(x) = \\frac{x^2-1}{x-1}$ tại $1$: $f(1)$ không xác định → vi phạm điều kiện (1).
- Gián đoạn (giá trị lệch): $f(x) = x+1$ nếu $x \\neq 1$, $f(1) = 5 \\to \\lim = 2 \\neq 5 = f(1) \\to$ vi phạm (3).
- Gián đoạn ($\\lim$ không tồn tại): $f(x) = \\frac{|x|}{x}$ tại $0 \\to$ vi phạm (2) (hai bên lệch).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên tục tại 1 điểm khác liên tục trên 1 khoảng thế nào?"* Liên tục trên $(a,b)$ nghĩa là liên tục tại **mọi** điểm trong khoảng. Một hàm có thể liên tục khắp nơi trừ vài điểm (vd $\\frac{1}{x}$ liên tục mọi nơi trừ $0$).
- *"Vì sao cần đủ cả 3 điều kiện?"* Vì mỗi điều kiện bịt một loại "vỡ": (1) hàm phải có giá trị tại đó (không có lỗ trống), (2) phải có xu hướng rõ ràng (không nhảy/dao động), (3) giá trị thật phải khớp xu hướng (không "lệch điểm"). Thiếu bất kỳ điều nào → vẽ phải nhấc bút.

⚠ **Lỗi thường gặp — chỉ kiểm $f(a)$ xác định rồi kết luận liên tục**. $f(x) = \\lfloor x \\rfloor$ có $f(2) = 2$ (xác định) nhưng vẫn gián đoạn tại 2 vì $\\lim$ không tồn tại. Phải kiểm đủ **cả ba** điều kiện, không chỉ điều kiện (1).

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{x-2}{x-2}$ với $x \\neq 2$, không định nghĩa tại 2. Liên tục tại 2 không?
2. $f(x) = x^2$ nếu $x \\le 1$, $f(x) = 2x$ nếu $x > 1$. Liên tục tại 1?

<details><summary>Đáp án</summary>

1. Không (vi phạm điều kiện 1 — $f(2)$ không tồn tại), dù $\\lim = 1$. Đây là gián đoạn **bỏ được**.
2. $\\lim$ trái $= 1$, $\\lim$ phải $= 2$, $f(1) = 1$. $\\lim$ hai bên lệch → **gián đoạn nhảy**, không liên tục.

</details>

### 📝 Tóm tắt mục 5

- Liên tục tại $a$ $\\iff$ đủ 3 điều: $f(a)$ xác định, $\\lim_{x \\to a} f$ tồn tại, hai cái bằng nhau.
- Liên tục trên khoảng = liên tục tại mọi điểm trong khoảng.
- Thiếu bất kỳ điều kiện nào → gián đoạn (phải kiểm cả ba).

---

## 6. Phân loại điểm gián đoạn

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Bỏ được** (removable) | $\\lim$ tồn tại nhưng $\\neq f(a)$ hoặc $f(a)$ chưa định nghĩa | $f(x) = \\frac{x^2-1}{x-1}$ tại $x=1$ |
| **Nhảy** (jump) | $\\lim$ trái $\\neq \\lim$ phải, cả 2 hữu hạn | $\\frac{|x|}{x}$ tại 0 |
| **Vô hạn** | $\\lim = \\pm\\infty$ | $\\frac{1}{x}$ tại 0 |

💡 **Bỏ được**: ta có thể "lấp" lỗ bằng cách định nghĩa lại $f(a) = \\lim$.

Đối chiếu 3 loại gián đoạn (vòng tròn rỗng = lỗ, nét đứt đỏ = bay vô hạn):

<svg viewBox="0 0 570 290" style="max-width:570px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba loại gián đoạn tại x = 1: bỏ được (lỗ trống, giới hạn tồn tại), nhảy (hai giới hạn một bên khác nhau), vô hạn (tiệm cận đứng)">
  <defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="90.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">BỎ ĐƯỢC (removable)</text>
  <line x1="-8.0" y1="150.0" x2="164.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <line x1="50.0" y1="208.0" x2="50.0" y2="36.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <text x="156.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="58.0" y="46.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 6.0,132.0 L 6.7,131.7 L 7.3,131.3 L 8.0,131.0 L 8.7,130.7 L 9.4,130.3 L 10.0,130.0 L 10.7,129.6 L 11.4,129.3 L 12.1,129.0 L 12.7,128.6 L 13.4,128.3 L 14.1,128.0 L 14.8,127.6 L 15.4,127.3 L 16.1,127.0 L 16.8,126.6 L 17.4,126.3 L 18.1,125.9 L 18.8,125.6 L 19.5,125.3 L 20.1,124.9 L 20.8,124.6 L 21.5,124.3 L 22.2,123.9 L 22.8,123.6 L 23.5,123.2 L 24.2,122.9 L 24.9,122.6 L 25.5,122.2 L 26.2,121.9 L 26.9,121.6 L 27.5,121.2 L 28.2,120.9 L 28.9,120.6 L 29.6,120.2 L 30.2,119.9 L 30.9,119.5 L 31.6,119.2 L 32.3,118.9 L 32.9,118.5 L 33.6,118.2 L 34.3,117.9 L 35.0,117.5 L 35.6,117.2 L 36.3,116.8 L 37.0,116.5 L 37.6,116.2 L 38.3,115.8 L 39.0,115.5 L 39.7,115.2 L 40.3,114.8 L 41.0,114.5 L 41.7,114.2 L 42.4,113.8 L 43.0,113.5 L 43.7,113.1 L 44.4,112.8 L 45.1,112.5 L 45.7,112.1 L 46.4,111.8 L 47.1,111.5 L 47.7,111.1 L 48.4,110.8 L 49.1,110.5 L 49.8,110.1 L 50.4,109.8 L 51.1,109.4 L 51.8,109.1 L 52.5,108.8 L 53.1,108.4 L 53.8,108.1 L 54.5,107.8 L 55.2,107.4 L 55.8,107.1 L 56.5,106.8 L 57.2,106.4 L 57.8,106.1 L 58.5,105.7 L 59.2,105.4 L 59.9,105.1 L 60.5,104.7 L 61.2,104.4 L 61.9,104.1 L 62.6,103.7 L 63.2,103.4 L 63.9,103.0 L 64.6,102.7 L 65.3,102.4 L 65.9,102.0 L 66.6,101.7 L 67.3,101.4 L 67.9,101.0 L 68.6,100.7 L 69.3,100.4 L 70.0,100.0 L 70.6,99.7 L 71.3,99.3 L 72.0,99.0 L 72.7,98.7 L 73.3,98.3 L 74.0,98.0 L 74.7,97.7 L 75.4,97.3 L 76.0,97.0 L 76.7,96.7 L 77.4,96.3 L 78.0,96.0 L 78.7,95.6 L 79.4,95.3 L 80.1,95.0 L 80.7,94.6 L 81.4,94.3 L 82.1,94.0 L 82.8,93.6 L 83.4,93.3 L 84.1,92.9 L 84.8,92.6 L 85.5,92.3 L 86.1,91.9 L 86.8,91.6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 93.2,88.4 L 93.5,88.2 L 93.9,88.1 L 94.2,87.9 L 94.6,87.7 L 94.9,87.5 L 95.2,87.4 L 95.6,87.2 L 95.9,87.0 L 96.3,86.9 L 96.6,86.7 L 96.9,86.5 L 97.3,86.4 L 97.6,86.2 L 98.0,86.0 L 98.3,85.8 L 98.6,85.7 L 99.0,85.5 L 99.3,85.3 L 99.7,85.2 L 100.0,85.0 L 100.3,84.8 L 100.7,84.7 L 101.0,84.5 L 101.4,84.3 L 101.7,84.2 L 102.0,84.0 L 102.4,83.8 L 102.7,83.6 L 103.1,83.5 L 103.4,83.3 L 103.7,83.1 L 104.1,83.0 L 104.4,82.8 L 104.8,82.6 L 105.1,82.4 L 105.4,82.3 L 105.8,82.1 L 106.1,81.9 L 106.5,81.8 L 106.8,81.6 L 107.1,81.4 L 107.5,81.3 L 107.8,81.1 L 108.2,80.9 L 108.5,80.8 L 108.8,80.6 L 109.2,80.4 L 109.5,80.2 L 109.9,80.1 L 110.2,79.9 L 110.5,79.7 L 110.9,79.6 L 111.2,79.4 L 111.6,79.2 L 111.9,79.0 L 112.2,78.9 L 112.6,78.7 L 112.9,78.5 L 113.3,78.4 L 113.6,78.2 L 113.9,78.0 L 114.3,77.9 L 114.6,77.7 L 115.0,77.5 L 115.3,77.3 L 115.6,77.2 L 116.0,77.0 L 116.3,76.8 L 116.7,76.7 L 117.0,76.5 L 117.3,76.3 L 117.7,76.2 L 118.0,76.0 L 118.4,75.8 L 118.7,75.6 L 119.0,75.5 L 119.4,75.3 L 119.7,75.1 L 120.1,75.0 L 120.4,74.8 L 120.7,74.6 L 121.1,74.5 L 121.4,74.3 L 121.8,74.1 L 122.1,73.9 L 122.4,73.8 L 122.8,73.6 L 123.1,73.4 L 123.5,73.3 L 123.8,73.1 L 124.1,72.9 L 124.5,72.8 L 124.8,72.6 L 125.2,72.4 L 125.5,72.2 L 125.8,72.1 L 126.2,71.9 L 126.5,71.7 L 126.9,71.6 L 127.2,71.4 L 127.5,71.2 L 127.9,71.1 L 128.2,70.9 L 128.6,70.7 L 128.9,70.5 L 129.2,70.4 L 129.6,70.2 L 129.9,70.0 L 130.3,69.9 L 130.6,69.7 L 130.9,69.5 L 131.3,69.4 L 131.6,69.2 L 132.0,69.0 L 132.3,68.8 L 132.6,68.7 L 133.0,68.5 L 133.3,68.3 L 133.7,68.2 L 134.0,68.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="90.0" cy="90.0" r="5" fill="#f8fafc" stroke="#dc2626" stroke-width="2"/>
  <line x1="90.0" y1="90.0" x2="90.0" y2="150.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="90.0" y="262.0" fill="#475569" font-size="11" text-anchor="middle">lim tồn tại, chỉ lệch 1 điểm</text>
  <text x="90.0" y="278.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">→ lấp được</text>
  <text x="280.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">NHẢY (jump)</text>
  <line x1="182.0" y1="150.0" x2="354.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <line x1="240.0" y1="208.0" x2="240.0" y2="36.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <text x="346.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="248.0" y="46.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="196.0" y1="130.0" x2="278.0" y2="130.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="282.0" y1="78.0" x2="324.0" y2="78.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="280.0" cy="130.0" r="5" fill="#f8fafc" stroke="#dc2626" stroke-width="2"/>
  <circle cx="280.0" cy="78.0" r="4" fill="#1d4ed8"/>
  <line x1="280.0" y1="130.0" x2="280.0" y2="78.0" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="280.0" y="262.0" fill="#475569" font-size="11" text-anchor="middle">lim trái ≠ lim phải, cả hai hữu hạn</text>
  <text x="280.0" y="278.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">→ KHÔNG lấp được</text>
  <text x="470.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">VÔ HẠN (infinite)</text>
  <line x1="372.0" y1="150.0" x2="544.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <line x1="430.0" y1="208.0" x2="430.0" y2="36.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar3)"/>
  <text x="536.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="438.0" y="46.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 386.0,145.2 L 386.7,145.2 L 387.3,145.2 L 388.0,145.1 L 388.7,145.1 L 389.3,145.0 L 390.0,145.0 L 390.6,145.0 L 391.3,144.9 L 392.0,144.9 L 392.6,144.8 L 393.3,144.8 L 394.0,144.7 L 394.6,144.7 L 395.3,144.6 L 395.9,144.6 L 396.6,144.5 L 397.3,144.5 L 397.9,144.4 L 398.6,144.4 L 399.3,144.3 L 399.9,144.3 L 400.6,144.2 L 401.3,144.2 L 401.9,144.1 L 402.6,144.1 L 403.2,144.0 L 403.9,143.9 L 404.6,143.9 L 405.2,143.8 L 405.9,143.8 L 406.6,143.7 L 407.2,143.6 L 407.9,143.6 L 408.6,143.5 L 409.2,143.4 L 409.9,143.3 L 410.5,143.3 L 411.2,143.2 L 411.9,143.1 L 412.5,143.0 L 413.2,143.0 L 413.9,142.9 L 414.5,142.8 L 415.2,142.7 L 415.9,142.6 L 416.5,142.5 L 417.2,142.4 L 417.8,142.3 L 418.5,142.2 L 419.2,142.1 L 419.8,142.0 L 420.5,141.9 L 421.2,141.8 L 421.8,141.7 L 422.5,141.6 L 423.1,141.5 L 423.8,141.3 L 424.5,141.2 L 425.1,141.1 L 425.8,141.0 L 426.5,140.8 L 427.1,140.7 L 427.8,140.5 L 428.5,140.4 L 429.1,140.2 L 429.8,140.1 L 430.4,139.9 L 431.1,139.7 L 431.8,139.5 L 432.4,139.4 L 433.1,139.2 L 433.8,139.0 L 434.4,138.8 L 435.1,138.5 L 435.8,138.3 L 436.4,138.1 L 437.1,137.9 L 437.7,137.6 L 438.4,137.3 L 439.1,137.1 L 439.7,136.8 L 440.4,136.5 L 441.1,136.2 L 441.7,135.9 L 442.4,135.5 L 443.0,135.2 L 443.7,134.8 L 444.4,134.4 L 445.0,134.0 L 445.7,133.5 L 446.4,133.1 L 447.0,132.6 L 447.7,132.1 L 448.4,131.5 L 449.0,130.9 L 449.7,130.3 L 450.3,129.7 L 451.0,128.9 L 451.7,128.2 L 452.3,127.4 L 453.0,126.5 L 453.7,125.5 L 454.3,124.5 L 455.0,123.4 L 455.6,122.1 L 456.3,120.8 L 457.0,119.3 L 457.6,117.6 L 458.3,115.8 L 459.0,113.7 L 459.6,111.4 L 460.3,108.8 L 461.0,105.8 L 461.6,102.3 L 462.3,98.2 L 462.9,93.3 L 463.6,87.4 L 464.3,80.2 L 464.9,71.0 L 465.6,59.1" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 474.4,240.9 L 474.7,234.6 L 475.1,229.1 L 475.4,224.2 L 475.7,219.9 L 476.1,216.1 L 476.4,212.7 L 476.7,209.6 L 477.0,206.8 L 477.4,204.3 L 477.7,201.9 L 478.0,199.8 L 478.4,197.8 L 478.7,196.0 L 479.0,194.3 L 479.4,192.8 L 479.7,191.3 L 480.0,190.0 L 480.3,188.7 L 480.7,187.5 L 481.0,186.4 L 481.3,185.3 L 481.7,184.3 L 482.0,183.4 L 482.3,182.5 L 482.6,181.6 L 483.0,180.8 L 483.3,180.1 L 483.6,179.3 L 484.0,178.6 L 484.3,178.0 L 484.6,177.3 L 485.0,176.7 L 485.3,176.2 L 485.6,175.6 L 485.9,175.1 L 486.3,174.6 L 486.6,174.1 L 486.9,173.6 L 487.3,173.2 L 487.6,172.7 L 487.9,172.3 L 488.3,171.9 L 488.6,171.5 L 488.9,171.1 L 489.2,170.8 L 489.6,170.4 L 489.9,170.1 L 490.2,169.8 L 490.6,169.4 L 490.9,169.1 L 491.2,168.8 L 491.6,168.6 L 491.9,168.3 L 492.2,168.0 L 492.6,167.7 L 492.9,167.5 L 493.2,167.2 L 493.5,167.0 L 493.9,166.8 L 494.2,166.5 L 494.5,166.3 L 494.9,166.1 L 495.2,165.9 L 495.5,165.7 L 495.9,165.5 L 496.2,165.3 L 496.5,165.1 L 496.8,164.9 L 497.2,164.7 L 497.5,164.5 L 497.8,164.4 L 498.2,164.2 L 498.5,164.0 L 498.8,163.9 L 499.1,163.7 L 499.5,163.6 L 499.8,163.4 L 500.1,163.3 L 500.5,163.1 L 500.8,163.0 L 501.1,162.8 L 501.5,162.7 L 501.8,162.6 L 502.1,162.5 L 502.5,162.3 L 502.8,162.2 L 503.1,162.1 L 503.4,162.0 L 503.8,161.8 L 504.1,161.7 L 504.4,161.6 L 504.8,161.5 L 505.1,161.4 L 505.4,161.3 L 505.8,161.2 L 506.1,161.1 L 506.4,161.0 L 506.7,160.9 L 507.1,160.8 L 507.4,160.7 L 507.7,160.6 L 508.1,160.5 L 508.4,160.4 L 508.7,160.3 L 509.1,160.2 L 509.4,160.2 L 509.7,160.1 L 510.0,160.0 L 510.4,159.9 L 510.7,159.8 L 511.0,159.7 L 511.4,159.7 L 511.7,159.6 L 512.0,159.5 L 512.4,159.4 L 512.7,159.4 L 513.0,159.3 L 513.3,159.2 L 513.7,159.2 L 514.0,159.1" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="470.0" y1="200.0" x2="470.0" y2="60.0" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="476.0" y="62.0" fill="#dc2626" font-size="10" text-anchor="start">x = 1</text>
  <text x="470.0" y="262.0" fill="#475569" font-size="11" text-anchor="middle">lim = ±∞, tiệm cận đứng</text>
  <text x="470.0" y="278.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">→ KHÔNG lấp được</text>
</svg>

**4 ví dụ phân loại nhanh**:
- $\\frac{x^2-1}{x-1}$ tại 1 → **bỏ được** ($\\lim = 2$ tồn tại, chỉ thiếu $f(1)$).
- $\\frac{\\sin x}{x}$ tại 0 → **bỏ được** ($\\lim = 1$; định nghĩa $f(0)=1$ là liên tục).
- $\\lfloor x \\rfloor$ (hàm sàn) tại $x = 2$ → **nhảy** ($\\lim_{2^-} = 1$, $\\lim_{2^+} = 2$, đều hữu hạn).
- $\\frac{1}{x^2}$ tại 0 → **vô hạn** ($\\lim = +\\infty$ cả hai bên).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'bỏ được' lại tên như vậy?"* Vì chỉ cần định nghĩa lại đúng 1 giá trị $f(a) = \\lim$ là lỗ biến mất, hàm liên tục. Hai loại kia (nhảy, vô hạn) không "lấp" được — $\\lim$ hai bên lệch hoặc bằng $\\infty$, sửa 1 điểm không cứu nổi.
- *"Phân biệt nhảy và vô hạn ra sao?"* Nhảy: cả hai $\\lim$ một bên **hữu hạn** nhưng khác nhau (vd $\\frac{|x|}{x}$ cho $-1$ và $1$). Vô hạn: ít nhất một $\\lim$ một bên $= \\pm\\infty$ (vd $\\frac{1}{x}$ tại 0).

⚠ **Lỗi thường gặp — gọi mọi gián đoạn là 'bỏ được'**. Chỉ gián đoạn bỏ được mới cần $\\lim$ hai bên tồn tại và bằng nhau. $\\frac{1}{x}$ tại 0 là gián đoạn **vô hạn** — không bỏ được; gọi nhầm là bỏ được rồi "lấp" sẽ sai.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{\\sin(x)}{x}$ (không định nghĩa tại 0). Loại gián đoạn nào?
2. $f(x) = \\lfloor x \\rfloor$ tại $x = 3$. Loại nào?

<details><summary>Đáp án</summary>

1. **Bỏ được** — $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ tồn tại; định nghĩa $f(0) = 1$ thì liên tục.
2. **Nhảy** — $\\lim$ trái $= 2$, $\\lim$ phải $= 3$, cả hai hữu hạn nhưng lệch.

</details>

### 📝 Tóm tắt mục 6

- 3 loại gián đoạn: bỏ được ($\\lim$ tồn tại nhưng $\\neq f(a)$/$f(a)$ thiếu), nhảy (hai bên hữu hạn lệch), vô hạn ($\\lim = \\pm\\infty$).
- Chỉ **bỏ được** mới "lấp" được bằng cách định nghĩa lại $f(a) = \\lim$.
- Phân biệt nhảy ↔ vô hạn dựa vào $\\lim$ một bên hữu hạn hay vô cực.

---

## 7. Hàm liên tục cơ bản

Các hàm sau **liên tục trên toàn miền xác định**:
- Đa thức (polynomial).
- Hàm hữu tỉ ($\\frac{P(x)}{Q(x)}$) — liên tục mọi nơi trừ $Q = 0$.
- Lượng giác ($\\sin$, $\\cos$ liên tục mọi $\\mathbb{R}$; $\\tan$ liên tục trừ $\\frac{\\pi}{2} + k\\pi$).
- Mũ $a^x$.
- Log $\\log_a x$ (trên $(0, \\infty)$).
- Tổ hợp (cộng, trừ, nhân, chia, hợp) của các hàm liên tục → liên tục.

💡 **Trực giác**: các hàm "đẹp" quen thuộc đều liên tục trên miền của chúng, và ghép chúng lại (cộng/nhân/hợp) vẫn liên tục. Nhờ vậy, để chứng minh một hàm phức tạp như $e^{\\sin x} \\cdot \\ln(x^2+1)$ liên tục, ta chỉ cần nhận ra nó được ghép từ các viên gạch liên tục — không phải kiểm $\\varepsilon$-$\\delta$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\tan x$ liên tục trên toàn $\\mathbb{R}$ không?"* Không. $\\tan x = \\frac{\\sin x}{\\cos x}$ gián đoạn (vô hạn) tại $x = \\frac{\\pi}{2} + k\\pi$ (chỗ $\\cos x = 0$). Nó liên tục trên **miền xác định** (bỏ các điểm đó) — không phải toàn $\\mathbb{R}$.
- *"$\\frac{P(x)}{Q(x)}$ liên tục ở đâu?"* Mọi nơi trừ chỗ $Q(x) = 0$. Vd $\\frac{1}{x^2-1}$ gián đoạn tại $x = \\pm 1$, liên tục ở mọi điểm khác.

⚠ **Lỗi thường gặp — quên loại trừ điểm mẫu bằng 0 / ngoài miền**. Nói "$\\ln x$ liên tục trên $\\mathbb{R}$" là sai — $\\ln x$ chỉ xác định và liên tục trên $(0, \\infty)$. Luôn kèm miền xác định khi phát biểu tính liên tục.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{x^2}{x-2}$ gián đoạn tại đâu?
2. $f(x) = \\sqrt{x} + \\cos x$ liên tục trên miền nào?

<details><summary>Đáp án</summary>

1. Tại $x = 2$ (mẫu bằng 0) — gián đoạn vô hạn; liên tục ở mọi điểm khác.
2. Trên $[0, \\infty)$ — $\\sqrt{x}$ chỉ xác định khi $x \\ge 0$, $\\cos x$ liên tục khắp nơi → giao là $[0, \\infty)$.

</details>

### 📝 Tóm tắt mục 7

- Đa thức, mũ, $\\sin/\\cos$ liên tục trên toàn $\\mathbb{R}$; $\\ln x$ trên $(0,\\infty)$; hữu tỉ trừ chỗ mẫu $= 0$; $\\tan x$ trừ $\\frac{\\pi}{2}+k\\pi$.
- Tổ hợp ($+, -, \\cdot, /$, hợp) các hàm liên tục → liên tục (trên miền hợp lệ).
- Luôn kèm **miền xác định** khi nói về tính liên tục.

---

## 8. Định lý giá trị trung gian (IVT)

🎯 **Phát biểu**: Nếu $f$ liên tục trên $[a, b]$ và $y_0$ là số nằm giữa $f(a)$ và $f(b)$, thì $\\exists c \\in [a, b]$ sao cho $f(c) = y_0$.

💡 **Trực giác**: Vẽ đường liền nét từ điểm $A$ đến $B$, không thể "nhảy qua" giá trị trung gian.

### Hệ quả — Định lý Bolzano

Nếu $f$ liên tục trên $[a, b]$ và $f(a) \\cdot f(b) < 0$ (khác dấu), thì **$f(c) = 0$ có nghiệm** trong $(a, b)$.

⟶ Dùng để chứng minh PT có nghiệm mà không cần giải.

Trực giác IVT — đường liền nét đi từ $f(a)$ tới $f(b)$ **buộc** cắt mọi mức $y_0$ ở giữa:

<svg viewBox="0 0 400 270" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Định lý giá trị trung gian: đường cong liên tục từ (a, f(a)) đến (b, f(b)) buộc phải cắt mức y₀ nằm giữa f(a) và f(b) tại một điểm c">
  <defs><marker id="ar4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="114.0" y1="230.0" x2="114.0" y2="50.0"/>
<line x1="233.9" y1="230.0" x2="233.9" y2="50.0"/>
<line x1="294.0" y1="230.0" x2="294.0" y2="50.0"/>
<line x1="60.0" y1="195.7" x2="357.0" y2="195.7"/>
<line x1="60.0" y1="130.0" x2="357.0" y2="130.0"/>
<line x1="60.0" y1="73.7" x2="357.0" y2="73.7"/>
</g>
  <line x1="54.0" y1="230.0" x2="379.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="28.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text x="371.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="38.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="114.0" y1="226.0" x2="114.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="114.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">a</text>
  <line x1="233.9" y1="226.0" x2="233.9" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="233.9" y="246.0" fill="#475569" font-size="11" text-anchor="middle">c</text>
  <line x1="294.0" y1="226.0" x2="294.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="294.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">b</text>
  <line x1="56.0" y1="195.7" x2="64.0" y2="195.7" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="199.7" fill="#475569" font-size="11" text-anchor="end">f(a)</text>
  <line x1="56.0" y1="130.0" x2="64.0" y2="130.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="134.0" fill="#475569" font-size="11" text-anchor="end">y₀</text>
  <line x1="56.0" y1="73.7" x2="64.0" y2="73.7" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="77.7" fill="#475569" font-size="11" text-anchor="end">f(b)</text>
  <path d="M 87.0,201.9 L 89.0,201.6 L 91.0,201.2 L 93.1,200.8 L 95.1,200.4 L 97.1,200.0 L 99.2,199.5 L 101.2,199.0 L 103.2,198.6 L 105.2,198.1 L 107.2,197.6 L 109.3,197.0 L 111.3,196.5 L 113.3,195.9 L 115.3,195.3 L 117.4,194.7 L 119.4,194.1 L 121.4,193.4 L 123.5,192.8 L 125.5,192.1 L 127.5,191.4 L 129.5,190.7 L 131.6,190.0 L 133.6,189.2 L 135.6,188.5 L 137.6,187.7 L 139.7,186.9 L 141.7,186.1 L 143.7,185.2 L 145.7,184.4 L 147.8,183.5 L 149.8,182.6 L 151.8,181.7 L 153.8,180.8 L 155.9,179.8 L 157.9,178.9 L 159.9,177.9 L 161.9,176.9 L 163.9,175.9 L 166.0,174.8 L 168.0,173.8 L 170.0,172.7 L 172.1,171.6 L 174.1,170.5 L 176.1,169.4 L 178.1,168.3 L 180.1,167.1 L 182.2,166.0 L 184.2,164.8 L 186.2,163.6 L 188.2,162.3 L 190.3,161.1 L 192.3,159.8 L 194.3,158.6 L 196.4,157.3 L 198.4,155.9 L 200.4,154.6 L 202.4,153.3 L 204.5,151.9 L 206.5,150.5 L 208.5,149.1 L 210.5,147.7 L 212.6,146.2 L 214.6,144.8 L 216.6,143.3 L 218.6,141.8 L 220.7,140.3 L 222.7,138.8 L 224.7,137.2 L 226.7,135.7 L 228.8,134.1 L 230.8,132.5 L 232.8,130.9 L 234.8,129.3 L 236.8,127.6 L 238.9,125.9 L 240.9,124.2 L 242.9,122.5 L 245.0,120.8 L 247.0,119.1 L 249.0,117.3 L 251.0,115.5 L 253.1,113.8 L 255.1,111.9 L 257.1,110.1 L 259.1,108.3 L 261.1,106.4 L 263.2,104.5 L 265.2,102.6 L 267.2,100.7 L 269.2,98.8 L 271.3,96.8 L 273.3,94.9 L 275.3,92.9 L 277.4,90.9 L 279.4,88.8 L 281.4,86.8 L 283.4,84.7 L 285.4,82.7 L 287.5,80.6 L 289.5,78.5 L 291.5,76.3 L 293.6,74.2 L 295.6,72.0 L 297.6,69.8 L 299.6,67.6 L 301.6,65.4 L 303.7,63.2 L 305.7,60.9 L 307.7,58.7 L 309.8,56.4 L 311.8,54.1 L 313.8,51.7 L 315.8,49.4 L 317.8,47.0 L 319.9,44.7 L 321.9,42.3 L 323.9,39.8 L 325.9,37.4 L 328.0,35.0 L 330.0,32.5" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="114.0" cy="195.7" r="4" fill="#1d4ed8"/>
  <circle cx="294.0" cy="73.7" r="4" fill="#1d4ed8"/>
  <line x1="60.0" y1="130.0" x2="348.0" y2="130.0" stroke="#15803d" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="233.9" y1="130.0" x2="233.9" y2="230.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="233.9" cy="130.0" r="4" fill="#dc2626"/>
  <text x="243.9" y="122.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">IVT đảm bảo có c với f(c) = y₀</text>
  <text x="344.0" y="124.0" fill="#15803d" font-size="11" text-anchor="end">mức y₀</text>
</svg>

**Ví dụ + chứng minh tồn tại nghiệm**: chứng minh $x^3 - x - 1 = 0$ có nghiệm trong $(1, 2)$.
1. Đặt $f(x) = x^3 - x - 1$. $f$ là **đa thức → liên tục** trên $[1, 2]$ (điều kiện IVT/Bolzano thỏa).
2. Tính hai đầu: $f(1) = 1 - 1 - 1 = -1 < 0$; $f(2) = 8 - 2 - 1 = 5 > 0$.
3. $f(1) \\cdot f(2) = (-1)(5) = -5 < 0$ → **đổi dấu**.
4. Theo Bolzano (hệ quả IVT với $y_0 = 0$), $\\exists c \\in (1, 2)$ sao cho $f(c) = 0$. ∎

**Tìm nghiệm bằng chia đôi (bisection) — walk-through 3 bước**: nghiệm thật $\\approx 1.3247$.
- Trung điểm $1.5$: $f(1.5) = 3.375 - 1.5 - 1 = 0.875 > 0$ → đổi dấu nằm ở $(1, 1.5)$.
- Trung điểm $1.25$: $f(1.25) = 1.953 - 1.25 - 1 = -0.297 < 0$ → đổi dấu ở $(1.25, 1.5)$.
- Trung điểm $1.375$: $f(1.375) = 2.600 - 1.375 - 1 = 0.225 > 0$ → đổi dấu ở $(1.25, 1.375)$ → nghiệm $\\in (1.25, 1.375)$, hội tụ dần về $1.3247$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"IVT có cần liên tục không, hay hàm nào cũng đúng?"* **Bắt buộc liên tục**. Hàm sàn $\\lfloor x \\rfloor$ trên $[0, 2]$ đi từ $0$ lên $2$ nhưng KHÔNG bao giờ nhận giá trị $1.5$ — vì nó nhảy, không liên tục. IVT sụp đổ ngay khi mất tính liên tục.
- *"Bolzano nói có nghiệm — tìm nghiệm ở đâu?"* Bolzano chỉ khẳng định **tồn tại** nghiệm trong $(a,b)$, không cho vị trí. Để tìm, dùng **chia đôi (bisection)**: lấy trung điểm $c$, xét dấu $f(c)$, thu hẹp nửa khoảng còn đổi dấu — lặp lại đến khi đủ chính xác.

⚠ **Lỗi thường gặp — dùng Bolzano khi $f(a) \\cdot f(b) > 0$**. Cùng dấu KHÔNG kết luận được gì: $f(x) = x^2-1$ trên $[-2, 2]$ có $f(-2) = f(2) = 3 > 0$ nhưng vẫn có **hai** nghiệm $\\pm 1$ ở giữa. Bolzano chỉ cho chiều "đổi dấu $\\implies$ có nghiệm", không cho chiều ngược.

🔁 **Dừng lại tự kiểm tra**

1. PT $\\cos x = x$ có nghiệm trong $(0, 1)$ không? (Đặt $f(x) = \\cos x - x$.)
2. $f(x) = \\frac{1}{x}$ trên $[-1, 1]$ đi từ $-1$ lên $1$, có nhận giá trị $0$ không? IVT áp dụng được không?

<details><summary>Đáp án</summary>

1. $f(0) = 1 > 0$, $f(1) = \\cos 1 - 1 \\approx -0.46 < 0$. Đổi dấu, $f$ liên tục → **có nghiệm** trong $(0,1)$.
2. Không nhận $0$ ($\\frac{1}{x}$ không bao giờ bằng 0). IVT **không áp dụng được** vì $f$ gián đoạn vô hạn tại $0 \\in [-1,1]$.

</details>

### 📝 Tóm tắt mục 8

- IVT: $f$ liên tục trên $[a,b]$ → $f$ nhận **mọi** giá trị giữa $f(a)$ và $f(b)$.
- Hệ quả Bolzano: liên tục $+ f(a) \\cdot f(b) < 0 \\implies$ có nghiệm $f(c)=0$ trong $(a,b)$.
- Tính liên tục là **bắt buộc**; chỉ kết luận được khi hai đầu **đổi dấu**.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tính $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.

**Bài 2**: Tính $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$.

**Bài 3**: $f(x) = \\frac{x^2 - 9}{x - 3}$ khi $x \\neq 3$, $f(3) = 5$. Hỏi $f$ liên tục tại 3 không?

**Bài 4**: Tính $\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 + 5}$.

**Bài 5**: PT $x^3 + x - 3 = 0$ có nghiệm trong $(1, 2)$ không?

**Bài 6**: Tính $\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}$ (nhân liên hợp).

**Bài 7**: Tính $\\lim_{x \\to \\infty} \\big(\\sqrt{x^2 + x} - x\\big)$ (dạng $\\infty - \\infty$).

**Bài 8**: Phân loại điểm gián đoạn của $f(x) = \\frac{x-2}{|x-2|}$ tại $x = 2$.

**Bài 9**: Tìm $a$ để $f(x) = \\begin{cases} x^2 & x \\le 2 \\\\ ax + 1 & x > 2 \\end{cases}$ liên tục tại $x = 2$.

**Bài 10**: Tính $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$ (gợi ý: nhân liên hợp $1 + \\cos x$ rồi dùng $\\frac{\\sin x}{x}$).

### Lời giải

**Bài 1**: $\\frac{x^2-4}{x-2} = \\frac{(x-2)(x+2)}{x-2} = x+2 \\to \\lim =$ **4**.

**Bài 2**: $\\lim \\frac{\\sin(3x)}{x} = \\lim 3 \\cdot \\frac{\\sin(3x)}{3x} = 3 \\cdot 1 =$ **3**.

**Bài 3**: $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = \\lim (x+3) = 6$. Nhưng $f(3) = 5 \\neq 6 \\to$ **gián đoạn bỏ được** (sửa $f(3)=6$ thì liên tục).

**Bài 4**: Chia tử mẫu cho $x^2$: $\\frac{3 + 1/x^2}{1 + 5/x^2} \\to \\frac{3}{1} =$ **3**.

**Bài 5**: $f$ liên tục. $f(1) = -1$, $f(2) = 7$. $f(1) \\cdot f(2) < 0 \\to$ **có nghiệm** trong $(1, 2)$ (Bolzano).

**Bài 6**: Thay trực tiếp $\\frac{\\sqrt{4}-2}{0} = \\frac{0}{0}$. Nhân liên hợp $\\sqrt{x+4}+2$: $\\frac{(x+4)-4}{x(\\sqrt{x+4}+2)} = \\frac{x}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2} \\to \\frac{1}{\\sqrt{4}+2} = \\frac{1}{4}$. **Đáp số: $\\frac{1}{4}$.**

**Bài 7**: Dạng $\\infty - \\infty$. Nhân liên hợp $\\sqrt{x^2+x}+x$: $\\frac{(x^2+x)-x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}$. Chia tử mẫu cho $x$ (với $x > 0$): $\\frac{1}{\\sqrt{1+1/x}+1} \\to \\frac{1}{1+1} = \\frac{1}{2}$. Verify: $x = 1000 \\to \\sqrt{1001000} - 1000 \\approx 0.4999$ ✓. **Đáp số: $\\frac{1}{2}$.**

**Bài 8**: $\\lim_{x \\to 2^-}$: với $x < 2$, $|x-2| = -(x-2)$ → $f = \\frac{x-2}{-(x-2)} = -1$. $\\lim_{x \\to 2^+}$: với $x > 2$, $|x-2| = x-2$ → $f = +1$. Hai bên hữu hạn nhưng lệch ($-1 \\ne 1$) → **gián đoạn nhảy** (jump). $f(2)$ cũng không xác định (chia 0).

**Bài 9**: Cần $\\lim_{x \\to 2^-} = \\lim_{x \\to 2^+} = f(2)$. $\\lim_{x \\to 2^-} x^2 = 4 = f(2)$. $\\lim_{x \\to 2^+} (ax+1) = 2a + 1$. Đặt $2a + 1 = 4 \\Rightarrow a = \\frac{3}{2}$. **Đáp số: $a = \\frac{3}{2}$.**

**Bài 10**: Nhân liên hợp $1 + \\cos x$: $\\frac{(1-\\cos x)(1+\\cos x)}{x^2(1+\\cos x)} = \\frac{1-\\cos^2 x}{x^2(1+\\cos x)} = \\frac{\\sin^2 x}{x^2(1+\\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{1}{1+\\cos x}$. Khi $x \\to 0$: $\\left(\\frac{\\sin x}{x}\\right)^2 \\to 1^2 = 1$ và $\\frac{1}{1+\\cos x} \\to \\frac{1}{2}$. Tích $\\to \\frac{1}{2}$. **Đáp số: $\\frac{1}{2}$.**

---

## 10. Bài tiếp theo

[Lesson 03 — Đạo hàm: định nghĩa](../lesson-03-derivative-definition/).

## 📝 Tổng kết

1. **$\\lim_{x \\to a} f(x) = L$**: $f$ xung quanh $a$ càng gần $L$ tùy ý.
2. Giới hạn 2 bên tồn tại $\\iff$ 2 giới hạn 1 bên = nhau.
3. **Liên tục tại $a$**: $\\lim = f(a)$. 3 loại gián đoạn (bỏ được, nhảy, vô hạn).
4. **IVT**: liên tục thì đi qua mọi giá trị trung gian.
5. **Bolzano**: $f(a) \\cdot f(b) < 0$ và liên tục → có nghiệm.
`;
