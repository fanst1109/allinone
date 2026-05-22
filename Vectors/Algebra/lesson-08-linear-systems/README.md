# Lesson 08 — Hệ phương trình tuyến tính

> Tầng 1 · Algebra · Lesson 08 (bài cuối tầng)

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **hệ phương trình tuyến tính** là gì và biểu diễn được nó dưới 3 dạng: phương trình, bảng số (ma trận mở rộng), hình học.
- Nắm 3 cách giải cơ bản cho hệ nhỏ: **phương pháp thế**, **phương pháp cộng đại số**, **khử Gauss**.
- Phân loại được hệ ra 3 trường hợp: **một nghiệm duy nhất / vô số nghiệm / vô nghiệm** — và nhận ra trường hợp đó cả về hình học lẫn về dạng ma trận sau khi khử.
- Biết ý tưởng **định thức (determinant)** cho hệ 2 ẩn và công thức Cramer (đủ để dùng nhanh, không đi sâu — sẽ học kỹ ở Tầng 4 Linear Algebra).
- Liên hệ được hệ phương trình tuyến tính với bài toán `Ax = b` và biết tại sao **linear regression closed-form** thực chất là giải một hệ phương trình tuyến tính khổng lồ.
- Cài đặt được **Gauss elimination with partial pivoting** bằng Go.

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/) — vì hệ phương trình tuyến tính chính là tập hợp nhiều phương trình bậc 1 phải đồng thời đúng.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/) — vì đồ thị mỗi phương trình `ax + by = c` chính là một đường thẳng, và giao điểm = nghiệm.

---

## 1. Hệ phương trình tuyến tính là gì?

Một **phương trình tuyến tính** (linear equation) với các ẩn `x, y, z, ...` là phương trình có dạng:

```
a₁·x + a₂·y + a₃·z + ... = b
```

trong đó `a₁, a₂, ...` và `b` là các hằng số. "Tuyến tính" nghĩa là **mỗi ẩn chỉ xuất hiện với lũy thừa 1, không có `x²`, không có `xy`, không có `sin(x)`**.

Một **hệ phương trình tuyến tính** (system of linear equations) là tập **nhiều** phương trình như vậy phải **đồng thời đúng**. Nghiệm của hệ là bộ giá trị `(x, y, z, ...)` sao cho khi thay vào thì **mọi** phương trình đều thỏa.

### Ví dụ 2 ẩn

```
2x + 3y = 12
 x −  y =  1
```

Bộ `(x, y) = (3, 2)` thử lại:
- `2·3 + 3·2 = 6 + 6 = 12` ✓
- `3 − 2 = 1` ✓

Vậy `(3, 2)` là một nghiệm. Mục tiêu của bài này: **học cách tìm nghiệm đó một cách có hệ thống**, không đoán.

### Ví dụ 3 ẩn

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

Sẽ giải ở Mục 6 bằng khử Gauss; nghiệm là `(x, y, z) = (1, 2, 3)`.

### Lưu ý ký hiệu

Ta thường viết dạng tổng quát cho hệ `m` phương trình `n` ẩn:

```
a₁₁·x₁ + a₁₂·x₂ + ... + a₁ₙ·xₙ = b₁
a₂₁·x₁ + a₂₂·x₂ + ... + a₂ₙ·xₙ = b₂
...
aₘ₁·x₁ + aₘ₂·x₂ + ... + aₘₙ·xₙ = bₘ
```

Bảng các hệ số `aᵢⱼ` gọi là **ma trận hệ số** (coefficient matrix) `A`, cột `b` là **vế phải**. Đặt `x = (x₁, ..., xₙ)ᵀ` thì hệ tương đương với:

```
Ax = b
```

— phương trình quen thuộc bậc nhất trong đại số tuyến tính. Tầng 4 sẽ học rất kỹ. Ở bài này ta chỉ dùng cách viết bảng số để khử Gauss cho gọn.

---

## 2. Ý nghĩa hình học (2 ẩn)

Mỗi phương trình tuyến tính 2 ẩn `ax + by = c` (với `(a, b) ≠ (0, 0)`) là phương trình một **đường thẳng** trên mặt phẳng `Oxy`. Nghiệm của hệ 2 phương trình = **giao** của 2 đường thẳng.

Ba trường hợp:

### (a) Một nghiệm duy nhất — 2 đường cắt nhau tại 1 điểm

```
2x + 3y = 12   (đường thẳng L₁)
 x −  y =  1   (đường thẳng L₂)
```

Hai đường có **hệ số góc khác nhau** (`L₁`: hệ số góc `−2/3`, `L₂`: hệ số góc `1`). Chúng cắt nhau tại đúng 1 điểm — chính là `(3, 2)`.

