# Lesson 03 (Tier 2) — Điện hóa (Electrochemistry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **pin galvanic (Voltaic cell)**: biến phản ứng redox **tự xảy ra** thành **dòng điện**.
- Phân biệt **anode** (oxy hóa, cực âm trong pin) và **cathode** (khử, cực dương trong pin).
- Đọc **bảng thế điện cực chuẩn (E°)** và tính **sức điện động pin** `E°cell = E°cathode − E°anode`.
- Dự đoán chiều phản ứng redox tự nhiên (E°cell > 0 → tự xảy ra).
- Hiểu **điện phân (electrolysis)**: dùng dòng điện **bắt buộc** phản ứng redox không tự xảy ra.
- Áp dụng **định luật Faraday** để tính khối lượng chất tạo ra/tiêu thụ khi điện phân: `m = (I·t·M) / (n·F)`.

## Kiến thức tiền đề

- [Lesson 02 (T2) — Redox](../lesson-02-redox/) — biết oxy hóa, khử, cân bằng nửa phản ứng.
- [Physics — Mạch điện](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/) — biết dòng điện, hiệu điện thế (chưa triển khai, kiến thức cơ bản đủ).

---

## 1. Pin Galvanic — Biến hóa năng thành điện năng

### 💡 Trực giác / Hình dung

Nhớ phản ứng `Zn + CuSO₄ → ZnSO₄ + Cu` (Lesson 02, Bài 6): Zn tan dần, Cu bám lên thanh kẽm. Khi 2 chất tiếp xúc trực tiếp, electron chuyển từ Zn sang Cu²⁺ **tại bề mặt** → tỏa nhiệt, **không** tạo dòng điện sử dụng được.

**Ý tưởng pin galvanic**: tách 2 phản ứng ra 2 ngăn riêng, nối bằng dây dẫn. Electron buộc phải chạy qua dây ngoài → **tạo dòng điện**.

### 1.1. Cấu tạo pin Daniell (Zn-Cu)

```
   anode (−)                          cathode (+)
   Zn rod                             Cu rod
       |                                |
       |── electron chạy ngoài ──→     |
       |                                |
   ZnSO₄ (1 M)  ←── cầu muối ──→   CuSO₄ (1 M)
                  (KCl hoặc NH₄NO₃)
```

- **Anode** (cực âm trong pin galvanic, được ký hiệu −): Zn bị oxy hóa, mất e.
  ```
  Zn(s) → Zn²⁺(aq) + 2e⁻       (E° = −0.76 V)
  ```
- **Cathode** (cực dương, +): Cu²⁺ bị khử, nhận e.
  ```
  Cu²⁺(aq) + 2e⁻ → Cu(s)       (E° = +0.34 V)
  ```
- **Cầu muối**: dòng ion lưu thông giữa 2 ngăn để cân bằng điện tích — không có nó, mỗi ngăn sẽ tích lũy điện tích → pin ngừng hoạt động.

**Phản ứng tổng**: Zn + Cu²⁺ → Zn²⁺ + Cu. Sức điện động (EMF): **E°cell = 0.34 − (−0.76) = 1.10 V**.

### ⚠ Lỗi thường gặp

- **Nhầm anode/cathode**: Trong **pin galvanic**: anode = cực ÂM, cathode = cực DƯƠNG. Trong **điện phân**: ngược lại — anode = cực DƯƠNG, cathode = cực ÂM. Cùng chữ "anode" nhưng dấu khác nhau!
- **Quên cầu muối**: pin không có cầu muối sẽ ngừng trong vài giây. Cầu muối quan trọng như dây ngoài.

### 1.2. Quy ước ký hiệu pin

Pin Daniell viết: `Zn(s) | Zn²⁺(1 M) || Cu²⁺(1 M) | Cu(s)`

- Dấu `|` ngăn cách giữa pha rắn và pha lỏng (cùng điện cực).
- Dấu `||` ngăn cách giữa 2 ngăn (cầu muối).
- Quy ước: anode (oxy hóa) ở **bên trái**, cathode (khử) ở **bên phải**.

### 📝 Tóm tắt mục 1

- Pin galvanic = redox tự xảy ra → dòng điện.
- Anode (−): oxy hóa (mất e). Cathode (+): khử (nhận e).
- Electron chạy ngoài: anode → cathode. Cation chạy trong cầu muối về cathode.
- EMF = E°cathode − E°anode.

---

## 2. Bảng thế điện cực chuẩn E°

### 2.1. Định nghĩa

