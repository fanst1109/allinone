// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/02-Semiconductors/lesson-02-diode/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Diode

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu tạo tiếp giáp P-N và tại sao diode chỉ dẫn điện một chiều.
- Phân biệt ba mô hình diode: lý tưởng, sụt áp 0.7 V, và có điện trở động.
- Đọc và giải thích đặc tuyến I-V; biết phương trình Shockley ở mức định tính.
- Tính dòng và điện áp trong mạch diode nối tiếp điện trở (ít nhất 4 ví dụ số).
- Hiểu nguyên lý chỉnh lưu bán kỳ (half-wave rectifier).
- Tính toán mạch ổn áp Zener: chọn điện trở hạn dòng, kiểm tra công suất (ít nhất 3 ví dụ số).
- Tính điện trở hạn dòng cho LED đỏ, xanh dương, nhiều LED nối tiếp (ít nhất 3 ví dụ số).

## Kiến thức tiền đề

- [Lesson 01 — Bán dẫn & Tiếp giáp P-N](../lesson-01-semiconductor-pn/) — cơ chế lỗ trống, electron, vùng nghèo.
- Định luật Ohm và phân chia điện áp (Kiến thức cơ bản Fundamentals).

## Liên kết tham khảo

- [Lesson 03 — Mạch nguồn DC](../lesson-03-dc-power-supply/) — ứng dụng chỉnh lưu toàn kỳ, lọc tụ.
- [Lesson 05 — Inductor & Mạch RL](../../01-Fundamentals/lesson-05-inductor-rl/) — flyback diode bảo vệ transistor/relay.

---

## 1. Diode là gì

### 1.1. Cấu tạo và ký hiệu

💡 **Trực giác**: Hãy tưởng tượng một cánh cửa một chiều (van một chiều): nước có thể đi qua từ trái sang phải nhưng không thể đi ngược lại. Diode chính xác là một "van một chiều" cho dòng điện.

**Diode** là linh kiện bán dẫn (semiconductor) hai cực, gồm một tiếp giáp P-N (P-N junction):
- Cực **anode** (A) nối với vùng bán dẫn loại P.
- Cực **cathode** (K) nối với vùng bán dẫn loại N.

**Ký hiệu mạch:**

