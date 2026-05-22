# Lesson 05 — Hàm số là gì

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hàm số** như một "máy biến đổi": nhận input là một số, trả ra output là một số.
- Đọc và viết được ký hiệu `y = f(x)`, `f: x ↦ f(x)`.
- Phân biệt hàm số với "quan hệ không phải hàm" (cùng một x ra hai y).
- Xác định **domain** (tập xác định) và **range** (tập giá trị) của một hàm.
- Đọc đồ thị hàm số trên mặt phẳng (Ox, Oy); biết **vertical line test**.
- Tính **hàm hợp** `(g ∘ f)(x) = g(f(x))` step-by-step.
- Tìm **hàm ngược** `f⁻¹` của một hàm đơn ánh.
- Thấy được vì sao mạng neural là một composition khổng lồ của các hàm số.

## Kiến thức tiền đề

- [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/) (cần biết `e^x`, `ln(x)`, `√x`).
- Biểu thức đại số, biến (Lesson 02).
- Trục số, tập số ℝ (Lesson 01).

## 1. Hàm số là gì?

Hãy coi một **hàm số** như một **chiếc máy** có:

- Một **đầu vào** (input): một số `x`.
- Một **đầu ra** (output): một số khác, ký hiệu `f(x)`.

Máy này có **một quy tắc** biến `x` thành `f(x)`. Quy tắc đó là "chính bản thân" hàm số.

```
   x  ──►  [ f ]  ──►  f(x)
 input              output
```

Ký hiệu phổ biến nhất:

```
y = f(x)
```

Đọc là *"y bằng f của x"*. Tức là: `y` là output, `x` là input, `f` là tên của hàm (quy tắc).

Một ký hiệu khác cũng hay gặp, đặc biệt trong sách toán cao cấp:

```
f : x ↦ f(x)
```

Đọc là *"f là quy tắc gán x đến f(x)"*. Mũi tên `↦` (mapsto) khác với `→` (đến) — `↦` nói riêng về việc *gán phần tử*, còn `→` thường dùng cho "từ tập này sang tập kia".

### 1.1. Ví dụ cụ thể

Cho hàm `f(x) = 2x + 1`. Quy tắc là: *"lấy x, nhân 2, cộng 1"*.

Tính một vài giá trị:

| x | Tính | f(x) |
|---|------|------|
| 0 | 2·0 + 1 | 1 |
| 1 | 2·1 + 1 | 3 |
| 3 | 2·3 + 1 | **7** |
| −1 | 2·(−1) + 1 | −1 |
| 0.5 | 2·0.5 + 1 | 2 |

Ta nói: *"f gửi 3 đến 7"*, viết `f(3) = 7`.

### 1.2. Định nghĩa quan trọng nhất: mỗi input có **đúng một** output

Đây là **điểm cốt lõi** của hàm số. Nếu bỏ qua điểm này, bạn sẽ nhầm rất nhiều thứ sau này.

> **Một quan hệ giữa x và y được gọi là HÀM SỐ nếu mỗi giá trị x cho ra ĐÚNG MỘT giá trị y.**

Nói cách khác: không có chuyện *"đưa cùng một x vào máy, lần này nó nhả ra 5, lần khác nó nhả ra 7"*. Nếu vậy đó **không** phải hàm số.

#### Ví dụ KHÔNG phải hàm số

Xét quan hệ `y² = x`. Với `x = 4`:

```
y² = 4   ⟹   y = 2  hoặc  y = −2
```

→ Cùng một `x = 4` cho ra **hai giá trị y**. Đây **không** phải hàm số (theo y).

Nhưng nếu ta đảo lại: `x = y²`, coi `y` là input, `x` là output, thì đó **lại là** hàm số (mỗi `y` cho đúng một `x`). Cùng một quan hệ, đổi vai trò input/output có thể đổi bản chất "có là hàm hay không".

#### Ví dụ là hàm số nhưng nhiều x cho cùng một y

