# Lesson 06 — MOSFET

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu trúc 3 chân **Gate / Drain / Source** của MOSFET và nguyên lý điều khiển bằng **điện áp V_GS** (khác với BJT dùng dòng).
- Biết **điện áp ngưỡng V_th** và phân biệt 3 vùng làm việc: cutoff, triode (ohmic), saturation.
- So sánh được MOSFET với BJT về tổn hao, tốc độ, ứng dụng công suất.
- Tính **tổn hao công suất P = I²·R_DS(on)** khi MOSFET dùng làm khóa.
- Hiểu nguyên lý **điều chế độ rộng xung (PWM)** để điều khiển động cơ và LED dimming.
- Biết các lưu ý thực tế: nạp tụ Gate, bảo vệ tĩnh điện, logic-level MOSFET.

## Kiến thức tiền đề

- [Lesson 05 — BJT làm khóa](../lesson-05-bjt-switch/) — cần hiểu BJT trước để so sánh rõ sự khác biệt MOSFET vs BJT.
- [Lesson 01 — Điện áp, Dòng điện, Điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/) — định luật Ohm, công suất P = I²R.
- [Lesson 02 — Mạch & Kirchhoff](../../01-Fundamentals/lesson-02-kirchhoff-circuits/) — phân tích vòng mạch.

---

## 1. MOSFET là gì?

### 1.1. Cấu trúc và 3 chân

**MOSFET** (Metal-Oxide-Semiconductor Field-Effect Transistor — transistor hiệu ứng trường bán dẫn oxide kim loại) là linh kiện bán dẫn 3 chân:

| Chân | Ký hiệu | Tương đương BJT | Chức năng |
|------|---------|-----------------|-----------|
| **Gate** (cổng) | G | Base | Chân điều khiển — nhận điện áp V_GS |
| **Drain** (máng) | D | Collector | Chân "vào" của dòng tải |
| **Source** (nguồn) | S | Emitter | Chân "ra" của dòng tải (thường nối GND) |

💡 **Trực giác**: Hãy hình dung MOSFET như một vòi nước điều khiển điện. **Gate là núm vặn**: khi bạn vặn đủ mạnh (V_GS cao), van mở, nước chảy từ Drain sang Source. Khi V_GS thấp, van đóng hoàn toàn — không một giọt nước nào chảy qua. Điểm đặc biệt: núm vặn (Gate) **cách điện hoàn toàn** với đường ống — bạn chỉ cần giữ núm ở vị trí "mở", không tốn sức (không tốn dòng).

**Loại phổ biến nhất: N-channel enhancement MOSFET**

- Kênh dẫn (channel) mặc định **chưa có** → cần V_GS > V_th để tạo kênh.
- Dòng chạy từ Drain → Source (chiều quy ước), electron đi từ Source → Drain.
- Ký hiệu mạch: mũi tên trỏ vào kênh (N-channel), có dấu cách giữa Gate và kênh (oxide cách điện).

### 1.2. Điểm khác biệt then chốt so với BJT

| Đặc điểm | MOSFET | BJT |
|-----------|--------|-----|
| **Điều khiển bởi** | Điện áp V_GS | Dòng điện I_B |
| **Dòng vào chân điều khiển (DC)** | ≈ 0 A (Gate cách điện) | I_B = I_C / β (cần dòng thật) |
| **Trở kháng vào** | Rất cao (GΩ) | Thấp hơn (kΩ) |
| **Phù hợp với vi điều khiển 3.3 V** | Dễ (dùng logic-level MOSFET) | Cần tính toán R_B |

❓ **Câu hỏi tự nhiên của người đọc:**

*"Gate cách điện hoàn toàn, vậy làm sao dòng nạp/ngắt Gate khi chuyển mạch nhanh?"*

→ Gate cách điện **ở DC**. Ở tần số cao, Gate là một tụ điện (C_GS, C_GD điển hình 1–10 nF). Mỗi lần đóng/ngắt, phải nạp/xả tụ này — cần dòng tức thời (xem Mục 6). Ở DC steady-state, dòng Gate = 0.

*"Tại sao gọi là 'enhancement'?"*

