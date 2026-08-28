# Lesson 05 — BJT làm khóa (Switch)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được vì sao cần transistor làm khóa (vi điều khiển/cổng logic không đủ dòng chạy tải lớn).
- Phân biệt hai trạng thái khóa của BJT NPN: ngắt (cutoff) và bão hòa (saturation) — và khi nào transistor "chưa đủ bão hòa" (vẫn trong vùng tích cực).
- Tính R_B để đưa transistor vào bão hòa chắc chắn với hệ số overdrive.
- Thiết kế mạch khóa LED công suất, relay, động cơ DC; biết khi nào cần diode flyback.
- Chọn transistor NPN thích hợp (2N2222, BC547) dựa trên dòng tải và điện áp.

## Kiến thức tiền đề

- [Lesson 04 — BJT khuếch đại](../lesson-04-bjt-amplifier/) — mô hình BJT, hệ số β, vùng hoạt động.
- [Lesson 02 — Diode](../lesson-02-diode/) — đặc tuyến diode, $V_D \approx$ 0.7 V, diode flyback.
- Cơ bản về vi điều khiển / cổng logic (GPIO output 3.3 V hoặc 5 V, dòng tối đa ~20–40 mA).

---

## 1. Vì sao cần transistor làm khóa?

### 1.1. Vấn đề: GPIO chỉ cấp được dòng nhỏ

💡 **Hình dung**: GPIO của vi điều khiển giống như một công tắc nhỏ — nó tạo ra điện áp nhưng chỉ "mạnh" đủ cho dòng nhỏ vài chục mA. Muốn bật đèn pha xe hơi (5 A) bằng ngón tay cũng cần mức công suất đó — ta cần "trợ lực" qua một cơ cấu khuếch đại lực.

Cổng GPIO điển hình (Arduino, STM32, ESP32):
- Điện áp output: 3.3 V hoặc 5 V.
- Dòng output tối đa: 8–40 mA (tùy IC) — thường an toàn nhất ở ≤ 10 mA.

Nhiều tải thực tế cần dòng lớn hơn nhiều:

| Tải | Dòng điển hình |
|-----|---------------|
| LED đơn 5 mm | 10–20 mA — GPIO đủ |
| LED công suất 1 W | 300–350 mA — GPIO không đủ |
| Relay nhỏ (5 V) | 50–80 mA — GPIO vừa đủ / nguy hiểm |
| Relay trung bình | 100–200 mA — GPIO không đủ |
| Động cơ DC nhỏ | 100 mA – 1 A — GPIO không đủ |
| Còi buzzer lớn | 100–500 mA — GPIO không đủ |

**Giải pháp**: Dùng transistor NPN (loại BJT — Bipolar Junction Transistor) làm khóa điện tử. Tín hiệu nhỏ từ GPIO điều khiển dòng base nhỏ → transistor cho phép dòng collector lớn hơn nhiều chạy qua tải.

❓ **Câu hỏi tự nhiên của người đọc**

*"Dùng transistor làm khóa khác gì dùng nó làm khuếch đại?"*

Khi làm khuếch đại (Lesson 04), transistor hoạt động ở **vùng tích cực (active region)**: $I_C = \beta \times I_B$, $V_{CE} >$ 0.2 V. Tín hiệu input biến đổi liên tục, output cũng biến đổi tỷ lệ.

Khi làm khóa, transistor chỉ cần 2 trạng thái: **ngắt hoàn toàn** (OFF) hoặc **bão hòa hoàn toàn** (ON / saturated). Không quan tâm đến việc khuếch đại tuyến tính — ta cố tình đẩy transistor vào bão hòa để $V_{CE} \approx$ 0.2 V, giống như khóa cơ khí đóng lại.

*"Tại sao không dùng relay thẳng thay vì thêm transistor?"*

Relay cần cuộn dây điện từ — chính cuộn dây đó cần 50–200 mA để kéo, vượt khả năng GPIO. Transistor chính là cầu nối giữa GPIO và cuộn relay. Nếu tải nhẹ hơn khả năng GPIO (ví dụ một đèn LED nhỏ) thì không cần transistor.

### 📝 Tóm tắt mục 1

- GPIO/logic output: ≤ 10–40 mA — đủ cho LED đơn, không đủ cho tải lớn.
- Transistor NPN làm khóa: dòng base nhỏ (từ GPIO) điều khiển dòng collector lớn (qua tải).
- Khóa transistor ≠ khuếch đại: chỉ cần trạng thái ON/OFF, không cần tuyến tính.

---

## 2. Hai trạng thái khóa: Ngắt và Bão hòa

### 2.1. Trạng thái NGẮT (Cutoff)

**Điều kiện**: $V_{BE} <$ 0.6 V (thường coi $V_{BE} <$ 0.5 V là transistor hoàn toàn tắt).

**Kết quả**:
- $I_B \approx 0$
- $I_C \approx 0$ (chỉ có dòng rò cực nhỏ $I_{CEO} <$ 1 µA với Si ở nhiệt độ phòng)
- $V_{CE} \approx V_{CC}$ (toàn bộ điện áp nguồn rơi trên C–E vì không có dòng qua tải)

💡 **Hình dung**: Transistor giống như khóa nước bị khóa hoàn toàn — không có nước (dòng) chảy qua tải. Nguồn điện "treo" ở collector nhưng không đi đâu được.

**Ứng dụng**: GPIO = LOW (0 V) → $V_{BE}$ = 0 V < ngưỡng → transistor ngắt → tải tắt.

### 2.2. Trạng thái BÃO HÒA (Saturation)

**Điều kiện**: $I_B$ lớn đủ để $\beta \times I_B \geq I_C(\text{tải})$. Tức là dòng base "mồi" đủ lớn để transistor "muốn" cho dòng collector lớn hơn dòng thực tế mà tải cần.

**Kết quả**:
- $V_{CE(\text{sat})} \approx$ 0.1–0.3 V (thường dùng 0.2 V để tính toán)
- $V_{BE(\text{sat})} \approx$ 0.7–0.8 V (hơi cao hơn vùng tích cực)
- Dòng qua tải: $I_C = (V_{CC} - V_{CE(\text{sat})}) / R_{\text{tải}} \approx (V_{CC} - 0.2) / R_{\text{tải}}$

