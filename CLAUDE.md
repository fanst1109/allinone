# Hướng dẫn cho Claude Code

File này định nghĩa các quy ước mà Claude Code phải tuân thủ khi làm việc với repository này.

## Bối cảnh repository

- Đây là **repository học thuật cá nhân**. Mỗi thư mục cấp 1 là một lĩnh vực/môn học (ví dụ `Java`, `English`, `Math`, ...).
- Trong mỗi lĩnh vực có các subfolder dạng `lesson-XX-<chủ-đề>` hoặc `tutorial-<chủ-đề>` đi sâu vào một khái niệm hoặc bài học cụ thể.

## Quy ước ngôn ngữ

- **Mọi tài liệu (`README.md`, ghi chú, giải thích lý thuyết) phải được viết bằng tiếng Việt.**
- **Thuật ngữ chuyên ngành (technical terms)**:
  - Nếu có bản dịch tiếng Việt phổ biến và tự nhiên → dùng tiếng Việt, kèm tiếng Anh trong ngoặc ở lần xuất hiện đầu tiên. Ví dụ: *biến (variable)*, *vòng lặp (loop)*, *kế thừa (inheritance)*.
  - Nếu không có bản dịch tốt hoặc bản dịch gây khó hiểu → **giữ nguyên tiếng Anh**. Ví dụ: `class`, `interface`, `framework`, `API`, `commit`, `branch`.
- Code, tên biến, tên hàm, tên file → giữ tiếng Anh theo chuẩn ngôn ngữ lập trình tương ứng.
- Comment trong code có thể bằng tiếng Việt nếu hữu ích cho việc học.

## Cấu trúc bắt buộc khi tạo bài học mới

Khi user yêu cầu tạo một bài học mới (ví dụ: *"tạo bài học về vòng lặp trong Java"*), thực hiện theo các bước:

1. **Xác định lĩnh vực**: Tìm thư mục lĩnh vực phù hợp ở cấp gốc (ví dụ `Java/`). Nếu chưa có thì tạo mới kèm `README.md` tổng quan.
2. **Tạo thư mục bài học** bên trong lĩnh vực, đặt tên theo dạng `lesson-XX-<chủ-đề-kebab-case>` hoặc `tutorial-<chủ-đề>`. `XX` là số thứ tự hai chữ số (`01`, `02`, ...).
3. **Tạo `README.md`** trong thư mục bài học, bao gồm tối thiểu:
   - Tiêu đề bài học
   - Mục tiêu học tập (learning objectives)
   - Kiến thức tiền đề (prerequisites) — link đến các bài trước nếu có
   - Nội dung lý thuyết, có ví dụ minh họa
   - Bài tập thực hành (nếu phù hợp)
   - **Phần "Lời giải chi tiết"**: với MỌI bài tập trong README, phải có lời giải đầy đủ — giải thích cách tiếp cận, các bước, độ phức tạp. Không để bài tập "treo" không có đáp án.
   - Liên kết tới bài tiếp theo / tham khảo
4. **File lời giải code** (nếu bài học chuyên về lập trình):
   - Tạo file `solutions.go` (hoặc tương đương) trong thư mục bài học.
   - **Ngôn ngữ mặc định cho lời giải code là Golang (Go)**, trừ khi bài học đó vốn thuộc một ngôn ngữ khác (ví dụ trong thư mục `Java/` thì giải bằng Java).
   - Code phải biên dịch được, có hàm `main` minh họa khi cần, kèm comment tiếng Việt giải thích.
   - README liên kết tới file lời giải code (`[solutions.go](./solutions.go)`).
5. **File minh họa trực quan (HTML)** — **chỉ tạo khi user yêu cầu rõ ràng** (ví dụ: *"tạo minh họa cho lesson X"*). Mặc định **không** tự tạo `visualization.html`.
   - Khi được yêu cầu: tạo file `visualization.html` trong thư mục bài học, là file HTML **standalone** (không cần build, không tải framework ngoài trừ CDN nhẹ nếu thực sự cần), mở trực tiếp trong trình duyệt là chạy được.
   - Ưu tiên tương tác (nhập liệu, nút bấm, mô phỏng từng bước) hơn là hình tĩnh.
   - Khi đã tạo: README liên kết tới file `[visualization.html](./visualization.html)`.
6. **Cập nhật `README.md` của lĩnh vực**: Thêm dòng mới vào bảng/danh sách bài học, kèm link tới thư mục bài học vừa tạo.
7. **Cập nhật `README.md` cấp gốc** nếu đây là lĩnh vực mới (chưa từng xuất hiện trong bảng danh sách lĩnh vực).

## Quy ước đặt tên

- Thư mục lĩnh vực: viết hoa chữ cái đầu, tiếng Anh — `Java`, `English`, `Math`, `Python`, `DataStructure`.
- Thư mục bài học: kebab-case, tiếng Anh hoặc không dấu — `lesson-01-variables`, `lesson-02-loops`, `tutorial-spring-boot`.
- Số thứ tự `lesson-XX` phải tăng dần theo logic học, không nhảy số.

## Quy trình làm việc với git

- Branch phát triển mặc định: `main`. Commit và push thẳng lên `main` trừ khi user chỉ định branch khác trong phiên làm việc.
- Sau khi tạo/sửa nội dung, **commit với thông điệp tiếng Việt rõ ràng**, ví dụ: `docs: thêm bài học vòng lặp cho Java`.
- Push lên đúng branch đã chỉ định.

## Quy ước về lời giải và minh họa (áp dụng cho mọi bài học)

- **Mọi bài tập đều phải có lời giải chi tiết** trong README (mục "Lời giải chi tiết") — không để bài tập không có đáp án.
- Lời giải nên có: cách tiếp cận, code (nếu cần), giải thích từng bước, độ phức tạp.
- **Ngôn ngữ code mặc định: Golang (Go)**. Code trong README và `solutions.go` đều dùng Go, trừ khi bản thân lĩnh vực thuộc một ngôn ngữ khác (`Java/` → Java, `Python/` → Python...).
- **`visualization.html` chỉ tạo khi user yêu cầu** — không tự tạo sẵn. Khi tạo: standalone, mở trực tiếp trong trình duyệt là chạy.
- Code Go phải biên dịch được; tổ chức theo style chuẩn (`gofmt`-friendly), tên file `solutions.go` hoặc `<chủ-đề>.go`.

## Những điều cần tránh

- Không viết tài liệu bằng tiếng Anh thuần (trừ thuật ngữ chuyên ngành).
- Không tạo bài học mà quên cập nhật `README.md` của lĩnh vực.
- Không để bài tập không có lời giải.
- Không dùng emoji trong tài liệu trừ khi user yêu cầu.
- Không tạo file thừa (ví dụ file ghi chú quá trình làm việc) — chỉ tạo những gì thuộc về nội dung bài học.