→ Vì điện áp Gate **tăng cường (enhance)** thêm kênh dẫn vào kênh vốn không có. Đối nghịch là **depletion** MOSFET (đã có kênh sẵn, Gate giảm kênh) — ít phổ biến hơn trong ứng dụng khóa công suất.

📝 **Tóm tắt mục 1**

- MOSFET: 3 chân Gate / Drain / Source; Gate cách điện → dòng Gate DC ≈ 0.
- Điều khiển bằng **điện áp V_GS** — khác BJT dùng dòng I_B.
- N-channel enhancement: kênh mở khi V_GS > V_th, đóng khi V_GS < V_th.

---

## 2. Điện áp ngưỡng V_th và các vùng làm việc

### 2.1. Điện áp ngưỡng V_GS(th)

**V_th** (threshold voltage — điện áp ngưỡng) là mức V_GS tối thiểu để kênh dẫn bắt đầu hình thành.

- **(a) Là gì**: V_th là ngưỡng "bật". Dưới ngưỡng này, MOSFET như công tắc mở hoàn toàn — không có dòng Drain dù V_DS bao nhiêu.
- **(b) Vì sao cần**: Giúp phân biệt trạng thái ON/OFF rõ ràng. V_GS = 0 V phải đảm bảo V_GS < V_th để MOSFET tắt hoàn toàn.
- **(c) Giá trị thực tế**:
  - MOSFET tiêu chuẩn (standard): V_th = 2 V đến 4 V (cần V_GS = 10 V để dẫn đủ).
  - MOSFET logic-level: V_th = 1 V đến 2 V (dẫn đủ ở V_GS = 3.3 V hoặc 5 V — phù hợp MCU).
  - Ví dụ: IRLZ44N có V_th(max) = 2 V, đặc tính đầy đủ tại V_GS = 5 V.

⚠ **Lỗi thường gặp**: Dùng MOSFET tiêu chuẩn (V_th = 4 V) với MCU 3.3 V → Gate chỉ đạt 3.3 V, MOSFET không dẫn đủ (R_DS(on) tăng hàng chục lần) → linh kiện nóng, mạch không hoạt động. **Phải chọn logic-level MOSFET** khi điều khiển từ 3.3 V.

### 2.2. Ba vùng làm việc

```
V_GS < V_th       → Vùng cutoff (tắt)
V_GS > V_th, và
  V_DS < V_GS - V_th → Vùng triode / ohmic (dẫn bão hòa — như điện trở)
  V_DS > V_GS - V_th → Vùng saturation (dòng không đổi theo V_DS)
```

| Vùng | V_GS | V_DS | Dòng I_D | Ứng dụng |
|------|------|------|----------|----------|
| **Cutoff** (tắt) | < V_th | Bất kỳ | ≈ 0 | Khóa mở |
| **Triode / Ohmic** | > V_th | Nhỏ | Tỉ lệ V_DS | Khóa đóng (R_DS(on) thấp) |
| **Saturation** | > V_th | Lớn | ≈ Không đổi | Khuếch đại |

💡 **Trực giác vùng triode**: Khi MOSFET mở hoàn toàn (V_GS đủ cao), nó hoạt động như một **điện trở nhỏ** R_DS(on) giữa Drain và Source. Dòng tải chảy qua điện trở này và gây tổn hao P = I²·R_DS(on). Càng làm R_DS(on) nhỏ, khóa càng hiệu quả.

💡 **Trực giác vùng saturation**: Kênh dẫn bị "thắt lại" ở đầu Source — như ống nước bị bóp một đầu. Tăng áp suất Drain thêm không làm tăng lưu lượng nữa. Đây là vùng khuếch đại, không dùng làm khóa.

### 2.3. Ví dụ số — 4 trường hợp V_GS với IRF540N

IRF540N: V_th = 2–4 V (tiêu chuẩn), R_DS(on) = 44 mΩ tại V_GS = 10 V.

**Ví dụ 1 — V_GS = 0 V (cutoff)**:
- V_GS = 0 V < V_th = 2 V → kênh tắt.
- I_D ≈ 0 A (chỉ có dòng rò cực nhỏ ~µA).
- MOSFET hở mạch hoàn toàn.

