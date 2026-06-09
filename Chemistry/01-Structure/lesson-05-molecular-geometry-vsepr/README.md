# Lesson 05 — Hình học phân tử (VSEPR)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lý thuyết VSEPR** (Valence Shell Electron Pair Repulsion): các cặp electron lớp ngoài đẩy nhau → tự sắp xếp xa nhau nhất → quyết định hình học phân tử.
- Tính được **steric number (SN)** = số cặp e quanh nguyên tử trung tâm = bonding pair + lone pair.
- Dự đoán **5 hình học cơ bản** (SN = 2..6): linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral.
- Hiểu cách **lone pair làm biến dạng** hình học cơ bản → các dạng phụ: bent, trigonal pyramidal, see-saw, T-shape, square planar...
- Phân biệt **hình học cặp electron** (electron geometry) vs **hình học phân tử** (molecular geometry).
- Áp dụng được cho $> 15$ phân tử thường gặp: $\text{CO}_2$, $\text{H}_2\text{O}$, $\text{NH}_3$, $\text{CH}_4$, $\text{BF}_3$, $\text{SF}_6$, $\text{PCl}_5$, $\text{XeF}_4$...

## Kiến thức tiền đề

- [Lesson 03 — Liên kết ion & cộng hóa trị](../lesson-03-ionic-covalent-bond/) — đặc biệt công thức Lewis.

---

## 1. Lý thuyết VSEPR — nguyên lý cơ bản

### 💡 Trực giác / Hình dung

Tưởng tượng bạn cầm trong tay **một bó bóng bay** (mỗi bóng = 1 cặp electron). Các bóng bay đẩy nhau (vì cùng "mang" áp suất khí) → tự sắp xếp **xa nhau nhất có thể**.

- 2 bóng: nằm thẳng ($180^\circ$).
- 3 bóng: tam giác phẳng ($120^\circ$).
- 4 bóng: tứ diện đều ($109{,}5^\circ$).
- 5 bóng: lưỡng tháp tam giác.
- 6 bóng: bát diện đều ($90^\circ$).

Đây chính là cách electron sắp xếp quanh hạt nhân — vì các cặp e cùng âm, đẩy nhau bằng lực Coulomb.

### 1.1. Phát biểu chính thức

**Lý thuyết VSEPR**: Trong một phân tử, các cặp electron lớp ngoài cùng (cả bonding pair và lone pair) quanh nguyên tử trung tâm sẽ tự sắp xếp **xa nhau nhất** để cực tiểu hóa lực đẩy → hình học phân tử được xác định bởi số cặp e này.

### 1.2. Steric Number (SN)

**SN = bonding pairs + lone pairs** ở nguyên tử trung tâm.

**Lưu ý**: liên kết đôi và ba **chỉ tính là 1 cặp** (không phải 2 hoặc 3). Vì các e của liên kết bội đều "ở cùng một hướng" → đếm như 1.

### 1.3. Bốn ví dụ tính SN

**Ví dụ 1 — $\text{CH}_4$ (Methane):**
- C ở giữa, 4 liên kết đơn C−H → 4 bonding pair, 0 lone pair.
- **SN = 4**.

**Ví dụ 2 — $\text{NH}_3$ (Ammoniac):**
- N ở giữa, 3 liên kết đơn N−H + 1 lone pair → 3 bonding + 1 lone.
- **SN = 4**.

**Ví dụ 3 — $\text{H}_2\text{O}$:**
- O ở giữa, 2 liên kết O−H + 2 lone pair → 2 bonding + 2 lone.
- **SN = 4**.

**Ví dụ 4 — $\text{CO}_2$:**
- C ở giữa, 2 liên kết đôi C=O. Mỗi C=O tính là 1 cặp.
- 2 bonding + 0 lone.
- **SN = 2**.

### 📝 Tóm tắt mục 1

