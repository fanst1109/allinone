// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-08-project/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Dự án tổng hợp: Hệ điều khiển nhiệt độ tự động

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu mô hình **Sense → Process → Act** của mọi hệ nhúng (embedded system).
- Xây dựng trên giấy (và mô phỏng) một hệ điều khiển nhiệt độ hoàn chỉnh: cảm biến nhiệt trở (thermistor) → ADC → vi điều khiển → MOSFET điều khiển quạt/sưởi → OLED hiển thị.
- Tính toán mạch phân áp cảm biến, điện trở hạn dòng LED, chọn MOSFET phù hợp.
- Viết thuật toán điều khiển với vùng trễ (hysteresis) tránh bật/tắt liên tục (chattering).
- Đọc và hiểu code Arduino-C đầy đủ cho hệ thống.
- Nắm bản đồ toàn lĩnh vực Electronics đã học và biết hướng đi tiếp theo.

## Kiến thức tiền đề

- [Lesson 05 — ADC/DAC](../lesson-05-adc-dac/) — đọc giá trị analog từ cảm biến.
- [Lesson 06 — GPIO & PWM](../lesson-06-microcontroller-gpio/) — điều khiển chân I/O, PWM điều tốc.
- [Lesson 07 — Giao tiếp I2C/SPI/UART](../lesson-07-communication-protocols/) — giao tiếp với OLED.
- [Lesson 06 MOSFET (Semiconductors)](../../02-Semiconductors/lesson-06-mosfet/) — dùng MOSFET làm công tắc.
- [Lesson 05 BJT Switch (Semiconductors)](../../02-Semiconductors/lesson-05-bjt-switch/) — so sánh với BJT.
- [Lesson 08 Op-amp Applications (Semiconductors)](../../02-Semiconductors/lesson-08-opamp-applications/) — Schmitt trigger liên quan hysteresis.

---

## 1. Mô hình hệ nhúng: Sense → Process → Act

### 1.1. Sơ đồ tổng quát

💡 **Trực giác**: mọi hệ nhúng — dù là lò nướng bánh, máy lạnh, robot hút bụi hay vệ tinh — đều hoạt động theo một vòng lặp duy nhất: **cảm nhận thế giới → xử lý thông tin → hành động lên thế giới**. Không có ngoại lệ.

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                 HỆ NHÚNG TỔNG QUÁT                      │
│                                                         │
│  [MÔI TRƯỜNG]                                           │
│       │ tín hiệu vật lý (nhiệt, ánh sáng, âm thanh...) │
│       ▼                                                 │
│  [CẢM BIẾN / SENSOR]  ──►  [CHUYỂN ĐỔI A/D]            │
│  (thermistor, LM35,          (ADC 10-bit)               │
│   DHT22, PIR...)                                        │
│                               │ số hóa                  │
│                               ▼                         │
│                    [VI ĐIỀU KHIỂN / MCU]                │
│                    (Arduino, ESP32, STM32)               │
│                    • Đọc cảm biến                       │
│                    • Chạy thuật toán điều khiển          │
│                    • Giao tiếp (I2C, UART, SPI)          │
│                               │ quyết định              │
│                               ▼                         │
│  [ACTUATOR / BỘ CHẤP HÀNH]                              │
│  (MOSFET + quạt, relay + sưởi, servo, buzzer...)        │
│       │ tác động                                        │
│       ▼                                                 │
│  [MÔI TRƯỜNG] ← vòng lặp khép kín (closed-loop)        │
│                                                         │
│  SONG SONG: [HIỂN THỊ] (OLED I2C, LCD, UART/Serial)    │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Bốn khối chức năng chính**:

| Khối | Chức năng | Ví dụ linh kiện |
|------|-----------|-----------------|
| Sensor | Chuyển đại lượng vật lý → tín hiệu điện | Thermistor NTC, LM35, DHT22 |
| ADC | Số hóa điện áp analog → giá trị số | ADC 10-bit tích hợp trong ATmega328 |
| MCU | Chạy thuật toán, ra quyết định | Arduino Uno (ATmega328P, 16 MHz) |
| Actuator | Chuyển tín hiệu số → hành động vật lý | MOSFET N-ch + quạt DC, relay + sưởi |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao cần ADC riêng? MCU không đọc thẳng điện áp được sao?"* — MCU chỉ hiểu 0/1 (digital). ADC là cầu nối giữa thế giới tương tự (nhiệt độ liên tục) và thế giới số. Arduino Uno có ADC 10-bit tích hợp sẵn.
- *"Closed-loop nghĩa là gì?"* — Đầu ra (nhiệt độ phòng sau khi bật quạt) quay lại ảnh hưởng đầu vào (MCU đọc lại nhiệt độ). Ngược với open-loop là bật quạt cố định không quan tâm kết quả.
- *"Sensor giao tiếp với MCU qua gì?"* — Nhiều cách: điện áp analog (thermistor qua ADC), giao thức số I2C (DHT22, OLED), SPI, UART. Bài này dùng cả hai.

📝 **Tóm tắt mục 1**
- Mọi hệ nhúng = vòng lặp Sense → Process → Act.
- ADC cầu nối thế giới analog ↔ digital.
- Hiển thị (OLED, UART) là kênh quan sát, không bắt buộc cho vòng điều khiển nhưng cần thiết để debug và giám sát.

---

## 2. Đề bài cụ thể: hệ điều khiển nhiệt độ lồng ấp

### 2.1. Yêu cầu chức năng

Thiết kế hệ điều khiển nhiệt độ lồng ấp gà (hoặc phòng nhỏ) với các đặc tả:

