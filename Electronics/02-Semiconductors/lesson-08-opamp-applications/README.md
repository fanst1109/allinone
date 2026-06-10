# Lesson 08 — Op-amp ứng dụng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tính $V_{\text{out}}$ của mạch cộng (summing amplifier) với nhiều đầu vào và kháng trở (resistor) khác nhau.
- Tính $V_{\text{out}}$ của mạch trừ / khuếch đại vi sai (difference amplifier) và giải thích vì sao loại được nhiễu chung (common-mode noise).
- Mô tả quan hệ $V_{\text{out}} = -(1/RC)\int V_{in}\,dt$ của mạch tích phân (integrator) và tạo sóng tam giác từ sóng vuông.
- Giải thích mạch vi phân (differentiator) và nhận ra sóng đầu ra từ sóng đầu vào khác nhau.
- Phân tích mạch so sánh (comparator) không có hồi tiếp — ra bão hòa cao/thấp theo $V_{in}$ so với $V_{\text{ref}}$.
- Tính 2 ngưỡng $V_{TH}$ và $V_{TL}$ của mạch Schmitt trigger (comparator có hồi tiếp dương) và giải thích hiệu ứng trễ (hysteresis).
- Tổng kết chuỗi: diode → transistor → op-amp → cổng logic kỹ thuật số.

## Kiến thức tiền đề

- [Lesson 07 — Op-amp cơ bản](../lesson-07-opamp-basics/): 2 quy tắc vàng, mạch đảo/không đảo, buffer.
- [Lesson 04 — Tụ điện & mạch RC](../../01-Fundamentals/lesson-04-capacitor-rc/): quan hệ $I = C \cdot dV/dt$, hằng số thời gian $\tau = RC$.
- [Lesson 04 — BJT khuếch đại](../lesson-04-bjt-amplifier/): khái niệm bão hòa (saturation) và ngắt (cutoff).

---

## 1. Mạch cộng (Summing Amplifier)

### 1.1. Cấu tạo và công thức

💡 **Trực giác trước**: Hình dung một bàn trộn âm thanh (audio mixer) — nhiều micro cắm vào, âm thanh được trộn lại thành một đầu ra. Op-amp làm đúng điều đó về điện: cộng nhiều điện áp đầu vào lại với hệ số tự chọn.

Mạch cộng đảo (inverting summing amplifier) có:
- $N$ đầu vào $V_1, V_2, \ldots, V_N$ qua điện trở $R_1, R_2, \ldots, R_N$ vào đầu vào đảo (−).
- Đầu vào không đảo (+) nối đất (GND).
- Điện trở hồi tiếp $R_f$ từ đầu ra về đầu vào đảo.

**Công thức tổng quát**:

$$V_{\text{out}} = -R_f \times \left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3} + \cdots\right)$$

**Chứng minh bằng 2 quy tắc vàng**:
- Quy tắc 1 (zero differential input): $V_+ = V_- = 0$ V (nút summing point ≈ virtual ground).
- Dòng qua $R_1$: $i_1 = V_1/R_1$. Dòng qua $R_2$: $i_2 = V_2/R_2$. Dòng qua $R_f$: $i_f = i_1 + i_2 + \ldots$ (Kirchhoff tại nút).
- $V_{\text{out}} = -i_f \times R_f = -R_f \times (V_1/R_1 + V_2/R_2 + \ldots)$.

**Trường hợp đặc biệt — tất cả $R$ bằng nhau** ($R_1 = R_2 = \ldots = R$):

$$V_{\text{out}} = -\frac{R_f}{R} \times (V_1 + V_2 + V_3 + \cdots)$$

Nếu thêm $R_f = R$ thì $V_{\text{out}} = -(V_1 + V_2 + \ldots + V_N)$: **cộng thật sự** (hệ số tỉ lệ = 1, chỉ đảo dấu).

### 1.2. Walk-through: 3 ví dụ số cụ thể

**Ví dụ 1 — Audio mixer 2 kênh đơn giản**:
- $V_1$ = 0.5 V (micro 1), $R_1$ = 10 kΩ.
- $V_2$ = 1.0 V (micro 2), $R_2$ = 10 kΩ.
- $R_f$ = 10 kΩ.

```
V_out = −10k × (0.5/10k + 1.0/10k)
      = −10k × (0.05 mA + 0.1 mA)
      = −10k × 0.15 mA
      = −1.5 V
```

Kiểm tra: đơn giản hơn: $V_{\text{out}} = -(R_f/R) \times (V_1 + V_2) = -1 \times 1.5 = -1.5\,\text{V}$ ✓

**Ví dụ 2 — Khuếch đại có trọng số (weighted sum)**:
- $V_1$ = 2 V, $R_1$ = 20 kΩ → hệ số $= R_f/R_1$.
- $V_2$ = 3 V, $R_2$ = 10 kΩ → hệ số $= R_f/R_2$.
- $R_f$ = 20 kΩ.

$$V_{\text{out}} = -20\,\text{k}\Omega \times \left(\frac{2}{20\,\text{k}\Omega} + \frac{3}{10\,\text{k}\Omega}\right) = -20\,\text{k}\Omega \times (0.1\,\text{mA} + 0.3\,\text{mA}) = -20\,\text{k}\Omega \times 0.4\,\text{mA} = \textbf{-8 V}$$

Giải thích: $V_1$ đóng góp $-(20/20) \times 2 = -2\,\text{V}$, $V_2$ đóng góp $-(20/10) \times 3 = -6\,\text{V}$. Tổng: −8 V.

**Ví dụ 3 — DAC (Digital-to-Analog Converter) 3-bit bậc thang**:

Biến đổi số nhị phân $b_2 b_1 b_0$ (bit2 = MSB) sang điện áp:

- $b_0$ (LSB): $V_{b_0}$ = 0 hoặc 5 V, $R_0$ = 40 kΩ (trọng số 1).
- $b_1$: $V_{b_1}$ = 0 hoặc 5 V, $R_1$ = 20 kΩ (trọng số 2).
- $b_2$ (MSB): $V_{b_2}$ = 0 hoặc 5 V, $R_2$ = 10 kΩ (trọng số 4).
- $R_f$ = 10 kΩ.

Với số nhị phân 101 (= 5 thập phân):

$$V_{\text{out}} = -10\,\text{k}\Omega \times \left(\frac{5}{40\,\text{k}\Omega} + \frac{0}{20\,\text{k}\Omega} + \frac{5}{10\,\text{k}\Omega}\right) = -10\,\text{k}\Omega \times (0.125\,\text{mA} + 0 + 0.5\,\text{mA}) = -10\,\text{k}\Omega \times 0.625\,\text{mA} = \textbf{-6.25 V}$$

Tỉ lệ: 5/7 × giá trị tối đa (111 → −8.75 V → biểu diễn 7 mức). Đây là nền tảng của DAC bậc thang kháng trở (R-2R ladder sẽ mở rộng trong Tầng 3).

❓ **Câu hỏi tự nhiên**:
- *"Tại sao dấu âm?"* — Vì đầu vào vào chân đảo (−). Để lấy lại đúng dấu, nối thêm một tầng khuếch đại đảo nữa với $R_f = R_{in}$ (hệ số −1).
- *"Nếu các $V_{in}$ cùng chiều, có thể mất bão hòa không?"* — Có. $V_{\text{out}}$ bị kẹp ở $\pm V_{cc}$ (thường ±13 V với nguồn ±15 V). Phải đảm bảo tổng dòng $\times R_f < V_{\text{sat}}$.
- *"Mạch cộng không đảo có không?"* — Có, nhưng phức tạp hơn vì impedance bị ghép lẫn nhau. Mạch đảo là chuẩn vì mỗi đầu vào độc lập nhờ virtual ground.

⚠ **Lỗi thường gặp**:
- Quên dấu âm: $V_{\text{out}} = -R_f(V_1/R_1 + \ldots)$, KHÔNG PHẢI $+R_f(V_1/R_1 + \ldots)$.
- Nhầm đơn vị: $R$ phải cùng đơn vị trong phép chia. Nếu $R$ tính bằng kΩ thì cả $R_f$ lẫn $R_1$ đều kΩ — kết quả giống nhau vì tỉ số.
- Không kiểm tra bão hòa: nếu $V_{\text{out}}$ tính ra −25 V nhưng nguồn chỉ ±12 V thì op-amp sẽ bão hòa ở −10.5 V (thực tế ~1.5 V dưới nguồn).

🔁 **Dừng lại tự kiểm tra**:
> Mạch cộng có $R_1 = R_2$ = 5 kΩ, $R_f$ = 10 kΩ, $V_1$ = 1 V, $V_2$ = 2 V. Tính $V_{\text{out}}$.

<details>
<summary>Đáp án</summary>

$$V_{\text{out}} = -10\,\text{k}\Omega \times \left(\frac{1}{5\,\text{k}\Omega} + \frac{2}{5\,\text{k}\Omega}\right) = -10\,\text{k}\Omega \times (0.2\,\text{mA} + 0.4\,\text{mA}) = -10\,\text{k}\Omega \times 0.6\,\text{mA} = \textbf{-6 V}$$

Hoặc: $V_{\text{out}} = -(R_f/R_1) \times V_1 + (-(R_f/R_2) \times V_2) = -2 \times 1 + (-2 \times 2) = -6\,\text{V}$.

</details>

📝 **Tóm tắt mục 1**:
- $V_{\text{out}} = -R_f \times (V_1/R_1 + V_2/R_2 + \ldots)$ — dấu âm do chân đảo.
- Nếu tất cả $R$ bằng nhau: $V_{\text{out}} = -(R_f/R) \times (V_1 + V_2 + \ldots)$.
- Ứng dụng: audio mixer, DAC bậc thang, cộng nhiều cảm biến.
- Virtual ground tại nút summing point đảm bảo các đầu vào không ảnh hưởng lẫn nhau.

---

## 2. Mạch trừ / Khuếch đại vi sai (Difference Amplifier)

### 2.1. Cấu tạo và công thức

💡 **Trực giác**: Cầu Wheatstone đo sức căng (strain gauge) hay nhiệt độ — cảm biến tạo ra điện áp vi sai nhỏ ($V_2 - V_1$ = vài mV) trên nền điện áp chung lớn (common-mode, vài V). Mạch trừ chỉ lấy phần vi sai, bỏ phần chung — đây là tính năng CMRR (Common Mode Rejection Ratio) quan trọng trong đo lường.

Cấu hình chuẩn (tất cả kháng trở bằng nhau: $R_{in} = R_f$):

$$V_{\text{out}} = \frac{R_f}{R_{in}} \times (V_2 - V_1)$$

Với $R_{in} = R_f = R$:

$$V_{\text{out}} = V_2 - V_1$$

**Chứng minh tổng quát**:
- Chân (+) nhận $V_+ = V_2 \times R_f/(R_{in} + R_f)$ qua bộ phân áp $R_{in}$ và $R_f$.
- Chân (−) nhận $V_- = V_1 + (V_{\text{out}} - V_1) \times R_{in}/(R_{in} + R_f)$ (hồi tiếp).
- Quy tắc vàng: $V_+ = V_-$. Giải phương trình → $V_{\text{out}} = (R_f/R_{in})(V_2 - V_1)$.

**Chứng minh loại nhiễu chung**: Nếu $V_1 = V_{cm} + v_1$ và $V_2 = V_{cm} + v_2$ ($V_{cm}$ là nhiễu chung giống nhau trên cả 2 dây):

$$V_{\text{out}} = \frac{R_f}{R_{in}} \times [(V_{cm} + v_2) - (V_{cm} + v_1)] = \frac{R_f}{R_{in}} \times (v_2 - v_1)$$

