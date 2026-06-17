# Lesson 03 — Mạng không dây (Wireless / WiFi)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao mạng không dây khó hơn mạng có dây: môi trường chia sẻ, không thể phát hiện va chạm.
- Nắm bảng các chuẩn 802.11 (a/b/g/n/ac/ax) và biết chọn băng tần 2.4 GHz vs 5 GHz phù hợp với tình huống.
- Hiểu khái niệm kênh (channel), chồng lấn phổ tần, và lý do chỉ dùng kênh 1/6/11 ở băng 2.4 GHz.
- Giải thích được CSMA/CA và vì sao nó thay thế CSMA/CD trong môi trường không dây.
- Biết quy trình bảo mật WiFi: từ WEP lỗi thời đến WPA3 hiện đại, 4-way handshake.

## Kiến thức tiền đề

- [Lesson 02 — Tầng liên kết & Ethernet](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/) — CSMA/CD, frame Ethernet, môi trường có dây.
- Khái niệm sóng điện từ: xem [Physics — Lesson 08: Sóng điện từ](../../../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/) để hiểu nền tảng vật lý của WiFi.

---

## 1. Khác biệt cơ bản: không dây vs có dây

### 1.1. Môi trường chia sẻ qua sóng vô tuyến

💡 **Hình dung**: Mạng có dây giống như nói chuyện qua ống nước riêng biệt — bạn và người kia có đường truyền độc lập. Mạng không dây giống như nói chuyện trong một căn phòng — mọi người chia sẻ cùng một không khí, ai nói cũng nghe được, và nếu hai người cùng nói to thì cả hai đều không rõ.

Trong Ethernet có dây (xem [Lesson 02 — Ethernet](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/)), giao thức CSMA/CD hoạt động được vì:
1. Mọi máy trong cùng collision domain đều **nghe được nhau** — máy A có thể phát hiện máy B đang truyền.
2. Máy gửi có thể **nghe chính tín hiệu mình gửi** và so sánh để phát hiện va chạm ngay lập tức.

Trong môi trường không dây, cả hai điều trên đều **không đảm bảo**:

- **Suy hao theo khoảng cách**: tín hiệu sóng vô tuyến yếu dần theo bình phương khoảng cách (xem [Physics — Sóng điện từ](../../../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/)). Máy A và máy B có thể đều nghe thấy điểm truy cập (AP), nhưng A không nghe được B.
- **Máy gửi không tự nghe lại mình**: khi phát sóng, phần cứng không đủ nhạy để đồng thời nhận tín hiệu (do tín hiệu phát mạnh hơn tín hiệu nhận hàng triệu lần).

### 1.2. Vấn đề hidden terminal (thiết bị bị che khuất)

❓ **Câu hỏi tự nhiên**: *Nếu hai máy không nghe được nhau thì sao?*

Giả sử có AP ở trung tâm. Máy A ở phòng trái, máy B ở phòng phải — tường cản sóng khiến A và B không nghe được nhau, nhưng cả hai đều nghe AP.

```
Máy A         AP          Máy B
  [A]  ←→  [AP]  ←→   [B]
   A không nghe được B và ngược lại
```

Kịch bản tai hại:
1. A kiểm tra kênh: không nghe thấy gì → kênh rảnh → bắt đầu gửi.
2. Cùng lúc, B cũng kiểm tra: không nghe A (vì tường) → tưởng kênh rảnh → cũng bắt đầu gửi.
3. Hai tín hiệu chồng lên nhau tại AP → **va chạm** — nhưng A và B đều không hay biết!

Đây là **vấn đề hidden terminal** — lý do CSMA/CD không áp dụng được, và cần CSMA/CA với RTS/CTS (xem mục 4).

### 1.3. Các đặc điểm khác của môi trường không dây

| Đặc điểm | Có dây | Không dây |
|-----------|--------|-----------|
| Môi trường | Cáp riêng (point-to-point hoặc switch) | Không khí chia sẻ |
| Phát hiện va chạm | CSMA/CD (nghe trong khi gửi) | Không khả thi → CSMA/CA |
| Bảo mật vật lý | Cần truy cập cáp | Sóng xuyên tường → ai cũng có thể nhận |
| Nhiễu | Ít (cáp có vỏ bọc) | Nhiều (lò vi sóng, Bluetooth, AP khác) |
| Tốc độ suy hao | Không suy hao theo khoảng cách | Suy hao theo bình phương khoảng cách |
| Tốc độ tối đa | Ổn định | Biến động theo môi trường, khoảng cách |

⚠ **Lỗi thường gặp**: Nhiều người tưởng WiFi "bảo mật hơn" vì không có cáp vật lý. Sự thật ngược lại: sóng xuyên qua tường, hàng xóm có thể bắt sóng WiFi nhà bạn. Đó là lý do mã hóa (WPA2/WPA3) cực kỳ quan trọng với WiFi.

📝 **Tóm tắt mục 1**

- Không dây dùng sóng vô tuyến — môi trường chia sẻ, mọi thiết bị trong vùng phủ đều cạnh tranh cùng kênh.
- Không thể dùng CSMA/CD vì máy gửi không thể tự nghe mình và có thể không nghe được máy khác (hidden terminal).
- WiFi có bảo mật yếu hơn về mặt vật lý — ai trong vùng phủ sóng đều có thể "nghe" gói tin.

