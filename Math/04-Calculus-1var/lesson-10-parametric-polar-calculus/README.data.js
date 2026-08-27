// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-10-parametric-polar-calculus/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 (T4) — Giải tích tham số & toạ độ cực

## Mục tiêu

- Làm giải tích trên đường cong cho dưới dạng **tham số** $(x(t), y(t))$: tính độ dốc $\\frac{dy}{dx}$ và **độ dài cung**.
- Làm giải tích trong **toạ độ cực** $r = r(\\theta)$: tính **diện tích** $\\frac{1}{2}\\int r^2\\,d\\theta$ và độ dài cung cực.
- Hiểu vì sao nhiều đường cong (đường tròn, cycloid, cardioid, hoa hồng) *dễ mô tả* bằng tham số/cực hơn bằng $y = f(x)$.

## Kiến thức tiền đề

- [Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/) (độ dài cung $\\int \\sqrt{1+\\left(\\frac{dy}{dx}\\right)^2}\\,dx$).
- [Lesson 09 — Kỹ thuật tính tích phân](../lesson-09-integration-techniques/) (để tính các tích phân nảy sinh).
- Toạ độ cực & dạng lượng giác: [Math/03-Trig-Complex/lesson-06-complex-polar-euler](../../03-Trig-Complex/lesson-06-complex-polar-euler/); conic: [Math/02-Geometry/lesson-06-coordinate-plane-conics](../../02-Geometry/lesson-06-coordinate-plane-conics/).

> 💡 **Vì sao cần bài này?** Không phải đường cong nào cũng là đồ thị $y = f(x)$. Đường tròn fail "test đường thẳng đứng" (mỗi x có 2 y). Quỹ đạo một hạt theo *thời gian*, cánh hoa, hình trái tim... mô tả tự nhiên hơn bằng **tham số** (x, y đều phụ thuộc một biến chạy t) hoặc **toạ độ cực** (khoảng cách r theo góc θ). Bài này đưa đạo hàm/tích phân vào hai ngôn ngữ đó.

> 💡 **Hai "ngôn ngữ mới" trong một câu.** **Tham số (parametric)** = "**vị trí theo thời gian**": có một biến chạy $t$ (như một chiếc đồng hồ tích tắc), và tại mỗi thời điểm điểm vẽ đang ở đâu được cho bởi *cặp* công thức $x(t), y(t)$. **Toạ độ cực (polar)** = "**khoảng cách + góc**": thay vì hỏi "sang phải bao nhiêu, lên bao nhiêu", ta hỏi "lệch khỏi gốc một góc bao nhiêu, rồi cách gốc bao xa". Cả hai đều là cách *gắn nhãn* các điểm trên mặt phẳng — chỉ là dùng "trục đo" khác hệ Descartes $(x, y)$ quen thuộc.