$V_{cm}$ triệt tiêu hoàn toàn! Đây là lý do cáp đôi xoắn (twisted pair) phổ biến trong truyền tín hiệu: nhiễu xâm nhập đều như nhau trên cả 2 dây → $V_{cm}$ lớn → mạch vi sai loại sạch.

### 2.2. Walk-through: 3 ví dụ số cụ thể

**Ví dụ 1 — Đo cầu Wheatstone đơn giản**:
- $V_1$ = 2.48 V, $V_2$ = 2.52 V (vi sai = 40 mV).
- $R_{in}$ = 10 kΩ, $R_f$ = 10 kΩ (hệ số = 1).

$$V_{\text{out}} = 1 \times (2.52 - 2.48) = 0.04\,\text{V} = \textbf{40 mV}$$

Điện áp common-mode 2.5 V bị loại hoàn toàn.

**Ví dụ 2 — Khuếch đại vi sai hệ số 10**:
- $V_1$ = 1.000 V, $V_2$ = 1.050 V.
- $R_{in}$ = 10 kΩ, $R_f$ = 100 kΩ.

$$V_{\text{out}} = \frac{100\,\text{k}\Omega}{10\,\text{k}\Omega} \times (1.050 - 1.000) = 10 \times 0.05 = \textbf{0.5 V}$$

Phần vi sai 50 mV được khuếch đại thành 0.5 V — dễ đọc bằng ADC.

**Ví dụ 3 — Loại nhiễu nguồn điện 50 Hz**:
- $V_1$ = 0.020 V (tín hiệu) + 0.1 V (nhiễu 50 Hz trên dây 1).
- $V_2$ = 0.070 V (tín hiệu) + 0.1 V (nhiễu 50 Hz trên dây 2, giống hệt dây 1 vì cùng đi qua môi trường).
- $R_{in} = R_f$ = 10 kΩ.

$$V_{\text{out}} = (0.070 + 0.1) - (0.020 + 0.1) = 0.17 - 0.12 = \textbf{0.050 V}$$

Tín hiệu: 0.050 V = đúng ($V_{2,\text{signal}} - V_{1,\text{signal}} = 0.070 - 0.020$). Nhiễu 0.1 V: bị triệt tiêu hoàn toàn.

❓ **Câu hỏi tự nhiên**:
- *"CMRR trong thực tế là bao nhiêu?"* — Op-amp thực có CMRR từ 80 dB đến 120 dB (tỉ lệ $10{,}000:1$ đến $1{,}000{,}000:1$). Với mạch trừ dùng điện trở rời, CMRR thực tế bị giới hạn bởi sai số điện trở (1% tolerance → CMRR ~40 dB). Để CMRR cao, dùng INA (Instrumentation Amplifier) có 3 op-amp bên trong.
- *"Nếu $R_{in}$ và $R_f$ không khớp thì sao?"* — $V_{\text{out}} = V_2 \times R_f(R_{in}+R_f)/(R_{in}(R_{in}+R_f)) - V_1 \times R_f/R_{in}$. Phần chung không triệt tiêu hoàn toàn. Sai số 1% trên điện trở gây "rò" common-mode.

⚠ **Lỗi thường gặp**:
- Hoán vị $V_1$ và $V_2$: $V_{\text{out}} = (R_f/R_{in})(V_2 - V_1)$, KHÔNG PHẢI $V_1 - V_2$. Khi nối mạch, $V_1$ vào chân (−) qua $R_{in}$, $V_2$ vào chân (+) qua $R_{in}$.
- Dùng điện trở không khớp cho mạch loại nhiễu: sai số 1% điện trở làm CMRR giảm mạnh. Mua bộ điện trở 0.1% hoặc dùng INA128.

🔁 **Dừng lại tự kiểm tra**:
> Mạch trừ $R_{in}$ = 5 kΩ, $R_f$ = 20 kΩ. $V_1$ = 3 V, $V_2$ = 3.5 V. Tính $V_{\text{out}}$.

<details>
<summary>Đáp án</summary>

$$V_{\text{out}} = \frac{20\,\text{k}\Omega}{5\,\text{k}\Omega} \times (3.5 - 3.0) = 4 \times 0.5 = \textbf{2 V}$$

</details>

📝 **Tóm tắt mục 2**:
- $V_{\text{out}} = (R_f/R_{in})(V_2 - V_1)$: chỉ khuếch đại phần vi sai.
- Nhiễu chung $V_{cm}$ triệt tiêu khi 4 điện trở khớp chính xác.
- Ứng dụng: cầu Wheatstone, ECG, đo dòng (qua shunt resistor), cáp cân bằng audio.
- INA (Instrumentation Amplifier) = 3 op-amp → CMRR cao hơn, không cần khớp điện trở ngoài.

---

## 3. Mạch tích phân (Integrator) và Vi phân (Differentiator)

### 3.1. Mạch tích phân

💡 **Trực giác**: Thay $R_f$ bằng tụ điện $C$ trong mạch đảo. Tụ điện "nhớ" điện tích theo thời gian — nghĩa là đầu ra phản ánh **tổng tích lũy** của đầu vào, không phải giá trị tức thời.

Cấu hình: $R_{in}$ đầu vào, tụ $C$ làm hồi tiếp, chân (+) nối đất.

**Công thức**:

$$V_{\text{out}}(t) = -\frac{1}{RC} \int_0^t V_{in}(\tau)\,d\tau + V_{\text{out}}(0)$$

**Giải thích từng phần**:
- Dấu âm: chân đảo.
- $1/(RC)$: tốc độ tích phân — $RC$ lớn → tích chậm, $RC$ nhỏ → tích nhanh.
- $\int V_{in}\,dt$: cộng dồn điện áp theo thời gian.
- $V_{\text{out}}(0)$: điều kiện ban đầu (tụ đã nạp từ trước).

