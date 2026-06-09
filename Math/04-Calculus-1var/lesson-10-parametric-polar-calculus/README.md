# Lesson 10 (T4) — Giải tích tham số & toạ độ cực

## Mục tiêu

- Làm giải tích trên đường cong cho dưới dạng **tham số** `(x(t), y(t))`: tính độ dốc `dy/dx` và **độ dài cung**.
- Làm giải tích trong **toạ độ cực** `r = r(θ)`: tính **diện tích** `½∫r²dθ` và độ dài cung cực.
- Hiểu vì sao nhiều đường cong (đường tròn, cycloid, cardioid, hoa hồng) *dễ mô tả* bằng tham số/cực hơn bằng `y = f(x)`.

## Kiến thức tiền đề

- [Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/) (độ dài cung `∫√(1+(dy/dx)²)dx`).
- [Lesson 09 — Kỹ thuật tính tích phân](../lesson-09-integration-techniques/) (để tính các tích phân nảy sinh).
- Toạ độ cực & dạng lượng giác: [Math/03-Trig-Complex/lesson-06-complex-polar-euler](../../03-Trig-Complex/lesson-06-complex-polar-euler/); conic: [Math/02-Geometry/lesson-06-coordinate-plane-conics](../../02-Geometry/lesson-06-coordinate-plane-conics/).

> 💡 **Vì sao cần bài này?** Không phải đường cong nào cũng là đồ thị `y = f(x)`. Đường tròn fail "test đường thẳng đứng" (mỗi x có 2 y). Quỹ đạo một hạt theo *thời gian*, cánh hoa, hình trái tim... mô tả tự nhiên hơn bằng **tham số** (x, y đều phụ thuộc một biến chạy t) hoặc **toạ độ cực** (khoảng cách r theo góc θ). Bài này đưa đạo hàm/tích phân vào hai ngôn ngữ đó.

---

## 1. Đường cong tham số — độ dốc dy/dx

💡 **Trực giác.** Coi `t` là *thời gian*; `(x(t), y(t))` là vị trí một điểm đang vẽ nên đường cong. Vận tốc ngang `dx/dt`, vận tốc dọc `dy/dt`. Độ dốc đường đi (hình học) = "dọc chia ngang":

$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt} \quad (dx/dt \neq 0)$$

**Ví dụ số cụ thể (4 cái):**

1. Đường tròn `x = cos t, y = sin t`: `dy/dx = cos t / (−sin t) = −cot t`. Tại `t = π/4`: `dy/dx = −1` (tiếp tuyến nghiêng −45°).
2. Parabola `x = t, y = t²`: `dy/dx = 2t/1 = 2t` — đúng bằng `2x` như mong đợi.
3. Ellipse `x = 2cos t, y = sin t`: `dy/dx = cos t / (−2sin t)`. Tại `t = π/2` (đỉnh trên): `dy/dx = 0` (tiếp tuyến ngang).
4. Cycloid `x = t − sin t, y = 1 − cos t`: `dy/dx = sin t/(1 − cos t)`. Tại `t = π` (đỉnh vòm): `= 0`.

> ⚠ **Lỗi thường gặp.** `dy/dx ≠ (d²y/dt²)/(d²x/dt²)`. Chỉ chia đạo hàm *bậc một*. Với đạo hàm bậc hai phải dùng `d²y/dx² = d/dt(dy/dx) ÷ (dx/dt)`.

---

## 2. Độ dài cung của đường cong tham số

💡 **Trực giác.** Quãng đường = tốc độ × thời gian, cộng dồn. Tốc độ tức thời (định lý Pythagoras cho vận tốc) là `√((dx/dt)² + (dy/dt)²)`. Cộng dồn từ `t=α` tới `t=β`:

$$L = \int_{\alpha}^{\beta} \sqrt{\left(\tfrac{dx}{dt}\right)^2 + \left(\tfrac{dy}{dt}\right)^2}\,dt$$

**Ví dụ số cụ thể (verify):**