💡 **Hình dung**: Transistor giống như van nước mở hết cỡ — dòng điện chảy thoải mái, chỉ bị cản chút xíu ($V_{CE(\text{sat})} \approx$ 0.2 V) bởi bản thân transistor, tương đương như một điện trở nhỏ ~0.1–1 Ω.

**Ứng dụng**: GPIO = HIGH (3.3 V hoặc 5 V) → dòng base đủ lớn → transistor bão hòa → tải được cấp điện đầy đủ.

### 2.3. Phân biệt 3 vùng hoạt động

| Vùng | Điều kiện | $I_C$ | $V_{CE}$ | Dùng cho |
|------|-----------|-----|------|-----------|
| **Ngắt (Cutoff)** | $V_{BE} <$ 0.5 V | ≈ 0 | $\approx V_{CC}$ | Khóa OFF |
| **Tích cực (Active)** | $V_{BE} \approx$ 0.7 V, $V_{CE} >$ 0.2 V | $\beta \times I_B$ | Biến đổi | Khuếch đại |
| **Bão hòa (Saturation)** | $I_B \geq I_C/\beta$, $V_{CE} \approx$ 0.2 V | $(V_{CC} - 0.2)/R_{\text{tải}}$ | ≈ 0.2 V | Khóa ON |

⚠ **Lỗi thường gặp — transistor "chưa đủ bão hòa"**

Nếu $I_B$ quá nhỏ (tính $R_B$ quá lớn), transistor chỉ vào vùng tích cực thay vì bão hòa: $V_{CE}$ không xuống được 0.2 V mà dao động ở 1–2 V. Hậu quả:
- Tải không nhận đủ điện áp ($V_{\text{tải}} = V_{CC} - V_{CE}$ bị giảm).
- Transistor tiêu thụ công suất lớn $P = V_{CE} \times I_C$ — có thể quá nhiệt.
- Mạch hoạt động nửa vời: tải hoạt động yếu, transistor nóng.

**Luôn kiểm tra**: $\beta \times I_B > I_C(\text{tải})$ trước khi kết luận transistor bão hòa.

🔁 **Dừng lại tự kiểm tra**

Transistor NPN, $V_{CC}$ = 12 V, $R_{\text{tải}}$ = 100 Ω, $\beta$ = 100. Dòng tải $I_C$ = ?  
Cần $I_B$ tối thiểu bao nhiêu để đảm bảo bão hòa?

<details>
<summary>Xem đáp án</summary>

$I_C = (12 - 0.2) / 100 =$ **118 mA**.  
$I_{B(\min)} = I_C / \beta = 118 / 100 =$ **1.18 mA**.  
Để chắc bão hòa: $I_B \geq$ 1.18 mA (thực tế nhân overdrive 2–5×, vào khoảng 2.4–6 mA).

</details>

### 📝 Tóm tắt mục 2

- Ngắt (cutoff): $V_{BE} <$ 0.5 V, $I_C \approx 0$, $V_{CE} \approx V_{CC}$.
- Bão hòa (saturation): $I_B$ đủ lớn, $V_{CE(\text{sat})} \approx$ 0.2 V, tải nhận $(V_{CC} -$ 0.2 V).
- Transistor bão hòa ≠ transistor "vừa đủ dẫn" — phải có $\beta \times I_B > I_C(\text{tải})$.

---

## 3. Thiết kế: Tính R_B

### 3.1. Quy trình 4 bước

**Bước 1**: Xác định dòng tải $I_C$ cần.

```
I_C = (V_CC − V_CE(sat)) / R_tải   [tải thuần trở]
hoặc  I_C = dòng danh định của tải (relay coil, LED driver...)
```

**Bước 2**: Tính $I_B$ tối thiểu (không overdrive):

```
I_B(min) = I_C / β
```

**Bước 3**: Áp dụng hệ số overdrive (OD = 2 đến 10, thường dùng OD = 5 cho khóa):

```
I_B(thiết_kế) = OD × I_B(min) = OD × I_C / β
```

Lý do overdrive: (a) β thực tế dao động theo nhiệt độ và IC cụ thể, (b) muốn bão hòa sâu ($V_{CE}$ thấp hơn, $R_{CE}$ nhỏ hơn), (c) transistor vào bão hòa nhanh hơn khi chuyển mạch.

**Bước 4**: Tính $R_B$:

```
R_B = (V_điều_khiển − V_BE) / I_B(thiết_kế)
    = (V_GPIO − 0.7) / I_B(thiết_kế)
```

### 3.2. Walk-through ví dụ 1 — LED công suất 350 mA, GPIO 5 V

Tải: LED công suất, $V_{LED}$ = 3.4 V, $I_{LED}$ = 350 mA.  
Nguồn: $V_{CC}$ = 12 V.  
Điều khiển: GPIO = 5 V, transistor BC337 ($\beta_{\min}$ = 100).

**Bước 1**: Dòng tải $I_C$ = 350 mA (LED là tải dòng hằng, không phải trở thuần — giả sử có điện trở giới hạn dòng $R_s$ sao cho $I_{LED}$ = 350 mA).

**Bước 2**: $I_{B(\min)}$ = 350 mA / 100 = **3.5 mA**.

**Bước 3**: OD = 5 → $I_B$ = 5 × 3.5 = **17.5 mA**.

**Bước 4**: $R_B = (5 - 0.7) / 0.0175 = 4.3 / 0.0175 =$ **246 Ω → chọn 220 Ω (giá trị chuẩn gần nhất, $I_B$ sẽ là ~19.5 mA)**.

**Kiểm tra**: $\beta \times I_B = 100 \times 19.5$ mA = 1.95 A >> $I_C$ = 350 mA → bão hòa sâu. Đúng.

### 3.3. Walk-through ví dụ 2 — Relay 5 V/80 mA, GPIO 3.3 V, BC547

Tải: Relay 5 V, dòng cuộn 80 mA.  
Nguồn: $V_{CC}$ = 5 V.  
Điều khiển: GPIO = 3.3 V, BC547 ($\beta_{\min}$ = 110).

**Bước 1**: $I_C$ = 80 mA.

**Bước 2**: $I_{B(\min)}$ = 80 mA / 110 = **0.727 mA**.

**Bước 3**: OD = 5 → $I_B$ = 5 × 0.727 = **3.64 mA**.

