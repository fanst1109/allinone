# Lesson 06 — Mol & Phản ứng (Stoichiometry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **mol** — đơn vị "đếm" cơ bản trong hóa học — và **số Avogadro** $N_A \approx 6{,}022 \times 10^{23}$.
- Tính được **khối lượng mol (M)** của bất kỳ chất nào từ khối lượng nguyên tử trong bảng tuần hoàn.
- Chuyển đổi thành thạo giữa 3 đại lượng: **số gam ↔ số mol ↔ số phân tử**.
- **Cân bằng** phương trình hóa học bằng phương pháp đại số / xét nguyên tử.
- Làm bài toán **stoichiometry**: cho khối lượng chất A → tính khối lượng chất B.
- Hiểu khái niệm **limiting reagent** (chất phản ứng hết) và **% yield** (hiệu suất).

## Kiến thức tiền đề

- [Lesson 01 — Cấu trúc nguyên tử](../lesson-01-atom-structure/) — biết khối lượng nguyên tử.
- Toán tỉ lệ và phương trình tuyến tính ([`Math/01-Arithmetic-Algebra/lesson-03`](../../../Math/01-Arithmetic-Algebra/lesson-03-linear-equations/) — chưa triển khai nhưng kiến thức cấp 2 là đủ).

---

## 1. Mol là gì?

### 💡 Trực giác / Hình dung

Trong đời sống, ta đếm **theo đơn vị**:
- 1 **tá** = 12 → "1 tá trứng".
- 1 **gross** = 144 → đơn vị bán sỉ.
- 1 **ream** = 500 tờ giấy.

Trong hóa học, **1 mol $= 6{,}022 \times 10^{23}$ hạt** (nguyên tử, phân tử, ion, electron — tùy ngữ cảnh). Số này gọi là **số Avogadro $N_A$**.

Lý do chọn con số này: 1 mol nguyên tử $^{12}\text{C}$ nặng đúng **12 gam**. Khi đó khối lượng mol (gam) = khối lượng nguyên tử trung bình (u). Đây là **cầu nối** giữa thế giới vi mô (đếm hạt) và vĩ mô (cân khối lượng).

### 1.1. Định nghĩa chính thức

**1 mol** = số nguyên tử có trong **đúng 12 gam của $^{12}\text{C}$** = **$6{,}022 \times 10^{23}$ hạt** (số Avogadro $N_A$).

💡 **Vì sao chọn con số kỳ cục $6{,}022 \times 10^{23}$?** Không phải chọn ngẫu nhiên. Số này được "thiết kế" sao cho có một tính chất cực kỳ tiện lợi sau:

> **Khi cân được số gam của một chất ĐÚNG BẰNG số khối lượng nguyên tử/phân tử của nó (tính bằng u), bạn có chính xác 1 mol $= 6{,}022 \times 10^{23}$ hạt.**

Ví dụ trực tiếp:
- $^{12}\text{C}$ có khối lượng 12 u → cân 12 gam $^{12}\text{C}$ → có đúng 1 mol $= 6{,}022 \times 10^{23}$ nguyên tử C.
- O có khối lượng nguyên tử 16 u → cân 16 gam O → 1 mol $= 6{,}022 \times 10^{23}$ nguyên tử O.
- $\text{H}_2\text{O}$ có khối lượng phân tử 18 u → cân 18 gam $\text{H}_2\text{O}$ → 1 mol $= 6{,}022 \times 10^{23}$ phân tử $\text{H}_2\text{O}$.

→ **Mol là cầu nối giữa số u (vi mô, đếm hạt) và số gam (vĩ mô, cân được trên cân điện tử).** Không có mol, hóa học sẽ phải đếm từng phân tử riêng — bất khả thi.

### 1.2. Khối lượng mol M (g/mol)

**Khối lượng mol M của một chất** = khối lượng của 1 mol chất đó (tính bằng gam). Theo "phép thuật" ở §1.1, **M (g/mol) có trị số bằng khối lượng nguyên tử/phân tử (u)**.

**Ví dụ tính khối lượng mol:**

