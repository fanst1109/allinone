# Tầng 1 — Algebra (Đại số phổ thông)

Nền tảng ký hiệu và tư duy biến đổi. Sau tầng này, bạn đọc được mọi công thức ở các tầng sau mà không phải tra cứu lại "x mũ -1 nghĩa là gì" hay "log có quy luật gì".

## Mục tiêu tổng quát

- Phân biệt các loại số (tự nhiên, nguyên, hữu tỉ, vô tỉ, thực) và biết khi nào dùng cái nào.
- Sử dụng thành thạo biến, biểu thức và các phép biến đổi đại số.
- Giải phương trình bậc 1 và hệ phương trình tuyến tính.
- Hiểu và vận dụng được lũy thừa, căn, logarit — đặc biệt là `log` (sẽ gặp lại trong loss function, entropy).
- Nắm khái niệm hàm số, biết đọc đồ thị, hiểu hàm bậc 1, bậc 2, hàm mũ, hàm log.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-numbers/) | Số và trục số | ℕ, ℤ, ℚ, ℝ; thứ tự; giá trị tuyệt đối |
| [Lesson 02](./lesson-02-variables-expressions/) | Biến và biểu thức | Thay số, đơn giản hóa, khai triển/phân tích |
| [Lesson 03](./lesson-03-linear-equations/) | Phương trình bậc 1 | Quy tắc chuyển vế, một ẩn, ứng dụng |
| [Lesson 04](./lesson-04-powers-roots-logs/) | Lũy thừa, căn, logarit | `a^n`, `√a`, `log_b(x)`, quy luật |
| [Lesson 05](./lesson-05-functions/) | Hàm số là gì | Định nghĩa, đồ thị, domain/range, hàm hợp |
| [Lesson 06](./lesson-06-linear-quadratic/) | Hàm bậc 1 và bậc 2 | Đường thẳng, parabol, hệ số góc, đỉnh |
| [Lesson 07](./lesson-07-exp-log-functions/) | Hàm mũ và hàm log | `e^x`, `ln x`, tăng trưởng, log scale |
| [Lesson 08](./lesson-08-linear-systems/) | Hệ phương trình tuyến tính | 2-3 ẩn, khử Gauss, ý nghĩa hình học |

Mỗi bài có:
- **README.md**: lý thuyết + ví dụ số cụ thể + bài tập + **lời giải chi tiết**.
- **solutions.go**: code Go biên dịch được (`go run solutions.go`).
- **visualization.html**: trang tương tác, mở trực tiếp trong trình duyệt là chạy. Có nút **📖 Đọc README** để xem lý thuyết song song.

## Mở trang chủ tầng

[`index.html`](./index.html) — danh sách card cho cả 8 bài, có link nhanh tới visualization và README.

## Sau khi xong tầng này

Sang **Tầng 2 — Trigonometry** (sắp ra) để học góc, `sin/cos/tan`, đường tròn đơn vị và ma trận xoay — nền cho cosine similarity và computer graphics ở các tầng sau.