**Bước 4**: $R_B = (3.3 - 0.7) / 0.00364 = 2.6 / 0.00364 =$ **714 Ω → chọn 680 Ω (chuẩn E24)**.

**Kiểm tra**: $I_B = (3.3 - 0.7) / 680 = 2.6 / 680 =$ 3.82 mA. $\beta \times I_B = 110 \times 3.82 =$ 420 mA >> 80 mA → bão hòa. Công suất tiêu tán ở transistor: $P = V_{CE(\text{sat})} \times I_C = 0.2 \times 0.08 =$ **16 mW** — rất nhỏ, an toàn.

### 3.4. Walk-through ví dụ 3 — Động cơ DC nhỏ 500 mA, GPIO 3.3 V, 2N2222

Tải: Động cơ DC 12 V, dòng lúc chạy định mức 500 mA (dòng khởi động có thể 3× = 1.5 A).  
Nguồn: $V_{CC}$ = 12 V.  
Điều khiển: GPIO = 3.3 V, 2N2222 ($\beta_{\min}$ = 75 tại $I_C$ = 500 mA).

**Lưu ý động cơ**: dùng dòng định mức để tính $R_B$, nhưng cần transistor chịu được dòng đỉnh lúc khởi động (2N2222: $I_{C(\max)}$ = 600 mA — sát giới hạn; thực tế nên dùng transistor lớn hơn như TIP31, BD139 hoặc MOSFET cho tải trên 500 mA).

**Bước 1**: $I_C$ = 500 mA (định mức).

**Bước 2**: $I_{B(\min)}$ = 500 / 75 = **6.67 mA**.

**Bước 3**: OD = 5 → $I_B$ = **33.3 mA**. Kiểm tra: 33.3 mA < $I_{B(\max)}$ của GPIO (thường 40 mA) — ổn.

**Bước 4**: $R_B = (3.3 - 0.7) / 0.0333 = 2.6 / 0.0333 =$ **78 Ω → chọn 82 Ω**.

**Cảnh báo**: 2N2222 với $I_C$ = 500 mA và dòng khởi động 1.5 A vượt giới hạn. Nếu thiết kế thực, chọn transistor lớn hơn (BD139 $I_{C(\max)}$ = 1.5 A, TIP31C 3 A).

### 3.5. Walk-through ví dụ 4 — Còi buzzer 12 V / 200 mA, GPIO 5 V, BC337

Tải: Buzzer điện từ 12 V, 200 mA.  
Điều khiển: GPIO = 5 V, BC337 ($\beta$ = 100 tại $I_C$ = 100 mA; $\beta \approx$ 63 tại $I_C$ = 500 mA — tra datasheet; ở 200 mA ta lấy $\beta$ = 80 thận trọng).

**Bước 1**: $I_C$ = 200 mA.

**Bước 2**: $I_{B(\min)}$ = 200 / 80 = **2.5 mA**.

**Bước 3**: OD = 5 → $I_B$ = **12.5 mA**.

**Bước 4**: $R_B = (5 - 0.7) / 0.0125 = 4.3 / 0.0125 =$ **344 Ω → chọn 330 Ω**.

**Kiểm tra**: $I_B = (5 - 0.7) / 330 =$ 13 mA. $\beta \times I_B = 80 \times 13 =$ 1040 mA >> 200 mA → bão hòa sâu.

❓ **Câu hỏi tự nhiên của người đọc**

*"OD = 5 lấy từ đâu? Có thể OD = 2 không?"*

OD = 2–3 là chấp nhận được nếu β transistor ổn định và nhiệt độ không thay đổi nhiều. OD = 5–10 phổ biến trong thiết kế thực vì:
1. Datasheet ghi $\beta_{\min}$ — transistor cụ thể có thể có $\beta$ cao hơn, nhưng nếu $\beta$ bị thấp vì nhiệt độ cao, linh kiện già... OD thấp có thể không đủ bão hòa.
2. Bão hòa sâu hơn → $V_{CE}$ nhỏ hơn → tổn thất nhiệt ít hơn → transistor mát hơn.
3. Thời gian chuyển trạng thái nhanh hơn (quan trọng với PWM).

*"Nếu OD quá lớn (ví dụ 50), có hại không?"*

Với khóa tĩnh (DC ON/OFF), OD lớn chỉ tốn thêm dòng base (từ GPIO) — thường không đáng kể. Với PWM tần số cao, OD quá lớn khiến transistor mất nhiều thời gian thoát khỏi bão hòa (storage time tăng), giới hạn tần số tối đa. Thực tế OD = 5–10 là cân bằng hợp lý.

### 📝 Tóm tắt mục 3

- Bước thiết kế: $I_C \to I_{B(\min)} = I_C/\beta \to I_{B(\text{thiết kế})} = \text{OD} \times I_{B(\min)} \to R_B = (V_{GPIO} - 0.7) / I_{B(\text{thiết kế})}$.
- OD = 5 là lựa chọn phổ biến và an toàn.
- Luôn kiểm tra: $\beta \times I_B > I_C(\text{tải})$ trước khi coi transistor đã bão hòa.
- Sau khi chọn $R_B$ chuẩn: tính lại $I_B$ thực $= (V_{GPIO} - 0.7) / R_B$ rồi kiểm tra lại.

---

## 4. Điều khiển tải thực tế và Diode Flyback

### 4.1. Tải thuần trở — LED công suất

Sơ đồ cơ bản (tải LED công suất):