**Thế điện cực chuẩn E°** = thế tự nhiên của một nửa phản ứng khử, đo so với **điện cực hydrogen chuẩn (SHE)** (quy ước E° = 0).

Tất cả nửa phản ứng được viết dưới dạng khử (reduction): `Ox + n e⁻ → Red`. E° cho biết "mức độ ưu tiên" của nửa phản ứng khử đó.

### 2.2. Bảng E° chọn lọc (tại 25°C, 1 M, 1 atm)

| Nửa phản ứng khử | E° (V) |
|------------------|--------|
| F₂ + 2e⁻ → 2F⁻ | +2.87 (oxy hóa MẠNH nhất) |
| Au³⁺ + 3e⁻ → Au | +1.50 |
| Cl₂ + 2e⁻ → 2Cl⁻ | +1.36 |
| O₂ + 4H⁺ + 4e⁻ → 2H₂O | +1.23 |
| Ag⁺ + e⁻ → Ag | +0.80 |
| Fe³⁺ + e⁻ → Fe²⁺ | +0.77 |
| Cu²⁺ + 2e⁻ → Cu | +0.34 |
| **2H⁺ + 2e⁻ → H₂** | **0.00** (chuẩn SHE) |
| Pb²⁺ + 2e⁻ → Pb | −0.13 |
| Sn²⁺ + 2e⁻ → Sn | −0.14 |
| Ni²⁺ + 2e⁻ → Ni | −0.25 |
| Fe²⁺ + 2e⁻ → Fe | −0.44 |
| Zn²⁺ + 2e⁻ → Zn | −0.76 |
| Al³⁺ + 3e⁻ → Al | −1.66 |
| Mg²⁺ + 2e⁻ → Mg | −2.37 |
| Na⁺ + e⁻ → Na | −2.71 |
| K⁺ + e⁻ → K | −2.93 |
| Li⁺ + e⁻ → Li | −3.04 (khử MẠNH nhất) |

### 2.3. Ý nghĩa

- **E° càng dương → càng dễ nhận e (oxy hóa mạnh)** → bị khử. F₂ là oxy hóa mạnh nhất.
- **E° càng âm → càng dễ mất e (khử mạnh)** → bị oxy hóa. Li là khử mạnh nhất.

Bảng này tương đương "dãy hoạt động kim loại" trong sách phổ thông: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Au. Kim loại đứng trước (E° âm hơn) **đẩy** kim loại đứng sau ra khỏi muối.

### 2.4. Tính E°cell

Cho 2 nửa phản ứng (cả 2 viết dưới dạng khử):
```
E°cell = E°cathode − E°anode
```

trong đó:
- E°cathode = E° của nửa khử (nửa nhận e).
- E°anode = E° của nửa **bị oxy hóa** (vẫn lấy E° từ dạng khử, không đổi dấu, không nhân hệ số).

**Pin Daniell**:
- Cathode: Cu²⁺/Cu, E° = +0.34 V.
- Anode: Zn²⁺/Zn, E° = −0.76 V.
- E°cell = 0.34 − (−0.76) = **+1.10 V**.

**E°cell > 0 → phản ứng tự xảy ra (spontaneous)**.
**E°cell < 0 → không tự xảy ra; cần năng lượng từ ngoài (điện phân)**.

### 2.5. Ba ví dụ tính E°cell

**Ví dụ 1 — Pin Ag-Cu:**
- 2Ag⁺ + Cu → 2Ag + Cu²⁺
- E°cell = E°(Ag⁺/Ag) − E°(Cu²⁺/Cu) = 0.80 − 0.34 = **+0.46 V**. Tự xảy ra.

**Ví dụ 2 — Pin Mg-Zn:**
- Mg + Zn²⁺ → Mg²⁺ + Zn
- E°cell = E°(Zn²⁺/Zn) − E°(Mg²⁺/Mg) = −0.76 − (−2.37) = **+1.61 V**. Tự xảy ra.

**Ví dụ 3 — Liệu Cu có "đẩy" được Zn không?**
- Cu + Zn²⁺ → Cu²⁺ + Zn?
- E°cell = E°(Zn²⁺/Zn) − E°(Cu²⁺/Cu) = −0.76 − 0.34 = **−1.10 V** < 0. **KHÔNG tự xảy ra**.
- → Cu KHÔNG đẩy được Zn. Đúng với dãy hoạt động.

### 📝 Tóm tắt mục 2

