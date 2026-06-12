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

\`\`\`
   t = 0      t = 1      t = 2      t = 3
  (x₀,y₀)    (x₁,y₁)    (x₂,y₂)    (x₃,y₃)
     •─────────•─────────•─────────•
              đường cong = vết con kiến để lại
\`\`\`

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

\`\`\`
   y
   │      ___          ___          ___
   │    ╱     ╲      ╱     ╲      ╱     ╲     ← các vòm cycloid
   │  ╱  đỉnh  ╲   ╱         ╲  ╱         ╲
   │ ╱  (t=π)   ╲ ╱   cusp    ╲╱           ╲
   └•────────────•─────────────•────────────• ── x
   t=0         t=2π          t=4π   (điểm chạm đất = điểm nhọn)
\`\`\`

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

\`\`\`
                    ╱│
              ds  ╱  │  dy = (dy/dt) dt
                ╱    │
              ╱──────┘
          dx = (dx/dt) dt

   ds = √(dx² + dy²) = √((dx/dt)² + (dy/dt)²) · dt
\`\`\`

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

\`\`\`
              y
              │            P = (r, θ)
              │          ╱•
              │      r ╱  │
              │      ╱    │ y = r sinθ
              │    ╱  θ   │
       ───────┼──╱───────┴──── x
            O │     x = r cosθ
\`\`\`

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

ASCII ba đồ thị tiêu biểu (nhìn để có hình dung trước khi tính diện tích ở mục 4):

\`\`\`
   r = 2 (tròn)        r = 1+cosθ (cardioid)      r = cos2θ (hoa 4 cánh)
       ___                    _                          \\  |  /
     ╱     ╲               ╱╲╱ ╲                          \\ | /
    │   •   │             │  •  │ ◄ lõm về gốc       ─────  •  ─────
     ╲ ___ ╱               ╲   ╱   bên trái               / | \\
                            ╲_╱  ► nhọn ra phải          /  |  \\
   tâm tại gốc           "trái tim" nằm ngang       4 cánh dọc 2 trục
\`\`\`

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

\`\`\`
              r(θ)
            ╱─────╲
          ╱ │░░░░░ ╲       Mỗi miếng quạt:
         │  │░░░░░░ │       - góc mở dθ (rất nhỏ)
         │ θ│░dθ░░  │       - bán kính ≈ r(θ)
          ╲ │░░░░░ ╱        - gần như tam giác hẹp
       ────•──────         diện tích ≈ ½ · r · (r dθ) = ½ r² dθ
          gốc O
\`\`\`

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

### 5.1. Công thức và ASCII tam giác vuông

💡 **Trực giác.** Vẫn là Pythagoras như mục 2, nhưng diễn theo $\\theta$: khi $\\theta$ nhích một chút $d\\theta$, điểm vừa dịch **theo phương bán kính** một đoạn $dr$ (ra/vào gốc), vừa dịch **theo phương tiếp tuyến** (vuông góc bán kính) một đoạn $r\\,d\\theta$ (cung của đường tròn bán kính $r$ ứng góc $d\\theta$):

\`\`\`
                       ╱│
                 ds  ╱  │  r dθ   (dịch theo phương tiếp tuyến)
                   ╱    │
                 ╱──────┘
              dr   (dịch theo phương bán kính)

   ds = √( (dr)² + (r dθ)² ) = √( r² + (dr/dθ)² ) · dθ
\`\`\`

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