**Chứng minh**: Tại nút summing point (virtual ground 0 V):
- Dòng qua $R_{in}$: $i_{in} = V_{in}/R$.
- Dòng qua $C$: $i_C = -i_{in}$ (KCL), $V_{\text{out}} = -(1/C)\int i_C\,dt = -(1/RC)\int V_{in}\,dt$.

**Ứng dụng tạo sóng tam giác từ sóng vuông**:

Sóng vuông biên độ $\pm V$ với chu kỳ $T$. Trong nửa kỳ dương ($V_{in} = +V$, thời gian $T/2$):

$$V_{\text{out}}(t) = -\frac{V}{RC} \times t \quad \text{(dốc xuống tuyến tính)}$$

Trong nửa kỳ âm ($V_{in} = -V$):

$$V_{\text{out}}(t) = +\frac{V}{RC} \times t \quad \text{(dốc lên tuyến tính)}$$

→ Sóng tam giác! Biên độ tam giác $= V \times T/(2RC)$.

**Ví dụ số**: $V_{in} = \pm 5\,\text{V}$, tần số 1 kHz ($T$ = 1 ms), $R$ = 10 kΩ, $C$ = 10 nF:

$$RC = 10\,\text{k}\Omega \times 10\,\text{nF} = 100\,\mu\text{s}$$

$$\text{Biên độ tam giác} = 5 \times \frac{0.5\,\text{ms}}{100\,\mu\text{s}} = 5 \times 5 = 25\,\text{V}$$

Quá bão hòa! Cần tăng $RC$: dùng $R$ = 100 kΩ → biên độ = 2.5 V (vừa đủ với nguồn ±5 V).

❓ **Câu hỏi tự nhiên**:
- *"Tại sao tích phân thực tế bị trôi (drift)?"* — Nếu $V_{in}$ có DC offset nhỏ (vài mV), tụ sẽ nạp dần đến bão hòa. Giải pháp: thêm $R_f$ song song với $C$ (thường $R_f = 10 \times R_{in}$) để tạo giới hạn DC gain.
- *"Mạch tích phân dùng tần số nào?"* — Tốt nhất ở dải tần số nơi $X_C = 1/(2\pi fC) \approx R_{in}$. Tại $f = 1/(2\pi RC)$, gain = 1 (0 dB) và phase shift = −90°.

### 3.2. Mạch vi phân (Differentiator)

Đổi vị trí: $C$ ở đầu vào, $R_f$ làm hồi tiếp.

**Công thức**:

$$V_{\text{out}} = -R_f \cdot C \cdot \frac{dV_{in}}{dt}$$

**Ý nghĩa**: đầu ra tỉ lệ với **tốc độ thay đổi** của đầu vào.

Ví dụ:
- Sóng vuông → xung nhọn tại mỗi cạnh chuyển tiếp (derivative của bước nhảy = xung Dirac).
- Sóng tam giác → sóng vuông (đạo hàm của hàm tuyến tính từng đoạn = hằng số từng đoạn).
- Sóng sin tần số $f$ → sóng sin tần số $f$ nhưng phase lệch 90° và biên độ tăng theo $f$ (gain $= 2\pi f RC$).

⚠ **Lỗi thường gặp**: Mạch vi phân khuếch đại nhiễu tần số cao (gain tăng tuyến tính theo $f$) — nhạy cảm với noise. Trong thực tế, thêm $R$ nhỏ nối tiếp $C$ đầu vào để giới hạn gain tại tần số cao.

📝 **Tóm tắt mục 3**:
- Tích phân: $C$ thay $R_f$ → $V_{\text{out}} = -(1/RC)\int V_{in}\,dt$. Sóng vuông → sóng tam giác.
- Vi phân: $C$ ở đầu vào, $R_f$ hồi tiếp → $V_{\text{out}} = -RC \cdot dV_{in}/dt$. Nhạy với noise.
- $RC$ là hằng số thời gian điều khiển tốc độ tích/vi phân.
- Liên kết: [mạch RC cơ bản](../../01-Fundamentals/lesson-04-capacitor-rc/).

---

## 4. Comparator (Mạch so sánh)

### 4.1. Nguyên lý

💡 **Trực giác**: Op-amp không có hồi tiếp → gain hở ($A_{OL}$) cực lớn ($10^5$ đến $10^6$). Ngay một sự chênh lệch nhỏ vài µV giữa $V_+$ và $V_-$ cũng khuếch đại lên hàng chục volt → ngay lập tức bão hòa ở $+V_{\text{sat}}$ hoặc $-V_{\text{sat}}$.

$$\text{Nếu } V_{in} > V_{\text{ref}} \Rightarrow V_{\text{out}} = +V_{\text{sat}} \approx +V_{cc} - 1.5\,\text{V}$$

$$\text{Nếu } V_{in} < V_{\text{ref}} \Rightarrow V_{\text{out}} = -V_{\text{sat}} \approx -V_{cc} + 1.5\,\text{V}$$

Đây là **bộ so sánh 1 bit**: biến đổi analog thành digital 0/1.

### 4.2. Walk-through: 3 ví dụ số

**Ví dụ 1 — Cảm biến ánh sáng (LDR) bật/tắt đèn**:
- $V_{\text{ref}}$ = 2.5 V (đặt tại chân +, phân áp từ nguồn 5 V).
- $V_{in}$ = điện áp từ LDR, thay đổi từ 0.5 V (tối) đến 4.5 V (sáng).
- Nguồn ±12 V → $V_{\text{sat}} \approx \pm 10.5\,\text{V}$.

| Điều kiện | $V_{in}$ | So sánh | $V_{\text{out}}$ |
|-----------|------|---------|-------|
| Trời tối | 1.0 V | $1.0 < 2.5$ | −10.5 V → đèn BẬT |
| Trời sáng vừa | 2.5 V | $2.5 = 2.5$ | Biên (không ổn định!) |
| Trời sáng | 4.0 V | $4.0 > 2.5$ | +10.5 V → đèn TẮT |

