# Lesson 03 — Norm và khoảng cách

> "Vector dài bao nhiêu?" — có nhiều cách trả lời. Bài này dạy 3 cách phổ biến nhất (L1, L2, L∞), cách đo khoảng cách giữa 2 vector, và vì sao chúng quan trọng cho machine learning.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Định nghĩa được **norm** của một vector theo nghĩa tổng quát — một hàm gán "độ lớn" cho vector, thỏa 3 tính chất.
- Tính được **L2 norm** (Euclidean — căn của tổng bình phương), **L1 norm** (Manhattan — tổng giá trị tuyệt đối), và **L∞ norm** (Chebyshev — max).
- Hiểu **Lₚ norm tổng quát** và cách 3 norm trên là các trường hợp đặc biệt khi `p = 1, 2, ∞`.
- Tính **khoảng cách (distance)** giữa 2 vector theo từng norm: `d(u, v) = ‖u − v‖`.
- Chứng minh 3 tính chất của norm: không âm, đồng nhất, **bất đẳng thức tam giác** (dùng Cauchy-Schwarz cho L2).
- Vẽ được **unit ball** (`{v : ‖v‖ = 1}`) trong ℝ² của mỗi norm: L2 → đường tròn, L1 → hình thoi, L∞ → hình vuông.
- **Normalize** một vector: `v̂ = v / ‖v‖`, ra vector cùng hướng có độ dài 1.
- Giải thích vì sao loss **MSE = ‖y_pred − y_true‖₂²**, vì sao **L1 regularization** tạo trọng số sparse, vì sao embedding hay được normalize trước khi dùng cosine similarity.

## Kiến thức tiền đề

- [Lesson 01 — Vectors](../lesson-01-vectors/): vector là gì, phép cộng/trừ, scalar multiplication.
- [Lesson 02 — Dot product](../lesson-02-dot-product/): `u·v = u₁v₁ + u₂v₂ + ...`, công thức `u·v = ‖u‖‖v‖cos θ`, **cosine similarity**, **Cauchy-Schwarz** (`|u·v| ≤ ‖u‖‖v‖`). Bài này dùng lại cosine-Schwarz để chứng minh bất đẳng thức tam giác.
- Từ Tầng 1 — [Algebra Lesson 04](../../Algebra/lesson-04-powers-roots-logs/): căn bậc 2, lũy thừa phân số.
- Từ Tầng 1 — [Algebra Lesson 01](../../Algebra/lesson-01-numbers/): giá trị tuyệt đối.

---

## 1. "Độ dài" của vector — góc nhìn tổng quát

> 💡 **Trực giác**: bạn vẽ một mũi tên từ gốc tọa độ `(0, 0)` ra điểm `(3, 4)`. Hỏi "mũi tên dài bao nhiêu?". Câu trả lời "5" (theo định lý Pythagoras `√(9+16) = 5`) chỉ là **một** trong nhiều cách trả lời. Nếu bạn đang ở Manhattan và phải đi bộ theo đường ô vuông, thực tế bạn đi **7 block** (3 ngang + 4 dọc). Nếu bạn là vua trên bàn cờ và mỗi nước đi 1 ô bất kỳ (kể cả chéo), bạn cần **4 nước**. Mỗi cách đo trả lời cùng câu hỏi "vector lớn cỡ nào" nhưng cho ra số khác nhau.

### 1.1. Norm là gì (định nghĩa hình thức)

Một **norm** trên ℝⁿ là một hàm `‖·‖ : ℝⁿ → ℝ` (gán mỗi vector một số thực không âm) thỏa **3 tính chất** sau với mọi vector `u, v ∈ ℝⁿ` và mọi vô hướng `c ∈ ℝ`:

| # | Tính chất | Công thức | Nghĩa trực giác |
|---|-----------|-----------|-----------------|
| 1 | **Không âm + xác định dương** | `‖v‖ ≥ 0`, và `‖v‖ = 0 ⇔ v = 0` | Độ dài không bao giờ âm; chỉ vector 0 mới có độ dài 0 |
| 2 | **Đồng nhất (homogeneity)** | `‖c·v‖ = |c|·‖v‖` | Nhân vector với 2 thì dài gấp 2; nhân với −3 thì dài gấp 3 (vẫn dương) |
| 3 | **Bất đẳng thức tam giác** | `‖u + v‖ ≤ ‖u‖ + ‖v‖` | Đi thẳng `u + v` không bao giờ dài hơn đi qua đoạn `u` rồi đoạn `v` |

Bất kỳ hàm nào thỏa 3 tính chất này đều được gọi là norm. Vậy thì có **rất nhiều** norm cùng tồn tại trên cùng không gian ℝⁿ. Bài này dạy 3 norm phổ biến nhất: L1, L2, L∞.

> ❓ **Tại sao cần nhiều norm?** Vì các bài toán thực tế đo "khoảng cách" khác nhau:
>
> - GPS định vị → L2 (khoảng cách đường chim bay).
> - Taxi đi trong thành phố ô vuông → L1.
> - Robot điều khiển 2 motor song song, motor chậm nhất quyết định thời gian → L∞.
> - Regularization trong ML: dùng L1 cho sparse, L2 cho smooth.

### 1.2. Ký hiệu

Có nhiều cách viết, tùy ngữ cảnh:

- `|v|` — đơn giản, đôi khi bị nhầm với giá trị tuyệt đối của số.
- `‖v‖` — chuẩn hơn (double bar), dùng phổ biến trong sách giáo khoa.
- `‖v‖₂`, `‖v‖₁`, `‖v‖_∞` — chỉ rõ là norm gì (L2, L1, L∞).

Nếu không ghi chỉ số, mặc định là **L2** (Euclidean) — vì đây là norm "thường thấy" nhất.

> 📝 **Tóm tắt mục 1**:
> - Norm = hàm gán "độ lớn" cho vector, thỏa 3 tính chất: ≥ 0, đồng nhất, bất đẳng thức tam giác.
> - Có nhiều norm trên cùng ℝⁿ — mỗi norm phù hợp với 1 loại bài toán.
> - Ký hiệu mặc định `‖v‖ = ‖v‖₂` (Euclidean).

---

## 2. L2 norm (Euclidean) — "đường chim bay"

### 2.1. Công thức

Với vector `v = (v₁, v₂, ..., vₙ)`:

```
‖v‖₂ = √(v₁² + v₂² + ... + vₙ²)
```

Đây là khoảng cách Euclidean từ gốc tọa độ tới điểm `(v₁, ..., vₙ)`. Nguồn gốc: định lý Pythagoras tổng quát hóa cho n chiều.

> 💡 **Trực giác**: trong 2D, `v = (3, 4)` là một mũi tên ngang 3, dọc 4. Tam giác vuông có 2 cạnh góc vuông 3 và 4 → cạnh huyền `√(9+16) = 5`. Trong 3D, `v = (1, 2, 2)` → `√(1+4+4) = √9 = 3`. Nguyên lý y hệt, chỉ thêm chiều.

### 2.2. Liên hệ với dot product

Vì `v·v = v₁² + v₂² + ... + vₙ²` (xem [Lesson 02](../lesson-02-dot-product/)), ta có:

```
‖v‖₂² = v·v
‖v‖₂  = √(v·v)
```

Đây là công thức rất quan trọng — dùng để **chứng minh** nhiều thứ về L2 norm thông qua tính chất của dot product (vốn dễ thao tác hơn).

### 2.3. Ví dụ tính

**Ví dụ 1**: `v = (3, 4)` (2D).

```
‖v‖₂ = √(3² + 4²) = √(9 + 16) = √25 = 5
```

**Ví dụ 2**: `v = (1, 2, 2)` (3D).

```
‖v‖₂ = √(1 + 4 + 4) = √9 = 3
```

**Ví dụ 3**: `v = (−5, 12)` (có thành phần âm — bình phương lên thành dương).

```
‖v‖₂ = √(25 + 144) = √169 = 13
```

**Ví dụ 4**: `v = (1, 1, 1, 1)` (4D, vector đều).

```
‖v‖₂ = √(1+1+1+1) = √4 = 2
```

**Ví dụ 5**: `v = (0.6, 0.8)` (vector nhỏ).

```
‖v‖₂ = √(0.36 + 0.64) = √1 = 1
```

Vector này nằm trên đường tròn đơn vị — sẽ gặp lại ở mục normalize.

> ❓ **Câu hỏi tự nhiên của người đọc**:
>
> - *"Sao phải bình phương rồi mở căn? Cộng trực tiếp thì sao?"* — Vì cộng `v₁ + v₂` cho ra một norm khác (L1, mục 3), không phải khoảng cách hình học. Bình phương + mở căn là công cụ của Pythagoras để ra đường chim bay đúng.
> - *"Nếu vector chỉ có 1 chiều, L2 norm là gì?"* — `‖v‖₂ = √(v₁²) = |v₁|`. Đúng bằng giá trị tuyệt đối.
> - *"L2 norm có đắt không?"* — `n` phép nhân + `n` phép cộng + 1 căn. O(n). Với vector 768 chiều (embedding BERT base), khoảng 1000 phép tính cơ bản — rất rẻ.

> ⚠ **Lỗi thường gặp**:
> - Quên bình phương: `‖(3, 4)‖ ≠ 3 + 4 = 7`.
> - Bình phương rồi quên mở căn: `‖(3, 4)‖² = 25`, không phải `‖(3, 4)‖`. Phân biệt `‖v‖²` (bằng dot product, không cần căn) và `‖v‖` (cần căn).
> - Quên trị tuyệt đối khi tổng quát hóa: thực ra L2 không cần `|·|` vì bình phương luôn ≥ 0. Nhưng L1 và L∞ thì cần.

> 🔁 **Dừng lại tự kiểm tra**:
>
> 1. Tính `‖(0, 0, 5)‖₂`.
> 2. Vector `v = (1, 1)` có `‖v‖₂ = ?`
> 3. `‖v‖₂²` viết bằng dot product là gì?
>
> <details>
> <summary>Đáp án</summary>
>
> 1. `√(0+0+25) = 5`.
> 2. `√(1+1) = √2 ≈ 1.414`.
> 3. `v·v`.
> </details>

---

## 3. L1 norm (Manhattan / taxicab)

### 3.1. Công thức

```
‖v‖₁ = |v₁| + |v₂| + ... + |vₙ|
```

Cộng giá trị tuyệt đối của tất cả thành phần.

> 💡 **Trực giác**: bạn ở Manhattan (New York). Đường phố tạo thành lưới ô vuông — bạn chỉ đi được ngang/dọc, không đi chéo. Nếu cần đến điểm cách 3 block đông và 4 block bắc, taxi của bạn đi `3 + 4 = 7` block. Đó là **L1 norm**. Tên gọi khác: **taxicab norm**, **Manhattan norm**.

### 3.2. Ví dụ tính

**Ví dụ 1**: `v = (3, 4)`.

```
‖v‖₁ = |3| + |4| = 3 + 4 = 7
```

(So với L2 = 5: L1 luôn ≥ L2 vì không có "tắt qua đường chéo".)

**Ví dụ 2**: `v = (1, 2, 2)`.

```
‖v‖₁ = 1 + 2 + 2 = 5
```

(L2 của vector này = 3 → L1 = 5 lớn hơn, đúng.)

**Ví dụ 3**: `v = (−5, 12)` — chú ý dấu trừ.

```
‖v‖₁ = |−5| + |12| = 5 + 12 = 17
```

(L2 = 13. L1 = 17.)

**Ví dụ 4**: `v = (1, −1, 1, −1)` (xen kẽ dấu).

```
‖v‖₁ = 1 + 1 + 1 + 1 = 4
```

(L2 = `√4 = 2`. L1 gấp đôi L2.)

**Ví dụ 5**: `v = (0.5, 0.5)`.

```
‖v‖₁ = 0.5 + 0.5 = 1
```

Vector này nằm trên "hình thoi đơn vị" của L1 (sẽ thấy ở mục 9).

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Sao taxi không đi đường chéo?"* — Vì đường phố Manhattan thật sự kẻ ô vuông, không có đường chéo. Đây là analogy đời sống cho L1.
> - *"L1 và L2 quan hệ như thế nào?"* — Luôn có `‖v‖₂ ≤ ‖v‖₁ ≤ √n · ‖v‖₂` (đẳng thức trái khi v có 1 thành phần khác 0; phải khi v đều). Sẽ chứng minh ở bài tập.
> - *"Tại sao trị tuyệt đối?"* — Vì độ dài không âm. Nếu không có `|·|`, vector `(1, −1)` sẽ có "L1" = 0, vô lý.

> ⚠ **Lỗi thường gặp**: Quên trị tuyệt đối — `‖(3, −4)‖₁` không phải `3 + (−4) = −1`, mà là `3 + 4 = 7`.

> 🔁 **Tự kiểm tra**:
>
> 1. Tính `‖(0, 0, 5)‖₁`.
> 2. Vector nào có `‖v‖₁ = ‖v‖₂`? (Gợi ý: chỉ có 1 thành phần khác 0.)
>
> <details>
> <summary>Đáp án</summary>
>
> 1. `0 + 0 + 5 = 5`. (Tình cờ bằng L2 vì chỉ có 1 thành phần khác 0.)
> 2. Vector có dạng `(0, ..., 0, a, 0, ..., 0)` — chỉ 1 thành phần khác 0. Khi đó `‖v‖₁ = |a|`, `‖v‖₂ = √(a²) = |a|`.
> </details>

---

## 4. L∞ norm (Chebyshev / max norm)

### 4.1. Công thức

```
‖v‖_∞ = max(|v₁|, |v₂|, ..., |vₙ|)
```

Lấy thành phần có giá trị tuyệt đối lớn nhất.

