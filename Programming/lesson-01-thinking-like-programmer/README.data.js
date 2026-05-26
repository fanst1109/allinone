// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-01-thinking-like-programmer/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Tư duy lập trình: cách suy nghĩ trước khi gõ code

> **Tier 0 — Foundation / Mindset · Lesson 1/5**
> Lesson này **chưa chạm code Go**. Mục tiêu là dạy bạn *cách suy nghĩ* trước khi gõ ký tự đầu tiên. Đây là phần "ngầm" mà các giáo trình ngôn ngữ thường bỏ qua, nhưng lại là thứ phân biệt một người "viết được code" với một người "giải được vấn đề bằng code".

## Mục tiêu học tập

Sau lesson này bạn sẽ:

1. Trả lời được **lập trình viên thực sự làm gì cả ngày** — không phải "ngồi code", mà phần lớn là đọc, suy nghĩ, debug.
2. Nắm **5 kỹ năng tư duy cốt lõi**: decompose, pattern matching, abstraction, algorithmic thinking, mental model.
3. Viết được **pseudocode** trước khi viết code thật, áp dụng được cho cả bài toán cá nhân ngoài lập trình.
4. Có **quy trình 6 bước** chuẩn để giải mọi bài toán mới — không còn cảm giác "không biết bắt đầu từ đâu".
5. Tránh được **4 antipattern** phổ biến mà 9/10 người mới mắc.

## Kiến thức tiền đề

- Không có. Đây là lesson đầu tiên của lộ trình.
- Biết dùng máy tính cơ bản (mở browser, tạo file văn bản) là đủ.

## 1. Lập trình là gì? Lập trình viên làm gì?

> **💡 Trực giác** — Lập trình **không phải là "biết ngôn ngữ lập trình"**. Biết tiếng Anh không tự động làm bạn thành nhà văn; biết Go không tự động làm bạn thành lập trình viên. Lập trình là **dùng máy tính để giải vấn đề thực** — ngôn ngữ chỉ là cây bút.

### 1.1 Định nghĩa qua công việc thực tế

Hãy quên định nghĩa hàn lâm kiểu "lập trình là viết chuỗi các chỉ thị cho máy tính". Định nghĩa đó đúng nhưng vô dụng — nó không cho bạn biết *mỗi ngày làm gì*. Thay vào đó, lập trình viên thực tế làm những việc sau:

| Tình huống thật | Việc cụ thể |
|---|---|
| Sếp gửi file Excel 50k dòng, muốn trích ra mọi khách hàng VIP chi > 10 triệu | Viết **script Python ~20 dòng** đọc file, filter, ghi file mới. 5 phút xong. Không có script này thì làm tay mất nửa ngày. |
| Công ty cần app đặt phòng cho 200 nhân viên | Build **web app** với form đặt phòng, lịch chung, gửi email xác nhận. 2 tuần làm việc. |
| User báo "app crash khi click nút Save lần thứ 3" | **Debug** — đọc log, dựng lại tình huống, tìm dòng code sai, sửa, test. Có khi 10 phút, có khi 3 ngày. |
| Đội backend muốn API mới trả thông tin đơn hàng cho app mobile | Thiết kế **endpoint REST** (URL nào, nhận gì, trả gì), viết code, test với app mobile, deploy lên server. |
| Chatbot Slack báo "build đỏ" lúc 2h sáng | Đọc CI log, hiểu **vì sao test fail**, có thể là code lỗi, có thể là test flaky, có thể là môi trường server hỏng. Sửa cho xanh trước khi đội thức dậy. |

Để ý: trong 5 việc trên, chỉ có **2 việc** là "viết code mới" (script + web app). 3 việc còn lại là **đọc, hiểu, sửa, debug, vận hành**. Đây là tỷ lệ thật ở mọi công ty — đa số thời gian không phải gõ code mới, mà là **làm việc với code đã có và hệ thống đang chạy**.

### 1.2 Một ngày điển hình của dev

Để bạn hình dung cụ thể hơn, đây là một ngày thật của một backend dev:

| Giờ | Việc | Kỹ năng dùng |
|---|---|---|
| 9:00 | Đọc 3 email + 12 message Slack qua đêm | Đọc hiểu, lọc thông tin |
| 9:30 | Daily standup: nói hôm qua làm gì, hôm nay làm gì, có gì block | Giao tiếp |
| 9:45 | Đọc tài liệu API của đối tác để chuẩn bị tích hợp | Đọc tài liệu kỹ thuật |
| 10:30 | Sửa 1 bug trong code của đồng nghiệp (đã có pull request mở) | Đọc code lạ + debug |
| 12:00 | Ăn trưa |
| 13:00 | Code feature mới (cuối cùng cũng viết code!) | Viết code |
| 15:00 | Pair với đội mobile để debug chỗ API trả sai field | Debug + giao tiếp |
| 16:00 | Code review pull request của 2 người trong team | Đọc code + cho feedback |
| 17:30 | Cập nhật doc kỹ thuật cho hệ thống vừa đổi | Viết tài liệu |

Trong 8 tiếng, **chỉ ~2 tiếng gõ code mới**. Còn lại là **suy nghĩ, đọc, giao tiếp**. Đó là lý do *tư duy* quan trọng hơn *tốc độ gõ phím*.

> **❓ Câu hỏi tự nhiên**
> - *"Vậy có cần học gõ 10 ngón không?"* → Có ích, nhưng không phải yếu tố quyết định. Một người gõ 40 từ/phút mà suy nghĩ tốt vẫn năng suất hơn một người gõ 100 từ/phút mà code sai.
> - *"Vậy IDE / AI gợi ý (Copilot) có làm việc dễ hơn không?"* → Dễ hơn ở phần *gõ*, nhưng phần *quyết định viết gì* vẫn là bạn. Copilot gợi ý sai sẽ làm bạn tốn thời gian hơn nếu bạn không có mental model để đánh giá gợi ý.

> **⚠ Lỗi thường gặp** — Người mới hay nghĩ "tôi cần học cho thật nhanh ngôn ngữ X để xin việc". Sai. Cần học **giải vấn đề**, và dùng ngôn ngữ X làm công cụ. Người chỉ biết syntax mà không biết suy nghĩ sẽ bị mắc kẹt ở mọi bài toán không-có-trên-StackOverflow.

> **🔁 Tự kiểm tra mục 1**
> <details><summary>Câu 1: Trong 8 tiếng của một dev, khoảng bao nhiêu tiếng dành để gõ code mới?</summary>
>
> Khoảng 2 tiếng. Phần lớn còn lại là đọc code/tài liệu, debug, giao tiếp, review. Đây là tỷ lệ thật, không phải bị cường điệu.
> </details>
>
> <details><summary>Câu 2: Vì sao "biết syntax Go" không đồng nghĩa với "biết lập trình"?</summary>
>
> Vì syntax chỉ giúp bạn *gõ đúng câu*, không giúp bạn *quyết định gõ câu gì để giải vấn đề*. Quyết định đó nằm ở tư duy decompose, pattern matching, mental model — những thứ ngôn ngữ-agnostic.
> </details>

