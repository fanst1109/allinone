# Lesson 07 — Op-amp cơ bản

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu op-amp (operational amplifier — bộ khuếch đại thuật toán) là gì và các thông số cơ bản.
- Nắm 2 quy tắc vàng (golden rules) của op-amp khi có hồi tiếp âm và biết vì sao chúng đúng.
- Tính hệ số khuếch đại A_v cho mạch **không đảo** và mạch **đảo** từ giá trị điện trở.
- Hiểu khái niệm **đất ảo** (virtual ground) và **đoản mạch ảo** (virtual short).
- Biết vì sao mạch **buffer/voltage follower** giải quyết vấn đề loading effect.
- Nhận biết các giới hạn thực tế: bão hòa (saturation), slew rate, offset.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, dòng điện, điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/)
- [Lesson 02 — Mạch điện & định luật Kirchhoff](../../01-Fundamentals/lesson-02-kirchhoff-circuits/)
- [Lesson 03 — Phân áp & điện trở](../../01-Fundamentals/lesson-03-resistors-divider/) — cơ sở để hiểu mạch hồi tiếp và loading effect.

---

## 1. Op-amp là gì?

### 1.1. Định nghĩa và cấu trúc

💡 **Trực giác trước**: Hình dung một bộ khuếch đại âm thanh siêu nhạy. Bạn thì thầm rất khẽ vào micro (tín hiệu đầu vào cực nhỏ), loa phát ra tiếng rất to (tín hiệu đầu ra khuếch đại). Op-amp làm điều tương tự nhưng với điện áp, và nó làm điều đó với hệ số khuếch đại **khổng lồ** — lên đến 100,000 lần hoặc hơn.

**Op-amp (operational amplifier — bộ khuếch đại thuật toán)** là vi mạch khuếch đại vi sai: nó khuếch đại **sự chênh lệch** giữa hai ngõ vào.

Cấu trúc cơ bản:

```
          +Vcc
           |
      ┌────┴────┐
V+ ───┤ +       │
      │  Op-amp ├─── V_out
V− ───┤ −       │
      └────┬────┘
           |
          −Vcc (hoặc GND)
```

Ba cực tín hiệu:
- **V+**: ngõ vào không đảo (non-inverting input) — tín hiệu vào đây được khuếch đại giữ nguyên pha.
- **V−**: ngõ vào đảo (inverting input) — tín hiệu vào đây được khuếch đại và đảo pha.
- **V_out**: ngõ ra.

Ngoài ra còn 2 chân nguồn: **+Vcc** và **−Vcc** (cấp nguồn đôi, ví dụ ±15 V) hoặc +Vcc và GND (nguồn đơn).

**Phương trình cơ bản** (op-amp lý tưởng, không có hồi tiếp):

```
V_out = A_OL × (V+ − V−)
```

Trong đó **A_OL** = hệ số khuếch đại vòng hở (open-loop gain) — thường từ 100,000 đến 1,000,000.

**Vi mạch thông dụng:**
- **741 (μA741)**: op-amp cổ điển, ±15 V, dùng để học. Giới hạn tốc độ slew rate 0.5 V/μs.
- **LM358**: dual op-amp, single supply (3–32 V), kinh tế, phổ biến trong dự án.
- **LM741**: tương đương 741, vỏ DIP-8.
- **TL071, TL081**: JFET input, trở vào rất cao, slew rate tốt hơn 741.

### 1.2. Vì sao A_OL lớn lại hữu ích?

❓ **Câu hỏi tự nhiên:**

> *"Hệ số khuếch đại 100,000 nghe quá lớn — V_out sẽ bị bão hòa ngay lập tức cho dù V+ − V− nhỏ thế nào. Vậy dùng làm gì?"*

Câu trả lời: A_OL lớn **chính xác là điều ta muốn** — nhưng chỉ khi kết hợp với **hồi tiếp âm (negative feedback)**. Hồi tiếp âm kết nối ngõ ra về ngõ vào đảo, kiểm soát A_OL khổng lồ đó và tạo ra hệ số khuếch đại **ổn định, dự đoán được** chỉ phụ thuộc vào điện trở bên ngoài.