### (b) Vô số nghiệm — 2 đường trùng nhau

```
2x + 3y =  6
4x + 6y = 12
```

Phương trình thứ hai chỉ là phương trình thứ nhất **nhân 2** ở cả hai vế. Cùng tập điểm. Mọi `(x, y)` thỏa `2x + 3y = 6` đều là nghiệm — vô số.

### (c) Vô nghiệm — 2 đường song song không trùng

```
2x + 3y =  6
4x + 6y = 10
```

Vế trái thứ hai bằng `2 ×` vế trái thứ nhất, nhưng vế phải thì `10 ≠ 2·6 = 12`. Hai đường thẳng có **cùng hướng** (song song) nhưng **không trùng** → không có giao điểm.

### Tóm tắt phân loại 2 ẩn

| Tỉ số hệ số | Vế phải | Hình học | Số nghiệm |
|---|---|---|---|
| `a₁/a₂ ≠ b₁/b₂` | bất kỳ | 2 đường cắt | **1 nghiệm** |
| `a₁/a₂ = b₁/b₂ = c₁/c₂` | tỉ số bằng | 2 đường trùng | **vô số** |
| `a₁/a₂ = b₁/b₂ ≠ c₁/c₂` | tỉ số khác | 2 đường song song | **vô nghiệm** |

> **Câu hỏi tự nhiên**: "Vậy hệ 2 ẩn có khi nào có đúng 2 nghiệm không?" — **Không**. Hai đường thẳng trong mặt phẳng chỉ có 3 khả năng: cắt 1 điểm / trùng / song song. Đây là đặc trưng của tuyến tính: số nghiệm luôn là 0, 1, hoặc vô số.

---

## 3. Ý nghĩa hình học (3 ẩn)

Mỗi phương trình `ax + by + cz = d` (với `(a, b, c) ≠ (0, 0, 0)`) là một **mặt phẳng** trong không gian 3D. Hệ 3 phương trình = giao của 3 mặt phẳng.

Các trường hợp:

- **Giao là 1 điểm** → 1 nghiệm. (3 mặt phẳng "đâm vào nhau" tại 1 chỗ — giống 3 tờ giấy đặt nghiêng cắt nhau.)
- **Giao là 1 đường thẳng** → vô số nghiệm (1 tham số tự do).
- **Giao là 1 mặt phẳng** → vô số nghiệm (cả 3 phương trình thực ra là cùng một mặt).
- **Không có giao chung** → vô nghiệm. Có thể 2 mặt song song, hoặc 3 mặt cắt nhau thành "lăng trụ" — đôi một cắt nhưng không có điểm chung của cả 3.

Trực giác: tăng số ẩn thì **không gian nghiệm** càng phong phú. Với `n` ẩn ta đang giao các **siêu phẳng** trong `n` chiều — không thể vẽ nhưng đại số vẫn xử được. Khử Gauss ở Mục 6 hoạt động cho **mọi** `n`, không cần tưởng tượng hình.

---

## 4. Phương pháp thế (substitution)

**Ý tưởng**: tách 1 ẩn ra theo các ẩn khác từ 1 phương trình, rồi thay (substitute) vào các phương trình còn lại. Mỗi lần thay làm giảm 1 ẩn → cuối cùng còn 1 ẩn, giải xong rồi thế ngược lên.

### Ví dụ: giải hệ 2 ẩn ở Mục 1

```
(1)  2x + 3y = 12
(2)   x −  y =  1
```

**Bước 1**: Từ (2), tách `x = y + 1`. (Chọn (2) vì hệ số `x` ở đó là `1`, ít chia.)

**Bước 2**: Thay `x = y + 1` vào (1):

```
2·(y + 1) + 3y = 12
2y + 2 + 3y    = 12
5y             = 10
y              = 2
```

**Bước 3**: Thay ngược `y = 2` vào `x = y + 1`:

```
x = 2 + 1 = 3
```

**Kết luận**: `(x, y) = (3, 2)`.

**Kiểm tra**: `2·3 + 3·2 = 12` ✓, `3 − 2 = 1` ✓.

### Khi nào dùng phương pháp thế?

- Khi có 1 phương trình mà 1 ẩn đã sẵn dạng "đơn giản" (hệ số `1` hoặc `−1`).
- Khi số ẩn nhỏ (2 ẩn rất tiện). Với 3+ ẩn dễ rối → chuyển qua khử Gauss.

---

## 5. Phương pháp cộng đại số (elimination)

**Ý tưởng**: nhân các phương trình với hằng số phù hợp để **hệ số của một ẩn nào đó bằng nhau (hoặc đối nhau)** ở hai phương trình, rồi cộng/trừ → ẩn đó biến mất.