<svg viewBox="0 0 560 315" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="BJT NPN làm công tắc LED: V_CC → R_s 100 Ω → LED → collector; emitter GND; base qua R_B 220 Ω từ GPIO">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <g transform="translate(90,0)">
  <text x="200.0" y="24.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_CC (+12 V)</text>
  <line x1="200.0" y1="30.0" x2="200.0" y2="50.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="50.0" x2="200.0" y2="58.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="193.0" y="58.0" width="14.0" height="44.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="212.0" y="84.0" fill="#1d4ed8" font-size="11" text-anchor="start" font-weight="700">R_s</text>
  <text x="212.0" y="97.0" fill="#475569" font-size="10" text-anchor="start">100 Ω</text>
  <line x1="200.0" y1="102.0" x2="200.0" y2="110.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="110.0" x2="200.0" y2="154.0" stroke="#1a202c" stroke-width="2"/>
  <polygon points="190.0,122.0 210.0,122.0 200.0,142.0" fill="#dc2626" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="190.0" y1="142.0" x2="210.0" y2="142.0" stroke="#dc2626" stroke-width="2.5"/>
  <text x="216.0" y="136.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700"></text>
  <line x1="212.0" y1="128.0" x2="226.0" y2="118.0" stroke="#b45309" stroke-width="1.5" marker-end="url(#ledm)"/>
  <line x1="212.0" y1="138.0" x2="226.0" y2="128.0" stroke="#b45309" stroke-width="1.5" marker-end="url(#ledm)"/>
  <text x="234.0" y="146.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">LED</text>
  <line x1="158.0" y1="200.0" x2="182.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="182.0" y1="184.0" x2="182.0" y2="216.0" stroke="#7c3aed" stroke-width="3"/>
  <line x1="182.0" y1="194.0" x2="200.0" y2="176.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="182.0" y1="206.0" x2="200.0" y2="224.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="200.0" y1="176.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="224.0" x2="200.0" y2="234.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="190.0" y1="214.0" x2="199.0" y2="223.0" stroke="#7c3aed" stroke-width="2" marker-end="url(#npnm)"/>
  <circle cx="190" cy="200" r="24" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <text x="176.0" y="186.0" fill="#475569" font-size="10" text-anchor="end">B</text>
  <text x="206.0" y="172.0" fill="#475569" font-size="10" text-anchor="start">C</text>
  <text x="206.0" y="232.0" fill="#475569" font-size="10" text-anchor="start">E</text>
  <text x="218.0" y="204.0" fill="#7c3aed" font-size="11" text-anchor="start" font-weight="700">NPN</text>
  <line x1="200.0" y1="150.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="166.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="234.0" x2="200.0" y2="256.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="256.0" x2="200.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="186.0" y1="266.0" x2="214.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="191.0" y1="271.0" x2="209.0" y2="271.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="196.0" y1="276.0" x2="204.0" y2="276.0" stroke="#1a202c" stroke-width="2"/>
  <text x="200.0" y="290.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <line x1="158.0" y1="200.0" x2="128.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="84.0" y="193.0" width="44.0" height="14.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="106.0" y="188.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">R_B</text>
  <text x="106.0" y="224.0" fill="#475569" font-size="10" text-anchor="middle">220 Ω</text>
  <line x1="84.0" y1="200.0" x2="58.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <text x="52.0" y="204.0" fill="#1d4ed8" font-size="11" text-anchor="end" font-weight="700">GPIO (5 V / 0 V)</text>
  </g>
  <text x="280.0" y="300.0" fill="#475569" font-size="11" text-anchor="middle">GPIO = 5 V → BJT bão hoà → LED sáng; GPIO = 0 V → tắt</text>
</svg>

Phân tích trạng thái:
- GPIO = LOW (0 V): $V_{BE}$ = 0 V < 0.6 V → cutoff → $I_C$ = 0 → LED tắt. $V_{CE} = V_{CC}$ = 12 V (toàn bộ nguồn rơi trên transistor, không sao vì $I_C \approx 0$, $P \approx 0$).
- GPIO = HIGH (5 V): $V_{BE} \approx$ 0.7 V, $I_B \approx (5 - 0.7) / 220 =$ 19.5 mA → transistor bão hòa → $V_{CE} \approx$ 0.2 V → LED sáng với $I_{LED} = (12 - V_{LED} - 0.2) / R_s$.

### 4.2. Tải cảm — Relay và Diode Flyback

Relay và động cơ DC có **cuộn dây cảm (inductor)**. Khi transistor ngắt đột ngột, dòng qua cuộn dây không thể thay đổi ngay lập tức (tính chất cơ bản của cuộn cảm — xem [Lesson 05 — Cuộn cảm và RL](../../01-Fundamentals/lesson-05-inductor-rl/) để hiểu rõ hơn). Cuộn dây "tự cảm" tạo ra điện áp **ngược chiều, biên độ có thể rất lớn** (vài chục đến vài trăm V) để duy trì dòng điện.

Điện áp ngược này — gọi là **spike cảm (inductive kick)** — xuất hiện tại collector và có thể phá hủy transistor ($V_{CEO(\max)}$ của 2N2222 = 30 V, BC547 = 45 V — spike dễ vượt qua).

**Giải pháp: Diode Flyback (Freewheeling Diode)**

Lắp một diode **ngược chiều** song song với tải cảm:

<svg viewBox="0 0 560 315" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="BJT lái relay với diode flyback 1N4007 song song cuộn relay (cathode nối V_CC, anode nối collector)">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <g transform="translate(90,0)">
  <text x="200.0" y="24.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_CC (+5 V)</text>
  <line x1="200.0" y1="30.0" x2="200.0" y2="50.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="50.0" x2="200.0" y2="58.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="188.0" y="58.0" width="24.0" height="60.0" rx="0" fill="white" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="184.0" y="92.0" fill="#7c3aed" font-size="10" text-anchor="end">cuộn relay</text>
  <line x1="200.0" y1="118.0" x2="200.0" y2="150.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="58.0" x2="270.0" y2="58.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="58.0" x2="270.0" y2="66.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="66.0" x2="270.0" y2="110.0" stroke="#1a202c" stroke-width="2"/>
  <polygon points="260.0,98.0 280.0,98.0 270.0,78.0" fill="#dc2626" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="260.0" y1="78.0" x2="280.0" y2="78.0" stroke="#dc2626" stroke-width="2.5"/>
  <text x="286.0" y="92.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700"></text>
  <line x1="270.0" y1="110.0" x2="270.0" y2="142.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="142.0" x2="200.0" y2="142.0" stroke="#1a202c" stroke-width="2"/>
  <circle cx="200.0" cy="58.0" r="3.5" fill="#1a202c"/>
  <circle cx="200.0" cy="142.0" r="3.5" fill="#1a202c"/>
  <text x="288.0" y="84.0" fill="#dc2626" font-size="10" text-anchor="start" font-weight="700">1N4007 (flyback)</text>
  <text x="288.0" y="97.0" fill="#475569" font-size="9" text-anchor="start">cathode lên V_CC, anode xuống collector</text>
  <line x1="158.0" y1="200.0" x2="182.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="182.0" y1="184.0" x2="182.0" y2="216.0" stroke="#7c3aed" stroke-width="3"/>
  <line x1="182.0" y1="194.0" x2="200.0" y2="176.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="182.0" y1="206.0" x2="200.0" y2="224.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="200.0" y1="176.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="224.0" x2="200.0" y2="234.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="190.0" y1="214.0" x2="199.0" y2="223.0" stroke="#7c3aed" stroke-width="2" marker-end="url(#npnm)"/>
  <circle cx="190" cy="200" r="24" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <text x="176.0" y="186.0" fill="#475569" font-size="10" text-anchor="end">B</text>
  <text x="206.0" y="172.0" fill="#475569" font-size="10" text-anchor="start">C</text>
  <text x="206.0" y="232.0" fill="#475569" font-size="10" text-anchor="start">E</text>
  <text x="218.0" y="204.0" fill="#7c3aed" font-size="11" text-anchor="start" font-weight="700">NPN</text>
  <line x1="200.0" y1="150.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="166.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="234.0" x2="200.0" y2="256.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="256.0" x2="200.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="186.0" y1="266.0" x2="214.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="191.0" y1="271.0" x2="209.0" y2="271.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="196.0" y1="276.0" x2="204.0" y2="276.0" stroke="#1a202c" stroke-width="2"/>
  <text x="200.0" y="290.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <line x1="158.0" y1="200.0" x2="128.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="84.0" y="193.0" width="44.0" height="14.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="106.0" y="188.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">R_B</text>
  <text x="106.0" y="224.0" fill="#475569" font-size="10" text-anchor="middle">220 Ω</text>
  <line x1="84.0" y1="200.0" x2="58.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <text x="52.0" y="204.0" fill="#1d4ed8" font-size="11" text-anchor="end" font-weight="700">GPIO (5 V / 0 V)</text>
  </g>
  <text x="280.0" y="300.0" fill="#475569" font-size="11" text-anchor="middle">khi BJT tắt đột ngột, dòng cuộn relay xả qua diode → bảo vệ transistor</text>
</svg>

Cụ thể hơn:

<svg viewBox="0 0 560 315" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Cách vẽ gọn: V_CC → cuộn relay ∥ 1N4007 → collector NPN → emitter GND">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <g transform="translate(90,0)">
  <text x="200.0" y="24.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_CC</text>
  <line x1="200.0" y1="30.0" x2="200.0" y2="50.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="50.0" x2="200.0" y2="58.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="188.0" y="58.0" width="24.0" height="60.0" rx="0" fill="white" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="184.0" y="92.0" fill="#7c3aed" font-size="10" text-anchor="end">cuộn relay</text>
  <line x1="200.0" y1="118.0" x2="200.0" y2="150.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="58.0" x2="270.0" y2="58.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="58.0" x2="270.0" y2="66.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="66.0" x2="270.0" y2="110.0" stroke="#1a202c" stroke-width="2"/>
  <polygon points="260.0,98.0 280.0,98.0 270.0,78.0" fill="#dc2626" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="260.0" y1="78.0" x2="280.0" y2="78.0" stroke="#dc2626" stroke-width="2.5"/>
  <text x="286.0" y="92.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700"></text>
  <line x1="270.0" y1="110.0" x2="270.0" y2="142.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="270.0" y1="142.0" x2="200.0" y2="142.0" stroke="#1a202c" stroke-width="2"/>
  <circle cx="200.0" cy="58.0" r="3.5" fill="#1a202c"/>
  <circle cx="200.0" cy="142.0" r="3.5" fill="#1a202c"/>
  <text x="288.0" y="84.0" fill="#dc2626" font-size="10" text-anchor="start" font-weight="700">1N4007 (flyback)</text>
  <text x="288.0" y="97.0" fill="#475569" font-size="9" text-anchor="start">cathode lên V_CC, anode xuống collector</text>
  <line x1="158.0" y1="200.0" x2="182.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="182.0" y1="184.0" x2="182.0" y2="216.0" stroke="#7c3aed" stroke-width="3"/>
  <line x1="182.0" y1="194.0" x2="200.0" y2="176.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="182.0" y1="206.0" x2="200.0" y2="224.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="200.0" y1="176.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="224.0" x2="200.0" y2="234.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="190.0" y1="214.0" x2="199.0" y2="223.0" stroke="#7c3aed" stroke-width="2" marker-end="url(#npnm)"/>
  <circle cx="190" cy="200" r="24" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <text x="176.0" y="186.0" fill="#475569" font-size="10" text-anchor="end">B</text>
  <text x="206.0" y="172.0" fill="#475569" font-size="10" text-anchor="start">C</text>
  <text x="206.0" y="232.0" fill="#475569" font-size="10" text-anchor="start">E</text>
  <text x="218.0" y="204.0" fill="#7c3aed" font-size="11" text-anchor="start" font-weight="700">NPN</text>
  <line x1="200.0" y1="150.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="166.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="234.0" x2="200.0" y2="256.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="256.0" x2="200.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="186.0" y1="266.0" x2="214.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="191.0" y1="271.0" x2="209.0" y2="271.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="196.0" y1="276.0" x2="204.0" y2="276.0" stroke="#1a202c" stroke-width="2"/>
  <text x="200.0" y="290.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <line x1="158.0" y1="200.0" x2="128.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="84.0" y="193.0" width="44.0" height="14.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="106.0" y="188.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">R_B</text>
  <text x="106.0" y="224.0" fill="#475569" font-size="10" text-anchor="middle">220 Ω</text>
  <line x1="84.0" y1="200.0" x2="58.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <text x="52.0" y="204.0" fill="#1d4ed8" font-size="11" text-anchor="end" font-weight="700">GPIO (5 V / 0 V)</text>
  </g>
  <text x="280.0" y="300.0" fill="#475569" font-size="11" text-anchor="middle">cùng mạch với hình trên, vẽ gọn: relay và diode song song giữa V_CC và collector</text>
</svg>

Khi transistor ngắt: cuộn relay muốn duy trì dòng → tạo EMF ngược → diode 1N4007 phân cực thuận → tạo vòng tuần hoàn kín cho dòng cảm chạy qua diode → năng lượng cảm tiêu tán dần trong điện trở cuộn → spike bị dập tắt an toàn.

⚠ **Lỗi thường gặp — quên diode flyback**