> 📝 **Bản đồ công thức của cả bài** (in ra trước để định hướng):
>
> | | Tham số $(x(t), y(t))$ | Cực $r = r(\\theta)$ |
> |---|---|---|
> | **Độ dốc** | $\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$ | $\\dfrac{dy}{dx} = \\dfrac{r'\\sin\\theta + r\\cos\\theta}{r'\\cos\\theta - r\\sin\\theta}$ |
> | **Độ dài cung** | $\\displaystyle\\int \\sqrt{(x')^2 + (y')^2}\\,dt$ | $\\displaystyle\\int \\sqrt{r^2 + (r')^2}\\,d\\theta$ |
> | **Diện tích** | (dùng công thức cực hoặc Green) | $\\dfrac{1}{2}\\displaystyle\\int r^2\\,d\\theta$ |
>
> Toàn bộ đều là *cùng một phép tính* (Pythagoras cho độ dài, cộng dồn lát mỏng cho diện tích) viết lại theo biến chạy mới. Đừng học vẹt 6 công thức — hiểu **một** ý tưởng (cộng dồn lát mỏng) áp vào hai hệ toạ độ.

---

## 1. Đường cong tham số — độ dốc dy/dx

### 1.1. Tham số là gì — "vị trí theo thời gian"

💡 **Trực giác.** Coi $t$ là *thời gian*; $(x(t), y(t))$ là vị trí một điểm đang vẽ nên đường cong. Hình dung một con kiến bò trên mặt bàn, mỗi giây bạn chụp một bức ảnh ghi lại nó đang ở đâu:

<svg viewBox="0 0 420 175" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường cong tham số: khi t = 0, 1, 2, 3 con kiến ở các điểm (x₀,y₀)…(x₃,y₃); vết đi qua các điểm đó là đường cong">
  <defs><marker id="ar8" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker></defs>
  <path d="M 40.0,120.0 L 42.7,118.2 L 45.9,116.0 L 49.5,113.4 L 53.4,110.4 L 57.7,107.1 L 62.3,103.6 L 67.2,99.9 L 72.3,96.0 L 77.6,92.1 L 83.1,88.1 L 88.8,84.2 L 94.5,80.4 L 100.3,76.7 L 106.1,73.3 L 112.0,70.1 L 117.8,67.2 L 123.5,64.7 L 129.1,62.6 L 134.7,61.0 L 140.0,60.0 L 140.0,60.0 L 145.3,59.6 L 150.6,59.7 L 155.9,60.4 L 161.2,61.5 L 166.6,63.0 L 171.9,64.9 L 177.4,67.0 L 182.8,69.4 L 188.3,71.8 L 193.8,74.4 L 199.3,76.9 L 204.8,79.4 L 210.4,81.8 L 215.9,84.0 L 221.6,86.0 L 227.2,87.7 L 232.9,89.0 L 238.6,89.8 L 244.3,90.2 L 250.0,90.0 L 250.0,90.0 L 255.9,89.2 L 262.1,88.0 L 268.6,86.4 L 275.3,84.3 L 282.1,82.0 L 289.0,79.3 L 296.0,76.4 L 303.0,73.4 L 310.0,70.2 L 316.9,66.9 L 323.6,63.6 L 330.2,60.2 L 336.5,57.0 L 342.5,53.8 L 348.2,50.9 L 353.5,48.1 L 358.4,45.6 L 362.8,43.3 L 366.7,41.5 L 370.0,40.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="40.0" cy="120.0" r="5" fill="#dc2626"/>
  <text x="40.0" y="106.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">t = 0</text>
  <text x="40.0" y="142.0" fill="#475569" font-size="11" text-anchor="middle">(x₀, y₀)</text>
  <circle cx="140.0" cy="60.0" r="5" fill="#dc2626"/>
  <text x="140.0" y="46.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">t = 1</text>
  <text x="140.0" y="82.0" fill="#475569" font-size="11" text-anchor="middle">(x₁, y₁)</text>
  <circle cx="250.0" cy="90.0" r="5" fill="#dc2626"/>
  <text x="250.0" y="76.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">t = 2</text>
  <text x="250.0" y="112.0" fill="#475569" font-size="11" text-anchor="middle">(x₂, y₂)</text>
  <circle cx="370.0" cy="40.0" r="5" fill="#dc2626"/>
  <text x="370.0" y="26.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">t = 3</text>
  <text x="370.0" y="62.0" fill="#475569" font-size="11" text-anchor="middle">(x₃, y₃)</text>
  <line x1="300.0" y1="70.0" x2="330.0" y2="58.0" stroke="#15803d" stroke-width="2" marker-end="url(#ar8)"/>
  <text x="210.0" y="160.0" fill="#475569" font-size="12" text-anchor="middle">đường cong = vết con kiến để lại khi t chạy 0 → 3</text>
</svg>

Một hàm thường $y = f(x)$ chỉ cho biết "ở vị trí $x$ thì độ cao $y$ là bao nhiêu" — nó **không** biết kiến đi nhanh hay chậm, đi tới hay đi lui. Tham số cho biết **nhiều hơn**: cả *hình dạng* đường đi lẫn *cách di chuyển* dọc nó (tốc độ, chiều, thời điểm qua từng điểm).

**Ví dụ: cùng một đường tròn, hai cách bò khác nhau.**

| Tham số hoá | Bò thế nào | $t \\in$ |
|---|---|---|
| $x = \\cos t,\\ y = \\sin t$ | ngược chiều kim đồng hồ, 1 vòng | $[0, 2\\pi]$ |
| $x = \\cos t,\\ y = -\\sin t$ | thuận chiều kim đồng hồ | $[0, 2\\pi]$ |
| $x = \\cos 2t,\\ y = \\sin 2t$ | ngược chiều, **2 vòng** (gấp đôi tốc độ) | $[0, 2\\pi]$ |

Cả ba vẽ ra cùng một vòng tròn, nhưng "lịch trình" khác nhau — đó là thông tin mà $y = f(x)$ vứt đi.

❓ **"Khử $t$ đi để quay về $y = f(x)$ được không?"** Nhiều khi được, nhiều khi không nên. Ví dụ $x = t, y = t^2$ khử $t$ ra $y = x^2$ (dễ). Nhưng cycloid $x = t - \\sin t,\\ y = 1 - \\cos t$ **không** giải được $t$ theo $x$ bằng công thức sơ cấp → buộc phải làm việc trực tiếp với $t$. Đó là lý do ta học giải tích *trên tham số*, không chỉ "khử rồi tính như cũ".

### 1.2. Công thức độ dốc dy/dx

Vận tốc ngang $\\frac{dx}{dt}$, vận tốc dọc $\\frac{dy}{dt}$. Độ dốc đường đi (hình học) = "dọc chia ngang":

$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} \\quad (dx/dt \\neq 0)$$

💡 **Vì sao công thức này đúng (không phải phép thần kỳ)?** Áp dụng quy tắc dây chuyền (chain rule, [Lesson 03](../lesson-03-derivatives-rules/)): nếu $y$ phụ thuộc $x$ và $x$ phụ thuộc $t$ thì $\\frac{dy}{dt} = \\frac{dy}{dx}\\cdot\\frac{dx}{dt}$. Chia hai vế cho $\\frac{dx}{dt}$ (khác 0) được ngay $\\frac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$. Hai vi phân $dt$ "triệt tiêu" về mặt trực giác — nhưng cái đứng sau là chain rule chặt chẽ.

### 1.3. Walk-through từng bước — 4 ví dụ tính dy/dx

**Ví dụ 1 — đường tròn $x = \\cos t,\\ y = \\sin t$.**

$$\\begin{aligned}
\\frac{dx}{dt} &= -\\sin t, \\qquad \\frac{dy}{dt} = \\cos t \\\\
\\frac{dy}{dx} &= \\frac{\\cos t}{-\\sin t} = -\\cot t
\\end{aligned}$$

Tại $t = \\frac{\\pi}{4}$: $\\frac{dy}{dx} = -\\cot\\frac{\\pi}{4} = -1$ (tiếp tuyến nghiêng $-45^\\circ$). *Kiểm chứng hình học:* điểm là $(\\tfrac{\\sqrt2}{2}, \\tfrac{\\sqrt2}{2})$ ở góc trên-phải; bán kính hướng $+45^\\circ$, tiếp tuyến vuông góc bán kính nên nghiêng $-45^\\circ$ ✓.

**Ví dụ 2 — parabola $x = t,\\ y = t^2$.**

$$\\frac{dx}{dt} = 1, \\qquad \\frac{dy}{dt} = 2t \\quad\\Rightarrow\\quad \\frac{dy}{dx} = \\frac{2t}{1} = 2t = 2x.$$

Khớp đúng đạo hàm của $y = x^2$ (bằng $2x$) — vì ở đây $x = t$ nên $2t = 2x$ ✓.

**Ví dụ 3 — ellipse $x = 2\\cos t,\\ y = \\sin t$.**

$$\\frac{dx}{dt} = -2\\sin t, \\qquad \\frac{dy}{dt} = \\cos t \\quad\\Rightarrow\\quad \\frac{dy}{dx} = \\frac{\\cos t}{-2\\sin t}.$$

Tại $t = \\frac{\\pi}{2}$ (đỉnh trên $(0,1)$): tử $\\cos\\frac{\\pi}{2}=0$ → $\\frac{dy}{dx} = 0$ (tiếp tuyến ngang ✓). Tại $t = 0$ (điểm $(2,0)$): mẫu $-2\\sin 0 = 0$ → $\\frac{dy}{dx}$ **không xác định**, tiếp tuyến *thẳng đứng* (đúng — ở mép phải ellipse tiếp tuyến dựng đứng).

**Ví dụ 4 — cycloid $x = t - \\sin t,\\ y = 1 - \\cos t$.** Đây là vết một điểm trên vành bánh xe bán kính 1 khi bánh lăn không trượt trên mặt đất:

<svg viewBox="0 0 560 250" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường cycloid x = t − sin t, y = 1 − cos t: các vòm cao 2, đỉnh tại t = π, chạm đất tạo điểm nhọn (cusp) tại t = 0, 2π, 4π">
  <defs><marker id="ar9" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="193.4" y1="200.0" x2="193.4" y2="132.4"/>
<line x1="356.7" y1="200.0" x2="356.7" y2="132.4"/>
<line x1="520.1" y1="200.0" x2="520.1" y2="132.4"/>
<line x1="30.0" y1="148.0" x2="537.0" y2="148.0"/>
</g>
  <line x1="24.0" y1="200.0" x2="559.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
  <line x1="30.0" y1="206.0" x2="30.0" y2="110.4" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
  <text x="551.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="38.0" y="120.4" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="193.4" y1="196.0" x2="193.4" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.4" y="216.0" fill="#475569" font-size="11" text-anchor="middle">2π</text>
  <line x1="356.7" y1="196.0" x2="356.7" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="356.7" y="216.0" fill="#475569" font-size="11" text-anchor="middle">4π</text>
  <line x1="520.1" y1="196.0" x2="520.1" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="520.1" y="216.0" fill="#475569" font-size="11" text-anchor="middle">6π</text>
  <line x1="26.0" y1="148.0" x2="34.0" y2="148.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="23.0" y="152.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <path d="M 30.0,200.0 L 30.0,199.9 L 30.0,199.8 L 30.0,199.5 L 30.1,199.2 L 30.1,198.7 L 30.2,198.2 L 30.4,197.5 L 30.5,196.8 L 30.8,196.0 L 31.1,195.0 L 31.4,194.0 L 31.8,193.0 L 32.3,191.8 L 32.8,190.6 L 33.5,189.3 L 34.2,187.9 L 35.0,186.5 L 35.9,185.1 L 36.9,183.6 L 37.9,182.0 L 39.1,180.5 L 40.4,178.9 L 41.8,177.3 L 43.3,175.6 L 44.8,174.0 L 46.5,172.4 L 48.3,170.7 L 50.2,169.1 L 52.2,167.5 L 54.3,166.0 L 56.5,164.4 L 58.8,162.9 L 61.1,161.5 L 63.6,160.1 L 66.1,158.7 L 68.8,157.4 L 71.5,156.2 L 74.3,155.0 L 77.1,154.0 L 80.1,153.0 L 83.0,152.0 L 86.1,151.2 L 89.2,150.5 L 92.3,149.8 L 95.5,149.3 L 98.7,148.8 L 101.9,148.5 L 105.2,148.2 L 108.4,148.1 L 111.7,148.0 L 114.9,148.1 L 118.2,148.2 L 121.5,148.5 L 124.7,148.8 L 127.9,149.3 L 131.1,149.8 L 134.2,150.5 L 137.3,151.2 L 140.3,152.0 L 143.3,153.0 L 146.2,154.0 L 149.1,155.0 L 151.9,156.2 L 154.6,157.4 L 157.2,158.7 L 159.8,160.1 L 162.2,161.5 L 164.6,162.9 L 166.9,164.4 L 169.1,166.0 L 171.2,167.5 L 173.2,169.1 L 175.0,170.7 L 176.8,172.4 L 178.5,174.0 L 180.1,175.6 L 181.6,177.3 L 183.0,178.9 L 184.2,180.5 L 185.4,182.0 L 186.5,183.6 L 187.5,185.1 L 188.4,186.5 L 189.2,187.9 L 189.9,189.3 L 190.5,190.6 L 191.1,191.8 L 191.6,193.0 L 192.0,194.0 L 192.3,195.0 L 192.6,196.0 L 192.8,196.8 L 193.0,197.5 L 193.1,198.2 L 193.2,198.7 L 193.3,199.2 L 193.3,199.5 L 193.4,199.8 L 193.4,199.9 L 193.4,200.0 L 193.4,199.9 L 193.4,199.8 L 193.4,199.5 L 193.4,199.2 L 193.5,198.7 L 193.6,198.2 L 193.7,197.5 L 193.9,196.8 L 194.1,196.0 L 194.4,195.0 L 194.8,194.0 L 195.2,193.0 L 195.6,191.8 L 196.2,190.6 L 196.8,189.3 L 197.5,187.9 L 198.4,186.5 L 199.2,185.1 L 200.2,183.6 L 201.3,182.0 L 202.5,180.5 L 203.8,178.9 L 205.1,177.3 L 206.6,175.6 L 208.2,174.0 L 209.9,172.4 L 211.7,170.7 L 213.6,169.1 L 215.6,167.5 L 217.6,166.0 L 219.8,164.4 L 222.1,162.9 L 224.5,161.5 L 227.0,160.1 L 229.5,158.7 L 232.1,157.4 L 234.9,156.2 L 237.6,155.0 L 240.5,154.0 L 243.4,153.0 L 246.4,152.0 L 249.4,151.2 L 252.5,150.5 L 255.7,149.8 L 258.8,149.3 L 262.0,148.8 L 265.3,148.5 L 268.5,148.2 L 271.8,148.1 L 275.0,148.0 L 278.3,148.1 L 281.6,148.2 L 284.8,148.5 L 288.0,148.8 L 291.2,149.3 L 294.4,149.8 L 297.5,150.5 L 300.6,151.2 L 303.7,152.0 L 306.7,153.0 L 309.6,154.0 L 312.4,155.0 L 315.2,156.2 L 317.9,157.4 L 320.6,158.7 L 323.1,160.1 L 325.6,161.5 L 328.0,162.9 L 330.3,164.4 L 332.4,166.0 L 334.5,167.5 L 336.5,169.1 L 338.4,170.7 L 340.2,172.4 L 341.9,174.0 L 343.5,175.6 L 344.9,177.3 L 346.3,178.9 L 347.6,180.5 L 348.8,182.0 L 349.9,183.6 L 350.8,185.1 L 351.7,186.5 L 352.5,187.9 L 353.3,189.3 L 353.9,190.6 L 354.4,191.8 L 354.9,193.0 L 355.3,194.0 L 355.7,195.0 L 356.0,196.0 L 356.2,196.8 L 356.4,197.5 L 356.5,198.2 L 356.6,198.7 L 356.7,199.2 L 356.7,199.5 L 356.7,199.8 L 356.7,199.9 L 356.7,200.0 L 356.7,199.9 L 356.7,199.8 L 356.8,199.5 L 356.8,199.2 L 356.9,198.7 L 357.0,198.2 L 357.1,197.5 L 357.3,196.8 L 357.5,196.0 L 357.8,195.0 L 358.1,194.0 L 358.5,193.0 L 359.0,191.8 L 359.6,190.6 L 360.2,189.3 L 360.9,187.9 L 361.7,186.5 L 362.6,185.1 L 363.6,183.6 L 364.7,182.0 L 365.8,180.5 L 367.1,178.9 L 368.5,177.3 L 370.0,175.6 L 371.6,174.0 L 373.3,172.4 L 375.0,170.7 L 376.9,169.1 L 378.9,167.5 L 381.0,166.0 L 383.2,164.4 L 385.5,162.9 L 387.9,161.5 L 390.3,160.1 L 392.9,158.7 L 395.5,157.4 L 398.2,156.2 L 401.0,155.0 L 403.9,154.0 L 406.8,153.0 L 409.8,152.0 L 412.8,151.2 L 415.9,150.5 L 419.0,149.8 L 422.2,149.3 L 425.4,148.8 L 428.6,148.5 L 431.9,148.2 L 435.1,148.1 L 438.4,148.0 L 441.7,148.1 L 444.9,148.2 L 448.2,148.5 L 451.4,148.8 L 454.6,149.3 L 457.8,149.8 L 460.9,150.5 L 464.0,151.2 L 467.0,152.0 L 470.0,153.0 L 472.9,154.0 L 475.8,155.0 L 478.6,156.2 L 481.3,157.4 L 483.9,158.7 L 486.5,160.1 L 489.0,161.5 L 491.3,162.9 L 493.6,164.4 L 495.8,166.0 L 497.9,167.5 L 499.9,169.1 L 501.8,170.7 L 503.6,172.4 L 505.2,174.0 L 506.8,175.6 L 508.3,177.3 L 509.7,178.9 L 511.0,180.5 L 512.1,182.0 L 513.2,183.6 L 514.2,185.1 L 515.1,186.5 L 515.9,187.9 L 516.6,189.3 L 517.3,190.6 L 517.8,191.8 L 518.3,193.0 L 518.7,194.0 L 519.0,195.0 L 519.3,196.0 L 519.5,196.8 L 519.7,197.5 L 519.9,198.2 L 520.0,198.7 L 520.0,199.2 L 520.1,199.5 L 520.1,199.8 L 520.1,199.9 L 520.1,200.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="30.0" cy="200.0" r="4" fill="#dc2626"/>
  <circle cx="193.4" cy="200.0" r="4" fill="#dc2626"/>
  <circle cx="356.7" cy="200.0" r="4" fill="#dc2626"/>
  <circle cx="520.1" cy="200.0" r="4" fill="#dc2626"/>
  <text x="30.0" y="230.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">t = 0</text>
  <text x="193.4" y="230.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">t = 2π (cusp)</text>
  <text x="356.7" y="230.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">t = 4π (cusp)</text>
  <circle cx="111.7" cy="148.0" r="4" fill="#15803d"/>
  <text x="111.7" y="138.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">đỉnh (t = π)</text>
  <text x="368.0" y="137.6" fill="#475569" font-size="11" text-anchor="middle">các vòm cycloid — điểm chạm đất = điểm nhọn</text>
</svg>

$$\\frac{dx}{dt} = 1 - \\cos t, \\qquad \\frac{dy}{dt} = \\sin t \\quad\\Rightarrow\\quad \\frac{dy}{dx} = \\frac{\\sin t}{1 - \\cos t}.$$

Tại $t = \\pi$ (đỉnh vòm): $\\frac{\\sin\\pi}{1-\\cos\\pi} = \\frac{0}{2} = 0$ (đỉnh phẳng ✓). Tại $t \\to 0^+$ (điểm bánh xe chạm đất): cả tử lẫn mẫu $\\to 0$, dạng $\\frac{0}{0}$; dùng L'Hôpital hoặc khai triển cho $\\frac{dy}{dx} \\to +\\infty$ — tiếp tuyến dựng đứng (cusp, điểm nhọn nơi vành bánh chạm đất).

### 1.4. Đạo hàm bậc hai — vì sao KHÔNG chia thẳng

Để biết đường cong **lõm lên hay lõm xuống** ta cần $\\frac{d^2y}{dx^2}$. Công thức đúng:

$$\\frac{d^2y}{dx^2} = \\frac{\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}$$

**Walk-through** với $x = t,\\ y = t^2$ (đã biết $\\frac{dy}{dx} = 2t$):
- $\\frac{d}{dt}\\left(2t\\right) = 2$; $\\frac{dx}{dt} = 1$ → $\\frac{d^2y}{dx^2} = \\frac{2}{1} = 2$. Khớp đạo hàm bậc hai của $y = x^2$ ($= 2$) ✓.

> ⚠ **Lỗi thường gặp.** $\\frac{d^2y}{dx^2} \\neq \\dfrac{d^2y/dt^2}{d^2x/dt^2}$. **Phản ví dụ** với $x=t, y=t^2$: cách sai cho $\\frac{d^2y/dt^2}{d^2x/dt^2} = \\frac{2}{0}$ (vô nghĩa, vì $d^2x/dt^2 = 0$), trong khi đáp số đúng là $2$. Đạo hàm bậc hai phải lấy $\\frac{d}{dt}$ của *độ dốc $\\frac{dy}{dx}$* rồi mới chia $\\frac{dx}{dt}$ — không bao giờ chia thẳng hai đạo hàm bậc hai.

> ⚠ **Lỗi thường gặp 2.** Chỉ được dùng $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$ ở **đạo hàm bậc một**, và phải kiểm tra $\\frac{dx}{dt} \\neq 0$. Khi $\\frac{dx}{dt} = 0$ mà $\\frac{dy}{dt} \\neq 0$ → tiếp tuyến *thẳng đứng* (độ dốc $\\to\\infty$), không phải "không có tiếp tuyến".

> 🔁 **Dừng lại tự kiểm tra.** Đường cong $x = t^3, y = t^2$. Tính $\\frac{dy}{dx}$ tại $t = 1$.
> <details><summary>Đáp án</summary>$\\frac{dx}{dt} = 3t^2$, $\\frac{dy}{dt} = 2t$ $\\Rightarrow \\frac{dy}{dx} = \\frac{2t}{3t^2} = \\frac{2}{3t}$. Tại $t=1$: $\\frac{2}{3}$.</details>

> 🔁 **Dừng lại tự kiểm tra 2.** Với $x = t^2,\\ y = t^3$, tìm các điểm có tiếp tuyến *thẳng đứng*.
> <details><summary>Đáp án</summary>Tiếp tuyến đứng khi $\\frac{dx}{dt} = 0$ và $\\frac{dy}{dt} \\neq 0$. $\\frac{dx}{dt} = 2t = 0 \\Rightarrow t = 0$; tại đó $\\frac{dy}{dt} = 3t^2 = 0$ → **cả hai bằng 0** (dạng $0/0$), nên đây là điểm nhọn (cusp) tại gốc, không phải tiếp tuyến đứng đơn thuần. Đường cong này không có tiếp tuyến đứng "sạch" nào.</details>

> 📝 **Tóm tắt mục 1.** $\\frac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$ (với $dx/dt \\neq 0$) — coi $t$ là thời gian, đây là độ dốc *hình học* của đường đi, suy ra từ chain rule. $\\frac{dx}{dt}=0,\\ \\frac{dy}{dt}\\neq0$ → tiếp tuyến đứng. Đạo hàm bậc hai **không** chia trực tiếp $\\frac{d^2y/dt^2}{d^2x/dt^2}$ mà phải lấy $\\frac{d}{dt}(\\frac{dy}{dx}) \\div \\frac{dx}{dt}$.

---

## 2. Độ dài cung của đường cong tham số

### 2.1. Công thức và vì sao là Pythagoras

💡 **Trực giác.** Quãng đường = tốc độ $\\times$ thời gian, cộng dồn. Trong một khoảnh khắc $dt$, điểm dịch ngang $dx = \\frac{dx}{dt}\\,dt$ và dịch dọc $dy = \\frac{dy}{dt}\\,dt$. Hai dịch chuyển này **vuông góc** nên đoạn đường đi được $ds$ là cạnh huyền của tam giác vuông nhỏ:

<svg viewBox="0 0 500 210" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông vi phân: cạnh ngang dx = (dx/dt)dt, cạnh đứng dy = (dy/dt)dt, cạnh huyền ds">
  <defs><marker id="ar10" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="110.0" y1="150.0" x2="290.0" y2="150.0" stroke="#15803d" stroke-width="2.5"/>
  <line x1="290.0" y1="150.0" x2="290.0" y2="40.0" stroke="#15803d" stroke-width="2.5"/>
  <line x1="110.0" y1="150.0" x2="290.0" y2="40.0" stroke="#dc2626" stroke-width="2.5"/>
  <circle cx="110.0" cy="150.0" r="4" fill="#dc2626"/>
  <circle cx="290.0" cy="40.0" r="4" fill="#dc2626"/>
  <rect x="278.0" y="138.0" width="12.0" height="12.0" rx="0" fill="none" fill-opacity="1" stroke="#475569" stroke-width="1"/>
  <text x="200.0" y="170.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">dx = (dx/dt) dt</text>
  <text x="298.0" y="99.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">dy = (dy/dt) dt</text>
  <text x="188.0" y="87.0" fill="#dc2626" font-size="15" text-anchor="end" font-weight="700" font-style="italic">ds</text>
  <text x="250.0" y="195.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">ds = √(dx² + dy²) = √((dx/dt)² + (dy/dt)²) · dt</text>
</svg>

Tốc độ tức thời (độ dài $ds$ chia $dt$) chính là $\\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}$. Cộng dồn (tích phân) từ $t=\\alpha$ tới $t=\\beta$:

