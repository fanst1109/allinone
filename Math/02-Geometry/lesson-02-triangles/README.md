# Lesson 02 — Tam giác

## Mục tiêu

- Phân loại tam giác theo cạnh và góc.
- Hiểu các **trường hợp bằng nhau** (SSS, SAS, ASA) và **đồng dạng** (AAA, SAS, SSS) của tam giác.
- Áp dụng **định lý Pythagoras** cho tam giác vuông.
- Tính diện tích tam giác bằng nhiều công thức.

## Kiến thức tiền đề

- [Lesson 01 — Cơ sở Euclid](../lesson-01-euclidean-basics/).

---

## 1. Tam giác là gì?

**Tam giác** = hình 3 cạnh tạo bởi 3 điểm không thẳng hàng.

💡 **Là gì**: hình đa giác đơn giản nhất, với 3 đỉnh, 3 cạnh, 3 góc trong.

**Quy tắc cơ bản**:
- **Tổng 3 góc trong $= 180^\circ$** (hệ quả của tiên đề Euclid 5).
- **Bất đẳng thức tam giác**: cạnh bất kỳ $<$ tổng 2 cạnh còn lại. (Nếu vi phạm → không thể vẽ được tam giác.)

> 📐 **Định nghĩa đầy đủ — Tam giác**
>
> **(a) Là gì**: Hình đóng tạo bởi 3 đoạn thẳng (cạnh) nối 3 điểm không thẳng hàng (đỉnh). Có đúng 3 góc trong tổng cộng đúng $180^\circ$.
>
> **(b) Vì sao cần**: Tam giác là hình đa giác **đơn giản nhất** (ít cạnh nhất có thể). Đặc biệt **cứng vững** — 3 cạnh xác định duy nhất 1 tam giác (không "vặn vẹo" được như tứ giác). Đó là lý do dùng tam giác trong kết cấu xây dựng (kèo nhà, cầu, giàn giáo) và trong định vị (lưới tam giác đo đạc, GPS).
>
> **(c) Ví dụ số**: Cạnh 3, 4, 5 → kiểm tra bất đẳng thức: $3+4=7 > 5$ ✓, $3+5=8 > 4$ ✓, $4+5=9 > 3$ ✓ → vẽ được. Cạnh 1, 2, 5 → $1+2=3 < 5$ → KHÔNG vẽ được. Cạnh 1, 2, 3 → $1+2=3 = 3$, biên giới (3 điểm thẳng hàng, "tam giác suy biến"). Cạnh 6, 6, 6 → tam giác đều, 3 góc $= 60^\circ$.

💡 **Trực giác / Hình dung — bất đẳng thức tam giác**: muốn nối A tới C, đi thẳng (cạnh AC) luôn ngắn hơn đi vòng qua B ($AB + BC$). "Đường thẳng là đường ngắn nhất" — đó chính là bất đẳng thức tam giác. Nếu cạnh dài nhất $\ge$ tổng 2 cạnh kia thì 2 cạnh ngắn "với không tới nhau", không khép kín được thành tam giác.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tổng 3 góc luôn đúng $180^\circ$?"* Kẻ qua đỉnh A 1 đường thẳng song song cạnh BC. Hai góc B, C "chuyển" lên đỉnh A nhờ góc so le trong (Lesson 01), ghép với góc A thành 1 góc bẹt $= 180^\circ$.
- *"Bằng nhau ở 2 cạnh, khác cạnh thứ 3 thì sao?"* Vẫn là tam giác miễn thỏa bất đẳng thức. Vd 5, 5, 1 (cân, rất "dẹt") vẫn hợp lệ vì $5+1 > 5$.
- *"3 cạnh có xác định duy nhất 1 tam giác không?"* Có (đó là trường hợp SSS ở mục 3) — khác với tứ giác (4 cạnh không xác định duy nhất, có thể "vặn").

⚠ **Lỗi thường gặp**: chỉ kiểm 1 bất đẳng thức rồi kết luận. Phải kiểm **cạnh lớn nhất $<$ tổng 2 cạnh còn lại** (đủ). Phản ví dụ: cạnh 2, 3, 6 — nếu chỉ xét $3+6=9 > 2$ thì tưởng được, nhưng cạnh lớn nhất 6 so với $2+3=5 < 6$ → **KHÔNG** vẽ được.

