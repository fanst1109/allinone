// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/01-Structure/lesson-07-solutions-concentration/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Dung dịch & Nồng độ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **dung dịch (solution)** = **chất tan (solute)** + **dung môi (solvent)**, và 3 trạng thái dung dịch (rắn / lỏng / khí).
- Biết **độ tan (solubility)** và yếu tố ảnh hưởng: bản chất chất tan/dung môi, nhiệt độ, áp suất.
- Sử dụng thành thạo 4 loại **nồng độ**: **mol (M)**, **molanity (m)**, **phần trăm khối lượng (% w/w)**, **ppm/ppb**.
- Tính **pha loãng** bằng công thức $C_1 V_1 = C_2 V_2$.
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
- **Không khí**: $\\text{O}_2$ (chất tan ~ 21%) hòa trong $\\text{N}_2$ (dung môi ~ 78%) → dung dịch khí.
- **Hợp kim đồng-thiếc** (đồng thau): Sn hòa trong Cu → dung dịch rắn.

### 1.1. 3 trạng thái dung dịch

| Dung môi | Chất tan | Ví dụ |
|----------|----------|-------|
| Lỏng | Rắn | NaCl trong nước |
| Lỏng | Lỏng | Etanol trong nước (rượu) |
| Lỏng | Khí | $\\text{CO}_2$ trong nước (nước có gas) |
| Rắn | Rắn | Hợp kim |
| Khí | Khí | Không khí |

Trong hóa học phổ thông, ta chủ yếu làm với dung dịch lỏng.

### 1.2. Quá trình hòa tan

Khi NaCl vào nước:
1. Phân tử nước (có cực, có cả $\\delta^+$ ở H và $\\delta^-$ ở O) tiếp cận mạng tinh thể NaCl.
2. $\\delta^-$ của O hút $\\text{Na}^+$; $\\delta^+$ của H hút $\\text{Cl}^-$.
3. Lực hút này thắng lực hút ion-ion trong tinh thể → ion tách rời.
4. Mỗi ion được **bao quanh bởi vài phân tử nước** (hydrate hóa).