$$L = \\int_{\\alpha}^{\\beta} \\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2 + \\left(\\tfrac{dy}{dt}\\right)^2}\\,dt$$

💡 **Liên hệ công thức cũ.** Khi đường cong là đồ thị thường $y = f(x)$, ta tham số hoá tầm thường $x = t,\\ y = f(t)$: khi đó $\\frac{dx}{dt} = 1$, $\\frac{dy}{dt} = f'(t)$, và công thức trở về đúng $L = \\int\\sqrt{1 + (f'(x))^2}\\,dx$ đã học ở [Lesson 08](../lesson-08-integral-applications/). Công thức tham số là **bản tổng quát** của nó.

### 2.2. Walk-through từng bước — 4 ví dụ verify

**Ví dụ số cụ thể (verify):**

1. **Đường tròn đơn vị** $x=\\cos t, y=\\sin t$, $t\\in[0,2\\pi]$: $x'=-\\sin t, y'=\\cos t$, $\\sqrt{\\sin^2+\\cos^2}=1$. $\\Rightarrow L = \\int_0^{2\\pi}1\\,dt = 2\\pi \\approx 6.283$ — đúng chu vi ✓.
2. **Cycloid** $x=t-\\sin t, y=1-\\cos t$, $t\\in[0,2\\pi]$ (vết một điểm trên vành bánh xe lăn một vòng). Đây là ví dụ đáng làm chậm từng bước:
   $$\\begin{aligned}
   x' &= 1-\\cos t, \\qquad y' = \\sin t \\\\
   (x')^2 + (y')^2 &= (1-\\cos t)^2 + \\sin^2 t \\\\
   &= 1 - 2\\cos t + \\cos^2 t + \\sin^2 t \\\\
   &= 2 - 2\\cos t \\qquad (\\text{vì } \\cos^2 + \\sin^2 = 1) \\\\
   &= 4\\sin^2\\!\\tfrac{t}{2} \\qquad (\\text{công thức hạ bậc } 1-\\cos t = 2\\sin^2\\tfrac{t}{2}) \\\\
   L &= \\int_0^{2\\pi} 2\\left|\\sin\\tfrac{t}{2}\\right|\\,dt = 2\\Big[-2\\cos\\tfrac{t}{2}\\Big]_0^{2\\pi} = 2\\big(2 + 2\\big) = 8.
   \\end{aligned}$$
   Kết quả kinh điển: vành bánh bán kính $1$ lăn một vòng (đi ngang $2\\pi \\approx 6.28$) nhưng vết điểm dài đúng **8** — *không dính $\\pi$* ✓.
3. **Đoạn thẳng** $x=3t, y=4t$, $t\\in[0,1]$: $x' = 3, y' = 4$, $\\sqrt{9+16}=5$ $\\Rightarrow L = \\int_0^1 5\\,dt = 5$ (đúng khoảng cách từ $(0,0)$ tới $(3,4)$ = $\\sqrt{3^2+4^2}$) ✓.
4. **Ellipse** $x=2\\cos t, y=\\sin t$: $x' = -2\\sin t,\\ y' = \\cos t$, $L = \\int_0^{2\\pi}\\sqrt{4\\sin^2 t+\\cos^2 t}\\,dt \\approx 9.6884$ — **không có công thức sơ cấp** (tích phân elliptic — chính nó *đặt tên* cho cả họ tích phân này), phải tính số.

### 2.3. Tích phân độ dài "thật ra" làm gì — xấp xỉ bằng số cụ thể

💡 Tích phân $\\int\\sqrt{x'^2+y'^2}\\,dt$ trông trừu tượng, nhưng cốt lõi chỉ là **chia đường thành nhiều đoạn thẳng nhỏ rồi cộng độ dài**. Làm thử với ¼ đường tròn $x=\\cos t, y=\\sin t$, $t\\in[0, \\frac{\\pi}{2}]$ (đáp số đúng $= \\frac{\\pi}{2} \\approx 1.5708$), chia thành $n = 4$ đoạn, mỗi đoạn $\\Delta t = \\frac{\\pi}{8} \\approx 0.3927$:

| $t$ | $(x, y) = (\\cos t, \\sin t)$ |
|---|---|
| $0$ | $(1.000,\\ 0.000)$ |
| $\\pi/8$ | $(0.924,\\ 0.383)$ |
| $\\pi/4$ | $(0.707,\\ 0.707)$ |
| $3\\pi/8$ | $(0.383,\\ 0.924)$ |
| $\\pi/2$ | $(0.000,\\ 1.000)$ |

Cộng độ dài 4 đoạn thẳng nối các điểm liên tiếp (mỗi đoạn $\\sqrt{\\Delta x^2 + \\Delta y^2}$):
- Đoạn 1: $\\sqrt{(0.924-1)^2 + (0.383-0)^2} = \\sqrt{0.0058 + 0.1466} \\approx 0.3902$.
- Bốn đoạn đối xứng nên xấp xỉ bằng nhau, tổng $\\approx 4 \\times 0.3902 = 1.5607$.

So với đáp số đúng $1.5708$: sai số chỉ $\\approx 0.6\\%$ với **chỉ 4 đoạn** — chia nhỏ hơn (tăng $n$) thì tổng tiến tới đúng giá trị tích phân. Đó chính là ý nghĩa của dấu $\\int$: giới hạn của tổng các đoạn thẳng nhỏ khi $\\Delta t \\to 0$. (Đây là *toy version* — phần mềm thật dùng quy tắc Simpson/Gauss để hội tụ nhanh hơn nhiều.)

> ❓ **"Vì sao cycloid lại đúng bằng 8 mà không dính π?"** Vì $\\sqrt{2-2\\cos t}$ rút gọn được thành $2|\\sin(t/2)|$ nhờ công thức hạ bậc (xem [Trig L3](../../03-Trig-Complex/lesson-03-trig-identities/)) — tích phân ra số nguyên. Còn ellipse thì căn không rút gọn được → kẹt ở tích phân elliptic.

> ⚠ **Lỗi thường gặp.** Khi rút gọn căn phải **giữ trị tuyệt đối**: $\\sqrt{4\\sin^2(t/2)} = 2|\\sin(t/2)|$, không phải $2\\sin(t/2)$. Trên $t\\in[0,2\\pi]$ thì $\\sin(t/2)\\ge0$ nên bỏ được, nhưng trên khoảng khác $\\sin(t/2)$ có thể âm → bỏ dấu trị tuyệt đối làm độ dài ra âm/sai.

> 🔁 **Dừng lại tự kiểm tra.** Độ dài đoạn $x = 3t, y = 4t$ với $t\\in[0,2]$.
> <details><summary>Đáp án</summary>$x'=3, y'=4$, $\\sqrt{9+16}=5$ $\\Rightarrow L = \\int_0^2 5\\,dt = 10$. Khớp khoảng cách hình học: điểm đi từ $(0,0)$ tới $(6,8)$, $\\sqrt{6^2+8^2}=10$ ✓.</details>

> 📝 **Tóm tắt mục 2.** $L = \\int_\\alpha^\\beta \\sqrt{(x')^2 + (y')^2}\\,dt$ — Pythagoras cho vận tốc, cộng dồn theo thời gian. Cycloid $L = 8$ (không dính $\\pi$); ellipse → tích phân elliptic, phải tính số.

---

## 3. Toạ độ cực — mô tả bằng (r, θ)

### 3.1. Hệ toạ độ cực là gì — "khoảng cách + góc"

💡 **Trực giác.** Thay vì "sang phải $x$, lên $y$" (Descartes), toạ độ cực nói "**quay một góc $\\theta$, rồi đi xa gốc một đoạn $r$**". Giống cách bạn chỉ đường: "*xoay người về hướng $30^\\circ$, đi tới $5$ mét*". $\\theta$ đo từ **trục dương Ox**, ngược chiều kim đồng hồ là dương.

<svg viewBox="0 0 400 225" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tọa độ cực: điểm P cách gốc O khoảng r, góc θ so với trục x; x = r cos θ, y = r sin θ">
  <defs><marker id="ar11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
</g>
  <line x1="54.0" y1="190.0" x2="298.0" y2="190.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <line x1="60.0" y1="196.0" x2="60.0" y2="12.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <text x="290.0" y="206.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="60.0" y1="190.0" x2="201.8" y2="79.2" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="201.8" cy="79.2" r="5" fill="#dc2626"/>
  <text x="211.8" y="75.2" fill="#dc2626" font-size="13" text-anchor="start" font-weight="700">P = (r, θ)</text>
  <line x1="201.8" y1="79.2" x2="201.8" y2="190.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="201.8" y1="79.2" x2="60.0" y2="79.2" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="120.9" y="126.6" fill="#1d4ed8" font-size="14" text-anchor="end" font-weight="700" font-style="italic">r</text>
  <path d="M 100.0,190.0 A 40,40 0 0 0 91.5,165.4" fill="none" stroke="#dc2626" stroke-width="2"/>
  <text x="108.0" y="180.0" fill="#dc2626" font-size="13" text-anchor="start" font-style="italic">θ</text>
  <text x="201.8" y="220.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">x = r·cos θ</text>
  <text x="52.0" y="83.2" fill="#15803d" font-size="12" text-anchor="end" font-weight="700">y = r·sin θ</text>
  <text x="52.0" y="206.0" fill="#475569" font-size="12" text-anchor="end">O</text>
</svg>

Liên hệ hai hệ — học thuộc *bốn* công thức này (chúng dùng đi dùng lại cả bài):

