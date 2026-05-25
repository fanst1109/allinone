// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-02-ideal-gas/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 (T2) — Khí lý tưởng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình khí lý tưởng** — và 4 giả định của nó.
- Biết **phương trình trạng thái** PV = nRT — liên hệ 3 đại lượng vĩ mô (P, V, T) với số mol n.
- Áp dụng được cho 3 quá trình đặc biệt:
  - **Đẳng nhiệt** (T const): Boyle's law PV = const.
  - **Đẳng áp** (P const): Charles's law V/T = const.
  - **Đẳng tích** (V const): Gay-Lussac's law P/T = const.
- Hiểu **động học chất khí**: T tỉ lệ với năng lượng động trung bình KE = (3/2)k_B·T.
- Tính công khí thực hiện khi giãn nở.

## Kiến thức tiền đề

- [Lesson 01 (T2) — Nhiệt độ & nhiệt lượng](../lesson-01-temperature-heat/) — biết T và Q.
- Khái niệm mol từ Chemistry — [Lesson 06 (T1) Chemistry](../../../Chemistry/01-Structure/lesson-06-mole-stoichiometry/).

---

## 1. Mô hình khí lý tưởng

### 1.1. 4 giả định

**Khí lý tưởng** = mô hình đơn giản hóa của chất khí, dựa trên 4 giả định:

1. **Các phân tử khí là điểm chất** — kích thước không đáng kể so với khoảng cách giữa chúng.
2. **Không tương tác** giữa các phân tử (trừ va chạm).
3. **Va chạm đàn hồi hoàn toàn** — không mất năng lượng.
4. **Phân tử chuyển động ngẫu nhiên** — đẳng hướng mọi hướng.

💡 **Vì sao mô hình này hữu dụng?** Hầu hết khí thực ở áp suất thấp và nhiệt độ phòng đều **rất gần** khí lý tưởng. Mô hình này tính toán được, đơn giản, và cho kết quả chính xác cao trong nhiều ứng dụng (động cơ ô tô, bóng bay, khí quyển). Chỉ ở áp suất cao, nhiệt độ thấp (gần điểm hóa lỏng) thì sai số mới đáng kể.

### 📝 Tóm tắt mục 1

- Khí lý tưởng: phân tử = điểm, không tương tác, va chạm đàn hồi.
- Áp dụng tốt cho khí ở P thường, T thường.

---

## 2. Phương trình trạng thái — PV = nRT

### 2.1. Phương trình