**Ví dụ 2 — V_GS = 2.5 V (gần ngưỡng)**:
- V_GS ≈ V_th → kênh vừa hình thành, dẫn yếu.
- R_DS(on) rất cao (hàng chục Ω) → không dùng ở điểm này.

**Ví dụ 3 — V_GS = 5 V (dẫn vừa)**:
- Với IRF540N (tiêu chuẩn): R_DS(on) ≈ 0.1–0.3 Ω (xem datasheet, cao hơn 44 mΩ).
- Nếu I_D = 5 A: P_loss = (5)²×0.15 = **3.75 W** — khá lớn.

**Ví dụ 4 — V_GS = 10 V (dẫn đầy đủ)**:
- R_DS(on) = 44 mΩ = 0.044 Ω (đặc tả tại 25°C).
- Nếu I_D = 5 A: P_loss = (5)²×0.044 = **1.1 W** — chấp nhận được với tản nhiệt nhỏ.
- Nếu I_D = 20 A: P_loss = (20)²×0.044 = **17.6 W** — cần tản nhiệt lớn.

🔁 **Dừng lại tự kiểm tra**: IRF540N, V_GS = 10 V, R_DS(on) = 44 mΩ. Dòng tải I_D = 10 A. Tính tổn hao P.

<details>
<summary>Đáp án</summary>

P = I²·R_DS(on) = (10)² × 0.044 = 100 × 0.044 = **4.4 W**.
Điện áp rơi V_DS = I·R_DS(on) = 10 × 0.044 = **0.44 V** (rất nhỏ).

</details>

📝 **Tóm tắt mục 2**

- V_th: ngưỡng bật MOSFET; logic-level MOSFET có V_th thấp hơn cho MCU 3.3/5 V.
- 3 vùng: cutoff (tắt), triode/ohmic (khóa đóng, như R_DS(on)), saturation (khuếch đại).
- Dùng làm khóa: phải đặt vào vùng triode — V_GS đủ cao, V_DS nhỏ.

---

## 3. So sánh BJT và MOSFET

### 3.1. Bảng so sánh chi tiết

| Tiêu chí | BJT (NPN) | N-channel MOSFET |
|----------|-----------|------------------|
| **Điều khiển bởi** | Dòng I_B (mA) | Điện áp V_GS (V) |
| **Dòng chân điều khiển** | I_B = I_C / β (cần cấp dòng) | ≈ 0 A (DC) |
| **Hệ số khuếch đại** | β = 20–500 | g_m (transconductance) |
| **Tổn hao khi ON** | V_CE(sat) × I_C ≈ 0.2 V × I_C | I²×R_DS(on) (vài chục mΩ) |
| **Tổn hao điển hình** | Cao hơn ở dòng lớn | Thấp hơn — ưu tiên công suất |
| **Tốc độ chuyển mạch** | Chậm hơn (carrier storage effect) | Nhanh hơn (MHz–100s MHz) |
| **Điện áp làm việc** | Bị giới hạn V_CEO | V_DS có thể rất cao (vài trăm V) |
| **Bảo vệ tĩnh điện** | Ít nhạy hơn | Nhạy — cần đề phòng ESD |
| **Giá thành** | Rẻ hơn ở dòng nhỏ | Cạnh tranh ở dòng lớn |
| **Ứng dụng điển hình** | Mạch analog nhỏ, khuếch đại âm tần | Nguồn điện, motor driver, inverter |

### 3.2. Khi nào dùng cái nào?

**Dùng BJT khi**:
- Mạch khuếch đại âm thanh / tín hiệu analog nhỏ.
- Dòng tải thấp (< 500 mA), không ưu tiên hiệu suất.
- Cần linh kiện rẻ, đơn giản cho mạch logic cổ điển.

**Dùng MOSFET khi**:
- Dòng tải lớn (> 1 A) — R_DS(on) thấp → tổn hao ít.
- Điều khiển PWM tần số cao (> 20 kHz) — tốc độ chuyển mạch nhanh hơn.
- Điều khiển từ MCU (3.3 V / 5 V) — không cần tính toán dòng Base.
- Ứng dụng: motor driver, LED dimming, nguồn switching, inverter pin mặt trời.