`f(x) = x²`:

- `f(2) = 4`, `f(−2) = 4`. Hai `x` khác nhau cho cùng output → **vẫn là hàm số**, vì điều kiện chỉ yêu cầu *"mỗi x cho duy nhất một y"*, không yêu cầu chiều ngược lại.
- Loại hàm "nhiều input → cùng output" gọi là **không đơn ánh** (not one-to-one). Sẽ quay lại ở mục 7 (hàm ngược).

### 1.3. Câu hỏi tự nhiên người đọc sẽ hỏi

> *"Vậy hàm số có nhất thiết phải viết ra công thức không?"*

Không. Một hàm số có thể được mô tả bằng:

- **Công thức**: `f(x) = x² + 1`.
- **Bảng giá trị**: liệt kê hữu hạn cặp (x, f(x)).
- **Đồ thị**: vẽ trên mặt phẳng.
- **Mô tả bằng lời**: "lấy x, bình phương, cộng 1".

Cả 4 cách đều mô tả "cùng một quy tắc". Sẽ nói kỹ ở mục 4.

> *"f(x) là số, hay là hàm?"*

`f` là hàm (quy tắc). `f(x)` là **số** (output đã tính ra cho một x cụ thể, hoặc biểu thức theo x). Khi nói "đồ thị của f(x)" thực ra là nói "đồ thị của f".

## 2. Domain và Range

Khi một máy chạy, không phải input nào nó cũng nuốt được. Hàm số cũng vậy.

### 2.1. Domain (tập xác định)

**Domain** của hàm `f`, ký hiệu `D(f)` hoặc `dom(f)`, là **tập tất cả các x mà f(x) có nghĩa** (tính được, ra một số thực).

Ví dụ:

| Hàm | Vì sao bị hạn chế | Domain |
|-----|-------------------|--------|
| `f(x) = 2x + 1` | Không hạn chế | ℝ |
| `f(x) = 1/x` | x = 0 ⟹ chia cho 0 | ℝ \ {0} |
| `f(x) = √x` | x < 0 ⟹ căn của số âm không phải số thực | [0, +∞) |
| `f(x) = ln(x)` | x ≤ 0 ⟹ log không xác định | (0, +∞) |
| `f(x) = 1/(x²−4)` | x²−4 = 0 ⟹ x = ±2 | ℝ \ {−2, 2} |

**Quy tắc tìm domain**: hỏi *"có chỗ nào trong công thức bị cấm không?"*. Ba chỗ cấm phổ biến:

1. **Mẫu số = 0** → loại x làm mẫu bằng 0.
2. **Căn bậc chẵn của số âm** → ép biểu thức trong căn ≥ 0.
3. **Log của số ≤ 0** → ép biểu thức trong log > 0.

### 2.2. Range (tập giá trị)

**Range** của `f`, ký hiệu `R(f)` hoặc `f(D)`, là **tập tất cả các giá trị f(x) thực sự đạt được** khi `x` chạy khắp domain.

Ví dụ:

| Hàm | Domain | Range | Giải thích |
|-----|--------|-------|------------|
| `f(x) = 2x + 1` | ℝ | ℝ | x kéo đi khắp ℝ thì 2x+1 cũng kéo khắp ℝ |
| `f(x) = x²` | ℝ | [0, +∞) | Bình phương không bao giờ âm |
| `f(x) = 1/x` | ℝ \ {0} | ℝ \ {0} | Không bao giờ ra 0 |
| `f(x) = e^x` | ℝ | (0, +∞) | e^x > 0 với mọi x |
| `f(x) = sin(x)` | ℝ | [−1, 1] | sin bị chặn |

**Lưu ý**: tìm range thường khó hơn tìm domain. Cần phân tích biến thiên hoặc hình dung đồ thị.

### 2.3. Trực giác: domain = "đầu vào hợp lệ", range = "đầu ra thực tế"

