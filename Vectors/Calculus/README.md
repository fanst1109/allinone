# Tầng 3 — Calculus (Giải tích)

Mở rộng từ "đại số" (Tầng 1) và "lượng giác" (Tầng 2) sang **giải tích** — toán học của sự thay đổi. Tầng này dạy bạn:
- **Đạo hàm** — đo "tốc độ thay đổi" của hàm số.
- **Gradient** — vector đạo hàm theo nhiều chiều, nền của **gradient descent** và **backpropagation**.
- **Chain rule** — quy tắc duy nhất giúp huấn luyện được mạng neural sâu.
- **Tích phân** — diện tích dưới đường cong, nền của **xác suất liên tục** ở Tầng 5.

## Mục tiêu tổng quát

- Hiểu giới hạn ở mức trực giác lẫn ε-δ (nhẹ).
- Tính được đạo hàm cho mọi hàm sơ cấp gặp trong ML (polynomial, exp, log, trig, composition).
- Áp dụng **chain rule** vững — biết tại sao backprop chính là chain rule lặp đi lặp lại.
- Đọc và viết được gradient `∇f` của hàm nhiều biến.
- Implement được gradient descent đơn giản bằng Go.
- Hiểu tích phân là gì và tại sao nó xuất hiện trong xác suất.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-limits/) | Giới hạn | Định nghĩa "tiến gần", limit dạng 0/0, lim đặc biệt |
| [Lesson 02](./lesson-02-derivatives/) | Đạo hàm 1 biến | Định nghĩa qua giới hạn, slope tiếp tuyến |
| [Lesson 03](./lesson-03-derivative-rules/) | Quy tắc đạo hàm | Tổng, tích, thương; đạo hàm sơ cấp |
| [Lesson 04](./lesson-04-chain-rule/) | Chain rule | **Chìa khóa của backpropagation** |
| [Lesson 05](./lesson-05-optimization-1d/) | Cực trị 1 biến | f'(x)=0, max/min, ứng dụng |
| [Lesson 06](./lesson-06-partial-gradient/) | Đạo hàm riêng + gradient | ∂f/∂x, ∇f là vector |
| [Lesson 07](./lesson-07-gradient-descent/) | Gradient descent | Thuật toán đi ngược gradient |
| [Lesson 08](./lesson-08-integrals/) | Tích phân | Diện tích, ứng dụng xác suất liên tục |

## Trang chính của tầng

[`index.html`](./index.html) — danh sách card cho 8 bài.

## Kiến thức tiền đề

- [Tầng 1 — Algebra](../Algebra/): hàm số (Lesson 05), hàm bậc 2 (Lesson 06), hàm mũ và log (Lesson 07).
- [Tầng 2 — Trigonometry](../Trigonometry/): sin/cos để học đạo hàm của chúng.

## Sau khi xong tầng này

Sang **Tầng 4 — Linear Algebra** để học vector và ma trận chính thức — bạn sẽ gặp lại "gradient là vector" với toàn bộ machinery của linear algebra.
