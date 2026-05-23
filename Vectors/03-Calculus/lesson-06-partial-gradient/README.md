# Lesson 06 — Đạo hàm riêng (Partial Derivative) và Gradient

> "Đạo hàm 1 biến cho ta slope của đường cong. Đạo hàm riêng cho ta slope của một MẶT khi cắt mặt đó bằng một plane. Gradient gom các slope đó thành một VECTOR — và vector này chỉ chính xác hướng mà hàm tăng nhanh nhất. Đây là viên gạch nền móng của mọi thuật toán học máy hiện đại."

---

## 1. Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **hàm nhiều biến** `f(x, y)`, `f(x, y, z)`, ..., `f(x₁, ..., xₙ)` — đồ thị là một MẶT hoặc một vật trừu tượng trong không gian cao chiều.
- Tính được **đạo hàm riêng** `∂f/∂x`, `∂f/∂y` của một hàm 2-3 biến bất kỳ — coi các biến còn lại như HẰNG SỐ, áp dụng các quy tắc đã học (power, product, chain) từ Lesson 03-04.
- Hiểu **gradient** `∇f = (∂f/∂x, ∂f/∂y, ...)` là một vector — và 3 tính chất then chốt: chỉ hướng tăng nhanh nhất, vuông góc với đường mức, độ lớn = tốc độ thay đổi cực đại.
- Áp dụng **chain rule nhiều biến** khi các biến của f phụ thuộc thêm vào một tham số khác (`x = x(t), y = y(t) → dz/dt`).
- Tính **đạo hàm hướng** `D_û f = ∇f · û` (dot product với vector đơn vị), thấy được vì sao gradient là hướng max.
- Biết về **Hessian** — ma trận đạo hàm cấp 2 — và định lý Schwarz `f_xy = f_yx`.
- Hiểu LIÊN HỆ trực tiếp với học máy: loss function `L(W₁, b₁, W₂, b₂, ...)` của một mạng nơ-ron là hàm hàng triệu biến; backpropagation chính là thuật toán tính `∇L`; gradient descent cập nhật tham số theo `-∇L`.

### Kiến thức tiền đề

- [Lesson 02 — Đạo hàm](../lesson-02-derivatives/) — định nghĩa giới hạn của đạo hàm 1 biến, slope của tiếp tuyến.
- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — power, sum, product, quotient rule.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — `(f(g(x)))' = f'(g(x))·g'(x)`. **Cực kỳ quan trọng** cho bài này vì đạo hàm riêng của hàm hợp xuất hiện khắp nơi.
- [Lesson 05 — Tối ưu hóa 1 biến](../lesson-05-optimization-1d/) — `f'(x) = 0` ở cực trị. Bài này tổng quát hóa lên `∇f = 0`.
- (Khuyến nghị) Vectors/Algebra — vector, dot product. Gradient là một vector và đạo hàm hướng là một dot product.

---

## 2. Trực giác hàm nhiều biến

Cho đến Lesson 05, mọi hàm đều có dạng `y = f(x)` — một biến đầu vào, một biến đầu ra, đồ thị là đường cong trên mặt phẳng `(x, y)`. Thực tế gần như mọi bài toán đều **nhiều biến**:

- Lương dự đoán của một người = `f(số_năm_kinh_nghiệm, mức_độ_học_vấn, thành_phố)` — 3 biến đầu vào.
- Doanh thu một cửa hàng = `f(giá_bán, chi_phí_quảng_cáo, mùa)` — 3 biến.
- Loss của một mạng nơ-ron đơn giản = `L(W₁, b₁, W₂, b₂)` — 4 ma trận/vector biến (mỗi cái nhiều phần tử).
- Loss của GPT-3 = `L(θ)` với θ ∈ ℝ¹⁷⁵·¹⁰⁹ — 175 tỉ biến.

### 2.1. Ví dụ 1 — Hàm `f(x, y) = x² + y²` (bát úp ngược, hay đúng hơn — bát)

Với mỗi cặp `(x, y)` ta tính một số `z = x² + y²`. Vẽ điểm `(x, y, z)` trong không gian 3D thì được một MẶT (surface):

```
                 z
                 │     ___,---'''---,___
                 │  ,-'                 '-,
                 │,'                       ',
                 ┼─────────────────────────────►  x
                /│
               / │
              y  │
                 ▼
```

Hình dạng: như một cái **bát** mở miệng lên. Tại `(0, 0)` đáy bát, `z = 0`. Càng xa gốc theo bất kỳ hướng nào, `z` càng lớn.

Để **nhìn 2D**, ta cắt mặt bằng các plane ngang `z = const`:

- `z = 1`: `x² + y² = 1` — đường tròn bán kính 1.
- `z = 4`: `x² + y² = 4` — đường tròn bán kính 2.
- `z = 9`: `x² + y² = 9` — đường tròn bán kính 3.

Các đường này gọi là **đường mức (contour / level curve)** — giống đường đồng mức trên bản đồ địa hình. Bản đồ 2D với contour cho ta hình dung mặt 3D mà không cần vẽ 3D:

```
y
3│     . . . . .
2│  ,-'         '-,
1│ /     ___       \    contour z=1 (vòng tròn nhỏ nhất)
0├─┤ ( · ) ├─┼──►x       contour z=4 (vòng giữa)
-1│ \   '''       /     contour z=9 (vòng ngoài)
-2│  '-,         ,-'
-3│     ' ' ' ' '
```

> **💡 Trực giác:** Đồ thị `f(x, y) = x² + y²` là một địa hình hình bát. Tại đáy `(0,0)` cao độ 0, càng đi ra càng lên cao. Đường mức = đường đồng mức bản đồ.

### 2.2. Ví dụ 2 — Hàm `f(x, y) = sin(x)·cos(y)` (sóng 2 chiều)

Đây là một mặt **lượn sóng**, có đỉnh và hố xen kẽ giống lưới trứng:

```
peak  hố   peak  hố
  ⌒    ⌣    ⌒    ⌣
  ⌣    ⌒    ⌣    ⌒
peak  hố   peak  hố
```

- Tại `(π/2, 0)`: `sin(π/2)·cos(0) = 1·1 = 1` → đỉnh.
- Tại `(π/2, π)`: `sin(π/2)·cos(π) = 1·(-1) = -1` → hố.
- Tại `(0, 0)`: `sin(0)·cos(0) = 0` → điểm yên ngựa (saddle) hoặc trên đường mức 0.

### 2.3. Ví dụ 3 — Hàm `f(x, y) = xy` (mặt yên ngựa)

Tại `(0, 0)`: f = 0. Đi theo trục x dương + y dương → f > 0. Đi theo x dương + y âm → f < 0. Mặt này có hình **yên ngựa** (saddle): ngồi lên thì 2 chân (theo trục x+y và x-y) đi xuống, còn 2 hướng vuông góc đi lên.

### 2.4. Tổng quát n biến

