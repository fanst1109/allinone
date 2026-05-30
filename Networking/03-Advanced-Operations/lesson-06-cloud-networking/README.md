# Lesson 06 — Mạng đám mây (Cloud Networking)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao hạ tầng mạng đám mây khác biệt căn bản so với mạng truyền thống (ảo hóa, tự phục vụ, co giãn).
- Nắm khái niệm **region** và **availability zone (AZ)** — tác động tới độ trễ và chịu lỗi.
- Thiết kế **VPC (Virtual Private Cloud)**: chia CIDR block, public subnet vs private subnet.
- Cấu hình **định tuyến trong VPC**: route table, Internet Gateway, NAT Gateway.
- Phân biệt **Security Group** (stateful, gắn instance) và **Network ACL** (stateless, gắn subnet).
- Biết cách kết nối VPC với mạng khác: VPC peering, VPN, Direct Connect, load balancer.

## Kiến thức tiền đề

- [Lesson 03 — IP & Subnetting](../../01-Foundations-LowerLayers/lesson-03-ip-subnetting/) — CIDR, chia subnet, tính địa chỉ.
- [Lesson 05 — ARP, ICMP, DHCP, NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) — cách NAT hoạt động.
- [Lesson 01 — An ninh mạng](../lesson-01-network-security/) — firewall, phân vùng mạng DMZ.

---

## 1. Tại sao mạng đám mây khác mạng truyền thống?

💡 **Trực giác**: Hãy nghĩ tới sự khác nhau giữa mua xe hơi và thuê taxi. Mua xe = bạn mua phần cứng, cắm cáp, cấu hình switch/router vật lý. Thuê taxi (đám mây) = bạn nhấn nút, chọn kích cỡ, mạng xuất hiện trong vài giây — không có gì vật lý để chạm vào.

### 1.1. Ba đặc tính cốt lõi

**Ảo hóa hoàn toàn (Full Virtualization)**

Trong mạng đám mây, không có cáp vật lý giữa các máy ảo (VM). Switch, router, firewall đều là phần mềm chạy trong trung tâm dữ liệu của nhà cung cấp (AWS, Google Cloud, Azure...). Phần cứng vật lý bên dưới bị ẩn hoàn toàn.

Ví dụ thực: khi bạn tạo 2 VM trong cùng VPC, gói tin giữa chúng đi qua switch ảo (virtual switch) — không có dây vật lý nào, nhưng độ trễ chỉ khoảng 0.1–0.3 ms (thấp hơn nhiều so với giao tiếp qua internet).

**Tự phục vụ (Self-Service)**

Người dùng tự tạo, xóa, sửa hạ tầng mạng qua API hoặc giao diện web — không cần gọi kỹ sư mạng. Tạo một mạng con (subnet) 256 địa chỉ: vài click, hoàn thành trong 30 giây. Trong mạng truyền thống, việc tương đương có thể mất vài ngày (đặt thiết bị, chờ giao hàng, cấu hình...).

**Co giãn (Elasticity)**

Băng thông, số lượng instance, địa chỉ IP — tất cả có thể tăng/giảm ngay lập tức. Một dịch vụ thương mại điện tử vào ngày sale có thể cần 10× tài nguyên so với ngày thường; đám mây xử lý điều đó mà không cần mua thêm phần cứng.

❓ **Câu hỏi tự nhiên:**

- *"Nếu tất cả ảo hóa, bảo mật có kém hơn không?"* — Không nhất thiết. Nhà cung cấp đám mây tách biệt tài nguyên giữa các khách hàng (tenant isolation) bằng nhiều lớp. Bạn kiểm soát firewall ảo (Security Group, ACL) giống như kiểm soát firewall vật lý — thậm chí chi tiết hơn.
- *"Độ trễ có cao hơn phần cứng vật lý không?"* — Một chút (thường 0.1–0.5 ms thêm do lớp ảo hóa). Nhưng bù lại, bạn không có độ trễ "đặt máy chủ ở tầng hầm" nếu data center gần hơn văn phòng.

### 1.2. Region và Availability Zone

**Region (vùng)** là một vị trí địa lý riêng biệt của nhà cung cấp — ví dụ `ap-southeast-1` (Singapore), `us-east-1` (Bắc Virginia), `ap-northeast-1` (Tokyo). Mỗi region độc lập về điện, mạng, quản lý.

- Độ trễ từ Hà Nội đến `ap-southeast-1` (Singapore): ~30–50 ms.
- Độ trễ từ Hà Nội đến `us-east-1` (Bắc Virginia): ~200–250 ms.
- Độ trễ từ Hà Nội đến `ap-northeast-1` (Tokyo): ~60–80 ms.

→ **Chọn region gần người dùng nhất** để giảm độ trễ.

**Availability Zone (AZ)** là một hoặc nhiều data center vật lý trong cùng một region, cách nhau về nguồn điện, hệ thống làm mát, kết nối internet. Một region thường có 2–4 AZ (vd `ap-southeast-1a`, `ap-southeast-1b`, `ap-southeast-1c`).

