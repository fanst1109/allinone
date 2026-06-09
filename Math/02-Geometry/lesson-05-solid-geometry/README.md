# Lesson 05 — Hình học không gian

## Mục tiêu

- Hiểu các **khối đa diện** cơ bản: lập phương, hình hộp chữ nhật, lăng trụ, chóp.
- Hiểu các **khối tròn xoay**: hình trụ, hình nón, hình cầu.
- Tính **thể tích** và **diện tích bề mặt** các khối này.
- Hiểu công thức Euler cho đa diện: $V - E + F = 2$.

## Kiến thức tiền đề

- [Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

---

## 1. Khối đa diện

💡 **Trực giác / Hình dung**: đa diện là 1 khối rắn có "vỏ" gồm các mặt phẳng đa giác — như viên xúc xắc (6 mặt vuông), kim tự tháp (chóp), hộp quà. Đếm 3 thứ: **đỉnh** (góc nhọn, như chóp kim tự tháp), **cạnh** (mép giao 2 mặt), **mặt** (tấm phẳng). Công thức Euler nói 3 con số này luôn "ăn khớp" theo 1 quy luật.

**Đa diện** = khối 3D giới hạn bởi các mặt đa giác phẳng.

- **V (Vertex)** = số đỉnh.
- **E (Edge)** = số cạnh.
- **F (Face)** = số mặt.

### 1.1. Công thức Euler

Với mọi đa diện lồi:

$$V - E + F = 2$$

**Ví dụ — Lập phương**: V=8, E=12, F=6. Kiểm: $8 - 12 + 6 = $ **2** ✓.

> 📐 **Định nghĩa đầy đủ — Công thức Euler đa diện**
>
> **(a) Là gì**: 1 hằng đẳng thức **kỳ lạ**: với MỌI đa diện lồi (dù phức tạp đến đâu), số đỉnh trừ số cạnh cộng số mặt luôn = 2. Không phụ thuộc kích thước, hình dạng cụ thể.
>
> **(b) Vì sao cần**: Đây là 1 trong những định lý đầu tiên về **topology** (hình học không quan tâm độ dài/góc, chỉ quan tâm cấu trúc kết nối). Cho biết "cấu trúc" đa diện bị ràng buộc — không thể tạo ra 1 đa diện với V, E, F tùy ý. Hệ quả: chứng minh chỉ tồn tại 5 khối Platonic (định lý Plato). Ứng dụng hiện đại: mạng lưới đồ hoạ máy tính, phân tích hình học rời rạc, hoá học phân tử (fullerene C60).
>
> **(c) Ví dụ số**: Tứ diện đều (4 mặt tam giác): V=4, E=6, F=4 → $4-6+4 = $ **2** ✓. Lập phương: $8-12+6 = $ **2** ✓. Bát diện đều: $6-12+8 = $ **2** ✓. Hình lăng trụ tam giác (3 mặt bên + 2 đáy): V=6, E=9, F=5 → $6-9+5 = $ **2** ✓. Quả bóng đá (32 mặt = 12 ngũ giác + 20 lục giác): V=60, E=90, F=32 → $60-90+32 = $ **2** ✓.

### 1.2. 5 khối Platonic (đa diện đều)

Chỉ có **5 khối đa diện đều** trong không gian 3D:

| Tên | V | E | F | Mặt là |
|-----|---|---|---|--------|
| Tứ diện đều | 4 | 6 | 4 | Tam giác đều |
| Lập phương | 8 | 12 | 6 | Hình vuông |
| Bát diện đều | 6 | 12 | 8 | Tam giác đều |
| Thập nhị diện đều | 20 | 30 | 12 | Ngũ giác đều |
| Nhị thập diện đều | 12 | 30 | 20 | Tam giác đều |

💡 **Vì sao chỉ có 5?** Plato (~400 TCN) chứng minh. Lý do: ở mỗi đỉnh phải có $\ge 3$ mặt + tổng các góc đó $< 360^\circ$ → giới hạn số khả năng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Euler $V-E+F=2$ có đúng cho mọi khối không?"* Đúng cho mọi đa diện **lồi** (và mọi đa diện "tương đương cầu" về topology). Khối có lỗ thủng (như bánh donut) thì = 0, không phải 2.
- *"Vì sao chỉ có đúng 5 khối Platonic?"* Tại mỗi đỉnh cần $\ge 3$ mặt đều giống nhau, tổng góc tại đỉnh phải $< 360^\circ$ (nếu $= 360^\circ$ thì phẳng, > thì không khép được). Chỉ 5 cấu hình thỏa: 3/4/5 tam giác, 3 vuông, 3 ngũ giác.
- *"Cạnh đếm thế nào để không trùng?"* Mỗi cạnh là mép chung của đúng 2 mặt — đếm 1 lần. Mẹo kiểm: tổng (số cạnh mỗi mặt) = $2E$ (mỗi cạnh thuộc 2 mặt).

⚠ **Lỗi thường gặp**: đếm trùng cạnh hoặc đỉnh khi áp Euler. Phản ví dụ: lập phương có 12 cạnh (không phải $6\cdot 4=24$ — vì mỗi cạnh chung 2 mặt nên chia đôi: $24/2=12$). Kiểm: $V-E+F = 8-12+6 = 2$ ✓; nếu lỡ lấy $E=24$ thì $8-24+6 = -10 \neq 2$ → biết đếm sai.

🔁 **Dừng lại tự kiểm tra**

1. Lăng trụ tam giác có V=6, F=5. Tính E bằng công thức Euler.
2. Bát diện đều có 8 mặt tam giác, 6 đỉnh. Số cạnh?

<details><summary>Đáp án</summary>

1. $V-E+F=2$ → $6-E+5 = 2$ → $E = $ **9**.
2. $6-E+8 = 2$ → $E = $ **12**. (Hoặc: 8 mặt $\times$ 3 cạnh $/ 2 = 12$.)

</details>

### 📝 Tóm tắt mục 1

- Đa diện đếm 3 số: V (đỉnh), E (cạnh), F (mặt).
- **Công thức Euler**: $V - E + F = 2$ cho mọi đa diện lồi.
- Mỗi cạnh chung 2 mặt → đếm 1 lần (tránh nhân đôi).
- Chỉ có **5 khối Platonic** (đa diện đều): tứ diện, lập phương, bát diện, thập nhị diện, nhị thập diện.

---

## 2. Thể tích các khối phổ biến

💡 **Trực giác / Hình dung**: thể tích = "đếm số khối lập phương đơn vị ($1\times 1\times 1$) lấp đầy khối". Hộp $a\times b\times c = a\cdot b\cdot c$ khối nhỏ. Khối "có đỉnh nhọn" (chóp, nón) chỉ chứa **1/3** so với khối "thẳng đứng" (lăng trụ, trụ) cùng đáy và cao — vì phần đỉnh thu nhỏ dần.

$$\begin{aligned}
\text{Lập phương cạnh } a: \quad & V = a^3 \\
\text{Hộp chữ nhật } a\times b\times c: \quad & V = abc \\
\text{Lăng trụ đáy } S,\ \text{cao } h: \quad & V = S\cdot h \\
\text{Chóp đáy } S,\ \text{cao } h: \quad & V = \tfrac{1}{3}\cdot S\cdot h \\
\text{Hình trụ } R, h: \quad & V = \pi R^2 h \\
\text{Hình nón } R, h: \quad & V = \tfrac{1}{3}\pi R^2 h \\
\text{Hình cầu } R: \quad & V = \tfrac{4}{3}\pi R^3
\end{aligned}$$

💡 **Nhớ**: chóp = (1/3) lăng trụ cùng đáy + cao. Nón = (1/3) trụ. Cầu R có $V = \frac{4}{3}\pi R^3$.

**4 ví dụ số đa dạng**:
- Lập phương cạnh 3: $V = 3^3 = $ **27**.
- Hộp $2\times 3\times 4$: $V = 24$.
- Trụ R=2, h=5: $V = \pi\cdot 4\cdot 5 = 20\pi \approx$ **62.8**.
- Nón R=2, h=5: $V = \frac{1}{3}\cdot 20\pi \approx$ **20.9** (đúng = 1/3 trụ cùng đáy, cao).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chóp/nón có hệ số 1/3?"* Vì khối nhọn dần lên đỉnh, "hụt" thể tích so với khối thẳng. Có thể xác nhận: đổ đầy 3 nón nước vào sẽ vừa đầy 1 trụ cùng đáy, cùng cao.
- *"Đơn vị thể tích là gì?"* Luôn là đơn vị **lập phương** (cm³, m³). Cạnh cm → thể tích cm³.
- *"Cầu là $\frac{4}{3}\pi R^3$ — nhớ thế nào?"* Mẹo: "bốn phần ba pi r mũ ba". Diện tích cầu $4\pi R^2$ thì là đạo hàm của thể tích theo R (sẽ thấy ở giải tích).

⚠ **Lỗi thường gặp**: quên hệ số 1/3 cho chóp/nón, hoặc dùng đường kính thay bán kính trong trụ/nón/cầu. Phản ví dụ: nón R=3, h=6 → $V = \frac{1}{3}\pi\cdot 9\cdot 6 = 18\pi$; nếu quên 1/3 ra $54\pi$ (gấp 3, sai). Lỗi đơn vị: ghi V = 27 cm² thay vì cm³.

🔁 **Dừng lại tự kiểm tra**

1. Chóp đáy vuông cạnh 6, cao 10. Thể tích?
2. Hình cầu bán kính 3. Thể tích?

<details><summary>Đáp án</summary>

1. $V = \frac{1}{3}\cdot(6^2)\cdot 10 = \frac{1}{3}\cdot 36\cdot 10 = $ **120**.
2. $V = \frac{4}{3}\pi\cdot 3^3 = \frac{4}{3}\pi\cdot 27 = $ **36π ≈ 113.1**.

</details>

### 📝 Tóm tắt mục 2

- Thể tích = đếm khối lập phương đơn vị; đơn vị luôn **lập phương** (cm³...).
- Khối thẳng: lăng trụ/trụ $=$ đáy$\cdot$cao. Khối nhọn: chóp/nón $=$ **(1/3)**$\cdot$đáy$\cdot$cao.
- Cầu: $V = \frac{4}{3}\pi R^3$.
- Cẩn thận dùng bán kính (không phải đường kính) trong trụ/nón/cầu.

---

## 3. Diện tích bề mặt

💡 **Trực giác / Hình dung**: diện tích bề mặt = "tổng diện tích giấy gói cần để bọc kín khối" (như khai triển hộp ra mặt phẳng — gọi là "lưới" hay net). Lập phương = 6 mặt vuông → $6a^2$. Trụ = 2 nắp tròn + 1 thân hình chữ nhật cuộn lại.

$$\begin{aligned}
\text{Lập phương cạnh } a: \quad & S = 6a^2 \\
\text{Hộp chữ nhật}: \quad & S = 2(ab + bc + ca) \\
\text{Hình trụ } R, h: \quad & S = 2\pi R^2 + 2\pi R h \\
\text{Hình nón } R, l\ (\text{đường sinh}): \quad & S = \pi R^2 + \pi R l \\
\text{Hình cầu } R: \quad & S = 4\pi R^2
\end{aligned}$$

**Walk-through — Diện tích cầu**:
- Archimedes (~ 250 TCN) chứng minh: $S_{\text{cầu}} = 4\pi R^2$ **chính bằng diện tích xung quanh hình trụ** có cùng R và h = 2R.
- Đây là một trong những kết quả ông tự hào nhất, khắc trên bia mộ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường sinh l của nón tính sao?"* Là cạnh xiên từ đỉnh tới mép đáy: $l = \sqrt{R^2 + h^2}$ (Pythagoras). Vd R=3, h=4 → $l = 5$.
- *"S trụ gồm những phần nào?"* 2 nắp tròn ($2\cdot\pi R^2$) + thân (chu vi đáy × cao $= 2\pi R\cdot h$). Tổng $= 2\pi R^2 + 2\pi R h = 2\pi R(R+h)$.
- *"Diện tích bề mặt và diện tích xung quanh khác nhau?"* "Toàn phần" gồm cả nắp/đáy; "xung quanh" chỉ phần thân. Đọc kỹ đề.

⚠ **Lỗi thường gặp**: dùng h thay l trong công thức nón $S = \pi R^2 + \pi R l$. Phản ví dụ: nón R=3, h=4 → $l = 5$; $S_{\text{xung quanh}} = \pi R l = \pi\cdot 3\cdot 5 = 15\pi$. Nếu lấy $\pi R h = 12\pi$ là sai (thiếu, vì $h < l$). Lỗi khác: quên 1 nắp/đáy của trụ.

🔁 **Dừng lại tự kiểm tra**

1. Lập phương cạnh 4. Diện tích bề mặt?
2. Nón R = 6, h = 8. Tính đường sinh l rồi diện tích xung quanh ($\pi R l$).

<details><summary>Đáp án</summary>

1. $S = 6\cdot 4^2 = 6\cdot 16 = $ **96**.
2. $l = \sqrt{36+64} = \sqrt{100} = 10$. $S_{xq} = \pi\cdot 6\cdot 10 = $ **60π ≈ 188.5**.

</details>

### 📝 Tóm tắt mục 3

- Diện tích bề mặt = tổng diện tích "giấy gói" (lưới khai triển).
- Lập phương $6a^2$; trụ $2\pi R^2+2\pi R h$; nón $\pi R^2+\pi R l$; cầu $4\pi R^2$.
- Nón: đường sinh $l = \sqrt{R^2+h^2}$ (Pythagoras) — dùng $l$, không phải $h$.
- $S_{\text{cầu}} = 4\pi R^2$ = diện tích xung quanh trụ $R$, $h=2R$ (Archimedes).

---

## 4. Bài tập

### Bài tập

**Bài 1**: Lập phương cạnh 5 cm. Tính V, S_bề mặt.

**Bài 2**: Hình trụ R = 3, h = 10. Tính V và S.

**Bài 3**: Hình cầu R = 6 cm. Tính V và S.

**Bài 4**: Chóp đáy vuông cạnh 4, cao 6. Tính V.

**Bài 5**: Kiểm tra công thức Euler cho tứ diện đều.

**Bài 6**: Cho hình nón R = 5, h = 12. Tính đường sinh l, sau đó tính S.

### Lời giải

**Bài 1**: $V = 125$ cm³. $S = 6\cdot 25 = $ **150 cm²**.

**Bài 2**: $V = \pi\cdot 9\cdot 10 = $ **90π ≈ 282.7**. $S = 2\pi\cdot 9 + 2\pi\cdot 3\cdot 10 = $ **78π ≈ 245**.

**Bài 3**: $V = \frac{4}{3}\pi\cdot 216 = $ **288π ≈ 904.78 cm³**. $S = 4\pi\cdot 36 = $ **144π ≈ 452.4 cm²**.

**Bài 4**: $V = \frac{1}{3}\cdot 16\cdot 6 = $ **32**.

**Bài 5**: V=4, E=6, F=4. $V - E + F = 4 - 6 + 4 = $ **2** ✓.

**Bài 6**: $l = \sqrt{R^2+h^2} = \sqrt{25+144} = $ **13**. $S = \pi\cdot 25 + \pi\cdot 5\cdot 13 = $ **90π ≈ 283**.

---

## 5. Bài tiếp theo

[Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/).

## 📝 Tổng kết

1. **Euler**: $V - E + F = 2$ cho mọi đa diện lồi.
2. **5 khối Platonic** đều (Plato chứng minh chỉ có 5).
3. **Thể tích**: nhớ chóp = (1/3) trụ cùng đáy. Cầu $= \frac{4}{3}\pi R^3$.
4. **$S_{\text{cầu}} = 4\pi R^2$ = diện tích xung quanh trụ $R$, $h = 2R$** (Archimedes).
