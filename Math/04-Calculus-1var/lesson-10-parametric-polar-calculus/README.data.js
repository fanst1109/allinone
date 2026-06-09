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

---

## 1. Đường cong tham số — độ dốc dy/dx

💡 **Trực giác.** Coi $t$ là *thời gian*; $(x(t), y(t))$ là vị trí một điểm đang vẽ nên đường cong. Vận tốc ngang $\\frac{dx}{dt}$, vận tốc dọc $\\frac{dy}{dt}$. Độ dốc đường đi (hình học) = "dọc chia ngang":

$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} \\quad (dx/dt \\neq 0)$$

**Ví dụ số cụ thể (4 cái):**

1. Đường tròn $x = \\cos t, y = \\sin t$: $\\frac{dy}{dx} = \\cos t / (-\\sin t) = -\\cot t$. Tại $t = \\frac{\\pi}{4}$: $\\frac{dy}{dx} = -1$ (tiếp tuyến nghiêng $-45^\\circ$).
2. Parabola $x = t, y = t^2$: $\\frac{dy}{dx} = 2t/1 = 2t$ — đúng bằng $2x$ như mong đợi.
3. Ellipse $x = 2\\cos t, y = \\sin t$: $\\frac{dy}{dx} = \\cos t / (-2\\sin t)$. Tại $t = \\frac{\\pi}{2}$ (đỉnh trên): $\\frac{dy}{dx} = 0$ (tiếp tuyến ngang).
4. Cycloid $x = t - \\sin t, y = 1 - \\cos t$: $\\frac{dy}{dx} = \\sin t/(1 - \\cos t)$. Tại $t = \\pi$ (đỉnh vòm): $= 0$.

> ⚠ **Lỗi thường gặp.** $\\frac{dy}{dx} \\neq (d^2y/dt^2)/(d^2x/dt^2)$. Chỉ chia đạo hàm *bậc một*. Với đạo hàm bậc hai phải dùng $\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\div \\frac{dx}{dt}$.

---

## 2. Độ dài cung của đường cong tham số

💡 **Trực giác.** Quãng đường = tốc độ $\\times$ thời gian, cộng dồn. Tốc độ tức thời (định lý Pythagoras cho vận tốc) là $\\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}$. Cộng dồn từ $t=\\alpha$ tới $t=\\beta$:

$$L = \\int_{\\alpha}^{\\beta} \\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2 + \\left(\\tfrac{dy}{dt}\\right)^2}\\,dt$$

**Ví dụ số cụ thể (verify):**

1. Đường tròn đơn vị $x=\\cos t, y=\\sin t$, $t\\in[0,2\\pi]$: $x'=-\\sin t, y'=\\cos t$, $\\sqrt{\\sin^2+\\cos^2}=1$. $\\Rightarrow L = \\int_0^{2\\pi}1\\,dt = 2\\pi \\approx 6.283$ — đúng chu vi ✓.
2. **Cycloid** $x=t-\\sin t, y=1-\\cos t$, $t\\in[0,2\\pi]$ (vết một điểm trên vành bánh xe lăn): $x'=1-\\cos t, y'=\\sin t$. $x'^2+y'^2 = 2-2\\cos t = 4\\sin^2(t/2)$. $\\Rightarrow L = \\int_0^{2\\pi}2|\\sin(t/2)|\\,dt = 8$ — kết quả kinh điển, *không cần $\\pi$* ✓.
3. Đoạn thẳng $x=3t, y=4t$, $t\\in[0,1]$: $\\sqrt{9+16}=5$ $\\Rightarrow L = 5$ (đúng $\\sqrt{3^2+4^2}$).
4. Ellipse $x=2\\cos t, y=\\sin t$: $L = \\int_0^{2\\pi}\\sqrt{4\\sin^2 t+\\cos^2 t}\\,dt \\approx 9.6884$ — **không có công thức sơ cấp** (tích phân elliptic), phải tính số.

> ❓ **"Vì sao cycloid lại đúng bằng 8 mà không dính π?"** Vì $\\sqrt{2-2\\cos t}$ rút gọn được thành $2|\\sin(t/2)|$ nhờ công thức hạ bậc (xem [Trig L3](../../03-Trig-Complex/lesson-03-trig-identities/)) — tích phân ra số nguyên. Còn ellipse thì căn không rút gọn được → kẹt ở tích phân elliptic.

---

## 3. Toạ độ cực — mô tả bằng (r, θ)

💡 **Trực giác.** Thay vì "sang phải x, lên y", toạ độ cực nói "**quay góc θ, đi xa r**". Liên hệ:

$$x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\qquad r = \\sqrt{x^2+y^2},\\ \\ \\theta = \\operatorname{atan2}(y, x)$$

**Ví dụ số cụ thể (4 cái):**

1. $r = 2$ (hằng): mọi điểm cách gốc 2 → **đường tròn** bán kính 2.
2. $\\theta = \\frac{\\pi}{4}$ (hằng): mọi điểm cùng góc → **tia** nghiêng 45°.
3. $r = 1 + \\cos\\theta$: **cardioid** (hình trái tim) — $\\theta=0 \\to r=2$, $\\theta=\\pi \\to r=0$.
4. $r = \\cos(2\\theta)$: **hoa hồng 4 cánh** — $r$ dao động dương/âm tạo các cánh.

> ⚠ **Lỗi thường gặp.** Cùng một điểm có **nhiều** cặp $(r, \\theta)$ (vì $\\theta$ cộng $2\\pi$, hoặc $r$ âm + $\\theta$ thêm $\\pi$). Khi vẽ đường cong cực, cho $\\theta$ chạy đủ một chu kỳ của $r(\\theta)$ để không vẽ thiếu/thừa cánh.

---

## 4. Diện tích trong toạ độ cực

💡 **Trực giác.** Trong hệ Descartes ta cộng các *chữ nhật mảnh*; trong hệ cực ta cộng các **hình quạt mảnh**. Quạt góc $d\\theta$, bán kính $r$ có diện tích $\\frac{1}{2}r^2\\,d\\theta$ (diện tích quạt = $\\frac{1}{2}$ bán kính$^2 \\times$ góc). Cộng dồn:

$$A = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r(\\theta)^2 \\, d\\theta$$

**Ví dụ số cụ thể (verify):**

1. Đường tròn $r = a$: $A = \\frac{1}{2}\\int_0^{2\\pi}a^2\\,d\\theta = \\frac{1}{2}a^2\\cdot 2\\pi = \\pi a^2$ — đúng diện tích hình tròn ✓.
2. **Cardioid** $r = 1 + \\cos\\theta$: $A = \\frac{1}{2}\\int_0^{2\\pi}(1+\\cos\\theta)^2\\,d\\theta = \\frac{1}{2}\\int(1 + 2\\cos\\theta + \\cos^2\\theta)\\,d\\theta = \\frac{1}{2}(2\\pi + 0 + \\pi) = 3\\pi/2 \\approx 4.712$ ✓.
3. **Một cánh hoa hồng** $r = \\cos 2\\theta$ (cánh khi $\\theta\\in[-\\pi/4, \\pi/4]$): $A = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4}\\cos^2 2\\theta\\,d\\theta = \\pi/8 \\approx 0.3927$. Bốn cánh $\\to \\pi/2$.
4. Xoắn ốc $r = \\theta$, $\\theta\\in[0, 2\\pi]$: $A = \\frac{1}{2}\\int_0^{2\\pi}\\theta^2\\,d\\theta = \\frac{1}{2}\\cdot(2\\pi)^3/3 = 4\\pi^3/3 \\approx 41.34$.

> ❓ **"Sao là ½r² chứ không phải r²?"** Vì diện tích một hình quạt bán kính r, góc nhỏ dθ là $\\frac{1}{2}r^2\\,d\\theta$ (giống $\\frac{1}{2}\\cdot$đáy$\\cdot$cao của tam giác hẹp), không phải $r\\,d\\theta$ (cái đó là *độ dài cung*). Nhầm hai cái là lỗi phổ biến nhất ở phần này.

---

## 5. Độ dài cung trong toạ độ cực

Từ $x=r\\cos\\theta, y=r\\sin\\theta$ rồi áp công thức độ dài cung tham số (biến θ), rút gọn được:

$$L = \\int_{\\alpha}^{\\beta} \\sqrt{r^2 + \\left(\\tfrac{dr}{d\\theta}\\right)^2}\\,d\\theta$$

**Ví dụ:** cardioid $r = 1 + \\cos\\theta$: $\\frac{dr}{d\\theta} = -\\sin\\theta$, $r^2 + r'^2 = (1+\\cos\\theta)^2 + \\sin^2\\theta = 2 + 2\\cos\\theta = 4\\cos^2(\\theta/2)$. $\\Rightarrow L = \\int_0^{2\\pi}2|\\cos(\\theta/2)|\\,d\\theta = 8$.

