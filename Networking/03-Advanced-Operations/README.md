# Tầng 3 — Advanced & Operations (Mạng nâng cao & vận hành)

Từ "mạng chạy được" sang "mạng an toàn, hiệu năng cao, vận hành được". An ninh mạng (firewall, VPN), các kiểu tấn công và phòng thủ, mạng không dây, chất lượng dịch vụ (QoS), mạng định nghĩa bằng phần mềm (SDN) và ảo hóa, mạng đám mây, và bộ công cụ chẩn đoán thực chiến. Kết thúc bằng dự án lần theo một request từ trình duyệt tới server qua toàn bộ ngăn xếp đã học.

## Mục tiêu tổng quát

- Mô tả firewall, VPN, IDS/IPS và phân vùng mạng (DMZ).
- Phân tích các tấn công phổ biến (DDoS, MITM, spoofing, port scan) và biện pháp phòng thủ.
- Giải thích mạng không dây WiFi (802.11): cơ chế truy nhập, kênh, bảo mật.
- Hiểu QoS: trễ, jitter, băng thông, mất gói, traffic shaping.
- Mô tả SDN (tách control/data plane), VLAN, mạng overlay.
- Nắm mạng đám mây: VPC, subnet, security group, gateway.
- Sử dụng công cụ chẩn đoán: ping, traceroute, netstat, Wireshark.
- Tổng hợp: lần theo trọn vẹn một request HTTP qua mọi tầng.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-network-security/) | An ninh mạng | Firewall, VPN, IDS/IPS, DMZ |
| [Lesson 02](./lesson-02-attacks-defense/) | Tấn công & phòng thủ | DDoS, MITM, spoofing, port scan |
| [Lesson 03](./lesson-03-wireless/) | Mạng không dây | WiFi 802.11, kênh, bảo mật |
| [Lesson 04](./lesson-04-qos/) | QoS & quản lý lưu lượng | Trễ, jitter, băng thông, shaping |
| [Lesson 05](./lesson-05-sdn-virtualization/) | SDN & ảo hóa mạng | Control/data plane, VLAN, overlay |
| [Lesson 06](./lesson-06-cloud-networking/) | Mạng đám mây | VPC, subnet, security group |
| [Lesson 07](./lesson-07-diagnostic-tools/) | Công cụ chẩn đoán | ping, traceroute, netstat, Wireshark |
| [Lesson 08](./lesson-08-project/) | Dự án tổng hợp | Lần theo 1 request qua toàn bộ ngăn xếp |

## Sau tầng này

Hoàn tất lộ trình mạng máy tính. Bạn có nền để học sâu hơn: an ninh mạng chuyên sâu (pentest), kỹ thuật mạng nhà cung cấp (BGP, MPLS), hoặc hạ tầng cloud-native (Kubernetes networking, service mesh).

## Liên kết chéo

- An ninh, MITM, mã hóa ↔ `../../Cryptography/`.
- Tấn công web & dịch vụ ↔ `../02-Application-Services/`.
- Mạng cloud & dữ liệu phân tán ↔ `../../Databases/`.
- Mạng không dây (sóng vô tuyến) ↔ `../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/`.
</content>
