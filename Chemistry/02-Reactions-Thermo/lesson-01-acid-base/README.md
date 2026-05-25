# Lesson 01 (Tier 2) — Acid-Base (Axit-Bazơ)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu 3 định nghĩa acid-base: **Arrhenius** (cho H⁺/OH⁻), **Brønsted-Lowry** (cho/nhận H⁺), **Lewis** (cho/nhận cặp electron) — và biết khi nào dùng định nghĩa nào.
- Nắm khái niệm **cặp acid-base liên hợp** (conjugate acid-base pair).
- Tính được **pH** từ nồng độ H⁺ (và ngược lại), và phân biệt **acid mạnh/yếu**, **base mạnh/yếu** qua **Ka, Kb**.
- Hiểu **tích ion của nước** Kw = 10⁻¹⁴ và mối liên hệ pH + pOH = 14.
- Phân tích **dung dịch đệm (buffer)**: cơ chế chống thay đổi pH, công thức Henderson-Hasselbalch.
- Đọc được **đường chuẩn độ (titration curve)** acid-base và xác định điểm tương đương.

## Kiến thức tiền đề

- [Lesson 07 (T1) — Dung dịch & Nồng độ](../../01-Structure/lesson-07-solutions-concentration/) — biết M, pha loãng.
- [Lesson 08 (T1) — Động học & Cân bằng](../../01-Structure/lesson-08-kinetics-equilibrium/) — biết K cân bằng.

---

## 1. Định nghĩa acid-base

### 1.1. Định nghĩa Arrhenius (1884)

- **Acid**: chất khi hòa tan trong nước tạo ra **H⁺** (proton).
- **Base**: chất khi hòa tan trong nước tạo ra **OH⁻** (hydroxide).

Ví dụ:
- Acid: HCl → H⁺ + Cl⁻; H₂SO₄ → 2H⁺ + SO₄²⁻
- Base: NaOH → Na⁺ + OH⁻; Ca(OH)₂ → Ca²⁺ + 2OH⁻

**Hạn chế**: chỉ áp dụng trong **nước**. Ammonia NH₃ tạo OH⁻ trong nước nhưng không có OH⁻ trong cấu trúc → Arrhenius không đẹp.

### 1.2. Định nghĩa Brønsted-Lowry (1923) — chuẩn nhất

- **Acid**: chất **cho** proton (H⁺).
- **Base**: chất **nhận** proton.

Hoạt động trong mọi dung môi (không chỉ nước). Ví dụ với ammonia:

```
NH₃ + H₂O → NH₄⁺ + OH⁻
(base)  (acid)
```

Ở đây, H₂O cho proton cho NH₃ → H₂O là acid, NH₃ là base.

Trong phản ứng khác:
```
HCl + H₂O → H₃O⁺ + Cl⁻
(acid) (base)
```

H₂O nhận proton → H₂O là base.

**Quan sát**: H₂O có thể vừa là acid vừa là base, tùy đối tác. Gọi là **amphoteric (lưỡng tính)**.

### 1.3. Định nghĩa Lewis (1923) — tổng quát nhất

- **Acid Lewis**: chất **nhận** cặp electron.
- **Base Lewis**: chất **cho** cặp electron.

Mở rộng hơn nữa — cả các phản ứng không có H⁺ vẫn được tính. Ví dụ:
```
BF₃ + NH₃ → F₃B-NH₃
(Lewis acid) (Lewis base)
```

B (thiếu e) nhận cặp e từ N (có lone pair).

### 1.4. Cặp acid-base liên hợp

Trong phản ứng Brønsted: acid cho H⁺ → trở thành **base liên hợp** (conjugate base). Base nhận H⁺ → thành **acid liên hợp** (conjugate acid).

```
HCl + H₂O ⇌ H₃O⁺ + Cl⁻
acid  base   acid    base liên hợp của HCl
              liên hợp của H₂O
```

Cặp liên hợp khác nhau bởi **chính xác 1 proton**:
- HCl / Cl⁻
- H₂O / H₃O⁺
- H₂O / OH⁻
- NH₃ / NH₄⁺

### 📝 Tóm tắt mục 1