Khi `n = 1`: đồ thị là đường cong trong `ℝ²`.
Khi `n = 2`: đồ thị là mặt trong `ℝ³`.
Khi `n = 3`: đồ thị là một "siêu mặt" trong `ℝ⁴` — không hình dung trực quan được, nhưng toán học và đại số học vẫn xử lý được giống y như 2 biến.
Khi `n` lớn (như 175 tỉ tham số của GPT-3): hoàn toàn trừu tượng — chỉ thao tác qua công thức, không có hình. Nhưng các tính chất chính (đạo hàm riêng, gradient, ...) **giống y hệt**.

> **❓ Câu hỏi tự nhiên:** "Nếu không vẽ được, làm sao biết đang đi đúng hướng?"
> Trả lời: Chính là vai trò của gradient. Gradient là một CON SỐ (đúng hơn, một vector) mà ta tính được bằng công thức — nó nói cho ta hướng đi mà không cần "nhìn". Như khi đi trong sương mù trên đồi: nhìn dưới chân thấy độ dốc theo từng hướng, chọn hướng dốc nhất để xuống — không cần thấy đỉnh đồi hay đường chân trời.

---

## 3. Đạo hàm riêng (Partial Derivative)

### 3.1. Ý tưởng

Hàm `f(x, y)` có HAI hướng đi từ một điểm `(a, b)`: theo trục x, hoặc theo trục y. Mỗi hướng cho một tốc độ thay đổi khác nhau.

> **💡 Analogy đời sống:** Bạn đang đứng trên một sườn đồi. Nếu bước về phía Đông (trục x), độ dốc là 0.3 (dốc nhẹ). Nếu bước về phía Bắc (trục y), độ dốc là -0.5 (đi xuống). Hai con số này = **đạo hàm riêng** theo từng trục.

### 3.2. Định nghĩa hình thức

```
∂f/∂x (a, b) = lim_{h→0} [ f(a+h, b) - f(a, b) ] / h
∂f/∂y (a, b) = lim_{h→0} [ f(a, b+h) - f(a, b) ] / h
```

Lưu ý KHÁC BIỆT với đạo hàm 1 biến: chỉ có biến `x` thay đổi (`a+h`), biến `y = b` giữ NGUYÊN. Tương tự với `∂f/∂y`: `x = a` cố định.

### 3.3. Quy tắc tính thực hành: "coi biến kia như HẰNG SỐ"

Đây là kỹ thuật chủ đạo. Để tính `∂f/∂x`:
1. Coi `y` như một hằng số (như số 3, số 7, ...).
2. Tính đạo hàm thường theo `x` bằng các quy tắc Lesson 03 (power, product, chain).

Cụ thể:

```
f(x, y) = x² · y³
         (biến) (hằng số c)
∂f/∂x = 2x · c = 2x · y³        ← áp dụng (x²)' = 2x; nhân với hằng số c=y³
```

Để tính `∂f/∂y`: ngược lại — coi `x` như hằng số `c`:

```
f(x, y) = x² · y³
        (hằng số c)(biến)
∂f/∂y = c · 3y² = x² · 3y² = 3x²y²
```

### 3.4. Notation (ký hiệu)

Nhiều cách viết, tất cả đều chỉ cùng một thứ:

| Ký hiệu | Đọc |
|---------|-----|
| `∂f/∂x` | "đạo hàm riêng của f theo x" — chuẩn nhất |
| `f_x` | "f sub x" — ngắn gọn |
| `∂_x f` | "del x của f" — phong cách vật lý |
| `D_x f` | "D theo x" — phong cách Bourbaki/Pháp |
| `∂f/∂x \|_(a,b)` hoặc `f_x(a, b)` | giá trị cụ thể tại điểm (a,b) |

Ký hiệu `∂` đọc là "del" hoặc "partial". KHÔNG phải `d`. Khác với đạo hàm thường `df/dx` (dùng `d`), đạo hàm riêng dùng `∂` để nhấn mạnh "có nhiều biến, chỉ lấy đạo hàm theo MỘT biến".

> **⚠ Lỗi thường gặp #1:** Viết `df/dx` thay vì `∂f/∂x` cho hàm nhiều biến. Sai vì với hàm nhiều biến, `df` (vi phân toàn phần) phải gộp tất cả thay đổi của các biến, không chỉ x. Phải dùng `∂`.

> **⚠ Lỗi thường gặp #2:** Quên rằng "biến kia là hằng số". Ví dụ tính `∂/∂x (x²y)`: nhiều bạn viết `2x + x²·dy/dx = 2x` (bỏ x²) — sai. Đúng phải là `2x · y` vì y chỉ là hằng số `c`, không bị đạo hàm.

---

## 4. Walk-through tính đạo hàm riêng (≥5 ví dụ)

### Ví dụ 4.1 — `f(x, y) = x² + 3xy + y²`

**Tính `∂f/∂x`** (coi y là hằng):
- `∂/∂x (x²)` = `2x`.
- `∂/∂x (3xy)` = `3y` (vì `3x·y` có dạng `c·x` với `c = 3y`).
- `∂/∂x (y²)` = `0` (hằng số).

Cộng lại: `∂f/∂x = 2x + 3y`.

**Tính `∂f/∂y`** (coi x là hằng):
- `∂/∂y (x²)` = `0`.
- `∂/∂y (3xy)` = `3x` (vì `3y·x` có dạng `c·y` với `c = 3x`).
- `∂/∂y (y²)` = `2y`.

Cộng lại: `∂f/∂y = 3x + 2y`.

**Kiểm tra bằng số tại `(1, 2)`**: `f(1, 2) = 1 + 6 + 4 = 11`. Thử thay đổi nhỏ:
- `f(1.01, 2) - f(1, 2) = (1.0201 + 6.06 + 4) - 11 = 11.0801 - 11 = 0.0801`. Tốc độ ≈ `0.0801/0.01 = 8.01`. So với công thức `∂f/∂x|_(1,2) = 2·1 + 3·2 = 8`. ✓
- `f(1, 2.01) - f(1, 2) = (1 + 3.03 + 4.0401) - 11 = 8.0701`. Wait — verify: `f(1, 2.01) = 1 + 3·1·2.01 + 2.01² = 1 + 6.03 + 4.0401 = 11.0701`. Tốc độ ≈ `0.0701/0.01 = 7.01`. So với `∂f/∂y|_(1,2) = 3·1 + 2·2 = 7`. ✓

### Ví dụ 4.2 — `f(x, y) = sin(xy)`

Đây là hàm hợp `sin(u)` với `u = xy`. Dùng chain rule (Lesson 04): `∂/∂x sin(u) = cos(u) · ∂u/∂x`.

**Tính `∂f/∂x`**:
- `u = xy`, coi y là hằng → `∂u/∂x = y`.
- `∂f/∂x = cos(xy) · y = y·cos(xy)`.

**Tính `∂f/∂y`**:
- Coi x là hằng → `∂u/∂y = x`.
- `∂f/∂y = cos(xy) · x = x·cos(xy)`.

**Kiểm tra tại `(π/2, 1)`**: `f = sin(π/2 · 1) = 1`. `∂f/∂x = 1·cos(π/2) = 0`. Tức là tại điểm này, di chuyển theo trục x, hàm KHÔNG đổi (đỉnh đồi theo trục x). Hợp lý vì `sin` đạt đỉnh tại `π/2`.

### Ví dụ 4.3 — `f(x, y) = e^(x + y²)`

