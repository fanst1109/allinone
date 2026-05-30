# Tầng 2 — Semiconductors (Bán dẫn & mạch tích cực)

Từ linh kiện thụ động sang **linh kiện tích cực** — những linh kiện có thể khuếch đại tín hiệu hoặc đóng/ngắt dòng lớn bằng tín hiệu nhỏ. Bắt đầu từ bản chất chất bán dẫn và mối nối P-N, qua diode (van một chiều), transistor BJT và MOSFET (khuếch đại & khóa), tới op-amp — khối khuếch đại vạn năng. Đây là trái tim của mọi mạch điện tử hiện đại.

## Mục tiêu tổng quát

- Giải thích vì sao chất bán dẫn pha tạp (doping) tạo bán dẫn loại N/P, và vì sao mối nối P-N dẫn điện một chiều.
- Phân tích diode trong mạch chỉnh lưu, ổn áp Zener, và tính dòng LED.
- Thiết kế mạch nguồn DC: chỉnh lưu nửa kỳ/toàn kỳ + tụ lọc + ổn áp.
- Hiểu 3 vùng làm việc của BJT; thiết kế mạch khuếch đại common-emitter và mạch khóa (switch).
- So sánh BJT và MOSFET; dùng MOSFET đóng/ngắt tải công suất và điều khiển PWM.
- Áp dụng 2 quy tắc op-amp lý tưởng cho mạch khuếch đại đảo/không đảo, buffer, cộng/trừ, tích phân, comparator.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-semiconductor-pn/) | Bán dẫn & mối nối P-N | Doping, vùng nghèo, dẫn một chiều |
| [Lesson 02](./lesson-02-diode/) | Diode | Chỉnh lưu, Zener, LED |
| [Lesson 03](./lesson-03-dc-power-supply/) | Mạch nguồn DC | Chỉnh lưu nửa/toàn kỳ, lọc, ổn áp |
| [Lesson 04](./lesson-04-bjt-amplifier/) | BJT — khuếch đại | Vùng hoạt động, độ lợi β, common-emitter |
| [Lesson 05](./lesson-05-bjt-switch/) | BJT làm khóa | Bão hòa/ngắt, điều khiển tải, relay |
| [Lesson 06](./lesson-06-mosfet/) | MOSFET | Ngưỡng V_GS, công suất, PWM |
| [Lesson 07](./lesson-07-opamp-basics/) | Op-amp cơ bản | 2 quy tắc vàng, đảo/không đảo, buffer |
| [Lesson 08](./lesson-08-opamp-applications/) | Op-amp ứng dụng | Cộng/trừ, tích phân, comparator |

## Sau tầng này

Sang **Tầng 3 — Digital & MCU**: từ tín hiệu analog liên tục sang thế giới số (0/1), cổng logic, và vi điều khiển — nơi transistor được đóng gói thành hàng triệu cổng.

## Liên kết chéo

- Diode & transistor dựa trên bản chất bán dẫn ↔ `Chemistry/01-Structure` (liên kết, vùng năng lượng) và `Physics/03-Optics-ModernPhysics/lesson-05-atom-bohr-orbital`.
- Cần nền điện trường/điện thế ↔ `Physics/02-Thermo-Electromagnetism/lesson-05-electric-field-potential`.
- Dùng lại phân áp, mạch RC từ Tầng 1 (`../01-Fundamentals/`).
</content>
