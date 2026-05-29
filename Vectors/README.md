# Vectors — Lộ trình toán cho AI & Machine Learning

Lộ trình **5 tầng** đi từ đại số phổ thông cơ bản nhất tới xác suất, MLE và cross-entropy — phần toán nền cho ML. Phần ứng dụng ML (linear regression, embedding, RAG, CLIP) đã được **tách ra lĩnh vực [`AI-ML/`](../AI-ML/)** ở cấp gốc.

## Triết lý

- **Tự đủ (self-contained)**: bắt đầu từ "số tự nhiên là gì", không giả định kiến thức nền nào trừ phép cộng/trừ/nhân/chia tiểu học.
- **Cụ thể trước, trừu tượng sau**: mọi cơ chế đều có ví dụ số chạy được trước khi vào công thức.
- **Trực giác trước hình thức**: giải thích "vì sao đúng / vì sao nhanh" trước khi đưa định lý.
- **Mỗi bài học có visualization tương tác** — gõ số, kéo slider, thấy ngay kết quả.
- **Code mặc định: Go** cho Tầng 1–4. Tầng 5 (`Probability`) có thể dùng Python vì ecosystem ML.

## 5 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Algebra](./01-Algebra/) | ✅ Đã có | Số, biến, phương trình, hàm số, lũy thừa/log, hệ phương trình |
| 2 | [Trigonometry](./02-Trigonometry/) | ✅ Đã có | Góc, `sin/cos/tan`, đường tròn đơn vị, ma trận xoay, RoPE preview |
| 3 | [Calculus](./03-Calculus/) | ✅ Đã có | Giới hạn, đạo hàm, chain rule, gradient, tích phân |
| 4 | [Linear Algebra](./04-LinearAlgebra/) | ✅ Đã có | Vector, ma trận, eigenvector, PCA, SVD |
| 5 | [Probability](./05-Probability/) | ✅ Đã có | Xác suất, Bayes, phân phối, MLE, cross-entropy |

Sau Tầng 5: tiếp tục sang [`AI-ML/`](../AI-ML/) (linear regression → neural net → embedding → RAG → CLIP) hoặc [`Statistics/`](../Statistics/) (suy luận thống kê, kiểm định giả thuyết).

## Cách học

1. Vào `Algebra/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có 3 file chính:
   - `README.md`: lý thuyết + ví dụ + bài tập + **lời giải chi tiết**.
   - `solutions.go`: code Go biên dịch được, minh họa từng khái niệm.
   - `visualization.html`: trang tương tác mở trực tiếp trong trình duyệt (không cần server).
3. Mở `Vectors/01-Algebra/index.html` để xem danh sách lesson kèm link nhanh.
4. Mỗi `visualization.html` có nút **📖 Đọc README** để xem lý thuyết song song.

## Quy tắc viết tài liệu

Vectors thuộc loại "toán / khoa học trừu tượng" → áp dụng đầy đủ các quy tắc chung trong `CLAUDE.md`:

- **Phân loại lĩnh vực** — Vectors là toán/khoa học trừu tượng, BẮT BUỘC callouts + `solutions.go`.
- **Callout chuẩn** (💡 / ❓ / ⚠ / 🔁 / 📝) — xem mục "Callout chuẩn cho `README.md` của bài học".
- **Lượng hóa chất lượng** (≥ 4 ví dụ, verify cả 2 vế, cấm "dễ thấy") — xem mục "Quy tắc lượng hóa".
- **Checklist trước commit** — xem mục "Checklist trước khi commit lesson mới".
- **Enrich lesson đã có** — xem mục "Quy tắc enrich lesson đã có".
- **Phong cách viết** (8 nguyên tắc) — xem mục "Phong cách viết tài liệu".

### Đặc thù Vectors

- **Đường dẫn `tools/` cho viz**: `../../../tools/` (3 cấp `../`) — vì lesson nằm tại `Vectors/<Tier>/lesson-XX-yyy/`.
- **Cross-tier linking** (đặc thù vì có 6 tầng phụ thuộc nhau):
  - Mỗi khái niệm mới phải reference khái niệm tiền đề ở tầng trước, kèm link.
  - Mỗi khái niệm phải có preview "sẽ gặp lại ở Tầng X" nếu các tầng sau dùng đến.
  - Không có khái niệm "treo" — mọi câu hỏi mở bài phải được trả lời TRONG cùng bài.
- **Ngôn ngữ code**: Go cho Tầng 1–4, có thể chuyển Python từ Tầng 5 (Probability) trở đi vì hệ sinh thái ML chủ yếu Python.

## Tại sao "Vectors" là tên gọi chung?

Vì **vector** là mạch xuyên suốt mọi tầng:

- **Algebra**: vector là một tuple số có thứ tự (Tầng 1 dạy nền tảng để hiểu "số" và "biến").
- **Trigonometry**: vector trong mặt phẳng có chiều dài và góc.
- **Calculus**: gradient là một vector (đạo hàm riêng theo từng chiều).
- **Linear Algebra**: vector là công dân hạng nhất, ma trận biến đổi vector.
- **Probability**: phân phối đa biến = vector ngẫu nhiên.
- **AI/ML**: mọi dữ liệu cuối cùng đều là vector — feature vector, embedding, gradient.

Hiểu xong 6 tầng = hiểu rõ "vector" theo nghĩa rộng nhất.