$$\\underbrace{x = r\\cos\\theta, \\quad y = r\\sin\\theta}_{\\text{cực} \\to \\text{Descartes}}, \\qquad \\underbrace{r = \\sqrt{x^2+y^2},\\ \\ \\theta = \\operatorname{atan2}(y, x)}_{\\text{Descartes} \\to \\text{cực}}$$

❓ **"Tại sao là $\\operatorname{atan2}(y,x)$ chứ không phải $\\arctan(y/x)$?"** Vì $\\arctan(y/x)$ chỉ cho góc trong $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ — nó **không phân biệt** được phần tư II/III với IV/I (cùng tỉ số $y/x$). Ví dụ $(1,1)$ và $(-1,-1)$ đều có $y/x = 1$ nhưng nằm ở hai phía đối nhau. Hàm $\\operatorname{atan2}(y,x)$ nhìn dấu của *cả* $x$ lẫn $y$ để trả đúng phần tư. Tính tay thì: tính $\\arctan|y/x|$ rồi chỉnh theo phần tư (bảng ở mục 3.2).

### 3.2. Walk-through đổi toạ độ — 4 ví dụ mỗi chiều

**Chiều cực → Descartes** (luôn dễ, chỉ thay số):

1. $(r,\\theta) = (2, \\frac{\\pi}{3})$: $x = 2\\cos\\frac{\\pi}{3} = 2\\cdot\\frac12 = 1$; $y = 2\\sin\\frac{\\pi}{3} = 2\\cdot\\frac{\\sqrt3}{2} = \\sqrt3$. → $(1, \\sqrt3)$.
2. $(r,\\theta) = (4, \\pi)$: $x = 4\\cos\\pi = -4$; $y = 4\\sin\\pi = 0$. → $(-4, 0)$ (nằm trên trục Ox âm).
3. $(r,\\theta) = (1, \\frac{3\\pi}{4})$: $x = \\cos\\frac{3\\pi}{4} = -\\frac{\\sqrt2}{2}$; $y = \\sin\\frac{3\\pi}{4} = \\frac{\\sqrt2}{2}$. → $(-\\frac{\\sqrt2}{2}, \\frac{\\sqrt2}{2})$ (phần tư II).
4. $(r,\\theta) = (3, -\\frac{\\pi}{2})$: $x = 3\\cos(-\\frac{\\pi}{2}) = 0$; $y = 3\\sin(-\\frac{\\pi}{2}) = -3$. → $(0, -3)$ (trục Oy âm).

**Chiều Descartes → cực** (cần cẩn thận phần tư — đây là chỗ hay sai):

1. $(x,y) = (1, \\sqrt3)$: $r = \\sqrt{1 + 3} = 2$; điểm ở phần tư I, $\\theta = \\arctan\\frac{\\sqrt3}{1} = \\frac{\\pi}{3}$. → $(2, \\frac{\\pi}{3})$ (ngược lại ví dụ 1 ở trên ✓).
2. $(x,y) = (-1, 1)$: $r = \\sqrt{1+1} = \\sqrt2$; phần tư **II** ($x<0, y>0$). $\\arctan\\frac{1}{1} = \\frac{\\pi}{4}$, nhưng ở phần tư II nên $\\theta = \\pi - \\frac{\\pi}{4} = \\frac{3\\pi}{4}$. → $(\\sqrt2, \\frac{3\\pi}{4})$.
3. $(x,y) = (-1, -\\sqrt3)$: $r = \\sqrt{1+3} = 2$; phần tư **III** ($x<0, y<0$). Góc tham chiếu $\\arctan\\frac{\\sqrt3}{1} = \\frac{\\pi}{3}$, ở phần tư III nên $\\theta = \\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}$. → $(2, \\frac{4\\pi}{3})$.
4. $(x,y) = (0, -5)$: $r = 5$; nằm trên trục Oy âm → $\\theta = -\\frac{\\pi}{2}$ (hoặc $\\frac{3\\pi}{2}$). → $(5, -\\frac{\\pi}{2})$.

**Bảng chỉnh góc theo phần tư** (sau khi tính góc tham chiếu $\\alpha = \\arctan\\left|\\frac{y}{x}\\right|$):

| Phần tư | Dấu $(x, y)$ | $\\theta$ = |
|---|---|---|
| I | $(+, +)$ | $\\alpha$ |
| II | $(-, +)$ | $\\pi - \\alpha$ |
| III | $(-, -)$ | $\\pi + \\alpha$ |
| IV | $(+, -)$ | $-\\alpha$ (hoặc $2\\pi - \\alpha$) |

### 3.3. Vài đồ thị cực kinh điển

**Ví dụ số cụ thể (4 cái):**

1. $r = 2$ (hằng): mọi điểm cách gốc 2 → **đường tròn** bán kính 2.
2. $\\theta = \\frac{\\pi}{4}$ (hằng): mọi điểm cùng góc → **tia** nghiêng 45°.
3. $r = 1 + \\cos\\theta$: **cardioid** (hình trái tim) — $\\theta=0 \\to r=2$, $\\theta=\\frac{\\pi}{2}\\to r=1$, $\\theta=\\pi \\to r=0$, $\\theta = \\frac{3\\pi}{2}\\to r=1$.
4. $r = \\cos(2\\theta)$: **hoa hồng 4 cánh** — $r$ dao động dương/âm tạo các cánh.

Ba đồ thị tiêu biểu (nhìn để có hình dung trước khi tính diện tích ở mục 4):