💡 **Analogy**: BJT như công nhân cần lương (dòng Base) để làm việc. MOSFET như rô-bốt: chỉ cần tín hiệu điện áp để bật/tắt, không tốn năng lượng giữ trạng thái.

📝 **Tóm tắt mục 3**

- BJT: điều khiển dòng → cần I_B thật, tổn hao V_CE(sat) × I_C.
- MOSFET: điều khiển áp → I_G ≈ 0, tổn hao I²×R_DS(on) thấp hơn.
- Ứng dụng công suất hiện đại đều ưu tiên MOSFET.

---

## 4. MOSFET làm khóa công suất

### 4.1. Sơ đồ mạch cơ bản

```
V_supply (+12 V)
     │
     ├── Tải (động cơ / LED)
     │
     D ─── Drain
     │
     S ─── Source ──── GND
     │
     G ─── Gate ──── R_G (100 Ω) ──── MCU GPIO
                                          │
                                         GND (cùng GND với Source)
```

Nguyên tắc:
- MCU xuất V_GS = 0 V → MOSFET OFF → tải tắt.
- MCU xuất V_GS = 3.3 V hoặc 5 V → MOSFET ON → tải bật.
- R_G (100–470 Ω) giới hạn dòng nạp Gate tụ, giảm nhiễu EMI.

⚠ **Lỗi thường gặp**: Để Gate **lơ lửng** (floating) → tĩnh điện / nhiễu có thể bật MOSFET ngẫu nhiên → tải chạy không kiểm soát. **Luôn** kéo Gate về GND qua điện trở 10 kΩ (pull-down) khi không có tín hiệu điều khiển.

### 4.2. Walk-through tính tổn hao — 4 ví dụ số

**Ví dụ 1 — Điều khiển quạt nhỏ 12 V / 0.5 A với IRLZ44N (R_DS(on) = 35 mΩ, logic-level)**:
- V_GS = 5 V (từ MCU 5 V) → dẫn đầy đủ.
- P_loss = I²×R_DS(on) = (0.5)²×0.035 = 0.25×0.035 = **8.75 mW** — không cần tản nhiệt.
- V_DS(on) = I×R_DS(on) = 0.5×0.035 = **17.5 mV** — gần như không rơi áp.

**Ví dụ 2 — Motor DC 12 V / 3 A với IRF540N (R_DS(on) = 44 mΩ)**:
- V_GS = 10 V (qua driver hoặc bootstrap) → dẫn đầy đủ.
- P_loss = (3)²×0.044 = 9×0.044 = **0.396 W** — tản nhiệt nhỏ hoặc copper pour đủ.
- V_DS(on) = 3×0.044 = **132 mV**.

**Ví dụ 3 — Bơm nước 12 V / 10 A với FQP30N06L (R_DS(on) = 35 mΩ, logic-level)**:
- V_GS = 5 V → dẫn đầy đủ.
- P_loss = (10)²×0.035 = 100×0.035 = **3.5 W** — cần tản nhiệt.
- Nhiệt trở tản nhiệt cần: θ_SA ≤ (T_j(max) - T_amb) / P - θ_JC.
- Ví dụ: T_j(max) = 150°C, T_amb = 40°C, θ_JC = 1.5°C/W:
  → θ_SA ≤ (150−40)/3.5 − 1.5 = 31.4 − 1.5 = **29.9°C/W**.

**Ví dụ 4 — So sánh hiệu suất MOSFET vs BJT ở 10 A**:
- BJT (TIP41C): V_CE(sat) ≈ 1.5 V → P_loss = 1.5×10 = **15 W**.
- MOSFET (IRF540N): R_DS(on) = 44 mΩ → P_loss = (10)²×0.044 = **4.4 W**.
- MOSFET tiêu thụ ít hơn **3.4 lần** ở cùng dòng tải.

❓ **Câu hỏi tự nhiên của người đọc:**

*"R_DS(on) tăng theo nhiệt độ không?"*

