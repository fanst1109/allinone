# Lesson 04 — Đa giác & Diện tích

## Mục tiêu

- Hiểu khái niệm **đa giác** (lồi vs lõm, đều vs thường).
- Tính tổng các **góc trong** và **góc ngoài** của đa giác.
- Biết công thức diện tích các hình phẳng phổ biến: tam giác, hình vuông, hình chữ nhật, hình thoi, hình thang, hình bình hành, lục giác đều, đường tròn.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/), [Lesson 03 — Đường tròn](../lesson-03-circles/).

---

## 1. Đa giác

💡 **Trực giác / Hình dung**: đa giác là 1 hàng rào khép kín làm từ các đoạn thẳng — đi dọc hàng rào, mỗi lần tới góc thì rẽ, cuối cùng quay về điểm xuất phát. **Lồi** giống cái đĩa tròn-trịa không lõm vào (mọi góc trong $< 180^\circ$); **lõm** giống ngôi sao 5 cánh hay chữ L, có chỗ "thụt vào".

**Đa giác** = hình phẳng đóng tạo bởi các đoạn thẳng (gọi là **cạnh**) nối nhau tại các **đỉnh**.

### 1.1. Phân loại

- **Đều (regular)**: mọi cạnh + mọi góc đều bằng nhau. Vd tam giác đều, hình vuông, lục giác đều.
- **Lồi (convex)**: mọi góc trong $< 180^\circ$. Đường thẳng nối 2 điểm bất kỳ trong đa giác đều nằm bên trong.
- **Lõm (concave)**: có ít nhất 1 góc trong $> 180^\circ$ (có "lỗi vào").

### 1.2. Tổng góc trong

Đa giác **n cạnh** có:
$$\text{Tổng góc trong} = (n - 2) \cdot 180^\circ$$

💡 **Vì sao?** Vì n-giác có thể chia thành **$(n-2)$ tam giác** bằng các đường chéo từ 1 đỉnh → tổng góc trong $= (n-2)\cdot 180^\circ$.

> 📐 **Định nghĩa đầy đủ — Tổng góc trong đa giác**
>
> **(a) Là gì**: Quy luật tuyến tính theo số cạnh n. Cộng tất cả n góc trong của 1 đa giác lồi luôn ra đúng $(n-2)\cdot 180^\circ$. Không phụ thuộc hình cụ thể — đều, không đều đều như nhau.
>
> **(b) Vì sao cần**: Vì cho phép tính nhanh góc của đa giác mà không cần đo. Ngược lại, dùng để xác định **đa giác đều** mỗi góc bao nhiêu, suy ra n từ số đo góc. Cũng là nền cho bài toán "lát mặt phẳng" (tessellation) — chỉ tam giác, tứ giác, lục giác đều lát được vì góc của chúng chia đều $360^\circ$.
>
> **(c) Ví dụ số**: Tam giác ($n=3$): $(3-2)\cdot 180 =$ **$180^\circ$** ✓. Tứ giác ($n=4$): $2\cdot 180 =$ **$360^\circ$** ✓ (4 góc $90^\circ$ trong hình chữ nhật). Ngũ giác đều: $3\cdot 180 = 540^\circ$, mỗi góc $= 540/5 =$ **$108^\circ$**. Lục giác đều: $4\cdot 180 = 720^\circ$, mỗi góc $= 120^\circ$. Bát giác đều (như đường giao thông STOP): $6\cdot 180 = 1080^\circ$, mỗi góc $= 135^\circ$.

**Đa giác đều n cạnh**: mỗi góc trong $= (n-2)\cdot 180^\circ/n$.

| n | Tên | Mỗi góc trong (đều) |
|---|-----|---------------------|
| 3 | Tam giác | $60^\circ$ |
| 4 | Tứ giác | $90^\circ$ |
| 5 | Ngũ giác | $108^\circ$ |
| 6 | Lục giác | $120^\circ$ |
| 8 | Bát giác | $135^\circ$ |
| 12 | Thập nhị giác | $150^\circ$ |
| $\infty$ | (đường tròn) | $180^\circ$ (giới hạn) |

### 1.3. Tổng góc ngoài

$$\text{Tổng góc ngoài (bất kỳ đa giác lồi)} = 360^\circ$$