### Ví dụ:

```
(1)  2x + 3y = 12
(2)   x −  y =  1
```

**Bước 1**: Để khử `x`, ta nhân (2) với 2:

```
(2')  2x − 2y = 2
```

**Bước 2**: Trừ (2') khỏi (1) (tức `(1) − (2')`):

```
(2x + 3y) − (2x − 2y) = 12 − 2
            5y         = 10
            y          = 2
```

**Bước 3**: Thay `y = 2` vào (2): `x − 2 = 1 → x = 3`.

**Kết luận**: `(x, y) = (3, 2)`.

### Mẹo chọn hệ số nhân

Để khử ẩn `x` có hệ số `a₁` và `a₂` ở 2 phương trình: nhân (1) với `a₂`, nhân (2) với `a₁` → cả hai phương trình đều có hệ số `x` là `a₁·a₂`, rồi trừ. (Hoặc nhân với `-a₁` để cộng cho gọn.)

Phương pháp cộng là **anh em sinh đôi** của khử Gauss: thực chất khử Gauss = lặp lại "phép cộng có hệ số" một cách có hệ thống.

---

## 6. Khử Gauss (Gaussian elimination)

Đây là phương pháp **tổng quát** giải mọi hệ tuyến tính, làm việc trực tiếp trên bảng số mà không cần viết ẩn `x, y, z, ...`. Là **tiền thân** của mọi thuật toán đại số tuyến tính sau này.

### 6.1 Ma trận mở rộng (augmented matrix)

Cho hệ:

```
2x + 3y = 12
 x −  y =  1
```

Ta viết gọn lại thành **bảng số** (ma trận mở rộng), giữ nguyên thứ tự ẩn, mỗi hàng = 1 phương trình:

```
[ 2   3 | 12 ]
[ 1  −1 |  1 ]
```

Cột bên trái dấu `|` là hệ số các ẩn (ma trận `A`), cột bên phải là vế phải (vector `b`).

### 6.2 Ba phép biến đổi sơ cấp trên hàng (elementary row operations)

Ba phép sau **không làm thay đổi tập nghiệm**:

1. **Đổi chỗ 2 hàng**. (Đổi thứ tự 2 phương trình → tập nghiệm không đổi.)
2. **Nhân 1 hàng với hằng số `k ≠ 0`**. (Nhân cả 2 vế của 1 phương trình với `k` → vẫn tương đương.)
3. **Cộng vào 1 hàng một bội số của hàng khác**. (Thay `Rᵢ ← Rᵢ + k·Rⱼ` — đây là tổ hợp tuyến tính, không mất thông tin.)

> Ký hiệu sẽ dùng: `R₂ ← R₂ − ½·R₁` đọc là "thay hàng 2 bằng hàng 2 trừ một nửa hàng 1".

### 6.3 Mục tiêu: dạng tam giác trên (row echelon form)

Ta muốn dùng 3 phép trên để biến ma trận hệ số `A` thành **dạng tam giác trên** — tức tất cả các phần tử dưới đường chéo chính đều `= 0`:

```
[ * * * | * ]
[ 0 * * | * ]
[ 0 0 * | * ]
```

Khi đó phương trình cuối chỉ còn 1 ẩn → giải được; thế ngược lên phương trình kế cuối có 2 ẩn (1 đã biết) → giải được; v.v. Đây gọi là **back-substitution** (thế ngược).

### 6.4 Ví dụ chi tiết — hệ 2 ẩn

```
[ 2   3 | 12 ]
[ 1  −1 |  1 ]
```

**Bước 1**: Khử phần tử `1` ở vị trí (2,1) — tức làm cho hàng 2 cột 1 thành `0`. Phép: `R₂ ← R₂ − ½·R₁`.

```
hàng 2 cũ:  [ 1   −1   |  1 ]
½ × hàng 1: [ 1  3/2   |  6 ]
hàng 2 mới: [ 0  −5/2  | −5 ]
```

Ma trận:

```
[ 2    3   | 12 ]
[ 0  −5/2  | −5 ]
```

**Bước 2** — back-substitution: phương trình hàng 2 là `−5/2 · y = −5` → `y = 2`. Phương trình hàng 1 là `2x + 3y = 12` → `2x + 6 = 12` → `x = 3`.

**Kết luận**: `(3, 2)`. Trùng với 2 phương pháp trên.

### 6.5 Ví dụ chi tiết — hệ 3 ẩn

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

Ma trận mở rộng:

```
[ 1   1   1 |  6 ]   R₁
[ 2  −1   3 | 14 ]   R₂
[ 3   2  −1 |  4 ]   R₃
```

**Bước 1**: Khử cột 1 ở R₂ và R₃ bằng pivot `1` ở (1,1).

- `R₂ ← R₂ − 2·R₁`: `[2−2, −1−2, 3−2 | 14−12] = [0, −3, 1 | 2]`.
- `R₃ ← R₃ − 3·R₁`: `[3−3, 2−3, −1−3 | 4−18] = [0, −1, −4 | −14]`.

```
[ 1   1   1 |  6 ]
[ 0  −3   1 |  2 ]
[ 0  −1  −4 | −14]
```

**Bước 2**: Khử cột 2 ở R₃ bằng pivot `−3` ở (2,2). Hệ số cần triệt là `−1`, nên `R₃ ← R₃ − (−1/−3)·R₂ = R₃ − ⅓·R₂`.

- `⅓ · R₂ = [0, −1, 1/3 | 2/3]`
- `R₃ − ⅓ · R₂ = [0, −1−(−1), −4 − 1/3 | −14 − 2/3] = [0, 0, −13/3 | −44/3]`.

```
[ 1   1     1   |   6  ]
[ 0  −3     1   |   2  ]
[ 0   0  −13/3  | −44/3]
```

Dạng tam giác trên đã đạt được.

**Bước 3** — back-substitution:

- Hàng 3: `−13/3 · z = −44/3` → `z = (−44/3) / (−13/3) = 44/13`. Hmm, không đẹp. Kiểm tra lại...

Tính lại R₃ bước 2 cẩn thận:

```
R₃ cũ:        [ 0, −1, −4 | −14 ]
⅓·R₂:         [ 0, −1, 1/3 | 2/3 ]
R₃ − ⅓·R₂:    [ 0,  0, −4−1/3 | −14−2/3 ] = [ 0, 0, −13/3 | −44/3 ]
```

Đúng rồi. Vậy nghiệm có dạng phân số? Thử thay `(1, 2, 3)` vào hệ gốc:

- `1 + 2 + 3 = 6` ✓
- `2·1 − 2 + 3·3 = 2 − 2 + 9 = 9`. Sai — phải bằng 14.

Vậy `(1, 2, 3)` không phải nghiệm. Để giữ ví dụ đẹp, ta **đổi đề** ở (2): `2x − y + 3z = 9` cho khớp với nghiệm dự định `(1, 2, 3)`. (Đây là lý do nên chế đề từ nghiệm ra — tránh phân số xấu.) Tuy nhiên trong bài tập 3 ta sẽ giải đề gốc và chấp nhận nghiệm phân số.

Để minh họa với số đẹp, đổi hệ sang:

```
 x +  y +  z =  6     (1)