- VSEPR: cặp e đẩy nhau → sắp xếp xa nhau nhất.
- SN = bonding + lone pair (liên kết bội chỉ tính 1).
- SN quyết định **hình học cặp electron**.

---

## 2. Năm hình học cơ bản theo SN

### 2.1. SN = 2 → Linear ($180^\circ$)

**Hình học cặp electron**: thẳng hàng, góc $180^\circ$.

**Phân tử minh họa**: $\text{CO}_2$, $\text{BeCl}_2$, $\text{HCN}$, $\text{C}_2\text{H}_2$.

```
O = C = O          180°
Cl—Be—Cl
```

### 2.2. SN = 3 → Trigonal Planar ($120^\circ$)

**Hình học cặp electron**: tam giác đều phẳng, góc $120^\circ$.

**Phân tử minh họa**: $\text{BF}_3$, $\text{AlCl}_3$, $\text{BCl}_3$, formaldehyde ($\text{HCHO}$).

```
       F
       |
       B            120°
      / \\
     F   F
```

### 2.3. SN = 4 → Tetrahedral ($109{,}5^\circ$)

**Hình học cặp electron**: tứ diện đều, góc $109{,}5^\circ$.

**Phân tử minh họa**: $\text{CH}_4$, $\text{NH}_4^+$, $\text{SiH}_4$, $\text{CCl}_4$.

```
        H
        |
        C
       /|\\
      H H H        109.5°
```

(Hình tứ diện đều — 4 H ở 4 đỉnh, C ở tâm.)

### 2.4. SN = 5 → Trigonal Bipyramidal

**Hình học cặp electron**: lưỡng tháp tam giác. **Không đồng đều**: 3 vị trí "xích đạo" (equatorial, $120^\circ$ giữa nhau) + 2 vị trí "đỉnh" (axial, $90^\circ$ so với equatorial).

**Phân tử minh họa**: $\text{PCl}_5$, $\text{PF}_5$, $\text{AsF}_5$.

```
       Cl (axial)
       |
   Cl—P—Cl  (equatorial, góc 120°)
       |  \\
       Cl   Cl
```

### 2.5. SN = 6 → Octahedral ($90^\circ$)

**Hình học cặp electron**: bát diện đều, 6 đỉnh đối xứng, mọi góc lân cận đều $90^\circ$.

**Phân tử minh họa**: $\text{SF}_6$, $\text{SeF}_6$, $\text{PCl}_6^-$.

```
        F
        |
    F—S—F
       /|\\        90° giữa mỗi cặp lân cận
      F | F
        F
```

### 📝 Tóm tắt mục 2

| SN | Hình học cặp e | Góc |
|----|----------------|-----|
| 2 | Linear | $180^\circ$ |
| 3 | Trigonal planar | $120^\circ$ |
| 4 | Tetrahedral | $109{,}5^\circ$ |
| 5 | Trigonal bipyramidal | $90^\circ$, $120^\circ$ |
| 6 | Octahedral | $90^\circ$ |

---

## 3. Khi có lone pair — hình học phân tử biến dạng

### 3.1. Lone pair đẩy mạnh hơn bonding pair

Lý do: lone pair chỉ "bị giữ" bởi 1 hạt nhân, trong khi bonding pair bị giữ giữa 2 hạt nhân → lone pair **lan rộng hơn**, đẩy mạnh hơn.

Thứ tự đẩy: **Lone-Lone > Lone-Bond > Bond-Bond**.

Hệ quả: khi có lone pair, các liên kết bonding pair bị "ép lại" → góc liên kết **nhỏ hơn** so với hình học lý thuyết.

### 3.2. SN = 4 với lone pair

| Bonding | Lone | Hình học cặp e | Hình học phân tử | Góc | Ví dụ |
|---------|------|------------------|---------------------|-----|-------|
| 4 | 0 | Tetrahedral | **Tetrahedral** | $109{,}5^\circ$ | $\text{CH}_4$, $\text{CCl}_4$ |
| 3 | 1 | Tetrahedral | **Trigonal pyramidal** (chóp tam giác) | $\approx 107^\circ$ | $\text{NH}_3$, $\text{PH}_3$ |
| 2 | 2 | Tetrahedral | **Bent (gấp khúc)** | $\approx 104{,}5^\circ$ | $\text{H}_2\text{O}$, $\text{H}_2\text{S}$ |