Domain là **những x bạn được phép đưa vào**. Range là **những y bạn thực sự sẽ thấy đi ra**.

Đừng nhầm range với "codomain" — codomain là tập đích "danh nghĩa" (vd ℝ), còn range là **phần đích thực sự được dùng đến**. Trong các sách phổ thông tiếng Việt, "range" và "tập giá trị" được dùng đồng nghĩa.

## 3. Đồ thị (graph) của hàm số

**Đồ thị** của `f` là tập hợp các điểm `(x, f(x))` trên mặt phẳng tọa độ Oxy.

- **Trục Ox** (nằm ngang): biểu diễn input `x`.
- **Trục Oy** (thẳng đứng): biểu diễn output `y = f(x)`.

Một điểm `(a, b)` thuộc đồ thị **khi và chỉ khi** `b = f(a)`.

### 3.1. Vẽ đồ thị bằng tay (ví dụ: f(x) = x²)

Tính một bảng giá trị:

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 4 | 1 | 0 | 1 | 4 |

Chấm 5 điểm `(−2, 4)`, `(−1, 1)`, `(0, 0)`, `(1, 1)`, `(2, 4)` lên mặt phẳng, rồi nối lại bằng đường cong mượt → ra **parabol** mở lên trên.

```
   y
   |
 4 *           *
   |
 1   *       *
   |
   *___________  x
  -2 -1  0  1  2
```

### 3.2. Vertical Line Test (phép thử đường thẳng đứng)

> **Một đường cong trên mặt phẳng là đồ thị của một HÀM SỐ khi và chỉ khi mọi đường thẳng đứng cắt nó tại không quá 1 điểm.**

Vì sao? Đường thẳng đứng `x = a` đi qua tất cả các điểm có hoành độ `a`. Nếu nó cắt đồ thị ở 2 điểm `(a, b₁)` và `(a, b₂)`, thì cùng input `a` cho ra 2 output `b₁ ≠ b₂` — vi phạm định nghĩa hàm số.

Ví dụ áp dụng:

- Đồ thị `y = x²` (parabol mở lên): mọi đường thẳng đứng cắt nó **đúng 1 điểm** → là hàm.
- Đồ thị `x = y²` (parabol mở sang phải): đường thẳng đứng `x = 4` cắt nó tại `(4, 2)` và `(4, −2)` → **không** là hàm số của x.
- Đường tròn `x² + y² = 1`: đường thẳng đứng `x = 0` cắt tại `(0, 1)` và `(0, −1)` → **không** là hàm số. (Phải tách thành 2 hàm `y = √(1−x²)` và `y = −√(1−x²)`.)

## 4. Bốn cách biểu diễn cùng một hàm

Cùng một hàm số có thể được "viết ra" theo 4 cách. Lấy ví dụ hàm "lấy x, bình phương, cộng 1":

### 4.1. Công thức

```
f(x) = x² + 1
```

### 4.2. Bảng giá trị

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 5 | 2 | 1 | 2 | 5 |

### 4.3. Đồ thị

Parabol đỉnh `(0, 1)`, mở lên trên:

```
  y
  |
5 *         *
  |
2  *       *
  |
1    *
  +─────────── x
   -2 -1 0 1 2
```

### 4.4. Mô tả bằng lời

> "Lấy số x, bình phương lên, rồi cộng thêm 1."

**Khi nào dùng cách nào?**

- **Công thức**: gọn, đại số hóa được, tính được với x bất kỳ. Tốt cho lý thuyết.
- **Bảng**: trực quan với vài giá trị mẫu. Tốt cho dữ liệu thực nghiệm khi chưa biết công thức.
- **Đồ thị**: thấy ngay hình dáng tổng quát (tăng/giảm, cực trị, chặn).
- **Lời**: dễ giải thích cho người chưa biết toán. Nhưng dễ mơ hồ với hàm phức tạp.

## 5. Một số hàm phổ biến

