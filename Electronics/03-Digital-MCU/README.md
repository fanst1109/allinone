# Tầng 3 — Digital & MCU (Điện tử số & vi điều khiển)

Thế giới chỉ có hai mức: 0 và 1. Tầng này xây từ cổng logic (transistor đóng gói lại) lên mạch tổ hợp (cộng, chọn kênh), mạch tuần tự có nhớ (flip-flop, thanh ghi, bộ đếm), cầu nối analog↔digital (ADC/DAC), rồi tới vi điều khiển — con chip lập trình được điều khiển chân I/O, đọc cảm biến, phát PWM, giao tiếp UART/I2C/SPI. Kết thúc bằng một dự án tổng hợp.

## Mục tiêu tổng quát

- Lập bảng chân trị và rút gọn biểu thức Boolean (AND/OR/NOT/NAND/XOR), dùng bìa Karnaugh.
- Thiết kế mạch tổ hợp: bộ cộng (half/full adder), multiplexer, decoder.
- Phân biệt mạch tổ hợp và tuần tự; hiểu latch, flip-flop D/JK và vai trò của clock.
- Ghép flip-flop thành thanh ghi dịch (shift register) và bộ đếm (counter).
- Giải thích lấy mẫu, lượng tử hóa; tính độ phân giải ADC/DAC theo số bit.
- Mô tả kiến trúc vi điều khiển, đọc/ghi chân GPIO (kiểu Arduino), dùng PWM.
- So sánh 3 chuẩn giao tiếp UART, I2C, SPI và chọn đúng cho từng bài toán.
- Ghép cảm biến → xử lý → actuator thành một hệ hoàn chỉnh.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-boolean-logic-gates/) | Boolean & cổng logic | AND/OR/NOT/NAND/XOR, bảng chân trị |
| [Lesson 02](./lesson-02-combinational/) | Mạch tổ hợp | Adder, mux, decoder, Karnaugh |
| [Lesson 03](./lesson-03-sequential-flipflops/) | Mạch tuần tự & flip-flop | Latch, D/JK flip-flop, clock |
| [Lesson 04](./lesson-04-registers-counters/) | Thanh ghi & bộ đếm | Shift register, counter |
| [Lesson 05](./lesson-05-adc-dac/) | ADC/DAC & lấy mẫu | Lấy mẫu, lượng tử hóa, độ phân giải |
| [Lesson 06](./lesson-06-microcontroller-gpio/) | Vi điều khiển & GPIO | Kiến trúc, đọc/ghi chân, PWM |
| [Lesson 07](./lesson-07-communication-protocols/) | Giao tiếp | UART, I2C, SPI |
| [Lesson 08](./lesson-08-project/) | Dự án tổng hợp | Cảm biến → xử lý → actuator |

## Sau tầng này

Hoàn tất lộ trình điện tử thực hành. Bạn có nền để học sâu hơn: thiết kế PCB, FPGA/Verilog, hệ thống nhúng (embedded), hoặc RTOS.

## Liên kết chéo

- Đại số Boolean & logic ↔ `Math/05-NumberTheory-Combinatorics-Logic` và `DataFoundations` (binary, bitwise).
- Cổng logic = transistor làm khóa ↔ `../02-Semiconductors/lesson-05-bjt-switch` và `lesson-06-mosfet`.
- Lập trình vi điều khiển ↔ tư duy lập trình `Programming/` (biến, vòng lặp, hàm).
- ADC/DAC nối lại với tín hiệu AC & lấy mẫu ↔ `../01-Fundamentals/lesson-06-ac-impedance-rlc`.
</content>