Không lắp diode flyback khi điều khiển relay/motor → transistor chết sau vài lần bật/tắt do spike cảm. Triệu chứng: mạch hoạt động vài phút rồi transistor chết (ngắn mạch C–E hoặc hở mạch), không có dấu hiệu gì trước đó.

Diode phù hợp: 1N4001 đến 1N4007 (thông dụng, rẻ), 1N5819 Schottky (phục hồi nhanh hơn, tốt cho PWM tần số cao).

Xem thêm: [Lesson 02 — Diode](../lesson-02-diode/) về đặc tuyến diode và phân cực thuận/nghịch.

### 4.3. NPN Low-Side Switch

Cấu hình phổ biến nhất: transistor NPN nằm ở **phía thấp (low-side)** — tức là giữa tải và GND.

<svg viewBox="0 0 560 315" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Sườn chung BJT switch: V_CC → tải → collector; emitter GND; base qua R_B từ GPIO">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <g transform="translate(90,0)">
  <text x="200.0" y="24.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_CC</text>
  <line x1="200.0" y1="30.0" x2="200.0" y2="50.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="50.0" x2="200.0" y2="80.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="170.0" y="80.0" width="60.0" height="40.0" rx="6" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="200.0" y="104.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">Tải</text>
  <line x1="200.0" y1="120.0" x2="200.0" y2="150.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="158.0" y1="200.0" x2="182.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="182.0" y1="184.0" x2="182.0" y2="216.0" stroke="#7c3aed" stroke-width="3"/>
  <line x1="182.0" y1="194.0" x2="200.0" y2="176.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="182.0" y1="206.0" x2="200.0" y2="224.0" stroke="#7c3aed" stroke-width="2"/>
  <line x1="200.0" y1="176.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="224.0" x2="200.0" y2="234.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="190.0" y1="214.0" x2="199.0" y2="223.0" stroke="#7c3aed" stroke-width="2" marker-end="url(#npnm)"/>
  <circle cx="190" cy="200" r="24" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <text x="176.0" y="186.0" fill="#475569" font-size="10" text-anchor="end">B</text>
  <text x="206.0" y="172.0" fill="#475569" font-size="10" text-anchor="start">C</text>
  <text x="206.0" y="232.0" fill="#475569" font-size="10" text-anchor="start">E</text>
  <text x="218.0" y="204.0" fill="#7c3aed" font-size="11" text-anchor="start" font-weight="700">NPN</text>
  <line x1="200.0" y1="150.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="166.0" x2="200.0" y2="166.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="234.0" x2="200.0" y2="256.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="200.0" y1="256.0" x2="200.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="186.0" y1="266.0" x2="214.0" y2="266.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="191.0" y1="271.0" x2="209.0" y2="271.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="196.0" y1="276.0" x2="204.0" y2="276.0" stroke="#1a202c" stroke-width="2"/>
  <text x="200.0" y="290.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <line x1="158.0" y1="200.0" x2="128.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="84.0" y="193.0" width="44.0" height="14.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="106.0" y="188.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">R_B</text>
  <text x="106.0" y="224.0" fill="#475569" font-size="10" text-anchor="middle">220 Ω</text>
  <line x1="84.0" y1="200.0" x2="58.0" y2="200.0" stroke="#1a202c" stroke-width="2"/>
  <text x="52.0" y="204.0" fill="#1d4ed8" font-size="11" text-anchor="end" font-weight="700">GPIO (5 V / 0 V)</text>
  </g>
  <text x="280.0" y="300.0" fill="#475569" font-size="11" text-anchor="middle">tải bất kỳ (LED, relay, motor nhỏ) đặt phía collector</text>
</svg>

Ưu điểm low-side NPN:
- GPIO output 3.3–5 V dễ dàng phân cực thuận B–E ($V_{BE}$ = 0.7 V, không cần điện áp đặc biệt).
- GND của tải và mạch điều khiển chung → đơn giản.

Lưu ý high-side switch (transistor ở phía cao — giữa $V_{CC}$ và tải):
- Với NPN, phải có $V_B > V_E > V_{CC}$ (để $V_{BE} > 0$), cần mạch đặc biệt.
- Thường dùng PNP hoặc MOSFET kênh P cho high-side switch.
- Trường hợp tải cần GND cố định (ví dụ relay có chân GND nối trực tiếp chassis) → phải dùng high-side.

### 4.4. Transistor NPN thông dụng

| Transistor | $I_{C(\max)}$ | $V_{CEO}$ | $\beta_{\min}$ | Gói | Ghi chú |
|------------|----------|-------|-------|-----|---------|
| **BC547** | 100 mA | 45 V | 110 | TO-92 | Tải nhỏ, phổ biến nhất |
| **BC337** | 800 mA | 45 V | 100 | TO-92 | Tải trung bình |
| **2N2222** | 600 mA | 30 V | 75 | TO-18/TO-92 | Kinh điển, tốc độ cao |
| **2N2222A** | 600 mA | 40 V | 75 | TO-92 | Phiên bản nhựa 2N2222 |
| **BD139** | 1.5 A | 80 V | 40 | TO-126 | Relay/motor trung bình |
| **TIP31C** | 3 A | 100 V | 10 | TO-220 | Tải lớn |
| **2N3055** | 15 A | 60 V | 20 | TO-3 | Rất lớn, classic |

❓ **Câu hỏi tự nhiên của người đọc**

*"Chọn transistor dựa trên tiêu chí nào?"*

Ưu tiên theo thứ tự:
1. $I_{C(\max)} >$ dòng đỉnh tải × 1.5 (hệ số an toàn).
2. $V_{CEO} > V_{CC} \times 1.5$ (không bị đánh thủng khi spike hoặc $V_{CC}$ dao động).
3. $\beta$ đủ lớn để $R_B$ không quá nhỏ (sẽ lấy nhiều dòng từ GPIO).
4. Gói phù hợp (TO-92 cho PCB nhỏ, TO-220 khi cần tản nhiệt).
5. Giá / tính sẵn có.

### 📝 Tóm tắt mục 4

