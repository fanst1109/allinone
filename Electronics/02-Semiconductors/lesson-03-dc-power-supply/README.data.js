// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/02-Semiconductors/lesson-03-dc-power-supply/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mạch nguồn DC

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cần** biến đổi AC lưới điện thành DC ổn định để cấp cho thiết bị điện tử.
- Nắm được sơ đồ khối 4 giai đoạn: **Biến áp → Chỉnh lưu → Lọc → Ổn áp**.
- Tính toán được **tỉ số vòng dây** biến áp hạ áp (N1/N2 = V1/V2).
- Phân tích **chỉnh lưu nửa kỳ** (half-wave rectifier) và **chỉnh lưu toàn kỳ cầu diode** (bridge rectifier).
- Tính **tụ lọc** (smoothing capacitor) theo độ gợn (ripple) cho phép.
- Hiểu nguyên lý **ổn áp tuyến tính** (linear voltage regulator, vd IC 7805).

## Kiến thức tiền đề

- [Lesson 02 — Diode & Ứng dụng](../lesson-02-diode/) — diode chỉnh lưu là thành phần cốt lõi của mạch nguồn.
- [Lesson 04 — Tụ điện & Mạch RC](../../01-Fundamentals/lesson-04-capacitor-rc/) — tụ lọc gợn sóng là ứng dụng trực tiếp của tụ điện.
- [Lesson 06 — Trở kháng AC & Mạch RLC](../../01-Fundamentals/lesson-06-ac-impedance-rlc/) — hiểu AC/RMS để tính V_peak từ V_rms lưới điện.

---

## 1. Vì sao cần mạch nguồn DC?

💡 **Hình dung**: Lưới điện gia đình là AC 220 V / 50 Hz — điện áp dao động liên tục từ −311 V đến +311 V, đổi chiều 50 lần mỗi giây. Nhưng vi điều khiển, IC logic, cảm biến... cần nguồn DC ổn định (3.3 V, 5 V, 12 V). Cắm thẳng vào ổ điện → thiết bị cháy ngay.

### 1.1. Nguồn lưới điện AC

Lưới điện Việt Nam: **220 V rms, 50 Hz**.

Giá trị đỉnh (peak) của điện áp lưới:

$$V_{\\text{peak}} = V_{\\text{rms}} \\times \\sqrt{2} = 220 \\times 1.414 \\approx 311 \\text{ V}$$

Điện áp tức thời: $v(t) = 311 \\times \\sin(2\\pi \\times 50 \\times t)$ (V).

❓ **Câu hỏi tự nhiên**: *"Tại sao gọi là 220 V nếu điện áp thực tế đỉnh là 311 V?"*

Vì 220 V là giá trị **rms (root mean square)** — giá trị hiệu dụng tương đương với 220 V DC về mặt công suất nhiệt. Thiết bị gia dụng tính theo công suất, nên dùng V_rms. Trong điện tử, ta cần biết cả V_peak để thiết kế mạch.

### 1.2. Sơ đồ khối mạch nguồn DC

