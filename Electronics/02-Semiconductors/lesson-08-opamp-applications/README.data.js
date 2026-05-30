// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/02-Semiconductors/lesson-08-opamp-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Op-amp ứng dụng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tính V_out của mạch cộng (summing amplifier) với nhiều đầu vào và kháng trở (resistor) khác nhau.
- Tính V_out của mạch trừ / khuếch đại vi sai (difference amplifier) và giải thích vì sao loại được nhiễu chung (common-mode noise).
- Mô tả quan hệ V_out = −(1/RC)∫V_in dt của mạch tích phân (integrator) và tạo sóng tam giác từ sóng vuông.
- Giải thích mạch vi phân (differentiator) và nhận ra sóng đầu ra từ sóng đầu vào khác nhau.
- Phân tích mạch so sánh (comparator) không có hồi tiếp — ra bão hòa cao/thấp theo V_in so với V_ref.
- Tính 2 ngưỡng V_TH và V_TL của mạch Schmitt trigger (comparator có hồi tiếp dương) và giải thích hiệu ứng trễ (hysteresis).
- Tổng kết chuỗi: diode → transistor → op-amp → cổng logic kỹ thuật số.

## Kiến thức tiền đề

- [Lesson 07 — Op-amp cơ bản](../lesson-07-opamp-basics/): 2 quy tắc vàng, mạch đảo/không đảo, buffer.
- [Lesson 04 — Tụ điện & mạch RC](../../01-Fundamentals/lesson-04-capacitor-rc/): quan hệ I = C·dV/dt, hằng số thời gian τ = RC.
- [Lesson 04 — BJT khuếch đại](../lesson-04-bjt-amplifier/): khái niệm bão hòa (saturation) và ngắt (cutoff).

---

## 1. Mạch cộng (Summing Amplifier)

### 1.1. Cấu tạo và công thức

💡 **Trực giác trước**: Hình dung một bàn trộn âm thanh (audio mixer) — nhiều micro cắm vào, âm thanh được trộn lại thành một đầu ra. Op-amp làm đúng điều đó về điện: cộng nhiều điện áp đầu vào lại với hệ số tự chọn.

Mạch cộng đảo (inverting summing amplifier) có:
- N đầu vào V1, V2, …, VN qua điện trở R1, R2, …, RN vào đầu vào đảo (−).
- Đầu vào không đảo (+) nối đất (GND).
- Điện trở hồi tiếp R_f từ đầu ra về đầu vào đảo.

**Công thức tổng quát**:

\`\`\`
V_out = −R_f × (V1/R1 + V2/R2 + V3/R3 + ...)
\`\`\`

**Chứng minh bằng 2 quy tắc vàng**:
- Quy tắc 1 (zero differential input): V+ = V− = 0 V (nút summing point ≈ virtual ground).
- Dòng qua R1: i1 = V1/R1. Dòng qua R2: i2 = V2/R2. Dòng qua Rf: i_f = i1 + i2 + ... (Kirchhoff tại nút).
- V_out = −i_f × R_f = −R_f × (V1/R1 + V2/R2 + ...).

**Trường hợp đặc biệt — tất cả R bằng nhau** (R1 = R2 = ... = R):

\`\`\`
V_out = −(R_f / R) × (V1 + V2 + V3 + ...)
\`\`\`

Nếu thêm R_f = R thì V_out = −(V1 + V2 + ... + VN): **cộng thật sự** (hệ số tỉ lệ = 1, chỉ đảo dấu).

### 1.2. Walk-through: 3 ví dụ số cụ thể

**Ví dụ 1 — Audio mixer 2 kênh đơn giản**:
- V1 = 0.5 V (micro 1), R1 = 10 kΩ.
- V2 = 1.0 V (micro 2), R2 = 10 kΩ.
- R_f = 10 kΩ.

\`\`\`
V_out = −10k × (0.5/10k + 1.0/10k)
      = −10k × (0.05 mA + 0.1 mA)
      = −10k × 0.15 mA
      = −1.5 V
\`\`\`

Kiểm tra: đơn giản hơn: V_out = −(R_f/R)×(V1 + V2) = −1 × 1.5 = −1.5 V ✓

**Ví dụ 2 — Khuếch đại có trọng số (weighted sum)**:
- V1 = 2 V, R1 = 20 kΩ → hệ số = R_f/R1.
- V2 = 3 V, R2 = 10 kΩ → hệ số = R_f/R2.
- R_f = 20 kΩ.

\`\`\`
V_out = −20k × (2/20k + 3/10k)
      = −20k × (0.1 mA + 0.3 mA)
      = −20k × 0.4 mA
      = −8 V
\`\`\`

Giải thích: V1 đóng góp −(20/20)×2 = −2 V, V2 đóng góp −(20/10)×3 = −6 V. Tổng: −8 V.

**Ví dụ 3 — DAC (Digital-to-Analog Converter) 3-bit bậc thang**:

Biến đổi số nhị phân b2 b1 b0 (bit2 = MSB) sang điện áp:

- b0 (LSB): V_b0 = 0 hoặc 5 V, R0 = 40 kΩ (trọng số 1).
- b1: V_b1 = 0 hoặc 5 V, R1 = 20 kΩ (trọng số 2).
- b2 (MSB): V_b2 = 0 hoặc 5 V, R2 = 10 kΩ (trọng số 4).
- R_f = 10 kΩ.

Với số nhị phân 101 (= 5 thập phân):

\`\`\`
V_out = −10k × (5/40k + 0/20k + 5/10k)
      = −10k × (0.125 mA + 0 + 0.5 mA)
      = −10k × 0.625 mA
      = −6.25 V
\`\`\`

Tỉ lệ: 5/7 × giá trị tối đa (111 → −8.75 V → biểu diễn 7 mức). Đây là nền tảng của DAC bậc thang kháng trở (R-2R ladder sẽ mở rộng trong Tầng 3).

❓ **Câu hỏi tự nhiên**:
- *"Tại sao dấu âm?"* — Vì đầu vào vào chân đảo (−). Để lấy lại đúng dấu, nối thêm một tầng khuếch đại đảo nữa với R_f = R_in (hệ số −1).
- *"Nếu các V_in cùng chiều, có thể mất bão hòa không?"* — Có. V_out bị kẹp ở ±V_cc (thường ±13 V với nguồn ±15 V). Phải đảm bảo tổng dòng × R_f < V_sat.
- *"Mạch cộng không đảo có không?"* — Có, nhưng phức tạp hơn vì impedance bị ghép lẫn nhau. Mạch đảo là chuẩn vì mỗi đầu vào độc lập nhờ virtual ground.

⚠ **Lỗi thường gặp**:
- Quên dấu âm: V_out = −R_f(V1/R1 + ...), KHÔNG PHẢI +R_f(V1/R1 + ...).
- Nhầm đơn vị: R phải cùng đơn vị trong phép chia. Nếu R tính bằng kΩ thì cả R_f lẫn R1 đều kΩ — kết quả giống nhau vì tỉ số.
- Không kiểm tra bão hòa: nếu V_out tính ra −25 V nhưng nguồn chỉ ±12 V thì op-amp sẽ bão hòa ở −10.5 V (thực tế ~1.5 V dưới nguồn).

🔁 **Dừng lại tự kiểm tra**:
> Mạch cộng có R1 = R2 = 5 kΩ, R_f = 10 kΩ, V1 = 1 V, V2 = 2 V. Tính V_out.

<details>
<summary>Đáp án</summary>

V_out = −10k × (1/5k + 2/5k) = −10k × (0.2 mA + 0.4 mA) = −10k × 0.6 mA = **−6 V**.

Hoặc: V_out = −(R_f/R1)×V1 + −(R_f/R2)×V2 = −2×1 + (−2×2) = −6 V.

</details>

📝 **Tóm tắt mục 1**:
- V_out = −R_f × (V1/R1 + V2/R2 + ...) — dấu âm do chân đảo.
- Nếu tất cả R bằng nhau: V_out = −(R_f/R) × (V1 + V2 + ...).
- Ứng dụng: audio mixer, DAC bậc thang, cộng nhiều cảm biến.
- Virtual ground tại nút summing point đảm bảo các đầu vào không ảnh hưởng lẫn nhau.

---

## 2. Mạch trừ / Khuếch đại vi sai (Difference Amplifier)

### 2.1. Cấu tạo và công thức

💡 **Trực giác**: Cầu Wheatstone đo sức căng (strain gauge) hay nhiệt độ — cảm biến tạo ra điện áp vi sai nhỏ (V2 − V1 = vài mV) trên nền điện áp chung lớn (common-mode, vài V). Mạch trừ chỉ lấy phần vi sai, bỏ phần chung — đây là tính năng CMRR (Common Mode Rejection Ratio) quan trọng trong đo lường.

Cấu hình chuẩn (tất cả kháng trở bằng nhau: R_in = R_f):

\`\`\`
V_out = (R_f / R_in) × (V2 − V1)
\`\`\`

Với R_in = R_f = R:

\`\`\`
V_out = V2 − V1
\`\`\`

**Chứng minh tổng quát**:
- Chân (+) nhận V_plus = V2 × R_f/(R_in + R_f) qua bộ phân áp R_in và R_f.
- Chân (−) nhận V_minus = V1 + (V_out − V1) × R_in/(R_in + R_f) (hồi tiếp).
- Quy tắc vàng: V+ = V−. Giải phương trình → V_out = (R_f/R_in)(V2 − V1).

**Chứng minh loại nhiễu chung**: Nếu V1 = V_cm + v1 và V2 = V_cm + v2 (V_cm là nhiễu chung giống nhau trên cả 2 dây):

\`\`\`
V_out = (R_f/R_in) × [(V_cm + v2) − (V_cm + v1)]
       = (R_f/R_in) × (v2 − v1)
\`\`\`

V_cm triệt tiêu hoàn toàn! Đây là lý do cáp đôi xoắn (twisted pair) phổ biến trong truyền tín hiệu: nhiễu xâm nhập đều như nhau trên cả 2 dây → V_cm lớn → mạch vi sai loại sạch.

### 2.2. Walk-through: 3 ví dụ số cụ thể

**Ví dụ 1 — Đo cầu Wheatstone đơn giản**:
- V1 = 2.48 V, V2 = 2.52 V (vi sai = 40 mV).
- R_in = 10 kΩ, R_f = 10 kΩ (hệ số = 1).

\`\`\`
V_out = 1 × (2.52 − 2.48) = 0.04 V = 40 mV
\`\`\`

Điện áp common-mode 2.5 V bị loại hoàn toàn.

**Ví dụ 2 — Khuếch đại vi sai hệ số 10**:
- V1 = 1.000 V, V2 = 1.050 V.
- R_in = 10 kΩ, R_f = 100 kΩ.

\`\`\`
V_out = (100k/10k) × (1.050 − 1.000) = 10 × 0.05 = 0.5 V
\`\`\`

Phần vi sai 50 mV được khuếch đại thành 0.5 V — dễ đọc bằng ADC.

**Ví dụ 3 — Loại nhiễu nguồn điện 50 Hz**:
- V1 = 0.020 V (tín hiệu) + 0.1 V (nhiễu 50 Hz trên dây 1).
- V2 = 0.070 V (tín hiệu) + 0.1 V (nhiễu 50 Hz trên dây 2, giống hệt dây 1 vì cùng đi qua môi trường).
- R_in = R_f = 10 kΩ.

\`\`\`
V_out = (0.070 + 0.1) − (0.020 + 0.1) = 0.17 − 0.12 = 0.050 V
\`\`\`

Tín hiệu: 0.050 V = đúng (V2_signal − V1_signal = 0.070 − 0.020). Nhiễu 0.1 V: bị triệt tiêu hoàn toàn.

❓ **Câu hỏi tự nhiên**:
- *"CMRR trong thực tế là bao nhiêu?"* — Op-amp thực có CMRR từ 80 dB đến 120 dB (tỉ lệ 10 000 : 1 đến 1 000 000 : 1). Với mạch trừ dùng điện trở rời, CMRR thực tế bị giới hạn bởi sai số điện trở (1% tolerance → CMRR ~40 dB). Để CMRR cao, dùng INA (Instrumentation Amplifier) có 3 op-amp bên trong.
- *"Nếu R_in và R_f không khớp thì sao?"* — V_out = V2×R_f(R_in+R_f)/(R_in(R_in+R_f)) − V1×R_f/R_in. Phần chung không triệt tiêu hoàn toàn. Sai số 1% trên điện trở gây "rò" common-mode.

⚠ **Lỗi thường gặp**:
- Hoán vị V1 và V2: V_out = (R_f/R_in)(V2 − V1), KHÔNG PHẢI V1 − V2. Khi nối mạch, V1 vào chân (−) qua R_in, V2 vào chân (+) qua R_in.
- Dùng điện trở không khớp cho mạch loại nhiễu: sai số 1% điện trở làm CMRR giảm mạnh. Mua bộ điện trở 0.1% hoặc dùng INA128.

🔁 **Dừng lại tự kiểm tra**:
> Mạch trừ R_in = 5 kΩ, R_f = 20 kΩ. V1 = 3 V, V2 = 3.5 V. Tính V_out.

<details>
<summary>Đáp án</summary>

V_out = (20k/5k) × (3.5 − 3.0) = 4 × 0.5 = **2 V**.

</details>

📝 **Tóm tắt mục 2**:
- V_out = (R_f/R_in)(V2 − V1): chỉ khuếch đại phần vi sai.
- Nhiễu chung V_cm triệt tiêu khi 4 điện trở khớp chính xác.
- Ứng dụng: cầu Wheatstone, ECG, đo dòng (qua shunt resistor), cáp cân bằng audio.
- INA (Instrumentation Amplifier) = 3 op-amp → CMRR cao hơn, không cần khớp điện trở ngoài.

---

## 3. Mạch tích phân (Integrator) và Vi phân (Differentiator)

### 3.1. Mạch tích phân

💡 **Trực giác**: Thay R_f bằng tụ điện C trong mạch đảo. Tụ điện "nhớ" điện tích theo thời gian — nghĩa là đầu ra phản ánh **tổng tích lũy** của đầu vào, không phải giá trị tức thời.

Cấu hình: R_in đầu vào, tụ C làm hồi tiếp, chân (+) nối đất.

**Công thức**:

\`\`\`
V_out(t) = −(1 / R·C) × ∫₀ᵗ V_in(τ) dτ + V_out(0)
\`\`\`

**Giải thích từng phần**:
- Dấu âm: chân đảo.
- 1/(R·C): tốc độ tích phân — RC lớn → tích chậm, RC nhỏ → tích nhanh.
- ∫V_in dt: cộng dồn điện áp theo thời gian.
- V_out(0): điều kiện ban đầu (tụ đã nạp từ trước).

**Chứng minh**: Tại nút summing point (virtual ground 0 V):
- Dòng qua R_in: i_in = V_in/R.
- Dòng qua C: i_C = −i_in (KCL), V_out = −(1/C)∫i_C dt = −(1/RC)∫V_in dt.

**Ứng dụng tạo sóng tam giác từ sóng vuông**:

Sóng vuông biên độ ±V với chu kỳ T. Trong nửa kỳ dương (V_in = +V, thời gian T/2):

\`\`\`
V_out(t) = −(V / RC) × t  (dốc xuống tuyến tính)
\`\`\`

Trong nửa kỳ âm (V_in = −V):

\`\`\`
V_out(t) = +(V / RC) × t  (dốc lên tuyến tính)
\`\`\`

→ Sóng tam giác! Biên độ tam giác = V × T/(2RC).

**Ví dụ số**: V_in = ±5 V, tần số 1 kHz (T = 1 ms), R = 10 kΩ, C = 10 nF:

\`\`\`
RC = 10k × 10n = 100 µs
Biên độ tam giác = 5 × 0.5ms / 100µs = 5 × 5 = 25 V
\`\`\`

Quá bão hòa! Cần tăng RC: dùng R = 100 kΩ → biên độ = 2.5 V (vừa đủ với nguồn ±5 V).

❓ **Câu hỏi tự nhiên**:
- *"Tại sao tích phân thực tế bị trôi (drift)?"* — Nếu V_in có DC offset nhỏ (vài mV), tụ sẽ nạp dần đến bão hòa. Giải pháp: thêm R_f song song với C (thường R_f = 10×R_in) để tạo giới hạn DC gain.
- *"Mạch tích phân dùng tần số nào?"* — Tốt nhất ở dải tần số nơi X_C = 1/(2πfC) ≈ R_in. Tại f = 1/(2πRC), gain = 1 (0 dB) và phase shift = −90°.

### 3.2. Mạch vi phân (Differentiator)

Đổi vị trí: C ở đầu vào, R_f làm hồi tiếp.

**Công thức**:

\`\`\`
V_out = −R_f · C · dV_in/dt
\`\`\`

**Ý nghĩa**: đầu ra tỉ lệ với **tốc độ thay đổi** của đầu vào.

Ví dụ:
- Sóng vuông → xung nhọn tại mỗi cạnh chuyển tiếp (derivative của bước nhảy = xung Dirac).
- Sóng tam giác → sóng vuông (đạo hàm của hàm tuyến tính từng đoạn = hằng số từng đoạn).
- Sóng sin tần số f → sóng sin tần số f nhưng phase lệch 90° và biên độ tăng theo f (gain = 2πfRC).

⚠ **Lỗi thường gặp**: Mạch vi phân khuếch đại nhiễu tần số cao (gain tăng tuyến tính theo f) — nhạy cảm với noise. Trong thực tế, thêm R nhỏ nối tiếp C đầu vào để giới hạn gain tại tần số cao.

📝 **Tóm tắt mục 3**:
- Tích phân: C thay R_f → V_out = −(1/RC)∫V_in dt. Sóng vuông → sóng tam giác.
- Vi phân: C ở đầu vào, R_f hồi tiếp → V_out = −RC × dV_in/dt. Nhạy với noise.
- RC là hằng số thời gian điều khiển tốc độ tích/vi phân.
- Liên kết: [mạch RC cơ bản](../../01-Fundamentals/lesson-04-capacitor-rc/).

---

## 4. Comparator (Mạch so sánh)

### 4.1. Nguyên lý

💡 **Trực giác**: Op-amp không có hồi tiếp → gain hở (A_ol) cực lớn (10^5 đến 10^6). Ngay một sự chênh lệch nhỏ vài µV giữa V+ và V− cũng khuếch đại lên hàng chục volt → ngay lập tức bão hòa ở +V_sat hoặc −V_sat.

\`\`\`
Nếu V_in > V_ref → V_out = +V_sat ≈ +V_cc − 1.5 V
Nếu V_in < V_ref → V_out = −V_sat ≈ −V_cc + 1.5 V
\`\`\`

Đây là **bộ so sánh 1 bit**: biến đổi analog thành digital 0/1.

### 4.2. Walk-through: 3 ví dụ số

**Ví dụ 1 — Cảm biến ánh sáng (LDR) bật/tắt đèn**:
- V_ref = 2.5 V (đặt tại chân +, phân áp từ nguồn 5 V).
- V_in = điện áp từ LDR, thay đổi từ 0.5 V (tối) đến 4.5 V (sáng).
- Nguồn ±12 V → V_sat ≈ ±10.5 V.

| Điều kiện | V_in | So sánh | V_out |
|-----------|------|---------|-------|
| Trời tối | 1.0 V | 1.0 < 2.5 | −10.5 V → đèn BẬT |
| Trời sáng vừa | 2.5 V | 2.5 = 2.5 | Biên (không ổn định!) |
| Trời sáng | 4.0 V | 4.0 > 2.5 | +10.5 V → đèn TẮT |

**Ví dụ 2 — Cảm biến nhiệt độ (thermistor) báo động quá nhiệt**:
- Thermistor + điện trở phân áp → V_in tuyến tính với nhiệt độ.
- Hiệu chỉnh: 0 °C → 1.0 V, 100 °C → 4.0 V → hệ số 30 mV/°C.
- V_ref = 2.5 V → ngưỡng cảnh báo tại: T = (2.5 − 1.0)/0.03 = 50 °C.
- Khi T > 50 °C: V_in > 2.5 V → V_out = +V_sat → rơle bật quạt.

**Ví dụ 3 — Comparator zero-crossing (phát hiện qua 0)**:
- V_in = sóng sin 1 V biên độ.
- V_ref = 0 V (chân + nối đất).
- V_out: sóng vuông cùng tần số, +V_sat khi V_in > 0, −V_sat khi V_in < 0.
- Ứng dụng: đếm tần số, đo RPM (tốc độ quay), đồng bộ pha.

❓ **Câu hỏi tự nhiên**:
- *"Tại điểm biên (V_in = V_ref) có vấn đề gì?"* — Nếu V_in dao động nhẹ quanh V_ref (nhiễu), V_out sẽ bật/tắt nhiều lần rất nhanh — gây nhiễu logic, làm hỏng thiết bị nối sau. Giải pháp: Schmitt trigger (mục 5).
- *"Dùng op-amp thông thường làm comparator được không?"* — Được, nhưng IC comparator chuyên dụng (LM393, LM339) nhanh hơn (response time µs thay vì µs–ms) và có đầu ra open-collector để giao tiếp trực tiếp với logic 5 V/3.3 V.

⚠ **Lỗi thường gặp**:
- Quên đặt V_ref: nhiều người nối V_ref vào GND rồi ngạc nhiên tại sao đầu ra lúc nào cũng +V_sat. Kiểm tra V_ref thực tế bằng đồng hồ.
- Nhầm chân + và −: nếu V_in vào chân (−) và V_ref vào chân (+) → logic đảo ngược so với dự kiến.

📝 **Tóm tắt mục 4**:
- Op-amp không hồi tiếp = comparator: V_out = ±V_sat tùy V_in so với V_ref.
- Ngưỡng = V_ref (duy nhất một ngưỡng).
- Vấn đề: rung (chattering) khi V_in ~ V_ref. Giải pháp: Schmitt trigger.
- Ứng dụng: cảm biến ngưỡng, zero-crossing detector, ADC flash.

---

## 5. Schmitt Trigger (Comparator có hồi tiếp dương)

### 5.1. Vì sao cần trễ (Hysteresis)?

💡 **Trực giác**: Hãy nghĩ đến bộ điều nhiệt (thermostat) trong điều hòa. Nếu chỉ có 1 ngưỡng 25 °C: khi nhiệt độ tăng lên 25.01 °C → máy bật; tỏa nhiệt ra → nhiệt độ xuống 24.99 °C → máy tắt; lại tăng 25.01 °C → máy bật... Máy bật/tắt liên tục hàng chục lần mỗi phút — hỏng máy, tốn điện.

Giải pháp: **2 ngưỡng**. Máy bật tại 26 °C, tắt tại 24 °C. Khoảng 24–26 °C = vùng trễ (hysteresis window). Schmitt trigger làm đúng vậy với điện áp.

### 5.2. Cấu hình và công thức

**Schmitt trigger đảo** (inverting Schmitt trigger):
- V_in vào chân (−).
- Hồi tiếp dương: R1 từ V_out về chân (+), R2 từ chân (+) xuống GND.

\`\`\`
V_TH = +V_sat × R2/(R1 + R2)   (ngưỡng trên, V_out đang ở +V_sat)
V_TL = −V_sat × R2/(R1 + R2)   (ngưỡng dưới, V_out đang ở −V_sat)
Hysteresis window = V_TH − V_TL = 2 × V_sat × R2/(R1 + R2)
\`\`\`

**Cơ chế hoạt động**:
- V_out = +V_sat: ngưỡng kích = V_TH. Khi V_in tăng qua V_TH → V_out chuyển −V_sat.
- V_out = −V_sat: ngưỡng kích = V_TL. Khi V_in giảm qua V_TL → V_out chuyển +V_sat.
- Khi V_TL < V_in < V_TH: không chuyển trạng thái — **bất định song ổn** (bistable).

### 5.3. Walk-through: 3 ví dụ số

**Ví dụ 1 — Tính ngưỡng cơ bản**:
- V_sat = 10 V, R1 = 90 kΩ, R2 = 10 kΩ.

\`\`\`
V_TH = +10 × 10/(90 + 10) = +10 × 0.1 = +1.0 V
V_TL = −10 × 10/(90 + 10) = −10 × 0.1 = −1.0 V
Window = 2 V
\`\`\`

Tín hiệu nhiễu ±0.5 V quanh 0 V: vì |0.5| < 1.0 V = V_TH, đầu ra **không** thay đổi → chống nhiễu thành công.

**Ví dụ 2 — Cảm biến ánh sáng chống rung**:
- V_ref = 2.5 V (điểm giữa dải cảm biến ánh sáng).
- V_sat = 12 V, muốn hysteresis ±0.3 V quanh V_ref.
- Cần V_TH = 2.8 V, V_TL = 2.2 V.
- Dùng Schmitt trigger không đảo (non-inverting) với offset:

Cách thực tế: dùng cấu hình bộ so sánh với hồi tiếp dương, điều chỉnh R để có window = 0.6 V.

Từ V_TH = V_sat × R2/(R1+R2) = 0.3 V, V_sat = 12 V → R2/(R1+R2) = 0.025 → R1 = 39R2.
Chọn R2 = 1 kΩ, R1 = 39 kΩ. V_TH = 12×1/40 = 0.3 V. Thêm offset V_ref = 2.5 V tại chân + qua R_ref.

**Ví dụ 3 — Bộ tạo sóng vuông (astable Schmitt)**:
Kết hợp Schmitt trigger với mạch RC để tự dao động.

- Tụ C nạp/xả qua R giữa V_TH và V_TL → thời gian mỗi nửa kỳ: τ = RC × ln[(V_sat − V_TL)/(V_sat − V_TH)].
- Với R1 = 10 kΩ, R2 = 10 kΩ → V_TH = V_sat/2, V_TL = −V_sat/2.
- Chu kỳ T ≈ 2RC × ln(3) ≈ 2.2RC.
- Ví dụ: R = 100 kΩ, C = 10 nF → T ≈ 2.2 ms → f ≈ 455 Hz.

❓ **Câu hỏi tự nhiên**:
- *"Vì sao gọi là hồi tiếp dương?"* — Vì hồi tiếp cùng pha (V_out dương → V+ tăng → op-amp "càng chắc chắn hơn" là V_out dương) — khác hẳn hồi tiếp âm (V_out dương → giảm gain). Hồi tiếp dương tạo ra 2 trạng thái bền, không phải điểm cân bằng.
- *"Hysteresis window bao nhiêu là vừa?"* — Đủ lớn để che phủ biên độ nhiễu cao nhất dự kiến (thường 2–5× biên độ nhiễu). Quá rộng → ngưỡng kích lệch xa giá trị tín hiệu thật.

⚠ **Lỗi thường gặp**:
- Nhầm hồi tiếp âm và dương: hồi tiếp về chân (+) = dương (Schmitt), chân (−) = âm (khuếch đại thông thường). Hoán vị 2 điện trở hồi tiếp → mạch sẽ ở trạng thái cân bằng giả và không hoạt động đúng.
- Quên rằng V_TH và V_TL thay đổi theo V_sat: nếu nguồn không ổn định, ngưỡng trôi theo.

📝 **Tóm tắt mục 5**:
- Schmitt trigger: hồi tiếp dương về chân (+) → 2 ngưỡng V_TH và V_TL.
- V_TH = +V_sat × R2/(R1+R2), V_TL = −V_sat × R2/(R1+R2).
- Chống nhiễu/rung trong khoảng V_TL < V_in < V_TH.
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

**Bài 1**: Mạch cộng có R1 = 10 kΩ, R2 = 20 kΩ, R_f = 40 kΩ. V1 = 1 V, V2 = 2 V. Tính V_out. Kiểm tra V_out có bị bão hòa không nếu nguồn ±15 V.

**Bài 2**: Mạch trừ R_in = 10 kΩ, R_f = 50 kΩ. Đo được V1 = 4.90 V, V2 = 4.94 V. Tính V_out. Nếu cả hai dây đều nhiễm nhiễu chung 0.5 V (V1' = 5.40 V, V2' = 5.44 V), V_out thay đổi như thế nào?

**Bài 3**: Mạch tích phân R = 47 kΩ, C = 100 nF. V_in = sóng vuông ±3 V, tần số 500 Hz. Tính biên độ sóng tam giác đầu ra. Nguồn ±12 V — có bị bão hòa không?

**Bài 4**: Comparator dùng LM358, V_sat ≈ ±10 V. V_ref = 1.5 V. Điều kiện nào (V_in = bao nhiêu) thì V_out = +10 V? Vẽ bảng trạng thái.

**Bài 5**: Schmitt trigger đảo: R1 = 47 kΩ, R2 = 3 kΩ. Nguồn ±15 V (V_sat = 13.5 V). Tính V_TH, V_TL và hysteresis window. Tín hiệu nhiễu ±0.5 V đi vào — Schmitt trigger có rung không?

**Bài 6 (thử thách)**: DAC 3-bit dùng mạch cộng với R_f = 10 kΩ. Tính R0, R1, R2 để đầu ra:
- Bit 0 (LSB) đóng góp ±0.625 V khi ở mức cao (V_H = 5 V).
- Bit 1 đóng góp ±1.25 V.
- Bit 2 (MSB) đóng góp ±2.5 V.

---

## Lời giải chi tiết

### Bài 1

**Bước 1**: Áp dụng công thức mạch cộng.

\`\`\`
V_out = −R_f × (V1/R1 + V2/R2)
       = −40k × (1/10k + 2/20k)
       = −40k × (0.1 mA + 0.1 mA)
       = −40k × 0.2 mA
       = −8 V
\`\`\`

**Bước 2**: Kiểm tra bão hòa với nguồn ±15 V.

V_sat ≈ 15 − 1.5 = 13.5 V. |V_out| = 8 V < 13.5 V → **không bị bão hòa**. Mạch hoạt động tuyến tính.

**Kiểm chứng từng thành phần**: R_f/R1 × V1 = 4 × 1 = 4 V, R_f/R2 × V2 = 2 × 2 = 4 V. Tổng = −(4 + 4) = −8 V ✓.

### Bài 2

**Bước 1**: Không nhiễu (V1 = 4.90 V, V2 = 4.94 V):

\`\`\`
V_out = (R_f/R_in) × (V2 − V1)
       = (50k/10k) × (4.94 − 4.90)
       = 5 × 0.04
       = 0.2 V
\`\`\`

**Bước 2**: Có nhiễu (V1' = 5.40 V, V2' = 5.44 V):

\`\`\`
V_out' = 5 × (5.44 − 5.40) = 5 × 0.04 = 0.2 V
\`\`\`

**Kết luận**: V_out không thay đổi. Nhiễu chung 0.5 V bị triệt tiêu hoàn toàn vì:

\`\`\`
V2' − V1' = (4.94 + 0.5) − (4.90 + 0.5) = 4.94 − 4.90 = 0.04 V (giống hệt)
\`\`\`

### Bài 3

**Bước 1**: Tính RC và biên độ tam giác.

\`\`\`
RC = 47k × 100n = 4700 µs = 4.7 ms
T = 1/500 Hz = 2 ms → T/2 = 1 ms (thời gian mỗi nửa kỳ)
Biên độ = V_in × (T/2) / RC = 3 × 1ms / 4.7ms = 3 × 0.213 = 0.638 V
\`\`\`

**Bước 2**: Kiểm tra bão hòa.

V_sat ≈ 10.5 V. Biên độ = 0.638 V << 10.5 V → **không bị bão hòa**. Mạch hoạt động đúng.

**Giải thích**: RC = 4.7 ms lớn hơn T/2 = 1 ms → tụ chỉ nạp một phần nhỏ → dốc sóng tam giác nhỏ. Nếu muốn biên độ 3 V, cần RC = 3 × 1ms / 3 = 1 ms → dùng R = 10 kΩ, C = 100 nF.

### Bài 4

Comparator với V_ref = 1.5 V (tại chân +), V_in tại chân −.

| V_in (V) | Điều kiện | V_out |
|----------|-----------|-------|
| 0.5 | 0.5 < 1.5 → V+ > V− | +10 V |
| 1.0 | 1.0 < 1.5 → V+ > V− | +10 V |
| 1.5 | Biên (không ổn định) | Chuyển tiếp, có thể rung |
| 2.0 | 2.0 > 1.5 → V+ < V− | −10 V |
| 3.5 | 3.5 > 1.5 → V+ < V− | −10 V |

**Kết luận**: V_out = +10 V khi V_in < 1.5 V. V_out = −10 V khi V_in > 1.5 V. Vùng V_in ≈ 1.5 V có thể rung nếu tín hiệu nhiễu.

### Bài 5

**Bước 1**: Tính V_TH và V_TL.

\`\`\`
V_TH = +V_sat × R2/(R1 + R2) = +13.5 × 3/(47 + 3) = +13.5 × 0.06 = +0.81 V
V_TL = −V_sat × R2/(R1 + R2) = −13.5 × 0.06 = −0.81 V
Hysteresis window = V_TH − V_TL = 0.81 − (−0.81) = 1.62 V
\`\`\`

**Bước 2**: Kiểm tra chống nhiễu.

Nhiễu ±0.5 V: biên độ nhiễu = 0.5 V. Window = 1.62 V → bán window = 0.81 V > 0.5 V.

**Kết luận**: Khi tín hiệu ổn định (chưa kích ngưỡng), nhiễu ±0.5 V không đủ để vượt ngưỡng → Schmitt trigger **không rung**.

### Bài 6

**Bước 1**: Tính hệ số cần thiết cho mỗi bit.

V_H = 5 V, R_f = 10 kΩ. Hệ số của bit N = |V_out_contribution / V_H| = R_f / R_N.

- Bit 0 (LSB): đóng góp 0.625 V → R_f/R0 = 0.625/5 = 0.125 → R0 = 10k/0.125 = **80 kΩ**.
- Bit 1: đóng góp 1.25 V → R_f/R1 = 1.25/5 = 0.25 → R1 = 10k/0.25 = **40 kΩ**.
- Bit 2 (MSB): đóng góp 2.5 V → R_f/R2 = 2.5/5 = 0.5 → R2 = 10k/0.5 = **20 kΩ**.

**Bước 2**: Kiểm tra với số nhị phân 111 (tất cả bit cao):

\`\`\`
V_out = −10k × (5/80k + 5/40k + 5/20k)
       = −10k × (0.0625 + 0.125 + 0.25) mA
       = −10k × 0.4375 mA
       = −4.375 V
\`\`\`

Tương đương: −(0.625 + 1.25 + 2.5) = −4.375 V ✓. Nguồn ±12 V → không bão hòa.

---

## 8. Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 07 — Op-amp cơ bản](../lesson-07-opamp-basics/): 2 quy tắc vàng, mạch đảo/không đảo.
  - [Lesson 04 — Tụ điện & RC](../../01-Fundamentals/lesson-04-capacitor-rc/): quan hệ I = C·dV/dt.
- Bài tiếp theo:
  - [Tầng 3 — Cổng logic Boolean](../../03-Digital-MCU/lesson-01-boolean-logic-gates/): từ tín hiệu analog bão hòa (comparator) sang thế giới số. Transistor MOSFET đóng gói thành cổng CMOS.

---

## 📝 Tổng kết Lesson 08

1. **Mạch cộng**: V_out = −R_f × (V1/R1 + V2/R2 + ...). Ứng dụng: audio mixer, DAC.
2. **Mạch trừ**: V_out = (R_f/R_in)(V2 − V1). Triệt tiêu nhiễu chung — nền tảng đo lường chính xác.
3. **Mạch tích phân**: V_out = −(1/RC)∫V_in dt. Sóng vuông → sóng tam giác.
4. **Mạch vi phân**: V_out = −RC·dV_in/dt. Nhạy với noise tần số cao.
5. **Comparator**: op-amp không hồi tiếp → ±V_sat. 1 ngưỡng, dễ rung.
6. **Schmitt trigger**: hồi tiếp dương → 2 ngưỡng V_TH/V_TL. Chống nhiễu, ứng dụng cảm biến bền.
7. **Chuỗi Tầng 2**: Diode → BJT → MOSFET → Op-amp. Op-amp là đỉnh xử lý analog; comparator là cầu nối sang kỹ thuật số.
`;
