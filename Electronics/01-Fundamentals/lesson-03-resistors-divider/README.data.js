// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/01-Fundamentals/lesson-03-resistors-divider/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Điện trở thực tế & Phân áp

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đọc được giá trị điện trở từ mã màu 4 vòng và biết dãy giá trị chuẩn E12/E24.
- Chọn điện trở đúng công suất định mức để mạch không bị cháy.
- Tính toán mạch phân áp (voltage divider) và phân dòng (current divider) thành thạo.
- Hiểu hiện tượng tải ảnh hưởng phân áp (loading effect) và cách khắc phục.
- Thiết kế mạch đọc cảm biến quang trở/nhiệt trở bằng ADC qua mạch phân áp.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/) — Định luật Ohm V = I·R.
- [Lesson 02 — Mạch điện & Kirchhoff](../lesson-02-kirchhoff-circuits/) — KVL, KCL, cách phân tích mạch.

---

## 1. Điện trở thực tế — Mã màu 4 vòng

### 1.1. Vì sao dùng mã màu?

💡 **Trực giác**: Điện trở là linh kiện nhỏ (2–10 mm), không đủ chỗ in số lên thân. Thay vào đó, nhà sản xuất dùng **vòng màu** (color band) — mỗi màu mang một chữ số hoặc số nhân. Giống như mã ZIP code: "5 con số quy định một địa chỉ", "4 vòng màu quy định giá trị Ω + dung sai".

Bảng mã màu (học thuộc: **B**lack **B**ears **R**obbed **O**ur **Y**ellow **G**rapefruit **B**ut **V**engeance **G**rew **W**orse):

| Màu | Chữ số | Số nhân |
|-----|--------|---------|
| Đen (Black) | 0 | ×1 |
| Nâu (Brown) | 1 | ×10 |
| Đỏ (Red) | 2 | ×100 |
| Cam (Orange) | 3 | ×1 kΩ |
| Vàng (Yellow) | 4 | ×10 kΩ |
| Lục (Green) | 5 | ×100 kΩ |
| Lam (Blue) | 6 | ×1 MΩ |
| Tím (Violet) | 7 | — |
| Xám (Gray) | 8 | — |
| Trắng (White) | 9 | — |
| Vàng kim (Gold) | — | ×0.1 | → dùng làm nhân + chỉ dung sai ±5% |
| Bạc (Silver) | — | ×0.01 | → dung sai ±10% |

**Cấu trúc 4 vòng**:

\`\`\`
[Vòng 1] [Vòng 2] [Vòng 3 = Nhân] [Vòng 4 = Dung sai]
  Chữ số đầu  Chữ số 2   Số nhân (thập phân)   ±%
\`\`\`

Giá trị = (Vòng1 × 10 + Vòng2) × Nhân.

### 1.2. Bốn ví dụ đọc mã màu

**Ví dụ 1 — Nâu-Đen-Đỏ-Vàng kim**:
- Vòng 1 (Nâu) = 1, Vòng 2 (Đen) = 0, Vòng 3 (Đỏ) = ×100, Vòng 4 (Vàng kim) = ±5%.
- Giá trị = (1×10 + 0) × 100 = **1,000 Ω = 1 kΩ ±5%**.
- Dải thực tế: 950 Ω – 1,050 Ω.

**Ví dụ 2 — Vàng-Tím-Cam-Vàng kim**:
- Vòng 1 (Vàng) = 4, Vòng 2 (Tím) = 7, Vòng 3 (Cam) = ×1,000, Vòng 4 = ±5%.
- Giá trị = (4×10 + 7) × 1,000 = **47,000 Ω = 47 kΩ ±5%**.
- Dải thực tế: 44,650 Ω – 49,350 Ω.

**Ví dụ 3 — Đỏ-Đỏ-Nâu-Vàng kim**:
- Vòng 1 (Đỏ) = 2, Vòng 2 (Đỏ) = 2, Vòng 3 (Nâu) = ×10, Vòng 4 = ±5%.
- Giá trị = (2×10 + 2) × 10 = **220 Ω ±5%**.
- Đây là điện trở "hạn dòng LED" rất phổ biến (5V / 220Ω ≈ 22.7 mA).

**Ví dụ 4 — Cam-Trắng-Vàng-Vàng kim**:
- Vòng 1 (Cam) = 3, Vòng 2 (Trắng) = 9, Vòng 3 (Vàng) = ×10,000, Vòng 4 = ±5%.
- Giá trị = (3×10 + 9) × 10,000 = **390,000 Ω = 390 kΩ ±5%**.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Vòng dung sai ở đầu hay cuối?"* — Vòng dung sai luôn ở **cuối** (Vàng kim hoặc Bạc), cách xa 3 vòng kia hơn một chút. Nếu không rõ, hãy đọc sao cho giá trị nằm trong dãy chuẩn E12/E24 (xem mục 1.3).
- *"Điện trở không có vòng nào màu vàng kim/bạc thì sao?"* — Không có vòng dung sai = ±20% (loại cũ, hiếm gặp).
- *"Điện trở 5 vòng đọc khác không?"* — Có: 3 vòng chữ số + 1 vòng nhân + 1 vòng dung sai (Nâu = ±1%, Đỏ = ±2%). Phổ biến trong điện tử chính xác.

### 1.3. Dãy giá trị chuẩn E12 và E24

Điện trở không sản xuất theo mọi giá trị tùy ý. Chúng được sản xuất theo **dãy chuẩn** (E-series) — phân bố theo thang logarithm sao cho sai số giữa 2 giá trị liền kề luôn nằm trong dung sai.

**Dãy E12** (12 giá trị/thập phân, dung sai ±10%):
1.0 · 1.2 · 1.5 · 1.8 · 2.2 · 2.7 · 3.3 · 3.9 · 4.7 · 5.6 · 6.8 · 8.2

→ Nhân với 1, 10, 100, 1k, 10k, 100k, 1M để có toàn bộ dãy (ví dụ 4.7 kΩ, 47 kΩ, 470 kΩ đều tồn tại).

**Dãy E24** (24 giá trị/thập phân, dung sai ±5%):
1.0 · 1.1 · 1.2 · 1.3 · 1.5 · 1.6 · 1.8 · 2.0 · 2.2 · 2.4 · 2.7 · 3.0 · 3.3 · 3.6 · 3.9 · 4.3 · 4.7 · 5.1 · 5.6 · 6.2 · 6.8 · 7.5 · 8.2 · 9.1

⚠ **Lỗi thường gặp**: Mua linh kiện ghi "cần 480 Ω" — **không tồn tại** trong E12 hay E24. Phải dùng 470 Ω (E12) hoặc 487 Ω (E96 — dãy chính xác hơn). Khi thiết kế, hãy kiểm tra giá trị có nằm trong dãy chuẩn không.

🔁 **Tự kiểm tra**: Đọc mã màu: Lục–Nâu–Đỏ–Vàng kim. Kết quả?

<details>
<summary>Đáp án</summary>
Lục = 5, Nâu = 1, Đỏ = ×100, Vàng kim = ±5%.
Giá trị = (5×10 + 1) × 100 = **5,100 Ω = 5.1 kΩ ±5%**. Có trong dãy E24.
</details>

### 📝 Tóm tắt mục 1

- Mã màu 4 vòng: (Vòng1 × 10 + Vòng2) × Nhân, dung sai từ Vòng 4.
- Dãy E12: 12 giá trị/thập phân (dung sai ±10%); dãy E24: 24 giá trị (±5%).
- Không được "bịa" giá trị — chỉ mua điện trở nằm trong dãy chuẩn.

---

## 2. Công suất định mức (Power Rating)

### 2.1. Định nghĩa và ý nghĩa vật lý

**Công suất tiêu tán** P = I²·R = V²/R = V·I (Watt).

Khi dòng chạy qua điện trở, năng lượng điện biến thành **nhiệt**. Điện trở chịu được nhiệt đến một mức nhất định — đó là **công suất định mức (power rating)**. Vượt quá → điện trở bốc khói và đứt mạch.

💡 **Analogy**: Công suất định mức giống như "tải trọng tối đa" của cầu. Xe tải 30 tấn qua cầu định mức 10 tấn → cầu sập. Điện trở ¼W phải chịu 1W → điện trở cháy.

**Vì sao phải quan tâm?** Vì trong mạch điện thực, dòng điện có thể lớn bất ngờ (ngắn mạch cục bộ, điện áp biến đổi) — tính toán sai dẫn đến cháy linh kiện, thậm chí cháy bo mạch hoặc gây hỏa hoạn.

**Các mức công suất phổ biến**:

| Loại | Công suất định mức | Kích thước | Ứng dụng điển hình |
|------|--------------------|------------|-------------------|
| 1/8 W (0.125 W) | 0.125 W | Rất nhỏ, SMD | Mạch logic, phân áp tín hiệu nhỏ |
| 1/4 W (0.25 W) | 0.25 W | Nhỏ, thông dụng nhất | Hạn dòng LED, mạch analog thông thường |
| 1/2 W (0.5 W) | 0.5 W | Trung bình | Mạch nguồn nhỏ |
| 1 W | 1 W | To, cần tản nhiệt | Mạch nguồn, điện trở tải |
| 2–5 W | 2–5 W | Rất to, xi măng/dây quấn | Bộ sạc, điều chỉnh nguồn |

**Quy tắc an toàn**: Chọn điện trở có công suất định mức **ít nhất gấp đôi** công suất thực tế (safety margin 2×). Ví dụ, tính được P = 0.12 W → chọn ¼W (0.25 W), không chọn ⅛W.

### 2.2. Ví dụ số tính công suất

**Ví dụ 1 — LED với điện trở hạn dòng**:
- V_nguồn = 5 V, LED cần 1.8 V, dòng 20 mA. Điện trở hạn dòng R = (5 − 1.8) / 0.02 = 160 Ω → chọn 150 Ω (E24).
- P = I² × R = 0.02² × 150 = 0.0004 × 150 = **0.06 W**.
- Chọn điện trở ¼W (0.25 W) — an toàn (0.06 < 0.125, margin lớn).

**Ví dụ 2 — Điện trở kéo lên (pull-up) 4.7 kΩ trên đường 3.3 V**:
- Trong tình huống xấu nhất, chân đầu ra kéo thẳng xuống GND: P = V² / R = 3.3² / 4700 = 10.89 / 4700 ≈ **0.0023 W = 2.3 mW**.
- Chọn ⅛W hoàn toàn dư sức.

**Ví dụ 3 — Điện trở phân áp 2 × 10 kΩ trên nguồn 12 V**:
- I = 12 / (10,000 + 10,000) = 0.6 mA.
- P_mỗi_điện_trở = I² × R = 0.0006² × 10,000 = **3.6 mW** → ⅛W là đủ.

**Ví dụ 4 — Điện trở hạn dòng cho loa 8 Ω, V = 5 V, R_thêm = 22 Ω**:
- I = 5 / (8 + 22) = 5 / 30 ≈ 0.167 A.
- P_22Ω = 0.167² × 22 ≈ **0.61 W** → cần điện trở 1 W (không dùng ¼W).

⚠ **Lỗi thường gặp**: Tính điện trở hạn dòng thấy "chỉ 0.06 W" rồi dùng điện trở ⅛W sẵn có. Nhưng nếu nguồn 5 V bị vọt lên 5.5 V hoặc có 2 LED bị đứt song song → dòng tăng lên → P tăng đột ngột → ⅛W cháy. Luôn tính ở điều kiện xấu nhất và nhân 2.

🔁 **Tự kiểm tra**: Điện trở 470 Ω mắc vào nguồn 9 V. Cần chọn loại công suất nào?

<details>
<summary>Đáp án</summary>
P = V² / R = 9² / 470 = 81 / 470 ≈ 0.172 W.
Safety margin 2×: 0.172 × 2 = 0.344 W → chọn **½W (0.5 W)**. ¼W (0.25 W) không đủ (0.172 > 0.125 W).
</details>

### 📝 Tóm tắt mục 2

- P = V²/R = I²·R = V·I (Watt), toàn bộ biến thành nhiệt.
- Công suất định mức phổ biến: ⅛W, ¼W, ½W, 1W.
- Quy tắc: chọn điện trở có P_định_mức ≥ 2 × P_thực_tế (safety margin 2×).
- Tính ở **điều kiện xấu nhất** (V_max, R_min dự kiến).

---

## 3. Mạch phân áp (Voltage Divider)

### 3.1. Cấu trúc và công thức

💡 **Trực giác**: Nối 2 điện trở R1 và R2 nối tiếp giữa V_in và GND. Điện áp "rơi" trên mỗi điện trở tỉ lệ thuận với giá trị điện trở đó — giống như chia miếng bánh: mảnh to hơn lấy phần lớn hơn.

\`\`\`
       R1
V_in ──┤├──┬─── V_out
           │
          R2
           │
          GND
\`\`\`

Dòng qua chuỗi: I = V_in / (R1 + R2).

Điện áp rơi trên R2: **V_out = V_in × R2 / (R1 + R2)**.

**Vì sao công thức có R2 ở tử số?** Vì V_out = I × R2 = [V_in / (R1 + R2)] × R2. R2 càng lớn so với R1, điện áp "giữ" lại trên R2 càng nhiều → V_out càng cao.

### 3.2. Walk-through bốn ví dụ số

**Ví dụ 1 — Chia đôi nguồn 5 V (R1 = R2 = 10 kΩ)**:
- V_out = 5 × 10,000 / (10,000 + 10,000) = 5 × 0.5 = **2.5 V**.
- Kiểm tra: dòng I = 5 / 20,000 = 0.25 mA. Điện áp rơi trên R1 = 0.00025 × 10,000 = 2.5 V, rơi trên R2 = 2.5 V. Tổng = 5 V ✓ (KVL).

**Ví dụ 2 — Tạo 1/3 nguồn 9 V (R1 = 20 kΩ, R2 = 10 kΩ)**:
- V_out = 9 × 10,000 / (20,000 + 10,000) = 9 × 1/3 = **3.0 V**.
- Kiểm tra: I = 9 / 30,000 = 0.3 mA. V_R1 = 0.3 mA × 20 kΩ = 6 V, V_R2 = 0.3 mA × 10 kΩ = 3 V. Tổng = 9 V ✓.

**Ví dụ 3 — Tạo 3.3 V từ nguồn 5 V** (giao tiếp MCU 3.3 V với cảm biến 5 V):
- Cần: V_out / V_in = 3.3 / 5 = 0.66 = R2 / (R1 + R2).
- Chọn R2 = 6.8 kΩ (E12): R1 = R2 × (V_in − V_out) / V_out = 6,800 × (5 − 3.3) / 3.3 = 6,800 × 0.515 = 3,505 Ω → chọn R1 = 3.3 kΩ (E12 gần nhất).
- V_out_thực = 5 × 6,800 / (3,300 + 6,800) = 5 × 6,800 / 10,100 = **3.366 V** (sai số 2% — chấp nhận được cho MCU, không chấp nhận được cho ADC cần chính xác).
- Tính nhanh từ E12: R1 = 3.3 kΩ, R2 = 6.8 kΩ → V_out = 3.366 V.

**Ví dụ 4 — Phân áp đọc pin 12 V vào ADC 0–3.3 V (cần hệ số 3.3/12 ≈ 0.275)**:
- R2 / (R1 + R2) = 0.275. Chọn R2 = 27 kΩ, R1 = 27 × (1/0.275 − 1) = 27 × 2.636 ≈ 71 kΩ → chọn R1 = 68 kΩ (E12).
- V_out = 12 × 27,000 / (68,000 + 27,000) = 12 × 27,000 / 95,000 = **3.411 V** (hơi cao 3.3 V một chút — cần kiểm tra lại hoặc dùng R1 = 75 kΩ để V_out = 3.27 V).
- Bài học: phân áp từ dãy E12 hiếm khi cho kết quả chính xác tuyệt đối — cần xác minh bằng số.

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Nên chọn R1, R2 trong khoảng nào?"* — Quá nhỏ (vài trăm Ω): dòng lớn, lãng phí điện, điện trở nóng. Quá lớn (vài MΩ): nhạy cảm với nhiễu và tải. Thực tế chọn 1 kΩ – 100 kΩ tùy ứng dụng; 10 kΩ là mức "mặc định an toàn" cho hầu hết trường hợp MCU.
- *"Phân áp có cấp dòng được không?"* — Không đáng kể. Phân áp thuần túy chỉ hoạt động tốt với tải trở kháng cao (xem Mục 4: loading effect). Muốn cấp dòng, cần buffer op-amp hoặc mạch nguồn thực sự.

🔁 **Tự kiểm tra**: R1 = 100 kΩ, R2 = 33 kΩ, V_in = 12 V. Tính V_out?

<details>
<summary>Đáp án</summary>
V_out = 12 × 33,000 / (100,000 + 33,000) = 12 × 33,000 / 133,000 = 396,000 / 133,000 ≈ **2.977 V ≈ 3.0 V**.
Kiểm tra: I = 12 / 133,000 ≈ 90.2 µA. V_R1 = 90.2 µA × 100 kΩ = 9.02 V. V_R2 = 90.2 µA × 33 kΩ = 2.98 V. Tổng ≈ 12 V ✓.
</details>

### 📝 Tóm tắt mục 3

- V_out = V_in × R2 / (R1 + R2) — đây là công thức phân áp cốt lõi.
- Điện áp rơi tỉ lệ thuận với giá trị điện trở.
- Chọn R trong khoảng 1 kΩ – 100 kΩ để cân bằng dòng điện và độ ổn định.
- Giá trị thực tế từ dãy E12/E24 sẽ cho V_out xấp xỉ, cần kiểm tra số liệu.

---

## 4. Tải ảnh hưởng phân áp (Loading Effect)

### 4.1. Hiện tượng

Khi mắc tải R_L song song với R2, mạch không còn là phân áp đơn giản nữa:

\`\`\`
       R1
V_in ──┤├──┬─── V_out
           │
          R2 ││ R_L  (song song)
           │
          GND
\`\`\`

Điện trở tương đương: R2_eff = R2 × R_L / (R2 + R_L) (luôn < R2).

V_out thực = V_in × R2_eff / (R1 + R2_eff) < V_out lý tưởng.

💡 **Analogy**: Phân áp giống như chia nước qua 2 ống. Khi bạn mở thêm vòi phụ (R_L) ở điểm giữa, áp suất tại điểm đó giảm xuống vì nước chảy thêm ra ngoài. Điện áp V_out "sụt" vì dòng phụ chạy qua R_L.

### 4.2. Walk-through loading effect — ví dụ số

**Tình huống**: R1 = 10 kΩ, R2 = 10 kΩ, V_in = 5 V, thêm tải R_L = 10 kΩ.

**Không tải** (lý tưởng):
- V_out = 5 × 10,000 / (10,000 + 10,000) = **2.5 V**.

**Có tải R_L = 10 kΩ**:
- R2_eff = 10,000 × 10,000 / (10,000 + 10,000) = 100,000,000 / 20,000 = **5,000 Ω = 5 kΩ**.
- V_out = 5 × 5,000 / (10,000 + 5,000) = 25,000 / 15,000 = **1.667 V** (giảm 33%!).

**Có tải R_L = 100 kΩ**:
- R2_eff = 10,000 × 100,000 / (10,000 + 100,000) = 1,000,000,000 / 110,000 ≈ **9,091 Ω ≈ 9.1 kΩ**.
- V_out = 5 × 9,091 / (10,000 + 9,091) = 45,455 / 19,091 ≈ **2.381 V** (giảm 4.8% — chấp nhận được).

**Có tải R_L = 1 MΩ**:
- R2_eff = 10,000 × 1,000,000 / (10,000 + 1,000,000) ≈ **9,901 Ω ≈ 9.9 kΩ**.
- V_out = 5 × 9,901 / (10,000 + 9,901) ≈ **2.487 V** (giảm 0.5% — gần như lý tưởng).

### 4.3. Quy tắc thiết kế

**Quy tắc R_tải >> R2**: Để loading effect < 5%, cần R_L ≥ **10 × R2**.

Công thức chính xác hơn: sai số loading = R2 / (R2 + R_L) × 100%.
- R_L = 10 × R2 → sai số ≈ 9.1% (đủ tốt cho nhiều ứng dụng).
- R_L = 20 × R2 → sai số ≈ 4.8%.
- R_L = 100 × R2 → sai số ≈ 1%.

**Giải pháp khi tải trở kháng thấp**:
1. Giảm R1 và R2 xuống (tăng dòng phân áp) sao cho R2 << R_L. Nhược điểm: tốn năng lượng.
2. Thêm **op-amp voltage follower** (buffer) giữa V_out phân áp và tải — trở kháng vào op-amp hàng GΩ → loading effect cực nhỏ.

⚠ **Lỗi thường gặp**: Thiết kế phân áp đẹp trên giấy (V_out = 3.3 V), nhắm tới đo bằng multimeter (trở kháng ≈ 10 MΩ → rất ổn). Nhưng khi mắc vào chân ADC của MCU cụ thể (trở kháng vào chỉ 5 kΩ khi đang sampling) → V_out bị kéo xuống đáng kể. Phải tra datasheet MCU xem trở kháng vào ADC.

🔁 **Tự kiểm tra**: Phân áp R1 = 22 kΩ, R2 = 22 kΩ, V_in = 3.3 V. Tải R_L = 44 kΩ. V_out là bao nhiêu?

<details>
<summary>Đáp án</summary>
R2_eff = 22,000 × 44,000 / (22,000 + 44,000) = 968,000,000 / 66,000 ≈ 14,667 Ω ≈ 14.7 kΩ.
V_out = 3.3 × 14,667 / (22,000 + 14,667) = 3.3 × 14,667 / 36,667 ≈ 3.3 × 0.400 ≈ **1.32 V**.
Không tải: V_out = 3.3 × 22,000 / 44,000 = 1.65 V. Loading effect làm giảm từ 1.65 V → 1.32 V (giảm 20%).
Vì R_L = 2 × R2, không đủ ">> R2" nên sụt điện áp đáng kể.
</details>

### 📝 Tóm tắt mục 4

- Khi mắc tải song song với R2: V_out thực < V_out lý tưởng.
- R2_eff = R2 ∥ R_L = R2 × R_L / (R2 + R_L) luôn < R2.
- Quy tắc: R_L ≥ 10 × R2 để loading effect < 10%.
- Nếu tải cố định trở kháng thấp, dùng buffer op-amp hoặc giảm R1, R2.

---

## 5. Phân dòng (Current Divider)

### 5.1. Cấu trúc và công thức

💡 **Trực giác**: Hai điện trở mắc **song song** chia sẻ cùng điện áp, nhưng mỗi nhánh có dòng khác nhau. Nhánh điện trở nhỏ hơn → dòng lớn hơn (ống rộng hơn, nước chảy nhiều hơn).

\`\`\`
        I_tổng →
V ──┬──┤R1├── → I1
    │
    └──┤R2├── → I2
    │
   GND
\`\`\`

Điện áp trên cả 2 nhánh bằng nhau = V.

- I1 = V / R1
- I2 = V / R2

Công thức phân dòng (dùng khi biết I_tổng thay vì V):

**I1 = I_tổng × R2 / (R1 + R2)**

**I2 = I_tổng × R1 / (R1 + R2)**

**Lưu ý quan trọng**: Dòng qua nhánh tỉ lệ **nghịch** với điện trở nhánh đó (R lớn hơn → dòng nhỏ hơn), nhưng lại tỉ lệ thuận với **điện trở của nhánh KIA**. Đây là điểm dễ nhầm.

**Chứng minh**: V = I_tổng × (R1∥R2) = I_tổng × R1R2/(R1+R2). I1 = V/R1 = I_tổng × R2/(R1+R2). ✓

### 5.2. Ba ví dụ số

**Ví dụ 1 — Hai điện trở bằng nhau** (R1 = R2 = 100 Ω, I_tổng = 10 mA):
- I1 = 10 mA × 100 / (100 + 100) = **5 mA**, I2 = 5 mA. Dòng chia đều — hợp lý vì đối xứng.

**Ví dụ 2 — Tỉ lệ 1:3** (R1 = 30 kΩ, R2 = 10 kΩ, I_tổng = 4 mA):
- I1 = 4 mA × 10,000 / (30,000 + 10,000) = 4 × 0.25 = **1 mA** (qua R1 lớn → dòng nhỏ).
- I2 = 4 mA × 30,000 / (30,000 + 10,000) = 4 × 0.75 = **3 mA** (qua R2 nhỏ → dòng lớn).
- Kiểm tra: I1 + I2 = 1 + 3 = 4 mA ✓. V = I2 × R2 = 3 mA × 10 kΩ = 30 V = I1 × R1 = 1 mA × 30 kΩ = 30 V ✓.

**Ví dụ 3 — Điện trở nội của pin** (R_pin = 1 Ω, tải R_L = 10 Ω, V_hở = 1.5 V):
- Thực ra đây là mạch nối tiếp (không phải song song), nhưng cho thấy concept: V_tải = V_hở × R_L / (R_pin + R_L) = 1.5 × 10 / 11 ≈ **1.36 V**. Rõ ràng V_pin rơi 0.14 V trên điện trở nội.

⚠ **Lỗi thường gặp**: Nhớ sai công thức — viết I1 = I_tổng × R1/(R1+R2). SAI! Phải là R của nhánh **kia** ở tử số. Cách nhớ: "dòng vào nhánh R1 bằng phần trăm R2 trong tổng". Nếu không nhớ công thức, dùng cách tính qua V: V = I_tổng × (R1∥R2), rồi I = V/R từng nhánh.

🔁 **Tự kiểm tra**: R1 = 4 kΩ, R2 = 1 kΩ song song, I_tổng = 5 mA. Tính I1 và I2?

<details>
<summary>Đáp án</summary>
I1 = 5 × 1,000 / (4,000 + 1,000) = 5 × 0.2 = **1 mA** (qua R1 = 4 kΩ, lớn → dòng nhỏ).
I2 = 5 × 4,000 / (4,000 + 1,000) = 5 × 0.8 = **4 mA** (qua R2 = 1 kΩ, nhỏ → dòng lớn).
Kiểm tra: 1 + 4 = 5 mA ✓. V = 1 mA × 4 kΩ = 4 V = 4 mA × 1 kΩ = 4 V ✓.
</details>

### 📝 Tóm tắt mục 5

- Song song: cùng V, dòng phân theo nghịch điện trở.
- I1 = I_tổng × R2/(R1+R2) — tử số là điện trở nhánh **kia**, không phải nhánh đó.
- Kiểm tra: I1 + I2 = I_tổng, V = I1×R1 = I2×R2.

---

## 6. Ứng dụng thực tế

### 6.1. Cảm biến quang trở (LDR) trong mạch phân áp

**Quang trở (light-dependent resistor — LDR)** thay đổi điện trở theo ánh sáng:
- Ánh sáng nhiều → điện trở thấp (1–10 kΩ, đôi khi vài trăm Ω).
- Tối hoàn toàn → điện trở cao (100 kΩ – 1 MΩ).

Mắc LDR vào mạch phân áp với điện trở cố định R_ref:

\`\`\`
       R_ref
V_cc ──┤├──┬─── V_out → ADC của MCU
           │
         [LDR]  (thay đổi theo ánh sáng)
           │
          GND
\`\`\`

V_out = V_cc × LDR / (R_ref + LDR).

Khi trời sáng: LDR nhỏ → V_out nhỏ → MCU đọc số ADC thấp.
Khi trời tối: LDR lớn → V_out lớn → MCU đọc số ADC cao.

**Chọn R_ref**: Để độ nhạy cao nhất, chọn R_ref ≈ LDR tại mức ánh sáng cần phát hiện. Ví dụ, muốn ngưỡng phát hiện ánh sáng tại LDR = 10 kΩ → chọn R_ref = 10 kΩ → V_out = V_cc/2 → biên độ thay đổi lớn nhất về 2 phía.

**Ví dụ code Arduino (C)**:

\`\`\`c
const int LDR_PIN = A0;  // Chân ADC
const float VCC = 5.0;
const float R_REF = 10000.0;  // 10 kΩ

void loop() {
    int adcVal = analogRead(LDR_PIN);      // 0–1023 (10-bit)
    float vOut = adcVal * VCC / 1023.0;   // Chuyển sang Volt
    // Tính điện trở LDR từ V_out
    float ldrR = R_REF * vOut / (VCC - vOut);
    // Ánh sáng tỉ lệ nghịch với ldrR
}
\`\`\`

### 6.2. Nhiệt trở (thermistor) đọc nhiệt độ

Tương tự LDR nhưng thay đổi theo nhiệt độ:
- NTC (Negative Temperature Coefficient): nhiệt độ tăng → điện trở giảm. Phổ biến nhất, thường 10 kΩ tại 25°C.
- PTC (Positive Temperature Coefficient): nhiệt độ tăng → điện trở tăng. Dùng làm bảo vệ quá nhiệt.

**Mạch phân áp với NTC thermistor** y hệt LDR, chọn R_ref = 10 kΩ để nhạy nhất quanh nhiệt độ phòng:

\`\`\`
V_cc ──[10kΩ]──┬── V_out → ADC
             [NTC]
               │
              GND
\`\`\`

V_out tăng khi nhiệt độ giảm (NTC: lạnh → R_thermistor cao → V_out cao).

Để chuyển sang °C, dùng phương trình Steinhart-Hart hoặc tra bảng từ datasheet.

### 6.3. Chiết áp (Potentiometer) — phân áp biến thiên

**Chiết áp** là điện trở có 3 chân: 2 đầu cố định (tổng trở R_total) và 1 chân trượt (wiper) lấy V_out:

\`\`\`
  A (đầu 1, V_cc)
  |
  ≡  ← điện trở than/dây quấn
  | ← wiper (chân trượt)
  ≡
  |
  B (đầu 2, GND)
\`\`\`

V_out = V_cc × (vị trí wiper / R_total) — thay đổi liên tục từ 0 đến V_cc khi xoay.

**Ứng dụng**:
- Núm điều chỉnh âm lượng (thay đổi mức tín hiệu audio).
- Cảm biến góc quay (joystick, pedal ga xe điện).
- Trimmer resistor trong mạch hiệu chỉnh (điều chỉnh 1 lần, sau đó cố định).

❓ **Câu hỏi tự nhiên của người đọc**:

- *"Chiết áp có bị loading effect không?"* — Có, nhưng vì wiper thường nối vào op-amp buffer hoặc ADC trở kháng cao (MΩ), thực tế ít ảnh hưởng.
- *"Quang trở và nhiệt trở có thể đo chính xác không?"* — Phụ thuộc vào chất lượng linh kiện và điều kiện môi trường. Đối với ứng dụng chính xác cao, dùng cảm biến số (I2C/SPI như AHT10, Si7021) thay vì analog. Quang trở/nhiệt trở phù hợp với prototype và ứng dụng dân dụng (±5°C là đủ dùng).

### 📝 Tóm tắt mục 6

- LDR/thermistor trong mạch phân áp: V_out thay đổi theo ánh sáng/nhiệt độ → đọc bằng ADC MCU.
- Chọn R_ref ≈ giá trị cảm biến tại điểm cần độ nhạy cao nhất.
- Chiết áp = phân áp biến thiên liên tục, ứng dụng cho điều chỉnh tín hiệu và cảm biến góc.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Đọc mã màu điện trở: Vàng–Tím–Nâu–Vàng kim. Tính giá trị, dải dung sai, và kiểm tra xem có trong dãy E12 không.

**Bài 2**: Điện trở 560 Ω mắc vào nguồn 12 V. Tính dòng qua điện trở và công suất tiêu tán. Chọn loại công suất định mức phù hợp.

**Bài 3**: Thiết kế mạch phân áp tạo V_out = 2.0 V từ V_in = 5 V. Chọn điện trở từ dãy E12 (thông dụng: 1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2 và các bội của 10). Tính V_out thực tế sau khi chọn.

**Bài 4**: Phân áp R1 = 15 kΩ, R2 = 10 kΩ, V_in = 9 V. Mắc thêm tải R_L = 10 kΩ song song với R2. Tính V_out không tải và có tải.

**Bài 5**: Hai điện trở R1 = 6.8 kΩ và R2 = 3.3 kΩ mắc song song, I_tổng = 6 mA. Tính dòng qua mỗi nhánh và điện áp trên đoạn mạch.

**Bài 6 (nâng cao)**: Mạch đọc LDR: V_cc = 3.3 V, R_ref = 10 kΩ, LDR đo được 5 kΩ (trong nhà ban ngày). Tính V_out. ADC MCU 12-bit đọc giá trị số là bao nhiêu (0–4095)?

### Lời giải chi tiết

**Bài 1 — Đọc mã màu**:

Bước 1: Xác định vòng màu:
- Vòng 1 (Vàng) = 4, Vòng 2 (Tím) = 7, Vòng 3 (Nâu) = ×10, Vòng 4 (Vàng kim) = ±5%.

Bước 2: Tính giá trị:
- Giá trị = (4×10 + 7) × 10 = 47 × 10 = **470 Ω ±5%**.

Bước 3: Tính dải dung sai:
- Sai số = 470 × 0.05 = 23.5 Ω.
- Dải thực tế: 470 − 23.5 = 446.5 Ω đến 470 + 23.5 = 493.5 Ω → **446.5 Ω – 493.5 Ω**.

Bước 4: Kiểm tra E12:
- Dãy E12 trong thập phân 100–1000: 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820.
- **470 Ω có trong E12** ✓.

---

**Bài 2 — Công suất điện trở**:

Bước 1: Tính dòng điện:
- I = V / R = 12 / 560 = **0.02143 A ≈ 21.4 mA**.

Bước 2: Tính công suất tiêu tán:
- P = V² / R = 144 / 560 = **0.257 W** (hoặc P = I² × R = 0.02143² × 560 = 0.000459 × 560 = 0.257 W ✓).

Bước 3: Chọn công suất định mức:
- Áp dụng safety margin 2×: cần P_định_mức ≥ 0.257 × 2 = 0.514 W.
- Chọn **½W (0.5 W)** — hơi sát (0.514 > 0.5), nên chọn luôn **1 W** để an toàn hơn.
- ¼W (0.25 W) không đủ vì 0.257 W > 0.25 W (chưa tính margin).

---

**Bài 3 — Thiết kế phân áp 2 V từ 5 V**:

Bước 1: Tìm tỉ lệ R2/(R1+R2):
- V_out / V_in = 2.0 / 5.0 = 0.4.
- R2 / (R1 + R2) = 0.4 → R1/R2 = (1−0.4)/0.4 = 0.6/0.4 = 1.5.

Bước 2: Chọn giá trị từ E12:
- Cần R1/R2 = 1.5. Thử: R2 = 10 kΩ → R1 = 15 kΩ. Kiểm tra: 15 có trong E12? Không (E12 có 1.5, 2.2... nhân 10k = 15 kΩ → **có trong E12** vì 1.5 × 10k = 15 kΩ ✓).
- Chọn R1 = 15 kΩ, R2 = 10 kΩ.

Bước 3: Tính V_out thực tế:
- V_out = 5 × 10,000 / (15,000 + 10,000) = 5 × 10,000 / 25,000 = 5 × 0.4 = **2.000 V** — chính xác!

Bước 4: Kiểm tra công suất:
- I = 5 / 25,000 = 0.2 mA. P_R1 = 0.2 mA × 15 kΩ × 0.2 mA = 0.6 mW, P_R2 = 0.4 mW. Cả 2 đều << ⅛W → ✓.

---

**Bài 4 — Loading effect**:

Bước 1: V_out không tải:
- V_out_lý_tưởng = 9 × 10,000 / (15,000 + 10,000) = 9 × 10,000 / 25,000 = **3.6 V**.

Bước 2: Tính R2_eff khi có tải:
- R2_eff = R2 ∥ R_L = 10,000 × 10,000 / (10,000 + 10,000) = 100,000,000 / 20,000 = **5,000 Ω = 5 kΩ**.

Bước 3: V_out có tải:
- V_out_tải = 9 × 5,000 / (15,000 + 5,000) = 9 × 5,000 / 20,000 = 9 × 0.25 = **2.25 V**.

Bước 4: Đánh giá:
- Sụt từ 3.6 V xuống 2.25 V = giảm **37.5%** — rất nghiêm trọng.
- Nguyên nhân: R_L = 1 × R2 (quá nhỏ, cần ≥ 10 × R2 = 100 kΩ để sai số < 10%).
- Khắc phục: tăng R_L (thay linh kiện có trở kháng vào cao hơn) hoặc giảm R1, R2 xuống còn 1.5 kΩ và 1 kΩ để R2 << R_L.

---

**Bài 5 — Phân dòng**:

Bước 1: Tính dòng từng nhánh:
- I1 (qua R1 = 6.8 kΩ) = I_tổng × R2 / (R1 + R2) = 6 mA × 3,300 / (6,800 + 3,300) = 6 × 3,300 / 10,100 = 19,800 / 10,100 ≈ **1.96 mA**.
- I2 (qua R2 = 3.3 kΩ) = I_tổng × R1 / (R1 + R2) = 6 mA × 6,800 / 10,100 = 40,800 / 10,100 ≈ **4.04 mA**.

Bước 2: Kiểm tra:
- I1 + I2 = 1.96 + 4.04 = 6 mA ✓.

Bước 3: Tính điện áp:
- R_tương_đương = 6,800 × 3,300 / (6,800 + 3,300) = 22,440,000 / 10,100 ≈ 2,222 Ω ≈ 2.22 kΩ.
- V = I_tổng × R_eq = 6 mA × 2,222 Ω = **13.33 V**.
- Kiểm tra: V = I1 × R1 = 1.96 mA × 6.8 kΩ = 13.33 V ✓, V = I2 × R2 = 4.04 mA × 3.3 kΩ = 13.33 V ✓.

---

**Bài 6 — Mạch đọc LDR**:

Bước 1: Tính V_out:
- V_out = V_cc × LDR / (R_ref + LDR) = 3.3 × 5,000 / (10,000 + 5,000) = 3.3 × 5,000 / 15,000 = 3.3 × 0.3333 ≈ **1.10 V**.

Bước 2: Tính giá trị ADC 12-bit (0–4095):
- ADC_val = V_out / V_cc × 4095 = 1.10 / 3.3 × 4095 = 0.3333 × 4095 ≈ **1365** (trong thực tế Arduino/STM32 trả về 1365 tương ứng khoảng 1/3 thang đo).

Bước 3: Kiểm tra:
- 1365 / 4095 × 3.3 = 1.10 V ✓.

Bước 4: Nhận xét thiết kế:
- R_ref = 10 kΩ, LDR = 5 kΩ → R_L (trở kháng vào ADC MCU) thường ≥ 100 kΩ trong STM32/ESP32. Loading effect: sai số < 5% → chấp nhận được cho ứng dụng nhà thông minh.

---

## 8. Liên kết và bài tiếp theo

- **Kiến thức đã dùng**:
  - [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/): Định luật Ohm.
  - [Lesson 02 — Mạch điện & Kirchhoff](../lesson-02-kirchhoff-circuits/): KVL, KCL dùng để chứng minh và kiểm tra phân áp.
- **Bài tiếp theo**: [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — Khi mắc tụ điện vào mạch, điện áp không thay đổi tức thì nữa; thời gian sạc/xả phụ thuộc R×C.

---

## 📝 Tổng kết Lesson 03

1. **Mã màu 4 vòng**: Giá trị = (V1×10 + V2) × Nhân; dung sai từ Vòng 4 (Vàng kim = ±5%, Bạc = ±10%). Điện trở thực tế chỉ có trong dãy E12/E24.
2. **Công suất định mức**: P = V²/R = I²R. Chọn P_định_mức ≥ 2 × P_thực_tế. Thường gặp: ⅛W, ¼W, ½W, 1W.
3. **Phân áp**: V_out = V_in × R2/(R1+R2). Trung tâm của hầu hết mạch giao tiếp, cảm biến analog, ADC.
4. **Loading effect**: Tải song song R2 làm V_out tụt. Cần R_tải ≥ 10×R2. Giải pháp: buffer op-amp.
5. **Phân dòng**: I_nhánh = I_tổng × R_kia/(R1+R2). Nhớ: tử số là điện trở nhánh kia.
6. **Ứng dụng**: LDR/thermistor trong phân áp → đọc bằng ADC. Chiết áp = phân áp biến thiên.

[visualization.html](./visualization.html)
`;