| Chất | Công thức | M (g/mol) | Tính |
|------|-----------|-----------|------|
| Hydrogen (nguyên tử) | $\text{H}$ | 1,008 | từ bảng tuần hoàn |
| Hydrogen (phân tử) | $\text{H}_2$ | 2,016 | $2 \times 1{,}008$ |
| Nước | $\text{H}_2\text{O}$ | 18,015 | $2 \times 1{,}008 + 15{,}999$ |
| Carbon dioxide | $\text{CO}_2$ | 44,01 | $12{,}011 + 2 \times 15{,}999$ |
| Glucose | $\text{C}_6\text{H}_{12}\text{O}_6$ | 180,16 | $6 \times 12{,}011 + 12 \times 1{,}008 + 6 \times 15{,}999$ |
| Sulfuric acid | $\text{H}_2\text{SO}_4$ | 98,08 | $2 \times 1{,}008 + 32{,}06 + 4 \times 15{,}999$ |

### 1.3. Ba công thức chuyển đổi

$$n = \dfrac{m}{M} \qquad (n: \text{số mol},\ m: \text{khối lượng (g)},\ M: \text{khối lượng mol (g/mol)})$$

$$N = n \times N_A \qquad (N: \text{số hạt};\ N_A = 6{,}022 \times 10^{23})$$

$$m = n \times M \qquad (\text{đảo lại})$$

### 1.4. Bốn ví dụ chuyển đổi

**Ví dụ 1 — Cho 36 g $\text{H}_2\text{O}$, tính số mol và số phân tử.**
- $n = m / M = 36 / 18{,}015 =$ **2,00 mol**.
- $N = n \times N_A = 2 \times 6{,}022 \times 10^{23} =$ **$1{,}20 \times 10^{24}$ phân tử**.

**Ví dụ 2 — 0,5 mol NaCl nặng bao nhiêu gam?** ($M(\text{NaCl}) = 22{,}99 + 35{,}45 = 58{,}44$ g/mol)
- $m = n \times M = 0{,}5 \times 58{,}44 =$ **29,22 g**.

**Ví dụ 3 — 1 cốc nước (250 mL ≈ 250 g): bao nhiêu phân tử $\text{H}_2\text{O}$?**
- $n = 250 / 18 \approx$ **13,89 mol**.
- $N = 13{,}89 \times 6{,}022 \times 10^{23} \approx$ **$8{,}36 \times 10^{24}$ phân tử**.
- (Tức là 8 triệu triệu triệu triệu phân tử — nhiều hơn số hạt cát trên Trái Đất.)

**Ví dụ 4 — Cho 0,250 mol Fe, tính khối lượng và số nguyên tử.** ($M(\text{Fe}) = 55{,}85$)
- $m = 0{,}250 \times 55{,}85 =$ **13,96 g**.
- $N = 0{,}250 \times 6{,}022 \times 10^{23} \approx$ **$1{,}506 \times 10^{23}$ nguyên tử**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sao biết $N_A = 6{,}022 \times 10^{23}$? Đếm tay được không?**
A: Không thể đếm tay — quá nhiều. Phương pháp đo: dùng tinh thể silicon đơn tinh thể, đo chính xác kích thước ô đơn vị (X-ray), từ đó tính được số nguyên tử $\text{Si}/\text{cm}^3$. Cân được 28 g Si (= 1 mol theo định nghĩa cũ) thì biết được $N_A$. Năm 2019, định nghĩa SI mới đã cố định $N_A = 6{,}02214076 \times 10^{23}$ (định nghĩa, không phải đo).

**Q: Vì sao chọn 12 g $^{12}\text{C}$ làm chuẩn?**
A: Trước đây dùng oxygen làm chuẩn (1 mol $\text{O}_2$ = 32 g). Năm 1961, đổi sang $^{12}\text{C}$ vì C dễ tinh chế hơn, đo khối lượng chính xác hơn bằng phổ khối. Lựa chọn 12 (không phải 1) vì u được định nghĩa $= 1/12$ khối lượng $^{12}\text{C}$ — duy trì tính tự nhất quán.

### 📝 Tóm tắt mục 1

- 1 mol $= N_A = 6{,}022 \times 10^{23}$ hạt.
- Khối lượng mol (g/mol) = số bằng khối lượng nguyên tử/phân tử (u).
- 3 công thức: $n = \dfrac{m}{M}$, $m = n \cdot M$, $N = n \cdot N_A$.

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

Skeleton: $\text{CH}_4 + \text{O}_2 \rightarrow \text{CO}_2 + \text{H}_2\text{O}$

