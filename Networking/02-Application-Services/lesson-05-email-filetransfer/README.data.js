// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Networking/02-Application-Services/lesson-05-email-filetransfer/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Email & Truyền file

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu kiến trúc hệ thống email: các thành phần MUA, MTA, MDA và luồng gửi thư A→B qua nhiều server.
- Nắm các lệnh giao thức SMTP (Simple Mail Transfer Protocol — giao thức truyền thư đơn giản) và biết đọc một phiên SMTP thực tế.
- Phân biệt IMAP và POP3: khi nào dùng cái nào và tại sao.
- Hiểu định dạng email và MIME (Multipurpose Internet Mail Extensions — mở rộng đa mục đích cho thư internet) cho phép đính kèm file và nội dung đa phần.
- Nắm cơ chế xác thực email SPF/DKIM/DMARC để chống spam.
- Hiểu FTP và các chế độ active/passive; biết tại sao SFTP/FTPS an toàn hơn FTP thuần.

## Kiến thức tiền đề

- [Lesson 01 — Client-Server & Sockets](../lesson-01-client-server-sockets/) — mô hình client/server, khái niệm socket (ổ cắm mạng), cổng (port).
- [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) — request/response, header, mã trạng thái.

---

## 1. Kiến trúc hệ thống email

### 1.1. Ba thành phần cốt lõi

💡 **Hình dung**: hệ thống email giống dịch vụ bưu chính. Bạn viết thư tại nhà (MUA), đưa lên bưu cục gần nhất (MTA gửi), bưu cục chuyển qua nhiều trạm (MTA trung gian), đến bưu cục gần người nhận (MTA nhận), thư nằm trong hộp thư (MDA), và người nhận lấy thư từ hộp (MUA nhận).

| Thành phần | Tên đầy đủ | Vai trò | Ví dụ phần mềm |
|------------|------------|---------|----------------|
| **MUA** | Mail User Agent — tác nhân người dùng thư | Soạn, gửi, đọc thư | Thunderbird, Outlook, Gmail web |
| **MTA** | Mail Transfer Agent — tác nhân truyền thư | Nhận thư từ MUA hoặc MTA khác và chuyển tiếp đến đích | Postfix, Sendmail, Exchange |
| **MDA** | Mail Delivery Agent — tác nhân phân phối thư | Nhận thư từ MTA và đặt vào hộp thư của người nhận | Dovecot, Procmail |

**Vì sao tách MTA và MDA?**

MTA chỉ "chuyển vận" — không quan tâm đến việc lưu trữ. MDA chuyên lo việc phân loại và lưu thư vào đúng hộp thư. Cách chia này cho phép thay thế từng thành phần độc lập (vd dùng Postfix làm MTA nhưng Dovecot làm MDA).

### 1.2. Luồng email từ A đến B