- E° lớn (+) = oxy hóa mạnh, bị khử; E° âm = khử mạnh, bị oxy hóa.
- E°cell = E°cathode − E°anode (cả 2 lấy từ dạng khử).
- E°cell > 0 → tự xảy ra. E°cell < 0 → cần điện phân.

---

## 3. Điện phân (Electrolysis)

### 3.1. Ý tưởng — ngược với pin galvanic

Trong pin galvanic, phản ứng redox tự xảy ra → tạo dòng điện.
Trong **điện phân**, ta **đẩy** phản ứng redox **không tự xảy ra** bằng cách cấp dòng điện từ ngoài (như từ pin hoặc nguồn điện).

### 3.2. Quy ước anode/cathode (NGƯỢC pin galvanic!)

Trong điện phân:
- **Anode** = cực **DƯƠNG** (kết nối với cực + của nguồn). Xảy ra **oxy hóa**.
- **Cathode** = cực **ÂM**. Xảy ra **khử**.

**Mẹo nhớ chung**: **Anode = Oxidation**, **Cathode = reduCtion**. (Đặc tính phản ứng — oxy hóa vs khử — không đổi giữa pin & điện phân. Chỉ điện tích đảo.)

### 3.3. Ví dụ — Điện phân dung dịch NaCl (chlor-alkali process)

- **Cathode (cực −)**: 2H₂O + 2e⁻ → H₂(g) + 2OH⁻
- **Anode (cực +)**: 2Cl⁻ → Cl₂(g) + 2e⁻
- **Tổng**: 2NaCl + 2H₂O → 2NaOH + H₂(g) + Cl₂(g)

Sản phẩm có giá trị kinh tế lớn: Cl₂ (cho PVC, khử trùng nước), H₂ (nhiên liệu), NaOH (xà phòng, giấy).

### 3.4. Định luật Faraday

Khối lượng chất tạo ra/tiêu thụ trong điện phân:

```
m = (I × t × M) / (n × F)
```

- `m` = khối lượng chất (g)
- `I` = cường độ dòng (A)
- `t` = thời gian (giây)
- `M` = khối lượng mol (g/mol)
- `n` = số electron trao đổi cho 1 mol chất
- `F` = hằng số Faraday = **96,485 C/mol** (điện tích 1 mol electron)

### 3.5. Ví dụ — Mạ đồng

Mạ một đồ vật bằng Cu từ dung dịch CuSO₄, dòng I = 2 A, t = 30 phút = 1800 s. Tính m(Cu) mạ được.

- Phản ứng: Cu²⁺ + 2e⁻ → Cu → n = 2.
- M(Cu) = 63.55 g/mol.
- m = (2 × 1800 × 63.55) / (2 × 96485) = 228,780 / 192,970 ≈ **1.19 g Cu**.

### 📝 Tóm tắt mục 3

- Điện phân: dùng điện cấp từ ngoài để bắt buộc redox.
- Anode (+) = oxy hóa; Cathode (−) = khử. Đảo dấu so với pin.
- Faraday: m = ItM / (nF), F = 96,485 C/mol.

---

## 4. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho 2 nửa phản ứng:
- Ag⁺ + e⁻ → Ag, E° = +0.80 V
- Fe²⁺ + 2e⁻ → Fe, E° = −0.44 V

a) Viết phản ứng tổng của pin galvanic.
b) Tính E°cell.
c) Xác định anode, cathode, viết ký hiệu pin.

**Bài 2**: Trong các phản ứng sau, phản ứng nào tự xảy ra (E°cell > 0)?
a) Sn + Pb²⁺ → Sn²⁺ + Pb (E° Sn²⁺/Sn = −0.14; E° Pb²⁺/Pb = −0.13)
b) Cu + 2Ag⁺ → Cu²⁺ + 2Ag (E° Ag = 0.80; E° Cu = 0.34)
c) Zn + Fe²⁺ → Zn²⁺ + Fe (E° Zn = −0.76; E° Fe = −0.44)

**Bài 3**: Tại sao pin Zn-Ag có EMF cao hơn pin Zn-Cu? (E° Ag = 0.80; Cu = 0.34; Zn = −0.76.)

**Bài 4**: Điện phân dung dịch CuSO₄ với dòng I = 5 A trong 30 phút. Tính khối lượng Cu thu được. (M(Cu) = 63.55.)

**Bài 5**: Để mạ Ag dày 0.01 mm lên 1 vật có diện tích bề mặt 100 cm² (khối lượng riêng Ag = 10.5 g/cm³), cần điện lượng bao nhiêu? Ở I = 1 A cần bao nhiêu phút?