Đây là "bảng chữ cái" của các hàm bạn sẽ gặp đi gặp lại. Lesson 06–07 sẽ học sâu.

### 5.1. Hàm hằng (constant)

```
f(x) = c    (c là một số cố định)
```

Đồ thị là **đường thẳng nằm ngang** ở chiều cao `y = c`. Vd `f(x) = 3` luôn ra 3 dù x là gì.

### 5.2. Hàm bậc 1 — đường thẳng (Lesson 06)

```
f(x) = ax + b
```

Đồ thị là đường thẳng. `a` quyết định **độ dốc**, `b` là **giao điểm với Oy**.

### 5.3. Hàm bậc 2 — parabol (Lesson 06)

```
f(x) = ax² + bx + c   (a ≠ 0)
```

Đồ thị là parabol. `a > 0` mở lên, `a < 0` mở xuống.

### 5.4. Hàm mũ (Lesson 07)

```
f(x) = e^x    (hoặc f(x) = a^x với a > 0)
```

Range = (0, +∞). Tăng cực nhanh. Là nền tảng của tăng trưởng theo cấp số nhân, softmax trong ML, phân phối chuẩn, ...

### 5.5. Hàm logarit (Lesson 07)

```
f(x) = ln(x)   (log tự nhiên)   hoặc   log_b(x)
```

Domain = (0, +∞). Là **hàm ngược** của hàm mũ. Tăng cực chậm — gặp khắp nơi trong phân tích thuật toán (O(log n)) và ML (log-likelihood).

### 5.6. Hàm giá trị tuyệt đối

```
f(x) = |x|
```

Đồ thị hình chữ V đỉnh ở (0, 0). Range = [0, +∞). Trong ML, `|x|` xuất hiện ở L1 loss.

### 5.7. Hàm sàn (floor) và hàm trần (ceil)

- `floor(x)` = `⌊x⌋` = số nguyên lớn nhất ≤ x. Vd `floor(3.7) = 3`, `floor(−1.2) = −2`.
- `ceil(x)` = `⌈x⌉` = số nguyên nhỏ nhất ≥ x. Vd `ceil(3.2) = 4`, `ceil(−1.7) = −1`.

Đồ thị có dạng **bậc thang**. Đây là ví dụ rõ về hàm "không liên tục" — nhưng vẫn là hàm (mỗi x cho đúng 1 y).

## 6. Hàm hợp (function composition)

Hai hàm có thể nối với nhau như hai máy nối tiếp.

```
   x ──► [ f ] ──► f(x) ──► [ g ] ──► g(f(x))
```

Ký hiệu: `(g ∘ f)(x) = g(f(x))`, đọc là *"g hợp f"*. Hàm `f` chạy trước, kết quả của `f` được đưa vào `g`.

### 6.1. Tính tay từng bước

Cho `f(x) = 2x + 1` và `g(x) = x²`. Tính `g(f(3))`:

```
Bước 1: f(3) = 2·3 + 1 = 7
Bước 2: g(7) = 7² = 49

⟹ g(f(3)) = 49
```

Hoặc viết thành công thức tổng quát:

```
(g ∘ f)(x) = g(f(x)) = g(2x + 1) = (2x + 1)²
```

Thử lại với x = 3: `(2·3 + 1)² = 7² = 49` ✓.

### 6.2. `g ∘ f` thường KHÁC `f ∘ g`

Với cùng `f(x) = 2x + 1`, `g(x) = x²`:

- `(g ∘ f)(x) = (2x + 1)²`
- `(f ∘ g)(x) = f(g(x)) = f(x²) = 2x² + 1`

Thử với x = 3:
- `(g ∘ f)(3) = (2·3 + 1)² = 49`.
- `(f ∘ g)(3) = 2·3² + 1 = 19`.

→ **Composition không có tính giao hoán**. Thứ tự rất quan trọng.

### 6.3. Vì sao composition quan trọng cho ML?

**Mạng neural sâu (deep neural network) chính là một composition khổng lồ.**

