# Lesson 04 (Tier 2) — Nhiệt động hóa học (Thermochemistry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **năng lượng** và **nhiệt**, hiểu khái niệm **enthalpy H** và **biến thiên enthalpy ΔH** của phản ứng.
- Phân loại phản ứng **tỏa nhiệt (exothermic, ΔH < 0)** và **thu nhiệt (endothermic, ΔH > 0)**.
- Áp dụng **định luật Hess**: ΔH của phản ứng tổng = tổng ΔH các bước.
- Tính ΔH phản ứng từ **enthalpy hình thành chuẩn ΔH°f** của các chất.
- Hiểu **entropy S** = thước đo "độ hỗn loạn" và **định luật II nhiệt động lực học**.
- Sử dụng **năng lượng tự do Gibbs ΔG = ΔH − TΔS** để dự đoán **chiều tự xảy ra** của phản ứng.
- Liên hệ ΔG với **hằng số cân bằng K** (`ΔG° = −RT·ln K`) và với **điện thế pin** (`ΔG° = −n·F·E°`).

## Kiến thức tiền đề

- [Lesson 08 (T1) — Động học & Cân bằng](../../01-Structure/lesson-08-kinetics-equilibrium/) — khái niệm K.
- [Lesson 03 (T2) — Điện hóa](../lesson-03-electrochemistry/) — biết E°cell.

---

## 1. Năng lượng và Enthalpy

### 1.1. Hệ thống vs môi trường

Trong nhiệt động: chia thế giới thành 2 phần:
- **Hệ thống (system)**: vùng ta đang nghiên cứu (vd bình chứa các chất phản ứng).
- **Môi trường (surroundings)**: tất cả phần còn lại.

Năng lượng có thể chuyển đổi giữa hệ và môi trường dưới 2 dạng: **nhiệt (q)** và **công (w)**.

**Định luật I nhiệt động** (bảo toàn năng lượng):
```
ΔU = q + w
```
trong đó ΔU = biến thiên nội năng của hệ.

### 1.2. Enthalpy

Với phản ứng ở **áp suất hằng** (thường gặp nhất, vd phản ứng trong bình hở), nhiệt trao đổi = biến thiên **enthalpy** H:
```
q_p = ΔH
```

- ΔH < 0: phản ứng **tỏa nhiệt** (hệ giải phóng nhiệt ra môi trường) → môi trường nóng lên.
- ΔH > 0: phản ứng **thu nhiệt** (hệ hấp thụ nhiệt từ môi trường) → môi trường nguội đi.

Đơn vị: **kJ/mol** hoặc kJ (cho 1 mole phản ứng).

### 1.3. Bốn ví dụ phản ứng

**Ví dụ 1 — Đốt khí tự nhiên (methane):**
```
CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)   ΔH° = −890 kJ/mol
```
Tỏa nhiệt mạnh (890 kJ cho 1 mol CH₄ đốt) → bếp gas nóng được nồi cơm.

**Ví dụ 2 — Tan NaCl trong nước:**
```
NaCl(s) → Na⁺(aq) + Cl⁻(aq)   ΔH° = +3.9 kJ/mol
```
Thu nhiệt nhẹ → nước hơi mát khi pha muối.

**Ví dụ 3 — Tan KNO₃ trong nước:**
```
KNO₃(s) → K⁺(aq) + NO₃⁻(aq)   ΔH° = +34.9 kJ/mol
```
Thu nhiệt khá mạnh → ứng dụng làm túi đá "lạnh tức thì" (cracking để KNO₃ trộn nước).

**Ví dụ 4 — Trung hòa NaOH + HCl:**
```
NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)   ΔH° = −56 kJ/mol
```
Tỏa nhiệt → dung dịch nóng lên đáng kể.

### 1.4. Enthalpy hình thành chuẩn ΔH°f

**ΔH°f của một chất** = biến thiên enthalpy khi tạo 1 mol chất đó **từ các nguyên tố ở dạng bền nhất ở điều kiện chuẩn** (25°C, 1 atm).

- Nguyên tố ở dạng bền: ΔH°f = 0 (vd O₂, H₂, C-graphite, N₂).
- Hợp chất: có giá trị xác định.

**Bảng ΔH°f mẫu (kJ/mol)**:

| Chất | ΔH°f | Chất | ΔH°f |
|------|------|------|------|
| H₂O(l) | −285.8 | CO₂(g) | −393.5 |
| H₂O(g) | −241.8 | CO(g) | −110.5 |
| CH₄(g) | −74.8 | NH₃(g) | −45.9 |
| C₂H₅OH(l) | −277.7 | NO(g) | +90.4 |
| C₆H₁₂O₆(s) | −1273.3 | NO₂(g) | +33.2 |
| O₂(g) | 0 | H₂(g) | 0 |

**Công thức tính ΔH°rxn**:
```
ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants)
```