**Bài 6**: Vì sao sắt Fe đặt vào dung dịch CuSO₄ thì bị "đỏ" lên (xuất hiện đồng), nhưng đặt vào dung dịch ZnSO₄ thì không có gì xảy ra?

### Lời giải

**Bài 1**:
- E°(Ag) > E°(Fe) → Ag bị khử (cathode), Fe bị oxy hóa (anode).

a) **Phản ứng tổng**: Fe + 2Ag⁺ → Fe²⁺ + 2Ag.
b) **E°cell** = E°cathode − E°anode = 0.80 − (−0.44) = **+1.24 V**.
c) Ký hiệu pin: **Fe(s) | Fe²⁺(1 M) || Ag⁺(1 M) | Ag(s)**.

**Bài 2**:
a) E°cell = E°(Pb) − E°(Sn) = −0.13 − (−0.14) = +0.01 V > 0 → **tự xảy ra** (gần như cân bằng).
b) E°cell = E°(Ag) − E°(Cu) = 0.80 − 0.34 = +0.46 V → **tự xảy ra** (mạnh).
c) E°cell = E°(Fe) − E°(Zn) = −0.44 − (−0.76) = +0.32 V → **tự xảy ra**.

**Bài 3**: 
- Pin Zn-Ag: E°cell = E°(Ag) − E°(Zn) = 0.80 − (−0.76) = +1.56 V.
- Pin Zn-Cu: E°cell = E°(Cu) − E°(Zn) = 0.34 − (−0.76) = +1.10 V.
- Pin Zn-Ag cao hơn vì Ag có E° dương hơn → cathode hút e mạnh hơn → EMF lớn hơn.

**Bài 4**: 
- t = 30 × 60 = 1800 s; I = 5 A; n = 2 (Cu²⁺ + 2e⁻ → Cu); M = 63.55.
- m = (5 × 1800 × 63.55) / (2 × 96485) = 571,950 / 192,970 = **2.96 g Cu**.

**Bài 5**: 
- Thể tích Ag = 100 × 0.001 = 0.1 cm³. Khối lượng = 0.1 × 10.5 = 1.05 g.
- n(Ag) = 1.05 / 107.87 = 0.00974 mol.
- Điện lượng cần: Q = n × n_e × F = 0.00974 × 1 × 96485 = **939.5 C**. (Vì Ag⁺ + e⁻ → Ag, mỗi mol Ag cần 1 mol e.)
- Ở I = 1 A: t = Q/I = 939.5 s = **15.66 phút**.

**Bài 6**: 
- Fe + Cu²⁺: E°cell = E°(Cu) − E°(Fe) = 0.34 − (−0.44) = +0.78 V > 0 → **tự xảy ra**. Fe bị oxy hóa, Cu kim loại bám lên (đỏ).
- Fe + Zn²⁺: E°cell = E°(Zn) − E°(Fe) = −0.76 − (−0.44) = −0.32 V < 0 → **KHÔNG tự xảy ra**. Vì Zn có thế thấp hơn Fe → Zn "ổn định hơn" Fe ở dạng kim loại → Zn²⁺ không "muốn" thành Zn kim loại trừ khi có Mg, Al, Na... đẩy.

---

## 5. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 04 — Nhiệt động hóa học](../lesson-04-thermochemistry/) — ΔH, ΔS, ΔG; liên hệ với E°cell qua `ΔG = −n·F·E°`.
- **Liên kết Physics**: dòng điện, mạch, năng lượng → [`Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits`](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/).
- **Liên kết Math**: tính m từ ItM/(nF) = phương trình đại số.

---

## 📝 Tổng kết Lesson 03 (T2)

1. **Pin galvanic**: redox tự xảy ra → dòng điện. Anode (−) oxy hóa; cathode (+) khử.
2. **E°cell = E°cathode − E°anode** (đều lấy từ dạng khử). E°cell > 0 → tự xảy ra.
3. **Bảng E°**: F₂ oxy hóa mạnh nhất (+2.87), Li khử mạnh nhất (−3.04).
4. **Điện phân**: ngược pin — cấp điện để bắt redox không tự xảy ra. Anode (+) = oxy hóa, cathode (−) = khử.
5. **Faraday**: m = ItM / (nF), F = 96,485 C/mol.

**Tiếp theo**: [Lesson 04 — Nhiệt động hóa học](../lesson-04-thermochemistry/)