Một mạng có L lớp tính toán như sau:

```
output = f_L( f_{L-1}( ... f_2( f_1(input) ) ... ) )
       = (f_L ∘ f_{L-1} ∘ ... ∘ f_1)(input)
```

Mỗi `f_i` thường có dạng:

```
f_i(x) = activation( W_i · x + b_i )
```

Trong đó `W_i` là ma trận, `b_i` là vector, `activation` là một hàm số (sigmoid, ReLU, tanh — sẽ thấy trong viz).

→ Khi bạn nghe câu *"deep learning học bằng cách điều chỉnh hàng triệu tham số trong các lớp hàm chồng lên nhau"* — chính là điều này.

## 7. Hàm ngược (inverse function)

### 7.1. Trực giác

Nếu `f` là máy "biến x thành y", thì **hàm ngược** `f⁻¹` là máy "biến y trở lại x". Nó **đảo ngược** hành động của `f`.

```
   x ──► [ f ] ──► y        y ──► [ f⁻¹ ] ──► x
```

Ký hiệu `f⁻¹` (đọc là "f ngược") — **không phải** `1/f`. Đây là quy ước dễ gây nhầm.

### 7.2. Điều kiện tồn tại: f phải đơn ánh

`f⁻¹` chỉ tồn tại khi `f` **đơn ánh** (one-to-one, injective): hai input khác nhau cho hai output khác nhau.

Vì sao? Nếu `f(2) = f(−2) = 4` (như `f(x) = x²`), thì khi cần đảo ngược, hỏi *"cái nào ra `4`?"* — không trả lời được vì có cả `2` và `−2`. Không có cách nào định nghĩa `f⁻¹(4)` cho hợp lý.

**Cách thử bằng đồ thị**: **horizontal line test** — mọi đường thẳng ngang cắt đồ thị tối đa 1 điểm thì f đơn ánh.

### 7.3. Tìm hàm ngược: thuật toán

1. Viết `y = f(x)`.
2. Hoán đổi vai trò: viết phương trình ban đầu, đặt `y` ở vế phải.
3. Giải phương trình theo `x` (tìm x theo y).
4. Đổi tên: viết kết quả thành hàm `f⁻¹(y)`. Có thể đổi `y` về `x` để quen mắt: `f⁻¹(x)`.

### 7.4. Ví dụ chi tiết

**Ví dụ 1**: tìm hàm ngược của `f(x) = 2x + 3`.

```
y = 2x + 3
y − 3 = 2x
x = (y − 3) / 2
```

Vậy `f⁻¹(y) = (y − 3) / 2`. Viết theo biến x: `f⁻¹(x) = (x − 3) / 2`.

**Kiểm tra**:
- `f(5) = 2·5 + 3 = 13`.
- `f⁻¹(13) = (13 − 3) / 2 = 5` ✓.

**Ví dụ 2**: `f(x) = e^x`. Đã biết hàm ngược là `f⁻¹(y) = ln(y)`. Lý do: `e^x = y ⟺ x = ln(y)` (theo định nghĩa của ln, xem Lesson 04).

### 7.5. Phép thử "vào ra"

Nếu `g` thực sự là hàm ngược của `f`, thì:

```
f( g(y) ) = y   với mọi y thuộc range của f
g( f(x) ) = x   với mọi x thuộc domain của f
```

Tức là chạy qua máy `f` rồi qua máy `g` thì trở lại điểm xuất phát.

### 7.6. Đồ thị: f và f⁻¹ đối xứng qua đường y = x

Đây là sự thật hình học rất đẹp:

> **Đồ thị của `f⁻¹` là đối xứng của đồ thị `f` qua đường thẳng `y = x`.**

Lý do: điểm `(a, b)` thuộc đồ thị `f` ⟺ `b = f(a)` ⟺ `a = f⁻¹(b)` ⟺ `(b, a)` thuộc đồ thị `f⁻¹`. Mà `(a, b)` và `(b, a)` đối xứng nhau qua `y = x`.

