# Lesson 06 — Ma trận = biến đổi (Linear Transformation)

> **Tầng 4 — Linear Algebra · Bài 6/8**
>
> "Ma trận không chỉ là một bảng số. **Ma trận LÀ một hàm**. Mỗi ma trận `A` định nghĩa một cách 'cầm vector lên và biến nó thành vector khác'. Hiểu được điều này là cánh cửa để hiểu mọi thứ phía sau: eigenvector, PCA, SVD, neural network."

---

## Mục tiêu bài học

Sau khi học xong bài này, bạn sẽ:

1. **Đổi cách nhìn** ma trận: từ "bảng số" sang "hàm biến đổi" — `T(x) = Ax`.
2. Hiểu thế nào là **linear transformation** (biến đổi tuyến tính) và 2 tính chất định nghĩa nó.
3. Nhận diện ngay 6 loại biến đổi cơ bản trong ℝ²: **identity, scaling, rotation, reflection, shear, projection**.
4. Hiểu **composition = nhân ma trận**: `T₂ ∘ T₁ = B·A`. (Đây là lý do nhân ma trận được định nghĩa "kỳ lạ" như vậy.)
5. Tính được **kernel** (nhân), **image** (ảnh), **rank** (hạng) của một ma trận và đọc được ý nghĩa hình học.
6. Biết **định thức (determinant)** là *hệ số nhân diện tích/thể tích* của biến đổi.
7. Phân biệt **ma trận trực giao (orthogonal)**, **đối xứng (symmetric)**, **đường chéo (diagonal)** và biết khi nào gặp chúng trong ML.
8. Liên hệ tới ứng dụng: **fully-connected layer** trong neural net, **convolution** trong CNN, **whitening data** trong PCA.

---

## Kiến thức tiền đề

- [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) — bạn cần biết nhân ma trận `A·B`, transpose `Aᵀ`, inverse `A⁻¹`, identity `I`.
- [Lesson 04 — Độc lập tuyến tính, basis](../lesson-04-linear-independence/) — khái niệm span, basis, dimension.
- [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/) — `‖v‖` để đo độ dài vector.
- [Tầng 2 Trigonometry — Lesson 06: Rotation matrix](../../Trigonometry/lesson-06-rotation-matrix/) — đã gặp ma trận xoay `R(θ)` ở đó; bài này chính thức hóa và mở rộng.
- [Tầng 1 Algebra — Lesson 08: Hệ phương trình tuyến tính](../../Algebra/lesson-08-linear-systems/) — `Ax = b` đã quen mặt.

---

## 1. Trực giác mới — Ma trận LÀ một hàm

### 1.1. Đổi góc nhìn

Cho đến hết Lesson 05, bạn nhìn ma trận như **một bảng số có quy tắc cộng/nhân**. Bài này yêu cầu bạn đổi hệ tham chiếu:

> **Mỗi ma trận `A` kích thước `m × n` chính là một hàm `T : ℝⁿ → ℝᵐ`, định nghĩa bởi `T(x) = A·x`.**

- **Đầu vào**: vector cột `x ∈ ℝⁿ` (kích thước `n × 1`).
- **Đầu ra**: vector cột `T(x) = A·x ∈ ℝᵐ` (kích thước `m × 1`).
- **A "biến đổi"** không gian `n` chiều thành không gian `m` chiều.

> **💡 Trực giác — Hình dung**
>
> Tưởng tượng `ℝⁿ` là một tờ giấy (nếu `n = 2`). Ma trận `A` là một **bàn tay** cầm tờ giấy đó và:
> - Giãn nó ra hoặc co lại (scaling).
> - Xoay nó (rotation).
> - Lật nó (reflection).
> - Kéo lệch nó (shear).
> - Bóp dẹt nó thành đường thẳng (projection).
> - Hoặc bóp dẹt thành điểm 0 (zero map).
>
> Hành động "cầm và biến đổi" này = hàm `T`. Ma trận chỉ là **cách viết** hành động đó bằng số.

### 1.2. Ví dụ mở bài — Scaling theo trục x gấp đôi

Cho

```
A = | 2  0 |
    | 0  1 |
```

Áp vào `x = (3, 4)`:

```
A·x = | 2  0 | · | 3 | = | 2·3 + 0·4 | = | 6 |
      | 0  1 |   | 4 |   | 0·3 + 1·4 |   | 4 |
```

→ Vector `(3, 4)` bị **kéo dài gấp đôi theo trục x**, thành `(6, 4)`.

- Một vector khác `(1, 0)` → `A·(1, 0) = (2, 0)`. Dài gấp đôi theo x.
- `(0, 1)` → `A·(0, 1) = (0, 1)`. Không đổi.
- `(1, 1)` → `A·(1, 1) = (2, 1)`. Phần x bị nhân đôi.

Toàn bộ mặt phẳng bị "kéo căng theo trục x". `A` chính là **hành động kéo căng đó**, viết dưới dạng số.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vậy ma trận và hàm là hai từ cho cùng một thứ à?"* — Gần như vậy, nhưng chỉ cho một loại hàm rất đặc biệt: **linear transformation**. Hàm `f(x) = x² + 1` không thể viết thành ma trận (vì không tuyến tính). Mọi linear transformation lại có thể viết thành ma trận và ngược lại.
> - *"Tại sao phải đổi cách nhìn này?"* — Vì khi nhìn ma trận là HÀM, bạn có ngay các câu hỏi tự nhiên: hàm này có inverse không? (→ `A⁻¹`). Hàm này "bóp dẹt" cái gì? (→ kernel). Đầu ra của hàm này là gì? (→ image). Có hướng nào hàm không xoay không? (→ eigenvector — Lesson 07).

### 1.3. Walk-through đầy đủ với 4 ví dụ

**Ví dụ A.** `A = [[1, 2], [3, 4]]`, `x = (1, 1)`:
```
A·x = (1·1 + 2·1, 3·1 + 4·1) = (3, 7)
```

**Ví dụ B.** `A = [[0, -1], [1, 0]]`, `x = (1, 0)`:
```
A·x = (0·1 + (-1)·0, 1·1 + 0·0) = (0, 1)
```
→ Vector `(1, 0)` thành `(0, 1)`. Đây là **xoay 90° ngược chiều kim đồng hồ**.

**Ví dụ C.** `A = [[1, 1], [0, 1]]`, `x = (1, 0)`:
```
A·x = (1·1 + 1·0, 0·1 + 1·0) = (1, 0)
```
→ Trục x giữ nguyên. Còn `(0, 1)` → `(1, 1)` — bị "kéo lệch" sang phải. Đây là **shear**.

**Ví dụ D.** `A` là `3 × 2`:
```
A = | 1  0 |       x = | 2 |
    | 0  1 |           | 3 |
    | 1  1 |
```
Đầu ra: `A·x = (2, 3, 5)` ∈ ℝ³. Vector 2 chiều được "nhúng" vào không gian 3 chiều.

---

