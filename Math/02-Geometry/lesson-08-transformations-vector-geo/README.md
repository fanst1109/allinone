# Lesson 08 — Biến hình & Vector hình học

## Mục tiêu

- Hiểu **4 phép biến hình cơ bản** trong mặt phẳng: tịnh tiến, đối xứng (trục, tâm), quay, vị tự.
- Biểu diễn mỗi phép biến hình bằng **công thức tọa độ** và **ma trận** (cầu nối với Đại số tuyến tính ở Tier 6).
- Hiểu **vector hình học**: cộng/trừ, nhân vô hướng, ứng dụng (chứng minh hình học bằng vector).
- Phân biệt **phép dời hình** (giữ khoảng cách) và **phép đồng dạng** (giữ tỉ lệ).

## Kiến thức tiền đề

- [Lesson 06 — Tọa độ Oxy](../lesson-06-coordinate-plane-conics/), [Lesson 07 — Tọa độ Oxyz](../lesson-07-coordinate-3d/).

---

## 1. Phép biến hình là gì?

💡 **Trực giác**: Phép biến hình là một **quy tắc** biến mỗi điểm M trong mặt phẳng thành điểm M' khác (hoặc giữ nguyên). Hình ảnh: cầm 1 tờ giấy có hình tam giác, di chuyển/lật/xoay/phóng to → hình mới.

**Định nghĩa hình thức**: Phép biến hình **f** là một ánh xạ 1-1 từ mặt phẳng vào chính nó: với mỗi M có duy nhất M' = f(M).

**Phân loại theo tính chất**:
- **Phép dời hình** (isometry): giữ khoảng cách. AB = A'B'. Bao gồm: tịnh tiến, đối xứng, quay.
- **Phép đồng dạng** (similarity): giữ tỉ lệ khoảng cách. A'B'/AB = k (hằng). Bao gồm dời hình + vị tự.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phép biến hình khác hàm số chỗ nào?"* Bản chất là 1 hàm số, nhưng "đầu vào" và "đầu ra" đều là **điểm** trong mặt phẳng (không phải số). f: điểm → điểm.
- *"Dời hình có phải luôn là đồng dạng không?"* Có — dời hình là đồng dạng với tỉ số k = 1 (giữ nguyên kích thước). Mọi dời hình đều đồng dạng, nhưng không ngược lại (vị tự đồng dạng mà không dời hình).
- *"Vì sao gọi là ánh xạ 1-1?"* Vì mỗi điểm M cho đúng 1 ảnh M', và mỗi M' đến từ đúng 1 M — không có 2 điểm cùng ảnh, không có điểm bị "bỏ sót".

⚠ **Lỗi thường gặp**: nghĩ "mọi phép biến hình đều giữ kích thước". Sai — **vị tự** (k≠±1) phóng to/thu nhỏ, không giữ khoảng cách. Phản ví dụ: vị tự k=3 biến đoạn dài 2 thành đoạn dài 6 (A'B' = 3·AB).

🔁 **Dừng lại tự kiểm tra**

1. Phép nào trong số: tịnh tiến, quay, vị tự (k=2) — KHÔNG phải phép dời hình?
2. Phép dời hình có giữ diện tích hình không?

<details><summary>Đáp án</summary>

1. Vị tự k=2 (đổi kích thước → A'B' = 2·AB ≠ AB). Tịnh tiến và quay giữ khoảng cách.
2. Có — dời hình giữ khoảng cách nên giữ cả góc và diện tích.

</details>

### 📝 Tóm tắt mục 1

- Phép biến hình = ánh xạ 1-1 từ mặt phẳng vào chính nó (điểm → điểm).
- **Dời hình**: giữ khoảng cách (tịnh tiến, đối xứng, quay).
- **Đồng dạng**: giữ tỉ lệ (dời hình + vị tự).
- Dời hình ⊂ đồng dạng (dời hình = đồng dạng với k=1).

---

## 2. Tịnh tiến (Translation)

💡 **Hình dung**: Đẩy mọi điểm theo cùng 1 hướng, cùng 1 khoảng cách. Như đẩy 1 tờ giấy trượt trên bàn.

**Công thức**: Cho vector tịnh tiến **v** = (a, b). Phép tịnh tiến T_v biến M(x, y) → M'(x+a, y+b).

