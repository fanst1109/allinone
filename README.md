# Claude All-in-One — Kho học thuật

Đây là repository tổng hợp các dự án học thuật cá nhân. Mỗi thư mục con là một lĩnh vực hoặc môn học riêng (ví dụ: `Java` cho ngôn ngữ lập trình Java, `English` cho tiếng Anh, `Math` cho toán học...). Bên trong mỗi thư mục lĩnh vực sẽ có các subfolder dạng `lesson` hoặc `tutorial` đi sâu vào một khái niệm hoặc bài học cụ thể.

## Quy ước chung

- **Ngôn ngữ**: Tất cả tài liệu được viết bằng **tiếng Việt**. Các thuật ngữ chuyên ngành (technical terms) giữ nguyên tiếng Anh nếu không có bản dịch phổ biến; nếu có bản dịch tốt thì dùng tiếng Việt kèm chú thích tiếng Anh trong ngoặc, ví dụ: *biến (variable)*, *kế thừa (inheritance)*.
- **Cấu trúc thư mục**:
  ```
  <Lĩnh vực>/
  ├── README.md              # Tổng quan lĩnh vực, danh sách bài học
  ├── lesson-01-<chủ-đề>/
  │   ├── README.md          # Nội dung chi tiết của bài
  │   └── ...                # Code, ví dụ, bài tập
  └── tutorial-<chủ-đề>/
      └── README.md
  ```
- **File `README.md`**: Mỗi thư mục (lĩnh vực và từng bài học) đều phải có `README.md` diễn giải chi tiết nội dung, mục tiêu, và liên kết đến các bài học liên quan.
- **Cập nhật mục lục**: Khi thêm bài học mới, phải cập nhật `README.md` của thư mục lĩnh vực tương ứng (và cả file này nếu là lĩnh vực mới).

## Danh sách lĩnh vực

> Chưa có lĩnh vực nào được khởi tạo. Khi thêm thư mục lĩnh vực, hãy bổ sung vào bảng dưới đây.

| Lĩnh vực | Mô tả | Liên kết |
| --- | --- | --- |
| Algorithms | Kỹ thuật & paradigm giải thuật — 8 tier × ~52 lesson (sort, search, greedy, DP, graph, string) | [Algorithms/](./Algorithms/) |
| Biology | Sinh học — 3 tầng × 8 bài, phân tử & tế bào → di truyền & tiến hóa → sinh lý & sinh thái | [Biology/](./Biology/) |
| Chemistry | Hóa học đại cương — 2 tầng × 8 bài, cấu tạo chất → phản ứng → hóa sinh preview | [Chemistry/](./Chemistry/) |
| DataFoundations | Nền tảng cho DataStructures — binary, hex, bitwise, set theory | [DataFoundations/](./DataFoundations/) |
| DataStructures | Cấu trúc dữ liệu — cách tổ chức và lưu trữ dữ liệu hiệu quả | [DataStructures/](./DataStructures/) |
| Economics | Lộ trình học Kinh tế học — 4 tier từ tư duy nền tảng tới chuyên đề ứng dụng | [Economics/](./Economics/) |
| English | Lộ trình học tiếng Anh — phát âm, từ vựng, ngữ pháp, kỹ năng | [English/](./English/) |
| Math | Toán cổ điển — 6 tầng × 8 bài, số học → calculus → toán năm 1 đại học | [Math/](./Math/) |
| Physics | Vật lý — 3 tầng × 8 bài, cơ học → điện-từ → vật lý hiện đại preview | [Physics/](./Physics/) |
| Programming | Học lập trình bằng Go từ tư duy đến production — 9 tier × 84 lesson | [Programming/](./Programming/) |
| Vectors | Lộ trình toán cho AI & ML — 6 tầng từ đại số phổ thông tới embedding/RAG | [Vectors/](./Vectors/) |

> Mở [`index.html`](./index.html) ở root để xem trang chính có liên kết tới mọi lĩnh vực.

## Cách sử dụng

1. Mở thư mục lĩnh vực bạn quan tâm.
2. Đọc `README.md` của thư mục đó để xem danh sách bài học và thứ tự gợi ý.
3. Đi vào từng bài học theo liên kết — mỗi bài học là một thư mục độc lập, có thể chứa lý thuyết, ví dụ code, và bài tập.

## Giấy phép

Xem file [`LICENSE`](./LICENSE).