> 💡 **Trực giác**: bạn là **vua trên bàn cờ**. Mỗi nước, vua đi được 1 ô theo bất kỳ hướng nào — ngang, dọc, hoặc chéo (8 hướng). Hỏi: vua cần bao nhiêu nước để đi từ `(0,0)` đến `(3, 4)`? Đáp án: **4 nước** — vì vua đi chéo `(1,1)` 3 lần đến `(3,3)`, rồi đi dọc 1 lần đến `(3,4)`. Tổng cộng 4 nước = max(3, 4). Đây chính là **L∞ norm** = Chebyshev distance.
>
> Một analogy khác: **2 robot motor chạy song song**. Motor 1 chạy 3 m, motor 2 chạy 4 m. Cả 2 chạy cùng tốc độ. Thời gian xong = `max(3, 4) / v = 4 / v`. Motor nhanh hơn phải chờ motor chậm hơn. Chiều dài "bottleneck" quyết định thời gian.

### 4.2. Ví dụ tính

**Ví dụ 1**: `v = (3, 4)`.

```
‖v‖_∞ = max(3, 4) = 4
```

So sánh: L1 = 7, L2 = 5, L∞ = 4 — **L∞ ≤ L2 ≤ L1** (đúng luôn — sẽ chứng minh ở bài tập).

**Ví dụ 2**: `v = (1, 2, 2)`.

```
‖v‖_∞ = max(1, 2, 2) = 2
```

(L1 = 5, L2 = 3, L∞ = 2.)

**Ví dụ 3**: `v = (−5, 12)`.

```
‖v‖_∞ = max(|−5|, |12|) = max(5, 12) = 12
```

**Ví dụ 4**: `v = (1, 1, 1, 1)`.

```
‖v‖_∞ = max(1, 1, 1, 1) = 1
```

(L1 = 4, L2 = 2, L∞ = 1.)

**Ví dụ 5**: `v = (7, 0, 0, 0)`.

```
‖v‖_∞ = 7
```

(L1 = 7, L2 = 7 — cả ba bằng nhau khi chỉ có 1 thành phần.)

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Khi nào dùng L∞?"* — Khi bottleneck quan trọng: thời gian xử lý song song, sai số tối đa (max error), tolerance kiểm chứng.
> - *"L∞ có tên 'infinity' vì sao?"* — Vì `lim (p → ∞) ‖v‖_p = max |vᵢ|`. Xem mục 5.
> - *"Vector có 2 thành phần bằng nhau và là max, ‖v‖_∞ = ?"* — Vẫn là giá trị đó. `max(3, 3, 1) = 3`.

> ⚠ **Lỗi thường gặp**: Nhầm max với min. L∞ là **max**, không phải min. Vector `(1, 100)` có `‖v‖_∞ = 100`, không phải 1.

> 🔁 **Tự kiểm tra**:
>
> Tính L1, L2, L∞ của `v = (6, 8, 0)`.
>
> <details>
> <summary>Đáp án</summary>
>
> - L1 = 6 + 8 + 0 = 14.
> - L2 = √(36 + 64 + 0) = √100 = 10.
> - L∞ = max(6, 8, 0) = 8.
> - Kiểm: L∞ ≤ L2 ≤ L1 ⟺ 8 ≤ 10 ≤ 14 ✓
> </details>

---

## 5. Lₚ norm tổng quát

### 5.1. Định nghĩa

Với `p ≥ 1`, **Lₚ norm** (đọc là "L-p norm") định nghĩa:

```
‖v‖_p = (|v₁|^p + |v₂|^p + ... + |vₙ|^p)^(1/p)
```

Tức là: lũy thừa p từng thành phần (đã lấy trị tuyệt đối), cộng lại, rồi mở căn bậc p.

> 💡 **Trực giác**: `p` là "mức độ phạt" cho thành phần lớn. p càng cao → thành phần lớn càng quan trọng so với thành phần nhỏ.
> - `p = 1`: mọi thành phần "đóng góp" công bằng (chỉ cộng).
> - `p = 2`: thành phần lớn quan trọng hơn (do bình phương). Bù lại có "tính hình học" đẹp (Pythagoras).
> - `p → ∞`: chỉ thành phần lớn nhất quan trọng — các thành phần nhỏ bị "nuốt" trong max.

### 5.2. 3 norm đã học là trường hợp đặc biệt

**`p = 1`**:
```
‖v‖_1 = (|v₁|^1 + |v₂|^1 + ...)^(1/1) = |v₁| + |v₂| + ...
```
Đây chính là L1.

**`p = 2`**:
```
‖v‖_2 = (|v₁|^2 + |v₂|^2 + ...)^(1/2) = √(v₁² + v₂² + ...)
```
Đây chính là L2. (Lưu ý: `|v|² = v²`, không phụ thuộc dấu.)

**`p → ∞`**:
```
‖v‖_∞ = lim (p → ∞) (|v₁|^p + ... + |vₙ|^p)^(1/p) = max |vᵢ|
```
Đây là L∞.

> ❓ **Tại sao p → ∞ ra max?** Walk-through bằng số:
>
> Cho `v = (3, 4)`. Tính `‖v‖_p` cho vài giá trị p:
> | p | `‖v‖_p` |
> |---|---------|
> | 1 | 3 + 4 = **7** |
> | 2 | √(9 + 16) = **5** |
> | 4 | (81 + 256)^(1/4) = 337^0.25 ≈ **4.285** |
> | 10 | (3^10 + 4^10)^(1/10) = (59049 + 1048576)^0.1 ≈ **4.012** |
> | 100 | ≈ **4.000...** |
> | ∞ | max(3, 4) = **4** |
>
> Khi `p` tăng, `4^p` lấn át `3^p` (vì `(4/3)^p → ∞`), nên `(3^p + 4^p)^(1/p) ≈ (4^p)^(1/p) = 4`. Đây là cách "phép max trỗi dậy" từ tổng có lũy thừa.

### 5.3. Tại sao p ≥ 1 (không phải p > 0)?

Với `0 < p < 1`, hàm `(Σ|vᵢ|^p)^(1/p)` **không** thỏa bất đẳng thức tam giác. Ví dụ với `p = 0.5`, `u = (1, 0)`, `v = (0, 1)`:

```
‖u‖_0.5 = (1^0.5)^(1/0.5) = 1
‖v‖_0.5 = 1
‖u‖ + ‖v‖ = 2

u + v = (1, 1)
‖u+v‖_0.5 = (1^0.5 + 1^0.5)^(1/0.5) = (2)^2 = 4
```

`4 > 2` → vi phạm. Vậy với `p < 1`, hàm này **không phải norm** (thực ra gọi là "quasi-norm").

> 📝 **Tóm tắt mục 5**:
> - Lₚ norm = `(Σ|vᵢ|^p)^(1/p)` cho `p ≥ 1`.
> - L1, L2, L∞ là 3 trường hợp đặc biệt: `p = 1, 2, ∞`.
> - p tăng → ngày càng "thiên vị" thành phần lớn nhất.

---

## 6. Khoảng cách giữa 2 vector

### 6.1. Định nghĩa

**Khoảng cách (distance)** giữa 2 vector `u, v` cảm ứng từ norm:

```
d(u, v) = ‖u − v‖
```

Tức là: vẽ vector hiệu `u − v`, rồi đo norm của vector hiệu đó. Nếu `u, v` nằm gần nhau, vector hiệu ngắn, khoảng cách nhỏ.

