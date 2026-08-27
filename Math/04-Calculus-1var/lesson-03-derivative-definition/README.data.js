// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-03-derivative-definition/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đạo hàm: Định nghĩa & ý nghĩa hình học

## Mục tiêu

- Hiểu **đạo hàm** là gì qua 2 hình ảnh: **vận tốc tức thời** và **slope tiếp tuyến**.
- Định nghĩa hình thức bằng giới hạn.
- Tính đạo hàm bằng định nghĩa cho vài hàm cơ bản.
- Hiểu sự khác biệt: $f$ khả vi $\\implies f$ liên tục (nhưng ngược lại không đúng).

## Kiến thức tiền đề

- [Lesson 02 — Giới hạn hàm](../lesson-02-function-limits-continuity/).

---

## 1. Đạo hàm là gì — 2 hình ảnh trực giác

### 1.1. Hình ảnh "vận tốc tức thời" (động lực học)

Một vật chuyển động: vị trí $s(t)$ tại thời điểm $t$. Vận tốc trung bình từ $t$ đến $t+\\Delta t$:

$$v_{tb} = \\frac{s(t+\\Delta t) - s(t)}{\\Delta t}$$

⟶ Khi $\\Delta t \\to 0$, ta được **vận tốc tức thời** tại thời điểm $t$.

$$v(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t+\\Delta t) - s(t)}{\\Delta t} = s'(t)$$

💡 **Trực giác — tốc kế xe hơi.** Bạn lái xe, quãng đường đi được là $s(t)$. Nếu cảnh sát hỏi *"ngay tại giây thứ 20 anh chạy bao nhiêu km/h?"*, bạn không thể trả lời bằng "trung bình cả chuyến" — phải là con số **tốc kế đang chỉ ngay khoảnh khắc đó**. Đó chính là đạo hàm $s'(20)$. Đạo hàm = số mà tốc kế hiển thị: tốc độ thay đổi **ngay bây giờ**, không phải trung bình.

Cụ thể, giả sử bảng quãng đường (vật rơi $s(t) = 5t^2$ mét):

| $t$ (giây) | $s(t)$ (mét) |
|-----------|--------------|
| 0  | 0    |
| 1  | 5    |
| 2  | 20   |
| 3  | 45   |
| 4  | 80   |

- Vận tốc **trung bình** từ giây 1 đến giây 3: $\\frac{45 - 5}{3 - 1} = \\frac{40}{2} = 20$ m/s.
- Nhưng "tức thời tại $t = 2$" là bao nhiêu? Thu hẹp khoảng quanh $t = 2$:

| Khoảng                | $\\dfrac{\\Delta s}{\\Delta t}$            | = (m/s) |
|-----------------------|-----------------------------------------|---------|
| $[2,\\,3]$             | $\\frac{45 - 20}{1}$                     | $25$    |
| $[2,\\,2.1]$           | $\\frac{5(2.1)^2 - 20}{0.1} = \\frac{2.05}{0.1}$ | $20.5$  |
| $[2,\\,2.01]$          | $\\frac{5(2.01)^2 - 20}{0.01}$           | $20.05$ |
| $[1.99,\\,2]$          | $\\frac{20 - 5(1.99)^2}{0.01}$           | $19.95$ |
| $[1.9,\\,2]$           | $\\frac{20 - 5(1.9)^2}{0.1}$             | $19.5$  |

Hai phía hội tụ về **20 m/s** ⟶ $v(2) = s'(2) = 20$. Kiểm bằng công thức: $s'(t) = 10t \\to s'(2) = 20$ ✓. Đây là cùng một "$\\Delta t \\to 0$" như slope tiếp tuyến — chỉ khác cách kể chuyện.

### 1.2. Hình ảnh "slope tiếp tuyến" (hình học)

Trên đồ thị $y = f(x)$:
- Chọn 2 điểm $A(x, f(x))$ và $B(x+h, f(x+h))$.
- Đường thẳng $AB$ có hệ số góc $\\dfrac{f(x+h) - f(x)}{h}$ (= cát tuyến).
- Khi $h \\to 0$, $B$ trượt về $A$ → cát tuyến trở thành **tiếp tuyến**.
- Hệ số góc tiếp tuyến = $f'(x)$.

#### Hình dung cát tuyến "trượt" thành tiếp tuyến

Đồ thị $f(x) = x^2$. Cố định $A = (1, 1)$, cho $B = (1+h, (1+h)^2)$ trượt dần về $A$ khi $h$ nhỏ lại. Mỗi cát tuyến $AB$ dốc hơn/thoải hơn tới khi "khít" vào đường cong tại $A$:

<svg viewBox="0 0 420 285" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Cát tuyến qua A(1,1) và B(1+h, (1+h)²) trên parabol y = x² trượt dần thành tiếp tuyến khi h giảm 1 → 0.5 → 0.2 → 0; slope 3 → 2.5 → 2.2 → 2">
  <defs><marker id="ar5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="170.0" y1="250.0" x2="170.0" y2="25.0"/>
<line x1="230.0" y1="250.0" x2="230.0" y2="25.0"/>
<line x1="290.0" y1="250.0" x2="290.0" y2="25.0"/>
<line x1="50.0" y1="205.0" x2="350.0" y2="205.0"/>
<line x1="50.0" y1="160.0" x2="350.0" y2="160.0"/>
<line x1="50.0" y1="115.0" x2="350.0" y2="115.0"/>
<line x1="50.0" y1="70.0" x2="350.0" y2="70.0"/>
</g>
  <line x1="44.0" y1="250.0" x2="372.0" y2="250.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <line x1="50.0" y1="256.0" x2="50.0" y2="3.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <text x="364.0" y="266.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="58.0" y="13.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="170.0" y1="246.0" x2="170.0" y2="254.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="170.0" y="266.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="230.0" y1="246.0" x2="230.0" y2="254.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="230.0" y="266.0" fill="#475569" font-size="11" text-anchor="middle">1.5</text>
  <line x1="290.0" y1="246.0" x2="290.0" y2="254.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="290.0" y="266.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="46.0" y1="205.0" x2="54.0" y2="205.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="209.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="46.0" y1="160.0" x2="54.0" y2="160.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="164.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="46.0" y1="115.0" x2="54.0" y2="115.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="119.0" fill="#475569" font-size="11" text-anchor="end">3</text>
  <line x1="46.0" y1="70.0" x2="54.0" y2="70.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="74.0" fill="#475569" font-size="11" text-anchor="end">4</text>
  <path d="M 62.0,249.6 L 64.1,249.4 L 66.2,249.2 L 68.3,249.0 L 70.4,248.7 L 72.5,248.4 L 74.6,248.1 L 76.7,247.8 L 78.8,247.4 L 80.9,247.0 L 83.0,246.6 L 85.1,246.1 L 87.2,245.7 L 89.3,245.2 L 91.4,244.6 L 93.5,244.1 L 95.6,243.5 L 97.7,242.9 L 99.8,242.2 L 101.9,241.6 L 104.0,240.9 L 106.1,240.2 L 108.2,239.4 L 110.3,238.6 L 112.4,237.8 L 114.5,237.0 L 116.6,236.1 L 118.7,235.3 L 120.8,234.3 L 122.9,233.4 L 125.0,232.4 L 127.1,231.4 L 129.2,230.4 L 131.3,229.3 L 133.4,228.3 L 135.5,227.2 L 137.6,226.0 L 139.7,224.9 L 141.8,223.7 L 143.9,222.4 L 146.0,221.2 L 148.1,219.9 L 150.2,218.6 L 152.3,217.3 L 154.4,215.9 L 156.5,214.6 L 158.6,213.1 L 160.7,211.7 L 162.8,210.2 L 164.9,208.7 L 167.0,207.2 L 169.1,205.7 L 171.2,204.1 L 173.3,202.5 L 175.4,200.9 L 177.5,199.2 L 179.6,197.5 L 181.7,195.8 L 183.8,194.1 L 185.9,192.3 L 188.0,190.5 L 190.1,188.7 L 192.2,186.8 L 194.3,184.9 L 196.4,183.0 L 198.5,181.1 L 200.6,179.1 L 202.7,177.1 L 204.8,175.1 L 206.9,173.1 L 209.0,171.0 L 211.1,168.9 L 213.2,166.8 L 215.3,164.6 L 217.4,162.4 L 219.5,160.2 L 221.6,158.0 L 223.7,155.7 L 225.8,153.4 L 227.9,151.1 L 230.0,148.8 L 232.1,146.4 L 234.2,144.0 L 236.3,141.5 L 238.4,139.1 L 240.5,136.6 L 242.6,134.1 L 244.7,131.5 L 246.8,129.0 L 248.9,126.4 L 251.0,123.7 L 253.1,121.1 L 255.2,118.4 L 257.3,115.7 L 259.4,113.0 L 261.5,110.2 L 263.6,107.4 L 265.7,104.6 L 267.8,101.8 L 269.9,98.9 L 272.0,96.0 L 274.1,93.1 L 276.2,90.1 L 278.3,87.1 L 280.4,84.1 L 282.5,81.1 L 284.6,78.0 L 286.7,74.9 L 288.8,71.8 L 290.9,68.6 L 293.0,65.5 L 295.1,62.3 L 297.2,59.0 L 299.3,55.8 L 301.4,52.5 L 303.5,49.2 L 305.6,45.8 L 307.7,42.5 L 309.8,39.1 L 311.9,35.7 L 314.0,32.2" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="116.0" y1="265.8" x2="326.0" y2="29.5" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <circle cx="290.0" cy="70.0" r="4" fill="#94a3b8"/>
  <text x="298.0" y="74.0" fill="#94a3b8" font-size="11" text-anchor="start">B (h = 1): cát tuyến cắt rõ 2 điểm, slope 3</text>
  <line x1="116.0" y1="255.6" x2="326.0" y2="58.8" stroke="#15803d" stroke-width="1.5" stroke-dasharray="6 4"/>
  <circle cx="230.0" cy="148.8" r="4" fill="#15803d"/>
  <text x="238.0" y="152.8" fill="#15803d" font-size="11" text-anchor="start">B' (h = 0.5): gần đường cong hơn, slope 2.5</text>
  <line x1="116.0" y1="249.5" x2="326.0" y2="76.3" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="6 4"/>
  <circle cx="194.0" cy="185.2" r="4" fill="#dc2626"/>
  <text x="202.0" y="189.2" fill="#dc2626" font-size="11" text-anchor="start">B'' (h = 0.2): gần như chạm, slope 2.2</text>
  <line x1="86.0" y1="268.0" x2="326.0" y2="88.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="170.0" cy="205.0" r="5" fill="#1d4ed8"/>
  <text x="162.0" y="221.0" fill="#1d4ed8" font-size="12" text-anchor="end" font-weight="700">A (1, 1)</text>
  <text x="322.0" y="102.0" fill="#1d4ed8" font-size="12" text-anchor="end" font-weight="700">tiếp tuyến (h → 0): slope = f'(1) = 2</text>
  <text x="68.0" y="43.0" fill="#1d4ed8" font-size="12" text-anchor="start">f(x) = x²</text>