## 2. Định nghĩa chính thức — Linear Transformation

### 2.1. Hai tính chất xác định

> **Hàm `T : ℝⁿ → ℝᵐ` được gọi là biến đổi tuyến tính (linear transformation) nếu thoả mãn 2 tính chất:**
>
> 1. **Bảo toàn phép cộng**: `T(u + v) = T(u) + T(v)` với mọi `u, v ∈ ℝⁿ`.
> 2. **Bảo toàn nhân vô hướng**: `T(c·u) = c·T(u)` với mọi `u ∈ ℝⁿ`, `c ∈ ℝ`.

Tổng hợp 2 tính chất: `T(αu + βv) = αT(u) + βT(v)` — gọi là **bảo toàn tổ hợp tuyến tính**.

> **💡 Trực giác**
>
> "Tuyến tính" = **thẳng**. Linear transformation:
> - **Không bẻ cong**: đường thẳng → đường thẳng. Lưới ô vuông → lưới ô bình hành.
> - **Bảo toàn gốc tọa độ**: `T(0) = 0` luôn. (Chứng minh: `T(0) = T(0·v) = 0·T(v) = 0`.)
> - **Tỷ lệ đều**: nếu điểm A ở giữa B và C, sau khi biến đổi, A' vẫn ở giữa B' và C'.
>
> Hàm `f(x) = x + 5` (cộng 5 vào tọa độ) **không phải** linear transformation vì `f(0) = 5 ≠ 0`. Nó là **affine** (tuyến tính + dịch chuyển). Sẽ gặp ở mục 11 (FC layer).

### 2.2. Verify với 4 ví dụ số

**Ví dụ 1.** `T(x) = 2x` (scaling đều).
- `T(u + v) = 2(u + v) = 2u + 2v = T(u) + T(v)`. ✓
- `T(c·u) = 2(c·u) = c·(2u) = c·T(u)`. ✓
- → Linear. Ma trận: `A = [[2, 0], [0, 2]] = 2I`.

**Ví dụ 2.** `T(x, y) = (x + y, x - y)`.
- `T((1,2) + (3,4)) = T(4, 6) = (10, -2)`.
- `T(1,2) + T(3,4) = (3, -1) + (7, -1) = (10, -2)`. ✓
- → Linear. Ma trận: `A = [[1, 1], [1, -1]]`.

**Ví dụ 3.** `T(x, y) = (x², y)`.
- `T(2·(1, 1)) = T(2, 2) = (4, 2)`.
- `2·T(1, 1) = 2·(1, 1) = (2, 2)`. ✗ (`4 ≠ 2`).
- → **Không** linear.

**Ví dụ 4.** `T(x, y) = (x + 1, y)` (dịch chuyển 1 đơn vị).
- `T(0, 0) = (1, 0) ≠ 0`. ✗
- → **Không** linear (chỉ affine).

### 2.3. Định lý nền — Ma trận ↔ Linear Transformation

> **Định lý (sự tương ứng 1-1)**:
> Mọi linear transformation `T : ℝⁿ → ℝᵐ` đều có thể biểu diễn duy nhất dưới dạng `T(x) = A·x`, với `A` là ma trận `m × n`. Ngược lại, mọi ma trận `m × n` đều xác định một linear transformation.

**Cách dựng ma trận `A` từ `T`** — đây là quy tắc quan trọng nhất:

> **Cột thứ `j` của `A` chính là `T(eⱼ)`** — ảnh của vector cơ sở `eⱼ`.

Trong ℝ², `e₁ = (1, 0)`, `e₂ = (0, 1)`. Vậy

```
A = [ T(e₁) | T(e₂) ]   (T(e₁) và T(e₂) là 2 cột)
```

**Chứng minh từng bước:**
- Mọi vector `x = (x₁, x₂)` viết được thành `x = x₁·e₁ + x₂·e₂`.
- `T(x) = T(x₁·e₁ + x₂·e₂) = x₁·T(e₁) + x₂·T(e₂)` (linear).
- Đây chính là `A·x` với `A` có cột là `T(e₁), T(e₂)`.

**Walk-through:**
- Cho `T(x, y) = (x + 2y, 3x - y)`.
- `T(e₁) = T(1, 0) = (1, 3)` → cột 1.
- `T(e₂) = T(0, 1) = (2, -1)` → cột 2.
- → `A = [[1, 2], [3, -1]]`.
- Kiểm tra: `A·(5, 7) = (1·5 + 2·7, 3·5 + (-1)·7) = (19, 8)`. Mà `T(5, 7) = (5 + 14, 15 - 7) = (19, 8)`. ✓

> **📝 Tóm tắt mục 2**
> - Linear ⇔ giữ cộng và giữ scaling ⇔ giữ tổ hợp tuyến tính ⇔ luôn có `T(0) = 0`.
> - Mọi linear transformation = nhân ma trận, và ngược lại.
> - Cột `j` của ma trận = `T(eⱼ)` — đây là quy tắc dựng ma trận từ mô tả hình học.

---

## 3. Sáu biến đổi cơ bản trong ℝ²

Đây là "bộ chữ cái" mà mọi biến đổi tuyến tính trong mặt phẳng đều có thể phân tích ra. Học thuộc 6 ma trận này.

### 3.1. Identity I — giữ nguyên

```
I = | 1  0 |       T(x) = x
    | 0  1 |
```

- `I·(1, 0) = (1, 0)`, `I·(0, 1) = (0, 1)`, `I·(3, -2) = (3, -2)`.
- Hình học: không làm gì cả. Lưới giữ nguyên.

### 3.2. Scaling — phóng/thu theo trục

```
A = | a  0 |       T(x, y) = (a·x, b·y)
    | 0  b |
```

- `a > 1`: kéo dài theo x. `0 < a < 1`: nén lại.
- `a < 0`: kéo dài + lật theo trục y (đảo dấu x).
- `a = b`: scaling đều (uniform). `a = b = 2`: phóng to gấp đôi mọi hướng.

**Walk-through `A = diag(3, 0.5)`:**
- `A·(1, 0) = (3, 0)` (kéo x gấp 3).
- `A·(0, 1) = (0, 0.5)` (nén y còn nửa).
- `A·(2, 4) = (6, 2)`.
- Hình vuông đơn vị → hình chữ nhật `3 × 0.5`.

### 3.3. Rotation `R(θ)` — xoay quanh gốc

Đã gặp ở [Trig Lesson 06](../../Trigonometry/lesson-06-rotation-matrix/):

```
R(θ) = | cos θ   -sin θ |
       | sin θ    cos θ |
```

- `R(90°) = [[0, -1], [1, 0]]`. `R(90°)·(1, 0) = (0, 1)`. ✓
- `R(180°) = [[-1, 0], [0, -1]] = -I`. Đảo dấu cả 2 trục.
- `R(-θ) = R(θ)ᵀ = R(θ)⁻¹` (rotation là ma trận trực giao — xem mục 10).