- **Đọc nhiệt độ** liên tục qua thermistor NTC 10 kΩ kết nối qua ADC.
- **Setpoint** (nhiệt độ mục tiêu): 37.5 °C (lồng ấp trứng gà).
- **Vùng trễ** (hysteresis): ± 0.5 °C — bật sưởi khi T < 37.0 °C, tắt khi T > 38.0 °C.
- **Điều khiển actuator**: MOSFET N-channel bật/tắt quạt làm mát (khi quá nóng) và relay bật/tắt đèn sưởi (khi lạnh).
- **Hiển thị** qua OLED 128×64 I2C: nhiệt độ hiện tại, trạng thái (COOLING/HEATING/OK).
- **LED báo trạng thái**: LED đỏ = đang sưởi, LED xanh = đang làm mát, LED tắt = trong ngưỡng.
- **Cảnh báo**: nếu T > 42 °C hoặc T < 30 °C → bật buzzer 3 lần.

### 2.2. Danh sách linh kiện

| Linh kiện | Thông số | Vai trò |
|-----------|----------|---------|
| Arduino Uno | ATmega328P, 5 V, 16 MHz | Vi điều khiển trung tâm |
| Thermistor NTC | 10 kΩ tại 25 °C, B = 3950 | Cảm biến nhiệt độ |
| Điện trở R1 | 10 kΩ, 1/4 W | Phân áp (voltage divider) với thermistor |
| MOSFET | IRLZ44N (N-ch, V_GS(th) = 1-2 V, I_D = 47 A) | Điều khiển quạt DC 12 V, 0.5 A |
| Relay module | 5 V coil, 10 A / 250 VAC | Bật/tắt sưởi 220 V AC |
| Diode bảo vệ | 1N4007 | Flyback diode cho relay |
| Điện trở R_G | 100 Ω | Hạn dòng gate MOSFET |
| OLED 128×64 | I2C, 3.3-5 V | Hiển thị nhiệt độ + trạng thái |
| LED đỏ | Vf = 2.0 V | Báo đang sưởi |
| LED xanh | Vf = 2.2 V | Báo đang làm mát |
| Điện trở R_LED | 150 Ω | Hạn dòng LED |
| Buzzer | 5 V active | Cảnh báo |
| Nguồn | 5 V USB (Arduino) + 12 V cho quạt | Nguồn cấp |

### 2.3. Sơ đồ kết nối (schematic mô tả)