→ Có. R_DS(on) của MOSFET silicon tăng xấp xỉ theo hệ số dương với nhiệt độ. Ở 125°C, R_DS(on) có thể gấp 2–3 lần giá trị ở 25°C. Khi tính tổn hao nhiệt, **phải dùng R_DS(on) ở nhiệt độ vận hành**, không phải giá trị 25°C trong datasheet.

*"Chọn MOSFET như thế nào cho ứng dụng cụ thể?"*

→ Xem Mục 7 — Bài tập 5: quy trình chọn MOSFET 5 bước.

🔁 **Dừng lại tự kiểm tra**: Motor 24 V / 5 A, dùng MOSFET R_DS(on) = 20 mΩ. Tính tổn hao P. So sánh với BJT V_CE(sat) = 1.2 V cùng dòng.

<details>
<summary>Đáp án</summary>

MOSFET: P = (5)²×0.020 = 25×0.020 = **0.5 W**.
BJT: P = 1.2×5 = **6 W**.
MOSFET kém hơn BJT **12 lần** ít tổn hao hơn.

</details>

📝 **Tóm tắt mục 4**

- Sơ đồ chuẩn: Source nối GND, Drain nối tải, Gate qua R_G về MCU.
- Tổn hao P = I²×R_DS(on) — giữ R_DS(on) thấp bằng cách đặt V_GS đủ cao.
- Luôn có pull-down 10 kΩ ở Gate để tránh floating.
- R_DS(on) tăng theo nhiệt độ — tính với giá trị ở T vận hành.

---

## 5. Điều khiển PWM — Motor và LED Dimming

### 5.1. Nguyên lý PWM

**PWM** (Pulse Width Modulation — điều chế độ rộng xung) là kỹ thuật điều khiển công suất bằng cách đóng/ngắt nhanh MOSFET với **tần số cố định**, thay đổi **duty cycle** (tỉ lệ thời gian ON/OFF).

- **(a) Là gì**: Tín hiệu PWM là chuỗi xung vuông chu kỳ T, trong đó MOSFET ON trong thời gian t_ON và OFF trong t_OFF. Duty cycle D = t_ON / T.
- **(b) Vì sao cần**: Điều khiển công suất mà không cần điện trở giới hạn dòng (tổn hao trên điện trở). Thay vào đó, trung bình hóa năng lượng theo thời gian.
- **(c) Công thức**: Công suất trung bình trên tải P_tải = D × V_supply × I_tải = D × P_đầy.

```
Duty cycle 0%  → MOSFET luôn OFF → P_tải = 0%
Duty cycle 50% → ON 50% thời gian → P_tải = 50% P_đầy
Duty cycle 100%→ MOSFET luôn ON  → P_tải = 100% P_đầy
```

💡 **Analogy**: Giống như điều chỉnh độ sáng đèn bằng cách nháy nhanh ON/OFF. Mắt người không nhận ra (> 50 Hz) → thấy đèn mờ hơn. Motor thì quán tính cơ học làm phẳng các xung.

### 5.2. Walk-through tính công suất trung bình

**Ví dụ 1 — Motor DC 12 V / 2 A, PWM duty cycle 75%**:
- P_đầy = 12 V × 2 A = 24 W (khi ON 100%).
- P_trung_bình = 0.75 × 24 = **18 W** (75% tốc độ động cơ).
- Tổn hao MOSFET (R_DS(on) = 44 mΩ): P_loss = D × I²×R_DS(on) = 0.75×(2)²×0.044 = 0.75×0.176 = **132 mW**.

**Ví dụ 2 — LED strip 12 V / 1 A, duty 30% (dim)**:
- P_trung_bình = 0.30 × 12 × 1 = **3.6 W** — LED sáng 30%.
- Tần số PWM khuyến nghị cho LED: ≥ 1 kHz để không thấy nhấp nháy khi di chuyển mắt nhanh.

**Ví dụ 3 — Tần số PWM và tổn hao chuyển mạch**:
- Tần số 1 kHz, thời gian chuyển mạch t_sw = 100 ns (MOSFET nhanh).
- Tổn hao chuyển mạch P_sw ≈ 0.5 × V_DS × I_D × t_sw × f = 0.5×12×2×100e-9×1000 = **1.2 mW** (rất nhỏ ở 1 kHz).
- Ở 100 kHz: P_sw = 120 mW — bắt đầu đáng kể. Đây là lý do cần MOSFET nhanh cho mạch nguồn switching.