💡 **Ý nghĩa AZ**: nếu bạn chạy app chỉ ở 1 AZ và data center đó mất điện (xảy ra ~2–3 lần/năm ở các cloud lớn), app chết. Triển khai ở 2+ AZ → nếu 1 AZ hỏng, AZ kia vẫn chạy. Điều này gọi là **thiết kế chịu lỗi (fault tolerance)**.

Độ trễ giữa 2 AZ trong cùng region: thường < 2 ms (kết nối cáp quang riêng).

⚠ **Lỗi thường gặp**: dùng 2 instance nhưng cả 2 cùng AZ — khi AZ đó hỏng, cả 2 chết. Phải để chúng ở các AZ khác nhau.

📝 **Tóm tắt mục 1:**
- Đám mây: ảo hóa hoàn toàn, tự phục vụ, co giãn.
- Region = vị trí địa lý; chọn region gần người dùng để giảm độ trễ.
- AZ = data center vật lý trong region; triển khai đa AZ để chịu lỗi.

---

## 2. VPC — Virtual Private Cloud

💡 **Trực giác**: VPC giống như bạn được trao một "khuôn viên riêng" (private campus) trong trung tâm dữ liệu khổng lồ của AWS/GCP. Bên trong khuôn viên đó, bạn tự vẽ bản đồ đường sá (định tuyến), dựng cổng vào (gateway), chia khu A/B/C (subnet). Từ bên ngoài, không ai vào được khuôn viên trừ khi bạn mở cổng.

### 2.1. Định nghĩa và cơ chế

**VPC** là mạng riêng ảo (virtual private network) được cô lập logic trong hạ tầng đám mây. Mỗi VPC gắn với một **CIDR block** — dải địa chỉ IP dùng nội bộ.

Dải địa chỉ khuyến nghị (RFC 1918 — dải private):
- `10.0.0.0/8` — 16,777,216 địa chỉ
- `172.16.0.0/12` — 1,048,576 địa chỉ
- `192.168.0.0/16` — 65,536 địa chỉ

Ví dụ thực: tạo VPC với CIDR `10.0.0.0/16`:
- Network address: `10.0.0.0`
- Broadcast: `10.0.255.255`
- Số địa chỉ: 2^16 = 65,536
- Có thể dùng cho host: 65,534 địa chỉ

(Xem lại cách tính: [Lesson 03 — IP & Subnetting](../../01-Foundations-LowerLayers/lesson-03-ip-subnetting/))

### 2.2. Subnet — chia nhỏ VPC

Từ CIDR của VPC, bạn chia thành các **subnet** nhỏ hơn. Mỗi subnet gắn với một **Availability Zone** cụ thể.

**Ví dụ chia subnet từ VPC `10.0.0.0/16`:**

| Subnet | CIDR | AZ | Địa chỉ | Host khả dụng |
|--------|------|----|---------|----------------|
| public-1a | `10.0.1.0/24` | ap-southeast-1a | 256 | 251* |
| public-1b | `10.0.2.0/24` | ap-southeast-1b | 256 | 251* |
| private-1a | `10.0.11.0/24` | ap-southeast-1a | 256 | 251* |
| private-1b | `10.0.12.0/24` | ap-southeast-1b | 256 | 251* |

*AWS giữ lại 5 địa chỉ mỗi subnet: network (`.0`), router (`.1`), DNS (`.2`), reserved (`.3`), broadcast (`.255`). Còn 256 - 5 = 251 địa chỉ cho instance.

**Tính cụ thể cho `10.0.1.0/24`:**
- Mask: `255.255.255.0`
- Network: `10.0.1.0`
- Router VPC: `10.0.1.1`
- DNS: `10.0.1.2`
- Reserved: `10.0.1.3`
- Host range: `10.0.1.4` — `10.0.1.254`
- Broadcast: `10.0.1.255`

### 2.3. Public subnet vs Private subnet

Sự khác biệt **không phải** nằm ở subnet tự nó — mà ở **route table** và **gateway** được gắn:

| Thuộc tính | Public subnet | Private subnet |
|------------|---------------|----------------|
| Route tới internet | Có (qua Internet Gateway) | Không |
| Instance có IP công khai? | Thường có (Elastic IP / Auto-assign) | Không — chỉ IP riêng |
| Ai truy cập được từ internet? | Có thể (nếu Security Group cho phép) | Không (không có đường ra/vào) |
| Dùng để làm gì? | Web server, load balancer, bastion host | Database server, app server nội bộ |

💡 **Tư duy phân tầng**: public subnet = "khu vực tiếp tân" (ai cũng vào được nếu có hẹn). Private subnet = "phòng máy chủ" (chỉ nhân viên nội bộ vào, không có lối đi từ đường phố thẳng vào).