- 3 định nghĩa: Arrhenius (H⁺/OH⁻ trong nước) → Brønsted (cho/nhận H⁺) → Lewis (cho/nhận cặp e).
- Cặp liên hợp khác nhau 1 H⁺.
- H₂O lưỡng tính.

---

## 2. pH và tích ion của nước

### 2.1. Tích ion Kw

Nước tự ion hóa rất ít:
```
2H₂O ⇌ H₃O⁺ + OH⁻
```

Hằng số cân bằng (tại 25°C): **Kw = [H⁺][OH⁻] = 10⁻¹⁴**.

Trong nước tinh khiết: [H⁺] = [OH⁻] = √(10⁻¹⁴) = **10⁻⁷ M**.

→ pH của nước tinh khiết = 7 (trung tính).

### 2.2. Định nghĩa pH

```
pH = −log₁₀[H⁺]
pOH = −log₁₀[OH⁻]
pH + pOH = 14 (tại 25°C)
```

Tương tự: pKw = −log Kw = 14.

### 2.3. Thang pH

| pH | Mô tả | Ví dụ |
|----|-------|-------|
| 0 - 3 | Acid mạnh | Acid dạ dày (pH ~ 2), nước chanh (pH ~ 2.5) |
| 4 - 6 | Acid yếu | Cafe (pH ~ 5), nước mưa (pH ~ 5.6) |
| 7 | Trung tính | Nước tinh khiết |
| 8 - 10 | Base yếu | Nước biển (pH ~ 8.1), máu (pH ~ 7.4) |
| 11 - 14 | Base mạnh | Nước rửa chén (pH ~ 11), nước vôi (pH ~ 13) |

**Lưu ý**: thang pH là log → mỗi đơn vị pH = 10 lần chênh [H⁺]. pH 2 ([H⁺] = 0.01) **mạnh gấp 1000 lần** pH 5 ([H⁺] = 10⁻⁵).

### 2.4. Bốn ví dụ tính pH

**Ví dụ 1**: Dung dịch HCl 0.01 M (acid mạnh, phân ly hoàn toàn).
- [H⁺] = 0.01 = 10⁻² M.
- pH = −log(10⁻²) = **2**.

**Ví dụ 2**: Dung dịch NaOH 0.001 M (base mạnh, phân ly hoàn toàn).
- [OH⁻] = 10⁻³ M. pOH = 3. pH = 14 − 3 = **11**.
- Hoặc [H⁺] = Kw / [OH⁻] = 10⁻¹⁴ / 10⁻³ = 10⁻¹¹ M → pH = 11 ✓.

**Ví dụ 3**: Pha loãng HCl từ 1 M xuống 0.001 M (gấp 1000 lần). pH thay đổi?
- pH ban đầu = 0. pH sau = 3. Tăng 3 đơn vị, tương đương pha loãng 10³ = 1000 lần.

**Ví dụ 4**: Dung dịch có pH = 4.5. [H⁺] = ?
- [H⁺] = 10⁻⁴·⁵ ≈ **3.16 × 10⁻⁵ M**.

### 📝 Tóm tắt mục 2

- Kw = [H⁺][OH⁻] = 10⁻¹⁴ ở 25°C.
- pH = −log[H⁺], pH + pOH = 14.
- Mỗi đơn vị pH = 10 lần chênh [H⁺].
- Thang: 0 acid mạnh, 7 trung tính, 14 base mạnh.

---

## 3. Acid yếu, Base yếu — Ka, Kb

### 3.1. Acid mạnh vs Acid yếu

**Acid mạnh** (HCl, HNO₃, H₂SO₄, HClO₄, HBr, HI): phân ly **hoàn toàn** trong nước.
```
HCl → H⁺ + Cl⁻   (mũi tên một chiều, [HCl] còn lại = 0)
```

**Acid yếu** (CH₃COOH, HF, H₂CO₃, NH₄⁺, ...): phân ly **một phần**, có cân bằng.
```
CH₃COOH ⇌ H⁺ + CH₃COO⁻   (cân bằng, hầu hết vẫn ở dạng CH₃COOH)
```

Hằng số phân ly acid:
```
Ka = [H⁺][A⁻] / [HA]
```

**Ka càng lớn → acid càng mạnh.** Ka acid axetic = 1.8 × 10⁻⁵ → khá yếu. Acid mạnh có Ka rất lớn (≥ 1).