**Ví dụ 2 — Cảm biến nhiệt độ (thermistor) báo động quá nhiệt**:
- Thermistor + điện trở phân áp → $V_{in}$ tuyến tính với nhiệt độ.
- Hiệu chỉnh: 0 °C → 1.0 V, 100 °C → 4.0 V → hệ số 30 mV/°C.
- $V_{\text{ref}}$ = 2.5 V → ngưỡng cảnh báo tại: $T = (2.5 - 1.0)/0.03 =$ **50 °C**.
- Khi $T >$ 50 °C: $V_{in} > 2.5\,\text{V}$ → $V_{\text{out}} = +V_{\text{sat}}$ → rơle bật quạt.

**Ví dụ 3 — Comparator zero-crossing (phát hiện qua 0)**:
- $V_{in}$ = sóng sin 1 V biên độ.
- $V_{\text{ref}}$ = 0 V (chân + nối đất).
- $V_{\text{out}}$: sóng vuông cùng tần số, $+V_{\text{sat}}$ khi $V_{in} > 0$, $-V_{\text{sat}}$ khi $V_{in} < 0$.
- Ứng dụng: đếm tần số, đo RPM (tốc độ quay), đồng bộ pha.

❓ **Câu hỏi tự nhiên**:
- *"Tại điểm biên ($V_{in} = V_{\text{ref}}$) có vấn đề gì?"* — Nếu $V_{in}$ dao động nhẹ quanh $V_{\text{ref}}$ (nhiễu), $V_{\text{out}}$ sẽ bật/tắt nhiều lần rất nhanh — gây nhiễu logic, làm hỏng thiết bị nối sau. Giải pháp: Schmitt trigger (mục 5).
- *"Dùng op-amp thông thường làm comparator được không?"* — Được, nhưng IC comparator chuyên dụng (LM393, LM339) nhanh hơn (response time µs thay vì µs–ms) và có đầu ra open-collector để giao tiếp trực tiếp với logic 5 V/3.3 V.

⚠ **Lỗi thường gặp**:
- Quên đặt $V_{\text{ref}}$: nhiều người nối $V_{\text{ref}}$ vào GND rồi ngạc nhiên tại sao đầu ra lúc nào cũng $+V_{\text{sat}}$. Kiểm tra $V_{\text{ref}}$ thực tế bằng đồng hồ.
- Nhầm chân + và −: nếu $V_{in}$ vào chân (−) và $V_{\text{ref}}$ vào chân (+) → logic đảo ngược so với dự kiến.

📝 **Tóm tắt mục 4**:
- Op-amp không hồi tiếp = comparator: $V_{\text{out}} = \pm V_{\text{sat}}$ tùy $V_{in}$ so với $V_{\text{ref}}$.
- Ngưỡng $= V_{\text{ref}}$ (duy nhất một ngưỡng).
- Vấn đề: rung (chattering) khi $V_{in} \approx V_{\text{ref}}$. Giải pháp: Schmitt trigger.
- Ứng dụng: cảm biến ngưỡng, zero-crossing detector, ADC flash.

---

## 5. Schmitt Trigger (Comparator có hồi tiếp dương)

### 5.1. Vì sao cần trễ (Hysteresis)?

💡 **Trực giác**: Hãy nghĩ đến bộ điều nhiệt (thermostat) trong điều hòa. Nếu chỉ có 1 ngưỡng 25 °C: khi nhiệt độ tăng lên 25.01 °C → máy bật; tỏa nhiệt ra → nhiệt độ xuống 24.99 °C → máy tắt; lại tăng 25.01 °C → máy bật... Máy bật/tắt liên tục hàng chục lần mỗi phút — hỏng máy, tốn điện.

Giải pháp: **2 ngưỡng**. Máy bật tại 26 °C, tắt tại 24 °C. Khoảng 24–26 °C = vùng trễ (hysteresis window). Schmitt trigger làm đúng vậy với điện áp.

### 5.2. Cấu hình và công thức

**Schmitt trigger đảo** (inverting Schmitt trigger):
- $V_{in}$ vào chân (−).
- Hồi tiếp dương: $R_1$ từ $V_{\text{out}}$ về chân (+), $R_2$ từ chân (+) xuống GND.

$$V_{TH} = +V_{\text{sat}} \times \frac{R_2}{R_1 + R_2} \quad \text{(ngưỡng trên, } V_{\text{out}} \text{ đang ở } +V_{\text{sat}}\text{)}$$

$$V_{TL} = -V_{\text{sat}} \times \frac{R_2}{R_1 + R_2} \quad \text{(ngưỡng dưới, } V_{\text{out}} \text{ đang ở } -V_{\text{sat}}\text{)}$$

$$\text{Hysteresis window} = V_{TH} - V_{TL} = 2 \times V_{\text{sat}} \times \frac{R_2}{R_1 + R_2}$$

**Cơ chế hoạt động**:
- $V_{\text{out}} = +V_{\text{sat}}$: ngưỡng kích $= V_{TH}$. Khi $V_{in}$ tăng qua $V_{TH}$ → $V_{\text{out}}$ chuyển $-V_{\text{sat}}$.
- $V_{\text{out}} = -V_{\text{sat}}$: ngưỡng kích $= V_{TL}$. Khi $V_{in}$ giảm qua $V_{TL}$ → $V_{\text{out}}$ chuyển $+V_{\text{sat}}$.
- Khi $V_{TL} < V_{in} < V_{TH}$: không chuyển trạng thái — **bất định song ổn** (bistable).

### 5.3. Walk-through: 3 ví dụ số

**Ví dụ 1 — Tính ngưỡng cơ bản**:
- $V_{\text{sat}}$ = 10 V, $R_1$ = 90 kΩ, $R_2$ = 10 kΩ.

$$V_{TH} = +10 \times \frac{10}{90 + 10} = +10 \times 0.1 = +\textbf{1.0 V}$$