**Quan sát**: cùng SN = 4 nhưng hình học phân tử khác nhau khi có lone pair. Góc giảm dần: $109{,}5^\circ \rightarrow 107^\circ \rightarrow 104{,}5^\circ$.

### 💡 Trực giác — $\text{NH}_3$ và $\text{H}_2\text{O}$

**$\text{NH}_3$**: 3 H ở 3 đỉnh "đáy" của tứ diện, lone pair ở đỉnh thứ 4 (đỉnh "trên"). Phân tử có hình **chóp tam giác** (tripod), giống cái dù che đầu.

**$\text{H}_2\text{O}$**: 2 H ở 2 đỉnh đối diện đáy, 2 lone pair ở 2 đỉnh còn lại. Phân tử có hình **gấp khúc** (V-shape, bent).

### 3.3. SN = 3 với lone pair

| Bonding | Lone | Hình học cặp e | Hình học phân tử | Ví dụ |
|---------|------|------------------|---------------------|-------|
| 3 | 0 | Trigonal planar | **Trigonal planar** | $\text{BF}_3$ |
| 2 | 1 | Trigonal planar | **Bent** | $\text{SO}_2$, $\text{O}_3$ |

### 3.4. SN = 5 với lone pair (phức tạp hơn)

Trigonal bipyramidal có 2 vị trí "đặc biệt" (axial) và 3 vị trí "thường" (equatorial). Lone pair luôn ưu tiên chiếm vị trí equatorial (vì có ít lực đẩy hơn).

| Bonding | Lone | Tên hình học | Ví dụ |
|---------|------|----------------|-------|
| 5 | 0 | Trigonal bipyramidal | $\text{PCl}_5$ |
| 4 | 1 | See-saw (cầu bập bênh) | $\text{SF}_4$ |
| 3 | 2 | T-shape | $\text{ClF}_3$ |
| 2 | 3 | Linear | $\text{XeF}_2$ |

### 3.5. SN = 6 với lone pair

| Bonding | Lone | Hình học phân tử | Ví dụ |
|---------|------|---------------------|-------|
| 6 | 0 | Octahedral | $\text{SF}_6$ |
| 5 | 1 | Square pyramidal | $\text{BrF}_5$ |
| 4 | 2 | Square planar | $\text{XeF}_4$ |

### ⚠ Lỗi thường gặp

- **Quên lone pair**: nhiều người chỉ đếm liên kết → tính SN sai. Phải tính tổng cặp e (cả bond + lone).
- **Đếm liên kết đôi/ba thành nhiều cặp**: SAI. Liên kết bội chỉ tính 1 cặp khi tính SN.
- **Nhầm "hình học cặp electron" và "hình học phân tử"**: cặp e gồm cả lone pair (vô hình), phân tử chỉ tính các nguyên tử (nhìn thấy được).

### 🔁 Dừng lại tự kiểm tra

1. Tính SN và xác định hình học của: $\text{SF}_4$.
2. Tại sao $\text{H}_2\text{O}$ có góc $104{,}5^\circ$ trong khi $\text{CH}_4$ có $109{,}5^\circ$?

<details>
<summary>Đáp án</summary>

1. $\text{SF}_4$: S là trung tâm. Đếm cặp e ngoài cùng của S: 6 (S nhóm VIA). 4 e dùng làm liên kết với 4 F (4 bonding pair) → còn $6 - 4 = 2$ e = 1 lone pair. **SN = 4 + 1 = 5**. Hình học cặp e: trigonal bipyramidal. Có 1 lone pair → hình học phân tử: **see-saw**.