> *"Nếu không có hồi tiếp thì sao?"*

Không có hồi tiếp → op-amp làm **bộ so sánh (comparator)**: chỉ cần V+ > V− một chút là V_out = +Vcc (bão hòa dương); V+ < V− → V_out = −Vcc (bão hòa âm). Đây cũng là ứng dụng quan trọng nhưng không phải bài này.

### 1.3. Walk-through: V_out bão hòa nếu không có hồi tiếp

Op-amp 741, nguồn ±15 V, A_OL = 200,000:
- V+ = 1.000 mV, V− = 0.999 mV → (V+ − V−) = 0.001 mV.
- V_out = 200,000 × 0.001 mV = **200 mV** (OK, còn trong dải).
- V+ = 1.001 mV, V− = 0.999 mV → (V+ − V−) = 0.002 mV.
- V_out = 200,000 × 0.002 mV = **400 mV** (OK).
- V+ = 0.1 mV, V− = 0 → V_out = 200,000 × 0.1 mV = **20 V** — vượt +15 V → bão hòa ở ~+13.5 V.

Chỉ cần tín hiệu vào > 75 μV là bão hòa! Op-amp mạch hở không có điểm làm việc ổn định — bắt buộc phải dùng hồi tiếp.

📝 **Tóm tắt mục 1:**
- Op-amp = bộ khuếch đại vi sai, V_out = A_OL × (V+ − V−), A_OL ~ 100,000–1,000,000.
- Hai ngõ vào: V+ (không đảo), V− (đảo). Cấp nguồn đôi hoặc đơn.
- Mạch hở → bão hòa ngay với tín hiệu rất nhỏ; phải dùng hồi tiếp âm mới kiểm soát được.
- Vi mạch phổ biến: 741, LM358.

---

## 2. Op-amp lý tưởng & 2 quy tắc vàng

### 2.1. Op-amp lý tưởng

Để phân tích mạch dễ dàng, ta dùng mô hình **op-amp lý tưởng** với các giả định:

| Thông số | Op-amp lý tưởng | Thực tế (741) |
|----------|----------------|---------------|
| Hệ số khuếch đại vòng hở A_OL | ∞ | 200,000 |
| Trở kháng đầu vào Z_in | ∞ | 2 MΩ |
| Trở kháng đầu ra Z_out | 0 | 75 Ω |
| Băng thông | ∞ | ~1 MHz |
| Offset điện áp | 0 | ~1–5 mV |

### 2.2. Hai quy tắc vàng (khi có hồi tiếp âm)

💡 **Trực giác**: Tưởng tượng op-amp như một người quản lý cực kỳ nhiệt tình và nhanh nhẹn. Khi bạn ra lệnh (V+) và thực tế (V−) chênh nhau dù chỉ một chút, anh ta lập tức điều chỉnh ngõ ra để triệt tiêu sự chênh lệch đó. Vì anh ta làm điều đó với "tốc độ vô hạn" (A_OL = ∞), trạng thái ổn định duy nhất là V+ = V−.

**Quy tắc vàng 1 (Virtual Short — đoản mạch ảo):**

```
V+ = V−    (khi có hồi tiếp âm)
```

Hai ngõ vào có điện áp bằng nhau — nhưng **KHÔNG nối dây với nhau** (virtual = ảo, không thật). Đây là hệ quả của A_OL = ∞: nếu V+ ≠ V−, dù chênh lệch cực nhỏ, V_out sẽ thay đổi lớn cho đến khi hồi tiếp kéo V− về bằng V+.

**Quy tắc vàng 2 (Zero Input Current — dòng vào bằng 0):**

```
I+ = I− = 0    (dòng vào các ngõ V+ và V− bằng 0)
```

Do trở kháng đầu vào Z_in = ∞, không có dòng nào chảy vào hai ngõ vào.

### 2.3. Chứng minh bằng ví dụ số

Xét mạch khuếch đại không đảo (sẽ học chi tiết mục 3), V_in = 2 V, R_f = 40 kΩ, R_in = 10 kΩ:

**Bước 1**: Áp dụng quy tắc 1: V+ = V− = V_in = 2 V.

**Bước 2**: Áp dụng quy tắc 2: không có dòng vào ngõ V−. Vậy toàn bộ dòng qua R_in cũng chạy qua R_f.

**Bước 3**: Dòng qua R_in: I = V− / R_in = 2 V / 10 kΩ = 0.2 mA.

**Bước 4**: Điện áp qua R_f: V_Rf = I × R_f = 0.2 mA × 40 kΩ = 8 V.

**Bước 5**: V_out = V− + V_Rf = 2 + 8 = **10 V**. Hệ số khuếch đại A_v = 10 V / 2 V = 5.

Kiểm tra: A_v = 1 + R_f / R_in = 1 + 40/10 = 5. ✓

⚠ **Lỗi thường gặp:**

> Người mới hay nghĩ "V+ = V− nghĩa là ngõ vào bị nối tắt" → KHÔNG ĐÚNG. V+ = V− là kết quả của hồi tiếp âm, không phải dây nối. Nếu cắt hồi tiếp, V+ ≠ V− và op-amp sẽ bão hòa ngay.

🔁 **Dừng lại tự kiểm tra:**

Op-amp có hồi tiếp âm, V+ = 3 V. Hỏi V− bằng bao nhiêu?

<details>
<summary>Xem đáp án</summary>

V− = V+ = **3 V** (quy tắc vàng 1 — đoản mạch ảo). Dòng vào ngõ V− bằng 0 (quy tắc vàng 2). Hai điều này là xuất phát điểm để phân tích mọi mạch op-amp hồi tiếp âm.

</details>

📝 **Tóm tắt mục 2:**
- Op-amp lý tưởng: A_OL = ∞, Z_in = ∞, Z_out = 0.
- **Quy tắc vàng 1**: V+ = V− (khi có hồi tiếp âm).
- **Quy tắc vàng 2**: I+ = I− = 0 (không có dòng vào hai ngõ).
- Hai quy tắc này đủ để phân tích bất kỳ mạch op-amp hồi tiếp âm nào.

---

## 3. Mạch khuếch đại không đảo (Non-Inverting Amplifier)

### 3.1. Cấu trúc mạch

```
          ┌───────── R_f ──────────┐
          │                        │
V_in ──── V+      Op-amp      V_out ┘
              V− ──── R_in ──── GND
```

Cụ thể hơn:

```
V_in ─────────────────── V+ ───────────── V_out
                           │
                          V−
                           │
                   R_f     │     R_in
        V_out ─────────────┤──────────── GND
```

Tức là:
- V_in nối thẳng vào V+ (ngõ không đảo).
- Hồi tiếp âm: R_f nối từ V_out về V−; R_in nối từ V− xuống GND.
- Phân áp R_f / R_in lấy một phần V_out đưa về V−.

### 3.2. Dẫn xuất công thức

Áp dụng 2 quy tắc vàng:

1. V− = V+ = V_in (quy tắc 1).
2. Không có dòng vào V−, nên dòng qua R_in = dòng qua R_f = I.

Phân áp tại nút V−:

```
V− = V_out × R_in / (R_in + R_f)
```

Thay V− = V_in:

```
V_in = V_out × R_in / (R_in + R_f)
```

Suy ra:

```
V_out / V_in = (R_in + R_f) / R_in = 1 + R_f / R_in
```

**Công thức khuếch đại không đảo:**

```
A_v = 1 + R_f / R_in
```

Đặc điểm:
- A_v luôn ≥ 1 (tối thiểu là 1, khi R_f = 0 hoặc R_in = ∞).
- V_out **cùng pha** với V_in (không đảo pha).
- Trở kháng đầu vào rất cao (≈ Z_in của op-amp = 2 MΩ với 741).

### 3.3. Walk-through ≥ 4 ví dụ số

**Ví dụ 1** — R_f = 10 kΩ, R_in = 10 kΩ, V_in = 1 V:
- A_v = 1 + 10/10 = **2**.
- V_out = 2 × 1 V = **2 V**.
- Kiểm tra: V− = V_out × R_in/(R_in + R_f) = 2 × 10/20 = 1 V = V_in. ✓