Giả sử \`alice@gmail.com\` gửi thư cho \`bob@company.vn\`:

\`\`\`
[MUA Alice]  ──SMTP──▶  [MTA gmail.com]  ──SMTP──▶  [MTA company.vn]  ──Giao nội bộ──▶  [MDA]  ──IMAP/POP3──▶  [MUA Bob]
  (Gmail web)               port 587                     port 25                           (Dovecot)              (Outlook)
\`\`\`

**Từng bước**:

1. Alice nhấn "Gửi" trong Gmail web (MUA) → Gmail gửi thư qua SMTP đến \`smtp.gmail.com:587\`.
2. MTA của Gmail tra cứu DNS record \`MX\` (Mail Exchange) của \`company.vn\` → tìm ra địa chỉ IP của mail server \`mail.company.vn\`.
3. Gmail MTA kết nối TCP tới \`mail.company.vn:25\` và giao thư qua SMTP.
4. MTA của \`company.vn\` nhận thư, giao cho MDA, MDA đặt thư vào hộp thư của \`bob\`.
5. Bob mở Outlook (MUA), Outlook kết nối tới \`mail.company.vn\` qua IMAP hoặc POP3 để tải thư.

❓ **Câu hỏi tự nhiên**:

- *"Thư có thể đi qua nhiều MTA hơn không?"* — Có, đặc biệt khi có relay. Mỗi MTA thêm một dòng \`Received:\` vào header, cho phép truy vết đường đi.
- *"Nếu MTA đích không phản hồi thì sao?"* — MTA gửi sẽ thử lại nhiều lần (thường mỗi 15-30 phút trong tối đa 4-5 ngày). Nếu vẫn thất bại, người gửi nhận email "bounce" thông báo giao hàng thất bại.
- *"Thư có bị đọc lén khi đi qua MTA trung gian không?"* — Nếu không dùng TLS (Transport Layer Security), thư truyền dưới dạng văn bản thuần và có thể bị nghe lén. Ngày nay hầu hết MTA dùng STARTTLS (mã hóa nâng cấp).

### 📝 Tóm tắt mục 1

- MUA: giao diện người dùng (Outlook, Gmail). MTA: chuyển thư giữa các server (Postfix). MDA: lưu thư vào hộp (Dovecot).
- Luồng: MUA → MTA gửi (587) → DNS MX → MTA nhận (25) → MDA → MUA nhận (IMAP/POP3).
- Mỗi MTA thêm một dòng \`Received:\` vào header — có thể truy vết toàn bộ đường đi.

---

## 2. SMTP — Giao thức gửi thư

### 2.1. SMTP là gì và vai trò

**SMTP (Simple Mail Transfer Protocol)** là giao thức dùng để **gửi** email giữa các server và từ MUA đến MTA đầu tiên. Ra đời năm 1982 (RFC 821), được cập nhật năm 2008 (RFC 5321).

💡 **Hình dung**: SMTP như người đưa thư gõ cửa bưu cục và đọc to địa chỉ người gửi, người nhận rồi nộp thư. Bưu cục (server) trả lời "OK" hoặc "Địa chỉ không tồn tại".

**Cổng (port)**:
- **Port 25**: giao tiếp giữa MTA và MTA (server-to-server relay). Nhiều ISP chặn cổng này từ mạng gia đình để hạn chế spam.
- **Port 587**: gửi thư từ MUA đến MTA (submission). Yêu cầu xác thực (username + password).
- **Port 465**: SMTP over SSL/TLS (ít dùng hơn, đã bị thay bởi STARTTLS trên 587).

**Vì sao SMTP chỉ để GỬI?**

SMTP là giao thức "push" — nó đẩy thư từ nơi này sang nơi khác. Nó không có cơ chế để client hỏi "hộp thư tôi có thư mới không?" hoặc "liệt kê tất cả thư trong Inbox". Đó là lý do cần IMAP và POP3 (xem mục 3).

### 2.2. Các lệnh SMTP cơ bản

| Lệnh | Ý nghĩa | Ví dụ |
|------|---------|-------|
| \`HELO\` / \`EHLO\` | Chào server, giới thiệu tên máy. \`EHLO\` (Extended HELLO) dùng cho SMTP mở rộng | \`EHLO mail.alice.com\` |
| \`MAIL FROM\` | Khai báo địa chỉ người gửi (envelope sender) | \`MAIL FROM:<alice@gmail.com>\` |
| \`RCPT TO\` | Khai báo địa chỉ người nhận. Gọi nhiều lần nếu gửi cho nhiều người | \`RCPT TO:<bob@company.vn>\` |
| \`DATA\` | Bắt đầu nhập nội dung thư. Kết thúc bằng dòng chỉ có dấu chấm \`.\` | \`DATA\` → nội dung → \`.\` |
| \`QUIT\` | Kết thúc phiên, đóng kết nối | \`QUIT\` |
| \`STARTTLS\` | Nâng cấp kết nối sang TLS (mã hóa) | \`STARTTLS\` |
| \`AUTH LOGIN\` | Xác thực người dùng (trên port 587) | \`AUTH LOGIN\` |

**Mã phản hồi của server**:

| Mã | Ý nghĩa |
|----|---------|
| \`220\` | Server sẵn sàng |
| \`250\` | Lệnh thực hiện thành công |
| \`354\` | Bắt đầu nhập nội dung thư |
| \`221\` | Đóng kết nối |
| \`550\` | Người nhận không tồn tại |
| \`421\` | Server bận, thử lại sau |
| \`530\` | Yêu cầu xác thực trước |

### 2.3. Walk-through — Phiên SMTP hoàn chỉnh

Alice (\`alice@gmail.com\`) gửi thư cho Bob (\`bob@company.vn\`). Dưới đây là toàn bộ hội thoại TCP giữa MTA của Gmail và MTA của company.vn:

\`\`\`
# Kết nối TCP từ gmail.com đến mail.company.vn:25
# Server phản hồi trước (không cần client gửi gì):
S: 220 mail.company.vn ESMTP Postfix ready

# Client giới thiệu tên:
C: EHLO mail.google.com
S: 250-mail.company.vn Hello mail.google.com
S: 250-SIZE 52428800
S: 250-STARTTLS
S: 250 HELP

# Nâng cấp sang TLS:
C: STARTTLS
S: 220 Ready to start TLS
# [Bắt tay TLS diễn ra ở đây — kết nối mã hóa từ đây trở đi]

# Sau TLS, EHLO lại một lần nữa:
C: EHLO mail.google.com
S: 250-mail.company.vn Hello mail.google.com [again after TLS]
S: 250 SIZE 52428800

# Khai báo người gửi:
C: MAIL FROM:<alice@gmail.com>
S: 250 Ok

# Khai báo người nhận:
C: RCPT TO:<bob@company.vn>
S: 250 Ok

# Bắt đầu gửi nội dung:
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>

# Nội dung thư (bao gồm header + body):
C: From: Alice <alice@gmail.com>
C: To: Bob <bob@company.vn>
C: Subject: Chào Bob!
C: Date: Fri, 30 May 2026 08:00:00 +0700
C: Message-ID: <abc123@mail.google.com>
C: MIME-Version: 1.0
C: Content-Type: text/plain; charset=UTF-8
C:
C: Xin chào Bob,
C: Đây là email thử nghiệm.
C:
C: -- Alice
C: .
S: 250 Ok: queued as 7AB3F1234

# Kết thúc phiên:
C: QUIT
S: 221 Bye
\`\`\`

**Điểm quan trọng cần chú ý**:

- Server nói trước (220), client nói sau.
- Có **2 lớp địa chỉ**: envelope (\`MAIL FROM\`/\`RCPT TO\`) và header (\`From:\`/\`To:\` trong DATA). Hai lớp này có thể khác nhau — đây là cơ chế cho phép gửi thay mặt (on behalf of) và cũng là lỗ hổng cho spam.
- Dòng kết thúc DATA là một dấu chấm trên dòng riêng: \`\\r\\n.\\r\\n\`.
- \`Message-ID\` là định danh duy nhất của thư — quan trọng cho threading (chuỗi thư phúc đáp).

⚠ **Lỗi thường gặp**:

- **Nhầm envelope với header**: \`MAIL FROM\` trong SMTP envelope là địa chỉ dùng để định tuyến và báo lỗi bounce — có thể khác với \`From:\` trong header email mà người dùng nhìn thấy. Spammer lợi dụng điều này để giả mạo sender.
- **Quên dòng chấm kết thúc DATA**: nếu nội dung thư thực sự có một dòng chỉ gồm dấu chấm, phải escape thành \`..\` (hai chấm).

🔁 **Dừng lại tự kiểm tra**:

Câu hỏi: Trong phiên SMTP trên, bước nào là quan trọng nhất về bảo mật? Tại sao?

<details>
<summary>Xem đáp án</summary>

Bước \`STARTTLS\`. Trước khi có TLS, toàn bộ nội dung thư (bao gồm username/password nếu có xác thực) truyền dưới dạng văn bản thuần có thể bị nghe lén. Sau STARTTLS, kết nối được mã hóa. Tuy nhiên TLS chỉ bảo vệ **trong quá trình truyền** (transport security) — không bảo vệ thư khi nằm trên server. Để bảo vệ đầu-cuối cần dùng PGP hoặc S/MIME.

</details>

### 📝 Tóm tắt mục 2

- SMTP là giao thức "push" chỉ dùng để **gửi** thư. Không có cơ chế lấy thư (đó là việc của IMAP/POP3).
- Port 25: server-to-server. Port 587: MUA gửi thư (yêu cầu xác thực).
- Thứ tự lệnh: \`EHLO\` → \`STARTTLS\` → \`EHLO\` → \`MAIL FROM\` → \`RCPT TO\` → \`DATA\` → \`.\` → \`QUIT\`.
- Envelope address (\`MAIL FROM\`) có thể khác header address (\`From:\`) — nguồn gốc của vấn đề giả mạo.

---

## 3. IMAP vs POP3 — Giao thức nhận thư

### 3.1. Vì sao cần giao thức riêng để nhận thư?

SMTP chỉ biết "đẩy" thư từ A đến B. Khi thư đã được đặt vào hộp thư trên server (bởi MDA), người dùng cần một giao thức khác để **lấy** thư về. Có hai giao thức phổ biến: IMAP và POP3.

💡 **Hình dung**:
- **POP3** như đến bưu cục, lấy hết thư về nhà. Bưu cục xóa bản lưu. Về đến nhà mới đọc được.
- **IMAP** như thuê một tủ hồ sơ ở bưu cục. Bạn có thể xem, sắp xếp, đánh dấu thư tại chỗ. Dùng điện thoại hay máy tính bảng đều thấy cùng trạng thái.

### 3.2. POP3 — Post Office Protocol version 3

**POP3** (RFC 1939) là giao thức đơn giản: kết nối → xác thực → tải thư về → tùy chọn xóa trên server → ngắt kết nối.

**Cổng**: 110 (thuần), 995 (POP3S — qua SSL/TLS).

**Phiên POP3 điển hình**:

\`\`\`
S: +OK POP3 server ready
C: USER bob@company.vn
S: +OK
C: PASS mysecretpassword
S: +OK Bob's mailbox has 3 messages (4200 octets)
C: LIST
S: +OK 3 messages:
S: 1 1500
S: 2 900
S: 3 1800
S: .
C: RETR 1
S: +OK 1500 octets
S: [nội dung thư #1]
S: .
C: DELE 1
S: +OK message 1 deleted
C: QUIT
S: +OK POP3 server signing off
\`\`\`

**Đặc điểm**:
- Thư được tải về client và thường **xóa trên server** (trừ khi cấu hình "keep on server").
- Trạng thái thư (đã đọc/chưa đọc, folder) chỉ tồn tại trên client → không đồng bộ giữa nhiều thiết bị.
- Phù hợp khi: chỉ dùng một thiết bị, muốn offline access, cần tiết kiệm dung lượng server.

### 3.3. IMAP — Internet Message Access Protocol

**IMAP** (RFC 3501, IMAP4rev1) là giao thức phong phú hơn: thư luôn ở trên server, client đồng bộ trạng thái.

**Cổng**: 143 (thuần), 993 (IMAPS — qua SSL/TLS).

**Khả năng nổi bật so với POP3**:
- Thư nằm trên server — xem từ điện thoại và laptop đều thấy cùng nội dung.
- Hỗ trợ folder phía server (Inbox, Sent, Spam, Trash...).
- Tìm kiếm thư **trên server** — không cần tải hết về mới tìm được.
- Flags (cờ trạng thái): \`\\Seen\`, \`\\Answered\`, \`\\Flagged\`, \`\\Deleted\`, \`\\Draft\` — đồng bộ qua mọi thiết bị.
- Chỉ tải header để hiển thị danh sách thư, tải body khi người dùng mở thư — tiết kiệm băng thông.

**Phiên IMAP điển hình (tóm tắt)**:

\`\`\`
S: * OK IMAP4rev1 server ready
C: A001 LOGIN bob@company.vn mysecretpassword
S: A001 OK LOGIN completed
C: A002 SELECT INBOX
S: * 3 EXISTS
S: * 2 RECENT
S: A002 OK [READ-WRITE] SELECT completed
C: A003 FETCH 1 (FLAGS BODY[HEADER.FIELDS (FROM SUBJECT DATE)])
S: * 1 FETCH (FLAGS (\\Seen) BODY[HEADER.FIELDS (FROM SUBJECT DATE)] {85}
S: From: Alice <alice@gmail.com>
S: Subject: Chào Bob!
S: Date: Fri, 30 May 2026 08:00:00 +0700
S: )
S: A003 OK FETCH completed
C: A004 LOGOUT
S: * BYE IMAP4rev1 Server logging out
S: A004 OK LOGOUT completed
\`\`\`

**Điểm đặc biệt**: mỗi lệnh IMAP có **tag** (A001, A002...) để client ghép phản hồi đúng với lệnh. Điều này cho phép **pipeline** nhiều lệnh đồng thời — hiệu quả hơn POP3.

### 3.4. Bảng so sánh IMAP vs POP3

| Tiêu chí | IMAP | POP3 |
|----------|------|------|
| Thư lưu ở đâu | Server (luôn) | Client (sau khi tải) |
| Đồng bộ nhiều thiết bị | Có — smartphone, laptop cùng thấy | Không — mỗi thiết bị thấy khác nhau |
| Trạng thái đã đọc/chưa đọc | Đồng bộ trên server | Chỉ cục bộ |
| Folder trên server | Có (Inbox, Sent, Spam...) | Không |
| Tìm kiếm | Tìm trên server, nhanh | Phải tải về mới tìm |
| Offline access | Hạn chế (cần cấu hình cache) | Tốt (thư đã tải về) |
| Tốn dung lượng server | Nhiều (thư ở mãi trên server) | Ít (thư tải về, xóa server) |
| Port mặc định | 143 / 993 (TLS) | 110 / 995 (TLS) |
| Phù hợp cho | Dùng nhiều thiết bị, email công việc | Một thiết bị, muốn backup local |

❓ **Câu hỏi tự nhiên**:

- *"Tại sao Gmail, Outlook 365 đều dùng IMAP?"* — Vì đây là ứng dụng đa thiết bị. Bạn mở email trên điện thoại, ngay lập tức máy tính cũng thấy thư đã đọc. POP3 không thể làm điều này.
- *"POP3 có còn được dùng không?"* — Ngày càng ít. Vẫn còn trong một số hệ thống cũ hoặc trường hợp cần lưu trữ email về local để lưu trữ lâu dài.
- *"IMAP có mã hóa không?"* — Bản thân IMAP là plaintext. Phải dùng IMAPS (port 993) hoặc STARTTLS trên port 143 để mã hóa.

⚠ **Lỗi thường gặp**:

- **Nhầm port IMAP và SMTP**: IMAP nhận thư (143/993), SMTP gửi thư (587/25). Cấu hình sai port là lý do phổ biến nhất khiến email client không hoạt động.
- **Dùng POP3 rồi ngạc nhiên khi điện thoại không thấy thư đã xóa trên máy tính**: POP3 không đồng bộ — mỗi thiết bị có bản sao riêng.

### 📝 Tóm tắt mục 3

- POP3: tải về và xóa; đơn giản; không đồng bộ đa thiết bị; port 110/995.
- IMAP: thư trên server; đồng bộ đa thiết bị; hỗ trợ folder và search; port 143/993.
- Ngày nay IMAP là lựa chọn mặc định cho phần lớn ứng dụng email.

---

## 4. Định dạng email và MIME

### 4.1. Cấu trúc một email

Email gồm hai phần: **header** (tiêu đề) và **body** (nội dung), phân cách bằng một dòng trống.

**Header phổ biến**:

| Header | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| \`From\` | Địa chỉ người gửi (hiển thị cho người dùng) | \`From: Alice <alice@gmail.com>\` |
| \`To\` | Người nhận chính | \`To: Bob <bob@company.vn>\` |
| \`Cc\` | Carbon copy — nhận bản sao, địa chỉ hiển thị | \`Cc: Charlie <charlie@example.com>\` |
| \`Bcc\` | Blind carbon copy — nhận bản sao, địa chỉ ẩn | \`Bcc: eve@hacker.net\` |
| \`Subject\` | Tiêu đề thư | \`Subject: Báo cáo tháng 5\` |
| \`Date\` | Thời điểm gửi (RFC 5322) | \`Date: Fri, 30 May 2026 08:00:00 +0700\` |
| \`Message-ID\` | Định danh duy nhất toàn cầu | \`Message-ID: <abc@mail.gmail.com>\` |
| \`In-Reply-To\` | Message-ID của thư đang trả lời | \`In-Reply-To: <xyz@mail.google.com>\` |
| \`Received\` | Thêm bởi mỗi MTA khi chuyển tiếp | \`Received: from smtp.gmail.com...\` |
| \`MIME-Version\` | Phiên bản MIME | \`MIME-Version: 1.0\` |
| \`Content-Type\` | Loại nội dung | \`Content-Type: text/plain; charset=UTF-8\` |

### 4.2. MIME — Gửi đính kèm và nội dung đa phần

💡 **Hình dung**: SMTP được thiết kế ban đầu chỉ truyền văn bản ASCII 7-bit. MIME (RFC 2045) như một "hộp đóng gói vạn năng" — cho phép nhét file ảnh, PDF, UTF-8 tiếng Việt, thậm chí file nhị phân vào email bằng cách mã hóa Base64 (mã hóa base 64).

**Không dùng MIME**: chỉ gửi được văn bản ASCII — không có tiếng Việt, không có ảnh đính kèm.

**Với MIME**, email có thể chứa nhiều "phần" (part):

\`\`\`
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="----=_Part_1234"

------=_Part_1234
Content-Type: text/plain; charset=UTF-8

Xin chào Bob,
Tôi gửi kèm báo cáo.

------=_Part_1234
Content-Type: application/pdf; name="baocao.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="baocao.pdf"

JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZ...
[dữ liệu PDF đã mã hóa Base64]

------=_Part_1234--
\`\`\`

**Các loại \`Content-Type\` phổ biến**:

| Content-Type | Ý nghĩa |
|--------------|---------|
| \`text/plain\` | Văn bản thuần |
| \`text/html\` | Email HTML (có định dạng, màu sắc) |
| \`multipart/mixed\` | Nhiều phần kết hợp (body + đính kèm) |
| \`multipart/alternative\` | Nhiều phiên bản (plain + HTML, client chọn) |
| \`image/jpeg\`, \`image/png\` | Ảnh nhúng |
| \`application/pdf\` | File PDF |
| \`application/octet-stream\` | File nhị phân tổng quát |

**Content-Transfer-Encoding**:
- \`7bit\`: ASCII thuần (không encode).
- \`quoted-printable\`: cho text có ký tự đặc biệt — mã hóa từng ký tự non-ASCII thành \`=XX\`.
- \`base64\`: mã hóa nhị phân → ASCII 64 ký tự. Tăng kích thước ~33% nhưng an toàn qua mọi server.

### 4.3. SPF, DKIM, DMARC — Chống giả mạo email

Vì SMTP không có xác thực người gửi thực sự, spammer có thể gửi email giả vờ là từ \`bank@vietcombank.com\`. Ba cơ chế sau giải quyết vấn đề này:

**SPF (Sender Policy Framework — khung chính sách người gửi)**:

DNS record của \`gmail.com\` liệt kê danh sách IP được phép gửi thư thay mặt \`gmail.com\`. Server nhận kiểm tra IP thực của MTA gửi có trong danh sách không.

\`\`\`
vietcombank.com.  TXT  "v=spf1 include:_spf.google.com ip4:203.0.113.45 -all"
\`\`\`

→ Chỉ Google và IP \`203.0.113.45\` được gửi thư mang địa chỉ \`@vietcombank.com\`. \`-all\` có nghĩa: từ chối mọi nguồn khác.

**DKIM (DomainKeys Identified Mail — thư được xác nhận bằng khóa tên miền)**:

MTA gửi ký số (digital signature) vào header email bằng private key. MTA nhận lấy public key từ DNS của tên miền người gửi và xác minh chữ ký. Đảm bảo email không bị chỉnh sửa trong quá trình truyền.

\`\`\`
DKIM-Signature: v=1; a=rsa-sha256; d=gmail.com; s=20230601;
    h=from:to:subject:date;
    bh=BASE64_HASH_OF_BODY;
    b=BASE64_DIGITAL_SIGNATURE
\`\`\`

**DMARC (Domain-based Message Authentication, Reporting & Conformance)**:

Là "tổng chỉ huy" — định nghĩa chính sách cho SPF và DKIM: nếu cả hai đều thất bại thì làm gì (từ chối, cách ly, hay vẫn nhận)?

\`\`\`
_dmarc.vietcombank.com. TXT "v=DMARC1; p=reject; rua=mailto:dmarc@vietcombank.com"
\`\`\`

→ \`p=reject\`: từ chối email giả mạo. \`rua\`: gửi báo cáo về địa chỉ này.

❓ **Câu hỏi tự nhiên**:

- *"Nếu có đủ SPF+DKIM+DMARC, email có hoàn toàn an toàn không?"* — Không. Ba cơ chế này bảo vệ **tên miền** (domain spoofing). Kẻ tấn công vẫn có thể mua tên miền trông giống (\`v1etcombank.com\`) rồi cấu hình SPF/DKIM hợp lệ. Người dùng vẫn cần đọc kỹ địa chỉ.
- *"Tại sao nhiều email spam vẫn vào được Inbox?"* — Vì SPF/DKIM hợp lệ không đảm bảo nội dung không phải spam. Bộ lọc spam còn phân tích nội dung, hành vi gửi, reputation của IP...

### 📝 Tóm tắt mục 4

- Email = header (From, To, Subject, Date...) + dòng trống + body.
- MIME cho phép đa phần: văn bản + đính kèm, mỗi phần có Content-Type riêng. Nhị phân encode bằng base64.
- SPF: kiểm tra IP người gửi qua DNS. DKIM: chữ ký số đảm bảo tính toàn vẹn. DMARC: chính sách xử lý khi SPF/DKIM thất bại.

---

## 5. Truyền file — FTP, SFTP, FTPS

### 5.1. FTP — File Transfer Protocol

**FTP** (RFC 959) ra đời năm 1971, là giao thức truyền file qua mạng. Điểm đặc biệt nhất: FTP dùng **hai kết nối TCP riêng biệt**:

💡 **Hình dung**: FTP như một cửa hàng có hai quầy. Quầy 1 (kênh điều khiển) để nói chuyện — yêu cầu file nào, thư mục nào. Quầy 2 (kênh dữ liệu) để thực sự trao file. Hai quầy hoạt động song song.

| Kênh | Port | Mục đích |
|------|------|---------|
| **Control channel** (kênh điều khiển) | **21** | Gửi lệnh FTP và nhận phản hồi. Duy trì suốt phiên làm việc |
| **Data channel** (kênh dữ liệu) | **20** (active) hoặc ngẫu nhiên (passive) | Thực sự truyền file hoặc liệt kê thư mục |

**Vì sao dùng 2 kênh?** Thiết kế ban đầu cho phép kênh điều khiển luôn mở (ra lệnh bất cứ lúc nào) trong khi kênh dữ liệu chỉ mở khi thực sự cần truyền. Điều này cũng cho phép truyền nhiều file liên tiếp mà không đóng phiên.

### 5.2. FTP Active Mode vs Passive Mode

Đây là điểm phức tạp và gây nhầm lẫn nhất của FTP.

**Active Mode (chế độ chủ động)**:

\`\`\`
Client (port 1025)  ────────────  Server (port 21)   [Control channel]
Client (port 1026)  ◀─────────  Server (port 20)    [Data channel — SERVER mở về phía client]
\`\`\`

1. Client kết nối port 21 của server (control channel).
2. Client gửi lệnh \`PORT 192,168,1,10,4,1\` → báo server: "mở kết nối dữ liệu về địa chỉ 192.168.1.10 port 1025" (4×256+1=1025).
3. **Server chủ động mở kết nối TCP từ port 20 của nó về phía client.**

**Vấn đề**: Nếu client ở sau NAT (Network Address Translation — dịch địa chỉ mạng) hoặc firewall, server không thể kết nối vào. Firewall của nhiều công ty mặc định chặn kết nối từ ngoài vào.

**Passive Mode (chế độ bị động)**:

\`\`\`
Client (port 1025)  ────────────  Server (port 21)    [Control channel]
Client (port 1026)  ────────────  Server (port 2048)  [Data channel — CLIENT mở về phía server]
\`\`\`

1. Client kết nối port 21 của server (control channel).
2. Client gửi lệnh \`PASV\` → server phản hồi \`227 Entering Passive Mode (10,0,0,1,8,0)\` → server đang chờ tại port 2048 (8×256+0).
3. **Client chủ động mở kết nối dữ liệu đến server (port 2048).**

**Lợi ích**: Client luôn chủ động mở cả hai kết nối → không bị firewall/NAT phía client chặn.

**Khi nào dùng gì?**:
- Active: ít dùng, chỉ khi client là server hoặc có control hoàn toàn cả hai đầu.
- **Passive: mặc định cho trình duyệt và FTP client hiện đại** vì client thường ở sau NAT.

### 5.3. Các lệnh FTP cơ bản

| Lệnh | Ý nghĩa |
|------|---------|
| \`USER <name>\` | Đăng nhập với tên người dùng |
| \`PASS <password>\` | Mật khẩu |
| \`LIST\` | Liệt kê thư mục (tương tự \`ls\`) |
| \`RETR <file>\` | Tải file từ server về (retrieve) |
| \`STOR <file>\` | Upload file lên server (store) |
| \`CWD <dir>\` | Đổi thư mục (change working directory) |
| \`PWD\` | In thư mục hiện tại |
| \`PASV\` | Chuyển sang passive mode |
| \`QUIT\` | Đóng phiên |

**Ví dụ phiên FTP ngắn**:

\`\`\`
S: 220 FTP server ready
C: USER ftpuser
S: 331 Password required
C: PASS secret123
S: 230 User logged in
C: PASV
S: 227 Entering Passive Mode (192,168,1,100,8,7) → port = 8×256+7 = 2055
C: LIST
[Client mở TCP đến 192.168.1.100:2055]
S: 150 Opening ASCII mode data connection
[Server gửi danh sách file qua kênh dữ liệu]
S: 226 Transfer complete
C: RETR report.pdf
S: 125 Data connection already open; Transfer starting
[File được truyền qua kênh dữ liệu]
S: 226 Transfer complete
C: QUIT
S: 221 Goodbye
\`\`\`

### 5.4. Nhược điểm bảo mật của FTP

⚠ **FTP là giao thức hoàn toàn không an toàn**:

- **Mật khẩu gửi dưới dạng plaintext**: lệnh \`PASS secret123\` truyền nguyên văn — bất kỳ ai nghe lén trên mạng đều đọc được.
- **Dữ liệu không mã hóa**: file đang truyền có thể bị nghe lén và đọc hoàn toàn.
- **Không xác thực server**: không biết server đang kết nối có phải là server thật không (man-in-the-middle attack).
- **Vấn đề firewall**: kênh dữ liệu dùng port động khó cấu hình firewall.

### 5.5. SFTP và FTPS — Truyền file an toàn

**SFTP (SSH File Transfer Protocol — giao thức truyền file qua SSH)**:

SFTP **không phải FTP qua SSL** — đây là một giao thức hoàn toàn khác, chạy trên nền SSH (Secure Shell — giao diện dòng lệnh bảo mật).

- **Port**: 22 (cùng port với SSH).
- **Một kênh duy nhất**: không có vấn đề kênh dữ liệu riêng biệt như FTP.
- **Xác thực**: dùng SSH key hoặc password (qua kênh đã mã hóa).
- **Mã hóa toàn bộ**: cả lệnh lẫn dữ liệu đều mã hóa bằng SSH.
- **Xác thực server**: server có host key — client cảnh báo nếu host key thay đổi (phát hiện MITM).
- **Phổ biến nhất** trong Linux sysadmin, CI/CD pipeline.

**FTPS (FTP Secure — FTP bảo mật)**:

FTPS là FTP với lớp TLS/SSL. Có hai biến thể:
- **Explicit FTPS (FTPS-E)**: client kết nối cổng FTP thông thường (21) rồi yêu cầu nâng cấp TLS bằng lệnh \`AUTH TLS\`. Giống STARTTLS trong SMTP.
- **Implicit FTPS (FTPS-I)**: kết nối thẳng vào cổng 990 — TLS được thiết lập ngay từ đầu.

FTPS vẫn giữ kiến trúc hai kênh (control + data) của FTP, nên vẫn có vấn đề firewall/NAT.

### 5.6. So sánh FTP, SFTP, FTPS

| Tiêu chí | FTP | SFTP | FTPS |
|----------|-----|------|------|
| Mã hóa | Không | SSH (mạnh) | TLS/SSL (mạnh) |
| Số kênh TCP | 2 (control + data) | 1 | 2 (control + data, cả hai mã hóa) |
| Port | 21 + động | 22 | 21 + động (hoặc 990) |
| Xác thực server | Không | Có (host key) | Có (TLS certificate) |
| Vấn đề NAT/firewall | Có (passive mode giảm bớt) | Không | Có (giống FTP) |
| Phổ biến hiện nay | Giảm dần | Rất phổ biến | Dùng khi cần tương thích FTP |
| Dựa trên | RFC 959 | SSH-2 | FTP + TLS |

❓ **Câu hỏi tự nhiên**:

- *"SCP (Secure Copy) có phải SFTP không?"* — Không. SCP là lệnh \`scp\` chạy trên SSH để copy file, nhưng không có tính năng SFTP đầy đủ (liệt kê thư mục, resume...). SFTP là giao thức con đầy đủ hơn.
- *"Tại sao FTP vẫn còn tồn tại?"* — Vì hệ thống cũ (legacy system), một số hosting rẻ tiền, và người dùng quen thuộc chưa chuyển đổi. Về nguyên tắc, mọi FTP server hiện đại nên chuyển sang SFTP hoặc FTPS.

🔁 **Dừng lại tự kiểm tra**:

Câu hỏi: Trong công ty có firewall cho phép client ra ngoài internet nhưng chặn kết nối từ ngoài vào client. FTP Active hay Passive mode sẽ hoạt động? Tại sao?

<details>
<summary>Xem đáp án</summary>

**Passive mode** sẽ hoạt động. Lý do: trong passive mode, client luôn chủ động mở cả kênh điều khiển (→ port 21 server) và kênh dữ liệu (→ port ngẫu nhiên của server). Firewall chặn kết nối từ ngoài vào không ảnh hưởng vì client không bao giờ nhận kết nối inbound.

Trong Active mode, server phải mở kết nối dữ liệu từ port 20 của server về phía client. Firewall chặn kết nối inbound sẽ block kết nối này → Active mode thất bại.

</details>

### 📝 Tóm tắt mục 5

- FTP dùng 2 kênh TCP: control (port 21) và data (port 20 hoặc động). Active: server mở kết nối data về client. Passive: client mở cả hai → ưu tiên dùng passive khi có NAT/firewall.
- FTP không mã hóa: plaintext mật khẩu và dữ liệu — không dùng cho dữ liệu nhạy cảm.
- SFTP: giao thức riêng qua SSH (port 22), một kênh, mã hóa hoàn toàn — lựa chọn ưu tiên ngày nay.
- FTPS: FTP + TLS, vẫn hai kênh, phù hợp khi cần tương thích với hệ thống FTP cũ.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **Gửi email từ app nghe đơn giản nhưng đầy bẫy: mail vào spam, SPF/DKIM/DMARC, và "đừng tự chạy mail server".**

| Khái niệm | Thực tế dev |
|-----------|-------------|
| **SMTP** | Giao thức gửi mail; app thường gọi qua dịch vụ, không tự nói SMTP |
| **SPF/DKIM/DMARC** | Xác thực domain gửi → tránh vào spam, chống giả mạo |
| **Dịch vụ gửi mail** | SendGrid/SES/Postmark — đừng tự chạy mail server |
| **File transfer** | SFTP (an toàn) thay FTP; cloud dùng S3/object storage + presigned URL |

### 6.1. Ví dụ cụ thể — vì sao mail app vào spam

App gửi mail "quên mật khẩu" nhưng user không nhận (vào spam/bị chặn). Nguyên nhân: thiếu **SPF** (DNS record khai "server nào được gửi thay domain tôi"), **DKIM** (chữ ký số xác thực mail không bị sửa), **DMARC** (chính sách khi SPF/DKIM fail). Gmail/Outlook chấm điểm mail thiếu mấy cái này = spam. Giải pháp thực tế: dùng **dịch vụ gửi mail** (SendGrid, AWS SES, Postmark) — họ lo SPF/DKIM, IP reputation, retry, bounce handling. **Tự chạy mail server** (Postfix) = ác mộng: IP bị blacklist, vào spam, bảo trì khổ → gần như luôn sai lựa chọn cho app.

> ⚠ **Bẫy: FTP/email không mã hóa + tự host.** (1) **FTP** truyền plaintext (cả password) → dùng **SFTP** (qua SSH) hoặc FTPS. (2) Cloud: đừng dùng FTP server, dùng **object storage** (S3) + **presigned URL** (link tạm có hạn để upload/download an toàn không lộ credential). (3) **Email injection**: nhét \`\\r\\n\` vào field From/Subject từ input user → giả header/gửi spam → sanitize input. (4) Đừng nhúng credential SMTP trong code ([nối config/secret](../../../Programming/lesson-78-config-management/)).

### 6.2. 📝 Tóm tắt mục 6

- Gửi mail app: dùng **dịch vụ** (SendGrid/SES/Postmark), KHÔNG tự chạy mail server (IP reputation/spam/bảo trì).
- **SPF/DKIM/DMARC** (DNS) bắt buộc để mail không vào spam + chống giả mạo domain.
- File transfer: **SFTP** thay FTP (FTP plaintext), cloud dùng S3 + **presigned URL**; sanitize chống email injection.

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Sắp xếp theo đúng thứ tự các lệnh trong một phiên SMTP để gửi email từ \`sender@example.com\` đến \`recipient@test.org\`:

\`\`\`
(a) DATA
(b) RCPT TO:<recipient@test.org>
(c) QUIT
(d) MAIL FROM:<sender@example.com>
(e) EHLO mailserver.example.com
(f) .  (dòng chỉ gồm dấu chấm, kết thúc DATA)
\`\`\`

**Bài 2**: Công ty A có nhân viên dùng cả laptop lẫn điện thoại để đọc email, và cần mọi thư được lưu trên server công ty ít nhất 1 năm để kiểm toán. Nên cấu hình IMAP hay POP3? Giải thích.

**Bài 3**: Một email có header sau:

\`\`\`
Received: from mail.attacker.com by mail.company.vn
MAIL FROM (envelope): hacker@attacker.com
From (header): support@vietcombank.com
\`\`\`

a) Người nhận nhìn thấy địa chỉ nào trong email client của họ?
b) SPF sẽ kiểm tra địa chỉ nào để xác minh? Kết quả sẽ thế nào?

**Bài 4**: Mô tả chi tiết điều gì xảy ra khi client FTP ở sau NAT dùng Active mode, cụ thể:
- Client IP (private): 192.168.1.50, port 1026
- NAT external IP: 203.0.113.10
- FTP server IP: 10.0.0.5

Lệnh \`PORT\` client gửi là gì? Server sẽ kết nối về đâu? Vấn đề gì xảy ra?

**Bài 5**: So sánh vì sao SFTP an toàn hơn FTP về 4 khía cạnh: (a) mật khẩu, (b) dữ liệu, (c) xác thực server, (d) firewall.

**Bài 6 (nâng cao)**: Email từ \`alice@alice.com\` gửi đến \`bob@bob.com\`. DNS record của \`alice.com\` có:
\`\`\`
alice.com. TXT "v=spf1 ip4:1.2.3.4 -all"
\`\`\`
MTA gửi thực sự có IP \`5.6.7.8\`. DKIM signature trong email bị sửa và không hợp lệ. DMARC của \`alice.com\` là \`p=reject\`.

Điều gì sẽ xảy ra với email này tại MTA của \`bob.com\`?

---

### Lời giải chi tiết

**Bài 1 — Thứ tự lệnh SMTP**:

Đáp án đúng: **(e) → (d) → (b) → (a) → (f) → (c)**

Giải thích từng bước:
1. **(e) EHLO mailserver.example.com** — Bước đầu tiên bắt buộc: giới thiệu tên máy client với server.
2. **(d) MAIL FROM:<sender@example.com>** — Khai báo envelope sender. Phải đến trước RCPT TO.
3. **(b) RCPT TO:<recipient@test.org>** — Khai báo người nhận. Có thể gọi nhiều lần nếu gửi nhiều người.
4. **(a) DATA** — Sau khi khai báo xong envelope, bắt đầu nhập nội dung. Server trả về mã \`354\`.
5. **(f) .** — Kết thúc phần DATA. Đây là dòng chỉ gồm dấu chấm \`\\r\\n.\\r\\n\`. Server trả \`250 Ok\`.
6. **(c) QUIT** — Đóng phiên. Server trả \`221 Bye\`.

Lưu ý: giữa bước (e) và (d) thường có thêm \`STARTTLS\` và một lần \`EHLO\` nữa sau TLS, nhưng đề bài không liệt kê các lệnh này.

---

**Bài 2 — IMAP hay POP3?**

**Đáp án: IMAP**.

Giải thích:
- **Yêu cầu 1 — đa thiết bị**: IMAP lưu thư trên server, mọi thiết bị (laptop, điện thoại) đều thấy cùng trạng thái thư (đã đọc, folder, nhãn). POP3 tải về từng thiết bị riêng biệt → laptop đọc thư thì điện thoại vẫn thấy là "chưa đọc" → không đáp ứng yêu cầu.
- **Yêu cầu 2 — lưu thư trên server 1 năm**: IMAP mặc định giữ thư trên server vô thời hạn (trừ khi người dùng xóa). POP3 thường xóa thư sau khi tải → không đảm bảo thư còn trên server để kiểm toán.

Cấu hình thêm: server cần đủ dung lượng, và nên có chính sách backup server-side.

---

**Bài 3 — Envelope vs Header address**:

**(a)** Người nhận nhìn thấy **địa chỉ header** \`From: support@vietcombank.com\` trong email client (Outlook, Gmail...). Email client không hiển thị SMTP envelope mà người dùng thường không biết đến.

Đây là kỹ thuật phishing phổ biến: SMTP envelope là \`hacker@attacker.com\` (địa chỉ thật), nhưng header \`From:\` giả mạo là \`support@vietcombank.com\`.

**(b)** SPF kiểm tra **envelope sender** (\`MAIL FROM\`) — tức là \`hacker@attacker.com\`. SPF sẽ tra DNS của \`attacker.com\` để xem IP của \`mail.attacker.com\` có được phép gửi thư cho \`@attacker.com\` không. Nếu \`attacker.com\` có SPF record hợp lệ cho IP đó → SPF **pass**.

Vì SPF pass (attacker gửi đúng từ domain của họ), email có thể qua được SPF. DKIM mới phát hiện vấn đề: chữ ký DKIM của \`vietcombank.com\` trong email không hợp lệ (vì hacker không có private key của Vietcombank) → DKIM fail. Nếu DMARC của \`vietcombank.com\` là \`p=reject\`, email này sẽ bị từ chối.

---

**Bài 4 — FTP Active mode sau NAT**:

**Lệnh PORT client gửi**: Client (192.168.1.50) muốn nhận data trên port 1026.
\`\`\`
PORT 192,168,1,50,4,2
\`\`\`
Giải mã: IP = 192.168.1.50; port = 4×256+2 = 1026.

**Vấn đề**: Server nhận lệnh PORT và thấy địa chỉ \`192.168.1.50:1026\` — đây là **địa chỉ private** trong mạng nội bộ của client. Server (10.0.0.5) không thể kết nối đến địa chỉ private 192.168.1.50 từ internet vì địa chỉ này không định tuyến được qua internet.

Ngay cả nếu client đã báo IP public \`203.0.113.10\`, NAT của client phải được cấu hình port forwarding để forward cổng 1026 về 192.168.1.50:1026. Firewall thường chặn kết nối inbound → **kết nối dữ liệu thất bại**, lệnh \`LIST\` hay \`RETR\` trả lỗi.

**Giải pháp**: Dùng Passive mode — client sẽ tự mở kết nối đến server, NAT không cần port forwarding.

---

**Bài 5 — SFTP an toàn hơn FTP**:

**(a) Mật khẩu**:
- FTP: lệnh \`PASS secret123\` truyền plaintext. Nghe lén bằng Wireshark trên cùng mạng → đọc được ngay.
- SFTP: toàn bộ kết nối SSH đã mã hóa trước khi trao đổi bất kỳ thông tin nào. Mật khẩu hoặc key không bao giờ đi trên mạng dưới dạng plaintext. Tốt hơn nữa: có thể dùng SSH key pair (public/private key) thay mật khẩu hoàn toàn.

**(b) Dữ liệu**:
- FTP: file truyền qua kênh dữ liệu không mã hóa. Sniff traffic → đọc được nội dung file.
- SFTP: file truyền trong kênh SSH đã mã hóa (AES-256 hoặc tương đương). Không thể đọc được dù capture traffic.

**(c) Xác thực server**:
- FTP: không có cơ chế xác minh server. Kẻ tấn công có thể giả mạo FTP server (MITM).
- SFTP: khi kết nối lần đầu, SSH lưu \`host key\` của server. Lần sau nếu host key thay đổi, SSH cảnh báo ngay → phát hiện MITM hoặc server bị thay thế.

**(d) Firewall**:
- FTP: cần mở nhiều port (21 + range port động cho kênh dữ liệu passive, hoặc port 20 inbound cho active). Cấu hình firewall phức tạp.
- SFTP: chỉ cần một port duy nhất là 22. Firewall rule đơn giản hơn rất nhiều.

---

**Bài 6 — SPF fail + DKIM fail + DMARC reject**:

**Phân tích từng bước**:

1. **SPF**: MTA gửi có IP \`5.6.7.8\`, nhưng SPF record của \`alice.com\` chỉ cho phép \`1.2.3.4\`. → **SPF FAIL**.

2. **DKIM**: chữ ký trong email bị sửa và không hợp lệ. → **DKIM FAIL**.

3. **DMARC**: policy là \`p=reject\`. Điều kiện reject được kích hoạt khi cả SPF lẫn DKIM đều thất bại (và không align với domain \`alice.com\`).

**Kết quả**: MTA của \`bob.com\` sẽ **từ chối email** (trả mã 5xx cho MTA gửi) và không giao vào hộp thư của Bob. Tùy cấu hình, MTA của \`bob.com\` có thể gửi báo cáo DMARC failure về địa chỉ \`rua\` được ghi trong DMARC record của \`alice.com\`.

Email này sẽ không bao giờ đến tay Bob.

---

## Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 01 — Client-Server & Sockets](../lesson-01-client-server-sockets/) — mô hình client/server, TCP connections.
- **Bài tiếp theo**: [Lesson 06 — TLS/SSL](../lesson-06-tls/) — mã hóa truyền thông, nền tảng cho SMTPS, IMAPS, FTPS và HTTPS.
- **Liên quan**: [Lesson 03 — HTTP cơ bản](../lesson-03-http-basics/) — HTTP cũng dùng cấu trúc header/body tương tự email.

---

## 📝 Tổng kết Lesson 05

1. **Kiến trúc email**: MUA (client) → MTA (gửi, port 587) → DNS MX → MTA (nhận, port 25) → MDA → MUA (nhận, IMAP/POP3). Mỗi MTA thêm dòng \`Received:\`.
2. **SMTP**: giao thức push chỉ để GỬI. Thứ tự: \`EHLO → MAIL FROM → RCPT TO → DATA → . → QUIT\`. Port 587 cho submission, port 25 cho relay. Envelope address ≠ header address.
3. **IMAP vs POP3**: IMAP giữ thư trên server, đồng bộ đa thiết bị (port 143/993). POP3 tải về và xóa, không đồng bộ (port 110/995). Chọn IMAP cho môi trường đa thiết bị.
4. **MIME**: cho phép đính kèm file và nội dung đa phần qua multipart boundary và base64 encoding. SPF/DKIM/DMARC là ba lớp bảo vệ chống giả mạo tên miền.
5. **FTP**: hai kênh (control port 21 + data). Active: server mở kết nối về client (gặp vấn đề NAT). Passive: client mở cả hai (ưu tiên). FTP không mã hóa → dùng SFTP (SSH, port 22, một kênh) hoặc FTPS (FTP+TLS) cho môi trường thực tế.
`;