2. Cả 2 đều SN = 4 (tetrahedral cặp e). $\text{CH}_4$ không lone pair → đối xứng đều → $109{,}5^\circ$. $\text{H}_2\text{O}$ có 2 lone pair → 2 cặp đẩy mạnh hơn bonding → 2 H bị "ép" lại → góc thu hẹp xuống $104{,}5^\circ$.
</details>

### 📝 Tóm tắt mục 3

- Lone pair đẩy mạnh hơn bonding pair → ép góc liên kết nhỏ lại.
- Cùng SN, khác số lone pair → hình học phân tử khác.
- Hình học cặp electron ≠ Hình học phân tử (khi có lone pair).

---

## 4. Quy trình dự đoán hình học phân tử

### Quy trình 5 bước

1. **Vẽ Lewis** để xác định bonding pair và lone pair quanh nguyên tử trung tâm.
2. **Tính SN** = bonding + lone (liên kết bội tính 1).
3. **Xác định hình học cặp electron** từ SN (Bảng §2).
4. **Đếm số lone pair** → xác định hình học phân tử (Bảng §3).
5. **Ước lượng góc liên kết** (lone pair → ép góc nhỏ lại).

### Walk-through 4 ví dụ tổng hợp

#### Ví dụ 1 — $\text{CO}_2$

1. Lewis: $\text{O}=\text{C}=\text{O}$. Trung tâm C, 2 liên kết đôi, 0 lone pair.
2. SN = 2 (liên kết đôi tính 1).
3. Hình học cặp e: **linear**.
4. Không lone pair → hình học phân tử = hình học cặp e: **linear**.
5. Góc: $\mathbf{180^\circ}$.

#### Ví dụ 2 — $\text{NH}_3$

1. Lewis: $\text{H}_3\text{N}{:}$ (3 N-H + 1 lone pair).
2. SN = 4.
3. Hình học cặp e: tetrahedral.
4. 1 lone pair → hình học phân tử: **trigonal pyramidal**.
5. Góc: $\mathbf{\approx 107^\circ}$ (nhỏ hơn $109{,}5^\circ$ do lone pair ép).

#### Ví dụ 3 — $\text{XeF}_4$

1. Lewis: Xe ở giữa, 4 liên kết Xe-F, Xe còn 2 lone pair (Xe ngoại lệ, vượt octet).
2. SN = 4 + 2 = 6.
3. Hình học cặp e: octahedral.
4. 2 lone pair → hình học phân tử: **square planar** (2 lone pair ở 2 đỉnh đối nhau, 4 F ở mặt phẳng còn lại).
5. Góc: $\mathbf{90^\circ}$ (F-Xe-F).

#### Ví dụ 4 — $\text{SO}_2$

1. Lewis: $\text{O}=\text{S}=\text{O}$ với 1 lone pair trên S.
2. SN = 2 (liên kết) + 1 (lone) = 3.
3. Hình học cặp e: trigonal planar.
4. 1 lone pair → hình học phân tử: **bent**.
5. Góc: $\mathbf{\approx 119^\circ}$ (gần $120^\circ$ nhưng nhỏ hơn chút do lone pair ép).

### 📝 Tóm tắt mục 4

5 bước: Lewis → SN → hình học cặp e → đếm lone → hình học phân tử → góc.

---

## 5. Bảng tổng hợp các hình học

