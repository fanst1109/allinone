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

## Quy tắc viết tài liệu — áp dụng cho MỌI tầng Vectors

Mọi lesson trong mọi tầng phải tuân thủ các quy tắc dưới đây, dù là tầng 1 (Algebra) hay tầng 6 (AI/ML). Mục tiêu: **đọc một lần là hiểu, không phải hỏi lại**.

### 1. Cấu trúc callout bắt buộc

Mỗi mục lớn (`## N. ...`) trong `README.md` phải có các block sau ở những chỗ phù hợp:

| Callout | Khi nào dùng | Vị trí |
|---------|--------------|--------|
| **💡 Trực giác / Hình dung** | Trước MỌI định nghĩa hình thức | Mở đầu mục con |
| **❓ Câu hỏi tự nhiên của người đọc** | Sau các phần khó, anticipate ≥ 2-3 câu hỏi mà người mới sẽ thắc mắc | Giữa hoặc cuối mục con |
| **⚠ Lỗi thường gặp** | Ở mọi chỗ có sai lầm phổ thông, kèm ví dụ phản chứng | Sau quy tắc/công thức |
| **🔁 Dừng lại tự kiểm tra** | Sau mỗi mục con quan trọng, 1-2 câu hỏi + đáp án `<details>` | Cuối mục con |
| **📝 Tóm tắt mục N** | Cuối mỗi mục lớn, 3-5 điểm chốt dạng bullet | Cuối mục lớn |

### 2. Quy tắc về ví dụ và walk-through

- **Mỗi định nghĩa mới phải có ≥ 4 ví dụ số cụ thể** (không phải 1-2). Ví dụ phải đa dạng: dương/âm, nguyên/phân số, edge case.
- **Mỗi công thức phải có walk-through bằng số thật**, verify cả 2 vế. Vd thay vì viết "`a^m · a^n = a^(m+n)`", phải thêm: "`2^3 · 2^4 = 8 · 16 = 128`, và `2^(3+4) = 2^7 = 128` ✓".
- **Mọi chứng minh viết RÕ TỪNG BƯỚC**. Cấm dùng "dễ thấy", "rõ ràng", "tương tự". Bước nào lươn lẹo = không đạt.
- **Toy example phải kèm cảnh báo và phiên bản thật**. Nếu dùng version đơn giản hóa (vd `hash = sum mod m`), phải nêu hạn chế và link tới version production-grade.

### 3. Quy tắc về cấu trúc lesson

Mỗi lesson trong mọi tầng có 3 file chính:

- **`README.md`**: lý thuyết + ví dụ + bài tập + **lời giải chi tiết đầy đủ**.
   - Mọi bài tập đều phải có lời giải step-by-step. Không để bài tập "treo".
   - Kết thúc bằng link tới lesson tiếp theo / tham khảo.
- **`solutions.go`** (hoặc `.py` cho Tầng 5+): code biên dịch được, có hàm `main` minh họa, comment tiếng Việt.
- **`visualization.html`**: standalone, mở file:// trực tiếp là chạy.
   - Bắt buộc load `tools/viz-base.css` đầu `<head>`.
   - Bắt buộc nav strip `<nav class="viz-nav">` với 🏠 + prev + current + next.
   - Bắt buộc tích hợp readme-modal: 3 script `marked.min.js` + `README.data.js` + `readme-modal.js` cuối `<body>`.
   - Đường dẫn tools: `../../../tools/` (vì lesson nằm 3 cấp dưới root: `Vectors/<Tier>/lesson-XX-yyy/`).

### 4. Quy tắc về liên kết giữa các tầng