### 3.4. Reflection — lật

- **Qua trục x**: `[[1, 0], [0, -1]]`. `(3, 4) → (3, -4)`.
- **Qua trục y**: `[[-1, 0], [0, 1]]`. `(3, 4) → (-3, 4)`.
- **Qua đường `y = x`**: `[[0, 1], [1, 0]]`. `(3, 4) → (4, 3)`. Hoán đổi x và y.
- **Qua gốc tọa độ**: `[[-1, 0], [0, -1]] = -I`. Trùng với rotation 180°.

Reflection có **det = -1** (đảo hướng, xem mục 9).

### 3.5. Shear — kéo lệch

```
Shear theo x:  | 1  k |       (x, y) → (x + k·y, y)
               | 0  1 |
```

- `k > 0`: kéo phần trên sang phải. Hình vuông → hình bình hành nghiêng phải.
- `(1, 0) → (1, 0)` (trục x giữ nguyên).
- `(0, 1) → (k, 1)` (đỉnh trên dịch sang `(k, 1)`).

```
Shear theo y:  | 1  0 |       (x, y) → (x, k·x + y)
               | k  1 |
```

**Ví dụ `k = 1`:** `(0, 1) → (1, 1)`, `(2, 3) → (5, 3)`.

### 3.6. Projection — chiếu lên trục/đường thẳng

- **Lên trục x**: `[[1, 0], [0, 0]]`. `(3, 4) → (3, 0)`.
- **Lên trục y**: `[[0, 0], [0, 1]]`. `(3, 4) → (0, 4)`.
- **Lên đường `y = x`**: `(1/2)·[[1, 1], [1, 1]]`. `(3, 5) → (4, 4)`.

Projection có **det = 0** (bóp dẹt mặt phẳng thành đường thẳng).

> **⚠ Lỗi thường gặp**
>
> - **Nhầm `(a, b) → (b, a)` với rotation**: đó là **reflection qua y = x**, không phải rotation. Rotation phải có dạng `cos`/`sin`, det = +1; còn reflection có det = -1.
> - **Quên rằng shear bảo toàn diện tích**: det(shear) = `1·1 - k·0 = 1`. Mặt phẳng bị "nghiêng" nhưng diện tích các hình không đổi.
> - **Tưởng projection là invertible**: KHÔNG. Projection mất thông tin (mọi điểm trên đường thẳng song song với hướng chiếu đều map vào cùng 1 điểm). `det = 0` → không có inverse.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Ma trận `[[2, 0], [0, 2]]` là biến đổi gì?
> 2. Ma trận `[[0, 1], [-1, 0]]` (chú ý dấu) là biến đổi gì?
> 3. Áp dụng `[[1, 0], [0, 0]]` cho `(5, 7)` được gì?
>
> <details><summary>Đáp án</summary>
>
> 1. Scaling đều gấp đôi. Mọi vector dài gấp 2.
> 2. Rotation `R(-90°)` (xoay 90° theo chiều kim đồng hồ). `(1, 0) → (0, -1)`.
> 3. `(5, 0)` — chiếu xuống trục x.
> </details>

---

## 4. Walk-through 5 biến đổi cụ thể — xem `(1,0), (0,1), (1,1)` đi đâu

Đây là cách nhanh nhất để "đọc" một ma trận: chỉ cần xem 3 vector đặc biệt đi về đâu.

### 4.1. `A₁ = [[2, 0], [0, 3]]` — Scaling

| Vector | Ảnh | Mô tả |
|--------|-----|-------|
| `(1, 0)` | `(2, 0)` | Trục x kéo dài gấp 2 |
| `(0, 1)` | `(0, 3)` | Trục y kéo dài gấp 3 |
| `(1, 1)` | `(2, 3)` | Đường chéo bị biến dạng |

Hình vuông đơn vị → hình chữ nhật `2 × 3`. Diện tích `2·3 = 6`.

### 4.2. `A₂ = R(45°)` — Rotation 45°

`cos 45° = sin 45° = √2/2 ≈ 0.707`.

```
A₂ ≈ | 0.707  -0.707 |
     | 0.707   0.707 |
```

| Vector | Ảnh |
|--------|-----|
| `(1, 0)` | `(0.707, 0.707)` |
| `(0, 1)` | `(-0.707, 0.707)` |
| `(1, 1)` | `(0, 1.414)` — đường chéo thẳng đứng |

Diện tích không đổi: `det = cos²(45°) + sin²(45°) = 1`.

### 4.3. `A₃ = [[0, 1], [1, 0]]` — Reflection qua `y = x`

| Vector | Ảnh |
|--------|-----|
| `(1, 0)` | `(0, 1)` |
| `(0, 1)` | `(1, 0)` |
| `(1, 1)` | `(1, 1)` (fixed) |

Đường `y = x` là **trục đối xứng** — mọi điểm trên đó là điểm bất động.

### 4.4. `A₄ = [[1, 1], [0, 1]]` — Shear

| Vector | Ảnh |
|--------|-----|
| `(1, 0)` | `(1, 0)` (trục x bất động) |
| `(0, 1)` | `(1, 1)` |
| `(1, 1)` | `(2, 1)` |

Hình vuông đơn vị → hình bình hành. Diện tích vẫn = 1 (det = 1).

### 4.5. `A₅ = [[1, 1], [1, 1]]` — Ma trận hạng 1 (projection lên `y = x`, có scaling)

| Vector | Ảnh |
|--------|-----|
| `(1, 0)` | `(1, 1)` |
| `(0, 1)` | `(1, 1)` |
| `(1, 1)` | `(2, 2)` |

Cả `(1, 0)` và `(0, 1)` đều map vào `(1, 1)` — **mất thông tin**. Toàn bộ mặt phẳng bị bóp dẹt vào đường `y = x`. Det = 0.

> **📝 Tóm tắt mục 4**
> - Để "đọc" một ma trận 2×2: chỉ cần xem cột 1 (ảnh của `(1, 0)`) và cột 2 (ảnh của `(0, 1)`).
> - 6 biến đổi cơ bản (identity, scaling, rotation, reflection, shear, projection) là "bảng chữ cái" của linear transformation trong ℝ².

---

## 5. Composition = Nhân ma trận

### 5.1. Phát biểu

> Nếu `T₁(x) = A·x` và `T₂(y) = B·y`, thì **composition** `T₂ ∘ T₁`, tức là "áp `T₁` trước rồi áp `T₂`", chính là nhân ma trận:
>
> `(T₂ ∘ T₁)(x) = T₂(T₁(x)) = T₂(A·x) = B·(A·x) = (B·A)·x`

Ma trận biểu diễn composition là **`B·A`** (B đứng trước, A đứng sau — thứ tự ngược với thứ tự đọc!).