🔁 **Dừng lại tự kiểm tra:**
- VPC `172.16.0.0/20` có bao nhiêu địa chỉ tổng? Bao nhiêu host?
<details>
<summary>Đáp án</summary>

`/20` → prefix 20 bit, host bits = 32 - 20 = 12 bit → 2^12 = **4096 địa chỉ**. Host khả dụng: 4096 - 2 (network + broadcast) = **4094**. Nếu AWS giữ 5 địa chỉ thì còn 4091.

</details>

📝 **Tóm tắt mục 2:**
- VPC = mạng riêng ảo, gắn CIDR block (dùng dải RFC 1918).
- Chia subnet từ CIDR VPC; mỗi subnet gắn 1 AZ.
- AWS giữ 5 địa chỉ/subnet; host khả dụng = 2^(32-prefix) - 5.
- Public subnet có route ra internet; private subnet chỉ giao tiếp nội bộ.

---

## 3. Định tuyến trong VPC

💡 **Trực giác**: Route table là "bảng chỉ đường" đặt tại mỗi ngã tư trong VPC. Gói tin đến, nhìn bảng: "đích `10.0.2.5` → đi theo đường nội bộ", "đích `203.0.113.10` → ra cổng Internet Gateway". Mỗi subnet có một route table — subnet public và private thường có route table khác nhau vì đường đi khác nhau.

### 3.1. Route table

**Route table** gồm các dòng, mỗi dòng là một **quy tắc định tuyến (route)**:

```
Destination         Target
10.0.0.0/16         local          ← mọi traffic nội bộ VPC đi trong VPC
0.0.0.0/0           igw-xxxxxxxx   ← mọi traffic còn lại ra Internet Gateway
```

Khi chọn route, VPC dùng **longest prefix match** (giống router vật lý): quy tắc cụ thể nhất (prefix dài nhất) được ưu tiên. `10.0.0.0/16` cụ thể hơn `0.0.0.0/0` → traffic nội bộ KHÔNG ra internet.

**Ví dụ gói tin từ instance `10.0.1.10` muốn đến `8.8.8.8` (DNS Google):**
1. Instance gửi gói đến router VPC (`10.0.1.1`).
2. Router tra route table của subnet `10.0.1.0/24`.
3. Đích `8.8.8.8` không khớp `10.0.0.0/16` (không phải IP nội bộ VPC).
4. Khớp `0.0.0.0/0` → chuyển tới Internet Gateway (`igw-xxxxxxxx`).
5. Internet Gateway forward gói ra internet.

### 3.2. Internet Gateway (IGW)

**Internet Gateway** là thành phần gateway kết nối VPC với internet công cộng. Một VPC chỉ có **tối đa 1 IGW**. IGW thực hiện **NAT tĩnh 1-1**: mỗi instance có IP công khai (Elastic IP) được ánh xạ 1-1 với IP riêng.

Ví dụ: instance `10.0.1.10` có Elastic IP `203.0.113.45`. Khi gói tin ra internet:
- Nguồn `10.0.1.10` → IGW thay thành `203.0.113.45` (source NAT).
- Khi gói tin về: đích `203.0.113.45` → IGW thay thành `10.0.1.10` (destination NAT).

Subnet **phải có route `0.0.0.0/0 → igw-xxx`** trong route table mới được gọi là "public subnet".

### 3.3. NAT Gateway

**NAT Gateway** cho phép instance trong **private subnet** khởi tạo kết nối ra internet (ví dụ tải bản vá bảo mật, gọi API bên ngoài) mà **không cho phép internet kết nối ngược vào**.

So sánh với IGW:

| | Internet Gateway | NAT Gateway |
|--|-----------------|-------------|
| Đặt ở đâu | Gắn VPC | Chạy trong public subnet |
| Hướng kết nối | 2 chiều (vào + ra) | 1 chiều (chỉ ra) |
| Instance cần IP public? | Có (Elastic IP) | Không |
| Dùng cho | Public subnet | Private subnet muốn ra internet |
| Chi phí | Miễn phí | Có phí (theo giờ + GB data) |

(Xem thêm cơ chế NAT: [Lesson 05 — NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/))

**Luồng dữ liệu từ private subnet ra internet qua NAT Gateway:**

```
instance-private (10.0.11.5)
  → route table private: 0.0.0.0/0 → nat-gw-xxx (trong public subnet 10.0.1.x)
  → NAT Gateway thay đổi source thành IP public của NAT GW
  → route table public: 0.0.0.0/0 → igw-xxx
  → Internet Gateway → internet
```

❓ **Câu hỏi tự nhiên:**
- *"Tại sao NAT Gateway đặt trong public subnet?"* — Vì NAT GW cần ra internet, nên bản thân nó phải có IP public và route tới IGW — chỉ public subnet mới có.
- *"Database server có cần NAT Gateway không?"* — Không nhất thiết trong môi trường production thuần túy. Nhưng khi cần tải bản vá OS (`yum update`, `apt upgrade`), cần NAT GW để ra ngoài lấy file mà không mở cổng vào.