\`\`\`
    A        K
    |        |
    +-->|----+
        ^
        Vạch = cathode
        Tam giác chỉ chiều dòng điện thuận
\`\`\`

Quy tắc nhớ: **vạch kẻ đứng = cathode (K)**. Chiều tam giác = chiều dòng điện được phép chảy qua (từ A sang K khi phân cực thuận).

**Vì sao diode là "van một chiều"?**

Như đã học ở [Lesson 01](../lesson-01-semiconductor-pn/), tiếp giáp P-N tạo ra vùng nghèo (depletion region) với điện trường nội. Khi:
- **Phân cực thuận** (V_A > V_K): điện áp ngoài đẩy lùi vùng nghèo → diode dẫn điện → dòng chảy từ A sang K.
- **Phân cực ngược** (V_A < V_K): điện áp ngoài mở rộng vùng nghèo → diode không dẫn → hầu như không có dòng.

### 1.2. Ba mô hình diode

| Mô hình | Mô tả | Khi nào dùng |
|---------|-------|--------------|
| **Lý tưởng** | Dẫn hoàn hảo (V_D = 0 V) khi thuận; hở mạch hoàn toàn khi ngược | Phân tích sơ bộ, mạch số |
| **Sụt áp hằng 0.7 V** | V_D = 0.7 V khi thuận (Si); hở mạch khi ngược | Tính mạch thực tế — **mô hình dùng chính trong bài này** |
| **Có điện trở động r_d** | V_D = 0.7 V + I × r_d (r_d ≈ 1–50 Ω tuỳ diode) | Cần độ chính xác cao, tần số cao |

⚠ **Lỗi thường gặp**: Dùng mô hình lý tưởng (V_D = 0) để tính mạch thực tế → kết quả sai hàng chục phần trăm. Ví dụ: LED đỏ có V_D ≈ 1.8 V — nếu bỏ qua, tính R hạn dòng sẽ quá nhỏ → LED bị cháy.

📝 **Tóm tắt mục 1**
- Diode = tiếp giáp P-N, hai cực A (anode) và K (cathode). Vạch = cathode.
- Van một chiều: dẫn khi phân cực thuận, không dẫn khi ngược.
- Ba mô hình: lý tưởng / 0.7 V / có r_d. Mô hình 0.7 V dùng cho bài tập thực tế.

---

## 2. Đặc tuyến I-V và phương trình Shockley

### 2.1. Phương trình Shockley (định tính)

**Phương trình Shockley** mô tả quan hệ giữa dòng $I$ và điện áp $V$ trên diode:

$$I = I_s \\cdot \\left(e^{V / (n \\cdot V_T)} - 1\\right)$$

Trong đó:
- $I_s$ = dòng bão hoà ngược (saturation current), cỡ $10^{-12}$ A đến $10^{-6}$ A tuỳ diode.
- $n$ = hệ số lý tưởng (ideality factor), $n \\approx$ 1–2.
- $V_T$ = điện áp nhiệt (thermal voltage) $= kT/q \\approx$ **26 mV** ở 25°C.

💡 **Trực giác**: Phương trình này nói rằng dòng tăng theo hàm mũ khi tăng $V$. Tăng $V$ thêm 60 mV → dòng tăng 10 lần (ở nhiệt độ phòng). Đó là lý do đặc tuyến I-V trông như "hầu như không có gì rồi bật đột ngột".

❓ **Câu hỏi tự nhiên**:

**Q: Vậy không có ngưỡng cứng 0.7 V?**
A: Đúng — thực tế là hàm liên tục. Nhưng vì hàm mũ tăng rất nhanh, trong khoảng $V =$ 0.5–0.8 V dòng tăng từ micro-ampe lên milli-ampe và centi-ampe. Mô hình 0.7 V là gần đúng tốt cho hầu hết tính toán mạch.

**Q: Tại sao $n \\cdot V_T \\approx 26$ mV mà ngưỡng lại là 0.7 V — cách nhau gần 30 lần?**
A: Vì $e^{0.7/0.026} = e^{26.9} \\approx 4.8 \\times 10^{11}$. Nhân với $I_s = 10^{-12}$ A → $I \\approx 0.48$ A. Đây là lý do tại ngưỡng 0.7 V dòng đã rất lớn.

**Q: Ở vùng ngược ($V < 0$), dòng là bao nhiêu?**
A: $I \\approx -I_s \\approx -10^{-12}$ A (cực kỳ nhỏ) — thực tế coi như hở mạch.

### 2.2. Tính mạch: diode + điện trở nối tiếp

**Sơ đồ mạch cơ bản:**

\`\`\`
  V_s (+)──[R]──┬──(A)→|(K)──┬── GND
                │              │
              V_R            V_D
\`\`\`

Áp dụng Kirchhoff điện áp (KVL):

$$V_s = V_R + V_D = I \\cdot R + 0.7 \\implies I = \\frac{V_s - 0.7}{R}$$

**Ví dụ 1 — V_s = 5 V, R = 220 Ω:**
\`\`\`
I = (5 − 0.7) / 220 = 4.3 / 220 ≈ 19.5 mA
V_R = 19.5 × 10⁻³ × 220 = 4.3 V  ✓ (= V_s − V_D = 5 − 0.7 = 4.3 V)
\`\`\`

**Ví dụ 2 — V_s = 9 V, R = 470 Ω:**
\`\`\`
I = (9 − 0.7) / 470 = 8.3 / 470 ≈ 17.7 mA
V_R = 8.3 V,  V_D = 0.7 V
\`\`\`

**Ví dụ 3 — V_s = 3.3 V, R = 100 Ω:**
\`\`\`
I = (3.3 − 0.7) / 100 = 2.6 / 100 = 26 mA
\`\`\`

**Ví dụ 4 — V_s = 1.5 V, R = 1 kΩ:**
\`\`\`
I = (1.5 − 0.7) / 1000 = 0.8 / 1000 = 0.8 mA
\`\`\`
Nhận xét: điện áp nguồn thấp → dòng nhỏ nhưng diode vẫn dẫn vì V_s > 0.7 V.

**Ví dụ 5 — V_s = 0.5 V, R = 100 Ω:**
\`\`\`
V_s < 0.7 V → diode không dẫn → I = 0 mA, V_R = 0 V, V_D = 0.5 V (toàn bộ điện áp rơi trên diode)
\`\`\`

🔁 **Dừng lại tự kiểm tra**: Mạch có V_s = 12 V, R = 560 Ω, một diode Si. Tính I và V_R.

<details>
<summary>Đáp án</summary>

I = (12 − 0.7) / 560 = 11.3 / 560 ≈ **20.2 mA**

V_R = 20.2 × 10⁻³ × 560 ≈ **11.3 V**

Kiểm tra: V_R + V_D = 11.3 + 0.7 = 12 V ✓
</details>

📝 **Tóm tắt mục 2**
- Phương trình Shockley: $I = I_s(e^{V/(n V_T)} - 1)$. Dòng tăng theo hàm mũ khi tăng $V$.
- Mô hình 0.7 V: tính mạch bằng KVL → $I = (V_s - 0.7) / R$.
- Nếu $V_s < 0.7$ V: diode không dẫn, $I = 0$.

---

## 3. Ứng dụng chỉnh lưu (Rectifier)

### 3.1. Nguyên lý chỉnh lưu bán kỳ

💡 **Trực giác**: Điện xoay chiều (AC) có cả bán kỳ dương (V > 0) và bán kỳ âm (V < 0). Diode giống cánh cửa: chỉ mở khi áp thuận (bán kỳ dương) → chỉ bán kỳ dương đi qua → DC xung.

**Mạch chỉnh lưu bán kỳ (half-wave rectifier):**

\`\`\`
     D
AC ──→|──┬── V_out (chỉ bán kỳ dương, trừ sụt 0.7 V)
         │
        [R_L]
         │
        GND
\`\`\`

**Hoạt động:**
- Bán kỳ dương (V_in > 0.7 V): diode dẫn → V_out = V_in − 0.7 V ≈ V_in.
- Bán kỳ âm (V_in < 0): diode phân cực ngược → diode hở mạch → V_out = 0.

**Ví dụ**: V_in = 12 V_peak (AC), R_L = 100 Ω.
- Đỉnh V_out = 12 − 0.7 = 11.3 V.
- Đỉnh dòng qua tải = 11.3 / 100 = 113 mA.

❓ **Câu hỏi tự nhiên**:

**Q: Điện áp ngược tối đa trên diode là bao nhiêu?**
A: Khi bán kỳ âm, toàn bộ V_in rơi ngược lên diode (V_in đỉnh âm = −12 V). Phải chọn diode có **PIV (Peak Inverse Voltage) > 12 V**.

**Q: Sao gọi là "bán kỳ" (half-wave)? Bán kỳ âm bỏ đi à?**
A: Đúng — hiệu suất chỉ 50%. Mạch nguồn thực tế dùng **chỉnh lưu cầu 4 diode (bridge rectifier)** để tận dụng cả hai bán kỳ — xem [Lesson 03](../lesson-03-dc-power-supply/).

**Q: Flyback diode là gì?**
A: Khi tắt dòng qua cuộn cảm (inductor) hoặc relay, cuộn sinh xung điện áp ngược (flyback) rất cao → có thể phá transistor. Đặt diode song song ngược chiều với cuộn → hấp thụ xung này. Xem [Lesson 05 — Inductor & RL](../../01-Fundamentals/lesson-05-inductor-rl/).

📝 **Tóm tắt mục 3**
- Chỉnh lưu bán kỳ: diode chỉ cho bán kỳ dương qua, V_out = V_in − 0.7 V.
- Cần chọn diode có PIV lớn hơn điện áp đỉnh của nguồn AC.
- Chỉnh lưu toàn kỳ (cầu diode) hiệu quả hơn — trình bày ở Lesson 03.

---

## 4. Diode Zener

### 4.1. Cơ chế hoạt động

💡 **Trực giác**: Diode Zener giống như một van an toàn (safety valve) trong đường ống nước: khi áp suất vượt ngưỡng V_Z, van mở và xả áp để giữ áp suất không tăng thêm. Điện áp trên Zener luôn bị kẹp tại V_Z.

**Diode Zener** được thiết kế để hoạt động ổn định ở **vùng đánh thủng ngược (Zener breakdown)** tại điện áp xác định V_Z (thường 2.4 V–200 V).

**Ký hiệu**: Giống diode thường nhưng cathode có "cánh" kép:

\`\`\`
    A        K
    |        |
    +-->|z---+
\`\`\`

**Điểm khác biệt với diode thường:**
- Diode thường: đánh thủng ngược = phá hủy (phải tránh).
- Diode Zener: đánh thủng ngược = chế độ hoạt động thiết kế (không phá hủy nếu dòng trong phạm vi cho phép).

**Vùng hoạt động Zener:**
- Phân cực thuận: như diode thường (V_D ≈ 0.7 V).
- Phân cực ngược, V < V_Z: dòng ngược rất nhỏ (hở mạch gần đúng).
- Phân cực ngược, V ≥ V_Z: điện áp bị kẹp tại V_Z, dòng có thể lớn (bị giới hạn bởi mạch ngoài).

### 4.2. Mạch ổn áp Zener cơ bản

**Sơ đồ:**

\`\`\`
  V_in (+)──[R_s]──┬──── V_out = V_Z (ổn định)
                   │
                 [Zener]  (cathode lên trên, anode xuống GND)
                   │
                  GND
\`\`\`

**Điều kiện hoạt động đúng:**
1. V_in > V_Z (cần có áp dư để Zener mở).
2. Dòng qua Zener I_Z = I_R − I_L phải dương (Zener luôn có dòng chảy qua).
3. Dòng Zener không vượt I_Z_max (tra datasheet).

**Tính $R_s$ (điện trở hạn dòng):**

$$I_R = \\frac{V_{\\text{in}} - V_Z}{R_s} \\qquad I_Z = I_R - I_L$$

Chọn $R_s$ sao cho $I_Z$ tối thiểu $\\approx$ 5–10% $I_{Z,\\text{max}}$ để Zener luôn ở vùng ổn áp.

**Ví dụ 1 — Ổn áp 5.1 V từ nguồn 9 V, tải 50 mA:**

- V_Z = 5.1 V, V_in = 9 V, I_L = 50 mA.
- Chọn I_Z_min = 10 mA → I_R = I_L + I_Z = 50 + 10 = 60 mA.
- $R_s = (V_{\\text{in}} - V_Z) / I_R = (9 - 5.1) / 0.060 = 3.9 / 0.060 =$ **65 Ω** → chọn 68 Ω (giá trị E12 gần nhất).
- Kiểm tra dòng Zener với $R_s = 68\\ \\Omega$: $I_R = 3.9 / 68 = 57.4$ mA. $I_Z = 57.4 - 50 = 7.4$ mA > 0 ✓.
- Công suất $R_s$: $P = I_R^2 \\cdot R_s = (0.0574)^2 \\times 68 \\approx$ **224 mW** → dùng điện trở 1/2 W.
- Công suất Zener tối đa (khi tải hở $I_L = 0$): $P_Z = V_Z \\cdot I_R = 5.1 \\times 0.0574 \\approx$ **293 mW** → chọn Zener 500 mW trở lên.

**Ví dụ 2 — Ổn áp 3.3 V từ nguồn 5 V, tải 20 mA:**

- $V_Z = 3.3$ V, $V_{\\text{in}} = 5$ V, $I_L = 20$ mA.
- Chọn $I_{Z,\\text{min}} = 5$ mA → $I_R = 25$ mA.
- $R_s = (5 - 3.3) / 0.025 = 1.7 / 0.025 =$ **68 Ω** (đúng E12).
- Công suất $R_s$: $P = (0.025)^2 \\times 68 = 0.0425$ W = **42.5 mW** → điện trở 1/4 W đủ dùng.

**Ví dụ 3 — Ổn áp 12 V từ nguồn 15 V, không tải (I_L = 0):**

- $V_Z = 12$ V, $V_{\\text{in}} = 15$ V, $I_L = 0$.
- Chọn $I_Z = 20$ mA (Zener dẫn đủ để ổn áp).
- $R_s = (15 - 12) / 0.020 = 3 / 0.020 =$ **150 Ω** → chọn 150 Ω (E12).
- Công suất Zener: $P_Z = 12 \\times 0.020 =$ **240 mW** → chọn Zener 500 mW.
- Công suất $R_s$: $P = (0.020)^2 \\times 150 =$ **60 mW** → điện trở 1/4 W ổn.

⚠ **Lỗi thường gặp**: Quên kiểm tra công suất Zener khi tải hở. Khi $I_L = 0$, toàn bộ dòng $I_R$ chảy qua Zener → $P_Z$ tối đa. Phải tính trường hợp xấu nhất này.

🔁 **Dừng lại tự kiểm tra**: V_in = 12 V, V_Z = 5.1 V (1N4733), I_L = 30 mA. Tính R_s và P_Zener_max.

<details>
<summary>Đáp án</summary>

Chọn $I_{Z,\\text{min}} = 10$ mA → $I_R = 40$ mA.

$R_s = (12 - 5.1) / 0.040 = 6.9 / 0.040 =$ **172.5 Ω** → chọn **180 Ω** (E12).

$I_R$ thực $= 6.9 / 180 = 38.3$ mA. $I_Z = 38.3 - 30 = 8.3$ mA > 0 ✓.

$P_{Z,\\text{max}}$ (khi $I_L = 0$): $P_Z = 5.1 \\times 0.0383 \\approx$ **195 mW** → chọn Zener 500 mW.
</details>

📝 **Tóm tắt mục 4**
- Zener hoạt động ở vùng đánh thủng ngược $V_Z$, giữ điện áp ổn định.
- Mạch ổn áp: $R_s = (V_{\\text{in}} - V_Z) / (I_L + I_{Z,\\text{min}})$.
- Luôn kiểm tra công suất Zener ở trường hợp tải hở ($I_L = 0$) → $P_Z = V_Z \\cdot (V_{\\text{in}} - V_Z) / R_s$.

---

## 5. LED — Diode phát quang

### 5.1. Đặc điểm

💡 **Trực giác**: LED là diode đặc biệt: khi electron và lỗ trống tái hợp tại tiếp giáp P-N, năng lượng không giải phóng dưới dạng nhiệt mà dưới dạng **photon ánh sáng**. Bước sóng (màu sắc) phụ thuộc vật liệu bán dẫn — đó là lý do LED đỏ, xanh, vàng cần vật liệu khác nhau.

**Sụt áp LED theo màu** (điện áp thuận điển hình):

| Màu | V_LED (điển hình) | Vật liệu |
|-----|-------------------|----------|
| Hồng ngoại (IR) | ~1.2 V | GaAs |
| Đỏ | ~1.8–2.0 V | GaAsP |
| Vàng / Cam | ~2.0–2.1 V | GaAsP |
| Xanh lá | ~2.0–2.2 V | GaP |
| Xanh dương | ~3.0–3.4 V | GaN |
| Trắng | ~3.0–3.4 V | GaN (phủ phosphor) |
| UV | ~3.5–4.0 V | GaN/AlGaN |

**Dòng định mức**: LED thông thường 5 mm: **I_LED ≈ 20 mA** (5–30 mA tuỳ loại).

⚠ **Lỗi thường gặp**: Nối LED thẳng vào nguồn 5 V hoặc 3.3 V không qua điện trở hạn dòng → dòng quá lớn → LED chết ngay lập tức. LED không tự giới hạn dòng như bóng đèn sợi đốt!

### 5.2. Tính điện trở hạn dòng

**Công thức:**

$$R = \\frac{V_{\\text{nguồn}} - V_{\\text{LED}}}{I_{\\text{LED}}}$$

**Ví dụ 1 — LED đỏ với nguồn 5 V, I = 20 mA:**
\`\`\`
R = (5 − 1.8) / 0.020 = 3.2 / 0.020 = 160 Ω
→ Chọn 150 Ω hoặc 180 Ω (E12). Dùng 180 Ω cho an toàn:
  I_thực = (5 − 1.8) / 180 = 3.2 / 180 ≈ 17.8 mA  (vẫn đủ sáng)
P_R = I² × R = (0.0178)² × 180 ≈ 57 mW → dùng điện trở 1/4 W (250 mW).
\`\`\`

**Ví dụ 2 — LED đỏ với nguồn 9 V, I = 20 mA:**
\`\`\`
R = (9 − 1.8) / 0.020 = 7.2 / 0.020 = 360 Ω → chọn 360 Ω hoặc 390 Ω.
P_R = (0.020)² × 360 = 144 mW → 1/4 W (250 mW) đủ dùng.
\`\`\`

**Ví dụ 3 — LED xanh dương với nguồn 5 V, I = 15 mA:**
\`\`\`
R = (5 − 3.2) / 0.015 = 1.8 / 0.015 = 120 Ω (đúng E12).
P_R = (0.015)² × 120 = 27 mW → 1/4 W dư sức.
\`\`\`

**Ví dụ 4 — 3 LED đỏ nối tiếp với nguồn 12 V, I = 20 mA:**

Khi LED nối tiếp, sụt áp cộng lại:
\`\`\`
V_LED_tổng = 3 × 1.8 = 5.4 V
R = (12 − 5.4) / 0.020 = 6.6 / 0.020 = 330 Ω (đúng E12).
P_R = (0.020)² × 330 = 132 mW → 1/4 W vừa đủ (250 mW), nhưng nên dùng 1/2 W.
\`\`\`

❓ **Câu hỏi tự nhiên**:

**Q: Tại sao nối song song LED thay vì nối tiếp?**
A: LED không nối song song trực tiếp vì sụt áp mỗi chiếc không hoàn toàn bằng nhau → một LED sẽ dẫn nhiều hơn và chết trước. Mỗi LED cần điện trở riêng, hoặc nối tiếp nhiều LED chung một điện trở.

**Q: LED có bị hỏng khi phân cực ngược không?**
A: Có — LED thường chịu được tối đa 5 V ngược. Trong mạch AC, cần diode bảo vệ ngược chiều song song.

🔁 **Dừng lại tự kiểm tra**: Nguồn 3.3 V, LED xanh dương (V_LED = 3.0 V), muốn dòng 10 mA. Tính R.

<details>
<summary>Đáp án</summary>

R = (3.3 − 3.0) / 0.010 = 0.3 / 0.010 = **30 Ω** → chọn 33 Ω (E12, gần nhất).

I_thực = 0.3 / 33 ≈ 9.1 mA (vẫn đủ sáng).
</details>

📝 **Tóm tắt mục 5**
- LED: sụt áp phụ thuộc màu (đỏ ~1.8 V, xanh dương ~3.0–3.2 V). Dòng định mức ~20 mA.
- $R = (V_{\\text{nguồn}} - V_{\\text{LED}}) / I_{\\text{LED}}$. Luôn phải có điện trở hạn dòng.
- LED nối tiếp: $V_{\\text{LED}}$ cộng lại. Không nối song song trực tiếp không qua điện trở.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Mạch gồm nguồn 6 V, điện trở 330 Ω và diode Si (V_D = 0.7 V) nối tiếp. Tính:
(a) Dòng qua mạch I.
(b) Điện áp rơi trên điện trở V_R.
(c) Công suất tiêu thụ trên điện trở P_R.

**Bài 2**: LED đỏ (V_LED = 2.0 V) nối với nguồn 5 V qua điện trở. Yêu cầu dòng 15 mA. Tính:
(a) Điện trở cần thiết R.
(b) Giá trị E12 gần nhất (dãy: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330...).
(c) Dòng thực tế qua LED với R E12 đã chọn.
(d) Công suất điện trở P_R.

**Bài 3**: Mạch ổn áp Zener 1N4733 (V_Z = 5.1 V, I_Z_max = 49 mA). Nguồn vào V_in = 9 V. Tải I_L = 20 mA. Tính:
(a) R_s cần thiết (với I_Z_min = 10 mA).
(b) Chọn R_s từ dãy E12.
(c) Dòng thực tế qua Zener khi có tải 20 mA.
(d) Công suất Zener tối đa (khi tải hở I_L = 0).

**Bài 4**: Mạch chỉnh lưu bán kỳ, V_in = 18 V_peak (AC), R_tải = 500 Ω.
(a) Điện áp đỉnh V_out tại tải.
(b) Dòng đỉnh qua tải I_peak.
(c) PIV tối thiểu cho diode.
(d) Tại sao V_out trung bình (DC) chỉ ≈ V_peak / π ≈ 5.5 V?

**Bài 5**: Ba LED xanh dương (V_LED = 3.2 V mỗi chiếc) nối tiếp nhau, mắc với nguồn 12 V. Muốn dòng 20 mA. Tính:
(a) Điện trở hạn dòng R.
(b) Công suất điện trở P_R.
(c) Kiểm tra: nếu một LED hở mạch, điều gì xảy ra?

**Bài 6**: Mạch ổn áp Zener 1N4742 (V_Z = 12 V, P_Z_max = 1 W). Nguồn V_in = 18 V, tải I_L thay đổi từ 0 đến 50 mA. Tính:
(a) R_s để đảm bảo I_Z_min = 5 mA khi I_L = 50 mA (tải cực đại).
(b) Kiểm tra P_Zener khi tải hở (I_L = 0) — có vượt 1 W không?

---

### Lời giải chi tiết

**Bài 1**:

*Bước 1*: Áp dụng KVL: V_s = I·R + V_D

*Bước 2*: Tính I:
\`\`\`
I = (V_s − V_D) / R = (6 − 0.7) / 330 = 5.3 / 330 ≈ 16.1 mA
\`\`\`

*Bước 3*: V_R = I × R = 16.1 × 10⁻³ × 330 ≈ **5.3 V**.
Kiểm tra: V_R + V_D = 5.3 + 0.7 = 6 V ✓

*Bước 4*: P_R = I² × R = (0.0161)² × 330 ≈ **85.5 mW** → điện trở 1/4 W đủ dùng.

---

**Bài 2**:

*Bước 1*: R = (V_nguồn − V_LED) / I = (5 − 2.0) / 0.015 = 3 / 0.015 = **200 Ω**.

*Bước 2*: Giá trị E12 gần nhất ≥ 200 Ω là **220 Ω** (chọn lớn hơn để an toàn cho LED).

*Bước 3*: I_thực = (5 − 2.0) / 220 = 3 / 220 ≈ **13.6 mA** (vẫn sáng tốt, giảm nhẹ so với 15 mA).

*Bước 4*: P_R = (0.0136)² × 220 ≈ **40.6 mW** → 1/4 W dư sức.

---

**Bài 3**:

*Bước 1*: Tính I_R cần: I_R = I_L + I_Z_min = 20 + 10 = 30 mA.

*Bước 2*: R_s = (V_in − V_Z) / I_R = (9 − 5.1) / 0.030 = 3.9 / 0.030 = **130 Ω**.

*Bước 3*: Chọn E12 gần nhất: **120 Ω** (chọn nhỏ hơn để đảm bảo dòng Zener không quá nhỏ) hoặc **150 Ω** (an toàn hơn — ít dòng Zener hơn nhưng vẫn đủ).
Dùng **120 Ω**: I_R = 3.9 / 120 = 32.5 mA. I_Z = 32.5 − 20 = **12.5 mA** ✓ (> I_Z_min = 10 mA).

*Bước 4*: P_Zener_max (khi I_L = 0): I_R = 3.9 / 120 = 32.5 mA. P_Z = 5.1 × 0.0325 ≈ **165.75 mW**.
I_Z_max = 32.5 mA < 49 mA ✓. Cần Zener 500 mW để có biên an toàn 3×.

---

**Bài 4**:

*(a)* V_out_peak = V_in_peak − V_D = 18 − 0.7 = **17.3 V**.

*(b)* I_peak = V_out_peak / R_tải = 17.3 / 500 = **34.6 mA**.

*(c)* PIV tối thiểu $= V_{\\text{in,peak}} =$ **18 V**. Thực tế chọn diode PIV $\\geq 1.5 \\times 18 = 27$ V (thường dùng loại 50 V).

*(d)* Vì chỉ có bán kỳ dương đi qua; bán kỳ âm = 0. Trung bình hình sin nửa kỳ $= V_{\\text{peak}} / \\pi \\approx 18 / 3.14 \\approx 5.7$ V. Sau khi trừ $V_D$: $V_{\\text{DC,trung bình}} \\approx 17.3 / \\pi \\approx$ **5.5 V**.

---

**Bài 5**:

*(a)* V_LED_tổng = 3 × 3.2 = 9.6 V.
R = (12 − 9.6) / 0.020 = 2.4 / 0.020 = **120 Ω** (đúng E12).

*(b)* P_R = I² × R = (0.020)² × 120 = 0.048 W = **48 mW** → 1/4 W thoải mái.

*(c)* Nếu một LED hở mạch: toàn bộ 12 V rơi trên 2 LED còn lại + R. Dòng $= (12 - 2 \\times 3.2) / 120 = (12 - 6.4) / 120 = 5.6 / 120 \\approx$ **46.7 mA** — gần gấp đôi dòng định mức 20 mA → 2 LED còn lại có thể hỏng nếu không xử lý.

---

**Bài 6**:

*(a)* Tải cực đại I_L = 50 mA, I_Z_min = 5 mA → I_R = 55 mA.
R_s = (18 − 12) / 0.055 = 6 / 0.055 ≈ **109 Ω** → chọn E12 = **100 Ω** (để đảm bảo đủ dòng).

I_R thực với R_s = 100 Ω: I_R = 6 / 100 = 60 mA.
I_Z khi I_L = 50 mA: I_Z = 60 − 50 = 10 mA > 0 ✓.

*(b)* Khi $I_L = 0$: $P_Z = V_Z \\cdot I_R = 12 \\times 0.060 =$ **720 mW < 1 W** ✓. Zener an toàn.

Tuy nhiên $P_R = I_R^2 \\cdot R_s = (0.060)^2 \\times 100 =$ **360 mW** → cần điện trở **1/2 W** (hoặc 1 W để chắc chắn).

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Mạch nguồn DC](../lesson-03-dc-power-supply/) — chỉnh lưu cầu, lọc tụ, ổn áp IC, thiết kế nguồn hoàn chỉnh.
- **Liên quan**: [Lesson 05 — Inductor & Mạch RL](../../01-Fundamentals/lesson-05-inductor-rl/) — flyback diode bảo vệ khi ngắt tải cảm.
- **Xem minh họa tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 02

1. **Diode = van một chiều**: dẫn khi phân cực thuận (V_A > V_K + 0.7 V), hở mạch khi ngược.
2. **Mô hình 0.7 V**: tính mạch bằng KVL → $I = (V_s - 0.7) / R$. Phương trình Shockley cho hiểu cơ chế sâu hơn.
3. **Chỉnh lưu bán kỳ**: diode chỉ cho bán kỳ dương qua; cần chọn PIV $> V_{\\text{peak,AC}}$.
4. **Zener**: hoạt động ở vùng đánh thủng ngược $V_Z$; $R_s = (V_{\\text{in}} - V_Z) / (I_L + I_{Z,\\text{min}})$. Luôn kiểm tra $P_Z$ khi tải hở.
5. **LED**: $R = (V_{\\text{nguồn}} - V_{\\text{LED}}) / I_{\\text{LED}}$. Không bao giờ nối LED trực tiếp vào nguồn không có điện trở.
`;