| SN | LP | Hình học cặp e | Hình học phân tử | Góc | Phân tử ví dụ |
|----|----|------------------|---------------------|-----|----------------|
| 2 | 0 | Linear | Linear | $180^\circ$ | $\text{CO}_2$, $\text{BeCl}_2$, $\text{HCN}$ |
| 3 | 0 | Trigonal planar | Trigonal planar | $120^\circ$ | $\text{BF}_3$, $\text{AlCl}_3$, $\text{HCHO}$ |
| 3 | 1 | Trigonal planar | Bent | $\approx 119^\circ$ | $\text{SO}_2$, $\text{O}_3$ |
| 4 | 0 | Tetrahedral | Tetrahedral | $109{,}5^\circ$ | $\text{CH}_4$, $\text{CCl}_4$, $\text{NH}_4^+$ |
| 4 | 1 | Tetrahedral | Trigonal pyramidal | $\approx 107^\circ$ | $\text{NH}_3$, $\text{PH}_3$, $\text{H}_3\text{O}^+$ |
| 4 | 2 | Tetrahedral | Bent | $\approx 104{,}5^\circ$ | $\text{H}_2\text{O}$, $\text{H}_2\text{S}$ |
| 5 | 0 | Trigonal bipyramidal | Trigonal bipyramidal | $90^\circ$, $120^\circ$ | $\text{PCl}_5$, $\text{PF}_5$ |
| 5 | 1 | Trigonal bipyramidal | See-saw | $\approx 89^\circ$, $119^\circ$ | $\text{SF}_4$ |
| 5 | 2 | Trigonal bipyramidal | T-shape | $\approx 87^\circ$ | $\text{ClF}_3$ |
| 5 | 3 | Trigonal bipyramidal | Linear | $180^\circ$ | $\text{XeF}_2$ |
| 6 | 0 | Octahedral | Octahedral | $90^\circ$ | $\text{SF}_6$ |
| 6 | 1 | Octahedral | Square pyramidal | $\approx 90^\circ$ | $\text{BrF}_5$ |
| 6 | 2 | Octahedral | Square planar | $90^\circ$ | $\text{XeF}_4$ |

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Xác định SN, hình học cặp e, hình học phân tử của: $\text{CH}_4$, $\text{NH}_3$, $\text{H}_2\text{O}$, $\text{BF}_3$, $\text{SF}_6$.

**Bài 2**: Phân tử nào có cực và phân tử nào không cực: $\text{CO}_2$, $\text{H}_2\text{O}$, $\text{CCl}_4$, $\text{NH}_3$, $\text{CH}_3\text{Cl}$?

**Bài 3**: Vì sao $\text{H}_2\text{O}$ có moment lưỡng cực $\neq 0$ mà $\text{CO}_2$ thì $= 0$, mặc dù cả 2 đều có liên kết phân cực?

**Bài 4**: Dự đoán hình học của $\text{PF}_5$ và $\text{XeF}_4$.

**Bài 5**: $\text{NO}_2$ có liên kết đặc biệt — vẽ Lewis và dự đoán hình học. (Gợi ý: 17 e tổng → có 1 e lẻ trên N.)

**Bài 6**: Tại sao $\text{PCl}_5$ tồn tại nhưng $\text{NCl}_5$ thì không?

### Lời giải

**Bài 1**:

| Phân tử | Bonding | Lone | SN | Hình học cặp e | Hình học phân tử |
|---------|---------|------|----|------------------|---------------------|
| $\text{CH}_4$ | 4 | 0 | 4 | Tetrahedral | Tetrahedral |
| $\text{NH}_3$ | 3 | 1 | 4 | Tetrahedral | Trigonal pyramidal |
| $\text{H}_2\text{O}$ | 2 | 2 | 4 | Tetrahedral | Bent |
| $\text{BF}_3$ | 3 | 0 | 3 | Trigonal planar | Trigonal planar |
| $\text{SF}_6$ | 6 | 0 | 6 | Octahedral | Octahedral |

**Bài 2**:
- **$\text{CO}_2$**: linear, 2 dipole C=O đối xứng → triệt tiêu → KHÔNG cực.
- **$\text{H}_2\text{O}$**: bent, 2 dipole O-H không đối xứng → CÓ cực.
- **$\text{CCl}_4$**: tetrahedral đối xứng (4 Cl giống nhau) → 4 dipole triệt tiêu → KHÔNG cực.
- **$\text{NH}_3$**: trigonal pyramidal, 3 dipole N-H + lone pair → tổng $\neq 0$ → CÓ cực.
- **$\text{CH}_3\text{Cl}$**: tetrahedral nhưng KHÔNG đối xứng (1 Cl, 3 H) → CÓ cực.