> 💡 **Trực giác**: bạn ở `u = (1, 1)`, người bạn ở `v = (4, 5)`. Vector "từ v đến u" là `u − v = (−3, −4)`. Khoảng cách (đường chim bay) là `‖(−3, −4)‖₂ = 5`.

Tùy norm chọn → khoảng cách khác nhau:

- `d₂(u, v) = ‖u − v‖₂` — **Euclidean distance**.
- `d₁(u, v) = ‖u − v‖₁` — **Manhattan distance**.
- `d_∞(u, v) = ‖u − v‖_∞` — **Chebyshev distance**.

### 6.2. Ví dụ Euclidean distance

**Ví dụ 1**: `u = (1, 2)`, `v = (4, 6)`.
```
u − v = (−3, −4)
d₂(u, v) = √(9 + 16) = √25 = 5
```

**Ví dụ 2**: `u = (0, 0, 0)`, `v = (1, 2, 2)`.
```
u − v = (−1, −2, −2)
d₂(u, v) = √(1 + 4 + 4) = 3
```

(Nhận xét: khoảng cách từ gốc tọa độ đến `v` = `‖v‖`.)

**Ví dụ 3**: `u = (3, 0)`, `v = (0, 4)`.
```
u − v = (3, −4)
d₂(u, v) = √(9 + 16) = 5
```

**Ví dụ 4**: `u = (1.0, 2.0, 3.0)`, `v = (1.1, 2.1, 3.1)`. Hai vector rất gần.
```
u − v = (−0.1, −0.1, −0.1)
d₂(u, v) = √(0.01 × 3) = √0.03 ≈ 0.173
```

### 6.3. Ví dụ Manhattan distance

**Ví dụ 1**: `u = (1, 2)`, `v = (4, 6)`.
```
d₁(u, v) = |1−4| + |2−6| = 3 + 4 = 7
```

**Ví dụ 2**: `u = (0, 0)`, `v = (3, 4)`.
```
d₁(u, v) = 3 + 4 = 7
```

(Đi 3 ngang + 4 dọc.)

**Ví dụ 3**: `u = (5, 5)`, `v = (5, 5)`. Cùng vị trí.
```
d₁(u, v) = 0 + 0 = 0
```

**Ví dụ 4**: `u = (1, 2, 3, 4)`, `v = (2, 4, 6, 8)`.
```
d₁(u, v) = 1 + 2 + 3 + 4 = 10
```

### 6.4. Ví dụ Chebyshev distance

**Ví dụ 1**: `u = (1, 2)`, `v = (4, 6)`.
```
d_∞(u, v) = max(|1−4|, |2−6|) = max(3, 4) = 4
```

(Vua trên bàn cờ cần 4 nước để từ `u` tới `v`.)

**Ví dụ 2**: `u = (0, 0)`, `v = (10, 1)`.
```
d_∞ = max(10, 1) = 10
```

**Ví dụ 3**: `u = (5, 5)`, `v = (5, 5)`. → `d_∞ = 0`.

**Ví dụ 4**: `u = (1, 1, 1)`, `v = (4, 5, 6)`.
```
d_∞ = max(3, 4, 5) = 5
```

### 6.5. Tính chất của d (tự kế thừa từ norm)

Vì `d` định nghĩa qua norm, nên `d` thỏa:

- `d(u, v) ≥ 0`, `d(u, v) = 0 ⇔ u = v`. (Từ tính chất 1 của norm.)
- `d(u, v) = d(v, u)` (đối xứng — vì `‖u − v‖ = ‖−(v − u)‖ = ‖v − u‖` do đồng nhất với `c = −1`).
- `d(u, w) ≤ d(u, v) + d(v, w)` (**bất đẳng thức tam giác** cho khoảng cách).

Hàm `d` thỏa 3 tính chất này gọi là **metric** trong toán. Khi đó `(ℝⁿ, d)` là một **không gian metric**.

> ⚠ **Lỗi thường gặp**:
> - Quên trừ trước khi norm: `d(u, v) = ‖u‖ − ‖v‖` là **SAI**. Đúng phải là `‖u − v‖`.
> - Phản ví dụ: `u = (1, 0)`, `v = (0, 1)`. `‖u‖₂ − ‖v‖₂ = 1 − 1 = 0`, nhưng `‖u − v‖₂ = ‖(1, −1)‖₂ = √2 ≠ 0`. Hai vector khác nhau nhưng cùng độ dài → khoảng cách phải ≠ 0.

> 🔁 **Tự kiểm tra**:
>
> Cho `u = (2, 5)`, `v = (5, 1)`. Tính `d₁`, `d₂`, `d_∞`.
>
> <details>
> <summary>Đáp án</summary>
>
> `u − v = (−3, 4)`.
> - `d₁ = 3 + 4 = 7`
> - `d₂ = √(9+16) = 5`
> - `d_∞ = max(3, 4) = 4`
> </details>

---

## 7. Chứng minh 3 tính chất của norm

Ta chứng minh chi tiết cho L2 norm. L1, L∞ tương tự — dành làm bài tập.

### 7.1. Không âm và xác định dương

`‖v‖₂ = √(v₁² + v₂² + ... + vₙ²)`.

Mỗi `vᵢ² ≥ 0`, nên tổng `Σvᵢ² ≥ 0`, do đó căn bậc 2 có nghĩa và `‖v‖₂ ≥ 0`. ✓

**Khi nào `‖v‖₂ = 0`?**
`‖v‖₂ = 0 ⇔ Σvᵢ² = 0 ⇔ vᵢ² = 0 ∀i ⇔ vᵢ = 0 ∀i ⇔ v = 0`. ✓

(Bước "vᵢ² = 0 ∀i" dùng tính chất: tổng các số không âm = 0 ⇔ tất cả = 0.)

### 7.2. Đồng nhất (homogeneity)

Cần chứng minh `‖c·v‖₂ = |c| · ‖v‖₂`.

```
‖c·v‖₂² = (cv₁)² + (cv₂)² + ... + (cvₙ)²
        = c²v₁² + c²v₂² + ... + c²vₙ²
        = c² · (v₁² + ... + vₙ²)
        = c² · ‖v‖₂²
```

Mở căn bậc 2:
```
‖c·v‖₂ = √(c²) · √(‖v‖₂²) = |c| · ‖v‖₂
```

(Lưu ý: `√(c²) = |c|` chứ không phải `c`. Nếu `c = −3`, `√9 = 3 = |−3|`.) ✓

**Verify bằng số**: `v = (3, 4)`, `c = −2`. `c·v = (−6, −8)`.
- `‖c·v‖₂ = √(36 + 64) = √100 = 10`.
- `|c| · ‖v‖₂ = 2 · 5 = 10`. ✓

### 7.3. Bất đẳng thức tam giác (triangle inequality)

Cần chứng minh `‖u + v‖₂ ≤ ‖u‖₂ + ‖v‖₂`.

**Bước 1**: Bình phương vế trái (dùng `‖w‖₂² = w·w`):
```
‖u + v‖₂² = (u + v)·(u + v)
          = u·u + 2(u·v) + v·v       (do dot product có tính phân phối)
          = ‖u‖₂² + 2(u·v) + ‖v‖₂²
```