**pKa = −log Ka**. pKa nhỏ → acid mạnh. pKa acid axetic = 4.74.

### 3.2. Tương tự cho base

```
Kb = [BH⁺][OH⁻] / [B]
pKb = −log Kb
```

**Liên hệ**: với cặp acid-base liên hợp, **Ka × Kb = Kw = 10⁻¹⁴**. Tức là pKa + pKb = 14.

### 3.3. Bảng Ka các acid yếu thường gặp

| Acid | Ka | pKa |
|------|------|------|
| HF | 6.6 × 10⁻⁴ | 3.18 |
| CH₃COOH (axetic) | 1.8 × 10⁻⁵ | 4.74 |
| H₂CO₃ (carbonic) | 4.3 × 10⁻⁷ | 6.37 |
| H₃PO₄ (đầu tiên) | 7.5 × 10⁻³ | 2.12 |
| NH₄⁺ | 5.6 × 10⁻¹⁰ | 9.25 |

### 3.4. Tính pH của acid yếu

Cho dung dịch CH₃COOH 0.1 M, Ka = 1.8 × 10⁻⁵. Tính pH.

```
CH₃COOH ⇌ H⁺ + CH₃COO⁻
Ban đầu:   0.1        0      0
Phân ly:   −x        +x     +x
Cân bằng:  0.1−x     x      x

Ka = x² / (0.1 − x) = 1.8 × 10⁻⁵
```

Vì x << 0.1 (acid yếu phân ly ít), xấp xỉ 0.1 − x ≈ 0.1:
```
x² / 0.1 = 1.8 × 10⁻⁵
x² = 1.8 × 10⁻⁶
x = 1.34 × 10⁻³ M = [H⁺]
pH = −log(1.34 × 10⁻³) = 2.87
```

Kiểm tra xấp xỉ: x = 0.00134 << 0.1 ✓ (sai số < 2%).

### 📝 Tóm tắt mục 3

- Acid mạnh: phân ly hết. Acid yếu: cân bằng với Ka.
- Ka càng lớn → acid càng mạnh. pKa = −log Ka.
- Tương tự cho base với Kb.
- Cặp liên hợp: Ka × Kb = Kw.

---

## 4. Dung dịch đệm (Buffer)

### 4.1. Định nghĩa

**Dung dịch đệm (buffer)** = dung dịch chống lại thay đổi pH khi thêm acid hoặc base. Thường gồm **acid yếu + muối chứa base liên hợp** (hoặc base yếu + muối chứa acid liên hợp).

Ví dụ điển hình:
- Đệm acetate: CH₃COOH + CH₃COONa (mol acid + mol base liên hợp).
- Đệm phosphate: H₂PO₄⁻ / HPO₄²⁻ (trong tế bào).
- Đệm bicarbonate: H₂CO₃ / HCO₃⁻ (trong máu, giữ pH 7.4).

### 4.2. Cơ chế

Khi thêm H⁺ (acid) vào đệm: base liên hợp hấp thụ.
```
CH₃COO⁻ + H⁺ → CH₃COOH
```

Khi thêm OH⁻ (base): acid yếu trung hòa.
```
CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O
```

→ [H⁺] gần như không đổi → pH ổn định.

### 4.3. Công thức Henderson-Hasselbalch

```
pH = pKa + log([A⁻] / [HA])
```

trong đó [A⁻] là nồng độ base liên hợp, [HA] là nồng độ acid yếu.

**Ví dụ**: Đệm CH₃COOH 0.1 M + CH₃COONa 0.1 M. pKa = 4.74.
- pH = 4.74 + log(0.1 / 0.1) = 4.74 + log(1) = **4.74**.

→ Khi 2 thành phần bằng nhau (1:1), pH = pKa. Đệm tốt nhất khi tỉ lệ gần 1:1.

### 4.4. Đệm trong cơ thể — bicarbonate

Máu giữ pH = 7.4 nhờ đệm bicarbonate:
```
H₂CO₃ ⇌ H⁺ + HCO₃⁻   (pKa = 6.37)
```

Tỉ lệ [HCO₃⁻]/[H₂CO₃] trong máu = 20:1. Tính pH:
- pH = 6.37 + log(20) = 6.37 + 1.30 = **7.67**.

