// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/01-Structure/lesson-06-mole-stoichiometry/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Mol & Phản ứng (Stoichiometry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **mol** — đơn vị "đếm" cơ bản trong hóa học — và **số Avogadro** \`Nₐ ≈ 6.022 × 10²³\`.
- Tính được **khối lượng mol (M)** của bất kỳ chất nào từ khối lượng nguyên tử trong bảng tuần hoàn.
- Chuyển đổi thành thạo giữa 3 đại lượng: **số gam ↔ số mol ↔ số phân tử**.
- **Cân bằng** phương trình hóa học bằng phương pháp đại số / xét nguyên tử.
- Làm bài toán **stoichiometry**: cho khối lượng chất A → tính khối lượng chất B.
- Hiểu khái niệm **limiting reagent** (chất phản ứng hết) và **% yield** (hiệu suất).

## Kiến thức tiền đề

- [Lesson 01 — Cấu trúc nguyên tử](../lesson-01-atom-structure/) — biết khối lượng nguyên tử.
- Toán tỉ lệ và phương trình tuyến tính ([\`Math/01-Arithmetic-Algebra/lesson-03\`](../../../Math/01-Arithmetic-Algebra/lesson-03-linear-equations/) — chưa triển khai nhưng kiến thức cấp 2 là đủ).

---

## 1. Mol là gì?

### 💡 Trực giác / Hình dung

Trong đời sống, ta đếm **theo đơn vị**:
- 1 **tá** = 12 → "1 tá trứng".
- 1 **gross** = 144 → đơn vị bán sỉ.
- 1 **ream** = 500 tờ giấy.

Trong hóa học, **1 mol = 6.022 × 10²³ hạt** (nguyên tử, phân tử, ion, electron — tùy ngữ cảnh). Số này gọi là **số Avogadro Nₐ**.

Lý do chọn con số này: 1 mol nguyên tử ¹²C nặng đúng **12 gam**. Khi đó khối lượng mol (gam) = khối lượng nguyên tử trung bình (u). Đây là **cầu nối** giữa thế giới vi mô (đếm hạt) và vĩ mô (cân khối lượng).

### 1.1. Định nghĩa chính thức

**1 mol** = số nguyên tử trong **đúng 12 gam ¹²C** = **6.022 × 10²³** (số Avogadro Nₐ).

### 1.2. Khối lượng mol M (g/mol)

**Khối lượng mol M** của 1 chất = khối lượng (gam) của 1 mol chất đó. Trị số bằng khối lượng nguyên tử/phân tử (đơn vị u).

**Ví dụ tính khối lượng mol:**

| Chất | Công thức | M (g/mol) | Tính |
|------|-----------|-----------|------|
| Hydrogen (nguyên tử) | H | 1.008 | từ bảng tuần hoàn |
| Hydrogen (phân tử) | H₂ | 2.016 | 2 × 1.008 |
| Nước | H₂O | 18.015 | 2 × 1.008 + 15.999 |
| Carbon dioxide | CO₂ | 44.01 | 12.011 + 2 × 15.999 |
| Glucose | C₆H₁₂O₆ | 180.16 | 6 × 12.011 + 12 × 1.008 + 6 × 15.999 |
| Sulfuric acid | H₂SO₄ | 98.08 | 2 × 1.008 + 32.06 + 4 × 15.999 |

### 1.3. Ba công thức chuyển đổi

\`\`\`
n = m / M           (n: số mol, m: khối lượng (g), M: khối lượng mol (g/mol))
N = n × Nₐ          (N: số hạt; Nₐ = 6.022 × 10²³)
m = n × M           (đảo lại)
\`\`\`

### 1.4. Bốn ví dụ chuyển đổi

**Ví dụ 1 — Cho 36 g H₂O, tính số mol và số phân tử.**
- n = m / M = 36 / 18.015 = **2.00 mol**.
- N = n × Nₐ = 2 × 6.022 × 10²³ = **1.20 × 10²⁴ phân tử**.

**Ví dụ 2 — 0.5 mol NaCl nặng bao nhiêu gam?** (M(NaCl) = 22.99 + 35.45 = 58.44 g/mol)
- m = n × M = 0.5 × 58.44 = **29.22 g**.

**Ví dụ 3 — 1 cốc nước (250 mL ≈ 250 g): bao nhiêu phân tử H₂O?**
- n = 250 / 18 ≈ **13.89 mol**.
- N = 13.89 × 6.022 × 10²³ ≈ **8.36 × 10²⁴ phân tử**.
- (Tức là 8 triệu triệu triệu triệu phân tử — nhiều hơn số hạt cát trên Trái Đất.)

**Ví dụ 4 — Cho 0.250 mol Fe, tính khối lượng và số nguyên tử.** (M(Fe) = 55.85)
- m = 0.250 × 55.85 = **13.96 g**.
- N = 0.250 × 6.022 × 10²³ ≈ **1.506 × 10²³ nguyên tử**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sao biết Nₐ = 6.022 × 10²³? Đếm tay được không?**
A: Không thể đếm tay — quá nhiều. Phương pháp đo: dùng tinh thể silicon đơn tinh thể, đo chính xác kích thước ô đơn vị (X-ray), từ đó tính được số nguyên tử Si/cm³. Cân được 28 g Si (= 1 mol theo định nghĩa cũ) thì biết được Nₐ. Năm 2019, định nghĩa SI mới đã cố định Nₐ = 6.02214076 × 10²³ (định nghĩa, không phải đo).

**Q: Vì sao chọn 12 g ¹²C làm chuẩn?**
A: Trước đây dùng oxygen làm chuẩn (1 mol O₂ = 32 g). Năm 1961, đổi sang ¹²C vì C dễ tinh chế hơn, đo khối lượng chính xác hơn bằng phổ khối. Lựa chọn 12 (không phải 1) vì u được định nghĩa = 1/12 khối lượng ¹²C — duy trì tính tự nhất quán.

### 📝 Tóm tắt mục 1

- 1 mol = Nₐ = 6.022 × 10²³ hạt.
- Khối lượng mol (g/mol) = số bằng khối lượng nguyên tử/phân tử (u).
- 3 công thức: \`n = m/M\`, \`m = n·M\`, \`N = n·Nₐ\`.

---

## 2. Cân bằng phương trình hóa học

### 2.1. Vì sao phải cân bằng?

**Định luật bảo toàn khối lượng (Lavoisier, 1789)**: trong một phản ứng hóa học, tổng khối lượng các chất tham gia = tổng khối lượng các chất sản phẩm.

Hệ quả: **số nguyên tử của mỗi nguyên tố** phải bằng nhau ở 2 vế của phương trình. Cân bằng = điều chỉnh **hệ số** trước mỗi công thức để đạt điều này.

### 2.2. Quy trình cân bằng (xét nguyên tử)

1. Viết phương trình không cân bằng (skeleton equation).
2. Đếm số nguyên tử mỗi nguyên tố ở 2 vế.
3. Điều chỉnh hệ số (không bao giờ đổi chỉ số dưới — vì sẽ đổi chất).
4. Bắt đầu từ nguyên tố xuất hiện ít nhất (thường là kim loại), kết thúc bằng O và H.
5. Kiểm tra lại sau cùng.

### 2.3. Walk-through cân bằng — 4 ví dụ

#### Ví dụ 1 — Đốt cháy methane

Skeleton: \`CH₄ + O₂ → CO₂ + H₂O\`

Đếm:
| Nguyên tố | Trái | Phải |
|-----------|------|------|
| C | 1 | 1 |
| H | 4 | 2 |
| O | 2 | 3 |

- C đã cân bằng.
- H: vế trái 4, vế phải 2 → thêm hệ số 2 vào H₂O: \`CH₄ + O₂ → CO₂ + 2H₂O\`. Bây giờ vế phải có 4 H ✓.
- O: vế trái 2, vế phải 2 + 2×1 = 4 → thêm hệ số 2 vào O₂: \`CH₄ + 2O₂ → CO₂ + 2H₂O\`. Vế trái 4 O ✓.

Kết quả: **\`CH₄ + 2O₂ → CO₂ + 2H₂O\`**

#### Ví dụ 2 — Tạo nước

Skeleton: \`H₂ + O₂ → H₂O\`
- H: 2 vs 2 ✓.
- O: 2 vs 1. Thêm hệ số 2 cho H₂O: \`H₂ + O₂ → 2H₂O\`. Bây giờ vế phải có 4 H → vế trái phải có 4 H → thêm hệ số 2 cho H₂.
- \`2H₂ + O₂ → 2H₂O\` ✓.

#### Ví dụ 3 — Đốt sắt

Skeleton: \`Fe + O₂ → Fe₂O₃\`
- Fe: 1 vs 2. Thêm hệ số 2 cho Fe trái: \`2Fe + O₂ → Fe₂O₃\`.
- O: 2 vs 3. LCM(2, 3) = 6. Thêm hệ số 3 cho O₂ và 2 cho Fe₂O₃: \`4Fe + 3O₂ → 2Fe₂O₃\`. (Phải nhân Fe trái lên 4 để khớp 2 × 2 = 4 Fe vế phải.)
- Kiểm tra: Fe (4 = 4 ✓), O (6 = 6 ✓).

Kết quả: **\`4Fe + 3O₂ → 2Fe₂O₃\`**

#### Ví dụ 4 — Trung hòa acid-base

Skeleton: \`H₂SO₄ + NaOH → Na₂SO₄ + H₂O\`
- Na: 1 vs 2. Thêm hệ số 2 cho NaOH: \`H₂SO₄ + 2NaOH → Na₂SO₄ + H₂O\`.
- S: 1 vs 1 ✓.
- O: 4 + 2 = 6 vs 4 + 1 = 5. Thêm hệ số 2 cho H₂O: \`H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\`.
- H: 2 + 2 = 4 vs 4 ✓. O: 4 + 2 = 6 vs 4 + 2 = 6 ✓.

Kết quả: **\`H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\`**

### ⚠ Lỗi thường gặp

- **Đổi chỉ số dưới**: SAI tuyệt đối. \`H₂O → H₃O\` không phải "thêm 1 H" — đó là chất khác!
- **Quên kiểm tra lại**: phải đếm lại mọi nguyên tố sau khi xong.
- **Không tối giản hệ số**: nếu cuối cùng tất cả hệ số chia hết cho 2, phải tối giản. Vd \`4H₂ + 2O₂ → 4H₂O\` → đáp án đúng là \`2H₂ + O₂ → 2H₂O\`.

### 📝 Tóm tắt mục 2

- Cân bằng = đảm bảo số nguyên tử mỗi nguyên tố bằng nhau ở 2 vế.
- Quy trình: liệt kê → chỉnh hệ số → kiểm tra.
- Bắt đầu từ nguyên tố ít → O, H sau cùng.

---

## 3. Bài toán Stoichiometry

### 3.1. Quy trình tổng quát

Cho phương trình cân bằng, biết khối lượng/mol chất A → tìm khối lượng/mol chất B:

1. Cân bằng phương trình (nếu chưa).
2. Đổi A từ gam → mol: \`n_A = m_A / M_A\`.
3. Dùng **tỉ lệ mol** từ phương trình: \`n_B = n_A × (hệ số B / hệ số A)\`.
4. Đổi B từ mol → gam: \`m_B = n_B × M_B\`.

### 3.2. Walk-through stoichiometry — 2 ví dụ

#### Ví dụ 1 — Đốt 10 g methane, thu được bao nhiêu gam CO₂?

Phương trình: \`CH₄ + 2O₂ → CO₂ + 2H₂O\`

- M(CH₄) = 16.04 g/mol; M(CO₂) = 44.01 g/mol.
- n(CH₄) = 10 / 16.04 = **0.623 mol**.
- Tỉ lệ: 1 mol CH₄ → 1 mol CO₂ → n(CO₂) = 0.623 mol.
- m(CO₂) = 0.623 × 44.01 = **27.43 g**.

#### Ví dụ 2 — Cho 5 g Fe phản ứng với O₂ dư. Tính khối lượng Fe₂O₃ thu được.

Phương trình: \`4Fe + 3O₂ → 2Fe₂O₃\`

- M(Fe) = 55.85; M(Fe₂O₃) = 2 × 55.85 + 3 × 16.00 = 159.70 g/mol.
- n(Fe) = 5 / 55.85 = **0.0895 mol**.
- Tỉ lệ: 4 mol Fe → 2 mol Fe₂O₃ → n(Fe₂O₃) = 0.0895 × (2/4) = **0.0448 mol**.
- m(Fe₂O₃) = 0.0448 × 159.70 = **7.15 g**.

Kiểm tra bảo toàn khối lượng: m(Fe) + m(O đã dùng) = m(Fe₂O₃). m(O đã dùng) = 7.15 − 5 = 2.15 g. n(O₂ đã dùng) = 0.0895 × (3/4) = 0.0671 mol → m(O₂) = 0.0671 × 32 = 2.15 g ✓.

### 3.3. Limiting Reagent — chất phản ứng hết

Khi cho cả 2 chất phản ứng (không phải dư 1), chất nào hết trước là **limiting reagent**, quyết định lượng sản phẩm.

**Ví dụ — Cho 4 g H₂ + 32 g O₂. Tính lượng nước tạo thành. Chất nào dư?**

Phương trình: \`2H₂ + O₂ → 2H₂O\`

- n(H₂) = 4 / 2.016 = 1.984 mol.
- n(O₂) = 32 / 32.00 = 1.000 mol.
- Theo phương trình: 2 mol H₂ cần 1 mol O₂. Có 1.984 mol H₂ → cần 0.992 mol O₂. Mà có sẵn 1.000 mol O₂ → đủ dùng, dư một ít.
- → **H₂ là limiting reagent** (gần như vừa đủ, nhưng dư nhẹ O₂).
- n(H₂O) = n(H₂) = 1.984 mol → m(H₂O) = 1.984 × 18 = **35.7 g**.
- O₂ dư = 1.000 − 0.992 = 0.008 mol = 0.256 g.

### 3.4. Hiệu suất phản ứng (% yield)

Trong thực tế, phản ứng không bao giờ chạy 100%. **% yield** = (lượng thực tế thu được / lượng lý thuyết) × 100%.

**Ví dụ**: Lý thuyết tính được 27.43 g CO₂, thực tế đo được 25 g. Hiệu suất = 25 / 27.43 × 100% = **91.1%**.

### 📝 Tóm tắt mục 3

- Quy trình 4 bước: gam → mol → mol (tỉ lệ) → gam.
- Limiting reagent: chất hết trước, quyết định sản phẩm.
- % yield = thực tế / lý thuyết × 100%.

---

## 4. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính khối lượng mol của các chất: H₂SO₄, NaCl, Al₂(SO₄)₃, C₁₂H₂₂O₁₁ (đường saccharose), Ca(OH)₂. (Dùng M(H)=1.01, M(C)=12.01, M(N)=14.01, M(O)=16.00, M(Na)=22.99, M(Al)=26.98, M(S)=32.06, M(Cl)=35.45, M(Ca)=40.08.)

**Bài 2**: 4.5 g nước chứa bao nhiêu mol? Bao nhiêu phân tử?

**Bài 3**: Cân bằng các phương trình sau:
a) \`Al + HCl → AlCl₃ + H₂\`
b) \`Ca(OH)₂ + HCl → CaCl₂ + H₂O\`
c) \`KMnO₄ + HCl → KCl + MnCl₂ + Cl₂ + H₂O\`

**Bài 4**: Đốt 11.5 g rượu etylic (C₂H₅OH, M = 46) hoàn toàn trong O₂ dư. Tính khối lượng CO₂ và H₂O tạo thành.
- Phương trình: \`C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O\`.

**Bài 5**: Cho 5.4 g Al phản ứng với 7.3 g HCl. Tính khối lượng AlCl₃ tạo thành và chất nào dư?
- Phương trình: \`2Al + 6HCl → 2AlCl₃ + 3H₂\`. (M(Al)=27, M(HCl)=36.5, M(AlCl₃)=133.5.)

**Bài 6**: Một phản ứng có hiệu suất 85%. Tính lượng sản phẩm lý thuyết nếu thực tế thu được 17 g.

### Lời giải

**Bài 1**:
- M(H₂SO₄) = 2 × 1.01 + 32.06 + 4 × 16.00 = **98.08 g/mol**.
- M(NaCl) = 22.99 + 35.45 = **58.44 g/mol**.
- M(Al₂(SO₄)₃) = 2 × 26.98 + 3 × (32.06 + 4 × 16) = 53.96 + 3 × 96.06 = 53.96 + 288.18 = **342.14 g/mol**.
- M(C₁₂H₂₂O₁₁) = 12 × 12.01 + 22 × 1.01 + 11 × 16 = 144.12 + 22.22 + 176 = **342.34 g/mol**.
- M(Ca(OH)₂) = 40.08 + 2 × (16 + 1.01) = 40.08 + 34.02 = **74.10 g/mol**.

**Bài 2**: 
- n = 4.5 / 18.02 = **0.250 mol**.
- N = 0.250 × 6.022 × 10²³ = **1.51 × 10²³ phân tử**.

**Bài 3**:

a) \`2Al + 6HCl → 2AlCl₃ + 3H₂\`
- Al: 2=2 ✓; Cl: 6=6 ✓; H: 6=6 ✓.

b) \`Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O\`
- Ca: 1=1; Cl: 2=2; O: 2=2; H: 2+2=4=4 ✓.

c) \`2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O\`
- K: 2=2; Mn: 2=2; O: 8=8 (= 8 H₂O); H: 16=16; Cl: 16 = 2 + 4 + 10 = 16 ✓.

**Bài 4**: 
- n(C₂H₅OH) = 11.5 / 46 = **0.25 mol**.
- Tỉ lệ: 1 mol etanol → 2 mol CO₂ + 3 mol H₂O.
- n(CO₂) = 0.25 × 2 = 0.50 mol → m(CO₂) = 0.50 × 44 = **22 g**.
- n(H₂O) = 0.25 × 3 = 0.75 mol → m(H₂O) = 0.75 × 18 = **13.5 g**.
- Kiểm tra: 11.5 g etanol + n(O₂)×32 = 22 + 13.5. n(O₂) = 0.25 × 3 = 0.75 mol → m(O₂) = 24 g. 11.5 + 24 = 35.5 = 22 + 13.5 ✓.

**Bài 5**:
- n(Al) = 5.4 / 27 = **0.20 mol**.
- n(HCl) = 7.3 / 36.5 = **0.20 mol**.
- Theo phương trình: 2 Al cần 6 HCl → 0.20 mol Al cần 0.60 mol HCl. Chỉ có 0.20 mol HCl → HCl thiếu nhiều. **HCl là limiting reagent**.
- Theo HCl: 6 HCl → 2 AlCl₃ → 0.20 mol HCl → 0.20/3 = 0.0667 mol AlCl₃.
- m(AlCl₃) = 0.0667 × 133.5 = **8.90 g**.
- Al dư = 0.20 − (0.20 × 2/6) = 0.20 − 0.0667 = 0.1333 mol = **3.6 g Al dư**.

**Bài 6**: 17 g thực tế / 85% × 100% = 17 / 0.85 = **20 g lý thuyết**.

---

## 5. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 07 — Dung dịch & nồng độ](../lesson-07-solutions-concentration/) — nồng độ, pha loãng, độ tan.
- **Liên kết Math**: bài toán tỉ lệ và phương trình → [\`Math/01-Arithmetic-Algebra/lesson-03\`](../../../Math/01-Arithmetic-Algebra/lesson-03-linear-equations/).
- **Ứng dụng**: bài toán mol là kỹ năng nền cho mọi tính toán hóa học sau (acid-base, redox, nhiệt động).

---

## 📝 Tổng kết Lesson 06

1. **Mol** = 6.022 × 10²³ hạt (số Avogadro Nₐ), cầu nối vi mô ↔ vĩ mô.
2. **Khối lượng mol M (g/mol)** = số bằng khối lượng phân tử (u).
3. **3 công thức**: \`n = m/M\`, \`m = n·M\`, \`N = n·Nₐ\`.
4. **Cân bằng phương trình**: số nguyên tử mỗi nguyên tố ở 2 vế phải bằng nhau (Lavoisier).
5. **Stoichiometry**: gam → mol → mol (tỉ lệ) → gam.
6. **Limiting reagent**: chất phản ứng hết trước, quyết định lượng sản phẩm.
7. **% yield** = thực tế / lý thuyết × 100%.

**Tiếp theo**: [Lesson 07 — Dung dịch & nồng độ](../lesson-07-solutions-concentration/)
`;