<svg viewBox="0 0 570 215" style="max-width:570px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba đường cong cực tiêu biểu: đường tròn r = 2, cardioid r = 1 + cos θ (hình trái tim nằm ngang), hoa hồng 4 cánh r = cos 2θ">
  <defs><marker id="ar12" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="95.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">r = 2 (đường tròn)</text>
  <line x1="15.0" y1="105.0" x2="175.0" y2="105.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="95.0" y1="35.0" x2="95.0" y2="175.0" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="95.0" cy="105.0" r="3" fill="#1a202c"/>
  <path d="M 155.0,105.0 L 155.0,103.4 L 154.9,101.9 L 154.8,100.3 L 154.7,98.7 L 154.5,97.2 L 154.3,95.6 L 154.0,94.1 L 153.7,92.5 L 153.3,91.0 L 153.0,89.5 L 152.5,88.0 L 152.1,86.5 L 151.6,85.0 L 151.0,83.5 L 150.4,82.0 L 149.8,80.6 L 149.2,79.2 L 148.5,77.8 L 147.7,76.4 L 147.0,75.0 L 146.2,73.7 L 145.3,72.3 L 144.4,71.0 L 143.5,69.7 L 142.6,68.5 L 141.6,67.2 L 140.6,66.0 L 139.6,64.9 L 138.5,63.7 L 137.4,62.6 L 136.3,61.5 L 135.1,60.4 L 134.0,59.4 L 132.8,58.4 L 131.5,57.4 L 130.3,56.5 L 129.0,55.6 L 127.7,54.7 L 126.3,53.8 L 125.0,53.0 L 123.6,52.3 L 122.2,51.5 L 120.8,50.8 L 119.4,50.2 L 118.0,49.6 L 116.5,49.0 L 115.0,48.4 L 113.5,47.9 L 112.0,47.5 L 110.5,47.0 L 109.0,46.7 L 107.5,46.3 L 105.9,46.0 L 104.4,45.7 L 102.8,45.5 L 101.3,45.3 L 99.7,45.2 L 98.1,45.1 L 96.6,45.0 L 95.0,45.0 L 93.4,45.0 L 91.9,45.1 L 90.3,45.2 L 88.7,45.3 L 87.2,45.5 L 85.6,45.7 L 84.1,46.0 L 82.5,46.3 L 81.0,46.7 L 79.5,47.0 L 78.0,47.5 L 76.5,47.9 L 75.0,48.4 L 73.5,49.0 L 72.0,49.6 L 70.6,50.2 L 69.2,50.8 L 67.8,51.5 L 66.4,52.3 L 65.0,53.0 L 63.7,53.8 L 62.3,54.7 L 61.0,55.6 L 59.7,56.5 L 58.5,57.4 L 57.2,58.4 L 56.0,59.4 L 54.9,60.4 L 53.7,61.5 L 52.6,62.6 L 51.5,63.7 L 50.4,64.9 L 49.4,66.0 L 48.4,67.2 L 47.4,68.5 L 46.5,69.7 L 45.6,71.0 L 44.7,72.3 L 43.8,73.7 L 43.0,75.0 L 42.3,76.4 L 41.5,77.8 L 40.8,79.2 L 40.2,80.6 L 39.6,82.0 L 39.0,83.5 L 38.4,85.0 L 37.9,86.5 L 37.5,88.0 L 37.0,89.5 L 36.7,91.0 L 36.3,92.5 L 36.0,94.1 L 35.7,95.6 L 35.5,97.2 L 35.3,98.7 L 35.2,100.3 L 35.1,101.9 L 35.0,103.4 L 35.0,105.0 L 35.0,106.6 L 35.1,108.1 L 35.2,109.7 L 35.3,111.3 L 35.5,112.8 L 35.7,114.4 L 36.0,115.9 L 36.3,117.5 L 36.7,119.0 L 37.0,120.5 L 37.5,122.0 L 37.9,123.5 L 38.4,125.0 L 39.0,126.5 L 39.6,128.0 L 40.2,129.4 L 40.8,130.8 L 41.5,132.2 L 42.3,133.6 L 43.0,135.0 L 43.8,136.3 L 44.7,137.7 L 45.6,139.0 L 46.5,140.3 L 47.4,141.5 L 48.4,142.8 L 49.4,144.0 L 50.4,145.1 L 51.5,146.3 L 52.6,147.4 L 53.7,148.5 L 54.9,149.6 L 56.0,150.6 L 57.2,151.6 L 58.5,152.6 L 59.7,153.5 L 61.0,154.4 L 62.3,155.3 L 63.7,156.2 L 65.0,157.0 L 66.4,157.7 L 67.8,158.5 L 69.2,159.2 L 70.6,159.8 L 72.0,160.4 L 73.5,161.0 L 75.0,161.6 L 76.5,162.1 L 78.0,162.5 L 79.5,163.0 L 81.0,163.3 L 82.5,163.7 L 84.1,164.0 L 85.6,164.3 L 87.2,164.5 L 88.7,164.7 L 90.3,164.8 L 91.9,164.9 L 93.4,165.0 L 95.0,165.0 L 96.6,165.0 L 98.1,164.9 L 99.7,164.8 L 101.3,164.7 L 102.8,164.5 L 104.4,164.3 L 105.9,164.0 L 107.5,163.7 L 109.0,163.3 L 110.5,163.0 L 112.0,162.5 L 113.5,162.1 L 115.0,161.6 L 116.5,161.0 L 118.0,160.4 L 119.4,159.8 L 120.8,159.2 L 122.2,158.5 L 123.6,157.7 L 125.0,157.0 L 126.3,156.2 L 127.7,155.3 L 129.0,154.4 L 130.3,153.5 L 131.5,152.6 L 132.8,151.6 L 134.0,150.6 L 135.1,149.6 L 136.3,148.5 L 137.4,147.4 L 138.5,146.3 L 139.6,145.1 L 140.6,144.0 L 141.6,142.8 L 142.6,141.5 L 143.5,140.3 L 144.4,139.0 L 145.3,137.7 L 146.2,136.3 L 147.0,135.0 L 147.7,133.6 L 148.5,132.2 L 149.2,130.8 L 149.8,129.4 L 150.4,128.0 L 151.0,126.5 L 151.6,125.0 L 152.1,123.5 L 152.5,122.0 L 153.0,120.5 L 153.3,119.0 L 153.7,117.5 L 154.0,115.9 L 154.3,114.4 L 154.5,112.8 L 154.7,111.3 L 154.8,109.7 L 154.9,108.1 L 155.0,106.6 L 155.0,105.0 Z" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="95.0" y="197.0" fill="#475569" font-size="11" text-anchor="middle">tâm tại gốc, bán kính 2</text>
  <text x="285.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">r = 1 + cos θ (cardioid)</text>
  <line x1="205.0" y1="105.0" x2="365.0" y2="105.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="285.0" y1="35.0" x2="285.0" y2="175.0" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="285.0" cy="105.0" r="3" fill="#1a202c"/>
  <path d="M 349.0,105.0 L 349.0,103.3 L 348.9,101.7 L 348.7,100.0 L 348.5,98.3 L 348.2,96.7 L 347.8,95.0 L 347.4,93.4 L 346.9,91.8 L 346.4,90.3 L 345.8,88.7 L 345.1,87.2 L 344.4,85.7 L 343.6,84.2 L 342.8,82.8 L 341.9,81.4 L 340.9,80.1 L 340.0,78.8 L 338.9,77.5 L 337.8,76.3 L 336.7,75.1 L 335.5,74.0 L 334.3,73.0 L 333.1,71.9 L 331.8,71.0 L 330.5,70.1 L 329.2,69.2 L 327.8,68.4 L 326.5,67.7 L 325.0,67.0 L 323.6,66.4 L 322.2,65.8 L 320.7,65.3 L 319.3,64.9 L 317.8,64.5 L 316.3,64.2 L 314.9,63.9 L 313.4,63.7 L 311.9,63.5 L 310.5,63.5 L 309.0,63.4 L 307.6,63.5 L 306.1,63.5 L 304.7,63.7 L 303.3,63.9 L 301.9,64.1 L 300.6,64.4 L 299.2,64.8 L 297.9,65.2 L 296.7,65.6 L 295.4,66.1 L 294.2,66.6 L 293.0,67.2 L 291.9,67.8 L 290.8,68.4 L 289.7,69.1 L 288.7,69.8 L 287.7,70.6 L 286.8,71.4 L 285.9,72.2 L 285.0,73.0 L 284.2,73.8 L 283.4,74.7 L 282.7,75.6 L 282.0,76.5 L 281.4,77.4 L 280.8,78.3 L 280.2,79.3 L 279.7,80.2 L 279.3,81.1 L 278.9,82.1 L 278.5,83.0 L 278.2,84.0 L 277.9,84.9 L 277.6,85.8 L 277.4,86.7 L 277.3,87.7 L 277.2,88.6 L 277.1,89.4 L 277.0,90.3 L 277.0,91.1 L 277.0,92.0 L 277.1,92.8 L 277.1,93.6 L 277.2,94.3 L 277.4,95.1 L 277.5,95.8 L 277.7,96.5 L 277.9,97.1 L 278.1,97.8 L 278.4,98.4 L 278.6,99.0 L 278.9,99.5 L 279.2,100.0 L 279.5,100.5 L 279.8,101.0 L 280.1,101.4 L 280.4,101.8 L 280.7,102.2 L 281.0,102.5 L 281.3,102.9 L 281.6,103.1 L 281.9,103.4 L 282.2,103.7 L 282.5,103.9 L 282.7,104.1 L 283.0,104.2 L 283.3,104.4 L 283.5,104.5 L 283.7,104.6 L 283.9,104.7 L 284.1,104.8 L 284.3,104.9 L 284.5,104.9 L 284.6,104.9 L 284.7,105.0 L 284.8,105.0 L 284.9,105.0 L 285.0,105.0 L 285.0,105.0 L 285.0,105.0 L 285.0,105.0 L 285.0,105.0 L 284.9,105.0 L 284.8,105.0 L 284.7,105.0 L 284.6,105.1 L 284.5,105.1 L 284.3,105.1 L 284.1,105.2 L 283.9,105.3 L 283.7,105.4 L 283.5,105.5 L 283.3,105.6 L 283.0,105.8 L 282.7,105.9 L 282.5,106.1 L 282.2,106.3 L 281.9,106.6 L 281.6,106.9 L 281.3,107.1 L 281.0,107.5 L 280.7,107.8 L 280.4,108.2 L 280.1,108.6 L 279.8,109.0 L 279.5,109.5 L 279.2,110.0 L 278.9,110.5 L 278.6,111.0 L 278.4,111.6 L 278.1,112.2 L 277.9,112.9 L 277.7,113.5 L 277.5,114.2 L 277.4,114.9 L 277.2,115.7 L 277.1,116.4 L 277.1,117.2 L 277.0,118.0 L 277.0,118.9 L 277.0,119.7 L 277.1,120.6 L 277.2,121.4 L 277.3,122.3 L 277.4,123.3 L 277.6,124.2 L 277.9,125.1 L 278.2,126.0 L 278.5,127.0 L 278.9,127.9 L 279.3,128.9 L 279.7,129.8 L 280.2,130.7 L 280.8,131.7 L 281.4,132.6 L 282.0,133.5 L 282.7,134.4 L 283.4,135.3 L 284.2,136.2 L 285.0,137.0 L 285.9,137.8 L 286.8,138.6 L 287.7,139.4 L 288.7,140.2 L 289.7,140.9 L 290.8,141.6 L 291.9,142.2 L 293.0,142.8 L 294.2,143.4 L 295.4,143.9 L 296.7,144.4 L 297.9,144.8 L 299.2,145.2 L 300.6,145.6 L 301.9,145.9 L 303.3,146.1 L 304.7,146.3 L 306.1,146.5 L 307.6,146.5 L 309.0,146.6 L 310.5,146.5 L 311.9,146.5 L 313.4,146.3 L 314.9,146.1 L 316.3,145.8 L 317.8,145.5 L 319.3,145.1 L 320.7,144.7 L 322.2,144.2 L 323.6,143.6 L 325.0,143.0 L 326.5,142.3 L 327.8,141.6 L 329.2,140.8 L 330.5,139.9 L 331.8,139.0 L 333.1,138.1 L 334.3,137.0 L 335.5,136.0 L 336.7,134.9 L 337.8,133.7 L 338.9,132.5 L 340.0,131.2 L 340.9,129.9 L 341.9,128.6 L 342.8,127.2 L 343.6,125.8 L 344.4,124.3 L 345.1,122.8 L 345.8,121.3 L 346.4,119.7 L 346.9,118.2 L 347.4,116.6 L 347.8,115.0 L 348.2,113.3 L 348.5,111.7 L 348.7,110.0 L 348.9,108.3 L 349.0,106.7 L 349.0,105.0 Z" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="285.0" y="197.0" fill="#475569" font-size="11" text-anchor="middle">lõm về gốc bên trái, nhọn ra phải</text>
  <text x="475.0" y="22.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">r = cos 2θ (hoa 4 cánh)</text>
  <line x1="395.0" y1="105.0" x2="555.0" y2="105.0" stroke="#94a3b8" stroke-width="1"/>
  <line x1="475.0" y1="35.0" x2="475.0" y2="175.0" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="475.0" cy="105.0" r="3" fill="#1a202c"/>
  <path d="M 540.0,105.0 L 539.9,103.3 L 539.6,101.6 L 539.0,100.0 L 538.2,98.4 L 537.2,96.8 L 536.1,95.3 L 534.7,93.9 L 533.1,92.7 L 531.3,91.5 L 529.4,90.4 L 527.3,89.5 L 525.0,88.8 L 522.6,88.1 L 520.1,87.7 L 517.5,87.4 L 514.7,87.3 L 511.9,87.4 L 509.0,87.7 L 506.1,88.1 L 503.1,88.8 L 500.2,89.6 L 497.2,90.6 L 494.2,91.8 L 491.2,93.2 L 488.3,94.8 L 485.5,96.5 L 482.7,98.4 L 480.0,100.5 L 477.5,102.7 L 475.0,105.0 L 472.7,107.5 L 470.5,110.0 L 468.4,112.7 L 466.5,115.5 L 464.8,118.3 L 463.2,121.2 L 461.8,124.2 L 460.6,127.2 L 459.6,130.2 L 458.8,133.1 L 458.1,136.1 L 457.7,139.0 L 457.4,141.9 L 457.3,144.7 L 457.4,147.5 L 457.7,150.1 L 458.1,152.6 L 458.8,155.0 L 459.5,157.3 L 460.4,159.4 L 461.5,161.3 L 462.7,163.1 L 463.9,164.7 L 465.3,166.1 L 466.8,167.2 L 468.4,168.2 L 470.0,169.0 L 471.6,169.6 L 473.3,169.9 L 475.0,170.0 L 476.7,169.9 L 478.4,169.6 L 480.0,169.0 L 481.6,168.2 L 483.2,167.2 L 484.7,166.1 L 486.1,164.7 L 487.3,163.1 L 488.5,161.3 L 489.6,159.4 L 490.5,157.3 L 491.2,155.0 L 491.9,152.6 L 492.3,150.1 L 492.6,147.5 L 492.7,144.7 L 492.6,141.9 L 492.3,139.0 L 491.9,136.1 L 491.2,133.1 L 490.4,130.2 L 489.4,127.2 L 488.2,124.2 L 486.8,121.2 L 485.2,118.3 L 483.5,115.5 L 481.6,112.7 L 479.5,110.0 L 477.3,107.5 L 475.0,105.0 L 472.5,102.7 L 470.0,100.5 L 467.3,98.4 L 464.5,96.5 L 461.7,94.8 L 458.8,93.2 L 455.8,91.8 L 452.8,90.6 L 449.8,89.6 L 446.9,88.8 L 443.9,88.1 L 441.0,87.7 L 438.1,87.4 L 435.3,87.3 L 432.5,87.4 L 429.9,87.7 L 427.4,88.1 L 425.0,88.8 L 422.7,89.5 L 420.6,90.4 L 418.7,91.5 L 416.9,92.7 L 415.3,93.9 L 413.9,95.3 L 412.8,96.8 L 411.8,98.4 L 411.0,100.0 L 410.4,101.6 L 410.1,103.3 L 410.0,105.0 L 410.1,106.7 L 410.4,108.4 L 411.0,110.0 L 411.8,111.6 L 412.8,113.2 L 413.9,114.7 L 415.3,116.1 L 416.9,117.3 L 418.7,118.5 L 420.6,119.6 L 422.7,120.5 L 425.0,121.2 L 427.4,121.9 L 429.9,122.3 L 432.5,122.6 L 435.3,122.7 L 438.1,122.6 L 441.0,122.3 L 443.9,121.9 L 446.9,121.3 L 449.8,120.4 L 452.8,119.4 L 455.8,118.2 L 458.8,116.8 L 461.7,115.2 L 464.5,113.5 L 467.3,111.6 L 470.0,109.5 L 472.5,107.3 L 475.0,105.0 L 477.3,102.5 L 479.5,100.0 L 481.6,97.3 L 483.5,94.5 L 485.2,91.7 L 486.8,88.8 L 488.2,85.8 L 489.4,82.8 L 490.4,79.8 L 491.2,76.9 L 491.9,73.9 L 492.3,71.0 L 492.6,68.1 L 492.7,65.3 L 492.6,62.5 L 492.3,59.9 L 491.9,57.4 L 491.2,55.0 L 490.5,52.7 L 489.6,50.6 L 488.5,48.7 L 487.3,46.9 L 486.1,45.3 L 484.7,43.9 L 483.2,42.8 L 481.6,41.8 L 480.0,41.0 L 478.4,40.4 L 476.7,40.1 L 475.0,40.0 L 473.3,40.1 L 471.6,40.4 L 470.0,41.0 L 468.4,41.8 L 466.8,42.8 L 465.3,43.9 L 463.9,45.3 L 462.7,46.9 L 461.5,48.7 L 460.4,50.6 L 459.5,52.7 L 458.8,55.0 L 458.1,57.4 L 457.7,59.9 L 457.4,62.5 L 457.3,65.3 L 457.4,68.1 L 457.7,71.0 L 458.1,73.9 L 458.8,76.9 L 459.6,79.8 L 460.6,82.8 L 461.8,85.8 L 463.2,88.7 L 464.8,91.7 L 466.5,94.5 L 468.4,97.3 L 470.5,100.0 L 472.7,102.5 L 475.0,105.0 L 477.5,107.3 L 480.0,109.5 L 482.7,111.6 L 485.5,113.5 L 488.3,115.2 L 491.2,116.8 L 494.2,118.2 L 497.2,119.4 L 500.2,120.4 L 503.1,121.3 L 506.1,121.9 L 509.0,122.3 L 511.9,122.6 L 514.7,122.7 L 517.5,122.6 L 520.1,122.3 L 522.6,121.9 L 525.0,121.2 L 527.3,120.5 L 529.4,119.6 L 531.3,118.5 L 533.1,117.3 L 534.7,116.1 L 536.1,114.7 L 537.2,113.2 L 538.2,111.6 L 539.0,110.0 L 539.6,108.4 L 539.9,106.7 L 540.0,105.0 Z" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="475.0" y="197.0" fill="#475569" font-size="11" text-anchor="middle">4 cánh dọc 2 trục</text>
</svg>

> ⚠ **Lỗi thường gặp.** Cùng một điểm có **nhiều** cặp $(r, \\theta)$. Ba nguồn trùng lặp: (1) cộng $\\theta$ thêm bội $2\\pi$; (2) dùng $r$ **âm** rồi $\\theta$ thêm $\\pi$ — ví dụ $(2, \\frac{\\pi}{6})$ và $(-2, \\frac{7\\pi}{6})$ là **cùng một điểm**; (3) gốc $O$ ứng với mọi $\\theta$ (vì $r = 0$). Khi vẽ đường cong cực, cho $\\theta$ chạy đủ một chu kỳ của $r(\\theta)$ để không vẽ thiếu/thừa cánh.