(Thực tế ~ 7.4 do thêm hệ thống đệm protein/phosphate.)

Nếu pH máu < 7.35 → **acidosis** (toan máu); > 7.45 → **alkalosis** (kiềm máu). Cả 2 đều nguy hiểm.

### 📝 Tóm tắt mục 4

- Đệm = acid yếu + base liên hợp (cùng nồng độ ~ tốt nhất).
- Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).
- Cơ thể có đệm bicarbonate giữ pH máu 7.4.

---

## 5. Chuẩn độ acid-base (Titration)

### 5.1. Khái niệm

**Chuẩn độ** = phương pháp xác định nồng độ một dung dịch bằng cách thêm dần dung dịch chuẩn (đã biết nồng độ) cho đến khi phản ứng vừa đủ.

**Phản ứng trung hòa**: acid + base → muối + nước.

Ví dụ: chuẩn độ HCl bằng NaOH:
```
HCl + NaOH → NaCl + H₂O
```

### 5.2. Điểm tương đương vs điểm kết thúc

- **Điểm tương đương (equivalence point)**: lúc số mol H⁺ thêm vào = số mol OH⁻ ban đầu (lý tưởng).
- **Điểm kết thúc (end point)**: lúc chất chỉ thị đổi màu (thực tế đo được).

Hai điểm này thường rất gần nhau (chênh < 0.1 mL) khi chọn chỉ thị đúng.

### 5.3. Đường chuẩn độ

Vẽ pH (trục y) theo thể tích chất chuẩn thêm vào (trục x):

**Chuẩn độ acid mạnh bằng base mạnh** (vd HCl bằng NaOH):
- Bắt đầu: pH thấp (acid).
- pH tăng dần (chậm).
- Gần điểm tương đương: **pH nhảy vọt** (S-curve sharp).
- Tại điểm tương đương: pH = 7 (vì muối NaCl trung tính).
- Sau điểm tương đương: pH tiếp tục tăng (NaOH dư).

**Chuẩn độ acid yếu bằng base mạnh** (vd CH₃COOH bằng NaOH):
- Bắt đầu: pH thấp nhưng > acid mạnh (do phân ly không hoàn toàn).
- Có **vùng đệm** ở giữa (pH thay đổi chậm) — đây là điểm pH = pKa.
- Tại điểm tương đương: pH > 7 (vì muối CH₃COONa là base yếu).

### 5.4. Tính toán chuẩn độ

Điểm tương đương: `n(H⁺) = n(OH⁻)` → `M_acid × V_acid = M_base × V_base` (cho phản ứng 1:1).

**Ví dụ**: Chuẩn độ 25 mL HCl chưa biết nồng độ. Phải dùng 18.5 mL NaOH 0.1 M để đạt điểm tương đương. Tính [HCl].
- M_HCl × 25 = 0.1 × 18.5
- M_HCl = (0.1 × 18.5) / 25 = **0.074 M**.

### 📝 Tóm tắt mục 5

- Chuẩn độ: thêm dần chất chuẩn → biến đổi pH → điểm tương đương.
- HCl + NaOH: pH = 7 tại điểm tương đương.
- Acid yếu + base mạnh: vùng đệm + pH > 7 tại điểm tương đương.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính pH của các dung dịch:
a) HCl 0.05 M
b) NaOH 0.001 M
c) HNO₃ 5 × 10⁻⁴ M
d) Nước cất tại 25°C

**Bài 2**: Một dung dịch có pH = 9.5. Tính [H⁺] và [OH⁻].

**Bài 3**: Cho HF 0.2 M, Ka = 6.6 × 10⁻⁴. Tính pH và % phân ly.

**Bài 4**: Pha đệm gồm 0.2 mol CH₃COOH và 0.1 mol CH₃COONa trong 1 L nước. Tính pH. (pKa = 4.74.)

**Bài 5**: Chuẩn độ 50 mL acid axetic 0.1 M bằng NaOH 0.1 M. Tính:
a) Cần bao nhiêu mL NaOH để đạt điểm tương đương?
b) pH tại điểm khi đã thêm 25 mL NaOH (= 1/2 chặng đường).

