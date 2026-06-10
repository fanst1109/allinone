// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-07-communication-protocols/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Giao tiếp: UART, I2C, SPI

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được vì sao vi điều khiển (microcontroller) cần giao tiếp với thế giới bên ngoài và vì sao giao tiếp nối tiếp (serial) thắng giao tiếp song song (parallel).
- Hiểu UART: khung truyền, baud rate, tính thời gian truyền 1 byte với bất kỳ baud rate nào.
- Hiểu I2C: bus 2 dây, địa chỉ 7-bit, open-drain, master-slave, khi nào dùng.
- Hiểu SPI: 4 dây, full-duplex, nhanh nhất trong ba, khi nào dùng.
- So sánh UART/I2C/SPI để chọn đúng giao thức cho từng tình huống.

## Kiến thức tiền đề

- [Lesson 06 — Vi điều khiển & GPIO](../lesson-06-microcontroller-gpio/) — chân số, tín hiệu HIGH/LOW, điện áp logic 3.3 V/5 V.
- [Lesson 01 — Điện áp, Dòng điện, Điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/) — điện trở kéo lên (pull-up) trong I2C.

---

## 1. Vì sao cần giao tiếp số?

### 1.1. MCU nói chuyện với ai?

💡 **Hình dung**: Vi điều khiển là "bộ não" trong hệ thống nhúng, nhưng bộ não chỉ thật sự hữu ích khi nó có thể nói chuyện với "cơ thể" xung quanh: cảm biến nhiệt độ, màn hình OLED, thẻ SD, module GPS, module Bluetooth, hay MCU khác trong cùng hệ thống.

Các thiết bị ngoại vi phổ biến mà MCU cần giao tiếp:

| Loại thiết bị | Ví dụ | Giao tiếp thường dùng |
|---|---|---|
| Cảm biến môi trường | BME280 (nhiệt độ, độ ẩm, áp suất) | I2C / SPI |
| Màn hình | OLED 128×64, TFT LCD | I2C / SPI |
| Bộ nhớ | Thẻ SD, Flash SPI | SPI |
| Module truyền thông | GPS NEO-6M, Bluetooth HC-05 | UART |
| MCU khác | ESP32 nói với STM32 | UART / SPI |
| Máy tính | Debug, nạp firmware | UART (qua USB-UART) |

### 1.2. Song song vs Nối tiếp

**Giao tiếp song song (parallel)**: gửi nhiều bit cùng lúc qua nhiều dây. Ví dụ truyền 8 bit song song cần 8 dây dữ liệu + dây clock = 9 dây tối thiểu.

**Giao tiếp nối tiếp (serial)**: gửi từng bit một qua 1 hoặc 2 dây.

❓ **Câu hỏi tự nhiên: nếu song song truyền 8 bit một lúc, tại sao không dùng cho mọi trường hợp?**

Vì song song có 3 vấn đề nghiêm trọng:

1. **Nhiều chân vi điều khiển**: MCU thường chỉ có 20–100 chân GPIO, dùng 8–16 chân cho 1 thiết bị là quá lãng phí.
2. **Vấn đề phân kỳ tín hiệu (skew)**: ở tốc độ cao, 8 dây có trễ nhỏ khác nhau → bit đến lệch nhau → lỗi dữ liệu. Cần thiết kế PCB rất cẩn thận, độ dài dây bằng nhau chính xác.
3. **Nhiễu (EMI)**: nhiều dây chuyển đổi cùng lúc tạo ra từ trường mạnh → nhiễu cho linh kiện khác.

Kết quả: hầu hết giao tiếp cảm biến/thiết bị ngoại vi hiện đại đều là **nối tiếp** — ít dây hơn, dễ thiết kế hơn, đủ nhanh cho các ứng dụng thực tế.

### 1.3. Đồng bộ vs Bất đồng bộ

**Giao tiếp bất đồng bộ (asynchronous)**: không có dây clock chung. Hai bên phải thỏa thuận tốc độ trước (baud rate). Ví dụ: UART.

**Giao tiếp đồng bộ (synchronous)**: có dây clock chung. Máy phát gửi xung clock, máy thu đọc dữ liệu theo cạnh xung. Ví dụ: I2C, SPI.

💡 **Analogy**: Bất đồng bộ giống 2 người cùng đếm nhịp trong đầu và đọc thơ theo nhịp đó — không cần nhạc sĩ. Đồng bộ giống nhạc công chơi theo nhịp trống của nhạc trưởng — có người dẫn nhịp, mọi người đi đúng hơn.