> **💡 Trực giác**
>
> Quy tắc đọc: **đọc từ PHẢI sang TRÁI**. `B·A·x` = "trước tiên áp A vào x, rồi áp B vào kết quả".
>
> Đây là lý do duy nhất nhân ma trận được định nghĩa "kỳ lạ" — hàng nhân cột, thứ tự không giao hoán. Nó được thiết kế để **biểu diễn composition của linear transformation**. Nếu nhân ma trận được định nghĩa kiểu "ô tương ứng nhân nhau" (element-wise) thì composition sẽ KHÔNG biểu diễn được — và linear algebra sẽ vô dụng.

### 5.2. Walk-through

**Ví dụ.** `A` = scaling gấp 2 theo x: `[[2, 0], [0, 1]]`. `B` = rotation 90° ngược chiều kim đồng hồ: `[[0, -1], [1, 0]]`.

**Composition `B·A`** (scale trước, rotate sau):

```
B·A = | 0  -1 | · | 2  0 | = | 0·2 + (-1)·0   0·0 + (-1)·1 | = | 0  -1 |
      | 1   0 |   | 0  1 |   | 1·2 +   0 ·0   1·0 +   0 ·1 |   | 2   0 |
```

Áp `B·A` vào `(1, 0)`: `(0·1 + (-1)·0, 2·1 + 0·0) = (0, 2)`.

Kiểm tra từng bước:
- `A·(1, 0) = (2, 0)` (kéo x gấp 2).
- `B·(2, 0) = (0, 2)` (xoay 90° → trục y, dài 2). ✓

**Composition `A·B`** (rotate trước, scale sau):

```
A·B = | 2  0 | · | 0  -1 | = | 0  -2 |
      | 0  1 |   | 1   0 |   | 1   0 |
```

Áp vào `(1, 0)`: `(0·1 + (-2)·0, 1·1 + 0·0) = (0, 1)`.

Kiểm tra:
- `B·(1, 0) = (0, 1)` (xoay → trục y).
- `A·(0, 1) = (0, 1)` (không scale vì đang trên y).

→ `A·B ≠ B·A`. **Thứ tự quan trọng.**

> **⚠ Lỗi thường gặp**
>
> - **Nhầm thứ tự**: muốn "rotate trước, scale sau" lại viết `B·A` (đáng ra phải `A·B`). Quy tắc: ma trận đứng GẦN `x` nhất được áp ĐẦU TIÊN. `B·A·x` = `A` áp trước.
> - **Tưởng `A·B = B·A` luôn**: chỉ đúng trong một số trường hợp đặc biệt (cùng là rotation quanh gốc, hoặc cùng là diagonal). Tổng quát thì sai.

### 5.3. Vì sao điều này quan trọng?

- **Animation trong game/CGI**: nhân vật bị rotate, scale, translate liên tục → ghép thành 1 ma trận `M = T₃·T₂·T₁` rồi áp 1 lần (tăng tốc).
- **Neural network**: 1 forward pass = `output = σ(W_n·σ(W_{n-1}·... σ(W_1·x)))` — composition của nhiều linear transformation (xen kẽ với non-linear `σ`).
- **Camera 3D → màn hình 2D**: ma trận projection ghép với ma trận view ghép với ma trận model.

> **📝 Tóm tắt mục 5**
> - Composition = nhân ma trận. `(T₂ ∘ T₁)(x) = (B·A)·x`.
> - Đọc từ PHẢI sang TRÁI.
> - Nhân ma trận **không giao hoán** vì composition không giao hoán.

---

## 6. Kernel (Nhân) và Image (Ảnh)

### 6.1. Định nghĩa

> **Kernel (null space)** của ma trận `A` (kích thước `m × n`):
>
> `Ker(A) = { x ∈ ℝⁿ : A·x = 0 }`
>
> Tập tất cả vector bị **nén về 0** dưới biến đổi `T`.

> **Image (column space, range)** của `A`:
>
> `Im(A) = { A·x : x ∈ ℝⁿ } = span(các cột của A)`
>
> Tập tất cả vector có thể là **đầu ra** của `T`.

> **💡 Trực giác**
>
> - **Kernel** = "lỗ đen" của hàm. Mọi vector trong kernel bị **bóp dẹt thành 0**, không phân biệt được nhau sau khi áp `T`.
> - **Image** = "tầm với" của hàm. Đâu là các vector mà `T` có thể tạo ra?
>
> Ví dụ với projection lên trục x:
> - Kernel = toàn bộ trục y (mọi `(0, y)` đều → `(0, 0)`).
> - Image = toàn bộ trục x (mọi điểm trên trục x đều có thể là output).

### 6.2. Walk-through 3 ví dụ

**Ví dụ A. `A = [[1, 0], [0, 0]]`** (projection lên x).
- `A·(x, y) = (x, 0)`.
- **Kernel**: `(x, y) = 0` ⇒ `x = 0`, `y` tự do ⇒ Ker = `{(0, y) : y ∈ ℝ}` = **trục y**, dim = 1.
- **Image**: `{(x, 0) : x ∈ ℝ}` = **trục x**, dim = 1.

**Ví dụ B. `A = [[1, 2], [3, 4]]`**.
- Det = `1·4 - 2·3 = -2 ≠ 0` ⇒ `A` invertible.
- **Kernel**: `A·x = 0` chỉ có nghiệm `x = 0` (vì `A⁻¹` tồn tại) ⇒ Ker = `{0}`, dim = 0.
- **Image**: span của cột `(1, 3)` và `(2, 4)` — 2 cột độc lập ⇒ Im = `ℝ²`, dim = 2.

**Ví dụ C. `A = [[1, 2], [2, 4]]`** (cột 2 = 2·cột 1).
- Det = `1·4 - 2·2 = 0` ⇒ suy biến.
- Phương trình `A·x = 0`: `x + 2y = 0` và `2x + 4y = 0` (cùng phương trình) ⇒ `x = -2y`.
- **Kernel** = `{(-2y, y) : y ∈ ℝ}` = đường thẳng đi qua gốc tọa độ có hướng `(-2, 1)`, dim = 1.
- **Image** = span của `(1, 2)` (chỉ 1 cột độc lập) = đường thẳng `y = 2x`, dim = 1.

### 6.3. Tính kernel — giải `A·x = 0`

Phương pháp: dùng Gaussian elimination trên `A` (giống Algebra Lesson 08) để đưa về dạng bậc thang, rồi đọc nghiệm.

**Ví dụ chi tiết.** `A = [[1, 2, 3], [2, 4, 6]]` (`2 × 3`).
- Hàng 2 = 2·hàng 1 ⇒ hàng 2 bị triệt tiêu.
- Hệ rút gọn: `x₁ + 2x₂ + 3x₃ = 0`.
- 2 biến tự do `x₂ = s`, `x₃ = t`. Vậy `x₁ = -2s - 3t`.
- Kernel = `{(-2s - 3t, s, t) : s, t ∈ ℝ}` = span của `(-2, 1, 0)` và `(-3, 0, 1)`. Dim = 2.

