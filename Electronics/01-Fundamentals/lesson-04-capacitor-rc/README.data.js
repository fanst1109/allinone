// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/01-Fundamentals/lesson-04-capacitor-rc/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Tụ điện & Mạch RC

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tụ điện (capacitor)** là gì: cấu tạo, cách tích trữ điện tích và năng lượng, đơn vị Farad.
- Tính toán điện tích, điện áp, điện dung qua công thức **Q = C·V**.
- Tính **năng lượng tích lũy** trong tụ: E = ½·C·V².
- Hiểu tụ phản ứng thế nào với **DC** và **tín hiệu thay đổi** (định tính).
- Phân tích **mạch RC nạp và xả**: công thức mũ, hằng số thời gian τ, bảng giá trị chuẩn.
- Biết ứng dụng thực tế: lọc nguồn, debounce, mạch định thời.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/) — định luật Ohm, đơn vị cơ bản.
- [Lesson 02 — Định luật Kirchhoff](../lesson-02-kirchhoff-circuits/) — KVL, KCL.
- [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/) — điện trở trong mạch RC.
- Hàm mũ tự nhiên e^x và logarithm tự nhiên ln (dùng khi tính thời gian): xem [Lesson 07 — Hàm mũ & Logarithm](../../../Math/06-Advanced/lesson-07/) nếu cần ôn lại.

---

## 1. Tụ điện là gì

### 1.1. Cấu tạo vật lý

**Tụ điện (capacitor)** gồm hai **bản cực** dẫn điện (bản kim loại) đặt song song, ngăn cách nhau bởi một lớp **điện môi (dielectric)** không dẫn điện (không khí, gốm, mica, màng nhựa polyester...).

Khi đặt điện áp V vào hai đầu, bản dương tích điện tích +Q, bản âm tích −Q. Không có dòng DC thực sự chạy xuyên qua lớp điện môi (đó là chất cách điện) — nhưng điện tích tích tụ trên bề mặt, tạo ra một điện trường trong khoảng giữa hai bản.

💡 **Trực giác — Analogy bình chứa nước**

Hãy hình dung tụ điện như một **bình chứa nước** với màng cao su ở giữa:
- Bơm nước vào → màng cao su căng ra → áp lực nước (= điện áp V) tăng lên.
- Điện dung C = "kích thước bình" — bình càng to, cùng lượng nước bơm vào thì áp lực tăng ít hơn.
- Điện tích Q = "lượng nước đã bơm vào".
- Nước không chạy xuyên qua màng cao su (= điện môi cách điện), nhưng màng căng ra → "áp lực" truyền sang bên kia.

Analogy này giải thích tại sao tụ "cản DC nhưng cho AC qua" — sẽ thấy rõ ở mục 4.

### 1.2. Công thức cơ bản: Q = C·V

**Điện dung (capacitance) C** đo khả năng tích trữ điện tích trên mỗi đơn vị điện áp:

\`\`\`
Q = C · V
\`\`\`

trong đó:
- **Q** = điện tích tích lũy trên mỗi bản (Coulomb, C)
- **C** = điện dung (Farad, F)
- **V** = điện áp giữa hai bản (Volt, V)

**Đơn vị — Farad (F)**: 1 F = 1 C/V. 1 Farad rất lớn trong thực tế. Tụ thông thường dùng các đơn vị nhỏ hơn:

| Ký hiệu | Tên | Giá trị | Dùng trong |
|---------|-----|---------|-----------|
| µF | microfarad | 10⁻⁶ F | Tụ lọc nguồn, mạch RC thông dụng |
| nF | nanofarad | 10⁻⁹ F | Mạch lọc tần số cao, RF |
| pF | picofarad | 10⁻¹² F | Mạch RF, vi điều khiển, điều chỉnh tần số |

**Vì sao cần khái niệm điện dung C?** Vì các tụ khác nhau (kích thước khác nhau, điện môi khác nhau) tích được lượng điện tích khác nhau ở cùng điện áp. C là thông số đặc trưng cho từng linh kiện, giống như điện trở R đặc trưng cho điện trở.

### 1.3. Bốn ví dụ số Q = C·V

**Ví dụ 1 — Tụ 100 µF nạp đến 5 V:**
\`\`\`
Q = 100×10⁻⁶ × 5 = 500×10⁻⁶ C = 500 µC
\`\`\`
Điện tích tích lũy 500 µC. Nếu tăng gấp đôi điện áp lên 10 V, Q tăng gấp đôi = 1000 µC.

**Ví dụ 2 — Tụ 10 µF nạp đến 12 V:**
\`\`\`
Q = 10×10⁻⁶ × 12 = 120 µC
\`\`\`
Tụ nhỏ hơn 10 lần (10 µF vs 100 µF) nhưng điện áp cao hơn → tích được ít điện tích hơn.

**Ví dụ 3 — Tụ 470 nF nạp đến 3.3 V (vi điều khiển):**
\`\`\`
Q = 470×10⁻⁹ × 3.3 = 1551×10⁻⁹ C ≈ 1.55 µC
\`\`\`

**Ví dụ 4 — Tìm C nếu biết Q = 200 µC ở V = 50 V:**
\`\`\`
C = Q / V = 200×10⁻⁶ / 50 = 4×10⁻⁶ F = 4 µF
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

> *"Tại sao tụ 1 F lại gọi là 'rất lớn' — tôi thấy bán siêu tụ 1 F rất phổ biến?"*

Siêu tụ (supercapacitor / ultracapacitor) là linh kiện chuyên dụng — dùng kỹ thuật đặc biệt để đạt C lớn. Tụ điện thông thường (ceramic, electrolytic, film) trong mạch điện tử hiếm khi vượt qua vài nghìn µF. Một tụ gốm phổ biến chỉ có 100 pF – 100 nF. Tụ điện phân (electrolytic) có thể đến 10,000 µF. 1 F là ~100 lần lớn hơn tụ điện phân cỡ to nhất.

> *"Điện tích Q có giống như dòng điện I không?"*

Không. Q là lượng điện tích tích lũy (coulomb), I là tốc độ dòng chảy (coulomb/giây = ampere). Khi nạp tụ, I chạy vào tụ → Q tích lũy tăng dần. Khi tụ nạp đầy, I → 0 nhưng Q vẫn còn đó.

### 📝 Tóm tắt mục 1

- Tụ điện = 2 bản cực + điện môi cách điện ở giữa.
- Q = C·V: điện tích tỉ lệ thuận với điện dung và điện áp.
- Đơn vị thực tế: µF (10⁻⁶), nF (10⁻⁹), pF (10⁻¹²).
- Analogy: bình chứa nước với màng cao su — C = kích thước bình, Q = lượng nước, V = áp lực.

---

## 2. Năng lượng tích lũy trong tụ

### 2.1. Công thức E = ½·C·V²

**Năng lượng** tích lũy trong điện trường của tụ:

\`\`\`
E = ½ · C · V²
\`\`\`

Đơn vị: Joule (J).

**Vì sao hệ số ½?** Khi nạp tụ từ 0 V đến V, điện áp không ngay lập tức nhảy lên V — nó tăng dần. Điện tích đầu tiên bơm vào gần như không mất công (V ≈ 0), các điện tích sau tốn công nhiều hơn (V đã cao). Công trung bình = ½·Q·V = ½·(C·V)·V = ½·C·V². Giống hệt lý luận thế năng đàn hồi trong lò xo ½·k·x².

**Cũng có thể viết**: dùng Q = C·V để biểu diễn theo Q:
\`\`\`
E = Q² / (2C)   hoặc   E = ½·Q·V
\`\`\`

### 2.2. Ba ví dụ số

**Ví dụ 1 — Tụ điện phân 1000 µF nạp đến 12 V:**
\`\`\`
E = ½ × 1000×10⁻⁶ × 12² = ½ × 10⁻³ × 144 = 0.072 J = 72 mJ
\`\`\`
72 mJ — đủ để sáng đèn LED 70 mA/3V trong khoảng 0.34 giây khi mất nguồn.

**Ví dụ 2 — Tụ 470 µF nạp đến 5 V (trong Arduino):**
\`\`\`
E = ½ × 470×10⁻⁶ × 25 = ½ × 0.01175 = 5.875 mJ
\`\`\`

**Ví dụ 3 — So sánh: cùng C = 100 µF, V tăng từ 5 V lên 10 V:**
- E₁ = ½ × 100×10⁻⁶ × 25 = 1.25 mJ
- E₂ = ½ × 100×10⁻⁶ × 100 = 5 mJ
- V tăng 2× → E tăng 4× (V² trong công thức). Giống KE = ½mv² trong cơ học.

⚠ **Lỗi thường gặp — Nhầm E tụ với E = Q·V**

Nhiều người viết E = Q·V (thiếu hệ số ½). Sai. E = ½·C·V² = ½·Q·V. Hệ số ½ quan trọng vì điện áp tăng dần từ 0, không phải hằng số trong suốt quá trình nạp.

### 📝 Tóm tắt mục 2

- E = ½·C·V² = Q²/(2C) = ½·Q·V.
- V tăng 2× → E tăng 4× (không tuyến tính).
- Hệ số ½ vì điện áp tăng dần trong quá trình nạp, không phải hằng số.

---

## 3. Tụ với DC và tín hiệu thay đổi

### 3.1. Với dòng một chiều DC (ổn định)

Khi nguồn DC ổn định nối vào tụ:
1. Ban đầu, tụ "trống" (V_C = 0), dòng nạp I lớn.
2. Điện tích tích lũy → V_C tăng dần → hiệu điện thế giữa nguồn và tụ giảm dần → I giảm dần.
3. Khi V_C = V_nguồn: không còn hiệu điện thế → **I = 0**. Tụ hành xử như **hở mạch (open circuit)** với DC ổn định.

💡 **Hình dung**: Bình chứa nước được bơm đầy → áp lực bình bằng áp lực bơm → nước ngừng chảy. Bình "cản" nước chảy tiếp.

**Kết luận**: Tụ điện đã nạp đầy sẽ **ngắt dòng DC** — hành xử như dây đứt với nguồn DC ổn định.

### 3.2. Với tín hiệu thay đổi (AC hoặc xung)

Khi điện áp nguồn thay đổi liên tục (tín hiệu AC, xung vuông, tín hiệu dao động), tụ phải liên tục nạp-xả để theo kịp sự thay đổi đó. Quá trình nạp-xả liên tục = **có dòng điện chảy** qua mạch.

Tần số thay đổi càng cao → tụ nạp-xả nhanh hơn → dòng hiệu dụng lớn hơn → tụ "dẫn điện tốt hơn".

**Kết luận định tính**: "Tụ cản DC, cho AC qua" — tụ điện hành xử như một linh kiện có **trở kháng phụ thuộc tần số**. Ở DC (f = 0 Hz): trở kháng vô cực (hở mạch). Ở tần số cao: trở kháng nhỏ (gần như nối tắt). Công thức định lượng: X_C = 1/(2πfC) — sẽ học chi tiết ở [Lesson 06 — AC & Trở kháng](../lesson-06-ac-impedance-rlc/).

❓ **Câu hỏi tự nhiên của người đọc**

> *"Nếu tụ cản DC, tại sao người ta lại dùng tụ trong mạch nguồn DC?"*

Đây là ứng dụng quan trọng. Nguồn DC thực tế không hoàn toàn "phẳng" — nó có dao động nhỏ (ripple) do nhiễu, do thiết bị tiêu thụ dòng đột biến. Tụ trong mạch nguồn DC hấp thụ những biến động nhanh đó (nạp-xả nhanh với thành phần tần số cao của ripple) → điện áp đầu ra phẳng hơn. Với thành phần DC ổn định (f = 0), tụ không can thiệp (đã nạp đầy, I = 0).

> *"Bao giờ dòng qua tụ = 0 hoàn toàn trong mạch DC?"*

Chỉ khi tụ đã nạp đầy VÀ không có gì làm thay đổi điện áp nguồn hay tải. Trong thực tế, luôn có nhiễu nhỏ nên luôn có dòng rất nhỏ qua tụ. "I = 0" là trạng thái lý tưởng ở trạng thái xác lập (steady state).

### 📝 Tóm tắt mục 3

- Tụ nạp đầy với DC → I = 0, tụ = hở mạch với DC ổn định.
- Tín hiệu thay đổi → tụ nạp-xả liên tục → có dòng chảy.
- "Tụ cản DC, cho AC qua" — định tính. Công thức X_C = 1/(2πfC) ở Lesson 06.

---

## 4. Mạch RC nạp — V_C(t) = V_s·(1 − e^(−t/τ))

### 4.1. Mạch và phương trình

Mạch RC nạp đơn giản: nguồn DC V_s, điện trở R, tụ C nối nối tiếp. Ban đầu tụ trống (V_C = 0). Tại t = 0, đóng công tắc.

Áp dụng KVL: V_s = V_R + V_C = I·R + V_C.

Dòng qua tụ: I = C·(dV_C/dt). Thay vào:

\`\`\`
V_s = R·C·(dV_C/dt) + V_C
\`\`\`

Đây là phương trình vi phân tuyến tính cấp 1. Nghiệm với điều kiện đầu V_C(0) = 0:

\`\`\`
V_C(t) = V_s · (1 − e^(−t/τ))
\`\`\`

trong đó **τ = R·C** là **hằng số thời gian (time constant)**.

### 4.2. Hằng số thời gian τ — ý nghĩa vật lý

**τ (tau) = R·C** là thông số quyết định tốc độ nạp tụ.

**Ý nghĩa của τ**: tại t = τ, tụ đã nạp được:
\`\`\`
V_C(τ) = V_s·(1 − e⁻¹) = V_s·(1 − 0.368) = V_s·0.632 ≈ 63.2% V_s
\`\`\`

Nói đơn giản: **sau 1 khoảng τ, tụ nạp được ~63% điện áp nguồn**.

💡 **Tại sao không nạp 100% sau 1τ?** Vì dòng nạp giảm dần khi tụ đầy hơn. Ban đầu dòng lớn → nạp nhanh. Càng gần đầy → dòng càng nhỏ → nạp chậm lại. Đây là đặc tính của hàm mũ: tiệm cận đến V_s nhưng không bao giờ chạm 100% về lý thuyết.

**Đơn vị τ**: τ = R·C → Ω × F = (V/A) × (C/V) = C/A = s. τ có đơn vị **giây (s)**.

### 4.3. Bảng giá trị chuẩn

| Thời gian | V_C | % nạp | Ghi chú |
|-----------|-----|-------|---------|
| t = τ | V_s · 0.632 | 63.2% | Mốc định nghĩa τ |
| t = 2τ | V_s · 0.865 | 86.5% | |
| t = 3τ | V_s · 0.950 | 95.0% | Thường coi "gần đầy" |
| t = 4τ | V_s · 0.982 | 98.2% | |
| t = 5τ | V_s · 0.993 | 99.3% | Thực tế coi là "đã nạp xong" |

**Quy tắc kỹ thuật**: trong thực tế, tụ coi là nạp xong sau **5τ**. Đây là con số chuẩn dùng khi thiết kế mạch định thời.

### 4.4. Walk-through số thật: R = 10 kΩ, C = 100 µF, V_s = 9 V

**Bước 1 — Tính τ:**
\`\`\`
τ = R·C = 10,000 Ω × 100×10⁻⁶ F = 1 s
\`\`\`

**Bước 2 — Điền bảng giá trị:**

| t | V_C(t) = 9·(1 − e^(−t/1)) |
|---|--------------------------|
| t = 0 | 9·(1 − 1) = 0 V |
| t = 1 s (= τ) | 9·(1 − e⁻¹) = 9·0.632 = **5.69 V** |
| t = 2 s (= 2τ) | 9·(1 − e⁻²) = 9·0.865 = **7.78 V** |
| t = 3 s (= 3τ) | 9·(1 − e⁻³) = 9·0.950 = **8.55 V** |
| t = 5 s (= 5τ) | 9·(1 − e⁻⁵) = 9·0.993 = **8.94 V** |

**Bước 3 — Dòng nạp tại t = 0:**
\`\`\`
I_max = V_s / R = 9 / 10,000 = 0.9 mA
\`\`\`
(Lúc đầu tụ như nối tắt → toàn bộ điện áp rơi trên R → I = V_s/R.)

**Bước 4 — Dòng nạp tại t = τ = 1 s:**
\`\`\`
V_R(τ) = V_s - V_C(τ) = 9 - 5.69 = 3.31 V
I(τ) = V_R / R = 3.31 / 10,000 = 0.33 mA ≈ 1/e × I_max ✓
\`\`\`

⚠ **Lỗi thường gặp — Dùng τ như "thời gian nạp đầy"**

τ = 1 s KHÔNG có nghĩa "tụ nạp đầy sau 1 giây". Sau 1 s tụ mới nạp được 63%. Phải sau 5τ = 5 s mới coi là đầy (~99%). Sai số khi thiết kế timer: nếu dùng 1τ thay vì 5τ làm mốc "đầy" → kết quả sai 37%.

🔁 **Dừng lại tự kiểm tra**

Cho R = 4.7 kΩ, C = 220 µF, V_s = 5 V. Tính: (a) τ, (b) V_C sau 1τ, (c) thời gian để coi là nạp xong.

<details>
<summary>Xem đáp án</summary>

(a) τ = 4700 × 220×10⁻⁶ = 1.034 s ≈ 1.03 s

(b) V_C(1τ) = 5 × 0.632 = 3.16 V

(c) Nạp xong sau 5τ ≈ 5 × 1.03 = 5.15 s

</details>

### 📝 Tóm tắt mục 4

- Công thức nạp: V_C(t) = V_s·(1 − e^(−t/τ)) với τ = R·C.
- Sau 1τ: ≈ 63% | 2τ: ≈ 86% | 3τ: ≈ 95% | 5τ: ≈ 99% (coi là đầy).
- τ đơn vị giây, bằng R(Ω) × C(F).
- Dòng nạp ban đầu I_max = V_s/R, giảm dần theo mũ.

---

## 5. Mạch RC xả — V_C(t) = V₀·e^(−t/τ)

### 5.1. Phương trình xả

Khi tụ đã nạp đến V₀ rồi **ngắt nguồn**, nối tụ qua điện trở R để xả, tụ sẽ phóng điện qua R:

\`\`\`
V_C(t) = V₀ · e^(−t/τ)    với τ = R·C (giống hệt khi nạp)
\`\`\`

Quá trình xả là đối xứng với nạp về cấu trúc toán học — chỉ khác chiều (giảm thay vì tăng).

**Bảng giá trị xả:**

| Thời gian | V_C | % còn lại |
|-----------|-----|-----------|
| t = 0 | V₀ | 100% |
| t = τ | V₀ · 0.368 | 36.8% |
| t = 2τ | V₀ · 0.135 | 13.5% |
| t = 3τ | V₀ · 0.050 | 5.0% |
| t = 5τ | V₀ · 0.007 | 0.7% ≈ 0 |

**Cùng quy tắc 5τ**: sau 5τ tụ xả gần hết (còn < 1%).

### 5.2. Walk-through xả: V₀ = 9 V, R = 10 kΩ, C = 100 µF

τ = 1 s (giống ví dụ nạp).

| t | V_C(t) = 9·e^(−t) |
|---|-------------------|
| t = 0 | 9 V |
| t = 1 s | 9 × 0.368 = **3.31 V** |
| t = 2 s | 9 × 0.135 = **1.22 V** |
| t = 3 s | 9 × 0.050 = **0.45 V** |
| t = 5 s | 9 × 0.007 = **0.06 V** |

**Dòng xả ban đầu** (lúc tụ còn đầy V₀):
\`\`\`
I_max = V₀ / R = 9 / 10,000 = 0.9 mA (chiều ngược lại với khi nạp)
\`\`\`

### 5.3. Tính thời gian bằng logarithm tự nhiên

Khi cần tìm thời gian t để đạt V_C mong muốn, dùng ln:

**Khi nạp** (đạt V_target):
\`\`\`
V_target = V_s·(1 − e^(−t/τ))
e^(−t/τ) = 1 − V_target/V_s
−t/τ = ln(1 − V_target/V_s)
t = −τ · ln(1 − V_target/V_s)
\`\`\`

**Khi xả** (giảm từ V₀ xuống V_target):
\`\`\`
V_target = V₀·e^(−t/τ)
t = −τ · ln(V_target/V₀) = τ · ln(V₀/V_target)
\`\`\`

**Ví dụ**: R = 10 kΩ, C = 100 µF, nạp từ 9 V. Tìm t để V_C = 7 V.
\`\`\`
t = −1 · ln(1 − 7/9) = −ln(2/9) = −ln(0.222) = −(−1.504) = 1.504 s ≈ 1.5τ
\`\`\`

⚠ **Lỗi thường gặp — Dùng tỉ lệ tuyến tính cho mạch RC**

Sai khi nói "tụ nạp 50% điện áp thì mất nửa thời gian so với nạp 100%". Tụ nạp 50% mất thời gian t = −τ·ln(0.5) ≈ 0.693τ (không phải 0.5 × 5τ). Đường cong là hàm mũ, không tuyến tính.

🔁 **Dừng lại tự kiểm tra**

Tụ 47 µF xả qua R = 22 kΩ từ V₀ = 12 V. Sau bao lâu thì còn 3 V?

<details>
<summary>Xem đáp án</summary>

τ = 22,000 × 47×10⁻⁶ = 1.034 s

t = τ · ln(12/3) = 1.034 × ln(4) = 1.034 × 1.386 = **1.433 s ≈ 1.39τ**

</details>

### 📝 Tóm tắt mục 5

- Xả: V_C(t) = V₀·e^(−t/τ), cùng τ = R·C với nạp.
- Sau 1τ: còn ≈ 37% | 5τ: còn < 1%.
- Tìm t khi nạp: t = −τ·ln(1 − V_target/V_s).
- Tìm t khi xả: t = τ·ln(V₀/V_target).

---

## 6. Ứng dụng thực tế

### 6.1. Lọc nguồn (Bypass / Decoupling Capacitor)

Trong mạch nguồn DC, tụ điện phân lớn (100 µF – 10,000 µF) đặt song song với tải để:
- Hấp thụ biến động điện áp ngắn hạn khi tải đột ngột rút dòng lớn.
- Giảm ripple (dao động AC) ở đầu ra bộ chỉnh lưu.

Tụ gốm nhỏ (100 nF – 1 µF) đặt ngay chân VCC–GND của mỗi IC để lọc nhiễu tần số cao (100 MHz trở lên) mà tụ lớn không kịp phản ứng (τ = R·C nhỏ → nạp-xả rất nhanh).

### 6.2. Mạch định thời (RC Timer)

Mạch RC là cơ sở của IC 555 timer — mạch tạo xung, mạch định thời delay, PWM đơn giản. Nguyên lý: nạp tụ qua R, dùng ngưỡng điện áp (thường 2/3 V_cc) làm điểm trigger. Thời gian đạt ngưỡng 2/3 V_cc:

\`\`\`
t = −τ · ln(1 − 2/3) = −τ · ln(1/3) = τ · ln(3) ≈ 1.099τ
\`\`\`

Công thức này giải thích tại sao datasheet IC 555 có hệ số 1.1 trong công thức tính thời gian.

### 6.3. Debounce nút nhấn

Nút cơ khí (mechanical button) khi nhấn thường "rung" (bounce) trong 5–20 ms — tiếp điểm đóng mở nhiều lần nhanh, vi điều khiển đọc nhiều lần nhấn thay vì một. Mạch RC (R ~10 kΩ, C ~100 nF → τ ≈ 1 ms) lọc các nhiễu ngắn này, vi điều khiển chỉ thấy tín hiệu "sạch" sau vài τ.

Trong thực tế, debounce thường làm bằng phần mềm (đọc trạng thái sau 20 ms) nhưng RC hardware debounce vẫn hữu ích khi cần phản ứng nhanh.

### 6.4. Chống nhiễu (EMI Filtering)

Tụ gốm 100 pF – 1 nF đặt song song với cuộn dây relay, motor để hấp thụ xung điện áp ngược khi ngắt dòng qua cuộn dây (hiện tượng back-EMF). Bảo vệ vi điều khiển và transistor khỏi điện áp spike nguy hiểm.

### 📝 Tóm tắt mục 6

- Bypass/decoupling: tụ song song với nguồn, lọc ripple và nhiễu.
- RC timer: cơ sở IC 555, mạch delay.
- Debounce: RC lọc tín hiệu rung cơ khí.
- Snubber: tụ bảo vệ khỏi back-EMF của motor/relay.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tụ điện dung C = 220 µF được nạp đến V = 15 V. Tính:
(a) điện tích tích lũy Q,
(b) năng lượng tích lũy E.

**Bài 2**: Mạch RC có R = 33 kΩ, C = 47 µF. Tính hằng số thời gian τ. Sau bao lâu thì tụ coi là đã nạp xong (≥ 99%)?

**Bài 3**: Mạch RC nạp: R = 10 kΩ, C = 100 µF, V_s = 12 V. Tính V_C tại t = 0.5 s, t = 1 s, t = 2 s, t = 5 s.

**Bài 4**: Tụ 100 µF đã nạp đến V₀ = 9 V. Xả qua R = 5 kΩ. Sau bao lâu V_C giảm xuống còn 1 V?

**Bài 5**: Mạch RC nạp từ 5 V qua R = 47 kΩ, C = 10 µF. Tìm thời gian t để V_C đạt 4 V.

**Bài 6 (khó hơn)**: Một mạch debounce dùng R = 10 kΩ, C = 100 nF. Nút nhấn gây bounce trong 15 ms. Tụ có đủ thời gian đạt ≥ 95% (3τ) trước khi bounce kết thúc không? Đánh giá hiệu quả mạch.

### Lời giải chi tiết

**Bài 1:**

**(a) Điện tích Q:**
\`\`\`
Q = C·V = 220×10⁻⁶ F × 15 V = 3300×10⁻⁶ C = 3300 µC = 3.3 mC
\`\`\`

**(b) Năng lượng E:**
\`\`\`
E = ½·C·V² = ½ × 220×10⁻⁶ × 15² = ½ × 220×10⁻⁶ × 225
  = ½ × 0.0495 = 0.02475 J ≈ 24.75 mJ
\`\`\`
Hoặc kiểm tra: E = ½·Q·V = ½ × 3300×10⁻⁶ × 15 = ½ × 0.0495 = 0.02475 J ✓

---

**Bài 2:**

**Bước 1 — Tính τ:**
\`\`\`
τ = R·C = 33,000 × 47×10⁻⁶ = 1.551 s ≈ 1.55 s
\`\`\`

**Bước 2 — Thời gian nạp xong (5τ):**
\`\`\`
t_nạp_xong = 5τ = 5 × 1.55 = 7.75 s
\`\`\`

Sau ~7.75 s, V_C ≈ 99.3% V_s → coi là nạp xong trong thiết kế thực tế.

---

**Bài 3:**

τ = 10,000 × 100×10⁻⁶ = 1 s.

Công thức: V_C(t) = 12·(1 − e^(−t/1)) = 12·(1 − e^(−t))

| t | e^(−t) | 1 − e^(−t) | V_C |
|---|--------|------------|-----|
| 0.5 s | e^(−0.5) = 0.6065 | 0.3935 | 12 × 0.3935 = **4.72 V** |
| 1 s | e^(−1) = 0.3679 | 0.6321 | 12 × 0.6321 = **7.59 V** |
| 2 s | e^(−2) = 0.1353 | 0.8647 | 12 × 0.8647 = **10.38 V** |
| 5 s | e^(−5) = 0.0067 | 0.9933 | 12 × 0.9933 = **11.92 V** |

Nhận xét: tại t = 5τ = 5 s, V_C = 11.92 V ≈ 99.3% × 12 V ✓

---

**Bài 4:**

τ = R·C = 5,000 × 100×10⁻⁶ = 0.5 s.

Tìm t để V_C = 1 V khi xả từ V₀ = 9 V:
\`\`\`
V_C = V₀·e^(−t/τ)
1 = 9·e^(−t/0.5)
e^(−t/0.5) = 1/9
−t/0.5 = ln(1/9) = −ln(9)
t = 0.5 × ln(9) = 0.5 × 2.197 = 1.099 s ≈ 1.1 s
\`\`\`

Kiểm tra: V_C(1.1) = 9·e^(−1.1/0.5) = 9·e^(−2.2) = 9 × 0.111 = 1.0 V ✓

Vậy sau khoảng **1.1 s** (≈ 2.2τ), V_C giảm xuống còn 1 V.

---

**Bài 5:**

τ = R·C = 47,000 × 10×10⁻⁶ = 0.47 s.

Tìm t để V_C = 4 V khi nạp từ V_s = 5 V:
\`\`\`
4 = 5·(1 − e^(−t/0.47))
4/5 = 1 − e^(−t/0.47)
e^(−t/0.47) = 1 − 0.8 = 0.2
−t/0.47 = ln(0.2) = −1.609
t = 0.47 × 1.609 = 0.756 s ≈ 0.76 s
\`\`\`

Kiểm tra: V_C(0.76) = 5·(1 − e^(−0.76/0.47)) = 5·(1 − e^(−1.617)) = 5·(1 − 0.199) = 5 × 0.801 = **4.00 V** ✓

---

**Bài 6:**

**Bước 1 — Tính τ:**
\`\`\`
τ = 10,000 × 100×10⁻⁹ = 1×10⁻³ s = 1 ms
\`\`\`

**Bước 2 — Thời gian đạt 3τ (95%):**
\`\`\`
3τ = 3 ms
\`\`\`

**Bước 3 — So sánh với thời gian bounce:**
- Bounce kéo dài 15 ms. Tụ đạt 95% sau 3 ms. 3 ms < 15 ms.
- Nghĩa là trong 15 ms bounce, tụ **đã đạt 95% rồi** → vẫn bị ảnh hưởng bởi các bounce sau lần đầu tiên (vì sau mỗi lần bounce, tụ lại nạp/xả trong 3 ms).

**Đánh giá**: Mạch này KHÔNG đủ hiệu quả debounce vì τ = 1 ms quá nhỏ so với thời gian bounce 15 ms. Để debounce hiệu quả, cần τ ≥ thời gian bounce, tức là τ ≥ 15 ms. Ví dụ: R = 10 kΩ, C = 2.2 µF → τ = 22 ms ≥ 15 ms ✓. Hoặc R = 22 kΩ, C = 1 µF → τ = 22 ms ✓.

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề đã học**:
  - [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/) — điện trở là R trong mạch RC này.
  - [Lesson 01 — Điện áp & Dòng điện](../lesson-01-voltage-current-resistance/) — đơn vị cơ bản.
- **Bài tiếp theo**: [Lesson 05 — Cuộn cảm & Mạch RL](../lesson-05-inductor-rl/) — linh kiện "anh em" của tụ: cũng có hằng số thời gian τ = L/R, cũng vẽ đường cong mũ, nhưng cản AC thay vì cản DC.
- **Mở rộng sau**: [Lesson 06 — AC & Trở kháng RLC](../lesson-06-ac-impedance-rlc/) — công thức X_C = 1/(2πfC) định lượng hóa "tụ cho AC qua".

---

## 📝 Tổng kết Lesson 04

1. **Q = C·V**: điện tích tỉ lệ thuận C và V. Đơn vị: µF, nF, pF trong thực tế.
2. **E = ½·C·V²**: năng lượng tụ. V tăng 2× → E tăng 4× (vì V²).
3. **Tụ với DC**: nạp đầy → I = 0 (hở mạch). Với tín hiệu thay đổi: nạp-xả liên tục, có dòng.
4. **Nạp**: V_C(t) = V_s·(1 − e^(−t/τ)), τ = R·C. Sau 5τ ≈ 99% → coi là đầy.
5. **Xả**: V_C(t) = V₀·e^(−t/τ), cùng τ. Sau 5τ ≈ 1% → coi là hết.
6. **Mốc chuẩn**: 1τ = 63%, 3τ = 95%, 5τ = 99% (nạp) | 1τ = 37%, 5τ = 1% (xả).
7. **Ứng dụng**: lọc nguồn, IC 555 timer, debounce nút nhấn, chống back-EMF.

**Visualization**: [visualization.html](./visualization.html)
`;
