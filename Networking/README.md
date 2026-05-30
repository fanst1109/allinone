# Networking — Mạng máy tính

Lộ trình **mạng máy tính** từ bit trên dây tới request HTTP và hạ tầng web quy mô lớn. 3 tầng × 8 bài = 24 bài, đi từ mô hình phân tầng và IP/TCP tới DNS/HTTP/TLS rồi an ninh, không dây, cloud và công cụ chẩn đoán.

## Triết lý

- **Thấy được trước, đào sâu sau**: bắt đầu từ thứ quen thuộc (gõ một địa chỉ web, gói tin đi đâu) rồi mới bóc từng tầng.
- **Cụ thể bằng số thật**: subnet tính ra từng bit, cửa sổ TCP tính ra byte, độ trễ tính ra mili-giây — không dừng ở sơ đồ trừu tượng.
- **Trực giác đời thường**: gói tin ↔ lá thư có địa chỉ, router ↔ bưu cục phân loại, port ↔ số phòng trong tòa nhà, TCP ↔ cuộc gọi xác nhận, UDP ↔ thả thư không hồi báo.
- **Visualization tương tác**: tự tay chia subnet, xem bắt tay 3 bước TCP, lần theo một gói qua các router, bóc tách khung Ethernet.

## 3 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Foundations & Lower Layers](./01-Foundations-LowerLayers/) | 🚧 Đang xây | Mô hình phân tầng, Ethernet/MAC, IP & subnetting, routing, ARP/ICMP/DHCP/NAT, IPv6, UDP, TCP |
| 2 | [Application & Services](./02-Application-Services/) | 🚧 Đang xây | Socket, DNS, HTTP/HTTPS, REST/cache, email & file, TLS, WebSocket, CDN/load balancer |
| 3 | [Advanced & Operations](./03-Advanced-Operations/) | 🚧 Đang xây | An ninh mạng, tấn công/phòng thủ, không dây, QoS, SDN, cloud networking, công cụ chẩn đoán, dự án |

## Đích đến

Sau 24 bài: hiểu trọn vẹn hành trình một gói tin từ ứng dụng xuống dây và ngược lại; chia được subnet, đọc được bảng định tuyến, giải thích bắt tay TCP và TLS; biết DNS/HTTP hoạt động ra sao; nắm các mối đe dọa mạng phổ biến và công cụ chẩn đoán — đủ nền cho môn Mạng máy tính đại học, phỏng vấn backend/DevOps, và tự vận hành hệ thống nhỏ.

## Cách học

1. Vào `01-Foundations-LowerLayers/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có `README.md` + `visualization.html` (+ `solutions.go` khi bạn yêu cầu).
3. Mở `Networking/01-Foundations-LowerLayers/index.html` để xem danh sách lesson dạng card.

## Liên kết chéo

- Biểu diễn nhị phân/hex cho IP & subnet ↔ `DataFoundations/`.
- TLS, MITM, chứng chỉ ↔ `Cryptography/`.
- Socket, HTTP server, client ↔ `Programming/`.
- Mạng phân tán, replication, CAP ↔ `Databases/`.
- Tầng vật lý (tín hiệu, mã hóa đường truyền) ↔ `Electronics/` và `Physics/02-Thermo-Electromagnetism/lesson-08-em-waves`.
</content>