Hàm hợp `e^u` với `u = x + y²`.

**Tính `∂f/∂x`**:
- `∂u/∂x = 1` (y² là hằng).
- `∂f/∂x = e^u · 1 = e^(x + y²)`.

**Tính `∂f/∂y`**:
- `∂u/∂y = 2y` (x là hằng).
- `∂f/∂y = e^u · 2y = 2y · e^(x + y²)`.

**Tại `(0, 1)`**: `f = e^(0 + 1) = e ≈ 2.718`. `∂f/∂x = e ≈ 2.718`. `∂f/∂y = 2·1·e = 2e ≈ 5.437`. Tốc độ tăng theo y nhanh gấp đôi theo x tại điểm này.

### Ví dụ 4.4 — `f(x, y, z) = x²y + y²z + z²x` (3 biến)

3 đạo hàm riêng:

**`∂f/∂x`** (coi y, z hằng):
- `∂/∂x (x²y) = 2xy` (y là hệ số).
- `∂/∂x (y²z) = 0` (không chứa x).
- `∂/∂x (z²x) = z²` (z² là hệ số).
- ⟹ `∂f/∂x = 2xy + z²`.

**`∂f/∂y`** (coi x, z hằng):
- `∂/∂y (x²y) = x²`.
- `∂/∂y (y²z) = 2yz`.
- `∂/∂y (z²x) = 0`.
- ⟹ `∂f/∂y = x² + 2yz`.

**`∂f/∂z`** (coi x, y hằng):
- `∂/∂z (x²y) = 0`.
- `∂/∂z (y²z) = y²`.
- `∂/∂z (z²x) = 2zx`.
- ⟹ `∂f/∂z = y² + 2zx`.

**Tại `(1, 1, 1)`**: `f = 1 + 1 + 1 = 3`. `∂f/∂x = 2 + 1 = 3`. `∂f/∂y = 1 + 2 = 3`. `∂f/∂z = 1 + 2 = 3`. Đối xứng — hợp lý vì f đối xứng vòng tròn `x → y → z → x`.

### Ví dụ 4.5 — `f(x₁, x₂, x₃) = (x₁ + 2x₂ + 3x₃)²` (preview NN)

Đây là dạng mà ta sẽ gặp lại liên tục trong neural network: một **weighted sum** rồi bình phương (như loss MSE đơn giản hóa).

Đặt `u = x₁ + 2x₂ + 3x₃`. Thì `f = u²`. Áp chain rule: `∂f/∂xᵢ = 2u · ∂u/∂xᵢ`.

- `∂u/∂x₁ = 1` → `∂f/∂x₁ = 2u · 1 = 2(x₁ + 2x₂ + 3x₃)`.
- `∂u/∂x₂ = 2` → `∂f/∂x₂ = 2u · 2 = 4(x₁ + 2x₂ + 3x₃)`.
- `∂u/∂x₃ = 3` → `∂f/∂x₃ = 2u · 3 = 6(x₁ + 2x₂ + 3x₃)`.

**Tại `(1, 1, 1)`**: `u = 1 + 2 + 3 = 6`, `f = 36`. Đạo hàm: `(12, 24, 36)`. Trọng số nào lớn hơn → đạo hàm riêng theo biến đó cũng lớn hơn — điều này QUAN TRỌNG trong backprop: đầu vào nào "nặng ký" hơn thì tham số đó cập nhật mạnh hơn.

> **🔁 Dừng lại tự kiểm tra 4:**
> 1. Tính `∂f/∂x` của `f(x, y) = x³ + 2xy + y³`.
> 2. Tính `∂f/∂y` của `f(x, y) = ln(x² + y²)`.
> 3. Tính cả 2 đạo hàm riêng của `f(x, y) = x · e^y + y · e^x`.
>
> <details><summary>Đáp án</summary>
>
> 1. `3x² + 2y`.
> 2. `∂/∂y ln(u) = (1/u)·∂u/∂y` với `u = x² + y²`. `∂u/∂y = 2y`. Vậy `∂f/∂y = 2y/(x² + y²)`.
> 3. `∂f/∂x = e^y + y·e^x`. `∂f/∂y = x·e^y + e^x`.
> </details>

---

## 5. Trực giác hình học của đạo hàm riêng

Tại điểm `(a, b)` trên mặt `z = f(x, y)`:

- **`∂f/∂x (a, b)`** = slope của đường cong thu được khi cắt mặt bằng plane `y = b` (plane vuông góc với trục y), nhìn theo trục x. Tức là "giữ y cố định, slope theo x".
- **`∂f/∂y (a, b)`** = slope của đường cong thu được khi cắt mặt bằng plane `x = a`, nhìn theo trục y.

Mỗi đạo hàm riêng = slope của **một slice** của mặt 3D.

```
   z                      Cắt bằng plane y = b:
   │      mặt 3D           Thu được đường cong z = f(x, b)
   │     /                  ↓ slope của đường này tại x=a
   │    /     plane y=b    = ∂f/∂x (a, b)
   │   ─────────
   │        \
   │         \
   ┼──(a,b)──────── x
  /
 / y
```

### 5.1. Ví dụ cụ thể: `f(x, y) = x² + y²` tại `(2, 3)`

- Cắt bằng plane `y = 3`: đường cong là `z = x² + 9`. Đây là parabol theo x. Slope tại `x = 2` là `2·2 = 4`. ⟹ `∂f/∂x(2, 3) = 4`. Khớp với công thức `∂f/∂x = 2x = 4` ✓.
- Cắt bằng plane `x = 2`: đường cong là `z = 4 + y²`. Slope tại `y = 3` là `2·3 = 6`. ⟹ `∂f/∂y(2, 3) = 6`. Khớp ✓.

> **💡 Trực giác:** Đạo hàm riêng là "slope nếu chỉ đi theo trục đó". Đứng tại `(2, 3, 13)` trên bát `z = x²+y²`, bước về phía Đông (x++) → dốc 4. Bước về phía Bắc (y++) → dốc 6. Bắc dốc hơn → leo nhanh hơn theo y.

---

## 6. Gradient — Vector của đạo hàm riêng

### 6.1. Định nghĩa

Gradient của hàm `f(x, y)` tại điểm `(a, b)` là **vector** gom các đạo hàm riêng lại:

```
∇f(a, b) = ( ∂f/∂x (a, b) , ∂f/∂y (a, b) )
```

Tổng quát n biến `f(x₁, x₂, ..., xₙ)`:

```
∇f = ( ∂f/∂x₁ , ∂f/∂x₂ , ... , ∂f/∂xₙ )
```

Đây là một vector trong không gian `ℝⁿ` — cùng số chiều với KHÔNG GIAN ĐẦU VÀO, KHÔNG phải với đồ thị.

### 6.2. Ký hiệu `∇`

Ký hiệu `∇` đọc là **"nabla"** hoặc **"del"**. Hình dạng tam giác ngược ∇. Nhiều cách viết tương đương:

- `∇f` — phổ biến nhất.
- `grad f` — viết tắt "gradient".
- `(∂f/∂x, ∂f/∂y)` — viết khai triển.
- Trong machine learning: `∇_θ L` — "gradient của loss theo tham số θ".