> ⚠ **Lỗi thường gặp 2 — sai phần tư.** Đây là lỗi #1 ở chiều Descartes → cực. $(x,y) = (-1, -1)$ nằm phần tư **III** nên $\\theta = \\frac{5\\pi}{4}$ (hoặc $-\\frac{3\\pi}{4}$), **không** phải $\\frac{\\pi}{4}$ dù $\\arctan\\frac{-1}{-1} = \\arctan 1 = \\frac{\\pi}{4}$. Máy tính bấm $\\arctan$ sẽ "ăn gian" trả $\\frac{\\pi}{4}$ — luôn vẽ điểm ra giấy để xác định phần tư trước khi chốt $\\theta$.

> 🔁 **Dừng lại tự kiểm tra.** Điểm cực $(r, \\theta) = (2, \\frac{\\pi}{3})$ có toạ độ Descartes là gì?
> <details><summary>Đáp án</summary>$x = r\\cos\\theta = 2\\cos\\frac{\\pi}{3} = 2\\cdot\\frac{1}{2} = 1$; $y = r\\sin\\theta = 2\\sin\\frac{\\pi}{3} = 2\\cdot\\frac{\\sqrt{3}}{2} = \\sqrt{3}$. Vậy $(1, \\sqrt{3})$.</details>

> 🔁 **Dừng lại tự kiểm tra 2.** Đổi $(x, y) = (0, 4)$ và $(x, y) = (-3, 0)$ sang cực.
> <details><summary>Đáp án</summary>$(0,4)$: $r = 4$, nằm trên Oy dương → $\\theta = \\frac{\\pi}{2}$ → $(4, \\frac{\\pi}{2})$. $(-3, 0)$: $r = 3$, trên Ox âm → $\\theta = \\pi$ → $(3, \\pi)$. (Lưu ý: với điểm trên trục, đừng dùng $\\arctan(y/x)$ vì có thể chia cho 0 — đọc thẳng từ vị trí.)</details>

> 📝 **Tóm tắt mục 3.** Cực = "**quay góc $\\theta$, đi xa $r$**": $x = r\\cos\\theta$, $y = r\\sin\\theta$; ngược lại $r = \\sqrt{x^2+y^2}$, $\\theta = \\operatorname{atan2}(y,x)$. Một điểm ứng với nhiều $(r,\\theta)$ (bội $2\\pi$, $r$ âm, gốc $O$). Đổi Descartes → cực phải **chỉnh góc theo phần tư**. Đường tròn, cardioid, hoa hồng — khó viết $y=f(x)$ — lại rất gọn trong cực.

---

## 4. Diện tích trong toạ độ cực

### 4.1. Vì sao là ½∫r²dθ — cộng dồn hình quạt mảnh

💡 **Trực giác.** Trong hệ Descartes ta cộng các *chữ nhật mảnh* $f(x)\\,dx$; trong hệ cực hình dạng đó không tự nhiên (đường biên cong quanh gốc). Thay vào đó ta cắt vùng thành các **hình quạt mảnh** như cắt bánh pizza, mỗi miếng góc $d\\theta$ nhỏ:

<svg viewBox="0 0 520 215" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Diện tích trong tọa độ cực: chia vùng thành các miếng quạt hẹp góc dθ, bán kính r(θ); mỗi miếng ≈ tam giác diện tích ½ r² dθ">
  <defs><marker id="ar13" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="80.0" y1="190.0" x2="290.0" y2="190.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar13)"/>
  <line x1="90.0" y1="200.0" x2="90.0" y2="20.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar13)"/>
  <circle cx="90.0" cy="190.0" r="3" fill="#1a202c"/>
  <text x="82.0" y="206.0" fill="#475569" font-size="12" text-anchor="end">O</text>
  <path d="M 225.0,190.0 L 225.7,187.9 L 226.3,185.7 L 227.0,183.5 L 227.5,181.3 L 228.1,179.1 L 228.6,176.9 L 229.1,174.6 L 229.5,172.4 L 229.9,170.1 L 230.2,167.8 L 230.5,165.5 L 230.7,163.2 L 230.9,160.8 L 231.1,158.5 L 231.2,156.1 L 231.3,153.7 L 231.3,151.4 L 231.2,149.0 L 231.1,146.6 L 231.0,144.2 L 230.8,141.8 L 230.5,139.4 L 230.2,137.0 L 229.8,134.6 L 229.4,132.2 L 228.9,129.9 L 228.4,127.5 L 227.8,125.1 L 227.2,122.8 L 226.5,120.4 L 225.8,118.1 L 224.9,115.8 L 224.1,113.5 L 223.2,111.2 L 222.2,109.0 L 221.2,106.8 L 220.1,104.5 L 219.0,102.4 L 217.8,100.2 L 216.5,98.1 L 215.2,96.0 L 213.9,93.9 L 212.5,91.9 L 211.0,89.9 L 209.6,87.9 L 208.0,86.0 L 206.4,84.1 L 204.8,82.2 L 203.1,80.4 L 201.4,78.6 L 199.6,76.9 L 197.8,75.2 L 195.9,73.6 L 194.0,72.0 L 192.1,70.4 L 190.1,69.0 L 188.1,67.5 L 186.1,66.1 L 184.0,64.8 L 181.9,63.5 L 179.8,62.2 L 177.6,61.0 L 175.5,59.9 L 173.2,58.8 L 171.0,57.8 L 168.8,56.8 L 166.5,55.9 L 164.2,55.1 L 161.9,54.2 L 159.6,53.5 L 157.2,52.8 L 154.9,52.2 L 152.5,51.6 L 150.1,51.1 L 147.8,50.6 L 145.4,50.2 L 143.0,49.8 L 140.6,49.5 L 138.2,49.2 L 135.8,49.0 L 133.4,48.9 L 131.0,48.8 L 128.6,48.7 L 126.3,48.7 L 123.9,48.8 L 121.5,48.9 L 119.2,49.1 L 116.8,49.3 L 114.5,49.5 L 112.2,49.8 L 109.9,50.1 L 107.6,50.5 L 105.4,50.9 L 103.1,51.4 L 100.9,51.9 L 98.7,52.5 L 96.5,53.0 L 94.3,53.7 L 92.1,54.3 L 90.0,55.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <path fill-opacity="0.6" d="M 90.0,190.0 L 217.9,100.4 L 216.9,98.7 L 215.8,96.9 L 214.7,95.2 L 213.6,93.4 L 212.4,91.8 L 211.2,90.1 L 210.0,88.4 L 208.7,86.8 L 207.4,85.2 L 206.1,83.7 L 204.7,82.1 L 203.3,80.6 L 201.9,79.1 L 200.4,77.7 L 198.9,76.2 L 197.4,74.9 L 195.8,73.5 L 194.3,72.2 L 192.6,70.9 L 191.0,69.6 Z" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="215.4" y="70.6" fill="#1d4ed8" font-size="13" text-anchor="start" font-weight="700">r(θ)</text>
  <path d="M 140.0,190.0 A 50,50 0 0 0 131.0,161.3" fill="none" stroke="#475569" stroke-width="1.5"/>
  <text x="146.0" y="178.0" fill="#475569" font-size="12" text-anchor="start" font-style="italic">θ</text>
  <text x="146.6" y="109.8" fill="#dc2626" font-size="12" text-anchor="end" font-weight="700">dθ</text>
  <text x="300.0" y="60.0" fill="#1a202c" font-size="13" text-anchor="start" font-weight="700">Mỗi miếng quạt:</text>
  <text x="300.0" y="84.0" fill="#475569" font-size="12" text-anchor="start">• góc mở dθ (rất nhỏ)</text>
  <text x="300.0" y="104.0" fill="#475569" font-size="12" text-anchor="start">• bán kính ≈ r(θ)</text>
  <text x="300.0" y="124.0" fill="#475569" font-size="12" text-anchor="start">• gần như tam giác hẹp: đáy r·dθ, cao r</text>
  <text x="300.0" y="154.0" fill="#dc2626" font-size="13" text-anchor="start" font-weight="700">diện tích ≈ ½ · r · (r dθ) = ½ r² dθ</text>
  <text x="300.0" y="178.0" fill="#1a202c" font-size="13" text-anchor="start" font-weight="700">A = ∫ ½ r(θ)² dθ</text>
</svg>

Một miếng quạt bán kính $r$, góc $d\\theta$ gần như tam giác hẹp đáy $r\\,d\\theta$ (cung) và "chiều cao" $r$ → diện tích $\\frac{1}{2}\\cdot r\\cdot(r\\,d\\theta) = \\frac{1}{2}r^2\\,d\\theta$. (Chính xác hơn: diện tích quạt tròn bán kính $r$ góc $d\\theta$ là $\\frac{1}{2}r^2\\,d\\theta$ — chiếm tỉ lệ $\\frac{d\\theta}{2\\pi}$ của cả hình tròn $\\pi r^2$.) Cộng dồn mọi miếng:

$$A = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r(\\theta)^2 \\, d\\theta$$

### 4.2. Walk-through từng bước — 4 ví dụ verify

**Ví dụ số cụ thể (verify):**

1. **Đường tròn** $r = a$: $A = \\frac{1}{2}\\int_0^{2\\pi}a^2\\,d\\theta = \\frac{1}{2}a^2\\cdot 2\\pi = \\pi a^2$ — đúng diện tích hình tròn ✓.
2. **Cardioid** $r = 1 + \\cos\\theta$ — làm chậm từng bước (đây là ví dụ chuẩn của phần này):
   $$\\begin{aligned}
   A &= \\frac{1}{2}\\int_0^{2\\pi}(1+\\cos\\theta)^2\\,d\\theta \\\\
   &= \\frac{1}{2}\\int_0^{2\\pi}\\big(1 + 2\\cos\\theta + \\cos^2\\theta\\big)\\,d\\theta \\\\
   &= \\frac{1}{2}\\left[\\int_0^{2\\pi}\\!1\\,d\\theta + 2\\int_0^{2\\pi}\\!\\cos\\theta\\,d\\theta + \\int_0^{2\\pi}\\!\\cos^2\\theta\\,d\\theta\\right] \\\\
   &= \\frac{1}{2}\\Big[\\,2\\pi \\;+\\; 2\\cdot 0 \\;+\\; \\pi\\,\\Big] = \\frac{3\\pi}{2} \\approx 4.712.
   \\end{aligned}$$
   Ba tích phân thành phần: $\\int_0^{2\\pi}1\\,d\\theta = 2\\pi$; $\\int_0^{2\\pi}\\cos\\theta\\,d\\theta = 0$ (một chu kỳ cosin triệt tiêu); $\\int_0^{2\\pi}\\cos^2\\theta\\,d\\theta = \\pi$ (dùng hạ bậc $\\cos^2 = \\frac{1+\\cos2\\theta}{2}$, [Lesson 09](../lesson-09-integration-techniques/)) ✓.
3. **Một cánh hoa hồng** $r = \\cos 2\\theta$ (cánh khi $\\theta\\in[-\\pi/4, \\pi/4]$, nơi $\\cos2\\theta \\ge 0$): $A = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4}\\cos^2 2\\theta\\,d\\theta = \\pi/8 \\approx 0.3927$ (chi tiết tính ở Bài 4 — Lời giải). Bốn cánh $\\to 4\\cdot\\frac{\\pi}{8} = \\frac{\\pi}{2}$.
4. **Xoắn ốc** $r = \\theta$, $\\theta\\in[0, 2\\pi]$: $A = \\frac{1}{2}\\int_0^{2\\pi}\\theta^2\\,d\\theta = \\frac{1}{2}\\cdot\\frac{(2\\pi)^3}{3} = \\frac{4\\pi^3}{3} \\approx 41.34$ (diện tích vùng quét bởi bán kính khi quay một vòng).

### 4.3. Diện tích giữa hai đường cong cực

Khi cần diện tích **giữa** hai đường $r_{\\text{ngoài}}(\\theta) \\ge r_{\\text{trong}}(\\theta)$ (như vành khăn), trừ hai tích phân quạt:

$$A = \\frac{1}{2}\\int_{\\alpha}^{\\beta}\\big(r_{\\text{ngoài}}^2 - r_{\\text{trong}}^2\\big)\\,d\\theta$$

**Ví dụ:** vùng giữa $r = 2$ (ngoài) và $r = 1$ (trong), cả vòng $[0, 2\\pi]$: $A = \\frac{1}{2}\\int_0^{2\\pi}(4 - 1)\\,d\\theta = \\frac{1}{2}\\cdot 3\\cdot 2\\pi = 3\\pi$. Kiểm tra: vành khăn $= \\pi(2^2 - 1^2) = 3\\pi$ ✓.