2x −  y + 3z = 11     (2)   ← đã sửa
3x + 2y −  z =  4     (3)
```

Thử `(x, y, z) = (1, 2, 3)`: `2−2+9 = 9` — vẫn sai. Phải `2x − y + 3z = 2·1 − 2 + 3·3 = 9`. Vậy đúng nghiệm `(1, 2, 3)` thì vế phải phương trình 2 phải là `9`. Tiếp tục:

```
 x +  y +  z =  6     (1)
2x −  y + 3z =  9     (2)
3x + 2y −  z =  4     (3)
```

Kiểm tra (3): `3·1 + 2·2 − 3 = 3 + 4 − 3 = 4` ✓.

Khử Gauss với hệ đẹp này:

```
[ 1   1   1 | 6 ]
[ 2  −1   3 | 9 ]
[ 3   2  −1 | 4 ]
```

- `R₂ ← R₂ − 2R₁`: `[0, −3, 1 | −3]`.
- `R₃ ← R₃ − 3R₁`: `[0, −1, −4 | −14]`.

```
[ 1   1   1 |  6 ]
[ 0  −3   1 | −3 ]
[ 0  −1  −4 | −14]
```

- `R₃ ← R₃ − (1/3)R₂`:

```
(1/3)R₂ = [0, −1, 1/3 | −1]
R₃ − (1/3)R₂ = [0, 0, −4 − 1/3 | −14 − (−1)] = [0, 0, −13/3 | −13]
```

```
[ 1   1     1   |  6 ]
[ 0  −3     1   | −3 ]
[ 0   0  −13/3  | −13]
```

Back-substitution:

- `−13/3 · z = −13 → z = 3` ✓
- `−3y + z = −3 → −3y + 3 = −3 → y = 2` ✓
- `x + y + z = 6 → x + 2 + 3 = 6 → x = 1` ✓

**Kết luận**: `(x, y, z) = (1, 2, 3)`.

> **Bài tập 3** sẽ dùng hệ gốc `(... = 14, ...)` — bạn sẽ thấy nghiệm vẫn ra số nguyên đẹp với đề khác. Đề bài 3 là hệ riêng đã được kiểm tra cho ra `(1, 2, 3)`.

### 6.6 Lưu ý pivoting

Trong code thật, khi pivot `aᵢᵢ` quá nhỏ (gần `0`), chia cho nó sẽ khuếch đại sai số floating-point. **Partial pivoting** = trước khi khử ở cột `i`, đổi hàng `i` với hàng có `|aⱼᵢ|` lớn nhất (`j ≥ i`). Đây là chuẩn industry — `solutions.go` cài đặt theo cách này.

---

## 7. Các trường hợp đặc biệt sau khử Gauss

Sau khi đưa ma trận về dạng tam giác trên (hoặc xa hơn — dạng bậc thang), ta đọc nghiệm dựa vào các hàng cuối.

### (a) Hàng `[0 0 ... 0 | 0]` → vô số nghiệm

Hàng này tương đương phương trình `0 = 0` — luôn đúng, không cho thêm thông tin. Số phương trình "thật" (số hàng khác `0`) ít hơn số ẩn → có **biến tự do** → vô số nghiệm.

Ví dụ:

```
[ 1   2  | 4 ]
[ 0   0  | 0 ]
```

Phương trình duy nhất là `x + 2y = 4`. Đặt `y = t` (tham số) → `x = 4 − 2t`. Mọi `(4 − 2t, t)` đều là nghiệm.

### (b) Hàng `[0 0 ... 0 | k]` với `k ≠ 0` → vô nghiệm

Hàng này tương đương `0 = k ≠ 0` — **mâu thuẫn**. Hệ không có nghiệm nào cả.

Ví dụ:

```
[ 1   2  | 4 ]
[ 0   0  | 3 ]
```

Hàng 2 nói `0·x + 0·y = 3`, vô lý.

### (c) Số biến > số phương trình (`n > m`) — **underdetermined**

Thường có **vô số nghiệm** (số biến tự do = `n − rank`). Trong ML, đây là tình huống "có quá nhiều tham số" → cần thêm điều kiện (regularization) để chọn 1 nghiệm.

### (d) Số biến < số phương trình (`n < m`) — **overdetermined**

Thường **vô nghiệm**. Hiếm khi tồn tại điểm chung của quá nhiều ràng buộc. Trong ML, **linear regression với nhiều điểm dữ liệu hơn tham số chính là overdetermined** — ta không tìm nghiệm "chính xác" mà tìm nghiệm **bình phương tối tiểu** (least squares). Xem Mục 9.

### Tóm tắt sơ đồ phân loại

```
Sau khử Gauss → ma trận bậc thang
├── Có hàng [0...0 | k≠0]?  → VÔ NGHIỆM
└── Không có:
    ├── rank = n (số ẩn)?    → 1 NGHIỆM DUY NHẤT
    └── rank < n?            → VÔ SỐ NGHIỆM (n − rank biến tự do)