- Tải trở: mạch đơn giản, không cần thêm gì ngoài $R_B$ và $R_s$ (giới hạn dòng tải).
- Tải cảm (relay, motor, buzzer điện từ): **bắt buộc** lắp diode flyback song song với tải.
- Cấu hình low-side NPN phổ biến nhất — GPIO dễ điều khiển.
- Chọn transistor: $I_{C(\max)} > 1.5\times$ dòng đỉnh tải, $V_{CEO} > 1.5\times V_{CC}$.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Tính R_B cơ bản**

Mạch khóa LED đơn 20 mA, $V_{CC}$ = 5 V, $V_{LED}$ = 2.0 V. Transistor BC547 ($\beta$ = 200), GPIO = 3.3 V. Đã có $R_s$ = 150 Ω. Tính $R_B$ với OD = 5.

**Bài 2 — Kiểm tra bão hòa**

Mạch đang có $R_B$ = 10 kΩ, $V_{GPIO}$ = 5 V, tải $I_C$ = 50 mA. Transistor BC547 ($\beta_{\min}$ = 110). Transistor có bão hòa không? Tính $V_{CE}$ thực tế nếu không bão hòa.

**Bài 3 — Relay với diode flyback**

Relay 12 V, cuộn dây 150 Ω (nên dòng cuộn = 12/150 = 80 mA). GPIO = 5 V. Chọn transistor BC337 ($\beta$ = 100). Tính $R_B$ với OD = 5. Chọn diode flyback phù hợp.

**Bài 4 — Chọn transistor**

Tải: Động cơ DC 24 V, dòng định mức 1 A, dòng khởi động 3 A. GPIO = 5 V. Chọn transistor phù hợp từ bảng mục 4.4. Tính $R_B$.

**Bài 5 — Phân tích mạch lỗi**

Mạch có: $V_{CC}$ = 5 V, $R_{\text{tải}}$ = 47 Ω, BC547 ($\beta$ = 200), $R_B$ = 47 kΩ, GPIO = 3.3 V. Transistor có bão hòa không? Công suất tiêu tán trên transistor là bao nhiêu?

**Bài 6 (nâng cao) — Thiết kế mạch PWM**

Vi điều khiển xuất PWM 1 kHz để điều chỉnh độ sáng LED công suất 12 V / 500 mA. Transistor 2N2222. Tính $R_B$ phù hợp. Nhận xét về storage time của 2N2222 ($t_s \approx$ 225 ns theo datasheet) so với chu kỳ $T$ = 1 ms.

### Lời giải chi tiết

**Bài 1 — Tính R_B cơ bản**

**Bước 1**: Dòng tải $I_C$ = 20 mA (đây là LED đơn, GPIO 3.3 V đủ thẳng nhưng ta dùng transistor cho bài tập).

**Bước 2**: $I_{B(\min)}$ = 20 mA / 200 = **0.1 mA**.

**Bước 3**: OD = 5 → $I_B$ = 5 × 0.1 = **0.5 mA**.

**Bước 4**: $R_B = (3.3 - 0.7) / 0.0005 = 2.6 / 0.0005 =$ **5,200 Ω → chọn 4.7 kΩ (E24 gần nhất; sẽ cho $I_B = 2.6/4700 =$ 0.553 mA)**.

**Kiểm tra**: $\beta \times I_B = 200 \times 0.553$ mA = 110.6 mA >> 20 mA → bão hòa sâu. Đúng.

**Bài 2 — Kiểm tra bão hòa**

$I_B = (5 - 0.7) / 10{,}000 = 4.3 / 10{,}000 =$ **0.43 mA**.

Nếu bão hòa: $I_C(\text{bão hòa})$ tối đa $= \beta \times I_B = 110 \times 0.43 =$ **47.3 mA**.

Nhưng tải yêu cầu $I_C$ = 50 mA > 47.3 mA → **transistor KHÔNG bão hòa**.

Transistor ở vùng tích cực với $I_C \approx \beta \times I_B =$ 47.3 mA (tải thực tế nhận ít hơn 50 mA yêu cầu).

$V_{CE} = V_{CC} - I_C \times R_{\text{tải}}$. Biết $I_C$ = 47.3 mA, cần $R_{\text{tải}}$:
- Nếu $R_{\text{tải}} = I_C$ gốc / V: giả sử $V_{CC}$ = 5 V, tải trở đơn giản với $I_C$ = 50 mA → $R_{\text{tải}} = (5 - V_{CE}) / 0.047$.
- Phương trình: $I_C = \beta \times I_B =$ 47.3 mA $= (5 - V_{CE}) / R_{\text{tải}}$.
- Với $R_{\text{tải}} = 5/0.05 =$ 100 Ω (suy ra từ $I_C$ thiết kế 50 mA và $V_{CC}$ 5 V bỏ qua $V_{CE}$ nhỏ):
  $V_{CE} = 5 - 0.0473 \times 100 = 5 - 4.73 =$ **1.27 V** (không phải 0.2 V bão hòa).

Hậu quả: $P_{\text{transistor}} = V_{CE} \times I_C = 1.27 \times 0.0473 =$ **60 mW** — không cháy ngay nhưng transistor nóng, tải không nhận đủ điện.

**Bài 3 — Relay với diode flyback**

**Bước 1**: $I_C$ = 80 mA (dòng cuộn relay = 12 V / 150 Ω = 80 mA).

**Bước 2**: $I_{B(\min)}$ = 80 / 100 = **0.8 mA**.

**Bước 3**: OD = 5 → $I_B$ = **4 mA**.

**Bước 4**: $R_B = (5 - 0.7) / 0.004 = 4.3 / 0.004 =$ **1,075 Ω → chọn 1 kΩ**.

Kiểm tra: $I_B = 4.3 / 1000 =$ 4.3 mA. $\beta \times I_B = 100 \times 4.3 =$ 430 mA >> 80 mA → bão hòa.

**Diode flyback**: 1N4001 hoặc 1N4007 — chịu $V_{RRM}$ = 50–1000 V (relay 12 V spike không quá 50 V thông thường, 1N4001 đủ). Đặt cathode về phía $V_{CC}$ (+12 V), anode về phía collector. Dòng lúc flyback bằng $I_C$ = 80 mA — 1N4001 chịu 1 A liên tục → an toàn.

**Bài 4 — Chọn transistor**

Yêu cầu: $I_{C(\max)} >$ 3 A × 1.5 = **4.5 A**, $V_{CEO} >$ 24 V × 1.5 = **36 V**.