1. Đường tròn đơn vị `x=cos t, y=sin t`, `t∈[0,2π]`: `x'=−sin t, y'=cos t`, `√(sin²+cos²)=1`. ⇒ `L = ∫₀^{2π}1\,dt = 2π ≈ 6.283` — đúng chu vi ✓.
2. **Cycloid** `x=t−sin t, y=1−cos t`, `t∈[0,2π]` (vết một điểm trên vành bánh xe lăn): `x'=1−cos t, y'=sin t`. `x'²+y'² = 2−2cos t = 4sin²(t/2)`. ⇒ `L = ∫₀^{2π}2|sin(t/2)|\,dt = 8` — kết quả kinh điển, *không cần π* ✓.
3. Đoạn thẳng `x=3t, y=4t`, `t∈[0,1]`: `√(9+16)=5` ⇒ `L = 5` (đúng `√(3²+4²)`).
4. Ellipse `x=2cos t, y=sin t`: `L = ∫₀^{2π}√(4sin²t+cos²t)\,dt ≈ 9.6884` — **không có công thức sơ cấp** (tích phân elliptic), phải tính số.

> ❓ **"Vì sao cycloid lại đúng bằng 8 mà không dính π?"** Vì `√(2−2cos t)` rút gọn được thành `2|sin(t/2)|` nhờ công thức hạ bậc (xem [Trig L3](../../03-Trig-Complex/lesson-03-trig-identities/)) — tích phân ra số nguyên. Còn ellipse thì căn không rút gọn được → kẹt ở tích phân elliptic.

---

## 3. Toạ độ cực — mô tả bằng (r, θ)

💡 **Trực giác.** Thay vì "sang phải x, lên y", toạ độ cực nói "**quay góc θ, đi xa r**". Liên hệ:

$$x = r\cos\theta, \quad y = r\sin\theta, \qquad r = \sqrt{x^2+y^2},\ \ \theta = \operatorname{atan2}(y, x)$$

**Ví dụ số cụ thể (4 cái):**

1. `r = 2` (hằng): mọi điểm cách gốc 2 → **đường tròn** bán kính 2.
2. `θ = π/4` (hằng): mọi điểm cùng góc → **tia** nghiêng 45°.
3. `r = 1 + cosθ`: **cardioid** (hình trái tim) — `θ=0 → r=2`, `θ=π → r=0`.
4. `r = cos(2θ)`: **hoa hồng 4 cánh** — `r` dao động dương/âm tạo các cánh.

> ⚠ **Lỗi thường gặp.** Cùng một điểm có **nhiều** cặp `(r, θ)` (vì θ cộng 2π, hoặc r âm + θ thêm π). Khi vẽ đường cong cực, cho θ chạy đủ một chu kỳ của `r(θ)` để không vẽ thiếu/thừa cánh.

---

## 4. Diện tích trong toạ độ cực

💡 **Trực giác.** Trong hệ Descartes ta cộng các *chữ nhật mảnh*; trong hệ cực ta cộng các **hình quạt mảnh**. Quạt góc `dθ`, bán kính `r` có diện tích `½r²dθ` (diện tích quạt = ½ bán kính² × góc). Cộng dồn:

$$A = \frac{1}{2}\int_{\alpha}^{\beta} r(\theta)^2 \, d\theta$$

**Ví dụ số cụ thể (verify):**

1. Đường tròn `r = a`: `A = ½∫₀^{2π}a²\,dθ = ½a²·2π = πa²` — đúng diện tích hình tròn ✓.
2. **Cardioid** `r = 1 + cosθ`: `A = ½∫₀^{2π}(1+cosθ)²\,dθ = ½∫(1 + 2cosθ + cos²θ)\,dθ = ½(2π + 0 + π) = 3π/2 ≈ 4.712` ✓.
3. **Một cánh hoa hồng** `r = cos2θ` (cánh khi `θ∈[−π/4, π/4]`): `A = ½∫_{−π/4}^{π/4}cos²2θ\,dθ = π/8 ≈ 0.3927`. Bốn cánh → `π/2`.
4. Xoắn ốc `r = θ`, `θ∈[0, 2π]`: `A = ½∫₀^{2π}θ²\,dθ = ½·(2π)³/3 = 4π³/3 ≈ 41.34`.

> ❓ **"Sao là ½r² chứ không phải r²?"** Vì diện tích một hình quạt bán kính r, góc nhỏ dθ là `½r²dθ` (giống ½·đáy·cao của tam giác hẹp), không phải `r·dθ` (cái đó là *độ dài cung*). Nhầm hai cái là lỗi phổ biến nhất ở phần này.

---

## 5. Độ dài cung trong toạ độ cực