\`\`\`
[Lưới AC 220 V] → [Biến áp] → [Chỉnh lưu] → [Tụ lọc] → [Ổn áp] → [V_out DC ổn định]
     220 V~             12 V~       ~17 V peak     ~15 V dc     5 V hoặc 12 V
\`\`\`

Mỗi khối giải quyết một vấn đề:

| Khối | Chức năng | Lý do cần |
|------|-----------|-----------|
| Biến áp (transformer) | Hạ áp từ 220 V xuống mức an toàn | 220 V nguy hiểm, IC chịu tối đa 35 V |
| Chỉnh lưu (rectifier) | Biến AC thành dạng xung chỉ dương | IC cần điện áp một chiều (không đổi dấu) |
| Tụ lọc (filter cap) | Làm phẳng xung chỉnh lưu | Xung gợn gây nhiễu, IC cần điện áp bằng phẳng |
| Ổn áp (regulator) | Giữ V_out cố định bất kể tải | Tải thay đổi làm điện áp dao động → ổn áp bù lại |

📝 **Tóm tắt mục 1**:
- Lưới AC 220 V_rms có V_peak ≈ 311 V, không dùng trực tiếp cho IC.
- Cần 4 bước: biến áp → chỉnh lưu → lọc → ổn áp để có DC ổn định.

---

## 2. Biến áp hạ áp (Step-down Transformer)

💡 **Hình dung**: Biến áp như hệ bánh răng điện từ — cuộn sơ cấp N1 vòng "kéo" cuộn thứ cấp N2 vòng qua từ trường trong lõi thép. Tỉ số vòng dây quyết định tỉ số điện áp.

### 2.1. Nguyên lý và công thức

Biến áp lý tưởng (bỏ qua tổn thất):

$$\\frac{V_1}{V_2} = \\frac{N_1}{N_2} \\qquad \\frac{I_1}{I_2} = \\frac{N_2}{N_1}$$

Trong đó:
- $V_1$, $V_2$: điện áp sơ cấp và thứ cấp ($V_{\\text{rms}}$).
- $N_1$, $N_2$: số vòng dây sơ cấp và thứ cấp.
- **Công suất bảo toàn**: $P = V_1 \\cdot I_1 = V_2 \\cdot I_2$ (lý tưởng).

Điện áp đỉnh thứ cấp:

$$V_{2,\\text{peak}} = V_{2,\\text{rms}} \\times \\sqrt{2} = \\frac{V_1 \\cdot N_2}{N_1} \\times \\sqrt{2}$$

### 2.2. Bốn ví dụ số

**Ví dụ 1 — Biến áp 220 V → 12 V** (thông dụng nhất):
- $N_1/N_2 = 220/12 \\approx$ **18.33:1** → cần cuộn thứ cấp ít hơn sơ cấp ~18 lần.
- $V_{2,\\text{peak}} = 12 \\times \\sqrt{2} \\approx$ **16.97 V** ≈ 17 V.

**Ví dụ 2 — Biến áp 220 V → 9 V** (cho nguồn 9 V DC):
- $N_1/N_2 = 220/9 \\approx$ **24.4:1**.
- $V_{2,\\text{peak}} = 9 \\times \\sqrt{2} \\approx$ **12.73 V**.

**Ví dụ 3 — Biến áp 220 V → 24 V** (cho driver motor 24 V DC):
- $N_1/N_2 = 220/24 \\approx$ **9.17:1**.
- $V_{2,\\text{peak}} = 24 \\times \\sqrt{2} \\approx$ **33.94 V**.

**Ví dụ 4 — Biến áp 220 V → 6 V** (nguồn nhỏ 5 V DC):
- $N_1/N_2 = 220/6 \\approx$ **36.67:1**.
- $V_{2,\\text{peak}} = 6 \\times \\sqrt{2} \\approx$ **8.49 V**.

❓ **Câu hỏi tự nhiên**:

*"Biến áp có lãng phí điện không?"*

Biến áp thực tế có hiệu suất 95–99% (tổn thất do nhiệt trong cuộn dây và lõi từ). Biến áp lõi thép tần số 50 Hz kích thước lớn nhưng rẻ; biến áp lõi ferrite tần số cao (switched-mode) nhỏ gọn hơn nhiều — đó là lý do adapter laptop hiện đại nhỏ hơn adapter cũ nhiều.

*"Biến áp có cách ly điện không?"*

Có. Hai cuộn dây không nối điện với nhau — chỉ ghép từ trường. Điều này bảo vệ người dùng và thiết bị khỏi điện áp cao của lưới điện.

⚠ **Lỗi thường gặp**: Nhầm V_rms và V_peak khi tính chọn biến áp.
- Sai: "Cần 12 V DC → chọn biến áp 12 V là đủ."
- Đúng: Biến áp 12 V_rms → V_peak = 17 V → sau chỉnh lưu và lọc còn khoảng 15–16 V → cần ổn áp hạ xuống 12 V. Cần chọn biến áp cao hơn mức DC đích.

📝 **Tóm tắt mục 2**:
- $V_1/V_2 = N_1/N_2$ — tỉ số áp = tỉ số vòng dây.
- $V_{\\text{peak}} = V_{\\text{rms}} \\times \\sqrt{2}$; biến áp 12 V_rms cho $V_{\\text{peak}} \\approx 17$ V.
- Biến áp cách ly điện áp cao lưới điện với mạch thứ cấp.

---

## 3. Chỉnh lưu nửa kỳ (Half-Wave Rectifier)

💡 **Hình dung**: Chỉnh lưu nửa kỳ là van một chiều đơn giản nhất — một diode. Điện áp AC đi qua diode: bán kỳ dương thì diode dẫn (qua), bán kỳ âm thì diode chặn (không qua). Kết quả: chỉ còn các xung dương.

### 3.1. Nguyên lý và công thức

Mạch: \`AC nguồn → Diode → Tải (R_load)\`.

- **Bán kỳ dương** ($v_{\\text{in}} > 0.7$ V): diode dẫn, $v_{\\text{out}} = v_{\\text{in}} - 0.7$ V (sụt áp diode silicon).
- **Bán kỳ âm** ($v_{\\text{in}} < 0$): diode tắt, $v_{\\text{out}} = 0$.

Điện áp trung bình (giá trị DC trung bình):

$$V_{\\text{dc}} \\text{ (half-wave)} = \\frac{V_{\\text{peak}}}{\\pi} \\approx V_{\\text{peak}} \\times 0.318$$

Tần số gợn sóng: **50 Hz** (bằng tần số nguồn AC vào).

### 3.2. Ví dụ số — Biến áp 12 V_rms

- $V_{\\text{peak,thứ cấp}} = 12 \\times \\sqrt{2} \\approx 16.97$ V.
- Sau diode: $V_{\\text{peak,out}} \\approx 16.97 - 0.7 =$ **16.27 V**.
- $V_{\\text{dc,trung bình}} = 16.27 / \\pi \\approx$ **5.18 V**.

Điện áp DC trung bình chỉ đạt ~30% $V_{\\text{peak}}$ — rất thấp và còn gợn mạnh.

### 3.3. Nhược điểm của chỉnh lưu nửa kỳ

1. **Hiệu suất thấp**: chỉ dùng 50% chu kỳ AC; một nửa thời gian v_out = 0.
2. **Gợn sóng lớn**: tần số gợn chỉ 50 Hz (khó lọc).
3. **V_dc thấp**: chỉ ≈ 31.8% V_peak.
4. **Biến áp phải chịu dòng không đối xứng** → bão hòa lõi từ khi tải nặng.

→ Trong thực tế, chỉnh lưu nửa kỳ chỉ dùng cho tải công suất rất nhỏ (< 50 mA) hoặc mạch đơn giản không cần chất lượng cao.

📝 **Tóm tắt mục 3**:
- 1 diode, chỉ giữ bán kỳ dương.
- $V_{\\text{dc}} = V_{\\text{peak}} / \\pi \\approx 0.318 \\times V_{\\text{peak}}$.
- Tần số gợn 50 Hz, hiệu suất thấp — ít dùng trong thực tế.

---

## 4. Chỉnh lưu toàn kỳ cầu diode (Bridge Rectifier)

💡 **Hình dung**: Cầu diode 4 diode sắp xếp như "vòng tròn" — dù điện áp AC dương hay âm, luồng dòng điện qua tải **luôn đi theo một chiều**. Cả hai bán kỳ đều có ích.

### 4.1. Cấu tạo và nguyên lý

4 diode D1, D2, D3, D4 nối thành cầu:

\`\`\`
        AC1 ○──┤D1├──○ (+) → Tải → ○ (−) ──┤D3├──○ AC1
               |                              |
        AC2 ○──┤D4├──○ (+)         (−) ──┤D2├──○ AC2
\`\`\`

Hoặc sơ đồ chuẩn: D1, D2, D3, D4 tạo thành vòng kín; hai đầu vào AC; hai đầu ra DC.

**Bán kỳ dương** (AC1 > AC2): D1 và D2 dẫn, D3 và D4 tắt. Dòng chạy qua tải theo chiều cố định.

**Bán kỳ âm** (AC2 > AC1): D3 và D4 dẫn, D1 và D2 tắt. Dòng vẫn chạy qua tải **cùng chiều** như trên.

### 4.2. Công thức

Điện áp đỉnh sau cầu diode (sụt 2 diode vì dòng qua 2 diode song song):

$$V_{\\text{peak,out}} = V_{\\text{peak,in}} - 2 \\times 0.7 = V_{\\text{peak,in}} - 1.4 \\text{ V}$$

Điện áp DC trung bình:

$$V_{\\text{dc}} \\text{ (full-wave)} = \\frac{2 \\times V_{\\text{peak,out}}}{\\pi} \\approx V_{\\text{peak,out}} \\times 0.637$$

Tần số gợn sóng: **100 Hz** (gấp đôi tần số nguồn, vì dùng cả hai bán kỳ).

### 4.3. Walk-through số — Biến áp 12 V_rms

**Bước 1**: Tính V_peak thứ cấp biến áp:
\`\`\`
V_peak_BA = 12 × √2 = 12 × 1.414 = 16.97 V
\`\`\`

**Bước 2**: Tính V_peak sau cầu diode (sụt 2 × 0.7 V):
\`\`\`
V_peak_out = 16.97 − 1.4 = 15.57 V
\`\`\`

**Bước 3**: Tính V_dc trung bình:
\`\`\`
V_dc = 2 × 15.57 / π = 31.14 / 3.1416 = 9.91 V
\`\`\`

**Kết quả**: biến áp 12 V_rms → cầu diode → **V_dc ≈ 9.9 V** trung bình (chưa lọc).

### 4.4. So sánh với chỉnh lưu nửa kỳ

| Tiêu chí | Nửa kỳ (half-wave) | Toàn kỳ cầu (bridge) |
|----------|-------------------|--------------------|
| Số diode | 1 | 4 |
| V_dc / V_peak | 0.318 | 0.637 (gấp đôi) |
| Sụt áp diode | 0.7 V | 1.4 V |
| Tần số gợn | 50 Hz | 100 Hz |
| Dễ lọc | Khó (50 Hz) | Dễ hơn (100 Hz) |
| Hiệu suất | Thấp (~50% AC) | Cao (~95% AC) |
| Ứng dụng | Tải nhỏ, đơn giản | Hầu hết mạch nguồn thực tế |

❓ **Câu hỏi tự nhiên**:

*"Tại sao sụt 1.4 V thay vì 0.7 V?"*

Trong mỗi bán kỳ, dòng phải qua **2 diode nối tiếp** (một ở cạnh trên, một ở cạnh dưới của cầu). Mỗi diode sụt 0.7 V → tổng 1.4 V.

*"Tần số gợn 100 Hz có nghĩa gì?"*

Mỗi bán kỳ của AC 50 Hz tạo ra một xung dương. 2 bán kỳ mỗi chu kỳ → 100 xung/giây → tần số gợn 100 Hz. Gợn tần số cao hơn dễ lọc hơn (cần tụ nhỏ hơn hoặc gợn nhỏ hơn với cùng tụ).

🔁 **Dừng lại tự kiểm tra**: Biến áp 9 V_rms, cầu 4 diode. Tính V_dc trung bình.
<details>
<summary>Xem đáp án</summary>

- V_peak_BA = 9 × √2 = 12.73 V
- V_peak_out = 12.73 − 1.4 = 11.33 V
- V_dc = 2 × 11.33 / π = 22.66 / 3.1416 ≈ **7.21 V**

</details>

📝 **Tóm tắt mục 4**:
- 4 diode, cả 2 bán kỳ đều được chỉnh lưu.
- $V_{\\text{dc}} = 2 \\times V_{\\text{peak,out}} / \\pi \\approx 0.637 \\times V_{\\text{peak,out}}$.
- Sụt 1.4 V (qua 2 diode). Tần số gợn 100 Hz.
- Đây là kiểu chỉnh lưu tiêu chuẩn trong hầu hết mạch nguồn.

---

## 5. Tụ lọc gợn sóng (Smoothing Capacitor)

💡 **Hình dung**: Tụ lọc như bình chứa nước đặt sau van bơm gián đoạn. Khi van mở (xung cao), bình tích nước; khi van đóng (xung thấp), bình xả nước ra duy trì dòng chảy đều. Tụ tích điện khi V_in cao, xả điện khi V_in thấp — giữ điện áp tải gần như phẳng.

### 5.1. Nguyên lý hoạt động

Nối tụ C song song với tải R_L sau cầu diode:

- Khi xung chỉnh lưu tăng cao: tụ nạp nhanh đến V_peak_out.
- Giữa các xung: tụ xả qua R_L, điện áp giảm dần → tạo **gợn sóng V_ripple**.
- Xung tiếp theo: tụ nạp lại từ đỉnh mới.

Độ gợn (ripple voltage) xấp xỉ:

$$V_{\\text{ripple}} \\approx \\frac{I_{\\text{tải}}}{f \\cdot C}$$

Trong đó:
- $I_{\\text{tải}}$: dòng điện tải (A).
- $f$: tần số gợn (Hz) = 100 Hz cho cầu toàn kỳ.
- $C$: điện dung tụ lọc (F).

⚠ **Đây là công thức xấp xỉ** cho trường hợp $V_{\\text{ripple}} \\ll V_{\\text{dc}}$ (gợn nhỏ). Trong thực tế còn phải tính đến thời gian nạp tụ. Công thức này đủ chính xác (sai số < 10%) cho thiết kế thực tế khi $V_{\\text{ripple}} < 10\\%\\ V_{\\text{dc}}$.

Để chọn tụ từ yêu cầu ripple:

$$C \\geq \\frac{I_{\\text{tải}}}{f \\cdot V_{\\text{ripple,max}}}$$

### 5.2. Ba ví dụ số chọn tụ lọc

**Ví dụ 1** — Nguồn 12 V DC, tải 200 mA, ripple cho phép 1 V:
\`\`\`
C ≥ 0.2 / (100 × 1) = 0.002 F = 2000 µF
\`\`\`
→ Chọn tụ **2200 µF** (series E12 gần nhất).

**Ví dụ 2** — Nguồn 5 V DC, tải 500 mA, ripple cho phép 0.5 V:
\`\`\`
C ≥ 0.5 / (100 × 0.5) = 0.01 F = 10,000 µF
\`\`\`
→ Chọn tụ **10,000 µF** (tụ lớn! Đây là lý do nguồn linear bulky).

**Ví dụ 3** — Nguồn 9 V DC, tải 100 mA, ripple cho phép 2 V:
\`\`\`
C ≥ 0.1 / (100 × 2) = 0.0005 F = 500 µF
\`\`\`
→ Chọn tụ **470 µF** hoặc **1000 µF** để có biên dự phòng.

**Ví dụ 4** — Nguồn 15 V DC, tải 1 A, ripple cho phép 1.5 V:
\`\`\`
C ≥ 1.0 / (100 × 1.5) = 0.00667 F ≈ 6670 µF
\`\`\`
→ Chọn tụ **6800 µF** hoặc ghép song song **2 × 3300 µF**.

### 5.3. Điện áp đầu ra sau lọc

Điện áp DC sau lọc xấp xỉ:

$$V_{\\text{dc,sau lọc}} \\approx V_{\\text{peak,out}} - \\frac{V_{\\text{ripple}}}{2}$$

Ví dụ: $V_{\\text{peak,out}} = 15.57$ V, $V_{\\text{ripple}} = 1$ V → $V_{\\text{dc}} \\approx 15.07$ V.

Khi $V_{\\text{ripple}}$ nhỏ (< 5% $V_{\\text{peak}}$), $V_{\\text{dc}} \\approx V_{\\text{peak,out}}$.

❓ **Câu hỏi tự nhiên**:

*"Tụ lọc phải chịu điện áp bao nhiêu?"*

Tụ phải chịu ít nhất V_peak_out. Thực tế chọn điện áp danh định tụ ≥ 1.5 × V_peak_out để có biên an toàn. Ví dụ V_peak_out = 16 V → chọn tụ **25 V** hoặc **35 V**.

*"Dùng tụ càng lớn càng tốt?"*

Đúng về gợn sóng, nhưng tụ lớn có dòng nạp khởi động rất cao (inrush current) — có thể làm hỏng cầu diode hoặc biến áp. Thực tế thêm điện trở hạn dòng nhỏ (NTC thermistor) hoặc dùng cầu diode chịu dòng cao.

🔁 **Dừng lại tự kiểm tra**: Nguồn 5 V, tải 300 mA, ripple cho phép 0.3 V. Tính C tối thiểu.
<details>
<summary>Xem đáp án</summary>

C ≥ I / (f × V_ripple) = 0.3 / (100 × 0.3) = 0.01 F = **10,000 µF**

→ Chọn **10,000 µF / 16 V** (hoặc 2 × 4700 µF mắc song song).

</details>

📝 **Tóm tắt mục 5**:
- Tụ song song tải: nạp khi $V_{\\text{in}}$ cao, xả khi $V_{\\text{in}}$ thấp.
- $V_{\\text{ripple}} \\approx I_{\\text{tải}} / (f \\cdot C)$; $C \\geq I_{\\text{tải}} / (f \\cdot V_{\\text{ripple,max}})$.
- $f = 100$ Hz cho cầu toàn kỳ; $f = 50$ Hz cho nửa kỳ.
- Điện áp danh định tụ $\\geq 1.5 \\times V_{\\text{peak,out}}$.

---

## 6. Ổn áp tuyến tính (Linear Voltage Regulator)

💡 **Hình dung**: Ổn áp như van áp suất tự động — dù áp đầu vào dao động hoặc tải thay đổi, nó luôn điều chỉnh để giữ áp đầu ra cố định. IC 7805 là một "hộp đen" nhỏ bên trong chứa transistor công suất + mạch phản hồi.

### 6.1. Nguyên lý hoạt động

Ổn áp tuyến tính hoạt động như **điện trở biến thiên** điều khiển bằng vòng phản hồi:
- Khi V_out có xu hướng tăng (vd tải giảm): transistor bên trong giảm độ dẫn → điện trở tương đương tăng → V_out giảm về đúng mức.
- Khi V_out có xu hướng giảm (vd tải tăng): transistor tăng độ dẫn → V_out tăng lên.

### 6.2. Họ IC ổn áp 78XX (dương) và 79XX (âm)

| IC | V_out | I_max | Ứng dụng |
|----|-------|-------|----------|
| 7805 | +5 V | 1 A | Vi điều khiển, logic TTL |
| 7809 | +9 V | 1 A | Radio, preamp |
| 7812 | +12 V | 1 A | Relay, motor nhỏ |
| 7815 | +15 V | 1 A | Op-amp, audio |
| 7824 | +24 V | 1 A | Relay công suất |
| 7905 | −5 V | 1 A | Rail âm cho op-amp |

Mạch cơ bản IC 7805:
\`\`\`
V_in ──[7805]── V_out = 5 V
          |
         GND
     (thêm tụ 0.1 µF và 0.33 µF theo datasheet)
\`\`\`

### 6.3. Dropout Voltage — điều kiện hoạt động

**Dropout voltage** là mức điện áp chênh lệch tối thiểu giữa $V_{\\text{in}}$ và $V_{\\text{out}}$ để ổn áp hoạt động đúng:

$$V_{\\text{in}} \\geq V_{\\text{out}} + V_{\\text{dropout}}$$

Đối với 7805 (LDO thường): $V_{\\text{dropout}} \\approx$ **2 V** (một số datasheet ghi 2.5–3 V).

Ví dụ: 7805 cần $V_{\\text{out}} = 5$ V → $V_{\\text{in}}$ tối thiểu $= 5 + 2 =$ **7 V**.

Nếu $V_{\\text{in}} < 7$ V (ví dụ tụ lọc xả hết, $V_{\\text{in}}$ tụt xuống 6 V) → 7805 không còn ổn áp được → $V_{\\text{out}}$ giảm theo $V_{\\text{in}}$.

❓ **Câu hỏi tự nhiên**:

*"Điện áp dư thừa (V_in − V_out) đi đâu?"*

Biến thành **nhiệt** trên transistor bên trong IC. Công suất nhiệt:

$$P_{\\text{nhiệt}} = (V_{\\text{in}} - V_{\\text{out}}) \\times I_{\\text{tải}}$$

Ví dụ: $V_{\\text{in}} = 12$ V, $V_{\\text{out}} = 5$ V, $I_{\\text{tải}} = 500$ mA:

$$P_{\\text{nhiệt}} = (12 - 5) \\times 0.5 = \\textbf{3.5 W}$$

3.5 W rất nóng! IC 7805 chịu được tối đa 1.5 W không tản nhiệt → **bắt buộc gắn tản nhiệt** (heatsink) cho tải > 200–300 mA.

*"LDO là gì?"*

LDO = Low Dropout — loại ổn áp có V_dropout nhỏ hơn (0.1–0.5 V). Ví dụ AMS1117: V_dropout ≈ 1.2 V ở 800 mA. Dùng khi cần V_in gần sát V_out (vd pin Li-ion 3.7 V → 3.3 V).

### 6.4. Walk-through thiết kế nguồn 5 V / 500 mA

**Yêu cầu**: V_out = 5 V, I_tải = 500 mA, ripple < 0.5 V.

**Bước 1**: Chọn IC ổn áp: **7805** (5 V, 1 A).

**Bước 2**: Xác định V_in tối thiểu cho 7805:
\`\`\`
V_in_min = 5 + 2 = 7 V (dropout)
\`\`\`
Thêm biên cho ripple: \`V_in_min_thực = 7 + 0.5 = 7.5 V\`.

**Bước 3**: Chọn biến áp. Cần V_dc ≥ 7.5 V sau lọc.
- V_peak_out ≥ 7.5 + V_ripple/2 = 7.5 + 0.25 = 7.75 V.
- V_peak_in_cầu = 7.75 + 1.4 = 9.15 V.
- V_rms_thứ_cấp = 9.15 / √2 ≈ 6.47 V → chọn **biến áp 7.5 V_rms** (an toàn).

**Bước 4**: Tính tụ lọc:
\`\`\`
C ≥ 0.5 / (100 × 0.5) = 0.01 F = 10,000 µF
\`\`\`
Chọn **10,000 µF / 25 V**.

**Bước 5**: Kiểm tra nhiệt 7805:
- V_dc_vào = 7.5 V (xấp xỉ sau lọc), V_out = 5 V, I = 0.5 A.
- P_nhiệt = (7.5 − 5) × 0.5 = **1.25 W** → cần tản nhiệt nhỏ.

📝 **Tóm tắt mục 6**:
- Linear regulator: transistor điều chỉnh tự động, giữ $V_{\\text{out}}$ cố định.
- Cần $V_{\\text{in}} \\geq V_{\\text{out}} + V_{\\text{dropout}}$ (7805: +2 V).
- Nhiệt: $P = (V_{\\text{in}} - V_{\\text{out}}) \\times I_{\\text{tải}}$ → tải nặng phải gắn tản nhiệt.
- LDO có dropout nhỏ hơn (~0.1–1.2 V), hiệu quả hơn khi $V_{\\text{in}}$ sát $V_{\\text{out}}$.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Biến áp có N1 = 2200 vòng, N2 = 120 vòng. Điện áp sơ cấp V1 = 220 V. Tính:
(a) Điện áp thứ cấp V2 (rms).
(b) Điện áp đỉnh V2_peak.
(c) Tỉ số dòng điện I1/I2.

**Bài 2**: Mạch chỉnh lưu nửa kỳ với biến áp 9 V_rms. Tính:
(a) Điện áp đỉnh sau diode (sụt 0.7 V).
(b) Điện áp DC trung bình V_dc.
(c) Tần số gợn sóng.

**Bài 3**: Mạch cầu diode 4 diode (full-wave bridge) dùng biến áp 15 V_rms. Tính:
(a) V_peak sau cầu diode.
(b) V_dc trung bình.
(c) Nếu tải cần 12 V, IC ổn áp nào phù hợp? Điều kiện V_dropout có thoả mãn không?

**Bài 4**: Thiết kế tụ lọc cho nguồn sau: V_dc = 12 V, I_tải = 300 mA, V_ripple_max = 1.2 V. Tính:
(a) C tối thiểu cần dùng.
(b) Điện áp danh định tụ tối thiểu (biết V_peak_out = 16 V).

**Bài 5**: IC 7812 ($V_{\\text{out}} = 12$ V, $V_{\\text{dropout}} = 2$ V) chạy ở $I_{\\text{tải}} = 800$ mA. $V_{\\text{in}}$ vào IC = 15 V.
(a) Tính công suất nhiệt toả ra trên IC.
(b) Nhiệt độ tăng bao nhiêu nếu điện trở nhiệt IC không có tản nhiệt là $R_\\theta = 5$ °C/W?
(c) IC 7812 thường có $T_{\\text{junction,max}} = 125$ °C, nhiệt độ môi trường 40 °C. Có cần tản nhiệt không?

**Bài 6** (thiết kế trọn bộ): Thiết kế nguồn DC 5 V / 1 A từ lưới 220 V. Chọn: biến áp (V_rms thứ cấp), kiểu chỉnh lưu, tụ lọc (C và điện áp danh định), IC ổn áp. Ripple trước ổn áp cho phép 2 V.

---

### Lời giải chi tiết

**Bài 1**:

(a) Áp dụng $V_1/V_2 = N_1/N_2$:

$$V_2 = V_1 \\times \\frac{N_2}{N_1} = 220 \\times \\frac{120}{2200} = 220 \\times 0.05455 = \\textbf{12 V (rms)}$$

(b) $V_{2,\\text{peak}} = V_{2,\\text{rms}} \\times \\sqrt{2} = 12 \\times 1.414 =$ **16.97 V ≈ 17 V**.

(c) Tỉ số dòng nghịch với tỉ số áp:

$$\\frac{I_1}{I_2} = \\frac{N_2}{N_1} = \\frac{120}{2200} = \\frac{1}{18.33} \\approx 0.0545$$

Tức là dòng sơ cấp chỉ bằng 1/18.33 dòng thứ cấp — đúng với nguyên lý bảo toàn công suất (áp cao, dòng nhỏ ↔ áp thấp, dòng lớn).

---

**Bài 2**:

(a) $V_{\\text{peak,in}} = 9 \\times \\sqrt{2} = 12.73$ V. Sau 1 diode:

$$V_{\\text{peak,out}} = 12.73 - 0.7 = \\textbf{12.03 V}$$

(b) Điện áp DC trung bình half-wave:

$$V_{\\text{dc}} = \\frac{V_{\\text{peak,out}}}{\\pi} = \\frac{12.03}{3.1416} = \\textbf{3.83 V}$$

(c) Tần số gợn = **50 Hz** (bằng tần số AC vào, vì chỉ dùng 1 bán kỳ).

---

**Bài 3**:

(a) $V_{\\text{peak,in}} = 15 \\times \\sqrt{2} = 21.21$ V. Sau cầu diode (sụt $2 \\times 0.7$ V):

$$V_{\\text{peak,out}} = 21.21 - 1.4 = 19.81 \\text{ V} \\approx \\textbf{19.8 V}$$

(b) $V_{\\text{dc}} = 2 \\times 19.8 / \\pi = 39.6 / 3.1416 =$ **12.60 V**.

(c) Tải cần 12 V → dùng **IC 7812** ($V_{\\text{out}} = 12$ V).

Kiểm tra dropout: $V_{\\text{in,dc}} \\approx 19.8$ V (xấp xỉ $V_{\\text{peak}}$ khi tụ lọc tốt) $\\gg 12 + 2 = 14$ V → **thoả mãn $V_{\\text{dropout}}$**. Thực ra $V_{\\text{in}}$ lý tưởng nên giữ 14–17 V để giảm nhiệt.

---

**Bài 4**:

(a) Tụ lọc:

$$C \\geq \\frac{I_{\\text{tải}}}{f \\cdot V_{\\text{ripple}}} = \\frac{0.3}{100 \\times 1.2} = \\frac{0.3}{120} = 0.0025 \\text{ F} = 2500 \\text{ µF}$$

→ Chọn **2200 µF** hoặc **3300 µF** (series E12 gần nhất trên 2500 µF).

(b) Điện áp danh định tụ:

$$V_{\\text{danh định}} \\geq 1.5 \\times V_{\\text{peak,out}} = 1.5 \\times 16 = 24 \\text{ V}$$

→ Chọn tụ **25 V** hoặc **35 V** (chuẩn IEC phổ biến).

---

**Bài 5**:

(a) Công suất nhiệt:

$$P = (V_{\\text{in}} - V_{\\text{out}}) \\times I = (15 - 12) \\times 0.8 = 3 \\times 0.8 = \\textbf{2.4 W}$$

(b) Tăng nhiệt độ:

$$\\Delta T = P \\times R_\\theta = 2.4 \\times 5 = 12\\ °\\text{C}$$

Nhiệt độ junction $= T_{\\text{môi}} + \\Delta T = 40 + 12 =$ **52 °C** (chỉ không có tản nhiệt).

Chú ý: $R_\\theta = 5$ °C/W là điện trở nhiệt package-to-ambient. Thực tế TO-220 không có tản nhiệt có $R_{\\theta,ja} \\approx 50$–60 °C/W, không phải 5 °C/W. Nếu $R_{\\theta,ja} = 50$:

$$\\Delta T = 2.4 \\times 50 = 120\\ °\\text{C} \\implies T_{\\text{junction}} = 40 + 120 = 160\\ °\\text{C} > 125\\ °\\text{C} \\implies \\text{IC hỏng!}$$

(c) Với $P = 2.4$ W và $T_{\\text{môi}} = 40$ °C, $T_{\\text{junction,max}} = 125$ °C:

$$R_{\\theta,ja,\\text{max}} = \\frac{T_{\\text{junction,max}} - T_{\\text{môi}}}{P} = \\frac{125 - 40}{2.4} = 35.4\\ \\text{°C/W}$$

TO-220 không tản nhiệt có $R_{\\theta,ja} \\approx 50$ °C/W $> 35.4$ °C/W → **bắt buộc gắn tản nhiệt**.

---

**Bài 6** (thiết kế trọn bộ nguồn 5 V / 1 A):

**IC ổn áp**: Chọn **7805** (5 V, 1.5 A, V_dropout = 2 V).

**$V_{\\text{in}}$ tối thiểu vào 7805**:

$$V_{\\text{in,min}} = 5 + 2 = 7 \\text{ V (dropout)}$$

Thêm biên ripple 2 V: $V_{\\text{in}}$ tối thiểu đỉnh thấp nhất (đáy gợn) = 7 V.

$$V_{\\text{peak,out,cầu}} \\geq 7 + \\frac{V_{\\text{ripple}}}{2} = 7 + 1 = 8 \\text{ V}$$

(Đỉnh = DC + nửa ripple, đáy = DC − nửa ripple)

**Cầu diode**: $V_{\\text{peak,in,cầu}} = 8 + 1.4 = 9.4$ V.

**Biến áp**:

$$V_{\\text{rms,thứ cấp}} = \\frac{9.4}{\\sqrt{2}} = \\frac{9.4}{1.414} = 6.65\\ V_{\\text{rms}}$$

→ Chọn **biến áp 7.5 V_rms** (tiêu chuẩn phổ biến, an toàn) hoặc **9 V_rms** (biên rộng hơn).

Kiểm tra với 9 V_rms: $V_{\\text{peak}} = 9 \\times 1.414 = 12.73$ V; sau cầu diode $= 12.73 - 1.4 = 11.33$ V; $V_{\\text{dc}} \\approx 11.33$ V. Ripple $= 1 \\text{ A} / (100 \\times C) = 2$ V → $C = 1/(100 \\times 2) = 5000$ µF → $V_{\\text{dc}}$ tại đáy $= 11.33 - 1 = 10.33$ V $\\gg 7$ V ✓.

**Tụ lọc**:

$$C \\geq \\frac{1.0}{100 \\times 2} = 5000\\ \\text{µF}$$

→ Chọn **4700 µF / 25 V** hoặc **6800 µF / 25 V**.

**Kiểm tra nhiệt 7805**:

$V_{\\text{in,trung bình}} \\approx 10.33$ V (đáy gợn, worst case):

$$P_{\\text{nhiệt}} = (10.33 - 5) \\times 1 = \\textbf{5.33 W} \\implies \\text{cần tản nhiệt lớn}$$

Thực tế: với $V_{\\text{in}}$ trung bình 11 V → $P = (11 - 5) \\times 1 =$ **6 W** → tản nhiệt TO-220 loại 8–10 °C/W.

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 02 — Diode](../lesson-02-diode/) — diode chỉnh lưu là linh kiện cốt lõi.
- **Tiền đề**: [Tụ điện & RC](../../01-Fundamentals/lesson-04-capacitor-rc/) — tụ lọc gợn sóng ứng dụng hằng số thời gian RC.
- **Tiền đề**: [AC & Trở kháng RLC](../../01-Fundamentals/lesson-06-ac-impedance-rlc/) — V_rms, V_peak, tần số.
- **Bài tiếp theo**: [Lesson 04 — BJT Khuếch đại](../lesson-04-bjt-amplifier/) — transistor lưỡng cực, khuếch đại tín hiệu nhỏ với nguồn DC từ mạch nguồn này.
- **Xem minh họa tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 03

1. **Sơ đồ khối**: Biến áp → Chỉnh lưu → Tụ lọc → Ổn áp — mỗi khối giải một vấn đề cụ thể.
2. **Biến áp**: $V_1/V_2 = N_1/N_2$; $V_{\\text{peak}} = V_{\\text{rms}} \\times \\sqrt{2}$; cách ly điện áp lưới.
3. **Chỉnh lưu nửa kỳ**: $V_{\\text{dc}} = V_{\\text{peak}}/\\pi \\approx 0.318\\ V_{\\text{peak}}$; 1 diode; tần số gợn 50 Hz.
4. **Cầu diode**: $V_{\\text{dc}} = 2V_{\\text{peak}}/\\pi \\approx 0.637\\ V_{\\text{peak}}$; sụt 1.4 V; tần số gợn 100 Hz — tiêu chuẩn thực tế.
5. **Tụ lọc**: $V_{\\text{ripple}} \\approx I/(f \\cdot C)$; chọn $C \\geq I/(f \\cdot V_{\\text{ripple,max}})$; điện áp tụ $\\geq 1.5 \\times V_{\\text{peak}}$.
6. **Ổn áp**: giữ $V_{\\text{out}}$ cố định; cần $V_{\\text{in}} \\geq V_{\\text{out}} + V_{\\text{dropout}}$; nhiệt $P = (V_{\\text{in}} - V_{\\text{out}}) \\times I$.
`;