</svg>

Mấu chốt: cát tuyến luôn cắt 2 điểm $A, B$; khi $B \\to A$ nó **xoay quanh** $A$ và hội tụ về một đường duy nhất — **tiếp tuyến**. Slope của nó = $f'(1)$.

#### Bảng slope hội tụ (walk-through bằng số thật)

Vẫn $f(x) = x^2$ tại $A = (1, 1)$. Slope cát tuyến $= \\dfrac{f(1+h) - f(1)}{h} = \\dfrac{(1+h)^2 - 1}{h}$. Tính cho $h$ nhỏ dần từ cả 2 phía:

| $h$       | $f(1+h)$    | slope cát tuyến $= \\dfrac{f(1+h)-1}{h}$ |
|-----------|-------------|-----------------------------------------|
| $+1$      | $4$         | $3$                                     |
| $+0.5$    | $2.25$      | $2.5$                                   |
| $+0.1$    | $1.21$      | $2.1$                                   |
| $+0.01$   | $1.0201$    | $2.01$                                  |
| $+0.001$  | $1.002001$  | $2.001$                                 |
| $-0.001$  | $0.998001$  | $1.999$                                 |
| $-0.01$   | $0.9801$    | $1.99$                                  |
| $-0.1$    | $0.81$      | $1.9$                                   |

Hai phía cùng **hội tụ về $2$** ⟶ slope tiếp tuyến tại $x=1$ là $2$, tức $f'(1) = 2$. Khớp công thức $(x^2)' = 2x \\to 2\\cdot 1 = 2$ ✓. Để ý: với $h>0$ slope luôn $>2$ (cát tuyến hơi dốc dư), với $h<0$ slope luôn $<2$ — tiếp tuyến nằm "ở giữa".

💡 **Cả 2 hình ảnh dẫn đến cùng 1 định nghĩa**: đạo hàm.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không lấy $\\Delta t = 0$ luôn cho gọn?"* Vì $\\Delta t = 0$ cho $\\frac{0}{0}$ vô nghĩa (không có khoảng để chia quãng đường). Mẹo của giải tích: cho $\\Delta t$ **tiến tới** 0 chứ không **bằng** 0 — tỉ số xấp xỉ ngày càng tốt và hội tụ về một số duy nhất.
- *"Vận tốc tức thời với slope tiếp tuyến có thật sự là một thứ?"* Đúng. Nếu vẽ đồ thị vị trí $s(t)$, độ dốc của tiếp tuyến tại thời điểm $t$ chính là vận tốc tức thời tại $t$. Cùng một phép tính $\\lim \\frac{\\Delta s}{\\Delta t}$, chỉ khác cách diễn giải (hình học vs vật lý).

⚠ **Lỗi thường gặp — nhầm vận tốc trung bình với tức thời**. $v_{tb} = \\frac{\\Delta s}{\\Delta t}$ là trung bình trên cả khoảng; vận tốc tức thời là giới hạn khi $\\Delta t \\to 0$. Vd $s(t) = t^2$: từ $t=2$ đến $t=3$, $v_{tb} = \\frac{9-4}{1} = 5$, nhưng vận tốc tức thời tại $t=2$ là $s'(2) = 4$ — khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. $s(t) = t^2$. Vận tốc trung bình từ $t = 1$ đến $t = 1.1$ là bao nhiêu? Đoán vận tốc tức thời tại $t = 1$.
2. Cát tuyến qua hai điểm trên đồ thị trở thành gì khi hai điểm trùng nhau?

<details><summary>Đáp án</summary>