**Ví dụ 2** — R_f = 40 kΩ, R_in = 10 kΩ, V_in = 2 V:
- A_v = 1 + 40/10 = **5**.
- V_out = 5 × 2 V = **10 V**.
- Kiểm tra: V− = 10 × 10/50 = 2 V = V_in. ✓

**Ví dụ 3** — R_f = 100 kΩ, R_in = 10 kΩ, V_in = 0.5 V:
- A_v = 1 + 100/10 = **11**.
- V_out = 11 × 0.5 V = **5.5 V**.
- Nếu nguồn ±12 V → không bão hòa (5.5 V < 10.5 V, khoảng 1.5 V trước rail).

**Ví dụ 4** — R_f = 90 kΩ, R_in = 10 kΩ, V_in = 1.5 V (nguồn ±12 V):
- A_v = 1 + 90/10 = **10**.
- V_out lý tưởng = 10 × 1.5 V = **15 V** — nhưng nguồn chỉ ±12 V → **bão hòa dương ~+10.5 V** (thực tế kém rail khoảng 1–2 V).
- Bài học: luôn kiểm tra V_out tính được có vượt rail không.

**Ví dụ 5** — V_in = −0.3 V, R_f = 20 kΩ, R_in = 5 kΩ:
- A_v = 1 + 20/5 = **5**.
- V_out = 5 × (−0.3) = **−1.5 V** (âm, vẫn cùng pha với V_in âm).

❓ **Câu hỏi tự nhiên:**

> *"Làm thế nào để chọn R_f và R_in khi cần A_v = 7?"*

Đặt 1 + R_f/R_in = 7 → R_f/R_in = 6. Chọn R_in = 10 kΩ → R_f = 60 kΩ (hoặc R_in = 5 kΩ → R_f = 30 kΩ). Thực tế chọn giá trị điện trở chuẩn (E24 series) gần nhất.

> *"Vì sao phải dùng kΩ, không dùng Ω nhỏ hay MΩ lớn?"*

Thực tế: điện trở quá nhỏ (vài chục Ω) → dòng lớn → tiêu hao công suất, có thể quá tải ngõ ra op-amp. Điện trở quá lớn (> 1 MΩ) → ảnh hưởng bởi dòng offset đầu vào và nhiễu. Vùng 1 kΩ – 100 kΩ là tối ưu.

📝 **Tóm tắt mục 3:**
- Mạch không đảo: V_in vào V+, hồi tiếp R_f về V−, R_in từ V− xuống GND.
- **A_v = 1 + R_f / R_in** (luôn ≥ 1, không đảo pha).
- Nếu V_out tính được vượt rail → bão hòa, V_out kẹp ở ~(Vcc − 1.5 V).

---

## 4. Mạch khuếch đại đảo (Inverting Amplifier)

### 4.1. Cấu trúc mạch

```
V_in ──── R_in ──── V− ──────────────────── V_out
                    │           │
                  R_f          (nối từ V_out về V−)
                    │
                  V+ = GND
```

Cụ thể:
- V_in nối qua R_in vào V− (ngõ đảo).
- R_f nối từ V_out về V−.
- V+ nối thẳng GND (hoặc qua điện trở bù offset nhỏ).

### 4.2. Khái niệm "đất ảo" (Virtual Ground)

💡 **Trực giác**: V+ = GND = 0 V. Vì quy tắc vàng 1: V− = V+ = 0 V. Nghĩa là điểm nút V− **luôn ở 0 V** dù V_in thay đổi — nhưng đây là 0 V "ảo", không phải dây nối đất thật. Dòng điện KHÔNG thể chảy vào đất qua điểm này. Đây gọi là **đất ảo (virtual ground)**.

### 4.3. Dẫn xuất công thức