> **⚠ Lỗi thường gặp:** Nhầm `∇f` là một số scalar. KHÔNG. `∇f` là một VECTOR — có nhiều thành phần, mỗi thành phần là một đạo hàm riêng.

### 6.3. Ví dụ tính gradient nhanh

| Hàm | ∇f |
|-----|----|
| `f(x, y) = x² + y²` | `(2x, 2y)` |
| `f(x, y) = xy` | `(y, x)` |
| `f(x, y) = 3x + 4y` | `(3, 4)` — hằng số |
| `f(x, y) = sin(x)·cos(y)` | `(cos(x)·cos(y), -sin(x)·sin(y))` |
| `f(x, y, z) = xyz` | `(yz, xz, xy)` |

---

## 7. Ba tính chất then chốt của gradient

Đây là phần **quan trọng nhất** của lesson. Mọi thuật toán học máy đều dựa vào 3 tính chất sau.

### 7.1. Tính chất 1 — Gradient chỉ hướng tăng nhanh nhất

**Tuyên bố:** Tại điểm P, vector `∇f(P)` chỉ ra phía mà `f` tăng giá trị NHANH NHẤT. Ngược lại, `-∇f(P)` chỉ hướng `f` giảm nhanh nhất.

**Ví dụ trực quan:** Trên bát `z = x² + y²` tại điểm `(1, 0)`:
- `∇f(1, 0) = (2, 0)` — vector chỉ thẳng theo trục x dương.
- Đi theo hướng `(2, 0)` (về phía Đông) → z tăng. Đi ngược `(-2, 0)` (về phía Tây) → z giảm về 0.
- Hợp lý vì `(1, 0)` ở sườn Đông của bát, leo Đông là leo lên thành bát.

**Tại `(0, 1)`**: `∇f = (0, 2)` — chỉ thẳng Bắc. Cũng là leo lên thành bát.

**Tại đáy `(0, 0)`**: `∇f = (0, 0)` — vector NULL. Tức là không có hướng tăng — vì đây là CỰC TIỂU, mọi hướng đều đi lên (hoặc đứng yên theo tiếp tuyến). Khi gradient = 0, ta đang ở một **điểm dừng (stationary point)** — có thể là cực trị hoặc saddle.

**Vì sao là "nhanh nhất"?** Sẽ chứng minh ở mục 9 (đạo hàm hướng + Cauchy-Schwarz). Tạm chấp nhận và tin.

### 7.2. Tính chất 2 — Gradient vuông góc với đường mức

**Tuyên bố:** Nếu vẽ các đường mức `f = c` (các giá trị c khác nhau), thì tại mỗi điểm P trên đường mức, vector `∇f(P)` luôn **vuông góc** với đường mức tại P.

**Vì sao?** Trực giác: trên đường mức, f không đổi (theo định nghĩa). Đi DỌC đường mức thì tốc độ thay đổi của f bằng 0. Nhưng đạo hàm hướng theo hướng dọc đó = `∇f · û = 0` (với û là tiếp tuyến của đường mức). Dot product = 0 ⟹ `∇f ⊥ û` ⟹ gradient vuông góc tiếp tuyến của đường mức ⟹ vuông góc với đường mức.

**Ví dụ:** `f(x, y) = x² + y²`, đường mức `f = 1` là vòng tròn bán kính 1. Tại điểm `(1, 0)` trên vòng tròn, tiếp tuyến là hướng `(0, 1)` (chiều Bắc). Gradient `∇f(1, 0) = (2, 0)` — chỉ chiều Đông. Đông ⊥ Bắc ✓.

```
 y
 │      ___
 │   ,-'   '-,
 │  /  f=1   \
 │ |     →    |   ← gradient (2,0) tại (1,0)
 │  \         /
 │   '-,___,-'
 │
 ┼─────────────► x
```

### 7.3. Tính chất 3 — Độ lớn `|∇f|` là tốc độ thay đổi cực đại

`|∇f(P)|` (độ dài Euclidean của vector gradient) = tốc độ tăng theo hướng nhanh nhất.

**Ví dụ:** `f(x, y) = x² + y²` tại `(3, 4)`:
- `∇f = (6, 8)`.
- `|∇f| = √(36 + 64) = √100 = 10`.

Tức là theo hướng `(6, 8)` (chuẩn hóa lại thành unit vector `(0.6, 0.8)`), f tăng với tốc độ 10 đơn vị f trên 1 đơn vị di chuyển.

Theo hướng khác (không phải hướng gradient), tốc độ sẽ nhỏ hơn 10. Đặc biệt theo hướng vuông góc gradient (dọc đường mức), tốc độ = 0.

> **❓ Câu hỏi tự nhiên:** "Tại sao không chuẩn hóa gradient luôn thành vector đơn vị?"
> Trả lời: Vì độ lớn `|∇f|` mang thông tin hữu ích — nó nói cho ta biết tại điểm này hàm dốc thế nào. Ở chỗ dốc (gần thành bát) `|∇f|` lớn; ở chỗ phẳng (gần đáy) `|∇f|` nhỏ. Trong gradient descent, ta dùng cả hướng VÀ độ lớn để quyết định bước cập nhật (Lesson 07).

---

## 8. Walk-through tính gradient (≥4 ví dụ)

### Ví dụ 8.1 — `f(x, y) = x² + y²` tại `(1, 2)`

- `∂f/∂x = 2x`, `∂f/∂y = 2y`.
- `∇f(1, 2) = (2, 4)`.
- `|∇f| = √(4 + 16) = √20 ≈ 4.47`.
- Hướng tăng nhanh nhất: vector `(2, 4)` — chỉ về Đông-Bắc với góc `arctan(4/2) = arctan(2) ≈ 63.4°` trên trục x.

**Vẽ contour ASCII xung quanh `(1, 2)`:**

```
 y
4│                  f=20
3│      f=16
2│   . . • . . . .   ← điểm (1,2), f=5
1│      f=4
0├──────────────► x
   0  1  2  3
```

Tại `(1, 2)`, gradient `(2, 4)` chỉ hướng ra ngoài (về phía contour có f lớn hơn), vuông góc với contour `f=5` đi qua.

### Ví dụ 8.2 — `f(x, y) = xy` tại `(3, 4)`

- `∂f/∂x = y`, `∂f/∂y = x`.
- `∇f(3, 4) = (4, 3)`.
- `|∇f| = √(16 + 9) = √25 = 5`.

Điểm `(3, 4)` có `f = 12`. Đường mức `f = 12` là hyperbol `xy = 12`. Gradient `(4, 3)` vuông góc với hyperbol tại điểm này.

### Ví dụ 8.3 — `f(x, y) = e^(xy)` tại `(0, 5)`

- `u = xy`, `f = e^u`.
- `∂f/∂x = e^u · y = y·e^(xy)`.
- `∂f/∂y = e^u · x = x·e^(xy)`.
- Tại `(0, 5)`: `e^0 = 1`. `∇f = (5·1, 0·1) = (5, 0)`.
- `|∇f| = 5`. Gradient chỉ thẳng Đông.

Trực giác: tại `(0, 5)`, di chuyển theo y không đổi f (vì f = e^(0·y) = 1, không phụ thuộc y khi x=0). Mọi tăng trưởng đều theo x → gradient chỉ theo x.