Tra bảng mục 4.4:
- BC547: 100 mA — không đủ.
- BC337: 800 mA — không đủ.
- 2N2222: 600 mA — không đủ.
- BD139: 1.5 A — không đủ.
- TIP31C: 3 A, 100 V — **gần đủ nhưng $I_{C(\max)}$ = 3 A < 4.5 A yêu cầu** → không chọn.
- **2N3055**: 15 A, 60 V, $\beta$ = 20 → **phù hợp**. Hoặc dùng TIP35C (25 A).

Tính $R_B$ với 2N3055, $\beta$ = 20, $I_C$ = 1 A (định mức; overdrive dựa trên định mức):

$I_{B(\min)} = 1$ A / 20 = **50 mA**.  
OD = 5 → $I_B$ = **250 mA**.

$R_B = (5 - 0.7) / 0.25 = 4.3 / 0.25 =$ **17.2 Ω → chọn 18 Ω**.

Lưu ý: $I_B$ = 250 mA >> dòng GPIO tối đa (40 mA). **Không thể điều khiển 2N3055 trực tiếp từ GPIO** — cần thêm một tầng transistor driver (BC337 hoặc BC547 làm driver, rồi 2N3055 làm khóa chính). Hoặc tốt hơn: dùng MOSFET công suất (xem Lesson 06) với mạch driver đơn giản hơn.

**Bài 5 — Phân tích mạch lỗi**

$I_B = (3.3 - 0.7) / 47{,}000 = 2.6 / 47{,}000 =$ **0.0553 mA = 55.3 µA**.

$I_C(\text{dự báo active}) = \beta \times I_B = 200 \times 55.3\,\mu\text{A} =$ **11.06 mA**.

$I_C(\text{cần bão hòa}) = (5 - 0.2) / 47 =$ **102 mA**.

Vì 11.06 mA << 102 mA: transistor ở vùng tích cực.

Thực tế $I_C \approx$ 11.06 mA (bị giới hạn bởi $\beta \times I_B$, không phải tải).

$V_{CE} = 5 - I_C \times 47 = 5 - 0.01106 \times 47 = 5 - 0.52 =$ **4.48 V** (cao, gần như ngắt).

**Công suất tiêu tán**: $P = V_{CE} \times I_C = 4.48 \times 11.06\,\text{mA} =$ **49.5 mW**.

Transistor không cháy nhưng mạch không hoạt động đúng: tải $R$ = 47 Ω nhận ~11 mA thay vì 100 mA. $R_B$ = 47 kΩ quá lớn cho mạch khóa này.

**Sửa lỗi**: giảm $R_B$ xuống khoảng 1 kΩ để $I_B \approx$ 2.6 mA, bão hòa sâu.

**Bài 6 — PWM 1 kHz**

Chu kỳ $T$ = 1 ms = 1,000 µs. Tần số 1 kHz.

$I_C$ = 500 mA, $\beta_{\min}$(2N2222) = 75 tại $I_C \approx$ 500 mA.

$I_{B(\min)} = 500 / 75 =$ **6.67 mA**.  
OD = 5 → $I_B$ = **33.3 mA**.  
$R_B = (5 - 0.7) / 0.0333 = 4.3 / 0.0333 =$ **129 Ω → chọn 120 Ω**.

**Nhận xét storage time**: 2N2222 datasheet: $t_s$ (storage time) ≈ 225 ns, $t_f$ (fall time) ≈ 60 ns. Tổng thời gian tắt ≈ 285 ns.

Chu kỳ $T$ = 1,000 µs = 1,000,000 ns >> 285 ns.

Tỉ lệ: 285 ns / 1,000,000 ns = 0.03% — **ảnh hưởng không đáng kể ở 1 kHz**. 2N2222 hoạt động tốt với PWM 1 kHz.

Nếu tần số PWM tăng lên 100 kHz ($T$ = 10 µs = 10,000 ns): 285/10,000 = 2.85% — bắt đầu có sai lệch. Ở 1 MHz: không dùng được BJT thông thường nữa, phải dùng MOSFET hoặc transistor tốc độ cao (ví dụ 2N3904 với $t_s <$ 50 ns).

---

## 6. Liên kết và bài tiếp theo

- **Tiền đề**:
  - [Lesson 04 — BJT khuếch đại](../lesson-04-bjt-amplifier/) — mô hình BJT, vùng tích cực, β.
  - [Lesson 02 — Diode](../lesson-02-diode/) — diode flyback, đặc tuyến, $V_F$.
  - [Lesson 05 — Cuộn cảm và RL](../../01-Fundamentals/lesson-05-inductor-rl/) — hiện tượng tự cảm, spike, năng lượng tích lũy trong cuộn dây.

- **Bài tiếp theo**: [Lesson 06 — MOSFET làm khóa](../lesson-06-mosfet/) — MOSFET khóa điều khiển bằng điện áp (không cần dòng base), điện trở kênh $R_{DS(\text{on})}$ rất nhỏ, phù hợp tải lớn và PWM tần số cao.

- **Minh họa tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 05

1. **Vì sao cần transistor khóa**: GPIO/logic output chỉ cấp vài mA — không đủ cho tải lớn (relay, motor, LED công suất). Transistor khuếch đại dòng: $I_C = \beta \times I_B$.

2. **Hai trạng thái quan trọng**:
   - **Ngắt (cutoff)**: $V_{BE} <$ 0.5 V → $I_C \approx 0$ → tải tắt.
   - **Bão hòa (saturation)**: $I_B \geq I_C/\beta$ → $V_{CE} \approx$ 0.2 V → tải nhận đủ điện.

3. **Công thức thiết kế $R_B$**:
   - $I_B = \text{OD} \times I_C / \beta$ (OD = 5 thông dụng)
   - $R_B = (V_{GPIO} - 0.7) / I_B$
   - Luôn kiểm tra lại: $\beta \times I_B > I_C(\text{tải})$.

4. **Diode flyback bắt buộc** với tải cảm (relay, motor, buzzer điện từ). Diode 1N4001–1N4007 là lựa chọn thông dụng.

5. **Chọn transistor**: BC547 (≤100 mA), BC337/2N2222 (≤500 mA), BD139 (≤1.5 A), TIP31C (≤3 A). Khi tải lớn hơn hoặc cần PWM tần số cao → chuyển sang MOSFET (Lesson 06).