$$V_{TL} = -10 \times \frac{10}{90 + 10} = -10 \times 0.1 = -\textbf{1.0 V}$$

$$\text{Window} = V_{TH} - V_{TL} = 1.0 - (-1.0) = \textbf{2 V}$$

Tín hiệu nhiễu ±0.5 V quanh 0 V: vì $|0.5\,\text{V}| < V_{TH} = 1.0\,\text{V}$, đầu ra **không** thay đổi → chống nhiễu thành công.

**Ví dụ 2 — Cảm biến ánh sáng chống rung**:
- $V_{\text{ref}}$ = 2.5 V (điểm giữa dải cảm biến ánh sáng).
- $V_{\text{sat}}$ = 12 V, muốn hysteresis ±0.3 V quanh $V_{\text{ref}}$.
- Cần $V_{TH}$ = 2.8 V, $V_{TL}$ = 2.2 V.
- Dùng Schmitt trigger không đảo (non-inverting) với offset:

Cách thực tế: dùng cấu hình bộ so sánh với hồi tiếp dương, điều chỉnh $R$ để có window = 0.6 V.

Từ $V_{TH} = V_{\text{sat}} \times R_2/(R_1+R_2) = 0.3\,\text{V}$, $V_{\text{sat}}$ = 12 V → $R_2/(R_1+R_2) = 0.025$ → $R_1 = 39 R_2$.
Chọn $R_2$ = 1 kΩ, $R_1$ = 39 kΩ. $V_{TH} = 12 \times 1/40 = 0.3\,\text{V}$. Thêm offset $V_{\text{ref}}$ = 2.5 V tại chân + qua $R_{\text{ref}}$.

**Ví dụ 3 — Bộ tạo sóng vuông (astable Schmitt)**:
Kết hợp Schmitt trigger với mạch $RC$ để tự dao động.

- Tụ $C$ nạp/xả qua $R$ giữa $V_{TH}$ và $V_{TL}$ → thời gian mỗi nửa kỳ: $\tau = RC \times \ln[(V_{\text{sat}} - V_{TL})/(V_{\text{sat}} - V_{TH})]$.
- Với $R_1 = R_2$ = 10 kΩ → $V_{TH} = V_{\text{sat}}/2$, $V_{TL} = -V_{\text{sat}}/2$.
- Chu kỳ $T \approx 2RC \times \ln(3) \approx 2.2RC$.
- Ví dụ: $R$ = 100 kΩ, $C$ = 10 nF → $T \approx 2.2\,\text{ms}$ → $f \approx$ 455 Hz.

❓ **Câu hỏi tự nhiên**:
- *"Vì sao gọi là hồi tiếp dương?"* — Vì hồi tiếp cùng pha ($V_{\text{out}}$ dương → $V_+$ tăng → op-amp "càng chắc chắn hơn" là $V_{\text{out}}$ dương) — khác hẳn hồi tiếp âm ($V_{\text{out}}$ dương → giảm gain). Hồi tiếp dương tạo ra 2 trạng thái bền, không phải điểm cân bằng.
- *"Hysteresis window bao nhiêu là vừa?"* — Đủ lớn để che phủ biên độ nhiễu cao nhất dự kiến (thường 2–5× biên độ nhiễu). Quá rộng → ngưỡng kích lệch xa giá trị tín hiệu thật.

⚠ **Lỗi thường gặp**:
- Nhầm hồi tiếp âm và dương: hồi tiếp về chân (+) = dương (Schmitt), chân (−) = âm (khuếch đại thông thường). Hoán vị 2 điện trở hồi tiếp → mạch sẽ ở trạng thái cân bằng giả và không hoạt động đúng.
- Quên rằng $V_{TH}$ và $V_{TL}$ thay đổi theo $V_{\text{sat}}$: nếu nguồn không ổn định, ngưỡng trôi theo.

📝 **Tóm tắt mục 5**:
- Schmitt trigger: hồi tiếp dương về chân (+) → 2 ngưỡng $V_{TH}$ và $V_{TL}$.
- $V_{TH} = +V_{\text{sat}} \times R_2/(R_1+R_2)$, $V_{TL} = -V_{\text{sat}} \times R_2/(R_1+R_2)$.
- Chống nhiễu/rung trong khoảng $V_{TL} < V_{in} < V_{TH}$.
- Ứng dụng: debounce nút nhấn, cảm biến ngưỡng bền, bộ tạo sóng.

---

## 6. Tổng kết Tầng 2 — Chuỗi diode → Transistor → Op-amp

### 6.1. Hành trình từ mối nối P-N đến khối khuếch đại vạn năng

Toàn bộ Tầng 2 xây dựng theo một mạch logic phát triển:

| Linh kiện | Cơ chế | Ứng dụng chủ đạo |
|-----------|--------|------------------|
| Diode (L01–L03) | Mối nối P-N dẫn một chiều | Chỉnh lưu, Zener, nguồn DC |
| BJT (L04–L05) | Transistor khuếch đại/khóa dùng dòng | Khuếch đại tín hiệu nhỏ, relay |
| MOSFET (L06) | Transistor khóa dùng điện áp | Công suất lớn, PWM, H-bridge |
| Op-amp (L07–L08) | Khuếch đại vi sai độ lợi cao + hồi tiếp | Mọi xử lý tín hiệu analog |

### 6.2. Tại sao op-amp là đỉnh của Tầng 2?

Op-amp là "khối chức năng (functional block)" đầu tiên — thay vì phân tích từng transistor bên trong, ta dùng 2 quy tắc vàng và thiết kế bằng điện trở/tụ bên ngoài:

- **Hồi tiếp âm** → mạch tuyến tính: khuếch đại, cộng, trừ, tích phân, vi phân.
- **Không hồi tiếp** → bão hòa: comparator.
- **Hồi tiếp dương** → bất định song ổn: Schmitt trigger, bộ tạo dao động.