### 1.4. Baud rate và clock

**Baud rate** (đọc là "bo rết") = số ký hiệu tín hiệu truyền mỗi giây. Trong UART, 1 ký hiệu = 1 bit, nên baud rate = bit rate (bit/giây = bps).

Quan hệ: $t_{\\text{bit}} = 1 / \\text{baud rate}$.

Các baud rate chuẩn UART phổ biến: **9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600** bps.

Ví dụ cụ thể:
- 9600 bps → 1 bit mất $1/9600 \\approx$ **104.2 µs**.
- 115200 bps → 1 bit mất $1/115200 \\approx$ **8.68 µs**.

**Tần số clock** trong I2C/SPI: thay vì baud rate, ta dùng tần số clock (Hz hoặc MHz). 1 chu kỳ clock = 2 cạnh tín hiệu = truyền 1 bit.

📝 **Tóm tắt mục 1**

- MCU cần giao tiếp với cảm biến, màn hình, bộ nhớ, máy tính, MCU khác.
- Serial thắng parallel vì ít dây, dễ PCB, đủ nhanh cho hầu hết ứng dụng.
- Bất đồng bộ (UART): không có clock chung, 2 bên thỏa baud rate.
- Đồng bộ (I2C, SPI): có dây clock, máy phát điều khiển nhịp.

---

## 2. UART — Universal Asynchronous Receiver-Transmitter

### 2.1. Là gì và vì sao cần?

**UART** (đọc là "iu-a") là giao thức giao tiếp nối tiếp bất đồng bộ đơn giản nhất. Chỉ cần **2 dây** TX (Transmit — phát) và RX (Receive — nhận), nối chéo nhau:

\`\`\`
MCU_A.TX ──────────────→ MCU_B.RX
MCU_A.RX ←────────────── MCU_B.TX
\`\`\`

💡 **Vì sao cần**: UART là giao tiếp "phổ thông" nhất trong vi điều khiển — gần như mọi MCU đều có ít nhất 1 cổng UART. Dùng để debug (in log ra Serial Monitor), nạp firmware, giao tiếp với module GPS/Bluetooth, nói chuyện với máy tính qua chip USB-UART (CH340, CP2102, FTDI).

**Hạn chế**: Chỉ point-to-point (1 đối 1), không có cơ chế địa chỉ. Tốc độ thường giới hạn ở vài Mbps.

### 2.2. Khung truyền UART (UART Frame)

Mỗi byte dữ liệu được đóng gói trong một **khung (frame)**. Cấu trúc khung UART phổ biến nhất (8N1):

\`\`\`
IDLE  [Start] [D0] [D1] [D2] [D3] [D4] [D5] [D6] [D7] [Stop]  IDLE
HIGH   LOW    data bit LSB ──────────────────────── MSB   HIGH
\`\`\`

Chi tiết từng phần:

| Phần | Số bit | Giá trị | Ý nghĩa |
|---|---|---|---|
| Idle (trạng thái nghỉ) | — | HIGH (1) | Đường dây khi không có dữ liệu |
| Start bit | 1 | LOW (0) | Báo hiệu bắt đầu frame |
| Data bits | 5-9 (thường là 8) | D0 (LSB) → D7 (MSB) | Dữ liệu thực sự |
| Parity bit | 0 hoặc 1 | Even/Odd/None | Phát hiện lỗi (thường bỏ qua = None) |
| Stop bit(s) | 1 hoặc 2 | HIGH (1) | Báo hiệu kết thúc frame |

**Cấu hình 8N1** là phổ biến nhất: 8 data bits, No parity, 1 stop bit. Tổng $= 1 + 8 + 1 =$ **10 bit** cho mỗi byte dữ liệu.

⚠ **Lỗi thường gặp**: Hai bên dùng baud rate khác nhau → nhận rác. Ví dụ: MCU phát ở 115200 bps, Arduino nhận ở 9600 bps → đọc sai hoàn toàn. Luôn kiểm tra baud rate trong code.

### 2.3. Tính thời gian truyền — 3 ví dụ số

**Công thức tổng quát**:

\`\`\`
T_frame = N_bit_per_frame / baud_rate (giây)
T_byte  = T_frame × N_byte
\`\`\`

Với cấu hình 8N1: N_bit_per_frame = 10 (1 start + 8 data + 1 stop).

---

**Ví dụ 1**: Truyền 1 byte ở 9600 bps.
- $t_{\\text{bit}} = 1 / 9600 =$ **104.17 µs**
- $t_{\\text{frame}}$ (1 byte) $= 10 \\times 104.17$ µs $=$ **1041.7 µs ≈ 1.04 ms**
- → 1 byte mất khoảng 1 mili-giây ở 9600 bps.

**Ví dụ 2**: Truyền 1 byte ở 115200 bps.
- $t_{\\text{bit}} = 1 / 115200 =$ **8.68 µs**
- $t_{\\text{frame}}$ (1 byte) $= 10 \\times 8.68$ µs $=$ **86.8 µs**
- → Nhanh hơn ví dụ 1 đúng 12× ($= 115200/9600$).

**Ví dụ 3**: Truyền chuỗi "Hello" (5 byte) ở 115200 bps.
- $t_{\\text{tổng}} = 5 \\times 86.8$ µs $=$ **434 µs ≈ 0.43 ms**
- Throughput thực tế $= 5$ byte $/$ 0.434 ms $=$ **11,520 byte/s = 11.25 kB/s**
  (nhỏ hơn 115200 bit/s $\\div 8 = 14400$ byte/s vì có overhead 2 bit/frame)

❓ **Tại sao throughput thực tế thấp hơn baud rate ÷ 8?**

Vì mỗi frame 8 data bit kèm theo 2 bit overhead (start + stop), tức là hiệu suất $= 8/10 =$ **80%** baud rate. Ở 115200 bps → chỉ $115200 \\times 0.8 = 92160$ bps dữ liệu thực $= 11520$ byte/s.

### 2.4. Ứng dụng thực tế

- **Debug Serial**: \`Serial.println("Hello")\` trong Arduino → in ra Serial Monitor trên máy tính qua UART.
- **Nạp firmware**: Bootloader của Arduino Uno dùng UART để nhận firmware mới từ máy tính.
- **Module GPS** (NEO-6M, u-blox): gửi câu NMEA (dạng \`GPGLL,...\`) qua UART ở 9600 bps mặc định.
- **Module Bluetooth** (HC-05, HC-06): hoạt động như cầu nối UART-Bluetooth — MCU giao tiếp qua UART như bình thường.
- **ESP8266/ESP32**: module WiFi/BLE, giao tiếp với MCU host qua UART (AT commands hoặc firmware tùy chỉnh).

📝 **Tóm tắt mục 2**

- UART = 2 dây TX/RX, không có clock chung, hai bên phải cùng baud rate.
- Khung 8N1 = 10 bit/byte (1 start + 8 data + 1 stop) → hiệu suất 80%.
- $t_{\\text{byte}} = 10 / \\text{baud rate}$: ở 9600 bps $\\approx$ 1 ms/byte; ở 115200 bps $\\approx$ 87 µs/byte.
- Ứng dụng: debug, nạp code, GPS, Bluetooth, module WiFi.

---

## 3. I2C — Inter-Integrated Circuit

### 3.1. Là gì và vì sao cần?

**I2C** (đọc là "ai-tu-xi" hoặc "ai-squared-xi") là giao thức đồng bộ chỉ dùng **2 dây**: SDA (Serial Data — dữ liệu) và SCL (Serial Clock — xung đồng hồ).

💡 **Điểm đặc biệt**: I2C là **bus** — nhiều thiết bị dùng chung 2 dây, phân biệt nhau bằng **địa chỉ 7-bit** ($2^7 = 128$ địa chỉ tối đa). Giống như một đường điện thoại nội bộ với nhiều phòng ban — mỗi phòng có số máy lẻ riêng.

**Vì sao cần** (so với UART và SPI):
- Nhiều thiết bị, ít dây: 8 cảm biến I2C dùng chung 2 dây; 8 thiết bị SPI cần 8+3 = 11 dây; 8 UART cần 16 dây.
- Tiêu chuẩn hóa: giao thức I2C (do Philips/NXP định nghĩa 1982) có trong hầu hết cảm biến nhỏ.

### 3.2. Cơ chế hoạt động

**Kiến trúc master-slave**:
- **Master**: điều khiển xung clock SCL, khởi động và kết thúc giao tiếp. Thường là MCU.
- **Slave**: thiết bị ngoại vi, chờ master gọi. Mỗi slave có địa chỉ I2C 7-bit duy nhất (địa chỉ 0 là broadcast, nên thực tế dùng được $2^7 - 1 = 127$ địa chỉ).

**Điện trở kéo lên (pull-up resistor)**:
Cả SDA và SCL đều dùng cấu trúc **open-drain** (cực máng hở): bộ nhớ có thể kéo đường dây xuống LOW, nhưng **không thể chủ động đưa lên HIGH** — phải nhờ điện trở kéo lên (thường 4.7 kΩ hoặc 2.2 kΩ) nối lên VCC.

⚠ **Lỗi thường gặp**: Quên gắn điện trở pull-up → SDA/SCL không thể lên HIGH → giao tiếp không hoạt động. Nhiều module cảm biến đã tích hợp pull-up sẵn trên board, nhưng nếu dùng IC trần thì phải tự thêm.

**Khung truyền I2C**:

\`\`\`
[Start] [Addr 7-bit] [R/W] [ACK] [Data 8-bit] [ACK] ... [Stop]
\`\`\`

- **Start condition**: SDA xuống LOW trong khi SCL vẫn HIGH.
- **Địa chỉ 7-bit**: master gửi địa chỉ slave muốn nói chuyện (ví dụ \`0x76\` cho BME280).
- **R/W bit**: 0 = ghi (master → slave), 1 = đọc (slave → master).
- **ACK**: slave kéo SDA xuống LOW sau mỗi byte để xác nhận nhận được.
- **Stop condition**: SDA lên HIGH trong khi SCL vẫn HIGH.

**Ví dụ walk-through: Đọc nhiệt độ từ BME280 (địa chỉ 0x76)**:

1. Master gửi Start.
2. Master gửi \`0x76\` + bit W (0) → Master muốn ghi vào 0x76.
3. BME280 ACK.
4. Master gửi \`0xFA\` (địa chỉ thanh ghi nhiệt độ trong BME280).
5. BME280 ACK.
6. Master gửi Start lại (Repeated Start).
7. Master gửi \`0x76\` + bit R (1) → Master muốn đọc từ 0x76.
8. BME280 ACK.
9. BME280 gửi byte 1 (MSB nhiệt độ). Master ACK.
10. BME280 gửi byte 2. Master ACK.
11. BME280 gửi byte 3 (LSB). Master NACK (báo ngừng đọc).
12. Master gửi Stop.

### 3.3. Tốc độ và ưu/nhược điểm

**Tốc độ chuẩn**:
- Standard mode: **100 kHz** (phổ biến nhất cho cảm biến)
- Fast mode: **400 kHz** (hầu hết thiết bị I2C hỗ trợ)
- Fast Plus: **1 MHz**; High Speed: **3.4 MHz** (ít thiết bị dùng)

**Ưu điểm**:
- Chỉ 2 dây cho nhiều thiết bị.
- Có ACK → phát hiện lỗi cơ bản (slave không phản hồi).
- Tiêu chuẩn hóa, hầu hết cảm biến đều có.

**Nhược điểm**:
- Chậm hơn SPI (thường ≤ 400 kHz so với MHz).
- Open-drain + pull-up tạo ra giới hạn về chiều dài bus và tốc độ.
- Overhead giao thức (start/stop/ack) làm giảm hiệu suất khi truyền dữ liệu nhỏ.
- Địa chỉ cố định trên chip → không thể có 2 BME280 cùng địa chỉ trên 1 bus (phải dùng bus I2C khác hoặc đổi địa chỉ nếu chip cho phép).

### 3.4. Ứng dụng thực tế

- **Cảm biến môi trường**: BME280 (nhiệt độ/độ ẩm/áp suất), BMP180, SHT31.
- **RTC (Real-Time Clock)**: DS3231, PCF8523 — đọc/ghi thời gian qua I2C.
- **Màn hình OLED nhỏ**: SSD1306 128×64 — điều khiển qua I2C (chậm hơn SPI nhưng đủ dùng).
- **Cảm biến IMU**: MPU6050 (gia tốc kế + gyroscope) — I2C.
- **DAC/ADC ngoài**: MCP4725, ADS1115.

📝 **Tóm tắt mục 3**

- I2C = 2 dây (SDA + SCL), đồng bộ, nhiều slave trên 1 bus.
- Địa chỉ 7-bit phân biệt slave; master điều khiển clock.
- Open-drain + pull-up bắt buộc (4.7 kΩ hoặc 2.2 kΩ).
- Tốc độ 100 kHz / 400 kHz / 1 MHz.
- Dùng khi: nhiều cảm biến, ít dây, không cần tốc độ cao.

---

## 4. SPI — Serial Peripheral Interface

### 4.1. Là gì và vì sao cần?

**SPI** (đọc là "ét-pi-ai") là giao thức đồng bộ dùng **4 dây**:
- **MOSI** (Master Out Slave In): master gửi dữ liệu đến slave.
- **MISO** (Master In Slave Out): slave gửi dữ liệu về master.
- **SCLK** (Serial Clock): xung clock do master tạo.
- **CS** (Chip Select) hoặc **SS** (Slave Select): master kéo xuống LOW để chọn slave cần nói chuyện.

💡 **Điểm khác biệt với I2C**: SPI là **full-duplex** — master và slave truyền dữ liệu **đồng thời** theo 2 hướng độc lập. I2C và UART là bán song công (half-duplex hoặc simplex). Giống như 2 người cùng nói và cùng nghe song song — không cần chờ nhau.

**Vì sao cần**: SPI có thể đạt tốc độ **50–100 MHz** (tùy chip), cao hơn nhiều so với I2C (max ~3.4 MHz). Dùng cho những ứng dụng cần băng thông lớn: màn hình TFT, thẻ SD, ADC tốc độ cao.

### 4.2. Cơ chế hoạt động

**Kết nối nhiều slave**:

\`\`\`
MCU ─── MOSI ──┬──── Slave A (thẻ SD)
               ├──── Slave B (màn hình TFT)
               └──── Slave C (Flash SPI)
       MISO ──┬──── Slave A
               ├──── Slave B
               └──── Slave C
       SCLK ──┬──── Slave A
               ├──── Slave B
               └──── Slave C
       CS_A ──────── Slave A (chỉ Slave A active khi CS_A = LOW)
       CS_B ──────── Slave B
       CS_C ──────── Slave C
\`\`\`

Mỗi slave cần 1 chân CS riêng. MOSI, MISO, SCLK dùng chung.

**Ví dụ walk-through: Đọc 1 byte từ thẻ SD**:

Giả sử gửi lệnh đọc, ta nhận được byte \`0b10110100\` = \`0xB4\`:

| Chu kỳ clock | Bit MOSI (gửi CMD) | Bit MISO (nhận dữ liệu) |
|---|---|---|
| 1 | 0 (CMD bit7) | **1** (D7) |
| 2 | 1 (CMD bit6) | **0** (D6) |
| 3 | 0 (CMD bit5) | **1** (D5) |
| 4 | 1 (CMD bit4) | **1** (D4) |
| 5 | 0 (CMD bit3) | **0** (D3) |
| 6 | 1 (CMD bit2) | **1** (D2) |
| 7 | 0 (CMD bit1) | **0** (D1) |
| 8 | 1 (CMD bit0) | **0** (D0) |

8 chu kỳ clock → đồng thời gửi 1 byte lệnh VÀ nhận 1 byte dữ liệu.

**SPI modes (0-3)**: Tùy thiết bị, SPI có thể đọc dữ liệu ở cạnh lên hay cạnh xuống của clock (CPOL và CPHA). Khi dùng thư viện Arduino/HAL, chỉ cần cấu hình đúng mode (thường ghi trong datasheet, phổ biến nhất là Mode 0).

### 4.3. Tốc độ và ưu/nhược điểm

**Tốc độ**:
- Thẻ SD: đến **25 MHz** (mode thường) hoặc 50 MHz (SDHC).
- Màn hình TFT ILI9341: đến **40 MHz**.
- ADC MCP3208: đến **2 MHz**.
- Flash W25Q128: đến **104 MHz**.

**Ưu điểm**:
- Tốc độ cao nhất trong ba giao thức (MHz vs kHz).
- Full-duplex — truyền và nhận đồng thời.
- Đơn giản về mặt giao thức — không cần ACK, không cần địa chỉ.
- Không cần điện trở pull-up.

**Nhược điểm**:
- Mỗi slave cần 1 chân CS riêng → nhiều slave = nhiều chân MCU.
- Không có cơ chế xác nhận (ACK) — không biết slave có nhận được không.
- Không tiêu chuẩn hóa hoàn toàn — mỗi thiết bị có thể dùng mode khác nhau.
- Dây nhiều hơn I2C.

📝 **Tóm tắt mục 4**

- SPI = 4 dây (MOSI + MISO + SCLK + CS), đồng bộ, full-duplex.
- Mỗi slave cần 1 chân CS riêng — không có địa chỉ.
- Tốc độ cao nhất (10–100 MHz).
- Dùng khi: màn hình, thẻ SD, ADC/DAC tốc độ cao, flash ngoài.

---

## 5. Bảng so sánh UART / I2C / SPI

| Tiêu chí | UART | I2C | SPI |
|---|---|---|---|
| Số dây | 2 (TX + RX) | 2 (SDA + SCL) | 4 (MOSI+MISO+SCLK+CS×N) |
| Đồng bộ? | Không (bất đồng bộ) | Có | Có |
| Tốc độ điển hình | 9600 – 921600 bps | 100 kHz / 400 kHz | 1 – 50+ MHz |
| Số thiết bị | 1 đối 1 (point-to-point) | Nhiều slave, 1 bus | Nhiều slave, 1 CS/slave |
| Chiều truyền | Full-duplex | Bán song công | Full-duplex |
| Phát hiện lỗi | Parity (tùy chọn) | ACK/NACK | Không |
| Pull-up cần? | Không | Có (4.7 kΩ) | Không |
| Khoảng cách | Xa hơn (10–50 m với RS-232) | Ngắn (< 1 m thực tế) | Rất ngắn (< 30 cm) |
| Ứng dụng điển hình | Debug, GPS, BT, WiFi | Cảm biến nhỏ, OLED, RTC | Thẻ SD, TFT, Flash, ADC |

### Hướng dẫn chọn giao thức

**Chọn UART khi**:
- Cần giao tiếp với máy tính hoặc module đã có sẵn UART (GPS, Bluetooth, WiFi module).
- Khoảng cách xa (UART → RS-232 có thể đi 50 m).
- Chỉ có 2 thiết bị cần nói chuyện.

**Chọn I2C khi**:
- Nhiều cảm biến nhỏ, không cần tốc độ cao (< 400 kHz đủ dùng).
- Số chân MCU có hạn — I2C cho 8+ slave chỉ dùng 2 chân.
- Cần xác nhận giao tiếp (ACK giúp phát hiện lỗi).

**Chọn SPI khi**:
- Cần tốc độ cao (màn hình cần update liên tục, thẻ SD đọc/ghi file lớn).
- Giao tiếp với thiết bị full-duplex (ADC, DAC tốc độ cao).
- Số thiết bị ít (1–4 slave) và có đủ chân MCU.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một MCU truyền chuỗi "HELLO WORLD" (11 ký tự ASCII = 11 byte) qua UART với cấu hình 8N1 ở baud rate 9600 bps. Tính tổng thời gian truyền.

**Bài 2**: Cùng chuỗi "HELLO WORLD" truyền ở 115200 bps với cấu hình 8N1. Tính thời gian truyền và so sánh với Bài 1.

**Bài 3**: Một hệ thống nhúng cần gắn các thiết bị sau:
- 3 cảm biến nhiệt độ SHT31 (I2C, địa chỉ 0x44 và 0x45 — một loại có 2 địa chỉ khả dụng).
- 1 màn hình OLED (I2C, 0x3C).
- 1 thẻ SD (SPI).
- 1 module GPS (UART).
Hỏi: Cần tối thiểu bao nhiêu chân MCU?

**Bài 4**: Một I2C bus có 5 thiết bị slave với địa chỉ lần lượt: 0x20, 0x21, 0x48, 0x68, 0x76. Master muốn đọc 2 byte từ slave địa chỉ 0x48. Mô tả chuỗi sự kiện trên bus (các byte được gửi theo thứ tự nào?).

**Bài 5**: Để truyền 1 frame ảnh 320×240 pixel (mỗi pixel 2 byte màu RGB565) qua SPI ở 10 MHz, cần bao nhiêu thời gian?

**Bài 6**: So sánh số dây cần thiết khi kết nối 6 cảm biến với MCU bằng: (a) I2C, (b) SPI, (c) 6 kênh UART riêng biệt.

### Lời giải chi tiết

---

**Bài 1 — Lời giải**:

Chuỗi "HELLO WORLD" = 11 ký tự × 1 byte/ký tự = **11 byte**.

Cấu hình 8N1 → mỗi byte = 10 bit (1 start + 8 data + 1 stop).

Thời gian 1 bit ở 9600 bps:

$$t_{\\text{bit}} = \\frac{1}{9600} = 104.17 \\text{ µs}$$

Thời gian 1 byte:

$$t_{\\text{byte}} = 10 \\times t_{\\text{bit}} = 10 \\times 104.17 \\text{ µs} = 1041.7 \\text{ µs}$$

Thời gian toàn bộ chuỗi:

$$t_{\\text{total}} = 11 \\times 1041.7 \\text{ µs} = 11{,}458.7 \\text{ µs} \\approx 11.46 \\text{ ms}$$

**Đáp án: 11.46 ms**.

---

**Bài 2 — Lời giải**:

Tương tự Bài 1 nhưng baud rate = 115200 bps:

$$t_{\\text{bit}} = \\frac{1}{115200} = 8.68 \\text{ µs}$$

$$t_{\\text{byte}} = 10 \\times 8.68 \\text{ µs} = 86.8 \\text{ µs}$$

$$t_{\\text{total}} = 11 \\times 86.8 \\text{ µs} = 954.9 \\text{ µs} \\approx 0.955 \\text{ ms}$$

**Đáp án: ≈ 0.955 ms**.

So sánh: $115200 / 9600 =$ **12 lần** nhanh hơn → thời gian giảm 12 lần ($11.46$ ms $/ 12 \\approx 0.955$ ms). Tỉ lệ nghịch với baud rate — đúng như công thức.

---

**Bài 3 — Lời giải**:

Phân tích từng thiết bị:

| Thiết bị | Giao thức | Chân MCU cần |
|---|---|---|
| 3× SHT31 | I2C (chung bus SDA+SCL) | 2 chân (SDA + SCL) cho tất cả |
| OLED | I2C (chung bus) | 0 chân thêm (dùng chung SDA+SCL) |
| Thẻ SD | SPI | 4 chân: MOSI + MISO + SCLK + CS_SD |
| Module GPS | UART | 2 chân: TX + RX |

Tuy nhiên, 3× SHT31 có vấn đề: SHT31 chỉ có địa chỉ 0x44 và 0x45 (2 địa chỉ khả dụng do chân ADDR). Với 3 cảm biến, 2 cái đầu dùng 2 địa chỉ này, **cái thứ 3 không thể có địa chỉ khác** trên cùng 1 bus I2C.

Giải pháp: dùng thêm 1 I2C bus hoặc I2C multiplexer (TCA9548A) → thêm 2 chân SCL+SDA thứ 2 hoặc 2 chân cho TCA9548A qua I2C.

Nếu bỏ qua vấn đề trùng địa chỉ (đề bài cho là khả dụng):

$\\text{Tổng} = 2 \\text{ (I2C)} + 4 \\text{ (SPI)} + 2 \\text{ (UART)} = 8$ chân

**Đáp án: tối thiểu 8 chân MCU** (chú ý: thực tế cần giải quyết vấn đề trùng địa chỉ I2C).

---

**Bài 4 — Lời giải**:

Master muốn đọc 2 byte từ slave 0x48. Chuỗi byte trên bus theo thứ tự:

Bước 1: **Start condition** — SDA xuống LOW khi SCL HIGH.

Bước 2: Master gửi **0x48 << 1 | 0 = 0x90** (địa chỉ 0x48, shift trái 1 bit, bit R/W = 0 = ghi):
\`\`\`
Byte: 1001 0000 (= 0x90 trong khung I2C)
\`\`\`
Slave 0x48 nhận ra địa chỉ mình → kéo SDA xuống ACK.

Bước 3: Master gửi byte địa chỉ thanh ghi cần đọc (ví dụ **0x00** = thanh ghi conversion result của ADS1115/TMP102 tùy chip).

Slave ACK.

Bước 4: **Repeated Start** — Master gửi Start lại mà không gửi Stop.

Bước 5: Master gửi **0x48 << 1 | 1 = 0x91** (địa chỉ 0x48, bit R/W = 1 = đọc):
\`\`\`
Byte: 1001 0001 (= 0x91)
\`\`\`
Slave ACK.

Bước 6: Slave gửi **byte cao** (MSB). Master ACK.

Bước 7: Slave gửi **byte thấp** (LSB). Master NACK (báo ngừng đọc).

Bước 8: **Stop condition** — SDA lên HIGH khi SCL HIGH.

**Tóm tắt thứ tự byte**: START → 0x90 → ACK → 0x00 → ACK → RESTART → 0x91 → ACK → [Byte1] → ACK → [Byte2] → NACK → STOP.

---

**Bài 5 — Lời giải**:

Tổng dữ liệu cần truyền:

$$N_{\\text{byte}} = 320 \\times 240 \\times 2 = 153{,}600 \\text{ byte}$$

$$N_{\\text{bit}} = 153{,}600 \\times 8 = 1{,}228{,}800 \\text{ bit}$$

Tốc độ clock SPI $= 10$ MHz $= 10{,}000{,}000$ bit/giây (mỗi chu kỳ clock = 1 bit).

Thời gian truyền:

$$t = \\frac{N_{\\text{bit}}}{f_{\\text{clock}}} = \\frac{1{,}228{,}800}{10{,}000{,}000} = 0.12288 \\text{ s} \\approx 122.9 \\text{ ms}$$

Đây là thời gian truyền ròng. Thực tế còn thêm overhead lệnh (khoảng vài µs mỗi lệnh display), nhưng chiếm không đáng kể.

**Đáp án: ≈ 122.9 ms** cho 1 frame tại 10 MHz.

Hệ quả: để đạt 30 FPS cần: $t_{\\text{frame}} \\leq 1/30$ s $\\approx 33.3$ ms. Với 10 MHz chỉ đạt $\\approx 8$ FPS. Phải dùng SPI $\\geq$ **40 MHz** để đạt 30 FPS (ILI9341 hỗ trợ 40 MHz write).

---

**Bài 6 — Lời giải**:

**a) I2C — 6 cảm biến**:
- Tất cả 6 cảm biến dùng chung 1 bus I2C: **2 chân** (SDA + SCL), cộng thêm 2 điện trở pull-up.
- Lưu ý: cần 6 địa chỉ I2C khác nhau.

**b) SPI — 6 cảm biến**:
- MOSI + MISO + SCLK dùng chung: 3 chân.
- Mỗi slave cần 1 chân CS riêng: 6 chân.
- **Tổng: 9 chân**.

**c) UART — 6 kênh riêng biệt**:
- Mỗi UART cần 2 dây (TX + RX): 6 × 2 = **12 chân**.

**Tóm tắt**:

| Giao thức | Số chân MCU | Ghi chú |
|---|---|---|
| I2C | **2** | Tiết kiệm nhất, nhưng cần địa chỉ khác nhau |
| SPI | **9** | 3 dùng chung + 6 chân CS |
| UART | **12** | Tốn nhất, nhưng không cần thiết bị đặc biệt |

**I2C tiết kiệm chân MCU nhất khi có nhiều slave**.

---

## 7. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 06 — Vi điều khiển & GPIO](../lesson-06-microcontroller-gpio/) — nền tảng về MCU và điều khiển chân số.
- **Bài tiếp theo**: [Lesson 08 — Dự án tổng hợp](../lesson-08-project/) — áp dụng kiến thức MCU, GPIO và giao tiếp vào dự án thực tế.
- **Điện trở pull-up**: [Lesson 01 — Điện áp & Điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/) — giải thích tại sao cần pull-up trong I2C.
- **Tham khảo kỹ thuật**:
  - UART: [NXP AN10216 — UART Application Note](https://www.nxp.com)
  - I2C: [UM10204 — I2C-bus specification (NXP)](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)
  - SPI: [Analog Devices — Introduction to SPI Interface](https://www.analog.com)

---

## 📝 Tổng kết Lesson 07

1. **UART** = bất đồng bộ, 2 dây TX/RX, 2 bên thỏa baud rate, point-to-point. Khung 8N1 = 10 bit/byte → hiệu suất 80%. Dùng để debug, GPS, Bluetooth.
2. **I2C** = đồng bộ, 2 dây SDA+SCL, nhiều slave qua địa chỉ 7-bit, open-drain + pull-up, 100–400 kHz. Dùng cho cảm biến nhỏ, RTC, OLED.
3. **SPI** = đồng bộ, 4 dây MOSI+MISO+SCLK+CS, full-duplex, mỗi slave cần 1 chân CS, 1–100 MHz. Dùng cho màn hình, thẻ SD, flash tốc độ cao.
4. **Chọn giao thức**: nhiều slave + ít dây → I2C; tốc độ cao + ít slave → SPI; module sẵn có / debug / khoảng cách xa → UART.
5. **Tính thời gian UART**: $t_{\\text{byte}} = 10 / \\text{baud rate}$ (cho 8N1); throughput thực $= \\text{baud rate} \\times 80\\%$.

**Tiếp theo**: [Lesson 08 — Dự án tổng hợp](../lesson-08-project/visualization.html)
`;