1. $v_{tb} = \\frac{1.21 - 1}{0.1} = \\frac{0.21}{0.1} = 2.1$. Khi $\\Delta t \\to 0$ → tiến tới $2$ = vận tốc tức thời tại $t=1$ ($s'(1) = 2$).
2. Trở thành **tiếp tuyến** tại điểm đó; slope cát tuyến → slope tiếp tuyến = đạo hàm.

</details>

### 📝 Tóm tắt mục 1

- Đạo hàm = giới hạn của tỉ số biến thiên $\\frac{\\Delta f}{\\Delta x}$ khi $\\Delta x \\to 0$.
- Hai cách hiểu cùng một thứ: **vận tốc tức thời** (vật lý) và **slope tiếp tuyến** (hình học).
- Cho biến tiến 0 (không bằng 0) để né $\\frac{0}{0}$ và thu được một số duy nhất.

---

## 2. Định nghĩa hình thức

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

Cách viết khác (kế Leibniz):

$$\\frac{df}{dx} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$$

**Ý nghĩa hình học**: $f'(a)$ = slope tiếp tuyến với đồ thị $y = f(x)$ tại điểm $(a, f(a))$.

**Phương trình tiếp tuyến tại $(a, f(a))$**:

$$y = f(a) + f'(a)\\cdot(x - a)$$

**Walk-through PT tiếp tuyến — $f(x) = x^2$ tại $a = 3$ (từng bước):**

1. Điểm tiếp xúc: $f(3) = 9 \\to (3, 9)$.
2. Slope: $f'(x) = 2x \\to f'(3) = 6$.
3. Thay vào công thức điểm–slope: $y = 9 + 6(x - 3) = 6x - 18 + 9 = 6x - 9$.
4. **Kiểm**: tại $x = 3$, $y = 6\\cdot3 - 9 = 9$ ✓ (đường thẳng chạm đồ thị tại $(3,9)$). Slope đường thẳng $= 6 = f'(3)$ ✓.

Thêm 3 ví dụ nhanh (verify công thức):

| Hàm        | $a$ | $f(a)$ | $f'(a)$ | PT tiếp tuyến $y = f(a)+f'(a)(x-a)$ |
|------------|-----|--------|---------|-------------------------------------|
| $x^2$      | $-1$| $1$    | $-2$    | $y = 1 - 2(x+1) = -2x - 1$           |
| $\\sqrt{x}$ | $4$ | $2$    | $\\tfrac14$ | $y = 2 + \\tfrac14(x - 4) = \\tfrac14 x + 1$ |
| $1/x$      | $2$ | $0.5$  | $-0.25$ | $y = 0.5 - 0.25(x - 2) = -0.25x + 1$ |

> 📐 **Định nghĩa đầy đủ — Đạo hàm $f'(x)$**
>
> **(a) Là gì**: Giới hạn của tỉ số "biến thiên hàm/biến thiên biến" khi biến biến thiên → 0. Đo "tốc độ tức thời $f$ thay đổi khi $x$ thay đổi" tại đúng 1 điểm. Hình học = slope tiếp tuyến. Vật lý = vận tốc tức thời (nếu $x$ = thời gian, $f$ = vị trí).
>
> **(b) Vì sao cần**: Trước Newton/Leibniz (~1670), không có cách nói chính xác "vận tốc tại 1 thời điểm" (cần khoảng thời gian $\\Delta t$ để chia khoảng cách, nhưng $\\Delta t = 0$ thì chia 0 vô nghĩa). Giới hạn $\\lim_{h \\to 0}$ giải quyết — cho ra 1 số duy nhất khi $h$ tiến 0 đúng cách. Đạo hàm trở thành công cụ trung tâm: tối ưu hoá ($f' = 0$ tại cực trị), mô hình hoá (ODE), xấp xỉ (Taylor), ML (gradient descent).
>
> **(c) Ví dụ số**: $f(x) = x^2$, tại $x = 3$. Tỉ số $= \\frac{(3+h)^2 - 9}{h} = \\frac{6h+h^2}{h} = 6+h$. Cho $h \\to 0$ → $f'(3) = 6$. Verify công thức $(x^2)' = 2x \\to 2\\cdot 3 = 6$ ✓. $f(x) = x^3$ tại $x = 2$: $f'(2) = 3\\cdot 4 = 12$. $f(x) = \\frac{1}{x}$ tại $x = 2$: $f'(2) = -\\frac{1}{4} = -0.25$. Hàm hằng $f(x) = 5$: $f'(x) = 0\\ \\forall x$ (slope tiếp tuyến của đường ngang = 0). $f(x) = |x|$ tại $x = 0$: **không tồn tại** (slope trái $= -1$, slope phải $= +1$).

### 2.1. Đạo hàm = tốc độ biến thiên tức thời (rate of change)

> 💡 **Trực giác.** Bỏ "hình học" và "vật lý" sang một bên, đạo hàm trả lời đúng MỘT câu: *"ngay tại điểm này, khi $x$ tăng thêm một chút, $y$ thay đổi nhanh hay chậm, theo hướng nào?"*. $f'(a) = 3$ nghĩa là: quanh $x = a$, mỗi đơn vị $x$ tăng kéo $y$ tăng $\\approx 3$ đơn vị. $f'(a) = -0.5$: $y$ **giảm** $\\approx 0.5$ đơn vị/đơn vị $x$.

Dấu và độ lớn của $f'$ nói lên hành vi tức thời của hàm:

| $f'(a)$       | Ý nghĩa tại $a$                         | Hình học        |
|---------------|-----------------------------------------|-----------------|
| $f'(a) > 0$   | $f$ đang **tăng** (đi lên)               | tiếp tuyến dốc lên |
| $f'(a) < 0$   | $f$ đang **giảm** (đi xuống)             | tiếp tuyến dốc xuống |
| $f'(a) = 0$   | $f$ "phẳng" tại $a$ (nghi cực trị)       | tiếp tuyến nằm ngang |
| $|f'(a)|$ lớn | $f$ thay đổi **nhanh** (đồ thị dốc đứng) | tiếp tuyến gần đứng |
| $|f'(a)|$ nhỏ | $f$ thay đổi **chậm** (đồ thị thoải)     | tiếp tuyến gần ngang |

**Ví dụ đa dạng (4 ngữ cảnh, cùng một khái niệm):**

1. **Vật lý**: $s(t)$ vị trí → $s'(t)$ = vận tốc; $s''(t)$ = gia tốc.
2. **Kinh tế**: $C(q)$ chi phí sản xuất $q$ món → $C'(q)$ = *chi phí biên* (marginal cost), tiền tốn thêm để làm món thứ $q{+}1$.
3. **Sinh học**: $P(t)$ dân số → $P'(t)$ = tốc độ tăng dân tức thời (cá thể/năm).
4. **ML / tối ưu**: $L(w)$ hàm mất mát theo trọng số $w$ → $L'(w)$ cho biết chỉnh $w$ tăng hay giảm để $L$ giảm (nền tảng gradient descent — học kỹ sau).

🔁 **Dừng lại tự kiểm tra**

1. $f'(5) = 0$ và $f'(4) > 0$, $f'(6) < 0$. Tại $x = 5$ hàm đang làm gì?
2. Chi phí $C(q) = q^2$ (nghìn đồng). Chi phí biên tại $q = 10$ là bao nhiêu (dùng $C'(q) = 2q$)?

<details><summary>Đáp án</summary>

1. Tăng trước $5$, giảm sau $5$, phẳng tại $5$ → $x=5$ là **điểm cực đại** (đỉnh).
2. $C'(10) = 2\\cdot 10 = 20$ nghìn đồng — làm món thứ 11 tốn thêm $\\approx 20$ nghìn.

</details>

❓ **Câu hỏi tự nhiên của người đọc**

- *"$f'(x)$ là một số hay một hàm?"* Cả hai, tùy ngữ cảnh. $f'(a)$ (thay số cụ thể) là **một số** (slope tại điểm $a$). $f'(x)$ (để nguyên biến) là một **hàm** cho slope tại mọi điểm. Vd $(x^2)' = 2x$ là hàm; $f'(3) = 6$ là số.
- *"Tại sao công thức tiếp tuyến là $y = f(a) + f'(a)(x-a)$?"* Đây là đường thẳng qua điểm $(a, f(a))$ với hệ số góc $f'(a)$. Dạng "điểm–slope" của đường thẳng $y - y_0 = m(x - x_0)$, với $m = f'(a)$.

⚠ **Lỗi thường gặp — quên rằng $f'(a)$ có thể không tồn tại**. Đạo hàm là một giới hạn; giới hạn này có thể không tồn tại (góc nhọn như $|x|$ tại 0, hoặc tiếp tuyến đứng như $\\sqrt[3]{x}$ tại 0). Không phải hàm nào cũng khả vi tại mọi điểm.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$. Viết phương trình tiếp tuyến tại $x = 1$.
2. $f'(2) = 12$ cho hàm $x^3$ — nghĩa hình học của số $12$ này là gì?

<details><summary>Đáp án</summary>

1. $f(1) = 1$, $f'(1) = 2$ → $y = 1 + 2(x-1) = 2x - 1$.
2. Slope của tiếp tuyến với đồ thị $y = x^3$ tại điểm $(2, 8)$ bằng $12$ (đồ thị dốc đứng tại đó).

</details>

### 📝 Tóm tắt mục 2

- $f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$ — slope tiếp tuyến = vận tốc tức thời.
- Tiếp tuyến tại $(a, f(a))$: $y = f(a) + f'(a)(x - a)$.
- $f'(a)$ là **số** (slope tại 1 điểm); $f'(x)$ là **hàm**; có thể không tồn tại tại vài điểm.

---

## 3. Tính đạo hàm bằng định nghĩa

### 3.1. $f(x) = x^2$ (ví dụ kinh điển)

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{2xh + h^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} (2x + h) = 2x
\\end{aligned}$$

⟶ $(x^2)' = 2x$.

### 3.2. $f(x) = \\dfrac{1}{x}$

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h}
= \\lim_{h \\to 0} \\frac{\\frac{x - (x+h)}{x(x+h)}}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{-h}{h\\,x(x+h)}
= \\lim_{h \\to 0} \\frac{-1}{x(x+h)} = -\\frac{1}{x^2}
\\end{aligned}$$

⟶ $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.

### 3.3. $f(x) = \\sqrt{x}$

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\sqrt{x+h} - \\sqrt{x}}{h}
= \\lim_{h \\to 0} \\frac{(\\sqrt{x+h} - \\sqrt{x})(\\sqrt{x+h} + \\sqrt{x})}{h(\\sqrt{x+h} + \\sqrt{x})} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{h}{h(\\sqrt{x+h} + \\sqrt{x})}
= \\lim_{h \\to 0} \\frac{1}{\\sqrt{x+h} + \\sqrt{x}} = \\frac{1}{2\\sqrt{x}}
\\end{aligned}$$

⟶ $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.

### 3.4. $f(x) = \\sin x$

Dùng đồng nhất thức $\\sin(x+h) - \\sin x = 2\\cos\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)$ và $\\lim \\dfrac{\\sin(h/2)}{h/2} = 1$:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\sin(x+h) - \\sin x}{h}
= \\lim_{h \\to 0} \\frac{2\\cos\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\cos\\!\\left(x+\\frac{h}{2}\\right) \\cdot \\frac{\\sin(h/2)}{h/2}
= \\cos(x) \\cdot 1 = \\cos x
\\end{aligned}$$

⟶ $(\\sin x)' = \\cos x$.

### 3.5. $f(x) = x^3$ (khai triển lập phương, từng bước)

Đây là ví dụ thứ 4 tính **đầy đủ bằng định nghĩa**, dùng nhị thức $(x+h)^3 = x^3 + 3x^2 h + 3x h^2 + h^3$:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{(x+h)^3 - x^3}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{x^3 + 3x^2 h + 3x h^2 + h^3 - x^3}{h} && \\text{(khai triển lập phương)} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{3x^2 h + 3x h^2 + h^3}{h} && \\text{(triệt tiêu } x^3\\text{)} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{h\\,(3x^2 + 3x h + h^2)}{h} && \\text{(đặt } h \\text{ làm thừa số chung)} \\\\[4pt]
&= \\lim_{h \\to 0} (3x^2 + 3x h + h^2) && \\text{(rút gọn } h \\text{ vì } h \\neq 0 \\text{ khi đang tiến)} \\\\[4pt]
&= 3x^2 && \\text{(thế } h = 0 \\text{ vào biểu thức đã liên tục)}
\\end{aligned}$$

⟶ $(x^3)' = 3x^2$.

### 3.6. Tổng hợp 4 đạo hàm tính bằng định nghĩa — verify bằng số

Mỗi công thức vừa chứng minh, ta kiểm lại bằng cát tuyến với $h = 0.001$ (slope số $\\approx$ đạo hàm thật):

| Hàm $f(x)$        | $f'(x)$ (đã CM)        | Điểm $x$ | $f'(x)$ lý thuyết | Slope số $\\frac{f(x+0.001)-f(x)}{0.001}$ |
|-------------------|-----------------------|----------|-------------------|------------------------------------------|
| $x^2$             | $2x$                  | $3$      | $6$               | $\\frac{9.006001 - 9}{0.001} = 6.001$     |
| $x^3$             | $3x^2$                | $2$      | $12$              | $\\frac{8.012006001 - 8}{0.001} = 12.006$ |
| $\\dfrac{1}{x}$    | $-\\dfrac{1}{x^2}$     | $2$      | $-0.25$           | $\\frac{0.49975\\ldots - 0.5}{0.001} = -0.24994$ |
| $\\sqrt{x}$        | $\\dfrac{1}{2\\sqrt{x}}$| $4$      | $0.25$            | $\\frac{2.0002499\\ldots - 2}{0.001} = 0.24998$ |

Mọi slope số xấp xỉ rất sát giá trị lý thuyết — bằng chứng "đo được" rằng các công thức đúng. Sai số nhỏ chính là vì $h = 0.001 \\neq 0$ (cát tuyến chưa hẳn là tiếp tuyến); cho $h$ nhỏ hơn nữa, sai số tiến về 0.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao luôn xuất hiện trò 'nhân liên hợp' hay 'rút gọn $h$'?"* Vì tỉ số $\\frac{f(x+h)-f(x)}{h}$ luôn là dạng $\\frac{0}{0}$ khi $h \\to 0$ (tử và mẫu cùng tiến 0). Mục tiêu mọi phép biến đổi là **triệt tiêu $h$ ở mẫu** trước khi cho $h \\to 0$, để không còn chia 0.
- *"Tính bằng định nghĩa cực dài — có phải làm vậy mãi không?"* Không. Ta tính một lần để **chứng minh** công thức, sau đó dùng bảng đạo hàm + quy tắc (L04) cho nhanh. Định nghĩa là nền móng, không phải công cụ hằng ngày.

⚠ **Lỗi thường gặp — cho $h = 0$ quá sớm**. Nếu thay $h = 0$ ngay vào $\\frac{(x+h)^2-x^2}{h}$ được $\\frac{0}{0}$ vô nghĩa. Phải khai triển và rút gọn $h$ ($= 2x + h$) **trước**, rồi mới cho $h \\to 0$.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định nghĩa, chứng minh $(x^3)' = 3x^2$ (gợi ý $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$).
2. Trong bước rút gọn của $(\\sqrt{x})'$, vì sao phải nhân liên hợp?

<details><summary>Đáp án</summary>

1. $\\frac{(x+h)^3-x^3}{h} = \\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2 \\to 3x^2$ khi $h\\to 0$.
2. Để biến tử $\\sqrt{x+h}-\\sqrt{x}$ thành $(x+h)-x = h$, qua đó triệt tiêu $h$ ở mẫu (nếu không thì kẹt dạng $\\frac{0}{0}$).

</details>

### 📝 Tóm tắt mục 3

- Quy trình: lập tỉ số $\\frac{f(x+h)-f(x)}{h}$, biến đổi để **triệt tiêu $h$**, rồi cho $h \\to 0$.
- Kết quả nền tảng: $(x^2)' = 2x$, $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}$, $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$.
- Chỉ tính bằng định nghĩa để **chứng minh**; sau đó dùng bảng + quy tắc (L04).

---

## 4. Ký hiệu khác nhau cho đạo hàm

- **Newton**: $f'(x)$, $y'$.
- **Leibniz**: $\\dfrac{df}{dx}$, $\\dfrac{dy}{dx}$ — "tỉ số vi phân".
- **Lagrange cấp cao**: $f''(x)$, $f'''(x)$, $f^{(n)}(x)$.
- **Leibniz cấp cao**: $\\dfrac{d^2y}{dx^2}$, $\\dfrac{d^n y}{dx^n}$.

💡 **Khi nào dùng cái nào**:
- $f'(x)$: nhanh, gọn (thường dùng).
- $\\dfrac{dy}{dx}$: nhấn mạnh đạo hàm theo BIẾN nào (quan trọng khi nhiều biến).

#### Bảng đối chiếu ký hiệu — cùng một thứ, 4 cách viết

Với $y = f(x) = x^2$, bốn dòng sau **nói cùng một điều** ($\\frac{d y}{d x} = 2x$):

| Ký hiệu                | Đọc                          | Trường phái | Tiện khi nào                          |
|------------------------|------------------------------|-------------|----------------------------------------|
| $f'(x) = 2x$           | "f phẩy của x"               | Lagrange    | Viết tay nhanh, hàm một biến          |
| $\\dfrac{dy}{dx} = 2x$  | "đy trên đêx"                | Leibniz     | Chain rule, đổi biến, vật lý          |
| $\\dfrac{d}{dx}(x^2)=2x$| "đạo hàm theo x của $x^2$"   | Leibniz toán tử | Khi không muốn đặt tên hàm        |
| $D(x^2) = 2x$          | "D của $x^2$"                | Euler       | Ít gặp, hay trong lý thuyết toán tử   |

⚠ **Lỗi thường gặp — coi $\\dfrac{dy}{dx}$ là phép chia $dy \\div dx$**. Theo định nghĩa hình thức, $\\frac{dy}{dx}$ là **ký hiệu cho một giới hạn** $\\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$, KHÔNG phải thương của hai số $dy$ và $dx$. Nó "cư xử như" phân số trong nhiều thao tác (chain rule $\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$, đổi biến tích phân) — đó là lý do Leibniz chọn ký hiệu này — nhưng đừng tách rời $dy$, $dx$ ra như hai số độc lập rồi "rút gọn" bừa. Bản chất vẫn là một giới hạn duy nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\frac{dy}{dx}$ có phải phân số $dy$ chia $dx$ không?"* Theo nghĩa chặt, đây là **ký hiệu cho một giới hạn**, không phải phép chia thật. Nhưng nó "cư xử như" phân số trong nhiều trường hợp (đổi biến, chain rule) — đó là lý do Leibniz chọn ký hiệu này, rất tiện thao tác.
- *"$f''(x)$ nghĩa là gì?"* Đạo hàm của đạo hàm — tốc độ thay đổi của slope. Vd $s''(t)$ = gia tốc (tốc độ thay đổi của vận tốc). Sẽ dùng nhiều ở L04, L05.

🔁 **Dừng lại tự kiểm tra**

1. Viết đạo hàm cấp 2 của $y$ theo $x$ bằng cả ký hiệu Lagrange và Leibniz.
2. $\\frac{dy}{dt}$ khác $\\frac{dy}{dx}$ ở chỗ nào?

<details><summary>Đáp án</summary>

1. Lagrange: $y''$ (hay $f''(x)$); Leibniz: $\\frac{d^2y}{dx^2}$.
2. Khác **biến** lấy đạo hàm theo: một theo thời gian $t$, một theo $x$. Quan trọng khi $y$ phụ thuộc nhiều biến.

</details>

### 📝 Tóm tắt mục 4

- Lagrange $f'(x), f''(x)$: gọn, dùng phổ biến.
- Leibniz $\\frac{dy}{dx}, \\frac{d^2y}{dx^2}$: nhấn mạnh biến lấy đạo hàm; "cư xử như" phân số.
- Cùng một khái niệm, chọn ký hiệu theo ngữ cảnh.

---

## 5. Khả vi & Liên tục

**Định lý**: Nếu $f$ khả vi tại $a$ ($f'(a)$ tồn tại) thì $f$ liên tục tại $a$.

**Chiều ngược KHÔNG đúng**: $f$ liên tục không nhất thiết khả vi.

**Ví dụ**: $f(x) = |x|$ liên tục tại 0 nhưng KHÔNG khả vi.
- $\\lim$ trái: $f'(0^-) = -1$.
- $\\lim$ phải: $f'(0^+) = 1$.
- Khác nhau → $f'(0)$ không tồn tại (góc "nhọn" tại $x=0$).

#### Walk-through bằng số — vì sao $|x|$ không khả vi tại 0

Lập tỉ số $\\frac{|0+h| - |0|}{h} = \\frac{|h|}{h}$ và cho $h$ tiến 0 từ 2 phía:

| $h$       | $|h|$    | $\\dfrac{|h|}{h}$ |
|-----------|----------|------------------|
| $+0.1$    | $0.1$    | $+1$             |
| $+0.001$  | $0.001$  | $+1$             |
| $-0.001$  | $0.001$  | $-1$             |
| $-0.1$    | $0.1$    | $-1$             |

Bên phải tỉ số **luôn $+1$**, bên trái **luôn $-1$** — hai phía không gặp nhau ⟶ giới hạn không tồn tại ⟶ $f'(0)$ không tồn tại. Hình học: đồ thị $|x|$ có "góc nhọn" tại 0, không có một tiếp tuyến duy nhất.

#### 3 kiểu đạo hàm không tồn tại (dù hàm vẫn liên tục)

| Kiểu | Ví dụ | Lý do $f'$ không tồn tại |
|------|-------|---------------------------|
| **Góc nhọn** (corner) | $|x|$ tại 0 | Slope trái $-1 \\neq$ slope phải $+1$ |
| **Tiếp tuyến đứng** (vertical tangent) | $\\sqrt[3]{x}$ tại 0 | Slope $\\to +\\infty$, tiếp tuyến thẳng đứng (không có hệ số góc hữu hạn) |
| **Cusp / điểm nhọn dựng** | $x^{2/3}$ tại 0 | Slope trái $\\to -\\infty$, slope phải $\\to +\\infty$ |

(Gián đoạn cũng làm mất khả vi, nhưng đó là vì hàm KHÔNG liên tục — 3 kiểu trên là các hàm vẫn liên tục mà vẫn không khả vi.)

3 kiểu (mỗi hình là đồ thị gần $x=0$):

<svg viewBox="0 0 570 220" style="max-width:570px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba kiểu không khả vi tại x = 0: góc nhọn của |x| (slope hai bên khác nhau), tiếp tuyến đứng của căn bậc 3 (slope vô hạn), cusp của x mũ 2/3 (hai nhánh dựng đứng)">
  <defs><marker id="ar6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="90.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">góc nhọn |x|</text>
  <line x1="1.5" y1="150.0" x2="194.5" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="90.0" y1="238.5" x2="90.0" y2="40.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="186.5" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="98.0" y="50.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 13.0,73.0 L 14.0,74.0 L 14.9,74.9 L 15.9,75.9 L 16.8,76.8 L 17.8,77.8 L 18.8,78.8 L 19.7,79.7 L 20.7,80.7 L 21.7,81.7 L 22.6,82.6 L 23.6,83.6 L 24.5,84.5 L 25.5,85.5 L 26.5,86.5 L 27.4,87.4 L 28.4,88.4 L 29.4,89.4 L 30.3,90.3 L 31.3,91.3 L 32.2,92.2 L 33.2,93.2 L 34.2,94.2 L 35.1,95.1 L 36.1,96.1 L 37.0,97.0 L 38.0,98.0 L 39.0,99.0 L 39.9,99.9 L 40.9,100.9 L 41.9,101.9 L 42.8,102.8 L 43.8,103.8 L 44.7,104.7 L 45.7,105.7 L 46.7,106.7 L 47.6,107.6 L 48.6,108.6 L 49.5,109.5 L 50.5,110.5 L 51.5,111.5 L 52.4,112.4 L 53.4,113.4 L 54.4,114.4 L 55.3,115.3 L 56.3,116.3 L 57.2,117.2 L 58.2,118.2 L 59.2,119.2 L 60.1,120.1 L 61.1,121.1 L 62.1,122.1 L 63.0,123.0 L 64.0,124.0 L 64.9,124.9 L 65.9,125.9 L 66.9,126.9 L 67.8,127.8 L 68.8,128.8 L 69.7,129.7 L 70.7,130.7 L 71.7,131.7 L 72.6,132.6 L 73.6,133.6 L 74.6,134.6 L 75.5,135.5 L 76.5,136.5 L 77.4,137.4 L 78.4,138.4 L 79.4,139.4 L 80.3,140.3 L 81.3,141.3 L 82.3,142.3 L 83.2,143.2 L 84.2,144.2 L 85.1,145.1 L 86.1,146.1 L 87.1,147.1 L 88.0,148.0 L 89.0,149.0 L 89.9,149.9" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 90.1,149.9 L 91.0,149.0 L 92.0,148.0 L 92.9,147.1 L 93.9,146.1 L 94.9,145.1 L 95.8,144.2 L 96.8,143.2 L 97.7,142.3 L 98.7,141.3 L 99.7,140.3 L 100.6,139.4 L 101.6,138.4 L 102.6,137.4 L 103.5,136.5 L 104.5,135.5 L 105.4,134.6 L 106.4,133.6 L 107.4,132.6 L 108.3,131.7 L 109.3,130.7 L 110.3,129.7 L 111.2,128.8 L 112.2,127.8 L 113.1,126.9 L 114.1,125.9 L 115.1,124.9 L 116.0,124.0 L 117.0,123.0 L 117.9,122.1 L 118.9,121.1 L 119.9,120.1 L 120.8,119.2 L 121.8,118.2 L 122.8,117.2 L 123.7,116.3 L 124.7,115.3 L 125.6,114.4 L 126.6,113.4 L 127.6,112.4 L 128.5,111.5 L 129.5,110.5 L 130.5,109.5 L 131.4,108.6 L 132.4,107.6 L 133.3,106.7 L 134.3,105.7 L 135.3,104.7 L 136.2,103.8 L 137.2,102.8 L 138.1,101.9 L 139.1,100.9 L 140.1,99.9 L 141.0,99.0 L 142.0,98.0 L 143.0,97.0 L 143.9,96.1 L 144.9,95.1 L 145.8,94.2 L 146.8,93.2 L 147.8,92.2 L 148.7,91.3 L 149.7,90.3 L 150.6,89.4 L 151.6,88.4 L 152.6,87.4 L 153.5,86.5 L 154.5,85.5 L 155.5,84.5 L 156.4,83.6 L 157.4,82.6 L 158.3,81.7 L 159.3,80.7 L 160.3,79.7 L 161.2,78.8 L 162.2,77.8 L 163.2,76.8 L 164.1,75.9 L 165.1,74.9 L 166.0,74.0 L 167.0,73.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="90.0" cy="150.0" r="4" fill="#dc2626"/>
  <text x="90.0" y="176.0" fill="#dc2626" font-size="10" text-anchor="middle">slope trái −1 ≠ phải +1</text>
  <text x="280.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">tiếp tuyến đứng ∛x</text>
  <line x1="191.5" y1="150.0" x2="384.5" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="280.0" y1="238.5" x2="280.0" y2="40.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="376.5" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="288.0" y="50.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 203.0,211.5 L 204.0,211.3 L 204.9,211.0 L 205.9,210.7 L 206.8,210.5 L 207.8,210.2 L 208.8,210.0 L 209.7,209.7 L 210.7,209.4 L 211.7,209.1 L 212.6,208.9 L 213.6,208.6 L 214.5,208.3 L 215.5,208.0 L 216.5,207.7 L 217.4,207.4 L 218.4,207.1 L 219.4,206.8 L 220.3,206.5 L 221.3,206.2 L 222.2,205.9 L 223.2,205.6 L 224.2,205.3 L 225.1,205.0 L 226.1,204.6 L 227.0,204.3 L 228.0,204.0 L 229.0,203.6 L 229.9,203.3 L 230.9,203.0 L 231.9,202.6 L 232.8,202.3 L 233.8,201.9 L 234.7,201.5 L 235.7,201.2 L 236.7,200.8 L 237.6,200.4 L 238.6,200.0 L 239.5,199.6 L 240.5,199.2 L 241.5,198.8 L 242.4,198.4 L 243.4,198.0 L 244.4,197.6 L 245.3,197.2 L 246.3,196.7 L 247.2,196.3 L 248.2,195.8 L 249.2,195.4 L 250.1,194.9 L 251.1,194.4 L 252.1,193.9 L 253.0,193.4 L 254.0,192.9 L 254.9,192.3 L 255.9,191.8 L 256.9,191.2 L 257.8,190.6 L 258.8,190.0 L 259.7,189.4 L 260.7,188.8 L 261.7,188.1 L 262.6,187.5 L 263.6,186.7 L 264.6,186.0 L 265.5,185.3 L 266.5,184.5 L 267.4,183.6 L 268.4,182.7 L 269.4,181.8 L 270.3,180.8 L 271.3,179.8 L 272.3,178.6 L 273.2,177.4 L 274.2,176.0 L 275.1,174.5 L 276.1,172.8 L 277.1,170.7 L 278.0,168.2 L 279.0,164.5 L 279.9,155.5" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 280.1,144.5 L 281.0,135.5 L 282.0,131.8 L 282.9,129.3 L 283.9,127.2 L 284.9,125.5 L 285.8,124.0 L 286.8,122.6 L 287.7,121.4 L 288.7,120.2 L 289.7,119.2 L 290.6,118.2 L 291.6,117.3 L 292.6,116.4 L 293.5,115.5 L 294.5,114.7 L 295.4,114.0 L 296.4,113.3 L 297.4,112.5 L 298.3,111.9 L 299.3,111.2 L 300.3,110.6 L 301.2,110.0 L 302.2,109.4 L 303.1,108.8 L 304.1,108.2 L 305.1,107.7 L 306.0,107.1 L 307.0,106.6 L 307.9,106.1 L 308.9,105.6 L 309.9,105.1 L 310.8,104.6 L 311.8,104.2 L 312.8,103.7 L 313.7,103.3 L 314.7,102.8 L 315.6,102.4 L 316.6,102.0 L 317.6,101.6 L 318.5,101.2 L 319.5,100.8 L 320.5,100.4 L 321.4,100.0 L 322.4,99.6 L 323.3,99.2 L 324.3,98.8 L 325.3,98.5 L 326.2,98.1 L 327.2,97.7 L 328.1,97.4 L 329.1,97.0 L 330.1,96.7 L 331.0,96.4 L 332.0,96.0 L 333.0,95.7 L 333.9,95.4 L 334.9,95.0 L 335.8,94.7 L 336.8,94.4 L 337.8,94.1 L 338.7,93.8 L 339.7,93.5 L 340.6,93.2 L 341.6,92.9 L 342.6,92.6 L 343.5,92.3 L 344.5,92.0 L 345.5,91.7 L 346.4,91.4 L 347.4,91.1 L 348.3,90.9 L 349.3,90.6 L 350.3,90.3 L 351.2,90.0 L 352.2,89.8 L 353.2,89.5 L 354.1,89.3 L 355.1,89.0 L 356.0,88.7 L 357.0,88.5" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="280.0" y1="227.0" x2="280.0" y2="67.5" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <circle cx="280.0" cy="150.0" r="4" fill="#dc2626"/>
  <text x="288.2" y="216.0" fill="#dc2626" font-size="10" text-anchor="start">slope → ∞</text>
  <text x="470.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">cusp x^(2/3)</text>
  <line x1="381.5" y1="150.0" x2="574.5" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="470.0" y1="238.5" x2="470.0" y2="40.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="566.5" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="478.0" y="50.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 393.0,81.2 L 394.0,81.7 L 394.9,82.3 L 395.9,82.9 L 396.8,83.5 L 397.8,84.1 L 398.8,84.7 L 399.7,85.2 L 400.7,85.8 L 401.7,86.4 L 402.6,87.0 L 403.6,87.6 L 404.5,88.2 L 405.5,88.8 L 406.5,89.4 L 407.4,90.1 L 408.4,90.7 L 409.4,91.3 L 410.3,91.9 L 411.3,92.5 L 412.2,93.2 L 413.2,93.8 L 414.2,94.4 L 415.1,95.1 L 416.1,95.7 L 417.0,96.4 L 418.0,97.0 L 419.0,97.7 L 419.9,98.3 L 420.9,99.0 L 421.9,99.7 L 422.8,100.3 L 423.8,101.0 L 424.7,101.7 L 425.7,102.4 L 426.7,103.1 L 427.6,103.8 L 428.6,104.5 L 429.5,105.2 L 430.5,105.9 L 431.5,106.6 L 432.4,107.3 L 433.4,108.1 L 434.4,108.8 L 435.3,109.6 L 436.3,110.3 L 437.2,111.1 L 438.2,111.8 L 439.2,112.6 L 440.1,113.4 L 441.1,114.2 L 442.1,115.0 L 443.0,115.8 L 444.0,116.6 L 444.9,117.4 L 445.9,118.3 L 446.9,119.1 L 447.8,120.0 L 448.8,120.9 L 449.7,121.7 L 450.7,122.6 L 451.7,123.6 L 452.6,124.5 L 453.6,125.4 L 454.6,126.4 L 455.5,127.4 L 456.5,128.4 L 457.4,129.5 L 458.4,130.5 L 459.4,131.6 L 460.3,132.7 L 461.3,133.9 L 462.3,135.1 L 463.2,136.4 L 464.2,137.7 L 465.1,139.1 L 466.1,140.6 L 467.1,142.2 L 468.0,144.0 L 469.0,146.2 L 469.9,149.5" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 470.1,149.4 L 471.0,146.2 L 472.0,144.0 L 472.9,142.2 L 473.9,140.6 L 474.9,139.1 L 475.8,137.7 L 476.8,136.4 L 477.7,135.1 L 478.7,133.9 L 479.7,132.7 L 480.6,131.6 L 481.6,130.5 L 482.6,129.5 L 483.5,128.4 L 484.5,127.4 L 485.4,126.4 L 486.4,125.4 L 487.4,124.5 L 488.3,123.6 L 489.3,122.6 L 490.3,121.7 L 491.2,120.9 L 492.2,120.0 L 493.1,119.1 L 494.1,118.3 L 495.1,117.4 L 496.0,116.6 L 497.0,115.8 L 497.9,115.0 L 498.9,114.2 L 499.9,113.4 L 500.8,112.6 L 501.8,111.8 L 502.8,111.1 L 503.7,110.3 L 504.7,109.6 L 505.6,108.8 L 506.6,108.1 L 507.6,107.3 L 508.5,106.6 L 509.5,105.9 L 510.5,105.2 L 511.4,104.5 L 512.4,103.8 L 513.3,103.1 L 514.3,102.4 L 515.3,101.7 L 516.2,101.0 L 517.2,100.3 L 518.1,99.7 L 519.1,99.0 L 520.1,98.3 L 521.0,97.7 L 522.0,97.0 L 523.0,96.4 L 523.9,95.7 L 524.9,95.1 L 525.8,94.4 L 526.8,93.8 L 527.8,93.2 L 528.7,92.5 L 529.7,91.9 L 530.6,91.3 L 531.6,90.7 L 532.6,90.1 L 533.5,89.4 L 534.5,88.8 L 535.5,88.2 L 536.4,87.6 L 537.4,87.0 L 538.3,86.4 L 539.3,85.8 L 540.3,85.2 L 541.2,84.7 L 542.2,84.1 L 543.2,83.5 L 544.1,82.9 L 545.1,82.3 L 546.0,81.7 L 547.0,81.2" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="470.0" cy="150.0" r="4" fill="#dc2626"/>
  <text x="470.0" y="176.0" fill="#dc2626" font-size="10" text-anchor="middle">2 nhánh dựng đứng</text>
  <text x="285.0" y="205.0" fill="#475569" font-size="12" text-anchor="middle">cả 3 hàm đều LIÊN TỤC tại x = 0 nhưng KHÔNG khả vi</text>
</svg>

💡 **Tóm tắt**:
- Khả vi $\\implies$ Liên tục.
- Liên tục $\\nRightarrow$ Khả vi (đồ thị có "góc nhọn", tiếp tuyến đứng, hoặc cusp).

⚠ **Cực đoan**: Hàm Weierstrass — liên tục mọi nơi nhưng không khả vi tại bất kỳ điểm nào!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khả vi LẠI kéo theo liên tục?"* Chứng minh từng bước: ta cần $\\lim_{h \\to 0} [f(a+h) - f(a)] = 0$ (định nghĩa liên tục). Viết $f(a+h) - f(a) = \\frac{f(a+h)-f(a)}{h} \\cdot h$. Cho $h \\to 0$: thừa số đầu → $f'(a)$ (hữu hạn vì khả vi), thừa số sau $h \\to 0$. Tích $= f'(a) \\cdot 0 = 0$. Vậy $\\lim f(a+h) = f(a)$ → liên tục. (Mấu chốt: $f'(a)$ hữu hạn nên không "kéo" tích đi đâu được.)
- *"Có hàm liên tục mà không khả vi tại nhiều điểm không?"* Có. $|\\sin x|$ có góc nhọn tại mọi $x = k\\pi$ — liên tục khắp nơi, không khả vi tại vô số điểm. Cực đoan hơn là hàm Weierstrass (không khả vi tại **mọi** điểm).

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = |x - 3|$. Khả vi tại $x = 3$ không? Tại $x = 5$ không?
2. Một hàm khả vi tại $a$ thì có chắc liên tục tại $a$ không?

<details><summary>Đáp án</summary>

1. Tại $x=3$: **không** (góc nhọn, slope trái $-1$ ≠ phải $+1$). Tại $x=5$: **có** (xa góc nhọn, $f = x-3$, $f' = 1$).
2. Chắc chắn có — theo định lý "khả vi $\\implies$ liên tục" (chứng minh ở trên).

</details>

### 📝 Tóm tắt mục 5

- **Khả vi $\\implies$ liên tục** (chứng minh: $f(a+h)-f(a) = (\\text{tỉ số})\\cdot h \\to f'(a)\\cdot 0 = 0$).
- Chiều ngược **sai**: liên tục không kéo theo khả vi (góc nhọn $|x|$ tại 0).
- Cực đoan: hàm Weierstrass liên tục mọi nơi nhưng không khả vi ở đâu cả.

---

## 6. Đạo hàm 1 bên

Tương tự giới hạn 1 bên:

$$f'(a^-) = \\lim_{h \\to 0^-} \\frac{f(a+h) - f(a)}{h}, \\qquad
f'(a^+) = \\lim_{h \\to 0^+} \\frac{f(a+h) - f(a)}{h}$$

$f$ khả vi tại $a \\iff f'(a^-) = f'(a^+)$.

💡 **Trực giác**: giống giới hạn một bên cho hàm — slope nhìn từ bên trái và bên phải. Khả vi đòi hỏi hai slope này gặp nhau (đồ thị "trơn", không gấp khúc).

#### Walk-through đầy đủ — hàm chia khúc dán trơn vs dán gãy

Xét $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ 2x - 1 & x > 1 \\end{cases}$. Kiểm khả vi tại $x = 1$ theo **2 bước bắt buộc**:

**Bước 1 — liên tục tại 1?** Nhánh trái tại 1: $1^2 = 1$. Nhánh phải tại $1^+$: $2(1) - 1 = 1$. Bằng nhau ⟶ **liên tục** ✓ (qua được bước 1).

**Bước 2 — hai đạo hàm một bên?** Tính từng phía bằng định nghĩa:

$$\\begin{aligned}
f'(1^-) &= \\lim_{h \\to 0^-} \\frac{(1+h)^2 - 1}{h} = \\lim_{h \\to 0^-}\\frac{2h + h^2}{h} = \\lim_{h \\to 0^-}(2 + h) = 2 \\\\[4pt]
f'(1^+) &= \\lim_{h \\to 0^+} \\frac{[2(1+h) - 1] - 1}{h} = \\lim_{h \\to 0^+}\\frac{2h}{h} = 2
\\end{aligned}$$

$f'(1^-) = f'(1^+) = 2$ ⟶ **khả vi tại 1**, $f'(1) = 2$. Đồ thị "dán trơn" tại $x=1$.

Bây giờ đổi nhánh phải thành $3x - 2$ (vẫn liên tục: $3(1)-2 = 1$ ✓), nhưng:

$$f'(1^+) = \\lim_{h \\to 0^+}\\frac{[3(1+h) - 2] - 1}{h} = \\lim_{h \\to 0^+}\\frac{3h}{h} = 3 \\neq 2 = f'(1^-).$$

⟶ **không khả vi** tại 1 dù liên tục — đồ thị có "góc gãy" (đổi slope đột ngột $2 \\to 3$).

So sánh bằng hình:

<svg viewBox="0 0 440 235" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="So sánh dán hai mảnh hàm tại x = 1: dán trơn (slope hai bên bằng nhau, khả vi) và dán gãy (slope nhảy 2 → 3, chỉ liên tục)">
  <defs><marker id="ar7" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="100.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">dán TRƠN (khả vi)</text>
  <line x1="34.0" y1="150.0" x2="183.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar7)"/>
  <line x1="40.0" y1="156.0" x2="40.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar7)"/>
  <text x="175.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="48.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="95.0" y1="146.0" x2="95.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="95.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <path d="M 48.2,195.3 L 49.0,193.6 L 49.8,191.9 L 50.6,190.2 L 51.4,188.6 L 52.1,186.9 L 52.9,185.2 L 53.7,183.6 L 54.5,182.0 L 55.3,180.3 L 56.0,178.7 L 56.8,177.1 L 57.6,175.5 L 58.4,173.9 L 59.2,172.3 L 59.9,170.8 L 60.7,169.2 L 61.5,167.6 L 62.3,166.1 L 63.1,164.6 L 63.8,163.0 L 64.6,161.5 L 65.4,160.0 L 66.2,158.5 L 67.0,157.0 L 67.7,155.6 L 68.5,154.1 L 69.3,152.6 L 70.1,151.2 L 70.8,149.8 L 71.6,148.3 L 72.4,146.9 L 73.2,145.5 L 74.0,144.1 L 74.7,142.7 L 75.5,141.3 L 76.3,140.0 L 77.1,138.6 L 77.9,137.3 L 78.6,135.9 L 79.4,134.6 L 80.2,133.3 L 81.0,132.0 L 81.8,130.7 L 82.5,129.4 L 83.3,128.1 L 84.1,126.8 L 84.9,125.5 L 85.7,124.3 L 86.4,123.0 L 87.2,121.8 L 88.0,120.6 L 88.8,119.4 L 89.5,118.2 L 90.3,117.0 L 91.1,115.8 L 91.9,114.6 L 92.7,113.4 L 93.4,112.3 L 94.2,111.1 L 95.0,110.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 95.0,110.0 L 95.9,108.7 L 96.8,107.3 L 97.8,105.9 L 98.7,104.6 L 99.6,103.2 L 100.5,101.8 L 101.4,100.3 L 102.3,98.9 L 103.2,97.5 L 104.2,96.0 L 105.1,94.5 L 106.0,93.0 L 106.9,91.5 L 107.8,90.0 L 108.8,88.5 L 109.7,87.0 L 110.6,85.4 L 111.5,83.8 L 112.4,82.3 L 113.3,80.7 L 114.2,79.1 L 115.2,77.4 L 116.1,75.8 L 117.0,74.2 L 117.9,72.5 L 118.8,70.8 L 119.8,69.1 L 120.7,67.4 L 121.6,65.7 L 122.5,64.0 L 123.4,62.3 L 124.3,60.5 L 125.2,58.7 L 126.2,57.0 L 127.1,55.2 L 128.0,53.4 L 128.9,51.5 L 129.8,49.7 L 130.8,47.9 L 131.7,46.0 L 132.6,44.1 L 133.5,42.2 L 134.4,40.3 L 135.3,38.4 L 136.2,36.5 L 137.2,34.6 L 138.1,32.6 L 139.0,30.6 L 139.9,28.7 L 140.8,26.7 L 141.8,24.7 L 142.7,22.6 L 143.6,20.6 L 144.5,18.6 L 145.4,16.5 L 146.3,14.4 L 147.2,12.3 L 148.2,10.2 L 149.1,8.1 L 150.0,6.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="95.0" cy="110.0" r="5" fill="#1d4ed8"/>
  <text x="100.0" y="205.0" fill="#475569" font-size="11" text-anchor="middle">slope đổi mượt qua x = 1</text>
  <text x="100.0" y="221.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">2 → 2 ✓</text>
  <text x="320.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">dán GÃY (chỉ liên tục)</text>
  <line x1="254.0" y1="150.0" x2="403.0" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar7)"/>
  <line x1="260.0" y1="156.0" x2="260.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar7)"/>
  <text x="395.0" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="268.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="315.0" y1="146.0" x2="315.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="315.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <path d="M 268.2,192.4 L 269.0,190.8 L 269.8,189.2 L 270.6,187.6 L 271.4,186.1 L 272.1,184.5 L 272.9,182.9 L 273.7,181.3 L 274.5,179.8 L 275.3,178.2 L 276.0,176.7 L 276.8,175.2 L 277.6,173.6 L 278.4,172.1 L 279.2,170.6 L 279.9,169.1 L 280.7,167.6 L 281.5,166.2 L 282.3,164.7 L 283.1,163.2 L 283.8,161.8 L 284.6,160.3 L 285.4,158.9 L 286.2,157.4 L 286.9,156.0 L 287.7,154.6 L 288.5,153.2 L 289.3,151.8 L 290.1,150.4 L 290.8,149.0 L 291.6,147.6 L 292.4,146.2 L 293.2,144.9 L 294.0,143.5 L 294.7,142.2 L 295.5,140.8 L 296.3,139.5 L 297.1,138.2 L 297.9,136.9 L 298.6,135.6 L 299.4,134.3 L 300.2,133.0 L 301.0,131.7 L 301.8,130.4 L 302.5,129.2 L 303.3,127.9 L 304.1,126.7 L 304.9,125.4 L 305.6,124.2 L 306.4,123.0 L 307.2,121.7 L 308.0,120.5 L 308.8,119.3 L 309.5,118.1 L 310.3,116.9 L 311.1,115.8 L 311.9,114.6 L 312.7,113.4 L 313.4,112.3 L 314.2,111.1 L 315.0,110.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 315.0,110.0 L 315.6,108.5 L 316.2,107.0 L 316.8,105.5 L 317.4,103.9 L 318.0,102.4 L 318.6,100.9 L 319.2,99.4 L 319.8,97.9 L 320.4,96.4 L 321.0,94.8 L 321.6,93.3 L 322.1,91.8 L 322.7,90.3 L 323.3,88.8 L 323.9,87.2 L 324.5,85.7 L 325.1,84.2 L 325.7,82.7 L 326.3,81.2 L 326.9,79.7 L 327.5,78.1 L 328.1,76.6 L 328.7,75.1 L 329.3,73.6 L 329.9,72.1 L 330.5,70.6 L 331.1,69.1 L 331.7,67.5 L 332.3,66.0 L 332.9,64.5 L 333.5,63.0 L 334.1,61.5 L 334.7,60.0 L 335.3,58.4 L 335.9,56.9 L 336.4,55.4 L 337.0,53.9 L 337.6,52.4 L 338.2,50.9 L 338.8,49.3 L 339.4,47.8 L 340.0,46.3 L 340.6,44.8 L 341.2,43.3 L 341.8,41.8 L 342.4,40.2 L 343.0,38.7 L 343.6,37.2 L 344.2,35.7 L 344.8,34.2 L 345.4,32.7 L 346.0,31.1 L 346.6,29.6 L 347.2,28.1 L 347.8,26.6 L 348.4,25.1 L 349.0,23.6 L 349.6,22.0 L 350.2,20.5 L 350.8,19.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="315.0" cy="110.0" r="5" fill="#1d4ed8"/>
  <text x="320.0" y="205.0" fill="#475569" font-size="11" text-anchor="middle">slope nhảy đột ngột tại x = 1</text>
  <text x="320.0" y="221.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">2 → 3, góc gãy ✗</text>
</svg>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào cần tính đạo hàm một bên?"* Khi hàm chia khúc (đổi công thức qua $a$), có $|\\cdot|$, hoặc tại biên miền. Vd kiểm $|x|$ khả vi tại 0: $f'(0^-) = -1$, $f'(0^+) = +1$ → lệch → không khả vi.
- *"Đạo hàm một bên bằng nhau nhưng hàm gián đoạn — khả vi không?"* Không thể xảy ra: khả vi $\\implies$ liên tục, nên nếu gián đoạn thì đã không khả vi. Phải liên tục trước rồi mới xét hai slope.

⚠ **Lỗi thường gặp — chỉ so hai công thức đạo hàm mà quên kiểm liên tục**. Vd $f(x) = x^2$ nếu $x<1$, $f(x) = 2x$ nếu $x\\ge 1$: hai nhánh có $f'$ lần lượt $2x \\to 2$ và $2$, "bằng nhau", nhưng hàm **gián đoạn** tại 1 ($1 \\neq 2$) → KHÔNG khả vi. Phải kiểm liên tục tại $a$ trước.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$ nếu $x \\le 1$, $f(x) = 2x - 1$ nếu $x > 1$. Khả vi tại $x = 1$ không?
2. Đạo hàm một bên của $f(x) = |x|$ tại 0 là gì?

<details><summary>Đáp án</summary>

1. Liên tục: trái $1^2=1$, phải $2-1=1$ ✓. Slope: trái $2x|_{x=1}=2$, phải $2$. Bằng nhau → **khả vi**, $f'(1)=2$.
2. $f'(0^-) = -1$, $f'(0^+) = +1$ → lệch → không khả vi tại 0.

</details>

### 📝 Tóm tắt mục 6

- Đạo hàm một bên: $f'(a^-), f'(a^+)$ = slope nhìn từ trái/phải.
- Khả vi tại $a \\iff$ **liên tục tại $a$** và $f'(a^-) = f'(a^+)$.
- Luôn kiểm liên tục trước; hai slope bằng nhau chưa đủ nếu hàm gián đoạn.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính đạo hàm của $f(x) = 3x^2 + 1$ bằng định nghĩa.

**Bài 2**: Tính $f'(x)$ của $f(x) = \\cos x$ bằng định nghĩa.

**Bài 3**: Viết PT tiếp tuyến của $y = x^2$ tại điểm $(3, 9)$.

**Bài 4**: $f(x) = |x-2|$. Hỏi $f$ khả vi tại $x = 2$ không?

**Bài 5**: Vận tốc $s(t) = 5t^2$ (m, s). Tìm vận tốc tại $t = 3$.

**Bài 6**: Tính $\\left(\\dfrac{1}{x^2}\\right)'$ bằng định nghĩa.

**Bài 7**: Bằng định nghĩa, tính đạo hàm của $f(x) = x^2 + 3x$ tại $x = 2$, rồi viết phương trình tiếp tuyến tại điểm $(2, f(2))$.

**Bài 8**: $f(x) = \\sqrt[3]{x}$. Dùng bảng slope cát tuyến ($h = 0.001$) tại $x = 0$ để giải thích vì sao $f$ **không** khả vi tại 0.

**Bài 9**: $f(x) = x^2$ nếu $x \\le 1$; $f(x) = ax + b$ nếu $x > 1$. Tìm $a, b$ để $f$ vừa liên tục vừa khả vi tại $x = 1$.

### Lời giải

**Bài 1**: $f(x+h) - f(x) = 3(x+h)^2 + 1 - 3x^2 - 1 = 6xh + 3h^2$. → $f' = \\lim (6x + 3h) = 6x$.

**Bài 2**: $\\cos(x+h) - \\cos x = -2\\sin\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)$. → $f' = \\lim \\left[-\\sin\\!\\left(x+\\frac{h}{2}\\right)\\cdot\\frac{\\sin(h/2)}{h/2}\\right] = -\\sin x$.

**Bài 3**: $f'(x) = 2x \\to f'(3) = 6$. PT: $y = 9 + 6(x-3) = 6x - 9$.

**Bài 4**: $x < 2$: $f = -(x-2)$, $f' = -1$. $x > 2$: $f = x-2$, $f' = 1$. Khác → **không khả vi** tại $x=2$.

**Bài 5**: $v(t) = s'(t) = 10t \\to v(3) = 30$ m/s.

**Bài 6**: Lập tỉ số và quy đồng tử:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\frac{1}{(x+h)^2} - \\frac{1}{x^2}}{h}
= \\lim_{h \\to 0} \\frac{1}{h}\\cdot\\frac{x^2 - (x+h)^2}{x^2(x+h)^2} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{1}{h}\\cdot\\frac{-2xh - h^2}{x^2(x+h)^2}
= \\lim_{h \\to 0} \\frac{-2x - h}{x^2(x+h)^2} = \\frac{-2x}{x^4} = -\\frac{2}{x^3}
\\end{aligned}$$

⟶ $\\left(\\dfrac{1}{x^2}\\right)' = -\\dfrac{2}{x^3}$. (Khớp công thức lũy thừa $(x^{-2})' = -2x^{-3}$ học ở L04.)

**Bài 7**: $f(2) = 4 + 6 = 10$. Tính $f'(2)$ bằng định nghĩa:

$$\\frac{(2+h)^2 + 3(2+h) - 10}{h} = \\frac{4 + 4h + h^2 + 6 + 3h - 10}{h} = \\frac{7h + h^2}{h} = 7 + h \\xrightarrow{h\\to0} 7.$$

Vậy $f'(2) = 7$. PT tiếp tuyến tại $(2, 10)$: $y = 10 + 7(x - 2) = 7x - 4$.

**Bài 8**: $\\frac{f(0+h) - f(0)}{h} = \\frac{\\sqrt[3]{h}}{h} = h^{1/3 - 1} = h^{-2/3} = \\dfrac{1}{h^{2/3}}$.

| $h$       | $\\dfrac{1}{h^{2/3}}$ (slope cát tuyến) |
|-----------|----------------------------------------|
| $0.1$     | $\\approx 4.64$                         |
| $0.001$   | $= 100$                                |
| $0.000001$| $= 10000$                              |

Slope **tăng vô hạn** khi $h \\to 0$ (không hội tụ về số hữu hạn) ⟶ tiếp tuyến thẳng đứng ⟶ $f'(0)$ không tồn tại, dù $\\sqrt[3]{x}$ liên tục tại 0. Đây là kiểu "tiếp tuyến đứng" ở mục 5.

**Bài 9**: *Liên tục tại 1*: nhánh trái $1^2 = 1$, nhánh phải $a\\cdot 1 + b = a + b$ → cần $a + b = 1$. *Khả vi tại 1*: slope trái $= (x^2)'|_{x=1} = 2$, slope phải $= (ax+b)'|_{x=1} = a$ → cần $a = 2$. Thế vào: $b = 1 - a = -1$. Vậy $a = 2, b = -1$ (nhánh phải là $y = 2x - 1$, đúng là tiếp tuyến của $x^2$ tại $x=1$ — trơn khít).

---

## 8. Bài tiếp theo

[Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

## 📝 Tổng kết

1. $f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$ — slope tiếp tuyến = vận tốc tức thời.
2. PT tiếp tuyến tại $(a, f(a))$: $y = f(a) + f'(a)\\cdot(x - a)$.
3. **Khả vi $\\implies$ Liên tục**, không ngược.
4. Hàm $|x|$ liên tục tại 0, **không khả vi** (góc nhọn).
5. Đạo hàm cơ bản: $(x^2)' = 2x$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$, $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.
`;
