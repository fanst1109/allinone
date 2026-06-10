// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-06-microcontroller-gpio/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Vi điều khiển & GPIO

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vi điều khiển (microcontroller) là gì: máy tính trên 1 chip tích hợp CPU, RAM, Flash và các ngoại vi.
- Phân biệt vi điều khiển với vi xử lý (microprocessor).
- Cấu hình và dùng GPIO (General Purpose I/O) để điều khiển đầu ra (LED) và đọc đầu vào (nút nhấn).
- Hiểu điện trở kéo lên/kéo xuống (pull-up/pull-down) và vì sao bắt buộc cần.
- Đọc tín hiệu tương tự qua ADC tích hợp (cảm biến quang trở, nhiệt trở).
- Tạo tín hiệu PWM để điều chỉnh độ sáng LED hoặc tốc độ motor.
- Hiểu vòng lặp chương trình \`setup/loop\` và khái niệm timer/ngắt (interrupt).

## Kiến thức tiền đề

- [Lesson 05 — ADC/DAC & lấy mẫu](../lesson-05-adc-dac/) — ADC tích hợp trong MCU, nguyên lý lượng tử hóa.
- [Lesson 05 (02-Semiconductors) — BJT switch](../../02-Semiconductors/lesson-05-bjt-switch/) — cần transistor khi tải vượt dòng chân GPIO.
- [Lesson 03 (01-Fundamentals) — Điện trở & phân áp](../../01-Fundamentals/lesson-03-resistors-divider/) — pull-up/pull-down và cầu phân áp cảm biến.
- [Lesson 04 (01-Fundamentals) — Tụ điện & RC](../../01-Fundamentals/lesson-04-capacitor-rc/) — mạch RC cho debounce nút nhấn.

---

## 1. Vi điều khiển là gì

### 1.1. Định nghĩa — máy tính trên 1 chip

💡 **Trực giác**: Hãy nghĩ đến một chiếc máy tính để bàn: nó có CPU riêng, RAM riêng, ổ cứng riêng, cổng USB và màn hình. Vi điều khiển là phiên bản thu nhỏ mọi thứ vào **một chip duy nhất**: CPU + bộ nhớ chương trình (Flash) + bộ nhớ tạm (RAM/SRAM) + các ngoại vi (GPIO, ADC, timer, UART, SPI, I2C, PWM...). Không cần bo mạch chủ riêng, không cần RAM ngoài — tất cả sẵn trên 1 chip, tiêu thụ vài mW đến vài trăm mW.

**Định nghĩa chính xác**: Vi điều khiển (microcontroller unit — MCU) là vi mạch tích hợp (IC) kết hợp:

| Thành phần | Chức năng | Ví dụ số (ATmega328P) |
|-----------|-----------|----------------------|
| CPU (ALU + thanh ghi) | Thực thi lệnh | 8-bit, 16 MHz |
| Flash (ROM) | Lưu chương trình | 32 KB |
| SRAM | Biến tạm, stack | 2 KB |
| EEPROM | Lưu cấu hình vĩnh viễn | 1 KB |
| GPIO | Chân số vào/ra | 23 chân |
| ADC | Đọc tín hiệu tương tự | 6 kênh, 10-bit |
| Timer/Counter | Đếm thời gian, PWM | 3 timer |
| UART/SPI/I2C | Giao tiếp nối tiếp | Có đủ |
| Oscillator | Xung nhịp nội | 8 MHz nội / 16 MHz thạch anh ngoài |

**Vì sao cần MCU thay vì chỉ dùng IC rời?** Vì MCU giảm số lượng chip, giảm diện tích mạch, giảm tiêu thụ điện và đơn giản hóa thiết kế. Một bo Arduino Uno chạy được bằng con ATmega328P 28 chân; thay thế bằng IC rời sẽ cần hàng chục chip riêng biệt.

### 1.2. Ví dụ thực tế

**ATmega328P (Arduino Uno)**:
- Điện áp: 5 V (hoặc 3.3 V với biến thể).
- Xung nhịp: 16 MHz với thạch anh ngoài → 16 triệu lệnh/giây.
- Flash: 32 KB — đủ cho hàng nghìn dòng code Arduino-C.
- Dòng tối đa mỗi chân GPIO: 40 mA; tổng toàn chip: 200 mA.

**ESP32**:
- CPU: 2 nhân Xtensa LX6, 240 MHz.
- RAM: 520 KB SRAM; Flash: 4–16 MB (trên module).
- Wi-Fi 802.11 b/g/n + Bluetooth 4.2 tích hợp.
- 34 GPIO; ADC 12-bit; DAC 8-bit; touch sensing; Hall sensor.
- Tiêu thụ: 80–240 mA khi Wi-Fi hoạt động; ~10 µA ở deep sleep.

**STM32F103 (Blue Pill)**:
- CPU: ARM Cortex-M3, 72 MHz, 32-bit — nhanh hơn AVR nhưng vẫn cùng triết lý MCU.
- Flash 64 KB; RAM 20 KB; 37 GPIO; ADC 12-bit.

### 1.3. MCU khác gì vi xử lý (microprocessor — MPU)?

| Tiêu chí | Vi điều khiển (MCU) | Vi xử lý (MPU) |
|----------|---------------------|----------------|
| Bộ nhớ | Tích hợp Flash + RAM | Cần RAM/Flash rời ngoài |
| Ngoại vi | Tích hợp GPIO, ADC, timer... | Cần IC ngoài |
| Hệ điều hành | Chạy bare-metal hoặc RTOS nhỏ | Thường cần OS đầy đủ (Linux) |
| Ứng dụng | Nhúng (embedded): IoT, robot, xe | PC, server, điện thoại, Raspberry Pi |
| Ví dụ | ATmega328, ESP32, STM32 | Intel Core, ARM Cortex-A53 (Pi) |
| Tốc độ | MHz đến vài trăm MHz | GHz |
| Tiêu thụ | mW đến vài trăm mW | Watt đến hàng chục Watt |

💡 **Nguyên tắc ngón tay cái**: nếu dự án cần chạy Linux → dùng MPU (Raspberry Pi); nếu chỉ cần điều khiển ngoại vi đơn giản, tiết kiệm điện → MCU.

❓ **Câu hỏi tự nhiên**:
- *"Raspberry Pi có phải MCU không?"* — Không. Pi dùng ARM Cortex-A (MPU), cần thẻ SD chứa Linux; GPIO của Pi chỉ là ngoại vi phụ, không phải chức năng cốt lõi như MCU.
- *"ESP32 có thể chạy Python không?"* — Có (MicroPython), vì ESP32 đủ RAM. ATmega328 thì không — chỉ 2 KB SRAM, quá nhỏ cho interpreter.

📝 **Tóm tắt mục 1**:
- MCU = CPU + Flash + RAM + GPIO + ADC + timer + giao tiếp, tất cả trên 1 chip.
- Dùng MCU khi cần điều khiển ngoại vi, tiết kiệm điện, giá rẻ.
- Dùng MPU khi cần sức mạnh tính toán cao, chạy OS đầy đủ.

---

## 2. GPIO — General Purpose I/O

### 2.1. Định nghĩa và cấu hình

**GPIO** (General Purpose Input/Output) là các chân số đa năng của MCU. Mỗi chân có thể cấu hình làm:
- **OUTPUT**: MCU điều khiển mức điện áp chân là HIGH (5 V / 3.3 V) hoặc LOW (0 V / GND).
- **INPUT**: MCU đọc mức điện áp bên ngoài — trả về HIGH hay LOW.

Trên Arduino (ATmega328P, 5 V):
- **HIGH** = 5 V (logic 1).
- **LOW** = 0 V (logic 0).
- Ngưỡng nhận biết INPUT: > 3 V → HIGH; < 1.5 V → LOW. Vùng giữa là không xác định.

\`\`\`c
// --- Arduino-C ---
void setup() {
    pinMode(13, OUTPUT);  // cấu hình chân 13 là đầu ra
    pinMode(2,  INPUT);   // cấu hình chân 2 là đầu vào
}

void loop() {
    digitalWrite(13, HIGH); // bật chân 13 → LED sáng
    delay(1000);            // chờ 1 giây
    digitalWrite(13, LOW);  // tắt chân 13 → LED tắt
    delay(1000);
}
\`\`\`

Đoạn code trên là chương trình **blink LED** kinh điển — LED nối qua điện trở 220 Ω giữa chân 13 và GND sẽ nhấp nháy 1 Hz.

### 2.2. Tính dòng chân GPIO — giới hạn quan trọng

⚠ **Dòng tối đa mỗi chân GPIO**: ATmega328P = **40 mA** (absolute maximum); khuyến nghị thực tế ≤ 20 mA. ESP32 = **40 mA** mỗi chân; tổng tất cả GPIO ≤ 1200 mA (nhưng điều này hiếm gặp trong thực tế).

**Tính dòng LED cơ bản** (LED đỏ, $V_f \\approx 2$ V, $V_{\\text{supply}} = 5$ V):

$$I = \\frac{V_{\\text{supply}} - V_f}{R} = \\frac{5 - 2}{220} = \\frac{3}{220} \\approx 13.6 \\text{ mA}$$

13.6 mA < 20 mA → an toàn cho chân GPIO. Nếu muốn LED sáng hơn với $I = 30$ mA → $R = 3/0.03 = 100$ Ω → **vẫn trong giới hạn** nếu chỉ bật 1 LED. Nếu bật nhiều LED cùng lúc → tổng dòng vượt ngưỡng → cần transistor.

**Khi nào cần transistor?**
- Tải > 40 mA (ví dụ: motor DC nhỏ, relay, nhiều LED song song).
- Tải dùng điện áp khác với MCU (ví dụ: 12 V).
- Xem chi tiết: [BJT switch](../../02-Semiconductors/lesson-05-bjt-switch/) và [MOSFET](../../02-Semiconductors/lesson-06-mosfet/).

**Ví dụ 4 tình huống**:

| Tải | Dòng ước tính | Chân GPIO | Giải pháp |
|-----|---------------|-----------|-----------|
| LED đơn qua 220 Ω, 5 V | 13.6 mA | Đủ | Nối trực tiếp |
| 4 LED song song, mỗi cái 20 mA | 80 mA | Quá giới hạn | BJT NPN hoặc MOSFET |
| Relay coil 5 V, 50 mA | 50 mA | Quá giới hạn | BJT + diode freewheeling |
| Motor DC 6 V, 200 mA | 200 mA | Vượt xa | H-bridge IC (L298N) |

🔁 **Tự kiểm tra**: LED xanh lá ($V_f \\approx 2.1$ V) nối vào chân GPIO 3.3 V qua điện trở 150 Ω. Tính dòng và cho biết có an toàn không.

<details>
<summary>Đáp án</summary>

$I = (3.3 - 2.1) / 150 = 1.2 / 150 =$ **8 mA** — an toàn (< 20 mA).

</details>

📝 **Tóm tắt mục 2**:
- GPIO OUTPUT: HIGH/LOW, dòng max ≤ 20 mA (khuyến nghị), 40 mA (tuyệt đối).
- Tải lớn hơn → dùng transistor/MOSFET làm công tắc.
- \`pinMode()\` → \`digitalWrite()\` / \`digitalRead()\` là 3 hàm cơ bản.

---

## 3. Input số — nút nhấn và điện trở kéo

### 3.1. Vấn đề floating pin

💡 **Trực giác**: Hãy tưởng tượng một câu hỏi Yes/No mà không ai trả lời — người hỏi không biết câu trả lời là gì. Chân GPIO ở chế độ INPUT nhưng không có gì kết nối (hay chỉ có dây dài) thì điện áp chân "thả nổi" — MCU đọc ra giá trị ngẫu nhiên, khi HIGH khi LOW, gây lỗi hoàn toàn không dự đoán được. Đây gọi là **floating pin** (chân thả nổi).

**Nguyên nhân**: điện trở đầu vào của GPIO rất cao (~10 MΩ) — chỉ cần nhiễu điện từ nhỏ (cáp dài, ngón tay chạm, điện cảm ứng) cũng đủ để lật mức logic.

**Giải pháp**: điện trở kéo (pull resistor) — nối chân GPIO qua một điện trở về nguồn cấp hoặc về GND để "cố định" mức logic mặc định.

### 3.2. Pull-up — kéo lên nguồn

**Sơ đồ pull-up**:
\`\`\`
VCC (5 V)
   |
  [R_pull] = 10 kΩ
   |
   +----> GPIO pin
   |
  [Nút nhấn]
   |
  GND
\`\`\`

- **Không nhấn**: GPIO = VCC = HIGH (nhờ R_pull kéo lên).
- **Nhấn nút**: nút nối chân GPIO về GND → GPIO = LOW.
- Logic: nhấn = LOW, thả = HIGH → **active-low** (đảo ngược trực giác).

**Điện trở pull-up điển hình**: 4.7 kΩ đến 100 kΩ. Phổ biến nhất: **10 kΩ**.

**ATmega328P có pull-up nội (internal pull-up) $\\approx$ 20–50 kΩ**:
\`\`\`c
pinMode(2, INPUT_PULLUP);   // kích hoạt pull-up nội
// Không cần điện trở ngoài!
\`\`\`

**Dòng qua pull-up khi nút nhấn**: $I = V_{\\text{CC}} / R_{\\text{pull}} = 5 / 10{,}000 =$ **0.5 mA** — rất nhỏ, tiêu tán điện năng không đáng kể.

### 3.3. Pull-down — kéo xuống GND

**Sơ đồ pull-down**:
\`\`\`
VCC (5 V)
   |
  [Nút nhấn]
   |
   +----> GPIO pin
   |
  [R_pull] = 10 kΩ
   |
  GND
\`\`\`

- **Không nhấn**: GPIO = GND = LOW (R_pull kéo xuống).
- **Nhấn nút**: nút nối GPIO về VCC → GPIO = HIGH.
- Logic: nhấn = HIGH, thả = LOW → **active-high** (tự nhiên hơn).

**ATmega328P không có pull-down nội** → cần điện trở ngoài. ESP32 có pull-down nội.

❓ **Tại sao pull-up phổ biến hơn pull-down?**

Vì nhiều MCU có sẵn pull-up nội; hơn nữa, nhiều chuẩn logic cũ (I2C, open-drain) dùng active-low theo mặc định. Từ góc độ thiết kế board, pull-up nội tiết kiệm linh kiện.

**Liên hệ phân áp**: mạch pull-up/pull-down thực ra là mạch phân áp điện trở, với R_pull là R1 và tổng trở nguồn là R2. Xem lại [Lesson 03 — phân áp](../../01-Fundamentals/lesson-03-resistors-divider/).

### 3.4. Debounce nút nhấn

⚠ **Lỗi thường gặp**: khi nhấn hoặc thả nút cơ học, tiếp điểm bật/tắt nhanh hàng chục lần trong ~5–20 ms do rung cơ học (bounce). MCU đọc 16 MHz → trong 20 ms có 320 000 chu kỳ → thấy hàng nghìn lần nhấn ảo.

**Hậu quả**: đếm nhấn sai, bật/tắt LED liên tục không ý muốn.

**Cách xử lý debounce phần mềm**:
\`\`\`c
const int BTN = 2;
bool lastState = HIGH;      // pull-up: không nhấn = HIGH
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_DELAY = 50; // ms

void loop() {
    bool reading = digitalRead(BTN);
    if (reading != lastState) {
        lastDebounce = millis();
    }
    if ((millis() - lastDebounce) > DEBOUNCE_DELAY) {
        // Trạng thái ổn định sau 50 ms
        if (reading == LOW) {
            // Nút được nhấn (active-low)
        }
    }
    lastState = reading;
}
\`\`\`

**Cách xử lý debounce phần cứng**: tụ điện 100 nF song song với nút nhấn → tụ làm chậm sự thay đổi điện áp → bounce bị lọc. Xem [Lesson 04 — RC](../../01-Fundamentals/lesson-04-capacitor-rc/) cho chi tiết thời hằng τ = R·C.

🔁 **Tự kiểm tra**: nút nhấn nối giữa chân GPIO và GND; dùng \`INPUT_PULLUP\`. Mã nào đúng để phát hiện nhấn?

<details>
<summary>Đáp án</summary>

\`\`\`c
if (digitalRead(pin) == LOW) { /* nút đang nhấn */ }
\`\`\`
Vì pull-up nội kéo chân lên HIGH; nhấn nút nối GND → chân xuống LOW.

</details>

📝 **Tóm tắt mục 3**:
- Floating pin → đọc ngẫu nhiên → luôn dùng pull-up hoặc pull-down.
- Pull-up: chân HIGH khi thả, LOW khi nhấn (active-low). ATmega có pull-up nội.
- Pull-down: chân LOW khi thả, HIGH khi nhấn (active-high). Cần điện trở ngoài.
- Debounce: đợi 50 ms ổn định hoặc dùng tụ 100 nF song song nút.

---

## 4. Input tương tự — ADC và cảm biến

### 4.1. ADC tích hợp trong MCU

ATmega328P có ADC 10-bit, 6 kênh (A0–A5). Đọc điện áp 0–5 V → trả về giá trị số 0–1023.

**Công thức chuyển đổi**:

$$\\text{Giá trị số} = \\frac{V_{\\text{in}}}{V_{\\text{ref}}} \\times (2^N - 1) = \\frac{V_{\\text{in}}}{5.0} \\times 1023$$

Ví dụ: \`analogRead(A0)\` trả về 512 → $V_{\\text{in}} = 512 / 1023 \\times 5.0 \\approx$ **2.502 V**.

Xem chi tiết lý thuyết ADC tại [Lesson 05 — ADC/DAC](../lesson-05-adc-dac/).

### 4.2. Cầu phân áp với cảm biến điện trở

**Quang trở (photoresistor / LDR)**: điện trở thay đổi theo ánh sáng — tối ~1 MΩ, sáng ~1 kΩ.

**Mạch đọc quang trở** (voltage divider + ADC):
\`\`\`
5 V
  |
[R_fix = 10 kΩ]
  |
  +----> A0 (ADC)
  |
[LDR]
  |
GND
\`\`\`

Điện áp tại A0:
\`\`\`
V_A0 = 5 × LDR / (R_fix + LDR)
\`\`\`

- Tối: LDR $= 100$ kΩ → $V_{\\text{A0}} = 5 \\times 100\\text{k} / (10\\text{k} + 100\\text{k}) = 5 \\times 100/110 \\approx$ **4.55 V** → ADC = 931.
- Sáng: LDR $= 1$ kΩ → $V_{\\text{A0}} = 5 \\times 1\\text{k} / (10\\text{k} + 1\\text{k}) = 5 \\times 1/11 \\approx$ **0.45 V** → ADC = 92.

\`\`\`c
int lightVal = analogRead(A0);  // 0–1023
if (lightVal < 300) {
    digitalWrite(LED, HIGH);    // tối → bật đèn
} else {
    digitalWrite(LED, LOW);     // sáng → tắt đèn
}
\`\`\`

**Nhiệt trở NTC (Negative Temperature Coefficient)**: điện trở giảm khi nhiệt độ tăng. Dùng mạch phân áp tương tự với R_fix 10 kΩ, đọc ADC rồi tính nhiệt độ qua phương trình Steinhart-Hart hoặc lookup table.

❓ **Câu hỏi tự nhiên**:
- *"Tại sao không nối thẳng cảm biến vào ADC mà cần phân áp?"* — Vì ADC đo điện áp (0–5 V), không đo điện trở. Cần biến đổi điện trở → điện áp qua phân áp trước.
- *"R_fix chọn bao nhiêu là tốt nhất?"* — Chọn R_fix ≈ giá trị trung bình của cảm biến để tối ưu độ phân giải trong khoảng hoạt động cần thiết.

📝 **Tóm tắt mục 4**:
- \`analogRead(A0)\` trả về 0–1023 (10-bit) tương ứng 0–5 V.
- Cảm biến điện trở (LDR, NTC) → mạch phân áp → đọc ADC → tính giá trị vật lý.

---

## 5. PWM — Điều chế độ rộng xung

### 5.1. Nguyên lý PWM

💡 **Trực giác**: Nhấp nháy đèn 100 lần/giây ở tỉ lệ 50% thời gian bật / 50% tắt → mắt thấy đèn sáng bằng **nửa** độ sáng tối đa (do quán tính thị giác). Đây chính là PWM (Pulse Width Modulation — điều chế độ rộng xung): tín hiệu số HIGH/LOW xen kẽ nhanh → tải nhận **giá trị trung bình** tỉ lệ với duty cycle.

**Định nghĩa**:
- **Chu kỳ (period) $T$**: thời gian của một chu kỳ PWM đầy đủ.
- **Duty cycle $D$**: tỉ lệ phần trăm thời gian tín hiệu ở mức HIGH.
- **Điện áp trung bình**: $V_{\\text{avg}} = D \\times V_{\\text{HIGH}}$

**Công thức**:

$$D = \\frac{t_{\\text{on}}}{T} \\times 100\\%$$

$$V_{\\text{avg}} = \\frac{D\\%}{100} \\times V_{\\text{supply}}$$

**Ví dụ 4 trường hợp**:

| Duty cycle | t_on (trong 1 ms) | V_avg (5 V supply) | Ứng dụng |
|------------|-------------------|---------------------|----------|
| 0% | 0 ms | 0 V | Tắt hoàn toàn |
| 25% | 0.25 ms | 1.25 V | LED tối, motor chậm |
| 50% | 0.5 ms | 2.5 V | Nửa sáng / nửa tốc độ |
| 100% | 1 ms | 5 V | Sáng tối đa / tốc độ tối đa |

**Tại sao PWM hiệu quả hơn điều chỉnh điện áp bằng biến trở?**
- Biến trở phân áp: năng lượng tổn hao thành nhiệt trên biến trở.
- PWM: transistor MOSFET bão hòa hoặc tắt hoàn toàn → tổn hao rất thấp, hiệu suất cao (~95–98%).

### 5.2. PWM trên Arduino

ATmega328P tạo PWM phần cứng tại chân: **3, 5, 6, 9, 10, 11** (kí hiệu dấu \`~\` trên bo mạch). Tần số PWM mặc định: ~490 Hz (chân 3, 9, 10, 11) và ~980 Hz (chân 5, 6).

\`\`\`c
// analogWrite(pin, value): value = 0..255 (8-bit)
// Duty = value / 255 × 100%

void loop() {
    analogWrite(9, 128);   // duty 50% → LED nửa sáng  (V_avg ≈ 2.5 V)
    analogWrite(9, 64);    // duty 25% → LED tối hơn    (V_avg ≈ 1.25 V)
    analogWrite(9, 255);   // duty 100% → sáng tối đa   (V_avg = 5 V)
    analogWrite(9, 0);     // duty 0%   → tắt
}
\`\`\`

**Ví dụ thực tế — fade LED**:
\`\`\`c
int brightness = 0;
int fadeAmount = 5;

void loop() {
    analogWrite(9, brightness);
    brightness += fadeAmount;
    if (brightness <= 0 || brightness >= 255) {
        fadeAmount = -fadeAmount;
    }
    delay(30);
}
\`\`\`

### 5.3. PWM điều khiển motor — cần MOSFET

⚠ **Không nối motor trực tiếp vào chân PWM** — motor DC nhỏ cần 100–500 mA, vượt xa giới hạn 40 mA của GPIO. Cần MOSFET (ví dụ: IRLZ44N) làm công tắc khuếch đại dòng. Xem [Lesson 06 — MOSFET](../../02-Semiconductors/lesson-06-mosfet/).

**Sơ đồ nguyên lý**:
\`\`\`
MCU Pin 9 (PWM) ──[R_gate = 100 Ω]── Gate MOSFET
                                       Source ── GND
                                       Drain  ── Motor (−)
Motor (+) ── VCC_motor (6 V / 12 V...)
GND_motor ── GND chung với MCU
\`\`\`

🔁 **Tự kiểm tra**: \`analogWrite(9, 191)\` cho duty cycle bao nhiêu %? $V_{\\text{avg}}$ bao nhiêu V (5 V supply)?

<details>
<summary>Đáp án</summary>

$D = 191 / 255 \\times 100\\% \\approx$ **74.9%**

$V_{\\text{avg}} = 0.749 \\times 5 \\approx$ **3.75 V**

</details>

📝 **Tóm tắt mục 5**:
- PWM: HIGH/LOW xen kẽ nhanh → $V_{\\text{avg}}$ tỉ lệ duty cycle.
- \`analogWrite(pin, 0..255)\` trên chân có dấu \`~\`.
- Tải lớn (motor) → MOSFET làm công tắc; không nối trực tiếp GPIO.

---

## 6. Vòng lặp chương trình — setup/loop và interrupt

### 6.1. Vòng lặp chính setup/loop

Mọi chương trình Arduino (và MCU bare-metal nói chung) có cấu trúc:

\`\`\`c
// Chạy MỘT LẦN khi khởi động (cấu hình phần cứng)
void setup() {
    pinMode(13, OUTPUT);
    Serial.begin(9600);
}

// Chạy LẶP VÔ TẬN sau setup()
void loop() {
    // Đọc input → xử lý → điều khiển output
    int val = analogRead(A0);
    if (val > 512) digitalWrite(13, HIGH);
    else           digitalWrite(13, LOW);
    delay(10);
}
\`\`\`

\`delay(ms)\` chặn (blocking) — MCU không làm gì trong khoảng thời gian đó. Với ứng dụng đơn giản thì ổn; với ứng dụng cần phản hồi nhanh, dùng \`millis()\` thay thế (non-blocking).

### 6.2. Timer và Interrupt (giới thiệu định tính)

**Timer**: bộ đếm phần cứng độc lập trong MCU, đếm theo xung nhịp → tạo sự kiện định kỳ mà không phụ thuộc vào code \`loop()\`. Dùng để: tạo PWM, đo thời gian giữa 2 sự kiện, tạo tác vụ định kỳ (đọc cảm biến mỗi 100 ms).

**Interrupt (ngắt)**: khi có sự kiện đặc biệt (chân GPIO thay đổi trạng thái, timer overflow...), MCU dừng \`loop()\` ngay lập tức, nhảy vào **Interrupt Service Routine (ISR)**, xử lý xong rồi quay lại \`loop()\` đúng chỗ đã dừng.

\`\`\`c
volatile bool buttonPressed = false;

void onButtonPress() {         // ISR — không dùng delay() trong ISR
    buttonPressed = true;
}

void setup() {
    pinMode(2, INPUT_PULLUP);
    // Kích hoạt interrupt trên chân 2, cạnh xuống (FALLING = HIGH→LOW = lúc nhấn)
    attachInterrupt(digitalPinToInterrupt(2), onButtonPress, FALLING);
}

void loop() {
    if (buttonPressed) {
        buttonPressed = false;
        // Xử lý sự kiện nhấn nút
    }
    // loop() tiếp tục làm việc khác mà không cần liên tục đọc nút
}
\`\`\`

**Ưu điểm interrupt**: phản hồi tức thì (< 1 µs), không bỏ sót sự kiện ngắn, loop() vẫn làm việc khác.

**Tiếp tục**: giao tiếp số (UART, SPI, I2C) dùng timer + interrupt nặng — xem [Lesson 07 — Giao tiếp](../lesson-07-communication-protocols/).

📝 **Tóm tắt mục 6**:
- \`setup()\` chạy 1 lần; \`loop()\` lặp vô tận.
- Timer: đếm thời gian phần cứng, tạo sự kiện định kỳ.
- Interrupt: phản hồi sự kiện tức thì, không bỏ sót.

---

## Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Viết chương trình blink LED**

Chân 13 nối LED (qua R = 330 Ω, 5 V). Viết chương trình blink 2 Hz (sáng 250 ms, tắt 250 ms).

**Bài 2 — Đọc nút bật LED**

Nút nhấn nối chân 4 (dùng \`INPUT_PULLUP\`). LED nối chân 13. Viết chương trình: nhấn nút → LED sáng, thả nút → LED tắt. Dùng kỹ thuật non-blocking với \`millis()\`.

**Bài 3 — Đọc cảm biến ánh sáng + ngưỡng**

LDR nối A0 qua mạch phân áp với R_fix = 10 kΩ (5 V). Ban ngày ADC ≈ 80, tối ADC ≈ 850. Viết chương trình bật đèn khi ADC > 500 (tối). In giá trị ADC qua Serial mỗi 200 ms.

**Bài 4 — Tính duty PWM cho độ sáng**

Muốn LED sáng **60%** so với tối đa, dùng \`analogWrite\`. Tính: (a) giá trị cần truyền, (b) điện áp trung bình V_avg (5 V supply), (c) nếu R_LED = 220 Ω, tính dòng trung bình qua LED (V_f = 2 V).

**Bài 5 — Tính dòng chân an toàn**

3 LED nối song song giữa chân GPIO 5 V và GND, mỗi LED có R = 150 Ω và V_f = 2 V. Tính tổng dòng qua chân GPIO. Có an toàn không? Nếu không, đề xuất giải pháp.

### Lời giải chi tiết

**Bài 1**:

\`\`\`c
void setup() {
    pinMode(13, OUTPUT);
}

void loop() {
    digitalWrite(13, HIGH);
    delay(250);              // sáng 250 ms
    digitalWrite(13, LOW);
    delay(250);              // tắt 250 ms
    // Chu kỳ = 500 ms → tần số = 1/0.5 = 2 Hz ✓
}
\`\`\`

Kiểm tra dòng: $I = (5 - 2) / 330 \\approx$ **9.1 mA** — an toàn (< 20 mA).

**Bài 2**:

\`\`\`c
const int BTN = 4;
const int LED = 13;

void setup() {
    pinMode(BTN, INPUT_PULLUP);
    pinMode(LED, OUTPUT);
}

void loop() {
    bool btnState = digitalRead(BTN);
    // INPUT_PULLUP: không nhấn = HIGH, nhấn = LOW
    if (btnState == LOW) {
        digitalWrite(LED, HIGH);
    } else {
        digitalWrite(LED, LOW);
    }
    // Không dùng delay() → non-blocking, loop() chạy liên tục
}
\`\`\`

Lưu ý: nên thêm debounce 50 ms nếu thực tế nút bị nhiễu (xem mục 3.4).

**Bài 3**:

\`\`\`c
const int LDR_PIN = A0;
const int LED_PIN = 13;
const int THRESHOLD = 500;
unsigned long lastPrint = 0;

void setup() {
    pinMode(LED_PIN, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    int lightVal = analogRead(LDR_PIN);    // 0–1023

    // Điều khiển LED theo ngưỡng
    if (lightVal > THRESHOLD) {
        digitalWrite(LED_PIN, HIGH);       // tối → bật đèn
    } else {
        digitalWrite(LED_PIN, LOW);        // sáng → tắt đèn
    }

    // In ADC mỗi 200 ms (non-blocking)
    if (millis() - lastPrint >= 200) {
        lastPrint = millis();
        float voltage = lightVal * 5.0 / 1023.0;
        Serial.print("ADC = ");
        Serial.print(lightVal);
        Serial.print("  V = ");
        Serial.println(voltage, 2);
    }
}
\`\`\`

Bước phân tích: ADC > 500 nghĩa là $V_{\\text{A0}} > 500/1023 \\times 5 \\approx 2.44$ V → LDR $> R_{\\text{fix}} = 10$ kΩ → môi trường tối. Logic đúng.

**Bài 4**:

- (a) Giá trị \`analogWrite\`: value $= 60\\% \\times 255 =$ **153** (làm tròn).
- (b) $V_{\\text{avg}} = 153/255 \\times 5.0 =$ **3.0 V** (chính xác $60\\% \\times 5$ V $= 3.0$ V ✓).
- (c) Dòng trung bình: $I_{\\text{avg}} = (V_{\\text{avg}} - V_f) / R_{\\text{LED}} = (3.0 - 2.0) / 220 =$ **4.55 mA**.

Lưu ý: trong thực tế, LED nhận xung HIGH 5 V với duty 60% → dòng đỉnh (peak) $= (5.0 - 2.0) / 220 = 13.6$ mA; dòng **trung bình** $= 13.6 \\times 60\\% =$ **8.16 mA**. Hai cách tính cho kết quả khác nhau vì $V_f$ không tuyến tính, nhưng sai số nhỏ trong thực tế. Cách tính (c) dùng $V_{\\text{avg}}$ là gần đúng.

**Bài 5**:

- Dòng mỗi LED: $I = (5 - 2) / 150 = 3 / 150 =$ **20 mA**.
- Tổng dòng 3 LED song song: $I_{\\text{tổng}} = 3 \\times 20 =$ **60 mA**.
- Giới hạn tuyệt đối ATmega328P: 40 mA/chân → **60 mA vượt giới hạn → không an toàn**.
- **Giải pháp**: dùng transistor BJT NPN (ví dụ 2N2222) hoặc MOSFET (2N7000) làm công tắc; GPIO chỉ điều khiển base/gate (vài mA), transistor cấp dòng lớn từ nguồn ngoài cho 3 LED. Tham khảo [BJT switch](../../02-Semiconductors/lesson-05-bjt-switch/).

---

## Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 05 — ADC/DAC & lấy mẫu](../lesson-05-adc-dac/) — nền tảng ADC dùng trong bài này.
- **Bài tiếp theo**: [Lesson 07 — Giao tiếp số (UART, SPI, I2C)](../lesson-07-communication-protocols/) — MCU kết nối với các thiết bị ngoại vi và module.
- **Transistor làm công tắc**: [BJT switch](../../02-Semiconductors/lesson-05-bjt-switch/), [MOSFET](../../02-Semiconductors/lesson-06-mosfet/).
- **Nền tảng điện trở & phân áp**: [Fundamentals Lesson 03](../../01-Fundamentals/lesson-03-resistors-divider/).
- **Debounce RC**: [Fundamentals Lesson 04](../../01-Fundamentals/lesson-04-capacitor-rc/).
- **Visualization tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 06

1. **Vi điều khiển (MCU)** = CPU + Flash + RAM + GPIO + ADC + timer + giao tiếp trên 1 chip; khác MPU ở chỗ không cần bộ nhớ ngoài, chạy bare-metal.
2. **GPIO OUTPUT**: \`pinMode(pin, OUTPUT)\` + \`digitalWrite(pin, HIGH/LOW)\`; dòng max 20 mA (khuyến nghị), 40 mA (tuyệt đối). Tải lớn hơn → transistor/MOSFET.
3. **GPIO INPUT**: luôn dùng pull-up hoặc pull-down để tránh floating; \`INPUT_PULLUP\` dùng pull-up nội; nhấn nút = LOW (active-low).
4. **Debounce**: đợi 50 ms ổn định (phần mềm) hoặc tụ 100 nF song song nút (phần cứng).
5. **ADC**: \`analogRead()\` trả về 0–1023 (10-bit, 0–5 V); cảm biến điện trở đọc qua phân áp.
6. **PWM**: \`analogWrite(pin, 0..255)\` trên chân \`~\`; $D = \\text{value}/255$; $V_{\\text{avg}} = D \\times V_{\\text{supply}}$.
7. **setup/loop + interrupt**: \`setup()\` cấu hình 1 lần; \`loop()\` lặp mãi; interrupt phản hồi sự kiện tức thì không bỏ sót.
`;