> **❓ Câu hỏi tự nhiên**
>
> - *"Image và column space khác nhau ở đâu?"* — Là cùng một thứ. Image = `{A·x}` = `{x₁·a₁ + x₂·a₂ + ... + xₙ·aₙ}` (với `aᵢ` là cột thứ `i`) = span các cột.
> - *"Tại sao image gọi là 'range'?"* — Vì đó là **tập giá trị (range)** của hàm `T`.
> - *"Kernel có luôn chứa vector 0 không?"* — Có, vì `A·0 = 0` luôn đúng. Câu hỏi quan trọng hơn: kernel có **chỉ chứa** 0 hay không. Nếu chỉ có 0 ⇒ `A` injective (1-1) ⇒ `A` invertible (khi vuông).

---

## 7. Rank (Hạng)

### 7.1. Định nghĩa

> **Rank** của ma trận `A`:
>
> `rank(A) = dim(Im(A)) = số cột độc lập tuyến tính của A`

Tương đương: số hàng độc lập (định lý: rank cột = rank hàng).

> **💡 Trực giác**
>
> Rank = **số chiều thực sự** của không gian đầu ra. Nếu `A: ℝⁿ → ℝᵐ` có rank `r`:
> - Đầu vào là `n` chiều, nhưng image chỉ là một không gian `r` chiều bên trong `ℝᵐ`.
> - Nếu `r < n`, ma trận **mất thông tin** (bóp dẹt từ `n` chiều xuống `r` chiều).
> - Nếu `r = n = m`, ma trận **giữ đầy đủ** thông tin (invertible).

### 7.2. Định lý Rank-Nullity

> **Định lý Rank-Nullity**: Với `A` kích thước `m × n`,
>
> `rank(A) + dim(Ker(A)) = n`   (số cột)

`dim(Ker(A))` còn gọi là **nullity** — số chiều của kernel.

**Ý nghĩa**: tổng "phần được giữ" (rank) và "phần bị nén về 0" (nullity) bằng đúng số chiều đầu vào.

### 7.3. Walk-through 3 ví dụ tính rank

**Ví dụ 1.** `A = [[1, 0], [0, 1]] = I`.
- Cột 1 = `(1, 0)`, cột 2 = `(0, 1)` — độc lập.
- rank = 2. nullity = 0. Tổng = 2 = số cột. ✓

**Ví dụ 2.** `A = [[1, 2], [2, 4]]`.
- Cột 2 = 2·cột 1 — phụ thuộc.
- rank = 1 (chỉ 1 cột độc lập). nullity = 1. Tổng = 2 = số cột. ✓

**Ví dụ 3.** `A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`.
- Gauss elimination:
  - R₂ ← R₂ - 4·R₁: `[0, -3, -6]`.
  - R₃ ← R₃ - 7·R₁: `[0, -6, -12]`.
  - R₃ ← R₃ - 2·R₂: `[0, 0, 0]`.
- Dạng bậc thang: chỉ 2 hàng khác 0 ⇒ rank = 2. nullity = 3 - 2 = 1.

### 7.4. Phân loại theo rank

Cho `A` kích thước `m × n`:

| Trường hợp | Tên | Tính chất |
|------------|-----|-----------|
| `rank(A) = min(m, n)` | **Full rank** | Không gian đầu ra là tối đa |
| `rank(A) < min(m, n)` | **Rank deficient** | Mất thông tin, suy biến |
| `rank(A) = n = m` | **Invertible** (vuông) | `A⁻¹` tồn tại, det ≠ 0 |
| `rank(A) = 0` | **Zero matrix** | Toàn ma trận = 0 |

> **🔁 Dừng lại tự kiểm tra**
>
> Tính rank và nullity của `A = [[1, 1, 1], [1, 1, 1]]`.
>
> <details><summary>Đáp án</summary>
>
> Hàng 2 = hàng 1 ⇒ rank = 1. nullity = 3 - 1 = 2. (Kernel: `x + y + z = 0` ⇒ span của `(-1, 1, 0)` và `(-1, 0, 1)`.)
> </details>

> **📝 Tóm tắt mục 6-7**
> - Kernel = vector bị nén về 0. Image = ảnh đầu ra.
> - Rank = số chiều của image = số cột (hoặc hàng) độc lập.
> - Rank-Nullity: `rank + nullity = số cột`.

---

## 8. Định thức (Determinant)

### 8.1. Trực giác hình học

> **Định thức của ma trận `A` (`n × n`) = hệ số nhân thể tích (n chiều) khi `A` biến đổi không gian.**

- `n = 2`: det = diện tích hình bình hành mà hình vuông đơn vị biến thành.
- `n = 3`: det = thể tích khối hộp mà khối lập phương đơn vị biến thành.
- **Dấu của det**: dương = giữ hướng (orientation), âm = đảo hướng (lật).

### 8.2. Công thức 2×2

```
A = | a  b |       det(A) = a·d - b·c
    | c  d |
```

**Chứng minh hình học**: Cột 1 = `(a, c)`, cột 2 = `(b, d)`. Hai vector này tạo hình bình hành với diện tích bằng `|a·d - b·c|`. (Đây là **cross product** của 2 vector trong mặt phẳng.)

**Ví dụ:**
- `A = [[2, 0], [0, 3]]`: det = `2·3 - 0·0 = 6`. Hình vuông đơn vị → hình chữ nhật `2 × 3`, diện tích 6. ✓
- `A = [[1, 1], [0, 1]]` (shear): det = `1·1 - 1·0 = 1`. Shear bảo toàn diện tích. ✓
- `A = [[1, 0], [0, -1]]` (reflection qua trục x): det = `1·(-1) - 0·0 = -1`. Diện tích = 1 (giữ nguyên), nhưng đảo hướng.
- `A = [[1, 2], [2, 4]]`: det = `1·4 - 2·2 = 0`. Suy biến — bóp dẹt thành đường thẳng.
- `R(45°) = [[0.707, -0.707], [0.707, 0.707]]`: det = `0.707² + 0.707² = 1`. Rotation luôn det = 1.

### 8.3. Công thức 3×3 (Sarrus / khai triển)

```
A = | a  b  c |
    | d  e  f |
    | g  h  i |

det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)
       = aei + bfg + cdh - ceg - bdi - afh
```

**Ví dụ.** `A = [[1, 2, 3], [4, 5, 6], [7, 8, 10]]`.
- `det = 1·(5·10 - 6·8) - 2·(4·10 - 6·7) + 3·(4·8 - 5·7)`
- `= 1·(50 - 48) - 2·(40 - 42) + 3·(32 - 35)`
- `= 1·2 - 2·(-2) + 3·(-3) = 2 + 4 - 9 = -3`.
- → det = -3. Có inverse, đảo hướng.

### 8.4. Tính chất quan trọng