---

## 2. Chuẩn 802.11: các thế hệ WiFi

### 2.1. Tổng quan các chuẩn

💡 **Hình dung**: Chuẩn 802.11 là "ngôn ngữ" mà các thiết bị WiFi dùng để nói chuyện với nhau. Giống như USB 1.0 → USB 2.0 → USB 3.0, mỗi thế hệ nhanh hơn và hiệu quả hơn.

| Chuẩn | Tên thương mại | Năm | Băng tần | Tốc độ lý thuyết tối đa | Đặc điểm nổi bật |
|-------|---------------|-----|----------|------------------------|-----------------|
| 802.11a | — | 1999 | 5 GHz | 54 Mbps | Ít nhiễu, tầm phủ ngắn |
| 802.11b | — | 1999 | 2.4 GHz | 11 Mbps | Phổ biến đầu tiên, tầm phủ xa |
| 802.11g | — | 2003 | 2.4 GHz | 54 Mbps | Kết hợp tốc độ 11a + tầm phủ 11b |
| 802.11n | WiFi 4 | 2009 | 2.4/5 GHz | 600 Mbps | MIMO (4 luồng), kênh 40 MHz |
| 802.11ac | WiFi 5 | 2013 | 5 GHz | 6.9 Gbps | MU-MIMO, kênh 80/160 MHz, beamforming |
| 802.11ax | WiFi 6 | 2019 | 2.4/5/6 GHz | 9.6 Gbps | OFDMA, MU-MIMO 8×8, BSS coloring |

❓ **Câu hỏi tự nhiên**: *Tại sao WiFi 6 "lý thuyết" 9.6 Gbps nhưng thực tế thường chỉ đạt 300–800 Mbps?*

Tốc độ lý thuyết giả định: kênh rộng nhất (160 MHz), mã điều chế cao nhất (1024-QAM), 8 luồng MIMO, không có nhiễu, khoảng cách gần. Thực tế: hầu hết điện thoại chỉ có 2 anten (2 luồng), kênh 80 MHz, và có nhiễu từ AP hàng xóm. Hiệu suất thực tế thường đạt 30–50% lý thuyết.

### 2.2. Băng tần 2.4 GHz vs 5 GHz

Đây là sự đánh đổi cơ bản nhất khi chọn WiFi:

| Tiêu chí | 2.4 GHz | 5 GHz |
|----------|---------|-------|
| Tốc độ dữ liệu | Thấp hơn | Cao hơn (kênh rộng hơn) |
| Tầm phủ sóng | Xa hơn (~50–70 m ngoài trời) | Gần hơn (~20–35 m ngoài trời) |
| Xuyên tường | Tốt hơn (bước sóng dài) | Kém hơn (bước sóng ngắn, hấp thụ nhiều) |
| Số kênh không chồng | 3 (kênh 1, 6, 11) | 24+ (kênh 36, 40, 44, ...) |
| Mức nhiễu | Cao (lò vi sóng, Bluetooth, AP khác) | Thấp hơn (ít thiết bị hơn dùng 5 GHz) |
| Ứng dụng phù hợp | Thiết bị IoT, xa AP, xuyên tường | Streaming 4K, gaming, gần AP |

💡 **Vì sao 2.4 GHz xuyên tường tốt hơn?** Tần số thấp hơn → bước sóng dài hơn ($\lambda = c/f$: 2.4 GHz → $\lambda \approx 12.5$ cm; 5 GHz → $\lambda \approx 6$ cm). Sóng bước sóng dài "uốn" qua vật cản và hấp thụ ít năng lượng hơn khi đi qua tường gạch. Đây là nguyên lý vật lý từ [Lesson 08 Vật lý — Sóng điện từ](../../../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/).

⚠ **Lỗi thường gặp**: "5 GHz chậm hơn vì tần số cao hơn" — **SAI**. Tần số cao cho phép kênh rộng hơn (có nhiều phổ tần hơn để phân bổ) → tốc độ dữ liệu nhanh hơn. Vấn đề là tầm phủ giảm, không phải tốc độ.

🔁 **Tự kiểm tra**: Bạn ở tầng 3, AP ở tầng 1. Nên dùng băng tần nào?

<details>
<summary>Đáp án</summary>
2.4 GHz — vì cần xuyên qua nhiều tầng bê tông. Tuy nhiên nếu tốc độ là ưu tiên và bạn đặt thêm AP ở tầng 2, dùng 5 GHz sẽ cho tốc độ cao hơn.
</details>

### 2.3. Ví dụ số về băng thông thực tế

Kịch bản: AP WiFi 5 (802.11ac), kênh 80 MHz, 2×2 MIMO, kết nối điện thoại.

- Tốc độ lý thuyết: 867 Mbps.
- Thực tế đo (iperf3, cách AP 5m, không vật cản): ~650 Mbps.
- Thực tế đo (cách AP 15m, 2 tường thạch cao): ~180 Mbps.
- Thực tế đo (cách AP 15m, 1 tường bê tông + 5 GHz): ~60 Mbps.
- Cùng vị trí, chuyển sang 2.4 GHz: ~95 Mbps (chậm hơn về tốc độ đỉnh nhưng ổn định hơn qua tường bê tông).

