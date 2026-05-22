# Vectors — Lộ trình toán cho AI & Machine Learning

Lộ trình **6 tầng** đi từ đại số phổ thông cơ bản nhất tới embedding, vector database và RAG. Mọi thứ học ở các tầng trước sẽ được **gọi lại** ở tầng sau, không có khái niệm "treo".

## Triết lý

- **Tự đủ (self-contained)**: bắt đầu từ "số tự nhiên là gì", không giả định kiến thức nền nào trừ phép cộng/trừ/nhân/chia tiểu học.
- **Cụ thể trước, trừu tượng sau**: mọi cơ chế đều có ví dụ số chạy được trước khi vào công thức.
- **Trực giác trước hình thức**: giải thích "vì sao đúng / vì sao nhanh" trước khi đưa định lý.
- **Mỗi bài học có visualization tương tác** — gõ số, kéo slider, thấy ngay kết quả.
- **Code mặc định: Go** cho Tầng 1–4. Từ Tầng 5 trở đi (`Probability`, `AI-ML`) có thể chuyển Python vì hệ sinh thái ML chủ yếu Python.

## 6 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Algebra](./Algebra/) | ✅ Đã có | Số, biến, phương trình, hàm số, lũy thừa/log, hệ phương trình |
| 2 | Trigonometry | ⏳ Chưa | Góc, `sin/cos/tan`, đường tròn đơn vị, ma trận xoay |
| 3 | Calculus | ⏳ Chưa | Giới hạn, đạo hàm, chain rule, gradient, tích phân |
| 4 | Linear Algebra | ⏳ Chưa | Vector, ma trận, eigenvector, PCA, SVD |
| 5 | Probability | ⏳ Chưa | Xác suất, Bayes, phân phối, MLE, cross-entropy |
| 6 | AI/ML | ⏳ Chưa | Linear regression → embedding → RAG → CLIP |

## Cách học

1. Vào `Algebra/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có 3 file chính:
   - `README.md`: lý thuyết + ví dụ + bài tập + **lời giải chi tiết**.
   - `solutions.go`: code Go biên dịch được, minh họa từng khái niệm.
   - `visualization.html`: trang tương tác mở trực tiếp trong trình duyệt (không cần server).
3. Mở `Vectors/Algebra/index.html` để xem danh sách lesson kèm link nhanh.
4. Mỗi `visualization.html` có nút **📖 Đọc README** để xem lý thuyết song song.

## Tại sao "Vectors" là tên gọi chung?

Vì **vector** là mạch xuyên suốt mọi tầng:

- **Algebra**: vector là một tuple số có thứ tự (Tầng 1 dạy nền tảng để hiểu "số" và "biến").
- **Trigonometry**: vector trong mặt phẳng có chiều dài và góc.
- **Calculus**: gradient là một vector (đạo hàm riêng theo từng chiều).
- **Linear Algebra**: vector là công dân hạng nhất, ma trận biến đổi vector.
- **Probability**: phân phối đa biến = vector ngẫu nhiên.
- **AI/ML**: mọi dữ liệu cuối cùng đều là vector — feature vector, embedding, gradient.

Hiểu xong 6 tầng = hiểu rõ "vector" theo nghĩa rộng nhất.