```
M(x, y) ──T_v──→ M'(x+a, y+b)
```

**Ví dụ số**: v = (3, -2). M(1, 5) → M'(4, 3).

**Ma trận** (dạng affine 3×3, dùng tọa độ thuần nhất):
```
[x']   [1 0 a] [x]
[y'] = [0 1 b] [y]
[1 ]   [0 0 1] [1]
```

**Tính chất**: Bảo toàn khoảng cách, góc, diện tích. Hai đường thẳng song song vẫn song song.

**4 ví dụ số đa dạng** (v = (3, −2)):
- M(0,0) → (3,−2).
- M(1,5) → (4,3).
- M(−2,4) → (1,2).
- M(−3,2) → (0,0) (về gốc — vì M = −v).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tịnh tiến có làm hình xoay hay phóng to không?"* Không — chỉ "trượt" cả hình theo 1 hướng, giữ nguyên kích thước, hướng, hình dạng.
- *"Tịnh tiến rồi tịnh tiến nữa thì sao?"* Bằng 1 tịnh tiến duy nhất với vector = tổng 2 vector. T_u rồi T_v = T_(u+v).
- *"Vì sao ma trận tịnh tiến phải 3×3 (affine)?"* Vì cộng hằng số (a, b) không biểu diễn được bằng nhân ma trận 2×2; phải dùng "tọa độ thuần nhất" thêm 1 chiều.

⚠ **Lỗi thường gặp**: trừ thay vì cộng vector. T_v biến (x,y) → (x+a, y+b), **cộng** từng thành phần. Phản ví dụ: v=(3,−2), M(1,5) → (1+3, 5+(−2)) = (4,3), không phải (1−3, 5+2) = (−2,7).

🔁 **Dừng lại tự kiểm tra**

1. Tịnh tiến v = (−4, 6) biến M(5, 1) thành điểm nào?
2. Tịnh tiến nào biến gốc O(0,0) về điểm (7, −3)?

<details><summary>Đáp án</summary>

1. (5−4, 1+6) = **(1, 7)**.
2. v = **(7, −3)** (vì O + v = (7,−3)).

</details>

### 📝 Tóm tắt mục 2

- Tịnh tiến T_v: M(x,y) → M'(x+a, y+b) với v = (a,b).
- Là phép dời hình: giữ khoảng cách, góc, diện tích, tính song song.
- Ghép 2 tịnh tiến = 1 tịnh tiến với vector tổng.
- Ma trận affine 3×3 (tọa độ thuần nhất) vì cộng hằng số.

---

## 3. Đối xứng (Reflection)

💡 **Hình dung**: đối xứng = "soi gương". Trục đối xứng là mặt gương; ảnh M' là ảnh phản chiếu của M, cách gương đúng bằng M nhưng ở phía bên kia. Lật 1 tờ giấy qua 1 đường gấp cũng là đối xứng. Đặc điểm: đối xứng **lật hướng** (chữ "b" thành "d") — khác với quay (giữ hướng).

### 3.1. Đối xứng qua trục Ox / Oy

- Qua Ox: M(x, y) → M'(x, -y). (Lật trên-dưới)
- Qua Oy: M(x, y) → M'(-x, y). (Lật trái-phải)

**Ma trận**:
```
Ox: [1  0]    Oy: [-1  0]
    [0 -1]        [ 0  1]
```

### 3.2. Đối xứng qua điểm O (đối xứng tâm)

M(x, y) → M'(-x, -y). Tương đương quay 180° quanh O.

### 3.3. Đối xứng qua đường thẳng y = x

M(x, y) → M'(y, x). Đổi chỗ tọa độ.

💡 **Vì sao đặc biệt?** Đây là phép biến hình "đảo ngược" hàm số: nếu y = f(x) thì hàm ngược có đồ thị đối xứng qua y = x.

