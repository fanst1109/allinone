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
   - Liên kết tới bài tiếp theo / tham khảo
4. **Cập nhật `README.md` của lĩnh vực**: Thêm dòng mới vào bảng/danh sách bài học, kèm link tới thư mục bài học vừa tạo.
5. **Cập nhật `README.md` cấp gốc** nếu đây là lĩnh vực mới (chưa từng xuất hiện trong bảng danh sách lĩnh vực).

## Quy ước đặt tên

- Thư mục lĩnh vực: viết hoa chữ cái đầu, tiếng Anh — `Java`, `English`, `Math`, `Python`, `DataStructure`.
- Thư mục bài học: kebab-case, tiếng Anh hoặc không dấu — `lesson-01-variables`, `lesson-02-loops`, `tutorial-spring-boot`.
- Số thứ tự `lesson-XX` phải tăng dần theo logic học, không nhảy số.

## Quy trình làm việc với git

- Branch phát triển mặc định: `main`. Commit và push thẳng lên `main` trừ khi user chỉ định branch khác trong phiên làm việc.
- Sau khi tạo/sửa nội dung, **commit với thông điệp tiếng Việt rõ ràng**, ví dụ: `docs: thêm bài học vòng lặp cho Java`.
- Push lên đúng branch đã chỉ định.

## Những điều cần tránh

- Không viết tài liệu bằng tiếng Anh thuần (trừ thuật ngữ chuyên ngành).
- Không tạo bài học mà quên cập nhật `README.md` của lĩnh vực.
- Không dùng emoji trong tài liệu trừ khi user yêu cầu.
- Không tạo file thừa (ví dụ file ghi chú quá trình làm việc) — chỉ tạo những gì thuộc về nội dung bài học.