### 5.3. Liên hệ với MCU và Arduino-C

Để tạo PWM từ vi điều khiển (Arduino / ESP32 / STM32):

```c
// Arduino — xuất PWM 8-bit (0–255) trên pin 9
// Pin 9 trên Arduino Uno ~ Timer1, ~490 Hz mặc định
int motorPin = 9;

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  // Duty 75% = 0.75 × 255 ≈ 191
  analogWrite(motorPin, 191);  // Motor chạy 75% tốc độ
  delay(2000);

  // Duty 30% = 0.30 × 255 ≈ 77
  analogWrite(motorPin, 77);   // Motor chạy 30% tốc độ
  delay(2000);
}
```

Xem thêm tại [Lesson 06 — MCU GPIO & PWM](../../03-Digital-MCU/lesson-06-microcontroller-gpio/) để biết cách cấu hình timer PWM tần số cao.

📝 **Tóm tắt mục 5**

- PWM: đóng/ngắt nhanh MOSFET, thay đổi duty cycle D → điều chỉnh công suất trung bình.
- P_trung_bình = D × P_đầy.
- Tần số PWM cao → điều chỉnh mượt mà hơn nhưng tổn hao chuyển mạch tăng.
- MCU tạo PWM bằng timer hardware — `analogWrite()` trên Arduino.

---

## 6. Lưu ý thực tế

### 6.1. Gate là tụ điện — cần dòng nạp khi chuyển mạch nhanh

Gate không dẫn DC, nhưng có điện dung ký sinh **C_iss** (input capacitance, điển hình 1–10 nF).

Mỗi lần đóng/ngắt MOSFET, phải nạp/xả C_iss qua R_G:
- Thời hằng τ = R_G × C_iss.
- Ví dụ: R_G = 100 Ω, C_iss = 2 nF → τ = 100×2e-9 = **200 ns**.
- Dòng nạp đỉnh I_peak = V_GS / R_G = 5 / 100 = **50 mA**.

→ Nếu MCU không cấp đủ 50 mA → chuyển mạch chậm. Giải pháp: dùng **gate driver IC** (vd UCC27517) cấp dòng lên tới 4–9 A đỉnh.

### 6.2. Bảo vệ tĩnh điện (ESD)

Gate oxide chỉ chịu được ~20 V — V_GS(max) thường ±20 V. Tĩnh điện cơ thể người ~1–10 kV có thể phá hủy Gate ngay lập tức. Phòng ngừa:

- Đeo vòng đất khi làm việc với MOSFET công suất.
- Luôn có clamping Zener 12 V hoặc 15 V từ Gate–Source (tích hợp sẵn trong nhiều package).
- Không chạm tay vào chân Gate khi mạch đang hở.

### 6.3. Logic-level MOSFET vs Standard MOSFET

| Loại | V_GS cần để dẫn đầy đủ | Phù hợp với |
|------|------------------------|-------------|
| **Standard** (vd IRF540N) | 10 V | Nguồn 12 V qua gate driver |
| **Logic-level** (vd IRLZ44N, FQP30N06L) | 4.5–5 V | MCU 5 V trực tiếp |
| **Ultra-low Vth** (vd AO3400) | 2.5–3 V | MCU 3.3 V trực tiếp |

### 6.4. Diode ký sinh (body diode)

MOSFET N-channel có **body diode** (diode nội bộ) giữa Source–Drain dẫn theo chiều từ Source → Drain (ngược chiều dòng thường). Quan trọng khi:
- Điều khiển motor: khi motor ngắt điện, sức phản điện sinh dòng ngược → body diode dẫn, clamp áp → bảo vệ MOSFET.
- Mạch H-bridge: body diode của cặp MOSFET bổ sung nhau tạo thành freewheeling diode tự nhiên.

📝 **Tóm tắt mục 6**