### 📝 Tóm tắt mục 1

- Định luật I: ΔU = q + w. Ở P hằng: q = ΔH.
- ΔH < 0 = tỏa nhiệt; ΔH > 0 = thu nhiệt.
- ΔH°rxn = Σ ΔH°f(SP) − Σ ΔH°f(CPƯ). Nguyên tố bền: ΔH°f = 0.

---

## 2. Định luật Hess

### 2.1. Phát biểu

**Định luật Hess (1840)**: ΔH của một phản ứng chỉ phụ thuộc trạng thái đầu và trạng thái cuối, **không** phụ thuộc đường đi (số bước trung gian).

Hệ quả: nếu phản ứng A → C có thể viết = A → B → C, thì:
```
ΔH(A → C) = ΔH(A → B) + ΔH(B → C)
```

### 💡 Trực giác / Hình dung

Tưởng tượng đi từ chân núi (A) lên đỉnh (C). Có thể đi 1 đường thẳng (ΔH₁) hoặc đi vòng qua một đỉnh trung gian (ΔH₂ + ΔH₃). **Độ cao chênh** giữa A và C giống nhau dù đi đường nào → tổng năng lượng tăng/giảm bằng nhau.

### 2.2. Walk-through Hess — tính ΔH(CO → CO₂)

**Cho:**
- (i) C + O₂ → CO₂, ΔH₁ = −393.5 kJ/mol
- (ii) C + ½O₂ → CO, ΔH₂ = −110.5 kJ/mol

**Tính**: ΔH(CO + ½O₂ → CO₂) = ?

**Phương pháp**: phản ứng cần tìm có thể viết là (i) − (ii):
- (i) − (ii): (C + O₂) − (C + ½O₂) → CO₂ − CO
- Đơn giản: ½O₂ + CO → CO₂

→ ΔH = ΔH₁ − ΔH₂ = −393.5 − (−110.5) = **−283.0 kJ/mol**.

Phản ứng tỏa nhiệt khá mạnh — đó là lý do CO cháy trong không khí.

### 2.3. Quy tắc thao tác

Khi cộng/trừ phản ứng để áp dụng Hess:
1. **Đảo chiều phản ứng** → đảo dấu ΔH.
2. **Nhân hệ số phản ứng × k** → ΔH cũng nhân k.
3. **Cộng các phản ứng** → cộng các ΔH tương ứng.

### 📝 Tóm tắt mục 2

- ΔH chỉ phụ thuộc trạng thái đầu-cuối (state function).
- Có thể cộng/trừ phản ứng để suy ra ΔH chưa biết.
- Đảo phản ứng = đảo dấu ΔH; nhân hệ số = nhân ΔH.

---

## 3. Entropy và Định luật II

### 3.1. Entropy S

**Entropy S** = thước đo "độ hỗn loạn" (disorder) hoặc "số cách sắp xếp" của hệ. Đơn vị: J/(mol·K).

Quy tắc nhanh để so sánh entropy:
- **Khí > Lỏng > Rắn** (cùng chất). Vd S(H₂O g) > S(H₂O l) > S(H₂O s).
- **Phân tử lớn > phân tử nhỏ** (cùng trạng thái).
- **Hỗn hợp > tinh khiết**.
- **Nhiều mol khí > ít mol khí** (cùng thể tích).

### 3.2. Định luật II nhiệt động

**Phát biểu**: Mọi quá trình tự nhiên đều có **tổng entropy** (hệ + môi trường) **tăng**.

```
ΔS_universe = ΔS_system + ΔS_surroundings > 0  (cho quá trình tự xảy ra)
```

### 💡 Trực giác

Bạn rất khó để các phần tử trong căn phòng tự "gộp lại" thành 1 chỗ — chúng luôn "tản ra" (entropy tăng). Tương tự: nước tự tan, không tự tách. Đồ vỡ không tự ghép lại. Nhiệt tự truyền từ nóng → lạnh, không ngược lại.

### 3.3. Biến thiên entropy phản ứng

```
ΔS°rxn = Σ S°(products) − Σ S°(reactants)
```

**Bảng S° mẫu (J/(mol·K))**:

| Chất | S° |
|------|-----|
| H₂(g) | 130.7 |
| O₂(g) | 205.0 |
| N₂(g) | 191.5 |
| H₂O(l) | 70.0 |
| H₂O(g) | 188.7 |
| CO₂(g) | 213.7 |
| C-graphite | 5.7 |

**Ví dụ**: ΔS° của phản ứng `2H₂(g) + O₂(g) → 2H₂O(l)`:
- ΔS° = 2 × S°(H₂O) − [2 × S°(H₂) + S°(O₂)] = 2 × 70.0 − (2 × 130.7 + 205.0) = 140.0 − 466.4 = **−326.4 J/(mol·K)**.
- Negative — entropy giảm (3 mol khí thành 2 mol lỏng, hỗn loạn giảm rất nhiều).