**4 ví dụ số đa dạng** (điểm M(3, 5)):
- Qua Ox: (3, −5) (đổi dấu y).
- Qua Oy: (−3, 5) (đổi dấu x).
- Qua O (tâm): (−3, −5) (đổi dấu cả hai).
- Qua y = x: (5, 3) (đổi chỗ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đối xứng tâm O khác đối xứng trục thế nào?"* Đối xứng tâm = quay 180° quanh O (đổi dấu cả x và y); đối xứng trục = lật qua 1 đường (đổi dấu 1 tọa độ với Ox/Oy).
- *"Đối xứng 2 lần qua cùng 1 trục thì sao?"* Về lại điểm gốc (đối xứng là phép "tự nghịch đảo": làm 2 lần = identity).
- *"Vì sao qua y=x lại đổi chỗ tọa độ?"* Vì đường y=x đối xứng vai trò của x và y; soi gương qua nó hoán đổi 2 trục.

⚠ **Lỗi thường gặp**: lẫn đối xứng qua Ox với qua Oy. Qua **Ox** (trục ngang) giữ x, đổi dấu **y**; qua **Oy** (trục dọc) giữ y, đổi dấu **x**. Phản ví dụ: M(3,5) qua Ox = (3,−5), KHÔNG phải (−3,5).

🔁 **Dừng lại tự kiểm tra**

1. M(−2, 7). Tìm ảnh qua Oy và qua tâm O.
2. M(4, 1) đối xứng qua y = x thành điểm nào?

<details><summary>Đáp án</summary>

1. Qua Oy: (2, 7) (đổi dấu x). Qua O: (2, −7) (đổi dấu cả hai).
2. (1, 4) (đổi chỗ tọa độ).

</details>

### 📝 Tóm tắt mục 3

- Đối xứng = "soi gương", **lật hướng** hình.
- Qua Ox: (x,−y); qua Oy: (−x,y); qua O: (−x,−y); qua y=x: (y,x).
- Đối xứng tâm O = quay 180°.
- Đối xứng làm 2 lần qua cùng trục = về điểm gốc.

---

## 4. Phép quay (Rotation)

💡 **Hình dung**: Xoay mặt phẳng quanh 1 điểm cố định 1 góc α.

**Công thức** (quay quanh gốc O, góc α ngược chiều kim đồng hồ):
```
x' = x·cos α − y·sin α
y' = x·sin α + y·cos α
```

**Ma trận quay**:
```
R(α) = [cos α  −sin α]
       [sin α   cos α]
```

> 📐 **Định nghĩa đầy đủ — Phép quay quanh O góc α**
>
> **(a) Là gì**: 1 ánh xạ biến mỗi điểm (x, y) thành (x', y') = R(α)·(x, y), với R(α) là ma trận chứa cos/sin của α. **Đặc trưng**: bảo toàn khoảng cách (mọi điểm về O cùng khoảng) và bảo toàn hướng (không lật).
>
> **(b) Vì sao cần**: Vì quay là 1 trong những phép biến hình cơ bản — xuất hiện ở mọi nơi từ đồ hoạ máy tính (xoay nhân vật, camera), robotics (xoay khớp), thiên văn (Trái Đất xoay), đến cơ học (vận tốc góc). Biểu diễn bằng ma trận cho phép ghép nhiều phép quay = nhân ma trận (kết hợp = ghép biến đổi), điều khó làm bằng công thức rời rạc. Cốt lõi cho hệ toạ độ chuyển động.
>
> **(c) Ví dụ số**: Quay (1, 0) góc 90°: x' = 1·0−0·1 = 0, y' = 1·1+0·0 = 1 → **(0, 1)** ✓. Quay (1, 0) góc 60°: x' = 0.5, y' = √3/2 ≈ 0.866 → (0.5, 0.866). Quay (3, 4) góc 90°: x' = 0−4 = -4, y' = 3+0 = 3 → **(-4, 3)** (mô-đun bảo toàn: |3+4i|=5, |-4+3i|=5). Quay 180° = R = [[-1,0],[0,-1]] (giống đối xứng O). Quay 2 lần 30° = quay 60° (ghép = cộng góc).

**Ví dụ số**: Quay M(1, 0) góc 90°. cos 90° = 0, sin 90° = 1.
- x' = 1·0 − 0·1 = 0
- y' = 1·1 + 0·0 = 1
- M'(0, 1) ✓ (đúng — điểm (1,0) quay 90° thành (0,1))

**Quay 180°**: cos 180° = -1, sin 180° = 0 → R = [[-1,0],[0,-1]] → giống đối xứng tâm O.

⚠ **Quay quanh điểm I khác O**: Phải tịnh tiến về O trước. M → M − I → quay → kết quả + I.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Quay góc dương là chiều nào?"* Quy ước: góc dương = **ngược chiều kim đồng hồ**. Góc âm = cùng chiều kim đồng hồ.
- *"Quay 90° rồi 90° nữa có bằng quay 180°?"* Có — ghép 2 phép quay = cộng góc (R(α)·R(β) = R(α+β)). Đây là sức mạnh của biểu diễn ma trận.
- *"Quay có giữ kích thước không?"* Có — quay là phép dời hình, mọi điểm giữ nguyên khoảng cách tới tâm quay (|3+4i| = 5 trước và sau khi quay).

🔁 **Dừng lại tự kiểm tra**

1. Quay điểm (0, 1) góc 90° quanh O thành điểm nào?
2. Quay điểm (2, 0) góc 180° quanh O thành điểm nào?

<details><summary>Đáp án</summary>

1. x' = 0·cos90 − 1·sin90 = −1; y' = 0·sin90 + 1·cos90 = 0 → **(−1, 0)**.
2. Quay 180° = đổi dấu cả hai → **(−2, 0)**.

</details>

### 📝 Tóm tắt mục 4

- Quay quanh O góc α: x' = xcosα − ysinα, y' = xsinα + ycosα.
- Ma trận quay R(α) = [[cosα, −sinα],[sinα, cosα]].
- Góc dương = ngược chiều kim đồng hồ; ghép 2 phép quay = cộng góc.
- Quay là dời hình (giữ khoảng cách); quay 180° = đối xứng tâm O.

---

## 5. Phép vị tự (Dilation / Homothety)

💡 **Hình dung**: Phóng to/thu nhỏ hình ảnh quanh 1 tâm. Như zoom camera quanh 1 điểm.

**Công thức** (tâm O, tỉ số k ≠ 0):
```
M(x, y) → M'(k·x, k·y)
```

- k > 1: phóng to.
- 0 < k < 1: thu nhỏ.
- k = -1: giống đối xứng tâm O.
- k < 0: vừa thu nhỏ/phóng to vừa lật (như qua O).

**Ma trận**: R = k·I = [[k,0],[0,k]].

**Tính chất**: KHÔNG bảo toàn khoảng cách (A'B' = |k|·AB), nhưng **bảo toàn góc** và **tỉ lệ**. Mọi hình → hình đồng dạng.

**4 ví dụ số đa dạng** (tâm O, điểm M(4, 2)):
- k = 2: (8, 4) (phóng to gấp đôi).
- k = 0.5: (2, 1) (thu nhỏ một nửa).
- k = −1: (−4, −2) (= đối xứng tâm O).
- k = 3: (12, 6); diện tích hình tăng k² = 9 lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vị tự k âm nghĩa là gì?"* Vừa phóng/thu theo |k|, vừa lật qua tâm O. k=−1 đúng bằng đối xứng tâm.
- *"Diện tích đổi theo k hay k²?"* Theo **k²** (vì 2 chiều). Vị tự k=3 → diện tích × 9. Bán kính đường tròn × 3 → diện tích × 9.
- *"Vì sao vị tự là đồng dạng mà không phải dời hình?"* Vì giữ hình dạng + góc (đồng dạng) nhưng đổi kích thước (không dời hình), trừ khi k=±1.

⚠ **Lỗi thường gặp**: cho rằng diện tích nhân k (thay vì k²) hoặc quên đổi cả bán kính khi vị tự đường tròn. Phản ví dụ: vị tự k=2 đường tròn R=3 → R'=6 (× k), nhưng diện tích × k² = 4. Lỗi: tâm I của đường tròn cũng phải vị tự (I → k·I khi tâm vị tự là O).

🔁 **Dừng lại tự kiểm tra**

1. Vị tự tâm O, k=3 biến điểm (2, −1) thành điểm nào?
2. Vị tự k=2 biến đường tròn bán kính 4 thành đường tròn bán kính bao nhiêu? Diện tích tăng mấy lần?

<details><summary>Đáp án</summary>

1. (3·2, 3·(−1)) = **(6, −3)**.
2. Bán kính 8 (= 4·2); diện tích tăng 2² = **4 lần**.

</details>

### 📝 Tóm tắt mục 5

- Vị tự tâm O tỉ số k: M(x,y) → M'(kx, ky); ma trận k·I.
- Không giữ khoảng cách (A'B' = |k|·AB) nhưng giữ góc + tỉ lệ → ra hình đồng dạng.
- Diện tích × **k²** (3D: thể tích × k³).
- k=−1 = đối xứng tâm O; k>0 không lật, k<0 lật.

---

## 6. Vector hình học

### 6.1. Định nghĩa

💡 **Trực giác**: Vector = mũi tên có **hướng** và **độ dài**, không quan tâm vị trí đặt. **AB** = mũi tên từ A đến B.

**Khác với đoạn thẳng**: đoạn AB không có hướng (AB = BA). Vector **AB** ≠ **BA** (ngược hướng).

**Biểu diễn tọa độ**: nếu A(x₁, y₁), B(x₂, y₂) thì **AB** = (x₂ − x₁, y₂ − y₁).

### 6.2. Các phép toán

**Cộng vector** (quy tắc hình bình hành / tam giác):
- **u** = (a, b), **v** = (c, d) → **u** + **v** = (a+c, b+d).

**Nhân với số**: k·**u** = (k·a, k·b). Phóng to k lần (nếu k > 0) hoặc đổi hướng (k < 0).

**Trung điểm AB**: M = ((A+B)/2). Vector OM = (OA + OB)/2.

### 6.3. Vector chỉ phương, vector pháp tuyến (đã gặp ở L06, L07)

- **Vector chỉ phương** của đường thẳng d: vector // d. (a, b) là VTCP → d có hệ số góc b/a.
- **Vector pháp tuyến**: vector ⊥ d. Nếu d: Ax + By + C = 0 thì n = (A, B) là VTPT.

### 6.4. Ứng dụng — chứng minh hình học bằng vector

**Ví dụ**: Chứng minh trung điểm 2 cạnh đối nhau của tứ giác bất kỳ bằng nhau **không** xảy ra trừ khi đó là hình bình hành.

Đẹp hơn: **Định lý trung điểm tam giác**. Cho M, N là trung điểm AB, AC. CMR MN // BC và MN = ½ BC.

Chứng minh:
- **AM** = ½**AB**, **AN** = ½**AC**
- **MN** = **AN** − **AM** = ½(**AC** − **AB**) = ½**BC**
- ⟹ MN // BC và MN = ½ BC. □

⟵ Chứng minh bằng vector **2 dòng**, không cần hình vẽ phức tạp. Đó là sức mạnh.

**4 ví dụ số đa dạng** (A(1,2), B(4,6)):
- **AB** = (4−1, 6−2) = (3, 4); |**AB**| = √(9+16) = 5.
- **BA** = (−3, −4) (ngược hướng **AB**); |**BA**| = 5 (cùng độ dài).
- 2·**AB** = (6, 8).
- Trung điểm AB = ((1+4)/2, (2+6)/2) = (2.5, 4).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector AB và đoạn AB khác nhau gì?"* Đoạn không có hướng (AB = BA về độ dài, là 1 đối tượng). Vector **AB** ≠ **BA** (ngược hướng), mang cả hướng lẫn độ dài.
- *"Cộng vector hình dung thế nào?"* Quy tắc tam giác: đặt nối đuôi v vào ngọn u, tổng là mũi tên từ gốc u tới ngọn v. Hoặc hình bình hành.
- *"Vì sao chứng minh bằng vector gọn?"* Vì vector "đóng gói" cả hướng và độ dài trong 1 phép toán cộng/nhân — thay cho nhiều bước hình học rời.

⚠ **Lỗi thường gặp**: lẫn vector chỉ phương (// đường) với vector pháp tuyến (⊥ đường). Nếu d: Ax+By+C=0 thì n = (A, B) là **pháp tuyến**, còn chỉ phương là (−B, A) (hoặc (B,−A)). Phản ví dụ: đường 2x+3y−1=0 có pháp (2,3), chỉ phương (−3,2) — không phải (2,3).

🔁 **Dừng lại tự kiểm tra**

1. Cho A(2,1), B(5,5). Tính **AB** và |**AB**|.
2. u = (3, 1), v = (−1, 4). Tính u + v và 2u.

<details><summary>Đáp án</summary>

1. **AB** = (3, 4); |**AB**| = √(9+16) = **5**.
2. u + v = (2, 5); 2u = (6, 2).

</details>

### 📝 Tóm tắt mục 6

- Vector = mũi tên có hướng + độ dài; **AB** ≠ **BA**; **AB** = (x₂−x₁, y₂−y₁).
- Cộng: (a,b)+(c,d) = (a+c, b+d); nhân số k·(a,b) = (ka, kb).
- Đường d: Ax+By+C=0 → pháp tuyến (A,B), chỉ phương (−B,A).
- Chứng minh hình học bằng vector ngắn gọn (vd định lý đường trung bình tam giác).

---

## 7. Tổng hợp các phép biến hình

| Phép | Công thức | Ma trận | Dời hình? | Đồng dạng? |
|------|-----------|---------|:--:|:--:|
| Tịnh tiến v=(a,b) | (x+a, y+b) | affine | ✓ | ✓ |
| Đối xứng Ox | (x, −y) | [[1,0],[0,−1]] | ✓ | ✓ |
| Đối xứng O | (−x, −y) | [[−1,0],[0,−1]] | ✓ | ✓ |
| Quay α quanh O | xcos α − ysin α, xsin α + ycos α | R(α) | ✓ | ✓ |
| Vị tự tỉ số k | (kx, ky) | k·I | ✗ | ✓ |

📝 **Liên hệ Tier 6 — Đại số tuyến tính**: mọi phép biến hình (trừ tịnh tiến) là **ma trận 2×2** nhân với vector tọa độ. Đó là lý do ma trận quan trọng — nó là ngôn ngữ chung của hình học và đại số.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tịnh tiến v = (5, -3) biến A(2, 7) thành điểm nào?

**Bài 2**: Đối xứng qua Ox biến M(4, -6) thành điểm nào? Qua O?

**Bài 3**: Quay 90° quanh O biến điểm (3, 4) thành điểm nào?

**Bài 4**: Vị tự tâm O tỉ số k = 2 biến đường tròn (x−1)² + (y−2)² = 9 thành đường tròn nào?

**Bài 5**: Cho A(1, 2), B(4, 6). Tính **AB**, |**AB**|. Tìm điểm M sao cho **AM** = 2·**AB**.

**Bài 6**: Trong tam giác ABC, M là trung điểm BC. CMR **AM** = ½(**AB** + **AC**) (dùng vector).

### Lời giải

**Bài 1**: A'(2+5, 7-3) = **(7, 4)**.

**Bài 2**: Qua Ox: **(4, 6)** (giữ x, đổi dấu y). Qua O: **(-4, 6)**.

**Bài 3**: x' = 3·0 − 4·1 = -4, y' = 3·1 + 4·0 = 3. → **(-4, 3)**.

**Bài 4**: Tâm I(1,2) → I'(2, 4). Bán kính R = 3 → R' = 2·3 = 6. → **(x−2)² + (y−4)² = 36**.

**Bài 5**: **AB** = (4-1, 6-2) = (3, 4). |**AB**| = √(9+16) = **5**.  
**AM** = 2**AB** = (6, 8) → M = A + (6, 8) = **(7, 10)**.

**Bài 6**: M trung điểm BC → **AM** = (**AB** + **AC**)/2. Chứng minh:
- **AM** = **AB** + **BM** = **AB** + ½**BC** = **AB** + ½(**AC** − **AB**) = ½**AB** + ½**AC** = ½(**AB** + **AC**). □

---

## 9. 🎉 HOÀN THÀNH TIER 2 GEOMETRY (8/8)!

Tiếp theo: **Tier 3 — Trig & Complex** (lượng giác, số phức, công thức Euler).

## 📝 Tổng kết Tier 2

1. **Euclid cơ sở**: 5 tiên đề, góc.
2. **Tam giác**: bằng nhau, đồng dạng, Pythagore.
3. **Đường tròn**: tiếp tuyến, góc nội tiếp.
4. **Đa giác**: tổng góc trong, diện tích.
5. **Hình không gian**: V, S, công thức Euler đa diện.
6. **Tọa độ Oxy + conic**: đường thẳng, parabol, ellipse, hyperbola.
7. **Tọa độ Oxyz**: mặt phẳng, đường thẳng 3D, khoảng cách.
8. **Biến hình + vector**: tịnh tiến/đối xứng/quay/vị tự, vector hình học → cầu nối Đại số tuyến tính.

🎉 Hình học phổ thông đã hoàn chỉnh từ Euclid đến giải tích hình học.