1. **`det(A·B) = det(A)·det(B)`** — định thức của composition = tích định thức.
2. **`det(I) = 1`**.
3. **`det(Aᵀ) = det(A)`**.
4. **`det(A⁻¹) = 1/det(A)`** (khi tồn tại).
5. **`det(A) = 0` ⇔ A suy biến ⇔ A không invertible ⇔ rank(A) < n ⇔ Kernel chứa nhiều hơn vector 0**.
6. Đổi 2 hàng ⇒ det đổi dấu. Nhân hàng với `k` ⇒ det × k.

### 8.5. Tại sao det = 0 quan trọng?

- **det ≠ 0**: ma trận **trải** không gian đầu vào lên toàn bộ `ℝⁿ` đầu ra. Mọi `b` đều có duy nhất `x` sao cho `Ax = b`.
- **det = 0**: ma trận **bóp dẹt** không gian. Một số `b` không có nghiệm, một số có vô số nghiệm. (Đây là 3 trường hợp của Algebra Lesson 08!)

> **⚠ Lỗi thường gặp**
>
> - **Tưởng det là tổng các phần tử trên đường chéo**: đó là **trace** (vết), không phải det. Trace = `a + d` cho 2×2, trong khi det = `ad - bc`.
> - **Quên lấy giá trị tuyệt đối khi nói về diện tích**: diện tích = `|det|`, det có thể âm.
> - **Tính det cho ma trận không vuông**: định thức chỉ định nghĩa cho ma trận VUÔNG.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. `det([[3, 4], [1, 2]]) = ?`
> 2. Ma trận `[[2, 1], [4, 2]]` có invertible không?
> 3. Rotation luôn có det bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. `3·2 - 4·1 = 2`.
> 2. det = `2·2 - 1·4 = 0`. Không invertible.
> 3. det `R(θ) = cos²θ + sin²θ = 1`.
> </details>

> **📝 Tóm tắt mục 8**
> - det = hệ số nhân diện tích/thể tích.
> - det = 0 ⇔ suy biến (mất thông tin).
> - det < 0 ⇔ đảo hướng (reflection-like).
> - `det(A·B) = det(A)·det(B)`.

---

## 9. Ma trận đặc biệt

### 9.1. Trực giao (Orthogonal)

> **A trực giao ⇔ `Aᵀ·A = I` ⇔ `A⁻¹ = Aᵀ`.**

- **Bảo toàn độ dài**: `‖A·x‖ = ‖x‖` với mọi `x`.
- **Bảo toàn góc và dot product**: `(A·u)·(A·v) = u·v`.
- **Các cột tạo thành orthonormal basis** (vuông góc đôi một, mỗi cột có độ dài 1).
- **`det = ±1`**.

**Ví dụ**:
- Rotation `R(θ)`: trực giao, det = +1.
- Reflection: trực giao, det = -1.
- Identity `I`: trực giao.

**Walk-through** `A = R(60°) = [[0.5, -0.866], [0.866, 0.5]]`:
- `Aᵀ·A`: phần tử (1,1) = `0.5² + 0.866² = 0.25 + 0.75 = 1`. ✓
- Phần tử (1,2) = `0.5·(-0.866) + 0.866·0.5 = 0`. ✓
- → `Aᵀ·A = I`. Trực giao.

**Trong ML**: PCA tìm trục mới = ma trận trực giao. SVD phân tích `A = U·Σ·Vᵀ` với `U`, `V` trực giao.

### 9.2. Đối xứng (Symmetric)

> **A đối xứng ⇔ `A = Aᵀ`** (ma trận vuông, đối xứng qua đường chéo).

- Mọi eigenvalue là **số thực** (sẽ học Lesson 07).
- Có thể chéo hóa được (diagonalizable) bằng ma trận trực giao.

**Ví dụ trong ML**:
- **Covariance matrix**: `Σ = (1/n) Xᵀ·X`. Luôn đối xứng. Là trung tâm của PCA.
- **Hessian** (ma trận đạo hàm bậc 2): `H_ij = ∂²f / (∂x_i ∂x_j)`. Đối xứng theo định lý Schwarz.
- **Gram matrix** `G = Xᵀ·X` trong kernel methods.

### 9.3. Đường chéo (Diagonal)

> **A đường chéo ⇔ `aᵢⱼ = 0` với mọi `i ≠ j`.** Chỉ có phần tử trên đường chéo khác 0.

- Biểu diễn scaling thuần (mỗi trục bị scale với hệ số `aᵢᵢ`).
- **det = tích các phần tử đường chéo**: `det(diag(λ₁, ..., λₙ)) = λ₁·...·λₙ`.
- **Nhân ma trận đường chéo rất nhanh**: `O(n)` thay vì `O(n²)`.
- **Inverse**: `(diag(λ₁, ..., λₙ))⁻¹ = diag(1/λ₁, ..., 1/λₙ)` (nếu mọi `λᵢ ≠ 0`).

**Trong ML**: SVD cho ma trận giữa `Σ` là **diagonal** chứa các giá trị kỳ dị (singular values).

### 9.4. Bảng so sánh

| Loại | Định nghĩa | det | Inverse | Ví dụ ML |
|------|-----------|-----|---------|----------|
| Identity | `aᵢⱼ = δᵢⱼ` | 1 | I | "Không làm gì" |
| Diagonal | `aᵢⱼ = 0` khi i≠j | `∏ aᵢᵢ` | `diag(1/aᵢᵢ)` | Σ trong SVD |
| Symmetric | `A = Aᵀ` | bất kỳ | thường tồn tại | Covariance, Hessian |
| Orthogonal | `AᵀA = I` | ±1 | `Aᵀ` | Rotation, U, V trong SVD |
| Triangular (tam giác) | `aᵢⱼ = 0` ở nửa kia | `∏ aᵢᵢ` | bằng back-substitution | LU decomposition |

> **❓ Câu hỏi tự nhiên**
>
> - *"Orthogonal và orthonormal khác nhau gì?"* — "Orthogonal matrix" trong linear algebra = các cột **orthonormal** (vừa vuông góc vừa có độ dài 1). Tên hơi không chuẩn nhưng đã thành quy ước.
> - *"Symmetric thì có invertible không?"* — Không nhất thiết. `[[1, 1], [1, 1]]` đối xứng nhưng det = 0. Nhưng nếu symmetric **và** mọi eigenvalue ≠ 0 ⇒ invertible.

---

## 10. Affine Transformation và liên hệ với ML/AI

### 10.1. Affine = Linear + Translation

> **Affine transformation**: `T(x) = A·x + b`, với `A` là ma trận, `b` là vector hằng.
>
> - Khi `b = 0`: thuần linear.
> - Khi `b ≠ 0`: KHÔNG còn linear (`T(0) = b ≠ 0`).

Nhưng có một mẹo: dùng **homogeneous coordinates** — nhúng `ℝⁿ` vào `ℝⁿ⁺¹` bằng cách thêm 1 vào cuối:

```
| A  b | · | x | = | A·x + b |
| 0  1 |   | 1 |   |    1    |
```

→ Affine **trở thành** linear trong không gian cao hơn 1 chiều. Đây là lý do trong graphics 3D người ta dùng ma trận `4 × 4` thay vì `3 × 3`.

