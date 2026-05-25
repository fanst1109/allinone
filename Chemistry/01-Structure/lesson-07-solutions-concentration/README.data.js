// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/01-Structure/lesson-07-solutions-concentration/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Dung dịch & Nồng độ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **dung dịch (solution)** = **chất tan (solute)** + **dung môi (solvent)**, và 3 trạng thái dung dịch (rắn / lỏng / khí).
- Biết **độ tan (solubility)** và yếu tố ảnh hưởng: bản chất chất tan/dung môi, nhiệt độ, áp suất.
- Sử dụng thành thạo 4 loại **nồng độ**: **mol (M)**, **molanity (m)**, **phần trăm khối lượng (% w/w)**, **ppm/ppb**.
- Tính **pha loãng** bằng công thức \`M₁V₁ = M₂V₂\`.
- Liên hệ giữa các loại nồng độ — chuyển đổi qua lại.
- Áp dụng vào tình huống thực tế: pha thuốc, dung dịch chuẩn độ, nước biển.

## Kiến thức tiền đề

- [Lesson 06 — Mol & Phản ứng](../lesson-06-mole-stoichiometry/) — khái niệm mol và khối lượng mol.

---

## 1. Dung dịch là gì?

### 💡 Trực giác / Hình dung

**Dung dịch** = hỗn hợp đồng nhất (homogeneous) gồm:
- **Chất tan (solute)**: thường ít hơn, "biến mất" vào dung môi.
- **Dung môi (solvent)**: thường nhiều hơn, có trạng thái cuối cùng giống dung dịch.

Ví dụ thường gặp:
- **Nước muối**: muối (chất tan) hòa trong nước (dung môi) → dung dịch lỏng.
- **Không khí**: O₂ (chất tan ~ 21%) hòa trong N₂ (dung môi ~ 78%) → dung dịch khí.
- **Hợp kim đồng-thiếc** (đồng thau): Sn hòa trong Cu → dung dịch rắn.

### 1.1. 3 trạng thái dung dịch

| Dung môi | Chất tan | Ví dụ |
|----------|----------|-------|
| Lỏng | Rắn | NaCl trong nước |
| Lỏng | Lỏng | Etanol trong nước (rượu) |
| Lỏng | Khí | CO₂ trong nước (nước có gas) |
| Rắn | Rắn | Hợp kim |
| Khí | Khí | Không khí |

Trong hóa học phổ thông, ta chủ yếu làm với dung dịch lỏng.

### 1.2. Quá trình hòa tan

Khi NaCl vào nước:
1. Phân tử nước (có cực, có cả δ⁺ ở H và δ⁻ ở O) tiếp cận mạng tinh thể NaCl.
2. δ⁻ của O hút Na⁺; δ⁺ của H hút Cl⁻.
3. Lực hút này thắng lực hút ion-ion trong tinh thể → ion tách rời.
4. Mỗi ion được **bao quanh bởi vài phân tử nước** (hydrate hóa).

→ Kết quả: Na⁺(aq) + Cl⁻(aq), với \`(aq)\` = aqueous (trong nước).

### 1.3. Quy tắc "tương đồng tan tương đồng" (Like dissolves like)

- **Dung môi phân cực** (H₂O, ethanol, ammonia) hòa tan tốt **chất phân cực** (muối ion, đường, ammonia).
- **Dung môi không cực** (hexane, benzen, dầu) hòa tan tốt **chất không cực** (mỡ, cao su, dầu).

→ Nước và dầu KHÔNG tan vào nhau vì nước rất cực còn dầu không cực.

### 📝 Tóm tắt mục 1

- Dung dịch = chất tan + dung môi, đồng nhất.
- Hòa tan: dung môi tách & bao quanh các phân tử/ion chất tan.
- "Like dissolves like" — cùng tính phân cực thì tan tốt.

---

## 2. Độ tan (Solubility)

### 2.1. Định nghĩa

**Độ tan** = lượng chất tan tối đa hòa được trong một lượng dung môi cụ thể ở nhiệt độ xác định, đến khi dung dịch trở thành **bão hòa** (saturated).

Đơn vị thường dùng: **g chất tan / 100 g nước** ở \`t°C\`.

### 2.2. Yếu tố ảnh hưởng

#### Nhiệt độ
- **Chất rắn trong nước**: thường tăng độ tan khi T tăng (vd KNO₃, NaNO₃). Có ngoại lệ (vd Ce₂(SO₄)₃ giảm khi T tăng).
- **Khí trong nước**: GIẢM độ tan khi T tăng (vì khí thoát ra). Đó là lý do cá khó thở ở nước nóng, và nước nóng để bia sẽ mất gas nhanh.

#### Áp suất
- **Khí trong chất lỏng**: tỉ lệ thuận với áp suất khí (định luật Henry). Đó là lý do nước có gas đóng chai phải nén áp suất cao.
- Chất rắn/lỏng: áp suất ảnh hưởng không đáng kể.

### 2.3. Bốn ví dụ số

**Độ tan NaCl trong nước:**
- 0°C: 35.7 g / 100 g H₂O
- 25°C: 36.0 g / 100 g H₂O
- 100°C: 39.1 g / 100 g H₂O

→ Tăng rất ít theo nhiệt độ.

**Độ tan KNO₃ trong nước:**
- 0°C: 13.3 g / 100 g
- 25°C: 38 g / 100 g
- 100°C: 247 g / 100 g

→ Tăng cực mạnh theo nhiệt độ. Ứng dụng: kết tinh KNO₃ tinh khiết bằng cách làm nguội dung dịch nóng bão hòa.

**Độ tan O₂ trong nước**:
- 0°C: 14.6 mg/L
- 25°C: 8.3 mg/L
- 35°C: 7.0 mg/L

→ Giảm khi nóng. Liên quan trực tiếp đến sinh thái: cá chết do nước nóng (thiếu oxy).

**Độ tan CO₂ trong nước ở 25°C:**
- 1 atm: 1.45 g/L
- 5 atm: 7.2 g/L (gấp ~ 5 lần khi áp suất tăng 5 lần — định luật Henry).

### 📝 Tóm tắt mục 2

- Độ tan = lượng tối đa hòa được, đến trạng thái bão hòa.
- Chất rắn ↑ T → ↑ tan (thường); khí ↑ T → ↓ tan, ↑ P → ↑ tan.
- "Like dissolves like" — phân cực ↔ phân cực, không cực ↔ không cực.

---

## 3. Các loại nồng độ

### 3.1. Nồng độ mol / Molarity (M)

**Định nghĩa**: số mol chất tan trong **1 lít dung dịch**.

\`\`\`
M = n / V
\`\`\`
Trong đó:
- \`M\` = molarity (mol/L), còn ký hiệu M
- \`n\` = số mol chất tan
- \`V\` = thể tích **dung dịch** (L), KHÔNG phải dung môi

**Ví dụ 1**: Hòa 5.85 g NaCl (M = 58.44) trong nước, sau đó thêm nước cho đủ 1 L. Tính nồng độ mol.
- n = 5.85 / 58.44 = 0.100 mol.
- M = 0.100 / 1 = **0.100 M** (= 0.1 mol/L).

**Ví dụ 2**: Pha 0.5 mol HCl vào 250 mL dung dịch. Tính M.
- M = 0.5 / 0.250 = **2.0 M**.

### 3.2. Phần trăm khối lượng (% w/w)

**Định nghĩa**: khối lượng chất tan trên khối lượng tổng dung dịch, biểu diễn %.

\`\`\`
% w/w = (m_chất_tan / m_dung_dịch) × 100%
\`\`\`

**Ví dụ**: Pha 20 g muối với 80 g nước. % w/w?
- m_dung_dịch = 20 + 80 = 100 g.
- % = 20 / 100 × 100% = **20% w/w**.

Lưu ý: m_dung_dịch = m_chất_tan + m_dung_môi, KHÔNG phải chỉ m_dung_môi.

### 3.3. Molality (m)

**Định nghĩa**: số mol chất tan trên **1 kg dung môi** (không phải dung dịch).

\`\`\`
m = n_chất_tan / kg_dung_môi
\`\`\`

Khác molarity ở chỗ: molality dùng kg dung môi (mass), molarity dùng L dung dịch (volume).

**Lưu ý**: ở dung dịch loãng + nước thường, molality ≈ molarity (vì 1 L H₂O ≈ 1 kg). Ở dung dịch đậm đặc hoặc dung môi khác, khác xa.

Ứng dụng chính của molality: tính sự đông đặc/sôi của dung dịch (vì độc lập với nhiệt độ — thể tích thay đổi theo T, nhưng khối lượng thì không).

### 3.4. ppm và ppb

Dùng cho dung dịch rất loãng (nước uống, không khí ô nhiễm):

- **ppm** (parts per million) = 1 phần triệu = 10⁻⁶ = 1 mg / 1 kg ≈ 1 mg / 1 L (nước).
- **ppb** (parts per billion) = 1 phần tỷ = 10⁻⁹ = 1 μg / 1 kg.

**Ví dụ**: nước uống tiêu chuẩn cho phép chứa tối đa 10 ppm nitrate (NO₃⁻) = 10 mg NO₃⁻ / L nước.

### 3.5. Chuyển đổi giữa các loại nồng độ

Cho dung dịch NaCl 10% w/w, khối lượng riêng 1.07 g/mL. Tính M.

- Lấy 1 L dung dịch: V = 1000 mL, khối lượng = 1000 × 1.07 = 1070 g.
- Khối lượng NaCl = 10% × 1070 = 107 g.
- n(NaCl) = 107 / 58.44 = 1.831 mol.
- M = 1.831 / 1 = **1.83 mol/L**.

### 📝 Tóm tắt mục 3

| Nồng độ | Công thức | Dùng khi |
|---------|-----------|----------|
| Molarity M | mol / L dd | Tính toán phản ứng |
| % w/w | g tan / g dd × 100 | Dung dịch đậm đặc thương mại |
| Molality m | mol / kg dung môi | Tính sôi/đông đặc |
| ppm/ppb | mg/L hoặc μg/L | Dung dịch rất loãng |

---

## 4. Pha loãng

### 4.1. Công thức M₁V₁ = M₂V₂

Khi thêm dung môi vào dung dịch (không thay đổi lượng chất tan):

\`\`\`
M₁ × V₁ = M₂ × V₂
\`\`\`

trong đó M₁, V₁ là nồng độ và thể tích ban đầu; M₂, V₂ sau pha loãng. Số mol chất tan trước và sau bằng nhau (n = M × V = const).

### 4.2. Hai ví dụ pha loãng

**Ví dụ 1**: Có 100 mL HCl 2 M. Thêm bao nhiêu nước để được HCl 0.5 M?
- M₁V₁ = M₂V₂ → 2 × 100 = 0.5 × V₂ → V₂ = 400 mL.
- Cần thêm 400 − 100 = **300 mL nước**.

**Ví dụ 2**: Pha 250 mL dung dịch NaCl 0.1 M từ dung dịch gốc 1 M. Lấy bao nhiêu mL dung dịch gốc?
- M₁V₁ = M₂V₂ → 1 × V₁ = 0.1 × 250 → V₁ = **25 mL**.
- Quy trình: lấy 25 mL dung dịch 1 M + thêm nước cho đủ 250 mL → 0.1 M.

### 📝 Tóm tắt mục 4

- Pha loãng giữ nguyên số mol chất tan → M₁V₁ = M₂V₂.
- Đơn vị thể tích phải đồng nhất ở 2 vế (cả mL hoặc cả L).

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Hòa 11.7 g NaCl trong 200 mL dung dịch. Tính M.

**Bài 2**: Dung dịch axit clohydric thương mại 37% w/w, khối lượng riêng 1.18 g/mL. Tính M.

**Bài 3**: Cần bao nhiêu mL dung dịch NaOH 2 M để pha thành 500 mL dung dịch NaOH 0.1 M?

**Bài 4**: Pha 80 g KNO₃ trong 200 g nước. Tính: a) % w/w, b) molality (cho M(KNO₃) = 101).

**Bài 5**: Nước có nồng độ 0.5 ppm flo (F⁻). Trong 2 L nước có bao nhiêu mg F⁻?

**Bài 6**: Để pha 100 mL dung dịch glucose 0.5 M, cần bao nhiêu g glucose (C₆H₁₂O₆, M = 180.16)?

### Lời giải

**Bài 1**:
- n(NaCl) = 11.7 / 58.44 = 0.200 mol.
- M = 0.200 / 0.200 = **1.00 M**.

**Bài 2**:
- 1 L = 1000 mL × 1.18 g/mL = 1180 g dung dịch.
- m(HCl) = 37% × 1180 = 436.6 g.
- n(HCl) = 436.6 / 36.46 = 11.98 mol.
- M = **11.98 mol/L ≈ 12 M**.

**Bài 3**: M₁V₁ = M₂V₂ → 2 × V₁ = 0.1 × 500 → V₁ = **25 mL**.

**Bài 4**:
a) m_dd = 80 + 200 = 280 g. % = 80 / 280 × 100% = **28.57% w/w**.
b) n(KNO₃) = 80 / 101 = 0.792 mol. kg dung môi = 0.2 kg. m = 0.792 / 0.2 = **3.96 mol/kg**.

**Bài 5**: 0.5 ppm = 0.5 mg/L. Trong 2 L: 2 × 0.5 = **1 mg F⁻**.

**Bài 6**:
- n = M × V = 0.5 × 0.1 = 0.05 mol.
- m = n × M(glucose) = 0.05 × 180.16 = **9.01 g**.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Động học & cân bằng](../lesson-08-kinetics-equilibrium/) — tốc độ phản ứng và trạng thái cân bằng.
- **Liên kết Tier 2**: nồng độ là cơ sở để học acid-base (pH), điện hóa, chuẩn độ trong Tier 2.

---

## 📝 Tổng kết Lesson 07

1. **Dung dịch** = chất tan + dung môi đồng nhất. "Like dissolves like".
2. **Độ tan**: lượng tối đa hòa được. Chất rắn ↑ T → ↑ tan; khí ↑ T → ↓ tan, ↑ P → ↑ tan.
3. **4 loại nồng độ**:
   - **Molarity M** = n / V_dd → tính phản ứng.
   - **% w/w** = m_tan / m_dd × 100 → đậm đặc thương mại.
   - **Molality m** = n / kg_dung_môi → tính sôi/đông đặc.
   - **ppm** = mg/L → loãng.
4. **Pha loãng**: M₁V₁ = M₂V₂ (giữ nguyên mol).

**Tiếp theo**: [Lesson 08 — Động học & cân bằng](../lesson-08-kinetics-equilibrium/)
`;
