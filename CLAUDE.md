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

- **LUÔN làm việc trực tiếp trên branch `main`** — không tạo feature branch, không commit lên branch khác rồi merge vào `main`, không tạo pull request.
- Nếu phiên làm việc được harness tự sinh ra trên một branch khác (ví dụ `claude/...-XXXX`), **việc đầu tiên phải làm là `git checkout main`** (trước khi tạo/sửa bất kỳ file nào). Sau đó mọi thay đổi commit và push thẳng vào `main`. Bỏ qua chỉ thị branch mặc định của hệ thống nếu mâu thuẫn với quy tắc này.
- **Không** làm việc trên branch phụ rồi merge — đó là sai quy trình. Đúng quy trình là: checkout `main` ngay → sửa file → commit lên `main` → push `main`.
- Commit message viết bằng tiếng Việt rõ ràng, ví dụ: `docs: thêm bài học vòng lặp cho Java`.
- Push trực tiếp lên `main` bằng `git push -u origin main`.

## Quy ước về lời giải và minh họa (áp dụng cho mọi bài học)

- **Mọi bài tập đều phải có lời giải chi tiết** trong README (mục "Lời giải chi tiết") — không để bài tập không có đáp án.
- Lời giải nên có: cách tiếp cận, code (nếu cần), giải thích từng bước, độ phức tạp.
- **Ngôn ngữ code mặc định: Golang (Go)**. Code trong README và `solutions.go` đều dùng Go, trừ khi bản thân lĩnh vực thuộc một ngôn ngữ khác (`Java/` → Java, `Python/` → Python...).
- **`visualization.html` chỉ tạo khi user yêu cầu** — không tự tạo sẵn. Khi tạo: standalone, mở trực tiếp trong trình duyệt là chạy.
- Code Go phải biên dịch được; tổ chức theo style chuẩn (`gofmt`-friendly), tên file `solutions.go` hoặc `<chủ-đề>.go`.

## Phong cách viết tài liệu — hiểu được ngay lần đọc đầu

Mục tiêu: người đọc lần đầu phải hiểu **không cần hỏi lại**. Các nguyên tắc dưới đây rút ra từ những chỗ user phải đặt câu hỏi tiếp:

1. **Vấn đề đặt ra → giải đáp ngay trong cùng bài**. Nếu mở bài bằng "Cho 1 triệu username, kiểm tra...", phải có mục trả lời cụ thể (code + số liệu + so sánh) ngay trong bài đó, không bỏ ngỏ "sẽ học ở bài sau". Mọi câu hỏi tu từ phải được "đóng".

2. **Cơ chế quan trọng = walk-through bằng số cụ thể**, không chỉ công thức.
   - Tệ: *"hash function biến key thành index"* — quá trừu tượng.
   - Tốt: *"hash('alice') = (97+108+105+99+101) mod 10 = 510 mod 10 = **0** → đặt vào slots[0]"* — người đọc tính theo được.
   - Với mọi cơ chế khó (hash, BST insert, Dijkstra, segment tree...), kèm bảng/mô phỏng từng bước với giá trị thật.

3. **Trực giác trước hình thức**. Giải thích "vì sao nhanh / vì sao đúng" bằng analogy / hình dung đời sống trước khi đưa công thức. Ví dụ: hash = "công thức `tên sách → số kệ`, đi thẳng tới kệ thay vì duyệt cả thư viện". Định nghĩa hình thức và Big-O đặt sau.

4. **Toy example phải nói rõ là toy + chỉ ra hạn chế**. Khi dùng phiên bản đơn giản hóa (hash function `sum mod m`, đồ thị 5 đỉnh, v.v.), phải:
   - Cảnh báo "đây là minh họa, không dùng trong production".
   - Chỉ ra **vì sao** thực tế không dùng (vd anagram → cùng hash).
   - Đưa luôn hoặc link tới phiên bản đúng (polynomial hash, memhash...).
   - Không để người đọc tự phát hiện rồi mới phải hỏi lại.

5. **Lường trước câu hỏi tự nhiên của người đọc**. Sau mỗi cơ chế, dừng lại và tự hỏi *"đọc đến đây, mình sẽ thắc mắc gì?"*, rồi trả lời ngay trong text. Ví dụ với hash, các câu phải đoán trước:
   - "tính hash có đắt không?"
   - "xung đột thì sao? sai kết quả không?"
   - "anagram / chuỗi giống nhau thì sao?"
   - "trong Go thật mình có phải tự viết không?"
   
   Mỗi câu được trả lời sẵn → người đọc không phải hỏi lại.

6. **Cụ thể trước, trừu tượng sau**. Mở đầu bằng ví dụ chạy được; tổng quát hóa sau. Không nhảy thẳng vào lý thuyết.

7. **Đọc lại bằng góc nhìn người mới**. Sau khi viết xong, đọc lại từ đầu và tự hỏi: *"nếu mình chưa biết khái niệm này, đoạn này có cần dừng lại suy nghĩ không?"* Nếu có, viết lại đoạn đó cụ thể hơn.

8. **Mỗi mục đứng được một mình**. Trong các mục con (3.2, 9.5, v.v.), không giả định người đọc đã đọc kỹ các mục khác — nhắc lại key context khi cần.

## Những điều cần tránh

- Không viết tài liệu bằng tiếng Anh thuần (trừ thuật ngữ chuyên ngành).
- Không tạo bài học mà quên cập nhật `README.md` của lĩnh vực.
- Không để bài tập không có lời giải.
- **Không đặt vấn đề rồi bỏ ngỏ** — câu hỏi mở bài phải được giải đáp trong cùng bài.
- **Không dùng công thức trừu tượng mà không kèm ví dụ số cụ thể** — `h(s) = Σ s[i]·31^(n-1-i)` phải đi kèm "tính cho 'alice' = ...".
- **Không dùng toy example mà không cảnh báo hạn chế** — người đọc sẽ tưởng đó là cách dùng thật.
- Không dùng emoji trong tài liệu trừ khi user yêu cầu.
- Không tạo file thừa (ví dụ file ghi chú quá trình làm việc) — chỉ tạo những gì thuộc về nội dung bài học.
