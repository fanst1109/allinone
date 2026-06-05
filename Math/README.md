# Math — Toán học cổ điển

Lộ trình toán học **đầy đủ và độc lập**, đi từ số học tiểu học tới toán năm 1 đại học. Mỗi tầng (tier) là một khối kiến thức truyền thống, sắp xếp theo trình tự giáo trình thay vì theo "minimal path tới ML" như `Vectors/`.

## Triết lý

- **Tự đủ (self-contained)**: bắt đầu từ "số tự nhiên là gì", không giả định kiến thức nền nào trừ phép cộng/trừ/nhân/chia tiểu học.
- **Cụ thể trước, trừu tượng sau**: mọi định nghĩa và công thức có ≥ 4 ví dụ số cụ thể trước khi tổng quát hóa.
- **Trực giác trước hình thức**: giải thích "vì sao đúng" bằng analogy/hình dung trước khi đưa định lý.
- **Chứng minh đầy đủ**: cấm dùng "dễ thấy", "rõ ràng", "tương tự" — mọi bước phải viết rõ.
- **Mỗi bài có visualization tương tác** — kéo slider, gõ số, thấy ngay đồ thị/biến đổi.
- **Code mặc định: Go** — sẽ thêm khi user yêu cầu.

## Math khác Vectors thế nào?

| | Vectors | Math |
|---|---|---|
| **Đích** | Hiểu embedding/RAG/CLIP | Hoàn thành toán THPT VN + năm 1 đại học kỹ thuật |
| **Trình tự** | Tối thiểu cần cho ML | Theo giáo trình truyền thống |
| **Hình học** | Bỏ qua | Tier 2 đầy đủ (Euclid + giải tích) |
| **Lượng giác** | Lướt — chỉ phần dùng RoPE | Tier riêng + biến đổi đầy đủ |
| **Calculus** | 1 tier, dừng ở gradient descent | 1 tier 1-biến + nửa tier nhiều biến (T6) |
| **Chứng minh** | Không động | Tier 5 có hẳn mục logic & phương pháp chứng minh |
| **Số phức, ODE** | Không có | Có (T3, T6) |

Hai track có thể đọc song song — Math có link chéo sang Vectors ở những chỗ trùng concept (để bạn so 2 góc nhìn).

## 7 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Arithmetic & Algebra](./01-Arithmetic-Algebra/) | 🚧 Khung | Số, biểu thức, phương trình, bất phương trình, lũy thừa/log, hàm số sơ cấp |
| 2 | [Geometry](./02-Geometry/) | 🚧 Khung | Hình học phẳng, không gian, tọa độ, phép biến hình |
| 3 | [Trig & Complex](./03-Trig-Complex/) | 🚧 Khung | Lượng giác đầy đủ, số phức, công thức Euler, De Moivre |
| 4 | [Calculus 1-var](./04-Calculus-1var/) | 🚧 Khung | Giới hạn, đạo hàm, ứng dụng, tích phân (1 biến) |
| 5 | [Number Theory, Combinatorics, Logic](./05-NumberTheory-Combinatorics-Logic/) | 🚧 Khung | Chia hết, đồng dư, tổ hợp, quy nạp, chứng minh |
| 6 | [Advanced (Freshman)](./06-Advanced/) | 🚧 Khung | Linear algebra, multivar calculus, ODE, chuỗi, xác suất nền |
| 7 | [Mathematical Modeling](./07-Mathematical-Modeling/) | ✅ Đầy đủ | Chu trình mô hình hóa, thứ nguyên, hồi quy, mô hình rời rạc/liên tục/ngẫu nhiên, tối ưu |

🚧 Khung = đã có cấu trúc folder + bảng lesson, chưa có nội dung từng lesson. Tầng 7 đã hoàn chỉnh cả 8 lesson (README + visualization).

## Cách học

1. Vào `01-Arithmetic-Algebra/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có 2 file chính:
   - `README.md`: lý thuyết + ví dụ + bài tập + **lời giải chi tiết**.
   - `visualization.html`: trang tương tác mở trực tiếp trong trình duyệt.
   - `solutions.go` (sau khi user yêu cầu): code Go biên dịch được, minh họa.
3. Mở `Math/01-Arithmetic-Algebra/index.html` để xem danh sách lesson dạng card.
4. Mỗi `visualization.html` có nút **📖 Đọc README** để xem lý thuyết song song.

## Quy tắc viết tài liệu

Math thuộc loại "toán / khoa học trừu tượng" → áp dụng đầy đủ quy tắc trong `CLAUDE.md`:

- **Callouts** (💡 / ❓ / ⚠ / 🔁 / 📝) bắt buộc.
- **Lượng hóa chất lượng**: ≥ 4 ví dụ số, verify cả 2 vế, cấm "dễ thấy".
- **Visualization** luôn tạo, mở `file://` chạy được.

## Liên kết chéo với các lĩnh vực khác

- **Math/T1, T4** ↔ Vectors/01-Algebra, 03-Calculus (cùng concept, góc nhìn khác)
- **Math/T2-L08, T6-L01-03** ↔ Vectors/04-LinearAlgebra
- **Math/T3-L01,02** ↔ Vectors/02-Trigonometry
- **Math/T5-L02** → DataStructures (hashing dùng modular arithmetic)
- **Math/T6-L07 (ODE)** ↔ Physics/01-Mechanics (dao động)
- **Math/T6-L08** ↔ Vectors/05-Probability
- **Math/T7 (Modeling)** áp dụng T4/T6 vào bài toán thực → Physics, Economics, Biology, AI-ML