**Bước 2**: Áp dụng **Cauchy-Schwarz** (đã học ở [Lesson 02](../lesson-02-dot-product/)):
```
|u·v| ≤ ‖u‖₂ · ‖v‖₂
```
Suy ra `u·v ≤ |u·v| ≤ ‖u‖₂ · ‖v‖₂` (vì giá trị thực ≤ trị tuyệt đối).

**Bước 3**: Thay vào:
```
‖u + v‖₂² ≤ ‖u‖₂² + 2·‖u‖₂·‖v‖₂ + ‖v‖₂²
         = (‖u‖₂ + ‖v‖₂)²
```

**Bước 4**: Hai vế đều không âm, mở căn:
```
‖u + v‖₂ ≤ ‖u‖₂ + ‖v‖₂   ✓
```

**Khi nào dấu = xảy ra?** Khi `u·v = ‖u‖·‖v‖` (chứ không phải chỉ ≤). Cauchy-Schwarz đạt = khi `u`, `v` cùng phương cùng chiều (`v = c·u` với `c ≥ 0`). Vậy `u + v` đi thẳng = `‖u‖ + ‖v‖` khi 2 vector cùng hướng.

**Verify bằng số**: `u = (3, 0)`, `v = (0, 4)`.
- `‖u‖₂ = 3`, `‖v‖₂ = 4`, tổng = 7.
- `u + v = (3, 4)`, `‖u+v‖₂ = 5`.
- `5 ≤ 7` ✓ (bất đẳng thức nghiêm ngặt vì 2 vector không cùng hướng).

Verify với u, v cùng hướng: `u = (3, 0)`, `v = (6, 0)`. `‖u‖+‖v‖ = 3+6 = 9`. `u+v = (9,0)`, `‖u+v‖ = 9`. ✓ Đẳng thức.

> ❓ **Tại sao gọi là "bất đẳng thức tam giác"?**
>
> Trong tam giác có 3 cạnh `a, b, c`, ta luôn có `c ≤ a + b` — không có cạnh nào dài hơn tổng 2 cạnh kia. Ở đây, `u`, `v`, `u + v` tạo thành "tam giác" (mở từ gốc, đi qua đầu mút của `u`, rồi `u+v`). Bất đẳng thức `‖u+v‖ ≤ ‖u‖ + ‖v‖` chính là "cạnh đi thẳng ≤ tổng 2 cạnh đi vòng".

> 📝 **Tóm tắt mục 7**:
> - 3 tính chất norm: không âm + xác định, đồng nhất, bất đẳng thức tam giác.
> - Chứng minh L2 dùng Cauchy-Schwarz (Lesson 02).
> - Đẳng thức ở triangle inequality ⇔ 2 vector cùng hướng (dấu cùng dấu).

---

## 8. Hình dạng "unit ball"

### 8.1. Unit ball là gì

**Unit ball** (hình cầu đơn vị) của norm `‖·‖` là tập:

```
B = {v ∈ ℝⁿ : ‖v‖ ≤ 1}
```

**Unit sphere** (mặt cầu đơn vị) là biên của unit ball:

```
S = {v ∈ ℝⁿ : ‖v‖ = 1}
```

Trong ℝ² (2D), unit ball có hình dạng đặc trưng theo norm.

### 8.2. Unit ball của L2: đường tròn

`‖v‖₂ = 1 ⇔ √(v₁² + v₂²) = 1 ⇔ v₁² + v₂² = 1`.

Đây là phương trình đường tròn tâm gốc, bán kính 1.

```
       L2: x² + y² = 1
              .
          .   |   .
        .     |     .
       .      |      .
      .       |       .
      .-------+-------.
      .       |       .
       .      |      .
        .     |     .
          .   |   .
              .
```

### 8.3. Unit ball của L1: hình thoi (diamond)

`‖v‖₁ = 1 ⇔ |v₁| + |v₂| = 1`.

Đây là phương trình hình thoi với 4 đỉnh `(1, 0)`, `(0, 1)`, `(−1, 0)`, `(0, −1)`.

```
       L1: |x| + |y| = 1
              .
             /|\
            / | \
           /  |  \
          /   |   \
        .-----+-----.
          \   |   /
           \  |  /
            \ | /
             \|/
              .
```

Cạnh hình thoi: từ `(1, 0)` đến `(0, 1)` — phương trình `x + y = 1` với `x, y ≥ 0`.

### 8.4. Unit ball của L∞: hình vuông

`‖v‖_∞ = 1 ⇔ max(|v₁|, |v₂|) = 1`.

Đây là hình vuông từ `(−1, −1)` đến `(1, 1)`.

```
       L∞: max(|x|, |y|) = 1
       .---------------.
       |       |       |
       |       |       |
       |       |       |
       .-------+-------.
       |       |       |
       |       |       |
       |       |       |
       .---------------.
```

### 8.5. Quan hệ "lồng nhau"

So sánh 3 unit ball trên cùng hệ trục:

```
            L∞ (vuông lớn nhất)
         .---------------.
         |               |
         |   L2 (tròn)   |
         |  .---------.  |
         |  | L1 thoi |  |
         |  |  /\     |  |
         |  | /  \    |  |
         |  |/    \   |  |
         |  +------+  |  |
         |  |\    /   |  |
         |  | \  /    |  |
         |  |  \/     |  |
         |  '---------'  |
         |               |
         '---------------'
```

(Lồng từ trong ra ngoài: L1 ⊂ L2 ⊂ L∞.)

> 💡 **Trực giác**: Vì sao L1 nằm trong L2, L2 nằm trong L∞? Vì `‖v‖_∞ ≤ ‖v‖_2 ≤ ‖v‖_1` (chứng minh ở bài tập). Vector `v` có `‖v‖_1 = 1` thì `‖v‖_2 ≤ 1` → `v` cũng nằm trong L2 unit ball. Lý do hình học: muốn tổng `|x|+|y| = 1` (L1) thì mỗi thành phần phải khá nhỏ → vector ngắn theo L2 và L∞. Ngược lại, muốn `max(|x|,|y|) = 1` (L∞) thì chỉ cần 1 thành phần lớn — vector có thể dài hơn theo L1 và L2.

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Sao L1 có cạnh thẳng, L2 cong, L∞ thẳng góc?"* — Vì L2 có `vᵢ²` → curved. L1 và L∞ chỉ dùng `|vᵢ|` và max → piecewise linear → cạnh thẳng.
> - *"Hình dạng này quan trọng vì sao?"* — Trong tối ưu hóa, hình dạng unit ball của penalty quyết định kết quả. **L1 có "góc nhọn" tại trục → nghiệm tối ưu hay rơi vào trục → sparse weights** (Lasso). L2 trơn → nghiệm phân tán đều.

> 🔁 **Tự kiểm tra**:
>
> Vector `v = (0.7, 0.7)` có nằm trong L1 unit ball không? L2? L∞?
>
> <details>
> <summary>Đáp án</summary>
>
> - `‖v‖_1 = 0.7 + 0.7 = 1.4 > 1` → **ngoài** L1.
> - `‖v‖_2 = √(0.49 + 0.49) = √0.98 ≈ 0.99 < 1` → **trong** L2.
> - `‖v‖_∞ = max(0.7, 0.7) = 0.7 < 1` → **trong** L∞.
> </details>