1. V+ = GND = 0 V → V− = 0 V (đất ảo, quy tắc 1).
2. Dòng qua R_in: I_in = (V_in − V−) / R_in = (V_in − 0) / R_in = V_in / R_in.
3. Dòng vào V− = 0 (quy tắc 2) → I_in phải chạy hoàn toàn qua R_f.
4. Chiều dòng qua R_f từ V− về V_out: V_out − V− = −I_in × R_f.
   (Dấu âm vì dòng đi từ nút V− sang V_out, nghĩa là V_out thấp hơn 0 khi V_in > 0.)
5. V_out = −I_in × R_f = −(V_in / R_in) × R_f.

**Công thức khuếch đại đảo:**

```
A_v = V_out / V_in = −R_f / R_in
```

Đặc điểm:
- A_v âm → **đảo pha** (V_in dương → V_out âm).
- |A_v| = R_f / R_in (không cộng 1 như mạch không đảo).
- Trở kháng đầu vào = R_in (không cao bằng mạch không đảo).

### 4.4. Walk-through ≥ 4 ví dụ số

**Ví dụ 1** — R_f = 10 kΩ, R_in = 10 kΩ, V_in = 2 V:
- A_v = −10/10 = **−1**.
- V_out = −1 × 2 = **−2 V** (đảo pha, cùng biên độ).
- Đây là mạch đảo pha (inverter) đơn giản.

**Ví dụ 2** — R_f = 47 kΩ, R_in = 10 kΩ, V_in = 0.5 V:
- A_v = −47/10 = **−4.7**.
- V_out = −4.7 × 0.5 = **−2.35 V**.
- Kiểm tra đất ảo: V− = 0 V. Dòng I = 0.5 / 10k = 50 μA. V_out = 0 − 50μA × 47k = **−2.35 V**. ✓

**Ví dụ 3** — R_f = 100 kΩ, R_in = 10 kΩ, V_in = −1 V:
- A_v = −100/10 = **−10**.
- V_out = −10 × (−1) = **+10 V** (V_in âm → V_out dương).

**Ví dụ 4** — R_f = 22 kΩ, R_in = 4.7 kΩ, V_in = 0.8 V (nguồn ±9 V):
- A_v = −22/4.7 = **−4.68**.
- V_out = −4.68 × 0.8 = **−3.74 V** (trong rail ±9 V → không bão hòa).

**Ví dụ 5** — Cần A_v = −5: R_f/R_in = 5 → chọn R_in = 10 kΩ, R_f = 50 kΩ (dùng chuẩn 47 kΩ nếu cần gần đúng, hoặc 2 × 22 kΩ nối tiếp = 44 kΩ).

⚠ **Lỗi thường gặp:**

> Nhầm A_v = −R_f/R_in của mạch đảo với A_v = 1 + R_f/R_in của mạch không đảo. **Dấu hiệu nhận biết mạch đảo**: V_in đi qua điện trở vào ngõ V−; V+ nối GND.

🔁 **Dừng lại tự kiểm tra:**

Mạch đảo: R_f = 30 kΩ, R_in = 6 kΩ, V_in = 1.5 V. Tính V_out.

<details>
<summary>Xem đáp án</summary>

A_v = −R_f/R_in = −30/6 = **−5**.
V_out = −5 × 1.5 = **−7.5 V**.

Kiểm tra bằng đất ảo: I = 1.5 V / 6 kΩ = 250 μA. V_out = 0 − 250 μA × 30 kΩ = −7.5 V. ✓

</details>

📝 **Tóm tắt mục 4:**
- Mạch đảo: V_in qua R_in vào V−; V+ = GND; R_f từ V_out về V−.
- **A_v = −R_f / R_in** (âm → đảo pha).
- Đất ảo: V− = 0 V nhờ hồi tiếp âm, mặc dù không nối thật với GND.
- Trở kháng đầu vào = R_in (thấp hơn mạch không đảo).

---

## 5. Mạch buffer / Voltage Follower (A_v = 1)

### 5.1. Cấu trúc và công thức

```
V_in ──── V+ ────┐
                  ├──── V_out
         V− ─────┘
```

Ngõ ra nối thẳng về ngõ vào đảo (R_f = 0, R_in = ∞ → không có R_in). Áp dụng công thức không đảo:

```
A_v = 1 + R_f / R_in = 1 + 0/∞ = 1
```

