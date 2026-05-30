# Electronics — Điện tử

Lộ trình **điện tử thực hành (practical electronics)** — từ linh kiện rời tới vi điều khiển. 3 tầng × 8 bài = 24 bài, đi từ điện trở/tụ/cuộn cảm tới diode, transistor, op-amp, cổng logic và microcontroller.

## Điện tử khác Vật lý điện ở chỗ nào?

`Physics/02-Thermo-Electromagnetism` dạy **điện ở mức vật lý**: vì sao có điện tích, điện trường, định luật Coulomb, phương trình Maxwell — trả lời câu hỏi *"bản chất điện là gì"*.

`Electronics/` dạy **điện ở mức kỹ thuật**: cầm con điện trở thật, đọc mã màu, ghép thành mạch phân áp, sạc tụ, khuếch đại tín hiệu bằng transistor, dựng cổng logic, lập trình chân GPIO. Trả lời câu hỏi *"làm sao dùng điện để chế tạo thiết bị"*.

Hai lĩnh vực bổ sung nhau: cần nền Vật lý (điện áp, dòng, từ trường) để hiểu *vì sao*, cần Điện tử để biết *làm thế nào*.

## Triết lý

- **Cụ thể trước, trừu tượng sau**: mỗi linh kiện đi kèm số liệu thật (điện trở 220 Ω, tụ 100 µF, LED 2 V/20 mA) và ≥ 4 ví dụ tính toán.
- **Mạch hiểu được = mạch tính được**: với mỗi mạch, walk-through từng nút bằng số thật (KVL/KCL, phân áp, hằng số thời gian τ).
- **Trực giác đời thường**: dòng điện ↔ dòng nước, điện áp ↔ chênh lệch độ cao, tụ ↔ bình chứa, điện trở ↔ ống hẹp.
- **Visualization tương tác**: kéo slider thay đổi R, C, V để thấy ngay đường cong nạp/xả, điểm làm việc transistor, đáp ứng tần số bộ lọc.

## 3 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Fundamentals](./01-Fundamentals/) | 🚧 Đang xây | Ohm, Kirchhoff, phân áp, tụ/RC, cuộn cảm/RL, AC & trở kháng, bộ lọc, dụng cụ đo |
| 2 | [Semiconductors](./02-Semiconductors/) | 🚧 Đang xây | Bán dẫn P-N, diode, nguồn DC, BJT (khuếch đại & khóa), MOSFET, op-amp |
| 3 | [Digital & MCU](./03-Digital-MCU/) | 🚧 Đang xây | Cổng logic, mạch tổ hợp/tuần tự, thanh ghi/đếm, ADC/DAC, vi điều khiển, giao tiếp |

## Đích đến

Sau 24 bài: đọc và phân tích được sơ đồ mạch, tính toán mạch DC/AC cơ bản, hiểu cách diode/transistor/op-amp hoạt động, thiết kế mạch số đơn giản và lập trình vi điều khiển điều khiển cảm biến + actuator — đủ nền cho môn Kỹ thuật điện tử / Vi xử lý năm 2 đại học kỹ thuật và để tự làm dự án Arduino.

## Cách học

1. Vào `01-Fundamentals/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có `README.md` + `visualization.html` (+ `solutions.go` khi bạn yêu cầu).
3. Mở `Electronics/01-Fundamentals/index.html` để xem danh sách lesson dạng card.

## Liên kết chéo với Physics & Math

- Nền điện áp/dòng/điện trở ↔ `Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits`.
- Điện trường & điện thế (vì sao có hiệu điện thế) ↔ `Physics/02-Thermo-Electromagnetism/lesson-05-electric-field-potential`.
- Từ trường & cảm ứng (nền cuộn cảm) ↔ `Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction`.
- Mạch RC/RL/RLC giải bằng ODE bậc 1–2 ↔ `Math/06-Advanced/lesson-07`.
- Tín hiệu AC & phân tích tần số (số phức, Fourier) ↔ `Math/03-Trig-Complex/lesson-08`.
- Đại số Boolean & logic ↔ `Math/05-NumberTheory-Combinatorics-Logic` và `DataFoundations`.
</content>
</invoke>