**Bài 6**: Vì sao máu duy trì được pH 7.4 ổn định mặc dù chúng ta liên tục tạo ra acid (qua hô hấp tế bào, vận động cơ bắp)?

### Lời giải

**Bài 1**:
a) [H⁺] = 0.05 M → pH = −log(0.05) = **1.30**.
b) [OH⁻] = 0.001 = 10⁻³ → pOH = 3 → pH = 14 − 3 = **11**.
c) [H⁺] = 5 × 10⁻⁴ → pH = −log(5 × 10⁻⁴) = 3.30.
d) [H⁺] = [OH⁻] = 10⁻⁷ → pH = **7.0**.

**Bài 2**: pH = 9.5 → [H⁺] = 10⁻⁹·⁵ ≈ **3.16 × 10⁻¹⁰ M**.
[OH⁻] = Kw/[H⁺] = 10⁻¹⁴ / 3.16 × 10⁻¹⁰ ≈ **3.16 × 10⁻⁵ M**.

**Bài 3**: HF ⇌ H⁺ + F⁻. Đặt x = [H⁺].
- Ka = x² / (0.2 − x) ≈ x²/0.2 = 6.6 × 10⁻⁴.
- x² = 1.32 × 10⁻⁴ → x = 0.01149 M.
- pH = −log(0.01149) = **1.94**.
- % phân ly = 0.01149 / 0.2 × 100% = **5.74%** (phân ly khoảng 6%, đáng kể vì HF tương đối mạnh trong acid yếu).

**Bài 4**: Henderson-Hasselbalch:
- pH = 4.74 + log(0.1 / 0.2) = 4.74 + log(0.5) = 4.74 + (−0.301) = **4.44**.

**Bài 5**:
a) n(acid) = 0.1 × 0.050 = 0.005 mol. Cần n(NaOH) = 0.005 mol → V(NaOH) = 0.005 / 0.1 = 0.050 L = **50 mL**.
b) Sau 25 mL NaOH: đã trung hòa 1/2 acid → còn 1/2 CH₃COOH, có 1/2 CH₃COO⁻. Nồng độ bằng nhau → pH = pKa = **4.74**. (Đây là điểm giữa của đệm).

**Bài 6**: Máu có **hệ đệm bicarbonate** mạnh:
- H₂CO₃ ⇌ H⁺ + HCO₃⁻
- Khi cơ thể tạo H⁺ (từ acid lactic, CO₂...): H⁺ phản ứng với HCO₃⁻ tạo H₂CO₃ → H⁺ "biến mất" → pH ổn định.
- H₂CO₃ → H₂O + CO₂ thở ra qua phổi.
- Tỉ lệ [HCO₃⁻]/[H₂CO₃] = 20:1 → pH = 7.4 ổn định.
- Thận điều chỉnh lượng HCO₃⁻ (thải bớt khi cần).
- Phổi điều chỉnh lượng CO₂ (= H₂CO₃) bằng cách thở nhanh/chậm.

→ Hai cơ chế (phổi + thận) phối hợp giữ pH cực ổn định. Khi mất cân bằng → bệnh.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — Phản ứng Redox](../lesson-02-redox/) — số oxy hóa và cân bằng phản ứng oxy hóa-khử.
- **Liên kết Math**: pH = −log → cần kiến thức logarit, xem [`Math/01-Arithmetic-Algebra/lesson-06`](../../../Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).
- **Liên kết Tier 1 L08**: phương trình đệm là cân bằng động.

---

## 📝 Tổng kết Lesson 01 (Tier 2)

1. **3 định nghĩa acid-base**: Arrhenius → Brønsted (chuẩn) → Lewis (tổng quát).
2. **Cặp liên hợp** khác nhau 1 H⁺.
3. **pH = −log[H⁺]**, pH + pOH = 14. Mỗi đơn vị pH = 10× chênh [H⁺].
4. **Acid mạnh** phân ly hoàn toàn; **acid yếu** có Ka. pKa = −log Ka.
5. **Đệm** = acid yếu + base liên hợp. Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).
6. **Chuẩn độ**: thêm dần chất chuẩn → điểm tương đương. Acid mạnh + base mạnh: pH = 7. Acid yếu + base mạnh: pH > 7.

**Tiếp theo**: [Lesson 02 — Redox](../lesson-02-redox/)