⚠ **Lỗi thường gặp**: Tạo NAT Gateway nhưng quên cập nhật route table của private subnet (`0.0.0.0/0 → nat-gw-xxx`). Kết quả: instance private không ra được internet và lỗi bí ẩn. Kiểm tra route table luôn là bước đầu tiên khi debug.

🔁 **Dừng lại tự kiểm tra:**
- Instance `10.0.11.5` (private subnet) muốn tải file từ `52.84.10.20` (server ngoài internet). Liệt kê các bước gói tin đi qua.
<details>
<summary>Đáp án</summary>

1. `10.0.11.5` gửi gói `SRC=10.0.11.5 DST=52.84.10.20` tới router VPC.
2. Route table private: `0.0.0.0/0 → nat-gw-xxx` → forward tới NAT Gateway.
3. NAT Gateway nằm trong public subnet, thay đổi `SRC=10.0.11.5` thành IP public của NAT GW (vd `3.0.0.1`). Ghi nhớ mapping trong bảng NAT.
4. Route table public: `0.0.0.0/0 → igw-xxx` → forward tới Internet Gateway.
5. IGW forward ra internet → đến `52.84.10.20`.
6. Gói trả về: `SRC=52.84.10.20 DST=3.0.0.1` → IGW → NAT GW tra bảng NAT → dịch `DST=10.0.11.5` → gửi vào private subnet → instance.

</details>

📝 **Tóm tắt mục 3:**
- Route table gồm các quy tắc `Destination → Target`; dùng longest prefix match.
- Internet Gateway (IGW): gateway 2 chiều, NAT 1-1; gắn với public subnet.
- NAT Gateway: chỉ cho private subnet ra internet, không nhận kết nối vào; đặt trong public subnet.

---

## 4. Kiểm soát truy cập: Security Group và Network ACL

💡 **Trực giác**: Hãy tưởng tượng VPC là một tòa nhà văn phòng. **Network ACL** là hàng rào bảo vệ từng tầng lầu (subnet) — nhân viên bảo vệ ở lối vào tầng có danh sách: số phòng X thì vào, số phòng Y thì không. **Security Group** là khóa cửa từng phòng (instance) — khách đã qua bảo vệ tầng xong vẫn phải có chìa khóa đúng mới vào được phòng cụ thể.

### 4.1. Security Group

**Security Group (SG)** là firewall ảo gắn trực tiếp vào từng **instance (máy ảo)**. Đặc điểm quan trọng:

**Stateful (có trạng thái)**:
- Nếu bạn cho phép kết nối **vào** (inbound) port 80, thì traffic **ra** (response) của kết nối đó tự động được phép — bạn không cần thêm rule outbound.
- SG "nhớ" kết nối: gói tin là phần của kết nối đã được cho phép → tự động qua.

**Chỉ có quy tắc ALLOW**:
- SG không có quy tắc DENY. Mặc định: **chặn tất cả inbound, cho phép tất cả outbound**.
- Bạn chỉ thêm quy tắc cho phép; bất kỳ gì không có rule → bị chặn tự động.

**Gắn instance, không gắn subnet**:
- Nhiều instance trong cùng subnet có thể có SG khác nhau.
- Một instance có thể gắn nhiều SG (các rule cộng dồn).

**Ví dụ SG cho web server:**

| Direction | Protocol | Port | Source/Dest | Lý do |
|-----------|----------|------|-------------|-------|
| Inbound | TCP | 80 | `0.0.0.0/0` | Cho HTTP từ mọi nơi |
| Inbound | TCP | 443 | `0.0.0.0/0` | Cho HTTPS từ mọi nơi |
| Inbound | TCP | 22 | `10.0.0.0/16` | Chỉ admin trong VPC SSH được |
| Outbound | Tất cả | Tất cả | `0.0.0.0/0` | Cho mọi traffic ra (mặc định) |

### 4.2. Network ACL (NACL)

**Network ACL** là firewall gắn ở cấp **subnet** — kiểm soát tất cả traffic vào/ra subnet đó, áp dụng cho mọi instance trong subnet.

**Stateless (không có trạng thái)**:
- Mỗi gói tin được đánh giá độc lập, không phân biệt "đây là response của kết nối đã cho phép".
- Bạn cho phép inbound port 80 → bạn **phải** thêm rule outbound cho port ephemeral (1024–65535) để response đi ra, nếu không response bị chặn.

**Có quy tắc ALLOW lẫn DENY; đánh số thứ tự**:
- Rules được đánh số (100, 200, 300...). Rule số nhỏ được kiểm tra trước.
- **Rule đầu tiên khớp thì dừng** — không kiểm tra tiếp.

**Ví dụ NACL cho public subnet:**

