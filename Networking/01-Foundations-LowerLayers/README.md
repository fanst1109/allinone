# Tầng 1 — Foundations & Lower Layers (Nền tảng & tầng dưới)

Xây nền: hiểu mạng được tổ chức thành các tầng ra sao, dữ liệu đi từ bit trên dây thành khung Ethernet, được đánh địa chỉ bằng IP, định tuyến qua các router, rồi vận chuyển tin cậy bằng TCP hoặc nhanh-gọn bằng UDP. Sau tầng này bạn lần được hành trình một gói tin từ máy này tới máy kia.

## Mục tiêu tổng quát

- Giải thích mô hình OSI 7 lớp và TCP/IP 4 lớp; mô tả đóng gói (encapsulation) qua từng tầng.
- Hiểu tầng liên kết: khung (frame), địa chỉ MAC, vai trò switch, miền va chạm/quảng bá.
- Đọc và tính địa chỉ IPv4, mặt nạ mạng, CIDR; chia mạng con (subnetting).
- Giải thích định tuyến: bảng định tuyến, longest-prefix match, static vs dynamic.
- Nắm vai trò ARP, ICMP, DHCP, NAT — vì sao mạng thật cần chúng.
- Đối chiếu IPv6 với IPv4 và vì sao cần IPv6.
- Phân biệt UDP và TCP; mô tả bắt tay 3 bước, cửa sổ trượt, điều khiển tắc nghẽn.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-layered-models/) | Mô hình phân tầng | OSI 7 lớp, TCP/IP 4 lớp, encapsulation |
| [Lesson 02](./lesson-02-link-ethernet/) | Tầng liên kết & Ethernet | Frame, MAC, switch, miền va chạm |
| [Lesson 03](./lesson-03-ip-subnetting/) | Địa chỉ IP & subnetting | IPv4, CIDR, mặt nạ mạng, chia subnet |
| [Lesson 04](./lesson-04-routing/) | Định tuyến | Bảng định tuyến, longest-prefix, static/dynamic |
| [Lesson 05](./lesson-05-arp-icmp-dhcp-nat/) | ARP, ICMP, DHCP, NAT | Các giao thức "keo dán" |
| [Lesson 06](./lesson-06-ipv6/) | IPv6 | Địa chỉ 128-bit, đối chiếu IPv4 |
| [Lesson 07](./lesson-07-udp/) | Tầng giao vận: UDP | Port, datagram, không tin cậy |
| [Lesson 08](./lesson-08-tcp/) | Tầng giao vận: TCP | Bắt tay 3 bước, cửa sổ trượt, tắc nghẽn |

## Sau tầng này

Sang **Tầng 2 — Application & Services**: lên tới các giao thức bạn dùng hằng ngày (DNS, HTTP, TLS) chạy trên nền TCP/IP vừa học.

## Liên kết chéo

- Nhị phân/hex cho địa chỉ IP & subnet ↔ `../../DataFoundations/`.
- Tầng vật lý (tín hiệu, mã hóa đường truyền) ↔ `../../Electronics/` và `../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/`.
- TCP/UDP làm nền cho socket ↔ `../02-Application-Services/lesson-01-client-server-sockets/`.
</content>