> ⚠ **Lỗi thường gặp ở đây:** viết $\\frac{1}{2}\\int(r_{\\text{ngoài}} - r_{\\text{trong}})^2\\,d\\theta$ (**bình phương cả hiệu**) là **sai**. Phải là **hiệu hai bình phương** $r_{\\text{ngoài}}^2 - r_{\\text{trong}}^2$ — vì mỗi đường đóng góp diện tích quạt riêng $\\frac{1}{2}r^2$, ta trừ hai diện tích, không trừ hai bán kính rồi mới bình phương.

> ⚠ **Lỗi thường gặp.** (1) **Quên hệ số $\\frac{1}{2}$** → diện tích gấp đôi (lỗi phổ biến nhất cả phần). (2) **Chọn sai khoảng $\\theta$**: với một cánh hoa hồng phải lấy đúng khoảng $r(\\theta)\\ge0$ (nếu lấy nguyên $[0,2\\pi]$ sẽ cộng chồng các cánh, hoặc cộng cả phần $r<0$ — sai); với cả hình kín lấy đúng một vòng. (3) **Nhầm $\\frac12 r^2$ với $r$**: $\\frac12 r^2\\,d\\theta$ là *diện tích quạt*, còn $r\\,d\\theta$ là *độ dài cung* — hai đại lượng khác hẳn (xem ❓ ngay dưới).

> ❓ **"Sao là ½r² chứ không phải r²?"** Vì diện tích một hình quạt bán kính $r$, góc nhỏ $d\\theta$ là $\\frac{1}{2}r^2\\,d\\theta$ (giống $\\frac{1}{2}\\cdot$đáy$\\cdot$cao của tam giác hẹp), không phải $r\\,d\\theta$ (cái đó là *độ dài cung*). Nhầm hai cái là lỗi phổ biến nhất ở phần này. *(Callout này lặp lại từ mục dưới để đứng cạnh chỗ dễ sai — đọc một mình vẫn hiểu.)*

> 🔁 **Dừng lại tự kiểm tra.** Tính diện tích bao bởi đường tròn $r = 2\\cos\\theta$ (cho $\\theta\\in[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$).
> <details><summary>Đáp án</summary>$A = \\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2}(2\\cos\\theta)^2\\,d\\theta = \\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2}4\\cos^2\\theta\\,d\\theta = 2\\int_{-\\pi/2}^{\\pi/2}\\cos^2\\theta\\,d\\theta = 2\\cdot\\frac{\\pi}{2} = \\pi$. Kiểm tra: $r=2\\cos\\theta$ là đường tròn bán kính $1$ tâm $(1,0)$ → diện tích $\\pi\\cdot1^2 = \\pi$ ✓.</details>

> 🔁 **Dừng lại tự kiểm tra 2.** Vì sao cận của đường tròn $r = 2\\cos\\theta$ chỉ là $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ mà không phải $[0, 2\\pi]$?
> <details><summary>Đáp án</summary>Trên $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ thì $\\cos\\theta \\ge 0$ nên $r \\ge 0$ và đường vẽ trọn cả vòng tròn nhỏ một lần. Nếu chạy $[0, 2\\pi]$, khi $\\theta \\in (\\frac{\\pi}{2}, \\frac{3\\pi}{2})$ thì $\\cos\\theta < 0 \\Rightarrow r < 0$ — đường được vẽ **lại lần hai** (chồng lên chính nó), tính diện tích sẽ ra $2\\pi$ (gấp đôi). Đây đúng là cái bẫy "chọn sai khoảng $\\theta$".</details>

> 📝 **Tóm tắt mục 4.** $A = \\frac{1}{2}\\int_\\alpha^\\beta r(\\theta)^2\\,d\\theta$ — cộng dồn các **hình quạt mảnh** $\\frac{1}{2}r^2\\,d\\theta$. Giữa hai đường: $\\frac12\\int(r_{\\text{ngoài}}^2 - r_{\\text{trong}}^2)\\,d\\theta$ (hiệu hai *bình phương*, không bình phương hiệu). Hệ số $\\frac{1}{2}$ là chỗ dễ quên nhất; chọn cận $\\theta$ phải khớp đúng phạm vi cần tính.

---

## 5. Độ dài cung trong toạ độ cực

### 5.1. Công thức và tam giác vuông vi phân

💡 **Trực giác.** Vẫn là Pythagoras như mục 2, nhưng diễn theo $\\theta$: khi $\\theta$ nhích một chút $d\\theta$, điểm vừa dịch **theo phương bán kính** một đoạn $dr$ (ra/vào gốc), vừa dịch **theo phương tiếp tuyến** (vuông góc bán kính) một đoạn $r\\,d\\theta$ (cung của đường tròn bán kính $r$ ứng góc $d\\theta$):

<svg viewBox="0 0 500 210" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông vi phân tọa độ cực: cạnh dr theo phương bán kính, cạnh r·dθ theo phương tiếp tuyến, cạnh huyền ds">
  <defs><marker id="ar14" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="110.0" y1="150.0" x2="290.0" y2="150.0" stroke="#15803d" stroke-width="2.5"/>
  <line x1="290.0" y1="150.0" x2="290.0" y2="40.0" stroke="#15803d" stroke-width="2.5"/>
  <line x1="110.0" y1="150.0" x2="290.0" y2="40.0" stroke="#dc2626" stroke-width="2.5"/>
  <circle cx="110.0" cy="150.0" r="4" fill="#dc2626"/>
  <circle cx="290.0" cy="40.0" r="4" fill="#dc2626"/>
  <rect x="278.0" y="138.0" width="12.0" height="12.0" rx="0" fill="none" fill-opacity="1" stroke="#475569" stroke-width="1"/>
  <text x="200.0" y="170.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">dr (dịch theo phương bán kính)</text>
  <text x="298.0" y="99.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">r dθ (dịch theo phương tiếp tuyến)</text>
  <text x="188.0" y="87.0" fill="#dc2626" font-size="15" text-anchor="end" font-weight="700" font-style="italic">ds</text>
  <text x="250.0" y="195.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">ds = √((dr)² + (r dθ)²) = √(r² + (dr/dθ)²) · dθ</text>
</svg>

Hai dịch chuyển này **vuông góc** → quãng đường nhỏ $ds = \\sqrt{(dr)^2 + (r\\,d\\theta)^2}$. Đặt $r' = \\frac{dr}{d\\theta}$, rút $d\\theta$ ra ngoài căn rồi cộng dồn:

$$L = \\int_{\\alpha}^{\\beta} \\sqrt{r^2 + \\left(\\tfrac{dr}{d\\theta}\\right)^2}\\,d\\theta$$