Visualization sẽ vẽ rõ điều này.

## 8. Liên hệ với lập trình và ML

### 8.1. Hàm Go = hàm toán học (gần như)

```go
func f(x float64) float64 {
    return 2*x + 1
}

func main() {
    y := f(3)         // y = 7
    fmt.Println(y)
}
```

Hàm Go nhận input là một số, trả về một số — đúng như hàm toán. Khác biệt quan trọng: hàm Go có thể có **hiệu ứng phụ** (in ra màn hình, sửa biến toàn cục), còn hàm toán thì **thuần** (cùng input luôn ra cùng output, không "nhớ" gì). Trong ML và lập trình hàm (functional), người ta cố giữ hàm thuần để dễ suy luận.

### 8.2. Hàm bậc cao: composition trong code

Trong Go, hàm có thể là **giá trị** (truyền hàm vào hàm khác):

```go
func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 {
        return g(f(x))  // (g ∘ f)(x)
    }
}
```

Hàm `compose` nhận `f` và `g`, trả về **hàm mới** `g ∘ f`. Đây là cách mạng neural được mô tả dưới dạng "chuỗi composition".

### 8.3. Activation functions trong ML

Một số hàm sẽ gặp liên tục trong deep learning, mọi mạng neural đều có:

| Tên | Công thức | Đặc điểm |
|-----|-----------|----------|
| Sigmoid | `σ(x) = 1 / (1 + e^(−x))` | Range = (0, 1). Dùng cho xác suất nhị phân. |
| Tanh | `tanh(x) = (e^x − e^(−x)) / (e^x + e^(−x))` | Range = (−1, 1). Đối xứng quanh 0. |
| ReLU | `relu(x) = max(0, x)` | Đơn giản nhất. Mặc định trong CNN/Transformer. |
| Softplus | `softplus(x) = ln(1 + e^x)` | "ReLU mịn", luôn dương. |

Tất cả đều là **hàm số** đúng nghĩa của bài này. Visualization sẽ cho bạn vẽ chúng và so sánh.

## 9. Bài tập

### Bài 1: Đánh giá và giải

Cho `f(x) = 3x − 2`.

a) Tính `f(0)`, `f(2)`, `f(−1)`, `f(0.5)`.
b) Tìm `x` để `f(x) = 10`.

### Bài 2: Tìm domain

Tìm domain của:

a) `f(x) = √(x − 3)`
b) `g(x) = 1 / (x² − 4)`
c) `h(x) = ln(x)`
d) `k(x) = √(x − 3) / (x − 5)`  *(thêm để luyện)*

### Bài 3: Hàm hợp

Cho `f(x) = x + 1`, `g(x) = 2x`.

a) Tính `(f ∘ g)(x)`.
b) Tính `(g ∘ f)(x)`.
c) Tính `f(f(x))`.
d) Hai biểu thức ở câu a và b có bằng nhau không? Giải thích.

### Bài 4: Hàm ngược

Tìm hàm ngược của:

a) `f(x) = 5x − 7`
b) `g(x) = (x + 1) / (x − 2)`
c) `h(x) = e^(2x)`

### Bài 5: Code Go

Viết hàm `compose(f, g func(float64) float64) func(float64) float64` trả về hàm hợp `g ∘ f`. Test với `f(x) = 2x + 1`, `g(x) = x²`, in ra `(g ∘ f)(3)`.

## 10. Lời giải chi tiết

### Bài 1

`f(x) = 3x − 2`.

a)
- `f(0) = 3·0 − 2 = −2`.
- `f(2) = 3·2 − 2 = 4`.
- `f(−1) = 3·(−1) − 2 = −5`.
- `f(0.5) = 3·0.5 − 2 = 1.5 − 2 = −0.5`.

b) `f(x) = 10`:
```
3x − 2 = 10
3x = 12
x = 4
```

### Bài 2