🔁 **Dừng lại tự kiểm tra**

1. Bộ cạnh nào tạo được tam giác: (a) 4, 5, 8; (b) 3, 4, 7; (c) 2, 2, 5?
2. Tam giác có 2 góc $50^\circ$ và $70^\circ$. Góc thứ 3 bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. (a) $4+5=9 > 8$ ✓ → được. (b) $3+4=7 = 7$ → suy biến (thẳng hàng), không được. (c) $2+2=4 < 5$ → không được.
2. $180 - 50 - 70 =$ **$60^\circ$**.

</details>

### 📝 Tóm tắt mục 1

- Tam giác = 3 điểm không thẳng hàng nối thành hình kín; 3 đỉnh, 3 cạnh, 3 góc.
- Tổng 3 góc trong **luôn $= 180^\circ$** (hệ quả tiên đề song song).
- **Bất đẳng thức tam giác**: cạnh lớn nhất $<$ tổng 2 cạnh kia (điều kiện vẽ được).
- Tam giác là đa giác đơn giản nhất và "cứng vững" — dùng trong kết cấu, định vị.

---

## 2. Phân loại tam giác

### Theo cạnh

| Loại | Tính chất |
|------|-----------|
| **Đều** | 3 cạnh bằng nhau → 3 góc bằng nhau $= 60^\circ$ |
| **Cân** | 2 cạnh bằng → 2 góc đáy bằng |
| **Thường** | 3 cạnh khác nhau |

### Theo góc

| Loại | Tính chất |
|------|-----------|
| **Nhọn** | 3 góc $< 90^\circ$ |
| **Vuông** | 1 góc $= 90^\circ$ |
| **Tù** | 1 góc $> 90^\circ$ |

💡 **Trực giác / Hình dung**: phân loại theo cạnh đo "mức đối xứng" (đều = đối xứng nhất, cân = đối xứng 1 trục, thường = không đối xứng). Phân loại theo góc đo "độ nhọn/tù" của góc lớn nhất. Hai cách phân loại độc lập — 1 tam giác vừa có loại cạnh vừa có loại góc (vd "cân vuông": 2 cạnh bằng + 1 góc vuông).