❓ **"Sao có thêm $r^2$ mà mục 2 không có?"** Vì ở cực, ngay cả khi $r$ **không đổi** ($dr = 0$, như đường tròn) điểm vẫn di chuyển — nó quét cung $r\\,d\\theta$. Số hạng $r^2$ chính là phần "quét vòng" đó; số hạng $(r')^2$ là phần "ra/vào gốc". Đường tròn chỉ có phần đầu, xoắn ốc có cả hai.

### 5.2. Walk-through từng bước — 3 ví dụ verify

**Ví dụ số cụ thể (verify):**

1. **Đường tròn** $r = a$ (hằng): $\\frac{dr}{d\\theta} = 0$ $\\Rightarrow L = \\int_0^{2\\pi}\\sqrt{a^2 + 0}\\,d\\theta = \\int_0^{2\\pi}a\\,d\\theta = 2\\pi a$ — đúng chu vi ✓.
2. **Cardioid** $r = 1 + \\cos\\theta$ — từng bước:
   $$\\begin{aligned}
   \\frac{dr}{d\\theta} &= -\\sin\\theta \\\\
   r^2 + (r')^2 &= (1+\\cos\\theta)^2 + \\sin^2\\theta \\\\
   &= 1 + 2\\cos\\theta + \\cos^2\\theta + \\sin^2\\theta \\\\
   &= 2 + 2\\cos\\theta = 4\\cos^2\\!\\tfrac{\\theta}{2} \\quad (\\text{hạ bậc } 1+\\cos\\theta = 2\\cos^2\\tfrac{\\theta}{2}) \\\\
   L &= \\int_0^{2\\pi} 2\\left|\\cos\\tfrac{\\theta}{2}\\right|\\,d\\theta = 8.
   \\end{aligned}$$
   Cùng đáp số $8$ như cycloid — trùng hợp đẹp, nhưng hai bài toán khác nhau (cycloid là tham số, cardioid là cực).
3. **Xoắn ốc Archimedes** $r = \\theta$, $\\theta\\in[0, 2\\pi]$: $r' = 1$ $\\Rightarrow L = \\int_0^{2\\pi}\\sqrt{\\theta^2 + 1}\\,d\\theta \\approx 21.26$ (tính số — dạng $\\sqrt{a^2+x^2}$, đổi biến lượng giác / dùng công thức $\\int\\sqrt{x^2+1}\\,dx = \\frac12\\big(x\\sqrt{x^2+1} + \\sinh^{-1}x\\big)$, [L09](../lesson-09-integration-techniques/)).

> ⚠ **Lỗi thường gặp.** Khi rút gọn căn phải **giữ trị tuyệt đối**: $\\sqrt{4\\cos^2(\\theta/2)} = 2|\\cos(\\theta/2)|$. Trên $[0, 2\\pi]$ thì $\\cos(\\theta/2) \\ge 0$ nên bỏ được dấu trị tuyệt đối; trên khoảng khác bỏ ẩu sẽ ra độ dài âm — vô lý.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao đường tròn $r=a$ cho $L = 2\\pi a$ mà không cần $\\frac{dr}{d\\theta}$?
> <details><summary>Đáp án</summary>Vì $r$ hằng nên $\\frac{dr}{d\\theta}=0$, công thức rút về $L = \\int_0^{2\\pi} r\\,d\\theta = \\int_0^{2\\pi} a\\,d\\theta = 2\\pi a$. Đúng là "đi hết một vòng với bán kính cố định" = chu vi.</details>

> 📝 **Tóm tắt mục 5.** $L = \\int_\\alpha^\\beta \\sqrt{r^2 + (r')^2}\\,d\\theta$ — Pythagoras của hai dịch chuyển vuông góc (bán kính $dr$, tiếp tuyến $r\\,d\\theta$). $r^2$ là phần "quét vòng", $(r')^2$ là phần "ra/vào gốc". Cardioid $L=8$; nhiều đường (xoắn ốc) phải tính số.

---

## 6. Độ dốc dy/dx trong toạ độ cực

💡 **Trực giác.** Đường cong cực $r = r(\\theta)$ thực ra là một đường cong **tham số** trá hình, với $\\theta$ đóng vai biến chạy $t$:

$$x = r(\\theta)\\cos\\theta, \\qquad y = r(\\theta)\\sin\\theta.$$

Áp dụng đúng công thức tham số $\\frac{dy}{dx} = \\frac{dy/d\\theta}{dx/d\\theta}$, dùng quy tắc tích để đạo hàm:

$$\\frac{dy}{dx} = \\frac{\\dfrac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta}{\\dfrac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}$$

> ⚠ **Lỗi thường gặp.** $\\frac{dy}{dx}$ trong cực **không** bằng $\\frac{dr}{d\\theta}$. $\\frac{dr}{d\\theta}$ chỉ cho biết bán kính đang nở/co nhanh thế nào theo góc — còn độ dốc *hình học* trên mặt phẳng phải tính qua $x(\\theta), y(\\theta)$ như trên. Nhầm hai cái là lỗi rất hay gặp.

**Ví dụ 1 — cardioid $r = 1 + \\cos\\theta$ tại $\\theta = \\frac{\\pi}{2}$:**
- $r = 1 + 0 = 1$; $\\frac{dr}{d\\theta} = -\\sin\\theta = -1$ tại $\\frac{\\pi}{2}$.
- Tử: $(-1)\\sin\\frac{\\pi}{2} + 1\\cdot\\cos\\frac{\\pi}{2} = -1 + 0 = -1$.
- Mẫu: $(-1)\\cos\\frac{\\pi}{2} - 1\\cdot\\sin\\frac{\\pi}{2} = 0 - 1 = -1$.
- $\\frac{dy}{dx} = \\frac{-1}{-1} = 1$ → tiếp tuyến nghiêng $+45^\\circ$ tại điểm đó.

**Ví dụ 2 — viết phương trình tiếp tuyến.** Với cùng cardioid tại $\\theta = \\frac{\\pi}{2}$: điểm Descartes là $x = r\\cos\\frac{\\pi}{2} = 0$, $y = r\\sin\\frac{\\pi}{2} = 1$, tức $(0, 1)$. Độ dốc vừa tính $= 1$. Phương trình tiếp tuyến: $y - 1 = 1\\cdot(x - 0) \\Rightarrow y = x + 1$.

**Ví dụ 3 — tiếp tuyến tại gốc.** Khi $r(\\theta_0) = 0$ (đường đi qua gốc), công thức gọn lại: tiếp tuyến tại gốc chính là **tia $\\theta = \\theta_0$**. Với cardioid $r = 1 + \\cos\\theta$, $r = 0 \\Leftrightarrow \\cos\\theta = -1 \\Leftrightarrow \\theta = \\pi$ → tiếp tuyến tại gốc là tia $\\theta = \\pi$ (trục Ox âm), khớp với hình "trái tim" nhọn về phía trái.

> 🔁 **Dừng lại tự kiểm tra.** Với đường tròn $r = 2$ (hằng), tính $\\frac{dy}{dx}$ tại $\\theta = 0$.
> <details><summary>Đáp án</summary>$r = 2$, $\\frac{dr}{d\\theta} = 0$. Tử $= 0\\cdot\\sin 0 + 2\\cos 0 = 2$; mẫu $= 0\\cdot\\cos 0 - 2\\sin 0 = 0$. $\\frac{dy}{dx} = \\frac{2}{0}$ → tiếp tuyến **thẳng đứng**. Đúng: điểm $\\theta=0$ là $(2,0)$ ở mép phải đường tròn, tiếp tuyến dựng đứng ✓.</details>

> 📝 **Tóm tắt mục 6.** Đường cực = tham số với $x = r\\cos\\theta, y = r\\sin\\theta$; dùng $\\frac{dy}{dx} = \\frac{dy/d\\theta}{dx/d\\theta}$. **Không** nhầm với $\\frac{dr}{d\\theta}$ (chỉ là tốc độ nở bán kính).

---

> 📝 **Tóm tắt cả bài.**
> - **Tham số** $(x(t), y(t))$ = "vị trí theo thời gian": $\\frac{dy}{dx} = (dy/dt)/(dx/dt)$ (chain rule); $L = \\int\\sqrt{x'^2+y'^2}\\,dt$ (Pythagoras cho vận tốc).
> - **Cực** $r = r(\\theta)$ = "khoảng cách + góc": đổi $x = r\\cos\\theta, y = r\\sin\\theta$ (và ngược lại, nhớ chỉnh phần tư); $A = \\frac{1}{2}\\int r^2\\,d\\theta$ (cộng quạt mảnh); $L = \\int\\sqrt{r^2+r'^2}\\,d\\theta$; độ dốc dùng công thức tham số với biến $\\theta$.
> - **Bẫy hay sai**: nhầm $\\frac{dy}{dx}$ với $\\frac{dy}{dt}$ (hoặc $\\frac{dr}{d\\theta}$); quên $\\frac12$ trong diện tích cực; bình phương hiệu thay vì hiệu bình phương; sai phần tử/phần tư khi đổi sang cực; quên trị tuyệt đối khi rút căn.
> - Đường tròn/cycloid/cardioid/hoa hồng — thứ khó viết $y=f(x)$ — đều gọn gàng trong hai ngôn ngữ này.

---

## 7. Bài tập

1. Đường cong $x = t^2, y = t^3$. Tính $\\frac{dy}{dx}$ tại $t = 2$.
2. Tính độ dài đoạn $x = \\cos t, y = \\sin t$ với $t \\in [0, \\pi/2]$ (¼ đường tròn). Có khớp $2\\pi/4$ không?
3. Tính diện tích hình tròn $r = 3$ bằng công thức cực.
4. Tính diện tích **một cánh** hoa hồng $r = \\cos 2\\theta$.
5. Điểm Descartes $(-1, 1)$ có toạ độ cực $(r, \\theta)$ là gì?
6. Đường cong $x = t^2,\\ y = t^3 - 3t$. Tìm điểm có **tiếp tuyến nằm ngang** (gợi ý: $\\frac{dy}{dt} = 0$ mà $\\frac{dx}{dt} \\neq 0$).
7. Đổi điểm Descartes $(-2, -2)$ sang toạ độ cực $(r, \\theta)$ với $\\theta \\in [0, 2\\pi)$. Chú ý phần tư.
8. Tính độ dài cardioid $r = 1 + \\sin\\theta$ (so kết quả với cardioid $r = 1 + \\cos\\theta$ ở mục 5).
9. Tính diện tích nằm **bên trong** đường tròn $r = 1$ và **bên ngoài** cardioid $r = 1 - \\cos\\theta$... thực ra hãy làm phiên bản dễ hơn: tính diện tích **giữa** hai đường tròn đồng tâm $r = 3$ (ngoài) và $r = 2$ (trong).
10. Đường cong tham số $x = e^t\\cos t,\\ y = e^t\\sin t$ (xoắn ốc logarit). Tính $\\frac{dy}{dx}$ tại $t = 0$.

## Lời giải chi tiết

**Bài 1.** $\\frac{dx}{dt} = 2t$, $\\frac{dy}{dt} = 3t^2$ $\\Rightarrow \\frac{dy}{dx} = 3t^2/(2t) = 3t/2$. Tại $t=2$: $= 3$.
*(Kiểm tra: khử t — $t = \\sqrt{x}$, $y = x^{3/2}$, $\\frac{dy}{dx} = (3/2)\\sqrt{x} = (3/2)\\cdot t = 3t/2$ ✓.)*

**Bài 2.** $x'=-\\sin t, y'=\\cos t$, $\\sqrt{\\sin^2+\\cos^2}=1$ $\\Rightarrow L = \\int_0^{\\pi/2}1\\,dt = \\pi/2 \\approx 1.5708$. Đúng bằng $2\\pi/4 = \\pi/2$ ✓ (¼ chu vi đường tròn đơn vị).

**Bài 3.** $A = \\frac{1}{2}\\int_0^{2\\pi}3^2\\,d\\theta = \\frac{1}{2}\\cdot 9\\cdot 2\\pi = 9\\pi \\approx 28.27$. Đúng $\\pi r^2 = \\pi\\cdot 9$ ✓.

**Bài 4.** Một cánh ứng với $\\theta \\in [-\\pi/4, \\pi/4]$ (nơi $\\cos 2\\theta \\ge 0$). $A = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4}\\cos^2 2\\theta\\,d\\theta$. Dùng $\\cos^2 u = (1+\\cos 2u)/2$ với $u=2\\theta$: $= \\frac{1}{4}\\int_{-\\pi/4}^{\\pi/4}(1+\\cos 4\\theta)\\,d\\theta = \\frac{1}{4}[\\theta + \\frac{1}{4}\\sin 4\\theta]_{-\\pi/4}^{\\pi/4} = \\frac{1}{4}[(\\pi/4 + 0) - (-\\pi/4 + 0)] = \\frac{1}{4}\\cdot(\\pi/2) = \\pi/8 \\approx 0.3927$.

**Bài 5.** $r = \\sqrt{(-1)^2 + 1^2} = \\sqrt{2}$. $\\theta = \\operatorname{atan2}(1, -1) = 3\\pi/4$ (góc phần tư thứ II). Vậy $(\\sqrt{2}, 3\\pi/4)$.

**Bài 6.** Tiếp tuyến nằm ngang $\\Leftrightarrow \\frac{dy}{dt} = 0$ và $\\frac{dx}{dt} \\neq 0$.
$$\\frac{dy}{dt} = 3t^2 - 3 = 3(t^2 - 1) = 0 \\Rightarrow t = \\pm 1.$$
Kiểm $\\frac{dx}{dt} = 2t$: tại $t = 1$ thì $\\frac{dx}{dt} = 2 \\neq 0$ ✓; tại $t = -1$ thì $\\frac{dx}{dt} = -2 \\neq 0$ ✓. Hai điểm:
- $t = 1$: $x = 1,\\ y = 1 - 3 = -2$ → $(1, -2)$.
- $t = -1$: $x = 1,\\ y = -1 + 3 = 2$ → $(1, 2)$.

Vậy có **hai** điểm tiếp tuyến ngang: $(1, -2)$ và $(1, 2)$ (cùng $x = 1$, đối xứng qua trục Ox — hợp lý vì $y$ là hàm lẻ của $t$, $x$ là hàm chẵn).

**Bài 7.** $(x, y) = (-2, -2)$: $r = \\sqrt{(-2)^2 + (-2)^2} = \\sqrt{8} = 2\\sqrt2$. Điểm ở phần tư **III** ($x<0, y<0$). Góc tham chiếu $\\alpha = \\arctan\\left|\\frac{-2}{-2}\\right| = \\arctan 1 = \\frac{\\pi}{4}$; ở phần tư III nên $\\theta = \\pi + \\frac{\\pi}{4} = \\frac{5\\pi}{4}$. Vậy $(2\\sqrt2, \\frac{5\\pi}{4})$.
*(Kiểm tra ngược: $x = 2\\sqrt2\\cos\\frac{5\\pi}{4} = 2\\sqrt2\\cdot(-\\frac{\\sqrt2}{2}) = -2$ ✓; $y$ tương tự $= -2$ ✓.)*

**Bài 8.** $r = 1 + \\sin\\theta$, $r' = \\cos\\theta$.
$$\\begin{aligned}
r^2 + (r')^2 &= (1+\\sin\\theta)^2 + \\cos^2\\theta = 1 + 2\\sin\\theta + \\sin^2\\theta + \\cos^2\\theta \\\\
&= 2 + 2\\sin\\theta.
\\end{aligned}$$
Đây chỉ là cardioid $r = 1 + \\cos\\theta$ **xoay đi $90^\\circ$** (đổi $\\cos \\to \\sin$), nên độ dài phải bằng nhau. Thật vậy $L = \\int_0^{2\\pi}\\sqrt{2 + 2\\sin\\theta}\\,d\\theta$; đổi biến $\\phi = \\theta - \\frac{\\pi}{2}$ biến $\\sin\\theta \\to \\cos\\phi$ → trùng tích phân của cardioid $\\cos$, cho $L = 8$. **Đáp số: $L = 8$** (bằng đúng cardioid ở mục 5 — chỉ khác hướng).

**Bài 9.** Hai đường tròn đồng tâm, $r_{\\text{ngoài}} = 3$, $r_{\\text{trong}} = 2$, cả vòng $\\theta \\in [0, 2\\pi]$:
$$A = \\frac{1}{2}\\int_0^{2\\pi}\\big(3^2 - 2^2\\big)\\,d\\theta = \\frac{1}{2}\\int_0^{2\\pi}5\\,d\\theta = \\frac{1}{2}\\cdot 5\\cdot 2\\pi = 5\\pi \\approx 15.71.$$
Kiểm tra: vành khăn $= \\pi(3^2 - 2^2) = \\pi\\cdot 5 = 5\\pi$ ✓. *(Lưu ý dùng hiệu hai bình phương, không bình phương hiệu: $\\frac12\\int(3-2)^2\\,d\\theta = \\pi$ là sai.)*

**Bài 10.** $x = e^t\\cos t,\\ y = e^t\\sin t$. Đạo hàm bằng quy tắc tích:
$$\\begin{aligned}
\\frac{dx}{dt} &= e^t\\cos t - e^t\\sin t = e^t(\\cos t - \\sin t), \\\\
\\frac{dy}{dt} &= e^t\\sin t + e^t\\cos t = e^t(\\sin t + \\cos t).
\\end{aligned}$$
$$\\frac{dy}{dx} = \\frac{e^t(\\sin t + \\cos t)}{e^t(\\cos t - \\sin t)} = \\frac{\\sin t + \\cos t}{\\cos t - \\sin t}.$$
Tại $t = 0$: $\\frac{\\sin 0 + \\cos 0}{\\cos 0 - \\sin 0} = \\frac{0 + 1}{1 - 0} = 1$ → tiếp tuyến nghiêng $+45^\\circ$ tại điểm $(1, 0)$.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 2 module tương tác: **vẽ đường cong tham số** (chọn đường tròn/ellipse/cycloid/Lissajous, animation theo t, hiện độ dài cung số & $\\frac{dy}{dx}$ tại điểm), và **diện tích cực** (chọn $r(\\theta)$: tròn/cardioid/hoa hồng/xoắn ốc, tô vùng + so $A = \\frac{1}{2}\\int r^2\\,d\\theta$ với công thức).

## 9. Kết thúc Tầng 4

- Đây là bài cuối của Tầng 4 — Giải tích 1 biến đã đủ bộ: giới hạn → đạo hàm → tích phân → kỹ thuật → tham số/cực.
- Tiếp theo: chuỗi & khai triển Taylor và phương trình vi phân ở [Math/06-Advanced](../../06-Advanced/) (L06, L07); hoặc giải tích nhiều biến (đạo hàm riêng, tích phân bội) ở [Math/06-Advanced/lesson-04](../../06-Advanced/lesson-04-multivariable-functions/), [lesson-05](../../06-Advanced/lesson-05-multiple-integrals/).
`;