\`\`\`
P · V = n · R · T
\`\`\`

trong đó:
- **P** = áp suất (Pascal, Pa = N/m²).
- **V** = thể tích (m³).
- **n** = số mol khí.
- **R** = hằng số khí lý tưởng = **8.314 J/(mol·K)**.
- **T** = nhiệt độ (Kelvin).

💡 **Ý nghĩa**: phương trình này liên kết 4 đại lượng vĩ mô của khí. Cho 3 trong 4 → tính được cái thứ 4. Vì sao gọn đẹp như vậy?

**Nguồn gốc**: Thí nghiệm thế kỷ 17-18 cho thấy:
- Boyle (1662): ở T const, P·V = const.
- Charles (1787): ở P const, V/T = const.
- Avogadro (1811): ở P, T giống nhau, các khí có cùng V chứa cùng số phân tử.

Gộp lại → P·V/T = const = n·R cho mọi khí lý tưởng. Đó là PV = nRT.

### 2.2. Đơn vị quan trọng

- 1 atm = **101,325 Pa** ≈ 10⁵ Pa.
- 1 L = 10⁻³ m³.
- 0°C = 273.15 K.
- 1 mol khí lý tưởng ở STP (0°C, 1 atm): V = nRT/P = (1)·8.314·273.15/101325 ≈ **0.0224 m³ = 22.4 L**. Đây là "thể tích mol khí" nổi tiếng.

### 2.3. Bốn ví dụ số

**Ví dụ 1 — Bóng bay**: 0.05 mol khí He ở 25°C, áp suất 1 atm. Tính V.
- V = nRT/P = 0.05 × 8.314 × 298 / 101325 ≈ **1.22 × 10⁻³ m³ = 1.22 L**.

**Ví dụ 2 — Bình khí oxy**: V = 5 L, P = 200 atm, T = 25°C. Tính n.
- n = PV/RT = 200·101325·0.005 / (8.314·298) ≈ 40.9 mol.
- m(O₂) = 40.9 × 32 = **1310 g** = 1.31 kg.

**Ví dụ 3 — Khí trong động cơ ô tô**: V = 500 cm³ = 5×10⁻⁴ m³, T = 500°C = 773 K, n = 0.02 mol. Tính P.
- P = nRT/V = 0.02·8.314·773/(5×10⁻⁴) ≈ **257,180 Pa = 2.54 atm**.

**Ví dụ 4 — Khí quyển**: ở mặt biển, P ≈ 1 atm. Lên Everest (8848 m), P ≈ 0.33 atm. Nếu T không đổi (đơn giản hóa), thì mật độ phân tử ở Everest = 1/3 mặt biển → khó thở.

### 📝 Tóm tắt mục 2

- PV = nRT (Pa, m³, mol, K).
- R = 8.314 J/(mol·K).
- 1 mol khí ở STP = 22.4 L.

---

## 3. Ba quá trình đặc biệt

### 3.1. Đẳng nhiệt (T const) — Boyle's Law

T không đổi → PV = const → **P₁V₁ = P₂V₂**.

💡 **Ý nghĩa**: nén khí (V giảm) → P tăng tỉ lệ nghịch. Vd nén bóng → cứng hơn.

**Ví dụ**: Bóng bay V = 1 L ở 1 atm. Nén xuống còn V = 0.25 L cùng T. Áp suất mới?
- P_new = (1·1)/0.25 = **4 atm**.

### 3.2. Đẳng áp (P const) — Charles's Law

P không đổi → V/T = const → **V₁/T₁ = V₂/T₂**.

💡 **Ý nghĩa**: nóng → khí giãn nở. Vd nướng bánh nở phồng do CO₂ giãn nở khi nướng.

**Ví dụ**: Bóng bay 2 L ở 20°C (293 K). Bỏ vào tủ lạnh −10°C (263 K). V mới?
- V_new = 2 × (263/293) = **1.80 L** (co lại 10%).

### 3.3. Đẳng tích (V const) — Gay-Lussac's Law

V không đổi → P/T = const → **P₁/T₁ = P₂/T₂**.

💡 **Ý nghĩa**: nóng → P tăng (vì phân tử đập tường mạnh hơn). Vd bình khí ngoài nắng → P tăng → có thể nổ.

**Ví dụ**: Bình khí ở 25°C (298 K), P = 1 atm. Đốt lên 400°C (673 K) ở V const. P mới?
- P_new = 1 × (673/298) = **2.26 atm**.

### 📝 Tóm tắt mục 3

| Quá trình | Const | Định luật | Hệ quả |
|-----------|-------|-----------|---------|
| Đẳng nhiệt | T | P·V = const (Boyle) | Nén → P tăng |
| Đẳng áp | P | V/T = const (Charles) | Nóng → giãn nở |
| Đẳng tích | V | P/T = const (Gay-Lussac) | Nóng → P tăng (nguy hiểm) |

---

## 4. Động học chất khí — Liên hệ T với KE phân tử

### 4.1. Công thức nền tảng

Phân tích khí lý tưởng bằng cơ học cho thấy **năng lượng động trung bình của 1 phân tử** chỉ phụ thuộc T:

\`\`\`
KE_trung_bình = (3/2) · k_B · T
\`\`\`

trong đó **k_B** = hằng số Boltzmann = **1.38 × 10⁻²³ J/K**.

(R = N_A · k_B, với N_A = số Avogadro.)

💡 **Ý nghĩa**: T thực ra **là** số đo năng lượng động trung bình của phân tử. T cao → phân tử nhanh.

### 4.2. Vận tốc trung bình của phân tử

Từ KE = (1/2)·m·v² = (3/2)·k_B·T → v_rms = √(3k_B·T/m).

**Ví dụ**: Phân tử N₂ ở 300 K. m(N₂) = 4.65 × 10⁻²⁶ kg.
- v_rms = √(3·1.38×10⁻²³·300/4.65×10⁻²⁶) = √(2.67×10⁵) ≈ **517 m/s**.
- → Phân tử nitrogen trong phòng bạn đang lao với vận tốc ~ 500 m/s = 1800 km/h!

### 4.3. Nội năng của khí lý tưởng đơn nguyên

\`\`\`
U = (3/2) · n · R · T
\`\`\`

(Hệ số (3/2) cho khí 1 nguyên tử như He, Ar. Khí 2 nguyên tử như O₂, N₂ có hệ số (5/2) vì còn dao động.)

### 📝 Tóm tắt mục 4

- T (Kelvin) ∝ KE trung bình của phân tử.
- v_rms = √(3k_B·T/m). Phân tử khí có v rất nhanh (vài trăm m/s).
- U = (3/2)nRT cho khí đơn nguyên.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: 2 mol O₂ ở 25°C, V = 50 L. Tính P.

**Bài 2**: Bình khí 10 L có 0.5 mol khí ở 27°C. Đốt nóng lên 127°C ở V const. P thay đổi thế nào?

**Bài 3**: Bóng bay V = 5 L ở 27°C (1 atm) được đem lên độ cao nơi P giảm xuống 0.6 atm. Giả sử T không đổi. V mới?

**Bài 4**: Tính vận tốc trung bình (v_rms) phân tử He (m = 6.64×10⁻²⁷ kg) ở 300 K.

**Bài 5**: 2 mol khí lý tưởng đơn nguyên ở 200 K. Tính nội năng U.

**Bài 6**: Vì sao bình khí ga để ngoài nắng có nguy cơ nổ?

### Lời giải

**Bài 1**: P = nRT/V = 2·8.314·298/(0.05) ≈ **99,100 Pa ≈ 0.98 atm**.

**Bài 2**: P/T const: P_new/T_new = P_old/T_old → P_new = P_old·(T_new/T_old) = P_old·(400/300) = **1.33·P_old**. Tăng 33%.

**Bài 3**: PV const: V_new = V_old·(P_old/P_new) = 5·(1/0.6) = **8.33 L**. Tăng ~ 67%.

**Bài 4**: v_rms = √(3·1.38×10⁻²³·300/6.64×10⁻²⁷) = √(1.87×10⁶) ≈ **1366 m/s**. He nhẹ hơn N₂ → nhanh hơn ~2.6 lần. Đó là tại sao He bay khỏi khí quyển Trái Đất dễ.

**Bài 5**: U = (3/2)·2·8.314·200 = **4,988 J ≈ 5 kJ**.

**Bài 6**: Bình ga có V cố định (kín). Để ngoài nắng → T tăng. Theo P/T = const, P tăng theo. Nếu T tăng đủ nhiều, P vượt khả năng chịu của vỏ bình → vỏ vỡ → khí ga phụt ra + có thể bốc cháy → nổ. Lý do tại sao bình ga phải để chỗ mát.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Entropy & định luật II](../lesson-03-entropy-2nd-law/).

---

## 📝 Tổng kết Lesson 02 (T2)

1. **Khí lý tưởng**: 4 giả định (điểm chất, không tương tác, va đàn hồi, ngẫu nhiên).
2. **PV = nRT** (R = 8.314 J/(mol·K)). 1 mol ở STP = 22.4 L.
3. **3 quá trình đặc biệt**: Boyle (T const → PV const), Charles (P const → V/T const), Gay-Lussac (V const → P/T const).
4. **Liên hệ vi mô**: KE_phân_tử = (3/2)k_B·T. v_rms = √(3k_B·T/m).
5. **Nội năng** khí đơn nguyên: U = (3/2)nRT.

**Tiếp theo**: [Lesson 03 — Entropy &amp; định luật II](../lesson-03-entropy-2nd-law/)
`;