### 10.2. Fully-Connected Layer trong Neural Network

Một FC layer trong neural net có công thức chuẩn:

```
y = σ(W·x + b)
```

- `x ∈ ℝⁿ`: input.
- `W ∈ ℝᵐˣⁿ`: weight matrix (linear transformation).
- `b ∈ ℝᵐ`: bias.
- `σ`: hàm phi tuyến (ReLU, sigmoid, ...).
- `y ∈ ℝᵐ`: output.

**Phần `W·x + b` chính là affine transformation** từ `ℝⁿ` sang `ℝᵐ`. Không có hàm phi tuyến `σ`, một mạng FC nhiều layer chỉ là **composition của các affine transformation** = một affine transformation duy nhất (vô dụng). `σ` mới làm cho mạng "deep".

**Walk-through.** Mạng 2 layer:
- Layer 1: `h = ReLU(W₁·x + b₁)`. `x ∈ ℝ³, W₁ ∈ ℝ⁴ˣ³, b₁ ∈ ℝ⁴, h ∈ ℝ⁴`.
- Layer 2: `y = W₂·h + b₂`. `W₂ ∈ ℝ²ˣ⁴, b₂ ∈ ℝ², y ∈ ℝ²`.

Nếu bỏ `ReLU`: `y = W₂·(W₁·x + b₁) + b₂ = (W₂·W₁)·x + (W₂·b₁ + b₂)` — vẫn affine, không học được hàm phức.

### 10.3. Convolution trong CNN = Sparse Matrix

**Convolution** với kernel 3×3 cho ảnh 5×5 thực ra **là phép nhân ma trận**: ảnh được flatten thành vector 25 chiều, output flatten thành vector (hoặc giữ 2D). Ma trận biến đổi có:
- Kích thước `(số pixel output) × 25`.
- **Thưa**: hầu hết phần tử = 0, chỉ ~9 phần tử khác 0 mỗi hàng (tương ứng với 9 ô của kernel).
- **Chia sẻ tham số**: các hàng có cùng cấu trúc, chỉ dịch chuyển vị trí.

Convolution = **linear transformation đặc biệt** với 2 ràng buộc: sparse + parameter sharing. Đây là lý do CNN học efficient hơn FC layer cho ảnh.

### 10.4. Whitening Data — chuẩn bị cho ML

**Whitening** = biến đổi dữ liệu để **covariance matrix = I**:
- Trừ mean: `x̃ = x - μ`.
- Tính covariance `Σ = (1/n) X̃ᵀ·X̃`.
- Eigendecomposition `Σ = U·D·Uᵀ` (Lesson 07).
- Áp `W = D^(-1/2)·Uᵀ` lên dữ liệu: `z = W·x̃`.
- Kết quả: dữ liệu mới `z` có covariance = `I`.

**Tại sao có ích?** Một số thuật toán (PCA gradient descent, một số loss function) hội tụ nhanh hơn khi dữ liệu "tròn" (covariance = I) thay vì "elip kéo dài" (eigenvalue chênh lệch lớn → ill-conditioned).

### 10.5. Tổng kết liên hệ

| Khái niệm linear algebra | Ứng dụng ML/AI |
|--------------------------|-----------------|
| Ma trận = linear transformation | Weight matrix `W` trong neural net |
| Affine transformation | FC layer `Wx + b` |
| Composition = nhân ma trận | Forward pass của deep network |
| Sparse matrix | Convolution layer |
| Orthogonal matrix | Rotation trong embeddings, U/V trong SVD |
| Symmetric matrix | Covariance, Hessian, Gram matrix |
| Diagonal matrix | Σ trong SVD, sau khi whitening |
| det = 0 | Mất thông tin (PCA cắt component) |
| Kernel | Null space — feature bị "kill" |
| Image | Subspace mà model có thể đại diện |

> **📝 Tóm tắt mục 9-10**
> - 4 loại ma trận đặc biệt: orthogonal (bảo toàn dài/góc), symmetric (eigenvalue thực), diagonal (scaling thuần), triangular (LU).
> - FC layer = affine = `Wx + b`. Phi tuyến `σ` mới là chìa khóa.
> - Convolution = sparse linear transformation.
> - Whitening = biến đổi để covariance = I.

---

## 11. Bài tập

### Bài tập 1 — Dựng ma trận từ mô tả

Cho `T : ℝ² → ℝ²` là biến đổi đáp ứng `T(1, 0) = (2, 1)` và `T(0, 1) = (-1, 3)`. Viết ma trận của `T`. Tính `T(4, -2)`.

### Bài tập 2 — Composition

Cho `A = [[1, 2], [0, 1]]` (shear), `B = [[2, 0], [0, 2]]` (scale gấp 2).
- a) Tính `A·B` và `B·A`. Có bằng nhau không?
- b) Áp `A·B` vào `(1, 1)`. So sánh với áp lần lượt `B` rồi `A`.

### Bài tập 3 — Kernel và Image

Cho `A = [[1, 2, -1], [2, 4, -2]]`.
- a) Tìm kernel của `A`.
- b) Tính rank và image của `A`.
- c) Kiểm tra Rank-Nullity.

### Bài tập 4 — Determinant và ý nghĩa hình học

- a) Tính det của `M = [[3, 1], [2, 4]]`.
- b) Hình vuông đơn vị (đỉnh `(0,0), (1,0), (1,1), (0,1)`) bị `M` biến đổi thành hình gì? Diện tích bằng bao nhiêu?
- c) `M` có đảo hướng không?

### Bài tập 5 — Nhận diện ma trận đặc biệt

Với mỗi ma trận sau, xác định: orthogonal? symmetric? diagonal? Tính det:
- a) `[[1, 0], [0, -1]]`
- b) `(1/√2)·[[1, -1], [1, 1]]`
- c) `[[3, 2], [2, 5]]`
- d) `[[2, 0, 0], [0, 3, 0], [0, 0, -1]]`

### Bài tập 6 — Affine và FC layer mini

Giả sử bạn có một FC layer `y = W·x + b` với `W = [[1, 2], [3, -1]]`, `b = (1, 0)`. Bỏ hàm phi tuyến.
- a) Tính `y` cho `x = (2, 1)`.
- b) Layer này biểu diễn linear transformation hay affine? Tại sao?
- c) Viết biểu diễn của layer này dưới dạng homogeneous (ma trận `3 × 3` áp dụng cho vector `(x, y, 1)`).

---

## 12. Lời giải chi tiết

### Bài 1

`A = [T(e₁) | T(e₂)] = [[2, -1], [1, 3]]`.

`T(4, -2) = A·(4, -2) = (2·4 + (-1)·(-2), 1·4 + 3·(-2)) = (8+2, 4-6) = (10, -2)`.

### Bài 2