(Vì đi 1 vòng quanh đa giác = xoay $360^\circ$.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia n-giác được đúng $(n-2)$ tam giác?"* Chọn 1 đỉnh, kẻ đường chéo tới các đỉnh không kề → tách thành các tam giác. Số tam giác luôn = số cạnh trừ 2. Vd ngũ giác (5 cạnh) → 3 tam giác.
- *"Tổng góc ngoài có phụ thuộc số cạnh không?"* Không — luôn $360^\circ$ bất kể n. Trực giác: đi 1 vòng quanh đa giác, tổng các lần "rẽ" (góc ngoài) đúng bằng 1 vòng $= 360^\circ$.
- *"Đa giác lõm thì công thức $(n-2)\cdot 180^\circ$ còn đúng?"* Tổng góc trong vẫn $= (n-2)\cdot 180^\circ$ cho đa giác đơn (không tự cắt), nhưng cách đo góc lõm ($> 180^\circ$) phải cẩn thận.

⚠ **Lỗi thường gặp**: quên trừ 2, viết "tổng góc trong $= n\cdot 180^\circ$". Phản ví dụ: tứ giác ($n=4$) nếu lấy $4\cdot 180 = 720^\circ$ là sai; đúng là $(4-2)\cdot 180 = 360^\circ$. Lỗi thứ 2: lấy "mỗi góc đa giác đều = tổng/n" mà quên tính tổng trước — ngũ giác đều mỗi góc $= 540/5 = 108^\circ$, không phải $180/5$.

🔁 **Dừng lại tự kiểm tra**

1. Tổng góc trong của lục giác (6 cạnh) là bao nhiêu? Mỗi góc nếu là lục giác đều?
2. Đa giác đều có mỗi góc trong $150^\circ$. Đa giác có mấy cạnh?

<details><summary>Đáp án</summary>

1. $(6-2)\cdot 180 =$ **$720^\circ$**. Mỗi góc đều $= 720/6 =$ **$120^\circ$**.
2. $(n-2)\cdot 180/n = 150$ → $180n - 360 = 150n$ → $30n = 360$ → $n =$ **12** (thập nhị giác).

</details>

### 📝 Tóm tắt mục 1

- Đa giác: lồi (mọi góc $< 180^\circ$) / lõm (có góc $> 180^\circ$); đều (mọi cạnh + góc bằng nhau).
- **Tổng góc trong $= (n-2)\cdot 180^\circ$** (chia thành $n-2$ tam giác).
- Đa giác đều n cạnh: mỗi góc trong $= (n-2)\cdot 180^\circ/n$.
- **Tổng góc ngoài $= 360^\circ$** với mọi đa giác lồi (không phụ thuộc n).

---

## 2. Diện tích các hình

💡 **Trực giác / Hình dung**: diện tích = "đếm số ô vuông đơn vị lấp đầy hình". Hình chữ nhật $a\times b = a$ hàng, mỗi hàng b ô → $a\cdot b$ ô. Mọi công thức khác đều suy ra bằng cách "cắt-ghép" về hình chữ nhật hay tam giác (vd hình bình hành cắt 1 tam giác ở đầu ghép sang đầu kia → thành chữ nhật đáy·cao).

### 2.1. Bảng công thức

| Hình | Diện tích |
|------|-----------|
| Hình vuông cạnh a | **$a^2$** |
| Hình chữ nhật cạnh a, b | **$a \cdot b$** |
| Tam giác đáy a, cao h | **$\frac{1}{2} \cdot a \cdot h$** |
| Hình bình hành đáy a, cao h | **$a \cdot h$** |
| Hình thang đáy a, b, cao h | **$\frac{1}{2}(a + b)\cdot h$** |
| Hình thoi 2 đường chéo $d_1$, $d_2$ | **$\frac{1}{2} \cdot d_1 \cdot d_2$** |
| Đường tròn bán kính R | **$\pi \cdot R^2$** |
| Lục giác đều cạnh a | **$\frac{3\sqrt{3}}{2} \cdot a^2$** |

### 2.2. Diện tích tam giác đều cạnh a

$S = (a \cdot \text{cao})/2 = (a \cdot (a\sqrt{3}/2))/2 =$ **$\frac{\sqrt{3}}{4} \cdot a^2$**.

### 2.3. Walk-through — Lục giác đều

Lục giác đều cạnh a = **6 tam giác đều** ghép lại (mỗi tam giác cạnh a).
- $S_\text{lục giác} = 6 \cdot \frac{\sqrt{3}}{4}\cdot a^2 =$ **$\frac{3\sqrt{3}}{2}\cdot a^2$**.

Cách khác: bán kính đường tròn ngoại tiếp $= a$ (vì 6 tam giác đều có cạnh = bán kính). Hữu ích trong thực tế (mặt cắt tổ ong, bu-lông).

### 2.4. Verify công thức bằng số thật

- **Hình thang** đáy 5 và 11, cao 4: $S = \frac{1}{2}(5+11)\cdot 4 = \frac{1}{2}\cdot 16\cdot 4 =$ **32**. Kiểm bằng cắt-ghép: 2 hình thang úp ngược ghép thành hình bình hành đáy $(5+11)=16$, cao 4 → diện tích 64; mỗi hình thang $= 64/2 = 32$ ✓.
- **Hình thoi** 2 đường chéo 6 và 8: $S = \frac{1}{2}\cdot 6\cdot 8 =$ **24**. (Hình thoi $= \frac{1}{2}$ hình chữ nhật bao quanh nó, cạnh = 2 đường chéo.)
- **Tam giác đều** cạnh 4: $S = \frac{\sqrt{3}}{4}\cdot 4^2 = \frac{\sqrt{3}}{4}\cdot 16 = 4\sqrt{3} \approx$ **6.93**.
- **Lục giác đều** cạnh 4: $S = \frac{3\sqrt{3}}{2}\cdot 16 = 24\sqrt{3} \approx$ **41.57** $= 6 \times 6.93$ (6 tam giác đều) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình bình hành cũng đáy·cao như chữ nhật?"* Đúng — vì cắt 1 tam giác bên này ghép sang bên kia thành chữ nhật cùng đáy, cùng cao. "Cao" là khoảng cách vuông góc giữa 2 đáy, không phải cạnh xiên.
- *"Hình thoi vừa có công thức $\frac{1}{2}d_1 d_2$ vừa đáy·cao?"* Có — hình thoi là hình bình hành đặc biệt (4 cạnh bằng), nên dùng được cả 2; $\frac{1}{2}d_1 d_2$ tiện khi biết 2 đường chéo.
- *"Vì sao tam giác đều có $\sqrt{3}$?"* Vì chiều cao tam giác đều cạnh $a = a\sqrt{3}/2$ (từ Pythagoras trên nửa tam giác) → diện tích chứa $\sqrt{3}$.

⚠ **Lỗi thường gặp**: quên hệ số $\frac{1}{2}$ ở hình thang và hình thoi. Phản ví dụ: hình thoi đường chéo 6, 8 — nếu tính $6\cdot 8 = 48$ là sai (đó là diện tích chữ nhật bao quanh), đúng là $\frac{1}{2}\cdot 48 = 24$. Lỗi thứ 2: dùng cạnh xiên làm chiều cao của hình bình hành.

🔁 **Dừng lại tự kiểm tra**

1. Hình thang 2 đáy 3 và 7, cao 5. Diện tích?
2. Hình thoi có cạnh 5, một đường chéo 6. Diện tích? (gợi ý: 2 đường chéo vuông góc tại trung điểm)

<details><summary>Đáp án</summary>

1. $S = \frac{1}{2}(3+7)\cdot 5 = \frac{1}{2}\cdot 10\cdot 5 =$ **25**.
2. Nửa đường chéo 1 $= 3$; nửa đường chéo 2 $= \sqrt{5^2-3^2} = 4$ → đường chéo 2 $= 8$. $S = \frac{1}{2}\cdot 6\cdot 8 =$ **24**.

</details>

### 📝 Tóm tắt mục 2

- Diện tích = đếm ô vuông đơn vị; mọi công thức suy từ chữ nhật/tam giác bằng cắt-ghép.
- Nhớ hệ số $\frac{1}{2}$ ở **tam giác, hình thang, hình thoi**.
- Tam giác đều cạnh a: $S = \frac{\sqrt{3}}{4}a^2$; lục giác đều $= 6$ tam giác đều $= \frac{3\sqrt{3}}{2}a^2$.
- Diện tích luôn có đơn vị **bình phương**; "cao" là khoảng cách vuông góc, không phải cạnh xiên.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Tổng góc trong của bát giác (8 cạnh).

**Bài 2**: Mỗi góc trong của thập giác đều.

**Bài 3**: Hình thang cân, 2 đáy 5 và 11, cao 4. Tính diện tích.

**Bài 4**: Hình thoi 2 đường chéo 6 và 8. Tính diện tích và độ dài cạnh.

**Bài 5**: Sân bóng đá hình chữ nhật $105\text{m} \times 68\text{m}$. Diện tích bao nhiêu m²?

**Bài 6**: Lục giác đều cạnh 4 cm. Tính diện tích.

### Lời giải

**Bài 1**: $(8-2) \cdot 180 =$ **$1080^\circ$**.

**Bài 2**: $(10-2)\cdot 180/10 = 1440/10 =$ **$144^\circ$**.

**Bài 3**: $S = \frac{1}{2}(5 + 11)\cdot 4 = \frac{1}{2}\cdot 16\cdot 4 =$ **32**.

**Bài 4**: $S = \frac{1}{2}\cdot 6\cdot 8 =$ **24**. Cạnh $= \sqrt{(6/2)^2 + (8/2)^2} = \sqrt{9+16} =$ **5** (vì 2 đường chéo cắt nhau $\perp$ tại trung điểm).

**Bài 5**: $105 \times 68 =$ **7,140 m²**.

**Bài 6**: $S = \frac{3\sqrt{3}}{2}\cdot 16 = 24\sqrt{3} \approx$ **41.57 cm²**.

---

## 4. Bài tiếp theo

[Lesson 05 — Hình học không gian](../lesson-05-solid-geometry/).

## 📝 Tổng kết

1. **Đa giác**: lồi/lõm, đều/thường.
2. **Tổng góc trong** $= (n-2)\cdot 180^\circ$. **Tổng góc ngoài** $= 360^\circ$.
3. **Diện tích**: nhớ công thức 7-8 hình phổ biến.
4. **Lục giác đều** = 6 tam giác đều ghép.