Đếm:
| Nguyên tố | Trái | Phải |
|-----------|------|------|
| C | 1 | 1 |
| H | 4 | 2 |
| O | 2 | 3 |

- C đã cân bằng.
- H: vế trái 4, vế phải 2 → thêm hệ số 2 vào $\text{H}_2\text{O}$: $\text{CH}_4 + \text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$. Bây giờ vế phải có 4 H ✓.
- O: vế trái 2, vế phải $2 + 2 \times 1 = 4$ → thêm hệ số 2 vào $\text{O}_2$: $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$. Vế trái 4 O ✓.

Kết quả: $$\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$$

#### Ví dụ 2 — Tạo nước

Skeleton: $\text{H}_2 + \text{O}_2 \rightarrow \text{H}_2\text{O}$
- H: 2 vs 2 ✓.
- O: 2 vs 1. Thêm hệ số 2 cho $\text{H}_2\text{O}$: $\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$. Bây giờ vế phải có 4 H → vế trái phải có 4 H → thêm hệ số 2 cho $\text{H}_2$.
- $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$ ✓.

#### Ví dụ 3 — Đốt sắt

Skeleton: $\text{Fe} + \text{O}_2 \rightarrow \text{Fe}_2\text{O}_3$
- Fe: 1 vs 2. Thêm hệ số 2 cho Fe trái: $2\text{Fe} + \text{O}_2 \rightarrow \text{Fe}_2\text{O}_3$.
- O: 2 vs 3. LCM(2, 3) = 6. Thêm hệ số 3 cho $\text{O}_2$ và 2 cho $\text{Fe}_2\text{O}_3$: $4\text{Fe} + 3\text{O}_2 \rightarrow 2\text{Fe}_2\text{O}_3$. (Phải nhân Fe trái lên 4 để khớp $2 \times 2 = 4$ Fe vế phải.)
- Kiểm tra: Fe (4 = 4 ✓), O (6 = 6 ✓).

Kết quả: $$4\text{Fe} + 3\text{O}_2 \rightarrow 2\text{Fe}_2\text{O}_3$$

#### Ví dụ 4 — Trung hòa acid-base

Skeleton: $\text{H}_2\text{SO}_4 + \text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + \text{H}_2\text{O}$
- Na: 1 vs 2. Thêm hệ số 2 cho NaOH: $\text{H}_2\text{SO}_4 + 2\text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + \text{H}_2\text{O}$.
- S: 1 vs 1 ✓.
- O: $4 + 2 = 6$ vs $4 + 1 = 5$. Thêm hệ số 2 cho $\text{H}_2\text{O}$: $\text{H}_2\text{SO}_4 + 2\text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + 2\text{H}_2\text{O}$.
- H: $2 + 2 = 4$ vs 4 ✓. O: $4 + 2 = 6$ vs $4 + 2 = 6$ ✓.

Kết quả: $$\text{H}_2\text{SO}_4 + 2\text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + 2\text{H}_2\text{O}$$

### ⚠ Lỗi thường gặp

- **Đổi chỉ số dưới**: SAI tuyệt đối. $\text{H}_2\text{O} \rightarrow \text{H}_3\text{O}$ không phải "thêm 1 H" — đó là chất khác!
- **Quên kiểm tra lại**: phải đếm lại mọi nguyên tố sau khi xong.
- **Không tối giản hệ số**: nếu cuối cùng tất cả hệ số chia hết cho 2, phải tối giản. Vd $4\text{H}_2 + 2\text{O}_2 \rightarrow 4\text{H}_2\text{O}$ → đáp án đúng là $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$.

### 📝 Tóm tắt mục 2

- Cân bằng = đảm bảo số nguyên tử mỗi nguyên tố bằng nhau ở 2 vế.
- Quy trình: liệt kê → chỉnh hệ số → kiểm tra.
- Bắt đầu từ nguyên tố ít → O, H sau cùng.

---

## 3. Bài toán Stoichiometry

### 3.1. Quy trình tổng quát

Cho phương trình cân bằng, biết khối lượng/mol chất A → tìm khối lượng/mol chất B:

1. Cân bằng phương trình (nếu chưa).
2. Đổi A từ gam → mol: $n_A = \dfrac{m_A}{M_A}$.
3. Dùng **tỉ lệ mol** từ phương trình: $n_B = n_A \times \dfrac{\text{hệ số B}}{\text{hệ số A}}$.
4. Đổi B từ mol → gam: $m_B = n_B \times M_B$.

### 3.2. Walk-through stoichiometry — 2 ví dụ

#### Ví dụ 1 — Đốt 10 g methane, thu được bao nhiêu gam $\text{CO}_2$?

Phương trình: $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$

- $M(\text{CH}_4) = 16{,}04$ g/mol; $M(\text{CO}_2) = 44{,}01$ g/mol.
- $n(\text{CH}_4) = 10 / 16{,}04 =$ **0,623 mol**.
- Tỉ lệ: 1 mol $\text{CH}_4$ → 1 mol $\text{CO}_2$ → $n(\text{CO}_2) = 0{,}623$ mol.
- $m(\text{CO}_2) = 0{,}623 \times 44{,}01 =$ **27,43 g**.

#### Ví dụ 2 — Cho 5 g Fe phản ứng với $\text{O}_2$ dư. Tính khối lượng $\text{Fe}_2\text{O}_3$ thu được.

Phương trình: $4\text{Fe} + 3\text{O}_2 \rightarrow 2\text{Fe}_2\text{O}_3$

- $M(\text{Fe}) = 55{,}85$; $M(\text{Fe}_2\text{O}_3) = 2 \times 55{,}85 + 3 \times 16{,}00 = 159{,}70$ g/mol.
- $n(\text{Fe}) = 5 / 55{,}85 =$ **0,0895 mol**.
- Tỉ lệ: 4 mol Fe → 2 mol $\text{Fe}_2\text{O}_3$ → $n(\text{Fe}_2\text{O}_3) = 0{,}0895 \times (2/4) =$ **0,0448 mol**.
- $m(\text{Fe}_2\text{O}_3) = 0{,}0448 \times 159{,}70 =$ **7,15 g**.

Kiểm tra bảo toàn khối lượng: $m(\text{Fe}) + m(\text{O đã dùng}) = m(\text{Fe}_2\text{O}_3)$. $m(\text{O đã dùng}) = 7{,}15 - 5 = 2{,}15$ g. $n(\text{O}_2 \text{ đã dùng}) = 0{,}0895 \times (3/4) = 0{,}0671$ mol → $m(\text{O}_2) = 0{,}0671 \times 32 = 2{,}15$ g ✓.

### 3.3. Limiting Reagent — chất phản ứng hết

Khi cho cả 2 chất phản ứng (không phải dư 1), chất nào hết trước là **limiting reagent**, quyết định lượng sản phẩm.

**Ví dụ — Cho 4 g $\text{H}_2$ + 32 g $\text{O}_2$. Tính lượng nước tạo thành. Chất nào dư?**

Phương trình: $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$

- $n(\text{H}_2) = 4 / 2{,}016 = 1{,}984$ mol.
- $n(\text{O}_2) = 32 / 32{,}00 = 1{,}000$ mol.
- Theo phương trình: 2 mol $\text{H}_2$ cần 1 mol $\text{O}_2$. Có $1{,}984$ mol $\text{H}_2$ → cần $0{,}992$ mol $\text{O}_2$. Mà có sẵn $1{,}000$ mol $\text{O}_2$ → đủ dùng, dư một ít.
- → **$\text{H}_2$ là limiting reagent** (gần như vừa đủ, nhưng dư nhẹ $\text{O}_2$).
- $n(\text{H}_2\text{O}) = n(\text{H}_2) = 1{,}984$ mol → $m(\text{H}_2\text{O}) = 1{,}984 \times 18 =$ **35,7 g**.
- $\text{O}_2$ dư $= 1{,}000 - 0{,}992 = 0{,}008$ mol $= 0{,}256$ g.

### 3.4. Hiệu suất phản ứng (% yield)

Trong thực tế, phản ứng không bao giờ chạy 100%. $$\%\,\text{yield} = \dfrac{\text{lượng thực tế thu được}}{\text{lượng lý thuyết}} \times 100\%$$

**Ví dụ**: Lý thuyết tính được $27{,}43$ g $\text{CO}_2$, thực tế đo được 25 g. Hiệu suất $= \dfrac{25}{27{,}43} \times 100\% =$ **91,1%**.