- **Mỗi khái niệm mới phải reference lại khái niệm tiền đề** ở tầng trước, kèm link. Vd Tầng 3 (Calculus) khi nhắc "đạo hàm là slope của tiếp tuyến" → link sang Tầng 1 Lesson 06 (hàm bậc 1, slope).
- **Mỗi khái niệm phải có "preview" tầng sau khi dùng đến nó**. Vd Tầng 1 Lesson 04 (log) phải nói: "Sẽ gặp lại ở Tầng 5 (cross-entropy) và Tầng 6 (logistic regression)".
- Không có khái niệm "treo" — mọi câu hỏi mở bài phải được trả lời TRONG cùng bài.

### 5. Quy tắc về phong cách viết

Trích từ `CLAUDE.md` mục "Phong cách viết tài liệu — hiểu được ngay lần đọc đầu" (cuối file, đọc lại để chi tiết):

1. **Vấn đề đặt ra → giải đáp ngay trong cùng bài**, không treo.
2. **Cơ chế quan trọng = walk-through bằng số**, không chỉ công thức.
3. **Trực giác trước hình thức**: analogy đời sống trước định lý.
4. **Toy example phải nói rõ là toy + chỉ ra hạn chế**.
5. **Lường trước câu hỏi tự nhiên của người đọc** rồi trả lời sẵn.
6. **Cụ thể trước, trừu tượng sau**: ví dụ chạy được trước, tổng quát hóa sau.
7. **Đọc lại bằng góc nhìn người mới**: tự hỏi "nếu chưa biết khái niệm này, đoạn này có cần dừng lại suy nghĩ không?". Có → viết lại cụ thể hơn.
8. **Mỗi mục con đứng được một mình**: không giả định reader đã đọc kỹ các mục khác.

### 6. Khi tạo lesson mới — checklist

Trước khi commit một lesson mới (hoặc cập nhật), kiểm tra:

- [ ] Có đủ 3 file: `README.md`, `solutions.go` (hoặc `.py`), `visualization.html`.
- [ ] Mỗi mục lớn có ≥ 1 callout 💡, ❓, ⚠, 🔁, 📝.
- [ ] Mỗi định nghĩa có ≥ 4 ví dụ số.
- [ ] Mọi bài tập có lời giải chi tiết.
- [ ] Mọi chứng minh có từng bước rõ.
- [ ] Code biên dịch / chạy được (`go run solutions.go`).
- [ ] Viz có nav strip + readme-modal + đường dẫn `../../../tools/`.
- [ ] Đã chạy `go run tools/build-readme-data.go Vectors/<Tier>/lesson-XX-yyy` để sinh `README.data.js`.
- [ ] Cập nhật `Vectors/<Tier>/README.md` và `Vectors/<Tier>/index.html` (thêm card lesson mới + nav prev/next của lesson liền kề).

### 7. Áp dụng ngược cho các lesson đã có

Khi enrich lesson đã tồn tại:

- **KHÔNG XÓA** nội dung hiện có, chỉ THÊM.
- **KHÔNG SỬA** heading lớn (`#`, `##`) — chỉ thêm sub-section (`###`, `####`).
- **KHÔNG ĐỘNG** `solutions.go` và `visualization.html` (chúng đã ổn).
- **PHẢI CHẠY** `go run tools/build-readme-data.go Vectors` sau khi sửa README để regen `README.data.js`.

---

## Tại sao "Vectors" là tên gọi chung?

Vì **vector** là mạch xuyên suốt mọi tầng:

- **Algebra**: vector là một tuple số có thứ tự (Tầng 1 dạy nền tảng để hiểu "số" và "biến").
- **Trigonometry**: vector trong mặt phẳng có chiều dài và góc.
- **Calculus**: gradient là một vector (đạo hàm riêng theo từng chiều).
- **Linear Algebra**: vector là công dân hạng nhất, ma trận biến đổi vector.
- **Probability**: phân phối đa biến = vector ngẫu nhiên.
- **AI/ML**: mọi dữ liệu cuối cùng đều là vector — feature vector, embedding, gradient.

Hiểu xong 6 tầng = hiểu rõ "vector" theo nghĩa rộng nhất.