Hoặc trực tiếp: quy tắc vàng 1: V− = V+ = V_in; V_out = V− = V_in. Vậy **V_out = V_in**.

### 5.2. Vì sao buffer lại hữu ích?

💡 **Trực giác**: Hình dung bạn có một bình nước (nguồn điện áp yếu) và muốn cấp cho 20 người (tải nặng). Nếu nối thẳng, áp suất giảm mạnh. Buffer là "máy bơm" — nhận áp suất từ bình nhỏ, duy trì đúng áp suất đó, rồi cung cấp cho 20 người từ nguồn riêng (nguồn op-amp).

**Vấn đề loading effect (hiệu ứng tải):** Khi tải R_L nối vào mạch phân áp (xem [Lesson 03 — Phân áp](../../01-Fundamentals/lesson-03-resistors-divider/)), dòng qua R_L thay đổi điện áp phân áp.

**Ví dụ cụ thể — loading effect:**

Mạch phân áp: R_1 = R_2 = 10 kΩ, nguồn V = 10 V.
- Không tải: V_out = 10 × 10/(10+10) = **5 V** (đúng ý muốn).
- Có tải R_L = 1 kΩ: R_2 // R_L = 10k // 1k = 0.909 kΩ.
  V_out = 10 × 0.909 / (10 + 0.909) = **0.83 V** — sụt từ 5 V xuống còn 0.83 V!

**Giải pháp: thêm buffer giữa phân áp và tải:**

```
V ──── R_1 ──── V_divider ──── Buffer ──── V_out = V_divider ──── R_L
                                  │
                                 R_2
                                  │
                                 GND
```

Buffer có trở vào rất cao (Z_in ≈ 2 MΩ) → gần như không lấy dòng từ phân áp → V_divider không bị kéo xuống. Buffer có trở ra rất thấp (Z_out ≈ 75 Ω) → cấp dòng cho R_L từ nguồn op-amp.

Kết quả: V_out vẫn là 5 V dù R_L = 1 kΩ hay 100 Ω.

**Ứng dụng phổ biến của buffer:**
- Cách ly cảm biến trở ra cao (như NTC thermistor) với mạch xử lý.
- Đệm tín hiệu âm thanh (mic pre-amp đầu vào).
- Giữ điện áp tham chiếu ổn định khi tải thay đổi.

📝 **Tóm tắt mục 5:**
- Buffer/voltage follower: V_out = V_in (A_v = 1), không khuếch đại.
- Công dụng: cách ly tải, trở vào cao ≈ 2 MΩ, trở ra thấp ≈ 75 Ω.
- Giải quyết loading effect khi mạch nguồn có trở ra cao.

---

## 6. Giới hạn thực tế

### 6.1. Bão hòa (Saturation)

V_out của op-amp **không thể** vượt điện áp nguồn. Thực tế thường thấp hơn rail khoảng 1–2 V (với 741, LM358). Ví dụ nguồn ±15 V → V_out tối đa ≈ ±13.5 V.

Op-amp rail-to-rail (như LM358A, OPA340) có thể ra gần sát nguồn hơn, nhưng vẫn không bằng đúng Vcc.

**Khi V_out bão hòa, hồi tiếp âm mất tác dụng** — quy tắc vàng không còn đúng. Mạch cần được thiết kế để V_out không bao giờ chạm rail ở điểm làm việc thông thường.

### 6.2. Slew Rate (tốc độ quét)

**Slew rate** là tốc độ tối đa mà V_out có thể thay đổi, đo bằng V/μs.

```
SR = ΔV_out / Δt   (V/μs)
```

Ví dụ: 741 có SR = 0.5 V/μs. Nếu cần tín hiệu sin 10 V_peak ở 100 kHz:
- Tốc độ đỉnh cần: 2π × f × V_peak = 2π × 100,000 × 10 = **6.28 V/μs**.
- Vượt 0.5 V/μs → tín hiệu bị méo thành dạng tam giác (slew-rate limiting).

LM318 có SR = 50 V/μs; TL071 có SR = 13 V/μs — phù hợp cho tần số cao hơn.

### 6.3. Offset điện áp (Input Offset Voltage)

