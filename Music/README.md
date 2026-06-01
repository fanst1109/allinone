# Music — Lý thuyết âm nhạc

Lộ trình lý thuyết âm nhạc (music theory) từ vật lý của âm thanh tới hòa âm và sáng tác. **3 tầng × 8 bài = 24 bài**, đi từ cao độ và nốt nhạc, qua hệ thống gam và hòa âm, tới âm sắc, hình thức và sáng tác cơ bản.

> Mục tiêu: hiểu *vì sao* âm nhạc hoạt động — vì sao quãng 5 nghe "thuận", vì sao gam trưởng vui, vì sao 12 nốt — chứ không chỉ học thuộc luật. Mọi khái niệm gắn với tần số, tỷ lệ và bàn phím piano cụ thể.

## Triết lý

- **Nghe được, không chỉ đọc được**: mỗi cao độ, quãng, hợp âm đều có nút phát âm thanh ngay trong `visualization.html` (Web Audio API), để tai xác nhận điều mắt đọc.
- **Cụ thể trước, trừu tượng sau**: trước "quãng 5 đúng", cho nghe C–G và chỉ ra tỷ lệ tần số 3:2; trước "gam trưởng", gõ từng nửa cung trên piano.
- **Toán đi đôi âm nhạc**: cao độ là hàm mũ của tần số (`f = 440·2^(n/12)`), quãng là tỷ lệ, cents là logarit — link sang `Math/` và `Physics/` ở mọi chỗ cần.
- **Visualization tương tác**: bàn phím piano bấm được, khuông nhạc động, vòng quãng 5 xoay được, dựng hợp âm bằng cách click.

## 3 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Fundamentals](./01-Fundamentals/) | 🚧 Khung | Cao độ & tần số, tên nốt & bàn phím, khuông nhạc, quãng, gam trưởng/thứ & mode, nhịp & tiết tấu, bộ khóa & vòng quãng 5 |
| 2 | [Harmony](./02-Harmony/) | 🚧 Khung | Hợp âm ba & bảy, hợp âm theo bậc, tiến trình & kết, đảo hợp âm & dẫn giọng, chuyển điệu, hòa âm mở rộng, phân tích chức năng |
| 3 | [Applied & Composition](./03-Applied-Composition/) | 🚧 Khung | Âm sắc & chuỗi bội âm, hệ điều âm & tuning, giai điệu & motif, tiết tấu nâng cao, hình thức bài nhạc, đối âm, jazz & blues, capstone sáng tác |

🚧 Khung = đã có folder + bảng lesson (lộ trình), chưa có nội dung từng lesson.

## Đích đến

Sau 24 bài: đọc được khuông nhạc cơ bản, phân tích được hòa âm của một bài pop/folk bằng số La Mã (Roman numerals), hiểu vì sao một tiến trình hợp âm "kéo về chủ âm", và dựng được một đoạn giai điệu + đệm hợp âm 8 ô nhịp. Đủ nền để học tiếp hòa âm cổ điển, jazz, hoặc sản xuất nhạc số.

## Cách học

1. Vào `01-Fundamentals/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có `README.md` + `visualization.html` (+ `solutions.go` khi user yêu cầu — hiếm, vì âm nhạc minh họa tốt nhất bằng audio tương tác).
3. Mở `Music/01-Fundamentals/index.html` để xem danh sách lesson dạng card.
4. **Bật loa**: phần lớn giá trị của lĩnh vực này nằm ở việc *nghe* — viz có nút phát âm cho từng nốt, quãng, hợp âm.

## Phân loại & quy ước áp dụng

Music thuộc nhóm **toán/khoa học trừu tượng** (có cấu trúc hình thức, công thức tần số, tỷ lệ): áp dụng đầy đủ callout 💡/❓/⚠/🔁/📝, mỗi định nghĩa ≥ 4 ví dụ số cụ thể, `visualization.html` luôn có. `solutions.go` chỉ tạo khi user yêu cầu.

## Liên kết chéo

- **Cao độ = sóng âm**: tần số, dao động, sóng dừng → `Physics/01-Mechanics/lesson-08` (dao động & sóng cơ).
- **Âm sắc = tổng các bội âm**: chuỗi harmonic, Fourier → `Physics/01-Mechanics/lesson-08` + `Math/03-Trig-Complex/lesson-08`.
- **Công thức cao độ `f = 440·2^(n/12)`**: hàm mũ, lũy thừa hữu tỷ → `Math/01-Arithmetic-Algebra`.
- **Cents `= 1200·log₂(f₂/f₁)`**: logarit → `Math/01-Arithmetic-Algebra` (logarit).
- **Quãng thuần = tỷ lệ số nguyên đơn giản** (8ve 2:1, quãng 5 đúng 3:2, quãng 4 đúng 4:3): phân số & tỷ lệ → `Math/01-Arithmetic-Algebra`.
- **Số chỉ nhịp & trường độ**: phân số → `Math/01-Arithmetic-Algebra`.
