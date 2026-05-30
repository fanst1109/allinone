# Tầng 2 — Application & Services (Tầng ứng dụng & dịch vụ)

Lên tới các giao thức bạn dùng hằng ngày, chạy trên nền TCP/IP của Tầng 1. Từ mô hình client-server và socket, qua DNS (phân giải tên), HTTP/HTTPS (xương sống của web), email và truyền file, TLS (bảo mật truyền tải), tới real-time (WebSocket) và hạ tầng web quy mô lớn (CDN, load balancer). Sau tầng này bạn hiểu trọn vẹn điều gì xảy ra khi gõ một địa chỉ web và nhấn Enter.

## Mục tiêu tổng quát

- Mô tả mô hình client-server và lập trình socket (kết nối với `Programming/`).
- Giải thích DNS: phân cấp tên miền, đệ quy/lặp, bản ghi, caching.
- Phân tích HTTP: request/response, method, status code, header; và HTTPS.
- Hiểu HTTP nâng cao: REST, cookie/session, caching, HTTP/2 và HTTP/3 (QUIC).
- Nắm email (SMTP/IMAP/POP3) và truyền file (FTP/SFTP).
- Giải thích bắt tay TLS, vai trò chứng chỉ (kết nối `Cryptography/`).
- Phân biệt polling/long-polling/WebSocket cho real-time.
- Mô tả CDN, load balancer, proxy/reverse proxy trong hạ tầng web.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-client-server-sockets/) | Client-server & Socket | Mô hình giao tiếp, socket API |
| [Lesson 02](./lesson-02-dns/) | DNS | Phân cấp tên miền, bản ghi, cache |
| [Lesson 03](./lesson-03-http-basics/) | HTTP/HTTPS cơ bản | Method, status code, header |
| [Lesson 04](./lesson-04-http-advanced/) | HTTP nâng cao | REST, cookie, caching, HTTP/2-3 |
| [Lesson 05](./lesson-05-email-filetransfer/) | Email & truyền file | SMTP/IMAP/POP3, FTP/SFTP |
| [Lesson 06](./lesson-06-tls/) | TLS/SSL | Bắt tay TLS, chứng chỉ |
| [Lesson 07](./lesson-07-realtime-websocket/) | Real-time & WebSocket | Polling, push, streaming |
| [Lesson 08](./lesson-08-web-infrastructure/) | Hạ tầng web quy mô | CDN, load balancer, proxy |

## Sau tầng này

Sang **Tầng 3 — Advanced & Operations**: an ninh, không dây, QoS, SDN, cloud và công cụ vận hành mạng thực tế.

## Liên kết chéo

- Chạy trên nền TCP/IP ↔ `../01-Foundations-LowerLayers/lesson-08-tcp/`.
- Socket & HTTP server ↔ `../../Programming/`.
- TLS, chứng chỉ, mã hóa ↔ `../../Cryptography/`.
- Web quy mô & dữ liệu phân tán ↔ `../../Databases/`.
</content>