Trong thực tế, ngay cả khi V+ = V− = 0, V_out không hoàn toàn = 0. Có một sai số nhỏ gọi là **offset điện áp V_os** (thường 1–5 mV với 741).

Trong mạch khuếch đại độ lợi cao (A_v = 1000), offset 5 mV sẽ gây ra V_out lỗi = 5 V — đáng kể. Các ứng dụng chính xác cần offset trimming hoặc chọn op-amp có V_os thấp (< 0.1 mV).

⚠ **Lỗi thường gặp khi làm thực tế:**

> Mắc mạch đảo đúng công thức nhưng quên R_f / R_in quá lớn → offset nhỏ được khuếch đại thành sai số lớn → ngõ ra dịch khỏi 0 khi V_in = 0.

📝 **Tóm tắt mục 6:**
- V_out bị kẹp tại ≈ (Vcc − 1.5 V) khi bão hòa.
- Slew rate giới hạn tốc độ thay đổi V_out (741: 0.5 V/μs, khá chậm).
- Offset V_os gây sai số V_out, nhân lên bởi hệ số khuếch đại.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Mạch không đảo: R_f = 56 kΩ, R_in = 8 kΩ. Tính A_v. Nếu V_in = 0.25 V thì V_out = ?

**Bài 2** — Mạch đảo: R_f = 33 kΩ, R_in = 10 kΩ, V_in = −2 V. Tính A_v và V_out. Nguồn ±12 V — có bão hòa không?

**Bài 3** — Mạch đảo: Cần A_v = −8. Chọn R_in = 10 kΩ. Tính R_f cần thiết.

**Bài 4** — Mạch không đảo: V_in = 0.8 V, nguồn ±9 V, R_f = 82 kΩ, R_in = 10 kΩ. Tính V_out. Có bão hòa không?

**Bài 5** — Mạch buffer: mạch phân áp R_1 = 47 kΩ, R_2 = 47 kΩ, V_nguồn = 12 V, tải R_L = 2.2 kΩ.
  - (a) V_out khi không có buffer.
  - (b) V_out khi có buffer op-amp lý tưởng.

**Bài 6 (thực tế)** — Mạch không đảo với 741 (nguồn ±15 V), V_in = 1.2 V, R_f = 68 kΩ, R_in = 10 kΩ.
  - (a) Tính A_v và V_out lý tưởng.
  - (b) V_out có bị kẹp không? Rail ước tính ±13.5 V.
  - (c) Tần số tín hiệu sin 10 V_peak tối đa để 741 không bị slew-rate limit (SR = 0.5 V/μs).

### Lời giải chi tiết

**Bài 1:**

Bước 1: Nhận dạng mạch không đảo → A_v = 1 + R_f / R_in.

Bước 2: A_v = 1 + 56 / 8 = 1 + 7 = **8**.

Bước 3: V_out = A_v × V_in = 8 × 0.25 = **2 V**.

Kiểm tra: V− = V_out × R_in / (R_in + R_f) = 2 × 8/(8+56) = 2 × 8/64 = 0.25 V = V_in. ✓

---

**Bài 2:**

Bước 1: Nhận dạng mạch đảo → A_v = −R_f / R_in.

Bước 2: A_v = −33 / 10 = **−3.3**.

Bước 3: V_out = −3.3 × (−2) = **+6.6 V**.

Bước 4: Kiểm tra bão hòa: Rail ±12 V → giới hạn thực ≈ ±10.5 V. V_out = 6.6 V < 10.5 V → **không bão hòa**.

Kiểm tra bằng đất ảo: I = V_in / R_in = −2 / 10k = −0.2 mA. V_out = −I × R_f = −(−0.2 mA) × 33k = **+6.6 V**. ✓

---

**Bài 3:**

Bước 1: A_v = −R_f / R_in → |A_v| = R_f / R_in.

Bước 2: 8 = R_f / 10k → R_f = **80 kΩ**.

Dùng thực tế: 82 kΩ (chuẩn E24) → A_v thực = −82/10 = −8.2 (sai số nhỏ).

---

**Bài 4:**