| Rule # | Type | Protocol | Port | Source | Action |
|--------|------|----------|------|--------|--------|
| 100 | Inbound | TCP | 80 | `0.0.0.0/0` | ALLOW |
| 110 | Inbound | TCP | 443 | `0.0.0.0/0` | ALLOW |
| 120 | Inbound | TCP | 1024–65535 | `0.0.0.0/0` | ALLOW (ephemeral — response về) |
| * | Inbound | Tất cả | Tất cả | `0.0.0.0/0` | DENY |
| 100 | Outbound | TCP | 80 | `0.0.0.0/0` | ALLOW |
| 110 | Outbound | TCP | 443 | `0.0.0.0/0` | ALLOW |
| 120 | Outbound | TCP | 1024–65535 | `0.0.0.0/0` | ALLOW (ephemeral ra) |
| * | Outbound | Tất cả | Tất cả | `0.0.0.0/0` | DENY |

### 4.3. So sánh Security Group vs Network ACL

| Tiêu chí | Security Group | Network ACL |
|----------|---------------|-------------|
| Gắn vào | Instance (EC2, RDS...) | Subnet |
| Stateful / Stateless | **Stateful** | **Stateless** |
| Loại rule | Chỉ ALLOW | ALLOW + DENY |
| Thứ tự rule | Tất cả rule đều đánh giá | Đánh số, rule đầu khớp dừng |
| Mặc định | Chặn inbound, cho outbound | Cho tất cả (NACL mặc định AWS) |
| Áp dụng khi | Traffic đến/từ instance cụ thể | Mọi traffic vào/ra subnet |

### 4.4. Walk-through: luồng HTTPS từ internet đến web server

**Cấu hình**: web server `10.0.1.10` ở public subnet `10.0.1.0/24`.

**Gói SYN từ client `203.0.113.5:51234` đến `10.0.1.10:443`:**

```
1. Internet → Internet Gateway
   IGW nhận gói: SRC=203.0.113.5:51234 DST=203.0.113.45:443
   IGW dịch DST = 10.0.1.10 (reverse của Elastic IP mapping)

2. IGW → Network ACL (kiểm tra trước khi vào subnet)
   NACL inbound rule 110: TCP port 443, ALLOW → GÓI ĐI QUA

3. Network ACL → Security Group (kiểm tra trước khi vào instance)
   SG inbound: TCP 443 từ 0.0.0.0/0 → ALLOW → GÓI VÀO INSTANCE

4. Instance xử lý, gửi SYN-ACK về: SRC=10.0.1.10:443 DST=203.0.113.5:51234

5. Security Group outbound (stateful): kết nối này đã được cho vào
   → response tự động được cho ra, KHÔNG cần rule outbound riêng

6. NACL outbound rule 120: TCP port 51234 (ephemeral 1024–65535), ALLOW → ĐI QUA

7. IGW dịch SRC=10.0.1.10 → 203.0.113.45, gửi ra internet
```

So với firewall truyền thống ([Lesson 01 — An ninh mạng](../lesson-01-network-security/)): Security Group đóng vai trò host-based firewall (như iptables trên Linux), còn NACL đóng vai trò perimeter firewall gắn ở ranh giới subnet.

⚠ **Lỗi thường gặp: quên rule NACL outbound ephemeral ports**
- Bạn mở inbound TCP 443, nhưng quên mở outbound TCP 1024–65535.
- Client gửi SYN vào → được phép (inbound ok).
- Server gửi SYN-ACK về → bị NACL outbound chặn (vì port nguồn là 443, port đích là ephemeral 51234 → không có rule).
- Kết quả: connection timeout bí ẩn mặc dù Security Group đúng.
- **Nguyên nhân**: NACL stateless, không nhớ kết nối đã cho vào.

📝 **Tóm tắt mục 4:**
- Security Group: stateful, chỉ ALLOW, gắn instance — rule đơn giản hơn.
- Network ACL: stateless, có DENY, gắn subnet — phải thêm rule cả 2 chiều + ephemeral ports.
- Dùng cả 2 cùng lúc: NACL lọc thô ở cấp subnet, SG lọc tinh ở cấp instance.

---

## 5. Kết nối VPC với thế giới bên ngoài

### 5.1. VPC Peering

**VPC Peering** là kết nối trực tiếp **điểm-tới-điểm (point-to-point)** giữa 2 VPC (cùng hoặc khác account, cùng hoặc khác region). Sau khi peer, instance trong VPC A có thể liên lạc với instance VPC B bằng IP riêng, như thể cùng mạng nội bộ.

Đặc điểm:
- Không đi qua internet — traffic đi qua backbone của nhà cung cấp → bảo mật và trễ thấp.
- **Không có transitivity**: nếu A peer với B, B peer với C, thì A **không thể** liên lạc với C qua B. Phải tạo thêm peer A-C riêng.
- Phải cập nhật route table cả 2 VPC: VPC A thêm route `<CIDR của B> → pcx-xxx`, VPC B thêm route `<CIDR của A> → pcx-xxx`.