> 📝 **Tóm tắt mục 8**:
> - Unit ball của L1: hình thoi. L2: tròn. L∞: vuông.
> - Lồng nhau: L1 ⊂ L2 ⊂ L∞ (cùng "radius 1").
> - Hình dạng quyết định hành vi regularization (mục 11).

---

## 9. Lₚ unit ball với p khác nhau (animation)

Khi `p` tăng từ 1 đến ∞, unit ball biến hình từ **hình thoi** (L1) → **tròn** (L2) → **vuông** (L∞). Bảng số cụ thể, vector `(x, y)` với `‖v‖_p = 1`:

| p | Hình dạng | Phương trình | Điểm `(0.7, ?)` trên unit sphere |
|---|-----------|--------------|-----------------------------------|
| 1 | Thoi nhọn | `|x|+|y| = 1` | y = 0.3 |
| 1.5 | Thoi tròn nhẹ | `|x|^1.5+|y|^1.5 = 1` | y ≈ 0.46 |
| 2 | Tròn | `x²+y² = 1` | y ≈ 0.714 |
| 3 | "Bo tròn" | `|x|³+|y|³ = 1` | y ≈ 0.87 |
| 5 | Gần vuông | `|x|⁵+|y|⁵ = 1` | y ≈ 0.96 |
| ∞ | Vuông | `max = 1` | y bất kỳ, miễn |y| ≤ 1, x cố định 0.7 cho điểm trên cạnh trên |

**Walk-through tính y khi p = 3, x = 0.7**:
```
|0.7|³ + |y|³ = 1
0.343 + y³ = 1
y³ = 0.657
y = 0.657^(1/3) ≈ 0.870
```

Khi p càng lớn, để giữ tổng `|x|^p + |y|^p = 1`, thành phần lớn hơn (gần 1) chiếm ưu thế áp đảo. Thành phần nhỏ "ít ảnh hưởng" → vector bị "đẩy" ra ngoài để chạm cạnh vuông L∞.

Visualization sẽ cho slider p để thấy biến hình mượt mà.

---

## 10. Normalize vector

### 10.1. Định nghĩa

**Normalize** một vector `v ≠ 0` là chia nó cho norm của chính nó:

```
v̂ = v / ‖v‖
```

Kết quả `v̂` (đọc là "v-hat") cùng hướng với `v` nhưng có **độ dài 1** (gọi là **unit vector**).

> 💡 **Trực giác**: tách vector thành 2 phần — **hướng** (direction) và **độ lớn** (magnitude). `v̂` giữ hướng, vứt độ lớn. Giống "vector chỉ đường" trong GPS — bạn chỉ cần biết "đi hướng nào", còn "xa bao nhiêu" lưu riêng.

### 10.2. Kiểm chứng `‖v̂‖ = 1`

Dùng tính đồng nhất (mục 7.2):

```
‖v̂‖ = ‖v / ‖v‖‖ = ‖(1/‖v‖) · v‖ = (1/‖v‖) · ‖v‖ = 1
```

(Dùng `c = 1/‖v‖ > 0` nên `|c| = c`.)

### 10.3. Walk-through ví dụ

**Ví dụ 1**: `v = (3, 4)`.
```
‖v‖₂ = 5
v̂ = (3/5, 4/5) = (0.6, 0.8)
```
Kiểm: `‖v̂‖ = √(0.36 + 0.64) = 1` ✓

**Ví dụ 2**: `v = (1, 1)`.
```
‖v‖₂ = √2
v̂ = (1/√2, 1/√2) ≈ (0.707, 0.707)
```
Kiểm: `‖v̂‖ = √(0.5 + 0.5) = 1` ✓

Vector này hướng 45° — trùng với `(cos 45°, sin 45°)`. Nhắc lại từ [Trigonometry](../../Trigonometry/) — mọi vector unit 2D đều có dạng `(cos θ, sin θ)`.

**Ví dụ 3**: `v = (0, 0, 5)` (chỉ thành phần thứ 3 khác 0).
```
‖v‖₂ = 5
v̂ = (0, 0, 1)
```

**Ví dụ 4**: `v = (2, 0, −2, 0)` (4D).
```
‖v‖₂ = √(4+0+4+0) = √8 = 2√2 ≈ 2.828
v̂ = (2/(2√2), 0, −2/(2√2), 0) = (1/√2, 0, −1/√2, 0) ≈ (0.707, 0, −0.707, 0)
```

### 10.4. Khi nào normalize?

- **Cosine similarity**: với 2 vector đã normalize, `cos θ = u·v` (xem [Lesson 02](../lesson-02-dot-product/)). Đơn giản dot product là xong, khỏi chia. Embedding vector trong RAG thường lưu sẵn ở dạng normalized.
- **Trừ "magnitude bias"**: khi so 2 document, document dài sẽ có `‖v‖` lớn — normalize để khỏi thiên vị document dài.
- **Gradient clipping**: khi gradient `g` quá lớn, dùng `g · min(1, c/‖g‖)` — đây là 1 dạng normalize có điều kiện.

> ⚠ **Lỗi thường gặp**:
> - Normalize vector 0 → chia cho 0! Phải check trước.
> - Quên dùng norm nào: thường L2. Nhưng bạn có thể "normalize theo L1" (`v / ‖v‖₁`) trong một số ngữ cảnh (vd biến vector thành phân phối xác suất nếu các thành phần đều ≥ 0).

> 🔁 **Tự kiểm tra**:
>
> Normalize `v = (6, 8)`.
>
> <details>
> <summary>Đáp án</summary>
>
> `‖v‖₂ = √(36+64) = 10`. `v̂ = (0.6, 0.8)`. Kiểm: `‖v̂‖ = √(0.36+0.64) = 1` ✓
> </details>

---

## 11. Liên hệ ML/AI

### 11.1. L2 norm trong loss MSE

**Mean Squared Error (MSE)** — hàm loss kinh điển cho regression:

```
MSE = (1/n) · Σᵢ (y_predᵢ − y_trueᵢ)²
    = (1/n) · ‖y_pred − y_true‖₂²
```

Tức là: MSE = **bình phương L2 norm** của vector sai số, chia n. Tối thiểu MSE = tối thiểu khoảng cách Euclidean giữa dự đoán và thực tế.

**Tại sao bình phương, không dùng L2 thẳng?**
- L2 có căn → gradient phức tạp (cần chain rule qua căn).
- L2² không có căn → gradient gọn, dạng `2·(y_pred − y_true)` per component.
- Khi tối thiểu, min `‖x‖²` ⇔ min `‖x‖` (vì căn là hàm tăng) → kết quả tối ưu giống nhau.

Walk-through số: `y_pred = (3, 5, 4)`, `y_true = (2, 5, 3)`.
```
e = y_pred − y_true = (1, 0, 1)
‖e‖₂² = 1 + 0 + 1 = 2
MSE = 2/3 ≈ 0.667
```