### 📝 Tóm tắt mục 3

- Quy trình 4 bước: gam → mol → mol (tỉ lệ) → gam.
- Limiting reagent: chất hết trước, quyết định sản phẩm.
- $\%\,\text{yield} = \dfrac{\text{thực tế}}{\text{lý thuyết}} \times 100\%$.

---

## 4. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính khối lượng mol của các chất: $\text{H}_2\text{SO}_4$, $\text{NaCl}$, $\text{Al}_2(\text{SO}_4)_3$, $\text{C}_{12}\text{H}_{22}\text{O}_{11}$ (đường saccharose), $\text{Ca(OH)}_2$. (Dùng $M(\text{H})=1{,}01$, $M(\text{C})=12{,}01$, $M(\text{N})=14{,}01$, $M(\text{O})=16{,}00$, $M(\text{Na})=22{,}99$, $M(\text{Al})=26{,}98$, $M(\text{S})=32{,}06$, $M(\text{Cl})=35{,}45$, $M(\text{Ca})=40{,}08$.)

**Bài 2**: 4,5 g nước chứa bao nhiêu mol? Bao nhiêu phân tử?

**Bài 3**: Cân bằng các phương trình sau:
a) $\text{Al} + \text{HCl} \rightarrow \text{AlCl}_3 + \text{H}_2$
b) $\text{Ca(OH)}_2 + \text{HCl} \rightarrow \text{CaCl}_2 + \text{H}_2\text{O}$
c) $\text{KMnO}_4 + \text{HCl} \rightarrow \text{KCl} + \text{MnCl}_2 + \text{Cl}_2 + \text{H}_2\text{O}$

**Bài 4**: Đốt 11,5 g rượu etylic ($\text{C}_2\text{H}_5\text{OH}$, M = 46) hoàn toàn trong $\text{O}_2$ dư. Tính khối lượng $\text{CO}_2$ và $\text{H}_2\text{O}$ tạo thành.
- Phương trình: $\text{C}_2\text{H}_5\text{OH} + 3\text{O}_2 \rightarrow 2\text{CO}_2 + 3\text{H}_2\text{O}$.

**Bài 5**: Cho 5,4 g Al phản ứng với 7,3 g HCl. Tính khối lượng $\text{AlCl}_3$ tạo thành và chất nào dư?
- Phương trình: $2\text{Al} + 6\text{HCl} \rightarrow 2\text{AlCl}_3 + 3\text{H}_2$. ($M(\text{Al})=27$, $M(\text{HCl})=36{,}5$, $M(\text{AlCl}_3)=133{,}5$.)

**Bài 6**: Một phản ứng có hiệu suất 85%. Tính lượng sản phẩm lý thuyết nếu thực tế thu được 17 g.

### Lời giải

**Bài 1**:
- $M(\text{H}_2\text{SO}_4) = 2 \times 1{,}01 + 32{,}06 + 4 \times 16{,}00 =$ **98,08 g/mol**.
- $M(\text{NaCl}) = 22{,}99 + 35{,}45 =$ **58,44 g/mol**.
- $M(\text{Al}_2(\text{SO}_4)_3) = 2 \times 26{,}98 + 3 \times (32{,}06 + 4 \times 16) = 53{,}96 + 3 \times 96{,}06 = 53{,}96 + 288{,}18 =$ **342,14 g/mol**.
- $M(\text{C}_{12}\text{H}_{22}\text{O}_{11}) = 12 \times 12{,}01 + 22 \times 1{,}01 + 11 \times 16 = 144{,}12 + 22{,}22 + 176 =$ **342,34 g/mol**.
- $M(\text{Ca(OH)}_2) = 40{,}08 + 2 \times (16 + 1{,}01) = 40{,}08 + 34{,}02 =$ **74,10 g/mol**.

**Bài 2**: 
- $n = 4{,}5 / 18{,}02 =$ **0,250 mol**.
- $N = 0{,}250 \times 6{,}022 \times 10^{23} =$ **$1{,}51 \times 10^{23}$ phân tử**.

**Bài 3**:

a) $2\text{Al} + 6\text{HCl} \rightarrow 2\text{AlCl}_3 + 3\text{H}_2$
- Al: 2=2 ✓; Cl: 6=6 ✓; H: 6=6 ✓.