> 📝 **Tóm tắt.** Tham số: $\\frac{dy}{dx} = (dy/dt)/(dx/dt)$, $L = \\int\\sqrt{x'^2+y'^2}\\,dt$. Cực: $A = \\frac{1}{2}\\int r^2\\,d\\theta$, $L = \\int\\sqrt{r^2+r'^2}\\,d\\theta$. Đường tròn/cycloid/cardioid/hoa hồng — thứ khó viết $y=f(x)$ — đều gọn gàng trong hai ngôn ngữ này.

---

## 6. Bài tập

1. Đường cong $x = t^2, y = t^3$. Tính $\\frac{dy}{dx}$ tại $t = 2$.
2. Tính độ dài đoạn $x = \\cos t, y = \\sin t$ với $t \\in [0, \\pi/2]$ (¼ đường tròn). Có khớp $2\\pi/4$ không?
3. Tính diện tích hình tròn $r = 3$ bằng công thức cực.
4. Tính diện tích **một cánh** hoa hồng $r = \\cos 2\\theta$.
5. Điểm Descartes $(-1, 1)$ có toạ độ cực $(r, \\theta)$ là gì?

## Lời giải chi tiết

**Bài 1.** $\\frac{dx}{dt} = 2t$, $\\frac{dy}{dt} = 3t^2$ $\\Rightarrow \\frac{dy}{dx} = 3t^2/(2t) = 3t/2$. Tại $t=2$: $= 3$.
*(Kiểm tra: khử t — $t = \\sqrt{x}$, $y = x^{3/2}$, $\\frac{dy}{dx} = (3/2)\\sqrt{x} = (3/2)\\cdot t = 3t/2$ ✓.)*

**Bài 2.** $x'=-\\sin t, y'=\\cos t$, $\\sqrt{\\sin^2+\\cos^2}=1$ $\\Rightarrow L = \\int_0^{\\pi/2}1\\,dt = \\pi/2 \\approx 1.5708$. Đúng bằng $2\\pi/4 = \\pi/2$ ✓ (¼ chu vi đường tròn đơn vị).

**Bài 3.** $A = \\frac{1}{2}\\int_0^{2\\pi}3^2\\,d\\theta = \\frac{1}{2}\\cdot 9\\cdot 2\\pi = 9\\pi \\approx 28.27$. Đúng $\\pi r^2 = \\pi\\cdot 9$ ✓.

**Bài 4.** Một cánh ứng với $\\theta \\in [-\\pi/4, \\pi/4]$ (nơi $\\cos 2\\theta \\ge 0$). $A = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4}\\cos^2 2\\theta\\,d\\theta$. Dùng $\\cos^2 u = (1+\\cos 2u)/2$ với $u=2\\theta$: $= \\frac{1}{4}\\int_{-\\pi/4}^{\\pi/4}(1+\\cos 4\\theta)\\,d\\theta = \\frac{1}{4}[\\theta + \\frac{1}{4}\\sin 4\\theta]_{-\\pi/4}^{\\pi/4} = \\frac{1}{4}[(\\pi/4 + 0) - (-\\pi/4 + 0)] = \\frac{1}{4}\\cdot(\\pi/2) = \\pi/8 \\approx 0.3927$.

**Bài 5.** $r = \\sqrt{(-1)^2 + 1^2} = \\sqrt{2}$. $\\theta = \\operatorname{atan2}(1, -1) = 3\\pi/4$ (góc phần tư thứ II). Vậy $(\\sqrt{2}, 3\\pi/4)$.

---

## 7. Code & Minh họa

- [visualization.html](./visualization.html) — 2 module tương tác: **vẽ đường cong tham số** (chọn đường tròn/ellipse/cycloid/Lissajous, animation theo t, hiện độ dài cung số & $\\frac{dy}{dx}$ tại điểm), và **diện tích cực** (chọn $r(\\theta)$: tròn/cardioid/hoa hồng/xoắn ốc, tô vùng + so $A = \\frac{1}{2}\\int r^2\\,d\\theta$ với công thức).

## 8. Kết thúc Tầng 4

- Đây là bài cuối của Tầng 4 — Giải tích 1 biến đã đủ bộ: giới hạn → đạo hàm → tích phân → kỹ thuật → tham số/cực.
- Tiếp theo: chuỗi & khai triển Taylor và phương trình vi phân ở [Math/06-Advanced](../../06-Advanced/) (L06, L07); hoặc giải tích nhiều biến (đạo hàm riêng, tích phân bội) ở [Math/06-Advanced/lesson-04](../../06-Advanced/lesson-04-multivariable-functions/), [lesson-05](../../06-Advanced/lesson-05-multiple-integrals/).
`;