→ Kết quả: $\\text{Na}^+\\text{(aq)} + \\text{Cl}^-\\text{(aq)}$, với \`(aq)\` = aqueous (trong nước).

### 1.3. Quy tắc "tương đồng tan tương đồng" (Like dissolves like)

- **Dung môi phân cực** ($\\text{H}_2\\text{O}$, ethanol, ammonia) hòa tan tốt **chất phân cực** (muối ion, đường, ammonia).
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
- **Chất rắn trong nước**: thường tăng độ tan khi T tăng (vd $\\text{KNO}_3$, $\\text{NaNO}_3$). Có ngoại lệ (vd $\\text{Ce}_2(\\text{SO}_4)_3$ giảm khi T tăng).
- **Khí trong nước**: GIẢM độ tan khi T tăng (vì khí thoát ra). Đó là lý do cá khó thở ở nước nóng, và nước nóng để bia sẽ mất gas nhanh.

#### Áp suất
- **Khí trong chất lỏng**: tỉ lệ thuận với áp suất khí (định luật Henry). Đó là lý do nước có gas đóng chai phải nén áp suất cao.
- Chất rắn/lỏng: áp suất ảnh hưởng không đáng kể.

### 2.3. Bốn ví dụ số

**Độ tan NaCl trong nước:**
- 0°C: 35,7 g / 100 g $\\text{H}_2\\text{O}$
- 25°C: 36,0 g / 100 g $\\text{H}_2\\text{O}$
- 100°C: 39,1 g / 100 g $\\text{H}_2\\text{O}$

→ Tăng rất ít theo nhiệt độ.

**Độ tan $\\text{KNO}_3$ trong nước:**
- 0°C: 13,3 g / 100 g
- 25°C: 38 g / 100 g
- 100°C: 247 g / 100 g

→ Tăng cực mạnh theo nhiệt độ. Ứng dụng: kết tinh $\\text{KNO}_3$ tinh khiết bằng cách làm nguội dung dịch nóng bão hòa.

**Độ tan $\\text{O}_2$ trong nước**:
- 0°C: 14,6 mg/L
- 25°C: 8,3 mg/L
- 35°C: 7,0 mg/L

→ Giảm khi nóng. Liên quan trực tiếp đến sinh thái: cá chết do nước nóng (thiếu oxy).

**Độ tan $\\text{CO}_2$ trong nước ở 25°C:**
- 1 atm: 1,45 g/L
- 5 atm: 7,2 g/L (gấp ~ 5 lần khi áp suất tăng 5 lần — định luật Henry).

### 📝 Tóm tắt mục 2

- Độ tan = lượng tối đa hòa được, đến trạng thái bão hòa.
- Chất rắn ↑ T → ↑ tan (thường); khí ↑ T → ↓ tan, ↑ P → ↑ tan.
- "Like dissolves like" — phân cực ↔ phân cực, không cực ↔ không cực.

---

## 3. Các loại nồng độ

### 3.1. Nồng độ mol / Molarity (M)

**Định nghĩa**: số mol chất tan trong **1 lít dung dịch**.

$$C_M = \\dfrac{n}{V}$$
Trong đó:
- $C_M$ = molarity (mol/L), còn ký hiệu M
- $n$ = số mol chất tan
- $V$ = thể tích **dung dịch** (L), KHÔNG phải dung môi

**Ví dụ 1**: Hòa 5,85 g NaCl ($M = 58{,}44$) trong nước, sau đó thêm nước cho đủ 1 L. Tính nồng độ mol.
- $n = 5{,}85 / 58{,}44 = 0{,}100$ mol.
- $C_M = 0{,}100 / 1 =$ **0,100 M** ($= 0{,}1$ mol/L).

**Ví dụ 2**: Pha 0,5 mol HCl vào 250 mL dung dịch. Tính M.
- $C_M = 0{,}5 / 0{,}250 =$ **2,0 M**.

### 3.2. Phần trăm khối lượng (% w/w)

**Định nghĩa**: khối lượng chất tan trên khối lượng tổng dung dịch, biểu diễn %.

$$\\%\\,\\text{w/w} = \\dfrac{m_{\\text{chất tan}}}{m_{\\text{dung dịch}}} \\times 100\\%$$

**Ví dụ**: Pha 20 g muối với 80 g nước. % w/w?
- $m_{\\text{dung dịch}} = 20 + 80 = 100$ g.
- $\\% = \\dfrac{20}{100} \\times 100\\% =$ **20% w/w**.

Lưu ý: m_dung_dịch = m_chất_tan + m_dung_môi, KHÔNG phải chỉ m_dung_môi.

### 3.3. Molality (m)

**Định nghĩa**: số mol chất tan trên **1 kg dung môi** (không phải dung dịch).

$$m = \\dfrac{n_{\\text{chất tan}}}{\\text{kg}_{\\text{dung môi}}}$$

Khác molarity ở chỗ: molality dùng kg dung môi (mass), molarity dùng L dung dịch (volume).

**Lưu ý**: ở dung dịch loãng + nước thường, molality $\\approx$ molarity (vì 1 L $\\text{H}_2\\text{O} \\approx 1$ kg). Ở dung dịch đậm đặc hoặc dung môi khác, khác xa.

Ứng dụng chính của molality: tính sự đông đặc/sôi của dung dịch (vì độc lập với nhiệt độ — thể tích thay đổi theo T, nhưng khối lượng thì không).

### 3.4. ppm và ppb

Dùng cho dung dịch rất loãng (nước uống, không khí ô nhiễm):

- **ppm** (parts per million) = 1 phần triệu $= 10^{-6} = 1$ mg / 1 kg $\\approx 1$ mg / 1 L (nước).
- **ppb** (parts per billion) = 1 phần tỷ $= 10^{-9} = 1\\ \\mu\\text{g}$ / 1 kg.

**Ví dụ**: nước uống tiêu chuẩn cho phép chứa tối đa 10 ppm nitrate ($\\text{NO}_3^-$) = 10 mg $\\text{NO}_3^-$ / L nước.

### 3.5. Chuyển đổi giữa các loại nồng độ

Cho dung dịch NaCl 10% w/w, khối lượng riêng 1,07 g/mL. Tính M.

- Lấy 1 L dung dịch: $V = 1000$ mL, khối lượng $= 1000 \\times 1{,}07 = 1070$ g.
- Khối lượng NaCl $= 10\\% \\times 1070 = 107$ g.
- $n(\\text{NaCl}) = 107 / 58{,}44 = 1{,}831$ mol.
- $C_M = 1{,}831 / 1 =$ **1,83 mol/L**.

### 📝 Tóm tắt mục 3

| Nồng độ | Công thức | Dùng khi |
|---------|-----------|----------|
| Molarity M | mol / L dd | Tính toán phản ứng |
| % w/w | g tan / g dd $\\times 100$ | Dung dịch đậm đặc thương mại |
| Molality m | mol / kg dung môi | Tính sôi/đông đặc |
| ppm/ppb | mg/L hoặc $\\mu$g/L | Dung dịch rất loãng |

---

## 4. Pha loãng

### 4.1. Công thức $C_1 V_1 = C_2 V_2$

Khi thêm dung môi vào dung dịch (không thay đổi lượng chất tan):

$$C_1 V_1 = C_2 V_2$$

trong đó $C_1$, $V_1$ là nồng độ và thể tích ban đầu; $C_2$, $V_2$ sau pha loãng. Số mol chất tan trước và sau bằng nhau ($n = C \\times V = \\text{const}$).

### 4.2. Hai ví dụ pha loãng

**Ví dụ 1**: Có 100 mL HCl 2 M. Thêm bao nhiêu nước để được HCl 0,5 M?
- $C_1 V_1 = C_2 V_2$ → $2 \\times 100 = 0{,}5 \\times V_2$ → $V_2 = 400$ mL.
- Cần thêm $400 - 100 =$ **300 mL nước**.

**Ví dụ 2**: Pha 250 mL dung dịch NaCl 0,1 M từ dung dịch gốc 1 M. Lấy bao nhiêu mL dung dịch gốc?
- $C_1 V_1 = C_2 V_2$ → $1 \\times V_1 = 0{,}1 \\times 250$ → $V_1 =$ **25 mL**.
- Quy trình: lấy 25 mL dung dịch 1 M + thêm nước cho đủ 250 mL → 0,1 M.

### 📝 Tóm tắt mục 4

- Pha loãng giữ nguyên số mol chất tan → $C_1 V_1 = C_2 V_2$.
- Đơn vị thể tích phải đồng nhất ở 2 vế (cả mL hoặc cả L).

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Hòa 11,7 g NaCl trong 200 mL dung dịch. Tính M.

**Bài 2**: Dung dịch axit clohydric thương mại 37% w/w, khối lượng riêng 1,18 g/mL. Tính M.

**Bài 3**: Cần bao nhiêu mL dung dịch NaOH 2 M để pha thành 500 mL dung dịch NaOH 0,1 M?

**Bài 4**: Pha 80 g $\\text{KNO}_3$ trong 200 g nước. Tính: a) % w/w, b) molality (cho $M(\\text{KNO}_3) = 101$).

**Bài 5**: Nước có nồng độ 0,5 ppm flo ($\\text{F}^-$). Trong 2 L nước có bao nhiêu mg $\\text{F}^-$?

**Bài 6**: Để pha 100 mL dung dịch glucose 0,5 M, cần bao nhiêu g glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, M = 180,16)?

### Lời giải

**Bài 1**:
- $n(\\text{NaCl}) = 11{,}7 / 58{,}44 = 0{,}200$ mol.
- $C_M = 0{,}200 / 0{,}200 =$ **1,00 M**.

**Bài 2**:
- 1 L $= 1000$ mL $\\times 1{,}18$ g/mL $= 1180$ g dung dịch.
- $m(\\text{HCl}) = 37\\% \\times 1180 = 436{,}6$ g.
- $n(\\text{HCl}) = 436{,}6 / 36{,}46 = 11{,}98$ mol.
- $C_M =$ **$11{,}98$ mol/L $\\approx 12$ M**.

**Bài 3**: $C_1 V_1 = C_2 V_2$ → $2 \\times V_1 = 0{,}1 \\times 500$ → $V_1 =$ **25 mL**.

**Bài 4**:
a) $m_{\\text{dd}} = 80 + 200 = 280$ g. $\\% = \\dfrac{80}{280} \\times 100\\% =$ **28,57% w/w**.
b) $n(\\text{KNO}_3) = 80 / 101 = 0{,}792$ mol. kg dung môi $= 0{,}2$ kg. $m = 0{,}792 / 0{,}2 =$ **3,96 mol/kg**.

**Bài 5**: $0{,}5$ ppm $= 0{,}5$ mg/L. Trong 2 L: $2 \\times 0{,}5 =$ **1 mg $\\text{F}^-$**.

**Bài 6**:
- $n = C_M \\times V = 0{,}5 \\times 0{,}1 = 0{,}05$ mol.
- $m = n \\times M(\\text{glucose}) = 0{,}05 \\times 180{,}16 =$ **9,01 g**.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Động học & cân bằng](../lesson-08-kinetics-equilibrium/) — tốc độ phản ứng và trạng thái cân bằng.
- **Liên kết Tier 2**: nồng độ là cơ sở để học acid-base (pH), điện hóa, chuẩn độ trong Tier 2.

---

## 📝 Tổng kết Lesson 07

1. **Dung dịch** = chất tan + dung môi đồng nhất. "Like dissolves like".
2. **Độ tan**: lượng tối đa hòa được. Chất rắn ↑ T → ↑ tan; khí ↑ T → ↓ tan, ↑ P → ↑ tan.
3. **4 loại nồng độ**:
   - **Molarity M** $= \\dfrac{n}{V_{\\text{dd}}}$ → tính phản ứng.
   - **% w/w** $= \\dfrac{m_{\\text{tan}}}{m_{\\text{dd}}} \\times 100$ → đậm đặc thương mại.
   - **Molality m** $= \\dfrac{n}{\\text{kg}_{\\text{dung môi}}}$ → tính sôi/đông đặc.
   - **ppm** = mg/L → loãng.
4. **Pha loãng**: $C_1 V_1 = C_2 V_2$ (giữ nguyên mol).

**Tiếp theo**: [Lesson 08 — Động học & cân bằng](../lesson-08-kinetics-equilibrium/)
`;