a) `f(x) = √(x − 3)`: trong căn phải ≥ 0 ⟹ `x − 3 ≥ 0` ⟹ `x ≥ 3`.
→ **Domain = [3, +∞)**.

b) `g(x) = 1/(x² − 4)`: mẫu khác 0 ⟹ `x² ≠ 4` ⟹ `x ≠ ±2`.
→ **Domain = ℝ \ {−2, 2}**.

c) `h(x) = ln(x)`: log xác định khi đối số > 0 ⟹ `x > 0`.
→ **Domain = (0, +∞)**.

d) `k(x) = √(x − 3) / (x − 5)`: hai điều kiện cùng lúc:
- `x − 3 ≥ 0` ⟹ `x ≥ 3`.
- `x − 5 ≠ 0` ⟹ `x ≠ 5`.
→ **Domain = [3, 5) ∪ (5, +∞)**.

### Bài 3

`f(x) = x + 1`, `g(x) = 2x`.

a) `(f ∘ g)(x) = f(g(x)) = f(2x) = 2x + 1`.

b) `(g ∘ f)(x) = g(f(x)) = g(x + 1) = 2(x + 1) = 2x + 2`.

c) `f(f(x)) = f(x + 1) = (x + 1) + 1 = x + 2`.

d) Không. `(f ∘ g)(x) = 2x + 1` còn `(g ∘ f)(x) = 2x + 2`. Hai biểu thức khác nhau (chênh đúng 1 đơn vị) với mọi x.

Lý do tổng quát: composition không có tính giao hoán. Thứ tự thực hiện hai phép biến đổi quan trọng — "nhân 2 rồi cộng 1" khác với "cộng 1 rồi nhân 2".

### Bài 4

a) `f(x) = 5x − 7`. Đặt `y = 5x − 7` ⟹ `5x = y + 7` ⟹ `x = (y + 7)/5`.
→ **f⁻¹(x) = (x + 7) / 5**.

Kiểm tra: `f(3) = 5·3 − 7 = 8`. `f⁻¹(8) = (8 + 7)/5 = 3` ✓.

b) `g(x) = (x + 1)/(x − 2)`. Đặt `y = (x + 1)/(x − 2)`. Nhân chéo:
```
y(x − 2) = x + 1
yx − 2y = x + 1
yx − x = 2y + 1
x(y − 1) = 2y + 1
x = (2y + 1) / (y − 1)
```
→ **g⁻¹(x) = (2x + 1) / (x − 1)** (domain x ≠ 1).

Kiểm tra với `x = 3`: `g(3) = 4/1 = 4`. `g⁻¹(4) = (8 + 1)/(4 − 1) = 9/3 = 3` ✓.

c) `h(x) = e^(2x)`. Đặt `y = e^(2x)`. Lấy ln hai vế: `ln(y) = 2x` ⟹ `x = ln(y)/2`.
→ **h⁻¹(x) = ln(x) / 2** (domain x > 0).

Kiểm tra với `x = 0`: `h(0) = e^0 = 1`. `h⁻¹(1) = ln(1)/2 = 0` ✓.

### Bài 5

```go
package main

import "fmt"

func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 {
        return g(f(x))
    }
}

func main() {
    f := func(x float64) float64 { return 2*x + 1 }
    g := func(x float64) float64 { return x * x }

    gof := compose(f, g)        // g ∘ f
    fmt.Println(gof(3))         // 49 (vì f(3)=7, g(7)=49)
    fmt.Println(gof(0))         // 1
    fmt.Println(gof(-1))        // 1 (vì f(-1)=-1, g(-1)=1)
}
```

Xem chi tiết và bản đầy đủ trong [solutions.go](./solutions.go).

## 11. Tài liệu kèm

- Code lời giải Go: [solutions.go](./solutions.go)
- Visualization tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/)
- Bài tiếp theo: [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/)
- Quay lại lộ trình: [Tầng 1 — Algebra](../)
