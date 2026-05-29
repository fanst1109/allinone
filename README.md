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
| AI-ML | Học máy & AI ứng dụng — 8 bài: pipeline ML, regression, neural net, embeddings, RAG, CLIP | [AI-ML/](./AI-ML/) |
| Algorithms | Kỹ thuật & paradigm giải thuật — 8 tier × ~52 lesson (sort, search, greedy, DP, graph, string) | [Algorithms/](./Algorithms/) |
| Biology | Sinh học — 3 tầng × 8 bài, phân tử & tế bào → di truyền & tiến hóa → sinh lý & sinh thái | [Biology/](./Biology/) |
| Chemistry | Hóa học đại cương — 2 tầng × 8 bài, cấu tạo chất → phản ứng → hóa sinh preview | [Chemistry/](./Chemistry/) |
| Chinese | Lộ trình học tiếng Trung Phổ thông — 4 nhánh × 20 bài, phát âm Mandarin, chữ Hán Giản thể, HSK 1–4 | [Chinese/](./Chinese/) |
| Cryptography | Mật mã học — 3 tầng × 4 bài: Caesar/Vigenère/OTP → AES/hash/KDF → RSA/ECC/TLS | [Cryptography/](./Cryptography/) |
| DataFoundations | Nền tảng cho DataStructures — binary, hex, bitwise, set theory | [DataFoundations/](./DataFoundations/) |
| Databases | Cơ sở dữ liệu — 3 nhóm × 17 bài, mô hình quan hệ & SQL → index/transaction → NoSQL/phân tán | [Databases/](./Databases/) |
| DataStructures | Cấu trúc dữ liệu — cách tổ chức và lưu trữ dữ liệu hiệu quả | [DataStructures/](./DataStructures/) |
| Economics | Lộ trình học Kinh tế học — 4 tier từ tư duy nền tảng tới chuyên đề ứng dụng | [Economics/](./Economics/) |
| English | Lộ trình học tiếng Anh — phát âm, từ vựng, ngữ pháp, kỹ năng | [English/](./English/) |
| Math | Toán cổ điển — 6 tầng × 8 bài, số học → calculus → toán năm 1 đại học | [Math/](./Math/) |
| Physics | Vật lý — 3 tầng × 8 bài, cơ học → điện-từ → vật lý hiện đại preview | [Physics/](./Physics/) |
| PoliticalScience | Chính trị học qua lý thuyết trò chơi — 3 tầng × 15 bài: NE → voting paradox → deterrence/mechanism design | [PoliticalScience/](./PoliticalScience/) |
| Programming | Học lập trình bằng Go từ tư duy đến production — 9 tier × 84 lesson | [Programming/](./Programming/) |
| Psychology | Tâm lý học khoa học — 3 tầng × 15 bài: cognitive (Stroop, biases) → social/developmental → clinical & methods | [Psychology/](./Psychology/) |
| Statistics | Thống kê — 3 tầng × 15 bài: mô tả dữ liệu → suy luận → Bayesian, nhân quả, time series | [Statistics/](./Statistics/) |
| Vectors | Lộ trình toán cho AI & ML — 5 tầng từ đại số phổ thông tới xác suất & cross-entropy | [Vectors/](./Vectors/) |

> Mở [`index.html`](./index.html) ở root để xem trang chính có liên kết tới mọi lĩnh vực.

## Cách sử dụng

1. Mở thư mục lĩnh vực bạn quan tâm.
2. Đọc `README.md` của thư mục đó để xem danh sách bài học và thứ tự gợi ý.
3. Đi vào từng bài học theo liên kết — mỗi bài học là một thư mục độc lập, có thể chứa lý thuyết, ví dụ code, và bài tập.

## Giấy phép

Xem file [`LICENSE`](./LICENSE).