### 11.2. L1 và L2 regularization

Trong linear regression, "regularization" là **thêm penalty** vào loss để tránh overfit. Có 2 dạng phổ biến:

**Ridge regression (L2 reg)**:
```
L_ridge = MSE + λ · ‖w‖₂²
```
- Penalize trọng số lớn (vì bình phương).
- Trọng số shrink đều về gần 0 nhưng hiếm khi = 0.
- Nghiệm có dạng closed-form (`(XᵀX + λI)⁻¹ Xᵀy`).

**Lasso regression (L1 reg)**:
```
L_lasso = MSE + λ · ‖w‖₁
```
- Penalize tổng giá trị tuyệt đối.
- Một số trọng số bị **đẩy về đúng 0** → **sparse weights**.
- Dùng cho feature selection: trọng số = 0 nghĩa là feature đó bị "loại".

**Tại sao L1 tạo sparse?** Vì hình dạng unit ball của L1 (hình thoi) có "góc nhọn" nằm trên trục. Khi tối ưu hóa MSE bị giới hạn `‖w‖₁ ≤ C`, nghiệm thường rơi vào các góc nhọn này → các thành phần khác trên trục = 0. L2 (tròn) không có góc → nghiệm rơi đều trên đường tròn.

Walk-through hình học (sẽ thấy ở viz mục 9 unit ball + bài tập):
- Đường mức MSE = ellip xung quanh nghiệm OLS.
- Bị giới hạn `‖w‖₁ ≤ C` (hình thoi): ellip chạm hình thoi tại **góc** → 1 trục = 0.
- Bị giới hạn `‖w‖₂ ≤ C` (tròn): ellip chạm đường tròn tại điểm tiếp xúc bất kỳ → cả 2 trục ≠ 0.

### 11.3. Embedding normalize cho cosine similarity

Embedding (BERT, sentence-transformer, CLIP) thường được normalize trước khi lưu hoặc dùng:

```
embedding_normalized = embedding / ‖embedding‖₂
```

Lý do: khi tìm "câu tương tự" (semantic search), ta dùng **cosine similarity**:
```
cos(u, v) = (u·v) / (‖u‖·‖v‖)
```

Nếu cả 2 đã normalize (`‖u‖ = ‖v‖ = 1`), công thức rút lại thành **dot product thuần**:
```
cos(u, v) = u·v
```

Lợi:
- Tính nhanh: 1 phép dot product thay vì dot + 2 norm.
- Vector database (Pinecone, Weaviate, FAISS) tối ưu cho dot product trên vector normalized — không phải tính lại norm mỗi query.
- Khoảng cách Euclidean trên vector normalize tương đương cosine: `‖u−v‖² = 2 − 2(u·v) = 2(1 − cos θ)` (sẽ chứng minh ở bài tập).

### 11.4. k-NN: Euclidean hay cosine?

Khi tìm "k điểm gần nhất" (k-Nearest Neighbors):

| Loại dữ liệu | Khoảng cách phù hợp | Lý do |
|--------------|---------------------|-------|
| Tọa độ vật lý (GPS, ảnh pixel) | Euclidean (L2) | Có ý nghĩa hình học rõ |
| Embedding (text, image) | Cosine | Chỉ "hướng" có ý nghĩa, magnitude phụ thuộc length câu / brightness ảnh |
| Bản đồ thành phố ô vuông | Manhattan (L1) | Phản ánh đường đi thực |
| Categorical / sparse features | Cosine hoặc Hamming | Magnitude ít ý nghĩa |

Nguyên tắc: **dữ liệu mà "hướng" quan trọng hơn "độ lớn"** → cosine. Ngược lại → Euclidean. Embedding rơi vào loại đầu vì sau khi học, vector dài ngắn không nói lên ngữ nghĩa.

> 📝 **Tóm tắt mục 11**:
> - MSE = `‖y_pred − y_true‖₂² / n` — L2 distance bình phương.
> - L2 reg (Ridge) → shrink đều; L1 reg (Lasso) → sparse weights (góc nhọn của hình thoi).
> - Embedding normalize → cosine = dot product, nhanh hơn.
> - k-NN: Euclidean cho dữ liệu thô, cosine cho embedding.

---

## 12. Bài tập

### Bài 1 — Tính cơ bản

Cho `v = (2, −3, 6)`. Tính `‖v‖₁`, `‖v‖₂`, `‖v‖_∞`.

### Bài 2 — Khoảng cách 3 norm

Cho `u = (1, 2, 3, 4)`, `v = (5, 4, 3, 2)`. Tính `d₁(u, v)`, `d₂(u, v)`, `d_∞(u, v)`.

### Bài 3 — Normalize

Normalize `v = (1, 2, 2)`. Kiểm chứng `‖v̂‖₂ = 1`.

### Bài 4 — Bất đẳng thức L∞ ≤ L2 ≤ L1

Chứng minh với mọi vector `v ∈ ℝⁿ`:
```
‖v‖_∞ ≤ ‖v‖₂ ≤ ‖v‖₁ ≤ √n · ‖v‖₂ ≤ n · ‖v‖_∞
```

### Bài 5 — Quan hệ Euclidean vs cosine cho vector normalized

Cho `u`, `v` là 2 vector đã normalize (`‖u‖₂ = ‖v‖₂ = 1`). Chứng minh:
```
‖u − v‖₂² = 2 · (1 − cos θ)
```
trong đó `θ` là góc giữa `u`, `v`.

### Bài 6 — Sparse với L1

Trong ℝ², tìm điểm `(x, y)` thuộc đường thẳng `x + 2y = 4` sao cho `‖(x, y)‖₁` nhỏ nhất. So sánh với nghiệm tối thiểu `‖(x, y)‖₂`.

---

## Lời giải chi tiết

### Bài 1

`v = (2, −3, 6)`.

- `‖v‖₁ = |2| + |−3| + |6| = 2 + 3 + 6 = 11`.
- `‖v‖₂ = √(4 + 9 + 36) = √49 = 7`.
- `‖v‖_∞ = max(2, 3, 6) = 6`.

Kiểm: `‖v‖_∞ ≤ ‖v‖₂ ≤ ‖v‖₁` ⟺ `6 ≤ 7 ≤ 11` ✓.

### Bài 2

`u − v = (1−5, 2−4, 3−3, 4−2) = (−4, −2, 0, 2)`.

- `d₁ = |−4| + |−2| + |0| + |2| = 4 + 2 + 0 + 2 = 8`.
- `d₂ = √(16 + 4 + 0 + 4) = √24 = 2√6 ≈ 4.899`.
- `d_∞ = max(4, 2, 0, 2) = 4`.

Kiểm: `4 ≤ 4.899 ≤ 8` ✓.

### Bài 3

`v = (1, 2, 2)`.

- `‖v‖₂ = √(1 + 4 + 4) = √9 = 3`.
- `v̂ = v / 3 = (1/3, 2/3, 2/3) ≈ (0.333, 0.667, 0.667)`.

Kiểm: `‖v̂‖₂ = √((1/9) + (4/9) + (4/9)) = √(9/9) = √1 = 1` ✓.