Bước 1: A_v = 1 + R_f / R_in = 1 + 82/10 = 1 + 8.2 = **9.2**.

Bước 2: V_out lý tưởng = 9.2 × 0.8 = **7.36 V**.

Bước 3: Rail ±9 V → giới hạn thực ≈ ±7.5 V. V_out = 7.36 V < 7.5 V → **sát rail nhưng không bão hòa** (biên độ an toàn ≈ 0.14 V, mỏng — nên chọn R_f nhỏ hơn cho biên an toàn rộng hơn).

---

**Bài 5:**

**(a) Không có buffer:**

R_2 // R_L = 47k // 2.2k = (47 × 2.2) / (47 + 2.2) = 103.4 / 49.2 = **2.1 kΩ**.

V_out = V_nguồn × (R_2//R_L) / (R_1 + R_2//R_L) = 12 × 2.1 / (47 + 2.1) = 12 × 2.1 / 49.1 = **0.51 V**.

So với không tải: V_divider = 12 × 47/(47+47) = **6 V**. Loading effect kéo từ 6 V xuống 0.51 V!

**(b) Có buffer:**

Buffer lý tưởng Z_in = ∞ → không lấy dòng từ phân áp → V_divider giữ nguyên = **6 V**.

Buffer A_v = 1 → V_out = **6 V** dù R_L = 2.2 kΩ.

Lưu ý: op-amp cấp dòng cho R_L từ nguồn ±Vcc của nó: I_L = 6 V / 2.2 kΩ = 2.7 mA — trong khả năng dòng ra của LM358 (max ~40 mA).

---

**Bài 6:**

**(a)** A_v = 1 + 68/10 = **7.8**. V_out lý tưởng = 7.8 × 1.2 = **9.36 V**.

**(b)** Rail thực ≈ ±13.5 V. V_out = 9.36 V < 13.5 V → **không bị kẹp**. Biên an toàn = 13.5 − 9.36 = 4.14 V.

**(c)** Điều kiện không bị slew-rate limit: SR ≥ 2π × f × V_peak.

f ≤ SR / (2π × V_peak) = 0.5 V/μs / (2π × 10 V) = 0.5 × 10⁶ / (62.83 × 10) = **7,958 Hz ≈ 7.96 kHz**.

Vậy tần số tín hiệu tối đa để 741 không bị méo = **~8 kHz** với biên độ 10 V. Trên tần số này tín hiệu bị cắt (clipping dạng tam giác do slew rate).

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 03 — Phân áp & điện trở](../../01-Fundamentals/lesson-03-resistors-divider/) — hiểu loading effect.
- **Bài tiếp theo**: [Lesson 08 — Op-amp ứng dụng](../lesson-08-opamp-applications/) — mạch cộng, tích phân, vi phân, comparator, mạch lọc tích cực.
- **Tham khảo**: Datasheet Texas Instruments LM741, LM358 — xem thông số slew rate, V_os, Z_in thực tế.

---

## 📝 Tổng kết Lesson 07

1. **Op-amp** = bộ khuếch đại vi sai A_OL ≈ 100,000+. V_out = A_OL × (V+ − V−). Phải dùng hồi tiếp âm để kiểm soát.
2. **2 quy tắc vàng** (khi có hồi tiếp âm):
   - Quy tắc 1: V+ = V− (đoản mạch ảo — virtual short).
   - Quy tắc 2: I+ = I− = 0 (dòng vào = 0).
3. **Mạch không đảo**: A_v = **1 + R_f / R_in** (cùng pha, A_v ≥ 1).
4. **Mạch đảo**: A_v = **−R_f / R_in** (đảo pha, đất ảo V− = 0 V).
5. **Buffer**: A_v = 1, giải quyết loading effect, trở vào cao — trở ra thấp.
6. **Giới hạn thực tế**: bão hòa tại ~(Vcc − 1.5 V), slew rate giới hạn tần số, offset gây sai số DC.

**Tiếp theo**: [Lesson 08 — Op-amp ứng dụng](../lesson-08-opamp-applications/)

[Xem minh họa tương tác](./visualization.html)