### Ví dụ 8.4 — `f(x, y) = ln(x² + y²)` tại `(1, 1)`

- `u = x² + y²`, `f = ln(u)`.
- `∂f/∂x = (1/u)·2x = 2x/(x² + y²)`.
- `∂f/∂y = 2y/(x² + y²)`.
- Tại `(1, 1)`: `u = 2`. `∇f = (2/2, 2/2) = (1, 1)`.
- `|∇f| = √2`. Gradient chỉ về Đông-Bắc đúng 45°.

### Ví dụ 8.5 — Hàm 4 biến `f(w₁, w₂, w₃, w₄) = w₁² + 2w₂² + 3w₃² + 4w₄²` tại `(1, 1, 1, 1)`

- `∂f/∂w₁ = 2w₁`, `∂f/∂w₂ = 4w₂`, `∂f/∂w₃ = 6w₃`, `∂f/∂w₄ = 8w₄`.
- `∇f(1,1,1,1) = (2, 4, 6, 8)`.
- `|∇f| = √(4+16+36+64) = √120 ≈ 10.95`.

Đây là dạng "loss" đơn giản hóa của neural network: muốn `w` về 0 (cực tiểu là `(0,0,0,0)`). Hướng đi xuống nhanh nhất là `-∇f = (-2, -4, -6, -8)`. Tham số `w₄` "dốc" nhất (đạo hàm riêng = 8), nên sẽ cập nhật mạnh nhất.

---

## 9. Đạo hàm hướng (Directional Derivative)

### 9.1. Định nghĩa

Cho `f(x, y)` và một vector đơn vị `û = (u₁, u₂)` (với `|û| = 1`). **Đạo hàm hướng** của f theo hướng û tại điểm P là:

```
D_û f (P) = lim_{h→0} [ f(P + h·û) - f(P) ] / h
```

Tức là tốc độ thay đổi của f khi di chuyển theo hướng û từ P.

### 9.2. Công thức quan trọng

```
D_û f = ∇f · û   (dot product)
```

Chứng minh nhanh: di chuyển `P + h·û = (a + h·u₁, b + h·u₂)`. Áp dụng định nghĩa đạo hàm riêng cho hàm `g(h) = f(a + h·u₁, b + h·u₂)`:

```
g'(0) = ∂f/∂x · u₁ + ∂f/∂y · u₂ = (∂f/∂x, ∂f/∂y) · (u₁, u₂) = ∇f · û
```

(Bước này dùng chain rule nhiều biến — sẽ trở lại ở mục 10.)

### 9.3. Vì sao gradient là hướng tăng nhanh nhất — chứng minh

Với mọi hướng đơn vị û, theo công thức dot product:

```
D_û f = ∇f · û = |∇f| · |û| · cos(θ) = |∇f| · cos(θ)
```

trong đó θ là góc giữa û và ∇f.

`cos(θ)` đạt max = 1 khi θ = 0, tức là û cùng hướng với ∇f. Khi đó:

```
D_û f = |∇f|   (max)
```

Vậy:
- Hướng tăng nhanh nhất = hướng của ∇f.
- Tốc độ tăng cực đại = |∇f|.
- Hướng giảm nhanh nhất = -∇f (góc θ = π, cos = -1, D_û f = -|∇f|).
- Hướng vuông góc (θ = π/2): `D_û f = 0` — không thay đổi → đó là tiếp tuyến của đường mức.

**Đây là lý do toàn bộ ngành tối ưu hóa và machine learning dùng gradient!**

> **💡 Trực giác:** Gradient không chỉ là "vector của đạo hàm riêng" một cách máy móc. Nó CHỦ ĐỘNG nói cho ta hướng tốt nhất để leo lên. Đảo dấu = hướng xuống nhanh nhất → cốt lõi của gradient descent.

### 9.4. Ví dụ tính

`f(x, y) = x² + y²` tại `(1, 2)`. `∇f = (2, 4)`, `|∇f| = √20`.

Tính đạo hàm hướng theo các hướng khác nhau:

- **Hướng `û = (1, 0)`** (Đông): `D_û f = (2,4)·(1,0) = 2`.
- **Hướng `û = (0, 1)`** (Bắc): `D_û f = (2,4)·(0,1) = 4`.
- **Hướng `û = (1/√2, 1/√2)`** (Đông-Bắc 45°): `D_û f = 2/√2 + 4/√2 = 6/√2 ≈ 4.24`.
- **Hướng gradient chuẩn hóa `û = (2/√20, 4/√20) = (1/√5, 2/√5)`**: `D_û f = 2/√5 + 8/√5 = 10/√5 = √20 ≈ 4.47`. → đúng `|∇f|` ✓.
- **Hướng vuông góc gradient `û = (-4/√20, 2/√20)`**: `D_û f = -8/√20 + 8/√20 = 0` → đúng (tiếp tuyến đường mức) ✓.

> **🔁 Dừng lại tự kiểm tra 9:**
> 1. Cho `f(x, y) = 3x + 4y`. Gradient là gì? `|∇f|` bằng bao nhiêu? Đạo hàm hướng theo `û = (1, 0)` bằng bao nhiêu?
> 2. Tại sao theo hướng vuông góc với gradient, hàm không thay đổi?
>
> <details><summary>Đáp án</summary>
>
> 1. `∇f = (3, 4)`, `|∇f| = 5`. `D_{(1,0)} f = 3`. (Vì f tuyến tính, gradient không phụ thuộc điểm.)
> 2. Vì `cos(π/2) = 0` ⟹ `D_û f = |∇f|·0 = 0`. Hình học: đó là tiếp tuyến với đường mức, mà trên đường mức f không đổi.
> </details>

---

## 10. Chain rule nhiều biến

### 10.1. Quy tắc

Nếu `z = f(x, y)` và x, y lại phụ thuộc một biến khác `t`: `x = x(t), y = y(t)`. Thì z gián tiếp phụ thuộc t. Tốc độ thay đổi của z theo t là:

```
dz/dt = ∂f/∂x · dx/dt + ∂f/∂y · dy/dt
```

(Lưu ý: trong vế trái dùng `dz/dt` vì z chỉ phụ thuộc 1 biến t qua các trung gian. Trong vế phải `∂f/∂x` dùng `∂` vì f vốn hai biến; `dx/dt` dùng `d` vì x chỉ phụ thuộc t.)

**Liên hệ Lesson 04:** Chain rule 1 biến `(f(g(x)))' = f'(g(x))·g'(x)` là TRƯỜNG HỢP RIÊNG khi chỉ có một đường trung gian. Ở đây có HAI đường trung gian (qua x, qua y), nên CỘNG hai contribution.

### 10.2. Ví dụ

Cho `z = x² + y²` với `x(t) = cos(t), y(t) = sin(t)` (chuyển động tròn).

- `∂f/∂x = 2x = 2cos(t)`, `∂f/∂y = 2y = 2sin(t)`.
- `dx/dt = -sin(t)`, `dy/dt = cos(t)`.
- `dz/dt = 2cos(t)·(-sin(t)) + 2sin(t)·cos(t) = -2sin(t)cos(t) + 2sin(t)cos(t) = 0`.