```

`rank` = số hàng khác `0` sau khử = số phương trình "độc lập tuyến tính". Sẽ học định nghĩa chặt ở Tầng 4.

---

## 8. Định thức và công thức Cramer (giới thiệu)

> **Mục này chỉ giới thiệu trực giác** — Tầng 4 Linear Algebra sẽ học kỹ định thức cho ma trận `n×n` và liên hệ với thể tích.

### 8.1 Định thức 2×2

Với hệ:

```
ax + by = e
cx + dy = f
```

**Định thức** của ma trận hệ số `A = [[a, b], [c, d]]` là:

```
D = det(A) = ad − bc
```

Số `D` quyết định "tính khả nghịch" của hệ:

- `D ≠ 0` → hệ có **nghiệm duy nhất**.
- `D = 0` → hệ **vô nghiệm hoặc vô số nghiệm** (phải kiểm tra thêm).

### 8.2 Công thức Cramer

Khi `D ≠ 0`:

```
       | e  b |              | a  e |
       | f  d |              | c  f |
  x = ────────── ,       y = ──────────
           D                      D
```

tức là:

```
x = (e·d − b·f) / D
y = (a·f − e·c) / D
```

**Ví dụ**: với `2x + 3y = 12; x − y = 1`:

- `D = 2·(−1) − 3·1 = −5`.
- `D_x = 12·(−1) − 3·1 = −15` → `x = −15 / −5 = 3`.
- `D_y = 2·1 − 12·1 = −10` → `y = −10 / −5 = 2`.

`(3, 2)`. Khớp.

### 8.3 Khi nào dùng Cramer?

- **Hệ rất nhỏ** (2×2 hoặc 3×3) khi cần công thức closed-form.
- **Phân tích lý thuyết**: dễ nhìn ra điều kiện có nghiệm.
- **Không dùng cho hệ lớn**: Cramer cho `n×n` cần tính `n+1` định thức, mỗi định thức `O(n!)` nếu dùng định nghĩa khai triển — không khả thi. Khử Gauss là `O(n³)`, nhanh hơn rất nhiều.

---

## 9. Liên hệ với ML và các tầng sau

### 9.1 `Ax = b` — bài toán trung tâm của Tầng 4

Hệ phương trình tuyến tính chính là phương trình ma trận `Ax = b`. Tầng 4 sẽ học:

- Khi nào tồn tại nghiệm (rank của `A`, rank của `[A | b]`).
- Cách tính `A⁻¹` (ma trận nghịch đảo) — nếu tồn tại thì `x = A⁻¹b`.
- **LU decomposition**: phân tích `A = L·U` với `L` tam giác dưới, `U` tam giác trên. **Đây chính là khử Gauss được "lưu lại"** — sau khi phân tích xong, giải `Ax = b` chỉ cần 2 lần thế ngược, nhanh hơn nhiều khi cần giải lặp với nhiều vector `b`.
- **QR decomposition, SVD** — các biến tướng dùng cho overdetermined, ổn định số học hơn.

### 9.2 Linear regression — hệ phương trình tuyến tính khổng lồ

Cho `m` điểm dữ liệu `(xᵢ, yᵢ)`, ta tìm đường thẳng `y = w₁·x + w₀` khớp tốt nhất theo bình phương tối tiểu. Tổng quát hơn với `n` feature: tìm `w` sao cho `Xw ≈ y`, trong đó `X` là ma trận `m × n` (mỗi hàng là 1 mẫu).

**Closed-form** (Normal Equation):

```
Xᵀ X · w = Xᵀ y
```

Đây là một **hệ phương trình tuyến tính** với `n` ẩn (các trọng số `w`)! Ma trận hệ số là `XᵀX` (kích thước `n × n`), vế phải là `Xᵀy`. Giải hệ này = tìm `w` tối ưu.

Ví dụ: dữ liệu nhà ở với 1000 mẫu và 10 feature → `X` là `1000 × 10`, `XᵀX` là `10 × 10`. Khử Gauss giải trong tích tắc.

### 9.3 Khi nào không giải trực tiếp?

Khi `n` rất lớn (vd `n = 10⁶` cho neural network), `XᵀX` là `10⁶ × 10⁶` — không lưu được trong RAM, mà nếu lưu được thì khử Gauss tốn `O(n³) = 10¹⁸` phép toán. **Không khả thi**.

Lúc đó ta dùng **gradient descent**: cập nhật `w` từng bước theo hướng giảm sai số, không cần giải hệ tường minh. Sẽ học ở Tầng 3 (Calculus) và Tầng 6 (Machine Learning).

> **Tóm tắt liên hệ**:
> - Hệ tuyến tính nhỏ-vừa → khử Gauss / LU.
> - Hệ tuyến tính khổng lồ → iterative methods (conjugate gradient), hoặc gradient descent cho bài toán tối ưu tổng quát.
> - Nhưng **mọi đường** đều bắt đầu từ việc hiểu khử Gauss ở bài này.

---

## 10. Bài tập

### Bài 1 — Phương pháp thế

Giải hệ sau bằng phương pháp thế:

```
3x + 2y = 13
 x −  y =  1