**Bài 3**: 
- **$\text{CO}_2$**: 2 dipole C=O hướng ngược nhau (vì phân tử linear) → triệt tiêu → moment lưỡng cực tổng $= 0$.
- **$\text{H}_2\text{O}$**: 2 dipole O-H hướng cùng phía (vì phân tử bent, $104{,}5^\circ$) → không triệt tiêu → moment lưỡng cực $\neq 0$ → nước có cực.

→ Bài học: **hình học quyết định moment lưỡng cực**, không phải chỉ độ phân cực từng liên kết.

**Bài 4**:
- **$\text{PF}_5$**: P có 5 e ngoài cùng. Tất cả dùng làm 5 liên kết với 5 F. Không lone pair. SN = 5. Hình học: **trigonal bipyramidal**.
- **$\text{XeF}_4$**: Xe nhóm VIIIA, có 8 e ngoài. 4 e dùng cho 4 liên kết với F, 4 e còn lại = 2 lone pair. SN = 6. Hình học cặp e: octahedral. Hình học phân tử: **square planar** (2 lone pair ở 2 đỉnh đối, 4 F ở mặt phẳng giữa).

**Bài 5**:
- $\text{NO}_2$ có tổng e $= 5 + 2 \times 6 = 17$ e (số lẻ! → radical).
- Lewis: 1 liên kết đơn N-O, 1 liên kết đôi N=O, 1 electron lẻ trên N.
- Trung tâm N có: $1 + 1 = 2$ cặp liên kết + 1 electron lẻ (tính như 0,5 cặp). Để đơn giản, coi là SN = 3 với 1 "half-pair" thay vì lone pair.
- Hình học: gần trigonal planar nhưng méo. Góc O-N-O $\approx 134^\circ$ (giữa bent của ozone $117^\circ$ và tuyến tính $180^\circ$).

**Bài 6**: 
- **P** (chu kỳ 3) có **phân lớp 3d trống**, có thể "mở rộng octet" tới 10 e ngoài cùng → tạo được $\text{PCl}_5$ với 5 liên kết.
- **N** (chu kỳ 2) chỉ có 2s và 2p (không có 2d!) → giới hạn 8 e ngoài cùng → tối đa 4 liên kết → KHÔNG tạo được $\text{NCl}_5$.

→ Nguyên tắc chung: nguyên tố chu kỳ 3+ có thể vượt octet, nguyên tố chu kỳ 2 thì không.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 06 — Mol & Phản ứng](../lesson-06-mole-stoichiometry/) — đếm phân tử qua mol, cân bằng phương trình, bài toán mol.
- **Liên kết Lesson 04**: hình học phân tử quyết định có moment lưỡng cực hay không → quyết định có dipole-dipole hay không.
- **Liên kết Math**: hình học tetrahedral, octahedral, bát diện = hình học không gian classical → `Math/02-Geometry/lesson-05-solid-geometry`.

---

## 📝 Tổng kết Lesson 05

1. **VSEPR**: cặp e đẩy nhau → sắp xếp xa nhau nhất → quyết định hình học.
2. **SN = bonding + lone** (liên kết bội tính 1).
3. **5 hình học cặp electron cơ bản** theo SN = 2..6: linear → trigonal planar → tetrahedral → trigonal bipyramidal → octahedral.
4. **Lone pair đẩy mạnh hơn bonding** → ép góc liên kết nhỏ lại, biến dạng hình học cơ bản.
5. **Hình học phân tử khác hình học cặp e** khi có lone pair: bent, trigonal pyramidal, see-saw, T-shape, square planar...
6. **Hình học** + **độ phân cực liên kết** → quyết định moment lưỡng cực toàn phân tử.

**Tiếp theo**: [Lesson 06 — Mol & Phản ứng](../lesson-06-mole-stoichiometry/)
