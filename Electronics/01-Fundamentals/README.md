# Tầng 1 — Fundamentals (Nền tảng & linh kiện thụ động)

Nền tảng điện tử thực hành: hiểu điện áp/dòng/điện trở từ góc kỹ thuật, giải mạch bằng Kirchhoff, dùng điện trở để chia áp/chia dòng, nắm hành vi tụ điện và cuộn cảm trong miền thời gian (RC, RL) lẫn miền tần số (AC, trở kháng, RLC, bộ lọc), và biết dùng dụng cụ đo. Sau tầng này bạn đọc và tính được phần lớn mạch thụ động.

## Mục tiêu tổng quát

- Phát biểu và áp dụng định luật Ohm `V = I·R`, tính công suất `P = V·I`.
- Giải mạch nối tiếp/song song bằng 2 định luật Kirchhoff (KVL/KCL).
- Đọc mã màu điện trở; thiết kế mạch phân áp (voltage divider) và phân dòng.
- Mô tả nạp/xả tụ qua hằng số thời gian `τ = RC`; tính điện áp tụ theo thời gian.
- Hiểu cuộn cảm cản trở thay đổi dòng; mạch RL với `τ = L/R`.
- Phân tích tín hiệu AC bằng biên độ/pha/RMS, trở kháng `Z`, cộng hưởng RLC.
- Thiết kế bộ lọc RC low-pass/high-pass; tính tần số cắt `f_c`.
- Sử dụng multimeter và oscilloscope; hiểu mạch nguồn cơ bản.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-voltage-current-resistance/) | Điện áp, dòng, điện trở | Định luật Ohm, công suất, quy ước dòng |
| [Lesson 02](./lesson-02-kirchhoff-circuits/) | Mạch & Kirchhoff | Nối tiếp/song song, KVL, KCL |
| [Lesson 03](./lesson-03-resistors-divider/) | Điện trở & phân áp | Mã màu, dung sai, phân áp, phân dòng |
| [Lesson 04](./lesson-04-capacitor-rc/) | Tụ điện & mạch RC | Nạp/xả, hằng số τ = RC |
| [Lesson 05](./lesson-05-inductor-rl/) | Cuộn cảm & mạch RL | Năng lượng từ, τ = L/R, đóng/ngắt |
| [Lesson 06](./lesson-06-ac-impedance-rlc/) | AC, trở kháng & RLC | RMS, pha, Z, cộng hưởng |
| [Lesson 07](./lesson-07-filters/) | Bộ lọc | Low/high-pass, tần số cắt, Bode |
| [Lesson 08](./lesson-08-power-instruments/) | Nguồn & dụng cụ đo | Multimeter, oscilloscope, nguồn DC |

## Sau tầng này

Sang **Tầng 2 — Semiconductors**: từ linh kiện thụ động (chỉ tiêu thụ/lưu trữ năng lượng) sang linh kiện tích cực (khuếch đại, chuyển mạch) — diode, transistor, op-amp.

## Liên kết chéo

- Lesson 01-02 dựa trên `Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits` (dòng điện, mạch).
- Lesson 04-05 (RC, RL) giải bằng ODE bậc 1 → `Math/06-Advanced/lesson-07`.
- Lesson 06 (AC, trở kháng phức) dùng số phức → `Math/03-Trig-Complex`.
</content>
