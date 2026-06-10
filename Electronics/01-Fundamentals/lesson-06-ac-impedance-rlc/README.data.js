// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/01-Fundamentals/lesson-06-ac-impedance-rlc/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Tín hiệu AC, Trở kháng & Mạch RLC

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được dạng tín hiệu xoay chiều (AC) dạng sin: biên độ, tần số, chu kỳ, pha.
- Tính được giá trị hiệu dụng (RMS) và hiểu vì sao điện lưới 220 V là RMS, không phải đỉnh.
- Tính được dung kháng Z_C và cảm kháng Z_L tại các tần số khác nhau.
- Nắm được trực giác lệch pha của tụ và cuộn cảm.
- Tính được tần số cộng hưởng f₀ cho mạch RLC nối tiếp và giải thích ứng dụng chọn đài radio.

## Kiến thức tiền đề

- [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — tụ điện, hằng số thời gian RC.
- [Lesson 05 — Cuộn cảm & Mạch RL](../lesson-05-inductor-rl/) — cuộn cảm, hằng số thời gian RL.
- [Toán — Lượng giác & Số phức](../../../Math/03-Trig-Complex/) — sin/cos, biểu diễn số phức (nếu muốn đi sâu).

---

## 1. Tín hiệu xoay chiều (AC)

### 1.1. Định nghĩa và phương trình

💡 **Trực giác trước**: hãy tưởng tượng bạn xoay một bánh xe — mỗi vòng quay tạo ra một chu kỳ. Điện áp AC chính là "hình chiếu" của chuyển động tròn đều lên trục thẳng đứng: đi lên rồi xuống đều đặn, không bao giờ dừng.

**Tín hiệu AC (xoay chiều)** là tín hiệu điện biến thiên tuần hoàn theo thời gian. Dạng phổ biến nhất là **dạng sin**:

$$v(t) = V_{\\text{peak}} \\cdot \\sin(2\\pi \\cdot f \\cdot t + \\phi)$$

trong đó:
- **$V_{\\text{peak}}$** (hay $V_m$) = biên độ đỉnh (V) — giá trị lớn nhất mà tín hiệu đạt được.
- **$f$** = tần số (Hz) — số chu kỳ hoàn chỉnh trong 1 giây.
- **$T = 1/f$** = chu kỳ (s) — thời gian cho 1 chu kỳ đầy đủ.
- **$\\phi$** = pha ban đầu (rad) — thường = 0 khi không có lệch pha.

**Vì sao dùng dạng sin?** Vì máy phát điện xoay chiều (alternator) hoạt động bằng nguyên lý cảm ứng điện từ khi cuộn dây quay trong từ trường đều → lực điện động sinh ra tự nhiên là hàm sin. Đây không phải quy ước tùy tiện mà là tính chất vật lý.

### 1.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Điện lưới gia đình Việt Nam**:
- $f = 50$ Hz → $T = 1/50 =$ **0.02 s = 20 ms**.
- Mỗi giây có 50 chu kỳ. Trong 1 ms, tín hiệu đi được 1/20 chu kỳ.

**Ví dụ 2 — Điện lưới Mỹ**:
- $f = 60$ Hz → $T = 1/60 \\approx$ **16.7 ms**.
- Thiết bị từ Mỹ sang Việt Nam dùng được vì điện tử hiện đại chịu 50–60 Hz; nhưng động cơ quay chậm hơn ~17%.

**Ví dụ 3 — Tín hiệu âm thanh (giọng nói)**:
- $f$ trải từ 80 Hz đến 8000 Hz. Ở 1000 Hz: $T = 1/1000 =$ **1 ms**.
- $v(t) = 1.5 \\cdot \\sin(2\\pi \\cdot 1000 \\cdot t)$ → mỗi 1 ms hoàn thành 1 dao động.

**Ví dụ 4 — Sóng radio FM**:
- $f \\approx 100$ MHz → $T = 1/(100 \\times 10^6) =$ **10 ns** (nanô giây).
- Dao động nhanh đến mức không thể nhìn thấy trên oscilloscope thông thường — cần oscilloscope GHz.

### 1.3. Biên độ và pha

Pha $\\phi$ phân biệt hai tín hiệu cùng tần số nhưng "lệch nhau về thời gian":
- $v_1(t) = 10 \\cdot \\sin(2\\pi \\cdot 50 \\cdot t)$: bắt đầu từ 0, lên đỉnh tại $t = T/4 = 5$ ms.
- $v_2(t) = 10 \\cdot \\sin(2\\pi \\cdot 50 \\cdot t + \\pi/2) = 10 \\cdot \\cos(2\\pi \\cdot 50 \\cdot t)$: bắt đầu từ 10 V, ngay lập tức.

$v_2$ **sớm pha** hơn $v_1$ một góc 90°.

❓ **Câu hỏi tự nhiên của người đọc**

> *"Tại sao phải quan tâm pha? Hai tín hiệu cùng biên độ cùng tần số, chỉ lệch thời gian một chút, có gì quan trọng?"*

Rất quan trọng! Khi 2 tín hiệu **cùng pha** → cộng nhau, biên độ gấp đôi. Khi **ngược pha** ($\\phi = 180°$) → triệt tiêu nhau = **bằng 0**. Đây là nguyên lý tai nghe chống ồn (noise-cancelling): vi mạch phát tín hiệu ngược pha với tiếng ồn → triệt tiêu. Cũng là lý do mạch lọc, mạch cộng hưởng, và mọi ứng dụng AC đều phải chú ý pha.

> *"ω và f khác nhau thế nào?"*

$\\omega = 2\\pi \\cdot f$ gọi là **tần số góc** (rad/s). Dùng $\\omega$ cho gọn trong toán: $\\sin(\\omega t)$ thay vì $\\sin(2\\pi f t)$. Ở $f = 50$ Hz: $\\omega = 2\\pi \\times 50 \\approx 314$ rad/s.

📝 **Tóm tắt mục 1**

- $v(t) = V_{\\text{peak}} \\cdot \\sin(2\\pi f t + \\phi)$. Tần số $f$ (Hz), chu kỳ $T = 1/f$, biên độ $V_{\\text{peak}}$, pha $\\phi$.
- Điện 50 Hz → $T = 20$ ms; âm thanh 1 kHz → $T = 1$ ms; FM 100 MHz → $T = 10$ ns.
- Pha quan trọng: cùng pha cộng, ngược pha triệt tiêu.

---

## 2. Giá trị hiệu dụng (RMS)

### 2.1. Định nghĩa — là gì, vì sao cần, ví dụ số

💡 **Trực giác**: nếu bạn muốn so sánh "độ nóng" của dòng AC và dòng DC qua cùng điện trở, không thể lấy biên độ đỉnh vì đỉnh chỉ đạt được trong thoáng qua. Cần một giá trị "tương đương DC" → đó là **RMS**.

**(a) Là gì**: RMS (Root Mean Square — căn bậc hai của trung bình bình phương) là giá trị điện áp AC tương đương với điện áp DC tạo ra **cùng công suất tiêu tán** trên cùng điện trở.

**(b) Vì sao cần**: công suất tiêu tán trên điện trở $R$ là $P = V^2/R$. Với AC, $V$ biến thiên liên tục → phải lấy **trung bình** của $V^2$ theo thời gian, rồi khai căn. Nếu chỉ lấy giá trị đỉnh, ta phóng đại công suất thực tế.

**(c) Công thức và ví dụ số**:

$$V_{\\text{rms}} = \\frac{V_{\\text{peak}}}{\\sqrt{2}} \\approx V_{\\text{peak}} \\times 0.707 \\qquad I_{\\text{rms}} = \\frac{I_{\\text{peak}}}{\\sqrt{2}}$$

**Chứng minh**: với $v(t) = V_{\\text{peak}} \\cdot \\sin(\\omega t)$:
- $V^2$ trung bình $= \\frac{1}{T} \\cdot \\int_0^T V_{\\text{peak}}^2 \\cdot \\sin^2(\\omega t)\\, dt = \\frac{V_{\\text{peak}}^2}{2}$ (vì trung bình của $\\sin^2 = 1/2$).
- $V_{\\text{rms}} = \\sqrt{\\dfrac{V_{\\text{peak}}^2}{2}} = \\dfrac{V_{\\text{peak}}}{\\sqrt{2}}$.

### 2.2. Bốn ví dụ số

**Ví dụ 1 — Điện lưới 220 V**:
- 220 V là **RMS**. $V_{\\text{peak}} = 220 \\times \\sqrt{2} \\approx$ **311 V**.
- Mỗi chu kỳ, điện áp dao động từ −311 V đến +311 V. Đồng hồ đo điện gia đình hiển thị 220 V (RMS), không phải 311 V.

**Ví dụ 2 — Tín hiệu âm thanh 1.4 V đỉnh**:
- $V_{\\text{rms}} = 1.4 / \\sqrt{2} =$ **0.99 V ≈ 1 V**.
- Nhà sản xuất ampli thường ghi công suất dựa trên $V_{\\text{rms}}$.

**Ví dụ 3 — Điện lưới 110 V (Mỹ)**:
- $V_{\\text{rms}} = 110$ V → $V_{\\text{peak}} = 110 \\times \\sqrt{2} \\approx$ **155.6 V**.

**Ví dụ 4 — Oscilloscope đo sóng sin 10 V đỉnh-đỉnh (peak-to-peak)**:
- $V_{\\text{peak-to-peak}} = 10$ V → $V_{\\text{peak}} = 5$ V → $V_{\\text{rms}} = 5/\\sqrt{2} \\approx$ **3.54 V**.
- Chú ý: "10 V p-p" ≠ "10 V đỉnh" ≠ "10 V RMS" — 3 giá trị khác nhau!

⚠ **Lỗi thường gặp**

> Nhiều người dùng $V_{\\text{peak}}$ thay cho $V_{\\text{rms}}$ khi tính công suất.

Ví dụ sai: "220 V điện lưới, $R = 100$ Ω → $P = 220^2/100 = 484$ W" — đây sai vì 311 V là đỉnh, không dùng liên tục.
Đúng: $P = V_{\\text{rms}}^2/R = 220^2/100 =$ **484 W** — trùng số nhưng đúng vì 220 đã là RMS!

Ví dụ phản chứng thật sự sai: "$V_{\\text{peak}} = 311$ V, $R = 100$ Ω → $P = 311^2/100 = 967$ W" — tính bằng đỉnh thì kết quả SAI, gấp đôi thực tế.

🔁 **Dừng lại tự kiểm tra**

Điện lưới Nhật: $f = 50$ Hz, $V_{\\text{rms}} = 100$ V. Tính $V_{\\text{peak}}$ và $T$.

<details>
<summary>Đáp án</summary>

- $V_{\\text{peak}} = 100 \\times \\sqrt{2} \\approx$ **141.4 V**.
- $T = 1/50 =$ **20 ms** (cùng với Việt Nam).

</details>

📝 **Tóm tắt mục 2**

- $V_{\\text{rms}} = V_{\\text{peak}}/\\sqrt{2} \\approx 0.707 \\times V_{\\text{peak}}$.
- 220 V điện lưới là RMS → đỉnh thực tế ≈ 311 V.
- Công suất tính bằng $V_{\\text{rms}}$: $P = V_{\\text{rms}}^2 / R = V_{\\text{rms}} \\times I_{\\text{rms}}$.
- "V đỉnh", "V đỉnh-đỉnh", "V_rms" là 3 đại lượng khác nhau — không nhầm lẫn.

---

## 3. Trở kháng (Impedance) Z

### 3.1. Định nghĩa — mở rộng điện trở cho AC

💡 **Trực giác**: điện trở R "cản trở" dòng điện theo nguyên lý Ohm. Với AC, tụ điện và cuộn cảm cũng "cản" dòng — nhưng mức cản phụ thuộc vào **tần số**. Trở kháng Z là khái niệm chung hóa điện trở cho AC.

**(a) Là gì**: **Trở kháng Z** (impedance) đo tổng khả năng cản trở dòng điện xoay chiều của linh kiện, tính bằng Ω. Với AC:

$$V_{\\text{rms}} = Z \\times I_{\\text{rms}} \\quad \\text{(tương tự } V = I \\cdot R \\text{ nhưng dùng } Z\\text{)}$$

**(b) Vì sao cần**: điện trở $R$ không phụ thuộc tần số. Nhưng tụ và cuộn cảm có khả năng cản trở thay đổi theo tần số → cần đại lượng mới $Z$ để mô tả đúng.

**(c) Về mặt toán học đầy đủ** (số phức, xem [Math/03-Trig-Complex](../../../Math/03-Trig-Complex/)): $Z$ là số phức $Z = R + jX$, trong đó $X$ là phần kháng. Trong bài này tập trung vào **độ lớn $|Z|$** đủ để tính toán thực tế.

### 3.2. Dung kháng (Capacitive Reactance) Z_C

$$Z_C = \\frac{1}{2\\pi \\cdot f \\cdot C}$$

- Tần số **cao** → $Z_C$ **nhỏ** → tụ dẫn điện tốt (**thông cao**).
- Tần số **thấp** → $Z_C$ **lớn** → tụ cản dòng (**chặn thấp**).
- Tần số **DC ($f = 0$)** → $Z_C = \\infty$ → tụ **không dẫn DC** (ngắt mạch hoàn toàn).

💡 **Analogy**: tụ điện giống cánh cửa có lò xo. DC nhấn nhẹ → lò xo kháng lại, cửa không mở (tụ chặn DC). AC đẩy qua lại nhanh → lò xo kịp phản hồi, dòng "chạy xuyên qua" (thực ra là điện tích nạp-xả liên tục). Tần số càng cao, lò xo kịp đáp ứng hơn → $Z_C$ giảm.

**Bốn ví dụ số — tụ $C = 10$ µF $= 10 \\times 10^{-6}$ F**:

| Tần số f | Tính Z_C | Kết quả |
|----------|----------|---------|
| $f = 50$ Hz (điện lưới) | $\\dfrac{1}{2\\pi \\times 50 \\times 10 \\times 10^{-6}}$ | **318.3 Ω** |
| $f = 1$ kHz | $\\dfrac{1}{2\\pi \\times 1000 \\times 10 \\times 10^{-6}}$ | **15.9 Ω** |
| $f = 10$ kHz | $\\dfrac{1}{2\\pi \\times 10000 \\times 10 \\times 10^{-6}}$ | **1.59 Ω** |
| $f = 100$ kHz | $\\dfrac{1}{2\\pi \\times 100000 \\times 10 \\times 10^{-6}}$ | **0.159 Ω** |

Walk-through tại $f = 1$ kHz: $Z_C = \\dfrac{1}{2 \\times 3.14159 \\times 1000 \\times 0.00001} = \\dfrac{1}{0.06283} =$ **15.92 Ω**. Tại tần số này, tụ 10 µF cản dòng như điện trở 15.9 Ω.

### 3.3. Cảm kháng (Inductive Reactance) Z_L

$$Z_L = 2\\pi \\cdot f \\cdot L$$

- Tần số **cao** → $Z_L$ **lớn** → cuộn cản mạnh (**chặn cao**).
- Tần số **thấp** → $Z_L$ **nhỏ** → cuộn dẫn tốt (**thông thấp**).
- Tần số **DC ($f = 0$)** → $Z_L = 0$ → cuộn chỉ là **dây dẫn thuần** (chỉ có $R_{\\text{DC}}$ nhỏ).

💡 **Analogy**: cuộn cảm giống bánh đà (flywheel) — thay đổi dòng điện chậm (tần số thấp) thì "bánh đà" kịp quay theo, dòng qua được. Thay đổi nhanh (tần số cao) → bánh đà không kịp đổi chiều → cản mạnh.

**Bốn ví dụ số — cuộn $L = 10$ mH $= 0.01$ H**:

| Tần số f | Tính Z_L | Kết quả |
|----------|----------|---------|
| $f = 50$ Hz | $2\\pi \\times 50 \\times 0.01$ | **3.14 Ω** |
| $f = 1$ kHz | $2\\pi \\times 1000 \\times 0.01$ | **62.8 Ω** |
| $f = 10$ kHz | $2\\pi \\times 10000 \\times 0.01$ | **628 Ω** |
| $f = 100$ kHz | $2\\pi \\times 100000 \\times 0.01$ | **6,283 Ω** |

Walk-through tại $f = 10$ kHz: $Z_L = 2 \\times 3.14159 \\times 10000 \\times 0.01 = 2 \\times 3.14159 \\times 100 =$ **628.3 Ω**. Cuộn cảm 10 mH hoạt động như điện trở 628 Ω ở tần số này.

❓ **Câu hỏi tự nhiên của người đọc**

> *"Tụ 'thông cao chặn thấp', cuộn 'thông thấp chặn cao' — có thể dùng 2 điều này để xây bộ lọc không?"*

Chính xác! Đây là nền tảng của [Lesson 07 — Bộ lọc](../lesson-07-filters/). Ghép tụ + điện trở (hoặc cuộn + điện trở) theo thứ tự sẽ cho ra bộ lọc thông thấp (low-pass) hoặc thông cao (high-pass).

> *"Z_C và Z_L có đơn vị Ω không?"*

Có, đơn vị Ω như điện trở thông thường. Nhưng khác điện trở ở chỗ: $Z_C$ và $Z_L$ không tiêu tán năng lượng thành nhiệt — chúng **tích trữ** và **trả lại** năng lượng theo chu kỳ (điện trường trong tụ, từ trường trong cuộn).

> *"Tại sao không dùng điện trở thường thay cho tụ hoặc cuộn trong bộ lọc?"*

Điện trở tiêu tán năng lượng tạo nhiệt và suy giảm tín hiệu. Tụ + cuộn lọc tần số mà **không tiêu tán** (lý thuyết) — hiệu quả hơn nhiều cho bộ lọc.

⚠ **Lỗi thường gặp**

> Nhầm giữa $Z_C$ tỉ lệ nghịch $f$ và $Z_L$ tỉ lệ thuận $f$.

Cách nhớ: **C**apacitor — **C** ngược (tần số cao, $Z_C$ nhỏ). **L**inductor — L **lớn** (tần số cao, $Z_L$ lớn).

📝 **Tóm tắt mục 3**

- $Z_C = 1/(2\\pi f C)$: giảm khi $f$ tăng → tụ thông cao, chặn thấp.
- $Z_L = 2\\pi f L$: tăng khi $f$ tăng → cuộn thông thấp, chặn cao.
- Cả hai đơn vị Ω nhưng không tiêu tán năng lượng.
- DC: $Z_C = \\infty$ (tụ hở mạch), $Z_L = 0$ (cuộn ngắn mạch).

---

## 4. Lệch pha trong mạch AC

### 4.1. Ba trường hợp lệch pha

💡 **Trực giác**: điện trở giống đường thẳng — dòng và áp cùng hướng cùng lúc. Tụ điện giống nước đổ vào bình — dòng nước vào (dòng điện) bắt đầu trước khi bình đầy (áp tăng), nên dòng sớm hơn áp. Cuộn cảm giống quán tính — dòng bị "trì hoãn" so với áp.

| Linh kiện | Dòng so với áp | Pha |
|-----------|---------------|-----|
| Điện trở R | Cùng pha | $\\phi = 0°$ |
| Tụ điện C | Dòng **sớm** hơn áp 90° | $i(t) = I_{\\text{peak}} \\cdot \\sin(\\omega t + 90°)$ khi $v(t) = V_{\\text{peak}} \\cdot \\sin(\\omega t)$ |
| Cuộn cảm L | Dòng **trễ** hơn áp 90° | $i(t) = I_{\\text{peak}} \\cdot \\sin(\\omega t - 90°)$ khi $v(t) = V_{\\text{peak}} \\cdot \\sin(\\omega t)$ |

**Ghi nhớ**: "**ICE**": trong tụ (**C**apacitor), dòng (**I**) sớm hơn (**E**lectromotive force/áp); "**ELI**": trong cuộn (**L**), áp (**E**) sớm hơn dòng (**I**).

### 4.2. Giải thích vật lý

**Tụ điện — dòng sớm pha**:
- $q = C \\cdot v$ → $i = dq/dt = C \\cdot dv/dt$.
- Khi $v$ đang tăng nhanh nhất ($v = 0$, đang lên) → $dv/dt$ cực đại → $i$ cực đại.
- Khi $v$ đạt đỉnh → $dv/dt = 0$ → $i = 0$.
- Kết quả: $i$ đạt đỉnh trước $v$ một khoảng $T/4 = 90°$.

**Cuộn cảm — dòng trễ pha**:
- $v = L \\cdot di/dt$ → $di/dt = v/L$.
- Khi $v$ đạt đỉnh → $di/dt$ cực đại → $i$ đang tăng nhanh nhất (chưa đến đỉnh).
- Dòng $i$ đạt đỉnh muộn hơn áp một khoảng $T/4 = 90°$.

### 4.3. Liên kết số phức (mức trực giác)

Trong biểu diễn số phức (phasor, xem [Math/03-Trig-Complex](../../../Math/03-Trig-Complex/)):
- $Z_C = 1/(j\\omega C)$ → $j$ ở mẫu → lệch −90° (dòng sớm áp 90°).
- $Z_L = j\\omega L$ → $j$ ở tử → lệch +90° (dòng trễ áp 90°).
- $Z_R = R$ → không có $j$ → không lệch pha.

Trong bài này, ta **chỉ dùng độ lớn** $|Z_C| = 1/(\\omega C)$ và $|Z_L| = \\omega L$ để tính toán thực tế.

📝 **Tóm tắt mục 4**

- Điện trở: i và v cùng pha.
- Tụ điện: i sớm v 90° (ICE).
- Cuộn cảm: i trễ v 90° (ELI).
- Lệch pha ảnh hưởng đến cách cộng áp trong mạch AC.

---

## 5. Mạch RLC nối tiếp và Cộng hưởng

### 5.1. Tổng trở mạch RLC nối tiếp

💡 **Trực giác**: trong mạch DC có $R_1 + R_2$ nối tiếp thì $R_{\\text{tổng}} = R_1 + R_2$. Với AC và RLC nối tiếp, không thể cộng thẳng vì $Z_C$ và $Z_L$ **ngược chiều pha nhau** (−90° và +90°). Chúng "triệt tiêu nhau" một phần → tổng trở nhỏ hơn tổng số học.

**Tổng trở mạch RLC nối tiếp**:

$$|Z_{\\text{tổng}}| = \\sqrt{R^2 + (Z_L - Z_C)^2}$$

Trong đó:
- $Z_L = 2\\pi f L$ (cảm kháng, tỉ lệ thuận $f$).
- $Z_C = 1/(2\\pi f C)$ (dung kháng, tỉ lệ nghịch $f$).
- Phần $(Z_L - Z_C)$ là **phần kháng thuần** (net reactance).

### 5.2. Cộng hưởng — khi Z_L = Z_C

**Tần số cộng hưởng f₀** xảy ra khi $Z_L = Z_C$:

$$\\begin{aligned}
2\\pi f_0 L &= \\frac{1}{2\\pi f_0 C} \\\\
f_0^2 &= \\frac{1}{4\\pi^2 LC} \\\\
f_0 &= \\frac{1}{2\\pi\\sqrt{LC}}
\\end{aligned}$$

**Tại tần số cộng hưởng**:
- $Z_L = Z_C$ → phần kháng triệt tiêu nhau.
- $|Z_{\\text{tổng}}| = \\sqrt{R^2 + 0^2} =$ **R** (nhỏ nhất có thể).
- Dòng điện **cực đại**: $I = V/R$ (không bị cản bởi $Z_L$ hay $Z_C$).
- Mạch "bắt sóng" cực nhạy tại đúng $f_0$.

💡 **Ý nghĩa vật lý**: $Z_L$ tăng khi $f$ tăng, $Z_C$ giảm khi $f$ tăng. Có đúng một điểm $f_0$ nơi hai đường cong giao nhau → $Z_L = Z_C$. Tại đó, cuộn và tụ trao đổi năng lượng qua lại với nhau (như con lắc trao đổi KE ↔ PE), mạch đạt cộng hưởng. Điện trở $R$ là thứ duy nhất tiêu tán năng lượng.

### 5.3. Walk-through số — Tính f₀

**Cho: $L = 100$ µH $= 100 \\times 10^{-6}$ H, $C = 1$ nF $= 1 \\times 10^{-9}$ F**

Bước 1: tính $LC$:
$$LC = 100 \\times 10^{-6} \\times 1 \\times 10^{-9} = 100 \\times 10^{-15} = 10^{-13} \\;(\\text{H} \\cdot \\text{F} = \\text{s}^2)$$

Bước 2: $\\sqrt{LC}$:
$$\\sqrt{10^{-13}} = 10^{-6.5} \\approx 3.162 \\times 10^{-7} \\text{ s}$$

Bước 3: $f_0 = 1/(2\\pi \\times 3.162 \\times 10^{-7})$:
$$\\begin{aligned}
f_0 &= \\frac{1}{6.2832 \\times 3.162 \\times 10^{-7}} \\\\
&= \\frac{1}{1.987 \\times 10^{-6}} \\\\
&\\approx 503{,}300 \\text{ Hz} \\approx 503 \\text{ kHz}
\\end{aligned}$$

**Kiểm tra**: tần số đài phát thanh AM ở Việt Nam (530–1600 kHz). Với $L = 100$ µH, $C = 1$ nF → mạch bắt sóng ở 503 kHz → dải AM! Nếu muốn bắt 1000 kHz: giải ra $C = 1/(4\\pi^2 f^2 L) = 1/(4\\pi^2 \\times 10^{12} \\times 10^{-4}) \\approx 0.253$ nF.

**Ví dụ 2 — $L = 1$ mH, $C = 100$ pF**:
$$\\begin{aligned}
LC &= 10^{-3} \\times 100 \\times 10^{-12} = 10^{-13} \\\\
f_0 &\\approx 503 \\text{ kHz} \\quad \\text{(trùng ví dụ 1 vì } LC \\text{ bằng nhau!)}
\\end{aligned}$$

**Ví dụ 3 — $L = 10$ µH, $C = 10$ µF**:
$$\\begin{aligned}
LC &= 10 \\times 10^{-6} \\times 10 \\times 10^{-6} = 10^{-10} \\\\
\\sqrt{LC} &\\approx 10^{-5} \\\\
f_0 &= \\frac{1}{2\\pi \\times 10^{-5}} \\approx 15{,}915 \\text{ Hz} \\approx 15.9 \\text{ kHz (dải âm thanh cao)}
\\end{aligned}$$

### 5.4. Ứng dụng: chọn đài radio (tuning)

Máy thu radio có mạch LC với tụ **xoay** (variable capacitor). Khi bạn vặn núm điều chỉnh:
- $C$ thay đổi → $f_0 = 1/(2\\pi\\sqrt{LC})$ thay đổi.
- Khi $f_0$ = tần số đài phát thanh mong muốn → mạch cộng hưởng → dòng cực đại → tín hiệu đài đó được khuếch đại.
- Tần số khác → mạch không cộng hưởng → bị suy giảm mạnh.

Đây là lý do "chỉnh đài radio" — thực chất là điều chỉnh $f_0$ của mạch LC để khớp tần số đài muốn nghe.

❓ **Câu hỏi tự nhiên của người đọc**

> *"Nếu không có R (R = 0), tại cộng hưởng I = V/0 = ∞? Điều này có xảy ra không?"*

Trong lý thuyết, $R = 0$ cho $I = \\infty$. Thực tế: cuộn cảm luôn có điện trở dây quấn $R_{\\text{DC}}$ (vài Ω đến vài chục Ω). Tụ cũng có ESR (equivalent series resistance). Nên $R_{\\text{thực}} = R_{\\text{DC}} + \\text{ESR} > 0$. Cộng hưởng thực tế cho $I$ rất lớn nhưng hữu hạn. Hệ số $Q = Z_L(f_0)/R$ đo "độ sắc nét" của cộng hưởng — $Q$ cao ($R$ nhỏ) → đỉnh cộng hưởng sắc, chọn đài rõ hơn.

> *"Nếu L và C như nhau nhưng R khác, f₀ có thay đổi không?"*

$f_0 = 1/(2\\pi\\sqrt{LC})$ không phụ thuộc $R$. $R$ chỉ ảnh hưởng biên độ đỉnh và độ rộng dải thông ($\\text{bandwidth} = f_0/Q = R/(2\\pi L)$).

🔁 **Dừng lại tự kiểm tra**

Tính $f_0$ khi $L = 500$ µH và $C = 200$ pF. Mạch này hoạt động ở dải sóng nào (AM 530–1600 kHz, FM 87–108 MHz, hay khác)?

<details>
<summary>Đáp án</summary>

- $LC = 500 \\times 10^{-6} \\times 200 \\times 10^{-12} = 10^{-13}$ H·F.
- $\\sqrt{LC} = \\sqrt{10^{-13}} \\approx 3.162 \\times 10^{-7}$ s.
- $f_0 = 1/(2\\pi \\times 3.162 \\times 10^{-7}) \\approx$ **503 kHz** → dải AM!

($LC = 10^{-13}$ cho $f_0 \\approx 503$ kHz bất kể chọn $L, C$ cụ thể nào, chỉ cần tích $LC$ bằng nhau.)

</details>

📝 **Tóm tắt mục 5**

- $|Z_{\\text{RLC}}| = \\sqrt{R^2 + (Z_L - Z_C)^2}$.
- Cộng hưởng tại $f_0 = 1/(2\\pi\\sqrt{LC})$: $Z_L = Z_C$, $|Z_{\\text{tổng}}| = R$ (cực tiểu), dòng cực đại.
- $f_0$ chỉ phụ thuộc $L$ và $C$; $R$ ảnh hưởng độ sắc nét (hệ số $Q$).
- Ứng dụng trực tiếp: chọn đài radio bằng tụ xoay.

---

## 6. Bài tập

**Bài 1**: Điện lưới tại nhà bạn là 220 V, $f = 50$ Hz. Tính:
  - (a) $V_{\\text{peak}}$
  - (b) chu kỳ $T$
  - (c) giá trị $v(t)$ tại $t = 2.5$ ms (kể từ lúc $t = 0$ khi $v = 0$ đang tăng)

**Bài 2**: Tụ $C = 47$ µF nối vào nguồn AC $f = 100$ Hz. Tính $Z_C$. Nếu áp đặt vào là 12 V RMS, tính $I_{\\text{rms}}$ qua tụ.

**Bài 3**: Cuộn $L = 5$ mH. Tính $Z_L$ tại:
  - (a) $f = 1$ kHz
  - (b) $f = 50$ kHz
  - (c) $f = 1$ MHz

**Bài 4**: Mạch RLC nối tiếp: $R = 100$ Ω, $L = 10$ mH, $C = 1$ µF. Tính $f_0$ cộng hưởng. Tại $f_0$, tính $Z_L$ và $Z_C$ để kiểm tra $Z_L = Z_C$.

**Bài 5**: Máy thu radio AM cần bắt sóng ở $f = 900$ kHz. Cuộn cảm có $L = 200$ µH. Tụ xoay cần chỉnh đến giá trị $C$ bao nhiêu?

**Bài 6**: Tụ $C = 100$ nF. Tại tần số nào thì $Z_C = 1$ kΩ? Tại tần số đó, $Z_C$ bằng bao nhiêu so với một điện trở $R = 1$ kΩ (về mức cản dòng)?

---

## Lời giải chi tiết

### Bài 1

**(a) $V_{\\text{peak}}$**:
$$V_{\\text{peak}} = V_{\\text{rms}} \\times \\sqrt{2} = 220 \\times 1.4142 \\approx \\textbf{311.1 V}$$

**(b) Chu kỳ $T$**:
$$T = 1/f = 1/50 = 0.02 \\text{ s} = \\textbf{20 ms}$$

**(c) $v(t)$ tại $t = 2.5$ ms**:
$$\\begin{aligned}
v(t) &= 311.1 \\times \\sin(2\\pi \\times 50 \\times 0.0025) \\\\
&= 311.1 \\times \\sin(2\\pi \\times 0.125) \\\\
&= 311.1 \\times \\sin(\\pi/4) \\\\
&= 311.1 \\times 0.7071 \\\\
&\\approx \\textbf{220.0 V}
\\end{aligned}$$
Kết quả thú vị: tại $t = T/8 = 2.5$ ms, $v = V_{\\text{peak}}/\\sqrt{2} = V_{\\text{rms}} = 220$ V. Điện áp tức thời bằng đúng giá trị RMS!

### Bài 2

**Tính $Z_C$**:
$$\\begin{aligned}
Z_C &= \\frac{1}{2\\pi \\times 100 \\times 47 \\times 10^{-6}} \\\\
&= \\frac{1}{2 \\times 3.14159 \\times 100 \\times 0.000047} \\\\
&= \\frac{1}{0.02953} \\approx \\textbf{33.9 Ω}
\\end{aligned}$$

**Tính $I_{\\text{rms}}$**:
$$I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{Z_C} = \\frac{12}{33.9} \\approx 0.354 \\text{ A} = \\textbf{354 mA}$$

### Bài 3

**$Z_L = 2\\pi f L$ với $L = 5$ mH $= 0.005$ H**:

**(a) $f = 1$ kHz**:
$$Z_L = 2\\pi \\times 1000 \\times 0.005 = 2 \\times 3.14159 \\times 5 = \\textbf{31.4 Ω}$$

**(b) $f = 50$ kHz**:
$$Z_L = 2\\pi \\times 50000 \\times 0.005 = 2 \\times 3.14159 \\times 250 = \\textbf{1,571 Ω}$$

**(c) $f = 1$ MHz**:
$$Z_L = 2\\pi \\times 1000000 \\times 0.005 = 2 \\times 3.14159 \\times 5000 = 31{,}416 \\text{ Ω} \\approx \\textbf{31.4 kΩ}$$

Nhận xét: tần số tăng 1000× (từ 1 kHz lên 1 MHz) → $Z_L$ tăng **đúng 1000×** (tỉ lệ thuận).

### Bài 4

**Tính $f_0$** ($L = 10$ mH $= 0.01$ H, $C = 1$ µF $= 10^{-6}$ F):
$$\\begin{aligned}
LC &= 0.01 \\times 10^{-6} = 10^{-8} \\\\
\\sqrt{LC} &= 10^{-4} \\text{ s} \\\\
f_0 &= \\frac{1}{2\\pi \\times 10^{-4}} = \\frac{1}{6.2832 \\times 10^{-4}} \\approx 1591.5 \\text{ Hz} \\approx \\textbf{1.59 kHz}
\\end{aligned}$$

**Kiểm tra $Z_L = Z_C$ tại $f_0$**:
$$\\begin{aligned}
Z_L &= 2\\pi \\times 1591.5 \\times 0.01 = 100.0 \\text{ Ω} \\\\
Z_C &= \\frac{1}{2\\pi \\times 1591.5 \\times 10^{-6}} = \\frac{1}{0.01} = 100.0 \\text{ Ω} \\quad\\checkmark
\\end{aligned}$$

Đúng: $Z_L = Z_C = 100$ Ω. Trùng hợp thú vị: ở bài này $Z_L = Z_C = R = 100$ Ω → hệ số $Q = Z_L/R = 1$ (cộng hưởng yếu).

### Bài 5

**Tính $C$ khi $f_0 = 900$ kHz $= 900 \\times 10^3$ Hz, $L = 200$ µH $= 200 \\times 10^{-6}$ H**:

Từ $f_0 = 1/(2\\pi\\sqrt{LC})$:
$$\\begin{aligned}
\\sqrt{LC} &= \\frac{1}{2\\pi \\times f_0} = \\frac{1}{2\\pi \\times 900000} = \\frac{1}{5654867} \\approx 1.768 \\times 10^{-7} \\text{ s} \\\\
LC &= (1.768 \\times 10^{-7})^2 = 3.126 \\times 10^{-14} \\text{ H} \\cdot \\text{F} \\\\
C &= \\frac{LC}{L} = \\frac{3.126 \\times 10^{-14}}{200 \\times 10^{-6}} = \\frac{3.126 \\times 10^{-14}}{2 \\times 10^{-4}} = 1.563 \\times 10^{-10} \\text{ F} \\approx 156.3 \\text{ pF}
\\end{aligned}$$

Vậy tụ xoay cần chỉnh đến **$C \\approx 156$ pF** để bắt sóng 900 kHz.

### Bài 6

**Tính $f$ khi $Z_C = 1$ kΩ $= 1000$ Ω** ($C = 100$ nF $= 10^{-7}$ F):

$$\\begin{aligned}
Z_C &= \\frac{1}{2\\pi f C} = 1000 \\\\
f &= \\frac{1}{2\\pi \\times 1000 \\times 10^{-7}} = \\frac{1}{2\\pi \\times 10^{-4}} = \\frac{1}{0.0006283} \\approx 1591.5 \\text{ Hz} \\approx 1.59 \\text{ kHz}
\\end{aligned}$$

So sánh: tại $f = 1.59$ kHz, $Z_C = 1$ kΩ **giống hệt** điện trở $R = 1$ kΩ về độ lớn cản dòng. Khác nhau: điện trở tiêu tán năng lượng thành nhiệt ($P = V^2/R$); tụ tích trữ và trả lại năng lượng, **không tiêu tán** ($P_{\\text{trung bình}} = 0$ cho tụ lý tưởng). Và dòng qua tụ sớm pha 90° so với áp, trong khi qua R thì cùng pha.

---

## Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 05 — Cuộn cảm & Mạch RL](../lesson-05-inductor-rl/) — cảm ứng điện từ, hằng số thời gian RL.
- **Bài tiếp theo**: [Lesson 07 — Bộ lọc (Filters)](../lesson-07-filters/) — ứng dụng trực tiếp Z_C và Z_L để xây bộ lọc RC, RL, RLC.
- **Toán liên quan**: [Số phức & Lượng giác](../../../Math/03-Trig-Complex/) — biểu diễn phasor đầy đủ để phân tích mạch AC tổng quát.

---

## 📝 Tổng kết Lesson 06

1. **Tín hiệu AC**: $v(t) = V_{\\text{peak}} \\cdot \\sin(2\\pi f t + \\phi)$. Điện lưới 50 Hz → $T = 20$ ms.
2. **RMS**: $V_{\\text{rms}} = V_{\\text{peak}}/\\sqrt{2}$. Điện 220 V là RMS → đỉnh ≈ 311 V. Tính công suất bằng $V_{\\text{rms}}$.
3. **Dung kháng** $Z_C = 1/(2\\pi f C)$: tụ thông cao, chặn DC hoàn toàn.
4. **Cảm kháng** $Z_L = 2\\pi f L$: cuộn thông thấp, ngắn mạch tại DC.
5. **Lệch pha**: tụ → dòng sớm 90° (ICE); cuộn → dòng trễ 90° (ELI); điện trở → cùng pha.
6. **Cộng hưởng RLC**: $f_0 = 1/(2\\pi\\sqrt{LC})$, $|Z| = R$ (cực tiểu), ứng dụng chọn đài radio.

**Tiếp theo**: [Lesson 07 — Bộ lọc](../lesson-07-filters/)
`;