📝 **Tóm tắt mục 2**

- WiFi qua 6 thế hệ chuẩn 802.11: a/b/g/n(WiFi 4)/ac(WiFi 5)/ax(WiFi 6).
- 2.4 GHz: xa hơn, xuyên tường tốt hơn, nhưng chậm hơn và nhiều nhiễu hơn.
- 5 GHz: nhanh hơn, ít nhiễu, nhưng tầm phủ ngắn hơn.
- Tốc độ lý thuyết luôn cao hơn thực tế nhiều lần.

---

## 3. Kênh (channel) và nhiễu đồng kênh

### 3.1. Phổ tần và kênh

💡 **Hình dung**: Phổ tần WiFi giống như con đường cao tốc nhiều làn. Mỗi kênh là một làn đường. Nếu hai AP "lái xe" trên cùng một làn (hoặc hai làn chồng lấn nhau), chúng cản trở nhau — giống xe chạy sát lấn làn.

**Băng tần 2.4 GHz** có phổ từ 2.400 GHz đến 2.4835 GHz — tổng cộng 83.5 MHz.

Chuẩn 802.11 chia thành 13 kênh (ở Việt Nam/châu Âu), mỗi kênh rộng **22 MHz**, cách nhau **5 MHz**:

| Kênh | Tần số trung tâm | Dải tần |
|------|-----------------|---------|
| 1 | 2.412 GHz | 2.401–2.423 GHz |
| 6 | 2.437 GHz | 2.426–2.448 GHz |
| 11 | 2.462 GHz | 2.451–2.473 GHz |
| 2 | 2.417 GHz | 2.406–2.428 GHz |
| 3 | 2.422 GHz | 2.411–2.433 GHz |

Vì mỗi kênh rộng 22 MHz mà chỉ cách nhau 5 MHz, chỉ có **3 kênh không chồng lấn** nhau: **1, 6, 11**.

```
  Kênh 1   ████████████████████████            2.401–2.423 GHz
  Kênh 6            ████████████████████████   2.426–2.448 GHz
  Kênh 11                     ████████████████████████ 2.451–2.473 GHz
  Kênh 3    ████████████████████████           2.411–2.433 GHz (chồng lấn kênh 1 và 6!)
```

### 3.2. Tại sao chỉ dùng kênh 1/6/11?

Nếu AP nhà bạn dùng kênh 3 và AP hàng xóm dùng kênh 1, hai kênh **chồng lấn nhau** 12 MHz. Khi đó:

- Hai AP tưởng mình dùng kênh khác nhau → không nhường nhau.
- Tín hiệu của AP kia **can nhiễu** (interfere) vào kênh mình.
- Kết quả: cả hai đều chậm đi, độ trễ tăng, gói tin mất nhiều hơn.

Đây là **co-channel interference** (nhiễu cùng kênh) và **adjacent channel interference** (nhiễu kênh liền kề).

❓ **Câu hỏi tự nhiên**: *Nếu có nhiều hơn 3 AP trong cùng vùng thì sao?*

Khi đó không thể tránh hoàn toàn chồng lấn. Giải pháp:
1. Dùng kênh 1/6/11 cho 3 AP → AP thứ 4 phải dùng lại kênh 1, nhưng đặt ở vị trí đủ xa để tín hiệu yếu khi đến vùng AP kênh 1 đầu tiên.
2. Chuyển sang 5 GHz: có ~24 kênh không chồng lấn (mỗi kênh 20 MHz trong phổ rộng hơn).

### 3.3. Ví dụ số cụ thể: chọn kênh cho văn phòng

Văn phòng nhỏ, 3 tầng. Mỗi tầng cần 1 AP. Quét WiFi phát hiện các AP hàng xóm:

```
Hàng xóm A: kênh 1,  signal -65 dBm
Hàng xóm B: kênh 6,  signal -72 dBm
Hàng xóm C: kênh 11, signal -80 dBm (yếu)
Hàng xóm D: kênh 6,  signal -55 dBm (mạnh!)
```

Quyết định:
- Tầng 1 AP: kênh **11** — hàng xóm C dùng kênh 11 nhưng signal yếu (-80 dBm), chấp nhận được.
- Tầng 2 AP: kênh **1** — hàng xóm A kênh 1 signal -65 dBm, chấp nhận được.
- Tầng 3 AP: kênh **6** — hàng xóm B kênh 6 signal -72 dBm (chấp nhận), tránh hàng xóm D (-55 dBm mạnh, nhưng D cũng kênh 6 — tuy nhiên tầng 3 xa D hơn).

⚠ **Lỗi thường gặp**: Để AP ở chế độ "auto" chọn kênh — nhiều router chọn kênh ngẫu nhiên hoặc theo thuật toán đơn giản, có thể chọn kênh 3 hay 8 gây nhiễu. Tốt nhất nên cấu hình thủ công kênh 1, 6, hoặc 11.

🔁 **Tự kiểm tra**: Quét WiFi thấy 5 AP: kênh 1×3 AP, kênh 6×1 AP, kênh 11×1 AP. Nên chọn kênh nào cho AP mới?