### 📝 Tóm tắt mục 3

- S đo "hỗn loạn"; đơn vị J/(mol·K).
- Quy tắc: khí > lỏng > rắn.
- Định luật II: ΔS_universe > 0 cho quá trình tự xảy ra.

---

## 4. Năng lượng tự do Gibbs ΔG

### 4.1. Định nghĩa và ý nghĩa

**Năng lượng tự do Gibbs G** là một state function tích hợp cả enthalpy và entropy:
```
G = H − TS
```

**Biến thiên ΔG** của phản ứng ở T xác định:
```
ΔG = ΔH − T·ΔS
```

**Ý nghĩa của ΔG**:
- **ΔG < 0**: phản ứng **TỰ XẢY RA** (spontaneous) theo chiều thuận.
- **ΔG > 0**: KHÔNG tự xảy ra theo chiều thuận. Tự xảy ra theo chiều ngược.
- **ΔG = 0**: hệ ở **trạng thái cân bằng**.

### 4.2. Bốn trường hợp ΔH và ΔS

| ΔH | ΔS | ΔG = ΔH − TΔS | Phản ứng |
|----|----|----|----|
| − (tỏa) | + (tăng) | Luôn < 0 | TỰ XẢY RA ở mọi T |
| + (thu) | − (giảm) | Luôn > 0 | KHÔNG tự xảy ra ở mọi T |
| − | − | < 0 khi T thấp | Tự xảy ra ở **T thấp** |
| + | + | < 0 khi T cao | Tự xảy ra ở **T cao** |

### 4.3. Ba ví dụ tính ΔG

**Ví dụ 1 — Đốt H₂**: 2H₂(g) + O₂(g) → 2H₂O(l), ΔH = −571.6 kJ, ΔS = −326.4 J/K = −0.3264 kJ/K. Ở 25°C (298 K):
- ΔG = −571.6 − 298 × (−0.3264) = −571.6 + 97.3 = **−474.3 kJ**.
- ΔG < 0 → **tự xảy ra**. Mặc dù ΔS < 0 (mất hỗn loạn), ΔH tỏa nhiệt rất mạnh.

**Ví dụ 2 — Tan NH₄NO₃ trong nước**: ΔH = +25 kJ/mol (thu nhiệt), ΔS = +108 J/(mol·K) (tăng hỗn loạn). Ở 25°C:
- ΔG = 25 − 298 × 0.108 = 25 − 32.2 = **−7.2 kJ**.
- ΔG < 0 → tự xảy ra. Đây là lý do túi lạnh hoạt động: thu nhiệt từ tay → tay lạnh.

**Ví dụ 3 — Phân hủy CaCO₃**: CaCO₃(s) → CaO(s) + CO₂(g), ΔH = +178 kJ, ΔS = +161 J/K.
- Tại 25°C: ΔG = 178 − 298 × 0.161 = 178 − 48 = +130 kJ > 0. Không tự xảy ra.
- Tại 1000 K: ΔG = 178 − 1000 × 0.161 = 178 − 161 = +17 kJ. Vẫn dương nhưng nhỏ.
- Tại 1200 K: ΔG = 178 − 1200 × 0.161 = 178 − 193 = **−15 kJ**. Tự xảy ra!
- → CaCO₃ phân hủy ở nhiệt độ cao (~ 900°C). Đây là cách sản xuất vôi.

### 4.4. Liên hệ ΔG với K và E°

**Hai công thức quan trọng nối thermochem với cân bằng và điện hóa:**

```
ΔG° = −R·T·ln K     (R = 8.314 J/(mol·K))
ΔG° = −n·F·E°cell   (F = 96,485 C/mol)
```

- ΔG° < 0 ⇔ K > 1 ⇔ E°cell > 0 → 3 cách nói cùng một thứ: phản ứng tự xảy ra.
- Càng âm ΔG° → K càng lớn → E°cell càng dương.

### 📝 Tóm tắt mục 4

- ΔG = ΔH − T·ΔS.
- ΔG < 0: tự xảy ra. ΔG = 0: cân bằng. ΔG > 0: không tự xảy ra.
- 4 trường hợp ΔH, ΔS quyết định khi nào tự xảy ra theo T.
- ΔG° = −RT ln K = −nFE°: 3 cách đo "sự tự xảy ra".

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính ΔH° cho phản ứng đốt etanol: `C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l)`. Cho ΔH°f: C₂H₅OH = −277.7; CO₂ = −393.5; H₂O(l) = −285.8 kJ/mol.

**Bài 2**: Dùng định luật Hess: cho (i) S + O₂ → SO₂, ΔH = −297 kJ; (ii) 2SO₃ → 2SO₂ + O₂, ΔH = +198 kJ. Tính ΔH cho phản ứng S + 3/2 O₂ → SO₃.

