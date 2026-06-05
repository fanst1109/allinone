# Tầng 7 — Mô hình hóa toán học (Mathematical Modeling)

Tầng **ứng dụng** khép lại track Math. Sáu tầng trước xây *công cụ* (đại số, giải tích, ODE, xác suất); tầng này dạy *dùng* chúng: biến một câu hỏi thực tế ("bao lâu cà phê nguội?", "dịch bệnh lan thế nào?", "trộn hàng sao cho lời nhất?") thành một bài toán toán học, giải, rồi đối chiếu lại với thực tế.

## Triết lý riêng của tầng này

- **Mô hình ≠ thực tế**. Mọi mô hình đều sai ở mức độ nào đó; câu hỏi đúng là "đủ tốt cho mục đích gì?". Ta luôn nêu rõ **giả định** và **hạn chế**.
- **Đi hết chu trình**. Không dừng ở "lập được phương trình" — phải **giải**, **kiểm chứng** bằng số/dữ liệu, rồi **tinh chỉnh**.
- **Cụ thể trước**: mỗi loại mô hình mở đầu bằng một bài toán đời sống có số liệu thật, rồi mới tổng quát hóa.
- **Tự đủ về công cụ**: mỗi lesson nhắc lại (và link tới) đúng phần toán nền cần dùng — không bắt đọc lại cả tầng.

## Tầng này khác gì T4/T6?

| | T4 Calculus / T6 ODE | T7 Modeling |
|---|---|---|
| **Trọng tâm** | *Kỹ thuật* giải (đạo hàm, tích phân, giải ODE) | *Chọn & dựng* mô hình cho bài toán thực |
| **Xuất phát** | "Cho phương trình này, giải đi" | "Cho hiện tượng này, lập phương trình đi" |
| **Kiểm chứng** | Thử lại nghiệm | Đối chiếu dữ liệu, ước lượng sai số, tinh chỉnh giả định |
| **Phạm vi công cụ** | 1 mảng (vd ODE) | Phối hợp: hồi quy + sai phân + ODE + tối ưu + ngẫu nhiên |

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-modeling-cycle/) | Chu trình mô hình hóa | Mô hình là gì, chu trình 6 bước, giả định, **phân tích thứ nguyên** |
| [Lesson 02](./lesson-02-empirical-curve-fitting/) | Mô hình từ dữ liệu | Nội suy, hồi quy bình phương tối thiểu (least squares), R² |
| [Lesson 03](./lesson-03-discrete-dynamical/) | Mô hình rời rạc | Phương trình sai phân, lãi kép, dân số rời rạc, điểm cân bằng |
| [Lesson 04](./lesson-04-continuous-ode-models/) | Mô hình liên tục (ODE) | Tăng trưởng mũ/logistic, nguội Newton, bể trộn |
| [Lesson 05](./lesson-05-interacting-systems/) | Hệ tương tác | Thú–mồi (Lotka–Volterra), dịch bệnh SIR, hệ ODE |
| [Lesson 06](./lesson-06-optimization-models/) | Mô hình tối ưu | Quy hoạch tuyến tính (LP), tối ưu có ràng buộc (Lagrange) |
| [Lesson 07](./lesson-07-stochastic-monte-carlo/) | Mô hình ngẫu nhiên | Mô phỏng Monte Carlo, xích Markov |
| [Lesson 08](./lesson-08-capstone-modeling-project/) | Capstone | Một bài toán thực đi trọn chu trình end-to-end |

🚧 **Trạng thái**: Lesson 01 đã có nội dung đầy đủ. Lesson 02–08 đang ở dạng khung (folder + README mục tiêu), sẽ bổ sung nội dung dần.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../04-Calculus-1var/) (đạo hàm, tích phân) — cho mô hình liên tục.
- [T6 — Advanced](../06-Advanced/), đặc biệt [L07 ODE](../06-Advanced/lesson-07-differential-equations/) và [L08 Xác suất](../06-Advanced/lesson-08-probability-statistics/).
- Đại số tuyến tính cơ bản ([T6 L01–02](../06-Advanced/)) — cho hồi quy và LP.

## Cách học

1. Bắt đầu từ [Lesson 01](./lesson-01-modeling-cycle/): nắm **chu trình** và **phân tích thứ nguyên** — khung tư duy dùng cho mọi bài sau.
2. Mỗi lesson có `README.md` (lý thuyết + bài tập + lời giải) và `visualization.html` (tương tác).
3. Mở `Math/07-Mathematical-Modeling/index.html` để xem danh sách dạng card.

## Quy tắc viết tài liệu

Thuộc loại "toán / khoa học trừu tượng" → áp dụng đầy đủ quy tắc trong `CLAUDE.md`: callouts (💡 / ❓ / ⚠ / 🔁 / 📝) bắt buộc, ≥ 4 ví dụ số mỗi định nghĩa, mọi bài tập có lời giải chi tiết, visualization luôn mở `file://` chạy được.

## Liên kết chéo

- L02 (hồi quy) ↔ [Vectors/05-Probability](../../Vectors/) và [Statistics](../../Statistics/).
- L04–L05 (ODE, hệ) ↔ [T6 L07](../06-Advanced/lesson-07-differential-equations/), [Physics](../../Physics/), [Biology — quần thể](../../Biology/).
- L05 (SIR) ↔ dịch tễ học; L06 (LP) ↔ [Economics](../../Economics/).
- L07 (Monte Carlo, Markov) ↔ [T6 L08](../06-Advanced/lesson-08-probability-statistics/), [AI-ML](../../AI-ML/).

## Sau tầng này

Math hoàn tất cả 7 tầng. Bạn đã có đủ cả *công cụ* (T1–T6) lẫn *cách dùng công cụ* (T7) để bước vào các môn chuyên ngành: Physics, Economics, AI-ML, kỹ thuật.