a) 
```
A·B = [[1, 2], [0, 1]] · [[2, 0], [0, 2]]
    = [[1·2 + 2·0, 1·0 + 2·2], [0·2 + 1·0, 0·0 + 1·2]]
    = [[2, 4], [0, 2]]

B·A = [[2, 0], [0, 2]] · [[1, 2], [0, 1]]
    = [[2, 4], [0, 2]]
```
Trùng nhau! Đây là trường hợp đặc biệt: `B = 2I` (scaling đều) giao hoán với mọi ma trận. (Vì `I` giao hoán với mọi ma trận, và scalar `2` giao hoán.)

b) `A·B·(1, 1) = [[2, 4], [0, 2]]·(1, 1) = (2 + 4, 0 + 2) = (6, 2)`.

Lần lượt: `B·(1, 1) = (2, 2)`. Rồi `A·(2, 2) = (1·2 + 2·2, 0·2 + 1·2) = (6, 2)`. ✓ Khớp.

### Bài 3

a) Tìm `x` sao cho `A·x = 0`:
- Hệ: `x₁ + 2x₂ - x₃ = 0` và `2x₁ + 4x₂ - 2x₃ = 0`. Hàng 2 = 2·hàng 1 ⇒ chỉ 1 phương trình độc lập.
- `x₁ = -2x₂ + x₃`. Cho `x₂ = s, x₃ = t`: `x = (-2s + t, s, t) = s·(-2, 1, 0) + t·(1, 0, 1)`.
- → Ker = span của `(-2, 1, 0)` và `(1, 0, 1)`. dim = 2.

b) Image = span của cột `(1, 2), (2, 4), (-1, -2)`. Tất cả đều là bội của `(1, 2)`. → Image = span của `(1, 2)`, dim = rank = 1.

c) Rank-Nullity: `rank + nullity = 1 + 2 = 3 =` số cột. ✓

### Bài 4

a) `det(M) = 3·4 - 1·2 = 12 - 2 = 10`.

b) Hình vuông đơn vị → hình bình hành với 4 đỉnh:
- `(0, 0) → (0, 0)`.
- `(1, 0) → (3, 2)`.
- `(0, 1) → (1, 4)`.
- `(1, 1) → (4, 6)`.

Diện tích = `|det| = 10`.

c) det > 0 ⇒ KHÔNG đảo hướng. Giữ orientation (vẫn ngược chiều kim đồng hồ như ban đầu).

### Bài 5

a) `[[1, 0], [0, -1]]`:
- Symmetric: `A = Aᵀ` ✓
- Diagonal: ✓ (các phần tử ngoài chéo = 0)
- Orthogonal: `AᵀA = [[1, 0], [0, 1]] = I` ✓
- det = `1·(-1) - 0 = -1`. (Reflection qua trục x.)

b) `(1/√2)·[[1, -1], [1, 1]]`:
- Symmetric: cột 1 = `(1/√2, 1/√2)`, cột 2 = `(-1/√2, 1/√2)`. Hàng 1 = `(1/√2, -1/√2)`. Không bằng `Aᵀ`. → KHÔNG symmetric.
- Diagonal: KHÔNG.
- Orthogonal: tính `AᵀA`:
  - (1,1) = `(1/√2)² + (1/√2)² = 1/2 + 1/2 = 1` ✓
  - (1,2) = `(1/√2)·(-1/√2) + (1/√2)·(1/√2) = 0` ✓
  - (2,2) = `(-1/√2)² + (1/√2)² = 1` ✓
  - → `AᵀA = I`. Trực giao.
- det = `(1/√2)·(1/√2) - (-1/√2)·(1/√2) = 1/2 + 1/2 = 1`. (Đây là `R(45°)`.)

c) `[[3, 2], [2, 5]]`:
- Symmetric: ✓
- Diagonal: ✗
- Orthogonal: `AᵀA = A·A = [[3·3+2·2, 3·2+2·5], [2·3+5·2, 2·2+5·5]] = [[13, 16], [16, 29]] ≠ I`. KHÔNG.
- det = `3·5 - 2·2 = 11`.

d) `diag(2, 3, -1)`:
- Diagonal: ✓
- Symmetric: ✓
- Orthogonal: `AᵀA = diag(4, 9, 1) ≠ I`. KHÔNG.
- det = `2·3·(-1) = -6`.

### Bài 6

a) `y = W·x + b = (1·2 + 2·1, 3·2 + (-1)·1) + (1, 0) = (4, 5) + (1, 0) = (5, 5)`.

b) **Affine**, không phải linear thuần. Vì `b ≠ 0` ⇒ `T(0) = b = (1, 0) ≠ 0`, không thoả mãn `T(0) = 0` của linear transformation.

c) Homogeneous form: nhúng `x = (x₁, x₂)` thành `(x₁, x₂, 1)` ∈ ℝ³, dùng ma trận:
```
M = | 1   2   1 |
    | 3  -1   0 |
    | 0   0   1 |
```

Kiểm tra: `M·(2, 1, 1) = (1·2 + 2·1 + 1·1, 3·2 + (-1)·1 + 0·1, 0+0+1) = (5, 5, 1)`. ✓ Khớp với `y = (5, 5)` từ phần (a).

---

## 13. Tổng kết và liên kết

**Bài này đã đặt nền cho mọi thứ phía sau:**

- **Lesson 07 — Eigenvector & eigenvalue**: tìm các vector mà `A·v = λ·v` — hướng "không bị xoay" bởi `A`. Đây là khái niệm trung tâm của PCA, PageRank, spectral clustering.
- **Lesson 08 — PCA và SVD**: PCA = tìm hệ trục mới sao cho dữ liệu trải dài tối đa theo một số trục (eigenvector của covariance matrix). SVD = phân tích MỌI ma trận `A = U·Σ·Vᵀ` (3 ma trận đặc biệt: orthogonal, diagonal, orthogonal).
- **Tầng 5+ — Probability và Statistics**: covariance matrix (symmetric, semi-positive-definite), multivariate Gaussian.
- **Tầng 6+ — Machine Learning**: linear regression = giải `Ax = b` bằng least squares. Logistic regression, neural network = composition of affine + nonlinear.

**Slogan cho bài này**:

> "Mỗi ma trận là một hành động. Học linear algebra là học **mục lục các hành động** mà bạn có thể làm với vector — và cách kết hợp chúng."

---

## 14. Tham khảo

- **3Blue1Brown — Essence of Linear Algebra (chương 3-7)** — series video kinh điển về geometric intuition. Bài này lấy cảm hứng nhiều từ đó.
- **Strang, *Introduction to Linear Algebra*** — sách giáo trình MIT, chương 7-8 cho linear transformation.
- **Axler, *Linear Algebra Done Right*** — nhìn từ góc độ abstract (vector space, transformation), không phụ thuộc tọa độ.

---

**Tiếp theo**: [Lesson 07 — Eigenvector và Eigenvalue →](../lesson-07-eigenvectors/)

**Quay lại**: [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) · [Trang chính tầng](../index.html) · [Trang chính repo](../../index.html)