**4 ví dụ số đa dạng**:
- Cạnh 5, 5, 5: đều (3 góc $60^\circ$) → cũng là nhọn.
- Cạnh 5, 5, 8: cân (2 góc đáy bằng nhau).
- Góc $30^\circ, 60^\circ, 90^\circ$: vuông + thường (3 cạnh khác nhau).
- Góc $100^\circ, 40^\circ, 40^\circ$: tù + cân (góc $100^\circ > 90^\circ$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tam giác đều có phải tam giác cân không?"* Có — đều là trường hợp đặc biệt của cân (cân cần $\ge 2$ cạnh bằng, đều có cả 3 bằng).
- *"Có tam giác vừa vuông vừa tù không?"* Không. Một tam giác có nhiều nhất 1 góc $\ge 90^\circ$ (vì tổng $180^\circ$, nếu 2 góc $\ge 90^\circ$ thì tổng $\ge 180^\circ$, không còn chỗ cho góc thứ 3).
- *"Tam giác cân thì 2 góc nào bằng nhau?"* Hai góc **đối diện** 2 cạnh bằng nhau (gọi là 2 góc đáy) bằng nhau.

⚠ **Lỗi thường gặp**: nghĩ "tam giác có 1 góc nhọn là tam giác nhọn". Sai — **nhọn** đòi hỏi **cả 3** góc $< 90^\circ$. Phản ví dụ: tam giác $100^\circ, 50^\circ, 30^\circ$ có 2 góc nhọn nhưng vẫn là tam giác **tù** (vì có góc $100^\circ$).

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có góc $90^\circ, 45^\circ, 45^\circ$ thuộc loại nào (theo cả cạnh và góc)?
2. Tam giác có thể vừa đều vừa vuông không?

<details><summary>Đáp án</summary>

1. Vuông (có góc $90^\circ$) + cân (2 góc $45^\circ$ bằng → 2 cạnh bằng) → "tam giác vuông cân".
2. Không. Đều → 3 góc đều $60^\circ$ → không có góc $90^\circ$.

</details>

### 📝 Tóm tắt mục 2

- Theo cạnh: đều (3 cạnh =), cân (2 cạnh =), thường (3 cạnh khác).
- Theo góc: nhọn (3 góc $< 90^\circ$), vuông (1 góc $= 90^\circ$), tù (1 góc $> 90^\circ$).
- Một tam giác có **nhiều nhất 1** góc $\ge 90^\circ$.
- Đều là trường hợp đặc biệt của cân; phân loại cạnh và góc độc lập, kết hợp được.

---

## 3. Tam giác bằng nhau (Congruence)

Hai tam giác **bằng nhau** = cùng kích thước và hình dạng (đặt chồng lên nhau khít).

💡 **Trực giác / Hình dung**: 2 tam giác bằng nhau giống 2 bản in cùng 1 khuôn — có thể xoay, lật, dời để chồng khít hoàn toàn. Câu hỏi cốt lõi: cần biết **tối thiểu mấy yếu tố** (cạnh/góc) để chắc chắn 2 tam giác giống hệt? Đáp án: 3 yếu tố, sắp đúng kiểu (SSS, SAS, ASA, AAS).

### 3 trường hợp chứng minh bằng nhau

1. **SSS (Side-Side-Side)**: 3 cạnh tương ứng bằng nhau.
2. **SAS (Side-Angle-Side)**: 2 cạnh + góc kẹp giữa bằng nhau.
3. **ASA (Angle-Side-Angle)**: 2 góc + cạnh kẹp giữa bằng nhau.

Có thêm: **AAS** (2 góc + 1 cạnh không kẹp giữa — vẫn xác định duy nhất vì biết 2 góc → biết góc thứ 3).

**Lưu ý**: SSA (2 cạnh + 1 góc không kẹp) KHÔNG đảm bảo bằng nhau (vì có thể có 2 tam giác khác nhau thỏa mãn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 3 cạnh (SSS) là đủ mà 3 góc (AAA) lại không?"* Vì 3 cạnh khóa chặt cả kích thước lẫn hình dạng. 3 góc chỉ khóa hình dạng — 2 tam giác cùng góc nhưng to nhỏ khác nhau (đó là **đồng dạng**, không phải bằng nhau).
- *"Vì sao SSA không đủ?"* Vì cạnh đối diện góc đã cho có thể "với" tới đường kia ở 2 vị trí khác nhau → 2 tam giác khác. Đây gọi là "trường hợp mơ hồ" (ambiguous case). Ngoại lệ: nếu góc đó là góc vuong/tù thì lại đủ.
- *"AAS có khác ASA không?"* Khác vị trí cạnh: ASA cạnh **kẹp giữa** 2 góc, AAS cạnh **không kẹp**. Cả hai đều đủ vì biết 2 góc thì suy ra góc thứ 3, đưa về ASA.

⚠ **Lỗi thường gặp**: dùng "SSA" để kết luận bằng nhau. Phản ví dụ: 2 tam giác cùng có cạnh 5, cạnh 7 và góc $30^\circ$ (không kẹp giữa) có thể khác nhau hoàn toàn — cạnh thứ 3 ra 2 giá trị. Phải có góc **kẹp giữa** (SAS) mới chắc.

🔁 **Dừng lại tự kiểm tra**

1. Biết 2 tam giác có 2 cạnh 6 và 8, góc kẹp giữa chúng đều $50^\circ$. Chúng có bằng nhau không? Theo trường hợp nào?
2. Hai tam giác có 3 cặp góc bằng nhau. Bằng nhau hay chỉ đồng dạng?

<details><summary>Đáp án</summary>

1. Bằng nhau, theo **SAS** (cạnh–góc kẹp–cạnh).
2. Chỉ **đồng dạng** (AAA không xác định kích thước).

</details>

### 📝 Tóm tắt mục 3

- Bằng nhau = chồng khít hoàn toàn (cùng cả kích thước lẫn hình dạng).
- 4 dấu hiệu đủ: **SSS, SAS, ASA, AAS**.
- **SSA** và **AAA** KHÔNG đủ (SSA mơ hồ; AAA chỉ cho đồng dạng).
- Cần đúng 3 yếu tố sắp đúng kiểu; trong đó phải có ít nhất 1 cạnh.

---

## 4. Tam giác đồng dạng (Similarity)

Hai tam giác **đồng dạng** = cùng hình dạng nhưng có thể khác kích thước. Mọi cạnh tương ứng có **tỉ lệ bằng nhau**.

💡 **Trực giác / Hình dung**: đồng dạng giống ảnh và bản phóng to của nó — mọi chi tiết giữ nguyên tỉ lệ, chỉ khác kích thước tổng. Bóng của 1 cây và bóng của cái cọc cùng lúc tạo 2 tam giác đồng dạng (cùng góc nắng) → đo cọc + bóng để tính chiều cao cây (cách Thales đo kim tự tháp).

### 3 trường hợp đồng dạng

1. **AAA** (3 góc bằng): chỉ cần 2 góc bằng nhau (góc thứ 3 tự suy ra) — gọi là **AA**.
2. **SAS**: tỉ lệ 2 cặp cạnh bằng + góc kẹp giữa bằng.
3. **SSS**: tỉ lệ 3 cặp cạnh bằng.

### Hệ quả quan trọng

Nếu tam giác ABC đồng dạng A'B'C' với tỉ số k, thì:
- Mọi cạnh ABC $\times k =$ cạnh tương ứng A'B'C'.
- Diện tích A'B'C' $= k^2 \times$ diện tích ABC.
- Chu vi A'B'C' $= k \times$ chu vi ABC.

**Verify bằng số**: tam giác cạnh 3-4-5 (chu vi 12, diện tích $\frac{1}{2}\cdot 3\cdot 4 = 6$) đồng dạng tỉ số $k=2$ → cạnh 6-8-10, chu vi $24 = 12\cdot 2$ ✓, diện tích $\frac{1}{2}\cdot 6\cdot 8 = 24 = 6\cdot 2^2 = 6\cdot 4$ ✓. Tỉ số diện tích $=$ **$k^2$**, không phải $k$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao diện tích nhân $k^2$ chứ không phải $k$?"* Vì diện tích là "2 chiều" — cả chiều dài lẫn chiều rộng đều nhân $k$ → $k\cdot k = k^2$. Hình dung: phóng to gấp đôi ($k=2$) thì cần 4 ô gạch thay vì 1.
- *"AA và AAA có giống nhau không?"* Giống về kết quả: chỉ cần 2 góc bằng (AA) là đủ, vì góc thứ 3 $= 180 - (2$ góc kia$)$ tự bằng nhau.
- *"Bằng nhau có phải là đồng dạng không?"* Có — bằng nhau là đồng dạng với tỉ số $k = 1$.

⚠ **Lỗi thường gặp**: lấy tỉ số diện tích = tỉ số cạnh. Phản ví dụ: 2 tam giác đồng dạng tỉ số cạnh $k = 3$ thì tỉ số diện tích $=$ **9** ($= 3^2$), không phải 3. Tương tự, tỉ số thể tích của 2 khối đồng dạng $= k^3$.

🔁 **Dừng lại tự kiểm tra**

1. Hai tam giác đồng dạng, tỉ số cạnh 5:2. Tỉ số diện tích là bao nhiêu?
2. Tam giác có góc $40^\circ$ và $60^\circ$, tam giác kia có góc $60^\circ$ và $80^\circ$. Đồng dạng không?

<details><summary>Đáp án</summary>

1. $(5/2)^2 =$ **$25/4$** $= 6.25$.
2. Tam giác 1: góc thứ 3 $= 80^\circ$ → bộ góc {40, 60, 80}. Tam giác 2: thứ 3 $= 40^\circ$ → {60, 80, 40} = cùng bộ → **đồng dạng** (AA).

</details>

### 📝 Tóm tắt mục 4

- Đồng dạng = cùng hình dạng, khác kích thước; cạnh tương ứng tỉ lệ $k$.
- 3 dấu hiệu: **AA** (đủ), **SAS** (tỉ lệ 2 cạnh + góc kẹp), **SSS** (tỉ lệ 3 cạnh).
- Tỉ số cạnh $= k$ → tỉ số chu vi $= k$, **tỉ số diện tích $= k^2$** (3D: thể tích $= k^3$).
- Bằng nhau = đồng dạng với $k = 1$.

---

## 5. Định lý Pythagoras

Tam giác **vuông** với 2 cạnh góc vuông a, b và cạnh huyền c:

$$a^2 + b^2 = c^2$$

💡 **Là gì**: trong tam giác vuông, bình phương cạnh huyền = tổng bình phương 2 cạnh góc vuông.

**Vì sao quan trọng?** Vì:
- Định lý nổi tiếng nhất hình học, biết ~ 4000 năm trước.
- Cơ sở cho **khoảng cách** trong tọa độ: $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
- Liên kết hình học và đại số.

> 📐 **Định nghĩa đầy đủ — Pythagore**
>
> **(a) Là gì**: 1 quan hệ số học giữa 3 cạnh tam giác **vuông**. Không phải định nghĩa của tam giác — mà là 1 **định luật** đúng cho mọi tam giác vuông. Cạnh huyền c (đối diện góc vuông) luôn thoả: $c^2 = a^2 + b^2$.
>
> **(b) Vì sao cần**: Trước Pythagore, không có cách tính cạnh huyền từ 2 cạnh kia. Định lý cho **công thức đại số** thay vì phải đo. Quan trọng hơn — nó là cầu nối hình học ↔ đại số (sau này thành nền cho tọa độ Đề-các, khoảng cách trong $\mathbb{R}^n$, độ dài vector). Mọi công thức khoảng cách trong vũ trụ đều xuất phát từ đây.
>
> **(c) Ví dụ số**: Tam giác vuông $a=3$, $b=4$: $c^2 = 9 + 16 = 25$ → $c = 5$. Tam giác vuông $a=5$, $b=12$: $c^2 = 25 + 144 = 169$ → $c = 13$. Đảo lại: tam giác cạnh 6-8-10 có vuông không? $6^2 + 8^2 = 36+64 = 100 = 10^2$ ✓ → vuông. Tam giác 4-5-6: $16+25 = 41 \neq 36$ → KHÔNG vuông.

### Chứng minh trực giác — Bằng diện tích

Vẽ hình vuông cạnh $(a+b) \times (a+b)$, chia thành 4 tam giác vuông + 1 hình vuông cạnh c ở giữa:

$$\begin{aligned}
(a+b)^2 &= 4 \cdot \left(\tfrac{1}{2}ab\right) + c^2 \\
a^2 + 2ab + b^2 &= 2ab + c^2 \\
a^2 + b^2 &= c^2 \quad ✓
\end{aligned}$$

### Ví dụ — Bộ ba Pythagoras nguyên

| a | b | c |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |
| 7 | 24 | 25 |

Bất kỳ bội số nào của bộ Pythagoras cũng là bộ Pythagoras (vd 6-8-10, 9-12-15).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Định lý chỉ đúng cho tam giác vuông?"* Đúng. Với tam giác **không** vuông phải dùng định lý cosin: $c^2 = a^2 + b^2 - 2ab\cdot\cos(C)$. Khi $C = 90^\circ$, $\cos 90^\circ = 0$ → quay về Pythagoras.
- *"Làm sao biết cạnh nào là cạnh huyền?"* Cạnh huyền luôn là cạnh **dài nhất** và **đối diện góc vuông**. Trong 3-4-5 thì 5 là huyền.
- *"Định lý đảo dùng để làm gì?"* Để **kiểm tra** 1 tam giác có vuông không mà không cần đo góc: nếu $c^2 = a^2 + b^2$ thì vuông. Vd 6-8-10: $36+64 = 100 = 10^2$ → vuông.

⚠ **Lỗi thường gặp**: cộng cạnh thay vì cộng bình phương — viết "$c = a + b$". Phản ví dụ: $a=3$, $b=4$ → $c = 7$ là **sai**, đúng phải $c = \sqrt{9+16} = 5$. Lỗi thứ 2: gán nhầm cạnh huyền — với $a=6$, $b=8$ mà tính $6^2 + 10^2$ rồi lấy 8 làm huyền là sai (8 không phải dài nhất).

🔁 **Dừng lại tự kiểm tra**

1. Tam giác vuông có 2 cạnh góc vuông 9 và 12. Cạnh huyền bằng bao nhiêu?
2. Tam giác cạnh 7, 24, 25 có vuông không?

<details><summary>Đáp án</summary>

1. $c = \sqrt{81 + 144} = \sqrt{225} =$ **15** (bộ 9-12-15 $= 3\cdot(3$-$4$-$5)$).
2. $7^2 + 24^2 = 49 + 576 = 625 = 25^2$ ✓ → **vuông**.

</details>

### 📝 Tóm tắt mục 5

- Tam giác **vuông**: $a^2 + b^2 = c^2$ (c là cạnh huyền, dài nhất, đối diện góc vuông).
- Chứng minh trực giác bằng diện tích hình vuông $(a+b)^2$.
- **Đảo lại**: $c^2 = a^2 + b^2$ → tam giác vuông (cách kiểm tra vuông).
- Bộ ba nguyên phổ biến: 3-4-5, 5-12-13, 8-15-17, 7-24-25 (và mọi bội số).

---

## 6. Diện tích tam giác

💡 **Trực giác / Hình dung**: tam giác là "nửa hình bình hành". Ghép 2 bản sao tam giác (1 cái lật ngược) → được hình bình hành diện tích đáy·cao → tam giác $= \frac{1}{2}\cdot$đáy$\cdot$cao. Đó là lý do mọi công thức diện tích tam giác đều có hệ số $\frac{1}{2}$.

3 công thức phổ biến:

### 6.1. Cơ bản

$$S = \frac{1}{2} \cdot \text{đáy} \cdot \text{chiều cao}$$

### 6.2. Công thức Heron — chỉ cần 3 cạnh

$$S = \sqrt{s(s-a)(s-b)(s-c)} \quad \text{với } s = \frac{a+b+c}{2} \text{ (nửa chu vi)}$$

### 6.3. Công thức SAS

$$S = \frac{1}{2} \cdot a \cdot b \cdot \sin(C)$$

trong đó C là góc kẹp giữa 2 cạnh a và b.

### 6.4. Verify cả 3 công thức trên cùng 1 tam giác

Tam giác vuông cạnh 6, 8, huyền 10 (vuông tại góc giữa 2 cạnh 6 và 8):
- **Cơ bản** (đáy 6, cao 8): $S = \frac{1}{2}\cdot 6\cdot 8 =$ **24**.
- **Heron**: $s = (6+8+10)/2 = 12$. $S = \sqrt{12\cdot(12-6)\cdot(12-8)\cdot(12-10)} = \sqrt{12\cdot 6\cdot 4\cdot 2} = \sqrt{576} =$ **24** ✓.
- **SAS** (góc kẹp $= 90^\circ$, $\sin 90^\circ = 1$): $S = \frac{1}{2}\cdot 6\cdot 8\cdot 1 =$ **24** ✓.

Cả 3 cho cùng 24 — chọn công thức theo dữ kiện đang có (biết cao → dùng cơ bản; chỉ biết 3 cạnh → Heron; biết 2 cạnh + góc kẹp → SAS).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng công thức nào?"* Biết đáy + chiều cao → cơ bản. Chỉ biết 3 cạnh → Heron. Biết 2 cạnh + góc kẹp → $\frac{1}{2}ab\cdot\sin C$.
- *"Heron có cần tam giác vuông không?"* Không — Heron đúng cho **mọi** tam giác, chỉ cần 3 cạnh.
- *"Đơn vị diện tích là gì?"* Luôn là đơn vị **bình phương** (cm², m²...). Nếu cạnh tính bằng cm thì diện tích là cm².

⚠ **Lỗi thường gặp**: quên đơn vị bình phương — viết diện tích là "24 cm" thay vì "24 cm²". Lỗi thứ 2: dùng cạnh bên làm "chiều cao". Chiều cao phải **vuông góc** với đáy, không phải cạnh xiên. Phản ví dụ: tam giác đáy 6, cạnh bên 5 nghiêng — $S \neq \frac{1}{2}\cdot 6\cdot 5$ trừ khi cạnh 5 đó vuông góc với đáy.

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có 3 cạnh 13, 14, 15. Tính diện tích bằng Heron.
2. Tam giác có 2 cạnh 10 và 6, góc kẹp $30^\circ$. Diện tích?

<details><summary>Đáp án</summary>

1. $s = (13+14+15)/2 = 21$. $S = \sqrt{21\cdot 8\cdot 7\cdot 6} = \sqrt{7056} =$ **84**.
2. $S = \frac{1}{2}\cdot 10\cdot 6\cdot\sin 30^\circ = \frac{1}{2}\cdot 10\cdot 6\cdot 0.5 =$ **15**.

</details>

### 📝 Tóm tắt mục 6

- **Cơ bản**: $S = \frac{1}{2}\cdot$đáy$\cdot$cao (cao phải vuông góc với đáy).
- **Heron**: $S = \sqrt{s(s-a)(s-b)(s-c)}$ với $s =$ nửa chu vi — chỉ cần 3 cạnh, dùng cho mọi tam giác.
- **SAS**: $S = \frac{1}{2}\cdot a\cdot b\cdot\sin C$ (2 cạnh + góc kẹp).
- Diện tích luôn có đơn vị **bình phương**.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tam giác có cạnh 3, 4, 5. Đây có là tam giác vuông không?

**Bài 2**: Tam giác đều cạnh 6 có diện tích bao nhiêu?

**Bài 3**: Tam giác ABC có $A = 80^\circ$, $B = 60^\circ$. Tìm C.

**Bài 4**: Có 3 đoạn dài 2, 3, 6. Tạo được tam giác không?

**Bài 5**: Tam giác có 3 cạnh 5, 12, 13. Tính diện tích bằng 2 cách.

**Bài 6**: 2 tam giác đồng dạng tỉ số $k = 3$. Tỉ lệ diện tích là bao nhiêu?

### Lời giải

**Bài 1**: $3^2 + 4^2 = 9 + 16 = 25 = 5^2$. → **VUÔNG** (Pythagoras đảo).

**Bài 2**: Chiều cao $= (\text{cạnh} \times \sqrt{3})/2 = 3\sqrt{3}$. $S = \frac{1}{2} \cdot 6 \cdot 3\sqrt{3} =$ **$9\sqrt{3} \approx 15.59$**.

**Bài 3**: $C = 180 - 80 - 60 =$ **$40^\circ$**.

**Bài 4**: $2 + 3 = 5 < 6$ → vi phạm bất đẳng thức tam giác → **KHÔNG tạo được**.

**Bài 5**: 
- Pythagoras: $5^2 + 12^2 = 25 + 144 = 169 = 13^2$ → tam giác vuông.
- Cách 1: $S = \frac{1}{2} \cdot 5 \cdot 12 =$ **30**.
- Cách 2 (Heron): $s = 15$. $S = \sqrt{15 \cdot 10 \cdot 3 \cdot 2} = \sqrt{900} =$ **30** ✓.

**Bài 6**: Tỉ lệ diện tích $= k^2 =$ **9**.

---

## 8. Bài tiếp theo

[Lesson 03 — Đường tròn](../lesson-03-circles/).

## 📝 Tổng kết

1. **Tam giác**: tổng 3 góc $= 180^\circ$. Bất đẳng thức: cạnh $<$ tổng 2 cạnh kia.
2. **Phân loại**: đều/cân/thường + nhọn/vuông/tù.
3. **Bằng nhau**: SSS, SAS, ASA. Đồng dạng: AA, SAS, SSS.
4. **Pythagoras**: $a^2 + b^2 = c^2$ (vuông). Bộ 3-4-5 phổ biến nhất.
5. **Diện tích**: $\frac{1}{2}\cdot$đáy$\cdot$cao $= \sqrt{s(s-a)(s-b)(s-c)}$ (Heron) $= \frac{1}{2}\cdot a\cdot b\cdot\sin(C)$.