### 6.3. Cầu nối sang Tầng 3

Comparator và Schmitt trigger là **cầu nối tự nhiên** sang tín hiệu số:
- Comparator biến analog → 1 bit digital.
- Cổng logic (Tầng 3) = comparator được đóng gói hàng triệu cái trên một chip.
- Hàng triệu transistor MOSFET → CMOS gate → CPU.

Xem tiếp: [Tầng 3 — Cổng logic Boolean](../../03-Digital-MCU/lesson-01-boolean-logic-gates/).

---

## 7. Bài tập

**Bài 1**: Mạch cộng có $R_1$ = 10 kΩ, $R_2$ = 20 kΩ, $R_f$ = 40 kΩ. $V_1$ = 1 V, $V_2$ = 2 V. Tính $V_{\text{out}}$. Kiểm tra $V_{\text{out}}$ có bị bão hòa không nếu nguồn ±15 V.

**Bài 2**: Mạch trừ $R_{in}$ = 10 kΩ, $R_f$ = 50 kΩ. Đo được $V_1$ = 4.90 V, $V_2$ = 4.94 V. Tính $V_{\text{out}}$. Nếu cả hai dây đều nhiễm nhiễu chung 0.5 V ($V_1'$ = 5.40 V, $V_2'$ = 5.44 V), $V_{\text{out}}$ thay đổi như thế nào?

**Bài 3**: Mạch tích phân $R$ = 47 kΩ, $C$ = 100 nF. $V_{in}$ = sóng vuông ±3 V, tần số 500 Hz. Tính biên độ sóng tam giác đầu ra. Nguồn ±12 V — có bị bão hòa không?

**Bài 4**: Comparator dùng LM358, $V_{\text{sat}} \approx \pm 10\,\text{V}$. $V_{\text{ref}}$ = 1.5 V. Điều kiện nào ($V_{in}$ = bao nhiêu) thì $V_{\text{out}}$ = +10 V? Vẽ bảng trạng thái.

**Bài 5**: Schmitt trigger đảo: $R_1$ = 47 kΩ, $R_2$ = 3 kΩ. Nguồn ±15 V ($V_{\text{sat}}$ = 13.5 V). Tính $V_{TH}$, $V_{TL}$ và hysteresis window. Tín hiệu nhiễu ±0.5 V đi vào — Schmitt trigger có rung không?

**Bài 6 (thử thách)**: DAC 3-bit dùng mạch cộng với $R_f$ = 10 kΩ. Tính $R_0$, $R_1$, $R_2$ để đầu ra:
- Bit 0 (LSB) đóng góp ±0.625 V khi ở mức cao ($V_H$ = 5 V).
- Bit 1 đóng góp ±1.25 V.
- Bit 2 (MSB) đóng góp ±2.5 V.

---

## Lời giải chi tiết

### Bài 1

**Bước 1**: Áp dụng công thức mạch cộng.

$$V_{\text{out}} = -R_f \times \left(\frac{V_1}{R_1} + \frac{V_2}{R_2}\right) = -40\,\text{k}\Omega \times \left(\frac{1}{10\,\text{k}\Omega} + \frac{2}{20\,\text{k}\Omega}\right) = -40\,\text{k}\Omega \times (0.1\,\text{mA} + 0.1\,\text{mA}) = -40\,\text{k}\Omega \times 0.2\,\text{mA} = \textbf{-8 V}$$

**Bước 2**: Kiểm tra bão hòa với nguồn ±15 V.

$V_{\text{sat}} \approx 15 - 1.5 = 13.5\,\text{V}$. $|V_{\text{out}}|$ = 8 V < 13.5 V → **không bị bão hòa**. Mạch hoạt động tuyến tính.

**Kiểm chứng từng thành phần**: $(R_f/R_1) \times V_1 = 4 \times 1 = 4\,\text{V}$, $(R_f/R_2) \times V_2 = 2 \times 2 = 4\,\text{V}$. Tổng $= -(4 + 4) = -8\,\text{V}$ ✓.

### Bài 2

**Bước 1**: Không nhiễu ($V_1$ = 4.90 V, $V_2$ = 4.94 V):

$$V_{\text{out}} = \frac{R_f}{R_{in}} \times (V_2 - V_1) = \frac{50\,\text{k}\Omega}{10\,\text{k}\Omega} \times (4.94 - 4.90) = 5 \times 0.04 = \textbf{0.2 V}$$

**Bước 2**: Có nhiễu ($V_1'$ = 5.40 V, $V_2'$ = 5.44 V):

$$V_{\text{out}}' = 5 \times (5.44 - 5.40) = 5 \times 0.04 = \textbf{0.2 V}$$

**Kết luận**: $V_{\text{out}}$ không thay đổi. Nhiễu chung 0.5 V bị triệt tiêu hoàn toàn vì:

$$V_2' - V_1' = (4.94 + 0.5) - (4.90 + 0.5) = 4.94 - 4.90 = 0.04\,\text{V} \text{ (giống hệt)}$$

### Bài 3

**Bước 1**: Tính $RC$ và biên độ tam giác.

$$RC = 47\,\text{k}\Omega \times 100\,\text{nF} = 4700\,\mu\text{s} = 4.7\,\text{ms}$$

$$T = \frac{1}{500\,\text{Hz}} = 2\,\text{ms} \quad \Rightarrow \quad T/2 = 1\,\text{ms}$$

$$\text{Biên độ} = V_{in} \times \frac{T/2}{RC} = 3 \times \frac{1\,\text{ms}}{4.7\,\text{ms}} = 3 \times 0.213 = \textbf{0.638 V}$$

**Bước 2**: Kiểm tra bão hòa.

$V_{\text{sat}} \approx 10.5\,\text{V}$. Biên độ = 0.638 V << 10.5 V → **không bị bão hòa**. Mạch hoạt động đúng.