### Bài 4

**Phần 1: `‖v‖_∞ ≤ ‖v‖₂`**.

Gọi `M = max |vᵢ|` (tồn tại vì n hữu hạn). Khi đó `M² ≤ v₁² + v₂² + ... + vₙ²` (vì một số trong tổng = M², các số còn lại ≥ 0). Mở căn:
```
M ≤ √(Σvᵢ²)
‖v‖_∞ ≤ ‖v‖₂   ✓
```

**Phần 2: `‖v‖₂ ≤ ‖v‖₁`**.

Bình phương vế trái:
```
‖v‖₂² = Σvᵢ²
```
Bình phương vế phải:
```
‖v‖₁² = (Σ|vᵢ|)² = Σvᵢ² + 2·Σᵢ<ⱼ |vᵢ|·|vⱼ|
       ≥ Σvᵢ² = ‖v‖₂²
```
(Bước trên dùng: `(a+b+c)² = a² + b² + c² + 2(ab+bc+ca) ≥ a² + b² + c²` khi `a, b, c ≥ 0`.)

Hai vế đều ≥ 0, mở căn: `‖v‖₂ ≤ ‖v‖₁` ✓.

**Phần 3: `‖v‖₁ ≤ √n · ‖v‖₂`** — đây là **Cauchy-Schwarz** áp dụng cho vector `|v| = (|v₁|, ..., |vₙ|)` và `e = (1, 1, ..., 1)`:
```
|v|·e = |v₁|·1 + |v₂|·1 + ... + |vₙ|·1 = ‖v‖₁
|‖|v|·e‖ ≤ ‖|v|‖₂ · ‖e‖₂
‖v‖₁ ≤ ‖v‖₂ · √n   ✓
```
(Vì `‖|v|‖₂ = √(Σ|vᵢ|²) = √(Σvᵢ²) = ‖v‖₂` và `‖e‖₂ = √n`.)

**Phần 4: `√n · ‖v‖₂ ≤ n · ‖v‖_∞`**.

Ta có `‖v‖₂² = Σvᵢ² ≤ n · M² = n · ‖v‖_∞²` (vì mỗi `vᵢ² ≤ M²`). Mở căn:
```
‖v‖₂ ≤ √n · ‖v‖_∞
√n · ‖v‖₂ ≤ n · ‖v‖_∞   ✓
```

**Verify với `v = (1, 2, 3)`, n = 3**:
- `‖v‖_∞ = 3`, `‖v‖₂ = √14 ≈ 3.742`, `‖v‖₁ = 6`, `√n · ‖v‖₂ = √3·√14 = √42 ≈ 6.48`, `n · ‖v‖_∞ = 9`.
- Chuỗi: `3 ≤ 3.742 ≤ 6 ≤ 6.48 ≤ 9` ✓.

### Bài 5

`u, v` normalized. Khai triển bình phương:
```
‖u − v‖₂² = (u − v)·(u − v)
          = u·u − 2(u·v) + v·v
          = ‖u‖² − 2(u·v) + ‖v‖²
          = 1 − 2(u·v) + 1
          = 2 − 2(u·v)
          = 2(1 − cos θ)        (vì u·v = ‖u‖‖v‖cos θ = cos θ khi norm = 1)
```

**Hệ quả**: với vector đã normalize, **Euclidean distance bình phương = 2(1 − cosine similarity)**. Càng giống nhau (cos → 1) → distance → 0. Trực giao (cos = 0) → `‖u−v‖² = 2`. Ngược chiều (cos = −1) → `‖u−v‖² = 4`.

**Verify số**: `u = (1, 0)`, `v = (0, 1)` (cùng đã normalize). `u·v = 0`, `cos θ = 0`.
- `‖u − v‖₂² = ‖(1, −1)‖² = 2`.
- `2(1 − cos θ) = 2(1 − 0) = 2` ✓.

### Bài 6

Đường thẳng `x + 2y = 4`. Tham số hóa `y = (4 − x)/2`. Hai phương án:

**Phần a — Tối thiểu L1**.
`f(x) = |x| + |(4 − x)/2| = |x| + |4 − x|/2`.

Xét 3 vùng:
- `x ≤ 0`: `f = −x + (4 − x)/2 = (−2x + 4 − x)/2 = (4 − 3x)/2`. Đạo hàm = −3/2 < 0. Hàm giảm khi x tăng → tối thiểu tại `x = 0`, `f(0) = 0 + 2 = 2`.
- `0 ≤ x ≤ 4`: `f = x + (4 − x)/2 = (2x + 4 − x)/2 = (x + 4)/2`. Đạo hàm = 1/2 > 0. Hàm tăng → tối thiểu tại `x = 0`, `f = 2`.
- `x ≥ 4`: `f = x + (x − 4)/2 = (3x − 4)/2`. Đạo hàm > 0. Tối thiểu tại `x = 4`, `f = 4`.

Vậy `min f = 2` tại `x = 0`, `y = 2` → nghiệm L1: `(0, 2)`. **Một thành phần = 0 → sparse!**

**Phần b — Tối thiểu L2**.
`g(x) = x² + ((4 − x)/2)² = x² + (4 − x)²/4`.
Đạo hàm: `g'(x) = 2x + 2·(4 − x)·(−1)/4 = 2x − (4 − x)/2 = (4x − 4 + x)/2 = (5x − 4)/2`.
`g'(x) = 0 ⇔ x = 4/5 = 0.8`. → `y = (4 − 0.8)/2 = 1.6`.

Nghiệm L2: `(0.8, 1.6)`. **Cả 2 thành phần ≠ 0**.

**So sánh**:
| Loại | Nghiệm | Sparse? |
|------|--------|---------|
| L1 min | `(0, 2)` | Có (x = 0) |
| L2 min | `(0.8, 1.6)` | Không |

Đây chính là cơ chế **Lasso tạo sparse**: hình thoi L1 chạm đường ràng buộc tại đỉnh (trên trục) → 1 thành phần bị "ép" về 0.

---

## Liên kết

- **Bài trước**: [Lesson 02 — Dot product & cosine similarity](../lesson-02-dot-product/) — đã dùng Cauchy-Schwarz để chứng minh triangle inequality cho L2.
- **Bài tiếp**: [Lesson 04 — Linear independence, basis](../lesson-04-linear-independence/) — sẽ dùng norm để định nghĩa "khoảng cách giữa không gian con", projection.
- **Cross-tier**:
  - [Tầng 1 — Algebra Lesson 04](../../Algebra/lesson-04-powers-roots-logs/) — căn bậc 2, lũy thừa phân số (dùng cho Lₚ norm).
  - [Tầng 2 — Trigonometry](../../Trigonometry/) — vector unit `(cos θ, sin θ)`.
  - Sẽ gặp lại ở **Tầng 5 Probability**: vector phân phối xác suất chuẩn hóa L1 = 1.
  - Sẽ gặp lại ở **Tầng 6 AI/ML**: MSE loss, L1/L2 regularization, embedding normalize cho cosine similarity, vector database.
- **Visualization**: [`visualization.html`](./visualization.html) — 4 component tương tác.
