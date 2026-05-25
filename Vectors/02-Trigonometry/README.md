# Tầng 2 — Trigonometry (Lượng giác)

Mở rộng tư duy số sang **hình học và sóng**. Tầng này dạy bạn cách "đo góc bằng số" — nền cho:
- **Cosine similarity** (Tầng 4 và 6): đo độ giống nhau của 2 vector bằng góc giữa chúng.
- **Rotation matrix** (Tầng 4): biến đổi vector trong không gian, nền của computer graphics và **RoPE** (Rotary Position Embedding trong LLM).
- **Sóng & Fourier** (Tầng 4-5): mọi tín hiệu (âm thanh, ảnh) đều phân tích được thành tổng sin/cos.

## Mục tiêu tổng quát

- Thông thạo 2 đơn vị đo góc (độ và radian) — biết khi nào dùng cái nào.
- Hiểu `sin/cos/tan` ở 3 cấp độ: tỉ số cạnh tam giác vuông → tọa độ trên đường tròn đơn vị → hàm số tuần hoàn.
- Nắm các identity quan trọng (Pythagoras, công thức cộng, nhân đôi) và biết khi nào dùng.
- Định lý cosin — tổng quát của Pythagoras, là cầu nối tới **dot product** và **cosine similarity** ở các tầng sau.
- Ma trận xoay 2D/3D — hiểu cách quay vector bằng số, và vì sao RoPE trong LLM "xoay" embedding theo vị trí.

## Lộ trình 6 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-angles/) | Góc: độ và radian | Đơn vị đo góc, chuyển đổi, vì sao toán/ML dùng radian |
| [Lesson 02](./lesson-02-right-triangle/) | Tam giác vuông: sin/cos/tan | SOH-CAH-TOA, giá trị đặc biệt, Pythagorean identity |
| [Lesson 03](./lesson-03-unit-circle/) | Đường tròn đơn vị | Mở rộng sin/cos cho mọi góc, quadrant, công thức quy gọn |
| [Lesson 04](./lesson-04-trig-graphs/) | Đồ thị hàm lượng giác | Sóng, biên độ, chu kỳ, pha, dịch dọc; preview Fourier |
| [Lesson 05](./lesson-05-identities-cosine-law/) | Identity và định lý cosin | Công thức cộng, nhân đôi, định lý cosin, **preview cosine similarity** |
| [Lesson 06](./lesson-06-rotation-matrix/) | Ma trận xoay 2D/3D | R(θ), tính chất, **RoPE** trong LLM, computer graphics |

Mỗi bài có:
- **README.md**: lý thuyết + ví dụ + bài tập + **lời giải chi tiết**.
- **solutions.go**: code Go biên dịch được (`go run solutions.go`).
- **visualization.html**: trang tương tác, mở trực tiếp trong trình duyệt là chạy. Có nút **📖 Đọc README**.

## Trang chính của tầng

[`index.html`](./index.html) — danh sách card cho 6 bài.

## Kiến thức tiền đề

- Đã học xong [Tầng 1 — Algebra](../01-Algebra/), đặc biệt:
  - Lesson 04 (lũy thừa, căn, log) — sẽ dùng lại `√` nhiều.
  - Lesson 05 (hàm số) — `sin/cos/tan` là các hàm số.
  - Lesson 06 (hàm bậc 2, parabol) — đồ thị sóng sin nhìn cũng "cong cong" tương tự.

## Sau khi xong tầng này

Sang **Tầng 3 — Calculus** (sắp ra) để học đạo hàm — sẽ thấy đạo hàm của `sin x` là `cos x` (và đây là lý do sâu xa vì sao toán dùng radian).