💡 **Ví dụ số**: VPC-Prod (`10.0.0.0/16`) peer với VPC-Analytics (`10.1.0.0/16`). Route table VPC-Prod thêm: `10.1.0.0/16 → pcx-0abc`. Instance `10.0.1.10` gửi gói tới `10.1.5.20` → router tra bảng → forward qua peering connection → đến `10.1.5.20`.

⚠ **Lỗi thường gặp: CIDR conflict** — Hai VPC không được có CIDR overlap. `10.0.0.0/16` và `10.0.5.0/24` overlap vì `10.0.5.x` nằm trong `10.0.0.0/16`. Kế hoạch CIDR phải cẩn thận ngay từ đầu vì sau khi tạo VPC không đổi CIDR được.

### 5.2. VPN và Direct Connect

**Site-to-Site VPN**: kết nối mã hóa qua internet giữa VPC và mạng văn phòng/on-premises.

```
Văn phòng [10.10.0.0/16] ←→ VPN tunnel (IPsec, mã hóa) ←→ VPC [10.0.0.0/16]
```

- Băng thông: thường 1.25 Gbps tối đa với AWS VPN.
- Độ trễ: phụ thuộc chất lượng internet giữa 2 đầu (~30–100 ms từ Việt Nam).
- Chi phí thấp; dễ thiết lập (vài giờ).

**AWS Direct Connect** (hoặc tương đương của GCP/Azure): đường truyền vật lý riêng từ văn phòng/data center của bạn tới data center của nhà cung cấp đám mây, **không đi qua internet công cộng**.

- Băng thông: 1 Gbps, 10 Gbps, hoặc 100 Gbps.
- Độ trễ ổn định và thấp hơn VPN (~5–15 ms nếu data center gần).
- Chi phí cao hơn (thuê đường truyền riêng); triển khai mất vài tuần.

Chọn VPN hay Direct Connect?
- Nhỏ, ít dữ liệu, ngân sách hạn chế → **VPN**.
- Lớn, truyền nhiều dữ liệu, cần độ trễ thấp ổn định → **Direct Connect**.

### 5.3. Load Balancer trong đám mây

**Load balancer (cân bằng tải)** phân phối traffic đến nhiều instance phía sau. Trên đám mây, load balancer là dịch vụ quản lý (managed service) — nhà cung cấp tự scale, tự chịu lỗi, bạn không cần quản lý máy chủ load balancer.

Ví dụ AWS:
- **Application Load Balancer (ALB)**: hoạt động ở tầng 7 (HTTP/HTTPS), routing theo URL path (`/api/*` → backend khác), header.
- **Network Load Balancer (NLB)**: tầng 4 (TCP/UDP), ultra-low latency, dùng cho gaming, VoIP.

Mô hình thông thường (kết nối với [Lesson 08 — Web Infrastructure](../../02-Application-Services/lesson-08-web-infrastructure/)):

```
Internet → ALB (public subnet) → Web servers (private subnet, port 8080)
                                → API servers (private subnet, port 3000)
```

ALB nhận HTTPS `443`, forward HTTP `8080` tới web server — tầng TLS terminate ở ALB. Web server không cần cài TLS certificate.

📝 **Tóm tắt mục 5:**
- VPC Peering: kết nối 2 VPC, không transitivity, không overlap CIDR.
- VPN: kết nối on-prem qua internet mã hóa; Direct Connect: kết nối vật lý riêng.
- Load balancer đám mây: managed service, phân phối traffic theo tầng 7 (ALB) hoặc tầng 4 (NLB).

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Thiết kế CIDR VPC và chia subnet:**
Bạn được giao VPC CIDR `172.16.0.0/16` cho một dịch vụ web ở Singapore. Yêu cầu:
- 2 public subnet (cho load balancer + bastion) — mỗi subnet ở 1 AZ.
- 2 private subnet (cho web server) — mỗi subnet ở 1 AZ.
- 2 private subnet (cho database) — mỗi subnet ở 1 AZ.
Thiết kế bảng phân bổ CIDR (prefix `/24`).

**Bài 2 — Đặt server vào subnet nào:**
Công ty có các thành phần sau. Quyết định public hay private subnet cho mỗi loại, giải thích lý do:
- (a) Web server Nginx phục vụ người dùng internet.
- (b) Server MySQL chứa thông tin khách hàng.
- (c) Redis cache.
- (d) Admin bastion host (để SSH vào server nội bộ).

**Bài 3 — Viết Security Group rule:**
Web server ở private subnet, đứng sau Application Load Balancer (ALB) ở public subnet. ALB có IP riêng `10.0.1.0/24` (dải public subnet). Web server chạy port 8080. Admin cần SSH từ bastion host `10.0.3.5`. Viết inbound rules cho Security Group của web server.