Hợp lý: vì `cos²(t) + sin²(t) = 1` luôn, nên `z = 1` không đổi, đạo hàm phải bằng 0 ✓.

### 10.3. Tổng quát cho n biến

Nếu `z = f(x₁, x₂, ..., xₙ)` và `xᵢ = xᵢ(t)`:

```
dz/dt = Σᵢ ∂f/∂xᵢ · dxᵢ/dt = ∇f · (dx/dt)
```

— dot product giữa gradient và vector vận tốc.

### 10.4. Trường hợp nhiều biến phụ → nhiều biến đầu vào

Nếu `z = f(x, y)`, `x = x(s, t), y = y(s, t)` (mỗi biến trung gian phụ thuộc 2 tham số):

```
∂z/∂s = ∂f/∂x · ∂x/∂s + ∂f/∂y · ∂y/∂s
∂z/∂t = ∂f/∂x · ∂x/∂t + ∂f/∂y · ∂y/∂t
```

Đây chính là CƠ SỞ TOÁN HỌC CỦA BACKPROPAGATION: gradient của loss theo tham số sâu trong mạng = tích lũy gradient qua từng layer trung gian, mỗi layer là một composition mới.

---

## 11. Đạo hàm cấp 2 và Hessian

### 11.1. Đạo hàm riêng cấp 2

Từ `∂f/∂x` (hàm của x, y), lại có thể lấy đạo hàm riêng nữa:

- `∂²f/∂x²` = lấy `∂/∂x` của `∂f/∂x`. Còn viết `f_xx`.
- `∂²f/∂y²` = lấy `∂/∂y` của `∂f/∂y`. Viết `f_yy`.
- `∂²f/∂y∂x` = lấy `∂/∂y` của `∂f/∂x`. Viết `f_xy` (đọc từ phải qua trái theo notation `∂y∂x`).
- `∂²f/∂x∂y` = lấy `∂/∂x` của `∂f/∂y`. Viết `f_yx`.

### 11.2. Định lý Schwarz (Clairaut)

**Nếu f đủ trơn (các đạo hàm riêng cấp 2 liên tục) thì:**

```
f_xy = f_yx     (thứ tự đạo hàm không quan trọng)
```

**Ví dụ verify:** `f(x, y) = x³y²`.
- `f_x = 3x²y²`. `f_xy = ∂/∂y (3x²y²) = 6x²y`.
- `f_y = 2x³y`. `f_yx = ∂/∂x (2x³y) = 6x²y`. ✓ Bằng nhau.

### 11.3. Ma trận Hessian

Gom đạo hàm cấp 2 thành ma trận:

```
H(f) = [ f_xx   f_xy ]
       [ f_yx   f_yy ]
```

Theo Schwarz, H đối xứng. Hessian tổng quát n biến là ma trận `n × n`.

### 11.4. Vai trò của Hessian

Trong tối ưu hóa nhiều chiều, Hessian đóng vai trò của "đạo hàm cấp 2" trong test cực trị (Lesson 05):

- **Cực tiểu:** Hessian xác định dương (tất cả eigenvalue dương) ⟹ mọi hướng đều "cong lên".
- **Cực đại:** Hessian xác định âm.
- **Saddle (yên ngựa):** Hessian có eigenvalue cả dương và âm — vài hướng cong lên, vài hướng cong xuống.

(Phần này sẽ được khai triển kỹ ở Vectors/Algebra eigenvalues + tối ưu hóa đa biến, ngoài phạm vi lesson này.)

### 11.5. Ví dụ Hessian

`f(x, y) = x² + 3xy + y²`:
- `f_x = 2x + 3y`. `f_xx = 2`. `f_xy = 3`.
- `f_y = 3x + 2y`. `f_yy = 2`. `f_yx = 3`.

Hessian:
```
H = [ 2  3 ]
    [ 3  2 ]
```
Eigenvalues: λ = 2 ± 3 = {5, -1}. Hai dấu khác nhau ⟹ saddle. Hợp lý: `f(x,y) = (x+y)² + xy - y² ...` tại `(0,0)` không phải cực trị mà là điểm yên ngựa.

---

## 12. PHẦN LỚN — Liên hệ Machine Learning / AI

### 12.1. Loss function = hàm nhiều biến

Một neural network đơn giản (1 layer ẩn) cho phân loại nhị phân:

```
ŷ = σ(W₂ · σ(W₁ · x + b₁) + b₂)
Loss(W₁, b₁, W₂, b₂) = (ŷ - y_true)²
```

Trong đó `W₁, W₂` là ma trận, `b₁, b₂` là vector. Tổng cộng tham số: nếu input 784 (ảnh 28×28), hidden 128, output 1 thì:
- `W₁`: 784 × 128 = 100 352.
- `b₁`: 128.
- `W₂`: 128 × 1 = 128.
- `b₂`: 1.
- Total: **100 609 tham số**.

Loss là một HÀM của 100 609 biến `θ = (W₁⁽¹·¹⁾, W₁⁽¹·²⁾, ..., b₂)`. Gradient `∇L` là vector 100 609 chiều.

Với GPT-3 (175 tỉ tham số), gradient là vector 1.75 · 10¹¹ chiều. Vẫn hoạt động cùng quy tắc tính như f(x,y) → chỉ là nhiều hơn.

### 12.2. Backpropagation = tính `∇L`

**Backprop** là một thuật toán hiệu quả để tính ĐỒNG THỜI tất cả đạo hàm riêng `∂L/∂θᵢ`. Cốt lõi của backprop chính là **chain rule nhiều biến** ở mục 10:

```
∂L/∂W₁ = ∂L/∂ŷ · ∂ŷ/∂(layer2) · ∂(layer2)/∂(layer1) · ∂(layer1)/∂W₁
```

Mỗi factor là một Jacobian (ma trận đạo hàm riêng). Backprop tính từ ngược về (output → input) để TÁI SỬ DỤNG các tích đã tính → độ phức tạp O(số param) thay vì O(số param²).

Sẽ học chi tiết ở lesson Neural Network.

### 12.3. Gradient descent — đi NGƯỢC gradient

Mục tiêu: tìm `θ*` sao cho `L(θ*)` nhỏ nhất.

Thuật toán cơ bản: từ `θ₀` (random), cập nhật từng bước:

```
θ_{k+1} = θ_k - η · ∇L(θ_k)
```

trong đó `η` là **learning rate** (bước nhỏ).

**Vì sao trừ?** Vì `∇L` chỉ hướng L TĂNG nhanh nhất. Ta muốn L GIẢM → đi NGƯỢC gradient = `-∇L`. Đó chính là tính chất 1 đã chứng minh ở mục 9.

**Vì sao có `η`?** Vì gradient chỉ tốt **cục bộ** — chỉ hướng đi xuống ở lân cận điểm hiện tại. Bước quá lớn có thể "phóng" qua đáy. `η` nhỏ → an toàn nhưng chậm. `η` lớn → nhanh nhưng có thể không hội tụ. Tinh chỉnh `η` là một nghệ thuật (Lesson 07 sẽ đi sâu).

### 12.4. Mini ví dụ end-to-end