> **📝 Tóm tắt mục 1**
> - Lập trình = giải vấn đề bằng máy tính, ngôn ngữ chỉ là công cụ.
> - Dev thật chỉ gõ code mới ~25% thời gian; phần lớn là đọc, debug, giao tiếp.
> - Đầu tư vào tư duy quan trọng hơn đầu tư vào tốc độ gõ hay vào "biết nhiều syntax".

## 2. Năm kỹ năng tư duy cốt lõi

Năm kỹ năng dưới đây là **bộ khung tư duy** cho mọi lập trình viên. Bạn sẽ dùng chúng mỗi ngày, ở mọi tier, từ lesson đầu tới capstone. Học một lần, dùng cả đời.

### 2.1 Decompose — chia nhỏ vấn đề lớn

> **💡 Trực giác** — Không ai ăn nguyên một con bò trong một miếng. Bạn cắt thành steak, steak thành miếng nhỏ, miếng nhỏ vừa miệng. Code cũng vậy: bài toán "build app đặt grab" không thể giải trong một file. Phải cắt thành các bài toán con nhỏ tới mức **mỗi bài toán con bạn biết cách giải**.

**Ví dụ thực:** "Build app đặt grab" tách thành:

1. **Đăng ký / đăng nhập** — user nhập số điện thoại, nhận OTP, lưu account.
2. **Hiển thị bản đồ và vị trí hiện tại** — gọi API GPS, render bản đồ.
3. **Nhập điểm đón và điểm đến** — autocomplete địa chỉ, đánh dấu trên bản đồ.
4. **Tính giá ước lượng** — gọi API tính khoảng cách + công thức giá theo loại xe.
5. **Tìm tài xế gần nhất** — query database tài xế đang online, sort theo khoảng cách.
6. **Gửi yêu cầu cho tài xế và chờ chấp nhận** — gửi notification, chờ tài xế bấm "nhận", có timeout.
7. **Hiển thị xe đang chạy đến** — track GPS tài xế theo thời gian thực.
8. **Thanh toán + đánh giá** — trừ tiền ví / quẹt thẻ, user chấm sao.

8 bài toán này, mỗi cái còn tách nhỏ tiếp. Ví dụ "Đăng ký / đăng nhập":

- 1a. Form nhập số điện thoại + validate format.
- 1b. Gọi service SMS gửi OTP 6 số.
- 1c. Cho user nhập OTP + verify với server.
- 1d. Sinh token (JWT), lưu vào device.
- 1e. Lưu user vào database nếu là user mới.

Đến mức 1a, 1b, 1c... thì **mỗi cái đã là một bài toán đủ nhỏ để bạn ngồi xuống code trong 1-2 tiếng**. Đó là đích của decompose.

**4 ví dụ khác về decompose:**

| Bài toán to | Decompose |
|---|---|
| "Viết bot Slack báo sinh nhật team" | (1) Lưu danh sách thành viên + ngày sinh, (2) Mỗi sáng 9h chạy job kiểm tra hôm nay có ai sinh nhật, (3) Format message, (4) Gọi Slack API gửi vào channel. |
| "Tính lương cuối tháng cho 50 nhân viên" | (1) Đọc bảng chấm công, (2) Với mỗi người tính số giờ làm × mức lương, (3) Trừ thuế thu nhập theo bậc, (4) Cộng thưởng nếu có, (5) Xuất file PDF. |
| "Chuyển một website tin tức từ tiếng Anh sang tiếng Việt" | (1) Crawl các bài, (2) Gọi Google Translate API, (3) Lưu bản dịch, (4) Sửa render template để hiển thị bản tiếng Việt, (5) Switch ngôn ngữ. |
| "Viết game đoán số 1-100" | (1) Sinh số ngẫu nhiên 1-100, (2) Nhận input user, (3) So sánh in "lớn hơn / nhỏ hơn", (4) Lặp đến khi đúng, (5) In số lần đoán. |

> **⚠ Lỗi thường gặp** — Decompose **chưa đủ nhỏ** trước khi code. Người mới hay viết "module xử lý đăng nhập" rồi ngồi 3 tiếng không xong vì module đó còn 5 bài toán con bên trong. Quy tắc: nếu một bài toán con không giải xong trong 1-2 tiếng, chia nhỏ tiếp.

### 2.2 Pattern matching — nhận diện mẫu lặp lại

> **💡 Trực giác** — Sau khi giải 50 bài toán, bạn sẽ thấy nhiều bài "trông khác mặt nhưng chung ruột". Đó là **pattern**. Lập trình viên có kinh nghiệm khác người mới ở chỗ: thấy bài mới → ngay lập tức nhận ra "à, đây là pattern X tôi đã thấy". Đỡ phải nghĩ từ đầu.

**Pattern phổ biến số 1: Loop qua list để làm gì đó với từng phần tử**

Cùng pattern này xuất hiện ở 4 ngữ cảnh khác nhau:

1. *"In danh sách học sinh trong lớp"* — loop qua list học sinh, mỗi người in tên.
2. *"Tính tổng điểm thi 5 môn"* — loop qua list điểm, cộng dồn vào biến \`total\`.
3. *"Gửi email khuyến mãi cho 10k khách hàng"* — loop qua list email, mỗi cái gọi hàm gửi.
4. *"Resize 200 ảnh từ 4000×3000 xuống 800×600"* — loop qua list file, mỗi cái gọi hàm resize.

Khác bề mặt (in, cộng, gửi, resize) — chung pattern (loop + work-per-item).

**Pattern phổ biến số 2: Search — tìm phần tử thoả điều kiện**

1. *"Tìm user có email = abc@x.com"* trong database.
2. *"Tìm file lớn nhất trong thư mục"* — duyệt thư mục, giữ cái lớn nhất.
3. *"Tìm trận đấu sắp diễn ra gần nhất theo giờ hiện tại"* trong lịch.
4. *"Tìm bug đầu tiên gây crash"* trong log file.

Pattern chung: duyệt → so sánh → trả về cái thoả mãn (hoặc "không có").

**Pattern phổ biến số 3: Transform — biến đổi list này thành list khác**

1. *"Đổi list giá USD sang VND"* — mỗi giá × tỷ giá.
2. *"Lấy tên đầy đủ từ list user object"* — mỗi object → \`firstName + " " + lastName\`.
3. *"Convert ảnh từ PNG sang JPEG"* — mỗi file PNG → file JPEG.
4. *"Tóm tắt từng bài báo bằng AI"* — mỗi bài → 1 đoạn tóm tắt.

Pattern chung: input list → áp dụng hàm cho từng phần tử → output list cùng độ dài.

**Pattern phổ biến số 4: Aggregate — gom list thành 1 giá trị**

1. *"Tổng doanh thu tháng này"* — list đơn hàng → tổng tiền.
2. *"Khách hàng VIP nhất năm"* — list khách → khách có total spend lớn nhất.
3. *"Tỷ lệ pass test"* — list test result → (số pass / tổng) × 100.
4. *"Báo cáo hôm nay app crash bao nhiêu lần"* — list log → đếm dòng có "FATAL".

Pattern chung: list → 1 con số / 1 object đại diện.

> **❓ Câu hỏi tự nhiên**
> - *"Có bao nhiêu pattern tất cả?"* → Vài chục. Sách "Design Patterns" có 23 cái cho OOP. Functional programming có ~10 (map, filter, reduce...). Algorithm có vài chục (sliding window, two pointers, BFS, DFS, DP...). Nhưng bạn không cần học hết một lúc — gặp pattern nào học pattern đó.
> - *"Làm sao nhận ra pattern khi gặp bài mới?"* → Bằng kinh nghiệm. Cách rèn: sau khi giải 1 bài, dừng lại 1 phút tự hỏi "bài này thuộc kiểu gì? đã thấy bài tương tự ở đâu?". 100 bài như vậy → bạn sẽ tự nhận ra.

> **⚠ Lỗi thường gặp** — Cố ép một pattern không phù hợp vào bài toán. Vd: thấy "list" là dùng loop, nhưng bài toán thật cần đệ quy hoặc dùng cấu trúc khác. Pattern là **gợi ý**, không phải mệnh lệnh.

### 2.3 Abstraction — bỏ chi tiết không cần, giữ bản chất

> **💡 Trực giác** — Khi bạn nói "tôi đi xe đến chỗ làm", người nghe không cần biết bạn đi Toyota, Honda hay Ford. "Xe" là một abstraction — gom mọi loại xe hơi vào một khái niệm chung. Trong code, abstraction giúp ta nói "gửi email" mà không phải lo bên trong dùng SMTP, SendGrid hay Mailgun.

**4 ví dụ abstraction trong đời thực:**

| Khái niệm cụ thể | Abstraction |
|---|---|
| Toyota Camry, Honda Civic, Ford Focus | "Xe ô tô" — có 4 bánh, vô-lăng, chở người. |
| iPhone 15 Pro, Samsung S24, Pixel 8 | "Điện thoại smartphone" — gọi, nhắn tin, chạy app. |
| Visa, Mastercard, JCB, ATM nội địa | "Thẻ thanh toán" — quẹt để trả tiền. |
| Tiệm cà phê góc phố, Starbucks, Highlands | "Quán cà phê" — bán đồ uống, có chỗ ngồi. |

Khi viết code, bạn dùng abstraction tương tự:

- **\`Logger\`** là abstraction — bên trong có thể là log ra console, log ra file, log lên cloud. Code dùng \`logger.Info("xin chào")\` không cần biết bên trong.
- **\`Database\`** là abstraction — có thể là Postgres, MySQL, SQLite. Code dùng \`db.Query(...)\` không cần care.
- **\`HTTPClient\`** là abstraction — có thể là \`net/http\`, có thể là retry-wrapped, có thể là mock cho test. Code gọi \`client.Get(url)\` không thay đổi.

> **❓ Câu hỏi tự nhiên**
> - *"Abstraction có làm code chậm hơn không?"* → Có một chút (extra function call), nhưng đổi lại code dễ thay đổi và test. Trong 99% trường hợp đáng đổi.
> - *"Abstract nhiều có làm code khó đọc không?"* → Có. Đây là "over-abstraction" — abstract những thứ không cần thiết. Quy tắc thực dụng: chỉ abstract khi có ≥ 2 implementation thật. Đừng tạo interface chỉ vì "có thể sau này cần".

> **⚠ Lỗi thường gặp** — Người mới hay đi 2 cực:
> 1. **Không abstract gì** — copy paste code 5 chỗ với thay đổi nhỏ. Đến khi cần sửa logic, phải sửa 5 chỗ, quên 1 chỗ → bug.
> 2. **Over-abstract** — tạo 10 layer interface "cho tương lai". Đọc code mất 30 phút mới tìm được chỗ logic thật. Tương lai có khi không đến.

### 2.4 Algorithmic thinking — quy trình từng bước

> **💡 Trực giác** — Một **thuật toán** là **công thức nấu ăn**: gồm các bước rõ ràng, làm theo thứ tự, thực hiện đúng thì luôn ra cùng kết quả. Khác công thức nấu ăn ở chỗ: máy tính làm theo *chính xác từng chữ*, không "thêm tí muối cho vừa miệng".

**Ví dụ: "Pha mì gói" như một thuật toán**

\`\`\`
INPUT: 1 gói mì + 500ml nước + 1 cái bát + 1 nồi
OUTPUT: 1 bát mì chín nóng

BƯỚC 1: Đổ 500ml nước vào nồi
BƯỚC 2: Bật bếp, đun đến khi nước sôi (sủi bọt)
BƯỚC 3: Mở gói mì, bỏ vắt mì vào nồi
BƯỚC 4: Đợi 3 phút (vắt mì mềm hết)
BƯỚC 5: Mở gói gia vị, đổ vào bát
BƯỚC 6: Đổ mì + nước từ nồi vào bát
BƯỚC 7: Khuấy đều
DONE
\`\`\`

3 đặc tính của thuật toán đều có ở đây:

1. **Rõ ràng** — mỗi bước đều cụ thể, không có "làm sao đó".
2. **Có thứ tự** — bước 3 không được làm trước bước 2 (bỏ mì vào nước lạnh thì không chín).
3. **Deterministic** — làm đúng các bước với cùng input → luôn ra cùng output.

**3 ví dụ thuật toán khác (đời sống):**

- **Rút tiền ATM:** (1) Cắm thẻ, (2) Nhập PIN, (3) Chọn "Rút tiền", (4) Nhập số tiền, (5) Nhận tiền, (6) Lấy lại thẻ.
- **Sắp hồ sơ theo tên A-Z:** (1) Lấy 1 hồ sơ, (2) So sánh với các hồ sơ đã xếp, (3) Chèn vào đúng vị trí, (4) Lặp đến hết. (Đây chính là *insertion sort*!)
- **Tìm sách trong thư viện theo mã:** (1) Đi tới đúng kệ theo ký tự đầu mã, (2) Lướt nhìn theo thứ tự đến khi gặp mã đúng. (Đây là *linear search*.)

**1 ví dụ thuật toán (lập trình):**

\`\`\`
Bài toán: Tìm số lớn nhất trong một list số

INPUT: list = [3, 7, 2, 9, 5]
OUTPUT: 9

BƯỚC 1: max = list[0]              // tạm thời coi phần tử đầu là max → max = 3
BƯỚC 2: với mỗi i từ 1 đến hết list:
           nếu list[i] > max:
               max = list[i]
BƯỚC 3: Trả về max

Trace với list = [3, 7, 2, 9, 5]:
  i=1: list[1]=7 > 3  → max = 7
  i=2: list[2]=2 < 7  → max vẫn là 7
  i=3: list[3]=9 > 7  → max = 9
  i=4: list[4]=5 < 9  → max vẫn là 9
Kết quả: 9 ✓
\`\`\`

> **⚠ Lỗi thường gặp** — Viết thuật toán **mơ hồ**: "duyệt list và tìm max". Mơ hồ ở chỗ: "tìm" cụ thể là gì? Bắt đầu từ đâu? Khởi tạo max bằng gì (số đầu, hay số 0, hay -∞)? Máy tính không "hiểu ngầm" — bạn phải nói rõ.

### 2.5 Mental model & debugging

> **💡 Trực giác** — **Mental model** là *bản đồ trong đầu bạn về cách hệ thống đang chạy*. Khi bản đồ này khớp với thực tế, code chạy đúng. Khi bản đồ sai, code chạy ra kết quả bạn không hiểu — đó là *bug*. Vậy debug = **so bản đồ trong đầu với thực tế chạy thật để tìm chỗ lệch**.

**Ví dụ cụ thể: "code đếm số chẵn nhưng đếm sai"**

\`\`\`
Bài toán: Đếm số chẵn trong list [1, 2, 3, 4, 5, 6]

Code mental model của bạn:
  count = 0
  với mỗi x trong list:
      nếu x chia 2 dư 0:
          count = count + 1
  trả về count

Bạn nghĩ kết quả = 3 (2, 4, 6).
Nhưng chạy thật ra 6. Tại sao?
\`\`\`

Đây là dấu hiệu mental model sai. Để tìm:

1. **In ra từng bước** — sau mỗi vòng lặp in \`x\` và \`count\`.
2. Phát hiện: \`count\` tăng ở MỌI \`x\`, không phải chỉ x chẵn.
3. Đọc lại code thật — phát hiện code viết \`if x % 2 == 0 || true:\` (dính chữ \`|| true\` thừa).
4. Mental model của bạn: "if x chẵn → tăng". Thực tế code: "if x chẵn HOẶC true → luôn tăng".

**Bug = chỗ lệch giữa mental model và code thật.** Một khi tìm được chỗ lệch, sửa rất dễ.

**3 ví dụ mental model sai khác:**

| Bạn nghĩ | Thực tế | Hậu quả |
|---|---|---|
| \`list.append(x)\` chỉ thêm vào cuối list local | Trong Python/Go, list là reference — bạn cũng sửa list bên ngoài | Bug khó chịu khi list bị "thay đổi từ xa" |
| Hàm \`time.Now()\` chạy lúc khai báo biến | Thực ra chạy mỗi lần gọi | Timestamp không như mong đợi |
| Vòng \`for i := 0; i < len(arr); i++\` luôn dừng đúng | Nếu trong loop bạn \`arr = append(arr, x)\` thì \`len(arr)\` thay đổi → vô tận | Loop chạy mãi |
| \`if a == b\` so sánh giá trị | Với object/pointer, đôi khi nó so sánh địa chỉ | Hai object "giống nhau" nhưng \`==\` ra false |

**Quy trình debug (sẽ học sâu ở Lesson 04):**

1. **Reproduce** — chạy lại để thấy bug.
2. **Quan sát** — in ra biến / dùng debugger để xem giá trị thật.
3. **So với mental model** — chỗ nào lệch?
4. **Hypothesize** — đoán nguyên nhân.
5. **Test hypothesis** — sửa thử, chạy lại.
6. **Fix + verify** — sửa hẳn, viết test nếu có thể.

> **❓ Câu hỏi tự nhiên**
> - *"Tôi không thấy bug trong code, làm sao biết mental model sai?"* → Đó chính là vấn đề — mental model sai luôn "nhìn không thấy bug" vì bạn đang nhìn bằng chính mental model sai đó. Cách thoát: in giá trị THẬT ra, đừng tin "tôi đoán nó là gì".
> - *"Có thể debug bằng cách đoán + sửa không?"* → Có, nhưng cực chậm và nhiều khi không dứt điểm. Debug có hệ thống (quan sát → hypothesis → test) luôn nhanh hơn về dài hạn.

> **⚠ Lỗi thường gặp** — *"Tôi đọc lại code rồi, không thấy chỗ sai"*. Đọc code không đủ — phải **trace bằng tay với input cụ thể** hoặc **in giá trị ra**. Đọc bằng mắt rất dễ "đọc cái mình tưởng" thay vì "đọc cái thật sự ở đó".

> **🔁 Tự kiểm tra mục 2**
> <details><summary>Câu 1: Trong 4 pattern ở mục 2.2, "đếm số phần tử thỏa điều kiện" thuộc pattern nào?</summary>
>
> Thuộc **Aggregate** — gom list thành 1 giá trị (con số đếm). Có thể coi là biến thể của reduce: bắt đầu count = 0, mỗi phần tử thỏa điều kiện thì +1.
> </details>
>
> <details><summary>Câu 2: Vì sao mental model sai khó tự thấy?</summary>
>
> Vì bạn đang nhìn code bằng chính mental model sai đó — bạn "đọc" code theo cách bạn tưởng nó chạy, không phải cách nó thật sự chạy. Phải in giá trị THẬT ra mới phá được vòng luẩn quẩn.
> </details>

> **📝 Tóm tắt mục 2**
> - **Decompose**: chia nhỏ đến mức mỗi bài con giải được trong 1-2 tiếng.
> - **Pattern matching**: nhận ra loop, search, transform, aggregate (và các pattern khác) ở bài mới.
> - **Abstraction**: bỏ chi tiết, giữ bản chất — đủ dùng, không over-engineer.
> - **Algorithmic thinking**: rõ ràng, có thứ tự, deterministic — không mơ hồ.
> - **Mental model**: bug = lệch giữa "code bạn tưởng" và "code thật". Debug = tìm chỗ lệch.

## 3. Pseudocode — viết trước khi gõ code

> **💡 Trực giác** — Pseudocode là **bản nháp bằng tiếng Việt + ký hiệu chung** để bạn nghĩ ra giải pháp trước khi quan tâm cú pháp. Giống nháp dàn ý trước khi viết văn — ai cố viết thẳng cũng dễ lạc.

### 3.1 Pseudocode là gì? Vì sao cần?

Pseudocode **không có cú pháp chính thức**. Quy ước phổ biến:

- Dùng tiếng Việt / tiếng Anh ngắn gọn.
- Dùng \`=\` cho gán, \`==\` cho so sánh.
- Dùng thụt lề thay vì dấu ngoặc.
- Dùng \`nếu / lặp / trả về\` hoặc \`if / for / return\` đều được, miễn nhất quán.

Vì sao cần?

1. **Tách suy nghĩ ra khỏi syntax.** Người mới mất 50% thời gian vì lỗi cú pháp khi đang còn nghĩ. Pseudocode loại bỏ phần đó.
2. **Dễ chia sẻ với người không biết Go.** Đồng nghiệp Python / sếp không biết code đều đọc được pseudocode.
3. **Sửa giải pháp dễ.** Đổi pseudocode (vài dòng) nhanh hơn nhiều so với đổi code đã viết xong.

### 3.2 Ba bài toán đời thực — pseudocode + code Go

#### Bài 1: Tính BMI

\`\`\`
INPUT: cân nặng (kg), chiều cao (m)
OUTPUT: chỉ số BMI và phân loại

bmi = cân_nặng / (chiều_cao × chiều_cao)
nếu bmi < 18.5:
    phân_loại = "Gầy"
ngược lại nếu bmi < 25:
    phân_loại = "Bình thường"
ngược lại nếu bmi < 30:
    phân_loại = "Thừa cân"
ngược lại:
    phân_loại = "Béo phì"
trả về bmi, phân_loại
\`\`\`

Cùng logic, viết bằng Go (xem trước, sẽ học kỹ ở Tier 1):

\`\`\`go
func bmiVaPhanLoai(canNang, chieuCao float64) (float64, string) {
    bmi := canNang / (chieuCao * chieuCao)
    var loai string
    switch {
    case bmi < 18.5:
        loai = "Gay"
    case bmi < 25:
        loai = "Binh thuong"
    case bmi < 30:
        loai = "Thua can"
    default:
        loai = "Beo phi"
    }
    return bmi, loai
}
\`\`\`

Để ý: pseudocode chỉ có 9 dòng "nội dung", Go có 12. Khác biệt là kiểu dữ liệu (\`float64\`), khai báo hàm, return — chi tiết cú pháp. **Logic giống hệt.**

#### Bài 2: Đếm số từ trong câu

\`\`\`
INPUT: câu (chuỗi ký tự, vd "tôi học lập trình")
OUTPUT: số từ

# Cách đơn giản: cắt theo khoảng trắng rồi đếm
các_từ = cắt câu theo khoảng_trắng
trả về độ_dài(các_từ)

# Trace với "tôi học lập trình":
#   cắt → ["tôi", "học", "lập", "trình"]
#   độ dài = 4
\`\`\`

Code Go (preview):

\`\`\`go
import "strings"

func demTu(cau string) int {
    cacTu := strings.Fields(cau)  // tự cắt theo whitespace
    return len(cacTu)
}
\`\`\`

#### Bài 3: Kiểm tra mật khẩu mạnh

\`\`\`
INPUT: mật khẩu (chuỗi)
OUTPUT: true nếu mạnh, false nếu yếu

# Quy tắc: ≥ 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ số

nếu độ_dài(mật_khẩu) < 8:
    trả về false

có_hoa = false
có_số = false
với mỗi ký_tự trong mật_khẩu:
    nếu ký_tự là chữ hoa:
        có_hoa = true
    nếu ký_tự là chữ số:
        có_số = true

trả về có_hoa AND có_số

# Trace với "Hello1":
#   độ dài = 6 < 8 → trả về false ngay ✓
# Trace với "Hello1234":
#   độ dài = 9 ≥ 8 → tiếp tục
#   duyệt: H (hoa), e, l, l, o, 1 (số), 2, 3, 4
#   có_hoa = true, có_số = true → trả về true ✓
\`\`\`

Code Go (preview):

\`\`\`go
import "unicode"

func matKhauManh(mk string) bool {
    if len(mk) < 8 {
        return false
    }
    coHoa, coSo := false, false
    for _, c := range mk {
        if unicode.IsUpper(c) { coHoa = true }
        if unicode.IsDigit(c) { coSo = true }
    }
    return coHoa && coSo
}
\`\`\`

> **❓ Câu hỏi tự nhiên**
> - *"Pseudocode chi tiết tới mức nào là đủ?"* → Đủ để **đọc lại sau 1 tuần vẫn hiểu được logic**, và đủ để **dịch sang ngôn ngữ thật mà không phải nghĩ lại**. Không cần chi tiết tới mức khai báo kiểu dữ liệu — đó là việc của code thật.
> - *"Có cần viết pseudocode cho mọi function không?"* → Không. Function nhỏ, quen thuộc thì viết thẳng. Function có logic phức tạp (≥ 20 dòng, ≥ 2 nhánh if lồng) thì pseudocode trước rất đáng tiền.

> **⚠ Lỗi thường gặp** — Viết pseudocode **gần giống ngôn ngữ thật** đến mức tốn thời gian như viết code luôn. Pseudocode nên ở mức "concept" — bỏ qua dấu chấm phẩy, kiểu dữ liệu, import, format chuỗi.

> **🔁 Tự kiểm tra mục 3**
> <details><summary>Câu 1: Vì sao tách suy nghĩ logic ra khỏi syntax giúp code nhanh hơn?</summary>
>
> Vì khi nghĩ logic và nghĩ syntax cùng lúc, não phải "context switch" liên tục. Mỗi lỗi syntax (thiếu dấu \`;\`, sai tên biến) làm bạn quên mạch logic đang chạy trong đầu. Pseudocode khoá mạch logic xong rồi mới chuyển sang lo syntax.
> </details>

> **📝 Tóm tắt mục 3**
> - Pseudocode = nháp logic bằng tiếng Việt + ký hiệu, không quan tâm cú pháp.
> - Viết pseudocode cho bài toán phức tạp, không cho mọi function nhỏ.
> - Pseudocode → Code Go: chỉ là dịch lại, không phải nghĩ lại.

## 4. Quy trình 6 bước giải một bài toán mới

Khi gặp bài toán hoàn toàn mới, **đừng code ngay**. Đi qua 6 bước này, mỗi bước có output cụ thể.

### 4.1 Sáu bước

| Bước | Tên | Output |
|:--:|---|---|
| 1 | **Hiểu đề** | Bạn diễn đạt lại đề bằng lời mình, không nhìn nguyên đề. |
| 2 | **Tạo ví dụ cụ thể** | Ít nhất 3 cặp input → output, có cả edge case. |
| 3 | **Tìm pattern** | "Bài này là loop / search / transform / aggregate / ..." |
| 4 | **Pseudocode** | Vài dòng tiếng Việt mô tả thuật toán. |
| 5 | **Code** | Code thật trong ngôn ngữ chọn. |
| 6 | **Test với edge case** | Chạy với các input ở bước 2 + edge case (empty, 1 phần tử, rất lớn, sai kiểu). |

### 4.2 Áp dụng cho bài: "Đếm số lần xuất hiện của một ký tự trong chuỗi"

**Đề:** Cho chuỗi \`s\` và ký tự \`c\`, đếm \`c\` xuất hiện bao nhiêu lần trong \`s\`.

#### Bước 1 — Hiểu đề (diễn đạt lại)

> "Tôi có một chuỗi và một ký tự. Tôi đi qua từng ký tự trong chuỗi, mỗi lần gặp đúng ký tự đó thì cộng 1 vào biến đếm. Cuối cùng trả về biến đếm."

Quan trọng: tự đặt câu hỏi để rõ:

- Phân biệt hoa-thường? (Giả định: phân biệt — 'A' khác 'a'.)
- Chuỗi rỗng → trả về 0.
- Ký tự không xuất hiện → trả về 0.
- Có hỗ trợ ký tự Unicode (emoji, tiếng Việt có dấu) không? (Đơn giản: chỉ ASCII.)

#### Bước 2 — Ví dụ cụ thể

| Input | Output | Giải thích |
|---|---|---|
| \`s="banana", c='a'\` | \`3\` | 3 chữ a ở vị trí 1, 3, 5 |
| \`s="hello", c='l'\` | \`2\` | 2 chữ l ở vị trí 2, 3 |
| \`s="abc", c='z'\` | \`0\` | z không có trong "abc" |
| \`s="", c='a'\` | \`0\` | chuỗi rỗng → 0 |
| \`s="AAAA", c='a'\` | \`0\` | hoa khác thường |
| \`s="aaaaa", c='a'\` | \`5\` | tất cả đều khớp |

#### Bước 3 — Tìm pattern

Đây là **Aggregate** — gom list (các ký tự) thành 1 con số (số lần xuất hiện). Cụ thể là biến thể "đếm thoả điều kiện".

#### Bước 4 — Pseudocode

\`\`\`
count = 0
với mỗi ký_tự ch trong s:
    nếu ch == c:
        count = count + 1
trả về count
\`\`\`

#### Bước 5 — Code (Go, preview — sẽ học sâu Tier 1)

\`\`\`go
func demKyTu(s string, c byte) int {
    count := 0
    for i := 0; i < len(s); i++ {
        if s[i] == c {
            count++
        }
    }
    return count
}
\`\`\`

#### Bước 6 — Test với edge case

Chạy với 6 input ở bước 2:

| Input | Expected | Got (trace bằng tay) | ✓/✗ |
|---|---|---|---|
| \`"banana", 'a'\` | 3 | b(0)→a(1)→n(1)→a(2)→n(2)→a(3) | ✓ |
| \`"hello", 'l'\` | 2 | h(0)→e(0)→l(1)→l(2)→o(2) | ✓ |
| \`"abc", 'z'\` | 0 | a(0)→b(0)→c(0) | ✓ |
| \`"", 'a'\` | 0 | loop không chạy, count=0 | ✓ |
| \`"AAAA", 'a'\` | 0 | 'A' (65) ≠ 'a' (97) | ✓ |
| \`"aaaaa", 'a'\` | 5 | 5 vòng tăng | ✓ |

Cả 6 đều pass. **Xong.**

> **❓ Câu hỏi tự nhiên**
> - *"Mất công đi 6 bước, không nhanh hơn code ngay?"* → Với bài đơn giản như đếm, có vẻ thế. Nhưng với bài khó (vd "tìm hai phần tử trong list có tổng = K"), code ngay 99% sẽ sai hoặc kẹt. Quen quy trình → áp dụng nhanh trong vài phút.
> - *"Edge case ở bước 6 nghĩ sao cho đủ?"* → 4 nhóm thường: (1) empty/null, (2) 1 phần tử, (3) trùng lặp / toàn giống nhau, (4) cực to / cực bé. Thực hành nhiều sẽ tự nhớ.

> **⚠ Lỗi thường gặp** — Bỏ bước 2 (ví dụ cụ thể) và bước 6 (test edge case). Đây là 2 bước người mới hay skip vì "nghĩ trong đầu là đủ". Sai — nghĩ trong đầu rất dễ bỏ sót case (vd quên empty string), và bug edge case là loại bug khó tìm nhất sau khi đã code xong.

> **🔁 Tự kiểm tra mục 4**
> <details><summary>Câu hỏi: Trong 6 bước, bước nào quan trọng nhất với bài toán bạn chưa từng gặp?</summary>
>
> **Bước 1 (hiểu đề) và Bước 2 (ví dụ cụ thể)**. Nếu hiểu sai đề thì 4 bước sau dù đẹp đến đâu cũng sai. Ví dụ cụ thể là cách kiểm tra "tôi có hiểu đề không" — nếu nghĩ không ra ví dụ, có nghĩa chưa hiểu.
> </details>

> **📝 Tóm tắt mục 4**
> - 6 bước: Hiểu đề → Ví dụ → Pattern → Pseudocode → Code → Test edge case.
> - Bài đơn giản đi qua nhanh, bài khó đi từ từ — nhưng không bỏ bước nào.
> - Edge case ≠ bonus. Nó là cách phát hiện bug TRƯỚC khi user phát hiện.

## 5. Bốn antipattern cần tránh

> **💡 Trực giác** — Antipattern là *cái bẫy tư duy* mà 9/10 người mới bước vào. Biết trước → tránh được → tiết kiệm hàng trăm giờ trong sự nghiệp.

### 5.1 Antipattern #1 — "Đọc code lướt qua rồi nghĩ đã hiểu"

**Triệu chứng:** Bạn nhìn 50 dòng code, gật gù 2 phút, đóng file, nghĩ "ok mình hiểu rồi". Đến khi cần sửa thì... không sửa được.

**Vì sao sai:** Đọc bằng mắt không trace được luồng dữ liệu. Não tự "lấp đầy" những chỗ không hiểu bằng giả định, đôi khi sai.

**Cách khắc phục:** **Trace bằng tay với input cụ thể.** Lấy một input, đi qua từng dòng, ghi giá trị biến vào tờ giấy hoặc comment. Sau 10 phút trace, bạn hiểu hơn 10 lần đọc lướt.

Ví dụ: thấy đoạn code này:

\`\`\`
function f(arr):
    r = []
    for i in range(len(arr)):
        if i > 0 and arr[i] != arr[i-1]:
            r.append(arr[i])
    return r
\`\`\`

Đọc lướt → "à, lọc trùng". Trace với \`arr = [1, 1, 2, 2, 3]\`:

\`\`\`
i=0: i > 0? No → skip
i=1: arr[1]=1, arr[0]=1 → bằng nhau → skip
i=2: arr[2]=2, arr[1]=1 → khác → r = [2]
i=3: arr[3]=2, arr[2]=2 → bằng → skip
i=4: arr[4]=3, arr[3]=2 → khác → r = [2, 3]
return [2, 3]
\`\`\`

Khác kết quả "lọc trùng" (expected \`[1, 2, 3]\`) — thiếu phần tử đầu! Đây là **bug**, không phải feature. Đọc lướt không bao giờ thấy.

### 5.2 Antipattern #2 — "Code ngay, không pseudocode"

**Triệu chứng:** Đọc xong đề, tay đặt lên bàn phím, gõ liên tục 30 phút. Sau đó kẹt vì không biết bug ở đâu — code đã quá dài.

**Vì sao sai:** Code mang theo cả gánh nặng syntax. Khi syntax đúng nhưng logic sai, rất khó tìm chỗ sai vì bạn không có "ground truth" để so.

**Cách khắc phục:** 5 phút pseudocode → 30 phút code đúng, thay vì 0 phút pseudocode → 2 tiếng code sai + sửa. Khi bug xảy ra, so code với pseudocode → tìm ra dòng nào lệch.

### 5.3 Antipattern #3 — "Copy code không hiểu"

**Triệu chứng:** Tìm Google → tìm thấy đoạn code Stack Overflow → copy paste → chạy được → next. Vài tuần sau bug đến → bó tay vì không biết code đó hoạt động ra sao.

**Vì sao sai:** Code copy chạy được không có nghĩa nó *đúng* cho trường hợp của bạn. Stack Overflow trả lời cho bối cảnh khác, có thể có edge case không khớp. Hơn nữa, không hiểu code → không debug được khi nó hỏng.

**Cách khắc phục:** 3 mức cho phép:

1. ✅ Copy + **đọc hiểu từng dòng** + trace với 1 ví dụ + comment lại bằng lời mình.
2. ⚠ Copy mà **chưa hiểu nhưng đã hiểu chung** + đánh dấu TODO đọc kỹ sau.
3. ❌ Copy mà **không hiểu gì** + để vậy luôn. Đây là cái bẫy.

Có Copilot / AI giờ càng nguy hiểm hơn: code ra rất nhanh, đọc không hiểu cũng compile được. Quy tắc bảo vệ: **đoạn nào không giải thích được cho người khác, đoạn đó coi như chưa tồn tại**.

### 5.4 Antipattern #4 — "Tránh debug, đoán + sửa"

**Triệu chứng:** Code không chạy → đổi ngẫu nhiên 1 dòng → chạy lại → vẫn không chạy → đổi dòng khác → lặp 2 tiếng vẫn không xong.

**Vì sao sai:** Đoán không có hệ thống → không học được gì từ mỗi lần thử. Đôi khi "fix" bằng cách che lấp triệu chứng, để lại bug nặng hơn về sau.

**Cách khắc phục:** Mỗi lần code sai, hỏi 3 câu:

1. *Tôi expect gì?* (Nói cụ thể: "khi input là [1,2,3], output phải là 6")
2. *Tôi thấy gì thật sự?* (In ra: "thấy output là 9")
3. *Hai cái khác nhau ở đâu, ở dòng nào?* (Thêm log để khoanh vùng.)

Khi đã trả lời 3 câu, bug thường tự lộ ra. Đây là **debug có hệ thống** thay vì đoán mò. Lesson 04 sẽ đi sâu kỹ thuật debug.

> **❓ Câu hỏi tự nhiên**
> - *"Tôi mới học, hiểu hết code rất chậm — vẫn nên copy đôi chỗ?"* → OK nếu copy cho phần ngoài lề (vd format chuỗi, regex phức tạp) và mark TODO. KHÔNG OK nếu copy phần *logic chính* của bài bạn đang giải.
> - *"AI gợi ý cả 1 hàm — có nên dùng?"* → Dùng được, nhưng đọc kỹ + trace với 1-2 input trước khi commit. AI sai nhỏ rất tự tin, không cảnh báo bạn.

> **⚠ Lỗi thường gặp** — Người mới thường **chỉ bị 1 trong 4** antipattern và nghĩ "tôi không bị". Thực tế thường bị ≥ 2. Đọc lại 4 cái này sau mỗi tháng để tự đánh giá.

> **🔁 Tự kiểm tra mục 5**
> <details><summary>Câu hỏi: Antipattern nào gây hậu quả nặng nhất về dài hạn?</summary>
>
> **#3 (copy không hiểu)** — vì nó tích lũy nợ kỹ thuật âm thầm. Mỗi lần copy không hiểu là một "vùng đen" trong codebase mà bạn không thể debug. Khi bug xảy ra ở đó (chắc chắn sẽ có), bạn không có vũ khí gì.
> </details>

> **📝 Tóm tắt mục 5**
> - #1 Đọc lướt → trace bằng tay.
> - #2 Code ngay → pseudocode trước.
> - #3 Copy không hiểu → đọc + trace + comment lại.
> - #4 Đoán + sửa → "expect gì, thấy gì, khác ở đâu".

## 6. Bài tập

Mỗi bài làm trước, sau đó so với lời giải ở mục 7. **Đừng đọc lời giải trước.**

### Bài tập 1 — Pseudocode kiểm tra số chẵn

Viết pseudocode cho hàm \`laSoChan(n)\` trả về \`true\` nếu \`n\` là số chẵn, \`false\` nếu lẻ. Yêu cầu:

- Xử lý cả số âm (vd −4 là chẵn).
- Trace với 3 input: 4, 7, −10.

### Bài tập 2 — Decompose "ứng dụng nhắn tin (như Zalo)"

Decompose ứng dụng nhắn tin thành **ít nhất 6 bài toán con** ở mức "đủ nhỏ để hình dung 1 người làm được trong 1-2 tuần". Với mỗi bài con, viết 1-2 câu mô tả input/output hoặc behavior.

### Bài tập 3 — Pattern matching: tìm pattern chung

Đọc 3 đoạn pseudocode dưới. Cả 3 cùng thuộc 1 pattern. Pattern đó là gì?

**Pseudocode A:**
\`\`\`
count = 0
với mỗi đơn_hàng trong danh_sách_đơn:
    nếu đơn_hàng.giá > 1000000:
        count = count + 1
trả về count
\`\`\`

**Pseudocode B:**
\`\`\`
tổng = 0
với mỗi điểm trong điểm_thi:
    nếu điểm >= 5:
        tổng = tổng + 1
trả về tổng
\`\`\`

**Pseudocode C:**
\`\`\`
n = 0
với mỗi dòng trong log_file:
    nếu dòng chứa "ERROR":
        n = n + 1
trả về n
\`\`\`

### Bài tập 4 — Trace bằng tay

Cho pseudocode tìm max:

\`\`\`
max = list[0]
với mỗi i từ 1 đến độ_dài(list) - 1:
    nếu list[i] > max:
        max = list[i]
trả về max
\`\`\`

Trace với \`list = [3, 1, 4, 1, 5, 9, 2, 6]\`. Mỗi vòng ghi ra: \`i\`, \`list[i]\`, \`max trước\`, \`max sau\`.

### Bài tập 5 — Áp dụng quy trình 6 bước

Bài toán: **"Đảo ngược một chuỗi"** (vd \`"hello"\` → \`"olleh"\`).

Đi qua đủ 6 bước:

1. Diễn đạt lại đề bằng lời mình.
2. Cho ít nhất 3 ví dụ input → output (bao gồm edge case).
3. Bài này thuộc pattern nào?
4. Viết pseudocode.
5. (Chưa cần code Go — bạn chưa học. Bỏ qua bước này hoặc viết bằng ngôn ngữ bạn đã quen.)
6. Test với các ví dụ bước 2.

## 7. Lời giải chi tiết

### Lời giải bài 1

**Pseudocode:**

\`\`\`
hàm laSoChan(n):
    # số chẵn = chia hết cho 2, bất kể dấu
    # dùng phép modulo, nhưng cẩn thận với số âm
    # quy ước trong toán học: -4 chia 2 dư 0 → chẵn
    nếu n % 2 == 0:
        trả về true
    ngược lại:
        trả về false
\`\`\`

**Trace:**

| n | n % 2 | Output |
|---|---|---|
| 4 | 0 | true ✓ |
| 7 | 1 | false ✓ |
| −10 | 0 | true ✓ |

> Chú ý: trong một số ngôn ngữ lập trình (như C, Go), \`-10 % 2 = 0\` đúng. Nhưng \`-7 % 2 = -1\` (không phải 1) — đây là bẫy của số âm. Vì ta chỉ check \`== 0\` nên không bị ảnh hưởng. Đây là kiểu phải hỏi ở Bước 1 (hiểu đề) lúc làm thật.

### Lời giải bài 2

Một decompose hợp lý (có thể có nhiều phương án đúng):

1. **Đăng ký / đăng nhập** — số điện thoại + OTP, lưu tài khoản.
2. **Tìm và thêm bạn bè** — tìm theo SĐT / username, gửi lời mời, chấp nhận.
3. **Danh sách hội thoại (chat list)** — hiện các cuộc chat gần đây, sắp xếp theo thời gian message cuối.
4. **Cửa sổ chat 1-1** — gửi text, hiện lịch sử, đánh dấu đã đọc.
5. **Gửi ảnh/file** — chọn từ máy, upload lên server, hiện preview trong chat.
6. **Nhóm chat** — tạo nhóm, thêm thành viên, tin nhắn broadcast.
7. **Notification push** — khi user nhận tin mới ngoài app, đẩy notification về máy.
8. **Tìm kiếm tin nhắn cũ** — tìm theo từ khoá trong lịch sử chat.
9. **Cài đặt / profile** — đổi avatar, tên hiển thị, password.
10. **Encryption đầu cuối** — mã hoá tin nhắn để server không đọc được. (Phức tạp.)

10 bài này, mỗi bài còn decompose tiếp được. Ví dụ "Cửa sổ chat 1-1" → UI message bubbles + scroll + load thêm tin cũ + gửi tin mới + nhận tin realtime (websocket) + retry khi mất mạng...

### Lời giải bài 3

Cả 3 cùng pattern: **"Đếm phần tử thoả điều kiện"** (biến thể của Aggregate).

Bộ khung chung:

\`\`\`
count = 0
với mỗi item trong collection:
    nếu condition(item):
        count = count + 1
trả về count
\`\`\`

A đếm đơn hàng > 1tr, B đếm điểm thi ≥ 5, C đếm dòng log có "ERROR" — khác \`condition\`, giống mọi thứ còn lại.

Khi gặp bài *thứ 4* cùng pattern, bạn sẽ nhận ra ngay → không cần nghĩ lại từ đầu.

### Lời giải bài 4

Trace với \`list = [3, 1, 4, 1, 5, 9, 2, 6]\`:

| i | list[i] | max trước | So sánh | max sau |
|:--:|:--:|:--:|:--:|:--:|
| (init) | — | — | max = list[0] = 3 | 3 |
| 1 | 1 | 3 | 1 > 3? Không | 3 |
| 2 | 4 | 3 | 4 > 3? Có | 4 |
| 3 | 1 | 4 | 1 > 4? Không | 4 |
| 4 | 5 | 4 | 5 > 4? Có | 5 |
| 5 | 9 | 5 | 9 > 5? Có | 9 |
| 6 | 2 | 9 | 2 > 9? Không | 9 |
| 7 | 6 | 9 | 6 > 9? Không | 9 |

**Kết quả: 9.** Đúng — max của list \`[3, 1, 4, 1, 5, 9, 2, 6]\` là 9.

### Lời giải bài 5

**Bước 1 — Hiểu đề:**

> Cho một chuỗi. Tôi cần đọc nó từ phải qua trái và xây chuỗi mới, hoặc tương đương: hoán đổi ký tự đầu với cuối, thứ 2 với thứ 2-từ-cuối, v.v.

Câu hỏi cần làm rõ:

- Chuỗi rỗng → trả về rỗng.
- Chuỗi 1 ký tự → trả về chính nó.
- Ký tự Unicode (tiếng Việt có dấu, emoji) — đơn giản hoá: chỉ ASCII trước.

**Bước 2 — Ví dụ:**

| Input | Output |
|---|---|
| \`"hello"\` | \`"olleh"\` |
| \`"a"\` | \`"a"\` |
| \`""\` | \`""\` |
| \`"ab"\` | \`"ba"\` |
| \`"abcba"\` (palindrome) | \`"abcba"\` |

**Bước 3 — Pattern:** Đây là **Transform** — input list (chuỗi là list ký tự) → output list cùng độ dài. Cách thực hiện cụ thể là đọc ngược.

**Bước 4 — Pseudocode (2 cách):**

*Cách 1 — Tạo chuỗi mới bằng cách nối từ cuối:*

\`\`\`
ket_qua = ""
với i từ độ_dài(s) - 1 xuống 0:
    ket_qua = ket_qua + s[i]
trả về ket_qua
\`\`\`

*Cách 2 — Hoán đổi tại chỗ (in-place swap):*

\`\`\`
arr = chuyển s thành mảng ký tự
left = 0
right = độ_dài(arr) - 1
khi left < right:
    swap arr[left] và arr[right]
    left = left + 1
    right = right - 1
trả về chuyển arr về chuỗi
\`\`\`

Cách 2 nhanh hơn (không tạo nhiều chuỗi tạm), nhưng phức tạp hơn. Người mới chọn Cách 1.

**Bước 6 — Test:**

Với \`"hello"\` (cách 1):

\`\`\`
i=4: s[4]='o' → ket_qua = "o"
i=3: s[3]='l' → ket_qua = "ol"
i=2: s[2]='l' → ket_qua = "oll"
i=1: s[1]='e' → ket_qua = "olle"
i=0: s[0]='h' → ket_qua = "olleh" ✓
\`\`\`

Edge case:

- \`""\` → vòng lặp không chạy (độ dài − 1 = −1, không có i ≥ 0) → trả về \`""\` ✓.
- \`"a"\` → i=0, ket_qua = "a" → trả về "a" ✓.
- \`"ab"\` → i=1: "b", i=0: "ba" → "ba" ✓.
- \`"abcba"\` → "a"+"b"+"c"+"b"+"a" = "abcba" ✓.

Cả 5 case pass. Xong.

## 8. Code & Minh hoạ

Lesson này **không có \`solutions.go\`** (chưa học Go). Code Go preview trong README chỉ để bạn thấy ánh xạ từ pseudocode → Go thật khi đến Tier 1.

Mở [\`visualization.html\`](./visualization.html) để thực hành với 3 module tương tác:

1. **Decompose Tool** — nhập một bài toán to (vd "Build Tinder"), xem cách AI tách thành các bài toán con từng bước.
2. **Pseudocode Runner** — chọn 1 trong 3 bài (BMI / đếm từ / palindrome), nhập input, xem trace từng dòng pseudocode.
3. **6-Step Walkthrough** — đi từng bước qua bài "đếm ký tự trong chuỗi", thấy output cụ thể mỗi bước.

## Bài tiếp theo

[Lesson 02 — Môi trường dev & Git](../lesson-02-dev-environment-git/README.md) — setup OS, editor, terminal, Git workflow. Sau khi có tư duy, bạn cần *công cụ làm việc*.
`;