**Bài 4 — IGW hay NAT Gateway:**
Cho các tình huống sau, đâu cần Internet Gateway, đâu cần NAT Gateway, đâu không cần gì?
- (a) Web server cần phục vụ người dùng từ internet vào port 443.
- (b) Database server cần tải bản vá bảo mật từ repository.
- (c) API server nội bộ chỉ nhận request từ web server trong cùng VPC.
- (d) Bastion host admin SSH qua internet vào.

**Bài 5 — Phân tích kết nối bị chặn:**
Instance A (`10.0.11.5`, private subnet) gửi request HTTP đến server ngoài internet `93.184.216.34:80`. Bạn đã:
- Cấu hình NAT Gateway đúng trong public subnet.
- Security Group của A: outbound tất cả cho phép.
- NACL của private subnet:
  - Inbound: rule 100 ALLOW TCP 80, rule * DENY tất cả.
  - Outbound: rule 100 ALLOW TCP 80, rule * DENY tất cả.
Tại sao kết nối vẫn không thành công? Sửa thế nào?

**Bài 6 — Tính chi phí subnet:**
VPC `10.0.0.0/20` cần chia thành 4 subnet bằng nhau. Tính prefix của mỗi subnet, địa chỉ đầu/cuối, và số host khả dụng (AWS convention: trừ 5 địa chỉ).

### Lời giải chi tiết

---

**Bài 1 — Lời giải:**

VPC CIDR: `172.16.0.0/16` → 65,536 địa chỉ, prefix 16 bit cố định, 16 bit cho subnet + host.

Dùng `/24` cho mỗi subnet (256 địa chỉ, 251 host sau khi trừ 5 của AWS).

Chiến lược đặt số: octet thứ 3 mã hóa loại subnet:
- `1x` = public (11 = public-1a, 12 = public-1b).
- `2x` = private web (21 = web-1a, 22 = web-1b).
- `3x` = private DB (31 = db-1a, 32 = db-1b).

| Subnet | CIDR | AZ | Loại |
|--------|------|----|------|
| public-1a | `172.16.11.0/24` | ap-southeast-1a | public |
| public-1b | `172.16.12.0/24` | ap-southeast-1b | public |
| web-1a | `172.16.21.0/24` | ap-southeast-1a | private |
| web-1b | `172.16.22.0/24` | ap-southeast-1b | private |
| db-1a | `172.16.31.0/24` | ap-southeast-1a | private |
| db-1b | `172.16.32.0/24` | ap-southeast-1b | private |

Tổng: 6 subnet × 256 = 1,536 địa chỉ dùng, còn 64,000 địa chỉ dự phòng cho tương lai.

---

**Bài 2 — Lời giải:**

**(a) Web server Nginx** → **Public subnet**.
- Cần nhận request từ internet → phải có IP public và route tới IGW.
- Tuy nhiên trong thiết kế tốt hơn, web server nằm sau **load balancer** thì web server đặt ở **private subnet**, chỉ load balancer ở public.

**(b) Server MySQL** → **Private subnet**.
- Chứa dữ liệu nhạy cảm; không bao giờ cần nhận kết nối từ internet.
- Chỉ nhận kết nối từ web server / app server trong VPC qua Security Group.

**(c) Redis cache** → **Private subnet**.
- Cache là tài nguyên nội bộ; không có lý do gì để internet kết nối được vào.

**(d) Bastion host** → **Public subnet**.
- Đây là điểm duy nhất để admin SSH từ internet vào. Nó cần IP public để reach từ bên ngoài.
- Sau đó từ bastion, admin SSH tiếp vào server nội bộ (private subnet) qua IP riêng.

---

**Bài 3 — Lời giải:**

Web server cần nhận traffic từ:
1. ALB (trong `10.0.1.0/24`) vào port 8080 — lý do: ALB forward HTTP.
2. Bastion host `10.0.3.5` vào port 22 — lý do: admin SSH.
3. Không nhận gì khác.

**Inbound rules Security Group của web server:**

| Rule # | Protocol | Port | Source | Lý do |
|--------|----------|------|--------|-------|
| 1 | TCP | 8080 | `10.0.1.0/24` | ALB forward traffic vào |
| 2 | TCP | 22 | `10.0.3.5/32` | Bastion host SSH |

(Ghi chú: dùng `/32` cho một IP đơn lẻ — cụ thể nhất, hạn chế bề mặt tấn công. Không dùng `0.0.0.0/0` cho SSH.)

Security Group stateful → không cần thêm outbound rule cho response.

---

**Bài 4 — Lời giải:**

**(a) Web server port 443** → cần **Internet Gateway** ở subnet của nó.
- Yêu cầu: nhận kết nối từ internet vào → cần đường 2 chiều → IGW.
- Subnet phải là public (route `0.0.0.0/0 → igw-xxx`).

**(b) Database tải bản vá** → cần **NAT Gateway** trong public subnet.
- DB server không được nhận kết nối từ internet (riêng tư) nhưng cần khởi tạo kết nối ra ngoài.
- → Đặt DB trong private subnet, route `0.0.0.0/0 → nat-gw-xxx`.