**Giải thích**: $RC$ = 4.7 ms lớn hơn $T/2$ = 1 ms → tụ chỉ nạp một phần nhỏ → dốc sóng tam giác nhỏ. Nếu muốn biên độ 3 V, cần $RC = 3 \times 1\,\text{ms} / 3 = 1\,\text{ms}$ → dùng $R$ = 10 kΩ, $C$ = 100 nF.

### Bài 4

Comparator với $V_{\text{ref}}$ = 1.5 V (tại chân +), $V_{in}$ tại chân −.

| $V_{in}$ (V) | Điều kiện | $V_{\text{out}}$ |
|----------|-----------|-------|
| 0.5 | $0.5 < 1.5$ → $V_+ > V_-$ | +10 V |
| 1.0 | $1.0 < 1.5$ → $V_+ > V_-$ | +10 V |
| 1.5 | Biên (không ổn định) | Chuyển tiếp, có thể rung |
| 2.0 | $2.0 > 1.5$ → $V_+ < V_-$ | −10 V |
| 3.5 | $3.5 > 1.5$ → $V_+ < V_-$ | −10 V |

**Kết luận**: $V_{\text{out}}$ = +10 V khi $V_{in} < 1.5\,\text{V}$. $V_{\text{out}}$ = −10 V khi $V_{in} > 1.5\,\text{V}$. Vùng $V_{in} \approx 1.5\,\text{V}$ có thể rung nếu tín hiệu nhiễu.

### Bài 5

**Bước 1**: Tính $V_{TH}$ và $V_{TL}$.

$$V_{TH} = +V_{\text{sat}} \times \frac{R_2}{R_1 + R_2} = +13.5 \times \frac{3}{47 + 3} = +13.5 \times 0.06 = +\textbf{0.81 V}$$

$$V_{TL} = -V_{\text{sat}} \times \frac{R_2}{R_1 + R_2} = -13.5 \times 0.06 = -\textbf{0.81 V}$$

$$\text{Hysteresis window} = V_{TH} - V_{TL} = 0.81 - (-0.81) = \textbf{1.62 V}$$

**Bước 2**: Kiểm tra chống nhiễu.

Nhiễu ±0.5 V: biên độ nhiễu = 0.5 V. Window = 1.62 V → bán window = 0.81 V > 0.5 V.

**Kết luận**: Khi tín hiệu ổn định (chưa kích ngưỡng), nhiễu ±0.5 V không đủ để vượt ngưỡng → Schmitt trigger **không rung**.

### Bài 6

**Bước 1**: Tính hệ số cần thiết cho mỗi bit.

$V_H$ = 5 V, $R_f$ = 10 kΩ. Hệ số của bit $N$ $= |V_{\text{out,contribution}} / V_H| = R_f / R_N$.

- Bit 0 (LSB): đóng góp 0.625 V → $R_f/R_0 = 0.625/5 = 0.125$ → $R_0 = 10\,\text{k}\Omega / 0.125 =$ **80 kΩ**.
- Bit 1: đóng góp 1.25 V → $R_f/R_1 = 1.25/5 = 0.25$ → $R_1 = 10\,\text{k}\Omega / 0.25 =$ **40 kΩ**.
- Bit 2 (MSB): đóng góp 2.5 V → $R_f/R_2 = 2.5/5 = 0.5$ → $R_2 = 10\,\text{k}\Omega / 0.5 =$ **20 kΩ**.

**Bước 2**: Kiểm tra với số nhị phân 111 (tất cả bit cao):

$$V_{\text{out}} = -10\,\text{k}\Omega \times \left(\frac{5}{80\,\text{k}\Omega} + \frac{5}{40\,\text{k}\Omega} + \frac{5}{20\,\text{k}\Omega}\right) = -10\,\text{k}\Omega \times (0.0625 + 0.125 + 0.25)\,\text{mA} = -10\,\text{k}\Omega \times 0.4375\,\text{mA} = \textbf{-4.375 V}$$

Tương đương: $-(0.625 + 1.25 + 2.5) = -4.375\,\text{V}$ ✓. Nguồn ±12 V → không bão hòa.

---

## 8. Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 07 — Op-amp cơ bản](../lesson-07-opamp-basics/): 2 quy tắc vàng, mạch đảo/không đảo.
  - [Lesson 04 — Tụ điện & RC](../../01-Fundamentals/lesson-04-capacitor-rc/): quan hệ $I = C \cdot dV/dt$.
- Bài tiếp theo:
  - [Tầng 3 — Cổng logic Boolean](../../03-Digital-MCU/lesson-01-boolean-logic-gates/): từ tín hiệu analog bão hòa (comparator) sang thế giới số. Transistor MOSFET đóng gói thành cổng CMOS.

---

## 📝 Tổng kết Lesson 08

1. **Mạch cộng**: $V_{\text{out}} = -R_f \times (V_1/R_1 + V_2/R_2 + \ldots)$. Ứng dụng: audio mixer, DAC.
2. **Mạch trừ**: $V_{\text{out}} = (R_f/R_{in})(V_2 - V_1)$. Triệt tiêu nhiễu chung — nền tảng đo lường chính xác.
3. **Mạch tích phân**: $V_{\text{out}} = -(1/RC)\int V_{in}\,dt$. Sóng vuông → sóng tam giác.
4. **Mạch vi phân**: $V_{\text{out}} = -RC \cdot dV_{in}/dt$. Nhạy với noise tần số cao.
5. **Comparator**: op-amp không hồi tiếp → $\pm V_{\text{sat}}$. 1 ngưỡng, dễ rung.
6. **Schmitt trigger**: hồi tiếp dương → 2 ngưỡng $V_{TH}/V_{TL}$. Chống nhiễu, ứng dụng cảm biến bền.
7. **Chuỗi Tầng 2**: Diode → BJT → MOSFET → Op-amp. Op-amp là đỉnh xử lý analog; comparator là cầu nối sang kỹ thuật số.