\`\`\`
Arduino Uno
─────────────────────────────────────────────────────────────
  A0 ────────── Node giữa (R1 + Thermistor)
                    │
  5V ──── R1 (10 kΩ) ──── Node giữa ──── Thermistor ──── GND

  D9  ────── R_G (100 Ω) ────── Gate MOSFET (IRLZ44N)
                                 Drain ──── Quạt DC (+) ──── 12V
                                 Source ──── GND (chung)
                                 (1N4007 từ Drain → 12V, ngược chiều)

  D7  ────── Relay IN (active LOW module)
              Relay COM/NO ──── Đèn sưởi ──── 220V AC

  D6  ────── R_LED (150 Ω) ──── LED đỏ ──── GND
  D5  ────── R_LED (150 Ω) ──── LED xanh ──── GND
  D4  ────── Buzzer ──── GND

  A4 (SDA) ──── OLED SDA
  A5 (SCL) ──── OLED SCL
  5V ──── OLED VCC
  GND ──── OLED GND
─────────────────────────────────────────────────────────────
\`\`\`

📝 **Tóm tắt mục 2**
- Thermistor NTC + R1 tạo mạch phân áp, A0 đọc điện áp ở giữa.
- MOSFET N-ch điều khiển tải DC (quạt), relay điều khiển tải AC (sưởi).
- OLED qua I2C (A4/A5), LED/buzzer qua GPIO digital.

---

## 3. Tính toán thiết kế phần cứng

### 3.1. Mạch phân áp thermistor NTC

💡 **Trực giác mạch phân áp**: đặt R1 (cố định) nối tiếp với thermistor (thay đổi theo nhiệt độ), đo điện áp ở điểm giữa. Khi nhiệt độ tăng → R_thermistor giảm → điện áp tại A0 giảm (do R1 chiếm tỷ lệ lớn hơn).

**Công thức phân áp**:

\`\`\`
V_A0 = V_CC × R_thermistor / (R1 + R_thermistor)
\`\`\`

Với V_CC = 5 V, R1 = 10 kΩ, R_thermistor = R_NTC(T):

**Công thức Steinhart-Hart** (đơn giản hóa B-parameter):

\`\`\`
1/T = 1/T₀ + (1/B) × ln(R_NTC / R₀)
\`\`\`

Trong đó: T₀ = 298.15 K (25 °C), R₀ = 10 kΩ, B = 3950 K.

**Walk-through tại 25 °C (298.15 K)**:
- R_NTC = 10 kΩ (định nghĩa tại 25 °C).
- V_A0 = 5 × 10 / (10 + 10) = **2.50 V**.
- Giá trị ADC 10-bit = 2.50 / 5 × 1023 ≈ **511 (~ 512)**.

**Walk-through tại 37 °C (310.15 K)**:
- 1/T = 1/298.15 + (1/3950) × ln(R_NTC/10000).
- Giải ngược: R_NTC = R₀ × exp(B × (1/T − 1/T₀)) = 10000 × exp(3950 × (1/310.15 − 1/298.15)).
- 1/310.15 − 1/298.15 = 0.003224 − 0.003354 = −0.0001297.
- R_NTC = 10000 × exp(3950 × (−0.0001297)) = 10000 × exp(−0.5123) = 10000 × 0.5993 ≈ **5993 Ω ≈ 5.99 kΩ**.
- V_A0 = 5 × 5993 / (10000 + 5993) = 5 × 5993 / 15993 ≈ **1.875 V**.
- Giá trị ADC ≈ 1.875 / 5 × 1023 ≈ **383**.

**Walk-through tại 42 °C (315.15 K)**:
- R_NTC = 10000 × exp(3950 × (1/315.15 − 1/298.15)) = 10000 × exp(3950 × (−0.000180)) = 10000 × exp(−0.712) ≈ **4907 Ω ≈ 4.91 kΩ**.
- V_A0 = 5 × 4907 / (10000 + 4907) ≈ **1.647 V** → ADC ≈ **337**.

**Bảng tóm tắt ADC vs. nhiệt độ**:

| Nhiệt độ | R_NTC | V_A0 | ADC (0–1023) |
|----------|-------|-------|--------------|
| 20 °C | 12.09 kΩ | 2.75 V | 564 |
| 25 °C | 10.00 kΩ | 2.50 V | 511 |
| 30 °C | 8.31 kΩ | 2.26 V | 463 |
| 37 °C | 5.99 kΩ | 1.87 V | 383 |
| 40 °C | 5.32 kΩ | 1.73 V | 355 |
| 42 °C | 4.91 kΩ | 1.65 V | 337 |

⚠ **Lỗi thường gặp**: kết nối R1 ở phía GND thay vì V_CC — khi đó V_A0 tăng theo nhiệt độ (ngược lại), gây đảo logic điều khiển. Hãy kiểm tra chiều kết nối trước khi nạp code.

### 3.2. Tính điện trở hạn dòng LED

Điện áp nguồn V_CC = 5 V, LED đỏ có Vf = 2.0 V, dòng làm việc I_LED = 20 mA.

\`\`\`
R_LED = (V_CC − Vf) / I_LED = (5.0 − 2.0) / 0.020 = 3.0 / 0.020 = 150 Ω
\`\`\`

Công suất điện trở: P = I² × R = (0.020)² × 150 = 0.06 W = **60 mW** → an toàn với loại 1/4 W.

Tương tự cho LED xanh: Vf = 2.2 V → R = (5.0 − 2.2) / 0.020 = 2.8 / 0.020 = **140 Ω** → chọn 150 Ω tiêu chuẩn, I_thực = 2.8 / 150 ≈ **18.7 mA** — chấp nhận được.

### 3.3. Chọn MOSFET cho quạt

Yêu cầu: bật/tắt quạt DC 12 V, 0.5 A (6 W) từ GPIO Arduino (V_GPIO = 5 V, I_GPIO_max = 40 mA).

**Tiêu chí chọn**:
- V_GS(th) < V_GPIO = 5 V: chọn logic-level MOSFET như **IRLZ44N** (V_GS(th) = 1–2 V).
- I_D > 1.5 × I_quạt = 0.75 A (derating 1.5×): IRLZ44N I_D = 47 A — dư dùng.
- V_DS > 12 V: IRLZ44N V_DSS = 55 V — đủ.
- R_DS(on) thấp: 22 mΩ tại V_GS = 10 V → công suất tản nhiệt P = I² × R_DS(on) = 0.5² × 0.022 = **0.0055 W** — không cần tản nhiệt.

**Điện trở gate R_G = 100 Ω**: hạn dòng xung khi gate chuyển trạng thái, bảo vệ GPIO Arduino. Dòng GPIO không bao giờ vượt V/R = 5/100 = 50 mA > 40 mA trong tức thì (thực tế nhỏ hơn do gate charge), nhưng R_G = 100 Ω là convention an toàn. Có thể dùng 220 Ω nếu tốc độ chuyển mạch không quan trọng.

**Diode flyback 1N4007**: bảo vệ MOSFET khỏi điện áp ngược khi quạt (tải cảm kháng) tắt đột ngột. Đặt từ Drain → 12 V (anode ở Drain, cathode ở 12 V). Xem thêm: [Lesson 05 BJT Switch — flyback diode](../../02-Semiconductors/lesson-05-bjt-switch/).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng relay cho quạt thay MOSFET?"* — Được, nhưng relay chậm hơn (~10 ms), không dùng được cho PWM tần số cao, tiếng click to, tuổi thọ thấp hơn (cơ khí). MOSFET im lặng, nhanh, tuổi thọ vô hạn về điện.
- *"MOSFET N-ch kéo tải về GND hay về VCC?"* — N-ch thường dùng low-side switch: Source nối GND, Drain nối tải. Gate HIGH → dẫn → tải chạy. Đây là cấu hình bài này dùng.

📝 **Tóm tắt mục 3**
- Mạch phân áp NTC: V_A0 = V_CC × R_NTC / (R1 + R_NTC). Tại 37 °C → ADC ≈ 383.
- R_LED = (V_CC − Vf) / I_LED = 150 Ω cho cả LED đỏ và xanh.
- IRLZ44N: logic-level MOSFET, V_GS(th) thấp, phù hợp GPIO 5 V. R_G = 100 Ω, diode flyback bắt buộc.

---

## 4. Thuật toán điều khiển

### 4.1. Ngưỡng đơn giản (bang-bang control) và vấn đề chattering

**Điều khiển on/off đơn giản nhất**:

\`\`\`
nếu T < setpoint → bật sưởi
nếu T ≥ setpoint → tắt sưởi
\`\`\`

⚠ **Vấn đề chattering**: nếu nhiệt độ dao động quanh setpoint (ví dụ 37.49 °C → 37.51 °C → 37.49 °C do nhiễu cảm biến), relay sẽ bật/tắt hàng trăm lần mỗi giây. Relay cơ khí có tuổi thọ ~100,000 lần đóng ngắt — chattering phá hỏng relay trong vài giờ.

### 4.2. Vùng trễ — Hysteresis

💡 **Trực giác hysteresis**: giống thermostat điều hòa — bật lạnh khi T > 26 °C, nhưng chỉ tắt khi T < 24 °C. Dải 24–26 °C là "vùng yên bình" không bật/tắt. Nguyên lý này giống Schmitt trigger điện tử (xem [Op-amp Applications — Schmitt trigger](../../02-Semiconductors/lesson-08-opamp-applications/)).

**Logic hysteresis cho bài này**:

\`\`\`
Setpoint = 37.5 °C
Hysteresis = 0.5 °C

Ngưỡng BẬT sưởi = setpoint − hysteresis = 37.0 °C
Ngưỡng TẮT sưởi = setpoint + hysteresis = 38.0 °C

Nếu T < 37.0 °C  → BẬT sưởi (HEATING)
Nếu T > 38.0 °C  → BẬT quạt (COOLING)
Nếu 37.0 ≤ T ≤ 38.0 → GIỮ trạng thái hiện tại (HOLD)
\`\`\`

**Lý do "HOLD" quan trọng**: trong vùng trễ, KHÔNG thay đổi trạng thái. Sưởi đang bật thì giữ bật cho đến khi T > 38.0 °C. Quạt đang bật thì giữ bật cho đến khi T < 37.0 °C. Đây là bản chất của hysteresis — trạng thái phụ thuộc lịch sử.

**Walk-through simulation (5 bước)**:

| Bước | T (°C) | Trạng thái trước | Logic | Trạng thái sau |
|------|---------|-----------------|-------|----------------|
| 1 | 35.0 | OFF | T < 37.0 → bật sưởi | HEATING |
| 2 | 37.3 | HEATING | 37.0 ≤ T ≤ 38.0 → giữ | HEATING |
| 3 | 38.2 | HEATING | T > 38.0 → tắt sưởi, bật quạt | COOLING |
| 4 | 37.8 | COOLING | 37.0 ≤ T ≤ 38.0 → giữ | COOLING |
| 5 | 36.9 | COOLING | T < 37.0 → tắt quạt, bật sưởi | HEATING |

→ Relay/MOSFET chỉ chuyển trạng thái khi T vượt qua ngưỡng thực sự, không phải mỗi khi nhiệt độ dao động nhẹ.

### 4.3. Mở rộng: PWM điều tốc quạt

Thay vì bật/tắt hoàn toàn, có thể điều chỉnh tốc độ quạt theo mức độ cần làm mát (xem [Lesson 06 — GPIO & PWM](../lesson-06-microcontroller-gpio/)):

\`\`\`
Nếu T > 38.0 °C: PWM = 50%   (làm mát nhẹ)
Nếu T > 39.0 °C: PWM = 75%   (làm mát vừa)
Nếu T > 40.0 °C: PWM = 100%  (làm mát tối đa)
\`\`\`

Điều này cho phép hệ hội tụ mượt mà hơn, ít dao động nhiệt độ hơn.

### 4.4. Giới thiệu điều khiển PID (định tính)

Bang-bang + hysteresis là đủ cho nhiều ứng dụng đơn giản. Khi cần chính xác hơn (lò reflow hàn SMD, lò nung, lồng ấp công nghiệp), người ta dùng **PID (Proportional-Integral-Derivative)**:

- **P (Tỷ lệ)**: ra lệnh actuator tỷ lệ với *sai số hiện tại* (T_mục_tiêu − T_hiện_tại). Sai số lớn → tác động mạnh.
- **I (Tích phân)**: bù sai số tích lũy theo thời gian. Giải quyết sai số ổn định (steady-state error).
- **D (Đạo hàm)**: phản ứng theo *tốc độ thay đổi* sai số. Giảm dao động quá mức (overshoot).

PID là thuật toán điều khiển phổ biến nhất trong công nghiệp (ước tính > 90% vòng điều khiển). Học sâu hơn trong khóa Điều khiển tự động (Control Systems).

📝 **Tóm tắt mục 4**
- Bang-bang on/off đơn giản gây chattering — phá hỏng relay.
- Hysteresis: bật sưởi khi T < (setpoint − h), tắt khi T > (setpoint + h). Trong vùng trễ → giữ trạng thái.
- PWM điều tốc quạt: mượt mà hơn bật/tắt hoàn toàn.
- PID: cấp độ cao hơn cho ứng dụng cần chính xác.

---

## 5. Code Arduino-C đầy đủ

\`\`\`cpp
/*
 * Hệ điều khiển nhiệt độ lồng ấp
 * MCU: Arduino Uno (ATmega328P)
 * Cảm biến: Thermistor NTC 10kΩ (B=3950) + R1=10kΩ phân áp
 * Actuator: MOSFET quạt DC (D9), Relay sưởi (D7)
 * Hiển thị: OLED I2C 128x64 (A4=SDA, A5=SCL)
 * LED: Đỏ D6 (HEATING), Xanh D5 (COOLING)
 * Buzzer: D4
 *
 * Thư viện cần cài: Adafruit_SSD1306, Adafruit_GFX
 */

#include <Wire.h>
#include <Adafruit_SSD1306.h>

// ── Cấu hình phần cứng ──────────────────────────────────────
#define PIN_THERMISTOR  A0
#define PIN_FAN_MOSFET  9    // PWM-capable pin
#define PIN_HEATER_RELAY 7
#define PIN_LED_RED     6
#define PIN_LED_GREEN   5
#define PIN_BUZZER      4

// ── Thông số cảm biến ───────────────────────────────────────
const float R1          = 10000.0;  // Điện trở cố định (Ω)
const float R_NTC_25    = 10000.0;  // R_NTC tại 25°C (Ω)
const float B_COEFF     = 3950.0;   // Hệ số B của thermistor
const float T0_KELVIN   = 298.15;   // 25°C = 298.15 K
const float VCC         = 5.0;      // Điện áp nguồn (V)
const int   ADC_MAX     = 1023;     // ADC 10-bit

// ── Thông số điều khiển ─────────────────────────────────────
const float SETPOINT    = 37.5;     // Nhiệt độ mục tiêu (°C)
const float HYSTERESIS  = 0.5;      // Vùng trễ (°C) — mỗi bên ±0.5
const float T_HEAT_ON   = SETPOINT - HYSTERESIS;  // 37.0°C
const float T_COOL_ON   = SETPOINT + HYSTERESIS;  // 38.0°C
const float T_ALARM_HI  = 42.0;    // Ngưỡng cảnh báo quá nóng
const float T_ALARM_LO  = 30.0;    // Ngưỡng cảnh báo quá lạnh

// ── Biến trạng thái ─────────────────────────────────────────
enum State { OFF, HEATING, COOLING };
State currentState = OFF;

// ── OLED ─────────────────────────────────────────────────────
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ─────────────────────────────────────────────────────────────

void setup() {
  Serial.begin(9600);

  // Cấu hình GPIO
  pinMode(PIN_FAN_MOSFET,    OUTPUT);
  pinMode(PIN_HEATER_RELAY,  OUTPUT);
  pinMode(PIN_LED_RED,       OUTPUT);
  pinMode(PIN_LED_GREEN,     OUTPUT);
  pinMode(PIN_BUZZER,        OUTPUT);

  // Trạng thái ban đầu: tất cả tắt
  digitalWrite(PIN_FAN_MOSFET,   LOW);
  digitalWrite(PIN_HEATER_RELAY, HIGH);  // relay active-LOW: HIGH = TẮT
  digitalWrite(PIN_LED_RED,      LOW);
  digitalWrite(PIN_LED_GREEN,    LOW);
  digitalWrite(PIN_BUZZER,       LOW);

  // Khởi tạo OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED không tìm thấy — kiểm tra kết nối I2C");
    // Không dừng chương trình, vẫn điều khiển nhiệt độ
  }
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.display();

  Serial.println("=== Hệ điều khiển nhiệt độ khởi động ===");
  Serial.print("Setpoint: ");
  Serial.print(SETPOINT);
  Serial.println(" C");
}

// ─────────────────────────────────────────────────────────────
// Đọc ADC và chuyển đổi sang nhiệt độ (°C)
// Áp dụng Steinhart-Hart B-parameter equation
// ─────────────────────────────────────────────────────────────
float readTemperature() {
  // Đọc ADC nhiều lần và lấy trung bình (giảm nhiễu)
  long sum = 0;
  const int N_SAMPLES = 8;
  for (int i = 0; i < N_SAMPLES; i++) {
    sum += analogRead(PIN_THERMISTOR);
    delay(2);
  }
  float adcVal = (float)sum / N_SAMPLES;

  // Chuyển ADC → điện áp → R_NTC
  float voltage  = adcVal * VCC / ADC_MAX;
  float r_ntc    = R1 * voltage / (VCC - voltage);
  // Lưu ý: R_NTC = R1 × V_A0 / (VCC − V_A0)
  // Vì V_A0 = VCC × R_NTC / (R1 + R_NTC) → giải ra R_NTC

  // Chuyển R_NTC → nhiệt độ (K) theo công thức B-parameter
  float tempK = 1.0 / (1.0 / T0_KELVIN + log(r_ntc / R_NTC_25) / B_COEFF);
  float tempC = tempK - 273.15;

  return tempC;
}

// ─────────────────────────────────────────────────────────────
// Thuật toán điều khiển hysteresis
// ─────────────────────────────────────────────────────────────
void controlLogic(float temp) {
  if (temp < T_HEAT_ON) {
    // Quá lạnh → bật sưởi, tắt quạt
    currentState = HEATING;
    digitalWrite(PIN_HEATER_RELAY, LOW);   // relay active-LOW: LOW = BẬT
    digitalWrite(PIN_FAN_MOSFET,   LOW);   // tắt quạt
    digitalWrite(PIN_LED_RED,      HIGH);  // LED đỏ BẬT
    digitalWrite(PIN_LED_GREEN,    LOW);
  } else if (temp > T_COOL_ON) {
    // Quá nóng → bật quạt, tắt sưởi
    currentState = COOLING;
    digitalWrite(PIN_HEATER_RELAY, HIGH);  // tắt sưởi
    analogWrite(PIN_FAN_MOSFET,    200);   // quạt PWM ~78%
    digitalWrite(PIN_LED_RED,      LOW);
    digitalWrite(PIN_LED_GREEN,    HIGH);  // LED xanh BẬT
  } else {
    // Trong vùng trễ → GIỮ trạng thái hiện tại (không thay đổi)
    // Đây là bản chất hysteresis — chỉ cập nhật LED theo state
    if (currentState == HEATING) {
      digitalWrite(PIN_LED_RED,   HIGH);
      digitalWrite(PIN_LED_GREEN, LOW);
    } else if (currentState == COOLING) {
      digitalWrite(PIN_LED_RED,   LOW);
      digitalWrite(PIN_LED_GREEN, HIGH);
    } else {
      digitalWrite(PIN_LED_RED,   LOW);
      digitalWrite(PIN_LED_GREEN, LOW);
    }
    // Không thay đổi relay/MOSFET
  }
}

// ─────────────────────────────────────────────────────────────
// Kiểm tra và phát cảnh báo
// ─────────────────────────────────────────────────────────────
void checkAlarm(float temp) {
  if (temp > T_ALARM_HI || temp < T_ALARM_LO) {
    // Bíp 3 lần
    for (int i = 0; i < 3; i++) {
      digitalWrite(PIN_BUZZER, HIGH);
      delay(200);
      digitalWrite(PIN_BUZZER, LOW);
      delay(200);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Cập nhật màn hình OLED
// ─────────────────────────────────────────────────────────────
void updateDisplay(float temp) {
  display.clearDisplay();

  // Dòng 1: nhiệt độ lớn
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print("T: ");
  display.print(temp, 1);  // 1 chữ số thập phân
  display.print(" C");

  // Dòng 2: setpoint
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.print("Set: ");
  display.print(SETPOINT, 1);
  display.print("C  Hys:");
  display.print(HYSTERESIS, 1);

  // Dòng 3: trạng thái
  display.setCursor(0, 36);
  display.setTextSize(1);
  switch (currentState) {
    case HEATING: display.print(">> HEATING <<"); break;
    case COOLING: display.print(">> COOLING <<"); break;
    default:      display.print("   IN RANGE   "); break;
  }

  // Dòng 4: thanh trạng thái đơn giản
  display.setCursor(0, 50);
  int barLen = map((int)(temp * 10), 300, 430, 0, 100);
  barLen = constrain(barLen, 0, 100);
  display.print("|");
  for (int i = 0; i < barLen / 9; i++) display.print("#");
  display.print("|");

  display.display();
}

// ─────────────────────────────────────────────────────────────
// Vòng lặp chính
// ─────────────────────────────────────────────────────────────
void loop() {
  float temp = readTemperature();

  // Điều khiển
  controlLogic(temp);

  // Cảnh báo
  checkAlarm(temp);

  // Hiển thị OLED
  updateDisplay(temp);

  // Log ra Serial (dùng để debug, có thể tắt khi deploy)
  Serial.print("T=");
  Serial.print(temp, 2);
  Serial.print("C  State=");
  Serial.println(currentState == HEATING ? "HEATING" :
                 currentState == COOLING ? "COOLING" : "OK");

  delay(1000);  // Đọc mỗi 1 giây
}
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc về code**

- *"Tại sao relay dùng active-LOW nhưng MOSFET dùng active-HIGH?"* — Module relay thương mại thường có optocoupler active-LOW (LOW = bật). MOSFET N-ch dùng trực tiếp: HIGH = dẫn = bật quạt. Phải đọc datasheet module cụ thể để xác định.
- *"Tại sao lấy trung bình 8 mẫu ADC?"* — Nhiễu điện từ (từ motor quạt, nguồn xung) làm ADC dao động ± vài LSB. Lấy trung bình 8 mẫu giảm nhiễu ~2.83× (√8), cải thiện độ chính xác đọc nhiệt độ.
- *"Biến \`currentState\` ở đâu được giữ khi ở trong vùng trễ?"* — Khai báo global, không được ghi lại trong nhánh HOLD của \`controlLogic()\`. Trạng thái tồn tại trong RAM của MCU giữa các lần gọi \`loop()\`.

📝 **Tóm tắt mục 5**
- \`readTemperature()\`: ADC → điện áp → R_NTC → nhiệt độ qua Steinhart-Hart. Lấy trung bình 8 mẫu.
- \`controlLogic()\`: hysteresis — chỉ thay đổi state khi vượt ngưỡng, giữ state trong vùng trễ.
- \`updateDisplay()\`: in nhiệt độ, setpoint, trạng thái lên OLED I2C.
- Loop: đọc → điều khiển → cảnh báo → hiển thị → log → delay 1 s.

---

## 6. Tổng kết toàn lĩnh vực Electronics

### 6.1. Bản đồ 3 tầng đã học

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  TẦNG 1 — 01-Fundamentals (Nền tảng)                    │
│  L01: V, I, R — Định luật Ohm                           │
│  L02: Kirchhoff KVL/KCL — Phân tích mạch               │
│  L03: Tụ điện RC — Nạp/xả, thời hằng                   │
│  L04: Cuộn cảm RL — Lưu trữ năng lượng từ trường        │
│  L05: Mạch RLC & Cộng hưởng                             │
│  L06: AC — Pha, công suất, biến áp                      │
├─────────────────────────────────────────────────────────┤
│  TẦNG 2 — 02-Semiconductors (Linh kiện bán dẫn)        │
│  L01: Diode — Chỉnh lưu, ổn áp Zener                   │
│  L02: Diode đặc biệt — LED, Schottky, TVS               │
│  L03: BJT — Khuếch đại tín hiệu nhỏ                    │
│  L04: BJT Class A/B — Khuếch đại công suất              │
│  L05: BJT Switch — Bão hòa/cắt, flyback diode           │
│  L06: MOSFET — Logic-level switch, NMOS/PMOS            │
│  L07: MOSFET khuếch đại — Mạch cực nguồn                │
│  L08: Op-amp — Schmitt trigger, bộ lọc tích cực         │
├─────────────────────────────────────────────────────────┤
│  TẦNG 3 — 03-Digital-MCU (Số & Vi điều khiển)           │
│  L01: Cổng logic & Đại số Boole                         │
│  L02: Mạch tổ hợp — MUX, decoder, cộng                 │
│  L03: Flip-flop — D, JK, SR — Lưu trữ bit              │
│  L04: Register & Counter — Dịch bit, đếm                │
│  L05: ADC/DAC — Cầu nối analog ↔ digital                │
│  L06: MCU GPIO & PWM — Điều khiển I/O                   │
│  L07: I2C/SPI/UART — Giao tiếp ngoại vi                 │
│  L08: DỰ ÁN — Hệ điều khiển nhiệt độ (bài này)         │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 6.2. Những gì bạn đã thành thạo

Hoàn thành 20 lesson trong 3 tầng, bạn đã có khả năng:

- **Phân tích mạch điện** từ mạch đơn giản đến mạch RLC, AC, phản hồi.
- **Hiểu linh kiện** từ diode, BJT đến MOSFET, op-amp — không chỉ "dùng được" mà hiểu cơ chế bên trong.
- **Đọc datasheet** và chọn linh kiện phù hợp cho yêu cầu.
- **Lập trình MCU** ở mức thiết bị nhúng: đọc ADC, điều khiển GPIO/PWM, giao tiếp I2C/SPI/UART.
- **Tích hợp hệ thống**: từ cảm biến vật lý đến actuator, với thuật toán điều khiển thực tế.

### 6.3. Hướng học tiếp theo

| Hướng | Nội dung | Kỹ năng mới |
|-------|----------|-------------|
| **PCB Design** | KiCad/Altium: từ schematic → layout → Gerber → đặt board | Vật lý layout, EMC cơ bản, DFM |
| **FPGA/Verilog** | Thiết kế mạch số bằng HDL, xử lý song song thực sự | Tư duy hardware vs software |
| **Embedded/RTOS** | FreeRTOS trên STM32/ESP32: task, semaphore, queue | Real-time scheduling, concurrency |
| **IoT** | MQTT, HTTP REST, TLS, cloud (AWS IoT, Firebase) | Networking, security, cloud |
| **Power Electronics** | Buck/boost converter, inverter, motor control | Switching topology, PID thực chiến |
| **RF/Wireless** | Anten, BLE, WiFi, LoRa, modulation | Giao thức vô tuyến, link budget |

📝 **Tóm tắt mục 6**: Bạn đã hoàn tất nền tảng Electronics từ volt/ampere đến hệ nhúng tích hợp. Đây là nền móng vững chắc để bước vào bất kỳ hướng nào trong danh sách trên.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Cảnh báo quá nhiệt qua UART**: Sửa hàm \`checkAlarm()\` để thay vì chỉ bíp buzzer, còn gửi chuỗi cảnh báo qua \`Serial\` theo format: \`[ALARM] T=43.2C OVER_HEAT\` hoặc \`[ALARM] T=28.5C UNDER_TEMP\`. Thêm timestamp (dùng \`millis()\`).

**Bài 2 — Log dữ liệu qua UART (CSV)**: Sửa \`loop()\` để in dữ liệu dạng CSV mỗi 5 giây:
\`timestamp_ms,temperature,state,heater,fan\`
Ví dụ: \`10000,37.32,HEATING,1,0\`. Dữ liệu này có thể đọc bằng Serial Plotter hoặc lưu file.

**Bài 3 — Thêm cảm biến độ ẩm DHT22**: DHT22 giao tiếp 1-Wire đơn giản (có thư viện \`DHT.h\`). Bổ sung code đọc độ ẩm và hiển thị lên OLED dòng thứ 4. Xác định ngưỡng độ ẩm phù hợp cho lồng ấp trứng gà (55–65 %).

**Bài 4 — Đổi quạt sang PWM theo nhiệt độ**: Thay vì \`analogWrite(PIN_FAN_MOSFET, 200)\` cố định, tính PWM duty cycle tỷ lệ với khoảng cách từ T đến T_COOL_ON:
\`\`\`
duty = map(temp × 10, T_COOL_ON × 10, T_ALARM_HI × 10, 100, 255);
duty = constrain(duty, 0, 255);
\`\`\`
Giải thích tại sao cần nhân 10 trước khi dùng \`map()\` với float.

**Bài 5 — Ước tính dòng tiêu thụ hệ**: Cho biết: Arduino Uno tiêu thụ 50 mA ở 5 V; quạt DC 12 V, 0.5 A; đèn sưởi 60 W / 220 V; 2 LED mỗi 20 mA; OLED 20 mA; relay coil 80 mA. Tính:
- (a) Tổng dòng từ nguồn 5 V (USB/Arduino).
- (b) Tổng dòng từ nguồn 12 V.
- (c) Công suất toàn hệ khi sưởi đang bật.

### Lời giải chi tiết

**Bài 1 — Cảnh báo + UART**:

\`\`\`cpp
void checkAlarm(float temp) {
  bool alarm = (temp > T_ALARM_HI || temp < T_ALARM_LO);
  if (alarm) {
    // Bíp buzzer 3 lần
    for (int i = 0; i < 3; i++) {
      digitalWrite(PIN_BUZZER, HIGH); delay(200);
      digitalWrite(PIN_BUZZER, LOW);  delay(200);
    }
    // Log cảnh báo qua UART với timestamp
    Serial.print("[ALARM] T=");
    Serial.print(temp, 1);
    Serial.print("C ");
    if (temp > T_ALARM_HI) Serial.print("OVER_HEAT");
    else                    Serial.print("UNDER_TEMP");
    Serial.print(" t=");
    Serial.print(millis());
    Serial.println("ms");
  }
}
\`\`\`

\`millis()\` trả về số mili-giây từ lúc Arduino reset, kiểu \`unsigned long\`. Dùng để biết alarm xảy ra lúc nào mà không cần RTC (Real-Time Clock).

**Bài 2 — Log CSV**:

\`\`\`cpp
void logCSV(float temp) {
  static unsigned long lastLog = 0;
  if (millis() - lastLog < 5000) return;  // 5 giây mỗi lần
  lastLog = millis();

  int heater = (digitalRead(PIN_HEATER_RELAY) == LOW) ? 1 : 0;
  int fan    = (analogRead(PIN_FAN_MOSFET) > 0)       ? 1 : 0;
  // Lưu ý: analogRead trên output pin không tin cậy — thực tế dùng biến flag

  Serial.print(millis());    Serial.print(",");
  Serial.print(temp, 2);     Serial.print(",");
  Serial.print(currentState == HEATING ? "HEATING" :
               currentState == COOLING ? "COOLING" : "OK");
  Serial.print(",");
  Serial.print(heater);      Serial.print(",");
  Serial.println(fan);
}
\`\`\`

Lý tưởng hơn: dùng biến \`bool heaterOn, fanOn\` cập nhật trong \`controlLogic()\` thay vì đọc lại pin.

**Bài 3 — DHT22**:

\`\`\`cpp
#include <DHT.h>
DHT dht(PIN_DHT, DHT22);  // PIN_DHT = D3 chẳng hạn
void setup() { dht.begin(); }

// Trong loop():
float humidity = dht.readHumidity();
// Kiểm tra nan (lỗi đọc): if (isnan(humidity)) ...
// Thêm vào updateDisplay():
display.setCursor(0, 56);
display.print("H: ");
display.print(humidity, 0);
display.print("%  ");
if (humidity < 55) display.print("DRY!");
else if (humidity > 65) display.print("WET!");
else display.print("OK");
\`\`\`

Lồng ấp trứng gà: nhiệt độ 37–38 °C, độ ẩm 55–65 %. Các ngày cuối (ngày 18–21) nâng độ ẩm lên 70–80 %.

**Bài 4 — PWM tỷ lệ**:

\`map()\` trong Arduino nhận và trả về \`long\` (số nguyên), không phải float. Nếu truyền \`temp\` = 38.3 trực tiếp, phép chia làm tròn sai. Nhân 10 trước → làm việc với số nguyên 383 thay vì 38.3 → tránh sai số làm tròn.

\`\`\`cpp
int duty = map((int)(temp * 10),
               (int)(T_COOL_ON * 10),
               (int)(T_ALARM_HI * 10),
               80,    // tốc độ tối thiểu (không để 0 — quạt có thể không khởi động)
               255);
duty = constrain(duty, 0, 255);
analogWrite(PIN_FAN_MOSFET, duty);
\`\`\`

Tại T = 38.0 °C: duty = map(380, 380, 420, 80, 255) = **80** (~31 %).
Tại T = 40.0 °C: duty = map(400, 380, 420, 80, 255) = map(400−380=20, 0, 40, 80, 255) = 80 + 20/40×(255−80) = 80 + 87.5 ≈ **168** (~66 %).
Tại T = 42.0 °C: duty = **255** (100 %).

**Bài 5 — Tính dòng tiêu thụ**:

**(a) Nguồn 5 V (USB → Arduino Vin)**:

| Linh kiện | Dòng (mA) |
|-----------|-----------|
| Arduino Uno (MCU + regulator) | 50 |
| OLED I2C | 20 |
| LED đỏ (khi HEATING) | 20 |
| LED xanh (khi COOLING) | 20 |
| Relay coil | 80 |
| **Tổng (tình huống xấu nhất)** | **190 mA** |

USB chuẩn cấp 500 mA → an toàn. Nếu relay và LED cùng bật (không xảy ra trong logic này): 50+20+20+20+80 = 190 mA. Trong thực tế chỉ một LED bật: 50+20+20+80 = **170 mA**.

**(b) Nguồn 12 V**:

| Linh kiện | Dòng (mA) |
|-----------|-----------|
| Quạt DC 12 V / 0.5 A | 500 |
| **Tổng** | **500 mA** |

Dùng nguồn 12 V / 1 A là đủ (derating 2×).

**(c) Công suất toàn hệ khi sưởi bật**:

- Arduino 5 V: P = 5 × 0.170 = **0.85 W**.
- Đèn sưởi: **60 W** (định mức).
- Quạt tắt khi đang sưởi: 0 W.
- Tổng: ≈ **60.85 W** ≈ **61 W** (tải chủ yếu là sưởi).

Lưu ý: đèn sưởi 60 W / 220 V = 0.27 A AC. Relay chọn 10 A / 250 VAC là dư thừa — an toàn.

---

## Liên kết và bài tiếp theo

Đây là bài cuối của lĩnh vực Electronics. Các hướng học tiếp:

- **PCB Design**: KiCad (miễn phí, mã nguồn mở) — bắt đầu với tutorial "Blinky LED board".
- **STM32/ESP32**: vi điều khiển mạnh hơn Arduino, có Wi-Fi/BLE tích hợp (ESP32), hoặc dùng được với FreeRTOS.
- **FreeRTOS**: quản lý đa tác vụ thời gian thực — cần thiết khi hệ có nhiều sensor + giao tiếp song song.
- **Tham khảo sâu**: *"The Art of Electronics"* (Horowitz & Hill) — cuốn sách Electronics toàn diện nhất.

---

## 📝 Tổng kết Lesson 08

1. **Hệ nhúng = Sense → Process → Act** — vòng lặp khép kín, ADC cầu nối analog ↔ digital.
2. **Thermistor NTC + mạch phân áp**: V_A0 = VCC × R_NTC / (R1 + R_NTC); dùng Steinhart-Hart chuyển ADC → °C.
3. **Hysteresis tránh chattering**: bật khi T < (setpoint − h), tắt khi T > (setpoint + h), HOLD khi ở giữa.
4. **MOSFET N-ch logic-level (IRLZ44N)**: V_GS(th) thấp, điều khiển trực tiếp từ GPIO 5 V; R_G = 100 Ω, diode flyback bắt buộc.
5. **Code Arduino-C**: tách biệt các hàm đọc cảm biến, điều khiển, hiển thị, cảnh báo — dễ mở rộng và debug.
6. **Toàn lĩnh vực Electronics**: 3 tầng × 6–8 bài = nền tảng đầy đủ để bước vào PCB, FPGA, RTOS, IoT.

**Chúc mừng hoàn thành lộ trình Electronics!**
`;