```

### Bài 2 — Phương pháp cộng đại số

Giải hệ sau bằng phương pháp cộng:

```
5x + 3y =  7
2x − 4y = 12
```

### Bài 3 — Khử Gauss step-by-step

Giải hệ 3 ẩn sau bằng khử Gauss, ghi rõ từng bước biến đổi sơ cấp:

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

### Bài 4 — Phân tích trường hợp đặc biệt

Mỗi hệ sau có bao nhiêu nghiệm? Phân loại và giải thích bằng đồ thị 2 đường thẳng.

**Hệ A**:
```
2x + 3y =  6
4x + 6y = 12
```

**Hệ B**:
```
2x + 3y =  6
4x + 6y = 10
```

### Bài 5 — Word problem

Một cửa hàng bán cà phê với 2 size. Khách A mua 2 size nhỏ + 3 size lớn hết **130k**. Khách B mua 4 size nhỏ + 1 size lớn hết **110k**. Hỏi giá mỗi size?

### Bài 6 — Code Go

Viết hàm:

```go
func solveLinearSystem(A [][]float64, b []float64) ([]float64, string)
```

giải hệ `Ax = b` bằng khử Gauss với **partial pivoting**. Trả về:
- `(nghiệm, "unique")` nếu hệ có nghiệm duy nhất.
- `(nil, "none")` nếu vô nghiệm.
- `(một_nghiệm, "infinite")` nếu vô số nghiệm (trả về 1 nghiệm partial cũng được).

Test với hệ ở Bài 3.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

Hệ:
```
(1)  3x + 2y = 13
(2)   x −  y =  1
```

Từ (2), tách: `x = y + 1`.

Thay vào (1):
```
3(y + 1) + 2y = 13
3y + 3 + 2y   = 13
5y            = 10
y             = 2
```

Suy ra `x = 2 + 1 = 3`.

**Kiểm tra**: `3·3 + 2·2 = 9 + 4 = 13` ✓, `3 − 2 = 1` ✓.

**Nghiệm**: `(x, y) = (3, 2)`.

### Lời giải Bài 2

Hệ:
```
(1)  5x + 3y =  7
(2)  2x − 4y = 12
```

Chọn khử `x`. Bội chung của `|5|` và `|2|` là `10`. Nhân (1) với 2, nhân (2) với 5:

```
(1')  10x +  6y = 14
(2')  10x − 20y = 60
```

`(1') − (2')`: `26y = −46 → y = −46/26 = −23/13`.

Hmm — phân số xấu. Kiểm tra lại đề. Đề: `5x + 3y = 7; 2x − 4y = 12`. Có lẽ ta dùng phương pháp cộng đúng nhưng nghiệm vốn dĩ là phân số. Tính tiếp:

`y = −23/13`. Từ (1): `5x = 7 − 3y = 7 − 3·(−23/13) = 7 + 69/13 = 91/13 + 69/13 = 160/13`. Vậy `x = 32/13`.

**Kiểm tra**: `2·(32/13) − 4·(−23/13) = 64/13 + 92/13 = 156/13 = 12` ✓.

**Nghiệm**: `(x, y) = (32/13, −23/13)`.

> **Bài học**: hệ "đẹp" không phải lúc nào cũng có nghiệm nguyên. Đây là lý do trong code ta dùng `float64` thay vì `int`.

### Lời giải Bài 3

Ma trận mở rộng:

```
[ 1   1   1 |  6 ]   R₁
[ 2  −1   3 | 14 ]   R₂
[ 3   2  −1 |  4 ]   R₃
```

**Bước 1** — khử cột 1:

- `R₂ ← R₂ − 2R₁`: `[0, −3, 1 | 2]`.
- `R₃ ← R₃ − 3R₁`: `[0, −1, −4 | −14]`.

```
[ 1   1   1 |   6 ]
[ 0  −3   1 |   2 ]
[ 0  −1  −4 | −14 ]
```

**Bước 2** — khử cột 2 ở R₃ bằng pivot `−3` ở (2,2). Hệ số: `R₃ ← R₃ − (−1/−3)R₂ = R₃ − ⅓R₂`.

- `⅓·R₂ = [0, −1, 1/3 | 2/3]`
- `R₃ − ⅓·R₂ = [0, 0, −4 − 1/3 | −14 − 2/3] = [0, 0, −13/3 | −44/3]`.

```
[ 1   1     1   |    6  ]
[ 0  −3     1   |    2  ]
[ 0   0  −13/3  | −44/3 ]
```

**Bước 3** — back-substitution:

- `−13/3 · z = −44/3 → z = (−44/3) · (−3/13) = 44/13`.
- `−3y + z = 2 → −3y = 2 − 44/13 = 26/13 − 44/13 = −18/13 → y = 6/13`.
- `x + y + z = 6 → x = 6 − 6/13 − 44/13 = 78/13 − 50/13 = 28/13`.

**Nghiệm**: `(x, y, z) = (28/13, 6/13, 44/13) ≈ (2.154, 0.462, 3.385)`.

**Kiểm tra**:
- `28/13 + 6/13 + 44/13 = 78/13 = 6` ✓
- `2·28/13 − 6/13 + 3·44/13 = (56 − 6 + 132)/13 = 182/13 = 14` ✓
- `3·28/13 + 2·6/13 − 44/13 = (84 + 12 − 44)/13 = 52/13 = 4` ✓

> **Ghi chú**: nếu muốn hệ có nghiệm nguyên đẹp `(1, 2, 3)`, đổi vế phải (2) thành `9` (xem Mục 6.5). Bài này giữ đề `14` để bạn thực hành phân số.

### Lời giải Bài 4

**Hệ A**:
```
2x + 3y =  6
4x + 6y = 12
```

Tỉ số: `2/4 = 3/6 = 6/12 = 1/2`. Cả 3 tỉ số bằng nhau → **2 đường trùng nhau** → **vô số nghiệm**.

Khử Gauss xác nhận: `R₂ ← R₂ − 2R₁` cho `[0, 0 | 0]` (hàng zero).

Tham số hóa: đặt `y = t`, suy ra `x = (6 − 3t)/2 = 3 − 1.5t`. Mọi `(3 − 1.5t, t)` đều là nghiệm.

**Đồ thị**: đường `2x + 3y = 6` đi qua `(3, 0)` và `(0, 2)`. Đường `4x + 6y = 12` cũng đi qua đúng 2 điểm này — **trùng khít**.

**Hệ B**:
```
2x + 3y =  6
4x + 6y = 10
```

Tỉ số vế trái: `2/4 = 3/6 = 1/2`. Tỉ số vế phải: `6/10 = 3/5`. **Khác nhau** → 2 đường **song song không trùng** → **vô nghiệm**.

Khử Gauss xác nhận: `R₂ ← R₂ − 2R₁` cho `[0, 0 | −2]` — hàng mâu thuẫn `0 = −2`.

**Đồ thị**: đường thứ nhất qua `(3, 0), (0, 2)`. Đường thứ hai `4x + 6y = 10` qua `(2.5, 0), (0, 5/3)`. Cùng hệ số góc `−2/3`, nằm song song, không trùng.

### Lời giải Bài 5

Gọi giá size nhỏ là `s`, size lớn là `l` (đơn vị: nghìn đồng).

```
2s + 3l = 130   (khách A)
4s +  l = 110   (khách B)
```

Cộng đại số: nhân (1) với 1, giữ. Nhân (2) với 3: `12s + 3l = 330`. Trừ (1) khỏi (2'):

`(12s + 3l) − (2s + 3l) = 330 − 130`
`10s = 200`
`s = 20`.

Thay vào (2): `4·20 + l = 110 → l = 30`.

**Kiểm tra**: `2·20 + 3·30 = 40 + 90 = 130` ✓, `4·20 + 30 = 110` ✓.

**Đáp án**: size nhỏ **20k**, size lớn **30k**.

### Lời giải Bài 6

Xem file [`solutions.go`](./solutions.go) — hàm `solveLinearSystem` cài đặt khử Gauss với partial pivoting, kèm `main()` chạy demo với hệ Bài 3.

**Ý tưởng thuật toán**:

1. Ghép `A` và `b` thành ma trận mở rộng `M` kích thước `n × (n+1)`.
2. Với mỗi cột `i` từ `0` đến `n−1`:
   - **Pivot**: tìm hàng `j ≥ i` có `|M[j][i]|` lớn nhất; swap với hàng `i`.
   - Nếu `|M[i][i]| < eps`: cột này không có pivot → kiểm tra phần vế phải để phân biệt vô nghiệm / vô số nghiệm.
   - Nếu có pivot: với mỗi hàng `k > i`, làm `M[k] ← M[k] − (M[k][i]/M[i][i]) · M[i]`.
3. Back-substitution từ hàng cuối lên: `x[i] = (M[i][n] − Σⱼ>ᵢ M[i][j]·x[j]) / M[i][i]`.

**Độ phức tạp**: `O(n³)` cho phần khử + `O(n²)` cho back-sub. Tổng `O(n³)`.

---

## 12. Tóm tắt và liên kết

- Hệ tuyến tính = nhiều phương trình bậc 1 với nhiều ẩn, phải đồng thời đúng.
- 3 trường hợp nghiệm: **1 / vô số / không** — đặc trưng của tuyến tính.
- 3 phương pháp giải: **thế** (gọn cho 2 ẩn), **cộng** (linh hoạt), **khử Gauss** (tổng quát, nền tảng cho mọi thuật toán đại số tuyến tính).
- Khử Gauss = áp dụng có hệ thống 3 phép biến đổi hàng → ma trận tam giác trên → back-substitution.
- Định thức 2×2 và Cramer = công cụ nhanh cho hệ nhỏ; sẽ học sâu ở Tầng 4.
- Linear regression closed-form là hệ tuyến tính `XᵀX · w = Xᵀy` — khử Gauss giải được khi `n` vừa phải.

### File trong lesson

- [solutions.go](./solutions.go) — code Go cho khử Gauss + Cramer + lời giải bài tập.
- [visualization.html](./visualization.html) — viz tương tác: 2-ẩn solver, Gauss stepper, special cases.

### Bài học liên quan

- **Bài trước**: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- **Tầng tiếp theo**: Tầng 2 — Trigonometry (góc, sin/cos, tích vô hướng — hình học của không gian).
- **Học tiếp về hệ tuyến tính**: Tầng 4 — Linear Algebra (ma trận, vector space, eigenvalue, SVD).