b) $\text{Ca(OH)}_2 + 2\text{HCl} \rightarrow \text{CaCl}_2 + 2\text{H}_2\text{O}$
- Ca: 1=1; Cl: 2=2; O: 2=2; H: 2+2=4=4 ✓.

c) $2\text{KMnO}_4 + 16\text{HCl} \rightarrow 2\text{KCl} + 2\text{MnCl}_2 + 5\text{Cl}_2 + 8\text{H}_2\text{O}$
- K: 2=2; Mn: 2=2; O: 8=8 (= 8 $\text{H}_2\text{O}$); H: 16=16; Cl: 16 = 2 + 4 + 10 = 16 ✓.

**Bài 4**: 
- $n(\text{C}_2\text{H}_5\text{OH}) = 11{,}5 / 46 =$ **0,25 mol**.
- Tỉ lệ: 1 mol etanol → 2 mol $\text{CO}_2$ + 3 mol $\text{H}_2\text{O}$.
- $n(\text{CO}_2) = 0{,}25 \times 2 = 0{,}50$ mol → $m(\text{CO}_2) = 0{,}50 \times 44 =$ **22 g**.
- $n(\text{H}_2\text{O}) = 0{,}25 \times 3 = 0{,}75$ mol → $m(\text{H}_2\text{O}) = 0{,}75 \times 18 =$ **13,5 g**.
- Kiểm tra: $11{,}5$ g etanol $+ n(\text{O}_2) \times 32 = 22 + 13{,}5$. $n(\text{O}_2) = 0{,}25 \times 3 = 0{,}75$ mol → $m(\text{O}_2) = 24$ g. $11{,}5 + 24 = 35{,}5 = 22 + 13{,}5$ ✓.

**Bài 5**:
- $n(\text{Al}) = 5{,}4 / 27 =$ **0,20 mol**.
- $n(\text{HCl}) = 7{,}3 / 36{,}5 =$ **0,20 mol**.
- Theo phương trình: 2 Al cần 6 HCl → $0{,}20$ mol Al cần $0{,}60$ mol HCl. Chỉ có $0{,}20$ mol HCl → HCl thiếu nhiều. **HCl là limiting reagent**.
- Theo HCl: 6 HCl → 2 $\text{AlCl}_3$ → $0{,}20$ mol HCl → $0{,}20/3 = 0{,}0667$ mol $\text{AlCl}_3$.
- $m(\text{AlCl}_3) = 0{,}0667 \times 133{,}5 =$ **8,90 g**.
- Al dư $= 0{,}20 - (0{,}20 \times 2/6) = 0{,}20 - 0{,}0667 = 0{,}1333$ mol $=$ **3,6 g Al dư**.

**Bài 6**: $17$ g thực tế $/ 85\% \times 100\% = 17 / 0{,}85 =$ **20 g lý thuyết**.

---

## 5. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 07 — Dung dịch & nồng độ](../lesson-07-solutions-concentration/) — nồng độ, pha loãng, độ tan.
- **Liên kết Math**: bài toán tỉ lệ và phương trình → [`Math/01-Arithmetic-Algebra/lesson-03`](../../../Math/01-Arithmetic-Algebra/lesson-03-linear-equations/).
- **Ứng dụng**: bài toán mol là kỹ năng nền cho mọi tính toán hóa học sau (acid-base, redox, nhiệt động).

---

## 📝 Tổng kết Lesson 06

1. **Mol** $= 6{,}022 \times 10^{23}$ hạt (số Avogadro $N_A$), cầu nối vi mô ↔ vĩ mô.
2. **Khối lượng mol M (g/mol)** = số bằng khối lượng phân tử (u).
3. **3 công thức**: $n = \dfrac{m}{M}$, $m = n \cdot M$, $N = n \cdot N_A$.
4. **Cân bằng phương trình**: số nguyên tử mỗi nguyên tố ở 2 vế phải bằng nhau (Lavoisier).
5. **Stoichiometry**: gam → mol → mol (tỉ lệ) → gam.
6. **Limiting reagent**: chất phản ứng hết trước, quyết định lượng sản phẩm.
7. **$\%\,\text{yield} = \dfrac{\text{thực tế}}{\text{lý thuyết}} \times 100\%$**.

**Tiếp theo**: [Lesson 07 — Dung dịch & nồng độ](../lesson-07-solutions-concentration/)