**Bài 3**: Một phản ứng có ΔH = +120 kJ, ΔS = +250 J/K. Ở nhiệt độ nào phản ứng bắt đầu tự xảy ra?

**Bài 4**: Cho ΔG° = −110 kJ. Tính K ở 25°C. (R = 8.314 J/(mol·K).)

**Bài 5**: Phản ứng tạo NH₃: N₂ + 3H₂ → 2NH₃, ΔH = −92 kJ, ΔS = −198 J/K. Ở 25°C có tự xảy ra không? Ở 500°C thì sao?

**Bài 6**: Pin galvanic có E°cell = +1.10 V (Daniell), n = 2 mol e. Tính ΔG° và K của phản ứng `Zn + Cu²⁺ → Zn²⁺ + Cu`.

### Lời giải

**Bài 1**: 
```
ΔH° = [2 × (−393.5) + 3 × (−285.8)] − [(−277.7) + 3 × 0]
    = [−787.0 + (−857.4)] − [−277.7]
    = −1644.4 + 277.7
    = −1366.7 kJ
```
Đốt 1 mol etanol tỏa ~ 1366.7 kJ.

**Bài 2**: Cần `S + 3/2 O₂ → SO₃`.
- (i): S + O₂ → SO₂, ΔH₁ = −297 kJ. 
- (ii) chia 2 và đảo chiều: SO₂ + ½O₂ → SO₃, ΔH = −198/2 = −99 kJ.
- Cộng (i) + (ii đảo): S + O₂ + SO₂ + ½O₂ → SO₂ + SO₃ → S + 3/2 O₂ → SO₃.
- ΔH = −297 + (−99) = **−396 kJ**.

**Bài 3**: Tự xảy ra khi ΔG = 0: T = ΔH/ΔS = 120,000 / 250 = **480 K = 207°C**. Tại T > 207°C, phản ứng tự xảy ra.

**Bài 4**: ΔG° = −RT ln K → ln K = −ΔG°/(RT) = 110,000 / (8.314 × 298) = 44.4.
K = e^44.4 ≈ **1.9 × 10¹⁹** (cực kỳ lớn — phản ứng gần như đi hết).

**Bài 5**: 
- Tại 25°C = 298 K: ΔG = −92 − 298 × (−0.198) = −92 + 59.0 = **−33 kJ < 0** → tự xảy ra.
- Tại 500°C = 773 K: ΔG = −92 − 773 × (−0.198) = −92 + 153 = **+61 kJ > 0** → KHÔNG tự xảy ra.
- → Tổng hợp ammonia thuận lợi về thermodynamic ở T thấp, nhưng tốc độ quá chậm. Phải ép P cao + xúc tác (Lesson T1-L08).

**Bài 6**: 
- ΔG° = −n·F·E° = −2 × 96485 × 1.10 = **−212,267 J = −212.3 kJ**.
- ln K = −ΔG°/(RT) = 212,267 / (8.314 × 298) = 85.6. K = e^85.6 ≈ **1.5 × 10³⁷**. 
- Phản ứng đi gần như "tới hết" → Zn tan hết trong dung dịch Cu²⁺ nếu đủ Cu²⁺.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Hydrocarbon](../lesson-05-organic-hydrocarbons/) — bước chân vào hóa hữu cơ.
- **Liên kết Physics**: định luật I, II nhiệt động → [`Physics/02-Thermo-Electromagnetism/lesson-01..03`](../../../Physics/02-Thermo-Electromagnetism/). Cùng concept dưới góc nhìn vật lý.
- **Liên kết Math**: ΔG = ΔH − TΔS là hàm tuyến tính của T → [`Math/01-Arithmetic-Algebra/lesson-06`](../../../Math/01-Arithmetic-Algebra/). ln K cần logarit.

---

## 📝 Tổng kết Lesson 04 (T2)

1. **Định luật I**: ΔU = q + w. Ở P hằng: q = ΔH.
2. **ΔH**: tỏa (< 0) hay thu (> 0). ΔH°rxn = ΣΔH°f(SP) − ΣΔH°f(CPƯ).
3. **Định luật Hess**: ΔH state function, có thể cộng/trừ phản ứng.
4. **Entropy S**: hỗn loạn. Khí > lỏng > rắn. Định luật II: ΔS_universe > 0.
5. **Gibbs G**: ΔG = ΔH − T·ΔS. ΔG < 0 → tự xảy ra.
6. **4 trường hợp**: kết hợp dấu ΔH, ΔS → khi nào tự xảy ra theo T.
7. **Liên hệ**: ΔG° = −RT ln K = −n·F·E°.

**Tiếp theo**: [Lesson 05 — Hydrocarbon](../lesson-05-organic-hydrocarbons/)