Từ `x=r cosθ, y=r sinθ` rồi áp công thức độ dài cung tham số (biến θ), rút gọn được:

$$L = \int_{\alpha}^{\beta} \sqrt{r^2 + \left(\tfrac{dr}{d\theta}\right)^2}\,d\theta$$

**Ví dụ:** cardioid `r = 1 + cosθ`: `dr/dθ = −sinθ`, `r² + r'² = (1+cosθ)² + sin²θ = 2 + 2cosθ = 4cos²(θ/2)`. ⇒ `L = ∫₀^{2π}2|cos(θ/2)|\,dθ = 8`.

> 📝 **Tóm tắt.** Tham số: `dy/dx = (dy/dt)/(dx/dt)`, `L = ∫√(x'²+y'²)dt`. Cực: `A = ½∫r²dθ`, `L = ∫√(r²+r'²)dθ`. Đường tròn/cycloid/cardioid/hoa hồng — thứ khó viết `y=f(x)` — đều gọn gàng trong hai ngôn ngữ này.

---

## 6. Bài tập

1. Đường cong `x = t², y = t³`. Tính `dy/dx` tại `t = 2`.
2. Tính độ dài đoạn `x = cos t, y = sin t` với `t ∈ [0, π/2]` (¼ đường tròn). Có khớp `2π/4` không?
3. Tính diện tích hình tròn `r = 3` bằng công thức cực.
4. Tính diện tích **một cánh** hoa hồng `r = cos2θ`.
5. Điểm Descartes `(−1, 1)` có toạ độ cực `(r, θ)` là gì?

## Lời giải chi tiết

**Bài 1.** `dx/dt = 2t`, `dy/dt = 3t²` ⇒ `dy/dx = 3t²/(2t) = 3t/2`. Tại `t=2`: `= 3`.
*(Kiểm tra: khử t — `t = √x`, `y = x^{3/2}`, `dy/dx = (3/2)√x = (3/2)·t = 3t/2` ✓.)*

**Bài 2.** `x'=−sin t, y'=cos t`, `√(sin²+cos²)=1` ⇒ `L = ∫₀^{π/2}1\,dt = π/2 ≈ 1.5708`. Đúng bằng `2π/4 = π/2` ✓ (¼ chu vi đường tròn đơn vị).

**Bài 3.** `A = ½∫₀^{2π}3²\,dθ = ½·9·2π = 9π ≈ 28.27`. Đúng `πr² = π·9` ✓.

**Bài 4.** Một cánh ứng với `θ ∈ [−π/4, π/4]` (nơi `cos2θ ≥ 0`). `A = ½∫_{−π/4}^{π/4}cos²2θ\,dθ`. Dùng `cos²u = (1+cos2u)/2` với `u=2θ`: `= ¼∫_{−π/4}^{π/4}(1+cos4θ)\,dθ = ¼[θ + ¼sin4θ]_{−π/4}^{π/4} = ¼[(π/4 + 0) − (−π/4 + 0)] = ¼·(π/2) = π/8 ≈ 0.3927`.

**Bài 5.** `r = √((−1)² + 1²) = √2`. `θ = atan2(1, −1) = 3π/4` (góc phần tư thứ II). Vậy `(√2, 3π/4)`.

---

## 7. Code & Minh họa

- [visualization.html](./visualization.html) — 2 module tương tác: **vẽ đường cong tham số** (chọn đường tròn/ellipse/cycloid/Lissajous, animation theo t, hiện độ dài cung số & dy/dx tại điểm), và **diện tích cực** (chọn r(θ): tròn/cardioid/hoa hồng/xoắn ốc, tô vùng + so A = ½∫r²dθ với công thức).

## 8. Kết thúc Tầng 4

- Đây là bài cuối của Tầng 4 — Giải tích 1 biến đã đủ bộ: giới hạn → đạo hàm → tích phân → kỹ thuật → tham số/cực.
- Tiếp theo: chuỗi & khai triển Taylor và phương trình vi phân ở [Math/06-Advanced](../../06-Advanced/) (L06, L07); hoặc giải tích nhiều biến (đạo hàm riêng, tích phân bội) ở [Math/06-Advanced/lesson-04](../../06-Advanced/lesson-04-multivariable-functions/), [lesson-05](../../06-Advanced/lesson-05-multiple-integrals/).