- Gate là tụ C_iss → cần gate driver ở tần số cao.
- ESD nhạy — không để Gate floating, có Zener clamp khi cần.
- Logic-level MOSFET cho MCU 3.3/5 V; standard MOSFET cần gate driver 10 V.
- Body diode bảo vệ tải cảm kháng (motor, cuộn cảm).

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Xác định trạng thái MOSFET**: MOSFET N-channel có V_th = 2.5 V. Xác định trạng thái (ON/OFF) và tính I_D xấp xỉ trong các trường hợp:
- (a) V_GS = 0 V, tải R = 10 Ω, V_supply = 12 V.
- (b) V_GS = 5 V, R_DS(on) = 50 mΩ, V_supply = 12 V, tải R = 2.4 Ω.

**Bài 2 — Tính tổn hao công suất**: MOSFET IRF540N (R_DS(on) = 44 mΩ ở 25°C, hệ số nhiệt 1.8× tại 100°C). Tải 12 V / 8 A.
- (a) Tính P_loss ở 25°C.
- (b) Tính P_loss ở 100°C.
- (c) Điện áp V_DS(on) là bao nhiêu?

**Bài 3 — PWM và công suất trung bình**: Motor DC 24 V / 4 A, MOSFET duty cycle 60%, R_DS(on) = 30 mΩ.
- (a) Công suất trung bình trên motor.
- (b) Tổn hao trung bình trên MOSFET.
- (c) Hiệu suất truyền công suất η = P_motor / (P_motor + P_loss).

**Bài 4 — Thời hằng Gate**: Gate driver xuất 5 V, R_G = 47 Ω, C_iss = 3.5 nF. Tính:
- (a) Thời hằng τ nạp Gate.
- (b) Thời gian để Gate đạt 90% V_GS (≈ 2.3τ).
- (c) Dòng đỉnh nạp Gate.

**Bài 5 — Chọn MOSFET**: Cần điều khiển bơm nước 12 V / 6 A từ MCU 3.3 V ESP32. Liệt kê 5 tiêu chí chọn MOSFET và đề xuất chọn loại nào.

**Bài 6 — So sánh với BJT**: Tải 24 V / 5 A. Tính và so sánh tổn hao:
- BJT TIP41C: V_CE(sat) = 1.5 V.
- MOSFET IRF530N: R_DS(on) = 90 mΩ.

### Lời giải chi tiết

**Bài 1:**

*(a) V_GS = 0 V < V_th = 2.5 V → Cutoff (OFF)*
- I_D ≈ 0 A (chỉ dòng rò vài µA).
- Toàn bộ V_supply = 12 V rơi trên Drain–Source.
- Công suất tải: P_tải = 0 W (tải không có dòng).

*(b) V_GS = 5 V > V_th = 2.5 V → ON (triode/ohmic)*
- Tổng điện trở vòng mạch: R_DS(on) + R_tải = 0.050 + 2.4 = 2.45 Ω.
- I_D = V_supply / (R_DS(on) + R_tải) = 12 / 2.45 ≈ **4.90 A**.
- V_DS = I_D × R_DS(on) = 4.90 × 0.050 ≈ **0.245 V** (rất nhỏ, như kỳ vọng).
- Tổn hao MOSFET: P_loss = I_D² × R_DS(on) = (4.90)²×0.050 ≈ **1.20 W**.

---

**Bài 2:**

*(a) T = 25°C*:
P_loss = I²×R_DS(on) = (8)²×0.044 = 64×0.044 = **2.816 W**.

*(b) T = 100°C*:
R_DS(on) tại 100°C ≈ 44×1.8 = 79.2 mΩ.
P_loss = (8)²×0.0792 = 64×0.0792 = **5.069 W** — gần gấp đôi! Đây là tại sao phải tính nhiệt động học.

*(c)* V_DS(on) tại 25°C = I×R_DS(on) = 8×0.044 = **0.352 V**.
V_DS(on) tại 100°C = 8×0.0792 = **0.634 V**.

---

**Bài 3:**

*(a) Công suất trung bình trên motor*:
P_motor = D × V × I = 0.60 × 24 × 4 = **57.6 W**.

*(b) Tổn hao trung bình trên MOSFET*:
P_loss = D × I²×R_DS(on) = 0.60 × (4)²×0.030 = 0.60 × 16 × 0.030 = 0.60×0.48 = **0.288 W**.

