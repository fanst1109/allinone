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

---

## 3. Đối xứng (Reflection)

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