<details>
<summary>Đáp án</summary>
Kênh 6 hoặc kênh 11 — có ít AP dùng nhất. Nếu AP kênh 6 và kênh 11 đều có signal yếu (< -75 dBm), chọn kênh 6 hay 11 đều được. Không chọn kênh 1 vì đã có 3 AP cùng kênh.
</details>

📝 **Tóm tắt mục 3**

- Băng 2.4 GHz có 13 kênh nhưng chỉ 3 kênh không chồng: 1, 6, 11.
- Kênh chồng lấn gây nhiễu ngay cả khi AP tưởng dùng kênh khác nhau.
- Luôn chọn từ tập {1, 6, 11} và chọn kênh ít AP hàng xóm nhất.

---

## 4. Truy nhập môi trường: CSMA/CA

### 4.1. Tại sao không dùng CSMA/CD?

Như đã phân tích ở mục 1, CSMA/CD (Carrier Sense Multiple Access / **Collision Detection**) dùng cho Ethernet có dây ([Lesson 02](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/)). Nó yêu cầu:
1. Máy gửi nghe tín hiệu mình gửi ra (để phát hiện va chạm).
2. Tất cả máy trong miền va chạm đều nghe được nhau.

Cả hai điều kiện đều **không thỏa mãn** trong không dây. Thay vào đó, 802.11 dùng CSMA/**CA** — **Collision Avoidance** (tránh va chạm, không phát hiện sau).

### 4.2. Cơ chế CSMA/CA — tổng quan

💡 **Hình dung**: CSMA/CA giống giao thông tại vòng xuyến. Thay vì "cứ đâm rồi dừng lại" (CSMA/CD), bạn **lắng nghe trước, chờ khoảng trống, rồi mới nhập làn** (CSMA/CA).

Các bước thực hiện:

1. **Carrier Sense (CS)**: Lắng nghe kênh. Nếu kênh bận → đợi.
2. **DIFS**: Sau khi kênh rảnh, đợi thêm một khoảng **DIFS** (DCF Interframe Space, ≈ 50 µs với 802.11g) để đảm bảo kênh thật sự rảnh.
3. **Random backoff**: Chọn ngẫu nhiên số slot thời gian (0 đến CW — Contention Window, ban đầu thường CW = 31). Đếm ngược slot; nếu trong lúc đếm kênh bận lại, dừng đếm. Khi kênh rảnh trở lại, tiếp tục đếm ngược từ chỗ dừng.
4. **Gửi frame**: Khi đếm về 0, bắt đầu truyền.
5. **ACK**: Sau khi nhận frame thành công, receiver gửi lại **ACK** (sau khoảng SIFS — Short IFS, ≈ 10 µs). Nếu sender không nhận ACK trong thời gian timeout → tăng CW (nhân đôi, lên đến 1023) → thực hiện lại backoff → phát lại.

### 4.3. RTS/CTS — giải quyết hidden terminal

💡 **Hình dung**: RTS/CTS giống "đặt chỗ" trước. Trước khi chiếm kênh truyền dữ liệu lớn, bạn gửi một tin nhắn nhỏ hỏi "tôi có thể nói không?", và AP phát lại cho mọi người xung quanh biết "kênh này đang bận".

Cơ chế:

1. **RTS (Request to Send)**: Thiết bị A gửi frame nhỏ (20 byte) đến AP: "Tôi muốn gửi X byte, cần Y µs".
2. **CTS (Clear to Send)**: AP broadcast CTS đến **mọi thiết bị trong vùng phủ**: "Kênh đã được giữ cho A trong Y µs". Kể cả máy B không nghe được A (hidden terminal), vẫn nghe được CTS từ AP → biết phải im lặng.
3. **DATA**: A gửi frame dữ liệu.
4. **ACK**: AP xác nhận nhận được.

```
Thời gian:
A:   [RTS]───────────────[DATA]────────────────────
AP:       [CTS]──────────────────────────[ACK]
B:             im lặng (NAV timer)
```

**NAV (Network Allocation Vector)**: Khi nghe RTS hoặc CTS, mọi thiết bị đặt bộ đếm NAV = thời gian cần thiết (ghi trong frame). Trong thời gian NAV, thiết bị **không cạnh tranh** kênh — tương tự "đặt cờ bận".

❓ **Câu hỏi tự nhiên**: *RTS/CTS có luôn dùng không?*

Không. RTS/CTS thêm overhead (20 + 14 byte header cho frame nhỏ → lãng phí). Thường chỉ kích hoạt khi frame dữ liệu lớn hơn ngưỡng **RTS threshold** (thường 2347 byte — tức gần như không dùng mặc định). Có thể đặt về 512 byte hoặc thấp hơn trong môi trường nhiều thiết bị / nhiễu nhiều.

### 4.4. Walk-through một lần truyền hoàn chỉnh

**Tình huống**: Máy tính xách tay (Laptop) gửi 1500 byte đến AP. WiFi 5 GHz, SIFS = 16 µs, DIFS = 34 µs, slot = 9 µs.

**Bước 1** — Laptop kiểm tra kênh: đang bận (AP đang phục vụ điện thoại).

**Bước 2** — Laptop đợi đến khi kênh rảnh, rồi đợi thêm DIFS = 34 µs.

**Bước 3** — Laptop chọn ngẫu nhiên backoff = 7 slot × 9 µs = 63 µs. Trong khi đếm, một thiết bị khác bắt đầu truyền ở slot thứ 4 → Laptop dừng đếm tại còn 3 slot.

**Bước 4** — Kênh rảnh lại, Laptop đợi DIFS = 34 µs, rồi tiếp tục đếm 3 slot còn lại = 27 µs → gửi frame.

**Bước 5** — Nếu dùng RTS/CTS (vì dữ liệu lớn):
  - Gửi RTS: 20 byte.
  - AP đợi SIFS = 16 µs, gửi CTS: 14 byte.
  - Laptop đợi SIFS = 16 µs, gửi DATA: 1500 byte.
  - AP đợi SIFS = 16 µs, gửi ACK: 14 byte.

**Bước 6** — Laptop nhận ACK → truyền thành công. Nếu ACK không đến trong timeout:
  - CW tăng gấp đôi (từ 31 → 63).
  - Thực hiện lại backoff, phát lại.

📝 **Tóm tắt mục 4**

- CSMA/CA: lắng nghe → đợi DIFS → random backoff → gửi → chờ ACK.
- Backoff ngẫu nhiên giảm xác suất hai máy gửi cùng lúc sau khi kênh vừa rảnh.
- RTS/CTS giải quyết hidden terminal bằng cách AP broadcast thông báo kênh bận.
- Không có ACK = phát lại, tăng CW để giảm xung đột tiếp theo.

---

## 5. Bảo mật WiFi

### 5.1. Tại sao bảo mật WiFi quan trọng hơn LAN có dây?

Với LAN có dây, kẻ tấn công cần **truy cập vật lý** vào cáp hoặc switch. Với WiFi, sóng vô tuyến xuyên tường — kẻ tấn công ngồi trong xe ngoài đường có thể bắt gói tin của bạn. Nếu không mã hóa, mọi frame WiFi đều đọc được hoàn toàn bằng công cụ như Wireshark (ở chế độ monitor).

### 5.2. WEP — lỗi thời và nguy hiểm

**WEP (Wired Equivalent Privacy)**, 1999: thiết kế để cho WiFi "an toàn như LAN có dây" (như tên gọi).

Nguyên lý: dùng RC4 stream cipher với khóa 64-bit hoặc 128-bit (trong đó 24 bit là IV — Initialization Vector ngẫu nhiên).

**Điểm yếu nghiêm trọng**:
- IV chỉ 24 bit → sau ~5.000 gói tin, IV bắt đầu lặp lại. Với traffic cao, lặp sau vài giờ.
- Khi cùng IV + cùng khóa → cùng keystream → xử lý thống kê crack được khóa.
- Công cụ **aircrack-ng** có thể phá WEP trong **dưới 5 phút** với đủ gói tin capture.
- IEEE tuyên bố WEP "deprecated" năm 2004.

⚠ **Lỗi thường gặp**: Vẫn còn người dùng WEP vì router cũ, hoặc tưởng "WEP còn hơn không". Thực tế WEP không cung cấp bảo vệ thực sự — bất kỳ ai có máy tính đều crack được trong vài phút.

### 5.3. WPA2 — chuẩn hiện tại phổ biến nhất

**WPA2 (WiFi Protected Access 2)**, 2004 (IEEE 802.11i):

**Mã hóa**: AES-CCMP (Advanced Encryption Standard, 128-bit key). AES là mã khối — về cơ bản không thể brute-force với khóa mạnh.

**Hai chế độ**:
- **WPA2-Personal (PSK)**: dùng mật khẩu chung (Pre-Shared Key) — dành cho gia đình/văn phòng nhỏ.
- **WPA2-Enterprise (802.1X)**: mỗi người dùng có tài khoản riêng, xác thực qua RADIUS server — dùng cho doanh nghiệp lớn.

**4-way handshake** (xác thực WPA2-Personal):

Sau khi client kết nối (association) với AP:
1. **AP → Client**: ANonce (số ngẫu nhiên của AP).
2. **Client → AP**: SNonce + MIC (Message Integrity Code). Client tính PMK từ mật khẩu + SSID, rồi tính PTK từ PMK + ANonce + SNonce + địa chỉ MAC.
3. **AP → Client**: Confirm, cài đặt key, GTK (Group Temporal Key — dùng cho broadcast/multicast).
4. **Client → AP**: Confirm, cài đặt key.

Sau 4-way handshake, session key (PTK) được cài đặt, mọi frame sau đó đều mã hóa bằng PTK. PTK là duy nhất cho mỗi phiên kết nối — dù capture được cũng không dùng lại được.

❓ **Câu hỏi tự nhiên**: *WPA2 có thể bị crack không?*

Điểm yếu duy nhất của WPA2-PSK: nếu mật khẩu **yếu** (ngắn, dễ đoán), kẻ tấn công capture 4-way handshake rồi brute-force offline. GPU hiện đại kiểm tra hàng tỷ mật khẩu/giây. Mật khẩu 8 ký tự toàn số → crack trong vài giây. Mật khẩu 12 ký tự gồm chữ+số+ký tự đặc biệt → thực tế không thể crack.

### 5.4. WPA3 — chuẩn mới nhất (2018)

**WPA3** giải quyết điểm yếu còn lại của WPA2:

- **SAE (Simultaneous Authentication of Equals)** thay cho PSK: dùng Diffie-Hellman variant — ngay cả khi capture handshake, không thể brute-force offline vì cần tương tác thời gian thực với AP.
- **Forward Secrecy**: mỗi phiên dùng session key khác nhau — capture traffic hôm nay, dù sau này biết được mật khẩu cũng không giải mã được traffic cũ.
- **192-bit security** cho doanh nghiệp (WPA3-Enterprise).
- **Opportunistic Wireless Encryption (OWE)**: mạng "mở" (không mật khẩu) vẫn được mã hóa — giải quyết vấn đề WiFi café.

### 5.5. SSID, Association, và mạng mở nguy hiểm

**SSID (Service Set Identifier)**: Tên mạng WiFi, broadcast bởi AP trong frame Beacon mỗi ~100 ms. Ẩn SSID không cung cấp bảo mật thực sự — công cụ passive scan vẫn thấy AP khi có thiết bị kết nối.

**Quy trình kết nối (association)**:

```
1. Client gửi Probe Request (hoặc nghe Beacon từ AP)
2. AP phản hồi Probe Response (thông tin AP)
3. Client gửi Authentication Request
4. AP gửi Authentication Response
5. Client gửi Association Request (thông tin năng lực: chuẩn, tốc độ hỗ trợ)
6. AP gửi Association Response (chấp nhận/từ chối)
7. [WPA2/WPA3] 4-way handshake → session key
8. Kết nối hoàn thành, bắt đầu truyền data
```

**Mạng mở (không mật khẩu) nguy hiểm thế nào?**

Trong mạng mở không có WPA2/WPA3, mọi frame WiFi được gửi **không mã hóa**. Kẻ tấn công ở cùng quán café:
- Bật chế độ monitor card WiFi.
- Dùng Wireshark hoặc tcpdump capture tất cả frame.
- Đọc mọi HTTP request, cookie, DNS query của nạn nhân.
- Giả mạo AP (Evil Twin attack): dựng AP tên giống AP thật, thiết bị tự kết nối.

Ngay cả với HTTPS, mạng mở vẫn lộ: tên miền qua DNS, SNI trong TLS handshake, thời điểm và lượng dữ liệu giao tiếp. WPA3 với OWE giải quyết phần lớn vấn đề này.

📝 **Tóm tắt mục 5**

- WEP: bị phá vỡ hoàn toàn, không dùng.
- WPA2-PSK: an toàn nếu mật khẩu đủ mạnh (≥12 ký tự đa dạng).
- WPA3: tốt nhất hiện tại — SAE chống brute-force offline, forward secrecy.
- Mạng mở WiFi = không mã hóa = kẻ cùng mạng đọc được traffic.

---

## 6. Ứng dụng thực tế trong phần mềm

> 💡 **Dev hiếm khi code WiFi, nhưng mạng không dây giải thích vì sao app mobile phải xử lý mạng kém: độ trễ cao, mất gói, đổi mạng giữa chừng.**

| Đặc tính wireless | App phải xử lý sao |
|-------------------|---------------------|
| **Latency cao + biến thiên** | Timeout rộng hơn, retry với backoff, hiển thị loading |
| **Mất gói / chập chờn** | TCP retransmit chậm → cảm giác lag; dùng cache offline |
| **Đổi mạng** (WiFi↔4G) | Connection đứt → reconnect; resume download dở |
| **Băng thông hạn chế / tốn data** | Nén, lazy load, ảnh responsive, tránh poll liên tục |

### 6.1. Ví dụ cụ thể — app mobile phải "offline-first"

App mobile chạy trên mạng wireless thật: user vào thang máy (mất sóng), chuyển WiFi sang 4G (đổi IP, connection đứt), mạng yếu (latency 2s). App giả định "mạng luôn tốt như WiFi văn phòng" → lỗi khắp nơi. Thiết kế đúng: (1) **timeout + retry backoff** (không fail ngay khi mạng chập chờn); (2) **offline-first** — cache dữ liệu local, sync khi có mạng; (3) **optimistic UI** — hiển thị ngay, sync nền; (4) **resume** download/upload dở thay vì làm lại. Đây là vì sao app tốt (Spotify, Gmail) vẫn dùng được khi mạng kém. Backend cũng phải: hỗ trợ **idempotency** (client retry không tạo trùng, [nối](../../../Programming/lesson-43-rest-api-design/)), range request (resume download).

> ❓ **"Backend có cần biết client dùng wireless không?"** Gián tiếp có. (1) Client mạng kém retry nhiều → backend cần idempotency + rate limit hợp lý (đừng chặn nhầm retry hợp lệ). (2) Hỗ trợ **resumable upload** (chunked) cho client mạng đứt giữa chừng. (3) API nên **gọn** (mobile tốn data/pin) → tránh trả thừa field, hỗ trợ nén. (4) Đừng giả định connection bền — client mobile đứt liên tục là bình thường, không phải lỗi.

### 6.2. 📝 Tóm tắt mục 6

- Wireless = latency cao, mất gói, đổi mạng → app mobile phải **offline-first**: cache + retry backoff + optimistic UI + resume.
- Backend hỗ trợ: **idempotency** (retry không trùng), resumable upload, API gọn (tốn data/pin), không giả định connection bền.
- Dev không code WiFi nhưng phải thiết kế chịu được mạng kém — đó là thực tế mobile.

## Bài tập

**Bài 1**: Văn phòng 2 tầng. Tầng 1 có AP hàng xóm mạnh ở kênh 1 và kênh 11. Tầng 2 chưa có AP nào. Bạn cần đặt AP cho cả 2 tầng với can nhiễu tối thiểu. Chọn kênh cho mỗi AP và giải thích lý do.

**Bài 2**: Giải thích tại sao CSMA/CA dùng "tránh va chạm" thay vì "phát hiện va chạm" như CSMA/CD của Ethernet. Nêu ít nhất 2 lý do kỹ thuật cụ thể.

**Bài 3**: So sánh hai tình huống:
- (a) Máy tính đặt cách AP 3 m, không vật cản, WiFi 5 (5 GHz).
- (b) Máy tính đặt cách AP 25 m, qua 2 tường bê tông, WiFi 4 (2.4 GHz).

Tình huống nào cho tốc độ tốt hơn? Giải thích.

**Bài 4**: Mô tả đầy đủ 4 bước của 4-way handshake trong WPA2. Tại sao PMK không được truyền trực tiếp trên mạng?

**Bài 5**: Quán cà phê cung cấp WiFi miễn phí không mật khẩu. Khách hàng dùng HTTPS để đăng nhập ngân hàng online. Liệt kê những thông tin nào kẻ tấn công passive có thể thu thập, và những thông tin nào được bảo vệ.

**Bài 6**: Tính tỷ lệ overhead của RTS/CTS so với dữ liệu có ích trong các tình huống:
- (a) Frame dữ liệu 100 byte (RTS 20 byte + CTS 14 byte + ACK 14 byte).
- (b) Frame dữ liệu 1460 byte (cùng RTS/CTS/ACK).

Tình huống nào overhead lớn hơn? Đây là lý do tại sao nào?

---

## Lời giải chi tiết

**Bài 1 — Chọn kênh cho 2 AP:**

Điều kiện: hàng xóm mạnh ở kênh 1 (tầng 1) và kênh 11 (tầng 1). Tầng 2 không có AP hàng xóm.

Chỉ có 3 kênh không chồng lấn: {1, 6, 11}.

- **AP tầng 1**: Kênh 1 và 11 đã có AP hàng xóm mạnh → chọn **kênh 6**. Không chồng với 1 (cách 5 kênh = 25 MHz > 22 MHz/2) và không chồng với 11 (cách 5 kênh).
- **AP tầng 2**: Không có AP hàng xóm. Để tránh can nhiễu với AP tầng 1 (kênh 6), chọn **kênh 1 hoặc 11**. Nếu tầng bê tông cản sóng đủ tốt, cũng có thể dùng kênh 6 lại — nhưng an toàn hơn là chọn kênh khác.

Kết quả: Tầng 1 = kênh 6, Tầng 2 = kênh 1 (hoặc 11).

**Bài 2 — CSMA/CA thay CSMA/CD:**

Lý do 1 — **Không thể nghe mình trong khi gửi**: Khi phát sóng, phần cứng WiFi phát tín hiệu mạnh (hàng chục đến hàng trăm mW). Đồng thời nhận tín hiệu phản xạ cực yếu. Khuếch đại tự nhiễu sẽ phá hoại mạch nhận. Về mặt phần cứng không khả thi để "nghe mình" như NIC có dây.

Lý do 2 — **Hidden terminal problem**: Ngay cả nếu máy gửi có thể tự nghe, hai thiết bị không nghe thấy nhau vẫn sẽ đồng thời gửi (vì cả hai kiểm tra kênh và thấy rảnh). Va chạm xảy ra tại AP nhưng không bên nào biết.

Kết luận: phải **tránh va chạm trước** (random backoff + RTS/CTS) thay vì phát hiện sau.

**Bài 3 — So sánh hai tình huống:**

(a) 3 m, không vật cản, WiFi 5 (5 GHz): Khoảng cách ngắn, không hao suy do tường. WiFi 5 hỗ trợ kênh 80 MHz, MU-MIMO. Tốc độ thực tế: **400–600 Mbps** (thiết bị 2×2 MIMO).

(b) 25 m, 2 tường bê tông, WiFi 4 (2.4 GHz): Mỗi tường bê tông dày 20 cm có thể hấp thụ 10–15 dB tín hiệu. 25 m thêm ~10 dB path loss so với 5 m. Tổng mất ~30 dB so với trường hợp tốt. WiFi 4 tối đa 150 Mbps (1×1) đến 300 Mbps (2×2). Với signal yếu, tốc độ thực tế: **30–80 Mbps** (có thể kết nối được nhờ 2.4 GHz xuyên tường tốt hơn, nhưng băng thông thấp).

Kết luận: **(a) tốt hơn nhiều** — khoảng cách ngắn + không vật cản > lợi thế xuyên tường của 2.4 GHz. Khoảng cách gần gần như luôn thắng lợi thế tần số.

**Bài 4 — 4-way handshake WPA2:**

Bước 1: **AP → Client**: ANonce (số ngẫu nhiên 256-bit của AP). Chưa mã hóa vì chưa có key.

Bước 2: **Client → AP**: SNonce + MIC.
- Client tính: PMK = PBKDF2(mật khẩu, SSID, 4096 vòng) — thực chất là "hash chậm" của mật khẩu.
- PTK = PRF(PMK || ANonce || SNonce || MAC_AP || MAC_Client) — session key duy nhất cho phiên này.
- Gửi SNonce + MIC (chứng minh client biết PMK mà không lộ PMK).

Bước 3: **AP → Client**: GTK (Group Temporal Key, được mã hóa bằng PTK) + confirm.
- AP cũng tính được PTK (vì có ANonce, SNonce, MAC, và biết PMK từ mật khẩu).
- GTK dùng để giải mã frame broadcast/multicast.

Bước 4: **Client → AP**: Confirm đã cài key.

**PMK không truyền trực tiếp** vì: nếu PMK bị lộ, kẻ tấn công giải mã được mọi session — kể cả session cũ (không có forward secrecy trong WPA2). Thay vào đó, dùng MIC để xác nhận cả hai bên biết PMK, rồi dùng PTK (được dẫn xuất từ PMK + nonces ngẫu nhiên) làm session key.

**Bài 5 — Mạng mở + HTTPS:**

**Thông tin bị lộ (kẻ tấn công đọc được)**:
- DNS query — ví dụ: `nganhang.com.vn` (tên miền, không phải nội dung trang).
- Địa chỉ IP đích — biết đang kết nối đến server ngân hàng.
- TLS SNI (Server Name Indication) trong ClientHello — tên miền lộ trong TLS handshake (dù sau đó được mã hóa), trừ khi dùng ESNI/ECH.
- Thời điểm và lượng dữ liệu trao đổi — có thể suy luận hành vi.
- MAC address của thiết bị.

**Thông tin được bảo vệ (HTTPS mã hóa)**:
- Nội dung trang web (HTML, cookie, form đăng nhập, số tài khoản, mật khẩu).
- URL đầy đủ (chỉ biết domain, không biết path).
- Header HTTP (Authorization, Cookie, v.v.).
- Nội dung response (số dư, lịch sử giao dịch).

Kết luận: HTTPS bảo vệ nội dung quan trọng, nhưng vẫn lộ metadata. Với mạng mở không WPA3/OWE, frame WiFi không mã hóa — nhưng TLS bên trong vẫn bảo vệ dữ liệu nhạy cảm.

**Bài 6 — Overhead RTS/CTS:**

Công thức overhead: `(RTS + CTS + ACK) / (RTS + CTS + DATA + ACK)`

(a) Frame 100 byte: overhead = (20 + 14 + 14) / (20 + 14 + 100 + 14) = 48 / 148 = **32.4%**

(b) Frame 1460 byte: overhead = (20 + 14 + 14) / (20 + 14 + 1460 + 14) = 48 / 1508 = **3.2%**

Tình huống (a) overhead lớn hơn rất nhiều (32.4% vs 3.2%). Đây là lý do RTS/CTS chỉ dùng cho frame **lớn** (thường ngưỡng 512 byte trở lên): chi phí bắt tay chỉ đáng khi dữ liệu đủ lớn để bù đắp overhead.

---

## Liên kết và bài tiếp theo

- **Tiền đề đã học**: [Lesson 02 — Ethernet & CSMA/CD](../../01-Foundations-LowerLayers/lesson-02-link-ethernet/)
- **Nền tảng vật lý**: [Physics — Sóng điện từ](../../../../Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/)
- **Bài tiếp theo**: [Lesson 04 — QoS & Quản lý lưu lượng](../lesson-04-qos/)

---

## Tổng kết Lesson 03

1. **Môi trường chia sẻ**: WiFi dùng sóng vô tuyến — mọi thiết bị cùng vùng cạnh tranh kênh. Hidden terminal là vấn đề đặc thù không dây.
2. **Chuẩn 802.11**: 6 thế hệ (b/a/g → n/ac/ax). Chọn 2.4 GHz khi cần tầm xa/xuyên tường; 5 GHz khi cần tốc độ cao và ở gần AP.
3. **Kênh**: Băng 2.4 GHz chỉ có 3 kênh không chồng (1/6/11). Luôn chọn trong tập này và kiểm tra AP hàng xóm.
4. **CSMA/CA**: Lắng nghe → DIFS → random backoff → gửi → chờ ACK. RTS/CTS giải quyết hidden terminal bằng cách AP broadcast thông báo kênh bận. Khác CSMA/CD: tránh va chạm thay vì phát hiện.
5. **Bảo mật**: WEP lỗi thời (bị phá trong phút). WPA2-AES an toàn nếu mật khẩu mạnh. WPA3 tốt nhất hiện tại. Mạng mở = không mã hóa frame WiFi.