Loss đơn giản: `L(w) = (w - 3)² + (w' - 5)²` với 2 tham số (w, w'). Tối ưu rõ ràng: `(3, 5)`.

- `∇L = (2(w-3), 2(w'-5))`.
- Bắt đầu tại `θ₀ = (0, 0)`. `L = 9 + 25 = 34`. `∇L = (-6, -10)`.
- Bước 1: `θ₁ = (0, 0) - 0.1·(-6, -10) = (0.6, 1.0)`. `L = (0.6-3)² + (1-5)² = 5.76 + 16 = 21.76`. Giảm.
- Bước 2: `∇L|_(0.6, 1) = (-4.8, -8)`. `θ₂ = (0.6, 1) - 0.1·(-4.8, -8) = (1.08, 1.8)`. `L = 3.69 + 10.24 = 13.93`. Tiếp tục giảm.
- ... sau ~30 bước, `θ ≈ (3, 5)`. ✓

Đây chính xác là logic training một neural network — chỉ khác là dim θ rất lớn.

### 12.5. Quan hệ với các thuật toán khác

- **SGD (stochastic gradient descent):** thay vì tính `∇L` trên toàn data, dùng minibatch — gradient ước lượng. Vẫn cùng nguyên lý "đi -∇L".
- **Adam, RMSprop:** điều chỉnh `η` riêng cho từng tham số dựa trên lịch sử gradient.
- **L-BFGS:** dùng cả Hessian (mục 11) để chọn bước thông minh hơn.
- **Newton's method:** `θ_{k+1} = θ_k - H⁻¹ · ∇L` — dùng Hessian trực tiếp. Mạnh nhưng tốn (Hessian là ma trận `n × n`).

> **📝 Tóm tắt mục 12:**
> - Mọi loss của mọi mô hình ML đều là hàm nhiều (có khi tỉ) biến.
> - Backprop = thuật toán tính `∇L` hiệu quả bằng chain rule nhiều biến.
> - Gradient descent: đi NGƯỢC gradient → giảm loss nhanh nhất.
> - Hessian (cấp 2) cho thuật toán tinh tế hơn (Newton, L-BFGS) nhưng đắt.

---

## 13. Bài tập

### Bài 13.1 (cơ bản — tính đạo hàm riêng)

Tính `∂f/∂x` và `∂f/∂y` của các hàm sau:

a) `f(x, y) = x³ + xy² + y³`
b) `f(x, y) = (x + y)·sin(x - y)`
c) `f(x, y) = x²·ln(y) + y²·ln(x)`
d) `f(x, y) = e^(x²) · cos(y)`

### Bài 13.2 (gradient + ý nghĩa)

Cho `f(x, y) = x² - 2xy + 3y²`.

a) Tính `∇f`.
b) Tính `∇f(1, 1)` và `|∇f(1, 1)|`.
c) Tại `(1, 1)`, hàm tăng hay giảm khi di chuyển theo hướng `(1, 0)`?
d) Tìm hướng đơn vị tại `(1, 1)` mà hàm GIẢM nhanh nhất.

### Bài 13.3 (đạo hàm hướng)

Cho `f(x, y) = ln(x² + y²)`.

a) Tính `∇f(1, 2)`.
b) Tính đạo hàm hướng tại `(1, 2)` theo hướng `(3, 4)` (lưu ý: chuẩn hóa vector trước).
c) Tại `(1, 2)`, theo hướng nào hàm KHÔNG ĐỔI?

### Bài 13.4 (chain rule nhiều biến)

Cho `z = x² + xy + y²` với `x(t) = t² + 1` và `y(t) = t - 2`.

Tính `dz/dt`:
a) Bằng cách thay `x(t), y(t)` vào z rồi đạo hàm theo t.
b) Bằng chain rule nhiều biến.
c) So sánh 2 kết quả.

### Bài 13.5 (Hessian)

Tính ma trận Hessian của `f(x, y) = x² · y + y³` tại điểm `(1, 1)`.

### Bài 13.6 (ứng dụng ML)

Cho loss `L(w₁, w₂) = (w₁ - 2)² + 3(w₂ + 1)²`.

a) Tính `∇L`.
b) Bắt đầu từ `(0, 0)`, áp dụng 3 bước gradient descent với `η = 0.1`. Trình bày từng bước.
c) Cực tiểu lý thuyết của L ở đâu? Sau 3 bước, đã đến gần chưa?

---

## 14. Lời giải chi tiết

### Lời giải 13.1

**a) `f(x, y) = x³ + xy² + y³`**
- `∂f/∂x`: coi y hằng. `∂/∂x(x³) = 3x²`; `∂/∂x(xy²) = y²` (vì y² là hệ số); `∂/∂x(y³) = 0`.
  ⟹ `∂f/∂x = 3x² + y²`.
- `∂f/∂y`: `∂/∂y(x³) = 0`; `∂/∂y(xy²) = 2xy`; `∂/∂y(y³) = 3y²`.
  ⟹ `∂f/∂y = 2xy + 3y²`.

**b) `f(x, y) = (x + y)·sin(x - y)`**

Đây là tích hai hàm. Dùng product rule. Coi y là hằng:
- Đặt `g = x + y`, `h = sin(x - y)`. `g_x = 1`, `h_x = cos(x - y) · 1 = cos(x-y)`.
- `∂f/∂x = g_x · h + g · h_x = sin(x-y) + (x+y)·cos(x-y)`.

Tương tự, coi x hằng:
- `g_y = 1`, `h_y = cos(x-y) · (-1) = -cos(x-y)`.
- `∂f/∂y = 1·sin(x-y) + (x+y)·(-cos(x-y)) = sin(x-y) - (x+y)·cos(x-y)`.

**c) `f(x, y) = x²·ln(y) + y²·ln(x)`**
- `∂f/∂x = 2x·ln(y) + y² · (1/x) = 2x·ln(y) + y²/x`.
- `∂f/∂y = x² · (1/y) + 2y·ln(x) = x²/y + 2y·ln(x)`.

**d) `f(x, y) = e^(x²) · cos(y)`**
- `∂f/∂x = e^(x²) · 2x · cos(y) = 2x·e^(x²)·cos(y)` (chain rule cho e^(x²)).
- `∂f/∂y = e^(x²) · (-sin(y)) = -e^(x²)·sin(y)`.

### Lời giải 13.2

`f(x, y) = x² - 2xy + 3y²`.

**a)** `∂f/∂x = 2x - 2y`. `∂f/∂y = -2x + 6y`. ⟹ `∇f = (2x - 2y, -2x + 6y)`.

**b)** Tại `(1, 1)`: `∇f = (2-2, -2+6) = (0, 4)`. `|∇f| = 4`.

**c)** Đạo hàm hướng theo `(1, 0)`: `D_{(1,0)} f = (0, 4)·(1, 0) = 0`. Hàm KHÔNG ĐỔI theo hướng x tại điểm này (cục bộ).

**d)** Hướng giảm nhanh nhất = `-∇f/|∇f| = -(0, 4)/4 = (0, -1)` — Nam.

### Lời giải 13.3

`f(x, y) = ln(x² + y²)`.

