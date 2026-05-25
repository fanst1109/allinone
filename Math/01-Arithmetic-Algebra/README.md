# Tầng 1 — Arithmetic & Algebra (Số học & Đại số sơ cấp)

Nền tuyệt đối: không giả định gì ngoài 4 phép tính tiểu học. Sau tầng này, bạn đọc được mọi công thức ở các tầng sau mà không phải tra "x mũ -1 là gì" hay "log có quy luật gì".

## Mục tiêu tổng quát

- Phân biệt ℕ, ℤ, ℚ, ℝ — biết khi nào dùng cái nào và vì sao máy tính chỉ xấp xỉ ℝ.
- Thao tác biểu thức đại số: cộng/trừ/nhân/chia đa thức, khai triển, phân tích.
- Giải thành thạo phương trình bậc 1, bậc 2, hệ bậc 1, bất phương trình.
- Nắm vững lũy thừa, căn, logarit — đặc biệt logarit (gặp lại trong loss/entropy).
- Hiểu hàm số: input → output, đồ thị, hàm bậc 1, bậc 2, mũ, log.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-number-systems/) | Hệ số học | ℕ → ℤ → ℚ → ℝ, vì sao mở rộng, tính chất từng tập |
| [Lesson 02](./lesson-02-algebraic-expressions/) | Biểu thức đại số | Biến, đa thức, cộng/nhân/chia, khai triển, phân tích |
| [Lesson 03](./lesson-03-linear-equations/) | Phương trình bậc 1 | Quy tắc chuyển vế, hệ bậc 1 hai ẩn, thế/cộng |
| [Lesson 04](./lesson-04-quadratic-equations/) | Phương trình bậc 2 | Công thức nghiệm, biệt thức, định lý Viete |
| [Lesson 05](./lesson-05-inequalities/) | Bất phương trình | Bậc 1, bậc 2, dấu tam thức, miền nghiệm |
| [Lesson 06](./lesson-06-powers-roots-logs/) | Lũy thừa, căn, log | `a^n`, `√a`, `log_b(x)`, quy luật biến đổi |
| [Lesson 07](./lesson-07-functions-intro/) | Hàm số | Định nghĩa, đồ thị, tập xác định, hàm hợp |
| [Lesson 08](./lesson-08-elementary-functions/) | Hàm sơ cấp | Khảo sát hàm bậc 1, 2, mũ, log |

Mỗi bài có:
- **README.md**: lý thuyết + ≥ 4 ví dụ số + bài tập + **lời giải chi tiết**.
- **visualization.html**: trang tương tác, mở `file://` chạy được, có nút 📖 Đọc README.
- **solutions.go** (sau khi user yêu cầu): code Go biên dịch được.

## Mở trang chủ tầng

[`index.html`](./index.html) — danh sách card cho cả 8 bài.

## Sau tầng này

Sang **Tầng 2 — Geometry** để học hình học Euclid + hình học giải tích — nền cho phép biến hình và vector.