**(c) API server nội bộ** → **Không cần gì** (không cần IGW hay NAT GW).
- Chỉ giao tiếp trong VPC → route nội bộ `10.0.0.0/16 → local` là đủ.
- Không có đường ra ngoài internet = an toàn hơn.

**(d) Bastion host SSH** → cần **Internet Gateway**.
- Bastion cần nhận SSH từ internet vào → cần IP public và IGW.
- Đặt ở public subnet; Security Group chỉ mở port 22 từ IP của admin (không mở `0.0.0.0/0`).

---

**Bài 5 — Lời giải:**

**Vấn đề**: NACL stateless → phải có rule cho **cả 2 chiều** của mỗi kết nối.

Khi instance A (`10.0.11.5`) gửi HTTP request ra ngoài:
- Gói **outbound** từ A: `SRC=10.0.11.5:SomeEphemeralPort DST=93.184.216.34:80`.
  - NACL outbound rule 100: ALLOW TCP 80 → **đây là port đích (80) → KHỚP → cho qua**.
  
- Gói **inbound** response về: `SRC=93.184.216.34:80 DST=10.0.11.5:SomeEphemeralPort` (ví dụ port 54321).
  - NACL inbound rule 100: ALLOW TCP 80 → **port đích là 54321 (ephemeral), không phải 80 → KHÔNG KHỚP**.
  - Rule `*`: DENY tất cả → **gói bị chặn → response không vào được → connection timeout**.

**Cách sửa**: Thêm rule NACL inbound cho ephemeral ports:

```
Rule 110: Inbound | TCP | 1024–65535 | 0.0.0.0/0 | ALLOW
```

(Và tương tự, outbound cũng nên có rule cho ephemeral 1024–65535 để xử lý response từ instance ra phía NAT GW.)

---

**Bài 6 — Lời giải:**

VPC `10.0.0.0/20`:
- Prefix 20 bit, host bits = 12 bit → 2^12 = 4096 địa chỉ.
- Chia 4 subnet bằng nhau: 4096 / 4 = 1024 địa chỉ/subnet → 2^10 → prefix = 20 + 2 = `/22`.

| Subnet | CIDR | Địa chỉ đầu | Địa chỉ cuối | Host AWS (trừ 5) |
|--------|------|------------|--------------|-------------------|
| Subnet 1 | `10.0.0.0/22` | `10.0.0.0` | `10.0.3.255` | 4096 - 5 = 1019 |
| Subnet 2 | `10.0.4.0/22` | `10.0.4.0` | `10.0.7.255` | 1019 |
| Subnet 3 | `10.0.8.0/22` | `10.0.8.0` | `10.0.11.255` | 1019 |
| Subnet 4 | `10.0.12.0/22` | `10.0.12.0` | `10.0.15.255` | 1019 |

Kiểm tra: `10.0.15.255` là broadcast của subnet 4 và cũng là broadcast của VPC `/20` (`10.0.0.0/20` → broadcast `10.0.15.255`). Chia khít, không bị tràn.

---

## 7. Liên kết và bài tiếp theo

**Kiến thức tiền đề đã dùng trong bài này:**
- [Lesson 03 — IP & Subnetting](../../01-Foundations-LowerLayers/lesson-03-ip-subnetting/) — chia CIDR, tính địa chỉ.
- [Lesson 05 — ARP, ICMP, DHCP, NAT](../../01-Foundations-LowerLayers/lesson-05-arp-icmp-dhcp-nat/) — cơ chế NAT.
- [Lesson 01 — An ninh mạng](../lesson-01-network-security/) — firewall, phân vùng mạng.
- [Lesson 08 — Web Infrastructure](../../02-Application-Services/lesson-08-web-infrastructure/) — load balancer.

**Bài tiếp theo:**
- [Lesson 07 — Công cụ chẩn đoán mạng](../lesson-07-diagnostic-tools/) — ping, traceroute, netstat, Wireshark để debug các vấn đề mạng (kể cả trong VPC đám mây).

---

## 📝 Tổng kết Lesson 06

1. **Đám mây khác truyền thống**: ảo hóa hoàn toàn, tự phục vụ, co giãn. Region → độ trễ; AZ → chịu lỗi.
2. **VPC + CIDR**: mạng riêng ảo với dải địa chỉ RFC 1918. Chia subnet theo vai trò (public/private) và AZ.
3. **Định tuyến**: route table dùng longest prefix match. IGW cho public subnet 2 chiều; NAT GW cho private subnet ra ngoài 1 chiều.
4. **Kiểm soát truy cập**:
   - Security Group: stateful, chỉ ALLOW, gắn instance — rule đơn giản.
   - Network ACL: stateless, có DENY, gắn subnet — phải thêm ephemeral ports.
5. **Kết nối ngoài VPC**: VPC Peering (không transitivity), VPN (internet mã hóa), Direct Connect (đường riêng), Load Balancer (managed, tầng 4 hoặc 7).