**a)** `∂f/∂x = 2x/(x²+y²)`. Tại `(1, 2)`: `2/(1+4) = 2/5`. `∂f/∂y = 2y/(x²+y²) = 4/5`. ⟹ `∇f(1, 2) = (2/5, 4/5)`.

**b)** Vector `(3, 4)` chưa chuẩn hóa. `|(3,4)| = 5`. `û = (3/5, 4/5)`.
`D_û f = (2/5)(3/5) + (4/5)(4/5) = 6/25 + 16/25 = 22/25 = 0.88`.

**c)** Hướng không đổi = vuông góc với `∇f = (2/5, 4/5)`. Vector vuông góc: `(-4, 2)` (đổi chỗ và đổi dấu 1 thành phần). Chuẩn hóa: `|(-4, 2)| = √20`. Hướng đơn vị: `(-4/√20, 2/√20) = (-2/√5, 1/√5)`. (Hướng ngược lại `(2/√5, -1/√5)` cũng hợp lệ.)

### Lời giải 13.4

`z = x² + xy + y²`, `x = t² + 1`, `y = t - 2`.

**a) Thay trực tiếp:**
- `x² = (t²+1)² = t⁴ + 2t² + 1`.
- `xy = (t²+1)(t-2) = t³ - 2t² + t - 2`.
- `y² = (t-2)² = t² - 4t + 4`.
- `z(t) = t⁴ + 2t² + 1 + t³ - 2t² + t - 2 + t² - 4t + 4 = t⁴ + t³ + t² - 3t + 3`.
- `dz/dt = 4t³ + 3t² + 2t - 3`.

**b) Chain rule:**
- `∂z/∂x = 2x + y`. `∂z/∂y = x + 2y`.
- `dx/dt = 2t`. `dy/dt = 1`.
- `dz/dt = (2x + y)·2t + (x + 2y)·1`.
- Thay: `(2(t²+1) + (t-2))·2t + ((t²+1) + 2(t-2)) = (2t² + 2 + t - 2)·2t + (t² + 1 + 2t - 4) = (2t² + t)·2t + (t² + 2t - 3) = 4t³ + 2t² + t² + 2t - 3 = 4t³ + 3t² + 2t - 3`.

**c) ✓ Khớp.** Chain rule cho cùng kết quả mà không cần khai triển trước.

### Lời giải 13.5

`f(x, y) = x²y + y³`.

- `f_x = 2xy`. `f_xx = 2y`. `f_xy = 2x`.
- `f_y = x² + 3y²`. `f_yy = 6y`. `f_yx = 2x` ✓ (= f_xy, đối xứng).

Hessian tại `(1, 1)`:
```
H(1, 1) = [ 2  2 ]
          [ 2  6 ]
```

Eigenvalues: `det(H - λI) = (2-λ)(6-λ) - 4 = λ² - 8λ + 8 = 0`. `λ = (8 ± √32)/2 = 4 ± 2√2`. Cả 2 dương ⟹ Hessian xác định dương ⟹ tại `(1, 1)` mặt cong lên theo mọi hướng (nhưng `(1,1)` chưa hẳn là cực tiểu vì `∇f(1,1) = (2, 4) ≠ 0`).

### Lời giải 13.6

`L(w₁, w₂) = (w₁ - 2)² + 3(w₂ + 1)²`.

**a)** `∂L/∂w₁ = 2(w₁ - 2)`. `∂L/∂w₂ = 6(w₂ + 1)`. ⟹ `∇L = (2(w₁-2), 6(w₂+1))`.

**b)** Gradient descent từ `(0, 0)`, `η = 0.1`:

| Bước | (w₁, w₂) | L | ∇L | Bước cập nhật |
|------|----------|---|-----|---------------|
| 0 | (0, 0) | 4 + 3 = 7 | (-4, 6) | -η·∇L = (0.4, -0.6) |
| 1 | (0.4, -0.6) | (−1.6)² + 3(0.4)² = 2.56 + 0.48 = 3.04 | (2·(-1.6), 6·0.4) = (-3.2, 2.4) | (0.32, -0.24) |
| 2 | (0.72, -0.84) | (−1.28)² + 3(0.16)² = 1.6384 + 0.0768 = 1.7152 | (-2.56, 0.96) | (0.256, -0.096) |
| 3 | (0.976, -0.936) | (-1.024)² + 3·(0.064)² = 1.0486 + 0.0123 = 1.0609 | ... | ... |

**c)** Cực tiểu lý thuyết: `∇L = 0 ⟺ w₁ = 2, w₂ = -1`. Sau 3 bước, ta ở `(0.976, -0.936)` — chưa đến đích nhưng đang đi đúng hướng. L giảm từ 7 → 1.06. Sau ~30 bước sẽ rất gần `(2, -1)`.

> Để ý: `w₂` hội tụ nhanh hơn `w₁` (đã gần -1 sau 3 bước, trong khi w₁ mới 0.976/2). Vì sao? Vì `∂L/∂w₂` có hệ số 6, lớn hơn `∂L/∂w₁` (hệ số 2) → cập nhật mạnh hơn. Đây là lý do người ta phát minh các optimizer như Adam — để cân bằng tốc độ học giữa các tham số.

---

## 15. Tổng kết

> **📝 Tóm tắt cả bài:**
> - **Hàm nhiều biến:** đầu vào `(x, y, ...)`, đầu ra một số. Đồ thị = mặt (2 biến) hoặc trừu tượng (n biến).
> - **Đạo hàm riêng `∂f/∂x`:** đạo hàm theo x, coi các biến khác như hằng số. Quy tắc Lesson 03 áp dụng nguyên vẹn.
> - **Gradient `∇f` = vector** gồm tất cả đạo hàm riêng. 3 tính chất:
>   1. Chỉ hướng tăng nhanh nhất; `-∇f` chỉ hướng giảm nhanh nhất.
>   2. Vuông góc với đường mức.
>   3. Độ lớn `|∇f|` = tốc độ thay đổi cực đại.
> - **Đạo hàm hướng:** `D_û f = ∇f · û`. Cauchy-Schwarz → max khi û cùng hướng ∇f.
> - **Chain rule nhiều biến:** `dz/dt = ∑ ∂f/∂xᵢ · dxᵢ/dt`. Cơ sở toán của backpropagation.
> - **Hessian:** ma trận đạo hàm cấp 2, đối xứng (Schwarz). Dùng cho test cực trị và Newton's method.
> - **ML:** loss là hàm nhiều biến → backprop tính ∇L → gradient descent đi `-∇L`.

### File trong lesson

- [README.md](./README.md) — file này.
- [visualization.html](./visualization.html) — minh họa tương tác: contour, gradient vector, gradient field, directional derivative.

### Lesson tiếp theo

➡️ [Lesson 07 — Gradient descent](../lesson-07-gradient-descent/) — biến trực giác "đi ngược gradient" thành thuật toán cụ thể; learning rate; convergence; bài toán saddle và momentum.

### Tham khảo

- Strang, "Calculus" Ch.13-14.
- Stewart, "Multivariable Calculus" Ch.14.
- 3Blue1Brown — "Gradient and directional derivative" (YouTube).
- Goodfellow et al., "Deep Learning" Ch.4 — Numerical computation, gradient-based optimization.