*(c) Hiệu suất*:
P_tổng = P_motor + P_loss = 57.6 + 0.288 = 57.888 W.
η = P_motor / P_tổng = 57.6 / 57.888 = **99.5%** — hiệu suất rất cao, đặc trưng của MOSFET.

---

**Bài 4:**

*(a) Thời hằng*:
τ = R_G × C_iss = 47 × 3.5e-9 = 164.5e-9 s = **164.5 ns**.

*(b) Thời gian đạt 90% V_GS*:
t_90% = 2.3 × τ = 2.3 × 164.5 = **378 ns** ≈ 0.38 µs.
→ Tần số chuyển mạch tối đa thực tế: f_max ≈ 1 / (10 × t_90%) ≈ 264 kHz (rule of thumb: 10× biên độ).

*(c) Dòng đỉnh*:
I_peak = V_GS / R_G = 5 / 47 = **0.106 A = 106 mA**.
→ MCU ESP32 nguồn GPIO tối đa ~40 mA → cần gate driver IC nếu chuyển mạch nhanh.

---

**Bài 5 — Tiêu chí chọn MOSFET cho bơm 12 V / 6 A, MCU 3.3 V:**

1. **V_DS(max) ≥ 2× V_supply** = 2×12 = 24 V → chọn MOSFET ≥ 30 V (biên an toàn).
2. **I_D(max) ≥ 2× I_tải** = 2×6 = 12 A (biên an toàn dòng đỉnh).
3. **Logic-level: V_GS(th) ≤ 2 V** và đặc tính đầy đủ tại V_GS = 3.3 V.
4. **R_DS(on) thấp ở V_GS = 3.3 V**: ví dụ < 50 mΩ → P_loss < (6)²×0.050 = 1.8 W (chấp nhận được).
5. **Package phù hợp**: TO-220 hoặc TO-252 (D-PAK) cho tản nhiệt.

→ **Đề xuất**: AO4468 (30 V, 12 A, R_DS(on) = 19 mΩ tại V_GS = 4.5 V) hoặc FQP30N06L (60 V, 30 A, R_DS(on) = 35 mΩ tại V_GS = 5 V — rất phổ biến).

---

**Bài 6:**

BJT TIP41C:
P_BJT = V_CE(sat) × I = 1.5 × 5 = **7.5 W**.

MOSFET IRF530N:
P_MOSFET = I²×R_DS(on) = (5)²×0.090 = 25×0.090 = **2.25 W**.

→ MOSFET tốt hơn **3.3 lần** ít tổn hao hơn BJT ở cùng tải.
→ Với BJT, cần tản nhiệt lớn (θ ≤ ~8°C/W). Với MOSFET, tản nhiệt nhỏ hoặc copper pour đủ.

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 05 — BJT làm khóa](../lesson-05-bjt-switch/)
- **Bài tiếp theo**: [Lesson 07 — Op-amp cơ bản](../lesson-07-opamp-basics/)
- **PWM từ MCU**: [Lesson 06 — MCU GPIO & PWM](../../03-Digital-MCU/lesson-06-microcontroller-gpio/)
- **Nguyên lý bán dẫn**: [Lesson 01 — Bán dẫn và mối nối P-N](../lesson-01-semiconductor-pn/)
- **Visualization tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 06

1. **MOSFET điều khiển bằng V_GS** (không phải dòng). Gate cách điện → I_G ≈ 0 A ở DC.
2. **V_th**: ngưỡng bật kênh. Logic-level MOSFET có V_th thấp, tương thích MCU 3.3/5 V.
3. **3 vùng**: cutoff (OFF), triode/ohmic (khóa đóng, R_DS(on) thấp), saturation (khuếch đại).
4. **Tổn hao khóa đóng**: P = I²×R_DS(on). MOSFET thấp hơn BJT đáng kể ở dòng lớn.
5. **PWM**: duty cycle D → công suất trung bình P = D×P_đầy. Ứng dụng: motor, LED dimming.
6. **Lưu ý thực tế**: Gate là tụ C_iss → cần gate driver ở tần số cao; ESD nguy hiểm; body diode bảo vệ tải cảm kháng.
